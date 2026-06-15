### GPTQ

```yaml
id: gptq
name: GPTQ
full_name: 生成式预训练量化 (GPTQ)
year: 2023
org: ISTA
paper_url: https://arxiv.org/abs/2210.17323
category: quantization
parent: —
motivation: 基于Hessian的二阶近似实现极速PTQ
```

#### 📝 一句话总结

GPTQ 提出了一种面向 GPT/OPT/BLOOM 等大语言模型的一次性后训练权重量化方法，用近似 Hessian 逆矩阵补偿量化误差，解决了二阶量化精度高但无法扩展到千亿参数模型的问题。

#### 🎯 核心要点

- 将每个线性层的权重量化写成保持层输出 \(\mathbf{W}\mathbf{X}\) 不变的局部重建问题
- 从 Optimal Brain Quantization 出发，用 \((2\mathbf{X}\mathbf{X}^\top+\lambda\mathbf{I})^{-1}\) 估计二阶敏感度
- 固定列顺序同步量化所有行，让全部行共享同一 Hessian 逆更新序列
- 引入 lazy batch update，把列级补偿累积到块级矩阵乘，提升 GPU 利用率
- 使用 Cholesky 形式存储 Hessian 逆信息，提升数值稳定性和运行速度
- 支持 3/4-bit 大模型权重量化，并在 175B 规模上约数小时完成量化

#### 🔬 深入细节

![GPTQ 量化流程图](https://ar5iv.labs.arxiv.org/html/2210.17323/assets/x3.png)
*图：GPTQ 按列递归量化一个权重块，并用 Cholesky 形式的 Hessian 逆信息更新尚未量化的权重。*

```python
# GPTQ 单层权重量化伪代码
H_inv = cholesky(inverse(2 * X @ X.T + lambda_ * I)).T
Q = zeros_like(W)

for block_start in range(0, W.num_cols, B):
    E = zeros(W.num_rows, B)
    for j in range(block_start, block_start + B):
        Q[:, j] = quantize(W[:, j])
        E[:, j - block_start] = (W[:, j] - Q[:, j]) / H_inv[j, j]
        W[:, j:block_start+B] -= outer(E[:, j - block_start],
                                       H_inv[j, j:block_start+B])
    W[:, block_start+B:] -= E @ H_inv[block_start:block_start+B, block_start+B:]
```

GPTQ 的目标不是重新训练模型，而是在少量校准样本上让量化后的每一层尽量复现原始层输出。对一个线性层，输入激活为 \(\mathbf{X}\)，权重为 \(\mathbf{W}\)，量化后的权重为 \(\mathbf{Q}\)，局部目标可写成：

$$
\min_{\mathbf{Q}}\|\mathbf{W}\mathbf{X}-\mathbf{Q}\mathbf{X}\|_2^2
$$

把该目标在权重附近二阶展开，可得到 Hessian 近似 \(\mathbf{H}=2\mathbf{X}\mathbf{X}^\top+\lambda\mathbf{I}\)。当第 \(j\) 列权重被量化为 \(\mathrm{quant}(\mathbf{w}_j)\) 时，GPTQ 用 Hessian 逆的对角线衡量该列误差的敏感度，并用非对角项把误差传播到后续未量化列：

$$
\mathbf{e}_j=\frac{\mathbf{w}_j-\mathrm{quant}(\mathbf{w}_j)}{[\mathbf{H}^{-1}]_{jj}}
$$

直觉上，若某个方向的 Hessian 对角值很大，说明输出对这个方向的扰动敏感，量化误差需要更谨慎地补偿；若某些权重列相关性强，非对角项会把当前误差分摊到未来列。

传统 OBQ 会为每一行独立选择和更新量化顺序，复杂度随行数重复放大。GPTQ 的关键工程化假设是固定列顺序对大模型足够有效，因此所有行共享同一个未量化列集合和同一套 Hessian 逆更新。这样复杂度从接近 \(O(d_{\text{row}}d_{\text{col}}^3)\) 降到 \(O(\max(d_{\text{row}}d_{\text{col}}^2,d_{\text{col}}^3))\)。

> 💡 关键：GPTQ 的精度来自二阶误差补偿，速度来自“所有行同步列顺序 + 块级 lazy update”。单独保留二阶公式而不做同步和分块，仍然难以在 175B 模型上落地。

Lazy batch update 解决的是 GPU 内存带宽问题。逐列更新会反复对巨大权重矩阵做低算术强度操作，无法充分利用 GPU。GPTQ 先在 \(B=128\) 左右的块内递归更新，等块处理完后再用一次矩阵乘把累计误差传播到剩余列，从而把大量小更新合并为更高吞吐的 GEMM。

与普通 round-to-nearest 量化相比，GPTQ 不只是把每个权重独立映射到最近量化点，而是在量化一个权重块时持续修正后续权重，因此能在 3/4-bit 下保持语言模型困惑度。与需要蒸馏或微调的量化方法相比，它只依赖校准数据前向统计，不需要反向训练，适合部署前快速压缩大模型。

#### 🧪 练习题

```yaml
question: "GPTQ 能扩展到千亿参数模型的关键原因是什么？"
options:
  - "逐权重搜索最优量化顺序"
  - "所有行共享固定列顺序和 Hessian 逆更新，并用块级 lazy update 提升吞吐"
  - "只量化激活而保留权重为 FP16"
  - "在量化后对模型进行完整预训练"
answer: 1
explain: "GPTQ 保留二阶补偿，但避免每行重复维护 Hessian 逆，并把列更新合并为块级矩阵操作，因此能在大模型上高效运行。"
```
