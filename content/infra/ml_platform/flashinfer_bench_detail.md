### FlashInfer-Bench

```yaml
id: flashinfer_bench
name: FlashInfer-Bench
full_name: FlashInfer-Bench
year: "2026"
org: MLSys Community
paper_url: https://mlsys.org/Conferences/2026/Schedule?type=Poster
category: experiment_mgmt
parent: mlflow
motivation: AI驱动的LLM系统基准测试平台
```

#### 📝 一句话总结

FlashInfer-Bench 面向 AI 生成 GPU kernel 的 LLM 系统基准平台，通过标准 trace、算子任务和评测 harness，把 kernel 生成、正确性验证和性能比较闭环化。

#### 🎯 核心要点

- 作为 MLSys 2026 FlashInfer AI Kernel Generation Contest 的官方评测框架
- 覆盖 LLM 推理关键 kernel，如 attention、GEMM 变体、状态空间/门控结构等任务
- 使用标准 trace schema 和数据集，使不同 agent 或人工 kernel 在同一输入分布下比较
- 评测同时关注正确性、性能、稳定性和对 NVIDIA Blackwell 等硬件的适配
- starter kit 提供 baseline agent、提交格式和本地/远程 benchmark 流程

#### 🔬 深入细节

> 图示说明：官方 starter kit 展示的框架可概括为：任务 trace/dataset 输入，agent 生成 Triton/CUDA kernel，harness 编译运行并校验数值正确性与性能，结果回写排行榜/报告。

```python
# FlashInfer-Bench 评测流程伪代码
for task in benchmark_suite:
    spec = load_trace_schema(task)
    candidate_kernel = agent.generate_kernel(spec)
    build = compile_kernel(candidate_kernel, target_gpu='Blackwell')
    if not numerical_check(build, spec.reference_outputs):
        mark_failed(task)
        continue
    latency = benchmark(build, spec.inputs, warmup=10, repeat=100)
    score = aggregate(latency, correctness=True, stability=True)
submit(score, candidate_kernel)
```

AI agent 写 GPU kernel 的难点不是只生成一段能编译的代码，而是要在真实 LLM workload 上稳定、正确、可比较地变快。没有统一 benchmark 时，不同方法容易挑选不同 shape 或不同参考实现，结果不可比。

FlashInfer-Bench 将任务输入、shape 分布、参考输出和评测流程标准化。参赛者或 agent 面对同一组 kernel 任务，生成实现后由 harness 自动编译、运行、校验和计时。

正确性与性能同等重要。LLM kernel 常有低精度、mask、变长序列、KV cache layout 等边界条件，评测系统必须先保证输出误差在容忍范围内，再统计 latency/throughput。

它与 vLLM/KServe 这类服务系统不同，关注的是底层 kernel 生成与评测闭环；但高质量 kernel 最终会反馈到推理系统吞吐、延迟和成本。

> 💡 关键：这类 ML 平台论文的贡献通常不在单个数学公式，而在把计算、状态、通信、调度和故障边界重新组织成可扩展的系统抽象。

#### 🧪 练习题

```yaml
question: "FlashInfer-Bench 的核心作用是什么？"
options:
  - "统一评测 AI/人工生成的 LLM GPU kernel 的正确性和性能"
  - "管理训练数据版本"
  - "提供聊天机器人前端"
  - "替代 Kubernetes"
answer: 0
explain: "它提供任务、trace、参考结果和 benchmark harness，使 kernel 优化可复现可比较。"
```
