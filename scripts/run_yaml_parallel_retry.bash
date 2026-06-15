#!/usr/bin/env bash
# 并行精读指定 topic YAML；若有失败算法，仅重试失败项。

if [ -z "${BASH_VERSION:-}" ]; then
    exec bash "$0" "$@"
fi

set -euo pipefail

CALLER_CWD="${PWD}"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"
CONTENT_DIR="${REPO_ROOT}/content"
RUN_SCRIPT="${CONTENT_DIR}/run.sh"
LOG_DIR="${CONTENT_DIR}/_batch_logs"
RUN_TS="$(date +%Y%m%d_%H%M%S)"
MAIN_LOG="${LOG_DIR}/yaml_parallel_retry_${RUN_TS}.log"

YAML_FILE=""
JOBS="${JOBS:-4}"
RETRY_JOBS="${RETRY_JOBS:-2}"
MAX_RETRIES="${MAX_RETRIES:-3}"
DRY_RUN=0

mkdir -p "${LOG_DIR}"

log() {
    printf '[%s] %s\n' "$(date '+%Y-%m-%d %H:%M:%S')" "$*" | tee -a "${MAIN_LOG}" >&2
}

usage() {
    cat <<EOF
用法:
  bash ${0##*/} <yaml_file> [options]

行为:
  首轮用 --jobs 并行精读指定 YAML 中的算法/论文；
  若有失败项，则生成临时 YAML，仅重试失败算法，最多重试 --max-retries 轮。

参数:
  <yaml_file>                要处理的 topic YAML，例如 content/llm/llm_base.yaml
  --jobs N                   首轮算法并发度，默认: ${JOBS}
  --retry-jobs N             重试算法并发度，默认: ${RETRY_JOBS}
  --max-retries N            最多选择性重试轮数，默认: ${MAX_RETRIES}
  --dry-run                  只打印将要执行的命令，不真正运行
  -h, --help                 显示帮助

示例:
  bash scripts/${0##*/} content/llm/llm_base.yaml
  bash scripts/${0##*/} content/agent/tool_use.yaml --jobs 6 --retry-jobs 2 --max-retries 3
  JOBS=8 RETRY_JOBS=2 bash scripts/${0##*/} content/infra/infer.yaml
EOF
}

require_positive_int() {
    local name="$1"
    local value="$2"
    if [[ ! "${value}" =~ ^[1-9][0-9]*$ ]]; then
        echo "${name} 必须是正整数: ${value}" >&2
        exit 2
    fi
}

resolve_yaml_path() {
    local input="$1"
    if [[ "${input}" = /* ]]; then
        readlink -f "${input}"
    else
        readlink -f "${CALLER_CWD}/${input}"
    fi
}

while (( $# > 0 )); do
    case "$1" in
        --jobs)
            JOBS="${2:?missing value for --jobs}"
            shift 2
            ;;
        --retry-jobs)
            RETRY_JOBS="${2:?missing value for --retry-jobs}"
            shift 2
            ;;
        --max-retries)
            MAX_RETRIES="${2:?missing value for --max-retries}"
            shift 2
            ;;
        --dry-run)
            DRY_RUN=1
            shift
            ;;
        -h|--help)
            usage
            exit 0
            ;;
        --*)
            echo "Unknown argument: $1" >&2
            usage >&2
            exit 2
            ;;
        *)
            if [[ -n "${YAML_FILE}" ]]; then
                echo "只能指定一个 yaml_file，额外参数: $1" >&2
                usage >&2
                exit 2
            fi
            YAML_FILE="$(resolve_yaml_path "$1")"
            shift
            ;;
    esac
done

if [[ -z "${YAML_FILE}" ]]; then
    usage >&2
    exit 2
fi

require_positive_int "--jobs" "${JOBS}"
require_positive_int "--retry-jobs" "${RETRY_JOBS}"
require_positive_int "--max-retries" "${MAX_RETRIES}"

if [[ ! -f "${RUN_SCRIPT}" ]]; then
    echo "run.sh 不存在: ${RUN_SCRIPT}" >&2
    exit 1
fi

if [[ ! -f "${YAML_FILE}" ]]; then
    echo "YAML 不存在: ${YAML_FILE}" >&2
    exit 1
fi

case "${YAML_FILE}" in
    *.yaml|*.yml) ;;
    *)
        echo "YAML 文件后缀必须是 .yaml 或 .yml: ${YAML_FILE}" >&2
        exit 2
        ;;
esac

topic_id_for_yaml() {
    local yaml_file="$1"
    local base
    base="$(basename "${yaml_file}")"
    printf '%s\n' "${base%.*}"
}

domain_for_yaml() {
    local yaml_file="$1"
    basename "$(dirname "${yaml_file}")"
}

topic_log_dir_for_yaml() {
    local yaml_file="$1"
    local domain_1 domain_2
    domain_1="$(domain_for_yaml "${yaml_file}")"
    domain_2="$(topic_id_for_yaml "${yaml_file}")"
    printf '%s/%s/%s/logs\n' "${CONTENT_DIR}" "${domain_1}" "${domain_2}"
}

topic_output_dir_for_yaml() {
    local yaml_file="$1"
    local domain_1 domain_2
    domain_1="$(domain_for_yaml "${yaml_file}")"
    domain_2="$(topic_id_for_yaml "${yaml_file}")"
    printf '%s/%s/%s\n' "${CONTENT_DIR}" "${domain_1}" "${domain_2}"
}

topic_total_for_yaml() {
    local yaml_file="$1"
    python3 - "${yaml_file}" <<'PYEOF'
import sys
import yaml

with open(sys.argv[1], "r", encoding="utf-8") as f:
    data = yaml.safe_load(f) or {}
print(len(data.get("algorithms", [])))
PYEOF
}

latest_new_file() {
    local dir="$1"
    local pattern="$2"
    local marker="$3"
    if [[ ! -d "${dir}" ]]; then
        return 1
    fi
    find "${dir}" -maxdepth 1 -type f -name "${pattern}" -newer "${marker}" -printf '%T@ %p\n' 2>/dev/null \
        | sort -n \
        | tail -1 \
        | awk '{print $2}'
}

count_lines_or_zero() {
    local path="$1"
    if [[ -f "${path}" ]]; then
        wc -l < "${path}"
    else
        echo 0
    fi
}

make_retry_yaml() {
    local src_yaml="$1"
    local failed_list="$2"
    local out_yaml="$3"
    python3 - "${src_yaml}" "${failed_list}" "${out_yaml}" <<'PYEOF'
import sys
from pathlib import Path
import yaml

src_yaml, failed_list, out_yaml = sys.argv[1], sys.argv[2], sys.argv[3]

with open(src_yaml, "r", encoding="utf-8") as f:
    data = yaml.safe_load(f) or {}

failed_ids = []
with open(failed_list, "r", encoding="utf-8") as f:
    for line in f:
        line = line.strip()
        if line:
            failed_ids.append(line)

failed_set = set(failed_ids)
data["algorithms"] = [algo for algo in data.get("algorithms", []) if algo.get("id") in failed_set]

out_path = Path(out_yaml)
out_path.parent.mkdir(parents=True, exist_ok=True)
with open(out_path, "w", encoding="utf-8") as f:
    yaml.safe_dump(data, f, allow_unicode=True, sort_keys=False)

print(len(data.get("algorithms", [])))
PYEOF
}

run_yaml_once() {
    local yaml_file="$1"
    local jobs="$2"
    local label="$3"
    local topic_log_dir marker single_log rc summary_file fail_list_file safe_label topic_name

    topic_log_dir="$(topic_log_dir_for_yaml "${yaml_file}")"
    mkdir -p "${topic_log_dir}"

    marker="$(mktemp)"
    topic_name="$(topic_id_for_yaml "${YAML_FILE}")"
    safe_label="$(printf '%s' "${label}" | tr -c 'A-Za-z0-9_.-' '_')"
    single_log="${LOG_DIR}/${topic_name}_${safe_label}_${RUN_TS}_$$_${RANDOM}.log"

    log "[${label}] 运行: bash ${RUN_SCRIPT} ${yaml_file} ${jobs}"
    set +e
    bash "${RUN_SCRIPT}" "${yaml_file}" "${jobs}" > "${single_log}" 2>&1
    rc=$?
    set -e

    summary_file="$(latest_new_file "${topic_log_dir}" "_summary_*.log" "${marker}" || true)"
    fail_list_file="$(latest_new_file "${topic_log_dir}" "_failed_*.txt" "${marker}" || true)"
    rm -f "${marker}"

    if [[ -n "${summary_file}" ]]; then
        log "[${label}] summary: ${summary_file}"
    else
        log "[${label}] WARN: 未找到新的 summary 文件"
    fi

    if [[ -n "${fail_list_file}" ]]; then
        log "[${label}] fail_list: ${fail_list_file}"
    else
        log "[${label}] WARN: 未找到新的 fail_list 文件"
    fi

    log "[${label}] rc=${rc} log=${single_log}"
    printf '%s\n%s\n%s\n' "${rc}" "${summary_file}" "${fail_list_file}"
}

total_algos="$(topic_total_for_yaml "${YAML_FILE}")"
topic_log_dir="$(topic_log_dir_for_yaml "${YAML_FILE}")"
topic_output_dir="$(topic_output_dir_for_yaml "${YAML_FILE}")"

log "============ YAML 并行精读开始 ============"
log "YAML_FILE=${YAML_FILE}"
log "RUN_SCRIPT=${RUN_SCRIPT}"
log "OUTPUT_DIR=${topic_output_dir}"
log "TOPIC_LOG_DIR=${topic_log_dir}"
log "TOTAL_ALGORITHMS=${total_algos}"
log "JOBS=${JOBS} RETRY_JOBS=${RETRY_JOBS} MAX_RETRIES=${MAX_RETRIES}"
log "MAIN_LOG=${MAIN_LOG}"

if (( total_algos <= 0 )); then
    log "YAML 中没有 algorithms 条目，停止"
    exit 1
fi

if (( DRY_RUN == 1 )); then
    log "[DRY RUN] bash ${RUN_SCRIPT} ${YAML_FILE} ${JOBS}"
    log "============ DRY RUN 结束 ============"
    exit 0
fi

mapfile -t run_info < <(run_yaml_once "${YAML_FILE}" "${JOBS}" "initial")
initial_rc="${run_info[0]:-1}"
current_summary="${run_info[1]:-}"
current_fail_list="${run_info[2]:-}"

if [[ -n "${current_summary}" ]]; then
    current_failed_count="$(count_lines_or_zero "${current_fail_list}")"
else
    current_failed_count="${total_algos}"
    log "[initial] WARN: 没有新的 summary，按整份 YAML 失败处理"
fi

log "[initial] rc=${initial_rc} failed=${current_failed_count}/${total_algos}"

if (( current_failed_count > 0 )); then
    log "触发失败项重试: failed=${current_failed_count}, total=${total_algos}"

    for ((attempt=1; attempt<=MAX_RETRIES; attempt++)); do
        if (( current_failed_count == 0 )); then
            break
        fi

        if [[ -z "${current_fail_list}" || ! -s "${current_fail_list}" ]]; then
            log "[retry-${attempt}] 没有可用 failed_list，停止重试"
            break
        fi

        retry_root="$(mktemp -d)"
        retry_parent_name="$(domain_for_yaml "${YAML_FILE}")"
        retry_basename="$(basename "${YAML_FILE}")"
        retry_yaml="${retry_root}/${retry_parent_name}/${retry_basename}"

        retry_count="$(make_retry_yaml "${YAML_FILE}" "${current_fail_list}" "${retry_yaml}")"
        if (( retry_count <= 0 )); then
            log "[retry-${attempt}] 没有可重试算法，停止重试"
            rm -rf "${retry_root}"
            break
        fi

        log "[retry-${attempt}] 仅重试失败算法 ${retry_count} 个"
        mapfile -t retry_info < <(run_yaml_once "${retry_yaml}" "${RETRY_JOBS}" "retry${attempt}")
        retry_rc="${retry_info[0]:-1}"
        retry_summary="${retry_info[1]:-}"
        retry_fail_list="${retry_info[2]:-}"

        if [[ -n "${retry_summary}" ]]; then
            retry_failed_count="$(count_lines_or_zero "${retry_fail_list}")"
        else
            retry_failed_count="${current_failed_count}"
            log "[retry-${attempt}] WARN: 没有新的 summary，按本轮仍失败处理"
        fi
        rm -rf "${retry_root}"

        log "[retry-${attempt}] rc=${retry_rc} failed=${retry_failed_count}/${current_failed_count}"

        current_summary="${retry_summary}"
        current_fail_list="${retry_fail_list}"
        current_failed_count="${retry_failed_count}"

        if (( retry_failed_count == 0 )); then
            log "[retry-${attempt}] 全部重试成功"
            break
        fi
    done
fi

if (( current_failed_count == 0 )); then
    log "结果: SUCCESS ${YAML_FILE}"
    log "============ YAML 并行精读结束 ============"
    exit 0
fi

log "结果: FAIL ${YAML_FILE} (remaining_failed=${current_failed_count})"
if [[ -f "${current_fail_list}" ]]; then
    while IFS= read -r failed_id; do
        [[ -n "${failed_id}" ]] || continue
        log "  remaining_failed_id: ${failed_id}"
    done < "${current_fail_list}"
fi
log "============ YAML 并行精读结束 ============"
exit 1
