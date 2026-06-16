### SIMPLE-PINN — SIMPLE算法物理信息神经网络 (SIMPLE algorithm based PINN)

```yaml
id: simple_pinn
name: SIMPLE-PINN
full_name: SIMPLE算法物理信息神经网络 (SIMPLE algorithm based PINN)
year: '2026'
org: ResearchGate
paper_url: https://www.researchgate.net/publication/385794553
category: pinn_family
parent: pinn
motivation: 引入CFD压力修正逻辑
```

#### 📝 一句话总结

SIMPLE-PINN 将 CFD 中 SIMPLE 算法的压力-速度修正思想转化为 PINN 的额外残差修正损失，使网络在训练时持续强化不可压缩 Navier-Stokes 方程中的速度-压力耦合，从而改善高 Reynolds 数、长时间涡脱落和复杂几何流动中的收敛稳定性。

#### 🎯 核心要点

- **压力-速度修正损失**：从 SIMPLE 的压力修正、速度修正关系推导 \(RC_p, RC_u, RC_v\)，加入 PINN 总损失
- **不可压缩 N-S 主任务**：网络预测 \([u_\theta(x,y,t),v_\theta(x,y,t),p_\theta(x,y,t)]\)，同时约束质量守恒和动量守恒
- **简化 FVM 残差**：在规则流体内部点使用有限体积模板计算 PDE 残差，提高对局部通量平衡的表达
- **AD + FVM 混合策略**：靠近不规则边界时改用自动微分残差，避免 FVM 邻点落入固体区域造成 stencil 失效
- **二阶外推避免未来值不可用**：训练中用 \(q^{n+1}\approx 2q^n-q^{n-1}\) 估计修正损失所需的下一步量
- **频率退火映射与分支 MLP**：输入 \((t,x,y)\) 先映射到高维频率特征，再进入共享层与变量专属输出层
- **强非线性基准**：论文报告了高 Re lid-driven cavity、wavy channel、NACA0012 翼型、多方柱、圆柱绕流和 Rayleigh-Taylor 多物理问题
- **来源限制**：任务给出的 ResearchGate 链接实际解析到一篇制裁法文章；可访问论文为 arXiv:2603.24013

#### 🔬 深入细节

##### 图示与可访问来源

