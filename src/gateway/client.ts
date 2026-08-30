// Gateway WS 客户端:握手(challenge 签名)、请求 map、事件总线、指数退避重连
import type {
  AgentEventPayload,
  ChatEventPayload,
  ChatHistoryResult,
  ChatSendResult,
  CronJob,
  CronRunEntry,
  EventFrame,
  Frame,
  GatewayError,
  HelloOk,
  LogTailResult,
  ModelRow,
  NodeRow,
  PairedDevice,
  PresenceEntry,
  ResponseFrame,
  SessionRow,
  SessionUsageRow,
  SkillEntry,
  SystemInfo,
  DreamDiary,
  WorkspaceEntry,
  WorkspaceFile,
} from './types';
import { buildPayloadV2, ensureDeviceIdentity, getStoredDeviceToken, signPayload, storeDeviceToken, type DeviceIdentity } from './device-identity';

export type ConnState = 'idle' | 'connecting' | 'connected' | 'disconnected';

export interface GatewayCreds {
  url: string; // ws://127.0.0.1:18789
  token: string; // 共享令牌(sessionStorage)
}

type Listener = (payload: any) => void;

// client.id 必须用服务端白名单里的值;webchat-ui 会被禁止 sessions.patch(策略限制),
// openclaw-control-ui 与官方 Control UI 同 ID,拥有完整 operator 能力
const CLIENT = { id: 'openclaw-control-ui', version: '0.1.0', platform: 'web', mode: 'ui' } as const;
// 与官方 Control UI 一致:sessions.patch(重命名/置顶/归档)、config 等都需要 operator.admin
const SCOPES = ['operator.admin', 'operator.read', 'operator.write', 'operator.approvals', 'operator.pairing'];
const REQUEST_TIMEOUT_MS = 30_000;
const INITIAL_BACKOFF_MS = 800;
const MAX_BACKOFF_MS = 15_000;

export class GatewayClient {
  private ws: WebSocket | null = null;
  private creds: GatewayCreds | null = null;
  private identity: DeviceIdentity | null = null;
  private reqSeq = 0;
  private pending = new Map<string, { resolve: (v: any) => void; reject: (e: Error) => void; timer: number }>();
  private listeners = new Map<string, Set<Listener>>();
  private backoffMs = INITIAL_BACKOFF_MS;
  private reconnectTimer: number | null = null;
  private connectNonce: string | null = null;
  private manualClose = false;
  private authFailed = false; // AUTH_TOKEN_MISMATCH 后停止自动重连
  private hello: HelloOk | null = null;

  state: ConnState = 'idle';
  lastError: GatewayError | null = null;
  pairingRequired = false;

  on(event: string, fn: Listener): () => void {
    if (!this.listeners.has(event)) this.listeners.set(event, new Set());
    this.listeners.get(event)!.add(fn);
    return () => this.listeners.get(event)?.delete(fn);
  }

  private emit(event: string, payload?: any): void {
    this.listeners.get(event)?.forEach(fn => {
      try { fn(payload); } catch (e) { console.error('[gw] listener error', e); }
    });
  }

  get snapshot(): HelloOk | null { return this.hello; }

  async connect(creds: GatewayCreds): Promise<void> {
    this.creds = creds;
    this.manualClose = false;
    this.authFailed = false;
    this.identity = await ensureDeviceIdentity();
    this.openSocket();
  }

  disconnect(): void {
    this.manualClose = true;
    this.clearReconnect();
    if (this.ws) {
      try { this.ws.close(); } catch { /* ignore */ }
      this.ws = null;
    }
    this.setState('idle');
  }

  private setState(s: ConnState): void {
    if (this.state !== s) {
      this.state = s;
      this.emit('state', s);
    }
  }

  private openSocket(): void {
    if (!this.creds) return;
    this.setState('connecting');
    this.connectNonce = null;
    let ws: WebSocket;
    try {
      ws = new WebSocket(this.creds.url);
    } catch (e) {
      this.lastError = { code: 'INVALID_URL', message: String(e) };
      this.scheduleReconnect();
      return;
    }
    this.ws = ws;
    ws.onmessage = ev => this.onFrame(ev.data as string);
    ws.onopen = () => { /* 等待 connect.challenge */ };
    ws.onerror = () => { /* onclose 统一处理重连 */ };
    ws.onclose = ev => {
      this.rejectAllPending(new Error('connection closed'));
      if (this.manualClose) return;
      // 1008 + pairing required:浏览器/设备未配对
      if (ev.code === 1008 && /pairing/i.test(ev.reason || '')) {
        this.pairingRequired = true;
        this.lastError = { code: 'PAIRING_REQUIRED', message: ev.reason || 'pairing required' };
        this.emit('pairing-required', this.lastError);
        this.setState('disconnected');
        this.scheduleReconnect();
        return;
      }
      // 1008 + 设备身份缺失(如 WebCrypto/noble 初始化失败):重连无意义,停下提示用户
      if (ev.code === 1008 && /device identity/i.test(ev.reason || '')) {
        this.lastError = {
          code: 'DEVICE_IDENTITY_REQUIRED',
          message: ev.reason || 'device identity required',
        };
        this.authFailed = true;
        this.emit('device-identity-failed', this.lastError);
        this.setState('disconnected');
        return;
      }
      if (this.authFailed) {
        this.setState('disconnected');
        return;
      }
      this.setState('disconnected');
      this.scheduleReconnect();
    };
  }

