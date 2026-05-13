### BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding

```yaml
id: bert
name: BERT
full_name: 双向Transformer预训练模型 (Bidirectional Encoder Representations from Transformers)
year: 2019
org: Google
paper_url: https://arxiv.org/abs/1810.04805
category: core
parent: —
motivation: 掩码语言模型实现双向理解
```

#### 📝 一句话总结

BERT 提出了基于掩码语言模型（MLM）和下一句预测（NSP）的双向 Transformer 预训练方法，首次实现了在所有层同时利用左右上下文的深度双向语言表示，在 11 项 NLP 任务上刷新了当时的最优结果。

#### 🎯 核心要点

- **双向 Transformer 编码器架构**：BASE（L=12, H=768, A=12, 110M 参数）和 LARGE（L=24, H=1024, A=16, 340M 参数）两种规格
- **掩码语言模型（MLM）**：随机遮蔽 15% 的输入 token（80% 替换为 `[MASK]`、10% 替换为随机词、10% 保持不变），通过预测被遮蔽的词实现真正的双向预训练
- **下一句预测（NSP）**：二分类任务判断两个句子是否连续，增强模型对句间关系的理解
- **统一的输入表示**：Token Embedding + Segment Embedding + Position Embedding 三者相加，使用 WordPiece 分词（30K 词表）
- **预训练-微调范式**：预训练阶段在大规模无标注语料（BooksCorpus 800M + Wikipedia 2500M 词）上学习通用表示，微调阶段仅需添加一个输出层即可适配各类下游任务
- **广泛的任务适配能力**：通过不同的输入格式和输出层设计，统一处理分类、序列标注、阅读理解等多种任务类型
- **Feature-based 用法**：提取预训练模型的隐藏层特征（拼接最后 4 层效果最佳），可作为固定特征用于下游模型

#### 🔬 深入细节

