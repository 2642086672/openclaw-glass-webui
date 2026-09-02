// 轻量 i18n:中英字典 + localStorage 记忆 + 错误码本地化映射
export type Locale = 'zh' | 'en';

const LOCALE_KEY = 'openclaw-webui.locale';

const dict = {
  // 通用
  appName: { zh: 'OpenClaw 控制台', en: 'OpenClaw Console' },
  loading: { zh: '加载中…', en: 'Loading…' },
  retry: { zh: '立即重试', en: 'Retry now' },
  cancel: { zh: '取消', en: 'Cancel' },
  save: { zh: '保存', en: 'Save' },
  confirm: { zh: '确认', en: 'Confirm' },
  delete: { zh: '删除', en: 'Delete' },
  empty: { zh: '暂无内容', en: 'Nothing here yet' },
  error: { zh: '出错了', en: 'Something went wrong' },

  // 导航
  navChat: { zh: '聊天', en: 'Chat' },
  navSessions: { zh: '会话', en: 'Sessions' },
  navCron: { zh: '任务', en: 'Cron' },
  navSkills: { zh: '技能', en: 'Skills' },
  navDevices: { zh: '设备', en: 'Devices' },
  navLogs: { zh: '日志', en: 'Logs' },
  navUsage: { zh: '用量', en: 'Usage' },
  navStatus: { zh: '状态', en: 'Status' },
  navSettings: { zh: '设置', en: 'Settings' },

  // 连接状态
  connConnected: { zh: '已连接', en: 'Connected' },
  connConnecting: { zh: '连接中…', en: 'Connecting…' },
  connDisconnected: { zh: '连接断开,正在重连…', en: 'Connection lost — reconnecting…' },
  connNeedAuth: { zh: '需要登录', en: 'Sign-in required' },

  // 设置页
  settingsLanguage: { zh: '语言 / Language', en: 'Language / 语言' },
  settingsConnection: { zh: '网关连接', en: 'Gateway connection' },
  settingsGatewayUrl: { zh: '网关地址', en: 'Gateway URL' },
  settingsToken: { zh: '访问令牌', en: 'Access token' },
  settingsTokenHint: { zh: '令牌仅保存在当前标签页(sessionStorage),关闭标签页即清除,不会写入磁盘。', en: 'Token is kept in this tab only (sessionStorage) and cleared when the tab closes.' },
  settingsConnect: { zh: '连接', en: 'Connect' },
  settingsDisconnect: { zh: '断开', en: 'Disconnect' },
  settingsConnected: { zh: '已连接,网关版本 {version}', en: 'Connected, gateway version {version}' },
  settingsAppearance: { zh: '外观', en: 'Appearance' },
  settingsThemeFollow: { zh: '深浅色跟随系统', en: 'Follow system light/dark' },
  settingsAbout: { zh: '关于', en: 'About' },
  settingsAboutText: {
    zh: '第三方 OpenClaw Gateway 控制面板,直连 Gateway WebSocket 协议(protocol v4)。纯本地应用,不外发任何数据。',
    en: 'A third-party OpenClaw Gateway control panel speaking the Gateway WebSocket protocol (protocol v4). Fully local, no data leaves this device.',
  },

  // 登录引导
  loginTitle: { zh: '连接到 OpenClaw Gateway', en: 'Connect to OpenClaw Gateway' },
  loginSubtitle: { zh: '输入网关访问令牌开始使用(见 openclaw.json 的 gateway.auth.token)', en: 'Enter the gateway access token to begin (gateway.auth.token in openclaw.json)' },
  deviceQuickLogin: { zh: '快速登录(已配对设备)', en: 'Quick sign-in (paired device)' },
  deviceQuickLoginHint: { zh: '本浏览器已配对过,无需再输令牌', en: 'This browser is already paired — no token needed' },
  deviceLoginOr: { zh: '或使用令牌登录', en: 'or sign in with token' },
  loginNoSecureContext: {
    zh: '当前页面不是安全上下文,无法使用 WebCrypto。请通过 http://127.0.0.1 或 https 访问。',
    en: 'This page is not a secure context, so WebCrypto is unavailable. Use http://127.0.0.1 or https.',
  },

  // 聊天
  chatNewSession: { zh: '新聊天', en: 'New chat' },
  chatModelPicker: { zh: '切换本会话使用的模型', en: 'Switch model for this session' },
  chatPlaceholder: { zh: '输入消息…(Enter 发送,Shift+Enter 换行)', en: 'Type a message… (Enter to send, Shift+Enter for newline)' },
  chatSend: { zh: '发送', en: 'Send' },
  chatStop: { zh: '停止', en: 'Stop' },
  chatThinking: { zh: '正在思考…', en: 'Thinking…' },
  chatRunningTool: { zh: '正在执行工具:{name}', en: 'Running tool: {name}' },
  chatRunFinished: { zh: '回复完成', en: 'Reply complete' },
  chatRunAborted: { zh: '已中止', en: 'Aborted' },
  chatToolOutput: { zh: '工具输出', en: 'Tool output' },
  chatToolCall: { zh: '工具调用', en: 'Tool call' },
  chatNoSession: { zh: '选择或创建一个会话开始聊天', en: 'Select or create a session to start chatting' },
  chatHistoryOmitted: { zh: '[消息过大,已省略]', en: '[Message too large, omitted]' },
  chatCompacted: { zh: '—— 历史已压缩 ——', en: '— History compacted —' },

  // 会话列表
  sessionsTitle: { zh: '全部会话', en: 'All sessions' },
  sessionsPinned: { zh: '置顶', en: 'Pinned' },
  sessionsOthers: { zh: '最近', en: 'Recent' },
  sessionsArchived: { zh: '已归档', en: 'Archived' },
  sessionsRename: { zh: '重命名', en: 'Rename' },
  sessionsPin: { zh: '置顶', en: 'Pin' },
  sessionsUnpin: { zh: '取消置顶', en: 'Unpin' },
  sessionsArchive: { zh: '归档', en: 'Archive' },
  sessionsUnarchive: { zh: '恢复', en: 'Unarchive' },
  sessionsShowArchived: { zh: '显示已归档', en: 'Show archived' },
  sessionsHideArchived: { zh: '隐藏已归档', en: 'Hide archived' },
  sessionsNewName: { zh: '新的会话名称', en: 'New session name' },
  sessionsEmpty: { zh: '还没有会话,去聊天页新建一个吧', en: 'No sessions yet — create one from the Chat tab' },
  sessionsActiveRun: { zh: '运行中', en: 'Active' },
  sessionsUnread: { zh: '有新消息', en: 'Unread' },

  // 状态页
  statusTitle: { zh: '网关主机状态', en: 'Gateway host status' },
  statusMachine: { zh: '主机', en: 'Machine' },
  statusOS: { zh: '系统', en: 'OS' },
  statusCPU: { zh: '处理器', en: 'CPU' },
  statusLoad: { zh: '负载 (1/5/15min)', en: 'Load (1/5/15min)' },
  statusMemory: { zh: '内存', en: 'Memory' },
  statusDisk: { zh: '磁盘', en: 'Disk' },
  statusUptime: { zh: '运行时长', en: 'Uptime' },
  statusGateway: { zh: '网关', en: 'Gateway' },
  statusNode: { zh: 'Node 版本', en: 'Node version' },
  statusLan: { zh: '局域网地址', en: 'LAN address' },
  statusUsedTotal: { zh: '已用 / 总量', en: 'Used / Total' },
  statusPath: { zh: '路径', en: 'Path' },
  statusModels: { zh: '可用模型', en: 'Available models' },
  statusRefreshEvery: { zh: '每 10 秒自动刷新', en: 'Auto-refreshes every 10s' },

  // 定时任务
  cronTitle: { zh: '定时任务', en: 'Cron jobs' },
  cronNew: { zh: '新建任务', en: 'New job' },
  cronEdit: { zh: '编辑任务', en: 'Edit job' },
  cronEditing: { zh: '编辑「{name}」', en: 'Editing "{name}"' },
  cronCreated: { zh: '任务已创建', en: 'Job created' },
  cronSaved: { zh: '任务已保存', en: 'Job saved' },
  cronFieldName: { zh: '任务名称', en: 'Name' },
  cronFieldKind: { zh: '执行频率', en: 'Schedule' },
  cronKindEvery: { zh: '每N分钟', en: 'Every N min' },
  cronKindDaily: { zh: '每天定时', en: 'Daily at' },
  cronEveryMinutes: { zh: '间隔(分钟)', en: 'Interval (min)' },
  cronDailyTime: { zh: '每天执行时间', en: 'Time of day' },
  cronCronExpr: { zh: 'Cron 表达式', en: 'Cron expression' },
  cronFieldDesc: { zh: '任务说明(可选)', en: 'Description (optional)' },
  cronFieldMessage: { zh: '执行内容(发给 AI 的指令)', en: 'Prompt sent to the agent' },
  cronMessageHint: { zh: '例如:检查系统负载,异常时通知我', en: 'e.g. Check system load and notify me if abnormal' },
  cronNext: { zh: '下次', en: 'Next' },
  cronLast: { zh: '上次', en: 'Last' },
  cronRunNow: { zh: '立即运行', en: 'Run now' },
  cronEnable: { zh: '启用', en: 'Enable' },
  cronDisable: { zh: '停用', en: 'Disable' },
  cronDisabled: { zh: '已停用', en: 'Disabled' },
  cronLastError: { zh: '上次运行出错', en: 'Last run failed' },
  cronIsolated: { zh: '隔离会话', en: 'Isolated' },
  cronEmpty: { zh: '没有定时任务', en: 'No cron jobs' },
  cronDeleteConfirm: { zh: '确定删除任务「{name}」?', en: 'Delete job "{name}"?' },

  // 技能
  skillsTitle: { zh: '技能', en: 'Skills' },
  skillsReady: { zh: '可用', en: 'ready' },
  skillsSearch: { zh: '搜索技能名称或描述…', en: 'Search skills…' },
  skillBundled: { zh: '内置', en: 'Bundled' },
  skillCustom: { zh: '自定义', en: 'Custom' },
  skillDisabled: { zh: '已禁用', en: 'Disabled' },
  skillIneligible: { zh: '不可用', en: 'Unavailable' },

  // 技能市场(ClawHub / 第三方)
  tabInstalled: { zh: '已安装', en: 'Installed' },
  tabMarketplace: { zh: '市场', en: 'Marketplace' },
  marketplaceTitle: { zh: '技能市场', en: 'Skill Marketplace' },
  marketplaceSearch: { zh: '搜索技能…', en: 'Search skills…' },
  marketplaceInstall: { zh: '安装', en: 'Install' },
  marketplaceInstalling: { zh: '安装中…', en: 'Installing…' },
  marketplaceInstalled: { zh: '已安装', en: 'Installed' },
  marketplaceDownloads: { zh: '{n} 次下载', en: '{n} downloads' },
  marketplaceCategory: { zh: '分类', en: 'Category' },
  marketplaceCategoryAll: { zh: '全部', en: 'All' },
  marketplaceNoResults: { zh: '没有找到相关技能', en: 'No skills found' },
  marketplaceLoading: { zh: '加载市场列表…', en: 'Loading marketplace…' },
  marketplaceError: { zh: '加载失败,请稍后重试', en: 'Failed to load, please retry' },
  marketplaceEnableNow: { zh: '安装完成,是否立即启用?', en: 'Install finished — enable now?' },
  marketplaceEnableHint: { zh: '启用后技能立即可用。', en: 'The skill will be available immediately.' },
  marketplaceEnableYes: { zh: '启用', en: 'Enable' },
  marketplaceEnableNo: { zh: '稍后', en: 'Later' },
  marketplaceBack: { zh: '返回已安装', en: 'Back to installed' },
  marketplaceRetry: { zh: '重试', en: 'Retry' },
  marketplaceAuthor: { zh: '作者: {name}', en: 'by {name}' },
  marketplaceVersion: { zh: '版本 {v}', en: 'v{v}' },
  marketplaceNoDesc: { zh: '暂无描述', en: 'No description' },
  skillUpdate: { zh: '更新', en: 'Update' },
  skillUpdateAvailable: { zh: '可更新', en: 'Update available' },
  // 市场来源管理
  marketplaceSourcesTitle: { zh: '市场来源', en: 'Marketplace Sources' },
  marketplaceSourcesHint: { zh: '添加自定义市场链接,支持多个来源同时浏览。', en: 'Add custom marketplace URLs. Browse from multiple sources at once.' },
  sourceName: { zh: '名称', en: 'Name' },
  sourceUrl: { zh: '市场地址', en: 'Marketplace URL' },
  sourceApiKey: { zh: 'API Key(可选)', en: 'API Key (optional)' },
  sourceAdd: { zh: '添加来源', en: 'Add Source' },
  sourceAddBtn: { zh: '添加', en: 'Add' },
  sourceDefault: { zh: '默认', en: 'Default' },
  sourceCustom: { zh: '自定义', en: 'Custom' },
  sourceEnabled: { zh: '已启用', en: 'Enabled' },
  sourceDisabled: { zh: '已禁用', en: 'Disabled' },
  // 重连
  reconnecting: { zh: '连接断开,{s}秒后重连...', en: 'Reconnecting in {s}s...' },
  reconnectGaveUp: { zh: '连接失败,请检查网关后重试', en: 'Connection failed. Please check the gateway and retry.' },
  reconnectNow: { zh: '立即重连', en: 'Reconnect now' },

  // 设备
  devicesTitle: { zh: '设备与节点', en: 'Devices & nodes' },
  devicesPending: { zh: '待配对请求', en: 'Pending pairing' },
  devicesPaired: { zh: '已配对设备', en: 'Paired devices' },
  devicesNodes: { zh: '节点', en: 'Nodes' },
  devicesPresence: { zh: '在线状态', en: 'Presence' },
  devicesPendingHint: { zh: '新设备请求接入网关,确认后批准', en: 'A new device wants to connect. Approve if you trust it.' },
  deviceApprove: { zh: '批准', en: 'Approve' },
  deviceReject: { zh: '拒绝', en: 'Reject' },
  deviceOnline: { zh: '在线', en: 'Online' },
  deviceConnected: { zh: '已连接', en: 'Connected' },
  deviceOffline: { zh: '离线', en: 'Offline' },

  // 日志
  logsTitle: { zh: '网关日志', en: 'Gateway logs' },
  logsFollow: { zh: '跟随底部', en: 'Follow' },
  logsClear: { zh: '清空', en: 'Clear' },
  logsSearch: { zh: '过滤日志…', en: 'Filter logs…' },

  // 会话偏好(设置页)
  prefTitle: { zh: '会话偏好', en: 'Session preferences' },
  prefForSession: { zh: '当前会话', en: 'current session' },
  prefModel: { zh: '模型', en: 'Model' },
  prefThinking: { zh: '思考深度', en: 'Thinking' },
  prefFast: { zh: '极速模式', en: 'Fast mode' },
  prefFastOn: { zh: '开', en: 'On' },
  prefFastOff: { zh: '关', en: 'Off' },
  prefSessionHint: { zh: '以上设置立即生效,只影响当前选中的会话;模型也可在聊天页顶部切换。', en: 'Applies to the selected session immediately. Model is also switchable in the chat header.' },
  prefNoSession: { zh: '先在聊天页选择一个会话,再调整这些设置。', en: 'Select a session in Chat first, then adjust.' },

  // 渠道 / 安全
  channelsTitle: { zh: '渠道', en: 'Channels' },
  channelsEmpty: { zh: '暂无渠道(或网关刚重启,渠道加载中)', en: 'No channels yet (or still loading after gateway restart)' },
  channelAdd: { zh: '新增渠道', en: 'Add channel' },
  channelSetup: { zh: '配置 {name}', en: 'Set up {name}' },
  channelPickHint: { zh: '选择要接入的渠道,凭据来自对应平台的机器人/应用后台', en: 'Pick a channel; credentials come from its bot/app console' },
  channelSaved: { zh: '渠道「{id}」已写入配置', en: 'Channel "{id}" saved to config' },
  channelDeleted: { zh: '渠道「{id}」已删除', en: 'Channel "{id}" removed' },
  channelDelete: { zh: '删除渠道配置', en: 'Remove channel config' },
  channelDeleteConfirm: { zh: '确定删除渠道「{id}」的配置?', en: 'Remove channel "{id}" config?' },
  channelConfigured: { zh: '已配置', en: 'Configured' },
  channelRestartHint: { zh: '⚠ 渠道配置需重启网关生效:在 Mac 终端执行 openclaw-webui/scripts/config-tools.sh restart-gateway', en: 'Needs gateway restart: run openclaw-webui/scripts/config-tools.sh restart-gateway' },
  channelCustom: { zh: '自定义渠道', en: 'Custom channel' },
  channelCustomId: { zh: '渠道 ID(小写字母/数字/短横线)', en: 'Channel ID (lowercase/digits/dash)' },
  channelCustomJson: { zh: '渠道配置(JSON)', en: 'Channel config (JSON)' },
  channelCustomHint: { zh: '字段名参考 openclaw.json 文档对应渠道章节;启用一般写 "enabled": true', en: 'Field names follow the channel docs; typically include "enabled": true' },

  // 设置分区
  setSecGeneral: { zh: '通用', en: 'General' },
  setSecSession: { zh: '会话', en: 'Session' },
  setSecModels: { zh: '模型', en: 'Models' },
  setSecChannels: { zh: '渠道', en: 'Channels' },
  setSecComms: { zh: '通信', en: 'Comms' },
  setSecMcp: { zh: 'MCP', en: 'MCP' },
  setSecAgents: { zh: '代理', en: 'Agents' },
  setSecMemory: { zh: '记忆', en: 'Memory' },
  setSecSecurity: { zh: '安全', en: 'Security' },
  setSecInfra: { zh: '基础设施', en: 'Infra' },
  setSecDebug: { zh: '调试', en: 'Debug' },
  setSecConnection: { zh: '连接', en: 'Connection' },
  setSecAbout: { zh: '关于', en: 'About' },
  setSecAdvanced: { zh: '高级', en: 'Advanced' },
  setSecLogs: { zh: '日志', en: 'Logs' },
  setSecAutomation: { zh: '自动化', en: 'Automation' },
  setSecTools: { zh: '工具', en: 'Tools' },
  setSecLogging: { zh: '日志设置', en: 'Logging' },
  setSecHooks: { zh: '钩子', en: 'Hooks' },
  setSecGateway: { zh: '网关网络', en: 'Gateway' },
  setSecTts: { zh: '语音(TTS)', en: 'Voice' },
  setSecAgentEntries: { zh: '单代理', en: 'Per-Agent' },
  setSecCronConfig: { zh: 'Cron设置', en: 'Cron' },

  // 工具设置
  toolsTitle: { zh: '工具设置', en: 'Tools' },
  toolsHint: { zh: '控制代理可用的工具。profile 是预设配置档,allow/deny 是额外允许/禁止的工具。', en: 'Control agent tools. profile is a preset; allow/deny are extra allow/forbid lists.' },
  toolsProfile: { zh: '工具配置档', en: 'Tool profile' },
  toolsElevated: { zh: '提权(Exec)', en: 'Elevated (exec)' },
  toolsAllow: { zh: '额外允许(逗号分隔)', en: 'Extra allow (comma-sep)' },
  toolsDeny: { zh: '禁止(逗号分隔)', en: 'Forbid (comma-sep)' },

  // 日志设置
  loggingTitle: { zh: '日志设置', en: 'Logging' },
  loggingHint: { zh: '控制网关日志级别与输出。改动需重启网关生效。', en: 'Control gateway log level and output. Needs gateway restart.' },
  loggingLevel: { zh: '日志级别', en: 'Log level' },
  loggingStyle: { zh: '控制台格式', en: 'Console style' },
  loggingFile: { zh: '日志文件路径', en: 'Log file path' },
  loggingAudit: { zh: '审计日志', en: 'Audit log' },

  // 钩子设置
  hooksTitle: { zh: '钩子设置', en: 'Hooks' },
  hooksHint: { zh: '管理网关内部钩子(如 session-memory)和安全策略。', en: 'Manage gateway internal hooks (e.g. session-memory) and security policy.' },
  hooksInject: { zh: '允许提示注入', en: 'Allow prompt injection' },
  hooksAccess: { zh: '允许对话访问', en: 'Allow conversation access' },
  hooksTimeout: { zh: '超时(ms)', en: 'Timeout (ms)' },
  hooksInternal: { zh: '内部钩子', en: 'Internal hooks' },

  // 网关网络
  gatewayNetTitle: { zh: '网关网络', en: 'Gateway network' },
  gatewayNetHint: { zh: '控制网关监听地址与网络安全。', en: 'Control gateway bind address and network security.' },
  gatewayBind: { zh: '监听地址', en: 'Bind address' },
  gatewayTailscale: { zh: 'Tailscale', en: 'Tailscale' },
  gatewayTls: { zh: 'TLS', en: 'TLS' },
  gatewayMode: { zh: '网关模式', en: 'Gateway mode' },
  gatewayNetRestart: { zh: '⚠ 监听地址/TLS 改动需重启网关生效。', en: '⚠ Bind/TLS changes need gateway restart.' },

  // TTS 语音
  ttsTitle: { zh: '语音(TTS)设置', en: 'Voice (TTS)' },
  ttsHint: { zh: '配置文本转语音提供商和自动播报策略。支持第三方提供商。', en: 'Configure TTS providers and auto-speak policy. Third-party providers supported.' },
  ttsProvider: { zh: '当前提供商', en: 'Active provider' },
  ttsAuto: { zh: '自动播报', en: 'Auto speak' },
  ttsProviders: { zh: '已配置提供商', en: 'Configured providers' },
  ttsNone: { zh: '(无)', en: '(none)' },
  ttsNoKey: { zh: '未配置Key', en: 'No key' },
  ttsAddProvider: { zh: '添加提供商', en: 'Add provider' },

  // 单代理覆盖
  agentEntriesTitle: { zh: '单代理覆盖', en: 'Per-agent overrides' },
  agentEntriesHint: { zh: '为单个代理覆盖默认模型、工作区、思考等级等设置。', en: 'Override default model, workspace, thinking level per agent.' },
  agentsFastMode: { zh: '极速模式', en: 'Fast mode' },
  agentsFastModeDesc: {
    zh: '代理循环的默认极速模式策略("auto"/true/false)。单个代理条目可覆盖。',
    en: 'Default fast-mode policy for the agent loop ("auto", true, or false). Per-agent entries override it.',
  },

  // Cron 全局
  cronConfigTitle: { zh: 'Cron 全局设置', en: 'Cron global settings' },
  cronConfigHint: { zh: '定时任务的全局开关与失败告警。', en: 'Global cron toggle and failure alerts.' },
  cronConfigEnabled: { zh: '启用定时任务', en: 'Enable cron' },
  cronConfigRetention: { zh: 'Session 保留', en: 'Session retention' },
  cronConfigAlert: { zh: '失败告警', en: 'Failure alert' },
  cronConfigAlertEnabled: { zh: '启用告警', en: 'Enable alert' },
  cronConfigAlertMode: { zh: '告警方式', en: 'Alert mode' },
  cronConfigAlertAfter: { zh: '连续失败N次后', en: 'After N failures' },

  // 关于(详细)
  aboutUiVersion: { zh: '面板版本', en: 'UI version' },
  aboutGatewayVersion: { zh: '网关版本', en: 'Gateway version' },
  aboutProtocol: { zh: '协议', en: 'Protocol' },
  aboutRepo: { zh: '源码仓库', en: 'Source repo' },

  // 高级
  advancedTitle: { zh: '高级设置', en: 'Advanced' },
  advancedHint: { zh: '外观、语言等全局偏好。网关核心配置请编辑 openclaw.json。', en: 'Global preferences (appearance, language). Edit openclaw.json for gateway core config.' },
  advancedLang: { zh: '语言', en: 'Language' },
  advancedTheme: { zh: '外观', en: 'Appearance' },

  // 日志
  logsPause: { zh: '暂停', en: 'Pause' },
  logsHint: { zh: '从网关日志尾部读取,每 3 秒自动刷新。', en: 'Tails the gateway log, auto-refreshes every 3s.' },

  // 自动化
  automationTitle: { zh: '自动化(定时任务)', en: 'Automation (cron)' },
  automationHint: { zh: '管理网关定时任务(cron),定时向代理发送指令。', en: 'Manage gateway cron jobs that periodically prompt an agent.' },
  cronSchedule: { zh: '调度', en: 'Schedule' },

  // 通信
  commsTitle: { zh: '通信(TTS / 语音)', en: 'Comms (TTS / voice)' },
  commsTts: { zh: '语音合成', en: 'TTS' },
  commsProvider: { zh: '提供商', en: 'Provider' },
  commsAuto: { zh: '自动播报', en: 'Auto speak' },
  commsOn: { zh: '开', en: 'On' },
  commsOff: { zh: '关', en: 'Off' },
  commsConfigured: { zh: '已配置', en: 'Configured' },
  commsNotConfigured: { zh: '未配置', en: 'Not set' },
  commsHint: { zh: '语音相关设置为只读展示;修改请编辑 openclaw.json 的 messages.tts / talk 段。', en: 'Read-only. Edit messages.tts / talk in openclaw.json to change.' },
  commsHintLive: { zh: '开关与提供商切换即时生效(网关保存)。', en: 'Toggle and provider changes apply immediately on the gateway.' },

  // 设备配对码
  devicesSetupCodeBtn: { zh: '配对移动设备', en: 'Pair mobile' },
  devicesSetupCodeTitle: { zh: '移动设备配对', en: 'Pair mobile device' },
  devicesSetupCodeHint: { zh: '用 OpenClaw 手机 App 扫码,或复制配对码粘贴到 App 设置 → Gateway。配对码含一次性引导凭据,请勿外传。', en: 'Scan with the OpenClaw mobile app, or paste the code in App → Settings → Gateway. Contains a one-time bootstrap token — keep it private.' },
  devicesCopy: { zh: '复制配对码', en: 'Copy code' },
  devicesCopied: { zh: '已复制', en: 'Copied' },

  // 渠道登出
  channelLogout: { zh: '登出该渠道账号', en: 'Log out channel account' },
  channelLogoutConfirm: { zh: '确定登出渠道「{id}」的账号?登出后需重新登录才能继续收发消息。', en: 'Log out channel "{id}"? You will need to log in again.' },
  channelLoggedOut: { zh: '渠道「{id}」已登出', en: 'Channel "{id}" logged out' },

  // exec 审批 / 网关更新
  securityExecTitle: { zh: 'Exec 审批策略', en: 'Exec approval policy' },
  securityExecHint: { zh: '命令执行审批的当前策略(只读)。修改请编辑 exec-approvals 或用官方 CLI。', en: 'Current exec approval policy (read-only).' },
  updateConfirm: { zh: '确定检查并执行网关更新?更新成功后网关会自动重启(面板会短暂断线重连)。', en: 'Check and run the gateway update? It restarts the gateway on success (brief disconnect).' },
  updateRunning: { zh: '正在执行网关更新…', en: 'Running gateway update…' },
  updateDone: { zh: '更新流程已执行,网关可能正在重启,稍后自动重连', en: 'Update executed; gateway may be restarting, reconnecting shortly…' },
  infraUpdateBtn: { zh: '检查并更新网关', en: 'Check & update gateway' },
  infraUpdateHint: { zh: '调用网关自带的更新流程(update.run),成功后自动重启。', en: 'Runs the gateway update flow (update.run); auto-restarts on success.' },

  // MCP
  mcpTitle: { zh: 'MCP 服务器', en: 'MCP servers' },
  mcpEmpty: { zh: '还没有配置 MCP 服务器', en: 'No MCP servers configured' },
  mcpAdd: { zh: '新增服务器', en: 'Add server' },
  mcpName: { zh: '服务器名称', en: 'Server name' },
  mcpJson: { zh: '服务器配置(JSON)', en: 'Server config (JSON)' },
  mcpAddBtn: { zh: '添加 MCP 服务器', en: 'Add MCP server' },
  mcpHint: { zh: '配置立即热生效,无需重启网关。字段参考 OpenClaw 文档 MCP 章节(stdio 用 command/args,远程用 url)。', en: 'Applies hot, no restart needed. See OpenClaw MCP docs for fields (command/args for stdio, url for remote).' },
  mcpSaved: { zh: 'MCP「{name}」已保存,立即生效', en: 'MCP "{name}" saved, applies immediately' },
  mcpUpdated: { zh: 'MCP「{name}」已更新', en: 'MCP "{name}" updated' },
  mcpDeleted: { zh: 'MCP「{name}」已删除', en: 'MCP "{name}" removed' },
  mcpDeleteConfirm: { zh: '确定删除 MCP 服务器「{name}」?', en: 'Remove MCP server "{name}"?' },
  // MCP 增强
  mcpQuickTpl: { zh: '快速模板(点击填充):', en: 'Quick templates:' },
  mcpTransport: { zh: '传输方式', en: 'Transport' },
  mcpCommand: { zh: '命令', en: 'Command' },
  mcpArgs: { zh: '参数(逗号分隔)', en: 'Arguments (comma-sep)' },
  mcpUrl: { zh: 'URL', en: 'URL' },
  mcpHeaders: { zh: '请求头(每行 key=value)', en: 'Headers (key=value per line)' },
  mcpEnv: { zh: '环境变量(每行 key=value)', en: 'Environment (key=value per line)' },
  mcpTimeout: { zh: '超时(ms)', en: 'Timeout (ms)' },
  mcpEditing: { zh: '编辑「{name}」', en: 'Editing "{name}"' },
  mcpSaveEdit: { zh: '保存修改', en: 'Save changes' },
  mcpErrorCmdOrUrl: { zh: '请填写命令或 URL', en: 'Command or URL required' },
  edit: { zh: '编辑', en: 'Edit' },

  // 代理
  agentsTitle: { zh: 'AI 与代理', en: 'AI & agents' },
  agentsDefault: { zh: '默认', en: 'Default' },
  agentsModel: { zh: '模型', en: 'Model' },
  agentsThinking: { zh: '思考默认档', en: 'Thinking default' },
  agentsRuntime: { zh: '运行时', en: 'Runtime' },
  agentsWorkspace: { zh: '工作区', en: 'Workspace' },
  agentsHint: { zh: '代理列表为只读;修改配置请编辑 openclaw.json 的 agents 段。', en: 'Read-only. Edit the agents section in openclaw.json to change.' },
  agentsTabAgents: { zh: '代理', en: 'Agents' },
  agentsTabSkills: { zh: 'Skills', en: 'Skills' },
  agentsTabTools: { zh: '工具', en: 'Tools' },
  agentsTabSession: { zh: '会话', en: 'Sessions' },
  agentsSectionName: { zh: 'AGENTS', en: 'AGENTS' },
  agentsSectionDesc: { zh: 'Agent 配置、模型和身份', en: 'Agent config, models and identity' },
  agentsDefaultsTitle: { zh: 'Agent Defaults', en: 'Agent Defaults' },
  agentsDefaultsDesc: {
    zh: '所有代理继承的共享默认设置,除非在 agents.entries 中按条目覆盖。用默认值可保证行为一致,减少重复配置。',
    en: 'Shared defaults inherited by agents unless overridden per entry in agents.entries. Use defaults to enforce consistent baseline behavior.',
  },
  agentsCompaction: { zh: 'Compaction(上下文压缩)', en: 'Compaction' },
  agentsCompactionDesc: {
    zh: '上下文接近 token 上限时的压缩行为,含压缩策略与压缩前记忆冲刷。长会话需要在紧凑上下文窗口下稳定延续时使用。',
    en: 'Compaction behavior when context nears token limits, including strategy and pre-compaction memory flush.',
  },
  agentsCompactionEnabled: { zh: '启用压缩', en: 'Enable compaction' },
  agentsCompactionMode: { zh: '压缩模式', en: 'Compaction mode' },
  agentsCompactionKeepRecent: { zh: '保留最近 tokens', en: 'Keep recent tokens' },
  agentsCompactionRecentTurns: { zh: '保留最近轮数', en: 'Preserve recent turns' },
  agentsCompactionTimeout: { zh: '超时(秒)', en: 'Timeout (s)' },
  agentsMemoryFlush: { zh: '压缩前记忆冲刷', en: 'Pre-compaction memory flush' },
  agentsElevated: { zh: 'Elevated Default(提权默认)', en: 'Elevated Default' },
  agentsElevatedDesc: { zh: '代理执行提权操作(如宿主命令)时的默认审批策略。', en: 'Default elevation policy for agent actions on the host.' },
  agentsEmbedded: { zh: 'Embedded OpenClaw(内嵌加固)', en: 'Embedded OpenClaw' },
  agentsEmbeddedDesc: {
    zh: '内嵌 OpenClaw runner 的加固控制:工作区本地代理设置的可信与应用方式。',
    en: 'Embedded runner hardening: how workspace-local agent settings are trusted and applied.',
  },
  agentsProjectPolicy: { zh: '项目设置策略', en: 'Project settings policy' },
  agentsExecutionContract: { zh: '执行契约', en: 'Execution contract' },
  agentsFastOn: { zh: '开启', en: 'On' },
  agentsFastOff: { zh: '关闭', en: 'Off' },
  agentsFastAuto: { zh: '自动', en: 'Auto' },
  agentsHeartbeat: { zh: 'Heartbeat(心跳)', en: 'Heartbeat' },
  agentsHeartbeatDesc: { zh: '代理空闲心跳:定时唤醒执行自动化任务。', en: 'Idle heartbeat: periodically wake the agent for automation.' },
  agentsBadgeAutomation: { zh: 'automation', en: 'automation' },
  agentsBadgeModels: { zh: 'models', en: 'models' },
  agentsBadgeMedia: { zh: 'media', en: 'media' },
  agentsHeartbeatEvery: { zh: '间隔(如 30m / 1h)', en: 'Interval (e.g. 30m / 1h)' },
  agentsHeartbeatStart: { zh: '活跃开始 (HH:MM)', en: 'Active from (HH:MM)' },
  agentsHeartbeatEnd: { zh: '活跃结束 (HH:MM)', en: 'Active until (HH:MM)' },
  agentsHeartbeatPrompt: { zh: '心跳提示词', en: 'Heartbeat prompt' },
  agentsImageModel: { zh: 'Image Model(图像模型)', en: 'Image Model' },
  agentsImageModelDesc: { zh: '图像生成/处理使用的模型与回退列表。', en: 'Model and fallbacks for image generation/processing.' },
  agentsMediaModels: { zh: 'Media Models(媒体模型)', en: 'Media Models' },
  agentsMediaModelsDesc: { zh: '按媒体类型指定模型:图像 / 视频 / 音乐。', en: 'Per-media-type models: image / video / music.' },
  agentsModelRow: { zh: 'Model(主模型)', en: 'Model' },
  agentsModelRowDesc: { zh: '代理主模型,格式 "provider/model"。', en: 'Primary agent model as "provider/model".' },
  agentsModelPolicy: { zh: 'Model Policy(模型策略)', en: 'Model Policy' },
  agentsModelPolicyDesc: { zh: '限制代理可用的模型白名单。', en: 'Restrict which models the agent may use.' },
  agentsModelPolicyAllow: { zh: '允许的模型(JSON 数组)', en: 'Allowed models (JSON array)' },
  agentsUtilityModel: { zh: 'Utility Model(辅助模型)', en: 'Utility Model' },
  agentsUtilityModelDesc: { zh: '摘要/标题等轻量任务的辅助模型;留空禁用。', en: 'Lightweight model for summaries etc.; empty disables utility routing.' },
  agentsWorkspaceRow: { zh: 'Workspace(工作区)', en: 'Workspace' },
  agentsThinkingRow: { zh: 'Thinking Default(思考默认档)', en: 'Thinking Default' },
  agentsPrimary: { zh: '主模型', en: 'Primary' },
  agentsFallbacks: { zh: '回退模型(逗号分隔)', en: 'Fallbacks (comma separated)' },
  agentsSave: { zh: '保存', en: 'Save' },
  agentsSaved: { zh: '已保存,配置热生效', en: 'Saved — applied live' },
  agentsSaveFailed: { zh: '保存失败', en: 'Save failed' },
  agentsToolsTitle: { zh: '工具配置', en: 'Tools' },
  agentsToolsHint: { zh: '工具配置档来自 config.tools.profile;细粒度权限请编辑 openclaw.json 的 tools 段。', en: 'Tool profile comes from config.tools.profile; fine-grained permissions live in the tools section of openclaw.json.' },
  agentsSkillsHint: { zh: '已安装技能的启用/禁用;更多技能请到左侧「技能」页的市场安装。', en: 'Toggle installed skills. Install more from the marketplace on the Skills page.' },

  // 基础设施
  infraTitle: { zh: '基础设施', en: 'Infrastructure' },
  infraPort: { zh: '网关端口', en: 'Gateway port' },
  infraLan: { zh: '局域网地址', en: 'LAN address' },
  infraRuntime: { zh: '运行时', en: 'Runtime' },
  infraOs: { zh: '系统', en: 'OS' },
  infraPath: { zh: '数据目录', en: 'Data dir' },
  infraHint: { zh: '网关监听与运行环境概览(只读)。', en: 'Read-only overview of the gateway runtime.' },

  // 调试
  debugTitle: { zh: '调试控制台', en: 'Debug console' },
  debugHint: { zh: '手动调用任意网关 RPC 并查看原始返回。方法列表见协议文档,误操作可能影响配置,请谨慎。', en: 'Call any gateway RPC and inspect the raw response. Use with care.' },
  debugMethod: { zh: 'RPC 方法名', en: 'RPC method' },
  debugParams: { zh: '参数(JSON,可选)', en: 'Params (JSON, optional)' },
  debugSend: { zh: '发送请求', en: 'Send' },
  securityTitle: { zh: '安全', en: 'Security' },
  securityAuth: { zh: '网关认证', en: 'Gateway auth' },
  securityProfile: { zh: '工具配置档', en: 'Tool profile' },
  securityDeviceAuth: { zh: '设备配对', en: 'Device auth' },
  securityEnabled: { zh: '已启用', en: 'Enabled' },
  securityHint: { zh: '安全项为只读展示;如需修改请编辑 openclaw.json(改动前先备份)。', en: 'Read-only. Edit openclaw.json (with a backup first) to change.' },

  // 用量
  usageTitle: { zh: 'Token 用量', en: 'Token usage' },
  usageSessions: { zh: '{n} 个会话', en: '{n} sessions' },
  usageTotalTokens: { zh: '总 Tokens', en: 'Total tokens' },
  usageTotalCost: { zh: '总费用', en: 'Total cost' },
  usageInput: { zh: '输入', en: 'Input' },
  usageOutput: { zh: '输出', en: 'Output' },
  usageCacheRead: { zh: '缓存命中', en: 'Cache hit' },
  usageColModel: { zh: '模型', en: 'Model' },
  usageColInput: { zh: '输入', en: 'In' },
  usageColOutput: { zh: '输出', en: 'Out' },
  usageColCache: { zh: '缓存', en: 'Cache' },
  usageColSessions: { zh: '会话', en: 'Sess.' },
  usageColCost: { zh: '费用', en: 'Cost' },
  usageEmpty: { zh: '暂无用量记录', en: 'No usage recorded yet' },
  usageNote: { zh: '费用由网关按各模型单价(每百万 tokens)计算;单价可在 设置 → 模型管理 中配置。', en: 'Cost is computed by the gateway from each model\u2019s per-million pricing. Edit pricing in Settings → Models.' },
  usageHideTitle: { zh: '从列表隐藏此模型(本地)', en: 'Hide this model (local)' },
  usageHideNote: { zh: '✕ 为本地隐藏记录,可随时恢复;网关不提供历史删除。', en: '✕ hides rows locally (recoverable); the gateway keeps history.' },
  usageHiddenBtn: { zh: '已隐藏 {n} 个', en: '{n} hidden' },
  usageHiddenTitle: { zh: '已隐藏的模型记录', en: 'Hidden model records' },
  usageUnhide: { zh: '恢复显示', en: 'Show again' },

  // Token 配额倒计时
  quotaTitle: { zh: 'Token 配额倒计时', en: 'Token quota countdown' },
  quotaFieldName: { zh: '配额名称', en: 'Quota name' },
  quotaFieldScope: { zh: '适用范围', en: 'Scope' },
  quotaAllModels: { zh: '全部模型', en: 'All models' },
  quotaFieldWan: { zh: '总量(万 tokens)', en: 'Total (10k tokens)' },
  quotaAdd: { zh: '添加配额', en: 'Add quota' },
  quotaUsedSince: { zh: '建立后已消耗 {n} tokens', en: '{n} tokens used since created' },
  quotaHint: { zh: '配额为本地记录:建立时记住当时用量,之后实时倒扣显示剩余。如厂商重置了用量,删除重建即可。', en: 'Local-only: baseline is captured on creation and deducted live. Recreate if the provider resets usage.' },

  // Logo 与头像
  brandCardTitle: { zh: 'Logo 与头像', en: 'Logo & avatar' },
  brandAppLogo: { zh: '应用 Logo(侧边栏)', en: 'App logo (sidebar)' },
  brandAiAvatar: { zh: 'AI 头像(对话)', en: 'AI avatar (chat)' },
  brandUpload: { zh: '上传图片', en: 'Upload' },
  brandReset: { zh: '恢复默认', en: 'Reset' },
  brandHint: { zh: '输入 emoji 后回车,或上传图片(自动裁方缩至 128px)。仅保存在本浏览器,不上传服务器。', en: 'Type an emoji + Enter, or upload an image (auto-cropped to 128px). Stored in this browser only.' },

  // AI 记忆 / 梦境
  memoryTitle: { zh: 'AI 对我的记忆', en: 'What AI remembers' },
  memoryHint: { zh: 'AI 的长期记忆文件(只读)。想修改内容,直接在聊天里告诉它即可。', en: 'Read-only view of the AI\u2019s long-term memory files. Tell it in chat to change anything.' },
  memoryExpand: { zh: '查看', en: 'View' },
  memoryCollapse: { zh: '收起', en: 'Collapse' },
  memoryMainFile: { zh: '主记忆 (MEMORY.md)', en: 'Main memory (MEMORY.md)' },
  dreamTitle: { zh: '梦境日记', en: 'Dream diary' },
  dreamExpand: { zh: '查看', en: 'View' },
  dreamHintFound: { zh: 'AI 在空闲时自动整理记忆写下的日记(存于 {path})', en: 'Auto-written memory consolidation diary ({path})' },
  dreamHintEmpty: { zh: '还没有梦境记录', en: 'No dream entries yet' },
  dreamEntryCount: { zh: '共 {n} 篇', en: '{n} entries' },

  // 模型管理(设置页)
  modelsCardTitle: { zh: '模型管理', en: 'Models' },
  modelsAddTitle: { zh: '新增模型', en: 'Add model' },
  modelsAddBtn: { zh: '添加模型', en: 'Add model' },
  modelsDelete: { zh: '删除该提供商', en: 'Delete provider' },
  modelsEdit: { zh: '编辑模型与价格', en: 'Edit models & pricing' },
  modelsEditing: { zh: '编辑「{name}」', en: 'Editing "{name}"' },
  modelsDeleteModel: { zh: '从该提供商删除此模型', en: 'Remove this model' },
  modelsSave: { zh: '保存修改', en: 'Save changes' },
  modelsEditHint: { zh: '价格单位为每百万 Tokens;保存后立即生效。API Key 不会被读取或覆盖,可放心编辑。', en: 'Prices are per 1M tokens and apply immediately. Your API key is never read or overwritten.' },
  mpModelName: { zh: '显示名称', en: 'Display name' },
  mpContext: { zh: '上下文窗口', en: 'Context window' },
  mpMaxTokens: { zh: '最大输出', en: 'Max output' },
  modelsEmpty: { zh: '还没有自定义模型,用下面的表单添加', en: 'No custom models yet — add one below' },
  modelsHint: { zh: 'OpenAI 兼容接口适用于绝大多数服务;添加后立即生效,无需重启网关。', en: 'OpenAI-compatible works for most services. Changes apply immediately, no gateway restart needed.' },
  mpCostTitle: { zh: '价格(每百万 Tokens,可选)', en: 'Pricing (per 1M tokens, optional)' },
  mpCostInput: { zh: '输入(未命中缓存)', en: 'Input (cache miss)' },
  mpCostCacheRead: { zh: '输入(命中缓存)', en: 'Input (cached)' },
  mpCostOutput: { zh: '输出', en: 'Output' },
  mpCostHint: { zh: '填写后用量页才能按模型计费;币种与你填写的一致,网关只做乘法。', en: 'Required for cost metering. Currency-agnostic — the gateway only multiplies.' },

  // 配对引导
  pairingTitle: { zh: '设备需要配对', en: 'Device pairing required' },
  pairingBody: {
    zh: '这是一个新的浏览器身份,需要在网关主机上批准一次。请在该主机终端执行:',
    en: 'This is a new browser identity and needs one-time approval. On the gateway host, run:',
  },
  pairingNote: { zh: '批准后本页会自动重连。同一浏览器只需配对一次。', en: 'This page reconnects automatically after approval. Pairing is once per browser profile.' },

  // 认证失败
  authFailedTitle: { zh: '令牌无效', en: 'Invalid token' },
  authFailedBody: { zh: '网关拒绝了该令牌,请检查后重新输入。', en: 'The gateway rejected this token. Please check and re-enter it.' },
  identityFailedTitle: { zh: '设备身份初始化失败', en: 'Device identity failed to initialize' },
  identityFailedBody: {
    zh: '无法生成本机设备密钥(见浏览器控制台)。请确认使用最新版浏览器访问本页面,然后重试。',
    en: 'Could not generate the local device key (see browser console). Use an up-to-date browser and retry.',
  },

  // 协议错误码 → 人话
  errUnavailable: { zh: '网关正在启动中,稍后自动重试…', en: 'Gateway is starting up, retrying automatically…' },
  errRateLimited: { zh: '登录尝试过于频繁,已被网关临时锁定(约 10 分钟)。可等待解锁或重启网关后点「立即重试」。', en: 'Too many attempts — temporarily locked by the gateway (~10 min). Wait, restart the gateway, then hit Retry.' },
  errNotConnected: { zh: '尚未连接网关', en: 'Not connected to the gateway' },
  errTimeout: { zh: '请求超时,请稍后重试', en: 'Request timed out, please retry' },
  errUnknown: { zh: '发生未知错误', en: 'Unknown error' },
} as const;

