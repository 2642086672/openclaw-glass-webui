// 设置视图:语言切换(顶部)+ 网关连接 + 外观说明 + 关于
import { LitElement, html, nothing } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { store } from '../state/store';
import { t, getLocale, setLocale } from '../i18n/i18n';
import { renderBrand, fileToAvatarDataUrl, icon } from '../icons';

/** 可在线新增的常用渠道(字段名来自官方文档/实测 schema)。 */
const CHANNEL_SPECS: Array<{
  id: string;
  label: string;
  emoji: string;
  fields: Array<{ key: string; label: string; secret?: boolean; path?: string[] }>;
}> = [
  { id: 'telegram', label: 'Telegram', emoji: '✈️', fields: [{ key: 'botToken', label: 'Bot Token', secret: true }] },
  { id: 'discord', label: 'Discord', emoji: '🎮', fields: [{ key: 'token', label: 'Bot Token', secret: true }] },
  {
    id: 'feishu', label: '飞书', emoji: '🐦',
    fields: [
      { key: 'appId', label: 'App ID', path: ['accounts', 'main'] },
      { key: 'appSecret', label: 'App Secret', secret: true, path: ['accounts', 'main'] },
    ],
  },
  {
    id: 'qqbot', label: 'QQ 机器人', emoji: '🐧',
    fields: [
      { key: 'appId', label: 'App ID' },
      { key: 'clientSecret', label: 'Client Secret', secret: true },
    ],
  },
  {
    id: 'slack', label: 'Slack', emoji: '💼',
    fields: [
      { key: 'botToken', label: 'Bot Token', secret: true },
      { key: 'appToken', label: 'App Token', secret: true },
    ],
  },
];

type SetSection = 'general' | 'session' | 'models' | 'channels' | 'comms' | 'mcp' | 'agents' | 'memory' | 'security' | 'infra' | 'debug' | 'connection' | 'marketplace' | 'about' | 'advanced' | 'logs' | 'automation' | 'tools' | 'logging' | 'hooks' | 'gateway' | 'tts' | 'agententries' | 'cronconfig';

/** 编辑器里的模型行(全部字符串态,空=不改)。保留原始 entry 用于合入未知字段。 */
interface EditableModel {
  id: string;
  name: string;
  contextWindow: string;
  maxTokens: string;
  costInput: string;
  costCacheRead: string;
  costOutput: string;
  raw: Record<string, unknown>;
}

@customElement('settings-view')
export class SettingsView extends LitElement {
  @state() private urlInput = '';
  @state() private tokenInput = '';
  // 新增模型表单
  @state() private mpName = '';
  @state() private mpBaseUrl = '';
  @state() private mpApiKey = '';
  @state() private mpModelId = '';
  @state() private mpModelName = '';
  @state() private mpContext = '131072';
  @state() private mpMaxTokens = '8192';
  @state() private mpApi = 'openai-completions';
  @state() private mpCostInput = '';
  @state() private mpCostCacheRead = '';
  @state() private mpCostOutput = '';
  @state() private mpBusy = false;
  @state() private mpMessage: { ok: boolean; text: string } | null = null;
  // 编辑现有提供商
  @state() private editName = '';
  @state() private editBaseUrl = '';
  @state() private editModels: EditableModel[] = [];
  // AI 记忆 / 梦境
  @state() private memoryOpen = false;
  @state() private dreamOpen = false;
  // 新增渠道
  @state() private channelPick: string | null = null;
  @state() private channelFieldValues: Record<string, string> = {};
  @state() private channelBusy = false;
  @state() private channelMessage: { ok: boolean; text: string } | null = null;
  // 自定义渠道
  @state() private customChannelId = '';
  @state() private customChannelJson = '{"enabled": true}';
  // MCP
  @state() private mcpName = '';
  @state() private mcpMessage: { ok: boolean; text: string } | null = null;
  // MCP 增强:结构化表单
  @state() private mcpTransport = 'stdio';
  @state() private mcpCommand = '';
  @state() private mcpArgs = '';
  @state() private mcpEnv = '';
  @state() private mcpUrl = '';
  @state() private mcpTimeout = '';
  @state() private mcpHeaders = '';
  @state() private mcpEditMode = false;
  // 调试控制台
  @state() private debugMethod = '';
  @state() private debugParams = '';
  @state() private debugResult = '';
  @state() private debugBusy = false;
  // exec 审批策略 / 网关更新
  @state() private execOpen = false;
  @state() private execPolicy: Record<string, unknown> | null = null;
  @state() private updateBusy = false;
  @state() private updateMessage: { ok: boolean; text: string } | null = null;
  // 设置二级菜单当前分区
  @state() private section: SetSection = 'general';
  // AI 与代理:二级 tabs + Agent Defaults 编辑器
  @state() private agentsTab: 'agents' | 'skills' | 'tools' | 'session' = 'agents';
  @state() private adOpen: Record<string, boolean> = {};
  @state() private adModel = '';
  @state() private adUtility = '';
  @state() private adWorkspace = '';
  @state() private adImgPrimary = '';
  @state() private adImgFallbacks = '';
  @state() private adMediaImage = '';
  @state() private adMediaVideo = '';
  @state() private adMediaMusic = '';
  @state() private adCompactionEnabled = '';
  @state() private adCompactionMode = 'default';
  @state() private adKeepRecent = '';
  @state() private adRecentTurns = '';
  @state() private adCompTimeout = '';
  @state() private adFlushEnabled = '';
  @state() private adHbEvery = '';
  @state() private adHbStart = '';
  @state() private adHbEnd = '';
  @state() private adHbPrompt = '';
  @state() private adEmbeddedPolicy = '';
  @state() private adEmbeddedContract = '';
  @state() private adPolicyAllow = '';
  @state() private adBusy = false;
  @state() private adMessage: { ok: boolean; text: string } | null = null;
  private lastDefaultsRef: Record<string, unknown> | null = null;
  // 工具设置
  @state() private toolsBusy = false;
  @state() private toolsMessage: { ok: boolean; text: string } | null = null;
  @state() private toolsAllow = '';
  @state() private toolsDeny = '';
  @state() private toolsElevated = false;
  // 日志设置
  @state() private loggingBusy = false;
  @state() private loggingMessage: { ok: boolean; text: string } | null = null;
  // 钩子设置
  @state() private hooksBusy = false;
  @state() private hooksMessage: { ok: boolean; text: string } | null = null;
  // 网关网络
  @state() private gwBusy = false;
  @state() private gwMessage: { ok: boolean; text: string } | null = null;
  // TTS 语音
  @state() private ttsBusy = false;
  @state() private ttsMessage: { ok: boolean; text: string } | null = null;
  @state() private ttsNewProvider = '';
  @state() private ttsNewKey = '';
  // 单代理覆盖
  @state() private entryBusy = false;
  @state() private entryMessage: { ok: boolean; text: string } | null = null;
  @state() private entryEditId: string | null = null;
  @state() private entryModel = '';
  @state() private entryWorkspace = '';
  // Cron 全局
  @state() private cronCfgBusy = false;
  @state() private cronCfgMessage: { ok: boolean; text: string } | null = null;

  createRenderRoot() { return this; }

  connectedCallback(): void {
    super.connectedCallback();
    store.subscribe(() => { this.syncAgentForm(); this.syncToolsForm(); this.syncLoggingForm(); this.syncHooksForm(); this.syncGatewayForm(); this.syncTtsForm(); this.syncEntryForm(); this.syncCronCfgForm(); this.requestUpdate(); });
    this.urlInput = store.getGatewayUrl();
    this.tokenInput = store.getToken();
    void store.refreshConfigProviders();
    void store.refreshDevices();
    void store.loadAgents();
    void store.refreshCron();
    this.syncAgentForm();
    this.syncToolsForm();
    this.syncLoggingForm();
    this.syncHooksForm();
    this.syncGatewayForm();
    this.syncTtsForm();
    this.syncEntryForm();
    this.syncCronCfgForm();
  }

  /** agentDefaults 从网关加载后,把值镜像进表单状态。 */
  private syncAgentForm(): void {
    const d = store.agentDefaults;
    if (!d || d === this.lastDefaultsRef) return;
    this.lastDefaultsRef = d;
    const s = (v: unknown) => (v === undefined || v === null ? '' : String(v));
    const model = d.model as string | { primary?: string } | undefined;
    this.adModel = typeof model === 'string' ? model : s(model?.primary);
    this.adUtility = s(d.utilityModel);
    this.adWorkspace = s(d.workspace);
    const img = d.imageModel as string | { primary?: string; fallbacks?: string[] } | undefined;
    this.adImgPrimary = img == null || typeof img === 'string' ? s(img) : s(img.primary);
    this.adImgFallbacks = img == null || typeof img === 'string' ? '' : (img.fallbacks ?? []).join(', ');
    const media = (d.mediaModels ?? {}) as { image?: unknown; video?: unknown; music?: unknown };
    const mStr = (m: unknown) => (m == null || typeof m === 'string' ? s(m) : s((m as { primary?: string }).primary));
    this.adMediaImage = mStr(media.image);
    this.adMediaVideo = mStr(media.video);
    this.adMediaMusic = mStr(media.music);
    const comp = (d.compaction ?? {}) as Record<string, unknown>;
    this.adCompactionEnabled = comp.enabled === undefined ? '' : String(Boolean(comp.enabled));
    this.adCompactionMode = s(comp.mode) || 'default';
    this.adKeepRecent = comp.keepRecentTokens === undefined ? '' : String(comp.keepRecentTokens);
    this.adRecentTurns = comp.recentTurnsPreserve === undefined ? '' : String(comp.recentTurnsPreserve);
    this.adCompTimeout = comp.timeoutSeconds === undefined ? '' : String(comp.timeoutSeconds);
    const flush = (comp.memoryFlush ?? {}) as { enabled?: boolean };
    this.adFlushEnabled = flush.enabled === undefined ? '' : String(Boolean(flush.enabled));
    const hb = (d.heartbeat ?? {}) as Record<string, unknown>;
    this.adHbEvery = s(hb.every);
    const ah = (hb.activeHours ?? {}) as { start?: string; end?: string };
    this.adHbStart = s(ah.start);
    this.adHbEnd = s(ah.end);
    this.adHbPrompt = s(hb.prompt);
    const emb = (d.embeddedAgent ?? {}) as Record<string, unknown>;
    this.adEmbeddedPolicy = s(emb.projectSettingsPolicy);
    this.adEmbeddedContract = s(emb.executionContract);
    const policy = (d.modelPolicy ?? {}) as { allow?: string[] };
    this.adPolicyAllow = Array.isArray(policy.allow) ? JSON.stringify(policy.allow, null, 2) : '';
  }

  /** 空串 = 删除该键(null 会被 config.patch 解释为删除)。 */
  private cleanVal(v: string): string | null {
    const t2 = v.trim();
    return t2 === '' ? null : t2;
  }

  private async adSave(patch: Record<string, unknown>): Promise<void> {
    if (this.adBusy) return;
    this.adBusy = true;
    this.requestUpdate();
    const res = await store.patchAgentDefaults(patch);
    this.adBusy = false;
    this.adMessage = res.ok
      ? { ok: true, text: t('agentsSaved') }
      : { ok: false, text: `${t('agentsSaveFailed')}:${res.error ?? ''}` };
    this.requestUpdate();
  }

  private toggleAd(key: string): void {
    this.adOpen = { ...this.adOpen, [key]: !this.adOpen[key] };
  }

  private async handleThinking(level: string): Promise<void> {
    await store.setSessionThinking(level);
  }

  private async handleFast(on: boolean): Promise<void> {
    await store.setSessionFastMode(on);
  }

  // ---- Logo / 头像自定义 ----

  private brandingRow(kind: 'appLogo' | 'aiAvatar', labelKey: Parameters<typeof t>[0], fallback: string): ReturnType<typeof html> {
    const value = store.branding[kind];
    return html`
      <div class="brand-row">
        ${renderBrand(value, fallback, 'brand-preview')}
        <div class="brand-controls">
          <div class="hint" style="margin:0 0 4px;font-weight:700;color:var(--text-1)">${t(labelKey)}</div>
          <input class="field brand-emoji" type="text" placeholder="emoji" maxlength="4" .value=${value && !value.startsWith('data:') ? value : ''}
            @keydown=${(e: KeyboardEvent) => { if (e.key === 'Enter') store.setBranding(kind, (e.target as HTMLInputElement).value.trim()); }}
            @blur=${(e: FocusEvent) => store.setBranding(kind, (e.target as HTMLInputElement).value.trim())} />
          <label class="btn" style="padding:6px 12px;font-size:12px;cursor:pointer">
            ${t('brandUpload')}
            <input type="file" accept="image/*" style="display:none"
              @change=${(e: Event) => void this.handleAvatarUpload(kind, e)} />
          </label>
          ${value ? html`<button class="btn" style="padding:6px 12px;font-size:12px" @click=${() => store.setBranding(kind, '')}>${t('brandReset')}</button>` : nothing}
        </div>
      </div>
    `;
  }

  private async handleAvatarUpload(kind: 'appLogo' | 'aiAvatar', e: Event): Promise<void> {
    const input = e.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    try {
      const dataUrl = await fileToAvatarDataUrl(file);
      store.setBranding(kind, dataUrl);
    } catch (err) {
      console.error('avatar upload failed', err);
    }
    input.value = '';
  }

  private renderAppearanceCard() {
    return html`
      <div class="card glass">
        <h3>${t('brandCardTitle')}</h3>
        ${this.brandingRow('appLogo', 'brandAppLogo', '🦞')}
        <div style="height:12px"></div>
        ${this.brandingRow('aiAvatar', 'brandAiAvatar', '🦞')}
        <div class="hint">${t('brandHint')}</div>
      </div>
      <div class="card glass">
        <h3>${t('settingsAppearance')}</h3>
        <div class="hint">${t('settingsThemeFollow')}</div>
      </div>
    `;
  }

  private toggleMemory(): void {
    this.memoryOpen = !this.memoryOpen;
    if (this.memoryOpen && !store.memoryFiles.length) void store.loadMemoryFiles();
  }

  private toggleDream(): void {
    this.dreamOpen = !this.dreamOpen;
    if (this.dreamOpen && !store.dreamDiary) void store.loadDreamDiary();
  }

  /** AI 记忆卡:MEMORY.md + memory/ 日期文件,只读浏览。 */
  private renderMemoryCard() {
    const mem = store.memoryContent;
    return html`
      <div class="card glass">
        <h3>${t('memoryTitle')}
          <button class="toggle-btn" style="margin-left:10px;padding:4px 12px" @click=${() => this.toggleMemory()}>
            ${this.memoryOpen ? t('memoryCollapse') : t('memoryExpand')}
          </button>
        </h3>
        <div class="hint">${t('memoryHint')}</div>
        ${this.memoryOpen ? html`
          <div class="memory-files">
            ${store.memoryLoading && !store.memoryFiles.length ? html`<span class="hint">${t('loading')}</span>` : nothing}
            ${store.memoryFiles.map(file => html`
              <button class="toggle-btn ${mem?.path === file.path ? 'active' : ''}" style="margin:4px 6px 0 0;padding:5px 12px"
                @click=${() => void store.loadMemoryContent(file.path)}>
                ${file.path === 'MEMORY.md' ? t('memoryMainFile') : file.name}
              </button>
            `)}
          </div>
          ${mem ? html`
            <pre class="memory-view">${mem.content}</pre>
          ` : nothing}
        ` : nothing}
      </div>
    `;
  }

