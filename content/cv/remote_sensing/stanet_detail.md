### STANet

```yaml
id: stanet
name: STANet
full_name: 时空注意力变化检测网络 (Spatial-Temporal Attention-Based Network for Remote Sensing Image Change Detection)
year: "2020"
org: Beihang University
paper_url: https://doi.org/10.3390/rs12101662
github_url: https://github.com/justchenhao/STANet
category: remote_sensing
parent: —
motivation: 提出时空注意力机制建模双时相遥感影像的全局时空依赖关系，解决变化检测中配准误差和多尺度目标检测难题，并构建大规模建筑变化检测数据集LEVIR-CD
```

#### 📝 一句话总结

STANet 提出基于自注意力的时空注意力模块（BAM/PAM），在 Siamese FCN 框架中联合建模双时相遥感影像的空间与时间维度全局依赖关系，有效缓解配准误差和多尺度变化目标检测问题，同时构建了包含 31k+ 变化实例的大规模建筑变化检测数据集 LEVIR-CD。

#### 🎯 核心要点

- **Siamese FCN 架构**：共享权重的 ResNet-18 双分支特征提取器 + FPN 式多尺度融合，输出 1/4 分辨率、64 维特征图
- **BAM（基础时空注意力模块）**：将双时相特征堆叠为 4D 张量，通过自注意力机制在空间和时间维度联合建模全局依赖
- **PAM（金字塔时空注意力模块）**：多尺度子区域划分（S={1,2,4,8}）+ 局部 BAM + 聚合，增强细粒度变化检测能力
- **度量模块**：L2 距离 + 固定阈值（θ=1）生成变化图，端到端训练
- **BCL 损失函数**：批量平衡对比损失，动态平衡变化/未变化像素的贡献，缓解类别不平衡
- **LEVIR-CD 数据集**：637 对 1024×1024 VHR（0.5m）Google Earth 影像，31,333 个建筑变化实例，比现有数据集大 1~2 个数量级

#### 🔬 深入细节

