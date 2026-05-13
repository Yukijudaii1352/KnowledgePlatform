### DPO — 直接偏好优化 (Direct Preference Optimization)

```yaml
id: dpo
name: DPO
full_name: "直接偏好优化 (Direct Preference Optimization)"
year: 2023
org: Stanford
paper_url: https://arxiv.org/abs/2305.18290
category: llm_safety
parent: rlhf
motivation: "将RLHF简化为分类损失，无需奖励模型"
```

#### 📝 一句话总结

DPO 通过推导 KL 约束奖励最大化目标的闭式最优策略解，将传统 RLHF 的"训练奖励模型 + 强化学习微调"两阶段流程简化为直接在人类偏好数据上优化的二元交叉熵分类损失，完全消除了对显式奖励模型和 RL 采样的需求。

#### 🎯 核心要点

- **无需奖励模型**：跳过 RLHF 中的奖励建模阶段，直接利用偏好对 \((y_w, y_l)\) 优化策略
- **闭式最优策略**：推导出 KL 约束 RL 目标下最优策略 \(\pi^*(y|x) \propto \pi_{\text{ref}}(y|x) \exp\!\bigl(\tfrac{1}{\beta} r^*(x,y)\bigr)\) 的解析解
- **奖励重参数化**：将奖励函数表示为策略对数比 \(r(x,y) = \beta \log \frac{\pi_\theta(y|x)}{\pi_{\text{ref}}(y|x)} + \beta \log Z(x)\)，代入 Bradley-Terry 模型消去配分函数
- **DPO 损失函数**：最终形式为简洁的 sigmoid 交叉熵损失，仅涉及策略模型与参考模型的对数概率差
- **隐式奖励与梯度加权**：梯度分析表明 DPO 自动以隐式奖励的估计误差为权重调整更新幅度，对已正确排序的样本降低梯度
- **仅需 2 个模型**：训练时只需当前策略 \(\pi_\theta\) 和冻结的参考策略 \(\pi_{\text{ref}}\)，无需 Value Model 和 Reward Model
- **理论保证**：在 Bradley-Terry 偏好模型下，DPO 优化器与标准 RLHF 管线具有相同的全局最优解

#### 🔬 深入细节

