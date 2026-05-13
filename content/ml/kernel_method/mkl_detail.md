### 多核学习 (Multiple Kernel Learning, MKL)

```yaml
id: mkl
name: MKL
full_name: "多核学习 (Multiple Kernel Learning)"
year: 2004
org: UC Berkeley
paper_url: "https://www.jmlr.org/papers/volume5/lanckriet04a/lanckriet04a.pdf"
category: foundation
parent: "—"
motivation: "通过SDP/QCQP优化多个核函数的线性组合"
```

#### 📝 一句话总结

MKL 将核矩阵学习问题形式化为半定规划（SDP），并证明当核矩阵限制为已知核的正线性组合时，问题可高效归约为二次约束二次规划（QCQP），从而在保持分类精度的同时大幅降低计算成本，奠定了多核学习领域的理论基础。

#### 🎯 核心要点

- 提出将核矩阵学习建模为 SDP 问题，在正半定锥上优化核矩阵以最大化分类间隔
- 核心约束：\(K \succeq 0\)（正半定）+ \(\text{trace}(K) = c\)（正则化）
- 支持三种 SVM 变体：硬间隔、1-范数软间隔、2-范数软间隔
- 关键定理（Theorem 17）：当 \(K = \sum_{i=1}^m \mu_i K_i,\ \mu \geq 0\) 时，SDP 退化为 QCQP，计算复杂度大幅降低
- 引入核对齐（Kernel Alignment）作为无监督核质量度量，可得闭式解
- 扩展至转导学习（Transduction）：同时优化核矩阵和未标记样本的标签
- 实验表明 QCQP 方法在秒级完成（vs SDP 的分钟级），精度与完整 SDP 相当，优于交叉验证选核

#### 🔬 深入细节

##### 问题背景与动机

传统 SVM 依赖用户手动选择核函数及其超参数（如 RBF 核的带宽 \(\sigma\)），通常通过交叉验证网格搜索完成。这种方法存在以下缺陷：

1. **计算开销大**：需要对每组超参数训练完整 SVM
2. **方差高**：小样本下交叉验证结果不稳定
3. **搜索空间有限**：只能在预定义的离散网格中选择

本文提出的核心思想是：**将核函数选择从离散搜索转化为连续凸优化问题**，直接在核矩阵空间中寻找最优解。

##### 数学框架

**基本优化问题**：给定训练样本 \(\{(x_i, y_i)\}_{i=1}^n\)，学习最优核矩阵 \(K\)：

$$
\min_{K \succeq 0,\ \text{trace}(K)=c} \omega(K_{\text{tr}})
$$

其中 \(\omega(K_{\text{tr}})\) 是 SVM 目标函数值（作为核矩阵的函数）。trace 约束起正则化作用，防止核矩阵无界增长。

**2-范数软间隔 SVM 的对偶形式**（Theorem 9）：

$$
\max_{\alpha} \quad 2\alpha^T e - \alpha^T \left( \text{diag}(y) K_{\text{tr}} \text{diag}(y) + \tau I \right) \alpha
$$
$$
\text{s.t.} \quad \alpha^T y = 0, \quad \alpha \geq 0
$$

其中 \(\tau = 1/C\) 控制正则化强度。将核矩阵优化与 SVM 训练联合，得到 SDP：

$$
\min_{K \succeq 0} \max_{\alpha \geq 0} \quad 2\alpha^T e - \alpha^T (G(K_{\text{tr}}) + \tau I) \alpha
$$
$$
\text{s.t.} \quad \text{trace}(K) = c, \quad \alpha^T y = 0
$$

其中 \(G(K_{\text{tr}}) = \text{diag}(y) K_{\text{tr}} \text{diag}(y)\)。

##### 核心算法：QCQP 求解多核组合

当核矩阵被限制为已知核的正线性组合 \(K = \sum_{i=1}^m \mu_i K_i,\ \mu_i \geq 0\) 时，通过强对偶性交换 min-max 顺序，问题简化为：

