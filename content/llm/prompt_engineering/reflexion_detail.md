### Reflexion：反思学习 (Reflexion)
```yaml
id: reflexion
name: Reflexion
full_name: 反思学习 (Reflexion)
year: '2023.03'
org: MIT/Northeastern
paper_url: https://proceedings.neurips.cc/paper_files/paper/2023/hash/1b44b878bb782e6954cd888628510e90-Abstract-Conference.html
category: optimization
parent: self_refine
motivation: 语言反馈实现无梯度闭环学习
```

#### 📝 一句话总结
Reflexion 把失败轨迹、环境反馈和模型自我批评压缩成自然语言记忆，让同一个大模型在不更新参数的情况下，通过下一轮上下文逐步改进决策。

#### 🎯 核心要点
- 将强化学习式的试错闭环改写为“执行-评估-反思-重试”的语言闭环
- 不做梯度更新，改用 episodic memory 保存反思文本作为下一次尝试的上下文
- 由 Actor 产生动作轨迹，Evaluator 给出成功信号或分数，Self-Reflection 模块生成可执行的改进建议
- 适合有明确外部反馈的任务，如代码生成、交互式决策、问答和工具使用
- 反思文本起到“语义梯度”的作用，指出上一轮失败原因和下一轮策略
- 主要风险是反思质量依赖模型自身判断，错误反思会被记忆放大

#### 🔬 深入细节
![Reflexion 闭环流程图](https://raw.githubusercontent.com/noahshinn/reflexion/main/figures/reflexion_rl.png)
*图源：Reflexion 官方 GitHub，展示 Actor、Evaluator、Self-Reflection 与记忆之间的闭环。*

```python
# Reflexion 推理-反思循环伪代码
def reflexion_solve(task, actor, evaluator, reflector, max_trials=5, memory_size=3):
    memory = []
    for trial in range(max_trials):
        trajectory = actor.generate(task=task, reflections=memory)
        score, feedback = evaluator(trajectory)
        if score == "success":
            return trajectory.final_answer

        reflection = reflector.generate(
            task=task,
            failed_trajectory=trajectory,
            feedback=feedback,
            prior_reflections=memory,
        )
        memory = (memory + [reflection])[-memory_size:]
    return trajectory.final_answer
```

Reflexion 的核心不是让模型“多想一遍”，而是把任务反馈转写成后续可复用的语言状态。传统强化学习会把奖励信号用于参数更新；Reflexion 则把奖励、错误、轨迹和诊断合成为一段反思文字，再放回 prompt。这样模型在下一轮看到的不是裸任务，而是“任务 + 过去失败原因 + 应避免的策略”。

Actor、Evaluator、Self-Reflection 三个角色可以由同一个 LLM 扮演，也可以由不同模型或外部环境承担。Actor 负责产生动作序列；Evaluator 只需要给出可判定反馈，例如单元测试是否通过、答案是否正确、游戏是否成功；Reflector 将这些反馈转换成更高层的策略建议。系统成功的关键在于反思要足够具体，例如指出哪个假设错了、遗漏了哪个约束、下一轮应该先验证什么。

从算法角度看，Reflexion 是一种上下文级的信用分配。失败不是直接变成一个标量惩罚，而是被解释为可读的因果线索。记忆长度通常需要受限，因为过多反思会污染上下文并消耗 token；论文中的设置更接近短期经验缓冲区，而不是永久知识库。

它与 Self-Refine 的区别在于反馈来源和循环粒度。Self-Refine 通常针对单个输出做局部修改；Reflexion 面向跨 episode 的任务尝试，把完整轨迹和环境反馈纳入下一轮策略。在工具使用或代码任务中，这种跨轮记忆尤其有效，因为失败信号往往来自真实执行结果，而不是模型自评。

#### 🧪 练习题
```yaml
question: "Reflexion 为什么可以被称为无梯度学习？"
options:
  - "它完全不使用模型输出"
  - "它通过自然语言反思更新上下文，而不是更新模型参数"
  - "它只训练一个额外分类器"
  - "它要求人工手写所有反馈"
answer: 1
explain: "Reflexion 将失败反馈写入短期记忆，下一轮通过 prompt 条件化行为，参数本身不发生梯度更新。"
```
