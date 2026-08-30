// 全局状态:连接、会话、聊天流、系统状态
// 用极简 store 模式(Lit ReactiveController 主机),不引额外状态库
import type { ChatMessage, CronJob, LogTailResult, ModelRow, NodeRow, PairedDevice, PresenceEntry, SessionRow, SkillEntry, SystemInfo, UsageTotals } from '../gateway/types';
import { GatewayClient, type ConnState, type GatewayCreds } from '../gateway/client';
import { hasStoredDeviceToken, clearStoredDeviceTokens } from '../gateway/device-identity';

const CREDS_URL_KEY = 'openclaw-webui.gateway-url';
const CREDS_TOKEN_KEY = 'openclaw-webui.gateway-token'; // sessionStorage

export type View = 'chat' | 'sessions' | 'cron' | 'skills' | 'devices' | 'logs' | 'usage' | 'status' | 'settings';

export interface LogLine {
  time: string;
  message: string;
  raw: string;
}

export interface UsageByModelRow {
  model: string;
  provider: string;
  sessions: number;
  input: number;
  output: number;
  cacheRead: number;
  cacheWrite: number;
  totalTokens: number;
  totalCost: number;
}

export interface ProviderInfo {
  name: string;
  baseUrl?: string;
  api?: string;
  modelIds: string[];
}

export interface ToolActivity {
  toolCallId?: string;
  name?: string;
  phase?: string;
  output?: string;
  isError?: boolean;
}

export interface StreamState {
  active: boolean;
  runId: string | null;
  toolBusy: string | null; // 正在执行的工具名
  recentTools: ToolActivity[];
}

type Sub = () => void;

class AppStore {
  client = new GatewayClient();

  view: View = 'chat';
  connState: ConnState = 'idle';
  pairingError: string | null = null;
  authFailed = false;
  /** 设备身份生成失败(无法签名握手,需提示而非无限重连) */
  deviceIdentityFailed = false;

  /** 最近一次连接错误(登录界面展示用)。 */
  get lastError() {
    return this.client.lastError;
  }

  sessions: SessionRow[] = [];
  currentSessionKey: string | null = null;
  currentSessionId: string | null = null;
  messages: ChatMessage[] = [];
  historyLoading = false;

  stream: StreamState = { active: false, runId: null, toolBusy: null, recentTools: [] };
  draftText = '';

  systemInfo: SystemInfo | null = null;

  // ---- 扩展视图数据 ----
  cronJobs: CronJob[] = [];
  skills: SkillEntry[] = [];
  models: ModelRow[] = [];
  nodes: NodeRow[] = [];
  devicesPending: PairedDevice[] = [];
  devicesPaired: PairedDevice[] = [];
  presenceList: PresenceEntry[] = [];
  channels: Record<string, unknown> | null = null;
  logLines: LogLine[] = [];
  logsFollowing = false;

  private subs = new Set<Sub>();
  private infoTimer: number | null = null;
  private logsTimer: number | null = null;
  private logsCursor: number | undefined = undefined;
  private unsubscribers: Array<() => void> = [];

  subscribe(fn: Sub): () => void {
    this.subs.add(fn);
    return () => this.subs.delete(fn);
  }

  private emit(): void {
    for (const fn of this.subs) {
      try { fn(); } catch (e) { console.error(e); }
    }
  }

  // ---- 凭据 ----

  getGatewayUrl(): string {
    const saved = sessionStorage.getItem(CREDS_URL_KEY);
    if (saved) return saved;
    // 被网关托管时(controlUi.root 挂载/皮肤模式):直接用同源地址,
    // 这样局域网/Tailscale 访问也能连上;dev server(5173)除外,回退本机网关。
    if (typeof location !== 'undefined' && location.protocol.startsWith('http') && location.port !== '5173') {
      return `${location.protocol === 'https:' ? 'wss' : 'ws'}://${location.host}`;
    }
    return 'ws://127.0.0.1:18789';
  }

  getToken(): string {
    return sessionStorage.getItem(CREDS_TOKEN_KEY) || '';
  }

