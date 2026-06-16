### REINFORCE

```yaml
id: reinforce
name: REINFORCE
full_name: "策略梯度算法 (REINFORCE)"
year: "1992"
org: Northeastern University
paper_url: "https://link.springer.com/article/10.1007/BF00992696"
category: foundation
parent: "—"
motivation: "通过轨迹回报直接估计策略梯度"
```

#### 📝 一句话总结

REINFORCE 提出用随机策略产生的实际奖励乘以对数概率梯度来更新参数，证明这类更新在期望上沿着期望奖励的梯度方向前进，奠定了现代 Monte Carlo policy gradient 与 RLHF 中策略优化的基础。

#### 🎯 核心要点

- 定义一大类 REINFORCE 更新：奖励增量 = 非负学习率因子 × 去基线奖励 × characteristic eligibility。
- 核心公式为 \(\Delta w_{ij}=\alpha_{ij}(r-b_{ij})e_{ij}\)，其中 \(e_{ij}=\partial \ln g_i / \partial w_{ij}\)。
- 证明在满足基线独立性等条件时，期望更新方向与 \(\nabla_W \mathbb{E}[r\mid W]\) 内积非负；学习率一致时是无偏梯度估计。
- 对 Bernoulli-logistic 随机单元，得到局部规则 \(\Delta w_{ij}=\alpha(r-b)(y_i-p_i)x_j\)。
- 扩展到 episodic delayed reward：整条 episode 结束后用总奖励乘以时间上累积的 eligibility。
- 引入 reinforcement baseline / reinforcement comparison，说明基线不依赖当前动作时不改变无偏性，可用于降低方差。
- 支持多参数随机分布，例如 Gaussian 单元可同时学习均值和方差，从而区分“探索位置”和“探索尺度”。
- 说明可与 deterministic hidden layers 的 backpropagation 结合，只在随机输出或随机节点处使用 likelihood-ratio 估计。

#### 🔬 深入细节

