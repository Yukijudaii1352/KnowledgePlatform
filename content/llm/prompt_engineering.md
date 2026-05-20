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

### 待补充：阶段性领域总结
请补充一篇纵观一段时间以来的总结性文档，建议使用 `!INCLUDE_RAW path/to/article.md` 引入人工筛选后的 Markdown。

## 最新进展综述

### 待补充：最近一个月最新动向
请补充最近一个月该领域最新动向的综述文档，建议使用 `!INCLUDE_RAW path/to/article.md` 引入人工筛选后的 Markdown。

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
Few-shot 的核心目标是：通过少量示例激发模型上下文学习能力。

#### 🎯 核心要点
- 核心动机：通过少量示例激发模型上下文学习能力
- 代表机构：OpenAI

#### 🔬 深入细节
通过少量示例激发模型上下文学习能力


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
Zero-shot 的核心目标是：仅凭指令完成任务，无需示例。

#### 🎯 核心要点
- 核心动机：仅凭指令完成任务，无需示例
- 代表机构：OpenAI

#### 🔬 深入细节
仅凭指令完成任务，无需示例


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
ICL 的核心目标是：研究示例选择与顺序对性能的影响。

#### 🎯 核心要点
- 核心动机：研究示例选择与顺序对性能的影响
- 演化来源：继承或改进自 few_shot
- 代表机构：Google/Stanford

#### 🔬 深入细节
研究示例选择与顺序对性能的影响


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
CoT 的核心目标是：通过中间推理步骤提升复杂推理能力。

#### 🎯 核心要点
- 核心动机：通过中间推理步骤提升复杂推理能力
- 演化来源：继承或改进自 few_shot
- 代表机构：Google

#### 🔬 深入细节
通过中间推理步骤提升复杂推理能力


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
Self-Consistency 的核心目标是：多路径采样投票提升推理鲁棒性。

#### 🎯 核心要点
- 核心动机：多路径采样投票提升推理鲁棒性
- 演化来源：继承或改进自 cot
- 代表机构：Google

#### 🔬 深入细节
多路径采样投票提升推理鲁棒性


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
Zero-shot CoT 的核心目标是："Let's think step by step"激发推理。

#### 🎯 核心要点
- 核心动机："Let's think step by step"激发推理
- 演化来源：继承或改进自 cot
- 代表机构：东京大学/Google

#### 🔬 深入细节
"Let's think step by step"激发推理


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
Least-to-Most 的核心目标是：将复杂问题分解为子问题逐步求解。

#### 🎯 核心要点
- 核心动机：将复杂问题分解为子问题逐步求解
- 演化来源：继承或改进自 cot
- 代表机构：Google

#### 🔬 深入细节
将复杂问题分解为子问题逐步求解


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
ReAct 的核心目标是：协同推理与行动调用外部工具。

#### 🎯 核心要点
- 核心动机：协同推理与行动调用外部工具
- 演化来源：继承或改进自 cot
- 代表机构：Google/Princeton

#### 🔬 深入细节
协同推理与行动调用外部工具


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
ToT 的核心目标是：引入搜索算法探索与回溯思维路径。

#### 🎯 核心要点
- 核心动机：引入搜索算法探索与回溯思维路径
- 演化来源：继承或改进自 cot
- 代表机构：Princeton/Google

#### 🔬 深入细节
引入搜索算法探索与回溯思维路径


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
PAL 的核心目标是：将推理转为可执行代码保证准确性。

#### 🎯 核心要点
- 核心动机：将推理转为可执行代码保证准确性
- 演化来源：继承或改进自 cot
- 代表机构：CMU

#### 🔬 深入细节
将推理转为可执行代码保证准确性


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
Universal SC 的核心目标是：扩展自洽性至开放式任务。

#### 🎯 核心要点
- 核心动机：扩展自洽性至开放式任务
- 演化来源：继承或改进自 self_consistency
- 代表机构：Google

