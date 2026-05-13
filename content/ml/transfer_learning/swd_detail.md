### SWD — 切片Wasserstein差异 (Sliced Wasserstein Discrepancy)

```yaml
id: swd
name: SWD
full_name: "切片Wasserstein差异 (Sliced Wasserstein Discrepancy)"
year: 2019
org: Boston University
paper_url: "https://arxiv.org/abs/1903.04064"
category: method
parent: "—"
motivation: "用切片Wasserstein距离度量分类器输出差异，无需额外判别器网络即可实现端到端域适应"
```

#### 📝 一句话总结

SWD 提出使用切片 Wasserstein 距离（Sliced Wasserstein Distance）度量两个分类器输出分布的差异，通过对抗性最大化-最小化该差异实现无监督域适应，无需额外判别器网络且天然具有几何意义，在分类、分割、检测等多任务上均取得 SOTA 表现。

#### 🎯 核心要点

- 三组件对抗框架：特征生成器 G + 两个分类器 C1、C2，无需额外判别器网络
- 切片 Wasserstein 距离作为差异度量：将高维分布投影到 1D 方向后排序配对计算距离，计算高效且无需对抗训练
- 三步训练流程：Step A（联合训练 G+C 最小化源域分类损失）→ Step B（固定 G，最大化 C1/C2 在目标域的 SWD）→ Step C（固定 C，最小化 G 使目标域特征靠近源域支撑）
- M 个随机方向投影（分类任务 M=128，分割任务 M=8 即足够）
- 跨任务通用性验证：数字识别、VisDA 图像分类、GTA5/Synthia→Cityscapes 语义分割、VisDA 目标检测

#### 🔬 深入细节

##### 框架示意图

