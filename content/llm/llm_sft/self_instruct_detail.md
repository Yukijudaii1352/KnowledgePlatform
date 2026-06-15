### Self-Instruct

```yaml
id: "self_instruct"
name: "Self-Instruct"
full_name: "自指令 (Self-Instruct)"
year: "2022.12"
org: "University of Washington"
paper_url: "https://arxiv.org/abs/2212.10560"
category: "instruction"
parent: "flan"
motivation: "利用模型自身生成指令数据迭代微调"
```

#### 📝 一句话总结

Self-Instruct 提出用语言模型从少量人工种子任务自动扩展指令、输入和输出数据，再用生成数据反向微调模型，解决人工构造大规模指令数据成本高的问题。

#### 🎯 核心要点

- 从 175 条人工种子任务出发，让 GPT-3 迭代生成新指令。
- 对生成指令做去重和过滤，包括与已有指令的 ROUGE-L 相似度过滤。
- 区分分类与非分类任务，分别采用 output-first 和 input-first 的实例生成方式。
- 生成的三元组包含 instruction、input、output，可直接用于监督微调。
- 最终用自生成数据微调 GPT-3，并在人类评估和 SuperNI 未见任务上提升指令跟随能力。

#### 🔬 深入细节

![Self-Instruct 迭代数据生成流程](http://ar5iv.labs.arxiv.org/html/2212.10560/assets/x2.png)
*图源：论文 Figure 2，从种子任务开始，经过新指令生成、分类判定、实例生成、过滤，形成指令微调数据。*

![Self-Instruct 生成任务示例](http://ar5iv.labs.arxiv.org/html/2212.10560/assets/x1.png)
*图源：论文 Figure 1，展示模型自动生成的多样化用户任务。*

```python
# Self-Instruct 数据自举伪代码
seed_tasks = load_manual_seed_tasks(n=175)
task_pool = list(seed_tasks)
generated = []

while len(generated) < target_size:
    demos = sample(task_pool, k=8)
    new_instructions = gpt3_generate_instructions(demos)

    for inst in new_instructions:
        if rouge_l_max(inst, task_pool) > 0.7:
            continue
        is_cls = gpt3_classify_task(inst)
        if is_cls:
            instances = gpt3_generate_output_first(inst)
        else:
            instances = gpt3_generate_input_first(inst)
        clean_instances = filter_invalid(instances)
        task_pool.append(inst)
        generated.extend(make_sft_examples(inst, clean_instances))

model = finetune(base_gpt3, generated, loss="cross_entropy")
```

Self-Instruct 的背景问题是，InstructGPT 证明了指令跟随数据很有价值，但高质量人工指令和回答标注昂贵且难以开放复现。论文的核心假设是：一个足够强的语言模型已经隐式知道很多任务形式，可以被少量种子任务引导，生成新的任务说明和训练实例。这样可以把“人工写大规模数据”变成“人工写少量种子 + 自动扩展 + 过滤”。

方法分成三个关键生成阶段。首先是新指令生成，模型读取若干种子任务作为 in-context examples，然后续写新的 task instruction。其次是任务类型判定，判断该指令是否是分类任务；这个分支很重要，因为分类任务需要先确定 label 空间，而开放生成任务则更适合先生成输入再生成输出。最后是实例生成，把指令转成 \((instruction, input, output)\) 三元组。

过滤机制决定数据是否可用。Self-Instruct 会丢弃与已有任务过于相似的指令，避免模型只改写种子任务；也会过滤格式错误、无效输出、输入输出缺失或任务无法执行的样本。相似度过滤可抽象为：

$$
\max_{s\in \mathcal{S}} \text{ROUGE-L}(i, s) < \tau
$$

其中 \(i\) 是新指令，\(\mathcal{S}\) 是已接受指令集合，论文使用阈值思路控制重复度。经过过滤后的数据再用于标准 SFT，训练目标仍是给定指令和输入最大化目标输出似然。

与 FLAN 相比，Self-Instruct 不依赖大量已有 NLP 数据集和人工模板，而是直接让模型生成用户导向任务；与 InstructGPT 相比，它没有使用偏好排序和 RLHF，因此成本低但质量上限受教师模型与过滤策略限制。这个范式后来被 Alpaca 等开源指令模型继承，用更强教师模型生成更大规模数据。

> 💡 关键：Self-Instruct 的创新不是新的微调损失，而是把指令数据构建过程变成可迭代的模型自举流程。

#### 🧪 练习题

```yaml
question: "Self-Instruct 为什么要过滤与已有指令 ROUGE-L 相似度过高的新指令？"
options:
  - "降低训练 batch size"
  - "避免生成数据只是在复述种子任务，提升任务多样性"
  - "让模型只能生成分类任务"
  - "替代监督微调中的交叉熵损失"
answer: 1
explain: "相似度过滤用于控制重复和近似改写，保留真正新的任务说明，从而提高自生成指令数据的覆盖面。"
```
