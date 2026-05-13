### DANN — 域对抗神经网络

```yaml
id: dann
name: DANN
full_name: 域对抗神经网络 (Domain-Adversarial Neural Network)
year: 2016
org: Skoltech / MILA
paper_url: https://arxiv.org/abs/1505.07818
category: domain_adapt
parent: —
motivation: 通过梯度反转层实现对抗式域适应，学习域不变特征表示，无需目标域标签即可迁移
```

#### 📝 一句话总结

DANN 提出梯度反转层（GRL）实现对抗式无监督域适应，通过在特征提取器上同时优化分类损失和对抗域分类器，学习域不变但判别性强的特征表示，理论上最小化 Ben-David 等人提出的域散度上界。

#### 🎯 核心要点

- **三组件架构**：特征提取器 \(G_f\)、标签预测器 \(G_y\)、域分类器 \(G_d\) 协同训练
- **梯度反转层（GRL）**：前向传播为恒等变换，反向传播将梯度乘以 \(-\lambda\)，一行代码实现对抗训练
- **理论基础**：基于 Ben-David (2006) 的 \(\mathcal{H}\)-divergence 目标域风险上界，DANN 直接优化该上界的代理
- **鞍点优化目标**：对 \(\theta_f, \theta_y\) 最小化、对 \(\theta_d\) 最大化联合损失
- **渐进式调度**：适应因子 \(\lambda\) 从 0 渐增至 1，稳定早期训练
- **广泛验证**：在情感分析（Amazon Reviews）、数字识别（MNIST→MNIST-M、SynNumbers→SVHN）、交通标志（SynSigns→GTSRB）、Office 数据集上均取得显著提升
- **反向验证**：提出无监督超参选择方法，利用反向分类准确率估计目标域性能

#### 🔬 深入细节

##### 核心架构示意图