  /** 梦境日记卡。 */
  private renderDreamCard() {
    const diary = store.dreamDiary;
    const content = diary?.content ?? '';
    const entryCount = (content.match(/^\*\w+ \d+, \d+/gm) ?? []).length;
    return html`
      <div class="card glass">
        <h3>${t('dreamTitle')}
          <button class="toggle-btn" style="margin-left:10px;padding:4px 12px" @click=${() => this.toggleDream()}>
            ${this.dreamOpen ? t('memoryCollapse') : t('dreamExpand')}
          </button>
        </h3>
        <div class="hint">
          ${diary?.found ? t('dreamHintFound', { path: diary.path ?? '' }) : t('dreamHintEmpty')}
        </div>
        ${this.dreamOpen ? html`
          ${store.dreamLoading && !content ? html`<span class="hint">${t('loading')}</span>` : nothing}
          ${content ? html`<pre class="memory-view dream-view">${content}</pre>` : nothing}
          ${entryCount ? html`<div class="hint">${t('dreamEntryCount', { n: entryCount })}</div>` : nothing}
        ` : nothing}
      </div>
    `;
  }

  private async handleConnect(): Promise<void> {
    store.saveCreds(this.urlInput.trim() || 'ws://127.0.0.1:18789', this.tokenInput.trim());
    store.stop();
    await store.start();
  }

  private handleDisconnect(): void {
    store.stop();
    this.tokenInput = '';
    sessionStorage.removeItem('openclaw-webui.gateway-token');
  }

  private switchLocale(locale: 'zh' | 'en'): void {
    setLocale(locale);
    this.requestUpdate();
  }

  /** 从 baseUrl 推导 provider 标识(host 去掉公共前缀和 TLD)。 */
  private deriveName(baseUrl: string): string {
    try {
      const host = new URL(baseUrl).hostname; // api.longcat.chat
      const parts = host.split('.');
      const core = parts.length >= 2 ? parts[parts.length - 2] : host;
      return core.replace(/[^a-z0-9-]/gi, '').toLowerCase() || 'custom';
    } catch {
      return 'custom';
    }
  }

  private async submitModel(): Promise<void> {
    if (this.mpBusy) return;
    const baseUrl = this.mpBaseUrl.trim();
    const apiKey = this.mpApiKey.trim();
    const modelId = this.mpModelId.trim();
    if (!baseUrl || !apiKey || !modelId) return;
    const name = (this.mpName.trim() || this.deriveName(baseUrl)).toLowerCase().replace(/[^a-z0-9-]/g, '') || 'custom';
    this.mpBusy = true;
    this.mpMessage = null;
    this.requestUpdate();
    const res = await store.addModelProvider({
      name,
      baseUrl,
      apiKey,
      modelId,
      modelName: this.mpModelName.trim() || undefined,
      contextWindow: Number(this.mpContext) || undefined,
      maxTokens: Number(this.mpMaxTokens) || undefined,
      api: this.mpApi,
      costInput: this.mpCostInput.trim() ? Number(this.mpCostInput) : undefined,
      costCacheRead: this.mpCostCacheRead.trim() ? Number(this.mpCostCacheRead) : undefined,
      costOutput: this.mpCostOutput.trim() ? Number(this.mpCostOutput) : undefined,
    });
    this.mpBusy = false;
    this.mpMessage = res.ok
      ? { ok: true, text: `已添加 ${name}/${modelId},立即生效` }
      : { ok: false, text: res.error ?? '添加失败' };
    if (res.ok) {
      this.mpBaseUrl = '';
      this.mpApiKey = '';
      this.mpModelId = '';
      this.mpModelName = '';
      this.mpName = '';
      this.mpCostInput = '';
      this.mpCostCacheRead = '';
      this.mpCostOutput = '';
    }
    this.requestUpdate();
  }

  private async removeProvider(name: string): Promise<void> {
    if (!window.confirm(`确定删除模型提供商「${name}」?其下所有模型将从可用列表移除。`)) return;
    this.mpBusy = true;
    this.requestUpdate();
    const res = await store.removeModelProvider(name);
    this.mpBusy = false;
    this.mpMessage = res.ok ? { ok: true, text: `已删除 ${name}` } : { ok: false, text: res.error ?? '删除失败' };
    this.requestUpdate();
  }

  // ---- 编辑现有提供商 ----

  private startEdit(name: string): void {
    const raw = store.configProvidersRaw[name] as { baseUrl?: string; models?: Array<Record<string, unknown>> } | undefined;
    if (!raw) return;
    this.editName = name;
    this.editBaseUrl = raw.baseUrl ?? '';
    this.editModels = (raw.models ?? []).map(m => {
      const cost = (m.cost ?? {}) as { input?: number; cacheRead?: number; output?: number };
      return {
        id: String(m.id ?? ''),
        name: String(m.name ?? m.id ?? ''),
        contextWindow: m.contextWindow !== undefined ? String(m.contextWindow) : '',
        maxTokens: m.maxTokens !== undefined ? String(m.maxTokens) : '',
        costInput: cost.input !== undefined ? String(cost.input) : '',
        costCacheRead: cost.cacheRead !== undefined ? String(cost.cacheRead) : '',
        costOutput: cost.output !== undefined ? String(cost.output) : '',
        raw: m,
      };
    });
    this.mpMessage = null;
    this.requestUpdate();
  }

  private updateEditModel(idx: number, key: keyof EditableModel, value: string): void {
    this.editModels = this.editModels.map((m, i) => (i === idx ? { ...m, [key]: value } : m));
  }

  private removeEditModel(idx: number): void {
    this.editModels = this.editModels.filter((_, i) => i !== idx);
  }

  private async saveEdit(): Promise<void> {
    if (this.mpBusy || !this.editName) return;
    this.mpBusy = true;
    this.mpMessage = null;
    this.requestUpdate();
    // 保留每个模型 entry 的未知字段(如 reasoning、input、compat),只覆盖表单里填的
    const models = this.editModels.map(m => {
      const entry: Record<string, unknown> = { ...m.raw, id: m.id };
      if (m.name.trim()) entry.name = m.name.trim();
      if (m.contextWindow.trim()) entry.contextWindow = Number(m.contextWindow);
      if (m.maxTokens.trim()) entry.maxTokens = Number(m.maxTokens);
      const cost: Record<string, unknown> = { ...((m.raw.cost as Record<string, unknown>) ?? {}) };
      if (m.costInput.trim()) cost.input = Number(m.costInput);
      if (m.costCacheRead.trim()) cost.cacheRead = Number(m.costCacheRead);
      if (m.costOutput.trim()) cost.output = Number(m.costOutput);
      if (Object.keys(cost).length) entry.cost = cost;
      return entry;
    });
    const res = await store.updateProviderModels(this.editName, {
      baseUrl: this.editBaseUrl.trim() || undefined,
      models,
    });
    this.mpBusy = false;
    this.mpMessage = res.ok
      ? { ok: true, text: `已保存 ${this.editName},立即生效` }
      : { ok: false, text: res.error ?? '保存失败' };
    if (res.ok) this.editName = '';
    this.requestUpdate();
  }

  /** 会话偏好:模型/思考/极速(作用于当前会话)。 */
  private renderSessionCard() {
    const hasSession = Boolean(store.currentSessionKey);
    const curModel = store.currentModel;
    const curThink = store.currentThinking || 'off';
    const fast = store.currentFastMode;
    // 使用网关返回的模型支持的思考等级,避免发送不支持的值
    const thinks = store.currentThinkingLevels;
    return html`
      <div class="card glass">
        <h3>${t('prefTitle')}${hasSession ? html`<span class="badge dim" style="margin-left:8px">${t('prefForSession')}</span>` : ''}</h3>
        <div class="row"><span class="k">${t('prefModel')}</span><span class="v">${curModel || '—'}</span></div>
        <div class="row"><span class="k">${t('prefThinking')}</span></div>
        <div class="seg-control" style="margin:2px 0 8px">
          ${thinks.map(x => html`
            <button class=${curThink === x.id ? 'active' : ''} ?disabled=${!hasSession}
              @click=${() => void this.handleThinking(x.id)}>${x.label}</button>
          `)}
        </div>
        <div class="row"><span class="k">${t('prefFast')}</span></div>
        <div class="seg-control" style="margin:2px 0 4px">
          <button class=${!fast ? 'active' : ''} ?disabled=${!hasSession} @click=${() => void this.handleFast(false)}>${t('prefFastOff')}</button>
          <button class=${fast ? 'active' : ''} ?disabled=${!hasSession} @click=${() => void this.handleFast(true)}>${t('prefFastOn')}</button>
        </div>
        <div class="hint">${hasSession ? t('prefSessionHint') : t('prefNoSession')}</div>
      </div>
    `;
  }

  /** 渠道卡:状态 + 新增渠道 + 已配置渠道管理。 */
  private async submitChannel(): Promise<void> {
    if (!this.channelPick || this.channelBusy) return;
    const spec = CHANNEL_SPECS.find(s => s.id === this.channelPick)!;
    const cfg: Record<string, unknown> = { enabled: true };
    for (const field of spec.fields) {
      const v = (this.channelFieldValues[field.key] ?? '').trim();
      if (!v) continue;
      if (field.path) {
        let node = cfg as Record<string, unknown>;
        for (const seg of field.path) {
          node[seg] = (node[seg] as Record<string, unknown>) ?? {};
          node = node[seg] as Record<string, unknown>;
        }
        node[field.key] = v;
      } else {
        cfg[field.key] = v;
      }
    }
    this.channelBusy = true;
    this.requestUpdate();
    const res = await store.addChannel(this.channelPick, cfg);
    this.channelBusy = false;
    this.channelMessage = res.ok
      ? { ok: true, text: t('channelSaved', { id: this.channelPick }) }
      : { ok: false, text: res.error ?? 'error' };
    if (res.ok) {
      this.channelPick = null;
      this.channelFieldValues = {};
    }
    this.requestUpdate();
  }

  private async deleteChannel(id: string): Promise<void> {
    if (!window.confirm(t('channelDeleteConfirm', { id }))) return;
    this.channelBusy = true;
    this.requestUpdate();
    const res = await store.removeChannel(id);
    this.channelBusy = false;
    this.channelMessage = res.ok
      ? { ok: true, text: t('channelDeleted', { id }) }
      : { ok: false, text: res.error ?? 'error' };
    this.requestUpdate();
  }

  private async logoutChannel(id: string): Promise<void> {
    if (!window.confirm(t('channelLogoutConfirm', { id }))) return;
    this.channelBusy = true;
    this.requestUpdate();
    await store.logoutChannel(id);
    this.channelBusy = false;
    this.channelMessage = { ok: true, text: t('channelLoggedOut', { id }) };
    await Promise.all([store.refreshDevices(), store.refreshConfigProviders()]);
    this.requestUpdate();
  }

  private async submitCustomChannel(): Promise<void> {
    if (this.channelBusy) return;
    const id = this.customChannelId.trim().toLowerCase().replace(/[^a-z0-9_-]/g, '');
    if (!id) return;
    let parsed: Record<string, unknown>;
    try {
      parsed = JSON.parse(this.customChannelJson);
    } catch (e) {
      this.channelMessage = { ok: false, text: `JSON 格式错误:${String(e).slice(0, 80)}` };
      this.requestUpdate();
      return;
    }
    this.channelBusy = true;
    this.requestUpdate();
    const res = await store.addChannel(id, parsed);
    this.channelBusy = false;
    this.channelMessage = res.ok
      ? { ok: true, text: t('channelSaved', { id }) }
      : { ok: false, text: res.error ?? 'error' };
    if (res.ok) {
      this.channelPick = null;
      this.customChannelId = '';
      this.customChannelJson = '{"enabled": true}';
    }
    this.requestUpdate();
  }

  private async toggleExecPolicy(): Promise<void> {
    this.execOpen = !this.execOpen;
    if (this.execOpen && !this.execPolicy) {
      try {
        const res = await store.client.execApprovalsGet();
        this.execPolicy = res?.file ?? { note: 'empty' };
      } catch (e) { this.execPolicy = { error: String(e) }; }
    }
    this.requestUpdate();
  }

  private async runGatewayUpdate(): Promise<void> {
    if (this.updateBusy) return;
    if (!window.confirm(t('updateConfirm'))) return;
    this.updateBusy = true;
    this.updateMessage = { ok: true, text: t('updateRunning') };
    this.requestUpdate();
    const res = await store.gatewayUpdate();
    this.updateBusy = false;
    this.updateMessage = res.ok
      ? { ok: true, text: t('updateDone') }
      : { ok: false, text: res.error ?? 'error' };
    this.requestUpdate();
  }

  // ---- 通信(TTS/语音) ----
  private renderCommsCard() {
    const tts = store.ttsInfo;
    return html`
      <div class="card glass">
        <h3>${t('commsTitle')}
          <button class="toggle-btn" style="margin-left:10px;padding:4px 12px" @click=${() => void store.loadTts()}>${icon('refresh')}</button>
        </h3>
        ${!tts ? html`<div class="hint">${t('loading')}</div>` : html`
          <div class="row">
            <span class="k">${t('commsTts')}</span>
            <span class="v seg-control" style="display:inline-flex;padding:2px">
              <button class=${tts.enabled ? 'active' : ''} style="padding:4px 14px" @click=${() => void store.ttsSetEnabled(true)}>${t('commsOn')}</button>
              <button class=${!tts.enabled ? 'active' : ''} style="padding:4px 14px" @click=${() => void store.ttsSetEnabled(false)}>${t('commsOff')}</button>
            </span>
          </div>
          <div class="row">
            <span class="k">${t('commsProvider')}</span>
            <span class="v">
              <select class="field" style="width:auto;padding:5px 26px 5px 12px" .value=${tts.provider ?? ''}
                @change=${(e: Event) => void store.ttsSetProvider((e.target as HTMLSelectElement).value)}>
                ${(tts.providerStates ?? []).map(p => html`<option value=${p.id} ?selected=${p.id === tts.provider}>${p.label ?? p.id}</option>`)}
              </select>
            </span>
          </div>
          <div class="row"><span class="k">${t('commsAuto')}</span><span class="v">${tts.auto ?? '—'}</span></div>
          <div class="hint">${t('commsHintLive')}</div>
        `}
      </div>
    `;
  }

