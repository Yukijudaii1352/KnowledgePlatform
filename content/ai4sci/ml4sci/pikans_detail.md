### PIKANs — 物理信息KAN网络 (Physics-Informed Kolmogorov-Arnold Networks)

```yaml
id: pikans
name: PIKANs
full_name: 物理信息KAN网络 (Physics-Informed Kolmogorov-Arnold Networks)
year: '2026'
org: PNNL
paper_url: https://www.pnnl.gov/publications/from-pinns-to-pikans
category: pinn_family
parent: pinn
motivation: KAN可学习激活函数提升高维精度
```

#### 📝 一句话总结

PIKANs 将 PINN 中的 MLP 表示模型替换为 Kolmogorov-Arnold Network，使边上的一元函数成为可学习激活函数，在 PDE 残差约束不变的前提下提升表达能力、参数效率和可解释性。

#### 🎯 核心要点

- **表示模型替换**：从 \(u_\theta(x,t)=\mathrm{MLP}_\theta(x,t)\) 改为 \(u_\theta(x,t)=\mathrm{KAN}_\theta(x,t)\)，物理残差、边界损失和数据损失沿用 PINN 框架
- **边函数可学习**：KAN 将固定激活函数改为边上的一元函数 \(\phi_{j,i}\)，常见实现包括 B-spline、Chebyshev 多项式、RBF、Wavelet 等
- **物理信息训练**：通过自动微分计算 KAN 输出对时空坐标的导数，最小化 PDE 残差 \(r_f=\mathcal{N}[u_\theta]-s\) 与初始/边界条件误差
- **多种 PDE 形式**：可用于强形式 PINN、能量形式 DEM、边界积分/逆形式 BINN；KINN 工作展示了 KAN 版本的强形式、能量形式和逆形式求解
- **精度优势场景**：在多尺度、奇异性、应力集中、非线性超弹性、异质材料和部分反问题中，KAN 表示比 MLP 更容易逼近局部陡变与高低频混合解
- **参数与可解释性**：可学习一元边函数比全连接 MLP 的黑箱权重更容易可视化，且在若干 PDE 案例中可用更少参数达到更低误差
- **主要限制**：KAN 的网格大小、样条阶数和边函数类型是敏感超参数；高维配点数量仍会膨胀，原始 PIKAN 在高维问题上训练可能变慢

#### 🔬 深入细节

##### 核心架构示意

