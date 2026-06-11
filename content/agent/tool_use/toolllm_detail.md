### ToolLLM: 万级API工具学习框架 (ToolLLM)

```yaml
id: toolllm
name: ToolLLM
full_name: 万级API工具学习框架 (ToolLLM)
year: '2023.07'
org: Tsinghua University
paper_url: https://arxiv.org/abs/2307.16789
category: learning
parent: gorilla
motivation: 把万级真实API纳入训练与搜索
```

#### 📝 一句话总结
ToolLLM 首次将 16,464 个真实 REST API 纳入 LLM 的工具学习闭环，通过 **DFSDT（深度优先搜索决策树）** 规划策略和 **ToolBench** 数据集，使开源模型在工具使用评测 **ToolEval** 上达到甚至超越闭源 GPT-4 的水平。

#### 🎯 核心要点
- **动机**：现有工具增强 LLM 研究仅使用少量（通常 < 10 个）手工挑选或合成的 API，远远无法复现真实世界中 ChatGPT Plugins 等系统需要从数万级 API 中精确选用的复杂度。
- **ToolBench 数据集**：从 RapidAPI 爬取了 16,464 个真实 REST API（49 个粗粒度类别，如 Weather、Finance、Crypto），并自动生成指令-解决方案对。每条指令对应一个多步骤 API 调用链（单步到最多 8 步），共覆盖单工具和多工具组合场景。
- **DFSDT 决策策略**：针对多步 API 链中每一步可能有多候选工具的情况，提出深度优先搜索决策树——LLM 在每个步骤生成多个候选 API 调用，若某分支执行失败则回溯尝试下一条，显著提升规划成功率。
- **ToolLLaMA 模型**：基于 LLaMA 对 ToolBench 数据进行监督微调（SFT），获得与 GPT-4 可比的工具使用能力。
- **ToolEval 评测基准**：引入基于 LLM 的自动化评估器，从「是否选择了正确的 API」「参数是否正确填充」「最终答案是否正确」等多个维度自动评判工具使用质量，与人工评估高度一致（Pearson 相关系数 > 0.8）。

#### 🔬 深入细节
##### (a) 系统架构与工作流

ToolLLM 的工作流分为四个阶段：

1. **API 收集与筛选**：从 RapidAPI Hub 收集 16,464 个 REST API，涵盖 Sports、Finance、Weather、Translation 等 49 个类别，清洗后保留可调用的 API，提取其 OpenAPI/Swagger 文档。
2. **指令生成**：基于 API 文档，利用 ChatGPT 自动生成多样化用户指令及对应的多步 API 调用链。指令生成策略包括：单工具单步、单工具多步、多工具组合、带条件分支的调用。
3. **解决方案搜索**：在训练阶段使用 DFSDT 搜索正确的 API 调用序列；每一步评估多个候选，失败则回溯，最终得到可执行的 ground-truth 轨迹。
4. **模型训练与评估**：用搜得的轨迹对 LLaMA 进行 SFT，得到 ToolLLaMA；在 ToolEval 上与 ChatGPT、GPT-4 等对比。

