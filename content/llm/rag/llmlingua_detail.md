### LLMLingua

```yaml
id: llmlingua
name: LLMLingua
full_name: LLM语言压缩 (LLMLingua Prompt Compression)
year: '2024.01'
org: Microsoft Research
paper_url: https://arxiv.org/abs/2310.05736
category: architecture
parent: rag
motivation: 基于困惑度剔除冗余Token，20倍压缩不损性能
```

#### 📝 一句话总结

LLMLingua 提出了一种**由粗到细的 Prompt 压缩方法**，利用小型语言模型的困惑度（Perplexity）信号，通过预算控制器、迭代式 Token 级压缩和分布对齐三大组件，在最高 20 倍压缩率下几乎不损失大语言模型的推理性能，显著降低 API 调用成本与延迟。

#### 🎯 核心要点

- **三阶段由粗到细压缩框架**：Budget Controller（粗粒度 Demonstration 级）→ Iterative Token-level Prompt Compression（细粒度 Token 级）→ Distribution Alignment（小模型与 LLM 对齐）
- **Budget Controller**：根据 Prompt 各组件（Instruction / Demonstrations / Question）的重要性差异，动态分配不同压缩比；对冗余 Demonstrations 执行整条删除的粗粒度压缩
- **迭代式 Token 级压缩（ITPC）**：将 Prompt 分段后逐段计算条件概率，前段压缩结果拼接到后段上下文，缓解独立性假设带来的信息丢失
- **分布对齐**：用 LLM 生成的数据对小模型做指令微调，缩小小模型与目标 LLM 之间的 Token 概率分布差距
- **小模型选择**：GPT-2-Alpaca（117M）或 Alpaca-7B 作为压缩代理模型 \(\mathcal{M}_s\)
- **评估覆盖四大场景**：推理（GSM8K）、ICL（BBH）、对话（ShareGPT）、摘要（Arxiv-March23），目标 LLM 为 GPT-3.5-Turbo 和 Claude-v1.3
- **核心结论**：在 GSM8K 上 9 倍压缩仅损失 1.5% 准确率；在 BBH 上 10 倍压缩性能持平甚至略优于原始 Prompt

#### 🔬 深入细节

