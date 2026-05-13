#!/bin/bash
# batch_run.sh - 批量扫描指定目录下的 yaml 文件并执行 run.sh

# ============== 配置区 ==============
# 在这里指定要扫描的多个目录的绝对路径
# DIRS=(
#     "/group/40048/zcharowang/Agent/KnowledgePipeline/knowlege_tmp/cv"
#     "/group/40048/zcharowang/Agent/KnowledgePipeline/knowlege_tmp/llm"
#     "/group/40048/zcharowang/Agent/KnowledgePipeline/knowlege_tmp/mm"
#     "/group/40048/zcharowang/Agent/KnowledgePipeline/knowlege_tmp/aigc"
# )

DIRS=(
    "/group/40048/zcharowang/Agent/KnowledgePipeline/knowlege_tmp/infra"
    "/group/40048/zcharowang/Agent/KnowledgePipeline/knowlege_tmp/embodied"
    "/group/40048/zcharowang/Agent/KnowledgePipeline/knowlege_tmp/ai4sci"
)


# run.sh 的绝对路径（按需修改）
RUN_SCRIPT="/group/40048/zcharowang/Agent/KnowledgePipeline/knowlege_tmp/run.sh"

# 日志目录
LOG_DIR="/group/40048/zcharowang/Agent/KnowledgePipeline/knowlege_tmp/"
mkdir -p "$LOG_DIR"

# 主日志文件
MAIN_LOG="$LOG_DIR/batch_run_$(date +%Y%m%d_%H%M%S).log"
# ====================================

log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*" | tee -a "$MAIN_LOG"
}

log "============ 批量任务开始 ============"
log "PID: $$"

# 检查 run.sh
if [[ ! -f "$RUN_SCRIPT" ]]; then
    log "ERROR: run.sh 不存在: $RUN_SCRIPT"
    exit 1
fi

total=0
success=0
failed=0
failed_files=()

for dir in "${DIRS[@]}"; do
    if [[ ! -d "$dir" ]]; then
        log "WARN: 目录不存在，跳过: $dir"
        continue
    fi

    log "----- 扫描目录: $dir -----"

    # 用 find 递归查找 .yaml 文件，使用 -print0 安全处理空格/特殊字符
    while IFS= read -r -d '' yaml_file; do
        total=$((total + 1))
        log "[$total] 执行: sh $RUN_SCRIPT $yaml_file"

        start_ts=$(date +%s)
        # 单个文件的独立日志（可选，便于排查）
        single_log="$LOG_DIR/$(basename "$yaml_file" .yaml)_$(date +%Y%m%d_%H%M%S).log"

        if sh "$RUN_SCRIPT" "$yaml_file" >"$single_log" 2>&1; then
            end_ts=$(date +%s)
            log "  ✔ 成功 (耗时 $((end_ts - start_ts))s) 日志: $single_log"
            success=$((success + 1))
        else
            rc=$?
            end_ts=$(date +%s)
            log "  ✘ 失败 rc=$rc (耗时 $((end_ts - start_ts))s) 日志: $single_log"
            failed=$((failed + 1))
            failed_files+=("$yaml_file")
        fi
    done < <(find "$dir" -type f -name "*.yaml" -print0)
done

log "============ 批量任务结束 ============"
log "总数: $total | 成功: $success | 失败: $failed"
if (( failed > 0 )); then
    log "失败文件列表:"
    for f in "${failed_files[@]}"; do
        log "  - $f"
    done
fi

exit 0