### HER — 后见经验回放 (Hindsight Experience Replay)

```yaml
id: her
name: HER
full_name: "后见经验回放 (Hindsight Experience Replay)"
year: "2017"
org: OpenAI
paper_url: https://arxiv.org/abs/1707.01495
category: skill_hierarchical
parent: "—"
motivation: "后见经验回放解决稀疏奖励"
```

#### 📝 一句话总结

HER 把失败轨迹重新解释为“完成了另一个目标”的成功经验，通过目标重标注让稀疏奖励任务也能产生大量可学习的监督信号。

#### 🎯 核心要点

- **核心洞察**：即使智能体没有达到原目标，它通常也达到了某个实际状态；把这个实际状态当作替代目标，失败经验就能变成成功样本。
- **适用前提**：任务必须是 goal-conditioned，策略、价值函数和奖励都能以目标 $g$ 为条件，例如 $\pi(a|s,g)$ 和 $Q(s,a,g)$。
- **算法依赖**：HER 生成的是重标注后的 off-policy 经验，因此最自然地与 DQN、DDPG、SAC 等 off-policy 方法结合。
- **目标采样策略**：论文比较 final、future、episode、random 等策略，其中从同一 episode 的未来 achieved goals 中采样通常最稳定。
- **具身价值**：FetchReach、FetchPush、FetchSlide、FetchPickAndPlace 等机器人任务说明，HER 能在二值稀疏奖励下学习复杂操作。

#### 🔬 深入细节

##### 示意图

![HER FetchPush illustration](https://images.ctfassets.net/kftzwdyauwt9/305fUDgKTf0wZ8IXN8FHNv/7f3b757f7f3cc08899ea9bc53ce056c0/ingredients-for-robotics-research-5.png?w=3840&q=90&fm=webp)

论文 arXiv HTML 中的图片资源未能稳定解析；这里使用 OpenAI 官方 robotics/HER 相关文章中的 FetchPush 示意图。它展示的是 HER 最典型的设定：机械臂推动物体到目标位置，奖励只在达到目标时给出。

##### Goal-conditioned 形式

HER 假设状态中可以区分 desired goal $g$ 与 achieved goal $m(s)$。奖励函数由目标决定：

$$
r_g(s,a,s') =
\begin{cases}
0, & \|m(s')-g\| \le \epsilon,\\
-1, & \text{otherwise}.
\end{cases}
$$

策略和 critic 都接收目标：

$$
a_t \sim \pi_\theta(a|s_t,g), \quad Q_\phi = Q_\phi(s_t,a_t,g).
$$

这样，同一段状态动作轨迹可以在不同目标下拥有不同奖励。HER 的全部威力都来自这个可重解释性。

##### 后见重标注

假设一条 episode 的原始目标是 $g$，轨迹为

$$
(s_0,a_0,s_1,\ldots,s_T).
$$

普通 replay 只存储原始 transition：

$$
(s_t,g,a_t,r_g(s_t,a_t,s_{t+1}),s_{t+1},g).
$$

HER 会额外采样一个后见目标 $g' = m(s_k)$，其中 $k>t$ 通常来自同一轨迹的未来时间步，然后重算奖励：

$$
r_{g'}(s_t,a_t,s_{t+1}).
$$

如果智能体最终碰巧把物体推到了某个位置，那么以这个位置为目标时，轨迹后段就包含成功样本。稀疏奖励不再意味着 replay buffer 里几乎全是失败。

##### 为什么 future 策略有效

future 策略从当前 transition 之后的 achieved goals 中采样 $g'$。这比 random 更有效，因为未来状态确实受当前动作影响；也比只用 final 更丰富，因为一条轨迹里有多个中间达成目标。它让 critic 看到“当前动作如何推动系统接近后续实际状态”的局部因果关系。

HER 不改变环境，不添加 shaped reward，也不需要演示数据。它只是改变 replay buffer 中 transition 的目标标签与对应奖励，因此实现成本很低。

##### 与层次技能的关系

虽然 HER 本身不是传统 HRL 架构，但在具身任务中它常被当作技能学习与目标条件控制的基础组件。低层策略可以被训练成“达到任意目标”的通用技能，高层再负责产生目标序列。许多后续层次化方法都复用了 HER 的目标重标注思想。

##### 算法伪代码

```text
Initialize off-policy RL algorithm A and replay buffer R.

for each episode:
    sample desired goal g
    collect trajectory using policy pi(a | s, g)

    for each transition t in the trajectory:
        store original transition with goal g in R

        for k hindsight samples:
            sample new goal g' from achieved goals in the same episode
            recompute reward r' = r(s_t, a_t, s_{t+1}, g')
            store relabeled transition (s_t, g', a_t, r', s_{t+1}, g') in R

    update off-policy algorithm A using minibatches from R

Output: goal-conditioned policy pi(a | s, g)
```

##### 局限

HER 需要可以定义 achieved goal，并能对任意替代目标重算奖励。如果任务目标是语言描述、偏好判断或长期历史属性，简单 HER 就不够直接。它也依赖 off-policy 学习稳定性；如果 critic 在高维连续控制中外推严重，重标注样本可能放大估计误差。

#### 🧪 练习题

```yaml
- question: "HER 如何把失败轨迹变成有用经验？"
  options:
    A: "删除失败轨迹"
    B: "把轨迹实际达到的状态重标注为新的目标并重算奖励"
    C: "把所有奖励都设为 1"
    D: "只训练监督分类器"
  answer: B
  explain: "HER 的核心是 hindsight relabeling：没有达成原目标，也可以视为达成了另一个实际目标。"
- question: "HER 最适合和哪类 RL 算法结合？"
  options:
    A: "off-policy 算法"
    B: "只能使用 on-policy 算法"
    C: "不使用 replay buffer 的算法"
    D: "纯动态规划算法"
  answer: A
  explain: "重标注后的 transition 不来自当前策略目标分布，因此与 off-policy replay 学习最匹配。"
```