  saveCreds(url: string, token: string): void {
    if (url) sessionStorage.setItem(CREDS_URL_KEY, url);
    if (token) sessionStorage.setItem(CREDS_TOKEN_KEY, token);
  }

  /** 已配对设备(网关下发过 deviceToken)→ 可免密登录。 */
  canDeviceLogin(): boolean {
    return hasStoredDeviceToken();
  }

  hasCreds(): boolean {
    return Boolean(this.getToken()) || this.canDeviceLogin();
  }

  // ---- 连接生命周期 ----

  async start(): Promise<void> {
    if (!this.hasCreds()) return;
    this.bindClient();
    // token 为空时 client 会自动用存储的设备令牌握手(已配对设备免密)
    await this.client.connect({ url: this.getGatewayUrl(), token: this.getToken() } satisfies GatewayCreds);
  }

  private bindClient(): void {
    if (this.unsubscribers.length) return;
    this.unsubscribers = [
      this.client.on('state', (s: ConnState) => {
        this.connState = s;
        if (s === 'connected') this.authFailed = false;
        this.emit();
      }),
      this.client.on('hello', async () => {
        await this.refreshSessions();
        await this.refreshSystemInfo();
        this.startInfoLoop();
        if (!this.currentSessionKey) {
          const main = this.sessions.find(s => s.key.endsWith(':main'));
          const first = main ?? this.sessions.find(s => !s.archived);
          if (first) await this.selectSession(first.key);
        }
        this.emit();
      }),
      this.client.on('pairing-required', err => {
        this.pairingError = err?.message ?? 'pairing required';
        this.emit();
      }),
      this.client.on('auth-failed', () => {
        this.authFailed = true;
        sessionStorage.removeItem(CREDS_TOKEN_KEY);
        // 设备令牌也被拒(吊销/失效):清空,回退到手动输 token
        clearStoredDeviceTokens();
        this.emit();
      }),
      this.client.on('device-identity-failed', () => {
        this.deviceIdentityFailed = true;
        this.emit();
      }),
      this.client.on('chat', ev => this.handleChatEvent(ev)),
      this.client.on('agent', ev => this.handleAgentEvent(ev)),
      this.client.on('sessions-changed', () => {
        // 会话索引变化(新消息/新会话),延迟刷新避免抖动
        window.setTimeout(() => { void this.refreshSessions(); }, 400);
      }),
      this.client.on('gateway-shutdown', () => {
        // 网关主动关闭(更新/重启),client.onclose 会走重连
      }),
    ];
  }

  stop(): void {
    for (const un of this.unsubscribers) un();
    this.unsubscribers = [];
    this.stopInfoLoop();
    this.stopLogsLoop();
    this.client.disconnect();
    this.connState = 'idle';
    this.sessions = [];
    this.messages = [];
    this.cronJobs = [];
    this.skills = [];
    this.models = [];
    this.nodes = [];
    this.devicesPending = [];
    this.devicesPaired = [];
    this.presenceList = [];
    this.logLines = [];
    this.currentSessionKey = null;
    this.currentSessionId = null;
    this.stream = { active: false, runId: null, toolBusy: null, recentTools: [] };
    this.emit();
  }

  retryNow(): void {
    this.pairingError = null;
    this.authFailed = false;
    this.deviceIdentityFailed = false;
    if (this.connState === 'connecting') return;
    if (this.client.state === 'disconnected' || this.client.state === 'idle') {
      void this.start();
    } else {
      this.client.retryNow();
    }
  }

  // ---- 导航 ----

  setView(v: View): void {
    this.view = v;
    if (v === 'status') {
      void this.refreshSystemInfo();
      void this.refreshModels();
    }
    if (v === 'cron') void this.refreshCron();
    if (v === 'skills') void this.refreshSkills();
    if (v === 'devices') void this.refreshDevices();
    if (v === 'logs') this.startLogsLoop();
    else this.stopLogsLoop();
    this.emit();
  }

  // ---- 会话 ----

