#!/usr/bin/env node
/**
 * openclaw-glass 安装后钩子:
 * 1. 首次安装 → 生成最小网关配置(端口 18790 + 随机令牌)
 * 2. 已有配置 → 只合并 controlUi 字段,绝不覆盖用户其他配置
 * 3. 面板目录在本包内(ui/),官方引擎升级不会触碰,面板永远保留
 */
'use strict';
const fs = require('fs');
const path = require('path');
const os = require('os');
const crypto = require('crypto');

const uiDir = path.resolve(__dirname, '..', 'ui');
const cfgDir = path.join(os.homedir(), '.openclaw');
const cfgFile = path.join(cfgDir, 'openclaw.json');

if (!fs.existsSync(uiDir)) {
  console.warn('[openclaw-glass] 警告: 未找到内置面板 ui/,跳过 controlUi 配置');
  process.exit(0);
}

fs.mkdirSync(cfgDir, { recursive: true });

let cfg = {};
if (fs.existsSync(cfgFile)) {
  try {
    cfg = JSON.parse(fs.readFileSync(cfgFile, 'utf8'));
  } catch (e) {
    const bak = cfgFile + '.bak.' + Date.now();
    fs.copyFileSync(cfgFile, bak);
    console.warn(`[openclaw-glass] 配置解析失败,已备份到 ${bak} 并重建`);
    cfg = {};
  }
} else {
  console.log('[openclaw-glass] 首次安装,生成最小配置');
}

// 深合并只动 gateway.controlUi,其余字段原样保留
cfg.gateway = cfg.gateway || {};
cfg.gateway.controlUi = Object.assign({}, cfg.gateway.controlUi, {
  enabled: true,
  root: uiDir,
});
if (!cfg.gateway.port) cfg.gateway.port = 18790;
if (!cfg.gateway.mode) cfg.gateway.mode = 'local';
if (!cfg.gateway.bind) cfg.gateway.bind = 'loopback';
cfg.gateway.auth = cfg.gateway.auth || {};
if (!cfg.gateway.auth.mode) cfg.gateway.auth.mode = 'token';
if (!cfg.gateway.auth.token) {
  cfg.gateway.auth.token = crypto.randomBytes(20).toString('hex');
  console.log('[openclaw-glass] 已生成随机访问令牌');
}

fs.writeFileSync(cfgFile, JSON.stringify(cfg, null, 2), 'utf8');

console.log('[openclaw-glass] ✔ 面板已挂载: ' + uiDir);
console.log('[openclaw-glass] ✔ 配置文件:   ' + cfgFile);
console.log('[openclaw-glass] 启动方式: 运行 openclaw-glass,然后访问 http://127.0.0.1:' + cfg.gateway.port + '/');
console.log('[openclaw-glass] 令牌位置: 配置文件 gateway.auth.token 字段');
