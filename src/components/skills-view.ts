// 技能市场:已安装 + 市场(分类侧边栏 + 卡片网格 + 详情弹窗 + 分页)
import { LitElement, html, nothing } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { store } from '../state/store';
import { t } from '../i18n/i18n';
import { icon } from '../icons';

@customElement('skills-view')
export class SkillsView extends LitElement {
  @state() private query = '';
  @state() private enableDialog: { name: string; skillId: string } | null = null;

  createRenderRoot() { return this; }

  connectedCallback(): void {
    super.connectedCallback();
    store.subscribe(() => this.requestUpdate());
    void store.refreshSkills();
  }

  private filtered() {
    const q = this.query.trim().toLowerCase();
    const all = store.skills;
    if (!q) return all;
    return all.filter(s =>
      s.name?.toLowerCase().includes(q) ||
      s.description?.toLowerCase().includes(q)
    );
  }

  private async handleInstall(skillId: string, _skillName: string) {
    // 从 ClawHub 下载技能包
    const downloadUrl = store.downloadUrl(skillId);
    // 打开下载链接(浏览器会下载 ZIP)
    window.open(downloadUrl, '_blank');
    // 同时通过网关 config.patch 启用
    const res = await store.installSkill(skillId);
    if (res.ok) {
      this.enableDialog = { name: res.skillName, skillId };
      this.requestUpdate();
    }
  }

  private async handleEnableConfirm() {
    const dlg = this.enableDialog;
    if (!dlg) return;
    this.enableDialog = null;
    this.requestUpdate();
    const key = store.skills.find(s => s.name === dlg.name)?.skillKey
      ?? store.marketplaceItems.find(s => s.id === dlg.skillId)?.name
      ?? dlg.skillId;
    await store.setSkillEnabled(key, true);
    await store.refreshSkills();
  }

  private handleEnableSkip() {
    this.enableDialog = null;
    this.requestUpdate();
  }

  render() {
    return html`
      ${this.enableDialog ? this.renderEnableDialog() : nothing}
      ${store.marketplaceDetailItem ? this.renderDetailModal() : nothing}
      <div class="sessions-toolbar glass">
        <span class="count">${t('skillsTitle')} · ${store.skills.length}</span>
        <button class="toggle-btn" @click=${() => void store.toggleMarketplace()}>
          ${icon('market')} ${store.marketplaceOpen ? t('marketplaceBack') : t('tabMarketplace')}
        </button>
      </div>
      ${store.marketplaceOpen ? this.renderMarketplace() : this.renderInstalled()}
    `;
  }

  // ========== 已安装视图 ==========
  private renderInstalled() {
    const shown = this.filtered();
    return html`
      <div class="skills-search">
        <input class="field" type="search" placeholder=${t('skillsSearch')} .value=${this.query}
          @input=${(e: InputEvent) => { this.query = (e.target as HTMLInputElement).value; }} />
      </div>
      <div class="session-list">
        ${!store.skills.length ? html`<div class="empty-state">${t('loading')}</div>` : ''}
        ${store.skills.length && !shown.length ? html`<div class="empty-state">${t('empty')}</div>` : ''}
        ${shown.map(s => {
          const key = s.skillKey ?? s.name;
          const active = !s.disabled;
          return html`
          <div class="skill-item glass">
            <div class="s-avatar">${s.emoji || '🧩'}</div>
            <div class="s-main">
              <div class="s-title">
                ${s.name}
                ${s.bundled ? html`<span class="badge dim">${t('skillBundled')}</span>` : html`<span class="badge dim">${t('skillCustom')}</span>`}
                ${s.disabled ? html`<span class="badge off">${t('skillDisabled')}</span>` : nothing}
                ${s.eligible === false ? html`<span class="badge err">${t('skillIneligible')}</span>` : nothing}
              </div>
              <div class="skill-desc">${s.description || ''}</div>
            </div>
            <span class="seg-control" style="display:inline-flex;padding:2px">
              <button class=${active ? 'active' : ''} style="padding:4px 12px"
                ?disabled=${active} @click=${() => void store.setSkillEnabled(key, true)}>${t('commsOn')}</button>
              <button class=${!active ? 'active' : ''} style="padding:4px 12px"
                ?disabled=${!active} @click=${() => void store.setSkillEnabled(key, false)}>${t('commsOff')}</button>
            </span>
          </div>
        `;})}
      </div>
    `;
  }

