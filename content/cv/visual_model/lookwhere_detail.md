### LookWhere — 自适应计算的视觉识别：自监督 What-Where 蒸馏

```yaml
id: lookwhere
name: LookWhere
full_name: "LookWhere: Adaptive Computation for Visual Recognition with Self-Supervised What-Where Distillation"
year: 2025
org: "Carleton University, UBC, Vector Institute"
paper_url: "https://arxiv.org/abs/2505.18051"
category: visual_model
parent: "DINOv2"
motivation: "通过 selector-extractor 架构和 what-where 蒸馏实现自适应计算动态分配，在高分辨率视觉任务中大幅提升效率"
```

#### 📝 一句话总结

LookWhere 提出了 selector-extractor 双模块架构，通过自监督 what-where 蒸馏从 DINOv2 教师模型中学习"在哪里计算"和"看到什么"，实现了任务通用的自适应计算——在高分辨率交通标志识别中以 34× FLOPs 削减和 6× 推理加速达到接近 SOTA 精度，在 ImageNet 上以 1.36× 加速同时提升精度。

#### 🎯 核心要点

- **Selector-Extractor 双模块架构**：selector 处理低分辨率输入预测 2D 重要性图（where），extractor 仅处理被选中的高分辨率 patch（what）
- **What-Where 蒸馏**：三个损失函数联合训练——\(L_{\text{cls}}\)（CLS token MSE）、\(L_{\text{pat}}\)（patch token MSE）、\(L_{\text{map}}\)（attention map KL 散度）
- **任务通用预训练 + 仅 extractor 微调**：selector 预训练后冻结，仅微调 extractor 即可迁移到下游任务
- **纯标准 Transformer 操作**：不依赖聚类算法或自定义 CUDA kernel，在现有 GPU 上高效加速
- **高分辨率空间稀疏场景优势显著**：Traffic Signs（34× FLOPs↓, 6× 速度↑）、CUB 鸟类细粒度识别、Billiard Balls 空间推理
- **标准基准同样有效**：ImageNet-1K 分类（ViT-S 9.5K im/s, 80.3% Top-1）、ADE20K 分割（≥2× 速度优于 DTEM）

#### 🔬 深入细节

