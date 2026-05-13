### GRPO — 组相对策略优化 (Group Relative Policy Optimization)

```yaml
id: grpo
name: GRPO
full_name: "组相对策略优化 (Group Relative Policy Optimization)"
year: 2024
org: DeepSeek
paper_url: "https://arxiv.org/abs/2402.03300"
category: frontier
parent: dpo
motivation: "组内相对奖励提升训练稳定性"
```

#### 📝 一句话总结

GRPO 提出了一种无需价值模型（Critic-free）的策略优化方法，通过对同一问题采样一组输出并利用组内相对奖励归一化来估计优势函数，在大幅降低训练资源开销的同时实现了与 PPO 相当甚至更优的数学推理性能。

#### 🎯 核心要点

- **去除 Value Model**：不再需要与 Policy Model 同等规模的价值网络，显著降低显存和计算开销
- **组内采样与相对排名**：对每个问题采样 \(G\) 个输出，利用组内奖励的均值和标准差进行归一化，替代 GAE 优势估计
- **PPO-style 裁剪目标函数**：保留 PPO 的 clip 机制约束策略更新幅度，确保训练稳定性
- **序列级 KL 散度正则化**：将 KL 惩罚从 token 级移至序列级，直接加入损失函数而非嵌入奖励
- **支持 Outcome 与 Process 两种监督模式**：Outcome Supervision 在输出末尾给出单一奖励，Process Supervision 在每个推理步骤末尾给出奖励
- **迭代式 RL 训练**：采用在线迭代策略，每轮更新参考模型并持续训练奖励模型，防止奖励 hacking
- **在 DeepSeekMath 7B 上验证**：数学推理基准（GSM8K、MATH、CMATH 等）上超越同规模甚至更大模型

#### 🔬 深入细节

##### 核心示意图