![PIML 表示模型增强示意图](https://arxiv.org/html/2410.13228v2/extracted/5944408/Images/schematic.png)
*图：From PINNs to PIKANs 综述中的 PIML 框架图。PINN/PIKAN 的共同结构是“表示模型 → PDE/边界残差 → 多目标损失 → 优化器”，区别在于表示模型从 MLP 层替换为 KAN 层。*

![KINN/PIKAN 方法概览](https://arxiv.org/html/2406.11045/x1.png)
*图：Kolmogorov-Arnold-Informed Neural Network 的图形摘要，展示了将 KAN 嵌入强形式、能量形式和逆形式 PDE 求解的思路。*

> 来源限制：任务给出的 PNNL 链接对应的是 “From PINNs to PIKANs” 综述入口；可访问正文主要来自 arXiv:2410.13228 及其引用的 KINN/PIKAN 实证论文（如 arXiv:2406.11045）。因此这里按“PIKANs 作为一类方法”解读，而不是声称存在单一同名算法论文。

##### 算法伪代码

```python
# PIKAN/KINN 训练伪代码
# 输入: PDE 算子 N, 源项 s, 初始/边界数据, 配点 Z_f
# 输出: 满足物理约束的 KAN 表示 u_theta

theta = init_kan(edge_function="bspline_or_chebyshev")

for step in range(max_steps):
    z_f = sample_collocation_points()          # z = (x, t) 或高维时空坐标
    z_b, u_b = sample_boundary_points()
    z_0, u_0 = sample_initial_points()

    u_f = KAN(theta, z_f)
    grads = auto_diff(u_f, z_f)                # 自动微分求 u_t, u_x, u_xx, ...
    r_f = PDE_operator_N(u_f, grads) - source(z_f)

    u_bc = KAN(theta, z_b)
    u_ic = KAN(theta, z_0)

    loss_pde = mean_square(r_f)
    loss_bc = mean_square(u_bc - u_b)
    loss_ic = mean_square(u_ic - u_0)
    loss = loss_pde + lambda_bc * loss_bc + lambda_ic * loss_ic

    theta = optimizer_step(theta, loss)
```

##### 动机与背景

标准 PINN 使用 MLP 作为 \(u_\theta(x,t)\) 的函数逼近器。它的优势是简单、可微、无网格；问题是 MLP 对高频、多尺度和局部奇异结构常有谱偏置，PDE 残差又需要高阶导数，训练时容易出现梯度不平衡、边界项压不过 PDE 项、或在复杂局部结构处误差集中。

KAN 的切入点是 Kolmogorov-Arnold 表示定理：多元连续函数可以由一元函数的复合与加和表示。现代 KAN 不再使用固定的 \(\tanh\)、ReLU 或 SiLU，而是在网络边上放置可学习的一元函数。一个 KAN 层可抽象写为：

$$z_j^{(\ell+1)}=\sum_{i=1}^{n_\ell}\phi_{j,i}^{(\ell)}\!\left(z_i^{(\ell)}\right)$$

其中 \(\phi_{j,i}^{(\ell)}\) 是第 \(\ell\) 层从输入节点 \(i\) 到输出节点 \(j\) 的可学习边函数。原始 KAN 常使用 B-spline 展开：

$$\phi(x)=w_b b(x)+w_s\sum_{k} c_k B_{k,p}(x)$$

这里 \(B_{k,p}\) 是 \(p\) 阶 B-spline 基函数，\(c_k\) 是可学习系数。cPIKAN/KINN 变体也常使用 Chebyshev 多项式：

$$\phi(x)=\sum_{k=0}^{K} a_k T_k(x), \quad T_{k+1}(x)=2xT_k(x)-T_{k-1}(x)$$

> 💡 关键：PIKAN 的创新不在于改变 PDE 残差形式，而在于把“表示解的神经网络”换成更接近数值基函数展开的 KAN。

##### 物理信息损失

对一般 PDE：

$$\mathcal{N}[u](z)=s(z), \quad z=(x,t)\in \Omega\times[0,T]$$

PIKAN 用 KAN 表示：

$$u_\theta(z)=\mathrm{KAN}_\theta(z)$$

并通过自动微分构造残差：

$$r_f(z;\theta)=\mathcal{N}[u_\theta](z)-s(z)$$

典型损失函数为：

$$\mathcal{L}(\theta)=
\lambda_f\frac{1}{N_f}\sum_{i=1}^{N_f}|r_f(z_f^i;\theta)|^2+
\lambda_b\frac{1}{N_b}\sum_{i=1}^{N_b}|\mathcal{B}[u_\theta](z_b^i)-g_b^i|^2+
\lambda_d\frac{1}{N_d}\sum_{i=1}^{N_d}|u_\theta(z_d^i)-u_d^i|^2$$

这里 \(\mathcal{B}\) 是边界/初始条件算子，\(\lambda_f,\lambda_b,\lambda_d\) 是损失权重。对反问题，未知物理参数 \(\lambda\) 也可以与 KAN 参数 \(\theta\) 一起优化。

##### 为什么 KAN 对 PDE 有吸引力

KAN 的 B-spline 或 Chebyshev 边函数类似局部/谱基函数，能在有限区间内构造更灵活的一元响应。对于多尺度解，MLP 需要通过层叠固定激活来合成高频结构；KAN 可以直接调整边函数形状，在局部陡变、奇异梯度和应力集中区域更快拟合目标。

另一个优势是可解释性。MLP 的知识分散在矩阵权重中，而 KAN 的每条边对应一条可视化的一元函数。对科学计算任务而言，这有助于检查模型是否学到单调性、局部峰值、周期性或材料异质性等物理相关结构。

##### 与 PINN 的区别

| 方面 | PINN | PIKANs |
|------|------|--------|
| 表示模型 | MLP + 固定激活函数 | KAN + 可学习边函数 |
| 非线性来源 | 节点激活 \(\sigma(Wx+b)\) | 边函数 \(\phi_{j,i}(x_i)\) |
| 物理约束 | PDE/IC/BC 残差 | 同 PINN |
| 导数计算 | 自动微分 MLP 输出 | 自动微分 KAN 输出 |
| 优势场景 | 中低维、较平滑解 | 多尺度、局部奇异、参数效率敏感问题 |
| 主要风险 | 谱偏置、损失不平衡 | KAN 超参数敏感、训练开销可能更高 |

##### 实践注意点

1. 输入通常需要归一化到 \([-1,1]\)，尤其是 Chebyshev 或样条边函数，否则多项式/样条基容易数值不稳定。
2. 网格大小不是越大越好。KINN 实验显示，KAN grid size 过大可能导致过拟合和边函数不光滑。
3. 对复杂几何，PIKAN 不会自动解决采样与边界表示问题；仍需距离函数、RBF、NURBS、三角积分或几何映射等辅助技术。
4. 高维 PDE 中配点数量仍然是瓶颈，后续 SPIKANs 通过变量分离让每个维度由单独 KAN 处理，正是为缓解这一问题。

#### 🧪 练习题

```yaml
question: "PIKANs 相比传统 PINN 的核心变化是什么？"
options:
  - "将 PDE 残差从强形式改成有限差分格式"
  - "用 KAN 的可学习一元边函数替换 MLP 的固定激活表示模型"
  - "取消边界条件损失，只保留数据拟合项"
  - "用强化学习选择配点"
answer: 1
explain: "PIKANs 的主体仍是 PINN 的物理残差训练框架，关键变化是把表示解的 MLP 换成 KAN，让边上的一元函数可学习。"
```
