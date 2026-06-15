### SparseGPT

```yaml
id: sparsegpt
name: SparseGPT
full_name: 稀疏GPT (SparseGPT)
year: 2023
org: ISTA
paper_url: https://arxiv.org/abs/2301.00774
category: pruning
parent: gptq
motivation: 首个支持千亿参数模型一键剪枝
```

#### 📝 一句话总结

SparseGPT 提出基于近似二阶信息的一次性逐层剪枝方法，在无需重训练的情况下把 OPT/BLOOM 等千亿参数模型剪到 50% 以上稀疏度，解决了传统 OBS 剪枝精度高但无法扩展到 GPT 规模的问题。

#### 🎯 核心要点

- 将全局剪枝拆成逐层重建问题，最小化剪枝前后层输出差异
- 继承 OBS 的 Hessian 逆误差补偿，用 \(\mathbf{H}=2\mathbf{X}\mathbf{X}^\top\) 捕捉输入相关性
- 固定列处理顺序，让所有行共享同一未处理列集合和 Hessian 逆递推
- 对未来列做 partial update，保证已处理列不被回改
- 在块内按 OBS 误差选择要剪掉的权重，兼顾精度和可扩展性
- 支持非结构化稀疏、2:4/4:8 半结构化稀疏，以及与量化联合使用

#### 🔬 深入细节

![SparseGPT 重建算法示意图](https://ar5iv.labs.arxiv.org/html/2301.00774/assets/x4.png)
*图：SparseGPT 逐列剪枝，并用 Hessian 逆对尚未处理的未来权重做误差补偿。*

```python
# SparseGPT 单层剪枝伪代码
H_inv = cholesky(inverse(2 * X @ X.T + lambda_ * I)).T
for block in column_blocks(W, B):
    E = zeros(W.num_rows, B)
    mask = choose_pruning_mask_by_obs_error(W[:, block], H_inv)
    for j in block:
        q = W[:, j] * mask[:, j]
        err = (W[:, j] - q) / H_inv[j, j]
        W[:, j] = q
        E[:, j - block.start] = err
        W[:, j+1:block.end] -= outer(err, H_inv[j, j+1:block.end])
    W[:, block.end:] -= E @ H_inv[block, block.end:]
```

SparseGPT 的逐层目标是让剪枝后的线性层在校准输入上复现原输出：

$$
\min_{\mathbf{M},\hat{\mathbf{W}}}\|\mathbf{W}\mathbf{X}-(\mathbf{M}\odot\hat{\mathbf{W}})\mathbf{X}\|_F^2
$$

其中 \(\mathbf{M}\) 是稀疏 mask。该目标直接联合优化 mask 和权重是困难的，因此 SparseGPT 采用列式贪心处理：决定某些权重置零后，立即用 OBS 闭式公式修正尚未处理的权重。

对被剪权重 \(w_j\)，OBS 给出的局部误差和补偿方向由 Hessian 逆决定：

$$
\varepsilon_j=\frac{w_j^2}{[\mathbf{H}^{-1}]_{jj}},\quad
\delta=-\frac{w_j}{[\mathbf{H}^{-1}]_{jj}}\mathbf{H}^{-1}_{:,j}
$$

直觉上，小幅值权重未必最不重要；如果它所在输入方向对层输出很敏感，直接置零也会产生大误差。SparseGPT 因此用二阶误差而不是单纯 magnitude 排序。

> 💡 关键：SparseGPT 与 GPTQ 共用“二阶补偿 + 列同步 + 块级更新”的思想，只是 GPTQ 把权重映射到低比特码本，SparseGPT 把部分权重映射到 0。

为了扩展到千亿参数，SparseGPT 只更新“未来列”。已经处理过的列不再修改，未处理列集合对所有行相同，Hessian 逆递推也可共享。这样避免了传统 OBS 为每一行独立求逆和更新的巨大开销，使一次性剪枝可以在单 GPU 数小时级完成。

对于 2:4 等半结构化稀疏，SparseGPT 在每 \(m\) 个连续权重中保留 \(n\) 个，选择依据仍是二阶误差。这让剪枝结果更容易映射到 NVIDIA 稀疏 Tensor Core。论文还展示了剪枝与低比特量化可在同一补偿框架中结合，形成“稀疏 + 量化”的更高压缩率方案。

#### 🧪 练习题

```yaml
question: "SparseGPT 为什么比单纯 Magnitude Pruning 更适合大语言模型一次性剪枝？"
options:
  - "它只剪掉 embedding 层"
  - "它用 Hessian 逆估计剪枝误差并补偿未来权重"
  - "它需要完整重新预训练模型"
  - "它把所有权重随机置零"
answer: 1
explain: "SparseGPT 的剪枝标准考虑输入相关性和二阶敏感度，并在剪掉权重后更新未处理权重来补偿输出误差。"
```
