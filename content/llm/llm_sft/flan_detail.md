### FLAN：指令微调 (Finetuned Language Models)

```yaml
id: flan
name: FLAN
full_name: 指令微调 (Finetuned Language Models)
year: "2021.09"
org: Google Research
paper_url: https://arxiv.org/abs/2109.01652
category: instruction
parent: —
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
