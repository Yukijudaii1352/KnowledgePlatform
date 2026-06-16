### cPINN — 守恒物理信息神经网络 (Conservative PINNs)

```yaml
id: cpinn
name: cPINN
full_name: 守恒物理信息神经网络 (Conservative PINNs)
year: '2020'
org: 布朗大学
paper_url: https://arxiv.org/abs/2001.08245
category: pinn_family
parent: pinn
motivation: 基于域分解强制执行物理守恒律
```

#### 📝 一句话总结

cPINN 将计算域划分为多个子域并为每个子域训练独立 PINN，在子域交界面显式惩罚通量连续和平均解一致性，从而把守恒律的跨界面约束嵌入神经网络求解器，提升非线性守恒律问题的局部表达能力与并行性。

#### 🎯 核心要点

- **面向非线性守恒律**：主要针对 Burgers、KdV、Euler、Navier-Stokes 等可写成守恒/通量形式的 PDE
- **离散域分解**：把时空或空间计算域拆成多个子域，每个子域使用独立 neural network \(u_{\theta_i}\)
- **强形式 PDE 残差**：每个子域内部仍像 PINN 一样通过自动微分最小化 PDE residual
- **界面通量连续**：在相邻子域的公共界面上强制 \(F(u_i,\nabla u_i)=F(u_j,\nabla u_j)\)，这是 cPINN 的“conservative”核心
- **平均解约束**：除通量连续外，还约束两侧网络在界面上的预测接近平均解，以加速收敛并抑制界面振荡
- **局部网络自由度**：不同子域可使用不同深度、宽度、激活函数、优化器、残差点数量和训练超参数
- **并行计算友好**：子域内部损失可在不同设备/进程上并行优化，只需交换界面预测和通量信息
- **来源限制说明**：任务给出的 arXiv URL 当前解析为另一篇非 cPINN 论文；本文方法依据作者仓库 `https://github.com/AmeyaJagtap/Conservative_PINNs`、论文 DOI `https://doi.org/10.1016/j.cma.2020.113028` 和仓库 PDF `https://raw.githubusercontent.com/AmeyaJagtap/Conservative_PINNs/main/cPINN_Paper.pdf`

#### 🔬 深入细节

##### 核心示意图与来源

