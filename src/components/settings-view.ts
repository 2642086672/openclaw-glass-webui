// 设置视图:语言切换(顶部)+ 网关连接 + 外观说明 + 关于
import { LitElement, html, nothing } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { store } from '../state/store';
import { t, getLocale, setLocale } from '../i18n/i18n';

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

  /** 渠道卡。 */
  private renderChannelsCard() {
    const rows = store.channelRows();
    return html`
      <div class="card glass">
        <h3>${t('channelsTitle')}</h3>
        ${rows.length ? rows.map(c => html`
          <div class="row">
            <span class="k">${c.label}</span>
            <span class="v"><span class="badge ${c.state === '已连接' ? 'active' : 'dim'}">${c.state}</span></span>
          </div>
        `) : html`<div class="hint">${t('channelsEmpty')}</div>`}
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
    return html`
      <div class="settings-scroll">
        <div class="card glass">
          <h3>${t('settingsLanguage')}</h3>
          <div class="seg-control">
            <button class=${getLocale() === 'zh' ? 'active' : ''} @click=${() => this.switchLocale('zh')}>中文</button>
            <button class=${getLocale() === 'en' ? 'active' : ''} @click=${() => this.switchLocale('en')}>English</button>
          </div>
        </div>

        ${this.renderSessionCard()}
        ${this.renderChannelsCard()}
        ${this.renderSecurityCard()}
        ${this.renderModelsCard()}

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

        <div class="card glass">
          <h3>${t('settingsAppearance')}</h3>
          <div class="hint">${t('settingsThemeFollow')}</div>
        </div>

        <div class="card glass">
          <h3>${t('settingsAbout')}</h3>
          <p class="about-text">${t('settingsAboutText')}</p>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'settings-view': SettingsView;
  }
}
