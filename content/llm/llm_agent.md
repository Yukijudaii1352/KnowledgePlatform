---
domain: llm
topic_id: llm_agent
topic_name: LLM Agent
page_icon: 🤖
page_title: LLM Agent
page_subtitle: '{build_date} 版'
page_desc: 大语言模型智能体研究从工具调用、自主规划到多智能体协作的技术演进与前沿突破
hero_pills:
- 工具使用
- 规划推理
- 多智能体
- Agent基准
- 2026前沿
count_pill: '{count} 个算法'
categories:
  tool_use:
    label: 工具使用
    color: '#10B981'
  planning:
    label: 规划与推理
    color: '#3B82F6'
  multi_agent:
    label: 多智能体协作
    color: '#8B5CF6'
  benchmark:
    label: Agent基准
    color: '#F59E0B'
  frontier_2026:
    label: 2026前沿
    color: '#EF4444'
publish: false
---

## 领域综述

!INCLUDE_RAW ../../temp/content_survey_bulk_20260614_174337/researcher_output/llm/llm_agent/overview/zhihu__Agentic_RL_全景图：当大语言模型从_聊天机器_进化为_自主智能体__35e31ee8/article.md

## 最新进展综述

!INCLUDE_RAW ../../temp/content_survey_bulk_20260614_174337/researcher_output/llm/llm_agent/latest/zhihu__Agentic_LLM_全景图__221b9b89/article.md

## 算法演化关系

```yaml
nodes:
- id: toolformer
  x: 200
  y: 50
  category: tool_use
- id: art
  x: 250
  y: 20
  category: tool_use
- id: hugginggpt
  x: 250
  y: 80
  category: tool_use
- id: api_bank
  x: 200
  y: 110
  category: tool_use
- id: gorilla
  x: 300
  y: 50
  category: tool_use
- id: toolllm
  x: 350
  y: 50
  category: tool_use
- id: llm_compiler
  x: 400
  y: 20
  category: tool_use
- id: toolace
  x: 450
  y: 80
  category: tool_use
- id: cot
  x: 100
  y: 200
  category: planning
- id: self_consistency
  x: 150
  y: 170
  category: planning
- id: react
  x: 150
  y: 230
  category: planning
- id: plan_and_solve
  x: 200
  y: 170
  category: planning
- id: tot
  x: 200
  y: 200
  category: planning
- id: reflexion
  x: 250
  y: 230
  category: planning
- id: lats
  x: 300
  y: 200
  category: planning
- id: retroformer
  x: 350
  y: 230
  category: planning
- id: camel
  x: 200
  y: 320
  category: multi_agent
- id: babyagi
  x: 200
  y: 380
  category: multi_agent
- id: chatdev
  x: 250
  y: 320
  category: multi_agent
- id: autogen
  x: 300
  y: 350
  category: multi_agent
- id: metagpt
  x: 350
  y: 320
  category: multi_agent
- id: agentverse
  x: 350
  y: 380
  category: multi_agent
- id: openagents
  x: 400
  y: 350
  category: multi_agent
- id: api_bank_bench
  x: 200
  y: 450
  category: benchmark
- id: agentbench
  x: 300
  y: 450
  category: benchmark
- id: webarena
  x: 350
  y: 420
  category: benchmark
- id: gaia
  x: 350
  y: 450
  category: benchmark
- id: swe_bench
  x: 350
  y: 480
  category: benchmark
- id: hi_cot
  x: 500
  y: 170
  category: frontier_2026
- id: gaia2
  x: 500
  y: 450
  category: frontier_2026
- id: agentic_reasoning
  x: 500
  y: 230
  category: frontier_2026
- id: embocoach_bench
  x: 500
  y: 480
  category: frontier_2026
- id: causal_cot
  x: 500
  y: 200
  category: frontier_2026
- id: reasonflux_prm
  x: 500
  y: 260
  category: frontier_2026
- id: solagent
  x: 500
  y: 320
  category: frontier_2026
edges:
- from: toolformer
  to: art
  label: 自动化示例
- from: toolformer
  to: hugginggpt
  label: 专家模型调度
- from: toolformer
  to: gorilla
  label: 检索增强微调
- from: gorilla
  to: toolllm
  label: 万级API扩展
- from: toolllm
  to: llm_compiler
  label: 并行调用优化
- from: toolllm
  to: toolace
  label: 数据合成增强
- from: cot
  to: self_consistency
  label: 多路采样投票
- from: cot
  to: react
  label: 引入行动循环
- from: cot
  to: plan_and_solve
  label: 显式规划分离
- from: cot
  to: tot
  label: 树结构搜索
- from: react
  to: reflexion
  label: 语言反馈强化
- from: tot
  to: lats
  label: MCTS框架整合
- from: reflexion
  to: retroformer
  label: 策略梯度优化
- from: camel
  to: chatdev
  label: 软件开发场景
- from: camel
  to: autogen
  label: 框架通用化
- from: camel
  to: agentverse
  label: 群体行为模拟
- from: chatdev
  to: metagpt
  label: SOP流程注入
- from: autogen
  to: openagents
  label: 开放平台扩展
- from: api_bank_bench
  to: agentbench
  label: 多环境扩展
- from: agentbench
  to: webarena
  label: 网页交互聚焦
- from: agentbench
  to: gaia
  label: 现实任务覆盖
- from: agentbench
  to: swe_bench
  label: 软件工程聚焦
- from: cot
  to: hi_cot
  label: 分层架构扩展
- from: cot
  to: causal_cot
  label: 因果机制引入
- from: gaia
  to: gaia2
  label: 动态异步升级
- from: react
  to: agentic_reasoning
  label: 元推理统一
- from: agentbench
  to: embocoach_bench
  label: 具身场景扩展
- from: retroformer
  to: reasonflux_prm
  label: 过程奖励建模
- from: chatdev
  to: solagent
  label: 智能合约场景
milestones:
- cot
- react
- metagpt
```

## 核心算法

### Toolformer

```yaml
id: toolformer
num: 1
name: Toolformer
full_name: 工具学习者 (Toolformer)
year: '2023'
org: Meta AI
parent: —
paper_url: https://arxiv.org/abs/2302.04761
project_url: ''
category: tool_use
motivation: 自监督学习使模型自主学会调用工具
```

#### 📝 一句话总结
Toolformer 提出了一种自监督方法，让语言模型通过自我标注和过滤 API 调用来自主学会何时、如何调用外部工具（计算器、搜索引擎、问答系统等），无需大量人工标注即可显著提升模型在算术、事实查询等任务上的零样本能力。

#### 🎯 核心要点
- **自监督工具学习流水线**：利用 LM 的上下文学习能力自动标注 API 调用，再通过损失函数过滤无用调用，最终在增强数据集上微调
- **5 种外部工具**：问答系统（Atlas）、维基百科搜索（BM25）、计算器、日历、机器翻译（NLLB 600M）
- **基于损失的过滤机制**：比较"有 API 调用+结果"与"无调用/无结果"的加权交叉熵损失差，仅保留确实降低困惑度的调用
- **基础模型**：GPT-J 6.7B，训练数据为 CCNet 子集
- **推理机制**：解码时遇到 `→` 特殊标记即中断，调用对应 API 获取结果后继续生成
- **零样本性能**：6.7B 参数的 Toolformer 在多项任务上超越 175B 参数的 GPT-3

