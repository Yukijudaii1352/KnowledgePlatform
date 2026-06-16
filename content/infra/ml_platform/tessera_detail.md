### Tessera

```yaml
id: tessera
name: Tessera
full_name: Tessera
year: '2026'
org: OSDI Community
paper_url: https://www.usenix.org/conference/osdi26/technical-sessions
category: training_platform
parent: megascale
motivation: 整体流水线并行框架，解决万亿参数MoE训练
```

#### 📝 一句话总结

Tessera 面向万亿参数异构 MoE 训练提出整体流水线并行框架，将 pipeline partition、expert/data parallel placement、microbatch overlap 和 backward 调度放在同一优化空间中，缓解 MoE 训练里 stage 不均衡、专家路由倾斜和 all-to-all 通信相互放大的问题。

#### 🎯 核心要点

- 官方 OSDI 2026 条目将 Tessera 放在 “LLM Training at Scale” track，题名明确指向 trillion-parameter heterogeneous MoE training
- 核心对象是异构 MoE：dense attention/shared layer、routed experts、shared experts、router 和不同专家规模共同造成非均匀 stage cost
- 整体优化 pipeline parallelism：不是先静态切层再局部调专家，而是联合决定 stage boundary、expert placement、microbatch schedule 和通信重叠
- 需要处理 MoE 的 token routing skew：每个 microbatch 激活的专家和 token 数不同，导致 expert compute 与 all-to-all 时间随批次变化
- 通过动态 backward scheduling 消化异构 stage 的 readiness 差异，减少固定 1F1B 在慢专家或慢 stage 上形成的 pipeline bubble
- 与 Megascale/Megatron 类生产训练栈互补：后者提供 3D/4D 并行基础，Tessera 关注 MoE pipeline 层面的全局排布和调度
- 公开页面暂未释放 Tessera PDF/论文图；以下机制解读基于官方题名、USENIX 会议信息及公开 MoE/PP/EP 系统资料，涉及推断处已明确说明

#### 🔬 深入细节

