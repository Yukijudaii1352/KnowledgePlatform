### Self-Instruct：自指令 (Self-Instruct)

```yaml
id: self_instruct
name: Self-Instruct
full_name: 自指令 (Self-Instruct)
year: "2022.12"
org: University of Washington
paper_url: https://arxiv.org/abs/2212.10560
category: instruction
parent: flan
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
