# OpenClaw Glass WebUI 使用说明(新手版)

> 拿到这份源码后,跟着本文从零开始,10 分钟内用上玻璃拟态控制台。
> 遇到问题直接翻最后的【常见问题】。

---

## 一、这是什么

这是一个 **OpenClaw 网关的第三方控制面板**(皮肤),提供:

- 聊天(流式回复、停止、工具调用卡片)
- 会话管理(置顶 / 重命名 / 归档)
- 模型管理(新增 / 编辑 / 删除,按每百万 tokens 配置价格)
- Token 用量与费用统计(按模型 / 厂商聚合)+ 配额倒计时
- 定时任务(新建 / 编辑 / 启停 / 立即运行)
- 技能浏览、设备配对管理、网关实时日志
- AI 记忆查看 / 梦境日记 / Logo 与头像自定义 / 中英双语

它**不改变** OpenClaw 的任何功能,只是给你一个更漂亮、更顺手的操作界面。

---

## 二、你需要准备什么

| 需要 | 说明 |
|---|---|
| 一台运行 OpenClaw 网关的电脑 | 也就是你已经装好 OpenClaw、`openclaw gateway` 能跑起来的那台(Mac / Linux / Windows 均可) |
| Node.js **20.19 或更高版本** | 终端执行 `node -v` 检查;没有就去 https://nodejs.org 下载 LTS 版 |
| 网关访问令牌 | 稍后告诉你去哪找 |

> 如何确认网关在跑:浏览器打开 `http://127.0.0.1:18789/`,能看到 OpenClaw 面板(或我们的面板)就说明在跑。没跑的话在终端执行 `openclaw gateway`。

---

## 三、获取源码并安装

```bash
# 1. 进入你想放项目的目录,比如
cd ~

# 2. 如果是从 GitHub 克隆(替换成实际仓库地址)
git clone <仓库地址> openclaw-glass-webui
cd openclaw-glass-webui

# 3. 如果是拿到压缩包,解压后进入目录即可

# 4. 安装依赖(首次需要,约 1 分钟)
npm install
```

---

## 四、两种使用方式(选一种)

### 方式 A:开发模式(最快上手,推荐新手)

```bash
npm run dev
```

看到 `➜ Local: http://localhost:5173/` 就成功了。浏览器打开:

> **http://localhost:5173**

### 方式 B:挂载为网关皮肤(把官方面板整个换掉)

构建并把产物交给网关托管:

```bash
npm run build
mkdir -p ~/.openclaw/control-ui-custom
cp -r dist/* ~/.openclaw/control-ui-custom/
```

然后在 `~/.openclaw/openclaw.json` 的 `gateway.controlUi` 里加一行 `root`(**必须写绝对路径**,把"你的用户名"换掉):

```json
{
  "gateway": {
    "controlUi": {
      "root": "/Users/你的用户名/.openclaw/control-ui-custom"
    }
  }
}
```

重启网关:

```bash
# macOS(launchd 托管时)
launchctl kickstart -k "gui/$(id -u)/ai.openclaw.gateway"

# Linux(systemd 托管时,按你的服务名调整)
sudo systemctl restart openclaw-gateway
```

之后打开 **http://127.0.0.1:18789/** —— 面板已经换成玻璃拟态了。

> **想换回官方面板?** 删掉 `openclaw.json` 里那行 `root`,再重启网关即可。皮肤文件留着不碍事。

---

## 五、首次登录

1. 打开面板后,会看到登录页,需要填两个东西:
   - **网关地址**:保持默认 `ws://127.0.0.1:18789` 不动(挂载为皮肤时也不用改,会自动识别)
   - **访问令牌**:见下方查找方法
2. 点「连接」,成功一次后,这台浏览器就配对完成,以后登录页会出现**「快速登录(已配对设备)」**按钮,一键进入,再也不用输令牌。

### 去哪找访问令牌

在你运行网关的那台电脑终端执行:

```bash
grep -o '"token": "[^"]*"' ~/.openclaw/openclaw.json
```

输出的那串就是令牌(它也是你 OpenClaw 的网关令牌,和我们项目无关,我们只是使用它)。粘贴进面板即可。

> 安全性:令牌只保存在浏览器标签页里(sessionStorage),关掉标签页就没了,不会写进磁盘,更不会发给任何第三方。

---

## 六、功能速览(左侧边栏从上到下)

