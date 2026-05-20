### 直接偏好优化 (Direct Preference Optimization)

```yaml
id: dpo
name: DPO
full_name: 直接偏好优化 (Direct Preference Optimization)
year: "2023.05"
org: Stanford
paper_url: https://arxiv.org/abs/2305.18290
category: preference
parent: instructgpt
motivation: 无需奖励模型的闭式解对齐
```

#### 📝 一句话总结

DPO 通过奖励函数重参数化技巧将 RLHF 中「显式训练奖励模型 + 强化学习」的两阶段流程简化为单一分类损失，直接从偏好数据中优化语言模型，实现了稳定、轻量的对齐训练。

#### 🎯 核心要点

- 核心创新：将 Bradley-Terry 偏好模型中的奖励函数重参数化为策略概率比的对数形式，消去了显式奖励模型
- 闭式最优解：证明在 KL 约束下，RLHF 最优策略与奖励函数之间存在闭式等价关系 \(r(x,y) = \beta \log \frac{\pi_r(y|x)}{\pi_{\text{ref}}(y|x)} + \beta \log Z(x)\)
- 单一损失函数：最终目标函数是一个二分类交叉熵损失，直接最大化偏好样本的概率，无需采样或强化学习
- 消去了分区函数：Bradley-Terry 模型只依赖奖励之差，代入重参数化后分区函数 \(Z(x)\) 自动抵消
- 稳定训练：无需 Reward Model 训练、无需 PPO 策略搜索、无需从 LM 在线采样，大幅降低计算与调参开销
- 隐式奖励解释：训练后的模型「内隐」一个奖励函数 \(\hat{r}_\theta(x,y) = \beta \log \frac{\pi_\theta(y|x)}{\pi_{\text{ref}}(y|x)}\)
- 梯度分析：DPO 梯度自动对预测错误的样本赋予更高权重，同时增大偏好响应概率、降低非偏好响应概率

#### 🔬 深入细节

##### 1. 核心示意图

