### DeiT — 数据高效图像Transformer

```yaml
id: deit
name: DeiT
full_name: "数据高效图像Transformer (Data-efficient Image Transformers)"
year: 2020
org: Facebook AI
paper_url: "https://arxiv.org/abs/2012.12877"
category: visual_model
parent: ViT
motivation: "通过知识蒸馏和训练策略优化，仅用ImageNet-1K训练出与大数据预训练ViT竞争的视觉Transformer，解决数据依赖"
```

#### 📝 一句话总结

DeiT 提出了一套面向 Vision Transformer 的数据高效训练策略，并引入基于 distillation token 的知识蒸馏方法，仅使用 ImageNet-1K 数据即可训练出性能媲美甚至超越在 JFT-300M 上预训练的 ViT 的图像分类模型。

#### 🎯 核心要点

- **无需大规模外部数据**：仅用 ImageNet-1K（120万张图）训练，DeiT-B 达到 81.8% top-1，蒸馏后达 83.4%，384分辨率微调后达 85.2%，超越 ViT-B/JFT-300M 的 84.15%
- **Distillation Token 机制**：在 ViT 的 class token 之外新增一个可学习的 distillation token，专门用于从教师网络学习，与 class token 通过 self-attention 交互但学到互补表征
- **Hard Distillation 优于 Soft Distillation**：将教师的 hard decision（argmax）作为真实标签，结合 label smoothing 的交叉熵损失，效果优于传统 KL 散度的 soft distillation
- **ConvNet 教师优于 Transformer 教师**：使用 RegNetY-16GF（82.9%）作为教师效果最佳，蒸馏后的学生模型继承了 CNN 的归纳偏置
- **三个模型变体**：DeiT-Ti（5M参数）、DeiT-S（22M）、DeiT-B（86M），覆盖不同计算预算
- **完整训练策略**：AdamW 优化器、Rand-Augment、Mixup、CutMix、Random Erasing、Stochastic Depth、Repeated Augmentation、Label Smoothing、Cosine LR Decay

#### 🔬 深入细节

