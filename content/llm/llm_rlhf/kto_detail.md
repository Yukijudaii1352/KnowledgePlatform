### kto: Kahneman-Tversky优化 (KTO)

```yaml
id: kto
full_name: Kahneman-Tversky优化 (KTO)
year: "2024"
paper_url: https://arxiv.org/abs/2402.01306
motivation: 前景理论，仅需二元好坏反馈
parent: dpo
category: direct_preference
```

#### 📝 一句话总结

KTO 将偏好优化改写为前景理论风格的效用最大化，只需要“这个回答好/不好”的二元反馈，而不要求同一 prompt 下的成对偏好。

#### 🎯 核心要点

- **数据要求更低**：每条样本只需 desirable 或 undesirable 标签。
- **理论灵感**：借鉴 Kahneman-Tversky 前景理论，区分收益、损失与损失厌恶。
- **隐式奖励**：仍使用相对参考模型的 log-ratio 作为奖励基础。
- **不平衡处理**：可通过 desirable/undesirable 权重处理正负样本比例差异。
- **实践价值**：适合日志中只有点赞/点踩、通过/失败、好/坏标记的反馈场景。

#### 🔬 深入细节

##### 示意图/图源

![KTO binary feedback setting](https://ar5iv.labs.arxiv.org/html/2402.01306/assets/figures/teaser.png)

图源：KTO 论文 HTML 图 1，展示 KTO 只需要二元好坏反馈，而 DPO 需要成对偏好。

##### 算法/流程伪代码

```python
pi_ref = frozen_reference_model
pi_theta = initialized_policy

for x, y, label in binary_feedback_dataset:
    reward = beta * (log_prob(pi_theta, x, y) - log_prob(pi_ref, x, y))
    kl_anchor = estimate_batch_kl(pi_theta, pi_ref)
    centered_reward = reward - kl_anchor

    if label == "desirable":
        loss = lambda_d * (1.0 - sigmoid(centered_reward))
    else:
        loss = lambda_u * (1.0 - sigmoid(-centered_reward))

    update(pi_theta, loss)
```

##### 方法解读

**1. KTO 解决的是偏好数据形态问题。** DPO 假设有同一 prompt 下的 $(y_w,y_l)$，但真实产品日志里更常见的是单条回答的点赞、踩、通过或失败。KTO 直接接受这种二元反馈，减少构造配对数据的成本。

**2. 前景理论提供效用形状。** 人类对收益和损失并不对称，损失往往更敏感。KTO 将 desirable 样本看作收益方向，将 undesirable 样本看作损失方向，用不同权重和非线性效用塑造优化目标，而不是把所有样本强行配对。

**3. KTO 仍然保留参考模型约束。** 单条样本的隐式奖励来自
$$
r_\theta(x,y)=\beta\log\frac{\pi_\theta(y|x)}{\pi_{ref}(y|x)}.
$$
相对参考模型的奖励能避免模型仅凭绝对概率大小判断好坏，并让训练仍处于偏好优化家族。

**4. 二元反馈不是免费午餐。** 缺少同 prompt 的直接对比后，训练更依赖标签质量、正负样本分布和权重设定。KTO 的贡献是给出一种能从更弱反馈中学习的目标，而不是保证弱反馈一定比成对偏好更可靠。

#### 🧪 练习题

```yaml
question: KTO 相比 DPO 最直接的数据优势是什么？
options:
  - A. 可以使用单条回答的好/坏二元反馈
  - B. 不需要任何参考模型或 KL 控制
  - C. 只适用于图像生成任务
  - D. 必须每个 prompt 采样至少九个回答
answer: A
explain: KTO 不要求同一 prompt 下的成对偏好，因此可利用更常见的二元反馈日志。
```