export type StringKey = keyof typeof dict;

let currentLocale: Locale = detectLocale();
const listeners = new Set<() => void>();

function detectLocale(): Locale {
  try {
    const saved = localStorage.getItem(LOCALE_KEY);
    if (saved === 'zh' || saved === 'en') return saved;
  } catch { /* ignore */ }
  const nav = typeof navigator !== 'undefined' ? navigator.language : 'en';
  return nav?.toLowerCase().startsWith('zh') ? 'zh' : 'en';
}

export function getLocale(): Locale {
  return currentLocale;
}

export function setLocale(locale: Locale): void {
  currentLocale = locale;
  try { localStorage.setItem(LOCALE_KEY, locale); } catch { /* ignore */ }
  listeners.forEach(fn => fn());
}

export function onLocaleChange(fn: () => void): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

/** 取文案;支持 {placeholder} 插值。 */
export function t(key: StringKey, vars?: Record<string, string | number>): string {
  const entry: { zh: string; en: string } | undefined = dict[key];
  if (!entry) return String(key);
  let text: string = entry[currentLocale] ?? entry.en;
  if (vars) {
    for (const [k, v] of Object.entries(vars)) {
      text = text.replaceAll(`{${k}}`, String(v));
    }
  }
  return text;
}

/** 协议错误 → 本地化可读文案。 */
export function localizeGatewayError(err: { code?: string; message?: string; details?: { code?: string } } | null | undefined): string {
  if (!err) return t('errUnknown');
  const code = err.details?.code || err.code;
  switch (code) {
    case 'PAIRING_REQUIRED':
    case 'NOT_PAIRED':
      return t('pairingTitle');
    case 'AUTH_TOKEN_MISMATCH':
    case 'AUTH_UNAUTHORIZED':
    case 'AUTH_TOKEN_MISSING':
      return t('authFailedBody');
    case 'UNAVAILABLE':
      return t('errUnavailable');
    case 'AUTH_RATE_LIMITED':
      return t('errRateLimited');
    case 'CONTROL_UI_ORIGIN_NOT_ALLOWED':
      return currentLocale === 'zh'
        ? '浏览器来源未在网关白名单中:需在 openclaw.json 的 gateway.controlUi.allowedOrigins 添加本页面地址并重启网关。'
        : 'Browser origin is not whitelisted: add this page\u2019s origin to gateway.controlUi.allowedOrigins in openclaw.json and restart the gateway.';
    default:
      return err.message || t('errUnknown');
  }
}