![Policy gradient general form 示意图](https://lilianweng.github.io/posts/2018-04-08-policy-gradient/general_form_policy_gradient.png)
*图：REINFORCE 原论文没有框架图或 Figure；这里使用远程公开的 policy-gradient 总式图辅助说明。REINFORCE 对应其中用 trajectory return 或 reward-to-go 作为 \(\Psi_t\) 的 Monte Carlo 策略梯度估计。*

Williams 1992 的论文标题是 “Simple Statistical Gradient-Following Algorithms for Connectionist Reinforcement Learning”。它研究的问题不是现代 Gym 风格 MDP 的完整算法工程，而是更基础的随机 connectionist network 如何从标量 reinforcement signal 中学习。设网络参数为 \(W\)，给定输入和参数后，随机单元 \(i\) 以概率质量或密度函数 \(g_i\) 产生输出 \(y_i\)。系统只看到奖励 \(r\)，并不知道环境的可微模型，也不显式计算 \(\partial r / \partial W\)。REINFORCE 的核心是用 score function identity 把“奖励对参数的梯度”变成“奖励乘以采样动作 log-prob 的梯度”。

论文给出的通用单步更新是：

$$
\Delta w_{ij}=\alpha_{ij}(r-b_{ij})e_{ij}
$$

其中 characteristic eligibility 定义为：

$$
e_{ij}=\frac{\partial \ln g_i}{\partial w_{ij}}
$$

\(\alpha_{ij}\ge 0\) 是学习率因子，\(b_{ij}\) 是 reinforcement baseline。只要 baseline 在条件上不依赖当前随机输出，减去它不会改变梯度估计的期望；它只是改变方差。论文 Theorem 1 的要点是：任意这种 REINFORCE algorithm 的期望更新 \(\mathbb{E}[\Delta W\mid W]\) 与期望奖励梯度 \(\nabla_W\mathbb{E}[r\mid W]\) 的内积非负；当所有学习率相同，更新就是该梯度的常数倍无偏估计。

```python
# 现代符号下的 episodic REINFORCE 伪代码
initialize policy parameters theta
for episode in range(num_episodes):
    trajectory = []
    s = env.reset()

    # 1. on-policy 采样整条轨迹
    while not done:
        probs = policy_theta(s)
        a = sample(probs)
        next_s, r, done = env.step(a)
        trajectory.append((s, a, r, log_prob(probs, a)))
        s = next_s

    # 2. Monte Carlo return 或 reward-to-go
    G = 0
    returns = []
    for (_, _, r, _) in reversed(trajectory):
        G = r + gamma * G
        returns.insert(0, G)

    # 3. 用 return 减 baseline 加权 log-prob 梯度
    loss = 0
    for (s_t, a_t, r_t, logp_t), G_t in zip(trajectory, returns):
        advantage_estimate = G_t - baseline(s_t)   # baseline 可选，不能依赖当前采样动作
        loss += -logp_t * advantage_estimate

    theta = optimizer.step(loss)
```

对 Bernoulli-logistic 单元，输出 \(y_i\in\{0,1\}\)，取 1 的概率为 \(p_i=\sigma(\sum_j w_{ij}x_j)\)。此时 log-likelihood 的导数有非常简单的局部形式：

$$
\frac{\partial \ln g_i}{\partial w_{ij}}=(y_i-p_i)x_j
$$

代入通用 REINFORCE 规则得到：

$$
\Delta w_{ij}=\alpha(r-b)(y_i-p_i)x_j
$$

这个公式的直觉很强：如果实际输出 \(y_i\) 比模型概率 \(p_i\) 更“偏向被采样到”，且得到的奖励高于基线，那么增加导致该输出的权重；如果奖励低于基线，则降低这次采样路径的概率。它不需要知道哪个动作“本来应该”被选，只需要知道这次随机选择之后的结果比基线好还是坏。

延迟奖励场景是论文的另一核心贡献。一个 episode 有 \(k\) 个时间步，最后才收到奖励 \(r\)。论文通过 unfolding-in-time 把循环网络在时间上展开成无环网络，然后得到 episodic REINFORCE：

$$
\Delta w_{ij}=\alpha_{ij}(r-b_{ij})\sum_{t=1}^{k}e_{ij}(t)
$$

对同步更新的 Bernoulli-logistic recurrent network，可写成：

$$
\Delta w_{ij}=\alpha_{ij}(r-b_{ij})\sum_{t=1}^{k}(y_i(t)-p_i(t))x_j(t-1)
$$

这就是“轨迹回报直接估计策略梯度”的早期形式。现代强化学习通常把它写成：

$$
\nabla_\theta J(\theta)=\mathbb{E}_{\tau\sim\pi_\theta}\left[\sum_{t=0}^{T}G_t\nabla_\theta\log\pi_\theta(a_t\mid s_t)\right]
$$

其中 \(G_t\) 是从时刻 \(t\) 开始的 Monte Carlo return。Williams 论文中的 \((r-b)\sum_t e(t)\) 与现代写法中的 \(G_t\nabla\log\pi\) 是同一个 likelihood-ratio 思想在不同符号系统下的表达。

baseline 是理解 REINFORCE 的关键。因为：

$$
\mathbb{E}_{a\sim\pi_\theta}[b(s)\nabla_\theta\log\pi_\theta(a\mid s)] = b(s)\nabla_\theta\sum_a\pi_\theta(a\mid s)=0
$$

只要 \(b(s)\) 不依赖当前动作，减去 baseline 不改变期望梯度。但它会把“所有正奖励都增强”的粗糙信号变成“高于通常水平才增强，低于通常水平就削弱”。论文把这类思想称为 reinforcement comparison，并讨论用过去奖励的指数平均作为比较项。现代 actor-critic、GAE、PPO 中的 value baseline，本质上都是为了在保持梯度方向尽量无偏或低偏的同时显著降低方差。

论文还讨论了多参数分布。例如 Gaussian 随机单元输出 \(y\sim\mathcal{N}(\mu,\sigma^2)\)，则均值参数的 characteristic eligibility 为：

$$
\frac{\partial\ln g}{\partial\mu}=\frac{y-
\mu}{\sigma^2}
$$

方差或标准差参数也有对应的 score function 项。这使算法不仅能学习“往哪里输出”，还能学习“探索范围多大”。这对连续控制尤其重要，后来连续动作策略梯度中的 Gaussian policy 就延续了这种思想：policy network 输出均值和方差，采样动作后用 log-prob 梯度更新策略参数。

> 💡 关键：REINFORCE 的优点是估计简单、适用范围广、无需可微环境模型；缺点是 Monte Carlo 方差高、样本效率低、必须依赖 on-policy 采样。后来的 actor-critic 用 learned value 减方差，TRPO/PPO 用 trust region 或 clipping 控制更新幅度，但底层仍是 \(\nabla\log\pi\) 乘以回报/优势的策略梯度结构。

在 LLM/RLHF 语境中，REINFORCE 可以直接对应到“语言模型作为随机策略”：状态是 prompt 与已生成 token，动作是下一个 token，\(\log\pi_\theta(a_t\mid s_t)\) 是模型给采样 token 的 log-prob，奖励可以来自 reward model 或规则评分。若直接用整段回复奖励更新所有 token，就得到高方差的序列级 REINFORCE；PPO、GRPO、RLOO 等方法都是在这一基础上改变 baseline、归一化、KL 约束或样本复用方式。

#### 🧪 练习题

```yaml
question: "REINFORCE 中 baseline 的主要作用是什么？"
options:
  - "改变最优策略，使模型偏向短轨迹"
  - "在不依赖当前动作的条件下降低梯度估计方差，同时保持期望梯度不变"
  - "替代随机策略，使训练变成监督学习"
  - "消除 Monte Carlo 采样需求"
answer: 1
explain: "因为动作无关 baseline 与 score function 的期望乘积为 0，减去 baseline 不改变无偏性，但能减少回报尺度带来的方差。"
```
