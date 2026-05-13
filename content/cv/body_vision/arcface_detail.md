### ArcFace

```yaml
id: arcface
name: ArcFace
full_name: "加性角度间隔损失 (Additive Angular Margin Loss)"
year: "2019"
org: "Imperial College London"
paper_url: "https://arxiv.org/abs/1801.07698"
category: "face_recognition"
parent: "—"
motivation: "通过加性角度间隔惩罚强化类别可分性"
```

#### 📝 一句话总结

ArcFace 提出在归一化特征与权重的夹角上直接添加加性角度间隔（additive angular margin），使类间决策边界具有恒定的测地距离惩罚，从而以极简的实现大幅增强深度人脸特征的判别力，在 LFW、MegaFace、IJB-C 等主流基准上取得当时最优性能。

#### 🎯 核心要点

- **ArcFace 损失**：在 softmax 的目标类角度 \(\theta_{y_i}\) 上直接加一个角度间隔 \(m\)，即 \(\cos(\theta_{y_i} + m)\)，使决策边界在超球面上具有恒定的测地距离惩罚
- **归一化机制**：对特征向量和分类权重均做 L2 归一化，将 logit 简化为 \(s \cdot \cos\theta\)，其中 \(s=64\) 为特征缩放因子
- **统一框架**：将 SphereFace（乘性角度间隔 \(m_1\)）、ArcFace（加性角度间隔 \(m_2\)）、CosFace（加性余弦间隔 \(m_3\)）统一为 \(\cos(m_1\theta + m_2) - m_3\)
- **Sub-center ArcFace**：为每个类别引入 \(K\) 个子中心，自动将噪声样本隔离到非主导子类中，实现大规模 web 数据的自动清洗
- **模型反演**：利用 ArcFace 损失梯度和 BN 层统计先验，从预训练模型中生成身份保持的人脸图像（闭集和开集）
- **IBUG-500K 数据集**：通过 sub-center ArcFace 自动清洗 MS1MV0 和 Celeb500K，构建 493K 身份、1196 万图像的大规模训练集

#### 🔬 深入细节

