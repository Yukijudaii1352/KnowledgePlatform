#!/usr/bin/env bash
# batch_run.sh - 批量扫描指定目录下的 yaml 文件并执行 run.sh

set -uo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"
RUN_SCRIPT="${SCRIPT_DIR}/run.sh"
LOG_DIR="${REPO_ROOT}/content/_batch_logs"
MAIN_LOG="${LOG_DIR}/batch_run_$(date +%Y%m%d_%H%M%S).log"

mkdir -p "${LOG_DIR}"

log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*" | tee -a "${MAIN_LOG}"
}

if [[ ! -f "${RUN_SCRIPT}" ]]; then
    log "ERROR: run.sh 不存在: ${RUN_SCRIPT}"
    exit 1
fi

if (( $# > 0 )); then
    TARGETS=("$@")
else
    TARGETS=("${REPO_ROOT}/content")
fi

log "============ 批量任务开始 ============"
log "PID: $$"
log "Run script: ${RUN_SCRIPT}"

total=0
success=0
failed=0
failed_files=()

for target in "${TARGETS[@]}"; do
    if [[ -d "${target}" ]]; then
        log "----- 扫描目录: ${target} -----"
        while IFS= read -r -d '' yaml_file; do
            total=$((total + 1))
            log "[${total}] 执行: bash ${RUN_SCRIPT} ${yaml_file}"

            start_ts=$(date +%s)
            single_log="${LOG_DIR}/$(basename "${yaml_file}" .yaml)_$(date +%Y%m%d_%H%M%S).log"

            if bash "${RUN_SCRIPT}" "${yaml_file}" >"${single_log}" 2>&1; then
                end_ts=$(date +%s)
                log "  ✔ 成功 (耗时 $((end_ts - start_ts))s) 日志: ${single_log}"
                success=$((success + 1))
            else
                rc=$?
                end_ts=$(date +%s)
                log "  ✘ 失败 rc=${rc} (耗时 $((end_ts - start_ts))s) 日志: ${single_log}"
                failed=$((failed + 1))
                failed_files+=("${yaml_file}")
            fi
        done < <(find "${target}" -type f -name "*.yaml" -print0)
    elif [[ -f "${target}" ]]; then
        total=$((total + 1))
        log "[${total}] 执行: bash ${RUN_SCRIPT} ${target}"

        start_ts=$(date +%s)
        single_log="${LOG_DIR}/$(basename "${target}" .yaml)_$(date +%Y%m%d_%H%M%S).log"

        if bash "${RUN_SCRIPT}" "${target}" >"${single_log}" 2>&1; then
            end_ts=$(date +%s)
            log "  ✔ 成功 (耗时 $((end_ts - start_ts))s) 日志: ${single_log}"
            success=$((success + 1))
        else
            rc=$?
            end_ts=$(date +%s)
            log "  ✘ 失败 rc=${rc} (耗时 $((end_ts - start_ts))s) 日志: ${single_log}"
            failed=$((failed + 1))
            failed_files+=("${target}")
        fi
    else
        log "WARN: 路径不存在，跳过: ${target}"
    fi
done

log "============ 批量任务结束 ============"
log "总数: ${total} | 成功: ${success} | 失败: ${failed}"
if (( failed > 0 )); then
    log "失败文件列表:"
    for f in "${failed_files[@]}"; do
        log "  - ${f}"
    done
fi

exit 0
