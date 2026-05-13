### Alpaca

```yaml
id: alpaca
name: Alpaca
full_name: "羊驼 (Alpaca: A Strong, Replicable Instruction-Following Model)"
year: "2023.03"
org: "Stanford University"
paper_url: "https://github.com/tatsu-lab/stanford_alpaca"
category: "instruction"
parent: "self_instruct"
motivation: "低成本(<$600)训练高性能指令模型，开创学术界复现商业级指令模型的范式"
```

#### 📝 一句话总结

Alpaca 基于 Meta 的 LLaMA 7B 模型，利用改进的 Self-Instruct 方法从 OpenAI text-davinci-003 自动生成 52K 条指令跟随数据进行监督微调（SFT），以不到 600 美元的总成本（数据生成 <\$500 + 训练 <\$100）训练出在指令跟随能力上与 text-davinci-003 表现相当的开源模型，开创了"用强模型蒸馏弱模型"的低成本指令微调范式。

#### 🎯 核心要点

- **基座模型**：基于 Meta LLaMA 7B 进行全参数监督微调（SFT），不涉及 RLHF
- **数据生成**：改进 Self-Instruct 流程，使用 text-davinci-003 从 175 条人工种子指令扩展生成 52K 条指令-输出对
- **极低成本**：数据生成 <\$500（OpenAI API 调用），模型训练 <\$100（4×A100 训练 3 小时），总计 <\$600
- **Self-Instruct 关键改进**：(1) 教师模型从 davinci 升级为 text-davinci-003；(2) 批量解码一次生成 20 条指令；(3) 去除分类/非分类任务区分；(4) 每条指令仅生成单个输出实例
- **数据格式**：三元组结构 `{instruction, input, output}`，约 40% 样本包含额外 input 上下文
- **训练配置**：HuggingFace Transformers + FSDP，LR=2e-5，epochs=3，batch_size=128，max_length=512
- **评估结果**：在 Self-Instruct 评估集上，Alpaca 7B 以 90:89 的胜率与 text-davinci-003 持平
- **开源贡献**：发布了完整的数据生成代码、52K 训练数据、微调代码和模型权重（以 LLaMA 差分形式）

#### 🔬 深入细节

