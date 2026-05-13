### Llama Guard: LLM-based Input-Output Safeguard Model

```yaml
id: llama_guard
name: Llama Guard
full_name: "Llama Guard: LLM-based Input-Output Safeguard Model"
year: 2023
org: Meta
paper_url: https://arxiv.org/abs/2312.06674
category: llm_safety
parent: "—"
motivation: "基于LLM的输入输出安全护栏模型，可通过prompt调整安全策略，支持zero-shot和few-shot分类，同时作为prompt和response的安全分类器监控"
```

#### 📝 一句话总结

Llama Guard 基于 Llama2-7b 微调，将安全分类任务建模为指令跟随问题，通过在 prompt 中嵌入安全策略（taxonomy）实现对人机对话中 prompt 和 response 的安全分类，支持 zero-shot 适配新策略，是首个兼具高性能与灵活策略定制能力的开源 LLM 安全护栏模型。

#### 🎯 核心要点

- 提出 **安全风险分类体系**（Safety Risk Taxonomy）：涵盖暴力与仇恨、性内容、犯罪策划、枪支与非法武器、管制物质、自残共 6 大类 13 个子类
- 将安全分类建模为 **指令跟随任务**：通过 task instruction 在 prompt 中嵌入完整的安全策略定义，模型输出 "safe"/"unsafe" 及违规类别
- 支持 **prompt 分类和 response 分类** 两种任务，无需传统多任务学习的额外开销
- **零样本策略适配**：仅通过修改 prompt 中的 taxonomy 描述即可适配新的安全策略（如 OpenAI Moderation taxonomy），无需重新训练
- **少样本学习增强**：在 prompt 中加入 2-4 个示例即可在 OpenAI Moderation 数据集上超越 OpenAI 自己的 Moderation API
- **高效微调迁移**：仅需目标数据集 20% 的训练数据即可达到从头训练使用 100% 数据的 Llama2-7b 的性能
- 在自有测试集上 AUPRC 达 0.945（prompt）/ 0.953（response），在 ToxicChat 上零样本 AUPRC 0.626 超越所有基线

#### 🔬 深入细节

##### 核心框架