  // ---- MCP 服务器 ----
  /** 快速模板:常用 MCP 服务器配置。 */
  private mcpTemplates: Array<{ id: string; label: string; config: Record<string, unknown> }> = [
    { id: 'github', label: 'GitHub', config: { command: 'npx', args: ['-y', '@modelcontextprotocol/server-github'], env: {} } },
    { id: 'filesystem', label: '文件系统', config: { command: 'npx', args: ['-y', '@modelcontextprotocol/server-filesystem', '/path/to/dir'], env: {} } },
    { id: 'sqlite', label: 'SQLite', config: { command: 'npx', args: ['-y', '@modelcontextprotocol/server-sqlite', '--db', './data.db'], env: {} } },
    { id: 'fetch', label: '网页抓取', config: { command: 'npx', args: ['-y', '@modelcontextprotocol/server-fetch'], env: {} } },
    { id: 'brave-search', label: 'Brave 搜索', config: { command: 'npx', args: ['-y', '@modelcontextprotocol/server-brave-search'], env: {} } },
    { id: 'postgres', label: 'PostgreSQL', config: { command: 'npx', args: ['-y', '@modelcontextprotocol/server-postgres', 'postgresql://user:pass@localhost/db'], env: {} } },
  ];

  private mcpApplyTemplate(tpl: Record<string, unknown>): void {
    const cfg = { ...tpl };
    this.mcpTransport = cfg.url ? 'http' : 'stdio';
    this.mcpCommand = String(cfg.command ?? '');
    this.mcpArgs = ((cfg.args as string[]) ?? []).join(', ');
    const env = (cfg.env as Record<string, string>) ?? {};
    this.mcpEnv = Object.entries(env).map(([k, v]) => `${k}=${v}`).join('\n');
    this.mcpUrl = String(cfg.url ?? '');
    this.mcpTimeout = cfg.timeout ? String(cfg.timeout) : '';
    this.mcpHeaders = '';
    this.mcpEditMode = false;
    this.mcpName = '';
  }

  private mcpPrefillEdit(name: string, s: Record<string, unknown>): void {
    this.mcpName = name;
    this.mcpEditMode = true;
    this.mcpTransport = s.url ? 'http' : 'stdio';
    this.mcpCommand = String(s.command ?? '');
    this.mcpArgs = ((s.args as string[]) ?? []).join(', ');
    const env = (s.env as Record<string, string>) ?? {};
    this.mcpEnv = Object.entries(env).map(([k, v]) => `${k}=${v}`).join('\n');
    this.mcpUrl = String(s.url ?? '');
    this.mcpTimeout = s.timeout ? String(s.timeout) : '';
    const hdrs = (s.headers as Record<string, string>) ?? {};
    this.mcpHeaders = Object.entries(hdrs).map(([k, v]) => `${k}=${v}`).join('\n');
  }

  private mcpBuildConfig(): Record<string, unknown> | null {
    const cfg: Record<string, unknown> = {};
    if (this.mcpTransport === 'stdio') {
      if (!this.mcpCommand.trim()) return null;
      cfg.command = this.mcpCommand.trim();
      const args = this.mcpArgs.split(',').map(x => x.trim()).filter(Boolean);
      if (args.length) cfg.args = args;
    } else {
      if (!this.mcpUrl.trim()) return null;
      cfg.url = this.mcpUrl.trim();
    }
    const env: Record<string, string> = {};
    for (const line of this.mcpEnv.split('\n')) {
      const t = line.trim();
      if (!t || t.startsWith('#')) continue;
      const eq = t.indexOf('=');
      if (eq > 0) env[t.slice(0, eq).trim()] = t.slice(eq + 1).trim();
    }
    if (Object.keys(env).length) cfg.env = env;
    if (this.mcpTransport === 'http' && this.mcpHeaders.trim()) {
      const hdrs: Record<string, string> = {};
      for (const line of this.mcpHeaders.split('\n')) {
        const t = line.trim();
        if (!t || t.startsWith('#')) continue;
        const eq = t.indexOf('=');
        if (eq > 0) hdrs[t.slice(0, eq).trim()] = t.slice(eq + 1).trim();
      }
      if (Object.keys(hdrs).length) cfg.headers = hdrs;
    }
    if (this.mcpTimeout.trim() && Number(this.mcpTimeout) > 0) cfg.timeout = Number(this.mcpTimeout);
    return cfg;
  }

  private async submitMcp(): Promise<void> {
    if (this.channelBusy) return;
    const name = this.mcpName.trim();
    if (!name) return;
    const cfg = this.mcpBuildConfig();
    if (!cfg) { this.mcpMessage = { ok: false, text: t('mcpErrorCmdOrUrl') }; this.requestUpdate(); return; }
    this.channelBusy = true; this.requestUpdate();
    const res = this.mcpEditMode
      ? await store.updateMcpServer(name, cfg)
      : await store.addMcpServer(name, cfg);
    this.channelBusy = false;
    this.mcpMessage = res.ok
      ? { ok: true, text: t(this.mcpEditMode ? 'mcpUpdated' : 'mcpSaved', { name }) }
      : { ok: false, text: res.error ?? 'error' };
    if (res.ok) this.mcpResetForm();
    this.requestUpdate();
  }

  private mcpResetForm(): void {
    this.mcpName = '';
    this.mcpEditMode = false;
    this.mcpTransport = 'stdio';
    this.mcpCommand = '';
    this.mcpArgs = '';
    this.mcpEnv = '';
    this.mcpUrl = '';
    this.mcpTimeout = '';
    this.mcpHeaders = '';
  }

  private async toggleMcp(name: string, enabled: boolean): Promise<void> {
    if (this.channelBusy) return;
    this.channelBusy = true; this.requestUpdate();
    const res = await store.updateMcpServer(name, { enabled });
    this.channelBusy = false;
    if (!res.ok) this.mcpMessage = { ok: false, text: res.error ?? 'error' };
    this.requestUpdate();
  }

  private async deleteMcp(name: string): Promise<void> {
    if (!window.confirm(t('mcpDeleteConfirm', { name }))) return;
    this.channelBusy = true; this.requestUpdate();
    const res = await store.removeMcpServer(name);
    this.channelBusy = false;
    this.mcpMessage = res.ok ? { ok: true, text: t('mcpDeleted', { name }) } : { ok: false, text: res.error ?? 'error' };
    this.requestUpdate();
  }

  private renderMcpCard() {
    const servers = store.mcpServers ?? {};
    const names = Object.keys(servers);
    return html`
      <div class="card glass">
        <h3>${t('mcpTitle')}
          <button class="toggle-btn" style="margin-left:10px;padding:4px 12px" @click=${() => void store.refreshConfigProviders()}>${icon('refresh')}</button>
        </h3>
        <div class="hint">${t('mcpHint')}</div>

        ${names.length ? names.map(n => {
          const s = servers[n] ?? {};
          const enabled = s.enabled !== false;
          const cmd = String(s.command ?? s.url ?? s.baseUrl ?? '');
          const isHttp = Boolean(s.url);
          return html`
            <div class="mp-row">
              <div class="mp-info">
                <div class="mp-name">${n}
                  <span class="badge ${enabled ? 'active' : 'off'}">${enabled ? t('commsOn') : t('commsOff')}</span>
                  <span class="badge dim">${isHttp ? 'HTTP' : 'stdio'}</span>
                </div>
                <div class="mp-sub">${cmd}</div>
              </div>
              <button class="toggle-btn" style="padding:4px 10px;font-size:12px" ?disabled=${this.channelBusy}
                @click=${() => void this.toggleMcp(n, !enabled)}>${enabled ? '◾' : '▶'}</button>
              <button class="icon-btn" title=${t('edit')} ?disabled=${this.channelBusy}
                @click=${() => this.mcpPrefillEdit(n, s)}>✏️</button>
              <button class="icon-btn" title=${t('delete')} ?disabled=${this.channelBusy}
                @click=${() => void this.deleteMcp(n)}>🗑</button>
            </div>
          `;
        }) : html`<div class="hint">${t('mcpEmpty')}</div>`}

        <div class="mp-form-title">${this.mcpEditMode ? t('mcpEditing', { name: this.mcpName }) : t('mcpAdd')}</div>

        <!-- 快速模板 -->
        ${!this.mcpEditMode ? html`
          <div class="hint" style="margin:6px 0 4px">${t('mcpQuickTpl')}</div>
          <div class="mcp-templates">
            ${this.mcpTemplates.map(tpl => html`
              <button class="toggle-btn" style="padding:4px 10px;font-size:12px;margin:2px"
                @click=${() => this.mcpApplyTemplate(tpl.config)}>${tpl.label}</button>
            `)}
          </div>
        ` : nothing}

        <label class="hint" style="margin:6px 0 4px">${t('mcpName')}</label>
        <input class="field" placeholder="如:github" .value=${this.mcpName}
          ?disabled=${this.mcpEditMode}
          @input=${(e: InputEvent) => { this.mcpName = (e.target as HTMLInputElement).value; }} />

        <div class="row" style="margin:8px 0 4px"><span class="k">${t('mcpTransport')}</span></div>
        <div class="seg-control" style="margin:2px 0 8px">
          <button class=${this.mcpTransport === 'stdio' ? 'active' : ''} @click=${() => { this.mcpTransport = 'stdio'; }}>stdio (本地命令)</button>
          <button class=${this.mcpTransport === 'http' ? 'active' : ''} @click=${() => { this.mcpTransport = 'http'; }}>HTTP/SSE (远程)</button>
        </div>

        ${this.mcpTransport === 'stdio' ? html`
          <label class="hint" style="margin:6px 0 4px">${t('mcpCommand')}</label>
          <input class="field" placeholder="npx" .value=${this.mcpCommand}
            @input=${(e: InputEvent) => { this.mcpCommand = (e.target as HTMLInputElement).value; }} />
          <label class="hint" style="margin:8px 0 4px">${t('mcpArgs')}</label>
          <input class="field" placeholder="-y, @modelcontextprotocol/server-github" .value=${this.mcpArgs}
            @input=${(e: InputEvent) => { this.mcpArgs = (e.target as HTMLInputElement).value; }} />
        ` : html`
          <label class="hint" style="margin:6px 0 4px">${t('mcpUrl')}</label>
          <input class="field" type="url" placeholder="https://mcp.example.com/sse" .value=${this.mcpUrl}
            @input=${(e: InputEvent) => { this.mcpUrl = (e.target as HTMLInputElement).value; }} />
          <label class="hint" style="margin:8px 0 4px">${t('mcpHeaders')}</label>
          <textarea class="field" rows="2" placeholder="Authorization=Bearer xxx&#10;X-Custom=value" .value=${this.mcpHeaders}
            @input=${(e: InputEvent) => { this.mcpHeaders = (e.target as HTMLTextAreaElement).value; }}></textarea>
        `}

        <label class="hint" style="margin:8px 0 4px">${t('mcpEnv')}</label>
        <textarea class="field" rows="2" placeholder="GITHUB_TOKEN=ghp_xxx&#10;DEBUG=1" .value=${this.mcpEnv}
          @input=${(e: InputEvent) => { this.mcpEnv = (e.target as HTMLTextAreaElement).value; }}></textarea>

        <label class="hint" style="margin:8px 0 4px">${t('mcpTimeout')}</label>
        <input class="field" type="number" min="1000" step="1000" placeholder="30000" .value=${this.mcpTimeout}
          @input=${(e: InputEvent) => { this.mcpTimeout = (e.target as HTMLInputElement).value; }} />

        <div class="actions">
          <button class="btn primary" style="width:100%" ?disabled=${!this.mcpName.trim() || this.channelBusy}
            @click=${() => void this.submitMcp()}>${this.channelBusy ? t('loading') : (this.mcpEditMode ? t('mcpSaveEdit') : t('mcpAddBtn'))}</button>
          ${this.mcpEditMode ? html`<button class="btn" style="width:100%;margin-top:6px" @click=${() => this.mcpResetForm()}>${t('cancel')}</button>` : nothing}
        </div>

        ${this.mcpMessage ? html`<div class="notice ${this.mcpMessage.ok ? 'ok' : 'error'}" style="margin-top:10px">${this.mcpMessage.text}</div>` : nothing}
      </div>
    `;
  }

  // ---- 代理(AI 与代理) ----

  /** 可折叠行:标题+描述+徽章,点击头部展开/收起。 */
  private adCollapsible(key: string, title: string, desc: string | null, badges: string[], body: unknown): unknown {
    const open = Boolean(this.adOpen[key]);
    return html`
      <div class="ad-item">
        <div class="ad-item-head" @click=${() => this.toggleAd(key)}>
          <div class="ad-item-text">
            <div class="ad-item-title">${title}
              ${badges.map(b => html`<span class="badge dim" style="margin-left:6px">${b}</span>`)}
            </div>
            ${desc ? html`<div class="ad-item-desc">${desc}</div>` : nothing}
          </div>
          <span class="ad-chev ${open ? 'open' : ''}">▾</span>
        </div>
        ${open ? html`<div class="ad-item-body">${body}</div>` : nothing}
      </div>
    `;
  }

  private adSeg(opts: Array<{ id: string; label: string }>, cur: string, on: (id: string) => void): unknown {
    return html`
      <div class="seg-control">
        ${opts.map(o => html`<button class=${cur === o.id ? 'active' : ''} @click=${() => on(o.id)}>${o.label}</button>`)}
      </div>
    `;
  }

  private adField(label: string, value: string, on: (v: string) => void, type = 'text'): unknown {
    return html`
      <label class="ad-field">
        <span>${label}</span>
        <input class="field" type=${type} .value=${value} @input=${(e: Event) => on((e.target as HTMLInputElement).value)} />
      </label>
    `;
  }

  private numOrNull(v: string): number | null {
    const n = Number(v);
    return v.trim() !== '' && Number.isFinite(n) ? n : null;
  }

  private async saveCompaction(): Promise<void> {
    const raw = { ...((store.agentDefaults?.compaction as Record<string, unknown>) ?? {}) };
    if (this.adCompactionEnabled !== '') raw.enabled = this.adCompactionEnabled === 'true';
    if (this.adCompactionMode) raw.mode = this.adCompactionMode;
    const kr = this.numOrNull(this.adKeepRecent);
    if (kr === null) delete raw.keepRecentTokens; else raw.keepRecentTokens = kr;
    const rt = this.numOrNull(this.adRecentTurns);
    if (rt === null) delete raw.recentTurnsPreserve; else raw.recentTurnsPreserve = rt;
    const ts = this.numOrNull(this.adCompTimeout);
    if (ts === null) delete raw.timeoutSeconds; else raw.timeoutSeconds = ts;
    const flush = { ...((raw.memoryFlush as Record<string, unknown>) ?? {}) };
    if (this.adFlushEnabled !== '') flush.enabled = this.adFlushEnabled === 'true';
    if (Object.keys(flush).length) raw.memoryFlush = flush; else delete raw.memoryFlush;
    await this.adSave(Object.keys(raw).length ? { compaction: raw } : { compaction: null });
  }

