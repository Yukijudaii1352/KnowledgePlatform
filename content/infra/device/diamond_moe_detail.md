### DIAMoND — 异构 In-NAND 与 Near-DRAM 的边缘 MoE 推理架构

```yaml
id: diamond_moe
name: DIAMoND
full_name: 异构存内MoE推理架构 (DIAMoND Heterogeneous In-Memory MoE)
year: '2026'
org: ISCA
paper_url: https://mengli.me/news/2026-03-31-isca2026/
category: llm_inference
parent: —
motivation: 异构NAND/DRAM实现边缘侧存内MoE推理
```

#### 📝 一句话总结

DIAMoND 面向边缘侧 MoE 推理，提出将高容量 In-NAND Compute 与高带宽 Near-DRAM Compute 结合的异构存内架构，用动态推理调度在有限内存、带宽和能耗预算下执行稀疏专家模型。

#### 🎯 核心要点

- 公开 ISCA 2026 日程确认论文题名为 “Dynamic Inference for Adaptive Edge MoE with Heterogeneous In-NAND and Near-DRAM Compute Architecture”，作者来自 Peking University 与 Xiaomi。
- 目标场景是边缘 MoE：专家参数规模大、每 token 只激活少量专家，但边缘设备无法像服务器 GPU 一样把所有专家常驻高带宽显存。
- 异构存储/计算划分把容量密集的专家权重放到 NAND 侧，把延迟敏感的 token 激活、门控结果、热专家或聚合计算放到 DRAM 近存侧。
- “Dynamic Inference” 的核心在于按 token 路由、专家热度和时延预算动态决定专家放置、预取、缓存和执行位置。
- In-NAND Compute 适合低复用、大容量、顺序/页粒度的专家权重计算；Near-DRAM Compute 适合高复用、低延迟、跨专家聚合和中间激活缓冲。
- 论文 PDF/项目页截至本次检索未公开，以下深入机制基于 ISCA 官方题名、作者主页新闻以及 MoE/PIM/NAND/DRAM 公开背景进行架构性解读，不把未公开细节写成已验证实验结论。

#### 🔬 深入细节