![ArcFace 框架图](https://ar5iv.labs.arxiv.org/html/1801.07698v4/assets/x4.png)
*图：ArcFace 训练流程。特征 \(x_i\) 和权重 \(W\) 均经 L2 归一化后计算角度 \(\theta\)，对目标类角度添加间隔 \(m\)，再乘以缩放因子 \(s\) 送入 softmax。*

```python
# ArcFace 核心前向计算伪代码
import torch
import torch.nn.functional as F
import math

def arcface_forward(features, weights, labels, s=64.0, m=0.5):
    # Step 1: L2 归一化
    features = F.normalize(features, dim=1)   # (B, 512)
    weights = F.normalize(weights, dim=1)     # (N_classes, 512)
    
    # Step 2: 计算 cos(θ) = 特征与权重的内积
    cosine = features @ weights.T             # (B, N_classes)
    
    # Step 3: 对目标类添加角度间隔
    theta = torch.acos(cosine.clamp(-1+1e-7, 1-1e-7))
    target_logits = torch.cos(theta[range(len(labels)), labels] + m)
    
    # Step 4: 替换目标类 logit，缩放后计算交叉熵
    logits = cosine.clone()
    logits[range(len(labels)), labels] = target_logits
    logits *= s
    
    loss = F.cross_entropy(logits, labels)
    return loss
```

**动机与背景**

传统 softmax 损失虽然能训练出可分的特征，但缺乏显式的类间间隔约束，导致特征在开集验证场景下判别力不足。度量学习方法（如 triplet loss）虽然直接优化特征距离，但面临组合爆炸的采样困难和训练不稳定问题。SphereFace 首次引入角度间隔的思想，但其乘性间隔 \(\cos(m\theta)\) 在数学上需要复杂的倍角公式且收敛困难，需要联合 softmax 监督进行退火训练。

> 💡 关键：ArcFace 的核心洞察是——在角度空间中添加**加性**间隔比乘性间隔更自然，因为加性角度间隔直接对应超球面上的**测地距离**，在整个角度区间内提供恒定的惩罚强度。

**核心机制**

ArcFace 的损失函数从标准 softmax 出发，经过三步演进：

**Step 1 — 归一化 Softmax：** 将权重 \(W_j\) 和特征 \(x_i\) 均做 L2 归一化，使 \(W_j^T x_i = \cos\theta_j\)，将分类问题转化为超球面上的角度分类：

$$L_2 = -\log \frac{e^{s \cdot \cos\theta_{y_i}}}{e^{s \cdot \cos\theta_{y_i}} + \sum_{j \neq y_i} e^{s \cdot \cos\theta_j}}$$

**Step 2 — 添加角度间隔：** 对目标类角度 \(\theta_{y_i}\) 加上间隔 \(m\)：

$$L_3 = -\log \frac{e^{s \cdot \cos(\theta_{y_i} + m)}}{e^{s \cdot \cos(\theta_{y_i} + m)} + \sum_{j \neq y_i} e^{s \cdot \cos\theta_j}}$$

这使得样本不仅需要与正确类中心的角度最小，还需要额外克服 \(m\) 的角度惩罚才能被正确分类，从而在训练时强制拉大类间边界。

**Step 3 — 统一框架：** 将三种主流间隔方法统一为：

$$\cos(m_1 \theta_{y_i} + m_2) - m_3$$

其中 SphereFace 对应 \((m_1, m_2, m_3) = (1.5, 0, 0)\)，ArcFace 对应 \((1, 0.5, 0)\)，CosFace 对应 \((1, 0, 0.35)\)。

> ⚠️ 注意：ArcFace 的几何优势在于其决策边界是**线性**的角度间隔（在整个 \([0, \pi]\) 区间内恒定为 \(m\)），而 SphereFace 和 CosFace 的角度间隔是非线性的，在不同角度处惩罚强度不同。

**超参数设计**

- **缩放因子 \(s = 64\)**：控制 softmax 的温度。\(s\) 过小导致收敛困难，过大导致梯度消失。论文证明当 \(s \geq \frac{N-1}{N} \cdot \frac{\log((N-1) \cdot P_W)}{1 - \cos(m)}\) 时可保证期望分类精度 \(P_W\)。
- **角度间隔 \(m = 0.5\)**（约 28.6°）：在判别力和收敛性之间取得平衡。

**Sub-center ArcFace**

针对大规模 web 数据中不可避免的标签噪声问题，论文提出为每个类别维护 \(K\) 个子中心（默认 \(K=3\)），样本只需与最近的子中心满足间隔约束：

$$L_7 = -\log \frac{e^{s \cdot \cos(\theta_{\min} + m)}}{e^{s \cdot \cos(\theta_{\min} + m)} + \sum_{j \neq y_i} e^{s \cdot \cos\theta_j}}$$

其中 \(\theta_{\min} = \min_{k=1}^K \theta_k\)。训练完成后，主导子中心（包含多数干净样本）可被识别，与主导子中心角度超过 75° 的样本被判定为噪声并移除。这一机制无需额外标注即可实现自动数据清洗。

**与传统方法的对比**

| 方法 | 间隔类型 | 决策边界 | 收敛性 |
|------|---------|---------|--------|
| SphereFace | 乘性角度 \(\cos(m\theta)\) | 非线性 | 需退火策略 |
| CosFace | 加性余弦 \(\cos\theta - m\) | 非线性角度间隔 | 稳定 |
| **ArcFace** | **加性角度** \(\cos(\theta + m)\) | **恒定线性角度间隔** | **稳定** |

ArcFace 在 LFW 上达到 99.83%，在 MegaFace 上（refined, large protocol）达到 98.98% Rank-1 识别率和 99.08% 验证率（TPR@FPR=1e-6），在 IJB-C 上（TPR@FPR=1e-4）达到 96.03%，全面超越同期方法。

#### 🧪 练习题

```yaml
question: "ArcFace 相比 CosFace 的核心几何优势是什么？"
options:
  - "ArcFace 使用更大的缩放因子 s"
  - "ArcFace 在整个角度区间内提供恒定的角度间隔，对应超球面上的测地距离"
  - "ArcFace 不需要对特征进行 L2 归一化"
  - "ArcFace 使用乘性间隔使梯度更大"
answer: 1
explain: "ArcFace 在 θ 上直接加 m，使决策边界在 [0,π] 内具有恒定的角度间隔（即恒定的测地距离惩罚），而 CosFace 的 cos(θ)-m 在角度空间中对应非线性间隔。"
```