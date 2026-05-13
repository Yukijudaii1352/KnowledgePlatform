### Word2Vec

```yaml
id: word2vec
name: Word2Vec
full_name: "词向量 (Word2Vec)"
year: 2013
org: Google
paper_url: "https://arxiv.org/abs/1301.3781"
category: foundation
parent: "—"
motivation: "提出CBOW和Skip-gram两种高效词向量训练架构，奠定现代词嵌入基础"
```

#### 📝 一句话总结

Word2Vec 提出了 CBOW（连续词袋）和 Skip-gram 两种轻量级神经网络架构，通过去除隐藏层非线性变换大幅降低计算复杂度，使得在数十亿词规模语料上训练高质量词向量成为可能，所学向量在词类比任务中展现出显著的线性语义/句法规律性。

#### 🎯 核心要点

- **两种新架构**：CBOW（用上下文预测中心词）和 Skip-gram（用中心词预测上下文），均去除了传统 NNLM 的隐藏层
- **计算复杂度大幅降低**：CBOW 训练复杂度 \(O(N \times D + D \times \log_2 V)\)，Skip-gram 为 \(O(C \times (D + D \times \log_2 V))\)，远低于 NNLM 的 \(O(N \times D + N \times D \times H + H \times V)\)
- **词向量线性规律性**：发现 \(\text{vec}(\text{"King"}) - \text{vec}(\text{"Man"}) + \text{vec}(\text{"Woman"}) \approx \text{vec}(\text{"Queen"})\) 等向量算术关系
- **大规模评测基准**：构建包含 8869 个语义问题和 10675 个句法问题的 Semantic-Syntactic Word Relationship 测试集
- **分布式训练支持**：基于 DistBelief 框架实现大规模并行训练，1000 维 Skip-gram 在 6B 词上达到 65.6% 总准确率
- **Microsoft Sentence Completion Challenge**：Skip-gram + RNNLM 组合达到 58.9% 新 SOTA

#### 🔬 深入细节

##### 模型架构

论文的核心贡献是提出两种计算高效的词向量学习架构。下图展示了 CBOW 和 Skip-gram 的结构对比：