![LLMLingua 框架总览](https://ar5iv.labs.arxiv.org/html/2310.05736/assets/x1.png)
*图：LLMLingua 的由粗到细压缩框架。左侧为 Budget Controller 进行 Demonstration 级筛选，中间为迭代式 Token 级压缩（ITPC），右侧为分布对齐模块。*

---

##### 动机与背景

随着 Chain-of-Thought、In-Context Learning 和 RAG 等技术的广泛应用，输入给 LLM 的 Prompt 越来越长，甚至超过数万 Token。这带来了两个核心问题：

1. **推理成本高**：API 按 Token 计费，长 Prompt 直接增加费用和延迟。
2. **上下文窗口受限**：超出模型最大上下文长度的内容会被截断，导致信息丢失。

已有的模型压缩方法（量化、剪枝）需要修改模型参数，不适用于只能通过 API 访问的黑盒 LLM。而自然语言本身具有冗余性（Shannon, 1951），因此可以在 **Prompt 层面** 进行无损或近无损压缩。

> 💡 关键：LLMLingua 的核心洞察是——**Token 的困惑度（Perplexity）反映其信息量**。低困惑度的 Token 对模型来说是"可预测的"，因此可以安全删除；高困惑度的 Token 携带关键信息，必须保留。

---

##### 核心机制一：Budget Controller（预算控制器）

Budget Controller 解决的问题是：**在高压缩率下，如何合理分配各部分的压缩预算？**

一个典型的 Prompt 由三部分组成：

$$\bm{x} = (\bm{x}^{\text{ins}}, \bm{x}^{\text{dems}}, \bm{x}^{\text{que}})$$

其中 Instruction 和 Question 对生成结果影响最大，应分配较低的压缩率（保留更多内容）；而多个 Demonstrations 之间信息冗余，可以大幅压缩。

**步骤 1：计算 Demonstration 压缩率**

$$\tau_{\text{dems}} = \frac{\tau L - (\tau_{\text{ins}} L_{\text{ins}} + \tau_{\text{que}} L_{\text{que}})}{L_{\text{dems}}}$$

其中 \(\tau\) 为目标总压缩率，\(\tau_{\text{ins}} = 0.85\)、\(\tau_{\text{que}} = 0.9\) 为预设值。

**步骤 2：Demonstration 级粗粒度压缩**

用小模型 \(\mathcal{M}_s\) 计算每条 Demonstration 的困惑度，按困惑度**降序排列**（高困惑度 = 高信息量 = 优先保留），贪心选取直到 Token 预算用尽。

**步骤 3：剩余预算回拨**

粗粒度选择后若有剩余 Token 预算，回拨给 Instruction 和 Question，进一步降低它们的压缩率：

$$\Delta\tau = \frac{k \cdot \tau_{\text{dems}} L_{\text{dems}} - \widetilde{L}_{\mathcal{D}}}{L_{\text{ins}} + L_{\text{que}}}$$

> ⚠️ 注意：粒度控制系数 \(k=2\) 允许 Demonstration 的实际 Token 数最多为预算的 2 倍，确保不会因为单条 Demonstration 过长而浪费预算。

---

##### 核心机制二：迭代式 Token 级压缩（ITPC）

直接用困惑度逐 Token 筛选存在一个根本问题——**独立性假设**：删除某些 Token 后，剩余 Token 的条件概率分布已经改变，但朴素方法忽略了这一点。

ITPC 的解决方案是**分段迭代**：

```python
# ITPC 伪代码
segments = split(prompt_after_budget_control, segment_size=100)
compressed_tokens = []

for segment in segments:
    # 将已压缩的前文拼接为上下文
    context = compressed_tokens
    # 用小模型计算当前段每个 token 的条件概率 p(token | context, prev_tokens_in_seg)
    probs = small_model.get_token_probs(context + segment)
    # 根据压缩率动态计算阈值 γ
    gamma = compute_threshold(probs, compression_ratio)
    # 保留困惑度 > γ 的 token（即概率低、信息量大的 token）
    kept = [tok for tok, p in zip(segment, probs) if perplexity(p) > gamma]
    compressed_tokens.extend(kept)

compressed_prompt = concat(compressed_tokens)
```

核心公式——分段条件概率估计：

$$p(\widetilde{\bm{s}}_j) = \prod_{i=1}^{L_{s,j} + \sum_k^{j-1} \widetilde{L}_{s,k}} p(s_{j,i} | s_{j,<i}, \widetilde{\bm{s}}_{<j})$$

每段的压缩阈值 \(\gamma_j\) 根据该段的 PPL 分布和对应压缩率动态计算，保留困惑度高于阈值的 Token：

$$\widetilde{\bm{s}}_j = \{s_{j,i} \mid p(s_{j,i}) > \gamma_j\}$$

> 💡 关键：ITPC 的精妙之处在于——前一段的压缩结果会作为后一段的上下文输入，使得后续段的概率估计更加准确，形成了一种**自回归式的压缩链**。

---

##### 核心机制三：分布对齐

压缩使用的小模型（如 GPT-2）与目标 LLM（如 GPT-3.5）的 Token 概率分布存在差异。如果小模型认为某个 Token 不重要（低困惑度）但 LLM 认为它很重要，就会导致关键信息被误删。

解决方案：用 LLM 生成的数据对小模型做**指令微调**，使两者的分布趋于一致：

$$\min_{\bm{\theta}_s} \mathbb{E}\left[\frac{1}{N}\sum_{i=1}^{N}\mathcal{L}(\mathbf{x}_i, \mathbf{y}_{i,\text{LLM}}; \bm{\theta}_{\mathcal{M}_s})\right]$$

实践中使用 Alpaca 数据集进行微调，得到 GPT2-Alpaca 和 Alpaca-7B。

> 💡 关键：分布对齐不需要目标任务的数据，只需通用指令数据即可，因此具有很好的泛化性。

---

##### 训练与推理流程

**离线阶段（一次性）**：
1. 选择小模型（GPT-2 或 LLaMA-7B）
2. 用 Alpaca 数据集 + LLM 生成的回答进行指令微调 → 得到对齐后的 \(\mathcal{M}_s\)

**在线推理阶段（每次请求）**：
1. **Budget Controller**：输入原始 Prompt，计算各 Demonstration 的 PPL，执行粗粒度筛选，分配 Token 预算
2. **ITPC**：对筛选后的 Prompt 分段，逐段计算 Token PPL，保留高信息量 Token
3. **拼接**：将压缩后的 Token 序列直接拼接为新 Prompt，送入目标 LLM

整个压缩过程**不需要目标 LLM 的梯度**，完全兼容黑盒 API。

---

##### 与传统方法的对比

| 方法 | 压缩粒度 | 是否考虑 Token 间依赖 | 是否需要 LLM 梯度 | 最大压缩率 |
|------|---------|---------------------|------------------|-----------|
| Selective-Context | Token 级 | ❌ 独立假设 | ❌ | ~4x |
| Sentence Selection | 句子级 | ❌ | ❌ | ~3x |
| **LLMLingua** | **粗→细两级** | **✅ 迭代式** | **❌** | **20x** |

LLMLingua 的三大优势：
1. **两级压缩**：粗粒度保证语义完整性，细粒度保留关键 Token
2. **迭代式依赖建模**：通过分段拼接缓解独立性假设
3. **分布对齐**：让小模型的"重要性判断"与 LLM 保持一致

---

#### 🧪 练习题

```yaml
question: "LLMLingua 的迭代式 Token 级压缩（ITPC）相比朴素的逐 Token 困惑度筛选，核心改进是什么？"
options:
  - "使用更大的语言模型计算困惑度"
  - "将 Prompt 分段，前段压缩结果作为后段上下文，缓解条件独立性假设"
  - "对每个 Token 计算多次困惑度取平均"
  - "用 TF-IDF 替代困惑度作为 Token 重要性指标"
answer: 1
explain: "ITPC 将 Prompt 分为多个段，每段压缩后的结果拼接到下一段的上下文中，使后续段的条件概率估计能考虑到前段的压缩结果，从而缓解了朴素方法中各 Token 独立计算困惑度的问题。"
```