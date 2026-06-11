### Reflexion: 语言反思强化 (Reflexion)

```yaml
id: reflexion
name: Reflexion
full_name: 语言反思强化 (Reflexion)
year: '2023.03'
org: Northeastern
paper_url: https://arxiv.org/abs/2303.11366
category: closed_loop
parent: react
motivation: 把失败教训写入记忆驱动重试
```

#### 📝 一句话总结
Reflexion 是一种不更新模型参数、仅通过**自然语言反思文本**将试错失败的经验注入后续推理上下文的强化学习框架：LLM Agent 行动失败后，自动生成“自我反思”存入跨回合记忆，下一轮迭代作为语义引导纠正错误决策，由此在 AlfWorld、HotPotQA、HumanEval 等任务上实现 11%–22% 的绝对提升。

#### 🎯 核心要点
- **语言化强化（Verbal RL）**：把 RL 的奖励信号转化为自然语言反思文本，以“语义梯度”替代数值梯度，全程不涉及模型权重更新
- **三组件闭环架构**：Actor（LLM 生成决策）→ Evaluator（环境或启发式判定成败）→ Self-Reflection（LLM 分析失败根因，输出一段操作性反思文本）
- **跨 Episode 记忆缓冲**：失败反思存入滑动窗口式的 Episodic Memory Buffer，下轮推理时拼入 prompt 前缀，形成“试错→反思→重试”的累积学习循环
- **多层反思粒度**：支持动作级反思（单步错误）和轨迹级反思（全局策略缺陷），并以链式多轮反思叠加构建高层元反思
- **多源头反馈信号**：支持二元环境信号、手写启发式规则、LLM 自评分类、自写单元测试等多种评估方式，灵活适配不同任务
- **全新基准 LeetcodeHardGym**：贡献 40 道 Leetcode Hard 级编程题的 RL Gym 环境，覆盖 19 种编程语言
- **三个领域 SOTA 提升**：AlfWorld +22%（134 任务 12 轮迭代后 130/134 解决），HotPotQA +20%，HumanEval pass@1 达 91%（超越 GPT-4 的 80%）

#### 🔬 深入细节
##### 核心框架图

