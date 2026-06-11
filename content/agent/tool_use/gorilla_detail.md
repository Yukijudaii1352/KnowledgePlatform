### Gorilla: 海量API连接模型 (Gorilla)

```yaml
id: gorilla
name: Gorilla
full_name: 海量API连接模型 (Gorilla)
year: '2023.05'
org: UC Berkeley
paper_url: https://arxiv.org/abs/2305.15334
category: learning
parent: toolformer
motivation: 检索文档后稳健生成API参数
```

#### 📝 一句话总结
Gorilla 通过在大规模 API 文档和合成指令对上微调 LLaMA，并引入 retriever-aware 训练，让模型能够从自然语言请求中稳定生成正确的 API 调用，在大规模 ML API 调用任务上显著超过同期通用大模型并明显降低工具幻觉。

#### 🎯 核心要点
- 构建了 **APIBench**：从 HuggingFace、TorchHub、TensorFlow Hub 收集 **1,645** 个 API 文档，形成系统化的 API 调用数据集。
- 采用 **self-instruct** 生成训练数据：只用少量人工种子示例，就为每个 API 合成多条自然语言指令与目标调用对。
- 提出 **retriever-aware fine-tuning**：训练时把检索到的 API 文档拼接到用户请求中，教模型学会“读文档再调用”。
- 设计 **AST subtree matching** 评测：不再只看字符串是否完全相同，而是检查候选调用是否在语法树层面匹配目标 API。
- 显式区分 **hallucination** 与 **error**：调用了根本不存在的 API 记为 hallucination；调用了库内 API 但参数或选择错误记为 error。
- 验证了 **测试时文档变更适应能力**：当 API 名称、registry 或约束发生变化时，retriever-aware Gorilla 比纯零样本模型更稳。

#### 🔬 深入细节
![Gorilla 框架图](https://ar5iv.labs.arxiv.org/html/2305.15334/assets/x1.png)

*图：Gorilla 总体流程。上半部分是用 API 文档和合成指令构造训练数据，下半部分是推理时的两种模式：零样本直接调用，或先检索文档再调用。*

##### 数据集构建：从 API 文档到指令-调用对

Gorilla 的第一步不是改模型结构，而是先把“工具调用”这件事数据化。作者从三个模型中心收集 API 文档：

- **HuggingFace**：筛到 925 个高质量模型卡；
- **TensorFlow Hub**：保留 626 个模型；
- **Torch Hub**：保留 95 个模型。

合计 **1,645 个 API**。每个 API 文档被整理成统一 JSON 结构，包含：

- domain
- framework
- functionality
- api_name
- api_call
- api_arguments
- environment_requirements
- example_code
- performance
- description

接着作者借助 GPT-4 按 self-instruct 范式，把 API 文档转成自然语言指令。关键点在于：**用户指令里不能直接泄露 API 名称**，必须像真实用户一样只描述任务目标。

```python
def build_training_pair(api_doc):
    instruction = gpt4_self_instruct(api_doc, few_shot_examples=3)
    target_call = api_doc["api_call"]
    return {"user": instruction, "assistant": target_call}
```

每个 API 最终生成 10 条左右指令-调用对，训练时再转成一轮 user-agent 对话格式，对 LLaMA-7B 做标准 instruction tuning。

##### 核心机制：retriever-aware training

Gorilla 的真正技术点不只是“微调一个会调 API 的模型”，而是让模型学会在推理时**依赖外部文档而不是死记参数**。训练时，用户输入会被扩成：

`<user_prompt> + "Use this API documentation for reference:" + <retrieved_API_doc_JSON>`

这样模型被教会两件事：

- 前半段是用户意图；
- 后半段是 API 文档证据，模型需要“看文档回答问题”。

推理时有两种模式：

- **zero-shot**：不给检索文档，直接根据模型记忆生成调用；
- **with retrieval**：先用 BM25、GPT-Index 或 oracle retriever 找到相关文档，再拼接进 prompt。

这让 Gorilla 能在 API 文档变动时保持适应性。论文专门验证了两类变化：

- 模型规格升级，如 backbone 从 ResNet-50 换到 ResNet-101；
- registry 变化，如 API 来源从 `pytorch/vision` 换到新的 registry。

> 💡 关键：Gorilla 不是把“所有 API 参数背下来”，而是把“根据外部文档拼出正确调用”训练成一种可迁移能力。

##### 评测创新：AST subtree matching

API 调用评测的难点是：同一任务可能有多个合法答案，简单字符串精确匹配不够合理。Gorilla 采用 **AST subtree matching**：

1. 把模型输出的 Python API 调用解析成抽象语法树；
2. 与数据集中的参考 API 树比对；
3. 如果调用主干和关键参数能匹配到某个参考子树，就判为命中了正确 API。

这样做有两个好处：

- **允许可选参数差异**，不因无关字段误伤；
- 能直接识别 **hallucination**：如果输出根本不属于库中任何 API，就说明模型凭空捏造了工具。

##### 关键实验发现

论文最有代表性的结果有三点：

- **零样本 API 调用能力**：Gorilla 在 Torch Hub、HuggingFace、TensorFlow Hub 三个集合上都显著优于 GPT-4、GPT-3.5、Claude 和原始 LLaMA。
- **检索不是越多越好**：如果 retriever 不准，拼进去的文档反而会误导模型；这说明“有 retrieval”不等于“会用 retrieval”。
- **带检索训练优于纯拼接检索**：只有在训练阶段就把 retrieval 纳入输入格式，模型才能真正学会利用文档，并在测试时应对 API 变化。

论文还单独考察了 **带约束的 API 调用**，例如要求模型在多个图像分类模型中，选出参数量低于某阈值、但精度高于某阈值的那个。这要求模型不仅理解功能，还要理解约束字段。

##### Gorilla 的定位

如果说 Toolformer 证明了“模型可以学会何时调用工具”，那 Gorilla 更进一步证明了：

- **开放 API 文档可以成为训练信号**；
- **工具调用的关键不是函数名，而是文档理解 + 参数生成**；
- **外部检索文档应被纳入训练分布，而不是只在推理时临时拼接**。

后面的 BFCL、ToolLLM、OpenFunctions，本质上都延续了 Gorilla 把 API 调用做成独立能力赛道的思路。

> ⚠️ 注意：Gorilla 论文主要研究的是“单次 API 调用正确性”，多步工具链、长程状态管理和复杂 agent 规划，并不是这篇工作的重点。

#### 🧪 练习题
```yaml
question: "Gorilla 采用 AST subtree matching 评测 API 调用，主要是为了解决什么问题？"
options:
  - "让训练速度更快"
  - "避免把语义等价但字符串不完全相同的调用误判为错误"
  - "把所有 API 自动翻译成 SQL"
  - "让模型在推理时不再需要文档检索"
answer: 1
explain: "同一任务可能有多个合法调用写法，AST subtree matching 能容忍可选参数差异，并识别真正的 API 命中与 hallucination。"
```