  async refreshSessions(): Promise<void> {
    if (this.client.state !== 'connected') return;
    try {
      this.sessions = await this.client.listSessions();
      this.emit();
    } catch (e) {
      console.error('[store] sessions.list failed', e);
    }
  }

  async selectSession(key: string): Promise<void> {
    this.currentSessionKey = key;
    this.currentSessionId = null;
    this.messages = [];
    this.stream = { active: false, runId: null, toolBusy: null, recentTools: [] };
    this.emit();
    await this.loadHistory();
  }

  async loadHistory(): Promise<void> {
    if (!this.currentSessionKey) return;
    this.historyLoading = true;
    this.emit();
    try {
      const hist = await this.client.chatHistory(this.currentSessionKey);
      if (this.currentSessionKey !== hist.sessionKey) return; // 已切换
      this.messages = hist.messages ?? [];
      this.currentSessionId = hist.sessionId ?? null;
    } catch (e) {
      console.error('[store] chat.history failed', e);
    } finally {
      this.historyLoading = false;
      this.emit();
    }
  }

  async newSession(): Promise<string | null> {
    try {
      const key = await this.client.createSession();
      await this.refreshSessions();
      await this.selectSession(key);
      this.setView('chat');
      return key;
    } catch (e) {
      console.error('[store] new session failed', e);
      return null;
    }
  }

  async patchSession(key: string, patch: Record<string, unknown>): Promise<void> {
    try {
      await this.client.patchSession(key, patch);
      await this.refreshSessions();
    } catch (e) {
      console.error('[store] sessions.patch failed', e);
    }
  }

  /** 当前会话的模型(provider/id 形式,如 zai/glm-4.7-flash)。 */
  get currentModel(): string {
    const s = this.sessions.find(x => x.key === this.currentSessionKey);
    if (!s) return '';
    const provider = (s as { modelProvider?: string }).modelProvider;
    return provider ? `${provider}/${s.model ?? ''}` : s.model ?? '';
  }

  /** 切换当前会话模型(sessions.patch { model: "provider/id" })。 */
  async setSessionModel(model: string): Promise<void> {
    if (!this.currentSessionKey || !model) return;
    await this.patchSession(this.currentSessionKey, { model });
  }

  // ---- 模型提供商管理(config.patch,热生效) ----

  configProviders: ProviderInfo[] = [];
  /** 原始 provider 条目(编辑时保留未知字段用;apiKey 已被网关掩码,不要回写) */
  configProvidersRaw: Record<string, Record<string, unknown>> = {};
  /** 供 UI 显示的最近一次配置错误 */
  configError: string | null = null;
  /** 安全概览(来自 config.get) */
  securityInfo: { authMode?: string; toolProfile?: string } | null = null;

  async refreshConfigProviders(): Promise<void> {
    if (this.client.state !== 'connected') return;
    try {
      const { config } = await this.client.configGet();
      const providers = (config as { models?: { providers?: Record<string, Record<string, unknown>> } }).models?.providers ?? {};
      this.configProvidersRaw = providers;
      this.configProviders = Object.entries(providers).map(([name, p]) => {
        const entry = p as { baseUrl?: string; api?: string; models?: Array<{ id?: string }> };
        return {
          name,
          baseUrl: entry?.baseUrl,
          api: entry?.api,
          modelIds: (entry?.models ?? []).map(m => m?.id ?? '').filter(Boolean),
        };
      });
      const gw = config as { gateway?: { auth?: { mode?: string } }; tools?: { profile?: string } };
      this.securityInfo = { authMode: gw?.gateway?.auth?.mode, toolProfile: gw?.tools?.profile };
      this.configError = null;
      this.emit();
    } catch (e) {
      console.error('[store] config.get failed', e);
    }
  }