```
Algorithm: MKL via QCQP (Theorem 17)
Input: 训练数据 {(x_i, y_i)}, 基核矩阵 {K_1, ..., K_m}, 正则化参数 τ, C
Output: 最优组合系数 μ*, 支持向量系数 α*

1. 计算每个基核的 Gram 矩阵: G(K_i) = diag(y) K_i diag(y)
2. 计算 trace 归一化因子: r_i = trace(K_i)
3. 求解 QCQP:
   max_{α, t}  2α^T e - τ α^T α - c·t
   s.t.  t ≥ (1/r_i) α^T G(K_i) α,  i = 1,...,m
         α^T y = 0
         C ≥ α ≥ 0
4. 从对偶变量恢复 μ*: μ_i* = λ_i* · c / r_i
   (λ_i* 为第 i 个二次约束的拉格朗日乘子)
5. 构造最优核: K* = Σ μ_i* K_i
```

> 💡 关键直觉：变量 \(t\) 是所有核的"最差表现"的上界。优化目标在最大化间隔的同时最小化这个上界，本质上是在所有基核中自动选择最优组合。内层对 \(\mu\) 的最小化退化为取最大值操作（线性规划的极点解），使问题从 SDP 降维为 QCQP。

##### 核对齐（Kernel Alignment）

论文引入了一种无需训练 SVM 即可评估核质量的度量：

$$
A(K_1, K_2) = \frac{\langle K_1, K_2 \rangle_F}{\|K_1\|_F \|K_2\|_F} = \frac{\text{trace}(K_1^T K_2)}{\sqrt{\text{trace}(K_1^T K_1) \cdot \text{trace}(K_2^T K_2)}}
$$

以理想核 \(K^* = yy^T\) 为目标，最大化 \(A(K, yy^T)\) 可得到闭式解：

$$
\mu_i^* = \frac{y^T K_i y}{\sqrt{\sum_j (y^T K_j y)^2}}
$$

> ⚠️ 注意：核对齐方法虽然计算极快（无需求解优化问题），但它不考虑间隔最大化，因此在某些场景下性能不如 SDP/QCQP 方法。

##### 转导学习扩展

对于半监督场景，论文将未标记样本的标签 \(y_u \in \{-1, +1\}^{n_u}\) 也作为优化变量，联合优化核矩阵和标签分配。这使得核矩阵可以利用未标记数据的分布信息，但引入了组合优化的困难（通过松弛处理）。

##### 实验结果与计算效率

在 UCI Heart 和 Sonar 数据集上的实验表明：

| 方法 | Heart 精度 | Sonar 精度 | 计算时间 |
|------|-----------|-----------|---------|
| 最优单核 (交叉验证) | 77.7% - 83.9% | 84.2% | ~多次 QP |
| SDP (完整核学习) | 84.8% | 84.6% | ~10 min |
| QCQP (正权重) | 84.6% | 85.8% | ~3 sec |

> 💡 关键发现：QCQP 方法以约 1/200 的计算时间达到与完整 SDP 相当甚至更优的分类精度，且优于传统交叉验证方法。论文推荐 QCQP 作为实际应用的首选方法。

##### 与传统方法的对比

| 特性 | 交叉验证选核 | SDP 核学习 | QCQP 多核组合 |
|------|------------|-----------|--------------|
| 搜索空间 | 离散有限网格 | 整个 PSD 锥 | 基核的正锥组合 |
| 理论保证 | 无（启发式） | 全局最优 | 受限空间全局最优 |
| 计算复杂度 | \(O(g \cdot n^3)\) | \(O(n^{6.5})\) | \(O(m \cdot n^3)\) |
| 小样本表现 | 高方差 | 稳定 | 稳定 |
| 可扩展性 | 中等 | 差 | 良好 |

其中 \(g\) 为网格点数，\(m\) 为基核数量，\(n\) 为样本数。

#### 🧪 练习题

```yaml
question: "在 MKL 的 QCQP 公式中，将核矩阵限制为 K = Σμ_i K_i (μ≥0) 相比完整 SDP 的主要优势是什么？"
options:
  - "可以学习到更优的核矩阵，因为搜索空间更大"
  - "计算复杂度大幅降低（从 SDP 降为 QCQP），同时保持相当的分类精度"
  - "不需要正半定约束，简化了问题结构"
  - "可以处理无限维特征空间中的核函数"
answer: 1
explain: "正权重线性组合约束使得 K≽0 自动满足（因为各 K_i≽0），SDP 退化为 QCQP，计算时间从分钟级降至秒级，而实验表明精度相当甚至更优。"
```