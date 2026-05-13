### 2D-TAN — 二维时序邻接网络 (2D Temporal Adjacent Networks)

```yaml
id: 2dtan
name: 2D-TAN
full_name: 二维时序邻接网络 (2D Temporal Adjacent Networks)
year: 2020
org: PKU
paper_url: https://ojs.aaai.org/index.php/AAAI/article/view/6984
category: grounding
parent: tall
motivation: 二维网络建模时刻关系
```

#### 📝 一句话总结

2D-TAN 提出将所有候选时刻组织为二维时序特征图（行列分别表示起止时刻），并利用二维卷积网络建模相邻候选时刻之间的时序依赖关系，从而在自然语言视频时刻定位（Moment Localization）任务上实现了高效且准确的检索。

#### 🎯 核心要点

- **二维时序特征图（2D Temporal Map）**：将所有 \((i, j)\) 起止组合排列为上三角矩阵，每个位置对应一个候选时刻，天然编码了时刻之间的邻接关系
- **稀疏采样策略（Sparse Sampling）**：仅在固定间隔处采样候选时刻，减少约 50% 冗余候选而不损失性能
- **多模态融合**：采用简单的 Hadamard 乘积将语言特征与视频时刻特征融合，无需复杂注意力机制
- **二维卷积上下文建模**：在融合后的 2D 特征图上堆叠多层卷积，使每个候选时刻能感知其时序邻居的信息
- **Scaled IoU 监督**：将 IoU 通过双阈值线性缩放为连续标签，配合 BCE 损失训练，比硬二值标签更平滑
- **三大基准数据集验证**：在 Charades-STA、ActivityNet Captions、TACoS 上均达到当时最优或可比性能

#### 🔬 深入细节

##### 核心框架图

