### MAD: 多智能体辩论 (Multiagent Debate)

```yaml
id: mad
name: MAD
full_name: 多智能体辩论 (Multiagent Debate)
year: '2023.05'
org: MIT
paper_url: https://arxiv.org/abs/2305.14325
category: deliberation
parent: —
motivation: 多轮互辩缓解推理谬误与幻觉
```

#### 📝 一句话总结
MAD（Multiagent Debate）提出让多个LLM实例独立生成候选答案后相互审阅、辩论多轮，最终收敛到单一共同答案的方法，显著提升了数学推理、事实准确性和战略推理的表现，且仅需黑盒API访问即可实现。

#### 🎯 核心要点
- 多个语言模型实例（agent）独立生成候选答案，然后相互阅读和批判其他agent的回复，经过多轮迭代最终收敛到共识答案
- 辩论过程完全基于黑盒API访问，无需模型内部信息（如似然度、梯度），可直接用于现有模型服务接口
- 在6个基准上评估：算术推理（Arithmetic）、小学数学（GSM8K）、国际象棋走法预测（Chess Move）、传记事实性（Biographies）、MMLU知识问答、象棋走法合法性（Chess Validity）
- 与零样本思维链（Zero-shot CoT）、自我反思（Self-Reflection）、多数投票（Majority Voting）等方法正交兼容，可叠加使用
- 仅需3个agent和2轮辩论即可在多数任务上取得显著提升；增加agent数量或辩论轮数可进一步改进
- 辩论过程中，模型倾向于放弃不确定的事实（因不同agent分歧而被剔除），从而减少幻觉
- 支持跨模型辩论（如chatGPT+Bard），异构模型间辩论同样有效

#### 🔬 深入细节
##### 1. 方法动机与背景

当前LLM虽然能力强大，但仍存在两大核心问题：(1) **推理跳跃**——在复杂推理任务中做出不合逻辑的跳跃；(2) **事实幻觉**——自信地编造错误事实。已有的改进方法（如思维链、自我反思、验证器）均在单模型实例上运行，未能利用多视角互补的优势。

MAD的核心灵感来自Minsky的《The Society of Mind》和多智能体系统：正如人类在解决难题时会从多个角度思考并相互校验，多个LLM实例也可以通过"辩论"来提升答案质量。不同实例生成的答案天然具有多样性（即使来自同一模型），这些多样化的视角在辩论中相互拷问，最终收敛到更可靠的答案。

##### 2. 辩论流程（核心机制）