| 菜单 | 能干什么 | 新手提示 |
|---|---|---|
| 聊天 | 和 AI 对话,支持停止、看工具执行过程 | 顶部可切换本会话用的模型 |
| 会话 | 管理所有对话:置顶、重命名、归档 | 鼠标悬停到会话上出现操作按钮 |
| 任务 | 定时让 AI 干活:每 N 分钟 / 每天定点 / Cron 表达式 | 点「+ 新建任务」,写清楚"执行内容"就行 |
| 技能 | 查看 AI 有哪些技能可用 | 只读浏览 |
| 设备 | 新设备接入时在这里点「批准」 | 换浏览器/手机首次连接会用到 |
| 日志 | 网关运行日志实时滚动 | 出问题时来这里找红色报错 |
| 用量 | Token 消耗与费用,按模型/厂商统计 | 可设「配额倒计时」:厂商送了 1000 万 token 就填进去,实时看剩余 |
| 状态 | 电脑的 CPU / 内存 / 磁盘 / 负载 | 每 10 秒自动刷新 |
| 设置 | 见下 | |

**设置页**(顶部有分区标签):通用(语言 / Logo 头像)、会话(模型 / 思考深度 / 极速模式)、模型(新增 / 编辑 / 删除,可配价格)、渠道(接入 Telegram / 飞书 / QQ 机器人等)、记忆(**查看 AI 记住了你什么**,像 ChatGPT 的记忆功能)、梦境(AI 自动写的记忆整理日记)、安全、连接。

---

## 七、常见问题(FAQ)

### 1. 打不开页面 / 连接断开

- 确认网关在跑:开一个终端执行 `openclaw gateway`,再刷新页面
- 开发模式下端口**必须是 5173**(配置已固定);如果你改了端口,网关白名单也要同步改,不建议

### 2. 手机访问提示"不是安全上下文,无法使用 WebCrypto"

手机的浏览器要求加密连接。两种解法:

- **简单**:不用手机访问,或通过网关本身的面板地址访问
- **进阶**:给开发服务开 HTTPS——安装 `npm i -D @vitejs/plugin-basic-ssl`,在 `vite.config.ts` 加 `plugins: [basicSsl()]`,然后把 `https://局域网IP:5173` 加入网关白名单(见问题 4),手机首次访问时点「继续访问」接受自签证书

### 3. 提示"登录尝试过于频繁,已被临时锁定"

网关有防爆破保护(60 秒内错 10 次锁 10 分钟)。等 10 分钟,或重启网关后点「立即重试」。

### 4. 修改了 `openclaw.json` 不生效

大多数网关配置改完**都要重启网关**。白名单(`allowedOrigins`)、渠道、皮肤路径都是。重启方法见第四节方式 B。

### 5. 我想让局域网里其他设备也能打开面板

开发模式默认只监听本机。改 `vite.config.ts` 的 `host: '0.0.0.0'`,重启 `npm run dev`,其他设备访问 `http://电脑IP:5173`。手机会遇到问题 2,按提示开 HTTPS。

### 6. 忘了令牌 / 令牌失效

按第五节的方法重新查令牌输入即可。如果之前配对过,令牌失效时面板会提示重新登录。

### 7. 如何彻底卸载

```bash
# 1. 删项目目录
rm -rf openclaw-glass-webui

# 2. 如果挂载过皮肤:编辑 ~/.openclaw/openclaw.json 删掉 controlUi 里的 root 行,重启网关
# 3. 可选:删皮肤文件
rm -rf ~/.openclaw/control-ui-custom
```

你的 OpenClaw 数据(会话、记忆、配置)全程不会被本项目改动或删除。

---

## 八、更新版本

```bash
cd openclaw-glass-webui
git pull          # 或重新下载解压覆盖
npm install       # 依赖有变化时
npm run build
cp -r dist/* ~/.openclaw/control-ui-custom/   # 挂载皮肤的用户执行
```

---

## 九、给进阶用户的提醒

- 本项目通过 `config.patch` 修改网关配置(带并发保护),但**动手改配置前请自行备份** `~/.openclaw/openclaw.json`
- 项目自带的 `scripts/config-tools.sh` 提供备份 / 还原 / 重启网关(macOS)命令,可参考使用
- 遇到协议不兼容(OpenClaw 升级后某些功能失效),请提 issue 并附上网关版本号(`openclaw --version`)

— 完 —
