### GLaM（通才语言模型 MoE，Generalist Language Model）

```yaml
id: glam
name: GLaM
full_name: 通才语言模型 MoE (Generalist Language Model)
year: "2021.12"
org: Google Research
paper_url: https://arxiv.org/abs/2112.06905
category: sparse_moe
parent: switch_transformer
motivation: 稀疏激活降低训练推理成本
```

#### 📝 一句话总结
GLaM 提出了一种稀疏激活的 Mixture-of-Experts (MoE) 架构语言模型，在总参数量达到 1.2T（是 GPT-3 的 7 倍）的同时，每个 token 仅激活 97B 参数（约 8%），训练能耗仅为 GPT-3 的 1/3、推理 FLOPs 减半，并在 29 个 NLP 任务上全面超越 GPT-3。

#### 🎯 核心要点
- 提出 GLaM 模型家族，采用稀疏激活 MoE 架构替代传统 Dense Transformer，在每两层 Transformer 中将一层的前馈网络替换为 MoE 层
- 最大版本 GLaM(64B/64E) 总参数 1.2T，包含 64 个专家，每个 token 通过可学习的门控网络激活其中 Top-2 专家（激活参数仅 96.6B）
- 训练能耗仅 456 MWh（GPT-3 为 1287 MWh），推理时每 token FLOPs 为 180G（GPT-3 为 350G），实现显著的计算效率提升
- 引入高质量数据过滤管线：训练基于文本质量分类器的网页过滤，结合 Wikipedia、书籍、论坛、新闻等多源数据并加权混合
- 在 zero/one/few-shot 设定下，于 29 个公开 NLP 基准（含 NLU 和 NLG）上平均性能超越 GPT-3（175B）
- 架构改进：用相对位置偏置替代绝对位置编码，在非 MoE 前馈层中用 Gated Linear Unit（GLU）+ GeLU 替代标准 FFN
- 采用 2D Sharding（GSPMD）进行大规模权重和计算的分区，支持超大规模模型的分布式训练

#### 🔬 深入细节

##### 1. 动机与背景

传统大语言模型（如 GPT-3）通过堆叠更多参数提升性能，但 Dense 模型面临两个核心挑战：**训练能耗巨大**（GPT-3 达 1287 MWh）且**推理计算成本高昂**（每个 token 激活全部参数）。MoE 架构的直觉来源于条件计算——不同输入 token 应由网络中不同的"专家"子网络来处理，而非每次激活所有参数。GLaM 由此提出："用更多总参数扩大模型容量，但每次推理只激活一小部分专家"，以此在容量和效率之间取得平衡。

##### 2. 核心架构设计

