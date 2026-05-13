### TSN — 时序段网络 (Temporal Segment Networks)

```yaml
id: tsn
name: TSN
full_name: "时序段网络 (Temporal Segment Networks)"
year: 2016
org: CUHK
paper_url: "https://arxiv.org/abs/1608.00859"
category: foundation
parent: "—"
motivation: "稀疏采样+段共识机制"
```

#### 📝 一句话总结

TSN 提出基于稀疏时序采样与段共识函数的视频级表示学习框架，通过将长视频均匀分段并聚合各段特征，以极低计算开销建模完整视频的时序结构，在动作识别任务上取得了当时最优性能。

#### 🎯 核心要点

- 稀疏时序采样策略：将视频均匀划分为 K 个段，每段随机采样一个片段（snippet），以低成本覆盖整段视频
- 段共识函数（Segment Consensus）：通过聚合函数 \(G\)（均值、最大值、加权平均等）融合各段预测，实现视频级分类
- 多模态输入：支持 RGB、光流（Optical Flow）、RGB 差分（Warped Optical Flow）三种输入模态
- 跨模态预训练（Cross-modality Pre-training）：利用 RGB 模型的 ImageNet 预训练权重初始化光流网络
- 部分批归一化（Partial BN）：冻结除第一层外的所有 BN 层均值/方差，缓解小数据集过拟合
- 数据增强策略：角点裁剪（Corner Cropping）与多尺度裁剪（Multi-scale Cropping）
- 在 UCF101 上达到 94.2%，HMDB51 上达到 69.4% 的识别准确率

#### 🔬 深入细节

