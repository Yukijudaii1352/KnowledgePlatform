### BERT — 双向编码器表示 (Bidirectional Encoder Representations)

```yaml
id: bert
name: BERT
full_name: 双向编码器表示 (Bidirectional Encoder Representations)
year: '2018'
org: Google AI
paper_url: https://arxiv.org/abs/1810.04805
category: self_supervised
parent: transformer
motivation: 深度双向Transformer预训练
```

#### 📝 一句话总结

BERT 提出了基于 Masked Language Model（MLM）和 Next Sentence Prediction（NSP）的深度双向 Transformer 预训练方法，解决了传统语言模型只能单向建模的局限，使预训练模型通过简单微调即可在 11 项 NLP 任务上达到当时最优。

#### 🎯 核心要点

- **深度双向预训练**：不同于 GPT 的单向（左到右）或 ELMo 的浅层双向拼接，BERT 在所有层联合左右上下文进行真正的深度双向建模
- **Masked Language Model (MLM)**：随机遮蔽 15% 的输入 token 并预测，实现双向条件建模；遮蔽策略为 80% `[MASK]`、10% 随机替换、10% 保持不变，缓解预训练-微调不一致问题
- **Next Sentence Prediction (NSP)**：二分类任务判断句子 B 是否为句子 A 的真实下一句，学习句间关系
- **统一的预训练-微调框架**：预训练后仅需添加一个输出层，通过端到端微调适配各类下游任务（分类、序列标注、问答等）
- **输入表示**：Token Embedding + Segment Embedding + Position Embedding 三者求和；使用 WordPiece 分词（30K 词表），特殊标记 `[CLS]` 和 `[SEP]`
- **两种模型规格**：BERT\(_{\text{BASE}}\)（L=12, H=768, A=12, 110M 参数）和 BERT\(_{\text{LARGE}}\)（L=24, H=1024, A=16, 340M 参数）
- **预训练数据**：BooksCorpus（8 亿词）+ English Wikipedia（25 亿词），使用文档级语料以保留长程上下文
- **SOTA 结果**：GLUE 80.5%、MultiNLI 86.7%、SQuAD v1.1 F1 93.2、SQuAD v2.0 F1 83.1

#### 🔬 深入细节

##### 整体架构

