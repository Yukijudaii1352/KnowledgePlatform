### Gorilla — 面向大规模 API 调用的检索增强微调 LLM

```yaml
id: gorilla
name: Gorilla
full_name: "Gorilla: Large Language Model Connected with Massive APIs"
year: 2024
org: UC Berkeley
paper_url: https://arxiv.org/abs/2305.15334
category: tool_use
parent: toolformer
motivation: 通过检索增强微调LLaMA使LLM能准确生成API调用，连接大规模API
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