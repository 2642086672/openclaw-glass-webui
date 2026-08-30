// Token 用量视图:按模型/提供商聚合的计量计费表 + 总览
import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { store } from '../state/store';
import { t } from '../i18n/i18n';
import { icon } from '../icons';

@customElement('usage-view')
export class UsageView extends LitElement {
  createRenderRoot() { return this; }

  connectedCallback(): void {
    super.connectedCallback();
    store.subscribe(() => this.requestUpdate());
    void store.refreshUsage();
  }

  private fmtTok(n: number): string {
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2)}M`;
    if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
    return String(Math.round(n));
  }

  private fmtCost(n: number): string {
    if (n === 0) return '0';
    return n.toFixed(n >= 1 ? 2 : 4);
  }

  render() {
    const totals = store.usageTotals;
    const rows = store.usageByModel;
    const cacheHitRate = totals.input + totals.cacheRead > 0
      ? (totals.cacheRead / (totals.input + totals.cacheRead) * 100).toFixed(1)
      : '0.0';
    return html`
      <div class="sessions-toolbar glass">
        <span class="count">${t('usageTitle')} · ${t('usageSessions', { n: store.usageSessionCount })}</span>
        <button class="toggle-btn" ?disabled=${store.usageLoading} @click=${() => void store.refreshUsage()}>
          ${icon('refresh')} ${t('retry')}
        </button>
      </div>

      <div class="usage-scroll">
        <div class="usage-summary glass">
          <div class="us-item">
            <div class="us-num">${this.fmtTok(totals.totalTokens)}</div>
            <div class="us-label">${t('usageTotalTokens')}</div>
          </div>
          <div class="us-item">
            <div class="us-num">${this.fmtCost(totals.totalCost)}</div>
            <div class="us-label">${t('usageTotalCost')}</div>
          </div>
          <div class="us-item">
            <div class="us-num">${this.fmtTok(totals.input)}</div>
            <div class="us-label">${t('usageInput')}</div>
          </div>
          <div class="us-item">
            <div class="us-num">${this.fmtTok(totals.output)}</div>
            <div class="us-label">${t('usageOutput')}</div>
          </div>
          <div class="us-item">
            <div class="us-num">${this.fmtTok(totals.cacheRead)}</div>
            <div class="us-label">${t('usageCacheRead')} (${cacheHitRate}%)</div>
          </div>
        </div>

        <div class="usage-table glass">
          <div class="ut-head">
            <span>${t('usageColModel')}</span>
            <span>${t('usageColInput')}</span>
            <span>${t('usageColOutput')}</span>
            <span>${t('usageColCache')}</span>
            <span>${t('usageColSessions')}</span>
            <span>${t('usageColCost')}</span>
          </div>
          ${!rows.length ? html`<div class="empty-state">${store.usageLoading ? t('loading') : t('usageEmpty')}</div>` : ''}
          ${rows.map(r => html`
            <div class="ut-row">
              <span class="ut-model" title=${r.model}>
                <span class="ut-provider">${r.provider}</span> ${r.model.split('/').slice(1).join('/') || r.model}
              </span>
              <span>${this.fmtTok(r.input)}</span>
              <span>${this.fmtTok(r.output)}</span>
              <span>${this.fmtTok(r.cacheRead)}</span>
              <span>${r.sessions}</span>
              <span class="ut-cost">${this.fmtCost(r.totalCost)}</span>
            </div>
          `)}
        </div>
        <div class="hint" style="padding:8px 6px">${t('usageNote')}</div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'usage-view': UsageView;
  }
}
