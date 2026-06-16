---
domain: llm
topic_id: prompt_engineering
topic_name: 提示词工程
page_icon: ✍️
page_title: 提示词工程 算法总结
page_subtitle: '{build_date} 版'
page_desc: 系统性梳理从基础Prompt设计到思维链(CoT)、自动化提示优化及2026年最新前沿技术的演进脉络。
hero_pills:
- Prompt设计 · 思维链 · 提示优化
count_pill: '{count} 个算法'
categories:
  basic:
    label: 基础提示技术
    color: '#4A90E2'
  reasoning:
    label: 推理增强技术
    color: '#50E3C2'
  optimization:
    label: 自动化与提示优化
    color: '#F5A623'
  frontier_2026:
    label: 2026年前沿进展
    color: '#D0021B'
---

## 领域综述

!INCLUDE_RAW ../../temp/content_survey_bulk_20260614_174337/researcher_output/llm/prompt_engineering/overview/zhihu__提示词工程（Prompt_Engineering）：从构建到自动优化_——技术发展阶段、趋势（类综述__b300ffc0/article.md

## 最新进展综述

!INCLUDE_RAW ../../temp/content_survey_bulk_20260614_174337/researcher_output/llm/prompt_engineering/latest/zhihu__2026年提示词工程进阶策略：Expert_Panel、Compression_Protocol、R__6f349f83/article.md

## 算法演化关系

```yaml
nodes:
- id: few_shot
  x: 100
  y: 100
  category: basic
- id: zero_shot
  x: 100
  y: 150
  category: basic
- id: icl
  x: 200
  y: 100
  category: basic
- id: cot
  x: 250
  y: 200
  category: reasoning
- id: self_consistency
  x: 300
  y: 240
  category: reasoning
- id: zero_shot_cot
  x: 350
  y: 180
  category: reasoning
- id: least_to_most
  x: 350
  y: 220
  category: reasoning
- id: react
  x: 380
  y: 260
  category: reasoning
- id: tot
  x: 450
  y: 200
  category: reasoning
- id: pal
  x: 450
  y: 240
  category: reasoning
- id: universal_sc
  x: 480
  y: 280
  category: reasoning
- id: got
  x: 550
  y: 200
  category: reasoning
- id: self_refine
  x: 350
  y: 300
  category: optimization
- id: reflexion
  x: 400
  y: 300
  category: optimization
- id: ape
  x: 450
  y: 340
  category: optimization
- id: promptbreeder
  x: 500
  y: 360
  category: optimization
- id: opro
  x: 550
  y: 340
  category: optimization
- id: causal_cot
  x: 650
  y: 380
  category: frontier_2026
- id: ncots
  x: 650
  y: 420
  category: frontier_2026
- id: long_cot
  x: 650
  y: 460
  category: frontier_2026
- id: grace
  x: 700
  y: 400
  category: frontier_2026
- id: uniapo
  x: 720
  y: 440
  category: frontier_2026
- id: promptmix
  x: 750
  y: 380
  category: frontier_2026
- id: vcp
  x: 800
  y: 380
  category: frontier_2026
edges:
- from: few_shot
  to: icl
  label: 示例优化
- from: few_shot
  to: cot
  label: 引入推理步骤
- from: cot
  to: self_consistency
  label: 多路径投票
- from: cot
  to: zero_shot_cot
  label: 零样本激发
- from: cot
  to: least_to_most
  label: 问题分解
- from: cot
  to: react
  label: 行动协同
- from: cot
  to: tot
  label: 树状搜索
- from: cot
  to: pal
  label: 代码执行
- from: self_consistency
  to: universal_sc
  label: 开放任务
- from: tot
  to: got
  label: 图状建模
- from: self_refine
  to: reflexion
  label: 语言反馈
- from: ape
  to: promptbreeder
  label: 进化算法
- from: ape
  to: opro
  label: 迭代优化
- from: cot
  to: causal_cot
  label: 因果推理
- from: tot
  to: ncots
  label: 神经搜索
- from: cot
  to: long_cot
  label: 长链缩放
- from: opro
  to: grace
  label: 门控压缩
- from: opro
  to: uniapo
  label: 多模态
- from: promptmix
  to: vcp
  label: 视觉条件
milestones:
- few_shot
- cot
- opro
```

## 核心算法

### Few-shot

```yaml
id: few_shot
num: 1
name: Few-shot
full_name: 少样本提示 (Few-shot Prompting)
year: '2020'
org: OpenAI
parent: —
paper_url: https://arxiv.org/abs/2005.14165
project_url: ''
category: basic
motivation: 通过少量示例激发模型上下文学习能力
```

#### 📝 一句话总结
Few-shot Prompting 在 GPT-3 论文中被系统化为一种“只在输入上下文中给少量示例、不更新参数”的任务适配方式，解决了传统微调依赖大量标注样本和梯度更新的问题。

#### 🎯 核心要点
- 使用任务描述加 \(K\) 个输入-输出示例作为上下文，直接让自回归语言模型续写答案
- GPT-3 以 175B 参数规模验证少样本上下文学习随模型规模增强
- 评估范式明确区分 Fine-tuning、Zero-shot、One-shot、Few-shot
- 所有测试任务均不进行梯度更新，任务规范完全由自然语言和示例文本给出
- 在翻译、问答、完形填空、SuperGLUE、LAMBADA、简单算术等任务上展示跨任务泛化
- 局限包括上下文长度受限、示例选择敏感、部分推理和稳健性任务仍明显落后

