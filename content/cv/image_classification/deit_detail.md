### DeiT — 数据高效图像Transformer (Data-efficient Image Transformers)

```yaml
id: deit
name: DeiT
full_name: "数据高效图像Transformer (Data-efficient Image Transformers)"
year: 2021
org: Facebook AI
paper_url: https://arxiv.org/abs/2012.12877
category: foundation
parent: vit
motivation: "通过知识蒸馏和训练策略优化，仅用ImageNet-1k训练出有竞争力的ViT"
```

#### 📝 一句话总结

DeiT 提出了一套针对 Vision Transformer 的**数据高效训练策略**和基于 **distillation token 的知识蒸馏方法**，仅使用 ImageNet-1k 数据即可训练出超越在 JFT-300M 上预训练的 ViT-B 的模型（85.2% vs 84.15% top-1），证明了大规模外部数据并非训练高性能 ViT 的必要条件。

#### 🎯 核心要点

- **无需外部数据**：仅用 ImageNet-1k（128万张图）在单台 8-GPU 服务器上 53 小时即可训练出有竞争力的 ViT
- **Distillation Token 机制**：在 ViT 的 patch embedding 序列中新增一个可学习的蒸馏 token，与 class token 并行，通过自注意力交互学习教师模型的知识
- **Hard Distillation 优于 Soft Distillation**：硬标签蒸馏（83.0%）显著优于软标签蒸馏（81.8%），且无需调节温度 \(\tau\) 和权重 \(\lambda\) 超参数
- **CNN 教师优于 Transformer 教师**：使用 RegNetY-16GF（CNN，82.9%）作为教师，学生可通过蒸馏继承 CNN 的归纳偏置（局部性、平移等变性）
- **三种模型尺寸**：DeiT-Ti（5M）、DeiT-S（22M）、DeiT-B（86M），覆盖不同计算预算
- **关键训练策略**：AdamW 优化器、RandAugment、Mixup、CutMix、Stochastic Depth、Repeated Augmentation 等缺一不可
- **最佳结果**：DeiT⚗-B↑384 在 1000 epoch 训练下达到 **85.2% top-1**，超越 ViT-B/16@JFT-300M（84.15%）

#### 🔬 深入细节

