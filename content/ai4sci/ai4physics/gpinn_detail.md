### gPINN: 梯度增强PINN (Gradient-enhanced PINN)

```yaml
id: gpinn
name: gPINN
full_name: 梯度增强PINN (Gradient-enhanced PINN)
year: '2022'
org: 宾大
paper_url: https://doi.org/10.1016/j.cma.2022.114823
category: pde_solving
parent: pinn
motivation: 引入残差梯度项提升陡峭解精度
```

#### 📝 一句话总结
gPINN 在标准 PINN 的 PDE 残差损失之外，额外惩罚 PDE 残差对输入坐标的梯度，使网络不仅让方程残差接近零，也让残差场在空间/时间上更平滑地接近零。它主要解决标准 PINN 在训练点有限、解存在陡峭梯度或反问题参数敏感时精度不足的问题。

#### 🎯 核心要点
- 基础框架：沿用 PINN 的自动微分残差 \(f(\mathbf{x};\hat{u},\partial \hat{u},\ldots;\lambda)=0\) 与边界/初值/观测数据损失。
- 梯度增强：额外约束 \(\nabla f(\mathbf{x})=\mathbf{0}\)，即对每个坐标方向 \(x_i\) 加入 \(\left|\partial f/\partial x_i\right|^2\)。
- 统一正反问题：未知 PDE 参数 \(\lambda\) 可和网络参数 \(\theta\) 一起优化，梯度残差同样参与反问题辨识。
- 采样策略：论文实验中通常令梯度残差点集 \(\mathcal{T}_{g_i}\) 与 PDE 残差点集 \(\mathcal{T}_f\) 相同，也可按坐标方向独立采样。
- RAR 组合：把 gPINN 与 residual-based adaptive refinement 结合，在残差最大的区域持续加入 collocation points。
- 适用场景：Poisson、diffusion-reaction、Brinkman-Forchheimer、Burgers、Allen-Cahn 等正反 PDE 问题，尤其适合陡峭梯度区域。
- 权重敏感性：梯度项权重 \(w_{g_i}\) 是新增超参数；部分问题不敏感，部分问题需要调小，否则梯度项会压过基础残差。
- 计算代价：需要更高阶自动微分，论文报告通常比 PINN 多约 2-3 倍成本，但可用更少训练点达到相近或更好精度。

#### 🔬 深入细节
来源说明：期刊 DOI 页面为 `https://doi.org/10.1016/j.cma.2022.114823`；公开 arXiv 版本为 `https://arxiv.org/abs/2111.02801`；官方代码仓库为 `https://github.com/lu-group/gpinn`。论文没有单独的架构框图，下图选用 ar5iv 渲染的实验图，展示 gPINN 与 PINN 的精度差异和 gPINN+RAR 的残差点自适应机制。