![MAD 辩论流程图](https://arxiv.org/html/2305.14325v2/assets/fig2.png)
*图：多智能体辩论流程示意*

具体流程如下：

**Step 1 — 独立生成（Initial Generation）**：
给定一个查询 \(Q\)，\(N\) 个语言模型实例（agent）各自独立生成候选答案 \(\{A_1^{(0)}, A_2^{(0)}, ..., A_N^{(0)}\}\)。每个agent使用相同的起始prompt，但由于解码的随机性，生成的答案通常具有多样性。

**Step 2 — 辩论轮次（Debate Round）**：
在第 \(t\) 轮，将其他所有agent的回复拼接后作为上下文提供给每个agent，并指示其基于他人的回答更新自己的答案：

\[
A_i^{(t+1)} = \text{LLM}\left(Q, \{A_j^{(t)}\}_{j \neq i}, \text{consensus prompt}\right)
\]

其中consensus prompt有两个变体（见图3）：

| 类型 | Prompt模板 |
|------|-----------|
| **Short** | "These are the solutions to the problem from other agents: [other answers]. Based off the opinion of other agents, can you give an updated response..." |
| **Long** | "These are the solutions to the problem from other agents: [other answers]. Using the opinion of other agents as additional advice, can you give an updated response..." |

Long prompt鼓励agent更"固执"地坚持自己的答案，延长辩论时间，通常带来更好的最终结果。

**Step 3 — 收敛与最终答案**：
经过 \(T\) 轮辩论后，各agent通常收敛到单一共识答案。实证发现，LLM agent相对"随和"（agreeable），可能是指令微调或RLHF训练的副产品。当需要最终输出时，可以取最后一轮任一agent的答案（已一致）或通过多数投票获得。

> 💡 关键直觉：辩论不是简单地放大多数正确答案——论文观察到大量案例中所有agent最初都错了，但在辩论过程中通过相互质疑推理过程，最终共同收敛到正确答案。

##### 3. 与现有方法的关系

MAD与以下方法**正交兼容**，可叠加使用：

| 方法 | 维度 | 关系 |
|------|------|------|
| Chain-of-Thought (CoT) | 单agent推理深度 | 互补：MAD中用CoT prompt初始化agent |
| Self-Reflection | 单agent自我修正 | MAD可视为多agent互反射的泛化 |
| Majority Voting | 多agent聚合 | MAD用辩论替代简单投票，更充分利用LLM的批判能力 |
| Self-Consistency | 采样多样性 | MAD主动让agent交互而非独立采样后投票 |

##### 4. 重要设计选择与分析

**Agent数量**：固定辩论2轮，将agent从1增加到5+，在算术任务上性能单调递增。当agent较多时，先将所有回复用chatGPT汇总再提供给各agent（而非直接拼接），既减少上下文长度，又进一步提升性能。

**辩论轮数**：固定3个agent，辩论轮数从1增到4，性能单调递增；4轮之后趋于饱和。

**Prompt设计（辩论长度控制）**：
论文发现通过调整consensus prompt的语言风格，可以控制agent对自身答案的"固执程度"：
- "Based off the opinion of other agents"（short）→ agent更容易被说服，快速收敛
- "Using the opinion of other agents as additional advice"（long）→ agent更坚持己见，辩论更久，最终结果更好

这本质上是控制了agent之间的"信息信任度"权衡。

**异构模型辩论**：chatGPT与Bard跨模型辩论在GSM8K上取得17/20的正确率，而单模型Bard为11/20、chatGPT为14/20。即使两模型初始都错，一方也能通过对方的错误推理激发正确的修正。

**不确定性表达**：论文发现，当LLM对某个事实不确定时，不同agent会生成不同的回答。直接询问各agent的置信度往往得到高置信度的错误评估，但通过辩论，不确定的事实会被暴露（因分歧被暴露），agent倾向于放弃或纠正这些事实。

##### 5. 核心实验结果

| 任务 | Single Agent | Self-Reflection | Multi-Agent (Debate) | 提升 |
|------|-------------|-----------------|---------------------|------|
| Arithmetic (%) | 67.0 | 72.1 | **81.8** | +14.8 |
| GSM8K (%) | 77.0 | 75.0 | **85.0** | +8.0 |
| Chess (ΔPS) | 91.4 | 102.1 | **122.9** | +31.5 |
| Biographies | 66.0 | 68.3 | **73.8** | +7.8 |
| MMLU (%) | 63.9 | 57.7 | **71.1** | +7.2 |
| Chess Validity | 29.3 | 38.8 | **45.2** | +15.9 |

> ⚠️ 注意：Self-Reflection在MMLU上反而降分（63.9→57.7），暗示在纯知识问答中自问自答可能引入额外错误，而多agent辩论通过多视角校验避免了这一问题。

```python
plan = coordinator.decompose(task)
for subtask in plan:
    result = workers.assign(subtask).run()
    coordinator.update(result)
return coordinator.finalize()
```

#### 🧪 练习题
```yaml
question: "MAD辩论机制中，Long Prompt（使用'Using the opinion of other agents as additional advice'）相比Short Prompt的效果是什么？"
options:
  - "加快agent收敛速度，减少辩论轮数"
  - "让agent更固执地坚持自身答案，延长辩论时间，通常带来更好的最终结果"
  - "减少token消耗，提高推理效率"
  - "使agent立即接受多数意见，快速达成共识"
answer: 1
explain: "Long Prompt措辞将其他agent的意见定位为'额外建议'而非'判断依据'，降低了agent对其的采纳程度，从而延长辩论时间并提升最终答案质量。"
```
