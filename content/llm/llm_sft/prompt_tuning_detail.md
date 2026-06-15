### Prompt Tuning

```yaml
id: "prompt_tuning"
name: "Prompt Tuning"
full_name: "提示调优 (Prompt Tuning)"
year: "2021.09"
org: "Google Research"
paper_url: "https://aclanthology.org/2021.emnlp-main.243/"
category: "peft"
parent: "prefix_tuning"
motivation: "仅调优输入向量匹配全量微调性能"
```

#### 📝 一句话总结

Prompt Tuning 将每个任务表示为少量可学习输入向量，冻结 T5 主体并只优化这些 soft prompt，在大模型规模下以极少参数逼近全量微调效果。

#### 🎯 核心要点

- 只在输入序列前拼接可训练 soft prompt，不修改 Transformer 内部层。
- 预训练 T5 参数完全冻结，每个任务只保存 prompt embedding。
- 证明 prompt tuning 随模型规模显著变强，T5-XXL 上可匹配 model tuning。
- 默认设置使用 LM-adapted T5、较长 prompt、标签词初始化等技巧。
- 支持多任务混合推理：同一冻结模型配不同 prompt 即可处理不同任务。

#### 🔬 深入细节

![Prompt Tuning 多任务服务优势](http://ar5iv.labs.arxiv.org/html/2104.08691/assets/x2.png)
*图源：论文 Figure 2，全量微调需要每任务一份模型，Prompt Tuning 只需每任务一份小 prompt。*

![Prompt Tuning 随规模逼近全量微调](http://ar5iv.labs.arxiv.org/html/2104.08691/assets/x1.png)
*图源：论文 Figure 1，模型越大，Prompt Tuning 与 Model Tuning 的差距越小。*

```python
# Prompt Tuning 伪代码
t5 = load_pretrained_t5_lm_adapted()
freeze(t5.parameters())
soft_prompt = Parameter(shape=(prompt_len, d_model))

for batch in task_data:
    x_embed = t5.embed(batch.input_ids)
    prompted_embed = concat(soft_prompt.expand(batch_size), x_embed)
    logits = t5(inputs_embeds=prompted_embed, labels=batch.target_ids)
    loss = logits.loss
    update(soft_prompt, loss)

save_task_prompt(soft_prompt)
```

Prompt Tuning 的问题设定比 Prefix-Tuning 更极简：如果大模型本身已经足够强，是否只需训练输入层的一小段连续向量就能指定任务？论文的回答是肯定的，但前提是模型规模足够大。小模型中 soft prompt 容量不足或优化困难，随着 T5 扩展到十亿级以上，冻结模型能更好地把 prompt 向量解释为任务条件。

形式上，给定可训练提示 \(P_\theta\) 和原始输入 embedding \(E(x)\)，模型输入变成 \([P_\theta;E(x)]\)，优化目标为：

$$
\mathcal{L}(\theta)=-\sum_t \log p_\phi(y_t \mid [P_\theta; x], y_{<t})
$$

其中 \(\phi\) 完全冻结，只有 \(\theta\) 更新。与离散 prompt design 不同，soft prompt 不必对应真实词，梯度可以直接优化向量空间中的任务条件。

论文指出几个实现细节显著影响效果。Prompt 长度从 1、5、20 到 100+ 不等，较长 prompt 通常更稳；初始化可以用随机、词表采样或类别标签 embedding，大模型对初始化更鲁棒；T5 原始 span corruption 目标和下游 text-to-text prompt 存在错位，额外 LM adaptation 有助于冻结模型适配 prompt tuning。

与 Prefix-Tuning 相比，Prompt Tuning 只训练输入 embedding 层的虚拟 token，参数更少、部署更简单，但对模型规模更敏感。它的工程价值在于同一大模型可以同时服务多个任务，只需在 batch 内为不同样本拼接不同 prompt，而不必加载多个模型副本。

> 💡 关键：Prompt Tuning 的“力量”主要来自大模型的可条件化能力，soft prompt 只是很小的任务开关。

#### 🧪 练习题

```yaml
question: "Prompt Tuning 在 T5-XXL 上接近全量微调的主要前提是什么？"
options:
  - "冻结模型规模足够大，能从少量连续 prompt 中读取任务条件"
  - "每层都插入 adapter"
  - "使用 PPO 强化学习"
  - "删除所有输入 token，只保留标签"
answer: 0
explain: "论文核心发现是 prompt tuning 随模型规模增强，大模型能更充分利用输入层 soft prompt。"
```
