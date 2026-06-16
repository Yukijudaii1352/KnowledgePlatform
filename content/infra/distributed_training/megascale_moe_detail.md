### MegaScale-MoE: 超大规模 MoE 训练系统

```yaml
id: megascale_moe
name: MegaScale-MoE
full_name: 超大规模MoE (MegaScale-MoE)
year: '2026'
org: ByteDance
paper_url: https://dl.acm.org/doi/abs/10.1145/3767295.3769325
category: hybrid
parent: moe_folding
motivation: 生产级MoE训练1440GPU效率提升1.88x
```

#### 📝 一句话总结

MegaScale-MoE 是字节跳动面向生产级 MoE 训练的通信优化系统，通过 SP+EP 并行策略、算子级通信计算重叠与 BF16/FP8 通信压缩，在 1,440 张 Hopper/H800 GPU 上训练 352B MoE 模型实现 1.88x 于 Megatron-LM 的吞吐提升。

#### 🎯 核心要点

- 针对 MoE 层内部通信瓶颈重新选择并行策略：注意力用 Sequence Parallelism，专家 FFN 用 Expert Parallelism，外层仍结合 Pipeline/Data Parallelism。
- 用公式化通信量分析说明 SP attention 在 GQA 下可把关键路径通信降到 TP attention 的约四分之一。
- EP 保持专家 GEMM 完整形状，避免 TP 切分专家隐藏维带来的小矩阵低效，并按 top-\(k\) 自适应选择 all-to-all 或 all-gather/reduce-scatter。
- 通过 inter-operator 调度与 intra-operator tile 级融合，把 A2A/AG/RS 与 GEMM/GroupedGEMM 重叠，减少暴露通信时间。
- 对 DP 梯度同步使用 FP32 累积、BF16 all-to-all、FP32 汇总；FP8 训练中使用 E4M3、per-token/per-channel/group quantization 保持收敛。
- 352B 模型强扩展实验中，MegaScale-MoE 在 1,440 GPU 上达到 1.4077M tokens/s，训练 1T tokens 估计 8.22 天。

#### 🔬 深入细节

##### 核心示意图

