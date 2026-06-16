### Reflexion：反思机制 (Reflexion)

```yaml
id: reflexion
name: Reflexion
full_name: 反思机制 (Reflexion)
year: 2023
org: Northeastern大学
paper_url: https://proceedings.neurips.cc/paper_files/paper/2023/hash/1b44b878bb782e6954cd888628510e90-Abstract-Conference.html
category: planning
parent: react
motivation: 语言反馈实现自我反思与纠错
```

#### 📝 一句话总结

Reflexion 提出让语言 agent 在失败后把奖励、轨迹和错误转写成自然语言反思，并存入情节记忆供下一次尝试使用，解决传统 RL 需要大量样本和参数更新才能从试错中学习的问题。它把强化信号从标量梯度改造成可读、可复用的 verbal feedback，使 ReAct/CoT 类 agent 能通过上下文记忆快速纠错。

#### 🎯 核心要点

- 三模块框架：Actor 负责生成行动轨迹，Evaluator 负责打分或判断成功，Self-Reflection 负责把失败经验转成语言反馈
- 语言强化：不更新模型权重，而是把反思文本追加到 episodic memory 中，让下一轮 Actor 条件化在过去经验上
- 反馈来源灵活：Evaluator 可以使用精确匹配、环境奖励、启发式规则、单元测试、编译器结果或另一个 LLM 的评价
- 记忆机制：短期记忆是当前 trajectory，长期记忆是若干条 self-reflection；论文实践中通常限制保存 1 到 3 条以适配上下文长度
- 可叠加 agent：Actor 可以是 CoT、ReAct 或其他语言行动模型，Reflexion 是包在外层的试错-反思循环
- 实验覆盖：ALFWorld、HotpotQA、HumanEval、MBPP、LeetcodeHard；在代码生成中利用测试反馈与反思显著提升 pass@1
- 与传统 RL 区别：没有学习价值函数或策略梯度，策略改进通过自然语言记忆改变下一次采样分布

#### 🔬 深入细节

