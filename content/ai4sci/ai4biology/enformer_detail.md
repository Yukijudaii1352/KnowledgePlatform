### Enformer — 用自注意力整合长程调控序列的表达预测模型

```yaml
id: enformer
name: Enformer
full_name: Enformer (Enformer)
year: '2021.10'
org: Google DeepMind
paper_url: https://www.nature.com/articles/s41592-021-01252-x
category: genomics
parent: —
motivation: Transformer捕捉长程基因相互作用
```

#### 📝 一句话总结

Enformer 将卷积序列编码器与 Transformer 自注意力结合，从约 200 kb DNA 输入直接预测人和小鼠的表达、染色质开放性、组蛋白修饰和转录因子结合轨道。它解决了 Basenji2/ExPecto 等卷积模型长程信息流不足的问题，把可利用的调控距离从约 20 kb 扩展到约 100 kb，并改进了 enhancer-promoter 联系和非编码变异效应预测。

#### 🎯 核心要点

- **长输入多任务预测**：输入 196,608 bp one-hot DNA，输出 128 bp 分辨率的基因组轨道；人类头预测 5,313 个 tracks，小鼠头预测 1,643 个 tracks
- **三段式架构**：7 个卷积/池化块压缩序列长度，11 个 Transformer block 建模长程交互，裁剪中心区域后接物种特异输出头
- **更大感受野**：用全局自注意力替代 Basenji2 的 dilated convolution，使 TSS 附近预测可以直接整合远端 enhancer、insulator 和 TAD boundary 信息
- **自定义相对位置编码**：使用指数、gamma、central mask 等相对位置基函数，并加入方向性项区分 TSS 上游/下游
- **Poisson 负对数似然训练**：把 CAGE、DNase/ATAC、ChIP-histone、ChIP-TF 等 read-count tracks 作为多任务计数预测目标
- **序列级变异打分**：分别前向计算 reference allele 与 alternative allele 的输出差异，得到带方向的 regulatory effect score
- **解释能力**：attention 权重和 gradient × input 能定位 CRISPRi 验证 enhancer，并观察到跨 TAD boundary 注意力降低的模式
- **工程发布**：论文页面、DeepMind 代码、TF-Hub 预训练模型和示例 notebook 均公开，便于对任意 DNA 序列做表达和变异效应预测

#### 🔬 深入细节

##### 模型架构图与可访问来源

