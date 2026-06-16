### Wanda: 权重与激活剪枝 (Wanda)

```yaml
id: wanda
name: Wanda
full_name: 权重与激活剪枝 (Wanda)
year: '2023'
org: CMU
paper_url: https://arxiv.org/abs/2306.11695
category: quantize
parent: —
motivation: 极简剪枝准则无需二阶信息计算
```

#### 📝 一句话总结

Wanda 提出了一种面向预训练大语言模型的后训练剪枝方法，用权重幅值乘以对应输入激活范数来衡量连接重要性，解决了纯幅值剪枝忽略 LLM 激活异常值、而二阶剪枝代价过高的问题。

#### 🎯 核心要点

- 核心分数为 \(S_{ij}=|W_{ij}|\cdot\|X_j\|_2\)，同时考虑权重大小和输入通道激活强度
- 只用少量校准样本前向统计每个线性层的输入激活范数，不需要训练集、梯度或 Hessian 逆
- 按输出通道逐行比较重要性分数，在每个输出神经元内剪掉低分连接，保持输出维度上的稀疏率均衡
- 支持非结构化稀疏，也可扩展到结构化 \(N:M\) 稀疏，在每组连续 \(M\) 个权重内保留高分项
- 剪枝后不做权重重建、不做微调、不更新剩余权重，可直接使用稀疏模型
- 在 LLaMA/LLaMA-2 上显著优于 magnitude pruning，并在 50% 非结构化稀疏下接近 SparseGPT 的效果

#### 🔬 深入细节

![Wanda 权重-激活联合剪枝示意图](https://ar5iv.labs.arxiv.org/html/2306.11695/assets/x1.png)
*图：Wanda 论文 Figure 1。左侧是只看权重幅值的 magnitude pruning，右侧是 Wanda 将每列权重乘以对应输入激活范数后，再按输出行进行局部比较。图片来源：arXiv HTML。*

```python
# Wanda pruning, simplified from Algorithm 1
# W: (C_out, C_in) linear-layer weight
# X: (N * L, C_in) calibration activations collected at this layer
# sparsity: fraction of weights to prune in every output row
def wanda_prune(W, X, sparsity):
    activation_norm = X.norm(p=2, dim=0)                 # shape: (C_in,)
    score = W.abs() * activation_norm.unsqueeze(0)       # broadcast by input channel
    _, sorted_idx = score.sort(dim=1)                    # compare per output row
    prune_count = int(W.shape[1] * sparsity)
    prune_idx = sorted_idx[:, :prune_count]
    mask = torch.ones_like(W, dtype=torch.bool)
    mask.scatter_(dim=1, index=prune_idx, value=False)
    return W * mask
```

Wanda 的出发点是 LLM 中存在少数幅值极大的隐藏特征。对一个线性神经元 \(y=w_1x_1+w_2x_2\)，如果 \(|w_1|\le |w_2|\)，纯幅值剪枝会优先剪掉 \(w_1\)。但当 \(|x_1|\gg |x_2|\) 时，\(|w_1x_1|\) 可能远大于 \(|w_2x_2|\)，剪掉小权重反而造成更大的输出扰动。因此 Wanda 将“连接本身大不大”和“这条输入通道在真实数据上活不活跃”相乘，形成更贴近输出贡献的局部指标。

对权重矩阵 \(W\in\mathbb{R}^{C_{out}\times C_{in}}\) 和校准激活 \(X\in\mathbb{R}^{(N\cdot L)\times C_{in}}\)，Wanda 对单个权重定义：

$$
S_{ij}=|W_{ij}|\cdot\|X_j\|_2
$$

其中 \(X_j\) 是第 \(j\) 个输入通道在校准 batch 与序列 token 上展开后的激活向量。论文报告 \(\ell_2\) 范数比 \(\ell_1\) 或 \(\ell_\infty\) 更稳，因为它既能反映通道能量，又不会像最大值那样完全由单个 token 的极端值决定。这个公式计算量很低：一次前向收集 \(X\)，一次按列求范数，再与 \(|W|\) 广播相乘即可。

另一个关键设计是“按输出通道比较”，而不是在整层或全模型范围内设全局阈值。对连接输入 \(j\) 到输出 \(i\) 的权重，Wanda 的比较组为：

$$
G_{ij}=\{W_{uv}\mid u=i\}
$$

也就是每一行独立排序，并在每个输出神经元中剪掉同样比例的低分权重。这样做看似更受约束，但能避免某些输出行被过度剪空，保持每个输出特征都有相近的可用输入支撑。论文发现这种 per-output grouping 对 LLM 尤其重要，即便把指标换回纯 magnitude，逐输出比较也通常比逐层比较更可靠。

实际流程是逐层顺序剪枝：先用校准样本跑到当前层，统计该层输入 \(X\)；计算 \(S\) 并生成 mask；立即把当前层低分权重置零；再让后续层接收已经被前面稀疏化后的激活。这个顺序很重要，因为前一层剪枝会改变后一层的输入分布。整个流程只需要前向传播和局部排序，没有反向传播、Hessian 构造、矩阵求逆或剩余权重补偿。

Wanda 和 SparseGPT 的关系可以理解为一个极简近似。SparseGPT 从局部重建目标出发，使用二阶信息估计剪掉某个权重的代价，形式上涉及 \(\mathrm{diag}(X^TX+\lambda I)^{-1}\)。若忽略阻尼 \(\lambda\)，并只保留 Hessian 的对角近似，则对应代价会退化到：

$$
S_{ij}\approx\left(|W_{ij}|\cdot\|X_j\|_2\right)^2
$$

平方不改变排序，所以 Wanda 的指标可以看作去掉矩阵逆后的二阶启发式。它牺牲了 SparseGPT 的权重重建步骤，但换来极低实现复杂度；论文中在 LLaMA-7B 上计算剪枝指标只需约 0.54 秒，而 SparseGPT 需要约 203 秒。

结构化 \(N:M\) 稀疏时，Wanda 不再在整行里一次性选最低分，而是在每个输出行的连续 \(M\) 个权重组内用同一分数比较，保留 \(N\) 个高分连接、剪掉 \(M-N\) 个低分连接。这样可满足硬件稀疏张量核对 2:4 或 4:8 模式的约束，但因为组内可选范围更小，质量通常比非结构化 50% 稀疏更难保持。

> 💡 关键：Wanda 的强处不是找到全局最优剪枝 mask，而是把“LLM 激活异常值”这个经验事实编码进一个几乎零额外成本的分数，使剪枝过程足够简单、可复现、可作为后续稀疏方法的强基线。

#### 🧪 练习题

```yaml
question: "Wanda 为什么要把权重绝对值乘以输入激活范数？"
options:
  - "因为同样大小的权重在高激活输入通道上会造成更大输出影响"
  - "因为这样可以避免读取校准数据"
  - "因为乘积会自动生成低秩适配器"
  - "因为它需要恢复被剪掉权重的精确数值"
answer: 0
explain: "Wanda 估计的是连接对线性层输出的贡献，输入通道激活越强，对应权重即使幅值较小也可能更重要。"
```