![Alpaca 训练流程图](https://crfm.stanford.edu/static/img/posts/2023-03-13-alpaca/alpaca_main.jpg)
*图：Alpaca 训练流程总览——从 175 条种子指令出发，通过 text-davinci-003 生成 52K 指令数据，再微调 LLaMA 7B 得到 Alpaca 模型。总成本不到 600 美元。*

![指令数据动词-宾语分布](https://raw.githubusercontent.com/tatsu-lab/stanford_alpaca/main/assets/parse_analysis.png)
*图：52K 指令数据的动词-宾语分布（内圈为根动词，外圈为直接宾语），展示了 Alpaca 训练数据覆盖了极为多样的任务类型。*

```python
# Alpaca 数据生成与训练流程伪代码

# ===== 阶段一：改进的 Self-Instruct 数据生成 =====
seed_instructions = load("seed_tasks.jsonl")  # 175 条人工编写的种子指令

generated_data = []
while len(generated_data) < 52000:
    # 从种子池 + 已生成数据中采样 in-context examples
    examples = sample(seed_instructions + generated_data, k=3)
    
    # 关键改进：批量生成，一次请求生成 20 条新指令（大幅降低 API 成本）
    prompt = format_prompt(examples, num_to_generate=20)
    new_instructions = text_davinci_003(prompt, temperature=1.0, top_p=1.0)
    
    # 过滤：ROUGE-L 相似度 > 0.7 的重复指令被丢弃
    for inst in new_instructions:
        if rouge_l(inst, existing_instructions) < 0.7:
            # 每条指令仅生成单个输出（简化自 Self-Instruct 的多实例）
            output = text_davinci_003(format_output_prompt(inst))
            generated_data.append({
                "instruction": inst.instruction,
                "input": inst.input,       # 约 40% 非空
                "output": output
            })

save("alpaca_data.json", generated_data)  # 最终 52,002 条

# ===== 阶段二：监督微调 LLaMA 7B =====
model = LLaMA_7B()
data = load("alpaca_data.json")

# 两种 prompt 模板（根据是否有 input 字段选择）
PROMPT_WITH_INPUT = """Below is an instruction that describes a task, \
paired with an input that provides further context. \
Write a response that appropriately completes the request.

### Instruction:
{instruction}

### Input:
{input}

### Response:"""

PROMPT_WITHOUT_INPUT = """Below is an instruction that describes a task. \
Write a response that appropriately completes the request.

### Instruction:
{instruction}

### Response:"""

# HuggingFace + FSDP 分布式训练
train(model, data,
      lr=2e-5, epochs=3, batch_size=128,
      max_length=512, warmup_ratio=0.03,
      lr_scheduler="cosine", weight_decay=0,
      fsdp="full_shard auto_wrap",
      gradient_accumulation_steps=8)  # 4×A100, 每卡 batch=4
# 训练耗时约 3 小时
```

##### 动机与背景

2023 年初，以 ChatGPT 和 text-davinci-003 为代表的指令跟随模型展现了强大的能力，但学术界面临两大困境：

1. **模型不可及**：OpenAI、Anthropic 等公司的指令模型均为闭源，学术研究者无法深入研究其内部机制、安全性和偏见问题。即使 Meta 发布了 LLaMA 基座模型，但缺乏高质量指令数据和微调方案使其无法直接用于指令跟随任务。
2. **成本高昂**：训练一个具备类似能力的模型通常需要大量人工标注数据（如 InstructGPT 使用了数万条人工标注）和大规模计算资源，这对大多数学术实验室来说是不可承受的。

Alpaca 的核心洞察在于：**结合开源基座模型（LLaMA）和自动化数据生成（改进的 Self-Instruct），可以极低成本复现商业级指令模型的核心能力**。这一思路直接催生了后续大量开源指令模型的涌现。

##### 核心机制：改进的 Self-Instruct 数据生成

Alpaca 对原始 Self-Instruct（Wang et al., 2022）方法进行了四项关键改进：

**1. 更强的教师模型**

原始 Self-Instruct 使用 `davinci`（GPT-3 175B 基础版本）生成指令和输出，而 Alpaca 升级为 `text-davinci-003`（经过 RLHF 对齐的 InstructGPT）。text-davinci-003 生成的指令更加多样、输出更加准确和自然，这是数据质量提升的最关键因素。

**2. 激进的批量解码**

原始 Self-Instruct 每次 API 调用仅生成少量指令，而 Alpaca 将批量大小提升至**一次生成 20 条指令**。这一改进将数据生成成本从原始方法的数千美元降低至不到 500 美元，同时由于 text-davinci-003 的强大能力，数据多样性并未受到明显影响。

**3. 流程简化**

- 去除了分类任务与非分类任务的区分，统一处理所有指令类型
- 每条指令仅生成 1 个输出实例（而非原始的 2-3 个），进一步降低成本
- 重新设计了 prompt 模板（`prompt.txt`），更明确地指导 text-davinci-003 生成高质量指令

**4. 数据格式设计**

每条数据包含三个字段：

| 字段 | 说明 | 示例 |
|------|------|------|
| `instruction` | 任务描述（52K 条各不相同） | "Summarize the following article" |
| `input` | 可选的任务上下文（约 40% 非空） | [一段文章内容] |
| `output` | text-davinci-003 生成的回答 | [摘要内容] |

这种设计使模型能够处理纯指令（如"写一首诗"）和带上下文的指令（如"总结以下文章"）两种场景。

##### 训练细节

Alpaca 的训练采用标准的监督微调（SFT）范式，关键配置如下：

| 超参数 | LLaMA-7B | LLaMA-13B |
|--------|----------|-----------|
| Batch size | 128 | 128 |
| Learning rate | 2e-5 | 1e-5 |
| Epochs | 3 | 5 |
| Max length | 512 | 512 |
| Weight decay | 0 | 0 |
| Warmup ratio | 0.03 | 0.03 |
| LR scheduler | cosine | cosine |

训练使用了 **FSDP（Fully Sharded Data Parallel）** 进行分布式训练，在 4 张 A100 80GB GPU 上通过梯度累积（`gradient_accumulation_steps=8`，每卡 batch=4）实现等效 batch size 128。整个训练过程仅需约 3 小时。

> 💡 **Prompt 模板设计**：Alpaca 使用了两种 prompt 模板——一种用于有 `input` 的样本（约 40%），另一种用于无 `input` 的样本（约 60%）。这种区分使模型在训练时能学会处理两种不同的指令格式。推理时，用户可根据任务类型选择合适的模板。

##### 与传统方法的对比

| 维度 | InstructGPT / ChatGPT | Self-Instruct (原始) | **Alpaca** |
|------|----------------------|---------------------|-----------|
| 数据来源 | 人工标注（数万条） | davinci 自动生成（~52K） | **text-davinci-003 自动生成（52K）** |
| 数据成本 | 极高（人工标注） | ~数千美元 | **<\$500** |
| 训练方法 | SFT + RLHF | SFT（GPT-3 175B） | **SFT（LLaMA 7B）** |
| 基座模型 | GPT-3 175B（闭源） | GPT-3 175B（闭源） | **LLaMA 7B（开源）** |
| 训练成本 | 极高 | 极高 | **<\$100** |
| 开源程度 | 完全闭源 | 部分开源（数据+代码） | **完全开源（数据+代码+权重差分）** |

##### 评估与局限性

在 Self-Instruct 评估集（252 条指令）上的盲评中，5 位作者对 Alpaca 7B 与 text-davinci-003 的输出进行成对比较，结果为 **90:89**（Alpaca 胜 90 次，text-davinci-003 胜 89 次），两者基本持平。这一结果令人惊讶，因为 Alpaca 仅有 7B 参数且未经 RLHF。

然而，作者明确指出 Alpaca 存在以下重要局限：

- **幻觉（Hallucination）**：Alpaca 的幻觉问题比 text-davinci-003 更为严重，会自信地编造不存在的事实
- **毒性（Toxicity）**：模型可能生成有害、有偏见的内容
- **刻板印象（Stereotypes）**：模型可能强化社会刻板印象
- **评估局限**：Self-Instruct 评估集规模小（252 条）且不够多样，无法全面反映模型能力

> ⚠️ **重要提醒**：Alpaca 仅使用了 SFT 而未进行 RLHF 或安全对齐，因此**不适合直接部署到生产环境**。作者发布 Alpaca 的目的是推动学术研究，而非提供可商用的产品。

##### 历史影响

Alpaca 的发布（2023 年 3 月 13 日）是开源 LLM 社区的里程碑事件，其核心贡献在于：

1. **证明了可行性**：首次公开证明"小模型 + 少量高质量指令数据 = 接近商业模型表现"
2. **降低了门槛**：将指令微调的成本从数万美元降至数百美元，使几乎所有研究者都能参与
3. **催生了生态**：直接启发了 Vicuna、Koala、Dolly、WizardLM、Baize 等大量后续工作，形成了"用强模型蒸馏弱模型"的研究范式
4. **推动了数据开源**：52K 训练数据的开源使社区能够研究指令数据的质量、多样性和偏见问题

#### 🧪 练习题

```yaml
question: "Alpaca 相比原始 Self-Instruct 方法的关键改进是什么？"
options:
  - "使用 RLHF 替代 SFT 进行训练"
  - "将教师模型从 davinci 升级为 text-davinci-003，并采用批量解码降低成本"
  - "使用人工标注数据替代自动生成数据"
  - "将基座模型从 7B 扩展到 175B 参数"
answer: 1
explain: "Alpaca 的核心改进在于使用经过 RLHF 对齐的 text-davinci-003 替代基础 davinci 模型生成数据（提升数据质量），并通过一次生成 20 条指令的批量解码策略将数据生成成本从数千美元降至不到 500 美元。Alpaca 仍使用 SFT 训练，未使用 RLHF。"
```