  private scheduleReconnect(): void {
    if (this.manualClose || this.authFailed) return;
    this.clearReconnect();
    const delay = this.backoffMs;
    this.backoffMs = Math.min(this.backoffMs * 2, MAX_BACKOFF_MS);
    this.reconnectTimer = window.setTimeout(() => this.openSocket(), delay);
    this.emit('reconnect-scheduled', { delayMs: delay });
  }

  retryNow(): void {
    this.backoffMs = INITIAL_BACKOFF_MS;
    this.clearReconnect();
    this.openSocket();
  }

  private clearReconnect(): void {
    if (this.reconnectTimer !== null) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
  }

  private async onFrame(raw: string): Promise<void> {
    let frame: Frame;
    try { frame = JSON.parse(raw); } catch { return; }
    if (frame.type === 'event') {
      await this.handleEvent(frame as EventFrame);
      return;
    }
    if (frame.type === 'res') {
      this.handleResponse(frame as ResponseFrame);
    }
  }

  private async handleEvent(frame: EventFrame): Promise<void> {
    switch (frame.event) {
      case 'connect.challenge': {
        this.connectNonce = frame.payload?.nonce ?? null;
        await this.sendConnect();
        return;
      }
      case 'chat':
        this.emit('chat', frame.payload as ChatEventPayload);
        return;
      case 'agent':
        this.emit('agent', frame.payload as AgentEventPayload);
        return;
      case 'sessions.changed':
        this.emit('sessions-changed', frame.payload);
        return;
      case 'shutdown':
        this.emit('gateway-shutdown', frame.payload);
        return;
      default:
        this.emit(frame.event, frame.payload);
    }
  }

  private async sendConnect(): Promise<void> {
    if (!this.ws || !this.creds || this.ws.readyState !== WebSocket.OPEN) return;
    const nonce = this.connectNonce ?? '';
    const signedAt = Date.now();
    // 令牌优先级:显式共享令牌 > 存储的设备令牌
    let authToken: string | undefined = this.creds.token || undefined;
    let usedDeviceToken = false;
    if (!authToken && this.identity) {
      const stored = getStoredDeviceToken(this.identity.deviceId, 'operator');
      if (stored) { authToken = stored.token; usedDeviceToken = true; }
    }
    const payload = buildPayloadV2({
      deviceId: this.identity?.deviceId ?? '',
      clientId: CLIENT.id,
      clientMode: CLIENT.mode,
      role: 'operator',
      scopes: SCOPES,
      signedAtMs: signedAt,
      token: authToken ?? null,
      nonce,
    });
    const device = this.identity
      ? {
          id: this.identity.deviceId,
          publicKey: this.identity.publicKey,
          signature: await signPayload(this.identity.privateKey, payload),
          signedAt,
          nonce,
        }
      : undefined;
    this.request('connect', {
      minProtocol: 4,
      maxProtocol: 4,
      client: CLIENT,
      role: 'operator',
      scopes: SCOPES,
      caps: ['tool-events'],
      commands: [],
      permissions: {},
      auth: authToken ? { token: authToken } : {},
      locale: navigator.language?.startsWith('zh') ? 'zh-CN' : 'en-US',
      userAgent: 'openclaw-webui/0.1.0',
      device,
    }).then(hello => {
      this.hello = hello as HelloOk;
      this.backoffMs = INITIAL_BACKOFF_MS;
      this.pairingRequired = false;
      this.lastError = null;
      const dt = this.hello.auth?.deviceToken;
      if (dt && this.identity) {
        storeDeviceToken(this.identity.deviceId, 'operator', dt, this.hello.auth?.scopes ?? SCOPES);
      }
      if (usedDeviceToken) {
        // 设备令牌连接成功:token 空缺也能继续用
        this.emit('device-token-auth', null);
      }
      this.setState('connected');
      this.emit('hello', this.hello);
    }).catch(err => {
      this.handleConnectError(err as GatewayError);
    });
  }

