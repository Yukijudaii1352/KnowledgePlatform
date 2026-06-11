### Reflexion: 语言反思强化 (Reflexion)

```yaml
id: reflexion
name: Reflexion
full_name: 语言反思强化 (Reflexion)
year: '2023.03'
org: Princeton/Northeastern
paper_url: https://arxiv.org/abs/2303.11366
category: reflective
parent: —
motivation: 把失败反思写入情节记忆驱动重试
```

#### 📝 一句话总结
Reflexion通过让LLM Agent在失败后将自我反思以自然语言形式写入情节记忆（episodic memory），驱动后续重试时的决策改进，实现无需梯度更新的"语义梯度"强化学习——在HumanEval上以91% pass@1超越GPT-4原生80%。

#### 🎯 核心要点
1. **动机与问题**：传统RL需要大量训练样本和昂贵的模型微调，现有LLM Agent仅靠in-context example难以从试错中高效学习。Reflexion提出语言化的强化信号——用文本反思替代参数梯度。

2. **三模型模块化架构**（Actor-Evaluator-Self-Reflection）：
   - **Actor (Mₐ)**：基于LLM的决策者，根据当前状态和情节记忆生成文本/动作，类似传统RL中的策略网络。
   - **Evaluator (Mₑ)**：评估Actor生成的轨迹质量，输出标量奖励或自由文本反馈信号（如编译错误、单元测试结果、正确答案）。
   - **Self-Reflection (Mₛᵣ)**：将Evaluator的反馈信号转换为口头反思文本（如"我应该先检查抽屉再找钥匙"），追加到情节记忆缓冲区mem中。
   - 核心公式：θ = {Mₐ, mem}，策略参数化为LLM参数+记忆内容，而非传统神经网络权重。

3. **情节记忆驱动学习**：mem是一个不断增长的反思文本列表。每次新尝试时，mem中的所有历史反思作为额外上下文注入Actor的prompt前缀。这模拟了人类从失败中总结教训、迭代优化的认知过程。

4. **反馈信号多样性**：
   - **外部反馈**：环境二元信号（AlfWorld成功/失败）、编译器解释器输出（代码执行结果）、测试用例结果（HumanEval/MBPP）。
   - **内部模拟反馈**：LLM自我评价（HotPotQA中让LLM判断答案正确性）、基于启发式规则（如AlfWorld中连续3次相同动作超30步触发反思）。

5. **实验结果**：
   - AlfWorld（134环境6类任务）：比ReAct基线提升22%（绝对精度）
   - HotPotQA（推理问答）：提升20%
   - HumanEval（Python编程）：GPT-4+Reflexion达91% pass@1（基线80%）
   - MBPP：GPT-4+Reflexion达90.5%
   - LeetcodeHard（新基准）：GPT-4+Reflexion达40% pass@1（基线32%）

6. **与相关工作的关键区别**：不同于Self-Refine（单代自修）、AlphaCode（固定N次采样无记忆）、Self-Debug（调试当前代码无跨episode记忆），Reflexion的独特之处在于跨episode的持久反思记忆。