![DPO 核心流程对比图](https://ar5iv.labs.arxiv.org/html/2305.18290/assets/figures/diagrams/teaser.png)
*图：DPO 与传统 RLHF 流程对比。传统方法需要先训练奖励模型再用 PPO 做 RL 微调；DPO 直接在偏好数据上用分类损失优化策略，大幅简化流程。*

##### 算法伪代码

```python
# DPO 训练伪代码
# 输入: 偏好数据集 D = {(x, y_w, y_l)}, 参考策略 π_ref, 温度 β
# 输出: 对齐后的策略 π_θ

π_θ = copy(π_ref)  # 从参考策略（通常为 SFT 模型）初始化

for batch in DataLoader(D):
    x, y_w, y_l = batch  # prompt, 偏好回答, 非偏好回答
    
    # 计算当前策略和参考策略的对数概率
    log_πθ_w  = π_θ.log_prob(y_w | x)
    log_πθ_l  = π_θ.log_prob(y_l | x)
    log_πref_w = π_ref.log_prob(y_w | x)   # 冻结，不计算梯度
    log_πref_l = π_ref.log_prob(y_l | x)
    
    # 计算隐式奖励差
    log_ratio_w = log_πθ_w - log_πref_w
    log_ratio_l = log_πθ_l - log_πref_l
    logits = β * (log_ratio_w - log_ratio_l)
    
    # DPO 损失：负对数 sigmoid
    loss = -log_sigmoid(logits).mean()
    
    optimizer.zero_grad()
    loss.backward()
    optimizer.step()
```

##### 1. 动机与背景：RLHF 的复杂性问题

传统 RLHF 流程包含三个阶段：(1) 监督微调 (SFT)；(2) 在偏好数据上训练 Bradley-Terry 奖励模型；(3) 用 PPO 等 RL 算法在 KL 约束下最大化奖励。这一流程存在多个痛点：

- **训练复杂度高**：需要同时维护 4 个模型（Policy、Reference、Reward、Value），显存开销巨大
- **RL 训练不稳定**：PPO 对超参数（裁剪系数、学习率、GAE 参数等）极为敏感
- **采样开销大**：每轮优化都需要从当前策略采样生成完整回答，计算成本高昂

DPO 的核心洞察是：**奖励模型只是偏好数据到策略优化之间的中间产物，可以被数学推导消除**。

##### 2. 核心推导：从 RL 目标到分类损失

**第一步：KL 约束 RL 目标的闭式解。** RLHF 的标准优化目标为：

$$\max_{\pi_\theta} \; \mathbb{E}_{x \sim \mathcal{D},\, y \sim \pi_\theta(y|x)} \bigl[ r_\phi(x, y) \bigr] - \beta \, D_{\text{KL}}\!\bigl[\pi_\theta(y|x) \,\|\, \pi_{\text{ref}}(y|x)\bigr]$$

其中 \(\beta\) 控制策略偏离参考模型的程度。通过将目标展开并利用变分法（或直接验证），可以得到最优策略的**闭式解**：

$$\pi^*(y|x) = \frac{1}{Z(x)} \, \pi_{\text{ref}}(y|x) \, \exp\!\Bigl(\frac{1}{\beta} \, r(x, y)\Bigr)$$

其中 \(Z(x) = \sum_y \pi_{\text{ref}}(y|x) \exp\!\bigl(\frac{1}{\beta} r(x,y)\bigr)\) 是配分函数（归一化常数）。

> 💡 **直觉**：最优策略在参考策略的基础上，按奖励值做指数加权调整——奖励越高的回答概率越大，\(\beta\) 越小偏离越激进。

**第二步：奖励的重参数化。** 对上式两边取对数并重新整理，可以将奖励表示为策略的函数：

$$r(x, y) = \beta \log \frac{\pi^*(y|x)}{\pi_{\text{ref}}(y|x)} + \beta \log Z(x)$$

这是 DPO 最关键的等式——它将奖励函数用最优策略与参考策略的对数比来表达。

**第三步：代入 Bradley-Terry 模型消去配分函数。** Bradley-Terry 偏好模型假设人类偏好概率为：

$$p^*(y_w \succ y_l | x) = \sigma\!\bigl(r^*(x, y_w) - r^*(x, y_l)\bigr)$$

将重参数化的奖励代入上式，由于 \(\beta \log Z(x)\) 在 \(y_w\) 和 \(y_l\) 中相同，**配分函数被完美消去**：

$$p^*(y_w \succ y_l | x) = \sigma\!\left(\beta \log \frac{\pi^*(y_w|x)}{\pi_{\text{ref}}(y_w|x)} - \beta \log \frac{\pi^*(y_l|x)}{\pi_{\text{ref}}(y_l|x)}\right)$$

**第四步：DPO 损失函数。** 用可训练策略 \(\pi_\theta\) 替代 \(\pi^*\)，对偏好数据做最大似然估计，得到 DPO 损失：

$$\mathcal{L}_{\text{DPO}}(\pi_\theta; \pi_{\text{ref}}) = -\mathbb{E}_{(x, y_w, y_l) \sim \mathcal{D}} \left[ \log \sigma\!\left(\beta \log \frac{\pi_\theta(y_w|x)}{\pi_{\text{ref}}(y_w|x)} - \beta \log \frac{\pi_\theta(y_l|x)}{\pi_{\text{ref}}(y_l|x)}\right) \right]$$

> 💡 **关键**：这是一个标准的二元交叉熵损失。输入的 logit 是偏好回答与非偏好回答在"隐式奖励"（即 \(\beta \log \frac{\pi_\theta}{\pi_{\text{ref}}}\)）上的差值。整个损失只需要前向传播计算对数概率，无需 RL 采样。

##### 3. 梯度分析与隐式奖励机制

DPO 损失的梯度具有直观的解释：

$$\nabla_\theta \mathcal{L}_{\text{DPO}} = -\beta \, \mathbb{E} \Big[ \underbrace{\sigma\!\bigl(\hat{r}_\theta(x,y_l) - \hat{r}_\theta(x,y_w)\bigr)}_{\text{隐式奖励排序错误的权重}} \Big[ \underbrace{\nabla_\theta \log \pi_\theta(y_w|x)}_{\text{增大偏好回答概率}} - \underbrace{\nabla_\theta \log \pi_\theta(y_l|x)}_{\text{减小非偏好回答概率}} \Big] \Big]$$

其中 \(\hat{r}_\theta(x,y) = \beta \log \frac{\pi_\theta(y|x)}{\pi_{\text{ref}}(y|x)}\) 是隐式奖励。

梯度的权重项 \(\sigma(\hat{r}_\theta(y_l) - \hat{r}_\theta(y_w))\) 反映了当前模型对偏好排序的"错误程度"：
- 当模型已经正确地给 \(y_w\) 更高的隐式奖励时，权重接近 0，梯度很小
- 当模型错误地偏好 \(y_l\) 时，权重接近 1，梯度最大

> ⚠️ **注意**：这种自适应加权是 DPO 的内在机制，无需额外设计。它同时起到了正则化的作用——防止模型在已经正确排序的样本上过度优化而偏离参考策略。

##### 4. DPO 与 RLHF 的理论等价性

论文在理论上证明了两个关键结果：

1. **全局最优等价**：在 Bradley-Terry 偏好模型假设下，DPO 的全局最优解与标准 RLHF 管线（奖励学习 + KL 约束 RL）的全局最优解一致。
2. **隐式奖励模型**：DPO 训练得到的策略 \(\pi_\theta\) 隐式定义了一个奖励模型 \(\hat{r}(x,y) = \beta \log \frac{\pi_\theta(y|x)}{\pi_{\text{ref}}(y|x)}\)，该奖励模型在 Plackett-Luce（BT 模型的推广）框架下是一致的。

##### 5. 与传统 RLHF 方法的对比

| 维度 | RLHF (PPO) | DPO |
|------|-----------|-----|
| 训练阶段 | SFT → 奖励建模 → RL 微调 | SFT → 偏好优化（单阶段） |
| 所需模型数 | 4 个（Policy, Ref, Reward, Value） | 2 个（Policy, Ref） |
| 是否需要采样 | 是（每轮从策略采样） | 否（离线偏好数据） |
| 损失函数 | PPO 裁剪目标 + Value Loss | 二元交叉熵 |
| 超参数敏感度 | 高（ε, GAE λ, 学习率等） | 低（主要是 β） |
| 训练稳定性 | 较差，易崩溃 | 稳定，类似监督学习 |
| 理论最优解 | 相同（在 BT 模型下） | 相同（在 BT 模型下） |

##### 6. 实验验证

论文在三个任务上验证了 DPO 的有效性：

- **情感控制**（IMDb 评论生成）：DPO 在奖励-KL 前沿上优于 PPO，以更小的 KL 散度达到更高的奖励
- **摘要生成**（TL;DR 数据集）：DPO 在 GPT-4 评估的胜率上与 PPO 相当或更优，且训练效率更高
- **单轮对话**（Anthropic-HH）：DPO 是唯一在 GPT-4 评估中超过人类标注偏好回答的方法

#### 🧪 练习题

```yaml
question: "DPO 推导中配分函数 Z(x) 被消去的关键原因是什么？"
options:
  - "配分函数在训练过程中趋近于 1"
  - "Bradley-Terry 模型只依赖奖励差值，配分函数在相减时抵消"
  - "参考策略的归一化性质使配分函数为常数"
  - "DPO 使用了蒙特卡洛采样来近似配分函数"
answer: 1
explain: "Bradley-Terry 偏好模型 p(y_w ≻ y_l) = σ(r(y_w) - r(y_l)) 只依赖两个回答的奖励差值。将重参数化奖励 r = β log(π/π_ref) + β log Z(x) 代入后，Z(x) 项在 y_w 和 y_l 中相同，相减时完美抵消。"
```