  private async saveEmbedded(): Promise<void> {
    const raw = { ...((store.agentDefaults?.embeddedAgent as Record<string, unknown>) ?? {}) };
    if (this.adEmbeddedPolicy) raw.projectSettingsPolicy = this.adEmbeddedPolicy; else delete raw.projectSettingsPolicy;
    if (this.adEmbeddedContract) raw.executionContract = this.adEmbeddedContract; else delete raw.executionContract;
    await this.adSave(Object.keys(raw).length ? { embeddedAgent: raw } : { embeddedAgent: null });
  }

  private async saveHeartbeat(): Promise<void> {
    const raw = { ...((store.agentDefaults?.heartbeat as Record<string, unknown>) ?? {}) };
    const every = this.cleanVal(this.adHbEvery);
    if (every === null) delete raw.every; else raw.every = every;
    const ah = { ...((raw.activeHours as Record<string, unknown>) ?? {}) };
    const st = this.cleanVal(this.adHbStart);
    if (st === null) delete ah.start; else ah.start = st;
    const en = this.cleanVal(this.adHbEnd);
    if (en === null) delete ah.end; else ah.end = en;
    if (Object.keys(ah).length) raw.activeHours = ah; else delete raw.activeHours;
    const pr = this.cleanVal(this.adHbPrompt);
    if (pr === null) delete raw.prompt; else raw.prompt = pr;
    await this.adSave(Object.keys(raw).length ? { heartbeat: raw } : { heartbeat: null });
  }

  private async saveImageModel(): Promise<void> {
    const primary = this.cleanVal(this.adImgPrimary);
    const fbs = this.adImgFallbacks.split(',').map(x => x.trim()).filter(Boolean);
    if (primary === null) await this.adSave({ imageModel: null });
    else if (!fbs.length) await this.adSave({ imageModel: primary });
    else await this.adSave({ imageModel: { primary, fallbacks: fbs } });
  }

  private async saveMediaModels(): Promise<void> {
    const raw = { ...((store.agentDefaults?.mediaModels as Record<string, unknown>) ?? {}) };
    for (const [k, v] of [['image', this.adMediaImage], ['video', this.adMediaVideo], ['music', this.adMediaMusic]] as const) {
      const c = this.cleanVal(v);
      if (c === null) delete raw[k]; else raw[k] = c;
    }
    await this.adSave(Object.keys(raw).length ? { mediaModels: raw } : { mediaModels: null });
  }

  private async saveModelPolicy(): Promise<void> {
    const txt = this.adPolicyAllow.trim();
    if (!txt) { await this.adSave({ modelPolicy: null }); return; }
    let allow: unknown;
    try { allow = JSON.parse(txt); }
    catch {
      this.adMessage = { ok: false, text: `${t('agentsSaveFailed')}:JSON ${t('debugParams')}` };
      this.requestUpdate();
      return;
    }
    await this.adSave({ modelPolicy: { allow } });
  }

  private renderAgentsSkills() {
    const list = store.skills;
    return html`
      <div class="card glass">
        <h3>${t('agentsTabSkills')}</h3>
        <div class="hint">${t('agentsSkillsHint')}</div>
        ${!list.length ? html`<div class="hint">${t('loading')}</div>` : list.map(s => {
          const enabled = !s.disabled;
          const key = s.skillKey ?? s.name;
          return html`
            <div class="mp-row">
              <div class="mp-info">
                <div class="mp-name">${s.emoji ?? '🧩'} ${s.name}</div>
                <div class="mp-sub">${s.description ?? ''}</div>
              </div>
              <div class="seg-control">
                <button class=${enabled ? 'active' : ''} @click=${() => void store.setSkillEnabled(key, true)}>开</button>
                <button class=${!enabled ? 'active' : ''} @click=${() => void store.setSkillEnabled(key, false)}>关</button>
              </div>
            </div>
          `;
        })}
      </div>
    `;
  }

  private renderAgentsTools() {
    const profile = store.securityInfo?.toolProfile;
    return html`
      <div class="card glass">
        <h3>${t('agentsToolsTitle')}</h3>
        <div class="row"><span class="k">${t('securityProfile')}</span><span class="v">${profile ?? '—'}</span></div>
        <div class="hint">${t('agentsToolsHint')}</div>
      </div>
    `;
  }

  private renderAgentsCard() {
    const d = store.agentDefaults ?? {};
    const connected = store.connState === 'connected';
    const cardOpen = this.adOpen['card'] !== false;
    const elevated = typeof d.elevatedDefault === 'string' ? d.elevatedDefault : 'off';
    const fastRaw = d.fastModeDefault;
    const fast = fastRaw === undefined || typeof fastRaw === 'string' ? 'auto' : fastRaw ? 'on' : 'off';
    const thinking = typeof d.thinkingDefault === 'string' ? d.thinkingDefault : 'off';
    const tabs = [
      { id: 'agents', label: t('agentsTabAgents') },
      { id: 'skills', label: t('agentsTabSkills') },
      { id: 'tools', label: t('agentsTabTools') },
      { id: 'session', label: t('agentsTabSession') },
    ] as const;
    return html`
      <div class="card glass" style="padding-bottom:2px">
        <h3>${t('agentsTitle')}</h3>
        <div class="hint">${t('agentsSectionDesc')}</div>
        <div class="subtabs">
          ${tabs.map(tb => html`
            <button class="subtab ${this.agentsTab === tb.id ? 'active' : ''}"
              @click=${() => { this.agentsTab = tb.id; }}>${tb.label}</button>
          `)}
        </div>
      </div>
      ${this.agentsTab === 'agents' ? html`
        <div class="ad-sec-label">${t('agentsSectionName')} · ${t('agentsSectionDesc')}</div>
        <div class="card glass ad-card">
          <div class="ad-item-head" @click=${() => this.toggleAd('card')}>
            <div class="ad-item-text">
              <div class="ad-item-title">${t('agentsDefaultsTitle')}</div>
              <div class="ad-item-desc">${t('agentsDefaultsDesc')}</div>
            </div>
            <span class="ad-chev ${cardOpen ? 'open' : ''}">▾</span>
          </div>
          ${cardOpen ? html`
            <div class="ad-items">
              ${this.adCollapsible('compaction', t('agentsCompaction'), t('agentsCompactionDesc'), [], html`
                <div class="ad-fields">
                  <div class="ad-field-line">
                    <span class="ad-field-label">${t('agentsCompactionEnabled')}</span>
                    ${this.adSeg([{ id: 'true', label: t('commsOn') }, { id: 'false', label: t('commsOff') }], this.adCompactionEnabled || 'true', v => { this.adCompactionEnabled = v; })}
                  </div>
                  <div class="ad-field-line">
                    <span class="ad-field-label">${t('agentsCompactionMode')}</span>
                    ${this.adSeg([{ id: 'default', label: 'default' }, { id: 'safeguard', label: 'safeguard' }], this.adCompactionMode, v => { this.adCompactionMode = v; })}
                  </div>
                  <div class="mp-grid mp-grid-3">
                    ${this.adField(t('agentsCompactionKeepRecent'), this.adKeepRecent, v => { this.adKeepRecent = v; }, 'number')}
                    ${this.adField(t('agentsCompactionRecentTurns'), this.adRecentTurns, v => { this.adRecentTurns = v; }, 'number')}
                    ${this.adField(t('agentsCompactionTimeout'), this.adCompTimeout, v => { this.adCompTimeout = v; }, 'number')}
                  </div>
                  <div class="ad-field-line">
                    <span class="ad-field-label">${t('agentsMemoryFlush')}</span>
                    ${this.adSeg([{ id: 'true', label: t('commsOn') }, { id: 'false', label: t('commsOff') }], this.adFlushEnabled || 'false', v => { this.adFlushEnabled = v; })}
                  </div>
                  <div class="actions">
                    <button class="btn primary" ?disabled=${this.adBusy || !connected} @click=${() => void this.saveCompaction()}>${t('agentsSave')}</button>
                  </div>
                </div>
              `)}
              <div class="ad-item">
                <div class="ad-item-head plain">
                  <div class="ad-item-text">
                    <div class="ad-item-title">${t('agentsElevated')}</div>
                    <div class="ad-item-desc">${t('agentsElevatedDesc')}</div>
                  </div>
                  ${this.adSeg([
                    { id: 'off', label: 'off' }, { id: 'on', label: 'on' }, { id: 'ask', label: 'ask' }, { id: 'full', label: 'full' },
                  ], elevated, v => void this.adSave({ elevatedDefault: v }))}
                </div>
              </div>
              ${this.adCollapsible('embedded', t('agentsEmbedded'), t('agentsEmbeddedDesc'), [], html`
                <div class="ad-fields">
                  <div class="ad-field-line">
                    <span class="ad-field-label">${t('agentsProjectPolicy')}</span>
                    ${this.adSeg([
                      { id: 'trusted', label: 'trusted' }, { id: 'sanitize', label: 'sanitize' }, { id: 'ignore', label: 'ignore' },
                    ], this.adEmbeddedPolicy, v => { this.adEmbeddedPolicy = v; })}
                  </div>
                  <div class="ad-field-line">
                    <span class="ad-field-label">${t('agentsExecutionContract')}</span>
                    ${this.adSeg([
                      { id: 'default', label: 'default' }, { id: 'strict-agentic', label: 'strict-agentic' },
                    ], this.adEmbeddedContract, v => { this.adEmbeddedContract = v; })}
                  </div>
                  <div class="actions">
                    <button class="btn primary" ?disabled=${this.adBusy || !connected} @click=${() => void this.saveEmbedded()}>${t('agentsSave')}</button>
                  </div>
                </div>
              `)}
              <div class="ad-item">
                <div class="ad-item-head plain">
                  <div class="ad-item-text">
                    <div class="ad-item-title">${t('agentsFastMode')}</div>
                    <div class="ad-item-desc">${t('agentsFastModeDesc')}</div>
                  </div>
                  ${this.adSeg([
                    { id: 'on', label: t('agentsFastOn') }, { id: 'off', label: t('agentsFastOff') }, { id: 'auto', label: t('agentsFastAuto') },
                  ], fast, v => void this.adSave({ fastModeDefault: v === 'auto' ? 'auto' : v === 'on' }))}
                </div>
              </div>
              ${this.adCollapsible('heartbeat', t('agentsHeartbeat'), t('agentsHeartbeatDesc'), [t('agentsBadgeAutomation')], html`
                <div class="ad-fields">
                  <div class="mp-grid mp-grid-3">
                    ${this.adField(t('agentsHeartbeatEvery'), this.adHbEvery, v => { this.adHbEvery = v; })}
                    ${this.adField(t('agentsHeartbeatStart'), this.adHbStart, v => { this.adHbStart = v; })}
                    ${this.adField(t('agentsHeartbeatEnd'), this.adHbEnd, v => { this.adHbEnd = v; })}
                  </div>
                  ${this.adField(t('agentsHeartbeatPrompt'), this.adHbPrompt, v => { this.adHbPrompt = v; })}
                  <div class="actions">
                    <button class="btn primary" ?disabled=${this.adBusy || !connected} @click=${() => void this.saveHeartbeat()}>${t('agentsSave')}</button>
                  </div>
                </div>
              `)}
              ${this.adCollapsible('imagemodel', t('agentsImageModel'), t('agentsImageModelDesc'), [t('agentsBadgeModels'), t('agentsBadgeMedia')], html`
                <div class="ad-fields">
                  <div class="mp-grid mp-grid-3">
                    ${this.adField(t('agentsPrimary'), this.adImgPrimary, v => { this.adImgPrimary = v; })}
                    ${this.adField(t('agentsFallbacks'), this.adImgFallbacks, v => { this.adImgFallbacks = v; })}
                  </div>
                  <div class="actions">
                    <button class="btn primary" ?disabled=${this.adBusy || !connected} @click=${() => void this.saveImageModel()}>${t('agentsSave')}</button>
                  </div>
                </div>
              `)}
              ${this.adCollapsible('mediamodels', t('agentsMediaModels'), t('agentsMediaModelsDesc'), [], html`
                <div class="ad-fields">
                  <div class="mp-grid mp-grid-3">
                    ${this.adField('image', this.adMediaImage, v => { this.adMediaImage = v; })}
                    ${this.adField('video', this.adMediaVideo, v => { this.adMediaVideo = v; })}
                    ${this.adField('music', this.adMediaMusic, v => { this.adMediaMusic = v; })}
                  </div>
                  <div class="actions">
                    <button class="btn primary" ?disabled=${this.adBusy || !connected} @click=${() => void this.saveMediaModels()}>${t('agentsSave')}</button>
                  </div>
                </div>
              `)}
              <div class="ad-item">
                <div class="ad-item-head plain">
                  <div class="ad-item-text">
                    <div class="ad-item-title">${t('agentsModelRow')}
                      <span class="badge dim" style="margin-left:6px">${t('agentsBadgeModels')}</span>
                    </div>
                    <div class="ad-item-desc">${t('agentsModelRowDesc')}</div>
                  </div>
                </div>
                <div class="ad-item-body inline">
                  ${this.adField(t('agentsModelRow'), this.adModel, v => { this.adModel = v; })}
                  <button class="btn primary" ?disabled=${this.adBusy || !connected}
                    @click=${() => void this.adSave({ model: this.cleanVal(this.adModel) })}>${t('agentsSave')}</button>
                </div>
              </div>
              ${this.adCollapsible('modelpolicy', t('agentsModelPolicy'), t('agentsModelPolicyDesc'), [], html`
                <div class="ad-fields">
                  <label class="ad-field">
                    <span>${t('agentsModelPolicyAllow')}</span>
                    <textarea class="field" rows="4" style="font-family:'SF Mono',ui-monospace,Menlo,monospace;font-size:12px"
                      placeholder='["longcat/LongCat-2.0"]' .value=${this.adPolicyAllow}
                      @input=${(e: Event) => { this.adPolicyAllow = (e.target as HTMLTextAreaElement).value; }}></textarea>
                  </label>
                  <div class="actions">
                    <button class="btn primary" ?disabled=${this.adBusy || !connected} @click=${() => void this.saveModelPolicy()}>${t('agentsSave')}</button>
                  </div>
                </div>
              `)}
              <div class="ad-item">
                <div class="ad-item-head plain">
                  <div class="ad-item-text">
                    <div class="ad-item-title">${t('agentsUtilityModel')}</div>
                    <div class="ad-item-desc">${t('agentsUtilityModelDesc')}</div>
                  </div>
                </div>
                <div class="ad-item-body inline">
                  ${this.adField(t('agentsUtilityModel'), this.adUtility, v => { this.adUtility = v; })}
                  <button class="btn primary" ?disabled=${this.adBusy || !connected}
                    @click=${() => void this.adSave({ utilityModel: this.cleanVal(this.adUtility) })}>${t('agentsSave')}</button>
                </div>
              </div>
              <div class="ad-item">
                <div class="ad-item-head plain">
                  <div class="ad-item-text">
                    <div class="ad-item-title">${t('agentsWorkspaceRow')}</div>
                  </div>
                </div>
                <div class="ad-item-body inline">
                  ${this.adField(t('agentsWorkspaceRow'), this.adWorkspace, v => { this.adWorkspace = v; })}
                  <button class="btn primary" ?disabled=${this.adBusy || !connected}
                    @click=${() => void this.adSave({ workspace: this.cleanVal(this.adWorkspace) })}>${t('agentsSave')}</button>
                </div>
              </div>
              <div class="ad-item">
                <div class="ad-item-head plain">
                  <div class="ad-item-text">
                    <div class="ad-item-title">${t('agentsThinkingRow')}</div>
                  </div>
                  ${this.adSeg([
                    { id: 'off', label: 'off' }, { id: 'minimal', label: 'minimal' }, { id: 'low', label: 'low' },
                    { id: 'medium', label: 'medium' }, { id: 'high', label: 'high' },
                  ], thinking, v => void this.adSave({ thinkingDefault: v }))}
                </div>
              </div>
            </div>
          ` : nothing}
        </div>
        <div class="card glass">
          <h3>
            ${t('agentsTitle')}
            <button class="toggle-btn" style="margin-left:10px;padding:4px 12px" @click=${() => void store.loadAgents()}>${icon('refresh')}</button>
          </h3>
          ${!store.agentsList ? html`<div class="hint">${t('loading')}</div>` : html`
            ${(store.agentsList.agents ?? []).map(a => html`
              <div class="row"><span class="k">${a.id}${a.id === store.agentsList?.defaultId ? html`<span class="badge active" style="margin-left:6px">${t('agentsDefault')}</span>` : nothing}</span></div>
              <div class="row"><span class="k">${t('agentsModel')}</span><span class="v">${a.model?.primary ?? '—'}</span></div>
              <div class="row"><span class="k">${t('agentsThinking')}</span><span class="v">${a.thinkingDefault ?? 'off'}</span></div>
              <div class="row"><span class="k">${t('agentsRuntime')}</span><span class="v">${a.agentRuntime?.id ?? 'auto'}</span></div>
              <div class="row"><span class="k">${t('agentsWorkspace')}</span><span class="v">${a.workspace ?? '—'}</span></div>
              <div style="height:10px"></div>
            `)}
          `}
        </div>
        ${this.adMessage ? html`<div class="notice ${this.adMessage.ok ? 'ok' : 'error'}">${this.adMessage.text}</div>` : nothing}
      ` : nothing}
      ${this.agentsTab === 'skills' ? this.renderAgentsSkills() : nothing}
      ${this.agentsTab === 'tools' ? this.renderAgentsTools() : nothing}
      ${this.agentsTab === 'session' ? this.renderSessionCard() : nothing}
    `;
  }