![cPINN 域分解与界面守恒约束示意](https://quickchart.io/graphviz?graph=digraph%20G%20%7Brankdir%3DLR%3Bnode%5Bshape%3Dbox%2Cstyle%3Drounded%5D%3Bsd1%5Blabel%3D%22Subdomain%201%5CnPINN%201%22%5D%3Bsd2%5Blabel%3D%22Subdomain%202%5CnPINN%202%22%5D%3Bsd3%5Blabel%3D%22Subdomain%203%5CnPINN%203%22%5D%3Bsd1-%3Esd2%5Blabel%3D%22flux%20%2B%20state%20continuity%22%2Cdir%3Dboth%5D%3Bsd2-%3Esd3%5Blabel%3D%22flux%20%2B%20state%20continuity%22%2Cdir%3Dboth%5D%3B%7D)
*图：cPINN 的核心是多个子域 PINN 通过界面条件耦合；原论文 Figure 1 的可访问来源见作者仓库 PDF：`https://raw.githubusercontent.com/AmeyaJagtap/Conservative_PINNs/main/cPINN_Paper.pdf`。*

##### 算法伪代码

```python
# cPINN 训练伪代码

subdomains = split_domain(Omega, interfaces)
models = {i: PINN_i(width=local_width[i], depth=local_depth[i])
          for i in subdomains}

for epoch in range(num_epochs):
    total_loss = 0.0

    # 1. 每个子域内部的 PINN 损失
    for i, Omega_i in subdomains.items():
        u_i = models[i](x_u[i], t_u[i])
        f_i = pde_residual(models[i], x_f[i], t_f[i])  # auto-diff
        loss_data_i = mse(u_i, u_data[i])
        loss_res_i = mse(f_i, 0.0)
        total_loss += lambda_u * loss_data_i + lambda_f * loss_res_i

    # 2. 相邻子域界面上的守恒耦合
    for (i, j, Gamma_ij) in neighboring_interfaces:
        u_i = models[i](Gamma_ij.x, Gamma_ij.t)
        u_j = models[j](Gamma_ij.x, Gamma_ij.t)
        flux_i = physical_flux(models[i], Gamma_ij)
        flux_j = physical_flux(models[j], Gamma_ij)
        u_avg = 0.5 * (u_i + u_j)

        loss_flux = mse(flux_i - flux_j, 0.0)
        loss_state = mse(u_i - u_avg, 0.0) + mse(u_j - u_avg, 0.0)
        total_loss += lambda_flux * loss_flux + lambda_state * loss_state

    update_all_or_local_optimizers(models, total_loss)
```

##### 从 PINN 到 cPINN：为什么需要界面守恒

标准 PINN 在整个域上训练一个网络 \(u_\theta(x,t)\)，用数据项、边界/初始条件项和 PDE 残差项组成损失。对于一般守恒律：

$$
\frac{\partial u}{\partial t} + \nabla\cdot \mathbf{F}(u,\nabla u;\lambda)=0,
$$

标准 PINN 的强形式残差可写为：

$$
r_\theta(x,t)=
\frac{\partial u_\theta}{\partial t}
+ \nabla\cdot \mathbf{F}(u_\theta,\nabla u_\theta;\lambda).
$$

当解含冲击、边界层、多尺度结构或局部复杂流动时，一个全局网络往往需要很大容量才能同时拟合所有区域。更严重的是，守恒律的数值解通常要求跨单元通量守恒；如果只把域拆开训练多个 PINN，而没有界面通量约束，各子域预测可能在界面处产生非物理的质量、动量或能量泄漏。

cPINN 的基本想法是：在每个子域 \(\Omega_i\) 中训练独立网络 \(u_{\theta_i}\)，同时在相邻子域界面 \(\Gamma_{ij}\) 上加入守恒约束。子域内部损失为：

$$
L_i^{\mathrm{PINN}}
=
\frac{1}{N_{u,i}}\sum_{n=1}^{N_{u,i}}
\left|u_{\theta_i}(x_n,t_n)-u_n\right|^2
+
\frac{1}{N_{f,i}}\sum_{n=1}^{N_{f,i}}
\left|r_{\theta_i}(x_n,t_n)\right|^2.
$$

##### 界面通量连续与平均解约束

对公共界面 \(\Gamma_{ij}\)，cPINN 要求两侧通量一致：

$$
\mathbf{F}\!\left(u_{\theta_i},\nabla u_{\theta_i}\right)\cdot \mathbf{n}_{ij}
=
\mathbf{F}\!\left(u_{\theta_j},\nabla u_{\theta_j}\right)\cdot \mathbf{n}_{ij}.
$$

对于一维粘性 Burgers 方程：

$$
u_t + u u_x - \nu u_{xx}=0,
$$

它可写成通量形式 \(u_t + \partial_x F = 0\)，其中：

$$
F(u,u_x)=\frac{u^2}{2}-\nu u_x.
$$

因此在界面 \(x=x_\Gamma\) 上的通量损失可写成：

$$
L_{\Gamma}^{\mathrm{flux}}
=
\frac{1}{N_\Gamma}\sum_{n=1}^{N_\Gamma}
\left|
\left(\frac{u_{\theta_i}^2}{2}-\nu \partial_x u_{\theta_i}\right)(x_\Gamma,t_n)
-
\left(\frac{u_{\theta_j}^2}{2}-\nu \partial_x u_{\theta_j}\right)(x_\Gamma,t_n)
\right|^2.
$$

论文/代码还加入平均解约束。令：

$$
\bar{u}_{ij}=\frac{u_{\theta_i}+u_{\theta_j}}{2},
$$

则界面状态损失为：

$$
L_{\Gamma}^{\mathrm{avg}}
=
\frac{1}{N_\Gamma}\sum_{n=1}^{N_\Gamma}
\left(
\left|u_{\theta_i}(x_\Gamma,t_n)-\bar{u}_{ij}(x_\Gamma,t_n)\right|^2
+
\left|u_{\theta_j}(x_\Gamma,t_n)-\bar{u}_{ij}(x_\Gamma,t_n)\right|^2
\right).
$$

总目标可概括为：

$$
L_{\mathrm{cPINN}}
=
\sum_i L_i^{\mathrm{PINN}}
+
\lambda_{\Gamma}
\sum_{(i,j)}
\left(
L_{\Gamma_{ij}}^{\mathrm{flux}}
+
L_{\Gamma_{ij}}^{\mathrm{avg}}
\right).
$$

> 💡 关键：cPINN 的守恒性不是靠训练后拼接结果得到的，而是在训练损失中直接约束相邻子域的物理通量。

##### 机制拆解：局部容量、界面通信和并行优化

域分解给 cPINN 带来三个实际优势。第一，局部容量可调：在解存在冲击或复杂结构的子域使用更深/更宽网络，在平滑区域使用浅网络，减少全局网络被最困难区域拖累的问题。第二，残差点分配可调：可在界面、激波附近或高误差子域放置更多 collocation points。第三，训练可并行：每个子域内部的 PDE 残差和数据项互不依赖，只在界面损失上交换 \(u\)、\(\nabla u\) 和通量。

作者仓库中的 Burgers 四子域示例体现了这种结构：不同子域有独立网络，损失中同时包含子域数据项、PDE residual、界面 flux residual，以及两侧解接近平均值的项。代码中还使用 locally adaptive activation functions，让每个子域网络可以通过可学习斜率调节激活函数形状，加速局部收敛。

##### 与 PINN、XPINN 的区别

| 方法 | 域划分 | 界面约束 | 适用重点 | 主要优势 |
|------|--------|----------|----------|----------|
| PINN | 无，全局单网络 | 无显式界面 | 一般 PDE 正/反问题 | 实现简单 |
| cPINN | 通常空间域分解 | 通量连续 + 平均解约束 | 非线性守恒律 | 强化守恒、局部容量可调、并行友好 |
| XPINN | 空间-时间广义域分解 | 解连续、残差等广义界面约束 | 更一般 PDE 和复杂时空域 | 分解更灵活 |

cPINN 比 PINN 更像传统 finite-volume / domain-decomposition 思想和 PINN 的结合：每个子域内部用神经网络近似连续解，界面上用守恒通量把局部解耦合起来。相对 XPINN，cPINN 的约束更聚焦于守恒律通量，因此在双曲/粘性守恒律问题中更自然。

##### 反问题中的用法

对于含未知参数 \(\lambda\) 的守恒律：

$$
u_t + \nabla\cdot \mathbf{F}(u,\nabla u;\lambda)=0,
$$

cPINN 可把 \(\lambda\) 作为可学习变量，与所有子域网络参数一起优化。界面通量项会同时约束 \(\lambda\) 在不同子域上的一致性，降低局部网络只靠拟合数据而产生非物理参数的风险。实际使用时，若不同子域观测稀疏程度差异很大，仍需要调节数据项、残差项和界面项权重。

##### 实用限制

cPINN 的效果依赖子域划分。如果界面正好穿过强不连续、冲击或观测稀疏区域，通量约束可能变得难优化；如果划分太细，界面项数量会增加，通信和权重调节成本也会上升。另一个限制是它主要为守恒律设计，通量形式不清晰的 PDE 需要重新设计界面条件。最后，多个局部网络提升了表达能力，但也增加了超参数搜索空间；实际训练中需要监控各子域损失和界面损失，避免某个子域或界面成为误差瓶颈。

#### 🧪 练习题

```yaml
question: "cPINN 中界面通量连续项的主要作用是什么？"
options:
  - "减少网络参数量，使所有子域共享同一组权重"
  - "保证相邻子域在公共界面上的物理通量一致，避免非物理守恒量泄漏"
  - "把 PDE 残差从强形式改写为弱形式积分"
  - "只用于可视化子域边界，不参与训练"
answer: 1
explain: "cPINN 的 conservative 特性来自界面通量约束；它让相邻子域的局部 PINN 解在守恒律意义下耦合，而不是训练后简单拼接。"
```
