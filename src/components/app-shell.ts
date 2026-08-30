// 根组件:登录门 / 配对引导 / 认证失败 / 主壳(视图 + 底部 Tab 栏 + 断线黄条)
import { LitElement, html, nothing, type TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { store, type View } from '../state/store';
import { t, localizeGatewayError } from '../i18n/i18n';
import { icon, renderBrand } from '../icons';
import './chat-view';
import './sessions-view';
import './cron-view';
import './skills-view';
import './devices-view';
import './logs-view';
import './usage-view';
import './status-view';
import './settings-view';

@customElement('openclaw-app')
export class AppShell extends LitElement {
  @state() private urlInput = 'ws://127.0.0.1:18789';
  @state() private tokenInput = '';

  createRenderRoot() { return this; }

  connectedCallback(): void {
    super.connectedCallback();
    store.subscribe(() => this.requestUpdate());
    if (store.hasCreds()) void store.start();
  }

  private async handleLogin(): Promise<void> {
    store.saveCreds(this.urlInput.trim() || 'ws://127.0.0.1:18789', this.tokenInput.trim());
    this.tokenInput = '';
    await store.start();
  }

  /** 已配对设备免密登录(用 localStorage 里的 deviceToken 握手)。 */
  private async handleDeviceLogin(): Promise<void> {
    store.saveCreds(this.urlInput.trim() || 'ws://127.0.0.1:18789', '');
    await store.start();
  }

  private handleTab(v: View): void {
    store.setView(v);
  }

  render(): TemplateResult {
    // 0. 设备身份生成失败:无法签名 connect.challenge,必须提示(重连无意义)
    if (store.deviceIdentityFailed) {
      return html`
        <div class="app-shell">
          <div class="login-wrap">
            <div class="login-card glass-strong">
              <h2>${t('identityFailedTitle')}</h2>
              <p class="hint">${t('identityFailedBody')}</p>
              ${this.renderLoginForm()}
            </div>
          </div>
        </div>
      `;
    }

    // 1. 令牌无效:提示重新输入
    if (store.authFailed) {
      return html`
        <div class="app-shell">
          <div class="login-wrap">
            <div class="login-card glass-strong">
              <h2>${t('authFailedTitle')}</h2>
              <p class="hint">${t('authFailedBody')}</p>
              ${this.renderLoginForm()}
            </div>
          </div>
        </div>
      `;
    }

    // 2. 设备待配对:引导用户去网关主机批准
    if (store.pairingError) {
      return html`
        <div class="app-shell">
          <div class="login-wrap">
            <div class="login-card glass-strong pairing-card">
              <h2>${t('pairingTitle')}</h2>
              <p class="hint">${t('pairingBody')}</p>
              <pre><code>openclaw devices list
openclaw devices approve &lt;requestId&gt;</code></pre>
              <p class="hint">${t('pairingNote')}</p>
              <div class="actions">
                <button class="btn primary" @click=${() => store.retryNow()}>${t('retry')}</button>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    // 3. 无凭据:登录卡
    if (!store.hasCreds()) {
      const insecure = typeof crypto === 'undefined' || !crypto.subtle;
      return html`
        <div class="app-shell">
          <div class="login-wrap">
            <div class="login-card glass-strong">
              <h2>${t('loginTitle')}</h2>
              <p class="hint">${t('loginSubtitle')}</p>
              ${insecure ? html`<div class="notice warn">${t('loginNoSecureContext')}</div>` : ''}
              ${this.renderLoginForm()}
            </div>
          </div>
        </div>
      `;
    }

    // 4. 主壳
    return html`
      ${store.connState === 'disconnected' ? this.renderConnPill() : nothing}
      <div class="app-shell">
        <div class="view-body">
          ${store.view === 'chat' ? html`<chat-view></chat-view>` : nothing}
          ${store.view === 'sessions' ? html`<sessions-view></sessions-view>` : nothing}
          ${store.view === 'cron' ? html`<cron-view></cron-view>` : nothing}
          ${store.view === 'skills' ? html`<skills-view></skills-view>` : nothing}
          ${store.view === 'devices' ? html`<devices-view></devices-view>` : nothing}
          ${store.view === 'logs' ? html`<logs-view></logs-view>` : nothing}
          ${store.view === 'usage' ? html`<usage-view></usage-view>` : nothing}
          ${store.view === 'status' ? html`<status-view></status-view>` : nothing}
          ${store.view === 'settings' ? html`<settings-view></settings-view>` : nothing}
        </div>
        ${this.renderTabBar()}
      </div>
    `;
  }

  private renderLoginForm(): TemplateResult {
    return html`
      ${store.canDeviceLogin() ? html`
        <button class="btn primary" style="width:100%;margin-bottom:4px" @click=${() => void this.handleDeviceLogin()}>
          ${t('deviceQuickLogin')}
        </button>
        <div class="hint" style="text-align:center;margin:0 0 8px">${t('deviceQuickLoginHint')}</div>
        <div class="login-divider"><span>${t('deviceLoginOr')}</span></div>
      ` : nothing}
      <label>${t('settingsGatewayUrl')}</label>
      <input class="field" type="text" .value=${this.urlInput}
        @input=${(e: InputEvent) => { this.urlInput = (e.target as HTMLInputElement).value; }} />
      <label>${t('settingsToken')}</label>
      <input class="field" type="password" autocomplete="off" .value=${this.tokenInput}
        @keydown=${(e: KeyboardEvent) => { if (e.key === 'Enter') void this.handleLogin(); }}
        @input=${(e: InputEvent) => { this.tokenInput = (e.target as HTMLInputElement).value; }} />
      ${store.lastError && store.connState === 'disconnected'
        ? html`<div class="notice error">${localizeGatewayError(store.lastError)}</div>`
        : nothing}
      <div class="actions">
        <button class="btn ${store.canDeviceLogin() ? '' : 'primary'}" style="width:100%" ?disabled=${!this.tokenInput.trim()}
          @click=${() => void this.handleLogin()}>${t('settingsConnect')}</button>
      </div>
    `;
  }

  private renderConnPill(): TemplateResult {
    return html`
      <div class="conn-pill">
        <span>${t('connDisconnected')}</span>
        <button @click=${() => store.retryNow()}>${t('retry')}</button>
      </div>
    `;
  }

  private renderTabBar(): TemplateResult {
    const tabs: Array<{ id: View; key: Parameters<typeof t>[0]; ic: string }> = [
      { id: 'chat', key: 'navChat', ic: 'chat' },
      { id: 'sessions', key: 'navSessions', ic: 'sessions' },
      { id: 'cron', key: 'navCron', ic: 'clock' },
      { id: 'skills', key: 'navSkills', ic: 'sparkles' },
      { id: 'devices', key: 'navDevices', ic: 'device' },
      { id: 'logs', key: 'navLogs', ic: 'logs' },
      { id: 'usage', key: 'navUsage', ic: 'coin' },
      { id: 'status', key: 'navStatus', ic: 'status' },
      { id: 'settings', key: 'navSettings', ic: 'settings' },
    ];
    return html`
      <div class="tab-bar tab-bar-scroll">
        <div class="side-brand">
          ${renderBrand(store.branding.appLogo, '🦞', 'side-logo')}
          <div class="side-name">OpenClaw</div>
          <div class="side-sub">${t('appName')}</div>
        </div>
        ${tabs.map(tab => html`
          <button class="tab-btn ${store.view === tab.id ? 'active' : ''}" @click=${() => this.handleTab(tab.id)}>
            ${icon(tab.ic)}<span class="tab-label">${t(tab.key)}</span>
          </button>
        `)}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'openclaw-app': AppShell;
  }
}