![GLaM MoE 层架构示意图](https://arxiv.org/html/2112.06905v2/extracted/3820123/figs/jax_moe.png)
*图：GLaM 的 MoE 层结构。在每隔一层的 Transformer 中，标准 FFN 被替换为包含 E 个专家的 MoE 层；门控网络（Gating）为每个 token 选出 Top-2 专家，输出为其加权组合。*

GLaM 基于 Decoder-only Transformer，核心修改包括：

**(a) 稀疏 MoE 层（Sparsely Activated MoE）**
- 替换标准 Transformer 中每隔一层的 FFN 为一个 **MoE 层**，该层包含 E 个独立的前馈网络（专家）。
- 每个 token 输入到一个 **可学习的门控网络** G(x)，通过 softmax 输出一个概率分布 p = softmax(G(x))。
- 门控网络选择概率最高的 **Top-2 专家**，最终输出为两个被选中专家输出的加权组合：
  y = p1 · Expert1(x) + p2 · Expert2(x)
- 该设计提供了 O(E²) 种可能的 FFN 组合路径，赋予模型极大的计算灵活性。选择 Top-2 而非 Top-1（如 Switch Transformer）是经验权衡：更多专家增加 FLOPs，但 2 个专家在性能与效率间取得最佳平衡。

**(b) 非 MoE 层的改进**
- 将标准 FFN 中的 ReLU 替换为 **Gated Linear Unit (GLU)** + **GeLU**：计算输入的两个线性变换的逐元素乘积（W1x ⊙ W2x），再通过 GeLU 激活。这提升了非 MoE 层的表示能力。
- 用 **相对位置偏置**（per-layer relative positional bias, Dai et al. 2019）替代绝对位置编码，使模型更好地处理不同长度的序列。

**(c) 模型变体与规模**

| 模型 | 类型 | 总参数 | 激活参数 | 层数 L | 隐藏维度 H | 头数 | 专家 E |
|------|------|--------|----------|--------|------------|------|--------|
| 0.1B | Dense | 130M | 130M | 12 | 768 | 12 | - |
| 0.1B/64E | MoE | 1.9B | 145M | 12 | 768 | 12 | 64 |
| 1.7B | Dense | 1.7B | 1.7B | 24 | 2048 | 16 | - |
| 8B | Dense | 8.7B | 8.7B | 32 | 4096 | 32 | - |
| 137B | Dense | 137B | 137B | 64 | 8192 | 128 | - |
| **64B/64E** | **MoE** | **1.2T** | **96.6B** | **64** | **8192** | **128** | **64** |

##### 3. 训练设置

**(a) 数据管线**
- GLaM 构建了一个 **1.6 万亿 token** 的高质量训练语料库，数据来源包括：
  - 经过 text-quality classifier 过滤的网页数据（143B tokens，过滤前 ~7T tokens）
  - Wikipedia、书籍、论坛、新闻等
  - 公开社交媒体对话数据（Adiwardana et al., 2020）
- 各数据源的混合权重通过在小模型上的性能实验确定，同时防止 Wikipedia 等小数据集被过采样。
- 实验证明，**数据过滤对性能提升至关重要**：对比过滤与非过滤数据训练的 1.7B/64E 模型，过滤后 NLG 和 NLU 性能均有显著提升。

**(b) 优化配置**
- 优化器：Adafactor
- 学习率调度：逆平方根衰减（inverse square root schedule），warmup 阶段
- 使用 2D Sharding（GSPMD, Xu et al. 2021）对大规模模型的权重和计算进行分区，支持在 TPU v4 集群上训练 1.2T 参数模型
- 训练最大模型消耗 456 MWh，仅为 GPT-3 的 35.4%

##### 4. 实验结果概要

- **与 GPT-3 对比**：GLaM(64B/64E) 在 29 个 NLP 任务上 zero-shot 平均 62.7 vs 56.9 (+10.2%)，one-shot 65.5 vs 61.6 (+6.3%)，few-shot 68.1 vs 65.2 (+4.4%)。
- **开放域问答**：TriviaQA one-shot 达 75.0%（远超 GPT-3 few-shot 71.2% 和微调 SOTA 69.8%），展示出模型容量对知识吸收的关键作用。
- **数据质量消融**：过滤数据 vs 未过滤数据 → NLG/NLU 全面提升，验证了数据质量对 MoE 模型同样至关重要。
- **缩放趋势**：随着总参数/激活参数的增大，MoE 模型性能持续优于同等 FLOPs 的 Dense 模型，表明稀疏激活是高效的缩放范式。

> 💡 关键：GLaM 证明了稀疏 MoE 可以在不牺牲性能的前提下，将训练和推理成本降低至 Dense 同性能级别模型的 1/2~1/3。其"大总参数 + 小激活参数"的范式，为此后的 PaLM、Gemini 等模型提供了重要参考。
> ⚠️ 注意：MoE 模型的专家负载均衡和通信开销是工程上的关键挑战。GLaM 使用 Top-2 门控 + 辅助负载均衡损失（auxiliary load balancing loss）来确保专家利用率均匀，避免部分专家"饿死"。

##### 5. 伪代码：MoE 层核心逻辑

```python
# GLaM MoE 层前向传播（简化为核心逻辑）
def moe_layer_forward(x, experts, gate):
    # x: (batch, seq_len, d_model)
    # gate: 可学习的门控网络
    # experts: list of E 个 FFN 模块

    # Step 1: 计算门控分布
    logits = gate(x)                      # (batch*seq_len, E)
    probs = softmax(logits, dim=-1)       # 每个专家被选中的概率

    # Step 2: 选择 Top-2 专家
    top2_probs, top2_indices = topk(probs, k=2)

    # Step 3: 归一化 Top-2 概率
    top2_probs = top2_probs / top2_probs.sum(dim=-1, keepdim=True)

    # Step 4: 每个 token 仅通过其选中的 2 个专家前向
    output = zeros_like(x)
    for i, (idx1, idx2) in enumerate(top2_indices):
        out1 = experts[idx1](x[i])
        out2 = experts[idx2](x[i])
        output[i] = top2_probs[i][0] * out1 + top2_probs[i][1] * out2

    return output
```

#### 🧪 练习题

```yaml
question: "GLaM(64B/64E) 模型总参数量为 1.2T，但每个 token 仅激活约 96.6B 参数（约 8%）。实现这一点的核心技术是？"
options:
  - "模型蒸馏，将大模型压缩为小模型进行推理"
  - "稀疏激活 MoE 架构，通过门控网络为每个 token 动态选择 Top-2 专家"
  - "参数共享，不同层之间复用相同的权重矩阵"
  - "量化压缩，将 1.2T 参数量化为 96.6B 的 8-bit 表示"
answer: 1
explain: "GLaM 的核心创新在于稀疏激活的 Mixture-of-Experts 架构：每个 token 只经过门控网络选择的 Top-2 专家计算，而非激活全部 64 个专家，从而实现总容量大但计算量小的效果。"
```