  // ---- 基础设施 ----
  private renderInfraCard() {
    const info = store.systemInfo;
    return html`
      <div class="card glass">
        <h3>${t('infraTitle')}</h3>
        <div class="row"><span class="k">${t('infraPort')}</span><span class="v">${info?.port ?? '—'}</span></div>
        <div class="row"><span class="k">${t('infraLan')}</span><span class="v">${info?.lanAddress ? `${info.lanAddress}:${info.port ?? ''}` : '—'}</span></div>
        <div class="row"><span class="k">${t('infraRuntime')}</span><span class="v">${info?.nodeVersion ?? '—'} · PID ${info?.pid ?? '—'}</span></div>
        <div class="row"><span class="k">${t('infraOs')}</span><span class="v">${info?.osLabel ?? '—'} · ${info?.arch ?? ''}</span></div>
        <div class="row"><span class="k">${t('infraPath')}</span><span class="v">${info?.diskPath ?? '—'}</span></div>
        <div class="actions">
          <button class="btn primary" style="width:100%" ?disabled=${this.updateBusy} @click=${() => void this.runGatewayUpdate()}>
            ${this.updateBusy ? t('updateRunning') : t('infraUpdateBtn')}</button>
        </div>
        ${this.updateMessage ? html`<div class="notice ${this.updateMessage.ok ? 'ok' : 'error'}" style="margin-top:8px">${this.updateMessage.text}</div>` : nothing}
        <div class="hint">${t('infraUpdateHint')}</div>
      </div>
    `;
  }

  // ---- 调试(RPC 控制台) ----
  private async sendDebugRpc(): Promise<void> {
    if (this.debugBusy) return;
    const method = this.debugMethod.trim();
    if (!method) return;
    let params: unknown = {};
    if (this.debugParams.trim()) {
      try { params = JSON.parse(this.debugParams); }
      catch (e) { this.debugResult = `参数 JSON 错误:${String(e).slice(0, 120)}`; this.requestUpdate(); return; }
    }
    this.debugBusy = true;
    this.debugResult = t('loading');
    this.requestUpdate();
    try {
      const res = await store.rawRpc(method, params);
      this.debugResult = JSON.stringify(res, null, 2);
    } catch (e) {
      this.debugResult = `❌ ${String((e as Error).message ?? e)}`;
    }
    this.debugBusy = false;
    this.requestUpdate();
  }

  private renderDebugCard() {
    return html`
      <div class="card glass">
        <h3>${t('debugTitle')}</h3>
        <div class="hint">${t('debugHint')}</div>
        <label class="hint" style="margin:10px 0 4px">${t('debugMethod')}</label>
        <input class="field" placeholder="如:status / health / models.list" .value=${this.debugMethod}
          @keydown=${(e: KeyboardEvent) => { if (e.key === 'Enter') void this.sendDebugRpc(); }}
          @input=${(e: InputEvent) => { this.debugMethod = (e.target as HTMLInputElement).value; }} />
        <label class="hint" style="margin:10px 0 4px">${t('debugParams')}</label>
        <textarea class="field" style="font-family:'SF Mono',ui-monospace,Menlo,monospace;font-size:12px" rows="3" placeholder="{}"
          .value=${this.debugParams}
          @input=${(e: InputEvent) => { this.debugParams = (e.target as HTMLTextAreaElement).value; }}></textarea>
        <div class="actions">
          <button class="btn primary" style="width:100%" ?disabled=${!this.debugMethod.trim() || this.debugBusy} @click=${() => void this.sendDebugRpc()}>
            ${this.debugBusy ? t('loading') : t('debugSend')}</button>
        </div>
        ${this.debugResult ? html`<pre class="memory-view" style="margin-top:12px">${this.debugResult}</pre>` : nothing}
      </div>
    `;
  }

  private renderChannelsCard() {
    const rows = store.channelRows();
    const configuredIds = Object.keys(store.configChannels);
    const spec = this.channelPick ? CHANNEL_SPECS.find(s => s.id === this.channelPick) : null;
    return html`
      <div class="card glass">
        <h3>${t('channelsTitle')}
          <button class="toggle-btn" style="margin-left:10px;padding:4px 12px" @click=${() => { this.channelPick = this.channelPick ? null : '__picker__'; this.channelFieldValues = {}; this.channelMessage = null; }}>
            ${this.channelPick ? t('cancel') : `+ ${t('channelAdd')}`}
          </button>
        </h3>

        ${rows.length ? rows.map(c => html`
          <div class="row">
            <span class="k">${c.label}</span>
            <span class="v">
              <span class="badge ${c.state === '已连接' ? 'active' : 'dim'}">${c.state}</span>
              <button class="icon-btn" title=${t('channelLogout')} ?disabled=${this.channelBusy}
                @click=${() => void this.logoutChannel(c.id)}>⎋</button>
              ${configuredIds.includes(c.id) ? html`
                <button class="icon-btn" title=${t('channelDelete')} ?disabled=${this.channelBusy}
                  @click=${() => void this.deleteChannel(c.id)}>🗑</button>` : nothing}
            </span>
          </div>
        `) : configuredIds.length ? configuredIds.map(id => html`
          <div class="row">
            <span class="k">${id}</span>
            <span class="v">
              <span class="badge dim">${t('channelConfigured')}</span>
              <button class="icon-btn" title=${t('channelDelete')} ?disabled=${this.channelBusy}
                @click=${() => void this.deleteChannel(id)}>🗑</button>
            </span>
          </div>
        `) : html`<div class="hint">${t('channelsEmpty')}</div>`}

        ${this.channelPick === '__picker__' ? html`
          <div class="channel-picker">
            ${CHANNEL_SPECS.map(s => html`
              <button class="channel-chip" @click=${() => { this.channelPick = s.id; this.channelFieldValues = {}; }}>
                <span class="channel-emoji">${s.emoji}</span>${s.label}
              </button>
            `)}
            <button class="channel-chip" @click=${() => { this.channelPick = '__custom__'; }}>
              <span class="channel-emoji">🧩</span>${t('channelCustom')}
            </button>
          </div>
          <div class="hint">${t('channelPickHint')}</div>
        ` : nothing}

        ${this.channelPick === '__custom__' ? html`
          <div class="mp-editor" style="margin-top:10px">
            <div class="mp-name" style="margin-bottom:8px">🧩 ${t('channelCustom')}</div>
            <label class="hint" style="margin:0 0 4px">${t('channelCustomId')}</label>
            <input class="field" placeholder="如:my-qq-bot" .value=${this.customChannelId}
              @input=${(e: InputEvent) => { this.customChannelId = (e.target as HTMLInputElement).value; }} />
            <label class="hint" style="margin:10px 0 4px">${t('channelCustomJson')}</label>
            <textarea class="field" style="font-family:'SF Mono',ui-monospace,Menlo,monospace;font-size:12px" rows="6"
              .value=${this.customChannelJson}
              @input=${(e: InputEvent) => { this.customChannelJson = (e.target as HTMLTextAreaElement).value; }}></textarea>
            <div class="hint">${t('channelCustomHint')}</div>
            <div class="actions">
              <button class="btn primary" ?disabled=${!this.customChannelId.trim() || this.channelBusy} @click=${() => void this.submitCustomChannel()}>
                ${this.channelBusy ? t('loading') : t('save')}</button>
              <button class="btn" ?disabled=${this.channelBusy} @click=${() => { this.channelPick = null; }}>${t('cancel')}</button>
            </div>
          </div>
        ` : nothing}

        ${spec ? html`
          <div class="mp-editor" style="margin-top:10px">
            <div class="mp-name" style="margin-bottom:8px">${spec.emoji} ${t('channelSetup', { name: spec.label })}</div>
            ${spec.fields.map(field => html`
              <div style="margin-bottom:8px">
                <label class="hint" style="margin:0 0 4px">${field.label}</label>
                <input class="field" type=${field.secret ? 'password' : 'text'} autocomplete="off"
                  .value=${this.channelFieldValues[field.key] ?? ''}
                  @input=${(e: InputEvent) => { this.channelFieldValues = { ...this.channelFieldValues, [field.key]: (e.target as HTMLInputElement).value }; }} />
              </div>
            `)}
            <div class="actions">
              <button class="btn primary" ?disabled=${this.channelBusy} @click=${() => void this.submitChannel()}>
                ${this.channelBusy ? t('loading') : t('save')}</button>
              <button class="btn" ?disabled=${this.channelBusy} @click=${() => { this.channelPick = null; }}>${t('cancel')}</button>
            </div>
          </div>
        ` : nothing}

        ${this.channelMessage ? html`<div class="notice ${this.channelMessage.ok ? 'ok' : 'error'}" style="margin-top:10px">${this.channelMessage.text}</div>` : nothing}
        ${this.channelMessage?.ok ? html`<div class="notice warn" style="margin-top:6px">${t('channelRestartHint')}</div>` : nothing}
      </div>
    `;
  }

  /** 安全概览卡(只读)。 */
  private renderSecurityCard() {
    const sec = store.securityInfo ?? {};
    const profile = sec.toolProfile;
    const profileLabel = profile === 'coding' ? 'coding (完整)' : profile === 'messaging' ? 'messaging (受限)' : profile ?? '—';
    return html`
      <div class="card glass">
        <h3>${t('securityTitle')}</h3>
        <div class="row"><span class="k">${t('securityAuth')}</span><span class="v"><span class="badge active">${(sec.authMode ?? '—').toUpperCase()}</span></span></div>
        <div class="row"><span class="k">${t('securityProfile')}</span><span class="v">${profileLabel}</span></div>
        <div class="row"><span class="k">${t('securityDeviceAuth')}</span><span class="v"><span class="badge active">${t('securityEnabled')}</span></span></div>
        <div class="hint">${t('securityHint')}</div>
      </div>
      <div class="card glass">
        <h3>${t('securityExecTitle')}
          <button class="toggle-btn" style="margin-left:10px;padding:4px 12px" @click=${() => void this.toggleExecPolicy()}>${this.execOpen ? t('memoryCollapse') : t('memoryExpand')}</button>
        </h3>
        <div class="hint">${t('securityExecHint')}</div>
        ${this.execOpen ? html`
          ${this.execPolicy ? html`
            <textarea class="field exec-edit" rows="12"
              .value=${JSON.stringify(this.execPolicy, null, 2)}
              @input=${(e: Event) => { this.execEditValue = (e.target as HTMLTextAreaElement).value; }}></textarea>
            <div class="actions">
              <button class="btn primary" ?disabled=${this.channelBusy} @click=${() => void this.saveExecPolicy()}>${t('agentsSave')}</button>
            </div>
            ${this.execMessage ? html`<div class="notice ${this.execMessage.ok ? 'ok' : 'error'}" style="margin-top:8px">${this.execMessage.text}</div>` : nothing}
          ` : html`<div class="hint">${t('loading')}</div>`}
        ` : nothing}
      </div>
    `;
  }

  private execEditValue = '';
  private execMessage: { ok: boolean; text: string } | null = null;

  private async saveExecPolicy(): Promise<void> {
    let parsed: Record<string, unknown>;
    try { parsed = JSON.parse(this.execEditValue); }
    catch (e) { this.execMessage = { ok: false, text: `${t('agentsSaveFailed')}:JSON 错误` }; this.requestUpdate(); return; }
    this.channelBusy = true;
    this.requestUpdate();
    const res = await store.saveExecApprovals(parsed);
    this.channelBusy = false;
    this.execMessage = res.ok ? { ok: true, text: t('agentsSaved') } : { ok: false, text: `${t('agentsSaveFailed')}:${res.error ?? ''}` };
    this.requestUpdate();
  }

