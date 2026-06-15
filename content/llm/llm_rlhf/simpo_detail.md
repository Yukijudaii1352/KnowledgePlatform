### simpo: 简单偏好优化 (SimPO)

```yaml
id: simpo
full_name: 简单偏好优化 (SimPO)
year: "2024"
paper_url: https://arxiv.org/abs/2405.14734
motivation: 长度归一化奖励，去参考模型
parent: dpo
category: direct_preference
```

#### 📝 一句话总结

SimPO 用长度归一化的当前模型 log probability 作为隐式奖励，并加入目标 margin，在不使用参考模型的情况下完成简单稳定的偏好优化。

#### 🎯 核心要点

- **去参考模型**：奖励只依赖当前模型平均 log probability，不需要 $\pi_{ref}$。
- **长度归一化**：用每 token 平均 log 概率，缓解长短回答带来的概率尺度偏差。
- **目标间隔**：加入 margin $\gamma$，要求 chosen 比 rejected 至少好到一定程度。
- **实现简单**：形式接近 DPO，但少一次参考模型前向。
- **经验效果**：在多个聊天模型基准上表现强，说明很多偏好优化收益可由更直接的奖励形式取得。

#### 🔬 深入细节

##### 示意图/图源

![SimPO reference-free objective](https://ar5iv.labs.arxiv.org/html/2405.14734/assets/x1.png)

图源：SimPO 论文 HTML 图 1，展示长度归一化、无参考模型的偏好优化思路。

##### 算法/流程伪代码

```python
pi_theta = instruction_model

for x, y_win, y_lose in preference_dataset:
    avg_logp_w = log_prob(pi_theta, x, y_win) / len(y_win)
    avg_logp_l = log_prob(pi_theta, x, y_lose) / len(y_lose)

    reward_gap = beta * (avg_logp_w - avg_logp_l)
    loss = -log_sigmoid(reward_gap - gamma)
    update(pi_theta, loss)
```

##### 方法解读

**1. SimPO 重新定义隐式奖励。** DPO 的奖励是相对参考模型的 log-ratio；SimPO 更直接地使用当前模型对回答的平均 log probability：
$$
r_\theta(x,y)=\frac{\beta}{|y|}\log\pi_\theta(y|x).
$$
这样可以去掉参考模型，减少显存和计算开销。

**2. 长度归一化是核心而非细节。** 序列 log probability 会随长度累加，长回答天然更容易得到更低总 log 概率。SimPO 使用平均 log probability，使不同长度回答更可比，也更贴近实际解码时按 token 逐步选择的概率尺度。

**3. Margin 让偏好更有判别要求。** SimPO 的损失可写成
$$
\mathcal{L}_{SimPO}=-\log\sigma\left(
\beta\left[
\frac{\log\pi_\theta(y_w|x)}{|y_w|}
-\frac{\log\pi_\theta(y_l|x)}{|y_l|}
\right]-\gamma
\right).
$$
目标间隔 $\gamma$ 防止模型只做到微弱偏好，而是要求 chosen 与 rejected 之间留出足够距离。

**4. 去参考模型带来简洁也带来责任转移。** SimPO 不再依赖参考模型稳定训练，因此超参数、数据分布和初始模型质量更重要。它适合已经有较好 instruction model 的后训练阶段，但不应理解为参考约束在所有场景都无用。

#### 🧪 练习题

```yaml
question: SimPO 中长度归一化的主要作用是什么？
options:
  - A. 让不同长度回答的 log probability 更可比
  - B. 强制所有回答生成相同 token 数
  - C. 替代 tokenizer 的分词过程
  - D. 只优化 prompt 的长度
answer: A
explain: 序列 log probability 会随长度累加，按长度归一化可减少长短回答带来的尺度偏差。
```
