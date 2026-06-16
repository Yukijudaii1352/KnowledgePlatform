### hp-VPINNs — 变分PINN (hp-Variational PINNs)

```yaml
id: hp_vpinns
name: hp-VPINNs
full_name: 变分PINN (hp-Variational PINNs)
year: '2021'
org: 布朗大学
paper_url: https://doi.org/10.1016/j.cma.2020.113533
category: pde_solving
parent: pinn
motivation: 变分形式与hp细化优化精度
```

#### 📝 一句话总结

hp-VPINNs 将 PINN 的强形式 collocation residual 改成局部变分残差：用一个全局神经网络作为 trial function，同时在非重叠子域上用高阶多项式 test functions 做投影，实现 \(h\)-域分解和 \(p\)-高阶测试空间细化，以提升 PDE 求解精度和局部优化效率。

#### 🎯 核心要点

- **全局 trial space**：解函数仍由一个全局 DNN \(u_{NN}(x,t;\theta)\) 表示，保持 PINN 的连续函数近似能力
- **局部 test space**：测试函数是定义在各个非重叠子域上的分片高阶多项式，常用 Legendre polynomials
- **hp-refinement**：\(h\) 表示把计算域拆成更多元素，\(p\) 表示在每个元素中增加或调整测试多项式阶数
- **变分残差**：不只在点上令 PDE residual 为 0，而是最小化 \((\mathcal{L}^q u_{NN}-f,v_k^{(e)})_{\Omega_e}\)
- **局部学习思想**：虽然网络是全局的，loss 可以按元素组织，让训练更关注不光滑、陡峭或误差大的局部区域
- **数值积分**：深层网络的变分积分通常不能解析求出，论文使用 Gauss quadrature；也讨论通过分部积分降低导数阶数
- **相对 VPINN**：VPINN 使用全局多项式测试函数，hp-VPINN 使用局部测试函数，更接近 sub-domain Petrov-Galerkin
- **实验对象**：函数逼近、1D/2D Poisson 方程、L-shape corner singularity、advection-diffusion inverse problem 等

#### 🔬 深入细节

##### 可访问来源与核心示意图

任务给出的 DOI 指向 Computer Methods in Applied Mechanics and Engineering 版本；可直接访问的 arXiv 版本为 https://arxiv.org/abs/2003.05385。论文没有单一“网络结构图”，核心机制主要由公式定义；下图来自 ar5iv 渲染的 Figure 1，用全局/局部测试函数与子域误差示例展示 hp-VPINN 的局部测试空间思想。

