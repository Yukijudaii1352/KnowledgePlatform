### orpo: 比值比偏好优化 (ORPO)

```yaml
id: orpo
full_name: 比值比偏好优化 (ORPO)
year: "2024"
paper_url: https://arxiv.org/abs/2403.07691
motivation: 单阶段对齐，无需参考模型
parent: dpo
category: direct_preference
```

#### 📝 一句话总结

ORPO 把监督微调和偏好对齐合成一个单阶段目标：提高优胜回答的似然，同时用 odds ratio 惩罚拉开优胜与落败回答。

#### 🎯 核心要点

- **单阶段训练**：无需先 SFT 再偏好优化，SFT 损失和偏好损失同时出现。
- **无参考模型**：不需要冻结一份 $\pi_{ref}$ 参与 log-ratio 计算。
- **odds ratio**：用回答概率的 odds 比值衡量优胜回答相对落败回答的优势。
- **简化资源**：减少训练阶段、显存和推理式参考打分开销。
- **风险点**：参考模型约束消失后，更依赖 SFT 项和超参数控制语言质量。

#### 🔬 深入细节

##### 示意图/图源

![ORPO alignment comparison](https://ar5iv.labs.arxiv.org/html/2403.07691/assets/x2.png)

图源：ORPO 论文 HTML 图 2，对比 RLHF、DPO 等多阶段方法与 ORPO 单阶段对齐。

##### 算法/流程伪代码

```python
pi_theta = base_or_instruction_model

for x, y_win, y_lose in preference_dataset:
    nll = -log_prob(pi_theta, x, y_win)

    p_w = exp(sequence_log_prob(pi_theta, x, y_win))
    p_l = exp(sequence_log_prob(pi_theta, x, y_lose))
    odds_w = p_w / (1.0 - p_w + eps)
    odds_l = p_l / (1.0 - p_l + eps)

    log_odds_ratio = log(odds_w / odds_l)
    preference_loss = -log_sigmoid(log_odds_ratio)
    loss = nll + lambda_orpo * preference_loss

    update(pi_theta, loss)
```

##### 方法解读

**1. ORPO 从 SFT 的副作用出发。** 标准 SFT 只提高示范回答概率，却没有显式压低不合适回答。ORPO 认为对齐训练应同时做两件事：让 chosen response 更可能，让 rejected response 相对更不可能。

**2. odds ratio 是无参考的相对比较。** ORPO 使用
$$
odds_\theta(y|x)=\frac{P_\theta(y|x)}{1-P_\theta(y|x)}
$$
并最大化 chosen 相对 rejected 的 odds ratio。它不像 DPO 那样比较当前模型和参考模型，而是直接比较当前模型对两个回答的偏好。

**3. 单阶段目标降低工程复杂度。** ORPO 的目标可概括为
$$
\mathcal{L}_{ORPO}=\mathcal{L}_{SFT}+\lambda\mathcal{L}_{OR}.
$$
这让训练流程更接近普通微调，不需要额外奖励模型、PPO rollout 或参考模型前向。

**4. 约束来源从参考模型转向 chosen NLL。** 没有 $\pi_{ref}$ 后，模型不再被显式拉回初始策略。ORPO 依赖 chosen response 的 NLL 维持语言能力和任务分布，因此数据质量、学习率和 $\lambda$ 对结果影响更明显。

#### 🧪 练习题

```yaml
question: ORPO 为什么被称为单阶段偏好优化？
options:
  - A. 它在同一个目标中同时包含 chosen 的 NLL 和偏好 odds-ratio 项
  - B. 它只训练奖励模型，不训练语言模型
  - C. 它每次只允许一个 token 参与反向传播
  - D. 它必须先完成 PPO 才能做 SFT
answer: A
explain: ORPO 将监督微调和偏好拉开合并在一个训练阶段中完成。
```