![MegaScale-MoE 大规模 MoE 并行策略设计空间](https://ar5iv.labs.arxiv.org/html/2505.11432/assets/x4.png)
*图：arXiv HTML 版本 Figure 4，展示 MegaScale-MoE 在 MoE 层内选择 SP attention 与 EP FFN，并在层外结合 PP/DP 的设计空间。*

##### 算法伪代码

```python
# One MegaScale-MoE layer, simplified from the system design
def megascale_moe_layer(x, params, dp_group, mp_group):
    # Attention: sequence parallelism, no tensor-parallel attention on the critical path
    qkv_tiles = fused_gemm_a2a_or_a2a_gemm(
        x_sharded_by_sequence=x,
        weight=params.attn_qkv,
        group=mp_group,
    )
    attn = grouped_query_attention(qkv_tiles)
    x = fused_gemm_a2a_or_a2a_gemm(attn, params.attn_out, group=mp_group)

    # FFN / MoE: expert parallelism
    scores = router(x)
    expert_ids, gate = topk(scores, k=params.top_k)
    tokens = sort_by_expert_then_source_rank(x, expert_ids)

    # Dispatch/combine are fused with GroupedGEMM tiles
    hidden = fused_ag_scatter_grouped_gemm(tokens, params.expert_up_gate, mp_group)
    hidden = swiglu(hidden)
    out = fused_grouped_gemm_gather_rs(hidden, params.expert_down, mp_group)
    x = weighted_combine(out, gate)

    # Data-parallel gradient synchronization after accumulation
    if accumulation_done():
        grad_fp32 = main_grad_buffer()
        shard_bf16 = cast_to_bf16(grad_fp32)
        recv = all_to_all(shard_bf16, group=dp_group)
        grad_synced = fp32_sum(recv)
        write_back_in_place(grad_synced)
    return x
```

##### 方法机制解读

MegaScale-MoE 的动机来自生产训练中的通信占比。论文报告内部 Hopper 训练中，forward pass 通信可占 43.6%，全训练过程通信约占 32%。MoE 比 dense Transformer 更容易暴露通信瓶颈：模型参数更大，需要更多 model parallelism；同时稀疏专家路由还会在前向与反向各引入 token dispatch/combine 的 all-to-all。GPU 计算能力和低精度训练越强，计算时间越短，通信反而越成为主瓶颈。

第一层优化是重新匹配 MoE 子模块与并行策略。对注意力模块，传统 TP 的关键路径通信量为：

$$
V_{\mathrm{TP}}^{\mathrm{attn}} = 2bsh\frac{n-1}{n}
$$

其中 \(b\) 是 micro-batch size，\(s\) 是序列长度，\(h\) 是 hidden size，\(n\) 是层内模型并行度。MegaScale-MoE 改用 DeepSpeed-Ulysses 风格的 SP，将序列维切分；在 grouped-query attention 中，通信量变为：

$$
V_{\mathrm{SP}}^{\mathrm{attn}}
=
2bsh\frac{n-1}{n}\cdot\frac{2+2/m}{n}
$$

\(m\) 是 query heads 与 key-value heads 的比例。当 \(n=8, m=4\) 时，SP attention 的关键路径通信约为 TP attention 的 \(0.3125\)，论文按实际 Hopper/NVLink 配置给出约四分之一的通信延迟。SP 会复制注意力参数，但 MoE 中专家参数占主导，注意力参数同步和额外显存相对可控。

对 FFN/专家模块，MegaScale-MoE 使用 EP 而不是 TP。TP 会切分专家 hidden dimension，导致专家 GEMM 形状变小、算子效率下降；EP 则让每张 GPU 持有完整专家，token 按路由结果在 GPU 间搬运。理论通信量对比如下：

$$
V_{\mathrm{EP}}^{\mathrm{ffn}} = \frac{2k}{n}bsh\frac{n-1}{n},
\quad
V_{\mathrm{TP}}^{\mathrm{ffn}} = 2bsh\frac{n-1}{n}
$$

当 \(k \ll n\) 时，EP 通信量更低；当 top-\(k\) 较大时，论文进一步将传统 all-to-all dispatch 切换为 all-gather + local scatter + reduce-scatter，使 EP 通信开销不高于 TP。系统层面还实现 CUDA scatter/gather，预计算 token 行映射，避免用通用 `torch.scatter_add`/`torch.gather` 拖慢路由路径。

第二层优化是通信计算重叠。Inter-operator overlap 通过统一的 MoE layer macro 调度，把无依赖通信放到不同 CUDA stream 中与计算或 activation recomputation 重叠。更关键的是 intra-operator overlap：对于有直接依赖的通信和计算，系统把通信拆成 tile，在 device memory 中放 barrier，实现 A2A+GEMM、GEMM+A2A、AG+scatter+GroupedGEMM、GroupedGEMM+gather+RS 等融合 kernel。

![MegaScale-MoE tile 级通信计算重叠](https://ar5iv.labs.arxiv.org/html/2505.11432/assets/x10.png)
*图：arXiv HTML 版本 Figure 10，展示 A2A/AG/RS 与 GEMM/GroupedGEMM 在 tile 级别重叠的执行模式。*

在 A2A+GEMM 中，本地 tile 的 GEMM 与远端 tile 的通信同时启动，GPU copy engine 负责搬运数据，SM 继续做计算；远端 tile 到达后写 device barrier，GEMM kernel 再消费该 tile。对 MoE GroupedGEMM 更难，因为 token 需要按 expert 与 source rank shuffle。MegaScale-MoE 先按 routed expert 排序，再在每个 expert 内按 source rank 排序，让一个计算 tile 依赖尽可能少的 rank，从而减少等待并避免重复加载专家权重。

第三层优化是通信压缩，但它不直接把训练精度降到底，而是调整通信模式来控制数值风险。BF16 mixed-precision 下，本地梯度累积仍保留 FP32；累积完成后只在通信前 cast 到 BF16，用 all-to-all 收集梯度分片，然后在接收端做 FP32 summation：

$$
g_{\mathrm{local}}^{\mathrm{FP32}}=\sum_{\mu=1}^{M}\nabla_\theta L_\mu,\quad
g_{\mathrm{wire}}^{\mathrm{BF16}}=\mathrm{cast}_{\mathrm{BF16}}(g_{\mathrm{local}}^{\mathrm{FP32}})
$$

$$
g_r^{\mathrm{FP32}}=
\sum_{q\in\mathrm{DP}}
\mathrm{cast}_{\mathrm{FP32}}\left(\mathrm{A2A}(g_{\mathrm{wire}}^{\mathrm{BF16}})_{q,r}\right)
$$

这样相比 FP32 reduce-scatter 减少 50% 梯度通信，同时避免 ring reduce 中 BF16 反复累加。FP8 训练则采用 E4M3 格式，并对前向通信使用 per-token activation quantization，对反向通信使用 per-channel quantization，再沿 token 维做 group quantization，减少 overflow/underflow 引起的 loss mismatch。

> 💡 关键：MegaScale-MoE 不是单点 MoE kernel 优化，而是把“并行策略选择、重叠调度、通信精度”放在同一个通信预算里联合设计。

##### 结果与工程意义

论文在 352B MoE 模型上做强扩展对比：1,440 GPU 时 Megatron-LM 迭代 7.90s、746.6k tokens/s，MegaScale-MoE 迭代 4.19s、1,407.7k tokens/s，对应 1.88x 加速。消融显示 SP+EP 带来 13% normalized throughput 提升，inter-operator overlap 再加 9%，intra-operator overlap 再加 6%。这些收益的共同点是减少暴露通信时间，而不是只提高某一个 GEMM 的峰值 FLOPS。

#### 🧪 练习题

```yaml
question: "MegaScale-MoE 为什么在注意力模块选择 SP 而不是传统 TP？"
options:
  - "SP 沿序列维切分，在 GQA 下显著降低关键路径通信，且 MoE 中注意力参数冗余相对可控"
  - "SP 会把所有专家参数复制到每张 GPU，从而完全消除 token dispatch"
  - "TP 无法运行 FlashAttention，因此必须被完全禁用"
  - "SP 只用于推理，不参与训练中的梯度同步"
answer: 0
explain: "论文的通信量公式显示 SP attention 在 grouped-query attention 下可显著降低通信；注意力参数在 MoE 总参数中占比较小，因此复制成本可接受。"
```