#### 🔬 深入细节
![Reflexion 示意图](https://ar5iv.labs.arxiv.org/html/2303.11366/assets/x1.png)
*图：Reflexion 的核心框架或评测示意。*

##### 算法流程（Algorithm 1）

Reflexion 的核心算法是一个迭代的重试循环，其伪代码如下：

```
1. 初始化 Actor M_a, Evaluator M_e, Self-Reflection M_sr
2. 用初始策略 pi_theta 生成 trajectory tau_0
3. M_e 评估 tau_0 → M_sr 生成反思 sr_0 → mem = [sr_0]
4. while M_e 未通过 且 t < max_trials:
   a. 基于 pi_theta = {M_a, mem} 生成新 trajectory tau_t
   b. M_e 评估 tau_t
   c. M_sr 用 tau_t 和评估结果生成新反思 sr_t
   d. 将 sr_t 追加到 mem
   e. t += 1
5. 返回最终 trajectory（若通过）或标记失败
```

关键在第 4 步：每次重新生成动作序列时，Actor 能看到前面所有失败反思，从而避免重复同类错误。mem 的不断增长使得后续 episode 拥有更多历史经验。论文将策略参数化为 θ = {M_a, mem}，即 LLM 参数和记忆内容的组合——梯度不作用于 LLM 权重，而是通过新增反思文本间接影响后续输出分布，这正是"语义梯度"的核心含义。

##### 三种任务的具体配置

**1. 决策任务（AlfWorld）**
- Actor 使用 ReAct（思考-行动-观察循环）生成交互轨迹
- 启发式自评价规则：连续 3 次产生相同动作且收到相同观察，或当前环境步骤数超过 30 步仍未完成 → 触发反思
- 同时支持 LLM 自我判断（二分类是否完成任务）
- 反思内容示例："我在厨房卡住了，应该先检查冰箱里有没有苹果……下次要优先搜索所有容器后再做移动操作"
- 每次反思后重置环境并重新开始，最多 12 次迭代

**2. 推理任务（HotPotQA）**
- Actor 生成搜索-推理链和最终答案字符串
- Evaluator 使用 Exact Match (EM) 和 F1 分数评估答案质量，或用 LLM 自行判断正确性
- 反思模板整合错误分析："上次我在第二步选择了错误的维基百科条目（2014年世界杯），实际应该是 2018 年世界杯的页面。下次要更仔细地比对日期信息"
- 验证了即使无真实标签（仅靠 LLM 自评），Reflexion 仍能取得 20% 的性能提升

**3. 编程任务（HumanEval / MBPP / LeetcodeHard）**
- Actor 生成完整 Python 函数代码
- Evaluator 运行 Python 解释器执行代码 + 单元测试，返回 pass/fail 及完整错误堆栈
- 反思将错误堆栈翻译为结构化改进建议："AssertionError 在第 7 行——我忘记处理负数输入情况，下次需要在函数开头添加输入边界检查"
- 支持多种内部测试（如自生成的单元测试），验证在无外部 Oracle 情况下仍有效

##### 消融实验的关键发现

| 消融维度 | 结论 |
|---------|------|
| 反馈形式：原始错误 vs 结构化反思 | 将错误转化为反思文本显著优于仅使用原始报错信息，说明 LLM 的自我总结提炼至关重要 |
| 反思记忆长度：全部历史 vs 最近 1 条 | 保留全部历史反思明显更优，长程记忆积累可避免重复先前错误 |
| 模型规模：GPT-3.5 vs GPT-4 | Reflexion 在两个模型上均有显著提升，但 GPT-4 能从反思中提取更多价值，提升幅度更大 |
| 反馈类型：语言型（文本反思）vs 标量型（仅知道对错） | 语言型反馈远优于标量型，验证了"语义梯度"的有效性 |
| 自评 vs Oracle 反馈 | 使用 LLM 自我评价（无真实标签）仍能取得显著提升，虽略逊于 Oracle 反馈 |

##### 技术细节与 I/O 设计

**Actor prompt 模板**包含三个部分：
1. 系统指令（角色设定 + 任务说明 + 输出格式要求）
2. 情节记忆块 mem（所有历史反思文本的拼接，以 "You have attempted this task before and failed. Here are the reflections:" 开头）
3. 当前任务和状态输入

**Self-Reflection prompt 模板**包含：
1. 上一轮的完整轨迹 τ（动作序列 + 环境观察）
2. Evaluator 的反馈（错误报告 / 失败原因）
3. 指令要求（"Based on the above, write a few sentences of reflection on what went wrong and how to improve"）

##### 新基准 LeetcodeHard

论文贡献了 LeetcodeHard 这一新代码基准，包含 40 道 LeetCode Hard 级别题目，每道配有 3 个隐藏测试用例（以真实竞赛环境评估）。GPT-4+Reflexion 首次将 Hard 题 pass@1 从 32% 提升到 40%，证明反思机制在极难任务上仍有效。该基准后被广泛用于后续 Agent 编程论文。

##### 局限性与未来方向

1. **反思质量依赖 LLM 能力**：若 LLM 自我评估有偏差或反思不准确，可能导致错误累积
2. **无形式化收敛保证**：不同于传统 RL 的数学收敛证明（如 Bellman 方程），Reflexion 依赖于 LLM 的经验性表现
3. **Prompt 长度膨胀**：每轮反思追加约 100-300 tokens，多轮后可能超出 LLM 上下文窗口（论文中使用 GPT-4 8K/32K 上下文版本规避）
4. **任务定制化成本**：每个新任务需要人工设计 Evaluator 和反思 Prompt 模板
5. **开源承诺**：所有代码、Demo 和数据集已发布在 https://github.com/noahshinn024/reflexion

##### 与后续工作的关联

Reflexion 是 LLM-based agent 反思类方法的开创性工作，开创了"语言化反思记忆"这一研究方向，直接或间接启发了：
- **Tree of Thoughts (Yao et al., 2023)**：将反思扩展为搜索树，支持多分支探索和回溯
- **LATS (Zhou et al., 2023)**：结合蒙特卡洛树搜索与反思记忆，增强规划能力
- **AgentVerse 等**：多智能体协作反思框架
- **RCI (Recursive Criticism and Improvement)**：递归式自我评价与改进

其核心理念"语义梯度"已成为当前 LLM Agent 设计的标准模块之一。

#### 🧪 练习题
```yaml
question: "Reflexion 与普通多次重采样（retry）最本质的区别是什么？"
options:
  - "Reflexion 会把每次失败的自然语言反思写入情节记忆，并在后续重试时作为额外上下文"
  - "Reflexion 通过增大 temperature 生成更多候选答案"
  - "Reflexion 直接微调 Actor 的模型参数"
  - "Reflexion 不需要任何评估器，只靠用户主观判断"
answer: 0
explain: "Reflexion 的核心是把失败经验转成文本反思并跨 episode 保留下来，形成无需参数更新的“语义梯度”。"
```