  /**
   * 更新现有提供商(编辑模型数组/baseUrl)。
   * 安全:只提交 models 数组(必要时带 baseUrl),不回写 apiKey,
   * 用 replacePaths 允许数组替换;provider 级其他字段(config 等)不受影响。
   */
  async updateProviderModels(name: string, updates: { baseUrl?: string; models: Array<Record<string, unknown>> }): Promise<{ ok: boolean; error?: string }> {
    try {
      const providerPatch: Record<string, unknown> = { models: updates.models };
      if (updates.baseUrl !== undefined) providerPatch.baseUrl = updates.baseUrl;
      await this.client.configPatch(
        { models: { providers: { [name]: providerPatch } } },
        { replacePaths: [`models.providers.${name}.models`], note: `openclaw-webui: 更新模型 ${name}` },
      );
      this.configError = null;
      await Promise.all([this.refreshConfigProviders(), this.refreshModels()]);
      return { ok: true };
    } catch (e) {
      const msg = String((e as Error).message ?? e);
      this.configError = msg;
      this.emit();
      return { ok: false, error: msg };
    }
  }

  /** 当前会话的思考等级。 */
  get currentThinking(): string {
    const s = this.sessions.find(x => x.key === this.currentSessionKey);
    return s?.thinkingDefault ?? '';
  }

  get currentFastMode(): boolean {
    const s = this.sessions.find(x => x.key === this.currentSessionKey);
    return Boolean(s?.effectiveFastMode);
  }

  async setSessionThinking(level: string): Promise<void> {
    if (!this.currentSessionKey || !level) return;
    await this.patchSession(this.currentSessionKey, { thinkingLevel: level });
  }

  async setSessionFastMode(on: boolean): Promise<void> {
    if (!this.currentSessionKey) return;
    await this.patchSession(this.currentSessionKey, { fastMode: on });
  }

  /** 渠道状态行(settings 渠道卡用)。 */
  channelRows(): { id: string; label: string; state: string }[] {
    const ch = this.channels as {
      channelMeta?: Array<{ id: string; label?: string; detailLabel?: string }>;
      channels?: Record<string, { configured?: boolean; running?: boolean; connected?: boolean; state?: string }>;
      channelAccounts?: Record<string, unknown>;
    } | null;
    if (!ch) return [];
    const meta = ch.channelMeta ?? Object.keys(ch.channels ?? {}).map(id => ({ id, label: id }));
    const accounts = ch.channelAccounts ?? {};
    return meta.map(m => {
      const detail = ch.channels?.[m.id] ?? {};
      const hasAccount = m.id in accounts;
      const state = detail.connected ? '已连接' : detail.running ? '运行中' : detail.configured || hasAccount ? '已配置' : '未配置';
      return { id: m.id, label: m.label ?? m.id, state };
    });
  }

  // ---- Token 用量(按模型/提供商聚合) ----

  usageByModel: UsageByModelRow[] = [];
  usageTotals: UsageTotals = { input: 0, output: 0, cacheRead: 0, cacheWrite: 0, totalTokens: 0, totalCost: 0 };
  usageSessionCount = 0;
  usageRange = '';
  usageLoading = false;

  async refreshUsage(): Promise<void> {
    if (this.client.state !== 'connected') return;
    this.usageLoading = true;
    this.emit();
    try {
      const sessions = await this.client.sessionsUsage();
      const byModel = new Map<string, UsageByModelRow>();
      const totals: UsageTotals = { input: 0, output: 0, cacheRead: 0, cacheWrite: 0, totalTokens: 0, totalCost: 0 };
      let count = 0;
      for (const s of sessions) {
        const u = s.usage;
        if (!u) continue;
        count++;
        const model = `${s.modelProvider ?? '未知'}/${s.model ?? '未知'}`;
        const provider = s.modelProvider ?? '未知';
        const row = byModel.get(model) ?? { model, provider, sessions: 0, input: 0, output: 0, cacheRead: 0, cacheWrite: 0, totalTokens: 0, totalCost: 0 };
        row.sessions++;
        row.input += u.input ?? 0;
        row.output += u.output ?? 0;
        row.cacheRead += u.cacheRead ?? 0;
        row.cacheWrite += u.cacheWrite ?? 0;
        row.totalTokens += u.totalTokens ?? 0;
        row.totalCost += u.totalCost ?? 0;
        byModel.set(model, row);
        totals.input += u.input ?? 0;
        totals.output += u.output ?? 0;
        totals.cacheRead += u.cacheRead ?? 0;
        totals.cacheWrite += u.cacheWrite ?? 0;
        totals.totalTokens += u.totalTokens ?? 0;
        totals.totalCost += u.totalCost ?? 0;
      }
      this.usageByModel = [...byModel.values()].sort((a, b) => b.totalCost - a.totalCost);
      this.usageTotals = totals;
      this.usageSessionCount = count;
      this.usageRange = '全部记录';
      this.emit();
    } catch (e) {
      console.error('[store] sessions.usage failed', e);
    } finally {
      this.usageLoading = false;
      this.emit();
    }
  }

