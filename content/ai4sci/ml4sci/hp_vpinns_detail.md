### hp-VPINNs — hp变分物理信息神经网络 (hp-Variational PINNs)

```yaml
id: hp_vpinns
name: hp-VPINNs
full_name: hp变分物理信息神经网络 (hp-Variational PINNs)
year: '2021'
org: 布朗大学
paper_url: https://arxiv.org/abs/2003.05385
category: pinn_family
parent: pinn
motivation: 结合变分法与hp细化处理奇异性
```

#### 📝 一句话总结

hp-VPINNs 将 PINN 的点残差约束改成局部变分残差：用一个全局神经网络表示 trial solution，同时在非重叠子域上用高阶多项式测试函数投影 PDE 残差，从而通过 \(h\)-域分解和 \(p\)-阶数提升处理局部奇异性、陡峭梯度和非均匀误差。

#### 🎯 核心要点

- **全局 trial space**：解函数仍由一个全局神经网络 \(u_{NN}(x,t;\theta)\) 表示，保持 PINN 的连续函数近似能力
- **局部 test space**：测试函数定义在每个非重叠子域上，常用 Legendre 多项式等高阶局部基
- **hp-refinement**：\(h\) 表示增加/重排子域元素，\(p\) 表示提升局部测试多项式阶数或数量
- **变分残差损失**：最小化 \((\mathcal{L}u_{NN}-f, v_k^{(e)})_{\Omega_e}\)，而不是只在 collocation points 上令强残差为零
- **局部学习机制**：网络参数是全局共享的，但 loss 按元素组织，可以把训练压力集中到误差大、非光滑或奇异的局部区域
- **数值积分实现**：深层网络的变分积分通常不能解析求出，论文使用 Gauss quadrature 近似；也可通过分部积分降低网络导数阶数
- **相对 VPINN 的改进**：VPINN 使用全局测试函数，hp-VPINNs 使用局部分片测试函数，更接近 subdomain Petrov-Galerkin
- **实验对象**：函数逼近、1D/2D Poisson 方程、L-shape corner singularity、advection-diffusion inverse problem 等

#### 🔬 深入细节

##### 核心示意图与来源

论文 arXiv 页面为 https://arxiv.org/abs/2003.05385，CMAME 版本 DOI 为 https://doi.org/10.1016/j.cma.2020.113547。论文没有单一神经网络架构图，最能体现方法的图是局部测试函数与子域误差示例；下图来自 ar5iv 对论文 Figure 1 的渲染。

