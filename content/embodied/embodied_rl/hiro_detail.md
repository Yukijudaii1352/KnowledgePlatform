### HIRO — 数据高效层次化RL (Data-Efficient Hierarchical RL)

```yaml
id: hiro
name: HIRO
full_name: "数据高效层次化RL (Data-Efficient Hierarchical RL)"
year: "2018"
org: Google Brain
paper_url: https://arxiv.org/abs/1805.08296
category: skill_hierarchical
parent: feudal
motivation: "目标条件奖励与离线策略修正"
```

#### 📝 一句话总结

HIRO 让高层策略每隔若干步输出相对状态目标，低层策略学习达到这些目标，并用 off-policy correction 修正旧经验中的高层动作，从而让层次化 RL 能高效复用 replay 数据。

#### 🎯 核心要点

- **两层结构**：高层每 $c$ 步输出一个 goal $g_t$；低层在每个环境步根据当前状态和 goal 输出原始动作。
- **相对目标**：goal 通常表示状态差值，低层希望在短时间内让 $s_{t+c}$ 接近 $s_t+g_t$。
- **内在奖励**：低层奖励是达到高层目标的负距离，例如 $-\|s_t+g_t-s_{t+1}\|_2$。
- **核心难点**：低层策略不断变化，旧 replay 中的高层 goal 对当前低层而言不再有相同语义，导致高层 off-policy 学习不稳定。
- **关键修正**：HIRO 通过最大化当前低层策略解释旧动作序列的 likelihood，重新标注高层 goal，提升样本效率。

#### 🔬 深入细节

##### 任务与架构示意

![HIRO hierarchical RL task illustration](https://ar5iv.labs.arxiv.org/html/1805.08296/assets/x2.png)

论文在 Ant Maze、Ant Push、Ant Fall 等连续控制任务中评估 HIRO。图中蓝色箭头表示高层给出的目标方向，低层负责把目标转化为关节控制。

##### 高低层 MDP

低层策略为

$$
a_t \sim \pi^{lo}(a|s_t,g_t),
$$

高层策略每隔 $c$ 步输出目标

$$
g_t \sim \pi^{hi}(g|s_t).
$$

如果使用相对目标，那么在下一步会把目标按状态变化平移：

$$
g_{t+1}=s_t+g_t-s_{t+1}.
$$

这使低层始终看到“从当前状态还差多少到达高层目标”，而不是固定的绝对坐标。

##### 低层内在奖励

HIRO 的低层奖励可写成

$$
r^{lo}(s_t,g_t,a_t,s_{t+1})
= -\|s_t + g_t - s_{t+1}\|_2.
$$

这个奖励与外部任务无关，只衡量低层是否执行了高层命令。高层则接收环境外部奖励，并在时间尺度 $c$ 上学习哪个 goal 有助于任务完成。

##### Off-policy correction

层次化 off-policy 学习的问题是：replay buffer 中某段低层动作 $a_t,\ldots,a_{t+c-1}$ 是旧低层策略在旧 goal $g_t$ 下生成的。当前低层策略已经变了，如果高层仍把旧 $g_t$ 当成动作来训练，TD 目标会出现严重语义偏移。

HIRO 的修正是寻找一个新 goal $\tilde g_t$，使当前低层策略最有可能产生这段历史动作：

$$
\tilde g_t
= \arg\max_g
\sum_{i=t}^{t+c-1}
\log \pi^{lo}(a_i|s_i,g_i).
$$

实际实现不会在连续 goal 空间中全局优化，而是构造候选集合，包括原始 goal、加噪 goal 和直接由 $s_{t+c}-s_t$ 得到的 hindsight goal，再选 likelihood 最大者。

##### 与 FeUdal Networks 的关系

FuN 的高层目标是 latent direction，主要解决长程信用分配；HIRO 的高层目标是可由低层追踪的状态差值，并重点解决 off-policy 经验复用。可以把 HIRO 看成更贴近连续控制和 replay 学习的层次化目标条件框架。

这种设计牺牲了一些抽象性，但带来更明确的低层学习信号：goal 是否完成可以直接用状态距离衡量，而不依赖难解释的 latent 表征。

##### 算法伪代码

```text
Initialize high-level policy pi_hi, low-level policy pi_lo,
critics Q_hi and Q_lo, and replay buffers.

for each episode:
    every c steps:
        high-level samples goal g_t ~ pi_hi(. | s_t)

    for each low-level step:
        low-level samples action a_i ~ pi_lo(. | s_i, g_i)
        environment returns s_{i+1}, extrinsic reward r_i
        compute low-level reward -||s_i + g_i - s_{i+1}||
        store low-level transition
        update remaining goal by relative-state shift

    store high-level transition (s_t, g_t, sum extrinsic rewards, s_{t+c})

    when training high-level from replay:
        relabel old goal with off-policy correction:
            choose g maximizing likelihood of recorded low-level actions
        update Q_hi and pi_hi using corrected goal
    update Q_lo and pi_lo with intrinsic rewards

Output: hierarchical policy with corrected off-policy replay
```

##### 实验结论与局限

HIRO 在 Ant Maze、Ant Push、Ant Fall 和 Ant Gather 中显著优于没有 off-policy correction 的层次化方法，并比许多探索增强基线更省样本。它的局限是 goal space 需要能用状态差值表达；如果任务的高层意图是语言、接触模式或不可观测事件，单纯的 $s_{t+c}-s_t$ 目标就不足够。

#### 🧪 练习题

```yaml
- question: "HIRO 中高层策略输出的是什么？"
  options:
    A: "每一步的原始关节力矩"
    B: "低层要在短时间内达到的状态目标或状态差值"
    C: "环境奖励函数参数"
    D: "判别器类别标签"
  answer: B
  explain: "高层每 c 步输出 goal，低层以该 goal 为条件产生原始动作。"
- question: "HIRO 的 off-policy correction 主要修正什么问题？"
  options:
    A: "旧 replay 中的高层 goal 与当前低层策略语义不一致"
    B: "环境观测维度太小"
    C: "奖励函数无法计算"
    D: "动作空间必须离散化"
  answer: A
  explain: "低层策略变化后，旧 goal 不再能解释历史动作序列，因此需要重新标注高层动作。"
```
