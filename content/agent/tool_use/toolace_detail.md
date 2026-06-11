### ToolACE: 工具调用自演化数据引擎 (ToolACE)

```yaml
id: toolace
name: ToolACE
full_name: 工具调用自演化数据引擎 (ToolACE)
year: '2024.09'
org: SJTU/USTC/Huawei
paper_url: https://arxiv.org/abs/2409.00920
category: learning
parent: toolllm
motivation: 多代理自演化生成高质量调用数据
```

#### 📝 一句话总结
ToolACE 是一套全自动化的工具学习数据合成与验证流水线，通过 **TSS（工具自进化合成）→ MAI（多智能体交互对话生成）→ DLV（双层验证）** 三大模块，生成高精度、高多样、高复杂度的函数调用训练数据，使 8B 模型在 BFCL 基准排行榜上超越所有 API 模型和开源模型，夺得第一名。

#### 🎯 核心要点
- **三大模块协同**：TSS 从预训练数据中提取 API 上下文树（30 主域 / 390 子域 / 3398 细粒度域），递归合成 26,507 个多样化 API；MAI 通过用户/助手/工具三智能体交互生成覆盖 Single/Parallel/Dependent 三类函数调用及非工具调用场景的多轮对话；DLV 通过规则检查 + 模型检查双层验证确保数据精度。
- **Formalized Thinking + Self-Consistency**：MAI 中助手 Agent 生成每步决策时强制进行"形式化思考"，并生成 N 个候选进行多数投票，显著提升生成对话质量（消融实验：最终通过率从 49.8% 提升至 61.8%，提升 10+ 百分点）。
- **BFCL 双榜第一**：ToolACE-8B 在 BFCL-v1 以 Overall Accuracy **91.41%**（AST 89.09% / Exec 95.50%）力压 Claude-3.5-Sonnet（90.53%）、GPT-4 系列；在 BFCL-v2 以 **81.26%** 同样居首，且工具相关性检测得分 **89.17%**，遥遥领先。
- **Zone of Proximal Development（ZPD）理论驱动复杂度设计**：数据复杂度过低或过高均无效，ToolACE 通过相似性引导的复杂化（Similarity-Guided Complication）和多模式提示（Multi-Mode Prompting）生成难度略高于模型当前能力的数据，使其学习效率最大化。
- **格式泛化（Format Generalization）**：训练数据支持 JSON / YAML / XML / Markdown 等多种主流工具描述和调用格式，使模型在实际部署中无需格式适配。

#### 🔬 深入细节
##### 一、Tool Self-Evolution Synthesis（TSS）—— 工具自进化合成模块

**目标**：自动生成覆盖广泛领域、多样性参数类型和约束条件的 API 定义集合，超越手动收集或简单模板生成的局限。

**三级层次 API 上下文树**：
- 从 LLM 预训练语料（技术手册、API 文档、产品规范、用户指南、教程等）中提取 API 相关文档
- 用 LLM 从每篇文档提取 API 领域及所有可能的功能/用例
- 递归构建形成 **30 个一级域**（如 Entertainment、Education、Finance、Health、Transport）→ **390 个粗粒度子域**（如 Music、Anime、Books）→ **3,398 个细粒度域**（如 Music Streaming、Live Music）
- 树中每个叶节点代表一个独特功能，叶节点总数约 **十万** 量级

**三大步骤**（如图 Figure 2 所示）：

1. **Speciation（物种形成）**：创建层次化的 API 上下文树，为后续 API 合成提供领域和功能指导。从预训练数据的 API 相关文档出发，用 LLM 提取 API 领域及功能，递归生成子节点。

2. **Adaption（适应性调整）**：确定每个 API 的领域归属和复杂度等级。从细粒度域层级采样子树，确保同域内 API 功能区分度。更复杂的 API 覆盖更多上下文树节点，获取更细化、更领域特定的能力；简单 API 可能仅包含单个子节点，聚焦于简单直白的目的。

