### Reflexion: 反思式语言强化 (Reflexion)

```yaml
id: reflexion
name: Reflexion
full_name: 反思式语言强化 (Reflexion)
year: '2023.03'
org: Princeton/Northeastern
paper_url: https://arxiv.org/abs/2303.11366
category: self_improve
parent: webgpt
motivation: 把失败反馈转成可复用语言记忆
```

#### 📝 一句话总结
Reflexion 是一种不更新模型参数、仅通过**自然语言反思文本**将失败经验注入后续推理上下文的强化学习框架：Agent 行动失败后，LLM 自动生成"自我反思"并存入记忆，下一轮迭代时作为语义提示引导更优决策，由此在 AlfWorld、HotPotQA、HumanEval 等任务上实现显著的累积改进。

#### 🎯 核心要点
- **语言化强化（Verbal RL）**：不修改梯度或权重，把 RL 中的"奖励信号"转化为自然语言的"反思文本"，让 LLM 在语义层面自我纠偏。
- **三组件闭环**：Actor（大模型做出决策动作）→ Evaluator（环境或启发式评估给出二值/等级奖励）→ Self-Reflection（LLM 分析失败原因，生成一段反思口述）。
- **跨Episode记忆**：反思文本存于滑动窗口式的经验缓冲区内，下一Episode作为额外上下文拼接在prompt中，形成"试错—反思—再试"的循环。
- **层级多样性**：根据任务粒度可实现动作级反思（单步错误分析）或轨迹级反思（全局策略缺陷），支持链式多轮反思叠加。
- **无梯度通用性**：模型参数完全固定，适用于任意基于prompt的LLM，可被灵活嵌入ReAct、CoT等推理链路中。

