### Geometry-Aware Conformal Prediction (Adaptive Geodesic CP)

```yaml
id: geometry_cp
name: "Adaptive Geodesic Conformal Prediction"
full_name: "几何感知不确定性量化：流形上的保形预测 (Geometry-Aware Uncertainty Quantification via Conformal Prediction on Manifolds)"
year: "2026"
org: "Rochester Institute of Technology (RIT)"
paper_url: "https://arxiv.org/abs/2602.16015"
category: "foundation"
parent: "—"
motivation: "将保形预测扩展到黎曼流形，用测地距离替代欧氏残差并引入局部难度归一化，生成几何自适应的球面帽预测区域，实现条件覆盖均匀性"
```

#### 📝 一句话总结

提出自适应测地保形预测（Adaptive Geodesic Conformal Prediction），通过测地距离非一致性分数与交叉验证局部难度估计器的结合，在黎曼流形上生成分布无关、面积自适应的球面帽预测区域，显著改善条件覆盖均匀性与最坏情况覆盖率。

#### 🎯 核心要点

- **三种非一致性分数对比**：Naive Coordinate（坐标空间 \(L^\infty\)）、Standard Geodesic（测地距离 \(d_{\text{geo}}\)）、Adaptive Geodesic（\(d_{\text{geo}}/\hat\sigma\)）
- **测地距离分数**：利用流形内蕴距离替代欧氏残差，消除坐标图畸变导致的面积浪费
- **局部难度估计器 \(\hat\sigma(x)\)**：通过 5-fold 交叉验证在训练集上训练 KNN 回归器，预测测地残差大小
- **预测区域形式**：以 \(\hat{y}(x)\) 为中心、半径 \(\hat{q} \cdot \hat\sigma(x)\) 的测地球（球面帽），半径随局部难度自适应缩放
- **分割保形框架**：Train/Calibration/Test 三分，保证有限样本边际覆盖 \(\geq 1-\alpha\)
- **实验验证**：合成 \(S^2\) 球面（vMF 分布，50× 异质性）+ IGRF-14 地磁场真实数据
- **关键结果**：条件覆盖标准差降低 19%（合成）/71%（IGRF-14），最坏情况覆盖率提升 3–17 个百分点

#### 🔬 深入细节

##### 框架总览

