---
domain: llm
topic_id: llm_sft
topic_name: llm_sft
page_icon: 🎯
page_title: LLM监督微调 算法总结
page_subtitle: '{build_date} 版'
page_desc: 概述从指令微调到参数高效微调(LoRA/QLoRA)的技术演进，涵盖经典方法与2026年最新进展
hero_pills:
- 指令微调 · 参数高效微调 · LoRA系列 · 2026前沿
count_pill: '{count} 个算法'
categories:
  instruction:
    label: 指令微调
    color: '#3B82F6'
  peft:
    label: 参数高效微调
    color: '#10B981'
  multitask:
    label: 多任务SFT
    color: '#F59E0B'
  frontier:
    label: 2026前沿进展
    color: '#EF4444'
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
- id: flan
  x: 100
  y: 50
  category: instruction
- id: t0
  x: 150
  y: 80
  category: instruction
- id: instructgpt
  x: 200
  y: 50
  category: instruction
- id: self_instruct
  x: 250
  y: 80
  category: instruction
- id: alpaca
  x: 300
  y: 100
  category: instruction
- id: adapter
  x: 50
  y: 150
  category: peft
- id: prefix_tuning
  x: 120
  y: 170
  category: peft
- id: prompt_tuning
  x: 150
  y: 190
  category: peft
- id: p_tuning
  x: 130
  y: 150
  category: peft
- id: p_tuning_v2
  x: 180
  y: 150
  category: peft
- id: lora
  x: 180
  y: 240
  category: peft
- id: adalora
  x: 280
  y: 220
  category: peft
- id: qlora
  x: 300
  y: 250
  category: peft
- id: dora
  x: 350
  y: 230
  category: peft
- id: galore
  x: 350
  y: 270
  category: peft
- id: vera
  x: 380
  y: 250
  category: peft
- id: flan_t5
  x: 300
  y: 50
  category: multitask
- id: selective_reflection
  x: 450
  y: 80
  category: frontier
- id: llamoco
  x: 450
  y: 50
  category: frontier
- id: lora_e2
  x: 480
  y: 230
  category: frontier
- id: sfed_lora
  x: 500
  y: 260
  category: frontier
- id: bladelora
  x: 450
  y: 220
  category: frontier
- id: lora2
  x: 480
  y: 280
  category: frontier
edges:
- from: flan
  to: t0
  label: 提示工程
- from: flan
  to: instructgpt
  label: 引入RLHF
- from: flan
  to: self_instruct
  label: 自举生成
- from: self_instruct
  to: alpaca
  label: 低成本复现
- from: flan
  to: flan_t5
  label: 扩展任务
- from: adapter
  to: prefix_tuning
  label: 连续优化
- from: prefix_tuning
  to: prompt_tuning
  label: 简化结构
- from: prefix_tuning
  to: p_tuning
  label: 嵌入替代
- from: p_tuning
  to: p_tuning_v2
  label: 跨规模
- from: adapter
  to: lora
  label: 低秩分解
- from: lora
  to: adalora
  label: 动态秩
- from: lora
  to: qlora
  label: 量化压缩
- from: lora
  to: dora
  label: 权重分解
- from: lora
  to: galore
  label: 梯度投影
- from: lora
  to: vera
  label: 共享矩阵
- from: self_instruct
  to: selective_reflection
  label: 数据筛选
- from: flan_t5
  to: llamoco
  label: 代码优化
- from: dora
  to: lora_e2
  label: 正则优化
- from: lora
  to: sfed_lora
  label: 联邦适配
- from: adalora
  to: bladelora
  label: 剪枝加速
- from: lora
  to: lora2
  label: 多尺度