#### 🔬 深入细节
![Reflexion 示意图](https://ar5iv.labs.arxiv.org/html/2303.11366/assets/x1.png)
*图：Reflexion 的核心框架或评测示意。*

##### 示意图（文字描述）

```
┌─────────────┐     action      ┌───────────┐
│   Actor     │ ───────────────→ │Environmen│
│  (LLM)      │                 │     t     │
└─────────────┘                 └───────────┘
       ↑        ←— reward/outcome —   │
       │                              │
       │  ┌──────────────────┐        │
       └──│ Self-Reflection  │←——trajectory+outcome
          │    (LLM)         │
          └──────────────────┘
                    │
                    ↓
          ┌──────────────────┐
          │  Episodic Buffer │
          │  (reflection mem)│
          └──────────────────┘
                    │
    next episode:    │
    prepend to prompt│
                    ↓
              ┌──────────┐
              │  Actor   │  ← 新一轮受已有反思指导
              └──────────┘
```

**图释**：Actor 产生动作，环境反馈结果；Self-Reflection 模块把轨迹和结果总结为一组反思文本，存入 Episodic Buffer；下一次Actor推理时，prompt前缀包含历史反思，形成"从错误中学习"的循环。全程无参数更新。

##### 算法伪代码

```python
# Reflexion 核心循环
buffer = []  # 跨Episode的反思记忆

for episode in range(max_episodes):
    # 1. 构建prompt：任务说明 + 历史反思 + 当前观测
    prompt = build_prompt(task, observation, buffer)

    # 2. Actor 生成动作序列
    trajectory = []
    for step in range(max_steps):
        action = llm_actor(prompt, observation)
        observation, reward, done = environment.step(action)
        trajectory.append((action, observation, reward))
        if done:
            break

    # 3. Evaluator 评定结果
    if reward == SUCCESS:
        break  # 任务成功，停止

    # 4. Self-Reflection：将失败轨迹转成反思文本
    reflection = llm_reflect(trajectory)
    buffer.append(reflection)  # 存入记忆

    # 5. 可选：清理旧反思防止溢出
    if len(buffer) > max_buffer_size:
        buffer = buffer[-max_buffer_size:]
```

##### 核心机制拆解

**1. 动机与背景**  
传统 LLM Agent（如 ReAct）在复杂决策任务中采用"单次推理→执行→终止"模式，即使同一任务多次尝试，前后 trial 之间没有任何信息传递——Agent 可能在相同位置反复犯同样的错误。基于梯度的微调（RLHF/PPO）能改善行为，但计算成本高、需要大量标注，且难以针对每个单独任务实时调整。Reflexion 的洞察在于：既然 LLM 已经展现出强大的语言理解和自我纠错能力（如"Let's think step by step"可以修正推理），为什么不把这种能力系统化，让它自己读自己过去的失败并提炼教训？

**2. 反思生成机制**  
Self-Reflection 用同一 LLM 但切换角色：输入是整个失败轨迹（动作序列、环境反馈、最终结果），提示词要求模型分析"为什么会失败"并"下次应该如何改进"。生成的反思文本形如：

> *"在上次尝试中，我试图在没有先检查抽屉的情况下直接拿取物品，导致反复空操作。下次我应该先打开周围所有可存储容器并记录里面有什么。"*

这种反思是**高度语义化**的，它不编码数值梯度，而是直接作用于模型对任务的理解。反思的类型可以分级：
- **简单反思**：单句指出错误（"我没看清楚目标物体的位置"）。
- **分析式反思**：详细分析根因并给出策略调整。
- **链式反思**：在多次失败后追加更高层级的元反思（"我过于依赖视觉信息而忽略了任务文本中的线索"）。

**3. 与传统方法的本质区别**  
- vs. ReAct：ReAct 在每个 episodes 内做推理-行动循环，但episode之间完全独立。Reflexion 相当于在 ReAct 外层再套一个"学习循环"，向prompt注入跨episode的经验。
- vs. RLHF/PPO：RLHF 改变模型参数，是"永久学习"；Reflexion 不改变参数，是"上下文学习"。前者泛化到同类任务，后者针对当前任务情境高度特化。
- vs. RAG/检索增强：RAG 检索外部知识库的固定文档；Reflexion 的记忆是模型针对自身失败**动态生成**的，随迭代次数演进而更新。
- vs. 思维树(ToT)/思维图(GoT)：后者在单次决策中并行搜索多条推理路径；Reflexion 利用历史试错的信息压缩，在串行Episodes中累积改进。

**4. 训练/推理流程**  

- **无需训练**：整个流程在推理时完成，模型权重冻结。只需设计三组提示词模板（Actor指令、Evaluator规则、Self-Reflection指令）。
- **数据流**：每个Episode开始→Actor读取当前观测+历史反思→生成动作→环境执行→轨迹收集→Episode结束→Evaluator判定→如失败则Reflector生成反思文本追加到buffer→下一Episode开始。
- **Evaluator的灵活性**：对于有明确成功条件的任务（如AlfWorld物品是否放对、HumanEval代码是否通过测试），用二值奖励；对开放式任务（如HotPotQA问答），可用LLM作为启发式评价器（询问"回答是否正确"或使用EM/F1启发式）。
- **Buffer管理**：采用滑动窗口，保持最近N条反思，防止prompt过长；也可用聚类或摘要压缩更长的反思历史。

**5. 关键实验结果**  

Reflexion 在三个不同领域的基准上均展现出显著的迭代提升：
- **AlfWorld（具身AI）**：在134个家务任务上，经过多次反思迭代后成功率从基线显著提高。首次失败的轨迹经过1-2轮反思后，大量任务被纠正。
- **HotPotQA（多跳QA）**：在需要综合多个网页信息的问答任务上，Reflexion 使模型能够从"检索策略不佳"中自我调整，改进了信息检索的覆盖率和准确率。
- **HumanEval（代码生成）**：模型首轮生成代码后若测试失败，Reflexion 能基于错误信息生成反思（"我没有处理边界条件X"），第二次生成的代码通过率大幅提升。这一结果展示了Reflexion在"self-debugging"场景中的实用性。
- 消融实验表明：仅靠"重试"而无反思的基线几乎没有提升；静态提示（如"请更仔细"）的改进微弱；只有基于失败轨迹**动态生成的具体反思**才能驱动显著改进。

> 💡 **关键洞察**：Reflexion 的核心力量不在于模型"更聪明地思考"，而在于它创造了一个**跨Episode的信息通道**——反思文本作为压缩后的经验载体，使得连续试错不再是独立的随机事件，而成为逐步逼近正确解的定向过程。

> ⚠️ **注意**：反思质量高度依赖LLM的自评能力。如果模型连"自己为什么错"都分析不清，反思可能引入噪音甚至误导。实践中需对反思文本做基本校验（如长度过滤、去除空洞套话），且反思prompt需要精心设计（明确要求指出具体错误步骤和可操作的改进措施）。

#### 🧪 练习题
```yaml
question: "Reflexion 与传统强化学习（如 PPO）的核心区别是什么？"
options:
  - "Reflexion 使用更大的模型"
  - "Reflexion 不更新模型参数，而是将失败经验转化为自然语言反思文本注入上下文"
  - "Reflexion 只能用于代码生成任务"
  - "Reflexion 使用对抗训练提升鲁棒性"
answer: 1
explain: "Reflexion 的核心创新在于将强化学习的'利用奖励信号调整策略'转变为'利用语言反思提示引导行为'，全程不涉及梯度计算或参数更新，这使得它即插即用且计算成本极低。"
```