  private handleConnectError(err: GatewayError | Error): void {
    const ge = (err as GatewayError);
    this.lastError = ge;
    if (ge.code === 'AUTH_TOKEN_MISMATCH' || ge.code === 'AUTH_UNAUTHORIZED') {
      this.authFailed = true;
      this.emit('auth-failed', ge);
      this.setState('disconnected');
      this.ws?.close();
      return;
    }
    if (ge.code === 'AUTH_SCOPE_MISMATCH') {
      // 请求的 scopes 比已配对设备令牌更宽:丢弃旧设备令牌,用共享令牌重新握手
      // (本机 loopback 自动免配对批准,不需要人工介入)
      try { localStorage.removeItem('openclaw-webui.device-tokens.v1'); } catch { /* ignore */ }
      this.ws?.close();
      return;
    }
    if (ge.code === 'AUTH_RATE_LIMITED' || /rate.?limit|lockout|尝试过于频繁/i.test(ge.message ?? '')) {
      // 触发网关防爆破锁定(默认 10 次/60s 锁 10 分钟):
      // 继续重连只会一直被拒,必须停下等锁过期或重启网关
      this.authFailed = true;
      this.emit('auth-rate-limited', ge);
      this.setState('disconnected');
      this.ws?.close();
      return;
    }
    if (ge.code === 'NOT_PAIRED' || ge.details?.code === 'PAIRING_REQUIRED') {
      this.pairingRequired = true;
      this.emit('pairing-required', ge);
    }
    if (ge.code === 'UNAVAILABLE') {
      // 网关启动中(startup-sidecars):按 retryAfterMs 重试
      const delay = typeof ge.retryAfterMs === 'number' && ge.retryAfterMs > 0 ? ge.retryAfterMs : 2000;
      this.ws?.close();
      this.clearReconnect();
      this.reconnectTimer = window.setTimeout(() => this.openSocket(), Math.min(delay, 10_000));
      this.setState('connecting');
      return;
    }
    this.emit('connect-error', ge);
    this.ws?.close(); // onclose 走统一退避重连
  }

  private handleResponse(frame: ResponseFrame): void {
    const entry = this.pending.get(frame.id);
    if (!entry) return;
    clearTimeout(entry.timer);
    this.pending.delete(frame.id);
    if (frame.ok) entry.resolve(frame.payload);
    else entry.reject(Object.assign(new Error(frame.error?.message ?? 'gateway error'), frame.error ?? {}));
  }