![PP + EP + DP 组合参考图](https://arxiv.org/html/2606.11169v1/x1.png)
*图：公开参考图来自 Piper 论文 Figure 1，展示 MoE Transformer 中 PP across layers、expert parallelism 和 data parallelism 的组合。该图不是 Tessera 原图；由于 OSDI 页面当前未公开 Tessera 论文图，这里用它说明 Tessera 所面对的 PP/EP/DP 组合训练形态。*

```python
# Tessera-style holistic MoE pipeline scheduling, reconstructed from public title/context.
def tessera_plan(model, cluster, routing_trace):
    # 1. Profile heterogeneous costs instead of assuming every Transformer layer is equal.
    layer_cost = profile_dense_attention_and_shared_layers(model, cluster)
    expert_cost = profile_experts(model.experts, cluster)
    comm_cost = measure_links(cluster, ops=["pp_send_recv", "ep_all_to_all", "dp_all_reduce"])

    # 2. Estimate per-stage time under candidate partition + placement.
    candidates = enumerate_stage_boundaries(model.layers)
    candidates = attach_expert_placements(candidates, model.experts, cluster)
    best = None
    for plan in candidates:
        for mb in routing_trace:
            token_hist = estimate_tokens_per_expert(mb, model.router)
            stage_time = simulate_pipeline(
                plan=plan,
                token_hist=token_hist,
                layer_cost=layer_cost,
                expert_cost=expert_cost,
                comm_cost=comm_cost,
                overlap=True,
            )
        best = argmin_objective(best, plan, objective="iteration_time + memory_penalty")

    # 3. Runtime scheduling: issue ready microbatches/backward tasks to hide all-to-all.
    ready = initialize_microbatch_queue(best)
    while ready:
        task = pick_ready_task(ready, policy="minimize_bubble_and_a2a_wait")
        overlap(task.compute, task.pp_send_recv, task.ep_all_to_all)
        update_ready_queue(task)
    return best
```

MoE 训练和 dense Transformer 的根本差异在于“每层代价不是固定的”。Dense 层的计算量主要由 batch、sequence、hidden size 决定；MoE 层还要经过 router，把 token 分配给 top-\(k\) 专家。对第 \(s\) 个 pipeline stage 和第 \(m\) 个 microbatch，可以把 stage 时间粗略写成：

$$
T_s(m)=T^{\text{dense}}_s(m)+T^{\text{route}}_s(m)+T^{\text{a2a}}_s(m)+\max_{e \in E_s}T^{\text{expert}}_{s,e}(n_{m,e})+T^{\text{pp}}_s(m)
$$

其中 \(n_{m,e}\) 是 microbatch \(m\) 路由到专家 \(e\) 的 token 数。这个式子解释了为什么 Tessera 需要“holistic”：即使层数平均，热门专家也会让某个 stage 变慢；即使专家放置均衡，all-to-all 也可能和 pipeline send/recv、data-parallel all-reduce 争抢网络；即使单个 stage 最优，固定 1F1B 顺序也可能在 backward 阶段等待慢 stage。

普通 pipeline parallelism 常用 bubble 近似分析：

$$
\text{bubble} \approx \frac{P-1}{M+P-1}
$$

其中 \(P\) 是 pipeline stage 数，\(M\) 是 microbatch 数。这个公式隐含每个 stage 时间相近；异构 MoE 下更现实的迭代时间接近：

$$
T_{\text{iter}} \approx T_{\text{warmup}} + M \cdot \max_s \mathbb{E}_m[T_s(m)] + T_{\text{drain}} + T_{\text{contention}}
$$

Tessera 要优化的不是单纯增加 \(M\)，而是降低 \(\max_s T_s\) 和 \(T_{\text{contention}}\)。这意味着 stage boundary 不能只按层数切，expert placement 不能只按专家个数均分，microbatch order 也不能只套固定表格。

从题名和相关公开系统材料看，Tessera 的关键机制应是把 PP partitioning 与 microbatch overlap schedule 联合搜索或联合求解。对 heterogeneous MoE，分区器需要知道哪些 dense 层重、哪些 expert 层重、哪些专家经常被一起激活，以及设备拓扑里哪些 GPU/节点之间 all-to-all 代价低。然后调度器在 runtime 让 forward、backward、expert all-to-all 和 pipeline p2p 尽量错峰：当某个 backward 已经 ready 且能填补慢 stage 的空档时，优先发射它，而不是严格按静态 1F1B 队列等待。

动态 backward scheduling 的直觉是“ready 不等于立即执行，未 ready 也不应阻塞全局”。MoE backward 同样包含 expert gradient、router gradient、dense gradient 和跨设备通信；如果把所有 backward 绑定到固定 microbatch 顺序，热门专家造成的单点延迟会沿 pipeline 传播。Tessera 这类 holistic 框架更可能把训练 step 表示为带依赖的 DAG：节点是 dense compute、expert compute、all-to-all、send/recv、all-reduce；边表示 activation/gradient 依赖；调度目标是在显存预算内最小化 makespan。

与 Megascale/Megatron 的关系可以理解为“基础并行能力”和“MoE pipeline 全局调度”的分层。Megascale/Megatron 提供 TP、PP、DP、EP、ZeRO/FSDP、checkpoint 等执行原语；Tessera 关注如何在万亿参数异构 MoE 中组合这些原语。对于 dense 模型，PP stage balance 主要看层 FLOPs 和 activation size；对于 Tessera 的目标场景，还必须把 token histogram、expert hotness、all-to-all 拓扑、shared expert 和 backward readiness 一起考虑。

公开信息的限制也需要明确：截至本次写入，USENIX 页面公开了标题、作者、track 和 Operational Systems Paper 类别，但没有稳定 PDF、abstract 或原始 figure URL。因此，上述伪代码和公式是基于标题所指问题、OSDI 条目以及公开 MoE pipeline 系统论文的机制化重构，不应当等同于 Tessera 论文中的正式算法块。后续若 USENIX 放出 PDF，应优先用原论文 Figure/Algorithm 替换参考图和推断性描述。

> 💡 关键：Tessera 的价值不在“又一种 pipeline schedule 名字”，而在把 MoE 的路由不均、专家放置、stage 切分、forward/backward 顺序和通信争用作为一个整体系统问题处理。

#### 🧪 练习题

```yaml
question: "Tessera 面向异构 MoE 训练时，为什么不能只按 Transformer 层数平均切 pipeline stage？"
options:
  - "因为 MoE 的专家路由、all-to-all 通信和专家计算会让不同 microbatch/stage 的实际耗时高度不均"
  - "因为 pipeline parallelism 只能用于 CNN，不能用于 Transformer"
  - "因为平均切层会自动消除所有通信"
  - "因为 MoE 不需要 backward pass"
answer: 0
explain: "异构 MoE 的 stage 时间取决于 dense 层、专家放置、token 路由倾斜和通信争用；按层数平均不能保证吞吐瓶颈被均衡。"
```
