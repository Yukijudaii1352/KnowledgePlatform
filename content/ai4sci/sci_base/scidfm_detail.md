### SciDFM: 面向科学的混合专家大语言模型

```yaml
---
tags: [AI4Science, MoE, LLM, 科学推理, 分子理解]
authors: [Liangtai Sun, Danyu Luo, Da Ma, Zihan Zhao, Baocai Chen, Zhennan Shen, Su Zhu, Lu Chen, Xin Chen, Kai Yu]
affiliations: [上海交通大学 X-LANCE实验室, 苏州实验室, AI Speech Co.]
pub_date: 2024-09-27
arxiv_id: "2409.18412"
---
```

## 📝 一句话总结

SciDFM 是一个基于 **Mixture-of-Experts (MoE)** 架构的科学大语言模型（总参数 18.2B，激活 5.6B），通过在科学文献与通用语料上联合预训练，并设计专用分词器处理分子与氨基酸序列，在多个科学基准上达到同规模模型 SOTA，且 MoE 专家选择呈现出与学科关联性一致的聚类现象。

---

## 🎯 核心要点

| 维度 | 内容 |
|------|------|
| **解决的问题** | 现有科学 LLM 要么局限于单一领域（如化学、生物），要么缺乏对分子/蛋白质等非文本模态的理解能力，难以同时覆盖多学科科学推理 |
| **关键创新** | ① MoE 架构实现多学科知识的高效建模（8 专家 top-2 路由）；② 专用分词器将化学原子和氨基酸字符作为独立 token；③ 科学+通用数据联合预训练策略 |
| **主要结果** | 在 SciEval、SciQ 等通用科学基准上超越 Galactica-30B 和同规模模型；在 MoleculeNet 分子属性预测和 Mol-Instructions 分子生成任务上达到 SOTA |
| **局限性** | 仅 5.6B 激活参数，在数学推理（GSM8K/MATH）上不及 Llama3-8B-Instruct；分子/蛋白质理解仍为文本级别，未引入 3D 结构信息 |

---

## 🔬 深入细节

### 1. 整体架构

SciDFM 基于 Transformer 解码器架构，融合了 LLaMA 的改进（RMSNorm、RoPE、SwiGLU），并将前馈网络（FFN）替换为 **Mixture-of-Experts 层**。

**架构示意图：**

