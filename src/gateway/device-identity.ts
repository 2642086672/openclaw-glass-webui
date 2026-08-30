// 浏览器设备身份:Ed25519 密钥对 + connect.challenge 签名
// 与官方 Control UI 完全一致的格式:
//   publicKey / signature = base64url,deviceId = sha256(publicKeyRaw) 的 hex
//   v2 签名载荷:v2|deviceId|clientId|clientMode|role|scopes|signedAtMs|token|nonce
// 注意:@noble/ed25519 v3 不内置 sha512,必须先注入 ed.hashes.sha512(同步实现),
// 否则所有密钥操作抛 "hashes.sha512 not set",设备身份生成失败 → 网关拒连。
import * as ed from '@noble/ed25519';
import { sha512 } from '@noble/hashes/sha2.js';

ed.hashes.sha512 = sha512;

const STORE_KEY = 'openclaw-webui.device-identity.v1';
const TOKEN_STORE_KEY = 'openclaw-webui.device-tokens.v1';

export interface DeviceIdentity {
  deviceId: string;
  publicKey: string; // base64url
  privateKey: string; // base64url
}

export interface StoredDeviceToken {
  token: string;
  role: string;
  scopes: string[];
  updatedAtMs: number;
}

function bytesToB64u(bytes: Uint8Array): string {
  let bin = '';
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin).replaceAll('+', '-').replaceAll('/', '_').replace(/=+$/g, '');
}

function b64uToBytes(s: string): Uint8Array {
  const norm = s.replaceAll('-', '+').replaceAll('_', '/');
  const padded = norm + '='.repeat((4 - (norm.length % 4)) % 4);
  const bin = atob(padded);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

async function sha256Hex(bytes: Uint8Array): Promise<string> {
  const digest = await crypto.subtle.digest('SHA-256', bytes.slice().buffer);
  return Array.from(new Uint8Array(digest)).map(b => b.toString(16).padStart(2, '0')).join('');
}

/** 生成新设备身份并持久化(localStorage:非敏感,设备配对标识)。 */
export async function ensureDeviceIdentity(): Promise<DeviceIdentity | null> {
  if (typeof crypto === 'undefined' || !crypto.subtle || !crypto.getRandomValues) return null;
  try {
    const existing = readIdentity();
    if (existing) return existing;
    const secret = ed.utils.randomSecretKey();
    const pub = await ed.getPublicKey(secret);
    const identity: DeviceIdentity = {
      deviceId: await sha256Hex(pub),
      publicKey: bytesToB64u(pub),
      privateKey: bytesToB64u(secret),
    };
    localStorage.setItem(STORE_KEY, JSON.stringify({ version: 1, ...identity }));
    return identity;
  } catch (e) {
    // 不再静默:把失败原因暴露给 UI(否则网关只会报 insecure-auth,难排查)
    console.error('[device-identity] 生成失败:', e);
    try { sessionStorage.setItem('openclaw-webui.identity-error', String(e)); } catch { /* ignore */ }
    return null;
  }
}

function readIdentity(): DeviceIdentity | null {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed?.version === 1 && typeof parsed.deviceId === 'string' && typeof parsed.publicKey === 'string' && typeof parsed.privateKey === 'string') {
      return { deviceId: parsed.deviceId, publicKey: parsed.publicKey, privateKey: parsed.privateKey };
    }
    return null;
  } catch {
    return null;
  }
}

/** 构建 v2 签名载荷(与官方 UI 一致,v3 亦被服务端接受,v2 兼容面最稳)。 */
export function buildPayloadV2(p: {
  deviceId: string;
  clientId: string;
  clientMode: string;
  role: string;
  scopes: string[];
  signedAtMs: number;
  token: string | null;
  nonce: string;
}): string {
  return ['v2', p.deviceId, p.clientId, p.clientMode, p.role, p.scopes.join(','), String(p.signedAtMs), p.token ?? '', p.nonce].join('|');
}

/** 用设备私钥签名载荷,返回 base64url 签名。 */
export async function signPayload(privateKeyB64u: string, payload: string): Promise<string> {
  const sig = await ed.sign(new TextEncoder().encode(payload), b64uToBytes(privateKeyB64u));
  return bytesToB64u(sig);
}

// ---- 设备令牌持久化(hello-ok 下发的 deviceToken,重连时复用) ----

function readTokenStore(): { version: number; deviceId: string; tokens: Record<string, StoredDeviceToken> } | null {
  try {
    const raw = localStorage.getItem(TOKEN_STORE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed?.version === 1 && typeof parsed.deviceId === 'string') {
      return { version: 1, deviceId: parsed.deviceId, tokens: parsed.tokens ?? {} };
    }
    return null;
  } catch {
    return null;
  }
}

export function getStoredDeviceToken(deviceId: string, role: string): StoredDeviceToken | null {
  const store = readTokenStore();
  if (!store || store.deviceId !== deviceId) return null;
  return store.tokens[role] ?? null;
}

/** 是否已有可用的设备令牌(免密登录用)。 */
export function hasStoredDeviceToken(): boolean {
  try {
    const raw = localStorage.getItem(TOKEN_STORE_KEY);
    if (!raw) return false;
    const parsed = JSON.parse(raw);
    return parsed?.version === 1 && typeof parsed.deviceId === 'string' &&
      Boolean(parsed.tokens?.operator?.token);
  } catch {
    return false;
  }
}

/** 清空设备令牌(令牌被吊销时回退到手动登录)。 */
export function clearStoredDeviceTokens(): void {
  try { localStorage.removeItem(TOKEN_STORE_KEY); } catch { /* ignore */ }
}

export function storeDeviceToken(deviceId: string, role: string, token: string, scopes: string[]): void {
  try {
    const store = readTokenStore() ?? { version: 1, deviceId, tokens: {} };
    if (store.deviceId !== deviceId) return;
    store.tokens[role] = { token, role, scopes, updatedAtMs: Date.now() };
    localStorage.setItem(TOKEN_STORE_KEY, JSON.stringify(store));
  } catch {
    // 存储失败不阻塞连接
  }
}