![DPO 核心示意图](https://ar5iv.labs.arxiv.org/html/2305.18290/assets/figures/diagrams/teaser.png)

*图：DPO vs 传统 RLHF 流程对比。传统 RLHF（左）需先训练奖励模型，再用 PPO 优化策略；DPO（右）直接将偏好数据作为分类损失优化语言模型，流程极简。*

##### 2. 从 RLHF 到 DPO 的核心推导

**背景：RLHF 的 Bottleneck**

传统 RLHF（以 InstructGPT 为代表）分三步：
1. **SFT**：在高质量人工标注上微调基础模型得到参考策略 \(\pi_{\text{ref}}\)
2. **Reward Modeling**：收集偏好对比数据 \((x, y_w, y_l)\)，用 Bradley-Terry 模型训练奖励函数：\(p^*(y_1 \succ y_2 | x) = \sigma(r^*(x, y_1) - r^*(x, y_2))\)
3. **PPO 优化**：以学到的奖励函数为信号最大化期望奖励，同时加 KL 约束防止偏离 \(\pi_{\text{ref}}\) 过远

> ⚠️ **痛点**：步骤 2 训练奖励模型需要大量偏好数据和计算，步骤 3 的 PPO 在语言模型空间中进行不稳定、超参数敏感、需要在线采样。

**关键洞察：奖励 → 策略的闭式等价**

上述 KL 约束 RLHF 问题存在闭式解（论文附录 A.1）：

$$\pi_r(y|x) = \frac{1}{Z(x)} \pi_{\text{ref}}(y|x) \exp\left(\frac{1}{\beta} r(x,y)\right)$$

取对数重排得到 **奖励函数重参数化**（核心公式 Eq.5）：

$$r(x,y) = \beta \log \frac{\pi_r(y|x)}{\pi_{\text{ref}}(y|x)} + \beta \log Z(x)$$

这意味着：**给定最优策略 \(\pi_r\) 和参考策略 \(\pi_{\text{ref}}\)，可反解出对应奖励函数——策略本身「内隐」了奖励信息。**

> 💡 **关键**：这正是论文标题 "Your Language Model is Secretly a Reward Model" 的由来——DPO 训练后的语言模型同时扮演了奖励模型的角色。

**代入 Bradley-Terry 消去 \(Z(x)\)**

Bradley-Terry 偏好概率只依赖奖励之差：
$$p^*(y_w \succ y_l | x) = \sigma(r^*(x, y_w) - r^*(x, y_l))$$

代入重参数化：
$$r^*(x, y_w) - r^*(x, y_l) = \beta \log \frac{\pi^*(y_w|x)}{\pi_{\text{ref}}(y_w|x)} - \beta \log \frac{\pi^*(y_l|x)}{\pi_{\text{ref}}(y_l|x)}$$

**\(Z(x)\) 项相减时自动消去！** 这是 DPO 方法最精妙的设计——无需显式估计昂贵的分区函数。

**DPO 损失函数**

由此将 RLHF 转化为简单的最大似然分类问题。定义隐式奖励 \(\hat{r}_\theta(x,y) = \beta \log \frac{\pi_\theta(y|x)}{\pi_{\text{ref}}(y|x)}\)，DPO 损失为：

$$\mathcal{L}_{\text{DPO}}(\pi_\theta; \pi_{\text{ref}}) = -\mathbb{E}_{(x, y_w, y_l) \sim \mathcal{D}} \left[ \log \sigma\left( \beta \log \frac{\pi_\theta(y_w|x)}{\pi_{\text{ref}}(y_w|x)} - \beta \log \frac{\pi_\theta(y_l|x)}{\pi_{\text{ref}}(y_l|x)} \right) \right]$$

##### 3. 算法伪代码

```python
# DPO 训练流程伪代码
def dpo_train(pi_ref, dataset, beta, optimizer, epochs):
    """pi_ref: 冻结的参考策略（SFT模型）"""
    pi_theta = copy_params(pi_ref)  # 初始化训练策略

    for epoch in range(epochs):
        for (x, y_w, y_l) in dataset:
            # 1. 计算对数概率（训练模型 vs 参考模型）
            log_pi_w   = pi_theta.log_prob(y_w | x)
            log_pi_l   = pi_theta.log_prob(y_l | x)
            log_ref_w  = pi_ref.log_prob(y_w | x)
            log_ref_l  = pi_ref.log_prob(y_l | x)

            # 2. 隐式奖励差异
            reward_w    = beta * (log_pi_w - log_ref_w)
            reward_l    = beta * (log_pi_l - log_ref_l)
            reward_diff = reward_w - reward_l

            # 3. 二分类交叉熵 = -log(sigmoid(diff))
            loss = -log(sigmoid(reward_diff))

            # 4. 反向传播
            loss.backward()
            optimizer.step()
```

##### 4. 梯度分析 — DPO 学到了什么？

对 DPO 损失求梯度（论文 Eq.7）：

$$\nabla_\theta \mathcal{L}_{\text{DPO}} = -\beta \mathbb{E}_{(x, y_w, y_l) \sim \mathcal{D}} \left[ \sigma(\hat{r}_\theta(x, y_l) - \hat{r}_\theta(x, y_w)) \cdot \left[ \nabla_\theta \log \pi(y_w|x) - \nabla_\theta \log \pi(y_l|x) \right] \right]$$

此梯度公式揭示的学习机制：
- **自适应加权**：\(\sigma(\hat{r}_\theta(x, y_l) - \hat{r}_\theta(x, y_w))\) 当模型「搞反了」（给非偏好响应更高隐式奖励）时接近 1，梯度更新大；已正确区分时接近 0，梯度自然衰减
- **对比方向**：+∇θ log π(y_w|x) 拉高偏好响应概率，-∇θ log π(y_l|x) 压低非偏好响应概率。本质上是对偏好数据的**对比学习**
- 直觉：DPO 像「拉-推」机制——往偏好方向拉、推开非偏好方向，力度自适应：错越多，纠正越猛

##### 5. 与 PPO-RLHF 的本质差异

| 维度 | PPO-RLHF | DPO |
|------|----------|-----|
| **奖励建模** | 需显式训练 Reward Model | 无需，策略隐式编码奖励 |
| **优化方式** | 强化学习（PPO），需在线采样 | 监督式分类损失，纯离线 |
| **训练稳定性** | 易崩溃，需大量调参 | 稳定，标准交叉熵优化 |
| **计算开销** | 高（4 模型：Policy + Value + Reward + Ref） | 低（2 模型：Policy + Ref） |
| **采样需求** | 每步需从策略在线采样 | 仅需离线偏好数据集 |
| **超参数** | 学习率、KL 系数、clip 范围、GAE 参数… | 仅 β（KL 惩罚系数）和学习率 |

> ⚠️ **注意**：β 是 DPO 最关键的参数。过小→偏离参考模型过远（reward hacking 风险），过大→过于保守（学习不充分）。论文经验值 β ∈ [0.01, 0.5] 按任务调节。

##### 6. 实验验证要点

DPO 在三大任务上验证：
- **情感控制**（IMDb）：控制正/负面情感倾向优于 PPO-RLHF，生成文本质量波动更小
- **摘要生成**（TL;DR/Reddit）：Rouge 和人评 Win Rate 匹配或超越已有方法
- **单轮对话**（Anthropic HH）：与 Pythia 6.9B 组合，达到与更大 PPO 模型相当的对话质量

#### 🧪 练习题

```yaml
question: "DPO 方法中，为什么分区函数 Z(x) 不会出现在最终的损失函数中？"
options:
  - "因为 Z(x) 可通过蒙特卡洛采样近似计算"
  - "Bradley-Terry 模型只依赖奖励之差，代入重参数化后 Z(x) 项相减抵消"
  - "因为 DPO 不需要参考模型所以 Z(x)=1"
  - "训练时自动学习了一个归一化层吸收 Z(x)"
answer: 1
explain: "重参数化 r(x,y)=β log(π_r/π_ref)+β log Z(x) 代入 Bradley-Terry 后两个 Z(x) 相减自消，这是 DPO 避免显式估计分区函数的核心设计。"
```