![TSN 框架示意图](https://ar5iv.labs.arxiv.org/html/1608.00859/assets/x1.png)
*图：TSN 的整体框架。视频被均匀分为 K 段，每段随机采样一个片段送入共享权重的 ConvNet，最终通过段共识函数聚合得到视频级预测。*

```python
# TSN 核心逻辑伪代码
def TSN(video, K=3, consensus='avg'):
    # Step 1: 将视频均匀分为 K 段
    segments = divide_video(video, K)
    
    # Step 2: 从每段随机采样一个 snippet
    snippets = [random_sample(seg) for seg in segments]
    
    # Step 3: 共享权重的 ConvNet 提取各段特征
    scores = [ConvNet(snippet, W) for snippet in snippets]
    
    # Step 4: 段共识函数聚合
    if consensus == 'avg':
        video_score = mean(scores)
    elif consensus == 'max':
        video_score = max(scores)
    elif consensus == 'weighted':
        video_score = weighted_mean(scores)
    
    # Step 5: Softmax 输出最终预测
    prediction = softmax(video_score)
    return prediction
```

**动机与背景**

在 TSN 之前，双流卷积网络（Two-Stream ConvNets）已经证明了结合 RGB 外观信息和光流运动信息对视频理解的有效性。然而，传统双流方法存在两个关键缺陷：

1. **时序建模不足**：双流网络仅在单帧或短片段（如连续 10 帧光流）上操作，无法捕获长程时序结构。
2. **训练数据有限**：视频数据集（如 UCF101 仅约 9.5K 训练视频）规模远小于图像数据集（ImageNet 120 万张），深度网络容易过拟合。

TSN 正是为了解决这两个问题而提出的。

**核心机制：稀疏采样与段共识**

TSN 的核心思想可以用一个公式概括：

$$\text{TSN}(T_1, T_2, \ldots, T_K) = \mathcal{H}\left(\mathcal{G}\left(\mathcal{F}(T_1; W), \mathcal{F}(T_2; W), \ldots, \mathcal{F}(T_K; W)\right)\right)$$

其中：
- \(T_k\) 是第 \(k\) 段中随机采样的片段
- \(\mathcal{F}(T_k; W)\) 是共享参数 \(W\) 的卷积网络对片段 \(T_k\) 的类别得分输出
- \(\mathcal{G}\) 是段共识函数，聚合所有段的预测
- \(\mathcal{H}\) 是预测函数（如 Softmax）

> 💡 关键：稀疏采样的精妙之处在于——不需要密集处理所有帧，只需从每个时间段中采样一个代表性片段。这使得计算成本与处理单个片段几乎相同（因为段数 K 通常仅为 3），却能覆盖整个视频的时序范围。

**段共识函数的选择**

论文探索了多种聚合函数 \(\mathcal{G}\)：

1. **均值聚合（Average）**：\(\mathcal{G}(F_1, \ldots, F_K) = \frac{1}{K}\sum_{k=1}^K F_k\)
2. **最大值聚合（Max）**：取各段得分的逐类最大值
3. **加权平均**：根据段的重要性分配权重
4. **Top-K 聚合**：取得分最高的 K 个段

实验表明，简单的均值聚合即可取得最优效果，这也体现了方法的简洁优雅。

**训练与优化**

基于段共识函数，TSN 的损失函数为标准交叉熵：

$$L(y, \mathcal{G}) = -\sum_{i=1}^C y_i \left( g_i - \log \sum_{j=1}^C \exp(g_j) \right)$$

其中 \(C\) 为类别数，\(g_i\) 为共识函数输出的第 \(i\) 类得分。梯度通过共识函数反传到各段的 ConvNet：

$$\frac{\partial L}{\partial W} = \frac{\partial L}{\partial \mathcal{G}} \sum_{k=1}^K \frac{\partial \mathcal{G}}{\partial \mathcal{F}(T_k)} \frac{\partial \mathcal{F}(T_k)}{\partial W}$$

**Good Practices：解决过拟合**

TSN 提出了一系列训练技巧来应对视频数据集规模小的问题：

1. **跨模态预训练**：光流输入为单通道（或双通道 x/y），无法直接使用 ImageNet 预训练的 RGB 模型。TSN 提出将 RGB 模型第一层卷积核沿通道维度取平均，再复制到光流通道数，从而实现跨模态权重迁移。

2. **部分批归一化（Partial BN）**：微调时冻结除第一个 BN 层外的所有 BN 层统计量。第一层保留更新是因为输入分布（光流 vs ImageNet 图像）差异较大，需要适配。

3. **数据增强**：
   - 角点裁剪：仅从图像的四角和中心裁剪，避免过度关注中心区域
   - 多尺度裁剪：在 {256, 224, 192, 168} 多个尺度上裁剪，增加尺度多样性

**测试时融合策略**

推理时，TSN 对每个视频均匀采样 25 帧，每帧进行 10 次裁剪（4 角 + 1 中心 × 2 翻转），最终对所有采样帧的预测取平均作为视频级预测。多模态融合采用加权平均：RGB : Flow : Warped Flow = 1 : 1.5 : 1.5。

**与传统方法的对比**

| 方法 | 时序建模范围 | 计算开销 | UCF101 |
|------|-------------|---------|--------|
| Two-Stream | 单帧/10帧 | 低 | 88.0% |
| C3D | 16帧 | 高 | 85.2% |
| LRCN | 全视频(RNN) | 高 | 82.9% |
| **TSN** | **全视频(稀疏)** | **低** | **94.2%** |

> ⚠️ 注意：TSN 的核心优势在于以极低的额外计算成本（仅 K=3 个片段）实现了全视频时序建模，避免了 RNN/3D 卷积等方法的高计算代价。

#### 🧪 练习题

```yaml
question: "TSN 中段共识函数（Segment Consensus）的主要作用是什么？"
options:
  - "对视频帧进行时序卷积以提取运动特征"
  - "聚合各时间段的片段级预测，生成视频级表示"
  - "计算相邻帧之间的光流场"
  - "对不同模态的特征进行通道拼接"
answer: 1
explain: "段共识函数 G 将 K 个时间段各自的 ConvNet 输出聚合为统一的视频级预测，是 TSN 实现长程时序建模的核心机制。"
```