### FLAN

```yaml
id: "flan"
name: "FLAN"
full_name: "指令微调 (Finetuned Language Models)"
year: "2021.09"
org: "Google Research"
paper_url: "https://arxiv.org/abs/2109.01652"
category: "instruction"
parent: "—"
motivation: "将60+任务转为指令模板实现零样本泛化"
```

#### 📝 一句话总结

FLAN 提出了指令微调：把大量已标注 NLP 数据集改写成自然语言指令模板后对大语言模型做多任务微调，解决预训练语言模型在纯零样本提示下不稳定、不理解任务意图的问题。

#### 🎯 核心要点

- 使用 LaMDA-PT 137B 作为主要基座，在 60+ 数据集和 12 个任务簇上进行指令微调。
- 将分类、问答、翻译、推理、常识等任务统一成自然语言输入和文本输出格式。
- 按任务簇做 held-out 评估，测试模型能否泛化到训练中未见过的任务类型。
- 关键结论是模型规模足够大时指令微调显著提升零样本能力，小模型收益不稳定。
- 通过多模板、任务簇数量、模型规模、无指令消融等实验验证“指令”本身是泛化来源。

#### 🔬 深入细节

![FLAN 指令微调范式对比](http://ar5iv.labs.arxiv.org/html/2109.01652/assets/x2.png)
*图源：论文 Figure 2，对比预训练-微调、提示和指令微调三种范式。*

![FLAN 任务簇与数据集](http://ar5iv.labs.arxiv.org/html/2109.01652/assets/x3.png)
*图源：论文 Figure 3，FLAN 将数据集组织成 NLU/NLG 任务簇，并按簇留出测试泛化。*

```python
# FLAN 指令微调伪代码
model = load_pretrained_lm("LaMDA-PT-137B")
train_pool = []

for dataset in supervised_datasets:          # 60+ 数据集
    cluster = assign_task_cluster(dataset)   # 12 个任务簇
    for example in dataset:
        template = sample_instruction_template(dataset)
        x, y = template.render(example)      # 自然语言指令输入和目标输出
        train_pool.append((cluster, x, y))

for heldout_cluster in task_clusters:
    train_data = [e for e in train_pool if e.cluster != heldout_cluster]
    model_ft = finetune(model, train_data, loss="seq2seq_or_lm_cross_entropy")
    evaluate_zero_shot(model_ft, tasks_in=heldout_cluster)
```

FLAN 的动机不是继续堆 in-context examples，而是让模型在训练阶段就见过“任务应该如何用自然语言描述”。传统预训练语言模型虽然学习了海量文本分布，但推理时如果只给一句任务说明，模型往往不知道应输出标签、解释还是完整句子；传统单任务微调又会把模型绑定到一个数据集格式，不能直接迁移到新任务。FLAN 把任务说明本身纳入监督信号，令模型学习“读懂指令再作答”的映射。

核心机制可以写成一个统一的条件语言建模目标。给定数据样本 \(e\) 和模板函数 \(T\)，模板生成输入 \(\mathbf{x}=T_{\text{in}}(e)\) 与目标 \(\mathbf{y}=T_{\text{out}}(e)\)，训练目标为：

$$
\mathcal{L}(\theta)=-\sum_{t=1}^{|\mathbf{y}|}\log p_\theta(y_t \mid \mathbf{x}, y_{<t})
$$

关键不在损失函数新颖，而在训练分布被改造成“多任务、多措辞、多答案格式”的指令分布。论文按任务簇留出测试，例如训练时不包含 NLI 簇，再用 NLI 指令测试；这比只留出同类任务中的某个数据集更严格，因为模型必须把在翻译、问答、情感等任务中学到的“按指令行动”迁移到新任务类型。

与普通多任务微调相比，FLAN 保留了任务说明，而不是只用数据集专用字段或标签 id。与 GPT-3 式提示相比，FLAN 不要求推理时提供少量样例，零样本时直接输入指令即可。论文的消融显示，移除指令模板、减少任务簇、或模型规模过小都会削弱泛化效果，说明收益来自“大模型容量 + 多任务指令监督”的组合。

> 💡 关键：FLAN 的贡献不是某个新网络层，而是把监督数据重新组织成指令分布，使语言模型从“补全文本”转向“执行任务描述”。

#### 🧪 练习题

```yaml
question: "FLAN 能提升零样本泛化的最核心原因是什么？"
options:
  - "使用了更深的 Transformer 层"
  - "把多种已标注任务改写为自然语言指令并联合微调"
  - "只在推理阶段增加更多 few-shot 示例"
  - "用强化学习替代交叉熵训练"
answer: 1
explain: "FLAN 的关键是训练阶段暴露多任务指令模板，让模型学习根据自然语言任务描述选择输出行为。"
```