![SciDFM Architecture](https://ar5iv.labs.arxiv.org/html/2409.18412/assets/x1.png)

> *图：SciDFM 的 MoE 架构示意。每个 Transformer 层中的 FFN 被替换为包含 8 个专家的 MoE 层，通过 top-2 门控路由选择 2 个专家进行计算。*

**核心架构参数：**

| 参数 | 值 |
|------|------|
| 总参数量 | 18.2B |
| 激活参数量 | 5.6B |
| 隐藏维度 | 3200 |
| 层数 | 26 |
| 注意力头数 | 25 |
| 专家数量 | 8 |
| 激活专家数 (top-k) | 2 |
| 上下文长度 | 8192 |
| 词表大小 | 32000 + 特殊科学 token |

### 2. 专用分词器设计

SciDFM 基于 OpenLLaMa-3B 的 BPE 分词器，额外添加了**化学原子**和**氨基酸字符**作为独立 token，并用特殊标识符包裹：

```
# 分子 SMILES 编码示例
原始: C(C(=O)O)N
编码: [C] [(] [C] [(] [=] [O] [)] [O] [)] [N]

# 氨基酸序列编码示例  
原始: MKTL...
编码: [M] [K] [T] [L] ...
```

这种设计使模型能够**区分科学符号与普通文本字符**，避免子词分词对分子结构的破坏。

### 3. MoE 门控机制

MoE 层的核心是 **top-2 门控路由**，其工作流程如下：

$$G(x) = \text{TopK}(\text{Softmax}(x \cdot W_g), k=2)$$

其中 \(W_g \in \mathbb{R}^{d \times e}\) 是门控网络权重，\(d=3200\) 为隐藏维度，\(e=8\) 为专家数。

**伪代码：**

```python
def moe_forward(hidden_states, gate_weight, experts, k=2):
    """MoE层前向传播"""
    # Step 1: 计算门控分数
    gate_logits = hidden_states @ gate_weight  # [batch, seq_len, num_experts]
    gate_probs = softmax(gate_logits, dim=-1)
    
    # Step 2: 选择 top-k 专家
    top_k_probs, top_k_indices = topk(gate_probs, k=k)  # 选择概率最高的2个专家
    top_k_probs = top_k_probs / top_k_probs.sum(dim=-1, keepdim=True)  # 归一化
    
    # Step 3: 加权组合专家输出
    output = zeros_like(hidden_states)
    for i in range(k):
        expert_idx = top_k_indices[:, :, i]
        expert_output = experts[expert_idx](hidden_states)
        output += top_k_probs[:, :, i:i+1] * expert_output
    
    return output
```

**为什么用 MoE？** 科学领域涵盖数学、物理、化学、生物等差异巨大的子领域，MoE 允许不同专家"专精"不同领域的知识，同时保持计算效率（仅激活 5.6B/18.2B ≈ 31% 的参数）。

### 4. 训练数据与策略

**预训练数据（~570B tokens）：**

| 数据类别 | 来源 | 规模 |
|----------|------|------|
| 科学论文 | S2ORC (Semantic Scholar) | ~300B tokens |
| 数学 | MathPile, proof-pile-2 | 包含在科学数据中 |
| 代码 | The Stack | 包含在通用数据中 |
| 通用文本 | SlimPajama (RedPajama子集) | ~270B tokens |
| 分子数据 | PubChem, UniProt | 特殊格式处理 |

**指令微调数据（9.3M 样本）：**

| 类别 | 数据集 | 样本数 |
|------|--------|--------|
| 通用对话 | Dolly, SlimOrca, GPT4All | ~1.2M |
| 数学推理 | MetaMath, Orca-Math, MAmmoTH | ~1.5M |
| 科学问答 | SciEval, SciQ, ARC 训练集 | ~2M |
| 分子任务 | Mol-Instructions | ~4.6M |

**训练超参数：**
- 优化器：AdamW（\(\beta_1=0.9, \beta_2=0.95\)）
- 学习率：\(2 \times 10^{-4}\)（预训练），\(2 \times 10^{-5}\)（指令微调）
- 预训练轮数：2 epochs
- 负载均衡损失权重：0.01

### 5. 专家选择分析（关键发现）

论文对 MoE 层的专家选择模式进行了 t-SNE 可视化分析，这是本文最独特的贡献之一。

**分析方法：**

对于每个文本 \(T\)，计算各层的专家选择概率分布：

$$e_i = \text{Softmax}\left(\sum_{j=1}^{l} g_i[j,:]\right) \in \mathbb{R}^e$$

$$E_T = \text{Concat}([e_1, e_2, \dots, e_N]) \in \mathbb{R}^{Ne}$$

其中 \(g_i = h_i \cdot W_g\) 是第 \(i\) 层的门控输出，\(N=26\) 为层数，\(e=8\) 为专家数，最终每个文本得到一个 \(26 \times 8 = 208\) 维的专家选择向量。

![Expert Analysis t-SNE](https://ar5iv.labs.arxiv.org/html/2409.18412/assets/x2.png)

> *图：不同学科数据的专家选择 t-SNE 可视化。数学与物理聚类接近，化学与生物聚类接近，分子和蛋白质序列与文本数据明显分离。*

**关键发现：**
1. **学科聚类**：数学、化学、物理、生物论文呈现明显的学科特异性聚类
2. **学科亲缘性**：数学↔物理 聚类接近，化学↔生物 聚类接近，符合学科间的知识关联
3. **模态分离**：分子 SMILES 和氨基酸序列与文本数据完全分离，因为它们使用了独特的词汇表

### 6. 实验结果亮点

**通用科学基准（零样本）：**

| 模型 | SciEval | SciQ | ARC | GSM8K | MATH | 平均 |
|------|---------|------|-----|-------|------|------|
| Galactica-6.7B | 46.6 | 75.5 | 67.2 | 6.4 | 2.2 | 39.6 |
| Galactica-30B | 48.0 | 85.2 | 78.9 | 10.1 | 3.4 | 45.1 |
| Llama3-8B-Instruct | 47.3 | 90.7 | 79.4 | **75.1** | **23.2** | **63.1** |
| ChatGLM3-6B | 47.7 | 80.4 | 63.7 | 53.8 | 17.8 | 52.7 |
| **SciDFM** | **52.7** | **90.8** | 72.6 | 38.4 | 12.4 | 53.4 |

**逆合成预测（Mol-Instructions，零样本）：**

| 模型 | Exact Match ↑ | Levenshtein ↓ | RDK FTS ↑ | Validity ↑ |
|------|---------------|---------------|-----------|------------|
| Galactica-6.7B | 0.000 | 30.760 | 0.036 | 0.995 |
| Mol-Instructions | 0.044 | 23.167 | 0.237 | 1.000 |
| **SciDFM** | **0.665** | **6.45** | **0.916** | 0.998 |

> SciDFM 在逆合成预测上的 Exact Match 达到 66.5%，远超其他模型，展现了 MoE + 专用分词器在分子任务上的巨大优势。

---

## 🧪 练习题

### 题目 1：MoE 路由计算
**问题：** 假设 SciDFM 某一层的门控网络对一个 token 输出的 logits 为 \([1.2, 0.3, 2.1, 0.5, 1.8, 0.1, 0.7, 1.5]\)（对应 8 个专家），使用 top-2 路由策略。请计算：
1. 哪两个专家被选中？
2. 归一化后的路由权重分别是多少？

<details>
<summary>💡 查看答案</summary>

1. Softmax 后概率最高的两个专家为 **Expert 3**（logit=2.1）和 **Expert 5**（logit=1.8）

2. 计算 softmax（仅对选中的两个）：
   - \(p_3 = e^{2.1} / (e^{2.1} + e^{1.8}) = 8.166 / (8.166 + 6.050) = 0.574\)
   - \(p_5 = e^{1.8} / (e^{2.1} + e^{1.8}) = 6.050 / (8.166 + 6.050) = 0.426\)
   
   归一化权重：Expert 3 ≈ **0.574**，Expert 5 ≈ **0.426**
</details>

### 题目 2：专家选择向量维度
**问题：** SciDFM 有 26 层 MoE，每层 8 个专家。论文中定义的专家选择向量 \(E_T\) 的维度是多少？如果要对 600 个文本样本（数学/化学/物理/生物/分子/蛋白质各 100 个）进行 t-SNE 分析，输入矩阵的形状是什么？

<details>
<summary>💡 查看答案</summary>

- \(E_T \in \mathbb{R}^{Ne} = \mathbb{R}^{26 \times 8} = \mathbb{R}^{208}\)，即 **208 维**
- 600 个样本的输入矩阵形状为 **600 × 208**
- t-SNE 将其降至 3 维，输出为 **600 × 3**
</details>

### 题目 3：分词器设计思考
**问题：** 为什么 SciDFM 需要将化学原子（如 C、N、O）和氨基酸字符作为独立 token？如果使用标准 BPE 分词器处理 SMILES 字符串 `C(C(=O)O)N`，可能会出现什么问题？

<details>
<summary>💡 查看答案</summary>

**原因：** 标准 BPE 分词器会将频繁出现的字符组合合并为子词，例如可能将 `C(` 或 `O)` 合并为单个 token，这会**破坏分子的化学结构语义**。在 SMILES 中，每个原子符号（C、N、O）和括号都有独立的化学含义：
- `C` = 碳原子
- `(` = 分支开始
- `=O` = 双键连接氧

如果 BPE 将 `C(` 合并，模型就无法区分"碳原子"和"碳原子后跟分支"这两个不同的化学概念。专用分词器确保每个化学符号保持独立，使模型能正确学习分子的拓扑结构。
</details>