![LookWhere 架构总览](https://arxiv.org/abs/2505.18051)
*图：LookWhere 的 selector-extractor 架构示意。Selector 在低分辨率输入上预测 patch 重要性图，选出 top-k 个 patch 位置；Extractor 仅在这些高分辨率 patch 上进行全深度 Transformer 计算，同时融合低分辨率全局上下文 token。（详见论文 Figure 2）*

##### 算法伪代码

```python
# LookWhere 推理流程
def lookwhere_forward(image, selector, extractor, k):
    # Step 1: Selector 在低分辨率上预测重要性图
    x_low = patchify(image, resolution=R_low)          # N_low × N_low patches
    features_low = selector.forward_layers(x_low, L_low)  # 前 L_low 层
    importance_map = selector.predict_map(features_low)    # N_high × N_high 的 2D map
    
    # Step 2: 选择 top-k 个高分辨率 patch
    top_k_indices = topk(importance_map.flatten(), k)
    x_high_selected = patchify(image, resolution=R_high)[top_k_indices]  # k 个 patch
    
    # Step 3: Extractor 处理选中 patch + 低分辨率全局 token
    global_tokens = features_low  # 来自 selector 的低分辨率 token
    output = extractor([cls_token, global_tokens, x_high_selected])  # 全深度 ViT
    
    return output.cls_token  # 用于下游任务
```

##### 动机与背景

Vision Transformer (ViT) 的计算量随 token 数量二次增长，在高分辨率输入（如 1000×1000 px 的交通标志图像）下变得极其昂贵。现有自适应计算方法分为两类，各有缺陷：

1. **Token Reduction（逐层削减）**：PiToMe、DTEM、ATC 等方法在每一层逐步合并或丢弃 token。问题在于第一层仍需处理所有 token，在高分辨率下依然昂贵。且它们依赖聚类算法（如二部匹配），虽然 FLOPs 低但在 GPU 上实际速度慢。

2. **Token Selection（输入选择）**：DPS、IPS 等方法选择输入 patch 子集。问题在于需要复杂的离散优化（REINFORCE 梯度估计、多阶段训练），且每个任务都需要重新训练 selector。

> 💡 关键洞察：LookWhere 的核心思想是将"在哪里计算"和"计算什么"解耦为两个独立模块，并通过自监督蒸馏实现任务通用的预训练，从而避免了逐任务优化 selector 的高昂代价。

##### 核心机制：Selector-Extractor 架构

**Selector（低分辨率定位器）**：

Selector 是 DINOv2 ViT 的前 \(L_{\text{low}}\) 层（默认 \(L_{\text{low}}=3\)），输入分辨率为 \(R_{\text{low}}=154\) px。它输出 \(N_{\text{low}} \times N_{\text{low}}\) 个 token 特征，然后通过一个轻量级线性层将每个低分辨率 token 映射到对应的高分辨率区域，生成 \(N_{\text{high}} \times N_{\text{high}}\) 的重要性图。选取 top-k 个位置作为高分辨率 patch 的采样点。

> ⚠️ 注意：Selector 在微调阶段完全冻结，不针对特定任务更新。这使得同一个 selector 可以泛化到交通标志识别、鸟类分类、语义分割等不同任务。

**Extractor（稀疏高分辨率计算器）**：

Extractor 是完整深度的 ViT（如 ViT-B 的全部 12 层），但输入仅包含：
- 1 个 CLS token
- \(N_{\text{low}}^2\) 个来自 selector 的低分辨率全局 token（提供全局上下文）
- \(k\) 个被选中的高分辨率 patch token

总 token 数为 \(1 + N_{\text{low}}^2 + k\)，远小于完整高分辨率的 \(N_{\text{high}}^2\) 个 token。例如在 Traffic Signs 实验中，\(k=128\) 而 \(N_{\text{high}}^2=4,900\)，仅处理约 2.6% 的高分辨率 token。

##### 训练流程：What-Where 蒸馏

预训练阶段使用 DINOv2 作为教师模型，通过三个损失函数联合优化 selector 和 extractor：

**1. CLS Token 蒸馏（What — 全局表征）**：

$$L_{\text{cls}} = \text{MSE}(\hat{z}_{\text{cls}}, z_{\text{cls}})$$

其中 \(\hat{z}_{\text{cls}}\) 是 extractor 的 CLS token 输出，\(z_{\text{cls}}\) 是教师模型处理完整高分辨率输入后的 CLS token。这确保稀疏计算的全局表征逼近完整计算。

**2. Patch Token 蒸馏（What — 局部表征）**：

$$L_{\text{pat}} = \text{MSE}(\hat{z}_{\text{pat}}, z_{\text{pat}})$$

仅在被选中的 \(k\) 个 patch 位置上计算 MSE，确保局部特征也准确。这对语义分割等需要像素级预测的任务至关重要。

**3. Attention Map 蒸馏（Where — 选择策略）**：

$$L_{\text{map}} = \text{KL}(\hat{A}_{\text{high}}, A_{\text{high}})$$

其中 \(A_{\text{high}}\) 是教师模型最后一层自注意力图的平均（跨所有 head），表示教师"关注哪里"。\(\hat{A}_{\text{high}}\) 是 selector 预测的重要性图。通过 KL 散度训练 selector 模仿教师的注意力分布。

总损失为：

$$L = \lambda_{\text{cls}} L_{\text{cls}} + \lambda_{\text{pat}} L_{\text{pat}} + \lambda_{\text{map}} L_{\text{map}}$$

其中 \(\lambda_{\text{cls}} = \lambda_{\text{pat}} = 1\)，\(\lambda_{\text{map}} = 0.1\)。

> 💡 关键设计：预训练时 \(k\) 在 \([16, 128]\) 范围内随机采样（总 token 数 \(N_{\text{high}}^2 = 1369\)），使模型学会在不同稀疏度下都能有效工作。

**微调阶段**：仅更新 extractor 参数和任务头，selector 完全冻结。这极大简化了下游适配流程。

##### 与现有方法的关键区别

| 特性 | Token Reduction (PiToMe/DTEM) | Token Selection (DPS/IPS) | **LookWhere** |
|------|------|------|------|
| 第一层是否处理所有 token | ✅ 是 | ❌ 否 | ❌ 否 |
| 是否需要逐任务训练 selector | — | ✅ 是 | ❌ 否（冻结） |
| 是否依赖非标准 GPU 操作 | ✅ 聚类算法 | ✅ REINFORCE | ❌ 纯 ViT 操作 |
| 预训练方式 | 无 | 无 | 自监督蒸馏 |
| 高分辨率训练内存 | 高 | 中 | **低（>5× 削减）** |

##### 实验亮点

**ImageNet-1K 分类**（224² px，ViT-B）：LookWhere（k=128）达到 83.0% Top-1，3.2K im/s，14.8G FLOPs，优于所有自适应计算方法。ViT-S 版本达到 9.5K im/s，是第二快方法 DTEM 的 1.36×。

**ADE20K 语义分割**：在三个计算级别上均优于 DTEM，且速度 ≥2× 更快（如 k=512 时 mIoU 40.6% vs DTEM 38.9%，速度 2.0K vs 0.7K im/s）。

**Traffic Signs**（994² px）：仅处理 10% 高分辨率 token，LookWhere 以 34× FLOPs 削减和 6× 推理加速接近 IPS 的精度（差 1.1%），同时训练成本仅为 IPS 的 1/13。

**消融实验关键发现**：
- 三个蒸馏损失缺一不可：去掉 \(L_{\text{map}}\) 后 selector 无法有效定位；去掉 \(L_{\text{pat}}\) 后分割性能显著下降
- 低分辨率全局 token 的共享对 extractor 性能至关重要，提供了被丢弃 patch 的上下文信息
- Selector 深度 \(L_{\text{low}}=3\) 和分辨率 \(R_{\text{low}}=154\) 在效率与精度间取得最佳平衡

#### 🧪 练习题

```yaml
question: "LookWhere 在微调阶段如何处理 selector？"
options:
  - "与 extractor 联合微调以适应特定任务"
  - "使用 REINFORCE 梯度估计更新 selector 的离散选择策略"
  - "完全冻结 selector，仅微调 extractor 和任务头"
  - "丢弃 selector，改用教师模型的注意力图直接选择 patch"
answer: 2
explain: "LookWhere 的核心设计之一是 selector 在预训练后完全冻结，下游任务仅微调 extractor。这使得同一个 selector 可以零成本迁移到不同任务，大幅简化部署流程。"
```