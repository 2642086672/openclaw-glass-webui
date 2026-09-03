#!/usr/bin/env node
/**
 * openclaw-glass 命令:转发到官方 openclaw 引擎,默认执行 gateway run。
 * 用法:
 *   openclaw-glass                 → 等价于 openclaw gateway run
 *   openclaw-glass <任意参数>       → 等价于 openclaw <任意参数>(doctor / doctor --fix / ...)
 */
'use strict';
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

let engineDir;
try {
  engineDir = path.dirname(require.resolve('openclaw/package.json'));
} catch (e) {
  console.error('[openclaw-glass] 找不到官方 openclaw 引擎。请重新安装:npm install -g openclaw-glass');
  process.exit(1);
}

const pkg = JSON.parse(fs.readFileSync(path.join(engineDir, 'package.json'), 'utf8'));
const binField = pkg.bin;
const binRel = typeof binField === 'string' ? binField : binField[Object.keys(binField)[0]];
const engineEntry = path.join(engineDir, binRel);

const args = process.argv.slice(2);
if (args.length === 0) args.push('gateway', 'run');

const child = spawn(process.execPath, [engineEntry, ...args], {
  stdio: 'inherit',
  env: process.env,
});
child.on('exit', (code) => process.exit(code ?? 0));
child.on('error', (err) => {
  console.error('[openclaw-glass] 启动引擎失败:', err.message);
  process.exit(1);
});
