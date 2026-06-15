### Option-Critic — 选项-评论家 (Option-Critic Architecture)

```yaml
id: option_critic
name: Option-Critic
full_name: "选项-评论家 (Option-Critic Architecture)"
year: "2017"
org: AAAI
paper_url: https://arxiv.org/abs/1609.05140
category: skill_hierarchical
parent: "—"
motivation: "自动学习子策略与终止条件"
```

#### 📝 一句话总结

Option-Critic 把 options 框架中的子策略和终止函数都写成可微参数化模块，使智能体可以端到端学习“做什么技能、技能内部怎么行动、什么时候结束技能”。

#### 🎯 核心要点

- **解决的问题**：传统 options 往往需要人工指定子目标、终止集合或技能库，Option-Critic 让这些结构从任务回报中自动学习。
- **三个策略层次**：高层策略 $\pi_\Omega(\omega|s)$ 选择 option；option 内策略 $\pi_\omega(a|s)$ 选择动作；终止函数 $\beta_\omega(s)$ 决定当前 option 是否结束。
- **关键理论**：论文给出 intra-option policy gradient 和 termination gradient，可以直接对 option 内策略与终止函数做 actor-critic 更新。
- **行为语义**：如果某个 option 在状态 $s$ 的优势 $A_\Omega(s,\omega)$ 为正，就应该降低终止概率；如果优势为负，就更倾向结束并重新选择 option。
- **影响**：它是深度层次化 RL 的基础架构之一，后续 FeUdal Networks、HIRO 等方法都在不同方向上重写了“高层技能如何指定低层行为”。

#### 🔬 深入细节

##### 论文图示

![Option-Critic experimental illustration](https://ar5iv.labs.arxiv.org/html/1609.05140/assets/x1.png)

原论文主要用 Four Rooms、Pinball 与 Atari 实验展示学习到的 options 与学习曲线，而不是给出单独的网络结构图。上图来自论文 HTML 版本，用于帮助理解 option 在环境中形成可复用的时序行为。

##### Options 的参数化

一个 option 可表示为三元组

$$
\omega = (\mathcal{I}_\omega,\pi_\omega,\beta_\omega),
$$

其中 $\mathcal{I}_\omega$ 是可启动集合，$\pi_\omega(a|s)$ 是 option 内策略，$\beta_\omega(s)$ 是终止概率。Option-Critic 的常见设定是所有 option 在所有状态都可启动，即 $\mathcal{I}_\omega=\mathcal{S}$，这样模型重点放在学习内部行为与终止边界。

执行时采用 call-and-return 机制：高层先采样一个 option，低层连续执行该 option 的动作；每一步之后根据 $\beta_\omega(s')$ 判断是否终止。如果终止，就由 $\pi_\Omega$ 重新选 option；如果不终止，就继续沿用当前 option。

##### Intra-option policy gradient

Option-Critic 的第一条核心结果是 option 内策略梯度：

$$
\frac{\partial \rho}{\partial \theta}
= \sum_{s,\omega}\mu_\Omega(s,\omega|s_0,\omega_0)
\sum_a
\frac{\partial \pi_{\omega,\theta}(a|s)}{\partial\theta}
Q_U(s,\omega,a).
$$

$Q_U(s,\omega,a)$ 表示在状态 $s$、当前 option 为 $\omega$ 时采取动作 $a$ 的价值；$\mu_\Omega$ 是状态-option 对的折扣访问分布。这个公式说明，option 内策略可以像普通策略梯度一样训练，只是 critic 需要知道当前 option。

##### 终止函数梯度

第二条核心结果是终止函数梯度：

$$
\frac{\partial \rho}{\partial \vartheta}
= - \sum_{s',\omega}
\mu_\Omega(s',\omega|s_1,\omega_0)
\frac{\partial \beta_{\omega,\vartheta}(s')}{\partial \vartheta}
A_\Omega(s',\omega),
$$

其中

$$
A_\Omega(s,\omega)=Q_\Omega(s,\omega)-V_\Omega(s).
$$

负号很重要：当当前 option 比重新选择的平均价值更好时，$A_\Omega>0$，梯度会降低终止概率；当当前 option 已经不合适时，$A_\Omega<0$，终止概率会上升。这让 option 学到相对自然的边界，而不是人为规定固定长度。

##### Actor-Critic 实现

深度实现中，critic 估计 $Q_\Omega(s,\omega)$、$V_\Omega(s)$ 或 $Q_U(s,\omega,a)$；actor 同时更新 $\pi_\Omega$、$\pi_\omega$ 和 $\beta_\omega$。经验上，终止函数可能过早学成“每步都终止”，因此论文实现中会加入 termination regularization 或 deliberation cost 的思想，让 option 保持一定持续性。

Option-Critic 的优势在于形式统一：它不需要额外的子目标奖励，也不要求环境暴露层次结构。缺点也同样明显：所有 option 都从同一个任务回报中学习，在稀疏奖励或长程探索任务中，option 可能塌缩成相似策略，难以自动产生真正有语义的技能。

##### 算法伪代码

```text
Initialize policy over options pi_Omega, intra-option policies pi_omega,
termination functions beta_omega, and critic Q_Omega.

for each episode:
    observe state s
    sample option omega ~ pi_Omega(. | s)
    while episode not done:
        sample action a ~ pi_omega(. | s)
        execute a, observe r, s'

        update critic with option-value TD target
        update intra-option policy using Q_U(s, omega, a)
        update beta_omega(s') using - d beta * A_Omega(s', omega)

        if beta_omega(s') terminates:
            sample new option omega ~ pi_Omega(. | s')
        s = s'

Output: learned options and high-level option policy
```

##### 经验结论

在 Four Rooms 中，Option-Critic 能学到穿越门口、移动到房间区域等具有持续性的 option；在 Atari 中，它可以在端到端像素输入上联合学习 option 与控制策略。它的价值更多在于提供了“可微 options”的通用接口，而不是保证每次都能发现人类可解释的技能。

#### 🧪 练习题

```yaml
- question: "Option-Critic 中 beta_omega(s) 表示什么？"
  options:
    A: "option 的终止概率"
    B: "环境转移概率"
    C: "动作价值函数"
    D: "探索噪声强度"
  answer: A
  explain: "beta_omega(s) 决定当前 option 到达状态 s 后是否结束。"
- question: "当 A_Omega(s, omega) 为正时，合理的终止行为是什么？"
  options:
    A: "提高终止概率"
    B: "降低终止概率，继续执行当前 option"
    C: "删除该 option"
    D: "忽略 critic"
  answer: B
  explain: "正优势表示当前 option 比重新选择更好，因此 termination gradient 会倾向于降低终止概率。"
```
