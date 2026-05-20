### RLAIF (RL from AI Feedback)

```yaml
id: rlaif
name: RLAIF
full_name: AI反馈强化学习 (RL from AI Feedback)
year: "2023.09"
org: Google
paper_url: https://arxiv.org/abs/2309.00267
category: rlhf
parent: instructgpt
motivation: AI反馈替代昂贵的人工标注
```

#### 📝 一句话总结
RLAIF 利用现成的 LLM 自动标注偏好来替代人类标注，再通过蒸馏式（训练奖励模型）或直接式（LLM 直接打分）两种方式获取奖励信号进行 RL 训练，在摘要生成、对话等任务上取得与 RLHF 相当甚至更优的人类评分。

#### 🎯 核心要点
- 提出 RLAIF 框架：用 off-the-shelf LLM 替代人类标注者生成偏好标签，大幅降低标注成本
- 两种 RL 训练范式：**蒸馏式 RLAIF**（先训练 Reward Model 再做 RL）和**直接式 RLAIF**（LLM 直接输出 1-10 分作为奖励信号，绕过 RM 训练）
- 位置偏差缓解：对每对候选两次推理（交换顺序）后取平均偏好分布
- Prompt 结构四段式：Preamble + Few-shot Exemplars + Sample + Ending，支持 Chain-of-Thought 推理增强标注质量
- 3 个评估指标：AI Labeler Alignment（AI vs 人类标签准确率）、Win Rate（人工评价胜率）、Harmless Rate（无害率）
- 实验覆盖 3 个任务：摘要生成（TL;DR）、有帮助对话（Helpful Dialogue）、无害对话（Harmless Dialogue）
- 关键发现：AI 标注器和策略模型同尺寸时 RLAIF 仍优于 SFT；直接式 RLAIF 甚至优于蒸馏式

#### 🔬 深入细节

##### 核心框架对比