3. **Evolution（进化）**：基于多样性指标持续改进 API 定义。具体操作包括：
   - 添加新功能或参数
   - 纳入额外约束条件
   - 变异参数类型
   - 更新返回结果结构
   - 支持嵌套类型（如列表的列表、列表的字典）
   
   维护一个包含多样化 API 样例的缓冲区，迭代从中采样、适配到当前功能子树、生成下一代 API。

**最终产出**：26,507 个独立 API 定义，参数类型丰富度远超其他工具增强数据集（参数类型分布见 Figure 7）。

**对应论文图片**：![Figure 2](https://ar5iv.org/html/2409.00920/assets/x2.png)（TSS 详细流程，左侧展示 Entertainment 域下的子树示例）

##### 二、Multi-Agent Interactive Dialog Generation（MAI）—— 多智能体交互对话生成模块

**目标**：基于合成 API，通过三个不同角色的 LLM Agent 协同生成高精度、高复杂度的多轮函数调用对话。

**三智能体架构**（Figure 1 中间部分示意）：

| Agent | 角色 | 功能 |
|-------|------|------|
| **User Agent** (θ_u) | 模拟用户 | 发出请求/提供补充信息；由多模式提示和相似性引导复杂化策略驱动，控制对话多样性和复杂度；采样用户风格（style）和用户模板（template）以变异表达方式 |
| **Assistant Agent** (θ_a) | 模拟助手 | 决策行动空间：调用 API、请求更多信息、总结工具反馈、提供非工具回答；每步动作前执行 **Formalized Thinking（形式化思考）** + **Self-Consistency（自一致性）** 多数投票 |
| **Tool Agent** (θ_t) | 模拟 API 执行器 | 接收助手提供的工具描述和输入参数，输出模拟的执行结果；支撑依赖型函数调用的多步顺序执行 |

**对话框类型**（Dialog Diversity）：
1. **Simple（简单）**：单轮单次函数调用
2. **Parallel（并行）**：单轮同时调用多个相互独立的函数
3. **Dependent（依赖）**：多步顺序调用，后续调用依赖于前一步的工具返回结果
4. **Non-tool-use（无工具）**：不需要调用任何 API 的常规对话（防止模型过触发工具调用）

**Formalized Thinking 形式化思考**：
- 助手 Agent 在每次决策时，将推理过程明确拆分为：① 是否需要调用工具？② 选择哪个 API？③ 如何填充参数？④ 可选参数如何处理？
- 随即通过 **Self-Consistency** 机制生成 N 个候选响应（C_a^1, C_a^2, ..., C_a^N）
- 比较各候选的**工具调用部分**是否一致：若不一致 → 丢弃该轮或添加 loss mask；若一致 → 通过多数投票选择最终响应
- 消融实验验证效果显著（见下文消融实验部分）

**Algorithm 1 完整伪代码**：
```
Algorithm 1: MAI Dialog Generation

1: Initialization: Sampled API list A, Dialog D_0 = [], Target Turn Length N_t
2: Definition: User Agent θ_u and output C_u, Assistant Agent θ_a and output C_a, Tool Agent θ_t and output C_t
3: for t = 1, 2, ..., N_t do
4:     Sample user template p and user style s
5:     C_u = θ_u(D_{t-1}, A, p, s)
6:     C_a^1, ..., C_a^N = θ_a(C_u, D_{t-1}, A)  ▷ 用形式化思考生成 N 个响应
7:     if C_a^1 ≠ C_a^2 ≠ ... ≠ C_a^N then  ▷ 只检查工具调用部分的一致性
8:         Continue or Add Loss Mask  ▷ 丢弃该轮或添加 loss mask
9:     else
10:        C_a = MajorVote(C_a^1, ..., C_a^N)
11:    end if
12:    D_t = D_{t-1} + [C_u, C_a]
13:    while Tool calling in C_a do  ▷ 依赖型函数需要多次顺序调用
14:        C_t = θ_t(C_a, A)               ▷ 工具执行
15:        C_a = θ_a(C_t, D_t, A)          ▷ 助手基于工具反馈生成新响应
16:        D_t = D_t + [C_t, C_a]
17:    end while
18: end for
```

**对应论文图片**：![Figure 1](https://ar5iv.org/html/2409.00920/assets/x1.png)（ToolACE 整体框架）；![Figure 3](https://ar5iv.org/html/2409.00920/assets/x3.png)（API 定义和函数调用的 JSON 格式示例）

##### 三、Dual-Layer Validation Process（DLV）—— 双层验证系统

**目标**：双阶段验证确保生成数据的准确性——先做快速规则检查剔除明显错误，再做深度模型检查捕捉语义问题。

**第一层：Rule Verification（规则验证，基于代码的检查器）**
- 自动检测格式错误（JSON 格式合法性、必需字段完整性等）
- 自动检测逻辑矛盾（参数类型不匹配、引用了不存在的 API、必填参数缺失等）
- 可检测的错误类型示例见 **Figure 4**（包括：幻觉参数名、错误 JSON 语法、参数类型不匹配、参数值格式不合法等）

**第二层：Model Verification（模型验证，基于 LLM 的检查器）**
- 对于规则验证难以捕获的语义级错误（如工具选择是否正确、参数语义是否合理、可选参数处理是否恰当），使用 LLM 作为裁判进行深度审核
- 通过精心设计的 prompt 模板，让 LLM 判断对话与 API 定义之间的语义一致性

**消融实验——Formalized Thinking 效果**（Table 5）：

| 方法 | 规则层通过率 | 模型层通过率 | 最终通过率 |
|------|:--------:|:--------:|:--------:|
| **With FT** | 67.9% | 91.1% | **61.8%** |
| W/O FT | 56.1% | 88.7% | 49.8% |

→ 加入形式化思考后，最终通过率绝对提升 **12 个百分点**，模型验证层通过率提升 2.4 个百分点，规则层提升 11.8 个百分点。

**消融实验——验证系统各层效果**（Figure 11）：用 LoRA 在三种数据集上微调 LLaMA3.1-8B-Instruct：
1. `w.o. dual` —— 完全无验证（基线最差）
2. `w.o. model` —— 仅规则验证（中等，验证了规则层有效性）
3. `Final` —— 双层验证（最优，BFCL 可执行准确率和综合准确率均最高）

→ 双层验证缺一不可，共同保障最终模型性能达到最优。

**对应论文图片**：![Figure 4](https://ar5iv.org/html/2409.00920/assets/x4.png)（规则验证检测到的错误示例）；![Figure 5](https://ar5iv.org/html/2409.00920/assets/x5.png)（双层验证各层通过率统计）

##### 四、核心实验成果

**ToolACE-8B 在 BFCL-v1 排行榜（Table 3，前 15 名）**：

| Rank | Model | Overall Accuracy | AST | Exec | Relevance |
|:----:|-------|:----------------:|:---:|:----:|:---------:|
| **1** | **ToolACE-8B (FC)** | **91.41** | 89.09 | 95.50 | 89.17 |
| 2 | Claude-3.5-Sonnet-0620 (Prompt) | 90.53 | 88.55 | 95.00 | 84.17 |
| 3 | Functionary-Medium-v3.1 (FC) | 88.88 | 86.18 | 95.00 | 81.25 |
| 4 | xLAM-7b-fc-r (FC) | 88.76 | 86.36 | 93.50 | 85.00 |
| 5 | GPT-4-1106-Preview (Prompt) | 88.53 | 88.91 | 95.50 | 72.50 |
| ... | ... | ... | ... | ... | ... |
| 15 | Gorilla-OpenFunctions-v2 (FC) | 85.41 | 87.82 | — | — |

**关键结论**：
1. **8B 小模型超越千亿级 API 闭源模型**：ToolACE-8B 不仅超过所有同规模模型，还超越了 GPT-4 全系列、Claude-3.5-Sonnet 等顶级闭源 API 模型。
2. **与同基座对比**：ToolACE-8B 与 Functionary-Small-v3.2 均基于 LLaMA3.1-8B-Instruct 微调，但 ToolACE-8B 在所有类别上均显著领先，直接证明 ToolACE 数据合成的优越性。
3. **工具相关性最强**：Relevance 得分 89.17%，超过第二名 4.59 个百分点，反映模型能精准判断何时需要/不需要调用工具。

**BFCL-v2 排行榜（Table 4，前 5 名）**：

| Rank | Model | Overall Accuracy |
|:----:|-------|:----------------:|
| **1** | **ToolACE-8B (FC)** | **81.26** |
| 2 | GPT-4o-mini-2024-07-18 (FC) | 80.55 |
| 3 | GPT-4o-mini-2024-07-18 (Prompt) | 80.19 |
| 4 | Claude-3.5-Sonnet-0620 (Prompt) | 79.76 |
| 5 | GPT-4-turbo-2024-04-09 (Prompt) | 79.66 |

→ v2 版本难度更高，ToolACE-8B 依然稳居榜首，且是唯一进入前 10 的 8B 以下开源模型。

**数据多样性统计**：
- **一级域分布**（Figure 6）：Entertainment、Technology、Business 占比最高
- **参数类型分布**（Figure 7）：涵盖 string、integer、boolean、array、object、float 以及各类嵌套组合
- **数据类别分布**（Figure 8）：训练数据覆盖丰富的数据类型和约束组合
- **复杂度分布**（Figure 10）：归一化复杂度分在 [0,1] 区间呈偏右分布，确保大量数据处于 ZPD 最优难度区

**格式泛化能力**（Figure 9）：模型在 JSON / YAML / XML / Markdown 四种格式下均能正确解析工具定义并生成对应格式的调用，训练阶段即支持多种格式交替，避免过拟合单一格式。

##### 五、其他关键图表

| 图表 | 内容 | 链接 |
|------|------|------|
| Figure 1 | ToolACE 整体框架（TSS + MAI + DLV） | [x1.png](https://ar5iv.org/html/2409.00920/assets/x1.png) |
| Figure 2 | TSS 详细流程（含 API Context Tree 示例） | [x2.png](https://ar5iv.org/html/2409.00920/assets/x2.png) |
| Figure 3 | API 定义和函数调用 JSON 格式示例 | [x3.png](https://ar5iv.org/html/2409.00920/assets/x3.png) |
| Figure 4 | 规则验证检测到的错误示例 | [x4.png](https://ar5iv.org/html/2409.00920/assets/x4.png) |
| Figure 5 | DLV 中规则验证和模型验证的通过率 | [x5.png](https://ar5iv.org/html/2409.00920/assets/x5.png) |
| Figure 6 | 所有 API 的一级域分布统计 | [x6.png](https://ar5iv.org/html/2409.00920/assets/x6.png) |
| Figure 7 | 参数类型分布 | [x7.png](https://ar5iv.org/html/2409.00920/assets/x7.png) |
| Figure 8 | 数据类别分布 | [x8.png](https://ar5iv.org/html/2409.00920/assets/x8.png) |
| Figure 9 | 函数调用格式泛化 | [x9.png](https://ar5iv.org/html/2409.00920/assets/x9.png) |
| Figure 10 | 单次数据复杂度分数分布 | [x10.png](https://ar5iv.org/html/2409.00920/assets/x10.png) |
| Figure 11 | 验证系统消融实验（w.o. dual / w.o. model / Final） | [x11.png](https://ar5iv.org/html/2409.00920/assets/x11.png) |

#### 🧪 练习题
```yaml
question: "ToolACE 中 DLV（双层验证）的主要作用是什么？"
options:
  - "把所有 API 自动部署成真实在线服务"
  - "先用规则检查过滤格式与参数错误，再用模型检查补足语义级错误"
  - "把单轮对话全部改写成多轮对话"
  - "在推理时替代 LLM 生成工具调用"
answer: 1
explain: "DLV 的核心是规则层抓显式错误、模型层抓语义错误，两层叠加保证生成训练数据的准确率。"
```
