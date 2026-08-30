// 会话列表视图:置顶/最近/归档分组 + 重命名/置顶/归档操作
import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { store } from '../state/store';
import { t, formatRelative } from '../i18n/i18n';
import { icon } from '../icons';
import type { SessionRow } from '../gateway/types';

@customElement('sessions-view')
export class SessionsView extends LitElement {
  @state() private showArchived = false;

  createRenderRoot() { return this; }

  connectedCallback(): void {
    super.connectedCallback();
    store.subscribe(() => this.requestUpdate());
    void store.refreshSessions();
  }

  private visibleSessions(): { pinned: SessionRow[]; recent: SessionRow[]; archived: SessionRow[] } {
    const active = store.sessions.filter(s => !s.archived);
    const archived = store.sessions.filter(s => s.archived);
    return {
      pinned: active.filter(s => s.pinned),
      recent: active.filter(s => !s.pinned),
      archived,
    };
  }

  private async rename(s: SessionRow): Promise<void> {
    const name = window.prompt(t('sessionsNewName'), s.label ?? s.displayName ?? '');
    if (name === null) return;
    const trimmed = name.trim();
    await store.patchSession(s.key, trimmed ? { label: trimmed } : {});
  }

  render() {
    const groups = this.visibleSessions();
    const total = store.sessions.length;
    return html`
      <div class="sessions-toolbar glass">
        <span class="count">${t('sessionsTitle')} · ${total}</span>
        ${groups.archived.length
          ? html`<button class="toggle-btn" @click=${() => { this.showArchived = !this.showArchived; }}>
              ${this.showArchived ? t('sessionsHideArchived') : `${t('sessionsShowArchived')} (${groups.archived.length})`}
            </button>`
          : ''}
      </div>

      <div class="session-list">
        ${!total ? html`<div class="empty-state">${t('sessionsEmpty')}</div>` : ''}
        ${groups.pinned.length ? this.renderSection(t('sessionsPinned'), groups.pinned) : ''}
        ${groups.recent.length ? this.renderSection(t('sessionsOthers'), groups.recent) : ''}
        ${this.showArchived && groups.archived.length ? this.renderSection(t('sessionsArchived'), groups.archived, true) : ''}
      </div>
    `;
  }

  private renderSection(title: string, rows: SessionRow[], archived = false): ReturnType<typeof html> {
    return html`
      <div class="session-section-title">${title}</div>
      ${rows.map(s => this.renderItem(s, archived))}
    `;
  }

  private renderItem(s: SessionRow, archived: boolean): ReturnType<typeof html> {
    const selected = s.key === store.currentSessionKey;
    const isCron = s.key.includes(':cron:');
    const avatar = archived ? '📦' : isCron ? '⏰' : s.origin?.provider === 'webchat' ? '💬' : '💬';
    const sub = [s.displayName ? formatRelative(s.updatedAt) : '', s.kind].filter(Boolean).join(' · ');
    return html`
      <div
        class="session-item glass ${selected ? 'selected' : ''}"
        @click=${() => { void store.selectSession(s.key); store.setView('chat'); }}
      >
        <div class="s-avatar ${archived ? 'archive' : ''}">${avatar}</div>
        <div class="s-main">
          <div class="s-title">
            ${s.label || s.displayName || s.key.split(':').pop()?.slice(0, 10) || s.key}
            ${s.hasActiveRun ? html`<span class="badge active">${t('sessionsActiveRun')}</span>` : ''}
            ${s.unread && !selected ? html`<span class="badge unread"></span>` : ''}
          </div>
          <div class="s-sub">${sub}</div>
        </div>
        <div class="s-actions" @click=${(e: Event) => e.stopPropagation()}>
          <button class="icon-btn" title=${s.pinned ? t('sessionsUnpin') : t('sessionsPin')}
            @click=${() => void store.patchSession(s.key, { pinned: !s.pinned })}>
            ${icon('pin')}
          </button>
          <button class="icon-btn" title=${t('sessionsRename')} @click=${() => void this.rename(s)}>
            ${icon('edit')}
          </button>
          <button class="icon-btn" title=${archived ? t('sessionsUnarchive') : t('sessionsArchive')}
            @click=${() => void store.patchSession(s.key, { archived: !archived })}>
            ${icon('archive')}
          </button>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sessions-view': SessionsView;
  }
}
