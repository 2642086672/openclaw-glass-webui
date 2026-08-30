// Gateway WebSocket 协议帧类型(protocol v4)

export interface ClientInfo {
  id: string;
  version: string;
  platform: string;
  mode: string;
}

export interface DeviceAuth {
  id: string;
  publicKey: string;
  signature: string;
  signedAt: number;
  nonce: string;
}

export interface ConnectParams {
  minProtocol: 4;
  maxProtocol: 4;
  client: ClientInfo;
  role: 'operator';
  scopes: string[];
  caps: string[];
  commands: string[];
  permissions: Record<string, boolean>;
  auth: { token?: string; password?: string };
  locale: string;
  userAgent: string;
  device?: DeviceAuth;
}

export interface RequestFrame {
  type: 'req';
  id: string;
  method: string;
  params: unknown;
}

export interface GatewayError {
  code: string;
  message: string;
  retryable?: boolean;
  retryAfterMs?: number;
  details?: {
    code?: string;
    reason?: string;
    recommendedNextStep?: string;
    canRetryWithDeviceToken?: boolean;
    [k: string]: unknown;
  };
}

export interface ResponseFrame {
  type: 'res';
  id: string;
  ok: boolean;
  payload?: any;
  error?: GatewayError;
}

export interface EventFrame {
  type: 'event';
  event: string;
  payload: any;
  seq?: number;
  stateVersion?: number;
}

export type Frame = RequestFrame | ResponseFrame | EventFrame;

export interface HelloOk {
  type: 'hello-ok';
  protocol: number;
  server: { version: string; connId: string };
  features: { methods: string[]; events: string[] };
  snapshot?: Record<string, unknown>;
  auth: {
    role: string;
    scopes: string[];
    deviceToken?: string;
  };
  policy: {
    maxPayload: number;
    maxBufferedBytes: number;
    tickIntervalMs: number;
  };
}

// ---- 会话 ----

export interface SessionRow {
  key: string;
  kind?: string;
  /** 用户自定义名(sessions.patch { label } 写入) */
  label?: string;
  /** 展示名(通常等于 label;无 label 时可能是自动生成的标题) */
  displayName?: string;
  chatType?: string;
  origin?: { provider?: string; surface?: string };
  updatedAt: number;
  archived?: boolean;
  pinned?: boolean;
  unread?: boolean;
  sessionId?: string;
  hasActiveRun?: boolean;
  model?: string;
  modelProvider?: string;
  thinkingDefault?: string;
  thinkingLevels?: Array<{ id: string; label: string }>;
  effectiveFastMode?: boolean;
  agentId?: string;
}

export interface ChannelStatusRow {
  id: string;
  label?: string;
  detailLabel?: string;
  configured?: boolean;
  running?: boolean;
  connected?: boolean;
  state?: string;
}

// ---- 用量 ----

export interface UsageTotals {
  input: number;
  output: number;
  cacheRead: number;
  cacheWrite: number;
  totalTokens: number;
  totalCost: number;
}

export interface SessionUsageRow {
  key: string;
  label?: string;
  displayName?: string;
  modelProvider?: string;
  model?: string;
  usage: {
    input?: number;
    output?: number;
    cacheRead?: number;
    cacheWrite?: number;
    totalTokens?: number;
    totalCost?: number;
    [k: string]: unknown;
  } | null;
  updatedAt?: number;
}

// ---- 工作区文件(AI 记忆) ----

export interface WorkspaceEntry {
  path: string;
  name: string;
  kind: 'file' | 'directory' | string;
  size?: number;
  updatedAtMs?: number;
}

export interface WorkspaceFile {
  path: string;
  name: string;
  size?: number;
  content?: string;
  mimeType?: string;
}

// ---- 梦境 ----

export interface DreamDiary {
  agentId?: string;
  found?: boolean;
  path?: string;
  content?: string;
}

// ---- 聊天 ----

export type MessageBlock =
  | { type: 'text'; text: string }
  | { type: 'toolCall'; id?: string; name?: string; arguments?: unknown }
  | { type: string; [k: string]: unknown };

