### FixMatch

```yaml
id: fixmatch
name: FixMatch
full_name: "FixMatch: Simplifying Semi-Supervised Learning with Consistency and Confidence"
year: '2020'
org: Google Research
paper_url: https://arxiv.org/abs/2001.07685
category: foundation
parent: —
motivation: 用置信度阈值伪标签与弱-强增强一致性正则化简化半监督学习
```

#### 📝 一句话总结

FixMatch 将伪标签（Pseudo-Labeling）与一致性正则化（Consistency Regularization）两大半监督学习技术极简地统一：对弱增强的无标签图像生成高置信度伪标签，再要求模型对同一图像的强增强版本预测出相同标签，以极简的设计在多个基准上取得了当时的最优性能。

#### 🎯 核心要点

- **两大经典技术的极简融合**：将伪标签（硬标签 + 置信度阈值过滤）与一致性正则化（弱增强 vs 强增强）合二为一
- **弱-强增强分离**：弱增强（随机翻转 + 平移）用于生成可靠的伪标签，强增强（RandAugment / CTAugment + Cutout）用于一致性训练
- **置信度阈值过滤**：仅当模型对弱增强图像的最大类别概率 \(\geq \tau\)（默认 0.95）时才保留伪标签，自然形成课程学习效果
- **无需损失权重退火**：不同于 UDA / ReMixMatch 需要逐步增大无标签损失权重，阈值机制本身在训练早期自动过滤大部分样本
- **统一超参数**：在 CIFAR-10/100、SVHN、STL-10 上使用完全相同的超参数集（\(\lambda_u=1, \eta=0.03, \tau=0.95, \mu=7, B=64\)）
- **极端低标签性能**：CIFAR-10 仅用 40 个标签（每类 4 个）即达到 88.61% 准确率；仅用 10 个标签（每类 1 个）可达约 78% 准确率
- **网络与优化**：使用 WideResNet + SGD（带动量）+ 余弦学习率衰减 + 权重衰减 + EMA 参数

#### 🔬 深入细节

