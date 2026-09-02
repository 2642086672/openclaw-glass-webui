(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const a of i)if(a.type==="childList")for(const r of a.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function s(i){const a={};return i.integrity&&(a.integrity=i.integrity),i.referrerPolicy&&(a.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?a.credentials="include":i.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(i){if(i.ep)return;i.ep=!0;const a=s(i);fetch(i.href,a)}})();const is=globalThis,un=is.ShadowRoot&&(is.ShadyCSS===void 0||is.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,na=Symbol(),ci=new WeakMap;let fo=class{constructor(e,s,n){if(this._$cssResult$=!0,n!==na)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=s}get styleSheet(){let e=this.o;const s=this.t;if(un&&e===void 0){const n=s!==void 0&&s.length===1;n&&(e=ci.get(s)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),n&&ci.set(s,e))}return e}toString(){return this.cssText}};const vo=t=>new fo(typeof t=="string"?t:t+"",void 0,na),yo=(t,e)=>{if(un)t.adoptedStyleSheets=e.map(s=>s instanceof CSSStyleSheet?s:s.styleSheet);else for(const s of e){const n=document.createElement("style"),i=is.litNonce;i!==void 0&&n.setAttribute("nonce",i),n.textContent=s.cssText,t.appendChild(n)}},di=un?t=>t:t=>t instanceof CSSStyleSheet?(e=>{let s="";for(const n of e.cssRules)s+=n.cssText;return vo(s)})(t):t;const{is:bo,defineProperty:$o,getOwnPropertyDescriptor:ko,getOwnPropertyNames:wo,getOwnPropertySymbols:xo,getPrototypeOf:So}=Object,vs=globalThis,hi=vs.trustedTypes,Co=hi?hi.emptyScript:"",To=vs.reactiveElementPolyfillSupport,Ct=(t,e)=>t,rs={toAttribute(t,e){switch(e){case Boolean:t=t?Co:null;break;case Object:case Array:t=t==null?t:JSON.stringify(t)}return t},fromAttribute(t,e){let s=t;switch(e){case Boolean:s=t!==null;break;case Number:s=t===null?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t)}catch{s=null}}return s}},pn=(t,e)=>!bo(t,e),ui={attribute:!0,type:String,converter:rs,reflect:!1,useDefault:!1,hasChanged:pn};Symbol.metadata??=Symbol("metadata"),vs.litPropertyMetadata??=new WeakMap;let rt=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,s=ui){if(s.state&&(s.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((s=Object.create(s)).wrapped=!0),this.elementProperties.set(e,s),!s.noAccessor){const n=Symbol(),i=this.getPropertyDescriptor(e,n,s);i!==void 0&&$o(this.prototype,e,i)}}static getPropertyDescriptor(e,s,n){const{get:i,set:a}=ko(this.prototype,e)??{get(){return this[s]},set(r){this[s]=r}};return{get:i,set(r){const h=i?.call(this);a?.call(this,r),this.requestUpdate(e,h,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??ui}static _$Ei(){if(this.hasOwnProperty(Ct("elementProperties")))return;const e=So(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(Ct("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Ct("properties"))){const s=this.properties,n=[...wo(s),...xo(s)];for(const i of n)this.createProperty(i,s[i])}const e=this[Symbol.metadata];if(e!==null){const s=litPropertyMetadata.get(e);if(s!==void 0)for(const[n,i]of s)this.elementProperties.set(n,i)}this._$Eh=new Map;for(const[s,n]of this.elementProperties){const i=this._$Eu(s,n);i!==void 0&&this._$Eh.set(i,s)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const s=[];if(Array.isArray(e)){const n=new Set(e.flat(1/0).reverse());for(const i of n)s.unshift(di(i))}else e!==void 0&&s.push(di(e));return s}static _$Eu(e,s){const n=s.attribute;return n===!1?void 0:typeof n=="string"?n:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,s=this.constructor.elementProperties;for(const n of s.keys())this.hasOwnProperty(n)&&(e.set(n,this[n]),delete this[n]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return yo(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,s,n){this._$AK(e,n)}_$ET(e,s){const n=this.constructor.elementProperties.get(e),i=this.constructor._$Eu(e,n);if(i!==void 0&&n.reflect===!0){const a=(n.converter?.toAttribute!==void 0?n.converter:rs).toAttribute(s,n.type);this._$Em=e,a==null?this.removeAttribute(i):this.setAttribute(i,a),this._$Em=null}}_$AK(e,s){const n=this.constructor,i=n._$Eh.get(e);if(i!==void 0&&this._$Em!==i){const a=n.getPropertyOptions(i),r=typeof a.converter=="function"?{fromAttribute:a.converter}:a.converter?.fromAttribute!==void 0?a.converter:rs;this._$Em=i;const h=r.fromAttribute(s,a.type);this[i]=h??this._$Ej?.get(i)??h,this._$Em=null}}requestUpdate(e,s,n,i=!1,a){if(e!==void 0){const r=this.constructor;if(i===!1&&(a=this[e]),n??=r.getPropertyOptions(e),!((n.hasChanged??pn)(a,s)||n.useDefault&&n.reflect&&a===this._$Ej?.get(e)&&!this.hasAttribute(r._$Eu(e,n))))return;this.C(e,s,n)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,s,{useDefault:n,reflect:i,wrapped:a},r){n&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,r??s??this[e]),a!==!0||r!==void 0)||(this._$AL.has(e)||(this.hasUpdated||n||(s=void 0),this._$AL.set(e,s)),i===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(s){Promise.reject(s)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[i,a]of this._$Ep)this[i]=a;this._$Ep=void 0}const n=this.constructor.elementProperties;if(n.size>0)for(const[i,a]of n){const{wrapped:r}=a,h=this[i];r!==!0||this._$AL.has(i)||h===void 0||this.C(i,void 0,a,h)}}let e=!1;const s=this._$AL;try{e=this.shouldUpdate(s),e?(this.willUpdate(s),this._$EO?.forEach(n=>n.hostUpdate?.()),this.update(s)):this._$EM()}catch(n){throw e=!1,this._$EM(),n}e&&this._$AE(s)}willUpdate(e){}_$AE(e){this._$EO?.forEach(s=>s.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(s=>this._$ET(s,this[s])),this._$EM()}updated(e){}firstUpdated(e){}};rt.elementStyles=[],rt.shadowRootOptions={mode:"open"},rt[Ct("elementProperties")]=new Map,rt[Ct("finalized")]=new Map,To?.({ReactiveElement:rt}),(vs.reactiveElementVersions??=[]).push("2.1.2");const mn=globalThis,pi=t=>t,ls=mn.trustedTypes,mi=ls?ls.createPolicy("lit-html",{createHTML:t=>t}):void 0,ia="$lit$",Ie=`lit$${Math.random().toFixed(9).slice(2)}$`,aa="?"+Ie,Ao=`<${aa}>`,Ve=document,Tt=()=>Ve.createComment(""),At=t=>t===null||typeof t!="object"&&typeof t!="function",gn=Array.isArray,Eo=t=>gn(t)||typeof t?.[Symbol.iterator]=="function",Us=`[ 	
\f\r]`,yt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,gi=/-->/g,fi=/>/g,Be=RegExp(`>|${Us}(?:([^\\s"'>=/]+)(${Us}*=${Us}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),vi=/'/g,yi=/"/g,oa=/^(?:script|style|textarea|title)$/i,Mo=t=>(e,...s)=>({_$litType$:t,strings:e,values:s}),c=Mo(1),dt=Symbol.for("lit-noChange"),g=Symbol.for("lit-nothing"),bi=new WeakMap,We=Ve.createTreeWalker(Ve,129);function ra(t,e){if(!gn(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return mi!==void 0?mi.createHTML(e):e}const _o=(t,e)=>{const s=t.length-1,n=[];let i,a=e===2?"<svg>":e===3?"<math>":"",r=yt;for(let h=0;h<s;h++){const u=t[h];let m,v,f=-1,x=0;for(;x<u.length&&(r.lastIndex=x,v=r.exec(u),v!==null);)x=r.lastIndex,r===yt?v[1]==="!--"?r=gi:v[1]!==void 0?r=fi:v[2]!==void 0?(oa.test(v[2])&&(i=RegExp("</"+v[2],"g")),r=Be):v[3]!==void 0&&(r=Be):r===Be?v[0]===">"?(r=i??yt,f=-1):v[1]===void 0?f=-2:(f=r.lastIndex-v[2].length,m=v[1],r=v[3]===void 0?Be:v[3]==='"'?yi:vi):r===yi||r===vi?r=Be:r===gi||r===fi?r=yt:(r=Be,i=void 0);const M=r===Be&&t[h+1].startsWith("/>")?" ":"";a+=r===yt?u+Ao:f>=0?(n.push(m),u.slice(0,f)+ia+u.slice(f)+Ie+M):u+Ie+(f===-2?h:M)}return[ra(t,a+(t[s]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),n]};let Xs=class la{constructor({strings:e,_$litType$:s},n){let i;this.parts=[];let a=0,r=0;const h=e.length-1,u=this.parts,[m,v]=_o(e,s);if(this.el=la.createElement(m,n),We.currentNode=this.el.content,s===2||s===3){const f=this.el.content.firstChild;f.replaceWith(...f.childNodes)}for(;(i=We.nextNode())!==null&&u.length<h;){if(i.nodeType===1){if(i.hasAttributes())for(const f of i.getAttributeNames())if(f.endsWith(ia)){const x=v[r++],M=i.getAttribute(f).split(Ie),A=/([.?@])?(.*)/.exec(x);u.push({type:1,index:a,name:A[2],strings:M,ctor:A[1]==="."?Ro:A[1]==="?"?Po:A[1]==="@"?Io:ys}),i.removeAttribute(f)}else f.startsWith(Ie)&&(u.push({type:6,index:a}),i.removeAttribute(f));if(oa.test(i.tagName)){const f=i.textContent.split(Ie),x=f.length-1;if(x>0){i.textContent=ls?ls.emptyScript:"";for(let M=0;M<x;M++)i.append(f[M],Tt()),We.nextNode(),u.push({type:2,index:++a});i.append(f[x],Tt())}}}else if(i.nodeType===8)if(i.data===aa)u.push({type:2,index:a});else{let f=-1;for(;(f=i.data.indexOf(Ie,f+1))!==-1;)u.push({type:7,index:a}),f+=Ie.length-1}a++}}static createElement(e,s){const n=Ve.createElement("template");return n.innerHTML=e,n}};function ht(t,e,s=t,n){if(e===dt)return e;let i=n!==void 0?s._$Co?.[n]:s._$Cl;const a=At(e)?void 0:e._$litDirective$;return i?.constructor!==a&&(i?._$AO?.(!1),a===void 0?i=void 0:(i=new a(t),i._$AT(t,s,n)),n!==void 0?(s._$Co??=[])[n]=i:s._$Cl=i),i!==void 0&&(e=ht(t,i._$AS(t,e.values),i,n)),e}let zo=class{constructor(e,s){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=s}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:s},parts:n}=this._$AD,i=(e?.creationScope??Ve).importNode(s,!0);We.currentNode=i;let a=We.nextNode(),r=0,h=0,u=n[0];for(;u!==void 0;){if(r===u.index){let m;u.type===2?m=new fn(a,a.nextSibling,this,e):u.type===1?m=new u.ctor(a,u.name,u.strings,this,e):u.type===6&&(m=new Oo(a,this,e)),this._$AV.push(m),u=n[++h]}r!==u?.index&&(a=We.nextNode(),r++)}return We.currentNode=Ve,i}p(e){let s=0;for(const n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(e,n,s),s+=n.strings.length-2):n._$AI(e[s])),s++}},fn=class ca{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,s,n,i){this.type=2,this._$AH=g,this._$AN=void 0,this._$AA=e,this._$AB=s,this._$AM=n,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const s=this._$AM;return s!==void 0&&e?.nodeType===11&&(e=s.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,s=this){e=ht(this,e,s),At(e)?e===g||e==null||e===""?(this._$AH!==g&&this._$AR(),this._$AH=g):e!==this._$AH&&e!==dt&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Eo(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==g&&At(this._$AH)?this._$AA.nextSibling.data=e:this.T(Ve.createTextNode(e)),this._$AH=e}$(e){const{values:s,_$litType$:n}=e,i=typeof n=="number"?this._$AC(e):(n.el===void 0&&(n.el=Xs.createElement(ra(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===i)this._$AH.p(s);else{const a=new zo(i,this),r=a.u(this.options);a.p(s),this.T(r),this._$AH=a}}_$AC(e){let s=bi.get(e.strings);return s===void 0&&bi.set(e.strings,s=new Xs(e)),s}k(e){gn(this._$AH)||(this._$AH=[],this._$AR());const s=this._$AH;let n,i=0;for(const a of e)i===s.length?s.push(n=new ca(this.O(Tt()),this.O(Tt()),this,this.options)):n=s[i],n._$AI(a),i++;i<s.length&&(this._$AR(n&&n._$AB.nextSibling,i),s.length=i)}_$AR(e=this._$AA.nextSibling,s){for(this._$AP?.(!1,!0,s);e!==this._$AB;){const n=pi(e).nextSibling;pi(e).remove(),e=n}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},ys=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,s,n,i,a){this.type=1,this._$AH=g,this._$AN=void 0,this.element=e,this.name=s,this._$AM=i,this.options=a,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=g}_$AI(e,s=this,n,i){const a=this.strings;let r=!1;if(a===void 0)e=ht(this,e,s,0),r=!At(e)||e!==this._$AH&&e!==dt,r&&(this._$AH=e);else{const h=e;let u,m;for(e=a[0],u=0;u<a.length-1;u++)m=ht(this,h[n+u],s,u),m===dt&&(m=this._$AH[u]),r||=!At(m)||m!==this._$AH[u],m===g?e=g:e!==g&&(e+=(m??"")+a[u+1]),this._$AH[u]=m}r&&!i&&this.j(e)}j(e){e===g?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},Ro=class extends ys{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===g?void 0:e}},Po=class extends ys{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==g)}},Io=class extends ys{constructor(e,s,n,i,a){super(e,s,n,i,a),this.type=5}_$AI(e,s=this){if((e=ht(this,e,s,0)??g)===dt)return;const n=this._$AH,i=e===g&&n!==g||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,a=e!==g&&(n===g||i);i&&this.element.removeEventListener(this.name,this,n),a&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},Oo=class{constructor(e,s,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=s,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){ht(this,e)}};const Lo=mn.litHtmlPolyfillSupport;Lo?.(Xs,fn),(mn.litHtmlVersions??=[]).push("3.3.3");const Do=(t,e,s)=>{const n=s?.renderBefore??e;let i=n._$litPart$;if(i===void 0){const a=s?.renderBefore??null;n._$litPart$=i=new fn(e.insertBefore(Tt(),a),a,void 0,s??{})}return i._$AI(t),i};const vn=globalThis;class ae extends rt{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const s=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Do(s,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return dt}}ae._$litElement$=!0,ae.finalized=!0,vn.litElementHydrateSupport?.({LitElement:ae});const No=vn.litElementPolyfillSupport;No?.({LitElement:ae});(vn.litElementVersions??=[]).push("4.2.2");const ke=t=>(e,s)=>{s!==void 0?s.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)};const Uo={attribute:!0,type:String,converter:rs,reflect:!1,hasChanged:pn},Bo=(t=Uo,e,s)=>{const{kind:n,metadata:i}=s;let a=globalThis.litPropertyMetadata.get(i);if(a===void 0&&globalThis.litPropertyMetadata.set(i,a=new Map),n==="setter"&&((t=Object.create(t)).wrapped=!0),a.set(s.name,t),n==="accessor"){const{name:r}=s;return{set(h){const u=e.get.call(this);e.set.call(this,h),this.requestUpdate(r,u,t,!0,h)},init(h){return h!==void 0&&this.C(r,void 0,t,h),h}}}if(n==="setter"){const{name:r}=s;return function(h){const u=this[r];e.call(this,h),this.requestUpdate(r,u,t,!0,h)}}throw Error("Unsupported decorator location: "+n)};function Ho(t){return(e,s)=>typeof s=="object"?Bo(t,e,s):((n,i,a)=>{const r=i.hasOwnProperty(a);return i.constructor.createProperty(a,n),r?Object.getOwnPropertyDescriptor(i,a):void 0})(t,e,s)}function y(t){return Ho({...t,state:!0,attribute:!1})}const yn=Object.freeze,ut=0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffedn,cs=0x1000000000000000000000000000000014def9dea2f79cd65812631a5cf5d3edn,as=0x52036cee2b6ffe738cc740797779e89800700a4d4141d8ab75eb4dca135978a3n,en=0x216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51an,tn=0x6666666666666666666666666666666666666666666666666666666666666658n,os=ut-1n,Fo=yn({p:ut,n:cs,h:8n,a:os,d:as,Gx:en,Gy:tn}),Rt=32,$i=t=>t instanceof Uint8Array||ArrayBuffer.isView(t)&&t.constructor.name==="Uint8Array"&&t.BYTES_PER_ELEMENT===1,we=(t,e,s="")=>{if($i(t)&&(e===void 0||t.length===e))return t;const n=$i(t),i=e!==void 0?` of length ${e}`:"",a=n?`length=${t.length}`:`type=${typeof t}`,r=(s?`"${s}" `:"")+"expected Uint8Array"+i+", got "+a;throw n?new RangeError(r):new TypeError(r)},bn=(t,e="",s)=>Uint8Array.from(we(t,s,e)),da=(t,e)=>t.toString(16).padStart(e,"0"),ha=t=>{let e="";for(const s of we(t))e+=da(s,2);return e},ua=t=>{const e="hex invalid";if(typeof t!="string")throw new TypeError(e);if(t.length%2||!/^[\da-f]*$/i.test(t))throw new RangeError(e);const s=new Uint8Array(t.length/2);for(let n=0,i=0;n<s.length;n++,i+=2){const a=t.charCodeAt(i),r=t.charCodeAt(i+1);s[n]=((a&15)+(a>>6)*9)*16+(r&15)+(r>>6)*9}return s},Et=(...t)=>{let e=0;for(const i of t)e+=we(i).length;const s=new Uint8Array(e);let n=0;for(const i of t)s.set(i,n),n+=i.length;return s},qo=(t=Rt)=>{const e=globalThis?.crypto;if(typeof e?.getRandomValues!="function")throw new Error("crypto.getRandomValues must be defined, consider polyfill");return e.getRandomValues(new Uint8Array(t))},qe=(t,e,s,n="bad number: out of range")=>{if(typeof t!="bigint")throw new TypeError(n);if(e<=t&&t<s)return t;throw new RangeError(n)},F=(t,e=ut)=>(t%=e)>=0n?t:e+t,ki=(1n<<255n)-1n,C=t=>{if(t<0n)throw new RangeError("negative coordinate");let e=(t>>255n)*19n+(t&ki);return e=(e>>255n)*19n+(e&ki),e%ut},pa=t=>F(t,cs),jo=(t,e)=>{if(t===0n)throw new Error("invert: expected non-zero number");if(e<=1n)throw new Error("invert: expected modulus > 1, got "+e);let s=F(t,e),n=e,i=0n,a=1n;for(;s!==0n;){const h=n/s,u=n-s*h,m=i-a*h;n=s,s=u,i=a,a=m}if(n!==1n)throw new Error("invert: does not exist");return F(i,e)},ma=t=>{const e=ba[t];if(typeof e!="function")throw new Error("hashes."+t+" not set");return e},$n=(t,...e)=>we(ma(t)(Et(...e)),64,"digest"),Ko=async(t,...e)=>we(await ma(t)(Et(...e)),64,"digest"),Bs=t=>{if(t instanceof de)return t;throw new TypeError("Point expected")},ga=2n**256n;class de{static BASE;static ZERO;X;Y;Z;T;constructor(e,s,n,i){const a=ga;this.X=qe(e,0n,a),this.Y=qe(s,0n,a),this.Z=qe(n,1n,a),this.T=qe(i,0n,a),yn(this)}static CURVE(){return Fo}static fromAffine(e){return new de(e.x,e.y,1n,C(e.x*e.y))}static fromBytes(e,s=!1){const n=bn(e,"point",Rt),i=n[31];n[31]=i&-129;const a=va(n);s||qe(a,0n,ut);const r=C(a*a),h=F(r-1n),u=C(as*r+1n);let{isValid:m,value:v}=Wo(h,u);if(!m)throw new Error("bad point: y not sqrt");const f=!!(i&128);if(!s&&v===0n&&f)throw new Error("bad point: x==0, isLastByteOdd");return f!==!!(v&1n)&&(v=F(-v)),new de(v,a,1n,C(v*a))}static fromHex(e,s){return de.fromBytes(ua(e),s)}get x(){return this.toAffine().x}get y(){return this.toAffine().y}assertValidity(){const e=os,s=as,n=this;if(n.is0())throw new Error("bad point: ZERO");const{X:i,Y:a,Z:r,T:h}=n,u=C(i*i),m=C(a*a),v=C(r*r),f=C(v*v),x=C(u*e),M=C(v*(x+m)),A=F(f+C(s*C(u*m)));if(M!==A)throw new Error("bad point: equation left != right (1)");const P=C(i*a),I=C(r*h);if(P!==I)throw new Error("bad point: equation left != right (2)");return this}equals(e){const{X:s,Y:n,Z:i}=this,{X:a,Y:r,Z:h}=Bs(e);return C(s*h)===C(a*i)&&C(n*h)===C(r*i)}is0(){return this.equals(Ke)}negate(){return new de(F(-this.X),this.Y,this.Z,F(-this.T))}double(){const{X:e,Y:s,Z:n}=this,i=os,a=C(e*e),r=C(s*s),h=C(2n*n*n),u=C(i*a),m=F(e+s),v=F(C(m*m)-a-r),f=F(u+r),x=F(f-h),M=F(u-r),A=C(v*x),P=C(f*M),I=C(v*M),G=C(x*f);return new de(A,P,G,I)}add(e){const{X:s,Y:n,Z:i,T:a}=this,{X:r,Y:h,Z:u,T:m}=Bs(e),v=os,f=as,x=C(s*r),M=C(n*h),A=C(C(a*f)*m),P=C(i*u),I=F(C(F(s+n)*F(r+h))-x-M),G=F(P-A),te=F(P+A),z=F(M-C(v*x)),W=C(I*G),j=C(te*z),Q=C(I*z),he=C(G*te);return new de(W,j,he,Q)}subtract(e){return this.add(Bs(e).negate())}multiply(e,s=!0){if(!s&&e===0n||(qe(e,1n,cs),!s&&this.is0()))return Ke;if(e===1n)return this;if(this.equals(Ye))return sr(e).p;let n=Ke,i=Ye,a=this;for(let r=0;s?r<256:e>0n;r++)e&1n?n=n.add(a):s&&(i=i.add(a)),a=a.double(),e>>=1n;return n}multiplyUnsafe(e){return this.multiply(e,!1)}toAffine(){const{X:e,Y:s,Z:n}=this;if(this.equals(Ke))return{x:0n,y:1n};const i=jo(n,ut);if(C(n*i)!==1n)throw new Error("invalid inverse");return{x:C(e*i),y:C(s*i)}}toBytes(){const{x:e,y:s}=this.toAffine(),n=fa(s);return n[31]|=e&1n?128:0,n}toHex(){return ha(this.toBytes())}clearCofactor(){return this.multiply(8n,!1)}isSmallOrder(){return this.clearCofactor().is0()}isTorsionFree(){return this.multiply(cs/2n,!1).double().add(this).is0()}}const Ye=new de(en,tn,1n,F(en*tn)),Ke=new de(0n,1n,1n,0n);de.BASE=Ye;de.ZERO=Ke;const fa=t=>ua(da(qe(t,0n,ga),64)).reverse(),va=t=>BigInt("0x"+ha(Uint8Array.from(we(t)).reverse())),ye=(t,e)=>{let s=t;for(;e-- >0;)s=C(s*s);return s},Go=t=>{const e=C(t*t),s=C(e*t),n=C(ye(s,2)*s),i=C(ye(n,1)*t),a=C(ye(i,5)*i),r=C(ye(a,10)*a),h=C(ye(r,20)*r),u=C(ye(h,40)*h),m=C(ye(u,80)*u),v=C(ye(m,80)*u),f=C(ye(v,10)*a);return C(ye(f,2)*t)},wi=0x2b8324804fc1df0b2b4d00993dfbd7a72f431806ad2fe478c4ee1b274a0ea0b0n,Wo=(t,e)=>{const s=C(e*C(e*e)),n=C(C(s*s)*e),i=Go(C(t*n));let a=C(t*C(s*i));const r=C(e*C(a*a)),h=a,u=C(a*wi),m=r===t,v=r===F(-t),f=r===F(-t*wi);return m&&(a=h),(v||f)&&(a=u),(F(a)&1n)===1n&&(a=F(-a)),{isValid:m||v,value:a}},sn=t=>pa(va(t)),ya=t=>{const e=bn(t),s=e.slice(0,32);s[0]&=248,s[31]&=127,s[31]|=64;const n=e.slice(32),i=sn(s),a=Ye.multiply(i),r=a.toBytes();return{head:s,prefix:n,scalar:i,point:a,pointBytes:r}},Vo=t=>Ko("sha512Async",we(t,Rt,"secretKey")).then(ya),kn=t=>ya($n("sha512",we(t,Rt,"secretKey"))),Yo=t=>kn(t).pointBytes,Jo=t=>t[1]($n("sha512",t[0])),Qo=(t,e,s)=>{const{pointBytes:n,scalar:i}=t,a=sn(e),r=Ye.multiply(a).toBytes();return[Et(r,n,s),m=>{const v=pa(a+sn(m)*i);return we(Et(r,fa(v)),64)}]},Zo=(t,e)=>{const s=bn(t,"message"),n=kn(e);return Jo(Qo(n,$n("sha512",n.prefix,s),s))},ba={sha512Async:async t=>{const e=globalThis?.crypto?.subtle;if(!e)throw new Error("crypto.subtle must be defined, consider polyfill");return new Uint8Array(await e.digest("SHA-512",Et(t)))},sha512:void 0},Xo=t=>we(t===void 0?qo():t,Rt,"seed"),er=yn({getExtendedPublicKeyAsync:Vo,getExtendedPublicKey:kn,randomSecretKey:Xo}),tr=()=>{const t=[];let e=Ye,s;for(let n=0;n<33;n++){s=e,t.push(s);for(let i=1;i<128;i++)s=s.add(e),t.push(s);e=s.double()}return t};let xi;const Si=(t,e)=>{const s=e.negate();return t?s:e},sr=t=>{const e=xi||(xi=tr());let s=Ke,n=Ye;for(let i=0;i<33;i++){let a=Number(t&255n);t>>=8n,a>128&&(a-=256,t+=1n);const r=i*128,h=r+Math.abs(a)-1,u=i%2!==0,m=a<0;a===0?n=n.add(Si(u,e[r])):s=s.add(Si(m,e[h]))}if(t!==0n)throw new Error("invalid wnaf");return{p:s,f:n}},Jt=BigInt(2**32-1),Ci=BigInt(32);function nr(t,e=!1){return e?{h:Number(t&Jt),l:Number(t>>Ci&Jt)}:{h:Number(t>>Ci&Jt)|0,l:Number(t&Jt)|0}}function ir(t,e=!1){const s=t.length;let n=new Uint32Array(s),i=new Uint32Array(s);for(let a=0;a<s;a++){const{h:r,l:h}=nr(t[a],e);[n[a],i[a]]=[r,h]}return[n,i]}const ar=t=>t/2**32|0,or=t=>t>>>0;function rr(t,e,s,n){const i=ar(s),a=or(s);t.setUint32(e,n?a:i,n),t.setUint32(e+4,n?i:a,n)}const Ti=(t,e,s)=>t>>>s,Ai=(t,e,s)=>t<<32-s|e>>>s,it=(t,e,s)=>t>>>s|e<<32-s,at=(t,e,s)=>t<<32-s|e>>>s,Qt=(t,e,s)=>t<<64-s|e>>>s-32,Zt=(t,e,s)=>t>>>s-32|e<<64-s;function Ce(t,e,s,n){const i=(e>>>0)+(n>>>0);return{h:t+s+(i/2**32|0)|0,l:i|0}}const lr=(t,e,s)=>(t>>>0)+(e>>>0)+(s>>>0),cr=(t,e,s,n)=>e+s+n+(t/2**32|0)|0,dr=(t,e,s,n)=>(t>>>0)+(e>>>0)+(s>>>0)+(n>>>0),hr=(t,e,s,n,i)=>e+s+n+i+(t/2**32|0)|0,ur=(t,e,s,n,i)=>(t>>>0)+(e>>>0)+(s>>>0)+(n>>>0)+(i>>>0),pr=(t,e,s,n,i,a)=>e+s+n+i+a+(t/2**32|0)|0;function Ei(t){return t instanceof Uint8Array||ArrayBuffer.isView(t)&&t.constructor.name==="Uint8Array"&&"BYTES_PER_ELEMENT"in t&&t.BYTES_PER_ELEMENT===1}const mr=t=>t?`"${t}" `:"";function $a(t,e,s=""){if(Ei(t)&&e===void 0)return t;const n=Ei(t),i="",a=n?`length=${t.length}`:`type=${typeof t}`,r=mr(s)+"expected Uint8Array"+i+", got "+a;throw n?new RangeError(r):new TypeError(r)}const gr=(t,e)=>{if(t===null||typeof t!="object"||Array.isArray(t))throw new TypeError((e==="object"?"":`"${e}" `)+"expected object, got type="+typeof t)},Mi=(t,e)=>{gr(t,e);const s=Object.getPrototypeOf(t);if(s!==Object.prototype&&s!==null)throw new TypeError(`"${e}" expected plain object`);if(Object.hasOwn(t,"__proto__"))throw new TypeError(`"${e}.__proto__" is not allowed`)};function _i(t,e=!0){if(t.destroyed)throw new Error("hash was destroyed");if(e&&t.finished)throw new Error("digest() was already called")}function fr(t,e){$a(t,void 0,"output");const s=e.outputLen;if(!(t.length>=s))throw new RangeError('"output" expected length >= '+s)}function zi(...t){for(let e=0;e<t.length;e++)t[e].fill(0)}function Hs(t){return new DataView(t.buffer,t.byteOffset,t.byteLength)}function vr(t,e,s="opts"){return Mi(t,"defaults"),e!==void 0&&Mi(e,s),Object.assign(Object.create(null),t,e)}function yr(t,e={}){if(typeof t!="function")throw new TypeError('"hashCons" expected function, got type='+typeof t);e=vr({},e,"info");const s=(i,a)=>t(a).update(i).digest(),n=t(void 0);return s.outputLen=n.outputLen,s.blockLen=n.blockLen,s.canXOF=n.canXOF,s.create=i=>t(i),Object.assign(s,e),Object.freeze(s)}const br=t=>({oid:Uint8Array.from([6,9,96,134,72,1,101,3,4,2,t])});class $r{blockLen;outputLen;canXOF=!1;padOffset;isLE;buffer;view;finished=!1;length=0;pos=0;destroyed=!1;constructor(e,s,n,i){this.blockLen=e,this.outputLen=s,this.padOffset=n,this.isLE=i,this.buffer=new Uint8Array(e),this.view=Hs(this.buffer)}update(e){_i(this),$a(e);const{view:s,buffer:n,blockLen:i}=this,a=e.length;let r=!1;for(let h=0;h<a;){const u=Math.min(i-this.pos,a-h);if(u===i){const m=Hs(e);for(;i<=a-h;h+=i)this.process(m,h);r=!0;continue}n.set(h===0&&u===a?e:e.subarray(h,h+u),this.pos),this.pos+=u,h+=u,this.pos===i&&(this.process(s,0),this.pos=0,r=!0)}return this.length+=e.length,r&&this.roundClean(),this}digestInto(e){_i(this),fr(e,this),this.finished=!0;const{buffer:s,view:n,blockLen:i,isLE:a}=this;let{pos:r}=this;s[r++]=128,s.fill(0,r),this.padOffset>i-r&&(this.process(n,0),s.fill(0)),rr(n,i-8,this.length*8,a),this.process(n,0),this.roundClean();const h=e===s?n:Hs(e),u=this.outputLen,m=u/4,v=this.get();if(u%4||m>v.length)throw new Error("invalid outputLen");for(let f=0;f<m;f++)h.setUint32(4*f,v[f],a)}digest(){const{buffer:e,outputLen:s}=this;this.digestInto(e);const n=e.slice(0,s);return this.destroy(),n}_cloneIntoMeta(e){const{buffer:s,length:n,finished:i,destroyed:a,pos:r}=this;return e.destroyed=a,e.finished=i,e.length=n,e.pos=r,r&&e.buffer.set(s),e}clone(){return this._cloneInto()}}const kr=Uint32Array.from([1779033703,4089235720,3144134277,2227873595,1013904242,4271175723,2773480762,1595750129,1359893119,2917565137,2600822924,725511199,528734635,4215389547,1541459225,327033209]),ka=ir(["0x428a2f98d728ae22","0x7137449123ef65cd","0xb5c0fbcfec4d3b2f","0xe9b5dba58189dbbc","0x3956c25bf348b538","0x59f111f1b605d019","0x923f82a4af194f9b","0xab1c5ed5da6d8118","0xd807aa98a3030242","0x12835b0145706fbe","0x243185be4ee4b28c","0x550c7dc3d5ffb4e2","0x72be5d74f27b896f","0x80deb1fe3b1696b1","0x9bdc06a725c71235","0xc19bf174cf692694","0xe49b69c19ef14ad2","0xefbe4786384f25e3","0x0fc19dc68b8cd5b5","0x240ca1cc77ac9c65","0x2de92c6f592b0275","0x4a7484aa6ea6e483","0x5cb0a9dcbd41fbd4","0x76f988da831153b5","0x983e5152ee66dfab","0xa831c66d2db43210","0xb00327c898fb213f","0xbf597fc7beef0ee4","0xc6e00bf33da88fc2","0xd5a79147930aa725","0x06ca6351e003826f","0x142929670a0e6e70","0x27b70a8546d22ffc","0x2e1b21385c26c926","0x4d2c6dfc5ac42aed","0x53380d139d95b3df","0x650a73548baf63de","0x766a0abb3c77b2a8","0x81c2c92e47edaee6","0x92722c851482353b","0xa2bfe8a14cf10364","0xa81a664bbc423001","0xc24b8b70d0f89791","0xc76c51a30654be30","0xd192e819d6ef5218","0xd69906245565a910","0xf40e35855771202a","0x106aa07032bbd1b8","0x19a4c116b8d2d0c8","0x1e376c085141ab53","0x2748774cdf8eeb99","0x34b0bcb5e19b48a8","0x391c0cb3c5c95a63","0x4ed8aa4ae3418acb","0x5b9cca4f7763e373","0x682e6ff3d6b2b8a3","0x748f82ee5defb2fc","0x78a5636f43172f60","0x84c87814a1f0ab72","0x8cc702081a6439ec","0x90befffa23631e28","0xa4506cebde82bde9","0xbef9a3f7b2c67915","0xc67178f2e372532b","0xca273eceea26619c","0xd186b8c721c0c207","0xeada7dd6cde0eb1e","0xf57d4f7fee6ed178","0x06f067aa72176fba","0x0a637dc5a2c898a6","0x113f9804bef90dae","0x1b710b35131c471b","0x28db77f523047d84","0x32caab7b40c72493","0x3c9ebe0a15c9bebc","0x431d67c49c100d4c","0x4cc5d4becb3e42b6","0x597f299cfc657e2a","0x5fcb6fab3ad6faec","0x6c44198c4a475817"].map(t=>BigInt(t))),wr=ka[0],xr=ka[1],_e=new Uint32Array(80),ze=new Uint32Array(80);class Sr extends $r{Ah=0;Al=0;Bh=0;Bl=0;Ch=0;Cl=0;Dh=0;Dl=0;Eh=0;El=0;Fh=0;Fl=0;Gh=0;Gl=0;Hh=0;Hl=0;constructor(e,s){super(128,e,16,!1),this.Ah=s[0]|0,this.Al=s[1]|0,this.Bh=s[2]|0,this.Bl=s[3]|0,this.Ch=s[4]|0,this.Cl=s[5]|0,this.Dh=s[6]|0,this.Dl=s[7]|0,this.Eh=s[8]|0,this.El=s[9]|0,this.Fh=s[10]|0,this.Fl=s[11]|0,this.Gh=s[12]|0,this.Gl=s[13]|0,this.Hh=s[14]|0,this.Hl=s[15]|0}get(){const{Ah:e,Al:s,Bh:n,Bl:i,Ch:a,Cl:r,Dh:h,Dl:u,Eh:m,El:v,Fh:f,Fl:x,Gh:M,Gl:A,Hh:P,Hl:I}=this;return[e,s,n,i,a,r,h,u,m,v,f,x,M,A,P,I]}set(e,s,n,i,a,r,h,u,m,v,f,x,M,A,P,I){this.Ah=e|0,this.Al=s|0,this.Bh=n|0,this.Bl=i|0,this.Ch=a|0,this.Cl=r|0,this.Dh=h|0,this.Dl=u|0,this.Eh=m|0,this.El=v|0,this.Fh=f|0,this.Fl=x|0,this.Gh=M|0,this.Gl=A|0,this.Hh=P|0,this.Hl=I|0}_cloneInto(e){return(e||=new this.constructor).set(...this.get()),this._cloneIntoMeta(e)}process(e,s){for(let z=0;z<16;z++,s+=4)_e[z]=e.getUint32(s),ze[z]=e.getUint32(s+=4);for(let z=16;z<80;z++){const W=_e[z-15]|0,j=ze[z-15]|0,Q=it(W,j,1)^it(W,j,8)^Ti(W,j,7),he=at(W,j,1)^at(W,j,8)^Ai(W,j,7),oe=_e[z-2]|0,N=ze[z-2]|0,ce=it(oe,N,19)^Qt(oe,N,61)^Ti(oe,N,6),Oe=at(oe,N,19)^Zt(oe,N,61)^Ai(oe,N,6),Le=dr(he,Oe,ze[z-7],ze[z-16]),xe=hr(Le,Q,ce,_e[z-7],_e[z-16]);_e[z]=xe|0,ze[z]=Le|0}let{Ah:n,Al:i,Bh:a,Bl:r,Ch:h,Cl:u,Dh:m,Dl:v,Eh:f,El:x,Fh:M,Fl:A,Gh:P,Gl:I,Hh:G,Hl:te}=this;for(let z=0;z<80;z++){const W=it(f,x,14)^it(f,x,18)^Qt(f,x,41),j=at(f,x,14)^at(f,x,18)^Zt(f,x,41),Q=f&M^~f&P,he=x&A^~x&I,oe=ur(te,j,he,xr[z],ze[z]),N=pr(oe,G,W,Q,wr[z],_e[z]),ce=oe|0,Oe=it(n,i,28)^Qt(n,i,34)^Qt(n,i,39),Le=at(n,i,28)^Zt(n,i,34)^Zt(n,i,39),xe=n&a^n&h^a&h,Lt=i&r^i&u^r&u;G=P|0,te=I|0,P=M|0,I=A|0,M=f|0,A=x|0,{h:f,l:x}=Ce(m|0,v|0,N|0,ce|0),m=h|0,v=u|0,h=a|0,u=r|0,a=n|0,r=i|0;const Se=lr(ce,Le,Lt);n=cr(Se,N,Oe,xe),i=Se|0}({h:n,l:i}=Ce(this.Ah|0,this.Al|0,n|0,i|0)),{h:a,l:r}=Ce(this.Bh|0,this.Bl|0,a|0,r|0),{h,l:u}=Ce(this.Ch|0,this.Cl|0,h|0,u|0),{h:m,l:v}=Ce(this.Dh|0,this.Dl|0,m|0,v|0),{h:f,l:x}=Ce(this.Eh|0,this.El|0,f|0,x|0),{h:M,l:A}=Ce(this.Fh|0,this.Fl|0,M|0,A|0),{h:P,l:I}=Ce(this.Gh|0,this.Gl|0,P|0,I|0),{h:G,l:te}=Ce(this.Hh|0,this.Hl|0,G|0,te|0),this.set(n,i,a,r,h,u,m,v,f,x,M,A,P,I,G,te)}roundClean(){zi(_e,ze)}destroy(){this.destroyed=!0,zi(this.buffer),this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0)}}class Cr extends Sr{constructor(){super(64,kr)}}const Tr=yr(()=>new Cr,br(3));ba.sha512=Tr;const wa="openclaw-webui.device-identity.v1",bs="openclaw-webui.device-tokens.v1";function nn(t){let e="";for(const s of t)e+=String.fromCharCode(s);return btoa(e).replaceAll("+","-").replaceAll("/","_").replace(/=+$/g,"")}function Ar(t){const e=t.replaceAll("-","+").replaceAll("_","/"),s=e+"=".repeat((4-e.length%4)%4),n=atob(s),i=new Uint8Array(n.length);for(let a=0;a<n.length;a++)i[a]=n.charCodeAt(a);return i}async function Er(t){const e=await crypto.subtle.digest("SHA-256",t.slice().buffer);return Array.from(new Uint8Array(e)).map(s=>s.toString(16).padStart(2,"0")).join("")}async function Mr(){if(typeof crypto>"u"||!crypto.subtle||!crypto.getRandomValues)return null;try{const t=_r();if(t)return t;const e=er.randomSecretKey(),s=await Yo(e),n={deviceId:await Er(s),publicKey:nn(s),privateKey:nn(e)};return localStorage.setItem(wa,JSON.stringify({version:1,...n})),n}catch(t){console.error("[device-identity] 生成失败:",t);try{sessionStorage.setItem("openclaw-webui.identity-error",String(t))}catch{}return null}}function _r(){try{const t=localStorage.getItem(wa);if(!t)return null;const e=JSON.parse(t);return e?.version===1&&typeof e.deviceId=="string"&&typeof e.publicKey=="string"&&typeof e.privateKey=="string"?{deviceId:e.deviceId,publicKey:e.publicKey,privateKey:e.privateKey}:null}catch{return null}}function zr(t){return["v2",t.deviceId,t.clientId,t.clientMode,t.role,t.scopes.join(","),String(t.signedAtMs),t.token??"",t.nonce].join("|")}async function Rr(t,e){const s=await Zo(new TextEncoder().encode(e),Ar(t));return nn(s)}function xa(){try{const t=localStorage.getItem(bs);if(!t)return null;const e=JSON.parse(t);return e?.version===1&&typeof e.deviceId=="string"?{version:1,deviceId:e.deviceId,tokens:e.tokens??{}}:null}catch{return null}}function Pr(t,e){const s=xa();return!s||s.deviceId!==t?null:s.tokens[e]??null}function Ir(){try{const t=localStorage.getItem(bs);if(!t)return!1;const e=JSON.parse(t);return e?.version===1&&typeof e.deviceId=="string"&&!!e.tokens?.operator?.token}catch{return!1}}function Or(){try{localStorage.removeItem(bs)}catch{}}function Lr(t,e,s,n){try{const i=xa()??{version:1,deviceId:t,tokens:{}};if(i.deviceId!==t)return;i.tokens[e]={token:s,role:e,scopes:n,updatedAtMs:Date.now()},localStorage.setItem(bs,JSON.stringify(i))}catch{}}const Fs={id:"openclaw-control-ui",version:"0.1.0",platform:"web",mode:"ui"},qs=["operator.admin","operator.read","operator.write","operator.approvals","operator.pairing"],Dr=3e4,Xt=800,Nr=15e3,He=10;class Ur{constructor(){this.ws=null,this.creds=null,this.identity=null,this.reqSeq=0,this.pending=new Map,this.listeners=new Map,this.backoffMs=Xt,this.reconnectAttempt=0,this.reconnectTimer=null,this.connectNonce=null,this.manualClose=!1,this.authFailed=!1,this.hello=null,this.state="idle",this.lastError=null,this.pairingRequired=!1,this.reconnectState={attempt:0,maxAttempts:He,delayMs:0,gaveUp:!1}}on(e,s){return this.listeners.has(e)||this.listeners.set(e,new Set),this.listeners.get(e).add(s),()=>this.listeners.get(e)?.delete(s)}emit(e,s){this.listeners.get(e)?.forEach(n=>{try{n(s)}catch(i){console.error("[gw] listener error",i)}})}get snapshot(){return this.hello}async connect(e){this.creds=e,this.manualClose=!1,this.authFailed=!1,this.backoffMs=Xt,this.reconnectAttempt=0,this.reconnectState={attempt:0,maxAttempts:He,delayMs:0,gaveUp:!1},this.identity=await Mr(),this.openSocket()}disconnect(){if(this.manualClose=!0,this.clearReconnect(),this.ws){try{this.ws.close()}catch{}this.ws=null}this.setState("idle")}setState(e){this.state!==e&&(this.state=e,this.emit("state",e))}openSocket(){if(!this.creds)return;this.setState("connecting"),this.connectNonce=null;let e;try{e=new WebSocket(this.creds.url)}catch(s){this.lastError={code:"INVALID_URL",message:String(s)},this.scheduleReconnect();return}this.ws=e,e.onmessage=s=>this.onFrame(s.data),e.onopen=()=>{},e.onerror=()=>{},e.onclose=s=>{if(this.rejectAllPending(new Error("connection closed")),!this.manualClose){if(s.code===1008&&/pairing/i.test(s.reason||"")){this.pairingRequired=!0,this.lastError={code:"PAIRING_REQUIRED",message:s.reason||"pairing required"},this.emit("pairing-required",this.lastError),this.setState("disconnected"),this.scheduleReconnect();return}if(s.code===1008&&/device identity/i.test(s.reason||"")){this.lastError={code:"DEVICE_IDENTITY_REQUIRED",message:s.reason||"device identity required"},this.authFailed=!0,this.emit("device-identity-failed",this.lastError),this.setState("disconnected");return}if(this.authFailed){this.setState("disconnected");return}this.setState("disconnected"),this.scheduleReconnect()}}}scheduleReconnect(){if(this.manualClose||this.authFailed)return;if(this.clearReconnect(),this.reconnectAttempt++,this.reconnectAttempt>He){this.reconnectState={attempt:this.reconnectAttempt,maxAttempts:He,delayMs:0,gaveUp:!0},this.emit("reconnect-gave-up",this.reconnectState),this.setState("disconnected");return}const e=.5+Math.random()*.5,s=Math.round(this.backoffMs*e);this.backoffMs=Math.min(this.backoffMs*2,Nr),this.reconnectState={attempt:this.reconnectAttempt,maxAttempts:He,delayMs:s,gaveUp:!1},this.reconnectTimer=window.setTimeout(()=>this.openSocket(),s),this.emit("reconnect-scheduled",this.reconnectState)}retryNow(){this.backoffMs=Xt,this.reconnectAttempt=0,this.reconnectState={attempt:0,maxAttempts:He,delayMs:0,gaveUp:!1},this.clearReconnect(),this.openSocket()}clearReconnect(){this.reconnectTimer!==null&&(clearTimeout(this.reconnectTimer),this.reconnectTimer=null)}async onFrame(e){let s;try{s=JSON.parse(e)}catch{return}if(s.type==="event"){await this.handleEvent(s);return}s.type==="res"&&this.handleResponse(s)}async handleEvent(e){switch(e.event){case"connect.challenge":{this.connectNonce=e.payload?.nonce??null,await this.sendConnect();return}case"chat":this.emit("chat",e.payload);return;case"agent":this.emit("agent",e.payload);return;case"sessions.changed":this.emit("sessions-changed",e.payload);return;case"shutdown":this.emit("gateway-shutdown",e.payload);return;default:this.emit(e.event,e.payload)}}async sendConnect(){if(!this.ws||!this.creds||this.ws.readyState!==WebSocket.OPEN)return;const e=this.connectNonce??"",s=Date.now();let n=this.creds.token||void 0,i=!1;if(!n&&this.identity){const h=Pr(this.identity.deviceId,"operator");h&&(n=h.token,i=!0)}const a=zr({deviceId:this.identity?.deviceId??"",clientId:Fs.id,clientMode:Fs.mode,role:"operator",scopes:qs,signedAtMs:s,token:n??null,nonce:e}),r=this.identity?{id:this.identity.deviceId,publicKey:this.identity.publicKey,signature:await Rr(this.identity.privateKey,a),signedAt:s,nonce:e}:void 0;this.request("connect",{minProtocol:4,maxProtocol:4,client:Fs,role:"operator",scopes:qs,caps:["tool-events"],commands:[],permissions:{},auth:n?{token:n}:{},locale:navigator.language?.startsWith("zh")?"zh-CN":"en-US",userAgent:"openclaw-webui/0.1.0",device:r}).then(h=>{this.hello=h,this.backoffMs=Xt,this.reconnectAttempt=0,this.reconnectState={attempt:0,maxAttempts:He,delayMs:0,gaveUp:!1},this.pairingRequired=!1,this.lastError=null;const u=this.hello.auth?.deviceToken;u&&this.identity&&Lr(this.identity.deviceId,"operator",u,this.hello.auth?.scopes??qs),i&&this.emit("device-token-auth",null),this.setState("connected"),this.emit("hello",this.hello)}).catch(h=>{this.handleConnectError(h)})}handleConnectError(e){const s=e;if(this.lastError=s,s.code==="AUTH_TOKEN_MISMATCH"||s.code==="AUTH_UNAUTHORIZED"){this.authFailed=!0,this.emit("auth-failed",s),this.setState("disconnected"),this.ws?.close();return}if(s.code==="AUTH_SCOPE_MISMATCH"){try{localStorage.removeItem("openclaw-webui.device-tokens.v1")}catch{}this.ws?.close();return}if(s.code==="AUTH_RATE_LIMITED"||/rate.?limit|lockout|尝试过于频繁/i.test(s.message??"")){this.authFailed=!0,this.emit("auth-rate-limited",s),this.setState("disconnected"),this.ws?.close();return}if((s.code==="NOT_PAIRED"||s.details?.code==="PAIRING_REQUIRED")&&(this.pairingRequired=!0,this.emit("pairing-required",s)),s.code==="UNAVAILABLE"){const n=typeof s.retryAfterMs=="number"&&s.retryAfterMs>0?s.retryAfterMs:2e3;this.ws?.close(),this.clearReconnect(),this.reconnectTimer=window.setTimeout(()=>this.openSocket(),Math.min(n,1e4)),this.setState("connecting");return}this.emit("connect-error",s),this.ws?.close()}handleResponse(e){const s=this.pending.get(e.id);s&&(clearTimeout(s.timer),this.pending.delete(e.id),e.ok?s.resolve(e.payload):s.reject(Object.assign(new Error(e.error?.message??"gateway error"),e.error??{})))}request(e,s){return new Promise((n,i)=>{if(!this.ws||this.ws.readyState!==WebSocket.OPEN){i(new Error("not connected"));return}const a=`r${++this.reqSeq}`,r=window.setTimeout(()=>{this.pending.delete(a),i(new Error(`request timeout: ${e}`))},Dr);this.pending.set(a,{resolve:n,reject:i,timer:r}),this.ws.send(JSON.stringify({type:"req",id:a,method:e,params:s}))})}rejectAllPending(e){for(const[,s]of this.pending)clearTimeout(s.timer),s.reject(e);this.pending.clear()}async listSessions(){return(await this.request("sessions.list",{limit:100}))?.sessions??[]}async patchSession(e,s){return this.request("sessions.patch",{key:e,...s})}async createSession(){const e=await this.request("sessions.create",{});if(!e?.key)throw new Error("sessions.create returned no key");return e.key}async chatHistory(e,s){const n={sessionKey:e};return s&&(n.maxChars=s),this.request("chat.history",n)}async chatSend(e,s,n,i){const a={sessionKey:e,message:s,deliver:!1,idempotencyKey:n};return i&&(a.sessionId=i),this.request("chat.send",a)}async chatAbort(e){return this.request("chat.abort",{sessionKey:e})}async systemInfo(){return this.request("system.info",{})}async listCronJobs(){return(await this.request("cron.list",{}))?.jobs??[]}async cronRuns(e,s=5){return(await this.request("cron.runs",{id:e,limit:s}))?.entries??[]}async cronRun(e){return this.request("cron.run",{id:e})}async cronUpdate(e,s){return this.request("cron.update",{jobId:e,patch:s})}async cronRemove(e){return this.request("cron.remove",{id:e})}async listSkills(){return(await this.request("skills.status",{}))?.skills??[]}mapSkill(e){return{id:e.slug??e.id??"",name:e.displayName??e.name??e.slug??"",description:e.summary??e.description??"",author:e.owner?.handle??e.author??"",version:e.latestVersion?.version??e.version??"",downloads:e.stats?.downloads??e.downloads??0,installs:e.stats?.installs??0,stars:e.stats?.stars??0,category:e.topics?.[0]??e.category??"",tags:e.topics??e.tags??[],lastUpdated:e.updatedAt?new Date(e.updatedAt).toISOString():void 0}}async marketplaceList(e,s,n=50){const i=this.marketplaceBaseUrl(),a=new URLSearchParams({limit:String(n)});s&&a.set("cursor",s),e&&a.set("prefix",e),a.set("sort","updated");const r=`${i}/api/v1/skills?${a}`,h=await fetch(r);if(!h.ok)throw new Error(`ClawHub list failed: ${h.status}`);const u=await h.json(),m=(u.items??[]).map(v=>this.mapSkill(v));return{items:m,total:u.total??m.length,page:s?void 0:1,hasMore:!!u.nextCursor,nextCursor:u.nextCursor??void 0}}async marketplaceSearch(e,s=20){const n=this.marketplaceBaseUrl(),i=new URLSearchParams({q:e,limit:String(s)}),a=`${n}/api/v1/search?${i}`,r=await fetch(a);if(!r.ok)throw new Error(`ClawHub search failed: ${r.status}`);const u=((await r.json()).results??[]).map(m=>this.mapSkill(m));return{items:u,total:u.length,hasMore:!1}}async marketplaceDetail(e){const n=`${this.marketplaceBaseUrl()}/api/v1/skills/${encodeURIComponent(e)}`,i=await fetch(n);if(!i.ok)return null;const a=await i.json();return this.mapSkill(a.skill??a)}marketplaceDownloadUrl(e,s){const n=this.marketplaceBaseUrl(),i=new URLSearchParams({slug:e});return s&&i.set("version",s),`${n}/api/v1/download?${i}`}async marketplaceInstall(e){try{return await this.request("skills.install",{id:e})}catch{return this.configPatch({skills:{entries:{[e]:{enabled:!0}}}},{note:`openclaw-webui: 安装技能 ${e}`})}}marketplaceBaseUrl(){return"https://clawhub.ai"}async listModels(){return(await this.request("models.list",{}))?.models??[]}async listNodes(){return(await this.request("node.list",{}))?.nodes??[]}async listDevices(){const e=await this.request("device.pair.list",{});return{pending:e?.pending??[],paired:e?.paired??[]}}async deviceApprove(e){return this.request("device.pair.approve",{requestId:e})}async deviceReject(e){return this.request("device.pair.reject",{requestId:e})}async presence(){const e=await this.request("system-presence",{});return Array.isArray(e)?e:e?.entries??[]}async channelsStatus(){return this.request("channels.status",{})}async logsTail(e){const s={};return e!==void 0&&(s.cursor=e),this.request("logs.tail",s)}async configGet(){const e=await this.request("config.get",{});return{hash:e?.hash??"",config:e?.config??{}}}async configPatch(e,s){const i={baseHash:(await this.configGet()).hash,raw:JSON.stringify(e),note:s?.note??"openclaw-webui"};s?.replacePaths?.length&&(i.replacePaths=s.replacePaths),await this.request("config.patch",i)}async sessionsUsage(){return(await this.request("sessions.usage",{agentScope:"all"}))?.sessions??[]}async cronAdd(e){return this.request("cron.add",e)}async cronUpdateJob(e,s){return this.request("cron.update",{jobId:e,patch:s})}async workspaceList(e,s){return(await this.request("agents.workspace.list",{agentId:e,path:s}))?.entries??[]}async workspaceGet(e,s){return(await this.request("agents.workspace.get",{agentId:e,path:s}))?.file??null}async dreamDiary(){return this.request("doctor.memory.dreamDiary",{})}async agentsList(){return this.request("agents.list",{})}async ttsStatus(){return this.request("tts.status",{})}async health(){return this.request("health",{})}async rawRpc(e,s){return this.request(e,s)}async ttsEnable(){return this.request("tts.enable",{})}async ttsDisable(){return this.request("tts.disable",{})}async ttsSetProvider(e){return this.request("tts.setProvider",{provider:e})}async setSkillEnabled(e,s){return this.configPatch({skills:{entries:{[e]:{enabled:s}}}},{note:`openclaw-webui: 技能 ${e} ${s?"启用":"禁用"}`})}async deviceSetupCode(){return this.request("device.pair.setupCode",{})}async channelsLogout(e){return this.request("channels.logout",{channel:e})}async execApprovalsGet(){return this.request("exec.approvals.get",{})}async updateStatus(){return this.request("update.status",{})}async gatewayUpdate(){return this.request("update.run",{})}}function Ri(t){const[e,s]=t.split(":").map(n=>parseInt(n,10)||0);return`${Math.min(59,Math.max(0,s))} ${Math.min(23,Math.max(0,e))} * * *`}const Pi="openclaw-webui.gateway-url",js="openclaw-webui.gateway-token";class Br{constructor(){this.client=new Ur,this.view="chat",this.connState="idle",this.pairingError=null,this.authFailed=!1,this.deviceIdentityFailed=!1,this.sessions=[],this.currentSessionKey=null,this.currentSessionId=null,this.messages=[],this.historyLoading=!1,this.stream={active:!1,runId:null,toolBusy:null,recentTools:[]},this.draftText="",this.systemInfo=null,this.cronJobs=[],this.skills=[],this.reconnectState={attempt:0,maxAttempts:10,delayMs:0,gaveUp:!1},this.marketplaceOpen=!1,this.marketplaceItems=[],this.marketplaceLoading=!1,this.marketplaceError=null,this.marketplaceInstalling=new Set,this.marketplaceQuery="",this.marketplaceCategory="",this.marketplacePage=1,this.marketplaceHasMore=!1,this.marketplaceNextCursor=void 0,this.marketplaceSources=[],this.marketplaceSelectedSource="",this.marketplaceDetailItem=null,this.marketplaceCategories=[],this.models=[],this.nodes=[],this.devicesPending=[],this.devicesPaired=[],this.presenceList=[],this.channels=null,this.logLines=[],this.logsFollowing=!1,this.subs=new Set,this.infoTimer=null,this.logsTimer=null,this.logsCursor=void 0,this.unsubscribers=[],this.branding={},this.agentsList=null,this.ttsInfo=null,this.healthInfo=null,this.mcpServers=null,this.configProviders=[],this.configProvidersRaw={},this.configChannels={},this.configError=null,this.securityInfo=null,this.agentDefaults=null,this.lastConfigJson="",this.toolsConfig=null,this.loggingConfig=null,this.hooksConfig=null,this.gatewayConfig=null,this.cronConfig=null,this.ttsConfig=null,this.agentEntries=null,this.usageByModel=[],this.usageTotals={input:0,output:0,cacheRead:0,cacheWrite:0,totalTokens:0,totalCost:0},this.usageSessionCount=0,this.usageRange="",this.usageLoading=!1,this.usageHiddenModels=[],this.usageQuotas=[],this.memoryFiles=[],this.memoryContent=null,this.memoryLoading=!1,this.dreamDiary=null,this.dreamLoading=!1,this.SOURCES_KEY="openclaw-webui.marketplace-sources",this.loadBranding(),this.loadUsageLocal()}get lastError(){return this.client.lastError}subscribe(e){return this.subs.add(e),()=>this.subs.delete(e)}emit(){for(const e of this.subs)try{e()}catch(s){console.error(s)}}loadBranding(){try{const e=localStorage.getItem("openclaw-webui.branding");e&&(this.branding=JSON.parse(e)??{})}catch{}}setBranding(e,s){this.branding={...this.branding},s?this.branding[e]=s:delete this.branding[e];try{localStorage.setItem("openclaw-webui.branding",JSON.stringify(this.branding))}catch{}this.emit()}async loadAgents(){if(this.client.state==="connected")try{this.agentsList=await this.client.agentsList(),this.emit()}catch(e){console.error("[store] agents.list failed",e)}}async loadTts(){if(this.client.state==="connected")try{this.ttsInfo=await this.client.ttsStatus(),this.emit()}catch(e){console.error("[store] tts.status failed",e)}}async loadHealth(){if(this.client.state==="connected")try{this.healthInfo=await this.client.health(),this.emit()}catch(e){console.error("[store] health failed",e)}}async rawRpc(e,s){return this.client.rawRpc(e,s)}async ttsSetEnabled(e){try{await(e?this.client.ttsEnable():this.client.ttsDisable()),await this.loadTts()}catch(s){console.error("[store] tts toggle failed",s)}}async ttsSetProvider(e){try{await this.client.ttsSetProvider(e),await this.loadTts()}catch(s){console.error("[store] tts provider failed",s)}}async setSkillEnabled(e,s){try{await this.client.setSkillEnabled(e,s),await this.refreshSkills()}catch(n){console.error("[store] skill toggle failed",n)}}async deviceSetupCode(){return this.client.deviceSetupCode()}async logoutChannel(e){try{await this.client.channelsLogout(e)}catch(s){console.error("[store] channels.logout failed",s)}}async gatewayUpdate(){try{return{ok:!0,result:await this.client.gatewayUpdate()}}catch(e){return{ok:!1,error:String(e.message??e)}}}async updateStatus(){return this.client.updateStatus()}async addMcpServer(e,s){try{return await this.client.configPatch({mcp:{servers:{[e]:s}}},{note:`openclaw-webui: 新增 MCP ${e}`}),await this.refreshConfigProviders(),{ok:!0}}catch(n){return{ok:!1,error:String(n.message??n)}}}async updateMcpServer(e,s){try{return await this.client.configPatch({mcp:{servers:{[e]:s}}},{replacePaths:[`mcp.servers.${e}`],note:`openclaw-webui: 更新 MCP ${e}`}),await this.refreshConfigProviders(),{ok:!0}}catch(n){return{ok:!1,error:String(n.message??n)}}}async removeMcpServer(e){try{const s={mcp:{servers:{[e]:null}}};try{await this.client.configPatch(s,{note:`openclaw-webui: 删除 MCP ${e}`})}catch{await this.client.configPatch(s,{replacePaths:[`mcp.servers.${e}`],note:`openclaw-webui: 删除 MCP ${e}`})}return await this.refreshConfigProviders(),{ok:!0}}catch(s){return{ok:!1,error:String(s.message??s)}}}async saveExecApprovals(e){try{return await this.client.configPatch({execApprovals:e},{replacePaths:["execApprovals"],note:"openclaw-webui: 更新 exec-approvals"}),await this.refreshConfigProviders(),{ok:!0}}catch(s){return{ok:!1,error:String(s.message??s)}}}getGatewayUrl(){const e=sessionStorage.getItem(Pi);return e||(typeof location<"u"&&location.protocol.startsWith("http")&&location.port!=="5173"?`${location.protocol==="https:"?"wss":"ws"}://${location.host}`:"ws://127.0.0.1:18789")}getToken(){return sessionStorage.getItem(js)||""}saveCreds(e,s){e&&sessionStorage.setItem(Pi,e),s&&sessionStorage.setItem(js,s)}canDeviceLogin(){return Ir()}hasCreds(){return!!this.getToken()||this.canDeviceLogin()}async start(){this.hasCreds()&&(this.bindClient(),await this.client.connect({url:this.getGatewayUrl(),token:this.getToken()}))}bindClient(){this.unsubscribers.length||(this.unsubscribers=[this.client.on("state",e=>{this.connState=e,e==="connected"&&(this.authFailed=!1),this.emit()}),this.client.on("hello",async()=>{if(await this.refreshSessions(),await this.refreshSystemInfo(),this.refreshConfigProviders(),this.startInfoLoop(),!this.currentSessionKey){const s=this.sessions.find(n=>n.key.endsWith(":main"))??this.sessions.find(n=>!n.archived);s&&await this.selectSession(s.key)}this.emit()}),this.client.on("pairing-required",e=>{this.pairingError=e?.message??"pairing required",this.emit()}),this.client.on("auth-failed",()=>{this.authFailed=!0,sessionStorage.removeItem(js),Or(),this.emit()}),this.client.on("reconnect-scheduled",e=>{this.reconnectState=e,this.emit()}),this.client.on("reconnect-gave-up",e=>{this.reconnectState=e,this.emit()}),this.client.on("device-identity-failed",()=>{this.deviceIdentityFailed=!0,this.emit()}),this.client.on("chat",e=>this.handleChatEvent(e)),this.client.on("agent",e=>this.handleAgentEvent(e)),this.client.on("sessions-changed",()=>{window.setTimeout(()=>{this.refreshSessions()},400)}),this.client.on("gateway-shutdown",()=>{})])}stop(){for(const e of this.unsubscribers)e();this.unsubscribers=[],this.stopInfoLoop(),this.stopLogsLoop(),this.client.disconnect(),this.connState="idle",this.sessions=[],this.messages=[],this.cronJobs=[],this.skills=[],this.models=[],this.nodes=[],this.devicesPending=[],this.devicesPaired=[],this.presenceList=[],this.logLines=[],this.currentSessionKey=null,this.currentSessionId=null,this.stream={active:!1,runId:null,toolBusy:null,recentTools:[]},this.emit()}retryNow(){this.pairingError=null,this.authFailed=!1,this.deviceIdentityFailed=!1,this.connState!=="connecting"&&(this.client.state==="disconnected"||this.client.state==="idle"?this.start():this.client.retryNow())}setView(e){this.view=e,e==="status"&&(this.refreshSystemInfo(),this.refreshModels()),e==="cron"&&this.refreshCron(),e==="skills"&&this.refreshSkills(),e==="devices"&&this.refreshDevices(),e==="logs"?this.startLogsLoop():this.stopLogsLoop(),this.emit()}async refreshSessions(){if(this.client.state==="connected")try{this.sessions=await this.client.listSessions(),this.emit()}catch(e){console.error("[store] sessions.list failed",e)}}async selectSession(e){this.currentSessionKey=e,this.currentSessionId=null,this.messages=[],this.stream={active:!1,runId:null,toolBusy:null,recentTools:[]},this.emit(),await this.loadHistory()}async loadHistory(){if(this.currentSessionKey){this.historyLoading=!0,this.emit();try{const e=await this.client.chatHistory(this.currentSessionKey);if(this.currentSessionKey!==e.sessionKey)return;this.messages=e.messages??[],this.currentSessionId=e.sessionId??null}catch(e){console.error("[store] chat.history failed",e)}finally{this.historyLoading=!1,this.emit()}}}async newSession(){try{const e=await this.client.createSession();return await this.refreshSessions(),await this.selectSession(e),this.setView("chat"),e}catch(e){return console.error("[store] new session failed",e),null}}async patchSession(e,s){try{await this.client.patchSession(e,s),await this.refreshSessions()}catch(n){console.error("[store] sessions.patch failed",n)}}get currentModel(){const e=this.sessions.find(n=>n.key===this.currentSessionKey);if(!e)return"";const s=e.modelProvider;return s?`${s}/${e.model??""}`:e.model??""}async setSessionModel(e){!this.currentSessionKey||!e||await this.patchSession(this.currentSessionKey,{model:e})}async refreshConfigProviders(){if(this.client.state==="connected")try{const{config:e}=await this.client.configGet();this.lastConfigJson=JSON.stringify(e,null,2);const s=e.models?.providers??{};this.configProvidersRaw=s,this.configProviders=Object.entries(s).map(([a,r])=>{const h=r;return{name:a,baseUrl:h?.baseUrl,api:h?.api,modelIds:(h?.models??[]).map(u=>u?.id??"").filter(Boolean)}}),this.configChannels=e.channels??{},this.mcpServers=e.mcp?.servers??{};const n=e;this.securityInfo={authMode:n?.gateway?.auth?.mode,toolProfile:n?.tools?.profile},this.agentDefaults=e.agents?.defaults??{},this.toolsConfig=e.tools??{},this.loggingConfig=e.logging??{},this.hooksConfig=e.hooks??{},this.gatewayConfig=e.gateway??{},this.cronConfig=e.cron??{},this.ttsConfig=e.tts??{};const i=e.agents?.entries??{};this.agentEntries=Object.entries(i).map(([a,r])=>({id:a,config:r})),this.configError=null,this.emit()}catch(e){console.error("[store] config.get failed",e)}}async patchAgentDefaults(e){try{const s={agents:{defaults:e}};try{await this.client.configPatch(s,{note:"openclaw-webui: 更新 Agent Defaults"})}catch{const n=Object.keys(e).map(i=>`agents.defaults.${i}`);await this.client.configPatch(s,{replacePaths:n,note:"openclaw-webui: 更新 Agent Defaults"})}return this.configError=null,await this.refreshConfigProviders(),{ok:!0}}catch(s){const n=String(s.message??s);return this.configError=n,this.emit(),{ok:!1,error:n}}}async patchConfig(e,s,n){try{const i={};i[e]=s;try{await this.client.configPatch(i,{note:`openclaw-webui: ${n}`})}catch{const a=Object.keys(s).map(r=>`${e}.${r}`);await this.client.configPatch(i,{replacePaths:a,note:`openclaw-webui: ${n}`})}return this.configError=null,await this.refreshConfigProviders(),{ok:!0}}catch(i){const a=String(i.message??i);return this.configError=a,this.emit(),{ok:!1,error:a}}}async patchTools(e){return this.patchConfig("tools",e,"更新工具设置")}async patchLogging(e){return this.patchConfig("logging",e,"更新日志设置")}async patchHooks(e){return this.patchConfig("hooks",e,"更新钩子设置")}async patchGateway(e){return this.patchConfig("gateway",e,"更新网关网络设置")}async patchCronConfig(e){return this.patchConfig("cron",e,"更新Cron全局设置")}async patchTts(e){return this.patchConfig("tts",e,"更新语音设置")}async patchAgentEntry(e,s){return this.patchConfig(`agents.entries.${e}`,s,`更新代理 ${e} 覆盖`)}async addChannel(e,s){try{return await this.client.configPatch({channels:{[e]:s}},{note:`openclaw-webui: 新增渠道 ${e}`}),this.configError=null,await this.refreshConfigProviders(),{ok:!0}}catch(n){const i=String(n.message??n);return this.configError=i,this.emit(),{ok:!1,error:i}}}async removeChannel(e){try{const s={channels:{[e]:null}};try{await this.client.configPatch(s,{note:`openclaw-webui: 删除渠道 ${e}`})}catch{await this.client.configPatch(s,{replacePaths:[`channels.${e}`],note:`openclaw-webui: 删除渠道 ${e}`})}return this.configError=null,await this.refreshConfigProviders(),{ok:!0}}catch(s){const n=String(s.message??s);return this.configError=n,this.emit(),{ok:!1,error:n}}}async updateProviderModels(e,s){try{const n={models:s.models};return s.baseUrl!==void 0&&(n.baseUrl=s.baseUrl),await this.client.configPatch({models:{providers:{[e]:n}}},{replacePaths:[`models.providers.${e}.models`],note:`openclaw-webui: 更新模型 ${e}`}),this.configError=null,await Promise.all([this.refreshConfigProviders(),this.refreshModels()]),{ok:!0}}catch(n){const i=String(n.message??n);return this.configError=i,this.emit(),{ok:!1,error:i}}}get currentThinking(){return this.sessions.find(s=>s.key===this.currentSessionKey)?.thinkingDefault??""}get currentThinkingLevels(){const s=this.sessions.find(n=>n.key===this.currentSessionKey)?.thinkingLevels;return s?.length?s:[{id:"off",label:"关"}]}get currentFastMode(){return!!this.sessions.find(s=>s.key===this.currentSessionKey)?.effectiveFastMode}async setSessionThinking(e){!this.currentSessionKey||!e||await this.patchSession(this.currentSessionKey,{thinkingLevel:e})}async setSessionFastMode(e){this.currentSessionKey&&await this.patchSession(this.currentSessionKey,{fastMode:e})}channelRows(){const e=this.channels;if(!e)return[];const s=e.channelMeta??Object.keys(e.channels??{}).map(i=>({id:i,label:i})),n=e.channelAccounts??{};return s.map(i=>{const a=e.channels?.[i.id]??{},r=i.id in n,h=a.connected?"已连接":a.running?"运行中":a.configured||r?"已配置":"未配置";return{id:i.id,label:i.label??i.id,state:h}})}loadUsageLocal(){try{this.usageHiddenModels=JSON.parse(localStorage.getItem("openclaw-webui.usage-hidden")??"[]")}catch{this.usageHiddenModels=[]}try{this.usageQuotas=JSON.parse(localStorage.getItem("openclaw-webui.usage-quotas")??"[]")}catch{this.usageQuotas=[]}}saveUsageLocal(){try{localStorage.setItem("openclaw-webui.usage-hidden",JSON.stringify(this.usageHiddenModels)),localStorage.setItem("openclaw-webui.usage-quotas",JSON.stringify(this.usageQuotas))}catch{}}toggleHideModel(e){this.usageHiddenModels=this.usageHiddenModels.includes(e)?this.usageHiddenModels.filter(s=>s!==e):[...this.usageHiddenModels,e],this.saveUsageLocal(),this.emit()}scopedUsedTokens(e){return e?this.usageByModel.filter(s=>s.provider===e).reduce((s,n)=>s+n.totalTokens,0):this.usageTotals.totalTokens}addQuota(e,s,n){this.usageQuotas=[...this.usageQuotas,{id:crypto.randomUUID(),label:e,provider:s,totalTokens:n,baselineTokens:this.scopedUsedTokens(s),createdAtMs:Date.now()}],this.saveUsageLocal(),this.emit()}removeQuota(e){this.usageQuotas=this.usageQuotas.filter(s=>s.id!==e),this.saveUsageLocal(),this.emit()}quotaRemain(e){return e.totalTokens-(this.scopedUsedTokens(e.provider)-e.baselineTokens)}async refreshUsage(){if(this.client.state==="connected"){this.loadUsageLocal(),this.usageLoading=!0,this.emit();try{const e=await this.client.sessionsUsage(),s=new Map,n={input:0,output:0,cacheRead:0,cacheWrite:0,totalTokens:0,totalCost:0};let i=0;for(const a of e){const r=a.usage;if(!r)continue;i++;const h=`${a.modelProvider??"未知"}/${a.model??"未知"}`,u=a.modelProvider??"未知",m=s.get(h)??{model:h,provider:u,sessions:0,input:0,output:0,cacheRead:0,cacheWrite:0,totalTokens:0,totalCost:0};m.sessions++,m.input+=r.input??0,m.output+=r.output??0,m.cacheRead+=r.cacheRead??0,m.cacheWrite+=r.cacheWrite??0,m.totalTokens+=r.totalTokens??0,m.totalCost+=r.totalCost??0,s.set(h,m),n.input+=r.input??0,n.output+=r.output??0,n.cacheRead+=r.cacheRead??0,n.cacheWrite+=r.cacheWrite??0,n.totalTokens+=r.totalTokens??0,n.totalCost+=r.totalCost??0}this.usageByModel=[...s.values()].sort((a,r)=>r.totalCost-a.totalCost),this.usageTotals=n,this.usageSessionCount=i,this.usageRange="全部记录",this.emit()}catch(e){console.error("[store] sessions.usage failed",e)}finally{this.usageLoading=!1,this.emit()}}}async addModelProvider(e){try{const s={id:e.modelId,name:e.modelName||e.modelId,contextWindow:e.contextWindow??131072,maxTokens:e.maxTokens??8192,input:["text"],reasoning:!1};return(e.costInput!==void 0||e.costCacheRead!==void 0||e.costOutput!==void 0)&&(s.cost={...e.costInput!==void 0?{input:e.costInput}:{},...e.costCacheRead!==void 0?{cacheRead:e.costCacheRead}:{},...e.costOutput!==void 0?{output:e.costOutput}:{}}),await this.client.configPatch({models:{providers:{[e.name]:{baseUrl:e.baseUrl,api:e.api||"openai-completions",apiKey:e.apiKey,models:[s]}}}},{note:`openclaw-webui: 新增模型 ${e.name}/${e.modelId}`}),this.configError=null,await Promise.all([this.refreshConfigProviders(),this.refreshModels()]),{ok:!0}}catch(s){const n=String(s.message??s);return this.configError=n,this.emit(),{ok:!1,error:n}}}async removeModelProvider(e){try{return await this.client.configPatch({models:{providers:{[e]:null}}},{replacePaths:[`models.providers.${e}.models`],note:`openclaw-webui: 删除模型 ${e}`}),this.configError=null,await Promise.all([this.refreshConfigProviders(),this.refreshModels()]),{ok:!0}}catch(s){const n=String(s.message??s);return this.configError=n,this.emit(),{ok:!1,error:n}}}async sendMessage(e){if(!this.currentSessionKey||!e.trim())return;const s=crypto.randomUUID();this.messages=[...this.messages,{role:"user",content:e,timestamp:Date.now()}],this.stream={active:!0,runId:s,toolBusy:null,recentTools:[]},this.draftText="",this.emit();try{await this.client.chatSend(this.currentSessionKey,e,s,this.currentSessionId??void 0)}catch(n){this.stream={active:!1,runId:null,toolBusy:null,recentTools:[]},console.error("[store] chat.send failed",n),this.emit()}}async abortRun(){if(this.currentSessionKey)try{await this.client.chatAbort(this.currentSessionKey)}catch(e){console.error("[store] chat.abort failed",e)}}handleChatEvent(e){if(e.sessionKey!==this.currentSessionKey){this.refreshSessions();return}if(e.state==="delta"||e.state==="final"||e.state==="replace"){const s=e.message;if(!s)return;if(s.role==="assistant"){const n=[...this.messages],i=n.length-1,a=n[i];a&&a.role==="assistant"&&this.isStreamingAssistant(a)?n[i]={...s}:n.push({...s}),this.messages=n}}e.state==="final"&&(this.stream={active:!1,runId:null,toolBusy:null,recentTools:this.stream.recentTools},window.setTimeout(()=>{this.loadHistory()},350)),this.emit()}isStreamingAssistant(e){return Array.isArray(e.content)&&!("responseId"in e)&&!("usage"in e)}handleAgentEvent(e){if(e.sessionKey===this.currentSessionKey&&!(!this.stream.active&&this.stream.runId!==e.runId)&&e.stream==="tool"){const s=e.data??{};if(s.phase==="start"||s.phase==="begin")this.stream={...this.stream,toolBusy:String(s.name??"")};else if(s.phase==="end"||s.phase==="finish"){const n=[...this.stream.recentTools],i=n.findIndex(r=>r.toolCallId===s.toolCallId),a={toolCallId:s.toolCallId,name:s.name,output:typeof s.result=="string"?s.result.slice(0,4e3):void 0,isError:!!s.isError};i>=0?n[i]=a:n.push(a),this.stream={...this.stream,toolBusy:this.stream.toolBusy===s.name?null:this.stream.toolBusy,recentTools:n.slice(-6)},this.emit()}}}async refreshSystemInfo(){if(this.client.state==="connected")try{this.systemInfo=await this.client.systemInfo(),this.emit()}catch{}}startInfoLoop(){this.stopInfoLoop(),this.infoTimer=window.setInterval(()=>{this.refreshSystemInfo()},1e4)}stopInfoLoop(){this.infoTimer!==null&&(clearInterval(this.infoTimer),this.infoTimer=null)}async refreshCron(){if(this.client.state==="connected")try{this.cronJobs=await this.client.listCronJobs(),this.emit()}catch(e){console.error("[store] cron.list failed",e)}}async cronRunNow(e){try{await this.client.cronRun(e),await this.refreshCron()}catch(s){console.error(s)}}async cronToggle(e,s){try{await this.client.cronUpdate(e,{enabled:s}),await this.refreshCron()}catch(n){console.error(n)}}async cronDelete(e){try{await this.client.cronRemove(e),await this.refreshCron()}catch(s){console.error(s)}}async cronCreate(e){const s=e.kind==="every"?{kind:"every",everyMs:Math.max(1,e.everyMinutes??30)*6e4}:e.kind==="daily"?{kind:"cron",expr:Ri(e.dailyTime??"09:00")}:{kind:"cron",expr:e.cronExpr??"0 9 * * *"};try{return await this.client.cronAdd({name:e.name,description:e.description||void 0,schedule:s,payload:{kind:"agentTurn",message:e.message},sessionTarget:"isolated",enabled:!0}),await this.refreshCron(),{ok:!0}}catch(n){return{ok:!1,error:String(n.message??n)}}}async cronUpdateJob(e,s){const n=s.kind==="every"?{kind:"every",everyMs:Math.max(1,s.everyMinutes??30)*6e4}:s.kind==="daily"?{kind:"cron",expr:Ri(s.dailyTime??"09:00")}:{kind:"cron",expr:s.cronExpr??"0 9 * * *"};try{return await this.client.cronUpdateJob(e,{name:s.name,description:s.description||void 0,schedule:n,payload:{kind:"agentTurn",message:s.message},...s.enabled!==void 0?{enabled:s.enabled}:{}}),await this.refreshCron(),{ok:!0}}catch(i){return{ok:!1,error:String(i.message??i)}}}async loadMemoryFiles(){if(this.client.state==="connected"){this.memoryLoading=!0,this.emit();try{const e=await this.client.workspaceList("main","."),s=e.some(a=>a.name==="MEMORY.md"),n=e.find(a=>a.name==="memory"&&a.kind==="directory");let i=[];n&&(i=(await this.client.workspaceList("main","memory")).filter(a=>a.kind==="file"&&a.name.endsWith(".md"))),this.memoryFiles=[...s?[{path:"MEMORY.md",name:"MEMORY.md",kind:"file",size:void 0,updatedAtMs:void 0}]:[],...i.sort((a,r)=>(r.updatedAtMs??0)-(a.updatedAtMs??0))],this.memoryFiles.length&&!this.memoryContent&&await this.loadMemoryContent(this.memoryFiles[0].path)}catch(e){console.error("[store] workspace list failed",e)}finally{this.memoryLoading=!1,this.emit()}}}async loadMemoryContent(e){try{const s=await this.client.workspaceGet("main",e);s?.content!==void 0&&(this.memoryContent={path:e,content:s.content},this.emit())}catch(s){console.error("[store] workspace get failed",s)}}async loadDreamDiary(){if(this.client.state==="connected"){this.dreamLoading=!0,this.emit();try{this.dreamDiary=await this.client.dreamDiary(),this.emit()}catch(e){console.error("[store] dreamDiary failed",e)}finally{this.dreamLoading=!1,this.emit()}}}async refreshSkills(){if(this.client.state==="connected")try{this.skills=await this.client.listSkills(),this.emit()}catch(e){console.error("[store] skills.status failed",e)}}async refreshModels(){if(this.client.state==="connected")try{this.models=await this.client.listModels(),this.emit()}catch(e){console.error("[store] models.list failed",e)}}async refreshDevices(){if(this.client.state==="connected")try{const[e,s,n,i]=await Promise.all([this.client.listDevices(),this.client.listNodes().catch(()=>[]),this.client.presence().catch(()=>[]),this.client.channelsStatus().catch(()=>null)]);this.devicesPending=e.pending,this.devicesPaired=e.paired,this.nodes=s,this.presenceList=n,this.channels=i,this.emit()}catch(e){console.error("[store] refreshDevices failed",e)}}async approveDevice(e){try{await this.client.deviceApprove(e),await this.refreshDevices()}catch(s){console.error(s)}}async rejectDevice(e){try{await this.client.deviceReject(e),await this.refreshDevices()}catch(s){console.error(s)}}startLogsLoop(){this.stopLogsLoop(),this.logsFollowing=!0,this.fetchLogs(),this.logsTimer=window.setInterval(()=>{this.fetchLogs()},3e3)}stopLogsLoop(){this.logsFollowing=!1,this.logsTimer!==null&&(clearInterval(this.logsTimer),this.logsTimer=null)}clearLogs(){this.logLines=[],this.logsCursor=void 0,this.emit()}async fetchLogs(){if(this.client.state==="connected")try{const e=await this.client.logsTail(this.logsCursor);typeof e.cursor=="number"&&(this.logsCursor=e.cursor);const s=[];for(const n of e.lines??[]){const i=typeof n=="string"?n:JSON.stringify(n);let a="",r=i;try{const h=typeof n=="string"?JSON.parse(n):n;if(h&&typeof h=="object"){const u=h,m=u._meta;m?.date&&(a=String(m.date).slice(11,19)),typeof u[1]=="string"?r=u[1]:typeof u.msg=="string"&&(r=u.msg)}}catch{}s.push({time:a,message:r,raw:i})}s.length&&(this.logLines=[...this.logLines,...s].slice(-600),this.emit())}catch{this.logsCursor!==void 0&&(this.logsCursor=void 0)}}loadSources(){let e=[];try{const n=localStorage.getItem(this.SOURCES_KEY);n&&(e=JSON.parse(n))}catch{}const s=[{id:"clawhub",name:"ClawHub",url:"https://clawhub.ai",enabled:!0,isDefault:!0}];this.marketplaceSources=[...s,...e]}saveCustomSources(){const e=this.marketplaceSources.filter(s=>!s.isDefault);try{localStorage.setItem(this.SOURCES_KEY,JSON.stringify(e))}catch{}}enabledSources(){return this.marketplaceSources.filter(e=>e.enabled)}addMarketplaceSource(e){this.marketplaceSources=[...this.marketplaceSources,{...e,isDefault:!1}],this.saveCustomSources(),this.emit()}removeMarketplaceSource(e){this.marketplaceSources=this.marketplaceSources.filter(s=>s.id!==e),this.saveCustomSources(),this.emit()}toggleSource(e){const s=this.marketplaceSources.find(n=>n.id===e);s&&(s.enabled=!s.enabled,s.isDefault?this.marketplaceSources=[...this.marketplaceSources]:this.saveCustomSources(),this.emit())}async toggleMarketplace(){this.marketplaceOpen=!this.marketplaceOpen,this.emit(),this.marketplaceOpen&&(this.loadSources(),await this.refreshMarketplace())}async refreshMarketplace(){this.client.state==="connected"&&await this.refreshSkills(),await this.loadMarketplace(),this.syncMarketplaceStatus()}syncMarketplaceStatus(){const e=new Map;for(const s of this.skills)e.set(s.name,s.skillKey??s.name);this.marketplaceItems=this.marketplaceItems.map(s=>{const n=e.has(s.name);let i="notInstalled";return n&&(i=s.version&&s.installedVersion&&s.version>s.installedVersion?"updateAvailable":"installed"),{...s,installed:n,status:i}}),this.emit()}async loadMarketplace(){this.marketplaceLoading=!0,this.marketplaceError=null,this.emit();try{const e=await this.client.marketplaceList(this.marketplaceCategory||void 0,this.marketplaceNextCursor);this.marketplaceItems=e.items,this.marketplaceHasMore=e.hasMore??!1,this.marketplaceNextCursor=e.nextCursor,e.categories&&(this.marketplaceCategories=e.categories),this.syncMarketplaceStatus(),this.emit()}catch(e){this.marketplaceError=String(e.message??e),console.error("[store] skills.market.list failed",e)}finally{this.marketplaceLoading=!1,this.emit()}}async searchMarketplace(e){this.marketplaceQuery=e,this.marketplacePage=1,this.marketplaceNextCursor=void 0,this.marketplaceLoading=!0,this.marketplaceError=null,this.emit();try{const s=e.trim()?await this.client.marketplaceSearch(e.trim()):await this.client.marketplaceList(this.marketplaceCategory||void 0);this.marketplaceItems=s.items,this.marketplaceHasMore=s.hasMore??!1,this.marketplaceNextCursor=s.nextCursor,this.syncMarketplaceStatus(),this.emit()}catch(s){this.marketplaceError=String(s.message??s),console.error("[store] skills.market.search failed",s)}finally{this.marketplaceLoading=!1,this.emit()}}setMarketplaceCategory(e){this.marketplaceCategory=e,this.marketplacePage=1,this.marketplaceNextCursor=void 0,this.loadMarketplace()}nextPage(){this.marketplaceHasMore&&(this.marketplacePage++,this.loadMarketplace())}prevPage(){this.marketplacePage<=1||(this.marketplacePage--,this.marketplaceNextCursor=void 0,this.loadMarketplace())}openDetail(e){this.marketplaceDetailItem=e,this.emit(),e&&this.loadDetail(e.id)}async loadDetail(e){try{const s=await this.client.marketplaceDetail(e);s&&(this.marketplaceDetailItem=s,this.emit())}catch{}}downloadUrl(e,s){return this.client.marketplaceDownloadUrl(e,s)}async installSkill(e){const n=this.marketplaceItems.find(i=>i.id===e)?.name??e;if(this.marketplaceInstalling.has(e))return{ok:!1,error:"installing",skillName:n};this.marketplaceInstalling.add(e),this.emit();try{await this.client.marketplaceInstall(e);const i=this.marketplaceItems.findIndex(a=>a.id===e);return i>=0&&(this.marketplaceItems[i]={...this.marketplaceItems[i],installed:!0,status:"installed"},this.marketplaceItems=[...this.marketplaceItems]),this.emit(),{ok:!0,skillName:n}}catch(i){const a=String(i.message??i);return console.error("[store] skills.install failed",i),{ok:!1,error:a,skillName:n}}finally{this.marketplaceInstalling.delete(e),this.emit()}}}const l=new Br,Sa="openclaw-webui.locale",Hr={appName:{zh:"OpenClaw 控制台",en:"OpenClaw Console"},loading:{zh:"加载中…",en:"Loading…"},retry:{zh:"立即重试",en:"Retry now"},cancel:{zh:"取消",en:"Cancel"},save:{zh:"保存",en:"Save"},confirm:{zh:"确认",en:"Confirm"},delete:{zh:"删除",en:"Delete"},empty:{zh:"暂无内容",en:"Nothing here yet"},error:{zh:"出错了",en:"Something went wrong"},navChat:{zh:"聊天",en:"Chat"},navSessions:{zh:"会话",en:"Sessions"},navCron:{zh:"任务",en:"Cron"},navSkills:{zh:"技能",en:"Skills"},navDevices:{zh:"设备",en:"Devices"},navLogs:{zh:"日志",en:"Logs"},navUsage:{zh:"用量",en:"Usage"},navStatus:{zh:"状态",en:"Status"},navSettings:{zh:"设置",en:"Settings"},connConnected:{zh:"已连接",en:"Connected"},connConnecting:{zh:"连接中…",en:"Connecting…"},connDisconnected:{zh:"连接断开,正在重连…",en:"Connection lost — reconnecting…"},connNeedAuth:{zh:"需要登录",en:"Sign-in required"},settingsLanguage:{zh:"语言 / Language",en:"Language / 语言"},settingsConnection:{zh:"网关连接",en:"Gateway connection"},settingsGatewayUrl:{zh:"网关地址",en:"Gateway URL"},settingsToken:{zh:"访问令牌",en:"Access token"},settingsTokenHint:{zh:"令牌仅保存在当前标签页(sessionStorage),关闭标签页即清除,不会写入磁盘。",en:"Token is kept in this tab only (sessionStorage) and cleared when the tab closes."},settingsConnect:{zh:"连接",en:"Connect"},settingsDisconnect:{zh:"断开",en:"Disconnect"},settingsConnected:{zh:"已连接,网关版本 {version}",en:"Connected, gateway version {version}"},settingsAppearance:{zh:"外观",en:"Appearance"},settingsThemeFollow:{zh:"深浅色跟随系统",en:"Follow system light/dark"},settingsAbout:{zh:"关于",en:"About"},settingsAboutText:{zh:"第三方 OpenClaw Gateway 控制面板,直连 Gateway WebSocket 协议(protocol v4)。纯本地应用,不外发任何数据。",en:"A third-party OpenClaw Gateway control panel speaking the Gateway WebSocket protocol (protocol v4). Fully local, no data leaves this device."},loginTitle:{zh:"连接到 OpenClaw Gateway",en:"Connect to OpenClaw Gateway"},loginSubtitle:{zh:"输入网关访问令牌开始使用(见 openclaw.json 的 gateway.auth.token)",en:"Enter the gateway access token to begin (gateway.auth.token in openclaw.json)"},deviceQuickLogin:{zh:"快速登录(已配对设备)",en:"Quick sign-in (paired device)"},deviceQuickLoginHint:{zh:"本浏览器已配对过,无需再输令牌",en:"This browser is already paired — no token needed"},deviceLoginOr:{zh:"或使用令牌登录",en:"or sign in with token"},loginNoSecureContext:{zh:"当前页面不是安全上下文,无法使用 WebCrypto。请通过 http://127.0.0.1 或 https 访问。",en:"This page is not a secure context, so WebCrypto is unavailable. Use http://127.0.0.1 or https."},chatNewSession:{zh:"新聊天",en:"New chat"},chatModelPicker:{zh:"切换本会话使用的模型",en:"Switch model for this session"},chatPlaceholder:{zh:"输入消息…(Enter 发送,Shift+Enter 换行)",en:"Type a message… (Enter to send, Shift+Enter for newline)"},chatSend:{zh:"发送",en:"Send"},chatStop:{zh:"停止",en:"Stop"},chatThinking:{zh:"正在思考…",en:"Thinking…"},chatRunningTool:{zh:"正在执行工具:{name}",en:"Running tool: {name}"},chatRunFinished:{zh:"回复完成",en:"Reply complete"},chatRunAborted:{zh:"已中止",en:"Aborted"},chatToolOutput:{zh:"工具输出",en:"Tool output"},chatToolCall:{zh:"工具调用",en:"Tool call"},chatNoSession:{zh:"选择或创建一个会话开始聊天",en:"Select or create a session to start chatting"},chatHistoryOmitted:{zh:"[消息过大,已省略]",en:"[Message too large, omitted]"},chatCompacted:{zh:"—— 历史已压缩 ——",en:"— History compacted —"},sessionsTitle:{zh:"全部会话",en:"All sessions"},sessionsPinned:{zh:"置顶",en:"Pinned"},sessionsOthers:{zh:"最近",en:"Recent"},sessionsArchived:{zh:"已归档",en:"Archived"},sessionsRename:{zh:"重命名",en:"Rename"},sessionsPin:{zh:"置顶",en:"Pin"},sessionsUnpin:{zh:"取消置顶",en:"Unpin"},sessionsArchive:{zh:"归档",en:"Archive"},sessionsUnarchive:{zh:"恢复",en:"Unarchive"},sessionsShowArchived:{zh:"显示已归档",en:"Show archived"},sessionsHideArchived:{zh:"隐藏已归档",en:"Hide archived"},sessionsNewName:{zh:"新的会话名称",en:"New session name"},sessionsEmpty:{zh:"还没有会话,去聊天页新建一个吧",en:"No sessions yet — create one from the Chat tab"},sessionsActiveRun:{zh:"运行中",en:"Active"},sessionsUnread:{zh:"有新消息",en:"Unread"},statusTitle:{zh:"网关主机状态",en:"Gateway host status"},statusMachine:{zh:"主机",en:"Machine"},statusOS:{zh:"系统",en:"OS"},statusCPU:{zh:"处理器",en:"CPU"},statusLoad:{zh:"负载 (1/5/15min)",en:"Load (1/5/15min)"},statusMemory:{zh:"内存",en:"Memory"},statusDisk:{zh:"磁盘",en:"Disk"},statusUptime:{zh:"运行时长",en:"Uptime"},statusGateway:{zh:"网关",en:"Gateway"},statusNode:{zh:"Node 版本",en:"Node version"},statusLan:{zh:"局域网地址",en:"LAN address"},statusUsedTotal:{zh:"已用 / 总量",en:"Used / Total"},statusPath:{zh:"路径",en:"Path"},statusModels:{zh:"可用模型",en:"Available models"},statusRefreshEvery:{zh:"每 10 秒自动刷新",en:"Auto-refreshes every 10s"},cronTitle:{zh:"定时任务",en:"Cron jobs"},cronNew:{zh:"新建任务",en:"New job"},cronEdit:{zh:"编辑任务",en:"Edit job"},cronEditing:{zh:"编辑「{name}」",en:'Editing "{name}"'},cronCreated:{zh:"任务已创建",en:"Job created"},cronSaved:{zh:"任务已保存",en:"Job saved"},cronFieldName:{zh:"任务名称",en:"Name"},cronFieldKind:{zh:"执行频率",en:"Schedule"},cronKindEvery:{zh:"每N分钟",en:"Every N min"},cronKindDaily:{zh:"每天定时",en:"Daily at"},cronEveryMinutes:{zh:"间隔(分钟)",en:"Interval (min)"},cronDailyTime:{zh:"每天执行时间",en:"Time of day"},cronCronExpr:{zh:"Cron 表达式",en:"Cron expression"},cronFieldDesc:{zh:"任务说明(可选)",en:"Description (optional)"},cronFieldMessage:{zh:"执行内容(发给 AI 的指令)",en:"Prompt sent to the agent"},cronMessageHint:{zh:"例如:检查系统负载,异常时通知我",en:"e.g. Check system load and notify me if abnormal"},cronNext:{zh:"下次",en:"Next"},cronLast:{zh:"上次",en:"Last"},cronRunNow:{zh:"立即运行",en:"Run now"},cronEnable:{zh:"启用",en:"Enable"},cronDisable:{zh:"停用",en:"Disable"},cronDisabled:{zh:"已停用",en:"Disabled"},cronLastError:{zh:"上次运行出错",en:"Last run failed"},cronIsolated:{zh:"隔离会话",en:"Isolated"},cronEmpty:{zh:"没有定时任务",en:"No cron jobs"},cronDeleteConfirm:{zh:"确定删除任务「{name}」?",en:'Delete job "{name}"?'},skillsTitle:{zh:"技能",en:"Skills"},skillsReady:{zh:"可用",en:"ready"},skillsSearch:{zh:"搜索技能名称或描述…",en:"Search skills…"},skillBundled:{zh:"内置",en:"Bundled"},skillCustom:{zh:"自定义",en:"Custom"},skillDisabled:{zh:"已禁用",en:"Disabled"},skillIneligible:{zh:"不可用",en:"Unavailable"},tabInstalled:{zh:"已安装",en:"Installed"},tabMarketplace:{zh:"市场",en:"Marketplace"},marketplaceTitle:{zh:"技能市场",en:"Skill Marketplace"},marketplaceSearch:{zh:"搜索技能…",en:"Search skills…"},marketplaceInstall:{zh:"安装",en:"Install"},marketplaceInstalling:{zh:"安装中…",en:"Installing…"},marketplaceInstalled:{zh:"已安装",en:"Installed"},marketplaceDownloads:{zh:"{n} 次下载",en:"{n} downloads"},marketplaceCategory:{zh:"分类",en:"Category"},marketplaceCategoryAll:{zh:"全部",en:"All"},marketplaceNoResults:{zh:"没有找到相关技能",en:"No skills found"},marketplaceLoading:{zh:"加载市场列表…",en:"Loading marketplace…"},marketplaceError:{zh:"加载失败,请稍后重试",en:"Failed to load, please retry"},marketplaceEnableNow:{zh:"安装完成,是否立即启用?",en:"Install finished — enable now?"},marketplaceEnableHint:{zh:"启用后技能立即可用。",en:"The skill will be available immediately."},marketplaceEnableYes:{zh:"启用",en:"Enable"},marketplaceEnableNo:{zh:"稍后",en:"Later"},marketplaceBack:{zh:"返回已安装",en:"Back to installed"},marketplaceRetry:{zh:"重试",en:"Retry"},marketplaceAuthor:{zh:"作者: {name}",en:"by {name}"},marketplaceVersion:{zh:"版本 {v}",en:"v{v}"},marketplaceNoDesc:{zh:"暂无描述",en:"No description"},skillUpdate:{zh:"更新",en:"Update"},skillUpdateAvailable:{zh:"可更新",en:"Update available"},marketplaceSourcesTitle:{zh:"市场来源",en:"Marketplace Sources"},marketplaceSourcesHint:{zh:"添加自定义市场链接,支持多个来源同时浏览。",en:"Add custom marketplace URLs. Browse from multiple sources at once."},sourceName:{zh:"名称",en:"Name"},sourceUrl:{zh:"市场地址",en:"Marketplace URL"},sourceApiKey:{zh:"API Key(可选)",en:"API Key (optional)"},sourceAdd:{zh:"添加来源",en:"Add Source"},sourceAddBtn:{zh:"添加",en:"Add"},sourceDefault:{zh:"默认",en:"Default"},sourceCustom:{zh:"自定义",en:"Custom"},sourceEnabled:{zh:"已启用",en:"Enabled"},sourceDisabled:{zh:"已禁用",en:"Disabled"},reconnecting:{zh:"连接断开,{s}秒后重连...",en:"Reconnecting in {s}s..."},reconnectGaveUp:{zh:"连接失败,请检查网关后重试",en:"Connection failed. Please check the gateway and retry."},reconnectNow:{zh:"立即重连",en:"Reconnect now"},devicesTitle:{zh:"设备与节点",en:"Devices & nodes"},devicesPending:{zh:"待配对请求",en:"Pending pairing"},devicesPaired:{zh:"已配对设备",en:"Paired devices"},devicesNodes:{zh:"节点",en:"Nodes"},devicesPresence:{zh:"在线状态",en:"Presence"},devicesPendingHint:{zh:"新设备请求接入网关,确认后批准",en:"A new device wants to connect. Approve if you trust it."},deviceApprove:{zh:"批准",en:"Approve"},deviceReject:{zh:"拒绝",en:"Reject"},deviceOnline:{zh:"在线",en:"Online"},deviceConnected:{zh:"已连接",en:"Connected"},deviceOffline:{zh:"离线",en:"Offline"},logsTitle:{zh:"网关日志",en:"Gateway logs"},logsFollow:{zh:"跟随底部",en:"Follow"},logsClear:{zh:"清空",en:"Clear"},logsSearch:{zh:"过滤日志…",en:"Filter logs…"},prefTitle:{zh:"会话偏好",en:"Session preferences"},prefForSession:{zh:"当前会话",en:"current session"},prefModel:{zh:"模型",en:"Model"},prefThinking:{zh:"思考深度",en:"Thinking"},prefFast:{zh:"极速模式",en:"Fast mode"},prefFastOn:{zh:"开",en:"On"},prefFastOff:{zh:"关",en:"Off"},prefSessionHint:{zh:"以上设置立即生效,只影响当前选中的会话;模型也可在聊天页顶部切换。",en:"Applies to the selected session immediately. Model is also switchable in the chat header."},prefNoSession:{zh:"先在聊天页选择一个会话,再调整这些设置。",en:"Select a session in Chat first, then adjust."},channelsTitle:{zh:"渠道",en:"Channels"},channelsEmpty:{zh:"暂无渠道(或网关刚重启,渠道加载中)",en:"No channels yet (or still loading after gateway restart)"},channelAdd:{zh:"新增渠道",en:"Add channel"},channelSetup:{zh:"配置 {name}",en:"Set up {name}"},channelPickHint:{zh:"选择要接入的渠道,凭据来自对应平台的机器人/应用后台",en:"Pick a channel; credentials come from its bot/app console"},channelSaved:{zh:"渠道「{id}」已写入配置",en:'Channel "{id}" saved to config'},channelDeleted:{zh:"渠道「{id}」已删除",en:'Channel "{id}" removed'},channelDelete:{zh:"删除渠道配置",en:"Remove channel config"},channelDeleteConfirm:{zh:"确定删除渠道「{id}」的配置?",en:'Remove channel "{id}" config?'},channelConfigured:{zh:"已配置",en:"Configured"},channelRestartHint:{zh:"⚠ 渠道配置需重启网关生效:在 Mac 终端执行 openclaw-webui/scripts/config-tools.sh restart-gateway",en:"Needs gateway restart: run openclaw-webui/scripts/config-tools.sh restart-gateway"},channelCustom:{zh:"自定义渠道",en:"Custom channel"},channelCustomId:{zh:"渠道 ID(小写字母/数字/短横线)",en:"Channel ID (lowercase/digits/dash)"},channelCustomJson:{zh:"渠道配置(JSON)",en:"Channel config (JSON)"},channelCustomHint:{zh:'字段名参考 openclaw.json 文档对应渠道章节;启用一般写 "enabled": true',en:'Field names follow the channel docs; typically include "enabled": true'},setSecGeneral:{zh:"通用",en:"General"},setSecSession:{zh:"会话",en:"Session"},setSecModels:{zh:"模型",en:"Models"},setSecChannels:{zh:"渠道",en:"Channels"},setSecComms:{zh:"通信",en:"Comms"},setSecMcp:{zh:"MCP",en:"MCP"},setSecAgents:{zh:"代理",en:"Agents"},setSecMemory:{zh:"记忆",en:"Memory"},setSecSecurity:{zh:"安全",en:"Security"},setSecInfra:{zh:"基础设施",en:"Infra"},setSecDebug:{zh:"调试",en:"Debug"},setSecConnection:{zh:"连接",en:"Connection"},setSecAbout:{zh:"关于",en:"About"},setSecAdvanced:{zh:"高级",en:"Advanced"},setSecLogs:{zh:"日志",en:"Logs"},setSecAutomation:{zh:"自动化",en:"Automation"},setSecTools:{zh:"工具",en:"Tools"},setSecLogging:{zh:"日志设置",en:"Logging"},setSecHooks:{zh:"钩子",en:"Hooks"},setSecGateway:{zh:"网关网络",en:"Gateway"},setSecTts:{zh:"语音(TTS)",en:"Voice"},setSecAgentEntries:{zh:"单代理",en:"Per-Agent"},setSecCronConfig:{zh:"Cron设置",en:"Cron"},toolsTitle:{zh:"工具设置",en:"Tools"},toolsHint:{zh:"控制代理可用的工具。profile 是预设配置档,allow/deny 是额外允许/禁止的工具。",en:"Control agent tools. profile is a preset; allow/deny are extra allow/forbid lists."},toolsProfile:{zh:"工具配置档",en:"Tool profile"},toolsElevated:{zh:"提权(Exec)",en:"Elevated (exec)"},toolsAllow:{zh:"额外允许(逗号分隔)",en:"Extra allow (comma-sep)"},toolsDeny:{zh:"禁止(逗号分隔)",en:"Forbid (comma-sep)"},loggingTitle:{zh:"日志设置",en:"Logging"},loggingHint:{zh:"控制网关日志级别与输出。改动需重启网关生效。",en:"Control gateway log level and output. Needs gateway restart."},loggingLevel:{zh:"日志级别",en:"Log level"},loggingStyle:{zh:"控制台格式",en:"Console style"},loggingFile:{zh:"日志文件路径",en:"Log file path"},loggingAudit:{zh:"审计日志",en:"Audit log"},hooksTitle:{zh:"钩子设置",en:"Hooks"},hooksHint:{zh:"管理网关内部钩子(如 session-memory)和安全策略。",en:"Manage gateway internal hooks (e.g. session-memory) and security policy."},hooksInject:{zh:"允许提示注入",en:"Allow prompt injection"},hooksAccess:{zh:"允许对话访问",en:"Allow conversation access"},hooksTimeout:{zh:"超时(ms)",en:"Timeout (ms)"},hooksInternal:{zh:"内部钩子",en:"Internal hooks"},gatewayNetTitle:{zh:"网关网络",en:"Gateway network"},gatewayNetHint:{zh:"控制网关监听地址与网络安全。",en:"Control gateway bind address and network security."},gatewayBind:{zh:"监听地址",en:"Bind address"},gatewayTailscale:{zh:"Tailscale",en:"Tailscale"},gatewayTls:{zh:"TLS",en:"TLS"},gatewayMode:{zh:"网关模式",en:"Gateway mode"},gatewayNetRestart:{zh:"⚠ 监听地址/TLS 改动需重启网关生效。",en:"⚠ Bind/TLS changes need gateway restart."},ttsTitle:{zh:"语音(TTS)设置",en:"Voice (TTS)"},ttsHint:{zh:"配置文本转语音提供商和自动播报策略。支持第三方提供商。",en:"Configure TTS providers and auto-speak policy. Third-party providers supported."},ttsProvider:{zh:"当前提供商",en:"Active provider"},ttsAuto:{zh:"自动播报",en:"Auto speak"},ttsProviders:{zh:"已配置提供商",en:"Configured providers"},ttsNone:{zh:"(无)",en:"(none)"},ttsNoKey:{zh:"未配置Key",en:"No key"},ttsAddProvider:{zh:"添加提供商",en:"Add provider"},agentEntriesTitle:{zh:"单代理覆盖",en:"Per-agent overrides"},agentEntriesHint:{zh:"为单个代理覆盖默认模型、工作区、思考等级等设置。",en:"Override default model, workspace, thinking level per agent."},agentsFastMode:{zh:"极速模式",en:"Fast mode"},agentsFastModeDesc:{zh:'代理循环的默认极速模式策略("auto"/true/false)。单个代理条目可覆盖。',en:'Default fast-mode policy for the agent loop ("auto", true, or false). Per-agent entries override it.'},cronConfigTitle:{zh:"Cron 全局设置",en:"Cron global settings"},cronConfigHint:{zh:"定时任务的全局开关与失败告警。",en:"Global cron toggle and failure alerts."},cronConfigEnabled:{zh:"启用定时任务",en:"Enable cron"},cronConfigRetention:{zh:"Session 保留",en:"Session retention"},cronConfigAlert:{zh:"失败告警",en:"Failure alert"},cronConfigAlertEnabled:{zh:"启用告警",en:"Enable alert"},cronConfigAlertMode:{zh:"告警方式",en:"Alert mode"},cronConfigAlertAfter:{zh:"连续失败N次后",en:"After N failures"},aboutUiVersion:{zh:"面板版本",en:"UI version"},aboutGatewayVersion:{zh:"网关版本",en:"Gateway version"},aboutProtocol:{zh:"协议",en:"Protocol"},aboutRepo:{zh:"源码仓库",en:"Source repo"},advancedTitle:{zh:"高级设置",en:"Advanced"},advancedHint:{zh:"外观、语言等全局偏好。网关核心配置请编辑 openclaw.json。",en:"Global preferences (appearance, language). Edit openclaw.json for gateway core config."},advancedLang:{zh:"语言",en:"Language"},advancedTheme:{zh:"外观",en:"Appearance"},logsPause:{zh:"暂停",en:"Pause"},logsHint:{zh:"从网关日志尾部读取,每 3 秒自动刷新。",en:"Tails the gateway log, auto-refreshes every 3s."},automationTitle:{zh:"自动化(定时任务)",en:"Automation (cron)"},automationHint:{zh:"管理网关定时任务(cron),定时向代理发送指令。",en:"Manage gateway cron jobs that periodically prompt an agent."},cronSchedule:{zh:"调度",en:"Schedule"},commsTitle:{zh:"通信(TTS / 语音)",en:"Comms (TTS / voice)"},commsTts:{zh:"语音合成",en:"TTS"},commsProvider:{zh:"提供商",en:"Provider"},commsAuto:{zh:"自动播报",en:"Auto speak"},commsOn:{zh:"开",en:"On"},commsOff:{zh:"关",en:"Off"},commsConfigured:{zh:"已配置",en:"Configured"},commsNotConfigured:{zh:"未配置",en:"Not set"},commsHint:{zh:"语音相关设置为只读展示;修改请编辑 openclaw.json 的 messages.tts / talk 段。",en:"Read-only. Edit messages.tts / talk in openclaw.json to change."},commsHintLive:{zh:"开关与提供商切换即时生效(网关保存)。",en:"Toggle and provider changes apply immediately on the gateway."},devicesSetupCodeBtn:{zh:"配对移动设备",en:"Pair mobile"},devicesSetupCodeTitle:{zh:"移动设备配对",en:"Pair mobile device"},devicesSetupCodeHint:{zh:"用 OpenClaw 手机 App 扫码,或复制配对码粘贴到 App 设置 → Gateway。配对码含一次性引导凭据,请勿外传。",en:"Scan with the OpenClaw mobile app, or paste the code in App → Settings → Gateway. Contains a one-time bootstrap token — keep it private."},devicesCopy:{zh:"复制配对码",en:"Copy code"},devicesCopied:{zh:"已复制",en:"Copied"},channelLogout:{zh:"登出该渠道账号",en:"Log out channel account"},channelLogoutConfirm:{zh:"确定登出渠道「{id}」的账号?登出后需重新登录才能继续收发消息。",en:'Log out channel "{id}"? You will need to log in again.'},channelLoggedOut:{zh:"渠道「{id}」已登出",en:'Channel "{id}" logged out'},securityExecTitle:{zh:"Exec 审批策略",en:"Exec approval policy"},securityExecHint:{zh:"命令执行审批的当前策略(只读)。修改请编辑 exec-approvals 或用官方 CLI。",en:"Current exec approval policy (read-only)."},updateConfirm:{zh:"确定检查并执行网关更新?更新成功后网关会自动重启(面板会短暂断线重连)。",en:"Check and run the gateway update? It restarts the gateway on success (brief disconnect)."},updateRunning:{zh:"正在执行网关更新…",en:"Running gateway update…"},updateDone:{zh:"更新流程已执行,网关可能正在重启,稍后自动重连",en:"Update executed; gateway may be restarting, reconnecting shortly…"},infraUpdateBtn:{zh:"检查并更新网关",en:"Check & update gateway"},infraUpdateHint:{zh:"调用网关自带的更新流程(update.run),成功后自动重启。",en:"Runs the gateway update flow (update.run); auto-restarts on success."},mcpTitle:{zh:"MCP 服务器",en:"MCP servers"},mcpEmpty:{zh:"还没有配置 MCP 服务器",en:"No MCP servers configured"},mcpAdd:{zh:"新增服务器",en:"Add server"},mcpName:{zh:"服务器名称",en:"Server name"},mcpJson:{zh:"服务器配置(JSON)",en:"Server config (JSON)"},mcpAddBtn:{zh:"添加 MCP 服务器",en:"Add MCP server"},mcpHint:{zh:"配置立即热生效,无需重启网关。字段参考 OpenClaw 文档 MCP 章节(stdio 用 command/args,远程用 url)。",en:"Applies hot, no restart needed. See OpenClaw MCP docs for fields (command/args for stdio, url for remote)."},mcpSaved:{zh:"MCP「{name}」已保存,立即生效",en:'MCP "{name}" saved, applies immediately'},mcpUpdated:{zh:"MCP「{name}」已更新",en:'MCP "{name}" updated'},mcpDeleted:{zh:"MCP「{name}」已删除",en:'MCP "{name}" removed'},mcpDeleteConfirm:{zh:"确定删除 MCP 服务器「{name}」?",en:'Remove MCP server "{name}"?'},mcpQuickTpl:{zh:"快速模板(点击填充):",en:"Quick templates:"},mcpTransport:{zh:"传输方式",en:"Transport"},mcpCommand:{zh:"命令",en:"Command"},mcpArgs:{zh:"参数(逗号分隔)",en:"Arguments (comma-sep)"},mcpUrl:{zh:"URL",en:"URL"},mcpHeaders:{zh:"请求头(每行 key=value)",en:"Headers (key=value per line)"},mcpEnv:{zh:"环境变量(每行 key=value)",en:"Environment (key=value per line)"},mcpTimeout:{zh:"超时(ms)",en:"Timeout (ms)"},mcpEditing:{zh:"编辑「{name}」",en:'Editing "{name}"'},mcpSaveEdit:{zh:"保存修改",en:"Save changes"},mcpErrorCmdOrUrl:{zh:"请填写命令或 URL",en:"Command or URL required"},edit:{zh:"编辑",en:"Edit"},agentsTitle:{zh:"AI 与代理",en:"AI & agents"},agentsDefault:{zh:"默认",en:"Default"},agentsModel:{zh:"模型",en:"Model"},agentsThinking:{zh:"思考默认档",en:"Thinking default"},agentsRuntime:{zh:"运行时",en:"Runtime"},agentsWorkspace:{zh:"工作区",en:"Workspace"},agentsHint:{zh:"代理列表为只读;修改配置请编辑 openclaw.json 的 agents 段。",en:"Read-only. Edit the agents section in openclaw.json to change."},agentsTabAgents:{zh:"代理",en:"Agents"},agentsTabSkills:{zh:"Skills",en:"Skills"},agentsTabTools:{zh:"工具",en:"Tools"},agentsTabSession:{zh:"会话",en:"Sessions"},agentsSectionName:{zh:"AGENTS",en:"AGENTS"},agentsSectionDesc:{zh:"Agent 配置、模型和身份",en:"Agent config, models and identity"},agentsDefaultsTitle:{zh:"Agent Defaults",en:"Agent Defaults"},agentsDefaultsDesc:{zh:"所有代理继承的共享默认设置,除非在 agents.entries 中按条目覆盖。用默认值可保证行为一致,减少重复配置。",en:"Shared defaults inherited by agents unless overridden per entry in agents.entries. Use defaults to enforce consistent baseline behavior."},agentsCompaction:{zh:"Compaction(上下文压缩)",en:"Compaction"},agentsCompactionDesc:{zh:"上下文接近 token 上限时的压缩行为,含压缩策略与压缩前记忆冲刷。长会话需要在紧凑上下文窗口下稳定延续时使用。",en:"Compaction behavior when context nears token limits, including strategy and pre-compaction memory flush."},agentsCompactionEnabled:{zh:"启用压缩",en:"Enable compaction"},agentsCompactionMode:{zh:"压缩模式",en:"Compaction mode"},agentsCompactionKeepRecent:{zh:"保留最近 tokens",en:"Keep recent tokens"},agentsCompactionRecentTurns:{zh:"保留最近轮数",en:"Preserve recent turns"},agentsCompactionTimeout:{zh:"超时(秒)",en:"Timeout (s)"},agentsMemoryFlush:{zh:"压缩前记忆冲刷",en:"Pre-compaction memory flush"},agentsElevated:{zh:"Elevated Default(提权默认)",en:"Elevated Default"},agentsElevatedDesc:{zh:"代理执行提权操作(如宿主命令)时的默认审批策略。",en:"Default elevation policy for agent actions on the host."},agentsEmbedded:{zh:"Embedded OpenClaw(内嵌加固)",en:"Embedded OpenClaw"},agentsEmbeddedDesc:{zh:"内嵌 OpenClaw runner 的加固控制:工作区本地代理设置的可信与应用方式。",en:"Embedded runner hardening: how workspace-local agent settings are trusted and applied."},agentsProjectPolicy:{zh:"项目设置策略",en:"Project settings policy"},agentsExecutionContract:{zh:"执行契约",en:"Execution contract"},agentsFastOn:{zh:"开启",en:"On"},agentsFastOff:{zh:"关闭",en:"Off"},agentsFastAuto:{zh:"自动",en:"Auto"},agentsHeartbeat:{zh:"Heartbeat(心跳)",en:"Heartbeat"},agentsHeartbeatDesc:{zh:"代理空闲心跳:定时唤醒执行自动化任务。",en:"Idle heartbeat: periodically wake the agent for automation."},agentsBadgeAutomation:{zh:"automation",en:"automation"},agentsBadgeModels:{zh:"models",en:"models"},agentsBadgeMedia:{zh:"media",en:"media"},agentsHeartbeatEvery:{zh:"间隔(如 30m / 1h)",en:"Interval (e.g. 30m / 1h)"},agentsHeartbeatStart:{zh:"活跃开始 (HH:MM)",en:"Active from (HH:MM)"},agentsHeartbeatEnd:{zh:"活跃结束 (HH:MM)",en:"Active until (HH:MM)"},agentsHeartbeatPrompt:{zh:"心跳提示词",en:"Heartbeat prompt"},agentsImageModel:{zh:"Image Model(图像模型)",en:"Image Model"},agentsImageModelDesc:{zh:"图像生成/处理使用的模型与回退列表。",en:"Model and fallbacks for image generation/processing."},agentsMediaModels:{zh:"Media Models(媒体模型)",en:"Media Models"},agentsMediaModelsDesc:{zh:"按媒体类型指定模型:图像 / 视频 / 音乐。",en:"Per-media-type models: image / video / music."},agentsModelRow:{zh:"Model(主模型)",en:"Model"},agentsModelRowDesc:{zh:'代理主模型,格式 "provider/model"。',en:'Primary agent model as "provider/model".'},agentsModelPolicy:{zh:"Model Policy(模型策略)",en:"Model Policy"},agentsModelPolicyDesc:{zh:"限制代理可用的模型白名单。",en:"Restrict which models the agent may use."},agentsModelPolicyAllow:{zh:"允许的模型(JSON 数组)",en:"Allowed models (JSON array)"},agentsUtilityModel:{zh:"Utility Model(辅助模型)",en:"Utility Model"},agentsUtilityModelDesc:{zh:"摘要/标题等轻量任务的辅助模型;留空禁用。",en:"Lightweight model for summaries etc.; empty disables utility routing."},agentsWorkspaceRow:{zh:"Workspace(工作区)",en:"Workspace"},agentsThinkingRow:{zh:"Thinking Default(思考默认档)",en:"Thinking Default"},agentsPrimary:{zh:"主模型",en:"Primary"},agentsFallbacks:{zh:"回退模型(逗号分隔)",en:"Fallbacks (comma separated)"},agentsSave:{zh:"保存",en:"Save"},agentsSaved:{zh:"已保存,配置热生效",en:"Saved — applied live"},agentsSaveFailed:{zh:"保存失败",en:"Save failed"},agentsToolsTitle:{zh:"工具配置",en:"Tools"},agentsToolsHint:{zh:"工具配置档来自 config.tools.profile;细粒度权限请编辑 openclaw.json 的 tools 段。",en:"Tool profile comes from config.tools.profile; fine-grained permissions live in the tools section of openclaw.json."},agentsSkillsHint:{zh:"已安装技能的启用/禁用;更多技能请到左侧「技能」页的市场安装。",en:"Toggle installed skills. Install more from the marketplace on the Skills page."},infraTitle:{zh:"基础设施",en:"Infrastructure"},infraPort:{zh:"网关端口",en:"Gateway port"},infraLan:{zh:"局域网地址",en:"LAN address"},infraRuntime:{zh:"运行时",en:"Runtime"},infraOs:{zh:"系统",en:"OS"},infraPath:{zh:"数据目录",en:"Data dir"},infraHint:{zh:"网关监听与运行环境概览(只读)。",en:"Read-only overview of the gateway runtime."},debugTitle:{zh:"调试控制台",en:"Debug console"},debugHint:{zh:"手动调用任意网关 RPC 并查看原始返回。方法列表见协议文档,误操作可能影响配置,请谨慎。",en:"Call any gateway RPC and inspect the raw response. Use with care."},debugMethod:{zh:"RPC 方法名",en:"RPC method"},debugParams:{zh:"参数(JSON,可选)",en:"Params (JSON, optional)"},debugSend:{zh:"发送请求",en:"Send"},securityTitle:{zh:"安全",en:"Security"},securityAuth:{zh:"网关认证",en:"Gateway auth"},securityProfile:{zh:"工具配置档",en:"Tool profile"},securityDeviceAuth:{zh:"设备配对",en:"Device auth"},securityEnabled:{zh:"已启用",en:"Enabled"},securityHint:{zh:"安全项为只读展示;如需修改请编辑 openclaw.json(改动前先备份)。",en:"Read-only. Edit openclaw.json (with a backup first) to change."},usageTitle:{zh:"Token 用量",en:"Token usage"},usageSessions:{zh:"{n} 个会话",en:"{n} sessions"},usageTotalTokens:{zh:"总 Tokens",en:"Total tokens"},usageTotalCost:{zh:"总费用",en:"Total cost"},usageInput:{zh:"输入",en:"Input"},usageOutput:{zh:"输出",en:"Output"},usageCacheRead:{zh:"缓存命中",en:"Cache hit"},usageColModel:{zh:"模型",en:"Model"},usageColInput:{zh:"输入",en:"In"},usageColOutput:{zh:"输出",en:"Out"},usageColCache:{zh:"缓存",en:"Cache"},usageColSessions:{zh:"会话",en:"Sess."},usageColCost:{zh:"费用",en:"Cost"},usageEmpty:{zh:"暂无用量记录",en:"No usage recorded yet"},usageNote:{zh:"费用由网关按各模型单价(每百万 tokens)计算;单价可在 设置 → 模型管理 中配置。",en:"Cost is computed by the gateway from each model’s per-million pricing. Edit pricing in Settings → Models."},usageHideTitle:{zh:"从列表隐藏此模型(本地)",en:"Hide this model (local)"},usageHideNote:{zh:"✕ 为本地隐藏记录,可随时恢复;网关不提供历史删除。",en:"✕ hides rows locally (recoverable); the gateway keeps history."},usageHiddenBtn:{zh:"已隐藏 {n} 个",en:"{n} hidden"},usageHiddenTitle:{zh:"已隐藏的模型记录",en:"Hidden model records"},usageUnhide:{zh:"恢复显示",en:"Show again"},quotaTitle:{zh:"Token 配额倒计时",en:"Token quota countdown"},quotaFieldName:{zh:"配额名称",en:"Quota name"},quotaFieldScope:{zh:"适用范围",en:"Scope"},quotaAllModels:{zh:"全部模型",en:"All models"},quotaFieldWan:{zh:"总量(万 tokens)",en:"Total (10k tokens)"},quotaAdd:{zh:"添加配额",en:"Add quota"},quotaUsedSince:{zh:"建立后已消耗 {n} tokens",en:"{n} tokens used since created"},quotaHint:{zh:"配额为本地记录:建立时记住当时用量,之后实时倒扣显示剩余。如厂商重置了用量,删除重建即可。",en:"Local-only: baseline is captured on creation and deducted live. Recreate if the provider resets usage."},brandCardTitle:{zh:"Logo 与头像",en:"Logo & avatar"},brandAppLogo:{zh:"应用 Logo(侧边栏)",en:"App logo (sidebar)"},brandAiAvatar:{zh:"AI 头像(对话)",en:"AI avatar (chat)"},brandUpload:{zh:"上传图片",en:"Upload"},brandReset:{zh:"恢复默认",en:"Reset"},brandHint:{zh:"输入 emoji 后回车,或上传图片(自动裁方缩至 128px)。仅保存在本浏览器,不上传服务器。",en:"Type an emoji + Enter, or upload an image (auto-cropped to 128px). Stored in this browser only."},memoryTitle:{zh:"AI 对我的记忆",en:"What AI remembers"},memoryHint:{zh:"AI 的长期记忆文件(只读)。想修改内容,直接在聊天里告诉它即可。",en:"Read-only view of the AI’s long-term memory files. Tell it in chat to change anything."},memoryExpand:{zh:"查看",en:"View"},memoryCollapse:{zh:"收起",en:"Collapse"},memoryMainFile:{zh:"主记忆 (MEMORY.md)",en:"Main memory (MEMORY.md)"},dreamTitle:{zh:"梦境日记",en:"Dream diary"},dreamExpand:{zh:"查看",en:"View"},dreamHintFound:{zh:"AI 在空闲时自动整理记忆写下的日记(存于 {path})",en:"Auto-written memory consolidation diary ({path})"},dreamHintEmpty:{zh:"还没有梦境记录",en:"No dream entries yet"},dreamEntryCount:{zh:"共 {n} 篇",en:"{n} entries"},modelsCardTitle:{zh:"模型管理",en:"Models"},modelsAddTitle:{zh:"新增模型",en:"Add model"},modelsAddBtn:{zh:"添加模型",en:"Add model"},modelsDelete:{zh:"删除该提供商",en:"Delete provider"},modelsEdit:{zh:"编辑模型与价格",en:"Edit models & pricing"},modelsEditing:{zh:"编辑「{name}」",en:'Editing "{name}"'},modelsDeleteModel:{zh:"从该提供商删除此模型",en:"Remove this model"},modelsSave:{zh:"保存修改",en:"Save changes"},modelsEditHint:{zh:"价格单位为每百万 Tokens;保存后立即生效。API Key 不会被读取或覆盖,可放心编辑。",en:"Prices are per 1M tokens and apply immediately. Your API key is never read or overwritten."},mpModelName:{zh:"显示名称",en:"Display name"},mpContext:{zh:"上下文窗口",en:"Context window"},mpMaxTokens:{zh:"最大输出",en:"Max output"},modelsEmpty:{zh:"还没有自定义模型,用下面的表单添加",en:"No custom models yet — add one below"},modelsHint:{zh:"OpenAI 兼容接口适用于绝大多数服务;添加后立即生效,无需重启网关。",en:"OpenAI-compatible works for most services. Changes apply immediately, no gateway restart needed."},mpCostTitle:{zh:"价格(每百万 Tokens,可选)",en:"Pricing (per 1M tokens, optional)"},mpCostInput:{zh:"输入(未命中缓存)",en:"Input (cache miss)"},mpCostCacheRead:{zh:"输入(命中缓存)",en:"Input (cached)"},mpCostOutput:{zh:"输出",en:"Output"},mpCostHint:{zh:"填写后用量页才能按模型计费;币种与你填写的一致,网关只做乘法。",en:"Required for cost metering. Currency-agnostic — the gateway only multiplies."},pairingTitle:{zh:"设备需要配对",en:"Device pairing required"},pairingBody:{zh:"这是一个新的浏览器身份,需要在网关主机上批准一次。请在该主机终端执行:",en:"This is a new browser identity and needs one-time approval. On the gateway host, run:"},pairingNote:{zh:"批准后本页会自动重连。同一浏览器只需配对一次。",en:"This page reconnects automatically after approval. Pairing is once per browser profile."},authFailedTitle:{zh:"令牌无效",en:"Invalid token"},authFailedBody:{zh:"网关拒绝了该令牌,请检查后重新输入。",en:"The gateway rejected this token. Please check and re-enter it."},identityFailedTitle:{zh:"设备身份初始化失败",en:"Device identity failed to initialize"},identityFailedBody:{zh:"无法生成本机设备密钥(见浏览器控制台)。请确认使用最新版浏览器访问本页面,然后重试。",en:"Could not generate the local device key (see browser console). Use an up-to-date browser and retry."},errUnavailable:{zh:"网关正在启动中,稍后自动重试…",en:"Gateway is starting up, retrying automatically…"},errRateLimited:{zh:"登录尝试过于频繁,已被网关临时锁定(约 10 分钟)。可等待解锁或重启网关后点「立即重试」。",en:"Too many attempts — temporarily locked by the gateway (~10 min). Wait, restart the gateway, then hit Retry."},errNotConnected:{zh:"尚未连接网关",en:"Not connected to the gateway"},errTimeout:{zh:"请求超时,请稍后重试",en:"Request timed out, please retry"},errUnknown:{zh:"发生未知错误",en:"Unknown error"}};let $e=qr();const Fr=new Set;function qr(){try{const e=localStorage.getItem(Sa);if(e==="zh"||e==="en")return e}catch{}return(typeof navigator<"u"?navigator.language:"en")?.toLowerCase().startsWith("zh")?"zh":"en"}function es(){return $e}function jr(t){$e=t;try{localStorage.setItem(Sa,t)}catch{}Fr.forEach(e=>e())}function o(t,e){const s=Hr[t];if(!s)return String(t);let n=s[$e]??s.en;if(e)for(const[i,a]of Object.entries(e))n=n.replaceAll(`{${i}}`,String(a));return n}function Kr(t){if(!t)return o("errUnknown");switch(t.details?.code||t.code){case"PAIRING_REQUIRED":case"NOT_PAIRED":return o("pairingTitle");case"AUTH_TOKEN_MISMATCH":case"AUTH_UNAUTHORIZED":case"AUTH_TOKEN_MISSING":return o("authFailedBody");case"UNAVAILABLE":return o("errUnavailable");case"AUTH_RATE_LIMITED":return o("errRateLimited");case"CONTROL_UI_ORIGIN_NOT_ALLOWED":return $e==="zh"?"浏览器来源未在网关白名单中:需在 openclaw.json 的 gateway.controlUi.allowedOrigins 添加本页面地址并重启网关。":"Browser origin is not whitelisted: add this page’s origin to gateway.controlUi.allowedOrigins in openclaw.json and restart the gateway.";default:return t.message||o("errUnknown")}}function Mt(t){if(!t)return"";const e=Date.now()-t,s=new Intl.RelativeTimeFormat($e==="zh"?"zh-CN":"en-US",{numeric:"auto"});return e<6e4?s.format(-Math.round(e/1e3),"second"):e<36e5?s.format(-Math.round(e/6e4),"minute"):e<864e5?s.format(-Math.round(e/36e5),"hour"):s.format(-Math.round(e/864e5),"day")}function ts(t){if(typeof t!="number"||!Number.isFinite(t))return"—";const e=$e==="zh"?["B","KB","MB","GB","TB"]:["B","KB","MB","GB","TB"];let s=t,n=0;for(;s>=1024&&n<e.length-1;)s/=1024,n++;return`${s.toFixed(s>=100||n===0?0:1)} ${e[n]}`}function Gr(t){if(typeof t!="number"||!Number.isFinite(t)||t<0)return"—";const e=Math.floor(t/1e3),s=Math.floor(e/86400),n=Math.floor(e%86400/3600),i=Math.floor(e%3600/60);return s>0?$e==="zh"?`${s} 天 ${n} 小时`:`${s}d ${n}h`:n>0?$e==="zh"?`${n} 小时 ${i} 分`:`${n}h ${i}m`:i>0?$e==="zh"?`${i} 分 ${e%60} 秒`:`${i}m ${e%60}s`:$e==="zh"?`${e} 秒`:`${e}s`}function ds(t,e,s){return t&&t.startsWith("data:image")?c`<span class=${s}><img class="avatar-img" src=${t} alt="" /></span>`:c`<span class=${s}>${t||e}</span>`}async function Wr(t){const e=await createImageBitmap(t),s=128,n=document.createElement("canvas");n.width=s,n.height=s;const i=n.getContext("2d"),a=Math.min(e.width,e.height);return i.drawImage(e,(e.width-a)/2,(e.height-a)/2,a,a,0,0,s,s),n.toDataURL("image/png")}function L(t){return{chat:c`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>`,sessions:c`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 8v13H3V8"/><path d="M1 3h22v5H1z"/><path d="M10 12h4"/></svg>`,status:c`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>`,settings:c`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,send:c`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="17" height="17"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>`,stop:c`<svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15"><rect x="6" y="6" width="12" height="12" rx="2.5"/></svg>`,pin:c`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="15" height="15"><path d="M12 17v5"/><path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg>`,edit:c`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="15" height="15"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>`,archive:c`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="15" height="15"><rect x="2" y="3" width="20" height="5" rx="1"/><path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8"/><path d="M10 12h4"/></svg>`,plus:c`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" width="16" height="16"><path d="M12 5v14M5 12h14"/></svg>`,refresh:c`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="15" height="15"><path d="M21 12a9 9 0 1 1-2.64-6.36L21 8"/><path d="M21 3v5h-5"/></svg>`,clock:c`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>`,sparkles:c`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.9 5.8L4 10.7l6.1 1.9L12 18l1.9-5.4 6.1-1.9-6.1-1.9L12 3z"/><path d="M5 17v4M3 19h4"/></svg>`,device:c`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01"/></svg>`,logs:c`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6h13M8 12h13M8 18h13"/><path d="M3 6h.01M3 12h.01M3 18h.01"/></svg>`,coin:c`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v12M15.5 9.5A3.5 3.5 0 0 0 12 8a3.5 3.5 0 0 0 0 7 3.5 3.5 0 0 1 0 7" transform="scale(0.85) translate(2 0)"/></svg>`,market:c`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>`,download:c`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="15" height="15"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/><path d="M12 15V3"/></svg>`,check:c`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="15" height="15"><path d="M20 6 9 17l-5-5"/></svg>`,folder:c`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"/></svg>`,external:c`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="15" height="15"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><path d="M15 3h6v6"/><path d="M10 14 21 3"/></svg>`,star:c`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`,update:c`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="15" height="15"><path d="M21 12a9 9 0 0 1-9 9c-2.52 0-4.93-1-6.74-2.74L3 16"/><path d="M3 12a9 9 0 0 1 9-9c2.52 0 4.93 1 6.74 2.74L23 8"/><path d="M21 3v5h-5"/><path d="M3 21v-5h5"/></svg>`,search:c`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="15" height="15"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>`,trash:c`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="15" height="15"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>`,link:c`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="15" height="15"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`}[t]??c``}function wn(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var Qe=wn();function Ca(t){Qe=t}var Ge={exec:()=>null};function ot(t){let e=[];return s=>{let n=Math.max(0,Math.min(3,s-1)),i=e[n];return i||(i=t(n),e[n]=i),i}}function _(t,e=""){let s=typeof t=="string"?t:t.source,n={replace:(i,a)=>{let r=typeof a=="string"?a:a.source;return r=r.replace(X.caret,"$1"),s=s.replace(i,r),n},getRegex:()=>new RegExp(s,e)};return n}var Vr=((t="")=>{try{return!!new RegExp("(?<=1)(?<!1)"+t)}catch{return!1}})(),X={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:t=>new RegExp(`^( {0,3}${t})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:ot(t=>new RegExp(`^ {0,${t}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`)),hrRegex:ot(t=>new RegExp(`^ {0,${t}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`)),fencesBeginRegex:ot(t=>new RegExp(`^ {0,${t}}(?:\`\`\`|~~~)`)),headingBeginRegex:ot(t=>new RegExp(`^ {0,${t}}#`)),htmlBeginRegex:ot(t=>new RegExp(`^ {0,${t}}<(?:[a-z].*>|!--)`,"i")),blockquoteBeginRegex:ot(t=>new RegExp(`^ {0,${t}}>`))},Yr=/^(?:[ \t]*(?:\n|$))+/,Jr=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Qr=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,Pt=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Zr=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,xn=/ {0,3}(?:[*+-]|\d{1,9}[.)])/,Ta=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Aa=_(Ta).replace(/bull/g,xn).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}(?:\s|$)/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Xr=_(Ta).replace(/bull/g,xn).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}(?:\s|$)/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),Sn=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table|[ \t]+\n)[^\n]+)*)/,el=/^[^\n]+/,Cn=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,tl=_(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Cn).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),sl=_(/^(bull)([ \t][^\n]*?)?(?:\n|$)/).replace(/bull/g,xn).getRegex(),$s="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",Tn=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,nl=_("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n*|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>[^\\n]*\\n*|$)|<![A-Z][\\s\\S]*?(?:>[^\\n]*\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>[^\\n]*\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",Tn).replace("tag",$s).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Ea=t=>_(Sn).replace("hr",Pt).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*(?:\\n|$))|~~~)[^\\n]*(?:\\n|$)").replace("list",t).replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",$s).getRegex(),il=Ea(/ {0,3}(?:[*+-]|1[.)])[ \t]+[^ \t\n]/),al=Ea(/ {0,3}(?:[*+-]|\d{1,9}[.)])(?:[ \t]|\n|$)/),ol=_(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",al).getRegex(),An={blockquote:ol,code:Jr,def:tl,fences:Qr,heading:Zr,hr:Pt,html:nl,lheading:Aa,list:sl,newline:Yr,paragraph:il,table:Ge,text:el},Ii=_("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",Pt).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*(?:\\n|$))|~~~)[^\\n]*(?:\\n|$)").replace("list"," {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",$s).getRegex(),rl={...An,lheading:Xr,table:Ii,paragraph:_(Sn).replace("hr",Pt).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Ii).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*(?:\\n|$))|~~~)[^\\n]*(?:\\n|$)").replace("list"," {0,3}(?:[*+-]|1[.)])[ \\t]+[^ \\t\\n]").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",$s).getRegex()},ll={...An,html:_(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",Tn).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:Ge,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:_(Sn).replace("hr",Pt).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Aa).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},cl=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,dl=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,Ma=/^( {2,}|\\)\n(?!\s*$)/,hl=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Te=/[\p{P}\p{S}]/u,mt=/[\s\p{P}\p{S}]/u,It=/[^\s\p{P}\p{S}]/u,ul=_(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,mt).getRegex(),pl=/[\p{Pi}\p{Ps}"']/u,_a=/(?!~)[\p{P}\p{S}]/u,ml=/(?!~)[\s\p{P}\p{S}]/u,gl=/(?:[^\s\p{P}\p{S}]|~)/u,fl=_(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",Vr?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),za=/^(?:\*+(?:((?!\*)punct)|([^\s*]))?)|^_+(?:((?!_)punct)|([^\s_]))?/,vl=_(za,"u").replace(/punct/g,Te).getRegex(),yl=_(za,"u").replace(/punct/g,_a).getRegex(),bl=/^(?:\*+(?:((?!\*)(?!openQuote)punct)|([^\s*]))?)|^_+(?:((?!_)(?!openQuote)punct)|([^\s_]))?/,$l=_(bl,"u").replace(/openQuote/g,pl).replace(/punct/g,Te).getRegex(),Ra="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",kl=_(Ra,"gu").replace(/notPunctSpace/g,It).replace(/punctSpace/g,mt).replace(/punct/g,Te).getRegex(),wl=_(Ra,"gu").replace(/notPunctSpace/g,gl).replace(/punctSpace/g,ml).replace(/punct/g,_a).getRegex(),xl="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)[\\s](\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|(?:(?!\\*)punct|notPunctSpace)(\\*+)(?!\\*)(?=notPunctSpace)",Sl=_(xl,"gu").replace(/notPunctSpace/g,It).replace(/punctSpace/g,mt).replace(/punct/g,Te).getRegex(),Cl=_("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,It).replace(/punctSpace/g,mt).replace(/punct/g,Te).getRegex(),Tl="^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)[\\s](_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)|(?:(?!_)punct|notPunctSpace)(_+)(?!_)(?=notPunctSpace)",Al=_(Tl,"gu").replace(/notPunctSpace/g,It).replace(/punctSpace/g,mt).replace(/punct/g,Te).getRegex(),El=_(/^~~?(?:((?!~)punct)|[^\s~])/,"u").replace(/punct/g,Te).getRegex(),Ml="^[^~]+(?=[^~])|(?!~)punct(~~?)(?=[\\s]|$)|notPunctSpace(~~?)(?!~)(?=punctSpace|$)|(?!~)punctSpace(~~?)(?=notPunctSpace)|[\\s](~~?)(?!~)(?=punct)|(?!~)punct(~~?)(?!~)(?=punct)|notPunctSpace(~~?)(?=notPunctSpace)",_l=_(Ml,"gu").replace(/notPunctSpace/g,It).replace(/punctSpace/g,mt).replace(/punct/g,Te).getRegex(),zl=_(/\\(punct)/,"gu").replace(/punct/g,Te).getRegex(),Rl=_(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Pl=_(Tn).replace("(?:-->|$)","-->").getRegex(),Il=_("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Pl).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),hs=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+(?!`)[^`]*?`+(?!`)|``+(?=\])|[^\[\]\\`])*?/,Ol=_(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]+(?:\n[ \t]*)?|\n[ \t]*)(title))?\s*\)/).replace("label",hs).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]+|(?=\))/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),Pa=_(/^!?\[(label)\]\[(ref)\]/).replace("label",hs).replace("ref",Cn).getRegex(),Ia=_(/^!?\[(ref)\](?:\[\])?/).replace("ref",Cn).getRegex(),Ll=_("reflink|nolink(?!\\()","g").replace("reflink",Pa).replace("nolink",Ia).getRegex(),Oi=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,En={_backpedal:Ge,anyPunctuation:zl,autolink:Rl,blockSkip:fl,br:Ma,code:dl,del:Ge,delLDelim:Ge,delRDelim:Ge,emStrongLDelim:vl,emStrongRDelimAst:kl,emStrongRDelimUnd:Cl,escape:cl,link:Ol,nolink:Ia,punctuation:ul,reflink:Pa,reflinkSearch:Ll,tag:Il,text:hl,url:Ge},Dl={...En,emStrongLDelim:$l,emStrongRDelimAst:Sl,emStrongRDelimUnd:Al,link:_(/^!?\[(label)\]\((.*?)\)/).replace("label",hs).getRegex(),reflink:_(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",hs).getRegex()},an={...En,emStrongRDelimAst:wl,emStrongLDelim:yl,delLDelim:El,delRDelim:_l,url:_(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",Oi).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:_(/^(`+|~+|[^`~])(?:(?=[`~])|(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",Oi).getRegex()},Nl={...an,br:_(Ma).replace("{2,}","*").getRegex(),text:_(an.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},ss={normal:An,gfm:rl,pedantic:ll},bt={normal:En,gfm:an,breaks:Nl,pedantic:Dl},Ul={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Li=t=>Ul[t];function be(t,e){if(e){if(X.escapeTest.test(t))return t.replace(X.escapeReplace,Li)}else if(X.escapeTestNoEncode.test(t))return t.replace(X.escapeReplaceNoEncode,Li);return t}function Di(t){try{t=encodeURI(t).replace(X.percentDecode,"%")}catch{return null}return t}function Ni(t,e){let s=t.replace(X.findPipe,(a,r,h)=>{let u=!1,m=r;for(;--m>=0&&h[m]==="\\";)u=!u;return u?"|":" |"}),n=s.split(X.splitPipe),i=0;if(n[0].trim()||n.shift(),n.length>0&&!n.at(-1)?.trim()&&n.pop(),e)if(n.length>e)n.splice(e);else for(;n.length<e;)n.push("");for(;i<n.length;i++)n[i]=n[i].trim().replace(X.slashPipe,"|");return n}function Re(t,e,s){let n=t.length;if(n===0)return"";let i=0;for(;i<n&&t.charAt(n-i-1)===e;)i++;return t.slice(0,n-i)}function Ui(t){let e=t.split(`
`),s=e.length-1;for(;s>=0&&X.blankLine.test(e[s]);)s--;return e.length-s<=2?t:e.slice(0,s+1).join(`
`)}function Bl(t,e){if(t.indexOf(e[1])===-1)return-1;let s=0;for(let n=0;n<t.length;n++)if(t[n]==="\\")n++;else if(t[n]===e[0])s++;else if(t[n]===e[1]&&(s--,s<0))return n;return s>0?-2:-1}function Hl(t,e=0){let s=e,n="";for(let i of t)if(i==="	"){let a=4-s%4;n+=" ".repeat(a),s+=a}else n+=i,s++;return n}function Bi(t,e,s,n,i){let a=e.href,r=e.title||null,h=t[1].replace(i.other.outputLinkReplace,"$1"),u=t[0].charAt(0)==="!";n.state.inLink=!0;let m=n.state.linkEmitted,v=n.state.inRawBlock;n.state.linkEmitted=!1;let f=n.inlineTokens(h),x=n.state.linkEmitted;if(n.state.linkEmitted=m,n.state.inLink=!1,!u){if(x){n.state.inRawBlock=v;return}n.state.linkEmitted=!0}return{type:u?"image":"link",raw:s,href:a,title:r,text:h,tokens:f}}function Fl(t,e,s){let n=t.match(s.other.indentCodeCompensation);if(n===null)return e;let i=n[1];return e.split(`
`).map(a=>{let r=a.match(s.other.beginningSpace);if(r===null)return a;let[h]=r;return h.length>=i.length?a.slice(i.length):a}).join(`
`)}var us=class{options;rules;lexer;constructor(t){this.options=t||Qe}space(t){let e=this.rules.block.newline.exec(t);if(e&&e[0].length>0)return{type:"space",raw:e[0]}}code(t){let e=this.rules.block.code.exec(t);if(e){let s=this.options.pedantic?e[0]:Ui(e[0]),n=s.replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:s,codeBlockStyle:"indented",text:n}}}fences(t){let e=this.rules.block.fences.exec(t);if(e){let s=e[0],n=Fl(s,e[3]||"",this.rules);return{type:"code",raw:s,lang:e[2]?e[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):e[2],text:n}}}heading(t){let e=this.rules.block.heading.exec(t);if(e){let s=e[2].trim();if(this.rules.other.endingHash.test(s)){let n=Re(s,"#");(this.options.pedantic||!n||this.rules.other.endingSpaceChar.test(n))&&(s=n.trim())}return{type:"heading",raw:Re(e[0],`
`),depth:e[1].length,text:s,tokens:this.lexer.inline(s)}}}hr(t){let e=this.rules.block.hr.exec(t);if(e)return{type:"hr",raw:Re(e[0],`
`)}}blockquote(t){let e=this.rules.block.blockquote.exec(t);if(e){let s=Re(e[0],`
`).split(`
`),n="",i="",a=[];for(;s.length>0;){let r=!1,h=[],u;for(u=0;u<s.length;u++)if(this.rules.other.blockquoteStart.test(s[u]))h.push(s[u]),r=!0;else if(!r)h.push(s[u]);else break;s=s.slice(u);let m=h.join(`
`),v=m.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");n=n?`${n}
${m}`:m,i=i?`${i}
${v}`:v;let f=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(v,a,!0),this.lexer.state.top=f,s.length===0)break;let x=a.at(-1);if(x?.type==="code")break;if(x?.type==="blockquote"){let M=x,A=s.join(`
`),P=M.raw+`
`+A.replace(this.rules.other.blockquoteSetextReplace2,""),I=this.blockquote(P);a[a.length-1]=I,n=`${n}
${A}`,i=i.substring(0,i.length-M.text.length)+I.text;break}else if(x?.type==="list"){let M=x,A=M.raw+`
`+s.join(`
`),P=this.list(A);a[a.length-1]=P,n=n.substring(0,n.length-x.raw.length)+P.raw,i=i.substring(0,i.length-M.raw.length)+P.raw,s=A.substring(a.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:n,tokens:a,text:i}}}list(t){let e=this.rules.block.list.exec(t);if(e){let s=e[1].trim(),n=s.length>1,i={type:"list",raw:"",ordered:n,start:n?+s.slice(0,-1):"",loose:!1,items:[]};s=n?`\\d{1,9}\\${s.slice(-1)}`:`\\${s}`,this.options.pedantic&&(s=n?s:"[*+-]");let a=this.rules.other.listItemRegex(s),r=!1;for(;t;){let u=!1,m="",v="";if(!(e=a.exec(t))||this.rules.block.hr.test(t))break;m=e[0],t=t.substring(m.length);let f=Hl(e[2].split(`
`,1)[0],e[1].length),x=t.split(`
`,1)[0],M=!f.trim(),A=0;if(this.options.pedantic?(A=2,v=f.trimStart()):M?A=e[1].length+1:(A=f.search(this.rules.other.nonSpaceChar),A=A>4?1:A,v=f.slice(A),A+=e[1].length),M&&this.rules.other.blankLine.test(x)&&(m+=x+`
`,t=t.substring(x.length+1),u=!0),!u){let P=this.rules.other.nextBulletRegex(A),I=this.rules.other.hrRegex(A),G=this.rules.other.fencesBeginRegex(A),te=this.rules.other.headingBeginRegex(A),z=this.rules.other.htmlBeginRegex(A),W=this.rules.other.blockquoteBeginRegex(A);for(;t;){let j=t.split(`
`,1)[0],Q;if(x=j,this.options.pedantic?(x=x.replace(this.rules.other.listReplaceNesting,"  "),Q=x):Q=x.replace(this.rules.other.tabCharGlobal,"    "),G.test(x)||te.test(x)||z.test(x)||W.test(x)||P.test(x)||I.test(x))break;if(Q.search(this.rules.other.nonSpaceChar)>=A||!x.trim())v+=`
`+Q.slice(A);else{if(M||f.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||G.test(f)||te.test(f)||I.test(f))break;v+=`
`+x}M=!x.trim(),m+=j+`
`,t=t.substring(j.length+1),f=Q.slice(A)}}i.loose||(r?i.loose=!0:this.rules.other.doubleBlankLine.test(m)&&(r=!0)),i.items.push({type:"list_item",raw:m,task:!!this.options.gfm&&this.rules.other.listIsTask.test(v),loose:!1,text:v,tokens:[]}),i.raw+=m}let h=i.items.at(-1);if(h)h.raw=h.raw.trimEnd(),h.text=h.text.trimEnd();else return;i.raw=i.raw.trimEnd();for(let u of i.items)if(this.lexer.state.top=!1,u.tokens=this.lexer.blockTokens(u.text,[]),!i.loose){let m=u.tokens.filter(f=>f.type==="space"),v=m.length>0&&m.some(f=>this.rules.other.anyLine.test(f.raw));i.loose=v}for(let u of i.items){let m=u.tokens[0];if(u.task&&(m?.type==="text"||m?.type==="paragraph")){u.text=u.text.replace(this.rules.other.listReplaceTask,""),m.raw=m.raw.replace(this.rules.other.listReplaceTask,""),m.text=m.text.replace(this.rules.other.listReplaceTask,"");for(let f=this.lexer.inlineQueue.length-1;f>=0;f--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[f].src)){this.lexer.inlineQueue[f].src=this.lexer.inlineQueue[f].src.replace(this.rules.other.listReplaceTask,"");break}let v=this.rules.other.listTaskCheckbox.exec(u.raw);if(v){let f={type:"checkbox",raw:v[0]+" ",checked:v[0]!=="[ ]"};u.checked=f.checked,i.loose?u.tokens[0]&&["paragraph","text"].includes(u.tokens[0].type)&&"tokens"in u.tokens[0]&&u.tokens[0].tokens?(u.tokens[0].raw=f.raw+u.tokens[0].raw,u.tokens[0].text=f.raw+u.tokens[0].text,u.tokens[0].tokens.unshift(f)):u.tokens.unshift({type:"paragraph",raw:f.raw,text:f.raw,tokens:[f]}):u.tokens.unshift(f)}}else u.task&&(u.task=!1)}if(i.loose)for(let u of i.items){u.loose=!0;for(let m of u.tokens)m.type==="text"&&(m.type="paragraph")}return i}}html(t){let e=this.rules.block.html.exec(t);if(e){let s=Ui(e[0]);return{type:"html",block:!0,raw:s,pre:e[1]==="pre"||e[1]==="script"||e[1]==="style",text:s}}}def(t){let e=this.rules.block.def.exec(t);if(e){let s=e[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),n=e[2]?e[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",i=e[3]?e[3].substring(1,e[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):e[3];return{type:"def",tag:s,raw:Re(e[0],`
`),href:n,title:i}}}table(t){let e=this.rules.block.table.exec(t);if(!e||!this.rules.other.tableDelimiter.test(e[2]))return;let s=Ni(e[1]),n=e[2].replace(this.rules.other.tableAlignChars,"").split("|"),i=e[3]?.trim()?e[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],a={type:"table",raw:Re(e[0],`
`),header:[],align:[],rows:[]};if(s.length===n.length){for(let r of n)this.rules.other.tableAlignRight.test(r)?a.align.push("right"):this.rules.other.tableAlignCenter.test(r)?a.align.push("center"):this.rules.other.tableAlignLeft.test(r)?a.align.push("left"):a.align.push(null);for(let r=0;r<s.length;r++)a.header.push({text:s[r],tokens:this.lexer.inline(s[r]),header:!0,align:a.align[r]});for(let r of i)a.rows.push(Ni(r,a.header.length).map((h,u)=>({text:h,tokens:this.lexer.inline(h),header:!1,align:a.align[u]})));return a}}lheading(t){let e=this.rules.block.lheading.exec(t);if(e){let s=e[1].trim();return{type:"heading",raw:Re(e[0],`
`),depth:e[2].charAt(0)==="="?1:2,text:s,tokens:this.lexer.inline(s)}}}paragraph(t){let e=this.rules.block.paragraph.exec(t);if(e){let s=e[1].charAt(e[1].length-1)===`
`?e[1].slice(0,-1):e[1];return{type:"paragraph",raw:e[0],text:s,tokens:this.lexer.inline(s)}}}text(t){let e=this.rules.block.text.exec(t);if(e)return{type:"text",raw:e[0],text:e[0],tokens:this.lexer.inline(e[0])}}escape(t){let e=this.rules.inline.escape.exec(t);if(e)return{type:"escape",raw:e[0],text:e[1]}}tag(t){let e=this.rules.inline.tag.exec(t);if(e)return!this.lexer.state.inLink&&this.rules.other.startATag.test(e[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(e[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(e[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(e[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:e[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:e[0]}}link(t){let e=this.rules.inline.link.exec(t);if(e){let s=e[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(s)){if(!this.rules.other.endAngleBracket.test(s))return;let a=Re(s.slice(0,-1),"\\");if((s.length-a.length)%2===0)return}else{let a=Bl(e[2],"()");if(a===-2)return;if(a>-1){let r=(e[0].indexOf("!")===0?5:4)+e[1].length+a;e[2]=e[2].substring(0,a),e[0]=e[0].substring(0,r).trim(),e[3]=""}}let n=e[2],i="";if(this.options.pedantic){let a=this.rules.other.pedanticHrefTitle.exec(n);a&&(n=a[1],i=a[3])}else i=e[3]?e[3].slice(1,-1):"";return n=n.trim(),this.rules.other.startAngleBracket.test(n)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(s)?n=n.slice(1):n=n.slice(1,-1)),Bi(e,{href:n&&n.replace(this.rules.inline.anyPunctuation,"$1"),title:i&&i.replace(this.rules.inline.anyPunctuation,"$1")},e[0],this.lexer,this.rules)}}reflink(t,e){let s;if((s=this.rules.inline.reflink.exec(t))||(s=this.rules.inline.nolink.exec(t))){let n=(s[2]||s[1]).replace(this.rules.other.multipleSpaceGlobal," "),i=e[n.toLowerCase()];if(!i){let a=s[0].charAt(0);return{type:"text",raw:a,text:a}}return Bi(s,i,s[0],this.lexer,this.rules)}}emStrong(t,e,s=""){let n=this.rules.inline.emStrongLDelim.exec(t);if(!(!n||!n[1]&&!n[2]&&!n[3]&&!n[4]||n[4]&&s.match(this.rules.other.unicodeAlphaNumeric))&&(!(n[1]||n[3])||!s||this.rules.inline.punctuation.exec(s))){let i=[...n[0]].length-1,a,r,h=i,u=0,m=n[0][0],v=s===m,f=m==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(f.lastIndex=0,e=e.slice(-1*t.length+i);(n=f.exec(e))!==null;){if(a=n[1]||n[2]||n[3]||n[4]||n[5]||n[6],!a)continue;if(r=[...a].length,n[3]||n[4]){h+=r;continue}else if(n[5]||n[6]){if(i%3&&!((i+r)%3)){u+=r;continue}if(v)break}if(h-=r,h>0)continue;r=Math.min(r,r+h+u);let x=[...n[0]][0].length,M=t.slice(0,i+n.index+x+r);if(Math.min(i,r)%2){let P=M.slice(1,-1);return{type:"em",raw:M,text:P,tokens:this.lexer.inlineTokens(P)}}let A=M.slice(2,-2);return{type:"strong",raw:M,text:A,tokens:this.lexer.inlineTokens(A)}}}}codespan(t){let e=this.rules.inline.code.exec(t);if(e){let s=e[2].replace(this.rules.other.newLineCharGlobal," "),n=this.rules.other.nonSpaceChar.test(s),i=this.rules.other.startingSpaceChar.test(s)&&this.rules.other.endingSpaceChar.test(s);return n&&i&&(s=s.substring(1,s.length-1)),{type:"codespan",raw:e[0],text:s}}}br(t){let e=this.rules.inline.br.exec(t);if(e)return{type:"br",raw:e[0]}}del(t,e,s=""){let n=this.rules.inline.delLDelim.exec(t);if(n&&(!n[1]||!s||this.rules.inline.punctuation.exec(s))){let i=[...n[0]].length-1,a,r,h=i,u=this.rules.inline.delRDelim;for(u.lastIndex=0,e=e.slice(-1*t.length+i);(n=u.exec(e))!==null;){if(a=n[1]||n[2]||n[3]||n[4]||n[5]||n[6],!a||(r=[...a].length,r!==i))continue;if(n[3]||n[4]){h+=r;continue}if(h-=r,h>0)continue;r=Math.min(r,r+h);let m=[...n[0]][0].length,v=t.slice(0,i+n.index+m+r),f=v.slice(i,-i);return{type:"del",raw:v,text:f,tokens:this.lexer.inlineTokens(f)}}}}autolink(t){let e=this.rules.inline.autolink.exec(t);if(e){let s,n;return e[2]==="@"?(s=e[1],n="mailto:"+s):(s=e[1],n=s),{type:"link",raw:e[0],text:s,href:n,tokens:[{type:"text",raw:s,text:s}]}}}url(t){let e;if(e=this.rules.inline.url.exec(t)){let s,n;if(e[2]==="@")s=e[0],n="mailto:"+s;else{let i;do i=e[0],e[0]=this.rules.inline._backpedal.exec(e[0])?.[0]??"";while(i!==e[0]);s=e[0],e[1]==="www."?n="http://"+e[0]:n=e[0]}return{type:"link",raw:e[0],text:s,href:n,tokens:[{type:"text",raw:s,text:s}]}}}inlineText(t){let e=this.rules.inline.text.exec(t);if(e){let s=this.lexer.state.inRawBlock;return{type:"text",raw:e[0],text:e[0],escaped:s}}}},pe=class on{tokens;options;state;inlineQueue;tokenizer;constructor(e){this.tokens=[],this.tokens.links=Object.create(null),this.options=e||Qe,this.options.tokenizer=this.options.tokenizer||new us,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,linkEmitted:!1,top:!0};let s={other:X,block:ss.normal,inline:bt.normal};this.options.pedantic?(s.block=ss.pedantic,s.inline=bt.pedantic):this.options.gfm&&(s.block=ss.gfm,this.options.breaks?s.inline=bt.breaks:s.inline=bt.gfm),this.tokenizer.rules=s}static get rules(){return{block:ss,inline:bt}}static lex(e,s){return new on(s).lex(e)}static lexInline(e,s){return new on(s).inlineTokens(e)}lex(e){e=e.replace(X.carriageReturn,`
`),this.blockTokens(e,this.tokens);for(let s=0;s<this.inlineQueue.length;s++){let n=this.inlineQueue[s];this.inlineTokens(n.src,n.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(e,s=[],n=!1){this.tokenizer.lexer=this,this.options.pedantic&&(e=e.replace(X.tabCharGlobal,"    ").replace(X.spaceLine,""));let i=1/0;for(;e;){if(e.length<i)i=e.length;else{this.infiniteLoopError(e.charCodeAt(0));break}let a;if(this.options.extensions?.block?.some(h=>(a=h.call({lexer:this},e,s))?(e=e.substring(a.raw.length),s.push(a),!0):!1))continue;if(a=this.tokenizer.space(e)){e=e.substring(a.raw.length);let h=s.at(-1);a.raw.length===1&&h!==void 0?h.raw+=`
`:s.push(a);continue}if(a=this.tokenizer.code(e)){e=e.substring(a.raw.length);let h=s.at(-1);h?.type==="paragraph"||h?.type==="text"?(h.raw+=(h.raw.endsWith(`
`)?"":`
`)+a.raw,h.text+=`
`+a.text,this.inlineQueue.at(-1).src=h.text):s.push(a);continue}if(a=this.tokenizer.fences(e)){e=e.substring(a.raw.length),s.push(a);continue}if(a=this.tokenizer.heading(e)){e=e.substring(a.raw.length),s.push(a);continue}if(a=this.tokenizer.hr(e)){e=e.substring(a.raw.length),s.push(a);continue}if(a=this.tokenizer.blockquote(e)){e=e.substring(a.raw.length),s.push(a);continue}if(a=this.tokenizer.list(e)){e=e.substring(a.raw.length),s.push(a);continue}if(a=this.tokenizer.html(e)){e=e.substring(a.raw.length),s.push(a);continue}if(a=this.tokenizer.def(e)){e=e.substring(a.raw.length);let h=s.at(-1);h?.type==="paragraph"||h?.type==="text"?(h.raw+=(h.raw.endsWith(`
`)?"":`
`)+a.raw,h.text+=`
`+a.raw,this.inlineQueue.at(-1).src=h.text):this.tokens.links[a.tag]||(this.tokens.links[a.tag]={href:a.href,title:a.title},s.push(a));continue}if(a=this.tokenizer.table(e)){e=e.substring(a.raw.length),s.push(a);continue}if(a=this.tokenizer.lheading(e)){e=e.substring(a.raw.length),s.push(a);continue}let r=e;if(this.options.extensions?.startBlock){let h=1/0,u=e.slice(1),m;this.options.extensions.startBlock.forEach(v=>{m=v.call({lexer:this},u),typeof m=="number"&&m>=0&&(h=Math.min(h,m))}),h<1/0&&h>=0&&(r=e.substring(0,h+1))}if(this.state.top&&(a=this.tokenizer.paragraph(r))){let h=s.at(-1);n&&h?.type==="paragraph"?(h.raw+=(h.raw.endsWith(`
`)?"":`
`)+a.raw,h.text+=`
`+a.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=h.text):s.push(a),n=r.length!==e.length,e=e.substring(a.raw.length);continue}if(a=this.tokenizer.text(e)){e=e.substring(a.raw.length);let h=s.at(-1);h?.type==="text"?(h.raw+=(h.raw.endsWith(`
`)?"":`
`)+a.raw,h.text+=`
`+a.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=h.text):s.push(a);continue}if(e){this.infiniteLoopError(e.charCodeAt(0));break}}return this.state.top=!0,s}inline(e,s=[]){return this.inlineQueue.push({src:e,tokens:s}),s}linkInText(e){if(!e.includes("["))return!1;let s=this.tokenizer.rules.inline.link;for(let n of e.matchAll(this.tokenizer.rules.inline.blockSkip))if(s.test(n[0])&&e.charAt(n.index-1)!=="!")return!0;for(let n of e.matchAll(this.tokenizer.rules.inline.reflinkSearch)){let i=n[0],a=i.lastIndexOf("[");if(!(i.charAt(0)==="!"||!Object.hasOwn(this.tokens.links,i.slice(a+1,-1)))&&!(a>1&&this.linkInText(i.slice(1,a-1))))return!0}return!1}inlineTokens(e,s=[]){this.tokenizer.lexer=this;let n=e;if(this.tokens.links&&e.includes("[")){let h=this.tokenizer.rules.inline.reflinkSearch,u=m=>{let v=m.lastIndexOf("[");if(!Object.hasOwn(this.tokens.links,m.slice(v+1,-1)))return m;if(v>1&&m.charAt(0)!=="!"){let f=m.slice(1,v-1);if(this.linkInText(f))return"["+f.replace(h,u)+"]["+"a".repeat(m.length-v-2)+"]"}return"["+"a".repeat(m.length-2)+"]"};n=n.replace(h,u)}n=n.replace(this.tokenizer.rules.inline.anyPunctuation,h=>"+".repeat(h.length)),n=n.replace(this.tokenizer.rules.inline.blockSkip,(h,u,m)=>{let v=m?m.length:0;return h.slice(0,v)+"["+"a".repeat(h.length-v-2)+"]"}),n=this.options.hooks?.emStrongMask?.call({lexer:this},n)??n;let i=!1,a="",r=1/0;for(;e;){if(e.length<r)r=e.length;else{this.infiniteLoopError(e.charCodeAt(0));break}i||(a=""),i=!1;let h;if(this.options.extensions?.inline?.some(m=>(h=m.call({lexer:this},e,s))?(e=e.substring(h.raw.length),s.push(h),!0):!1))continue;if(h=this.tokenizer.escape(e)){e=e.substring(h.raw.length),s.push(h);continue}if(h=this.tokenizer.tag(e)){e=e.substring(h.raw.length),s.push(h);continue}if(h=this.tokenizer.link(e)){e=e.substring(h.raw.length),s.push(h);continue}if(h=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(h.raw.length);let m=s.at(-1);h.type==="text"&&m?.type==="text"?(m.raw+=h.raw,m.text+=h.text):s.push(h);continue}if(h=this.tokenizer.emStrong(e,n,a)){e=e.substring(h.raw.length),s.push(h);continue}if(h=this.tokenizer.codespan(e)){e=e.substring(h.raw.length),s.push(h);continue}if(h=this.tokenizer.br(e)){e=e.substring(h.raw.length),s.push(h);continue}if(h=this.tokenizer.del(e,n,a)){e=e.substring(h.raw.length),s.push(h);continue}if(h=this.tokenizer.autolink(e)){e=e.substring(h.raw.length),s.push(h);continue}if(!this.state.inLink&&(h=this.tokenizer.url(e))){e=e.substring(h.raw.length),s.push(h);continue}let u=e;if(this.options.extensions?.startInline){let m=1/0,v=e.slice(1),f;this.options.extensions.startInline.forEach(x=>{f=x.call({lexer:this},v),typeof f=="number"&&f>=0&&(m=Math.min(m,f))}),m<1/0&&m>=0&&(u=e.substring(0,m+1))}if(h=this.tokenizer.inlineText(u)){e=e.substring(h.raw.length),h.raw.slice(-1)!=="_"&&(a=h.raw.slice(-1)),i=!0;let m=s.at(-1);m?.type==="text"?(m.raw+=h.raw,m.text+=h.text):s.push(h);continue}if(e){this.infiniteLoopError(e.charCodeAt(0));break}}return s}infiniteLoopError(e){let s="Infinite loop on byte: "+e;if(this.options.silent)console.error(s);else throw new Error(s)}},ps=class{options;parser;constructor(t){this.options=t||Qe}space(t){return""}code({text:t,lang:e,escaped:s}){let n=(e||"").match(X.notSpaceStart)?.[0],i=t.replace(X.endingNewline,"")+`
`;return n?'<pre><code class="language-'+be(n)+'">'+(s?i:be(i,!0))+`</code></pre>
`:"<pre><code>"+(s?i:be(i,!0))+`</code></pre>
`}blockquote({tokens:t}){return`<blockquote>
${this.parser.parse(t)}</blockquote>
`}html({text:t}){return t}def(t){return""}heading({tokens:t,depth:e}){return`<h${e}>${this.parser.parseInline(t)}</h${e}>
`}hr(t){return`<hr>
`}list(t){let e=t.ordered,s=t.start,n="";for(let r=0;r<t.items.length;r++){let h=t.items[r];n+=this.listitem(h)}let i=e?"ol":"ul",a=e&&s!==1?' start="'+s+'"':"";return"<"+i+a+`>
`+n+"</"+i+`>
`}listitem(t){return`<li>${this.parser.parse(t.tokens)}</li>
`}checkbox({checked:t}){return"<input "+(t?'checked="" ':"")+'disabled="" type="checkbox"> '}paragraph({tokens:t}){return`<p>${this.parser.parseInline(t)}</p>
`}table(t){let e="",s="";for(let i=0;i<t.header.length;i++)s+=this.tablecell(t.header[i]);e+=this.tablerow({text:s});let n="";for(let i=0;i<t.rows.length;i++){let a=t.rows[i];s="";for(let r=0;r<a.length;r++)s+=this.tablecell(a[r]);n+=this.tablerow({text:s})}return n&&(n=`<tbody>${n}</tbody>`),`<table>
<thead>
`+e+`</thead>
`+n+`</table>
`}tablerow({text:t}){return`<tr>
${t}</tr>
`}tablecell(t){let e=this.parser.parseInline(t.tokens),s=t.header?"th":"td";return(t.align?`<${s} align="${t.align}">`:`<${s}>`)+e+`</${s}>
`}strong({tokens:t}){return`<strong>${this.parser.parseInline(t)}</strong>`}em({tokens:t}){return`<em>${this.parser.parseInline(t)}</em>`}codespan({text:t}){return`<code>${be(t,!0)}</code>`}br(t){return"<br>"}del({tokens:t}){return`<del>${this.parser.parseInline(t)}</del>`}link({href:t,title:e,tokens:s}){let n=this.parser.parseInline(s),i=Di(t);if(i===null)return n;t=i;let a='<a href="'+t+'"';return e&&(a+=' title="'+be(e)+'"'),a+=">"+n+"</a>",a}image({href:t,title:e,text:s,tokens:n}){n&&(s=this.parser.parseInline(n,this.parser.textRenderer));let i=Di(t);if(i===null)return be(s);t=i;let a=`<img src="${t}" alt="${be(s)}"`;return e&&(a+=` title="${be(e)}"`),a+=">",a}text(t){return"tokens"in t&&t.tokens?this.parser.parseInline(t.tokens):"escaped"in t&&t.escaped?t.text:be(t.text)}},Mn=class{strong({text:t}){return t}em({text:t}){return t}codespan({text:t}){return t}del({text:t}){return t}html({text:t}){return t}text({text:t}){return t}link({text:t}){return""+t}image({text:t}){return""+t}br(){return""}checkbox({raw:t}){return t}},me=class rn{options;renderer;textRenderer;constructor(e){this.options=e||Qe,this.options.renderer=this.options.renderer||new ps,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new Mn}static parse(e,s){return new rn(s).parse(e)}static parseInline(e,s){return new rn(s).parseInline(e)}parse(e){this.renderer.parser=this;let s="";for(let n=0;n<e.length;n++){let i=e[n];if(this.options.extensions?.renderers?.[i.type]){let r=i,h=this.options.extensions.renderers[r.type].call({parser:this},r);if(h!==!1||!["space","hr","heading","code","table","blockquote","list","checkbox","html","def","paragraph","text"].includes(r.type)){s+=h||"";continue}}let a=i;switch(a.type){case"space":{s+=this.renderer.space(a);break}case"hr":{s+=this.renderer.hr(a);break}case"heading":{s+=this.renderer.heading(a);break}case"code":{s+=this.renderer.code(a);break}case"table":{s+=this.renderer.table(a);break}case"blockquote":{s+=this.renderer.blockquote(a);break}case"list":{s+=this.renderer.list(a);break}case"checkbox":{s+=this.renderer.checkbox(a);break}case"html":{s+=this.renderer.html(a);break}case"def":{s+=this.renderer.def(a);break}case"paragraph":{s+=this.renderer.paragraph(a);break}case"text":{s+=this.renderer.text(a);break}default:{let r='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(r),"";throw new Error(r)}}}return s}parseInline(e,s=this.renderer){this.renderer.parser=this;let n="";for(let i=0;i<e.length;i++){let a=e[i];if(this.options.extensions?.renderers?.[a.type]){let h=this.options.extensions.renderers[a.type].call({parser:this},a);if(h!==!1||!["escape","html","link","image","checkbox","strong","em","codespan","br","del","text"].includes(a.type)){n+=h||"";continue}}let r=a;switch(r.type){case"escape":{n+=s.text(r);break}case"html":{n+=s.html(r);break}case"link":{n+=s.link(r);break}case"image":{n+=s.image(r);break}case"checkbox":{n+=s.checkbox(r);break}case"strong":{n+=s.strong(r);break}case"em":{n+=s.em(r);break}case"codespan":{n+=s.codespan(r);break}case"br":{n+=s.br(r);break}case"del":{n+=s.del(r);break}case"text":{n+=s.text(r);break}default:{let h='Token with "'+r.type+'" type was not found.';if(this.options.silent)return console.error(h),"";throw new Error(h)}}}return n}},xt=class{options;block;constructor(t){this.options=t||Qe}static passThroughHooks=new Set(["preprocess","postprocess","processAllTokens","emStrongMask"]);static passThroughHooksRespectAsync=new Set(["preprocess","postprocess","processAllTokens"]);preprocess(t){return t}postprocess(t){return t}processAllTokens(t){return t}emStrongMask(t){return t}provideLexer(t=this.block){return t?pe.lex:pe.lexInline}provideParser(t=this.block){return t?me.parse:me.parseInline}},ql=class{defaults=wn();options=this.setOptions;parse=this.parseMarkdown(!0);parseInline=this.parseMarkdown(!1);Parser=me;Renderer=ps;TextRenderer=Mn;Lexer=pe;Tokenizer=us;Hooks=xt;constructor(...t){this.use(...t)}walkTokens(t,e){let s=[];for(let n of t)switch(s=s.concat(e.call(this,n)),n.type){case"table":{let i=n;for(let a of i.header)s=s.concat(this.walkTokens(a.tokens,e));for(let a of i.rows)for(let r of a)s=s.concat(this.walkTokens(r.tokens,e));break}case"list":{let i=n;s=s.concat(this.walkTokens(i.items,e));break}default:{let i=n;this.defaults.extensions?.childTokens?.[i.type]?this.defaults.extensions.childTokens[i.type].forEach(a=>{let r=i[a].flat(1/0);s=s.concat(this.walkTokens(r,e))}):i.tokens&&(s=s.concat(this.walkTokens(i.tokens,e)))}}return s}use(...t){let e=this.defaults.extensions||{renderers:{},childTokens:{}};return t.forEach(s=>{let n={...s};if(n.async=this.defaults.async||n.async||!1,s.extensions&&(s.extensions.forEach(i=>{if(!i.name)throw new Error("extension name required");if("renderer"in i){let a=e.renderers[i.name];a?e.renderers[i.name]=function(...r){let h=i.renderer.apply(this,r);return h===!1&&(h=a.apply(this,r)),h}:e.renderers[i.name]=i.renderer}if("tokenizer"in i){if(!i.level||i.level!=="block"&&i.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let a=e[i.level];a?a.unshift(i.tokenizer):e[i.level]=[i.tokenizer],i.start&&(i.level==="block"?e.startBlock?e.startBlock.push(i.start):e.startBlock=[i.start]:i.level==="inline"&&(e.startInline?e.startInline.push(i.start):e.startInline=[i.start]))}"childTokens"in i&&i.childTokens&&(e.childTokens[i.name]=i.childTokens)}),n.extensions=e),s.renderer){let i=this.defaults.renderer||new ps(this.defaults);for(let a in s.renderer){if(!(a in i))throw new Error(`renderer '${a}' does not exist`);if(["options","parser"].includes(a))continue;let r=a,h=s.renderer[r],u=i[r];i[r]=(...m)=>{let v=h.apply(i,m);return v===!1&&(v=u.apply(i,m)),v||""}}n.renderer=i}if(s.tokenizer){let i=this.defaults.tokenizer||new us(this.defaults);for(let a in s.tokenizer){if(!(a in i))throw new Error(`tokenizer '${a}' does not exist`);if(["options","rules","lexer"].includes(a))continue;let r=a,h=s.tokenizer[r],u=i[r];i[r]=(...m)=>{let v=h.apply(i,m);return v===!1&&(v=u.apply(i,m)),v}}n.tokenizer=i}if(s.hooks){let i=this.defaults.hooks||new xt;for(let a in s.hooks){if(!(a in i))throw new Error(`hook '${a}' does not exist`);if(["options","block"].includes(a))continue;let r=a,h=s.hooks[r],u=i[r];xt.passThroughHooks.has(a)?i[r]=m=>{if(this.defaults.async&&xt.passThroughHooksRespectAsync.has(a))return(async()=>{let f=await h.call(i,m);return u.call(i,f)})();let v=h.call(i,m);return u.call(i,v)}:i[r]=(...m)=>{if(this.defaults.async)return(async()=>{let f=await h.apply(i,m);return f===!1&&(f=await u.apply(i,m)),f})();let v=h.apply(i,m);return v===!1&&(v=u.apply(i,m)),v}}n.hooks=i}if(s.walkTokens){let i=this.defaults.walkTokens,a=s.walkTokens;n.walkTokens=function(r){let h=[];return h.push(a.call(this,r)),i&&(h=h.concat(i.call(this,r))),h}}this.defaults={...this.defaults,...n}}),this}setOptions(t){return this.defaults={...this.defaults,...t},this}lexer(t,e){return pe.lex(t,e??this.defaults)}parser(t,e){return me.parse(t,e??this.defaults)}parseMarkdown(t){return(e,s)=>{let n={...s},i={...this.defaults,...n},a=this.onError(!!i.silent,!!i.async);if(this.defaults.async===!0&&n.async===!1)return a(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof e>"u"||e===null)return a(new Error("marked(): input parameter is undefined or null"));if(typeof e!="string")return a(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(e)+", string expected"));if(i.hooks&&(i.hooks.options=i,i.hooks.block=t),i.async)return(async()=>{let r=i.hooks?await i.hooks.preprocess(e):e,h=await(i.hooks?await i.hooks.provideLexer(t):t?pe.lex:pe.lexInline)(r,i),u=i.hooks?await i.hooks.processAllTokens(h):h;i.walkTokens&&await Promise.all(this.walkTokens(u,i.walkTokens));let m=await(i.hooks?await i.hooks.provideParser(t):t?me.parse:me.parseInline)(u,i);return i.hooks?await i.hooks.postprocess(m):m})().catch(a);try{i.hooks&&(e=i.hooks.preprocess(e));let r=(i.hooks?i.hooks.provideLexer(t):t?pe.lex:pe.lexInline)(e,i);i.hooks&&(r=i.hooks.processAllTokens(r)),i.walkTokens&&this.walkTokens(r,i.walkTokens);let h=(i.hooks?i.hooks.provideParser(t):t?me.parse:me.parseInline)(r,i);return i.hooks&&(h=i.hooks.postprocess(h)),h}catch(r){return a(r)}}}onError(t,e){return s=>{if(s.message+=`
Please report this to https://github.com/markedjs/marked.`,t){let n="<p>An error occurred:</p><pre>"+be(s.message+"",!0)+"</pre>";return e?Promise.resolve(n):n}if(e)return Promise.reject(s);throw s}}},Je=new ql;function O(t,e){return Je.parse(t,e)}O.options=O.setOptions=function(t){return Je.setOptions(t),O.defaults=Je.defaults,Ca(O.defaults),O};O.getDefaults=wn;O.defaults=Qe;function jl(...t){return Je.use(...t),O.defaults=Je.defaults,Ca(O.defaults),O}O.use=jl;O.walkTokens=function(t,e){return Je.walkTokens(t,e)};O.parseInline=Je.parseInline;O.Parser=me;O.parser=me.parse;O.Renderer=ps;O.TextRenderer=Mn;O.Lexer=pe;O.lexer=pe.lex;O.Tokenizer=us;O.Hooks=xt;O.parse=O;O.options;O.setOptions;O.walkTokens;O.parseInline;me.parse;pe.lex;function Hi(t,e){(e==null||e>t.length)&&(e=t.length);for(var s=0,n=Array(e);s<e;s++)n[s]=t[s];return n}function Kl(t){if(Array.isArray(t))return t}function Gl(t,e){var s=t==null?null:typeof Symbol<"u"&&t[Symbol.iterator]||t["@@iterator"];if(s!=null){var n,i,a,r,h=[],u=!0,m=!1;try{if(a=(s=s.call(t)).next,e!==0)for(;!(u=(n=a.call(s)).done)&&(h.push(n.value),h.length!==e);u=!0);}catch(v){m=!0,i=v}finally{try{if(!u&&s.return!=null&&(r=s.return(),Object(r)!==r))return}finally{if(m)throw i}}return h}}function Wl(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Vl(t,e){return Kl(t)||Gl(t,e)||Yl(t,e)||Wl()}function Yl(t,e){if(t){if(typeof t=="string")return Hi(t,e);var s={}.toString.call(t).slice(8,-1);return s==="Object"&&t.constructor&&(s=t.constructor.name),s==="Map"||s==="Set"?Array.from(t):s==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(s)?Hi(t,e):void 0}}const Oa=Object.entries,Fi=Object.setPrototypeOf,Jl=Object.isFrozen,Ql=Object.getPrototypeOf,Zl=Object.getOwnPropertyDescriptor;let Y=Object.freeze,J=Object.seal,lt=Object.create,La=typeof Reflect<"u"&&Reflect,ln=La.apply,cn=La.construct;Y||(Y=function(e){return e});J||(J=function(e){return e});ln||(ln=function(e,s){for(var n=arguments.length,i=new Array(n>2?n-2:0),a=2;a<n;a++)i[a-2]=arguments[a];return e.apply(s,i)});cn||(cn=function(e){for(var s=arguments.length,n=new Array(s>1?s-1:0),i=1;i<s;i++)n[i-1]=arguments[i];return new e(...n)});const je=V(Array.prototype.forEach),Xl=V(Array.prototype.lastIndexOf),qi=V(Array.prototype.pop),$t=V(Array.prototype.push),ec=V(Array.prototype.splice),ct=Array.isArray,St=V(String.prototype.toLowerCase),Ks=V(String.prototype.toString),ji=V(String.prototype.match),kt=V(String.prototype.replace),Ki=V(String.prototype.indexOf),tc=V(String.prototype.trim),sc=V(Number.prototype.toString),nc=V(Boolean.prototype.toString),Gi=typeof BigInt>"u"?null:V(BigInt.prototype.toString),Wi=typeof Symbol>"u"?null:V(Symbol.prototype.toString),ie=V(Object.prototype.hasOwnProperty),wt=V(Object.prototype.toString),Z=V(RegExp.prototype.test),Fe=ic(TypeError);function V(t){return function(e){e instanceof RegExp&&(e.lastIndex=0);for(var s=arguments.length,n=new Array(s>1?s-1:0),i=1;i<s;i++)n[i-1]=arguments[i];return ln(t,e,n)}}function ic(t){return function(){for(var e=arguments.length,s=new Array(e),n=0;n<e;n++)s[n]=arguments[n];return cn(t,s)}}function R(t,e){let s=arguments.length>2&&arguments[2]!==void 0?arguments[2]:St;if(Fi&&Fi(t,null),!ct(e))return t;let n=e.length;for(;n--;){let i=e[n];if(typeof i=="string"){const a=s(i);a!==i&&(Jl(e)||(e[n]=a),i=a)}t[i]=!0}return t}function ac(t){for(let e=0;e<t.length;e++)ie(t,e)||(t[e]=null);return t}function le(t){const e=lt(null);for(const n of Oa(t)){var s=Vl(n,2);const i=s[0],a=s[1];ie(t,i)&&(ct(a)?e[i]=ac(a):a&&typeof a=="object"&&a.constructor===Object?e[i]=le(a):e[i]=a)}return e}function oc(t){switch(typeof t){case"string":return t;case"number":return sc(t);case"boolean":return nc(t);case"bigint":return Gi?Gi(t):"0";case"symbol":return Wi?Wi(t):"Symbol()";case"undefined":return wt(t);case"function":case"object":{if(t===null)return wt(t);const e=t,s=ue(e,"toString");if(typeof s=="function"){const n=s(e);return typeof n=="string"?n:wt(n)}return wt(t)}default:return wt(t)}}function ue(t,e){for(;t!==null;){const n=Zl(t,e);if(n){if(n.get)return V(n.get);if(typeof n.value=="function")return V(n.value)}t=Ql(t)}function s(){return null}return s}function rc(t){try{return Z(t,""),!0}catch{return!1}}const Vi=Y(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Gs=Y(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Ws=Y(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),lc=Y(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Vs=Y(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),cc=Y(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Yi=Y(["#text"]),Ji=Y(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","command","commandfor","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns"]),Ys=Y(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dominant-baseline","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","pointer-events","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-orientation","text-rendering","textlength","type","u1","u2","unicode","values","vector-effect","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Qi=Y(["accent","accentunder","align","bevelled","close","columnalign","columnlines","columnspacing","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lquote","lspace","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),ns=Y(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),dc=J(/{{[\w\W]*|^[\w\W]*}}/g),hc=J(/<%[\w\W]*|^[\w\W]*%>/g),uc=J(/\${[\w\W]*/g),pc=J(/^data-[\-\w.\u00B7-\uFFFF]+$/),mc=J(/^aria-[\-\w]+$/),Zi=J(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),gc=J(/^(?:\w+script|data):/i),fc=J(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),vc=J(/^html$/i),yc=J(/^[a-z][.\w]*(-[.\w]+)+$/i),Xi=J(/<[/\w!]/g),ea=J(/<[/\w]/g),bc=J(/<\/no(script|embed|frames)/i),$c=J(/\/>/i),re={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,processingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},Da=["style","script","xmp","iframe","noembed","noframes","plaintext","noscript"],kc=Y(R({},Da)),wc=(function(){const t={};return je(Da,e=>{t[e]=J(new RegExp("</"+e+"(?=[\\t\\n\\f\\r />])","i"))}),Y(t)})(),xc=function(){return typeof window>"u"?null:window},Sc=function(e,s){if(typeof e!="object"||typeof e.createPolicy!="function")return null;let n=null;const i="data-tt-policy-suffix";s&&s.hasAttribute(i)&&(n=s.getAttribute(i));const a="dompurify"+(n?"#"+n:"");try{return e.createPolicy(a,{createHTML(r){return r},createScriptURL(r){return r}})}catch{return console.warn("TrustedTypes policy "+a+" could not be created."),null}},ta=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}},Pe=function(e,s,n,i){return ie(e,s)&&ct(e[s])?R(i.base?le(i.base):{},e[s],i.transform):n},Js=function(e,s,n){const i=ie(e,s)?e[s]:void 0;return i&&typeof i=="object"?le(i):n()};function Na(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:xc();const e=w=>Na(w);if(e.version="3.4.14",e.removed=[],!t||!t.document||t.document.nodeType!==re.document||!t.Element)return e.isSupported=!1,e;let s=t.document;const n=s,i=n.currentScript;t.DocumentFragment;const a=t.HTMLTemplateElement,r=t.Node,h=t.Element,u=t.NodeFilter,m=t.NamedNodeMap;m===void 0&&(t.NamedNodeMap||t.MozNamedAttrMap),t.HTMLFormElement;const v=t.DOMParser,f=t.trustedTypes,x=h.prototype,M=ue(x,"cloneNode"),A=ue(x,"remove"),P=ue(x,"nextSibling"),I=ue(x,"childNodes"),G=ue(x,"parentNode"),te=ue(x,"shadowRoot"),z=ue(x,"attributes"),W=r&&r.prototype?ue(r.prototype,"nodeType"):null,j=r&&r.prototype?ue(r.prototype,"nodeName"):null,Q=r&&r.prototype?ue(r.prototype,"ownerDocument"):null,he=function(d){return W?W(d):d.nodeType},oe=function(d){return j?j(d):d.nodeName};if(typeof a=="function"){const w=s.createElement("template");w.content&&w.content.ownerDocument&&(s=w.content.ownerDocument)}let N,ce="",Oe,Le=!1,xe=0;const Lt=function(){if(xe>0)throw Fe('A configured TRUSTED_TYPES_POLICY callback (createHTML or createScriptURL) must not call DOMPurify.sanitize, as that causes infinite recursion. Do not pass a policy whose callbacks wrap DOMPurify as TRUSTED_TYPES_POLICY; see the "DOMPurify and Trusted Types" section of the README.')},Se=function(d){Lt(),xe++;try{return N.createHTML(d)}finally{xe--}},Ha=function(d){Lt(),xe++;try{return N.createScriptURL(d)}finally{xe--}},Fa=function(){return Le||(Oe=Sc(f,i),Le=!0),Oe},Dt=s,xs=Dt.implementation,Pn=Dt.createNodeIterator,qa=Dt.createDocumentFragment,ja=Dt.getElementsByTagName,Ka=n.importNode;let U=ta();e.isSupported=typeof Oa=="function"&&typeof G=="function"&&xs&&xs.createHTMLDocument!==void 0;const Ga=dc,Wa=hc,Va=uc,Ya=pc,Ja=mc,Qa=gc,In=fc,Za=yc;let On=Zi,B=null;const Ss=R({},[...Vi,...Gs,...Ws,...Vs,...Yi]);let H=null;const Cs=R({},[...Ji,...Ys,...Qi,...ns]);let ge=Object.seal(lt(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),gt=null,Ln=null;const Ae=Object.seal(lt(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}}));let Dn=!0,Ts=!0,Nn=!1,Un=!0,Ee=!1,De=!0,Ne=!1,As=!1,Nt=null,Ut=null,Es=!1,Ze=!1,Bt=!1,Ht=!1,Bn=!0,Hn=!1;const Fn="user-content-";let Ms=!0,_s=!1,Xe={},et=null;const qn=R({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","selectedcontent","style","svg","template","thead","title","video","xmp"]);let jn=null;const Kn=R({},["audio","video","img","source","image","track"]);let Gn=null;const Wn=R({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),Ft="http://www.w3.org/1998/Math/MathML",qt="http://www.w3.org/2000/svg",fe="http://www.w3.org/1999/xhtml";let tt=fe,zs=!1,Rs=null;const Xa=R({},[Ft,qt,fe],Ks),Vn=Y(["mi","mo","mn","ms","mtext"]);let Ps=R({},Vn);const Yn=Y(["annotation-xml"]);let Is=R({},Yn);const eo=R({},["title","style","font","a","script"]);let ft=null;const to=["application/xhtml+xml","text/html"],so="text/html";let K=null,st=null;const no=s.createElement("form"),Jn=function(d){return d instanceof RegExp||d instanceof Function},Os=function(){let d=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(st&&st===d)return;(!d||typeof d!="object")&&(d={}),d=le(d),ft=to.indexOf(d.PARSER_MEDIA_TYPE)===-1?so:d.PARSER_MEDIA_TYPE,K=ft==="application/xhtml+xml"?Ks:St,B=Pe(d,"ALLOWED_TAGS",Ss,{transform:K}),H=Pe(d,"ALLOWED_ATTR",Cs,{transform:K}),Rs=Pe(d,"ALLOWED_NAMESPACES",Xa,{transform:Ks}),Gn=Pe(d,"ADD_URI_SAFE_ATTR",Wn,{transform:K,base:Wn}),jn=Pe(d,"ADD_DATA_URI_TAGS",Kn,{transform:K,base:Kn}),et=Pe(d,"FORBID_CONTENTS",qn,{transform:K}),gt=Pe(d,"FORBID_TAGS",le({}),{transform:K}),Ln=Pe(d,"FORBID_ATTR",le({}),{transform:K}),Xe=ie(d,"USE_PROFILES")?d.USE_PROFILES&&typeof d.USE_PROFILES=="object"?le(d.USE_PROFILES):d.USE_PROFILES:!1,Dn=d.ALLOW_ARIA_ATTR!==!1,Ts=d.ALLOW_DATA_ATTR!==!1,Nn=d.ALLOW_UNKNOWN_PROTOCOLS||!1,Un=d.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Ee=d.SAFE_FOR_TEMPLATES||!1,De=d.SAFE_FOR_XML!==!1,Ne=d.WHOLE_DOCUMENT||!1,Ze=d.RETURN_DOM||!1,Bt=d.RETURN_DOM_FRAGMENT||!1,Ht=d.RETURN_TRUSTED_TYPE||!1,Es=d.FORCE_BODY||!1,Bn=d.SANITIZE_DOM!==!1,Hn=d.SANITIZE_NAMED_PROPS||!1,Ms=d.KEEP_CONTENT!==!1,_s=d.IN_PLACE||!1,On=rc(d.ALLOWED_URI_REGEXP)?d.ALLOWED_URI_REGEXP:Zi,tt=typeof d.NAMESPACE=="string"?d.NAMESPACE:fe,Ps=Js(d,"MATHML_TEXT_INTEGRATION_POINTS",()=>R({},Vn)),Is=Js(d,"HTML_INTEGRATION_POINTS",()=>R({},Yn));const p=Js(d,"CUSTOM_ELEMENT_HANDLING",()=>lt(null));if(ge=lt(null),ie(p,"tagNameCheck")&&Jn(p.tagNameCheck)&&(ge.tagNameCheck=p.tagNameCheck),ie(p,"attributeNameCheck")&&Jn(p.attributeNameCheck)&&(ge.attributeNameCheck=p.attributeNameCheck),ie(p,"allowCustomizedBuiltInElements")&&typeof p.allowCustomizedBuiltInElements=="boolean"&&(ge.allowCustomizedBuiltInElements=p.allowCustomizedBuiltInElements),J(ge),Ee&&(Ts=!1),Bt&&(Ze=!0),Xe&&(B=R({},Yi),H=lt(null),Xe.html===!0&&(R(B,Vi),R(H,Ji)),Xe.svg===!0&&(R(B,Gs),R(H,Ys),R(H,ns)),Xe.svgFilters===!0&&(R(B,Ws),R(H,Ys),R(H,ns)),Xe.mathMl===!0&&(R(B,Vs),R(H,Qi),R(H,ns))),Ae.tagCheck=null,Ae.attributeCheck=null,ie(d,"ADD_TAGS")&&(typeof d.ADD_TAGS=="function"?Ae.tagCheck=d.ADD_TAGS:ct(d.ADD_TAGS)&&(B===Ss&&(B=le(B)),R(B,d.ADD_TAGS,K))),ie(d,"ADD_ATTR")&&(typeof d.ADD_ATTR=="function"?Ae.attributeCheck=d.ADD_ATTR:ct(d.ADD_ATTR)&&(H===Cs&&(H=le(H)),R(H,d.ADD_ATTR,K))),ie(d,"ADD_FORBID_CONTENTS")&&ct(d.ADD_FORBID_CONTENTS)&&(et===qn&&(et=le(et)),R(et,d.ADD_FORBID_CONTENTS,K)),Ms&&(B["#text"]=!0),Ne&&R(B,["html","head","body"]),B.table&&(R(B,["tbody"]),delete gt.tbody),d.TRUSTED_TYPES_POLICY){if(typeof d.TRUSTED_TYPES_POLICY.createHTML!="function")throw Fe('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof d.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Fe('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');const b=N;N=d.TRUSTED_TYPES_POLICY;try{ce=Se("")}catch(S){throw N=b,S}}else d.TRUSTED_TYPES_POLICY===null?(N=void 0,ce=""):(N===void 0&&(N=Fa()),N&&typeof ce=="string"&&(ce=Se("")));Y&&Y(d),st=d},Qn=R({},[...Gs,...Ws,...lc]),Zn=R({},[...Vs,...cc]),io=function(d,p,b){return p.namespaceURI===fe?d==="svg":p.namespaceURI===Ft?d==="svg"&&(b==="annotation-xml"||Ps[b]):!!Qn[d]},ao=function(d,p,b){return p.namespaceURI===fe?d==="math":p.namespaceURI===qt?d==="math"&&Is[b]:!!Zn[d]},oo=function(d,p,b){return p.namespaceURI===qt&&!Is[b]||p.namespaceURI===Ft&&!Ps[b]?!1:!Zn[d]&&(eo[d]||!Qn[d])},ro=function(d){let p=G(d);(!p||!p.tagName)&&(p={namespaceURI:tt,tagName:"template"});const b=St(d.tagName),S=St(p.tagName);return Rs[d.namespaceURI]?d.namespaceURI===qt?io(b,p,S):d.namespaceURI===Ft?ao(b,p,S):d.namespaceURI===fe?oo(b,p,S):!!(ft==="application/xhtml+xml"&&Rs[d.namespaceURI]):!1},Me=function(d){$t(e.removed,{element:d});try{G(d).removeChild(d)}catch{if(A(d),!G(d))throw Fe("a node selected for removal could not be detached from its tree and cannot be safely returned; refusing to sanitize in place")}},Xn=function(d,p,b){try{d.removeAttributeNode(p)}catch{try{d.removeAttribute(b)}catch{}}},jt=function(d){Kt(d);const p=I(d);if(p){const S=[];je(p,T=>{$t(S,T)}),je(S,T=>{try{A(T)}catch{}})}const b=z(d);if(b)for(let S=b.length-1;S>=0;--S){const T=b[S],E=T&&T.name;typeof E=="string"&&Xn(d,T,E)}},Ue=function(d,p,b){if(!b)try{b=p.getAttributeNode(d)}catch{b=null}$t(e.removed,{attribute:b||null,from:p});try{b?p.removeAttributeNode(b):p.removeAttribute(d)}catch{try{p.removeAttribute(d)}catch{}}if(d==="is")if(Ze||Bt)try{Me(p)}catch{}else try{p.setAttribute(d,"")}catch{}},lo=function(d){const p=z(d);if(p)for(let b=p.length-1;b>=0;--b){const S=p[b],T=S&&S.name;typeof T!="string"||H[K(T)]||Xn(d,S,T)}},Kt=function(d){const p=[d];for(;p.length>0;){const b=p.pop();he(b)===re.element&&lo(b);const T=I(b);if(T)for(let E=T.length-1;E>=0;--E)p.push(T[E])}},ei=function(d,p){return De?d==="patchsrc"?!0:d==="for"&&p!=="label"&&p!=="output":!1},co=function(d){if(!De)return;const p=[d];for(;p.length>0;){const b=p.pop(),S=he(b);if(S===re.processingInstruction||S===re.comment&&Z(ea,b.data)){try{A(b)}catch{}continue}if(S===re.element){const E=b,D=K(oe(b));try{E.hasAttribute&&E.hasAttribute("patchsrc")&&E.removeAttribute("patchsrc"),E.hasAttribute&&E.hasAttribute("for")&&ei("for",D)&&E.removeAttribute("for")}catch{}}const T=I(b);if(T)for(let E=T.length-1;E>=0;--E)p.push(T[E])}},ti=function(d){let p=null,b=null;if(Es)d="<remove></remove>"+d;else{const E=ji(d,/^[\r\n\t ]+/);b=E&&E[0]}ft==="application/xhtml+xml"&&tt===fe&&(d='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+d+"</body></html>");const S=N?Se(d):d;if(tt===fe)try{p=new v().parseFromString(S,ft)}catch{}if(!p||!p.documentElement){p=xs.createDocument(tt,"template",null);try{p.documentElement.innerHTML=zs?ce:S}catch{}}const T=p.body||p.documentElement;return d&&b&&T.insertBefore(s.createTextNode(b),T.childNodes[0]||null),tt===fe?ja.call(p,Ne?"html":"body")[0]:Ne?p.documentElement:T},si=function(d){const p=Q?Q(d):d.ownerDocument;return Pn.call(p||d,d,u.SHOW_ELEMENT|u.SHOW_COMMENT|u.SHOW_TEXT|u.SHOW_PROCESSING_INSTRUCTION|u.SHOW_CDATA_SECTION,null)},Gt=function(d){return d=kt(d,Ga," "),d=kt(d,Wa," "),d=kt(d,Va," "),d},Ls=function(d){var p;d.normalize();const b=Q?Q(d):d.ownerDocument,S=Pn.call(b||d,d,u.SHOW_TEXT|u.SHOW_COMMENT|u.SHOW_CDATA_SECTION|u.SHOW_PROCESSING_INSTRUCTION,null);let T=S.nextNode();for(;T;)T.data=Gt(T.data),T=S.nextNode();const E=(p=d.querySelectorAll)===null||p===void 0?void 0:p.call(d,"template");E&&je(E,D=>{nt(D.content)&&Ls(D.content)})},Wt=function(d){const p=j?j(d):null;return typeof p!="string"||K(p)!=="form"?!1:typeof d.nodeName!="string"||typeof d.textContent!="string"||typeof d.removeChild!="function"||d.attributes!==z(d)||typeof d.removeAttribute!="function"||typeof d.setAttribute!="function"||typeof d.namespaceURI!="string"||typeof d.insertBefore!="function"||typeof d.hasChildNodes!="function"||d.nodeType!==W(d)||d.childNodes!==I(d)},nt=function(d){if(!W||typeof d!="object"||d===null)return!1;try{return W(d)===re.documentFragment}catch{return!1}},vt=function(d){if(!W||typeof d!="object"||d===null)return!1;try{return typeof W(d)=="number"}catch{return!1}};function ve(w,d,p){w.length!==0&&je(w,b=>{b.call(e,d,p,st)})}const ho=function(d,p){return!!(De&&d.hasChildNodes()&&!vt(d.firstElementChild)&&Z(Xi,d.textContent)&&Z(Xi,d.innerHTML)||De&&d.namespaceURI===fe&&kc[p]&&(vt(d.firstElementChild)||typeof d.textContent=="string"&&Z(wc[p],d.textContent))||d.nodeType===re.processingInstruction||De&&d.nodeType===re.comment&&Z(ea,d.data))},Vt=function(d,p){if(d instanceof RegExp)return Z(d,p);if(d instanceof Function){for(var b=arguments.length,S=new Array(b>2?b-2:0),T=2;T<b;T++)S[T-2]=arguments[T];return!!d(p,...S)}return!1},uo=function(d,p,b){if(!gt[p]&&ri(p)&&Vt(ge.tagNameCheck,p))return!1;if(Ms&&!et[p]){const S=G(d),T=I(d);if(T&&S){const E=T.length;for(let D=E-1;D>=0;--D){const q=d===b?M(T[D],!0):T[D];S.insertBefore(q,P(d))}}}return Me(d),!0},ni=function(d,p,b,S){return d.length===0?p:p===b||p===S?le(p):p},ii=function(d,p){return d===p||G(d)!==null?!1:(_s&&Kt(d),!0)},ai=function(d,p){if(ve(U.beforeSanitizeElements,d,null),ii(d,p))return!0;if(Wt(d))return Me(d),!0;const b=K(oe(d));if(B=ni(U.uponSanitizeElement,B,Ss,Nt),ve(U.uponSanitizeElement,d,{tagName:b,allowedTags:B}),ii(d,p))return!0;if(ho(d,b))return Me(d),!0;if(gt[b]||!(Ae.tagCheck instanceof Function&&Ae.tagCheck(b))&&!B[b]){const T=uo(d,b,p);return T===!1&&ve(U.afterSanitizeElements,d,null),T}if(he(d)===re.element&&!ro(d)||(b==="noscript"||b==="noembed"||b==="noframes")&&Z(bc,d.innerHTML))return Me(d),!0;if(Ee&&d.nodeType===re.text){const T=Gt(d.textContent);d.textContent!==T&&($t(e.removed,{element:d.cloneNode()}),d.textContent=T)}return ve(U.afterSanitizeElements,d,null),!1},oi=function(d,p,b){if(Ln[p]||ei(p,d)||Bn&&(p==="id"||p==="name")&&(b in s||b in no))return!1;const S=H[p]||Ae.attributeCheck instanceof Function&&Ae.attributeCheck(p,d);return Ts&&Z(Ya,p)||Dn&&Z(Ja,p)?!0:S?Gn[p]||Z(On,kt(b,In,""))||(p==="src"||p==="xlink:href"||p==="href")&&d!=="script"&&Ki(b,"data:")===0&&jn[d]||Nn&&!Z(Qa,kt(b,In,""))?!0:!b:ri(d)&&Vt(ge.tagNameCheck,d)&&Vt(ge.attributeNameCheck,p,d)||p==="is"&&ge.allowCustomizedBuiltInElements&&Vt(ge.tagNameCheck,b)},po=R({},["annotation-xml","color-profile","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","missing-glyph"]),ri=function(d){return!po[St(d)]&&Z(Za,d)},mo=function(d,p,b,S){if(N&&typeof f=="object"&&typeof f.getAttributeType=="function"&&!b)switch(f.getAttributeType(d,p)){case"TrustedHTML":return Se(S);case"TrustedScriptURL":return Ha(S)}return S},go=function(d,p,b,S){try{b?d.setAttributeNS(b,p,S):d.setAttribute(p,S),Wt(d)?Me(d):qi(e.removed)}catch{Ue(p,d)}},li=function(d){ve(U.beforeSanitizeAttributes,d,null);const p=d.attributes;if(!p||Wt(d))return;H=ni(U.uponSanitizeAttribute,H,Cs,Ut);const b={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:H,forceKeepAttr:void 0};let S=p.length;const T=K(d.nodeName);for(;S--;){const E=p[S],D=E.name,q=E.namespaceURI,se=E.value,ne=K(D),Ns=se;let ee=D==="value"?Ns:tc(Ns);if(b.attrName=ne,b.attrValue=ee,b.keepAttr=!0,b.forceKeepAttr=void 0,ve(U.uponSanitizeAttribute,d,b),ee=b.attrValue,Hn&&(ne==="id"||ne==="name")&&Ki(ee,Fn)!==0&&(Ue(D,d,E),ee=Fn+ee),De&&Z(/((--!?|])>)|<\/(style|script|title|xmp|textarea|noscript|iframe|noembed|noframes)/i,ee)){Ue(D,d,E);continue}if(ne==="attributename"&&ji(ee,"href")){Ue(D,d,E);continue}if(!b.forceKeepAttr){if(!b.keepAttr){Ue(D,d,E);continue}if(!Un&&Z($c,ee)){Ue(D,d,E);continue}if(Ee&&(ee=Gt(ee)),!oi(T,ne,ee)){Ue(D,d,E);continue}ee=mo(T,ne,q,ee),ee!==Ns&&go(d,D,q,ee)}}ve(U.afterSanitizeAttributes,d,null)},Yt=function(d){let p=null;const b=si(d);for(ve(U.beforeSanitizeShadowDOM,d,null);p=b.nextNode();)if(ve(U.uponSanitizeShadowNode,p,null),ai(p,d),li(p),nt(p.content)&&Yt(p.content),he(p)===re.element){const S=te(p);nt(S)&&(Ds(S),Yt(S))}ve(U.afterSanitizeShadowDOM,d,null)},Ds=function(d){const p=[{node:d,shadow:null}];for(;p.length>0;){const b=p.pop();if(b.shadow){Yt(b.shadow);continue}const S=b.node,E=he(S)===re.element,D=I(S);if(D)for(let q=D.length-1;q>=0;--q)p.push({node:D[q],shadow:null});if(E){const q=j?j(S):null;if(typeof q=="string"&&K(q)==="template"){const se=S.content;nt(se)&&p.push({node:se,shadow:null})}}if(E){const q=te(S);nt(q)&&p.push({node:null,shadow:q},{node:q,shadow:null})}}};return e.sanitize=function(w){let d=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},p=null,b=null,S=null,T=null;if(zs=!w,zs&&(w="<!-->"),typeof w!="string"&&!vt(w)&&(w=oc(w),typeof w!="string"))throw Fe("dirty is not a string, aborting");if(!e.isSupported)return w;As?(B=Nt,H=Ut):Os(d),(U.uponSanitizeElement.length>0||U.uponSanitizeAttribute.length>0)&&(B=le(B)),U.uponSanitizeAttribute.length>0&&(H=le(H)),e.removed=[];const E=_s&&typeof w!="string"&&vt(w);if(E){co(w);const se=oe(w);if(typeof se=="string"){const ne=K(se);if(!B[ne]||gt[ne])throw jt(w),Fe("root node is forbidden and cannot be sanitized in-place")}if(Wt(w))throw jt(w),Fe("root node is clobbered and cannot be sanitized in-place");try{Ds(w)}catch(ne){throw jt(w),ne}}else if(vt(w))p=ti("<!---->"),b=p.ownerDocument.importNode(w,!0),b.nodeType===re.element&&b.nodeName==="BODY"||b.nodeName==="HTML"?p=b:p.appendChild(b),Ds(b);else{if(!Ze&&!Ee&&!Ne&&w.indexOf("<")===-1)return N&&Ht?Se(w):w;if(p=ti(w),!p)return Ze?null:Ht?ce:""}p&&Es&&Me(p.firstChild);const D=E?w:p;try{const se=si(D);for(;S=se.nextNode();)ai(S,D),li(S),nt(S.content)&&Yt(S.content)}catch(se){throw E&&(jt(w),je(e.removed,ne=>{ne.element&&Kt(ne.element)})),se}if(E)return je(e.removed,se=>{se.element&&Kt(se.element)}),Ee&&Ls(w),w;if(Ze){if(Ee&&Ls(p),Bt)for(T=qa.call(p.ownerDocument);p.firstChild;)T.appendChild(p.firstChild);else T=p;return(H.shadowroot||H.shadowrootmode)&&(T=Ka.call(n,T,!0)),T}let q=Ne?p.outerHTML:p.innerHTML;return Ne&&B["!doctype"]&&p.ownerDocument&&p.ownerDocument.doctype&&p.ownerDocument.doctype.name&&Z(vc,p.ownerDocument.doctype.name)&&(q="<!DOCTYPE "+p.ownerDocument.doctype.name+`>
`+q),Ee&&(q=Gt(q)),N&&Ht?Se(q):q},e.setConfig=function(){let w=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};Os(w),As=!0,Nt=B,Ut=H},e.clearConfig=function(){st=null,As=!1,Nt=null,Ut=null,N=Oe,ce=""},e.isValidAttribute=function(w,d,p){st||Os({});const b=K(w),S=K(d);return oi(b,S,p)},e.addHook=function(w,d){typeof d=="function"&&ie(U,w)&&$t(U[w],d)},e.removeHook=function(w,d){if(ie(U,w)){if(d!==void 0){const p=Xl(U[w],d);return p===-1?void 0:ec(U[w],p,1)[0]}return qi(U[w])}},e.removeHooks=function(w){ie(U,w)&&(U[w]=[])},e.removeAllHooks=function(){U=ta()},e}var Cc=Na();O.setOptions({gfm:!0,breaks:!0});function Tc(t){const e=O.parse(t,{async:!1});return Cc.sanitize(e,{ALLOWED_TAGS:["p","br","strong","em","code","pre","ul","ol","li","blockquote","h1","h2","h3","h4","h5","h6","a","hr","table","thead","tbody","tr","th","td","del","s","span"],ALLOWED_ATTR:["href","title","class"],ALLOW_DATA_ATTR:!1})}function Qs(t){return t?typeof t=="string"?t:t.map(e=>e?.type==="text"&&typeof e.text=="string"?e.text:(e?.type==="toolCall","")).join("").trim():""}function Ac(t){const e=[];for(const i of t){const a=Array.isArray(i.content)?i.content:typeof i.content=="string"?[{type:"text",text:i.content}]:[];if(i.role==="user"){const r=Qs(i.content);r&&e.push({kind:"message",role:"user",text:r,timestamp:i.timestamp});continue}if(i.role==="assistant"){const r=Qs(i.content),h=a.filter(u=>u.type==="toolCall");for(const u of h)e.push({kind:"tool",toolName:u.name,callId:u.id,timestamp:i.timestamp});r&&e.push({kind:"message",role:"assistant",text:r,timestamp:i.timestamp,aborted:i.aborted});continue}if(i.role==="toolResult"){const r=Qs(i.content);e.push({kind:"tool",toolName:i.toolName,callId:i.toolCallId,output:r,isError:i.isError,timestamp:i.timestamp});continue}}const s=[],n=i=>{for(let a=s.length-1;a>=0;a--)if(i(s[a]))return a;return-1};for(const i of e){if(i.kind==="tool"&&i.output===void 0&&i.callId&&n(r=>r.kind==="tool"&&r.callId===i.callId&&r.output===void 0)>=0){s.push(i);continue}if(i.kind==="tool"&&i.output!==void 0&&i.callId){const a=n(r=>r.kind==="tool"&&r.callId===i.callId&&r.output===void 0);if(a>=0){const r=s[a];r.output=i.output,r.isError=i.isError;continue}}s.push(i)}return s}var Ec=Object.defineProperty,Mc=Object.getOwnPropertyDescriptor,Ua=(t,e,s,n)=>{for(var i=n>1?void 0:n?Mc(e,s):e,a=t.length-1,r;a>=0;a--)(r=t[a])&&(i=(n?r(e,s,i):r(i))||i);return n&&i&&Ec(e,s,i),i};let dn=class extends ae{constructor(){super(...arguments),this.autoScroll=!0}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),l.subscribe(()=>this.requestUpdate()),l.models.length||l.refreshModels()}handleModelChange(t){const e=t.target.value;e&&l.setSessionModel(e)}sessionTitle(){const t=l.sessions.find(e=>e.key===l.currentSessionKey);return t?.label||t?.displayName||t?.key?.split(":").pop()?.slice(0,8)||o("chatNewSession")}onScroll(t){const e=t.target;this.autoScroll=e.scrollHeight-e.scrollTop-e.clientHeight<80}updatedForScroll(){const t=this.renderRoot.querySelector(".chat-scroll");t&&this.autoScroll&&(t.scrollTop=t.scrollHeight)}updated(){this.updatedForScroll()}async handleSend(){const t=this.renderRoot.querySelector("textarea"),e=t?.value?.trim();!e||l.stream.active||(t.value="",this.autoScroll=!0,await l.sendMessage(e))}handleKeydown(t){t.key==="Enter"&&!t.shiftKey&&!t.isComposing&&(t.preventDefault(),this.handleSend())}handleInput(t){const e=t.target;e.style.height="auto",e.style.height=`${Math.min(e.scrollHeight,140)}px`}render(){const t=l.connState==="connected",e=Ac(l.messages),s=!!l.currentSessionKey;return c`
      <div class="chat-header glass">
        <div class="title">${this.sessionTitle()}</div>
        ${l.models.length&&s?c`
          <select class="model-picker" .value=${l.currentModel} @change=${this.handleModelChange} ?disabled=${!t} title=${o("chatModelPicker")}>
            ${l.models.map(n=>c`
              <option value="${n.provider}/${n.id}" ?selected=${l.currentModel===`${n.provider}/${n.id}`}>
                ${n.name||n.id}
              </option>
            `)}
          </select>
        `:g}
        <button class="new-chat-btn" ?disabled=${!t} @click=${()=>{l.newSession()}}>
          ${L("plus")} ${o("chatNewSession")}
        </button>
      </div>

      <div class="chat-scroll" @scroll=${this.onScroll}>
        ${s?l.historyLoading&&!e.length?c`<div class="empty-state">${o("loading")}</div>`:e.map(n=>n.kind==="message"?this.renderBubble(n.role,n.text,n.aborted):this.renderTool(n)):c`<div class="empty-state">${o("chatNoSession")}</div>`}
        ${l.stream.active?this.renderStreamStatus():g}
      </div>

      <div class="composer glass">
        <textarea
          rows="1"
          placeholder=${o(t?"chatPlaceholder":"connNeedAuth")}
          ?disabled=${!t||!s}
          @keydown=${this.handleKeydown}
          @input=${this.handleInput}
        ></textarea>
        ${l.stream.active?c`<button class="stop-btn" title=${o("chatStop")} @click=${()=>{l.abortRun()}}>${L("stop")}</button>`:c`<button class="send-btn" title=${o("chatSend")} ?disabled=${!t||!s} @click=${()=>{this.handleSend()}}>${L("send")}</button>`}
      </div>
    `}renderBubble(t,e,s){const n=t==="user"?"user":"ai",i=t==="user"?e:`${s?`<span class="aborted-flag">⏹ ${o("chatRunAborted")}</span><br/>`:""}${Tc(e)}`;return c`<div class="msg-row ${n}">
      ${t==="assistant"?ds(l.branding.aiAvatar,"🦞","ai-avatar"):g}
      <div class="bubble ${n} ${t==="assistant"?"md":""}" .innerHTML=${i}></div>
    </div>`}renderTool(t){if(t.output===void 0)return c`<details class="tool-card">
        <summary><span class="dot"></span>🔧 ${o("chatToolCall")}: ${t.toolName??"—"}</summary>
      </details>`;const e=t.output.length>1200?`${t.output.slice(0,1200)}…`:t.output;return c`<details class="tool-card ${t.isError?"error":"done"}">
      <summary><span class="dot"></span>🔧 ${t.toolName??"tool"} — ${o("chatToolOutput")}</summary>
      <div class="tool-output">${e}</div>
    </details>`}renderStreamStatus(){return c`<div class="stream-status">
      <span class="typing-dots"><i></i><i></i><i></i></span>
      ${l.stream.toolBusy?o("chatRunningTool",{name:l.stream.toolBusy}):o("chatThinking")}
    </div>`}};Ua([y()],dn.prototype,"autoScroll",2);dn=Ua([ke("chat-view")],dn);var _c=Object.defineProperty,zc=Object.getOwnPropertyDescriptor,Ba=(t,e,s,n)=>{for(var i=n>1?void 0:n?zc(e,s):e,a=t.length-1,r;a>=0;a--)(r=t[a])&&(i=(n?r(e,s,i):r(i))||i);return n&&i&&_c(e,s,i),i};let hn=class extends ae{constructor(){super(...arguments),this.showArchived=!1}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),l.subscribe(()=>this.requestUpdate()),l.refreshSessions()}visibleSessions(){const t=l.sessions.filter(s=>!s.archived),e=l.sessions.filter(s=>s.archived);return{pinned:t.filter(s=>s.pinned),recent:t.filter(s=>!s.pinned),archived:e}}async rename(t){const e=window.prompt(o("sessionsNewName"),t.label??t.displayName??"");if(e===null)return;const s=e.trim();await l.patchSession(t.key,s?{label:s}:{})}render(){const t=this.visibleSessions(),e=l.sessions.length;return c`
      <div class="sessions-toolbar glass">
        <span class="count">${o("sessionsTitle")} · ${e}</span>
        ${t.archived.length?c`<button class="toggle-btn" @click=${()=>{this.showArchived=!this.showArchived}}>
              ${this.showArchived?o("sessionsHideArchived"):`${o("sessionsShowArchived")} (${t.archived.length})`}
            </button>`:""}
      </div>

      <div class="session-list">
        ${e?"":c`<div class="empty-state">${o("sessionsEmpty")}</div>`}
        ${t.pinned.length?this.renderSection(o("sessionsPinned"),t.pinned):""}
        ${t.recent.length?this.renderSection(o("sessionsOthers"),t.recent):""}
        ${this.showArchived&&t.archived.length?this.renderSection(o("sessionsArchived"),t.archived,!0):""}
      </div>
    `}renderSection(t,e,s=!1){return c`
      <div class="session-section-title">${t}</div>
      ${e.map(n=>this.renderItem(n,s))}
    `}renderItem(t,e){const s=t.key===l.currentSessionKey,n=t.key.includes(":cron:"),i=e?"📦":n?"⏰":(t.origin?.provider==="webchat","💬"),a=[t.displayName?Mt(t.updatedAt):"",t.kind].filter(Boolean).join(" · ");return c`
      <div
        class="session-item glass ${s?"selected":""}"
        @click=${()=>{l.selectSession(t.key),l.setView("chat")}}
      >
        <div class="s-avatar ${e?"archive":""}">${i}</div>
        <div class="s-main">
          <div class="s-title">
            ${t.label||t.displayName||t.key.split(":").pop()?.slice(0,10)||t.key}
            ${t.hasActiveRun?c`<span class="badge active">${o("sessionsActiveRun")}</span>`:""}
            ${t.unread&&!s?c`<span class="badge unread"></span>`:""}
          </div>
          <div class="s-sub">${a}</div>
        </div>
        <div class="s-actions" @click=${r=>r.stopPropagation()}>
          <button class="icon-btn" title=${t.pinned?o("sessionsUnpin"):o("sessionsPin")}
            @click=${()=>{l.patchSession(t.key,{pinned:!t.pinned})}}>
            ${L("pin")}
          </button>
          <button class="icon-btn" title=${o("sessionsRename")} @click=${()=>{this.rename(t)}}>
            ${L("edit")}
          </button>
          <button class="icon-btn" title=${o(e?"sessionsUnarchive":"sessionsArchive")}
            @click=${()=>{l.patchSession(t.key,{archived:!e})}}>
            ${L("archive")}
          </button>
        </div>
      </div>
    `}};Ba([y()],hn.prototype,"showArchived",2);hn=Ba([ke("sessions-view")],hn);var Rc=Object.defineProperty,Pc=Object.getOwnPropertyDescriptor,ks=(t,e,s,n)=>{for(var i=n>1?void 0:n?Pc(e,s):e,a=t.length-1,r;a>=0;a--)(r=t[a])&&(i=(n?r(e,s,i):r(i))||i);return n&&i&&Rc(e,s,i),i};let _t=class extends ae{constructor(){super(...arguments),this.form=null,this.busy=!1,this.message=null}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),l.subscribe(()=>this.requestUpdate()),l.refreshCron()}scheduleText(t){const e=t.schedule;return e.kind==="every"&&typeof e.everyMs=="number"?`每 ${Math.round(e.everyMs/6e4)} 分钟`:typeof e.expr=="string"?`cron: ${e.expr}`:e.kind??"—"}statusBadge(t){return t.enabled?t.lastRunStatus==="error"?c`<span class="badge err">⚠ ${o("cronLastError")}</span>`:t.lastRunStatus==="ok"||t.lastRunStatus==="success"?c`<span class="badge active">✓</span>`:c``:c`<span class="badge off">${o("cronDisabled")}</span>`}startCreate(){this.form={id:"",name:"",description:"",kind:"every",everyMinutes:"30",dailyTime:"09:00",cronExpr:"0 9 * * *",message:""},this.message=null}startEdit(t){const e=t.schedule,s=e.kind==="every"?"every":typeof e.expr=="string"&&/^[\d*]+\s+[\d*]+\s+\*\s+\*\s+\*$/.test(e.expr)?"daily":"cron";this.form={id:t.id,name:t.name??"",description:t.description??"",kind:s,everyMinutes:e.kind==="every"&&typeof e.everyMs=="number"?String(Math.round(e.everyMs/6e4)):"30",dailyTime:s==="daily"&&typeof e.expr=="string"?e.expr.split(/\s+/).slice(1).join(":").replace(/^(\d+):(\d+)$/,(n,i,a)=>`${String(i).padStart(2,"0")}:${String(a).padStart(2,"0")}`):"09:00",cronExpr:typeof e.expr=="string"?e.expr:"0 9 * * *",message:t.payload?.message??""},this.message=null}async submit(){if(!this.form||this.busy)return;const t=this.form;if(!t.name.trim()||!t.message.trim())return;this.busy=!0,this.requestUpdate();const e={name:t.name.trim(),description:t.description.trim(),kind:t.kind,everyMinutes:Number(t.everyMinutes)||30,dailyTime:t.dailyTime,cronExpr:t.cronExpr.trim(),message:t.message.trim(),enabled:!0},s=t.id?await l.cronUpdateJob(t.id,e):await l.cronCreate(e);this.busy=!1,this.message=s.ok?{ok:!0,text:t.id?o("cronSaved"):o("cronCreated")}:{ok:!1,text:s.error??"error"},s.ok&&(this.form=null),this.requestUpdate()}async removeJob(t){window.confirm(o("cronDeleteConfirm",{name:t.name??t.id.slice(0,8)}))&&await l.cronDelete(t.id)}render(){const t=l.cronJobs;return c`
      <div class="sessions-toolbar glass">
        <span class="count">${o("cronTitle")} · ${t.length}</span>
        <div class="logs-toolbar-btns">
          <button class="toggle-btn" @click=${()=>this.startCreate()}>+ ${o("cronNew")}</button>
          <button class="toggle-btn" @click=${()=>{l.refreshCron()}}>${L("refresh")}</button>
        </div>
      </div>

      <div class="session-list">
        ${this.form?this.renderForm():g}
        ${this.message?c`<div class="notice ${this.message.ok?"ok":"error"}" style="margin:6px 2px">${this.message.text}</div>`:g}
        ${!t.length&&!this.form?c`<div class="empty-state">${o("cronEmpty")}</div>`:""}
        ${t.map(e=>e.id===this.form?.id?g:c`
          <div class="cron-item glass">
            <div class="cron-head">
              <div class="cron-name">${e.name||e.id.slice(0,8)} ${this.statusBadge(e)}</div>
              <div class="s-actions">
                <button class="icon-btn" title=${o("cronEdit")} @click=${()=>this.startEdit(e)}>✏️</button>
                <button class="icon-btn" title=${o("cronRunNow")} @click=${()=>{l.cronRunNow(e.id)}}>${L("send")}</button>
                <button class="icon-btn" title=${e.enabled?o("cronDisable"):o("cronEnable")}
                  @click=${()=>{l.cronToggle(e.id,!e.enabled)}}>${e.enabled?"⏸":"▶"}</button>
                <button class="icon-btn" title=${o("delete")} @click=${()=>{this.removeJob(e)}}>🗑</button>
              </div>
            </div>
            ${e.description?c`<div class="cron-desc">${e.description}</div>`:g}
            <div class="cron-meta">
              <span>⏱ ${this.scheduleText(e)}</span>
              ${e.nextRunAtMs?c`<span>${o("cronNext")}: ${Mt(e.nextRunAtMs)}</span>`:g}
              ${e.lastRunAtMs?c`<span>${o("cronLast")}: ${Mt(e.lastRunAtMs)}</span>`:g}
              <span>${o("cronIsolated")}</span>
            </div>
          </div>
        `)}
      </div>
    `}renderForm(){const t=this.form,e=t.name.trim()&&t.message.trim();return c`
      <div class="cron-form glass">
        <div class="mp-name" style="margin-bottom:8px">${t.id?o("cronEditing",{name:t.name}):o("cronNew")}</div>
        <div class="mp-grid">
          <div>
            <label class="hint" style="margin:4px 0 4px">${o("cronFieldName")}</label>
            <input class="field" .value=${t.name} @input=${s=>{this.form={...t,name:s.target.value}}} />
          </div>
          <div>
            <label class="hint" style="margin:4px 0 4px">${o("cronFieldKind")}</label>
            <div class="seg-control">
              <button class=${t.kind==="every"?"active":""} @click=${()=>{this.form={...t,kind:"every"}}}>${o("cronKindEvery")}</button>
              <button class=${t.kind==="daily"?"active":""} @click=${()=>{this.form={...t,kind:"daily"}}}>${o("cronKindDaily")}</button>
              <button class=${t.kind==="cron"?"active":""} @click=${()=>{this.form={...t,kind:"cron"}}}>Cron</button>
            </div>
          </div>
          ${t.kind==="every"?c`
            <div>
              <label class="hint" style="margin:4px 0 4px">${o("cronEveryMinutes")}</label>
              <input class="field" type="number" min="1" .value=${t.everyMinutes} @input=${s=>{this.form={...t,everyMinutes:s.target.value}}} />
            </div>`:g}
          ${t.kind==="daily"?c`
            <div>
              <label class="hint" style="margin:4px 0 4px">${o("cronDailyTime")}</label>
              <input class="field" type="time" .value=${t.dailyTime} @input=${s=>{this.form={...t,dailyTime:s.target.value}}} />
            </div>`:g}
          ${t.kind==="cron"?c`
            <div>
              <label class="hint" style="margin:4px 0 4px">${o("cronCronExpr")}</label>
              <input class="field" placeholder="30 9 * * *" .value=${t.cronExpr} @input=${s=>{this.form={...t,cronExpr:s.target.value}}} />
            </div>`:g}
        </div>
        <label class="hint" style="margin:10px 0 4px">${o("cronFieldDesc")}</label>
        <input class="field" .value=${t.description} @input=${s=>{this.form={...t,description:s.target.value}}} />
        <label class="hint" style="margin:10px 0 4px">${o("cronFieldMessage")}</label>
        <textarea class="field" rows="3" placeholder="${o("cronMessageHint")}" .value=${t.message}
          @input=${s=>{this.form={...t,message:s.target.value}}}></textarea>
        <div class="actions">
          <button class="btn primary" ?disabled=${!e||this.busy} @click=${()=>{this.submit()}}>
            ${this.busy?o("loading"):o("save")}</button>
          <button class="btn" ?disabled=${this.busy} @click=${()=>{this.form=null,this.requestUpdate()}}>${o("cancel")}</button>
        </div>
      </div>
    `}};ks([y()],_t.prototype,"form",2);ks([y()],_t.prototype,"busy",2);ks([y()],_t.prototype,"message",2);_t=ks([ke("cron-view")],_t);var Ic=Object.defineProperty,Oc=Object.getOwnPropertyDescriptor,_n=(t,e,s,n)=>{for(var i=n>1?void 0:n?Oc(e,s):e,a=t.length-1,r;a>=0;a--)(r=t[a])&&(i=(n?r(e,s,i):r(i))||i);return n&&i&&Ic(e,s,i),i};let ms=class extends ae{constructor(){super(...arguments),this.query="",this.enableDialog=null}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),l.subscribe(()=>this.requestUpdate()),l.refreshSkills()}filtered(){const t=this.query.trim().toLowerCase(),e=l.skills;return t?e.filter(s=>s.name?.toLowerCase().includes(t)||s.description?.toLowerCase().includes(t)):e}async handleInstall(t,e){const s=l.downloadUrl(t);window.open(s,"_blank");const n=await l.installSkill(t);n.ok&&(this.enableDialog={name:n.skillName,skillId:t},this.requestUpdate())}async handleEnableConfirm(){const t=this.enableDialog;if(!t)return;this.enableDialog=null,this.requestUpdate();const e=l.skills.find(s=>s.name===t.name)?.skillKey??l.marketplaceItems.find(s=>s.id===t.skillId)?.name??t.skillId;await l.setSkillEnabled(e,!0),await l.refreshSkills()}handleEnableSkip(){this.enableDialog=null,this.requestUpdate()}render(){return c`
      ${this.enableDialog?this.renderEnableDialog():g}
      ${l.marketplaceDetailItem?this.renderDetailModal():g}
      <div class="sessions-toolbar glass">
        <span class="count">${o("skillsTitle")} · ${l.skills.length}</span>
        <button class="toggle-btn" @click=${()=>{l.toggleMarketplace()}}>
          ${L("market")} ${l.marketplaceOpen?o("marketplaceBack"):o("tabMarketplace")}
        </button>
      </div>
      ${l.marketplaceOpen?this.renderMarketplace():this.renderInstalled()}
    `}renderInstalled(){const t=this.filtered();return c`
      <div class="skills-search">
        <input class="field" type="search" placeholder=${o("skillsSearch")} .value=${this.query}
          @input=${e=>{this.query=e.target.value}} />
      </div>
      <div class="session-list">
        ${l.skills.length?"":c`<div class="empty-state">${o("loading")}</div>`}
        ${l.skills.length&&!t.length?c`<div class="empty-state">${o("empty")}</div>`:""}
        ${t.map(e=>{const s=e.skillKey??e.name,n=!e.disabled;return c`
          <div class="skill-item glass">
            <div class="s-avatar">${e.emoji||"🧩"}</div>
            <div class="s-main">
              <div class="s-title">
                ${e.name}
                ${e.bundled?c`<span class="badge dim">${o("skillBundled")}</span>`:c`<span class="badge dim">${o("skillCustom")}</span>`}
                ${e.disabled?c`<span class="badge off">${o("skillDisabled")}</span>`:g}
                ${e.eligible===!1?c`<span class="badge err">${o("skillIneligible")}</span>`:g}
              </div>
              <div class="skill-desc">${e.description||""}</div>
            </div>
            <span class="seg-control" style="display:inline-flex;padding:2px">
              <button class=${n?"active":""} style="padding:4px 12px"
                ?disabled=${n} @click=${()=>{l.setSkillEnabled(s,!0)}}>${o("commsOn")}</button>
              <button class=${n?"":"active"} style="padding:4px 12px"
                ?disabled=${!n} @click=${()=>{l.setSkillEnabled(s,!1)}}>${o("commsOff")}</button>
            </span>
          </div>
        `})}
      </div>
    `}renderMarketplace(){return c`
      <div class="marketplace-layout">
        ${this.renderSidebar()}
        <div class="marketplace-content">
          ${this.renderMarketHeader()}
          ${this.renderMarketList()}
          ${this.renderPagination()}
        </div>
      </div>
    `}renderSidebar(){const t=l.marketplaceCategories,e=t.length>0;return c`
      <aside class="marketplace-sidebar">
        <div class="sidebar-title">${o("marketplaceCategory")}</div>
        <button class="sidebar-item ${l.marketplaceCategory===""?"active":""}"
          @click=${()=>l.setMarketplaceCategory("")}>
          ${L("folder")} ${o("marketplaceCategoryAll")}
        </button>
        ${e?t.map(s=>c`
          <button class="sidebar-item ${l.marketplaceCategory===s.id?"active":""}"
            @click=${()=>l.setMarketplaceCategory(s.id)}>
            ${s.name} <span class="sidebar-count">${s.count}</span>
          </button>
        `):c`<div class="sidebar-empty">${o("loading")}</div>`}
      </aside>
    `}renderMarketHeader(){const t=l.marketplaceSources.filter(e=>e.enabled);return c`
      <div class="marketplace-header">
        <div class="search-wrap">
          ${L("search")}
          <input class="field search-input" type="search" placeholder=${o("marketplaceSearch")}
            .value=${l.marketplaceQuery}
            @input=${e=>{l.marketplaceQuery=e.target.value}}
            @keydown=${e=>{e.key==="Enter"&&l.searchMarketplace(l.marketplaceQuery)}} />
          ${l.marketplaceQuery?c`<button class="search-clear" @click=${()=>{l.marketplaceQuery="",l.searchMarketplace("")}}>✕</button>`:g}
        </div>
        <div class="header-actions">
          ${t.length>1?c`
            <select class="source-select" .value=${l.marketplaceSelectedSource}
              @change=${e=>{l.marketplaceSelectedSource=e.target.value,l.refreshMarketplace()}}>
              <option value="">${o("marketplaceCategoryAll")}</option>
              ${t.map(e=>c`<option value=${e.id}>${e.name}</option>`)}
            </select>
          `:g}
          <button class="btn-icon" @click=${()=>{l.refreshMarketplace()}} title=${o("retry")}>
            ${L("refresh")}
          </button>
        </div>
      </div>
    `}renderMarketList(){const t=l.marketplaceItems;return c`
      <div class="marketplace-grid">
        ${l.marketplaceLoading?c`<div class="empty-state grid-empty">${o("marketplaceLoading")}</div>`:""}
        ${!l.marketplaceLoading&&l.marketplaceError?c`<div class="empty-state grid-empty">${o("marketplaceError")}<div style="margin-top:8px"><button class="toggle-btn" @click=${()=>{l.loadMarketplace()}}>${o("marketplaceRetry")}</button></div></div>`:""}
        ${!l.marketplaceLoading&&!l.marketplaceError&&!t.length?c`<div class="empty-state grid-empty">${o("marketplaceNoResults")}</div>`:""}
        ${t.map(e=>this.renderSkillCard(e))}
      </div>
    `}renderSkillCard(t){const e=l.marketplaceInstalling.has(t.id),s=t.status??"notInstalled";return c`
      <div class="market-card glass" @click=${()=>l.openDetail(t)}>
        <div class="card-header">
          <div class="card-avatar">${t.name.charAt(0).toUpperCase()}</div>
          <div class="card-status">
            ${s==="installed"?c`<span class="badge ok">${o("marketplaceInstalled")}</span>`:g}
            ${s==="updateAvailable"?c`<span class="badge warn">${o("skillUpdateAvailable")}</span>`:g}
          </div>
        </div>
        <div class="card-name">${t.name}</div>
        <div class="card-author">${t.author?o("marketplaceAuthor",{name:t.author}):""}</div>
        <div class="card-desc">${t.description||""}</div>
        <div class="card-footer">
          <span class="card-meta">${t.downloads?o("marketplaceDownloads",{n:t.downloads}):""}</span>
          ${t.installs?c`<span class="card-meta">· ${t.installs} ${o("marketplaceInstalled")}</span>`:g}
          <span class="card-version">${t.version?o("marketplaceVersion",{v:t.version}):""}</span>
        </div>
        <div class="card-install" @click=${n=>{n.stopPropagation()}}>
          ${s==="installed"?c`<button class="btn installed-btn" disabled>${L("check")} ${o("marketplaceInstalled")}</button>`:s==="updateAvailable"?c`<button class="btn primary" ?disabled=${e} @click=${()=>{this.handleInstall(t.id,t.name)}}>${L("update")} ${o("skillUpdate")}</button>`:c`<button class="btn primary" ?disabled=${e} @click=${()=>{this.handleInstall(t.id,t.name)}}>${e?o("marketplaceInstalling"):c`${L("download")} ${o("marketplaceInstall")}`}</button>`}
        </div>
      </div>
    `}renderPagination(){return l.marketplaceLoading||!l.marketplaceItems.length?g:c`
      <div class="marketplace-pagination">
        <button class="page-btn" ?disabled=${l.marketplacePage<=1} @click=${()=>l.prevPage()}>‹</button>
        <span class="page-info">${l.marketplacePage}</span>
        <button class="page-btn" ?disabled=${!l.marketplaceHasMore} @click=${()=>l.nextPage()}>›</button>
      </div>
    `}renderDetailModal(){const t=l.marketplaceDetailItem,e=t.status??"notInstalled",s=l.marketplaceInstalling.has(t.id);return c`
      <div class="modal-overlay" @click=${()=>l.openDetail(null)}>
        <div class="modal-card detail-modal glass-strong" @click=${n=>n.stopPropagation()}>
          <button class="modal-close" @click=${()=>l.openDetail(null)}>✕</button>
          <div class="detail-header">
            <div class="detail-avatar">${t.name.charAt(0).toUpperCase()}</div>
            <div class="detail-info">
              <h2>${t.name}</h2>
              <div class="detail-meta">
                ${t.author?c`<span>${o("marketplaceAuthor",{name:t.author})}</span>`:g}
                ${t.version?c`<span>· ${o("marketplaceVersion",{v:t.version})}</span>`:g}
                ${t.downloads?c`<span>· ${o("marketplaceDownloads",{n:t.downloads})}</span>`:g}
              </div>
            </div>
          </div>
          <div class="detail-desc">${t.description||o("marketplaceNoDesc")}</div>
          ${t.tags?.length?c`<div class="detail-tags">${t.tags.map(n=>c`<span class="tag">${n}</span>`)}</div>`:g}
          <div class="detail-actions">
            ${e==="installed"?c`<button class="btn primary big" disabled>${L("check")} ${o("marketplaceInstalled")}</button>`:e==="updateAvailable"?c`<button class="btn primary big" ?disabled=${s} @click=${()=>{this.handleInstall(t.id,t.name)}}>${L("update")} ${o("skillUpdate")}</button>`:c`<button class="btn primary big" ?disabled=${s} @click=${()=>{this.handleInstall(t.id,t.name)}}>${s?o("marketplaceInstalling"):c`${L("download")} ${o("marketplaceInstall")}`}</button>`}
          </div>
        </div>
      </div>
    `}renderEnableDialog(){const t=this.enableDialog;return c`
      <div class="modal-overlay" @click=${()=>this.handleEnableSkip()}>
        <div class="modal-card glass-strong" @click=${e=>e.stopPropagation()}>
          <h3>${o("marketplaceEnableNow")}</h3>
          <p class="hint">${t.name}</p>
          <p class="hint">${o("marketplaceEnableHint")}</p>
          <div class="actions">
            <button class="btn" @click=${()=>this.handleEnableSkip()}>${o("marketplaceEnableNo")}</button>
            <button class="btn primary" @click=${()=>{this.handleEnableConfirm()}}>${o("marketplaceEnableYes")}</button>
          </div>
        </div>
      </div>
    `}};_n([y()],ms.prototype,"query",2);_n([y()],ms.prototype,"enableDialog",2);ms=_n([ke("skills-view")],ms);var Lc=Object.defineProperty,Dc=Object.getOwnPropertyDescriptor,ws=(t,e,s,n)=>{for(var i=n>1?void 0:n?Dc(e,s):e,a=t.length-1,r;a>=0;a--)(r=t[a])&&(i=(n?r(e,s,i):r(i))||i);return n&&i&&Lc(e,s,i),i};let zt=class extends ae{constructor(){super(...arguments),this.setupCode=null,this.setupBusy=!1,this.copied=!1}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),l.subscribe(()=>this.requestUpdate()),l.refreshDevices()}async generateSetupCode(){if(!this.setupBusy){this.setupBusy=!0,this.requestUpdate();try{this.setupCode=await l.deviceSetupCode()}catch(t){console.error("[devices] setupCode failed",t)}this.setupBusy=!1,this.requestUpdate()}}async copySetupCode(){const t=this.setupCode?.setupCode;if(t)try{await navigator.clipboard.writeText(t),this.copied=!0,this.requestUpdate(),setTimeout(()=>{this.copied=!1,this.requestUpdate()},2e3)}catch{}}render(){return c`
      <div class="sessions-toolbar glass">
        <span class="count">${o("devicesTitle")}</span>
        <div class="logs-toolbar-btns">
          <button class="toggle-btn" ?disabled=${this.setupBusy} @click=${()=>{this.generateSetupCode()}}>
            📱 ${o("devicesSetupCodeBtn")}</button>
          <button class="toggle-btn" @click=${()=>{l.refreshDevices()}}>${L("refresh")} ${o("retry")}</button>
        </div>
      </div>
      <div class="session-list">
        ${this.setupCode?c`
          <div class="card glass" style="margin:0 2px 12px;text-align:center">
            <h3>${o("devicesSetupCodeTitle")}</h3>
            <div class="hint">${o("devicesSetupCodeHint")}</div>
            ${this.setupCode.qrDataUrl?c`<img src=${this.setupCode.qrDataUrl} alt="QR" style="width:220px;height:220px;border-radius:var(--radius-md);margin:10px auto;display:block" />`:g}
            <div class="hint" style="overflow-wrap:anywhere;font-size:11px">${this.setupCode.setupCode??""}</div>
            <div class="actions" style="justify-content:center">
              <button class="btn" @click=${()=>{this.copySetupCode()}}>${this.copied?"✓ "+o("devicesCopied"):o("devicesCopy")}</button>
              <button class="btn" @click=${()=>{this.setupCode=null,this.requestUpdate()}}>${o("cancel")}</button>
            </div>
          </div>
        `:g}
        ${this.renderPending()}
        ${this.renderPaired()}
        ${this.renderNodes()}
        ${this.renderPresence()}
      </div>
    `}renderPending(){const t=l.devicesPending;return t.length?c`
      <div class="session-section-title">${o("devicesPending")} (${t.length})</div>
      ${t.map(e=>c`
        <div class="device-item glass">
          <div class="s-avatar">🔑</div>
          <div class="s-main">
            <div class="s-title">${e.platform??"device"} · ${e.clientId??""}</div>
            <div class="skill-desc">${o("devicesPendingHint")}</div>
          </div>
          <div class="s-actions" style="opacity:1">
            <button class="btn primary" style="padding:6px 14px" @click=${()=>{l.approveDevice(e.deviceId)}}>${o("deviceApprove")}</button>
            <button class="btn danger" style="padding:6px 14px" @click=${()=>{l.rejectDevice(e.deviceId)}}>${o("deviceReject")}</button>
          </div>
        </div>
      `)}
    `:g}renderPaired(){const t=l.devicesPaired;return t.length?c`
      <div class="session-section-title">${o("devicesPaired")} (${t.length})</div>
      ${t.map(e=>c`
        <div class="device-item glass">
          <div class="s-avatar">${e.platform==="web"?"🌐":e.platform==="ios"?"📱":"💻"}</div>
          <div class="s-main">
            <div class="s-title">
              ${e.platform??"device"} · ${e.role??"operator"}
              ${e.lastSeenReason==="connect"?c`<span class="badge active">${o("deviceOnline")}</span>`:g}
            </div>
            <div class="skill-desc">${e.clientId??""} · ${e.lastSeenAtMs?Mt(e.lastSeenAtMs):""} · ${(e.scopes??[]).join(", ")}</div>
          </div>
        </div>
      `)}
    `:g}renderNodes(){const t=l.nodes;return t.length?c`
      <div class="session-section-title">${o("devicesNodes")} (${t.length})</div>
      ${t.map(e=>c`
        <div class="device-item glass">
          <div class="s-avatar">${e.connected?"🟢":"⚪"}</div>
          <div class="s-main">
            <div class="s-title">
              ${e.displayName??e.nodeId.slice(0,10)}
              ${e.connected?c`<span class="badge active">${o("deviceConnected")}</span>`:c`<span class="badge dim">${o("deviceOffline")}</span>`}
            </div>
            <div class="skill-desc">${e.platform??""} · ${e.remoteIp??""} ${e.lastSeenAtMs?"· "+Mt(e.lastSeenAtMs):""}</div>
          </div>
        </div>
      `)}
    `:g}renderPresence(){const t=l.presenceList;return t.length?c`
      <div class="session-section-title">${o("devicesPresence")}</div>
      ${t.map(e=>c`
        <div class="device-item glass">
          <div class="s-avatar">${e.mode==="gateway"?"🏠":"🔗"}</div>
          <div class="s-main">
            <div class="s-title">${e.host??"—"}${e.mode?c`<span class="badge dim">${e.mode}</span>`:g}</div>
            <div class="skill-desc">${e.text??`${e.ip??""} · ${e.platform??""}`}</div>
          </div>
        </div>
      `)}
    `:g}};ws([y()],zt.prototype,"setupCode",2);ws([y()],zt.prototype,"setupBusy",2);ws([y()],zt.prototype,"copied",2);zt=ws([ke("devices-view")],zt);var Nc=Object.defineProperty,Uc=Object.getOwnPropertyDescriptor,zn=(t,e,s,n)=>{for(var i=n>1?void 0:n?Uc(e,s):e,a=t.length-1,r;a>=0;a--)(r=t[a])&&(i=(n?r(e,s,i):r(i))||i);return n&&i&&Nc(e,s,i),i};let gs=class extends ae{constructor(){super(...arguments),this.filter="",this.stickBottom=!0}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),l.subscribe(()=>this.requestUpdate())}updated(){if(this.stickBottom){const t=this.renderRoot.querySelector(".logs-console");t&&(t.scrollTop=t.scrollHeight)}}onScroll(t){const e=t.target;this.stickBottom=e.scrollHeight-e.scrollTop-e.clientHeight<60}renderLine(t){const e=this.filter.trim().toLowerCase();if(e&&!t.message.toLowerCase().includes(e))return g;const s=/error|fail|⚠/i.test(t.message),n=/warn|degrad/i.test(t.message);return c`<div class="log-line ${s?"err":n?"warn":""}">
      <span class="log-time">${t.time}</span><span class="log-msg">${t.message}</span>
    </div>`}render(){const t=l.logLines;return c`
      <div class="sessions-toolbar glass">
        <span class="count">${o("logsTitle")} · ${t.length}</span>
        <div class="logs-toolbar-btns">
          <button class="toggle-btn" @click=${()=>{this.stickBottom=!0}}>⬇ ${o("logsFollow")}</button>
          <button class="toggle-btn" @click=${()=>l.clearLogs()}>${o("logsClear")}</button>
        </div>
      </div>
      <div class="skills-search">
        <input class="field" type="search" placeholder=${o("logsSearch")} .value=${this.filter}
          @input=${e=>{this.filter=e.target.value}} />
      </div>
      <div class="logs-console glass" @scroll=${this.onScroll}>
        ${t.length?"":c`<div class="empty-state">${o("loading")}</div>`}
        ${t.map(e=>this.renderLine(e))}
      </div>
    `}};zn([y()],gs.prototype,"filter",2);zn([y()],gs.prototype,"stickBottom",2);gs=zn([ke("logs-view")],gs);var Bc=Object.defineProperty,Hc=Object.getOwnPropertyDescriptor,Ot=(t,e,s,n)=>{for(var i=n>1?void 0:n?Hc(e,s):e,a=t.length-1,r;a>=0;a--)(r=t[a])&&(i=(n?r(e,s,i):r(i))||i);return n&&i&&Bc(e,s,i),i};let pt=class extends ae{constructor(){super(...arguments),this.quotaLabel="",this.quotaProvider="",this.quotaWan="",this.showHidden=!1}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),l.subscribe(()=>this.requestUpdate()),l.refreshUsage()}fmtTok(t){return Math.abs(t)>=1e8?`${(t/1e8).toFixed(2)}亿`:Math.abs(t)>=1e4?`${(t/1e4).toFixed(1)}万`:t>=1e3?`${(t/1e3).toFixed(1)}K`:String(Math.round(t))}fmtCost(t){return t===0?"0":t.toFixed(t>=1?2:4)}addQuota(){const t=Number(this.quotaWan)*1e4;!this.quotaLabel.trim()||!t||(l.addQuota(this.quotaLabel.trim(),this.quotaProvider,t),this.quotaLabel="",this.quotaProvider="",this.quotaWan="")}renderQuotaCard(){const t=l.usageQuotas,e=[...new Set(l.usageByModel.map(s=>s.provider))];return c`
      <div class="card glass" style="margin:0 2px 12px">
        <h3>${o("quotaTitle")}</h3>
        ${t.map(s=>{const n=l.quotaRemain(s),i=s.totalTokens>0?Math.max(0,Math.min(100,n/s.totalTokens*100)):0,a=i<=10?"danger":i<=30?"warn":"";return c`
            <div class="quota-item">
              <div class="quota-head">
                <span class="quota-label">${s.label} <span class="badge dim">${s.provider||o("quotaAllModels")}</span></span>
                <span class="quota-remain ${i<=10?"low":""}">${this.fmtTok(Math.max(0,n))} / ${this.fmtTok(s.totalTokens)}</span>
                <button class="icon-btn" title=${o("delete")} @click=${()=>l.removeQuota(s.id)}>🗑</button>
              </div>
              <div class="meter ${a}"><span style="width:${i}%"></span></div>
              <div class="quota-sub">${o("quotaUsedSince",{n:this.fmtTok(Math.max(0,s.totalTokens-n))})}</div>
            </div>
          `})}
        <div class="mp-grid mp-grid-3" style="margin-top:10px">
          <div>
            <label class="hint" style="margin:4px 0 4px">${o("quotaFieldName")}</label>
            <input class="field" placeholder="如:智谱赠送" .value=${this.quotaLabel}
              @input=${s=>{this.quotaLabel=s.target.value}} />
          </div>
          <div>
            <label class="hint" style="margin:4px 0 4px">${o("quotaFieldScope")}</label>
            <select class="field" .value=${this.quotaProvider} @change=${s=>{this.quotaProvider=s.target.value}}>
              <option value="" ?selected=${!this.quotaProvider}>${o("quotaAllModels")}</option>
              ${e.map(s=>c`<option value=${s} ?selected=${this.quotaProvider===s}>${s}</option>`)}
            </select>
          </div>
          <div>
            <label class="hint" style="margin:4px 0 4px">${o("quotaFieldWan")}</label>
            <input class="field" type="number" min="1" placeholder="如 1000(万)" .value=${this.quotaWan}
              @input=${s=>{this.quotaWan=s.target.value}} />
          </div>
        </div>
        <div class="actions">
          <button class="btn primary" style="width:100%" ?disabled=${!this.quotaLabel.trim()||!Number(this.quotaWan)}
            @click=${()=>this.addQuota()}>${o("quotaAdd")}</button>
        </div>
        <div class="hint">${o("quotaHint")}</div>
      </div>
    `}render(){const t=l.usageTotals,e=new Set(l.usageHiddenModels),s=l.usageByModel.filter(i=>!e.has(i.model)),n=t.input+t.cacheRead>0?(t.cacheRead/(t.input+t.cacheRead)*100).toFixed(1):"0.0";return c`
      <div class="sessions-toolbar glass">
        <span class="count">${o("usageTitle")} · ${o("usageSessions",{n:l.usageSessionCount})}</span>
        <div class="logs-toolbar-btns">
          ${l.usageHiddenModels.length?c`
            <button class="toggle-btn" @click=${()=>{this.showHidden=!this.showHidden}}>
              ${o("usageHiddenBtn",{n:l.usageHiddenModels.length})}
            </button>`:g}
          <button class="toggle-btn" ?disabled=${l.usageLoading} @click=${()=>{l.refreshUsage()}}>
            ${L("refresh")} ${o("retry")}
          </button>
        </div>
      </div>

      <div class="usage-scroll">
        ${this.renderQuotaCard()}

        <div class="usage-summary glass">
          <div class="us-item">
            <div class="us-num">${this.fmtTok(t.totalTokens)}</div>
            <div class="us-label">${o("usageTotalTokens")}</div>
          </div>
          <div class="us-item">
            <div class="us-num">${this.fmtCost(t.totalCost)}</div>
            <div class="us-label">${o("usageTotalCost")}</div>
          </div>
          <div class="us-item">
            <div class="us-num">${this.fmtTok(t.input)}</div>
            <div class="us-label">${o("usageInput")}</div>
          </div>
          <div class="us-item">
            <div class="us-num">${this.fmtTok(t.output)}</div>
            <div class="us-label">${o("usageOutput")}</div>
          </div>
          <div class="us-item">
            <div class="us-num">${this.fmtTok(t.cacheRead)}</div>
            <div class="us-label">${o("usageCacheRead")} (${n}%)</div>
          </div>
        </div>

        ${this.showHidden&&l.usageHiddenModels.length?c`
          <div class="card glass" style="margin:0 2px 10px">
            <h3>${o("usageHiddenTitle")}</h3>
            ${l.usageHiddenModels.map(i=>c`
              <div class="mp-row">
                <div class="mp-info"><div class="mp-name">${i}</div></div>
                <button class="icon-btn" title=${o("usageUnhide")} @click=${()=>l.toggleHideModel(i)}>↩</button>
              </div>
            `)}
          </div>`:g}

        <div class="usage-table glass">
          <div class="ut-head">
            <span>${o("usageColModel")}</span>
            <span>${o("usageColInput")}</span>
            <span>${o("usageColOutput")}</span>
            <span>${o("usageColCache")}</span>
            <span>${o("usageColSessions")}</span>
            <span>${o("usageColCost")}</span>
            <span></span>
          </div>
          ${s.length?"":c`<div class="empty-state">${l.usageLoading?o("loading"):o("usageEmpty")}</div>`}
          ${s.map(i=>c`
            <div class="ut-row">
              <span class="ut-model" title=${i.model}>
                <span class="ut-provider">${i.provider}</span> ${i.model.split("/").slice(1).join("/")||i.model}
              </span>
              <span>${this.fmtTok(i.input)}</span>
              <span>${this.fmtTok(i.output)}</span>
              <span>${this.fmtTok(i.cacheRead)}</span>
              <span>${i.sessions}</span>
              <span class="ut-cost">${this.fmtCost(i.totalCost)}</span>
              <span><button class="icon-btn" title=${o("usageHideTitle")} @click=${()=>l.toggleHideModel(i.model)}>✕</button></span>
            </div>
          `)}
        </div>
        <div class="hint" style="padding:8px 6px">${o("usageNote")} ${o("usageHideNote")}</div>
      </div>
    `}};Ot([y()],pt.prototype,"quotaLabel",2);Ot([y()],pt.prototype,"quotaProvider",2);Ot([y()],pt.prototype,"quotaWan",2);Ot([y()],pt.prototype,"showHidden",2);pt=Ot([ke("usage-view")],pt);var Fc=Object.getOwnPropertyDescriptor,qc=(t,e,s,n)=>{for(var i=n>1?void 0:n?Fc(e,s):e,a=t.length-1,r;a>=0;a--)(r=t[a])&&(i=r(i)||i);return i};let sa=class extends ae{createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),l.subscribe(()=>this.requestUpdate()),l.refreshSystemInfo(),l.refreshModels()}disconnectedCallback(){super.disconnectedCallback()}loadPct(t){return!t.loadAverage?.length||!t.cpuCount?0:Math.min(100,t.loadAverage[0]/t.cpuCount*100)}memPct(t){if(!t.memoryTotalBytes)return 0;const e=t.memoryTotalBytes-(t.memoryFreeBytes??0);return Math.max(0,Math.min(100,e/t.memoryTotalBytes*100))}diskPct(t){if(!t.diskTotalBytes)return 0;const e=t.diskTotalBytes-(t.diskAvailableBytes??0);return Math.max(0,Math.min(100,e/t.diskTotalBytes*100))}meterClass(t){return t>=90?"meter danger":t>=70?"meter warn":"meter"}render(){const t=l.systemInfo;return c`
      <div class="settings-scroll">
        ${t?this.renderCards(t):c`<div class="empty-state">${o("loading")}</div>`}
        <div class="refresh-note">${L("refresh")} ${o("statusRefreshEvery")}</div>
      </div>
    `}renderCards(t){const e=this.loadPct(t),s=this.memPct(t),n=this.diskPct(t),i=t.loadAverage?.length?t.loadAverage.slice(0,3).map(h=>h.toFixed(2)).join(" / "):"—",a=(t.memoryTotalBytes??0)-(t.memoryFreeBytes??0),r=(t.diskTotalBytes??0)-(t.diskAvailableBytes??0);return c`
      <div class="card glass">
        <h3>${o("statusTitle")}</h3>
        <div class="row"><span class="k">${o("statusMachine")}</span><span class="v">${t.machineName??"—"} · ${t.arch??""}</span></div>
        <div class="row"><span class="k">${o("statusOS")}</span><span class="v">${t.osLabel??t.platform??"—"}</span></div>
        <div class="row"><span class="k">${o("statusGateway")}</span><span class="v">${l.client.snapshot?.server?.version??"—"}</span></div>
        <div class="row"><span class="k">${o("statusUptime")}</span><span class="v">${Gr(t.uptimeMs)}</span></div>
        <div class="row"><span class="k">${o("statusNode")}</span><span class="v">${t.nodeVersion??"—"}</span></div>
        <div class="row"><span class="k">${o("statusLan")}</span><span class="v">${t.lanAddress?`${t.lanAddress}:${t.port??""}`:"—"}</span></div>
      </div>

      <div class="card glass">
        <h3>${o("statusCPU")}</h3>
        <div class="row"><span class="k">${o("statusLoad")}</span><span class="v">${i}</span></div>
        <div class="meter ${this.meterClass(e)}" style="width:100%"><span style="width:${e.toFixed(1)}%"></span></div>
        <div class="row"><span class="k">${t.cpuModel??"CPU"}</span><span class="v pct">${e.toFixed(0)}%</span></div>
        <div class="row"><span class="k">Cores</span><span class="v">${t.cpuCount??"—"}</span></div>
      </div>

      <div class="card glass">
        <h3>${o("statusMemory")}</h3>
        <div class="meter ${this.meterClass(s)}" style="width:100%"><span style="width:${s.toFixed(1)}%"></span></div>
        <div class="row"><span class="k">${o("statusUsedTotal")}</span><span class="v">${ts(a)} / ${ts(t.memoryTotalBytes)}</span></div>
      </div>

      <div class="card glass">
        <h3>${o("statusDisk")}</h3>
        <div class="meter ${this.meterClass(n)}" style="width:100%"><span style="width:${n.toFixed(1)}%"></span></div>
        <div class="row"><span class="k">${o("statusUsedTotal")}</span><span class="v">${ts(r)} / ${ts(t.diskTotalBytes)}</span></div>
        <div class="row"><span class="k">${o("statusPath")}</span><span class="v">${t.diskPath??"—"}</span></div>
      </div>

      ${l.models.length?c`
      <div class="card glass">
        <h3>${o("statusModels")} (${l.models.length})</h3>
        ${l.models.map(h=>c`
          <div class="row">
            <span class="k">${h.provider??"—"} / ${h.id}</span>
            <span class="v">${h.name??""}${h.contextWindow?` · ${Math.round(h.contextWindow/1024)}K`:""}</span>
          </div>
        `)}
      </div>`:""}
    `}};sa=qc([ke("status-view")],sa);var jc=Object.defineProperty,Kc=Object.getOwnPropertyDescriptor,k=(t,e,s,n)=>{for(var i=n>1?void 0:n?Kc(e,s):e,a=t.length-1,r;a>=0;a--)(r=t[a])&&(i=(n?r(e,s,i):r(i))||i);return n&&i&&jc(e,s,i),i};const Zs=[{id:"telegram",label:"Telegram",emoji:"✈️",fields:[{key:"botToken",label:"Bot Token",secret:!0}]},{id:"discord",label:"Discord",emoji:"🎮",fields:[{key:"token",label:"Bot Token",secret:!0}]},{id:"feishu",label:"飞书",emoji:"🐦",fields:[{key:"appId",label:"App ID",path:["accounts","main"]},{key:"appSecret",label:"App Secret",secret:!0,path:["accounts","main"]}]},{id:"qqbot",label:"QQ 机器人",emoji:"🐧",fields:[{key:"appId",label:"App ID"},{key:"clientSecret",label:"Client Secret",secret:!0}]},{id:"slack",label:"Slack",emoji:"💼",fields:[{key:"botToken",label:"Bot Token",secret:!0},{key:"appToken",label:"App Token",secret:!0}]}];let $=class extends ae{constructor(){super(...arguments),this.urlInput="",this.tokenInput="",this.mpName="",this.mpBaseUrl="",this.mpApiKey="",this.mpModelId="",this.mpModelName="",this.mpContext="131072",this.mpMaxTokens="8192",this.mpApi="openai-completions",this.mpCostInput="",this.mpCostCacheRead="",this.mpCostOutput="",this.mpBusy=!1,this.mpMessage=null,this.editName="",this.editBaseUrl="",this.editModels=[],this.memoryOpen=!1,this.dreamOpen=!1,this.channelPick=null,this.channelFieldValues={},this.channelBusy=!1,this.channelMessage=null,this.customChannelId="",this.customChannelJson='{"enabled": true}',this.mcpName="",this.mcpMessage=null,this.mcpTransport="stdio",this.mcpCommand="",this.mcpArgs="",this.mcpEnv="",this.mcpUrl="",this.mcpTimeout="",this.mcpHeaders="",this.mcpEditMode=!1,this.debugMethod="",this.debugParams="",this.debugResult="",this.debugBusy=!1,this.execOpen=!1,this.execPolicy=null,this.updateBusy=!1,this.updateMessage=null,this.section="general",this.agentsTab="agents",this.adOpen={},this.adModel="",this.adUtility="",this.adWorkspace="",this.adImgPrimary="",this.adImgFallbacks="",this.adMediaImage="",this.adMediaVideo="",this.adMediaMusic="",this.adCompactionEnabled="",this.adCompactionMode="default",this.adKeepRecent="",this.adRecentTurns="",this.adCompTimeout="",this.adFlushEnabled="",this.adHbEvery="",this.adHbStart="",this.adHbEnd="",this.adHbPrompt="",this.adEmbeddedPolicy="",this.adEmbeddedContract="",this.adPolicyAllow="",this.adBusy=!1,this.adMessage=null,this.lastDefaultsRef=null,this.toolsBusy=!1,this.toolsMessage=null,this.toolsAllow="",this.toolsDeny="",this.toolsElevated=!1,this.loggingBusy=!1,this.loggingMessage=null,this.hooksBusy=!1,this.hooksMessage=null,this.gwBusy=!1,this.gwMessage=null,this.ttsBusy=!1,this.ttsMessage=null,this.ttsNewProvider="",this.ttsNewKey="",this.entryBusy=!1,this.entryMessage=null,this.entryEditId=null,this.entryModel="",this.entryWorkspace="",this.cronCfgBusy=!1,this.cronCfgMessage=null,this.mcpTemplates=[{id:"github",label:"GitHub",config:{command:"npx",args:["-y","@modelcontextprotocol/server-github"],env:{}}},{id:"filesystem",label:"文件系统",config:{command:"npx",args:["-y","@modelcontextprotocol/server-filesystem","/path/to/dir"],env:{}}},{id:"sqlite",label:"SQLite",config:{command:"npx",args:["-y","@modelcontextprotocol/server-sqlite","--db","./data.db"],env:{}}},{id:"fetch",label:"网页抓取",config:{command:"npx",args:["-y","@modelcontextprotocol/server-fetch"],env:{}}},{id:"brave-search",label:"Brave 搜索",config:{command:"npx",args:["-y","@modelcontextprotocol/server-brave-search"],env:{}}},{id:"postgres",label:"PostgreSQL",config:{command:"npx",args:["-y","@modelcontextprotocol/server-postgres","postgresql://user:pass@localhost/db"],env:{}}}],this.execEditValue="",this.execMessage=null,this.newSourceName="",this.newSourceUrl="",this.newSourceKey="",this._lastToolsRef=null,this._lastLoggingRef=null,this._lastHooksRef=null,this._lastGwRef=null,this._lastTtsRef=null,this._lastEntryRef=null,this._lastCronCfgRef=null}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),l.subscribe(()=>{this.syncAgentForm(),this.syncToolsForm(),this.syncLoggingForm(),this.syncHooksForm(),this.syncGatewayForm(),this.syncTtsForm(),this.syncEntryForm(),this.syncCronCfgForm(),this.requestUpdate()}),this.urlInput=l.getGatewayUrl(),this.tokenInput=l.getToken(),l.refreshConfigProviders(),l.refreshDevices(),l.loadAgents(),l.refreshCron(),this.syncAgentForm(),this.syncToolsForm(),this.syncLoggingForm(),this.syncHooksForm(),this.syncGatewayForm(),this.syncTtsForm(),this.syncEntryForm(),this.syncCronCfgForm()}syncAgentForm(){const t=l.agentDefaults;if(!t||t===this.lastDefaultsRef)return;this.lastDefaultsRef=t;const e=x=>x==null?"":String(x),s=t.model;this.adModel=typeof s=="string"?s:e(s?.primary),this.adUtility=e(t.utilityModel),this.adWorkspace=e(t.workspace);const n=t.imageModel;this.adImgPrimary=n==null||typeof n=="string"?e(n):e(n.primary),this.adImgFallbacks=n==null||typeof n=="string"?"":(n.fallbacks??[]).join(", ");const i=t.mediaModels??{},a=x=>x==null||typeof x=="string"?e(x):e(x.primary);this.adMediaImage=a(i.image),this.adMediaVideo=a(i.video),this.adMediaMusic=a(i.music);const r=t.compaction??{};this.adCompactionEnabled=r.enabled===void 0?"":String(!!r.enabled),this.adCompactionMode=e(r.mode)||"default",this.adKeepRecent=r.keepRecentTokens===void 0?"":String(r.keepRecentTokens),this.adRecentTurns=r.recentTurnsPreserve===void 0?"":String(r.recentTurnsPreserve),this.adCompTimeout=r.timeoutSeconds===void 0?"":String(r.timeoutSeconds);const h=r.memoryFlush??{};this.adFlushEnabled=h.enabled===void 0?"":String(!!h.enabled);const u=t.heartbeat??{};this.adHbEvery=e(u.every);const m=u.activeHours??{};this.adHbStart=e(m.start),this.adHbEnd=e(m.end),this.adHbPrompt=e(u.prompt);const v=t.embeddedAgent??{};this.adEmbeddedPolicy=e(v.projectSettingsPolicy),this.adEmbeddedContract=e(v.executionContract);const f=t.modelPolicy??{};this.adPolicyAllow=Array.isArray(f.allow)?JSON.stringify(f.allow,null,2):""}cleanVal(t){const e=t.trim();return e===""?null:e}async adSave(t){if(this.adBusy)return;this.adBusy=!0,this.requestUpdate();const e=await l.patchAgentDefaults(t);this.adBusy=!1,this.adMessage=e.ok?{ok:!0,text:o("agentsSaved")}:{ok:!1,text:`${o("agentsSaveFailed")}:${e.error??""}`},this.requestUpdate()}toggleAd(t){this.adOpen={...this.adOpen,[t]:!this.adOpen[t]}}async handleThinking(t){await l.setSessionThinking(t)}async handleFast(t){await l.setSessionFastMode(t)}brandingRow(t,e,s){const n=l.branding[t];return c`
      <div class="brand-row">
        ${ds(n,s,"brand-preview")}
        <div class="brand-controls">
          <div class="hint" style="margin:0 0 4px;font-weight:700;color:var(--text-1)">${o(e)}</div>
          <input class="field brand-emoji" type="text" placeholder="emoji" maxlength="4" .value=${n&&!n.startsWith("data:")?n:""}
            @keydown=${i=>{i.key==="Enter"&&l.setBranding(t,i.target.value.trim())}}
            @blur=${i=>l.setBranding(t,i.target.value.trim())} />
          <label class="btn" style="padding:6px 12px;font-size:12px;cursor:pointer">
            ${o("brandUpload")}
            <input type="file" accept="image/*" style="display:none"
              @change=${i=>{this.handleAvatarUpload(t,i)}} />
          </label>
          ${n?c`<button class="btn" style="padding:6px 12px;font-size:12px" @click=${()=>l.setBranding(t,"")}>${o("brandReset")}</button>`:g}
        </div>
      </div>
    `}async handleAvatarUpload(t,e){const s=e.target,n=s.files?.[0];if(n){try{const i=await Wr(n);l.setBranding(t,i)}catch(i){console.error("avatar upload failed",i)}s.value=""}}renderAppearanceCard(){return c`
      <div class="card glass">
        <h3>${o("brandCardTitle")}</h3>
        ${this.brandingRow("appLogo","brandAppLogo","🦞")}
        <div style="height:12px"></div>
        ${this.brandingRow("aiAvatar","brandAiAvatar","🦞")}
        <div class="hint">${o("brandHint")}</div>
      </div>
      <div class="card glass">
        <h3>${o("settingsAppearance")}</h3>
        <div class="hint">${o("settingsThemeFollow")}</div>
      </div>
    `}toggleMemory(){this.memoryOpen=!this.memoryOpen,this.memoryOpen&&!l.memoryFiles.length&&l.loadMemoryFiles()}toggleDream(){this.dreamOpen=!this.dreamOpen,this.dreamOpen&&!l.dreamDiary&&l.loadDreamDiary()}renderMemoryCard(){const t=l.memoryContent;return c`
      <div class="card glass">
        <h3>${o("memoryTitle")}
          <button class="toggle-btn" style="margin-left:10px;padding:4px 12px" @click=${()=>this.toggleMemory()}>
            ${this.memoryOpen?o("memoryCollapse"):o("memoryExpand")}
          </button>
        </h3>
        <div class="hint">${o("memoryHint")}</div>
        ${this.memoryOpen?c`
          <div class="memory-files">
            ${l.memoryLoading&&!l.memoryFiles.length?c`<span class="hint">${o("loading")}</span>`:g}
            ${l.memoryFiles.map(e=>c`
              <button class="toggle-btn ${t?.path===e.path?"active":""}" style="margin:4px 6px 0 0;padding:5px 12px"
                @click=${()=>{l.loadMemoryContent(e.path)}}>
                ${e.path==="MEMORY.md"?o("memoryMainFile"):e.name}
              </button>
            `)}
          </div>
          ${t?c`
            <pre class="memory-view">${t.content}</pre>
          `:g}
        `:g}
      </div>
    `}renderDreamCard(){const t=l.dreamDiary,e=t?.content??"",s=(e.match(/^\*\w+ \d+, \d+/gm)??[]).length;return c`
      <div class="card glass">
        <h3>${o("dreamTitle")}
          <button class="toggle-btn" style="margin-left:10px;padding:4px 12px" @click=${()=>this.toggleDream()}>
            ${this.dreamOpen?o("memoryCollapse"):o("dreamExpand")}
          </button>
        </h3>
        <div class="hint">
          ${t?.found?o("dreamHintFound",{path:t.path??""}):o("dreamHintEmpty")}
        </div>
        ${this.dreamOpen?c`
          ${l.dreamLoading&&!e?c`<span class="hint">${o("loading")}</span>`:g}
          ${e?c`<pre class="memory-view dream-view">${e}</pre>`:g}
          ${s?c`<div class="hint">${o("dreamEntryCount",{n:s})}</div>`:g}
        `:g}
      </div>
    `}async handleConnect(){l.saveCreds(this.urlInput.trim()||"ws://127.0.0.1:18789",this.tokenInput.trim()),l.stop(),await l.start()}handleDisconnect(){l.stop(),this.tokenInput="",sessionStorage.removeItem("openclaw-webui.gateway-token")}switchLocale(t){jr(t),this.requestUpdate()}deriveName(t){try{const e=new URL(t).hostname,s=e.split(".");return(s.length>=2?s[s.length-2]:e).replace(/[^a-z0-9-]/gi,"").toLowerCase()||"custom"}catch{return"custom"}}async submitModel(){if(this.mpBusy)return;const t=this.mpBaseUrl.trim(),e=this.mpApiKey.trim(),s=this.mpModelId.trim();if(!t||!e||!s)return;const n=(this.mpName.trim()||this.deriveName(t)).toLowerCase().replace(/[^a-z0-9-]/g,"")||"custom";this.mpBusy=!0,this.mpMessage=null,this.requestUpdate();const i=await l.addModelProvider({name:n,baseUrl:t,apiKey:e,modelId:s,modelName:this.mpModelName.trim()||void 0,contextWindow:Number(this.mpContext)||void 0,maxTokens:Number(this.mpMaxTokens)||void 0,api:this.mpApi,costInput:this.mpCostInput.trim()?Number(this.mpCostInput):void 0,costCacheRead:this.mpCostCacheRead.trim()?Number(this.mpCostCacheRead):void 0,costOutput:this.mpCostOutput.trim()?Number(this.mpCostOutput):void 0});this.mpBusy=!1,this.mpMessage=i.ok?{ok:!0,text:`已添加 ${n}/${s},立即生效`}:{ok:!1,text:i.error??"添加失败"},i.ok&&(this.mpBaseUrl="",this.mpApiKey="",this.mpModelId="",this.mpModelName="",this.mpName="",this.mpCostInput="",this.mpCostCacheRead="",this.mpCostOutput=""),this.requestUpdate()}async removeProvider(t){if(!window.confirm(`确定删除模型提供商「${t}」?其下所有模型将从可用列表移除。`))return;this.mpBusy=!0,this.requestUpdate();const e=await l.removeModelProvider(t);this.mpBusy=!1,this.mpMessage=e.ok?{ok:!0,text:`已删除 ${t}`}:{ok:!1,text:e.error??"删除失败"},this.requestUpdate()}startEdit(t){const e=l.configProvidersRaw[t];e&&(this.editName=t,this.editBaseUrl=e.baseUrl??"",this.editModels=(e.models??[]).map(s=>{const n=s.cost??{};return{id:String(s.id??""),name:String(s.name??s.id??""),contextWindow:s.contextWindow!==void 0?String(s.contextWindow):"",maxTokens:s.maxTokens!==void 0?String(s.maxTokens):"",costInput:n.input!==void 0?String(n.input):"",costCacheRead:n.cacheRead!==void 0?String(n.cacheRead):"",costOutput:n.output!==void 0?String(n.output):"",raw:s}}),this.mpMessage=null,this.requestUpdate())}updateEditModel(t,e,s){this.editModels=this.editModels.map((n,i)=>i===t?{...n,[e]:s}:n)}removeEditModel(t){this.editModels=this.editModels.filter((e,s)=>s!==t)}async saveEdit(){if(this.mpBusy||!this.editName)return;this.mpBusy=!0,this.mpMessage=null,this.requestUpdate();const t=this.editModels.map(s=>{const n={...s.raw,id:s.id};s.name.trim()&&(n.name=s.name.trim()),s.contextWindow.trim()&&(n.contextWindow=Number(s.contextWindow)),s.maxTokens.trim()&&(n.maxTokens=Number(s.maxTokens));const i={...s.raw.cost??{}};return s.costInput.trim()&&(i.input=Number(s.costInput)),s.costCacheRead.trim()&&(i.cacheRead=Number(s.costCacheRead)),s.costOutput.trim()&&(i.output=Number(s.costOutput)),Object.keys(i).length&&(n.cost=i),n}),e=await l.updateProviderModels(this.editName,{baseUrl:this.editBaseUrl.trim()||void 0,models:t});this.mpBusy=!1,this.mpMessage=e.ok?{ok:!0,text:`已保存 ${this.editName},立即生效`}:{ok:!1,text:e.error??"保存失败"},e.ok&&(this.editName=""),this.requestUpdate()}renderSessionCard(){const t=!!l.currentSessionKey,e=l.currentModel,s=l.currentThinking||"off",n=l.currentFastMode,i=l.currentThinkingLevels;return c`
      <div class="card glass">
        <h3>${o("prefTitle")}${t?c`<span class="badge dim" style="margin-left:8px">${o("prefForSession")}</span>`:""}</h3>
        <div class="row"><span class="k">${o("prefModel")}</span><span class="v">${e||"—"}</span></div>
        <div class="row"><span class="k">${o("prefThinking")}</span></div>
        <div class="seg-control" style="margin:2px 0 8px">
          ${i.map(a=>c`
            <button class=${s===a.id?"active":""} ?disabled=${!t}
              @click=${()=>{this.handleThinking(a.id)}}>${a.label}</button>
          `)}
        </div>
        <div class="row"><span class="k">${o("prefFast")}</span></div>
        <div class="seg-control" style="margin:2px 0 4px">
          <button class=${n?"":"active"} ?disabled=${!t} @click=${()=>{this.handleFast(!1)}}>${o("prefFastOff")}</button>
          <button class=${n?"active":""} ?disabled=${!t} @click=${()=>{this.handleFast(!0)}}>${o("prefFastOn")}</button>
        </div>
        <div class="hint">${o(t?"prefSessionHint":"prefNoSession")}</div>
      </div>
    `}async submitChannel(){if(!this.channelPick||this.channelBusy)return;const t=Zs.find(n=>n.id===this.channelPick),e={enabled:!0};for(const n of t.fields){const i=(this.channelFieldValues[n.key]??"").trim();if(i)if(n.path){let a=e;for(const r of n.path)a[r]=a[r]??{},a=a[r];a[n.key]=i}else e[n.key]=i}this.channelBusy=!0,this.requestUpdate();const s=await l.addChannel(this.channelPick,e);this.channelBusy=!1,this.channelMessage=s.ok?{ok:!0,text:o("channelSaved",{id:this.channelPick})}:{ok:!1,text:s.error??"error"},s.ok&&(this.channelPick=null,this.channelFieldValues={}),this.requestUpdate()}async deleteChannel(t){if(!window.confirm(o("channelDeleteConfirm",{id:t})))return;this.channelBusy=!0,this.requestUpdate();const e=await l.removeChannel(t);this.channelBusy=!1,this.channelMessage=e.ok?{ok:!0,text:o("channelDeleted",{id:t})}:{ok:!1,text:e.error??"error"},this.requestUpdate()}async logoutChannel(t){window.confirm(o("channelLogoutConfirm",{id:t}))&&(this.channelBusy=!0,this.requestUpdate(),await l.logoutChannel(t),this.channelBusy=!1,this.channelMessage={ok:!0,text:o("channelLoggedOut",{id:t})},await Promise.all([l.refreshDevices(),l.refreshConfigProviders()]),this.requestUpdate())}async submitCustomChannel(){if(this.channelBusy)return;const t=this.customChannelId.trim().toLowerCase().replace(/[^a-z0-9_-]/g,"");if(!t)return;let e;try{e=JSON.parse(this.customChannelJson)}catch(n){this.channelMessage={ok:!1,text:`JSON 格式错误:${String(n).slice(0,80)}`},this.requestUpdate();return}this.channelBusy=!0,this.requestUpdate();const s=await l.addChannel(t,e);this.channelBusy=!1,this.channelMessage=s.ok?{ok:!0,text:o("channelSaved",{id:t})}:{ok:!1,text:s.error??"error"},s.ok&&(this.channelPick=null,this.customChannelId="",this.customChannelJson='{"enabled": true}'),this.requestUpdate()}async toggleExecPolicy(){if(this.execOpen=!this.execOpen,this.execOpen&&!this.execPolicy)try{const t=await l.client.execApprovalsGet();this.execPolicy=t?.file??{note:"empty"}}catch(t){this.execPolicy={error:String(t)}}this.requestUpdate()}async runGatewayUpdate(){if(this.updateBusy||!window.confirm(o("updateConfirm")))return;this.updateBusy=!0,this.updateMessage={ok:!0,text:o("updateRunning")},this.requestUpdate();const t=await l.gatewayUpdate();this.updateBusy=!1,this.updateMessage=t.ok?{ok:!0,text:o("updateDone")}:{ok:!1,text:t.error??"error"},this.requestUpdate()}renderCommsCard(){const t=l.ttsInfo;return c`
      <div class="card glass">
        <h3>${o("commsTitle")}
          <button class="toggle-btn" style="margin-left:10px;padding:4px 12px" @click=${()=>{l.loadTts()}}>${L("refresh")}</button>
        </h3>
        ${t?c`
          <div class="row">
            <span class="k">${o("commsTts")}</span>
            <span class="v seg-control" style="display:inline-flex;padding:2px">
              <button class=${t.enabled?"active":""} style="padding:4px 14px" @click=${()=>{l.ttsSetEnabled(!0)}}>${o("commsOn")}</button>
              <button class=${t.enabled?"":"active"} style="padding:4px 14px" @click=${()=>{l.ttsSetEnabled(!1)}}>${o("commsOff")}</button>
            </span>
          </div>
          <div class="row">
            <span class="k">${o("commsProvider")}</span>
            <span class="v">
              <select class="field" style="width:auto;padding:5px 26px 5px 12px" .value=${t.provider??""}
                @change=${e=>{l.ttsSetProvider(e.target.value)}}>
                ${(t.providerStates??[]).map(e=>c`<option value=${e.id} ?selected=${e.id===t.provider}>${e.label??e.id}</option>`)}
              </select>
            </span>
          </div>
          <div class="row"><span class="k">${o("commsAuto")}</span><span class="v">${t.auto??"—"}</span></div>
          <div class="hint">${o("commsHintLive")}</div>
        `:c`<div class="hint">${o("loading")}</div>`}
      </div>
    `}mcpApplyTemplate(t){const e={...t};this.mcpTransport=e.url?"http":"stdio",this.mcpCommand=String(e.command??""),this.mcpArgs=(e.args??[]).join(", ");const s=e.env??{};this.mcpEnv=Object.entries(s).map(([n,i])=>`${n}=${i}`).join(`
`),this.mcpUrl=String(e.url??""),this.mcpTimeout=e.timeout?String(e.timeout):"",this.mcpHeaders="",this.mcpEditMode=!1,this.mcpName=""}mcpPrefillEdit(t,e){this.mcpName=t,this.mcpEditMode=!0,this.mcpTransport=e.url?"http":"stdio",this.mcpCommand=String(e.command??""),this.mcpArgs=(e.args??[]).join(", ");const s=e.env??{};this.mcpEnv=Object.entries(s).map(([i,a])=>`${i}=${a}`).join(`
`),this.mcpUrl=String(e.url??""),this.mcpTimeout=e.timeout?String(e.timeout):"";const n=e.headers??{};this.mcpHeaders=Object.entries(n).map(([i,a])=>`${i}=${a}`).join(`
`)}mcpBuildConfig(){const t={};if(this.mcpTransport==="stdio"){if(!this.mcpCommand.trim())return null;t.command=this.mcpCommand.trim();const s=this.mcpArgs.split(",").map(n=>n.trim()).filter(Boolean);s.length&&(t.args=s)}else{if(!this.mcpUrl.trim())return null;t.url=this.mcpUrl.trim()}const e={};for(const s of this.mcpEnv.split(`
`)){const n=s.trim();if(!n||n.startsWith("#"))continue;const i=n.indexOf("=");i>0&&(e[n.slice(0,i).trim()]=n.slice(i+1).trim())}if(Object.keys(e).length&&(t.env=e),this.mcpTransport==="http"&&this.mcpHeaders.trim()){const s={};for(const n of this.mcpHeaders.split(`
`)){const i=n.trim();if(!i||i.startsWith("#"))continue;const a=i.indexOf("=");a>0&&(s[i.slice(0,a).trim()]=i.slice(a+1).trim())}Object.keys(s).length&&(t.headers=s)}return this.mcpTimeout.trim()&&Number(this.mcpTimeout)>0&&(t.timeout=Number(this.mcpTimeout)),t}async submitMcp(){if(this.channelBusy)return;const t=this.mcpName.trim();if(!t)return;const e=this.mcpBuildConfig();if(!e){this.mcpMessage={ok:!1,text:o("mcpErrorCmdOrUrl")},this.requestUpdate();return}this.channelBusy=!0,this.requestUpdate();const s=this.mcpEditMode?await l.updateMcpServer(t,e):await l.addMcpServer(t,e);this.channelBusy=!1,this.mcpMessage=s.ok?{ok:!0,text:o(this.mcpEditMode?"mcpUpdated":"mcpSaved",{name:t})}:{ok:!1,text:s.error??"error"},s.ok&&this.mcpResetForm(),this.requestUpdate()}mcpResetForm(){this.mcpName="",this.mcpEditMode=!1,this.mcpTransport="stdio",this.mcpCommand="",this.mcpArgs="",this.mcpEnv="",this.mcpUrl="",this.mcpTimeout="",this.mcpHeaders=""}async toggleMcp(t,e){if(this.channelBusy)return;this.channelBusy=!0,this.requestUpdate();const s=await l.updateMcpServer(t,{enabled:e});this.channelBusy=!1,s.ok||(this.mcpMessage={ok:!1,text:s.error??"error"}),this.requestUpdate()}async deleteMcp(t){if(!window.confirm(o("mcpDeleteConfirm",{name:t})))return;this.channelBusy=!0,this.requestUpdate();const e=await l.removeMcpServer(t);this.channelBusy=!1,this.mcpMessage=e.ok?{ok:!0,text:o("mcpDeleted",{name:t})}:{ok:!1,text:e.error??"error"},this.requestUpdate()}renderMcpCard(){const t=l.mcpServers??{},e=Object.keys(t);return c`
      <div class="card glass">
        <h3>${o("mcpTitle")}
          <button class="toggle-btn" style="margin-left:10px;padding:4px 12px" @click=${()=>{l.refreshConfigProviders()}}>${L("refresh")}</button>
        </h3>
        <div class="hint">${o("mcpHint")}</div>

        ${e.length?e.map(s=>{const n=t[s]??{},i=n.enabled!==!1,a=String(n.command??n.url??n.baseUrl??""),r=!!n.url;return c`
            <div class="mp-row">
              <div class="mp-info">
                <div class="mp-name">${s}
                  <span class="badge ${i?"active":"off"}">${o(i?"commsOn":"commsOff")}</span>
                  <span class="badge dim">${r?"HTTP":"stdio"}</span>
                </div>
                <div class="mp-sub">${a}</div>
              </div>
              <button class="toggle-btn" style="padding:4px 10px;font-size:12px" ?disabled=${this.channelBusy}
                @click=${()=>{this.toggleMcp(s,!i)}}>${i?"◾":"▶"}</button>
              <button class="icon-btn" title=${o("edit")} ?disabled=${this.channelBusy}
                @click=${()=>this.mcpPrefillEdit(s,n)}>✏️</button>
              <button class="icon-btn" title=${o("delete")} ?disabled=${this.channelBusy}
                @click=${()=>{this.deleteMcp(s)}}>🗑</button>
            </div>
          `}):c`<div class="hint">${o("mcpEmpty")}</div>`}

        <div class="mp-form-title">${this.mcpEditMode?o("mcpEditing",{name:this.mcpName}):o("mcpAdd")}</div>

        <!-- 快速模板 -->
        ${this.mcpEditMode?g:c`
          <div class="hint" style="margin:6px 0 4px">${o("mcpQuickTpl")}</div>
          <div class="mcp-templates">
            ${this.mcpTemplates.map(s=>c`
              <button class="toggle-btn" style="padding:4px 10px;font-size:12px;margin:2px"
                @click=${()=>this.mcpApplyTemplate(s.config)}>${s.label}</button>
            `)}
          </div>
        `}

        <label class="hint" style="margin:6px 0 4px">${o("mcpName")}</label>
        <input class="field" placeholder="如:github" .value=${this.mcpName}
          ?disabled=${this.mcpEditMode}
          @input=${s=>{this.mcpName=s.target.value}} />

        <div class="row" style="margin:8px 0 4px"><span class="k">${o("mcpTransport")}</span></div>
        <div class="seg-control" style="margin:2px 0 8px">
          <button class=${this.mcpTransport==="stdio"?"active":""} @click=${()=>{this.mcpTransport="stdio"}}>stdio (本地命令)</button>
          <button class=${this.mcpTransport==="http"?"active":""} @click=${()=>{this.mcpTransport="http"}}>HTTP/SSE (远程)</button>
        </div>

        ${this.mcpTransport==="stdio"?c`
          <label class="hint" style="margin:6px 0 4px">${o("mcpCommand")}</label>
          <input class="field" placeholder="npx" .value=${this.mcpCommand}
            @input=${s=>{this.mcpCommand=s.target.value}} />
          <label class="hint" style="margin:8px 0 4px">${o("mcpArgs")}</label>
          <input class="field" placeholder="-y, @modelcontextprotocol/server-github" .value=${this.mcpArgs}
            @input=${s=>{this.mcpArgs=s.target.value}} />
        `:c`
          <label class="hint" style="margin:6px 0 4px">${o("mcpUrl")}</label>
          <input class="field" type="url" placeholder="https://mcp.example.com/sse" .value=${this.mcpUrl}
            @input=${s=>{this.mcpUrl=s.target.value}} />
          <label class="hint" style="margin:8px 0 4px">${o("mcpHeaders")}</label>
          <textarea class="field" rows="2" placeholder="Authorization=Bearer xxx&#10;X-Custom=value" .value=${this.mcpHeaders}
            @input=${s=>{this.mcpHeaders=s.target.value}}></textarea>
        `}

        <label class="hint" style="margin:8px 0 4px">${o("mcpEnv")}</label>
        <textarea class="field" rows="2" placeholder="GITHUB_TOKEN=ghp_xxx&#10;DEBUG=1" .value=${this.mcpEnv}
          @input=${s=>{this.mcpEnv=s.target.value}}></textarea>

        <label class="hint" style="margin:8px 0 4px">${o("mcpTimeout")}</label>
        <input class="field" type="number" min="1000" step="1000" placeholder="30000" .value=${this.mcpTimeout}
          @input=${s=>{this.mcpTimeout=s.target.value}} />

        <div class="actions">
          <button class="btn primary" style="width:100%" ?disabled=${!this.mcpName.trim()||this.channelBusy}
            @click=${()=>{this.submitMcp()}}>${this.channelBusy?o("loading"):this.mcpEditMode?o("mcpSaveEdit"):o("mcpAddBtn")}</button>
          ${this.mcpEditMode?c`<button class="btn" style="width:100%;margin-top:6px" @click=${()=>this.mcpResetForm()}>${o("cancel")}</button>`:g}
        </div>

        ${this.mcpMessage?c`<div class="notice ${this.mcpMessage.ok?"ok":"error"}" style="margin-top:10px">${this.mcpMessage.text}</div>`:g}
      </div>
    `}adCollapsible(t,e,s,n,i){const a=!!this.adOpen[t];return c`
      <div class="ad-item">
        <div class="ad-item-head" @click=${()=>this.toggleAd(t)}>
          <div class="ad-item-text">
            <div class="ad-item-title">${e}
              ${n.map(r=>c`<span class="badge dim" style="margin-left:6px">${r}</span>`)}
            </div>
            ${s?c`<div class="ad-item-desc">${s}</div>`:g}
          </div>
          <span class="ad-chev ${a?"open":""}">▾</span>
        </div>
        ${a?c`<div class="ad-item-body">${i}</div>`:g}
      </div>
    `}adSeg(t,e,s){return c`
      <div class="seg-control">
        ${t.map(n=>c`<button class=${e===n.id?"active":""} @click=${()=>s(n.id)}>${n.label}</button>`)}
      </div>
    `}adField(t,e,s,n="text"){return c`
      <label class="ad-field">
        <span>${t}</span>
        <input class="field" type=${n} .value=${e} @input=${i=>s(i.target.value)} />
      </label>
    `}numOrNull(t){const e=Number(t);return t.trim()!==""&&Number.isFinite(e)?e:null}async saveCompaction(){const t={...l.agentDefaults?.compaction??{}};this.adCompactionEnabled!==""&&(t.enabled=this.adCompactionEnabled==="true"),this.adCompactionMode&&(t.mode=this.adCompactionMode);const e=this.numOrNull(this.adKeepRecent);e===null?delete t.keepRecentTokens:t.keepRecentTokens=e;const s=this.numOrNull(this.adRecentTurns);s===null?delete t.recentTurnsPreserve:t.recentTurnsPreserve=s;const n=this.numOrNull(this.adCompTimeout);n===null?delete t.timeoutSeconds:t.timeoutSeconds=n;const i={...t.memoryFlush??{}};this.adFlushEnabled!==""&&(i.enabled=this.adFlushEnabled==="true"),Object.keys(i).length?t.memoryFlush=i:delete t.memoryFlush,await this.adSave(Object.keys(t).length?{compaction:t}:{compaction:null})}async saveEmbedded(){const t={...l.agentDefaults?.embeddedAgent??{}};this.adEmbeddedPolicy?t.projectSettingsPolicy=this.adEmbeddedPolicy:delete t.projectSettingsPolicy,this.adEmbeddedContract?t.executionContract=this.adEmbeddedContract:delete t.executionContract,await this.adSave(Object.keys(t).length?{embeddedAgent:t}:{embeddedAgent:null})}async saveHeartbeat(){const t={...l.agentDefaults?.heartbeat??{}},e=this.cleanVal(this.adHbEvery);e===null?delete t.every:t.every=e;const s={...t.activeHours??{}},n=this.cleanVal(this.adHbStart);n===null?delete s.start:s.start=n;const i=this.cleanVal(this.adHbEnd);i===null?delete s.end:s.end=i,Object.keys(s).length?t.activeHours=s:delete t.activeHours;const a=this.cleanVal(this.adHbPrompt);a===null?delete t.prompt:t.prompt=a,await this.adSave(Object.keys(t).length?{heartbeat:t}:{heartbeat:null})}async saveImageModel(){const t=this.cleanVal(this.adImgPrimary),e=this.adImgFallbacks.split(",").map(s=>s.trim()).filter(Boolean);t===null?await this.adSave({imageModel:null}):e.length?await this.adSave({imageModel:{primary:t,fallbacks:e}}):await this.adSave({imageModel:t})}async saveMediaModels(){const t={...l.agentDefaults?.mediaModels??{}};for(const[e,s]of[["image",this.adMediaImage],["video",this.adMediaVideo],["music",this.adMediaMusic]]){const n=this.cleanVal(s);n===null?delete t[e]:t[e]=n}await this.adSave(Object.keys(t).length?{mediaModels:t}:{mediaModels:null})}async saveModelPolicy(){const t=this.adPolicyAllow.trim();if(!t){await this.adSave({modelPolicy:null});return}let e;try{e=JSON.parse(t)}catch{this.adMessage={ok:!1,text:`${o("agentsSaveFailed")}:JSON ${o("debugParams")}`},this.requestUpdate();return}await this.adSave({modelPolicy:{allow:e}})}renderAgentsSkills(){const t=l.skills;return c`
      <div class="card glass">
        <h3>${o("agentsTabSkills")}</h3>
        <div class="hint">${o("agentsSkillsHint")}</div>
        ${t.length?t.map(e=>{const s=!e.disabled,n=e.skillKey??e.name;return c`
            <div class="mp-row">
              <div class="mp-info">
                <div class="mp-name">${e.emoji??"🧩"} ${e.name}</div>
                <div class="mp-sub">${e.description??""}</div>
              </div>
              <div class="seg-control">
                <button class=${s?"active":""} @click=${()=>{l.setSkillEnabled(n,!0)}}>开</button>
                <button class=${s?"":"active"} @click=${()=>{l.setSkillEnabled(n,!1)}}>关</button>
              </div>
            </div>
          `}):c`<div class="hint">${o("loading")}</div>`}
      </div>
    `}renderAgentsTools(){const t=l.securityInfo?.toolProfile;return c`
      <div class="card glass">
        <h3>${o("agentsToolsTitle")}</h3>
        <div class="row"><span class="k">${o("securityProfile")}</span><span class="v">${t??"—"}</span></div>
        <div class="hint">${o("agentsToolsHint")}</div>
      </div>
    `}renderAgentsCard(){const t=l.agentDefaults??{},e=l.connState==="connected",s=this.adOpen.card!==!1,n=typeof t.elevatedDefault=="string"?t.elevatedDefault:"off",i=t.fastModeDefault,a=i===void 0||typeof i=="string"?"auto":i?"on":"off",r=typeof t.thinkingDefault=="string"?t.thinkingDefault:"off",h=[{id:"agents",label:o("agentsTabAgents")},{id:"skills",label:o("agentsTabSkills")},{id:"tools",label:o("agentsTabTools")},{id:"session",label:o("agentsTabSession")}];return c`
      <div class="card glass" style="padding-bottom:2px">
        <h3>${o("agentsTitle")}</h3>
        <div class="hint">${o("agentsSectionDesc")}</div>
        <div class="subtabs">
          ${h.map(u=>c`
            <button class="subtab ${this.agentsTab===u.id?"active":""}"
              @click=${()=>{this.agentsTab=u.id}}>${u.label}</button>
          `)}
        </div>
      </div>
      ${this.agentsTab==="agents"?c`
        <div class="ad-sec-label">${o("agentsSectionName")} · ${o("agentsSectionDesc")}</div>
        <div class="card glass ad-card">
          <div class="ad-item-head" @click=${()=>this.toggleAd("card")}>
            <div class="ad-item-text">
              <div class="ad-item-title">${o("agentsDefaultsTitle")}</div>
              <div class="ad-item-desc">${o("agentsDefaultsDesc")}</div>
            </div>
            <span class="ad-chev ${s?"open":""}">▾</span>
          </div>
          ${s?c`
            <div class="ad-items">
              ${this.adCollapsible("compaction",o("agentsCompaction"),o("agentsCompactionDesc"),[],c`
                <div class="ad-fields">
                  <div class="ad-field-line">
                    <span class="ad-field-label">${o("agentsCompactionEnabled")}</span>
                    ${this.adSeg([{id:"true",label:o("commsOn")},{id:"false",label:o("commsOff")}],this.adCompactionEnabled||"true",u=>{this.adCompactionEnabled=u})}
                  </div>
                  <div class="ad-field-line">
                    <span class="ad-field-label">${o("agentsCompactionMode")}</span>
                    ${this.adSeg([{id:"default",label:"default"},{id:"safeguard",label:"safeguard"}],this.adCompactionMode,u=>{this.adCompactionMode=u})}
                  </div>
                  <div class="mp-grid mp-grid-3">
                    ${this.adField(o("agentsCompactionKeepRecent"),this.adKeepRecent,u=>{this.adKeepRecent=u},"number")}
                    ${this.adField(o("agentsCompactionRecentTurns"),this.adRecentTurns,u=>{this.adRecentTurns=u},"number")}
                    ${this.adField(o("agentsCompactionTimeout"),this.adCompTimeout,u=>{this.adCompTimeout=u},"number")}
                  </div>
                  <div class="ad-field-line">
                    <span class="ad-field-label">${o("agentsMemoryFlush")}</span>
                    ${this.adSeg([{id:"true",label:o("commsOn")},{id:"false",label:o("commsOff")}],this.adFlushEnabled||"false",u=>{this.adFlushEnabled=u})}
                  </div>
                  <div class="actions">
                    <button class="btn primary" ?disabled=${this.adBusy||!e} @click=${()=>{this.saveCompaction()}}>${o("agentsSave")}</button>
                  </div>
                </div>
              `)}
              <div class="ad-item">
                <div class="ad-item-head plain">
                  <div class="ad-item-text">
                    <div class="ad-item-title">${o("agentsElevated")}</div>
                    <div class="ad-item-desc">${o("agentsElevatedDesc")}</div>
                  </div>
                  ${this.adSeg([{id:"off",label:"off"},{id:"on",label:"on"},{id:"ask",label:"ask"},{id:"full",label:"full"}],n,u=>{this.adSave({elevatedDefault:u})})}
                </div>
              </div>
              ${this.adCollapsible("embedded",o("agentsEmbedded"),o("agentsEmbeddedDesc"),[],c`
                <div class="ad-fields">
                  <div class="ad-field-line">
                    <span class="ad-field-label">${o("agentsProjectPolicy")}</span>
                    ${this.adSeg([{id:"trusted",label:"trusted"},{id:"sanitize",label:"sanitize"},{id:"ignore",label:"ignore"}],this.adEmbeddedPolicy,u=>{this.adEmbeddedPolicy=u})}
                  </div>
                  <div class="ad-field-line">
                    <span class="ad-field-label">${o("agentsExecutionContract")}</span>
                    ${this.adSeg([{id:"default",label:"default"},{id:"strict-agentic",label:"strict-agentic"}],this.adEmbeddedContract,u=>{this.adEmbeddedContract=u})}
                  </div>
                  <div class="actions">
                    <button class="btn primary" ?disabled=${this.adBusy||!e} @click=${()=>{this.saveEmbedded()}}>${o("agentsSave")}</button>
                  </div>
                </div>
              `)}
              <div class="ad-item">
                <div class="ad-item-head plain">
                  <div class="ad-item-text">
                    <div class="ad-item-title">${o("agentsFastMode")}</div>
                    <div class="ad-item-desc">${o("agentsFastModeDesc")}</div>
                  </div>
                  ${this.adSeg([{id:"on",label:o("agentsFastOn")},{id:"off",label:o("agentsFastOff")},{id:"auto",label:o("agentsFastAuto")}],a,u=>{this.adSave({fastModeDefault:u==="auto"?"auto":u==="on"})})}
                </div>
              </div>
              ${this.adCollapsible("heartbeat",o("agentsHeartbeat"),o("agentsHeartbeatDesc"),[o("agentsBadgeAutomation")],c`
                <div class="ad-fields">
                  <div class="mp-grid mp-grid-3">
                    ${this.adField(o("agentsHeartbeatEvery"),this.adHbEvery,u=>{this.adHbEvery=u})}
                    ${this.adField(o("agentsHeartbeatStart"),this.adHbStart,u=>{this.adHbStart=u})}
                    ${this.adField(o("agentsHeartbeatEnd"),this.adHbEnd,u=>{this.adHbEnd=u})}
                  </div>
                  ${this.adField(o("agentsHeartbeatPrompt"),this.adHbPrompt,u=>{this.adHbPrompt=u})}
                  <div class="actions">
                    <button class="btn primary" ?disabled=${this.adBusy||!e} @click=${()=>{this.saveHeartbeat()}}>${o("agentsSave")}</button>
                  </div>
                </div>
              `)}
              ${this.adCollapsible("imagemodel",o("agentsImageModel"),o("agentsImageModelDesc"),[o("agentsBadgeModels"),o("agentsBadgeMedia")],c`
                <div class="ad-fields">
                  <div class="mp-grid mp-grid-3">
                    ${this.adField(o("agentsPrimary"),this.adImgPrimary,u=>{this.adImgPrimary=u})}
                    ${this.adField(o("agentsFallbacks"),this.adImgFallbacks,u=>{this.adImgFallbacks=u})}
                  </div>
                  <div class="actions">
                    <button class="btn primary" ?disabled=${this.adBusy||!e} @click=${()=>{this.saveImageModel()}}>${o("agentsSave")}</button>
                  </div>
                </div>
              `)}
              ${this.adCollapsible("mediamodels",o("agentsMediaModels"),o("agentsMediaModelsDesc"),[],c`
                <div class="ad-fields">
                  <div class="mp-grid mp-grid-3">
                    ${this.adField("image",this.adMediaImage,u=>{this.adMediaImage=u})}
                    ${this.adField("video",this.adMediaVideo,u=>{this.adMediaVideo=u})}
                    ${this.adField("music",this.adMediaMusic,u=>{this.adMediaMusic=u})}
                  </div>
                  <div class="actions">
                    <button class="btn primary" ?disabled=${this.adBusy||!e} @click=${()=>{this.saveMediaModels()}}>${o("agentsSave")}</button>
                  </div>
                </div>
              `)}
              <div class="ad-item">
                <div class="ad-item-head plain">
                  <div class="ad-item-text">
                    <div class="ad-item-title">${o("agentsModelRow")}
                      <span class="badge dim" style="margin-left:6px">${o("agentsBadgeModels")}</span>
                    </div>
                    <div class="ad-item-desc">${o("agentsModelRowDesc")}</div>
                  </div>
                </div>
                <div class="ad-item-body inline">
                  ${this.adField(o("agentsModelRow"),this.adModel,u=>{this.adModel=u})}
                  <button class="btn primary" ?disabled=${this.adBusy||!e}
                    @click=${()=>{this.adSave({model:this.cleanVal(this.adModel)})}}>${o("agentsSave")}</button>
                </div>
              </div>
              ${this.adCollapsible("modelpolicy",o("agentsModelPolicy"),o("agentsModelPolicyDesc"),[],c`
                <div class="ad-fields">
                  <label class="ad-field">
                    <span>${o("agentsModelPolicyAllow")}</span>
                    <textarea class="field" rows="4" style="font-family:'SF Mono',ui-monospace,Menlo,monospace;font-size:12px"
                      placeholder='["longcat/LongCat-2.0"]' .value=${this.adPolicyAllow}
                      @input=${u=>{this.adPolicyAllow=u.target.value}}></textarea>
                  </label>
                  <div class="actions">
                    <button class="btn primary" ?disabled=${this.adBusy||!e} @click=${()=>{this.saveModelPolicy()}}>${o("agentsSave")}</button>
                  </div>
                </div>
              `)}
              <div class="ad-item">
                <div class="ad-item-head plain">
                  <div class="ad-item-text">
                    <div class="ad-item-title">${o("agentsUtilityModel")}</div>
                    <div class="ad-item-desc">${o("agentsUtilityModelDesc")}</div>
                  </div>
                </div>
                <div class="ad-item-body inline">
                  ${this.adField(o("agentsUtilityModel"),this.adUtility,u=>{this.adUtility=u})}
                  <button class="btn primary" ?disabled=${this.adBusy||!e}
                    @click=${()=>{this.adSave({utilityModel:this.cleanVal(this.adUtility)})}}>${o("agentsSave")}</button>
                </div>
              </div>
              <div class="ad-item">
                <div class="ad-item-head plain">
                  <div class="ad-item-text">
                    <div class="ad-item-title">${o("agentsWorkspaceRow")}</div>
                  </div>
                </div>
                <div class="ad-item-body inline">
                  ${this.adField(o("agentsWorkspaceRow"),this.adWorkspace,u=>{this.adWorkspace=u})}
                  <button class="btn primary" ?disabled=${this.adBusy||!e}
                    @click=${()=>{this.adSave({workspace:this.cleanVal(this.adWorkspace)})}}>${o("agentsSave")}</button>
                </div>
              </div>
              <div class="ad-item">
                <div class="ad-item-head plain">
                  <div class="ad-item-text">
                    <div class="ad-item-title">${o("agentsThinkingRow")}</div>
                  </div>
                  ${this.adSeg([{id:"off",label:"off"},{id:"minimal",label:"minimal"},{id:"low",label:"low"},{id:"medium",label:"medium"},{id:"high",label:"high"}],r,u=>{this.adSave({thinkingDefault:u})})}
                </div>
              </div>
            </div>
          `:g}
        </div>
        <div class="card glass">
          <h3>
            ${o("agentsTitle")}
            <button class="toggle-btn" style="margin-left:10px;padding:4px 12px" @click=${()=>{l.loadAgents()}}>${L("refresh")}</button>
          </h3>
          ${l.agentsList?c`
            ${(l.agentsList.agents??[]).map(u=>c`
              <div class="row"><span class="k">${u.id}${u.id===l.agentsList?.defaultId?c`<span class="badge active" style="margin-left:6px">${o("agentsDefault")}</span>`:g}</span></div>
              <div class="row"><span class="k">${o("agentsModel")}</span><span class="v">${u.model?.primary??"—"}</span></div>
              <div class="row"><span class="k">${o("agentsThinking")}</span><span class="v">${u.thinkingDefault??"off"}</span></div>
              <div class="row"><span class="k">${o("agentsRuntime")}</span><span class="v">${u.agentRuntime?.id??"auto"}</span></div>
              <div class="row"><span class="k">${o("agentsWorkspace")}</span><span class="v">${u.workspace??"—"}</span></div>
              <div style="height:10px"></div>
            `)}
          `:c`<div class="hint">${o("loading")}</div>`}
        </div>
        ${this.adMessage?c`<div class="notice ${this.adMessage.ok?"ok":"error"}">${this.adMessage.text}</div>`:g}
      `:g}
      ${this.agentsTab==="skills"?this.renderAgentsSkills():g}
      ${this.agentsTab==="tools"?this.renderAgentsTools():g}
      ${this.agentsTab==="session"?this.renderSessionCard():g}
    `}renderInfraCard(){const t=l.systemInfo;return c`
      <div class="card glass">
        <h3>${o("infraTitle")}</h3>
        <div class="row"><span class="k">${o("infraPort")}</span><span class="v">${t?.port??"—"}</span></div>
        <div class="row"><span class="k">${o("infraLan")}</span><span class="v">${t?.lanAddress?`${t.lanAddress}:${t.port??""}`:"—"}</span></div>
        <div class="row"><span class="k">${o("infraRuntime")}</span><span class="v">${t?.nodeVersion??"—"} · PID ${t?.pid??"—"}</span></div>
        <div class="row"><span class="k">${o("infraOs")}</span><span class="v">${t?.osLabel??"—"} · ${t?.arch??""}</span></div>
        <div class="row"><span class="k">${o("infraPath")}</span><span class="v">${t?.diskPath??"—"}</span></div>
        <div class="actions">
          <button class="btn primary" style="width:100%" ?disabled=${this.updateBusy} @click=${()=>{this.runGatewayUpdate()}}>
            ${this.updateBusy?o("updateRunning"):o("infraUpdateBtn")}</button>
        </div>
        ${this.updateMessage?c`<div class="notice ${this.updateMessage.ok?"ok":"error"}" style="margin-top:8px">${this.updateMessage.text}</div>`:g}
        <div class="hint">${o("infraUpdateHint")}</div>
      </div>
    `}async sendDebugRpc(){if(this.debugBusy)return;const t=this.debugMethod.trim();if(!t)return;let e={};if(this.debugParams.trim())try{e=JSON.parse(this.debugParams)}catch(s){this.debugResult=`参数 JSON 错误:${String(s).slice(0,120)}`,this.requestUpdate();return}this.debugBusy=!0,this.debugResult=o("loading"),this.requestUpdate();try{const s=await l.rawRpc(t,e);this.debugResult=JSON.stringify(s,null,2)}catch(s){this.debugResult=`❌ ${String(s.message??s)}`}this.debugBusy=!1,this.requestUpdate()}renderDebugCard(){return c`
      <div class="card glass">
        <h3>${o("debugTitle")}</h3>
        <div class="hint">${o("debugHint")}</div>
        <label class="hint" style="margin:10px 0 4px">${o("debugMethod")}</label>
        <input class="field" placeholder="如:status / health / models.list" .value=${this.debugMethod}
          @keydown=${t=>{t.key==="Enter"&&this.sendDebugRpc()}}
          @input=${t=>{this.debugMethod=t.target.value}} />
        <label class="hint" style="margin:10px 0 4px">${o("debugParams")}</label>
        <textarea class="field" style="font-family:'SF Mono',ui-monospace,Menlo,monospace;font-size:12px" rows="3" placeholder="{}"
          .value=${this.debugParams}
          @input=${t=>{this.debugParams=t.target.value}}></textarea>
        <div class="actions">
          <button class="btn primary" style="width:100%" ?disabled=${!this.debugMethod.trim()||this.debugBusy} @click=${()=>{this.sendDebugRpc()}}>
            ${this.debugBusy?o("loading"):o("debugSend")}</button>
        </div>
        ${this.debugResult?c`<pre class="memory-view" style="margin-top:12px">${this.debugResult}</pre>`:g}
      </div>
    `}renderChannelsCard(){const t=l.channelRows(),e=Object.keys(l.configChannels),s=this.channelPick?Zs.find(n=>n.id===this.channelPick):null;return c`
      <div class="card glass">
        <h3>${o("channelsTitle")}
          <button class="toggle-btn" style="margin-left:10px;padding:4px 12px" @click=${()=>{this.channelPick=this.channelPick?null:"__picker__",this.channelFieldValues={},this.channelMessage=null}}>
            ${this.channelPick?o("cancel"):`+ ${o("channelAdd")}`}
          </button>
        </h3>

        ${t.length?t.map(n=>c`
          <div class="row">
            <span class="k">${n.label}</span>
            <span class="v">
              <span class="badge ${n.state==="已连接"?"active":"dim"}">${n.state}</span>
              <button class="icon-btn" title=${o("channelLogout")} ?disabled=${this.channelBusy}
                @click=${()=>{this.logoutChannel(n.id)}}>⎋</button>
              ${e.includes(n.id)?c`
                <button class="icon-btn" title=${o("channelDelete")} ?disabled=${this.channelBusy}
                  @click=${()=>{this.deleteChannel(n.id)}}>🗑</button>`:g}
            </span>
          </div>
        `):e.length?e.map(n=>c`
          <div class="row">
            <span class="k">${n}</span>
            <span class="v">
              <span class="badge dim">${o("channelConfigured")}</span>
              <button class="icon-btn" title=${o("channelDelete")} ?disabled=${this.channelBusy}
                @click=${()=>{this.deleteChannel(n)}}>🗑</button>
            </span>
          </div>
        `):c`<div class="hint">${o("channelsEmpty")}</div>`}

        ${this.channelPick==="__picker__"?c`
          <div class="channel-picker">
            ${Zs.map(n=>c`
              <button class="channel-chip" @click=${()=>{this.channelPick=n.id,this.channelFieldValues={}}}>
                <span class="channel-emoji">${n.emoji}</span>${n.label}
              </button>
            `)}
            <button class="channel-chip" @click=${()=>{this.channelPick="__custom__"}}>
              <span class="channel-emoji">🧩</span>${o("channelCustom")}
            </button>
          </div>
          <div class="hint">${o("channelPickHint")}</div>
        `:g}

        ${this.channelPick==="__custom__"?c`
          <div class="mp-editor" style="margin-top:10px">
            <div class="mp-name" style="margin-bottom:8px">🧩 ${o("channelCustom")}</div>
            <label class="hint" style="margin:0 0 4px">${o("channelCustomId")}</label>
            <input class="field" placeholder="如:my-qq-bot" .value=${this.customChannelId}
              @input=${n=>{this.customChannelId=n.target.value}} />
            <label class="hint" style="margin:10px 0 4px">${o("channelCustomJson")}</label>
            <textarea class="field" style="font-family:'SF Mono',ui-monospace,Menlo,monospace;font-size:12px" rows="6"
              .value=${this.customChannelJson}
              @input=${n=>{this.customChannelJson=n.target.value}}></textarea>
            <div class="hint">${o("channelCustomHint")}</div>
            <div class="actions">
              <button class="btn primary" ?disabled=${!this.customChannelId.trim()||this.channelBusy} @click=${()=>{this.submitCustomChannel()}}>
                ${this.channelBusy?o("loading"):o("save")}</button>
              <button class="btn" ?disabled=${this.channelBusy} @click=${()=>{this.channelPick=null}}>${o("cancel")}</button>
            </div>
          </div>
        `:g}

        ${s?c`
          <div class="mp-editor" style="margin-top:10px">
            <div class="mp-name" style="margin-bottom:8px">${s.emoji} ${o("channelSetup",{name:s.label})}</div>
            ${s.fields.map(n=>c`
              <div style="margin-bottom:8px">
                <label class="hint" style="margin:0 0 4px">${n.label}</label>
                <input class="field" type=${n.secret?"password":"text"} autocomplete="off"
                  .value=${this.channelFieldValues[n.key]??""}
                  @input=${i=>{this.channelFieldValues={...this.channelFieldValues,[n.key]:i.target.value}}} />
              </div>
            `)}
            <div class="actions">
              <button class="btn primary" ?disabled=${this.channelBusy} @click=${()=>{this.submitChannel()}}>
                ${this.channelBusy?o("loading"):o("save")}</button>
              <button class="btn" ?disabled=${this.channelBusy} @click=${()=>{this.channelPick=null}}>${o("cancel")}</button>
            </div>
          </div>
        `:g}

        ${this.channelMessage?c`<div class="notice ${this.channelMessage.ok?"ok":"error"}" style="margin-top:10px">${this.channelMessage.text}</div>`:g}
        ${this.channelMessage?.ok?c`<div class="notice warn" style="margin-top:6px">${o("channelRestartHint")}</div>`:g}
      </div>
    `}renderSecurityCard(){const t=l.securityInfo??{},e=t.toolProfile,s=e==="coding"?"coding (完整)":e==="messaging"?"messaging (受限)":e??"—";return c`
      <div class="card glass">
        <h3>${o("securityTitle")}</h3>
        <div class="row"><span class="k">${o("securityAuth")}</span><span class="v"><span class="badge active">${(t.authMode??"—").toUpperCase()}</span></span></div>
        <div class="row"><span class="k">${o("securityProfile")}</span><span class="v">${s}</span></div>
        <div class="row"><span class="k">${o("securityDeviceAuth")}</span><span class="v"><span class="badge active">${o("securityEnabled")}</span></span></div>
        <div class="hint">${o("securityHint")}</div>
      </div>
      <div class="card glass">
        <h3>${o("securityExecTitle")}
          <button class="toggle-btn" style="margin-left:10px;padding:4px 12px" @click=${()=>{this.toggleExecPolicy()}}>${this.execOpen?o("memoryCollapse"):o("memoryExpand")}</button>
        </h3>
        <div class="hint">${o("securityExecHint")}</div>
        ${this.execOpen?c`
          ${this.execPolicy?c`
            <textarea class="field exec-edit" rows="12"
              .value=${JSON.stringify(this.execPolicy,null,2)}
              @input=${n=>{this.execEditValue=n.target.value}}></textarea>
            <div class="actions">
              <button class="btn primary" ?disabled=${this.channelBusy} @click=${()=>{this.saveExecPolicy()}}>${o("agentsSave")}</button>
            </div>
            ${this.execMessage?c`<div class="notice ${this.execMessage.ok?"ok":"error"}" style="margin-top:8px">${this.execMessage.text}</div>`:g}
          `:c`<div class="hint">${o("loading")}</div>`}
        `:g}
      </div>
    `}async saveExecPolicy(){let t;try{t=JSON.parse(this.execEditValue)}catch{this.execMessage={ok:!1,text:`${o("agentsSaveFailed")}:JSON 错误`},this.requestUpdate();return}this.channelBusy=!0,this.requestUpdate();const e=await l.saveExecApprovals(t);this.channelBusy=!1,this.execMessage=e.ok?{ok:!0,text:o("agentsSaved")}:{ok:!1,text:`${o("agentsSaveFailed")}:${e.error??""}`},this.requestUpdate()}renderEditor(t){return c`
      <div class="mp-editor">
        <div class="mp-name" style="margin-bottom:6px">${o("modelsEditing",{name:t})}</div>
        <label class="hint" style="margin:6px 0 4px">API 端点</label>
        <input class="field" type="url" .value=${this.editBaseUrl}
          @input=${e=>{this.editBaseUrl=e.target.value}} />
        ${this.editModels.map((e,s)=>c`
          <div class="mp-edit-model">
            <div class="mp-edit-head">
              <span class="mp-name">${e.id}</span>
              <button class="icon-btn" title=${o("modelsDeleteModel")} ?disabled=${this.mpBusy}
                @click=${()=>this.removeEditModel(s)}>🗑</button>
            </div>
            <div class="mp-grid">
              <div>
                <label class="hint" style="margin:6px 0 4px">${o("mpModelName")}</label>
                <input class="field" type="text" .value=${e.name}
                  @input=${n=>this.updateEditModel(s,"name",n.target.value)} />
              </div>
              <div>
                <label class="hint" style="margin:6px 0 4px">${o("mpContext")}</label>
                <input class="field" type="number" min="1024" .value=${e.contextWindow}
                  @input=${n=>this.updateEditModel(s,"contextWindow",n.target.value)} />
              </div>
              <div>
                <label class="hint" style="margin:6px 0 4px">${o("mpCostInput")}</label>
                <input class="field" type="number" min="0" step="any" .value=${e.costInput}
                  @input=${n=>this.updateEditModel(s,"costInput",n.target.value)} />
              </div>
              <div>
                <label class="hint" style="margin:6px 0 4px">${o("mpCostCacheRead")}</label>
                <input class="field" type="number" min="0" step="any" .value=${e.costCacheRead}
                  @input=${n=>this.updateEditModel(s,"costCacheRead",n.target.value)} />
              </div>
              <div>
                <label class="hint" style="margin:6px 0 4px">${o("mpCostOutput")}</label>
                <input class="field" type="number" min="0" step="any" .value=${e.costOutput}
                  @input=${n=>this.updateEditModel(s,"costOutput",n.target.value)} />
              </div>
              <div>
                <label class="hint" style="margin:6px 0 4px">${o("mpMaxTokens")}</label>
                <input class="field" type="number" min="256" .value=${e.maxTokens}
                  @input=${n=>this.updateEditModel(s,"maxTokens",n.target.value)} />
              </div>
            </div>
          </div>
        `)}
        <div class="actions">
          <button class="btn primary" ?disabled=${this.mpBusy} @click=${()=>{this.saveEdit()}}>
            ${this.mpBusy?o("loading"):o("modelsSave")}</button>
          <button class="btn" ?disabled=${this.mpBusy} @click=${()=>{this.editName="",this.requestUpdate()}}>${o("cancel")}</button>
        </div>
        <div class="hint">${o("modelsEditHint")}</div>
      </div>
    `}renderModelsCard(){const t=l.configProviders,e=this.mpBaseUrl.trim()&&this.mpApiKey.trim()&&this.mpModelId.trim();return c`
      <div class="card glass">
        <h3>${o("modelsCardTitle")}</h3>

        ${t.length?c`
          <div class="mp-list">
            ${t.map(s=>s.name===this.editName?this.renderEditor(s.name):c`
              <div class="mp-row">
                <div class="mp-info">
                  <div class="mp-name">${s.name} <span class="badge dim">${s.api??""}</span></div>
                  <div class="mp-sub">${s.baseUrl}</div>
                  <div class="mp-sub">${s.modelIds.length?s.modelIds.join(", "):"—"}</div>
                </div>
                <button class="icon-btn" title=${o("modelsEdit")} ?disabled=${this.mpBusy}
                  @click=${()=>this.startEdit(s.name)}>✏️</button>
                <button class="icon-btn" title=${o("modelsDelete")} ?disabled=${this.mpBusy}
                  @click=${()=>{this.removeProvider(s.name)}}>🗑</button>
              </div>
            `)}
          </div>
        `:c`<div class="hint">${o("modelsEmpty")}</div>`}

        <div class="mp-form-title">${o("modelsAddTitle")}</div>
        <label class="hint" style="margin:8px 0 4px">API 端点</label>
        <input class="field" type="url" placeholder="https://api.example.com/v1" .value=${this.mpBaseUrl}
          @input=${s=>{this.mpBaseUrl=s.target.value}} />
        <label class="hint" style="margin:10px 0 4px">API Key</label>
        <input class="field" type="password" autocomplete="off" placeholder="sk-…" .value=${this.mpApiKey}
          @input=${s=>{this.mpApiKey=s.target.value}} />
        <div class="mp-grid">
          <div>
            <label class="hint" style="margin:10px 0 4px">模型 ID</label>
            <input class="field" type="text" placeholder="glm-4.7" .value=${this.mpModelId}
              @input=${s=>{this.mpModelId=s.target.value}} />
          </div>
          <div>
            <label class="hint" style="margin:10px 0 4px">显示名称(可选)</label>
            <input class="field" type="text" placeholder="GLM-4.7" .value=${this.mpModelName}
              @input=${s=>{this.mpModelName=s.target.value}} />
          </div>
          <div>
            <label class="hint" style="margin:10px 0 4px">接口标识(可选)</label>
            <input class="field" type="text" placeholder="自动:取域名" .value=${this.mpName}
              @input=${s=>{this.mpName=s.target.value}} />
          </div>
          <div>
            <label class="hint" style="margin:10px 0 4px">接口类型</label>
            <select class="field" .value=${this.mpApi} @change=${s=>{this.mpApi=s.target.value}}>
              <option value="openai-completions" ?selected=${this.mpApi==="openai-completions"}>OpenAI 兼容</option>
              <option value="openai-responses" ?selected=${this.mpApi==="openai-responses"}>OpenAI Responses</option>
              <option value="anthropic-messages" ?selected=${this.mpApi==="anthropic-messages"}>Anthropic</option>
            </select>
          </div>
          <div>
            <label class="hint" style="margin:10px 0 4px">上下文窗口(可选)</label>
            <input class="field" type="number" min="1024" .value=${this.mpContext}
              @input=${s=>{this.mpContext=s.target.value}} />
          </div>
          <div>
            <label class="hint" style="margin:10px 0 4px">最大输出(可选)</label>
            <input class="field" type="number" min="256" .value=${this.mpMaxTokens}
              @input=${s=>{this.mpMaxTokens=s.target.value}} />
          </div>
        </div>
        <div class="mp-form-title">${o("mpCostTitle")}</div>
        <div class="mp-grid mp-grid-3">
          <div>
            <label class="hint" style="margin:8px 0 4px">${o("mpCostInput")}</label>
            <input class="field" type="number" min="0" step="any" placeholder="如 3" .value=${this.mpCostInput}
              @input=${s=>{this.mpCostInput=s.target.value}} />
          </div>
          <div>
            <label class="hint" style="margin:8px 0 4px">${o("mpCostCacheRead")}</label>
            <input class="field" type="number" min="0" step="any" placeholder="如 0.3" .value=${this.mpCostCacheRead}
              @input=${s=>{this.mpCostCacheRead=s.target.value}} />
          </div>
          <div>
            <label class="hint" style="margin:8px 0 4px">${o("mpCostOutput")}</label>
            <input class="field" type="number" min="0" step="any" placeholder="如 6" .value=${this.mpCostOutput}
              @input=${s=>{this.mpCostOutput=s.target.value}} />
          </div>
        </div>
        <div class="hint">${o("mpCostHint")}</div>
        ${this.mpMessage?c`<div class="notice ${this.mpMessage.ok?"ok":"error"}" style="margin-top:10px">${this.mpMessage.text}</div>`:g}
        <div class="actions">
          <button class="btn primary" style="width:100%" ?disabled=${!e||this.mpBusy}
            @click=${()=>{this.submitModel()}}>${this.mpBusy?o("loading"):o("modelsAddBtn")}</button>
        </div>
        <div class="hint">${o("modelsHint")}</div>
      </div>
    `}render(){const t=l.connState==="connected",e=l.client.snapshot?.server?.version;return c`
      <div class="set-nav glass">
        ${[{id:"general",labelKey:"setSecGeneral"},{id:"session",labelKey:"setSecSession"},{id:"models",labelKey:"setSecModels"},{id:"channels",labelKey:"setSecChannels"},{id:"comms",labelKey:"setSecComms"},{id:"mcp",labelKey:"setSecMcp"},{id:"agents",labelKey:"setSecAgents"},{id:"memory",labelKey:"setSecMemory"},{id:"security",labelKey:"setSecSecurity"},{id:"infra",labelKey:"setSecInfra"},{id:"debug",labelKey:"setSecDebug"},{id:"connection",labelKey:"setSecConnection"},{id:"marketplace",labelKey:"marketplaceSourcesTitle"},{id:"about",labelKey:"setSecAbout"},{id:"advanced",labelKey:"setSecAdvanced"},{id:"logs",labelKey:"setSecLogs"},{id:"automation",labelKey:"setSecAutomation"},{id:"tools",labelKey:"setSecTools"},{id:"logging",labelKey:"setSecLogging"},{id:"hooks",labelKey:"setSecHooks"},{id:"gateway",labelKey:"setSecGateway"},{id:"tts",labelKey:"setSecTts"},{id:"agententries",labelKey:"setSecAgentEntries"},{id:"cronconfig",labelKey:"setSecCronConfig"}].map(n=>c`
          <button class="set-nav-btn ${this.section===n.id?"active":""}"
            @click=${()=>{this.section=n.id,this.channelMessage=null}}>
            ${o(n.labelKey)}
          </button>
        `)}
      </div>
      <div class="settings-scroll">
        ${this.section==="general"?c`
          <div class="card glass">
            <h3>${o("settingsLanguage")}</h3>
            <div class="seg-control">
              <button class=${es()==="zh"?"active":""} @click=${()=>this.switchLocale("zh")}>中文</button>
              <button class=${es()==="en"?"active":""} @click=${()=>this.switchLocale("en")}>English</button>
            </div>
          </div>
          ${this.renderAppearanceCard()}
          <div class="card glass">
            <h3>${o("settingsAbout")}</h3>
            <p class="about-text">${o("settingsAboutText")}</p>
          </div>
        `:g}
        ${this.section==="session"?this.renderSessionCard():g}
        ${this.section==="models"?this.renderModelsCard():g}
        ${this.section==="channels"?this.renderChannelsCard():g}
        ${this.section==="comms"?this.renderCommsCard():g}
        ${this.section==="mcp"?this.renderMcpCard():g}
        ${this.section==="agents"?this.renderAgentsCard():g}
        ${this.section==="memory"?c`${this.renderMemoryCard()}${this.renderDreamCard()}`:g}
        ${this.section==="security"?this.renderSecurityCard():g}
        ${this.section==="infra"?this.renderInfraCard():g}
        ${this.section==="debug"?this.renderDebugCard():g}
        ${this.section==="connection"?c`
          <div class="card glass">
            <h3>${o("settingsConnection")}</h3>
            <label class="hint" style="margin:0 0 6px">${o("settingsGatewayUrl")}</label>
            <input class="field" type="text" .value=${this.urlInput} @input=${n=>{this.urlInput=n.target.value}} placeholder="ws://127.0.0.1:18789" />
            <label class="hint" style="margin:10px 0 6px">${o("settingsToken")}</label>
            <input class="field" type="password" .value=${this.tokenInput} autocomplete="off"
              @input=${n=>{this.tokenInput=n.target.value}} placeholder="gw token" />
            <div class="hint">${o("settingsTokenHint")}</div>
            ${t?c`<div class="hint" style="color:var(--ok)">✓ ${o("settingsConnected",{version:e??"?"})}</div>`:""}
            <div class="actions">
              ${t?c`<button class="btn danger" @click=${()=>this.handleDisconnect()}>${o("settingsDisconnect")}</button>`:c`<button class="btn primary" ?disabled=${!this.tokenInput.trim()} @click=${()=>{this.handleConnect()}}>${o("settingsConnect")}</button>`}
            </div>
          </div>
        `:g}
        ${this.section==="marketplace"?this.renderMarketplaceSources():g}
        ${this.section==="about"?this.renderAboutCard():g}
        ${this.section==="advanced"?this.renderAdvancedCard():g}
        ${this.section==="logs"?this.renderLogsCard():g}
        ${this.section==="automation"?this.renderAutomationCard():g}
        ${this.section==="tools"?this.renderToolsCard():g}
        ${this.section==="logging"?this.renderLoggingCard():g}
        ${this.section==="hooks"?this.renderHooksCard():g}
        ${this.section==="gateway"?this.renderGatewayCard():g}
        ${this.section==="tts"?this.renderTtsCard():g}
        ${this.section==="agententries"?this.renderAgentEntriesCard():g}
        ${this.section==="cronconfig"?this.renderCronConfigCard():g}
      </div>
    `}renderMarketplaceSources(){const t=l.marketplaceSources;return c`
      <div class="card glass">
        <h3>${o("marketplaceSourcesTitle")}</h3>
        <p class="hint">${o("marketplaceSourcesHint")}</p>
        <div class="source-list">
          ${t.map(e=>c`
            <div class="skill-item glass source-item">
              <div class="s-main">
                <div class="s-title">
                  ${e.name}
                  ${e.isDefault?c`<span class="badge dim">${o("sourceDefault")}</span>`:c`<span class="badge dim">${o("sourceCustom")}</span>`}
                  ${e.enabled?c`<span class="badge active">${o("sourceEnabled")}</span>`:c`<span class="badge off">${o("sourceDisabled")}</span>`}
                </div>
                <div class="s-sub">${e.url}</div>
              </div>
              <button class="toggle-btn" @click=${()=>l.toggleSource(e.id)} style="padding:4px 10px">
                ${e.enabled?o("commsOff"):o("commsOn")}
              </button>
              ${e.isDefault?g:c`<button class="icon-btn" @click=${()=>l.removeMarketplaceSource(e.id)}>${L("trash")}</button>`}
            </div>
          `)}
        </div>
      </div>
      <div class="card glass source-form">
        <h3>${o("sourceAdd")}</h3>
        <label class="hint">${o("sourceName")}</label>
        <input class="field" type="text" .value=${this.newSourceName} @input=${e=>{this.newSourceName=e.target.value}} placeholder="My Marketplace" />
        <label class="hint">${o("sourceUrl")}</label>
        <input class="field" type="text" .value=${this.newSourceUrl} @input=${e=>{this.newSourceUrl=e.target.value}} placeholder="https://example.com/api" />
        <label class="hint">${o("sourceApiKey")}</label>
        <input class="field" type="text" .value=${this.newSourceKey} @input=${e=>{this.newSourceKey=e.target.value}} placeholder="sk-..." />
        <div class="actions">
          <button class="btn primary" @click=${()=>this.handleAddSource()}>${o("sourceAddBtn")}</button>
        </div>
      </div>
    `}handleAddSource(){if(!this.newSourceName.trim()||!this.newSourceUrl.trim())return;const t="custom-"+Date.now().toString(36);l.addMarketplaceSource({id:t,name:this.newSourceName.trim(),url:this.newSourceUrl.trim(),apiKey:this.newSourceKey.trim()||void 0,enabled:!0}),this.newSourceName="",this.newSourceUrl="",this.newSourceKey=""}renderAboutCard(){const t=l.client.snapshot?.server?.version;return c`
      <div class="card glass">
        <h3>${o("settingsAbout")}</h3>
        <div class="about-logo">${ds(l.branding.appLogo,"🦞","about-logo-render")}</div>
        <div class="row"><span class="k">${o("aboutUiVersion")}</span><span class="v">v0.1.1</span></div>
        <div class="row"><span class="k">${o("aboutGatewayVersion")}</span><span class="v">${t??"—"}</span></div>
        <div class="row"><span class="k">${o("aboutProtocol")}</span><span class="v">v4 (Ed25519)</span></div>
        <div class="row"><span class="k">${o("aboutRepo")}</span><span class="v"><a href="https://github.com/2642086672/openclaw-glass-webui" target="_blank" rel="noreferrer">GitHub</a></span></div>
        <div class="hint">${o("settingsAboutText")}</div>
      </div>
    `}renderAdvancedCard(){return c`
      <div class="card glass">
        <h3>${o("advancedTitle")}</h3>
        <div class="hint">${o("advancedHint")}</div>
        <div class="row"><span class="k">${o("advancedLang")}</span>
          <span class="v">
            <div class="seg-control" style="margin:0">
              <button class=${es()==="zh"?"active":""} @click=${()=>this.switchLocale("zh")}>中文</button>
              <button class=${es()==="en"?"active":""} @click=${()=>this.switchLocale("en")}>English</button>
            </div>
          </span>
        </div>
        <div class="row"><span class="k">${o("advancedTheme")}</span><span class="v">${l.branding.appLogo?"自定义":"默认"}</span></div>
        ${this.renderAppearanceCard()}
      </div>
    `}renderLogsCard(){const t=l.logLines;return c`
      <div class="card glass">
        <h3>${o("logsTitle")}
          <button class="toggle-btn" style="margin-left:10px;padding:4px 12px" @click=${()=>l.logsFollowing=!l.logsFollowing}>
            ${l.logsFollowing?o("logsPause"):o("logsFollow")}
          </button>
          <button class="toggle-btn" style="margin-left:6px;padding:4px 12px" @click=${()=>l.clearLogs()}>${o("logsClear")}</button>
        </h3>
        <div class="hint">${o("logsHint")}</div>
        <pre class="memory-view logs-view">${t.length?t.map(e=>e.raw).join(""):o("empty")}</pre>
      </div>
    `}renderAutomationCard(){const t=l.cronJobs;return c`
      <div class="card glass">
        <h3>${o("automationTitle")}
          <button class="toggle-btn" style="margin-left:10px;padding:4px 12px" @click=${()=>{l.refreshCron()}}>${L("refresh")}</button>
        </h3>
        <div class="hint">${o("automationHint")}</div>
        ${t.length?t.map(e=>c`
          <div class="cron-row">
            <div class="cron-info">
              <div class="cron-name">${e.name??e.id}</div>
              <div class="cron-sub">${e.description??""}</div>
              <div class="cron-sub">${o("cronSchedule")}: ${e.schedule?.cron??(e.schedule?.everyMs?`${e.schedule.everyMs/6e4} min`:"—")}</div>
            </div>
            <span class="badge ${e.enabled?"active":"off"}">${e.enabled?o("commsOn"):o("commsOff")}</span>
            <button class="toggle-btn" style="padding:4px 10px" @click=${()=>{l.cronToggle(e.id,!e.enabled)}}>${e.enabled?"◾":"▶"}</button>
            <button class="icon-btn" title=${o("delete")} @click=${()=>{l.cronDelete(e.id)}}>🗑</button>
          </div>
        `):c`<div class="hint">${o("empty")}</div>`}
      </div>
    `}syncToolsForm(){const t=l.toolsConfig??{};t!==this._lastToolsRef&&(this._lastToolsRef=t,this.toolsAllow=(t.allow??[]).join(", "),this.toolsDeny=(t.deny??[]).join(", "),this.toolsElevated=!!t.elevated?.enabled)}async saveTools(t){if(this.toolsBusy)return;this.toolsBusy=!0,this.requestUpdate();const e=await l.patchTools(t);this.toolsBusy=!1,this.toolsMessage=e.ok?{ok:!0,text:o("agentsSaved")}:{ok:!1,text:`${o("agentsSaveFailed")}:${e.error??""}`},this.requestUpdate()}renderToolsCard(){const e=(l.toolsConfig??{}).profile??"coding",s=[{id:"minimal",label:"minimal (最小)"},{id:"messaging",label:"messaging (消息)"},{id:"coding",label:"coding (开发)"},{id:"full",label:"full (完整)"}];return c`
      <div class="card glass">
        <h3>${o("toolsTitle")}</h3>
        <div class="hint">${o("toolsHint")}</div>
        <div class="row"><span class="k">${o("toolsProfile")}</span></div>
        <div class="seg-control" style="margin:4px 0 10px">
          ${s.map(n=>c`
            <button class=${e===n.id?"active":""} @click=${()=>{this.saveTools({profile:n.id})}}>${n.label}</button>
          `)}
        </div>
        <div class="row"><span class="k">${o("toolsElevated")}</span>
          <div class="seg-control" style="margin:0">
            <button class=${this.toolsElevated?"":"active"} @click=${()=>{this.toolsElevated=!1,this.saveTools({elevated:{enabled:!1}})}}>${o("commsOff")}</button>
            <button class=${this.toolsElevated?"active":""} @click=${()=>{this.toolsElevated=!0,this.saveTools({elevated:{enabled:!0}})}}>${o("commsOn")}</button>
          </div>
        </div>
        <div class="row"><span class="k">${o("toolsAllow")}</span></div>
        <input class="field" placeholder="tool1, tool2, ..." .value=${this.toolsAllow}
          @input=${n=>{this.toolsAllow=n.target.value}} />
        <div class="row"><span class="k">${o("toolsDeny")}</span></div>
        <input class="field" placeholder="dangerous-tool, ..." .value=${this.toolsDeny}
          @input=${n=>{this.toolsDeny=n.target.value}} />
        <div class="actions">
          <button class="btn primary" ?disabled=${this.toolsBusy}
            @click=${()=>{this.saveTools({allow:this.toolsAllow.split(",").map(n=>n.trim()).filter(Boolean),deny:this.toolsDeny.split(",").map(n=>n.trim()).filter(Boolean)})}}>${o("agentsSave")}</button>
        </div>
        ${this.toolsMessage?c`<div class="notice ${this.toolsMessage.ok?"ok":"error"}" style="margin-top:8px">${this.toolsMessage.text}</div>`:g}
      </div>
    `}syncLoggingForm(){const t=l.loggingConfig??{};t!==this._lastLoggingRef&&(this._lastLoggingRef=t)}async saveLogging(t){if(this.loggingBusy)return;this.loggingBusy=!0,this.requestUpdate();const e=await l.patchLogging(t);this.loggingBusy=!1,this.loggingMessage=e.ok?{ok:!0,text:o("agentsSaved")}:{ok:!1,text:`${o("agentsSaveFailed")}:${e.error??""}`},this.requestUpdate()}renderLoggingCard(){const t=l.loggingConfig??{},e=t.level??"info",s=["debug","info","warn","error"],n=t.consoleStyle??"pretty";return c`
      <div class="card glass">
        <h3>${o("loggingTitle")}</h3>
        <div class="hint">${o("loggingHint")}</div>
        <div class="row"><span class="k">${o("loggingLevel")}</span></div>
        <div class="seg-control" style="margin:4px 0 10px">
          ${s.map(i=>c`<button class=${e===i?"active":""} @click=${()=>{this.saveLogging({level:i})}}>${i}</button>`)}
        </div>
        <div class="row"><span class="k">${o("loggingStyle")}</span>
          <div class="seg-control" style="margin:0">
            <button class=${n==="pretty"?"active":""} @click=${()=>{this.saveLogging({consoleStyle:"pretty"})}}>pretty</button>
            <button class=${n==="json"?"active":""} @click=${()=>{this.saveLogging({consoleStyle:"json"})}}>json</button>
          </div>
        </div>
        <div class="row"><span class="k">${o("loggingFile")}</span>
          <input class="field" style="margin:0" placeholder="/var/log/openclaw.log" .value=${t.file??""}
            @change=${i=>{this.saveLogging({file:i.target.value.trim()||null})}} />
        </div>
        <div class="row"><span class="k">${o("loggingAudit")}</span>
          <div class="seg-control" style="margin:0">
            <button class=${t.audit?.enabled?"":"active"} @click=${()=>{this.saveLogging({audit:{enabled:!1}})}}>${o("commsOff")}</button>
            <button class=${t.audit?.enabled?"active":""} @click=${()=>{this.saveLogging({audit:{enabled:!0}})}}>${o("commsOn")}</button>
          </div>
        </div>
        ${this.loggingMessage?c`<div class="notice ${this.loggingMessage.ok?"ok":"error"}" style="margin-top:8px">${this.loggingMessage.text}</div>`:g}
      </div>
    `}syncHooksForm(){const t=l.hooksConfig??{};t!==this._lastHooksRef&&(this._lastHooksRef=t)}async saveHooks(t){if(this.hooksBusy)return;this.hooksBusy=!0,this.requestUpdate();const e=await l.patchHooks(t);this.hooksBusy=!1,this.hooksMessage=e.ok?{ok:!0,text:o("agentsSaved")}:{ok:!1,text:`${o("agentsSaveFailed")}:${e.error??""}`},this.requestUpdate()}renderHooksCard(){const t=l.hooksConfig??{},e=t.internal?.entries??{},s=t.allowPromptInjection,n=t.allowConversationAccess;return c`
      <div class="card glass">
        <h3>${o("hooksTitle")}</h3>
        <div class="hint">${o("hooksHint")}</div>
        <div class="row"><span class="k">${o("hooksInject")}</span>
          <div class="seg-control" style="margin:0">
            <button class=${s!==!0?"active":""} @click=${()=>{this.saveHooks({allowPromptInjection:!1})}}>${o("commsOff")}</button>
            <button class=${s===!0?"active":""} @click=${()=>{this.saveHooks({allowPromptInjection:!0})}}>${o("commsOn")}</button>
          </div>
        </div>
        <div class="row"><span class="k">${o("hooksAccess")}</span>
          <div class="seg-control" style="margin:0">
            <button class=${n!==!0?"active":""} @click=${()=>{this.saveHooks({allowConversationAccess:!1})}}>${o("commsOff")}</button>
            <button class=${n===!0?"active":""} @click=${()=>{this.saveHooks({allowConversationAccess:!0})}}>${o("commsOn")}</button>
          </div>
        </div>
        <div class="row"><span class="k">${o("hooksTimeout")}</span>
          <input class="field" type="number" min="1000" step="1000" style="margin:0" .value=${t.timeoutMs??""}
            @change=${i=>{const a=i.target.value.trim();this.saveHooks({timeoutMs:a?Number(a):null})}} />
        </div>
        <div class="mp-form-title" style="margin-top:10px">${o("hooksInternal")}</div>
        ${Object.keys(e).length?Object.entries(e).map(([i,a])=>c`
          <div class="row"><span class="k">${i}</span>
            <div class="seg-control" style="margin:0">
              <button class=${a?.enabled!==!1?"active":""} @click=${()=>{this.saveHooks({internal:{entries:{[i]:{enabled:!0}}}})}}>${o("commsOn")}</button>
              <button class=${a?.enabled===!1?"active":""} @click=${()=>{this.saveHooks({internal:{entries:{[i]:{enabled:!1}}}})}}>${o("commsOff")}</button>
            </div>
          </div>
        `):c`<div class="hint">${o("empty")}</div>`}
        ${this.hooksMessage?c`<div class="notice ${this.hooksMessage.ok?"ok":"error"}" style="margin-top:8px">${this.hooksMessage.text}</div>`:g}
      </div>
    `}syncGatewayForm(){const t=l.gatewayConfig??{};t!==this._lastGwRef&&(this._lastGwRef=t)}async saveGateway(t){if(this.gwBusy)return;this.gwBusy=!0,this.requestUpdate();const e=await l.patchGateway(t);this.gwBusy=!1,this.gwMessage=e.ok?{ok:!0,text:o("agentsSaved")}:{ok:!1,text:`${o("agentsSaveFailed")}:${e.error??""}`},this.requestUpdate()}renderGatewayCard(){const t=l.gatewayConfig??{},e=t.bind??"loopback",s=t.tailscale?.mode??"off",n=t.tls??{},i=[{id:"loopback",label:"loopback (仅本机)"},{id:"lan",label:"lan (局域网)"},{id:"0.0.0.0",label:"0.0.0.0 (所有)"}];return c`
      <div class="card glass">
        <h3>${o("gatewayNetTitle")}</h3>
        <div class="hint">${o("gatewayNetHint")}</div>
        <div class="row"><span class="k">${o("gatewayBind")}</span></div>
        <div class="seg-control" style="margin:4px 0 10px">
          ${i.map(a=>c`<button class=${e===a.id?"active":""} @click=${()=>{this.saveGateway({bind:a.id})}}>${a.label}</button>`)}
        </div>
        <div class="row"><span class="k">${o("gatewayTailscale")}</span>
          <div class="seg-control" style="margin:0">
            <button class=${s==="off"?"active":""} @click=${()=>{this.saveGateway({tailscale:{mode:"off"}})}}>off</button>
            <button class=${s==="serve"?"active":""} @click=${()=>{this.saveGateway({tailscale:{mode:"serve"}})}}>serve</button>
            <button class=${s==="funnel"?"active":""} @click=${()=>{this.saveGateway({tailscale:{mode:"funnel"}})}}>funnel</button>
          </div>
        </div>
        <div class="row"><span class="k">${o("gatewayTls")}</span>
          <div class="seg-control" style="margin:0">
            <button class=${n.enabled?"":"active"} @click=${()=>{this.saveGateway({tls:{enabled:!1}})}}>${o("commsOff")}</button>
            <button class=${n.enabled?"active":""} @click=${()=>{this.saveGateway({tls:{enabled:!0,autoGenerate:!0}})}}>${o("commsOn")}</button>
          </div>
        </div>
        <div class="row"><span class="k">${o("gatewayMode")}</span><span class="v">${t.mode??"local"}</span></div>
        <div class="row"><span class="k">${o("infraPort")}</span><span class="v">${t.port??"—"}</span></div>
        ${this.gwMessage?c`<div class="notice ${this.gwMessage.ok?"ok":"error"}" style="margin-top:8px">${this.gwMessage.text}</div>`:g}
        <div class="hint">${o("gatewayNetRestart")}</div>
      </div>
    `}syncTtsForm(){const t=l.ttsConfig??{};t!==this._lastTtsRef&&(this._lastTtsRef=t)}async saveTts(t){if(this.ttsBusy)return;this.ttsBusy=!0,this.requestUpdate();const e=await l.patchTts(t);this.ttsBusy=!1,this.ttsMessage=e.ok?{ok:!0,text:o("agentsSaved")}:{ok:!1,text:`${o("agentsSaveFailed")}:${e.error??""}`},this.requestUpdate()}renderTtsCard(){const t=l.ttsConfig??{},e=t.provider??"",s=t.auto??"off",n=t.providers??{},i=["off","always","inbound","tagged"];return c`
      <div class="card glass">
        <h3>${o("ttsTitle")}</h3>
        <div class="hint">${o("ttsHint")}</div>
        <div class="row"><span class="k">${o("ttsProvider")}</span>
          <select class="field" style="margin:0" .value=${e} @change=${a=>{this.saveTts({provider:a.target.value||null})}}>
            <option value="">${o("ttsNone")}</option>
            ${Object.keys(n).map(a=>c`<option value=${a} ?selected=${a===e}>${a}</option>`)}
          </select>
        </div>
        <div class="row"><span class="k">${o("ttsAuto")}</span>
          <div class="seg-control" style="margin:0">
            ${i.map(a=>c`<button class=${s===a?"active":""} @click=${()=>{this.saveTts({auto:a})}}>${a}</button>`)}
          </div>
        </div>
        <div class="mp-form-title" style="margin-top:10px">${o("ttsProviders")}</div>
        ${Object.entries(n).map(([a,r])=>c`
          <div class="row"><span class="k">${a}</span><span class="v">${r?.apiKey?"••••":o("ttsNoKey")}</span>
            <button class="icon-btn" title=${o("delete")} @click=${()=>{this.saveTts({providers:{[a]:null}})}}>🗑</button>
          </div>
        `)}
        <div class="mp-grid mp-grid-2" style="margin-top:6px">
          <input class="field" placeholder="provider 名 (如 openai)" .value=${this.ttsNewProvider}
            @input=${a=>{this.ttsNewProvider=a.target.value}} />
          <input class="field" placeholder="API Key" .value=${this.ttsNewKey}
            @input=${a=>{this.ttsNewKey=a.target.value}} />
        </div>
        <div class="actions">
          <button class="btn" ?disabled=${!this.ttsNewProvider.trim()||this.ttsBusy}
            @click=${()=>{this.saveTts({providers:{[this.ttsNewProvider.trim()]:{apiKey:this.ttsNewKey.trim()||void 0}}}),this.ttsNewProvider="",this.ttsNewKey=""}}>+ ${o("ttsAddProvider")}</button>
        </div>
        ${this.ttsMessage?c`<div class="notice ${this.ttsMessage.ok?"ok":"error"}" style="margin-top:8px">${this.ttsMessage.text}</div>`:g}
      </div>
    `}syncEntryForm(){const t=l.agentEntries;t!==this._lastEntryRef&&(this._lastEntryRef=t)}async saveEntry(t,e){if(this.entryBusy)return;this.entryBusy=!0,this.requestUpdate();const s=await l.patchAgentEntry(t,e);this.entryBusy=!1,this.entryMessage=s.ok?{ok:!0,text:o("agentsSaved")}:{ok:!1,text:`${o("agentsSaveFailed")}:${s.error??""}`},this.requestUpdate()}renderAgentEntriesCard(){const t=l.agentEntries??[];return c`
      <div class="card glass">
        <h3>${o("agentEntriesTitle")}</h3>
        <div class="hint">${o("agentEntriesHint")}</div>
        ${t.length?t.map(e=>{const s=this.entryEditId===e.id;return c`
            <div class="ad-item">
              <div class="ad-item-head ${s?"plain":""}" @click=${()=>{this.entryEditId=s?null:e.id,this.entryModel=e.config.model??"",this.entryWorkspace=e.config.workspace??""}}>
                <div class="ad-item-text">
                  <div class="ad-item-title">${e.id}${e.config.default?c`<span class="badge active" style="margin-left:6px">${o("agentsDefault")}</span>`:g}</div>
                  <div class="ad-item-desc">${o("agentsModel")}: ${e.config.model??"—"} · ${o("agentsWorkspace")}: ${e.config.workspace??"—"}</div>
                </div>
                <span class="ad-chev ${s?"open":""}">▾</span>
              </div>
              ${s?c`
                <div class="ad-item-body">
                  <div class="mp-grid mp-grid-2">
                    <label class="ad-field"><span>${o("agentsModel")}</span><input class="field" .value=${this.entryModel} @input=${n=>{this.entryModel=n.target.value}} /></label>
                    <label class="ad-field"><span>${o("agentsWorkspace")}</span><input class="field" .value=${this.entryWorkspace} @input=${n=>{this.entryWorkspace=n.target.value}} /></label>
                  </div>
                  <div class="row"><span class="k">${o("agentsThinking")}</span>
                    <div class="seg-control" style="margin:0">
                      ${["off","minimal","low","medium","high"].map(n=>c`<button class=${e.config.thinkingDefault===n?"active":""} @click=${()=>{this.saveEntry(e.id,{thinkingDefault:n})}}>${n}</button>`)}
                    </div>
                  </div>
                  <div class="row"><span class="k">${o("agentsFastMode")}</span>
                    <div class="seg-control" style="margin:0">
                      <button class=${e.config.fastModeDefault===!0?"active":""} @click=${()=>{this.saveEntry(e.id,{fastModeDefault:!0})}}>${o("commsOn")}</button>
                      <button class=${e.config.fastModeDefault===!1?"active":""} @click=${()=>{this.saveEntry(e.id,{fastModeDefault:!1})}}>${o("commsOff")}</button>
                      <button class=${e.config.fastModeDefault==="auto"?"active":""} @click=${()=>{this.saveEntry(e.id,{fastModeDefault:"auto"})}}>${o("agentsFastAuto")}</button>
                    </div>
                  </div>
                  <div class="actions">
                    <button class="btn primary" ?disabled=${this.entryBusy}
                      @click=${()=>{this.saveEntry(e.id,{model:this.entryModel.trim()||null,workspace:this.entryWorkspace.trim()||null})}}>${o("agentsSave")}</button>
                  </div>
                </div>
              `:g}
            </div>
          `}):c`<div class="hint">${o("empty")}</div>`}
        ${this.entryMessage?c`<div class="notice ${this.entryMessage.ok?"ok":"error"}" style="margin-top:8px">${this.entryMessage.text}</div>`:g}
      </div>
    `}syncCronCfgForm(){const t=l.cronConfig??{};t!==this._lastCronCfgRef&&(this._lastCronCfgRef=t)}async saveCronCfg(t){if(this.cronCfgBusy)return;this.cronCfgBusy=!0,this.requestUpdate();const e=await l.patchCronConfig(t);this.cronCfgBusy=!1,this.cronCfgMessage=e.ok?{ok:!0,text:o("agentsSaved")}:{ok:!1,text:`${o("agentsSaveFailed")}:${e.error??""}`},this.requestUpdate()}renderCronConfigCard(){const t=l.cronConfig??{},e=t.enabled!==!1,s=t.failureAlert??{},n=t.sessionRetention??"";return c`
      <div class="card glass">
        <h3>${o("cronConfigTitle")}</h3>
        <div class="hint">${o("cronConfigHint")}</div>
        <div class="row"><span class="k">${o("cronConfigEnabled")}</span>
          <div class="seg-control" style="margin:0">
            <button class=${e?"":"active"} @click=${()=>{this.saveCronCfg({enabled:!1})}}>${o("commsOff")}</button>
            <button class=${e?"active":""} @click=${()=>{this.saveCronCfg({enabled:!0})}}>${o("commsOn")}</button>
          </div>
        </div>
        <div class="row"><span class="k">${o("cronConfigRetention")}</span>
          <input class="field" style="margin:0" placeholder="24h / 7d / false" .value=${String(n)}
            @change=${i=>{const a=i.target.value.trim();this.saveCronCfg({sessionRetention:a==="false"?!1:a||null})}} />
        </div>
        <div class="mp-form-title" style="margin-top:10px">${o("cronConfigAlert")}</div>
        <div class="row"><span class="k">${o("cronConfigAlertEnabled")}</span>
          <div class="seg-control" style="margin:0">
            <button class=${s.enabled?"":"active"} @click=${()=>{this.saveCronCfg({failureAlert:{enabled:!1}})}}>${o("commsOff")}</button>
            <button class=${s.enabled?"active":""} @click=${()=>{this.saveCronCfg({failureAlert:{enabled:!0}})}}>${o("commsOn")}</button>
          </div>
        </div>
        <div class="row"><span class="k">${o("cronConfigAlertMode")}</span>
          <div class="seg-control" style="margin:0">
            <button class=${s.mode!=="webhook"?"active":""} @click=${()=>{this.saveCronCfg({failureAlert:{mode:"announce"}})}}>announce</button>
            <button class=${s.mode==="webhook"?"active":""} @click=${()=>{this.saveCronCfg({failureAlert:{mode:"webhook"}})}}>webhook</button>
          </div>
        </div>
        <div class="row"><span class="k">${o("cronConfigAlertAfter")}</span>
          <input class="field" type="number" min="1" style="margin:0" .value=${s.after??""}
            @change=${i=>{const a=i.target.value.trim();this.saveCronCfg({failureAlert:{after:a?Number(a):null}})}} />
        </div>
        ${this.cronCfgMessage?c`<div class="notice ${this.cronCfgMessage.ok?"ok":"error"}" style="margin-top:8px">${this.cronCfgMessage.text}</div>`:g}
      </div>
    `}};k([y()],$.prototype,"urlInput",2);k([y()],$.prototype,"tokenInput",2);k([y()],$.prototype,"mpName",2);k([y()],$.prototype,"mpBaseUrl",2);k([y()],$.prototype,"mpApiKey",2);k([y()],$.prototype,"mpModelId",2);k([y()],$.prototype,"mpModelName",2);k([y()],$.prototype,"mpContext",2);k([y()],$.prototype,"mpMaxTokens",2);k([y()],$.prototype,"mpApi",2);k([y()],$.prototype,"mpCostInput",2);k([y()],$.prototype,"mpCostCacheRead",2);k([y()],$.prototype,"mpCostOutput",2);k([y()],$.prototype,"mpBusy",2);k([y()],$.prototype,"mpMessage",2);k([y()],$.prototype,"editName",2);k([y()],$.prototype,"editBaseUrl",2);k([y()],$.prototype,"editModels",2);k([y()],$.prototype,"memoryOpen",2);k([y()],$.prototype,"dreamOpen",2);k([y()],$.prototype,"channelPick",2);k([y()],$.prototype,"channelFieldValues",2);k([y()],$.prototype,"channelBusy",2);k([y()],$.prototype,"channelMessage",2);k([y()],$.prototype,"customChannelId",2);k([y()],$.prototype,"customChannelJson",2);k([y()],$.prototype,"mcpName",2);k([y()],$.prototype,"mcpMessage",2);k([y()],$.prototype,"mcpTransport",2);k([y()],$.prototype,"mcpCommand",2);k([y()],$.prototype,"mcpArgs",2);k([y()],$.prototype,"mcpEnv",2);k([y()],$.prototype,"mcpUrl",2);k([y()],$.prototype,"mcpTimeout",2);k([y()],$.prototype,"mcpHeaders",2);k([y()],$.prototype,"mcpEditMode",2);k([y()],$.prototype,"debugMethod",2);k([y()],$.prototype,"debugParams",2);k([y()],$.prototype,"debugResult",2);k([y()],$.prototype,"debugBusy",2);k([y()],$.prototype,"execOpen",2);k([y()],$.prototype,"execPolicy",2);k([y()],$.prototype,"updateBusy",2);k([y()],$.prototype,"updateMessage",2);k([y()],$.prototype,"section",2);k([y()],$.prototype,"agentsTab",2);k([y()],$.prototype,"adOpen",2);k([y()],$.prototype,"adModel",2);k([y()],$.prototype,"adUtility",2);k([y()],$.prototype,"adWorkspace",2);k([y()],$.prototype,"adImgPrimary",2);k([y()],$.prototype,"adImgFallbacks",2);k([y()],$.prototype,"adMediaImage",2);k([y()],$.prototype,"adMediaVideo",2);k([y()],$.prototype,"adMediaMusic",2);k([y()],$.prototype,"adCompactionEnabled",2);k([y()],$.prototype,"adCompactionMode",2);k([y()],$.prototype,"adKeepRecent",2);k([y()],$.prototype,"adRecentTurns",2);k([y()],$.prototype,"adCompTimeout",2);k([y()],$.prototype,"adFlushEnabled",2);k([y()],$.prototype,"adHbEvery",2);k([y()],$.prototype,"adHbStart",2);k([y()],$.prototype,"adHbEnd",2);k([y()],$.prototype,"adHbPrompt",2);k([y()],$.prototype,"adEmbeddedPolicy",2);k([y()],$.prototype,"adEmbeddedContract",2);k([y()],$.prototype,"adPolicyAllow",2);k([y()],$.prototype,"adBusy",2);k([y()],$.prototype,"adMessage",2);k([y()],$.prototype,"toolsBusy",2);k([y()],$.prototype,"toolsMessage",2);k([y()],$.prototype,"toolsAllow",2);k([y()],$.prototype,"toolsDeny",2);k([y()],$.prototype,"toolsElevated",2);k([y()],$.prototype,"loggingBusy",2);k([y()],$.prototype,"loggingMessage",2);k([y()],$.prototype,"hooksBusy",2);k([y()],$.prototype,"hooksMessage",2);k([y()],$.prototype,"gwBusy",2);k([y()],$.prototype,"gwMessage",2);k([y()],$.prototype,"ttsBusy",2);k([y()],$.prototype,"ttsMessage",2);k([y()],$.prototype,"ttsNewProvider",2);k([y()],$.prototype,"ttsNewKey",2);k([y()],$.prototype,"entryBusy",2);k([y()],$.prototype,"entryMessage",2);k([y()],$.prototype,"entryEditId",2);k([y()],$.prototype,"entryModel",2);k([y()],$.prototype,"entryWorkspace",2);k([y()],$.prototype,"cronCfgBusy",2);k([y()],$.prototype,"cronCfgMessage",2);$=k([ke("settings-view")],$);var Gc=Object.defineProperty,Wc=Object.getOwnPropertyDescriptor,Rn=(t,e,s,n)=>{for(var i=n>1?void 0:n?Wc(e,s):e,a=t.length-1,r;a>=0;a--)(r=t[a])&&(i=(n?r(e,s,i):r(i))||i);return n&&i&&Gc(e,s,i),i};let fs=class extends ae{constructor(){super(...arguments),this.urlInput="ws://127.0.0.1:18789",this.tokenInput=""}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),l.subscribe(()=>this.requestUpdate()),l.hasCreds()&&l.start()}async handleLogin(){l.saveCreds(this.urlInput.trim()||"ws://127.0.0.1:18789",this.tokenInput.trim()),this.tokenInput="",await l.start()}async handleDeviceLogin(){l.saveCreds(this.urlInput.trim()||"ws://127.0.0.1:18789",""),await l.start()}handleTab(t){l.setView(t)}render(){if(l.deviceIdentityFailed)return c`
        <div class="app-shell">
          <div class="login-wrap">
            <div class="login-card glass-strong">
              <h2>${o("identityFailedTitle")}</h2>
              <p class="hint">${o("identityFailedBody")}</p>
              ${this.renderLoginForm()}
            </div>
          </div>
        </div>
      `;if(l.authFailed)return c`
        <div class="app-shell">
          <div class="login-wrap">
            <div class="login-card glass-strong">
              <h2>${o("authFailedTitle")}</h2>
              <p class="hint">${o("authFailedBody")}</p>
              ${this.renderLoginForm()}
            </div>
          </div>
        </div>
      `;if(l.pairingError)return c`
        <div class="app-shell">
          <div class="login-wrap">
            <div class="login-card glass-strong pairing-card">
              <h2>${o("pairingTitle")}</h2>
              <p class="hint">${o("pairingBody")}</p>
              <pre><code>openclaw devices list
openclaw devices approve &lt;requestId&gt;</code></pre>
              <p class="hint">${o("pairingNote")}</p>
              <div class="actions">
                <button class="btn primary" @click=${()=>l.retryNow()}>${o("retry")}</button>
              </div>
            </div>
          </div>
        </div>
      `;if(!l.hasCreds()){const t=typeof crypto>"u"||!crypto.subtle;return c`
        <div class="app-shell">
          <div class="login-wrap">
            <div class="login-card glass-strong">
              <h2>${o("loginTitle")}</h2>
              <p class="hint">${o("loginSubtitle")}</p>
              ${t?c`<div class="notice warn">${o("loginNoSecureContext")}</div>`:""}
              ${this.renderLoginForm()}
            </div>
          </div>
        </div>
      `}return c`
      ${l.connState==="disconnected"?this.renderConnPill():g}
      <div class="app-shell">
        <div class="view-body">
          ${l.view==="chat"?c`<chat-view></chat-view>`:g}
          ${l.view==="sessions"?c`<sessions-view></sessions-view>`:g}
          ${l.view==="cron"?c`<cron-view></cron-view>`:g}
          ${l.view==="skills"?c`<skills-view></skills-view>`:g}
          ${l.view==="devices"?c`<devices-view></devices-view>`:g}
          ${l.view==="logs"?c`<logs-view></logs-view>`:g}
          ${l.view==="usage"?c`<usage-view></usage-view>`:g}
          ${l.view==="status"?c`<status-view></status-view>`:g}
          ${l.view==="settings"?c`<settings-view></settings-view>`:g}
        </div>
        ${this.renderTabBar()}
      </div>
    `}renderLoginForm(){return c`
      ${l.canDeviceLogin()?c`
        <button class="btn primary" style="width:100%;margin-bottom:4px" @click=${()=>{this.handleDeviceLogin()}}>
          ${o("deviceQuickLogin")}
        </button>
        <div class="hint" style="text-align:center;margin:0 0 8px">${o("deviceQuickLoginHint")}</div>
        <div class="login-divider"><span>${o("deviceLoginOr")}</span></div>
      `:g}
      <label>${o("settingsGatewayUrl")}</label>
      <input class="field" type="text" .value=${this.urlInput}
        @input=${t=>{this.urlInput=t.target.value}} />
      <label>${o("settingsToken")}</label>
      <input class="field" type="password" autocomplete="off" .value=${this.tokenInput}
        @keydown=${t=>{t.key==="Enter"&&this.handleLogin()}}
        @input=${t=>{this.tokenInput=t.target.value}} />
      ${l.lastError&&l.connState==="disconnected"?c`<div class="notice error">${Kr(l.lastError)}</div>`:g}
      <div class="actions">
        <button class="btn ${l.canDeviceLogin()?"":"primary"}" style="width:100%" ?disabled=${!this.tokenInput.trim()}
          @click=${()=>{this.handleLogin()}}>${o("settingsConnect")}</button>
      </div>
    `}renderConnPill(){const t=l.reconnectState;return t.gaveUp?c`
        <div class="reconnect-pill">
          <span>${o("reconnectGaveUp")}</span>
          <button class="btn primary" @click=${()=>l.retryNow()}>${o("reconnectNow")}</button>
        </div>
      `:t.attempt>0&&t.delayMs>0?c`
        <div class="reconnect-pill">
          <span>${o("reconnecting",{s:Math.ceil(t.delayMs/1e3)})} (${t.attempt}/${t.maxAttempts})</span>
          <button @click=${()=>l.retryNow()}>${o("reconnectNow")}</button>
        </div>
      `:c`
      <div class="conn-pill">
        <span>${o("connDisconnected")}</span>
        <button @click=${()=>l.retryNow()}>${o("retry")}</button>
      </div>
    `}renderTabBar(){const t=[{id:"chat",key:"navChat",ic:"chat"},{id:"sessions",key:"navSessions",ic:"sessions"},{id:"cron",key:"navCron",ic:"clock"},{id:"skills",key:"navSkills",ic:"sparkles"},{id:"devices",key:"navDevices",ic:"device"},{id:"logs",key:"navLogs",ic:"logs"},{id:"usage",key:"navUsage",ic:"coin"},{id:"status",key:"navStatus",ic:"status"},{id:"settings",key:"navSettings",ic:"settings"}];return c`
      <div class="tab-bar tab-bar-scroll">
        <div class="side-brand">
          ${ds(l.branding.appLogo,"🦞","side-logo")}
          <div class="side-name">OpenClaw</div>
          <div class="side-sub">${o("appName")}</div>
        </div>
        ${t.map(e=>c`
          <button class="tab-btn ${l.view===e.id?"active":""}" @click=${()=>this.handleTab(e.id)}>
            ${L(e.ic)}<span class="tab-label">${o(e.key)}</span>
          </button>
        `)}
      </div>
    `}};Rn([y()],fs.prototype,"urlInput",2);Rn([y()],fs.prototype,"tokenInput",2);fs=Rn([ke("openclaw-app")],fs);
