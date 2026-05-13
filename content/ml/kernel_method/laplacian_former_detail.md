### LaplacianFormer

```yaml
id: laplacian_former
name: LaplacianFormer
full_name: 拉普拉斯核注意力 (LaplacianFormer)
year: '2026.04'
org: arXiv
paper_url: https://arxiv.org/abs/2604.20368
category: frontier
parent: performers
motivation: Nyström加速拉普拉斯核实现线性注意力
```

#### 📝 一句话总结

LaplacianFormer 提出以拉普拉斯核（基于 \(\ell_1\) 距离）替代高斯核作为注意力相似度度量，并结合可证明单射的白化特征映射、Nyström 低秩近似和 Newton–Schulz 迭代求逆，实现了线性复杂度的高表达力注意力机制，在 ImageNet 分类任务上取得 SOTA 性能。

#### 🎯 核心要点

- **拉普拉斯核替代高斯核**：使用 \(k(\mathbf{q},\mathbf{k})=\exp(-\|\mathbf{q}-\mathbf{k}\|_1/\lambda)\) 作为注意力相似度，避免 \(\ell_2^2\) 距离的重尾分布导致的注意力过度抑制
- **可证明单射的特征映射**：通过对角白化（centering + scaling）构造归一化核表示 \(\mathbf{z}_i\)，保证不同 query 产生不同输出，保持注意力矩阵满秩
- **Nyström 低秩近似**：选取 \(m \ll N\) 个 landmark token，将 \(O(N^2)\) 核矩阵近似为 \(\mathbf{C}\mathbf{W}^\dagger\mathbf{C}^\top\)，实现线性复杂度
- **Newton–Schulz 迭代**：仅用矩阵乘法和加法近似 \(\mathbf{W}^\dagger\)，避免 SVD/矩阵求逆，天然适合 GPU 并行
- **深度可分离卷积（DWC）**：补充局部上下文建模，最终注意力输出为 \(\mathbf{Z}\mathbf{V} + \text{DWC}(\mathbf{V})\)
- **自定义 CUDA 核**：融合距离计算与指数变换、优化 Newton–Schulz 矩阵乘法，实现高吞吐前向/反向传播
- **基于 PVT 架构**：金字塔式多尺度设计，配合 RoPE 位置编码
- **ImageNet-1K 全 FLOPs 区间 SOTA**：Tiny 81.4%、Small 83.8%、Medium 85.3%、Large 85.6%、Huge 85.8%

#### 🔬 深入细节

