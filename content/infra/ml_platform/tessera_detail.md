### Tessera

```yaml
id: tessera
name: Tessera
full_name: Tessera
year: "2026"
org: OSDI Community
paper_url: https://www.usenix.org/conference/osdi26/technical-sessions
category: training_platform
parent: megascale
motivation: 整体流水线并行框架，解决万亿参数MoE训练
```

#### 📝 一句话总结

Tessera 面向万亿参数异构 MoE 训练提出整体流水线并行框架，协同优化 pipeline 切分、专家并行、数据并行和通信重叠，缓解 MoE 训练中的负载不均与 all-to-all 瓶颈。

#### 🎯 核心要点

- 针对 trillion-parameter heterogeneous MoE 训练，重点处理专家规模、设备异构和 token 路由不均
- 整体考虑 pipeline stage、expert placement、micro-batch schedule 和跨 stage 通信
- 通过负载感知分区与调度减少慢 stage 和热门专家导致的 bubble
- 尝试隐藏 expert parallel all-to-all、pipeline send/recv 与计算之间的延迟
- OSDI 2026 技术会议信息显示其定位为 operational systems paper

#### 🔬 深入细节

> 图示说明：公开会议信息尚无稳定论文图直链；可将框架理解为 MoE Transformer 被切为多个 pipeline stage，每个 stage 内再放置专家组，调度器同时决定 micro-batch 流水、token 路由和 all-to-all 重叠。

```python
# Tessera 风格 MoE 流水线调度伪代码
profile = measure_layers_experts(devices, model)
plan = solve_partition(
    pipeline_stages=True,
    expert_placement=True,
    device_heterogeneity=True,
    objective='minimize_bubble_and_all_to_all'
)
for microbatch in stream:
    for stage in plan.pipeline_order:
        tokens = route_to_experts(microbatch, stage.experts)
        overlap(all_to_all(tokens), dense_compute(stage))
        run_experts_and_combine(tokens)
        send_to_next_stage(microbatch)
```

MoE 训练不同于 dense Transformer：每个 token 只激活部分专家，但 token 到专家的路由分布可能极不均匀，导致某些专家设备过载；同时 expert parallel 需要大量 all-to-all 通信。

流水线并行本身也有 bubble 和 stage 平衡问题。若 MoE 专家层、稠密层和不同性能 GPU 混在一起，只按层数平均切分会让慢 stage 决定全局节拍。

Tessera 的“holistic”含义是把 pipeline 切分、专家放置、micro-batch schedule 和通信重叠放在同一优化问题里，而不是先定 pipeline 再局部修补专家并行。

与 GPipe/PipeDream 主要面向 dense 模型不同，Tessera 的挑战来自稀疏激活和异构专家负载。它更接近生产 MoE 训练系统，目标是在万亿参数规模保持稳定吞吐。

> 💡 关键：这类 ML 平台论文的贡献通常不在单个数学公式，而在把计算、状态、通信、调度和故障边界重新组织成可扩展的系统抽象。

#### 🧪 练习题

```yaml
question: "Tessera 相比普通流水线并行额外要重点处理什么？"
options:
  - "MoE 专家路由负载和 all-to-all 通信"
  - "图像文件压缩"
  - "浏览器渲染"
  - "单机 CPU 排序"
answer: 0
explain: "MoE 的专家并行和 token 路由会带来负载不均与 all-to-all 瓶颈。"
```
