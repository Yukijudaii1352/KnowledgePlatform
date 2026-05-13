#!/usr/bin/env bash
# run_paper_pipeline.sh
# 用法: ./run_paper_pipeline.sh <yaml_file>
#   例:  ./run_paper_pipeline.sh /group/40048/zcharowang/Agent/KnowledgePipeline/knowlege_tmp/ml/ml_paradigm.yaml

export http_proxy="http://star-proxy.oa.com:3128"
export https_proxy="http://star-proxy.oa.com:3128"
export ftp_proxy="http://star-proxy.oa.com:3128"
export no_proxy=".woa.com,mirrors.cloud.tencent.com,tlinux-mirror.tencent-cloud.com,tlinux-mirrorlist.tencent-cloud.com,localhost,127.0.0.1,mirrors-tlinux.tencentyun.com,.oa.com,.local,.3gqq.com,.7700.org,.ad.com,.ada_sixjoy.com,.addev.com,.app.local,.apps.local,.aurora.com,.autotest123.com,.bocaiwawa.com,.boss.com,.cdc.com,.cdn.com,.cds.com,.cf.com,.cjgc.local,.cm.com,.code.com,.datamine.com,.dvas.com,.dyndns.tv,.ecc.com,.expochart.cn,.expovideo.cn,.fms.com,.great.com,.hadoop.sec,.heme.com,.home.com,.hotbar.com,.ibg.com,.ied.com,.ieg.local,.ierd.com,.imd.com,.imoss.com,.isd.com,.isoso.com,.itil.com,.kao5.com,.kf.com,.kitty.com,.lpptp.com,.m.com,.matrix.cloud,.matrix.net,.mickey.com,.mig.local,.mqq.com,.oiweb.com,.okbuy.isddev.com,.oss.com,.otaworld.com,.paipaioa.com,.qqbrowser.local,.qqinternal.com,.qqwork.com,.rtpre.com,.sc.oa.com,.sec.com,.server.com,.service.com,.sjkxinternal.com,.sllwrnm5.cn,.sng.local,.soc.com,.t.km,.tcna.com,.teg.local,.tencentvoip.com,.tenpayoa.com,.test.air.tenpay.com,.tr.com,.tr_autotest123.com,.vpn.com,.wb.local,.webdev.com,.webdev2.com,.wizard.com,.wqq.com,.wsd.com,.sng.com,.music.lan,.mnet2.com,.tencentb2.com,.tmeoa.com,.pcg.com,www.wip3.adobe.com,www-mm.wip3.adobe.com,mirrors.tencent.com,csighub.tencentyun.com"

cd /group/40048/zcharowang/Agent/GenericAgent
set -uo pipefail

YAML_FILE="${1:?Usage: $0 <yaml_file> [jobs]}"
JOBS="${2:-${JOBS:-15}}"

if [[ ! -f "${YAML_FILE}" ]]; then
    echo "Error: YAML file not found: ${YAML_FILE}" >&2
    exit 1
fi

YAML_ABS="$(readlink -f "${YAML_FILE}")"
YAML_DIR="$(dirname "${YAML_ABS}")"
DOMAIN_1="$(basename "${YAML_DIR}")"
YAML_BASENAME="$(basename "${YAML_ABS}")"
DOMAIN_2="${YAML_BASENAME%.*}"

BASE_DIR="/group/40048/zcharowang/Agent/KnowledgePipeline/knowlege_tmp"
SPEC_FILE="${BASE_DIR}/PAPER_SPEC.md"
OUTPUT_DIR="${BASE_DIR}/${DOMAIN_1}/${DOMAIN_2}"
LOG_DIR="${OUTPUT_DIR}/logs"
RUN_TS="$(date +%Y%m%d_%H%M%S)"
SUMMARY_LOG="${LOG_DIR}/_summary_${RUN_TS}.log"
FAIL_LIST="${LOG_DIR}/_failed_${RUN_TS}.txt"
LOCK_FILE="${LOG_DIR}/.pipeline.lock"
WORK_DIR="${PWD}"  # 保留当前工作目录，供子进程调用 chat_single_round.py

mkdir -p "${OUTPUT_DIR}" "${LOG_DIR}"
: > "${FAIL_LIST}"
touch "${LOCK_FILE}"

# ---- 颜色（非 TTY 自动关闭） ----
if [[ -t 1 ]]; then
    C_RESET=$'\033[0m'; C_DIM=$'\033[2m'; C_BOLD=$'\033[1m'
    C_BLUE=$'\033[34m'; C_GREEN=$'\033[32m'; C_RED=$'\033[31m'; C_YELLOW=$'\033[33m'
