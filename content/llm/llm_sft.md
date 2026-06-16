---
domain: llm
topic_id: llm_sft
topic_name: LLM监督微调 算法总结
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

!INCLUDE_RAW ../../temp/content_survey_bulk_20260614_174337/researcher_output/llm/llm_sft/overview/zhihu__训练方法(2)_监督微调_SFT_LoRA_(with_code)__06f613fe/article.md

## 最新进展综述

!INCLUDE_RAW ../../temp/content_survey_bulk_20260614_174337/researcher_output/llm/llm_sft/latest/zhihu__论文分享_大语言模型_最新进展__8a14c804/article.md

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
FLAN 提出了大规模指令微调：把 60+ 已有 NLP 数据集改写成自然语言指令模板后继续微调 137B 预训练语言模型，解决纯提示式零样本推理在未见任务上不稳定、难以理解任务意图的问题。

#### 🎯 核心要点
- 使用 137B LaMDA-PT 作为基座，将其通过多任务自然语言指令监督微调成 FLAN
- 聚合 62 个公开文本数据集，并按任务类型划分为 12 个 task clusters
- 每个数据集人工编写 10 个自然语言模板，其中部分模板会“反转任务”以增加格式和目标多样性
- 采用按任务簇留一的评估方式：评估某类任务时，训练阶段移除同类任务簇，确保是真正的跨任务零样本泛化
- 对分类任务追加 `OPTIONS` 后缀显式列出候选标签，缓解自由生成模型在类别概率归一化上的不稳定
- 训练时限制每个数据集最多 30k 样本，并使用 examples-proportional mixing 与 3k mixing-rate cap 平衡大/小数据集
- 消融显示成功依赖三个因素：指令模板本身、足够多的任务簇、足够大的模型规模

