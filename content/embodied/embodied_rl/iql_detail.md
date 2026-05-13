### IQL — Implicit Q-Learning

```yaml
id: iql
name: IQL
full_name: "隐式 Q 学习 (Implicit Q-Learning)"
year: 2021
org: UC Berkeley
paper_url: https://arxiv.org/abs/2110.06169
code_url: https://github.com/ikostrikov/implicit_q_learning
category: offline_rl
parent: "—"
motivation: "通过 expectile 回归隐式逼近最优值函数，完全避免查询数据集外动作的价值，解决离线 RL 中分布偏移导致的值函数外推误差问题"
```

#### 📝 一句话总结

IQL 提出了一种**完全不需要评估数据集外动作**的离线强化学习方法：通过对 Q 值进行 expectile 回归来隐式逼近最优状态值函数，再结合优势加权回归（AWR）提取策略，在 D4RL 基准上取得了 SOTA 性能，尤其在需要"轨迹拼接"的 AntMaze 任务上大幅超越先前方法。

#### 🎯 核心要点

- **完全 in-sample 学习**：训练过程中从不查询数据集外动作的 Q 值，从根本上避免了 OOD 动作的值函数外推问题
- **Expectile 回归估计 V**：用非对称 L2 损失（expectile loss）对 \(V(s)\) 进行回归，当 \(\tau \to 1\) 时逼近 \(\max_a Q(s,a)\)，实现隐式策略改进
- **三网络架构**：V 网络（状态值函数）、Q 网络（动作值函数）、π 网络（策略），外加 Q 的目标网络 \(\hat{\theta}\)
- **两阶段训练**：第一阶段交替更新 V 和 Q（TD 学习），第二阶段通过 AWR 提取策略
- **AWR 策略提取**：以 \(\exp(\beta \cdot A(s,a))\) 为权重的行为克隆，仅使用数据集中的动作
- **Clipped Double Q-learning**：使用两个 Q 网络取最小值，抑制过估计
- **D4RL SOTA**：在 MuJoCo locomotion 和 AntMaze 任务上均达到当时最优，且支持在线微调

#### 🔬 深入细节

##### 框架示意

![IQL 方法示意图](https://ar5iv.labs.arxiv.org/html/2110.06169/assets/x1.png)
*图：IQL 的核心思想——将 Q(s,·) 视为关于动作的随机变量，通过 expectile 回归估计其上分位值作为 V(s)，避免显式查询 OOD 动作*

##### 算法伪代码

```python
# Algorithm 1: Implicit Q-Learning (IQL)
# 初始化: V网络(ψ), Q网络(θ1,θ2), 目标Q网络(θ̂), 策略网络(ϕ)

# ===== 第一阶段: TD 学习 =====
for each gradient step:
    # 从数据集采样 (s, a, r, s')
    batch = sample(D)
    
    # 1. 更新 V 网络 (expectile 回归)
    # L_V(ψ) = E[L_2^τ(Q_θ̂(s,a) - V_ψ(s))]
    u = min(Q_θ̂1(s,a), Q_θ̂2(s,a)) - V_ψ(s)
    weight = τ * (u >= 0) + (1 - τ) * (u < 0)  # 非对称权重
    loss_V = mean(weight * u²)
    ψ -= λ_V * ∇loss_V
    
    # 2. 更新 Q 网络 (标准 TD 学习, 用 V 替代 max)
    # L_Q(θ) = E[(r + γ·V_ψ(s') - Q_θ(s,a))²]
    target = r + γ * V_ψ(s')
    loss_Q = mean((target - Q_θ(s,a))²)
    θ -= λ_Q * ∇loss_Q
    
    # 3. 更新目标网络 (EMA)
    θ̂ ← (1 - α)·θ̂ + α·θ

# ===== 第二阶段: 策略提取 (AWR) =====
for each gradient step:
    # L_π(ϕ) = E[exp(β·(Q_θ̂(s,a) - V_ψ(s))) · log π_ϕ(a|s)]
    advantage = Q_θ̂(s,a) - V_ψ(s)
    weights = exp(β * advantage)
    loss_π = -mean(weights * log_π_ϕ(a|s))
    ϕ -= λ_π * ∇loss_π
```

##### 动机与背景

离线强化学习面临的核心矛盾是：**策略改进**要求评估当前策略可能选择的动作（这些动作可能不在数据集中），而**分布偏移**意味着对数据集外（OOD）动作的 Q 值估计极不可靠。

先前方法的解决思路主要有两类：
1. **约束策略**（如 BCQ、BEAR、CQL）：限制策略不要偏离行为策略太远，但仍需在训练中查询 OOD 动作的 Q 值
2. **正则化 Q 函数**（如 CQL）：对 OOD 动作的 Q 值施加惩罚，但需要额外采样 OOD 动作

> 💡 **关键洞察**：IQL 提出了一个根本不同的思路——能否**完全不查询任何 OOD 动作的 Q 值**，仅使用数据集中已有的 (s, a) 对来完成策略改进？

##### 核心机制：Expectile 回归实现隐式策略改进

**问题转化**：标准 Q-learning 的 Bellman 最优方程需要 \(\max_a Q(s,a)\)，这要求遍历所有动作（包括 OOD 动作）。IQL 的关键在于**不显式计算 max，而是通过 expectile 回归隐式逼近**。

**Expectile 的直觉**：对于随机变量 \(X\)，其 \(\tau\)-expectile \(m_\tau\) 满足：

$$m_\tau = \arg\min_m \mathbb{E}[L_2^\tau(X - m)]$$

其中非对称 L2 损失为：

$$L_2^\tau(u) = |\tau - \mathbf{1}(u < 0)| \cdot u^2$$

- 当 \(\tau = 0.5\) 时，\(m_\tau\) 就是均值（普通最小二乘）
- 当 \(\tau \to 1\) 时，\(m_\tau \to \max(X)\)（逼近最大值）

> ⚠️ **注意**：\(\tau\) 的选择至关重要。\(\tau\) 越大，越接近 max 操作，策略改进越激进；但过大的 \(\tau\) 可能导致对数据集中噪声或异常值过度敏感。实验中通常取 \(\tau \in [0.7, 0.9]\)。

**V 网络的 Expectile 回归（Eq. 5）**：

$$L_V(\psi) = \mathbb{E}_{(s,a) \sim \mathcal{D}}\left[L_2^\tau\left(Q_{\hat{\theta}}(s,a) - V_\psi(s)\right)\right]$$

这里将 \(Q(s, \cdot)\) 视为关于数据集中动作分布的随机变量，\(V_\psi(s)\) 通过 expectile 回归学习其上分位值。当 \(\tau\) 较大时，\(V(s)\) 会偏向数据集中 Q 值较高的动作，从而**隐式地实现了策略改进**——无需显式地对所有动作取 max。

**Q 网络的 TD 更新（Eq. 6）**：

$$L_Q(\theta) = \mathbb{E}_{(s,a,s') \sim \mathcal{D}}\left[\left(r(s,a) + \gamma V_\psi(s') - Q_\theta(s,a)\right)^2\right]$$