![DANN 架构图](https://arxiv.org/html/1505.07818v5/extracted/figures/model.png)

*图：DANN 整体架构。输入经过特征提取器后分两路：标签预测器（绿色）用于分类，域分类器（红色）通过梯度反转层进行对抗训练。GRL 在反向传播时翻转梯度方向，迫使特征提取器学习域不变表示。*

##### 算法伪代码

```python
# DANN 训练流程伪代码
for epoch in range(num_epochs):
    p = epoch / num_epochs
    λ = 2.0 / (1.0 + exp(-10 * p)) - 1  # 渐进调度 0→1
    
    for (x_s, y_s), x_t in zip(source_loader, target_loader):
        # 前向传播
        f_s = feature_extractor(x_s)       # 源域特征
        f_t = feature_extractor(x_t)       # 目标域特征
        
        # 标签预测（仅源域有标签）
        y_pred = label_predictor(f_s)
        L_y = cross_entropy(y_pred, y_s)
        
        # 域分类（梯度反转层）
        d_s = domain_classifier(GRL(f_s, λ))  # GRL: 前向=identity, 反向=×(-λ)
        d_t = domain_classifier(GRL(f_t, λ))
        L_d = cross_entropy(d_s, 0) + cross_entropy(d_t, 1)
        
        # 总损失（GRL已处理梯度方向，直接相加即可）
        loss = L_y + L_d
        loss.backward()
        optimizer.step()
```

##### 动机与理论背景

**问题**：在无监督域适应中，源域有大量标注数据，目标域仅有无标注数据。由于域偏移（domain shift），直接将源域训练的模型应用于目标域会严重退化。

**理论基础**：Ben-David et al. (2006, 2010) 证明了目标域风险的上界：

$$\epsilon_T(h) \leq \epsilon_S(h) + \frac{1}{2} d_{\mathcal{H}\Delta\mathcal{H}}(S, T) + \beta$$

其中 \(\epsilon_S(h)\) 为源域风险，\(d_{\mathcal{H}\Delta\mathcal{H}}\) 为 \(\mathcal{H}\)-散度（衡量两个域分布的差异），\(\beta\) 为理想联合假设的风险（通常假设很小）。

> 💡 **关键直觉**：要降低目标域风险，需要同时（1）在源域上分类准确，（2）让特征分布在两个域上尽量接近（减小 \(\mathcal{H}\)-散度）。

**\(\mathcal{H}\)-散度的代理**：\(d_{\mathcal{H}}\) 可通过训练一个域分类器来近似估计——域分类器越难区分两个域的样本，说明特征越域不变。这正是 DANN 中域分类器的角色。

##### 核心机制：梯度反转层（GRL）

GRL 是 DANN 最核心的技术创新，其定义为一个伪函数 \(R_\lambda\)：

$$R_\lambda(\mathbf{x}) = \mathbf{x} \quad \text{(前向传播)}$$

$$\frac{\partial R_\lambda}{\partial \mathbf{x}} = -\lambda \mathbf{I} \quad \text{(反向传播)}$$

**为什么这样设计？** DANN 的优化目标是一个鞍点问题：

$$E(\theta_f, \theta_y, \theta_d) = \frac{1}{n}\sum_{i=1}^{n} \mathcal{L}_y^i(\theta_f, \theta_y) - \lambda \left[\frac{1}{n}\sum_{i=1}^{n} \mathcal{L}_d^i(\theta_f, \theta_d) + \frac{1}{n'}\sum_{i=n+1}^{N} \mathcal{L}_d^i(\theta_f, \theta_d)\right]$$

需要找到：

$$\hat{\theta}_f, \hat{\theta}_y = \arg\min_{\theta_f, \theta_y} E(\theta_f, \theta_y, \hat{\theta}_d)$$
$$\hat{\theta}_d = \arg\max_{\theta_d} E(\hat{\theta}_f, \hat{\theta}_y, \theta_d)$$

对应的 SGD 更新规则：
- **特征提取器**：\(\theta_f \leftarrow \theta_f - \mu\left(\frac{\partial \mathcal{L}_y}{\partial \theta_f} - \lambda \frac{\partial \mathcal{L}_d}{\partial \theta_f}\right)\)
- **标签预测器**：\(\theta_y \leftarrow \theta_y - \mu \frac{\partial \mathcal{L}_y}{\partial \theta_y}\)
- **域分类器**：\(\theta_d \leftarrow \theta_d - \mu \lambda \frac{\partial \mathcal{L}_d}{\partial \theta_d}\)

> ⚠️ **注意**：对 \(\theta_f\) 的域损失梯度取**负号**（对抗），而对 \(\theta_d\) 取**正号**（正常最小化）。GRL 巧妙地将这种不对称性封装为一个可插入任何计算图的层，无需修改优化器。

##### 渐进式适应调度

直接设置 \(\lambda=1\) 会导致早期训练不稳定（此时特征提取器尚未学到有意义的表示，域分类器的噪声梯度会干扰学习）。因此采用渐进调度：

$$\lambda_p = \frac{2}{1 + \exp(-\gamma \cdot p)} - 1, \quad p = \frac{\text{current\_epoch}}{\text{total\_epochs}}$$

其中 \(\gamma=10\)。这使得 \(\lambda\) 从 0 平滑增长到 1，让特征提取器先学习基本的判别特征，再逐步引入域适应约束。

##### 与传统方法的对比

| 方法 | 核心思路 | 局限 |
|------|---------|------|
| **MMD-based** (DAN, DDC) | 最小化核空间中的最大均值差异 | 需选择核函数，仅对齐边缘分布 |
| **CORAL** | 对齐二阶统计量（协方差） | 仅捕获线性关系 |
| **DANN** | 对抗训练域分类器 | 端到端，自动学习非线性域不变映射 |

DANN 的优势在于：（1）理论动机明确（直接优化 \(\mathcal{H}\)-散度代理）；（2）实现极简（仅需一个 GRL 层）；（3）与任何前馈网络兼容，可作为即插即用模块。

##### 实验验证

**情感分析**（Amazon Reviews，4 域 × 12 迁移对）：DANN 在大多数迁移对上超越 SVM 和普通 NN 基线；结合 mSDA 特征后进一步提升。

**数字识别**：
| 迁移任务 | Source Only | DANN | Target Trained |
|----------|------------|------|----------------|
| MNIST → MNIST-M | ~52% | ~81.5% | ~96% |
| Syn Numbers → SVHN | ~86.7% | ~91.1% | ~92.4% |
| SVHN → MNIST | ~59.2% | ~71.1% | ~99.2% |

**交通标志**（Syn Signs → GTSRB）：DANN 显著缩小合成数据与真实数据的差距。

**Office 数据集**（Amazon/DSLR/Webcam，基于 AlexNet）：在全迁移设置下，DANN 大幅超越此前最优的无监督适应方法，尤其在 Amazon→Webcam 这一域偏移最大的场景。

**反向验证**：提出利用反向分类器在目标域上的准确率作为无监督超参选择的代理指标。

#### 🧪 练习题

```yaml
question: "DANN 中梯度反转层（GRL）在反向传播时的行为是什么？"
options:
  - "将梯度置零，阻止梯度流向特征提取器"
  - "将梯度乘以 -λ，反转梯度方向"
  - "将梯度乘以 λ，放大梯度信号"
  - "对梯度取绝对值后传递"
answer: 1
explain: "GRL 的核心定义是前向传播为恒等变换，反向传播将梯度乘以 -λ。这使得特征提取器收到来自域分类器的反向梯度，从而学习欺骗域分类器的域不变特征。"
```