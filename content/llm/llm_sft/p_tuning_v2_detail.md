### P-Tuning v2：把软提示扩展到每一层 Transformer

```yaml
id: p_tuning_v2
name: P-Tuning v2
full_name: P调优v2 (P-Tuning v2)
year: "2022.05"
org: Tsinghua University
paper_url: https://aclanthology.org/2022.acl-short.8/
category: peft
parent: p_tuning
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