milestones:
- flan
- lora
- instructgpt
```

## 核心算法

### FLAN

```yaml
id: flan
num: 1
name: FLAN
full_name: 指令微调 (Finetuned Language Models)
year: '2021.09'
org: Google Research
parent: —
paper_url: https://arxiv.org/abs/2109.01652
project_url: ''
category: instruction
motivation: 将60+任务转为指令模板实现零样本泛化
```

#### 📝 一句话总结
FLAN 的核心目标是：将60+任务转为指令模板实现零样本泛化。

#### 🎯 核心要点
- 核心动机：将60+任务转为指令模板实现零样本泛化
- 代表机构：Google Research

#### 🔬 深入细节
将60+任务转为指令模板实现零样本泛化


### T0

```yaml
id: t0
num: 2
name: T0
full_name: 多任务提示训练 (T0)
year: '2021.10'
org: BigScience
parent: flan
paper_url: https://arxiv.org/abs/2110.08207
project_url: ''
category: instruction
motivation: PromptSource大规模提示训练
```

#### 📝 一句话总结
T0 提出了**多任务提示训练**（Multitask Prompted Training）范式：在 T5+LM（11B）上使用 PromptSource 工具为 62 个数据集编写的多样化自然语言提示模板进行大规模多任务微调，使模型在从未见过的 4 类 held-out 任务上展现出强大的零样本泛化能力，在 9/11 个评估数据集上匹配或超越 GPT-3（175B）。

#### 🎯 核心要点
- **基座模型**：T5+LM（11B 参数），即在 T5 encoder-decoder 基础上额外进行 LM 适配训练（100K 步 language modeling）的版本
- **PromptSource (P3)**：开源提示模板开发环境，为 170+ 数据集编写了 2,073 个提示模板，每个模板将原始样本映射为自然语言输入-输出对
- **训练规模**：12 大任务类别、62 个训练数据集，每个数据集最多采样 500K 条，使用所有可用提示模板（平均 8.03 个/数据集）
- **三个模型变体**：T0（39 训练集）、T0+（49 训练集，加入 GPT-3 评估集）、T0++（55 训练集，加入 SuperGLUE）
- **评估方式**：Rank Classification——对每个候选答案计算对数似然，选最高者，避免了生成式评估的不稳定性
- **核心发现**：T0 在 NLI、共指消解、句子补全、词义消歧 4 类 held-out 任务上零样本超越 GPT-3；T0++ 在 BIG-bench 上超越 6 倍大的模型
- **消融结论**：增加每个数据集的提示数量可同时提升中位数性能和降低方差；增加训练数据集数量可提升中位数但不一定降低方差
- **与 FLAN 对比**：T0 仅 11B 参数，在多数任务上匹配或超越 137B 的 FLAN，体现了 encoder-decoder 架构和多样化提示的优势

#### 🔬 深入细节
##### 核心框架图

![T0 多任务提示训练总览](https://ar5iv.labs.arxiv.org/html/2110.08207/assets/x1.png)
*图 1：T0 方法总览。左侧展示了多任务提示训练过程：将多个 NLP 数据集通过提示模板转换为统一的文本到文本格式进行训练。右侧展示了零样本评估：对未见任务使用新的提示模板直接推理。*

![PromptSource 提示模板示例](https://ar5iv.labs.arxiv.org/html/2110.08207/assets/x2.png)
*图 2：PromptSource 中的提示模板示例。同一个数据集（如 IMDB）可以有多种不同措辞的提示模板，增加训练多样性。*

##### 算法伪代码

```python
# T0 多任务提示训练流程
# 第一阶段：提示模板构建
for dataset in all_datasets:  # 62 个训练数据集
    for template in PromptSource.get_templates(dataset):  # 平均 8.03 个模板/数据集
        # 每个模板定义: input_template, target_template, answer_choices
        # 例如 IMDB 情感分类:
        #   input: "{review}\nIs this review positive or negative?"
        #   target: "positive" / "negative"
        prompted_examples = template.apply(dataset.examples)
        training_pool.add(prompted_examples)

# 第二阶段：多任务微调
model = load_pretrained("T5-LM-XL-11B")  # T5 + 100K步LM适配
for step in range(max_steps):
    batch = sample_batch(training_pool, max_per_dataset=500_000)
    # 标准 seq2seq 交叉熵损失
    loss = cross_entropy(model.generate(batch.inputs), batch.targets)
    optimizer.step(loss)  # Adafactor, lr=1e-3

# 第三阶段：零样本评估 (Rank Classification)
for task in held_out_tasks:  # NLI, 共指消解, 句子补全, WSD
    for example in task.test_set:
        scores = []
        for choice in answer_choices:
            # 计算每个候选答案的对数似然（按 token 长度归一化）
            score = model.log_likelihood(input=example.prompt, target=choice)
            score /= len(tokenize(choice))  # 长度归一化
            scores.append(score)
        prediction = answer_choices[argmax(scores)]
