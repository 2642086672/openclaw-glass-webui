// Token 用量:总览 + 按模型/提供商计费表 + 模型记录隐藏 + Token 配额倒计时
import { LitElement, html, nothing } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { store } from '../state/store';
import { t } from '../i18n/i18n';
import { icon } from '../icons';

@customElement('usage-view')
export class UsageView extends LitElement {
  @state() private quotaLabel = '';
  @state() private quotaProvider = '';
  @state() private quotaWan = ''; // 以"万"为单位输入
  @state() private showHidden = false;

  createRenderRoot() { return this; }

  connectedCallback(): void {
    super.connectedCallback();
    store.subscribe(() => this.requestUpdate());
    void store.refreshUsage();
  }

  private fmtTok(n: number): string {
    if (Math.abs(n) >= 100_000_000) return `${(n / 100_000_000).toFixed(2)}亿`;
    if (Math.abs(n) >= 10_000) return `${(n / 10_000).toFixed(1)}万`;
    if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
    return String(Math.round(n));
  }

  private fmtCost(n: number): string {
    if (n === 0) return '0';
    return n.toFixed(n >= 1 ? 2 : 4);
  }

  /** 缓存命中率颜色:绿=高(>50%),黄=中,红=低(<20%)。 */
  private hitColor(rate: number): string {
    if (rate >= 50) return 'var(--ok)';
    if (rate >= 20) return 'var(--warn)';
    return 'var(--danger)';
  }

  private addQuota(): void {
    const total = Number(this.quotaWan) * 10_000;
    if (!this.quotaLabel.trim() || !total) return;
    store.addQuota(this.quotaLabel.trim(), this.quotaProvider, total);
    this.quotaLabel = '';
    this.quotaProvider = '';
    this.quotaWan = '';
  }

  private renderQuotaCard() {
    const quotas = store.usageQuotas;
    const providers = [...new Set(store.usageByModel.map(r => r.provider))];
    return html`
      <div class="card glass" style="margin:0 2px 12px">
        <h3>${t('quotaTitle')}</h3>
        ${quotas.map(q => {
          const remain = store.quotaRemain(q);
          const pct = q.totalTokens > 0 ? Math.max(0, Math.min(100, (remain / q.totalTokens) * 100)) : 0;
          const cls = pct <= 10 ? 'danger' : pct <= 30 ? 'warn' : '';
          return html`
            <div class="quota-item">
              <div class="quota-head">
                <span class="quota-label">${q.label} <span class="badge dim">${q.provider || t('quotaAllModels')}</span></span>
                <span class="quota-remain ${pct <= 10 ? 'low' : ''}">${this.fmtTok(Math.max(0, remain))} / ${this.fmtTok(q.totalTokens)}</span>
                <button class="icon-btn" title=${t('delete')} @click=${() => store.removeQuota(q.id)}>🗑</button>
              </div>
              <div class="meter ${cls}"><span style="width:${pct}%"></span></div>
              <div class="quota-sub">${t('quotaUsedSince', { n: this.fmtTok(Math.max(0, q.totalTokens - remain)) })}</div>
            </div>
          `;
        })}
        <div class="mp-grid mp-grid-3" style="margin-top:10px">
          <div>
            <label class="hint" style="margin:4px 0 4px">${t('quotaFieldName')}</label>
            <input class="field" placeholder="如:智谱赠送" .value=${this.quotaLabel}
              @input=${(e: InputEvent) => { this.quotaLabel = (e.target as HTMLInputElement).value; }} />
          </div>
          <div>
            <label class="hint" style="margin:4px 0 4px">${t('quotaFieldScope')}</label>
            <select class="field" .value=${this.quotaProvider} @change=${(e: Event) => { this.quotaProvider = (e.target as HTMLSelectElement).value; }}>
              <option value="" ?selected=${!this.quotaProvider}>${t('quotaAllModels')}</option>
              ${providers.map(p => html`<option value=${p} ?selected=${this.quotaProvider === p}>${p}</option>`)}
            </select>
          </div>
          <div>
            <label class="hint" style="margin:4px 0 4px">${t('quotaFieldWan')}</label>
            <input class="field" type="number" min="1" placeholder="如 1000(万)" .value=${this.quotaWan}
              @input=${(e: InputEvent) => { this.quotaWan = (e.target as HTMLInputElement).value; }} />
          </div>
        </div>
        <div class="actions">
          <button class="btn primary" style="width:100%" ?disabled=${!this.quotaLabel.trim() || !Number(this.quotaWan)}
            @click=${() => this.addQuota()}>${t('quotaAdd')}</button>
        </div>
        <div class="hint">${t('quotaHint')}</div>
      </div>
    `;
  }

