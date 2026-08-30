// 日志视图:网关文件日志尾随(3s 轮询 + cursor 增量),搜索过滤
import { LitElement, html, nothing } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { store } from '../state/store';
import { t } from '../i18n/i18n';

@customElement('logs-view')
export class LogsView extends LitElement {
  @state() private filter = '';
  @state() private stickBottom = true;

  createRenderRoot() { return this; }

  connectedCallback(): void {
    super.connectedCallback();
    store.subscribe(() => this.requestUpdate());
  }

  protected updated(): void {
    if (this.stickBottom) {
      const scroller = this.renderRoot.querySelector('.logs-console');
      if (scroller) scroller.scrollTop = scroller.scrollHeight;
    }
  }

  private onScroll(e: Event): void {
    const el = e.target as HTMLElement;
    this.stickBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 60;
  }

  private renderLine(line: { time: string; message: string }) {
    const q = this.filter.trim().toLowerCase();
    if (q && !line.message.toLowerCase().includes(q)) return nothing;
    const isError = /error|fail|⚠/i.test(line.message);
    const isWarn = /warn|degrad/i.test(line.message);
    return html`<div class="log-line ${isError ? 'err' : isWarn ? 'warn' : ''}">
      <span class="log-time">${line.time}</span><span class="log-msg">${line.message}</span>
    </div>`;
  }

  render() {
    const lines = store.logLines;
    return html`
      <div class="sessions-toolbar glass">
        <span class="count">${t('logsTitle')} · ${lines.length}</span>
        <div class="logs-toolbar-btns">
          <button class="toggle-btn" @click=${() => { this.stickBottom = true; }}>⬇ ${t('logsFollow')}</button>
          <button class="toggle-btn" @click=${() => store.clearLogs()}>${t('logsClear')}</button>
        </div>
      </div>
      <div class="skills-search">
        <input class="field" type="search" placeholder=${t('logsSearch')} .value=${this.filter}
          @input=${(e: InputEvent) => { this.filter = (e.target as HTMLInputElement).value; }} />
      </div>
      <div class="logs-console glass" @scroll=${this.onScroll}>
        ${!lines.length ? html`<div class="empty-state">${t('loading')}</div>` : ''}
        ${lines.map(l => this.renderLine(l))}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'logs-view': LogsView;
  }
}