  /** 新增模型提供商(简化字段)。成功后刷新模型目录与列表。 */
  async addModelProvider(p: {
    name: string;
    baseUrl: string;
    apiKey: string;
    modelId: string;
    modelName?: string;
    contextWindow?: number;
    maxTokens?: number;
    api?: string;
    /** 每百万 tokens 价格:输入(未命中缓存)/ 输入(命中缓存)/ 输出 */
    costInput?: number;
    costCacheRead?: number;
    costOutput?: number;
  }): Promise<{ ok: boolean; error?: string }> {
    try {
      const model: Record<string, unknown> = {
        id: p.modelId,
        name: p.modelName || p.modelId,
        contextWindow: p.contextWindow ?? 131072,
        maxTokens: p.maxTokens ?? 8192,
        input: ['text'],
        reasoning: false,
      };
      if (p.costInput !== undefined || p.costCacheRead !== undefined || p.costOutput !== undefined) {
        model.cost = {
          ...(p.costInput !== undefined ? { input: p.costInput } : {}),
          ...(p.costCacheRead !== undefined ? { cacheRead: p.costCacheRead } : {}),
          ...(p.costOutput !== undefined ? { output: p.costOutput } : {}),
        };
      }
      await this.client.configPatch(
        {
          models: {
            providers: {
              [p.name]: {
                baseUrl: p.baseUrl,
                api: p.api || 'openai-completions',
                apiKey: p.apiKey,
                models: [model],
              },
            },
          },
        },
        { note: `openclaw-webui: 新增模型 ${p.name}/${p.modelId}` },
      );
      this.configError = null;
      await Promise.all([this.refreshConfigProviders(), this.refreshModels()]);
      return { ok: true };
    } catch (e) {
      const msg = String((e as Error).message ?? e);
      this.configError = msg;
      this.emit();
      return { ok: false, error: msg };
    }
  }

  /** 删除模型提供商(null + replacePaths)。 */
  async removeModelProvider(name: string): Promise<{ ok: boolean; error?: string }> {
    try {
      await this.client.configPatch(
        { models: { providers: { [name]: null } } },
        { replacePaths: [`models.providers.${name}.models`], note: `openclaw-webui: 删除模型 ${name}` },
      );
      this.configError = null;
      await Promise.all([this.refreshConfigProviders(), this.refreshModels()]);
      return { ok: true };
    } catch (e) {
      const msg = String((e as Error).message ?? e);
      this.configError = msg;
      this.emit();
      return { ok: false, error: msg };
    }
  }

  // ---- 聊天 ----

  async sendMessage(text: string): Promise<void> {
    if (!this.currentSessionKey || !text.trim()) return;
    const runId = crypto.randomUUID();
    // 乐观插入用户消息
    this.messages = [...this.messages, { role: 'user', content: text, timestamp: Date.now() }];
    this.stream = { active: true, runId, toolBusy: null, recentTools: [] };
    this.draftText = '';
    this.emit();
    try {
      await this.client.chatSend(this.currentSessionKey, text, runId, this.currentSessionId ?? undefined);
      // 成功启动后拉一次 history 对齐(替换乐观消息)
    } catch (e) {
      this.stream = { active: false, runId: null, toolBusy: null, recentTools: [] };
      console.error('[store] chat.send failed', e);
      this.emit();
    }
  }

