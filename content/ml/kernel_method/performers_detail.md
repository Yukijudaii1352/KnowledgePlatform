---
id: performers
name: "Performers"
full_name: "Rethinking Attention with Performers"
year: 2020
org: "Google"
paper_url: "https://arxiv.org/abs/2009.14794"
category: "kernel_method"
motivation: "用正交随机特征近似softmax注意力核，实现线性复杂度"
---

## 📝 一句话总结

Performers通过FAVOR+机制，利用正随机特征（Positive Random Features）将softmax注意力核分解为低秩形式，将Transformer的注意力计算从O(L²d)降至O(Lrd)线性复杂度，同时保持无偏近似和数值稳定性。

## 🎯 核心要点

### 要解决什么问题
标准Transformer的softmax注意力需要显式计算L×L的注意力矩阵，导致O(L²)的时间和空间复杂度，严重限制了长序列建模能力。

### 用了什么方法
**FAVOR+ (Fast Attention Via positive Orthogonal Random features)**：
1. 将softmax核视为核函数 SM(x,y) = exp(xᵀy)，用随机特征映射φ将其分解
2. 设计正随机特征(PRF)：φ(x) = (h(x)/√m) · [exp(ω₁ᵀx), ..., exp(ωₘᵀx)]，其中h(x)=exp(-‖x‖²/2)
3. 利用矩阵乘法结合律：先算K'ᵀV (r×d矩阵)，再左乘Q'，避免构造L×L矩阵
4. 使用正交随机特征(ORF)进一步降低估计方差

### 效果如何
- 时间复杂度从O(L²d)降至O(Lrd)，其中r为随机特征维度(r << L)
- 在蛋白质序列建模(L=8192)上，Performer速度比标准Transformer快约2倍且内存大幅减少
- 正随机特征比三角随机特征(sin/cos)的MSE低一个数量级
- 正交特征比IID特征进一步降低约50%的MSE
- 在ImageNet64像素生成、语言建模等任务上与标准Transformer性能接近

### 还存在什么问题
- 随机特征数量r需要足够大才能保证近似质量，增大r会增加计算开销
- 对于短序列(L较小)，线性注意力的常数因子可能使其不如标准注意力快
- 近似引入的误差在某些需要精确注意力模式的任务上可能影响性能
- 需要定期重采样随机特征以保持近似质量(论文建议每层独立采样)

## 🔬 深入细节

### 核心思想：从核方法视角重构注意力

标准softmax注意力的本质是一个核函数：

$$\text{SM}(\mathbf{x}, \mathbf{y}) = \exp(\mathbf{x}^\top \mathbf{y})$$

如果能找到映射φ使得 SM(x,y) ≈ φ(x)ᵀφ(y)，就可以将注意力矩阵A分解为低秩形式。

### 关键图示

