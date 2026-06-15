### 反思机制 (Reflexion)

```yaml
id: reflexion
name: Reflexion
full_name: 反思机制 (Reflexion)
year: '2023'
org: Northeastern大学
paper_url: https://proceedings.neurips.cc/paper_files/paper/2023/hash/1b44b878bb782e6954cd888628510e90-Abstract-Conference.html
category: planning
parent: react
motivation: 语言反馈实现自我反思与纠错
```

#### 📝 一句话总结

Reflexion 提出不用更新模型权重，而是把环境反馈转成自然语言反思并写入 episodic memory，让语言智能体在后续尝试中利用过去失败经验自我纠错。

#### 🎯 核心要点

- **语言强化学习**：用 verbal feedback 作为“语义梯度”，替代传统 RL 的参数更新
- **三组件结构**：Actor 执行动作，Evaluator 给出奖励或反馈，Self-Reflection 生成反思文本
- **Episodic memory**：保存过去尝试、失败原因和改进建议，作为下一轮 prompt 上下文
- **反馈源灵活**：支持二值成功失败、标量分数、编译器错误、单元测试结果或自由文本反馈
- **与 ReAct 兼容**：Actor 可采用 ReAct 轨迹，在失败后由反思模块总结错误
- **跨任务验证**：用于顺序决策、代码生成和语言推理等任务
- **无需模型微调**：优化发生在上下文和记忆层面，适合闭源 LLM

#### 🔬 深入细节

##### 核心示意图

![Reflexion 框架图](https://ar5iv.labs.arxiv.org/html/2303.11366/assets/x2.png)
*图：Reflexion 的反思强化流程。Actor 尝试任务，Evaluator 提供反馈，Self-Reflection 生成反思并写入记忆，下一轮再注入 prompt。图源：ar5iv 论文 HTML。*

##### 算法伪代码

```python
# Reflexion 语言反馈强化伪代码
def reflexion(task, actor, evaluator, reflector, max_trials=5):
    memory = []
    for trial in range(max_trials):
        trajectory = actor.run(task, memory=memory)
        score, feedback = evaluator.evaluate(task, trajectory)

        if evaluator.success(score, feedback):
            return trajectory.final_answer

        reflection = reflector.generate(
            task=task,
            trajectory=trajectory,
            feedback=feedback,
            score=score
        )
        memory.append(reflection)

    return best_attempt(memory)
```

##### 方法解读

传统强化学习通过奖励信号更新策略参数，但对大语言模型 agent 来说，环境交互成本高、模型参数可能不可访问，在线微调也昂贵。Reflexion 的核心问题是：能否不更新权重，只更新“语言记忆”，让 agent 从失败中改进？答案是把反馈转写为自然语言反思。

一个 Reflexion 过程包含 Actor、Evaluator 和 Self-Reflection。Actor 负责执行任务，常用 ReAct 格式产生 Thought、Action、Observation。Evaluator 根据任务给出成功失败、分数或错误信息。Self-Reflection 模块读取轨迹和反馈，生成类似“上次失败是因为没有检查 X，下一次应先做 Y”的文本。

这些反思被存入 episodic memory，并在下一次尝试时拼接进 prompt。这样，模型虽然参数不变，但条件分布改变了：

$$p_\theta(a_t \mid x, \tau_{<t}, m_{1:k})$$

其中 \(m_{1:k}\) 是历史反思。反思文本相当于把奖励信息压缩成可读策略建议，为下一轮决策提供方向。

Reflexion 的优势在于反馈接口非常通用。代码任务可以使用单元测试失败信息，问答任务可以使用答案正确性，交互环境可以使用成功率或轨迹评分。只要反馈能被转成文本，Reflexion 就能把它纳入下一轮上下文。

局限也很清楚：反思质量依赖 LLM 的自我诊断能力。如果模型无法正确归因失败，memory 可能写入错误建议，导致下一轮更差。Retroformer 后续正是针对这一点，引入可训练的 retrospective model，用环境奖励优化反思模块。

> 💡 关键：Reflexion 把“学习”从参数空间搬到语言上下文空间，用文本记忆实现快速试错。

#### 🧪 练习题

```yaml
question: "Reflexion 与传统 RL 最大的区别是什么？"
options:
  - "Reflexion 通过自然语言反思更新 prompt 记忆，而不是直接更新模型权重"
  - "Reflexion 不使用任何环境反馈"
  - "Reflexion 只能用于图像分类"
  - "Reflexion 必须训练一个价值网络"
answer: 0
explain: "Reflexion 将反馈转成反思文本并写入 episodic memory，让下一次尝试通过上下文改变行为。"
```
