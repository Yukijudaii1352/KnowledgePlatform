#!/usr/bin/env bash
# run_paper_pipeline.sh
# 用法: ./run_paper_pipeline.sh <yaml_file>
#   例:  ./run_paper_pipeline.sh /group/40048/zcharowang/Agent/KnowledgePipeline/knowlege_tmp/ml/ml_paradigm.yaml

set -uo pipefail

CALLER_CWD="${PWD}"
YAML_INPUT="${1:?Usage: $0 <yaml_file> [jobs]}"
JOBS="${2:-${JOBS:-5}}"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"

resolve_generic_agent_root() {
    if [[ -n "${GENERIC_AGENT_ROOT:-}" ]]; then
        printf '%s\n' "${GENERIC_AGENT_ROOT}"
        return 0
    fi

    if [[ -f "${REPO_ROOT}/tools/GenericAgent/chat_single_round.py" ]]; then
        printf '%s\n' "${REPO_ROOT}/tools/GenericAgent"
        return 0
    fi

    if [[ -f "/mnt/petrelfs/wanghaoyu2/GenericAgent/chat_single_round.py" ]]; then
        printf '%s\n' "/mnt/petrelfs/wanghaoyu2/GenericAgent"
        return 0
    fi

    echo "Error: GenericAgent not found." >&2
    echo "Please run: bash ${REPO_ROOT}/scripts/setup_generic_agent.sh" >&2
    echo "Or set GENERIC_AGENT_ROOT=/abs/path/to/GenericAgent" >&2
    exit 1
}