![FAVOR+ Architecture](https://ar5iv.labs.arxiv.org/html/2009.14794/assets/img/avqk.png)

**图1：FAVOR+机制示意图**。左侧为标准注意力(需要L×L矩阵)，右侧为FAVOR+线性注意力(通过随机特征映射φ避免显式计算注意力矩阵)。关键在于改变矩阵乘法顺序：先计算K'ᵀV得到r×d的小矩阵，再与Q'相乘。

![Positive vs Trigonometric Features](https://ar5iv.labs.arxiv.org/html/2009.14794/assets/img/utility-final2.png)

**图2：正随机特征 vs 三角随机特征的MSE对比**。utility function r(φ)定义为三角特征MSE/正特征MSE的比值。当输入向量夹角较小时(注意力集中的典型情况)，正特征的优势尤为显著。

![ORF vs IID](https://ar5iv.labs.arxiv.org/html/2009.14794/assets/img/attention_output_ortho_iid.png)

**图3：正交特征(ORF) vs IID特征的近似误差**。在不同随机特征数m下，ORF始终优于IID采样，且差距随m增大而保持。

### 算法伪代码

```
Algorithm: FAVOR+ Forward Pass
Input: Q, K, V ∈ R^{L×d}, random features ω₁,...,ωₘ ~ N(0,I_d)
Output: Attention approximation Â ∈ R^{L×d}

1. // 计算正随机特征映射
2. For each query/key vector x:
3.   φ(x) = (exp(-‖x‖²/2) / √m) · [exp(ω₁ᵀx), ..., exp(ωₘᵀx)]
4. 
5. // 映射所有Q和K
6. Q' = [φ(q₁); ...; φ(q_L)]  ∈ R^{L×m}  // 每行是φ(qᵢ)
7. K' = [φ(k₁); ...; φ(k_L)]  ∈ R^{L×m}  // 每行是φ(kⱼ)
8.
9. // 线性注意力计算（关键：改变乘法顺序）
10. // 标准: (Q' K'ᵀ) V  → O(L²m + L²d)
11. // FAVOR+: Q' (K'ᵀ V) → O(Lmd)
12. 
13. G = K'ᵀ V           // m×d 矩阵, O(Lmd)
14. numerator = Q' · G   // L×d 矩阵, O(Lmd)
15.
16. // 归一化因子
17. ones = 1_L           // 全1向量
18. D_hat = diag(Q' · (K'ᵀ · ones))  // L维向量, O(Lm)
19.
20. // 输出
21. Â = D_hat⁻¹ · numerator  // 逐行除以归一化因子
22.
23. Return Â

Total complexity: O(Lmd) where m = O(d log d) typically
                  vs O(L²d) for standard attention
```

### 核心公式推导

**Lemma 1 (正随机特征的无偏性)**：

对于softmax核 SM(x,y) = exp(xᵀy)，正随机特征估计器定义为：

$$\widehat{\text{SM}}^+_m(\mathbf{x}, \mathbf{y}) = \frac{\exp\left(-\frac{\|\mathbf{x}\|^2 + \|\mathbf{y}\|^2}{2}\right)}{m} \sum_{i=1}^m \exp(\omega_i^\top \mathbf{x}) \exp(\omega_i^\top \mathbf{y})$$

其中 ω₁,...,ωₘ ~ N(0, I_d)。

**证明核心**：利用高斯积分恒等式：

$$\mathbb{E}_{\omega \sim N(0,I)}[\exp(\omega^\top \mathbf{x})\exp(\omega^\top \mathbf{y})] = \exp\left(\frac{\|\mathbf{x}\|^2 + \|\mathbf{y}\|^2}{2} + \mathbf{x}^\top\mathbf{y}\right)$$

因此：

$$\mathbb{E}[\widehat{\text{SM}}^+_m] = \exp\left(-\frac{\|\mathbf{x}\|^2+\|\mathbf{y}\|^2}{2}\right) \cdot \exp\left(\frac{\|\mathbf{x}\|^2+\|\mathbf{y}\|^2}{2}+\mathbf{x}^\top\mathbf{y}\right) = \exp(\mathbf{x}^\top\mathbf{y})$$

即 SM_hat^+_m 是 SM(x,y) 的无偏估计。

**关键优势**：正特征保证φ(x)的每个分量非负，因此近似的注意力矩阵所有元素非负，避免了三角特征(sin/cos)可能产生负值导致的数值不稳定。

**Theorem 1 (正则化核的近似保证)**：

设softmax核注意力矩阵A满足 ‖A‖∞ ≤ C，正则化注意力矩阵A^reg满足：

$$\inf_{i,j} \frac{\mathbf{A}^{\text{reg}}(i,j)}{\mathbf{A}(i,j)} \geq 1 - \frac{2}{d^{1/3}} + o\left(\frac{1}{d^{1/3}}\right)$$

即随着维度d增大，正则化核与原始softmax核的逐元素比值趋近于1。

**正交随机特征(ORF)的方差优势**：

当使用正交矩阵(通过Gram-Schmidt正交化随机高斯矩阵得到)替代IID采样时：
- 特征向量之间的负相关性提供了天然的方差缩减效果
- 理论保证：对于softmax核，ORF的MSE严格小于IID特征的MSE
- 实践中m = O(d log d)个正交特征即可获得良好近似

### 因果注意力的处理

对于自回归模型(如GPT)，注意力矩阵是下三角的。FAVOR+通过前缀和(prefix-sum)技巧处理：

$$\hat{\text{Att}}(i) = \frac{\phi(q_i)^\top \sum_{j=1}^{i} \phi(k_j) v_j^\top}{\phi(q_i)^\top \sum_{j=1}^{i} \phi(k_j)}$$

累积和 S_i = Σ_{j=1}^i φ(k_j)v_jᵀ 可以递推计算：S_i = S_{i-1} + φ(k_i)v_iᵀ，保持O(Ld²)复杂度。

## 🧪 练习题

### Q1: 为什么正随机特征(PRF)比三角随机特征(sin/cos)更适合近似softmax注意力？

**A1**: 三角随机特征基于Bochner定理：SM(x,y) = E[cos(ωᵀ(x-y))]，展开后包含sin和cos项，这些项可以为负值。当用于注意力权重时，负值会导致：(1)归一化分母可能接近零造成数值爆炸；(2)注意力权重为负在语义上不合理。正随机特征φ(x) = h(x)·exp(ωᵀx) > 0恒为正，保证近似注意力矩阵所有元素非负，与真实softmax注意力的性质一致。

### Q2: FAVOR+如何将O(L²d)降至O(Lrd)？请用矩阵乘法结合律解释。

**A2**: 标准注意力计算 Att = softmax(QKᵀ)V，需要先算QKᵀ得到L×L矩阵(O(L²d))。FAVOR+将A≈Q'K'ᵀ分解后，利用结合律改变计算顺序：
- 标准顺序：(Q' · K'ᵀ) · V = (L×m · m×L) · L×d → O(L²m + L²d)
- FAVOR+顺序：Q' · (K'ᵀ · V) = L×m · (m×L · L×d) → O(Lmd + Lmd) = O(Lmd)

其中m为随机特征数(通常m=O(d log d))，因此总复杂度为O(Ld² log d)，对L是线性的。

### Q3: 正交随机特征为什么能降低方差？直觉解释。

**A3**: IID采样的随机向量可能在某些方向上聚集，导致对核函数某些区域过度采样而其他区域采样不足。正交化确保m个特征向量均匀覆盖d维空间的不同方向，类似于分层采样(stratified sampling)相比简单随机采样的优势。数学上，正交向量之间的负相关性使得它们的贡献互补而非冗余，从而降低总体估计方差。这类似于准蒙特卡洛方法中低差异序列优于纯随机序列的原理。