![DeiT 蒸馏框架示意图](https://ar5iv.labs.arxiv.org/html/2012.12877v2/assets/x2.png)
*图：DeiT 的 distillation token 机制。在标准 ViT 的 class token 旁新增一个 distillation token，分别通过独立的线性分类头输出预测，训练时 class token 对应真实标签损失，distillation token 对应教师模型蒸馏损失。*

```python
# DeiT 蒸馏训练伪代码
import torch
import torch.nn.functional as F

class DeiT(nn.Module):
    def __init__(self, vit_backbone):
        super().__init__()
        self.backbone = vit_backbone          # 标准 ViT (patch embed + transformer blocks)
        self.cls_token = nn.Parameter(...)     # [1, 1, D] class token
        self.dist_token = nn.Parameter(...)    # [1, 1, D] distillation token (新增!)
        self.head = nn.Linear(D, num_classes)       # class head
        self.head_dist = nn.Linear(D, num_classes)  # distillation head (新增!)

    def forward(self, x):
        # x: [B, 3, 224, 224]
        patches = self.backbone.patch_embed(x)       # [B, N, D], N=196 for 16x16 patches
        tokens = torch.cat([self.cls_token, self.dist_token, patches], dim=1)  # [B, N+2, D]
        tokens = self.backbone.transformer(tokens)    # 12层 Transformer Encoder
        cls_out = self.head(tokens[:, 0])             # class token → 分类logits
        dist_out = self.head_dist(tokens[:, 1])       # distillation token → 蒸馏logits
        return cls_out, dist_out

# Hard Distillation 训练循环
teacher = RegNetY_16GF(pretrained=True).eval()  # CNN 教师模型, 82.9% top-1

for images, labels in dataloader:
    cls_logits, dist_logits = student(images)
    with torch.no_grad():
        teacher_labels = teacher(images).argmax(dim=-1)  # 教师硬标签

    # Hard Distillation Loss (Eq. 3)
    loss = 0.5 * F.cross_entropy(cls_logits, labels) \
         + 0.5 * F.cross_entropy(dist_logits, teacher_labels)
    loss.backward()
    optimizer.step()

# 推理时：两个 head 的 softmax 融合
def inference(model, x):
    cls_logits, dist_logits = model(x)
    return (cls_logits.softmax(dim=-1) + dist_logits.softmax(dim=-1)) / 2
```

##### 动机与背景

ViT（Vision Transformer）在 JFT-300M（3 亿张图像）上预训练后展现了卓越的图像分类性能，但在仅使用 ImageNet-1k（128 万张图像）训练时表现不佳——ViT-B/16 仅达到 77.9% top-1，远低于同等规模的 CNN（如 EfficientNet-B7 的 84.3%）。核心问题在于：**Transformer 缺乏 CNN 固有的归纳偏置**（局部连接、平移等变性），因此需要更多数据来学习这些视觉先验。

> 💡 **关键洞察**：与其收集更多数据，不如通过**知识蒸馏**从 CNN 教师中"继承"归纳偏置，同时配合精心设计的训练策略来弥补数据不足。

##### 核心机制 1：Distillation Token

DeiT 的核心创新是在 ViT 架构中引入一个专用的 **distillation token**。标准 ViT 在 patch embedding 序列前拼接一个 class token \([\texttt{CLS}]\)，DeiT 在此基础上再拼接一个 distillation token \([\texttt{DIST}]\)：

$$
\mathbf{z}_0 = [\mathbf{x}_{\text{class}};\, \mathbf{x}_{\text{dist}};\, \mathbf{x}_1^p;\, \mathbf{x}_2^p;\, \cdots;\, \mathbf{x}_N^p] + \mathbf{E}_{\text{pos}}
$$

两个 token 在所有 Transformer 层中通过自注意力与 patch token 交互，但在输出端连接**不同的线性分类头**：
- **Class head**：以真实标签 \(y\) 为监督目标
- **Distillation head**：以教师模型的输出为监督目标

> 💡 **为什么不直接用两个 class token？** 实验表明，两个相同目标的 class token 会在训练中收敛到几乎相同的向量（余弦相似度 0.999），不提供额外信息。而 distillation token 与 class token 学到的表示显著不同（初始层余弦相似度仅 0.06），在最后一层才逐渐趋近（0.93），说明两者提供了**互补的信息**。

##### 核心机制 2：Hard vs Soft Distillation

DeiT 探索了两种蒸馏策略：

**Soft Distillation**（传统 KD）：

$$
\mathcal{L}_{\text{soft}} = (1-\lambda)\,\mathcal{L}_{\text{CE}}(\psi(Z_s),\, y) + \lambda\,\tau^2\,\text{KL}\!\left(\psi\!\left(\frac{Z_s}{\tau}\right),\, \psi\!\left(\frac{Z_t}{\tau}\right)\right)
$$

其中 \(\psi\) 为 softmax，\(Z_s, Z_t\) 分别为学生和教师的 logits，\(\tau=3.0\) 为温度，\(\lambda=0.1\) 为平衡权重。

**Hard Distillation**（DeiT 推荐）：

$$
\mathcal{L}_{\text{hard}} = \frac{1}{2}\,\mathcal{L}_{\text{CE}}(\psi(Z_s),\, y) + \frac{1}{2}\,\mathcal{L}_{\text{CE}}(\psi(Z_s),\, y_t)
$$

其中 \(y_t = \arg\max_c Z_t(c)\) 是教师的硬预测标签。

> ⚠️ **关键发现**：Hard distillation 在 DeiT 上显著优于 soft distillation（83.0% vs 81.8%），这与传统 CNN 蒸馏中 soft distillation 通常更优的结论相反。原因可能是：(1) 硬标签与 label smoothing（\(\varepsilon=0.1\)）结合后已包含足够的软信息；(2) 硬标签无需调节 \(\tau\) 和 \(\lambda\)，更鲁棒。

##### 核心机制 3：CNN 教师传递归纳偏置

DeiT 发现 **CNN 教师优于 Transformer 教师**：

| 教师模型 | 教师 acc. | DeiT-B 学生 | DeiT-B↑384 |
|:---|:---:|:---:|:---:|
| DeiT-B (Transformer) | 81.8% | 81.9% | 83.1% |
| RegNetY-16GF (CNN) | 82.9% | 83.1% | 84.2% |

即使教师准确率接近，CNN 教师也能带来更大的提升。这是因为蒸馏过程中，学生 Transformer 可以**继承 CNN 的归纳偏置**——局部性和平移等变性等视觉先验通过教师的预测隐式传递给学生。实验还发现，distillation token 的输出与 CNN 教师的预测更相关，而 class token 的输出更接近纯标签训练的 Transformer。

##### 训练策略：数据增强与正则化

DeiT 的成功不仅依赖蒸馏，更依赖一套精心调优的训练策略。以下是关键组件的消融实验（DeiT-B, 300 epochs）：

| 配置变化 | 224² top-1 | 384² top-1 |
|:---|:---:|:---:|
| **完整配置（基线）** | **81.8%** | **83.1%** |
| SGD 替代 AdamW | 74.5% | 77.3% |
| 去掉 RandAugment | 79.6% | 80.4% |
| 去掉 Mixup | 78.7% | 79.8% |
| 去掉 CutMix | 80.0% | 80.6% |
| 去掉 Mixup + CutMix | 75.8% | 76.7% |
| 去掉 Stochastic Depth | 不收敛* | — |
| 去掉 Repeated Augmentation | 76.5% | 77.4% |
| 加入 Dropout | 81.3% | 83.1% |

> 💡 **关键训练超参数**：300 epochs，batch size 1024，AdamW（lr=5×10⁻⁴ × batchsize/512），cosine LR decay，weight decay 0.05，warmup 5 epochs，label smoothing ε=0.1，stochastic depth rate 0.1，RandAugment 9/0.5，Mixup α=0.8，CutMix α=1.0，Random Erasing p=0.25。

核心结论：
1. **AdamW 是必须的**——SGD 导致 7.3% 的巨大性能下降
2. **Mixup + CutMix 组合至关重要**——去掉两者导致 6% 下降
3. **Stochastic Depth 不可或缺**——没有它模型无法收敛
4. **Repeated Augmentation 贡献巨大**——去掉导致 5.3% 下降
5. **Dropout 反而有害**——与 Stochastic Depth 存在冲突

##### 模型变体与最终结果

| 模型 | Embedding dim | Heads | Params | ImageNet top-1 |
|:---|:---:|:---:|:---:|:---:|
| DeiT-Ti | 192 | 3 | 5M | 72.2% |
| DeiT-S | 384 | 6 | 22M | 79.8% |
| DeiT-B | 768 | 12 | 86M | 81.8% |
| DeiT⚗-B | 768 | 12 | 86M | 83.4% |
| DeiT⚗-B↑384 | 768 | 12 | 86M | 84.4% |
| DeiT⚗-B↑384 (1000ep) | 768 | 12 | 86M | **85.2%** |
| ViT-B/16@JFT-300M | 768 | 12 | 86M | 84.15% |

DeiT⚗-B↑384 在 1000 epoch 训练下达到 85.2%，**仅用 ImageNet-1k 就超越了在 JFT-300M（3 亿张图像）上预训练的 ViT-B**。同时，DeiT 在下游任务（CIFAR-10/100、Flowers、Cars、iNaturalist 等）上的迁移学习表现也与 CNN 和大数据预训练的 ViT 相当。

#### 🧪 练习题

```yaml
question: "DeiT 中 hard distillation 优于 soft distillation 的关键原因是什么？"
options:
  - "hard distillation 使用了更高的温度参数 τ"
  - "hard distillation 的教师硬标签配合 label smoothing 已包含足够信息，且无需调节 τ 和 λ 超参数"
  - "hard distillation 使用了更强的数据增强策略"
  - "hard distillation 的梯度更新幅度更大，收敛更快"
answer: 1
explain: "Hard distillation 将教师的 argmax 硬标签作为伪标签，配合 label smoothing (ε=0.1) 已隐式包含软信息，同时避免了 soft distillation 中温度 τ 和权重 λ 的超参数敏感性问题，在 DeiT 上达到 83.0% vs 81.8% 的显著优势。"
```