  /** 展开的提供商编辑器:baseUrl + 每模型表单。 */
  private renderEditor(name: string) {
    return html`
      <div class="mp-editor">
        <div class="mp-name" style="margin-bottom:6px">${t('modelsEditing', { name })}</div>
        <label class="hint" style="margin:6px 0 4px">API 端点</label>
        <input class="field" type="url" .value=${this.editBaseUrl}
          @input=${(e: InputEvent) => { this.editBaseUrl = (e.target as HTMLInputElement).value; }} />
        ${this.editModels.map((m, i) => html`
          <div class="mp-edit-model">
            <div class="mp-edit-head">
              <span class="mp-name">${m.id}</span>
              <button class="icon-btn" title=${t('modelsDeleteModel')} ?disabled=${this.mpBusy}
                @click=${() => this.removeEditModel(i)}>🗑</button>
            </div>
            <div class="mp-grid">
              <div>
                <label class="hint" style="margin:6px 0 4px">${t('mpModelName')}</label>
                <input class="field" type="text" .value=${m.name}
                  @input=${(e: InputEvent) => this.updateEditModel(i, 'name', (e.target as HTMLInputElement).value)} />
              </div>
              <div>
                <label class="hint" style="margin:6px 0 4px">${t('mpContext')}</label>
                <input class="field" type="number" min="1024" .value=${m.contextWindow}
                  @input=${(e: InputEvent) => this.updateEditModel(i, 'contextWindow', (e.target as HTMLInputElement).value)} />
              </div>
              <div>
                <label class="hint" style="margin:6px 0 4px">${t('mpCostInput')}</label>
                <input class="field" type="number" min="0" step="any" .value=${m.costInput}
                  @input=${(e: InputEvent) => this.updateEditModel(i, 'costInput', (e.target as HTMLInputElement).value)} />
              </div>
              <div>
                <label class="hint" style="margin:6px 0 4px">${t('mpCostCacheRead')}</label>
                <input class="field" type="number" min="0" step="any" .value=${m.costCacheRead}
                  @input=${(e: InputEvent) => this.updateEditModel(i, 'costCacheRead', (e.target as HTMLInputElement).value)} />
              </div>
              <div>
                <label class="hint" style="margin:6px 0 4px">${t('mpCostOutput')}</label>
                <input class="field" type="number" min="0" step="any" .value=${m.costOutput}
                  @input=${(e: InputEvent) => this.updateEditModel(i, 'costOutput', (e.target as HTMLInputElement).value)} />
              </div>
              <div>
                <label class="hint" style="margin:6px 0 4px">${t('mpMaxTokens')}</label>
                <input class="field" type="number" min="256" .value=${m.maxTokens}
                  @input=${(e: InputEvent) => this.updateEditModel(i, 'maxTokens', (e.target as HTMLInputElement).value)} />
              </div>
            </div>
          </div>
        `)}
        <div class="actions">
          <button class="btn primary" ?disabled=${this.mpBusy} @click=${() => void this.saveEdit()}>
            ${this.mpBusy ? t('loading') : t('modelsSave')}</button>
          <button class="btn" ?disabled=${this.mpBusy} @click=${() => { this.editName = ''; this.requestUpdate(); }}>${t('cancel')}</button>
        </div>
        <div class="hint">${t('modelsEditHint')}</div>
      </div>
    `;
  }

  private renderModelsCard() {
    const providers = store.configProviders;
    const formValid = this.mpBaseUrl.trim() && this.mpApiKey.trim() && this.mpModelId.trim();
    return html`
      <div class="card glass">
        <h3>${t('modelsCardTitle')}</h3>

        ${providers.length ? html`
          <div class="mp-list">
            ${providers.map(p => p.name === this.editName ? this.renderEditor(p.name) : html`
              <div class="mp-row">
                <div class="mp-info">
                  <div class="mp-name">${p.name} <span class="badge dim">${p.api ?? ''}</span></div>
                  <div class="mp-sub">${p.baseUrl}</div>
                  <div class="mp-sub">${p.modelIds.length ? p.modelIds.join(', ') : '—'}</div>
                </div>
                <button class="icon-btn" title=${t('modelsEdit')} ?disabled=${this.mpBusy}
                  @click=${() => this.startEdit(p.name)}>✏️</button>
                <button class="icon-btn" title=${t('modelsDelete')} ?disabled=${this.mpBusy}
                  @click=${() => void this.removeProvider(p.name)}>🗑</button>
              </div>
            `)}
          </div>
        ` : html`<div class="hint">${t('modelsEmpty')}</div>`}

        <div class="mp-form-title">${t('modelsAddTitle')}</div>
        <label class="hint" style="margin:8px 0 4px">API 端点</label>
        <input class="field" type="url" placeholder="https://api.example.com/v1" .value=${this.mpBaseUrl}
          @input=${(e: InputEvent) => { this.mpBaseUrl = (e.target as HTMLInputElement).value; }} />
        <label class="hint" style="margin:10px 0 4px">API Key</label>
        <input class="field" type="password" autocomplete="off" placeholder="sk-…" .value=${this.mpApiKey}
          @input=${(e: InputEvent) => { this.mpApiKey = (e.target as HTMLInputElement).value; }} />
        <div class="mp-grid">
          <div>
            <label class="hint" style="margin:10px 0 4px">模型 ID</label>
            <input class="field" type="text" placeholder="glm-4.7" .value=${this.mpModelId}
              @input=${(e: InputEvent) => { this.mpModelId = (e.target as HTMLInputElement).value; }} />
          </div>
          <div>
            <label class="hint" style="margin:10px 0 4px">显示名称(可选)</label>
            <input class="field" type="text" placeholder="GLM-4.7" .value=${this.mpModelName}
              @input=${(e: InputEvent) => { this.mpModelName = (e.target as HTMLInputElement).value; }} />
          </div>
          <div>
            <label class="hint" style="margin:10px 0 4px">接口标识(可选)</label>
            <input class="field" type="text" placeholder="自动:取域名" .value=${this.mpName}
              @input=${(e: InputEvent) => { this.mpName = (e.target as HTMLInputElement).value; }} />
          </div>
          <div>
            <label class="hint" style="margin:10px 0 4px">接口类型</label>
            <select class="field" .value=${this.mpApi} @change=${(e: Event) => { this.mpApi = (e.target as HTMLSelectElement).value; }}>
              <option value="openai-completions" ?selected=${this.mpApi === 'openai-completions'}>OpenAI 兼容</option>
              <option value="openai-responses" ?selected=${this.mpApi === 'openai-responses'}>OpenAI Responses</option>
              <option value="anthropic-messages" ?selected=${this.mpApi === 'anthropic-messages'}>Anthropic</option>
            </select>
          </div>
          <div>
            <label class="hint" style="margin:10px 0 4px">上下文窗口(可选)</label>
            <input class="field" type="number" min="1024" .value=${this.mpContext}
              @input=${(e: InputEvent) => { this.mpContext = (e.target as HTMLInputElement).value; }} />
          </div>
          <div>
            <label class="hint" style="margin:10px 0 4px">最大输出(可选)</label>
            <input class="field" type="number" min="256" .value=${this.mpMaxTokens}
              @input=${(e: InputEvent) => { this.mpMaxTokens = (e.target as HTMLInputElement).value; }} />
          </div>
        </div>
        <div class="mp-form-title">${t('mpCostTitle')}</div>
        <div class="mp-grid mp-grid-3">
          <div>
            <label class="hint" style="margin:8px 0 4px">${t('mpCostInput')}</label>
            <input class="field" type="number" min="0" step="any" placeholder="如 3" .value=${this.mpCostInput}
              @input=${(e: InputEvent) => { this.mpCostInput = (e.target as HTMLInputElement).value; }} />
          </div>
          <div>
            <label class="hint" style="margin:8px 0 4px">${t('mpCostCacheRead')}</label>
            <input class="field" type="number" min="0" step="any" placeholder="如 0.3" .value=${this.mpCostCacheRead}
              @input=${(e: InputEvent) => { this.mpCostCacheRead = (e.target as HTMLInputElement).value; }} />
          </div>
          <div>
            <label class="hint" style="margin:8px 0 4px">${t('mpCostOutput')}</label>
            <input class="field" type="number" min="0" step="any" placeholder="如 6" .value=${this.mpCostOutput}
              @input=${(e: InputEvent) => { this.mpCostOutput = (e.target as HTMLInputElement).value; }} />
          </div>
        </div>
        <div class="hint">${t('mpCostHint')}</div>
        ${this.mpMessage ? html`<div class="notice ${this.mpMessage.ok ? 'ok' : 'error'}" style="margin-top:10px">${this.mpMessage.text}</div>` : nothing}
        <div class="actions">
          <button class="btn primary" style="width:100%" ?disabled=${!formValid || this.mpBusy}
            @click=${() => void this.submitModel()}>${this.mpBusy ? t('loading') : t('modelsAddBtn')}</button>
        </div>
        <div class="hint">${t('modelsHint')}</div>
      </div>
    `;
  }

  render() {
    const connected = store.connState === 'connected';
    const version = store.client.snapshot?.server?.version;
    const sections: Array<{ id: SetSection; labelKey: Parameters<typeof t>[0] }> = [
      { id: 'general', labelKey: 'setSecGeneral' },
      { id: 'session', labelKey: 'setSecSession' },
      { id: 'models', labelKey: 'setSecModels' },
      { id: 'channels', labelKey: 'setSecChannels' },
      { id: 'comms', labelKey: 'setSecComms' },
      { id: 'mcp', labelKey: 'setSecMcp' },
      { id: 'agents', labelKey: 'setSecAgents' },
      { id: 'memory', labelKey: 'setSecMemory' },
      { id: 'security', labelKey: 'setSecSecurity' },
      { id: 'infra', labelKey: 'setSecInfra' },
      { id: 'debug', labelKey: 'setSecDebug' },
      { id: 'connection', labelKey: 'setSecConnection' },
      { id: 'marketplace', labelKey: 'marketplaceSourcesTitle' },
      { id: 'about', labelKey: 'setSecAbout' },
      { id: 'advanced', labelKey: 'setSecAdvanced' },
      { id: 'logs', labelKey: 'setSecLogs' },
      { id: 'automation', labelKey: 'setSecAutomation' },
      { id: 'tools', labelKey: 'setSecTools' },
      { id: 'logging', labelKey: 'setSecLogging' },
      { id: 'hooks', labelKey: 'setSecHooks' },
      { id: 'gateway', labelKey: 'setSecGateway' },
      { id: 'tts', labelKey: 'setSecTts' },
      { id: 'agententries', labelKey: 'setSecAgentEntries' },
      { id: 'cronconfig', labelKey: 'setSecCronConfig' },
    ];
    return html`
      <div class="set-nav glass">
        ${sections.map(s => html`
          <button class="set-nav-btn ${this.section === s.id ? 'active' : ''}"
            @click=${() => { this.section = s.id; this.channelMessage = null; }}>
            ${t(s.labelKey)}
          </button>
        `)}
      </div>
      <div class="settings-scroll">
        ${this.section === 'general' ? html`
          <div class="card glass">
            <h3>${t('settingsLanguage')}</h3>
            <div class="seg-control">
              <button class=${getLocale() === 'zh' ? 'active' : ''} @click=${() => this.switchLocale('zh')}>中文</button>
              <button class=${getLocale() === 'en' ? 'active' : ''} @click=${() => this.switchLocale('en')}>English</button>
            </div>
          </div>
          ${this.renderAppearanceCard()}
          <div class="card glass">
            <h3>${t('settingsAbout')}</h3>
            <p class="about-text">${t('settingsAboutText')}</p>
          </div>
        ` : nothing}
        ${this.section === 'session' ? this.renderSessionCard() : nothing}
        ${this.section === 'models' ? this.renderModelsCard() : nothing}
        ${this.section === 'channels' ? this.renderChannelsCard() : nothing}
        ${this.section === 'comms' ? this.renderCommsCard() : nothing}
        ${this.section === 'mcp' ? this.renderMcpCard() : nothing}
        ${this.section === 'agents' ? this.renderAgentsCard() : nothing}
        ${this.section === 'memory' ? html`${this.renderMemoryCard()}${this.renderDreamCard()}` : nothing}
        ${this.section === 'security' ? this.renderSecurityCard() : nothing}
        ${this.section === 'infra' ? this.renderInfraCard() : nothing}
        ${this.section === 'debug' ? this.renderDebugCard() : nothing}
        ${this.section === 'connection' ? html`
          <div class="card glass">
            <h3>${t('settingsConnection')}</h3>
            <label class="hint" style="margin:0 0 6px">${t('settingsGatewayUrl')}</label>
            <input class="field" type="text" .value=${this.urlInput} @input=${(e: InputEvent) => { this.urlInput = (e.target as HTMLInputElement).value; }} placeholder="ws://127.0.0.1:18789" />
            <label class="hint" style="margin:10px 0 6px">${t('settingsToken')}</label>
            <input class="field" type="password" .value=${this.tokenInput} autocomplete="off"
              @input=${(e: InputEvent) => { this.tokenInput = (e.target as HTMLInputElement).value; }} placeholder="gw token" />
            <div class="hint">${t('settingsTokenHint')}</div>
            ${connected
              ? html`<div class="hint" style="color:var(--ok)">✓ ${t('settingsConnected', { version: version ?? '?' })}</div>`
              : ''}
            <div class="actions">
              ${connected
                ? html`<button class="btn danger" @click=${() => this.handleDisconnect()}>${t('settingsDisconnect')}</button>`
                : html`<button class="btn primary" ?disabled=${!this.tokenInput.trim()} @click=${() => void this.handleConnect()}>${t('settingsConnect')}</button>`}
            </div>
          </div>
        ` : nothing}
        ${this.section === 'marketplace' ? this.renderMarketplaceSources() : nothing}
        ${this.section === 'about' ? this.renderAboutCard() : nothing}
        ${this.section === 'advanced' ? this.renderAdvancedCard() : nothing}
        ${this.section === 'logs' ? this.renderLogsCard() : nothing}
        ${this.section === 'automation' ? this.renderAutomationCard() : nothing}
        ${this.section === 'tools' ? this.renderToolsCard() : nothing}
        ${this.section === 'logging' ? this.renderLoggingCard() : nothing}
        ${this.section === 'hooks' ? this.renderHooksCard() : nothing}
        ${this.section === 'gateway' ? this.renderGatewayCard() : nothing}
        ${this.section === 'tts' ? this.renderTtsCard() : nothing}
        ${this.section === 'agententries' ? this.renderAgentEntriesCard() : nothing}
        ${this.section === 'cronconfig' ? this.renderCronConfigCard() : nothing}
      </div>
    `;
  }

  private renderMarketplaceSources() {
    const sources = store.marketplaceSources;
    return html`
      <div class="card glass">
        <h3>${t('marketplaceSourcesTitle')}</h3>
        <p class="hint">${t('marketplaceSourcesHint')}</p>
        <div class="source-list">
          ${sources.map(s => html`
            <div class="skill-item glass source-item">
              <div class="s-main">
                <div class="s-title">
                  ${s.name}
                  ${s.isDefault ? html`<span class="badge dim">${t('sourceDefault')}</span>` : html`<span class="badge dim">${t('sourceCustom')}</span>`}
                  ${s.enabled ? html`<span class="badge active">${t('sourceEnabled')}</span>` : html`<span class="badge off">${t('sourceDisabled')}</span>`}
                </div>
                <div class="s-sub">${s.url}</div>
              </div>
              <button class="toggle-btn" @click=${() => store.toggleSource(s.id)} style="padding:4px 10px">
                ${s.enabled ? t('commsOff') : t('commsOn')}
              </button>
              ${!s.isDefault ? html`<button class="icon-btn" @click=${() => store.removeMarketplaceSource(s.id)}>${icon('trash')}</button>` : nothing}
            </div>
          `)}
        </div>
      </div>
      <div class="card glass source-form">
        <h3>${t('sourceAdd')}</h3>
        <label class="hint">${t('sourceName')}</label>
        <input class="field" type="text" .value=${this.newSourceName} @input=${(e: InputEvent) => { this.newSourceName = (e.target as HTMLInputElement).value; }} placeholder="My Marketplace" />
        <label class="hint">${t('sourceUrl')}</label>
        <input class="field" type="text" .value=${this.newSourceUrl} @input=${(e: InputEvent) => { this.newSourceUrl = (e.target as HTMLInputElement).value; }} placeholder="https://example.com/api" />
        <label class="hint">${t('sourceApiKey')}</label>
        <input class="field" type="text" .value=${this.newSourceKey} @input=${(e: InputEvent) => { this.newSourceKey = (e.target as HTMLInputElement).value; }} placeholder="sk-..." />
        <div class="actions">
          <button class="btn primary" @click=${() => this.handleAddSource()}>${t('sourceAddBtn')}</button>
        </div>
      </div>
    `;
  }

