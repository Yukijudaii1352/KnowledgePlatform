### BERT: 双向编码器表征 (Bidirectional Encoder Representations from Transformers)

```yaml
id: bert
name: BERT
full_name: 双向编码器表征 (Bidirectional Encoder Representations from Transformers)
year: "2018"
org: Google AI Language
paper_url: https://arxiv.org/abs/1810.04805
category: architecture
parent: Transformer
motivation: 通过掩码语言建模实现深度双向预训练，解决单向语言模型的局限性
```

#### 📝 一句话总结
BERT 通过**掩码语言模型（MLM）**和**下一句预测（NSP）**两个无监督任务在未标注语料上进行深度双向预训练，经统一微调框架在 11 项 NLP 任务上全面刷新 SOTA，将 GLUE 基准推至 82.1%。

#### 🎯 核心要点
- 提出**掩码语言模型（MLM）**：随机遮盖 15% 输入 token 并预测，实现真正的深度双向上下文建模，打破单向语言模型限制
- 提出**下一句预测（NSP）**：二分类任务判断两句是否相邻，赋能句子间关系推理
- 使用统一的 **Transformer 编码器架构**（BASE=12 层/LARGE=24 层），预训练与微调完全共享参数，仅替换输出层
- 输入由 **Token + Segment + Position** 三种 Embedding 求和构成，`[CLS]` 用于聚合序列表征
- 在 **11 项 NLP 基准**上达到 SOTA：GLUE 82.1、SQuAD v1.1 F1 93.2、SQuAD v2.0 F1 83.1、SWAG 86.3%（超人类基准）
- 验证**深度双向性**的压倒性优势：同等参数量下，BERT_BASE 比单向 GPT 在 GLUE 上高出 4.5 个百分点
- 提供 BASE（110M）和 LARGE（340M）两种规格，微调极快（单云 TPU 上 1 小时内完成大多数任务）

#### 🔬 深入细节

##### 1. 背景与动机：单向语言模型的根本局限

2018 年前，NLP 预训练存在两条路线，但均无法实现真正的深度双向表征：

| 方法     | 架构          | 方向性       | 缺陷                                         |
| -------- | ------------- | ------------ | -------------------------------------------- |
| ELMo     | 双层 BiLSTM   | 浅层双向拼接 | 左→右和右→左独立训练，仅将隐状态拼接，无深层交互 |
| OpenAI GPT | Transformer 解码器 | 左→右单向 | 每 token 只能关注上文，对 QA/NLI 等需双向理解的任务不利 |

**核心洞察**：标准条件语言模型（如 GPT）只能用单向 Transformer 解码器，因为若允许每 token 同时关注左右上下文，深层网络中 token 会"间接看到自己"，使预测任务退化为平凡解。BERT 受 **Cloze 任务**（完形填空）启发，通过随机遮盖部分 token 迫使模型利用双向上下文预测被遮盖词，巧妙绕开了这一限制。

##### 2. 核心示意图

