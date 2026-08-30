// 定时任务视图:列表 + 新建/编辑任务 + 立即运行/启停/删除
import { LitElement, html, nothing, type TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { store } from '../state/store';
import { t, formatRelative } from '../i18n/i18n';
import { icon } from '../icons';
import type { CronJob } from '../gateway/types';

interface JobForm {
  id: string; // '' = 新建
  name: string;
  description: string;
  kind: 'every' | 'daily' | 'cron';
  everyMinutes: string;
  dailyTime: string;
  cronExpr: string;
  message: string;
}

@customElement('cron-view')
export class CronView extends LitElement {
  @state() private form: JobForm | null = null;
  @state() private busy = false;
  @state() private message: { ok: boolean; text: string } | null = null;

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
      return `每 ${min} 分钟`;
    }
    if (typeof s.expr === 'string') return `cron: ${s.expr}`;
    return s.kind ?? '—';
  }

  private statusBadge(job: CronJob): TemplateResult {
    if (!job.enabled) return html`<span class="badge off">${t('cronDisabled')}</span>`;
    if (job.lastRunStatus === 'error') return html`<span class="badge err">⚠ ${t('cronLastError')}</span>`;
    if (job.lastRunStatus === 'ok' || job.lastRunStatus === 'success') return html`<span class="badge active">✓</span>`;
    return html``;
  }

  private startCreate(): void {
    this.form = { id: '', name: '', description: '', kind: 'every', everyMinutes: '30', dailyTime: '09:00', cronExpr: '0 9 * * *', message: '' };
    this.message = null;
  }

  private startEdit(j: CronJob): void {
    const s = j.schedule;
    const kind: JobForm['kind'] = s.kind === 'every' ? 'every' : typeof s.expr === 'string' && /^[\d*]+\s+[\d*]+\s+\*\s+\*\s+\*$/.test(s.expr) ? 'daily' : 'cron';
    this.form = {
      id: j.id,
      name: j.name ?? '',
      description: j.description ?? '',
      kind,
      everyMinutes: s.kind === 'every' && typeof s.everyMs === 'number' ? String(Math.round(s.everyMs / 60_000)) : '30',
      dailyTime: kind === 'daily' && typeof s.expr === 'string' ? s.expr.split(/\s+/).slice(1).join(':').replace(/^(\d+):(\d+)$/, (_m, hh, mm) => `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}`) : '09:00',
      cronExpr: typeof s.expr === 'string' ? s.expr : '0 9 * * *',
      message: j.payload?.message ?? '',
    };
    this.message = null;
  }

  private async submit(): Promise<void> {
    if (!this.form || this.busy) return;
    const f = this.form;
    if (!f.name.trim() || !f.message.trim()) return;
    this.busy = true;
    this.requestUpdate();
    const payload = {
      name: f.name.trim(),
      description: f.description.trim(),
      kind: f.kind,
      everyMinutes: Number(f.everyMinutes) || 30,
      dailyTime: f.dailyTime,
      cronExpr: f.cronExpr.trim(),
      message: f.message.trim(),
      enabled: true,
    };
    const res = f.id
      ? await store.cronUpdateJob(f.id, payload)
      : await store.cronCreate(payload);
    this.busy = false;
    this.message = res.ok
      ? { ok: true, text: f.id ? t('cronSaved') : t('cronCreated') }
      : { ok: false, text: res.error ?? 'error' };
    if (res.ok) this.form = null;
    this.requestUpdate();
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
        <div class="logs-toolbar-btns">
          <button class="toggle-btn" @click=${() => this.startCreate()}>+ ${t('cronNew')}</button>
          <button class="toggle-btn" @click=${() => void store.refreshCron()}>${icon('refresh')}</button>
        </div>
      </div>

      <div class="session-list">
        ${this.form ? this.renderForm() : nothing}
        ${this.message ? html`<div class="notice ${this.message.ok ? 'ok' : 'error'}" style="margin:6px 2px">${this.message.text}</div>` : nothing}
        ${!jobs.length && !this.form ? html`<div class="empty-state">${t('cronEmpty')}</div>` : ''}
        ${jobs.map(j => j.id === this.form?.id ? nothing : html`
          <div class="cron-item glass">
            <div class="cron-head">
              <div class="cron-name">${j.name || j.id.slice(0, 8)} ${this.statusBadge(j)}</div>
              <div class="s-actions">
                <button class="icon-btn" title=${t('cronEdit')} @click=${() => this.startEdit(j)}>✏️</button>
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
              <span>${t('cronIsolated')}</span>
            </div>
          </div>
        `)}
      </div>
    `;
  }

  private renderForm(): TemplateResult {
    const f = this.form!;
    const valid = f.name.trim() && f.message.trim();
    return html`
      <div class="cron-form glass">
        <div class="mp-name" style="margin-bottom:8px">${f.id ? t('cronEditing', { name: f.name }) : t('cronNew')}</div>
        <div class="mp-grid">
          <div>
            <label class="hint" style="margin:4px 0 4px">${t('cronFieldName')}</label>
            <input class="field" .value=${f.name} @input=${(e: InputEvent) => { this.form = { ...f, name: (e.target as HTMLInputElement).value }; }} />
          </div>
          <div>
            <label class="hint" style="margin:4px 0 4px">${t('cronFieldKind')}</label>
            <div class="seg-control">
              <button class=${f.kind === 'every' ? 'active' : ''} @click=${() => { this.form = { ...f, kind: 'every' }; }}>${t('cronKindEvery')}</button>
              <button class=${f.kind === 'daily' ? 'active' : ''} @click=${() => { this.form = { ...f, kind: 'daily' }; }}>${t('cronKindDaily')}</button>
              <button class=${f.kind === 'cron' ? 'active' : ''} @click=${() => { this.form = { ...f, kind: 'cron' }; }}>Cron</button>
            </div>
          </div>
          ${f.kind === 'every' ? html`
            <div>
              <label class="hint" style="margin:4px 0 4px">${t('cronEveryMinutes')}</label>
              <input class="field" type="number" min="1" .value=${f.everyMinutes} @input=${(e: InputEvent) => { this.form = { ...f, everyMinutes: (e.target as HTMLInputElement).value }; }} />
            </div>` : nothing}
          ${f.kind === 'daily' ? html`
            <div>
              <label class="hint" style="margin:4px 0 4px">${t('cronDailyTime')}</label>
              <input class="field" type="time" .value=${f.dailyTime} @input=${(e: InputEvent) => { this.form = { ...f, dailyTime: (e.target as HTMLInputElement).value }; }} />
            </div>` : nothing}
          ${f.kind === 'cron' ? html`
            <div>
              <label class="hint" style="margin:4px 0 4px">${t('cronCronExpr')}</label>
              <input class="field" placeholder="30 9 * * *" .value=${f.cronExpr} @input=${(e: InputEvent) => { this.form = { ...f, cronExpr: (e.target as HTMLInputElement).value }; }} />
            </div>` : nothing}
        </div>
        <label class="hint" style="margin:10px 0 4px">${t('cronFieldDesc')}</label>
        <input class="field" .value=${f.description} @input=${(e: InputEvent) => { this.form = { ...f, description: (e.target as HTMLInputElement).value }; }} />
        <label class="hint" style="margin:10px 0 4px">${t('cronFieldMessage')}</label>
        <textarea class="field" rows="3" placeholder="${t('cronMessageHint')}" .value=${f.message}
          @input=${(e: InputEvent) => { this.form = { ...f, message: (e.target as HTMLTextAreaElement).value }; }}></textarea>
        <div class="actions">
          <button class="btn primary" ?disabled=${!valid || this.busy} @click=${() => void this.submit()}>
            ${this.busy ? t('loading') : t('save')}</button>
          <button class="btn" ?disabled=${this.busy} @click=${() => { this.form = null; this.requestUpdate(); }}>${t('cancel')}</button>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cron-view': CronView;
  }
}
