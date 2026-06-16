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

SparseGPT 提出面向 GPT 规模模型的一次性后训练剪枝算法，把剪枝转化为逐层稀疏重建，并用近似二阶信息补偿被剪权重带来的输出误差，从而在无需重训练的情况下剪掉 OPT/BLOOM 175B 级模型 50% 以上权重。

#### 🎯 核心要点

- 将全模型剪枝拆成逐层稀疏回归问题，目标是在校准输入上保持每个线性层的输出不变
- 使用 OBS 风格的二阶误差估计，令 \(\mathbf{H}=2\mathbf{X}\mathbf{X}^{\top}\)，通过 \(\mathbf{H}^{-1}\) 衡量输入特征相关性
- 采用固定列顺序和 Hessian synchronization，使不同行共享同一组“未来列”逆 Hessian，避免为每一行单独求逆
- 每次剪掉权重后只更新右侧未处理列，并冻结已处理列，形成与 GPTQ 类似的列式贪心框架
- 用 iterative blocking 自适应选择剪枝 mask，允许不同列、不同 outlier 特征承受不同剪枝比例
- 支持非结构化稀疏、2:4/4:8 半结构化稀疏，并能与低比特权重量化在同一补偿过程中联合执行
- 论文在 OPT/BLOOM 175B 级模型上展示单张 A100 数小时级剪枝，校准数据只需少量 C4 token 片段

#### 🔬 深入细节

![SparseGPT 重建算法示意图](https://ar5iv.labs.arxiv.org/html/2301.00774/assets/x4.png)
*图源：SparseGPT 论文 Figure 4。左侧展示按列剪枝与右侧权重补偿，右侧展示按块自适应选择剪枝 mask。*

```python
# SparseGPT 单个线性层的核心流程，W: [out_features, in_features], X: 校准输入
H = 2 * X @ X.T
H = damp(H)                              # 数值稳定，通常加阻尼到对角线
H_inv_info = cholesky_inverse_info(H)    # GPTQ 风格预计算逆 Hessian/Cholesky 信息

for block in column_blocks(W, block_size=B):
    # 根据当前权重和 Hessian 对角项，为这个 mask block 选择要置零的权重
    scores = (W[:, block] ** 2) / diag(H_inv_info, block)
    mask = choose_pruned_weights(scores, sparsity, pattern="unstructured_or_n:m")

    errors = zeros_like(W[:, block])
    for j in block:                       # 固定列顺序，所有行同步处理第 j 列
        q = W[:, j].clone()
        q[mask[:, j]] = 0                 # SparseGPT 的“量化值”就是 0

        err = (W[:, j] - q) / H_inv_info[j, j]
        W[:, j] = q                       # 已处理列冻结，不再被未来更新改变
        errors[:, j - block.start] = err

        # 块内 lazy update：用被剪权重的误差补偿右侧尚未冻结的列
        W[:, j + 1:block.end] -= outer(err, H_inv_info[j, j + 1:block.end])

    # 块外一次性更新，提升矩阵乘计算效率
    W[:, block.end:] -= errors @ H_inv_info[block, block.end:]
```

SparseGPT 的基本目标来自后训练逐层压缩：给定一层权重 \(\mathbf{W}\) 和校准输入 \(\mathbf{X}\)，希望压缩后的权重 \(\widehat{\mathbf{W}}\) 在这些输入上复现原层输出，而不是直接最小化权重差异：

$$
\min_{\mathbf{M},\widehat{\mathbf{W}}}
\left\|\mathbf{W}\mathbf{X}-(\mathbf{M}\odot\widehat{\mathbf{W}})\mathbf{X}\right\|_F^2,
\qquad \|\mathbf{M}\|_0 \leq k
$$

其中 \(\mathbf{M}\) 是二值保留 mask。这个目标强调“函数保持”：只要输出响应接近，剩余权重可以被重构成不同数值。难点是 mask 选择与剩余权重重构耦合在一起，精确求解相当于大规模稀疏回归，直接用于隐藏维数上万、层数上百的大语言模型不可行。

SparseGPT 借用 Optimal Brain Surgeon 的局部二阶更新。对某一行权重中待剪掉的第 \(p\) 个权重 \(w_p\)，在二次近似下，置零带来的最小误差和对剩余权重的补偿方向为：

$$
\varepsilon_p=\frac{w_p^2}{[\mathbf{H}^{-1}]_{pp}},
\qquad
\delta=-\frac{w_p}{[\mathbf{H}^{-1}]_{pp}}\mathbf{H}^{-1}_{:,p},
\qquad
\mathbf{H}=2\mathbf{X}\mathbf{X}^{\top}
$$

直觉上，单纯 magnitude pruning 只看 \(w_p\) 的大小；SparseGPT 还看这个输入方向是否敏感。如果某个小权重对应的输入特征与许多输出变化强相关，\([\mathbf{H}^{-1}]_{pp}\) 会改变它的剪枝代价，使算法少剪“看似小但很关键”的连接。

传统 OBS 的瓶颈在于每一行的 mask 不同，理论上每行都要对被保留特征的 Hessian 子矩阵求逆。SparseGPT 的关键近似是固定列处理顺序：当处理第 \(j\) 列时，只允许更新第 \(j\) 列右侧尚未冻结的权重，因此所有行共享同一组未来列集合 \(\mathcal{F}_j=\{j,j+1,\dots,d\}\)。这样只需为这些列集合维护一条逆 Hessian 序列，而不是为每一行、每一种 mask 重新求逆。

> 💡 关键：SparseGPT 的近似并不是“不补偿误差”，而是限制补偿只能流向未来列。已处理列冻结保证算法单向推进；未来列仍能吸收当前剪枝误差，所以精度远好于直接置零。

自适应 mask selection 解决的是 outlier 特征问题。若每一列都按固定比例剪，稀疏度会被强行均匀分布到所有输入特征上；但 LLM 中少量 outlier 通道非常敏感。SparseGPT 因此按多个连续列组成的 mask block 计算 OBS 误差分数，在块内统一选择最便宜的权重置零，让稀疏度可以在列之间非均匀分配。

半结构化稀疏只改变 mask 约束，不改变二阶补偿框架。例如 2:4 稀疏要求每 4 个连续权重里恰好 2 个为零，SparseGPT 就在每个 4 元组内选择 OBS 误差最小的 2 个权重剪掉。联合量化也类似：对保留权重不再固定为当前浮点值，而是四舍五入到量化网格；随后把“置零误差”和“量化舍入误差”一起传递给右侧未来列补偿。

#### 🧪 练习题

```yaml
question: "SparseGPT 能在无需重训练的情况下剪枝 GPT 规模模型，最核心的机制是什么？"
options:
  - "只剪 embedding 和输出层，避免影响 Transformer block"
  - "使用二阶 Hessian 逆估计剪枝误差，并把误差补偿到尚未冻结的未来权重"
  - "先完整微调模型，再根据梯度大小删除权重"
  - "对所有层使用完全相同的随机稀疏 mask"
answer: 1
explain: "SparseGPT 的关键是逐层稀疏重建：剪掉权重后利用输入 Hessian 的逆近似更新未来列，使层输出尽量保持不变。"
```