![Reflexion 核心框架图](https://arxiv.org/html/2303.11366/x1.png)
*图：Reflexion 在决策、编程、推理三类任务上的工作示意——Agent 经试错、自我反思、记忆回注三阶段累积改进*

##### 算法伪代码

```python
# Reflexion 核心循环
buffer = []  # 跨 Episode 的反思记忆（滑动窗口，默认保留最近 3 条）

for episode in range(max_episodes):
    # 1. 构建 prompt：任务指令 + 历史反思 + 当前观测
    prompt = build_prompt(task_desc, observation, buffer)

    # 2. Actor 执行轨迹
    trajectory = []
    for step in range(max_steps):
        action = llm_actor(prompt, observation)     # LLM 生成思考+动作
        observation, reward, done = env.step(action)
        trajectory.append((action, observation, reward))
        if done: break

    # 3. Evaluator 判定结果
    result = evaluator(trajectory)   # 二值/等级/启发式
    if result == SUCCESS:
        break  # 任务完成

    # 4. Self-Reflection：失败轨迹 → 自然语言反思
    reflection = llm_reflect(trajectory, result)
    buffer.append(reflection)

    # 5. 滑动窗口截断，防止 prompt 超长
    if len(buffer) > MAX_BUFFER_SIZE:
        buffer = buffer[-MAX_BUFFER_SIZE:]
```

##### 核心机制拆解

**1. 动机与背景——跨回合信息断层的难题**

传统 LLM Agent 框架（如 ReAct）尽管能够在单次 Episode 内进行“推理-行动-观察”的循环，但**不同 Episode 之间完全独立**——Agent 可能在完全相同的位置重复犯同样的错误（如 AlfWorld 中反复误判“我已持有该物品”）。基于梯度微调的方案（RLHF/PPO）可以全局改善行为，但计算开销巨大、需大量训练数据，无法按单个任务实时调整。

Reflexion 的核心洞察在于：**LLM 本身已具备从文本中理解自身错误并生成改进策略的元能力**（如“Let’s think step by step”现象），只需系统化地将其置入跨 Episode 的记忆流转循环，即可在不触碰权重的前提下实现定向行为优化。

**2. 反思生成——从失败轨迹到可操作策略**

Self-Reflection 模块复用同一 LLM，但切换角色指令：输入为完整失败轨迹（动作序列、环境反馈、最终失败结果），要求模型分析“哪里出错”及“下次如何改进”。生成的反思文本高度语义化，例如：

> *“在上次尝试中，我误以为已经取到了苹果，实际上 Take 操作失败了。下次进入厨房后，应先用 Look 确认物品是否在手中，再执行后续搬运操作。”*

反思按粒度分为三层：
- **简单反思**：一句指出错误类型（“我没有打开所有抽屉就断言物品不存在”）
- **分析式反思**：详述根因并给出具体策略调整
- **链式反思**：多轮失败后追加元反思（“我连续三次浪费时间在已检查过的柜子上，应记录已探索位置并优先搜索新区域”）

为确保反思质量，实践中会做**长度过滤**（去除空洞套话）、**可操作性校验**（必须提及具体错误步骤和改进动作），并且反思 prompt 经过精心设计以引导模型产出指向性明确的文本。

**3. 与传统方法的核心区别**

| 维度 | Reflexion | ReAct | RLHF / PPO | RAG |
|------|-----------|-------|------------|-----|
| 学习方式 | 语言反思文本 | 无跨回合学习 | 梯度更新参数 | 检索外部文档 |
| 参数更新 | ❌ 完全冻结 | ❌ | ✅ 永久改变 | ❌ |
| 记忆来源 | 运行时动态生成 | — | 训练语料 | 固定知识库 |
| 针对性 | 当前任务高度特化 | — | 泛化到同类任务 | 通用知识 |
| 计算成本 | 极低（仅额外 prompt token） | 低 | 高（需 GPU 集群） | 中（需向量库） |

Reflexion 可视为在 ReAct 外层套上一个“跨回合学习循环”，将其从单次推理器升级为能够在连续试错中积累经验的自治 Agent。与思维树（ToT）/思维图（GoT）的单回合多路径并行搜索不同，Reflexion 利用**历史轨迹的语义压缩**，在纵向的多个 Episode 间串行积累。

**4. 评估器（Evaluator）的灵活分层设计**

Reflexion 支持三种评估方式以适应不同任务特性：

- **环境二元信号**：适用于有明确终点的任务（AlfWorld 目标物品是否正确放置、HumanEval 代码是否通过所有测试用例）
- **启发式规则**：捕获常见失败模式，如 AlfWorld 中同一动作重复 >3 次或轨迹长度超过 30 步的“无效规划”检测
- **LLM 自评**：对开放式任务（HotPotQA 问答质量），用 LLM 作二元分类器判断回答是否正确，或采用 EM/F1 等启发式指标

多评估源可以混合使用，例如在 AlfWorld 中环境信号用于终点判定，启发式规则用于中途触发内部反思。

**5. 训练/推理流程**

Reflexion **零训练**——整个流程在推理时完成，模型权重完全冻结。部署只需设计三组提示词模板：
- **Actor 指令**：任务描述 + 工具/环境约束 + 思考-行动格式
- **Evaluator 规则**：判定成功条件和失败触发阈值
- **Self-Reflection 指令**：要求分析失败根因并给出可操作的改进策略

数据流：每 Episode 开始 → Actor 读取当前观测 + 历史反思 → 生成动作 → 环境执行 → 轨迹收集 → Episode 完成 → Evaluator 判定 → 若失败，Reflector 生成反思追加到 Buffer → 下轮开始。Buffer 默认保留最近 3 条反思，可通过聚类或摘要压缩扩展长程记忆。

**6. 关键实验结果**

- **AlfWorld（具身决策）**：134 个家务任务中，ReAct + Reflexion 在 12 轮迭代后累计解决 130 个（+22%），而单纯 ReAct 在 6-7 轮后提升停滞。分析表明 Reflexion 几乎消除了“误以为持有物品”导致的幻觉型失败。
- **HotPotQA（多跳推理）**：Reflexion + CoT 实现 Q→A 和 (Q, C_gt)→A 模式下的显著提升，使模型能从检索策略缺陷中自我调整，改进信息覆盖率和答案准确率。
- **HumanEval & LeetcodeHard（代码生成）**：Reflexion 在 HumanEval 上 pass@1 达 91%（GPT-4 基线 80%），在面对 40 道 Leetcode Hard 题时也能基于编译/测试错误生成有效的“self-debugging”反思，第二轮生成通过率大幅跃升。
- **消融实验**：仅靠“重试”无反思的基线几乎无提升；静态提示（“请更仔细”）改进微弱；只有**基于失败轨迹动态生成的具体反思**才能产生显著效果。

> 💡 **关键洞察**：Reflexion 的核心力量不在于让模型“某一次想得更清楚”，而在于构建了一个**跨 Episode 的语义信息通道**——反思文本作为压缩后的经验载体，将连续试错从独立的骰子游戏转变为对正确答案的定向逼近。

> ⚠️ **注意**：反思质量高度依赖 LLM 的自评能力。如果模型无法准确分析自身失败原因，反思可能引入噪音甚至误导后续尝试。实践中需对反思做基础校验（长度裁剪、空话过滤），且反思 prompt 需设计明确指令（“指出哪个具体步骤出错、原因是什么、下次如何做不同”）。此外，Reflexion 不提供形式化的收敛保证——其可靠性随 LLM 能力提升而增长。

#### 🧪 练习题
```yaml
question: "Reflexion 与 ReAct 最核心的区别是什么？"
options:
  - "Reflexion 使用更大的语言模型"
  - "Reflexion 在 ReAct 外层增加了跨 Episode 的自我反思与记忆回注循环"
  - "Reflexion 仅能用于代码生成任务"
  - "Reflexion 需要进行额外的模型微调"
answer: 1
explain: "ReAct 在每个 Episode 内进行推理-行动循环，但 Episode 间完全独立；Reflexion 在 ReAct 外层追加了失败反思生成和跨回合记忆注入机制，使 Agent 能从历史错误中累积学习。"
```
