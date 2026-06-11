### ReAct: 推理-行动协同 (ReAct)

```yaml
id: react
name: ReAct
full_name: 推理-行动协同 (ReAct)
year: '2022.10'
org: Google
paper_url: https://arxiv.org/abs/2210.03629
category: reactive
parent: —
motivation: 交错生成思考行动观测主循环
```

#### 📝 一句话总结
ReAct是一种让大语言模型在生成行动的同时穿插"思考文本"的提示范式——通过将动作空间扩展为"实际动作+推理轨迹(thought)"，使模型在知识推理任务中能用工具消除幻觉、在交互决策任务中能用推理引导探索，仅需1-2个示例即可超越训练了10^3~10^5条轨迹的模仿学习/强化学习方法。

#### 🎯 核心要点
1. **问题动机**：LLM在复杂任务中存在两个痛点——纯推理（Chain-of-Thought）会产生幻觉和错误传播（无法查证事实）；纯行动（Act-only）缺乏高层规划能力，容易在交互任务中陷入无效探索。

2. **核心思想**：把"推理"当作一种特殊的"内部动作"——Thought不改变外部环境，但把它拼入上下文窗口后，后续的Act就能利用推理结果做出更好决策，后续的Thought也能分析新Observation来修正之前推理。

3. **动作空间扩展**：
   - 原始动作空间 $\mathcal{A}$（与外部环境交互，产生Observation）
   - 扩展后 $\hat{\mathcal{A}}=\mathcal{A} \cup \mathcal{L}$，其中 $\mathcal{L}$ 是自然语言空间
   - 在语言空间中的动作 $\hat{a}_t \in \mathcal{L}$ 称为"思维/推理轨迹"，其目的不是影响环境，而是通过推理组合有用信息

4. **Few-Shot提示实现**：不需要任何梯度训练，仅靠in-context examples展示"Thought→Action→Observation"交替模式即可让LLM学会ReAct风格。论文用2-6个示例覆盖4类benchmark。

5. **关键实验结果**：
   | 基准 | 最佳方法 | ReAct优势 |
   |------|---------|----------|
   | HotpotQA（知识推理） | ReAct+CoT-SC | EM 35.1，比纯CoT更少幻觉 |
   | Fever（事实验证） | ReAct+CoT-SC | Acc 64.6，通过Wikipedia API查证 |
   | ALFWorld（具身交互） | ReAct(1-shot) | 成功率比模仿学习高34% |
   | WebShop（网页导航） | ReAct(2-shot) | 成功率比IL+RL高10% |

6. **可解释性收益**：人类可以直接查看完整的Thought→Act→Obs交替序列，区分哪些知识是模型内部、哪些来自外部环境，从而诊断错误根源。