![Reflexion 框架与算法](https://arxiv.org/html/2303.11366/x2.png)
*图：论文 Figure 2 展示 Reflexion 的 Actor、Evaluator、Self-Reflection、Memory 交互，以及“失败后生成反思并重试”的强化流程。*

Reflexion 的问题设定是：LLM agent 已经能与外部环境交互，但一次失败后如何快速学习？传统强化学习会把奖励 \(r\) 用于更新策略参数 \(\theta\)，但对大语言模型 agent 来说，这通常需要大量环境样本、昂贵微调和稳定的奖励设计。Reflexion 改用更贴近语言模型能力的办法：把一次失败的轨迹、奖励和诊断信息交给 Self-Reflection 模型，让它写成“下次应该避免什么、应该先做什么、错误来自哪里”的自然语言经验，并把这段经验放进下一次 prompt。

整个循环可以写成：

$$
\tau_i \sim \pi_\theta(\cdot \mid x, m_i)
$$

$$
r_i, f_i = E(\tau_i), \qquad \rho_i = R_\phi(x, \tau_i, r_i, f_i, m_i)
$$

$$
m_{i+1}=\operatorname{Truncate}_K(m_i \oplus \rho_i)
$$

其中 \(\tau_i\) 是第 \(i\) 次尝试的行动轨迹，\(m_i\) 是已保存的反思记忆，\(E\) 是 Evaluator，\(f_i\) 可以是测试失败信息、环境反馈或语言评价，\(R_\phi\) 是 Self-Reflection 模型，\(\rho_i\) 是新生成的反思。关键点是 \(\theta\) 没有被梯度更新；下一次策略变化来自条件上下文 \(m_{i+1}\) 的变化，因此它是一种 in-context policy improvement。

```python
# Reflexion 强化式自反思循环伪代码
memory = []

for trial in range(max_trials):
    trajectory = Actor.run(task_input, memory=memory)
    reward, feedback, passed = Evaluator.score(task_input, trajectory)

    if passed:
        return trajectory

    reflection = SelfReflection.generate(
        task=task_input,
        trajectory=trajectory,
        reward=reward,
        feedback=feedback,
        memory=memory,
    )
    memory.append(reflection)
    memory = memory[-max_memory_items:]

return best_trajectory_seen
```

Actor 是实际完成任务的 agent，可以是普通 CoT，也可以是 ReAct。若 Actor 是 ReAct，它在一次 trial 内仍然会产生 `Thought -> Action -> Observation` 轨迹；Reflexion 关注的是 trial 与 trial 之间如何学习。Evaluator 则把轨迹转成奖励或成功信号：在 HotpotQA 中可以用 exact match 判断答案，在 ALFWorld 中可以用环境是否达成目标判断，在 HumanEval/MBPP 中可以运行单元测试或编译器。Self-Reflection 不只是复述“失败了”，而是把稀疏奖励放大为可操作建议，例如“我过早选择了厨房，应该先检查客厅的容器”或“函数没有处理空列表，下次先加边界条件”。

这个设计的优势在于语言反馈比标量奖励信息密度更高。一个 \(0/1\) reward 只能说明失败，但不能告诉模型失败路径中哪一步错了；一段反思可以指出错误动作、错误假设、遗漏约束和下一次策略。对 LLM 来说，自然语言建议正好是它最容易消费的控制信号。Reflexion 因此把 reward shaping 的工作从数值函数转移到语言空间：Evaluator 提供任务真实反馈，Self-Reflection 把反馈解释成下一轮 prompt 中可用的经验。

Memory 是 Reflexion 区别于普通 self-refine 的关键。Self-refine 往往在同一次输出上迭代修改，目标是改好当前答案；Reflexion 则保存跨 trial 的情节经验，目标是让 agent 下次从不同初始轨迹开始时避免同类错误。论文把当前 trajectory 视为短期记忆，把 self-reflection 文本视为长期记忆，但受上下文窗口限制，长期记忆不能无限增长。实践中保留最近或最有用的 1 到 3 条反思通常更稳，因为过多历史会稀释当前任务条件，甚至把过时经验带入新状态。

在代码生成任务中，Reflexion 的机制尤其直观。Actor 先写一个函数实现，Evaluator 运行公开或生成的测试得到失败用例和错误栈，Self-Reflection 将其总结成“当前实现未覆盖负数”“循环边界少算最后一个元素”等语言提示，再让 Actor 重写。它与 CodeRL/传统调试式方法的差异是：Reflexion 不把测试结果只当作数值奖励，也不一定训练新的 critic，而是把测试反馈转译为下一轮可读的规划约束。论文报告 HumanEval pass@1 可达到 91%，说明在有清晰反馈通道的任务中，语言反思能显著提升单次最终提交质量。

Reflexion 也有明显边界。如果 Evaluator 错误、反馈不充分或 Self-Reflection 生成了错误归因，记忆会把 agent 带向更坏策略；如果任务需要全新知识而反馈只告诉“错”，反思也可能只是编造理由。因此它最适合有可验证反馈的环境，例如单元测试、游戏成功信号、检索问答的答案匹配，或能返回结构化错误的 API。把 Reflexion 看成外层元控制器会更准确：它不替代 ReAct 的行动循环，而是在多次行动循环之间提供语言化的经验累积。

> 💡 关键：Reflexion 的“强化”不在参数空间，而在上下文记忆空间；reward 被翻译成 reflection，reflection 再改变下一次 Actor 的条件分布。

#### 🧪 练习题

```yaml
question: "Reflexion 中 Self-Reflection 模块的主要作用是什么？"
options:
  - "直接通过梯度下降更新 Actor 的模型权重"
  - "把轨迹和反馈转写成自然语言经验，并存入记忆供下一轮使用"
  - "替代环境执行动作，避免与外部系统交互"
  - "只输出一个标量价值函数供搜索算法排序"
answer: 1
explain: "Reflexion 的核心是 verbal reinforcement：失败反馈被总结为反思文本，随后作为 episodic memory 条件化下一次 Actor。"
```
