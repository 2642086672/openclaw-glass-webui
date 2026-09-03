# OpenClaw 一键停止:结束网关(18790)与 WebUI(5173)进程
Write-Host ''
Write-Host '==========================================' 
Write-Host '  OpenClaw 一键停止'
Write-Host '==========================================' 
Write-Host ''

function Stop-Port([int]$port, [string]$name) {
  $pids = Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction SilentlyContinue |
    Select-Object -ExpandProperty OwningProcess -Unique
  if ($pids) {
    foreach ($p in $pids) {
      try { Stop-Process -Id $p -Force -ErrorAction Stop; Write-Host "  [停止] $name (端口 $port,进程 $p)" }
      catch { Write-Host "  [跳过] 进程 $p 已不在运行" }
    }
  } else {
    Write-Host "  [无] $name 未在运行 (端口 $port)"
  }
}

Stop-Port 5173 'WebUI'
Stop-Port 18790 '网关'

Write-Host ''
Write-Host '全部停止完成。若网关窗口(cmd 标题 OpenClaw Gateway)仍打开,可直接关闭。'
Write-Host ''
Read-Host '按回车关闭本窗口'
