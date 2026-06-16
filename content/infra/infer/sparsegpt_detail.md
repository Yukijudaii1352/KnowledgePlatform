### SparseGPT: 稀疏GPT (SparseGPT)

```yaml
id: sparsegpt
name: SparseGPT
full_name: 稀疏GPT (SparseGPT)
year: '2023'
org: IST Austria
paper_url: https://arxiv.org/abs/2301.00774
category: quantize
parent: gptq
motivation: 一步式无结构剪枝支持千亿参数模型
```

#### 📝 一句话总结

SparseGPT 提出一种无需重训练的 one-shot 二阶剪枝方法，把大模型逐层稀疏化写成带 mask 的输出重建问题，并用近似 Hessian 逆在剪掉权重后补偿剩余权重。它首次展示了 OPT/BLOOM 级百亿到千亿参数模型可以在 50%-60% 稀疏率下保持较小困惑度损失。

#### 🎯 核心要点

- 面向 post-training pruning，只使用少量校准前向样本，不做反向训练或微调
- 逐层最小化稠密层输出 \(WX\) 与稀疏层输出 \((M\odot\hat W)X\) 的重建误差
- 对固定剪枝 mask，精确重建需要为每一行单独求 masked Hessian 逆，难以扩展到 LLM
- 通过 Hessian synchronization 让所有行共享一串列级 Hessian 逆，避免逐行独立求逆
- 使用 adaptive mask selection，在 block 内按二阶敏感度而非纯幅值选择要保留的权重
- 支持非结构化稀疏，也支持 2:4、4:8 等硬件友好的半结构化稀疏
- 可与 GPTQ 合并成一次 sparse + quantized pass，剪枝和量化共享同一套 Cholesky/Hessian 更新

#### 🔬 深入细节