  // ========== 市场视图 ==========
  private renderMarketplace() {
    return html`
      <div class="marketplace-layout">
        ${this.renderSidebar()}
        <div class="marketplace-content">
          ${this.renderMarketHeader()}
          ${this.renderMarketList()}
          ${this.renderPagination()}
        </div>
      </div>
    `;
  }

  private renderSidebar() {
    const cats = store.marketplaceCategories;
    const hasCats = cats.length > 0;
    return html`
      <aside class="marketplace-sidebar">
        <div class="sidebar-title">${t('marketplaceCategory')}</div>
        <button class="sidebar-item ${store.marketplaceCategory === '' ? 'active' : ''}"
          @click=${() => store.setMarketplaceCategory('')}>
          ${icon('folder')} ${t('marketplaceCategoryAll')}
        </button>
        ${hasCats ? cats.map(c => html`
          <button class="sidebar-item ${store.marketplaceCategory === c.id ? 'active' : ''}"
            @click=${() => store.setMarketplaceCategory(c.id)}>
            ${c.name} <span class="sidebar-count">${c.count}</span>
          </button>
        `) : html`<div class="sidebar-empty">${t('loading')}</div>`}
      </aside>
    `;
  }

  private renderMarketHeader() {
    const sources = store.marketplaceSources.filter(s => s.enabled);
    return html`
      <div class="marketplace-header">
        <div class="search-wrap">
          ${icon('search')}
          <input class="field search-input" type="search" placeholder=${t('marketplaceSearch')}
            .value=${store.marketplaceQuery}
            @input=${(e: InputEvent) => { store.marketplaceQuery = (e.target as HTMLInputElement).value; }}
            @keydown=${(e: KeyboardEvent) => { if (e.key === 'Enter') void store.searchMarketplace(store.marketplaceQuery); }} />
          ${store.marketplaceQuery ? html`<button class="search-clear" @click=${() => { store.marketplaceQuery = ''; void store.searchMarketplace(''); }}>✕</button>` : nothing}
        </div>
        <div class="header-actions">
          ${sources.length > 1 ? html`
            <select class="source-select" .value=${store.marketplaceSelectedSource}
              @change=${(e: Event) => { store.marketplaceSelectedSource = (e.target as HTMLSelectElement).value; void store.refreshMarketplace(); }}>
              <option value="">${t('marketplaceCategoryAll')}</option>
              ${sources.map(s => html`<option value=${s.id}>${s.name}</option>`)}
            </select>
          ` : nothing}
          <button class="btn-icon" @click=${() => void store.refreshMarketplace()} title=${t('retry')}>
            ${icon('refresh')}
          </button>
        </div>
      </div>
    `;
  }

  private renderMarketList() {
    const items = store.marketplaceItems;
    return html`
      <div class="marketplace-grid">
        ${store.marketplaceLoading ? html`<div class="empty-state grid-empty">${t('marketplaceLoading')}</div>` : ''}
        ${!store.marketplaceLoading && store.marketplaceError ? html`<div class="empty-state grid-empty">${t('marketplaceError')}<div style="margin-top:8px"><button class="toggle-btn" @click=${() => void store.loadMarketplace()}>${t('marketplaceRetry')}</button></div></div>` : ''}
        ${!store.marketplaceLoading && !store.marketplaceError && !items.length ? html`<div class="empty-state grid-empty">${t('marketplaceNoResults')}</div>` : ''}
        ${items.map(s => this.renderSkillCard(s))}
      </div>
    `;
  }

