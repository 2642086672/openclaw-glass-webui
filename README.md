# 🪟 OpenClaw Glass WebUI

[中文](#中文) | [English](#english)

![Version](https://img.shields.io/badge/version-v0.1.3-5b8def) ![License](https://img.shields.io/badge/license-MIT-green) ![Gateway](https://img.shields.io/badge/Gateway-2026.8.x%20·%20protocol%20v4-8ab4f8)

A third-party **glassmorphism control panel** for [OpenClaw](https://openclaw.ai) Gateway — visionOS / iOS "Liquid Glass" style, fully bilingual (中文 / English). Mount it as your Gateway dashboard **skin**, or run it standalone.

> 📖 **新手教程**:[docs/USAGE.zh-CN.md](docs/USAGE.zh-CN.md) — 从零开始的安装与使用指南(中文,含 FAQ)
>
> ⬇️ **直接下载**: [最新 Release](https://github.com/2642086672/openclaw-glass-webui/releases) — 提供「编译产物包」(解压即用)与「源码包」

---

## 中文

一个第三方 OpenClaw Gateway 控制面板:visionOS / iOS「液态玻璃」风格,中英双语可切换。**可以作为官方面板的皮肤直接挂载到网关**,也可以独立运行。

### ✨ 功能亮点

**💬 对话核心**
- 流式回复、Stop 中止、工具调用 / 输出卡片、Markdown 渲染
- 会话管理:置顶 / 重命名 / 归档,运行中与未读角标
- 会话内一键切换模型、思考等级、极速模式

**⚙️ 设置中心(24 个分区,覆盖官方配置 ~65%)**

| 分区 | 能做什么 |
|------|----------|
| 代理(AI 与代理) | **Agent Defaults 可视化编辑器**:Compaction 压缩、Elevated 提权、Embedded 加固、极速模式、Heartbeat 心跳、图像/媒体/主/辅助模型、Model Policy 白名单、Workspace、思考默认档 —— 折叠卡片式,对齐官方 UI |
| 单代理覆盖 | 为单个 Agent 单独覆盖模型 / 工作区 / 思考档 / 极速模式 |
| 技能 | 已装技能启用 / 禁用 |
| 工具 | 工具配置档切换(minimal / messaging / coding / full)、提权开关、工具白名单 / 黑名单 |
| 日志设置 | 日志级别(debug~trace)、控制台格式、审计日志 |
| 钩子 | 提示注入 / 对话访问开关、超时、内部钩子(如 session-memory)启停 |
| 网关网络 | 监听地址(loopback / lan / tailnet)、Tailscale(off / serve / funnel)、TLS |
| 语音(TTS) | **12 个第三方服务商一键模板** + 结构化表单 + 启用 / 禁用 / 编辑,详见下方 [语音接入](#-语音tts-第三方接入) |
| Cron 设置 | 定时任务总开关、Session 保留、失败告警(announce / webhook) |
| MCP 服务器 | **6 个快速模板**(GitHub / 文件系统 / SQLite / 网页抓取 / Brave / PostgreSQL)、stdio 与 HTTP/SSE 结构化表单、启用 / 禁用、点击编辑自动填充 |
| 模型 | 提供商增删改、每百万 Tokens 三档价格、模型编辑器 |
| 渠道 | Telegram / Discord / 飞书 / QQ / Slack 引导式接入,自定义渠道 JSON |
| 记忆 | MEMORY.md 与记忆文件浏览、AI 梦境日记 |
| 安全 | 认证模式、工具配置档、**exec-approvals 可视化编辑** |
| 基础设施 | 主机信息、网关在线更新(update.run) |
| 调试控制台 | **12 个常用 RPC 快速调用按钮**、参数 JSON 实时校验、结果复制 / 清空 |
| 自动化 | 定时任务列表,启停 / 删除 |
| 日志 | 实时尾随(3s)、暂停 / 清空 |
| 连接 / 关于 / 高级 / 市场来源 | 地址令牌、版本信息、外观品牌、多市场源管理 |

**🛍️ 技能市场(ClawHub + 第三方)**
- 直连 ClawHub API:浏览 / 搜索 / 分类 / 分页 / 详情
- **自定义市场源**:名称 + URL + API Key,多源聚合浏览
- 一键安装,安装后询问启用;已装 / 可更新状态自动同步
- 断线自动重连:抖动指数退避、UI 倒计时、失败后一键重连

### 🚀 一键启动(Windows,推荐新手)

把项目文件夹拷到任意装了 Node.js 的 Windows 机器,双击:

```bat
start-all.bat   :: 自动装 OpenClaw → 生成配置和令牌 → 起网关 → 起 WebUI → 自动开浏览器
stop-all.bat    :: 一键全部停止
```

首次运行脚本会:① 自动 `npm install -g openclaw`;② 在 `~/.openclaw/openclaw.json` 生成最小配置(端口 18790 + 随机令牌);③ 打开浏览器后**把窗口里打印的令牌粘贴到登录页**即可进入。

### 📦 两种运行方式

**方式一:挂载为网关皮肤(推荐)**

```bash
npm install && npm run build
mkdir -p ~/.openclaw/control-ui-custom
cp -r dist/* ~/.openclaw/control-ui-custom/
```

在 `openclaw.json` 中设置(**root 必须是绝对路径**):

```json
{ "gateway": { "controlUi": { "enabled": true, "root": "/绝对路径/control-ui-custom" } } }
```

重启网关后 `http://127.0.0.1:18789/` 就是这个面板。删除 `root` 并重启即回滚官方面板。

**方式二:独立运行(开发模式)**

```bash
npm install
npm run dev   # http://localhost:5173
```

跨源访问需在 `openclaw.json` 白名单放行:`{ "gateway": { "controlUi": { "allowedOrigins": ["http://localhost:5173"] } } }`(改后需重启网关)。

### 🎙️ 语音(TTS)第三方接入

内置 12 个服务商快速模板,点击即填充,支持任意 OpenAI 兼容接口:

| 服务商 | 接入要素 | 备注 |
|--------|----------|------|
| OpenAI TTS | API Key | tts-1 / tts-1-hd |
| Azure 语音 | API Key + Region | 神经网络语音 |
| Google TTS | API Key | WaveNet / Neural2 |
| ElevenLabs | API Key | 声音克隆 |
| **Edge TTS** | **无需 Key** | 微软,中文友好,免费 |
| 阿里云 TTS | API Key | 中文音色丰富 |
| 腾讯云 TTS | API Key | 多音色 |
| Fish Audio / CosyVoice / GPT-SoVITS / Bark | Base URL(自托管) | 开源可本地部署 |
| 自定义 | 任意字段 | 额外参数走 JSON,catchall 透传,新服务商零代码适配 |

所有配置写入网关 `tts.providers.*`,结构化字段:API Key / Base URL / 模型 / 声音 / 区域 / 语言 / 额外 JSON 参数。

### 🔒 安全说明

- 访问令牌只存 `sessionStorage`,关闭标签页即清除,不写磁盘
- 设备身份(Ed25519)与设备令牌存 `localStorage`,用于免密重连
- 纯本地应用,不外发任何数据;修改 `openclaw.json` 前请先备份

### 📱 手机 / 局域网访问

非 HTTPS 页面浏览器禁用 WebCrypto(无法生成设备身份)。局域网访问请启用 HTTPS(如 `@vitejs/plugin-basic-ssl` 自签证书),并把来源加入网关 `allowedOrigins`;或在「设置 → 网关网络」把监听地址切到 `lan`。

## English

A third-party glassmorphism control panel for the OpenClaw Gateway (protocol v4, WebSocket). Speaks the same handshake as the official Control UI: Ed25519 device identity signing the `connect.challenge` nonce, token auth, operator scopes.

### Features

- **Chat**: streaming replies, abort, tool call/output cards, Markdown
- **Sessions**: pin / rename / archive, running & unread badges, per-session model / thinking / fast-mode
- **Settings center — 24 sections** covering ~65% of the official config surface:
  - *Agent Defaults* visual editor (Compaction, Elevated, Embedded, Fast Mode, Heartbeat, Image/Media/Utility models, Model Policy, Workspace, Thinking default)
  - *Per-agent overrides*, *Tools* (profile / allow / deny / elevated), *Logging*, *Hooks*, *Gateway network* (bind / Tailscale / TLS), *Cron global* (toggle / retention / failure alert)
  - *TTS* with 12 one-click provider templates (OpenAI / Azure / Google / ElevenLabs / free Edge TTS / Aliyun / Tencent / Fish Audio / CosyVoice / GPT-SoVITS / Bark / custom) + structured form (key / base URL / model / voice / region / language / extra JSON)
  - *MCP servers* with 6 quick templates, stdio & HTTP/SSE structured forms, enable-disable, edit-with-prefill
  - *Debug console* with 12 quick RPC buttons, live JSON validation, copy / clear
- **Skill marketplace**: ClawHub browsing / search / categories / pagination, custom marketplace sources, one-click install, installed & update-available sync
- **Model management** with per-million pricing; token usage & cost metering
- Cron jobs, device pairing approval, live logs, host status
- Paired-device password-free sign-in, jittered exponential-backoff auto-reconnect with countdown, dark/light follow system

### One-click start (Windows)

Double-click `start-all.bat` in the project root — it installs OpenClaw if missing, generates config + random token, starts the gateway (port 18790) and the WebUI (port 5173), then opens your browser. `stop-all.bat` stops everything.

### Run as a Gateway skin

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

Third-party project, not affiliated with OpenClaw. Protocol surface tested against Gateway `2026.8.x` (protocol v4); recheck the [Gateway protocol docs](https://docs.openclaw.ai) when upgrading.

## License

[MIT](./LICENSE)
