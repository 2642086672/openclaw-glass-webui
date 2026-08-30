// 设备视图:待配对请求(批准/拒绝)+ 已配对设备 + 节点 + 在线状态 + 渠道
import { LitElement, html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { store } from '../state/store';
import { t, formatRelative } from '../i18n/i18n';
import { icon } from '../icons';

@customElement('devices-view')
export class DevicesView extends LitElement {
  createRenderRoot() { return this; }

  connectedCallback(): void {
    super.connectedCallback();
    store.subscribe(() => this.requestUpdate());
    void store.refreshDevices();
  }

  render() {
    return html`
      <div class="sessions-toolbar glass">
        <span class="count">${t('devicesTitle')}</span>
        <button class="toggle-btn" @click=${() => void store.refreshDevices()}>${icon('refresh')} ${t('retry')}</button>
      </div>
      <div class="session-list">
        ${this.renderPending()}
        ${this.renderPaired()}
        ${this.renderNodes()}
        ${this.renderPresence()}
      </div>
    `;
  }

  private renderPending() {
    const pending = store.devicesPending;
    if (!pending.length) return nothing;
    return html`
      <div class="session-section-title">${t('devicesPending')} (${pending.length})</div>
      ${pending.map(d => html`
        <div class="device-item glass">
          <div class="s-avatar">🔑</div>
          <div class="s-main">
            <div class="s-title">${d.platform ?? 'device'} · ${d.clientId ?? ''}</div>
            <div class="skill-desc">${t('devicesPendingHint')}</div>
          </div>
          <div class="s-actions" style="opacity:1">
            <button class="btn primary" style="padding:6px 14px" @click=${() => void store.approveDevice(d.deviceId)}>${t('deviceApprove')}</button>
            <button class="btn danger" style="padding:6px 14px" @click=${() => void store.rejectDevice(d.deviceId)}>${t('deviceReject')}</button>
          </div>
        </div>
      `)}
    `;
  }

  private renderPaired() {
    const paired = store.devicesPaired;
    if (!paired.length) return nothing;
    return html`
      <div class="session-section-title">${t('devicesPaired')} (${paired.length})</div>
      ${paired.map(d => html`
        <div class="device-item glass">
          <div class="s-avatar">${d.platform === 'web' ? '🌐' : d.platform === 'ios' ? '📱' : '💻'}</div>
          <div class="s-main">
            <div class="s-title">
              ${d.platform ?? 'device'} · ${d.role ?? 'operator'}
              ${d.lastSeenReason === 'connect' ? html`<span class="badge active">${t('deviceOnline')}</span>` : nothing}
            </div>
            <div class="skill-desc">${d.clientId ?? ''} · ${d.lastSeenAtMs ? formatRelative(d.lastSeenAtMs) : ''} · ${(d.scopes ?? []).join(', ')}</div>
          </div>
        </div>
      `)}
    `;
  }

  private renderNodes() {
    const nodes = store.nodes;
    if (!nodes.length) return nothing;
    return html`
      <div class="session-section-title">${t('devicesNodes')} (${nodes.length})</div>
      ${nodes.map(n => html`
        <div class="device-item glass">
          <div class="s-avatar">${n.connected ? '🟢' : '⚪'}</div>
          <div class="s-main">
            <div class="s-title">
              ${n.displayName ?? n.nodeId.slice(0, 10)}
              ${n.connected ? html`<span class="badge active">${t('deviceConnected')}</span>` : html`<span class="badge dim">${t('deviceOffline')}</span>`}
            </div>
            <div class="skill-desc">${n.platform ?? ''} · ${n.remoteIp ?? ''} ${n.lastSeenAtMs ? '· ' + formatRelative(n.lastSeenAtMs) : ''}</div>
          </div>
        </div>
      `)}
    `;
  }

  private renderPresence() {
    const list = store.presenceList;
    if (!list.length) return nothing;
    return html`
      <div class="session-section-title">${t('devicesPresence')}</div>
      ${list.map(p => html`
        <div class="device-item glass">
          <div class="s-avatar">${p.mode === 'gateway' ? '🏠' : '🔗'}</div>
          <div class="s-main">
            <div class="s-title">${p.host ?? '—'}${p.mode ? html`<span class="badge dim">${p.mode}</span>` : nothing}</div>
            <div class="skill-desc">${p.text ?? `${p.ip ?? ''} · ${p.platform ?? ''}`}</div>
          </div>
        </div>
      `)}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'devices-view': DevicesView;
  }
}