if [[ "${YAML_INPUT}" = /* ]]; then
    YAML_FILE="${YAML_INPUT}"
else
    YAML_FILE="${CALLER_CWD}/${YAML_INPUT}"
fi
YAML_FILE="$(readlink -f "${YAML_FILE}")"

if [[ ! -f "${YAML_FILE}" ]]; then
    echo "Error: YAML file not found: ${YAML_FILE}" >&2
    exit 1
fi

GENERIC_AGENT_ROOT="$(readlink -f "$(resolve_generic_agent_root)")"
CHAT_SCRIPT="${GENERIC_AGENT_ROOT}/chat_single_round.py"

if [[ ! -f "${CHAT_SCRIPT}" ]]; then
    echo "Error: chat_single_round.py not found under ${GENERIC_AGENT_ROOT}" >&2
    exit 1
fi

cd "${GENERIC_AGENT_ROOT}"

YAML_ABS="${YAML_FILE}"
YAML_DIR="$(dirname "${YAML_ABS}")"
DOMAIN_1="$(basename "${YAML_DIR}")"
YAML_BASENAME="$(basename "${YAML_ABS}")"
DOMAIN_2="${YAML_BASENAME%.*}"

BASE_DIR="${REPO_ROOT}/content"
SPEC_FILE="${BASE_DIR}/PAPER_SPEC.md"
OUTPUT_DIR="${BASE_DIR}/${DOMAIN_1}/${DOMAIN_2}"
LOG_DIR="${OUTPUT_DIR}/logs"
RUN_TS="$(date +%Y%m%d_%H%M%S)"
SUMMARY_LOG="${LOG_DIR}/_summary_${RUN_TS}.log"
FAIL_LIST="${LOG_DIR}/_failed_${RUN_TS}.txt"
LOCK_FILE="${LOG_DIR}/.pipeline.lock"
WORK_DIR="${GENERIC_AGENT_ROOT}"
PYTHON_BIN="${PYTHON_BIN:-python}"

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

get_mtime() {
    local path="$1"
    if [[ -f "${path}" ]]; then
        stat -c %Y "${path}" 2>/dev/null || echo 0
    else
        echo 0
    fi
}

validate_detail_file() {
    local path="$1"
    [[ -s "${path}" ]] || return 1
    grep -q '^### ' "${path}" || return 1
    grep -q '^#### ' "${path}" || return 1
    grep -q '一句话总结' "${path}" || return 1
    grep -q '核心要点' "${path}" || return 1
    grep -q '深入细节' "${path}" || return 1
}

log_info "YAML       : ${YAML_ABS}"
log_info "Domain L1  : ${DOMAIN_1}"
log_info "Domain L2  : ${DOMAIN_2}"
log_info "Output Dir : ${OUTPUT_DIR}"
log_info "Log Dir    : ${LOG_DIR}"
log_info "Spec       : ${SPEC_FILE}"
log_info "Agent Root : ${GENERIC_AGENT_ROOT}"
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
    local DETAIL_FILE="${OUTPUT_DIR}/${ALGO_ID}_detail.md"
    local PLAIN_FILE="${OUTPUT_DIR}/${ALGO_ID}.md"
    local BEFORE_MTIME AFTER_MTIME
    BEFORE_MTIME=$(get_mtime "${DETAIL_FILE}")
    local INSTRUCTION="严格按照${SPEC_FILE}中的要求，完成对论文的精读。
${BLOCK}

请将最终 Markdown 直接写入以下唯一目标文件：
${DETAIL_FILE}

要求：
1. 文件名必须严格是 ${ALGO_ID}_detail.md，不能写成 ${ALGO_ID}.md 或其他名字。
2. 内容开头直接以 ### 标题开始，不要添加额外说明。
3. 写完后自行检查该路径下文件已经生成且非空；如果写到了其他文件名，请立刻修正到上述目标文件。"

    # 终端起始分隔（整块一次性 printf，降低并发打断）
    printf '%s[pipeline]%s ▶ %s%s%s  (log: %s)\n' \
        "${C_BLUE}${C_BOLD}" "${C_RESET}" "${C_BOLD}" "${ALGO_ID}" "${C_RESET}" "${LOG_FILE}"

    {
        echo "=============================================="
        echo "Algorithm : ${ALGO_ID}"
        echo "Started   : $(date)"
        echo "PID       : $$"
        echo "Output    : ${DETAIL_FILE}"
        echo "----- Instruction -----"
        echo "${INSTRUCTION}"
        echo "----- chat_single_round.py output -----"
    } > "${LOG_FILE}"

    local START_TS END_TS DUR RC
    START_TS=$(date +%s)

    # 行缓冲：stdbuf；Python 再加 -u / PYTHONUNBUFFERED 双保险
    # tee 写独立日志；awk 给终端每行加 [algo_id] 前缀
    cd "${WORK_DIR}"
    PYTHONUNBUFFERED=1 stdbuf -oL -eL "${PYTHON_BIN}" -u "${CHAT_SCRIPT}" "${INSTRUCTION}" 2>&1 \
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

    AFTER_MTIME=$(get_mtime "${DETAIL_FILE}")

    local FAIL_REASON=""
    if [[ "${RC}" -ne 0 ]]; then
        FAIL_REASON="exit=${RC}"
    elif [[ ! -f "${DETAIL_FILE}" ]]; then
        if [[ -f "${PLAIN_FILE}" ]]; then
            FAIL_REASON="wrong_output_name:${PLAIN_FILE}"
        else
            FAIL_REASON="missing_output:${DETAIL_FILE}"
        fi
    elif [[ "${AFTER_MTIME}" -le "${BEFORE_MTIME}" ]]; then
        FAIL_REASON="output_not_updated:${DETAIL_FILE}"
    elif ! validate_detail_file "${DETAIL_FILE}"; then
        FAIL_REASON="invalid_output_format:${DETAIL_FILE}"
    fi

    # 汇总/失败列表写入需要加锁，避免并发错行
    if [[ -z "${FAIL_REASON}" ]]; then
        printf '%s[pipeline]%s %s✔ %s 完成 (%ss)%s\n' \
            "${C_BLUE}${C_BOLD}" "${C_RESET}" "${C_GREEN}" "${ALGO_ID}" "${DUR}" "${C_RESET}"
        (
            flock 9
            echo "[OK]   ${ALGO_ID}  duration=${DUR}s  output=${DETAIL_FILE}  log=${LOG_FILE}" >> "${SUMMARY_LOG}"
        ) 9>"${LOCK_FILE}"
        return 0
    else
        printf '%s[pipeline]%s %s✘ %s 失败 (%s, %ss) -- %s%s\n' \
            "${C_BLUE}${C_BOLD}" "${C_RESET}" "${C_RED}" "${ALGO_ID}" "${FAIL_REASON}" "${DUR}" "${LOG_FILE}" "${C_RESET}"
        (
            flock 9
            echo "[FAIL] ${ALGO_ID}  reason=${FAIL_REASON}  duration=${DUR}s  log=${LOG_FILE}" >> "${SUMMARY_LOG}"
            echo "${ALGO_ID}" >> "${FAIL_LIST}"
        ) 9>"${LOCK_FILE}"
        return 1
    fi
}

export -f get_mtime validate_detail_file process_one
export SPEC_FILE OUTPUT_DIR LOG_DIR SUMMARY_LOG FAIL_LIST LOCK_FILE WORK_DIR CHAT_SCRIPT PYTHON_BIN
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
