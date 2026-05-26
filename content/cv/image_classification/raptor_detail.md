### Raptor

```yaml
id: raptor
name: Raptor
full_name: "块递归视觉Transformer近似 (Recurrent Approximations to Phase-structured TransfORmers)"
year: "2026.01"
org: "Harvard University / Osnabrück University"
paper_url: "https://arxiv.org/abs/2512.19941"
category: modern_efficient
parent: vit
motivation: "发现ViT块递归结构，用少量权重共享块逼近深层ViT"
```

#### 📝 一句话总结
Raptor 提出训练一个由少量共享块递归展开的 ViT 近似模型，验证了深层 ViT 内部存在显著的块递归结构，并用极少的不同 block 逼近原模型的大部分分类能力。

#### 🎯 核心要点
- 提出 Block-Recurrent Hypothesis，认为训练好的 ViT 深度方向可分成少数重复计算阶段。
- 用表征相似矩阵和 max-cut 方法自动发现 block phase 边界。
- 训练权重共享的 recurrent surrogate，即 Raptor，去重建原始 ViT 的层间表示轨迹。
- 在 DINOv2 上仅用 2 到 3 个递归 block 就恢复了原模型大部分线性探测精度。
- 该工作更偏“机制解释 + 可重构性验证”，而不仅仅是压缩部署。

#### 🔬 深入细节

![Raptor 项目标识](https://raw.githubusercontent.com/KempnerInstitute/raptor/main/assets/raptor_logo.png)
*图：Raptor 官方项目页标识。该工作关注 ViT 深度方向是否存在可重用的递归计算阶段。*

```python
# Raptor 近似训练流程
teacher = pretrained_vit()
phases = discover_phases_via_similarity(teacher)
blocks = [init_from_phase(p) for p in phases[:k]]   # k << L

def raptor_forward(x):
    h = patch_embed(x)
    for t in range(L):
        h = blocks[phase_id(t)](h)                  # 复用少量共享 block
    return h

loss = tf_loss(hidden_pred, hidden_teacher) + ar_loss(unrolled_pred, hidden_teacher)
opt.step()
```

Raptor 的出发点并不是传统意义上的“做一个更快模型”，而是一个更基础的问题：ViT 的很多层是否真的都在做彼此不同的计算？论文通过层间表征相似度矩阵发现，许多训练好的 ViT 在深度方向会出现若干连续 phase，同一 phase 内多层的表征变化模式高度相似。

基于这个观察，作者提出 Block-Recurrent Hypothesis：一个深层 ViT 可以被重写为少量不同 block 反复展开的递归系统。Raptor 就是这种假设的构造性验证。它并不只是模仿最终分类结果，而是尽量重建原 ViT 从浅层到深层的整个隐藏状态轨迹，因此训练目标既包括 teacher forcing 的逐层拟合，也包括真正展开后的自回归式层间重建。

从动力系统视角看，这意味着 ViT 的深度计算并非任意堆叠，而更像若干阶段性更新规则反复作用于表征。论文里最有意思的结论是：在 DINOv2 这类 foundation ViT 上，仅用极少数共享 block，就能恢复绝大部分 ImageNet 线性探测精度，并保持接近的运行成本。这说明很多深层 block 的功能具有高度复用性。

Raptor 的价值主要在两个方向。第一，它为 ViT 压缩、共享参数和递归化设计提供了直接证据；第二，它给解释性研究提供了一个更低复杂度的对象，因为你不必再把每一层都当作独立模块分析，而可以研究少量递归动力学单元如何驱动表征演化。

#### 🧪 练习题
```yaml
question: "Raptor 试图验证的核心假设是什么？"
options:
  - "ViT 的所有层都必须保持完全独立才能工作"
  - "训练好的 ViT 在深度方向可被少量不同 block 递归展开近似"
  - "卷积一定优于 Transformer"
  - "分类性能完全由 patch embedding 决定"
answer: 1
explain: "Raptor 的 Block-Recurrent Hypothesis 认为，深层 ViT 的计算可被压缩成少量可重用 block 反复展开。"
```