![RLAIF vs RLHF 框架对比](https://ar5iv.labs.arxiv.org/html/2309.00267/assets/x3.png)
*图：RLAIF（上）用 LLM 替代人类标注生成偏好标签训练 RM，RLHF（下）依赖人类标注者。*

##### AI 偏好标注流程

![AI 偏好标注流程](https://ar5iv.labs.arxiv.org/html/2309.00267/assets/x4.png)
*图：LLM 先进行 Chain-of-Thought 推理（蓝色），将结果拼接回 Prompt 后再次输入 LLM 获取"1" vs "2" 的 log-probability 分布。*

##### 动机与背景

传统 RLHF 的核心瓶颈在于**高质量人类偏好标注的成本高昂且难以规模化**——每对候选响应的对比标注需耗费大量人力与时间。Bai et al. (2022b) 首次提出 RLAIF 概念，但仅验证了"AI+人类混合标签 + Constitutional AI"的组合效果，**未直接回答一个核心问题：AI 反馈能否完全替代人类反馈？** 本文首次在严格控制变量的条件下系统对比 RLAIF 与 RLHF。

##### 偏好标注机制

给定一段上下文和两个候选回答 \(y_1, y_2\)，向 LLM 输入构造好的 Prompt，提取其生成 token "1" 和 "2" 的 log-probability，经 softmax 得到**软偏好分布**：

$$P_{AI} = \text{softmax}(\log P(\text{"1"}), \log P(\text{"2"}))$$

> 💡 关键：使用 soft 标签（如 [0.6, 0.4]）而非 one-hot 硬标签，保留了标注的不确定性信息，对后续 RM 训练更友好。

**位置偏差缓解**：LLM 存在倾向第一位候选的位置偏差（Pezeshkpour & Hruschka, 2023; Wang et al., 2023），本文对每对候选做两次推断——交换顺序后再次评分，最终偏好为两次结果的均值。

**Chain-of-Thought (CoT) 推理**：先让 LLM 生成对两候选质量的文字分析（如"摘要 A 更全面但 B 更简洁…"），将其拼接回 Prompt 后再次输入以得到偏好分布。实验表明 CoT 可提升标注对齐度。

##### 蒸馏式 RLAIF（Distilled RLAIF）

这是标准的 RLAIF 范式，分两步：

**Step 1 — 训练 Reward Model**：用 LLM 标注的软标签训练 RM。损失函数为交叉熵，将 RM 输出的两个 reward score \(r_1, r_2\) 经 softmax 转为概率分布后与 AI 软标签做交叉熵：

$$\mathcal{L}_{RM} = -\sum_{i} P_{AI}(i) \log \frac{e^{r_i}}{\sum_j e^{r_j}}$$

> ⚠️ 注意：训练 RM 本质是对 LLM 标注器的**知识蒸馏**——用更小/更快的模型近似 LLM 的偏好判断。

**Step 2 — RL 训练**：使用 REINFORCE 算法，以 RM 评分作为最终 token 的奖励（中间 token 奖励为 0），Policy Model 以 SFT 模型初始化，Value Model 用于计算优势函数减小方差：

$$\mathcal{L}_{PG}(\theta) = -\sum_t \log \pi_\theta(A_t|X_t) \cdot \overline{(Z_t - V_\psi^\pi(X_t))}$$

其中 \(Z_t = R_T\)（仅在序列终点获得 RM 奖励，\(\gamma=1\)），上划线表示该项不参与梯度计算；Value Model 的损失为 MSE：

$$\mathcal{L}_{VF}(\psi) = \sum_t (V_\psi^\pi(X_t) - Z_t)^2$$

##### 直接式 RLAIF（Direct RLAIF）

绕过 RM 训练，**直接用 LLM 作为在线奖励函数**。LLM 被 Prompt 要求对生成回答在 1-10 分打分，计算各分数 token 的似然加权和：

$$s(x|c) = \sum_{i=1}^{10} i \cdot P(i | x, c)$$

然后标准化到 \([-1, 1]\) 作为 RL 奖励。此方法虽然计算开销更大（当 AI 标注器大于 RM 时），但**免去了 RM 训练带来的信息损失**，实验发现直接式甚至优于蒸馏式。

##### 实验关键结果

| 任务 | RLAIF vs SFT 胜率 | RLHF vs SFT 胜率 | 差异显著性 |
|------|-------------------|-------------------|------------|
| Summarization | 71% | 73% | 不显著 |
| Helpful Dialogue | 63% | 64% | 不显著 |
| Harmless Dialogue (无害率) | 88% | 76% | RLAIF 显著更优 |

RLAIF vs RLHF 直接对比中，双方胜率统计上与 50% 无显著差异（即**人类认为两者质量相当**）。在 Harmless Dialogue 上 RLAIF 无害率更高。

##### 与传统方法的区别

| 维度 | RLHF | RLAIF (本文) |
|------|------|-------------|
| 偏好来源 | 人类标注者 | Off-the-shelf LLM |
| 标注成本 | 极高（人工逐条标注） | 极低（API 调用） |
| 标注可扩展性 | 受限于人力 | 可无限放大 |
| RM 训练 | 硬标签 → RM | 软标签 → RM (蒸馏) |
| 可选路径 | 仅 RM+RL | RM+RL 或 Direct Score+RL |
| 位置偏差处理 | 无需（人类不偏向位置） | 双推断取平均 |

#### 🧪 练习题

```yaml
question: "RLAIF 中缓解 LLM 偏好标注位置偏差的核心策略是什么？"
options:
  - "只对每个候选对做一次推断"
  - "对每对候选交换顺序做两次推断后取平均偏好分布"
  - "使用 one-hot 标签替代软标签"
  - "增加 Few-shot 示例数量"
answer: 1
explain: "LLM 存在偏好第一位候选的位置偏差，两次推断交换候选顺序后取平均可消除偏置影响，这是本文发现小模型上偏差更显著的直接应对。"
```