![Adaptive Geodesic CP 框架示意](https://arxiv.org/html/2602.16015v1/x1.png)
*图：三种预测区域对比。左：Naive Coordinate 在坐标空间构建 \(L^\infty\) 矩形再投影（极点处面积膨胀）；中：Standard Geodesic 产生固定半径球面帽；右：Adaptive Geodesic 根据局部难度调整帽的半径。*

##### 算法伪代码

```python
# Algorithm 1: Adaptive Geodesic Conformal Prediction on Manifolds
# Input: D_train, D_cal, x_new, manifold M, significance α

# Step 1: Train base predictor
y_hat = KNN_regressor(k=20).fit(D_train)  # extrinsic mean → project to M

# Step 2: Train difficulty estimator via 5-fold CV
for fold in 5_fold_split(D_train):
    residuals_fold = [d_geo(y_hat_fold(x_i), y_i) for (x_i, y_i) in held_out]
sigma_hat = KNN_regressor(k=20).fit(X_train, residuals_all_folds)

# Step 3: Compute nonconformity scores on calibration set
scores = [d_geo(y_hat(x_i), y_i) / sigma_hat(x_i) for (x_i, y_i) in D_cal]

# Step 4: Compute conformal quantile
q_hat = quantile(scores, level=ceil((1-α)(|D_cal|+1)) / |D_cal|)

# Step 5: Construct prediction region for new point
C(x_new) = {y ∈ M : d_geo(y_hat(x_new), y) ≤ q_hat * sigma_hat(x_new)}
# This is a geodesic ball (spherical cap on S²) with adaptive radius
```

##### 动机与背景

传统保形预测（Conformal Prediction）假设数据位于欧氏空间，使用 \(L^p\) 范数构建预测区间/区域。当响应变量天然位于黎曼流形（如球面 \(S^2\) 上的方向数据、地磁场向量、旋转矩阵等）时，直接在坐标空间操作会引入两个问题：

1. **坐标图畸变**：球坐标 \((\theta, \phi)\) 中的 \(L^\infty\) 矩形投影到球面后，在极点附近面积急剧膨胀，导致不必要的覆盖浪费（实验中 Naive 方法面积多出 26%）。
2. **条件覆盖不均匀**：固定阈值的非一致性分数无法适应预测难度的空间异质性，导致"容易"区域过度覆盖而"困难"区域欠覆盖。

> 💡 关键洞察：测地距离是流形上唯一与坐标选择无关的度量，用它作为非一致性分数可以保证预测区域面积的位置无关性。

##### 核心机制详解

**1. 测地距离非一致性分数**

在球面 \(S^2\) 上，两点 \(p, q\) 的测地距离为：

$$d_{\text{geo}}(p, q) = \arccos(\langle p, q \rangle)$$

标准测地分数定义为：

$$s(x, y) = d_{\text{geo}}(\hat{y}(x), y)$$

产生的预测区域是以 \(\hat{y}(x)\) 为中心、半径 \(\hat{q}\) 的测地球（球面帽）：

$$C(x) = \{y \in S^2 : d_{\text{geo}}(\hat{y}(x), y) \leq \hat{q}\}$$

球面帽面积为 \(A = 2\pi(1 - \cos\hat{q})\)，仅依赖半径 \(\hat{q}\)，与中心位置无关——这正是测地分数消除坐标畸变的几何原因。

**2. 局部难度估计器**

为实现条件覆盖自适应，引入难度函数 \(\hat\sigma: \mathcal{X} \to \mathbb{R}_{>0}\)，将分数归一化：

$$s_{\text{adaptive}}(x, y) = \frac{d_{\text{geo}}(\hat{y}(x), y)}{\hat\sigma(x)}$$

\(\hat\sigma(x)\) 的训练采用 5-fold 交叉验证策略：
- 将训练集分为 5 折
- 每折用其余 4 折训练临时预测器，计算该折样本的测地残差
- 以所有折的 \((x_i, \text{residual}_i)\) 对训练 KNN 回归器

> ⚠️ 注意：\(\hat\sigma\) 必须仅在训练集上估计（通过 CV），不能使用校准集数据，否则会破坏交换性假设导致覆盖保证失效。

归一化后的预测区域半径变为 \(\hat{q} \cdot \hat\sigma(x)\)：难度高的区域（\(\hat\sigma\) 大）获得更大的帽，难度低的区域获得更小的帽，从而均衡条件覆盖。

**3. 覆盖保证**

在交换性假设下，分割保形预测保证：

$$\Pr[Y_{n+1} \in C(X_{n+1})] \geq 1 - \alpha$$

该保证对任意基础预测器 \(\hat{y}\) 和难度估计器 \(\hat\sigma\) 均成立（有限样本、分布无关）。自适应分数不改变边际覆盖保证，但通过均衡化显著改善条件覆盖。

**4. 与坐标方法的对比**

| 特性 | Naive Coordinate | Standard Geodesic | Adaptive Geodesic |
|------|:---:|:---:|:---:|
| 分数函数 | \(\|y - \hat{y}\|_\infty\) (坐标) | \(d_{\text{geo}}(\hat{y}, y)\) | \(d_{\text{geo}}(\hat{y}, y)/\hat\sigma(x)\) |
| 区域形状 | 坐标矩形→不规则球面块 | 固定半径球面帽 | 变半径球面帽 |
| 面积一致性 | ✗（极点膨胀） | ✓ | ✓（且自适应） |
| 条件覆盖 | 最差 | 中等 | 最优 |

##### 实验结果

**Case 1: 合成球面数据**（\(n=1200\), vMF 分布 \(\kappa \in [3, 150]\), 50× 异质性, 300 trials, \(\alpha=0.10\)）

| 方法 | 平均面积 (sr) | 条件覆盖 Std | 最坏 Bin 覆盖 |
|------|:---:|:---:|:---:|
| Adaptive Geodesic | **1.865** | **0.042** | **0.839** |
| Standard Geodesic | 1.885 | 0.052 | 0.814 |
| Naive Coordinate | 2.376 | 0.067 | 0.784 |

**Case 2: IGRF-14 地磁场预测**（\(n=3000\), 100 trials, \(r(\hat\sigma, \text{residual})=0.516\)）

| 方法 | 平均面积 (sr) | 条件覆盖 Std | 最坏 Bin 覆盖 |
|------|:---:|:---:|:---:|
| Adaptive Geodesic | **0.038** | **0.031** | **0.855** |
| Standard Geodesic | 0.039 | 0.107 | 0.689 |
| Naive Coordinate | 0.046 | 0.060 | 0.805 |

> 💡 关键发现：在 IGRF-14 数据上，自适应方法将条件覆盖标准差从 0.107 降至 0.031（降低 71%），最坏情况覆盖从 0.689 提升至 0.855（提升 16.6 个百分点）。Wilcoxon 检验 \(p < 4 \times 10^{-18}\)。

##### 局限性与未来方向

- **交换性假设**：要求校准数据与测试数据可交换，时间序列等非平稳场景需扩展至非交换保形预测
- **各向同性约束**：当前仅生成球面帽（各向同性），无法捕捉方向依赖的预测误差结构
- **流形限制**：仅在 \(S^2\) 上验证，推广到一般黎曼流形需要高效的测地距离计算
- **难度估计器质量**：当 \(r(\hat\sigma, \text{residual}) < 0.15\) 时，建议退化为 Standard Geodesic

#### 🧪 练习题

```yaml
question: "Adaptive Geodesic CP 中，局部难度估计器 σ̂(x) 的训练为什么必须使用交叉验证而非直接在训练集上计算残差？"
options:
  - "为了减少计算开销"
  - "为了避免过拟合导致 σ̂ 低估真实残差，从而使校准分数分布失真"
  - "为了满足保形预测的交换性假设"
  - "为了使 σ̂ 能够泛化到校准集以外的数据"
answer: 1
explain: "如果直接用训练集残差训练 σ̂，由于预测器对训练数据过拟合，残差会被系统性低估，导致 σ̂ 偏小，进而使归一化后的校准分数偏大、预测区域过大。5-fold CV 产生的 out-of-fold 残差更接近真实泛化误差。"
```