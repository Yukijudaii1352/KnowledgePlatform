### DIAYN — 多样即所需 (Diversity is All You Need)

```yaml
id: diayn
name: DIAYN
full_name: "多样即所需 (Diversity is All You Need)"
year: "2018"
org: UC Berkeley
paper_url: https://arxiv.org/abs/1802.06070
category: skill_hierarchical
parent: sac
motivation: "最大化互信息发现多样化技能"
```

#### 📝 一句话总结

DIAYN 在没有外部奖励的环境中最大化技能变量与访问状态之间的互信息，让智能体自动发现可区分、可持续且高熵的多样化技能。

#### 🎯 核心要点

- **无监督技能发现**：不给任务奖励，只给一个离散或连续 skill code $z$，要求不同 $z$ 产生可被判别器区分的状态分布。
- **互信息目标**：最大化 $I(S;Z)$，让状态能反推出技能；同时最大化策略熵，使每个技能内部仍保持探索性。
- **判别器奖励**：训练判别器 $q_\phi(z|s)$ 预测当前状态来自哪个技能，策略获得 $\log q_\phi(z|s)-\log p(z)$ 作为内在奖励。
- **SAC 结合**：DIAYN 使用最大熵 RL，通常以 SAC 作为底层优化器，天然匹配熵正则目标。
- **迁移方式**：预训练技能可作为下游任务的初始化、层次化高层动作空间或模仿学习的行为先验。

#### 🔬 深入细节

##### 算法图

![DIAYN algorithm overview](https://ar5iv.labs.arxiv.org/html/1802.06070/assets/x1.png)

图中有两个同时更新的模块：判别器学习从状态识别技能，技能策略学习访问让自己更容易被识别的状态。这个闭环不需要环境任务奖励。

##### 互信息目标

DIAYN 的核心目标可写成

$$
\max_\theta I(S;Z) + H[A|S] - I(A;Z|S).
$$

其中 $I(S;Z)$ 鼓励不同技能访问不同状态；$H[A|S]$ 鼓励动作熵；$I(A;Z|S)$ 的负项避免技能只在同一状态下选择不同动作，而不产生状态差异。通过变分下界，互信息项可近似为

$$
I(S;Z) \ge
\mathbb{E}_{z\sim p(z),s\sim \pi_\theta(\cdot|z)}
[\log q_\phi(z|s)-\log p(z)].
$$

这就把无监督技能发现转化成普通 RL 奖励设计。

##### 内在奖励

策略在每一步收到的奖励是

$$
r_z(s,a,s') = \log q_\phi(z|s') - \log p(z).
$$

如果技能先验 $p(z)$ 是均匀分布，$-\log p(z)$ 是常数；真正驱动学习的是判别器对 $z$ 的置信度。某个技能越能把智能体带到独特状态，判别器越容易识别它，该技能得到的奖励越高。

判别器只看状态，不看动作。这一点防止策略通过不可见或无意义的动作编码技能，例如在原地抖动不同关节但不改变环境状态。

##### 与 SAC 的结合

SAC 的最大熵目标为

$$
J(\pi)=
\sum_t \mathbb{E}[r_z(s_t,a_t,s_{t+1})+\alpha H(\pi(\cdot|s_t,z))].
$$

DIAYN 直接把判别器奖励作为 SAC 的任务奖励。策略输入包含状态和技能 code，critic 也以 $z$ 为条件。训练完成后，固定 $z$ 就得到一个具体技能；高层策略可以在下游任务中选择 $z$ 作为抽象动作。

##### 为什么不会只学随机行为

单纯最大化熵会导致随机游走，但 DIAYN 要求状态能预测技能。随机行为如果所有技能访问同一分布，判别器无法区分，奖励就低。反过来，技能如果只做确定性动作但状态不变化，也不会被判别器可靠识别。因此 DIAYN 倾向学习“可区分的状态占据分布”。

##### 算法伪代码

```text
Initialize skill prior p(z), policy pi_theta(a | s, z),
discriminator q_phi(z | s), and SAC critics.

while not converged:
    sample skill z ~ p(z)
    reset environment and condition policy on z
    for each environment step:
        sample action a ~ pi_theta(. | s, z)
        observe next state s'
        compute intrinsic reward:
            r = log q_phi(z | s') - log p(z)
        store (s, z, a, r, s') in replay buffer

    update q_phi to maximize log q_phi(z | s)
    update SAC policy and critics using intrinsic reward r

Output: diverse skill-conditioned policy pi_theta(a | s, z)
```

##### 实验与局限

论文展示了 MuJoCo 等环境中的多样技能，例如不同方向移动、跳跃或姿态变化，并验证这些技能可迁移到下游奖励任务。局限在于“多样”不等于“有用”：如果环境中最容易区分的状态与下游任务无关，DIAYN 可能学到漂亮但不实用的技能。因此实际系统常把 DIAYN 与任务筛选、高层规划或示范数据结合。

#### 🧪 练习题

```yaml
- question: "DIAYN 中判别器 q_phi(z|s) 的作用是什么？"
  options:
    A: "预测状态来自哪个技能，并为策略提供互信息奖励"
    B: "预测环境真实奖励"
    C: "替代 replay buffer"
    D: "生成物理仿真参数"
  answer: A
  explain: "判别器越能从状态识别技能，说明技能越可区分，策略获得的内在奖励越高。"
- question: "DIAYN 为什么通常与 SAC 搭配？"
  options:
    A: "SAC 是最大熵 RL，天然匹配 DIAYN 的熵正则目标"
    B: "SAC 不需要任何 critic"
    C: "SAC 只能处理离散动作"
    D: "SAC 会自动提供人工子目标"
  answer: A
  explain: "DIAYN 需要同时最大化判别器奖励和策略熵，SAC 正好提供稳定的最大熵 off-policy 优化。"
```