  render() {
    const totals = store.usageTotals;
    const hiddenSet = new Set(store.usageHiddenModels);
    const rows = store.usageByModel.filter(r => !hiddenSet.has(r.model));
    const hitRate = store.overallCacheHitRate();
    const savings = store.usageByModel.reduce((s, r) => s + store.estimatedCacheSavings(r), 0);
    return html`
      <div class="sessions-toolbar glass">
        <span class="count">${t('usageTitle')} · ${t('usageSessions', { n: store.usageSessionCount })}</span>
        <div class="logs-toolbar-btns">
          ${store.usageHiddenModels.length ? html`
            <button class="toggle-btn" @click=${() => { this.showHidden = !this.showHidden; }}>
              ${t('usageHiddenBtn', { n: store.usageHiddenModels.length })}
            </button>` : nothing}
          <button class="toggle-btn" ?disabled=${store.usageLoading} @click=${() => void store.refreshUsage()}>
            ${icon('refresh')} ${t('retry')}
          </button>
        </div>
      </div>

      <div class="usage-scroll">
        ${this.renderQuotaCard()}

        <!-- 省钱中心:缓存命中率 + 估算节省 -->
        <div class="usage-summary glass savings-summary">
          <div class="us-item">
            <div class="us-num" style="color:${this.hitColor(hitRate)}">${hitRate.toFixed(1)}%</div>
            <div class="us-label">${t('savingsHitRate')}</div>
          </div>
          <div class="us-item">
            <div class="us-num" style="color:var(--ok)">~${this.fmtCost(savings)}</div>
            <div class="us-label">${t('savingsSaved')}</div>
          </div>
          <div class="us-item">
            <div class="us-num">${this.fmtTok(totals.cacheRead)}</div>
            <div class="us-label">${t('usageCacheRead')}</div>
          </div>
          <div class="us-item">
            <div class="us-num">${this.fmtTok(totals.input)}</div>
            <div class="us-label">${t('savingsColdInput')}</div>
          </div>
        </div>
        <div class="savings-tips glass">
          <div class="savings-tips-title">💡 ${t('savingsTipsTitle')}</div>
          ${this.renderSavingsTips(hitRate)}
        </div>

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
            <div class="us-label">${t('usageCacheRead')}</div>
          </div>
        </div>

        ${this.showHidden && store.usageHiddenModels.length ? html`
          <div class="card glass" style="margin:0 2px 10px">
            <h3>${t('usageHiddenTitle')}</h3>
            ${store.usageHiddenModels.map(m => html`
              <div class="mp-row">
                <div class="mp-info"><div class="mp-name">${m}</div></div>
                <button class="icon-btn" title=${t('usageUnhide')} @click=${() => store.toggleHideModel(m)}>↩</button>
              </div>
            `)}
          </div>` : nothing}

        <div class="usage-table glass">
          <div class="ut-head">
            <span>${t('usageColModel')}</span>
            <span>${t('usageColHit')}</span>
            <span>${t('usageColInput')}</span>
            <span>${t('usageColOutput')}</span>
            <span>${t('usageColCache')}</span>
            <span>${t('usageColSessions')}</span>
            <span>${t('usageColSaved')}</span>
            <span></span>
          </div>
          ${!rows.length ? html`<div class="empty-state">${store.usageLoading ? t('loading') : t('usageEmpty')}</div>` : ''}
          ${rows.map(r => {
            const rate = (r.input + r.cacheRead) > 0 ? (r.cacheRead / (r.input + r.cacheRead) * 100) : 0;
            const saved = store.estimatedCacheSavings(r);
            return html`
            <div class="ut-row">
              <span class="ut-model" title=${r.model}>
                <span class="ut-provider">${r.provider}</span> ${r.model.split('/').slice(1).join('/') || r.model}
              </span>
              <span style="color:${this.hitColor(rate)};font-weight:700">${rate.toFixed(0)}%</span>
              <span>${this.fmtTok(r.input)}</span>
              <span>${this.fmtTok(r.output)}</span>
              <span>${this.fmtTok(r.cacheRead)}</span>
              <span>${r.sessions}</span>
              <span class="ut-cost" style="color:var(--ok)">~${this.fmtCost(saved)}</span>
              <span><button class="icon-btn" title=${t('usageHideTitle')} @click=${() => store.toggleHideModel(r.model)}>✕</button></span>
            </div>
          `})}
        </div>
        <div class="hint" style="padding:8px 6px">${t('usageNote')} ${t('usageHideNote')}</div>
      </div>
    `;
  }

  /** 根据整体命中率给出可执行的省钱建议。 */
  private renderSavingsTips(hitRate: number): ReturnType<typeof html> {
    const tips: ReturnType<typeof html>[] = [];
    if (hitRate < 20) {
      tips.push(html`<div>🔴 ${t('savingsTipLow')}</div>`);
      tips.push(html`<div>· ${t('savingsTipContinue')}</div>`);
    } else if (hitRate < 50) {
      tips.push(html`<div>🟡 ${t('savingsTipMid')}</div>`);
    } else {
      tips.push(html`<div>🟢 ${t('savingsTipHigh')}</div>`);
    }
    const noPriceModels = store.usageByModel.filter(r => store.modelUnitInputCost(r.provider, r.model) === 0);
    if (noPriceModels.length) {
      tips.push(html`<div>· ${t('savingsTipNoPrice', { n: noPriceModels.length })} <span class="badge dim" style="margin-left:4px">${noPriceModels.map(m => m.model.split('/').pop()).join(', ')}</span></div>`);
    }
    tips.push(html`<div>· ${t('savingsTipPricing')}</div>`);
    return html`${tips}`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'usage-view': UsageView;
  }
}