![BERT 预训练与微调框架图](https://ar5iv.org/html/1810.04805/assets/figures/figure1.png)
*图 1：BERT 的整体预训练和微调流程。预训练阶段使用 MLM 和 NSP 双任务在无标注语料上训练；微调阶段使用相同的模型架构，为每个下游任务替换对应的输出层，所有参数端到端更新。*

![BERT 输入表示](https://ar5iv.org/html/1810.04805/assets/figures/figure2.png)
*图 2：BERT 输入表示 = Token Embedding + Segment Embedding + Position Embedding 三者和。首个 token 固定为 `[CLS]`，句子间用 `[SEP]` 分隔，Segment Embedding 区分句子 A/B。*

##### 3. 模型架构与超参

BERT 完全基于 Transformer 编码器（Vaswani et al., 2017），关键设计：

| 参数          | BERT_BASE    | BERT_LARGE   |
| ------------- | ------------ | ------------ |
| 层数 L        | 12           | 24           |
| 隐层维度 H    | 768          | 1024         |
| 注意力头数 A  | 12           | 16           |
| 前馈维度      | 3072 (4×H)   | 4096 (4×H)   |
| 总参数量      | 110M         | 340M         |

> 💡 **关键设计**：BASE 特意设为与 OpenAI GPT 参数量相同（110M），以便公平对比双向 vs 单向架构的效果差异——排除了参数量带来的干扰。

使用 **WordPiece 分词**，词表大小 30,000。每 token 的输入向量为三部分之和：Token Embedding（词汇语义）+ Segment Embedding（A/B 句标识）+ Position Embedding（位置编码）。`[CLS]` 对应的最终隐向量作为整序列的聚合表征，供分类任务使用。

##### 4. 双任务预训练详解

**（一）掩码语言模型（Masked LM，MLM）**

```python
# MLM 伪代码
for each sequence:
    masked_positions = random.sample(tokens, 15%)  # 随机选15%
    for pos in masked_positions:
        r = random()
        if r < 0.8:
            input[pos] = [MASK]          # 80% 替换为掩码标记
        elif r < 0.9:
            input[pos] = random_token()  # 10% 替换为随机词
        else:
            input[pos] = original_token  # 10% 保持原样
    loss = CrossEntropy(model(input)[masked_positions], original_tokens[masked_positions])
    optimizer.step(loss)
```

> ⚠️ **为何不全部用 `[MASK]`？** 微调阶段没有 `[MASK]` 标记，若预训练时 100% 用 `[MASK]` 会导致预训练/微调不匹配。80/10/10 混合策略部分缓解了此问题。

关键细节：
- 仅对被遮盖位置计算损失，不重建整个输入（区别于去噪自编码器 DAE）
- `[MASK]` token 在输入中替换原始词，其最终隐向量经全连接层 + Softmax 预测原始词 ID
- 消融实验（附录 C.2）表明该策略大幅优于纯 masking

**（二）下一句预测（Next Sentence Prediction，NSP）**

构造二分类任务：
- **正例（50%）**：从语料中选取真实相邻的句子对，标签为 `IsNext`
- **负例（50%）**：从随机文档取任意句与当前句配对，标签为 `NotNext`
- 使用 `[CLS]` 的最终隐向量 C 经 Softmax 分类

消融显示：移除 NSP 后 QA 任务 F1 下降 3.3，NLI 任务下降 2.2——验证了句子间关系预训练的重要性。

##### 5. 预训练设置

| 配置项       | 值                                  |
| ------------ | ----------------------------------- |
| 语料         | BooksCorpus（8 亿词）+ 英文维基百科（25 亿词） |
| 优化器       | Adam（β₁=0.9, β₂=0.999）           |
| 学习率       | 1e-4，前 10,000 步 warmup 后线性衰减 |
| Dropout      | 所有层 0.1                          |
| 激活函数     | GELU                                |
| Batch Size   | 256 序列 × 512 token                |
| 训练硬件     | BASE: 4 块云 TPU × 4 天 / LARGE: 16 块云 TPU × 4 天 |

##### 6. 微调机制：一键适配下游任务

![BERT 微调示意图](https://ar5iv.org/html/1810.04805/assets/figures/figure3.png)
*图 3：BERT 在四类下游任务上的微调方式：(a) 句对分类如 MNLI，(b) 单句分类如 SST-2，(c) 阅读理解 SQuAD（预测答案 span 的 start/end），(d) 序列标注 NER。所有任务共享预训练的 Transformer 编码器，仅替换最上层的输出结构。*

核心特性：
- 所有预训练参数参与微调，不冻结任何层
- SQuAD 单云 TPU 约 30 分钟完成微调
- 同一预训练权重可初始化不同下游任务的微调模型

##### 7. 实验结果与深度分析

**GLUE 基准（9 项 NLU 任务）**：

| 模型               | Average |
| ------------------ | ------- |
| BiLSTM+ELMo+Attn   | 71.0    |
| OpenAI GPT         | 75.1    |
| **BERT_BASE**      | **79.6** |
| **BERT_LARGE**     | **82.1** |

BERT_LARGE 在 CoLA（语言可接受性）+15.1、RTE（文本蕴含）+14.1——证明双向表征对深层语言理解有本质提升。

**SQuAD 阅读理解**：v1.1 F1 93.2（+1.5），v2.0 F1 83.1（+5.1），在包含不可回答问题的 v2.0 上，BERT 将 `[CLS]` 的 span 用于 "no answer" 检测。

**SWAG 常识推理**：LARGE 86.3%，**超越人类基准 85.0%**，证明预训练模型可编码丰富常识知识。

**消融研究关键发现**：
- 移除 NSP → QA -3.3 F1，NLI -2.2
- 单向 LTR LM 替代 MLM → 大幅下降（尤其在 QA 上）
- BiLSTM 替代 Transformer 编码器 → GLUE -2.5+
- 模型增大对小数据集（如 CoLA）仍有持续提升

##### 8. BERT vs 同期方法：一张表看清本质区别

| 维度           | ELMo                | OpenAI GPT          | BERT                 |
| -------------- | ------------------- | ------------------- | -------------------- |
| 架构           | 双层 BiLSTM         | Transformer 解码器  | Transformer 编码器   |
| 方向性         | 浅层拼接双向        | 单向（左→右）       | **深度全双向**       |
| 预训练任务     | 独立 LM             | 单向 LM             | **MLM + NSP**        |
| 微调方式       | Feature-based       | Fine-tuning         | Fine-tuning          |
| 跨任务适配     | 需改下游模型架构    | 通用，但受限方向性  | **通用全双向**       |
| GLUE 分数      | 71.0                | 75.1                | **82.1**             |

##### 9. 贡献与后续影响

1. **范式奠基**：开创"大规模双向预训练 + 通用微调"的 NLP 范式，成为 RoBERTa、ALBERT、XLNet、ELECTRA、T5 等的基础
2. **双向性实证**：系统证明深度双向表征在句子级推理和 span 抽取任务上相比单向有量级优势
3. **工程遗产**：30K WordPiece 词表、GELU 激活、层归一化位置等成为标准实践

##### 10. 局限与改进方向

- **`[MASK]` 不匹配**：80/10/10 策略仅部分缓解，微调时 `[MASK]` 标记不存在的问题——XLNet 通过排列语言模型彻底消除
- **NSP 任务简单**：负采样使模型依赖主题预测，RoBERTa 证明去除 NSP 并增大 batch/数据反而提升性能
- **静态掩码**：每 epoch 掩码不变，RoBERTa 引入动态掩码
- **计算开销大**：LARGE 需 16 块 TPU 训练 4 天，ALBERT 通过参数共享大幅降低

##### 核心公式

**自注意力机制**：
$$\text{Attention}(Q, K, V) = \text{softmax}\!\left(\frac{QK^T}{\sqrt{d_k}}\right)V$$

**MLM 损失**（仅对被遮盖位置）：
$$\mathcal{L}_{\text{MLM}} = -\sum_{i \in \text{masked}} \log P(w_i \mid \text{context})$$

**NSP 损失**（二分类交叉熵）：
$$\mathcal{L}_{\text{NSP}} = -[\,y \log p + (1-y) \log(1-p)\,]$$

**最终预训练损失**：
$$\mathcal{L} = \mathcal{L}_{\text{MLM}} + \mathcal{L}_{\text{NSP}}$$

#### 🧪 练习题

```yaml
question: "BERT 在预训练时对选中的 15% token 进行如下处理：80% 替换为 [MASK]、10% 替换为随机词、10% 保持原样。这种混合策略的主要目的是什么？"
options:
  - "增加训练数据多样性，防止过拟合"
  - "缓解预训练阶段使用 [MASK] 而微调阶段没有 [MASK] 的不匹配问题"
  - "加速模型收敛，减少所需的训练步数"
  - "防止模型过度依赖位置编码信息"
answer: 1
explain: "如果预训练100%用[MASK]，模型会对该标记产生依赖，而微调阶段不存在[MASK]，导致表征分布偏移。80/10/10 混合策略通过引入保持原词和随机替换的 token，迫使模型在预测时兼顾上下文线索，部分缓解了此不匹配。"
```

---

*本文基于 BERT 原始论文 [arxiv:1810.04805](https://arxiv.org/abs/1810.04805) 撰写。*