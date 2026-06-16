### AutoKernel：自主 GPU Kernel 迭代优化智能体

```yaml
id: autokernel
name: AutoKernel
full_name: 自主GPU Kernel迭代优化智能体 (AutoKernel)
year: '2026'
org: Community
paper_url: https://arxiv.org/abs/2603.21331
category: llm_driven
parent: triton
motivation: Agent闭环迭代优化GPU Kernel性能
```

#### 📝 一句话总结

AutoKernel 把 GPU kernel 性能工程抽象成“profile → extract → agent edit → correctness-gated benchmark → keep/revert”的自主实验循环，用模型级 profiling 和 Amdahl 定律决定优化顺序，解决 LLM 一次性生成 kernel 不稳定、人工调参成本高的问题。

#### 🎯 核心要点

- **模型级入口**：从任意 PyTorch 模型出发，用 `torch.profiler` 捕获 GPU kernel 时间，而不是孤立优化单个手写题目
- **Amdahl 定律排序**：按 kernel 的端到端占比 \(f\) 与候选加速比 \(s\) 估算总收益，优先优化真正影响模型吞吐的瓶颈
- **双后端实现**：每类 kernel 同时提供 Triton 与 CUDA C++ starter，兼顾快速迭代和底层 tensor core/warp 原语控制
- **单文件 agent 循环**：agent 只修改 `kernel.py`，每次提交候选后由 benchmark 决定 keep 或 revert，保证实验历史线性、可回滚
- **五阶段正确性门禁**：smoke test、shape sweep、数值稳定性、确定性、edge cases 全部通过后才记录性能
- **六层优化 playbook**：block size、memory access、compute、advanced、architecture-specific、kernel-specific 技巧逐层推进
- **Roofline 反馈**：benchmark 报告 TFLOPS/GB/s 与峰值利用率，指导 agent 区分 compute-bound 与 memory-bound 优化
- **多 kernel 编排**：连续失败、接近硬件峰值、时间耗尽或达到 2× 加速时转向下一个 kernel，避免在局部瓶颈上过度搜索
- **KernelBench 集成**：覆盖 250 个标准化问题，并将 one-shot LLM 生成扩展为 50-300+ 次迭代 refinement

#### 🔬 深入细节