![Enformer model architecture](https://media.springernature.com/full/springer-static/esm/art%3A10.1038%2Fs41592-021-01252-x/MediaObjects/41592_2021_1252_Fig5_ESM.jpg)
*图：Enformer Extended Data Fig. 1。左侧是 Enformer 主架构，中间是用 dilated convolution 替换 Transformer 的消融版本，右侧是 Basenji2；图中标出了卷积塔、Transformer block、裁剪层和人/鼠两个输出头。*

可访问来源：论文页面 `https://www.nature.com/articles/s41592-021-01252-x`，图像直链来自 Springer Nature；官方代码在 `https://github.com/deepmind/deepmind-research/tree/master/enformer`，预训练模型在 `https://tfhub.dev/deepmind/enformer/1`。

##### 算法伪代码

```python
# Enformer 训练与变异效应预测伪代码
def enformer_forward(one_hot_dna):
    # one_hot_dna: [196608, 4], A/C/G/T/N one-hot
    x = one_hot_dna

    for block in range(7):
        x = conv_block(x)                 # motif/local pattern extraction
        x = attention_pool(x)             # downsample to 128 bp bins

    # x length becomes 1536 positions, each roughly summarizes 128 bp
    for block in range(11):
        x = transformer_block(
            x,
            relative_position_basis=["exponential", "gamma", "central_mask"],
        )

    x = crop(x, left=320, right=320)       # keep 896 central bins
    human_tracks = pointwise_head_human(x) # [896, 5313], softplus counts
    mouse_tracks = pointwise_head_mouse(x) # [896, 1643]
    return human_tracks, mouse_tracks


def train_enformer(batch):
    seq, organism, observed_tracks = batch
    human_pred, mouse_pred = enformer_forward(seq)
    pred = human_pred if organism == "human" else mouse_pred
    loss = poisson_negative_log_likelihood(pred, observed_tracks)
    optimizer.step(loss)


def score_variant(reference_seq, alternative_seq, target_track, target_bins):
    y_ref = enformer_forward(reference_seq)[0][target_bins, target_track]
    y_alt = enformer_forward(alternative_seq)[0][target_bins, target_track]
    # signed effect: positive means alternative allele increases predicted activity
    return y_alt.sum() - y_ref.sum()
```

##### 输入、输出与为什么要先卷积再 Transformer

Enformer 的输入是长度 \(196{,}608\) bp 的 DNA one-hot 序列：

$$
x_t \in \{[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1],[0,0,0,0]\}
$$

其中最后一种表示未知碱基 \(N\)。直接对 196k 个碱基做全局注意力计算不可行，所以模型先用 7 个卷积块和 pooling 把序列压缩到 1,536 个位置，每个位置约对应 128 bp。这个尺度接近许多调控元件的常用 bin size，既保留局部 motif 信息，又把 Transformer 的序列长度降到可训练范围。

Transformer 之后只对中心 896 个 bin 计算损失，对应 \(896 \times 128=114{,}688\) bp。两侧各裁剪 320 个 bin 的原因是边缘位置只能看到单侧上下文，会系统性缺少序列边界外的调控元件；裁剪中心区域能让训练目标更公平。

##### 自注意力如何捕捉 enhancer-promoter 远程作用

在 Transformer block 中，每个 128 bp bin 都可以对所有其他 bin 做注意力：

$$
\operatorname{Attention}(Q,K,V)
= \operatorname{softmax}\left(\frac{QK^\top}{\sqrt{d}} + B_{\Delta}\right)V
$$

这里 \(B_{\Delta}\) 是由相对距离 \(\Delta=i-j\) 生成的位置 bias。Enformer 的位置基函数不仅编码距离大小，还用带符号的非对称项表示上游/下游方向。这样，TSS 位置在更新表征时可以直接从远端 enhancer、promoter-proximal 元件和 TAD boundary 汇聚信息，而不必像卷积模型那样依赖许多层局部传播。

论文中的关键对比是 Basenji2 和 ExPecto 的有效距离约为 20 kb，而 Enformer 可以利用约 100 kb 范围内的调控序列。对 enhancer-gene pair 而言，这意味着模型能看到更多高置信 enhancer，尤其是远离 TSS、但对组织特异表达重要的元件。

##### Attention pooling 与计数建模损失

卷积塔中的 attention pooling 不是简单 max pooling，而是对一个池化窗口内的位置做通道相关的加权平均。对第 \(j\) 个通道：

$$
h_j =
\frac{\sum_i \exp(x_i \cdot w_j)x_{ij}}
{\sum_i \exp(x_i \cdot w_j)}
$$

直觉上，模型可以为不同通道选择不同的局部 motif 或信号峰，而不是只保留最大值。输出端使用 softplus/非负计数预测，并延续 Basenji2 的 Poisson negative log-likelihood：

$$
\mathcal{L}_{\text{Poisson}}
= \sum_{b,t}\left(\hat{y}_{b,t} - y_{b,t}\log \hat{y}_{b,t}\right) + \text{const}
$$

其中 \(b\) 是 128 bp bin，\(t\) 是某个 CAGE、DNase/ATAC、ChIP-histone 或 ChIP-TF track。多任务训练迫使同一个序列表征同时解释转录活性、染色质开放性、组蛋白修饰和 TF binding，因而学到更通用的调控语法。

##### 变异效应预测与解释

对非编码变异，Enformer 不需要额外训练分类器。给定 reference 和 alternative 序列，分别前向预测同一组 tracks，然后取差值：

$$
\Delta_{v,t}
= \sum_{b \in \mathcal{B}}\hat{y}_{t,b}(x^{\text{alt}})
- \sum_{b \in \mathcal{B}}\hat{y}_{t,b}(x^{\text{ref}})
$$

\(\Delta_{v,t}\) 是有方向的：正值表示 alternative allele 提高该 track 的预测活性，负值表示降低。论文进一步把这种 signed annotation 与 GTEx eQTL summary statistics 做 SLDP 回归，发现 Enformer 比 Basenji2 更能对齐组织相关 eQTL 信号。

解释上，Enformer 可以使用两类信号：一类是对目标 CAGE track 的 gradient × input，另一类是 Transformer attention。前者是 cell-type/track-specific 的，适合问“这个变异对 K562 CAGE 的影响来自哪里”；后者是模型内部共享注意力，适合观察远端区域、TAD boundary 和 insulator 的信息流。论文显示，在 HNRNPA1 等基因位点，Enformer 能把贡献分数分配给 20 kb 以外的 CRISPRi 验证 enhancer，而 Basenji2 因感受野限制无法做到。

##### 与传统 CNN 调控模型的区别

| 维度 | Basenji2 / ExPecto | Enformer |
|------|--------------------|----------|
| 长程建模 | dilated/local convolution 逐层扩散 | Transformer 全局自注意力直接交互 |
| 有效调控距离 | 约 20 kb | 约 100 kb |
| 位置编码 | 卷积结构隐含局部距离 | 自定义相对位置基函数，含方向性 |
| 输出任务 | 多组学 tracks / 表达 | 同类多任务输出，但有更大上下文 |
| 变异解释 | 受感受野限制 | 可定位远端 enhancer、TAD boundary 和带方向变异效应 |

> 💡 关键：Enformer 的创新不是简单把 Transformer 放到 DNA 上，而是在“局部 motif 抽取”和“远程调控整合”之间做了工程折中：卷积塔负责把 196k bp 压缩到可注意力计算的 128 bp bin，Transformer 负责跨 bin 建模 enhancer-promoter 和 insulator 关系。

#### 🧪 练习题

```yaml
question: "Enformer 相比 Basenji2 改进基因表达预测的核心机制是什么？"
options:
  - "用 Transformer 全局自注意力替代主要的 dilated convolution 长程传播，从而扩大可整合的远端调控范围"
  - "完全不使用卷积层，只对 196,608 个碱基直接做全局注意力"
  - "把 DNA 翻译成蛋白质序列后再预测表达"
  - "只训练人类 CAGE 一个输出任务，避免多任务干扰"
answer: 0
explain: "Enformer 仍使用卷积塔做局部抽取和下采样，但关键长程模块换成 Transformer，使 TSS 能直接整合远端 enhancer、insulator 和 TAD boundary 信息。"
```
