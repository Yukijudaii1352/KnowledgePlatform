### Deep Image Prior — 深度图像先验

```yaml
id: deep-image-prior
name: Deep Image Prior
full_name: 深度图像先验 (Deep Image Prior)
year: "2018"
org: Skolkovo Institute / Yandex / University of Oxford
paper_url: https://arxiv.org/abs/1711.10925
category: foundation
parent: —
motivation: 利用卷积神经网络结构本身作为图像先验，无需任何训练数据即可完成去噪、超分辨率、修复等多种图像恢复任务
```

#### 📝 一句话总结

Deep Image Prior 揭示了卷积神经网络的**结构本身**就蕴含了强大的图像先验——通过将随机初始化的 CNN 拟合到单张退化图像，网络会优先学习自然图像结构而抵抗噪声，从而在**无需任何外部训练数据**的情况下实现去噪、超分辨率、修复等多种图像恢复任务。

#### 🎯 核心要点

- **核心发现**：CNN 的 encoder-decoder（hourglass）架构对自然图像具有隐式先验偏好，对噪声具有高阻抗、对信号具有低阻抗
- **无需训练数据**：仅使用单张退化图像，通过优化随机初始化网络参数来恢复图像，不依赖任何外部数据集
- **统一框架**：同一方法适用于去噪、超分辨率、修复（inpainting）、JPEG 去伪影、flash-no flash 重建等多种任务
- **参数化重构**：将图像恢复问题转化为 \(\theta^* = \arg\min_\theta E(f_\theta(z); x_0)\)，用网络参数空间替代像素空间优化
- **早停策略**：利用网络先学信号后学噪声的特性，通过限制迭代次数实现正则化
- **架构选择**：采用带 skip connection 的 U-Net/hourglass 架构，bilinear 上采样，LeakyReLU 激活，ADAM 优化器
- **噪声正则化**：每次迭代对输入 \(z\) 添加微小扰动以增强鲁棒性

#### 🔬 深入细节

##### 核心框架图

