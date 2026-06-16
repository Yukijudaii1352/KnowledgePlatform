### Prompt Tuning：提示调优 (Prompt Tuning)

```yaml
id: prompt_tuning
name: Prompt Tuning
full_name: 提示调优 (Prompt Tuning)
year: "2021.09"
org: Google Research
paper_url: https://aclanthology.org/2021.emnlp-main.243/
category: peft
parent: prefix_tuning
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
