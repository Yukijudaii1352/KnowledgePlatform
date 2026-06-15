### SkillRL — 递归技能增强RL (Recursive Skill-Augmented RL)

```yaml
id: skillrl
name: SkillRL
full_name: "递归技能增强RL (Recursive Skill-Augmented RL)"
year: "2026"
org: arXiv
paper_url: https://arxiv.org/abs/2602.08234
category: skill_hierarchical
parent: hiro
motivation: "技能库递归演进处理超长程任务"
```

#### 📝 一句话总结

SkillRL 面向长程 LLM agent 任务，把轨迹蒸馏成可检索技能库，再在 RL 训练中根据失败案例递归更新技能，使策略和技能库共同演化。

#### 🎯 核心要点

- **任务背景**：ALFWorld、WebShop、搜索类任务需要长程规划、工具使用和多步环境交互，单纯强化学习容易在稀疏成功信号下低效探索。
- **技能表示**：SkillRL 将历史轨迹压缩成自然语言技能，组织为 general skills 与 task-specific skills 的层次化 SkillBank。
- **训练流程**：先从基础模型采样轨迹，再用教师模型蒸馏技能，随后进行冷启动 SFT 和基于 GRPO 的 RL 微调。
- **递归演进**：每轮验证后分析失败轨迹，生成或修订技能，将新技能加入 SkillBank，并在后续训练中检索使用。
- **经验发现**：论文报告 SkillRL 在 ALFWorld 等任务上优于直接 GRPO，说明“轨迹蒸馏成技能”比把完整轨迹塞进上下文更稳定。

#### 🔬 深入细节

##### 框架示意

![SkillRL framework overview](https://ar5iv.labs.arxiv.org/html/2602.08234/assets/x2.png)

图中展示了 SkillRL 的闭环：收集轨迹、蒸馏技能、冷启动训练、RL 优化、失败分析与动态技能演化。与传统 HRL 的连续控制 goal 不同，这里的技能主要是可读、可检索的语言程序或策略片段。

##### 为什么需要技能库

长程 agent 任务的动作空间通常是自然语言命令、网页点击、搜索查询或工具调用，episode 成功率低且延迟奖励严重。直接用 RL 从最终成功奖励学习，会让模型反复探索同类错误。SkillRL 的假设是：历史轨迹中包含可迁移的局部策略，应被抽象成技能并在新 episode 中复用。

技能库可以看成高层记忆：

$$
\mathcal{B}=\{b_i=(d_i,u_i,c_i)\}_{i=1}^{N},
$$

其中 $d_i$ 是技能描述，$u_i$ 是使用方式或步骤，$c_i$ 是适用条件。策略在当前状态 $s_t$ 下检索 top-$K$ 技能，再把技能作为上下文的一部分生成动作。

##### 差分轨迹处理

SkillRL 不把所有轨迹同等加入训练。成功轨迹会被保留为正向 demonstration，用于提炼可复用步骤；失败轨迹则被压缩成 failure lessons，强调哪些判断、顺序或工具调用导致失败。这样可以避免把冗长、重复、低质量的原始轨迹直接灌入上下文。

这种差分处理对应一个信息过滤过程：

$$
\text{Skill} = f_{teacher}(\tau, y),
$$

其中 $\tau$ 是轨迹，$y$ 是成功或失败标签。成功样本提供“该怎么做”，失败样本提供“不要再怎么做”以及可修正的新技能。

##### 冷启动与 GRPO

在 RL 之前，SkillRL 先做 cold-start SFT，让基础模型学会读取检索技能并按技能格式行动。随后使用 GRPO 进行策略优化。GRPO 的核心是对同一问题采样一组回答或轨迹，用组内相对奖励估计优势，而不单独训练 critic：

$$
J_{\text{GRPO}}(\theta)=
\mathbb{E}\left[
\frac{1}{G}\sum_{i=1}^{G}
\min\left(
r_i(\theta)A_i,\,
\text{clip}(r_i(\theta),1-\epsilon,1+\epsilon)A_i
\right)
\right].
$$

这里 $r_i(\theta)$ 是新旧策略概率比，$A_i$ 来自组内奖励归一化。对长程 agent 来说，省掉 critic 可以降低不稳定性，但仍保留 PPO 式 clipped update。

##### 递归技能演化

每轮 RL 后，系统在验证环境上运行当前 agent，收集失败案例。教师模型分析失败原因，可能产生新技能、合并旧技能或修改技能适用条件。于是下一轮训练的策略分布变为

$$
\pi_{\theta_{k+1}}(a|s,\text{Retrieve}(s,\mathcal{B}_{k+1})),
$$

而技能库也从 $\mathcal{B}_k$ 更新到 $\mathcal{B}_{k+1}$。这就是“recursive skill-augmented”的含义：策略改进改变数据分布，数据分布反过来触发技能库演进。

##### 算法伪代码

```text
Input: base LLM policy, environments, teacher model, initial trajectories.

1. Collect successful and failed trajectories with the base policy.
2. Distill trajectories into a hierarchical SkillBank:
      successful trajectories -> reusable procedural skills
      failed trajectories -> failure lessons and corrected skills
3. Train a cold-start policy with SFT to use retrieved skills.
4. Repeat for RL iterations:
      retrieve top-K skills for each environment state/task
      sample G rollouts with the current policy
      compute task rewards and GRPO advantages
      update policy with clipped GRPO objective
      run validation episodes
      analyze failures with teacher model
      add, revise, or merge skills in SkillBank

Output: skill-augmented agent and evolved SkillBank
```

##### 与具身 HRL 的联系

虽然 SkillRL 面向 LLM agents，而不是传统机器人连续控制，它与 HIRO 等 HRL 方法共享一个思想：高层结构减少长程探索难度。HIRO 的高层动作是状态目标，SkillRL 的高层结构是语言技能检索。二者都把长 episode 拆成可复用的局部能力，只是技能载体不同。

公开资料显示该论文为 2026 年 arXiv 工作，解读依据 arXiv 摘要、HTML 论文图与公开方法描述。若正式会议版本调整实验数字或算法细节，应以后续版本为准。

#### 🧪 练习题

```yaml
- question: "SkillRL 的 SkillBank 主要存储什么？"
  options:
    A: "可检索、可复用的语言技能和失败经验"
    B: "MuJoCo 关节角速度"
    C: "随机初始化权重"
    D: "只包含最终奖励的标量表"
  answer: A
  explain: "SkillBank 把成功轨迹和失败分析蒸馏成可供 agent 检索使用的技能。"
- question: "SkillRL 中递归演进指的是什么？"
  options:
    A: "每轮训练后根据失败案例更新技能库，再用新技能继续训练策略"
    B: "只增加神经网络层数"
    C: "把所有旧数据删除"
    D: "固定技能库不再变化"
  answer: A
  explain: "策略训练与技能库更新形成闭环，失败案例会触发新技能或技能修订。"
```