![Llama Guard 任务指令示意图](https://ar5iv.labs.arxiv.org/html/2312.06674/assets/figure/task3.png)
*图 1：Llama Guard 的 prompt 分类和 response 分类任务指令格式。左侧为 prompt 分类，右侧为 response 分类。安全策略（taxonomy）以自然语言形式嵌入 prompt 中。*

Llama Guard 的核心设计思想是将传统的安全内容分类问题转化为一个 **指令跟随（instruction-following）** 任务。模型接收一个包含以下组件的结构化 prompt：

1. **Task instruction**：指定当前任务类型（prompt 分类或 response 分类）
2. **Safety taxonomy**：以自然语言描述的安全策略定义，包含各违规类别及其描述
3. **Conversation**：待分类的对话内容（用户 prompt，或 prompt + 模型 response）

模型输出格式为：第一行 "safe" 或 "unsafe"，若为 unsafe 则第二行输出违规的类别编号（如 "O3" 表示 Criminal Planning）。

##### 算法伪代码

```python
# Llama Guard 推理流程
def llama_guard_classify(conversation, taxonomy, task_type="prompt"):
    """
    conversation: 用户prompt（及可选的模型response）
    taxonomy: 安全策略定义（类别名称+描述）
    task_type: "prompt" 或 "response"
    """
    # 1. 构建指令 prompt
    instruction = build_task_instruction(task_type)  # 指定分类目标
    taxonomy_text = format_taxonomy(taxonomy)          # 格式化安全策略
    conv_text = format_conversation(conversation)      # 格式化对话

    # 2. 拼接完整输入
    full_prompt = f"[INST] {instruction}\n{taxonomy_text}\n{conv_text} [/INST]"

    # 3. 模型生成
    output = llama2_7b_finetuned.generate(full_prompt)
    # output 示例: "unsafe\nO3" 或 "safe"

    # 4. 解析结果
    lines = output.strip().split('\n')
    is_safe = (lines[0] == "safe")
    violated_categories = lines[1] if not is_safe and len(lines) > 1 else None

    # 5. 获取概率分数（用于 AUPRC 计算）
    # 取第一个 token 为 "safe" 的 softmax 概率作为安全概率
    p_safe = softmax(logits_first_token)["safe"]

    return is_safe, violated_categories, p_safe
```

##### 动机与背景

现有的内容安全审核工具（如 OpenAI Moderation API、Perspective API、Azure AI Content Safety）存在两个核心问题：

1. **策略固化**：这些工具的安全分类体系是预定义且不可修改的。不同的应用场景（如医疗咨询 vs. 创意写作）对"安全"的定义差异巨大，固定的分类体系无法满足多样化需求。
2. **覆盖不全**：大多数现有工具仅针对用户输入（prompt）进行审核，而忽略了对 LLM 生成内容（response）的安全检查。LLM 可能在看似安全的 prompt 下生成有害内容。

> 💡 关键：Llama Guard 的核心创新在于将安全策略从模型参数中解耦出来，放入 prompt 中以自然语言描述，使得同一个模型可以通过修改 prompt 适配完全不同的安全策略。

##### 安全风险分类体系

Llama Guard 提出了一套参考性的安全风险分类体系，涵盖 6 大类：

| 类别 | 描述 | 适用对象 |
|------|------|----------|
| O1: Violence & Hate | 暴力行为、仇恨言论、歧视 | Prompt & Response |
| O2: Sexual Content | 色情内容、性行为描述 | Prompt & Response |
| O3: Criminal Planning | 犯罪活动策划（绑架、抢劫等） | Prompt & Response |
| O4: Guns & Illegal Weapons | 非法武器获取与使用 | Prompt & Response |
| O5: Regulated Substances | 管制药物、毒品相关 | Prompt & Response |
| O6: Self-Harm | 自杀、自残相关内容 | Prompt & Response |

> ⚠️ 注意：该分类体系是**参考性**的，而非强制性的。Llama Guard 的设计允许用户通过修改 prompt 中的 taxonomy 来定义自己的安全策略，这正是其核心优势。

##### 训练方法

Llama Guard 基于 Llama2-7b 进行监督微调（SFT），训练数据的构建流程如下：

1. **数据收集**：使用多种 LLM 生成 prompt，涵盖安全和不安全的样本。对于不安全样本，使用对抗性提示技术（adversarial prompting）生成更具挑战性的案例。
2. **Response 生成**：使用 Llama2 生成对应的 response，并通过多种策略确保 response 覆盖安全和不安全两种情况。
3. **人工标注**：由训练有素的标注员对每个 prompt-response 对进行多标签分类标注。
4. **数据格式化**：将标注数据转化为指令跟随格式，包含完整的 task instruction、taxonomy 和对话内容。

训练使用标准的 next-token prediction 损失函数，但 **仅在模型输出部分（"safe"/"unsafe" + 类别标签）计算损失**，输入 prompt 部分不参与损失计算。

##### 概率分数与分类阈值

作为生成式模型，Llama Guard 通过以下方式提供概率分数以支持灵活的分类阈值调整：

$$P(\text{safe}) = \text{softmax}(\text{logits}_{\text{first\_token}})[\text{"safe"}]$$

其中 \(\text{logits}_{\text{first\_token}}\) 是模型生成第一个 token 时的 logits。通过调整阈值 \(\tau\)，可以在精确率和召回率之间进行权衡：

$$\hat{y} = \begin{cases} \text{safe} & \text{if } P(\text{safe}) \geq \tau \\ \text{unsafe} & \text{otherwise} \end{cases}$$

这使得 Llama Guard 可以像传统分类器一样计算 AUPRC（Area Under Precision-Recall Curve）等指标。

##### 策略适配能力

Llama Guard 展现了三个层次的策略适配能力：

**1. 零样本适配（Zero-shot）**：仅修改 prompt 中的 taxonomy 描述即可适配新策略。在 OpenAI Moderation 数据集上，零样本 AUPRC 达 0.847，接近 OpenAI 自己的 API（0.856）。

**2. 少样本适配（Few-shot）**：在 prompt 中额外提供 2-4 个标注示例。在 OpenAI Moderation 数据集上 AUPRC 提升至 0.872，**超越 OpenAI Moderation API**。

**3. 微调适配（Fine-tuning）**：在目标数据集上进一步微调。实验表明，Llama Guard 仅需 ToxicChat 数据集 20% 的训练数据即可达到从头训练的 Llama2-7b 使用 100% 数据的性能。

![Llama Guard 在 OpenAI Mod 数据集上的类别级性能](https://ar5iv.labs.arxiv.org/html/2312.06674/assets/figure/openai_categorical.png)
*图 2：Llama Guard 在 OpenAI Moderation 数据集上各类别的 AUPRC 表现。少样本（few-shot）prompting 显著缩小了与 OpenAI API 的差距。*

![Llama Guard 与 Llama2-7b 在 ToxicChat 上的微调对比](https://ar5iv.labs.arxiv.org/html/2312.06674/assets/x1.png)
*图 3：在 ToxicChat 数据集上，Llama Guard 通过微调展现出比 Llama2-7b 更强的数据效率和适配能力。*

##### 与现有方法的对比

| 特性 | Llama Guard | OpenAI Mod API | Perspective API | Azure AI |
|------|-------------|----------------|-----------------|----------|
| 策略可定制 | ✅ 通过 prompt | ❌ 固定 11 类 | ❌ 固定 6 类 | ❌ 固定 4 类 |
| Response 分类 | ✅ | ❌ 仅 prompt | ❌ 仅 prompt | ❌ 仅 prompt |
| 开源 | ✅ | ❌ | ❌ | ❌ |
| 概率分数 | ✅ | ✅ | ✅ | ❌（整数 0-6） |
| 零样本迁移 | ✅ | ❌ 需重训 | ❌ 需重训 | ❌ 需重训 |
| 自有测试集 AUPRC | **0.945** | 0.764 | 0.728 | — |
| ToxicChat AUPRC | **0.626** | 0.588 | 0.532 | — |

> 💡 关键：Llama Guard 在自有测试集上全面领先，在 ToxicChat（所有模型均未训练过的数据集）上也展现最强的零样本泛化能力。在 OpenAI Moderation 数据集上，虽然零样本略低于 OpenAI API（0.847 vs 0.856），但通过少样本 prompting 即可反超（0.872）。

#### 🧪 练习题

```yaml
question: "Llama Guard 实现策略灵活适配的核心机制是什么？"
options:
  - "使用多任务学习同时训练多种安全策略"
  - "将安全分类体系以自然语言形式嵌入输入 prompt 中，通过指令跟随范式实现"
  - "为每种安全策略训练一个独立的分类头"
  - "使用强化学习从人类反馈中动态调整安全策略"
answer: 1
explain: "Llama Guard 将安全策略（taxonomy）以自然语言描述的形式放入 prompt 中，将分类任务转化为指令跟随任务，从而实现仅通过修改 prompt 即可适配不同安全策略，无需重新训练模型。"
```