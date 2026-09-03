# OpenClaw Glass 发行版

> 官方 openclaw 引擎 + 液态玻璃控制面板,**一条命令,装好即用**。

```bash
npm install -g openclaw-glass
openclaw-glass
# 打开 http://127.0.0.1:18790/ —— 看到的就是玻璃面板
```

## 它做了什么

| 步骤 | 说明 |
|------|------|
| 安装引擎 | 依赖官方 `openclaw` 包,**始终跟随官方版本更新** |
| 挂载面板 | 内置玻璃面板(`ui/` 目录),安装时自动写入 `gateway.controlUi.root` |
| 生成配置 | 首次安装自动创建 `~/.openclaw/openclaw.json`(端口 18790 + 随机令牌);已有配置**只合并 controlUi 字段,绝不覆盖** |
| 启动命令 | `openclaw-glass` = 启动网关;`openclaw-glass <任意参数>` 透传给官方 CLI(如 `openclaw-glass doctor --fix`) |

## 为什么引擎升级不会丢面板

面板文件存放在**本包自己的目录**(`node_modules/openclaw-glass/ui/`),不在官方 openclaw 包内。无论 `npm update -g openclaw` 还是 `npm update -g openclaw-glass`:

- 官方引擎升级 → 面板目录不受影响,`controlUi.root` 继续指向它
- 本包升级 → 引擎跟随 semver 拉取官方最新版

两者互不干扰,**面板永久保留**。

## 令牌在哪

`~/.openclaw/openclaw.json` 的 `gateway.auth.token` 字段。登录页粘贴即可;也可运行:

```bash
openclaw-glass gateway auth-token --show
```

## 恢复官方面板

删除 `~/.openclaw/openclaw.json` 中 `gateway.controlUi` 字段并重启网关即可,无需卸载本包。

## 从源码构建面板

面板源码在 [openclaw-glass-webui](https://github.com/2642086672/openclaw-glass-webui):

```bash
git clone https://github.com/2642086672/openclaw-glass-webui
cd openclaw-glass-webui && npm install && npm run build
cp -r dist/* <本包>/ui/    # 替换内置面板
```

## License

MIT