![BERT 预训练与微调总览](https://ar5iv.labs.arxiv.org/html/1810.04805/assets/x1.png)
*图 1：BERT 的预训练与微调框架。预训练阶段通过 MLM 和 NSP 两个任务联合训练，微调阶段针对不同下游任务使用相同的预训练模型，仅调整输入输出格式。*

![BERT 输入表示](https://ar5iv.labs.arxiv.org/html/1810.04805/assets/x2.png)
*图 2：BERT 的输入表示。每个 token 的输入嵌入由 Token Embedding、Segment Embedding 和 Position Embedding 三者相加得到。*

```python
# BERT 预训练伪代码
# 阶段一：构造训练样本
for document in corpus:
    for (sent_A, sent_B) in sample_sentence_pairs(document):
        # 50% 概率 B 是 A 的真实下一句，50% 概率随机采样
        label_NSP = "IsNext" if is_real_next(sent_A, sent_B) else "NotNext"
        tokens = ["[CLS]"] + tokenize(sent_A) + ["[SEP]"] + tokenize(sent_B) + ["[SEP]"]
        
        # MLM：随机选择 15% 的 token 进行遮蔽
        masked_positions = random_select(tokens, ratio=0.15)
        for pos in masked_positions:
            r = random()
            if r < 0.8:
                tokens[pos] = "[MASK]"       # 80% 替换为 [MASK]
            elif r < 0.9:
                tokens[pos] = random_token()  # 10% 替换为随机词
            # else: 10% 保持不变
        
        yield tokens, masked_positions, original_tokens, label_NSP

# 阶段二：模型前向与损失计算
for batch in dataloader:
    # 输入嵌入 = Token Emb + Segment Emb + Position Emb
    H = TransformerEncoder(input_embeddings)  # [batch, seq_len, hidden]
    
    # MLM 损失：对被遮蔽位置预测原始 token
    mlm_logits = MLMHead(H[masked_positions])  # 线性层 + GELU + LayerNorm + 投影
    L_MLM = CrossEntropy(mlm_logits, original_tokens)
    
    # NSP 损失：使用 [CLS] 的表示进行二分类
    cls_repr = H[:, 0, :]  # [CLS] 对应的隐藏状态
    L_NSP = CrossEntropy(NSPHead(cls_repr), nsp_labels)
    
    # 总损失
    loss = L_MLM + L_NSP
    loss.backward()
    optimizer.step()
```

**动机与背景：为什么需要双向预训练？**

在 BERT 之前，语言模型预训练主要有两种范式：一是以 ELMo 为代表的特征提取方法，它分别训练前向和后向 LSTM 后拼接，但两个方向的模型是独立训练的，无法在每一层同时利用双向上下文；二是以 OpenAI GPT 为代表的微调方法，它使用单向（从左到右）Transformer 解码器，虽然可以端到端微调，但受限于自回归目标函数，每个 token 只能看到其左侧的上下文。BERT 的核心洞察在于：**许多 NLP 任务（如问答、自然语言推理）本质上需要对整个句子的双向理解**，而非单向的序列生成。然而，标准的双向语言模型在训练时会产生"信息泄露"问题——每个词可以间接"看到自己"。BERT 通过掩码语言模型（MLM）巧妙地解决了这一矛盾：随机遮蔽输入中的部分 token，让模型根据双向上下文预测被遮蔽的词，从而在不泄露信息的前提下实现真正的深度双向预训练。

**核心机制：MLM 的遮蔽策略与 NSP 任务设计**

MLM 的遮蔽策略经过精心设计以缓解预训练与微调之间的不匹配问题。如果所有被选中的 token 都替换为 `[MASK]`，那么微调时模型将永远不会看到 `[MASK]` 标记，导致分布偏移。因此 BERT 采用了 80/10/10 的混合策略：80% 替换为 `[MASK]`（提供主要的训练信号），10% 替换为随机词（迫使模型不能简单依赖输入是否为 `[MASK]` 来判断是否需要预测），10% 保持不变（使表示偏向实际观察到的词）。由于随机替换仅占所有 token 的 1.5%（15% × 10%），对模型的语言理解能力几乎没有损害。MLM 的损失函数为标准的交叉熵：

$$\mathcal{L}_{\text{MLM}} = -\sum_{i \in \mathcal{M}} \log P(x_i \mid \mathbf{x}_{\backslash \mathcal{M}})$$

其中 \(\mathcal{M}\) 为被遮蔽位置的集合，\(\mathbf{x}_{\backslash \mathcal{M}}\) 为遮蔽后的输入序列。NSP 任务则利用 `[CLS]` 位置的隐藏状态 \(\mathbf{C}\) 进行二分类，损失为 \(\mathcal{L}_{\text{NSP}} = -\log P(\text{IsNext} \mid \mathbf{C})\)。预训练的总损失为两者之和。消融实验表明，去除 NSP 任务后，QNLI 准确率下降 3.5 个百分点，MNLI 下降 0.5 个百分点，SQuAD F1 下降 0.6 个百分点，证实了 NSP 对句间关系建模的重要性。

**微调流程：统一架构适配多种任务**

BERT 的微调设计极为简洁。对于不同类型的下游任务，只需调整输入格式和输出层：（1）**句对分类**（如 MNLI、QQP）：输入为 `[CLS] 句子A [SEP] 句子B [SEP]`，取 `[CLS]` 的表示 \(\mathbf{C} \in \mathbb{R}^H\) 通过分类层 \(P = \text{softmax}(\mathbf{C} W^T)\) 预测标签，其中 \(W \in \mathbb{R}^{K \times H}\)；（2）**单句分类**（如 SST-2）：输入为 `[CLS] 句子 [SEP]`，同样使用 \(\mathbf{C}\) 分类；（3）**阅读理解**（如 SQuAD）：输入为 `[CLS] 问题 [SEP] 段落 [SEP]`，引入起始向量 \(\mathbf{S}\) 和结束向量 \(\mathbf{E}\)，答案起始位置的概率为 \(P_i^{\text{start}} = \frac{e^{\mathbf{S} \cdot \mathbf{T}_i}}{\sum_j e^{\mathbf{S} \cdot \mathbf{T}_j}}\)，结束位置类似；（4）**序列标注**（如 NER）：对每个 token 的表示 \(\mathbf{T}_i\) 进行分类。微调时所有参数端到端更新，典型超参数为：batch size 16/32，学习率 2e-5/3e-5/5e-5，训练 2-4 个 epoch，dropout 0.1。

**预训练配置与计算资源**

预训练数据为 BooksCorpus（800M 词）和英文 Wikipedia（2,500M 词，仅文本），合计约 33 亿词。训练使用 batch size 256（128K tokens/batch），共 1M 步（约 40 个 epoch）。优化器为 Adam（lr=1e-4, \(\beta_1=0.9\), \(\beta_2=0.999\)），L2 权重衰减 0.01，前 10K 步线性 warmup 后线性衰减。为加速训练，90% 的步数使用序列长度 128，最后 10% 使用序列长度 512 以学习长距离位置编码。BERT\_BASE 在 4 个 Cloud TPU（16 芯片）上训练 4 天，BERT\_LARGE 在 16 个 Cloud TPU（64 芯片）上训练 4 天。

**与 GPT 和 ELMo 的关键对比**

| 维度 | BERT | OpenAI GPT | ELMo |
|------|------|-----------|------|
| 架构 | 双向 Transformer 编码器 | 单向 Transformer 解码器 | 双向 LSTM（独立训练） |
| 预训练目标 | MLM + NSP | 从左到右语言模型 | 从左到右 + 从右到左语言模型 |
| 双向性 | 每层联合双向 | 仅左向 | 拼接两个单向（浅层融合） |
| 下游适配 | 微调所有参数 | 微调所有参数 | 特征提取（冻结参数） |
| 特殊标记 | `[CLS]`/`[SEP]` 在预训练时引入 | `[CLS]`/`[SEP]` 仅在微调时引入 | 无 |
| 训练数据 | 3.3B 词 | 800M 词 | 1B 词 |

> 💡 **关键洞察**：消融实验显示，将 BERT 退化为从左到右模型（LTR & No NSP）后，MRPC 准确率从 86.7% 暴跌至 77.5%，SQuAD F1 从 88.5% 降至 77.8%，即使在其上添加 BiLSTM 也仅恢复到 84.9%，远不及预训练双向模型。这证明了**深度双向预训练**（而非浅层拼接）是 BERT 成功的核心因素。

> 💡 **模型规模效应**：BERT 首次证明了即使在极小的数据集（如 MRPC 仅 3,600 条样本）上，更大的预训练模型也能带来持续的性能提升，打破了此前"大模型需要大数据"的认知。从 3 层到 24 层，MNLI 准确率从 77.9% 稳步提升至 86.6%。

#### 🧪 练习题

```yaml
question: "BERT 在 MLM 预训练中对被选中的 15% token 采用的遮蔽策略是什么？"
options:
  - "100% 替换为 [MASK]"
  - "80% 替换为 [MASK]，10% 替换为随机词，10% 保持不变"
  - "50% 替换为 [MASK]，50% 保持不变"
  - "90% 替换为 [MASK]，10% 替换为随机词"
answer: 1
explain: "BERT 采用 80/10/10 的混合遮蔽策略：80% 替换为 [MASK] 提供训练信号，10% 替换为随机词防止模型仅依赖 [MASK] 标记，10% 保持不变使表示偏向真实词。这种设计缓解了预训练与微调之间 [MASK] 标记不存在的分布偏移问题。"
```

```yaml
question: "以下关于 BERT 与 OpenAI GPT 的对比，哪项描述是正确的？"
options:
  - "GPT 使用双向 Transformer，BERT 使用单向 Transformer"
  - "BERT 和 GPT 都在预训练阶段引入 [CLS] 和 [SEP] 标记"
  - "BERT 使用掩码语言模型实现双向预训练，GPT 使用从左到右的语言模型"
  - "GPT 的预训练数据量大于 BERT"
answer: 2
explain: "BERT 通过 MLM 在每一层联合利用左右上下文实现深度双向预训练，而 GPT 使用标准的从左到右自回归语言模型，每个 token 只能看到左侧上下文。此外，GPT 仅使用 800M 词的 BooksCorpus，而 BERT 使用 3.3B 词（BooksCorpus + Wikipedia）。"
```