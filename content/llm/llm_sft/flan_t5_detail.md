### FLAN-T5
```yaml
id: flan_t5
name: FLAN-T5
full_name: 指令微调T5 (FLAN-T5)
year: '2023.02'
org: Google Research
paper_url: https://arxiv.org/abs/2210.11416
category: multitask
parent: flan
motivation: 1.8K任务+CoT数据混合训练
```

#### 📝 一句话总结
FLAN-T5 将 T5 系列模型在大规模指令格式任务混合上继续微调，并加入少量 CoT 数据，使模型在未见任务、零样本/少样本和推理提示下都显著更会“按指令做题”。

#### 🎯 核心要点
- 使用 FLAN 指令微调流程，把多来源任务统一改写成自然语言 instruction-input-output 格式。
- 训练混合包含 473 个数据集、146 个任务类别、1,836 个任务，覆盖 Muffin、T0-SF、NIV2 和 CoT 混合。
- 同时构造 zero-shot、few-shot、with CoT、without CoT 等格式，提升跨提示设置泛化能力。
- 对 T5 80M 到 11B 多个规模发布 Flan-T5 checkpoint，并同样验证 PaLM/U-PaLM 上的缩放趋势。
- 只用相对预训练很小的微调计算量，就在 MMLU、BBH、TyDiQA、MGSM 等未见评测上获得大幅提升。

#### 🔬 深入细节
![FLAN 指令微调总览](https://ar5iv.labs.arxiv.org/html/2210.11416/assets/x1.png)
*图源：ar5iv 论文 HTML。模型在 1.8K instruction tasks 上微调，并在未见任务上评估 zero-shot、few-shot 和 CoT 泛化。*

```python
# FLAN-T5 指令微调伪代码
task_mixtures = [Muffin, T0_SF, NIV2, CoT]
train_examples = []

for task in task_mixtures:
    for example in task.dataset:
        template = sample_instruction_template(task)
        if use_few_shot_format:
            prompt = add_exemplars(template, sampled_demos)
        else:
            prompt = template.render(example.input)
        if task.has_cot and sample_cot_format:
            target = example.reasoning_chain + "\n" + example.answer
        else:
            target = example.answer
        train_examples.append((prompt, target))

model = load_pretrained_T5(size)
for batch in balanced_batches(train_examples):
    loss = seq2seq_cross_entropy(model, batch.prompt, batch.target)
    update_all_model_parameters(loss)  # 标准 supervised finetuning
```

FLAN-T5 的核心并不是改造 T5 架构，而是把“任务集合、模板格式、推理链数据、模型规模”一起系统放大。原始 T5 预训练目标是 span corruption，虽然具备语言理解能力，但并不天然知道用户给出自然语言任务说明时应该如何组织答案。FLAN 微调把大量数据集改写为指令形式，让模型在训练中反复看到“任务描述 -> 输入 -> 目标输出”的映射。

论文特别强调三类缩放：任务数、模型尺寸和 CoT 数据。任务数从少量 CoT 数据逐步扩展到 Muffin、T0-SF、NIV2 后，未见任务的归一化平均分持续上升；模型从 80M 到 11B 的 T5 也体现出更强的指令泛化。CoT 数据只包含少数任务，但混入后让模型在未见推理任务上更容易被 “let's think step-by-step” 这类提示激活推理链。

训练数据格式是 FLAN-T5 的关键工程点。相同任务会被模板化成带 instruction 的 zero-shot 格式，也会被转成包含若干 exemplar 的 few-shot 格式；对推理任务，还会把中间 reasoning chain 放入目标序列。这样模型不是只学某个 benchmark 的答案分布，而是学习“如何解释任务、如何利用示例、何时输出推理过程”。

与普通多任务微调相比，FLAN-T5 的优势在于评估严格放在 held-out tasks 上，目标是泛化到训练混合之外的任务。与 prompt-only 方法相比，FLAN-T5 把这种能力固化到模型参数里，因此小到 11B 的 Flan-T5 在一些设置下能接近或超过更大的未指令微调模型。代价是需要维护大规模高质量任务混合，并处理训练/评测任务泄漏问题。

> ⚠️ 注意：FLAN-T5 不是 RLHF，也不是偏好优化；它是大规模 supervised instruction finetuning，训练信号仍是标准序列到序列交叉熵。

#### 🧪 练习题
```yaml
question: "FLAN-T5 中加入少量 CoT 数据的主要作用是什么？"
options:
  - "减少 T5 的参数量"
  - "让模型在未见推理任务上更容易生成中间推理链"
  - "替代所有非推理任务"
  - "让模型只支持 few-shot 推理"
answer: 1
explain: "论文发现将 CoT 数据混入指令微调后，模型在未见推理任务上更能受 CoT 提示激发，从而提升推理评测表现。"
```
