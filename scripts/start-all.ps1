# OpenClaw + Glass WebUI 一键启动
$ErrorActionPreference = 'Continue'
$root = Split-Path -Parent $PSScriptRoot

Write-Host ''
Write-Host '==========================================' 
Write-Host '  OpenClaw + Glass WebUI 一键启动'
Write-Host '==========================================' 
Write-Host ''

# ---- 1. 检查 Node.js ----
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
  Write-Host '[错误] 未检测到 Node.js,请先安装: https://nodejs.org' -ForegroundColor Red
  Read-Host '按回车退出'
  exit 1
}
Write-Host '[OK] Node.js 已安装'

# ---- 2. 检查/安装 OpenClaw ----
if (-not (Get-Command openclaw -ErrorAction SilentlyContinue)) {
  Write-Host '[安装] 正在安装 OpenClaw,首次约 1-3 分钟,请稍候...'
  npm install -g openclaw
  if ($LASTEXITCODE -ne 0) {
    Write-Host '[错误] OpenClaw 安装失败,请检查网络后重新运行' -ForegroundColor Red
    Read-Host '按回车退出'
    exit 1
  }
}
Write-Host '[OK] OpenClaw 已安装'

# ---- 3. 生成/读取网关配置 ----
$cfgDir  = "$env:USERPROFILE\.openclaw"
$cfgFile = "$cfgDir\openclaw.json"
if (-not (Test-Path $cfgFile)) {
  Write-Host '[配置] 首次运行,生成配置与访问令牌...'
  $tok = -join ((48..57) + (97..122) | Get-Random -Count 40 | ForEach-Object { [char]$_ })
  New-Item -ItemType Directory -Force -Path $cfgDir | Out-Null
  [ordered]@{
    gateway = [ordered]@{
      port = 18790
      bind = 'loopback'
      mode = 'local'
      auth = [ordered]@{ mode = 'token'; token = $tok }
    }
  } | ConvertTo-Json -Depth 5 | Set-Content $cfgFile -Encoding UTF8
  Write-Host "[配置] 已写入 $cfgFile"
} else {
  $tok = (Get-Content $cfgFile -Raw | ConvertFrom-Json).gateway.auth.token
  Write-Host '[配置] 使用已有配置'
}
Write-Host "[配置] 访问令牌: $tok"

# ---- 4. 启动网关(独立窗口,带 TTY) ----
Write-Host ''
Write-Host '[启动] 正在启动网关(端口 18790,独立窗口)...'
Start-Process cmd -ArgumentList '/k', 'openclaw', 'gateway', 'run', '--port', '18790' -WorkingDirectory $root

# ---- 5. 启动 WebUI(独立窗口) ----
Write-Host '[启动] 正在启动 WebUI...'
if (-not (Test-Path "$root\node_modules")) {
  Write-Host '[安装] 安装 WebUI 依赖,首次约 1-2 分钟...'
  Push-Location $root
  npm install
  Pop-Location
  if ($LASTEXITCODE -ne 0) {
    Write-Host '[错误] 依赖安装失败,请检查网络后重试' -ForegroundColor Red
    Read-Host '按回车退出'
    exit 1
  }
}
Start-Process cmd -ArgumentList '/k', 'npm', 'run', 'dev' -WorkingDirectory $root

# ---- 6. 等待页面就绪并打开浏览器 ----
Write-Host '[等待] 等待页面就绪(最多 30 秒)...'
$ready = $false
for ($i = 0; $i -lt 30; $i++) {
  Start-Sleep 1
  try { $c = New-Object Net.Sockets.TcpClient; $c.Connect('127.0.0.1', 5173); $c.Close(); $ready = $true; break } catch {}
}
if ($ready) { Start-Process 'http://127.0.0.1:5173' }
else { Write-Host '[警告] WebUI 未就绪,请稍后手动打开 http://127.0.0.1:5173' -ForegroundColor Yellow }

Write-Host ''
Write-Host '==========================================' 
Write-Host '  全部启动完成!'
Write-Host ''
Write-Host "  WebUI : http://127.0.0.1:5173"
Write-Host '  网关  : ws://127.0.0.1:18790'
Write-Host "  令牌  : $tok"
Write-Host ''
Write-Host '  打开页面后,把令牌粘贴到「访问令牌」'
Write-Host '  输入框,点「连接」即可进入。'
Write-Host '==========================================' 
Write-Host ''
Read-Host '按回车关闭本窗口(网关与 WebUI 窗口保持运行)'
