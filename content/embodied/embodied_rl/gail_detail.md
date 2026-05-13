### GAIL — 生成对抗模仿学习 (Generative Adversarial Imitation Learning)

```yaml
id: gail
name: GAIL
full_name: "生成对抗模仿学习 (Generative Adversarial Imitation Learning)"
year: 2016
org: Stanford
paper_url: "https://arxiv.org/abs/1606.03476"
category: skill_hierarchical
parent: "—"
motivation: "将GAN框架引入模仿学习，通过判别器区分专家与策略的状态-动作对来训练策略，绕过显式奖励函数恢复"
```

#### 📝 一句话总结

GAIL 将生成对抗网络 (GAN) 的思想引入模仿学习，提出通过最小化策略与专家的 **占用度量 (occupancy measure)** 之间的 Jensen-Shannon 散度来直接学习策略，绕过了传统逆强化学习中显式恢复奖励函数的中间步骤，在高维连续控制任务上以极少量专家演示实现了接近专家水平的表现。

#### 🎯 核心要点

- **理论基础——占用度量匹配**：证明了 IRL 本质上是寻找一个占用度量与专家匹配的策略，将模仿学习问题转化为分布匹配问题
- **GAN 式对抗训练框架**：策略网络 \(\pi_\theta\) 作为生成器，判别器网络 \(D_w\) 区分策略与专家的 (state, action) 对，二者交替优化
- **新型代价正则化器 \(\psi_{\text{GA}}\)**：其凸共轭恰好等价于 JS 散度，使得优化目标可以用判别器的分类损失表示
- **核心优化目标**：\(\min_\pi D_{\text{JS}}(\rho_\pi, \rho_{\pi_E}) - \lambda H(\pi)\)，其中 \(\lambda H(\pi)\) 为因果熵正则项
- **TRPO 策略更新**：使用 Trust Region Policy Optimization 进行策略步，防止策略因梯度噪声而剧烈变化
- **判别器即代价函数**：\(c(s,a) = \log D_w(s,a)\) 直接作为策略优化的代价信号，无需显式恢复奖励
- **实验验证**：在 9 个 MuJoCo 物理仿真环境上超越 Behavioral Cloning、FEM、GTAL 等基线，尤其在高维 Humanoid 任务上优势显著

#### 🔬 深入细节

##### 核心框架示意