#### 🔬 深入细节
![Toolformer 工具调用示例总览](https://ar5iv.labs.arxiv.org/html/2302.04761/assets/x1.png)
*图 1：Toolformer 学会在文本生成过程中自主插入各种 API 调用（计算器、问答、搜索、翻译、日历），每个调用以 `[API_name(input) → result]` 格式嵌入文本流中。*

##### 动机与背景

大语言模型虽然在语言理解和生成方面表现出色，但在一些看似简单的任务上仍存在根本性缺陷：无法精确进行数学运算、无法获取最新的事实信息、缺乏时间感知能力。已有的工具增强方法（如 WebGPT、LaMDA）要么依赖大量人工标注，要么将工具使用限定在特定任务上，缺乏通用性。

Toolformer 的核心目标是：**以自监督方式让模型自主决定何时、如何调用哪种工具**，且不丧失其通用语言建模能力。

##### 核心方法：三步自监督流水线

![Toolformer 数据增强三步流程](https://ar5iv.labs.arxiv.org/html/2302.04761/assets/x2.png)
*图 2：Toolformer 的数据增强流程——(1) 利用上下文学习采样候选 API 调用；(2) 执行 API 获取结果；(3) 基于损失过滤，仅保留有用的调用。*

整个方法分为三个阶段：

**阶段一：采样候选 API 调用**

对于数据集 \(\mathcal{C}\) 中的每段文本 \(\mathbf{x} = x_1, \ldots, x_n\)，为每种 API 编写少量示范提示（few-shot prompt），引导模型 \(M\) 在文本中标注潜在的 API 调用位置。具体地，对每个位置 \(i\)，计算模型在该位置生成 `<API>` 标记的概率：

$$p_i = p_M(\texttt{<API>} \mid P(\mathbf{x}), x_{1:i-1})$$

设定采样阈值 \(\tau_s\)，保留概率超过阈值的位置集合 \(I = \{i \mid p_i > \tau_s\}\)（最多保留 top-\(k\) 个）。对每个位置，以 `[P(x), x_1, ..., x_{i-1}, <API>]` 为前缀，采样最多 \(m\) 个候选 API 调用。

**阶段二：执行 API 调用**

对所有采样到的候选 API 调用执行实际调用，获取文本形式的返回结果 \(r_i\)。不同工具的执行方式各异——可以是调用另一个神经网络、执行 Python 脚本或进行检索。

**阶段三：基于损失的过滤**

这是方法的核心创新。定义加权交叉熵损失：

$$L_i(\mathbf{z}) = -\sum_{j=i}^{n} w_{j-i} \cdot \log p_M(x_j \mid \mathbf{z}, x_{1:j-1})$$

然后比较两个损失值：

$$L_i^{+} = L_i(\text{e}(c_i, r_i))$$

$$L_i^{-} = \min\left(L_i(\varepsilon),\; L_i(\text{e}(c_i, \varepsilon))\right)$$

其中 \(L_i^{+}\) 是将完整 API 调用（含返回结果）作为前缀时的损失，\(L_i^{-}\) 是不做调用或仅做调用但不含结果时的最小损失。

> 💡 **关键直觉**：如果同时提供 API 的输入和输出能让模型更好地预测后续 token（即 \(L_i^{-} - L_i^{+} \geq \tau_f\)），则该调用是"有用的"，予以保留；否则丢弃。

设定过滤阈值 \(\tau_f\)，仅保留满足条件的 API 调用。

##### 模型微调与推理

```python
# Toolformer 训练与推理伪代码
# === 训练阶段 ===
for text x in dataset C:
    # Step 1: 采样候选 API 调用位置
    for position i in range(len(x)):
        p_i = LM.prob("<API>" | prompt(x), x[:i])
        if p_i > tau_s:
            candidates = LM.sample_api_calls(prefix=x[:i], num=m)
            
            # Step 2: 执行 API
            for c in candidates:
                r = execute_api(c)
                
                # Step 3: 过滤
                L_plus = weighted_loss(x[i:], prefix=api_call_with_result(c, r))
                L_minus = min(
                    weighted_loss(x[i:], prefix=empty),
                    weighted_loss(x[i:], prefix=api_call_no_result(c))
                )
                if L_minus - L_plus >= tau_f:
                    insert_api_call(x, position=i, call=c, result=r)

# 在增强数据集 C* 上用标准语言建模目标微调 M

# === 推理阶段 ===
while generating:
    token = LM.decode_next()
    if token == "→":  # 模型期望 API 返回结果
        api_response = call_api(current_api_call)
        insert(api_response + "</API>")
        continue_decoding()
```

**微调**：将过滤后的 API 调用插入原始文本对应位置，构造增强数据集 \(\mathcal{C}^*\)。关键设计是 \(\mathcal{C}^*\) 包含与原始数据集 \(\mathcal{C}\) 完全相同的文本内容（仅多了 API 调用标注），因此微调不会损害模型的通用语言建模能力。

**推理**：正常解码直到模型生成 `→` 标记（表示它期望获得 API 返回结果），此时中断解码、调用对应 API、将返回结果和 `</API>` 标记插入，然后继续解码。

> ⚠️ **注意**：训练时 API 调用结果作为前缀而非插入文本中间，因为未微调的模型不习惯中间插入的 API 格式，这会破坏文本连贯性并损害困惑度。

##### API 调用的文本表示

每个 API 调用表示为元组 \(c = (a_c, i_c)\)，其中 \(a_c\) 是 API 名称，\(i_c\) 是输入。线性化格式为：

- 不含结果：`<API> a_c(i_c) </API>`
- 含结果：`<API> a_c(i_c) → r </API>`

实际实现中使用 `[`、`]`、`->` 代替特殊标记，无需修改词表。

##### 五种工具详解

| 工具 | 实现 | 输入示例 | 输出示例 |
|------|------|----------|----------|
| 问答系统 | Atlas（检索增强 LM，基于 Natural Questions 微调） | "Where was the Knights of Columbus founded?" | "New Haven, Connecticut" |
| 维基百科搜索 | BM25 检索器（KILT 维基百科索引） | "Fishing Reel Types" | 相关维基百科片段 |
| 计算器 | 四则运算，结果保留两位小数 | "27 + 4 * 2" | "35" |
| 日历 | 返回当前日期，无需输入 | ε（空） | "Today is Monday, January 30, 2023." |
| 机器翻译 | NLLB 600M（200 种语言→英语，fastText 自动检测源语言） | "sûreté nucléaire" | "nuclear safety" |

##### 与传统方法的区别

| 维度 | 传统工具增强方法 | Toolformer |
|------|------------------|------------|
| 监督信号 | 大量人工标注（WebGPT、LaMDA） | 自监督，仅需少量 few-shot 示范 |
| 工具使用范围 | 绑定特定任务 | 通用，模型自主决定何时/如何/用哪个工具 |
| 通用性保持 | 可能损害语言建模能力 | 增强数据集保留原始文本，不损害通用性 |
| 训练成本 | 需要人类反馈或强化学习 | 仅需标准语言建模微调 |
| 模型规模 | 通常需要超大模型 | 6.7B 即可超越 175B GPT-3 |

#### 🧪 练习题
```yaml
question: "Toolformer 过滤 API 调用的核心标准是什么？"
options:
  - "API 调用的执行时间是否低于阈值"
  - "API 返回结果的文本长度是否超过最小值"
  - "插入 API 调用及其结果后，模型预测后续 token 的损失是否显著降低"
  - "人工标注者判断该 API 调用是否有帮助"
answer: 2
explain: "Toolformer 通过比较 L_i^- - L_i^+ ≥ τ_f 来判断：如果提供 API 调用及其返回结果能显著降低模型预测后续 token 的加权交叉熵损失（相比不调用或调用但无结果），则保留该调用。这是一种完全自监督的过滤机制。"
```

### ART

```yaml
id: art
num: 2
name: ART
full_name: 自动推理与工具使用 (Automatic Reasoning and Tool-use)
year: '2023'
org: 华盛顿大学/AI2
parent: toolformer
paper_url: https://arxiv.org/abs/2303.09014
project_url: ''
category: tool_use
motivation: 自动选择多步推理示例与工具调用
```

#### 📝 一句话总结
ART 提出一种无需微调的自动多步推理与工具使用框架：给定新任务，它从任务库检索相似的推理程序示例，引导冻结 LLM 生成可解析的步骤，并在遇到工具调用时暂停生成、执行工具、再继续推理。它解决了 CoT 和早期工具使用方法依赖人工任务级 prompt、工具脚本或模型微调的问题。

#### 🎯 核心要点
- 使用冻结 InstructGPT 作为主推理模型，不训练模型参数，靠任务库中的跨任务示例迁移分解模式和工具调用模式。
- 构建任务库：从 BigBench 选取 15 个种子任务，覆盖 Arithmetic、Code、Search、Free-form reasoning、String Operations 五类技能，每个任务写少量程序式分解示例。
- 提出 PeG 风格的结构化程序格式：`Qi: [tool] query`、`#i: answer`、`Qj: [EOQ]`、`Ans:`，让 LLM 输出既像 CoT 又能被解析器拦截执行。
- 引入工具库：包括 SerpAPI 搜索、Codex 生成 Python 代码、Python 环境执行代码；工具输出会被插回当前程序上下文。
- 提供两种任务检索策略：有少量标注样本时按五个技能簇做验证选择；无分解监督时用 LLM 判断任务对相似度并排序。
- 支持人类反馈：用户可直接编辑错误程序、添加分解示例或实现新工具，而不需要重新训练 LLM。
- 在 BigBench 未见任务上平均超过 few-shot 6.9 个百分点、超过 AutoCoT 24.6 个百分点；在 MMLU 子集上分别超过 few-shot 14.6 个百分点、超过 AutoCoT 23.7 个百分点。
- 工具调用贡献显著：测试任务中工具使用版 ART 比无工具版平均高 16.7 个百分点，算术类任务尤其受益于代码执行的确定性计算。

#### 🔬 深入细节
![ART 自动推理与工具使用框架图](https://www.promptingguide.ai/_next/static/media/ART.3b30f615.png)
*图：ART 从任务库选择相似程序示例，让冻结 LLM 写出新任务的推理程序，并在搜索、代码生成、代码执行等工具调用处暂停生成。图源为 Prompt Engineering Guide 对论文 Fig.1 的公开复刻，原图来自 ART 论文。*

```python
def solve_with_art(task_description, task_input, task_library, tool_library, llm):
    # 1. 从任务库检索 N=3 个相似任务，每个任务取 2 个程序示例
    demos = retrieve_related_programs(
        task_description=task_description,
        task_library=task_library,
        num_tasks=3,
        demos_per_task=2,
    )
    prompt = build_prompt(demos, task_description, task_input)
    program = ""

    # 2. 让冻结 LLM 逐步生成 PeG 风格程序
    while not contains_eoq(program):
        partial = llm.generate_until_next_subtask(prompt + program)
        program += partial

        step = parse_latest_query(program)  # 例如 Q2: [generate python code] ...
        if step.tool_name in tool_library:
            # 3. 命中工具名时暂停 LLM，执行工具并写回 #i
            tool_output = tool_library[step.tool_name](step.argument, program)
            program += format_tool_answer(step.index, tool_output)
        else:
            # 4. 非工具子步骤由 LLM 继续补全
            program += llm.generate_step_answer(prompt + program)

    return parse_final_answer(program)  # Ans: ...
```

ART 的核心动机是把“会推理”和“会调用工具”从手工 prompt 工程里抽出来。传统 CoT prompt 往往需要人为给目标任务写推理示例；ReAct、Self-Ask、PAL、PoT 等工具增强方法虽然能调用搜索或代码，但常要求开发者针对任务写固定交互脚本；Toolformer 这类方法还需要用工具调用数据微调模型。ART 的选择更轻量：冻结 LLM，只维护一个任务库和一个工具库，让新任务通过检索到的相似程序示例学会如何分解、何时调用工具。

任务库不是普通的 few-shot 输入输出对，而是“程序示例”。每个程序由输入节点、若干 `(query, answer)` 子步骤节点和最终答案节点组成，例如 `Q1: [search] ...` 后跟 `#1: ...`，最后用 `[EOQ]` 结束。这种格式的价值有两层：一是给模型强约束的推理骨架，减少自由文本 CoT 的漂移；二是让运行时可以可靠解析工具符号，一旦生成 `[search]`、`[generate python code]` 或 `[execute code]`，系统就知道应该暂停 LLM 并执行外部模块。

工具调用采用“暂停-执行-注入-恢复”的闭环。搜索工具把 LLM 生成的 query 送入 SerpAPI，并优先抽取 answer box 或前两个结果片段；代码生成工具把 LLM 的自然语言指令作为 Python 注释交给 Codex；代码执行工具把上一步得到的代码片段放进 Python 环境执行，并把变量值或运行结果写回程序。这样，LLM 负责拆题和组织中间变量，外部工具负责知识检索或精确计算，减少纯语言模型在算术、符号操作和事实查询上的错误。

检索策略决定了 ART 如何把“旧任务的程序”迁移到“新任务”。如果目标任务有大约 50 个输入输出标注，ART 会遍历五个技能簇，在 held-out 样本上选表现最好的簇来构建 prompt；如果没有这样的验证集，则用 LLM 对“目标任务-库中任务”做 Similar / Not similar 判断，并按 `log P(Similar) - log P(Not similar)` 排序。论文默认 prompt 取 3 个种子任务、每个任务 2 个程序示例，形成一个多任务、程序式 in-context prompt。

人类反馈在 ART 中是符号级、即时生效的。用户可以直接把错误程序中的子步骤改掉、补上缺失步骤，或实现一个新工具并在任务库里演示它的用法；下一次检索到这些程序时，模型就会看到更好的分解范式。论文展示了在物理题中补充单位处理、在 word unscramble 中加入 `lookup` 工具等案例。这与 RLHF 不同：ART 不更新模型参数，反馈的作用面主要来自任务库和工具库的可复用性，但成本低、可解释、调试路径短。

从结果看，ART 的主要收益并不只来自“多写几步”。在任务库内部，即使关掉工具，结构化程序格式也比 AutoCoT 平均高约 8 个百分点；打开工具后，库内任务平均比 AutoCoT 高 17.17 个百分点。对未见 BigBench 任务，工具被调用约 89% 的实例，并贡献了相当比例的提升；算术类任务提升最大，因为把问题转成代码执行可以避免 LLM 手算出错。局限也很明确：代码生成一旦出错会级联影响后续步骤，搜索片段仍需 LLM 抽取和推理，任务库覆盖不足时检索到的程序示例会变弱。

> 💡 关键：ART 把 prompt 从“为每个任务手写推理链”升级为“维护可检索、可执行、可编辑的程序库”，因此它更像一种轻量级的工具增强推理运行时，而不是单纯的 CoT 模板。

#### 🧪 练习题
```yaml
question: "ART 使用 PeG 风格程序格式的最核心目的是什么？"
options:
  - "把冻结 LLM 微调成专门的工具调用模型"
  - "让推理步骤可解析，从而在工具调用处暂停生成并注入外部结果"
  - "减少任务库中示例的数量到零"
  - "保证搜索工具返回的片段一定是正确答案"
answer: 1
explain: "PeG 格式把子任务、工具名、参数和输出写成可解析节点，系统才能可靠拦截 `[search]` 等符号并执行工具。ART 不微调 LLM，也不能保证搜索结果天然正确。"
```

### HuggingGPT

```yaml
id: hugginggpt
num: 3
name: HuggingGPT
full_name: HuggingFace任务调度器 (HuggingGPT)
year: '2023'
org: 微软亚洲研究院
parent: toolformer
paper_url: https://proceedings.neurips.cc/paper_files/paper/2023/hash/77c33e6a367922d003ff102ffb92b658-Abstract-Conference.html
project_url: ''
category: tool_use
motivation: LLM作为控制器调度专家模型
```

#### 📝 一句话总结
HuggingGPT 提出让 ChatGPT 等 LLM 充当中央控制器，把用户复杂请求拆成结构化任务，按 Hugging Face 模型描述选择专家模型执行，再汇总各模型结果生成最终回复，解决单一 LLM 缺少多模态感知与专用模型执行能力的问题。

#### 🎯 核心要点
- 采用“LLM 控制器 + 专家模型执行器”的架构，语言作为统一接口连接文本、图像、语音等不同模态模型。
- 工作流包含四阶段：Task Planning、Model Selection、Task Execution、Response Generation。
- Task Planning 用规范化 JSON 模板输出 `task`、`id`、`dep`、`args`，显式表示任务名、任务编号、依赖关系和参数。
- Model Selection 将任务-模型匹配转化为 in-context 单选问题，先按 task type 过滤，再按 Hugging Face 下载量选 Top-K 候选模型。
- Task Execution 使用 `<resource>-task_id` 占位符维护任务间资源依赖，并对无依赖任务并行执行。
- 系统支持 hybrid endpoint：常用或耗时模型可本地部署，未本地部署的模型再走 Hugging Face 云端接口。
- Response Generation 把任务列表、选中模型、结构化推理结果交回 LLM，由 LLM 生成面向用户的自然语言总结。

#### 🔬 深入细节
![HuggingGPT 总体流程图](https://ar5iv.labs.arxiv.org/html/2303.17580/assets/x2.png)
*图：HuggingGPT Figure 2，总览四阶段流程：任务规划、模型选择、任务执行、响应生成。LLM 负责计划与决策，Hugging Face 专家模型负责具体执行。*

```python
# HuggingGPT 四阶段调度伪代码

def hugginggpt(user_request, chat_logs=None):
    # 1. Task Planning: 输出结构化任务图
    tasks = LLM.plan(
        request=user_request,
        schema={"task": str, "id": int, "dep": list, "args": dict},
        demos=planning_demonstrations,
        chat_logs=chat_logs,
    )

    # 2. Model Selection: 每个任务选择专家模型
    for task in tasks:
        candidates = filter_models_by_task_type(task.task, hf_model_pool)
        candidates = rank_by_downloads(candidates)[:K]
        task.model = LLM.select_one(task, candidates)

    # 3. Task Execution: 按依赖替换资源并执行
    results = {}
    for task in topological_or_parallel_schedule(tasks):
        args = replace_resource_tokens(task.args, results)  # <resource>-task_id
        results[task.id] = run_model(task.model, args)

    # 4. Response Generation: 汇总执行日志和结构化结果
    return LLM.summarize(user_request, tasks, results)
```

HuggingGPT 的动机来自一个实际矛盾：LLM 擅长理解、规划和语言交互，但它本身不一定能完成高质量目标检测、姿态估计、语音合成、图像生成等专用任务；与此同时，Hugging Face 等模型社区中有大量专家模型，但这些模型通常只解决单一任务，无法自主理解复杂用户请求并组织协作。HuggingGPT 的核心设定就是把二者解耦：LLM 不直接承担所有感知和生成任务，而是成为“控制器”；专家模型不负责理解复杂意图，而是成为“执行器”。

第一阶段 Task Planning 把自然语言请求转成任务图。论文要求 LLM 按固定 schema 输出 JSON 风格结构，其中 `task` 是任务类型，`id` 是唯一编号，`dep` 是依赖的前置任务，`args` 是文本、图像、音频、视频等参数。这个设计比普通 agent 的自由文本计划更可控，因为后续系统可以直接解析 `dep` 字段做拓扑调度，也能把 `args` 中的资源占位符传递给执行阶段。可以抽象为：

$$
G=(V,E), \quad V=\{t_i=(\text{task}_i,\text{args}_i)\}, \quad E=\{(t_j,t_i): j\in \text{dep}_i\}
$$

其中 \(G\) 是由 LLM 规划出的任务依赖图。HuggingGPT 通过 specification-based instruction 保证输出字段一致，通过 demonstration-based parsing 给 LLM 展示用户请求到任务序列的样例。对于多轮对话，它还把 chat logs 放进 prompt，让模型能追踪之前提到的资源。

第二阶段 Model Selection 把开放模型社区变成可检索/可选择的工具池。系统先收集 Hugging Face 模型描述，把模型能力以自然语言形式暴露给 LLM。由于上下文长度不允许把全部模型塞进 prompt，HuggingGPT 先按任务类型筛掉不相关模型，再根据下载量选择 Top-K 候选，最后让 LLM 在候选模型中做单选：

$$
m_i = \operatorname{LLMSelect}\left(t_i, \operatorname{TopK}_{m\in \mathcal{M}(\text{task}_i)} \operatorname{downloads}(m)\right)
$$

这个公式体现了 HuggingGPT 的折中：下载量排序不是严格的模型质量评估，但能在开放社区中快速筛出较常用、较稳定的候选，从而减少 token 成本并降低选择空间。真正的任务-模型语义匹配仍由 LLM 根据任务描述、模型描述和用户目标完成。

第三阶段 Task Execution 处理的是工程上最容易出错的资源依赖。比如用户要求“根据图片检测人体姿态，再用该姿态生成新图片，最后为图片生成语音描述”，后续任务的输入不是一开始就存在，而是由前置任务动态产生。HuggingGPT 用 `<resource>-task_id` 表示这种资源引用：规划阶段只写占位符，执行阶段等前置任务完成后再把占位符替换成真实文件或结果。对于没有依赖关系的任务，系统可以并行执行，降低整体延迟。

第四阶段 Response Generation 不是简单拼接模型输出，而是让 LLM 读取完整执行日志：用户请求、规划任务、选中模型、每个模型的结构化结果。结构化结果可能是检测框、类别概率、问答分布、生成文件 URL 等。LLM 的职责是把这些机器结果转成用户能理解的回答，并在需要时给出置信信息或解释。这样，HuggingGPT 把“模型社区的异构输出”重新统一成自然语言交互。

与 Toolformer 类工具学习方法相比，HuggingGPT 更像系统级编排框架。Toolformer 关注语言模型如何学会插入 API 调用；HuggingGPT 则假设已有大量专家模型可用，重点解决复杂请求的任务拆解、模型路由、依赖调度和结果汇总。它的优势是可扩展性：新增一个专家模型时，只需提供任务类型和模型描述，就能被控制器纳入候选池；限制是系统稳定性依赖 LLM 规划格式、模型描述质量、端点可用性和跨模态资源管理。

> ⚠️ 注意：HuggingGPT 的“智能”并不只来自 ChatGPT 本身，而来自 ChatGPT 对外部模型生态的调度能力；如果任务规划错误或模型选择错误，后续专家模型即使很强也会执行错误目标。

#### 🧪 练习题
```yaml
question: "HuggingGPT 使用 `<resource>-task_id` 符号的主要目的是什么？"
options:
  - "压缩模型描述，减少 Hugging Face 候选模型数量"
  - "表示某个任务依赖前置任务动态生成的资源，并在执行阶段替换成真实结果"
  - "让所有任务都串行执行，避免并行带来的资源竞争"
  - "把最终回答强制转成 JSON 格式"
answer: 1
explain: "`<resource>-task_id` 是跨任务资源依赖占位符；规划阶段标记依赖，执行阶段用前置任务的真实输出替换它。"
```

### API-Bank

```yaml
id: api_bank
num: 4
name: API-Bank
full_name: API工具基准 (API-Bank)
year: '2023'
org: 中科院/阿里巴巴
parent: —
paper_url: https://aclanthology.org/2023.emnlp-main.187/
project_url: ''
category: tool_use
motivation: 首个系统性工具增强LLM基准
```

#### 📝 一句话总结
API-Bank 提出了面向工具增强 LLM 的系统性基准，把工具使用能力拆成 Call、Retrieve+Call、Plan+Retrieve+Call 三个层级，并提供可运行 API 系统、人工评测集、自动构造训练集和 Lynx 微调模型来评估与提升 LLM 的真实 API 使用能力。

#### 🎯 核心要点
- 定义三类工具使用能力：已知少量 API 下调用、未知大量 API 下检索后调用、多步规划后检索并调用多个 API。
- 构建可运行评测系统，包含 73 个常用 API、314 条人工标注工具使用对话和 753 次 API 调用。
- 提供训练集：1,888 条工具使用对话、2,138 个 API、覆盖 1,000 个领域，用于训练工具增强 LLM。
- 提出 API Search 工具：在大量 API 池中用查询关键词和 API 元信息 embedding 的余弦相似度检索候选 API。
- 提出五代理 Multi-agent 数据生成流程，将复杂数据构造拆成领域生成、API 生成、查询生成、调用/响应生成、测试过滤。
- 训练 Lynx-7B：以 Alpaca 为初始化，经 API-Bank 数据微调后在工具使用正确率上显著超过 Alpaca，并接近 GPT-3.5。
- 评测同时关注 API 调用正确性和最终响应质量，分别使用 correctness/accuracy 与 ROUGE-L。

#### 🔬 深入细节
![API-Bank 三层工具使用能力](https://ar5iv.labs.arxiv.org/html/2304.08244/assets/x1.png)
*图：API-Bank Figure 1，将工具增强 LLM 的能力分为 Call、Retrieve+Call、Plan+Retrieve+Call，难度从已知 API 的单步调用逐步提升到未知 API 池中的多步计划与调用。*

```python
# API-Bank 评测与训练流程伪代码

def evaluate_tool_llm(model, dialogue, api_pool):
    state = initialize_api_system(api_pool)
    api_history = []

    for turn in dialogue.turns:
        prompt = build_tool_prompt(turn, api_pool, api_history)
        prediction = model.generate(prompt)

        if prediction.calls_api_search:
            candidates = api_search(prediction.keywords, api_pool)
            prediction = model.generate(prompt_with(candidates))

        call = parse_api_call(prediction)
        result = execute_api(call, state)
        api_history.append((call, result))

    call_correct = compare_with_gold(api_history, dialogue.gold_calls)
    response_score = rouge_l(prediction.final_response, dialogue.gold_response)
    return call_correct, response_score


def multi_agent_data_generation():
    domain = agent_1_generate_domain()
    apis = agent_2_generate_apis(domain, public_api_examples=True)
    selected_apis, ability, query = agent_3_generate_query(apis)
    calls, response = agent_4_simulate_calls_and_response(domain, selected_apis, query)
    return agent_5_tester_filter(domain, apis, query, calls, response)
```

API-Bank 的核心动机是：当 LLM 被要求调用真实工具时，传统 NLP benchmark 只测回答文本是不够的。工具调用有严格格式、参数约束、状态变化和执行结果；一个模型即使能说出合理解释，也可能没有真正调用 API、调用了错误 API、参数缺失、格式不可解析，或者在多步任务中无法规划调用顺序。因此论文从用户需求出发，把工具使用能力拆成两个维度：API 池大小和每轮调用次数。少量 API 时，模型可以直接看到所有 API 文档；大量 API 时，模型必须先检索；复杂任务时，模型还必须规划多个 API 的顺序。

三层能力的定义是 API-Bank 最重要的抽象。`Call` 表示模型已知候选 API 文档时，能根据用户请求填对 API 名和参数；`Retrieve+Call` 表示 API 池很大，模型不知道具体可用 API，需要先调用 API Search 检索再调用；`Plan+Retrieve+Call` 表示用户给出一个复合需求，模型需要拆解成多个步骤，并在每一步检索和调用合适 API。可以用难度递进表示为：

$$
\text{Call} \subset \text{Retrieve+Call} \subset \text{Plan+Retrieve+Call}
$$

这个包含关系表达的是能力要求递增，而不是数据集合严格包含：后两者在前者基础上增加了检索与规划。论文的 Figure 1 正是围绕这三个层级组织评测。

API Search 是 API-Bank 中把“海量工具池”变成可操作环境的关键工具。模型在 Retrieve+Call 和 Plan+Retrieve+Call 设置中并不会预先看到所有 API，而是必须先把用户需求压缩成关键词，交给 API Search 检索相关 API。论文描述的检索机制可以写为：

$$
a^* = \arg\max_{a\in\mathcal{A}} \frac{E(q)\cdot E(m_a)}{\|E(q)\|\,\|E(m_a)\|}
$$

其中 \(q\) 是模型生成的检索关键词，\(m_a\) 是 API 的元信息文本，\(E(\cdot)\) 是句向量编码器。这个机制让模型面临两个层面的挑战：它既要理解用户需求并形成可检索关键词，又要在拿到 API 文档后生成正确调用。

评测系统不是静态文本匹配，而是可执行环境。API-Bank 实现了 73 个 API，包括天气、数据库操作、AI 模型访问等常见工具；对需要外部信息的 API，论文把检索结果固定下来以保证可复现。评测时先初始化 API 系统和数据库状态，再比较模型预测 API 调用与人工标注调用是否一致。一致性不只是字符串完全相同，而是关注是否执行同样的查询或修改、是否得到相同返回结果。最终指标包含 API 调用 correctness/accuracy 和响应 ROUGE-L：

$$
\operatorname{Accuracy}=\frac{\#\text{correct API calls}}{\#\text{all API calls}}
$$

这使 API-Bank 能区分两类错误：工具调用链是否正确，以及模型基于工具输出给用户的自然语言回答是否好。

训练集构造解决的是规模问题。人工评测集每条对话标注成本高，论文报告平均约 8 美元/对话；而工具增强训练数据又必须覆盖不同领域、真实 API、多轮对话、多调用和三类能力。单一 self-instruct 提示很难同时满足这些约束，ChatGPT 直接生成时可用率很低。API-Bank 因此提出五代理生成流程：第一个 agent 生成领域，第二个 agent 根据领域生成 API 并参考 Public APIs 保持真实性，第三个 agent 选择 API 和能力层级并生成 query，第四个 agent 生成 API 调用和响应，第五个 tester agent 检查数据是否符合设计原则并过滤错误样本。

这个 Multi-agent 流程的本质是把一个过载指令拆成有依赖关系的子任务。数据元素之间存在清晰结构：domain 决定 API 功能，API 和 ability 决定 query 类型，domain/API/query/ability 共同决定 API call 与 response。因此五代理流程不是简单多样化采样，而是在模拟数据生成的因果链。论文报告最终训练集包含 1,888 条对话、2,138 个 API 和 1,000 个领域，成本约 0.1 美元/对话，相比人工标注节省约 98%。

Lynx 是 API-Bank 对“如何提升工具使用能力”的验证。论文用 API-Bank 训练数据微调 Alpaca 得到 Lynx-7B，并在评测系统上与 Alpaca、ChatGLM、GPT-3、GPT-3.5、GPT-4 等模型比较。结果显示 Lynx 在 API call correctness 上比 Alpaca 提升超过 26 个百分点，并接近 GPT-3.5；但错误分析也暴露了工具增强 LLM 的难点：Alpaca 常见问题是没有 API 调用或格式错误，Lynx 微调后减少了这些问题，但更容易出现 API hallucination 或参数问题；GPT-4 在最难的规划任务上强，但 API Search 使用和输出格式仍可能不符合评测系统要求。

与 Toolformer、APIBench、ToolAlpaca 等工作相比，API-Bank 的贡献不只是“又一个工具调用数据集”，而是把工具使用拆成可运行、可度量、可训练的完整闭环。它强调评测集人工构造和可执行 API 环境，避免只在模型自生成数据上评估；它同时测 API call 与 response，避免只看最终自然语言答案；它覆盖多领域、多轮、多调用和检索规划场景，更贴近真实 agent 系统会遇到的问题。

> 💡 关键：API-Bank 的价值在于把“会不会用工具”从主观印象变成可执行评测：模型必须选对 API、传对参数、按顺序执行，并基于真实返回结果回答用户。

#### 🧪 练习题
```yaml
question: "API-Bank 中 `Plan+Retrieve+Call` 相比 `Retrieve+Call` 额外考察了什么能力？"
options:
  - "只考察模型能否把 API 文档压缩进上下文"
  - "考察模型在未知 API 池中先检索一个 API 后立即单步调用"
  - "考察模型能否把复合需求拆成多步，并在每一步检索和调用合适 API"
  - "只考察最终自然语言回答的 ROUGE-L 分数"
answer: 2
explain: "`Plan+Retrieve+Call` 要求模型先规划多个 API 调用步骤，再对每一步执行检索和调用，因此比单步 `Retrieve+Call` 更难。"
```

### Gorilla

```yaml
id: gorilla
num: 5
name: Gorilla
full_name: 大规模API连接器 (Gorilla)
year: '2024'
org: UC Berkeley
parent: toolformer
paper_url: https://proceedings.neurips.cc/paper_files/paper/2024/hash/e4c61f578ff07830f5c37378dd3ecb0d-Abstract-Conference.html
project_url: ''
category: tool_use
motivation: 检索增强微调连接大规模API
```

#### 📝 一句话总结
Gorilla 通过在自动生成的 {指令, API} 数据集上对 LLaMA-7B 进行检索增强微调（Retriever-Aware Training），使 LLM 能够从 1,600+ 个机器学习 API 中准确选择并生成正确的 API 调用，同时显著降低幻觉率，并能适应 API 文档的实时变更。

#### 🎯 核心要点
- **APIBench 基准数据集**：收集 Torch Hub（94 个）、HuggingFace（925 个）、TensorFlow Hub（696 个）共 1,645 个真实 ML API，并利用 GPT-4 自指令（Self-Instruct）为每个 API 生成 10 条指令-API 配对，共 16,450 个训练样本
- **检索增强微调（Retriever-Aware Training）**：在训练时将检索到的 API 文档拼接到用户指令后，使模型学会解析文档来回答问题，推理时同样拼接最新检索文档
- **AST 子树匹配评估**：提出基于抽象语法树（AST）的评估方法，将 API 调用解析为树结构后进行子树匹配，避免传统字符串匹配的误判
- **幻觉检测机制**：通过 AST 解析检测模型是否编造不存在的 API（虚假 API 端点、错误参数等），量化幻觉率
- **约束感知 API 选择**：支持用户指定参数量、精度等约束条件，模型在满足约束的前提下选择最合适的 API
- **适应 API 文档变更**：检索增强训练使 Gorilla 能在推理时适应 API 文档的更新（如模型升级、仓库迁移），无需重新训练

#### 🔬 深入细节
##### 系统架构总览

![Gorilla 系统架构图](https://ar5iv.labs.arxiv.org/html/2305.15334/assets/x3.png)
*图：Gorilla 系统的训练与推理流程。左侧为基于 Self-Instruct 的数据集构建，中间为 LLaMA-7B 微调，右侧为推理时可选的检索增强模式。*

Gorilla 的整体流程分为三个阶段：

1. **数据集构建**：从三大 ML 模型仓库爬取 API 文档（JSON 格式），利用 GPT-4 为每个 API 生成多条自然语言指令
2. **模型训练**：将指令-API 对转换为用户-代理对话格式，对 LLaMA-7B 进行指令微调
3. **推理**：用户输入自然语言需求，Gorilla 输出可执行的 API 调用；可选地通过 BM25 或 GPT-Index 检索器获取最新 API 文档

##### 核心评估方法：AST 子树匹配

![AST 子树匹配](https://ar5iv.labs.arxiv.org/html/2305.15334/assets/x4.png)
*图：AST 子树匹配评估方法示意。将 API 调用解析为语法树，通过子树匹配判断功能等价性。*

```python
# AST 子树匹配评估伪代码
def ast_eval(predicted_api_call, ground_truth_api_call):
    # Step 1: 将 API 调用解析为 AST
    pred_tree = parse_to_ast(predicted_api_call)
    truth_tree = parse_to_ast(ground_truth_api_call)

    # Step 2: 提取 API 名称节点（域名 + 函数名）
    pred_api_name = extract_api_name(pred_tree)    # e.g., "torch.hub.load('repo', 'model')"
    truth_api_name = extract_api_name(truth_tree)

    # Step 3: 检查幻觉 —— API 名称是否存在于已知 API 数据库
    if pred_api_name not in known_api_database:
        return "hallucination"

    # Step 4: 子树匹配 —— 检查关键参数是否正确
    if is_subtree(pred_tree, truth_tree):
        return "correct"
    else:
        return "error"
```

> 💡 **关键**：传统的字符串精确匹配（如 BLEU、ROUGE）无法处理 API 调用中参数顺序不同但功能等价的情况。AST 子树匹配通过将代码解析为树结构，只要预测的 API 调用在语法树层面是 ground truth 的子树（即包含所有必要的功能性参数），即判定为正确。这允许模型省略可选参数或使用不同的参数顺序。

##### 检索增强训练机制

Gorilla 的核心创新在于**检索增强训练（Retriever-Aware Training）**，其工作原理如下：

**训练阶段**：在每条训练样本的用户指令后追加检索到的 API 文档：

$$\text{Input} = \text{[User Instruction]} + \text{"Use this API documentation for reference: "} + \text{[API\_doc\_JSON]}$$

通过这种方式，模型学会了两个关键能力：(a) 理解用户的功能性需求，(b) 从提供的文档中提取正确的 API 调用信息。

**推理阶段**：支持两种模式：
- **Zero-shot 模式**：直接将用户自然语言指令输入 Gorilla，模型基于训练时记忆的 API 知识生成调用
- **检索增强模式**：先通过检索器（BM25 或 GPT-Index）从 API 数据库中检索最相关的文档，拼接后输入模型

> ⚠️ **注意**：论文发现检索增强并不总是提升性能。在某些情况下（如 BM25 检索 HuggingFace API），检索到的噪声文档反而会降低准确率。这说明检索器的质量对最终效果至关重要。

##### 实验结果与关键发现

![准确率 vs 幻觉率](https://ar5iv.labs.arxiv.org/html/2305.15334/assets/x2.png)
*图：各模型在不同设置下的准确率与幻觉率对比。理想位置为右下角（高准确率、低幻觉率）。*

**主要实验结果**（Table 1 核心数据）：

| 模型 | Torch Hub 准确率 | HuggingFace 准确率 | TF Hub 准确率 |
|------|:-:|:-:|:-:|
| GPT-3.5 (0-shot) | 82.39% | 30.34% | 57.30% |
| GPT-4 (0-shot) | 82.39% | 48.28% | 77.53% |
| Gorilla (0-shot) | **83.79%** | **60.34%** | **83.15%** |
| Claude (0-shot) | 31.69% | 16.55% | 42.13% |
| LLaMA (0-shot) | 0% | 0% | 0% |

关键发现：

1. **Gorilla 在 zero-shot 设置下全面超越 GPT-4**：尽管仅有 7B 参数，Gorilla 在三个 API 数据集上均优于 GPT-4，尤其在 HuggingFace（60.34% vs 48.28%）和 TF Hub（83.15% vs 77.53%）上优势显著

2. **幻觉率显著降低**：Gorilla 的幻觉率（编造不存在的 API）远低于基线模型。GPT-3.5 在 HuggingFace 上的幻觉率高达 62.07%，而 Gorilla 仅为 35.17%

3. **检索增强的双刃剑效应**：Oracle 检索器（提供完美文档）能大幅提升所有模型的性能，但实际检索器（BM25/GPT-Index）的效果因数据集而异。在 Torch Hub 上 GPT-Index 检索将 Gorilla 准确率提升至 90.14%，但在 HuggingFace 上 BM25 检索反而导致性能下降

##### 适应 API 文档变更

![API 文档变更适应](https://ar5iv.labs.arxiv.org/html/2305.15334/assets/x6.png)
*图：Gorilla 通过检索增强训练适应 API 文档的实时变更，包括模型升级（ResNet-50→ResNet-101）和仓库迁移。*

检索增强训练赋予 Gorilla 一个独特优势：**无需重新训练即可适应 API 变更**。当 API 文档更新时（如模型版本升级、仓库地址迁移），只需更新检索数据库中的文档，Gorilla 在推理时即可自动使用最新信息生成正确的 API 调用。这对于快速迭代的 ML 生态系统尤为重要。

##### 与传统方法的对比

| 维度 | 传统 LLM (GPT-4) | Toolformer | Gorilla |
|------|:-:|:-:|:-:|
| API 知识来源 | 预训练语料（静态） | 少量手工定义的工具 | 1,600+ 真实 API + 检索增强 |
| 文档更新适应 | 需重新训练 | 不支持 | 检索器实时更新 |
| 幻觉控制 | 无专门机制 | N/A | AST 验证 + 检索增强 |
| 约束感知 | 有限 | 不支持 | 支持参数量/精度等约束 |
| 评估方法 | 字符串匹配 | 执行结果 | AST 子树匹配 |

#### 🧪 练习题
```yaml
question: "Gorilla 的检索增强训练（Retriever-Aware Training）在推理时的主要优势是什么？"
options:
  - "提升模型的推理速度"
  - "使模型能够适应 API 文档的实时变更，无需重新训练"
  - "减少模型的参数量以降低部署成本"
  - "消除模型对检索器的依赖，实现完全零样本推理"
answer: 1
explain: "检索增强训练使 Gorilla 学会从拼接的文档中提取 API 信息，因此推理时只需更新检索数据库中的文档即可适应 API 变更，无需重新微调模型。"
```

### ToolLLM

```yaml
id: toolllm
num: 6
name: ToolLLM
full_name: 工具大模型 (ToolLLM)
year: '2024'
org: 清华大学
parent: gorilla
paper_url: https://proceedings.iclr.cc/paper_files/paper/2024/hash/28e50ee5b72e90b50e7196fde8ea260e-Abstract-Conference.html
project_url: ''
category: tool_use
motivation: DFSDT推理策略支持万级API泛化
```

#### 📝 一句话总结
ToolLLM 提出从 16,464 个真实 REST API 自动构造 ToolBench，并用 DFSDT 搜索生成高质量工具调用轨迹，训练出能泛化到未见 API 的 ToolLLaMA。

#### 🎯 核心要点
- **ToolBench 数据集**：从 RapidAPI 收集 16,464 个真实 REST API，覆盖 49 个类别
- **三阶段数据构建**：API collection、instruction generation、solution path annotation
- **多场景指令**：覆盖单工具、同类别多工具、跨集合多工具等复杂工具使用场景
- **DFSDT 推理策略**：Depth-First Search-based Decision Tree 允许模型回溯、放弃坏分支并扩展新路径
- **ToolLLaMA**：在 LLaMA-2 7B 上微调，并把上下文长度扩展到 8192 以容纳 API 响应
- **神经 API 检索器**：用指令和 API 文档的表示相似度召回相关 API，降低万级 API 池检索成本
- **ToolEval 自动评测**：用 Pass Rate 和 Win Rate 衡量可执行性与回答质量，并与人工评测保持较高一致性

#### 🔬 深入细节
##### 核心示意图

![ToolLLM 框架图](https://ar5iv.labs.arxiv.org/html/2307.16789/assets/x1.png)
*图：ToolLLM/ToolBench 的构建、训练和评测流程。API 文档经指令生成与 DFSDT 标注形成训练轨迹，ToolLLaMA 在推理时由 API 检索器提供候选工具。图源：ar5iv 论文 HTML。*

##### 算法伪代码

```python
# ToolLLM 中 DFSDT 标注与 ToolLLaMA 推理伪代码
def dfsdt_annotate(instruction, api_docs, max_depth, max_branch):
    root = Node(history=[], status="open")
    stack = [root]
    while stack:
        node = stack.pop()
        if node.depth >= max_depth:
            continue

        children = chatgpt_expand_distinct_actions(
            instruction=instruction,
            api_docs=api_docs,
            history=node.history,
            num=max_branch
        )
        for action in children:
            if action.name == "Finish with Final Answer" and is_valid(action):
                return node.history + [action]
            if action.name == "Finish by Giving Up":
                continue
            response = execute_api(action.api_name, action.parameters)
            stack.append(Node(history=node.history + [(action, response)]))
    return None

def toolllama_infer(query, api_index):
    candidate_apis = retrieve_top_k(api_index, query)
    history = []
    while not finished(history):
        thought, api_name, params = toolllama.generate_action(query, candidate_apis, history)
        observation = execute_api(api_name, params)
        history.append((thought, api_name, params, observation))
    return toolllama.generate_final_answer(query, history)
```

##### 方法解读

ToolLLM 解决的是开放源 LLM 的工具使用数据不足问题。普通指令微调数据主要训练聊天、问答和写作，缺少“读 API 文档、选择 API、构造参数、解析返回值、继续多轮调用”的轨迹。ToolLLM 选择从 RapidAPI 的真实 REST API 出发，把 API 文档本身作为工具学习的基础。

数据构建分三步。第一步爬取并过滤 API 文档，保留名称、描述、HTTP 方法、必填/可选参数、请求体、代码片段和示例返回。第二步用 ChatGPT 根据 API 生成自然语言指令，覆盖单工具和多工具组合。第三步为每条指令标注可执行解决路径，也就是一串 Thought、API Name、Parameters、Response，最终形成监督微调样本。

DFSDT 是论文最关键的标注策略。普通 ReAct 只有一条线性轨迹，某一步参数错了就容易进入错误循环；DFSDT 把候选工具调用看成决策树节点，用深度优先搜索优先追踪一条可能成功的路径，同时允许模型调用 “Finish by Giving Up” 放弃坏分支。形式上可把轨迹写为 \(\tau=\{(a_t,r_t)\}_{t=1}^{T}\)，每次扩展根据 \(p(a_t \mid \tau_{<t}, x, \mathcal{A})\) 生成多个候选动作。

ToolLLaMA 的训练目标是让模型在给定用户指令、候选 API 文档和历史观察时预测下一步动作。相比 Gorilla 更偏向生成单个 API 调用，ToolLLM 更强调多步工具交互和大 API 池泛化。推理阶段通过神经检索器先取回少量相关 API，再由模型多轮决策，避免把 16k API 全部塞进上下文。

ToolEval 解决评测难题：真实 API 经常变化，且一个任务可能存在多条合法调用路径。论文因此使用 ChatGPT 评估 Pass Rate 和 Win Rate，并用多次评估提高稳定性。Pass Rate 衡量是否在预算内完成任务，Win Rate 衡量两条解决轨迹哪条更有用。

> 💡 关键：ToolLLM 的核心不是“让模型记住 16k API”，而是让模型学会阅读 API 文档、检索候选工具，并在可回溯搜索生成的轨迹上学习多步工具使用模式。

#### 🧪 练习题
```yaml
question: "ToolLLM 中 DFSDT 相比普通 ReAct 的主要优势是什么？"
options:
  - "把 API 文档压缩成更短的 prompt"
  - "在多条候选工具调用路径上搜索，允许放弃错误分支并回溯"
  - "完全取消 API 执行，只预测最终答案"
  - "只适用于单工具调用任务"
answer: 1
explain: "DFSDT 把工具调用轨迹组织为决策树，通过深度优先扩展和放弃坏节点来提高复杂指令的可标注性和成功率。"
```

### LLM Compiler

```yaml
id: llm_compiler
num: 7
name: LLM Compiler
full_name: LLM编译器 (LLM Compiler)
year: '2024'
org: Meta AI
parent: toolllm
paper_url: https://openreview.net/forum?id=uQ2FUoFjnF
project_url: ''
category: tool_use
motivation: 并行函数调用架构降低多工具延迟
```

#### 📝 一句话总结
LLMCompiler 提出一种面向多工具调用的“编译器式”执行框架，把用户问题编译成带依赖关系的任务 DAG，再按依赖并行调度函数调用，解决 ReAct 式逐步思考-调用带来的高延迟、高成本和中间观测干扰问题。

#### 🎯 核心要点
- 三段式架构：Function Calling Planner 负责任务分解与依赖生成，Task Fetching Unit 负责就绪任务调度与变量替换，Executor 负责异步并行执行工具。
- 关键表示：把自然语言请求转成形如 `$1 = search(...)`、`$3 = math($1 / $2)` 的任务列表，本质上是一个带占位变量的有向无环图。
- 并行策略：独立任务立即并行执行，依赖任务等待前驱结果回填后再触发，整体延迟由关键路径而不是任务总数决定。
- 流式 Planner：Planner 可以边生成任务边发送给调度单元，避免等待完整计划生成后才开始执行。
- 动态重规划：当执行结果决定后续分支时，Executor 可把中间结果反馈给 Planner，重新生成下一阶段任务图。
- 兼容性：只要求用户提供工具定义和可选 in-context 示例，可用于闭源 GPT 系列和开源 LLaMA 系列。
- 实验覆盖：HotpotQA、Movie Recommendation、ParallelQA、Game of 24、WebShop 等多种函数调用依赖模式。

#### 🔬 深入细节
![LLMCompiler 框架示意图](https://raw.githubusercontent.com/SqueezeAILab/LLMCompiler/main/figs/thumbnail.png)
*图：官方仓库中的 LLMCompiler 总览图，展示 Planner 将问题拆成任务图、调度器按依赖发射任务、Executor 并行执行工具的整体流程。*

LLMCompiler 的出发点是：多工具调用并不一定必须像 ReAct 那样“想一步、调一个工具、把结果塞回 prompt、再想下一步”。例如“比较 Microsoft 和 Apple 市值差距”这类问题，两个搜索调用彼此独立，只有后续数学运算依赖二者结果。如果强制顺序执行，延迟近似为每个工具延迟与每次 LLM 思考延迟之和；如果先显式建模依赖图，就可以让独立搜索并行发生，只在真正的数据依赖处同步。

论文把这种过程类比为传统编译器优化。程序编译器会识别指令之间的数据依赖，尽量并行化独立指令；LLMCompiler 则把自然语言任务“编译”为函数调用任务图。形式化地，可把 Planner 输出记为一个 DAG：

$$
G=(V,E), \quad v_i=(tool_i, args_i), \quad (v_j, v_i)\in E \Rightarrow args_i \text{ 依赖 } output_j
$$

任意时刻的可执行任务集合是：

$$
R_t=\{v_i\in V \mid \forall (v_j,v_i)\in E,\; output_j \text{ 已完成}\}
$$

Task Fetching Unit 每轮贪心取出 \(R_t\) 中的任务，替换参数中的占位变量，再交给 Executor 并行执行。于是系统延迟从顺序执行的 \(T_{seq}\approx\sum_i T(v_i)+nT_{LLM}\) 变为近似关键路径延迟 \(T_{dag}\approx T_{plan}+\max_{path\in G}\sum_{v_i\in path}T(v_i)\)。这也是它能在高度可并行问题上明显降低延迟和成本的核心原因。

```python
# LLMCompiler 核心执行伪代码

def llm_compiler(user_query, tool_defs, planner_examples=None):
    # 1. Planner: 用 LLM 生成带依赖的任务列表
    # 例：$1 = search("Microsoft market cap")
    #    $2 = search("Apple market cap")
    #    $3 = math("$1 / $2")
    task_dag = planner_llm.generate_dag(
        query=user_query,
        tools=tool_defs,
        examples=planner_examples,
        syntax="indexed_tasks_with_placeholders",
    )

    memory = {}          # task_id -> tool output
    running = set()
    finished = set()

    while not task_dag.all_done():
        ready = []
        for task in task_dag.tasks:
            if task.id in finished or task.id in running:
                continue
            if all(dep in finished for dep in task.dependencies):
                # 2. TFU: 将 $dep 占位符替换成真实工具输出
                task.args = substitute_placeholders(task.args, memory)
                ready.append(task)

        # 3. Executor: 所有就绪任务异步并行执行
        futures = [executor.submit(task.tool, task.args) for task in ready]
        running.update(task.id for task in ready)

        for task, result in wait_any_or_all(ready, futures):
            memory[task.id] = result
            running.remove(task.id)
            finished.add(task.id)

        # 4. 动态重规划：如果工具结果暴露出新分支，则回到 Planner
        if needs_replanning(memory):
            new_tasks = planner_llm.replan(user_query, memory, tool_defs)
            task_dag.extend(new_tasks)

    return final_answer_llm(user_query, memory)
```

Planner 的难点不在“调用 LLM”，而在让 LLM 输出一个可执行的中间表示。论文使用预定义 prompt 约束语法：每个任务都有编号、工具名、参数，参数中可以引用前面任务的编号作为占位符。这样，依赖关系不需要另写邻接表，TFU 只要扫描参数里的 `$1`、`$2` 等引用就能知道任务何时可运行。用户只需提供工具定义和可选示例，类似函数签名加少量“如何拆任务”的 few-shot 样例。

Task Fetching Unit 是 LLMCompiler 中最像系统组件的部分：它不需要 LLM 推理，只做依赖解析、队列调度和变量替换。它采用贪心策略，一旦某个任务所有前驱都完成就立刻发射给 Executor；如果 Planner 启用流式输出，TFU 甚至不必等待完整 DAG 生成。这个设计把“规划开销”与“工具执行开销”重叠起来，类似 CPU 指令流水线，用后续任务生成时间掩盖已经就绪工具的执行时间。

Executor 则把每个工具调用视为独立任务运行，并为任务保留独立 memory。与 ReAct 把每次 observation 都拼回同一个长 prompt 不同，LLMCompiler 只把必要的前驱输出注入后继参数，减少无关中间结果对后续推理的干扰。这解释了论文中不仅看到延迟下降，还观察到部分任务准确率提升：错误循环、重复调用、基于局部 observation 过早停止等 ReAct 常见失败会被显式 DAG 执行部分缓解。

动态重规划补足了静态 DAG 的边界。有些任务像简单搜索-计算可以一次性编译；但 Game of 24 或交互式 WebShop 这类任务，下一步取决于中间状态。LLMCompiler 的做法不是放弃并行，而是在必要时把 Executor 的结果反馈给 Planner，生成下一段任务图。这相当于运行时重新编译：静态可知的部分尽量并行，不可知的分支在结果出现后再规划。

与 ReAct 相比，LLMCompiler 的核心差异是把“推理轨迹”变成“执行计划”。ReAct 的优势是灵活，每一步都能看见上一步结果；代价是每个工具调用都需要一次新的 LLM 决策，且 prompt 越滚越长。LLMCompiler 假设许多函数调用依赖可以提前抽取，于是把 LLM 的主要职责前移到 Planner，后续执行尽量交给确定性的调度器和异步工具系统。这种设计尤其适合搜索、数据库查询、API 聚合、批量分析等天然存在独立子任务的 agent 场景。

> 💡 关键：LLMCompiler 并不是让模型“更会调用单个工具”，而是让系统“更会安排多个工具调用的执行顺序”。它优化的是 agent 运行时的依赖图和关键路径。

#### 🧪 练习题
```yaml
question: "LLMCompiler 相比 ReAct 降低多工具调用延迟的最核心机制是什么？"
options:
  - "把所有工具调用都替换成一个更大的 LLM 调用"
  - "先生成带依赖关系的任务图，并并行执行互不依赖的工具调用"
  - "禁止模型读取任何中间工具结果"
  - "只使用闭源模型的并行 function calling API"
answer: 1
explain: "LLMCompiler 的关键是 Planner 生成任务 DAG，TFU/Executor 根据依赖并行调度就绪任务，使总延迟更接近关键路径而不是顺序路径。"
```

### ToolACE

```yaml
id: toolace
num: 8
name: ToolACE
full_name: 工具调用王牌 (ToolACE)
year: '2025'
org: 浙江大学
parent: toolllm
paper_url: https://proceedings.iclr.cc/paper_files/paper/2025/hash/663865ea167425c6c562cb0b6bcf76c7-Abstract-Conference.html
project_url: ''
category: tool_use
motivation: 自动化数据合成提升函数调用准确率
```

#### 📝 一句话总结
ToolACE 提出一个面向 LLM 函数调用训练的数据合成与验证流水线，通过工具自进化、能力自适应对话生成和双层校验，解决真实工具调用数据难收集、合成数据覆盖不足且错误率高的问题。

#### 🎯 核心要点
- 三模块流水线：Tool Self-evolution Synthesis (TSS)、Self-Guided Dialog Generation (SDG)、Dual-Layer Validation Process (DLV)。
- 大规模 API 池：论文构建了 26,507 个多领域、多约束、多参数形态的 API，用于提升工具多样性。
- TSS 三步：Speciation 建 API context tree，Adaptation 为每个 API 采样领域和功能复杂度，Evolution 递归改写 API 定义并扩充参数、约束与返回值。
- SDG 多智能体生成：user agent、assistant agent、tool agent 角色扮演生成单工具、并行工具、依赖工具和非工具使用对话。
- 自引导复杂度：用待微调模型自身的 loss 判断样本是否过易或过难，再动态调节用户 query 的复杂度。
- 多格式泛化：将工具定义和调用转换为 JSON、YAML、XML、Markdown、自然语言等格式，降低模型对单一 schema 的过拟合。
- DLV 双层验证：规则层检查 API 名、必填参数、参数格式、对话结构；模型层检查幻觉、语义一致性和工具返回是否匹配 API 定义。

#### 🔬 深入细节
![ToolACE 总体框架图](https://arxiv.org/html/2409.00920v1/x1.png)
*图：ToolACE 整体框架，由 TSS 工具自进化、SDG 自引导对话生成和 DLV 双层校验组成。*

ToolACE 的问题设定非常具体：函数调用能力不是单靠通用指令数据就能学好，模型需要看到大量“工具描述 → 用户意图 → 参数抽取 → 调用执行 → 结果整合”的样本。但真实 API 对话难以规模化收集和标注，普通合成方法又容易出现工具覆盖窄、参数不合法、调用和用户意图不一致等问题。ToolACE 因此把数据生产拆成“先造足够多样的工具，再围绕工具生成合适难度的对话，最后用可执行约束验证”的流水线。

第一步 TSS 负责扩展工具空间。论文从预训练语料中的 API 文档、产品说明、用户手册等材料出发，抽取应用领域与功能，形成 API context tree。可以把这棵树理解成工具能力的 taxonomy：根节点是大领域，例如 finance、health、transport；下层节点是更细粒度功能，例如 get stock price、book appointment、track shipment。生成某个 API 时，系统从树中采样子树，让 API 获得不同覆盖范围和功能组合。

TSS 的三个子步骤分别控制“从哪里来、复杂到什么程度、如何继续变化”。Speciation 建立领域和功能树，保证工具覆盖不局限在少数热门 API；Adaptation 为每个 API 指定领域和多样性水平，例如只覆盖单一节点的简单 API，或覆盖多个子功能的复杂 API；Evolution 则用 LLM 根据当前子树和示例 API 生成新定义，并通过添加功能、参数、约束、返回字段、嵌套类型等方式持续变异。这个过程最终形成了论文报告的 26,507 个 API 池。

```python
# ToolACE 数据合成核心伪代码：TSS + SDG + DLV

def toolace_pipeline(raw_api_docs, target_llm):
    # 1. TSS: 从预训练/公开文档构造 API context tree
    context_tree = build_api_context_tree(raw_api_docs)
    api_pool = []
    template_buffer = seed_api_templates()

    for domain_subtree in sample_subtrees(context_tree):
        api_template = sample(template_buffer)
        api = frontier_llm.synthesize_api(
            domain=domain_subtree.domain,
            functionalities=domain_subtree.nodes,
            template=api_template,
            constraints=["parameter types", "required fields", "return schema"],
        )
        api = evolve_api(api, mutations=[
            "add_parameter", "change_type", "add_constraint",
            "expand_return_schema", "add_nested_structure",
        ])
        if rule_check_api_definition(api):
            api_pool.append(api)
            template_buffer.update(distill_template(api))

    # 2. SDG: 根据目标模型能力生成合适难度的工具对话
    dialogs = []
    for _ in range(num_samples):
        tools = sample_same_domain_tools(api_pool)
        dialog = []
        while not finished(dialog):
            query = user_agent.generate_or_complicate(dialog, tools)
            action_candidates = [assistant_agent.act(query, tools) for _ in range(k)]
            action = majority_vote(action_candidates)  # self-consistency
            tool_result = tool_agent.execute_or_simulate(action, tools)
            dialog.extend([query, action, tool_result])

            loss = target_llm_loss(target_llm, dialog)
            if loss < lower_bound:
                user_agent.increase_complexity()
            elif loss > upper_bound:
                user_agent.decrease_complexity()

        dialogs.append(format_generalization(dialog, formats=["json", "yaml", "xml", "markdown"]))

    # 3. DLV: 规则校验 + 模型校验
    verified = []
    for sample in dialogs:
        if not rule_verifier(sample):
            continue
        if not model_verifier(sample, checks=["hallucination", "consistency", "tool_response"]):
            continue
        verified.append(sample)

    return verified
```

SDG 的关键不是“随便让 LLM 编对话”，而是让生成数据贴近待训练模型的最近发展区。论文观察到：候选 API 越多、实际调用 API 越多、用户 query 与 API 描述越不相似，样本通常越难。ToolACE 用目标 LLM 对样本的 loss 作为复杂度信号。一个可实现的表达是：

$$
\mathcal{L}(x,y;M)=-\frac{1}{|y|}\sum_{t=1}^{|y|}\log p_M(y_t\mid x,y_{<t})
$$

其中 \(x\) 包含系统指令、工具列表、对话历史，\(y\) 是应生成的函数调用或 assistant 响应。若目标模型已经低 loss 正确生成，说明样本太简单；若微调后仍高 loss，说明样本可能超出当前能力。SDG 据此维护一个合适复杂度区间 \([\tau_{low},\tau_{high}]\)，并通过 user agent 调节 query：太简单就增加 API 数量、并行/依赖关系或语义绕写；太难就减少工具数量或让意图更贴近 API 描述。

多智能体生成是 ToolACE 保证数据结构完整的核心机制。User agent 负责提出需求或补充信息，assistant agent 负责判断是否调用工具、调用哪个工具、填哪些参数、是否需要追问，tool agent 负责模拟 API executor 返回结果。论文中特别强调 assistant action 的 self-consistency：同一状态下生成多个候选动作，只有决策一致时才采用。这比单次采样更稳，因为函数调用数据中一个错参数或错工具名都会污染监督信号。

ToolACE 还显式覆盖四类对话：single function call、parallel function call、dependent function call 和 non-tool-use dialogs。这个设计非常重要，因为真实 agent 既要知道“该调用哪个工具”，也要知道“何时不该调用工具”。例如用户信息不足时应追问；工具列表无关时应拒绝或普通回答；多个城市天气查询可并行；先查航班再订票则是依赖调用。缺少这些负例和结构差异，模型容易学成“看见工具就调用”。

DLV 利用了函数调用数据的可验证性。规则层可以确定性检查 API 名是否在 tool list 中、必填参数是否齐全、参数类型和 regex pattern 是否符合 schema、对话 role 顺序是否正确、tool response 是否有对应调用。模型层再处理规则难以覆盖的语义问题：参数值是否凭空捏造、assistant 最终回答是否满足用户约束、模拟工具返回是否符合 API 定义含义。相比一般聊天数据，工具调用样本有更强结构，因此 ToolACE 能把验证做成流水线而不是纯人工抽查。

> 💡 关键：ToolACE 的贡献不是单个新模型结构，而是“数据生产系统”。它把 API 多样性、query 复杂度、格式泛化和可验证性同时纳入合成闭环，让小参数模型也能通过高质量函数调用数据获得强工具能力。

#### 🧪 练习题
```yaml
question: "ToolACE 用目标 LLM 的 loss 指导数据生成复杂度，主要是为了解决什么问题？"
options:
  - "让所有样本都尽可能复杂，从而最大化训练难度"
  - "让生成样本处在目标模型可学习但尚未掌握的难度区间"
  - "完全替代规则校验层，避免写 schema 检查规则"
  - "减少 API 池数量，防止工具覆盖过大"
answer: 1
explain: "ToolACE 借鉴最近发展区思想：太简单的样本贡献小，太难的样本学不会，因此用 loss 动态调节 query 和工具调用复杂度。"
```

### CoT

```yaml
id: cot
num: 9
name: CoT
full_name: 思维链 (Chain-of-Thought)
year: '2022'
org: Google
parent: —
paper_url: https://arxiv.org/abs/2201.11903
project_url: ''
category: planning
motivation: 激发中间推理步骤提升复杂推理
```

#### 📝 一句话总结
Chain-of-Thought Prompting 提出在 few-shot 示例中加入自然语言中间推理步骤，使大语言模型在不微调参数的情况下显著提升算术、常识和符号推理能力。

#### 🎯 核心要点
- 核心形式：将 few-shot 示例从 `<input, output>` 扩展为 `<input, chain of thought, output>`。
- 不需要训练：CoT 是纯 prompting 方法，不要求构造大规模 rationale 数据集进行微调。
- 适用任务：论文系统评估 arithmetic reasoning、commonsense reasoning、symbolic reasoning 三类复杂推理。
- 规模涌现：CoT 的收益主要出现在足够大的模型上，小模型可能无法稳定利用或生成有效推理链。
- 示例数量：数学推理实验中主要使用 8 个手写 CoT exemplar，AQuA 多选任务使用训练集中的 4 个示例。
- 解释性收益：中间步骤为模型答案提供可读推理轨迹，便于定位语义理解错误、计算错误或缺失步骤。
- 代表结果：PaLM 540B 在 GSM8K 上用 CoT few-shot prompt 达到强于 standard prompting 的效果，并超过当时带 verifier 的 finetuned GPT-3 基线。

#### 🔬 深入细节
![Chain-of-Thought Prompting 示例图](https://ar5iv.labs.arxiv.org/html/2201.11903/assets/x1.png)
*图：CoT Figure 1，对比 standard prompting 直接给答案与 chain-of-thought prompting 先生成中间推理步骤再给答案。*

CoT 的基本观察是：很多复杂任务不是缺少最终答案格式，而是缺少可展开的中间计算过程。标准 few-shot prompting 给模型若干“问题-答案”对，模型只能学习输入到输出的短映射；但数学题、日期推理、硬币翻转、最后字母拼接等任务需要多步状态更新。如果 prompt 中展示“如何一步步到达答案”，大模型就能在测试样本上模仿这种中间过程，把原本压缩在一次前向生成中的推理显式展开。

论文将 CoT 定义为自然语言中间步骤序列。对第 \(i\) 个示例，普通 few-shot 使用 \((x_i,y_i)\)，而 CoT 使用三元组：

$$
(x_i, z_i, y_i)
$$

其中 \(x_i\) 是输入问题，\(z_i\) 是 chain of thought，\(y_i\) 是最终答案。测试时给定上下文 \(\mathcal{D}_{cot}=\{(x_i,z_i,y_i)\}_{i=1}^{k}\)，模型生成：

$$
(z_*, y_*) \sim p_\theta(\cdot \mid \mathcal{D}_{cot}, x_*)
$$

也就是先输出中间推理 \(z_*\)，再输出最终答案 \(y_*\)。关键在于 \(z_*\) 不是监督训练出的隐藏变量，而是在自然语言空间中由 prompt 诱导出来的显式生成序列。

```python
# Chain-of-Thought Prompting 推理伪代码

def build_cot_prompt(exemplars, test_question):
    prompt = ""
    for q, rationale, answer in exemplars:
        prompt += f"Q: {q}\n"
        prompt += f"A: {rationale} The answer is {answer}.\n\n"
    prompt += f"Q: {test_question}\nA:"
    return prompt


def cot_inference(model, exemplars, test_question):
    prompt = build_cot_prompt(exemplars, test_question)
    completion = model.generate(
        prompt,
        decoding="greedy",   # 论文主实验多使用 greedy decoding
        stop=None,
    )
    rationale = extract_reasoning_steps(completion)
    final_answer = extract_after_answer_phrase(completion)
    return rationale, final_answer
```

CoT 与“解释答案”表面相似，但顺序相反。许多 explainable QA 数据是在答案之后附解释，而 CoT 要求模型在最终答案之前先写中间步骤。这个顺序对自回归模型很关键，因为生成第 \(t\) 个 token 时只能条件化于左侧上下文。先生成推理链相当于给后续答案 token 增加了中间计算 scratchpad，使答案可以依赖前面已经写出的局部结果。

从概率分解看，标准 prompting 直接建模：

$$
p_\theta(y\mid x,\mathcal{D}_{std})
$$

CoT 则把最终答案的生成拆成：

$$
p_\theta(z,y\mid x,\mathcal{D}_{cot})=p_\theta(z\mid x,\mathcal{D}_{cot})\cdot p_\theta(y\mid x,z,\mathcal{D}_{cot})
$$

这不是改变模型参数，而是改变条件分布中的可见上下文。直觉上，模型先把“隐式思考”外化为 token 序列，再基于这段序列回答；因此对于多步问题，它获得了更多生成步数来存储中间变量、检查局部关系和执行简单计算。

论文强调 CoT 的收益具有规模依赖。小模型即使看到 CoT 示例，也可能只是生成格式相似但逻辑无效的文字；随着模型规模增大，模型更可能掌握“把问题分解成有效步骤”的模式。实验中，CoT 在 PaLM 540B、GPT-3 175B 等大模型上带来显著提升，尤其是 GSM8K 这类多步数学题；而在较小模型或单步任务上，收益不稳定甚至可能很小。

CoT 的另一个重要贡献是把推理 prompting 从数学题扩展到了更广任务。论文展示了常识问答、StrategyQA、日期理解、体育语义判断、最后字母拼接、硬币翻转状态跟踪、SayCan 机器人规划等示例。这说明“中间自然语言步骤”不只服务算术计算，也能表达实体属性比较、时间偏移、状态奇偶性、字符串操作和行动计划。

与微调 rationale 模型相比，CoT 的成本非常低。它只需要少量手写 exemplar，不需要为每个任务收集大规模推理标注，也不需要训练新 checkpoint。与普通 few-shot prompting 相比，它提供了更强的任务归纳偏置：模型不仅看到答案格式，还看到答案生成过程。代价是上下文更长、推理链可能不忠实、错误步骤可能诱导错误答案，并且对模型规模和 exemplar 质量敏感。

> ⚠️ 注意：CoT 生成的文字推理不等于模型内部真实因果机制的完整解释。它是有用的可见中间表示，能提升和诊断推理，但仍可能出现“看似合理但答案错误”或“推理有瑕疵但答案碰巧正确”的情况。

#### 🧪 练习题
```yaml
question: "Chain-of-Thought Prompting 相比标准 few-shot prompting 的关键变化是什么？"
options:
  - "在训练集中加入更多无标签文本"
  - "在示例答案前加入自然语言中间推理步骤"
  - "把最终答案隐藏起来，只训练模型生成解释"
  - "要求模型调用外部计算器完成所有推理"
answer: 1
explain: "CoT 将示例从输入-输出对扩展为输入-中间推理-输出三元组，诱导模型测试时先生成推理链再给最终答案。"
```

### Self-Consistency

```yaml
id: self_consistency
num: 10
name: Self-Consistency
full_name: 自一致性 (Self-Consistency)
year: '2022'
org: Google
parent: cot
paper_url: https://arxiv.org/abs/2203.11171
project_url: ''
category: planning
motivation: 多路采样投票选出一致答案
```

#### 📝 一句话总结
Self-Consistency 提出了一种"采样—边际化"解码策略，通过对大语言模型的 Chain-of-Thought 推理进行多路采样并以多数投票选出最一致的答案，无需额外训练即可大幅提升复杂推理任务的准确率。

#### 🎯 核心要点
- **替换贪心解码**：用多路采样（temperature / top-k / nucleus sampling）替代 CoT 中的贪心解码，生成多条多样化推理路径
- **多数投票聚合**：对采样得到的多条推理路径的最终答案执行多数投票（majority vote），选出出现次数最多的答案
- **加权投票变体**：可选地用模型输出概率 \(P(\mathbf{r}_i, \mathbf{a}_i \mid \text{prompt}, \text{question})\) 对每条路径加权后再聚合
- **完全无监督**：不需要额外训练、微调、验证器或人工标注，直接在预训练模型上即插即用
- **"自集成"思想**：区别于传统多模型集成，Self-Consistency 在单一模型上通过采样实现多样性
- **广泛的基准验证**：在 GSM8K（+17.9%）、SVAMP（+11.0%）、AQuA（+12.2%）、StrategyQA（+6.4%）、ARC-challenge（+3.9%）等基准上取得显著提升
- **跨模型泛化**：在 UL2-20B、GPT-3-175B、LaMDA-137B、PaLM-540B 四种不同规模模型上均有效
- **对采样策略和不完美 prompt 鲁棒**：不同采样参数和含有错误的 prompt 下均能稳定提升性能

#### 🔬 深入细节
##### 核心示意图

![Self-Consistency 方法示意图](https://ar5iv.labs.arxiv.org/html/2203.11171v1/assets/x1.png)
*图：Self-Consistency 方法的三步流程——(1) 使用 CoT 提示语言模型；(2) 从解码器中采样生成多条多样化推理路径；(3) 边际化推理路径，通过多数投票选出最一致的答案。*

##### 算法伪代码

```python
# Self-Consistency 伪代码
def self_consistency(model, prompt, question, num_samples=40, temperature=0.5):
    """
    输入: 语言模型 model, CoT 提示 prompt, 问题 question
    输出: 最一致的答案
    """
    answers = []
    for i in range(num_samples):
        # Step 1 & 2: 采样一条推理路径 + 答案
        reasoning_path, answer = model.sample(
            prompt + question, temperature=temperature
        )
        answers.append(answer)
    
    # Step 3: 多数投票 — 边际化推理路径，选出最一致答案
    answer_counts = Counter(answers)
    best_answer = answer_counts.most_common(1)[0][0]
    return best_answer
```

##### 动机与背景

Chain-of-Thought (CoT) 提示通过让语言模型生成中间推理步骤，显著提升了多步推理任务的表现。然而，CoT 默认使用**贪心解码**（greedy decoding），即每一步只选择概率最高的 token。这种策略存在两个关键缺陷：

1. **局部最优**：贪心解码容易陷入次优的推理路径，一旦某一步出错就无法纠正；
2. **缺乏多样性**：同一个问题只产生一条推理路径，无法利用"殊途同归"的直觉——即正确答案往往可以通过多种不同的推理方式得出。

Self-Consistency 的核心洞察来自人类认知：**如果多条不同的思考路径都指向同一个答案，我们对该答案的信心就会更高**。这一直觉在心理学中被称为"双过程理论"（Stanovich & West, 2000），即深思熟虑的问题通常存在多种合理的推理方式。

##### 核心机制：采样—边际化

Self-Consistency 的方法可以形式化为一个潜变量模型。给定提示（prompt）和问题（question），模型生成一组 \(m\) 条输出 \((\mathbf{r}_i, \mathbf{a}_i)\)，其中 \(\mathbf{r}_i\) 是推理路径（latent variable），\(\mathbf{a}_i\) 是最终答案。

**多数投票（Majority Vote）**——最简单也最有效的聚合方式：

$$\hat{a} = \operatorname*{arg\,max}_{a} \sum_{i=1}^{m} \mathbb{1}(\mathbf{a}_i = a)$$

即选择在 \(m\) 条采样路径中出现次数最多的答案。这等价于将推理路径 \(\mathbf{r}_i\) 边际化（marginalize out），只关注最终答案的一致性。

**加权投票变体**——可以进一步利用模型的输出概率进行加权：

$$\hat{a} = \operatorname*{arg\,max}_{a} \sum_{i=1}^{m} \mathbb{1}(\mathbf{a}_i = a) \cdot P(\mathbf{r}_i, \mathbf{a}_i \mid \text{prompt}, \text{question})$$

其中条件概率可以通过长度归一化计算：

$$P(\mathbf{r}_i, \mathbf{a}_i \mid \text{prompt}, \text{question}) = \exp\left(\frac{1}{K}\sum_{k=1}^{K} \log P(t_k \mid \text{prompt}, \text{question}, t_1, \ldots, t_{k-1})\right)$$

> 💡 **关键发现**：论文实验表明，简单的无权重多数投票（unweighted majority vote）在大多数任务上已经与加权投票表现相当甚至更好，因此推荐使用最简单的多数投票策略。

##### 采样策略与路径数量

Self-Consistency 兼容多种采样策略：

- **Temperature Sampling**：通过调节温度参数 \(T\) 控制输出多样性（论文中 \(T=0.5\) 效果较优）
- **Top-k Sampling**：只从概率最高的 \(k\) 个 token 中采样（论文中 \(k=40\)）
- **Nucleus Sampling**：从累积概率达到 \(p\) 的最小 token 集合中采样（论文中 \(p=0.95\)）

论文通过实验验证了**采样路径数量**的影响：从 1 条增加到 40 条，性能持续提升。例如在 GSM8K 上，PaLM-540B 从 CoT 的 56.5% 提升到 Self-Consistency（40 路径）的 74.4%。

> ⚠️ **注意**：Self-Consistency 的计算开销与采样路径数量成正比。在实际应用中需要在性能提升和推理成本之间权衡。

##### 与传统方法的区别

| 方法 | 是否需要额外训练 | 是否需要多个模型 | 核心思想 |
|------|:---:|:---:|------|
| Greedy CoT | ❌ | ❌ | 单路径贪心解码 |
| Sample-and-Rank | ❌ | ❌ | 采样后按模型概率排序选最优 |
| Verifier (Cobbe et al.) | ✅ | ✅ | 训练额外验证器打分 |
| 模型集成 | ✅ | ✅ | 多模型输出聚合 |
| **Self-Consistency** | **❌** | **❌** | **单模型多路采样 + 多数投票** |

Self-Consistency 的核心优势在于：**零额外成本**（无需训练、无需标注、无需辅助模型），仅通过改变解码策略就能获得类似集成学习的效果，本质上是一种"自集成"（self-ensemble）方法。

#### 🧪 练习题
```yaml
question: "Self-Consistency 方法在聚合多条推理路径的答案时，默认采用什么策略？"
options:
  - "选择模型输出概率最高的那条推理路径的答案"
  - "对所有推理路径的答案取多数投票（majority vote）"
  - "训练一个额外的验证器对每条路径打分"
  - "使用 beam search 选择全局最优路径"
answer: 1
explain: "Self-Consistency 的核心是将推理路径作为潜变量边际化，通过多数投票选出出现次数最多的答案，无需额外训练或模型。"
```

### ReAct

```yaml
id: react
num: 11
name: ReAct
full_name: 推理与行动协同 (ReAct)
year: '2022'
org: Google/普林斯顿
parent: cot
paper_url: https://arxiv.org/abs/2210.03629
project_url: ''
category: planning
motivation: 交替执行推理与行动支持动态环境
```

#### 📝 一句话总结
ReAct 提出让语言模型在同一条轨迹中交替生成 `Thought` 与 `Action`，解决纯 Chain-of-Thought 不能接入外部世界、纯行动模型缺少高层规划和可解释记忆的问题。它把“推理指导行动”和“行动反馈修正推理”闭环到提示式 agent 中，使 LLM 能在问答、事实验证、文字环境和网页购物等动态任务中边查、边想、边做。

#### 🎯 核心要点
- 统一轨迹格式：将自由文本推理痕迹、任务动作、环境观测组织为 `Thought -> Action -> Observation` 的交错序列
- 核心机制：推理痕迹用于分解目标、维护工作记忆、更新计划和处理异常，动作调用 Wikipedia API、文本游戏环境或网页环境以获取新观测
- 两类使用方式：知识密集型任务采用密集的思考-行动-观测循环，长时序决策任务采用稀疏推理并让模型在关键步骤自行插入思考
- 关键对比：相对 CoT，ReAct 能通过外部观测减少幻觉和错误传播；相对 Act-only，ReAct 能显式表达目标分解和状态跟踪
- 实验覆盖：HotpotQA、FEVER、ALFWorld、WebShop；在 QA/事实验证上与 CoT 互补，在 ALFWorld 和 WebShop 上用极少样例超过大量监督或强化学习训练的 act-only 基线
- 工程启发：不需要更新模型权重，主要依赖任务动作空间、少量 in-context 示例和可解析的环境返回，因此成为后续工具调用 agent 的基础范式

#### 🔬 深入细节
![ReAct 方法总览](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg_0lCKXSvFq4yyjM5PGdM27OF6LWco9qFGQS1dwa3DtEF8AnAuXg9Q_nPDVyAArYwl9sGsB000-iuKJuSsNjo--fi1ZCJbrj-KwsZ6M569nWg-h2xRGHkdvQobUY9RiIr4MYkathIFyiAHZSnHAwVUfeijU-tCLyaHRgqXQah1XObtE71a00IbGdywVw/s16000/image1.png)
*图：Google Research 对 ReAct 的模型总览说明，核心区别是让 LM 同时产生内部推理痕迹和面向环境的文本动作。*

ReAct 的出发点是把两条原本分离的路线合并起来。CoT 让模型写出中间推理，但这些推理完全来自模型内部参数，遇到开放世界事实、网页状态或文字游戏状态时容易把错误假设一路传下去；Act-only 方法可以执行搜索、点击、移动、拾取等动作，但通常只是把当前观察直接映射为下一个动作，缺少“为什么这样做”的计划层。ReAct 把二者放进同一个上下文窗口：模型先用自然语言压缩当前目标和不确定性，再选择动作让环境返回新证据，随后用新观测修正下一步推理。

一个 ReAct agent 的上下文可以写成：

$$
c_t = x \oplus (h_1, a_1, o_2) \oplus \cdots \oplus (h_{t-1}, a_{t-1}, o_t)
$$

其中 \(x\) 是任务输入，\(h_t\) 是第 \(t\) 步的 reasoning trace，\(a_t\) 是动作，\(o_t\) 是环境观测。每一步由同一个冻结语言模型根据当前上下文生成推理和动作：

$$
(h_t, a_t) \sim p_\theta(\cdot \mid c_t), \qquad o_{t+1}=\operatorname{Env}(a_t)
$$

随后把 \(h_t\)、\(a_t\)、\(o_{t+1}\) 追加回上下文。这个公式强调 ReAct 不是传统 RL 中通过梯度更新策略参数的算法，而是一种 in-context policy：策略改进发生在上下文状态中，环境反馈通过文本观测改变后续 token 分布。

```python
# ReAct 推理-行动循环伪代码
context = few_shot_react_examples + task_input
observation = initial_observation(task_input)

for step in range(max_steps):
    thought = LM.generate(context, prefix="Thought:")
    action = LM.generate(context + thought, prefix="Action:")

    if action.startswith("Finish["):
        return parse_answer(action)

    observation = environment.step(action)
    context += format_trace(thought, action, observation)

return fallback_answer(context)
```

在 HotpotQA 和 FEVER 这类知识密集型任务中，动作空间通常被设计成 `Search[entity]`、`Lookup[string]`、`Finish[answer]`。例如模型先写出“需要找某人物所属组织”，再调用搜索动作，拿到 Wikipedia 摘要后继续写出“现在要验证第二个实体”，这样查询目标由推理决定，推理证据又由查询结果补充。论文发现 ReAct 单独使用时不一定在所有问答指标上超过 CoT，因为 CoT 的内部知识和多步演算仍然有价值；但 ReAct 与 CoT 结合后能同时利用内部知识与外部检索，在 HotpotQA 和 FEVER 上成为最强的提示式组合。

在 ALFWorld 和 WebShop 这类长时序交互任务中，每一步都写很长的推理会消耗上下文并降低执行效率，因此论文采用稀疏推理：提示样例只在关键节点插入 `Thought`，让模型在需要重新规划、从失败中恢复、解释观测或检查目标进度时再写推理。这个设计体现了 ReAct 的一个重要实践原则：推理不是越多越好，而是要放在能改变动作选择的位置。对文字环境来说，`Thought` 相当于临时工作记忆，记录“已经拿到什么、还缺什么、下一步去哪”；`Action` 则必须满足环境语法，例如 `go to kitchen`、`take apple` 或网页中的搜索、点击、购买。

ReAct 与传统规划或强化学习的差异在于，它没有显式学习状态价值函数，也没有在训练时探索环境获得大规模轨迹，而是借助预训练 LLM 已具备的语言先验来即时构造策略。这个优势使它在少样本设置下非常轻量，但也带来局限：如果动作空间描述不清、环境观测过长、或模型在 `Thought` 中写入错误事实，后续动作仍会被误导。因此 ReAct 的可解释性不仅是展示推理链，更是调试接口：人可以直接检查哪条 thought 引入了错误，并通过编辑提示或加入反馈来改变下一步动作。

> 💡 关键：ReAct 的核心不是“多写一段思考”，而是把思考放在环境交互回路中，使 \(h_t\) 能选择更好的 \(a_t\)，而 \(o_{t+1}\) 又能纠正下一轮 \(h_{t+1}\)。

#### 🧪 练习题
```yaml
question: "ReAct 相比普通 Chain-of-Thought 的关键改进是什么？"
options:
  - "把所有推理步骤隐藏起来，只输出最终答案"
  - "在推理过程中穿插可执行动作，并用环境观测更新后续推理"
  - "通过反向传播持续微调语言模型参数"
  - "只保留搜索动作，完全取消自然语言推理"
answer: 1
explain: "ReAct 的核心是 Thought、Action、Observation 的交替闭环；它仍使用自然语言推理，但推理会被外部环境返回的证据动态修正。"
```

### Plan-and-Solve

```yaml
id: plan_and_solve
num: 12
name: Plan-and-Solve
full_name: 计划求解 (Plan-and-Solve)
year: '2023'
org: 新加坡国立大学
parent: cot
paper_url: https://aclanthology.org/2023.acl-long.147/
project_url: ''
category: planning
motivation: 先制定计划再逐步执行
```

#### 📝 一句话总结
Plan-and-Solve (PS) Prompting 提出用"先制定计划、再逐步执行"的提示策略替换 Zero-shot-CoT 的"Let's think step by step"，并通过附加细粒度指令（提取变量、关注计算）形成 PS+ 变体，在零样本设置下显著减少推理步骤遗漏和计算错误，性能媲美甚至超越少样本 CoT 方法。

#### 🎯 核心要点
- **两阶段零样本提示框架**：Step 1 生成包含计划与推理过程的文本，Step 2 提取最终答案
- **PS 提示**：将触发句从"Let's think step by step"替换为"Let's first understand the problem and devise a plan to solve the problem. Then, let's carry out the plan and solve the problem step by step"
- **PS+ 提示**：在 PS 基础上增加三条细粒度指令——"extract relevant variables and their corresponding numerals"、"calculate intermediate results"、"pay attention to calculation and commonsense"
- **三类错误分析**：系统识别 Zero-shot-CoT 的三大缺陷——计算错误 (7%)、推理步骤遗漏 (12%)、语义误解 (27%)
- **广泛评测**：覆盖 10 个数据集、3 类推理问题（算术推理、常识推理、符号推理），使用 GPT-3 (text-davinci-003) 作为骨干模型
- **核心结果**：PS+ 零样本在算术推理平均准确率 76.7%，超越 Zero-shot-CoT (70.4%) 和 Zero-shot-PoT (73.5%)，接近 8-shot Manual-CoT (77.6%)
- **与自一致性 (Self-Consistency) 兼容**：PS+ + SC 在 GSM8K 达 73.7%，SVAMP 达 84.4%

#### 🔬 深入细节
##### 问题背景与动机

Zero-shot-CoT 通过在提示末尾附加"Let's think step by step"来引导 LLM 生成推理链，虽然简单有效，但作者对 GSM8K 数据集上 100 个错误样本的分析揭示了三类系统性缺陷：

![Zero-shot-CoT 错误分析](https://ar5iv.labs.arxiv.org/html/2305.04091/assets/x1.png)
*图 1：Zero-shot-CoT 在 GSM8K 上的错误类型分布——计算错误 7%、步骤遗漏 12%、语义误解 27%*

其中，**步骤遗漏错误**（Missing-Step Error）是 PS 方法的主要攻克目标：当问题涉及多个推理步骤时，LLM 容易跳过中间步骤直接给出答案。作者认为，这是因为"Let's think step by step"缺乏对任务分解的显式引导。

##### 核心方法：Plan-and-Solve Prompting

![PS 与 Zero-shot-CoT 对比](https://ar5iv.labs.arxiv.org/html/2305.04091/assets/x2.png)
*图 2：(a) Zero-shot-CoT 与 (b) Plan-and-Solve 提示的输入输出对比*

PS Prompting 的核心思想极为简洁——将提示模板从：

> Q: [问题]. A: Let's think step by step.

替换为：

> Q: [问题]. A: Let's first understand the problem and **devise a plan** to solve the problem. Then, let's **carry out the plan** and solve the problem step by step.

这一改动引导 LLM 先将复杂问题分解为子任务（计划阶段），再按计划逐步执行（求解阶段），从而减少步骤遗漏。

##### PS+ 提示：细粒度指令增强

![PS 与 PS+ 对比](https://ar5iv.labs.arxiv.org/html/2305.04091/assets/x3.png)
*图 3：(a) PS Prompting 与 (b) PS+ Prompting 的对比——PS+ 通过附加指令显著提升推理质量*

PS+ 在 PS 的基础上添加了三条关键指令：

1. **"extract relevant variables and their corresponding numerals"**——强制 LLM 提取问题中的关键变量和数值，避免遗漏重要信息
2. **"calculate intermediate results"**——要求 LLM 显式计算中间结果，而非跳步推理
3. **"pay attention to calculation and commonsense"**——提醒 LLM 注意计算准确性和常识一致性

完整的 PS+ 提示模板为：

```text
Q: [问题]. A: Let's first understand the problem, extract relevant variables
and their corresponding numerals, and make a plan. Then, let's carry out
the plan, calculate intermediate variables (pay attention to correct
numerical calculation and commonsense), solve the problem step by step,
and show the answer.
```

##### 两步推理流程伪代码

```python
# Plan-and-Solve (PS+) 两步推理流程
def plan_and_solve_plus(question, llm):
    # Step 1: 推理生成
    prompt_step1 = f"Q: {question}. A: Let's first understand the problem, "
                   f"extract relevant variables and their corresponding numerals, "
                   f"and make a plan. Then, let's carry out the plan, "
                   f"calculate intermediate variables (pay attention to correct "
                   f"numerical calculation and commonsense), solve the problem "
                   f"step by step, and show the answer."
    reasoning_text = llm.generate(prompt_step1, temperature=0)  # 贪心解码

    # Step 2: 答案提取
    prompt_step2 = prompt_step1 + reasoning_text + \
                   "\nTherefore, the answer (arabic numerals) is"
    answer = llm.generate(prompt_step2, temperature=0)
    return answer
```

> 💡 **关键设计**：与 Zero-shot-CoT 完全一致的两步框架（生成 + 提取），仅修改 Step 1 的触发句，无需任何示例、无需额外模型或工具，实现即插即用。

##### 实验结果与分析

**算术推理（6 个数据集）**：

| 方法 | MultiArith | GSM8K | AddSub | AQuA | SingleEq | SVAMP | 平均 |
|------|-----------|-------|--------|------|----------|-------|------|
| Zero-shot-CoT | 83.8 | 56.4 | 85.3 | 38.9 | 88.1 | 69.9 | 70.4 |
| Zero-shot-PoT | 92.2 | 57.0 | 85.1 | 43.9 | 91.7 | 70.8 | 73.5 |
| **Zero-shot-PS** | 87.2 | 58.2 | 88.1 | 42.5 | 89.2 | 72.0 | 72.9 |
| **Zero-shot-PS+** | **91.8** | **59.3** | **92.2** | **46.0** | **94.7** | **75.7** | **76.7** |
| 8-shot Manual-CoT | 93.6 | 58.4 | 91.6 | 48.4 | 93.5 | 80.3 | 77.6 |

PS+ 在所有算术数据集上均大幅超越 Zero-shot-CoT（平均 +6.3%），在 5/6 个数据集上超越 Zero-shot-PoT，且与 8-shot Manual-CoT 仅差 0.9%。

**常识推理**：PS+ 在 CommonsenseQA 上达 71.9%（vs CoT 65.2%），StrategyQA 上达 65.4%（vs CoT 63.8%）。

**符号推理**：PS+ 在 Last Letter 上达 75.2%，甚至超越 8-shot Manual-CoT（70.6%）。

##### 错误类型消融分析

| 方法 | 计算错误 | 步骤遗漏 | 语义误解 |
|------|---------|---------|---------|
| Zero-shot-CoT | 7% | 12% | 27% |
| Zero-shot-PS | 7% | 10% | 26% |
| Zero-shot-PS+ | **5%** | **7%** | 27% |

> ⚠️ **局限性**：PS+ 有效减少了计算错误（7%→5%）和步骤遗漏（12%→7%），但对语义误解错误（27%）几乎无改善——这类错误源于 LLM 自身的理解能力上限，难以仅通过提示工程解决。

##### 提示设计的关键发现

作者通过 6 种不同触发句的对比实验（Table 5）揭示了重要规律：

- 单独使用"extract variables"指令（Prompt 3）反而导致性能下降（GSM8K: 50.5% vs 56.4%），因为缺少计划制定的引导
- **"devise a plan + carry out the plan"是性能提升的核心驱动力**（Prompt 5: GSM8K 58.2%）
- 在计划框架上叠加细粒度指令才能获得最佳效果（Prompt 6/PS+: GSM8K 59.3%）

相关性分析进一步证实：生成文本中包含变量定义和推理计划与计算错误、步骤遗漏呈**负相关**，验证了 PS+ 的设计直觉。

##### 与传统方法的核心区别

| 维度 | Zero-shot-CoT | Plan-and-Solve (PS+) |
|------|--------------|---------------------|
| 触发策略 | 单一指令"think step by step" | 结构化指令：计划→提取变量→执行→计算 |
| 任务分解 | 隐式依赖 LLM 自发分解 | 显式要求 LLM 先制定计划 |
| 计算引导 | 无 | 明确要求提取数值、计算中间结果 |
| 示例需求 | 零样本 | 零样本（无需人工示例） |
| 额外工具 | 无 | 无（纯提示方法） |

#### 🧪 练习题
```yaml
question: "Plan-and-Solve Prompting 相比 Zero-shot-CoT 最核心的改进是什么？"
options:
  - "使用更大的语言模型来提升推理能力"
  - "在提示中加入少量人工标注的推理示例"
  - "将触发句替换为先制定计划再逐步执行的结构化指令"
  - "引入外部 Python 解释器执行计算"
answer: 2
explain: "PS Prompting 的核心创新是将'Let's think step by step'替换为包含'devise a plan'和'carry out the plan'的结构化触发句，引导 LLM 先分解任务再逐步求解，无需示例或外部工具。"
```

### ToT

```yaml
id: tot
num: 13
name: ToT
full_name: 思维树 (Tree of Thoughts)
year: '2023'
org: 普林斯顿/Google DeepMind
parent: cot
paper_url: https://proceedings.neurips.cc/paper/2023/hash/271db9922b8d1f4dd7aaef84ed5ac703-Abstract.html
project_url: ''
category: planning
motivation: 树结构推理支持搜索与回溯
```

#### 📝 一句话总结
ToT 提出把 LLM 的中间推理单元组织成可搜索的树，解决 CoT 只能沿单一路径自左向右生成、难以局部探索和全局回溯的问题。它用语言模型同时生成候选 thought、评价中间状态，并结合 BFS/DFS 等搜索算法在多条推理路径之间做选择。

#### 🎯 核心要点
- 推理单元升级：将 CoT 中连续生成的 token 序列抽象为语义完整的 `thought`，例如一道中间算式、一个写作计划或一个填字候选词
- 树搜索框架：每个节点表示输入与已生成 thoughts 组成的部分解，边表示新增一个候选 thought
- 四个设计问题：如何分解 thought、如何生成候选 thought、如何评价状态、使用哪种搜索算法
- 候选生成策略：可从 CoT prompt 独立采样多个 thought，也可用 propose prompt 顺序提出不重复候选
- 状态评价策略：可对每个状态独立打分或分类，也可让 LM 在多个状态之间投票选择更有前途的分支
- 搜索实例：Game of 24 和 Creative Writing 使用 BFS 保留每层最优状态，Mini Crosswords 使用 DFS、剪枝和回溯处理更深的组合搜索
- 实验任务：Game of 24、Creative Writing、Mini Crosswords；在 Game of 24 中 GPT-4 CoT 仅解决 4% 测试题，而 ToT 在宽度为 5 时达到 74%

#### 🔬 深入细节
![ToT 框架示意图](https://arxiv.org/html/2305.10601/x1.png)
*图：论文 Figure 1 对比 IO、CoT、CoT-SC 与 ToT。ToT 不再只采样完整链路，而是维护一棵可评价、可剪枝、可回溯的 thought tree。*

ToT 的核心动机来自一个很具体的缺陷：自回归 LLM 默认按 token 从左到右生成，一旦早期中间步骤选错，后续 token 往往只能在错误前提上继续补全。CoT 虽然把最终答案前的思考显式化，但通常仍是一条线；Self-Consistency 采样多条完整 CoT 后投票，能增加多样性，却缺少“在第 1 步发现某个中间 thought 不好就停止探索”的局部控制。ToT 把问题求解视为搜索问题，让模型在每一层产生多个备选 thought，然后用语言化的启发式评价决定保留、扩展或回溯。

论文把一个中间状态形式化为：

$$
s_t = [x, z_1, z_2, \ldots, z_t]
$$

其中 \(x\) 是原始输入，\(z_i\) 是第 \(i\) 个 thought。候选生成器 \(G_\theta\) 负责从状态 \(s_t\) 扩展下一层：

$$
Z_{t+1} = G_\theta(s_t, k) = \{z_{t+1}^{(1)}, \ldots, z_{t+1}^{(k)}\}
$$

状态评价器 \(V_\theta\) 再为新状态给出启发式价值，例如数值分、`sure/maybe/impossible` 分类，或在一组状态中投票：

$$
v(s_{t+1}) = V_\theta([x, z_1, \ldots, z_{t+1}])
$$

搜索算法据此保留 top-\(b\) 个状态。这里的 \(G_\theta\) 和 \(V_\theta\) 都可以由同一个 LLM 通过不同 prompt 实现，因此 ToT 不要求训练新的价值网络；它把传统启发式搜索中的手写评价函数替换成语言模型的自评和比较。

```python
# ToT-BFS 简化伪代码
states = [initial_state(x)]
for t in range(max_depth):
    candidates = []
    for state in states:
        thoughts = generate_thoughts(LM, state, k)
        for thought in thoughts:
            candidates.append(state.append(thought))

    scored = [(evaluate_state(LM, s), s) for s in candidates]
    states = select_top_b(scored, breadth=b)

return choose_final_output(states)
```

```python
# ToT-DFS 简化伪代码
def dfs(state, depth):
    if depth == max_depth:
        record_solution(state)
        return

    candidates = generate_thoughts(LM, state, k)
    scored = sort_by_value(candidates, key=lambda z: evaluate_state(LM, state.append(z)))

    for value, thought in scored:
        if value < prune_threshold:
            continue
        dfs(state.append(thought), depth + 1)
```

thought 的粒度是 ToT 是否有效的关键。如果 thought 太小，例如单个 token，LM 很难判断它对最终解是否有意义；如果 thought 太大，例如一次生成完整文章或完整证明，搜索又退化为普通多样本采样。论文在不同任务中采用不同粒度：Game of 24 的 thought 是一步中间算式，Creative Writing 的 thought 是一个段落级写作计划，Mini Crosswords 的 thought 是某个横向或纵向词的候选填充。这个选择让每个节点既足够短，可以展开多个候选，又足够有语义，可以被 LM 评价前景。

在 Game of 24 中，ToT 的生成器会根据当前剩余数字提出下一步算式，例如把 `4 9 10 13` 扩展成 `13 - 9 = 4 (left: 4 4 10)` 等候选；评价器则判断剩余数字是否 `sure`、`maybe` 或 `impossible` 达到 24。BFS 每层保留最有希望的若干状态，避免把计算预算浪费在显然不可能的分支。这个过程解释了为什么 ToT 可以远超 CoT：CoT 第一步如果选错算式，完整链路大概率失败；ToT 可以在第一层同时保留多个算式，并用 lookahead 式语言判断淘汰明显坏的路径。

在 Creative Writing 中，状态是否好很难用硬规则判断，因此论文采用投票式评价：先采样多个写作计划，让 LM 比较哪一个最能满足四个给定句子的结尾约束，再基于最佳计划生成文章。Mini Crosswords 则更接近传统约束搜索，DFS 根据候选词置信度向深处探索，如果某个状态导致任何剩余 clue 被判为 impossible，就剪掉该子树并回溯。由此可以看出 ToT 的本质是一个可插拔框架：同样是 thought tree，不同任务可以换 thought 粒度、生成 prompt、评价 prompt 和搜索策略。

与 CoT、CoT-SC 的区别可以用树的宽度和深度理解。IO prompting 是深度几乎为 0 的直接映射；CoT 是宽度为 1 的单链；CoT-SC 是采样多条完整链后只在叶子层投票；ToT 则允许在中间层做局部选择、剪枝和回溯。它的代价是调用 LM 次数显著增加，且自评不一定可靠；但对于需要战略前瞻、组合搜索和早期决策纠错的问题，这种额外计算能换来远强于线性解码的全局控制。

> ⚠️ 注意：ToT 并不是要求模型“输出树状文本”，而是外部推理程序把多次 LM 生成与评价组织成树搜索；LM 既是生成器，也是启发式评价器。

#### 🧪 练习题
```yaml
question: "Tree of Thoughts 相比 CoT-SC 的主要区别是什么？"
options:
  - "ToT 只采样一个最终答案，因此成本更低"
  - "ToT 在中间 thought 层级进行生成、评价、剪枝和回溯，而不是只对完整推理链投票"
  - "ToT 必须训练一个新的神经网络价值函数"
  - "ToT 只能用于数学题，不能用于写作或填字任务"
answer: 1
explain: "CoT-SC 通常采样完整链路后做叶子层聚合；ToT 把每个中间 thought 当作搜索节点，在过程中持续评价和选择分支。"
```

### Reflexion

```yaml
id: reflexion
num: 14
name: Reflexion
full_name: 反思机制 (Reflexion)
year: '2023'
org: Northeastern大学
parent: react
paper_url: https://proceedings.neurips.cc/paper_files/paper/2023/hash/1b44b878bb782e6954cd888628510e90-Abstract-Conference.html
project_url: ''
category: planning
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

### LATS

```yaml
id: lats
num: 15
name: LATS
full_name: 语言智能体树搜索 (LATS)
year: '2023'
org: UIUC
parent: tot
paper_url: https://arxiv.org/abs/2310.04406
project_url: ''
category: planning
motivation: 统一推理行动于蒙特卡洛树搜索
```

#### 📝 一句话总结
LATS 提出了把语言模型放进蒙特卡洛树搜索中的 Language Agent Tree Search，用树搜索同时管理思考、动作、环境反馈和自反思，解决 ReAct/CoT 类方法只沿单一路径采样、难以回溯和规划的问题。

#### 🎯 核心要点
- 将语言智能体的状态定义为原始输入、历史动作序列和历史观察序列的组合，使推理步骤与外部行动步骤都能成为树节点。
- 用 MCTS 的 selection、expansion、evaluation、simulation、backpropagation、reflection 六个操作组织推理与行动。
- 复用同一个预训练 LM 作为策略生成器、状态价值评估器和失败轨迹反思器，不需要梯度训练新的 value model。
- 引入外部环境反馈，例如 QA 检索 API、代码测试结果、WebShop 网页观察，将真实反馈纳入搜索而不是只依赖 LM 内部知识。
- 用 UCT 在高价值节点与低访问节点之间做探索-利用权衡，避免 ReAct 式贪心轨迹中的早期错误锁死后续推理。
- 价值函数结合 LM 自评与 self-consistency 分数，论文中对不同任务使用 \\(\lambda\\) 控制二者权重。
- 失败终止时生成 verbal self-reflection，并把反思写入记忆，作为后续 rollout 的语义梯度。
- 在 HumanEval、HotPotQA、WebShop、Game of 24 等任务上验证，重点展示树搜索、外部反馈与反思的组合收益。

#### 🔬 深入细节
![LATS 总体框架图](https://ar5iv.labs.arxiv.org/html/2310.04406v3/assets/x1.png)
*图：LATS 把 LLM Agent、环境、记忆、上下文、自评/反思和 Tree Search 连接成闭环。智能体向环境发出 action，环境返回 observation/reward，树搜索根据 value 选择下一步。*

![LATS 六个核心操作](https://ar5iv.labs.arxiv.org/html/2310.04406v3/assets/x5.png)
*图：论文 Figure 3 展示 LATS 的 selection、expansion、evaluation、simulation、backpropagation、reflection 六步。*

```python
# LATS 核心流程伪代码，按论文 Algorithm 1 简化
initialize_tree(root_state)
initialize_value_and_visit_counter(V, N)
memory = []

for trajectory_id in range(k):
    s = root_state
    path = [s]

    for depth in range(d):
        if not expanded(s):
            children = []
            for i in range(n):
                action = sample_lm_action(policy_lm, s, memory)
                observation, reward, done = env.step_from_state(s, action)
                child = make_state(s, action, observation)

                lm_score = value_lm_score(child)
                sc_score = self_consistency_score(child)
                V[child] = lambda_ * lm_score + (1 - lambda_) * sc_score
                N[child] = 1
                children.append(child)
            attach_children(s, children)

        s = argmax_child(
            s,
            key=lambda child: V[child] + w * sqrt(log(N[s]) / N[child])
        )
        N[s] += 1
        path.append(s)

        if is_terminal(s) or is_output_action(s):
            break

    reward = env.final_reward(s)
    for node in path:
        V[node] = (V[node] * (N[node] - 1) + reward) / N[node]

    if reward < success_threshold:
        reflection = reflection_lm(path, reward)
        memory.append({"trajectory": path, "reflection": reflection})
    else:
        return extract_answer_or_action_sequence(s)

return best_terminal_state_by_value(tree)
```

LATS 的动机来自两个局限：第一，CoT 和 ReAct 都主要沿着一个自回归轨迹向前走，早期一步的错误会在后续上下文中被放大；第二，ToT/RAP 虽然引入搜索，但通常偏向内部推理，不能自然吸收环境观测、测试失败、网页状态这类外部反馈。LATS 的关键转折是把每一步的“thought/action + observation”看成可回滚的状态，语言任务中的回滚不需要真实物理环境倒带，只需要把历史文本上下文恢复到某个节点即可。因此，树搜索在语言智能体里变得便宜且通用：节点是文本状态，边是 LM 采样出来的行动或思考，环境反馈也变成后续 prompt 的一部分。

论文把节点写作包含原始任务、动作历史和观察历史的状态，可概括为：

$$
s_t = \left(x, a_{1:t}, o_{1:t}\right)
$$

其中 \\(x\\) 是原始输入，\\(a_{1:t}\\) 既可以是自然语言 thought，也可以是搜索、点击、提交代码等可执行 action，\\(o_{1:t}\\) 是外部环境返回的 observation。这个定义让 LATS 同时覆盖纯推理任务和交互式决策任务：在 Game of 24 中 observation 可以很少，主要依赖内部推理；在 WebShop 中 observation 是网页反馈；在 HumanEval 中 observation 是编译器和测试用例反馈。相比把 LM 当作一次性生成器，LATS 把 LM 当作可被搜索算法反复查询的策略先验。

Selection 使用 UCT 公式在 exploitation 与 exploration 之间做权衡。对当前节点 \\(s\\) 的一个候选子节点 \\(s'\\)，可写成：

$$
\operatorname{UCT}(s') = V(s') + w\sqrt{\frac{\ln N(s)}{N(s')}}
$$

这里 \\(V(s')\\) 是该子树的估计价值，\\(N(s)\\) 与 \\(N(s')\\) 是父子节点访问次数，\\(w\\) 是探索强度。直觉上，高价值节点会被继续利用，但访问次数少的节点也会因为第二项得到额外奖励。这样 LATS 不会只选择当前 LM 评分最高的一条路径，而是保留“看起来还没充分探索”的备选分支；这正是它相对 ReAct 的核心优势。

Expansion 阶段从当前状态一次采样 \\(n\\) 个候选动作，而不是只取一个 greedy 输出。动作空间由具体任务决定：HotPotQA 中可以是 search/lookup/answer 等 API 操作与思考文本，WebShop 中可以是网页导航动作，HumanEval 中可以是完整代码解。每个动作都送入环境，环境反馈被拼回新状态。由于 LATS 把环境 observation 显式放入节点，树搜索不是在纯文本幻想里模拟世界，而是在真实工具/环境响应上推进。

Evaluation 是 LATS 适配 LM 的关键。传统 MCTS 往往需要一个训练好的 value network 或 rollout policy，LATS 则用 prompt 让 LM 对当前状态给出进度评分，再结合 self-consistency 形成状态价值：

$$
\hat V(s) = \lambda p_V(s) + (1-\lambda)\operatorname{SC}(s)
$$

其中 \\(p_V(s)\\) 是 LM 自评价值，\\(\operatorname{SC}(s)\\) 表示从该状态继续推理时答案一致性的启发式分数。\\(\lambda\\) 越大，越相信 LM 的显式评分；越小，越依赖多样采样的一致性。这个设计的直觉是：LM 的自然语言判断很灵活，但会自信犯错；self-consistency 较粗糙，却能在多条候选轨迹收敛到相同答案时提供稳健信号。

Simulation 会沿着当前最有希望的分支继续扩展，直到达到终止动作、任务成功、失败或深度预算。终止后，Backpropagation 用真实 reward 更新路径上的节点价值：

$$
V(s) \leftarrow \frac{V(s)(N(s)-1)+r}{N(s)}
$$

这一步把环境最终反馈从叶节点传回根节点附近，使后续 selection 不只是参考局部 LM 打分，也参考曾经真实成功或失败的轨迹。对代码任务而言，reward 可以来自测试通过比例；对网页购物而言，可以来自目标属性匹配分；对 QA 任务而言，可以来自答案正确性反馈。

Reflection 则是 LATS 与普通 MCTS 最大的语义差异之一。失败轨迹不会只留下一个低 reward，而是交给 LM 生成文字反思：哪里走错、下次应尝试什么替代动作、哪些约束被忽略。这个 reflection 被放入记忆，并作为后续 agent 与 value function 的上下文。论文把它视为一种无需梯度更新的“语义梯度”：标量 reward 只能说明好坏，反思文本能说明为什么坏、如何改。

与 ToT 相比，LATS 不只是对 thought 做 BFS/DFS，而是把 action 与 observation 一并纳入搜索；与 RAP 相比，LATS 不要求 LM 充当世界模型去想象下一个状态，而是直接和环境交互；与 Reflexion 相比，LATS 不只在失败后重试，而是在树中系统性探索多个备选分支。代价是推理预算明显更高，并且要求环境能从历史状态恢复或至少能用文本上下文近似恢复。因此它更适合高价值、可验证、可回滚的困难任务，例如代码生成、工具调用、多跳问答和网页导航。

> 💡 关键：LATS 的本质不是“让 LLM 多想几步”，而是把 LLM 的生成能力拆成策略、价值和反思三个接口，再由 MCTS 管理搜索预算。

#### 🧪 练习题
```yaml
question: "LATS 相比 ReAct 的核心改进是什么？"
options:
  - "把语言模型微调成专用价值网络"
  - "用树搜索同时探索多条 thought/action 轨迹，并用环境反馈和反思更新节点价值"
  - "只保留最终答案，删除中间观察以节省上下文"
  - "完全依赖 self-consistency 投票，不再调用外部环境"
answer: 1
explain: "LATS 的核心是将 ReAct 式行动序列扩展为 MCTS 搜索树，节点价值由 LM 评估、环境反馈和失败反思共同塑造。"
```

### Retroformer

```yaml
id: retroformer
num: 16
name: Retroformer
full_name: 回顾式智能体 (Retroformer)
year: '2024'
org: Salesforce
parent: reflexion
paper_url: https://proceedings.iclr.cc/paper_files/paper/2024/hash/29f421fbdcc82aeb349d784d3aaccdb3-Abstract-Conference.html
project_url: ''
category: planning
motivation: 策略梯度优化反思模块加速学习
```

#### 📝 一句话总结
Retroformer 将 Reflexion 中的反思模块改造成可训练的 retrospective model，用环境奖励和策略梯度优化反思文本，从而在不更新 Actor LLM 的情况下提升语言智能体的学习速度和最终成功率。

#### 🎯 核心要点
- **可训练反思模块**：学习一个 plug-in retrospective model，而不是依赖冻结 LLM 直接自我反思
- **Actor LLM 固定**：把闭源或大规模 Actor LLM 视作环境的一部分，不反传梯度
- **环境奖励驱动**：利用任务成功率、分数或 reward-labeled 数据优化反思生成
- **策略梯度/RLHF 流程**：先用正样本 SFT，再进行 reward modeling 和 PPO 风格优化
- **自动 prompt refinement**：反思模型总结失败根因，并生成下一轮 Actor prompt 的行动建议
- **长上下文反思**：实验中使用 LongChat-7B-16k 类模型承载长轨迹与反馈
- **插件式适配**：可插入 ReAct/Reflexion 类 agent 架构，也可扩展到记忆或摘要模块

#### 🔬 深入细节
##### 核心示意图

![Retroformer 框架图](https://ar5iv.labs.arxiv.org/html/2308.02151/assets/x2.png)
*图：Retroformer 框架总览。冻结 Actor LLM 执行任务，retrospective model 根据历史轨迹与环境反馈生成改进 prompt，并通过策略优化学习更有用的反思。图源：ar5iv 论文 HTML。*

##### 算法伪代码

```python
# Retroformer 训练与推理伪代码
def collect_retroformer_data(actor_llm, retro_model, tasks, env, n_trials):
    dataset = []
    for task in tasks:
        memory = []
        for _ in range(n_trials):
            refined_prompt = retro_model.generate(task, memory)
            trajectory = actor_llm.run(refined_prompt, env)
            reward, feedback = env.evaluate(trajectory)
            dataset.append((task, memory, refined_prompt, trajectory, reward, feedback))
            memory.append((trajectory, reward, feedback))
    return dataset

def train_retroformer(retro_model, dataset):
    positive = [x for x in dataset if x.reward > success_threshold]
    retro_model.sft(positive)
    reward_model = train_reward_model(dataset)
    retro_model.ppo(
        prompts=[x.task_and_memory for x in dataset],
        reward_fn=lambda prompt, reflection: reward_model(prompt, reflection)
    )
    return retro_model

def run_retroformer(task, actor_llm, retro_model, env, max_trials):
    memory = []
    for _ in range(max_trials):
        prompt_update = retro_model.generate(task, memory)
        trajectory = actor_llm.run(prompt_update, env)
        reward, feedback = env.evaluate(trajectory)
        if env.success(reward):
            return trajectory
        memory.append((trajectory, reward, feedback))
```

##### 方法解读

Reflexion 的反思来自冻结 LLM，它可能只能复述过去行为，而不能准确定位失败根因。Retroformer 认为这本质上是 credit assignment 问题：哪一步行动导致最终失败，下一轮 prompt 应该怎样改？如果反思模块从未针对环境奖励训练，它生成的建议很容易泛泛而谈。

Retroformer 的架构把 Actor LLM 和环境一起视作黑盒。Actor 可以是 GPT-3、GPT-4 或其他无法微调的模型；环境提供状态转移和奖励。可训练部分是 retrospective model \(M_r\)，它读取用户任务、历史轨迹、奖励和反馈，输出一段 refined prompt 或行动计划给 Actor。

优化目标不是直接最大化 Actor 的 token 概率，而是让 \(M_r\) 生成的反思使后续轨迹获得更高奖励。可概括为：

$$\max_{\phi}\ \mathbb{E}_{y\sim M_\phi(\cdot\mid x,m)}[R(\tau(y))] - \beta\,\mathrm{KL}(M_\phi \parallel M_{\text{ref}})$$

其中 \(y\) 是反思文本，\(\tau(y)\) 是 Actor 在该反思指导下产生的轨迹，\(R\) 是环境奖励，KL 项约束反思模型不要偏离参考模型过远。

实践中，论文采用离线 RL 流程：先 rollout 冻结 Actor 和初始化反思模型，收集带评分数据；用高分样本做监督微调；再训练 reward model 并用 PPO 优化 retrospective model。这样避免在线直接对昂贵 Actor 大规模探索，同时仍能利用奖励信号改进反思。

与 Reflexion 相比，Retroformer 的学习发生在反思生成器参数中；与传统 RL 微调 LLM agent 相比，它不需要访问 Actor 参数，也不把梯度穿过外部环境和工具。这个折中适合云端闭源 LLM 场景：保留强 Actor 的能力，同时用小型反思模块针对任务奖励学习。

> 💡 关键：Retroformer 不是训练 Actor 怎么行动，而是训练“给 Actor 的下一轮提示应该如何总结失败和规划改进”。

#### 🧪 练习题
```yaml
question: "Retroformer 相比 Reflexion 的核心改进是什么？"
options:
  - "取消反思记忆，只保留一次性回答"
  - "用策略梯度优化一个可训练的 retrospective model 来生成更有用的反思"
  - "把所有环境反馈替换为人工标签"
  - "要求直接微调闭源 Actor LLM"
answer: 1
explain: "Retroformer 保持 Actor LLM 固定，训练反思模块利用环境奖励生成更能提升后续尝试的 prompt refinement。"
```

### CAMEL

```yaml
id: camel
num: 17
name: CAMEL
full_name: 交流式智能体 (CAMEL)
year: '2023'
org: KAUST
parent: —
paper_url: https://proceedings.neurips.cc/paper/2023/hash/a3621ee907def47c1b952ade25c67698-Abstract-Conference.html
project_url: ''
category: multi_agent
motivation: 角色扮演框架实现自主协作
```

#### 📝 一句话总结
CAMEL 提出了 role-playing 交流式多智能体框架，用任务指定器、AI User、AI Assistant 与 Inception Prompting 让两个聊天模型在明确角色约束下自主协作，解决复杂任务依赖人类持续提示和纠偏的问题。

#### 🎯 核心要点
- 提出 task-oriented role-playing 框架：人类只给初始 idea 与角色，后续由智能体互相指令和响应推进任务。
- 包含 Task Specifier、AI User、AI Assistant 三个核心角色，必要时可加入 Critic-in-the-loop 控制对话质量。
- AI User 扮演任务规划者，持续发出 instruction；AI Assistant 扮演任务执行者，返回具体 solution。
- 使用 Inception Prompting 在对话开始前写入任务、角色、通信协议、终止条件和禁止角色翻转等约束。
- 通过对称系统提示减少 role flipping、assistant repeats instruction、flake replies、infinite loop 等多智能体协作失败模式。
- 使用 `<CAMEL_TASK_DONE>` 作为终止信号，避免智能体在感谢、告别或空转对话中无限循环。
- 可将每轮对话转化为 instruction-solution 数据，用于研究 AI society 行为或生成指令微调数据。
- 论文构造并分析 AI Society、Code、Math、Science 等数据，其中 AI Society 由角色组合和任务生成流程规模化得到。
- Critic agent 可以在候选回复之间选择或给出反馈，使 role-playing 扩展到更接近树搜索的决策模式。

#### 🔬 深入细节
![CAMEL Role-Playing Framework](https://izualzhy.cn/assets/images/ai-paper/camel_figure_1.png)
*图：论文 Figure 1 的公开镜像。人类输入 idea 与角色后，Task Specifier 细化任务，AI User 与 AI Assistant 在 Role Playing Session 中通过指令-解决方案回合协作。*

```python
# CAMEL role-playing 核心流程伪代码
idea = human_input.idea
assistant_role, user_role = human_input.role_assignment

specified_task = task_specifier_llm(
    idea=idea,
    assistant_role=assistant_role,
    user_role=user_role,
)

assistant = ChatAgent(system_prompt=build_assistant_prompt(
    role=assistant_role,
    partner_role=user_role,
    task=specified_task,
    protocol="return concrete Solution and request Next request"
))
user = ChatAgent(system_prompt=build_user_prompt(
    role=user_role,
    partner_role=assistant_role,
    task=specified_task,
    protocol="send one Instruction with optional Input per turn"
))

messages = []
while True:
    instruction = user.generate_instruction(messages)
    if instruction == "<CAMEL_TASK_DONE>":
        break

    solution = assistant.solve(messages, instruction)

    if critic_enabled:
        solution = critic.select_or_refine(
            task=specified_task,
            history=messages,
            proposal=solution,
        )

    messages.append((instruction, solution))
```

CAMEL 的出发点很具体：当用户用聊天模型解决复杂任务时，真正困难的不是让模型回答一次，而是持续把对话推向正确方向。用户需要知道下一步该问什么、如何补充约束、何时结束、如何纠正跑偏。CAMEL 的设计把这个“持续提示的人类”替换为另一个智能体，也就是 AI User；把“执行请求的聊天模型”形式化为 AI Assistant。二者不是自由聊天，而是在预先写好的角色剧本中协作。

论文把对话历史形式化为 instruction-solution 对集合：

$$
M_t = \{(I_0,S_0),\ldots,(I_t,S_t)\}
$$

下一轮中，AI User 读取历史 \\(M_t\\) 并产生新指令：

$$
I_{t+1} = U(M_t)
$$

AI Assistant 再基于历史与新指令生成解决方案：

$$
S_{t+1} = A(M_t, I_{t+1})
$$

最后把新回合写回历史：

$$
M_{t+1} = M_t \cup \{(I_{t+1}, S_{t+1})\}
$$

这个公式看似简单，但它把多智能体协作压缩成一个可重复的数据生成算子：每轮都产生一个 instruction-solution pair，并且下一轮指令依赖此前所有 pair。因此 CAMEL 不仅是任务求解框架，也是合成对话数据的框架。只要系统提示足够稳定，就可以规模化生成“角色明确、任务导向、指令跟随”的多轮数据。

Task Specifier 是 CAMEL 中容易被忽略但很关键的模块。人类输入通常只是模糊 idea，例如“开发一个股票交易机器人”，并不天然适合直接交给两个智能体执行。Task Specifier 根据 assistant/user 的角色把 idea 细化成明确任务，使后续对话有共同目标。这个模块承担“想象力”和“任务收敛”两种功能：既把抽象意图扩展为具体可做的任务，又防止两个智能体在任务定义不清时发散。

Inception Prompting 是整套方法的控制核心。CAMEL 的 prompt engineering 只发生在角色扮演开始前，之后两个智能体自动互相 prompt。系统提示中写入四类约束：角色身份、共同任务、通信协议、终止条件。角色身份用于防止 role flipping，例如 assistant 不应该突然开始指挥 user；通信协议要求 user 每轮给出一条 instruction 和必要 input，assistant 返回具体 solution；终止条件让 user 在认为任务完成时输出 `<CAMEL_TASK_DONE>`。这些约束让开放式聊天变成可收集、可分析、可停止的协作流程。

CAMEL 论文特别强调多智能体协作的失败模式。Role flipping 会让执行者和规划者互换职责，导致对话结构崩掉；assistant repeats instruction 是模型看似响应但没有实际执行；flake replies 指 assistant 用“我将会……”这类承诺代替完成；infinite loop 则是两个 agent 反复感谢或告别。CAMEL 的提示模板并不是装饰，而是针对这些失败模式设计的行为边界。它说明在 LLM 多智能体系统中，“协议设计”与“模型能力”同样重要。

Critic-in-the-loop 提供了另一层可控性。基础 CAMEL 是二智能体回合制，但论文提出可以加入 critic agent 或人类 critic，对候选方案选择、打分或反馈。这样对话不再只是线性链条，而可以变成 proposal -> critique -> selection/refinement 的结构。它与后来的多智能体 debate、planner-executor-critic 架构有明显联系：规划者不直接保证正确性，而由批评者在关键节点施加选择压力。

与单 Agent 相比，CAMEL 的优势不是底层模型更强，而是把任务分解为两个互补角色：User 负责“下一步问什么”，Assistant 负责“如何完成这一步”。与 AutoGPT/BabyAGI 式任务队列不同，CAMEL 的状态主要是自然语言对话历史，而不是显式队列；与 ReAct 不同，CAMEL 的动作不是工具调用格式优先，而是角色间自然语言通信优先。因此它更适合研究“智能体社会”与协作行为，而不是单个 agent 的工具执行效率。

从数据角度看，CAMEL 的贡献也很重要。AI Society 数据通过自动生成 assistant roles、user roles 和 tasks 扩展到大量角色组合；Code 场景则用编程语言、领域和任务组合生成代码相关协作对话；Math/Science 场景进一步生成问题与解答。论文的重点不是这些数据一定完全正确，而是展示 role-playing 可以成为一种低人工成本的对话数据生成机制，用来观察模型能力、协作失败、任务覆盖和潜在风险。

> ⚠️ 注意：CAMEL 解决的是“让两个 LLM 自主协作”的协议问题，不保证每个任务结果真实正确。实际系统仍需要工具验证、外部评测或 critic/human-in-the-loop 来控制可靠性。

#### 🧪 练习题
```yaml
question: "CAMEL 中 Inception Prompting 的主要作用是什么？"
options:
  - "在训练阶段更新两个智能体的模型参数"
  - "在对话开始前注入角色、任务、通信协议和终止条件，使智能体能自主协作"
  - "把所有用户问题改写成单轮零样本提示"
  - "用向量数据库检索历史任务结果"
answer: 1
explain: "CAMEL 的 prompt engineering 主要发生在 role-playing 开始前，目的是固定角色和协议，降低角色翻转、空转循环等失败。"
```

### BabyAGI

```yaml
id: babyagi
num: 18
name: BabyAGI
full_name: 任务驱动智能体 (BabyAGI)
year: '2023'
org: Yohei Nakajima
parent: —
paper_url: https://yoheinakajima.com/task-driven-autonomous-agent/
project_url: ''
category: multi_agent
motivation: 任务生成与优先级排序自主循环
```

#### 📝 一句话总结
BabyAGI 提出了一个极简任务驱动自主智能体循环，用执行代理完成当前任务、任务生成代理提出后续任务、优先级代理重排队列，并用向量记忆提供上下文，解决单次提示无法持续推进长期目标的问题。

#### 🎯 核心要点
- 以用户给定 objective 和 initial task 启动，系统维护一个可动态更新的 task queue。
- Execution Agent 读取当前任务和相关历史上下文，调用 GPT-4/LLM 生成任务结果。
- Memory 使用 Pinecone 等向量数据库存储 task/result pair，并按相似度检索与当前任务相关的上下文。
- Task Creation Agent 根据 objective、当前任务结果和未完成任务列表生成新的 follow-up tasks。
- Task Prioritization Agent 对任务队列去重、排序和重编号，使下一轮优先处理更关键任务。
- 主循环是 execute -> store -> create -> prioritize -> pop next task，直到队列耗尽或人为停止。
- LangChain 在原始文章中用于组织 chain/agent 能力，使执行代理可扩展到工具调用和环境交互。
- 原型强调极简性：核心思想可用一段很短的 Python 脚本表达，因此成为早期自主 Agent 的标志性框架。
- 主要风险包括无限循环、任务膨胀、优先级误判、隐私泄漏、模型幻觉和缺少可靠停止条件。

#### 🔬 深入细节
![BabyAGI 任务驱动自主智能体框架图](https://yoheinakajima.com/wp-content/uploads/2023/03/image-1024x728.png)
*图：作者页面中的任务驱动自主智能体框架。Objective 与 First Task 初始化当前状态，执行结果进入 Memory 和 Task Generator，新任务进入 Tasklist，再由 Task Prioritization 选出下一轮任务。*

```python
# BabyAGI 核心循环伪代码
objective = user_defined_objective
queue = deque([initial_task])
memory = VectorStore()
next_task_id = 1

while queue:
    task = queue.popleft()

    context = memory.similarity_search(
        query=f"{objective}\n{task.name}",
        top_k=K,
    )

    result = execution_agent(
        objective=objective,
        task=task,
        context=context,
    )

    memory.add(
        text=result,
        metadata={"task": task.name, "task_id": task.id},
        embedding=embed(result),
    )

    new_tasks = task_creation_agent(
        objective=objective,
        last_result=result,
        completed_task=task.name,
        incomplete_tasks=[t.name for t in queue],
    )

    for new_task in deduplicate(new_tasks, queue):
        next_task_id += 1
        queue.append(Task(id=next_task_id, name=new_task))

    queue = prioritization_agent(
        objective=objective,
        tasks=queue,
        last_completed_task_id=task.id,
    )
```

BabyAGI 的核心问题是：如果用户给模型一个长期目标，模型如何在没有人类逐步提示的情况下持续推进？普通 ChatGPT 工作流依赖用户每轮判断“下一步该做什么”。BabyAGI 把这个判断显式拆成三个代理：Execution Agent 负责完成当前任务，Task Creation Agent 负责基于结果提出下一批任务，Task Prioritization Agent 负责决定任务顺序。它不是让一个模型一次性规划完整路线，而是让规划在每轮结果之后重新发生。

可以把 BabyAGI 的状态写成任务队列、记忆库和目标三元组。第 \\(t\\) 轮队列为：

$$
Q_t = [\tau_1, \tau_2, \ldots, \tau_m]
$$

系统弹出队首任务 \\(\tau_1\\)，从向量记忆中检索相关上下文：

$$
C_t = \operatorname{TopK}\left(M_t, \operatorname{embed}(O, \tau_1)\right)
$$

执行代理生成结果：

$$
r_t = E_\theta(O, \tau_1, C_t)
$$

这里 \\(O\\) 是总目标，\\(C_t\\) 是检索出的历史 task/result 上下文，\\(E_\theta\\) 是由 LLM 驱动的执行函数。这个公式体现了 BabyAGI 与简单队列脚本的区别：当前任务不是孤立执行，而是用向量记忆把历史结果重新注入上下文。

执行完成后，系统将任务结果写入记忆：

$$
M_{t+1} = M_t \cup \{(\tau_1, r_t, \operatorname{embed}(r_t))\}
$$

这一步让后续任务能够“知道之前做过什么”。在原始实现语境中，Pinecone 用来存储高维向量并做相似度检索；在后来的简化/归档版本中，也可以替换为 Chroma、Weaviate 或本地向量库。关键不是具体数据库，而是把长期任务的中间结果转化为可检索记忆，否则循环越长，上下文越容易丢失或爆炸。

Task Creation Agent 接收 objective、刚完成任务、执行结果和当前未完成任务列表，输出不与现有任务重复的新任务：

$$
T_t^+ = G_\theta(O, \tau_1, r_t, Q_t \setminus \{\tau_1\})
$$

直觉上，它相当于一个“动态项目经理”：看到最新结果后，决定哪些后续行动变得必要。例如目标是调研某市场，执行任务得到竞品列表后，任务生成器可能新增“分析竞品定价”“查找用户痛点”“总结进入壁垒”。这种机制使 BabyAGI 能从开放目标中滚动展开任务树，而不是只执行初始任务。

Task Prioritization Agent 再把旧队列和新任务合并重排：

$$
Q_{t+1} = P_\theta\left(O, (Q_t \setminus \{\tau_1\}) \cup T_t^+\right)
$$

早期 BabyAGI 中，优先级代理最初也承担去重作用，因为 LLM 很容易生成相似任务。排序的意义在于控制有限执行预算：如果任务生成速度超过任务完成速度，队列会膨胀，系统必须决定先做最能推进目标的任务。这个模块也是 BabyAGI 最脆弱的部分之一，因为 LLM 对优先级的理解可能不稳定，容易把显眼但不重要的任务排到前面。

BabyAGI 与 AutoGPT、CAMEL 的差异在于状态表示。AutoGPT 更强调工具执行链和外部行动，CAMEL 更强调两个角色之间的自然语言协作，而 BabyAGI 的最小抽象是“任务队列 + 结果记忆 + 三个 LLM 函数”。这种抽象非常简单，因此易于复现和改造：可以把 execution agent 接入搜索、文件系统、Zapier、代码解释器；可以把 prioritization agent 换成规则排序；可以增加 human approval 作为停止阀。它的影响力很大，正是因为它把自主智能体拆成了可理解、可替换的循环部件。

不过，BabyAGI 也暴露了早期 autonomous agent 的核心风险。首先是停止条件弱：只要任务生成器持续产生任务，系统就会一直运行，带来 API 成本和失控风险。其次是目标漂移：新任务由 LLM 根据上轮结果生成，若某轮结果错误，后续任务会围绕错误继续展开。第三是记忆污染：向量库保存的结果未必真实，但后续会把它当上下文使用。第四是安全边界：如果执行代理接入真实工具或外部 API，错误任务可能产生真实副作用。

因此，BabyAGI 最适合被理解为“任务驱动 Agent 架构原型”，而不是可直接生产部署的 AGI。它的贡献不在于证明模型能自主完成任意目标，而在于给出一个最小闭环：目标驱动任务，任务产生结果，结果更新记忆并生成新任务，优先级排序决定下一步。这一闭环后来成为很多 agent 框架中 planner、executor、memory、scheduler 模块的雏形。

> 💡 关键：BabyAGI 的智能主要来自循环结构，而不是单个 prompt。只要 execute/create/prioritize 三个函数可替换，整个系统就能从玩具脚本演化成更复杂的 agent runtime。

#### 🧪 练习题
```yaml
question: "BabyAGI 主循环中 Task Creation Agent 的输入最关键包含哪些信息？"
options:
  - "只包含用户最初的 objective，不读取执行结果"
  - "包含 objective、刚完成任务的结果、已完成任务描述和当前未完成任务列表"
  - "只包含向量数据库中的随机历史记录"
  - "只包含优先级排序后的任务编号"
answer: 1
explain: "任务生成器需要根据目标和最新结果提出不重复的后续任务，同时参考现有未完成任务避免队列膨胀和重复。"
```

### ChatDev

```yaml
id: chatdev
num: 19
name: ChatDev
full_name: 聊天驱动开发 (ChatDev)
year: '2023'
org: 清华大学
parent: camel
paper_url: https://arxiv.org/abs/2307.07924
project_url: ''
category: multi_agent
motivation: 多Agent模拟软件公司开发流程
```

#### 📝 一句话总结
ChatDev 提出一个由 LLM 扮演软件公司成员的多 Agent 开发框架，用“聊天链”把设计、编码、测试、文档生成拆成可检查的双人协作子任务，从而缓解单次生成完整软件时的代码幻觉与缺少交叉验证问题。

#### 🎯 核心要点
- 构建虚拟软件公司：CEO、CPO、CTO、Programmer、Reviewer、Tester、Art Designer 等角色分别承担需求分析、架构、编码、审查、测试和文档工作。
- 遵循瀑布式四阶段流程：Designing、Coding、Testing、Documenting，每个阶段继续拆成若干 atomic chats。
- 提出 Chat Chain：每个节点是一个明确子任务，由 instructor 与 assistant 两个角色通过多轮对话达成共识并输出结构化决策。
- 使用角色专门化、记忆流、自反思和通信协议，让 Agent 在上下文内持续推进任务并在结束条件未触发时总结结论。
- 在编码和测试阶段提出 Thought Instruction，通过角色翻转先识别未实现方法或错误原因，再把具体修复思路注入给 Programmer。
- 使用版本演化与 Git 风格代码管理，只保留最新代码版本给后续角色，减少长代码上下文造成的冗余与幻觉传播。

#### 🔬 深入细节
![ChatDev 聊天链架构](https://ar5iv.labs.arxiv.org/html/2307.07924/assets/figures/chat_chain.png)
*图：ChatDev 的 Chat Chain 把软件开发过程拆成阶段级与聊天级组件，每个 atomic chat 由两个角色围绕一个明确产物协作完成。*

ChatDev 的问题切入点不是“让一个 LLM 一步写完软件”，而是模拟真实软件公司把问题分解给不同岗位。论文指出，直接让 LLM 生成完整系统容易出现未实现函数、缺失依赖、潜在 bug、需求理解偏移等代码幻觉；更关键的是，单 Agent 缺少人类开发中常见的交叉检查。ChatDev 因此把软件开发过程组织为一个有顺序的通信程序：先由 CEO/CPO/CTO 做需求与技术决策，再由 CTO/Programmer/Designer 生成代码和界面资源，接着由 Reviewer/Tester/Programmer 做静态审查和动态调试，最后生成依赖说明与用户手册。

Chat Chain 是核心抽象。可以把第 \(k\) 个聊天节点写成 \(c_k=(r_k^I,r_k^A,g_k,p_k,\tau_k)\)，其中 \(r_k^I\) 是发起指令的 instructor 角色，\(r_k^A\) 是执行与回应的 assistant 角色，\(g_k\) 是子任务目标，\(p_k\) 是输出协议，\(\tau_k\) 是终止条件。每轮对话维护记忆流：

$$
M_t = \{(I_1,A_1,D_1), (I_2,A_2,D_2), \ldots, (I_t,A_t,D_t)\},
$$

其中 \(I_t\) 是 instructor 消息，\(A_t\) 是 assistant 回复，\(D_t\) 是从对话中抽取出的决策或中间产物。下一轮 instructor 依据 \(M_t\) 继续发出指令，assistant 再结合角色提示和历史消息生成回应。这个机制的直觉是：LLM 的上下文窗口不仅保存聊天文本，还保存“已达成的开发决策”，使后续角色不必重新推断需求。

```python
# ChatDev 核心流程伪代码
software = {}
chat_chain = [
    ("CEO", "CPO", "decide_modality"),
    ("CEO", "CTO", "choose_language"),
    ("CTO", "Programmer", "implement_code"),
    ("Designer", "Programmer", "create_gui_assets"),
    ("Programmer", "Reviewer", "static_review"),
    ("Tester", "Programmer", "dynamic_debug"),
    ("CTO", "Programmer", "write_requirements"),
    ("CEO", "CPO", "write_manual"),
]

for instructor, assistant, task in chat_chain:
    memory = []
    while not protocol_is_satisfied(memory, task):
        instruction = instruct(instructor, task, memory, software)
        reply = respond(assistant, instruction, memory, software)
        decision = extract_decision(reply, task)
        memory.append((instruction, reply, decision))
        if consensus_without_protocol(memory):
            decision = self_reflect(assistant, memory)
            memory.append(("self_reflection", decision, decision))
    software = update_artifacts(software, decision)
```

![ChatDev 思维指令机制](https://ar5iv.labs.arxiv.org/html/2307.07924/assets/figures/naive_instruction.png)
*图：Thought Instruction 用“先询问具体缺口，再切回原角色修复”的方式减少泛泛指令导致的代码幻觉。*

Thought Instruction 是 ChatDev 相比普通角色扮演对话更像工程流程的地方。普通指令如“实现所有未实现方法”过于宽泛，Programmer 可能会补错接口、误改已完成代码，甚至引入不存在的依赖。ChatDev 让角色先翻转：例如 CTO 暂时询问 Programmer “当前哪些方法还未实现”，或 Tester 先要求 Programmer 解释解释器报错；得到更具体的故障定位后，再切回原来的 instructor 角色，把“只实现某几个方法”“根据某条 traceback 修改某个文件”这类精确思路写入指令。形式化地看，它把一次模糊更新 \(\Delta code = f(\text{generic instruction})\) 改写为两步：

$$
z = \text{Diagnose}(M_t, code, feedback), \quad \Delta code = \text{Patch}(z, code),
$$

其中 \(z\) 是由对话显式产生的诊断信息。这样做的价值不在于让 LLM 更强，而是让 LLM 的错误空间被收窄到一个具体的修复目标上。

编码阶段还引入 Code Management 与 Version Evolution。因为代码片段长、历史版本多，直接把所有版本塞进上下文会污染后续判断；ChatDev 只让角色看到最新代码版本，并把每次修改视为版本递增。Reviewer 的静态调试用于发现潜在漏洞，Tester 的动态调试则执行程序并把解释器反馈转化为可操作修改建议。二者结合相当于把软件质量控制拆成两个闭环：

$$
code_{v+1}=\text{Programmer}(code_v, review\_feedback, test\_feedback),
$$

直到通信协议、运行反馈或最大尝试次数满足终止条件。

与 CAMEL 这类固定双 Agent 角色扮演相比，ChatDev 的创新不只是“更多 Agent”，而是把 Agent 对话绑定到软件工程阶段、产物协议和跨阶段依赖上。每个 atomic chat 的输出都会成为后续 chat 的输入，例如需求模态和编程语言会约束编码阶段，测试反馈会约束代码修复，最终代码与依赖会约束文档生成。它的局限也来自这种设计：流程高度依赖预设角色和任务链，适合小型软件自动生成，但对需求频繁变更、大规模代码库理解和长期维护仍需要更强的状态管理与人类干预。

#### 🧪 练习题
```yaml
question: "ChatDev 中 Thought Instruction 的主要作用是什么？"
options:
  - "让所有 Agent 共享同一个系统提示，减少提示词成本"
  - "通过角色翻转先定位具体缺口或错误原因，再生成更精确的修复指令"
  - "把瀑布式流程改成完全并行开发流程"
  - "用奖励模型替代代码执行器来评估程序正确性"
answer: 1
explain: "Thought Instruction 先显式提取未实现方法或报错原因，再把诊断结果写入指令，避免泛泛修复造成新的代码幻觉。"
```

### AutoGen

```yaml
id: autogen
num: 20
name: AutoGen
full_name: 自动生成智能体 (AutoGen)
year: '2024'
org: 微软
parent: camel
paper_url: https://openreview.net/forum?id=BAakY1hNKS
project_url: ''
category: multi_agent
motivation: 可定制可对话的多Agent工作流框架
```

#### 📝 一句话总结
AutoGen 提出一个通用多 Agent 对话编程框架，把复杂 LLM 应用抽象为可定制、可对话、可调用人类与工具的 Agent 之间的消息流，从而统一实现顺序对话、嵌套对话、群聊和动态工作流。

#### 🎯 核心要点
- 提出 ConversableAgent 抽象：每个 Agent 都能 send、receive、generate_reply，并可注册自定义 reply 函数。
- Agent 能组合三类能力：LLM 推理、人类输入、工具或代码执行，支持混合配置而非只依赖单个 LLM。
- 提供 AssistantAgent、UserProxyAgent、GroupChatManager 等内置 Agent，用于代码生成、人工代理、工具执行和群聊管理。
- 提出 Conversation Programming：先定义可对话 Agent，再用自然语言与 Python 代码共同描述对话计算和控制流。
- 自动回复机制使对话在满足终止条件前持续推进，不需要额外中央控制器手写每一步调度。
- 支持 sequential chat、nested chat、group chat、hierarchical chat 和函数调用驱动的动态 Agent 路由。
- 在数学、代码、RAG 问答、ALFWorld 决策、供应链优化和对话式棋类应用中展示通用性。

#### 🔬 深入细节
![AutoGen 多 Agent 对话总览](https://ar5iv.labs.arxiv.org/html/2308.08155/assets/x1.png)
*图：AutoGen 将 Agent 定义、灵活对话模式和实际 Agent Chat 统一到多 Agent conversation 框架中。*

AutoGen 的核心动机是：真实 LLM 应用越来越像工作流，而不是一次提示词调用。单 Agent 往往需要同时做推理、写代码、执行工具、解释错误、向用户追问、判断是否结束，这会让系统脆弱且难复用。AutoGen 的解法是把每个参与者建模为“可对话 Agent”，再让任务通过消息传递自然推进。论文强调两个问题：如何设计可复用、可配置的 Agent；以及如何用统一接口覆盖不同的对话拓扑。前者由 ConversableAgent 解决，后者由 conversation programming 解决。

可以把 AutoGen Agent 形式化为：

$$
a_i = (role_i, cap_i, h_i, R_i, T_i),
$$

其中 \(role_i\) 是角色描述，\(cap_i\) 是能力集合，例如 LLM、人类输入、代码执行、函数调用，\(h_i\) 是消息历史，\(R_i\) 是回复生成函数，\(T_i\) 是终止条件。收到消息 \(m_t\) 后，Agent 更新上下文并产生回复：

$$
h_i^{t+1}=h_i^t \cup \{m_t\}, \quad m_{t+1}=R_i(h_i^{t+1}; cap_i),
$$

若 \(T_i(h_i^{t+1})=1\)，对话停止；否则回复被发送给下一个 Agent。这个公式看似简单，但它把 LLM 调用、人工输入、工具执行、代码解释器反馈都压进同一个 `generate_reply` 接口中，因此工作流可以通过注册不同回复函数组合出来。

```python
# AutoGen 对话编程伪代码
assistant = AssistantAgent(
    name="assistant",
    llm_config=gpt4_config,
    system_message="Write code, inspect execution feedback, and terminate when solved."
)
user_proxy = UserProxyAgent(
    name="user_proxy",
    human_input_mode="ALWAYS",
    code_execution_config={"work_dir": "workspace"}
)

def reply_func_A2B(message, sender, receiver, context):
    if contains_code(message):
        return execute_code(message)
    if need_human_feedback(message):
        return ask_human(message)
    return receiver.generate_reply(message)

user_proxy.register_reply(sender=assistant, reply_func=reply_func_A2B)
assistant.initiate_chat(
    recipient=user_proxy,
    message="Plot META and TESLA stock price change YTD."
)
```

![AutoGen 对话编程机制](https://ar5iv.labs.arxiv.org/html/2308.08155/assets/x2.png)
*图：AutoGen 用统一接口、注册回复函数和自动回复机制把开发者代码转化为自动化 Agent Chat。*

Conversation Programming 是 AutoGen 最重要的方法论贡献。它区分“计算”和“控制流”：计算是某个 Agent 在收到消息后做什么，例如调用 LLM、执行代码、请求人类输入；控制流是这些计算以什么顺序发生，以及下一条消息发给谁。传统链式框架通常把这两者写死在一个 pipeline 中，而 AutoGen 允许开发者用 Python 注册 reply function，也允许 LLM 通过自然语言规则或 function calling 决定下一步。这样，一个简单的两 Agent 代码执行循环、一个带检索器的 RAG Chat、一个多专家群聊，都可以复用同一套 send/receive/generate_reply 语义。

自动回复机制降低了复杂工作流的样板代码。只要 conversation 初始化，接收方会自动调用 `generate_reply` 并返回消息，直到触发终止条件或最大轮数。终止条件既可以是自然语言协议，例如 assistant 输出 `TERMINATE`，也可以是程序规则，例如达到最大自动回复次数、代码执行成功、人工确认通过。这个设计避免了显式中央调度器，但并不意味着无控制；控制被分散到每个 Agent 的系统消息、reply 函数、工具配置和终止检查中。

AutoGen 的可扩展性来自嵌套对话和动态路由。若某个 Agent 在生成回复前需要咨询其他专家，它可以在自定义 `generate_reply` 中临时启动一个 nested chat，再把内部对话总结为外层回复。GroupChatManager 则把一组 Agent 放入群聊，并动态选择下一个发言者，适合开放式协作或辩论。对应的抽象可以写作：

$$
next = \pi(M_t, A), \quad m_{t+1}=R_{next}(M_t),
$$

其中 \(M_t\) 是群聊消息池，\(A\) 是候选 Agent 集合，\(\pi\) 可以由规则、LLM 或函数调用实现。相较 CAMEL 固定双 Agent 角色扮演，AutoGen 不限制 Agent 数量和拓扑结构，也不要求任务必须沿预设阶段前进。

AutoGen 的设计还把“人类参与”变成一等能力。UserProxyAgent 可以每轮请求人工输入，也可以在无人输入时自动执行代码；这使系统能在自动化和人工把关之间切换。论文中的应用表明，这种混合模式特别适合高风险或长链任务：数学题中可让用户补充思路，RAG 中可让检索上下文迭代更新，ALFWorld 中可加入 grounding agent 避免环境行动循环，OptiGuide 场景中可用 Safeguard Agent 防止生成不安全优化代码。AutoGen 因此不是一个单一算法，而是一个可编程的多 Agent 运行时抽象。

#### 🧪 练习题
```yaml
question: "AutoGen 中 conversation programming 的关键含义是什么？"
options:
  - "只用自然语言提示词串联多个固定 Agent，不允许代码控制"
  - "把 LLM 应用统一表示为 Agent 间对话，并用自然语言与代码共同定义计算和控制流"
  - "把所有工具调用都集中到一个不可修改的中央规划器中"
  - "通过监督微调训练专门的多 Agent 路由模型"
answer: 1
explain: "AutoGen 的核心是用可对话 Agent 和统一接口表达工作流，开发者既能用提示词控制行为，也能用 Python 注册回复函数与终止条件。"
```

### MetaGPT

```yaml
id: metagpt
num: 21
name: MetaGPT
full_name: 元编程智能体 (MetaGPT)
year: '2024'
org: 深度赋智
parent: chatdev
paper_url: https://openreview.net/forum?id=uS04ESuElM
project_url: ''
category: multi_agent
motivation: SOP注入多Agent协作流程
```

#### 📝 一句话总结
MetaGPT 将软件公司的标准作业流程 SOP 编码进多 Agent 协作，把自由聊天式协作改造成由产品文档、架构设计、任务分解、代码实现和可执行反馈串联的结构化元编程流程，从而减少级联幻觉并提升复杂软件生成质量。

#### 🎯 核心要点
- 提出 `Code = SOP(Team)` 思想：把人类软件团队的标准作业流程显式注入 LLM Agent 团队。
- 定义五类核心角色：Product Manager、Architect、Project Manager、Engineer、QA Engineer，各自拥有 profile、goal、constraints、context 和 skills。
- 强制产生结构化中间产物：PRD、User Stories、Requirement Pool、File Lists、Data Structures、API Interfaces、Sequence Flow、Test Cases。
- 使用共享消息池与发布-订阅机制，Agent 发布结构化消息，并按角色关注点订阅相关信息，避免一对一反复询问。
- 引入 executable feedback：Engineer 在运行时写代码、执行测试、读取错误、对照 PRD 与系统设计迭代修复。
- 相比 ChatDev 侧重自然语言对话，MetaGPT 更强调文档和图表作为协作接口，减少无效寒暄、信息遗漏和格式不一致。
- 在 HumanEval、MBPP 与 SoftwareDev 上验证，展示 SOP、角色分工和可执行反馈对代码生成与软件工程任务的增益。

#### 🔬 深入细节
![MetaGPT SOP 总览](https://arxiv.org/html/2308.00352v7/extracted/5946302/imgs/1-metagpt_overall_update.png)
*图：MetaGPT 将真实软件团队中的 SOP 映射到 LLM 多 Agent 团队，由不同角色按标准流程交付结构化产物。*

MetaGPT 的出发点是：早期多 Agent 系统虽然能通过角色扮演提高互动性，但复杂任务会出现级联幻觉。一个 Agent 的含糊输出会被下一个 Agent 当成事实继续扩展，错误沿链条放大；自由聊天还可能产生无关对话、重复指令和信息失真。MetaGPT 借鉴真实软件公司的 SOP，让每个角色知道自己要读什么、写什么、交付给谁，以及输出必须满足什么格式。这样，多 Agent 协作不再是“互相聊天”，而是“按照文档接口传递工程产物”。

MetaGPT 的流程可以抽象为一个 SOP 有向图：

$$
G_{SOP}=(R,D,E),
$$

其中 \(R\) 是角色集合，\(D\) 是结构化交付物集合，\(E\subseteq R\times D\times R\) 表示哪个角色产生某个交付物并供哪个后续角色使用。典型路径是：Product Manager 根据用户需求生成 PRD、用户故事和需求池；Architect 读取 PRD，生成系统设计、文件列表、数据结构和 API 接口；Project Manager 将设计拆成工程任务；Engineer 根据任务写代码；QA Engineer 生成测试用例并检查质量。每个节点都减少了后续 Agent 的自由发挥空间。

```python
# MetaGPT SOP 协作伪代码
message_pool = MessagePool()
team = [ProductManager(), Architect(), ProjectManager(), Engineer(), QAEngineer()]

requirement = receive_user_requirement()
message_pool.publish("user_requirement", requirement)

for role in team:
    inputs = message_pool.subscribe(role.profile.interests)
    artifact = role.act(inputs)
    assert artifact.matches(role.output_schema)
    message_pool.publish(artifact.topic, artifact)

for task in message_pool.subscribe("engineering_tasks"):
    code = Engineer.write_code(task, design=message_pool.get("system_design"))
    for retry in range(3):
        tests = Engineer.write_tests(task, code)
        result = execute(code, tests)
        if result.passed:
            break
        context = message_pool.get_many(["PRD", "system_design", "code_history"])
        code = Engineer.debug(code, result.error, context)
    message_pool.publish("code", code)
```

![MetaGPT 通信协议与可执行反馈](https://arxiv.org/html/2308.00352v7/extracted/5946302/imgs/2-message_sharing.jpg)
*图：左侧是共享消息池和发布-订阅通信，右侧是 Engineer 基于执行结果进行迭代调试的闭环。*

通信协议是 MetaGPT 区别于 ChatDev 的关键。ChatDev 主要让两个角色在每个 atomic chat 中通过自然语言达成共识；MetaGPT 则要求 Agent 发布结构化消息到全局消息池。若 \(M\) 是消息池，角色 \(r\) 的订阅集合为 \(S_r\)，则该角色可见的信息为：

$$
O_r = \{m \in M \mid topic(m) \in S_r\}.
$$

当角色执行动作 \(a_r\) 时，它只消费与自己职责相关的 \(O_r\)，再产生满足 schema 的产物 \(d_r\)：

$$
d_r = a_r(O_r, profile_r, goal_r, constraints_r), \quad M \leftarrow M \cup \{d_r\}.
$$

这个机制解决两个问题：第一，不需要每个角色向其他角色逐一询问信息，降低通信拓扑复杂度；第二，不把所有消息广播给所有角色，避免信息过载。比如 Architect 主要订阅 PRD，而 QA Engineer 的测试信息不一定需要提前干扰架构设计。

结构化输出是 SOP 的落地形式。论文中特别强调 PRD、系统接口设计、序列流程图等文档，因为这些产物比自由对话更稳定。Product Manager 的 PRD 将用户需求转成可实现条目；Architect 的数据结构和接口定义把需求转成代码边界；Project Manager 的任务拆分让 Engineer 明确实现顺序；QA Engineer 的测试用例把质量标准外显出来。MetaGPT 因此把元编程理解为“编写能指导程序生成的程序”：Agent 不是直接吐出最终代码，而是先生成控制代码生成的工程规范。

Executable Feedback 是另一个核心闭环。非执行式代码审查只能让 LLM 读代码并猜测问题，仍可能漏掉导入错误、类名错误、路径错误或运行时异常。MetaGPT 让 Engineer 在生成初始代码后运行测试，若失败，就把错误输出、历史调试记忆、PRD、系统设计和代码文件一起作为修复上下文。其迭代可表示为：

$$
code_{t+1}=\text{Debug}(code_t, error_t, PRD, design, memory),
$$

并在测试通过或达到最多 3 次重试后停止。这个设计把“正确性判断”从纯语言空间拉回可执行环境，降低 LLM 自我评价不可靠的问题。

![MetaGPT 开发流程细节](https://arxiv.org/html/2308.00352v7/extracted/5946302/imgs/3-metagpt_details.jpg)
*图：MetaGPT 的软件开发过程依赖 SOP，把需求、设计、任务、实现、测试组织成可追踪的工程流水线。*

与传统单 Agent 或自由多 Agent 相比，MetaGPT 的优势在于把复杂任务的隐性协作知识显式化。AutoGPT/LangChain 更像通用工具调用或链式执行框架，ChatDev 更像角色对话驱动的软件公司；MetaGPT 则把“谁负责什么、输出什么格式、下游如何消费”作为第一等约束。它牺牲了一些开放式灵活性，换来中间状态可检查、错误可定位、交付物可复用。对于软件工程任务，这种约束比增加更多闲聊轮次更重要，因为代码生成失败往往不是模型不会写某一行代码，而是需求、接口、文件边界和测试标准在多轮传递中失真。

#### 🧪 练习题
```yaml
question: "MetaGPT 相比 ChatDev 最关键的方法差异是什么？"
options:
  - "MetaGPT 完全取消多 Agent，只保留一个代码生成模型"
  - "MetaGPT 用 SOP、结构化文档和发布-订阅消息池约束协作，而不主要依赖自由聊天"
  - "MetaGPT 只优化对话娱乐任务，不处理软件工程"
  - "MetaGPT 用强化学习奖励模型替代所有测试执行"
answer: 1
explain: "MetaGPT 将人类软件团队 SOP 编码为角色、结构化产物和消息协议，并用可执行反馈闭环修复代码错误。"
```

### AgentVerse

```yaml
id: agentverse
num: 22
name: AgentVerse
full_name: 智能体宇宙 (AgentVerse)
year: '2024'
org: 清华大学
parent: camel
paper_url: https://proceedings.iclr.cc/paper_files/paper/2024/hash/578e65cdee35d00c708d4c64bce32971-Abstract-Conference.html
project_url: ''
category: multi_agent
motivation: 模拟群体涌现行为与动态调整
```

#### 📝 一句话总结
AgentVerse 提出一个模拟人类群体解决问题流程的通用多智能体框架，用“专家招募 → 协作决策 → 动作执行 → 评估反馈”的闭环解决静态角色协作难以适配复杂任务的问题。它的核心价值不只是让多个 LLM Agent 投票，而是让团队组成、沟通结构和下一轮行动随环境反馈动态调整，并由此观察到志愿、从众和破坏性等群体涌现行为。

#### 🎯 核心要点
- 四阶段闭环：Expert Recruitment、Collaborative Decision-Making、Action Execution、Evaluation。
- 动态专家招募：由 recruiter agent 根据目标和上一轮反馈生成专家角色，而不是人工预设固定角色。
- 两类协作结构：horizontal structure 用于咨询、工具使用等多路并行任务，vertical structure 用于数学、代码等需要单一精炼答案的任务。
- MDP 化建模：把多智能体群体与环境交互表示为状态、动作、转移、奖励、目标空间上的迭代过程。
- 任务覆盖广：论文在通用理解与推理、HumanEval 代码生成、工具使用、Minecraft embodied AI 等场景比较 CoT、Solo、Group。
- 关注涌现行为：分析 volunteer、conformity、destructive behaviors，强调协作智能的收益与安全风险并存。

#### 🔬 深入细节
![AgentVerse 总体框架图](https://ar5iv.labs.arxiv.org/html/2308.10848/assets/x1.png)
*图：AgentVerse 的四阶段闭环。系统先招募专家，再让专家协作决策，随后在环境中执行动作，最后由评估模块把当前状态与目标差距反馈给下一轮。*

AgentVerse 的动机来自一个很具体的缺口：AutoGPT、BabyAGI、ReAct 等单智能体系统可以把 LLM 接到工具和环境上，但复杂真实任务常常需要不同专长的人共同完成；早期多智能体工作又常把角色、讨论方式和参与者固定下来，导致团队无法随任务进展改变。论文因此把“团队如何变化”放进方法核心：每一轮都先看目标和反馈，再决定当前最需要哪些专家。

论文把整个过程抽象成一个 MDP：

$$
\mathcal{M}=(\mathcal{S},\mathcal{A},\mathcal{T},\mathcal{R},\mathcal{G}),\qquad s_{t+1}=\mathcal{T}(s_t,A_t)
$$

其中 \(\mathcal{S}\) 是智能体与环境状态空间，\(\mathcal{A}\) 是解法与可执行动作空间，\(\mathcal{T}\) 是状态转移函数，\(\mathcal{R}\) 是奖励或评价信号，\(\mathcal{G}\) 是目标空间。这个形式化的意义不是要训练一个 RL policy，而是把“讨论出的群体决策” \(A_t\) 明确放到环境转移中：团队讨论如果只停留在文本层面没有执行与反馈，就不能形成真正的闭环。

```python
# AgentVerse 核心闭环伪代码
state = observe_environment()
feedback = None

for round_id in range(max_rounds):
    # 1. Expert Recruitment: recruiter 按目标和反馈组队
    experts = recruiter.generate_experts(goal, feedback, state)
    agents = [instantiate_agent(role) for role in experts]

    # 2. Collaborative Decision-Making: 选择水平或垂直沟通结构
    if task_requires_parallel_subtasks(goal):
        proposals = [agent.propose(state, goal) for agent in agents]
        group_decision = aggregate(proposals)          # horizontal structure
    else:
        solution = solver.initial_answer(state, goal)
        for _ in range(max_refine_steps):
            critiques = [r.review(solution, goal) for r in reviewers]
            if consensus(critiques):
                break
            solution = solver.refine(solution, critiques)
        group_decision = solution                      # vertical structure

    # 3. Action Execution: 把群体决策落到环境或工具中
    state = environment.step(group_decision)

    # 4. Evaluation: 评估当前状态与目标差距，反馈给下一轮招募
    done, feedback = evaluator.compare(state, goal)
    if done:
        break
```

专家招募阶段的关键是从“人工写死角色”转向“按目标自动生成角色”。给定目标 \(g\in\mathcal{G}\)，论文让一个 recruiter agent \(M_r\) 生成专家描述集合，形成团队 \(M=M_r(g)\)。如果第 \(t-1\) 轮评估指出方案缺少安全审查或工具调用失败，那么下一轮 recruiter 就可以把安全专家、测试员、检索专家等加入团队。这个机制直接对应任务清单里的 motivation：它模拟群体涌现行为与动态调整，而不是只做多 Agent 拼接。

协作决策阶段有两种通信拓扑。水平结构中，每个 agent \(m_i\) 产生自己的决策 \(a_{m_i}\)，群体决策由聚合函数得到：

$$
A=f(\{a_{m_i}\}_{i=1}^{n})
$$

这里的 \(f\) 可以是总结、投票、ensemble 或由主持 agent 归纳出的计划。它适合咨询、工具使用、Minecraft 多人协作等场景，因为任务可以自然拆成多个子任务并行推进。垂直结构中，solver 先提出 \(a^*_0\)，reviewers 连续给反馈，solver 迭代修正直到共识或达到上限：

$$
a^*_k=\operatorname{Refine}(a^*_{k-1},\{\phi_j(a^*_{k-1})\}_{j=1}^{m}),\qquad A=a^*_k
$$

这更适合数学题、代码生成等“最终只需要一个答案”的任务。论文在附录中也说明，代码和通用推理采用垂直结构，工具使用采用水平结构，因为工具任务需要各个 agent 明确自己的子任务并互相补位。

执行与评估让 AgentVerse 区别于普通多轮聊天。动作执行阶段把群体决策真正作用到环境上，例如调用 Bing search、浏览器、代码解释器、任务 API，或在 Minecraft 中由多个 Voyager agent 分别采集、合成、交付物品。评估阶段比较新状态 \(s_{new}\) 与目标 \(g\)，输出自然语言反馈 \(F_t\)，如果目标未达成，就把 \(F_t\) 送回专家招募阶段。这个反馈不只是给原团队“再试一次”，而是允许团队结构本身变化。

实验上，论文比较了 CoT、Solo、Group 三类设置。Solo 仍使用 AgentVerse 的招募、执行和评估模块，但决策阶段只有一个 agent；Group 则启用多 agent 协作。这个对照很重要：如果 Group 优于 Solo，收益来自群体协作；如果 Solo 也优于 CoT，说明闭环式执行和评估本身也有价值。论文报告在 HumanEval 上 GPT-4 从 CoT 的 83.5 pass@1 提升到 Solo 的 87.2、Group 的 89.0；工具使用中，AgentVerse 组队完成 10 个复杂多工具任务中的 9 个，而单个 ReAct agent 只完成 3 个。

更有启发的是，论文把多智能体交互当作研究对象，而不是只看任务分数。在 Minecraft 等场景中，agent 会出现 volunteer behavior，例如空闲 agent 主动帮队友收集材料；也会出现 conformity behavior，例如偏离目标的 agent 在队友批评后回到共同目标；还会出现 destructive behavior，例如错误行动破坏团队成果。AgentVerse 的方法意义因此分成两层：工程上，它提高复杂任务的分解与执行能力；科学上，它提供了观察 LLM agent 群体行为的可复现实验框架。

> 💡 关键：AgentVerse 的“多”不是简单增加 agent 数量，而是让团队组成、沟通结构、执行动作和评价反馈形成同一个闭环。没有 Evaluation 回流到 Expert Recruitment，就缺少论文最核心的动态调整能力。

#### 🧪 练习题
```yaml
question: "AgentVerse 为什么要把 Evaluation 的反馈送回 Expert Recruitment，而不是只让原团队继续讨论？"
options:
  - "为了减少每轮调用的 LLM token 数量"
  - "为了让团队组成能根据当前失败原因动态变化"
  - "为了避免所有 agent 执行动作"
  - "为了把水平结构强制改成垂直结构"
answer: 1
explain: "AgentVerse 的核心是动态组队；评估反馈指出当前状态与目标的差距，recruiter 可以据此加入或替换更合适的专家。"
```

### OpenAgents

```yaml
id: openagents
num: 23
name: OpenAgents
full_name: 开放智能体平台 (OpenAgents)
year: '2024'
org: 香港大学
parent: autogen
paper_url: https://arxiv.org/abs/2310.10634
project_url: ''
category: multi_agent
motivation: 面向真实世界的开放Agent平台
```

#### 📝 一句话总结
OpenAgents 提出一个面向真实用户、开发者和研究者的开放语言智能体平台，把 Data Agent、Plugins Agent、Web Agent 三类真实应用智能体接入统一 Web UI、后端、工具接口和可执行环境。它解决的不是单一算法分数问题，而是语言智能体从研究原型走向真实世界时的访问门槛、部署复杂度、流式交互、工具扩展、错误处理和评估可观测性问题。

#### 🎯 核心要点
- 三类内置智能体：Data Agent 用 Python/SQL 和数据工具做分析，Plugins Agent 接入 200+ 日常 API 工具，Web Agent 通过浏览器扩展执行网页浏览。
- 双层系统架构：User Interface 负责前端、后端、流式渲染、错误处理和数据存储；Language Agent 负责模型、工具接口和环境交互。
- Agent 交互循环：每轮遵循 Observation → Deliberation → Action，并把 LLM 输出解析成代码执行、API 调用或浏览器动作。
- 面向真实部署的工程机制：DataModel、Redis/MongoDB 分层存储、实时 response streaming、Chrome Extension、sandbox、自动工具选择。
- 研究价值：提供本地部署代码、共享 agent 组件、Web UI 和人机交互轨迹，支持 in-the-wild human-in-the-loop 评估。
- 与 AutoGen 类框架的区别：OpenAgents 更强调应用层完整性和普通用户访问，而不是只提供开发者用的 agent 编排接口。

#### 🔬 深入细节
![OpenAgents 平台总览](https://github.com/xlang-ai/OpenAgents/raw/main/pics/openagents_overview.png)
*图：OpenAgents 同时服务三类对象。普通用户通过 Web UI 使用智能体，开发者本地部署前后端，研究者复用 Data/Plugins/Web Agent 组件验证新方法。*

![OpenAgents 系统设计](https://github.com/xlang-ai/OpenAgents/raw/main/pics/system_design.png)
*图：OpenAgents 的系统架构分为 User Interface 与 Language Agent。前者处理用户、前端、后端、数据和流式交互，后者连接语言模型、工具和环境。*

OpenAgents 的论文定位非常明确：它不是提出一个新的提示词技巧，而是把语言智能体推向“真实可用平台”。作者指出，许多已有 agent framework 主要服务开发者，通常以 package、console 或 proof-of-concept demo 形式存在；而真实用户需要网页界面、文件上传、富媒体渲染、失败恢复、响应流式显示和账户级数据管理。OpenAgents 因此把系统设计本身作为研究贡献：如果 agent 只能在受控 benchmark 中运行，而不能承受真实用户、真实网络、真实 API 和真实延迟，它的能力评估是不完整的。

论文把架构拆成两部分。第一部分是 User Interface，包括 frontend website、backend server、streaming、error handling、database design、user system 等。第二部分是 Language Agent，包括 language model、tools、environments、prompting、action parsing、agent method、API calling、tool scaling、tool selection、web extension 和 sandbox。二者之间的关键接口是“可解析的 agent 输出”：LLM 不是只返回自然语言，而是产生能被后端解析成代码、API 调用或网页动作的文本。

```python
# OpenAgents 通用交互循环伪代码
history = load_user_history(user_id)
state = init_agent_state(files=user_files, selected_tools=user_tools)

while user_has_request:
    user_msg = receive_from_web_ui()
    observation = build_observation(user_msg, history, state)   # DataModel 负责多模态/表格/代码线性化

    deliberation = llm.generate(prompt=agent_prompt,
                                observation=observation,
                                stream=True)

    for token in streaming_parser(deliberation):
        role = pushdown_automaton.classify(token)               # 文本、工具名、参数、内部计划等
        render_or_buffer(role, token)

    action = parse_action(deliberation)                         # code/API/browser command
    result = sandbox_or_environment.execute(action)
    state = update_state(state, result)
    history.append((user_msg, action, result))
    render_result_to_frontend(DataModel(result))
```

OpenAgents 的 agent loop 可以概括为：

$$
o_t=\operatorname{Observe}(u_t,h_{t-1},e_t),\quad d_t=\operatorname{LLM}_{\theta}(P,o_t),\quad a_t=\operatorname{Parse}(d_t),\quad y_t=\operatorname{Exec}(a_t)
$$

其中 \(u_t\) 是用户输入，\(h_{t-1}\) 是历史，\(e_t\) 是当前环境或工具状态，\(P\) 是平台为具体 agent 构造的提示，\(d_t\) 是模型的推理与动作文本，\(a_t\) 是解析出的动作，\(y_t\) 是执行结果。这个公式的直觉是：OpenAgents 的难点不在“让 LLM 说出答案”，而在让 \(d_t\) 同时满足人类可读、前端可渲染、后端可解析、环境可执行这四类约束。

Data Agent 面向数据分析任务。用户可以上传表格、图像或数据文件，agent 通过 Python、SQL、Kaggle Data Search、Data Profiling、ECharts Tool 等完成查询、处理、可视化和解释。论文中特别强调 DataModel：同一份数据对人类、前端、数据库、LLM 的最佳表示不同。表格对人类可以是交互式窗口，对 LLM 可能需要线性化前几行，对后端需要持久化结构。因此 DataModel 把原始数据封装成多种输出形式，减少“把所有东西粗暴转成字符串”的脆弱性。

Plugins Agent 面向日常工具调用，接入 Google Search、Wolfram Alpha、Zapier、Klarna、Coursera、AskYourPDF、Klook 等 200+ 插件。它的关键机制是工具选择与工具扩展。用户可以手动选插件，也可以让系统自动选择最相关插件。自动选择可以抽象为：

$$
T_k=\operatorname{TopK}_{\tau\in\mathcal{T}}\operatorname{sim}\big(E(u),E(\operatorname{desc}(\tau))\big)
$$

即把用户意图 \(u\) 与工具描述 \(\operatorname{desc}(\tau)\) 编码后做相似度检索，再把候选工具交给 agent 调用。论文强调，真实插件调用还要处理 API 可用性、函数调用接口、返回长度、失败重试和前端展示，而这些通常不在纯 benchmark 中出现。

Web Agent 采用 chat agent 与 browse agent 分工。chat agent 先解析用户问题、初始 URL 和高层意图，并把复杂目标拆成更小的子指令；browse agent 再通过 Chrome Extension 观察、操作和解释网页。这个设计允许用户在浏览器侧看到执行计划和步骤，并在必要时介入。相比“黑盒式 autonomous browsing”，OpenAgents 更强调可监控、可中断、可解释的网页操作，因为真实网页会遇到 CAPTCHA、广告、页面结构变化、下载失败等不可控因素。

OpenAgents 最有工程含量的部分是实时流式解析。普通聊天模型可以边生成边把 markdown 打到前端，但 agent 输出中混有自然语言、内部思考、工具名称、工具参数、代码块、API 返回和最终回答。论文将这类流式角色识别类比为 pushdown automata：系统需要在 token 尚未完整生成时判断它属于展示文本还是工具调用缓冲区。这个机制直接影响用户体验，因为用户不应等长动作全部完成后才看到反馈，也不应看到未解析的内部控制 token。

> ⚠️ 注意：OpenAgents 的贡献不能只按“新模型”理解。它的研究价值在于补齐真实 agent 平台所需的应用层闭环：界面、状态、工具、环境、流式、错误恢复、沙箱与人机评估轨迹。

#### 🧪 练习题
```yaml
question: "OpenAgents 中 DataModel 的主要作用是什么？"
options:
  - "把所有用户数据永久删除以保护隐私"
  - "把原始数据转换为适合人类、前端、计算系统和 LLM 的不同表示"
  - "替代语言模型完成所有推理"
  - "只用于选择 Plugins Agent 的外部 API"
answer: 1
explain: "论文将 DataModel 作为数据封装层，同一份表格、图片或代码输出可按接收方转换为不同格式，从而支持渲染、存储和 LLM 提示。"
```

### API-Bank

```yaml
id: api_bank_bench
num: 24
name: API-Bank
full_name: API工具基准 (API-Bank)
year: '2023'
org: 中科院/阿里巴巴
parent: —
paper_url: https://aclanthology.org/2023.emnlp-main.187/
project_url: ''
category: benchmark
motivation: 首个系统性工具增强LLM基准
```

#### 📝 一句话总结
API-Bank 提出一个面向工具增强 LLM 的系统性基准，用真实可执行 API 环境评估模型的 Call、Retrieve+Call、Plan+Retrieve+Call 三类能力。它同时提供人工标注评测集和由五个 LLM agent 自动生成的训练集，并用 Lynx 微调实验说明工具调用能力可以被数据显著增强。

#### 🎯 核心要点
- 三层工具能力分级：已知 API 的 Call、未知 API 池中的 Retrieve+Call、多步复杂需求下的 Plan+Retrieve+Call。
- 可执行评测系统：实现 73 个常用 API，并用数据库状态和执行结果判断 API 调用是否真正正确。
- 人工评测数据：314 个工具使用对话、753 次 API 调用，覆盖多轮和多调用场景。
- 训练数据：1,000 个领域、2,138 个 API、1,888 个训练对话，由多 agent 数据生成流程构造。
- Multi-agent 数据生成：五个 ChatGPT agent 分别生成领域、API、查询、调用与响应，并由 tester agent 过滤质量不达标样本。
- API Search 机制：在 Retrieve+Call 与 Plan+Retrieve+Call 中，模型必须先用检索 API 找到候选工具，再执行实际 API。
- 评价指标：API 调用用执行一致性 Accuracy，最终响应用 ROUGE-L；错误分析覆盖 API 幻觉、格式错误、缺参、检索失败等。

#### 🔬 深入细节
![API-Bank 三类工具使用能力](https://ar5iv.labs.arxiv.org/html/2304.08244/assets/x1.png)
*图：API-Bank 将工具增强 LLM 能力分成 Call、Retrieve+Call、Plan+Retrieve+Call。难度从已知 API 的单步调用逐步上升到未知 API 池中的多步规划与检索。*

![API-Bank Multi-agent 数据生成流程](https://ar5iv.labs.arxiv.org/html/2304.08244/assets/x3.png)
*图：训练集由多个生成 agent 协作构造，tester agent 负责检查生成数据是否符合设计原则。*

API-Bank 的出发点是：LLM 使用外部工具已经成为趋势，但“会不会用工具”不能只看模型能否生成一个看似合理的函数名。真实工具调用有三个连续难点。第一，模型要在给定 API 文档时正确填参数并调用；第二，当 API 池很大时，模型要先检索到正确 API；第三，当用户需求需要多个 API 串联时，模型要规划调用顺序、传递中间结果，并根据最后执行结果回复用户。API-Bank 正是围绕这三个难点定义能力分级。

论文将用户需求空间按两个维度拆分：API 池大小和单轮调用次数。少量 API 且单/多次调用时，所有 API 文档可以直接放进上下文，主要考察 Call；大量 API 且单次调用时，模型必须 Retrieve+Call；大量 API 且多次调用时，模型还要 Plan+Retrieve+Call。这个设计比只测函数调用更严格，因为检索失败、计划顺序错误、参数传递错误都会导致最终任务失败。

```python
# API-Bank 评测流程伪代码
for dialogue in evaluation_set:
    system.reset_databases_to_default()
    api_history = []

    for turn in dialogue.turns:
        prompt = build_prompt(turn.user_query, api_history, visible_api_docs=None)
        model_output = llm.generate(prompt)

        if turn.ability in ["Retrieve+Call", "Plan+Retrieve+Call"]:
            search_keywords = parse_api_search(model_output)
            candidate_api = api_search(search_keywords)          # 返回最相似 API 元信息
            model_output = llm.generate(prompt_with(candidate_api))

        predicted_call = parse_api_call(model_output)
        predicted_result = system.execute(predicted_call)
        api_history.append((predicted_call, predicted_result))

    call_correct = execution_equivalent(predicted_calls, gold_calls)
    response_score = rouge_l(final_response, gold_response)
```

API Search 是 API-Bank 的核心机制之一。对于 Retrieve+Call 和 Plan+Retrieve+Call，模型事先不知道 API Pool 中有哪些 API，必须先把用户需求压缩成关键词，再调用一个特殊的 `API Search`。系统把关键词和所有 API 元信息编码成句向量，用余弦相似度取最高者：

$$
\operatorname{API}^{*}=\arg\max_{a\in\mathcal{P}}\cos\big(E(q),E(m_a)\big)
$$

其中 \(q\) 是模型生成的检索关键词，\(m_a\) 是 API \(a\) 的名称、描述、输入输出参数等元信息。这个设计把“工具发现”纳入评测，而不是假设所有工具永远在上下文里可见。

API 调用正确性不是字符串完全匹配，而是执行一致性。评测开始时，系统把每个 API 背后的数据库重置到默认状态，然后执行模型预测调用和人工标注调用，比较它们是否执行相同查询或修改并返回相同结果。可以写成：

$$
\operatorname{Acc}=\frac{1}{N}\sum_{i=1}^{N}\mathbf{1}\left[\operatorname{Exec}(\hat{c}_i)\equiv \operatorname{Exec}(c_i)\right]
$$

其中 \(\hat{c}_i\) 是模型调用，\(c_i\) 是标注调用。这个定义比函数名匹配更贴近真实任务，因为参数格式、数据库修改、返回值都会影响后续对话。最终自然语言回复质量则用 ROUGE-L 衡量，补充判断模型是否能把 API 结果转成用户需要的回答。

训练集构造是 API-Bank 的另一项贡献。人工标注 API 对话成本很高，论文报告每个评测对话平均约 8 美元，因此提出 Multi-agent 自动生成流程。五个 agent 分工明确：第一个生成领域，如医疗、健身、旅行；第二个结合领域生成 API，并参考 Public APIs 示例提升真实性；第三个随机选择 API 和能力类型，生成满足该能力的用户查询；第四个生成 API 调用、模拟执行结果和最终回复；第五个 tester 检查数据是否符合设计原则，并丢弃不合格实例。最终训练集覆盖 1,000 个领域、2,138 个 API、1,888 个对话和 5,221 个 turns。

```python
# API-Bank Multi-agent 训练数据生成伪代码
for _ in range(num_samples):
    domain = domain_agent.generate()
    api_specs = api_agent.generate(domain, public_api_examples)
    ability, selected_apis, query = query_agent.compose(api_specs)
    calls, responses = execution_agent.simulate(domain, selected_apis, ability, query)

    instance = {
        "domain": domain,
        "apis": selected_apis,
        "ability": ability,
        "query": query,
        "api_calls": calls,
        "responses": responses,
    }

    if tester_agent.verify(instance):
        training_set.append(instance)
```

论文用这个训练集微调 Alpaca-7B 得到 Lynx，结果显示工具能力不是 LLM 自动具备的“天然能力”。原始 Alpaca 和 ChatGLM 在基础 API Call 上约有一定正确率，但检索和规划能力很弱；GPT-3 Davinci 在 API 使用上表现很差，作者推测缺少 instruction tuning 是原因之一；GPT-3.5 的直接调用更强，但在 Retrieve+Call 和 Plan+Retrieve+Call 难度上明显下降；GPT-4 在最难规划场景更强。Lynx 相比 Alpaca 在 API Call 正确性上显著提升，并接近 GPT-3.5 的效果，说明高质量工具调用数据能教会模型稳定遵循 API 格式和调用流程。

错误分析揭示了基准的价值。Alpaca 的主要错误包括不调用 API、调用格式错误和 API 幻觉；Lynx 经过微调后“不调用 API”的问题下降，但仍会出现 API 名称不匹配或训练中见过的工具幻觉；GPT-4 的主要问题反而是检索失败，说明强推理模型也可能不会按评测要求使用 API Search。由此论文提出三个方向：更好的 API calling 方法、更严格的 API 解码算法、更大规模和更多样的训练数据。

> 💡 关键：API-Bank 的“系统性”体现在把工具使用拆成可执行、可检索、可规划、可训练、可错误分析的闭环；它不是静态问答集，而是带 API 状态和执行结果的工具环境。

#### 🧪 练习题
```yaml
question: "API-Bank 中 Retrieve+Call 与普通 Call 的关键区别是什么？"
options:
  - "Retrieve+Call 不需要执行 API，只生成自然语言答案"
  - "Retrieve+Call 中模型事先不知道目标 API，必须先通过 API Search 检索候选 API 再调用"
  - "Retrieve+Call 只评估 ROUGE-L，不评估 API 调用正确性"
  - "Retrieve+Call 要求人工在每一步实时辅助模型"
answer: 1
explain: "普通 Call 给定 API 文档，主要考察参数填充和调用；Retrieve+Call 把工具发现也纳入评测，模型必须先检索正确 API。"
```

### AgentBench

```yaml
id: agentbench
num: 25
name: AgentBench
full_name: 智能体基准 (AgentBench)
year: '2024'
org: 清华大学
parent: api_bank_bench
paper_url: https://proceedings.iclr.cc/paper_files/paper/2024/hash/e9df36b21ff4ee211a8b71ee8b7e9f57-Abstract-Conference.html
project_url: ''
category: benchmark
motivation: 涵盖8个交互环境的综合评测
```

#### 📝 一句话总结
AgentBench 提出了一个面向 LLM-as-Agent 的交互式综合基准，用 8 个真实或半真实环境统一检验模型在多轮观察、规划、行动和纠错中的能力。它解决了传统 NLP 静态题目无法衡量智能体执行能力的问题，并通过加权总分和失败类型分析揭示了商业模型与开源模型之间的明显差距。

#### 🎯 核心要点
- 提出 8 个环境的多维智能体评测：Operating System、Database、Knowledge Graph、Digital Card Game、Lateral Thinking Puzzles、House-holding、Web Shopping、Web Browsing。
- 将 LLM-as-Agent 评测形式化为部分可观测马尔可夫决策过程，模型需要基于任务指令和历史观察连续输出 Thought 与 Action。
- 覆盖三类 grounding：代码环境、游戏环境、网页环境，避免只在单一问答或单一工具调用场景中评估智能体。
- 使用环境专属指标并汇总为总体 OA 分数，包括成功率、F1、胜率、网页逐步成功率等。
- 提出按任务平均难度归一化的加权总分，降低高分任务对总体排名的支配。
- 系统分析五类执行结局：Complete、Context Limit Exceeded、Invalid Format、Invalid Action、Task Limit Exceeded。
- 对 29 个 API 商业模型与开源模型评测，发现 GPT-4 等商业模型显著领先，但仍远未达到通用可用智能体水平。
- 失败分析显示 TLE 和重复行动是主要瓶颈，指向长期推理、决策、指令遵循和自我纠错能力不足。

#### 🔬 深入细节
![AgentBench 八环境总览](https://arxiv.org/html/2308.03688v3/x3.png)
*图：AgentBench 将 LLM-as-Agent 放入 8 个交互环境中评测，覆盖代码、游戏和网页三类 grounding。*

AgentBench 的核心不是给模型一道静态题，而是让模型进入环境并持续交互。论文把交互评测定义为一个 POMDP：

$$
(S, A, T, R, U, O)
$$

其中 \(S\) 是环境状态，\(A\) 是动作空间，\(T:S\times A\to S\) 是状态转移函数，\(R\) 是奖励或判分函数，\(U\) 是任务指令空间，\(O\) 是模型可见的观察空间。LLM agent 只能看到任务描述、历史交互和当前观察，因此它必须在部分信息下计划下一步动作，而不是只从题面直接预测答案。

```python
# AgentBench 交互式评测伪代码
ENVIRONMENTS = [
    "os", "database", "knowledge_graph", "digital_card_game",
    "lateral_thinking_puzzle", "house_holding", "web_shopping", "web_browsing",
]

for env in ENVIRONMENTS:
    scores = []
    for task in env.test_set:
        obs = env.reset(task)
        history = [task.instruction, obs]
        status = "Task Limit Exceeded"

        for step in range(task.max_rounds):
            response = llm.generate(format_prompt(history))

            if not follows_required_format(response):
                status = "Invalid Format"
                break

            thought, action = parse_thought_and_action(response)
            if not env.is_valid_action(action):
                status = "Invalid Action"
                break

            obs, done, raw_score = env.step(action)
            history.extend([response, obs])

            if context_too_long(history):
                status = "Context Limit Exceeded"
                break
            if done:
                status = "Complete"
                scores.append(env.metric(raw_score))
                break

        if status != "Complete":
            scores.append(0.0)

    env_score[env] = mean(scores)

overall_score = mean(weight[env] * env_score[env] for env in ENVIRONMENTS)
```

8 个环境的设计体现了论文对“智能体能力”的拆解。OS 和 Database 考察模型能否在可执行系统中完成任务，例如写 shell 命令、操作真实数据库、提交最终答案；Knowledge Graph 用大规模 Freebase 风格接口检验不完全观察下的信息检索和路径推理；Digital Card Game 要求理解规则并制定策略；Lateral Thinking Puzzles 要求在主持人只回答 yes/no/irrelevant 的场景中逐步缩小假设空间；House-holding 使用 ALFWorld 类文本化具身环境；Web Shopping 与 Web Browsing 则将模型放入网页任务，检验搜索、点击、选择、输入和多步导航能力。

AgentBench 的一个关键工程选择是统一交互协议而不统一任务指标。不同环境的“成功”含义并不相同：OS 和 Database 可以用最终状态或答案成功率，Knowledge Graph 使用答案 F1，Digital Card Game 使用胜率，Web Browsing 更关注元素选择与动作匹配。论文没有强行把所有环境改写成同一种问答格式，而是保留每个环境的自然判分方式，再用总体分数做跨环境比较。

总体分数的设计是为了避免简单平均带来的偏差。若某个任务天然更容易，所有模型都能拿较高分，它会在朴素平均中占据过大权重；若某个任务很难，低分差异反而被淹没。论文先统计每个环境在已评测模型上的平均分 \(\bar{s}_e\)，再用其倒数作为固定权重：

$$
w_e = \frac{1}{\bar{s}_e}
$$

对模型 \(M\) 的环境分数 \(s_e(M)\)，总体分数可写成：

$$
\mathrm{OA}(M)=\frac{1}{|E|}\sum_{e\in E}w_e\,s_e(M)
$$

这个机制的直觉是“越难普遍得分越低的环境，单位提升越应该被看见”。因此 AgentBench 的 OA 不是绝对能力分，而是一个跨环境归一化后的比较分，适合给不同模型排序，但解释时必须回到各环境子分数。

AgentBench 还强调失败类型比总分更有诊断价值。论文把非正常结束分为 Context Limit Exceeded、Invalid Format、Invalid Action 和 Task Limit Exceeded。Invalid Format 通常说明模型没有遵守协议，例如数据库或卡牌环境中输出格式稍错就无法执行；Invalid Action 表示格式正确但动作不在环境动作空间内，例如 House-holding 中尝试不存在的动作；TLE 则是最常见且最有代表性的失败，因为它意味着模型在多轮中没有真正推进任务。

对 TLE 的深入分析揭示了循环和重复是长期交互中的核心问题。论文将导致 TLE 的轨迹集合记为 \(\mathcal{T}\)，每条轨迹包含模型多轮响应 \((r_1,r_2,\ldots,r_m)\)，并统计最后 \(n\) 轮中是否存在两轮回复的 Rouge-L 相似度超过阈值 \(t\)：

$$
P(n,t)=\frac{\left|\{(r_1,\ldots,r_m)\in\mathcal{T}\mid \exists i,j,\ m-n<i<j\le m \land \mathrm{RougeL}(r_i,r_j)\ge t\}\right|}{|\mathcal{T}|}
$$

论文发现大量 TLE 轨迹在最后若干轮高度重复，说明许多 LLM 并不是“差一步完成”，而是在状态估计、计划更新或失败恢复上陷入循环。这也是 AgentBench 相比静态 QA 更有价值的地方：它能暴露模型在执行层面的脆弱性。

从结果看，AgentBench 不是只证明 GPT-4 更强，而是给出了更细的能力画像。商业 API 模型总体领先，开源模型在 Knowledge Graph、Digital Card Game 和 House-holding 等环境中更容易失败；代码训练对 Web Shopping 等流程化任务有帮助，但在需要一般策略推理的任务上可能出现副作用；高质量多轮对齐数据能提升智能体表现。这些结论共同说明，智能体能力不是单一的“会推理”或“会写代码”，而是格式遵循、状态追踪、工具使用、长期规划和纠错机制的组合。

> 💡 关键：AgentBench 的创新在于把 LLM 评价从“答题正确率”推进到“环境中能否完成任务”，并用失败轨迹解释模型为什么不能完成任务。

#### 🧪 练习题
```yaml
question: "AgentBench 为什么要用每个环境平均分的倒数作为总体分数权重？"
options:
  - "为了让所有模型在每个环境中的原始分数完全相同"
  - "为了降低天然高分任务对总体排名的支配，使困难环境中的提升更可见"
  - "为了只保留 Web Browsing 这类网页任务的影响"
  - "为了把所有失败类型都转换成 Rouge-L 分数"
answer: 1
explain: "论文认为不同环境难度差异很大，朴素平均会被容易任务支配；用环境平均分倒数加权可以让跨环境比较更公平。"
```

### WebArena

```yaml
id: webarena
num: 26
name: WebArena
full_name: 网页竞技场 (WebArena)
year: '2024'
org: CMU
parent: agentbench
paper_url: https://proceedings.iclr.cc/paper_files/paper/2024/hash/4410c0711e9154a7a2d26f9b3816d1ef-Abstract-Conference.html
project_url: ''
category: benchmark
motivation: 真实网站端到端任务执行评测
```

#### 📝 一句话总结
WebArena 提出了一个可自托管、可复现、功能完整的网页智能体环境，用 812 个长程网页任务评估模型是否真正完成用户意图。它解决了以往网页基准依赖静态轨迹或表面动作匹配的问题，转而用程序化验证器检查任务的功能正确性。

#### 🎯 核心要点
- 构建独立可复现的 WebArena 环境，包含电商、论坛、协同开发、内容管理四类完整网站。
- 额外提供地图、计算器、便签和知识资源网站，使任务更接近日常浏览器使用方式。
- 提出 812 个长程网页任务，任务以高层自然语言 intent 表达，而不是给定固定动作序列。
- 观测空间包含 URL、打开的标签页和当前页面内容，页面内容可表示为 HTML DOM、截图或 accessibility tree。
- 动作空间模拟浏览器键鼠操作，包括 click、hover、type、press、scroll、tab 操作、go_back、go_forward、goto(URL)。
- 评估重点是功能正确性，使用 \(r_{\mathrm{info}}\) 对信息查询任务判分，使用 \(r_{\mathrm{prog}}\) 对导航和内容操作任务做程序化状态检查。
- 支持不可完成任务标注，要求智能体在证据不足、权限不足或网站功能缺失时输出 N/A 或等价回复。
- 实验显示最佳 GPT-4 agent 端到端成功率只有 14.41%，显著低于人类 78.24%，暴露真实网页任务对探索和失败恢复的高要求。

#### 🔬 深入细节
![WebArena 总体框架](https://webarena.dev/static/images/overview.png)
*图：WebArena 将 AI agent 放入自托管网页环境，通过真实网页应用、工具站点和程序化验证器评估功能完成度。*

WebArena 的出发点是：如果只在缓存页面或标注动作序列上评测网页 agent，模型可能学会复述动作，却未必能在真实交互中完成用户目标。论文因此构建了一套独立网站环境，网站内容来自真实世界对应物，但通过 Docker 打包为可复现环境。这样既避免 live website 随时间变化导致评测不可重复，又保留电商下单、论坛发帖、GitLab 仓库操作、CMS 配置等真实功能。

```python
# WebArena 端到端网页任务评测伪代码
for task in webarena_tasks:
    env.reset(config=task.initial_state)
    trajectory = []
    obs = env.observe(mode="accessibility_tree")

    for step in range(task.max_steps):
        prompt = build_prompt(
            intent=task.intent,
            url=obs.url,
            tabs=obs.tabs,
            page_content=obs.accessibility_tree,
            previous_actions=trajectory,
        )
        thought, action = agent.generate_next_action(prompt)

        if action == "stop":
            break

        obs = env.step(action)
        trajectory.append((thought, action, obs))

    if task.type == "information_seeking":
        answer = extract_final_answer(agent.output)
        score = r_info(answer, task.reference_answer)
    else:
        state_sequence = env.collect_intermediate_states(trajectory)
        score = r_prog(state_sequence, task.validator)

    record_success(task.id, score == 1)
```

环境层面，WebArena 选择了四类高频网页应用：在线购物对应 OneStopShop，论坛对应 Postmill 风格 Reddit，协同开发对应 GitLab，内容管理对应 Magento 管理后台。论文还加入地图、计算器、scratchpad 和离线 Wikipedia、GitLab 文档、Adobe Commerce 文档等知识资源。这个设计让任务可以跨网站组合，例如先在 Wikipedia 或地图找信息，再把结果写入 GitLab README，而不是停留在单页按钮点击。

观测空间是 WebArena 的关键机制。模型在每一步会看到页面 URL、标签页状态和当前页面内容。页面内容可用三种形式表示：HTML DOM 树、截图、accessibility tree。论文实验主要使用带元素 ID 的 accessibility tree，因为它比 DOM 更紧凑，同时保留 link、button、textbox 等可交互角色和文本属性。元素 ID 使动作选择变成明确的分类问题，例如 `click [1582]` 表示点击观察中编号为 1582 的按钮，避免了自然语言描述元素时的歧义。

动作空间模拟浏览器使用，而不是只允许固定 API 调用。核心动作包括：

```python
# WebArena 代表性动作空间
noop()
click(elem)
hover(elem)
type(elem, text)
press(key_comb)
scroll(direction)
tab_focus(index)
new_tab()
tab_close()
go_back()
go_forward()
goto(url)
```

这些动作让 agent 可以完成多标签页对照、表单输入、页面导航、搜索、配置修改等长程行为。与静态网页问答相比，这里每一步都会改变页面状态或 agent 可见的信息，因此模型必须持续维护任务目标、当前状态和下一步计划。

WebArena 最重要的评测创新是功能正确性。对信息查询任务，论文给每个 intent 标注参考答案 \(a^*\)，并用三类函数比较预测答案 \(\hat{a}\)：`exact_match` 要求完全一致，`must_include` 要求答案包含关键内容，`fuzzy_match` 使用 GPT-4 判断语义等价。可写作：

$$
r_{\mathrm{info}}(\hat{a}, a^*)\in\{\mathrm{exact\_match},\mathrm{must\_include},\mathrm{fuzzy\_match}\}
$$

对导航、内容创建和配置任务，答案不是一句文本，而是网站状态是否被正确改变。论文定义程序化检查函数 \(r_{\mathrm{prog}}(s)\)，其中 \(s\) 是执行轨迹中的中间状态或最终状态。验证器先用 locator 找到关键内容，例如当前 URL、最新帖子、仓库 README、数据库记录或页面 DOM 片段，再用 `exact_match` 或 `must_include` 检查是否满足 intent。

整体成功率可以概括为：

$$
\mathrm{SR}=\frac{1}{N}\sum_{i=1}^{N}\mathbf{1}[\mathrm{validator}_i(\tau_i)=1]
$$

其中 \(\tau_i\) 是第 \(i\) 个任务的执行轨迹，\(\mathrm{validator}_i\) 根据任务类型调用 \(r_{\mathrm{info}}\) 或 \(r_{\mathrm{prog}}\)。这个指标允许多条不同路径都被判为正确，因为只要最终网站状态满足用户目标，轨迹不必与参考动作完全相同。

WebArena 还显式设计不可完成任务。真实用户可能提出证据不存在、权限不足或网站不支持的请求，例如要求查找网站没有公开的联系电话。此时正确行为不是编造答案，而是识别不可完成并返回 N/A 或等价说明。这个机制让 WebArena 同时评估“完成任务”的能力和“不该行动时停止”的能力。

实验结果说明真实网页任务远比传统基准困难。使用 accessibility tree 和 CoT 提示时，GPT-4 的端到端成功率仍只有 14.41%，人类为 78.24%。论文分析发现，UA hint 会帮助模型识别不可完成任务，却也会让 GPT-4 过早把可行任务判断为不可完成；移除该提示后可行任务表现提升，但不可完成任务识别下降。这表明交互式网页 agent 对提示细节非常敏感，也说明真实任务需要更强的主动探索、状态核对和失败恢复能力。

> ⚠️ 注意：WebArena 不是“网页问答数据集”，而是一个带可执行网站、状态重置和程序化验证器的环境；它评估的是端到端完成意图，而不是预测下一步参考动作。

#### 🧪 练习题
```yaml
question: "WebArena 相比基于参考动作序列的网页基准，最核心的评估变化是什么？"
options:
  - "只评估模型是否输出更长的 Chain-of-Thought"
  - "只比较模型点击的元素 ID 是否和人工轨迹完全一致"
  - "通过信息匹配或程序化状态检查评估任务是否功能性完成"
  - "把所有网页任务都转换成多项选择题"
answer: 2
explain: "WebArena 允许不同有效路径完成同一意图，因此重点检查最终答案或网站状态是否满足 intent，而不是要求动作序列表面一致。"
```

### GAIA

```yaml
id: gaia
num: 27
name: GAIA
full_name: 通用AI助手评测 (GAIA)
year: '2024'
org: Meta/HuggingFace
parent: agentbench
paper_url: https://proceedings.iclr.cc/paper_files/paper/2024/hash/25ae35b5b1738d80f1f03a8713e405ec-Abstract-Conference.html
project_url: ''
category: benchmark
motivation: 现实世界复杂任务评测
```

#### 📝 一句话总结
GAIA 提出了一个面向通用 AI 助手的现实世界问答基准，用 466 个答案简短但求解过程复杂的问题检验推理、多模态、网页浏览和工具使用能力。它解决了传统高难考试型或多选题基准容易饱和、难以解释和易受污染的问题，强调“人类觉得概念简单但 AI 需要多步行动才能完成”的任务。

#### 🎯 核心要点
- 构建 466 个由人工设计和标注的问题，覆盖日常任务、科学、常识、文件读取、网页检索、计算和多模态理解。
- 每题要求一个简短、事实性、无歧义的答案，便于自动评测而不依赖开放式人工打分。
- 采用 zero-shot 助手提示，模型需在回答末尾输出 `FINAL ANSWER: ...` 以便抽取和归一化判分。
- 难度分为 Level 1、Level 2、Level 3，主要依据人工求解时的步骤数和工具数，而不是学科专业难度。
- 数据集强调 non-gameability：答案设计上不应以明文出现在训练数据中，必须通过多步检索、转换、计算或文件处理得到。
- 问题验证要求原作者之外的两名标注者独立作答并达成同一答案，否则修正或移除。
- 发布 166 题带答案开发集，保留 300 题答案用于 leaderboard，避免公开答案导致评测污染。
- 论文报告人类平均成功率约 92%，而带插件 GPT-4 约 15%，展示当前 AI 助手与普通人稳健完成现实任务之间的差距。

#### 🔬 深入细节
![GAIA 能力覆盖分布](https://ar5iv.labs.arxiv.org/html/2311.12983/assets/x2.png)
*图：GAIA 问题覆盖的能力分布，包含推理、网页浏览、多模态、代码/计算和多文件类型处理等能力。*

![GAIA 步数与工具数分布](https://ar5iv.labs.arxiv.org/html/2311.12983/assets/x3.png)
*图：GAIA 用人工标注的步骤数和工具数刻画题目难度，点的大小表示对应问题数量。*

GAIA 的核心理念与“把题目做得更难”不同。论文认为，如果一个 benchmark 需要博士级专业知识或很长的开放式输出，人类评估会昂贵且不稳定，模型评估又会依赖更强模型。GAIA 反过来选择普通人能理解、答案短且可核验的问题，但要求 AI 系统完成多步行动，例如浏览网页、读取附件、处理表格、对图像或音频取证、运行代码计算、组合多个来源的信息。

```python
# GAIA 自动评测流程伪代码
SYSTEM_PROMPT = """
You are a general AI assistant. Report your thoughts, and finish with:
FINAL ANSWER: [YOUR FINAL ANSWER]
The final answer should be a number, a few words, or a comma-separated list.
"""

for item in gaia_questions:
    prompt = SYSTEM_PROMPT + item.question
    files = item.attachments

    trace = assistant.solve(
        prompt=prompt,
        files=files,
        tools=["web_browser", "code_interpreter", "file_reader", "calculator"],
    )

    predicted = extract_after_final_answer(trace)
    predicted_norm = normalize(predicted, answer_type=item.answer_type)
    gold_norm = normalize(item.ground_truth, answer_type=item.answer_type)

    score = int(quasi_exact_match(predicted_norm, gold_norm))
    record(item.id, score)

final_score = mean(recorded_scores)
```

评测公式可以写成标准的归一化精确匹配平均值：

$$
\mathrm{Score}(M)=\frac{1}{N}\sum_{i=1}^{N}\mathbf{1}\left[\mathrm{norm}(\hat{a}_i)=\mathrm{norm}(a_i^*)\right]
$$

其中 \(\hat{a}_i\) 是模型从 `FINAL ANSWER` 中抽取的答案，\(a_i^*\) 是人工标注的唯一正确答案，\(\mathrm{norm}\) 会根据答案类型做必要归一化，例如数字、短字符串或逗号分隔列表。论文称其为 quasi exact match，因为目标不是语义开放评分，而是在允许格式归一化后检查是否与真值一致。

GAIA 的问题设计强调“Proof of Work”式直觉：求解可能很麻烦，但验证很简单。比如 Level 1 题可能要求查 NIH 网站上的临床试验实际招募人数；Level 2 题可能要求结合图像、Wikipedia 标准和百分比计算；Level 3 题可能要求追踪 NASA APOD、识别宇航员小组、排除无太空飞行记录者、再计算分钟数并按指定格式输出。每个答案都很短，但中间路径需要可靠执行多个步骤。

难度分级不是按题面知识难度，而是按人工求解路径的行动复杂度。Level 1 通常不需要工具或最多一个工具，步骤不超过 5；Level 2 通常需要约 5 到 10 步，并组合不同工具；Level 3 面向接近完美的通用助手，可能需要很长动作序列、任意数量工具和开放世界访问。论文也说明这不是硬规则，例如少于 10 步但需要复杂网页导航的问题也可能归为 Level 3。

题目构建流程是 GAIA 可信度的关键。问题由人类设计，来源可以是可信网页、论文、Wikipedia、Papers with Code、arXiv、随题附带文档或自包含谜题。创建者不仅给出答案，还标注元数据，例如使用了哪些工具、采取了多少步骤、耗时多久。随后两名新的标注者独立作答；只有原作者和两名验证者得到相同答案时，题目才通过。论文报告约 68% 题目可直接通过，其余需要修正或移除，这说明“无歧义短答案”在真实网页和文件任务中并不自动成立。

GAIA 特别关注抗污染和不可游戏化。多选题即使推理错误也可能撞对选项，训练集中出现选项或答案也较难发现；GAIA 则要求模型实际完成检索和转换过程，并且答案设计上不应以明文存在于预训练文本中。即使发生数据污染，研究者也能检查模型的 reasoning trace 是否合理，并按论文给出的构题方法补充新问题。

与 WebArena 或 AgentBench 相比，GAIA 不是让 agent 在封闭环境中点击和修改状态，而是让通用助手面对开放世界问题。它不细分每个工具调用是否正确，也不要求必须通过某种固定路径求解；只要最终短答案正确即可。这让 GAIA 更接近真实用户问助手的问题，但也意味着它评估的是整体系统能力，包括模型、提示、浏览器、代码解释器、文件读取器和工具选择策略的组合。

实验结果突出当前系统的短板。论文报告人类验证者平均约 92% 成功率，而 GPT-4 即使配合插件也约 15%，且 Level 3 对当时系统几乎不可解。这里的差距不是因为题目对人类非常专业，而是因为 AI 系统在真实信息获取、跨模态转换、工具稳定性、格式遵循和长程执行上仍不稳健。GAIA 因此把“通用助手”定义为能像普通人一样可靠完成概念简单现实任务的系统，而不是只会在考试题上拿高分的模型。

> 💡 关键：GAIA 的难点不在最终答案长度，而在得到答案前必须稳定完成一连串检索、阅读、计算、转换和核验动作。

#### 🧪 练习题
```yaml
question: "GAIA 为什么偏好短、事实性、无歧义的最终答案？"
options:
  - "为了让模型不能使用网页浏览工具"
  - "为了把复杂求解过程变成可自动、快速、稳定验证的结果"
  - "为了只测试闭卷记忆能力"
  - "为了让所有问题都变成多项选择题"
answer: 1
explain: "GAIA 允许求解过程很复杂，但最终答案必须容易核验；这避免开放式人工评分，并能用归一化精确匹配进行自动评测。"
```

### SWE-bench

```yaml
id: swe_bench
num: 28
name: SWE-bench
full_name: 软件工程基准 (SWE-bench)
year: '2024'
org: 普林斯顿
parent: agentbench
paper_url: https://arxiv.org/abs/2310.06770
project_url: ''
category: benchmark
motivation: 真实GitHub Issue解决能力评测
```

#### 📝 一句话总结
SWE-bench 提出了一个基于真实 GitHub issue 和 pull request 的软件工程基准测试，包含来自 12 个主流 Python 仓库的 2,294 个任务实例，用于评估语言模型在真实代码库中定位并修复 bug 的能力，揭示了当前最强模型（Claude 2）仅能解决 4.80% 的问题，凸显了实际软件工程任务的巨大挑战。

#### 🎯 核心要点
- **真实世界基准**：从 12 个高星 Python 开源仓库（Django、scikit-learn、sympy、Flask 等）中收集 2,294 个经过严格筛选的 issue-PR 对，每个任务都有可执行的单元测试验证
- **三阶段自动化构建流水线**：Repo Selection → Attribute-based Filtering → Execution-based Filtering，确保每个任务实例具备可复现的测试环境和明确的 fail-to-pass 测试用例
- **任务定义**：给定 issue 描述文本和对应代码库快照，模型需生成一个能通过所有相关测试的代码补丁（patch）
- **评估框架**：基于 fail-to-pass（修复目标测试）和 pass-to-pass（不破坏已有功能）两类测试的执行结果进行自动化评判
- **SWE-Llama 微调模型**：基于 CodeLlama（7B/13B）使用 LoRA 在 19,000 个来自 37 个非重叠仓库的 issue-PR 对上微调，显著优于基础模型
- **多种检索策略**：BM25 和 Oracle 两种上下文检索方式，探索不同信息量对模型性能的影响
- **关键发现**：所有模型在该基准上表现极差，最佳结果为 Claude 2 在 Oracle 检索下的 4.80%，说明真实软件工程问题远超当前 LLM 能力

#### 🔬 深入细节
![SWE-bench 总览示意图](https://ar5iv.labs.arxiv.org/html/2310.06770/assets/x1.png)
*图：SWE-bench 构建与评估流程总览。左侧展示从 GitHub 仓库中自动化收集和筛选任务实例的三阶段流水线，右侧展示模型接收 issue 文本和代码上下文后生成补丁并通过测试验证的评估流程。*

##### 动机与背景

现有代码生成基准（如 HumanEval、MBPP、APPS）主要评估模型在**独立函数级别**的代码生成能力，任务通常是根据自然语言描述从零编写一个短函数。然而，真实的软件工程工作远不止于此——开发者需要在**大规模代码库**中理解跨文件依赖关系、定位 bug 根因、设计符合项目风格的修复方案，并确保修改不会引入新的回归问题。SWE-bench 正是为了填补这一评估空白而设计的。

与传统基准不同，SWE-bench 的每个任务都来自**真实的开源项目**，issue 描述由真实用户撰写（可能包含 bug 报告、功能请求、代码片段、错误堆栈等），解决方案涉及对一个或多个文件的修改。这使得 SWE-bench 能够评估模型在以下方面的综合能力：代码理解、bug 定位、跨文件编辑、测试意识以及对项目规范的遵循。

##### 三阶段构建流水线

SWE-bench 的数据收集采用了一个精心设计的三阶段自动化流水线：

**Stage I — 仓库选择（Repo Selection）**：从 GitHub 上筛选使用广泛、维护活跃、测试覆盖良好的 Python 仓库。最终选定 12 个仓库，涵盖 Web 框架（Django、Flask）、科学计算（scikit-learn、sympy、matplotlib）、开发工具（pylint、pytest）等多个领域。

**Stage II — 属性过滤（Attribute-based Filtering）**：对每个仓库中的 pull request 进行初步筛选，要求：(1) PR 必须关联至少一个 issue；(2) PR 必须修改至少一个测试文件（确保有可验证的测试）；(3) PR 已被合并到主分支。这一步将候选数量从数万缩减到数千。

**Stage III — 执行过滤（Execution-based Filtering）**：这是最关键的一步。对每个候选 PR，系统会：
1. 检出 PR 合并前的代码库版本（base commit）
2. 应用 PR 中的测试文件修改（但不应用源代码修改）
3. 运行测试套件，识别出**fail-to-pass 测试**（在 base commit 上失败、在合并后通过的测试）和 **pass-to-pass 测试**（始终通过的测试）
4. 仅保留至少有一个 fail-to-pass 测试的实例

这种执行级验证确保了每个任务实例都有明确的"正确性标准"——模型生成的补丁必须让 fail-to-pass 测试通过，同时不破坏 pass-to-pass 测试。

![SWE-bench 数据分布](https://ar5iv.labs.arxiv.org/html/2310.06770/assets/x2.png)
*图：SWE-bench 任务实例的统计分布，包括 issue 描述长度、代码库规模、需要编辑的文件/函数/行数等维度。*

##### 任务形式化与评估机制

SWE-bench 的任务被形式化定义为：给定一个 issue 文本描述 \(I\) 和代码库快照 \(C\)（对应 base commit），模型需要生成一个补丁 \(P\)，使得将 \(P\) 应用到 \(C\) 后，所有 fail-to-pass 测试通过且所有 pass-to-pass 测试保持通过。

评估指标为 **% Resolved**，即成功解决的任务实例占总数的百分比。一个任务被视为"解决"当且仅当：

$$\text{Resolved}(P) = \mathbb{1}\left[\text{F2P}(C \oplus P) = \text{PASS} \wedge \text{P2P}(C \oplus P) = \text{PASS}\right]$$

其中 \(\text{F2P}\) 和 \(\text{P2P}\) 分别表示 fail-to-pass 和 pass-to-pass 测试集的执行结果。

论文探索了两种上下文检索策略来为模型提供相关代码：
- **BM25 检索**：使用 issue 文本作为查询，对代码库中的文件/函数进行 BM25 检索，选取最相关的代码片段
- **Oracle 检索**：直接提供 gold patch 中涉及的文件内容（上界参考）

同时探索了两种输出格式：
- **Patch 格式**：模型直接生成 unified diff 格式的补丁
- **Full File 格式**：模型输出完整的修改后文件

```python
# SWE-bench 评估流程伪代码
def evaluate_instance(model, issue_text, codebase, tests):
    # Step 1: 检索相关代码上下文
    context = retrieve_context(issue_text, codebase)  # BM25 or Oracle
    
    # Step 2: 构造 prompt（issue + context）
    prompt = format_prompt(issue_text, context)
    
    # Step 3: 模型生成补丁
    patch = model.generate(prompt)
    
    # Step 4: 应用补丁到代码库
    patched_codebase = apply_patch(codebase, patch)
    
    # Step 5: 运行测试验证
    f2p_result = run_tests(patched_codebase, tests['fail_to_pass'])
    p2p_result = run_tests(patched_codebase, tests['pass_to_pass'])
    
    return f2p_result == PASS and p2p_result == PASS
```

##### SWE-Llama 微调策略

为了建立更强的基线，作者基于 CodeLlama（7B 和 13B）使用 LoRA 进行了微调，得到 SWE-Llama 系列模型。训练数据来自 37 个与 SWE-bench 测试集**无重叠**的 Python 仓库，共收集约 19,000 个 issue-PR 对。

微调采用标准的指令跟随格式：输入为 issue 描述 + 检索到的代码上下文，输出为对应的 gold patch。使用 LoRA（rank=64, alpha=16）在 4 个 A100 GPU 上训练 2 个 epoch。

> 💡 关键：SWE-Llama 13B 在 BM25 检索下达到 1.00% 的解决率，虽然绝对值不高，但相比基础 CodeLlama 13B 的 0.70% 有显著提升，证明了领域微调的价值。

##### 实验结果与关键发现

论文对多个模型进行了系统评估，核心结果如下：

| 模型 | BM25 检索 (% Resolved) | Oracle 检索 (% Resolved) |
|------|----------------------|------------------------|
| Claude 2 | 1.96% | **4.80%** |
| GPT-4 | 0.17% | 1.74% |
| ChatGPT-3.5 | 0.52% | 0.70% |
| SWE-Llama 13B | 1.00% | 3.00% |
| SWE-Llama 7B | 0.70% | 2.22% |
| CodeLlama 13B | 0.70% | 1.22% |

**关键发现**：

1. **整体表现极差**：即使是最强的 Claude 2 在 Oracle 检索（已知需要修改哪些文件）下也仅解决 4.80% 的问题，说明真实软件工程任务对当前 LLM 构成巨大挑战。

2. **上下文检索至关重要**：Oracle 检索相比 BM25 检索带来显著提升（Claude 2: 1.96% → 4.80%），表明**定位正确的代码文件**本身就是一个核心难点。

3. **Patch 格式优于 Full File 格式**：直接生成 diff 补丁比输出完整文件效果更好，因为后者需要模型精确复制大量未修改的代码。

4. **难度与上下文长度正相关**：需要更多代码上下文的任务（涉及更多文件、更长函数）解决率更低，模型倾向于只解决需要少量局部修改的简单问题。

5. **模型生成的补丁偏简单**：成功解决的任务通常只涉及 1 个文件、少量行的修改，而 SWE-bench 中许多任务需要跨文件的复杂编辑。

> ⚠️ 注意：SWE-bench 的难度不仅来自代码生成本身，更来自于**理解模糊的 issue 描述**、**在大型代码库中定位问题**、以及**生成符合项目规范的完整修复方案**这一综合挑战。

#### 🧪 练习题
```yaml
question: "SWE-bench 评估流程中，一个任务实例被判定为'已解决'的条件是什么？"
options:
  - "模型生成的补丁能够成功应用到代码库上"
  - "模型生成的补丁使 fail-to-pass 测试通过，且 pass-to-pass 测试保持通过"
  - "模型生成的补丁与 gold patch 完全一致"
  - "模型生成的补丁通过了代码审查（code review）"
answer: 1
explain: "SWE-bench 采用执行级评估，要求补丁同时满足两个条件：让原本失败的测试通过（fail-to-pass），且不破坏原本通过的测试（pass-to-pass），而非要求与标准答案完全匹配。"
```

### Hi-CoT

```yaml
id: hi_cot
num: 29
name: Hi-CoT
full_name: 分层思维链 (Hierarchical CoT)
year: '2026'
org: arXiv
parent: cot
paper_url: https://arxiv.org/abs/2604.00130
project_url: ''
category: frontier_2026
motivation: 分层架构解决超长任务上下文丢失
```

#### 📝 一句话总结
Hi-CoT 提出一种零样本、推理时生效的分层思维链提示方法，通过交替生成 `instruction` 与 `execution` 块，把扁平 CoT 改造成持续规划、持续执行、持续压缩的结构化轨迹，从而缓解长推理中的冗余、漂移和上下文噪声问题。

#### 🎯 核心要点
- 交替式层次结构：每个推理阶段由高层指令 `I_i` 和低层执行 `E_i` 组成，而不是一次性输出完整线性 CoT。
- 零样本推理时方法：不需要微调、不引入额外模型、不做多路径搜索，只通过提示格式约束单条生成轨迹。
- 针对 Plan-and-Solve 的缺陷：避免“先写全局计划、后续执行逐步偏离”的 plan-execution drift。
- 压缩瓶颈机制：每次执行前要求模型把当前状态压缩为一个短指令，过滤重复解释、无关铺垫和低信息量内容。
- 显式可审计轨迹：每个执行步骤都有对应指令，可直接检查“为什么做这一步”和“这一步是否按计划完成”。
- 主要评测：在 Qwen3 与 DeepSeek-R1 蒸馏模型的 13 个配置上，覆盖 AIME24、AMC、MATH500、Minerva Math、OlympiadBench 五个数学推理基准。
- 论文报告效果：平均准确率提升 6.2%，最高任务/模型组合提升 61.4%，相对 CoT 平均减少 13.9% 推理 token；严格遵守格式时，在 AMC 与 MATH500 子集上可达到 100% 准确率。

#### 🔬 深入细节
![Hi-CoT 与 CoT、Plan-and-Solve 的结构对比](https://arxiv.org/html/2604.00130v1/x2.png)
*图：论文 Figure 2。CoT 是扁平步骤链，Plan-and-Solve 是一次性全局计划加线性执行，Hi-CoT 则在每个阶段交替生成局部指令和局部执行。*

Hi-CoT 的核心不是让模型“想得更长”，而是让模型“每一步先说明当前要做什么，再执行这件事”。论文把复杂任务 \(T\) 分解为动态长度的阶段序列 \(S_1,S_2,\ldots,S_n\)，其中 \(n\) 不预设，由模型根据题目复杂度决定。每个阶段定义为：

$$
S_i = (I_i, E_i)
$$

其中 \(I_i\) 是 instruction step，用来概括当前状态下的局部目标、策略或下一步计划；\(E_i\) 是 execution step，用来执行该计划，完成具体计算、代数变换、逻辑推断或最终答案生成。完整轨迹可写成：

$$
\tau_{\text{Hi-CoT}} = I_1 \rightarrow E_1 \rightarrow I_2 \rightarrow E_2 \rightarrow \cdots \rightarrow I_n \rightarrow E_n
$$

```python
# Hi-CoT 推理时伪代码：单模型、单轨迹、无搜索

def hi_cot(problem, llm, max_steps=16):
    history = []

    for step in range(1, max_steps + 1):
        instruction = llm.generate(
            problem=problem,
            history=history,
            constraint="输出 <|instruction|>，只规划下一步，不展开计算"
        )

        execution = llm.generate(
            problem=problem,
            history=history + [instruction],
            constraint="输出 <|execution|>，只执行刚才的 instruction"
        )

        history.append((instruction, execution))

        if "\\boxed" in execution or is_final_answer(execution):
            break

    return format_as_hicot(history)
```

传统 CoT 的问题在于没有结构化的中间控制点。模型虽然会输出很多“step by step”的文本，但这些文本通常混合了目标选择、解释、计算、回顾和最终答案，导致长题上容易反复解释、偏离最初目标，甚至在中途引入无关推断。Plan-and-Solve 试图通过先生成全局计划来修正这一点，但它的计划通常只在开头出现一次，后续每一步执行没有强约束；一旦某个局部计算错了，模型不会自然地暂停、重估、压缩当前状态，而是继续沿着已经漂移的轨迹往下写。

Hi-CoT 把“计划”从一次性的全局前缀改造成每一步的局部控制信号。第 \(i\) 步指令 \(I_i\) 依赖上一轮执行结果 \(E_{i-1}\)，可抽象为：

$$
I_i = C(T, E_{<i})
$$

这里 \(C\) 表示一种压缩操作：模型必须把题目、已完成推理和剩余目标压缩成一个短而明确的下一步目标。执行步骤则是：

$$
E_i = F(T, E_{<i}, I_i)
$$

也就是在当前题目、历史执行结果和局部指令的约束下完成具体推理。这个设计的直觉是：如果模型每次都要先把“现在该做什么”说清楚，它就更难在无约束的长文本中游走，也更容易把局部计算和全局目标对齐。

> 💡 关键：Hi-CoT 的“层次”不是多智能体或多模型层次，而是同一个模型在输出格式中显式区分高层计划与低层执行。它把推理链从 `step -> step -> step` 变为 `plan -> act -> plan -> act`。

论文强调的压缩瓶颈非常重要。普通 CoT 往往把历史上下文原样延续下去，模型越写越长，前面产生的冗余内容也会继续进入后续条件分布。Hi-CoT 要求每轮先输出一个短指令，相当于在进入下一轮计算前做一次摘要式状态更新。这个瓶颈会丢弃低价值内容，只保留“下一步需要什么”，因此既减少 token，又降低由冗余文本引发的推理干扰。论文在效率实验中报告，Hi-CoT 相比 CoT 平均减少 13.9% 响应长度，在 MATH500 上常减少数百到上千个 token。

与 Tree-of-Thoughts、Graph-of-Thoughts 或多路径 self-consistency 相比，Hi-CoT 的成本更低，因为它不采样多个候选、不做显式搜索、不调用外部验证器。它的收益来自结构约束而不是算力扩张。可以把它看作一种“单轨迹结构化搜索”：每个 instruction 是局部搜索方向，每个 execution 是沿该方向推进一步；如果 instruction 写得清楚，轨迹就更像受控求解过程，而不是自由文本漫游。

论文还区分了严格格式 Hi-CoT 与 format-relaxed 变体。format-relaxed 只要求模型按层次化思路推理，但不严格检查 `<|instruction|>` 与 `<|execution|>` 的交替。实验显示 relaxed 版本也有收益，但通常低于严格版本，说明关键不只是“提醒模型要有计划”，而是让计划和执行形成可解析、可校验的交替结构。论文对格式合规响应做进一步分析，发现当模型严格遵守交替格式并在结尾使用 `\boxed{}` 给出答案时，准确率和 token 效率都会进一步提升。

Hi-CoT 的局限也很明确：它依赖模型的指令遵循能力。如果模型不能稳定输出指定标签，或在 execution 中混入新的无约束计划，层次结构会退化为普通 CoT。因此论文指出，未来可通过 SFT 或 RL 强化格式遵守，使模型更稳定地把局部规划、局部执行和最终答案分开。对超长任务而言，这一点尤其关键，因为格式失败本身会重新引入上下文污染与步骤漂移。

```yaml
question: "Hi-CoT 中交替生成 <|instruction|> 与 <|execution|> 的主要目的是什么？"
options:
  - "让模型输出更长的推理链，从而覆盖更多可能路径"
  - "在每一步执行前形成压缩瓶颈和局部目标，减少冗余与计划漂移"
  - "把单个模型拆成多个专家模型并进行投票"
  - "用外部搜索算法枚举所有可行推理树"
answer: 1
explain: "Hi-CoT 的核心是每步先规划再执行，让 instruction 压缩当前状态并约束 execution；它不是多模型投票，也不依赖多路径搜索。"
```

### Gaia2

```yaml
id: gaia2
num: 30
name: Gaia2
full_name: 动态异步基准 (Gaia2)
year: '2026'
org: arXiv
parent: gaia
paper_url: https://arxiv.org/abs/2602.11964
project_url: ''
category: frontier_2026
motivation: 动态异步环境评测Agent鲁棒性
```

#### 📝 一句话总结
Gaia2 提出了 ARE（Agent Runtime Environment）研究平台和 Gaia2 基准，通过异步动态模拟环境、7 大能力维度（Execution、Search、Ambiguity、Adaptability、Time、Noise、Agent2Agent）和基于状态变更的验证器，系统评估前沿 LLM Agent 在真实场景中的鲁棒性与协作能力，揭示了当前最强模型（GPT-5 达 42.1% pass@1）仍远未解决的 Agent 挑战。

#### 🎯 核心要点
- **ARE 平台**：提出 5 大核心抽象——Apps（有状态 API）、Environments（应用集合+时间管理）、Events（全量日志化的依赖图）、Notifications（可配置的可观测层）、Scenarios（初始状态+事件 DAG+验证方法），支持异步时间推进
- **Mobile 环境**：实例化 12 个消费级应用（Messages、Chats、Emails、Calendar、Contacts、Shopping、Cabs、Files 等），101 个工具，每个 Universe 包含 400K–800K tokens 的结构化/非结构化内容
- **7 大能力维度**：5 个核心能力（Execution、Search、Ambiguity、Adaptability、Time）+ 2 个环境增强（Noise 注入工具异常/垃圾事件、Agent2Agent 多智能体协作）
- **ARE Verifier**：基于写操作状态变更的目标导向验证器，区分 read/write 操作，支持一致性、因果性、时序性、完整性四维评估，在 450 条标注轨迹上达 0.98 agreement 和 0.99 precision
- **基准规模**：Gaia2 包含 877 个场景（完整版）和 247 个场景（mini 版），每个场景运行 3 次以控制方差
- **实证发现**：GPT-5 (high) 以 42.1% pass@1 领先，Claude-4-Sonnet 34.8%；Time 和 Noise 维度最具挑战性；Agent2Agent 协作对弱模型帮助更大，异构团队（强主+弱执行）可有效平衡计算-质量权衡
- **兼容性验证**：ARE 可忠实复现 τ-bench、τ²-bench、GAIA、BFCL-v3、VendingBench 等现有基准

#### 🔬 深入细节
##### 核心架构图

![Gaia2 ARE 框架总览](https://arxiv.org/html/2503.20776v2/x2.png)
*图：ARE 平台架构。左侧为 Environment（包含多个 Apps、Time Manager 和 Rules），中间为 Events 依赖图和 Notifications 层，右侧为 Agent 与 User Interface 的交互。Scenarios 定义初始状态、事件 DAG 和验证方法。*

![Gaia2 能力维度与评估结果](https://arxiv.org/html/2503.20776v2/x5.png)
*图：各模型在 Gaia2 七大能力维度上的雷达图表现。GPT-5 (high) 在多数维度领先，但 Time 维度仅 Gemini-2.5-Pro 和 Claude-4-Sonnet 有显著得分。*

##### 算法/系统伪代码

```python
# ARE 场景执行与验证流程伪代码
class AREScenario:
    def __init__(self, universe, event_dag, oracle_writes):
        self.env = MobileEnvironment(universe)  # 12 apps, 101 tools
        self.event_dag = event_dag              # 事件依赖图 (DAG)
        self.oracle_writes = oracle_writes      # 预期写操作序列
        self.time_manager = TimeManager()       # 异步时间管理

    def run(self, agent, max_steps=200):
        self.env.initialize()                   # 加载 universe 状态
        self.event_dag.schedule_events()        # 按 DAG 调度事件

        for step in range(max_steps):
            # 1. 环境异步推进：模型生成消耗模拟时间
            elapsed = agent.generation_time
            self.time_manager.advance(elapsed)
            triggered_events = self.event_dag.check_triggers(self.time_manager.now)

            # 2. 通知层：根据策略推送事件到 Agent 上下文
            notifications = self.notification_policy.filter(triggered_events)
            agent.context.append(notifications)

            # 3. Agent 执行 ReAct 循环
            action = agent.reason_and_act(self.env.available_tools)
            result = self.env.execute(action)   # read 或 write 操作

            # 4. 在线验证（可选）
            if self.verifier.check_online(action, result):
                break  # 验证完成

        return self.verifier.evaluate(self.env.write_log, self.oracle_writes)

class AREVerifier:
    def evaluate(self, actual_writes, oracle_writes):
        scores = {}
        # (i) 一致性：工具名/参数精确匹配 + LLM rubric 灵活匹配
        scores['consistency'] = self.check_consistency(actual_writes, oracle_writes)
        # (ii) 因果性：写操作必须遵循依赖 DAG 顺序
        scores['causality'] = self.check_dag_order(actual_writes, oracle_writes)
        # (iii) 时序性：操作在容忍窗口内完成
        scores['timing'] = self.check_timing_windows(actual_writes, oracle_writes)
        # (iv) 完整性：所有 oracle 写操作均被匹配
        scores['completeness'] = self.check_completeness(actual_writes, oracle_writes)
        return all(scores.values())
```

##### 方法深入解读

**动机与背景：为什么需要 Gaia2？**

现有 Agent 基准（如 GAIA、AppWorld、τ-bench）存在三个根本局限：(1) **静态环境**——任务在固定快照上执行，无法评估 Agent 对动态事件的响应能力；(2) **同步执行**——Agent 的推理时间不影响环境状态，无法测试时间感知能力；(3) **能力维度单一**——多数基准仅评估工具调用或信息检索，缺乏对歧义处理、适应性、噪声鲁棒性和多 Agent 协作的系统评估。Gaia2 通过 ARE 平台的异步架构和 7 大能力维度，填补了这些空白。

> 💡 关键：ARE 的异步时间机制是核心创新——模型生成直接消耗模拟时间，如果 Agent 响应慢，环境时钟仍在推进，外部事件可能在推理过程中发生。这使得"时间感知"和"响应性"成为可评估的维度。

**ARE 五大抽象的设计逻辑**

ARE 的设计围绕"解耦 Agent 与环境"展开：

1. **Apps**：有状态 API，每个 App 暴露的工具被类型化为 read 或 write。这一区分至关重要——验证器只检查 write 操作（状态变更），Agent 可以自由执行任意数量的 read 操作进行探索，不会被惩罚。这避免了"过度约束探索策略"的问题。

2. **Events 与依赖图**：所有发生的事情（工具调用、状态变更、定时更新）都被建模为 Events，组织为 DAG。事件可以按绝对时间戳调度，也可以相对于其他事件调度。这使得复杂的多步骤场景（如"收到邮件后 30 分钟提醒用户"）可以自然表达。

3. **Notifications**：可配置的可观测层，策略决定哪些事件被推送到 Agent 上下文。这使得研究者可以控制 Agent 的信息获取方式——从完全可观测到部分可观测——从而研究主动性和反应性行为。

$$\text{Notification Policy: } \mathcal{N}(e) = \begin{cases} \text{push to context} & \text{if } \text{priority}(e) \geq \theta \\ \text{filter} & \text{otherwise} \end{cases}$$

**七大能力维度的设计哲学**

论文将能力分为 5 个核心维度和 2 个环境增强：

- **Execution**（执行）：基础工具调用和多步骤操作链，如"创建日历事件并发送邀请"
- **Search**（搜索）：跨应用信息检索和聚合，如"找出所有与 Alice 的未读消息中提到的日期"
- **Ambiguity**（歧义）：用户请求不完整或模糊时，Agent 需要主动澄清而非猜测执行
- **Adaptability**（适应性）：环境在任务执行过程中发生变化（如联系人更新、日程冲突），Agent 需要动态调整计划
- **Time**（时间）：需要在特定时间点执行操作或响应定时事件，直接依赖 ARE 的异步时间机制

> ⚠️ 注意：论文明确指出这些维度不是严格正交的——任何自然任务都具有内在的组合性（如 Time 任务通常也需要 Search 和 Execution）。作者有意避免引入人工的"组合"分割，因为早期实验表明强行组合 3+ 能力会产生不自然的任务。

环境增强维度不需要新的标注：
- **Noise**：注入工具异常（随机执行失败、签名变更）和无关环境事件（垃圾邮件），测试鲁棒性
- **Agent2Agent**：将部分 App 替换为"App-Agent"，主 Agent 失去对这些 App 工具的直接访问，必须通过消息传递与 App-Agent 协调完成任务

**验证器的四维评估机制**

ARE Verifier 是论文的重要技术贡献。与传统的最终答案匹配或 LLM 裁判不同，它是**目标导向**而非**路径最优**的：

$$\text{Score} = \mathbb{1}[\text{Consistency} \wedge \text{Causality} \wedge \text{Timing} \wedge \text{Completeness}]$$

- **一致性**：刚性字段（ID）用精确匹配，灵活字段（文本内容）用 LLM rubric，并加入反作弊检查
- **因果性**：写操作必须尊重依赖 DAG（父操作先于子操作）
- **时序性**：通过容忍窗口强制执行
- **完整性**：所有 oracle 写操作必须被匹配

在 450 条人工标注轨迹上，ARE Verifier 达到 0.98 agreement 和 0.99 precision，远超纯 LLM 裁判（0.72 agreement、0.53 precision）。

**核心实验发现**

| 模型 | Overall | Execution | Search | Ambiguity | Adaptability | Time | Noise | A2A |
|------|---------|-----------|--------|-----------|-------------|------|-------|-----|
| GPT-5 (high) | **42.1** | 65.4 | 72.7 | 40.8 | 43.1 | 6.5 | **35.4** | 30.8 |
| Claude-4-Sonnet Thinking | 37.8 | 62.1 | 60.6 | 27.3 | 42.1 | 8.5 | 31.2 | 32.5 |
| Claude-4-Sonnet | 34.8 | 57.9 | 59.8 | 24.2 | 38.1 | 8.1 | 27.7 | 27.9 |
| Gemini-2.5-Pro | 25.8 | 39.2 | 57.7 | 18.1 | 17.5 | 7.3 | 20.4 | 20.4 |
| Kimi-K2 | 20.1 | 34.2 | 36.0 | 8.3 | 24.0 | 0.8 | 18.8 | 18.3 |

关键发现：
1. **Execution 和 Search 最容易**，与现有基准饱和趋势一致
2. **Time 维度最具区分度**：仅 Gemini-2.5-Pro 和 Claude-4-Sonnet 有显著得分，反映其效率-延迟优势
3. **Agent2Agent 对弱模型帮助更大**：Llama 4 Maverick 在 A2A 设置下 pass@k 随协作比例提升，但 Claude-4-Sonnet 无显著改善
4. **异构团队有效**：Claude 主 Agent + Llama App-Agent（18.3%）优于全 Llama 团队（8.5%），强执行者（Claude App-Agent）可提升弱主 Agent 的表现（16.2%）

> 💡 关键：Agent2Agent 的协作可类比为强化学习中的 Options 框架（Sutton et al., 1999）——主 Agent 向 App-Agent 发出的子目标相当于时间扩展动作。只有当分解收益超过协调成本时，多 Agent 协作才有效。

#### 🧪 练习题
```yaml
question: "ARE Verifier 在评估 Agent 轨迹时，以下哪种操作会被计入目标完成度？"
options:
  - "Agent 执行的所有工具调用（包括 read 和 write）"
  - "仅 Agent 执行的 write 操作（状态变更）"
  - "Agent 的最终文本回答"
  - "Agent 执行的 read 操作数量"
answer: 1
explain: "ARE Verifier 区分 read 和 write 操作，仅检查 write 操作（状态变更）是否匹配 oracle 序列，Agent 可自由执行任意 read 操作进行探索而不受惩罚。"
```

### Agentic Reasoning

```yaml
id: agentic_reasoning
num: 31
name: Agentic Reasoning
full_name: 智能体推理 (Agentic Reasoning)
year: '2026'
org: arXiv
parent: react
paper_url: https://arxiv.org/abs/2601.12538
project_url: ''
category: frontier_2026
motivation: 感知规划验证统一组织原则
```

#### 📝 一句话总结
Agentic Reasoning 提出一个面向 LLM Agent 的统一综述框架，把推理从静态文本生成扩展为“规划、行动、反馈、记忆、协作”的交互式控制过程，解决传统 LLM 在开放动态环境中缺少感知、验证和持续适应的问题。

#### 🎯 核心要点
- 核心定义：将推理视为智能体行为的中心机制，覆盖基础能力、自演化适应和多智能体协作三层。
- 三层环境动态：Foundational Agentic Reasoning、Self-evolving Agentic Reasoning、Collective Multi-agent Reasoning。
- 基础单智能体能力：规划 reasoning、工具使用优化、agentic search / RAG，用于稳定环境中的目标分解、外部执行和信息检索。
- 自演化能力：通过 feedback 与 memory 把一次性推理变成跨轮次的经验积累、反思、自我修正和策略更新。
- 多智能体能力：通过 manager、worker、critic、memory keeper、communication facilitator 等角色，把推理分布到协作系统中。
- 两类优化模式：in-context reasoning 在测试时通过工作流、搜索和工具编排扩大交互计算；post-training reasoning 通过 SFT/RL 把成功行为内化到模型参数。
- 形式化视角：把 agentic reasoning 建模为带内部推理变量 \(z_t\)、外部动作 \(a_t\)、记忆状态 \(m_t\) 的 POMDP / Dec-POMDP 控制问题。
- 评测覆盖：论文梳理数学/代码、科学发现、具身智能、医疗、Web、通用工具调用、多智能体环境等 benchmark，而非只评测封闭问答准确率。

#### 🔬 深入细节
![Agentic Reasoning 总览图](https://github.com/weitianxin/Awesome-Agentic-Reasoning/raw/main/figs/overview.png)
*图：论文项目仓库中的 Agentic Reasoning 总览。框架把基础推理、自演化推理、多智能体推理，以及应用/基准统一到“从任务到未来任务泛化”的智能体循环中。*

这篇论文是综述型方法论，不是提出一个单独可训练模型。它的贡献在于把过去分散的 ReAct、Toolformer、Tree-of-Thoughts、Reflexion、Agent Memory、多智能体协作和 agentic RL 等工作，组织成同一个“推理即交互控制”的框架。传统 LLM reasoning 往往被看作静态输入上的一次或少数几次前向生成；Agentic Reasoning 则强调 scaling test-time interaction：模型通过行动获取新观察，通过工具改变环境，通过记忆保留历史，通过反馈修正策略。

论文给出一个控制论式形式化。环境可看作部分可观测马尔可夫决策过程，并额外引入内部推理变量 \(z_t\)：

$$
\langle \mathcal{X}, \mathcal{O}, \mathcal{A}, \mathcal{Z}, \mathcal{M}, \mathcal{T}, \Omega, \mathcal{R}, \gamma \rangle
$$

其中 \(\mathcal{X}\) 是不可直接观测的环境状态，\(\mathcal{O}\) 是观察空间，\(\mathcal{A}\) 是外部动作空间，\(\mathcal{Z}\) 是内部推理轨迹空间，\(\mathcal{M}\) 是记忆或上下文状态。关键分解是把策略拆成“先想、再做”：

$$
\pi_\theta(z_t, a_t \mid h_t)
= \pi_{\text{reason}}(z_t \mid h_t)\cdot \pi_{\text{exec}}(a_t \mid h_t, z_t)
$$

这里 \(h_t=(o_{\le t},z_{<t},a_{<t})\) 表示到当前时刻的观察、内部推理和动作历史。这个分解解释了为什么 Agentic Reasoning 不等同于普通 CoT：CoT 主要产生 \(z_t\)，但 agent 还必须把 \(z_t\) 转化为可执行动作 \(a_t\)，并接收环境返回继续修正。

```python
# Agentic Reasoning 的统一控制循环伪代码

def agentic_reasoning(task, agent, env, memory, max_steps):
    observation = env.reset(task)

    for t in range(max_steps):
        context = memory.retrieve(task, observation)

        # 内部推理：感知、规划、验证、选择工具或协作对象
        thought = agent.reason(
            task=task,
            observation=observation,
            memory=context,
            modes=["plan", "tool_select", "search", "verify"]
        )

        # 外部行动：调用工具、执行代码、检索网页、与其他 agent 通信或提交答案
        action = agent.act(thought)
        new_observation, reward, done, info = env.step(action)

        # 反馈与记忆：把执行错误、奖励、验证结果、经验摘要写回系统状态
        feedback = agent.reflect(thought, action, new_observation, reward, info)
        memory.update(observation, thought, action, feedback)

        observation = new_observation
        if done or agent.verified_success(feedback):
            break

    return agent.finalize(memory)
```

在基础单智能体层，论文把 planning、tool use 和 search 视为三种最小能力。Planning 负责把目标分解成可执行阶段，例如 workflow design、tree search、process formalization、decomposition、external aid / tool use，以及 post-training planning 中的 reward design / optimal control。Tool use 解决“何时用工具、选哪个工具、如何生成合法调用”的问题，覆盖 in-context tool integration、post-training tool integration 和 orchestration-based tool integration。Search / RAG 则让 agent 不只依赖参数知识，而能动态检索网页、代码库、知识图谱或记忆库。

> 💡 关键：ReAct 是 Agentic Reasoning 的早期父类思想，因为它把 reasoning 与 acting 交替起来；这篇综述进一步把 ReAct 扩展到记忆、反馈、自演化、多智能体和 post-training 优化层面。

在 in-context reasoning 中，模型参数 \(\theta\) 固定，系统通过搜索内部推理轨迹来改善行为。论文把这类方法写成对推理轨迹的搜索：

$$
\tau^\star \in \arg\max_{\tau}\sum_t \hat{v}_\phi(u_t)
$$

其中 \(u_t\) 是由历史与中间想法构成的搜索节点，\(\hat{v}_\phi\) 是启发式评估器、验证器或环境反馈。Tree-of-Thoughts、MCTS 风格 agentic search、beam search、自我验证和工具调用工作流都可放进这个框架。它们不改变模型权重，而是在测试时扩展行动空间和搜索空间。

post-training reasoning 则把成功的推理与动作模式写入参数。论文用 GRPO 类目标说明这一方向：给定同一 prompt 的一组输出 \(\{y_i\}_{i=1}^G\)，根据组内相对奖励构造优势：

$$
\hat{A}_i=\frac{r_i-\mu}{\sigma+\delta},\quad
\mu=\frac{1}{G}\sum_{j=1}^G r_j,
\quad
\sigma=\sqrt{\frac{1}{G}\sum_{j=1}^G(r_j-\mu)^2}
$$

再用裁剪比率和 KL 约束优化策略。直觉是：in-context 方法把推理能力外显为工作流，post-training 方法则把有效工作流压回模型行为分布，使模型更稳定地规划、调用工具和处理长期奖励。

自演化层的核心是跨 episode 更新系统状态，而不只在单个任务里做推理。论文把可演化状态记为 \(\mathcal{S}_k\)，例如反思文本、工具库、技能代码、记忆库或 agent 架构；每轮交互后的更新可写成：

$$
\mathcal{S}_{k+1} \leftarrow U(\mathcal{S}_k, \tau_k, \mathcal{F}_k)
$$

其中 \(\tau_k\) 是第 \(k\) 轮轨迹，\(\mathcal{F}_k\) 是环境反馈、奖励、错误日志或用户评价。Reflexion 类型方法更新文字经验，Voyager 类型方法扩展技能库，Memory-R1 / MemAgent 类型方法把记忆读写本身作为可学习策略，AlphaEvolve 类型方法甚至把代码和算法结构当作演化对象。

多智能体层把单个 agent 的推理扩展到 Dec-POMDP。多个 agent 拥有不同观察、角色和通信消息，一个 agent 的外部动作可能成为另一个 agent 的提示，从而触发新的内部推理链。论文强调这不只是“多个模型一起聊天”，而是机制设计问题：如何分配 manager、worker、critic、memory keeper 等角色，如何限制通信开销，如何共享或隔离记忆，以及如何让局部推理对齐全局目标。

与传统 LLM reasoning 相比，Agentic Reasoning 的边界更宽：它关心的不只是答案是否正确，还关心系统是否能在动态网页、代码仓库、机器人环境、临床信息流和多智能体游戏中持续观察、决策、验证和学习。因此论文的 benchmark 讨论覆盖 WebArena、Mind2Web、ALFWorld、AgentBench、MultiAgentBench、ScienceAgentBench、MLAgentBench、医疗 agent benchmark 等，强调评测指标应包含任务完成率、动作有效性、约束满足、反馈利用、长期一致性和协作质量。

```yaml
question: "在 Agentic Reasoning 的形式化中，为什么要把策略分解为 π_reason(z_t|h_t) 和 π_exec(a_t|h_t,z_t)？"
options:
  - "为了让模型只输出隐藏推理，不再执行外部动作"
  - "为了区分内部思考轨迹与外部行动，刻画先推理再交互的 agent 行为"
  - "为了把所有智能体系统简化成一次性文本分类任务"
  - "为了避免使用记忆、反馈和环境观察"
answer: 1
explain: "该分解体现 Agentic Reasoning 的核心：内部推理 z_t 先组织计划和判断，外部动作 a_t 再与工具或环境交互，并把反馈带回后续循环。"
```

### EmboCoach-Bench

```yaml
id: embocoach_bench
num: 32
name: EmboCoach-Bench
full_name: 具身教练基准 (EmboCoach-Bench)
year: '2026'
org: arXiv
parent: agentbench
paper_url: https://arxiv.org/abs/2601.21570
project_url: ''
category: frontier_2026
motivation: 首个具身机器人开发Agent基准
```

#### 📝 一句话总结
EmboCoach-Bench 对应论文中的 RoboCoach / RoboCoach-Bench，提出一个评测 LLM Agent 是否能自主开发、训练、诊断和修正机器人策略的具身工程基准，解决以往 benchmark 只评估最终策略而不评估“从任务说明到物理成功”的闭环开发能力问题。

#### 🎯 核心要点
- 系统与基准：论文提出 RoboCoach 自主多模态 agent 系统，以及 RoboCoach-Bench 32 任务具身策略开发基准。
- 任务形式化：每个任务是 \(\mathcal{T}=(\mathcal{D}_{\mathrm{prd}},\mathcal{P}_{\mathrm{sys}},\mathcal{C}_{\mathrm{env}})\)，分别表示语义任务说明、数字操作接口和开发/仿真环境。
- 闭环工作流：agent 从自然语言任务说明出发，生成训练方案和代码，执行调试/训练，读取日志、曲线、成功率和 rollout 视频，再迭代修正策略。
- 三类物理反馈：textual execution signals、quantitative training signals、video rollout observations，分别诊断实现错误、优化失败和行为级物理失败。
- 树状记忆与分支搜索：每个节点保存一次完整物理实验，feedback agent 可选择继续当前分支、回滚到最佳节点或从 baseline 重启。
- 双智能体循环：coding agent 负责 Draft / Debug / Improve 局部编辑，feedback agent 负责基于物理证据选择下一轮父节点和改进方向。
- 覆盖范围：32 个专家构造任务，来自 ManiSkill、RoboTwin、Robomimic、MetaWorld 四个平台，覆盖 RL、IL、MLP、RNN、ACT、Diffusion Policy、VLA 等策略类型。
- 评价指标：所有仿真任务统一用 100 episodes 的二元任务完成率，不用代码质量、reward 大小或人工偏好替代物理成功。
- 主要结果：七个前沿模型上，RoboCoach 平均成功率 0.730，高于平台人类专家参考 0.602；单模型聚合中从 non-agentic 0.40 提升到 RoboCoach 0.80，高于 human reference 0.60。

#### 🔬 深入细节
![RoboCoach 闭环具身策略开发框架](https://arxiv.org/html/2601.21570v2/x3.png)
*图：论文 Figure 2。RoboCoach 将任务说明、代码仓库和开发工具接入 LLM Agent，通过执行日志、训练信号、rollout 视频诊断和树状记忆形成反馈驱动的具身策略开发闭环。*

这篇论文的问题设定非常具体：数字 agent 已经能写代码、跑实验、调试机器学习工程，但这些能力是否能转化为物理能力？在机器人任务中，“代码能跑”远远不等于“策略能完成任务”。策略可能无报错、loss 下降、reward 上升，却仍然因为抓取姿态错误、接触不稳定、轨迹偏离或视觉对齐失败而无法完成实际任务。RoboCoach-Bench 因此评估的不是机器人 policy 本身，也不是 LLM 的一次性代码生成能力，而是 LLM Agent 是否能像机器人研究员一样闭环地开发 policy。

论文把每个具身工程任务形式化为三元组：

$$
\mathcal{T}=\bigl(\mathcal{D}_{\mathrm{prd}},\;\mathcal{P}_{\mathrm{sys}},\;\mathcal{C}_{\mathrm{env}}\bigr)
$$

其中 \(\mathcal{D}_{\mathrm{prd}}\) 是结构化自然语言任务说明，包含优化目标、资源预算、不可修改的评价指标、文件访问限制和物理先验，但不提供演示、奖励梯度或标注轨迹；\(\mathcal{P}_{\mathrm{sys}}\) 是数字操作接口，包括 terminal、file editor、task tracker 等，agent 只能通过代码和工具间接影响环境；\(\mathcal{C}_{\mathrm{env}}\) 是开发底座，可能是可运行但次优的人类代码库，也可能是缺少核心逻辑的 skeleton。这个形式化把“数字动作”和“物理成功”之间的缺口明确暴露出来。

```python
# RoboCoach / EmboCoach-Bench 闭环开发伪代码

def robocoach(task_tuple, base_model, max_rounds):
    D_prd, P_sys, C_env = task_tuple
    tree = ExperimentTree(root=C_env.initial_codebase())

    for round_id in range(max_rounds):
        parent = feedback_agent.select_parent(
            tree,
            policy=["extend_current", "rollback_best", "restart_baseline"]
        )

        workspace = P_sys.clone_workspace(parent.code_state)

        proposal = coding_agent.draft_debug_improve(
            task_spec=D_prd,
            workspace=workspace,
            feedback=parent.feedback_summary
        )

        exec_log = P_sys.debug_test(proposal, episodes=10)
        train_record = P_sys.launch_training(proposal)
        metrics = P_sys.query_training_curves(train_record)
        rollout_video = C_env.rollout_best_checkpoint(train_record)
        video_diag = vlm_agent.summarize_behavior(rollout_video)

        success_rate = C_env.evaluate(train_record.policy, episodes=100)
        node = tree.add_node(
            parent=parent,
            code_state=proposal,
            exec_log=exec_log,
            metrics=metrics,
            video_diag=video_diag,
            success_rate=success_rate
        )

        if success_rate >= task_success_threshold(D_prd):
            return node.best_policy

    return tree.best_node().best_policy
```

RoboCoach 的第一层反馈是 textual execution signals。它负责发现语法错误、依赖配置错误、运行时异常、实验脚本逻辑错误等实现层失败。论文中特别提到轻量 `debug_test`：在提交完整训练前先跑短验证，以便尽早发现代码不可运行的问题。这一层很像普通 coding agent 的调试能力，但在具身任务中只是最低门槛，因为可运行代码仍可能产生完全无效的机器人行为。

第二层是 quantitative training signals。agent 会读取训练曲线、reward、loss、running success rate 等数值信号，用于判断优化是否发散、停滞、奖励坍塌或超参设置失败。这个层次解决的是“训练有没有学到东西”，但仍然不能保证物理正确性。特别是 imitation learning 或 diffusion policy 场景中，loss 曲线可能平滑下降，而 rollout 时手臂仍可能抖动、偏离、撞开物体或没有形成有效接触。

第三层是 video rollout observations，也是这篇论文相对普通代码 agent 最具具身特色的部分。RoboCoach 用视觉语言模型分析 rollout 视频，把机器人行为转成结构化自然语言诊断，例如“接近阶段动作不连续导致物体被碰开，而不是稳定抓取”。这类行为级失败通常不会直接出现在日志或标量 reward 中，却是人类机器人研究员调试 policy 时最依赖的信息。论文把它称为 physically grounded feedback：agent 不直接控制机器人传感器和执行器，但通过视频诊断获得物理世界后果的可读表示。

RoboCoach 的记忆不是普通对话历史，而是 tree-structured memory。每个树节点保存一次完整具身实验：代码状态、执行结果、训练动态、rollout 观察、成功率和诊断摘要。边表示从哪个实验继承或分叉。feedback agent 每轮根据物理证据选择下一轮父节点，可以继续当前分支、回滚到全局最佳节点，或从 baseline 重启。这样，搜索依据的是真实成功率和物理行为，而不是最近一次回复或表面上看起来合理的代码 diff。

> 💡 关键：RoboCoach 的“搜索”不是传统 AutoML 超参网格搜索。它会同时修改奖励设计、模型容量、训练稳定性、数据增强、验证逻辑、checkpoint 策略、动作平滑和基础设施错误，并用物理任务完成率统一裁决这些改动是否有效。

RoboCoach-Bench 的基准设计同样重要。它包含 32 个专家构造任务，分为 21 个 improving setting 和 11 个 from-scratch setting。前者给 agent 一个可运行但次优的人类代码库，测试它能否进一步改进；后者只给 simulator binding 和高层模板，要求 agent 补全核心训练流程。平台覆盖 ManiSkill、RoboTwin、Robomimic、MetaWorld，学习范式覆盖强化学习与模仿学习，策略架构覆盖 MLP、RNN、Diffusion Policy、Action Chunking Transformer 和 VLA。

所有仿真任务的指标是二元任务完成率：

$$
\mathrm{SR}(\pi)=\frac{1}{N}\sum_{i=1}^{N}\mathbf{1}\{\pi \text{ completes task in episode } i\},\quad N=100
$$

这个设计避免了具身 AI 中常见的指标错位：reward 变高、代码更整洁或 loss 更低，并不一定意味着机器人真的完成了任务。论文明确不允许用代码质量、reward magnitude 或人工主观判断替代 ground-truth completion。真实机器人迁移实验则在两个硬件实验室、四个任务上评估仿真收益是否能保留到物理机器人上。

实验结论说明，agentic workflow 的收益不只是来自更强 base model。non-agentic 条件已经给模型任务说明和完整代码库，但只做一次性生成，没有执行反馈；RoboCoach 激活闭环后，七模型平均从低于人类参考提升到 0.730，高于平台专家参考 0.602。单模型聚合中，Gemini 3.0 Pro 条件下 non-agentic 为 0.40，RoboCoach 为 0.80，人类参考为 0.60。消融结果显示，移除文本执行反馈、分支搜索、视频观察或数值训练信号都会降低成功率，其中文本执行反馈和分支搜索下降最大。

论文也给出边界：主证据仍以仿真为主，真实机器人只覆盖四个任务；分支搜索带来明显计算成本；任务说明、评价协议和可编辑接口都是受控且固定的。这意味着 RoboCoach-Bench 证明的是“有边界的 Level-2 自主具身策略开发”，还不是开放世界机器人自我进化。但它提供了一个很关键的评测范式：衡量数字 agent 能否把代码级干预，通过物理反馈、记忆和搜索，转化为可验证的机器人任务成功。

```yaml
question: "RoboCoach-Bench 为什么坚持用物理任务完成率作为唯一核心指标？"
options:
  - "因为代码质量、reward 和 loss 都无法稳定替代机器人是否真的完成任务"
  - "因为它只评估自然语言回答是否流畅"
  - "因为所有任务都没有仿真环境，只能人工打分"
  - "因为它不允许 agent 读取执行日志或视频反馈"
answer: 0
explain: "论文的核心是评估数字 agent 是否产生物理能力；可运行代码、较高 reward 或较低 loss 都可能与实际完成任务脱节，因此必须以任务完成率作为 grounded metric。"
```

### Causal CoT

```yaml
id: causal_cot
num: 33
name: Causal CoT
full_name: 因果思维链 (Causal CoT)
year: '2026'
org: NeurIPS
parent: cot
paper_url: https://proceedings.neurips.cc/paper_files/paper/2025/hash/b7870bd43b2d133a1ed95582ae5d82a4-Abstract-Conference.html
project_url: ''
category: frontier_2026
motivation: 因果充分性与必要性改进推理
```

#### 📝 一句话总结
Causal CoT 将 Pearl 式的必要且充分因果概率 PNS 引入 Chain-of-Thought 步骤筛选，通过反事实干预判断每个推理步骤是否真正影响最终答案。它解决了传统 CoT 同时存在的“推理不够充分”和“过度冗余”问题，把原始长链条重构为更短且仍能支撑正确答案的因果关键路径。

#### 🎯 核心要点
- 提出用 Probability of Necessity and Sufficiency (PNS) 评估 CoT 中单个步骤的因果贡献，而不是只看注意力、似然、消融准确率等相关性指标。
- 将 CoT 质量拆成两个目标：链级别 Probability of Sufficiency (PS) 保证推理链足以推出正确答案，节点级别 Probability of Necessity (PN) 判断某一步是否不可替代。
- 设计双层优化流程：先通过采样或重构提升整条链的充分性，再对每个步骤做反事实替换和 rollout，删除低 PNS 的冗余步骤。
- 框架包含 Base Model、Rollout Model、Answer Evaluator/Validator：前者生成初始 CoT，rollout 模型生成干预后的替代后续推理，验证器判断答案和逻辑是否仍成立。
- 支持 Direct Rollout、Prompt-Based Rollout、External Rollout 三类干预策略，用于产生与原步骤语义分离的替代步骤和后续链条。
- 输出的 compact CoT 可作为高质量示例用于 In-Context Learning，也可作为监督微调数据，让模型学习“必要且充分”的推理模式。
- 论文在 GSM-8k、MATH-500、AIME、CommonsenseQA 上评估推理效率和准确率，目标是在减少 token 和步骤数的同时保持或提升最终答案表现。

#### 🔬 深入细节
![Causal CoT 因果优化框架](https://arxiv.org/html/2506.09853v3/x3.png)
*图：Causal CoT 的因果优化框架。模型先生成可能冗余的初始 CoT，再对步骤做反事实替换和 rollout，用 PNS 选择保留的必要步骤，最后形成 compact CoT。*

```python
# Causal CoT: PNS-guided reconstruction of a reasoning chain

def optimize_causal_cot(question, initial_cot, gold_answer, threshold=0.5, rollouts=8):
    steps = split_into_steps(initial_cot)

    # 1. Chain-level sufficiency: the whole chain must support the answer.
    if answer_evaluator(question, steps) != gold_answer:
        return resample_or_repair_cot(question, gold_answer)

    compact = []
    prefix = []
    for step in steps:
        counterfactual_failures = 0

        # 2. Node-level necessity: replace this step and see whether correctness breaks.
        for _ in range(rollouts):
            alt_step = rollout_model.replace_step(
                question=question,
                prefix=prefix,
                original_step=step,
                require_semantic_disjointness=True,
            )
            alt_suffix = rollout_model.continue_reasoning(question, prefix + [alt_step])
            alt_chain = prefix + [alt_step] + alt_suffix
            alt_answer = answer_evaluator(question, alt_chain)
            counterfactual_failures += int(alt_answer != gold_answer)

        pns = counterfactual_failures / rollouts
        if pns >= threshold:
            compact.append(step)
            prefix.append(step)
        # else: the answer survives replacement, so the step is treated as redundant.

    return compact
```

Causal CoT 的出发点是：传统 CoT 的“长”不等于“可靠”。一条推理链可能包含三种状态：其一是足以推出答案但有大量无用步骤，即 sufficient but unnecessary；其二是某些局部步骤看似关键，但整条链还缺少必要推导，即 necessary but insufficient；其三才是论文想要的 sufficient and necessary，即每一步都对答案成立有实际贡献，且整条链足以支撑结论。已有压缩 CoT 或关键步骤识别方法常用相关性信号，例如 token 似然、注意力权重、删除某句后的准确率变化。这些信号能说明“看起来相关”，但不能说明“如果这个步骤被替换，答案是否会因果性改变”。论文因此把问题重新表述为步骤级因果归因。

论文先把 CoT 看成从问题到中间步骤再到答案的生成过程。给定问题 \(Q=q\)、步骤 \(S=(s_1,\ldots,s_n)\)、答案 \(A=a\)，CoT 的答案概率可写成：

$$
P(A=a\mid Q=q)\propto \int P(a\mid s_1,\ldots,s_n,q)\prod_{i=1}^{n}P(s_i\mid s_{<i},q)\,dS
$$

这个式子强调最终答案不是只由最后一句产生，而是由整条推理轨迹共同决定。Causal CoT 在这个轨迹上定义三类因果量。链级充分性 PS 衡量“如果插入这条推理链，原本错误或不完整的回答是否会变正确”：

$$
PS(S,q)=P(A_{\mathrm{do}(S)}=y\mid A\ne y,\bar S,q)
$$

节点级必要性 PN 衡量“如果把某个步骤 \(s_t\) 换成错误或语义分离的替代步骤，并让模型从该处继续 rollout，原本正确答案是否会失效”：

$$
PN(S,s_t,q)=P(A_{\mathrm{do}(s_{<t},\bar{s}_t,s'_{>t})}\ne y\mid A=y,S,q)
$$

最终的 PNS 则把“原链正确”和“反事实链错误”合在一起：

$$
PNS(S,s_t,q)=P(A_S=y, A_{S'}\ne y)
$$

直觉上，如果替换 \(s_t\) 以后答案经常仍然正确，那么这个步骤并不必要；如果替换后答案经常崩掉，且原链本身能推出正确答案，那么它就是 compact CoT 应保留的因果关键节点。实践中，论文用 Monte Carlo rollout 近似这个概率：

$$
\widehat{PNS}(s_t)=\frac{1}{K}\sum_{k=1}^{K}\mathbf{1}[V(q,S_{t}^{(k)})\ne y]
$$

其中 \(S_t^{(k)}\) 是第 \(k\) 次把 \(s_t\) 替换后生成的反事实链，\(V\) 是答案评估器或验证器。这个估计式的含义很直接：替换该步骤后越容易导致答案错误，说明原步骤越必要。

算法流程采用双层优化。第一层先检查整条初始 CoT 是否具有充分性，如果完整链都不能得到正确答案，直接做重采样或修复，因为对一条不充分链做“必要性剪枝”没有意义。第二层在链充分的前提下，按步骤执行反事实干预：移除或替换当前步骤，要求替代步骤与原步骤语义分离，再让 rollout 模型基于新前缀生成后续推理。验证器不仅检查最终答案是否等于 \(y\)，还可检查链条是否逻辑连贯。低于阈值的步骤被剪掉，高于阈值的步骤进入 compact CoT。

> 💡 关键：Causal CoT 不是简单让推理更短，而是用“答案是否因替换该步骤而改变”来定义短链条中每一步的必要性。短只是结果，因果必要性才是筛选准则。

这套方法和普通 CoT 压缩的差别在于，压缩方法往往把 token 数作为目标，容易删掉当前表述中不显眼但逻辑上不可缺的桥接步骤。Causal CoT 先要求 PS，再估计 PN，因此不会为了短而短。若一个步骤看似啰嗦，但替换后 rollout 经常让模型走向错误答案，它仍会被保留；若一个步骤措辞很长但被替换后答案不变，它会被判为冗余。论文进一步把 PNS 优化后的 CoT 用作 ICL 示例和 SFT 数据，使模型在生成时倾向输出“少而关键”的推理路径。

从训练和推理角度看，Causal CoT 更像一个数据重构器或推理示例优化器，而不是改动 Transformer 架构。它可以套在不同基础模型上：base model 负责原始答案与评分，rollout model 负责产生反事实后续链，external rollout 还可以用更强模型生成替代路径。论文在 Qwen 与 DeepSeek 系列上验证这种模型无关性，并用 token 长度、步骤数、最终答案准确率与平均 PNS 共同评估。核心收益是把“推理效率”与“推理忠实性”绑定起来，让缩短链条不再只依赖启发式摘要，而有明确的因果检验。

#### 🧪 练习题
```yaml
question: "Causal CoT 中 PNS 估计的核心作用是什么？"
options:
  - "衡量某个步骤被反事实替换后，正确答案是否会失效"
  - "计算每个 token 的语言模型困惑度"
  - "让模型生成更多不同风格的长 CoT"
  - "把所有中间步骤压缩成一个关键词"
answer: 0
explain: "PNS 关注原链正确且替换某一步后答案错误的概率，用来判断该步骤是否既充分又必要。"
```

### ReasonFlux-PRM

```yaml
id: reasonflux_prm
num: 34
name: ReasonFlux-PRM
full_name: 推理流过程奖励 (ReasonFlux-PRM)
year: '2026'
org: NeurIPS
parent: retroformer
paper_url: https://proceedings.neurips.cc/paper_files/paper/2025/hash/26618fb384d3873b8ef6ab292a69095b-Abstract-Conference.html
project_url: ''
category: frontier_2026
motivation: 轨迹感知长链推理过程奖励模型
```

#### 📝 一句话总结
ReasonFlux-PRM 提出面向 trajectory-response 长链推理数据的过程奖励模型，用步骤级奖励和轨迹级奖励共同评估中间思考轨迹，而不只评价最终回答。它解决了传统 PRM 难以监督 DeepSeek-R1 等推理模型产生的冗长、分支、自我修正型 thinking trajectory 的问题，并可用于离线数据筛选、在线 RL 奖励和 Best-of-N 测试时扩展。

#### 🎯 核心要点
- 明确区分 thinking trajectory 与 final response：前者是长、松散、可能包含探索和自我修正的中间思考，后者是更规范的最终解答步骤。
- 指出传统 PRM 多训练在 final response 上，对 trajectory-response 数据存在格式错配和奖励校准不足，容易筛出低质量蒸馏数据。
- 提出 trajectory-aware PRM，将每个中间步骤的 alignment、quality、coherence 三类信号聚合为步骤级奖励。
- 提出 template-guided trajectory-level reward，用专家 LLM 抽取高层解题模板，再测试策略模型按模板重解题目的成功率，从全局策略层面评估轨迹价值。
- 使用联合训练目标同时拟合 step-level reward 和 final/trajectory-level reward，使奖励模型兼顾局部推理质量和整体解题策略。
- 支持三类使用场景：离线筛选高质量 SFT 数据，在线为 GRPO/PPO/REINFORCE 提供过程奖励，推理时用 reward-guided Best-of-N 选择候选答案。
- 论文训练 ReasonFlux-PRM-1.5B 与 ReasonFlux-PRM-7B，并在 AIME24、AIME25、MATH500、GPQA-Diamond 上报告 SFT、RL、test-time scaling 的增益。

#### 🔬 深入细节
![ReasonFlux-PRM 方法设计](https://arxiv.org/html/2506.18896v2/plots/method_pipeline.png)
*图：ReasonFlux-PRM 的整体方法。模型在 trajectory-response 数据上学习步骤级和轨迹级奖励，再服务于离线数据筛选、在线策略优化和测试时 Best-of-N 选择。*

```python
# ReasonFlux-PRM training and usage, simplified from the paper

def train_reasonflux_prm(dataset, prm, verifier_llm, policy, encoder):
    for x, trajectory, final_response in dataset:
        step_targets = []
        response_steps = split_steps(final_response)

        for t, step in enumerate(trajectory):
            r_align = max_cosine(encoder(step), [encoder(a) for a in response_steps])
            r_quality = verifier_llm.judge_step_quality(x, trajectory[:t+1], final_response)
            r_coherence = contrastive_coherence(
                prev_step=trajectory[t-1] if t > 0 else x,
                current_step=step,
                negatives=sample_unrelated_steps(dataset),
                encoder=encoder,
            )
            weights = softmax([r_align, r_quality, r_coherence])
            r_step = weights[0] * r_align + weights[1] * r_quality + weights[2] * r_coherence
            step_targets.append(r_step)

        template = verifier_llm.extract_reasoning_template(x, trajectory, final_response)
        candidates = [policy.generate(x, template) for _ in range(N)]
        r_final = mean([is_correct(c) for c in candidates])

        prm.update_mse(
            predicted_step_rewards=prm.score_steps(x, trajectory, final_response),
            target_step_rewards=step_targets,
            predicted_final_reward=prm.score_trajectory(x, trajectory, final_response),
            target_final_reward=r_final,
        )


def offline_select(prm, traces, alpha=0.8, top_k=1000):
    scores = []
    for x, trajectory, final_response in traces:
        step_rewards = prm.score_steps(x, trajectory, final_response)
        final_reward = prm.score_trajectory(x, trajectory, final_response)
        score = mean(step_rewards) + alpha * final_reward
        scores.append((score, x, trajectory, final_response))
    return top_k_by_score(scores, top_k)
```

ReasonFlux-PRM 的核心背景是长链推理数据形态发生了变化。传统 PRM 通常假设输入是“问题 + 结构清晰的最终 CoT 回答”，然后给最终回答中的每一步打分。但 DeepSeek-R1、OpenAI-o1 类推理模型常输出 trajectory-response：先有很长的 thinking trajectory，里面包含试探、分支、反思、回退和冗余，再给出一个相对整洁的 final response。小模型蒸馏和后训练越来越依赖这类数据，问题是传统 PRM 并不知道中间 thinking trajectory 应如何评分。论文的预实验发现，用现有 PRM 直接给轨迹打分时，不同来源轨迹的得分分布重叠严重，用这些分数筛出的数据还可能不如人工精选数据。

论文把一个样本表示成 \((x,y)\)，其中 \(x\) 是题目，\(y=s\oplus a\) 是 thinking trajectory \(s=(s_1,\ldots,s_T)\) 与 final response \(a=(a_1,\ldots,a_M)\) 的拼接。标准 PRM 的目标是学习打分函数 \(R_\phi\)，让每个步骤的预测奖励接近参考奖励：

$$
\min_{\phi}\sum_{(x,y)\in\mathcal{D}}\sum_{t=1}^{T}\mathcal{L}\left(R_{\phi}(s_t\mid x,s_{<t},a), r_t\right)
$$

ReasonFlux-PRM 的不同之处在于重新构造 \(r_t\)。它不把 final response 的格式当作唯一标准，而是为 thinking trajectory 设计三个互补信号：alignment、quality、coherence。Alignment 衡量中间步骤与最终回答步骤的语义相关性，可抽象为：

$$
r_t^{\mathrm{ali}}=\max_j \cos(\Phi(s_t),\Phi(a_j))
$$

其中 \(\Phi\) 是预训练编码器。这个信号能惩罚完全跑题的中间思考，但如果只看 alignment，会误伤有用的探索步骤，因为一些中间探索不一定和最终答案措辞相似。因此论文再用强专家模型作为 judge 产生 quality score：

$$
r_t^{\mathrm{qua}}=J_{\mathrm{LLM}}(x,s_{\le t},a)
$$

这个分数关注步骤正确性、内部一致性、是否朝最终解推进。第三个 coherence score 用对比式互信息思想衡量相邻步骤是否连贯：

$$
r_t^{\mathrm{coh}}=\log\frac{\exp(\mathrm{sim}(\Phi(s_{t-1}),\Phi(s_t))/\tau)}{\sum_{s'\in\mathcal{N}}\exp(\mathrm{sim}(\Phi(s_{t-1}),\Phi(s'))/\tau)}
$$

其中 \(\mathcal{N}\) 是来自无关轨迹的负样本，\(\tau\) 是温度。这个项的直觉是：好的 thinking trajectory 不一定短，但相邻步骤应该语义和逻辑连续，而不是突然跳题。

三个步骤级信号用 softmax 自适应聚合：

$$
r_t^{\mathrm{step}}=\sum_{k\in\{\mathrm{ali},\mathrm{qua},\mathrm{coh}\}}\mathrm{softmax}(r_t^{\mathrm{ali}},r_t^{\mathrm{qua}},r_t^{\mathrm{coh}})_k\cdot r_t^k
$$

这比固定加权更稳，因为不同题目和不同阶段的轨迹可能依赖不同信号。例如早期探索步骤可能 alignment 低但 quality 高；最后收束步骤可能 alignment 和 coherence 都高。softmax 聚合让奖励模型在局部层面保留这种差异。

仅有步骤级奖励仍不够，因为一个轨迹的高层解题策略可能比单步措辞更重要。ReasonFlux-PRM 因此引入 template-guided trajectory-level reward：专家 LLM 先从完整输出 \(y\) 中抽取高层推理模板 \(T\)，然后策略模型在给定 \((x,T)\) 的条件下重新生成 \(N\) 个解答：

$$
y^{(1)},\ldots,y^{(N)}\sim\pi_\theta(\cdot\mid x,T)
$$

轨迹级奖励定义为这些候选答案的平均正确率：

$$
r^{\mathrm{final}}=\frac{1}{N}\sum_{j=1}^{N}\mathbf{1}[y^{(j)}\ \text{is correct}]
$$

如果一个轨迹能抽象出可复用的解题模板，并且其他生成过程按该模板也能解对题目，说明它不仅局部步骤像样，而且全局策略有效。这个设计把“思考轨迹是否有蒸馏价值”从文字表面对齐提升到策略可迁移性。

最终训练目标同时拟合步骤级和轨迹级监督：

$$
\mathcal{L}_{\mathrm{total}}=\lambda_{\mathrm{step}}\frac{1}{T}\sum_{t=1}^{T}\mathcal{L}_{\mathrm{step}}\left(R_{\phi}(s_t\mid x,s_{<t},a),r_t^{\mathrm{step}}\right)+\lambda_{\mathrm{final}}\mathcal{L}_{\mathrm{final}}\left(R_{\phi}(x,y),r^{\mathrm{final}}\right)
$$

论文采用 MSE 作为实践损失，\(\lambda_{\mathrm{step}}\) 和 \(\lambda_{\mathrm{final}}\) 控制局部与全局监督的权重。这个联合目标使 ReasonFlux-PRM 能输出两类分数：每一步的细粒度过程分数，以及整条 trajectory-response 的全局价值分数。

在离线数据筛选中，ReasonFlux-PRM 对每条轨迹计算聚合分数：

$$
\hat r=\frac{1}{T}\sum_{t=1}^{T}\hat r_t^{\mathrm{step}}+\alpha\hat r^{\mathrm{final}}
$$

然后取 top-K 作为小模型 SFT 数据。在线 RL 中，它把这个 PRM 分数并入 GRPO 的奖励，例如抽象地写成 \(r_{\mathrm{total}}=r_{\mathrm{rule}}+\beta\hat r\)，再做组归一化 advantage 和策略更新。测试时，它对同一问题的多个候选输出逐个打分，选择 \(\hat r\) 最高的候选作为 Best-of-N 结果。

> 💡 关键：ReasonFlux-PRM 的奖励对象不是“最终答案的一串整洁步骤”，而是“中间思考轨迹 + 最终回答”的整体。它承认长链推理会有探索和修正，因此用 alignment、quality、coherence、template transfer 四种视角共同判断轨迹是否值得学习。

论文报告了两个规模版本：ReasonFlux-PRM-1.5B 面向资源受限部署，ReasonFlux-PRM-7B 用于主要实验。训练数据来自公开 trajectory-response 推理轨迹并构造成约 10k 高质量样本，实验涉及 AIME24、AIME25、MATH500、GPQA-Diamond。相对于 Qwen2.5-Math-PRM 等强基线，ReasonFlux-PRM 的优势不是单一准确率数字，而是同一个奖励模型能跨 SFT 数据选择、RL 过程奖励、推理时选择三个阶段复用，形成从数据到训练再到推理的统一评价信号。

#### 🧪 练习题
```yaml
question: "ReasonFlux-PRM 为什么要同时使用步骤级奖励和轨迹级奖励？"
options:
  - "步骤级奖励衡量局部推理质量，轨迹级奖励衡量高层解题策略是否可复用"
  - "轨迹级奖励只用于减少模型参数量"
  - "步骤级奖励用于图像输入，轨迹级奖励用于文本输入"
  - "两者完全等价，只是为了增加训练损失项数量"
answer: 0
explain: "ReasonFlux-PRM 面向 trajectory-response 数据，既要判断每一步是否正确连贯，也要判断整条思考策略能否迁移并导向正确答案。"
```

### SolAgent

```yaml
id: solagent
num: 35
name: SolAgent
full_name: Solidity代码智能体 (SolAgent)
year: '2026'
org: arXiv
parent: chatdev
paper_url: https://arxiv.org/abs/2601.23009
project_url: ''
category: frontier_2026
motivation: 多Agent架构生成智能合约代码
```

#### 📝 一句话总结
SolAgent 提出了一种工具增强的多 Agent 框架，通过 **Coding Agent + Refining Agent** 的双角色协作与 **Forge 编译器（正确性）+ Slither 静态分析器（安全性）** 的双循环迭代精炼机制，自动生成高质量 Solidity 智能合约代码，在自建基准 SolEval+ 上实现 64.39% 的 Pass@1，并将安全漏洞相比人工基线降低 39.77%。

#### 🎯 核心要点
- **双 Agent 架构**：Coding Agent 负责初始代码生成，Refining Agent 基于工具反馈迭代修复，两者通过共享消息历史协作
- **双循环精炼机制**：内循环使用 Forge 编译器检测编译错误与测试失败（功能正确性），外循环使用 Slither 静态分析器检测安全漏洞
- **文件系统工具集成**：Agent 可通过 `list_directory`、`read_file` 等工具探索项目结构、读取依赖文件，实现上下文感知的代码生成
- **动态停止策略**：三种终止条件——成功（编译+测试全通过）、停滞检测（连续 \(N=2\) 轮无改进）、振荡检测（代码相似度 \(\tau=0.9\)），最大 50 轮
- **工作流蒸馏（Workflow Distillation）**：将高质量 Agent 交互轨迹蒸馏到 Qwen3-8B，使用全参数微调（lr=2e-5, 3 epochs, 8×Ascend 910B2）
- **双源训练数据**：full-context 轨迹（tracker）+ compressed-context 轨迹（mix），配合前向/后向截断策略
- **SolEval+ 基准**：81 个 Solidity 文件、1188 个测试用例，源自真实开源项目，覆盖 DeFi、NFT、治理等场景
- **基线对比**：超越 GPT-5.1、Claude-Sonnet-4.5、Copilot、DeepCode、MetaGPT、Qwen-Agent 等 SOTA 方法

#### 🔬 深入细节
##### 核心框架图

![SolAgent 整体框架](https://ar5iv.labs.arxiv.org/html/2601.23009/assets/x1.png)
*图 1：SolAgent 框架总览。左侧为 Coding Agent 生成初始代码，右侧为 Refining Agent 通过 Forge（内循环）和 Slither（外循环）迭代精炼，底部展示文件系统工具的上下文支持。*

![双循环精炼流程](https://ar5iv.labs.arxiv.org/html/2601.23009/assets/x2.png)
*图 2：双循环精炼机制的详细流程，展示内循环（编译+测试）与外循环（安全分析）的交互关系。*

##### 算法伪代码

```python
# SolAgent 双循环精炼核心流程
def solagent_generate(task_spec, project_context):
    # Phase 1: Coding Agent 生成初始代码
    code = coding_agent.generate(task_spec, project_context)
    
    # Phase 2: Refining Agent 迭代精炼
    for round in range(MAX_ROUNDS):  # MAX_ROUNDS = 50
        # 内循环: Forge 编译器反馈
        compile_result = forge.compile(code)
        if not compile_result.success:
            code = refining_agent.fix(code, compile_result.errors)
            continue
        
        test_result = forge.test(code)
        if not test_result.all_passed:
            code = refining_agent.fix(code, test_result.failures)
            # 停滞检测: 连续 N=2 轮无改进则跳出内循环
            if stagnation_detected(N=2):
                break
            # 振荡检测: 代码相似度 > τ=0.9 则终止
            if oscillation_detected(tau=0.9):
                break
            continue
        
        # 外循环: Slither 安全分析
        vulns = slither.analyze(code)
        if vulns:
            code = refining_agent.fix_security(code, vulns)
            continue
        
        return code  # 成功: 编译通过 + 测试通过 + 无漏洞
    
    return best_code  # 返回历史最优版本
```

##### 动机与背景

智能合约是区块链生态的核心基础设施，一旦部署便不可更改，因此对代码的**功能正确性**和**安全性**有极高要求。2024 年因智能合约漏洞导致的经济损失超过 23 亿美元。然而，现有 LLM 在 Solidity 代码生成上面临三大挑战：

1. **编译失败率高**：vanilla LLM 的编译通过率仅 30%-45%，远低于实际可用标准
2. **安全漏洞频发**：单次生成无法保证代码免受重入攻击、整数溢出等常见漏洞
3. **上下文缺失**：智能合约通常依赖复杂的项目结构（接口、库、继承关系），单文件生成缺乏依赖信息

现有的 Agent 框架（如 MetaGPT、Qwen-Agent）虽然引入了多步推理，但缺乏针对智能合约领域的专用工具链集成，无法有效利用编译器和安全分析器的反馈信号。

##### 核心机制详解

**1. 双 Agent 角色分工**

SolAgent 采用两个专门化的 Agent：

- **Coding Agent**：接收任务规范（自然语言描述 + 函数签名 + 依赖信息），生成初始 Solidity 代码。该 Agent 配备文件系统工具，可主动探索项目结构以获取必要的上下文信息。
- **Refining Agent**：接收 Coding Agent 的输出及工具反馈（编译错误、测试失败、安全漏洞报告），迭代修复代码。两个 Agent 共享消息历史，确保修复过程的连贯性。

> 💡 **关键设计**：与 ChatDev 等框架中 Agent 间的"对话式"协作不同，SolAgent 的两个 Agent 通过**工具反馈信号**驱动协作，形成"生成-检测-修复"的闭环。

**2. 双循环精炼机制**

这是 SolAgent 的核心创新，将迭代精炼分为两个嵌套循环：

- **内循环（Forge Compiler Loop）**：使用 Foundry 的 Forge 工具链进行编译和测试。每轮将编译错误信息或测试失败的详细日志反馈给 Refining Agent。消融实验表明，移除 Forge 反馈后 Pass@1 从 64.39% 骤降至 26.18%（Claude-Sonnet-4.5），证明这是最关键的组件。

- **外循环（Slither Security Loop）**：当内循环达到功能正确性后，使用 Slither 静态分析器扫描安全漏洞。检测到的漏洞（如重入攻击、未检查的外部调用等）被反馈给 Refining Agent 进行安全加固。在 Min-Vuln 轮次分析中，Slither 反馈使漏洞减少 23%-35%。

**3. 动态停止策略**

为避免无效的反复修改，SolAgent 设计了三种智能终止条件：

$$\text{Stop} = \begin{cases} \text{Success} & \text{if compile} \land \text{all\_tests\_pass} \\ \text{Stagnation} & \text{if } \Delta\text{pass\_rate} = 0 \text{ for } N=2 \text{ consecutive rounds} \\ \text{Oscillation} & \text{if } \text{sim}(code_t, code_{t-k}) > \tau = 0.9 \end{cases}$$

其中代码相似度使用字符级别的比较。最大迭代轮数设为 50 轮，实际平均约 5-6 轮即可收敛。

**4. 文件系统工具**

Agent 被赋予以下工具能力：
- `list_directory(path)`：列出项目目录结构
- `read_file(path)`：读取依赖文件内容（接口定义、基类实现等）

这使 Agent 能够自主发现并解析项目依赖关系，而非依赖人工提供的上下文。消融实验显示，移除工具后 GPT-5.1 的 Pass@1 从 54.71% 降至 31.73%。

**5. 工作流蒸馏**

SolAgent 提出将成功的 Agent 交互轨迹蒸馏到小模型中：

- **数据构造**：从 SolAgent 运行轨迹中提取两类数据——(1) tracker 数据保留完整上下文（包含工具调用和反馈），(2) mix 数据压缩上下文（仅保留关键决策点）
- **截断策略**：v1 保留前 4K tokens（学习推理过程），v2 保留后 4K tokens（学习最终代码输出）
- **训练配置**：Qwen3-8B 全参数微调，学习率 2e-5，3 个 epoch，8×Ascend 910B2 NPU
- **部署**：使用 vLLM 部署，启用 YaRN RoPE scaling 支持 128K 上下文窗口

蒸馏后的 8B 模型（SolAgent-tracker-v2）编译率从 5.88% 提升至 17.65%，Pass@1 从 0.33% 提升至 1.31%，达到了 4 倍大小的 Qwen3-32B 的同等水平。

##### 与传统方法的区别

| 维度 | Vanilla LLM | 通用 Agent (MetaGPT等) | SolAgent |
|------|------------|----------------------|----------|
| 编译率 | 30%-45% | 28%-46% | **90%-95%** |
| 安全检测 | 无 | 无 | Slither 集成 |
| 依赖解析 | 无 | 有限 | 文件系统工具 |
| 迭代精炼 | 无 | 通用反馈 | **领域专用双循环** |
| 停止策略 | 单次 | 固定轮数 | **动态停止** |

> ⚠️ **注意**：SolAgent 的 gas 效率在部分场景下略逊于基线（均值比率 1.0-2.4），这是因为双循环精炼优先保证正确性和安全性，而非 gas 优化。但修剪均值（Trim5%）接近 1.0，表明大多数情况下 gas 效率合理。

##### 实验结果摘要

**功能正确性（RQ-1）**：

| 方法 | 模型 | 编译率 | Pass@1 |
|------|------|--------|--------|
| Vanilla LLM | Claude-Sonnet-4.5 | 39.51% | 25.59% |
| Qwen-Agent | Claude-Sonnet-4.5 | 45.68% | 28.37% |
| **SolAgent** | **Claude-Sonnet-4.5** | **95.06%** | **64.39%** |
| **SolAgent** | **GPT-5-Mini** | **90.12%** | **56.65%** |
| **SolAgent** | **GPT-5.1** | **91.36%** | **54.71%** |

**安全性**：SolAgent 生成的代码漏洞数相比人工基线减少 39.77%（Claude-Sonnet-4.5），相比 vanilla LLM 减少更为显著。

**消融实验（RQ-2）**：
- 移除 Forge 反馈：Pass@1 降幅 38%+（最关键组件）
- 移除 Slither 反馈：Min-Vuln 轮漏洞增加 23%-35%
- 移除文件工具：Pass@1 降幅 7%-23%

#### 🧪 练习题
```yaml
question: "SolAgent 的双循环精炼机制中，哪个组件对功能正确性（Pass@1）的影响最大？"
options:
  - "Slither 静态安全分析器反馈"
  - "Forge 编译器与测试反馈"
  - "文件系统工具（依赖解析）"
  - "动态停止策略（停滞与振荡检测）"
answer: 1
explain: "消融实验表明，移除 Forge 反馈后 Pass@1 从 64.39% 骤降至 26.18%（降幅超 38%），是对功能正确性影响最大的单一组件。Forge 提供的编译错误和测试失败信息是迭代修复的核心驱动信号。"
```