else
    C_RESET=""; C_DIM=""; C_BOLD=""; C_BLUE=""; C_GREEN=""; C_RED=""; C_YELLOW=""
fi

log_info()  { printf '%s[pipeline]%s %s\n' "${C_BLUE}${C_BOLD}" "${C_RESET}" "$*"; }
log_ok()    { printf '%s[pipeline]%s %s%s%s\n' "${C_BLUE}${C_BOLD}" "${C_RESET}" "${C_GREEN}" "$*" "${C_RESET}"; }
log_warn()  { printf '%s[pipeline]%s %s%s%s\n' "${C_BLUE}${C_BOLD}" "${C_RESET}" "${C_YELLOW}" "$*" "${C_RESET}"; }
log_err()   { printf '%s[pipeline]%s %s%s%s\n' "${C_BLUE}${C_BOLD}" "${C_RESET}" "${C_RED}"   "$*" "${C_RESET}"; }

log_info "YAML       : ${YAML_ABS}"
log_info "Domain L1  : ${DOMAIN_1}"
log_info "Domain L2  : ${DOMAIN_2}"
log_info "Output Dir : ${OUTPUT_DIR}"
log_info "Log Dir    : ${LOG_DIR}"
log_info "Spec       : ${SPEC_FILE}"
log_info "Parallel   : ${JOBS}"

# ---- 解析 YAML -> 算法 block（\0 分隔） ----
TMP_BLOCKS="$(mktemp)"
trap 'rm -f "${TMP_BLOCKS}" "${LOCK_FILE}"' EXIT

python3 - "${YAML_ABS}" "${TMP_BLOCKS}" <<'PYEOF'
import sys, yaml
src, dst = sys.argv[1], sys.argv[2]
with open(src, "r", encoding="utf-8") as f:
    data = yaml.safe_load(f)

KEYS = ["id", "name", "full_name", "year", "org",
        "paper_url", "category", "parent", "motivation"]

blocks = []
for algo in data.get("algorithms", []):
    lines, idx = [], 0
    for k in KEYS:
        if k not in algo: continue
        v = algo[k]
        val = f"'{v}'" if k == "year" else str(v)
        prefix = "- " if idx == 0 else "  "
        lines.append(f"{prefix}{k}: {val}")
        idx += 1
    blocks.append("\n".join(lines))

with open(dst, "w", encoding="utf-8") as f:
    f.write("\0".join(blocks))
PYEOF

TOTAL=$(awk 'BEGIN{RS="\0"} NF{n++} END{print n+0}' "${TMP_BLOCKS}")
log_info "Algorithms : ${TOTAL}"

# ---- 汇总文件头 ----
{
    echo "Run started at: $(date)"
    echo "YAML         : ${YAML_ABS}"
    echo "Domain L1/L2 : ${DOMAIN_1} / ${DOMAIN_2}"
    echo "Parallel     : ${JOBS}"
    echo "Total algos  : ${TOTAL}"
    echo "----------------------------------------"
} > "${SUMMARY_LOG}"

