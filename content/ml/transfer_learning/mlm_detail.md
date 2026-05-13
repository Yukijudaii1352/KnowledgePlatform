### 掩码语言模型预训练 (Masked Language Modeling, MLM)

```yaml
id: mlm
name: MLM
full_name: 掩码语言模型预训练 (Masked Language Modeling)
year: '2019'
org: Google
paper_url: https://arxiv.org/abs/1810.04805
category: pretrain
parent: —
motivation: 掩码预测实现深度双向语言预训练
```

#### 📝 一句话总结

BERT 提出掩码语言模型（MLM）预训练目标，通过随机遮蔽输入 token 并预测被遮蔽词，首次实现了深度双向 Transformer 的语言预训练，解决了传统单向语言模型无法同时利用左右上下文的根本限制。

#### 🎯 核心要点

- **掩码语言模型（MLM）**：随机遮蔽 15% 的输入 token，利用双向上下文预测被遮蔽词，替代传统单向语言建模
- **三重替换策略**：被选中的 token 以 80% 概率替换为 `[MASK]`、10% 替换为随机词、10% 保持不变，缓解预训练-微调不匹配问题
- **下一句预测（NSP）**：辅助预训练任务，判断两个句子是否相邻，增强句间关系建模能力
- **统一的预训练-微调框架**：预训练后仅需添加一层输出层即可微调适配各类下游任务
- **输入表示**：Token Embedding + Segment Embedding + Position Embedding 三者相加，使用 `[CLS]` 和 `[SEP]` 特殊标记
- **两种模型规格**：BERT_BASE（L=12, H=768, A=12, 110M 参数）和 BERT_LARGE（L=24, H=1024, A=16, 340M 参数）
- **预训练数据**：BooksCorpus（8 亿词）+ English Wikipedia（25 亿词），使用 WordPiece 分词（30,000 词表）
- **GLUE 基准 80.5%**，SQuAD v1.1 F1 达 93.2，刷新 11 项 NLP 任务 SOTA

#### 🔬 深入细节