![GAIL 实验结果：MuJoCo 连续控制任务上的性能对比](https://ar5iv.labs.arxiv.org/html/1606.03476/assets/x1.png)
*图：GAIL 在多个 MuJoCo 环境上与基线方法的性能对比。横轴为专家演示轨迹数，纵轴为归一化性能。GAIL（红色）在几乎所有任务和数据量设置下均达到或接近专家水平。*

##### 算法伪代码

```
Algorithm 1: Generative Adversarial Imitation Learning (GAIL)
──────────────────────────────────────────────────────
输入: 专家轨迹 τ_E ~ π_E, 初始参数 θ_0, w_0

for i = 0, 1, 2, ... do
    1. 采样当前策略轨迹: τ_i ~ π_{θ_i}

    2. 更新判别器 (Adam 梯度上升):
       w_{i+1} ← w_i + α_w · ∇_w [ Ê_{τ_i}[log D_w(s,a)]
                                    + Ê_{τ_E}[log(1 - D_w(s,a))] ]

    3. 更新策略 (TRPO 步):
       θ_{i+1} ← TRPO_step(θ_i, cost = log D_{w_{i+1}}(s,a))
       即: 以 log D_w(s,a) 为代价函数，用 TRPO 减小期望代价

end for

输出: 学到的策略 π_{θ}
```

##### 动机与背景

**传统模仿学习的困境：** 从专家演示中学习策略有两条经典路径：

1. **行为克隆 (Behavioral Cloning)**：将模仿学习视为监督学习，直接拟合 \(\pi(a|s)\)。简单高效，但受 **分布漂移 (distribution shift)** 问题困扰——策略执行时遇到的状态分布与训练数据不同，误差会随时间步指数累积（复合误差问题）。

2. **逆强化学习 (IRL)**：先从专家演示中恢复奖励函数 \(r(s,a)\)，再用 RL 优化策略。理论上更鲁棒，但存在两大瓶颈：(a) 奖励函数恢复本身是一个欠定问题（多个奖励可解释同一行为）；(b) 需要在内循环中反复求解完整的 RL 问题，计算代价极高。

> 💡 **关键洞察**：GAIL 的核心观察是——如果最终目标是获得策略而非奖励函数，那么 IRL 的中间步骤（恢复奖励）是不必要的。可以直接将模仿学习表述为策略的占用度量与专家占用度量之间的分布匹配问题。

##### 理论基础：占用度量 (Occupancy Measure)

论文的理论贡献建立在**占用度量**这一概念之上。对于策略 \(\pi\)，其占用度量定义为：

$$\rho_\pi(s,a) = \pi(a|s) \sum_{t=0}^{\infty} \gamma^t P(s_t = s | \pi)$$

这是策略在执行过程中访问各 (state, action) 对的折扣频率分布。论文证明了一个关键定理：

> ⚠️ **核心定理 (Theorem 2)**：策略与占用度量之间存在一一对应关系 \(\pi \leftrightarrow \rho_\pi\)。因此，匹配占用度量等价于匹配策略。

基于此，IRL 的一般形式可以写为：

$$\max_{c \in \mathcal{C}} \left( \min_\pi -H(\pi) + \mathbb{E}_\pi[c(s,a)] \right) - \mathbb{E}_{\pi_E}[c(s,a)]$$

其中 \(\mathcal{C}\) 是代价函数类。通过对偶变换，这等价于：

$$\min_\pi -H(\pi) + \psi^*(\rho_\pi - \rho_{\pi_E})$$

其中 \(\psi^*\) 是正则化器 \(\psi\) 的凸共轭。不同的正则化器 \(\psi\) 对应不同的 IRL/模仿学习算法。

##### 核心创新：\(\psi_{\text{GA}}\) 正则化器与 GAN 连接

GAIL 的关键创新在于提出了一个新的代价正则化器 \(\psi_{\text{GA}}\)：

$$\psi_{\text{GA}}(c) \triangleq \begin{cases} \mathbb{E}_{\pi_E}[g(c(s,a))] & \text{if } c < 0 \\ +\infty & \text{otherwise} \end{cases}$$

其中 \(g(x) = -x - \log(1 - e^x)\)（当 \(x < 0\) 时）。

这个看似复杂的正则化器有一个优美的性质——其凸共轭恰好等于 **GAN 的判别器目标**：

$$\psi_{\text{GA}}^*(\rho_\pi - \rho_{\pi_E}) = \max_{D \in (0,1)^{\mathcal{S} \times \mathcal{A}}} \mathbb{E}_\pi[\log D(s,a)] + \mathbb{E}_{\pi_E}[\log(1 - D(s,a))]$$

这正是二分类问题的最优负对数损失，等价于（相差常数）策略与专家占用度量之间的 **Jensen-Shannon 散度**：

$$D_{\text{JS}}(\rho_\pi, \rho_{\pi_E}) = D_{\text{KL}}\left(\rho_\pi \middle\| \frac{\rho_\pi + \rho_{\pi_E}}{2}\right) + D_{\text{KL}}\left(\rho_{\pi_E} \middle\| \frac{\rho_\pi + \rho_{\pi_E}}{2}\right)$$

> 💡 **GAN 类比**：策略 \(\pi\) 扮演 GAN 中生成器的角色——它生成 (state, action) 轨迹数据；判别器 \(D\) 试图区分策略生成的数据与专家数据。当判别器无法区分二者时，策略就成功模仿了专家。

##### 完整优化目标与训练流程

将因果熵 \(H(\pi)\) 作为策略正则项（由 \(\lambda \geq 0\) 控制），GAIL 的完整优化目标为：

$$\min_\pi \max_D \ \mathbb{E}_\pi[\log D(s,a)] + \mathbb{E}_{\pi_E}[\log(1 - D(s,a))] - \lambda H(\pi)$$

训练交替进行两步：

**Step 1 — 判别器更新（Adam 梯度上升）：** 固定策略 \(\pi_{\theta_i}\)，用采样的策略轨迹和专家轨迹更新判别器参数 \(w\)，使其更好地区分策略数据与专家数据：

$$\nabla_w \left[ \hat{\mathbb{E}}_{\tau_i}[\log D_w(s,a)] + \hat{\mathbb{E}}_{\tau_E}[\log(1 - D_w(s,a))] \right]$$

**Step 2 — 策略更新（TRPO 步）：** 将判别器输出 \(\log D_{w_{i+1}}(s,a)\) 作为代价函数，使用 TRPO 更新策略参数 \(\theta\)，使策略向"更像专家"的方向移动。TRPO 通过 KL 散度约束确保每步更新幅度可控：

$$\theta_{i+1} = \arg\min_\theta \ \mathbb{E}_{\pi_\theta}[\log D_{w_{i+1}}(s,a)] \quad \text{s.t.} \ \overline{D}_{\text{KL}}(\pi_{\theta_i}, \pi_\theta) \leq \delta$$

> ⚠️ **TRPO 的必要性**：由于策略梯度估计的高方差，普通梯度下降容易导致策略崩溃。TRPO 的信赖域约束是 GAIL 稳定训练的关键保障。

##### 与传统方法的对比

| 方法 | 是否需要恢复奖励 | 是否需要 RL 内循环 | 可扩展性 | 表达能力 |
|------|:---:|:---:|:---:|:---:|
| Behavioral Cloning | ✗ | ✗ | ✓ | 受分布漂移限制 |
| MaxEnt IRL | ✓ | ✓ | ✗（需枚举状态） | 受代价函数类限制 |
| 线性 Apprenticeship Learning | ✓ | ✓ | ✓（用 TRPO） | 仅线性代价函数 |
| **GAIL** | **✗** | **✗** | **✓** | **任意复杂行为** |

GAIL 的核心优势在于：
1. **绕过奖励恢复**：直接优化策略，避免了 IRL 的欠定性问题
2. **无需 RL 内循环**：判别器梯度步替代了完整的 RL 求解
3. **表达能力强**：神经网络判别器可以表示任意复杂的代价函数，不受线性/凸函数类限制
4. **数据高效**：在专家数据方面非常高效，少量演示即可学到良好策略

##### 实验亮点

论文在 9 个经典 MuJoCo 连续控制任务上进行了实验（CartPole、Mountain Car、Reacher、HalfCheetah、Hopper、Walker、Ant、Humanoid、Disabled Ant），对比了 4 种基线方法：

- **Behavioral Cloning**：直接监督学习
- **FEM (Feature Expectation Matching)**：线性代价函数的 IRL
- **GTAL (Game-Theoretic Apprenticeship Learning)**：凸代价函数的 IRL
- **Random**：随机策略

关键发现：
- GAIL 在几乎所有任务上以 ≥70% 的专家性能稳定运行
- 在高维 **Humanoid**（376 维观测）任务上，GAIL 在所有数据量设置下均达到 100% 专家性能，而 Behavioral Cloning 最高仅 60%
- FEM 和 GTAL 在 Ant 任务上甚至不如随机策略
- 因果熵正则化 \(\lambda > 0\) 在部分任务上有帮助，但 \(\lambda = 0\) 已经足够好

#### 🧪 练习题

```yaml
question: "GAIL 中判别器 D(s,a) 的输出在策略优化中扮演什么角色？"
options:
  - "直接作为策略网络的监督标签"
  - "作为策略优化的代价函数 c(s,a) = log D(s,a)"
  - "用于估计状态价值函数 V(s)"
  - "用于计算专家策略的占用度量"
answer: 1
explain: "GAIL 将 log D(s,a) 作为代价函数传入 TRPO 策略优化步骤。当 D 认为 (s,a) 来自策略（而非专家）时，log D 较大（代价高），驱动策略向专家行为靠拢。"
```