Q 网络使用标准的 MSE TD 损失，但 target 中用 \(V_\psi(s')\) 替代了 \(\max_{a'} Q(s', a')\)。由于 \(V\) 已经通过 expectile 回归隐式逼近了最优值，因此 Q 的更新也隐式地朝着最优 Q 函数收敛。

##### 策略提取：优势加权回归（AWR, Eq. 7）

值函数训练完成后，通过**优势加权行为克隆**提取策略：

$$L_\pi(\phi) = \mathbb{E}_{(s,a) \sim \mathcal{D}}\left[\exp\left(\beta \cdot (Q_{\hat{\theta}}(s,a) - V_\psi(s))\right) \cdot \log \pi_\phi(a|s)\right]$$

其中 \(\beta \in [0, \infty)\) 是逆温度参数：
- **\(\beta \to 0\)**：退化为普通行为克隆（均匀加权）
- **\(\beta \to \infty\)**：只模仿优势最大的动作

> 💡 **关键**：AWR 的优势在于它只使用数据集中的 (s, a) 对，权重 \(\exp(\beta \cdot A(s,a))\) 让策略更多地模仿高优势的动作，同时天然地保持在数据分布内。

##### 与传统方法的区别

| 特性 | CQL | BCQ/BEAR | IQL |
|------|-----|----------|-----|
| 是否查询 OOD 动作 | ✅ 需要采样 OOD 动作计算正则项 | ✅ 需要约束策略输出 | ❌ **完全不需要** |
| 值函数训练是否依赖策略 | 是 | 是 | **否**（V/Q 训练与策略解耦） |
| 计算开销 | 高（需额外采样） | 中等 | **低**（仅多一个 V 网络） |
| 是否支持在线微调 | 困难 | 困难 | **天然支持**（值函数不依赖策略） |
| 轨迹拼接能力 | 强 | 中等 | **强**（多步动态规划） |

IQL 的一个独特优势是**值函数训练与策略完全解耦**：V 和 Q 的训练不依赖任何显式策略，这使得：
1. 训练更稳定（无策略-值函数的循环依赖）
2. 天然支持在线微调（离线训练的值函数可直接用于在线阶段）
3. 实现极其简单（只需在 SARSA-style TD 更新中修改 V 的损失函数）

#### 🧪 练习题

```yaml
question: "IQL 中 expectile 回归的超参数 τ 趋近于 1 时，V(s) 的行为最接近以下哪个？"
options:
  - "数据集中所有动作 Q 值的均值 E_a[Q(s,a)]"
  - "数据集中所有动作 Q 值的最大值 max_a Q(s,a)"
  - "行为策略的状态值函数 V^β(s)"
  - "数据集中所有动作 Q 值的中位数"
answer: 1
explain: "当 τ→1 时，expectile 回归的非对称损失使得 V(s) 几乎只关注 Q 值最高的动作（对 Q>V 的样本赋予极大权重），从而逼近 max_a Q(s,a)。τ=0.5 时才是均值。"
```