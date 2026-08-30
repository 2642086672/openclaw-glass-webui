# OpenClaw Glass WebUI

[中文](#中文) | [English](#english)

A third-party glassmorphism control panel for [OpenClaw](https://openclaw.ai) Gateway — visionOS / iOS "Liquid Glass" style, fully bilingual (中文 / English). Mount it as your Gateway dashboard **skin**, or run it standalone.

> 📖 **新手教程**:[docs/USAGE.zh-CN.md](docs/USAGE.zh-CN.md) — 从零开始的安装与使用指南(中文,含 FAQ)

---

## 中文

一个第三方 OpenClaw Gateway 控制面板:visionOS / iOS「液态玻璃」风格,中英双语可切换。**可以作为官方面板的皮肤直接挂载到网关**,也可以独立运行。

### 功能

- **聊天**:流式回复、Stop 中止、工具调用/输出卡片、Markdown 渲染
- **会话管理**:置顶 / 重命名 / 归档 / 新建,运行中与未读角标
- **模型**:会话内一键切换模型;模型管理(新增/编辑/删除,支持每百万 Tokens 三档价格:输入未命中缓存 / 输入命中缓存 / 输出)
- **Token 用量**:按模型与提供商聚合的计量计费表(输入 / 输出 / 缓存命中 / 费用)
- **定时任务**:启停 / 立即运行 / 删除,下次与上次运行时间
- **技能**:搜索浏览,内置 / 自定义来源与可用状态
- **设备**:待配对请求批准 / 拒绝、已配对设备、节点、在线状态
- **日志**:实时尾随(cursor 增量)、过滤、错误高亮
- **状态**:主机 CPU / 内存 / 磁盘 / 负载,可用模型列表
- **已配对设备免密登录**:首次输令牌,之后一键进入
- 断线自动重连(指数退避)、深浅色跟随系统、安全上下文检测

### 方式一:挂载为网关皮肤(推荐)

构建后把产物交给网关托管,`http://<gateway>:18789/` 直接变成这个面板:

```bash
npm install
npm run build
mkdir -p ~/.openclaw/control-ui-custom
cp -r dist/* ~/.openclaw/control-ui-custom/
```

在 `~/.openclaw/openclaw.json` 中设置(**root 必须是绝对路径**):

```json
{
  "gateway": {
    "controlUi": {
      "enabled": true,
      "root": "/Users/你/.openclaw/control-ui-custom"
    }
  }
}
```

重启网关后访问 `http://127.0.0.1:18789/` 即可。**回滚官方面板**:删除 `root` 字段并重启网关。

### 方式二:独立运行(开发模式)

```bash
npm install
npm run dev   # http://localhost:5173
```

跨源连接网关需要在 `openclaw.json` 白名单放行 dev server 来源:

```json
{ "gateway": { "controlUi": { "allowedOrigins": ["http://localhost:5173"] } } }
```

注意:`allowedOrigins` 修改后需重启网关;dev server 端口固定为 5173(`strictPort`)。

### 安全说明

- 访问令牌只存 `sessionStorage`,关闭标签页即清除,不写入磁盘、不出现在源码
- 设备身份(Ed25519 密钥对)与网关下发的设备令牌存 `localStorage`,用于免密重连,属非敏感配对标识
- 登录凭据经 WebSocket 握手签名传输;纯本地应用,不外发任何数据
- 修改 `openclaw.json` 前请先备份(项目 `scripts/config-tools.sh` 提供备份 / 还原 / 网关重启工具)

### 手机 / 局域网访问

非 HTTPS 页面浏览器会禁用 WebCrypto(无法生成设备身份)。局域网访问请启用 HTTPS,例如用 [`@vitejs/plugin-basic-ssl`](https://www.npmjs.com/package/@vitejs/plugin-basic-ssl) 自签证书,并把 `https://<lan-ip>:5173` 加入网关 `allowedOrigins`。

## English

A third-party glassmorphism control panel for the OpenClaw Gateway (protocol v4, WebSocket). Speaks the same handshake as the official Control UI: Ed25519 device identity signing the `connect.challenge` nonce, token auth, operator scopes.

### Features

Chat with streaming & tool cards · session management (pin / rename / archive) · in-session model switching · model management with per-million pricing (cache-miss input / cached input / output) · token usage & cost metered by model/provider · cron jobs · skills · device pairing approval · live gateway logs · host status · paired-device password-free sign-in · auto-reconnect · dark mode.

### Use as a Gateway skin

```bash
npm install && npm run build
mkdir -p ~/.openclaw/control-ui-custom && cp -r dist/* ~/.openclaw/control-ui-custom/
```

Point `gateway.controlUi.root` at the folder (absolute path), restart the gateway, open `http://127.0.0.1:18789/`. Remove `root` and restart to roll back.

### Standalone dev

```bash
npm install && npm run dev   # http://localhost:5173
```

Whitelist the dev origin in `gateway.controlUi.allowedOrigins` (restart the gateway afterwards).

### Security

Token lives in `sessionStorage` only. Device identity + gateway-issued device token live in `localStorage` for password-free reconnects. Fully local — no telemetry, no external requests.

## Disclaimer

Third-party project, not affiliated with OpenClaw. Protocol surface tested against Gateway `2026.7.x` (protocol v4); recheck the [Gateway protocol docs](https://docs.openclaw.ai) when upgrading.

## License

[MIT](./LICENSE)