export interface ChatMessage {
  role: 'user' | 'assistant' | 'toolResult' | 'system' | string;
  content: string | MessageBlock[];
  timestamp?: number;
  toolCallId?: string;
  toolName?: string;
  isError?: boolean;
  model?: string;
  usage?: Record<string, unknown>;
  aborted?: boolean;
}

export interface ChatHistoryResult {
  sessionKey: string;
  sessionId?: string;
  messages?: ChatMessage[];
  defaults?: Record<string, unknown>;
  truncated?: boolean;
}

export interface ChatSendResult {
  runId: string;
  status: 'started' | 'in_flight' | 'ok';
}

// ---- chat 事件(payload) ----

export interface ChatEventPayload {
  runId: string;
  sessionKey: string;
  agentId?: string;
  seq?: number;
  state: 'delta' | 'final' | string;
  deltaText?: string;
  replace?: boolean;
  stopReason?: string;
  message?: ChatMessage;
}

// ---- agent 事件(payload) ----

export interface AgentEventPayload {
  runId: string;
  sessionKey: string;
  agentId?: string;
  stream: 'lifecycle' | 'assistant' | 'tool' | 'item' | 'command_output' | string;
  data?: Record<string, unknown>;
  ts?: number;
}

// ---- system.info ----

export interface SystemInfo {
  machineName?: string;
  hostname?: string;
  platform?: string;
  osLabel?: string;
  arch?: string;
  cpuModel?: string;
  cpuCount?: number;
  loadAverage?: number[];
  memoryTotalBytes?: number;
  memoryFreeBytes?: number;
  diskTotalBytes?: number;
  diskAvailableBytes?: number;
  diskPath?: string;
  uptimeMs?: number;
  lanAddress?: string;
  port?: number;
  nodeVersion?: string;
  pid?: number;
}

// ---- 定时任务 ----

export interface CronJob {
  id: string;
  name?: string;
  description?: string;
  enabled: boolean;
  agentId?: string;
  schedule: { kind: string; everyMs?: number; anchorMs?: number; cron?: string; [k: string]: unknown };
  sessionTarget?: string;
  nextRunAtMs?: number;
  lastRunAtMs?: number;
  lastRunStatus?: string;
  lastRunError?: string;
  createdAtMs?: number;
  updatedAtMs?: number;
  payload?: { kind?: string; message?: string; [k: string]: unknown };
}

export interface CronRunEntry {
  ts?: number;
  jobId?: string;
  action?: string;
  status?: string;
  error?: string;
}

// ---- 技能 ----

export interface SkillEntry {
  name: string;
  skillKey?: string;
  emoji?: string;
  description?: string;
  source?: string;
  bundled?: boolean;
  disabled?: boolean;
  eligible?: boolean;
  userInvocable?: boolean;
  missing?: unknown;
}

// ---- 模型 ----

export interface ModelRow {
  id: string;
  name?: string;
  provider?: string;
  contextWindow?: number;
  reasoning?: boolean;
}

// ---- 节点与设备 ----

export interface NodeRow {
  nodeId: string;
  displayName?: string;
  platform?: string;
  clientId?: string;
  remoteIp?: string;
  caps?: string[];
  commands?: string[];
  approvalState?: string;
  lastSeenAtMs?: number;
  paired?: boolean;
  connected?: boolean;
}

export interface PairedDevice {
  deviceId: string;
  platform?: string;
  clientId?: string;
  role?: string;
  roles?: string[];
  scopes?: string[];
  createdAtMs?: number;
  approvedAtMs?: number;
  lastSeenAtMs?: number;
  lastSeenReason?: string;
}

// ---- 在线状态 ----

export interface PresenceEntry {
  host?: string;
  ip?: string;
  version?: string;
  platform?: string;
  mode?: string;
  reason?: string;
  text?: string;
  ts?: number;
}

// ---- 日志 ----

export interface LogTailResult {
  file?: string;
  cursor?: number;
  size?: number;
  lines?: unknown[];
}
