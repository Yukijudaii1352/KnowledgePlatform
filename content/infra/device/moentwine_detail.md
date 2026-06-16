### MoEntwine

```yaml
id: moentwine
name: MoEntwine
full_name: 晶圆级MoE专家并行推理 (MoEntwine Wafer-Scale Expert Parallel Inference)
year: '2026'
org: HPCA
paper_url: https://ieeexplore.ieee.org/abstract/document/11408594/
category: llm_inference
parent: cerebras_wse
motivation: 释放晶圆级芯片超大规模MoE并行推理潜力
```

#### 📝 一句话总结

MoEntwine 面向晶圆级芯片上的 MoE 专家并行推理，提出 Entwined Ring Mapping 和 Non-Invasive Balancer，用拓扑感知映射压缩 all-to-all 通信域，并利用 attention 与 MoE 阶段互补的冷热链路隐藏专家迁移开销。

#### 🎯 核心要点

- 目标平台是 wafer-scale chip：大量 compute die 通过晶圆级 interposer 形成 2D mesh，带宽高、能耗低，但多跳路径会产生中心拥塞
- 目标模型是 DeepSeek-V3/V2、Qwen3、DBRX、Mixtral 等 MoE LLM，专家并行通过减少每设备专家数缓解 decode 阶段权重访问压力
- 核心瓶颈一是 MoE all-to-all：token dispatch/combine 在 mesh 上跨多跳传输，通信压力远高于 attention all-reduce
- 核心瓶颈二是专家迁移：WSC 缺少片上磁盘，动态 load balancing 需要通过已经繁忙的 mesh 复制专家权重
- ER-Mapping 引入 Full Token Domain，把 TP 组交错编织，使 all-to-all 限制在紧凑且不相交的 FTD 内，代价是 all-reduce 走 entwined ring
- HER-Mapping 将多晶圆系统中的 all-reduce 拆成 intra-WSC reduce-scatter 和 inter-WSC all-gather，降低跨晶圆长路径开销
- NI-Balancer 将完整专家迁移拆成 Local Migration 和 Global Migration，分别塞进 all-reduce 与 all-to-all 阶段的冷链路窗口
- 评估基于 ASTRA-sim 2.0 和 B200 等效 WSC die，ER-Mapping 最高降低 62% 通信延迟，NI-Balancer 最高降低 54% MoE 计算延迟，整体相比 NVL72 平均提升 39% 每设备 MoE 性能

#### 🔬 深入细节

##### 核心示意图