![BERT 预训练与微调总览](https://ar5iv.labs.arxiv.org/html/1810.04805/assets/x1.png)
*图 1：BERT 预训练（左）与微调（右）流程。预训练和微调使用相同的 Transformer 架构，仅输出层不同。*

![预训练模型架构对比](https://ar5iv.labs.arxiv.org/html/1810.04805/assets/x3.png)
*图 3：三种预训练架构对比——BERT 使用双向 Transformer，OpenAI GPT 使用单向（左到右）Transformer，ELMo 使用两个独立的单向 LSTM 的浅层拼接。*

BERT 的核心架构是标准的多层双向 Transformer 编码器。与 GPT 使用的受限自注意力（每个 token 只能关注左侧上下文）不同，BERT 的自注意力机制允许每个 token 同时关注序列中所有位置，从而实现真正的深度双向表示。

##### 输入表示

![BERT 输入表示](https://ar5iv.labs.arxiv.org/html/1810.04805/assets/x2.png)
*图 2：BERT 的输入表示由 Token Embedding、Segment Embedding 和 Position Embedding 三者逐元素相加构成。*

对于给定的输入 token 序列，BERT 的输入嵌入计算为：

$$E_{\text{input}} = E_{\text{token}} + E_{\text{segment}} + E_{\text{position}}$$

其中：
- **Token Embedding**：WordPiece 子词嵌入，词表大小 30,000
- **Segment Embedding**：标识 token 属于句子 A 还是句子 B（学习得到）
- **Position Embedding**：标识 token 在序列中的绝对位置（学习得到，最大长度 512）

每个输入序列以 `[CLS]` 开头，句子对之间用 `[SEP]` 分隔。`[CLS]` 对应的最终隐藏向量 \(C \in \mathbb{R}^H\) 用作整个序列的聚合表示（用于分类任务），各 token 的最终隐藏向量 \(T_i \in \mathbb{R}^H\) 用于 token 级任务。

##### 预训练任务

**任务 1：Masked Language Model (MLM)**

传统语言模型只能从左到右或从右到左训练，因为双向条件建模会导致每个词间接"看到自己"，使预测变得无意义。BERT 借鉴完形填空（Cloze task）的思想，随机遮蔽输入 token 并要求模型预测被遮蔽的原始 token。

```python
# BERT Masked Language Model 预训练伪代码
def mlm_pretrain(tokens, mask_ratio=0.15):
    # 1. 随机选择 15% 的 token 位置
    masked_positions = random_select(tokens, ratio=mask_ratio)
    
    for pos in masked_positions:
        r = random()
        if r < 0.8:
            tokens[pos] = '[MASK]'      # 80%: 替换为 [MASK]
        elif r < 0.9:
            tokens[pos] = random_token() # 10%: 替换为随机 token
        # else: 10% 保持不变
    
    # 2. 通过双向 Transformer 编码
    hidden = transformer_encoder(tokens)  # 所有层双向注意力
    
    # 3. 仅对被遮蔽位置计算交叉熵损失
    for pos in masked_positions:
        loss += cross_entropy(hidden[pos], original_token[pos])
    
    return loss
```

> 💡 **关键设计**：80/10/10 的遮蔽策略是为了缓解预训练与微调之间的不一致——微调时输入中不会出现 `[MASK]` 标记。10% 保持不变让模型学会利用真实 token 的信息，10% 随机替换迫使模型不盲目信任输入，保持对所有位置的建模能力。

MLM 的损失函数为：

$$\mathcal{L}_{\text{MLM}} = -\sum_{i \in \mathcal{M}} \log P(x_i \mid \tilde{x})$$

其中 \(\mathcal{M}\) 是被遮蔽位置的集合，\(\tilde{x}\) 是经过遮蔽处理后的输入序列，\(x_i\) 是位置 \(i\) 的原始 token。

**任务 2：Next Sentence Prediction (NSP)**

许多下游任务（如问答、自然语言推理）需要理解两个句子之间的关系，而语言模型本身无法直接捕捉这种句间关系。NSP 是一个二分类任务：

```python
# Next Sentence Prediction 伪代码
def nsp_pretrain(corpus):
    # 构造训练样本
    sentence_A = sample_sentence(corpus)
    if random() < 0.5:
        sentence_B = get_next_sentence(sentence_A)  # 真实下一句
        label = 'IsNext'
    else:
        sentence_B = sample_random_sentence(corpus)  # 随机句子
        label = 'NotNext'
    
    # 输入: [CLS] A [SEP] B [SEP]
    input_seq = ['[CLS]'] + tokenize(A) + ['[SEP]'] + tokenize(B) + ['[SEP]']
    hidden = transformer_encoder(input_seq)
    
    # 用 [CLS] 的隐藏向量做二分类
    loss = cross_entropy(classifier(hidden[0]), label)
    return loss
```

BERT 的总预训练损失为两个任务的联合：

$$\mathcal{L}_{\text{pre-train}} = \mathcal{L}_{\text{MLM}} + \mathcal{L}_{\text{NSP}}$$

> ⚠️ **注意**：后续研究（如 RoBERTa）发现 NSP 任务对性能提升有限甚至有害，但在 BERT 原始论文中，消融实验表明移除 NSP 会导致 QNLI、MNLI 和 SQuAD 性能显著下降。

##### 微调策略

![BERT 微调示意](https://ar5iv.labs.arxiv.org/html/1810.04805/assets/x4.png)
*图 4：BERT 在不同下游任务上的微调方式。(a)(b) 句子级任务使用 [CLS] 表示；(c)(d) token 级任务使用各 token 表示。*

BERT 的微调极为简洁——Transformer 的自注意力机制天然支持对单句或句对的统一编码，无需为不同任务设计特定架构：

| 任务类型 | 输入格式 | 输出方式 |
|---------|---------|---------|
| 句子对分类（NLI、释义） | `[CLS] 句子A [SEP] 句子B` | \(C\) → 分类层 |
| 单句分类（情感分析） | `[CLS] 句子 [SEP]` | \(C\) → 分类层 |
| 问答（SQuAD） | `[CLS] 问题 [SEP] 段落` | 各 \(T_i\) → 起止位置预测 |
| 序列标注（NER） | `[CLS] 句子 [SEP]` | 各 \(T_i\) → 标签分类 |

微调时所有参数（包括预训练的 Transformer 权重）端到端更新。典型超参数：batch size 16/32，学习率 2e-5 至 5e-5，epoch 3-4。微调成本极低——单个 Cloud TPU 上 1 小时内即可完成大多数任务。

##### 与先前方法的核心区别

| 维度 | ELMo | OpenAI GPT | BERT |
|------|------|-----------|------|
| 架构 | 双向 LSTM | 单向 Transformer | 双向 Transformer |
| 双向性 | 浅层拼接（左→右 + 右→左） | 仅左→右 | 所有层深度双向 |
| 预训练目标 | 语言模型 | 语言模型 | MLM + NSP |
| 下游适配 | 特征提取（冻结+拼接） | 微调所有参数 | 微调所有参数 |
| 输入表示 | 字符 CNN | BPE | WordPiece + Segment |

> 💡 **核心洞察**：BERT 的关键创新不在于 Transformer 架构本身（GPT 也使用 Transformer），而在于通过 MLM 预训练目标突破了"双向建模"的瓶颈。传统语言模型必须单向才能避免信息泄露，而 MLM 通过遮蔽机制巧妙地在双向上下文中进行预测，使每一层都能同时利用左右两侧的信息。

#### 🧪 练习题

```yaml
question: "BERT 在 Masked Language Model 预训练中，被选中遮蔽的 token 会经历怎样的处理？"
options:
  - "100% 替换为 [MASK] 标记"
  - "80% 替换为 [MASK]，10% 替换为随机 token，10% 保持不变"
  - "50% 替换为 [MASK]，50% 保持不变"
  - "90% 替换为 [MASK]，10% 替换为随机 token"
answer: 1
explain: "BERT 采用 80/10/10 策略：80% 替换为 [MASK]，10% 替换为随机 token，10% 保持原始 token 不变。这种设计缓解了预训练（有 [MASK]）与微调（无 [MASK]）之间的分布不一致问题。"
```