![LaplacianFormer 架构总览](https://arxiv.org/html/2604.20368v1/x4.png)
*图：LaplacianFormer 整体架构。基于 PVT 金字塔结构，在每个 stage 中使用拉普拉斯核注意力模块替代标准 softmax 注意力。*

![L1 vs L2 距离分布](https://arxiv.org/html/2604.20368v1/x1.png)
*图：DeiT/PVT/Swin 中 Q-K 的 \(\ell_1\) 与 \(\ell_2^2\) 距离分布对比。\(\ell_2^2\) 呈重尾分布，经指数函数后导致注意力过度抑制中等相关 token；\(\ell_1\) 更集中、对异常值更鲁棒。*

##### 算法伪代码

```python
# LaplacianFormer 注意力计算核心流程
def laplacian_attention(Q, K, V, lambda_, m, T):
    """
    Q, K, V: [N, d] 查询、键、值矩阵
    lambda_: 拉普拉斯核带宽参数
    m: Nyström landmark 数量
    T: Newton-Schulz 迭代次数
    """
    # Step 1: Nyström landmark 采样 (average pooling)
    Q_tilde, K_tilde = avg_pool(Q, m), avg_pool(K, m)  # [m, d]
    
    # Step 2: 计算 landmark 核矩阵 W ∈ R^{m×m}
    W = exp(-||Q_tilde ⊖ K_tilde||_1 / lambda_)
    
    # Step 3: 计算 cross-kernel C ∈ R^{N×m}
    C = exp(-||Q ⊖ K_tilde||_1 / lambda_)
    
    # Step 4: Newton-Schulz 迭代求 W^†
    W = W + eps * I  # 正则化确保正定
    alpha = 2 / spectral_norm(W)
    X = alpha * W.T
    for k in range(T):
        X = X @ (2*I - W @ X)
    W_inv = X  # ≈ W^†
    
    # Step 5: Nyström 近似注意力矩阵
    G_hat = C @ W_inv @ C.T  # [N, N]
    
    # Step 6: 对角白化 (injective feature map)
    mu = G_hat.mean(dim=0)
    sigma = G_hat.std(dim=0)
    Z = (G_hat - mu) / (sigma + eps) + 1/N
    
    # Step 7: 输出 = 全局核注意力 + 局部 DWC
    output = Z @ V + DWC(V)
    return output
```

##### 动机与背景

传统线性注意力方法（如 Performer、Skyformer、SOFT++）普遍采用**高斯核** \(k(\mathbf{q},\mathbf{k})=\exp(-\|\mathbf{q}-\mathbf{k}\|_2^2/2\sigma^2)\) 来近似 softmax 注意力。然而，作者通过对 DeiT、PVT、Swin 等主流 ViT 的实证分析发现：

1. **\(\ell_2^2\) 距离呈重尾分布**：Q-K 之间的平方欧氏距离方差大、存在大量异常值。经指数函数映射后，这些异常值主导注意力图，而中等相关的 token 被过度抑制。
2. **\(\ell_1\) 距离更集中**：曼哈顿距离对异常值更鲁棒，分布更紧凑，能更忠实地反映 token 间的相关性。
3. **梯度行为差异**：拉普拉斯核的梯度 \(\partial k/\partial x_i = (1/\lambda)\cdot\text{sign}(x_i-y_i)\cdot k\) 即使在 \(\mathbf{x}\approx\mathbf{y}\) 时也不消失（因 \(\ell_1\) 的分段线性性质），而高斯核梯度在距离趋零时线性消失，导致训练早期梯度消失问题。

> 💡 关键：拉普拉斯核的"慢衰减"特性保留了中等距离 token 对的注意力权重，提升了注意力矩阵的有效秩和表达力。

##### 核心机制：单射白化特征映射

直接使用核矩阵作为注意力权重会导致低秩退化（所有 query 得到相似的注意力分布）。为此，LaplacianFormer 构造了**可证明单射**的归一化核表示：

$$\mathbf{z}_i = \mathbf{\Sigma}^{-1/2}\left(\left[k(\mathbf{q}_i,\mathbf{k}_1),\dots,k(\mathbf{q}_i,\mathbf{k}_N)\right]^\top - \frac{1}{N}\sum_{j=1}^N k(\mathbf{q}_i,\mathbf{k}_j)\right) + \frac{1}{N}$$

其中 \(\mathbf{\Sigma}^{-1/2}\) 是白化矩阵。直觉上，这一操作：
- **中心化**：减去均值，消除核值的全局偏移
- **白化/缩放**：除以标准差，使各维度方差一致，避免某些维度主导

由于完整白化矩阵计算需要 \(O(N^3)\)，论文采用**对角近似**：

$$\mathbf{D}^{-1/2} = \text{diag}\left(\frac{1}{\sqrt{\sigma_1^2+\varepsilon}},\dots,\frac{1}{\sqrt{\sigma_N^2+\varepsilon}}\right)$$

这将复杂度降至 \(O(N)\)，同时保持了单射性保证——不同的 query 必然产生不同的注意力分布。

> ⚠️ 注意：单射性是 softmax 注意力的固有属性（softmax 天然满秩），而核方法的低秩近似通常会破坏这一性质。白化映射正是为了恢复这一关键特性。

##### Nyström 近似与 Newton–Schulz 求逆

**Nyström 方法**将 \(N \times N\) 核矩阵分解为低秩形式：

$$\widetilde{\mathbf{G}} = \mathbf{C}\mathbf{W}^\dagger\mathbf{C}^\top$$

其中：
- \(\mathbf{C} \in \mathbb{R}^{N \times m}\)：所有 query 与 \(m\) 个 landmark key 之间的核相似度
- \(\mathbf{W} \in \mathbb{R}^{m \times m}\)：landmark 之间的核矩阵
- Landmark 选取策略：对 query/key 张量做 average pooling（kernel size = \(r\)，stride = \(r\)），将 \(r \times r\) 区域聚合为一个 landmark token

**Newton–Schulz 迭代**用于近似 \(\mathbf{W}^\dagger\)：

$$\mathbf{X}_{k+1} = \mathbf{X}_k(2\mathbf{I} - \mathbf{W}\mathbf{X}_k)$$

初始化 \(\mathbf{X}_0 = \alpha\mathbf{W}^\top\)，其中 \(\alpha = 2/\|\mathbf{W}\|_2\) 确保收敛。该方法的优势：
- 仅需矩阵乘法和加法，无需 SVD 或 LU 分解
- 天然适合 GPU 并行，可通过 tiling 和寄存器复用进一步优化
- 对称正定矩阵上保证收敛（通过小扰动 \(\mathbf{W} \leftarrow \mathbf{W} + \epsilon\mathbf{I}\) 确保正定性）

##### 与传统方法的对比

| 方法 | 核函数 | 复杂度 | 求逆方式 | 单射性 |
|------|--------|--------|----------|--------|
| Softmax Attention | \(\exp(\mathbf{q}^\top\mathbf{k}/\sqrt{d})\) | \(O(N^2)\) | — | ✓ |
| Performer | 随机特征近似 | \(O(N)\) | — | ✗ |
| Nyströmformer | 高斯核 + Nyström | \(O(Nm)\) | SVD | ✗ |
| SOFT++ | 高斯核 + Nyström | \(O(Nm)\) | 矩阵求逆 | ✗ |
| **LaplacianFormer** | **拉普拉斯核 + Nyström** | **\(O(Nm)\)** | **Newton–Schulz** | **✓** |

LaplacianFormer 的关键优势在于：(1) 拉普拉斯核更适合 ViT 中 Q-K 距离的实际分布；(2) 白化映射恢复了单射性；(3) Newton–Schulz 迭代比 SVD 更 GPU 友好且可微。

##### CUDA 加速实现

论文实现了两个自定义 CUDA 核：
1. **拉普拉斯核计算**：将 L1 距离计算与指数变换融合为单一操作，减少全局内存访问
2. **Newton–Schulz 迭代**：通过 tiling 和寄存器复用优化矩阵乘法

实测在反向传播中加速尤为显著（得益于预计算梯度和 in-place 内存复用），前向传播执行时间 < 0.05ms。

#### 🧪 练习题

```yaml
question: "LaplacianFormer 选择拉普拉斯核而非高斯核的主要理由是什么？"
options:
  - "拉普拉斯核的计算复杂度更低"
  - "ViT 中 Q-K 的 L1 距离分布更集中，高斯核基于 L2² 距离会过度抑制中等相关 token"
  - "拉普拉斯核可以直接分解为低秩形式"
  - "拉普拉斯核不需要归一化处理"
answer: 1
explain: "实证分析表明 ViT 中 Q-K 的 ℓ₂² 距离呈重尾分布，经高斯核指数映射后异常值主导注意力图、中等相关 token 被过度抑制；而 ℓ₁ 距离更集中且梯度不消失，拉普拉斯核能保留更丰富的 token 交互。"
```