  async abortRun(): Promise<void> {
    if (!this.currentSessionKey) return;
    try {
      await this.client.chatAbort(this.currentSessionKey);
    } catch (e) {
      console.error('[store] chat.abort failed', e);
    }
  }

  private handleChatEvent(ev: {
    runId: string;
    sessionKey: string;
    state: string;
    deltaText?: string;
    replace?: boolean;
    message?: ChatMessage;
    stopReason?: string;
  }): void {
    if (ev.sessionKey !== this.currentSessionKey) {
      // 其他会话的活动:只刷新列表角标
      void this.refreshSessions();
      return;
    }
    if (ev.state === 'delta' || ev.state === 'final' || ev.state === 'replace') {
      const incoming = ev.message;
      if (!incoming) return;
      if (incoming.role === 'assistant') {
        // 累积快照直接替换/追加到末尾的流式 assistant 消息
        const msgs = [...this.messages];
        const lastIdx = msgs.length - 1;
        const last = msgs[lastIdx];
        if (last && last.role === 'assistant' && this.isStreamingAssistant(last)) {
          msgs[lastIdx] = { ...incoming };
        } else {
          msgs.push({ ...incoming });
        }
        this.messages = msgs;
      }
    }
    if (ev.state === 'final') {
      this.stream = { active: false, runId: null, toolBusy: null, recentTools: this.stream.recentTools };
      // final 后延迟拉 history 拿权威 transcript(含 toolResult)
      window.setTimeout(() => { void this.loadHistory(); }, 350);
    }
    this.emit();
  }

  /** 标记本地流式 assistant 消息(无 usage/responseId 等落盘字段)。 */
  private isStreamingAssistant(m: ChatMessage): boolean {
    return Array.isArray(m.content) && !('responseId' in m) && !('usage' in m);
  }

  private handleAgentEvent(ev: {
    runId: string;
    sessionKey: string;
    stream: string;
    data?: Record<string, any>;
  }): void {
    if (ev.sessionKey !== this.currentSessionKey) return;
    if (!this.stream.active && this.stream.runId !== ev.runId) return;
    if (ev.stream === 'tool') {
      const d = ev.data ?? {};
      if (d.phase === 'start' || d.phase === 'begin') {
        this.stream = { ...this.stream, toolBusy: String(d.name ?? '') };
      } else if (d.phase === 'end' || d.phase === 'finish') {
        const tools = [...this.stream.recentTools];
        const idx = tools.findIndex(t => t.toolCallId === d.toolCallId);
        const entry: ToolActivity = {
          toolCallId: d.toolCallId,
          name: d.name,
          output: typeof d.result === 'string' ? d.result.slice(0, 4000) : undefined,
          isError: Boolean(d.isError),
        };
        if (idx >= 0) tools[idx] = entry; else tools.push(entry);
        this.stream = { ...this.stream, toolBusy: this.stream.toolBusy === d.name ? null : this.stream.toolBusy, recentTools: tools.slice(-6) };
        this.emit();
      }
    }
  }

  // ---- 系统状态 ----

  async refreshSystemInfo(): Promise<void> {
    if (this.client.state !== 'connected') return;
    try {
      this.systemInfo = await this.client.systemInfo();
      this.emit();
    } catch {
      // 无 operator.read 或旧网关:静默
    }
  }

  private startInfoLoop(): void {
    this.stopInfoLoop();
    this.infoTimer = window.setInterval(() => { void this.refreshSystemInfo(); }, 10_000);
  }

  private stopInfoLoop(): void {
    if (this.infoTimer !== null) {
      clearInterval(this.infoTimer);
      this.infoTimer = null;
    }
  }

  // ---- 定时任务 ----

  async refreshCron(): Promise<void> {
    if (this.client.state !== 'connected') return;
    try {
      this.cronJobs = await this.client.listCronJobs();
      this.emit();
    } catch (e) {
      console.error('[store] cron.list failed', e);
    }
  }

