### SafeFQL — 安全流Q学习 (Safe Flow Q-Learning)

```yaml
id: safefql
name: SafeFQL
full_name: "安全流Q学习 (Safe Flow Q-Learning)"
year: "2026"
org: arXiv
paper_url: https://arxiv.org/abs/2603.15136
category: offline_rl
parent: iql
motivation: "可达性流策略扩展安全边界"
```

#### 📝 一句话总结

SafeFQL 把 Flow Q-Learning 的快速生成式策略提取与 Hamilton-Jacobi 可达性安全 critic 结合起来，在离线数据上学习一个既接近高回报行为、又被可达安全边界约束的一步式策略。

#### 🎯 核心要点

- **安全问题**：离线 RL 不能通过在线试错修正危险动作，普通 FQL 只强调从数据分布中快速抽取高价值动作，缺少对未来不可恢复风险的显式建模。
- **核心做法**：同时训练奖励 critic、可达性安全 critic 与 flow 行为教师，再把教师蒸馏成一步 actor；actor 只在安全 critic 判定可行的动作区域内做 Q 最大化。
- **安全边界**：安全约束来自 Hamilton-Jacobi reachability，将“未来是否会进入失败集合”写成状态-动作价值的递推，而不是只用单步 cost 累积近似。
- **效率优势**：策略执行阶段不需要扩散模型的多步去噪或拒绝采样，保持 FQL 的一步生成推理速度，适合机器人和具身控制的实时约束。
- **校准机制**：论文还引入 conformal prediction 对安全阈值做有限样本校准，让离线估计的安全集合更少依赖手调 margin。

#### 🔬 深入细节

##### 框架示意

![SafeFQL framework overview](https://ar5iv.labs.arxiv.org/html/2603.15136/assets/x1.png)

图中展示了 SafeFQL 的三条主线：从离线数据学习奖励与安全 critic，用 flow matching 拟合行为分布，再把 flow 教师压缩为一步策略。需要注意的是，SafeFQL 的安全不是在执行时做后处理，而是提前进入 actor 训练目标。

##### 从 FQL 到安全离线 RL

FQL 的基本思想是先用 flow 模型描述数据中的行为动作分布，再通过 Q 函数把策略推向高价值动作。SafeFQL 保留了这一点，但将目标从单纯的

$$
\max_\pi \mathbb{E}_{s \sim \mathcal{D}, a \sim \pi(\cdot|s)}[Q_r(s,a)]
$$

改成带可行域的优化：

$$
\max_\pi \mathbb{E}[Q_r(s,\pi(s))] \quad
\text{s.t.}\quad Q_c(s,\pi(s)) \le \tau .
$$

这里 $Q_r$ 是任务回报 critic，$Q_c$ 是安全 critic，$\tau$ 是经过校准的安全阈值。这个形式的关键不是惩罚危险动作，而是把危险动作排除在 actor 的有效改进区域之外。

##### Hamilton-Jacobi 安全 critic

论文使用可达性视角描述安全：如果从当前状态动作出发，在未来某个时间会不可避免地进入失败集合，那么这个点就应被判为不安全。可达安全值可以写成类似

$$
V_\ell^\*(x_0)=\min_\pi \max_{t\ge0}\ell(x_t),
$$

其中 $\ell(x)$ 是安全边界函数，$\ell(x)\le0$ 通常表示安全。对应到离线 TD 训练时，安全 critic 使用 reachability 风格的 max-backup：

$$
Q_c(s,a) \leftarrow \max\left(\ell(s), \min_{a'} Q_c(s',a')\right).
$$

这与累计 cost 的区别很大：累计 cost 可能把一次灾难事件平均掉，而可达性备份关注轨迹上的最坏状态，因此更适合碰撞、越界、跌倒这类“不能发生一次”的具身任务。

##### 一步 flow 策略提取

SafeFQL 先训练一个 flow 行为教师，用连续时间流把简单噪声分布变换为数据动作分布；随后训练一个一步 actor 近似教师动作，同时用奖励 critic 做改进。actor 的损失可以概括为

$$
\mathcal{L}_{actor}
= - Q_r(s,\pi_\theta(s))
+ \lambda \|\pi_\theta(s)-a_{flow}(s)\|_2^2
+ \alpha [Q_c(s,\pi_\theta(s))-\tau]_+ .
$$

第二项保证 actor 不偏离离线数据支持集太远，第三项把安全约束转为可优化的 hinge penalty。实际训练中，论文强调“feasibility-gated”的更新：只有安全 critic 判断可行时才鼓励策略追逐更高奖励。

##### Conformal 校准

离线 critic 难免存在估计误差，尤其在分布边缘的危险区域。SafeFQL 将一部分离线数据留作校准集，计算安全分数的经验分位数，并用 conformal prediction 调整 $\tau$。直观地说，如果校准集中真实不安全轨迹经常被 critic 低估，阈值就会变得更保守。

这种校准不需要改变训练数据，也不要求知道真实动力学模型。它提供的是有限样本意义下的概率覆盖保证，适合作为离线安全 RL 中 critic 过度乐观的补丁。

##### 算法伪代码

```text
Input: offline dataset D, safety boundary l(s), target risk alpha

1. Split D into training data D_train and calibration data D_cal.
2. Train reward critic Q_r with offline TD or IQL-style targets.
3. Train reachability critic Q_c using max-backup:
      target_c = max(l(s), min_a' Q_c_target(s', a'))
4. Fit a flow behavior teacher p_flow(a | s) on D_train.
5. Distill a one-step actor pi_theta(s):
      keep pi close to flow teacher
      maximize Q_r(s, pi(s))
      penalize or mask actions with Q_c(s, pi(s)) > tau
6. On D_cal, compute conformal residuals for safety prediction.
7. Set calibrated threshold tau_alpha by the empirical quantile.
8. Deploy one-step actor with the calibrated safety gate.

Output: safe one-step policy pi_theta
```

##### 适用边界

SafeFQL 适合安全约束明确、失败集合可由状态函数描述的任务，例如导航越界、机器人碰撞、速度限制或姿态跌倒。它不解决“安全函数本身不可观测”的问题；如果 $\ell(s)$ 或离线数据中的失败标注不可靠，reachability critic 也会学习到错误边界。

另外，论文是 2026 年 arXiv 工作，公开资料主要来自论文页面与 HTML 版本。这里的解读基于论文公开摘要、方法图、算法描述和可达性 RL 的标准递推形式；若后续正式版本修改实现细节，应以最终论文为准。

#### 🧪 练习题

```yaml
- question: "SafeFQL 相比普通 FQL 最关键的新增模块是什么？"
  options:
    A: "只使用更大的 replay buffer"
    B: "引入可达性安全 critic 并约束 actor 改进区域"
    C: "把离线 RL 改成纯模仿学习"
    D: "取消 Q 函数，只保留 flow model"
  answer: B
  explain: "SafeFQL 的核心是在 FQL 的 flow 策略提取上加入 HJ reachability 安全 critic，使策略优化受未来安全边界约束。"
- question: "为什么 SafeFQL 强调一步 actor？"
  options:
    A: "为了在执行时避免多步扩散采样或拒绝采样的延迟"
    B: "为了完全不需要离线数据"
    C: "为了让安全 critic 失效"
    D: "为了把连续动作变成离散动作"
  answer: A
  explain: "一步 actor 保留生成式策略的表达能力，同时使部署阶段推理更快，适合实时控制。"
```