  private newSourceName = '';
  private newSourceUrl = '';
  private newSourceKey = '';

  private handleAddSource() {
    if (!this.newSourceName.trim() || !this.newSourceUrl.trim()) return;
    const id = 'custom-' + Date.now().toString(36);
    store.addMarketplaceSource({
      id,
      name: this.newSourceName.trim(),
      url: this.newSourceUrl.trim(),
      apiKey: this.newSourceKey.trim() || undefined,
      enabled: true,
    });
    this.newSourceName = '';
    this.newSourceUrl = '';
    this.newSourceKey = '';
  }
  // ---- 关于(详细) ----
  private renderAboutCard() {
    const ver = store.client.snapshot?.server?.version;
    return html`
      <div class="card glass">
        <h3>${t('settingsAbout')}</h3>
        <div class="about-logo">${renderBrand(store.branding.appLogo, '🦞', 'about-logo-render')}</div>
        <div class="row"><span class="k">${t('aboutUiVersion')}</span><span class="v">v0.1.1</span></div>
        <div class="row"><span class="k">${t('aboutGatewayVersion')}</span><span class="v">${ver ?? '—'}</span></div>
        <div class="row"><span class="k">${t('aboutProtocol')}</span><span class="v">v4 (Ed25519)</span></div>
        <div class="row"><span class="k">${t('aboutRepo')}</span><span class="v"><a href="https://github.com/2642086672/openclaw-glass-webui" target="_blank" rel="noreferrer">GitHub</a></span></div>
        <div class="hint">${t('settingsAboutText')}</div>
      </div>
    `;
  }

  // ---- 高级 ----
  private renderAdvancedCard() {
    return html`
      <div class="card glass">
        <h3>${t('advancedTitle')}</h3>
        <div class="hint">${t('advancedHint')}</div>
        <div class="row"><span class="k">${t('advancedLang')}</span>
          <span class="v">
            <div class="seg-control" style="margin:0">
              <button class=${getLocale() === 'zh' ? 'active' : ''} @click=${() => this.switchLocale('zh')}>中文</button>
              <button class=${getLocale() === 'en' ? 'active' : ''} @click=${() => this.switchLocale('en')}>English</button>
            </div>
          </span>
        </div>
        <div class="row"><span class="k">${t('advancedTheme')}</span><span class="v">${store.branding.appLogo ? '自定义' : '默认'}</span></div>
        ${this.renderAppearanceCard()}
      </div>
    `;
  }

  // ---- 日志 ----
  private renderLogsCard() {
    const lines = store.logLines;
    return html`
      <div class="card glass">
        <h3>${t('logsTitle')}
          <button class="toggle-btn" style="margin-left:10px;padding:4px 12px" @click=${() => store.logsFollowing = !store.logsFollowing}>
            ${store.logsFollowing ? t('logsPause') : t('logsFollow')}
          </button>
          <button class="toggle-btn" style="margin-left:6px;padding:4px 12px" @click=${() => store.clearLogs()}>${t('logsClear')}</button>
        </h3>
        <div class="hint">${t('logsHint')}</div>
        <pre class="memory-view logs-view">${lines.length ? lines.map(l => l.raw).join('') : t('empty')}</pre>
      </div>
    `;
  }

  // ---- 自动化(定时任务) ----
  private renderAutomationCard() {
    const jobs = store.cronJobs;
    return html`
      <div class="card glass">
        <h3>${t('automationTitle')}
          <button class="toggle-btn" style="margin-left:10px;padding:4px 12px" @click=${() => void store.refreshCron()}>${icon('refresh')}</button>
        </h3>
        <div class="hint">${t('automationHint')}</div>
        ${!jobs.length ? html`<div class="hint">${t('empty')}</div>` : jobs.map(j => html`
          <div class="cron-row">
            <div class="cron-info">
              <div class="cron-name">${j.name ?? j.id}</div>
              <div class="cron-sub">${j.description ?? ''}</div>
              <div class="cron-sub">${t('cronSchedule')}: ${j.schedule?.cron ?? (j.schedule?.everyMs ? `${j.schedule.everyMs / 60000} min` : '—')}</div>
            </div>
            <span class="badge ${j.enabled ? 'active' : 'off'}">${j.enabled ? t('commsOn') : t('commsOff')}</span>
            <button class="toggle-btn" style="padding:4px 10px" @click=${() => void store.cronToggle(j.id, !j.enabled)}>${j.enabled ? '◾' : '▶'}</button>
            <button class="icon-btn" title=${t('delete')} @click=${() => void store.cronDelete(j.id)}>🗑</button>
          </div>
        `)}
      </div>
    `;
  }

  // ---- 工具设置 ----
  private syncToolsForm() {
    const d = store.toolsConfig ?? {};
    if (d === this._lastToolsRef) return;
    this._lastToolsRef = d;
    this.toolsAllow = ((d.allow as string[]) ?? []).join(', ');
    this.toolsDeny = ((d.deny as string[]) ?? []).join(', ');
    this.toolsElevated = Boolean((d.elevated as { enabled?: boolean })?.enabled);
  }
  private _lastToolsRef: Record<string, unknown> | null = null;

  private async saveTools(patch: Record<string, unknown>): Promise<void> {
    if (this.toolsBusy) return;
    this.toolsBusy = true; this.requestUpdate();
    const res = await store.patchTools(patch);
    this.toolsBusy = false;
    this.toolsMessage = res.ok ? { ok: true, text: t('agentsSaved') } : { ok: false, text: `${t('agentsSaveFailed')}:${res.error ?? ''}` };
    this.requestUpdate();
  }

  private renderToolsCard() {
    const d = store.toolsConfig ?? {};
    const profile = (d.profile as string) ?? 'coding';
    const profiles = [
      { id: 'minimal', label: 'minimal (最小)' },
      { id: 'messaging', label: 'messaging (消息)' },
      { id: 'coding', label: 'coding (开发)' },
      { id: 'full', label: 'full (完整)' },
    ];
    return html`
      <div class="card glass">
        <h3>${t('toolsTitle')}</h3>
        <div class="hint">${t('toolsHint')}</div>
        <div class="row"><span class="k">${t('toolsProfile')}</span></div>
        <div class="seg-control" style="margin:4px 0 10px">
          ${profiles.map(p => html`
            <button class=${profile === p.id ? 'active' : ''} @click=${() => void this.saveTools({ profile: p.id })}>${p.label}</button>
          `)}
        </div>
        <div class="row"><span class="k">${t('toolsElevated')}</span>
          <div class="seg-control" style="margin:0">
            <button class=${!this.toolsElevated ? 'active' : ''} @click=${() => { this.toolsElevated = false; void this.saveTools({ elevated: { enabled: false } }); }}>${t('commsOff')}</button>
            <button class=${this.toolsElevated ? 'active' : ''} @click=${() => { this.toolsElevated = true; void this.saveTools({ elevated: { enabled: true } }); }}>${t('commsOn')}</button>
          </div>
        </div>
        <div class="row"><span class="k">${t('toolsAllow')}</span></div>
        <input class="field" placeholder="tool1, tool2, ..." .value=${this.toolsAllow}
          @input=${(e: InputEvent) => { this.toolsAllow = (e.target as HTMLInputElement).value; }} />
        <div class="row"><span class="k">${t('toolsDeny')}</span></div>
        <input class="field" placeholder="dangerous-tool, ..." .value=${this.toolsDeny}
          @input=${(e: InputEvent) => { this.toolsDeny = (e.target as HTMLInputElement).value; }} />
        <div class="actions">
          <button class="btn primary" ?disabled=${this.toolsBusy}
            @click=${() => void this.saveTools({
              allow: this.toolsAllow.split(',').map(x => x.trim()).filter(Boolean),
              deny: this.toolsDeny.split(',').map(x => x.trim()).filter(Boolean),
            })}>${t('agentsSave')}</button>
        </div>
        ${this.toolsMessage ? html`<div class="notice ${this.toolsMessage.ok ? 'ok' : 'error'}" style="margin-top:8px">${this.toolsMessage.text}</div>` : nothing}
      </div>
    `;
  }

  // ---- 日志设置 ----
  private syncLoggingForm() {
    const d = store.loggingConfig ?? {};
    if (d === this._lastLoggingRef) return;
    this._lastLoggingRef = d;
  }
  private _lastLoggingRef: Record<string, unknown> | null = null;

  private async saveLogging(patch: Record<string, unknown>): Promise<void> {
    if (this.loggingBusy) return;
    this.loggingBusy = true; this.requestUpdate();
    const res = await store.patchLogging(patch);
    this.loggingBusy = false;
    this.loggingMessage = res.ok ? { ok: true, text: t('agentsSaved') } : { ok: false, text: `${t('agentsSaveFailed')}:${res.error ?? ''}` };
    this.requestUpdate();
  }

  private renderLoggingCard() {
    const d = store.loggingConfig ?? {};
    const level = (d.level as string) ?? 'info';
    const levels = ['debug', 'info', 'warn', 'error'];
    const style = (d.consoleStyle as string) ?? 'pretty';
    return html`
      <div class="card glass">
        <h3>${t('loggingTitle')}</h3>
        <div class="hint">${t('loggingHint')}</div>
        <div class="row"><span class="k">${t('loggingLevel')}</span></div>
        <div class="seg-control" style="margin:4px 0 10px">
          ${levels.map(l => html`<button class=${level === l ? 'active' : ''} @click=${() => void this.saveLogging({ level: l })}>${l}</button>`)}
        </div>
        <div class="row"><span class="k">${t('loggingStyle')}</span>
          <div class="seg-control" style="margin:0">
            <button class=${style === 'pretty' ? 'active' : ''} @click=${() => void this.saveLogging({ consoleStyle: 'pretty' })}>pretty</button>
            <button class=${style === 'json' ? 'active' : ''} @click=${() => void this.saveLogging({ consoleStyle: 'json' })}>json</button>
          </div>
        </div>
        <div class="row"><span class="k">${t('loggingFile')}</span>
          <input class="field" style="margin:0" placeholder="/var/log/openclaw.log" .value=${(d.file as string) ?? ''}
            @change=${(e: Event) => void this.saveLogging({ file: (e.target as HTMLInputElement).value.trim() || null })} />
        </div>
        <div class="row"><span class="k">${t('loggingAudit')}</span>
          <div class="seg-control" style="margin:0">
            <button class=${!(d.audit as { enabled?: boolean })?.enabled ? 'active' : ''} @click=${() => void this.saveLogging({ audit: { enabled: false } })}>${t('commsOff')}</button>
            <button class=${(d.audit as { enabled?: boolean })?.enabled ? 'active' : ''} @click=${() => void this.saveLogging({ audit: { enabled: true } })}>${t('commsOn')}</button>
          </div>
        </div>
        ${this.loggingMessage ? html`<div class="notice ${this.loggingMessage.ok ? 'ok' : 'error'}" style="margin-top:8px">${this.loggingMessage.text}</div>` : nothing}
      </div>
    `;
  }

  // ---- 钩子设置 ----
  private syncHooksForm() {
    const d = store.hooksConfig ?? {};
    if (d === this._lastHooksRef) return;
    this._lastHooksRef = d;
  }
  private _lastHooksRef: Record<string, unknown> | null = null;

  private async saveHooks(patch: Record<string, unknown>): Promise<void> {
    if (this.hooksBusy) return;
    this.hooksBusy = true; this.requestUpdate();
    const res = await store.patchHooks(patch);
    this.hooksBusy = false;
    this.hooksMessage = res.ok ? { ok: true, text: t('agentsSaved') } : { ok: false, text: `${t('agentsSaveFailed')}:${res.error ?? ''}` };
    this.requestUpdate();
  }

  private renderHooksCard() {
    const d = store.hooksConfig ?? {};
    const internal = (d.internal as { entries?: Record<string, unknown> })?.entries ?? {};
    const inject = d.allowPromptInjection;
    const access = d.allowConversationAccess;
    return html`
      <div class="card glass">
        <h3>${t('hooksTitle')}</h3>
        <div class="hint">${t('hooksHint')}</div>
        <div class="row"><span class="k">${t('hooksInject')}</span>
          <div class="seg-control" style="margin:0">
            <button class=${inject !== true ? 'active' : ''} @click=${() => void this.saveHooks({ allowPromptInjection: false })}>${t('commsOff')}</button>
            <button class=${inject === true ? 'active' : ''} @click=${() => void this.saveHooks({ allowPromptInjection: true })}>${t('commsOn')}</button>
          </div>
        </div>
        <div class="row"><span class="k">${t('hooksAccess')}</span>
          <div class="seg-control" style="margin:0">
            <button class=${access !== true ? 'active' : ''} @click=${() => void this.saveHooks({ allowConversationAccess: false })}>${t('commsOff')}</button>
            <button class=${access === true ? 'active' : ''} @click=${() => void this.saveHooks({ allowConversationAccess: true })}>${t('commsOn')}</button>
          </div>
        </div>
        <div class="row"><span class="k">${t('hooksTimeout')}</span>
          <input class="field" type="number" min="1000" step="1000" style="margin:0" .value=${(d.timeoutMs as number) ?? ''}
            @change=${(e: Event) => { const v = (e.target as HTMLInputElement).value.trim(); void this.saveHooks({ timeoutMs: v ? Number(v) : null }); }} />
        </div>
        <div class="mp-form-title" style="margin-top:10px">${t('hooksInternal')}</div>
        ${Object.keys(internal).length ? Object.entries(internal).map(([k, v]) => html`
          <div class="row"><span class="k">${k}</span>
            <div class="seg-control" style="margin:0">
              <button class=${(v as { enabled?: boolean })?.enabled !== false ? 'active' : ''} @click=${() => void this.saveHooks({ internal: { entries: { [k]: { enabled: true } } } })}>${t('commsOn')}</button>
              <button class=${(v as { enabled?: boolean })?.enabled === false ? 'active' : ''} @click=${() => void this.saveHooks({ internal: { entries: { [k]: { enabled: false } } } })}>${t('commsOff')}</button>
            </div>
          </div>
        `) : html`<div class="hint">${t('empty')}</div>`}
        ${this.hooksMessage ? html`<div class="notice ${this.hooksMessage.ok ? 'ok' : 'error'}" style="margin-top:8px">${this.hooksMessage.text}</div>` : nothing}
      </div>
    `;
  }