![FixMatch 核心流程图](https://raw.githubusercontent.com/google-research/fixmatch/master/media/FixMatch%20diagram.png)
*图：FixMatch 流程示意。对无标签图像进行弱增强后送入模型获取预测（红框），当最大类别概率超过阈值（虚线）时将预测转为 one-hot 伪标签；同时对同一图像进行强增强后送入模型获取预测，通过交叉熵损失使强增强预测匹配伪标签。*

##### 算法伪代码

```python
# FixMatch 核心算法伪代码
# 输入: 标签数据 X = {(x_b, p_b)}, 无标签数据 U = {u_b}
# 超参数: τ (置信度阈值), λ_u (无标签损失权重), µ (无标签/标签批次比)

for each training step:
    # ===== 有监督损失 =====
    for x_b, p_b in labeled_batch(B):
        x_weak = weak_augment(x_b)           # 随机翻转 + 平移
        ℓ_s = CrossEntropy(p_b, model(x_weak))
    
    # ===== 无监督损失 =====
    for u_b in unlabeled_batch(µ * B):
        # 步骤 1: 用弱增强生成伪标签
        q_b = model(weak_augment(u_b))        # 模型对弱增强的预测
        q_hat = one_hot(argmax(q_b))          # 转为硬伪标签
        
        # 步骤 2: 置信度过滤
        mask_b = 1 if max(q_b) >= τ else 0    # 仅保留高置信度
        
        # 步骤 3: 用强增强计算一致性损失
        p_strong = model(strong_augment(u_b))  # 模型对强增强的预测
        ℓ_u += mask_b * CrossEntropy(q_hat, p_strong)
    
    # ===== 总损失 =====
    loss = ℓ_s + λ_u * ℓ_u
    optimizer.step(loss)
```

##### 动机与背景

半监督学习（SSL）旨在利用大量无标签数据提升模型性能，缓解标注数据稀缺的问题。在 FixMatch 之前，SSL 领域的两大主流技术路线分别是：

1. **伪标签（Pseudo-Labeling / Self-Training）**：用模型自身的预测作为无标签数据的"硬"标签进行训练，通常配合置信度阈值过滤低质量预测。其本质是一种熵最小化，鼓励模型在无标签数据上产生高置信度（低熵）预测。

2. **一致性正则化（Consistency Regularization）**：基于"模型对同一输入的不同扰动应产生相似预测"的假设，通过最小化不同扰动版本之间预测的差异来利用无标签数据。代表方法包括 Π-Model、Mean Teacher、UDA 等。

在 FixMatch 之前，最先进的方法如 MixMatch、UDA 和 ReMixMatch 虽然取得了优异性能，但引入了越来越多的复杂组件：温度锐化（sharpening）、分布对齐（Distribution Alignment）、MixUp 数据混合、自监督旋转损失、训练信号退火（Training Signal Annealing）等。这些组件增加了超参数数量和调参难度。

> 💡 关键：FixMatch 的核心洞察是——将伪标签和一致性正则化通过**弱-强增强分离**自然地统一起来：弱增强保证伪标签的质量（因为扰动小，预测更可靠），强增强提供足够的扰动使一致性约束具有实际意义（迫使模型学习对强变换不变的特征）。这一设计使得许多额外组件变得不必要。

##### 核心机制：弱-强增强 + 置信度伪标签

**损失函数设计**

FixMatch 的总损失由有监督损失 \(\ell_s\) 和无监督损失 \(\ell_u\) 两部分组成：

$$\mathcal{L} = \ell_s + \lambda_u \, \ell_u$$

**有监督损失**是标准的交叉熵损失，作用于弱增强的标签数据：

$$\ell_s = \frac{1}{B} \sum_{b=1}^{B} \mathrm{H}\!\left(p_b,\; p_m\!\left(y \mid \alpha(x_b)\right)\right)$$

其中 \(\alpha(\cdot)\) 为弱增强，\(p_b\) 为 one-hot 真实标签，\(B\) 为标签批次大小。

**无监督损失**是 FixMatch 的核心，结合了伪标签和一致性正则化：

$$\ell_u = \frac{1}{\mu B} \sum_{b=1}^{\mu B} \mathbb{1}\!\left(\max(q_b) \geq \tau\right) \cdot \mathrm{H}\!\left(\hat{q}_b,\; p_m\!\left(y \mid \mathcal{A}(u_b)\right)\right)$$

其中：
- \(q_b = p_m(y \mid \alpha(u_b))\) 是模型对**弱增强**无标签图像的预测分布
- \(\hat{q}_b = \text{argmax}(q_b)\) 是将预测转为 one-hot 的**硬伪标签**
- \(\mathcal{A}(\cdot)\) 为**强增强**
- \(\tau\) 为置信度阈值（默认 0.95）
- \(\mu\) 为无标签与标签批次大小的比值（默认 7）

> ⚠️ 注意：与标准伪标签方法（eq. 2）的关键区别在于——伪标签基于**弱增强**图像生成，而损失作用于**强增强**图像的预测。这引入了一致性正则化的效果，是 FixMatch 成功的关键。

**弱增强与强增强**

- **弱增强 \(\alpha(\cdot)\)**：仅包含随机水平翻转（50% 概率，SVHN 除外）和随机平移（上下左右最多 12.5%）。这种轻微扰动保证了模型预测的可靠性，从而生成高质量伪标签。

- **强增强 \(\mathcal{A}(\cdot)\)**：使用 RandAugment 或 CTAugment（均基于 AutoAugment 的变换库），随后叠加 Cutout。RandAugment 从预定义范围随机采样所有变换的强度；CTAugment 在线学习各变换的合适强度。这些强增强会产生严重失真的图像，迫使模型学习语义不变的特征。

**置信度阈值的课程学习效应**

训练初期，模型预测不确定，大部分无标签样本的 \(\max(q_b) < \tau\)，因此无监督损失的有效样本很少。随着训练推进，模型逐渐变得自信，越来越多样本通过阈值过滤。这自然形成了一种**课程学习（Curriculum Learning）**效果——从简单（高置信度）样本逐步过渡到困难样本——无需像 UDA 或 MixMatch 那样显式设计损失权重的退火策略。

##### 训练与优化细节

FixMatch 在所有数据集（除 ImageNet 外）上使用**完全相同的超参数**：

| 超参数 | 符号 | 值 |
|--------|------|----|
| 无标签损失权重 | \(\lambda_u\) | 1 |
| 学习率 | \(\eta\) | 0.03 |
| SGD 动量 | \(\beta\) | 0.9 |
| 置信度阈值 | \(\tau\) | 0.95 |
| 无标签批次倍数 | \(\mu\) | 7 |
| 标签批次大小 | \(B\) | 64 |
| 总训练步数 | \(K\) | \(2^{20}\) |

其他关键设计选择：
- **优化器**：SGD + 动量（优于 Adam）
- **学习率调度**：余弦衰减 \(\eta \cos\!\left(\frac{7\pi k}{16K}\right)\)
- **正则化**：权重衰减（weight decay）
- **参数平均**：使用模型参数的指数移动平均（EMA）报告最终性能
- **网络架构**：WideResNet-28-2（CIFAR-10/SVHN，1.5M 参数）、WRN-28-8（CIFAR-100）、WRN-37-2（STL-10）、ResNet-50（ImageNet）

##### 与先前方法的对比

| 方法 | 伪标签增强 | 预测增强 | 标签后处理 | 额外组件 |
|------|-----------|---------|-----------|---------|
| Π-Model | 弱 | 弱 | 无 | — |
| Mean Teacher | 弱 | 弱 | 无 | EMA 教师 |
| UDA | 弱 | 强 | 锐化 | 训练信号退火 |
| MixMatch | 弱 | 弱 | 锐化 | MixUp、多次增强平均 |
| ReMixMatch | 弱 | 强 | 锐化 | 分布对齐、旋转损失、MixUp |
| **FixMatch** | **弱** | **强** | **伪标签** | **无** |

FixMatch 可以被视为 UDA 和 ReMixMatch 的大幅简化版本：移除了锐化（sharpening）、训练信号退火、分布对齐、自监督旋转损失等组件，仅保留弱-强增强一致性和置信度阈值伪标签这两个核心要素。尽管如此，FixMatch 在 CIFAR-10（250 标签：5.07% 错误率 vs ReMixMatch 5.44%）、SVHN（250 标签：2.48% vs 2.92%）等基准上均取得了更优或可比的性能。

> 💡 关键：FixMatch 的成功表明，在半监督学习中，**数据增强的质量**（弱-强分离策略）和**伪标签的过滤机制**（高置信度阈值）是最关键的因素，而许多复杂的附加组件并非必要。

#### 🧪 练习题

```yaml
question: "FixMatch 中伪标签是基于哪种增强方式的模型预测生成的？"
options:
  - "强增强（如 RandAugment + Cutout）"
  - "弱增强（如随机翻转 + 平移）"
  - "无增强的原始图像"
  - "弱增强和强增强预测的平均"
answer: 1
explain: "FixMatch 使用弱增强图像的模型预测生成伪标签（保证预测可靠性），然后将该伪标签作为强增强图像预测的训练目标，从而实现一致性正则化。"
```