### MetaWorld-HRL — 元世界层次化RL (MetaWorld Hierarchical RL)

```yaml
id: metaworld_hrl
name: MetaWorld-HRL
full_name: "元世界层次化RL (MetaWorld Hierarchical RL)"
year: "2026"
org: arXiv
paper_url: https://arxiv.org/abs/2601.17507
category: skill_hierarchical
parent: skillrl
motivation: "层次化世界模型技能迁移组合"
```

#### 📝 一句话总结

MetaWorld-HRL 用 VLM 语义解析、专家技能迁移和 latent world model 控制组成三层架构，把高层指令分解为可组合技能并在物理层执行。

#### 🎯 核心要点

- **目标问题**：复杂具身任务需要从语言或视觉指令中识别意图，再组合已有技能完成长程物理控制。
- **三层架构**：语义层用 VLM 解析任务；技能迁移层选择和融合专家策略；物理层在世界模型中做低层控制。
- **专家融合**：VLM 根据任务和环境给出专家权重，动态专家选择模块再根据当前状态调整每个专家的贡献。
- **世界模型**：低层采用 latent dynamics model，把高维观测压缩成可规划状态，并结合专家先验改进动作搜索或策略优化。
- **公开限制**：该论文是 2026 年 arXiv/Workshop 工作；以下解读基于公开 arXiv 摘要、HTML 正文、方法图与实验表述。

#### 🔬 深入细节

##### 框架示意

![MetaWorld-HRL framework](https://ar5iv.labs.arxiv.org/html/2601.17507/assets/framework.jpg)

图中可以看到三层：semantic layer 负责把观察和指令转成技能序列，skill transfer layer 利用专家策略先验，physical layer 通过 latent dynamics model 执行控制。这里的 MetaWorld-HRL 是该论文中的层次世界模型方法，不等同于早期的 Meta-World 多任务基准本身。

##### 语义到物理的分解

论文将策略分解为高层语义决策和低层物理控制：

$$
\pi(a_t|s_t,T)=\pi_{\text{phys}}(a_t|s_t,\pi_{\text{sem}}(T)),
$$

其中 $T$ 是高层任务指令，$\pi_{\text{sem}}$ 产生技能组合或专家先验，$\pi_{\text{phys}}$ 在当前状态下执行具体动作。这种分解的好处是：语言理解和接触动力学不必由同一个端到端策略同时学习。

##### VLM 专家权重

给定任务 $T$ 和环境观测 $E$，VLM 输出专家相关性评分：

$$
w=f_{\text{VLM}}(T,E).
$$

论文用 softmax 归一化得到专家权重：

$$
w_i=\frac{\exp(\text{score}_i)}
{\sum_j \exp(\text{score}_j)}.
$$

高层技能先验可写为专家策略的加权组合：

$$
\pi_{\text{sem}}(T)=\sum_i w_i \pi_{\text{exp}}^i.
$$

这个模块让模型能够从“开门”“移动”“保持平衡”等已有专家中组合出新任务策略。

##### 状态感知动态选择

静态 VLM 权重只反映任务整体相似性，但同一任务不同阶段可能需要不同专家。MetaWorld-HRL 因此引入状态感知选择：

$$
p(i|s_t)=
\frac{\exp(\phi(s_t)^\top \psi(\pi_{\text{exp}}^i))}
{\sum_{j=1}^{K}\exp(\phi(s_t)^\top \psi(\pi_{\text{exp}}^j))}.
$$

$\phi(s_t)$ 是状态表示，$\psi(\pi_{\text{exp}}^i)$ 是专家嵌入。这样系统可以在接近门把手时更依赖 reach/grasp 专家，在推动阶段更依赖 door/open 专家。

##### 层次化世界模型控制

物理层借助 latent dynamics model 预测未来：

$$
z_{t+1}=f_\theta(z_t,a_t), \quad
\hat r_t = r_\theta(z_t,a_t).
$$

专家策略不是直接替代控制器，而是作为 motion prior 或 guidance 融入模型预测控制。低层在 latent space 中搜索动作时，会同时考虑任务回报、动力学一致性和专家先验，从而减少从零探索复杂运动的成本。

##### 实验信号

公开论文描述了 Humanoid-Bench 等任务上的结果，尤其强调 walk、stand、run、reach、door 等技能迁移与组合。消融实验显示，去掉 VLM 语义层、专家 guidance 或动态专家选择都会明显降低性能，说明三层结构不是简单堆模块，而是在任务解析、技能选择和物理执行上各自承担角色。

##### 算法伪代码

```text
Input: task instruction T, visual observation E, expert policy library,
latent world model, physical controller.

1. Semantic layer:
      use VLM to parse T and E
      produce skill sequence or expert relevance scores
2. Skill transfer layer:
      normalize expert weights with softmax
      compute state-aware expert probabilities p(i | s_t)
      fuse selected expert priors into a motion prior
3. Physical layer:
      encode observation into latent state z_t
      roll out candidate actions with latent dynamics model
      score candidates by task reward and expert guidance
      execute the first action
4. Repeat until task completion or horizon limit.

Output: composed hierarchical policy for the instruction
```

##### 适用与局限

MetaWorld-HRL 适合已经有专家库、并且新任务可由已有技能组合完成的场景。它不适合完全没有可迁移专家的冷启动问题；VLM 解析错误也会把后续控制引向错误技能。另外，世界模型在接触丰富的机器人任务中可能积累预测误差，因此需要动态重规划和真实反馈闭环。

#### 🧪 练习题

```yaml
- question: "MetaWorld-HRL 的三层架构不包括哪一项？"
  options:
    A: "语义层"
    B: "技能迁移层"
    C: "物理控制层"
    D: "固定随机动作层"
  answer: D
  explain: "论文框架由语义解析、技能迁移和物理控制组成，没有固定随机动作层。"
- question: "VLM 在 MetaWorld-HRL 中的主要作用是什么？"
  options:
    A: "根据任务和环境解析高层意图并给出专家/技能权重"
    B: "直接输出每个关节的力矩"
    C: "替代世界模型预测动力学"
    D: "删除所有专家策略"
  answer: A
  explain: "VLM 负责语义层，把高层指令映射到可组合技能或专家先验。"
```