#### 🔬 深入细节
扩展自洽性至开放式任务


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
GoT 的核心目标是：将思维建模为有向图支持聚合循环。

#### 🎯 核心要点
- 核心动机：将思维建模为有向图支持聚合循环
- 演化来源：继承或改进自 tot
- 代表机构：ETH Zurich

#### 🔬 深入细节
将思维建模为有向图支持聚合循环


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
Self-Refine 的核心目标是：通过自我反馈迭代改进输出质量。

#### 🎯 核心要点
- 核心动机：通过自我反馈迭代改进输出质量
- 代表机构：CMU/Allen AI

#### 🔬 深入细节
通过自我反馈迭代改进输出质量


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
Reflexion 的核心目标是：语言反馈实现无梯度闭环学习。

#### 🎯 核心要点
- 核心动机：语言反馈实现无梯度闭环学习
- 演化来源：继承或改进自 self_refine
- 代表机构：MIT/Northeastern

#### 🔬 深入细节
语言反馈实现无梯度闭环学习


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
APE 的核心目标是：利用LLM自动生成筛选最优指令。

#### 🎯 核心要点
- 核心动机：利用LLM自动生成筛选最优指令
- 代表机构：多伦多大学

#### 🔬 深入细节
利用LLM自动生成筛选最优指令


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
PromptBreeder 的核心目标是：进化算法实现提示词自我演化。

#### 🎯 核心要点
- 核心动机：进化算法实现提示词自我演化
- 演化来源：继承或改进自 ape
- 代表机构：DeepMind

#### 🔬 深入细节
进化算法实现提示词自我演化


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
OPRO 的核心目标是：LLM作为优化器迭代提升提示词。

#### 🎯 核心要点
- 核心动机：LLM作为优化器迭代提升提示词
- 演化来源：继承或改进自 ape
- 代表机构：Google DeepMind

#### 🔬 深入细节
LLM作为优化器迭代提升提示词


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
Causal-CoT 的核心目标是：因果分析消除幻觉提升逻辑严密性。

#### 🎯 核心要点
- 核心动机：因果分析消除幻觉提升逻辑严密性
- 演化来源：继承或改进自 cot
- 代表机构：NeurIPS

#### 🔬 深入细节
因果分析消除幻觉提升逻辑严密性


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
Long-CoT 的核心目标是：长推理链在复杂任务中指数级增益。

#### 🎯 核心要点
- 核心动机：长推理链在复杂任务中指数级增益
- 演化来源：继承或改进自 cot
- 代表机构：NeurIPS

#### 🔬 深入细节
长推理链在复杂任务中指数级增益


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
GRACE 的核心目标是：门控机制精炼指令压缩冗余信息。

#### 🎯 核心要点
- 核心动机：门控机制精炼指令压缩冗余信息
- 演化来源：继承或改进自 opro
- 代表机构：NeurIPS

#### 🔬 深入细节
门控机制精炼指令压缩冗余信息


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
UniAPO 的核心目标是：首个多模态自动提示优化方法。

#### 🎯 核心要点
- 核心动机：首个多模态自动提示优化方法
- 演化来源：继承或改进自 opro
- 代表机构：AAAI

#### 🔬 深入细节
首个多模态自动提示优化方法


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
PromptMix 的核心目标是：语义提示与多模态混合增强泛化能力。

#### 🎯 核心要点
- 核心动机：语义提示与多模态混合增强泛化能力
- 代表机构：Information Fusion

#### 🔬 深入细节
语义提示与多模态混合增强泛化能力


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
VCP 的核心目标是：视觉引导条件提示实现图文深度对齐。

#### 🎯 核心要点
- 核心动机：视觉引导条件提示实现图文深度对齐
- 演化来源：继承或改进自 promptmix
- 代表机构：Expert Systems

#### 🔬 深入细节
视觉引导条件提示实现图文深度对齐
