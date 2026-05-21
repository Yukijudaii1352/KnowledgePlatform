### Dr.GRPO · 修正版GRPO

```yaml
id: dr_grpo
name: Dr.GRPO
full_name: 修正版GRPO (GRPO Done Right)
year: "2025.03"
org: Sea AI Lab / NUS / SMU
paper_url: https://arxiv.org/abs/2503.20783
category: frontier_2026
parent: grpo
motivation: 修正长度与难度偏差
```

#### 📝 一句话总结
Dr.GRPO 指出标准 GRPO 的常见实现会因为“按回复长度归一化”和“按题内奖励标准差归一化”而产生系统性优化偏差，并通过去掉这两项归一化恢复无偏策略梯度，从而在保持推理性能的同时显著改善 token efficiency。

#### 🎯 核心要点
- 出自论文《Understanding R1-Zero-Like Training: A Critical Perspective》中对 R1-Zero 式 RL 的批判性分析，而不是独立单篇算法论文
- 识别出 GRPO 的两类关键偏差：response-level length bias 与 question-level difficulty bias
- 指出长度归一化会让正确短答案获得更大正向更新，而错误长答案受到更小惩罚，导致模型偏向冗长错误推理
- 指出题内标准差归一化会让“太简单/太困难”的问题因标准差更小而被赋予更大更新权重，造成 difficulty bias
- Dr.GRPO 的修正很简单：去掉响应长度归一化和组内标准差归一化，仅保留 unbiased baseline-centered advantage
- 在实现层面，用常数 generation budget 替代 `mask.sum(axis=dim)`，从而恢复 PPO 目标而不是按每个 response 长度缩放
- 在 Qwen2.5-1.5B 的 MATH RL-tuning 中，相比 GRPO 能抑制错误回复长度持续膨胀，并减少 overthinking

#### 🔬 深入细节

##### 1. 核心示意图

