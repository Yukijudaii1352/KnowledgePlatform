### LoRA2
```yaml
id: lora2
name: LoRA2
full_name: 多尺度低秩近似 (LoRA2)
year: '2025.01'
org: Nanjing University
paper_url: https://www.sciencedirect.com/science/article/pii/S0925231225015310
category: frontier
parent: lora
motivation: 多尺度低秩应对复杂任务需求
```

#### 📝 一句话总结
LoRA2 提出在互相正交的多个低秩平面上训练 LoRA，并用改造后的重要性剪枝动态分配参数预算，解决单尺度固定 rank LoRA 对复杂任务表达不足的问题。

#### 🎯 核心要点
- 将单个 LoRA 低秩更新扩展为多尺度正交低秩近似，在两个互相正交的平面上学习增量。
- 使用 SVD 思路把增量矩阵分解为 \(P\Lambda Q\)，再用 \((uv)\Lambda(\mathcal{UV})\) 表示多尺度结构。
- 对 \(u,v,\mathcal{U},\mathcal{V}\) 施加正交正则，减少不同 LoRA 块之间的空间重叠。
- 复用并扩展 AdaLoRA 式重要性剪枝，对奇异值/低秩通道动态裁剪。
- 将重要性计算适配到 LoRA2 的复合矩阵结构，报告可减少约 98.5% 的参数敏感度计算。

#### 🔬 深入细节
![LoRA2 多尺度正交低秩近似](https://arxiv.org/html/2408.06854/x2.png)
*图源：arXiv HTML Figure 2。LoRA2 在正交平面上训练多组 LoRA 作为增量矩阵。*

```python
# LoRA2 训练与剪枝伪代码
for target_weight in transformer_weights:
    # 两组正交 LoRA 块和可剪枝奇异值
    u, v = init_low_rank_block()
    U, V = init_low_rank_block()
    Lambda = zeros(rank)  # 保证初始 DeltaW = 0

for step in range(T):
    batch = sample(data)
    DeltaW = (u @ v) @ diag(Lambda) @ (U @ V)
    loss_task = task_loss(W0 + DeltaW, batch)
    loss_orth = orthogonal_regularizer(u, v, U, V)
    loss = loss_task + beta * loss_orth
    update(u, v, U, V, Lambda, loss)

    # 动态重要性剪枝
    grad = compute_gradients(v, Lambda, V)
    importance = score(Lambda, v, V, grad)
    threshold = choose_budget_threshold(importance)
    mask_channels(importance < threshold)
```

LoRA2 的基本前向增量写成：

$$
W = W^{(0)}+\Delta
=W^{(0)}+P\Lambda Q
=W^{(0)}+(uv)\Lambda(\mathcal{UV})
$$

其中 \(u,v\) 与 \(\mathcal{U},\mathcal{V}\) 是两组低秩矩阵，\(\Lambda\) 是对角奇异值矩阵。论文将 \(\Lambda\) 初始化为 0，使训练开始时 \(\Delta=0\)，避免破坏预训练模型；低秩矩阵用随机高斯初始化，为后续增量提供不同投影方向。

多尺度的直觉是：复杂任务可能不适合用单一低秩平面表达。标准 LoRA 只学习一个 \(BA\) 子空间，如果 rank 很低，表达力不足；如果简单增大 rank，又会提高参数量并带来冗余。LoRA2 通过两组正交平面扩大可学习空间，让不同低秩块捕获不同方向的信息，减少彼此重复。

正交约束是 LoRA2 的核心稳定器。论文使用类似如下的 Frobenius 正则：

$$
R(u,v)=\|u^Tu-I\|_F^2+\|vv^T-I\|_F^2
$$

并对 \((\mathcal{U},\mathcal{V})\) 以及组合矩阵施加类似约束。自然语言理解上，这相当于要求不同低秩投影不要挤在同一个方向上，避免多个 LoRA 块学习重复特征，从而在同样参数预算下提高有效表达能力。

剪枝部分继承 AdaLoRA 的思想：训练过程中并非所有奇异值/通道都重要，应该根据敏感度和不确定性动态裁掉低贡献通道。LoRA2 针对复合结构改造重要性分数，最终可简化为：

$$
\mathbb{I}(\Lambda,i)=S(\Lambda,i)+\frac{C(K,v,ij)}{K}+\frac{C(K,\mathcal{V},ij)}{K}
$$

其中 \(S(\Lambda,i)\) 表示第 \(i\) 个奇异值的敏感度，\(C\) 汇总相关低秩矩阵行敏感度。论文指出，由于某些矩阵项对排序影响可忽略，实际可省去大量参数敏感度计算，减少约 98.5% 的计算量。

与 LoRA/AdaLoRA 相比，LoRA2 的创新不是单纯“自动调 rank”，而是先改变低秩增量的几何结构，再在这个结构上做预算分配。它适合那些固定 rank LoRA 表达力不足、但直接增大 rank 又成本过高的场景。

#### 🧪 练习题
```yaml
question: "LoRA2 中正交约束的主要作用是什么？"
options:
  - "让所有 LoRA 块学习完全相同的方向"
  - "减少不同低秩块的空间重叠，扩大有效可学习空间"
  - "把预训练权重全部置零"
  - "替代交叉熵损失"
answer: 1
explain: "LoRA2 在多个低秩平面上训练，正交约束能减少重复表达，使多尺度低秩更新更有效。"
```
