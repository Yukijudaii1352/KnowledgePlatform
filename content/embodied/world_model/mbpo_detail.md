### 基于模型的策略优化 (MBPO)

```yaml
id: mbpo
name: MBPO
full_name: "基于模型的策略优化 (Model-Based Policy Optimization)"
year: 2019.12
org: UC Berkeley
paper_url: "https://arxiv.org/abs/1906.08253"
category: planning
parent: "—"
motivation: "短步长模型生成数据极大提升样本效率"
```

#### 📝 一句话总结

MBPO 提出从真实数据状态出发、利用学习到的动力学模型进行短步长分支 rollout 来生成训练数据，并给出了基于模型误差和 rollout 长度的单调改进理论保证，在连续控制任务上实现了比无模型方法快一个数量级的样本效率，同时保持了相当的渐近性能。

#### 🎯 核心要点

- **分支 rollout 机制**：从真实经验回放池中采样状态，用学习到的模型执行 \(k\) 步短 rollout，而非从初始状态分布开始长 rollout，有效控制模型误差累积
- **单调改进理论保证**：Theorem 4.1 给出模型下策略回报与真实回报的下界关系；Theorem 4.2 证明分支 rollout 的误差随 \(k\) 线性增长而非随 \(1/(1-\gamma)\) 二次增长
- **概率集成模型**：使用多个概率神经网络（输出高斯分布的均值和方差）组成的集成模型作为动力学模型，同时捕获认知不确定性和随机不确定性
- **高梯度更新比**：短 rollout 生成的大量模型数据使得每个真实环境步可执行 20–40 次策略梯度更新（远高于纯无模型方法的稳定上限）
- **基于 SAC 的策略优化**：在模型生成数据上使用 Soft Actor-Critic 进行策略学习，继承其最大熵框架的探索优势
- **模型泛化分析**：实验表明训练数据越多，模型对策略分布偏移的敏感度越低（\(\mathrm{d}\epsilon_{m'}/\mathrm{d}\epsilon_\pi\) 递减），为使用更长 rollout 提供了实践依据

#### 🔬 深入细节

##### 动机与背景

基于模型的强化学习（MBRL）通过学习环境动力学模型来提升样本效率，但长期以来面临一个核心困境：**模型误差在多步预测中会指数级累积**，导致策略在模型中被"利用"（model exploitation），学到的策略在真实环境中表现很差。

传统的 Dyna 风格方法从初始状态分布开始做完整 episode 的模型 rollout，误差随 horizon 长度急剧放大。而纯无模型方法（如 SAC、PPO）虽然渐近性能好，但需要大量真实交互样本。MBPO 的核心问题是：**能否找到一种"恰到好处"的模型使用方式，既利用模型提升效率，又不被模型误差拖累？**

##### 理论框架：单调改进下界

MBPO 的理论基础建立在策略改进下界之上。首先定义关键符号：

- \(\eta[\pi]\)：策略 \(\pi\) 在**真实环境**中的期望回报
- \(\hat{\eta}[\pi]\)：策略 \(\pi\) 在**学习到的模型**中的期望回报
- \(\epsilon_m = \max_t \mathbb{E}_{s \sim \pi_t} [D_{\mathrm{TV}}(p(s'|s,a) \| \hat{p}(s'|s,a))]\)：模型误差（TV 距离）
- \(\epsilon_\pi = \max_t \mathbb{E}_{s \sim d_{\pi_D}^t} [D_{\mathrm{TV}}(\pi \| \pi_D)]\)：策略偏移

**Theorem 4.1（模型下的单调改进）**：

$$\eta[\pi] \geq \hat{\eta}[\pi] - C(\epsilon_m, \epsilon_\pi)$$

其中惩罚项 \(C\) 同时依赖模型误差 \(\epsilon_m\) 和策略偏移 \(\epsilon_\pi\)。这意味着：只要模型足够准确且策略更新幅度受控，在模型中改进策略就能保证在真实环境中也改进。

> 💡 **关键直觉**：该 bound 将"信任模型的程度"量化为两个可控量——模型精度和策略变化幅度。

**Theorem 4.2（分支 rollout 的更紧下界）**：

对于从真实数据分布 \(d_{\pi_D}\) 出发、在模型中执行 \(k\) 步的分支 rollout：

$$\eta[\pi] \geq \hat{\eta}_k^{\mathrm{branch}}[\pi] - 2r_{\max}\left[\frac{\gamma^{k+1}\epsilon_\pi}{(1-\gamma)^2} + \frac{\gamma^k + 2}{1-\gamma}\epsilon_\pi + \frac{k}{1-\gamma}(\epsilon_m + 2\epsilon_\pi)\right]$$

> ⚠️ **注意**：bound 中有两个竞争因素——随 \(k\) 指数衰减的项（来自真实数据的"锚定"效应）和随 \(k\) 线性增长的项（模型误差累积）。这意味着存在一个最优的 rollout 长度 \(k^*\)，在理论上平衡了模型利用与误差控制。

##### 模型泛化的实证分析

理论 bound 在字面意义上取最大值时 \(k=0\)（即完全不用模型），这是因为分析对模型泛化能力做了最悲观的假设。论文通过实验发现：

![模型泛化分析](https://ar5iv.labs.arxiv.org/html/1906.08253/assets/x1.png)
*图 1：(a) 模型误差随策略偏移的变化——训练数据越多，误差增长越慢；(b) 模型误差对策略偏移的局部导数 \(\mathrm{d}\epsilon_{m'}/\mathrm{d}\epsilon_\pi\) 随训练数据量递减，说明模型泛化能力随数据增加而增强。*

实验表明模型误差对策略偏移的敏感度可以用线性近似：

$$\hat{\epsilon}_{m'}(\epsilon_\pi) \approx \epsilon_m + \epsilon_\pi \cdot \frac{\mathrm{d}\epsilon_{m'}}{\mathrm{d}\epsilon_\pi}$$

当 \(\mathrm{d}\epsilon_{m'}/\mathrm{d}\epsilon_\pi < 2\) 时（实验中训练数据充足时成立），这比理论中悲观的 \(\epsilon_m + 2\epsilon_\pi\) 上界更紧，使得更长的 rollout 在实践中变得可行。

##### 算法：实用 MBPO

```python
# Algorithm 2: Model-Based Policy Optimization (MBPO)
初始化策略 π_φ, 环境回放池 D_env, 模型回放池 D_model
for N epochs:
    # 1. 训练动力学模型
    在 D_env 上通过最大似然训练模型集成 p_θ

    for E environment steps:
        # 2. 真实环境交互
        用 π_φ 在环境中执行动作, 将 (s, a, r, s') 加入 D_env

        # 3. 模型分支 rollout
        for M model rollouts:
            从 D_env 中均匀采样状态 s_t
            从 s_t 出发, 用 π_φ 在模型 p_θ 中执行 k 步 rollout
            将生成的 (s, a, r, s') 加入 D_model

        # 4. 策略优化（高更新比）
        for G gradient updates:  # G = 20~40, 远高于无模型方法
            φ ← φ - λ_π · ∇̂_φ J_π(φ, D_model)
```

> 💡 **关键设计**：即使 rollout 长度 \(k\) 很短（甚至 \(k=1\)），通过执行大量（\(M\) 次）短 rollout，仍可生成足够多的模型数据来支撑高频策略更新。这是 MBPO 能做到每个环境步 20–40 次梯度更新的关键。

##### 核心机制详解

**1. 概率集成动力学模型**

模型由 \(B\) 个独立的概率神经网络组成（论文中 \(B=7\)，每次 rollout 随机选 5 个），每个网络输出下一状态的高斯分布参数：

$$\hat{p}_{\theta_b}(s_{t+1} | s_t, a_t) = \mathcal{N}(\mu_{\theta_b}(s_t, a_t),\; \Sigma_{\theta_b}(s_t, a_t))$$

- **随机不确定性**（aleatoric）：由每个网络输出的方差 \(\Sigma_{\theta_b}\) 捕获
- **认知不确定性**（epistemic）：由集成中不同网络预测的分歧捕获

训练损失为负对数似然：

$$\mathcal{L}(\theta_b) = -\sum_{(s,a,s') \in \mathcal{D}_{\text{env}}} \log \hat{p}_{\theta_b}(s' | s, a)$$

**2. 分支 rollout 与数据混合**

与传统 Dyna 从初始状态分布 rollout 不同，MBPO 从 \(\mathcal{D}_{\text{env}}\) 中均匀采样真实状态作为 rollout 起点。这保证了：
- rollout 起始状态分布接近真实策略的状态访问分布
- 短步长 rollout 的状态不会偏离真实分布太远
- 模型只需在真实数据附近的局部区域保持准确

**3. 与传统方法的关键区别**

| 方法 | rollout 起点 | rollout 长度 | 数据用途 |
|------|------------|-------------|---------|
| Dyna / SLBO | 初始状态分布 | 完整 episode | 策略训练 |
| MVE / STEVE | 真实数据 | 短 | 值函数目标改进 |
| **MBPO** | **真实数据** | **短（1–15步）** | **策略训练** |

MBPO 结合了两个优势：从真实数据出发（控制分布偏移）+ 用模型数据直接训练策略（比仅改进值目标更充分利用模型）。

##### 实验结果

![训练曲线](https://ar5iv.labs.arxiv.org/html/1906.08253/assets/x2.png)
*图 2：MBPO 与五个基线在 MuJoCo 连续控制任务上的学习曲线。MBPO 在 Ant 任务上 30 万步达到 SAC 300 万步的性能，样本效率提升约 10 倍。*

关键实验发现：

- **样本效率**：MBPO 在所有任务上比 SAC 快约 10 倍，在 Hopper 和 Walker2d 上分别仅需 14 分钟和 40 分钟的等效实时仿真
- **渐近性能**：与最优无模型方法（SAC）相当，远超纯模型方法（PETS 在高维 Ant 任务上失败）
- **消融实验**：
  - 仅提高无模型 SAC 的梯度更新比（不用模型数据）无法匹配 MBPO，证明模型数据确实有帮助
  - 固定 \(k=1\) 的单步 rollout 已能获得大部分收益，验证了理论分析中"短 rollout 最优"的结论
  - 模型足够准确支持 200 步 rollout，但用于策略优化时短 rollout 效果更好；500 步 rollout 则误差过大

![消融实验](https://ar5iv.labs.arxiv.org/html/1906.08253/assets/x3.png)
*图 3：消融实验——无模型高更新比、不同 rollout 长度、值展开对比。单步 rollout 提供了一个难以超越的强基线。*

#### 🧪 练习题

```yaml
question: "MBPO 中分支 rollout 从哪里采样起始状态？"
options:
  - "从环境的初始状态分布中采样"
  - "从真实经验回放池中均匀采样已访问过的状态"
  - "从模型生成的虚拟状态中采样"
  - "从当前策略的在线轨迹末端状态采样"
answer: 1
explain: "MBPO 的核心设计是从真实经验回放池 D_env 中均匀采样状态作为模型 rollout 的起点（Algorithm 2 第 7 行），这保证了 rollout 起始分布接近真实数据分布，从而控制模型误差累积。"
```