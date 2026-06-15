### dpo: 直接偏好优化 (DPO)

```yaml
id: dpo
full_name: 直接偏好优化 (DPO)
year: "2023"
paper_url: https://arxiv.org/abs/2305.18290
motivation: 去除奖励模型，直接偏好分类优化
parent: rlhf
category: direct_preference
```

#### 📝 一句话总结

DPO 把 KL 约束 RLHF 的最优策略形式代回偏好模型，直接用成对偏好数据训练语言模型，省掉显式奖励模型和在线 PPO。

#### 🎯 核心要点

- **核心转化**：语言模型本身可通过相对参考模型的 log-ratio 表示隐式奖励。
- **训练目标**：让优胜回答相对参考模型的提升幅度大于落败回答。
- **无需在线 RL**：只用离线偏好对即可做 supervised-style 优化。
- **参考模型**：通常取 SFT 模型，用于稳定训练并定义 KL 约束的隐式基准。
- **影响**：成为 IPO、KTO、ORPO、SimPO、TDPO 等后续偏好优化方法的共同参照系。

#### 🔬 深入细节

##### 示意图/图源

![DPO workflow](https://ar5iv.labs.arxiv.org/html/2305.18290/assets/figures/diagrams/teaser.png)

图源：DPO 论文 HTML 图 1，展示 RLHF 先学奖励再做 RL 与 DPO 直接偏好优化的差异。

##### 算法/流程伪代码

```python
pi_ref = frozen_sft_model
pi_theta = copy(pi_ref)

for x, y_win, y_lose in preference_dataset:
    logp_w = log_prob(pi_theta, x, y_win)
    logp_l = log_prob(pi_theta, x, y_lose)
    ref_w = log_prob(pi_ref, x, y_win)
    ref_l = log_prob(pi_ref, x, y_lose)

    margin = beta * ((logp_w - ref_w) - (logp_l - ref_l))
    loss = -log_sigmoid(margin)
    update(pi_theta, loss)
```

##### 方法解读

**1. DPO 的入口是 KL 约束 RLHF。** 标准 RLHF 可写成最大化奖励并惩罚策略偏离参考模型：
$$
\max_\pi \mathbb{E}_{y\sim\pi} [r(x,y)]-\beta D_{KL}(\pi(y|x)\|\pi_{ref}(y|x)).
$$
这个问题的最优策略满足 $\pi^*(y|x)\propto \pi_{ref}(y|x)\exp(r(x,y)/\beta)$。

**2. 隐式奖励来自策略比值。** 由上式反解可得
$$
r_\theta(x,y)=\beta \log \frac{\pi_\theta(y|x)}{\pi_{ref}(y|x)}+\beta \log Z(x).
$$
在成对比较中，归一化项 $Z(x)$ 会抵消，因此不需要显式估计奖励模型。

**3. DPO 损失就是偏好分类损失。** 对偏好对 $(x,y_w,y_l)$，目标为
$$
\mathcal{L}_{DPO}=-\log\sigma\left(\beta\left[
\log\frac{\pi_\theta(y_w|x)}{\pi_{ref}(y_w|x)}
-\log\frac{\pi_\theta(y_l|x)}{\pi_{ref}(y_l|x)}
\right]\right).
$$
它看起来像二分类，但分类 logit 是两个回答相对参考模型的 log-ratio 差。

**4. 简化来自代数，不代表没有约束。** DPO 省掉奖励模型和 PPO，但参考模型、$\beta$、数据质量仍然决定优化边界。若偏好数据存在长度偏差、风格偏差或覆盖不足，DPO 会直接学习这些偏差，并可能在训练后期过拟合偏好对。

#### 🧪 练习题

```yaml
question: DPO 为什么可以不显式训练奖励模型？
options:
  - A. 因为 KL 约束 RLHF 的最优策略可反解出由策略/参考模型 log-ratio 表示的隐式奖励
  - B. 因为 DPO 完全不使用偏好数据
  - C. 因为 DPO 只优化 prompt，不优化回答
  - D. 因为参考模型会自动生成所有人工标签
answer: A
explain: DPO 将奖励差写成策略相对参考模型的 log-ratio 差，从而直接用偏好分类损失训练策略。
```