  // ---- 网关网络 ----
  private syncGatewayForm() {
    const d = store.gatewayConfig ?? {};
    if (d === this._lastGwRef) return;
    this._lastGwRef = d;
  }
  private _lastGwRef: Record<string, unknown> | null = null;

  private async saveGateway(patch: Record<string, unknown>): Promise<void> {
    if (this.gwBusy) return;
    this.gwBusy = true; this.requestUpdate();
    const res = await store.patchGateway(patch);
    this.gwBusy = false;
    this.gwMessage = res.ok ? { ok: true, text: t('agentsSaved') } : { ok: false, text: `${t('agentsSaveFailed')}:${res.error ?? ''}` };
    this.requestUpdate();
  }

  private renderGatewayCard() {
    const d = store.gatewayConfig ?? {};
    const bind = (d.bind as string) ?? 'loopback';
    const tailscale = (d.tailscale as { mode?: string })?.mode ?? 'off';
    const tls = (d.tls as Record<string, unknown>) ?? {};
    const binds = [
      { id: 'loopback', label: 'loopback (仅本机)' },
      { id: 'lan', label: 'lan (局域网)' },
      { id: '0.0.0.0', label: '0.0.0.0 (所有)' },
    ];
    return html`
      <div class="card glass">
        <h3>${t('gatewayNetTitle')}</h3>
        <div class="hint">${t('gatewayNetHint')}</div>
        <div class="row"><span class="k">${t('gatewayBind')}</span></div>
        <div class="seg-control" style="margin:4px 0 10px">
          ${binds.map(b => html`<button class=${bind === b.id ? 'active' : ''} @click=${() => void this.saveGateway({ bind: b.id })}>${b.label}</button>`)}
        </div>
        <div class="row"><span class="k">${t('gatewayTailscale')}</span>
          <div class="seg-control" style="margin:0">
            <button class=${tailscale === 'off' ? 'active' : ''} @click=${() => void this.saveGateway({ tailscale: { mode: 'off' } })}>off</button>
            <button class=${tailscale === 'serve' ? 'active' : ''} @click=${() => void this.saveGateway({ tailscale: { mode: 'serve' } })}>serve</button>
            <button class=${tailscale === 'funnel' ? 'active' : ''} @click=${() => void this.saveGateway({ tailscale: { mode: 'funnel' } })}>funnel</button>
          </div>
        </div>
        <div class="row"><span class="k">${t('gatewayTls')}</span>
          <div class="seg-control" style="margin:0">
            <button class=${!tls.enabled ? 'active' : ''} @click=${() => void this.saveGateway({ tls: { enabled: false } })}>${t('commsOff')}</button>
            <button class=${tls.enabled ? 'active' : ''} @click=${() => void this.saveGateway({ tls: { enabled: true, autoGenerate: true } })}>${t('commsOn')}</button>
          </div>
        </div>
        <div class="row"><span class="k">${t('gatewayMode')}</span><span class="v">${(d.mode as string) ?? 'local'}</span></div>
        <div class="row"><span class="k">${t('infraPort')}</span><span class="v">${(d.port as number) ?? '—'}</span></div>
        ${this.gwMessage ? html`<div class="notice ${this.gwMessage.ok ? 'ok' : 'error'}" style="margin-top:8px">${this.gwMessage.text}</div>` : nothing}
        <div class="hint">${t('gatewayNetRestart')}</div>
      </div>
    `;
  }

  // ---- TTS 语音设置 ----
  private syncTtsForm() {
    const d = store.ttsConfig ?? {};
    if (d === this._lastTtsRef) return;
    this._lastTtsRef = d;
  }
  private _lastTtsRef: Record<string, unknown> | null = null;

  private async saveTts(patch: Record<string, unknown>): Promise<void> {
    if (this.ttsBusy) return;
    this.ttsBusy = true; this.requestUpdate();
    const res = await store.patchTts(patch);
    this.ttsBusy = false;
    this.ttsMessage = res.ok ? { ok: true, text: t('agentsSaved') } : { ok: false, text: `${t('agentsSaveFailed')}:${res.error ?? ''}` };
    this.requestUpdate();
  }

  private renderTtsCard() {
    const d = store.ttsConfig ?? {};
    const provider = (d.provider as string) ?? '';
    const auto = (d.auto as string) ?? 'off';
    const providers = (d.providers as Record<string, Record<string, unknown>>) ?? {};
    const autoOpts = ['off', 'always', 'inbound', 'tagged'];
    return html`
      <div class="card glass">
        <h3>${t('ttsTitle')}</h3>
        <div class="hint">${t('ttsHint')}</div>
        <div class="row"><span class="k">${t('ttsProvider')}</span>
          <select class="field" style="margin:0" .value=${provider} @change=${(e: Event) => void this.saveTts({ provider: (e.target as HTMLSelectElement).value || null })}>
            <option value="">${t('ttsNone')}</option>
            ${Object.keys(providers).map(p => html`<option value=${p} ?selected=${p === provider}>${p}</option>`)}
          </select>
        </div>
        <div class="row"><span class="k">${t('ttsAuto')}</span>
          <div class="seg-control" style="margin:0">
            ${autoOpts.map(o => html`<button class=${auto === o ? 'active' : ''} @click=${() => void this.saveTts({ auto: o })}>${o}</button>`)}
          </div>
        </div>
        <div class="mp-form-title" style="margin-top:10px">${t('ttsProviders')}</div>
        ${Object.entries(providers).map(([name, cfg]) => html`
          <div class="row"><span class="k">${name}</span><span class="v">${(cfg as { apiKey?: string })?.apiKey ? '••••' : t('ttsNoKey')}</span>
            <button class="icon-btn" title=${t('delete')} @click=${() => void this.saveTts({ providers: { [name]: null } })}>🗑</button>
          </div>
        `)}
        <div class="mp-grid mp-grid-2" style="margin-top:6px">
          <input class="field" placeholder="provider 名 (如 openai)" .value=${this.ttsNewProvider}
            @input=${(e: InputEvent) => { this.ttsNewProvider = (e.target as HTMLInputElement).value; }} />
          <input class="field" placeholder="API Key" .value=${this.ttsNewKey}
            @input=${(e: InputEvent) => { this.ttsNewKey = (e.target as HTMLInputElement).value; }} />
        </div>
        <div class="actions">
          <button class="btn" ?disabled=${!this.ttsNewProvider.trim() || this.ttsBusy}
            @click=${() => { void this.saveTts({ providers: { [this.ttsNewProvider.trim()]: { apiKey: this.ttsNewKey.trim() || undefined } } }); this.ttsNewProvider = ''; this.ttsNewKey = ''; }}>+ ${t('ttsAddProvider')}</button>
        </div>
        ${this.ttsMessage ? html`<div class="notice ${this.ttsMessage.ok ? 'ok' : 'error'}" style="margin-top:8px">${this.ttsMessage.text}</div>` : nothing}
      </div>
    `;
  }

  // ---- 单代理覆盖 ----
  private syncEntryForm() {
    const list = store.agentEntries;
    if (list === this._lastEntryRef) return;
    this._lastEntryRef = list;
  }
  private _lastEntryRef: typeof store.agentEntries | null = null;

  private async saveEntry(agentId: string, patch: Record<string, unknown>): Promise<void> {
    if (this.entryBusy) return;
    this.entryBusy = true; this.requestUpdate();
    const res = await store.patchAgentEntry(agentId, patch);
    this.entryBusy = false;
    this.entryMessage = res.ok ? { ok: true, text: t('agentsSaved') } : { ok: false, text: `${t('agentsSaveFailed')}:${res.error ?? ''}` };
    this.requestUpdate();
  }

  private renderAgentEntriesCard() {
    const list = store.agentEntries ?? [];
    return html`
      <div class="card glass">
        <h3>${t('agentEntriesTitle')}</h3>
        <div class="hint">${t('agentEntriesHint')}</div>
        ${!list.length ? html`<div class="hint">${t('empty')}</div>` : list.map(a => {
          const isEdit = this.entryEditId === a.id;
          return html`
            <div class="ad-item">
              <div class="ad-item-head ${isEdit ? 'plain' : ''}" @click=${() => { this.entryEditId = isEdit ? null : a.id; this.entryModel = ((a.config.model as string) ?? ''); this.entryWorkspace = ((a.config.workspace as string) ?? ''); }}>
                <div class="ad-item-text">
                  <div class="ad-item-title">${a.id}${a.config.default ? html`<span class="badge active" style="margin-left:6px">${t('agentsDefault')}</span>` : nothing}</div>
                  <div class="ad-item-desc">${t('agentsModel')}: ${((a.config.model as string) ?? '—')} · ${t('agentsWorkspace')}: ${((a.config.workspace as string) ?? '—')}</div>
                </div>
                <span class="ad-chev ${isEdit ? 'open' : ''}">▾</span>
              </div>
              ${isEdit ? html`
                <div class="ad-item-body">
                  <div class="mp-grid mp-grid-2">
                    <label class="ad-field"><span>${t('agentsModel')}</span><input class="field" .value=${this.entryModel} @input=${(e: InputEvent) => { this.entryModel = (e.target as HTMLInputElement).value; }} /></label>
                    <label class="ad-field"><span>${t('agentsWorkspace')}</span><input class="field" .value=${this.entryWorkspace} @input=${(e: InputEvent) => { this.entryWorkspace = (e.target as HTMLInputElement).value; }} /></label>
                  </div>
                  <div class="row"><span class="k">${t('agentsThinking')}</span>
                    <div class="seg-control" style="margin:0">
                      ${['off', 'minimal', 'low', 'medium', 'high'].map(t2 => html`<button class=${(a.config.thinkingDefault as string) === t2 ? 'active' : ''} @click=${() => void this.saveEntry(a.id, { thinkingDefault: t2 })}>${t2}</button>`)}
                    </div>
                  </div>
                  <div class="row"><span class="k">${t('agentsFastMode')}</span>
                    <div class="seg-control" style="margin:0">
                      <button class=${(a.config.fastModeDefault as string | boolean) === true ? 'active' : ''} @click=${() => void this.saveEntry(a.id, { fastModeDefault: true })}>${t('commsOn')}</button>
                      <button class=${(a.config.fastModeDefault as string | boolean) === false ? 'active' : ''} @click=${() => void this.saveEntry(a.id, { fastModeDefault: false })}>${t('commsOff')}</button>
                      <button class=${(a.config.fastModeDefault as string | boolean) === 'auto' ? 'active' : ''} @click=${() => void this.saveEntry(a.id, { fastModeDefault: 'auto' })}>${t('agentsFastAuto')}</button>
                    </div>
                  </div>
                  <div class="actions">
                    <button class="btn primary" ?disabled=${this.entryBusy}
                      @click=${() => void this.saveEntry(a.id, { model: this.entryModel.trim() || null, workspace: this.entryWorkspace.trim() || null })}>${t('agentsSave')}</button>
                  </div>
                </div>
              ` : nothing}
            </div>
          `;
        })}
        ${this.entryMessage ? html`<div class="notice ${this.entryMessage.ok ? 'ok' : 'error'}" style="margin-top:8px">${this.entryMessage.text}</div>` : nothing}
      </div>
    `;
  }

  // ---- Cron 全局设置 ----
  private syncCronCfgForm() {
    const d = store.cronConfig ?? {};
    if (d === this._lastCronCfgRef) return;
    this._lastCronCfgRef = d;
  }
  private _lastCronCfgRef: Record<string, unknown> | null = null;

  private async saveCronCfg(patch: Record<string, unknown>): Promise<void> {
    if (this.cronCfgBusy) return;
    this.cronCfgBusy = true; this.requestUpdate();
    const res = await store.patchCronConfig(patch);
    this.cronCfgBusy = false;
    this.cronCfgMessage = res.ok ? { ok: true, text: t('agentsSaved') } : { ok: false, text: `${t('agentsSaveFailed')}:${res.error ?? ''}` };
    this.requestUpdate();
  }

  private renderCronConfigCard() {
    const d = store.cronConfig ?? {};
    const enabled = d.enabled !== false;
    const alert = (d.failureAlert as Record<string, unknown>) ?? {};
    const retention = (d.sessionRetention as string | boolean) ?? '';
    return html`
      <div class="card glass">
        <h3>${t('cronConfigTitle')}</h3>
        <div class="hint">${t('cronConfigHint')}</div>
        <div class="row"><span class="k">${t('cronConfigEnabled')}</span>
          <div class="seg-control" style="margin:0">
            <button class=${!enabled ? 'active' : ''} @click=${() => void this.saveCronCfg({ enabled: false })}>${t('commsOff')}</button>
            <button class=${enabled ? 'active' : ''} @click=${() => void this.saveCronCfg({ enabled: true })}>${t('commsOn')}</button>
          </div>
        </div>
        <div class="row"><span class="k">${t('cronConfigRetention')}</span>
          <input class="field" style="margin:0" placeholder="24h / 7d / false" .value=${String(retention)}
            @change=${(e: Event) => { const v = (e.target as HTMLInputElement).value.trim(); void this.saveCronCfg({ sessionRetention: v === 'false' ? false : (v || null) }); }} />
        </div>
        <div class="mp-form-title" style="margin-top:10px">${t('cronConfigAlert')}</div>
        <div class="row"><span class="k">${t('cronConfigAlertEnabled')}</span>
          <div class="seg-control" style="margin:0">
            <button class=${!alert.enabled ? 'active' : ''} @click=${() => void this.saveCronCfg({ failureAlert: { enabled: false } })}>${t('commsOff')}</button>
            <button class=${alert.enabled ? 'active' : ''} @click=${() => void this.saveCronCfg({ failureAlert: { enabled: true } })}>${t('commsOn')}</button>
          </div>
        </div>
        <div class="row"><span class="k">${t('cronConfigAlertMode')}</span>
          <div class="seg-control" style="margin:0">
            <button class=${alert.mode !== 'webhook' ? 'active' : ''} @click=${() => void this.saveCronCfg({ failureAlert: { mode: 'announce' } })}>announce</button>
            <button class=${alert.mode === 'webhook' ? 'active' : ''} @click=${() => void this.saveCronCfg({ failureAlert: { mode: 'webhook' } })}>webhook</button>
          </div>
        </div>
        <div class="row"><span class="k">${t('cronConfigAlertAfter')}</span>
          <input class="field" type="number" min="1" style="margin:0" .value=${(alert.after as number) ?? ''}
            @change=${(e: Event) => { const v = (e.target as HTMLInputElement).value.trim(); void this.saveCronCfg({ failureAlert: { after: v ? Number(v) : null } }); }} />
        </div>
        ${this.cronCfgMessage ? html`<div class="notice ${this.cronCfgMessage.ok ? 'ok' : 'error'}" style="margin-top:8px">${this.cronCfgMessage.text}</div>` : nothing}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'settings-view': SettingsView;
  }
}