![DeiT 蒸馏框架示意图](https://ar5iv.labs.arxiv.org/html/2012.12877/assets/x3.png)
*图：DeiT 知识蒸馏框架。左侧为标准 ViT 的 class token 分类流程；右侧为 DeiT 新增的 distillation token，通过 Transformer 编码器与 class token 和 patch token 共同参与 self-attention，最终由教师网络（CNN）监督。*

##### 动机与背景

Vision Transformer（ViT）在 JFT-300M 等超大规模数据集上预训练后展现了强大的图像分类能力，但在仅使用 ImageNet-1K 训练时性能显著低于同等规模的卷积网络（ViT-B/16 仅 77.9% vs ResNet-152 的 78.3%）。核心原因在于 Transformer 缺乏卷积网络的归纳偏置（如局部性、平移等变性），需要更多数据来学习这些视觉先验。

DeiT 的目标是：**不改变 ViT 架构本身**，仅通过改进训练策略和引入知识蒸馏，使 Transformer 在 ImageNet-1K 上即可达到有竞争力的性能。

##### 核心机制一：数据高效训练策略

DeiT 系统性地整合了多种数据增强和正则化技术，构建了一套适合 Transformer 的训练配方：

| 组件 | 配置 |
|------|------|
| 优化器 | AdamW（lr = 0.0005 × batchsize/512） |
| 学习率调度 | Cosine Decay + 5 epoch Warmup |
| 权重衰减 | 0.05 |
| 数据增强 | Rand-Augment (9/0.5)、Mixup (0.8)、CutMix (1.0)、Random Erasing (0.25) |
| 正则化 | Stochastic Depth (0.1)、Label Smoothing (0.1) |
| 训练技巧 | Repeated Augmentation（3次重复） |
| 训练轮次 | 300 epochs（1000 epochs 可进一步提升） |

> 💡 **关键发现**：消融实验表明，去除 Mixup 或 CutMix 中的任一项都会导致性能大幅下降（81.8% → 78.7%/80.0%），而 Repeated Augmentation 贡献了约 5.3% 的提升（76.5% → 81.8%）。Dropout 反而有害，被排除在训练流程之外。

权重初始化采用截断正态分布（truncated normal distribution），这对 Transformer 的收敛至关重要。使用 SGD 替代 AdamW 会导致性能从 81.8% 骤降至 74.5%。

##### 核心机制二：Distillation Token 蒸馏

DeiT 的核心创新是引入了一个专用的 **distillation token**，其工作原理如下：

**输入构造**：给定输入图像，将其分割为 \(N\) 个 patch 并线性映射为 patch embedding，然后在序列前端拼接两个特殊 token：

$$\mathbf{z}_0 = [\mathbf{x}_{\text{class}};\; \mathbf{x}_{\text{distill}};\; \mathbf{x}_1^p;\; \mathbf{x}_2^p;\; \cdots;\; \mathbf{x}_N^p] + \mathbf{E}_{\text{pos}}$$

其中 \(\mathbf{x}_{\text{class}}\) 是标准的 class token，\(\mathbf{x}_{\text{distill}}\) 是新增的 distillation token，二者均为可学习参数。

**编码过程**：两个 token 与所有 patch token 一起通过 Transformer 编码器的 self-attention 层进行交互。在最后一层，class token 的输出 \(\mathbf{z}_L^{\text{class}}\) 用于与真实标签计算损失，distillation token 的输出 \(\mathbf{z}_L^{\text{distill}}\) 用于与教师网络的预测计算蒸馏损失。

**Soft Distillation** 使用 KL 散度对齐学生与教师的软概率分布：

$$\mathcal{L}_{\text{soft}} = (1-\lambda)\, \mathcal{L}_{\text{CE}}(\psi(Z_s),\, y) \;+\; \lambda\, \tau^2 \cdot \text{KL}\!\left(\psi(Z_s/\tau),\; \psi(Z_t/\tau)\right)$$

其中 \(\psi\) 为 softmax，\(Z_s, Z_t\) 分别为学生和教师的 logits，\(\tau=3.0\) 为温度参数，\(\lambda=0.1\) 为平衡系数。

**Hard Distillation**（DeiT 推荐方案）将教师的 argmax 预测视为伪标签：

$$\mathcal{L}_{\text{hard}} = \frac{1}{2}\, \mathcal{L}_{\text{CE}}(\psi(Z_s),\, y) \;+\; \frac{1}{2}\, \mathcal{L}_{\text{CE}}(\psi(Z_s),\, y_t)$$

其中 \(y_t = \arg\max_c Z_t(c)\) 为教师的硬标签。Hard distillation 将真实标签和教师标签等权混合，并对教师标签也施加 label smoothing（将 \(y_t\) 的概率设为 \(1-\varepsilon\)，其余类均分 \(\varepsilon\)）。

> ⚠️ **注意**：Hard distillation 之所以优于 soft distillation，一个重要原因是它与 label smoothing 和数据增强（如 CutMix、Mixup）的兼容性更好。Soft distillation 中教师的软标签与这些增强产生的混合标签可能存在冲突。

**推理阶段**：class token 和 distillation token 的输出通过各自的线性分类头得到两个预测，最终取二者 softmax 概率的平均值作为最终预测。

##### 核心机制三：教师选择与表征互补性

实验发现了一个反直觉的结论：**ConvNet 教师优于 Transformer 教师**。

| 教师网络 | 教师 Top-1 | 学生 Top-1 |
|----------|-----------|-----------|
| DeiT-B (Transformer) | 81.8% | 82.7% |
| RegNetY-16GF (CNN) | 82.9% | 83.4% |

这一现象的解释是：CNN 教师向 Transformer 学生传递了卷积网络特有的归纳偏置（局部性、平移等变性），弥补了 Transformer 的先天不足。

更有趣的是 **class token 与 distillation token 的表征分析**：
- 在初始层，两个 token 的余弦相似度仅为 0.06，说明它们学到了截然不同的表征
- 随着层数加深，相似度逐渐增加，在最后一层达到 0.93，但始终不完全相同
- Distillation token 的输出更接近 CNN 教师的预测（disagreement rate 10.0%），而 class token 更接近原始 DeiT（disagreement rate 10.9%）
- 融合两个 token 的预测（class + distill）比单独使用任一 token 都更好，验证了二者的互补性

```python
# DeiT 蒸馏训练伪代码
class DeiT(nn.Module):
    def __init__(self, ...):
        self.cls_token = nn.Parameter(torch.zeros(1, 1, embed_dim))      # class token
        self.dist_token = nn.Parameter(torch.zeros(1, 1, embed_dim))     # distillation token
        self.patch_embed = PatchEmbed(img_size, patch_size, embed_dim)
        self.pos_embed = nn.Parameter(torch.zeros(1, num_patches+2, embed_dim))
        self.transformer = TransformerEncoder(depth, heads, embed_dim)
        self.head = nn.Linear(embed_dim, num_classes)       # 分类头
        self.head_dist = nn.Linear(embed_dim, num_classes)  # 蒸馏头

    def forward(self, x):
        patches = self.patch_embed(x)                       # [B, N, D]
        # 拼接 class token 和 distillation token
        tokens = torch.cat([self.cls_token, self.dist_token, patches], dim=1)
        tokens = tokens + self.pos_embed
        tokens = self.transformer(tokens)                   # [B, N+2, D]
        cls_out = self.head(tokens[:, 0])                   # class token 输出
        dist_out = self.head_dist(tokens[:, 1])             # distillation token 输出
        return cls_out, dist_out

# 训练循环（Hard Distillation）
for images, labels in dataloader:
    cls_logits, dist_logits = student(images)
    with torch.no_grad():
        teacher_labels = teacher(images).argmax(dim=-1)     # 教师硬标签
    loss = 0.5 * CrossEntropy(cls_logits, labels) \
         + 0.5 * CrossEntropy(dist_logits, teacher_labels)  # 等权混合
    loss.backward()
    optimizer.step()

# 推理：融合两个 token 的预测
cls_logits, dist_logits = model(image)
prediction = (cls_logits.softmax(-1) + dist_logits.softmax(-1)) / 2
```

##### 与 ViT 及传统方法的对比

| 方法 | 预训练数据 | ImageNet Top-1 | 参数量 | 吞吐量 (img/s) |
|------|-----------|---------------|--------|----------------|
| ViT-B/16 | JFT-300M | 84.15% | 86M | 85.9 |
| ViT-B/16 | ImageNet-1K | 77.9% | 86M | 85.9 |
| DeiT-B | ImageNet-1K | 81.8% | 86M | 292.3 |
| DeiT-B⚗ | ImageNet-1K | 83.4% | 87M | 290.9 |
| DeiT-B⚗↑384 | ImageNet-1K | 85.2% | 87M | 85.8 |
| EfficientNet-B7 | ImageNet-1K | 84.3% | 66M | 55.1 |
| RegNetY-16GF | ImageNet-1K | 82.9% | 84M | 334.7 |

> 💡 **关键**：DeiT-B⚗↑384 以 85.2% 的 top-1 准确率超越了在 3 亿张图上预训练的 ViT-B（84.15%），同时仅需 ImageNet-1K 的 120 万张图训练。在迁移学习（CIFAR-10/100、Flowers、Cars、iNaturalist）上，DeiT 也与 EfficientNet 等 SOTA 卷积网络持平。

#### 🧪 练习题

```yaml
question: "DeiT 中 distillation token 的作用是什么？"
options:
  - "替代 class token 进行最终分类"
  - "作为额外的可学习 token，专门从教师网络学习蒸馏知识，与 class token 互补"
  - "用于生成数据增强的掩码"
  - "作为位置编码的一部分，增强空间信息"
answer: 1
explain: "Distillation token 是 DeiT 新增的可学习 token，通过 self-attention 与其他 token 交互，其输出由教师网络监督。它与 class token 学到互补表征（初始层余弦相似度仅 0.06），融合后分类性能优于单独使用任一 token。"
```