![SparseGPT reconstruction algorithm](https://ar5iv.labs.arxiv.org/html/2301.00774/assets/x4.png)
*图：SparseGPT 论文 Figure 4，经 ar5iv 渲染；左侧展示按列剪枝并用 Hessian 逆更新右侧权重，右侧展示 block 内自适应选择剪枝 mask。*

```python
# SparseGPT: one-shot pruning for one linear layer, simplified from Algorithm 1
def sparsegpt_prune_layer(W, X, sparsity, block_size=128, mask_block=128, damping=0.01):
    H = X @ X.T
    H = H + damping * mean(diag(H)) * eye(H.shape[0])
    Hinv_info = cholesky(inv(H)).T

    M = ones_like(W)  # 1 means keep, 0 means prune
    for start in range(0, W.shape[1], block_size):
        stop = min(start + block_size, W.shape[1])
        E = zeros(W.shape[0], stop - start)

        for j in range(start, stop):
            if j % mask_block == 0:
                cols = slice(j, min(j + mask_block, W.shape[1]))
                score = (W[:, cols] ** 2) / (diag(Hinv_info)[cols] ** 2)
                M[:, cols] = keep_top_fraction(score, keep=1 - sparsity)

            err = W[:, j] / Hinv_info[j, j]
            err = (1 - M[:, j]) * err      # only pruned entries create error
            E[:, j - start] = err
            W[:, j:stop] -= err[:, None] * Hinv_info[j, j:stop]

        W[:, stop:] -= E @ Hinv_info[start:stop, stop:]

    return W * M
```

SparseGPT 的出发点是逐层剪枝重建。给定线性层权重 \(W_\ell\)、校准输入 \(X_\ell\)、二值 mask \(M_\ell\)，目标是：

$$
\arg\min_{M_\ell,\hat W_\ell}\lVert W_\ell X_\ell-(M_\ell\odot\hat W_\ell)X_\ell\rVert_2^2
$$

纯幅值剪枝只看 \(|W_{ij}|\)，忽略输入通道相关性和剪后补偿空间，因此在 OPT-175B 上很快崩坏。SparseGPT 关注的是剪掉某个权重后层输出能否被右侧未冻结权重补回来，这就需要 Hessian \(H=XX^\top\) 的二阶信息。

如果 mask 已固定，理论上每一行都可以通过最小二乘精确重建保留权重：

$$
w^i_{M_i}=(X_{M_i}X_{M_i}^{\top})^{-1}X_{M_i}(w^i_{M_i}X_{M_i})^\top
$$

但每行的 \(M_i\) 不同，意味着每行都要反复求不同的 masked Hessian 逆，复杂度接近 \(O(d_{\text{row}}\cdot d_{\text{col}}^3)\)。对 Transformer 大层来说，这会随 hidden size 呈四次方增长，无法在千亿参数模型上落地。

SparseGPT 的核心近似是 Hessian synchronization。算法预设列顺序 \(j=1,\ldots,d_{\text{col}}\)，定义共享的未冻结列集合 \(U_{j+1}=U_j-\{j\}\)，并递推维护 \((H_{U_j})^{-1}\)。当第 \(j\) 列中某些行的权重被剪掉时，只更新这些行右侧尚未冻结的权重；未剪的权重被冻结为当前值，不再被未来更新破坏。

这个更新和 GPTQ 很像，只是“量化误差”变成“置零误差”。对第 \(j\) 列，剪掉的条目产生：

$$
E_{:,j}=(1-M_{:,j})\frac{W_{:,j}}{[H^{-1}]_{jj}}, \qquad
W_{:,j:}\leftarrow W_{:,j:}-E_{:,j}[H^{-1}]_{j,j:}
$$

直觉是：如果某个权重被置零，就把它造成的输出偏差按 Hessian 相关性分摊给后续可调整权重；如果该权重被保留，它不会产生剪枝误差，只是在当前值上冻结。

adaptive mask selection 解决“剪哪些权重”的问题。SparseGPT 不在全层一次性决定 mask，而是在 block 内反复选择，并在选择下一个 block 前先应用已有更新。论文伪代码在 Cholesky 形式下按 \(w_c^2/[H^{-1}]_{cc}^2\) 选择保留权重，因此 mask 会考虑二阶敏感度和之前补偿后的当前权重，而不是静态幅值。

半结构化稀疏只是改变 mask 约束：对 2:4 稀疏，每连续 4 个权重必须剪掉 2 个；算法把 mask block 设为 \(m\)，在每组内选损失最小的 \(n\) 个置零。由于重建更新机制不变，SparseGPT 可以同时覆盖非结构化高稀疏和硬件更友好的 N:M 模式。

SparseGPT 与 GPTQ 的关系很紧密。二者都按列冻结权重、用 Cholesky 化的 Hessian 逆信息做 lazy batch update；区别是 GPTQ 把权重冻结到低比特网格，SparseGPT 把一部分权重冻结到 0。论文进一步给出联合稀疏量化误差：

$$
E_{:,j}=\frac{W_{:,j}-M_{:,j}\odot\operatorname{quant}(W_{:,j})}{[H^{-1}]_{jj}}
$$

因此它可以在一次 pass 中同时做剪枝和 GPTQ 风格量化，避免先剪枝再量化时两种误差互相独立、后一步无法影响前一步决策的问题。

> 💡 关键：SparseGPT 的贡献不是“发现大模型能剪”，而是把剪枝、补偿和 mask 选择组织成一个可在单张 A100 上处理 175B 级模型的二阶近似流程。

#### 🧪 练习题

```yaml
question: "SparseGPT 相比简单 magnitude pruning 的核心优势是什么？"
options:
  - "只按权重绝对值排序，速度更慢"
  - "剪掉权重后用 Hessian 逆更新剩余权重，补偿层输出误差"
  - "必须对剪枝模型重新预训练"
  - "只能生成结构化整列剪枝 mask"
answer: 1
explain: "SparseGPT 把剪枝视为逐层重建问题，用二阶信息选择和补偿权重；简单幅值剪枝没有输出误差补偿，高稀疏率下更容易崩坏。"
```
