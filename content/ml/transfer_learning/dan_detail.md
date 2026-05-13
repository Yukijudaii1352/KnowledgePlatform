### DAN (Deep Adaptation Networks)

```yaml
id: dan
name: DAN
full_name: "深度适配网络 (Deep Adaptation Networks)"
year: "2015"
org: "Tsinghua University / UC Berkeley"
paper_url: "https://arxiv.org/abs/1502.02791"
category: domain_adapt
parent: tca
motivation: "将多核MMD嵌入深度网络高层，实现端到端的无监督域适配特征学习"
```

#### 📝 一句话总结

DAN 提出在预训练深度网络的全连接层（fc6–fc8）嵌入多核最大均值差异（MK-MMD）正则项，通过多层特征分布对齐实现端到端的无监督域适配，是首个将核方法与深度迁移学习有效结合的工作。

#### 🎯 核心要点

- 基于 AlexNet 预训练模型，冻结 conv1–conv3，微调 conv4–conv5，在 fc6–fc8 施加域适配正则
- 多核 MMD（MK-MMD）：使用多个高斯核的凸组合，自动学习最优核匹配，最大化两域分布的检测力
- 多层适配：同时对齐 fc6、fc7、fc8 三层的隐藏表示分布，而非仅对齐单层
- 无偏 MMD 估计量：利用核矩阵的无偏统计量，可通过反向传播端到端优化
- 在 Office-31 数据集上 12 个迁移任务中全面超越 TCA、DDC 等传统方法

#### 🔬 深入细节

##### 核心架构图

![DAN 架构示意图](https://ar5iv.labs.arxiv.org/html/1502.02791/assets/x1.png)
*图：DAN 网络架构。底层卷积层冻结/微调以保留通用特征，高层全连接层通过 MK-MMD 对齐源域与目标域的隐藏表示分布。*

##### 算法伪代码

```python
# DAN 训练流程伪代码
# 输入: 源域标注数据 D_s = {(x_i^s, y_i^s)}, 目标域无标注数据 D_t = {x_j^t}
# 模型: AlexNet 预训练权重 Θ

for epoch in range(max_epochs):
    for (x_s, y_s), x_t in zip(source_loader, target_loader):
        # 前向传播，提取各层隐藏表示
        h_s_6, h_s_7, h_s_8, logits_s = model(x_s)  # 源域
        h_t_6, h_t_7, h_t_8, _        = model(x_t)  # 目标域
        
        # 分类损失（仅源域有标签）
        cls_loss = CrossEntropy(logits_s, y_s)
        
        # 多层 MK-MMD 正则
        mmd_loss = 0
        for (h_s, h_t) in [(h_s_6, h_t_6), (h_s_7, h_t_7), (h_s_8, h_t_8)]:
            mmd_loss += MK_MMD(h_s, h_t)  # 多核MMD
        
        # 总损失
        loss = cls_loss + λ * mmd_loss
        loss.backward()
        optimizer.step()
```

##### 动机与背景

**问题**：传统域适配方法（如 TCA）在手工特征上对齐分布，无法利用深度网络的表示学习能力；而直接微调预训练网络在目标域数据不足时容易过拟合，且高层特征具有强烈的域偏置性（domain-specific）。

**关键观察**（Yosinski et al., 2014）：
- CNN 浅层（conv1–conv3）学到的是通用视觉特征（边缘、纹理），可直接迁移
- 中层（conv4–conv5）略带域偏置，需要微调
- 高层（fc6–fc8）高度任务/域相关，直接迁移性能急剧下降

> 💡 关键：DAN 的核心思想是——既然高层特征不可直接迁移，就在训练时强制约束源域和目标域在这些层的分布一致。

##### MK-MMD 核心机制

**最大均值差异（MMD）** 衡量两个分布 \(p\) 和 \(q\) 在再生核希尔伯特空间（RKHS）\(\mathcal{H}_k\) 中均值嵌入的距离：

$$d_k(p, q) = \left\| \mathbb{E}_p[\phi(x)] - \mathbb{E}_q[\phi(y)] \right\|_{\mathcal{H}_k}$$

其中 \(\phi: \mathcal{X} \to \mathcal{H}_k\) 是核 \(k\) 对应的特征映射。当 \(k\) 为特征核（characteristic kernel）时，\(d_k(p,q) = 0 \Leftrightarrow p = q\)。

**多核 MMD（MK-MMD）** 使用凸组合核 \(\mathcal{K} = \{k = \sum_{u=1}^m \beta_u k_u : \sum_u \beta_u = 1, \beta_u \geq 0\}\)，其中每个 \(k_u\) 是带宽不同的高斯核：

$$k_u(x, y) = \exp\left(-\frac{\|x - y\|^2}{2\sigma_u^2}\right)$$

多核的优势在于：单一核的带宽选择困难，而多核凸组合能自适应地覆盖不同尺度的分布差异，最大化假设检验的检测力（test power）。

**最优核选择**：通过最大化 MMD 的检测力（即最大化 \(d_k^2 / \text{Var}[\hat{d}_k^2]\)）来确定核系数 \(\{\beta_u\}\)，使得 MK-MMD 对源域和目标域分布差异最为敏感。

##### 训练目标

DAN 的完整优化目标为：

$$\min_{\Theta} \frac{1}{n_a} \sum_{i=1}^{n_a} J\left(\theta(\mathbf{x}_i^a), y_i^a\right) + \lambda \sum_{\ell=l_1}^{l_2} d_k^2\left(\mathcal{D}_s^\ell, \mathcal{D}_t^\ell\right)$$

其中：
- \(J\) 为交叉熵损失，仅在源域有标签数据上计算
- \(\lambda > 0\) 为正则化系数，控制分类精度与域对齐之间的平衡
- \(l_1 = 6, l_2 = 8\)，即在 fc6、fc7、fc8 三层同时施加 MK-MMD 约束
- \(\mathcal{D}_s^\ell, \mathcal{D}_t^\ell\) 分别为源域和目标域样本在第 \(\ell\) 层的隐藏表示集合

> ⚠️ 注意：MMD 的无偏估计量可以用核矩阵的线性组合表示，计算复杂度为 \(O(n^2)\)，但可通过随机采样小批量近似。梯度可直接通过核函数对网络参数求导，实现端到端训练。

##### 与传统方法的区别

| 方法 | 特征提取 | 分布对齐 | 端到端 |
|------|---------|---------|--------|
| TCA | 手工特征 | 单核MMD + PCA | ❌ |
| DDC | CNN fc7 | 单层单核MMD | ✅ |
| **DAN** | **CNN fc6–fc8** | **多层多核MK-MMD** | **✅** |

DAN 相比 DDC 的两大改进：
1. **多层对齐**：DDC 仅对齐 fc7 一层，DAN 同时对齐 fc6–fc8 三层，更全面地消除域偏置
2. **多核 MMD**：DDC 使用单一高斯核，DAN 使用多核凸组合并自动优化核系数，提升分布匹配的灵活性和检测力

#### 🧪 练习题

```yaml
question: "DAN 中 MK-MMD 正则化施加在网络的哪些层？"
options:
  - "conv1–conv3"
  - "conv4–conv5"
  - "fc6–fc8"
  - "所有层"
answer: 2
explain: "DAN 在全连接层 fc6、fc7、fc8 施加 MK-MMD 正则，因为这些高层特征域偏置最严重、迁移性最差，需要显式对齐分布。"
```