# ---- Worker：处理单个 block ----
# 被 xargs 通过 bash -c 调用，需要从环境变量读取共享路径/颜色
process_one() {
    local BLOCK="$1"
    local ALGO_ID
    ALGO_ID=$(printf '%s\n' "$BLOCK" | awk -F': ' '/^- id:/{print $2; exit}')
    ALGO_ID="${ALGO_ID:-unknown_$$}"

    local LOG_FILE="${LOG_DIR}/${ALGO_ID}.log"
    local INSTRUCTION="严格按照${SPEC_FILE}中的要求，完成对论文的精读。
${BLOCK}

生成的报告markdown保存在${OUTPUT_DIR}下"

    # 终端起始分隔（整块一次性 printf，降低并发打断）
    printf '%s[pipeline]%s ▶ %s%s%s  (log: %s)\n' \
        "${C_BLUE}${C_BOLD}" "${C_RESET}" "${C_BOLD}" "${ALGO_ID}" "${C_RESET}" "${LOG_FILE}"

    {
        echo "=============================================="
        echo "Algorithm : ${ALGO_ID}"
        echo "Started   : $(date)"
        echo "PID       : $$"
        echo "----- Instruction -----"
        echo "${INSTRUCTION}"
        echo "----- chat_single_round.py output -----"
    } > "${LOG_FILE}"

    local START_TS END_TS DUR RC
    START_TS=$(date +%s)

    # 行缓冲：stdbuf；Python 再加 -u / PYTHONUNBUFFERED 双保险
    # tee 写独立日志；awk 给终端每行加 [algo_id] 前缀
    cd "${WORK_DIR}"
    PYTHONUNBUFFERED=1 stdbuf -oL -eL python -u chat_single_round.py "${INSTRUCTION}" 2>&1 \
        | stdbuf -oL tee -a "${LOG_FILE}" \
        | stdbuf -oL awk -v tag="${ALGO_ID}" -v c1="${C_DIM}" -v c0="${C_RESET}" \
              '{ printf "%s[%s]%s %s\n", c1, tag, c0, $0; fflush(); }'
    RC="${PIPESTATUS[0]}"

    END_TS=$(date +%s); DUR=$((END_TS - START_TS))

    {
        echo "----- End -----"
        echo "ExitCode  : ${RC}"
        echo "Duration  : ${DUR}s"
        echo "Finished  : $(date)"
    } >> "${LOG_FILE}"

    # 汇总/失败列表写入需要加锁，避免并发错行
    if [[ "${RC}" -eq 0 ]]; then
        printf '%s[pipeline]%s %s✔ %s 完成 (%ss)%s\n' \
            "${C_BLUE}${C_BOLD}" "${C_RESET}" "${C_GREEN}" "${ALGO_ID}" "${DUR}" "${C_RESET}"
        (
            flock 9
            echo "[OK]   ${ALGO_ID}  duration=${DUR}s  log=${LOG_FILE}" >> "${SUMMARY_LOG}"
        ) 9>"${LOCK_FILE}"
        return 0
    else
        printf '%s[pipeline]%s %s✘ %s 失败 (exit=%s, %ss) -- %s%s\n' \
            "${C_BLUE}${C_BOLD}" "${C_RESET}" "${C_RED}" "${ALGO_ID}" "${RC}" "${DUR}" "${LOG_FILE}" "${C_RESET}"
        (
            flock 9
            echo "[FAIL] ${ALGO_ID}  exit=${RC}  duration=${DUR}s  log=${LOG_FILE}" >> "${SUMMARY_LOG}"
            echo "${ALGO_ID}" >> "${FAIL_LIST}"
        ) 9>"${LOCK_FILE}"
        return 1
    fi
}

export -f process_one
export SPEC_FILE OUTPUT_DIR LOG_DIR SUMMARY_LOG FAIL_LIST LOCK_FILE WORK_DIR
export C_RESET C_DIM C_BOLD C_BLUE C_GREEN C_RED C_YELLOW

# ---- 并行分发 ----
# xargs -0 按 NUL 切 block；-n 1 每次一个；-P ${JOBS} 并发度
# 注意：把 block 作为参数传给 bash -c "process_one \"\$1\"" _ "{}"
xargs -0 -n 1 -P "${JOBS}" -I {} \
    bash -c 'process_one "$1"' _ {} < "${TMP_BLOCKS}"

# ---- 汇总 ----
SUCC=$(grep -c '^\[OK\]'   "${SUMMARY_LOG}" || true)
FAIL=$(grep -c '^\[FAIL\]' "${SUMMARY_LOG}" || true)
FAILED_IDS=""
if [[ -s "${FAIL_LIST}" ]]; then
    FAILED_IDS=$(tr '\n' ' ' < "${FAIL_LIST}")
fi

echo
printf '%s================================================================================%s\n' "${C_DIM}" "${C_RESET}"
log_info "Summary: total=${TOTAL}  success=${SUCC}  failed=${FAIL}  parallel=${JOBS}"
if (( FAIL > 0 )); then
    log_warn "Failed IDs: ${FAILED_IDS}"
    log_warn "可用如下命令仅重跑失败项："
    log_warn "  cat ${FAIL_LIST}"
fi
log_info "Reports : ${OUTPUT_DIR}"
log_info "Logs    : ${LOG_DIR}"
log_info "Summary : ${SUMMARY_LOG}"

{
    echo "----------------------------------------"
    echo "Total   : ${TOTAL}"
    echo "Success : ${SUCC}"
    echo "Failed  : ${FAIL}"
    [[ "${FAIL}" -gt 0 ]] && echo "FailedIDs: ${FAILED_IDS}"
    echo "Finished at: $(date)"
} >> "${SUMMARY_LOG}"

(( FAIL == 0 )) || exit 1