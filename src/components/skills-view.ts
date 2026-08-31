// 技能视图:69 个技能的搜索/浏览 + 来源与可用状态
import { LitElement, html, nothing } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { store } from '../state/store';
import { t } from '../i18n/i18n';
import { icon } from '../icons';

@customElement('skills-view')
export class SkillsView extends LitElement {
  @state() private query = '';

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

  render() {
    const all = store.skills;
    const shown = this.filtered();
    const enabledCount = all.filter(s => !s.disabled && s.eligible !== false).length;
    return html`
      <div class="sessions-toolbar glass">
        <span class="count">${t('skillsTitle')} · ${all.length} (${t('skillsReady')}: ${enabledCount})</span>
        <button class="toggle-btn" @click=${() => void store.refreshSkills()}>${icon('refresh')} ${t('retry')}</button>
      </div>
      <div class="skills-search">
        <input class="field" type="search" placeholder=${t('skillsSearch')} .value=${this.query}
          @input=${(e: InputEvent) => { this.query = (e.target as HTMLInputElement).value; }} />
      </div>
      <div class="session-list">
        ${!all.length ? html`<div class="empty-state">${t('loading')}</div>` : ''}
        ${all.length && !shown.length ? html`<div class="empty-state">${t('empty')}</div>` : ''}
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
}

declare global {
  interface HTMLElementTagNameMap {
    'skills-view': SkillsView;
  }
}