![Deep Image Prior 核心流程](https://ar5iv.labs.arxiv.org/html/1711.10925/assets/cropped_pipeline3.jpg)
*图 1：Deep Image Prior 方法流程。将固定随机输入 z 通过随机初始化的 CNN \(f_\theta\) 生成图像，通过最小化与退化图像 \(x_0\) 的数据项来优化参数 \(\theta\)。*

![噪声阻抗直觉](https://ar5iv.labs.arxiv.org/html/1711.10925/assets/cropped_intuition.jpg)
*图 3：Deep Image Prior 的直觉解释。左：标准正则化在像素空间中约束解集；右：Deep Image Prior 通过网络参数化隐式约束解集，限制迭代次数等价于投影到网络可快速表达的图像子集。*

![学习曲线对比](https://ar5iv.labs.arxiv.org/html/1711.10925/assets/bill_curve_t.jpg)
*图 4：不同类型图像的拟合速度对比。自然图像（绿线）拟合最快，噪声图像（红线）拟合最慢——网络结构对自然图像具有天然偏好。*

##### 算法伪代码

```python
# Deep Image Prior 核心算法
import torch

def deep_image_prior(x0, task_loss_fn, net_arch='unet', 
                     num_iter=3000, lr=0.01, sigma_p=1/30):
    """
    x0: 退化图像 (观测)
    task_loss_fn: 任务相关的数据项 E(x; x0)
      - 去噪:   ||x - x0||^2
      - 超分:   ||downsample(x) - x0||^2
      - 修复:   ||(x - x0) ⊙ mask||^2
    net_arch: 网络架构 (encoder-decoder with skip connections)
    num_iter: 最大迭代次数 (早停正则化)
    sigma_p: 输入噪声扰动标准差
    """
    # 1. 随机初始化
    z = torch.rand(1, C, H, W) * 0.1       # 固定随机输入
    net = build_network(net_arch)            # 随机初始化参数 θ
    optimizer = torch.optim.Adam(net.parameters(), lr=lr)
    
    best_loss = float('inf')
    best_out = None
    
    # 2. 迭代优化
    for i in range(num_iter):
        # 输入噪声正则化
        z_perturbed = z + torch.randn_like(z) * sigma_p
        
        # 前向传播: x = f_θ(z)
        x = net(z_perturbed)
        
        # 计算任务损失: E(f_θ(z); x0)
        loss = task_loss_fn(x, x0)
        
        # 反向传播优化 θ
        optimizer.zero_grad()
        loss.backward()
        optimizer.step()
        
        # 跟踪最优 (防止destabilization)
        if loss.item() < best_loss:
            best_loss = loss.item()
            best_out = x.detach()
    
    return best_out  # 恢复后的图像
```

##### 方法深入解析

**1. 动机与背景：为什么 CNN 结构本身就是先验？**

传统图像恢复方法将问题建模为：

$$x^* = \arg\min_x E(x; x_0) + R(x)$$

其中 \(E(x; x_0)\) 是数据保真项，\(R(x)\) 是显式先验（如 Total Variation、BM3D 等）。近年来基于深度学习的方法通过在大规模数据集上训练 CNN 来隐式学习先验，取得了巨大成功。

> 💡 **关键洞察**：Deep Image Prior 的核心发现是——即使**完全不使用训练数据**，CNN 的网络结构本身就对自然图像有强烈偏好。这意味着深度学习在图像恢复中的成功，很大程度上来自网络架构的归纳偏置（inductive bias），而非仅仅是从数据中学到的统计规律。

**2. 核心机制：参数化重构**

Deep Image Prior 将图像恢复问题重新参数化。不再直接优化像素 \(x\)，而是用神经网络 \(f_\theta\) 将固定随机编码 \(z\) 映射为图像：

$$\theta^* = \arg\min_\theta E(f_\theta(z); x_0)$$

$$x^* = f_{\theta^*}(z)$$

这里 \(z\) 是固定的随机张量（从 \(U(0, 0.1)\) 采样），\(\theta\) 是网络参数。关键在于：**网络结构限制了 \(f_\theta(z)\) 可以表达的图像集合**，这个集合天然偏向自然图像。

> ⚠️ **注意**：理论上，给定足够的迭代次数，网络最终能拟合任何图像（包括纯噪声）。但自然图像的拟合速度远快于噪声——这就是"噪声阻抗"特性。

**3. 噪声阻抗与早停正则化**

论文通过实验（图 4）展示了关键现象：
- 拟合自然图像：收敛极快（~几百次迭代）
- 拟合自然图像+噪声：先快速学到信号，再缓慢拟合噪声
- 拟合随机排列像素/纯噪声：收敛极慢

这意味着在优化过程中存在一个"甜蜜点"——信号已被充分学习但噪声尚未被拟合。通过**早停**（限制迭代次数），可以自然地实现去噪效果，无需显式正则化项。

**4. 网络架构：Hourglass + Skip Connections**

![网络架构](https://ar5iv.labs.arxiv.org/html/1711.10925/assets/x1.png)
*图 21：实验中使用的 encoder-decoder（hourglass）架构，带有 skip connections（黄色箭头）。*

论文采用 U-Net 风格的 encoder-decoder 架构：
- **Encoder（下采样路径）**：使用带步长的卷积进行下采样，逐层提取多尺度特征
- **Decoder（上采样路径）**：使用双线性插值上采样 + 卷积恢复空间分辨率
- **Skip Connections**：在对应尺度的 encoder 和 decoder 之间建立跳跃连接，每个 skip 包含一个卷积层
- **激活函数**：LeakyReLU
- **填充方式**：反射填充（reflection padding）

> 💡 **为什么 hourglass + skip 有效？** 论文通过"采样"实验（图 5）揭示：不同深度的 hourglass 网络生成具有不同尺度自相似结构的图像。Skip connections 使网络能同时捕获多尺度结构——这正是自然图像的典型特征。卷积操作在整个视觉域上共享滤波器，天然施加了平移不变性和局部自相似性。

![不同架构的随机采样](https://ar5iv.labs.arxiv.org/html/1711.10925/assets/skip_0_bilinear.jpg)
*图 5d：带 skip connections 的 hourglass 网络随机采样结果，展示了多尺度自相似结构。*

**5. 各任务的数据项设计**

Deep Image Prior 的通用性体现在：只需更换数据项 \(E(x; x_0)\)，同一框架即可应用于不同任务：

| 任务 | 数据项 \(E(x; x_0)\) | 说明 |
|------|----------------------|------|
| 去噪 | \(\|x - x_0\|^2\) | 直接拟合含噪图像，依赖早停 |
| 超分辨率 | \(\|d(x) - x_0\|^2\) | \(d(\cdot)\) 为下采样算子 |
| 修复 | \(\|(x - x_0) \odot m\|^2\) | \(m\) 为已知区域的二值掩码 |
| JPEG 去伪影 | \(\|x - x_0\|^2\) | 同去噪，利用早停去除块效应 |

**6. 与传统方法及学习方法的对比**

| 特性 | 传统先验 (TV/BM3D) | 学习方法 (DnCNN等) | Deep Image Prior |
|------|-------------------|-------------------|-----------------|
| 需要训练数据 | ❌ | ✅ 大量 | ❌ |
| 先验来源 | 手工设计 | 数据驱动 | 网络结构 |
| 通用性 | 任务特定 | 任务特定 | 多任务统一 |
| 推理速度 | 快 | 极快 | 慢（需迭代优化） |
| 恢复质量 | 中等 | 最优 | 接近学习方法 |

在超分辨率任务上，Deep Image Prior 在 Set14 数据集 4× 上采样中取得平均 27.00 dB PSNR，优于 Bicubic（26.05 dB）和 TV prior（26.42 dB），接近需要大量训练数据的 LapSRN（28.13 dB）。

**7. 技术细节**

- **输入 \(z\)**：32 通道随机噪声 \(z \sim U(0, 0.1)\)；修复任务可用 meshgrid 输入增强平滑性
- **优化器**：ADAM，学习率 0.01
- **输入扰动**：每次迭代对 \(z\) 添加 \(\sigma_p = 1/30\) 的高斯噪声
- **防崩溃机制**：监控损失，若相邻迭代损失差异过大则回退参数
- **典型超参数**：\(n_u = n_d = [128, 128, 128, 128, 128]\)，\(n_s = [4, 4, 4, 4, 4]\)，\(k_u = k_d = [3, 3, 3, 3, 3]\)，\(k_s = [1, 1, 1, 1, 1]\)

#### 🧪 练习题

```yaml
question: "Deep Image Prior 方法能够实现图像去噪的根本原因是什么？"
options:
  - "网络在大规模图像数据集上预训练后学到了去噪能力"
  - "CNN 的卷积结构对自然图像有隐式偏好，拟合噪声的速度远慢于拟合信号"
  - "使用了特殊设计的去噪损失函数来抑制噪声"
  - "通过对抗训练使网络学会区分信号和噪声"
answer: 1
explain: "Deep Image Prior 的核心发现是 CNN 架构本身对自然图像具有结构性偏好（低阻抗），而对噪声具有高阻抗。因此在优化过程中，网络会优先拟合图像的自然结构，通过早停即可在噪声被拟合之前获得去噪结果，整个过程无需任何训练数据。"
```