```

##### 方法详解

**1. 动机与背景**

大规模语言模型（如 GPT-3）展示了通过 in-context learning 实现少样本/零样本泛化的能力，但这种能力高度依赖模型规模——GPT-3 需要 175B 参数。T0 的核心问题是：**能否通过显式的多任务提示训练，让远小于 GPT-3 的模型也获得强大的零样本泛化能力？**

传统多任务学习的局限在于：(1) 不同任务的格式差异大，难以统一；(2) 缺乏足够多样的任务描述方式。T0 通过**自然语言提示模板**同时解决了这两个问题——所有任务统一为 text-to-text 格式，且每个任务有多种不同措辞的提示，迫使模型理解任务语义而非记忆特定格式。

**2. PromptSource 与 P3 数据集**

PromptSource 是本工作的核心基础设施，它是一个基于 Streamlit 的交互式开发环境，允许研究者为 Hugging Face Datasets 中的数据集编写 Jinja2 模板。每个模板包含：

- **输入模板**（input template）：将数据集字段映射为自然语言问题
- **目标模板**（target template）：定义期望的输出格式
- **答案选项**（answer choices）：用于 rank classification 的候选集
- **元数据标注**：包括是否为"原始任务"提示、指标选择等

> 💡 **关键创新**：模板的多样性不仅体现在措辞变化，还包括**非原始任务提示**。例如，为情感分类数据集编写"生成一条具有该情感的评论"这样的反向提示。实验证明这些非原始任务提示也能提升泛化性能。

最终的 Public Pool of Prompts (P3) 包含 170+ 数据集的 2,073 个提示模板，其中 T0 训练使用了 62 个数据集对应的子集。

**3. 训练策略与模型选择**

T0 选择 T5+LM 作为基座模型而非纯 decoder 模型，有两个关键原因：

$$\mathcal{L} = -\sum_{t=1}^{T} \log P_\theta(y_t | y_{<t}, \mathbf{x})$$

其中 \(\mathbf{x}\) 是经提示模板转换后的输入序列，\(y\) 是目标序列。Encoder-decoder 架构允许输入序列通过双向注意力充分编码，而目标序列通过自回归生成——这比纯 decoder 的单向注意力更适合理解复杂的提示指令。

训练超参数：
- 序列长度：输入 1024 tokens，目标 256 tokens
- 优化器：Adafactor，学习率 \(1 \times 10^{-3}\)
- 每个数据集最多采样 500K 条（防止大数据集主导训练）
- 所有数据集混合后统一采样

> ⚠️ **重要细节**：T5+LM 并非原始 T5，而是在 T5 的 span corruption 预训练之后，额外进行了 100K 步的标准语言模型训练（LM adaptation）。Lester et al. (2021) 发现这一步对下游 prompt-based 方法至关重要。

**4. 评估方法：Rank Classification**

零样本评估采用 rank classification 而非自由生成：

$$\hat{y} = \arg\max_{c \in \mathcal{C}} \frac{1}{|c|} \sum_{t=1}^{|c|} \log P_\theta(c_t | c_{<t}, \mathbf{x})$$

其中 \(\mathcal{C}\) 是预定义的候选答案集合，\(|c|\) 是候选答案的 token 长度。长度归一化防止模型偏向短答案。这种方法比自由生成更稳定，且与 GPT-3 的评估方式一致，便于公平比较。

**5. 主要实验结果**

![T0 vs GPT-3 主要结果](https://ar5iv.labs.arxiv.org/html/2110.08207/assets/x4.png)
*图 4：T0 与 GPT-3 在 held-out 任务上的零样本性能对比。每个点代表一个提示模板的性能，箱线图展示了跨模板的分布。*

核心发现：
- **T0 (11B) vs GPT-3 (175B)**：在 9/11 个 held-out 数据集上，T0 的中位数性能匹配或超越 GPT-3，尽管参数量仅为后者的 1/16
- **T0++ 在 BIG-bench**：在 14 个 BIG-bench 任务中，T0++ 超越了参数量为其 6 倍的语言模型基线
- **GPT-3 的脆弱性**：在 RTE 上用 10 个不同提示评估 GPT-3，除原始提示外其余 9 个接近随机猜测（中位数 52.96%），而 T0 对提示措辞明显更鲁棒

**6. 消融实验**

![提示数量消融](https://ar5iv.labs.arxiv.org/html/2110.08207/assets/x6.png)
*图 6：增加每个数据集的训练提示数量的效果。更多提示带来更高的中位数性能和更低的四分位距。*

两个关键消融维度：
- **提示数量 \(p\)**：从 \(p=1\) 增加到 \(p=5.7\)（平均），8/11 数据集中位数提升，7/11 数据集方差下降。进一步加入非原始任务提示（\(p=8.03\)），9/11 中位数提升，8/11 方差下降
- **数据集数量 \(d\)**：从 39（T0）到 49（T0+）到 55（T0++），中位数持续提升但方差不一定下降

**7. 与 FLAN 的关键差异**

T0 与同期工作 FLAN (Wei et al., 2021) 方法相似但有两个关键区别：
1. **架构**：T0 使用 encoder-decoder (11B)，FLAN 使用 decoder-only (137B)。T0 以 1/12 的参数量在多数任务上匹配 FLAN
2. **提示多样性**：T0 的提示在长度和创意上更多样（如 Quora 问题对的管理员角色扮演提示），这可能解释了为何 T0 中增加提示数量有效而 FLAN 中无效

> 💡 **关键洞察**：FLAN 发现 8B 模型经多任务提示训练后性能反而下降，而 T0 发现 3B 模型就能受益。作者将此归因于 encoder-decoder 架构的 masked language modeling 预训练和更多样化的提示设计。

#### 🧪 练习题
```yaml
question: "T0 在零样本评估时采用 Rank Classification 而非自由生成的主要原因是什么？"
options:
  - "自由生成的计算成本过高"
  - "通过对候选答案计算归一化对数似然进行排序，评估更稳定且与 GPT-3 评估方式一致"
  - "encoder-decoder 架构不支持自由生成"
  - "Rank Classification 可以利用更多的训练数据"