#### 🔬 深入细节
![GPT-3 评估范式对比图](https://ar5iv.labs.arxiv.org/html/2005.14165/assets/figures/eval_strategies.png)
*图：GPT-3 论文 Figure 2.1，对比 Fine-tuning、Zero-shot、One-shot 与 Few-shot 的测试时输入方式。图源：ar5iv / arXiv。*

```python
# Few-shot prompting 推理伪代码
def few_shot_predict(lm, task_description, demonstrations, query, k):
    prompt = task_description.strip() + "\n\n"
    for x_i, y_i in demonstrations[:k]:
        prompt += f"Input: {x_i}\nOutput: {y_i}\n\n"
    prompt += f"Input: {query}\nOutput:"
    return lm.generate(prompt, stop=["\n"])
```

Few-shot 的核心不是“用少量样本训练模型”，而是把少量样本作为输入条件。给定任务描述 \(d\)、示例集合 \(\{(x_i,y_i)\}_{i=1}^{K}\) 和测试样本 \(x_\*\)，模型直接估计：

$$
p_\theta(y_\* \mid d, x_1,y_1,\ldots,x_K,y_K,x_\*)
$$

这里的 \(\theta\) 在测试时保持不变，因此适配过程发生在 Transformer 的前向传播和注意力模式中，而不是参数空间中。GPT-3 论文将这种能力称为 in-context learning 的一种表现：预训练阶段形成的模式识别能力被测试时的文本示例临时调动起来。

方法设计的关键是“格式对齐”。示例不仅提供标签，还提供任务的输入输出 schema、答案风格、标签空间和隐含约束。例如情感分类中，示例会告诉模型标签只能是 `Positive` 或 `Negative`；翻译任务中，示例会告诉模型输入输出语言边界。示例数量 \(K\) 增加时，模型获得更多任务结构信号，但也会消耗上下文窗口并引入坏示例干扰。

与传统 fine-tuning 相比，Few-shot Prompting 的优势是部署成本低：同一个底座模型可以通过不同 prompt 切换任务，不需要为每个任务维护独立权重。代价是它把优化问题转移到了 prompt 设计上，示例的代表性、顺序、格式和长度都会影响输出；当任务需要精确规则、长链推理或罕见标签时，少量示例未必足以稳定约束模型行为。

> 💡 关键：Few-shot 的“学习”发生在上下文内，模型参数不变；示例越像一个清晰的小型任务说明书，模型越容易把续写分布收缩到正确答案空间。

#### 🧪 练习题
```yaml
question: "Few-shot Prompting 与传统监督微调的核心区别是什么？"
options:
  - "Few-shot 在测试时更新全部模型参数"
  - "Few-shot 通过上下文示例指定任务，测试时不做梯度更新"
  - "Few-shot 必须使用奖励模型筛选答案"
  - "Few-shot 只适用于分类任务"
answer: 1
explain: "Few-shot Prompting 将少量示例放入 prompt 中作为条件信息，模型权重保持冻结。"
```

### Zero-shot

```yaml
id: zero_shot
num: 2
name: Zero-shot
full_name: 零样本提示 (Zero-shot Prompting)
year: '2020'
org: OpenAI
parent: —
paper_url: https://arxiv.org/abs/2005.14165
project_url: ''
category: basic
motivation: 仅凭指令完成任务，无需示例
```

#### 📝 一句话总结
Zero-shot Prompting 让语言模型只依赖自然语言指令和待处理输入完成任务，解决了没有示例或标注样本时如何快速调用预训练能力的问题。

#### 🎯 核心要点
- 只提供任务描述和测试输入，不提供输入-输出示例
- 测试时无微调、无梯度更新、无任务专属参数
- GPT-3 论文将 Zero-shot 作为与 One-shot、Few-shot、Fine-tuning 并列的评估范式
- 性能依赖预训练中积累的任务知识、指令理解能力和模型规模
- 通常弱于 Few-shot，但成本最低、上下文占用最小、任务切换最快
- 对模糊任务、非标准标签空间和复杂推理任务更容易产生格式偏差或误解

#### 🔬 深入细节
![GPT-3 零样本与少样本评估范式](https://ar5iv.labs.arxiv.org/html/2005.14165/assets/figures/eval_strategies.png)
*图：GPT-3 论文 Figure 2.1，Zero-shot 面板展示只用任务说明和当前输入进行预测。图源：ar5iv / arXiv。*

```python
# Zero-shot prompting 推理伪代码
def zero_shot_predict(lm, instruction, query):
    prompt = f"{instruction.strip()}\n\nInput: {query}\nOutput:"
    answer = lm.generate(prompt, stop=["\n"])
    return normalize(answer)
```

Zero-shot 的条件分布可以写为：

$$
p_\theta(y_\* \mid d, x_\*)
$$

其中 \(d\) 是自然语言任务说明，\(x_\*\) 是测试输入。与 Few-shot 相比，条件中没有 \((x_i,y_i)\) 示例，因此模型必须从指令文本本身推断任务目标、输出格式和标签空间。它本质上是在调用预训练阶段已经吸收的知识和模式，而不是在上下文中学习新映射。

这一范式的动机非常直接：很多真实任务没有现成示例，或者用户只愿意用一句话表达需求。Zero-shot 把任务接口压缩成“说明 + 输入”，让一个通用模型能在翻译、摘要、问答、分类、改写等任务之间直接切换。GPT-3 论文的重要观察是，随着模型规模扩大，Zero-shot 能力也会平滑提升，但在不少任务上仍明显低于带示例的 Few-shot。

设计 Zero-shot prompt 时，指令必须承担更多约束功能。它需要说明角色、目标、输出格式、边界条件和禁止行为，例如“只输出一个标签”“用 JSON 返回”“如果无法判断则回答 Unknown”。如果指令省略这些约束，模型会按最可能的自然文本续写，可能给出解释、补充背景或使用与评测脚本不匹配的答案格式。

与 Few-shot 的区别在于，Zero-shot 的失败更常来自“任务解释错误”，而 Few-shot 的失败更常来自“示例选择或模式泛化错误”。因此 Zero-shot 通常适合开放生成、常见任务和低成本批量调用；当标签空间罕见、格式严格或推理链较长时，加入示例、思维链或自洽投票通常更稳。

> ⚠️ 注意：Zero-shot 不是“模型不知道任务也能做”，而是“用户不提供示例”；模型仍依赖预训练中已有的语言和任务知识。

#### 🧪 练习题
```yaml
question: "Zero-shot Prompting 最依赖 prompt 中的哪类信息？"
options:
  - "梯度更新次数"
  - "任务说明和输出约束"
  - "训练集随机种子"
  - "奖励模型打分"
answer: 1
explain: "Zero-shot 没有示例可参考，模型主要依靠自然语言任务说明判断应执行什么以及如何输出。"
```

### ICL

```yaml
id: icl
num: 3
name: ICL
full_name: 上下文学习 (In-Context Learning)
year: '2021'
org: Google/Stanford
parent: few_shot
paper_url: https://arxiv.org/abs/2110.04541
project_url: ''
category: basic
motivation: 研究示例选择与顺序对性能的影响
```

#### 📝 一句话总结
ICL 指模型在不更新参数的情况下利用当前上下文中的任务信号完成新输入；该论文从预训练样本切分角度解释了模型为什么偏好同一上下文内的依赖，并提出用 kNN-Pretraining 改善这种归纳偏置。

#### 🎯 核心要点
- 分析预训练文本被切成固定长度 example 后带来的 in-context inductive bias
- 理论上说明模型更容易建模同一训练 example 内片段之间的依赖，而跨 example 依赖被削弱
- 将 ICL 现象与预训练 example 设计联系起来，而不只看推理时 prompt 模板
- 提出 kNN-Pretraining：把语义相关但非相邻的句子放入同一预训练 example
- 在 Natural Questions closed-book QA 和 SentEval 相似度任务上展示增益
- 启发后续示例检索、示例排序、上下文构造等 prompt engineering 方法

#### 🔬 深入细节
![ICL 归纳偏置与 kNN-Pretraining 效果](https://ar5iv.labs.arxiv.org/html/2110.04541/assets/x1.png)
*图：论文 Figure 1，展示少量 kNN-Pretraining 对 closed-book QA 的提升。图源：ar5iv / arXiv。*

```python
# kNN-Pretraining 风格的上下文构造伪代码
def build_pretraining_example(anchor_sentence, corpus, encoder, max_len):
    neighbors = knn_search(
        query=encoder(anchor_sentence),
        index=[encoder(s) for s in corpus],
        k=K,
    )
    packed = [anchor_sentence]
    for sent in neighbors:
        if token_len(packed + [sent]) <= max_len:
            packed.append(sent)
    return concatenate(packed)
```

论文关注的不是单个 prompt 技巧，而是 ICL 的来源：语言模型在预训练时看到的是一个个长度有限的连续文本块。若两个文本片段出现在同一个训练 example 中，Transformer 的自注意力和语言建模损失可以直接学习它们之间的条件依赖；若它们被切到不同 example，中间没有共同上下文，模型只能通过参数中的统计记忆间接连接。

可以用一个抽象式子表达这种差异：同一上下文中的片段 \(a,b\) 允许模型直接估计 \(p_\theta(b \mid a, c)\)，而不同 example 中的片段只能通过全局参数近似相关性。论文将这种训练机制称为一种 in-context bias，它有利于语言建模，却可能让需要整合语料中分散证据的 NLU 任务受限。

kNN-Pretraining 的思路是改变“哪些文本被放在同一个 example”。给定一个 anchor 句子，用语义检索找到近邻句子，再把这些非相邻但相关的句子打包到同一个预训练样本中。这样模型在训练时就能通过上下文直接看到跨文档或跨位置的语义关系，从而强化“在上下文里对齐相关证据”的能力。

对 prompt engineering 的启发是：ICL 不只是“多放几个例子”，而是要让上下文中的片段形成有用依赖。推理时的示例选择、示例顺序、标签分布和测试输入相似度，都会改变模型可见的条件结构；预训练时的 example 设计则决定模型多大程度上习惯利用这些结构。

> 💡 关键：ICL 的表现由两层因素共同决定：预训练阶段模型是否学会利用同一上下文内的依赖，推理阶段 prompt 是否把有用依赖组织进上下文。

#### 🧪 练习题
```yaml
question: "该论文解释 ICL 归纳偏置时最强调哪一点？"
options:
  - "模型必须通过反向传播学习每个新任务"
  - "同一预训练 example 内的片段依赖比跨 example 依赖更容易被建模"
  - "示例越随机越能提升上下文学习"
  - "上下文学习只由模型参数量决定"
answer: 1
explain: "论文指出常规 chunking 会让模型偏向同一上下文内的信息整合，kNN-Pretraining 正是利用这一偏置。"
```

### CoT

```yaml
id: cot
num: 4
name: CoT
full_name: 思维链 (Chain-of-Thought)
year: '2022.01'
org: Google
parent: few_shot
paper_url: https://proceedings.neurips.cc/paper/2022/hash/9d5609613524ecf4f15af0f7b31abca4-Abstract-Conference.html
project_url: ''
category: reasoning
motivation: 通过中间推理步骤提升复杂推理能力
```

#### 📝 一句话总结
Chain-of-Thought Prompting 在少样本示例中加入自然语言中间推理步骤，使大模型先生成推理链再给答案，解决了标准 prompt 在多步算术、常识和符号推理上容易直接跳错的问题。

#### 🎯 核心要点
- 将 few-shot 示例从“问题-答案”扩展为“问题-推理步骤-答案”
- 不训练新模型、不修改参数，只改变 prompt 中示例答案的结构
- 在算术、常识、符号推理任务上显著优于标准 few-shot prompting
- 推理能力随模型规模涌现，小模型往往无法稳定受益
- PaLM 540B 配合 8 个 CoT 示例在 GSM8K 等任务上取得强结果
- 为后续 Self-Consistency、Zero-shot CoT、Least-to-Most、ReAct、ToT 等方法奠定基础

#### 🔬 深入细节
![Chain-of-Thought Prompting 示例图](https://ar5iv.labs.arxiv.org/html/2201.11903/assets/x1.png)
*图：CoT 论文 Figure 1，展示标准 prompting 与带中间推理步骤的 prompting 对比。图源：ar5iv / arXiv。*

```python
# Chain-of-Thought prompting 推理伪代码
def cot_predict(lm, cot_examples, question):
    prompt = ""
    for q_i, rationale_i, answer_i in cot_examples:
        prompt += f"Q: {q_i}\nA: {rationale_i} The answer is {answer_i}.\n\n"
    prompt += f"Q: {question}\nA:"
    completion = lm.generate(prompt)
    rationale, answer = split_rationale_and_final_answer(completion)
    return answer, rationale
```

CoT 的关键变量是推理链 \(r\)。标准 prompting 直接建模 \(p_\theta(y \mid x)\)，而 CoT 让模型先生成中间步骤再生成答案：

$$
p_\theta(y,r \mid x, D_{\text{cot}})
= p_\theta(r \mid x, D_{\text{cot}})\,p_\theta(y \mid x,r,D_{\text{cot}})
$$

其中 \(D_{\text{cot}}\) 是带推理步骤的少样本示例。这个分解把隐式计算外化为文本，使模型可以把多步问题拆成更短的局部推断，例如先提取数字关系、再执行算术、最后汇总答案。

CoT 的设计非常轻量：同样的问题、同样的模型，只把示例答案从短标签改成“解释 + 最终答案”。这种结构给模型两个信号：第一，答案之前应该展开推理；第二，推理步骤的粒度应该与示例相似。它不是保证推理正确的形式化证明，但会显著降低模型从问题直接跳到答案时的压缩负担。

论文的重要发现是规模效应。对较小模型，要求生成推理链可能只是增加无用文本；对足够大的模型，推理链提供了可利用的计算轨迹，使复杂任务性能大幅提升。这解释了为什么 CoT 常被视为大模型能力涌现的代表现象之一。

与传统符号求解器相比，CoT 不需要显式写规则或程序，通用性强；但它的推理链仍是模型生成的自然语言，可能出现看似合理但计算错误的步骤。因此后续方法通常在 CoT 之上加入多路径采样、投票、工具执行或搜索机制来提升可靠性。

> ⚠️ 注意：CoT 提高的是“生成中间计算轨迹”的概率，不等于验证了轨迹的逻辑正确性。

#### 🧪 练习题
```yaml
question: "CoT Prompting 的主要改动是什么？"
options:
  - "在测试时微调模型参数"
  - "在示例答案中加入中间推理步骤"
  - "删除所有 few-shot 示例"
  - "用外部搜索引擎替代模型生成"
answer: 1
explain: "CoT 的核心是在 prompt 示例中展示推理过程，让模型按类似格式先推理再回答。"
```

### Self-Consistency

```yaml
id: self_consistency
num: 5
name: Self-Consistency
full_name: 自洽性 (Self-Consistency)
year: '2022.03'
org: Google
parent: cot
paper_url: https://arxiv.org/abs/2203.11171
project_url: ''
category: reasoning
motivation: 多路径采样投票提升推理鲁棒性
```

#### 📝 一句话总结
Self-Consistency 用多次采样的 CoT 推理路径替代贪心解码，并对最终答案投票，解决了单条推理链偶然出错导致答案不稳的问题。

#### 🎯 核心要点
- 将 CoT 的 greedy decoding 改为随机采样多条 reasoning paths
- 对每条推理链抽取 final answer，再选择出现最一致的答案
- 近似边缘化中间推理路径，而不是信任单一路径
- 在 GSM8K、SVAMP、AQuA、StrategyQA、ARC-challenge 等任务上显著提升
- 与模型训练无关，是纯解码策略，可叠加在 CoT prompt 上
- 代价是多次采样带来更高推理成本，并依赖答案抽取规则

#### 🔬 深入细节
![Self-Consistency 三步流程](https://ar5iv.labs.arxiv.org/html/2203.11171/assets/x1.png)
*图：论文 Figure 1，展示 CoT prompt、多路径采样和最终答案聚合三步。图源：ar5iv / arXiv。*

```python
# Self-Consistency 解码伪代码
def self_consistency(lm, cot_prompt, question, n_samples, temperature):
    votes = {}
    traces = []
    for _ in range(n_samples):
        completion = lm.generate(
            cot_prompt + f"\nQ: {question}\nA:",
            temperature=temperature,
        )
        rationale, answer = parse_final_answer(completion)
        traces.append((rationale, answer))
        votes[answer] = votes.get(answer, 0) + 1
    best_answer = max(votes, key=votes.get)
    return best_answer, traces
```

Self-Consistency 的直觉是：复杂问题通常存在多条不同但等价的解题路线，错误路线之间不一定收敛到同一个错误答案，而正确路线更可能汇聚到同一最终答案。于是与其用贪心解码找单条最高概率推理链，不如采样多个 \(r\)，再边缘化掉 \(r\)：

$$
p(a \mid x) = \sum_r p_\theta(a,r \mid x)
\approx \sum_{m=1}^{M} \mathbf{1}[a_m=a]
$$

这里 \(M\) 是采样次数，\(a_m\) 是第 \(m\) 条推理链抽取出的最终答案。最终选择 \(\arg\max_a \text{count}(a)\)。这使决策从“哪条完整文本概率最高”变为“哪个答案被多种推理路径支持最多”。

与普通 CoT 相比，Self-Consistency 只改变解码和聚合。Prompt 仍是 CoT prompt，模型也不需要额外训练；关键参数是采样温度、样本数和答案解析函数。温度过低会得到高度相似的路径，投票收益有限；温度过高会生成噪声路径，增加解析错误。

它的强项是封闭答案空间的推理任务，例如数字答案、多选题、是非题。对于开放式生成，标准 Self-Consistency 会遇到“答案无法精确匹配”的问题：同义表达、列表顺序、长文本摘要都很难用正则或字符串投票处理。这也直接推动了 Universal Self-Consistency 等后续方法。

> 💡 关键：Self-Consistency 不是让模型反思，而是用采样近似“多条推理路径对同一答案的边缘支持”。

#### 🧪 练习题
```yaml
question: "Self-Consistency 相比普通 CoT 的核心变化是什么？"
options:
  - "训练一个新的验证器模型"
  - "采样多条推理链并对最终答案聚合投票"
  - "只使用零样本指令"
  - "把自然语言推理全部替换成 Python"
answer: 1
explain: "Self-Consistency 通过多路径采样降低单条推理链错误的影响，最终选择最一致的答案。"
```

### Zero-shot CoT

```yaml
id: zero_shot_cot
num: 6
name: Zero-shot CoT
full_name: 零样本思维链 (Zero-shot CoT)
year: '2022.05'
org: 东京大学/Google
parent: cot
paper_url: https://proceedings.neurips.cc/paper_files/paper/2022/hash/8bb0d291acd4acf06ef112099c16f326-Abstract-Conference.html
project_url: ''
category: reasoning
motivation: '"Let''s think step by step"激发推理'
```

#### 📝 一句话总结
Zero-shot CoT 通过在问题后加入 “Let's think step by step” 一类通用触发语，在没有任何示例的情况下诱导模型生成推理链，解决了 CoT 依赖人工少样本推理示例的问题。

#### 🎯 核心要点
- 使用任务无关的触发语激发逐步推理，不需要 few-shot CoT 示例
- 通常采用两阶段 prompting：先生成 reasoning，再用第二个 prompt 抽取最终答案
- 与标准 Zero-shot 相比，在算术、符号、常识推理任务上明显更强
- 与 Few-shot CoT 相比，人工 prompt 成本更低，但稳定性通常更弱
- 触发语可变，论文测试了多种类似模板
- 仍依赖模型规模和答案抽取，生成的推理链可能合理但错误

#### 🔬 深入细节
![Zero-shot CoT 输入输出对比](https://ar5iv.labs.arxiv.org/html/2205.11916/assets/x1.png)
*图：论文 Figure 1，对比标准 Few-shot、Few-shot CoT、标准 Zero-shot 与 Zero-shot CoT。图源：ar5iv / arXiv。*

```python
# Zero-shot CoT 两阶段推理伪代码
def zero_shot_cot(lm, question):
    reasoning_prompt = f"Q: {question}\nA: Let's think step by step."
    reasoning = lm.generate(reasoning_prompt)

    extraction_prompt = (
        f"Q: {question}\n"
        f"A: Let's think step by step. {reasoning}\n"
        "Therefore, the answer (arabic numerals) is"
    )
    final_answer = lm.generate(extraction_prompt, stop=["\n"])
    return normalize(final_answer), reasoning
```

Zero-shot CoT 可以看作在普通 zero-shot 条件分布里加入一个推理模式触发器 \(t\)：

$$
p_\theta(y,r \mid x,t), \quad t=\text{``Let's think step by step''}
$$

这个短语的作用不是提供具体知识，而是改变输出分布的格式先验：模型更倾向于续写一段分步分析，而不是直接给出短答案。对于需要多步计算的问题，这相当于为模型争取了额外的文本计算空间。

论文提出两阶段流程是因为第一阶段生成的文本常包含推理和答案，格式不一定适合自动评测。第二阶段把原问题、推理文本和答案抽取指令重新交给模型，让它输出标准化答案。这个设计牺牲了一次额外调用，换来更稳定的最终答案解析。

Zero-shot CoT 与 Few-shot CoT 的差别在于示例来源。Few-shot CoT 用人工构造的推理示例规定任务格式和推理粒度；Zero-shot CoT 只用通用触发语，依赖模型内部已经学到的“逐步解释”模式。因此它更便宜、更通用，但在任务特定格式、复杂符号规则或需要精确约束时不如精心设计的少样本 CoT 稳。

> ⚠️ 注意：触发“逐步思考”会增加可解释文本，但也可能增加冗长错误；在高风险任务中仍需要验证、工具执行或多路径投票。

#### 🧪 练习题
```yaml
question: "Zero-shot CoT 中第二阶段 prompting 的主要目的是什么？"
options:
  - "训练模型记住推理链"
  - "从第一阶段生成的推理中抽取格式化最终答案"
  - "随机打乱示例顺序"
  - "减少模型参数量"
answer: 1
explain: "Zero-shot CoT 第一阶段生成推理，第二阶段通常用于把推理结果转成可评测的最终答案。"
```

### Least-to-Most

```yaml
id: least_to_most
num: 7
name: Least-to-Most
full_name: 由易到难提示 (Least-to-Most Prompting)
year: '2022.05'
org: Google
parent: cot
paper_url: https://arxiv.org/abs/2205.10625
project_url: ''
category: reasoning
motivation: 将复杂问题分解为子问题逐步求解
```

#### 📝 一句话总结
Least-to-Most Prompting 先让模型把复杂问题分解成更简单的子问题，再按顺序求解并把前序答案传给后续步骤，解决了普通 CoT 在“测试题比示例更难”时泛化不足的问题。

#### 🎯 核心要点
- 两阶段流程：problem decomposition 与 sequential subproblem solving
- 分解和求解都通过 few-shot prompting 完成，不需要微调
- 后一个子问题的 prompt 会包含前面子问题及其答案
- 针对 easy-to-hard generalization，比普通 CoT 更适合组合泛化
- 在 SCAN、符号操作、数学推理等任务中显著提升
- 可与 CoT 结合：每个子问题内部仍可生成短推理链

#### 🔬 深入细节
![Least-to-Most 两阶段流程](https://ar5iv.labs.arxiv.org/html/2205.10625/assets/figures/ltm-pull-fig_new.png)
*图：论文 Figure 1，展示先分解问题、再按子问题顺序求解的流程。图源：ar5iv / arXiv。*

```python
# Least-to-Most prompting 伪代码
def least_to_most(lm, decomposition_prompt, solving_prompt, problem):
    subquestions = lm.generate(
        decomposition_prompt + f"\nProblem: {problem}\nSubproblems:"
    )
    context = f"Problem: {problem}\n"
    answers = []
    for q in parse_subquestions(subquestions):
        prompt = solving_prompt + "\n" + context + f"Q: {q}\nA:"
        a = lm.generate(prompt)
        answers.append((q, a))
        context += f"Q: {q}\nA: {a}\n"
    return answers[-1][1], answers
```

普通 CoT 假设示例中的推理模式可以直接迁移到测试题，但当测试题需要更多组合步骤时，模型可能学到的是“示例长度附近的解法”。Least-to-Most 把问题显式拆成一串更小的目标，让每次调用都只处理当前可控难度的子任务。

流程可以写成：

$$
q_{1:n} \sim p_\theta(\text{subquestions} \mid x), \quad
a_i \sim p_\theta(a_i \mid x, q_1,a_1,\ldots,q_i)
$$

其中 \(q_{1:n}\) 是分解出的子问题，\(a_i\) 是第 \(i\) 个子问题答案。关键是求解第 \(i\) 个子问题时，模型能看到 \(a_{<i}\)，所以复杂依赖被转化成逐步累积的状态。

这种设计的优势在组合任务上尤其明显。例如 SCAN 这类指令映射任务要求模型把短规则组合成长动作序列；普通 CoT 示例如果都很短，模型不一定能 extrapolate 到长序列。Least-to-Most 则把长指令拆成局部片段，逐步构造最终输出。

与 CoT 的区别在于，CoT 主要控制“答案内部要写推理步骤”，Least-to-Most 控制“问题外部要先规划子问题结构”。前者是一条连续推理链，后者是显式课程式求解；当问题天然可分解时，Least-to-Most 更容易复用前序中间结果，也更便于人工检查失败发生在哪个子问题。

> 💡 关键：Least-to-Most 的核心不是让推理更长，而是让每一步更简单，并让上下文保存已解决的中间状态。

#### 🧪 练习题
```yaml
question: "Least-to-Most Prompting 最核心的两步是什么？"
options:
  - "采样多条答案并多数投票"
  - "先分解复杂问题，再顺序求解子问题"
  - "把答案翻译成 Python 并执行"
  - "训练奖励模型筛选 prompt"
answer: 1
explain: "Least-to-Most 通过 decomposition 和 sequential solving 将难题变成一串依赖前序答案的简单子问题。"
```

### ReAct

```yaml
id: react
num: 8
name: ReAct
full_name: 推理行动协同 (ReAct)
year: '2022.10'
org: Google/Princeton
parent: cot
paper_url: https://arxiv.org/abs/2210.03629
project_url: ''
category: reasoning
motivation: 协同推理与行动调用外部工具
```

#### 📝 一句话总结
ReAct 让语言模型交替生成 Thought、Action 和 Observation，把内部推理与外部工具或环境交互结合起来，解决了纯 CoT 容易幻觉、纯行动策略缺少任务规划的问题。

#### 🎯 核心要点
- 统一 Reasoning traces 与 task-specific actions
- 轨迹格式通常为 Thought → Action → Observation 的循环
- Action 可调用 Wikipedia API、搜索接口、网页环境或文本游戏环境
- Thought 用于分解目标、跟踪状态、修正计划和整合观察
- 在 HotpotQA、Fever、ALFWorld、WebShop 等任务上优于只推理或只行动基线
- 轨迹可解释性强，适合调试 agent 失败原因

#### 🔬 深入细节
![ReAct 与标准 prompting、CoT、Act-only 对比](https://ar5iv.labs.arxiv.org/html/2210.03629/assets/x1.png)
*图：论文 Figure 1，对比 Standard、CoT、Act-only 与 ReAct 在问答和环境任务中的轨迹。图源：ar5iv / arXiv。*

```python
# ReAct agent 推理-行动循环伪代码
def react_agent(lm, tools, task, examples, max_steps=8):
    trajectory = format_examples(examples) + f"\nQuestion: {task}\n"
    for _ in range(max_steps):
        thought_action = lm.generate(trajectory + "Thought:")
        thought, action = parse_thought_and_action(thought_action)
        trajectory += f"Thought: {thought}\nAction: {action}\n"

        if action.name == "Finish":
            return action.argument, trajectory

        observation = tools[action.name](*action.arguments)
        trajectory += f"Observation: {observation}\n"
    return "No answer", trajectory
```

ReAct 的状态可以写为 \(s_t=(x,\tau_{<t})\)，其中 \(x\) 是任务输入，\(\tau_{<t}\) 是已经产生的 thought/action/observation 轨迹。模型在每一步生成：

$$
(\text{thought}_t,\text{action}_t) \sim p_\theta(\cdot \mid x,\tau_{<t})
$$

Action 执行后得到外部观察 \(o_t\)，再追加到上下文中。这样模型不必完全依赖参数记忆回答事实问题，也不必在没有语言规划的情况下盲目探索环境。

纯 CoT 的缺陷是封闭世界：模型只能基于已有知识和上下文推理，遇到事实缺口时容易编造。ReAct 通过 Action 把推理链接到外部信息源，例如先搜索实体，再查找页面，再根据观察更新下一步检索。Thought 的作用是决定“下一步查什么”和“观察意味着什么”。

纯行动方法的缺陷是缺少显式状态抽象。ReAct 的 Thought 能记录目标、已完成步骤、失败原因和替代计划。例如环境返回“物品不在当前位置”时，模型可以在 Thought 中修正路线，而不是继续重复无效动作。

从 prompt engineering 角度看，ReAct 的关键是少样本轨迹示范。示例不只给最终答案，还展示可用动作名、动作参数格式、观察如何进入上下文、何时调用 `Finish`。这使模型学会一个可执行协议，而不是仅学会回答风格。

> 💡 关键：ReAct 把语言模型从“只会续写答案”变成“能维护轨迹并调用环境反馈的控制器”。

#### 🧪 练习题
```yaml
question: "ReAct 中 Observation 的作用是什么？"
options:
  - "替代语言模型参数"
  - "把外部工具或环境返回的信息写回轨迹，供后续推理使用"
  - "保存训练梯度"
  - "随机选择下一个示例"
answer: 1
explain: "Observation 是 Action 执行后的外部反馈，ReAct 将其追加到上下文中以支持下一步 Thought 和 Action。"
```

### ToT

```yaml
id: tot
num: 9
name: ToT
full_name: 思维树 (Tree of Thoughts)
year: '2023'
org: Princeton/Google
parent: cot
paper_url: https://proceedings.neurips.cc/paper/2023/hash/271db9922b8d1f4dd7aaef84ed5ac703-Abstract.html
project_url: ''
category: reasoning
motivation: 引入搜索算法探索与回溯思维路径
```

#### 📝 一句话总结
Tree of Thoughts 将中间推理步骤建模为树节点，用语言模型生成、评估并搜索多个思维分支，解决了 CoT 单路径推理无法系统探索和回溯的问题。

#### 🎯 核心要点
- 将 thought 定义为可作为中间步骤的连贯语言片段
- 状态表示为输入加已生成 thought 序列 \(s=[x,z_{1:i}]\)
- 四个核心设计：thought decomposition、generation、evaluation、search
- 支持 BFS、DFS 等显式搜索策略和回溯
- 语言模型既可生成候选 thought，也可作为启发式评估器
- 在 Game of 24、Creative Writing、Mini Crosswords 等任务上展示优势

#### 🔬 深入细节
![Tree of Thoughts 框架图](https://ar5iv.labs.arxiv.org/html/2305.10601/assets/x1.png)
*图：论文 Figure 1，对比输入输出、CoT、自洽 CoT 与 ToT 的问题求解结构。图源：ar5iv / arXiv。*

```python
# ToT-BFS 简化伪代码
def tot_bfs(lm, problem, depth, branch, beam):
    frontier = [State(problem=problem, thoughts=[])]
    for t in range(depth):
        candidates = []
        for state in frontier:
            thoughts = generate_thoughts(lm, state, k=branch)
            for z in thoughts:
                next_state = state.extend(z)
                score = evaluate_state(lm, next_state)
                candidates.append((score, next_state))
        frontier = [s for _, s in sorted(candidates, reverse=True)[:beam]]
    return select_best_solution(lm, frontier)
```

ToT 把问题求解写成搜索问题。每个节点是一个 partial solution：

$$
s_i = [x, z_1, z_2, \ldots, z_i]
$$

其中 \(x\) 是原问题，\(z_i\) 是第 \(i\) 个 thought。模型不再一次性生成完整答案，而是在每个状态上生成若干候选 thought，再用评估函数估计这些状态离成功有多近。

论文将 ToT 的实例化拆成四个问题。第一，如何把任务过程分成 thought 粒度，例如 Game of 24 中一步算式就是一个 thought。第二，如何生成候选 thought，可以独立采样或按 prompt 提议多个候选。第三，如何评估状态，可以让模型打分、投票或判断可行性。第四，使用哪种搜索策略，例如 BFS 保留 top-\(b\) 状态，DFS 在低分时回溯。

与 Self-Consistency 相比，ToT 不只是采样多条完整推理链后投票，而是在中间层面就进行选择。错误分支可以提前剪枝，有希望的分支可以继续展开。这种 lookahead 和 backtracking 对组合搜索任务尤其重要，因为早期一个错误步骤会导致后续全部无效。

ToT 的代价是推理调用次数显著增加，并且需要为任务定义 thought 粒度和评估 prompt。它更适合高价值、可分步搜索、可评估中间状态的任务；对于简单问答，普通 CoT 或 Self-Consistency 往往更便宜。

> 💡 关键：ToT 把 prompt 从“线性续写”升级为“语言模型驱动的启发式搜索”。

#### 🧪 练习题
```yaml
question: "ToT 相比普通 CoT 的关键增强是什么？"
options:
  - "只输出最终答案"
  - "维护多个 thought 分支并用搜索策略选择和回溯"
  - "禁止模型生成中间步骤"
  - "只依赖监督微调"
answer: 1
explain: "ToT 将中间推理表示为树节点，通过生成、评估和搜索探索多条候选路径。"
```

### PAL

```yaml
id: pal
num: 10
name: PAL
full_name: 程序辅助语言模型 (PAL)
year: '2023'
org: CMU
parent: cot
paper_url: https://proceedings.mlr.press/v202/gao23f.html
project_url: ''
category: reasoning
motivation: 将推理转为可执行代码保证准确性
```

#### 📝 一句话总结
PAL 让语言模型把自然语言问题转成可执行程序，再由 Python 解释器完成计算，解决了 CoT 会写出合理推理但算错或执行不精确的问题。

#### 🎯 核心要点
- Program-aided Language Models 将中间推理表示为代码
- LLM 负责理解问题、分解变量和生成程序，解释器负责执行
- 最终答案来自程序运行结果，而不是模型直接口算
- 在 13 个算术和符号推理任务上评估，尤其适合精确计算
- 使用 Codex 等具备代码能力的模型生成 Python
- 与 CoT 互补：自然语言推理可读，程序执行更可靠

#### 🔬 深入细节
![PAL 与 CoT 对比图](https://ar5iv.labs.arxiv.org/html/2211.10435/assets/x1.png)
*图：论文 Figure 1，对比 CoT 的自然语言推理和 PAL 的 Python 程序执行流程。图源：ar5iv / arXiv。*

```python
# PAL 推理伪代码
def pal_solve(lm, prompt_examples, question, python_executor):
    prompt = prompt_examples + f"\n# Question: {question}\n"
    prompt += "# Write a Python program to solve it.\n"
    program = lm.generate(prompt, stop=["\n\n# Question:"])
    result = python_executor.run(program, entrypoint="solution")
    return result, program
```

PAL 的核心分解是：

$$
c \sim p_\theta(c \mid x, D_{\text{PAL}}), \quad y = \operatorname{Exec}(c)
$$

其中 \(c\) 是模型生成的程序，\(\operatorname{Exec}\) 是外部解释器。模型不再承担所有推理和计算，只负责把语言问题翻译成程序化步骤；精确算术、循环、条件和符号操作交给解释器执行。

CoT 在复杂算术上常见失败是“思路看起来对，但某一步算错”。PAL 把这些易错步骤落到代码里，例如把人数、价格、日期写成变量，再用表达式计算。只要程序语义正确，解释器会稳定给出同一结果，不会像语言模型那样在多位数计算上随机漂移。

Prompt 的示例需要展示从题目到代码的映射风格：如何命名变量、如何写注释、如何把最终结果赋给 `answer` 或从 `solution()` 返回。示例越清楚，模型越容易生成可执行且结构化的程序。这里的“推理链”仍然存在，只是从自然语言句子变成了代码语句。

PAL 的边界也很清楚：如果模型误解题意，解释器只能精确执行错误程序；如果执行环境不安全或库不可用，也会带来工程风险。因此实际系统中通常需要沙箱、超时、依赖白名单和异常回退。

> 💡 关键：PAL 不要求语言模型自己算得更准，而是让模型把问题交给更适合精确执行的符号工具。

#### 🧪 练习题
```yaml
question: "PAL 中 Python 解释器主要承担什么职责？"
options:
  - "生成自然语言题目"
  - "执行模型生成的程序并产出最终答案"
  - "训练语言模型参数"
  - "筛选 few-shot 示例顺序"
answer: 1
explain: "PAL 由 LLM 生成程序，解释器执行程序，因此最终答案来自可执行代码的运行结果。"
```

### Universal SC

```yaml
id: universal_sc
num: 11
name: Universal SC
full_name: 通用自洽性 (Universal Self-Consistency)
year: '2023.11'
org: Google
parent: self_consistency
paper_url: https://arxiv.org/abs/2311.17311
project_url: ''
category: reasoning
motivation: 扩展自洽性至开放式任务
```

#### 📝 一句话总结
Universal Self-Consistency 用语言模型直接从多个候选回答中选择最一致的一个，解决了标准 Self-Consistency 依赖答案抽取、难以处理开放式生成的问题。

#### 🎯 核心要点
- 先采样多个候选响应，再用 LLM 进行 consistency-based selection
- 不需要正则抽取最终答案，也不要求候选格式完全一致
- 适用于数学推理、代码生成、长上下文摘要、开放式问答等任务
- 在可抽取答案的数学任务上接近标准 Self-Consistency
- 在摘要和 TruthfulQA 等开放任务上提供标准 SC 无法直接使用的聚合方式
- 局限包括候选顺序偏置、长上下文理解压力和“最一致不等于最好”

#### 🔬 深入细节
![Universal Self-Consistency 工作流](https://ar5iv.labs.arxiv.org/html/2311.17311/assets/figs/usc.png)
*图：论文 Figure 1，展示采样多个候选回答并由 LLM 选择最一致响应的流程。图源：ar5iv / arXiv。*

```python
# Universal Self-Consistency 伪代码
def universal_self_consistency(lm, task_prompt, x, n_samples):
    candidates = []
    for _ in range(n_samples):
        candidates.append(lm.generate(task_prompt + format_input(x), temperature=0.7))

    selection_prompt = build_selection_prompt(
        x=x,
        candidates=candidates,
        criterion="Choose the response that is most consistent with the others.",
    )
    chosen_index = lm.generate(selection_prompt)
    return candidates[parse_index(chosen_index)], candidates
```

标准 Self-Consistency 的聚合依赖 \(a_m=\operatorname{extract}(y_m)\)，即从每条推理链中抽取一个可比较的短答案。开放式任务中这个函数很难定义：两个摘要可能都正确但措辞不同，两个实体列表可能部分重叠，代码也可能有不同实现。USC 直接把候选 \(y_{1:M}\) 交给模型判断：

$$
j^\* = \operatorname{LLMSelect}(x, y_1,\ldots,y_M; \text{consistency})
$$

然后输出 \(y_{j^\*}\)。这把“答案规范化和投票”的手工规则替换为模型自己的语义一致性判断。

USC 的动机是，判断候选之间哪一个最符合多数语义，通常比从零生成更容易。候选集中往往已经包含高质量答案，选择器只需要比较它们共享的事实、推理结论或内容覆盖。对于数学题，它可以近似标准 SC；对于开放问答，它可以选择实体覆盖最一致的候选；对于摘要，它可以偏向信息更完整或与多数内容一致的摘要。

方法的一个重要工程点是 selection prompt。候选需要编号，顺序最好随机化或多次重排以减轻位置偏置；标准可以是“most consistent”，也可以针对任务改成“most detailed”“most truthful”等。论文也指出任务特定选择标准可能进一步提升摘要等任务。

USC 的失败模式来自 LLM-as-judge 本身：长候选太多会超过上下文或削弱比较能力；多数一致也可能意味着多数候选共享同一个错误；候选顺序和表述风格可能影响选择。因此 USC 更像一个通用聚合框架，而不是完美验证器。

> 💡 关键：USC 的泛化点在于不再要求答案可被规则抽取，而是让模型在语义层面做一致性选择。

#### 🧪 练习题
```yaml
question: "Universal Self-Consistency 解决了标准 Self-Consistency 的哪类主要限制？"
options:
  - "无法进行梯度更新"
  - "开放式回答难以用规则抽取并精确投票"
  - "不能采样多个候选"
  - "只能使用小模型"
answer: 1
explain: "USC 让 LLM 直接选择最一致候选，避免为每个开放式任务手写答案抽取和匹配规则。"
```

### GoT

```yaml
id: got
num: 12
name: GoT
full_name: 思维图 (Graph of Thoughts)
year: '2024'
org: ETH Zurich
parent: tot
paper_url: https://ojs.aaai.org/index.php/AAAI/article/view/29720
project_url: ''
category: reasoning
motivation: 将思维建模为有向图支持聚合循环
```

#### 📝 一句话总结
Graph of Thoughts 将中间思维从线性链或树扩展为有向图，使模型能生成、聚合、评分、筛选并循环改写 thought，解决了 ToT 难以表达多分支合并和复杂工作流的问题。

#### 🎯 核心要点
- 将 thought 表示为图中的顶点，将操作依赖表示为有向边
- 支持 Generate、Aggregate、Score、KeepBest 等 thought transformation
- 比 CoT、Self-Consistency、ToT 更自然地表达分支合并和循环 refinement
- 引入 Graph Reasoning State / controller 思路来调度图执行
- 在排序、集合交集、关键词计数、文档合并等任务中验证
- 目标是在质量、成本和延迟之间获得更灵活的 tradeoff

#### 🔬 深入细节
![Graph of Thoughts 与其他 prompting 策略对比](https://ar5iv.labs.arxiv.org/html/2308.09687/assets/x1.png)
*图：论文 Figure 1，对比 GoT 与 IO、CoT、Self-Consistency、ToT 等提示策略。图源：ar5iv / arXiv。*

```python
# Graph of Thoughts 调度伪代码
def run_got(lm, graph_plan, input_data):
    graph = ThoughtGraph()
    graph.add_node("input", value=input_data)

    for op in graph_plan:
        parents = graph.get_nodes(op.inputs)
        if op.type == "Generate":
            children = generate_thoughts(lm, parents, n=op.n)
            graph.add_children(parents, children)
        elif op.type == "Aggregate":
            merged = aggregate_thoughts(lm, parents)
            graph.add_node(op.output, merged, parents=parents)
        elif op.type == "Score":
            graph.attach_scores(score_thoughts(lm, parents))
        elif op.type == "KeepBest":
            graph.keep_top_k(parents, k=op.k)
    return graph.best_output()
```

GoT 把推理过程表示为有向图 \(G=(V,E)\)。每个顶点 \(v \in V\) 是一个 thought，可以是部分答案、候选列表、摘要片段或中间分析；边 \(e \in E\) 表示某个 thought transformation 的输入输出依赖。这样，多个 thought 可以被聚合成一个新 thought，一个 thought 也可以被多次扩展或回到前面步骤重新 refinement。

ToT 的结构是树，适合“从一个状态分裂出多个候选，再继续向下搜索”。但许多任务需要合并：例如把长列表切块排序后再合并，把多个文档摘要融合成一个摘要，把多个候选解的优点整合。树结构表达合并很别扭，图结构则可以把 Aggregate 作为一等操作。

GoT 的操作层使 prompt workflow 更像可编排程序。Generate 负责产生候选，Score 负责评价候选，KeepBest 做剪枝，Aggregate 负责融合多个候选。不同任务可以复用这些算子，只替换 prompt 模板和图计划。例如排序任务可以“分块生成排序结果 → 聚合 → 再评分修正”。

与 ReAct 的工具调用不同，GoT 的重点不是外部环境反馈，而是组织 LLM 自身的多次生成与选择。它牺牲一些实现复杂度，换来更强的工作流表达能力；当任务需要多轮合并、改写和筛选时，这种图式结构比线性 CoT 更稳定。

> 💡 关键：GoT 的创新在于允许 thought 之间多对一、一对多和循环依赖，把 prompt reasoning 从搜索树升级为可编排图。

#### 🧪 练习题
```yaml
question: "GoT 相比 ToT 最重要的结构扩展是什么？"
options:
  - "完全移除中间 thought"
  - "允许多个 thought 聚合成新 thought，并支持图式依赖"
  - "只保留一条贪心路径"
  - "要求所有任务都调用外部搜索引擎"
answer: 1
explain: "GoT 将思维组织为有向图，因此可以表达分支、合并、评分、筛选和循环改写等复杂流程。"
```

### Self-Refine

```yaml
id: self_refine
num: 13
name: Self-Refine
full_name: 自我精炼 (Self-Refine)
year: '2023.03'
org: CMU/Allen AI
parent: —
paper_url: https://proceedings.neurips.cc/paper_files/paper/2023/hash/91edff07232fb1b55a505a9e9f6c0ff3-Abstract-Conference.html
project_url: ''
category: optimization
motivation: 通过自我反馈迭代改进输出质量
```

#### 📝 一句话总结
Self-Refine 让同一个语言模型先生成初稿，再给自己的输出写反馈，并基于反馈迭代改写，解决了单次生成难以一次达到高质量的问题。

#### 🎯 核心要点
- 三个核心阶段：initial generation、feedback、refine
- 使用同一个底座 LLM 完成生成、反馈和改写，不需要额外训练
- 迭代直到达到固定轮数或模型判断无需继续修改
- 反馈需要具体指出缺陷，refine 需要保留优点并修复问题
- 在对话、代码优化、约束生成、情感反转、缩写生成等任务上评估
- 适合开放式生成质量优化，但不能保证每轮都单调变好

#### 🔬 深入细节
![Self-Refine 高层流程图](https://ar5iv.labs.arxiv.org/html/2303.17651/assets/x1.png)
*图：论文 Figure 1，展示同一模型生成输出、生成反馈并迭代精炼的流程。图源：ar5iv / arXiv。*

```python
# Self-Refine 迭代伪代码
def self_refine(lm, task_input, max_iters=3):
    y = lm.generate(build_initial_prompt(task_input))
    history = []
    for t in range(max_iters):
        feedback = lm.generate(build_feedback_prompt(task_input, y, history))
        if is_satisfied(feedback):
            break
        y_new = lm.generate(build_refine_prompt(task_input, y, feedback))
        history.append((y, feedback, y_new))
        y = y_new
    return y, history
```

Self-Refine 的迭代可以写成：

$$
y_0 = \mathcal{M}(x), \quad
fb_t = \mathcal{M}(x,y_t), \quad
y_{t+1} = \mathcal{M}(x,y_t,fb_t)
$$

其中同一个模型 \(\mathcal{M}\) 同时扮演作者、评论者和编辑。它不依赖人工反馈，也不需要训练奖励模型；所有改进都通过 prompt 中的自反馈文本完成。

该方法的动机来自开放式生成的常见现象：第一次回答可能方向正确但有遗漏、约束违反、代码低效或表达不清。直接要求模型“再试一次”不一定有效，因为缺少明确改写目标；Self-Refine 先生成反馈，把问题显式列出来，再让模型根据反馈修订。

反馈质量是核心。好的 feedback 应该具体、可执行，例如指出“没有满足长度约束”“代码复杂度仍是 \(O(n^2)\)”“回答没有覆盖用户第二个要求”。如果反馈只是泛泛地说“需要更好”，refine 阶段很难稳定改进。论文也通过消融说明反馈步骤本身对性能很重要。

Self-Refine 与 Self-Consistency 的方向不同：Self-Consistency 并行采样多个候选后选择，Self-Refine 串行改进同一个候选。前者适合封闭答案投票，后者适合开放式质量打磨。实际系统中也可以组合：先采样多个初稿，再分别 refine，最后用选择器挑选。

> ⚠️ 注意：Self-Refine 没有外部真值校验，模型可能把正确内容改坏；高风险任务应加入测试、规则检查或人类审核。

#### 🧪 练习题
```yaml
question: "Self-Refine 的 feedback 阶段主要作用是什么？"
options:
  - "为模型参数计算梯度"
  - "指出当前输出的具体问题，为下一轮改写提供目标"
  - "随机删除上下文"
  - "替代最终答案输出"
answer: 1
explain: "Self-Refine 依靠模型生成的具体反馈指导 refine 阶段修复初稿问题。"
```

### Reflexion

```yaml
id: reflexion
num: 14
name: Reflexion
full_name: 反思学习 (Reflexion)
year: '2023.03'
org: MIT/Northeastern
parent: self_refine
paper_url: https://proceedings.neurips.cc/paper_files/paper/2023/hash/1b44b878bb782e6954cd888628510e90-Abstract-Conference.html
project_url: ''
category: optimization
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

### APE

```yaml
id: ape
num: 15
name: APE
full_name: 自动提示工程师 (Automatic Prompt Engineer)
year: '2023'
org: 多伦多大学
parent: —
paper_url: https://openreview.net/forum?id=92gvk82DE-
project_url: ''
category: optimization
motivation: 利用LLM自动生成筛选最优指令
```

#### 📝 一句话总结
APE 将自然语言指令视为可搜索的“程序”，让 LLM 根据少量输入输出示例生成候选 prompt，再用目标模型执行结果打分筛选最优指令。

#### 🎯 核心要点
- 将 prompt engineering 形式化为 natural language program synthesis 和黑盒优化问题。
- 使用 LLM 作为 proposal model，根据 demonstrations 生成一批候选 instruction。
- 支持 forward generation、reverse generation 和针对任务的 customized prompt proposal。
- 使用 execution accuracy、目标答案 log probability 或任务指标作为 score function。
- 通过多阶段子集评估和 top-\(k\) 过滤降低候选 prompt 评估成本。
- 可选 iterative Monte Carlo search：保留高分候选，再让 LLM 生成语义相近变体。
- 在 Instruction Induction、BIG-Bench Instruction Induction、Zero-shot CoT 与 TruthfulQA 等设置中验证自动指令搜索的有效性。

#### 🔬 深入细节
![APE 自动提示工程师工作流](https://ar5iv.labs.arxiv.org/html/2211.01910/assets/x1.png)
*图：APE 工作流。LLM 生成候选指令，目标模型执行并打分，保留高分候选，必要时继续重采样相似指令。*

```python
# Automatic Prompt Engineer (APE) 伪代码
def ape(demos, proposer_llm, target_llm, score_fn, rounds=1, keep_ratio=0.2):
    # demos: 少量 (input, output) 示例
    candidates = proposer_llm.sample_instructions(demos)

    for _ in range(rounds):
        scored = []
        for instruction in candidates:
            # 先用小子集快速估计，候选足够好时再扩大评估集
            subset = sample_eval_subset(demos)
            predictions = [
                target_llm.generate(prompt=instruction, input=x)
                for x, y in subset
            ]
            score = score_fn(predictions, [y for x, y in subset])
            scored.append((score, instruction))

        scored.sort(reverse=True)
        survivors = [inst for score, inst in scored[:max(1, int(len(scored) * keep_ratio))]]

        # iterative APE: 围绕高分指令生成语义相近候选；默认可只做一轮
        candidates = survivors + proposer_llm.resample_similar_instructions(survivors)

    return best_by_full_validation(candidates, demos, target_llm, score_fn)
```

APE 的核心抽象是 \(instruction\ as\ program\)：一个 prompt 不只是自然语言提示，而是控制目标模型 \(M\) 执行任务的程序。给定样本 \((x,y)\)，目标是搜索指令 \(i\)，使模型在 \(i+x\) 条件下输出 \(y\) 的期望分数最大：
$$
i^*=\arg\max_i\mathbb{E}_{(x,y)\sim D}\left[s\left(M(i,x),y\right)\right].
$$
由于 \(i\) 是离散自然语言文本，且多数 API 模型无法提供梯度，APE 采用 generate-and-rank 的黑盒优化路线。

候选生成阶段让 LLM 扮演 inference model。forward mode 会把若干输入输出示例放在 prompt 中，让模型补全“这些样例遵循什么指令”；reverse mode 则使用 infilling 模型，把缺失的 instruction 作为空槽反推出来。两者的共同点是利用大模型的归纳能力，把无限大的自然语言搜索空间压缩成一个较小但质量较高的候选池。

评估阶段是 APE 与“只让模型猜一个 prompt”的分界线。论文讨论了两类典型 score：execution accuracy 直接比较预测与目标输出，适合分类、转换、简短问答；log probability 计算目标答案在候选指令下的条件似然，能给低质量候选提供更细粒度信号。对 TruthfulQA 等任务，score 也可以替换为任务自带的自动评估器。

为了控制成本，APE 不要求每个候选都在完整训练集上执行。它先用小子集快速淘汰低分候选，再把更多预算分配给高分候选，最后只对少量候选做完整验证。这一设计很实际：prompt 搜索的主要成本不是生成文本，而是反复调用目标模型执行候选指令。

iterative APE 进一步把搜索做成局部 Monte Carlo 过程：过滤出高分候选后，让 LLM 生成语义相近但措辞不同的变体，再继续评估。论文发现迭代能改善候选池整体质量，但最高分指令往往在初始生成中已经出现，因此默认 APE 可以保持简单的一轮生成加筛选。

与 soft prompt tuning 或 AutoPrompt 相比，APE 不优化连续向量或离散 token 模板，而是直接搜索人类可读的自然语言指令。这让它适合黑盒 LLM、API 模型和需要可解释 prompt 的场景；代价是它容易受验证集覆盖面、候选池多样性和 score function 偏差影响。如果验证集太窄，APE 可能学到只对少数示例有效的“投机式”指令。

#### 🧪 练习题
```yaml
question: "APE 中 score function 的主要作用是什么？"
options:
  - "衡量候选指令在目标模型上的实际任务表现并排序"
  - "直接修改目标模型参数"
  - "替代输入输出示例，生成训练数据标签"
  - "把自然语言 prompt 转换成连续 soft prompt"
answer: 0
explain: "APE 的核心是生成候选后执行并打分，score function 决定哪些指令被保留、重采样或最终选中。"
```

### PromptBreeder

```yaml
id: promptbreeder
num: 16
name: PromptBreeder
full_name: 提示词繁殖 (PromptBreeder)
year: '2023.09'
org: DeepMind
parent: ape
paper_url: https://arxiv.org/abs/2309.16797
project_url: ''
category: optimization
motivation: 进化算法实现提示词自我演化
```

#### 📝 一句话总结
PromptBreeder 将提示词和“如何变异提示词的提示词”一起放入进化循环，让任务 prompt 与 mutation prompt 共同演化，自动产生更适配任务的指令。

#### 🎯 核心要点
- 使用遗传算法维护 prompt population，而不是一次性生成候选
- 每个个体通常包含 task prompt 与 mutation prompt
- task prompt 决定模型如何解题，mutation prompt 决定下一代如何改写 task prompt
- 通过随机训练批次上的任务表现作为 fitness
- 采用锦标赛选择、交叉、变异和自指式变异提升多样性
- 相比 APE，更强调长期搜索和元提示词的自我改进

#### 🔬 深入细节
![PromptBreeder 总览](https://arxiv.org/html/2309.16797/x1.png)
*图源：arXiv HTML Figure 1，展示 population、task prompt、mutation prompt 与评估循环。*

```python
# PromptBreeder 进化式提示优化伪代码
def promptbreeder(task, init_prompts, init_mutators, evaluate, generations=20):
    population = [(p, m) for p in init_prompts for m in init_mutators]
    for _ in range(generations):
        fitness = {unit: evaluate(task_prompt=unit[0], batch=sample_batch(task))
                   for unit in population}
        parents = tournament_select(population, fitness)

        children = []
        for prompt, mutator in parents:
            new_prompt = llm_generate(mutator, prompt, task.description)
            new_mutator = maybe_mutate_mutator(mutator, task.description)
            children.append((new_prompt, new_mutator))

        population = elitism(population, children, fitness)
    return best_unit(population, evaluate)[0]
```

PromptBreeder 的新意在于把优化器的一部分也文本化。普通 prompt 搜索只优化 task prompt；PromptBreeder 还让 mutation prompt 参与进化。也就是说，系统不仅在学“怎样提示模型做这个任务”，还在学“怎样生成更好的提示改写”。这构成了一个自指式的元优化循环。

每一代的 fitness 来自任务验证批次。为了控制成本，论文使用随机 batch 估计 prompt 表现，再通过锦标赛选择保留高分个体。变异算子可以直接改写 task prompt，也可以改写 mutation prompt；后者会改变后续搜索的方向，使搜索策略本身逐渐适配任务域。

这种方法特别适合 prompt 空间高度非凸、难以手工枚举的场景。进化算法保留了多个候选分支，避免过早收敛到单一措辞；而 LLM 生成的变异又比字符级或词级随机扰动更语义化，通常能产生仍然可读、可执行的候选 prompt。

PromptBreeder 的代价是评估成本高于单轮 APE，并且需要设计 population size、选择压力、变异比例等超参数。它的优势在于长期自适应：如果初始 prompt 较弱，只要评估信号足够可靠，系统仍可能通过多代变异找到任务专用指令。

#### 🧪 练习题
```yaml
question: "PromptBreeder 与普通候选 prompt 搜索最主要的区别是什么？"
options:
  - "它只使用人工写好的 prompt"
  - "它同时进化任务提示词和用于变异提示词的元提示词"
  - "它必须微调目标语言模型"
  - "它不需要任何任务评分"
answer: 1
explain: "PromptBreeder 的个体包含 task prompt 和 mutation prompt，后者让搜索策略本身也能进化。"
```

### OPRO

```yaml
id: opro
num: 17
name: OPRO
full_name: 提示优化 (OPRO)
year: '2024'
org: Google DeepMind
parent: ape
paper_url: https://proceedings.iclr.cc/paper_files/paper/2024/hash/3339f19c5fcee3ad74502947a32be9e6-Abstract-Conference.html
project_url: ''
category: optimization
motivation: LLM作为优化器迭代提升提示词
```

#### 📝 一句话总结
OPRO 把历史候选解和分数写进 meta-prompt，让 LLM 根据“哪些方案得分高”继续提出更好的解，从而把语言模型本身用作黑盒优化器。

#### 🎯 核心要点
- 用自然语言描述优化问题、历史解和对应分数
- LLM 读取优化轨迹后生成下一批候选解或候选 prompt
- 每轮用外部目标函数评估新候选，再把结果追加回 meta-prompt
- 适用于数学优化，也适用于任务 prompt 的自动改写
- 在 GSM8K、BBH 等任务上可找到超过人工 prompt 的指令
- 成败取决于历史排序呈现、探索约束、评价噪声和上下文长度

#### 🔬 深入细节
![OPRO 工作流示意图](https://arxiv.org/html/2309.03409v3/x3.png)
*图源：arXiv HTML Figure 2，展示 LLM 根据历史解-分数对迭代生成新解。*

```python
# OPRO 黑盒优化伪代码
def opro_optimize(problem_description, initial_solutions, optimizer_llm, objective, rounds=10):
    history = [(objective(sol), sol) for sol in initial_solutions]
    for _ in range(rounds):
        meta_prompt = render_meta_prompt(
            problem=problem_description,
            scored_solutions=sorted(history, reverse=True),
            instruction="Propose new solutions with higher scores.",
        )
        proposals = optimizer_llm.generate_list(meta_prompt)
        for sol in proposals:
            history.append((objective(sol), sol))
        history = keep_top_and_diverse(history, limit=50)
    return max(history, key=lambda pair: pair[0])[1]
```

OPRO 的基本假设是：LLM 不只会执行 prompt，也能从历史样本中归纳“什么样的解更好”。当 meta-prompt 中列出若干候选解及其分数后，模型会倾向于模仿高分解的结构，同时尝试新的变体。这把优化过程转化为上下文学习，而不是显式梯度下降。

用于 prompt 优化时，候选解就是自然语言指令，目标函数通常是验证集准确率。每轮 LLM 看到过去 prompt 的得分，生成更可能提升指标的新 prompt；外部评估器再给出真实分数。与 APE 的一次性 generate-and-rank 相比，OPRO 明确利用了历史轨迹，具有迭代爬坡能力。

meta-prompt 的组织方式很关键。高分样本通常按分数排序展示，以便模型学习趋势；同时需要保留一定低分或多样样本，避免搜索过早塌缩。候选解数量、温度、历史窗口大小都会影响探索与利用的平衡。

OPRO 的强项是通用：只要能把目标函数评价结果写成文本，它就能尝试优化。但它不是数学意义上有收敛保证的优化器；上下文长度限制、评价噪声、分数泄漏和验证集过拟合都会影响最终 prompt。实际使用时通常要配合独立测试集确认泛化。

#### 🧪 练习题
```yaml
question: "OPRO 中 LLM 扮演的核心角色是什么？"
options:
  - "仅作为固定分类器"
  - "读取历史解和分数后提出新的候选解"
  - "直接反向传播更新目标模型"
  - "删除低分样本以外的所有上下文"
answer: 1
explain: "OPRO 把优化轨迹写进 meta-prompt，让 LLM 基于历史表现生成下一轮候选。"
```

### Causal-CoT

```yaml
id: causal_cot
num: 18
name: Causal-CoT
full_name: 因果思维链 (Causal CoT)
year: '2026.01'
org: NeurIPS
parent: cot
paper_url: https://proceedings.neurips.cc/paper_files/paper/2025/hash/b7870bd43b2d133a1ed95582ae5d82a4-Abstract-Conference.html
project_url: ''
category: frontier_2026
motivation: 因果分析消除幻觉提升逻辑严密性
```

#### 📝 一句话总结
Causal-CoT 用因果充分性与必要性评估 CoT 中每个推理步骤的真实贡献，通过反事实 rollout 保留既能支撑答案又不可替代的步骤，从而压缩冗余推理并减少幻觉。

#### 🎯 核心要点
- 针对普通 CoT 的两类问题：步骤不足导致结论缺证据，步骤冗余导致过度推理与 token 浪费。
- 引入 Probability of Sufficiency (PS)、Probability of Necessity (PN) 和 Probability of Necessary and Sufficient Cause (PNS) 描述推理链与步骤的因果贡献。
- 先做 chain-level PS 判断整条 CoT 是否足以得到正确答案，再做 node-level PN/PNS 判断单个步骤是否不可替代。
- 通过 counterfactual intervention 替换或移除步骤，并让 rollout model 生成后续链条来估计该步骤的必要性。
- 用阈值 \(\alpha\) 剪枝低 PNS 步骤，得到 compact CoT，再用于 in-context learning 或 supervised fine-tuning。
- 论文在 GSM-8K、MATH-500、AIME、CommonsenseQA 等数学与常识推理基准上报告了更短推理链和更高/相近准确率。

#### 🔬 深入细节
![Causal-CoT 因果优化框架](https://arxiv.org/html/2506.09853v3/x3.png)
*图：Causal Optimization Framework for CoT Reasoning。初始 CoT 经 PS/PNS 评估、反事实干预和剪枝后形成 compact CoT，并用于 ICL 或 SFT。*

```python
# Sufficient and Necessary Optimization of CoT 伪代码
def causal_cot_optimize(S_init, q, y, alpha, rollout_model, validator, k):
    # PS: 先确认完整链条是否足以得到正确答案
    y_hat = rollout_answer(S_init, q)
    if y_hat != y:
        return S_init  # 单次运行不剪枝；实践中可重采样更充分的 CoT

    S_final = []
    S_current = list(S_init)

    for step_index, s_t in enumerate(S_current):
        prefix = S_final + S_current[len(S_final):step_index]

        # 对当前步骤做反事实替换/删除，再 rollout 后续步骤
        scores = []
        for _ in range(k):
            s_alt = generate_alternative(prefix, s_t)
            S_counterfactual = rollout_model.continue_chain(
                question=q,
                prefix=prefix + [s_alt],
            )
            # validator 判断反事实链是否仍能保持正确、连贯和逻辑完整
            scores.append(validator(S_counterfactual, answer=y))

        pns = 1.0 - sum(scores) / k
        if pns > alpha:
            S_final.append(s_t)   # 替换后会坏，说明原步骤必要，保留
        else:
            pass                  # 替换后仍可行，说明原步骤冗余，剪掉

    return S_final
```

普通 CoT 把推理过程写成线性文本，但线性文本无法保证每一步都真正支撑最终答案。论文把问题拆成两个因果标准：充分性要求整条推理链足以推出答案；必要性要求某个中间步骤一旦被替换或移除，答案或逻辑完整性就会受损。前者防止“跳步”，后者防止“过度解释”。

论文用 Pearl 因果框架重写这些概念。对推理链 \(S=(s_1,\dots,s_n)\)，PS 衡量把 \(S\) 作为干预插入后是否能把错误答案变为正确答案：
$$
\mathrm{PS}(S,q)=P(A_{\mathrm{do}(S)}=y\mid A\ne y,\bar{S},q).
$$
对具体步骤 \(s_t\)，PN 衡量把该步骤替换为错误或替代步骤 \(\bar{s}_t\)，并重新生成后续步骤 \(s'_{>t}\) 后，正确答案是否被破坏：
$$
\mathrm{PN}(S,s_t,q)=P(A_{\mathrm{do}(s_{<t},\bar{s}_t,s'_{>t})}\ne y\mid A=y,S,q).
$$
PNS 则关注“原链正确且反事实链错误”的联合事件：
$$
\mathrm{PNS}(S,s_t,q)=P(A_S=y,\;A_{S'}\ne y).
$$

直接最大化完整 PNS 很昂贵，因此方法采用两阶段近似。第一阶段把 chain-level PS 近似为二值：如果当前 CoT 产生正确答案，则 \(\mathrm{PS}=1\)，否则不对它做必要性剪枝，并可通过重复采样寻找更充分的链。第二阶段在 \(\mathrm{PS}=1\) 的链上逐节点估计 PN/PNS，只保留对正确推理有因果贡献的步骤。

PNS 的估计依赖反事实 rollout。对于每个步骤 \(s_t\)，系统构造一个与原步骤语义分离的替代步骤 \(\bar{s}_t\)，再让 rollout model 从前缀和替代步骤继续生成后续链 \(S^{(i)}\)。validation model \(V\) 不只检查最终答案，还检查推理是否连贯、逻辑是否完整。论文用 Monte Carlo 形式估计：
$$
\mathrm{PNS}(S,s_t,q)\approx 1-\frac{1}{k}\sum_{i=1}^{k}V(S^{(i)}).
$$
如果替换后大多数 rollout 仍然被验证为有效，说明原步骤不是必要条件，可以剪掉；如果替换后经常失败，原步骤的 PNS 高，应保留。

这与常见的 CoT 压缩不同。简单压缩通常按长度、困惑度或句子重要性删减文本，可能删掉对最终答案关键但表面不显著的步骤；Causal-CoT 则通过“干预后答案是否仍成立”来判断必要性。它也不同于 self-consistency：self-consistency 汇总多条链的答案，Causal-CoT 要重构一条更短、更因果忠实的链，并把这些 compact CoT 用作 ICL 示例或 SFT 数据。

> ⚠️ 注意：Causal-CoT 的收益依赖 validator 和 rollout model 的可靠性。如果验证器只看最终答案而忽略中间逻辑，PNS 会把“碰巧答对”的反事实链误判为有效，从而过度剪枝。

#### 🧪 练习题
```yaml
question: "Causal-CoT 中某个步骤的 PNS 高通常意味着什么？"
options:
  - "该步骤被反事实替换后推理更容易失败，因此它对正确答案具有必要贡献"
  - "该步骤越长越好，应无条件保留所有长步骤"
  - "该步骤与问题无关，可以直接删除"
  - "该步骤只提高输出格式，不影响推理结果"
answer: 0
explain: "PNS 近似为 1 减去反事实链仍有效的比例；值高说明替换后多数 rollout 不能维持正确和连贯推理。"
```

### NCoTS

```yaml
id: ncots
num: 19
name: NCoTS
full_name: 神经思维链搜索 (Neural CoT Search)
year: '2026.01'
org: arXiv
parent: tot
paper_url: https://arxiv.org/abs/2601.11340
project_url: ''
category: frontier_2026
motivation: 搜索最优推理路径减少冗余提升准确率
```

#### 📝 一句话总结
NCoTS 将大语言模型的推理过程重新建模为**最优思维策略的动态搜索问题**，在每个推理决策点通过双因子启发式函数（路径潜力 + 推理进度）评估候选推理算子，实现了准确率提升 3.5% 同时生成长度缩减 22% 的帕累托改进。

#### 🎯 核心要点
- **推理路径规划瓶颈**：揭示当前大推理模型（LRM）缺乏前瞻性，在关键决策点无法战略性地选择推理方向，导致陷入冗余的次优路径
- **推理算子（Reasoning Operators）**：定义思维 token 集合 \(O = \{\text{Wait}, \text{So}, \text{Then}, \ldots\}\) 作为推理方向的控制信号，不同算子一致性地触发不同思维模式
- **四阶段搜索框架**：暂停生成（Pause）→ 前瞻模拟（Lookahead）→ 启发式评估（Heuristic）→ 概率选择（Selection）
- **双因子启发式函数**：路径潜力估计器 \(\mathcal{H}_{\text{pot}}\)（通过 KL 散度从教师模型策略蒸馏）+ 进度估计器 \(\mathcal{H}_{\text{prog}}\)（MSE 回归预测推理完成比例）
- **复合评分**：\(S(o) = \mathcal{H}_{\text{pot}}(h_t, o) + \lambda \cdot \mathcal{H}_{\text{prog}}(h'_{t,o})\)，加法组合兼顾正确性与效率
- **极低开销**：仅增加 0.0017% 参数量，仅在约 3% 的 token 位置（步骤分隔符处）激活搜索
- **与现有方法兼容**：可与 AdaptThink 等推理效率方法叠加使用，效果进一步提升

#### 🔬 深入细节
##### 核心框架图

![NCoTS 框架总览](https://ar5iv.labs.arxiv.org/html/2601.11340/assets/x2.png)
*图：NCoTS 框架总览。(a) 路径潜力估计器通过策略蒸馏从教师模型获取高层规划能力；(b) 进度估计器预测推理完成比例；(c) 四阶段搜索流程在每个决策点评估候选算子并选择最优方向。*

![推理动机与路径规划重要性](https://ar5iv.labs.arxiv.org/html/2601.11340/assets/x1.png)
*图：(a) 传统 CoT 的规划瓶颈——模型在关键分叉点缺乏前瞻；(b) 来自强教师模型的稀疏引导 token 仅占总输出约 3%，却带来平均 6.2% 的准确率提升，证实路径规划是核心瓶颈。*

##### 算法伪代码

```python
# NCoTS 核心搜索流程伪代码
def ncots_generate(model, prompt, operators, H_pot, H_prog, λ, τ):
    """
    model:     基础推理模型 (如 DeepSeek-R1-Distill-Qwen-7B)
    operators: 推理算子集合 O = {"Wait", "So", "Then", ...}
    H_pot:     路径潜力估计器 (KL散度策略蒸馏训练)
    H_prog:    进度估计器 (MSE回归训练)
    λ:         进度权重超参数
    τ:         softmax温度参数
    """
    tokens = []
    while not is_finished(tokens):
        next_token = model.generate_next(prompt + tokens)
        tokens.append(next_token)

        if next_token == STEP_DELIMITER:  # 检测到 "\n\n" 步骤分隔符
            # ── Phase 1: Pause Generation ──
            # 暂停标准自回归生成

            # ── Phase 2: Lookahead Simulation ──
            scores = {}
            h_t = model.get_hidden_state(tokens)
            for o in operators:
                # 将算子 o 追加到 KV cache，获取前瞻隐藏状态
                h_prime = model.forward_one_token(tokens + [o])

                # ── Phase 3: Heuristic Evaluation ──
                pot  = H_pot(h_t, o)        # 路径潜力 (正确概率)
                prog = H_prog(h_prime)      # 进度估计 (完成比例)
                scores[o] = pot + λ * prog  # 加法复合评分

            # ── Phase 4: Probabilistic Selection ──
            probs = softmax([scores[o] / τ for o in operators])
            best_op = sample(operators, probs)
            tokens.append(best_op)

    return tokens
```

##### 动机与背景

当前的大推理模型（如 DeepSeek-R1、QwQ）通过链式思维（CoT）在数学、逻辑和编程任务上取得了显著进展。然而，这些模型在生成推理步骤时是**逐步顺序生成的，缺乏对整体推理路径的前瞻规划**。这导致模型经常陷入次优的推理路径，产生大量冗余的反思和重复步骤。

> 💡 关键发现：论文通过实验揭示，来自强教师模型（如 DeepSeek-R1）的稀疏引导 token 仅占总输出的约 3%，却能带来平均 6.2% 的准确率提升。这证明**推理模型的核心瓶颈不在于计算能力，而在于路径规划能力**。

##### 推理解空间的量化表征

论文首先对推理解空间进行了系统的量化分析。通过在每个决策点随机采样不同的推理算子，生成大量不同的推理路径，并绘制"平均长度 vs 平均准确率"的密度热力图：

![推理解空间可视化](https://ar5iv.labs.arxiv.org/html/2601.11340/assets/x3.png)
*图：推理解空间的密度热力图。原始模型输出（Original）左上方区域的存在证实了"更准确且更简洁"的优越路径确实存在。*

这一分析揭示了四个关键洞察：
1. **优越路径存在**：确实存在同时比标准输出更准确、更简洁的推理路径
2. **路径稀疏性**：这些优越路径在解空间中是稀疏的，随机搜索难以高效找到
3. **准确率-长度负相关**：更简洁的路径往往更准确，冗余步骤反而降低性能
4. **搜索的必要性**：需要有引导的搜索策略而非随机探索

##### 核心机制：四阶段搜索框架

NCoTS 的核心思想是在推理过程的每个**决策点**（即步骤分隔符 `\n\n` 出现的位置）进行主动的路径搜索：

**阶段 1：暂停生成（Pause Generation）**

标准生成过程在检测到步骤分隔符时立即暂停。步骤分隔符是推理步骤之间的自然边界（通常为 `\n\n`），代表模型即将选择下一个推理方向的关键时刻。

**阶段 2：前瞻模拟（Lookahead Simulation）**

在决策点，系统枚举所有候选推理算子 \(O = \{o_1, o_2, \ldots, o_K\}\)。每个算子对应一个"思维 token"，如 "Wait"（触发反思）、"So"（推进推导）、"Then"（引入新步骤）等。对每个候选算子 \(o\)，将其追加到当前 KV cache 中执行一步前向传播，获取前瞻隐藏状态：

$$\mathbf{h}'_{t,o} = \mathcal{M}\big([x, y_{<t}, o]\big), \quad \forall o \in O$$

> 💡 关键：论文发现推理算子与后续思维模式之间存在强对应关系——"Wait" 一致性地引导反思步骤，"Then" 触发顺序推进，"Alternatively" 引入替代方案。这种对应关系使得仅通过一步前瞻即可有效预测后续推理方向。

![算子与思维模式的对应关系](https://ar5iv.labs.arxiv.org/html/2601.11340/assets/x4.png)
*图：Sankey 图展示推理算子（思维 token）与后续思维模式的强对应关系。*

**阶段 3：启发式评估（Heuristic Evaluation）**

对每个候选算子，使用**双因子启发式函数**进行评分：

**因子 1：路径潜力估计器 \(\mathcal{H}_{\text{pot}}\)**

评估选择某个算子后最终得到正确答案的概率。实现为一个线性投影层，将当前隐藏状态映射为算子集合上的 logits。训练方式为**策略蒸馏**：以强教师模型（如 DeepSeek-R1）在算子集合上的概率分布 \(P_T\) 为目标，最小化 KL 散度：

$$\mathcal{L}_{\text{pot}} = \mathbb{E}_{h_t \sim \mathcal{D}} \left[ D_{\text{KL}} \Big( P_T(h_t) \;\big\|\; \mathcal{H}_{\text{pot}}(h_t) \Big) \right]$$

这一设计将教师模型的战略规划能力迁移到搜索过程中，充当"正确性指南针"。

**因子 2：进度估计器 \(\mathcal{H}_{\text{prog}}\)**

预测当前推理的完成比例，用于**惩罚冗余路径、奖励高效路径**。实现为一个线性回归头，将隐藏状态映射为标量。对于长度为 \(L\) 的完整推理路径中第 \(k\) 个 token，训练标签为归一化进度 \(l_k = k / L\)，使用均方误差损失：

$$\mathcal{L}_{\text{prog}} = \mathbb{E}_{(h_k, l_k) \sim \mathcal{D}} \left[ \left\| \mathcal{H}_{\text{prog}}(h_k) - l_k \right\|^2 \right]$$

通过最大化估计进度，搜索算法偏好能显著推进推理状态的算子，有效惩罚冗长或循环的步骤。

![进度估计器预测 vs 真实进度](https://ar5iv.labs.arxiv.org/html/2601.11340/assets/x5.png)
*图：进度估计器的预测值与真实进度的对比。指数平滑后的预测轨迹与真实进度高度吻合。*

> ⚠️ 注意：进度估计器采用 token 级别的密集监督训练，不仅在决策点处有效，在推理路径的任意位置都能提供可靠的进度预测。

**复合评分函数**

两个因子通过**加法**组合为复合评分：

$$S(o) = \underbrace{\mathcal{H}_{\text{pot}}(h_t, o)}_{\text{路径潜力}} + \lambda \cdot \underbrace{\mathcal{H}_{\text{prog}}(h'_{t,o})}_{\text{推理进度}}$$

其中 \(\lambda\) 是控制简洁性偏好的超参数。这一设计确保：
- 高潜力（更可能正确）的路径获得高分
- 在潜力相近时，进度更高（更接近完成）的路径被优先选择
- \(\lambda\) 越大，模型越倾向于选择简洁的推理路径

**阶段 4：概率选择（Probabilistic Selection）**

为保持多样性并避免局部最优，将评分转化为概率分布后采样：

$$P_{\text{search}}(o | h_t) = \frac{\exp(S(o) / \tau)}{\sum_{o' \in O} \exp(S(o') / \tau)}$$

最终算子通过 \(o^* \sim P_{\text{search}}\) 采样选出。温度参数 \(\tau\) 控制探索-利用平衡。

##### 效率度量与实验结果

论文提出了效率度量指标 \(\eta\)，同时考虑准确率提升和长度缩减：

$$\eta = \left(\frac{\text{Acc}_{\text{method}}}{\text{Acc}_{\text{base}}}\right)^2 \cdot \frac{\text{Len}_{\text{base}}}{\text{Len}_{\text{method}}}$$

准确率的权重更高（平方项），体现"正确性优先"的设计理念。

**主要实验结果**（基于 DeepSeek-R1-Distill-Qwen 系列）：

| 模型规模 | 平均准确率提升 | 平均长度缩减 | 平均 \(\eta\) |
|---------|-------------|------------|-------------|
| 1.5B    | +4.0%       | -22.3%     | 1.595       |
| 7B      | +3.5%       | -22.6%     | 1.524       |

亮点结果：
- GSM8K (1.5B)：长度缩减超过 **50%**，同时准确率提升 2.4%
- AMC23 (7B)：准确率大幅提升 **7.5%**，长度缩减 12%
- 在所有基准上 \(\eta\) 均为最高，显著优于 Budget Forcing、AdaptThink 等基线

##### 与传统方法的区别

| 特性 | 传统 CoT | Tree of Thoughts (ToT) | NCoTS |
|------|---------|----------------------|-------|
| 搜索粒度 | 无搜索 | 完整推理路径级 | 步骤级（决策点） |
| 计算开销 | 无额外开销 | 多次完整生成 | 仅 0.0017% 参数增加 |
| 是否需要外部评估 | 否 | 需要外部评估器/投票 | 内置轻量启发式头 |
| 训练需求 | 无 | 无（提示工程） | 需蒸馏训练两个小型线性头 |
| 推理效率 | 基线 | 显著增加（多路并行） | 减少约 22% |
| 选择策略 | 贪心解码 | 外部评估排序 | 概率采样（softmax + 温度） |

#### 🧪 练习题
```yaml
question: "NCoTS 的路径潜力估计器（Path Potential Estimator）的训练目标是什么？"
options:
  - "最小化预测进度与真实进度之间的均方误差"
  - "最小化学生模型与教师模型在算子分布上的 KL 散度"
  - "最大化推理路径最终得到正确答案的奖励信号"
  - "最小化新旧策略概率比的裁剪目标函数"
answer: 1
explain: "路径潜力估计器通过策略蒸馏训练，以强教师模型在推理算子集合上的概率分布为目标，最小化 KL 散度将教师的战略规划能力迁移到搜索过程中。"
```

### Long-CoT

```yaml
id: long_cot
num: 20
name: Long-CoT
full_name: 长思维链缩放 (Long-CoT Scaling)
year: '2026.01'
org: NeurIPS
parent: cot
paper_url: https://proceedings.neurips.cc/paper_files/paper/2025/hash/f3b336ac87912786ef2d72238058cb4f-Abstract-Conference.html
project_url: ''
category: frontier_2026
motivation: 长推理链在复杂任务中指数级增益
```

#### 📝 一句话总结
Long-CoT 证明并实证展示：在图连通性这类必须逐步传播信息的推理任务上，把测试时计算预算用于一条更长的思维链，可能比生成大量短思维链再投票具有指数级优势。

#### 🎯 核心要点
- 将测试时计算明确区分为并行缩放和顺序缩放：前者生成多条短回答并用 best-of-n 或 majority vote 聚合，后者让模型在单条 CoT 中持续推进多步推理。
- 构造 \((s,t_1,t_2)\)-connectivity 图连通性任务：给定边列表和三个节点，保证 \(s\) 只与 \(t_1,t_2\) 中一个相连，模型必须找出可达目标。
- 给出基于 transformer 表达能力的理论分离：多项式长度 CoT 可以实现 BFS 等多项式时间算法，而多项式数量的 \(O(1)\) 长度 CoT 在复杂性假设下仍无法解决连通性。
- 提出 Vertex Query Model (VQM/RVQM) 抽象：把 CoT 每一步视为一次局部邻域查询，用 two-path 和 bridge graph 得到更细粒度的顺序与并行差距。
- 在 bridge graph 中证明并行缩放需要 \(\exp(\Omega(d))\) 条独立短链才能把成功率提升到常数水平，而一条足够长的顺序链可以沿图结构逐层推进。
- 实验覆盖从头训练的小型 transformer、DeepSeek-R1-Distill-Qwen-32B 以及 AIME2024 等设置，趋势一致支持长 CoT 在串行依赖任务上的价值。

#### 🔬 深入细节
![Long-CoT 并行与顺序缩放对比](https://github.com/seyedparsa/let-me-think/raw/main/figures/figure1.png)
*图：论文和官方代码仓库给出的 Figure 1。横轴是单条 CoT 的顺序长度预算，纵轴是独立 CoT 数量，可以看到减少少量顺序预算往往需要大幅增加并行样本数才能补偿。*

```python
# Long-CoT 顺序缩放与并行缩放的核心流程抽象
def solve_connectivity_with_test_time_scaling(graph, s, t1, t2, mode, seq_budget, parallel_budget):
    targets = {t1, t2}

    def one_long_cot():
        frontier = [s]
        visited = {s}
        trace = []
        while frontier and len(trace) < seq_budget:
            v = frontier.pop()
            trace.append(v)
            if v in targets:
                return v, trace
            for u in graph.neighbors(v):
                if u not in visited:
                    visited.add(u)
                    frontier.append(u)
        return guess(t1, t2), trace

    def one_short_cot():
        trace = local_or_random_walk(graph, start=s, max_steps=seq_budget)
        answer = extract_target_if_seen(trace, targets) or guess(t1, t2)
        return answer, trace

    if mode == "sequential":
        return one_long_cot()

    votes = []
    for _ in range(parallel_budget):
        answer, trace = one_short_cot()
        if verifies_path(trace, s, answer, graph):
            return answer, trace      # best-of-n: 找到可验证证据就采用
        votes.append(answer)
    return majority_vote(votes), None # majority: 短链没有足够证据时只能靠统计聚合
```

这篇论文的核心不是提出一个新的提示模板，而是给 Long-CoT 一个可分析的计算视角。作者把测试时计算分成两类：并行缩放用 \(N\) 条互不通信的短推理链提高覆盖率，顺序缩放用一条更长的 CoT 把中间状态不断传递下去。对于每一步都依赖前一步发现的任务，这两类预算并不等价，因为短链之间不能共享已经探索到的节点、分支判断或局部证据。

论文选择图连通性作为最小但足够有代表性的串行推理任务。标准 \((s,t)\)-connectivity 在不可达时缺少短证书，因此作者改用 \((s,t_1,t_2)\)-connectivity：保证 \(s\) 恰好和两个候选目标中的一个连通。这样正确答案总能由一条路径证明，CoT 可以自然写成从 \(s\) 出发的节点序列或 DFS 轨迹。输入边被随机排序，节点 ID 也被随机置换，模型不能依靠表面位置捷径，只能逐步恢复图结构。

理论部分先给出极端情形的分离。在 \(TC^0 \not\supseteq L\) 的复杂性假设下，常数长度 CoT 的 bounded-depth transformer 落在低阶电路类中；即便并行采样多项式条，再做 majority vote，本质上仍不足以解决连通性。相反，多项式长度 CoT 可以模拟多项式时间算法，例如 BFS，因此存在常数 \(c>0\)，长度不超过 \(n^c\) 的一条 CoT 可以解决任意规模为 \(n\) 的连通性实例。

为了更贴近真实 CoT 长度预算，作者又提出 Vertex Query Model。VQM 把一次 CoT 推理抽象成一次邻域查询 \(N_G(v)=\{u:\exists(v,u)\in E\}\)，即模型在当前已知节点附近继续探索。two-path 图说明如果路径长为 \(L\)，少于 \((L-2)/2\) 次查询的算法正确率只能是 \(1/2\)，而 \(L-1\) 次查询足以确定答案。bridge graph 更强：每层交叉点都要求做连续分支选择，短链每次都重新开始，优势会随深度指数衰减。

论文中的关键结论可以概括为：

$$
\Pr[\text{parallel succeeds}]
\le \frac{1}{2} + \exp\left(-\Omega(d)\right),
\quad
N_{\text{parallel}} \ge \exp(\Omega(d))
$$

这里 \(d\) 是 bridge graph 深度。直觉上，一条长链可以把每层选择的结果保留下来，并在下一层继续使用；多条短链虽然总 token 数可能相近，但每条链都独立丢失了前面未完成的探索状态，所以很难补偿串行依赖。

实验流程也服务于这个观点。作者训练模型生成 Shortest-Path、Path CoT 和 DFS CoT，并分别用 decision criterion 与 evidence criterion 评估答案和路径证据；并行聚合则使用 majority decision 或 best-of-n。结果显示，只要问题确实需要跨越多层图结构，增加单条 CoT 的长度会出现明显阈值效应，而增加短链数量只能缓慢改善，甚至在低顺序预算区间几乎无效。

> 💡 关键：Long-CoT 的结论不等于“所有任务都应该无限拉长 CoT”。它说明的是，当任务包含不可压缩的串行依赖时，顺序计算和并行采样不是简单可替代关系，提示工程和推理系统应优先保证一条链有足够预算走完整个依赖路径。

#### 🧪 练习题
```yaml
question: "Long-CoT 论文中，为什么 bridge graph 会放大长 CoT 相对多条短 CoT 的优势？"
options:
  - "因为 bridge graph 的节点标签按答案顺序排列，长 CoT 更容易记忆标签"
  - "因为每个交叉点的选择依赖前面已经走到的位置，短 CoT 无法继承连续探索状态"
  - "因为 majority vote 会强制所有短 CoT 输出相同路径"
  - "因为长 CoT 在训练时使用了更多模型参数"
answer: 1
explain: "bridge graph 的难点是连续局部分支选择。长 CoT 能把前面探索到的状态传递到下一步，而互相独立的短链需要反复重新探索，因此并行数量要指数级增长。"
```

### GRACE

```yaml
id: grace
num: 21
name: GRACE
full_name: 门控精炼压缩 (GRACE)
year: '2026.01'
org: NeurIPS
parent: opro
paper_url: https://proceedings.neurips.cc/paper_files/paper/2025/hash/7f9a44cb707ede42a659ad85d940dd55-Abstract-Conference.html
project_url: ''
category: frontier_2026
motivation: 门控机制精炼指令压缩冗余信息
```

#### 📝 一句话总结
GRACE 提出 Gated Refinement 与 Adaptive Compression 两个互补机制，通过有控制地丢弃有害或冗余信息，解决自动提示优化中更新不稳定、候选搜索低效和局部最优停滞的问题。

#### 🎯 核心要点
- 面向黑盒 LLM 的自动提示优化，不依赖目标模型梯度或内部状态，只通过训练集、验证集和优化器 LLM 迭代改写自然语言 prompt。
- Feedback Regulation Gate 同时采样成功样本和失败样本，让失败反馈提供改进方向，让成功样本约束更新幅度，避免过度纠偏和语义漂移。
- Update Rejection Gate 在验证集上比较当前 prompt 与候选 prompt，只接受带来验证性能提升的更新，把有害更新直接阻断。
- Adaptive Compression 在连续 \(K\) 次候选被拒后触发，将当前 prompt 中冗长、重复、过度具体的规则压缩成更抽象的任务关键概念。
- 以“信息损失”换取泛化：门控丢弃噪声更新，压缩丢弃局部最优中积累的实例特化细节，形成局部精炼和全局重构的循环。
- 在 11 个任务、3 类领域上评测，覆盖 BBH、医学领域任务和通用 NLP 任务；相对已有自动提示优化方法分别取得 4.7%、4.4%、2.7% 的平均相对提升，并用约 25% 的 prompt 生成预算达到更好结果。

#### 🔬 深入细节
![GRACE 方法框架](https://github.com/Eric8932/GRACE/raw/main/images/method.png)
*图：官方代码仓库中的方法图。左侧是传统扩展与选择范式，右侧是 GRACE 的反馈调节门、更新拒绝门和自适应压缩循环。*

```python
# GRACE 论文 Algorithm 1 的简化伪代码
def grace(P0, D_train, D_val, optimizer_llm, evaluator, T, K):
    P = P0
    best_P = P0
    reject_counter = 0

    for t in range(T):
        # Gated Refinement: 用成功样本调节失败反馈
        successes, failures = partition_by_score(D_train, prompt=P, evaluator=evaluator)
        batch = sample(successes) + sample(failures)
        P_candidate = optimizer_llm.generate(
            current_prompt=P,
            update_batch=batch,
            meta_prompt="fix failures while preserving successful patterns",
        )

        # Update Rejection Gate: 只接受验证集更优的候选
        if score(P_candidate, D_val, evaluator) > score(P, D_val, evaluator):
            P = P_candidate
            reject_counter = 0
        else:
            reject_counter += 1

        # Adaptive Compression: 连续停滞时压缩并抽象 prompt
        if reject_counter == K:
            P = optimizer_llm.generate(
                current_prompt=P,
                meta_prompt="remove redundancy and abstract case-specific rules",
            )
            reject_counter = 0

        if score(P, D_val, evaluator) > score(best_P, D_val, evaluator):
            best_P = P

    return best_P
```

GRACE 继承了 OPRO/APO/PromptAgent 这类“用 LLM 优化 prompt”的黑盒设置：给定初始 prompt \(P_0\)、训练样本、验证样本、目标模型 \(B\) 和优化器模型 \(O\)，目标是在离散自然语言空间中找到让目标任务得分最高的 prompt。论文将目标写成：

$$
P^*=\arg\max_{P\in S} f_B(P,D)
=\arg\max_{P\in S}\sum_{(a_i,q_i)\in D} f(p_B(a_i\mid P,q_i)).
$$

传统反思式 APO 往往只看失败样本，把错误分析当作“文本梯度”。这个信号很强，但也容易偏：如果某一批失败样本包含偶然模式，优化器会把 prompt 改得过于具体，导致原本能做对的样本被破坏。GRACE 的反馈调节门把训练集按当前 prompt 的表现分成成功集 \(S_t\) 与失败集 \(F_t\)，再构造更新批次 \(B_t=S'_t\cup F'_t\)，候选更新为：

$$
P_t^c \sim p_O(P\mid P_t,B_t,m_1).
$$

这里 \(m_1\) 明确要求优化器“修复失败，同时保留成功模式”。这相当于给文本梯度加入一个正则项：失败样本提供方向，成功样本限制步长和语义边界。论文的直觉是，真正有用的更新不应只解释错误，还必须不破坏已经有效的任务理解。

第二道门是更新拒绝门。即使候选 prompt 由平衡样本生成，它仍可能包含冗余、冲突或过度具体的规则。因此 GRACE 不直接采用候选，而是在验证集上做二选一：

$$
P_{t+1}=\arg\max_{P\in\{P_t,P_t^c\}} f_B(P,D_{val}).
$$

如果候选没有提升，更新被拒绝，信息流被阻断。这个设计牺牲了部分探索速度，但显著降低了 prompt 行为突变的风险，也解释了为什么 GRACE 每轮只生成一个候选仍能比大量候选搜索更高效。

自适应压缩处理另一个常见问题：prompt 优化前几轮能快速提升，随后大量规则堆积，新增内容从通用原则变成实例特化补丁，优化进入局部最优。GRACE 在连续 \(K\) 次拒绝后触发压缩：

$$
P_{t+1}\sim p_O(P\mid P_t,m_2),
\quad
\sum_{j=t-K+1}^{t} \mathbf{1}[P_j=P_{j-1}]=K.
$$

\(m_2\) 要求优化器合并或删除重复元素，并把具体条件、记忆化措辞和窄规则抽象为更一般的任务指导。这与信息瓶颈思想一致：保留任务相关信息，压缩无关或有害细节。压缩后的 prompt 不只是变短，而是重置了后续 gated refinement 的起点，使优化可以从另一个更泛化的局部区域继续前进。

> 💡 关键：GRACE 的“loss”不是性能损失，而是主动的信息损失。反馈调节、更新拒绝和压缩都在丢弃信息，但丢弃的是不稳定更新、验证集无效更新和局部最优中积累的冗余细节。

#### 🧪 练习题
```yaml
question: "GRACE 中 Adaptive Compression 主要在什么情况下触发？"
options:
  - "每次候选 prompt 在训练集上得分提升时"
  - "当连续 K 次候选更新被拒绝，说明优化可能停滞时"
  - "当优化器 LLM 的上下文窗口不足以放入训练集时"
  - "当 prompt 长度短于初始 prompt 时"
answer: 1
explain: "GRACE 使用 rejection counter 检测停滞。连续 K 次没有验证集提升时，压缩当前 prompt 以去除冗余和过度具体内容，从而逃离局部最优。"
```

### UniAPO

```yaml
id: uniapo
num: 22
name: UniAPO
full_name: 统一多模态提示优化 (UniAPO)
year: '2026.02'
org: AAAI
parent: opro
paper_url: https://ojs.aaai.org/index.php/AAAI/article/view/40151
project_url: ''
category: frontier_2026
motivation: 首个多模态自动提示优化方法
```

#### 📝 一句话总结
UniAPO 提出首个统一的多模态自动提示优化框架，用 EM 式 E/M 两步解耦反馈建模与 prompt 精炼，并通过短长期记忆缓解视觉 token 膨胀和过程级监督不足。

#### 🎯 核心要点
- 将自动提示优化从文本扩展到文本、图像、视频统一场景，目标是在同一框架下优化 MLLM 的任务 prompt。
- 使用多角色冻结 MLLM 系统：任务模型 \(L_T\)、反馈模型 \(L_F\)、prompt 优化模型 \(L_P\) 和演化模型 \(L_E\)。
- 采用 EM-inspired 优化：E-step 生成并更新反馈记忆，M-step 利用反馈和 prompt 记忆生成新 prompt。
- Feedback Memory \(M_F^t\) 保存历史反馈，解决多模态错误样本太长、无法全部塞入上下文的问题。
- Prompt Memory \(M_P^t\) 保存历史 prompt 及验证分数，提供过程级监督，避免只依赖当前错误反馈造成不稳定更新。
- E-step 结合当前错误集的短期反馈、从历史中检索的长期反馈、演化融合和过滤机制，获得有效反馈 \(F_{t+1}\)。
- M-step 结合当前反馈生成短期 prompt，再用 top-k 历史高分 prompt 作为长期过程指导，通过演化融合和 beam search 延长优化视野。
- 在文本分类/生成、图像分类、视频分类和视频关键词抽取上评测，UniAPO 在 GPT-4o 与 QwenVL2.5-72B 设置下均相对 Vanilla、CoT、EvoPrompt、ERM 等基线取得稳定提升。

#### 🔬 深入细节
![UniAPO 动机与 EM 式优化框架](https://www.catalyzex.com/_next/image?q=75&url=https%3A%2F%2Ffigures.semanticscholar.org%2F13c6c22e41bf029ecd5e3a4d9f2ac27afe1c0392%2F2-Figure1-1.png&w=640)
*图：UniAPO 论文 Figure 1 的公开图像版本。左侧显示朴素多模态 APO 的视觉 token 膨胀和监督不清，右侧展示 E-step/M-step、反馈记忆与 prompt 记忆的闭环。*

```python
# UniAPO 的 EM-inspired 多模态 prompt 优化伪代码
def uniapo(simple_prompt, D_train, D_dev, LT, LF, LP, LE, T, beam_size, top_k):
    P0 = LP.refine_initial_prompt(simple_prompt)
    feedback_memory = []
    prompt_memory = [(P0, evaluate(LT, P0, D_dev))]
    beams = [P0]

    for t in range(T):
        new_prompts = []
        for P_t in beams:
            # E-step: 反馈建模，缓解视觉 token 膨胀
            errors = collect_errors(LT, P_t, D_train)
            clusters = dbscan_cluster(errors, encoder="BGE-m3")
            F_short = LF.generate_feedback(P_t, clusters)
            F_long = retrieve_relevant_feedback(F_short, feedback_memory)
            F_candidate = LE.merge_feedback(F_short, F_long)
            F_t1 = filter_feedback(F_candidate, errors, P_t, LT)
            feedback_memory.append(F_t1)

            # M-step: prompt 精炼，引入 outcome-level 与 process-level 双监督
            positives = sample_successes(D_train, errors)
            P_short = LP.optimize_prompt(P_t, F_t1, positives)
            P_long = top_k_prompts(prompt_memory, k=top_k)
            P_next = LE.evolve_prompt(P_short, P_long)
            score = evaluate(LT, P_next, D_dev)
            prompt_memory.append((P_next, score))
            new_prompts.append((P_next, score))

        beams = [p for p, _ in top_b(prompt_memory, b=beam_size)]

    return best_prompt(prompt_memory)
```

UniAPO 的出发点是：文本 APO 的“错误样本 -> 反馈 -> 改写 prompt”闭环，直接搬到多模态任务会同时遇到两个问题。第一是视觉 token 膨胀，一张高分辨率图像或一段短视频就可能消耗大量上下文，导致反馈模型无法同时读取足够多的当前错误和历史错误。第二是过程级监督不足，传统 APO 主要用当前输出对错作为 outcome-level 信号，很少利用“哪些历史 prompt 曾经有效、优化路径为何有效”这类过程信息。

论文把这两个纠缠的问题拆成 EM-inspired 的两步。E-step 负责在当前 prompt 下估计更可靠的反馈变量，M-step 负责在反馈和历史 prompt 指导下更新 prompt。整体写作：

$$
(F_{t+1},M_F^{t+1})
=\mathrm{E\mbox{-}Step}(D_{error}^t,M_F^t;L_F,L_E),
$$

$$
(P_{t+1},M_P^{t+1})
=\mathrm{M\mbox{-}Step}(F_{t+1},M_P^t,P_t;L_P,L_E).
$$

这里的 EM 不是严格概率模型求解，而是一个工程化分解：先让反馈变得更充分、更干净，再让 prompt 更新受到当前反馈和历史成功轨迹的双重约束。

E-step 的关键是短长期反馈记忆。短期反馈来自当前错误集 \(D_{error}^t\)，但当前错误本身也可能太长，所以 UniAPO 先用 BGE-m3 表征和 DBSCAN 聚类，把相似失败归为簇，再分块生成聚类级反馈：

$$
F_{short}^{t+1}=L_F(P_t,\mathrm{Clustering}(D_{error}^t)).
$$

长期反馈不直接把整个 \(M_F^t\) 全塞进上下文，而是用 \(F_{short}^{t+1}\) 作为查询，从反馈记忆中检索语义相关的历史记录：

$$
F_{long}^{t+1}=\mathrm{Retrieval}(F_{short}^{t+1},M_F^t).
$$

随后演化模型 \(L_E\) 融合短期和长期反馈，过滤器只保留确实能修复当前错误的建议，得到最终 \(F_{t+1}\)。这种设计把“长历史”压缩成与当前失败相关的可操作反馈，避免多模态上下文被原始图像/视频错误样本淹没。

M-step 则把监督信号分成 outcome-level 和 process-level。outcome-level 来自刚生成的 \(F_{t+1}\)，由 \(L_P\) 改写当前 prompt，生成短期候选：

$$
P_{short}^{t+1}=L_P(P_t,F_{t+1},\mathrm{Sample}(D_{train}-D_{error}^t)).
$$

这里加入成功样本是为了防止只围绕当前失败过拟合。process-level 来自 prompt memory：UniAPO 选取历史上在开发集表现最好的 top-k prompt，形成长期提示指导 \(P_{long}^{t+1}=\mathrm{TopK}(M_P^t,k)\)。最后 \(L_E\) 像演化交叉一样融合短期候选与长期优秀策略，得到 \(P_{t+1}\)，并把它连同开发集分数加入 \(M_P\)。

与 OPRO/APO 这类文本优化器相比，UniAPO 的主要增量在于“记忆不是简单历史拼接”。反馈记忆解决的是多模态 token 过长导致的反馈不足，prompt 记忆解决的是只看当前结果导致的过程监督缺失。二者配合后，系统既能对最近错误快速响应，又能被历史高质量 prompt 拉回稳定方向，适合视频关键词抽取、图像分类、文本生成等异构任务。

> 💡 关键：UniAPO 的统一性来自角色和流程统一，而不是把所有模态压成相同输入。不同模态仍由 MLLM 处理，优化层只维护反馈、prompt、验证分数和检索/演化机制。

#### 🧪 练习题
```yaml
question: "UniAPO 中 Prompt Memory 的主要作用是什么？"
options:
  - "缓存所有原始图片和视频 token，避免重新编码"
  - "保存历史高分 prompt，为 M-step 提供过程级监督和长期优化方向"
  - "替代任务模型 LT 直接输出最终答案"
  - "把多模态输入转换成纯文本数据集"
answer: 1
explain: "Prompt Memory 记录历史 prompt 及其开发集分数，M-step 通过 Top-K 选出高质量历史 prompt，作为过程级监督来稳定和引导当前 prompt 更新。"
```

### PromptMix

```yaml
id: promptmix
num: 23
name: PromptMix
full_name: 提示混合增强 (PromptMix)
year: '2026.03'
org: Information Fusion
parent: —
paper_url: https://www.sciencedirect.com/science/article/pii/S1566253526000655
project_url: ''
category: frontier_2026
motivation: 语义提示与多模态混合增强泛化能力
```

#### 📝 一句话总结
PromptMix 提出一种由 LLM 辅助的视觉语言模型提示学习框架，通过语义提示进化、模态无关共享表示和跨注意力适配器，缓解小样本工业识别中的过拟合、提示表达不足和跨模态对齐不稳问题。

#### 🎯 核心要点
- 面向真实工程视觉识别：重点处理标注稀缺、缺陷形态细微、类间差异容易混淆的低数据场景
- LLM 语义增强：为类别生成细粒度自然语言描述，并经冻结文本编码器得到局部语义 \(T_{local}\) 与全局语义 \(T_{global}\)
- MASR：构建 Modality-Agnostic Shared Representation，减少预训练数据与目标工业数据之间的分布差异
- LAPE：利用 LLM-Aided Prompt Evolution 将外部语义融入可学习上下文提示，迭代改进提示表达
- CAA：通过 Cross-Attentive Adapter 对文本与图像分支进行跨模态融合，提升低样本条件下的鲁棒性
- 多损失训练：联合分类损失、提示进化/对齐相关损失与教师分布蒸馏，使 student 预测接近更稳定的 teacher 分布
- 实验覆盖七个数据集：包含六个公开工业基准和一个自建工业数据集，验证 base-to-novel 与 few-shot 泛化

#### 🔬 深入细节
![PromptMix 框架图](https://ars.els-cdn.com/content/image/1-s2.0-S1566253526000655-gr1_lrg.jpg)
*图：PromptMix 的整体流程。LLM 生成类别描述，MASR 产生共享表示，LAPE 进化文本提示，CAA 对图像与文本分支做跨注意力适配。*

```python
# PromptMix 训练流程伪代码
def train_promptmix(vlm, class_names, train_loader, llm, teacher):
    freeze(vlm.text_encoder, vlm.image_encoder)
    prompts = init_learnable_context(class_names)          # X_prompt + class token
    adapters = init_cross_attentive_adapters()
    masr = init_modality_agnostic_shared_representation()

    llm_prompts = {
        c: llm.generate_description(c, domain="industrial recognition")
        for c in class_names
    }
    llm_tokens = tokenize(llm_prompts)
    t_local, t_global = vlm.text_encoder(llm_tokens).token_features_and_mean()

    for images, labels in train_loader:
        r_text, r_vision = masr(prompts, images)
        evolved_prompt = LAPE(
            base_prompt=prompts,
            llm_local=t_local,
            llm_global=t_global,
            shared_text=r_text,
        )

        text_feat = vlm.text_encoder(evolved_prompt)
        image_feat = vlm.image_encoder(images, visual_prompt=r_vision)
        fused_text, fused_image = adapters.cross_attend(text_feat, image_feat)

        student_logits = cosine_classifier(fused_image, fused_text)
        with no_grad():
            teacher_logits = teacher(images, class_names)

        loss = (
            ce_loss(student_logits, labels)
            + lambda_pil * prompt_image_language_loss(fused_image, fused_text)
            + lambda_prl * prompt_refinement_loss(evolved_prompt, t_global)
            + lambda_kd * kl_divergence(student_logits, teacher_logits)
        )
        update(prompts, adapters, masr, loss)

    return prompts, adapters, masr
```

PromptMix 的直接动机是 CLIP 类视觉语言模型在低样本工业场景中容易出现两类失败：一是可学习 prompt 只由少量样本驱动，容易记住训练域的表面纹理；二是类别名或模板句过短，无法表达“焊缝细黑沟槽”“轻微划痕”这类细粒度语义。论文因此不把 LLM 只当作离线文字扩写器，而是把 LLM 描述、可学习 prompt、图像特征放入同一个可训练融合流程中。

在语义侧，LLM 根据类别和任务上下文生成更具判别性的描述 \(T_{LLM}\)，再通过冻结的文本编码器得到 token 级局部语义 \(T_{local}\) 与平均池化后的全局语义 \(T_{global}\)。局部语义适合描述部件、形状、颜色和缺陷模式，全局语义提供类别级概念锚点；这比直接使用 “a photo of a class” 更能覆盖工业图像中的细微差异。

MASR 的作用是建立模态无关共享表示。图中可以看到 MASR 同时向文本 prompt 编码器与图像 prompt 编码器提供 \(R_t\) 与 \(R_v\)，直觉上是在可学习 prompt 前先构造一个跨模态共享的潜在空间。这样做的意义是降低 CLIP 预训练分布与目标工业数据分布之间的落差，避免文本分支只学到自然图像语义、视觉分支只响应目标域噪声。

LAPE 是 PromptMix 的提示进化核心。它不是简单把 LLM 输出拼接到模板里，而是让 Prompt Evolution 模块在 \(T_{local}\)、\(T_{global}\)、当前 prompt 表示之间进行迭代更新，并用提示相关损失约束更新方向。可以把整体目标概括为：

$$
\mathcal{L} =
\mathcal{L}_{CE}
+ \lambda_{PIL}\mathcal{L}_{PIL}
+ \lambda_{PRL}\mathcal{L}_{PRL}
+ \lambda_{KD}\mathcal{L}_{KD}.
$$

其中 \(\mathcal{L}_{CE}\) 负责监督分类，\(\mathcal{L}_{PIL}\) 与 \(\mathcal{L}_{PRL}\) 约束图文提示交互和提示进化质量，\(\mathcal{L}_{KD}\) 让 student 的预测分布向 teacher 分布靠近。这个组合目标的核心不是追求更复杂的分类头，而是让提示、图像和文本三类信号在低样本下保持一致。

CAA 负责最后的跨模态适配。图中 Text Adapter 与 Image Adapter 接收文本信号、图像信号和多模态信号，通过交互后输出 \(T_{TA}\) 与 \(V_{IA}\)，再计算 student 预测 \(P_{student}\)。相比只调文本 prompt 的 CoOp 式方法，PromptMix 同时让视觉侧与文本侧参与适配；相比只做特征 adapter 的方法，它又保留了 LLM 语义对类别边界的指导。

推理时，训练好的 prompt、MASR 和 adapter 被固定，输入图像经图像编码器与图像适配器得到视觉特征，类别侧使用进化后的文本提示得到文本原型，再以图文相似度完成分类。因此 PromptMix 的优势主要体现在需要从少量标注中泛化到新类别或新工业场景时：LLM 语义提供更宽的概念覆盖，MASR 降低域偏移，CAA 让两种模态在任务相关维度上重新对齐。

#### 🧪 练习题
```yaml
question: "PromptMix 中 LAPE 的主要作用是什么？"
options:
  - "利用 LLM 语义迭代增强和细化可学习文本提示"
  - "把所有图像转换为纯文本描述后再分类"
  - "替代 CLIP 的文本编码器和图像编码器"
  - "只用 BM25 检索类别相关文档"
answer: 0
explain: "LAPE 即 LLM-Aided Prompt Evolution，核心是把 LLM 生成的局部/全局语义注入可学习 prompt，并约束提示进化过程。"
```

### VCP

```yaml
id: vcp
num: 24
name: VCP
full_name: 视觉条件提示 (Visual Conditional Prompts)
year: '2026.04'
org: Expert Systems
parent: promptmix
paper_url: https://www.sciencedirect.com/science/article/pii/S0957417426009905
project_url: ''
category: frontier_2026
motivation: 视觉引导条件提示实现图文深度对齐
```

#### 📝 一句话总结
VCP 通过视觉特征生成实例相关的条件提示，并与语义条件提示和上下文提示融合，使视觉语言模型在未见类别上获得更细粒度的图文对齐。

#### 🎯 核心要点
- 公开 arXiv 版本对应 MuGCP：多模态互指导条件提示学习
- 使用多模态大模型生成 Semantic Conditional Prompts，补充类别语义
- Attention Mutual-Guidance 模块从视觉特征中生成 Visual Conditional Prompts
- Multi-Prompt Fusion 同时融合语义提示、视觉提示和可学习上下文提示
- 文本增强与一致性损失提升未见类别和跨域泛化
- 重点解决固定 prompt 无法适配每张图像实例的问题

#### 🔬 深入细节
![MuGCP / VCP 框架图](https://arxiv.org/html/2507.08410v1/extracted/6614324/OverView5.png)
*图源：arXiv HTML framework figure，展示 SCP、VCP、AMG 与 MPF 的整体流程。*

```python
# VCP / MuGCP 条件提示学习伪代码
def vcp_forward(image, class_names, clip_model, mllm, amg, mpf):
    visual_tokens = clip_model.encode_image_tokens(image)
    semantic_prompts = mllm.generate_semantic_conditional_prompts(class_names)

    visual_prompts = amg(
        visual_tokens=visual_tokens,
        semantic_prompts=semantic_prompts,
    )
    fused_prompts = mpf.combine(
        context_prompts=learnable_context_tokens(),
        semantic_prompts=semantic_prompts,
        visual_prompts=visual_prompts,
    )

    image_feature = clip_model.encode_image(image, prompts=visual_prompts)
    text_features = clip_model.encode_text(class_names, prompts=fused_prompts)
    logits = similarity(image_feature, text_features)
    return logits
```

传统 prompt learning 常用一组全局可学习上下文 token，同一类别或同一任务共享同一 prompt。这种方式对训练类有效，但对未见类别和分布偏移不够灵活。VCP 的核心是让 prompt 条件化于当前图像实例：不同图像可以触发不同视觉提示，从而捕捉姿态、局部区域、背景和细粒度属性差异。

SCP 和 VCP 分别提供两种条件信息。SCP 来自多模态大模型或语言知识，强调类别语义、属性和常识；VCP 来自视觉编码器内部特征，强调当前图像中实际出现的视觉证据。二者互补：语义提示告诉模型应该看什么，视觉提示告诉模型这张图像实际支持什么。

AMG 模块负责互指导。它不是单向地把文本加到图像或把图像加到文本，而是在跨层、跨模态特征之间建立注意力交互，使语义提示和视觉提示共同调整。这样可以减少文本描述与图像区域错配的问题。

MPF 将可学习上下文提示、语义条件提示和视觉条件提示融合后送入 CLIP 类编码器。训练中再配合文本增强和一致性损失，约束不同增强视角下预测稳定。相比 PromptMix 偏重语义属性混合，VCP 更强调实例级视觉条件化，因此对细粒度分类和跨域泛化更有意义。

#### 🧪 练习题
```yaml
question: "VCP 相比固定上下文 prompt 的核心优势是什么？"
options:
  - "可以根据当前图像实例生成视觉条件提示"
  - "完全不需要图像编码器"
  - "只依赖类别名称，不使用视觉特征"
  - "把所有类别合并成一个标签"
answer: 0
explain: "VCP 利用图像特征产生实例相关提示，使图文对齐能随输入图像动态变化。"
```