![2D-TAN 框架总览](https://ar5iv.labs.arxiv.org/html/1912.03590v2/assets/x2.png)
*图：2D-TAN 整体框架。视频被切分为 N 个片段并提取特征，所有起止组合构成 2D 时序特征图；语言查询经 LSTM 编码后与视频特征逐元素相乘融合；融合后的 2D 图经多层卷积建模邻接关系，最终输出每个候选时刻的匹配分数。*

![1D 与 2D 时序图对比](https://ar5iv.labs.arxiv.org/html/1912.03590v2/assets/x1.png)
*图：传统方法将候选时刻排成一维序列独立评分（左），2D-TAN 将其组织为二维矩阵（右），使相邻时刻在空间上也相邻，便于卷积建模上下文。*

##### 算法伪代码

```python
# 2D-TAN 核心流程伪代码
def TwoDTAN(video_clips, query_sentence):
    # Step 1: 语言编码
    word_embs = GloVe(query_sentence)           # [l_S, d_S]
    f_S = LSTM_3layer(word_embs)                 # [d_S], 取最后隐状态

    # Step 2: 视频片段特征提取
    clip_feats = []
    for clip in sample_N_clips(video_clips, N):
        feat = pretrained_CNN(clip)              # VGG / C3D
        feat = FC(feat, d_V)                     # 降维到 d_V
        clip_feats.append(feat)                  # [N, d_V]

    # Step 3: 构建 2D 时序特征图 (上三角有效)
    map_2d = zeros(N, N, d_V)
    for i in range(N):
        for j in range(i, N):                    # 仅上三角: 起始 <= 结束
            map_2d[i, j] = max_pool(clip_feats[i:j+1])

    # Step 4: 多模态融合 (Hadamard 乘积)
    f_S_expanded = f_S.expand(N, N, d_V)         # 广播到 2D 图尺寸
    fused_map = map_2d * f_S_expanded            # 逐元素相乘

    # Step 5: 2D 卷积上下文建模
    for layer in Conv2D_layers(L_layers, kernel=K):
        fused_map = ReLU(layer(fused_map))

    # Step 6: 预测匹配分数
    scores = FC(fused_map, 1).sigmoid()          # 每个 (i,j) 一个分数

    # 推理时: NMS 后取 top-n
    return NMS(scores, threshold=0.5)
```

##### 方法详解

**动机与背景**

自然语言视频时刻定位（Moment Localization with Natural Language）的目标是：给定一段未裁剪视频和一句自然语言查询，检索出视频中与查询语义匹配的时间片段。此前的方法主要有两类思路：

1. **滑动窗口方法**（如 MCN、CTRL）：预先生成大量候选时刻，逐一与查询匹配打分。这类方法将每个候选独立评估，忽略了候选之间的时序关系。
2. **序列化方法**（如 TGN）：用 RNN 沿时间轴逐步预测边界，但一维序列难以同时捕捉不同尺度的时序依赖。

> 💡 **关键洞察**：相邻的候选时刻（例如 "第 2-5 秒" 和 "第 3-6 秒"）在语义上高度相关。如果一个候选是正确答案，其邻近候选的分数也应较高。传统方法独立评分无法利用这种结构化先验。

**核心机制：二维时序特征图**

2D-TAN 的核心创新在于将所有候选时刻组织为一个二维矩阵。具体地，将视频均匀采样为 \(N\) 个片段后，任意一个候选时刻可以用起始片段索引 \(i\) 和结束片段索引 \(j\)（\(i \leq j\)）来表示。这样，所有 \(\frac{N(N+1)}{2}\) 个有效候选恰好填充一个 \(N \times N\) 上三角矩阵。

每个位置 \((i, j)\) 的特征通过对第 \(i\) 到第 \(j\) 个片段特征做 max-pooling 得到：

$$\mathbf{f}_{i,j}^{M} = \text{maxpool}(\mathbf{f}_i^V, \mathbf{f}_{i+1}^V, \ldots, \mathbf{f}_j^V)$$

这种设计的精妙之处在于：**在 2D 图上空间相邻的位置，对应的时间段也是时序相邻的**。例如 \((i, j)\) 的右邻 \((i, j+1)\) 表示结束时刻后移一步，下邻 \((i+1, j)\) 表示起始时刻后移一步。这使得标准的 2D 卷积可以自然地建模时序邻接关系。

**多模态融合**

语言查询经 GloVe 词嵌入后送入三层 LSTM，取最后一个隐状态作为句子表示 \(\mathbf{f}^S \in \mathbb{R}^{d_S}\)。融合采用简单的 Hadamard 乘积（逐元素相乘）：

$$\mathbf{F}_{i,j} = \mathbf{f}^S \odot \mathbf{f}_{i,j}^M$$

论文在消融实验中对比了三种融合方式：拼接（Concatenation）、逐元素加法（Addition）和 Hadamard 乘积，发现 **Hadamard 乘积效果最好**。直觉上，乘法融合相当于让语言特征对视频特征的每个维度进行"门控"，能更精确地筛选与查询相关的视觉信息。

**二维卷积上下文建模**

融合后的 2D 特征图经过 \(L\) 层卷积（kernel size 为 \(K\)），每层后接 ReLU 激活：

$$\mathbf{F}^{(l+1)} = \text{ReLU}(\text{Conv2D}(\mathbf{F}^{(l)}))$$

随着层数增加，每个位置的感受野逐渐扩大，能够感知更远的时序邻居。消融实验表明：**感受野大小是性能的关键因素**——当 kernel=1（无邻居信息）时退化为独立评分，性能与 CTRL 相当；增大感受野后性能显著提升，但饱和后继续增大收益有限。

> ⚠️ **注意**：在固定感受野大小的前提下，改变层数和 kernel size 的具体组合对性能影响有限，说明关键在于感受野覆盖范围而非网络深度本身。

**稀疏采样策略**

完整的 2D 图包含 \(\frac{N(N+1)}{2}\) 个候选，其中存在大量高度重叠的冗余候选。2D-TAN 提出稀疏采样：仅保留起止索引间隔为固定步长倍数的候选，可减少约 50% 的计算量。实验表明稀疏采样与密集枚举性能相当。

**训练：Scaled IoU 监督**

传统方法用硬阈值将候选标记为正/负样本。2D-TAN 采用更平滑的 Scaled IoU 作为连续标签：

$$y_i = \begin{cases} 0 & \text{IoU}_i \leq t_{min} \\ \frac{\text{IoU}_i - t_{min}}{t_{max} - t_{min}} & t_{min} < \text{IoU}_i < t_{max} \\ 1 & \text{IoU}_i \geq t_{max} \end{cases}$$

其中 \(t_{min}\) 和 \(t_{max}\) 为缩放阈值（Charades-STA 和 ActivityNet 上设为 0.5/1.0，TACoS 上设为 0.3/0.7）。训练损失为标准 BCE：

$$\mathcal{L} = \frac{1}{C} \sum_{i=1}^{C} y_i \log p_i + (1 - y_i) \log(1 - p_i)$$

这种设计让模型学会区分"高度匹配"和"部分匹配"的候选，而非简单的二分类。

**推理流程**

推理时，对 2D 图中所有有效位置的预测分数应用非极大值抑制（NMS，阈值 0.5），取 top-n 作为最终检索结果。

**与传统方法的对比**

| 特性 | 滑动窗口方法 (CTRL等) | RNN方法 (TGN等) | **2D-TAN** |
|------|----------------------|-----------------|------------|
| 候选组织方式 | 一维列表 | 序列化 | **二维矩阵** |
| 候选间关系建模 | ❌ 独立评分 | 部分（单向） | ✅ 2D卷积全局建模 |
| 多尺度覆盖 | 需多尺度窗口 | 隐式 | **天然覆盖所有尺度** |
| 计算效率 | 候选数多 | 序列瓶颈 | **稀疏采样 + 并行卷积** |

**实验结果亮点**

- 在 Charades-STA 上 Rank1@0.7 达到 **23.31%**，大幅超越此前最优 MAN 的 20.54%
- 在 ActivityNet Captions 上 Rank1@0.5 达到 **44.51%**，超越 CMIN 的 43.40%
- 仅用 136 个候选（N=16）即可达到 CMIN（1400 个候选）的可比性能，验证了上下文建模的有效性

#### 🧪 练习题

```yaml
question: "2D-TAN 中二维时序特征图的位置 (i, j) 代表什么含义？"
options:
  - "第 i 帧和第 j 帧的视觉相似度"
  - "从第 i 个片段到第 j 个片段的候选时刻特征"
  - "第 i 个词和第 j 个视频片段的跨模态注意力权重"
  - "视频第 i 秒到第 j 秒的光流特征"
answer: 1
explain: "2D 时序图的每个上三角位置 (i, j) 对应一个从第 i 个视频片段到第 j 个片段的候选时刻，其特征由对应片段特征的 max-pooling 得到。"
```