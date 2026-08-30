// 聊天视图:消息流 + 流式渲染 + 工具活动 + 输入区
import { LitElement, html, nothing } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { store } from '../state/store';
import { t } from '../i18n/i18n';
import { renderMarkdown, toVisibleItems } from '../markdown';
import { icon, renderBrand } from '../icons';

@customElement('chat-view')
export class ChatView extends LitElement {
  @state() private autoScroll = true;

  createRenderRoot() { return this; }

  connectedCallback(): void {
    super.connectedCallback();
    store.subscribe(() => this.requestUpdate());
    if (!store.models.length) void store.refreshModels();
  }

  private handleModelChange(e: Event): void {
    const model = (e.target as HTMLSelectElement).value;
    if (model) void store.setSessionModel(model);
  }

  private sessionTitle(): string {
    const s = store.sessions.find(x => x.key === store.currentSessionKey);
    return s?.label || s?.displayName || s?.key?.split(':').pop()?.slice(0, 8) || t('chatNewSession');
  }

  private onScroll(e: Event): void {
    const el = e.target as HTMLElement;
    this.autoScroll = el.scrollHeight - el.scrollTop - el.clientHeight < 80;
  }

  private updatedForScroll(): void {
    const scroller = this.renderRoot.querySelector('.chat-scroll');
    if (scroller && this.autoScroll) scroller.scrollTop = scroller.scrollHeight;
  }

  protected updated(): void {
    this.updatedForScroll();
  }

  private async handleSend(): Promise<void> {
    const textarea = this.renderRoot.querySelector('textarea');
    const text = (textarea as HTMLTextAreaElement | null)?.value?.trim();
    if (!text || store.stream.active) return;
    (textarea as HTMLTextAreaElement).value = '';
    this.autoScroll = true;
    await store.sendMessage(text);
  }

  private handleKeydown(e: KeyboardEvent): void {
    if (e.key === 'Enter' && !e.shiftKey && !e.isComposing) {
      e.preventDefault();
      void this.handleSend();
    }
  }

  private handleInput(e: InputEvent): void {
    const ta = e.target as HTMLTextAreaElement;
    ta.style.height = 'auto';
    ta.style.height = `${Math.min(ta.scrollHeight, 140)}px`;
  }

  render() {
    const connected = store.connState === 'connected';
    const items = toVisibleItems(store.messages);
    const hasSession = Boolean(store.currentSessionKey);

    return html`
      <div class="chat-header glass">
        <div class="title">${this.sessionTitle()}</div>
        ${store.models.length && hasSession ? html`
          <select class="model-picker" .value=${store.currentModel} @change=${this.handleModelChange} ?disabled=${!connected} title=${t('chatModelPicker')}>
            ${store.models.map(m => html`
              <option value="${m.provider}/${m.id}" ?selected=${store.currentModel === `${m.provider}/${m.id}`}>
                ${m.name || m.id}
              </option>
            `)}
          </select>
        ` : nothing}
        <button class="new-chat-btn" ?disabled=${!connected} @click=${() => void store.newSession()}>
          ${icon('plus')} ${t('chatNewSession')}
        </button>
      </div>

      <div class="chat-scroll" @scroll=${this.onScroll}>
        ${!hasSession
          ? html`<div class="empty-state">${t('chatNoSession')}</div>`
          : store.historyLoading && !items.length
            ? html`<div class="empty-state">${t('loading')}</div>`
            : items.map(item => item.kind === 'message'
                ? this.renderBubble(item.role, item.text, item.aborted)
                : this.renderTool(item))}
        ${store.stream.active ? this.renderStreamStatus() : nothing}
      </div>

      <div class="composer glass">
        <textarea
          rows="1"
          placeholder=${connected ? t('chatPlaceholder') : t('connNeedAuth')}
          ?disabled=${!connected || !hasSession}
          @keydown=${this.handleKeydown}
          @input=${this.handleInput}
        ></textarea>
        ${store.stream.active
          ? html`<button class="stop-btn" title=${t('chatStop')} @click=${() => void store.abortRun()}>${icon('stop')}</button>`
          : html`<button class="send-btn" title=${t('chatSend')} ?disabled=${!connected || !hasSession} @click=${() => void this.handleSend()}>${icon('send')}</button>`}
      </div>
    `;
  }

  private renderBubble(role: 'user' | 'assistant', text: string, aborted?: boolean): ReturnType<typeof html> {
    const cls = role === 'user' ? 'user' : 'ai';
    const inner = role === 'user'
      ? text
      : `${aborted ? `<span class="aborted-flag">⏹ ${t('chatRunAborted')}</span><br/>` : ''}${renderMarkdown(text)}`;
    return html`<div class="msg-row ${cls}">
      ${role === 'assistant' ? renderBrand(store.branding.aiAvatar, '🦞', 'ai-avatar') : nothing}
      <div class="bubble ${cls} ${role === 'assistant' ? 'md' : ''}" .innerHTML=${inner}></div>
    </div>`;
  }

  private renderTool(tool: { toolName?: string; output?: string; isError?: boolean }): ReturnType<typeof html> {
    if (tool.output === undefined) {
      // 纯调用卡片(无结果,如被截断的历史)
      return html`<details class="tool-card">
        <summary><span class="dot"></span>🔧 ${t('chatToolCall')}: ${tool.toolName ?? '—'}</summary>
      </details>`;
    }
    const short = tool.output.length > 1200 ? `${tool.output.slice(0, 1200)}…` : tool.output;
    return html`<details class="tool-card ${tool.isError ? 'error' : 'done'}">
      <summary><span class="dot"></span>🔧 ${tool.toolName ?? 'tool'} — ${t('chatToolOutput')}</summary>
      <div class="tool-output">${short}</div>
    </details>`;
  }

  private renderStreamStatus(): ReturnType<typeof html> {
    return html`<div class="stream-status">
      <span class="typing-dots"><i></i><i></i><i></i></span>
      ${store.stream.toolBusy ? t('chatRunningTool', { name: store.stream.toolBusy }) : t('chatThinking')}
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'chat-view': ChatView;
  }
}