answer: 1
explain: "Rank Classification 通过计算每个预定义候选答案的长度归一化对数似然来选择最佳答案，避免了自由生成中格式不匹配、输出不可控等问题，且与 GPT-3 的评估方式一致，便于公平比较。"
```

### InstructGPT

```yaml
id: instructgpt
num: 3
name: InstructGPT
full_name: 指令GPT (InstructGPT)
year: '2022.03'
org: OpenAI
parent: flan
paper_url: https://arxiv.org/abs/2203.02155
project_url: ''
category: instruction
motivation: 引入RLHF框架对齐人类偏好
```

#### 📝 一句话总结
InstructGPT 的核心目标是：引入RLHF框架对齐人类偏好。

#### 🎯 核心要点
- 核心动机：引入RLHF框架对齐人类偏好
- 演化来源：继承或改进自 flan
- 代表机构：OpenAI

#### 🔬 深入细节
引入RLHF框架对齐人类偏好


### Self-Instruct

```yaml
id: self_instruct
num: 4
name: Self-Instruct
full_name: 自指令 (Self-Instruct)
year: '2022.12'
org: University of Washington
parent: flan
paper_url: https://arxiv.org/abs/2212.10560
project_url: ''
category: instruction
motivation: 利用模型自身生成指令数据迭代微调
```

#### 📝 一句话总结
Self-Instruct 的核心目标是：利用模型自身生成指令数据迭代微调。

#### 🎯 核心要点
- 核心动机：利用模型自身生成指令数据迭代微调
- 演化来源：继承或改进自 flan
- 代表机构：University of Washington

#### 🔬 深入细节
利用模型自身生成指令数据迭代微调


### Alpaca

```yaml
id: alpaca
num: 5
name: Alpaca
full_name: 羊驼 (Alpaca)
year: '2023.03'
org: Stanford University
parent: self_instruct
paper_url: https://github.com/tatsu-lab/stanford_alpaca
project_url: ''
category: instruction
motivation: 低成本(<$600)训练高性能指令模型
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

### Adapter