![STANet 整体架构图](https://pub.mdpi-res.com/remotesensing/remotesensing-12-01662/article_deploy/html/images/remotesensing-12-01662-g002.png)
*图：STANet 框架总览。(a) 整体流程；(b) 特征提取器；(c) BAM 模块；(d) PAM 模块*

```python
# STANet 核心流程伪代码
# === 1. Siamese Feature Extraction ===
def feature_extractor(img):
    """ResNet-18 backbone + FPN-like fusion"""
    s2 = resnet_stage2(img)        # 1/4 res
    s3 = resnet_stage3(s2)         # 1/8 res
    s4 = resnet_stage4(s3)         # 1/16 res
    s5 = resnet_stage5(s4)         # 1/32 res
    # Multi-scale fusion
    C1 = concat(s2, upsample(s3))  # C=96, 1/4 res
    C2 = concat(C1, upsample(s4), upsample(s5))  # C=256
    C3 = conv1x1(C2)              # C=64, 1/4 res
    return C3

X1 = feature_extractor(img_t1)  # R^(64×H/4×W/4)
X2 = feature_extractor(img_t2)  # shared weights

# === 2. Spatial-Temporal Attention (BAM) ===
def BAM(X1, X2):
    X = stack(X1, X2)  # R^(C×H×W×2)
    Q = conv1x1_q(X)   # R^(C'×H×W×2), C'=C/8=8
    K = conv1x1_k(X)   # R^(C'×H×W×2)
    V = conv1x1_v(X)   # R^(C×H×W×2)
    # Reshape to matrices, N = H×W×2
    Q_bar = reshape(Q, (C_prime, N))
    K_bar = reshape(K, (C_prime, N))
    V_bar = reshape(V, (C, N))
    # Self-attention
    A = softmax(K_bar.T @ Q_bar / sqrt(C_prime))  # N×N
    Y_bar = V_bar @ A                              # C×N
    Y = reshape(Y_bar, (C, H, W, 2))
    Z = Y + X  # residual connection
    return split(Z)  # Z1, Z2

# === 3. PAM (multi-scale BAM) ===
def PAM(X1, X2):
    X = stack(X1, X2)
    outputs = []
    for s in [1, 2, 4, 8]:  # pyramid scales
        Y_s = zeros_like(X)
        for i in range(s):
            for j in range(s):
                region = X[:, i*H//s:(i+1)*H//s, j*W//s:(j+1)*W//s, :]
                Y_s[:, i*H//s:(i+1)*H//s, j*W//s:(j+1)*W//s, :] = BAM_s(region)
        outputs.append(Y_s)
    Y = conv1x1(concat(outputs, dim=0))  # fuse 4 scales
    Z = Y + X
    return split(Z)

# === 4. Metric & Prediction ===
Z1, Z2 = upsample_to_original(Z1), upsample_to_original(Z2)
D = L2_distance(Z1, Z2)  # pixel-wise distance map
P = (D > theta).float()  # theta=1, binary change map

# === 5. BCL Loss ===
# L = 0.5/n_u * Σ(1-M)*D + 0.5/n_c * Σ M*max(0, m-D)
# m=2 (margin), n_u/n_c = batch-balanced counts
```

**动机与背景**

遥感影像变化检测面临三大挑战：(1) 双时相影像间的配准误差导致建筑边缘被误检为变化区域；(2) 变化目标尺度差异大（从小车库到大型仓库）；(3) 缺乏大规模公开数据集。传统方法（如 DSCNN）仅使用局部卷积特征，无法捕获全局上下文信息，对配准误差和尺度变化敏感。

> 💡 关键洞察：将双时相特征在时间维度堆叠后进行自注意力计算，使得每个像素可以同时关注两个时相中所有空间位置的特征，从而建模全局时空依赖关系。

**核心机制：BAM（Basic Spatial-Temporal Attention Module）**

BAM 的核心思想是将双时相特征图 \(X^{(1)}, X^{(2)} \in \mathbb{R}^{C \times H \times W}\) 堆叠为 4D 张量 \(X \in \mathbb{R}^{C \times H \times W \times 2}\)，然后在 \(N = H \times W \times 2\) 个位置上计算自注意力。这意味着时相 1 中的像素可以直接关注时相 2 中的对应位置及其邻域，反之亦然。

注意力计算过程：

$$A = \text{softmax}\left(\frac{\bar{K}^T \bar{Q}}{\sqrt{C'}}\right) \in \mathbb{R}^{N \times N}$$

$$\bar{Y} = \bar{V} \cdot A \in \mathbb{R}^{C \times N}$$

$$Z = Y + X \quad \text{(残差连接)}$$

其中 \(C' = C/8 = 8\) 为降维后的注意力维度，\(\bar{K}, \bar{Q} \in \mathbb{R}^{C' \times N}\) 和 \(\bar{V} \in \mathbb{R}^{C \times N}\) 分别由三个独立的 1×1 卷积生成。

> ⚠️ 注意：BAM 的注意力矩阵大小为 \(N \times N = (2HW)^2\)，当特征图较大时计算量巨大。这正是 PAM 引入多尺度子区域划分的动机。

**核心机制：PAM（Pyramid Spatial-Temporal Attention Module）**

PAM 受 PSPNet 金字塔池化启发，将特征张量按 4 个尺度 \(S = \{1, 2, 4, 8\}\) 划分为子区域：
- \(s=1\)：整张特征图作为一个区域（等价于 BAM）
- \(s=2\)：划分为 2×2=4 个子区域
- \(s=4\)：划分为 4×4=16 个子区域
- \(s=8\)：划分为 8×8=64 个子区域

每个分支内，对每个子区域 \(R_{s,i,j} \in \mathbb{R}^{C \times \frac{H}{s} \times \frac{W}{s} \times 2}\) 独立应用 BAM。四个分支的输出拼接后通过 1×1 卷积融合为最终残差特征。

这种设计的优势：
1. **多尺度上下文**：小尺度分支捕获局部精细变化，大尺度分支捕获全局语义关系
2. **计算效率**：子区域内的注意力矩阵远小于全图，显著降低计算复杂度
3. **配准鲁棒性**：全局注意力使模型学会忽略配准偏移区域的虚假响应

**损失函数：BCL（Batch-Balanced Contrastive Loss）**

针对变化检测中严重的类别不平衡问题（变化像素通常只占极小比例），BCL 对标准对比损失进行批量级别的类别权重平衡：

$$L(D^*, M^*) = \frac{1}{2n_u} \sum_{b,i,j} (1 - M^*_{b,i,j}) \cdot D^*_{b,i,j} + \frac{1}{2n_c} \sum_{b,i,j} M^*_{b,i,j} \cdot \max(0, m - D^*_{b,i,j})$$

其中 \(n_u = \sum(1-M^*)\) 和 \(n_c = \sum M^*\) 分别为批次内未变化和变化像素的数量，\(m=2\) 为间隔参数。推理时阈值 \(\theta = m/2 = 1\)。

**实验结果**

| 方法 | LEVIR-CD Precision | LEVIR-CD Recall | LEVIR-CD F1 |
|------|-------------------|-----------------|-------------|
| BASE | 79.2% | 89.1% | 83.9% |
| BAM | 81.5% | 90.4% | 85.7% |
| **PAM** | **83.8%** | **91.0%** | **87.3%** |

在 SZTAKI 数据集上，PAM 同样取得最优 F1（SZADA/1: 53.0%, TISZADOB/3: 93.0%），显著超越 DSCNN、rRL、TBSRL 等方法。

**训练配置**：ImageNet 预训练 ResNet-18，Adam（β1=0.5, β2=0.99），初始学习率 1e-3，200 epochs（前 100 保持，后 100 线性衰减），batch size=4，输入裁剪为 256×256，随机翻转 + 旋转（±15°）增强。

#### 🧪 练习题

```yaml
question: "STANet 中 BAM 模块将双时相特征堆叠后计算自注意力，其注意力矩阵的维度是什么？"
options:
  - "H×W × H×W（仅空间维度）"
  - "2HW × 2HW（空间+时间维度联合）"
  - "C × C（通道维度）"
  - "2 × 2（仅时间维度）"
answer: 1
explain: "BAM 将两个时相的特征堆叠为 N=H×W×2 个向量，注意力矩阵为 N×N = 2HW×2HW，使得跨时相的空间位置可以相互关注。"
```