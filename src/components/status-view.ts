// 状态视图:网关主机状态卡(CPU/内存/磁盘),10s 自动刷新
import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { store } from '../state/store';
import { t, formatBytes, formatDuration } from '../i18n/i18n';
import { icon } from '../icons';

@customElement('status-view')
export class StatusView extends LitElement {
  createRenderRoot() { return this; }

  connectedCallback(): void {
    super.connectedCallback();
    store.subscribe(() => this.requestUpdate());
    void store.refreshSystemInfo();
    void store.refreshModels();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
  }

  private loadPct(info: NonNullable<typeof store.systemInfo>): number {
    if (!info.loadAverage?.length || !info.cpuCount) return 0;
    return Math.min(100, (info.loadAverage[0] / info.cpuCount) * 100);
  }

  private memPct(info: NonNullable<typeof store.systemInfo>): number {
    if (!info.memoryTotalBytes) return 0;
    const used = info.memoryTotalBytes - (info.memoryFreeBytes ?? 0);
    return Math.max(0, Math.min(100, (used / info.memoryTotalBytes) * 100));
  }

  private diskPct(info: NonNullable<typeof store.systemInfo>): number {
    if (!info.diskTotalBytes) return 0;
    const used = info.diskTotalBytes - (info.diskAvailableBytes ?? 0);
    return Math.max(0, Math.min(100, (used / info.diskTotalBytes) * 100));
  }

  private meterClass(pct: number): string {
    if (pct >= 90) return 'meter danger';
    if (pct >= 70) return 'meter warn';
    return 'meter';
  }

  render() {
    const info = store.systemInfo;
    return html`
      <div class="settings-scroll">
        ${info ? this.renderCards(info) : html`<div class="empty-state">${t('loading')}</div>`}
        <div class="refresh-note">${icon('refresh')} ${t('statusRefreshEvery')}</div>
      </div>
    `;
  }

  private renderCards(info: NonNullable<typeof store.systemInfo>): ReturnType<typeof html> {
    const load = this.loadPct(info);
    const mem = this.memPct(info);
    const disk = this.diskPct(info);
    const loads = info.loadAverage?.length
      ? info.loadAverage.slice(0, 3).map(v => v.toFixed(2)).join(' / ')
      : '—';
    const memUsed = (info.memoryTotalBytes ?? 0) - (info.memoryFreeBytes ?? 0);
    const diskUsed = (info.diskTotalBytes ?? 0) - (info.diskAvailableBytes ?? 0);
    return html`
      <div class="card glass">
        <h3>${t('statusTitle')}</h3>
        <div class="row"><span class="k">${t('statusMachine')}</span><span class="v">${info.machineName ?? '—'} · ${info.arch ?? ''}</span></div>
        <div class="row"><span class="k">${t('statusOS')}</span><span class="v">${info.osLabel ?? info.platform ?? '—'}</span></div>
        <div class="row"><span class="k">${t('statusGateway')}</span><span class="v">${store.client.snapshot?.server?.version ?? '—'}</span></div>
        <div class="row"><span class="k">${t('statusUptime')}</span><span class="v">${formatDuration(info.uptimeMs)}</span></div>
        <div class="row"><span class="k">${t('statusNode')}</span><span class="v">${info.nodeVersion ?? '—'}</span></div>
        <div class="row"><span class="k">${t('statusLan')}</span><span class="v">${info.lanAddress ? `${info.lanAddress}:${info.port ?? ''}` : '—'}</span></div>
      </div>

      <div class="card glass">
        <h3>${t('statusCPU')}</h3>
        <div class="row"><span class="k">${t('statusLoad')}</span><span class="v">${loads}</span></div>
        <div class="meter ${this.meterClass(load)}" style="width:100%"><span style="width:${load.toFixed(1)}%"></span></div>
        <div class="row"><span class="k">${info.cpuModel ?? 'CPU'}</span><span class="v pct">${load.toFixed(0)}%</span></div>
        <div class="row"><span class="k">Cores</span><span class="v">${info.cpuCount ?? '—'}</span></div>
      </div>

      <div class="card glass">
        <h3>${t('statusMemory')}</h3>
        <div class="meter ${this.meterClass(mem)}" style="width:100%"><span style="width:${mem.toFixed(1)}%"></span></div>
        <div class="row"><span class="k">${t('statusUsedTotal')}</span><span class="v">${formatBytes(memUsed)} / ${formatBytes(info.memoryTotalBytes)}</span></div>
      </div>

      <div class="card glass">
        <h3>${t('statusDisk')}</h3>
        <div class="meter ${this.meterClass(disk)}" style="width:100%"><span style="width:${disk.toFixed(1)}%"></span></div>
        <div class="row"><span class="k">${t('statusUsedTotal')}</span><span class="v">${formatBytes(diskUsed)} / ${formatBytes(info.diskTotalBytes)}</span></div>
        <div class="row"><span class="k">${t('statusPath')}</span><span class="v">${info.diskPath ?? '—'}</span></div>
      </div>

      ${store.models.length ? html`
      <div class="card glass">
        <h3>${t('statusModels')} (${store.models.length})</h3>
        ${store.models.map(m => html`
          <div class="row">
            <span class="k">${m.provider ?? '—'} / ${m.id}</span>
            <span class="v">${m.name ?? ''}${m.contextWindow ? ` · ${Math.round(m.contextWindow / 1024)}K` : ''}</span>
          </div>
        `)}
      </div>` : ''}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'status-view': StatusView;
  }
}
