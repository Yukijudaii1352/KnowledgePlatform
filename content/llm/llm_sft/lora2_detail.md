### LoRA2：多尺度低秩近似
```yaml
id: lora2
name: LoRA2
full_name: 多尺度低秩近似 (LoRA2)
year: "2025.01"
org: Nanjing University
paper_url: https://www.sciencedirect.com/science/article/pii/S0925231225015310
category: frontier
parent: lora
motivation: 多尺度低秩应对复杂任务需求
```

#### 📝 一句话总结
LoRA2 将单尺度 LoRA 扩展为多尺度低秩近似，在两个互相正交的低维平面上训练内部 LoRA 并组合成更高维更新，解决复杂任务中单一 rank/单一子空间表达不足的问题。它还改进 AdaLoRA 式重要性评分，减少敏感度计算并通过剪枝适配不同任务预算。

#### 🎯 核心要点
- 提出 LoRA² 多尺度结构：在两个互相正交的平面上训练内部 LoRA，再组合为高维低秩更新
- 使用外部正交正则：减少两个 LoRA 子空间重叠，扩大整体学习空间
- 使用内部正则：约束每个内部 LoRA 的参数更新更规整，提升训练稳定性和收敛速度
- 改进复杂矩阵重要性评分：针对乘积式 LoRA² 结构，去除对列矩阵敏感度的冗余计算
- 动态参数预算分配：类似 AdaLoRA，对低重要性奇异值或低秩方向进行 pruning
- 官方 README 称参数敏感度评分计算量约减少 98.5%，DeBERTa-V3-base 上训练参数约为 full fine-tuning 的 0.72%
- 实验覆盖 DeBERTa-V3-base、RoBERTa-large、Llama-2-7b-hf，以及 GLUE、数学推理、代码生成等任务

