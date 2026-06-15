### MoE Parallel Folding: MoE并行折叠

```yaml
id: moe_folding
name: MoE Parallel Folding
full_name: MoE并行折叠 (MoE Parallel Folding)
year: '2025'
org: NVIDIA
paper_url: https://arxiv.org/abs/2504.14960
category: hybrid
parent: switch_transformer
motivation: 异构并行映射专家-数据混合折叠
```

#### 📝 一句话总结

MoE Parallel Folding 在 Megatron Core 中解耦 Attention 层和 MoE 层的并行映射，让两类层分别采用最合适的 TP/EP/CP/DP/PP 组合，解决大规模 MoE 训练中单一并行配置无法同时兼顾 dense attention 与 sparse expert 的问题。

#### 🎯 核心要点

- 提出五维混合并行：Tensor、Expert、Context、Data、Pipeline parallelism 同时参与大规模 MoE 训练。
- 核心思想是“folding”：Attention 和 MoE 层使用不同并行维度映射，但在 Transformer block 边界协调张量布局。
- Flexible token-level dispatcher 支持 token dropping 和 dropless MoE，并处理跨五维并行的动态 token shape。
- 支持长上下文 MoE：CP 与 EP/TP/DP 协同，使序列长度可扩展到 128K token。
- 在 H100 上报告 Mixtral 8x22B 最高 49.3% MFU、Qwen2-57B-A14B 最高 39.0% MFU，并扩展到 1024 GPU。

#### 🔬 深入细节

##### 核心示意图

![MoE Parallel Folding 映射示意](https://ar5iv.labs.arxiv.org/html/2504.14960/assets/images/MoE_Parallel_Folding-mapping-switch.png)
*图：MoE Parallel Folding 展示 Attention 和 MoE 层采用不同并行映射，并在层边界进行布局切换。*

##### 算法伪代码

```python
# MoE Parallel Folding in a Transformer block
def folded_moe_block(x, attn_plan, moe_plan):
    # Attention prefers TP/CP for dense matmul and long sequence
    x_attn = layout_transform(x, attn_plan.input_layout)
    h = attention(x_attn, tp=attn_plan.tp, cp=attn_plan.cp)
    h = layout_transform(h, moe_plan.input_layout)

    # MoE prefers EP/DP with token dispatcher
    route = router(h)
    packed = token_dispatch(h, route, ep=moe_plan.ep, dp=moe_plan.dp)
    expert_out = expert_ffn(packed, tp=moe_plan.expert_tp)
    y = token_combine(expert_out, route)

    return layout_transform(y, attn_plan.output_layout)
```

##### 方法解释

MoE Transformer block 里有两类性质完全不同的计算。Attention 是 dense 的，所有 token 都经过同一套投影和 attention kernel，适合 TP/CP 来切 hidden、head 或 sequence；MoE FFN 是 sparse 的，token 被 router 分发到专家，适合 EP 来切专家、DP 来扩 batch。若强制两类层使用同一个并行映射，要么 attention 通信过重，要么专家负载和 all-to-all 低效。

MoE Parallel Folding 的核心是允许并行维度在层内“折叠/展开”。Attention 子层可以选择 \(TP_a, CP_a, DP_a\)，MoE 子层可以选择 \(TP_e, EP_e, DP_e\)，二者在 block 边界通过 layout transform 对齐。这个 transform 是系统代价的一部分，但相比全层被迫使用次优并行，整体更优。

Token dispatcher 是关键工程组件。MoE 路由会产生动态 token-to-expert 映射，dropless 训练还要求不能简单丢弃超容量 token。dispatcher 需要在 TP/EP/CP/DP/PP 同时存在时维护 token 原始位置、专家位置、容量和反向梯度路由，确保：

$$
\mathrm{combine}(\mathrm{experts}(\mathrm{dispatch}(x))) \equiv \mathrm{MoE}(x)
$$

> 💡 关键：Folding 的目标不是减少并行维度，而是让每种层“看见”对自己最自然的并行空间，再用受控布局转换把它们拼回一个训练图。

长上下文场景进一步放大这个价值。Attention 的 \(S^2\) 或长序列激活压力需要 CP；MoE 的专家参数和 all-to-all 需要 EP。传统映射若把 CP/EP 绑定，会限制可扩展性。Folding 让 CP 主要服务 attention，EP 主要服务 expert，在 Mixtral/Qwen MoE 上获得更高 MFU。

##### 与 Switch/DeepSpeed-MoE 的区别

Switch 关注 Top-1 路由简化，DeepSpeed-MoE 关注端到端 MoE 训练推理系统；MoE Parallel Folding 更关注现代 Megatron Core 中多维并行的映射问题。它面向已有 MoE 架构，在不改变模型数学的前提下调整并行拓扑，使 attention 和 expert 两个子系统都接近硬件最优。

#### 🧪 练习题

```yaml
question: "MoE Parallel Folding 为什么要解耦 Attention 和 MoE 层的并行配置？"
options:
  - "两类层的计算/通信瓶颈不同，统一并行映射通常无法同时最优"
  - "Attention 层不需要任何并行"
  - "MoE 层必须复制所有专家到每张 GPU"
  - "解耦会改变模型输出"
answer: 0
explain: "Attention 更依赖 TP/CP，MoE 更依赖 EP/DP 和 token dispatcher，分开映射能减少次优通信。"
```