![AutoKernel 项目进度图](https://raw.githubusercontent.com/rightnow-ai/autokernel/main/progress.png)
*图：AutoKernel 官方项目中的实验进度可视化。论文 Figure 1 的核心流程是 PyTorch Model → Profiler → Extractor → Agent edits `kernel.py` → 5-Stage Benchmark → Orchestrator → End-to-End Verifier；arXiv HTML 将该流程图以内嵌 SVG/TikZ 呈现，项目图展示同一迭代式实验轨迹。*

```python
# AutoKernel 单 kernel 优化循环与多 kernel 编排伪代码
def autokernel_compile(model, target_backend):
    profile = torch_profile(model, warmup=5, active=10, record_shapes=True)
    kernels = classify_and_rank_by_amdahl(profile)  # matmul, softmax, rmsnorm, ...

    for kernel_spec in kernels:
        kernel_py = extract_starter_kernel(model, kernel_spec, backend=target_backend)
        best_kernel = kernel_py
        best_throughput = benchmark_5_stage(best_kernel).throughput
        consecutive_reverts = 0

        while True:
            roofline = analyze_roofline(best_kernel, kernel_spec.hardware)
            candidate = agent_edit(best_kernel, history=load_tsv(), roofline=roofline)
            git_commit(candidate)

            result = benchmark_5_stage(candidate)
            if result.pass_all and result.throughput > 1.01 * best_throughput:
                best_kernel = candidate
                best_throughput = result.throughput
                consecutive_reverts = 0
                decision = "keep"
            else:
                git_reset_previous_commit()
                consecutive_reverts += 1
                decision = "revert"

            log_tsv(kernel_spec.name, result, decision)
            if should_move_on(consecutive_reverts, best_throughput, roofline, elapsed_time()):
                break

        plug_kernel_back_into_model(best_kernel)

    return verify_end_to_end_correctness_and_speedup(model)
```

**动机：LLM 能写 kernel，但一次性生成不等于可部署性能工程。** KernelBench 等工作证明 frontier LLM 可以生成部分 GPU kernel，但 one-shot 方案常见问题是边界条件错、dtype/shape 泛化差、速度偶然、不知道该优化哪个 kernel。AutoKernel 的关键判断是：真实模型里的收益不是“某个题目快多少”，而是“占总 GPU 时间的瓶颈快多少”。因此它先做模型级 profiling，再把热点算子抽成独立 kernel 文件，让 agent 在固定评测器里长期迭代。

**Amdahl 编排把搜索预算投到端到端收益最大的地方。** 论文中的多 kernel scheduler 使用：

$$
S_{\text{end-to-end}}=\frac{1}{(1-f)+f/s}
$$

其中 \(f\) 是某个 kernel 占总 GPU 时间的比例，\(s\) 是该 kernel 自身加速比。直觉上，一个占 60% 时间的 matmul 提升 1.5×，端到端可达约 1.25×；一个占 5% 时间的算子即使提升 3×，端到端也只有约 1.03×。这让 AutoKernel 不会平均用力，而是把 overnight run 的 300-400 次实验集中到真正决定模型吞吐的 kernel 上。

**Agent 循环的设计重点是“可证伪”，不是复杂多 agent 协商。** 每轮 agent 基于历史 TSV、roofline 结果和 playbook 修改单个 `kernel.py`，benchmark 通过后才比较吞吐；只有 `pass_all` 且吞吐超过当前最佳 1% 以上才 keep，否则立即 revert。这个 1.01 阈值过滤计时噪声，单文件约束则保证候选变更可隔离。论文报告每轮约 90 秒：约 30 秒正确性检查、30 秒性能测量、30 秒 agent 思考和改代码，因此系统能以约 40 experiments/hour 的速度形成有效搜索轨迹。

**五阶段正确性门禁专门针对 LLM kernel 的常见失败模式。** Smoke test 捕获编译和明显 shape 错误；shape sweep 覆盖 8-10 个尺寸和 FP16/BF16/FP32；stability 用 overflow/underflow 等 adversarial inputs 检查数值稳定性；determinism 要求多次运行 bitwise 一致；edge cases 覆盖 1023、4097 等非 2 次幂尺寸。只有全部通过后才进入性能统计，这相当于把“快但错”的候选从搜索空间里硬删除。

**Roofline 反馈把自然语言优化建议落到硬件瓶颈。** 对候选 kernel，benchmark 会计算算术强度 \(I=\text{FLOPs}/\text{Bytes}\)，并用近似 roofline：

$$
P_{\text{attainable}}=\min(P_{\text{peak}}, I \cdot B_{\text{mem}})
$$

判断当前更像 compute-bound 还是 memory-bound。若 RMSNorm 这类 kernel 受内存带宽限制，agent 应优先尝试 coalesced loads、vectorized load/store、减少中间写回和融合 epilogue；若 matmul 受 tensor core 利用率限制，则优先调整 tile shape、`num_warps`、pipeline stages、split-K、persistent kernel 或 CUDA WMMA/MMA 路径。

**与传统 auto-tuning 的差异在于搜索对象是完整程序变体。** TVM/AutoTVM 通常在预定义 schedule 参数空间里搜索，AutoKernel 则让 LLM 直接编辑 Triton/CUDA 源码，搜索空间包含循环结构、边界处理、数据布局、精度累加、kernel fusion 和硬件专用路径。代价是正确性风险更大，所以论文把固定 benchmark、五阶段测试、git keep/revert 和 TSV 记录作为系统核心，而不是把 LLM 当成无约束代码生成器。

> 💡 关键：AutoKernel 的贡献不是某个单独 kernel 技巧，而是把专家 kernel 工程的实验闭环产品化：模型级定位瓶颈、正确性先行、硬件反馈驱动、失败自动回滚、收益按端到端影响排序。

#### 🧪 练习题

```yaml
question: "AutoKernel 用 Amdahl 定律排序 kernel 的主要目的是什么？"
options:
  - "让所有 kernel 获得完全相同的优化时间"
  - "优先优化对端到端模型吞吐贡献最大的瓶颈 kernel"
  - "避免运行任何正确性测试"
  - "只选择 CUDA C++ 后端而不使用 Triton"
answer: 1
explain: "Amdahl 定律把 kernel 自身加速比和其总耗时占比结合起来，能估算端到端收益，避免把大量实验预算浪费在低占比算子上。"
```