  private renderSkillCard(s: typeof store.marketplaceItems[0]) {
    const installing = store.marketplaceInstalling.has(s.id);
    const status = s.status ?? 'notInstalled';
    return html`
      <div class="market-card glass" @click=${() => store.openDetail(s)}>
        <div class="card-header">
          <div class="card-avatar">${s.name.charAt(0).toUpperCase()}</div>
          <div class="card-status">
            ${status === 'installed' ? html`<span class="badge ok">${t('marketplaceInstalled')}</span>` : nothing}
            ${status === 'updateAvailable' ? html`<span class="badge warn">${t('skillUpdateAvailable')}</span>` : nothing}
          </div>
        </div>
        <div class="card-name">${s.name}</div>
        <div class="card-author">${s.author ? t('marketplaceAuthor', { name: s.author }) : ''}</div>
        <div class="card-desc">${s.description || ''}</div>
        <div class="card-footer">
          <span class="card-meta">${s.downloads ? t('marketplaceDownloads', { n: s.downloads }) : ''}</span>
          ${s.installs ? html`<span class="card-meta">· ${s.installs} ${t('marketplaceInstalled')}</span>` : nothing}
          <span class="card-version">${s.version ? t('marketplaceVersion', { v: s.version }) : ''}</span>
        </div>
        <div class="card-install" @click=${(e: Event) => { e.stopPropagation(); }}>
          ${status === 'installed'
            ? html`<button class="btn installed-btn" disabled>${icon('check')} ${t('marketplaceInstalled')}</button>`
            : status === 'updateAvailable'
              ? html`<button class="btn primary" ?disabled=${installing} @click=${() => void this.handleInstall(s.id, s.name)}>${icon('update')} ${t('skillUpdate')}</button>`
              : html`<button class="btn primary" ?disabled=${installing} @click=${() => void this.handleInstall(s.id, s.name)}>${installing ? t('marketplaceInstalling') : html`${icon('download')} ${t('marketplaceInstall')}`}</button>`}
        </div>
      </div>
    `;
  }

  private renderPagination() {
    if (store.marketplaceLoading || !store.marketplaceItems.length) return nothing;
    return html`
      <div class="marketplace-pagination">
        <button class="page-btn" ?disabled=${store.marketplacePage <= 1} @click=${() => store.prevPage()}>‹</button>
        <span class="page-info">${store.marketplacePage}</span>
        <button class="page-btn" ?disabled=${!store.marketplaceHasMore} @click=${() => store.nextPage()}>›</button>
      </div>
    `;
  }

  // ========== 详情弹窗 ==========
  private renderDetailModal() {
    const item = store.marketplaceDetailItem!;
    const status = item.status ?? 'notInstalled';
    const installing = store.marketplaceInstalling.has(item.id);
    return html`
      <div class="modal-overlay" @click=${() => store.openDetail(null)}>
        <div class="modal-card detail-modal glass-strong" @click=${(e: Event) => e.stopPropagation()}>
          <button class="modal-close" @click=${() => store.openDetail(null)}>✕</button>
          <div class="detail-header">
            <div class="detail-avatar">${item.name.charAt(0).toUpperCase()}</div>
            <div class="detail-info">
              <h2>${item.name}</h2>
              <div class="detail-meta">
                ${item.author ? html`<span>${t('marketplaceAuthor', { name: item.author })}</span>` : nothing}
                ${item.version ? html`<span>· ${t('marketplaceVersion', { v: item.version })}</span>` : nothing}
                ${item.downloads ? html`<span>· ${t('marketplaceDownloads', { n: item.downloads })}</span>` : nothing}
              </div>
            </div>
          </div>
          <div class="detail-desc">${item.description || t('marketplaceNoDesc')}</div>
          ${item.tags?.length ? html`<div class="detail-tags">${item.tags.map(tag => html`<span class="tag">${tag}</span>`)}</div>` : nothing}
          <div class="detail-actions">
            ${status === 'installed'
              ? html`<button class="btn primary big" disabled>${icon('check')} ${t('marketplaceInstalled')}</button>`
              : status === 'updateAvailable'
                ? html`<button class="btn primary big" ?disabled=${installing} @click=${() => void this.handleInstall(item.id, item.name)}>${icon('update')} ${t('skillUpdate')}</button>`
                : html`<button class="btn primary big" ?disabled=${installing} @click=${() => void this.handleInstall(item.id, item.name)}>${installing ? t('marketplaceInstalling') : html`${icon('download')} ${t('marketplaceInstall')}`}</button>`}
          </div>
        </div>
      </div>
    `;
  }

  // ========== 启用确认弹窗 ==========
  private renderEnableDialog() {
    const dlg = this.enableDialog!;
    return html`
      <div class="modal-overlay" @click=${() => this.handleEnableSkip()}>
        <div class="modal-card glass-strong" @click=${(e: Event) => e.stopPropagation()}>
          <h3>${t('marketplaceEnableNow')}</h3>
          <p class="hint">${dlg.name}</p>
          <p class="hint">${t('marketplaceEnableHint')}</p>
          <div class="actions">
            <button class="btn" @click=${() => this.handleEnableSkip()}>${t('marketplaceEnableNo')}</button>
            <button class="btn primary" @click=${() => void this.handleEnableConfirm()}>${t('marketplaceEnableYes')}</button>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'skills-view': SkillsView;
  }
}