![MoEntwine 系统动机与 WSC 架构](https://arxiv.org/html/2510.25258v1/x1.png)
*图 1：MoE 延迟拆解以及 DGX、NVL72、WSC 架构对比。图片来自 arXiv HTML 版本：https://arxiv.org/html/2510.25258v1。*

##### 算法伪代码

```python
# MoEntwine: ER-Mapping + NI-Balancer 的推理执行抽象
def moentwine_infer(requests, moe_model, wsc_mesh):
    mapping = build_entwined_ring_mapping(
        mesh=wsc_mesh,
        tp=moe_model.attention_tp,
        ep=moe_model.expert_parallelism,
    )
    ftds = mapping.full_token_domains
    expert_replicas = initialize_shadow_slots(moe_model.experts, ftds)

    for layer in moe_model.layers:
        # Attention: all-reduce 使用 entwined ring，FTD 内链路相对空闲。
        attn_out = run_attention(layer, requests, mapping.tp_groups)
        schedule_local_migrations(expert_replicas, cold_links="intra_ftd")
        attn_out = entwined_ring_all_reduce(attn_out, mapping.tp_groups)

        # MoE: all-to-all 限制在不相交 FTD 内，FTD 间链路相对空闲。
        token_plan = route_tokens_to_experts(attn_out, expert_replicas)
        schedule_global_migrations(expert_replicas, cold_links="inter_ftd")
        expert_out = ftd_local_all_to_all_and_compute(token_plan, ftds)

        requests = combine_expert_outputs(expert_out)

        if imbalance_accumulates(layer):
            expert_replicas = topology_aware_rebalance(
                historical_load=profile_expert_loads(),
                replicas=expert_replicas,
                mesh=wsc_mesh,
            )

    return requests
```

##### 方法机制解读

MoEntwine 的起点是 MoE 推理中的专家并行。MoE 层对每个 token 只激活 top-k 个专家，计算量降低，但专家权重体量巨大。专家并行把不同专家分布到不同设备上，使每个设备只存一部分专家；理想状态是专家数 \(E\) 和设备数 \(D\) 接近，\(E/D \approx 1\)，这样 decode 时每设备权重访问压力最低。然而专家并行带来两次 all-to-all：dispatch 把 token 送到专家所在设备，combine 把专家输出送回原设备。论文把层时延抽象为：

$$
T_{\text{MoE}} \approx
\max(T_{\text{compute}}, T_{\text{all-to-all}})
$$

在 DGX/NVL72 里，高速网络覆盖的设备数有限；在 WSC 里，晶圆级网络可覆盖更多设备，理论上更适合大规模 EP。但 WSC 常见 2D mesh 不是全互连，远距离 all-to-all 需要多跳转发，中心链路会被大量 token 流量挤占。

![Full Token Domain 与 ER-Mapping](https://arxiv.org/html/2510.25258v1/x8.png)
*图 8：Full Token Domain 定义、baseline mapping 与 ER-Mapping 的 FTD 分布，以及 entwined ring all-reduce。*

ER-Mapping 的关键概念是 Full Token Domain，即一个设备为了执行 MoE all-to-all 所需 token 的最小来源域。传统 TP 组映射把同一 TP 组放在 mesh 的连续区域或角落，导致不同 FTD 在中心区域相交，all-to-all 的路径既长又重叠。ER-Mapping 反过来把不同 TP 组交错放置，使每个 FTD 更紧凑且互不相交。通信代价可用 hop-weighted latency 表示：

$$
T_{\text{comm}} =
\sum_{(s,d)}
\operatorname{hops}(s,d)
\left(
\frac{\operatorname{bytes}_{s,d}}{BW_{\text{link}}}
+ L_{\text{link}}
\right)
$$

ER-Mapping 牺牲的是 attention all-reduce：逻辑 ring 上相邻设备在物理 mesh 中可能相隔多跳，因此 all-reduce 更慢。但 MoE all-to-all 的数据量和关键路径压力远大于 all-reduce，减少 FTD 面积和交叉通常更划算。论文还保留 all-gather，使 token 来源选择更多，后续 all-to-all 的路径更短。

![ER-Mapping 算法与 Hierarchical ER-Mapping](https://arxiv.org/html/2510.25258v1/x10.png)
*图 10：ER-Mapping 算法、多种映射示例和多 WSC 的 Hierarchical ER-Mapping。*

多晶圆时，单纯把 entwined ring 扩到所有 wafer 会让 all-reduce 经过过长路径。HER-Mapping 将其拆成两个层次：先在每个 WSC 内做 reduce-scatter，把 token 聚成局部 FTD；再跨 WSC 做 all-gather，使每片晶圆都拿到需要的 token 分片。这样后续 MoE all-to-all 仍可限制在单个 WSC 的 FTD 内。其直觉类似层次化 collective：

$$
T_{\text{HER}} \approx T_{\text{intra-WSC reduce-scatter}}
+ T_{\text{inter-WSC all-gather}}
$$

相比跨所有设备的一条长 ring，这个分解把高频通信留在更短的局部 mesh 内，把跨晶圆通信变成更少、更规则的聚合步骤。

![冷热链路互补与 NI-Balancer](https://arxiv.org/html/2510.25258v1/x11.png)
*图 11：attention all-reduce 与 MoE all-to-all 的 traffic heatmap、专家迁移拆分和独立 migration stream。*

NI-Balancer 解决动态负载均衡。MoE gating 在推理时仍会让热门专家收到更多 token，导致某些设备计算时间远高于平均值。训练时的 auxiliary balancing loss 不能保证在线请求分布稳定，因此系统需要复制热门专家到空闲 shadow slot。问题是 WSC 没有每设备本地磁盘，专家复制只能走 mesh，如果迁移暴露在关键路径上，会抵消负载均衡收益。MoEntwine 的观察是 ER-Mapping 后两类通信的冷链路互补：attention all-reduce 主要占用 FTD 连接区域，FTD 内部相对空闲；MoE all-to-all 被限制在 FTD 内部，FTD 之间相对空闲。于是完整迁移被拆成：

$$
M(e, a \rightarrow b) =
M_{\text{local}}(a \rightarrow a')
+ M_{\text{global}}(a' \rightarrow b')
+ M_{\text{local}}(b' \rightarrow b)
$$

Local Migration 在 all-reduce 阶段使用 FTD 内冷链路，Global Migration 在 all-to-all 阶段使用 FTD 间冷链路。计算、通信、迁移分别放到独立 stream 中，只要迁移片段的时延不超过对应阶段的可隐藏窗口，就不会增加端到端时延。

![运行时专家负载轨迹](https://arxiv.org/html/2510.25258v1/x15.png)
*图 15：专家负载运行轨迹。无均衡时峰值负载约为平均的 2 倍；侵入式均衡会产生中断；非侵入式均衡消除中断。*

拓扑感知 balancing 的目标不是让所有专家 token 完全均匀，而是降低最大设备负载。设专家 \(e\) 的历史平均负载为 \(l_e\)，当前有 \(r_e\) 个副本，则每个副本承担的负载近似为 \(l_e/r_e\)。设备 \(d\) 的负载为：

$$
H_d = \sum_{e \in \operatorname{experts}(d)} \frac{l_e}{r_e}
$$

算法每次选择负载最高设备上的最热门专家作为源，在不会超过当前最大负载且有 shadow slot 的设备中，选择拓扑距离最近的目标。这样既能降低 \(\max_d H_d\)，又能减少迁移距离，给 NI-Balancer 更大机会把迁移塞进冷链路窗口。论文报告 topology-aware balancing 可将迁移开销平均降低 2.6×，而 non-invasive 版本进一步把迁移开销完全隐藏。

![ER-Mapping 通信评估](https://arxiv.org/html/2510.25258v1/x13.png)
*图 13：WSC 相对 DGX 的通信改进、ER-Mapping 在不同模型上的表现、规模/并行度影响和 HER-Mapping。*

评估显示，WSC 的统一高速网络天然比多节点 DGX 更适合大 EP，纯 WSC 已可平均降低通信延迟；ER-Mapping 进一步降低 all-to-all 路径和拥塞，收益随激活专家数增加而增强。DeepSeek-V3、Qwen3 这类激活专家更多的模型 all-to-all 占比高，因此收益更明显；Mixtral 只激活 2 个专家，all-to-all 相对小，naive ER-Mapping 可能不总是获益。HER-Mapping 对多 WSC 配置更稳定，最高可获得 62% 通信改进。

![端到端对比 NVL72](https://arxiv.org/html/2510.25258v1/x17.png)
*图 17：多 WSC cluster 与 NVL72 supernode 的端到端性能对比。*

端到端消融以 NVL72 为强基线。NVL72 的 72 设备 scale-up 网络已经显著优于传统多节点 DGX，但 \(E/D\) 仍较高，多个专家会共享一个设备，decode 时内存访问主导。WSC 可扩到 EP=256，理论上实现接近单专家每设备，但原始 mesh 的 all-to-all 和负载不均衡会破坏这个优势。MoEntwine 先用 ER/HER-Mapping 消除通信瓶颈，再用 NI-Balancer 消除迁移瓶颈，最终获得平均 39% 更高的每设备 MoE 性能。

> 💡 关键：MoEntwine 不是单独优化 collective 或 load balancing，而是把 attention all-reduce、MoE all-to-all 和专家迁移放在同一个 mesh 时间/空间调度问题里处理。

#### 🧪 练习题

```yaml
question: "MoEntwine 的 ER-Mapping 为什么愿意让 attention all-reduce 走更长的 entwined ring？"
options:
  - "因为 all-reduce 在 MoE 推理中通常不是主要瓶颈，换取更紧凑且不相交的 FTD 可大幅降低 all-to-all 拥塞"
  - "因为 WSC mesh 无法执行 all-reduce"
  - "因为 ER-Mapping 会删除 MoE gating 网络"
  - "因为专家迁移必须在 CPU 上完成"
answer: 0
explain: "MoE 推理的关键瓶颈是 token dispatch/combine 的 all-to-all。ER-Mapping 用较小的 all-reduce 代价换取 all-to-all 通信域缩小和路径去拥塞，因此总时延下降。"
```