![Word2Vec 架构图：CBOW 与 Skip-gram](https://ar5iv.labs.arxiv.org/html/1301.3781v3/assets/x1.png)
*图：左侧为 CBOW 架构（上下文词预测中心词），右侧为 Skip-gram 架构（中心词预测上下文词）。两者均无隐藏层非线性变换。*

##### 算法伪代码

```python
# Word2Vec 训练核心逻辑（简化版）

# === CBOW ===
for sentence in corpus:
    for t, w_t in enumerate(sentence):
        # 取上下文窗口 [t-C, t+C] 内的词（不含 w_t）
        context = sentence[t-C:t] + sentence[t+1:t+C+1]
        # 投影层：对上下文词向量求和（或平均）
        h = sum(W_input[w] for w in context)
        # 输出层：用 hierarchical softmax 预测 w_t
        loss = -log P_hierarchical_softmax(w_t | h)
        update(W_input, W_output, loss)

# === Skip-gram ===
for sentence in corpus:
    for t, w_t in enumerate(sentence):
        # 输入层：取中心词向量
        h = W_input[w_t]
        # 对窗口内每个上下文词分别预测
        for c in range(-C, C+1):
            if c == 0: continue
            w_c = sentence[t + c]
            loss = -log P_hierarchical_softmax(w_c | h)
            update(W_input, W_output, loss)
```

##### 动机与背景

在 Word2Vec 之前，主流的词向量学习方法依赖于带有隐藏层的神经网络语言模型（NNLM）或循环神经网络语言模型（RNNLM）。这些模型虽然能学到有意义的词表示，但存在严重的计算瓶颈：

- **NNLM**（Bengio et al., 2003）的训练复杂度为 \(Q = N \times D + N \times D \times H + H \times V\)，其中瓶颈在于隐藏层到输出层的 \(H \times V\) 项（即使使用 Hierarchical Softmax 降至 \(H \times \log_2 V\)，隐藏层计算 \(N \times D \times H\) 仍然昂贵）
- **RNNLM**（Mikolov et al., 2010）复杂度为 \(Q = H \times H + H \times V\)，虽然没有投影层，但循环连接 \(H \times H\) 和输出层仍是瓶颈

> 💡 关键洞察：词向量的质量并不一定需要复杂的非线性模型。通过去除隐藏层，可以在保持向量质量的同时将训练速度提升数个数量级。

##### 核心机制详解

**1. CBOW（Continuous Bag-of-Words）**

CBOW 的设计灵感来自 NNLM，但做了两个关键简化：
- **去除隐藏层**：投影层直接连接到输出层，消除了 \(N \times D \times H\) 的计算开销
- **共享投影矩阵**：所有上下文词共享同一个投影矩阵，且投影层通过**求和**（而非拼接）聚合上下文信息

训练复杂度降为：

$$Q_{\text{CBOW}} = N \times D + D \times \log_2(V)$$

其中 \(N\) 为上下文窗口大小，\(D\) 为词向量维度，\(V\) 为词表大小。注意投影层是所有上下文词向量的加权平均，因此词序信息被丢弃（这也是"Bag-of-Words"名称的由来）。与标准 BOW 不同的是，CBOW 使用**连续**的分布式表示，且利用上下文的**未来词**（而非仅历史词）。

**2. Skip-gram**

Skip-gram 反转了 CBOW 的预测方向：给定中心词，预测其上下文中的每个词。其训练目标是最大化：

$$\frac{1}{T}\sum_{t=1}^{T}\sum_{-c \leq j \leq c, j \neq 0} \log p(w_{t+j} \mid w_t)$$

其中 \(T\) 为语料总词数，\(c\) 为上下文窗口半径。基本的 softmax 定义为：

$$p(w_O \mid w_I) = \frac{\exp({v'_{w_O}}^{\top} v_{w_I})}{\sum_{w=1}^{V} \exp({v'_w}^{\top} v_{w_I})}$$

训练复杂度为：

$$Q_{\text{Skip-gram}} = C \times (D + D \times \log_2(V))$$

其中 \(C\) 为上下文窗口的最大距离。Skip-gram 对每个上下文位置独立预测，因此在语义关系捕获上表现更优（实验中语义准确率达 66.1%，远超 CBOW 的 57.3%）。

> ⚠️ 注意：增大窗口 \(C\) 会线性增加训练时间，但能捕获更远距离的语义关系。论文中 Skip-gram 的训练时间约为 CBOW 的 3 倍。

**3. Hierarchical Softmax 加速**

两种架构均使用 Hierarchical Softmax 替代标准 softmax，将输出层复杂度从 \(O(V)\) 降至 \(O(\log_2 V)\)。这通过构建一棵 Huffman 树实现：高频词获得更短的编码路径，进一步加速训练。

##### 训练流程与关键超参数

- **语料**：Google News 语料库，约 60 亿 tokens，词表限制为最高频的 100 万词
- **优化器**：SGD + 线性学习率衰减（初始 lr = 0.025，线性衰减至 0）
- **训练轮次**：3 个 epoch（后续发现 1 epoch + 2 倍数据量效果相当）
- **维度与数据量的关系**：论文发现维度和数据量需**同步增长**才能持续提升效果，单独增加某一方面会遇到收益递减

##### 实验结果与对比

在 640 维、相同训练数据条件下的架构对比（Table 3）：

| 模型 | 语义准确率 | 句法准确率 |
|------|-----------|-----------|
| RNNLM | 9% | 36% |
| NNLM | 23% | 53% |
| CBOW | 24% | 64% |
| **Skip-gram** | **55%** | 59% |

使用 DistBelief 分布式训练、1000 维向量、6B 词数据（Table 6）：

| 模型 | 语义准确率 | 句法准确率 | 总准确率 | 训练成本 |
|------|-----------|-----------|---------|---------|
| NNLM | 34.2% | 64.5% | 50.8% | 14×180 CPU·天 |
| CBOW | 57.3% | 68.9% | 63.7% | 2×140 CPU·天 |
| Skip-gram | **66.1%** | 65.1% | **65.6%** | 2.5×125 CPU·天 |

> 💡 关键发现：CBOW 在句法任务上更强，Skip-gram 在语义任务上大幅领先。两者训练成本仅为 NNLM 的约 1/10。

##### 与传统方法的核心区别

| 特性 | NNLM / RNNLM | Word2Vec (CBOW / Skip-gram) |
|------|--------------|----------------------------|
| 隐藏层 | 有（非线性激活） | 无（线性投影） |
| 输出层 | Full softmax 或 HS | Hierarchical Softmax |
| 训练目标 | 语言模型（下一词预测） | 词向量质量（上下文预测） |
| 计算复杂度 | \(O(N \times D \times H)\) 级 | \(O(N \times D)\) 级 |
| 可扩展性 | 数亿词级别 | 数十亿至万亿词级别 |
| 词序信息 | 保留（拼接） | CBOW 丢弃 / Skip-gram 部分保留 |

Word2Vec 的核心哲学是：**放弃精确的语言建模能力，换取在海量数据上高效学习词向量的能力**。这一取舍被证明是极其成功的——简单架构 + 大数据的组合远胜复杂架构 + 小数据。

#### 🧪 练习题

```yaml
question: "关于 CBOW 和 Skip-gram 架构，以下哪项描述是正确的？"
options:
  - "CBOW 用中心词预测上下文，Skip-gram 用上下文预测中心词"
  - "两者都包含一个带非线性激活函数的隐藏层"
  - "Skip-gram 在语义类比任务上显著优于 CBOW，而 CBOW 在句法任务上更强"
  - "Skip-gram 的训练速度比 CBOW 更快"
answer: 2
explain: "实验表明 Skip-gram 语义准确率（66.1%）远超 CBOW（57.3%），而 CBOW 句法准确率（68.9%）高于 Skip-gram（65.1%）。选项 A 方向反了，选项 B 错误（两者均无隐藏层），选项 D 错误（Skip-gram 约为 CBOW 的 3 倍训练时间）。"
```