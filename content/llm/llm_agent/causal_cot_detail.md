### Causal CoT

```yaml
id: causal_cot
name: Causal CoT
full_name: 因果充分必要性优化思维链推理 (Causal Sufficiency and Necessity Improves Chain-of-Thought Reasoning)
year: "2025"
org: Tianjin University / City University of Hong Kong / UCL / Peking University / University of Bristol
paper_url: https://openreview.net/forum?id=cMstMjlGOo
category: reasoning_optimization
parent: CoT
motivation: 用因果充分必要性(PNS)评估并剪枝CoT推理步骤的冗余性与必要性，提升推理效率
```

#### 📝 一句话总结

Causal CoT 将因果推断中的充分必要性概率（PNS）引入思维链推理，通过双层优化算法（链级充分性筛选 + 节点级必要性剪枝）自动移除冗余推理步骤，在大幅减少 token 消耗的同时保持甚至提升推理准确率。

#### 🎯 核心要点

- 将 CoT 推理形式化为结构因果模型（SCM），每个推理步骤作为因果图中的节点
- 定义三个因果度量：充分性概率 PS（推理链能否导出正确答案）、必要性概率 PN（移除某步骤是否导致答案错误）、充分必要性概率 PNS（综合衡量）
- 提出双层优化算法（Algorithm 1）：外层通过 PS 筛选充分的推理链，内层通过 PN 逐步剪枝非必要步骤
- PNS 估计通过 rollout 机制实现，支持三种策略：Direct（直接续写）、Prompt-Based（提示引导）、External（外部强模型）
- 设定阈值 \(\alpha\) 对 PNS 进行剪枝决策，低于阈值的步骤被移除
- 优化后的 CoT 可通过 ICL（上下文学习）和 SFT（监督微调）两种方式增强 LLM 推理能力
- 在 GSM-8k、MATH-500、AIME 2025、CommonsenseQA 四个基准上验证，覆盖 Qwen、DeepSeek、Llama 等多个模型家族

#### 🔬 深入细节

![Causal CoT 框架总览](../assets/causal_cot_p1_img6.jpeg)
*图：Causal CoT 框架示意。左侧展示 CoT 推理的结构因果模型（SCM），右侧展示基于 PNS 的双层优化流程——先通过 PS 筛选充分推理链，再通过 PN 逐步剪枝冗余节点。*

**算法伪代码（Algorithm 1: PNS-based CoT Optimization）**

```python
# 输入: 问题 q, 候选推理链集合 {S^(1),...,S^(m)}, rollout 次数 k, 阈值 α
# 输出: 优化后的推理链 S*

# === 外层: 链级充分性筛选 (PS) ===
for each candidate chain S^(i) in {S^(1),...,S^(m)}:
    # 计算 PS: 该链能否导出正确答案
    PS(S^(i)) = P(A_{do(S^(i))} = y | A ≠ y)
    # 通过 k 次 rollout 估计 PS
    ps_score = mean([verify(rollout(q, S^(i))) for _ in range(k)])

# 选择 PS 最高的链
S* = argmax PS(S^(i))

# === 内层: 节点级必要性剪枝 (PN) ===
for each step s_t in S*:
    # 计算 PN: 移除该步骤后答案是否改变
    # 构造干预链 S*\{s_t}
    pn_scores = []
    for j in range(k):
        S_intervened = remove_step(S*, s_t)
        result = rollout(q, S_intervened)
        pn_scores.append(1 - verify(result))
    
    PN(s_t) = mean(pn_scores)
    
    # PNS 估计 (Eq.5)
    PNS(s_t) = 1 - (1/k) * sum(verify(rollout(q, S*\{s_t})))
    
    if PNS(s_t) < α:  # 低于阈值，该步骤非必要
        S* = S* \ {s_t}  # 剪枝

return S*
```

**动机与背景**

当前 LLM 的思维链（CoT）推理面临两个根本性挑战：

1. **充分性问题**：生成的推理步骤是否完整覆盖了得出最终结论所需的全部逻辑？缺失关键步骤会导致推理不完整。
2. **必要性问题**：推理链中是否存在对最终答案无实质贡献的冗余步骤？特别是在 DeepSeek-R1 等推理模型中，常出现大量自我验证、重复计算等冗余内容，显著增加推理开销。

传统方法要么通过启发式规则压缩推理（如 Chain-of-Draft 仅保留关键短语），要么通过简单的长度约束，但这些方法缺乏理论基础，无法区分哪些步骤真正对答案有因果贡献。

> 💡 **关键洞察**：本文将"一个推理步骤是否重要"转化为因果推断问题——通过反事实干预（移除或替换步骤）观察答案是否改变，从而量化每个步骤的因果贡献。

**核心机制：因果充分必要性（PNS）框架**

论文将 CoT 推理形式化为结构因果模型（SCM）\(\mathcal{M} = \langle U, V, F \rangle\)，其中：
- \(U\)：外生变量（问题输入 \(q\)）
- \(V\)：内生变量（推理步骤 \(s_1, s_2, \ldots, s_n\) 和最终答案 \(A\)）
- \(F\)：结构方程（LLM 的生成过程）

