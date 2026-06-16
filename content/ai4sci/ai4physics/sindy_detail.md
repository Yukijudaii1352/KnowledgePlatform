### SINDy: 稀疏识别动力学 (Sparse Identification of Nonlinear Dynamics)

```yaml
id: sindy
name: SINDy
full_name: 稀疏识别动力学 (Sparse Identification of Nonlinear Dynamics)
year: '2016'
org: 华盛顿大学
paper_url: https://www.pnas.org/doi/10.1073/pnas.1517384113
category: physics_discovery
parent: —
motivation: 稀疏回归识别非线性控制方程
```

#### 📝 一句话总结
SINDy 将动力系统方程发现转化为“在候选非线性函数库中寻找稀疏系数”的回归问题，用少量活跃项从观测轨迹和导数中恢复可解释的控制方程。它解决了符号回归搜索空间巨大、传统系统辨识偏线性且难以推广到强非线性动力学的问题。

#### 🎯 核心要点
- 方程假设：许多物理系统的真实动力学 \(\dot{x}=f(x)\) 在合适候选函数库中是稀疏的。
- 数据矩阵化：把时间序列状态组成 \(X\)，把状态导数组成 \(\dot{X}\)，每一行对应一个观测时刻。
- 候选函数库：构造 \(\Theta(X)\)，包含常数项、多项式项、三角函数项或领域知识给出的非线性项。
- 稀疏系数矩阵：求解 \(\dot{X}=\Theta(X)\Xi\)，\(\Xi\) 的非零元素直接给出每个状态方程中的活跃项和系数。
- 核心算法：使用 LASSO 或 sequential thresholded least squares，先最小二乘，再反复阈值化小系数并在剩余项上重拟合。
- 模型选择：通过交叉验证和 Pareto front 在预测误差与非零项数量之间选择阈值 \(\lambda\)。
- 扩展能力：可处理离散时间系统、高维 PDE 的低秩表示、带参数/分岔项、显式时间项和外部 forcing/control 的系统。
- 论文案例：线性/非线性振子、Lorenz 混沌系统、圆柱绕流 wake、logistic map 和 Hopf normal form。

#### 🔬 深入细节
来源说明：PNAS DOI 页面在命令行访问时触发了访问保护；方法细节来自同一论文的 arXiv 版本 `https://arxiv.org/abs/1509.03580` 和 ar5iv HTML 转换，图示为 ar5iv 从论文源文件渲染出的 Figure 1。

