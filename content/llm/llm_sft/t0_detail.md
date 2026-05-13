### T0 — 多任务提示训练零样本泛化 (Multitask Prompted Training Enables Zero-Shot Task Generalization)

```yaml
id: t0
name: T0
full_name: "多任务提示训练零样本泛化 (Multitask Prompted Training Enables Zero-Shot Task Generalization)"
year: "2021"
org: "BigScience / Hugging Face"
paper_url: "https://arxiv.org/abs/2110.08207"
category: "sft"
parent: "T5"
motivation: "通过 PromptSource 大规模提示训练，使 11B 模型在未见任务上实现零样本泛化，性能匹配或超越 16 倍大的 GPT-3"
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