### 策略梯度算法 (REINFORCE)

```yaml
id: reinforce
name: REINFORCE
full_name: 策略梯度算法 (REINFORCE)
year: 1992
org: Northeastern University
paper_url: https://link.springer.com/article/10.1007/BF00992696
category: foundation
parent: —
motivation: 通过轨迹回报直接估计策略梯度
```

#### 📝 一句话总结

REINFORCE 首次严格证明含随机单元的连接主义网络可通过沿期望强化信号的梯度方向更新权重，利用似然比（log-derivative）技巧将标量奖励直接转化为无偏策略梯度估计，无需显式计算梯度或维护中间变量。

#### 🎯 核心要点

- 提出 REINFORCE 算法族：利用轨迹采样回报直接估计策略梯度，奠基蒙特卡洛策略梯度方法
- 核心公式 \(\Delta w_{ij} = \alpha_{ij} (r - b_{ij}) \, \frac{\partial \ln g_i}{\partial w_{ij}}\)，其中 \(g_i\) 为单元 i 输出该动作的概率密度，\(\frac{\partial \ln g_i}{\partial w_{ij}}\) 为资格迹（eligibility trace）
- 创新引入 baseline \(b_{ij}\)：任意与动作无关的量均可作为基线，不引入偏差但能显著降低估计方差
- 适用于 immediate-reinforcement 任务和受限形式的 delayed-reinforcement（episodic）任务
- 提出 episodic REINFORCE：每完整轨迹结束后根据累积回报 \(G_t\) 统一更新，等价于后来广泛使用的 vanilla policy gradient
- 可与反向传播自然集成：输出端随机 REINFORCE 单元与隐藏层确定性单元联合训练
- 分析了 Bernoulli-logistic、Gaussian 及带 softmax 的多项选择单元三类具体实例
- 数学上严格证明权重增量的期望方向与期望强化信号的梯度一致
- 支持从 Bernoulli、Gaussian 到任意指数族分布的随机策略建模

#### 🔬 深入细节

##### 核心示意图

```mermaid
flowchart LR
    S[状态输入 s] --> H[确定性隐藏层<br/>权重 w_h]
    H --> R[随机输出单元<br/>参数化分布 g_w]
    R --> A[动作采样 a ~ g_w]
    A --> ENV[环境]
    ENV --> RE[奖励 r]
    RE --> UPDATE[权重更新]
    R -.->|资格迹 e = ∇_w ln g| UPDATE
    UPDATE -->|Δw = lr × (r-b) × e| R
    UPDATE -->|BP反传| H
```
*图：REINFORCE 网络架构。随机输出单元从参数化分布采样动作，利用资格迹 \(e = \nabla_w \ln g\) 将标量奖励转化为权重梯度，并通过反向传播更新隐藏层确定性权重。*

##### 动机与背景

在 1992 年，强化学习面临一个关键瓶颈：如何将标量奖励信号转化为含随机探索机制的网络的权重更新方向。监督学习中反向传播依赖「目标输出 − 实际输出」的逐节点误差信号，但强化学习中仅有单一标量奖励，缺乏逐动作的精确监督。传统做法试图用 TD 或 Q-Learning 逼近值函数再间接推导策略，但这些方法要么要求离散动作空间（需全局 argmax），要么对连续动作无优雅支持。Williams 将问题重新定义为：寻找权重更新 \(\Delta w\)，使得期望强化信号 \(\mathbb{E}[r]\) 最大化的方向上优化——即沿 \(\nabla_w \mathbb{E}[r]\) 走；但从不等同于试图显式计算该梯度，而是通过采样巧妙获得无偏估计。

##### 核心机制：似然比梯度估计

REINFORCE 的数学核心是基于似然比（likelihood ratio）恒等式，也称 log-derivative trick。设随机策略 \(\pi_w(a|s)\) 以参数 w 输出动作 a 的分布，r 为执行 a 后获得的强化信号，有：

$$\nabla_w \mathbb{E}[r] = \nabla_w \int r \; g_w(a) \, da = \int r \; \nabla_w g_w(a) \, da = \int r \; g_w(a) \; \nabla_w \ln g_w(a) \, da = \mathbb{E}\left[r \cdot \nabla_w \ln g_w(a)\right]$$

推导关键：\(\nabla_w g_w = g_w \cdot \nabla_w \ln g_w\)，将对概率密度的梯度转化为可通过采样估计的期望形式。实际算法中，每步执行：

$$\Delta w = \alpha \cdot r \cdot \nabla_w \ln g_w(a)$$

其中 \(\alpha\) 为学习率。这是一条极简洁的更新：采样一次动作，观测奖励，将奖励与 log-概率的梯度相乘作为权重增量。该估计是无偏的——多次更新的期望正是真正的策略梯度方向。

> 💡 关键：REINFORCE 将「强化学习」问题转化为「统计梯度估计」问题。每个随机单元仅需知道自身输出的概率密度梯度（资格迹），与网络其余部分解耦，天然支持模块化的网络架构。