![SINDy 稀疏动力学识别流程](https://ar5iv.labs.arxiv.org/html/1509.03580/assets/x1.png)
*图：SINDy 用状态轨迹和导数构造候选非线性库 \(\Theta(X)\)，再通过稀疏回归找出满足 \(\dot{X}=\Theta(X)\Xi\) 的少数活跃项。*

```python
# SINDy sequential thresholded least-squares 伪代码
X = stack_state_snapshots(x(t_1), ..., x(t_m))
dXdt = estimate_time_derivatives(X)
Theta = build_library(X, terms=["1", "x", "x^2", "x^3", "sin(x)", "cos(x)"])

Xi = least_squares(Theta, dXdt)  # 初始全量回归
for _ in range(max_iter):
    small = abs(Xi) < lambda_
    Xi[small] = 0.0
    for k in range(state_dim):
        active = ~small[:, k]
        Xi[active, k] = least_squares(Theta[:, active], dXdt[:, k])

def discovered_rhs(x):
    return Theta_symbolic(x) @ Xi
```

SINDy 的起点是一个连续时间动力系统：

$$
\dot{\mathbf{x}}(t)=\mathbf{f}(\mathbf{x}(t)),\quad
\mathbf{x}(t)\in\mathbb{R}^n
$$

从实验或仿真得到 \(m\) 个时刻的状态和导数后，将它们堆叠为：

$$
X=
\begin{bmatrix}
\mathbf{x}^T(t_1)\\
\mathbf{x}^T(t_2)\\
\vdots\\
\mathbf{x}^T(t_m)
\end{bmatrix},\quad
\dot{X}=
\begin{bmatrix}
\dot{\mathbf{x}}^T(t_1)\\
\dot{\mathbf{x}}^T(t_2)\\
\vdots\\
\dot{\mathbf{x}}^T(t_m)
\end{bmatrix}
$$

然后构造候选函数库：

$$
\Theta(X)=
\begin{bmatrix}
|&|&|&|&&|&|\\
\mathbf{1}&X&X^{P_2}&X^{P_3}&\cdots&\sin(X)&\cos(X)\\
|&|&|&|&&|&|
\end{bmatrix}
$$

这里 \(X^{P_2}\) 表示所有二次交叉项，例如 \(x_1^2,x_1x_2,\ldots,x_n^2\)。候选库可以按问题扩展为有理函数、Fourier 项、PDE 空间导数项或已知控制输入项。最终要解的是：

$$
\dot{X}=\Theta(X)\Xi
$$

矩阵 \(\Xi=[\xi_1,\xi_2,\ldots,\xi_n]\) 的第 \(k\) 列对应第 \(k\) 个状态方程。若某个系数为 0，说明该候选函数不参与对应方程；非零项则直接构成可读的动力学：

$$
\dot{x}_k=f_k(\mathbf{x})=\Theta(\mathbf{x}^T)\xi_k
$$

稀疏性可以通过 LASSO 写成：

$$
\xi_k=\arg\min_{\xi'_k}
\left\|\Theta(X)\xi'_k-\dot{X}_k\right\|_2
+\lambda\left\|\xi'_k\right\|_1
$$

论文实际强调的 sequential thresholded least squares 更轻量：先普通最小二乘得到全量 \(\Xi\)，把绝对值小于 \(\lambda\) 的系数置零，再只在剩余列上重新最小二乘。这个循环把“选择模型结构”和“估计连续系数”交替进行，避免了符号回归枚举公式树的组合爆炸。

噪声处理是 SINDy 能否落地的关键。若 \(\dot{X}\) 来自数值微分，噪声会被放大；论文将含噪形式写作：

$$
\dot{X}=\Theta(X)\Xi+\eta Z
$$

其中 \(Z\) 是高斯噪声矩阵，\(\eta\) 是噪声强度。实践中通常要先平滑 \(X\)、用 total variation regularized derivative 估计导数，或用 SVD 硬阈值去噪。阈值 \(\lambda\) 不能只按训练误差调，因为 \(\lambda\) 太小会保留伪项，太大会删掉真实弱项；论文建议用交叉验证寻找误差-复杂度 Pareto front 的 elbow。

SINDy 和传统系统辨识的差别在于输出不是黑箱预测器，而是一组可解释方程。例如 Lorenz 系统真实方程只有线性项和二次项：

$$
\dot{x}=\sigma(y-x),\quad
\dot{y}=x(\rho-z)-y,\quad
\dot{z}=xy-\beta z
$$

只要候选库包含这些项，稀疏回归就能从混沌轨迹中恢复相同结构。对混沌系统来说，长期单条轨迹误差会因 Lyapunov 指数快速放大；SINDy 更重要的成功标准是恢复吸引子几何和方程结构，而不是长时间逐点预测。

论文的扩展也很关键。离散时间系统可写作 \(X_2^m=\Theta(X_1^{m-1})\Xi\)，线性库时退化为 DMD。高维 PDE 可先用 POD/SVD 得到低维模态系数，再对模态动力学做 SINDy。若系统受参数 \(\mu\)、控制输入 \(u(t)\) 或时间 \(t\) 影响，可以把这些量并入候选库，从而识别分岔 normal form 或 forced dynamics。

#### 🧪 练习题
```yaml
question: "SINDy 中 sequential thresholded least-squares 的主要作用是什么？"
options:
  - "把连续时间系统强制转换成离散时间系统"
  - "在候选函数库中反复删除小系数，并对剩余项重新拟合，得到稀疏方程"
  - "用神经网络逼近所有未知非线性项"
  - "只保留线性项以便和 DMD 完全一致"
answer: 1
explain: "SINDy 的核心是假设真实动力学只包含少数候选项；阈值化加重拟合能同时选择结构和估计系数。"
```
