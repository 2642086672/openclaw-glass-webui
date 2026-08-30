// 设置视图:语言切换(顶部)+ 网关连接 + 外观说明 + 关于
import { LitElement, html, nothing } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { store } from '../state/store';
import { t, getLocale, setLocale } from '../i18n/i18n';
import { renderBrand, fileToAvatarDataUrl } from '../icons';

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

type SetSection = 'general' | 'session' | 'models' | 'channels' | 'memory' | 'security' | 'connection';

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
  // 设置二级菜单当前分区
  @state() private section: SetSection = 'general';

  createRenderRoot() { return this; }

  connectedCallback(): void {
    super.connectedCallback();
    store.subscribe(() => this.requestUpdate());
    this.urlInput = store.getGatewayUrl();
    this.tokenInput = store.getToken();
    void store.refreshConfigProviders();
    void store.refreshDevices();
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
    const thinks: Array<{ id: string; label: string }> = [
      { id: 'off', label: '关' },
      { id: 'minimal', label: '极简' },
      { id: 'low', label: '低' },
      { id: 'medium', label: '中' },
      { id: 'high', label: '高' },
    ];
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
    return html`
      <div class="card glass">
        <h3>${t('securityTitle')}</h3>
        <div class="row"><span class="k">${t('securityAuth')}</span><span class="v"><span class="badge active">${(sec.authMode ?? '—').toUpperCase()}</span></span></div>
        <div class="row"><span class="k">${t('securityProfile')}</span><span class="v">${sec.toolProfile ?? '—'}</span></div>
        <div class="row"><span class="k">${t('securityDeviceAuth')}</span><span class="v"><span class="badge active">${t('securityEnabled')}</span></span></div>
        <div class="hint">${t('securityHint')}</div>
      </div>
    `;
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
      { id: 'memory', labelKey: 'setSecMemory' },
      { id: 'security', labelKey: 'setSecSecurity' },
      { id: 'connection', labelKey: 'setSecConnection' },
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
        ${this.section === 'memory' ? html`${this.renderMemoryCard()}${this.renderDreamCard()}` : nothing}
        ${this.section === 'security' ? this.renderSecurityCard() : nothing}
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
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'settings-view': SettingsView;
  }
}
