### DINO: 自监督视觉 Transformer 蒸馏 (Self-Distillation with No Labels)

```yaml
id: dino
name: DINO
full_name: "自监督视觉 Transformer 蒸馏 (Self-Distillation with No Labels)"
year: "2021"
org: "Facebook AI Research / Inria"
paper_url: "https://openaccess.thecvf.com/content/ICCV2021/html/Caron_Emerging_Properties_in_Self-Supervised_Vision_Transformers_ICCV_2021_paper.html"
category: visual_model
parent: "—"
motivation: "通过自蒸馏框架训练 ViT，使其自注意力图自动涌现语义分割能力"
```

#### 📝 一句话总结

DINO 提出了一种基于自蒸馏（self-distillation）的自监督训练框架，通过 student-teacher 架构与动量更新机制训练 Vision Transformer，发现 ViT 的自注意力图能自动涌现出显式的语义分割能力，并在 ImageNet 线性评估上以 ViT-Base 达到 80.1% top-1 准确率。

#### 🎯 核心要点

- **自蒸馏框架**：Student 网络和 Teacher 网络共享相同架构，Teacher 通过指数移动平均（EMA）更新，无需标签
- **Multi-crop 数据增强**：Student 接收全局视图和局部视图，Teacher 仅接收全局视图，鼓励 "local-to-global" 对应学习
- **防止模式坍塌**：结合 Centering（减去 teacher 输出的指数移动均值）和 Sharpening（低温度 softmax）两种机制，无需对比负样本
- **涌现语义分割**：ViT 的 [CLS] token 自注意力图自动学习到类别特定的语义分割，无需任何像素级标注
- **k-NN 分类器友好**：学到的特征在 k-NN 评估中表现优异，无需任何微调即可达到接近线性探针的性能
- **多任务迁移能力**：在图像检索（Oxford/Paris）、拷贝检测（Copydays）、视频目标分割（DAVIS 2017）等下游任务上均表现出色

#### 🔬 深入细节

##### 核心框架示意图