/** 按当前语言格式化时间。 */
export function formatTime(ts: number | undefined): string {
  if (!ts) return '';
  return new Intl.DateTimeFormat(currentLocale === 'zh' ? 'zh-CN' : 'en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(ts));
}

/** 按当前语言格式化相对时间。 */
export function formatRelative(ts: number | undefined): string {
  if (!ts) return '';
  const diff = Date.now() - ts;
  const rtf = new Intl.RelativeTimeFormat(currentLocale === 'zh' ? 'zh-CN' : 'en-US', { numeric: 'auto' });
  if (diff < 60_000) return rtf.format(-Math.round(diff / 1000), 'second');
  if (diff < 3_600_000) return rtf.format(-Math.round(diff / 60_000), 'minute');
  if (diff < 86_400_000) return rtf.format(-Math.round(diff / 3_600_000), 'hour');
  return rtf.format(-Math.round(diff / 86_400_000), 'day');
}

/** 按当前语言格式化字节。 */
export function formatBytes(bytes: number | undefined): string {
  if (typeof bytes !== 'number' || !Number.isFinite(bytes)) return '—';
  const units = currentLocale === 'zh' ? ['B', 'KB', 'MB', 'GB', 'TB'] : ['B', 'KB', 'MB', 'GB', 'TB'];
  let v = bytes;
  let i = 0;
  while (v >= 1024 && i < units.length - 1) { v /= 1024; i++; }
  return `${v.toFixed(v >= 100 || i === 0 ? 0 : 1)} ${units[i]}`;
}

/** 按当前语言格式化时长。 */
export function formatDuration(ms: number | undefined): string {
  if (typeof ms !== 'number' || !Number.isFinite(ms) || ms < 0) return '—';
  const s = Math.floor(ms / 1000);
  const d = Math.floor(s / 86400);
  const h = Math.floor((s % 86400) / 3600);
  const m = Math.floor((s % 3600) / 60);
  if (d > 0) return currentLocale === 'zh' ? `${d} 天 ${h} 小时` : `${d}d ${h}h`;
  if (h > 0) return currentLocale === 'zh' ? `${h} 小时 ${m} 分` : `${h}h ${m}m`;
  if (m > 0) return currentLocale === 'zh' ? `${m} 分 ${s % 60} 秒` : `${m}m ${s % 60}s`;
  return currentLocale === 'zh' ? `${s} 秒` : `${s}s`;
}
