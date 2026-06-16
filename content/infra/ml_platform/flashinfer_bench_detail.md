### FlashInfer-Bench

```yaml
id: flashinfer_bench
name: FlashInfer-Bench
full_name: FlashInfer-Bench
year: '2026'
org: MLSys Community
paper_url: https://mlsys.org/Conferences/2026/Schedule?type=Poster
category: experiment_mgmt
parent: mlflow
motivation: AI驱动的LLM系统基准测试平台
```

#### 📝 一句话总结

FlashInfer-Bench 提出了面向 LLM 推理 GPU kernel 的闭环基准与生产替换流程，用 FlashInfer Trace 把任务定义、真实 workload、候选实现和评测结果统一成可复现记录，解决 AI 生成 kernel 难以进入真实推理系统的问题。

#### 🎯 核心要点

- 闭环架构：把 LLM agent/human expert 生成 kernel、基准评测、排行榜反馈和生产替换组织成同一循环
- FlashInfer Trace：用 Definition、Workload、Solution、Evaluation 四段 schema 描述 kernel 合约、输入分布、实现和不可变评测记录
- 真实 workload 数据集：从 SGLang 运行 DeepSeek-V3、Llama-3.1-8B、Qwen3-30B-A3B 等模型的 serving traces 中采集代表性 kernel 输入
- 鲁棒评测：同时处理确定性 kernel、低精度 FP8 kernel 和采样类随机 kernel，并用隔离执行抑制 reward hacking
- 连续排行榜：用 `fast_p` 曲线同时衡量正确性和相对 FlashInfer/PyTorch baseline 的加速比例
- 生产路径：`flashinfer_bench.apply()` 通过 AOT 索引和运行时 dispatcher，把最快的已验证 Solution 动态注入 SGLang/vLLM 等推理引擎

#### 🔬 深入细节

![FlashInfer-Bench architecture](https://arxiv.org/html/2601.00227v1/x1.png)
*图：FlashInfer-Bench 论文 Figure 1，来源为 arXiv HTML；图中展示 FlashInfer Trace、FlashInfer-Bench Dataset、Leaderboard、LLM Engine 和 `flashinfer_bench.apply()` 组成的闭环。*

```python
# FlashInfer-Bench 反馈式 agent 评测流程伪代码，整理自论文 Algorithm 1
def feedback_loop_agent(definition, language, hardware, max_rounds):
    accepted = []
    agent = CodeAgent.initialize(definition, language, hardware)
    solution = agent.generate()

    for i in range(max_rounds):
        trace = flashinfer_bench.benchmark(definition, solution)
        if trace.status == "PASSED":
            accepted.append((solution, trace))

        # 把编译错误、数值误差、latency、speedup 等反馈给 agent 继续改写 kernel
        solution = agent.optimize(trace)

    return max(accepted, key=lambda item: item[1].speedup).solution
```

FlashInfer-Bench 的核心问题不是“模型能否写出 CUDA/Triton 代码”，而是“候选 kernel 是否能在真实 LLM 服务流量中正确、稳定且可无缝部署”。传统 kernel benchmark 往往用手工挑选的 shape 和公开 reference 做单点测试，容易高估泛化能力；真实服务里会出现 ragged sequence、paged KV cache、FP8/BF16 混合精度、MoE routing、sampling 随机性和不同 batch/concurrency 组合。FlashInfer-Bench 因此把 workload 从生产 trace 中抽象出来，并把每个输入绑定到 Definition，让 agent 面对的是实际推理系统会触发的算子分布。

FlashInfer Trace 是这个平台的通信协议。`Definition` 给出 I/O tensor、dtype、axis 的 const/var 角色和 PyTorch reference semantics；`Workload` 给出具体 shape 与输入材料化方式；`Solution` 保存候选 kernel 源码、入口函数和兼容硬件/软件元数据；`Evaluation` 则把某个 `Definition × Solution × Workload` 的正确性、性能和运行环境快照固化为不可变记录。这样设计的好处是，agent、人类工程师、benchmark service 和 leaderboard 都围绕同一个 trace object 交换信息，不需要在自然语言说明、临时脚本和线下报告之间反复转换。

评测层首先把正确性放在性能之前。确定性 kernel 需要所有输出元素满足误差界，并拒绝 NaN/Inf；低精度 kernel 用 matched-ratio 规则，允许少量 FP8 等低精度算术造成的 outlier；随机采样 kernel 则不能逐元素对比，需要比较经验分布与目标分布的总变差距离：

$$
\mathrm{TVD}(\hat{\mathbf{f}}, \mathbf{q}) = \frac{1}{2}\sum_i |\hat{f}_i - q_i| \le \tau_{\mathrm{TVD}}
$$

这里 \(\mathbf{q}\) 是由输入概率与 top-k/top-p 等 mask 归一化得到的目标分布，\(\hat{\mathbf{f}}\) 是重复运行 kernel 后的经验分布。TVD 的直觉是直接约束任意事件上的最大概率误差；如果采样结果落在 mask 禁止的 token 上，即使总体分布看似接近也会被判失败。

性能指标采用 KernelBench 风格的 `fast_p`，把正确性和相对加速合成一个曲线：

$$
\mathrm{fast}_{p}=\frac{1}{N}\sum_{i=1}^{N}\mathbf{1}(\mathrm{correct}_{i}\land \{\mathrm{speedup}_{i}>p\})
$$

当 \(p=0\) 时它退化为通过率；当 \(p\) 增大时，它衡量在多少 workload 上既正确又超过指定倍数的 baseline。相比单个平均 latency，这个曲线更适合 agent kernel：一个候选实现可能只在部分 shape 上很快，或在少数长序列上失败；`fast_p` 会把这些局部失败直接反映到曲线面积中。

`flashinfer_bench.apply()` 解决最后一公里部署问题。离线阶段，系统按误差阈值过滤 trace，从 workload 中提取 shape/key，给每个 key 选择最快 Solution，并把最常被选中的实现 AOT 编译成执行文件；在线阶段，dispatcher 只需用当前 kernel 参数构造 key，做 \(O(1)\) 索引查找，必要时 JIT 编译剩余候选。这个机制使 serving engine 可以通过环境变量或装饰器启用替换，禁用时透明回退到原始 FlashInfer 实现，避免为了每个 agent kernel 手写集成代码。

与 MLflow/W&B 这类实验管理平台相比，FlashInfer-Bench 更接近“系统优化实验的执行层”。MLflow 主要记录模型训练参数、指标和 artifact；FlashInfer-Bench 则定义了 kernel 级任务、评测沙箱、硬件相关性能度量和 runtime dispatch。它的 MLOps 价值在于让 AI 生成的底层系统优化也具备可复现 lineage、可比较排行榜和可回滚部署路径。

> 💡 关键：FlashInfer-Bench 的贡献不是单个 kernel 优化技巧，而是把 kernel 生成、验证、评测、选择和生产替换变成同一套可自动迭代的协议。

#### 🧪 练习题

```yaml
question: "FlashInfer-Bench 的 `fast_p` 指标为什么比只报告平均 latency 更适合评测 AI 生成 kernel？"
options:
  - "它只统计编译时间，因此能避免 GPU 噪声"
  - "它同时要求 kernel 正确，并统计超过指定 baseline 加速阈值的 workload 比例"
  - "它会自动忽略失败 workload，从而突出最快样本"
  - "它只适用于训练 loss，而不适用于推理 kernel"
answer: 1
explain: "`fast_p` 对每个 workload 同时检查 correctness 和 speedup>p，能暴露局部错误或只在少数 shape 上变快的候选实现。"
```