##### Baseline 减方差

最直接的 REINFORCE 形式存在高方差问题——奖励的绝对大小（可能从 -∞ 到 +∞）直接影响更新尺度，导致训练不稳定。Williams 提出引入 baseline \(b\)：

$$\Delta w = \alpha \cdot (r - b) \cdot \nabla_w \ln g_w(a)$$

> ⚠️ 注意：baseline b 必须与动作 a 无关（即不含动作信息），否则该减法项会在期望中引入偏差。由于 \(\mathbb{E}[\nabla_w \ln g_w] = \int g_w \cdot \nabla_w \ln g_w = \int \nabla_w g_w = \nabla_w \int g_w = \nabla_w 1 = 0\)，故 \(\mathbb{E}[b \cdot \nabla_w \ln g_w] = 0\)，因此引入 baseline 不改变梯度的期望值，但能从原始奖励中减去常数级偏移，显著平滑波动。实际中 b 可取奖励的指数移动平均、训练出的值函数估计，或同一批样本的均值。

##### Episodic REINFORCE 与 Monte Carlo Policy Gradient

对 episodic 任务（完整轨迹结束后才获得回报），Williams 提出 natural extension：每时间步的更新权重改为该步之后整个轨迹的累积折扣回报 \(G_t = \sum_{k=t}^{T} \gamma^{k-t} r_k\)。这就是后来广泛使用的 vanilla policy gradient / Monte Carlo policy gradient 的标准形式：

$$\nabla_\theta J(\theta) = \mathbb{E}_{\tau \sim \pi_\theta} \left[ \sum_{t=0}^{T} \nabla_\theta \log \pi_\theta(a_t|s_t) \, G_t \right]$$

这一定义揭示了 REINFORCE 是后来所有梯度类策略搜索方法的共同祖先：Actor-Critic（用 \(Q(s,a)\) 替代 \(G_t\) 降方差）、PG with GAE（广义优势估计）、TRPO/PPO（约束更新幅度）均由此衍生。

##### 与反向传播的集成

REINFORCE 的一个重要贡献是展示了随机输出单元与确定性隐藏层可联合训练。具体而言，输出端 REINFORCE 单元的误差信号 \((r - b) \cdot e\)（其中 \(e = \nabla_w \ln g\)）通过标准反向传播通路传递至隐藏层的确定性单元，隐藏层按常规 SGD 更新权重。这一混合架构为 Actor-Critic 提供了概念原型：随机策略网络（Actor）输出动作分布，确定性特征提取网络提供状态表示，两者端到端联合优化。

##### 算法伪代码

```python
# Episodic REINFORCE (Monte Carlo Policy Gradient)
for episode in range(max_episodes):
    states, actions, rewards = [], [], []
    # 1. 生成轨迹
    done = False
    s = env.reset()
    while not done:
        logits = policy_net(s)          # 输出分布参数
        a = sample(logits)              # 从分布中采样动作
        s_next, r, done = env.step(a)
        states.append(s)
        actions.append(a)
        rewards.append(r)
        s = s_next
    # 2. 计算折扣回报
    G = 0
    returns = []
    for r in reversed(rewards):
        G = r + gamma * G
        returns.insert(0, G)
    # 3. 策略梯度更新
    loss = 0
    for t in range(len(states)):
        log_prob = log_prob_calc(policy_net(states[t]), actions[t])
        loss += -log_prob * (returns[t] - baseline)
    optimizer.zero_grad()
    loss.backward()
    optimizer.step()
```

##### 与传统方法的区别

| 维度 | Q-Learning / SARSA (TD方法) | REINFORCE |
|------|---------------------------|-----------|
| 优化目标 | 值函数 \(V(s)\) 或 \(Q(s,a)\) | 策略分布 \(\pi(a|s)\) 直接优化 |
| 梯度来源 | 隐式（Bellman 方程误差驱动） | 显式（似然比梯度，严格无偏） |
| 偏差-方差折衷 | 有偏但低方差（bootstrap） | 无偏但高方差（需完整轨迹） |
| 动作空间 | 离散动作为主（需 argmax） | 天然支持连续/离散/混合动作 |
| 样本效率 | 每步均可学习 | episodic 任务需完整轨迹 |
| 探索机制 | \(\epsilon\)-greedy 等显式设计 | 策略分布本身提供随机探索 |

#### 🧪 练习题

```yaml
question: "在 REINFORCE 算法中引入 baseline 的主要作用是什么？"
options:
  - "增加梯度估计的偏差以加速收敛"
  - "降低梯度估计的方差而不引入偏差"
  - "替代需要完整轨迹的回报计算"
  - "使算法适用于连续动作空间"
answer: 1
explain: "baseline 须与动作无关，其加权期望为零 (\u2207\u2097 \u222b g\u2097 = 0)，不改变梯度估计的期望值，但能将奖励中的大常数偏移减去，显著降低估计方差。"
```
