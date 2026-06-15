### N:M Sparsity

```yaml
id: nm_sparsity
name: N:M Sparsity
full_name: N:M细粒度稀疏 (N:M Sparsity)
year: 2021
org: NVIDIA
paper_url: https://arxiv.org/abs/2102.04010
category: sparsity_deploy
parent: —
motivation: 硬件原生2:4稀疏兼顾精度与加速
```

#### 📝 一句话总结

N:M Sparsity 将每 \(M\) 个连续权重中仅保留 \(N\) 个非零值，提出从头训练 N:M 细粒度结构稀疏网络和 SR-STE 优化方法，解决了非结构化稀疏难加速、粗粒度结构化稀疏精度损失大的矛盾。

#### 🎯 核心要点

- 定义硬件友好的 N:M 细粒度结构稀疏，典型配置为 NVIDIA Ampere 2:4
- 每组 \(M\) 个连续权重保留幅值最大的 \(N\) 个，其余置零
- 可在 sparse tensor core 上获得接近固定倍率的矩阵乘加速
- 从头训练 sparse network，而不是先训练稠密再剪枝
- 提出 Sparse-Refined Straight-Through Estimator (SR-STE) 改善离散 mask 的梯度近似
- 定义 Sparse Architecture Divergence (SAD) 衡量训练中稀疏拓扑变化

#### 🔬 深入细节

![N:M 稀疏结构示意图](https://ar5iv.labs.arxiv.org/html/2102.04010/assets/x1.png)
*图：2:4 稀疏要求每 4 个连续权重至少 2 个为零，并可压缩存储非零值和元数据以适配硬件加速。*

```python
# N:M sparsity with SR-STE 伪代码
for step, batch in enumerate(train_loader):
    W_sparse = []
    masks = []
    for W in model.weights:
        groups = W.reshape(-1, M)
        mask = keep_topN_by_magnitude(groups, N)
        W_sparse.append((groups * mask).reshape_as(W))
        masks.append(mask)

    loss = forward_with_sparse_weights(model, W_sparse, batch)
    loss.backward()

    # SR-STE: 对被剪权重加入稀疏修正项，缓解 vanilla STE 梯度偏差
    for W, mask in zip(model.weights, masks):
        W.grad += lambda_ * (1 - mask) * W
    optimizer.step()
```

非结构化稀疏可以任意置零，精度通常好，但索引不规则，GPU 很难把零值跳过转化为吞吐收益。粗粒度结构化稀疏删除整行、整列或通道，硬件友好，但表达能力损失大。N:M Sparsity 位于两者之间：局部规则足够强，可被硬件识别；粒度又足够细，精度损失较小。

2:4 稀疏的约束可写成：

$$
\|\mathbf{w}_{k:k+4}\|_0 \le 2
$$

更一般地，每个长度为 \(M\) 的组中最多 \(N\) 个非零。前向时通常保留组内幅值最大的 \(N\) 个权重，其余权重乘以二值 mask。

训练难点在于 top-k mask 是离散操作，普通反向传播不可导。vanilla STE 直接把梯度穿过 mask，但会让被置零权重持续受到不稳定更新。SR-STE 在梯度中加入对被剪权重的稀疏修正项，把它们进一步推向零，减少稀疏拓扑在训练中剧烈震荡。

> 💡 关键：N:M 的价值不只是“参数更少”，而是稀疏模式与 GPU sparse tensor core 对齐，能把稀疏度转换为真实矩阵乘加速。

SAD 指标用于观察稀疏拓扑变化。如果每一步保留的 top-N 权重频繁变化，模型等于在训练一个不稳定结构；SR-STE 通过稳定 mask 和抑制被剪权重，降低这种 divergence。该思想也影响了后续 LLM 的 2:4 稀疏和 semi-structured pruning 工作。

#### 🧪 练习题

```yaml
question: "N:M Sparsity 相比普通非结构化稀疏的主要部署优势是什么？"
options:
  - "局部固定稀疏模式可被硬件 sparse tensor core 利用"
  - "不需要任何 mask"
  - "只能用于 embedding 层"
  - "会自动提升模型参数量"
answer: 0
explain: "N:M 对每组连续权重施加规则约束，硬件可以用非零值和元数据执行加速矩阵乘。"
```
