### Attention-based Deep Multiple Instance Learning

```yaml
论文ID: attention_mil
标题: "Attention-based Deep Multiple Instance Learning"
作者: [Maximilian Ilse, Jakub M. Tomczak, Max Welling]
机构: University of Amsterdam
发表: ICML 2018
链接: https://arxiv.org/abs/1802.04712
代码: https://github.com/AMLab-Amsterdam/AttentionDeepMIL
领域: [多示例学习, 弱监督学习, 注意力机制, 计算病理学]
```

## 📝 一句话总结

提出基于注意力机制的可训练MIL池化算子，用加权求和替代固定的max/mean聚合，在获得与最优方法可比性能的同时提供实例级可解释性（attention权重指示关键实例/ROI）。

## 🎯 核心要点

### 1. 问题定义：多示例学习（MIL）

MIL是一种弱监督学习范式：训练数据以**bag**（包）为单位标注，每个bag包含多个**instance**（实例），只有bag级标签 $Y$ 已知，实例级标签 $y_k$ 未知。

**标准MIL假设**：bag为正当且仅当至少存在一个正实例：
$$Y = \begin{cases} 0, & \text{iff } \sum_k y_k = 0 \\ 1, & \text{otherwise} \end{cases}$$

**应用场景**：计算病理学中，一张WSI（全切片图像）= 一个bag，其中的patch = instance，只有slide级诊断标签。

### 2. 三步MIL框架

论文将MIL统一为三步流程：

| 步骤 | 函数 | 作用 | 示例 |
|------|------|------|------|
| ① 变换 | $f_\theta: \mathcal{X} \to \mathcal{H}$ | 将每个实例映射到低维表示 | CNN/FC提取特征 |
| ② 聚合 | $\sigma: \mathcal{H}^K \to \mathcal{H}$ | 将K个实例表示聚合为bag表示 | **Attention Pooling** |
| ③ 分类 | $g_\phi: \mathcal{H} \to [0,1]$ | 基于bag表示输出bag概率 | FC + sigmoid |

两种经典范式的区别：
- **Instance-based**：先对每个实例独立打分 $h_k \in [0,1]$，再用max/mean聚合
- **Embedding-based**：先提取实例嵌入 $h_k \in \mathbb{R}^M$，聚合后再分类

### 3. 核心创新：Attention-based MIL Pooling

**动机**：max和mean池化是预定义、不可训练的，无法自适应地选择关键实例。

**Attention Pooling**（公式7）：
$$\mathbf{z} = \sum_{k=1}^{K} a_k \mathbf{h}_k$$

其中attention权重由神经网络计算：

**标准Attention**（公式8）：
$$a_k = \frac{\exp\{\mathbf{w}^\top \tanh(\mathbf{V}\mathbf{h}_k^\top)\}}{\sum_{j=1}^{K} \exp\{\mathbf{w}^\top \tanh(\mathbf{V}\mathbf{h}_j^\top)\}}$$

**Gated Attention**（公式9）—— 引入sigmoid门控解决tanh的线性问题：
$$a_k = \frac{\exp\{\mathbf{w}^\top \big(\tanh(\mathbf{V}\mathbf{h}_k^\top) \odot \text{sigm}(\mathbf{U}\mathbf{h}_k^\top)\big)\}}{\sum_{j=1}^{K} \exp\{\mathbf{w}^\top \big(\tanh(\mathbf{V}\mathbf{h}_j^\top) \odot \text{sigm}(\mathbf{U}\mathbf{h}_j^\top)\big)\}}$$

其中 $\mathbf{w} \in \mathbb{R}^{L \times 1}$，$\mathbf{V} \in \mathbb{R}^{L \times M}$，$\mathbf{U} \in \mathbb{R}^{L \times M}$，$\odot$ 为逐元素乘法。

**关键性质**：
- **置换不变性**：加权求和满足对称函数定理，对实例顺序不敏感
- **权重归一化**：$\sum_k a_k = 1$（softmax），对bag大小不变
- **端到端可训练**：所有参数通过反向传播联合优化
- **可解释性**：attention权重直接指示每个实例的重要程度

### 4. 理论基础

论文基于**对称函数基本定理**（Theorem 1 & 2）证明：任何置换不变的bag评分函数可以分解为 $\rho(\sigma(\{f(x_k)\}))$ 的形式，其中 $\sigma$ 必须是置换不变的聚合算子。max和mean满足此条件，attention加权求和同样满足。

## 🔬 深入细节

### 架构图

论文Figure 6展示了三种MIL架构的对比：

