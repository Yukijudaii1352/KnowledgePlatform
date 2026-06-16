### MiniMax-Text-01：闪电注意力基础模型 (MiniMax-01)

```yaml
id: minimax01
name: MiniMax-Text-01
full_name: 闪电注意力基础模型 (MiniMax-01)
year: "2025.01"
org: MiniMax
paper_url: https://arxiv.org/abs/2501.08313
category: long_context
parent: mixtral
motivation: Lightning Attention扩长上下文
```

#### 📝 一句话总结

MiniMax-Text-01 提出了 Lightning Attention、周期性 softmax attention 与 MoE 结合的混合长上下文基础模型，解决纯 softmax Transformer 在百万级上下文上计算和显存成本过高的问题。它将训练上下文扩展到 1M tokens，并在推理时外推到 4M tokens，同时保持接近顶级闭源模型的通用能力。

#### 🎯 核心要点

- MiniMax-01 系列包含 MiniMax-Text-01 与 MiniMax-VL-01，本条目聚焦 Text-01 的长上下文基础模型设计
- 混合注意力结构采用每 7 个 Lightning Attention/TransNormer block 后接 1 个 softmax attention block 的节奏，总计 80 层
- MoE 结构包含 32 个专家、top-2 routing、global router 负载均衡，模型总参数 456B，每 token 激活 45.9B 参数
- Lightning Attention 将因果注意力拆成块内 left-product 与块间 right-product，避免线性注意力在 causal LM 中低效的全局 cumsum
- 长上下文系统优化包含 LASP+、varlen ring attention、data packing、MoE 的 EP/ETP overlap，以及专门的 Lightning Attention 推理 kernel
- 训练流程包含长上下文三阶段扩展、RoPE 频率与数据分布调度，Text-01 训练到 1M tokens，推理扩展到 4M tokens
- MiniMax-VL-01 在 Text-01 之上接入 303M ViT、两层 MLP projector，并继续训练 512B vision-language tokens

#### 🔬 深入细节

![MiniMax-Text-01 4M Needle-in-a-Haystack 长上下文压力图](https://github.com/MiniMax-AI/MiniMax-01/raw/main/figures/niah.png)
*图：MiniMax 官方仓库给出的 4M Needle-in-a-Haystack 压力测试图，用于展示 MiniMax-Text-01 在超长上下文检索场景中的稳定性。*

```python
# Lightning Attention forward pass, simplified from the paper
# Q, K, V: [n, d], B: block size, causal mask M: [B, B]
def lightning_attention_forward(Q, K, V, B):
    blocks = split_into_blocks(Q, K, V, block_size=B)
    KV = zeros((d, d))
    outputs = []

    for Q_t, K_t, V_t in blocks:
        # Intra-block: exact causal attention inside the current block
        O_intra = ((Q_t @ K_t.T) * causal_mask(B)) @ V_t

        # Inter-block: summarize all previous blocks by a recurrent KV state
        O_inter = Q_t @ KV

        # Update prefix state for future blocks
        KV = KV + K_t.T @ V_t
        outputs.append(O_intra + O_inter)

    return concat(outputs, axis=0)
```

MiniMax-Text-01 的核心动机是把上下文长度从常见的 32K 到 256K 推到百万级。标准 softmax attention 的训练和推理成本随序列长度呈二次增长，长上下文场景中 prefill latency 与显存占用都会迅速失控。论文选择 Lightning Attention 作为主体，不是简单替换成任意线性注意力，而是采用 I/O-aware 的分块计算来解决 causal LM 中 `cumsum` 难以并行的问题。

线性注意力的基本改写是把

$$
\mathbf O = \mathrm{Norm}\left((\mathbf Q\mathbf K^\top)\mathbf V\right)
$$

改成右乘形式：

$$
\mathbf O = \mathrm{Norm}\left(\mathbf Q(\mathbf K^\top\mathbf V)\right)
$$

这样可以维护一个递归状态 \(\mathbf{kv}_t\)：

$$
\mathbf{kv}_0=\mathbf 0,\quad
\mathbf{kv}_t=\mathbf{kv}_{t-1}+\mathbf k_t\mathbf v_t^\top,\quad
\mathbf o_t^\top=\mathbf q_t^\top\mathbf{kv}_t.
$$

直接递归虽然是线性复杂度，但不适合 GPU 并行。Lightning Attention 把序列切成块，对当前块内部仍计算因果 masked left-product，对历史块使用 \(\mathbf K^\top\mathbf V\) 的前缀摘要。最终复杂度写作 \(O(nd^2+nBd)\)，其中 \(n\) 是序列长度，\(d\) 是特征维度，\(B\) 是 block size。当 \(B\ll n\) 时，它避免了完整 \(n\times n\) 注意力矩阵。

> 💡 关键：MiniMax 并没有彻底抛弃 softmax attention。论文发现纯线性注意力在检索类任务上会有短板，因此采用 7 个 Lightning Attention block 加 1 个 softmax attention block 的混合结构。Lightning 层负责把长上下文成本压下来，周期性 softmax 层负责保留精确 token-to-token 检索能力。

MoE 部分的作用是把模型容量做大，同时控制每个 token 的实际计算量。对输入 token \(\mathbf x_t\)，MoE 输出可写为：

$$
\mathbf h_t=\sum_{i=1}^{E}\mathrm{Softmax}_i\left(\mathrm{TopK}(\mathbf x_t\mathbf W_g)\right)\cdot \mathrm{FFN}_i(\mathbf x_t).
$$

这里 \(E=32\)，MiniMax-Text-01 使用 top-2 routing。大规模 MoE 容易出现 routing collapse 或 expert imbalance，论文在 GShard 辅助损失之外增加 global router：先跨 EP group 同步各 expert 待处理 token 数，再做 dispatch，从而降低 token drop rate 并稳定训练。

系统层面的贡献同样关键。softmax 层使用 varlen ring attention 处理 data packing 后的变长样本，减少百万级上下文中的 padding 浪费。Lightning 层使用 LASP+，让每个 context-parallel rank 先计算本地 \(KV_L\)，再通过 AllGather 得到全局前缀 \(KV_G\)，从而去掉原始 LASP 的串行 send-recv 依赖。MoE 侧通过 EP、ETP 与通信计算 overlap 降低 all-to-all 成本，推理侧则针对 Lightning Attention 实现 batched kernel fusion、prefill/decoding 分离、多级 padding 与 strided batched matmul。

与传统 dense Transformer 相比，MiniMax-Text-01 的创新不只是把注意力从二次复杂度变成线性复杂度，而是在“线性注意力的吞吐优势、softmax 的检索能力、MoE 的容量扩展、分布式系统的通信隐藏”之间做工程化配平。这个配平解释了为什么它能在 456B 总参数、45.9B 激活参数规模下支持 1M 训练上下文和 4M 推理上下文，而不是只在小模型或离线实验中展示长序列可行性。

#### 🧪 练习题

```yaml
question: "MiniMax-Text-01 为什么要每 7 个 Lightning Attention block 后插入 1 个 softmax attention block？"
options:
  - "为了让所有 attention 层都变成二次复杂度"
  - "为了在保持长上下文效率的同时补足线性注意力的检索能力"
  - "为了减少 MoE 专家的总数量"
  - "为了避免使用 RoPE 位置编码"
answer: 1
explain: "Lightning Attention 提供近线性的长上下文效率，但纯线性注意力在精确检索上存在短板；周期性 softmax attention 保留强 token 交互能力。"
```