```yaml
id: adapter
num: 6
name: Adapter
full_name: 适配器 (Adapter)
year: '2019.06'
org: Google Research
parent: —
paper_url: http://proceedings.mlr.press/v97/houlsby19a.html
project_url: ''
category: peft
motivation: 插入瓶颈层实现模块化迁移学习
```

#### 📝 一句话总结
Adapter 的核心目标是：插入瓶颈层实现模块化迁移学习。

#### 🎯 核心要点
- 核心动机：插入瓶颈层实现模块化迁移学习
- 代表机构：Google Research

#### 🔬 深入细节
插入瓶颈层实现模块化迁移学习


### Prefix-Tuning

```yaml
id: prefix_tuning
num: 7
name: Prefix-Tuning
full_name: 前缀调优 (Prefix-Tuning)
year: '2021.05'
org: Stanford University
parent: adapter
paper_url: https://arxiv.org/abs/2101.00190
project_url: ''
category: peft
motivation: 优化连续前缀向量引导生成
```

#### 📝 一句话总结
Prefix-Tuning 的核心目标是：优化连续前缀向量引导生成。

#### 🎯 核心要点
- 核心动机：优化连续前缀向量引导生成
- 演化来源：继承或改进自 adapter
- 代表机构：Stanford University

#### 🔬 深入细节
优化连续前缀向量引导生成


### Prompt Tuning

```yaml
id: prompt_tuning
num: 8
name: Prompt Tuning
full_name: 提示调优 (Prompt Tuning)
year: '2021.09'
org: Google Research
parent: prefix_tuning
paper_url: https://aclanthology.org/2021.emnlp-main.243/
project_url: ''
category: peft
motivation: 仅调优输入向量匹配全量微调性能
```

#### 📝 一句话总结
Prompt Tuning 的核心目标是：仅调优输入向量匹配全量微调性能。

#### 🎯 核心要点
- 核心动机：仅调优输入向量匹配全量微调性能
- 演化来源：继承或改进自 prefix_tuning
- 代表机构：Google Research

#### 🔬 深入细节
仅调优输入向量匹配全量微调性能


### P-Tuning

```yaml
id: p_tuning
num: 9
name: P-Tuning
full_name: P调优 (P-Tuning)
year: '2021'
org: Tsinghua University
parent: prefix_tuning
paper_url: https://arxiv.org/abs/2103.10385
project_url: ''
category: peft
motivation: 连续嵌入替代离散提示优化
```

#### 📝 一句话总结
P-Tuning 的核心目标是：连续嵌入替代离散提示优化。

#### 🎯 核心要点
- 核心动机：连续嵌入替代离散提示优化
- 演化来源：继承或改进自 prefix_tuning
- 代表机构：Tsinghua University

#### 🔬 深入细节
连续嵌入替代离散提示优化


### P-Tuning v2

```yaml
id: p_tuning_v2
num: 10
name: P-Tuning v2
full_name: P调优v2 (P-Tuning v2)
year: '2022.05'
org: Tsinghua University
parent: p_tuning
paper_url: https://aclanthology.org/2022.acl-short.8/
project_url: ''
category: peft
motivation: 跨规模通用NLU任务适配
```

#### 📝 一句话总结
P-Tuning v2 的核心目标是：跨规模通用NLU任务适配。

#### 🎯 核心要点
- 核心动机：跨规模通用NLU任务适配
- 演化来源：继承或改进自 p_tuning
- 代表机构：Tsinghua University

#### 🔬 深入细节
跨规模通用NLU任务适配


### LoRA

```yaml
id: lora
num: 11
name: LoRA
full_name: 低秩适配 (Low-Rank Adaptation)
year: '2022.01'
org: Microsoft
parent: adapter
paper_url: https://arxiv.org/abs/2106.09685
project_url: ''
category: peft
motivation: 低秩分解消除推理延迟大幅减少显存
```

#### 📝 一句话总结
LoRA 的核心目标是：低秩分解消除推理延迟大幅减少显存。

#### 🎯 核心要点
- 核心动机：低秩分解消除推理延迟大幅减少显存
- 演化来源：继承或改进自 adapter
- 代表机构：Microsoft

#### 🔬 深入细节
低秩分解消除推理延迟大幅减少显存


### AdaLoRA