![SIMPLE-PINN 框架图](https://arxiv.org/html/2603.24013v1/pictures/fig1.png)
*图：论文 Figure 1，展示 SIMPLE-PINN 框架、高 Reynolds 数方腔流、圆柱绕流长时间预测和多物理耦合示例。*

![复杂几何中的 FVM 与 AD 混合策略](https://arxiv.org/html/2603.24013v1/pictures/FVM_AD.png)
*图：论文 Figure 3。内部规则点使用简化 FVM 残差，靠近任意形状固体边界的点使用 AD 残差，边界点单独施加软约束。*

可访问来源说明：真实论文条目为 `https://arxiv.org/abs/2603.24013`，HTML 全文为 `https://arxiv.org/html/2603.24013v1`，题名为 *Bridging Computational Fluid Dynamics Algorithm and Physics-Informed Learning: SIMPLE-PINN for Incompressible Navier-Stokes Equations*。任务中的 ResearchGate URL `385794553` 与该论文不匹配，因此本文按可访问 arXiv 论文解读。

##### 算法伪代码

```python
# SIMPLE-PINN 训练逻辑简化版
initialize network u_theta, v_theta, p_theta
cache previous predictions q_prev = None

for step in range(max_steps):
    # 1. 采样内部点、边界点和复杂几何附近点
    points_fvm, points_ad, points_bc = sample_domain()

    # 2. 规则内部点：用简化 FVM 模板计算连续性和动量残差
    Res_c, Res_u, Res_v = finite_volume_residual(
        network, points_fvm, neighbors=["E", "W", "N", "S"]
    )

    # 3. 不规则边界邻域：改用自动微分 PDE 残差
    Res_ad = autodiff_navier_stokes_residual(network, points_ad)

    # 4. SIMPLE 启发的压力/速度修正
    q_now = network(points_fvm)
    q_next = 2 * q_now - q_prev if q_prev is not None else q_now
    R_p, R_u, R_v = simple_correction_terms(network, points_fvm)
    RC_p = mean_abs(q_next.p - q_now.p - alpha_p * R_p)
    RC_u = mean_abs(q_next.u - q_now.u - alpha_u * R_u)
    RC_v = mean_abs(q_next.v - q_now.v - alpha_v * R_v)

    # 5. 总损失
    loss = W_pde * (Res_c + Res_u + Res_v + Res_ad) \
           + W_bc * boundary_loss(network, points_bc) \
           + W_rc * (RC_p + RC_u + RC_v)
    update_network_with_adam(loss)
    q_prev = stop_gradient(q_now)
```

##### 标准 PINN 在流体问题中的痛点

二维不可压缩 Navier-Stokes 方程写作

$$
\frac{\partial u}{\partial x}+\frac{\partial v}{\partial y}=0,
$$

$$
\frac{\partial u}{\partial t}
+\frac{\partial(uu)}{\partial x}
+\frac{\partial(vu)}{\partial y}
=
\frac{1}{Re}\left(
\frac{\partial^2u}{\partial x^2}
+\frac{\partial^2u}{\partial y^2}
\right)
-\frac{\partial p}{\partial x},
$$

$$
\frac{\partial v}{\partial t}
+\frac{\partial(uv)}{\partial x}
+\frac{\partial(vv)}{\partial y}
=
\frac{1}{Re}\left(
\frac{\partial^2v}{\partial x^2}
+\frac{\partial^2v}{\partial y^2}
\right)
-\frac{\partial p}{\partial y}.
$$

普通 PINN 会把连续性残差、动量残差、边界条件和初值条件加权求和：

$$
\mathcal{L}
=
W_{\mathrm{PDE}}\mathcal{L}_{\mathrm{PDE}}
+W_{\mathrm{IC}}\mathcal{L}_{\mathrm{IC}}
+W_{\mathrm{BC}}\mathcal{L}_{\mathrm{BC}}.
$$

问题在于速度和压力之间没有像 CFD 压力修正算法那样的显式迭代耦合。高 \(Re\) 或长时间非定常流中，网络可能把动量残差和连续性残差分别压低一点，但速度场仍然存在局部散度误差，压力场也不能稳定地驱动速度修正。

##### SIMPLE 思想如何变成 PINN loss

经典 SIMPLE 算法通过压力修正 \(p'\) 迭代修正速度，使离散连续性方程逐步满足。SIMPLE-PINN 不直接运行 CFD 线性求解器，而是把这种修正关系改写成可微的损失项。论文将修正写成松弛形式：

$$
p_P^{n+1}=p_P^n+\alpha_p R_p,
\quad
u_P^{n+1}=u_P^n+\alpha_u R_u,
\quad
v_P^{n+1}=v_P^n+\alpha_v R_v.
$$

其中 \(R_p,R_u,R_v\) 来自离散动量残差、连续性残差和相邻控制体压力/速度项；\(\alpha_p,\alpha_u,\alpha_v\) 是松弛因子，用来避免修正过大导致训练震荡。

对应的残差修正损失为

$$
L_{rc,p}
=
\frac{1}{N_{rc}}
\left\|
p_P^{n+1}-p_P^n-\alpha_pR_p
\right\|_{L^1(\Omega\times(0,T])},
$$

$$
L_{rc,u}
=
\frac{1}{N_{rc}}
\left\|
u_P^{n+1}-u_P^n-\alpha_uR_u
\right\|_{L^1(\Omega\times(0,T])},
$$

$$
L_{rc,v}
=
\frac{1}{N_{rc}}
\left\|
v_P^{n+1}-v_P^n-\alpha_vR_v
\right\|_{L^1(\Omega\times(0,T])}.
$$

训练时 \(n+1\) 的值不能直接访问，论文用二阶外推估计：

$$
p_P^{n+1}\approx 2p_P^n-p_P^{n-1},
\quad
u^{n+1}\approx 2u^n-u^{n-1},
\quad
v^{n+1}\approx 2v^n-v^{n-1}.
$$

所以最终加入训练的修正项等价于要求“本轮预测相对上一轮预测的变化”接近 SIMPLE 推导出的物理修正方向。

> 💡 关键：这不是把 SIMPLE 算法外接在 PINN 后处理，而是把 SIMPLE 的压力-速度耦合方向变成反向传播中的损失梯度。

##### 简化 FVM 与 AD 混合残差

SIMPLE-PINN 的 PDE 残差不是只靠自动微分。对规则内部点，它使用控制体周围 E/W/N/S 邻点构造简化有限体积残差，例如连续性残差可理解为控制体表面的通量不平衡：

$$
Res_c
=
\frac{1}{N_{\mathrm{PDE}}}
\left\|
u_e-u_w+v_n-v_s
\right\|_{L^2}.
$$

动量残差则包含中心点、邻点和边界/压力项：

$$
Res_u
=
\frac{1}{N_{\mathrm{PDE}}}
\left\|
\left(\frac{\Delta x\Delta y}{\delta t}+a_P\right)u_P^n
+\sum a_{NB}u_{NB}^n
+\sum a_{nb}^n u_{nb}^n
+b_{P,u}^n
\right\|_{L^2},
$$

\(Res_v\) 对 \(v\) 同理。

在复杂几何附近，如果某个内部点的四邻点落入固体区域，FVM stencil 就失效。论文因此把点分为三类：普通流体内部点用简化 FVM，靠近固体边界的红色点用 AD 残差，边界点施加边界损失。这种混合策略保留了 FVM 的局部守恒结构，又避免了复杂几何下生成高质量网格的负担。

##### 总损失结构

SIMPLE-PINN 的训练目标可以概括为

$$
\mathcal{L}_{\mathrm{SIMPLE}}
=
\mathcal{L}_{\mathrm{BC}}
+\mathcal{L}_{\mathrm{IC}}
+W_{\mathrm{PDE}}
\left(Res_c+Res_u+Res_v+Res_{\mathrm{AD}}\right)
+W_{\mathrm{RC}}
\left(RC_p+RC_u+RC_v\right).
$$

其中 \(RC_p,RC_u,RC_v\) 是 SIMPLE 压力-速度修正项，\(Res_{\mathrm{AD}}\) 只在复杂几何附近补充。与只堆 PDE residual 的 PINN 相比，这个 loss 同时约束“方程是否成立”和“速度压力应该如何一起被修正”。

##### 网络结构与训练设置

论文使用 MLP 作为主干。输入层先用 frequency annealing mapping 将 \((t,x,y)\) 投影到高维频率空间，以提高对边界层、涡结构和高频扰动的表达能力。随后是共享隐藏层，再接变量专属分支输出 \(u,v,p\)；Rayleigh-Taylor 问题额外输出温度 \(T\)。训练使用 Adam 和 warmup cosine decay 学习率策略。

论文报告的代表性结果包括：在无数据监督条件下求解 \(Re=20000\) 的 lid-driven cavity flow，用 448 秒得到结果；圆柱绕流可预测 \(t=0\) 到 \(100\) 的涡脱落长期演化。这里的重点不是替代所有 CFD 求解器，而是把 CFD 的数值算法知识嵌入神经网络训练，使 PINN 在强非线性流动上更像一个带数值先验的神经求解器。

#### 🧪 练习题

```yaml
question: "SIMPLE-PINN 相比普通 PINN 增加 RC_p、RC_u、RC_v 的主要目的是什么？"
options:
  - "减少网络输出变量，只保留压力"
  - "把 SIMPLE 的压力-速度修正关系转化为训练损失，强化不可压缩流中的耦合约束"
  - "完全取消 Navier-Stokes 方程残差"
  - "只用于可视化，不参与反向传播"
answer: 1
explain: "RC_p、RC_u、RC_v 来自 SIMPLE 修正关系，作为额外 loss 引导速度和压力按满足连续性的方向共同更新，从而改善训练稳定性和收敛速度。"
```