![SWD 框架总览](https://arxiv.org/html/1903.04064v1/extracted/figures/framework.png)

*图：SWD 方法框架。特征生成器 G 提取特征，两个分类器 C1/C2 的输出概率分布通过切片 Wasserstein 距离度量差异。训练通过对抗性最大化（Step B）和最小化（Step C）该差异实现域适应。*

##### 算法伪代码

```python
# SWD 域适应训练伪代码
for iteration in range(max_iter):
    # Step A: 联合训练 G 和 C，最小化源域分类损失
    x_s, y_s = sample_source_batch()
    loss_A = CrossEntropy(C1(G(x_s)), y_s) + CrossEntropy(C2(G(x_s)), y_s)
    update(G, C1, C2, minimize=loss_A)

    # Step B: 固定 G，最大化 C1/C2 在目标域输出的 SWD
    x_t = sample_target_batch()
    p1, p2 = C1(G(x_t)), C2(G(x_t))  # 两个分类器的 softmax 输出
    loss_B = -SWD(p1, p2)  # 最大化差异
    update(C1, C2, minimize=loss_B)  # G 固定

    # Step C: 固定 C，最小化 SWD（让 G 生成域不变特征）
    x_t = sample_target_batch()
    p1, p2 = C1(G(x_t)), C2(G(x_t))
    loss_C = SWD(p1, p2)  # 最小化差异
    update(G, minimize=loss_C)  # C1, C2 固定

def SWD(p1, p2, M=128):
    """切片 Wasserstein 距离"""
    total = 0
    for m in range(M):
        theta = random_unit_vector()        # 随机方向
        proj1 = sort(p1 @ theta)            # 投影并排序
        proj2 = sort(p2 @ theta)            # 投影并排序
        total += mean(|proj1 - proj2|^2)    # 排序后逐位配对求距离
    return total / M
```

##### 动机与背景

无监督域适应（UDA）的核心挑战是：源域有标签、目标域无标签，如何让模型在目标域也表现良好。传统方法主要有两条路线：

1. **基于判别器的方法**（如 DANN、CyCADA）：引入额外的域判别器网络对抗训练，但判别器网络往往比主任务网络更大（例如 CyCADA 用 10 层生成器 + 6 层图像判别器 + 3 层特征判别器，而主网络仅 4 层），且训练后被丢弃。
2. **基于最大分类器差异的方法**（MCD）：用两个分类器的预测差异度量域偏移，但使用 L1 距离缺乏几何意义，无法捕捉分布间的结构性差异。

> 💡 关键：SWD 的核心洞察是——切片 Wasserstein 距离既具有最优传输的几何意义（能感知分布的形状和支撑），又因为 1D 投影后有闭式解而计算高效，无需训练判别器。

##### 核心机制：切片 Wasserstein 距离

**Wasserstein 距离**（又称 Earth Mover's Distance）度量将一个分布"搬运"到另一个分布的最小代价：

$$W_p(\mu, \nu) = \left( \inf_{\gamma \in \Gamma(\mu,\nu)} \int \|x - y\|^p \, d\gamma(x,y) \right)^{1/p}$$

直接计算 Wasserstein 距离在高维空间中代价极高（\(O(n^3 \log n)\)）。**切片 Wasserstein 距离**通过 Radon 变换将问题分解为多个 1D 问题：

$$\widetilde{W}_p(\mu, \nu) = \left( \int_{\mathbb{S}^{d-1}} W_p^p(\mathcal{R}\mu(\cdot, \theta), \mathcal{R}\nu(\cdot, \theta)) \, d\theta \right)^{1/p}$$

其中 \(\mathcal{R}\mu(\cdot, \theta)\) 是分布 \(\mu\) 在方向 \(\theta\) 上的 Radon 变换（即投影到 1D）。关键性质：**1D Wasserstein 距离有闭式解——只需将两组样本排序后逐位配对计算距离**：

$$W_p^p(\hat{\mu}_\theta, \hat{\nu}_\theta) = \frac{1}{N} \sum_{i=1}^{N} |s_{\mu}^{(i)} - s_{\nu}^{(i)}|^p$$

其中 \(s_{\mu}^{(i)}\) 和 \(s_{\nu}^{(i)}\) 分别是投影后排序的第 \(i\) 个样本。

实际计算中，用 M 个随机方向近似积分：

$$\text{SWD}(p_1, p_2) \approx \frac{1}{M} \sum_{m=1}^{M} W_p^p(\text{sort}(p_1 \cdot \theta_m), \text{sort}(p_2 \cdot \theta_m))$$

> ⚠️ 注意：SWD 作用在分类器的 **softmax 输出**（概率单纯形上的分布）而非特征空间，这使得它直接度量任务相关的预测差异。

##### 三步对抗训练流程

训练过程形成 minimax 博弈：

**Step A — 源域监督训练**：生成器 G 和两个分类器 C1、C2 联合最小化源域交叉熵损失：

$$\min_{G, C_1, C_2} \mathcal{L}_{cls}(X_s, Y_s)$$

**Step B — 最大化差异**：固定 G，训练 C1/C2 最大化它们在目标域输出的 SWD，使两个分类器在目标域"分歧"最大化，从而暴露目标域中远离源域支撑的样本：

$$\max_{C_1, C_2} \text{SWD}(p_1^t, p_2^t)$$

**Step C — 最小化差异**：固定 C1/C2，训练 G 最小化 SWD，迫使生成器产生使两个分类器一致的特征，即目标域特征被拉入源域分类器的决策支撑区域：

$$\min_G \text{SWD}(p_1^t, p_2^t)$$

> 💡 关键：与 MCD 使用 L1 距离不同，SWD 在概率单纯形上具有几何意义——它能感知分布的"形状"而非仅仅逐点差异。例如，两个均匀分布即使支撑不重叠，SWD 仍能给出有意义的梯度方向。

##### 与传统方法的区别

| 特性 | DANN/CyCADA | MCD | SWD (本文) |
|------|-------------|-----|------------|
| 额外网络 | 需要判别器 | 不需要 | 不需要 |
| 差异度量 | 对抗损失 | L1 距离 | 切片 Wasserstein 距离 |
| 几何意义 | 无（二分类代理） | 弱 | 强（最优传输） |
| 计算复杂度 | 高（训练判别器） | 低 | 低（排序 \(O(N\log N)\)） |
| 任务通用性 | 需针对任务设计 | 通用 | 通用 |

##### 实验亮点

- **数字识别**（SVHN→MNIST）：99.3% 准确率，超越 MCD (96.2%) 和 DANN (76.6%)
- **VisDA 图像分类**（合成→真实）：76.4% 平均准确率，超越 MCD (71.9%)
- **语义分割**（GTA5→Cityscapes）：VGG16 backbone 39.9 mIoU，ResNet101 backbone 44.5 mIoU，均为当时 SOTA
- **目标检测**（VisDA 2018）：5.9 mAP，超越 MCD (4.7) 25% 相对提升

#### 🧪 练习题

```yaml
question: "SWD 方法中，切片 Wasserstein 距离的计算核心步骤是什么？"
options:
  - "训练一个判别器网络区分两个分布"
  - "将高维分布投影到随机 1D 方向，排序后逐位配对计算距离"
  - "计算两个分布的 KL 散度"
  - "对特征向量逐维度取绝对差的均值"
answer: 1
explain: "SWD 通过随机方向投影将高维最优传输问题分解为多个 1D 问题，1D Wasserstein 距离的闭式解就是排序后逐位配对求距离，无需训练额外网络。"
```