```yaml
id: adalora
num: 12
name: AdaLoRA
full_name: 自适应低秩适配 (AdaLoRA)
year: '2023.03'
org: Georgia Tech
parent: lora
paper_url: https://arxiv.org/abs/2303.10512
project_url: ''
category: peft
motivation: SVD动态分配参数预算优化性能
```

#### 📝 一句话总结
AdaLoRA 的核心目标是：SVD动态分配参数预算优化性能。

#### 🎯 核心要点
- 核心动机：SVD动态分配参数预算优化性能
- 演化来源：继承或改进自 lora
- 代表机构：Georgia Tech

#### 🔬 深入细节
SVD动态分配参数预算优化性能


### QLoRA

```yaml
id: qlora
num: 13
name: QLoRA
full_name: 量化低秩适配 (QLoRA)
year: '2023.05'
org: University of Washington
parent: lora
paper_url: https://arxiv.org/abs/2305.14314
project_url: ''
category: peft
motivation: 4-bit量化实现单卡微调65B模型
```

#### 📝 一句话总结
QLoRA 的核心目标是：4-bit量化实现单卡微调65B模型。

#### 🎯 核心要点
- 核心动机：4-bit量化实现单卡微调65B模型
- 演化来源：继承或改进自 lora
- 代表机构：University of Washington

#### 🔬 深入细节
4-bit量化实现单卡微调65B模型


### DoRA

```yaml
id: dora
num: 14
name: DoRA
full_name: 权重分解低秩适配 (DoRA)
year: '2024.02'
org: NVIDIA
parent: lora
paper_url: https://arxiv.org/abs/2402.09353
project_url: ''
category: peft
motivation: 幅值方向分解缩小与全参微调差距
```

#### 📝 一句话总结
DoRA 的核心目标是：幅值方向分解缩小与全参微调差距。

#### 🎯 核心要点
- 核心动机：幅值方向分解缩小与全参微调差距
- 演化来源：继承或改进自 lora
- 代表机构：NVIDIA

#### 🔬 深入细节
幅值方向分解缩小与全参微调差距


### GaLore

```yaml
id: galore
num: 15
name: GaLore
full_name: 梯度低秩投影 (GaLore)
year: '2024.03'
org: UT Austin
parent: lora
paper_url: https://arxiv.org/abs/2403.03507
project_url: ''
category: peft
motivation: 梯度投影减少80%优化器显存
```

#### 📝 一句话总结
GaLore 的核心目标是：梯度投影减少80%优化器显存。

#### 🎯 核心要点
- 核心动机：梯度投影减少80%优化器显存
- 演化来源：继承或改进自 lora
- 代表机构：UT Austin

#### 🔬 深入细节
梯度投影减少80%优化器显存


### VeRA

```yaml
id: vera
num: 16
name: VeRA
full_name: 向量随机矩阵适配 (VeRA)
year: '2024.05'
org: University of Amsterdam
parent: lora
paper_url: https://arxiv.org/abs/2310.11454
project_url: ''
category: peft
motivation: 冻结共享矩阵减少10倍参数量
```

#### 📝 一句话总结
VeRA 的核心目标是：冻结共享矩阵减少10倍参数量。

#### 🎯 核心要点
- 核心动机：冻结共享矩阵减少10倍参数量
- 演化来源：继承或改进自 lora
- 代表机构：University of Amsterdam

#### 🔬 深入细节
冻结共享矩阵减少10倍参数量


### FLAN-T5

```yaml
id: flan_t5
num: 17
name: FLAN-T5
full_name: 指令微调T5 (FLAN-T5)
year: '2023.02'
org: Google Research
parent: flan
paper_url: https://arxiv.org/abs/2210.11416
project_url: ''
category: multitask
motivation: 1.8K任务+CoT数据混合训练
```

#### 📝 一句话总结
FLAN-T5 的核心目标是：1.8K任务+CoT数据混合训练。

#### 🎯 核心要点
- 核心动机：1.8K任务+CoT数据混合训练
- 演化来源：继承或改进自 flan
- 代表机构：Google Research

#### 🔬 深入细节
1.8K任务+CoT数据混合训练


### Selective Reflection-Tuning