![hp-VPINNs 局部测试函数与子域学习示意](https://ar5iv.labs.arxiv.org/html/2003.05385/assets/x1.png)
*图：全局测试函数与局部 elemental test functions 的对比；局部测试函数把残差投影限制到指定子域，是 hp-VPINNs 域分解和局部学习的核心。*

##### 算法伪代码

```python
# hp-VPINNs 训练伪代码

def u_nn(x, t, theta):
    return mlp(concat(x, t), theta)

def strong_residual(x, t, theta):
    u = u_nn(x, t, theta)
    # 例如 L u = f，所需导数由自动微分计算
    return L(u, x, t) - f(x, t)

def element_variational_residual(element, test_fn, theta):
    residual_sum = 0.0
    for z, w in gauss_quadrature_points(element):
        x, t = z
        r = strong_residual(x, t, theta)
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
u(\mathbf{x},t)=h(\mathbf{x},t),
\qquad
u(\mathbf{x},0)=g(\mathbf{x}).
$$

用神经网络 \(u_{NN}(\mathbf{x},t;\theta)\) 近似解后，强形式残差为：

$$
r(u_{NN})=\mathcal{L}^{\mathbf{q}}u_{NN}-f.
$$

标准 PINN 直接在 collocation points 上最小化 \(|r|^2\)，即把测试函数隐式看成一组 Dirac delta。hp-VPINNs 则把残差投影到测试函数上：

$$
\mathcal{R}_j(u_{NN})
=
\int_{\Omega\times(0,T]}
r(u_{NN})v_j\,d\mathbf{x}\,dt.
$$

这种弱/变分约束的直觉是：不要求每个采样点的强残差都精确为零，而是要求残差对一组测试函数的矩为零。对噪声、采样点布局和局部奇异结构而言，这往往比纯点约束更稳健。

##### hp-VPINNs 的局部元素残差

hp-VPINNs 的关键是测试函数局部化。把计算域划分为非重叠元素 \(\Omega_e\)，在第 \(e\) 个元素上定义局部测试函数 \(v_k^{(e)}\)，其支撑只在该元素内非零：

$$
v_k^{(e)}(\mathbf{x},t)=
\begin{cases}
\bar{v}_k^{(e)}(\mathbf{x},t), & (\mathbf{x},t)\in\Omega_e,\\
0, & \text{otherwise}.
\end{cases}
$$

元素级变分残差为：

$$
\mathcal{R}^{(e)}_k
=
\left(\mathcal{L}^{\mathbf{q}}u_{NN}-f,\;v_k^{(e)}\right)_{\Omega_e}.
$$

总损失可以写成：

$$
L^{\mathfrak{v}}
=
\sum_{e=1}^{N_{el}}
\frac{1}{K^{(e)}}\sum_{k=1}^{K^{(e)}}
\left|\mathcal{R}^{(e)}_k\right|^2
+\tau_b\frac{1}{N_b}\sum_{i=1}^{N_b}|r_b(\mathbf{x}^i_b,t^i_b)|^2
+\tau_0\frac{1}{N_0}\sum_{i=1}^{N_0}|r_0(\mathbf{x}^i_0)|^2.
$$

这里 \(K^{(e)}\) 是第 \(e\) 个元素内的测试函数数量。\(h\)-refinement 对应把困难区域划得更细；\(p\)-refinement 对应在困难元素中使用更高阶或更多测试函数。

##### 数值积分与分部积分

由于 \(u_{NN}\) 是深层非线性函数，\(\mathcal{R}^{(e)}_k\) 通常无法解析积分，论文使用 Gauss quadrature：

$$
\mathcal{R}^{(e)}_k
\approx
\sum_{m=1}^{Q}
w_m\,
\left(\mathcal{L}^{\mathbf{q}}u_{NN}(z_m)-f(z_m)\right)
v_k^{(e)}(z_m).
$$

当 PDE 含高阶导数时，可以对弱形式做分部积分，把部分导数从 \(u_{NN}\) 转移到测试函数上。这样能降低自动微分需要计算的网络导数阶数，在高阶 PDE 或 stiff 问题中尤其重要。

##### 为什么局部变分约束能处理奇异性

标准 PINN 的误差控制强依赖 collocation 点分布和损失权重。如果解在 L-shape 角点、边界层、冲击附近或局部高频区域变化剧烈，均匀采样容易把训练预算浪费在平滑区域。hp-VPINNs 把残差损失拆成元素级贡献，允许针对困难区域增加元素数或测试阶数，使优化信号更局部、更可控。

> 💡 关键：hp-VPINNs 不是在每个子域训练独立网络；论文的主设定仍是一个全局神经网络，只是 residual projection 和损失组织在局部元素上完成。

##### 与 PINN、VPINN 和有限元的区别

| 方法 | Trial function | Test / residual | 细化方式 | 主要特点 |
|------|----------------|-----------------|----------|----------|
| PINN | 全局 DNN | 点残差 / collocation | 增加采样点 | 简单通用，但对采样和权重敏感 |
| VPINN | 全局 DNN | 全局多项式测试函数 | 增加全局测试阶数 | 引入变分残差，但局部控制较弱 |
| hp-VPINNs | 全局 DNN | 子域局部高阶测试函数 | \(h\) 域分解 + \(p\) 阶数提升 | 局部化优化信号，适合非光滑或局部复杂解 |
| 有限元 | 分片多项式 | 局部弱形式 | 标准 \(h/p\) 网格细化 | 数值理论成熟，但 trial space 表达受网格基限制 |

hp-VPINNs 的定位可以理解为：保留 PINN 的神经网络 trial space，同时把有限元/Petrov-Galerkin 的局部测试空间和 hp-refinement 引入损失设计。它不是传统数值方法的直接替代，而是把“如何约束神经网络满足 PDE”从点约束升级为局部积分约束。

##### 实用限制

hp-VPINNs 的额外精度来自更复杂的 loss。每个元素、每个测试函数、每个 quadrature point 都需要计算 residual 和自动微分，训练成本通常高于标准 PINN。测试阶数、元素划分、quadrature 点数、边界项权重都会显著影响结果。对于高维问题，普通张量积 quadrature 会遇到维数灾难，需要 sparse grid、quasi-Monte Carlo 或其他积分近似来控制成本。

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