![MIL架构对比](https://ar5iv.labs.arxiv.org/html/1802.04712/assets/x1.png)

> Figure 6: (a) Instance-based：先打分再聚合；(b) Embedding-based：先聚合再分类；(c) **Attention-based（本文）**：用可学习的attention权重聚合嵌入。

### Attention计算伪代码

```python
# Attention-based MIL Pooling
class AttentionMIL(nn.Module):
    def __init__(self, input_dim=512, hidden_dim=128):
        self.feature_extractor = nn.Sequential(  # f_θ
            nn.Linear(input_dim, 256), nn.ReLU(),
            nn.Linear(256, 128), nn.ReLU()
        )
        # Attention网络参数: V, w
        self.attention = nn.Sequential(
            nn.Linear(128, hidden_dim),  # V: L×M
            nn.Tanh(),
            nn.Linear(hidden_dim, 1)     # w: L×1
        )
        self.classifier = nn.Linear(128, 1)  # g_φ
    
    def forward(self, bag):  # bag: [K, input_dim]
        H = self.feature_extractor(bag)     # [K, 128]
        A = self.attention(H)               # [K, 1]
        A = F.softmax(A, dim=0)             # softmax归一化
        z = torch.mm(A.T, H)               # [1, 128] 加权求和
        return torch.sigmoid(self.classifier(z))

# Gated Attention变体
class GatedAttentionMIL(nn.Module):
    def __init__(self, input_dim=512, hidden_dim=128):
        self.feature_extractor = ...  # 同上
        self.attention_V = nn.Sequential(
            nn.Linear(128, hidden_dim), nn.Tanh()      # tanh分支
        )
        self.attention_U = nn.Sequential(
            nn.Linear(128, hidden_dim), nn.Sigmoid()    # sigmoid门控
        )
        self.attention_w = nn.Linear(hidden_dim, 1)     # w
        self.classifier = nn.Linear(128, 1)
    
    def forward(self, bag):
        H = self.feature_extractor(bag)
        A_V = self.attention_V(H)           # tanh(V·h)
        A_U = self.attention_U(H)           # sigm(U·h)
        A = self.attention_w(A_V * A_U)     # w^T(tanh⊙sigm)
        A = F.softmax(A, dim=0)
        z = torch.mm(A.T, H)
        return torch.sigmoid(self.classifier(z))
```

### 公式详解：为什么需要Gated Attention？

标准Attention中 $\tanh(\mathbf{V}\mathbf{h}_k)$ 的问题：tanh在原点附近近似线性，当输入值较小时，attention网络退化为线性变换，表达能力受限。

Gated Attention通过引入 $\text{sigm}(\mathbf{U}\mathbf{h}_k)$ 门控：
- sigmoid输出在 $[0,1]$，充当"开关"选择性地放大/抑制tanh的各维度
- 逐元素乘法 $\odot$ 使得网络能学习更复杂的非线性组合
- 类似LSTM/GRU中门控机制的思想

### 实验结果

**MNIST-bags实验**（合成数据集）：

![MNIST-bags 10](https://ar5iv.labs.arxiv.org/html/1802.04712/assets/mnist_bags_10.png)

> Figure 1-3: 不同bag大小(10/50/100)下的测试AUC。Attention方法在**小样本**场景下优势显著。

关键发现：
- 训练bag数较少时（50-150），attention方法AUC显著高于其他方法
- 随训练数据增加，各方法趋于收敛
- Gated Attention在大bag（100 instances）时表现更稳定

**病理图像实验**：

| 方法 | Breast Cancer (Acc) | Breast Cancer (Recall) | Colon Cancer (Acc) | Colon Cancer (Recall) |
|------|:---:|:---:|:---:|:---:|
| Instance+max | 0.813 | 0.619 | 0.864 | 0.838 |
| Instance+mean | 0.725 | 0.571 | 0.855 | 0.838 |
| Embedding+max | 0.813 | 0.619 | 0.909 | 0.875 |
| Embedding+mean | 0.800 | 0.619 | 0.864 | 0.838 |
| **Attention** | **0.850** | **0.762** | 0.900 | 0.863 |
| **Gated-Attention** | 0.838 | 0.714 | **0.918** | **0.900** |

**关键发现**：
- Attention方法在Breast Cancer上recall从0.619提升至**0.762**（+23%）
- 高recall在医学领域极其重要——减少漏诊（假阴性可能致命）
- Gated-Attention在Colon Cancer上全面最优

**可解释性**：

![病理Heatmap](https://ar5iv.labs.arxiv.org/html/1802.04712/assets/x3.png)

> Figure 5: (a) H&E染色组织图 → (b) 核心区域patch → (c) 上皮细胞真值 → (d) Attention权重热力图。尽管仅使用图像级标注训练，attention热力图与细胞级真值高度吻合。

### 与其他MIL Pooling的对比

| 池化方式 | 可训练 | 可解释 | 适用范式 | 局限性 |
|---------|:------:|:------:|---------|--------|
| Max | ✗ | ✗ | Instance-based | 只关注最大值，忽略其他实例 |
| Mean | ✗ | ✗ | Embedding-based | 所有实例等权，噪声敏感 |
| Noisy-AND | 部分 | ✗ | — | 全局参数，灵活性有限 |
| **Attention** | ✓ | ✓ | **两者皆可** | 计算开销略增 |

## 🧪 练习题

### 概念理解

**Q1**：为什么MIL池化必须是置换不变的？如果不满足置换不变性会怎样？

<details><summary>参考答案</summary>

Bag是实例的**集合**（无序），同一组实例以不同顺序输入应得到相同的bag预测。如果池化不满足置换不变性，则模型输出会随实例排列顺序变化，导致：(1) 训练不稳定——同一bag的不同排列产生不同loss；(2) 违反MIL的集合语义——bag标签与实例顺序无关。加权求和 $\sum a_k h_k$ 天然满足置换不变性，因为加法满足交换律，且 $a_k$ 只依赖 $h_k$ 自身。

</details>

**Q2**：Attention MIL中，如果所有实例的attention权重趋于均匀（$a_k \approx 1/K$），模型退化为什么？这说明什么？

<details><summary>参考答案</summary>

退化为**mean pooling**。这说明attention网络未能区分不同实例的重要性，可能原因：(1) 特征提取器 $f$ 未能学到区分性表示；(2) attention网络容量不足；(3) bag中所有实例确实同等重要（如全正或全负bag）。

</details>

### 公式推导

**Q3**：证明Attention Pooling（公式7+8）满足置换不变性，即对任意排列 $\pi$，$\sum_{k=1}^K a_k \mathbf{h}_k = \sum_{k=1}^K a_{\pi(k)} \mathbf{h}_{\pi(k)}$。

<details><summary>参考答案</summary>

设排列 $\pi$ 将实例重排为 $\{h_{\pi(1)}, ..., h_{\pi(K)}\}$。

重排后第 $\pi(k)$ 个实例的attention权重为：
$$a_{\pi(k)} = \frac{\exp\{w^\top \tanh(V h_{\pi(k)})\}}{\sum_{j=1}^K \exp\{w^\top \tanh(V h_{\pi(j)})\}}$$

分母 $\sum_{j=1}^K \exp\{w^\top \tanh(V h_{\pi(j)})\}$ 是对所有实例求和，由加法交换律，与排列无关，等于原始分母。

因此 $a_{\pi(k)}$ 的值仅取决于 $h_{\pi(k)}$ 本身（与原始 $a_k$ 对应 $h_k$ 的计算方式相同）。

加权求和 $\sum_k a_{\pi(k)} h_{\pi(k)}$ 只是对同一组 $(a_k, h_k)$ 对以不同顺序求和，由加法交换律，结果不变。∎

</details>

### 代码实践

**Q4**：实现一个简化的Attention MIL模型，在合成数据上验证：生成bag（每个bag含10个2D点），正bag至少包含一个在单位圆内的点。

<details><summary>参考答案</summary>

```python
import torch
import torch.nn as nn
import torch.nn.functional as F

class SimpleAttentionMIL(nn.Module):
    def __init__(self):
        super().__init__()
        self.fc = nn.Sequential(nn.Linear(2, 32), nn.ReLU(), nn.Linear(32, 16), nn.ReLU())
        self.attention = nn.Sequential(nn.Linear(16, 8), nn.Tanh(), nn.Linear(8, 1))
        self.classifier = nn.Linear(16, 1)
    
    def forward(self, bag):
        H = self.fc(bag)
        A = F.softmax(self.attention(H), dim=0)
        z = (A * H).sum(dim=0, keepdim=True)
        return torch.sigmoid(self.classifier(z))

# 数据生成
def make_bag(n=10):
    points = torch.randn(n, 2) * 3
    in_circle = (points.norm(dim=1) < 1).any().float()
    return points, in_circle

# 训练
model = SimpleAttentionMIL()
opt = torch.optim.Adam(model.parameters(), lr=1e-3)
for epoch in range(500):
    bag, label = make_bag()
    pred = model(bag)
    loss = F.binary_cross_entropy(pred.squeeze(), label)
    opt.zero_grad(); loss.backward(); opt.step()
```

</details>

**Q5（开放题）**：在病理图像分析中，如果一个WSI包含10,000个patch，直接计算所有patch的attention权重在计算和内存上是否可行？提出一种改进方案。

<details><summary>参考思路</summary>

10,000个patch的attention计算本身是可行的（softmax复杂度为O(K)），但瓶颈在特征提取：所有patch需通过CNN提取特征。改进方案：

1. **两阶段策略**：先用轻量网络粗筛，保留top-N候选patch，再用大模型精细计算attention（如CLAM方法）
2. **分层attention**：将patch按空间位置分组，组内attention → 组间attention（类似Transformer中的稀疏attention）
3. **预计算特征**：离线用预训练模型（如ImageNet ResNet）提取所有patch特征，在线只计算attention权重（这是CLAM/DSMIL等后续工作的标准做法）

</details>