在此框架下定义三个核心因果度量：

**定义 1 — 充分性概率 PS（Probability of Sufficiency）**：

$$PS(S) = P(A_{do(S)} = y \mid A \neq y)$$

衡量推理链 \(S\) 是否足以将错误答案纠正为正确答案。直觉上，如果在"原本答案错误"的条件下，施加推理链 \(S\) 后答案变为正确，则该链具有充分性。

**定义 2 — 必要性概率 PN（Probability of Necessity）**：

$$PN(s_t) = P(A_{do(\bar{s}_t)} \neq y \mid A = y)$$

衡量单个步骤 \(s_t\) 对正确答案的必要程度。如果移除步骤 \(s_t\)（用替代内容 \(\bar{s}_t\) 干预）后答案不再正确，则该步骤是必要的。

**定义 3 — 充分必要性概率 PNS（Probability of Necessity and Sufficiency）**：

$$PNS(S) = P(A_S = y, A_{S'} \neq y)$$

联合衡量推理链既充分又必要的概率。PNS 同时满足：使用该链时答案正确（充分），不使用时答案错误（必要）。

> ⚠️ **注意**：PNS 不是 PS 和 PN 的简单乘积。根据因果推断理论，PNS 满足不等式 \(\max(0, PS + PN - 1) \leq PNS \leq \min(PS, PN)\)，需要通过联合干预来估计。

**PNS 的实际估计方法**

由于精确计算 PNS 需要遍历所有可能的干预，论文提出基于 rollout 的近似估计（Eq. 5）：

$$\widehat{PNS}(S) = 1 - \frac{1}{k} \sum_{i=1}^{k} V(S^{(i)})$$

其中 \(V(S^{(i)})\) 是第 \(i\) 次 rollout 的验证结果（正确为 1，错误为 0），\(k\) 为 rollout 次数。

三种 rollout 策略提供不同的干预方式：
- **Direct**：直接让 LLM 从干预点续写，计算成本最低
- **Prompt-Based**：通过提示词引导 LLM 基于剩余步骤重新推理
- **External**：使用外部更强模型（如 QwQ-32B 或 DeepSeek-R1）进行 rollout，效果最好但成本更高

**双层优化流程**

Algorithm 1 的核心设计是将优化分为两层：

1. **外层（链级）**：对多条候选推理链计算 PS，选择充分性最高的链作为基础。这确保了起点是一条"能导出正确答案"的推理链。

2. **内层（节点级）**：对选中链的每个步骤计算 PN/PNS，将 PNS 低于阈值 \(\alpha\) 的步骤剪枝。这确保了保留的每个步骤都对最终答案有不可替代的因果贡献。

**与传统方法的区别**

| 方法 | 核心思路 | 局限性 |
|------|---------|--------|
| Chain-of-Draft (CoD) | 仅保留关键短语 | 过度压缩导致复杂任务精度大幅下降（MATH-500 仅 55.6%） |
| Reduction | 快捷结论式推理 | 跳过中间逻辑，难以处理多步推理 |
| Fast-Solve | 简洁但完整的推理 | 缺乏理论指导，压缩程度有限 |
| **Causal CoT（本文）** | 基于因果 PNS 量化每步贡献 | 有理论保证，精准剪枝冗余步骤，保持推理完整性 |

**实验验证**

在 GSM-8k、MATH-500、AIME 2025、CommonsenseQA 四个基准上的实验表明：

- **RQ1（PNS 优化效果）**：PNS 优化后，token 长度平均减少 50-70%，步骤数减少 40-60%，同时准确率保持或提升。例如 DeepSeek-R1 在 CommonsenseQA 上从 83.0% 提升至 85.3%，token 从 191 减至 69.8。
- **RQ2-ICL**：使用优化后 CoT 作为 few-shot 示例，Ours-ICL 在 DeepSeek-V3 上将 GSM-8k 准确率从 97.6% 提升至 99.9%，同时 token 减少 67%。
- **RQ2-SFT**：在仅 1,229 条 PNS 筛选的 CoT 数据上微调小模型，DeepSeek-R1-Distill-Qwen-1.5B 在 CommonsenseQA 上从 37.6% 提升至 47.2%，推理步骤减半。
- **人工评估**：50 条优化后 CoT 中，84% 被判定为既充分又必要（S&N），仅 6% 不充分。

#### 🧪 练习题

```yaml
question: "在 Causal CoT 框架中，PNS（充分必要性概率）的核心作用是什么？"
options:
  - "衡量推理链的总长度是否合理"
  - "量化每个推理步骤对最终答案的因果贡献，指导冗余步骤剪枝"
  - "评估 LLM 生成推理链的速度"
  - "计算不同模型之间的推理能力差异"
answer: 1
explain: "PNS 通过反事实干预量化每个步骤的因果贡献——如果移除该步骤后答案改变（必要）且保留时答案正确（充分），则该步骤具有高 PNS 值，应当保留；否则可被剪枝。"
```