#### 🔬 深入细节
![LoRA2 与 LoRA/AdaLoRA/SoRA 结构对比](https://ars.els-cdn.com/content/image/1-s2.0-S0925231225015310-gr1_lrg.jpg)
*图：论文图示对比 LoRA、AdaLoRA、SoRA 与 LoRA²。LoRA² 使用更复杂的多尺度低秩结构，而不是只在一个固定 rank 的 \(BA\) 子空间中更新。*

```python
# LoRA2 核心训练伪代码：多尺度正交 LoRA + 改进重要性剪枝
for each target weight W0 in pretrained_model:
    freeze(W0)
    # 两个内部 LoRA 位于互相正交的低维平面
    L1 = init_internal_lora(rank=r1, plane="S1")
    L2 = init_internal_lora(rank=r2, plane="S2")
    enforce_orthogonal(S1, S2)

for step, batch in enumerate(train_loader):
    for each target layer:
        # 多尺度组合：用两个内部低秩更新构成更高维更新
        delta_W = compose(L1, L2)      # conceptual: product / composition of two LoRAs
        h = W0 @ x + scaling * delta_W @ x

    loss_task = supervised_loss(h, y)
    loss_ext = overlap_penalty(L1, L2)       # 外部正则：减少两个 LoRA 的重叠
    loss_int = internal_orth_penalty(L1) + internal_orth_penalty(L2)
    loss = loss_task + lambda_ext * loss_ext + lambda_int * loss_int
    update_trainable_lora2_parameters(loss)

    if step >= init_warmup and step % mask_interval == 0:
        # 改进 AdaLoRA 式重要性评分：只保留真正影响 pruning 的矩阵侧
        scores = compute_singular_importance_without_column_redundancy()
        prune_low_score_singular_values(scores, target_rank)
```

标准 LoRA 对冻结权重 \(W_0\) 添加一个低秩增量：

$$
h = W_0x + \frac{\alpha}{r}BAx.
$$

这类方法的核心假设是：下游任务所需的更新可以被一个固定 rank、单尺度的 \(BA\) 子空间较好表达。LoRA2 认为这个假设对复杂任务不一定成立，因为不同语义模式、不同层和不同任务可能需要多个尺度的低秩变化。论文因此把 LoRA 从单个低秩平面扩展到多个正交平面：先在两个互相正交的低维空间中训练内部 LoRA，再通过矩阵组合得到高维更新。

可以将 LoRA2 的组合思想抽象写为：

$$
\Delta W_{LoRA^2}=\mathcal{C}(L_1,L_2),
\quad
L_1=B_1A_1,\quad L_2=B_2A_2,
\quad
\mathcal{S}_1\perp\mathcal{S}_2.
$$

其中 \(\mathcal{C}\) 表示论文所说的“multiplying two LoRAs”得到高维 LoRA 的组合操作。直觉上，\(L_1\) 与 \(L_2\) 不应学习同一片方向，否则多尺度结构只是在重复单尺度 LoRA；因此论文加入外部正则来最小化两个 LoRA 的重叠，扩大可学习空间。一个等价直觉的正交惩罚可以写作：

$$
\mathcal{R}_{ext}=\|U_1^\top U_2\|_F^2+\|V_1^\top V_2\|_F^2,
$$

其中 \(U,V\) 表示不同内部 LoRA 所张成的左右子空间。外部正则负责“两个 LoRA 之间别重叠”，内部正则则负责“每个 LoRA 自己别退化”。内部正则可理解为保持每个内部子空间近似正交、减少方向坍缩：

$$
\mathcal{R}_{int}=\sum_{s\in\{1,2\}}
\left(\|U_s^\top U_s-I\|_F^2+\|V_s^\top V_s-I\|_F^2\right).
$$

LoRA2 的第二个关键点是 pruning。AdaLoRA 使用 SVD 参数化和重要性评分来动态分配 rank，但 LoRA2 的矩阵结构更复杂：两个内部 LoRA 相乘后，前一矩阵的行会与后一矩阵的列相乘。论文在 ScienceDirect 摘要和 Introduction 中指出，最直接的做法是把列矩阵的重要性加到行矩阵上；但进一步推导发现，每个奇异值的重要性评分已经包含列矩阵所有参数的敏感度，所以列矩阵敏感度对最终 pruning 没有额外作用。于是 LoRA2 排除了列矩阵计算，从而显著减少敏感度评分开销。

重要性评分可以用 AdaLoRA 风格的奇异值敏感度来理解：

$$
I_j^{(t)}=\left|\sigma_j^{(t)}\frac{\partial\mathcal{L}}{\partial \sigma_j^{(t)}}\right|,
\quad
\bar I_j^{(t)}=\beta_1\bar I_j^{(t-1)}+(1-\beta_1)I_j^{(t)}.
$$

训练过程中先 warm up，让各低秩方向有机会形成；随后每隔 `mask_interval` 重新计算重要性，剪掉低分奇异值或低秩方向，直到达到目标平均 rank。官方 GitHub README 的复现实验参数也体现了这个调度：`init_warmup`、`final_warmup`、`mask_interval`、`beta1`、`beta2`、`target_rank`、`reg_orth_coef` 都是围绕“先学多尺度方向，再稳定剪枝”设计的。

与 LoRA 相比，LoRA2 解决的是表达空间太单一的问题；与 AdaLoRA 相比，它不只是动态调整 rank，还先通过正交多尺度结构扩大候选更新空间；与 SoRA 等带门控结构的方法相比，LoRA2 更强调两个内部低秩平面的正交组合和重要性评分的计算优化。论文报告它在 DeBERTa-V3-base 上只使用 full fine-tuning 约 0.72% 的训练参数仍取得强性能，并且在参数进一步压缩到 0.17M 时仍可接近参数量约 8 倍的 baseline。

> 💡 关键：LoRA2 的“2”不是简单堆两个 LoRA，而是用正交约束让两个内部 LoRA 学到互补方向，再通过剪枝把真正有用的多尺度方向留下。

#### 🧪 练习题
```yaml
question: "LoRA2 改进重要性评分算法的主要目的是什么？"
options:
  - "让所有层固定使用同一个 rank"
  - "删除对 pruning 无额外贡献的列矩阵敏感度计算，降低评分开销"
  - "将 LoRA 的低秩矩阵改成全参数矩阵"
  - "完全取消正交正则项"
answer: 1
explain: "LoRA2 发现复杂矩阵中每个奇异值的重要性已经包含列矩阵参数敏感度，因此排除列矩阵计算可显著降低重要性评分成本。"
```