  request<T = any>(method: string, params: unknown): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
        reject(new Error('not connected'));
        return;
      }
      const id = `r${++this.reqSeq}`;
      const timer = window.setTimeout(() => {
        this.pending.delete(id);
        reject(new Error(`request timeout: ${method}`));
      }, REQUEST_TIMEOUT_MS);
      this.pending.set(id, { resolve, reject, timer });
      this.ws.send(JSON.stringify({ type: 'req', id, method, params }));
    });
  }

  private rejectAllPending(err: Error): void {
    for (const [, entry] of this.pending) {
      clearTimeout(entry.timer);
      entry.reject(err);
    }
    this.pending.clear();
  }

  // ---- 常用 RPC 封装 ----

  async listSessions(): Promise<SessionRow[]> {
    const res = await this.request<{ sessions?: SessionRow[] }>('sessions.list', { limit: 100 });
    return res?.sessions ?? [];
  }

  async patchSession(key: string, patch: Record<string, unknown>): Promise<unknown> {
    return this.request('sessions.patch', { key, ...patch });
  }

  async createSession(): Promise<string> {
    const res = await this.request<{ key: string }>('sessions.create', {});
    if (!res?.key) throw new Error('sessions.create returned no key');
    return res.key;
  }

  async chatHistory(sessionKey: string, maxChars?: number): Promise<ChatHistoryResult> {
    const params: Record<string, unknown> = { sessionKey };
    if (maxChars) params.maxChars = maxChars;
    return this.request<ChatHistoryResult>('chat.history', params);
  }

  async chatSend(sessionKey: string, message: string, idempotencyKey: string, sessionId?: string): Promise<ChatSendResult> {
    const params: Record<string, unknown> = {
      sessionKey,
      message,
      deliver: false,
      idempotencyKey,
    };
    if (sessionId) params.sessionId = sessionId;
    return this.request<ChatSendResult>('chat.send', params);
  }

  async chatAbort(sessionKey: string): Promise<unknown> {
    return this.request('chat.abort', { sessionKey });
  }

  async systemInfo(): Promise<SystemInfo> {
    return this.request<SystemInfo>('system.info', {});
  }

  // ---- 扩展功能:定时任务 / 技能 / 模型 / 设备 / 日志 ----

  async listCronJobs(): Promise<CronJob[]> {
    const res = await this.request<{ jobs?: CronJob[] }>('cron.list', {});
    return res?.jobs ?? [];
  }

  async cronRuns(jobId: string, limit = 5): Promise<CronRunEntry[]> {
    const res = await this.request<{ entries?: CronRunEntry[] }>('cron.runs', { id: jobId, limit });
    return res?.entries ?? [];
  }

  async cronRun(jobId: string): Promise<unknown> {
    return this.request('cron.run', { id: jobId });
  }

  async cronUpdate(jobId: string, patch: Record<string, unknown>): Promise<unknown> {
    return this.request('cron.update', { jobId, patch });
  }

  async cronRemove(jobId: string): Promise<unknown> {
    return this.request('cron.remove', { id: jobId });
  }

  async listSkills(): Promise<SkillEntry[]> {
    const res = await this.request<{ skills?: SkillEntry[] }>('skills.status', {});
    return res?.skills ?? [];
  }

  async listModels(): Promise<ModelRow[]> {
    const res = await this.request<{ models?: ModelRow[] }>('models.list', {});
    return res?.models ?? [];
  }

  async listNodes(): Promise<NodeRow[]> {
    const res = await this.request<{ nodes?: NodeRow[] }>('node.list', {});
    return res?.nodes ?? [];
  }

  async listDevices(): Promise<{ pending: PairedDevice[]; paired: PairedDevice[] }> {
    const res = await this.request<{ pending?: PairedDevice[]; paired?: PairedDevice[] }>('device.pair.list', {});
    return { pending: res?.pending ?? [], paired: res?.paired ?? [] };
  }

  async deviceApprove(requestId: string): Promise<unknown> {
    return this.request('device.pair.approve', { requestId });
  }

  async deviceReject(requestId: string): Promise<unknown> {
    return this.request('device.pair.reject', { requestId });
  }

  async presence(): Promise<PresenceEntry[]> {
    const res = await this.request<PresenceEntry[] | { entries?: PresenceEntry[] }>('system-presence', {});
    if (Array.isArray(res)) return res;
    return res?.entries ?? [];
  }

  async channelsStatus(): Promise<Record<string, unknown>> {
    return this.request<Record<string, unknown>>('channels.status', {});
  }

  async logsTail(cursor?: number): Promise<LogTailResult> {
    const params: Record<string, unknown> = {};
    if (cursor !== undefined) params.cursor = cursor;
    return this.request<LogTailResult>('logs.tail', params);
  }

  // ---- 配置管理(模型提供商等,operator.admin) ----

  async configGet(): Promise<{ hash: string; config: Record<string, unknown> }> {
    const res = await this.request<{ hash?: string; config?: Record<string, unknown> }>('config.get', {});
    return { hash: res?.hash ?? '', config: res?.config ?? {} };
  }

  /** 合并写入部分配置;raw 为部分配置的 JSON 字符串,baseHash 做并发保护。 */
  async configPatch(rawObj: unknown, opts?: { replacePaths?: string[]; note?: string }): Promise<void> {
    const snap = await this.configGet();
    const params: Record<string, unknown> = {
      baseHash: snap.hash,
      raw: JSON.stringify(rawObj),
      note: opts?.note ?? 'openclaw-webui',
    };
    if (opts?.replacePaths?.length) params.replacePaths = opts.replacePaths;
    await this.request('config.patch', params);
  }

  /** 会话用量(客户端按模型聚合)。 */
  async sessionsUsage(): Promise<SessionUsageRow[]> {
    const res = await this.request<{ sessions?: SessionUsageRow[] }>('sessions.usage', { agentScope: 'all' });
    return res?.sessions ?? [];
  }

  /** 新建定时任务。schedule: {kind:'every',everyMs} 或 {kind:'cron',expr}。 */
  async cronAdd(job: { name: string; description?: string; schedule: Record<string, unknown>; payload: { kind: 'agentTurn'; message: string }; sessionTarget?: string; enabled?: boolean }): Promise<{ id: string }> {
    return this.request<{ id: string }>('cron.add', job);
  }

  /** 全量更新定时任务字段。网关格式:{jobId, patch}。 */
  async cronUpdateJob(id: string, patch: Record<string, unknown>): Promise<unknown> {
    return this.request('cron.update', { jobId: id, patch });
  }

  /** 工作区文件列表(AI 记忆浏览,只读)。 */
  async workspaceList(agentId: string, path: string): Promise<WorkspaceEntry[]> {
    const res = await this.request<{ entries?: WorkspaceEntry[] }>('agents.workspace.list', { agentId, path });
    return res?.entries ?? [];
  }

  /** 读取工作区文本文件(只读)。 */
  async workspaceGet(agentId: string, path: string): Promise<WorkspaceFile | null> {
    const res = await this.request<{ file?: WorkspaceFile }>('agents.workspace.get', { agentId, path });
    return res?.file ?? null;
  }

  /** 梦境日记。 */
  async dreamDiary(): Promise<DreamDiary | null> {
    return this.request<DreamDiary | null>('doctor.memory.dreamDiary', {});
  }
}