![gPINN 在 Poisson 方程中的精度对比](https://ar5iv.labs.arxiv.org/html/2111.02801/assets/figs/Fig3.2.1.png)
*图：一维 Poisson 方程中，gPINN 通过残差梯度项改善 \(u\)、\(u'\) 与 PDE residual 的误差；权重 \(w\) 过大时也可能损害效果。*

![gPINN with RAR 在 Burgers 方程中的自适应加点](https://ar5iv.labs.arxiv.org/html/2111.02801/assets/figs/Fig3.4.1.2.png)
*图：gPINN 与 RAR 结合后，在 Burgers 方程陡峭区域附近加入更多残差点，使误差和残差随训练推进下降。*

```python
# gPINN + RAR 训练伪代码
initialize neural surrogate u_hat(x, t; theta)
initialize residual_points Tf
initialize boundary_or_data_points Tb, Ti

for rar_round in range(max_rar_rounds):
    for step in range(train_steps_per_round):
        residual = pde_residual(u_hat, Tf, theta, lambda_)
        loss_f = mean(abs(residual) ** 2)
        loss_b = boundary_loss(u_hat, Tb, theta)
        loss_i = data_loss(u_hat, Ti, theta)  # 反问题或有观测数据时使用

        loss_g = 0.0
        for coord in coordinates:
            grad_residual = derivative(residual, coord)  # AD 计算 ∂f/∂x_i
            loss_g += weight_g[coord] * mean(abs(grad_residual) ** 2)

        loss = w_f * loss_f + w_b * loss_b + w_i * loss_i + loss_g
        theta, lambda_ = optimizer_step(loss, theta, lambda_)

    candidate_points = sample_many_points(domain)
    candidate_residual = abs(pde_residual(u_hat, candidate_points, theta, lambda_))
    Tf.add(top_m_points(candidate_points, candidate_residual))
    if mean(candidate_residual) < tolerance:
        break
```

标准 PINN 从如下 PDE 出发：

$$
f\left(\mathbf{x};
\frac{\partial u}{\partial x_1},\ldots,
\frac{\partial^2 u}{\partial x_i\partial x_j},\ldots;
\boldsymbol{\lambda}\right)=0,\qquad \mathbf{x}\in\Omega.
$$

神经网络 \(\hat{u}(\mathbf{x};\theta)\) 近似真实解，自动微分用于计算 PDE residual。基础 PINN 损失可写成：

$$
\mathcal{L}(\theta;\mathcal{T})
=w_f\mathcal{L}_f(\theta;\mathcal{T}_f)
+w_b\mathcal{L}_b(\theta;\mathcal{T}_b),
$$

其中

$$
\mathcal{L}_f(\theta;\mathcal{T}_f)
=\frac{1}{|\mathcal{T}_f|}
\sum_{\mathbf{x}\in\mathcal{T}_f}
\left|
f\left(\mathbf{x};
\frac{\partial \hat{u}}{\partial x_1},\ldots;
\boldsymbol{\lambda}\right)
\right|^2.
$$

若是反问题，还会加入观测数据项：

$$
\mathcal{L}_i(\theta,\lambda;\mathcal{T}_i)
=\frac{1}{|\mathcal{T}_i|}
\sum_{\mathbf{x}\in\mathcal{T}_i}
\left|\hat{u}(\mathbf{x})-u(\mathbf{x})\right|^2.
$$

gPINN 的关键观察很直接：如果 PDE residual \(f(\mathbf{x})\) 在整个区域内为 0，那么它对任意输入坐标的导数也应为 0：

$$
\nabla f(\mathbf{x})=
\left(
\frac{\partial f}{\partial x_1},
\frac{\partial f}{\partial x_2},
\ldots,
\frac{\partial f}{\partial x_d}
\right)=\mathbf{0}.
$$

因此总损失扩展为：

$$
\mathcal{L}
=w_f\mathcal{L}_f+w_b\mathcal{L}_b+w_i\mathcal{L}_i
+\sum_{i=1}^{d}w_{g_i}\mathcal{L}_{g_i}(\theta;\mathcal{T}_{g_i}),
$$

其中

$$
\mathcal{L}_{g_i}(\theta;\mathcal{T}_{g_i})
=\frac{1}{|\mathcal{T}_{g_i}|}
\sum_{\mathbf{x}\in\mathcal{T}_{g_i}}
\left|\frac{\partial f}{\partial x_i}\right|^2.
$$

这个损失的直觉是：标准 PINN 只在有限训练点上压低 residual，两个相邻点之间的 residual 场仍可能振荡或在陡峭区域漏掉重要结构；gPINN 通过惩罚 residual 的梯度，给每个 collocation point 提供局部变化率信息，相当于让一个点约束附近更大区域的 residual 形状。

以一维 Poisson 方程为例，若 residual 含有二阶导数，梯度项会涉及三阶导数：

$$
\mathcal{L}_g
=w_g\frac{1}{|\mathcal{T}_g|}
\sum_{\mathbf{x}\in\mathcal{T}_g}
\left|
\frac{d^3\hat{u}}{dx^3}-\frac{df}{dx}
\right|^2.
$$

在二维 Poisson 方程中，\(x\) 与 \(y\) 两个方向分别产生额外损失，例如：

$$
\mathcal{L}_{g_1}
=w_{g_1}\frac{1}{|\mathcal{T}_{g_1}|}
\sum_{\mathbf{x}\in\mathcal{T}_{g_1}}
\left|
\frac{\partial^3\hat{u}}{\partial x^3}
+\frac{\partial^3\hat{u}}{\partial x\partial y^2}
-\frac{\partial f}{\partial x}
\right|^2.
$$

> ⚠️ 注意：gPINN 的“梯度增强”不是直接监督解的梯度，除非问题本身有梯度观测；它监督的是 PDE residual 的梯度。这样即使没有额外标签，也能从方程本身产生更多物理约束。

RAR 是 gPINN 在陡峭解上的重要补充。Burgers 方程和 Allen-Cahn 方程的误差通常集中在 shock-like 或过渡层附近，均匀采样会把大量点浪费在平滑区域。RAR 先训练一轮模型，然后在大量候选点上评估 residual，把 residual 最大的 \(m\) 个点加入训练集，循环执行直到平均 residual 低于阈值 \(\mathcal{E}\)。gPINN+RAR 的效果来自两层机制：梯度残差让每个点的约束更强，自适应加点让点集中到最需要的区域。

gPINN 的代价也来自同一处。若 PDE 已包含高阶导数，\(\partial f/\partial x_i\) 会要求更高阶自动微分，内存和时间都上升。论文结论中强调，gPINN 通常比 PINN 更贵，但在相同训练点数量下误差更低；当用相似计算预算比较时，某些问题中“PINN 加倍训练点”可接近 gPINN，另一些如 Burgers 方程中 gPINN 仍更优。因此它更像一种提高物理约束密度的工具，而不是无条件替代 PINN 的默认配置。

#### 🧪 练习题
```yaml
question: "gPINN 相比标准 PINN 的核心新增项是什么？"
options:
  - "只增加更多边界条件点，不改变损失函数"
  - "加入 PDE residual 对输入坐标的梯度损失，使 \\(\\partial f/\\partial x_i\\) 也趋近于 0"
  - "把 PDE residual 替换成纯数据监督误差"
  - "用卷积层代替自动微分"
answer: 1
explain: "gPINN 的主要贡献是把 residual gradient 嵌入损失函数；若 PDE residual 在区域内为零，其空间/时间梯度也应为零。"
```