![NAND flash 单元结构示意](https://upload.wikimedia.org/wikipedia/commons/f/f5/Nand_flash_structure.svg)
*图：Wikimedia Commons 的 NAND flash 单元布线与结构示意，用于说明 DIAMoND 所依赖的 NAND 高容量、串行访问和低成本存储背景；该图不是 DIAMoND 论文原图。*

**为什么 MoE 特别适合“容量层 + 带宽层”的异构存内架构。** MoE 的 FFN 专家占据模型参数的主要部分，但每个 token 只通过 gating 选择 Top-\(k\) 个专家。对边缘设备而言，瓶颈不是单个专家 MLP 的算力，而是“专家总容量远大于 DRAM/显存容量”与“每步路由访问不规则”同时存在。把所有专家压进 DRAM 会让容量和静态功耗失控；每次从 NAND 取专家到主处理器又会被数据搬移能耗和 I/O 延迟击穿。DIAMoND 题名中的 Heterogeneous In-NAND and Near-DRAM Compute 可以理解为把专家权重留在更靠近存储阵列的位置计算，同时让 DRAM 侧承担需要低延迟复用的工作。

**一个合理的数据流是：门控先决定稀疏路径，再把不同专家分派到不同存内层级。** 对第 \(t\) 个 token，门控网络输出专家概率 \(p_{t,e}\)，选择集合 \(E_t=\mathrm{TopK}(p_t,k)\)。专家输出可以写成：

$$
y_t = \sum_{e \in E_t} p_{t,e}\,\mathrm{FFN}_e(x_t)
$$

在异构存内系统中，\(\mathrm{FFN}_e\) 不必都在同一种计算单元上执行：冷专家或大容量专家权重可留在 In-NAND 阵列侧执行低比特/分块矩阵向量乘；热专家、共享层、输出聚合和残差路径可放在 Near-DRAM 侧执行。调度器的目标不是让某一种存储最快，而是最小化端到端代价：

$$
\min \sum_{e \in E_t}\left(T_{\mathrm{compute}}(e, l_e)+T_{\mathrm{move}}(x_t,y_{t,e}, l_e)+T_{\mathrm{queue}}(l_e)\right)
$$

其中 \(l_e \in \{\mathrm{NAND}, \mathrm{DRAM}\}\) 表示专家执行层级。NAND 侧的容量成本低但访问粒度粗、写入慢；DRAM 侧延迟低但容量宝贵，所以调度需要随专家热度变化而动态调整。

```python
# DIAMoND 风格异构 MoE 推理调度伪代码
def diamond_moe_decode(token_state, expert_table, dram_cache, nand_arrays, sla):
    scores = gate(token_state)
    selected = topk(scores, k=2)

    partials = []
    for expert_id, gate_weight in selected:
        profile = expert_table[expert_id]  # hotness, size, quant_bits, location

        if dram_cache.contains(expert_id) and profile.latency_critical:
            out = near_dram_mlp(token_state, dram_cache[expert_id])
        elif should_promote_to_dram(profile, sla):
            async_prefetch(expert_id, src=nand_arrays, dst=dram_cache)
            out = near_dram_mlp(token_state, dram_cache.wait(expert_id))
        else:
            # 权重保持在 NAND 侧，token 激活广播到对应 array/page group
            out = in_nand_mvm(token_state, nand_arrays[expert_id])

        partials.append(gate_weight * out)

    return near_dram_reduce(partials)
```

**In-NAND Compute 的优势来自“权重不搬家”，但它天然不适合所有操作。** NAND 的长处是密度和非易失性，适合存放海量专家权重；如果在阵列、页缓冲或存储控制器附近完成乘加，就可以避免把冷专家权重反复搬到主内存。它的短板也明显：页/块粒度、随机访问延迟、写入/擦除代价和模拟/近数据计算精度限制，会让频繁更新的激活缓存、softmax、归一化、跨专家 reduce 等操作不适合放在 NAND 侧。因此 DIAMoND 的“异构”很关键：NAND 不是替代 DRAM，而是承担专家权重驻留和局部 MVM；DRAM 近存计算承担激活缓冲、门控调度、热专家执行和输出合并。

**Near-DRAM Compute 可以作为动态缓冲层，吸收 MoE 路由的非均匀性。** MoE gating 通常呈现长尾分布：少数专家在某些输入域持续变热，另一些专家偶发激活。若所有选中专家都落在 NAND，会出现 token 队列等待和跨阵列带宽冲突；若把全部专家提升到 DRAM，则容量不可承受。一个实用机制是维护热度 \(h_e\)、最近访问时间和预计收益，当 \(h_e\) 超过阈值或某个请求的 SLA 紧张时，把专家块或低秩/量化副本提升到 DRAM 近存层：

$$
h_e \leftarrow \alpha h_e + (1-\alpha)\,\mathbf{1}[e \in E_t]
$$

这个指数滑动热度让系统能在对话主题稳定时缓存热专家，也能在输入域切换时逐步降温，避免过度迁移。Near-DRAM 层还可以做不同 In-NAND 子结果的加权聚合，减少回到 CPU/GPU 的中间数据量。

**动态推理还需要处理“专家选择正确性”和“硬件代价”的耦合。** 纯算法 MoE 只关心 Top-\(k\) 专家概率；边缘硬件上还要考虑某个专家是否已经在 DRAM、某个 NAND die 是否拥塞、当前 token 是否处于低延迟交互路径。因而调度器可能采用硬件感知的打分：

$$
\mathrm{score}'_{t,e}=p_{t,e}-\lambda_L \hat{T}_{e}-\lambda_E \hat{E}_{e}+\lambda_H h_e
$$

这里 \(\hat{T}_e\) 和 \(\hat{E}_e\) 是选择专家 \(e\) 的预计延迟与能耗，\(h_e\) 是热度。该式表达的不是论文已公开公式，而是解释 DIAMoND 标题中 “Adaptive Edge MoE” 的必要机制：边缘端不能只按模型概率路由，还要把硬件层级状态纳入推理决策。

**与传统边缘 MoE offloading 的差别在于计算发生在存储层级内部。** CPU/GPU offloading 系统通常把专家权重在 NAND/SSD、DRAM 和 GPU 之间搬移，主要优化预取和缓存命中率；DIAMoND 的题名则暗示把 NAND 与 DRAM 都变成计算参与者。这样一来，优化目标从“何时把权重搬到算力旁边”变成“何时把 token 激活送到权重旁边、何时把热专家复制到更快层级”。在专家权重远大于激活向量的 MoE 推理中，后者通常更符合数据移动最小化原则。

> ⚠️ 注意：截至本文件生成时，可公开访问资料未提供 DIAMoND 的论文 PDF、Figure 1、实验数据或具体微架构参数；这里使用公开题名和已知系统设计约束做深度解读。若论文正式版公开，应优先用论文图、算法块和实测结果替换本段中的推导性机制。

#### 🧪 练习题

```yaml
question: "DIAMoND 这类异构 In-NAND/Near-DRAM MoE 推理架构为什么需要动态调度专家位置？"
options:
  - "因为 MoE 每个 token 都会激活所有专家"
  - "因为专家访问呈长尾且随输入变化，NAND 容量高但延迟/粒度不适合热路径，DRAM 低延迟但容量有限"
  - "因为 NAND 写入速度高于 DRAM，适合保存所有中间激活"
  - "因为门控网络不需要计算专家概率"
answer: 1
explain: "边缘 MoE 的专家总容量大且访问稀疏不均。动态调度可以让冷专家留在 NAND 侧、热专家或延迟敏感路径进入 Near-DRAM，从而在容量、延迟和能耗之间折中。"
```
