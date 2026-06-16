### FLAN-T5：指令微调 T5
```yaml
id: flan_t5
name: FLAN-T5
full_name: 指令微调T5 (FLAN-T5)
year: "2023.02"
org: Google Research
paper_url: https://arxiv.org/abs/2210.11416
category: multitask
parent: flan
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