![PPO 与 GRPO 对比示意图](https://ar5iv.labs.arxiv.org/html/2402.03300v2/assets/x4.png)
*图：PPO 需要额外的 Value Model 通过 GAE 估计优势函数；GRPO 去除 Value Model，直接从组内采样的多个输出的相对奖励中估计优势，大幅减少训练资源。*

##### 算法伪代码

```
Algorithm: GRPO (Group Relative Policy Optimization)
────────────────────────────────────────────────────
Input: 奖励模型 r_φ, 任务提示集 D, 超参数 ε, β, μ

1. 初始化策略模型 π_θ ← π_θ_init
2. for iteration = 1, ..., I do
3.     更新参考模型 π_ref ← π_θ
4.     for step = 1, ..., M do
5.         采样 batch D_b ⊂ D
6.         更新旧策略 π_θ_old ← π_θ
7.         对每个问题 q ∈ D_b，采样 G 个输出:
              {o_1, ..., o_G} ~ π_θ_old(·|q)
8.         计算每个输出的奖励: {r_1, ..., r_G} = r_φ(q, o_i)
9.         组内归一化: Â_i = (r_i - mean(r)) / std(r)
10.        for GRPO iteration = 1, ..., μ do
11.            最大化 GRPO 目标函数更新 π_θ
12.        更新奖励模型 r_φ (replay mechanism)
13. Output: π_θ
```

##### 动机与背景

**PPO 在 LLM 场景下的痛点：** 标准 PPO 算法在 RLHF 中需要维护四个模型——Policy Model、Value Model、Reward Model 和 Reference Model。其中 Value Model 通常与 Policy Model 同等规模，这带来了巨大的显存和计算负担。更关键的是，在 LLM 场景下，奖励模型通常只在最后一个 token 处给出奖励分数，这使得训练一个在每个 token 位置都准确的 Value Model 变得困难且低效。

> 💡 **关键洞察**：既然 LLM 的奖励通常是序列级别的（只在输出末尾给出），那么是否可以完全绕过 token 级别的价值估计，直接利用多个完整输出之间的相对比较来估计优势？

##### 核心机制：从 PPO 到 GRPO

**PPO 的目标函数**回顾：

$$\mathcal{J}_{\text{PPO}}(\theta) = \mathbb{E}\left[\frac{1}{|o|}\sum_{t=1}^{|o|}\min\left(\frac{\pi_\theta(o_t|q,o_{<t})}{\pi_{\theta_{\text{old}}}(o_t|q,o_{<t})}A_t,\;\text{clip}\left(\frac{\pi_\theta(o_t|q,o_{<t})}{\pi_{\theta_{\text{old}}}(o_t|q,o_{<t})}, 1-\varepsilon, 1+\varepsilon\right)A_t\right)\right]$$

其中优势 \(A_t\) 通过 GAE（Generalized Advantage Estimation）基于 Value Model \(V_\psi\) 计算。

**GRPO 的核心改进**在于用组内相对奖励替代 GAE：

$$\mathcal{J}_{\text{GRPO}}(\theta) = \mathbb{E}\left[\frac{1}{G}\sum_{i=1}^{G}\frac{1}{|o_i|}\sum_{t=1}^{|o_i|}\min\left(\frac{\pi_\theta(o_{i,t}|q,o_{i,<t})}{\pi_{\theta_{\text{old}}}(o_{i,t}|q,o_{i,<t})}\hat{A}_{i,t},\;\text{clip}\left(\frac{\pi_\theta(o_{i,t}|q,o_{i,<t})}{\pi_{\theta_{\text{old}}}(o_{i,t}|q,o_{i,<t})}, 1-\varepsilon, 1+\varepsilon\right)\hat{A}_{i,t}\right) - \beta\;\mathbb{D}_{\text{KL}}\left(\pi_\theta \| \pi_{\text{ref}}\right)\right]$$

其中 KL 散度项为序列级别的估计：

$$\mathbb{D}_{\text{KL}}\left(\pi_\theta \| \pi_{\text{ref}}\right) = \frac{\pi_{\text{ref}}(o_{i,t}|q,o_{i,<t})}{\pi_\theta(o_{i,t}|q,o_{i,<t})} - \log\frac{\pi_{\text{ref}}(o_{i,t}|q,o_{i,<t})}{\pi_\theta(o_{i,t}|q,o_{i,<t})} - 1$$

##### 优势函数的组内归一化

这是 GRPO 最核心的设计。对于每个问题 \(q\)，从旧策略 \(\pi_{\theta_{\text{old}}}\) 中采样 \(G\) 个输出 \(\{o_1, o_2, \cdots, o_G\}\)，然后由奖励模型打分得到 \(\mathbf{r} = \{r_1, r_2, \cdots, r_G\}\)。

**Outcome Supervision** 模式下，每个输出的所有 token 共享同一个归一化后的优势值：

$$\hat{A}_{i,t} = \tilde{r}_i = \frac{r_i - \text{mean}(\mathbf{r})}{\text{std}(\mathbf{r})}$$

> 💡 **直觉理解**：这本质上是一种"相对评分"——不关心绝对奖励值的高低，只关心同一组内谁比谁好。如果一个输出的奖励高于组内平均，它获得正优势（被鼓励）；低于平均则获得负优势（被抑制）。标准差归一化确保了优势值的尺度稳定。

**Process Supervision** 模式下，过程奖励模型对每个推理步骤末尾给出奖励，归一化在所有步骤的奖励上进行：

$$\tilde{r}_i^{\text{index}(j)} = \frac{r_i^{\text{index}(j)} - \text{mean}(\mathbf{R})}{\text{std}(\mathbf{R})}$$

每个 token 的优势值设为其所在推理步骤末尾的归一化奖励。

##### KL 散度约束的设计变化

与 PPO 不同，GRPO 将 KL 散度惩罚从嵌入奖励中移出，直接作为损失函数的正则项。PPO 中 KL 惩罚是 token 级别地加入奖励信号：

$$r_t = r_\varphi(q, o_{\leq t}) - \beta \log\frac{\pi_\theta(o_t|q,o_{<t})}{\pi_{\text{ref}}(o_t|q,o_{<t})}$$

而 GRPO 采用序列级 KL 散度，直接减去 \(\beta \cdot \mathbb{D}_{\text{KL}}\)。这种设计更加简洁，且避免了 KL 惩罚对优势估计的干扰。

> ⚠️ **注意**：GRPO 使用的 KL 散度采用了非对称形式 \(\frac{p}{q} - \log\frac{p}{q} - 1\)，这是 KL 散度的一种无偏估计，相比直接用 \(\log\frac{p}{q}\) 具有更好的数值稳定性。

##### 迭代式训练与奖励模型更新

GRPO 采用迭代式在线 RL 训练策略：

1. **外循环**（Iteration）：每轮开始时将当前策略模型同步为参考模型 \(\pi_{\text{ref}} \leftarrow \pi_\theta\)
2. **内循环**（Step）：在每个 step 中，采样 batch → 生成 G 个输出 → 计算奖励 → 多次 GRPO 更新
3. **奖励模型持续训练**：通过 replay 机制持续更新奖励模型，防止策略模型"欺骗"固定的奖励模型（reward hacking）

##### 与传统方法的关键区别

| 特性 | PPO | GRPO |
|------|-----|------|
| Value Model | 需要（与 Policy 同规模） | **不需要** |
| 优势估计 | GAE（基于 Value Model） | **组内相对奖励归一化** |
| KL 惩罚位置 | 嵌入 token 级奖励 | **序列级损失正则项** |
| 采样策略 | 每个问题 1 个输出 | **每个问题 G 个输出** |
| 训练资源 | 4 个模型同时加载 | **3 个模型（省去 Value Model）** |
| 奖励模型 | 固定 | **可迭代更新** |

GRPO 的设计哲学是：**利用同一问题的多个输出之间的相对比较来替代绝对的价值估计**，这在 LLM 的序列级奖励场景下既自然又高效。

#### 🧪 练习题

```yaml
question: "GRPO 相比 PPO 最核心的改进是什么？"
options:
  - "使用更大的学习率加速收敛"
  - "去除 Value Model，通过组内采样输出的相对奖励归一化来估计优势函数"
  - "引入更复杂的奖励模型提升奖励精度"
  - "将策略梯度替换为进化策略以避免梯度消失"
answer: 1
explain: "GRPO 的核心创新是去除 Value Model，对每个问题采样 G 个输出，利用组内奖励的均值和标准差归一化作为优势估计，大幅降低训练资源同时保持性能。"
```