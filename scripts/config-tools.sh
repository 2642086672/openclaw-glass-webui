#!/bin/bash
# OpenClaw 配置备份/补丁/还原工具
# 用法:
#   ./config-tools.sh backup                 # 手动备份当前 openclaw.json
#   ./config-tools.sh patch-dev-origins      # 备份后添加 Vite dev server 白名单(核心步骤)
#   ./config-tools.sh restore [文件|latest]  # 还原配置(还原前会再备份当前状态)
#   ./config-tools.sh verify                 # 校验 JSON + 网关健康
#   ./config-tools.sh restart-gateway        # 通过 launchd 平滑重启网关(KeepAlive 托管)
set -euo pipefail

OPENCLAW_DIR="${HOME}/.openclaw"
CONFIG="${OPENCLAW_DIR}/openclaw.json"
BACKUP_DIR="$(cd "$(dirname "$0")/.." && pwd)/backups"
SERVICE="ai.openclaw.gateway"
DEV_ORIGINS_JSON='["https://claw.trumpcard.cn","http://localhost:5173","http://127.0.0.1:5173"]'

mkdir -p "${BACKUP_DIR}"

do_backup() {
  local ts label
  ts="$(date +%Y%m%d-%H%M%S)"
  label="${1:-manual}"
  local dest="${BACKUP_DIR}/openclaw.json.${ts}.${label}"
  cp -p "${CONFIG}" "${dest}"
  shasum -a 256 "${CONFIG}" | awk '{print $1}' > "${dest}.sha256"
  echo "[backup] ${dest}"
  echo "[backup] sha256: $(cat "${dest}.sha256")"
}

do_restore() {
  local target="${1:-latest}"
  if [[ "${target}" == "latest" ]]; then
    target="$(ls -t "${BACKUP_DIR}"/openclaw.json.* 2>/dev/null | grep -v '.sha256$' | head -1 || true)"
    if [[ -z "${target}" ]]; then
      echo "[restore] 没有可用备份" >&2; exit 1
    fi
  else
    target="${BACKUP_DIR}/${target}"
  fi
  if [[ ! -f "${target}" ]]; then
    echo "[restore] 备份不存在: ${target}" >&2; exit 1
  fi
  # 还原前先备份当前状态,保证操作本身可逆
  do_backup "pre-restore"
  cp -p "${target}" "${CONFIG}"
  echo "[restore] 已还原: ${target} -> ${CONFIG}"
  python3 -c "import json;json.load(open('${CONFIG}'))" && echo "[restore] JSON 校验通过"
  echo "[restore] 如需生效请执行: ./config-tools.sh restart-gateway"
}

do_patch_dev_origins() {
  do_backup "pre-dev-origins"
  python3 - "$CONFIG" <<'PYEOF'
import json, sys
path = sys.argv[1]
with open(path) as f:
    cfg = json.load(f)
origins = cfg.setdefault('gateway', {}).setdefault('controlUi', {}).setdefault('allowedOrigins', [])
added = []
for o in ["http://localhost:5173", "http://127.0.0.1:5173"]:
    if o not in origins:
        origins.append(o)
        added.append(o)
with open(path, 'w') as f:
    json.dump(cfg, f, indent=2, ensure_ascii=False)
    f.write('\n')
print(f"[patch] allowedOrigins = {json.dumps(origins)}")
print(f"[patch] 新增: {added if added else '无(已存在)'}")
PYEOF
  python3 -c "import json;json.load(open('${CONFIG}'))" && echo "[patch] JSON 校验通过"
  echo "[patch] 注意: allowedOrigins 的 reloadKind 为 restart,需重启网关生效"
  echo "[patch] 执行: ./config-tools.sh restart-gateway"
}

do_verify() {
  python3 -c "
import json
cfg = json.load(open('${CONFIG}'))
print('[verify] JSON 有效')
print('[verify] allowedOrigins:', cfg['gateway']['controlUi'].get('allowedOrigins'))
print('[verify] gateway.auth.mode:', cfg['gateway']['auth'].get('mode'))
print('[verify] gateway.port:', cfg['gateway'].get('port'))
"
  local pid
  pid="$(launchctl list | awk '/ai\.openclaw\.gateway/{print $1}')"
  echo "[verify] launchd PID: ${pid:-未运行}"
}

do_restart() {
  local uid
  uid="$(id -u)"
  echo "[restart] kickstart -k gui/${uid}/${SERVICE} ..."
  launchctl kickstart -k "gui/${uid}/${SERVICE}"
  # 等待端口恢复监听
  local i=0
  while [[ $i -lt 30 ]]; do
    if nc -z 127.0.0.1 18789 2>/dev/null; then
      echo "[restart] 网关端口 18789 已恢复监听(等待 ${i}s)"
      return 0
    fi
    sleep 1
    i=$((i+1))
  done
  echo "[restart] 超时:端口 30s 内未恢复,请手动检查 launchctl list | grep openclaw" >&2
  return 1
}

case "${1:-}" in
  backup) do_backup ;;
  patch-dev-origins) do_patch_dev_origins ;;
  restore) do_restore "${2:-latest}" ;;
  verify) do_verify ;;
  restart-gateway) do_restart ;;
  *) echo "用法: $0 {backup|patch-dev-origins|restore [file|latest]|verify|restart-gateway}"; exit 1 ;;
esac