#### 🔬 深入细节
![ReAct 示意图](https://ar5iv.labs.arxiv.org/html/2210.03629/assets/x1.png)
*图：ReAct 的核心框架或评测示意。*

##### 1. 范式对比：图1核心示意图

图1展示了同一条HotpotQA问题在4种范式下的行为对比：

- **(a) Standard**：直接生成答案 → 无推理无交互，容易出错
- **(b) CoT（仅推理）**：生成推理链后答案 → 纯内部推理，可能产生幻觉（如对"Apple Remote"的错误事实描述）
- **(c) Act-only（仅行动）**：反复搜索Wikipedia → 缺乏推理，会生成无效搜索或无法融合信息
- **(d) ReAct（推理+行动）**：Thought分析需要搜索什么 → Action调Wikipedia API → Observation返回结果 → Thought分析结果发现需要更多信息 → 继续搜索 → 最终生成答案。**轨迹可读、可溯源、可纠错**

##### 2. 核心算法框架（伪代码）

```
输入: 任务描述 + Few-Shot示例(含Thought→Action→Observation交替)
初始化: context ← [task_prompt, few_shot_examples]

循环直到终止:
    response ← LLM.generate(context)  # 生成下一段文本
    if response是Thought:
        将 Thought 追加到 context  # 不与环境交互
    elif response是Action:
        执行Action于环境，获得Observation
        将 Action + Observation 追加到 context
    elif response是结束标记(Answer/Finish):
        输出最终答案/动作，退出循环
```

**关键设计**：
- Thought和Action在token级别由LLM自行决定何时产生（通过few-shot示例中的模式引导）
- 当遇到知识密集型任务（HotpotQA），ReAct会交替搜索多个子问题并逐步合成答案
- 当遇到具身任务（ALFWorld），ReAct先用Thought分解子目标（"我需要找到并拿起一个干净的苹果"），再生成低级动作（go to fridge, open fridge, take apple...）

##### 3. 不同任务的ReAct轨迹深度分析

**(a) 知识推理任务 — HotpotQA（多跳问答）与Fever（事实验证）**
- 动作空间：`search[entity]`（查询Wikipedia）、`lookup[string]`（在当前页面内精确定位）、`finish[answer]`
- ReAct vs CoT关键优势：当模型内部知识错误或缺失时，ReAct通过搜索外部知识库自动纠偏。例如"Apple Remote"的制造商问题，CoT幻觉为"由Apple Inc.制造"，而ReAct搜索后纠正为"由Universal Electronics制造"
- ReAct vs Act-only：Act-only容易陷入"搜索→无结果→继续搜索→循环"的困境；ReAct的Thought能在搜索前明确意图，在搜索后评估信息充分性
- **Hallucination消减**：Fever任务上，纯CoT的幻觉率显著更高；ReAct通过显式搜索Wikipedia API，将错误信息替换为可验证的外部证据

**(b) 交互决策任务 — ALFWorld（具身AI）与WebShop（网页购物）**
- ALFWorld动作空间：`goto[location], open[object], close[object], take[object], put[object], clean[object], heat[object], cool[object]`
- ALFWorld空间庞大、奖励稀疏，纯RL需要大量交互训练
- ReAct的Thought发挥**稀疏奖励下的推理引导**作用：将高级目标分解为低级子任务序列，例如"任务是加热一个土豆"→分解为：找土豆→取土豆→找微波炉→放进去→加热
- WebShop动作空间：搜索、点击产品、选择选项、购买
- ReAct的Thought帮助权衡产品属性与用户需求，生成类似人类购物决策的推理轨迹

##### 4. 详细的定量结果

**HotpotQA + Fever（Table 1 & 2）**：
| 方法 | HotpotQA EM/F1 | Fever Acc |
|------|---------------|-----------|
| Standard | 25.7/33.8 | 51.0 |
| CoT | 29.4/35.1 | 56.3 |
| CoT-SC | 33.8/40.8 | 60.4 |
| Act | 25.2/25.9 | 58.9 |
| ReAct | 27.4/35.8 | 54.6 |
| **ReAct→CoT-SC** | **35.1/42.0** | **64.6** |

- 纯ReAct在某些任务上不如CoT-SC（内部知识更全面时），但ReAct的轨迹更**基于证据**、**幻觉更少**
- **ReAct→CoT-SC**：先运行ReAct收集外部信息，再将完整的ReAct轨迹+检索到的证据输入CoT-SC进行最终推理，达到SOTA

**ALFWorld（Table 3）**：
| 方法 | 示例数 | 成功率 |
|------|--------|--------|
| BUTLER (imitation) | 10^5 | 37% |
| BUTLER (BUTLER+RL) | 10^5 | 22% (探索失败) |
| Act (6-shot) | 6 | 45% |
| **ReAct (2-shot)** | 2 | **71%** |
| **ReAct (1-shot)** | 1 | **62%** |

**仅需2个示例，超越10万条训练数据的系统，绝对提升34%！**

**WebShop（Table 4）**：
| 方法 | 成功率 | Reward |
|------|--------|--------|
| IL | 29.1% | 62.4 |
| IL+RL | 28.7% | 62.3 |
| Act (1-shot) | 30.1% | 61.5 |
| **ReAct (2-shot)** | **40.0%** | **66.6** |

**仅需2次示例提升10%成功率，且Reward显著更高（购买的商品更匹配需求）。**

##### 5. ReAct的内部工作原理与消融实验

- **Thought的评分机制**：ReAct在生成Thought时，通过计算该Thought对未来动作的**互信息增益**来判断是否需要更深度的推理——如果当前上下文已经足够做出正确动作，则跳过冗长推理
- **内部推理 vs 外部搜索的互补**（Table 5）：消融实验显示，当知识存于内部（模型预训练中已学到），CoT更优；当知识仅存于外部（罕见/新知识），ReAct显示必要性。最优策略是**先用ReAct获取外部信息，再用CoT集成内外部知识**（ReAct→CoT-SC）
- **Thought的必要性实验**（Table 7）：移除所有Thought（变为纯Act），在ALFWorld上成功率大幅下降；验证了在交互任务中推理对动作生成的关键支撑
- **微调实验**（§4-6）：在HotpotQA上用3K条ReAct轨迹微调PaLM-8B和PaLM-62B，微调后的ReAct模型在域内任务上性能大幅提升，且**对Prompt中示例数量的敏感度降低**

##### 6. 失败模式与局限性

- **推理受阻**：LLM有时会陷入重复生成相同Thought的循环（如反复说"我需要搜索更多"但不行动），论文通过限制最大步数截断
- **搜索失败**：对外部API返回无结果时，模型有时无法优雅处理，继续尝试相似查询
- **长轨迹遗忘**：超过15步后，模型倾向于遗忘早期Observation或产生不一致推理
- **幻觉在执行中**：即使推理正确，生成的具体Action有时包含幻想的地点/物品名（尤其在ALFWorld中）
- **微调的潜在方向**：Prompt范式受限于LLM固有的推理和行动能力边界，通过微调可以进一步扩展

##### 7. 与相关工作的关系

- **CoT (Wei et al., 2022)**：ReAct将CoT的"推理链"嵌入到与环境的交互循环中，从纯推理范式扩展为感知-推理-行动循环
- **SayCan / Inner Monologue**：机器人领域的语言指导动作，ReAct提供更统一的Prompt范式
- **Toolformer (Schick et al., 2023)**：通过自监督学习API调用，ReAct采用无需训练的Prompt方式实现工具使用
- **AutoGPT / LangChain Agent生态**：直接继承了ReAct的"Thought-Action-Observation"范式

#### 🧪 练习题
```yaml
question: "ReAct 的核心范式差异是什么？"
options:
  - "让模型只负责检索，不再做语言推理"
  - "把推理文本当作内部动作，与外部 Action/Observation 交错出现"
  - "先生成完整计划，再完全离线执行"
  - "把所有决策都交给符号规划器"
answer: 1
explain: "ReAct 的关键就在于 Thought 不是最终答案，而是会进入后续上下文的内部动作，与真实环境中的 Action 和 Observation 交替形成闭环。"
```