![hp-VPINN 局部测试函数与子域示意](https://ar5iv.labs.arxiv.org/html/2003.05385/assets/x1.png)
*图：全局测试函数与局部 elemental test functions 的对比；局部测试函数把优化信号限制到指定子域，是 hp-VPINN 域分解与局部学习的核心。*

##### 算法伪代码

```python
# hp-VPINN 训练伪代码

def u_nn(x, t, theta):
    return mlp(concat(x, t), theta)

def strong_residual(x, t, theta, q):
    u = u_nn(x, t, theta)
    # 例如 L^q u = f，可由自动微分计算所需导数
    return L_q(u, x, t, q) - f(x, t)

def element_variational_residual(element, test_fn, theta):
    # Gauss quadrature on element Omega_e x Gamma_e
    residual_sum = 0.0
    for z, w in gauss_points(element):
        x, t = z.x, z.t
        r = strong_residual(x, t, theta, q)
        residual_sum += w * r * test_fn(x, t)
    return residual_sum

for epoch in range(num_epochs):
    loss_v = 0.0
    for element in mesh_partition:
        local_terms = []
        for v_k in element.local_polynomial_tests:
            R_ek = element_variational_residual(element, v_k, theta)
            local_terms.append(R_ek ** 2)
        loss_v += mean(local_terms)

    loss_b = mean((u_nn(x_b, t_b, theta) - boundary_value(x_b, t_b)) ** 2)
    loss_0 = mean((u_nn(x_0, 0, theta) - initial_value(x_0)) ** 2)
    loss = loss_v + tau_b * loss_b + tau_0 * loss_0

    optimizer.zero_grad()
    loss.backward()
    optimizer.step()
```

##### 从强形式 PINN 到变分形式

论文考虑一般 PDE：

$$
\mathcal{L}^{\mathbf{q}}u(\mathbf{x},t)=f(\mathbf{x},t),
\qquad
(\mathbf{x},t)\in\Omega\times(0,T],
$$

配合边界与初始条件：

$$
u(\mathbf{x},t)=h(\mathbf{x},t),\quad
u(\mathbf{x},0)=g(\mathbf{x}).
$$

用神经网络 \(u_{NN}(\mathbf{x},t;\theta)\) 近似解后，强形式残差是

$$
r(u_{NN})=\mathcal{L}^{\mathbf{q}}u_{NN}-f.
$$

标准 PINN 直接在 collocation points 上最小化 \(|r|^2\)，其损失近似为

$$
L^{\mathfrak{s}}
=
\frac{1}{N_r}\sum_{i=1}^{N_r}|r(\mathbf{x}^i_r,t^i_r)|^2
+\tau_b\frac{1}{N_b}\sum_{i=1}^{N_b}|r_b(\mathbf{x}^i_b,t^i_b)|^2
+\tau_0\frac{1}{N_0}\sum_{i=1}^{N_0}|r_0(\mathbf{x}^i_0)|^2.
$$

VPINN / hp-VPINN 改为把残差投影到测试函数上：

$$
\mathcal{R}_j(u_{NN})
=
\int_{\Omega\times(0,T]}
r(u_{NN})v_j\,dx\,dt.
$$

这样优化目标不再是“某些点上 residual 小”，而是“残差对一组测试函数的矩接近 0”。这和 Galerkin / Petrov-Galerkin 方法的思想一致。

##### hp-VPINN 的局部元素残差

hp-VPINN 的关键是测试函数局部化。把域 \(V\) 划分成非重叠子域 \(V_j\)，测试函数定义为

$$
v_j=
\begin{cases}
\bar{v}\neq0, & \text{over } V_j,\\
0, & \text{over } V_j^c,
\end{cases}
$$

其中 \(\bar{v}\) 通常取高阶多项式。对第 \(e\) 个元素，元素变分残差为

$$
\mathcal{R}^{(e)}
=
\left(\mathcal{L}^{\mathbf{q}}u_{NN}-f,\;v\right)_{\Omega_e\times\Gamma_e}.
$$

最终变分损失写成

$$
L^{\mathfrak{v}}
=
\sum_{e=1}^{N_{el}}
\frac{1}{K^{(e)}}\sum_{k=1}^{K^{(e)}}
\left|\mathcal{R}^{(e)}_k\right|^2
+\tau_b\frac{1}{N_b}\sum_{i=1}^{N_b}|r_b(\mathbf{x}^i_b,t^i_b)|^2
+\tau_0\frac{1}{N_0}\sum_{i=1}^{N_0}|r_0(\mathbf{x}^i_0)|^2.
$$

这里 \(K^{(e)}\) 是第 \(e\) 个元素中的测试函数数量。\(h\)-refinement 对应增加或重排元素；\(p\)-refinement 对应提高某个元素内的测试多项式阶数或数量。

##### 为什么这种设计能改善优化

标准 PINN 的 collocation residual 对采样点分布很敏感。若解在局部有尖峰、间断、边界层或 L-shape 角点奇异性，均匀点采样可能把训练预算浪费在平滑区域。hp-VPINN 通过局部 test functions 把 loss 拆成元素级贡献，可以在问题困难的子域使用更细的 \(h\) 或更高的 \(p\)，让优化信号更有针对性。

> 💡 关键：hp-VPINN 不是把每个子域都训练一个独立网络；论文的主设定仍是一个全局 DNN，只是 residual projection 和 loss 组织在局部元素上完成。

深层网络的积分项通常不能像浅层网络那样解析求值，因此论文使用 Gauss quadrature：

$$
\mathcal{R}^{(e)}_k
\approx
\sum_{m=1}^{Q}
w_m\,
\left(\mathcal{L}^{\mathbf{q}}u_{NN}(z_m)-f(z_m)\right)
v_k^{(e)}(z_m).
$$

当 PDE 含高阶导数时，可以对变分形式做一次或多次分部积分，把导数从 \(u_{NN}\) 转移到测试函数上，从而降低对神经网络高阶导数的要求。这也是弱形式方法相对强形式 PINN 的一个数值优势。

##### 与 PINN、VPINN 和传统有限元的区别

| 方法 | Trial function | Test / residual | 细化方式 | 主要特点 |
|------|----------------|-----------------|----------|----------|
| PINN | 全局 DNN | Dirac delta / collocation points | 采样点加密 | 简单通用，但点残差和损失权重敏感 |
| VPINN | 全局 DNN | 全局多项式测试函数 | 增加全局测试阶数 | 引入变分残差，但局部控制弱 |
| hp-VPINN | 全局 DNN | 子域上的分片高阶多项式 | \(h\) 域分解 + \(p\) 阶数提升 | 局部化优化信号，适合非光滑或局部复杂解 |
| 有限元 | 分片多项式 | 局部弱形式 | 标准 \(h/p\) 网格细化 | 线性/低阶 trial space 清晰，但不具备 DNN 的非线性全局表达 |

hp-VPINN 的定位可以理解为：保留 PINN 的神经网络 trial space，同时把有限元/Petrov-Galerkin 的局部测试空间和 hp-refinement 引入损失设计。它不是传统数值方法的直接替代，而是把“残差如何约束网络”从点约束升级成局部积分约束。

##### 实用限制

hp-VPINN 的额外精度来自更复杂的 loss。每个元素、每个测试函数、每个 quadrature point 都要计算 residual 和自动微分，训练成本可能高于标准 PINN。测试函数阶数、元素划分、quadrature 点数、边界项权重也会显著影响结果。对于高维问题，普通张量积 quadrature 会遇到维数灾难，论文也指出可考虑 quasi-Monte Carlo 或 sparse-grid quadrature。

#### 🧪 练习题

```yaml
question: "hp-VPINNs 中 h-refinement 和 p-refinement 分别对应什么？"
options:
  - "h 是学习率调度，p 是优化器动量"
  - "h 是增加网络隐藏层，p 是增加神经元数量"
  - "h 是域分解/元素细化，p 是提高局部测试多项式阶数或数量"
  - "h 是边界损失权重，p 是初始条件损失权重"
answer: 2
explain: "hp-VPINNs 将测试函数定义在局部子域上；h-refinement 改变子域划分，p-refinement 改变元素内高阶多项式测试空间。"
```
