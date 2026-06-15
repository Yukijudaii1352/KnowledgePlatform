### ipo: 身份偏好优化 (IPO)

```yaml
id: ipo
full_name: 身份偏好优化 (IPO)
year: "2024"
paper_url: https://arxiv.org/abs/2310.12036
motivation: MSE正则化解决DPO过拟合
parent: dpo
category: direct_preference
```

#### 📝 一句话总结

IPO 从一般化偏好优化视角指出 DPO 在确定性偏好下可能无限推大 log-ratio，并用带目标间隔的 MSE 形式抑制过拟合。

#### 🎯 核心要点

- **问题诊断**：DPO 的 Bradley-Terry 假设在近确定性偏好数据上会鼓励间隔持续增大。
- **统一框架**：论文提出 ΨPO，把多种偏好优化看作不同链接函数和正则形式。
- **IPO 目标**：用 identity link 得到平方损失，把偏好间隔拉向有限目标值。
- **正则效果**：避免模型过度压低未偏好回答或过度偏离参考模型。
- **适用场景**：在偏好标签很干净、重复训练轮数较多或数据覆盖有限时尤其有意义。

#### 🔬 深入细节

##### 示意图/图源

![IPO versus DPO overfitting behavior](https://ar5iv.labs.arxiv.org/html/2310.12036/assets/x2.png)

图源：IPO 论文 HTML 图 2，展示 DPO 与 IPO 在玩具偏好分布上的不同过拟合行为。

##### 算法/流程伪代码

```python
pi_ref = frozen_reference_model
pi_theta = copy(pi_ref)
target_margin = 1.0 / (2.0 * tau)

for x, y_win, y_lose in preference_dataset:
    h = (
        log_prob(pi_theta, x, y_win) - log_prob(pi_ref, x, y_win)
        - log_prob(pi_theta, x, y_lose) + log_prob(pi_ref, x, y_lose)
    )
    loss = (h - target_margin) ** 2
    update(pi_theta, loss)
```

##### 方法解读

**1. IPO 先质疑 DPO 的偏好噪声模型。** DPO 借用了 Bradley-Terry 形式：奖励差越大，优胜回答被偏好的概率越高。若训练数据几乎总是同一个回答胜出，交叉熵会持续推大间隔，模型可能越来越远离参考分布。

**2. 平方损失给偏好间隔设置有限目标。** IPO 的 sampled loss 可写成
$$
\mathcal{L}_{IPO}=
\left(h_\pi(x,y_w,y_l)-\frac{1}{2\tau}\right)^2,
$$
其中
$$
h_\pi=\log\frac{\pi_\theta(y_w|x)}{\pi_{ref}(y_w|x)}
-\log\frac{\pi_\theta(y_l|x)}{\pi_{ref}(y_l|x)}.
$$
训练目标不是“间隔越大越好”，而是“间隔接近一个由温度控制的合适值”。

**3. 这是一种更强的保守性。** DPO 的 $\beta$ 控制更新尺度，但在可分数据上仍可能继续增大偏好 margin。IPO 通过 MSE 的目标点让过大的 margin 也产生损失，从目标函数层面抑制过拟合。

**4. IPO 牺牲部分激进优化换稳定性。** 当偏好数据非常可靠且测试分布接近训练分布时，强力拉大间隔可能短期有效；但在真实 LLM 对齐中，偏好数据覆盖有限，过度优化训练偏好容易损害多样性和泛化。IPO 的设计更偏向保守对齐。

#### 🧪 练习题

```yaml
question: IPO 相比 DPO 的关键目标变化是什么？
options:
  - A. 把偏好 log-ratio 间隔拉向有限目标，而不是无限增大
  - B. 完全删除参考模型并只保留 SFT 损失
  - C. 用人工规则替代所有偏好样本
  - D. 把每个 token 都建模为独立环境状态
answer: A
explain: IPO 使用平方损失约束偏好间隔到有限值，从而缓解 DPO 在可分偏好数据上的过拟合。
```