![ToolLLM 系统架构](https://ar5iv.labs.arxiv.org/html/2307.16789/assets/figures/overview.png)

*图：ToolLLM 整体框架，包括 API收集、指令生成、DFSDT 求解搜索、ToolLLaMA 训练评估四阶段。*

```
┌─────────────────┐     ┌──────────────────────┐     ┌──────────────────┐
│  RapidAPI Hub    │────▶│  16,464 REST APIs    │────▶│  Instruction     │
│  (49 categories) │     │  + OpenAPI Docs      │     │  Generation      │
└─────────────────┘     └──────────────────────┘     └────────┬─────────┘
                                                              │
                    ┌──────────────────────┐                  │
                    │  ToolEval (Auto Eval) │◀─────────────────┤
                    │  - API Selection      │                  │
                    │  - Param Correctness  │     ┌────────────▼──────────┐
                    │  - Answer Quality     │     │  DFSDT Solution       │
                    └──────────────────────┘     │  Search (train)       │
                                                  │  - Candidate gen      │
                                                  │  - Backtrack on fail  │
                                                  └───────────┬───────────┘
                                                              │
                                                  ┌───────────▼───────────┐
                                                  │  ToolLLaMA (SFT)      │
                                                  │  ← LLaMA + ToolBench  │
                                                  └───────────────────────┘
```

> 💡 关键：DFSDT 是连接指令和可执行轨迹的核心桥梁，它将 LLM 生成的多候选调用的「试错」过程变成系统化的搜索问题。

##### (b) DFSDT（深度优先搜索决策树）核心机制

DFSDT 是 ToolLLM 的核心规划算法。给定用户指令和 API 候选池，LLM 在每一步生成 \(B\) 个候选 API 调用，然后将成功执行的调用结果追加到上下文栈中，若某分支失败则自动回溯。

![DFSDT 示意图](https://ar5iv.labs.arxiv.org/html/2307.16789/assets/figures/dfsdt.png)

*图：DFSDT 搜索树示意——每个节点为一次 API 调用决策，红色叉标明执行失败后回溯到父节点尝试下一个候选项。*

**伪代码**：

```python
def dfsdt(instruction, api_pool, max_depth=H, beam_size=B):
    stack = [(instruction, [])]  # (current_context, history)

    while stack:
        context, history = stack.pop()
        if len(history) >= max_depth:
            if answer_reached(context):
                return history  # 成功路径

        # 1. LLM 为当前步骤生成 B 个候选 API 调用
        candidates = llm_propose(context, api_pool, beam_size=B)

        # 2. 按置信度排序，逆序入栈以保持优先序
        for api_call in reversed(candidates):
            try:
                result = execute_api(api_call)
                new_context = context + f"\nAPI Result: {result}"
                stack.append((new_context, history + [api_call]))
            except APIError:
                continue  # 该分支失败，自动回溯

    return None  # 搜索失败
```

**要点解释**：

- **Beam候选生成**：每步 LLM 不单选 1 个 API，而是生成 \(B\) 个候选（beam），极大降低单步失败率。论文中 \(B\) 一般设为 3~5。
- **自动回溯**：当某个 API 调用返回错误（404、参数错误等），DFSDT 自动丢弃该分支并尝试栈中下一个候选，无需人工干预。这使得模型可以在数万级 API 的真实「噪音」环境中鲁棒执行。
- **终止条件**：达到最大深度 \(H\) 或 LLM 判断已给出完整答案时终止搜索返回路径。

> ⚠️ 注意：DFSDT 仅在 **训练阶段** 用作 ground-truth 求解器；**推理阶段** ToolLLaMA 直接自回归生成 API 调用，不执行回溯，以保证实时性。

##### (c) 实验结果要点

- **ToolLLaMA-7B** 在 ToolEval 上综合得分达到 GPT-3.5-turbo 的约 95%，部分场景超越 GPT-4。
- **DFSDT vs 贪婪搜索**：在需要多步组合的复杂指令上，DFSDT 的通过率比贪婪解码高 18% 以上。
- **API 规模影响**：随着候选 API 池从 100 扩大到 10000，闭源模型（GPT-4）性能下降约 30%，而 ToolLLaMA 仅下降约 12%，表明其在大规模工具检索场景下的鲁棒性。
- **ToolEval 与人工评估一致性**：自动评估与人工评分的 Pearson 相关系数达到 0.85，验证了 ToolEval 作为自动化评测基准的可靠性。

##### (d) API Retriever 模块

面对 16,464 个 API，不可能全部塞入 prompt。ToolLLM 引入了一个轻量级 **API Retriever**：
- 基于 Sentence-BERT 将所有 API 文档描述编码为稠密向量，存入 FAISS 索引。
- 给定用户指令，检索 top-\(k\)（通常 \(k=100 \sim 200\)）最相关的候选 API，大幅缩减搜索空间。
- 该检索器与 LLM 解耦，可独立升级或替换为更强大的检索模型。

##### (e) 关键发现与洞察

1. **真实 API 的「噪音」反而提升泛化**：RapidAPI 文档天然包含不完整描述、过时接口、非结构化返回体，模型在训练中学会应对这些不确定性，测试时泛化优于全合成 API 训练。
2. **多步骤链中的错误传播是瓶颈**：即使单独 API 调用正确率很高，3 步以上的链中错误累积导致最终成功率大幅下降。DFSDT 通过回溯机制在此类场景收益最大。
3. **指令多样性至关重要**：ToolBench 包含 13 类指令（如 Explain、Create、Update、Compare 等），消融实验表明移除任何一类指令都会导致对应场景的性能断崖式下降。

> 💡 关键启发：将真实世界的不完备性（过期文档、返回异常）视为一种噪声正则化，是 ToolLLM 泛化性的重要保证。

#### 🧪 练习题
```yaml
question: "DFSDT 在 ToolLLM 中的主要设计目的是什么？"
options:
  - "提升 API 调用时的网络传输速率"
  - "在多步 API 链中通过候选生成与失败回溯，提高规划成功率"
  - "压缩 API 文档长度，减少 prompt token 消耗"
  - "将 REST API 自动转换为 GraphQL 接口"
answer: 1
explain: "DFSDT 在每一步生成多个候选 API，执行失败后自动回溯尝试下一个，从而在真实的不可靠 API 环境中实现高成功率的规划。"
```