  async cronRunNow(id: string): Promise<void> {
    try { await this.client.cronRun(id); await this.refreshCron(); } catch (e) { console.error(e); }
  }

  async cronToggle(id: string, enabled: boolean): Promise<void> {
    try { await this.client.cronUpdate(id, { enabled }); await this.refreshCron(); } catch (e) { console.error(e); }
  }

  async cronDelete(id: string): Promise<void> {
    try { await this.client.cronRemove(id); await this.refreshCron(); } catch (e) { console.error(e); }
  }

  // ---- 技能 / 模型 ----

  async refreshSkills(): Promise<void> {
    if (this.client.state !== 'connected') return;
    try {
      this.skills = await this.client.listSkills();
      this.emit();
    } catch (e) { console.error('[store] skills.status failed', e); }
  }

  async refreshModels(): Promise<void> {
    if (this.client.state !== 'connected') return;
    try {
      this.models = await this.client.listModels();
      this.emit();
    } catch (e) { console.error('[store] models.list failed', e); }
  }

  // ---- 设备与节点 ----

  async refreshDevices(): Promise<void> {
    if (this.client.state !== 'connected') return;
    try {
      const [dev, nodes, presence, channels] = await Promise.all([
        this.client.listDevices(),
        this.client.listNodes().catch(() => [] as NodeRow[]),
        this.client.presence().catch(() => [] as PresenceEntry[]),
        this.client.channelsStatus().catch(() => null),
      ]);
      this.devicesPending = dev.pending;
      this.devicesPaired = dev.paired;
      this.nodes = nodes;
      this.presenceList = presence;
      this.channels = channels;
      this.emit();
    } catch (e) { console.error('[store] refreshDevices failed', e); }
  }

  async approveDevice(requestId: string): Promise<void> {
    try { await this.client.deviceApprove(requestId); await this.refreshDevices(); } catch (e) { console.error(e); }
  }

  async rejectDevice(requestId: string): Promise<void> {
    try { await this.client.deviceReject(requestId); await this.refreshDevices(); } catch (e) { console.error(e); }
  }

  // ---- 日志 ----

  private startLogsLoop(): void {
    this.stopLogsLoop();
    this.logsFollowing = true;
    void this.fetchLogs();
    this.logsTimer = window.setInterval(() => { void this.fetchLogs(); }, 3000);
  }

  private stopLogsLoop(): void {
    this.logsFollowing = false;
    if (this.logsTimer !== null) {
      clearInterval(this.logsTimer);
      this.logsTimer = null;
    }
  }

  clearLogs(): void {
    this.logLines = [];
    this.logsCursor = undefined;
    this.emit();
  }

  private async fetchLogs(): Promise<void> {
    if (this.client.state !== 'connected') return;
    try {
      const res: LogTailResult = await this.client.logsTail(this.logsCursor);
      if (typeof res.cursor === 'number') this.logsCursor = res.cursor;
      const parsed: LogLine[] = [];
      for (const raw of res.lines ?? []) {
        const text = typeof raw === 'string' ? raw : JSON.stringify(raw);
        let time = '';
        let message = text;
        try {
          const obj = typeof raw === 'string' ? JSON.parse(raw) : raw;
          if (obj && typeof obj === 'object') {
            const o = obj as Record<string, unknown>;
            const meta = o._meta as Record<string, unknown> | undefined;
            if (meta?.date) time = String(meta.date).slice(11, 19);
            if (typeof o['1'] === 'string') message = o['1'];
            else if (typeof o.msg === 'string') message = o.msg;
          }
        } catch { /* 非结构化行,原样展示 */ }
        parsed.push({ time, message, raw: text });
      }
      if (parsed.length) {
        // 追加并限制内存(最近 600 行)
        this.logLines = [...this.logLines, ...parsed].slice(-600);
        this.emit();
      }
    } catch {
      // cursor 过期等:重置后重试一次
      if (this.logsCursor !== undefined) {
        this.logsCursor = undefined;
      }
    }
  }
}

export const store = new AppStore();