#### 🔬 深入细节
![FLAN 指令微调与零样本评估示意图](https://ar5iv.labs.arxiv.org/html/2109.01652/assets/x1.png)
*图：FLAN 先在多种任务的自然语言指令格式上微调，再直接迁移到训练时未见过的任务类型；下方柱状图展示了 NLI、阅读理解、闭卷问答等任务上相对 GPT-3 的零样本提升。*

FLAN 的核心问题设定不是“如何让模型记住某个下游任务”，而是“如何让模型学会把自然语言描述当成任务接口”。GPT-3 这类大模型在 few-shot 情况下可以从示例中推断格式，但 zero-shot 时没有示例，模型只能依赖提示语和预训练分布。如果提示格式不像预训练文本，或者任务本身不是自然续写形式，例如 NLI、阅读理解、结构化到文本，模型就容易不知道输出什么。FLAN 的做法是把大量已有监督任务统一转成“指令 + 输入 -> 目标输出”的语言建模问题，让模型在参数中学习“读懂任务描述并执行”的能力。

```python
# FLAN 指令微调的核心流程
clusters = group_datasets_by_task_type(datasets_62)  # 12 个任务簇

for eval_cluster in clusters:
    train_datasets = [d for d in datasets_62 if cluster(d) != eval_cluster]
    model = initialize_from_lamda_pt_137b()

    for step in range(30_000):
        dataset = sample_with_examples_proportional_mixing(
            train_datasets,
            max_examples_per_dataset=30_000,
            mixing_rate_cap=3_000,
        )
        example = sample(dataset)
        template = random_choice(templates[dataset])  # 每个数据集约 10 个模板
        prompt, target = verbalize_as_instruction(example, template)

        if is_classification(dataset):
            prompt += "\nOPTIONS: " + format_label_options(dataset.labels)

        loss = -log_prob(model, target, condition=prompt)
        model.update(loss, optimizer="Adafactor", lr=3e-5)

    evaluate_zero_shot(model, held_out_cluster=eval_cluster)
```

训练目标仍然是标准的条件语言建模损失，只是训练样本经过模板化后显式带有任务说明。若第 \(i\) 个样本包含指令模板 \(t_i\)、输入 \(x_i\)、目标输出 \(y_i\)，FLAN 优化的是：

$$
\mathcal{L}_{\text{FLAN}}(\theta)
= - \sum_{(t_i,x_i,y_i) \sim \mathcal{D}_{\text{mix}}}
\log p_\theta(y_i \mid t_i, x_i)
$$

这里真正关键的是 \(\mathcal{D}_{\text{mix}}\) 的构造。论文没有只把同一类任务堆在一起做多任务微调，而是把 NLI、阅读理解、闭卷问答、翻译、情感分析、结构化生成等任务放入同一混合分布。这样模型不能只记住单一标签空间，而必须从自然语言模板中识别“当前要做什么”。每个数据集的多个模板也很重要：如果同一任务只使用固定模板，模型可能学到模板捷径；模板多样化迫使模型把语义指令而不是字面格式作为条件。

> 💡 关键：FLAN 的泛化评估不是简单的留出数据集，而是留出整个任务簇。例如评估 NLI 时，训练阶段会移除 NLI 以及与其过近的 paraphrase 任务，避免模型通过相似任务泄漏获得能力。

分类任务的 `OPTIONS` 机制是一个很实用的细节。decoder-only LM 天然生成自由文本，若用候选答案的语言模型概率做 rank classification，某个标签可能因为同义表达过多而被稀释，例如 “yes” 的语义有很多表达方式，单个 token 的概率并不等于类别概率。FLAN 在提示末尾显式列出可选类别，使模型知道输出空间被限制到这些选项，从而把“开放生成”更接近“条件分类”。这不是改变架构，而是通过提示协议把分类头的作用转移到语言接口中。

与传统 pretrain-finetune 相比，FLAN 不为每个任务训练专用头，也不要求下游任务提供训练集；与纯 prompting 相比，它又不是完全依赖人工 prompt engineering，而是用监督信号把“遵循指令”写入模型参数。论文的 Figure 2 将 FLAN 放在两者之间：它保留预训练语言模型的通用性，同时借助多任务监督让模型更适合在推理时接受自然语言任务描述。

消融结果解释了为什么这套方法在 2021 年显得重要。第一，增加训练任务簇通常会提升未见任务簇性能，说明 FLAN 学到的是跨任务的指令执行能力，而不是孤立任务技巧。第二，模型规模不足时指令微调甚至可能伤害泛化，因为小模型容量会被训练任务本身占满；在 68B/137B 量级上，模型才有足够容量同时记住任务和抽象出指令遵循能力。第三，去掉自然语言指令、只保留输入输出或数据集名，效果明显下降，说明提升并非普通多任务微调即可解释。

FLAN 的限制也来自它的设计边界：它主要依赖已有公开 NLP 数据集改写，因此任务覆盖仍受传统 benchmark 分布限制；它没有直接使用人类偏好或安全约束来优化回答质量；对于“本来就是语言续写”的 commonsense/coreference 类任务，指令带来的增益较小。这些限制后来分别被更大规模的 Flan Collection、Self-Instruct 式合成指令、以及 InstructGPT/RLHF 路线继续推进。

#### 🧪 练习题
```yaml
question: "FLAN 中按任务簇留一评估的主要目的是什么？"
options:
  - "减少训练所需显存，使 137B 模型可以单卡训练"
  - "确保评估任务类型在指令微调阶段未出现，从而衡量跨任务零样本泛化"
  - "让每个数据集都只使用一个固定模板，降低模板方差"
  - "把分类任务全部改成无监督聚类任务"
answer: 1
explain: "FLAN 评估某个任务簇时会从训练混合中移除该簇及过近任务，避免同类型任务泄漏，使结果更能反映模型是否学会遵循未见任务的自然语言指令。"
```

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
InstructGPT 提出了面向真实用户指令的三阶段 RLHF 训练框架：先用人工示范做监督微调，再用人工偏好训练奖励模型，最后用 PPO 优化策略，从而解决大语言模型“会续写但不一定会按用户意图行动”的对齐问题。

#### 🎯 核心要点
- 三阶段流程：Supervised Fine-Tuning (SFT) → Reward Model (RM) → PPO Reinforcement Learning
- 数据来自标注员编写 prompts、OpenAI API Playground 用户 prompts、人工示范回答与人工排序比较
- SFT 阶段把 GPT-3 微调为初始指令跟随策略，是后续 RLHF 的 warm start
- RM 阶段输入 prompt-response，输出标量奖励，并通过 pairwise ranking loss 学习人类偏好
- PPO 阶段把语言生成视为 bandit 环境，用 RM 分数作为奖励更新策略模型
- 使用相对 SFT/reference policy 的 KL penalty，抑制策略为了骗过奖励模型而偏离可读语言分布
- 提出 PPO-ptx：在 PPO 更新中混入预训练语言建模梯度，以降低 public NLP benchmarks 上的 alignment tax
- 实验显示 1.3B InstructGPT 在人工偏好上可优于 175B GPT-3，说明对齐训练能比单纯扩大规模更直接改善用户体验

#### 🔬 深入细节
![InstructGPT 三阶段 RLHF 流程图](https://ar5iv.labs.arxiv.org/html/2203.02155/assets/x2.png)
*图：InstructGPT 方法包含收集示范并训练 SFT、收集多回答排序并训练 RM、再用 PPO 针对 RM 奖励优化策略三个阶段。蓝色箭头表示对应数据用于训练模型。*

InstructGPT 的出发点是语言建模目标和用户意图之间存在错位。预训练 GPT-3 优化的是“给定前文预测下一个 token”，它可能生成流畅但不真实、不安全、没有完成任务的文本；而用户希望模型 helpful、honest、harmless。单纯把模型做大不会自动把目标函数从“拟合互联网文本”变成“按照用户指令完成任务”。InstructGPT 因此将目标重新定义为：在真实 prompt 分布上，让输出更符合人工标注者对好回答的偏好。

```python
# InstructGPT / RLHF 训练骨架
base = load_pretrained_gpt3()

# Step 1: supervised fine-tuning from demonstrations
D_sft = collect_labeler_demonstrations(prompts)
pi_sft = finetune_lm(base, D_sft)  # prompt -> labeler-written answer

# Step 2: reward modeling from ranked comparisons
D_rm = []
for prompt in sampled_prompts:
    candidates = sample_outputs([pi_sft, other_policies], prompt, k=4)
    ranking = labelers_rank(candidates)
    D_rm.extend(pairwise_preferences(prompt, ranking))
reward_model = train_pairwise_rm(D_rm)

# Step 3: PPO policy optimization against the reward model
pi = initialize_from(pi_sft)
reference = freeze(pi_sft)
for batch_prompts in ppo_prompt_stream:
    responses = pi.generate(batch_prompts, temperature=1.0)
    rm_reward = reward_model(batch_prompts, responses)
    kl_penalty = beta * logprob_ratio(pi, reference, batch_prompts, responses)
    reward = rm_reward - kl_penalty
    ppo_update(policy=pi, reward=reward, clip_ratio=0.2)

    if use_ptx:
        lm_update(pi, pretraining_tokens, weight=gamma)
```

奖励模型训练把人工排序拆成成对偏好。对于同一个 prompt \(x\)，若标注者更偏好回答 \(y_w\) 而不是 \(y_l\)，奖励模型 \(r_\theta(x,y)\) 应该给 \(y_w\) 更高分。论文使用 logistic pairwise loss：

$$
\mathcal{L}_{\text{RM}}(\theta)
= -\mathbb{E}_{(x,y_w,y_l) \sim D}
\left[\log \sigma\left(r_\theta(x,y_w)-r_\theta(x,y_l)\right)\right]
$$

这个损失的直觉很直接：它不要求人类给出绝对分数，只要求比较两个候选谁更好。这样能把主观的“更有帮助、更诚实、更少有害”转化为可学习的相对顺序。论文还提到对同一 prompt 的多个 completion 不应简单打散重复训练，因为比较样本高度相关，奖励模型容易一轮内过拟合；实际训练中使用 6B RM，是因为更大的 175B RM 虽可能验证损失更低，但训练和作为 value function 初始化都更不稳定。

PPO 阶段不是让模型无限最大化 RM 分数，而是在奖励中加入相对 SFT 策略的 KL 约束。带预训练混合项时，目标可写成：

$$
\max_\phi\;\mathbb{E}_{(x,y)\sim \pi_\phi}
\left[r_\theta(x,y) - \beta \log \frac{\pi_\phi(y\mid x)}{\pi_{\text{SFT}}(y\mid x)}\right]
+ \gamma\,\mathbb{E}_{x\sim D_{\text{pretrain}}}
\left[\log \pi_\phi(x)\right]
$$

其中 \(\pi_\phi\) 是正在优化的 policy，\(\pi_{\text{SFT}}\) 是冻结参考模型，\(\beta\) 控制偏离参考策略的代价，\(\gamma\) 控制预训练分布保持项。KL 项解决的是 reward hacking 与分布漂移：如果只看 RM 分数，策略可能生成奖励模型喜欢但人类并不真正喜欢的异常文本；KL penalty 把优化限制在 SFT 模型附近，让回答仍保持自然语言质量和基本能力。

> ⚠️ 注意：InstructGPT 中的 RL 环境近似为单步 bandit。prompt 给定后，策略生成完整 response，RM 对整个 response 给一个标量奖励，episode 随即结束；这不同于机器人控制中每步都有外部环境状态转移的经典 RL。

PPO-ptx 是论文中很重要但常被忽略的工程设计。RLHF 会让模型更符合标注者偏好，但也可能牺牲部分公开 NLP benchmark 能力，这被称为 alignment tax。论文发现，在每个 PPO minibatch 中额外加入来自 GPT-3 预训练语料的语言建模梯度，可以缓解 SQuAD、DROP、HellaSwag、翻译等任务的性能回退，而不显著损害人工偏好得分。换言之，PPO 负责“向人类偏好移动”，预训练梯度负责“不要忘掉通用语言能力”。

与 FLAN/T0 这类公开任务指令微调相比，InstructGPT 的关键差异在于优化信号来自真实用户分布和人类偏好，而不是传统 NLP 数据集的标准答案。FLAN 教模型理解“任务说明”，InstructGPT 则进一步教模型什么样的回答更被人类认为有用、真实、合适。论文也直接比较了在 API prompt 分布上微调 FLAN/T0 风格数据的模型，发现它们不如 InstructGPT 受标注者偏好，说明 benchmark 指令数据与真实产品 prompt 分布之间存在明显差距。

这套框架仍然有边界。模型对齐的是特定标注者和研究团队的偏好，而不是抽象的全人类价值；奖励模型可能放大标注规范中的偏差，例如过度奖励 hedging 导致回答不够直接；复杂约束、多语言、代码、错误前提等场景仍会失败。但 InstructGPT 的方法论影响很大：它把“对齐”拆成可执行的数据闭环，即收集示范、收集偏好、训练奖励、受约束地优化策略，成为后续 ChatGPT/RLHF 系列方法的基础模板。

#### 🧪 练习题
```yaml
question: "InstructGPT 在 PPO 阶段加入相对 SFT/reference policy 的 KL penalty，主要是为了什么？"
options:
  - "让奖励模型完全不参与训练，只保留监督微调"
  - "限制策略偏离参考模型过远，降低 reward hacking 和语言分布漂移风险"
  - "把所有用户 prompt 转换成分类标签"
  - "强制模型参数量小于 1.3B"
answer: 1
explain: "PPO 直接最大化 RM 分数可能产生异常但高分的回答；KL penalty 将新策略约束在 SFT/reference policy 附近，使偏好优化更稳定。"
```

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
Self-Instruct 提出用语言模型自身生成“指令、输入、输出”三元组，再过滤并回灌微调原模型的自举框架，解决人工指令数据昂贵、规模和多样性不足的问题。

#### 🎯 核心要点
- 从 175 个人工编写 seed tasks 启动，每个 seed task 包含 1 条指令和 1 个输入输出实例
- 迭代采样任务池中的示例作为 in-context demonstrations，让 vanilla GPT-3 生成新任务指令
- 对新指令先判断是否为分类任务，因为分类与非分类任务需要不同的实例生成顺序
- 非分类任务使用 input-first：先生成输入字段，再生成对应输出
- 分类任务使用 output-first：先生成候选类别/标签，再按标签条件生成输入，缓解类别分布偏斜
- 过滤规则包括 ROUGE-L 相似度阈值 0.7、排除图像/图片等 LM 无法处理关键词、去重、移除输入相同但输出冲突的实例、移除过长/过短和输出重复输入的样本
- 在 GPT-3 案例中生成 52,445 条指令和 82,439 个实例，并用多种 prompt 模板做监督微调
- 在 Super-NaturalInstructions 上相对 vanilla GPT-3 获得约 33.1% 绝对提升，接近使用私有人工数据训练的 InstructGPT-001

#### 🔬 深入细节
![Self-Instruct 自举生成流程图](https://ar5iv.labs.arxiv.org/html/2212.10560/assets/x2.png)
*图：Self-Instruct 从少量 seed tasks 出发，循环执行指令生成、任务类型识别、实例生成和过滤，再把高质量生成任务加入任务池，最终用于微调原语言模型。*

Self-Instruct 的核心动机是：指令微调已经被 FLAN、T0、InstructGPT 证明有效，但高质量指令数据本身成为瓶颈。人工编写任务需要创造力和领域知识，公开 instruction datasets 又常偏向传统 NLP benchmark，例如分类、抽取、问答，难以覆盖真实用户会提出的开放任务。Self-Instruct 的假设是，大语言模型虽然还不擅长稳定遵循指令，但已经具备生成多样任务描述和示例的能力；可以先让模型创造监督数据，再用这些数据反过来训练模型遵循指令。

```python
# Self-Instruct 核心伪代码
seed_tasks = load_175_human_written_tasks()
task_pool = list(seed_tasks)
generated_tasks = []

while not enough_instruction_data(task_pool):
    exemplars = sample(seed_tasks, k=6) + sample(generated_tasks, k=2)
    new_instructions = lm_generate_instructions(exemplars)

    for instruction in new_instructions:
        if max_rouge_l(instruction, task_pool) >= 0.7:
            continue
        if contains_unservable_keywords(instruction, ["image", "picture", "graph"]):
            continue

        is_classification = lm_classify_task_type(instruction)

        if is_classification:
            labels = lm_generate_labels(instruction)
            instances = []
            for label in labels:
                x = lm_generate_input_conditioned_on_label(instruction, label)
                instances.append((instruction, x, label))
        else:
            x = lm_generate_input(instruction)
            y = lm_generate_output(instruction, x)
            instances = [(instruction, x, y)]

        instances = filter_invalid_or_duplicate_instances(instances)
        if instances:
            task_pool.append((instruction, instances))
            generated_tasks.append((instruction, instances))

finetune_examples = format_with_multiple_templates(task_pool)
model = supervised_finetune(original_lm, finetune_examples)
```

论文把 instruction data 形式化为一组任务 \(T\)。每个任务由自然语言指令 \(I\) 定义，并带有若干输入输出实例 \((x_j, y_j)\)。微调时将指令和输入拼成 prompt，让模型生成目标输出：

$$
\mathcal{L}_{\text{SI}}(\theta)
= - \sum_{(I,x,y)\sim \mathcal{D}_{\text{self}}}
\log p_\theta(y \mid \text{format}(I,x))
$$

这里 \(\mathcal{D}_{\text{self}}\) 不是人工完整标注数据，而是通过模型自举得到的合成集合。为了提高格式鲁棒性，论文没有固定一种拼接方式，而是随机使用多种模板：可以带或不带 `Task:`、`Input:`、`Output:` 前缀，也可以调整换行数量。这个细节对应真实使用场景：用户不会总按同一种模板下指令，所以训练时也不应把模型绑定到单一格式。

最有设计感的是实例生成阶段区分分类与非分类任务。对于非分类任务，input-first 很自然：先让模型构造输入，再让模型解这个输入。比如“写一封道歉邮件”可以先生成收件场景，再生成邮件正文。但分类任务若也 input-first，模型容易生成偏向某一标签的输入，例如语法纠错任务总生成正确句子，情感分类任务总生成明显正面文本。output-first 先列出标签，再按每个标签反推输入，使类别覆盖更平衡，也让生成数据对分类边界更有监督价值。

> 💡 关键：Self-Instruct 不是简单“让模型多生成点文本”，而是把任务创建拆成 instruction generation、task type identification、instance generation、filtering 四个可控阶段，每一阶段都针对合成数据常见失败模式设置约束。

过滤阶段决定了合成数据能否用于训练。ROUGE-L < 0.7 的阈值用于避免新指令和已有任务过于相似；关键词过滤排除需要视觉、图表等纯文本 LM 无法可靠处理的任务；实例级过滤去掉完全重复样本、同一输入对应多个冲突输出的样本、输出只是重复输入的样本，以及长度异常样本。这些规则看似朴素，但它们把自举过程从“递归污染”拉回到可用范围：即使单条生成不完美，只要整体数据格式正确、任务多样、错误不过度集中，监督微调仍能学到指令遵循模式。

在 GPT-3 实验中，Self-Instruct 从 175 个 seed tasks 扩展到 52,445 条指令和 82,439 个实例。人工质量检查显示，指令有效率较高，但实例输出完全正确的比例明显低于指令有效率，说明合成数据有噪声。论文的结果有一个重要启示：指令微调并不要求每条数据都像人工标注一样完美；只要数据足够多样，并且大部分样本提供了合理的“指令-输入-输出”结构，模型就能显著提升对新指令的响应能力。

与传统 self-training 相比，Self-Instruct 的不同之处在于它不是给某个固定任务的无标签样本打伪标签，而是从零生成任务定义本身。它也不同于 FLAN：FLAN 主要重写已有 benchmark，Self-Instruct 让模型创造新任务，因此更可能覆盖用户导向、非标准 NLP 的指令空间。它与 InstructGPT 的关系则是互补的：Self-Instruct 降低了获取大规模指令监督的成本，而 InstructGPT 通过人类偏好进一步优化回答质量；论文也指出后续可以用更强模型或人工/RM 对 Self-Instruct 输出做质量提升。

Self-Instruct 的主要风险是自举偏差。生成任务来自模型自身，因此会继承模型的知识盲区、格式偏好和安全问题；过滤规则多为启发式，难以保证 factual correctness；如果迭代过深且缺少外部质量信号，任务池可能逐渐被低质量模式污染。尽管如此，它给后续 Alpaca、synthetic instruction tuning 等工作提供了清晰范式：少量人工种子 + 大模型生成 + 自动过滤 + SFT，可以快速构造可用的指令跟随数据。

#### 🧪 练习题
```yaml
question: "Self-Instruct 为什么对分类任务采用 output-first 实例生成？"
options:
  - "为了先生成标签，再按标签生成输入，从而减少类别分布偏斜"
  - "为了完全跳过输入生成，只训练模型输出空字符串"
  - "为了让 ROUGE-L 分数必然大于 0.7"
  - "为了把所有非分类任务都转换成图像识别任务"
answer: 0
explain: "分类任务若先生成输入，模型容易偏向某个常见标签；output-first 先枚举类别并按类别构造输入，有助于形成更均衡的监督样本。"
```

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
Adapter 在冻结预训练 Transformer 主干的前提下，为每个下游任务插入小型瓶颈模块，解决了多任务/多客户场景中“每个任务都保存一整份微调模型”的参数浪费问题。

#### 🎯 核心要点
- 在每个 Transformer 层中插入两个 Adapter：一个位于多头注意力投影之后，一个位于前馈网络投影之后。
- Adapter 使用瓶颈结构：先将隐藏维度从 \(d\) 降到 \(m\)，经过非线性激活后再升回 \(d\)。
- 原始预训练网络参数保持冻结；每个任务只训练 Adapter、LayerNorm 参数和最终分类头。
- Adapter 内部带残差连接，并采用近似恒等初始化，使新模块在训练初期尽量不破坏预训练表示。
- 每个 Adapter 的参数量为 \(2md+d+m\)，通过设置 \(m \ll d\) 将每任务新增参数控制在很小范围。
- 论文在 BERT 上验证了 26 个文本任务；在 GLUE 上接近全量微调性能，仅增加约 3.6% 每任务参数，而全量微调需要训练 100% 参数。

#### 🔬 深入细节
![Adapter 在 Transformer 中的插入位置](https://ar5iv.labs.arxiv.org/html/1902.00751/assets/x2.png)
![Adapter 瓶颈模块结构](https://ar5iv.labs.arxiv.org/html/1902.00751/assets/x3.png)
*图：论文 Figure 2 的两个面板。左图展示 Adapter 被插入到 Transformer 子层之后；右图展示降维、非线性、升维和内部残差组成的瓶颈模块。*

Adapter 的核心动机是把“任务特定能力”和“通用预训练能力”分离。标准 fine-tuning 会为每个任务复制并更新整个 BERT，这在任务数量增加时线性增加存储和部署成本；Adapter 则把 BERT 主干当成共享基础设施，只为每个任务追加一组小模块。这样新增任务不需要重新访问旧任务数据，也不会覆盖旧任务参数，适合云服务、多租户或持续加入任务的场景。

在 Transformer 层内，论文不是只在顶层加一个小头，而是让任务特定参数能够影响每一层的中间激活。设某个子层输出为 \(s\)，Adapter 近似可写成：

$$
A(s)=s+W_{\text{up}} f(W_{\text{down}}s+b_{\text{down}})+b_{\text{up}},
$$

其中 \(W_{\text{down}}\in\mathbb{R}^{m\times d}\)，\(W_{\text{up}}\in\mathbb{R}^{d\times m}\)，\(m\) 是瓶颈维度。内部残差项 \(s+\cdots\) 很关键：如果升维/降维投影初始化接近零，Adapter 初始时接近恒等函数，原始 BERT 的表示分布不会被突然扰动，训练更稳定。

在论文采用的集成方式中，Adapter 放在每个子层投影之后、加外部 residual 和 LayerNorm 之前。用简化符号表示，一个 Transformer block 可以写成：

$$
u = \mathrm{LayerNorm}(h + A_{\text{attn}}(\mathrm{MHA}(h))),
$$

$$
h' = \mathrm{LayerNorm}(u + A_{\text{ffn}}(\mathrm{FFN}(u))).
$$

这里 \(\mathrm{MHA}\)、\(\mathrm{FFN}\) 和主干中的大部分权重被冻结，只有 \(A_{\text{attn}}\)、\(A_{\text{ffn}}\)、LayerNorm 的缩放/偏置以及任务头被更新。LayerNorm 参数单独训练虽然也很省参数，但论文发现仅调 LayerNorm 表达能力不足；Adapter 提供了更强的任务特定非线性变换。

参数效率来自瓶颈层。一个 Adapter 的参数量包括降维矩阵、升维矩阵和两个 bias：

$$
\#\theta_{\text{adapter}} = md + dm + m + d = 2md + d + m.
$$

当 \(m\ll d\) 时，新增参数相对原始 Transformer 的注意力和前馈层很小。论文将 Adapter size 作为主要超参，使用约 0.5% 到 8% 的原模型参数即可覆盖性能/存储折中。直觉上，较小的 \(m\) 相当于限制任务更新只能经过低秩瓶颈，避免为每个任务重写完整表示空间。

训练流程可以概括为：冻结预训练 BERT，随机初始化每个任务的 Adapter 和头部，随后只在这些任务参数上反向传播。伪代码如下：

```python
# Adapter tuning for one downstream task
bert = load_pretrained_bert()
freeze(bert.backbone_weights)

for layer in bert.transformer_layers:
    layer.attn_adapter = BottleneckAdapter(d_hidden=d, bottleneck=m)
    layer.ffn_adapter = BottleneckAdapter(d_hidden=d, bottleneck=m)
    layer.layer_norm_params.requires_grad = True

classifier = TaskHead(d, num_labels)
trainable = adapters + layer_norm_params + classifier.parameters()

for batch in downstream_data:
    h = bert.embeddings(batch.input_ids)
    for layer in bert.transformer_layers:
        attn_out = layer.self_attention(h)          # frozen weights
        h = layer.norm1(h + layer.attn_adapter(attn_out))
        ffn_out = layer.feed_forward(h)             # frozen weights
        h = layer.norm2(h + layer.ffn_adapter(ffn_out))
    logits = classifier(h[:, 0])
    loss = cross_entropy(logits, batch.labels)
    update(trainable, loss)
```

与传统 fine-tuning 相比，Adapter 的行为更像“给冻结网络增加可插拔的任务补丁”。全量微调直接改动原模型参数，任务之间互不兼容；Adapter 保留共享主干，同一输入可以通过不同任务 Adapter 得到不同决策。与只微调顶层相比，Adapter 的优势是它分布在所有层，能逐层调整表示，但每次调整又受瓶颈限制，不会像全量微调那样产生大规模任务副本。

> 💡 关键：Adapter 不是简单地“少训练一些层”，而是把任务更新重新参数化为许多小型残差瓶颈模块；它用结构约束换取参数效率和模块化部署能力。

#### 🧪 练习题
```yaml
question: "Adapter 采用瓶颈结构的主要目的是什么？"
options:
  - "让每个任务只新增少量可训练参数，同时仍能在各层调整表示"
  - "让模型在推理时跳过 Transformer 的注意力计算"
  - "将 BERT 的词表替换为任务专用词表"
  - "避免使用 LayerNorm，因为 LayerNorm 会破坏迁移学习"
answer: 0
explain: "瓶颈维度 m 远小于隐藏维度 d，使每层 Adapter 的参数量约为 2md+d+m；它保留逐层调节能力，但避免为每个任务复制完整模型。"
```

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
Prefix-Tuning 冻结预训练语言模型，只学习一段连续的任务前缀向量，让后续 token 像关注“虚拟 token”一样关注该前缀，从而以极少参数完成生成任务适配。

#### 🎯 核心要点
- 将任务特定信息表示为连续 prefix，而不是离散人工 prompt 或完整模型权重更新。
- 冻结 GPT-2/BART 等预训练模型参数 \(\phi\)，只优化前缀矩阵 \(P_\theta\)。
- 对自回归 LM，prefix 被放在输入序列之前；对 encoder-decoder 模型，prefix 可分别作用于 encoder 和 decoder。
- prefix 不是普通词嵌入，而是每层 Transformer 可访问的激活/键值式连续参数，后续 token 可通过注意力读取它。
- 训练时使用 MLP 对前缀重参数化以稳定优化，训练结束后丢弃 MLP，只保存最终 prefix。
- 在表格到文本和摘要任务上，约 0.1% 参数即可接近全量微调；低数据和外推场景中通常优于 fine-tuning。

#### 🔬 深入细节
![Prefix-Tuning 与 Fine-Tuning 对比](https://ar5iv.labs.arxiv.org/html/2101.00190/assets/x1.png)
![Prefix-Tuning 在自回归和编码器-解码器模型中的示意](https://ar5iv.labs.arxiv.org/html/2101.00190/assets/x2.png)
*图：论文 Figure 1 展示 fine-tuning 需要为每个任务保存整份模型，而 prefix-tuning 只保存任务 prefix；Figure 2 展示 prefix 激活如何接入自回归 LM 和 encoder-decoder 架构。*

Prefix-Tuning 的出发点是：生成式模型已经在预训练中学到丰富语言能力，下游任务并不一定需要修改所有权重；真正需要的是一个能“引导”模型行为的任务条件。离散 prompt 可以做到这一点，但人工设计不稳定、表达能力受词表限制；Prefix-Tuning 把 prompt 放到连续空间中学习，使它既像 prompt 一样作为条件，又能通过梯度吸收完整训练集信号。

设输入为 \(x\)，输出序列为 \(y\)，预训练模型参数为 \(\phi\)。标准 fine-tuning 优化 \(\phi\)，而 Prefix-Tuning 固定 \(\phi\)，只优化 \(\theta\)：

$$
\theta^* = \arg\max_\theta \sum_{(x,y)} \log p_\phi(y \mid x; P_\theta).
$$

这里 \(P_\theta\) 是任务前缀，不对应真实词表 token。它的作用不是直接输出答案，而是改变后续 token 的注意力上下文：后续位置在计算 hidden state 时能 attend 到 prefix，就像序列前面真的存在一串“虚拟示例/指令”。

论文给出的形式化递推可以简化为：

$$
h_i =
\begin{cases}
P_\theta[i,:], & i \in \mathsf{P}_{\text{idx}}, \\
\mathrm{LM}_\phi(z_i, h_{<i}), & \text{otherwise}.
\end{cases}
$$

其中 \(\mathsf{P}_{\text{idx}}\) 表示 prefix 的位置集合，\(z\) 是由 prefix、输入和输出拼接而成的序列。对于自回归模型，可理解为 \(z=[\textsc{Prefix};x;y]\)；对于 encoder-decoder 模型，论文使用类似 \(z=[\textsc{Prefix};x;\textsc{Prefix}^{\prime};y]\) 的形式，使 encoder 侧和 decoder 侧都获得任务条件。

直接优化完整 \(P_\theta\) 在实验中对学习率和初始化敏感，因此论文使用重参数化：

$$
P_\theta[i,:] = \mathrm{MLP}_\theta(P'_\theta[i,:]).
$$

训练时优化较小的 \(P'_\theta\) 和 MLP 参数，通过 MLP 映射到实际 prefix 激活维度；训练完成后，只保存展开后的 \(P_\theta\)，丢弃 MLP。这个设计的直觉类似用一个平滑的生成器约束 prefix 空间，避免早期随机 prefix 直接扰乱深层注意力状态。

核心训练伪代码如下：

```python
# Prefix-Tuning for conditional generation
lm = load_pretrained_lm()        # GPT-2 for table-to-text, BART for summarization
freeze(lm.parameters())

P_prime = init_prefix(length=L, dim=k)
mlp = PrefixMLP(input_dim=k, output_dim=lm_hidden_or_kv_dim)

for batch in train_data:
    P = mlp(P_prime)             # produce prefix activations for all layers/positions
    loss = 0.0
    for x, y in batch:
        states = inject_prefix(lm, x, P)
        loss += negative_log_likelihood(lm, y, states)
    update([P_prime, mlp.parameters()], loss)

P_final = mlp(P_prime)
save(P_final)                   # discard reparameterization MLP for inference
```

与 Adapter 相比，Prefix-Tuning 更少触碰模型内部结构。Adapter 在每层插入新的残差模块，直接改变激活；Prefix-Tuning 保持 Transformer 层不变，只在注意力上下文中提供可学习前缀，让原模型利用已有注意力机制自行传播任务信息。因此它通常比 Adapter 更省参数，也更容易为不同用户或任务并行切换：同一个冻结 LM 加载不同 prefix 即可服务不同任务。

与全量 fine-tuning 相比，Prefix-Tuning 的归纳偏置更强。它不能任意改写模型权重，只能通过前缀调节生成轨迹，这限制了过拟合，也解释了论文中低数据和未见主题外推表现较好的现象。代价是 prefix 的位置、长度、初始化和重参数化会影响效果；如果任务需要深度改变模型知识或输出空间，单纯 prefix 可能不如全量微调灵活。

> 💡 关键：Prefix-Tuning 学的不是自然语言提示词，而是一组可被 Transformer 注意力读取的连续控制向量；它把“任务适配”转化为“学习如何条件化冻结语言模型”。

#### 🧪 练习题
```yaml
question: "Prefix-Tuning 训练完成后通常只需要保存什么？"
options:
  - "完整微调后的语言模型参数"
  - "最终 prefix 参数 P_theta，而不是训练时使用的重参数化 MLP"
  - "人工编写的离散 prompt 文本"
  - "每个训练样本对应的一套独立 prefix"
answer: 1
explain: "论文使用 MLP 重参数化来稳定训练，但推理时只保留生成后的 prefix；预训练 LM 参数始终冻结并在任务间共享。"
```

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
Prompt Tuning 将下游任务适配简化为只学习输入端的软提示向量，在冻结 T5 主模型的情况下，通过模型规模提升逐渐逼近全量模型微调性能。

#### 🎯 核心要点
- 冻结整个预训练 T5，只在输入前拼接 \(k\) 个可训练 soft prompt token。
- soft prompt 不是离散词 ID，而是独立的连续嵌入参数 \(\theta_P\)，可通过反向传播学习。
- 所有任务按照 T5 的 text-to-text 框架处理，分类标签也被建模为要生成的文本序列 \(Y\)。
- 条件概率从 \(\Pr_\theta(Y|X)\) 变为 \(\Pr_{\theta;\theta_P}(Y|[P;X])\)，但 \(\theta\) 保持冻结。
- 相比 Prefix-Tuning，不在每层维护 prefix 激活，也不需要任务专用输出层，参数量更低。
- 论文显示 Prompt Tuning 随模型规模变强；在十亿级以上 T5 上缩小与 model tuning 的差距，并支持 prompt ensembling 与更好的域外鲁棒性。

#### 🔬 深入细节
![Prompt Tuning 随模型规模逼近 Model Tuning](https://ar5iv.labs.arxiv.org/html/2104.08691/assets/x1.png)
![Prompt Tuning 与 Model Tuning 的服务方式对比](https://ar5iv.labs.arxiv.org/html/2104.08691/assets/x2.png)
*图：论文 Figure 1 展示 prompt tuning 在大模型上接近 model tuning；Figure 2 展示 prompt tuning 只需为每个任务保存小型 prompt，可复用同一个冻结 T5。*

Prompt Tuning 的关键判断是：当语言模型足够大时，模型内部已经具备完成任务所需的大部分能力，下游训练更像是在寻找一个合适的条件入口，而不是重写模型参数。人工 prompt design 依赖离散词和人工试错，few-shot prompt 又受上下文长度限制；Prompt Tuning 让 prompt 变成可学习嵌入，既保留冻结模型的部署优势，又能利用完整标注数据学习任务条件。

在 T5 的 text-to-text 框架下，输入是一串 token \(X\)，输出标签或答案被表示为 token 序列 \(Y\)。没有 soft prompt 时，模型计算：

$$
\Pr_\theta(Y \mid X).
$$

Prompt Tuning 在输入前拼接一段 prompt \(P=\{p_1,p_2,\ldots,p_k\}\)，但这些 \(p_i\) 的表示不再来自冻结词表，而是单独可训练的 \(\theta_P\)。新的条件生成目标为：

$$
\Pr_{\theta;\theta_P}(Y \mid [P;X]), \quad \theta \text{ frozen}.
$$

训练时只更新 \(\theta_P\)。若 T5 隐藏维度为 \(d\)、prompt 长度为 \(k\)，每个任务新增参数约为 \(k\times d\)。论文 Figure 2 举例说明，T5-XXL 全量任务副本需要 110 亿参数，而 prompt 长度为 5 时每任务只需 20,480 个 prompt 参数，参数差距达到五个数量级以上。更常用的实验默认配置包含 LM adaptation、prompt length 100 和 class-label 初始化。

核心训练伪代码如下：

```python
# Prompt Tuning on frozen T5
model = load_pretrained_t5()
freeze(model.parameters())

soft_prompt = Parameter(shape=(prompt_length, model.d_model))
optimizer = Adafactor([soft_prompt])

for batch in train_data:
    x_embed = model.embed(batch.input_ids)
    prompt = soft_prompt.expand(batch_size=len(batch))
    encoder_input = concat(prompt, x_embed, dim="sequence")
    logits = model.generate_logits_from_embeddings(
        encoder_input=encoder_input,
        decoder_labels=batch.target_ids,
    )
    loss = sequence_cross_entropy(logits, batch.target_ids)
    update([soft_prompt], loss)

save(soft_prompt)               # one small tensor per task
```

Prompt Tuning 与 Prefix-Tuning 的差别在于“控制信号进入模型的位置”。Prefix-Tuning 学习每层可用的 prefix 激活，通常需要为多层 key/value 或 hidden state 准备前缀；Prompt Tuning 只在输入嵌入层前拼接一段软向量，让冻结 Transformer 自己把这段条件向上传播。因此 Prompt Tuning 的参数量更低、实现更简单，但它更依赖模型本身的规模和预训练适配性。

论文中特别强调 scale：小模型中，只训练 prompt 往往难以追上全量微调，因为冻结模型容量不足以把少量输入向量解释成复杂任务行为；随着 T5 参数规模增大，模型更会“听 prompt”，prompt tuning 与 model tuning 的差距逐渐消失。这个结论解释了为什么 Prompt Tuning 在大模型时代比在小模型时代更有吸引力。

另一个实践细节是 LM adaptation。T5 原始 span corruption 预训练目标与后续条件生成/分类标签生成存在不匹配，论文发现对 T5.1.1 做额外语言模型目标适配能提高 prompt tuning 的稳定性。直觉上，冻结模型无法通过下游训练修正自身目标偏差，所以必须确保冻结模型已经适合被 prompt 条件化；否则 soft prompt 可能学到的是绕开预训练目标的“补丁”，而不是清晰的任务描述。

Prompt Tuning 还天然支持 prompt ensembling。传统模型集成要保存并运行多份大模型；Prompt Tuning 可以在同一个冻结 T5 上加载多个 soft prompt，对同一输入做多次条件化，再投票或平均输出。这样集成成本主要来自多个小 prompt，而不是多个模型副本，适合服务端多任务和多版本部署。

> 💡 关键：Prompt Tuning 的最小化假设是“任务知识可以压缩到输入嵌入前缀中”；当模型足够大且足够会遵循条件时，这个假设可以接近全量微调效果。

#### 🧪 练习题
```yaml
question: "Prompt Tuning 与 Prefix-Tuning 的一个核心区别是什么？"
options:
  - "Prompt Tuning 只学习输入端 soft prompt，而 Prefix-Tuning 通常学习多层 prefix 激活"
  - "Prompt Tuning 会更新全部 T5 参数，而 Prefix-Tuning 不更新任何参数"
  - "Prompt Tuning 只能使用人工离散词，不能通过反向传播优化"
  - "Prompt Tuning 必须为每个任务保存一整份模型副本"
answer: 0
explain: "Prompt Tuning 把可训练参数限制在输入嵌入前缀；Prefix-Tuning 的控制信号通常进入每层激活/注意力缓存，因此参数和结构更复杂。"
```

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
P-Tuning 提出用可训练的连续提示向量与离散模板拼接，解决人工离散 Prompt 对措辞高度敏感、离散搜索难以直接利用梯度的问题。它把 Prompt 选择从离散 token 搜索转成连续参数优化，并用轻量 Prompt Encoder 建模提示向量之间的依赖。

#### 🎯 核心要点
- 将离散 Prompt 中的部分位置替换或拼接为连续提示向量 `[P]`，由反向传播直接学习。
- 使用 Prompt Encoder 将可训练提示参数映射到输入 embedding，论文实验了 LSTM、MLP 和直接 embedding 三类实现。
- 连续提示可以和原始离散模板同时使用，离散模板提供语义锚点，连续向量提供可优化的任务适配空间。
- 支持两种设置：冻结语言模型只训练提示，或在 SuperGLUE 等任务上联合微调语言模型和提示。
- 在 LAMA 知识探测和 SuperGLUE NLU 上验证，重点展示了对人工 Prompt 方差的稳定化以及对 AutoPrompt、PET 等离散提示方法的性能提升。
- 作为 PEFT 早期代表，它仍主要作用在输入层，提示容量受序列长度约束，这也是 P-Tuning v2 后续引入深层提示的直接原因。

#### 🔬 深入细节
![P-Tuning 连续提示优化示意图](https://ar5iv.labs.arxiv.org/html/2103.10385/assets/x2.png)
*图：论文 Figure 2 对比了离散 Prompt 搜索与 P-Tuning。离散搜索只能根据最终 reward 改 token，连续提示和 Prompt Encoder 则可以通过任务损失端到端优化。*

P-Tuning 的动机来自一个很具体的问题：人工离散 Prompt 在预训练语言模型上并不稳定。同一个知识探测问题，只要把模板中的一个词换掉，LAMA 上的 Precision@1 就可能大幅波动。AutoPrompt 一类方法尝试搜索更好的离散 token，但搜索空间仍是离散的，优化信号无法像普通神经网络参数那样顺畅地反传到每个候选 token。P-Tuning 的核心转折是把 Prompt 的一部分从词表 token 放宽为连续向量，让提示本身成为可微参数。

形式上，给定输入文本 \(x\)、标签 \(y\)、预训练语言模型 \(M_\theta\) 和一组连续提示参数 \(P = \{p_1, \ldots, p_m\}\)，P-Tuning 不再只构造硬模板，例如 `The capital of [X] is [MASK]`，而是在模板中插入若干 `[P]` 槽位。每个槽位通过 Prompt Encoder \(g_\phi\) 映射到语言模型可接受的 embedding：

$$
h_i = g_\phi(p_i), \quad \tilde{x} = [h_1, \ldots, h_a, e(x), h_{a+1}, \ldots, h_m, e(\text{[MASK]})]
$$

其中 \(e(\cdot)\) 是预训练模型原本的词嵌入层，\(h_i\) 是连续提示向量。训练目标仍然是任务条件概率或分类交叉熵，例如在 masked LM 形式下最大化正确 verbalizer token 的概率：

$$
\max_{P,\phi} \sum_{(x,y)\in\mathcal{D}} \log p_{M_\theta}\big(v(y) \mid \tilde{x}; P, \phi\big)
$$

这里 \(v(y)\) 是标签对应的 verbalizer token。若语言模型冻结，则只更新 \(P\) 和 \(\phi\)；若采用联合微调，则 \(\theta\) 也参与更新。

Prompt Encoder 是这篇论文区别于简单 soft prompt 的关键实现细节。直接把每个 `[P]` 当作独立 embedding 会让提示槽位彼此缺少结构约束，尤其当提示被插入到句子中间时，多个提示向量之间的顺序关系很重要。论文尝试用 LSTM 或 MLP 作为 \(g_\phi\)，让一串连续提示先经过轻量网络再送入 PLM。直觉上，这相当于让 Prompt 不只是若干孤立参数，而是一段可学习的“隐式句子”。实验里 LSTM 和 MLP 通常比直接优化 embedding 更稳定，说明 Prompt Encoder 的结构偏置确实能缓解连续提示的优化难度。

P-Tuning 不是完全抛弃离散 Prompt，而是经常把连续提示与人工模板拼接使用。这个选择很务实：离散模板保留任务语义，比如“capital of”暗示知识关系；连续向量则负责补偿模板措辞带来的不稳定性，并在训练集中学习更适合当前模型的隐藏提示。对 LAMA 这类知识探测任务，模型可以冻结，只训练连续提示来读取预训练模型中已有的事实知识；对 SuperGLUE 这类下游 NLU，论文也允许连续提示与模型参数一起微调，使提示成为任务输入重写的一部分。

与 Prefix Tuning 相比，P-Tuning v1 更关注 NLU 和知识探测中的输入模板稳定性，而不是在生成模型每一层注入前缀状态。它的优点是实现简单、参数少、和 BERT/GPT 等不同 PLM 兼容；局限也很明确：连续提示主要插入输入层，因此提示对深层表示的影响是间接的，容量也受最大输入长度限制。这个局限解释了为什么后来的 P-Tuning v2 会把连续提示扩展到 Transformer 的每一层。

```python
# P-Tuning 核心训练逻辑
initialize prompt_slots P = [p_1, ..., p_m]
initialize prompt_encoder g_phi  # LSTM, MLP, or identity

for batch in dataset:
    x, y = batch
    hard_template = build_discrete_template(x)          # e.g. "The capital of [X] is [MASK]"
    soft_prompt = g_phi(P)                              # continuous prompt embeddings
    input_embeds = insert_soft_prompt(hard_template, soft_prompt)

    logits = pretrained_lm(input_embeds)
    target = verbalizer(y)                              # label word or task target
    loss = cross_entropy(logits_at_mask_or_head(logits), target)

    # Frozen setting: update only P and g_phi.
    # Finetuning setting: update P, g_phi, and optionally LM parameters.
    loss.backward()
    optimizer.step()
```

> 💡 关键：P-Tuning 的“连续”并不是让输出标签连续化，而是让输入侧的提示槽位连续化。这样 Prompt 可以像普通神经网络参数一样被梯度优化，同时仍可借助离散模板表达任务语义。

#### 🧪 练习题
```yaml
question: "P-Tuning 相比人工离散 Prompt 的核心优势是什么？"
options:
  - "把所有语言模型参数都压缩成低秩矩阵"
  - "把提示的一部分变成可训练连续向量，从而能用反向传播优化并降低模板措辞敏感性"
  - "在推理阶段搜索所有可能的离散模板"
  - "完全取消 verbalizer 并只使用分类头"
answer: 1
explain: "P-Tuning 的关键是连续提示向量和 Prompt Encoder，优化对象从离散 token 选择变成可微参数，因此能缓解人工模板不稳定问题。"
```

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
P-Tuning v2 将连续提示从输入 embedding 层扩展到 Transformer 的每一层，解决早期 prompt tuning 在中小模型和序列标注任务上不够通用的问题。它用很少的任务特定参数接近全量微调，并把 prompt tuning 改造成适用于分类、抽取式问答、NER、SRL 等 NLU 任务的通用基线。

#### 🎯 核心要点
- 采用 Deep Prompt Tuning：在不同 Transformer 层加入可训练连续提示，而不是只在输入层前拼接 soft prompt。
- 冻结预训练语言模型主体，只训练每层 prompt、可选重参数化模块和任务头，任务特定参数约为全量参数的 0.1%-3%。
- 解决两个普适性缺口：小于 10B 的常用模型上 prompt tuning 表现不足，以及抽取式 QA、NER、SRL 等序列标注任务难以使用 verbalizer。
- 将 prompt 作为 prefix token 注入层内表示，使深层 prompt 对最终预测有更直接影响，并提升提示容量。
- 关键实现细节包括 prompt length 选择、按任务决定是否使用 MLP 重参数化、多任务初始化、使用分类头替代 verbalizer。
- 论文在 SuperGLUE、NER、抽取式 QA、语义角色标注等任务上验证，覆盖 BERT-large、RoBERTa-large、DeBERTa-xlarge、GLM 2B/10B 等规模。

#### 🔬 深入细节
![P-Tuning v2 深层提示结构图](https://ar5iv.labs.arxiv.org/html/2110.07602/assets/x2.png)
*图：论文 Figure 2 展示了从输入层 Prompt Tuning 到 P-Tuning v2 的变化。橙色块是可训练 prompt embedding，蓝色块是冻结预训练模型产生或存储的表示。*

P-Tuning v2 的问题意识比 P-Tuning v1 更明确：早期 prompt tuning 虽然省参数，但并没有真正替代 fine-tuning。第一，Lester 等工作观察到 prompt tuning 往往要在 10B 以上模型才接近全量微调，而大量实际部署仍使用 100M 到 1B 级别模型。第二，传统 prompt tuning 依赖 `[MASK]` 或 verbalizer，把分类标签映射成词表 token；这种范式适合句级分类，却很难自然处理每个 token 都要预测标签的 NER、抽取式 QA、语义角色标注等任务。

P-Tuning v2 的核心机制是“深层提示”。如果只在输入层插入 \(m\) 个 soft prompt，提示对后续预测的影响需要穿过所有 Transformer 层，容量也受输入长度限制。P-Tuning v2 在每一层 \(l\) 放置独立的连续提示 \(P^{(l)}\)，并把它们作为 prefix token 参与该层计算。用注意力的键值表示可以写成：

$$
\tilde{K}^{(l)} = [P_K^{(l)}; K^{(l)}], \quad
\tilde{V}^{(l)} = [P_V^{(l)}; V^{(l)}]
$$

$$
\text{Attn}^{(l)}(Q, K, V) = \text{softmax}\left(\frac{Q(\tilde{K}^{(l)})^\top}{\sqrt{d}}\right)\tilde{V}^{(l)}
$$

这里 \([\cdot;\cdot]\) 表示沿序列维拼接。预训练权重保持冻结，梯度只更新每层的 \(P_K^{(l)}, P_V^{(l)}\) 以及任务头。因为 prompt 被放到更靠近输出的层，模型不需要完全依赖输入层的间接传播，深层表示可以更直接地被任务参数调节。

论文特别强调 P-Tuning v2 的贡献不只是“多加 prompt”，而是把 prompt tuning 适配到 NLU 的一整套工程选择。重参数化方面，早期方法常用 MLP 把低维提示参数映射到真正的层内提示，但论文发现 MLP 的收益依任务而定：RTE、CoNLL04 这类数据上有帮助，BoolQ、CoNLL12 上可能收益很小甚至负面。Prompt length 也不是越长越好：简单分类任务通常偏好短 prompt，困难序列标注任务往往需要更长 prompt。多任务学习不是必需组件，但可以先在多个任务上学习共享提示初始化，再为单任务调优。

另一个关键改动是分类头。P-Tuning v1 和许多 prompt 方法使用 verbalizer，把标签映射到自然语言词，例如 positive/negative 或 yes/no。P-Tuning v2 认为在 full-data NLU 设置里 verbalizer 不是必要条件，而且在序列标注上不兼容。因此它可以像 BERT fine-tuning 一样在 token 或句子表示上接随机初始化分类头。这个选择降低了 prompt 方法的形式约束，让同一套深层 prompt 机制能覆盖句级分类、token 分类和 span 预测。

从训练流程看，P-Tuning v2 与全量微调的最大差别是参数更新范围。输入文本仍经过冻结的 embedding 和 Transformer 主体；每层 attention 或 hidden state 计算时额外读入任务特定 prompt；最后由任务头输出标签。优化目标仍是标准监督损失：

$$
\min_{\Theta_P,\Theta_h}\sum_{(x,y)\in\mathcal{D}} \mathcal{L}\big(h_{\Theta_h}(F_{\theta,\Theta_P}(x)), y\big), \quad \theta \text{ frozen}
$$

其中 \(\Theta_P\) 是所有层的 prompt 参数，\(\Theta_h\) 是任务头，\(\theta\) 是冻结的预训练模型。这样每个任务只需要保存 prompt 和 head，而不是复制整套模型权重。

与 P-Tuning v1 相比，v2 的本质变化是从“输入重写”变成“层内控制”。v1 适合用连续向量修补离散模板的不稳定性，但容量有限；v2 则把提示分布到网络深层，允许任务信息在不同抽象层级介入。与全量微调相比，它牺牲了一部分可调自由度，但显著减少训练显存、存储和多任务部署成本；与 adapter 相比，它不一定增加完整的前馈模块，而是通过 prefix/prompt 状态调节注意力或层表示。

```python
# P-Tuning v2 简化伪代码
freeze(pretrained_transformer)
initialize layer_prompts = {layer: (P_key[layer], P_value[layer]) for layer in layers}
initialize task_head

for batch in dataset:
    x, y = batch
    hidden = embedding_layer(x)

    for layer in pretrained_transformer.layers:
        Q, K, V = layer.project_attention(hidden)
        K_tilde = concat(layer_prompts[layer].P_key, K, dim="sequence")
        V_tilde = concat(layer_prompts[layer].P_value, V, dim="sequence")
        hidden = layer.forward_with_prefixed_kv(Q, K_tilde, V_tilde, hidden)

    logits = task_head(hidden)  # sentence-level or token-level
    loss = task_loss(logits, y)
    loss.backward()

    # update prompts and task_head only; backbone remains frozen
    optimizer.step()
```

> ⚠️ 注意：P-Tuning v2 的“v2”不是简单增加 Prompt 长度，而是改变 Prompt 注入位置。每层 prompt 让任务参数直接作用于深层表示，这是它能覆盖中小模型和 hard sequence labeling 的主要原因。

#### 🧪 练习题
```yaml
question: "P-Tuning v2 为什么比输入层 Prompt Tuning 更适合序列标注和中小规模模型？"
options:
  - "它把所有模型权重都解冻，因此表达能力等同全量微调"
  - "它在每个 Transformer 层加入连续提示，提高任务容量并让提示更直接影响深层表示"
  - "它只使用人工离散模板，因此不需要训练数据"
  - "它通过低秩矩阵合并权重，完全不需要额外序列位置"
answer: 1
explain: "P-Tuning v2 的核心是 deep prompt tuning：每层都有可训练 prompt，容量和作用路径都强于只在输入层拼接 soft prompt。"
```

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
LoRA 提出冻结预训练权重，只训练权重增量的低秩分解矩阵，解决全量微调在大模型上训练显存、任务存储和部署切换成本过高的问题。由于低秩增量可以在推理前合并回原权重，LoRA 相比传统 adapter 不引入额外推理延迟。

#### 🎯 核心要点
- 对预训练权重 \(W_0\) 保持冻结，把任务更新 \(\Delta W\) 约束为低秩分解 \(BA\)。
- 只训练两个小矩阵 \(A\in\mathbb{R}^{r\times k}\) 和 \(B\in\mathbb{R}^{d\times r}\)，其中 \(r\ll\min(d,k)\)。
- 前向计算为 \(h = W_0x + \frac{\alpha}{r}BAx\)，训练结束可合并为 \(W'=W_0 + \frac{\alpha}{r}BA\)。
- 初始化采用 \(A\) 随机高斯、\(B\) 为零，使训练开始时 \(\Delta W=0\)，模型初始行为与原始预训练模型一致。
- 论文主要在 Transformer attention 的 \(W_q\) 和 \(W_v\) 上注入 LoRA，实验也讨论不同矩阵选择和 rank 的影响。
- 相比 full fine-tuning，LoRA 每个任务只保存很小的低秩模块；相比 adapter，线性低秩增量可合并进权重，不增加在线推理深度。
- 在 RoBERTa、DeBERTa、GPT-2、GPT-3 175B 上验证，展示了接近或超过全量微调的质量，并显著减少可训练参数和优化器显存。

#### 🔬 深入细节
![LoRA 低秩重参数化示意图](https://ar5iv.labs.arxiv.org/html/2106.09685/assets/x1.png)
*图：论文 Figure 1 展示 LoRA 的重参数化。冻结原权重 \(W_0\)，旁路训练低秩矩阵 \(A\) 和 \(B\)，二者乘积构成任务增量。*

LoRA 的出发点是大模型微调的部署现实：如果每个下游任务都复制一份完整模型，GPT-3 175B 这类模型会带来巨大的存储、加载和优化器状态成本。传统 adapter 通过插入小模块减少训练参数，但会增加网络深度，在线推理时仍要额外执行 adapter 计算。Prefix/prompt tuning 不改权重，但会占用序列长度，并且在某些任务上优化不稳定。LoRA 选择直接作用于权重更新本身：不学习完整 \(\Delta W\)，只学习一个低秩近似。

对任意线性层，原始前向是 \(h=W_0x\)，其中 \(W_0\in\mathbb{R}^{d\times k}\)。全量微调会让 \(W_0\) 变成 \(W_0+\Delta W\)，而 \(\Delta W\) 与 \(W_0\) 同形，参数量很大。LoRA 假设任务适配所需的权重变化具有低“内在秩”，因此令：

$$
\Delta W = BA, \quad B\in\mathbb{R}^{d\times r}, \quad A\in\mathbb{R}^{r\times k}, \quad r\ll\min(d,k)
$$

前向计算变为：

$$
h = W_0x + \frac{\alpha}{r}BAx
$$

其中 \(\alpha/r\) 是缩放因子，用来让不同 rank 下的更新幅度更稳定。若 \(d=k=12288\) 且 \(r=8\)，完整 \(\Delta W\) 需要约 1.5 亿个参数，而 LoRA 只需要 \(2\times12288\times8\) 量级的参数，差距非常大。

初始化设计是 LoRA 稳定性的一个细节。论文将 \(A\) 用随机高斯初始化，将 \(B\) 初始化为零，因此 \(BA=0\)，训练第一步前模型行为完全等同于原预训练模型。这个设计避免了刚插入 LoRA 模块时扰乱模型输出。训练过程中，梯度只更新 \(A\) 和 \(B\)，冻结的 \(W_0\) 不产生梯度，也不需要保存 Adam 的一阶和二阶优化器状态，从而降低显存。

LoRA 在 Transformer 中可以应用到任何 dense matrix，包括 self-attention 的 \(W_q,W_k,W_v,W_o\) 以及 MLP 层。论文为了简洁和效率，很多实验主要把 LoRA 加到 query 和 value 投影上，即 \(W_q\) 与 \(W_v\)。这样做的直觉是注意力的查询和值直接影响信息选择和信息写入，对任务行为的调节很敏感；同时不必在所有矩阵上都增加低秩旁路，可以保持参数量极低。参数量通常可近似为 \(n\cdot r(d+k)\)，其中 \(n\) 是注入 LoRA 的矩阵数量。

LoRA 的部署优势来自线性可合并性。训练时为了清晰和高效，通常保留旁路计算 \(W_0x + BAx\)。推理前可以显式计算 \(W'=W_0 + \frac{\alpha}{r}BA\)，然后像普通线性层一样执行 \(W'x\)。因此 LoRA 不增加推理层数、不占用额外 token 位置，也不需要像 adapter 一样在每层多跑一个瓶颈 MLP。切换任务时，只需卸载当前任务的 \(BA\) 增量并加载另一个任务的低秩增量，主模型权重仍可共享。

从方法边界看，LoRA 不是声称所有任务更新都天然低秩，而是提供一个可调的秩约束。当 \(r\) 增大并覆盖更多权重矩阵时，LoRA 的表达能力逐步接近全量微调；当 \(r\) 很小时，它成为强参数约束的高效适配器。论文的实验和 rank-deficiency 分析表明，许多语言模型适配任务确实不需要满秩更新，较小 rank 就能达到很强效果。这解释了 LoRA 为什么能在 GPT-2、GPT-3、RoBERTa、DeBERTa 上同时兼顾质量和效率。

```python
# LoRA 注入到一个线性层的核心逻辑
class LoRALinear:
    def __init__(self, W0, rank, alpha):
        self.W0 = freeze(W0)                         # pretrained weight, no gradients
        self.A = normal(shape=(rank, W0.in_dim))      # trainable
        self.B = zeros(shape=(W0.out_dim, rank))      # trainable, starts with zero update
        self.scale = alpha / rank

    def forward(self, x):
        base = self.W0 @ x
        delta = self.B @ (self.A @ x)
        return base + self.scale * delta

    def merge_for_inference(self):
        return self.W0 + self.scale * (self.B @ self.A)
```

> 💡 关键：LoRA 的参数高效性来自低秩约束，推理高效性来自可合并的线性结构。训练时是旁路，部署时可以变回普通权重矩阵。

#### 🧪 练习题
```yaml
question: "LoRA 为什么通常不会像传统 adapter 那样增加推理延迟？"
options:
  - "因为 LoRA 在推理时删除了 Transformer 的 attention 层"
  - "因为 LoRA 的低秩增量可以合并到原始线性层权重中，推理仍执行普通矩阵乘法"
  - "因为 LoRA 只改变 tokenizer，不改变模型计算图"
  - "因为 LoRA 必须在每个任务上全量微调一次"
answer: 1
explain: "LoRA 训练的是 \(BA\) 形式的线性权重增量，推理前可合并为 \(W_0 + \alpha BA/r\)，因此不会额外增加 adapter 层的串行计算。"
```

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
AdaLoRA 提出用 SVD 形式重参数化 LoRA 增量矩阵，并根据奇异值三元组的重要性动态分配全局 rank 预算，解决标准 LoRA 对所有层/矩阵均匀分配参数导致预算浪费的问题。

#### 🎯 核心要点
- 将低秩更新从 LoRA 的两矩阵乘积改写为 SVD-like 形式 \(\Delta W=P\Lambda Q\)，用可训练奇异值向量控制每个增量矩阵的有效 rank。
- 通过正交约束让 \(P\) 与 \(Q\) 更接近左右奇异向量，避免每轮显式计算高维 SVD。
- 以“奇异值 + 对应左右向量”的 triplet 为剪枝单元，只把低重要性的奇异值置零，保留向量以便后续恢复。
- 设计 sensitivity-based importance score，将 \(|w\nabla_w \mathcal{L}|\)、指数滑动平均和不确定性估计组合起来衡量 triplet 对任务损失的贡献。
- 使用 global budget scheduler：先用略高于目标的初始预算探索，再按 schedule 逐步降到目标预算，最后冻结预算分布继续微调。
- 论文在 DeBERTaV3-base、BART-large 上覆盖 GLUE、SQuAD、XSum、CNN/DailyMail，重点验证低预算场景下 AdaLoRA 优于均匀 rank 的 LoRA/Adapter。

#### 🔬 深入细节
![AdaLoRA 中不同权重矩阵重要性差异](https://ar5iv.labs.arxiv.org/html/2303.10512/assets/x1.png)
![AdaLoRA 中不同层重要性差异](https://ar5iv.labs.arxiv.org/html/2303.10512/assets/x2.png)
*图：论文 Figure 1 展示在相同参数预算下，选择不同权重矩阵或不同层进行 LoRA 微调会得到明显不同的 MNLI-m 表现；这正是 AdaLoRA 要解决的“均匀 rank 分配不合理”问题。*

```python
# AdaLoRA 核心训练流程（按论文 Algorithm 1 简化）
initialize P_i, Lambda_i, Q_i for every adapted weight W_i
initialize total rank budget b_t with a warmup -> cubic decay -> final budget schedule

for step in range(total_steps):
    batch = sample_minibatch(dataset)
    loss = task_loss(model(batch)) + lambda_reg * orthogonal_regularizer(P, Q)
    loss.backward()

    # 1. 估计每个可训练参数的敏感性
    for parameter w in {P_i, Lambda_i, Q_i}:
        sensitivity[w] = abs(w * grad(w))
        ema_sensitivity[w] = beta1 * ema_sensitivity[w] + (1 - beta1) * sensitivity[w]
        uncertainty[w] = beta2 * uncertainty[w] + (1 - beta2) * abs(sensitivity[w] - ema_sensitivity[w])
        importance[w] = ema_sensitivity[w] * uncertainty[w]

    # 2. 聚合到每个 SVD triplet：lambda_j 及其对应的 P[:, j], Q[j, :]
    for triplet in all_svd_triplets:
        score[triplet] = aggregate_importance(lambda_j, P_col_j, Q_row_j)

    optimizer.step()

    # 3. 按当前全局预算 b_t 保留 top-b_t 个 triplet，其余仅 mask 掉奇异值
    active_triplets = topk(score, k=b_t(step))
    mask_singular_values(Lambda, active_triplets)

return frozen_base_model + learned_adalora_parameters
```

LoRA 的基本假设是下游任务的权重增量 \(\Delta W\) 具有低内在秩，因此对一个预训练矩阵 \(W_0\) 只学习 \(\Delta W=BA\)，前向形式可写为 \(h=W_0x+BAx\)。问题在于标准 LoRA 通常为每个被适配矩阵指定同一个 rank \(r\)，等价于假设所有层、所有投影矩阵都同等重要。AdaLoRA 的 Figure 1 直接反驳了这个假设：在同样 0.28M 可训练参数下，FFN 矩阵比部分 attention projection 更有效，上层也明显比底层更值得分配预算。因此，AdaLoRA 不是单纯“减少参数”，而是把有限参数从低收益位置转移到高收益位置。

AdaLoRA 的关键重参数化是把每个增量矩阵写成近似 SVD：

$$
\Delta W_i=P_i\Lambda_iQ_i,
$$

其中 \(P_i\in\mathbb{R}^{d_1\times r}\)、\(Q_i\in\mathbb{R}^{r\times d_2}\)，\(\Lambda_i\) 是对角奇异值矩阵或向量。相比直接对 \(\Delta W_i\) 做精确 SVD 后截断，AdaLoRA 让 \(P_i,\Lambda_i,Q_i\) 参与梯度训练，并用正交正则近似奇异向量性质：

$$
\mathcal{R}(P_i,Q_i)=\lVert P_i^\top P_i-I\rVert_F^2+\lVert Q_iQ_i^\top-I\rVert_F^2.
$$

这个设计的直觉是：如果 \(P_i\) 与 \(Q_i\) 足够正交，那么按奇异值大小或重要性剪掉某些方向时，增量矩阵的扰动更接近真正的低秩截断，而不会像普通 LoRA 的 doublet 剪枝那样因为方向相关而产生剧烈不稳定。

预算分配的粒度不是单个参数，而是 triplet：第 \(j\) 个奇异值 \(\lambda_{i,j}\)、对应的左向量 \(P_i[:,j]\) 和右向量 \(Q_i[j,:]\)。AdaLoRA 为每个可训练参数估计一阶敏感性：

$$
s^{(t)}(w)=\left|w^{(t)}\nabla_w\mathcal{L}^{(t)}\right|.
$$

它表示如果把参数 \(w\) 移除，对当前损失可能造成多大影响。由于 mini-batch 噪声会让 \(s^{(t)}\) 抖动，论文进一步用指数滑动平均得到平滑敏感性 \(\bar{s}^{(t)}\)，并用局部偏差估计不确定性 \(\bar{u}^{(t)}\)，最终可写成类似 \(I(w)=\bar{s}^{(t)}(w)\bar{u}^{(t)}(w)\) 的参数级重要性。triplet 级分数再把 \(\lambda\)、\(P\) 列、\(Q\) 行的重要性聚合，例如：

$$
I_{i,j}=I(\lambda_{i,j})+\frac{1}{d_1}\sum_p I(P_i[p,j])+\frac{1}{d_2}\sum_q I(Q_i[j,q]).
$$

然后保留全局 top-\(b_t\) 个 triplet，其余只将对应奇异值 mask 为 0。

> 💡 关键：AdaLoRA 剪的是 \(\Lambda\) 中的奇异值，而不是删除 \(P\) 与 \(Q\) 的整列/整行。这样一个早期被误判为不重要的方向仍然能继续接收梯度并在后续步骤恢复，训练稳定性比硬删除 LoRA doublet 更好。

全局预算调度器控制当前总 rank \(b_t\)。训练初期预算略高于最终预算，让模型先探索更多方向；经过 warmup 后，预算按类似三次曲线逐步衰减：

$$
b_t=b_T+(b_0-b_T)\left(1-\frac{t-t_i}{t_f-t_i}\right)^3,
$$

其中 \(b_0\) 是初始预算，\(b_T\) 是目标预算，\(t_i\) 是开始剪枝前的 warmup 步数，\(t_f\) 是预算固定前的结束步数。最后阶段不再重新分配 rank，只在已选出的预算结构上继续微调。这个流程把“哪些层值得更高 rank”作为训练中动态学习出的结构，而不是由人工在训练前指定。

与传统 LoRA 相比，AdaLoRA 的优势来自两点叠加。第一，它把 rank 从静态超参数变成跨层共享的可调资源，适合预算极低、各模块重要性差异很大的场景。第二，它用 SVD-like 参数化降低 rank 调整的破坏性，使剪枝更接近“删除低贡献奇异方向”而非“任意删除低秩因子”。代价是训练逻辑更复杂，需要维护重要性统计、mask 和预算 schedule；但推理阶段仍可把有效增量合并回权重矩阵，不引入额外推理层。

#### 🧪 练习题
```yaml
question: "AdaLoRA 相比标准 LoRA 的核心改动是什么？"
options:
  - "把所有 LoRA rank 固定为更大的同一个值"
  - "用 SVD-like 增量参数化并按重要性动态分配全局 rank 预算"
  - "只微调 LayerNorm 和 bias 参数"
  - "把 LoRA adapter 改成额外的串行 MLP 模块"
answer: 1
explain: "AdaLoRA 的核心是用 PΛQ 表示增量，并根据 triplet 重要性剪奇异值，从而把预算分配给更关键的层和矩阵。"
```

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
QLoRA 提出在冻结的 4-bit 量化大模型上反向传播到 LoRA adapter，并结合 NF4、Double Quantization 与 Paged Optimizer，把 65B 模型微调压缩到单张 48GB GPU，同时接近 16-bit 微调效果。

#### 🎯 核心要点
- 冻结预训练基座权重并以 4-bit NormalFloat 存储，仅训练插入到线性层中的 LoRA 参数。
- 前向/反向计算时把 4-bit 权重临时 dequantize 到 BF16 做矩阵乘法，梯度只更新 LoRA adapter，不更新量化基座。
- 提出 NF4 数据类型：针对近似零均值正态分布的神经网络权重，用分位数量化构造 4-bit codebook。
- 提出 Double Quantization：再次量化第一层量化所需的 scale/absmax 常数，平均节省约 0.37 bit/parameter。
- 使用 Paged Optimizer 借助 NVIDIA Unified Memory，把 optimizer state 在 GPU/CPU 间分页，缓解长序列和 gradient checkpointing 带来的显存尖峰。
- 经验结论强调 LoRA 应用于所有 transformer 线性层，而不仅是 query/value projection，才能更稳定地恢复 16-bit 性能。
- 论文用 QLoRA 微调超过 1000 个模型，覆盖 LLaMA/T5、7B 到 65B、8 个 instruction datasets，并产出 Guanaco 系列聊天模型。

#### 🔬 深入细节
![QLoRA 微调框架与显存对比](https://ar5iv.labs.arxiv.org/html/2305.14314/assets/x1.png)
*图：论文 Figure 1 对比 full finetuning、LoRA 与 QLoRA 的显存结构。QLoRA 的核心变化是把 frozen transformer 压到 4-bit，并用 paged optimizer 管理训练时显存峰值。*

```python
# QLoRA 核心训练流程（概念伪代码）
W_fp16 = load_pretrained_llm()

# 1. 分块量化基座权重：NF4 存储权重，Double Quantization 存储量化常数
for block in chunks(W_fp16, block_size=64):
    c1 = absmax(block)
    W_nf4_block = quantize_to_nf4(block / c1)
store(W_nf4, quantize_fp8(c1))
freeze(W_nf4)

# 2. 在所有目标线性层插入 LoRA adapter
for linear_layer in transformer.linear_layers:
    linear_layer.add_lora_adapter(rank=r, dtype="bf16")

# 3. 训练时只更新 LoRA；4-bit 权重只在计算时临时反量化
for batch in dataloader:
    for quantized_linear in model.layers:
        W_bf16 = double_dequant(quantized_linear.W_nf4, quantized_linear.quantized_scales)
        y = x @ W_bf16 + lora_scale * (x @ A @ B)
    loss = cross_entropy(y, labels)
    loss.backward()              # gradient flows through W_bf16 into LoRA path
    paged_adamw.step(lora_params_only)
    paged_adamw.zero_grad()
```

QLoRA 解决的是一个非常具体的训练瓶颈：大模型全参微调不仅要存权重，还要存梯度、optimizer state 和激活。论文指出，常规 16-bit 微调 LLaMA 65B 需要超过 780GB GPU 显存；而仅靠 LoRA 虽然减少了可训练参数，但基座权重仍然以高精度常驻显存。QLoRA 的策略是把“模型容量”与“可训练参数”拆开：容量来自冻结的 4-bit 基座模型，任务适配能力来自小规模 BF16 LoRA adapter。

基础的 LoRA 线性层可写成：

$$
Y=XW+sXL_1L_2,
$$

其中 \(W\) 是冻结预训练权重，\(L_1,L_2\) 是可训练低秩矩阵，\(s\) 是缩放系数。QLoRA 将 \(W\) 替换为 NF4 存储的 \(W^{\text{NF4}}\)，但矩阵乘法仍在 BF16 中执行：

$$
Y^{\text{BF16}}=X^{\text{BF16}}\operatorname{doubleDequant}(W^{\text{NF4}}, c_1, c_2)+sX^{\text{BF16}}L_1^{\text{BF16}}L_2^{\text{BF16}}.
$$

直觉上，量化权重只负责“省显存存储”，而不是让 4-bit 直接承担低精度训练；每次用到权重时临时恢复到 BF16 参与计算，所以反向传播可以穿过反量化计算图，把误差信号传给 LoRA 参数。

NF4 是 QLoRA 最关键的量化设计。普通 int4/float4 的量化 bin 通常均匀或按浮点格式分布，但神经网络预训练权重大多近似零均值正态分布。NF4 用标准正态分布的分位数构造 codebook，使每个量化区间在理论上承载相近概率质量。可把第 \(i\) 个 codebook 值理解为相邻分位点的中心：

$$
q_i \approx \frac{1}{2}\left(Q_{\mathcal{N}}\left(\frac{i}{2^k+1}\right)+Q_{\mathcal{N}}\left(\frac{i+1}{2^k+1}\right)\right),
$$

其中 \(Q_{\mathcal{N}}\) 是标准正态分布的 quantile function，\(k=4\)。实际实现还会保证 zero point 可精确表示，因为 padding 或稀疏位置的 0 如果不能无误差表示，会带来不必要偏差。

分块量化会引入 scale 常数。假设每 64 个参数共享一个 \(c_1=\operatorname{absmax}(\text{block})\)，权重可近似恢复为：

$$
\hat{w}=c_1\cdot q_{\text{NF4}}.
$$

如果这些 \(c_1\) 仍用 FP32 存储，scale 本身会形成明显额外开销。Double Quantization 的做法是把 \(c_1\) 再作为输入做第二次量化，得到量化后的 scale 以及更粗粒度的二级 scale \(c_2\)。论文使用 64 blocksize 的第一层量化和 256 blocksize 的第二层量化，平均可把 scale 开销降低约 0.37 bit/parameter；对 65B 模型，这类小数级节省会累积成数 GB 显存。

Paged Optimizer 处理的是另一类问题：即使静态权重能放进显存，训练时某些 batch 仍可能因长序列、checkpointing 回放或 optimizer step 产生显存尖峰。QLoRA 用 NVIDIA Unified Memory 为 optimizer state 分页；当 GPU 显存不足时，部分状态自动迁移到 CPU RAM，需要更新时再迁回。这不改变优化目标，但把“偶发峰值导致 OOM”的硬失败变成可承受的分页成本。

> ⚠️ 注意：QLoRA 不是“直接训练 4-bit 权重”。基座权重被冻结，4-bit 是存储格式；训练信号通过临时 BF16 反量化路径流向 LoRA adapter。若更新量化基座本身，就不再是论文定义的 QLoRA。

与传统 LoRA 相比，QLoRA 的主要贡献不是新的低秩表达，而是围绕 LoRA 构建了一套可训练量化系统：NF4 降低量化误差，Double Quantization 压低 scale overhead，Paged Optimizer 控制显存峰值，所有线性层插入 LoRA 保证表达能力。论文的实验结论也很实用：在给定显存预算下，使用更大的低精度基座模型并做高质量 SFT，往往比小模型高精度微调更划算。

#### 🧪 练习题
```yaml
question: "QLoRA 中 4-bit 量化权重在训练时的角色是什么？"
options:
  - "作为可训练参数直接接收 AdamW 更新"
  - "被冻结并以 NF4 存储，用到时反量化到 BF16 参与计算"
  - "只用于推理，训练阶段仍保留完整 FP32 权重"
  - "替代 LoRA adapter，完全不需要低秩参数"
answer: 1
explain: "QLoRA 冻结 4-bit 基座权重，计算时临时 dequantize 到 BF16，梯度只更新 LoRA adapter。"
```

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
DoRA 将预训练权重分解为 magnitude 与 direction 两部分，只用 LoRA 更新 direction、单独学习 magnitude，从而让 PEFT 的更新模式更接近全参微调并缩小 LoRA 与 FT 的效果差距。

#### 🎯 核心要点
- 提出 weight decomposition analysis：把权重列向量拆成幅值 \(m\) 与单位方向 \(V/\lVert V\rVert_c\)，比较 FT、LoRA、DoRA 的幅值/方向更新模式。
- 发现 LoRA 的 magnitude update 与 direction update 呈强正相关，而 full fine-tuning 更像负相关或解耦更新，说明 LoRA 学习模式受限。
- DoRA 初始化时从预训练权重得到 \(m=\lVert W_0\rVert_c\)、\(V=W_0\)，训练时冻结 \(V\) 的基座部分、学习 \(m\)，并用 LoRA 低秩增量更新 direction。
- 核心形式为 \(W'=m\frac{V+\Delta V}{\lVert V+\Delta V\rVert_c}\)，其中 \(\Delta V=BA\) 是 LoRA 增量。
- 可在推理前把 DoRA 更新合并回权重矩阵，因此与 LoRA 一样不增加额外推理延迟。
- 为减少训练开销，论文建议对方向归一化分母做 detach，把归一化值视为常数，显著降低反传图显存且几乎不影响精度。
- 在 LLaMA commonsense reasoning、LLaVA visual instruction tuning、VL-BART image/video-text understanding 上稳定优于同 rank LoRA。

#### 🔬 深入细节
![DoRA 权重分解与低秩方向更新框架](https://ar5iv.labs.arxiv.org/html/2402.09353/assets/x1.png)
*图：论文 Figure 1 展示 DoRA 如何把预训练权重分解为 magnitude 与 direction，并用 LoRA 只更新 direction，最后重新合成为可部署权重。*

```python
# DoRA 核心训练流程（简化）
for each adapted pretrained weight W0:
    V = freeze(W0)                    # direction base
    m = trainable(column_norm(W0))     # magnitude vector
    A, B = init_lora(rank=r)           # Delta V = B @ A, with zero-init output path

for batch in dataloader:
    for adapted_linear in model.layers:
        delta_V = B @ A
        direction = V + delta_V
        norm = column_norm(direction)

        # 论文的低开销版本可 detach(norm)，降低反向图显存
        W_dora = m * direction / detach(norm)
        y = x @ W_dora

    loss = task_loss(y, labels)
    loss.backward()
    optimizer.step(params=[m, A, B])

# inference 前可把 W_dora merge 成普通线性层权重
```

LoRA 的基本更新是 \(W'=W_0+\Delta W\)，其中 \(\Delta W=BA\)。这个形式虽然参数高效，也能在推理前 merge，但它把“权重向量长度变化”和“权重方向变化”混在同一个低秩增量里。DoRA 的出发点是：如果全参微调能够自由地调节每列权重的幅值和方向，而 LoRA 的低秩增量必须同时解释两者，那么 LoRA 的容量缺口不只是“参数少”，还包括更新几何受限。

论文先定义列方向上的权重分解。对权重矩阵 \(W\)，记 \(\lVert W\rVert_c\) 为按列计算的向量范数，则：

$$
W=m\frac{V}{\lVert V\rVert_c},\quad m=\lVert W\rVert_c,\quad V=W.
$$

这里 \(m\) 是每一列的 magnitude，\(V/\lVert V\rVert_c\) 是单位方向。论文用这个分解比较 FT 和 LoRA 在不同训练步、不同层上的变化，发现 LoRA 的方向变化越大时幅值变化也越大，呈明显正相关；而 FT 更常出现一方大、一方小的解耦更新。这意味着 FT 可以“主要转方向但少改长度”或“主要改长度但少转方向”，而 LoRA 更容易把两类变化绑定在一起。

DoRA 的方法就是显式拆开这两件事。初始化时从预训练权重得到 \(m\) 与 \(V\)，训练时 \(m\) 是可训练向量，direction 则通过低秩矩阵更新：

$$
\Delta V=BA,
$$

$$
W'=m\frac{V+\Delta V}{\lVert V+\Delta V\rVert_c}.
$$

其中 \(V\) 的基座部分来自冻结的 \(W_0\)，\(A,B\) 是 LoRA 参数。这个公式的直觉很直接：LoRA 不再负责同时学“长度”和“方向”，而是专注于调整归一化方向；每列长度交给独立的 \(m\) 学习。新增的 \(m\) 参数量只和输出/列数相关，通常相对 LLM 总参数极小。

DoRA 与 Weight Normalization 看起来相似，但训练语境不同。Weight Normalization 通常从头训练，把权重重参数化为 magnitude 和 direction 以改善优化条件；DoRA 则从一个已经包含大量知识的 \(W_0\) 出发，保留预训练方向作为初始点，只在下游任务上做小幅适配。因此 DoRA 避免了从零初始化方向的敏感性，也保持了 PEFT 的可合并、低推理成本属性。

梯度分析解释了为什么分解能改善 LoRA 稳定性。对 direction 参数 \(V\) 的梯度会受到归一化结构影响，可直观写成“缩放 + 投影”形式：

$$
\nabla_V\mathcal{L}\propto \frac{m}{\lVert V\rVert_c}\left(I-\frac{VV^\top}{\lVert V\rVert_c^2}\right)\nabla_W\mathcal{L}.
$$

投影项会削弱沿当前权重方向的分量，让更新更集中在改变方向的有效子空间；缩放项则按 magnitude 调整梯度尺度。这种结构使低秩 \(\Delta V\) 接收到的梯度更接近“方向适配”任务，而不是普通 LoRA 中直接对 \(W_0+BA\) 做混合更新。

> 💡 关键：DoRA 不是替代 LoRA 的低秩矩阵，而是把 LoRA 放在 direction 分支里，同时单独学习 magnitude。它保留 LoRA 的可 merge 优点，但改变了 LoRA 更新的几何含义。

训练开销方面，直接对 \(\lVert V+\Delta V\rVert_c\) 反传会让计算图变大。论文提出把分母视为动态计算但不接收梯度的常数，即：

$$
W'=m\frac{V+\Delta V}{\operatorname{detach}(\lVert V+\Delta V\rVert_c)}.
$$

这样前向仍使用当前 direction 的真实范数，反向则避免范数分支带来的额外显存。论文报告该修改在 LLaMA 微调中可显著降低训练显存，精度差异很小。推理时，DoRA 与 LoRA 一样可以预先计算 \(W'\) 并合并到线性层，因此不会像串行 Adapter 那样增加额外推理层。

相较于 AdaLoRA/QLoRA，DoRA 关注的不是“预算分配”或“量化存储”，而是 LoRA 的表达几何。它回答的问题是：在参数量近似不变的情况下，如何让 LoRA 更像 full fine-tuning？答案是把每列权重的长度和方向解耦，让低秩参数只承担方向更新。这个思路也解释了论文实验中 DoRA 在相同 rank 下经常优于 LoRA，甚至在 halved rank 配置下仍能保持竞争力。

#### 🧪 练习题
```yaml
question: "DoRA 为什么要把权重分解为 magnitude 和 direction？"
options:
  - "为了在推理时增加一个额外归一化层"
  - "为了让 LoRA 只负责方向更新，并单独学习幅值，使更新模式更接近全参微调"
  - "为了把所有权重量化到 4-bit"
  - "为了按奇异值重要性动态删除 rank"
answer: 1
explain: "DoRA 的核心是解耦幅值和方向：magnitude 用可训练向量表示，direction 用 LoRA 更新，从而缩小 LoRA 与 FT 的学习模式差距。"
```

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
GaLore 提出在训练时投影“梯度”而不是重参数化“权重”的低秩训练策略，解决 LoRA 类方法限制参数搜索空间、预训练阶段显存仍高的问题。它让模型继续做全参数更新，但把 Adam/Adafactor 等优化器状态维护在低秩子空间中，从而显著降低优化器显存。

#### 🎯 核心要点
- 核心对象从低秩权重更新转为低秩梯度：利用训练中权重梯度逐渐呈现低稳定秩的性质。
- 保留全参数学习轨迹：不冻结主权重、不额外训练 LoRA adapter，而是把优化器处理后的低秩梯度投影回原空间更新权重。
- 低秩投影机制：用 SVD 从当前梯度中估计投影矩阵 \(P_t\) 和 \(Q_t\)，将 \(G_t\) 压缩为 \(P_t^\top G_t Q_t\)。
- 子空间可周期切换：每隔若干步重新计算投影矩阵，使不同阶段的低秩更新叠加后仍能学习全秩权重。
- 与优化器解耦：可接入 AdamW、8-bit Adam、Adafactor 等，把一阶/二阶矩等优化器状态存到压缩梯度空间。
- 训练场景覆盖预训练与微调：在 C4 上预训练 LLaMA 1B/7B，并在 GLUE 上微调 RoBERTa，展示接近全秩训练的性能。
- 显存收益来自优化器状态：8-bit GaLore 进一步结合量化优化器和逐层权重更新，论文报告优化器状态显存最高降低约 82.5%，总训练显存降低约 63.3%。

#### 🔬 深入细节
![GaLore 低秩子空间训练示意图](https://arxiv.org/html/2403.03507v2/x2.png)
*图：GaLore 在一段训练步内固定低秩子空间，累计若干步后重新计算投影矩阵并切换到新的子空间。不同低秩更新块相加后，权重本身不被限制为单一低秩矩阵。*

![GaLore 显存对比图](https://arxiv.org/html/2403.03507v2/x1.png)
*图：论文以 LLaMA 7B 单卡预训练为例，对比 BF16 AdamW、Adafactor、8-bit Adam 和 8-bit GaLore 等设置的估计显存消耗。GaLore 的目标不是减少参数本身，而是削减梯度和优化器状态的主要开销。*

```python
# GaLore 的核心训练逻辑，按单个权重矩阵 W 描述
for step, batch in enumerate(loader):
    loss = model(batch).loss
    G = -grad(loss, W)                     # G_t in R^{m x n}

    if step % update_proj_gap == 0:
        U, S, Vt = truncated_svd(G, rank=r)
        P = U[:, :r]                       # left singular subspace
        Q = Vt.T[:, :r]                    # right singular subspace

    R = P.T @ G @ Q                        # compact gradient core
    R_hat = optimizer.update(R)            # Adam/Adafactor states live here
    G_hat = P @ R_hat @ Q.T                # project back to original space
    W = W + lr * G_hat                     # full weight matrix is updated
```

GaLore 的出发点是反驳“想省显存就必须让权重更新低秩”这一常见做法。LoRA 把线性层写成 \(W = W_0 + BA\)，训练的是低秩因子 \(B,A\)，这会减少可训练参数和优化器状态，但也把搜索空间绑定在 adapter 的低秩参数化里。GaLore 认为真正占用大量显存的是 Adam 这类优化器为每个权重元素维护的一阶矩、二阶矩和梯度，而不是一定要把最终权重限制为低秩。因此它保留 \(W\in\mathbb{R}^{m\times n}\) 的完整形状，只在优化器处理梯度时进入低维空间。

论文先给出常规全秩训练的更新形式。设 \(G_t=-\nabla_W\phi_t(W_t)\) 是第 \(t\) 步反向传播得到的负梯度，\(\rho_t\) 是 Adam 这类带状态的逐元素梯度正则器，则完整更新可以写成：

$$
W_T = W_0 + \eta \sum_{t=0}^{T-1}\tilde{G}_t
    = W_0 + \eta \sum_{t=0}^{T-1}\rho_t(G_t).
$$

对 Adam 来说，需要维护 \(M_t,V_t\in\mathbb{R}^{m\times n}\)：

$$
M_t=\beta_1M_{t-1}+(1-\beta_1)G_t,
\qquad
V_t=\beta_2V_{t-1}+(1-\beta_2)G_t^2,
$$

$$
\tilde{G}_t=\frac{M_t}{\sqrt{V_t}+\epsilon}.
$$

这解释了为什么全参训练显存会被优化器状态放大：权重、梯度、一阶矩、二阶矩都与 \(mn\) 同阶。GaLore 的关键替换是只让 \(\rho_t\) 看到压缩后的梯度核心，而不是原始 \(G_t\)：

$$
\tilde{G}_t = P_t\,\rho_t\left(P_t^\top G_t Q_t\right)Q_t^\top,
\qquad
P_t\in\mathbb{R}^{m\times r},\ Q_t\in\mathbb{R}^{n\times r}.
$$

直觉上，\(P_t^\top G_t Q_t\) 是梯度在当前主奇异子空间里的低维坐标；优化器只在这个小矩阵上维护动量和方差，处理完再投影回原始维度。实际实现还会使用单侧投影来平衡投影矩阵存储与计算：当 \(m\le n\) 时使用 \(P^\top G\)，否则使用 \(GQ\)，因此压缩梯度的形状通常是 \(r\times n\) 或 \(m\times r\)，而不是必须使用 \(r\times r\) 的双侧核心。

GaLore 为什么敢压缩梯度？论文的理论部分说明，在一类可逆网络和 Transformer FFN 的分析框架下，权重梯度会随训练呈现低稳定秩。一个抽象形式是：

$$
G_t = \frac{1}{N}\sum_{i=1}^{N}\left(A_i-B_iW_tC_i\right),
$$

其中 \(B_i,C_i\) 为半正定结构。若训练动力学让非主导方向衰减，那么 \(G_t\) 的稳定秩 \(\operatorname{sr}(G_t)\) 会下降。论文给出的上界包含一个随 \(t\) 指数衰减的项：

$$
\operatorname{sr}(G_t)
\le
\operatorname{sr}(G^{\parallel}_{t_0})+
\left(\frac{1-\eta\lambda_2}{1-\eta\lambda_1}\right)^{2(t-t_0)}
\frac{\|G_{t_0}-G^{\parallel}_{t_0}\|_F^2}{\|G^{\parallel}_{t_0}\|_2^2}.
$$

这里的含义不需要死记公式：训练若进入某个局部稳定阶段，梯度中非关键特征方向的能量会更快衰减，剩下的主要变化集中在少数方向上。GaLore 用截断 SVD 动态跟踪这些方向：

$$
G_t = U S V^\top \approx \sum_{i=1}^{r}s_i u_i v_i^\top,
\qquad
P_t=[u_1,\dots,u_r],\ Q_t=[v_1,\dots,v_r].
$$

子空间切换是 GaLore 区别于“固定低维训练”的关键。若 \(P,Q\) 永远不变，权重只能沿固定子空间累计更新，长期看仍会限制表达能力。GaLore 每隔 \(T\) 步重新从当前梯度估计 SVD 子空间，于是权重可以写成多段低秩更新的和：

$$
W_t = W_0 + \Delta W_{T_1}+\Delta W_{T_2}+\cdots+\Delta W_{T_k}.
$$

每个 \(\Delta W_{T_i}\) 处在一个低秩子空间内，但不同阶段的子空间不同，累加后不再等价于单个固定低秩 adapter。这也是它能用于从头预训练的原因：ReLoRA 等方法往往需要全秩 warmup，而 GaLore 的低显存状态从训练早期就可以启用。

与 LoRA 的差别可以概括为“低秩在哪里”。LoRA 低秩化的是参数增量 \(\Delta W=BA\)，所以推理时可以合并、训练时参数少，但训练轨迹天然不同于全参优化；GaLore 低秩化的是优化器看到的梯度统计，权重矩阵本身仍完整更新。当 rank 达到全秩且 \(\rho_t\equiv 1\) 时，GaLore 可退化到原始梯度下降轨迹；而 LoRA 即使 rank 足够大，同时优化 \(B,A\) 的非线性参数化也仍会改变优化路径。

> 💡 关键：GaLore 的“省显存”不是因为模型更小，而是因为 Adam 的 \(M,V\) 不再为完整 \(m\times n\) 梯度保存状态。它适合显存瓶颈主要来自优化器状态的 LLM 预训练/微调场景，也能和 8-bit optimizer、逐层权重更新等工程手段叠加。

#### 🧪 练习题
```yaml
question: "GaLore 与 LoRA 在低秩化对象上的核心区别是什么？"
options:
  - "GaLore 低秩化权重矩阵本身，LoRA 低秩化梯度矩阵"
  - "GaLore 低秩化优化器处理的梯度统计，LoRA 低秩化可训练权重增量"
  - "GaLore 只用于推理量化，LoRA 只用于训练量化"
  - "GaLore 必须冻结主模型权重，LoRA 必须更新全模型权重"
answer: 1
explain: "GaLore 将梯度投影到低秩子空间并在其中维护优化器状态，再投影回原空间更新完整权重；LoRA 则训练低秩 adapter 参数 BA。"
```

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
VeRA 提出用冻结且跨层共享的随机低秩矩阵替代 LoRA 中每层可训练的 \(A,B\) 矩阵，只训练很小的缩放向量 \(b,d\)，解决 LoRA 在多任务、多用户适配时仍需存储大量 adapter 参数的问题。它保持与 LoRA 类似的可合并、无额外推理延迟特性，但显著降低每个任务需要保存的参数量。

#### 🎯 核心要点
- 继承 LoRA 的低秩残差路径：仍在冻结预训练权重 \(W_0\) 上添加低秩更新 \(\Delta W\)。
- 冻结随机矩阵：低秩矩阵 \(A,B\) 随机初始化后不训练，可由 RNG seed 重建，减少每个 adapter 的存储需求。
- 跨层共享矩阵：同一对随机矩阵在适配层间共享，层间差异由可训练缩放向量表达。
- 只训练向量参数：每层训练输出缩放向量 \(b\) 和 rank 维缩放向量 \(d\)，用 \(\Lambda_b\) 与 \(\Lambda_d\) 调制随机矩阵。
- 参数量从 LoRA 的 \(2L_{\text{tuned}}d_{\text{model}}r\) 下降到 VeRA 的 \(L_{\text{tuned}}(d_{\text{model}}+r)\)。
- 初始化设计关键：\(A,B\) 使用 Kaiming 等随机初始化，\(b\) 初始化为 0 以保证初始输出不扰动原模型，\(d\) 初始化为非零常数。
- 推理无额外延迟：训练结束后 \(\Lambda_bB\Lambda_dA\) 可合并进原始权重矩阵。
- 实验覆盖 GLUE、E2E、Alpaca 指令微调、ViT 图像分类；在 LLaMA/LLaMA2 指令微调中以约百倍更少训练参数接近 LoRA 表现。

#### 🔬 深入细节
![VeRA 与 LoRA 结构对比图](https://ar5iv.labs.arxiv.org/html/2310.11454/assets/x1.png)
*图：左侧 LoRA 训练每层低秩矩阵 \(A,B\)；右侧 VeRA 冻结并共享随机矩阵，只训练缩放向量 \(d,b\)。两者最终都可以把低秩分支合并回原权重，因此推理时没有额外层级延迟。*

```python
# VeRA 的核心逻辑，按一个线性层 W0: R^{d_in}->R^{d_out} 描述
# A, B 是共享且冻结的随机矩阵，可由同一个 seed 重建
A = frozen_random_matrix(shape=(r, d_in), init="kaiming", seed=seed_A)
B = frozen_random_matrix(shape=(d_out, r), init="kaiming", seed=seed_B)

# 每个被适配的层只保存两个可训练向量
b = zeros(d_out)              # 让初始 delta W 为 0
d = constant(c, shape=(r,))   # 非零 rank 缩放

for batch in finetune_loader:
    x = layer_input(batch)
    delta = diag(b) @ B @ diag(d) @ A
    h = W0 @ x + delta @ x
    loss = task_loss(h)
    update_only([b, d])       # W0, A, B 都不更新

# 部署前可合并：W_merged = W0 + diag(b) @ B @ diag(d) @ A
```

VeRA 的问题设定比“能否微调一个模型”更偏向“能否保存大量个性化 adapter”。LoRA 已经把全量微调的参数量从 \(mn\) 降到 \(r(m+n)\)，但如果一个服务要为成千上万个用户或任务保留不同 LoRA 权重，存储仍会快速膨胀。论文举例说明，在 GPT-3 这类深宽模型上，即便只对 query/value 层使用 rank 16 LoRA，每个适配版本也会带来可观的参数文件；当版本数达到百万级时，问题从训练显存转变成 adapter 存储和切换成本。

LoRA 的基本形式是：

$$
h = W_0x + \Delta W x = W_0x + BAx,
$$

其中 \(W_0\) 冻结，\(B\in\mathbb{R}^{d_{out}\times r}\)、\(A\in\mathbb{R}^{r\times d_{in}}\) 是每层独立训练的低秩矩阵。VeRA 保留这条“低秩残差分支”，但把可训练矩阵替换为冻结随机矩阵加可训练向量缩放：

$$
h = W_0x + \Delta W x
  = W_0x + \Lambda_b B \Lambda_d A x.
$$

这里 \(A,B\) 不再为每个任务学习，\(\Lambda_b=\operatorname{diag}(b)\) 负责按输出通道缩放，\(\Lambda_d=\operatorname{diag}(d)\) 负责按 rank 维缩放。可以把它理解为：随机矩阵提供一个固定的候选低秩基底，训练过程只学习“哪些输出维度和哪些 rank 通道应该被放大、压低或关闭”。这样虽然牺牲了一部分自由度，但避免了为每层、每任务存储完整 \(A,B\)。

参数量差异来自矩阵参数与向量参数的数量级差别。若有 \(L_{\text{tuned}}\) 个适配层、隐藏维度近似为 \(d_{\text{model}}\)、rank 为 \(r\)，LoRA 的训练参数量近似为：

$$
|\Theta_{\text{LoRA}}|=2L_{\text{tuned}}d_{\text{model}}r.
$$

VeRA 每层主要保存 \(b\in\mathbb{R}^{d_{model}}\) 和 \(d\in\mathbb{R}^{r}\)，因此为：

$$
|\Theta_{\text{VeRA}}|=L_{\text{tuned}}(d_{\text{model}}+r).
$$

当 \(r\) 增大时，LoRA 参数随 \(d_{model}r\) 成倍增长，而 VeRA 只随 \(r\) 线性增加一个很小的向量项。论文表格中在 RoBERTa-large、GPT-3 等设置下展示了这种差异：rank 越大、层越宽，VeRA 相对 LoRA 的存储优势越明显。

初始化是 VeRA 能稳定工作的关键。论文对冻结随机矩阵使用 Kaiming 初始化，使不同 rank 下矩阵乘积的方差更可控，避免每个 rank 都重新调学习率。\(b\) 初始化为零，这与 LoRA 常把其中一个低秩矩阵初始化为零的思想一致：训练开始时 \(\Delta W=0\)，模型输出完全等于原始预训练模型，避免随机 adapter 一开始破坏表示。\(d\) 初始化为非零常数，使 rank 通道在 \(b\) 开始学习后能立即提供可调制路径。

为什么随机矩阵可以工作？VeRA 借用了随机投影和低内在维度的经验事实：大模型适配某个下游任务时，真正需要学习的自由度远少于完整参数空间。冻结的 \(A,B\) 不需要精确等于最优低秩基，只要提供足够丰富且可重用的随机方向，\(b,d\) 就能选择和组合这些方向。对部署系统而言，\(A,B\) 可通过 seed 重新生成，adapter 文件主要由很小的向量组成，因此更适合多租户、个性化助手、边缘设备或需要频繁切换任务头的场景。

训练与推理流程也保持 PEFT 的工程优势。训练时冻结 \(W_0,A,B\)，只对 \(b,d\) 反向传播并维护优化器状态；推理前把 \(\Lambda_bB\Lambda_dA\) 算成一个普通矩阵增量并加到 \(W_0\)，即可删除额外分支。因此 VeRA 不像串联 adapter 那样增加额外前向层，也不像 prompt tuning 那样改变输入长度。它与 LoRA 一样具备“训练时轻量、部署时可合并”的性质，但 adapter 存储更小。

与 LoRA 的权衡在于表达能力与存储效率。LoRA 每层学习完整 \(A,B\)，自由度更高；VeRA 用共享随机 \(A,B\) 固定了候选方向，层特异性只靠向量缩放表达，所以在极难任务或需要高精度拟合时可能不如全自由 LoRA 灵活。论文的实验结论是，在 GLUE、E2E、图像分类和 LLaMA/LLaMA2 指令微调中，这种表达能力损失通常较小，而参数减少可达到 10 倍甚至 100 倍量级，尤其适合“每个任务都要存一个 adapter”的应用。

> 💡 关键：VeRA 不是把 LoRA 的 rank 简单调小，而是把“可学习矩阵”换成“冻结随机基底 + 可学习缩放向量”。这使 adapter 大小与 rank 的关系变得更温和，也让随机矩阵可以通过 seed 共享和重建。

#### 🧪 练习题
```yaml
question: "VeRA 相比 LoRA 主要通过什么方式减少每个任务需要保存的参数？"
options:
  - "删除低秩分支，只训练原始模型最后一层"
  - "把 LoRA 的 A、B 矩阵量化到 4-bit，但仍逐层保存"
  - "冻结并共享随机 A、B 矩阵，只保存可训练缩放向量 b 和 d"
  - "把所有 Transformer 层替换成卷积层"
answer: 2
explain: "VeRA 的核心是随机 A、B 不作为每个 adapter 的可训练权重保存，任务差异主要由小向量 b、d 表示。"
```

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
FLAN-T5 将 T5 系列模型放入 Flan 指令微调流程中，用 1.8K 个任务和少量链式思维数据训练模型更好地遵循自然语言指令，解决预训练语言模型在未见任务上需要大量示例、指令泛化弱的问题。它的核心不是改变 T5 架构，而是系统性扩大指令任务混合、模型规模和 CoT 微调数据。

#### 🎯 核心要点
- 使用 Flan 指令微调范式：把多源任务统一渲染成自然语言 instruction-input-output 格式。
- 数据规模扩大到 1.8K 任务：整合 Muffin、T0-SF、NIV2 和 CoT 四类 mixture，覆盖 473 个数据集与 146 个任务类别。
- 同时训练 direct 与 CoT 能力：在常规答案数据外加入 9 个带人工链式思维标注的数据集，缓解指令微调损害推理提示的问题。
- 支持多种提示设置：训练模板覆盖有无 exemplars、zero-shot、few-shot、direct answer 和 chain-of-thought answer。
- 应用于多种模型族：论文主线研究 PaLM、T5、U-PaLM，公开发布 Flan-T5 80M 到 11B checkpoint。
- 评估强调未见任务泛化：MMLU、BBH、TyDiQA、MGSM、开放式生成和 Responsible AI 基准均不直接作为训练任务。
- 训练目标仍是标准语言建模/seq2seq 交叉熵：FLAN-T5 的收益主要来自任务混合和格式化，而非新网络模块。
- 关键发现：模型规模、任务数量和 CoT 数据都会影响效果；加入 CoT 数据后，模型在 direct 与 CoT 评测上整体更稳。

#### 🔬 深入细节
![FLAN 指令微调总览](https://ar5iv.labs.arxiv.org/html/2210.11416/assets/x1.png)
*图：论文将多种语言模型在 1.8K 个指令化任务上微调，再在未见任务上评估；训练覆盖 zero-shot/few-shot 以及 direct/chain-of-thought 等不同提示场景。*

![FLAN 任务混合组成](https://ar5iv.labs.arxiv.org/html/2210.11416/assets/x2.png)
*图：Flan 微调数据由 Muffin、T0-SF、NIV2、CoT 等 mixture 组成，共 473 个数据集、146 个任务类别、1,836 个任务。*

![FLAN 模板格式示意](https://ar5iv.labs.arxiv.org/html/2210.11416/assets/x3.png)
*图：同一任务可被渲染成不同模板，包括是否带 instruction、是否带 few-shot exemplars、是否要求 chain-of-thought。模板多样性是指令泛化的重要来源。*

```python
# FLAN-T5 的训练流程抽象
mixtures = [Muffin, T0_SF, NIV2, CoT]
model = T5_checkpoint(size="80M..11B")

for step in range(num_steps):
    mixture = sample_mixture(mixtures, proportions=flan_recipe)
    task = sample_task(mixture)
    example = sample_example(task)
    template = sample_instruction_template(task)

    x = render_input(example, template,
                     include_exemplars=template.few_shot,
                     ask_for_cot=template.chain_of_thought)
    y = render_target(example,
                      include_rationale=template.chain_of_thought)

    loss = -sum(log p_model(y_t | y_<t, x) for t in range(len(y)))
    update(model.parameters(), loss)
```

FLAN-T5 要解决的不是“如何设计一个新的 Transformer 层”，而是“如何让预训练模型真正把自然语言指令当成任务接口”。普通 T5 通过 span corruption 等预训练目标学习语言和知识，但面对一个未见任务时，模型往往需要 few-shot 示例才能知道输出格式、标签空间和推理方式。Flan 把大量任务统一改写为指令形式，例如“判断下面两句话是否语义等价”“根据问题从段落中抽取答案”“一步步推理并给出最终答案”，让模型在微调阶段反复看到“自然语言说明 -> 目标行为”的映射。

从优化角度看，FLAN-T5 仍是标准 encoder-decoder 条件生成。给定指令化输入 \(x\) 和目标输出 \(y=(y_1,\dots,y_T)\)，训练目标可写成：

$$
\mathcal{L}(\theta)
= -\mathbb{E}_{(x,y)\sim\mathcal{M}}
\sum_{t=1}^{T}\log p_\theta(y_t\mid y_{<t},x),
$$

其中 \(\mathcal{M}\) 是由多个任务 mixture 组成的训练分布。如果样本是 CoT 格式，目标 \(y\) 不只是最终答案 \(a\)，还包含推理链 \(r\)，即 \(y=[r; a]\)。这意味着模型不仅拟合答案，还学习在需要推理时生成中间步骤。对 T5 来说，输入指令进入 encoder，decoder 自回归生成答案或“推理过程 + 答案”。

论文的数据设计有三个层次。第一层是任务来源：Muffin 包含早期 FLAN 风格任务和新增对话/程序合成任务，T0-SF 来自 T0 但去除与 Muffin 重叠部分，NIV2 提供大规模自然指令任务，CoT mixture 则包含 9 个带人工推理链的数据集。第二层是模板：同一数据集可以有多个自然语言说明、不同的输入组织方式、是否添加 few-shot exemplars。第三层是任务采样和比例控制：不同 mixture 的任务数量相差很大，如果简单按样本数混合，大型 mixture 会淹没小而关键的 CoT 或高质量任务，因此论文使用 mixture proportion 和 example cap 控制训练分布。

为什么 CoT 数据是必要的？早期指令微调主要教模型直接给答案，但推理评测常用“Let's think step by step”或显式 CoT 格式。如果微调数据几乎全是 direct answer，模型会形成“短答”偏好，在 CoT 提示下反而不愿展开推理，导致 reasoning benchmark 受损。论文发现，只加入 9 个 CoT 数据集就能改善这种情况：模型既保留 direct prompting 的可用性，又能在 BBH、MGSM 等任务上更好地利用链式思维。

FLAN-T5 与原始 T5 的关系可以理解为“同架构，不同任务接口”。T5 已经把 NLP 任务统一为 text-to-text，FLAN-T5 进一步把任务描述也显式写进输入，使模型在微调阶段学习“读懂任务说明”。因此，推理时用户不需要为每个任务训练新头或设计复杂标签映射，只需要给出自然语言 prompt。这个设计对 zero-shot 尤其重要：模型不是靠见过同一个数据集来回答，而是靠见过大量类似指令后迁移到新任务。

论文的扩展实验说明了三个变量的影响。首先，模型越大，指令微调收益越稳定，PaLM 8B、62B、540B 都因多任务指令微调提升未见任务表现。其次，任务数量增加有收益，但大部分收益在加入前数百个任务时出现，后续从 282 增至 1,836 的边际收益变小，说明任务多样性比机械增加任务数更关键。最后，CoT 数据虽然数量很少，却改变了模型对推理格式的适应能力，是 FLAN-T5 区别于只做普通多任务 SFT 的重要因素。

对实际使用者而言，FLAN-T5 的价值在于提供公开、可复用的指令微调 T5 checkpoint。相比只预训练的 T5，FLAN-T5 更适合直接作为 zero-shot/few-shot 指令模型、评测基线或下游 SFT 初始化；相比闭源大模型，它的规模从 80M 到 11B 可选，便于在资源受限场景部署。需要注意的是，FLAN-T5 不是 RLHF 模型，也没有显式偏好优化阶段；它主要学习“按指令完成任务”，而不是通过人类偏好奖励进一步塑造对话风格。

> 💡 关键：FLAN-T5 的算法核心是“任务混合 + 模板化指令 + CoT 目标”的监督微调配方。它把 T5 的 text-to-text 框架升级成 instruction-to-text 框架，训练目标简单，但数据组织决定了泛化能力。

#### 🧪 练习题
```yaml
question: "FLAN-T5 中加入少量 CoT 数据的主要作用是什么？"
options:
  - "减少 T5 模型参数量，使推理更快"
  - "让模型只输出更短答案，避免生成解释"
  - "提升模型在需要链式推理的提示和评测中的适应能力"
  - "替代交叉熵损失，改用强化学习训练"
answer: 2
explain: "CoT 数据把推理链作为监督目标，使模型学习在需要时生成中间推理步骤，而不是只偏向 direct answer。"
```

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
Selective Reflection-Tuning 提出教师模型反思改写、学生模型选择接收的数据回收流程，解决传统 Self-Instruct / Reflection-Tuning 只由教师决定数据质量、忽略目标学生模型兼容性的问题。它用 IFD 衡量样本对学生的“难度”，用 reversed-IFD 衡量响应对指令的“可学习可行性”，从而自动构造更适合当前学生模型的 SFT 数据。

#### 🎯 核心要点
- 两阶段数据回收流程：Selective Instruction Reflection 先改写指令，Selective Response Reflection 再改写响应。
- 教师模型负责 reflection：基于清晰度、复杂度、相关性、完整性等 criteria 对原始 instruction-response pair 进行批判和重写。
- 学生模型负责 selection：不再依赖 GPT-4 或额外 judge，而是直接用待训练学生模型的统计量决定是否接收教师改写。
- IFD 指标用于指令选择：比较原样本和改写样本的 Instruction-Following Difficulty，保留对学生更有训练价值、更具挑战性的指令版本。
- reversed-IFD 指标用于响应选择：衡量给定响应时学生能否反推出对应指令，保留响应更能支撑指令、语义更匹配的样本。
- 数据来源不是重新收集，而是在 Alpaca、WizardLM 等现有 instruction-tuning 数据上做自动反思、选择和回收。
- 训练出的 sRecycled Alpaca / sRecycled WizardLM 在少量数据条件下取得强性能，表明“学生兼容的数据质量”比单纯扩大数据规模更关键。

#### 🔬 深入细节
![Selective Reflection-Tuning 总体流程](https://arxiv.org/html/2402.10110v2/extracted/5652518/Figures/reflection_main.png)
*图：论文 Figure 1 展示了两阶段 teacher-student collaboration。教师模型先反思并生成改写候选，学生模型再用 IFD / r-IFD 选择是否接收。*

传统指令微调数据增强通常是 teacher-dominated：Self-Instruct 依赖强模型生成新任务，WizardLM / Reflection-Tuning 让强教师改写指令或响应，DEITA 等方法再用强模型打分筛选。这类方法默认“教师认为更好”的样本就一定适合学生，但论文指出这会带来两个偏差：第一，教师生成本身有随机性，反思后的样本可能看似更复杂却破坏了原问题；第二，评估模型与真正要微调的学生模型不同，judge 的偏好未必等于学生的学习需求。因此 Selective Reflection-Tuning 把问题改写为：让教师提出改进候选，但最终由学生模型基于自身困惑度统计量决定是否学习。

方法从一个原始样本 \((x, y)\) 出发，其中 \(x\) 是 instruction，\(y\) 是 response。SFT 的常规目标仍然是最大化给定指令时响应的条件似然，等价于最小化：

$$
\mathcal{L}_{\mathrm{SFT}}(\theta)=-\sum_{t=1}^{|y|}\log p_{\theta}(y_t \mid x, y_{<t}).
$$

Selective Reflection-Tuning 不改变最终 SFT 损失，而是改变进入 SFT 的数据分布。它先让 teacher 在原始 \((x,y)\) 和一组 instruction criteria \(C_x\) 上生成 critique，再输出候选 \((x', y')\)。这个候选不会被无条件接收，而是交给 student 计算 IFD。直觉上，IFD 比较“有指令条件”和“无指令条件”下拟合响应的困惑度差异，可写成：

$$
\mathrm{IFD}_{\theta}(x,y)=\frac{\mathrm{PPL}_{\theta}(y\mid x)}{\mathrm{PPL}_{\theta}(y)}.
$$

当 IFD 更高时，说明该 instruction-response pair 对学生更有挑战，单靠语言模型先验不容易直接生成目标响应，指令提供了更明确的学习信号。第一阶段的选择规则可概括为：

$$
(x^{*},y^{*})=
\begin{cases}
(x',y'), & \mathrm{IFD}_{\theta}(x',y') > \mathrm{IFD}_{\theta}(x,y),\\
(x,y), & \text{otherwise.}
\end{cases}
$$

第二阶段关注 response，因为只提高 instruction 难度并不保证 answer 更好。教师再次基于 response criteria \(C_y\) 反思 \((x^{*},y^{*})\)，生成新的响应候选 \(\tilde{y}\)。论文提出 reversed-IFD，把原先“指令是否帮助生成响应”的方向反过来，考察“响应是否足以让学生反推出指令”。可用同样的困惑度比例直观表示为：

$$
\mathrm{rIFD}_{\theta}(x,y)=\frac{\mathrm{PPL}_{\theta}(x\mid q(y))}{\mathrm{PPL}_{\theta}(x)},
$$

其中 \(q(y)\) 是把响应包装成“请根据答案猜测可能指令”的查询模板。r-IFD 越低，说明给定响应时学生越容易恢复对应 instruction，响应和指令的语义约束越一致，样本越可学。第二阶段选择规则因此与 IFD 相反：保留 r-IFD 更低的响应版本。论文最后还丢弃没有经过 response reflection 的样本，以保持响应分布一致，得到 selective recycled data，再用常规 SFT 训练 sRecycled Models。

```python
# Selective Reflection-Tuning 核心伪代码
# D: 原始 SFT 数据；T: teacher LLM；S: student base model
D_recycled = []

for x, y in D:
    # Phase 1: Selective Instruction Reflection
    critique_x = T.reflect(sample=(x, y), criteria="instruction quality")
    x_new, y_new = T.rewrite_instruction(sample=(x, y), critique=critique_x)

    if IFD(S, x_new, y_new) > IFD(S, x, y):
        x1, y1 = x_new, y_new
    else:
        x1, y1 = x, y

    # Phase 2: Selective Response Reflection
    critique_y = T.reflect(sample=(x1, y1), criteria="response quality")
    y2 = T.rewrite_response(sample=(x1, y1), critique=critique_y)

    if rIFD(S, x1, y2) < rIFD(S, x1, y1):
        D_recycled.append((x1, y2))
    else:
        # 论文实践中为了响应分布一致，会过滤未 response-reflected 的样本
        continue

student = SFT(student=S, data=D_recycled)
```

> 💡 关键：教师只负责“提出候选改进”，学生才负责“判断是否值得学习”。这使得数据选择从通用质量评分变成 model-specific compatibility 评估。

这种设计与 Self-Instruct 的区别非常直接。Self-Instruct 主要扩大指令集合，质量控制依赖规则过滤和强模型能力；Reflection-Tuning 强调让教师从多个 criteria 反思并改写现有样本，但仍然由教师主导。Selective Reflection-Tuning 的新增价值在于 selection 不是 another LLM judge，而是直接读取学生模型的条件困惑度。换言之，它不问“GPT-4 喜欢哪个样本”，而问“这个 base student 会从哪个样本中获得更有效的梯度信号”。这对于 7B/13B 学生尤其重要，因为它们的能力边界与教师模型差异很大。

训练流程上，Selective Reflection-Tuning 可以看作一种离线数据生成加筛选算法，不需要在每个 SFT step 内调用 teacher。实际实现时先对 Alpaca/WizardLM 样本批量调用 teacher 生成 reflection 和候选，再用 student 前向计算 IFD/r-IFD 分数，形成新的数据文件，最后按标准 causal language modeling loss 训练。由于 IFD/r-IFD 只需要学生模型打困惑度，比让 GPT-4 逐条 pairwise judge 更便宜，也避免引入独立 reward model 的偏好错位。

实验部分不是该算法的核心，但能佐证机制：论文在 Alpaca 和 WizardLM 上构造 sRecycled Alpaca / sRecycled WizardLM，并用 AlpacaEval、Open LLM Leaderboard、MT-Bench、pairwise comparison 和 human study 评估。消融显示，仅 reflection 不如 reflection + selection；随机选择、coherence、perplexity 等替代选择策略也弱于 IFD/r-IFD 组合。这说明收益不是来自“多生成一点数据”，而是来自“让学生模型参与决定哪些教师改写真正可学”。

#### 🧪 练习题
```yaml
question: "Selective Reflection-Tuning 中 reversed-IFD 的主要作用是什么？"
options:
  - "衡量响应是否足以支持学生反推出对应指令，从而判断样本可学习性"
  - "计算教师模型生成响应的速度，用于过滤高延迟样本"
  - "替代 SFT 交叉熵损失，直接优化学生模型参数"
  - "强制所有样本都变得更长，以提高回答详细程度"
answer: 0
explain: "r-IFD 将 IFD 的方向反过来，评估给定响应时学生恢复指令的难易程度；值越低通常表示响应和指令更匹配、更可学。"
```

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
LLaMoCo 提出面向优化问题代码生成的指令微调框架，把“给定优化问题描述，生成可执行优化器代码”建模为 code-to-code SFT，并用对比学习 warm-up 缓解同一问题多种描述与不同优化器标签之间的表示混淆。它解决了直接 prompt LLM 充当优化器时效率低、prompt 敏感、缺少领域优化知识的问题。

#### 🎯 核心要点
- 首个面向 optimization code generation 的 LLM instruction-tuning 框架，让通用 Code LLM 生成专门求解优化问题的 Python 优化器代码。
- 输入不是历史解序列，而是格式化问题 prompt，包含目标函数、变量维度、边界、约束等 Python/LaTeX 描述。
- 输出是可执行优化器实现，来自对算法池中多类优化器的基准测试和超参数搜索。
- 构造大规模优化指令集：合成无约束和有约束优化实例，覆盖 unimodal/multimodal、separable/non-separable、smooth/non-smooth 等 landscape。
- 引入两阶段训练：先做 contrastive warm-up 对齐同义问题 prompt 的潜在表示，再做常规 next-token / sequence-to-sequence 指令微调。
- 对比 warm-up 用“是否对应同一最优优化器”定义正负样本，减少特征层面混淆并加速后续 SFT 收敛。
- 使用 balanced data sampling 缓解优化器类别长尾，避免模型只学习出现频次最高的优化器家族。
- 在 CodeGen-Mono 350M、Phi、Code Llama 等基础模型上验证，CodeGen-Mono 经 LLaMoCo 微调后在合成和真实优化问题上可超过 GPT-4 Turbo 等直接 prompting 基线。

#### 🔬 深入细节
![LLaMoCo 概念总览](https://arxiv.org/html/2403.01131v1/x1.png)
*图：论文 Figure 1 对比三类范式。左侧是反复要求 LLM 生成更好解的 solution-to-solution，中央是直接 prompt 生成优化器代码，右侧是 LLaMoCo：先用问题-优化器代码指令集微调，再一次性生成优化器程序。*

LLaMoCo 的出发点是：LLM 可以被当成优化器，但直接让它在对话中不断提出更好解会非常低效。OPRO 一类方法需要把当前最优解、历史候选解和目标值放进上下文，随着变量维度和迭代次数增加，上下文窗口和 token 成本都会成为瓶颈。另一类方法直接让 LLM 写一个 optimizer program，推理轮数少得多，但 prompt 往往需要包含问题类型、推荐算法、实现细节等专家 hint，否则生成代码容易不稳定。LLaMoCo 的判断是：这些 domain-specific optimization knowledge 不应每次靠 prompt 临时注入，而应通过 instruction tuning 固化到模型参数中。

论文把优化问题抽象为：

$$
\min_{\mathbf{x}\in\mathbb{R}^{d}} f(\mathbf{x})
\quad \text{s.t.}\quad g_i(\mathbf{x})\le 0,
\; h_j(\mathbf{x})=0,
\; \ell \le \mathbf{x}\le u.
$$

在数据构造阶段，作者先建立基本函数集合和约束集合，再通过 composition 与 hybrid 两种方式合成不同 landscape。composition 是对多个基本函数做线性组合，hybrid 则把决策变量维度拆成若干片段，让不同基本函数作用在不同子空间后求和。这样得到的问题覆盖多峰、非可分、非光滑、局部平坦等性质，更接近真实优化任务。随后，系统从算法池中为每个实例搜索表现最好的优化器及超参数，算法池覆盖 evolutionary algorithms、differential evolution、particle swarm optimization、evolution strategies、Bayesian optimization、local search、numerical optimization 等家族；最终把“问题 prompt”作为输入，把“选中优化器的 Python 实现”作为输出。

LLaMoCo 的关键不是简单收集 prompt-code pair，而是处理“描述和优化器标签之间的非一一对应”。同一个数学问题可以被学生用 Python 代码、LaTeX 公式、不同变量命名、不同约束顺序描述；这些 prompt 文本表面差异很大，但应该生成同一个优化器。反过来，两个表面相近的函数描述可能因为约束、维度或 landscape 细节不同，最合适的优化器完全不同。如果直接 SFT，模型在 token 级损失中很难先学会“同义问题描述聚在一起、不同优化策略分开”，这就是任务清单中所说的特征层面混淆。

论文用 contrastive warm-up 先塑造表示空间。对 decoder-only code model，取最后一个 self-attention block 的输出 embedding 作为 prompt 表示 \(\mathbf{z}\)。两个 prompt 的距离可用余弦距离表示：

$$
D(\mathbf{z}_i,\mathbf{z}_j)=1-\frac{\mathbf{z}_i^{\top}\mathbf{z}_j}{\|\mathbf{z}_i\|\|\mathbf{z}_j\|}.
$$

若两个 prompt 对应同一个 selected optimizer，则它们是正样本，训练目标让距离变小；若对应不同 optimizer，则它们是负样本，目标让距离至少大于 margin \(m\)：

$$
\mathcal{L}_{\mathrm{con}}(i,j)=
\mathbb{1}[a_i=a_j]D(\mathbf{z}_i,\mathbf{z}_j)^2
+
\mathbb{1}[a_i\ne a_j]\max(0,m-D(\mathbf{z}_i,\mathbf{z}_j))^2.
$$

这里 \(a_i\) 表示第 \(i\) 个 prompt 通过 benchmark 选出的目标优化器。warm-up 不生成完整代码，所以比 SFT 阶段便宜；它的作用是先把 optimization semantics 编码到 latent space，再让 next-token loss 学习具体代码实现。

```python
# LLaMoCo 两阶段训练伪代码
# P: 优化问题实例集合；A: 优化器算法池；M: 代码语言模型
instruction_set = []

for problem in synthesize_optimization_problems(P):
    candidates = []
    for optimizer in A:
        best_cfg = grid_search(optimizer, problem)
        score = benchmark(optimizer, best_cfg, problem)
        candidates.append((score, optimizer, best_cfg))

    best_optimizer, best_cfg = select_best(candidates)
    prompt_variants = rephrase_as_python_or_latex(problem)
    code = render_optimizer_code(best_optimizer, best_cfg)

    for prompt in prompt_variants:
        instruction_set.append({
            "input": format_prompt(prompt),
            "output": code,
            "optimizer_label": best_optimizer.name,
        })

# Phase 1: contrastive warm-up
for batch in balanced_sample(instruction_set):
    z = M.encode_prompt(batch.input)
    loss_con = contrastive_loss(z, batch.optimizer_label)
    update(M, loss_con)

# Phase 2: instruction tuning
for batch in balanced_sample(instruction_set):
    logits = M(batch.input, batch.output_prefix)
    loss_sft = cross_entropy(logits, batch.output)
    update(M, loss_sft)
```

> 💡 关键：LLaMoCo 学的不是“某个优化算法的固定模板”，而是从问题结构映射到优化器选择与实现代码的条件生成能力。

balanced data sampling 解决的是另一个实际问题：某些优化器可能在大量合成实例上表现最好，而少数 optimizer 只适合特定 landscape。如果按原始频次采样，模型会过度偏向头部优化器，即使遇到适合长尾优化器的问题也生成常见模板。论文采用近似按 optimizer 类别均衡的采样概率，让每个训练 epoch 中各优化器主导的样本数更接近。这个设计与对比 warm-up 配合：warm-up 需要高质量正负样本，均衡采样能让 mini-batch 中有足够多的 minority optimizer 表示，避免表示空间被头部类别压扁。

推理时，用户只需按照协议描述优化问题，模型一次前向生成 optimizer code，再运行该程序求解问题。由于不再进行 solution-to-solution 多轮搜索，token 开销大幅下降；由于输出是程序而非单个解，它对问题规模更友好；由于优化器知识来自离线 benchmark 和 SFT，用户也不需要在 prompt 里手工指定“应该用 DE、PSO 还是 CMA-ES”。论文用 code error rate、code recovery cost、optimization performance、computational overhead 四类指标评估，覆盖代码可执行性、修复成本、求解质量和 token/计算开销。

与 FLAN-T5 式通用指令微调相比，LLaMoCo 的特色在于任务空间高度结构化：输入的“指令”不是自然语言问答，而是数学/代码形式的优化问题；输出也不是解释文本，而是可执行优化器代码。与普通 code SFT 相比，它又多了 optimization algorithm selection 这层监督信号，因为同一个目标函数可能适合不同算法。两阶段训练因此非常必要：先用对比学习让模型把问题语义和优化器类别对应起来，再让 SFT 学具体 API、控制流、边界处理和约束处理。

论文的局限也清晰：数据构造依赖算法池和基准测试，若算法池缺少某类现实优化器，模型不可能凭空学会；合成 landscape 虽然多样，但仍可能覆盖不到工业问题中的离散结构、噪声目标、昂贵黑箱评估和复杂约束。尽管如此，LLaMoCo 展示了一个可复用范式：对需要专业程序生成的领域，不只收集代码答案，还要把“如何选方法”的专家搜索过程蒸馏进指令数据，并用表示学习降低同义描述造成的混淆。

#### 🧪 练习题
```yaml
question: "LLaMoCo 中 contrastive warm-up 的核心目的是什么？"
options:
  - "把对应同一优化器的问题 prompt 表示拉近，把对应不同优化器的 prompt 表示推远"
  - "让模型在推理时进行更多轮对话，以提高搜索次数"
  - "替代优化器算法池，完全不需要 benchmark 选择标签"
  - "只训练 tokenizer，使代码长度更短"
answer: 0
explain: "LLaMoCo 的 warm-up 先塑造问题 prompt 的潜在表示空间，缓解同一问题多种描述和不同优化器标签之间的特征混淆，再进入常规代码指令微调。"
```

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
LoRA-E2 针对标准 LoRA 在大宽度模型中 feature learning 低效、且零初始化 \(B\) 导致 \(A\) 早期几乎无有效更新的问题，提出稳定尺度的 \(A\) 高斯初始化与 Gauss-Seidel 式 \(B/A\) 交替更新。它在不增加推理结构复杂度的前提下，让低秩适配获得更稳定、更快的有效参数更新。

#### 🎯 核心要点
- 保持 LoRA 的基本结构：冻结预训练权重 \(W_0\)，只训练低秩更新 \(\Delta W = BA\)。
- 识别标准 LoRA 的两个问题：大 width \(n\) 下特征学习效率下降；\(B=0\) 初始化使 \(\Delta W=0\)，导致 \(A\) 的早期梯度更新无效或很弱。
- 提出 stable initialization：对 \(A\) 使用方差为 \(\Theta(n^{-3/4})\) 的高斯初始化，代码实现中标准差为 \(\sqrt{2/n^{0.75}}\)，\(B\) 仍初始化为 0。
- 提出 Gauss-Seidel iteration：每个训练 step 先冻结 \(A\) 更新 \(B\)，再冻结 \(B\) 更新 \(A\)，区别于标准 LoRA 同时更新两个矩阵。
- 保持参数高效和推理友好：训练后仍可把 \(BA\) merge 回原线性层，不改变 LoRA 的部署路径。
- 可与 rsLoRA、DoRA 等 LoRA 变体组合，论文报告 LoRA-E2 及其组合在 NLU/NLG 上都有稳定收益。
- 实验覆盖 GLUE + T5-base，以及 MetaMathQA/GSM8K + LLaMA 2-7B；报告相对 LoRA 在 GLUE 上提升 1–10%，在数学生成任务上提升约 1–2% 并最高约 3× 更快收敛。
- 官方代码将 NLU 和 NLG 分开实现，分别训练 T5-base/GLUE 与 LLaMA2-7B/MetaMathQA，核心改动集中在 LoRA layer 初始化和自定义 Trainer 的训练步。

#### 🔬 深入细节
![LoRA 低秩适配结构示意](https://arxiv.org/html/2106.09685v2/x1.png)
*图：LoRA 原论文 Figure 1 的低秩分解结构。LoRA-E2 不改变这一路径，而是改进同一结构中 \(A\)、\(B\) 的初始化尺度和训练顺序。ACM 论文 Figure 1/3 主要展示训练损失曲线和低秩更新幅度对比；该结构图用于定位 LoRA-E2 的改动位置。*

标准 LoRA 对一个冻结线性层 \(W_0\in\mathbb{R}^{d_{out}\times d_{in}}\) 添加低秩更新：

$$
\mathbf{h}=W_0\mathbf{x}+\frac{\alpha}{r}BA\mathbf{x},
\quad A\in\mathbb{R}^{r\times d_{in}},\quad B\in\mathbb{R}^{d_{out}\times r},\quad r\ll \min(d_{in},d_{out}).
$$

标准实践通常随机初始化 \(A\)，把 \(B\) 初始化为零。这样模型在训练开始时 \(BA=0\)，不会破坏预训练模型输出，这是 LoRA 稳定性的来源。但 LoRA-E2 指出，这个设计也有副作用：因为 \(B=0\)，损失对 \(A\) 的梯度 \(\nabla_A\mathcal{L}\) 依赖 \(B^\top\)，初始阶段近似为零；也就是说，\(A\) 在前几步并没有真正学习到有效特征方向，只能等 \(B\) 先被更新后才开始收到有意义梯度。对于宽度 \(n\) 很大的 Transformer 层，这种滞后会放大 feature learning 低效问题。

LoRA-E2 的第一项改动是初始化尺度。论文摘要和作者页给出的核心结论是：对 \(A\) 使用方差 \(\Theta(n^{-3/4})\) 的高斯初始化。官方代码中的 `stable_init` 更具体：

$$
A_{ij}\sim \mathcal{N}\left(0,\frac{2}{n^{0.75}}\right),
\quad B=0.
$$

这里代码变量 `fan_in = in_features`，`std = sqrt(2.0 / fan_in**0.75)`。它不同于常见 Kaiming 风格的 \(\Theta(n^{-1})\) 方差，也不同于过大的 \(\Theta(n^{-1/2})\) 尺度。直觉上，\(A\) 不能太小，否则通过低秩瓶颈投影后的特征信号太弱，\(B\) 更新学不到有效方向；也不能太大，否则 LoRA 分支在 \(B\) 更新后会迅速产生过强扰动，损害稳定性。\(n^{-3/4}\) 是在大宽度下平衡 feature learning 与稳定更新的中间尺度。

第二项改动是 Gauss-Seidel 式训练。标准 LoRA 在一个 backward 中同时对 \(A\) 和 \(B\) 求梯度并更新，近似 Jacobi-style simultaneous update。LoRA-E2 官方实现的 `LoRAGaussSeidelTrainer` 在 `LoRA-A` 模式下把一个训练 batch 拆成两个子步：先设置 `lora_A.requires_grad=False`、`lora_B.requires_grad=True`，更新 \(B\)；然后恢复原学习率，设置 `lora_A.requires_grad=True`、`lora_B.requires_grad=False`，再更新 \(A\)。这与数值线性代数中的 Gauss-Seidel 思想一致：更新第二组变量时使用第一组变量的最新值，而不是用同一旧点同时更新。

```python
# LoRA-E2 核心训练伪代码，来自官方实现的逻辑抽象
for layer in target_linear_layers:
    A = Normal(mean=0, std=sqrt(2 / (fan_in ** 0.75)))  # stable_init
    B = zeros_like_B()
    layer.delta_W = scale * B @ A

for batch in dataloader:
    # Step 1: update B with A fixed
    freeze(A)
    unfreeze(B)
    loss_B = forward_loss(model, batch)
    backward_and_optimizer_step(loss_B)

    # Step 2: update A with updated B fixed
    unfreeze(A)
    freeze(B)
    loss_A = forward_loss(model, batch)
    backward_and_optimizer_step(loss_A)
```

> 💡 关键：LoRA-E2 没有改变低秩适配的参数量公式 \(r(d_{in}+d_{out})\)，而是改变“低秩分支一开始如何获得有效梯度”和“两个低秩因子如何轮流吸收梯度”。

从梯度角度看，设某层输入为 \(x\)，上游梯度为 \(g=\partial\mathcal{L}/\partial h\)，低秩分支为 \(h_{lora}=BAx\)。忽略缩放常数，有：

$$
\nabla_B\mathcal{L}=g(Ax)^\top,
\quad
\nabla_A\mathcal{L}=B^\top g x^\top.
$$

当 \(B=0\) 时，\(\nabla_A\mathcal{L}=0\)，而 \(\nabla_B\mathcal{L}\) 取决于 \(Ax\)。因此第一步最合理的事本来就是先让 \(B\) 学会如何读取 \(A\) 产生的低维特征；当 \(B\) 已经非零后，再更新 \(A\) 才能获得非零而且更贴合当前 \(B\) 的梯度。Gauss-Seidel 更新把这个顺序显式写进训练过程，避免同时更新中 \(A\) 使用“旧的、还没学会的 \(B\)”带来的低效。

与 DoRA 的关系也值得区分。DoRA 把权重更新拆成 magnitude 与 direction，以改善 LoRA 对权重方向和尺度的表达；LoRA-E2 主要处理优化动力学，即初始化尺度和 \(A/B\) 更新耦合。任务元信息把它挂在 DoRA 之后，但 LoRA-E2 并不是 DoRA 的简单正则项，而是可叠加在 LoRA 家族上的训练规则。官方代码里也保留 `use_dora`、`use_rslora` 开关，说明它可以与这些结构变体组合；当 `use_dora=False`、`use_rslora=False` 时，核心仍然是 stable_init + LoRA-A 交替训练。

官方代码把训练模式分成三类：`LoRA-S` 是 simultaneous training，接近标准 LoRA；`LoRA-F` 冻结 \(A\) 只训练 \(B\)，类似只把随机低维特征作为固定投影；`LoRA-A` 则是 LoRA-E2 的交替训练。NLU 实验中目标模块是 T5 的 `q`、`v`，数据是 GLUE；NLG 实验中目标模块扩展到 LLaMA2 的 `q_proj/k_proj/v_proj/o_proj/gate_proj/up_proj/down_proj`，数据是 MetaMathQA，评估关注 GSM8K 数学推理。这个覆盖说明 LoRA-E2 不是只对分类头或小模型有效，而是面向 Transformer 主干的多类线性层。

与标准 LoRA 相比，LoRA-E2 的代价主要在训练阶段：同一个 batch 内做两次 training step，会增加一定计算；但它换来更有效的早期更新和更快收敛。由于最终仍然得到 \(BA\) 低秩矩阵，推理时可以像 LoRA 一样 merge 到 \(W_0\) 或保持 adapter 形式，不引入额外推理深度。实际使用上，若训练预算极紧、只追求最低 step 时间，标准 LoRA 仍然简单；若目标是减少达到同等验证性能所需的步数，LoRA-E2 的稳定初始化和交替更新更有价值。

#### 🧪 练习题
```yaml
question: "LoRA-E2 为什么要在一个 batch 中先更新 B、再更新 A？"
options:
  - "因为标准 LoRA 中 B 初始化为 0，A 的初始梯度近似为 0；先更新 B 后，A 才能获得有效梯度"
  - "因为 A 的参数量总是比 B 大很多，必须延迟训练以节省显存"
  - "因为 LoRA-E2 删除了 B 矩阵，只保留 A 矩阵进行推理"
  - "因为 Gauss-Seidel 只能用于分类任务，不能用于生成任务"
answer: 0
explain: "低秩分支为 BAx，梯度 \nabla_A 依赖 B^T；当 B=0 时 A 几乎不更新。LoRA-E2 先让 B 变成非零，再固定 B 更新 A，从而提高早期训练效率。"
```

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
SFed-LoRA 提出了面向联邦 LoRA 的稳定缩放因子 \(\gamma_z=\alpha\sqrt{N/r}\)，解决高秩 adapter 在多客户端聚合后梯度塌缩的问题。它不改变 LoRA 架构，只修正本地 adapter 计算中的尺度，使高 rank 在联邦微调中重新变得可训练。

#### 🎯 核心要点
- 基于 FedSA-LoRA 的拆分聚合：服务端只聚合全局共享的 \(A_i\)，客户端保留本地个性化的 \(B_i\)
- 提出联邦稳定缩放因子：将 LoRA / FedSA-LoRA 的 \(\alpha/r\) 与 rsLoRA 的 \(\alpha/\sqrt r\) 扩展为 \(\gamma_z=\alpha\sqrt{N/r}\)
- 给出 \((N,r)\)-federated-stabilized adapter 定义：要求前向输出矩与反向梯度范数在客户端数 \(N\) 和秩 \(r\) 变化时保持稳定
- 理论上证明稳定条件：adapter 输出与输入梯度主项尺度为 \(\gamma_z^2 r/N\)，因此必须令 \(\gamma_z\in\Theta_z(\sqrt{N/r})\)
- 不增加推理延迟：仍使用 LoRA 的低秩矩阵乘积，训练后可合并到冻结权重或保留为标准 adapter
- 实验覆盖 Alpaca、GSM8K、GLUE，模型包括 LLaMA2-7B 与 RoBERTa-large，并测试 IID、non-IID、不同客户端数与不同 rank

#### 🔬 深入细节
![SFed-LoRA 框架图](https://arxiv.org/html/2603.08058v1/figure/sfedlora-mainfig.jpg)
*图：SFed-LoRA 在 FedSA-LoRA 拆分聚合框架上加入 \(\gamma_z=\alpha\sqrt{N/r}\) 缩放；客户端上传共享矩阵，保留本地矩阵，用尺度因子抵消客户端聚合与高秩扩展带来的方差错配。*

```python
# SFed-LoRA 联邦训练伪代码
# N: 客户端数, r: LoRA rank, alpha: 缩放超参数
# W0 冻结；每个客户端 i 持有本地 B_i，服务端维护共享 A_bar

gamma = alpha * sqrt(N / r)
initialize A_i ~ Normal(0, sigma_A^2) for each client i
initialize B_i = 0 for each client i
A_bar = average_i(A_i)

for round in range(num_rounds):
    server.broadcast(A_bar)

    uploaded_A = []
    for client i in selected_clients:
        A_i = A_bar
        for local_step in range(K):
            # LoRA adapter output: gamma * B_i @ A_i @ x
            y = frozen_model_forward(W0, x) + gamma * B_i @ A_i @ x
            loss = task_loss(y, target)
            update(B_i, A_i, grad(loss))
        uploaded_A.append(A_i)      # 只上传共享矩阵 A_i
        keep_local(B_i)             # B_i 不上传，保留本地个性化信息

    A_bar = average(uploaded_A)      # 服务端聚合共享低秩矩阵
```

LoRA 的基本形式是冻结原始权重 \(W_0\)，只训练低秩增量：

$$
h = W_0x + \gamma B_i A_i x,
$$

其中 \(A_i\in\mathbb{R}^{r\times k}\)、\(B_i\in\mathbb{R}^{d\times r}\)。普通 LoRA 通常令 \(\gamma=\alpha/r\)，rsLoRA 在单机训练中将其改为 \(\alpha/\sqrt r\)，以避免 rank 增大时更新幅度被过度压小。SFed-LoRA 的关键观察是：联邦场景不仅有 rank 维度，还有客户端聚合维度 \(N\)。如果仍使用单机缩放，服务端对共享矩阵求平均会改变 adapter 的统计量，导致高秩时梯度被压到接近 0，表现为“rank 越大越学不动”。

论文选择 FedSA-LoRA 作为理论分析基底，是因为它将低秩矩阵拆开处理：\(A_i\) 被上传和平均，\(B_i\) 留在本地。这比同时平均 \(B_iA_i\) 或分别平均两矩阵更容易分析，因为矩阵乘积的平均并不等于平均矩阵的乘积。按照论文附录的推导，经过本地更新与服务端聚合后，adapter 主项的期望尺度可以写成：

$$
\mathbb{E}\left[\gamma_z B_i^{(n)}A_i^{(n)}\right]
\approx
-\gamma_z^2\frac{r}{N}\sigma_A^2\eta
\sum_{s=0}^{n-1} v_{i,s}x_{i,s}^{\top}.
$$

这条式子的直觉非常直接：rank \(r\) 增大会放大低秩乘积中累加方向的数量，而客户端平均会引入 \(1/N\) 的尺度变化；如果缩放因子没有同时补偿 \(r\) 和 \(N\)，前向输出与反向梯度就无法保持同一数量级。论文将前向 \(h\)-阶矩与输入梯度都约束为 \(\Theta_N(1)\) 和 \(\Theta_r(1)\)，因此要求：

$$
\Theta_z\left(\left(\gamma_z^2\frac{r}{N}\right)^h\right)=\Theta(1),
\quad\Rightarrow\quad
\gamma_z\in\Theta_z\left(\sqrt{\frac{N}{r}}\right).
$$

实现上，SFed-LoRA 采用带超参数的形式：

$$
\gamma_z=\alpha\sqrt{\frac{N}{r}}.
$$

这个式子也解释了它和已有方法的关系：当没有联邦聚合影响时，\(N\) 可以视作常数，形式退化到类似 rsLoRA 的 \(1/\sqrt r\) 稳定化；当客户端数增大时，\(\sqrt N\) 项会补偿聚合导致的有效更新变弱。论文的实验也围绕这个机制展开：在 Alpaca 上固定客户端数、扫描 \(r\in\{4,8,32,128,512\}\) 时，FedSA-LoRA 的高秩梯度范数出现明显塌缩，FedSA-rsLoRA 只能部分缓解，而 SFed-LoRA 的不同 rank 曲线基本处于同一有效范围。

从训练流程看，SFed-LoRA 并不是一个新的 adapter 结构，而是一个联邦参数化规则。客户端仍然执行本地监督微调，损失函数仍可以是语言建模或下游任务交叉熵；变化只在 adapter forward 中的尺度 \(\gamma_z\)，以及服务端只聚合共享矩阵 \(A_i\)。这使它特别适合 cross-silo 场景：机构间不共享原始数据，本地保留 \(B_i\) 可以维持个性化表达，而共享 \(A\) 提供跨客户端可迁移的低秩子空间。

与传统 FedAvg + LoRA 相比，SFed-LoRA 避免了直接聚合完整 adapter 带来的乘积误差；与 FedSA-LoRA 相比，它修复了原始 \(\alpha/r\) 在高 rank 下过度衰减的问题；与 rsLoRA 相比，它显式建模了客户端数 \(N\)。论文在 LLaMA2-7B 的 Alpaca/GSM8K、RoBERTa-large 的 GLUE 上报告了更快收敛和更稳定的高秩性能，尤其是在 \(r=512\) 与 \(N\in\{5,10,15,20\}\) 变化时，SFed-LoRA 的 perplexity 对客户端扩展更不敏感。

> 💡 关键：SFed-LoRA 的核心不是“更大的 rank 一定更好”，而是先让高 rank 不再因为错误缩放而失效。只有当梯度尺度稳定后，额外 rank 才可能转化为有效容量。

#### 🧪 练习题
```yaml
question: "SFed-LoRA 为什么将缩放因子设为 gamma_z = alpha * sqrt(N / r)？"
options:
  - "为了让每个客户端上传更多 LoRA 参数"
  - "为了同时补偿 rank 扩展和客户端聚合造成的统计尺度变化"
  - "为了把 LoRA 矩阵从低秩变成满秩矩阵"
  - "为了减少服务端平均的通信轮数"
answer: 1
explain: "论文推导中 adapter 输出和输入梯度主项尺度为 gamma_z^2 * r / N；令 gamma_z 与 sqrt(N/r) 同阶可以使该主项保持常数量级，避免高秩梯度塌缩。"
```

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
BladeLoRA 提出由“线性递增 rank、对齐全参数微调方向、按模型规模剪枝”组成的 LoRA 增强流程，解决固定 rank LoRA 对不同层重要性一视同仁、容量分配不足的问题。它试图在不引入额外推理开销的前提下，让低秩 adapter 更接近全参数微调的任务适配能力。

#### 🎯 核心要点
- 采用线性递增 rank 序列：让更深层 Transformer 分配更高 LoRA rank，体现不同层任务适配重要性不同
- 引入全参数微调近似对齐：调整特定层的 LoRA 矩阵权重，使低秩更新更接近 full fine-tuning 的更新方向
- 融合两类剪枝策略：针对不同规模的预训练模型，用剪枝抵消 rank 增大和对齐计算带来的额外开销
- 继承 LoRA 的无额外推理成本优势：训练出的低秩增量仍可与原权重合并
- 实验覆盖 T5 与 Llama2，目标是在参数高效微调下达到或超过全参数微调的任务表现
- 任务给定 arXiv 链接与 BladeLoRA 不匹配；可访问论文页为 Springer DOI `10.1007/978-3-032-02899-0_6`

#### 🔬 深入细节
![BladeLoRA 三阶段流程图](https://quickchart.io/graphviz?graph=digraph%20G%20%7Brankdir%3DLR%3Bnode%20%5Bshape%3Dbox%2Cstyle%3Drounded%5D%3B%20Input%20%5Blabel%3D%22Frozen%20PLM%20%2B%20LoRA%22%5D%3B%20Rank%20%5Blabel%3D%22Linearly%20increasing%20rank%20r_l%22%5D%3B%20Align%20%5Blabel%3D%22Align%20LoRA%20update%20to%20full%20fine-tuning%22%5D%3B%20Prune%20%5Blabel%3D%22Scale-aware%20pruning%22%5D%3B%20Output%20%5Blabel%3D%22Efficient%20task%20adapter%22%5D%3B%20Input-%3ERank-%3EAlign-%3EPrune-%3EOutput%3B%7D)
*图：Springer 公开页面未暴露论文内部 Figure；上图根据论文摘要中明确给出的三部分方法重绘：递增 rank、对齐全参数微调、按规模剪枝。*

```python
# BladeLoRA 方法伪代码：按论文公开摘要重构核心流程
# W_l: 第 l 层冻结权重；A_l, B_l: LoRA 矩阵；L: 总层数

for layer l in range(1, L + 1):
    # 1) 线性递增 rank，深层获得更大低秩容量
    r_l = r_min + floor((l - 1) / (L - 1) * (r_max - r_min))
    init_lora(W_l, rank=r_l)

for step, batch in enumerate(train_loader):
    loss_task = supervised_loss(model(batch))

    # 2) 用全参数微调方向作为参考，约束 LoRA 更新更接近 full fine-tuning
    loss_align = 0
    for layer l in selected_layers:
        delta_lora = (alpha / r_l) * B_l @ A_l
        delta_full_ref = estimate_full_tuning_update(W_l, batch)
        loss_align += 1 - cosine(vec(delta_lora), vec(delta_full_ref))

    loss = loss_task + lambda_align * loss_align
    update_lora_parameters(loss)

    # 3) 周期性剪枝：小模型可细粒度剪 LoRA 方向，大模型可结构化剪 block/layer
    if step in pruning_schedule:
        scores = compute_importance_scores(model, criterion="first_order_or_block")
        prune_low_score_components(scores, target_budget)
```

标准 LoRA 对每个目标线性层加入同样 rank 的低秩增量：

$$
W_\ell^{\prime}=W_\ell+\Delta W_\ell,
\quad
\Delta W_\ell=\frac{\alpha}{r}B_\ell A_\ell.
$$

BladeLoRA 的第一步是打破“所有层同 rank”的假设。论文公开摘要强调，不同层的重要性不同，因此设计递增 rank 序列，让更深层获得更大的低秩容量。一个直接的形式化写法是：

$$
r_\ell = r_{\min}+\left\lfloor\frac{\ell-1}{L-1}(r_{\max}-r_{\min})\right\rfloor,
$$

其中 \(L\) 是 Transformer 层数。这个设计背后的直觉是：浅层更偏词法、局部模式和通用表示，深层更接近任务语义与输出决策；如果所有层都使用相同 rank，就会把参数预算浪费在不需要高容量的层，同时限制真正需要更强表达的深层。

第二步是“对齐全参数微调”。普通 LoRA 的低秩更新只在 \(B_\ell A_\ell\) 张成的子空间里搜索，可能无法贴近 full fine-tuning 的有效更新方向。BladeLoRA 因此调整特定层的矩阵权重，使低秩增量近似 full fine-tuning 的结果。可将这种思想写成方向对齐或投影对齐目标：

$$
\mathcal{L}_{align}
=\sum_{\ell\in\mathcal{S}}
\left(1-
\frac{\langle \operatorname{vec}(\Delta W_\ell),\operatorname{vec}(\Delta W_\ell^{FFT})\rangle}
{\|\Delta W_\ell\|_2\|\Delta W_\ell^{FFT}\|_2}
\right),
$$

其中 \(\Delta W_\ell^{FFT}\) 可以理解为全参数微调或其短步梯度估计给出的参考更新方向。这个项不是为了真的训练并保存一个完整 full fine-tuned 模型，而是把 full fine-tuning 的“该往哪里走”的信息蒸馏到低秩矩阵中，缩小 LoRA 与全参数微调之间的表示差距。

第三步是剪枝。递增 rank 和对齐项会提高训练时的计算与显存需求，因此 BladeLoRA 引入两类 pruning 来处理不同规模的预训练模型。公开摘要没有展开内部公式，但结合标题和参考文献可以明确其目的：在小/中模型上，可以对低重要度 adapter 方向、奇异方向或权重做更细粒度删除；在 Llama2 这类大模型上，更倾向结构化剪枝，以块、层或通道为单位降低训练/推理维护成本。常见的一阶重要性可写为：

$$
s_j=\left|w_j\frac{\partial\mathcal{L}}{\partial w_j}\right|,
$$

或对一个结构块 \(G\) 聚合为 \(s_G=\sum_{j\in G}s_j\)。低分组件被剪掉后，剩余 rank/结构保留了对任务损失最敏感的更新方向。这样，BladeLoRA 先主动把容量分给更重要的层，再用剪枝把冗余预算削掉，而不是像固定 rank LoRA 那样从一开始就给所有层相同容量。

与 AdaLoRA 的区别在于，AdaLoRA 主要通过奇异值重要性动态分配参数预算，而 BladeLoRA 明确加入了“深层更高 rank”的结构先验，并额外使用 full fine-tuning 对齐来校正低秩搜索方向。与 PRILoRA 一类递增 rank 方法相比，BladeLoRA 的剪枝阶段进一步控制了因 rank 增大带来的资源开销。整体上，它是一套面向“LoRA 表达力不足”的工程化组合：先扩容量、再对齐方向、最后剪掉冗余。

需要注意的是，任务清单给出的 `https://arxiv.org/abs/2501.02245` 实际是 “Adaptive GSIS for rarefied gas flow simulations”，不是 BladeLoRA。本文解读基于可公开访问的 Springer 页面摘要、引用信息和 DOI 页面；由于完整章节受订阅限制，具体剪枝阈值、实验表格和内部 Figure 无法从公开页面逐行核验。上述公式用于表达论文摘要中三阶段设计的机制直觉。

> ⚠️ 注意：BladeLoRA 的关键风险在于对齐 full fine-tuning 方向本身需要额外参考信号。如果参考更新估计成本过高，收益可能被训练开销抵消，因此剪枝调度和对齐层选择是实际落地的核心超参数。

#### 🧪 练习题
```yaml
question: "BladeLoRA 为什么采用线性递增的层级 rank 分配？"
options:
  - "因为更深层通常承载更多任务相关语义，需要更高低秩容量"
  - "因为所有层使用相同 rank 会导致推理时无法合并权重"
  - "因为递增 rank 可以完全替代监督损失函数"
  - "因为浅层参数量一定比深层参数量更多"
answer: 0
explain: "BladeLoRA 的动机是不同层重要性不同，深层更接近任务决策；递增 rank 将有限参数预算更多分配给深层。"
```

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
LoRA2 将单尺度 LoRA 扩展为多尺度低秩近似，在两个互相正交的低维平面上训练内部 LoRA 并组合成更高维更新，解决复杂任务中单一 rank/单一子空间表达不足的问题。它还改进 AdaLoRA 式重要性评分，减少敏感度计算并通过剪枝适配不同任务预算。

#### 🎯 核心要点
- 提出 LoRA² 多尺度结构：在两个互相正交的平面上训练内部 LoRA，再组合为高维低秩更新
- 使用外部正交正则：减少两个 LoRA 子空间重叠，扩大整体学习空间
- 使用内部正则：约束每个内部 LoRA 的参数更新更规整，提升训练稳定性和收敛速度
- 改进复杂矩阵重要性评分：针对乘积式 LoRA² 结构，去除对列矩阵敏感度的冗余计算
- 动态参数预算分配：类似 AdaLoRA，对低重要性奇异值或低秩方向进行 pruning
- 官方 README 称参数敏感度评分计算量约减少 98.5%，DeBERTa-V3-base 上训练参数约为 full fine-tuning 的 0.72%
- 实验覆盖 DeBERTa-V3-base、RoBERTa-large、Llama-2-7b-hf，以及 GLUE、数学推理、代码生成等任务

#### 🔬 深入细节
![LoRA2 与 LoRA/AdaLoRA/SoRA 结构对比](https://ars.els-cdn.com/content/image/1-s2.0-S0925231225015310-gr1_lrg.jpg)
*图：论文图示对比 LoRA、AdaLoRA、SoRA 与 LoRA²。LoRA² 使用更复杂的多尺度低秩结构，而不是只在一个固定 rank 的 \(BA\) 子空间中更新。*

```python
# LoRA2 核心训练伪代码：多尺度正交 LoRA + 改进重要性剪枝
for each target weight W0 in pretrained_model:
    freeze(W0)
    # 两个内部 LoRA 位于互相正交的低维平面
    L1 = init_internal_lora(rank=r1, plane="S1")
    L2 = init_internal_lora(rank=r2, plane="S2")
    enforce_orthogonal(S1, S2)

for step, batch in enumerate(train_loader):
    for each target layer:
        # 多尺度组合：用两个内部低秩更新构成更高维更新
        delta_W = compose(L1, L2)      # conceptual: product / composition of two LoRAs
        h = W0 @ x + scaling * delta_W @ x

    loss_task = supervised_loss(h, y)
    loss_ext = overlap_penalty(L1, L2)       # 外部正则：减少两个 LoRA 的重叠
    loss_int = internal_orth_penalty(L1) + internal_orth_penalty(L2)
    loss = loss_task + lambda_ext * loss_ext + lambda_int * loss_int
    update_trainable_lora2_parameters(loss)

    if step >= init_warmup and step % mask_interval == 0:
        # 改进 AdaLoRA 式重要性评分：只保留真正影响 pruning 的矩阵侧
        scores = compute_singular_importance_without_column_redundancy()
        prune_low_score_singular_values(scores, target_rank)
```

标准 LoRA 对冻结权重 \(W_0\) 添加一个低秩增量：

$$
h = W_0x + \frac{\alpha}{r}BAx.
$$

这类方法的核心假设是：下游任务所需的更新可以被一个固定 rank、单尺度的 \(BA\) 子空间较好表达。LoRA2 认为这个假设对复杂任务不一定成立，因为不同语义模式、不同层和不同任务可能需要多个尺度的低秩变化。论文因此把 LoRA 从单个低秩平面扩展到多个正交平面：先在两个互相正交的低维空间中训练内部 LoRA，再通过矩阵组合得到高维更新。

可以将 LoRA2 的组合思想抽象写为：

$$
\Delta W_{LoRA^2}=\mathcal{C}(L_1,L_2),
\quad
L_1=B_1A_1,\quad L_2=B_2A_2,
\quad
\mathcal{S}_1\perp\mathcal{S}_2.
$$

其中 \(\mathcal{C}\) 表示论文所说的“multiplying two LoRAs”得到高维 LoRA 的组合操作。直觉上，\(L_1\) 与 \(L_2\) 不应学习同一片方向，否则多尺度结构只是在重复单尺度 LoRA；因此论文加入外部正则来最小化两个 LoRA 的重叠，扩大可学习空间。一个等价直觉的正交惩罚可以写作：

$$
\mathcal{R}_{ext}=\|U_1^\top U_2\|_F^2+\|V_1^\top V_2\|_F^2,
$$

其中 \(U,V\) 表示不同内部 LoRA 所张成的左右子空间。外部正则负责“两个 LoRA 之间别重叠”，内部正则则负责“每个 LoRA 自己别退化”。内部正则可理解为保持每个内部子空间近似正交、减少方向坍缩：

$$
\mathcal{R}_{int}=\sum_{s\in\{1,2\}}
\left(\|U_s^\top U_s-I\|_F^2+\|V_s^\top V_s-I\|_F^2\right).
$$

LoRA2 的第二个关键点是 pruning。AdaLoRA 使用 SVD 参数化和重要性评分来动态分配 rank，但 LoRA2 的矩阵结构更复杂：两个内部 LoRA 相乘后，前一矩阵的行会与后一矩阵的列相乘。论文在 ScienceDirect 摘要和 Introduction 中指出，最直接的做法是把列矩阵的重要性加到行矩阵上；但进一步推导发现，每个奇异值的重要性评分已经包含列矩阵所有参数的敏感度，所以列矩阵敏感度对最终 pruning 没有额外作用。于是 LoRA2 排除了列矩阵计算，从而显著减少敏感度评分开销。

重要性评分可以用 AdaLoRA 风格的奇异值敏感度来理解：

$$
I_j^{(t)}=\left|\sigma_j^{(t)}\frac{\partial\mathcal{L}}{\partial \sigma_j^{(t)}}\right|,
\quad
\bar I_j^{(t)}=\beta_1\bar I_j^{(t-1)}+(1-\beta_1)I_j^{(t)}.
$$

训练过程中先 warm up，让各低秩方向有机会形成；随后每隔 `mask_interval` 重新计算重要性，剪掉低分奇异值或低秩方向，直到达到目标平均 rank。官方 GitHub README 的复现实验参数也体现了这个调度：`init_warmup`、`final_warmup`、`mask_interval`、`beta1`、`beta2`、`target_rank`、`reg_orth_coef` 都是围绕“先学多尺度方向，再稳定剪枝”设计的。

与 LoRA 相比，LoRA2 解决的是表达空间太单一的问题；与 AdaLoRA 相比，它不只是动态调整 rank，还先通过正交多尺度结构扩大候选更新空间；与 SoRA 等带门控结构的方法相比，LoRA2 更强调两个内部低秩平面的正交组合和重要性评分的计算优化。论文报告它在 DeBERTa-V3-base 上只使用 full fine-tuning 约 0.72% 的训练参数仍取得强性能，并且在参数进一步压缩到 0.17M 时仍可接近参数量约 8 倍的 baseline。

> 💡 关键：LoRA2 的“2”不是简单堆两个 LoRA，而是用正交约束让两个内部 LoRA 学到互补方向，再通过剪枝把真正有用的多尺度方向留下。

#### 🧪 练习题
```yaml
question: "LoRA2 改进重要性评分算法的主要目的是什么？"
options:
  - "让所有层固定使用同一个 rank"
  - "删除对 pruning 无额外贡献的列矩阵敏感度计算，降低评分开销"
  - "将 LoRA 的低秩矩阵改成全参数矩阵"
  - "完全取消正交正则项"
answer: 1
explain: "LoRA2 发现复杂矩阵中每个奇异值的重要性已经包含列矩阵参数敏感度，因此排除列矩阵计算可显著降低重要性评分成本。"
```