![DINO 自蒸馏框架](https://ar5iv.labs.arxiv.org/html/2104.14294/assets/x1.png)
*图：DINO 自蒸馏训练框架。输入图像经过不同增强生成多个视图，Student 和 Teacher 共享架构但参数不同，Teacher 通过 EMA 更新。两者输出经过 softmax 归一化后计算交叉熵损失。*

##### 算法伪代码

```python
# DINO PyTorch 伪代码（简化版，不含 multi-crop）
# gs, gt: student 和 teacher 网络
# C: centering 变量
# tps, tpt: student 和 teacher 温度
# l, m: 网络更新率和 EMA 动量

gt.params = gs.params  # 初始化 teacher = student
for x in loader:  # 加载一个 mini-batch x
    x1, x2 = augment(x), augment(x)  # 随机增强生成两个视图

    # Student 和 Teacher 前向传播
    s1, s2 = gs(x1), gs(x2)
    t1, t2 = gt(x1), gt(x2)

    # 计算损失：交叉熵 H(teacher, student)
    loss = H(t1, s2) / 2 + H(t2, s1) / 2

    loss.backward()         # 反向传播更新 student
    update(gs)              # SGD 更新 student 参数

    # EMA 更新 teacher
    gt.params = m * gt.params + (1 - m) * gs.params

    # 更新 center
    C = m * C + (1 - m) * cat([t1, t2]).mean(dim=0)

def H(t, s):
    """交叉熵损失，含 centering 和 sharpening"""
    t = softmax((t - C) / tpt, dim=-1)  # teacher: centering + sharpening
    s = softmax(s / tps, dim=-1)         # student: 普通 softmax
    return - (t * log(s)).sum(dim=-1).mean()
```

##### 动机与背景

自监督学习（Self-Supervised Learning, SSL）在 NLP 领域取得了巨大成功（如 BERT、GPT），但在计算机视觉中，SSL 方法主要依赖 CNN 架构（如 MoCo、SimCLR、BYOL、SwAV）。这些方法通常需要对比学习中的负样本、大 batch size 或特殊的归一化技巧来避免表征坍塌（representation collapse）。

DINO 的核心问题是：**能否设计一种简单的自监督框架，使 Vision Transformer 学到具有涌现语义理解能力的特征？** 作者发现，当将自蒸馏（self-distillation）与 ViT 结合时，模型的自注意力图会自动涌现出语义分割能力——这一特性在 CNN 或监督训练的 ViT 中均不明显。

##### 核心机制详解

**1. Student-Teacher 自蒸馏架构**

DINO 的核心思想来源于知识蒸馏，但与传统蒸馏不同的是，Student 和 Teacher 使用**完全相同的网络架构**（ViT 或 ResNet），且 Teacher 不需要预训练——它通过 Student 的指数移动平均（EMA）动态构建：

$$\theta_t \leftarrow \lambda \theta_t + (1 - \lambda) \theta_s$$

其中 \(\theta_t\) 和 \(\theta_s\) 分别是 Teacher 和 Student 的参数，\(\lambda\) 是动量系数。训练过程中 \(\lambda\) 从 0.996 按余弦调度逐渐增大到 1，使 Teacher 在训练后期更加稳定。

> 💡 关键：EMA Teacher 相当于 Student 历史参数的集成（ensemble），提供了比 Student 更平滑、更稳定的目标分布，这是 DINO 成功的核心因素之一。

**2. Multi-crop 增强策略**

输入图像被增强为两种类型的视图：
- **全局视图（global views）**：覆盖图像 50% 以上区域，分辨率 224×224，共 2 个
- **局部视图（local views）**：覆盖图像不到 50% 区域，分辨率 96×96，共若干个（默认 6 个）

Teacher 仅处理全局视图，而 Student 处理所有视图（包括局部视图）。这种不对称设计鼓励 Student 从局部信息推断全局语义（"local-to-global" 对应），显著提升了特征质量。

**3. 避免模式坍塌：Centering + Sharpening**

自蒸馏框架面临的最大挑战是模式坍塌——Teacher 和 Student 可能收敛到输出常数向量的平凡解。DINO 通过两个互补机制解决这一问题：

- **Centering**：维护 Teacher 输出的指数移动均值 \(\mathbf{c}\)，并在 softmax 之前减去它：

$$P_t(x)^{(i)} = \frac{\exp(g_t(x)^{(i)} - c^{(i)}) / \tau_t}{\sum_k \exp(g_t(x)^{(k)} - c^{(k)}) / \tau_t}$$

Centering 防止某一维度主导输出，但单独使用会鼓励均匀分布（另一种坍塌形式）。

- **Sharpening**：使用较低的 Teacher 温度 \(\tau_t\)（如 0.04，远低于 Student 温度 \(\tau_s = 0.1\)），使 Teacher 输出更加尖锐（peaked），避免均匀分布坍塌。

> ⚠️ 注意：Centering 和 Sharpening 必须同时使用才能有效防止坍塌。Centering 防止单一维度坍塌，Sharpening 防止均匀分布坍塌，二者形成互补。

**4. 投影头设计**

网络的输出经过一个 3 层 MLP 投影头（隐藏层维度 2048），最后接一个 \(\ell_2\) 归一化层和一个权重归一化的全连接层，输出 \(K\) 维向量（默认 \(K = 65536\)）。值得注意的是，DINO **不使用 Batch Normalization**，这与 BYOL 等方法形成对比——BYOL 依赖 BN 来隐式传递 batch 统计信息以避免坍塌，而 DINO 通过 centering + sharpening 显式解决了这一问题。

##### 与传统方法的关键区别

| 特性 | DINO | MoCo-v2 | BYOL | SwAV |
|------|------|---------|------|------|
| 负样本 | ✗ 不需要 | ✓ 需要 | ✗ 不需要 | ✗ 不需要 |
| 动量编码器 | ✓ EMA Teacher | ✓ 动量编码器 | ✓ 动量编码器 | ✗ 无 |
| Multi-crop | ✓ | ✗ | ✗ | ✓ |
| 损失函数 | 交叉熵 | InfoNCE | MSE | 交叉熵+SK |
| Predictor | ✗ 不需要 | ✗ | ✓ 必需 | ✗ |
| BN 依赖 | ✗ 无 | ✓ 有 | ✓ 关键 | ✓ 有 |

消融实验（Table 7）表明：
- 去掉动量编码器后模型完全坍塌（k-NN 准确率降至 0.1%）
- Multi-crop 贡献约 +5% k-NN 准确率（72.8% vs 67.9%）
- 交叉熵损失远优于 MSE 损失（72.8% vs 52.6%）
- 添加 Predictor 对 DINO 几乎无影响（72.8% vs 71.8%），但对 BYOL 是必需的

##### 涌现的语义分割能力

DINO 最引人注目的发现是：用 ViT-S/8 训练后，最后一层 [CLS] token 的多头自注意力图自动涌现出**类别特定的语义分割**。不同的注意力头关注物体的不同语义部分（如头部、腿部、背景），且这种能力在监督训练的 ViT 或使用 CNN 的自监督方法中均不明显。这一特性使 DINO 特征在 DAVIS 2017 视频目标分割任务上无需任何微调即可取得优异性能。

#### 🧪 练习题

```yaml
question: "DINO 中 Teacher 网络的参数更新方式是什么？"
options:
  - "通过反向传播梯度直接更新"
  - "通过 Student 参数的指数移动平均（EMA）更新"
  - "使用预训练的固定参数，不进行更新"
  - "通过 Sinkhorn-Knopp 算法迭代优化"
answer: 1
explain: "DINO 的 Teacher 通过 EMA 更新：θ_t ← λθ_t + (1-λ)θ_s，不接收梯度，相当于 Student 历史参数的集成，提供更稳定的学习目标。"
```