![BERT 预训练与微调框架总览](https://ar5iv.labs.arxiv.org/html/1810.04805v2/assets/Figures/fig1.png)
*图：BERT 的预训练（左）与微调（右）框架。预训练阶段使用 MLM 和 NSP 两个无监督任务；微调阶段对每个下游任务初始化相同的预训练参数，所有参数端到端微调。*

##### 算法伪代码

```python
# Masked Language Model (MLM) 预训练核心逻辑
def mlm_pretrain(input_tokens, mask_prob=0.15):
    # Step 1: 随机选择 15% 的 token 位置
    masked_positions = random_select(input_tokens, prob=mask_prob)
    labels = input_tokens[masked_positions]  # 保存原始 token 作为标签
    
    # Step 2: 对选中位置执行三重替换策略
    for pos in masked_positions:
        r = random()
        if r < 0.8:
            input_tokens[pos] = '[MASK]'      # 80% 替换为 [MASK]
        elif r < 0.9:
            input_tokens[pos] = random_token() # 10% 替换为随机词
        # else: 10% 保持不变
    
    # Step 3: 通过双向 Transformer 编码
    hidden_states = transformer_encoder(input_tokens)  # 所有层双向注意力
    
    # Step 4: 仅对被遮蔽位置计算交叉熵损失
    predictions = softmax(hidden_states[masked_positions] @ W_vocab)
    loss_mlm = cross_entropy(predictions, labels)
    
    return loss_mlm

# Next Sentence Prediction (NSP) 辅助任务
def nsp_pretrain(sentence_A, sentence_B, is_next_label):
    input_seq = ['[CLS]'] + sentence_A + ['[SEP]'] + sentence_B + ['[SEP]']
    hidden_states = transformer_encoder(input_seq)
    cls_output = hidden_states[0]  # [CLS] 位置的表示
    loss_nsp = cross_entropy(linear(cls_output), is_next_label)
    return loss_nsp

# 总损失
total_loss = loss_mlm + loss_nsp
```

##### 动机与背景

语言模型预训练已被证明能有效提升下游 NLP 任务的性能。在 BERT 之前，主流的预训练方法分为两类：

1. **特征提取方法**（如 ELMo）：分别训练前向和后向 LSTM，将两个方向的表示浅层拼接作为特征，但两个方向的模型是独立训练的，无法在每一层都融合双向信息。

2. **微调方法**（如 OpenAI GPT）：使用单向（从左到右）Transformer 语言模型进行预训练，然后微调所有参数。但单向约束意味着每个 token 只能关注其左侧的上下文。

> 💡 关键：标准条件语言模型只能单向训练——如果允许双向条件依赖，每个词可以间接"看到自己"，模型将退化为平凡的复制任务。MLM 通过遮蔽机制巧妙地打破了这一限制。

##### 核心机制：掩码语言模型（MLM）

MLM 的核心思想源自 Taylor (1953) 提出的完形填空（Cloze）任务：将输入序列中的部分 token 遮蔽，让模型根据**双向上下文**预测被遮蔽的词。

**遮蔽策略的数学描述：**

给定输入序列 \(x = (x_1, x_2, \ldots, x_n)\)，随机选择约 15% 的位置集合 \(\mathcal{M}\)。对于 \(i \in \mathcal{M}\)，替换规则为：

$$
\tilde{x}_i = \begin{cases} \texttt{[MASK]} & \text{概率 } 0.8 \\ x_{\text{rand}} & \text{概率 } 0.1 \\ x_i & \text{概率 } 0.1 \end{cases}
$$

MLM 损失函数为：

$$
\mathcal{L}_{\text{MLM}} = -\sum_{i \in \mathcal{M}} \log P(x_i \mid \tilde{x}_{\setminus \mathcal{M}}) = -\sum_{i \in \mathcal{M}} \log \frac{\exp(h_i^\top e_{x_i})}{\sum_{v \in V} \exp(h_i^\top e_v)}
$$

其中 \(h_i\) 是位置 \(i\) 经过 Transformer 编码后的最终隐藏向量，\(e_v\) 是词汇表中词 \(v\) 的嵌入向量。

> ⚠️ 注意：与去噪自编码器（Denoising Autoencoder）不同，MLM **仅预测被遮蔽的 token**，而非重建整个输入序列。这使得每个 batch 中只有约 15% 的 token 产生训练信号，导致预训练需要更多步数才能收敛。

**三重替换策略的设计动机：**

如果总是将选中位置替换为 `[MASK]`，会导致预训练与微调之间的分布不匹配——微调时输入中不存在 `[MASK]` token。三重替换策略的设计意图：
- **80% → `[MASK]`**：主要信号来源，迫使模型学习上下文表示
- **10% → 随机词**：引入噪声，迫使模型对所有位置保持判别能力
- **10% → 原词不变**：让模型学会在输入正确时也能产生合理表示，弥合预训练-微调差距

##### 输入表示与模型架构

BERT 采用多层双向 Transformer 编码器架构。输入表示由三部分相加构成：

$$
\text{Input}(x_i) = E_{\text{token}}(x_i) + E_{\text{segment}}(x_i) + E_{\text{position}}(i)
$$

- **Token Embedding**：WordPiece 子词嵌入，词表大小 30,000
- **Segment Embedding**：学习的句子标识嵌入（A 或 B），区分句对中的两个句子
- **Position Embedding**：学习的绝对位置嵌入，最大序列长度 512

特殊 token 的作用：
- `[CLS]`：序列首位，其最终隐藏状态用作整体序列表示（用于分类任务和 NSP）
- `[SEP]`：分隔句对中的两个句子

##### 下一句预测（NSP）辅助任务

为增强模型对句间关系的理解，BERT 引入 NSP 作为辅助预训练任务：

$$
\mathcal{L}_{\text{NSP}} = -[y \log P(\text{IsNext} \mid C) + (1-y) \log(1 - P(\text{IsNext} \mid C))]
$$

其中 \(C\) 是 `[CLS]` 位置的最终隐藏向量，\(y \in \{0, 1\}\) 表示句子 B 是否为句子 A 的真实下一句。训练数据中 50% 为真实相邻句对，50% 为随机采样的句对。

##### 与传统方法的关键区别

| 维度 | ELMo | OpenAI GPT | BERT (MLM) |
|------|------|-----------|------------|
| 上下文方向 | 浅层双向拼接 | 单向（左→右） | **深度双向** |
| 预训练目标 | 前向+后向 LM | 前向 LM | MLM + NSP |
| 微调方式 | 冻结+特征提取 | 全参数微调 | 全参数微调 |
| 架构 | BiLSTM | Transformer Decoder | Transformer Encoder |
| 每层信息融合 | 独立方向 | 仅左侧上下文 | **双向注意力** |

消融实验证实了 MLM 的关键作用：在相同设置下，MLM 双向模型在 MRPC 上比 LTR 单向模型高出 **9.2 个百分点**（86.7 vs 77.5），在 SQuAD 上高出 **10.7 个 F1 点**（88.5 vs 77.8）。

##### 训练与微调流程

**预训练阶段：**
- 数据：BooksCorpus + English Wikipedia，文档级语料（保留长程连续性）
- 序列长度：512 tokens
- Batch size：256 序列
- 训练步数：1,000,000 步（约 40 个 epoch）
- 优化器：Adam，学习率 1e-4，warmup 10,000 步
- 总预训练损失：\(\mathcal{L} = \mathcal{L}_{\text{MLM}} + \mathcal{L}_{\text{NSP}}\)

**微调阶段：**
- 在预训练模型基础上添加一层任务特定的输出层
- 对分类任务：使用 `[CLS]` 表示 → 线性层 → softmax
- 对 token 级任务（NER、QA）：使用各 token 表示 → 线性层
- 典型超参：学习率 2e-5~5e-5，epoch 3~4，batch 16~32
- 微调耗时：单 Cloud TPU 上 1 小时内即可完成

#### 🧪 练习题

```yaml
question: "BERT 预训练中，被选中进行掩码的 token 的处理策略是什么？"
options:
  - "100% 替换为 [MASK] token"
  - "80% 替换为 [MASK]，10% 替换为随机词，10% 保持不变"
  - "50% 替换为 [MASK]，50% 保持不变"
  - "80% 保持不变，10% 替换为 [MASK]，10% 替换为随机词"
answer: 1
explain: "BERT 采用 80/10/10 的三重替换策略：80% 替换为 [MASK] 提供主要训练信号，10% 随机词引入噪声增强鲁棒性，10% 保持原词不变以缓解预训练与微调之间的分布不匹配问题。"
```