### MRBT — 掩码奖励行为树 (Masking Reward Behavior Tree)

```yaml
id: mrbt
name: MRBT
full_name: 掩码奖励行为树 (Masking Reward Behavior Tree)
year: '2026'
org: arXiv
paper_url: https://arxiv.org/abs/2602.04567
category: reward_design
parent: lagea
motivation: 行为树+SMT确保奖励逻辑可验证
```

#### 📝 一句话总结

MRBT 提出用行为树同时组织奖励塑形和动作掩码，解决组合任务中 LLM 生成奖励缺乏反应性、模块性和形式化验证的问题。它让 LLM 填充 MRBT 模板，再用 SMT 求解器验证子任务逻辑，最后把可验证的 symbolic reward/mask 接入神经 RL 训练。

#### 🎯 核心要点

- **Masking Reward Behavior Tree**：行为树叶节点是带 action mask 的 masking behavior reward machine，tick 后输出奖励和动作掩码
- **组合任务模板**：面向顺序 object-interaction subtasks，模板包含子任务完成条件、接近目标对象条件和对应动作 mask
- **反应性回退**：BT 的 Sequence/Fallback 结构允许前置子任务失效后回到对应子树，而不是继续奖励后续子任务
- **动作掩码与奖励联合设计**：同一符号结构既限制无效动作，又输出 shaping reward，减少奖励和动作约束互相矛盾
- **SMT 形式化验证**：把 completion correctness、non-triviality、proximity correctness、composition persistence 等规格交给 Z3 检查
- **LLM 自动生成闭环**：LLM 依据模板和任务空间生成 MRBT；若 SMT 不满足规格，则把错误反馈重新提示 LLM 修正
- **Neurosymbolic RL**：训练时神经策略负责感知与控制，MRBT 负责基于符号标签提供 reward/mask 指导
- **资料限制**：清单中的 `paper_url` 指向 arXiv:2602.04567，但该链接实际是短视频推荐数据集论文；本文正文基于公开 MRBT 论文 arXiv:2605.05795，YAML 元信息按清单原样保留

#### 🔬 深入细节

##### MRBT 模板示意图

![MRBT 行为树模板](https://arxiv.org/html/2605.05795v2/x2.png)

*图：MRBT 把多个子任务组织成行为树模板，每个叶节点维护简单 reward-machine 状态、奖励函数和动作掩码，内部节点负责反应式执行顺序。*

##### 算法伪代码

```python
# LLM + SMT + MRBT 的自动奖励/掩码生成流程
input: task_space, environment_predicates, MRBT_template

while True:
    mrbt_spec = LLM_generate(
        template=MRBT_template,
        task_space=task_space,
        predicates=environment_predicates,
    )

    logic_formulas = extract_logic(mrbt_spec)
    smt_result = Z3_verify(
        formulas=logic_formulas,
        specs=[
            "completion correctness",
            "completion non-triviality",
            "object proximity correctness",
            "object proximity non-triviality",
            "composition persistence",
        ],
        transition_model=symbolic_env_model,
    )

    if smt_result.sat:
        break
    else:
        MRBT_template = add_counterexample_feedback(MRBT_template, smt_result)

for episode in training:
    task = sample(task_space)
    state = env.reset(task)
    mrbt_state = mrbt.initial_state()

    while not done:
        labels = labeling_function(state, task)
        ticked_leaves = mrbt.tick(labels, mrbt_state)
        reward = sum(leaf.reward for leaf in ticked_leaves)
        action_mask = ticked_leaves[-1].action_mask
        action = policy.sample(obs, mask=action_mask)
        next_state, env_reward, done = env.step(action)
        update_policy(obs, action, env_reward + reward, next_state)
```

##### 动机与背景

许多具身任务本质上是组合任务：先找到某个物体，再操作门，再到达目标区域。直接用 LLM 生成一段奖励代码可以降低人工设计成本，但如果没有反应性，当前置子任务失效时奖励逻辑可能仍然鼓励后续动作；如果没有模块性，换一个物体颜色或房间布局就要重写；如果没有验证，生成代码看似合理却可能在边界状态下给出错误奖励。

行为树适合解决反应性和模块性。BT 每一步从根节点 tick，Sequence 保证顺序，Fallback 支持条件失败后的回退。MRBT 在 BT 叶节点中嵌入 masking behavior reward machine：每个叶节点不仅返回 Success/Running/Failure，还维护状态转移、奖励函数和可用动作集合。

论文把一个 MRBT 形式化为共享逻辑公式集合 \(\mathcal{F}\) 和动作空间 \(\mathcal{A}\) 上的一组叶节点。给定当前标签 \(l_t\)，BT tick 得到叶序列 \(\mathcal{B}_t\)，只更新被 tick 的叶节点：

$$x_{t+1}^b =
\begin{cases}
\delta^b(x_t^b,l_t), & b \in \mathcal{B}_t \\
x_t^b, & b \notin \mathcal{B}_t
\end{cases}$$

奖励和动作掩码由被 tick 的叶节点给出：

$$r_t = \sum_{b \in \mathcal{B}_t} r^b(x_t^b,l_t), \qquad m_t = m^{b_{\text{last}}}(x_t^{b_{\text{last}}},l_t)$$

##### LLM 生成与 SMT 验证

MRBT 的自动化流程并不盲信 LLM。LLM 接收任务空间、环境谓词和 MRBT 模板，生成完成条件、接近条件、奖励函数和动作掩码。随后系统把这些公式放入 Z3，在符号环境转移模型约束下检查若干规格：完成条件必须真的对应子任务完成，接近条件不能平凡为真/假，组合后不能因前序子任务回退而仍保持错误的后续奖励。

这种验证方式比只用专家演示测试更强。演示只能覆盖有限轨迹，SMT 可以主动寻找反例；若发现 unsat 或违反规格，系统把反例作为反馈重新提示 LLM 修正。最终得到的 MRBT 再用于 RL 训练，神经策略仍学习感知到动作的映射，但 symbolic MRBT 提供更密集、更可信的训练信号。

与 LaGEA 的 VLM 时间接地奖励相比，MRBT 更强调离散逻辑正确性。LaGEA 适合视觉连续控制中的失败诊断，MRBT 适合能抽取谓词和任务结构的组合任务。它的主要限制也来自这里：需要环境能提供或学习出稳定谓词，并且 MRBT 模板当前主要覆盖顺序 object-interaction 子任务。

> 💡 关键：MRBT 的价值不只是“LLM 写奖励”，而是让 LLM 的奖励/掩码设计落在行为树模板内，并接受 SMT 反例驱动的形式化检查。

#### 🧪 练习题

```yaml
question: "MRBT 相比普通 LLM 生成奖励函数的核心优势是什么？"
options:
  - "完全不需要环境状态谓词"
  - "把奖励塑形和动作掩码放入可反应、可模块化、可 SMT 验证的行为树结构中"
  - "只使用端到端神经网络，不包含符号逻辑"
  - "通过增加随机探索奖励替代任务奖励"
answer: 1
explain: "MRBT 用行为树管理子任务顺序和回退，用叶节点同时输出奖励与动作掩码，并通过 SMT 检查逻辑规格，减少 LLM 生成奖励的隐藏错误。"
```