![Dr.GRPO 核心示意图](https://arxiv.org/html/2503.20783v2/x1.png)

*图：论文 Figure 1。左图展示了 Dr.GRPO 相比 GRPO 的核心改动：移除 length normalization 和 std normalization；右图展示该无偏优化器能明显抑制错误回复不断变长的现象。*

##### 2. 算法伪代码

```python
# GRPO vs Dr.GRPO 核心差异
# 对同一道题采样 G 个回答，得到组内回报 R_i

mean_R = mean(R)
std_R = std(R)

for response_i in group:
    # 传统 GRPO：长度 + 题内标准差双重归一化
    A_grpo = (R_i - mean_R) / std_R
    loss_grpo += (1 / len(response_i)) * tokenwise_clipped_pg_loss(A_grpo)

    # Dr.GRPO：只保留无偏 baseline，移除两种偏差源
    A_dr = R_i - mean_R
    loss_dr += (1 / MAX_TOKENS) * tokenwise_clipped_pg_loss(A_dr)

update(loss_dr)
```

##### 3. 背景：GRPO 为什么会“越训越长”

R1-Zero 一类工作中，一个最醒目的训练现象是：随着 RL 持续进行，模型回复会越来越长。很多工作把它直接解释成“长链推理和自我反思能力的涌现”。这篇论文对这种解释提出了质疑：长度增长不一定完全来自更强的 reasoning，也可能来自 **优化目标本身对长回答的偏置**。

作者把语言模型生成形式化为 token-level MDP，并回到 PPO 的原始 surrogate objective。与标准 PPO 不同，GRPO 为了避免训练额外 value model，会对同一道题采样一组回答，利用组内回报构造优势函数。问题在于，很多实现不仅使用组内相对回报，还额外做了“按响应长度归一化”和“按题内标准差归一化”。作者指出，这两个看似自然的归一化会一起扭曲真实策略梯度。

因此，Dr.GRPO 的出发点不是提出更复杂的奖励或更强的探索机制，而是回到一个更根本的问题：**我们现在跑的 GRPO，到底还是不是原本希望优化的 PPO/REINFORCE 目标？** 论文结论是否定的，而 Dr.GRPO 就是对这个实现偏差的纠偏。

##### 4. 第一类偏差：response-level length bias

标准 GRPO 在很多实现中会把每个 response 的 loss 再除以该 response 的 token 长度 \( |o_i| \)。这会带来非常隐蔽但系统性的偏差：

- 当某个回答的优势 \(A_i > 0\) 时，也就是它是正确或更优的回答，较短答案会因为分母更小而获得更大的梯度更新；
- 当某个回答的优势 \(A_i < 0\) 时，也就是它是错误或更差的回答，较长答案会因为分母更大而受到更弱惩罚。

于是训练会逐渐形成一种奇怪偏好：**正确答案被鼓励简洁，错误答案却被容忍冗长。** 这正好解释了很多 R1-Zero 复现实验里“错误回答越来越长”的现象。

论文把这一点总结为 response-level length bias。其关键不是模型“主动学会深思熟虑”，而是目标函数在数值上给长错误回答更宽松的梯度惩罚。也就是说，长度增长部分是 reasoning emergence，部分却是 optimizer artifact。

> 💡 关键：Dr.GRPO 不是反对长链推理，而是反对“因为 loss 缩放方式错误，模型被优化器推向无意义变长”。

##### 5. 第二类偏差：question-level difficulty bias

GRPO 的另一处常见设计，是把组内相对回报再除以该题回答组的标准差：

$$
A_i^{\mathrm{GRPO}} \propto \frac{R_i - \mathrm{mean}(R)}{\mathrm{std}(R)}.
$$

这在直觉上像一种 advantage normalization，但论文指出，它和 RL 里常见的“全 batch 归一化”不同，因为这里的标准差是在 **单题内部** 计算的。结果是：

- 如果某道题太简单，组内奖励几乎全是 1，标准差会很小；
- 如果某道题太难，组内奖励几乎全是 0，标准差也会很小；
- 只要标准差小，这道题的更新权重就会被放大。

于是，训练并不是按真实学习价值来分配优化预算，而是在数值上偏向那些组内方差小的问题，形成所谓 question-level difficulty bias。简单说就是：有些问题只是因为奖励分布更集中，就莫名其妙在优化中“声音更大”。

Dr.GRPO 的修正方式也很直接：去掉这项组内标准差归一化，仅保留 baseline-centered 的无偏优势估计

$$
\tilde{A}_i = R_i - \mathrm{mean}(R).
$$

这样保留了“组内相对比较”的思想，但不再让不同问题因为标准差差异而被不公平加权。

##### 6. Dr.GRPO 到底改了什么

论文 Figure 1 和 Section 3.2 给出的结论非常明确：Dr.GRPO 的核心不是换奖励模型，也不是换采样策略，而是 **删掉两项导致偏差的归一化项**，从而恢复原本的无偏策略优化目标。

可以把它和常见 GRPO 目标对比理解：

$$
\text{GRPO:}\quad
\frac{1}{|o_i|}
\sum_t
\min\!\left(
r_{i,t} A_i,\;
\mathrm{clip}(r_{i,t}, 1-\epsilon, 1+\epsilon) A_i
\right),
\quad
A_i = \frac{R_i - \mathrm{mean}(R)}{\mathrm{std}(R)}
$$

而 Dr.GRPO 变成：

$$
\text{Dr.GRPO:}\quad
\frac{1}{M}
\sum_t
\min\!\left(
r_{i,t} \tilde{A}_i,\;
\mathrm{clip}(r_{i,t}, 1-\epsilon, 1+\epsilon) \tilde{A}_i
\right),
\quad
\tilde{A}_i = R_i - \mathrm{mean}(R),
$$

其中 \(M\) 是固定常数，例如 generation budget，而不是每个 response 自己的长度。这个改动看起来很小，但含义很深：它把“每个样本的缩放因子”从变量改成常量，消除了长度耦合；同时把优势从题内 z-score 改回 centered return，消除了 difficulty bias。

作者还特别指出，实现里常见的

```python
(tensor * mask).sum(axis=dim) / mask.sum(axis=dim)
```

本质上就会引入长度偏差；他们建议改成用固定 `MAX_TOKENS` 归一化。也就是说，Dr.GRPO 很大程度上是在修复“公式-实现不一致”的问题。

> ⚠️ 注意：论文甚至指出，不只是 GRPO，多个开源 PPO/LLM RL 实现也存在类似的长度偏差。这说明 Dr.GRPO 的意义并不局限于 DeepSeek-R1 复现，而是更一般的 LLM RL 训练实现修正。

##### 7. 实验结果：更省 token，而不是更会“刷长度”

论文在 Oat 框架上，用 Qwen2.5-1.5B base model + R1 template，在 MATH 训练集上做在线 RL-tuning，对比 vanilla GRPO 和 Dr.GRPO。作者关注的不只是 benchmark accuracy，还看训练动态和错误回复长度。

结果非常有代表性：
- 两者都能像 R1-Zero 一样带来 reward 和 response length 的上升；
- 但 GRPO 即使在 reward 增长放缓后，错误回答长度仍持续膨胀；
- Dr.GRPO 则能抑制这种“无意义变长”，使错误回复明显更短；
- 在多个数学 benchmark 上，它能在维持 reasoning performance 的同时改善 token efficiency，并缓解 overthinking。

这意味着 Dr.GRPO 的价值不是单纯追求更高 accuracy，而是让“推理长度增长”更接近真实 reasoning improvement，而不是被优化器偏置污染。放到 LLM RL 的演化链里，它代表了一类非常重要的工作：**开始从“发明新目标”转向“审视现有目标是否被正确实现”。**

#### 🧪 练习题
```yaml
question: "Dr.GRPO 相比传统 GRPO 的最关键修正是什么？"
options:
  - "增加一个额外的 value model 来估计 GAE"
  - "把组内相对回报改成 pairwise Bradley-Terry 损失"
  - "移除回复长度归一化和组内标准差归一化，恢复无偏策略梯度"
  - "对错误回答额外奖励更长的 Chain-of-Thought"
answer: 2
explain: "Dr.GRPO 的核心不是增加模型组件，而是删去 GRPO 中引入 response-level length bias 和 question-level difficulty bias 的两项归一化。"
```