```yaml
id: selective_reflection
num: 18
name: Selective Reflection-Tuning
full_name: 选择性反思微调 (Selective Reflection-Tuning)
year: '2026.01'
org: Tsinghua University
parent: self_instruct
paper_url: https://arxiv.org/abs/2402.10110
project_url: ''
category: frontier
motivation: 学生模型自主选择高质量数据
```

#### 📝 一句话总结
Selective Reflection-Tuning 的核心目标是：学生模型自主选择高质量数据。

#### 🎯 核心要点
- 核心动机：学生模型自主选择高质量数据
- 演化来源：继承或改进自 self_instruct
- 代表机构：Tsinghua University

#### 🔬 深入细节
学生模型自主选择高质量数据


### Llamoco

```yaml
id: llamoco
num: 19
name: Llamoco
full_name: 优化代码指令微调 (Llamoco)
year: '2026.01'
org: Peking University
parent: flan_t5
paper_url: https://ieeexplore.ieee.org/abstract/document/11359290/
project_url: ''
category: frontier
motivation: 减少代码生成特征层面混淆
```

#### 📝 一句话总结
Llamoco 的核心目标是：减少代码生成特征层面混淆。

#### 🎯 核心要点
- 核心动机：减少代码生成特征层面混淆
- 演化来源：继承或改进自 flan_t5
- 代表机构：Peking University

#### 🔬 深入细节
减少代码生成特征层面混淆


### LoRA-E2

```yaml
id: lora_e2
num: 20
name: LoRA-E2
full_name: 高效低秩适配E2 (LoRA-E2)
year: '2026.01'
org: Alibaba
parent: dora
paper_url: https://dl.acm.org/doi/abs/10.1145/3774904.3792500
project_url: ''
category: frontier
motivation: 正则化优化稳定训练超越DoRA
```

#### 📝 一句话总结
LoRA-E2 的核心目标是：正则化优化稳定训练超越DoRA。

#### 🎯 核心要点
- 核心动机：正则化优化稳定训练超越DoRA
- 演化来源：继承或改进自 dora
- 代表机构：Alibaba

#### 🔬 深入细节
正则化优化稳定训练超越DoRA


### SFed-LoRA

```yaml
id: sfed_lora
num: 21
name: SFed-LoRA
full_name: 联邦学习低秩适配 (SFed-LoRA)
year: '2026.03'
org: HKU
parent: lora
paper_url: https://arxiv.org/abs/2603.08058
project_url: ''
category: frontier
motivation: 缩放因子缓解联邦学习秩不匹配
```

#### 📝 一句话总结
SFed-LoRA 的核心目标是：缩放因子缓解联邦学习秩不匹配。

#### 🎯 核心要点
- 核心动机：缩放因子缓解联邦学习秩不匹配
- 演化来源：继承或改进自 lora
- 代表机构：HKU

#### 🔬 深入细节
缩放因子缓解联邦学习秩不匹配


### BladeLoRA

```yaml
id: bladelora
num: 22
name: BladeLoRA
full_name: 刀片式低秩适配 (BladeLoRA)
year: '2025.01'
org: ByteDance
parent: adalora
paper_url: https://arxiv.org/abs/2501.02245
project_url: ''
category: frontier
motivation: 自适应秩选择与剪枝提升效率
```

#### 📝 一句话总结
BladeLoRA 的核心目标是：自适应秩选择与剪枝提升效率。

#### 🎯 核心要点
- 核心动机：自适应秩选择与剪枝提升效率
- 演化来源：继承或改进自 adalora
- 代表机构：ByteDance

#### 🔬 深入细节
自适应秩选择与剪枝提升效率


### LoRA2

```yaml
id: lora2
num: 23
name: LoRA2
full_name: 多尺度低秩近似 (LoRA2)
year: '2025.01'
org: Nanjing University
parent: lora
paper_url: https://www.sciencedirect.com/science/article/pii/S0925231225015310
project_url: ''
category: frontier
motivation: 多尺度低秩应对复杂任务需求
```

#### 📝 一句话总结
LoRA2 的核心目标是：多尺度低秩应对复杂任务需求。

#### 🎯 核心要点
- 核心动机：多尺度低秩应对复杂任务需求
- 演化来源：继承或改进自 lora
- 代表机构：Nanjing University

#### 🔬 深入细节
多尺度低秩应对复杂任务需求
