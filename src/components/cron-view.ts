// 定时任务视图:任务列表 + 立即运行/启停/删除 + 最近运行状态
import { LitElement, html, nothing, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { store } from '../state/store';
import { t, formatRelative } from '../i18n/i18n';
import { icon } from '../icons';
import type { CronJob } from '../gateway/types';

@customElement('cron-view')
export class CronView extends LitElement {
  createRenderRoot() { return this; }

  connectedCallback(): void {
    super.connectedCallback();
    store.subscribe(() => this.requestUpdate());
    void store.refreshCron();
  }

  private scheduleText(job: CronJob): string {
    const s = job.schedule;
    if (s.kind === 'every' && typeof s.everyMs === 'number') {
      const min = Math.round(s.everyMs / 60_000);
      const locale = document.documentElement.lang || 'zh';
      return locale.startsWith('zh') ? `每 ${min} 分钟` : `every ${min} min`;
    }
    if (typeof s.cron === 'string') return `cron: ${s.cron}`;
    return s.kind ?? '—';
  }

  private statusBadge(job: CronJob): TemplateResult {
    if (!job.enabled) return html`<span class="badge off">${t('cronDisabled')}</span>`;
    if (job.lastRunStatus === 'error') return html`<span class="badge err">⚠ ${t('cronLastError')}</span>`;
    if (job.lastRunStatus === 'ok' || job.lastRunStatus === 'success') return html`<span class="badge active">✓</span>`;
    return html``;
  }

  private async removeJob(job: CronJob): Promise<void> {
    if (!window.confirm(t('cronDeleteConfirm', { name: job.name ?? job.id.slice(0, 8) }))) return;
    await store.cronDelete(job.id);
  }

  render() {
    const jobs = store.cronJobs;
    return html`
      <div class="sessions-toolbar glass">
        <span class="count">${t('cronTitle')} · ${jobs.length}</span>
        <button class="toggle-btn" @click=${() => void store.refreshCron()}>${icon('refresh')} ${t('retry')}</button>
      </div>
      <div class="session-list">
        ${!jobs.length ? html`<div class="empty-state">${t('cronEmpty')}</div>` : ''}
        ${jobs.map(j => html`
          <div class="cron-item glass">
            <div class="cron-head">
              <div class="cron-name">${j.name || j.id.slice(0, 8)} ${this.statusBadge(j)}</div>
              <div class="s-actions">
                <button class="icon-btn" title=${t('cronRunNow')} @click=${() => void store.cronRunNow(j.id)}>${icon('send')}</button>
                <button class="icon-btn" title=${j.enabled ? t('cronDisable') : t('cronEnable')}
                  @click=${() => void store.cronToggle(j.id, !j.enabled)}>${j.enabled ? '⏸' : '▶'}</button>
                <button class="icon-btn" title=${t('delete')} @click=${() => void this.removeJob(j)}>🗑</button>
              </div>
            </div>
            ${j.description ? html`<div class="cron-desc">${j.description}</div>` : nothing}
            <div class="cron-meta">
              <span>⏱ ${this.scheduleText(j)}</span>
              ${j.nextRunAtMs ? html`<span>${t('cronNext')}: ${formatRelative(j.nextRunAtMs)}</span>` : nothing}
              ${j.lastRunAtMs ? html`<span>${t('cronLast')}: ${formatRelative(j.lastRunAtMs)}</span>` : nothing}
              ${j.sessionTarget === 'isolated' ? html`<span>${t('cronIsolated')}</span>` : nothing}
            </div>
          </div>
        `)}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cron-view': CronView;
  }
}
