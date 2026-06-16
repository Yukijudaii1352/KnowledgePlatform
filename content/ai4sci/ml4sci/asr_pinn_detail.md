### ASR-PINN — 自适应步长RK物理信息神经网络 (Adaptive step-size Runge-Kutta PINN)

```yaml
id: asr_pinn
name: ASR-PINN
full_name: 自适应步长RK物理信息神经网络 (Adaptive step-size Runge-Kutta PINN)
year: '2026'
org: 河海大学
paper_url: https://www.sciencedirect.com/science/article/pii/S0022169426002246
category: pinn_family
parent: pinn
motivation: 自适应步长处理反应输运问题
```

#### 📝 一句话总结

ASR-PINN 面向多组分反应性溶质输运，将自适应步长 Runge-Kutta 时间推进嵌入 PINN 训练，用局部截断误差控制时间步长，从而在反应刚性、浓度前沿和多物种耦合条件下提高稳定性与精度。

#### 🎯 核心要点

- **来源状态**：公开可访问题录显示论文发表于 Journal of Hydrology 669:135127，DOI 为 `10.1016/j.jhydrol.2026.135127`；ScienceDirect 正文和作者分享链接当前不可访问，ResearchGate 也标注无全文
- **问题对象**：多组分反应性溶质输运，未知量是多个浓度场 \(C_1,\dots,C_m\)，同时受对流、弥散/扩散和反应网络控制
- **离散时间 PINN**：不是只在连续时空中随机采样残差，而是在相邻时间层之间加入 Runge-Kutta 阶段约束
- **自适应步长**：根据 RK 嵌入对或 step-doubling 的局部误差估计调整 \(\Delta t\)，反应剧烈或浓度前沿陡峭时缩小步长，平滑阶段放大步长
- **多物种耦合**：网络输出向量 \(\mathbf{C}_\theta=(C_{1,\theta},\dots,C_{m,\theta})\)，反应项 \(R_i(\mathbf{C};k)\) 在各物种残差之间共享，避免逐物种独立拟合破坏质量转化关系
- **损失构成**：初始/边界条件损失、观测数据损失、PDE 残差损失、RK 时间推进一致性损失共同训练
- **适用场景**：地下水污染物迁移、串联/分支反应链、变量参数输运、高 Péclet 数下易出现数值振荡或前沿误差的问题
- **局限说明**：由于全文不可访问，以下公式和流程是基于题名、题录参考文献、PINN 离散时间模型和自适应 RK 数值方法的机制级重构；具体网络结构与实验数值需以正式论文为准

#### 🔬 深入细节

##### 可访问来源与方法流程图

论文图当前无法公开访问；可核验来源包括 DOI 题录与 ResearchGate 题录：

![ASR-PINN DOI 题录入口](https://api.crossref.org/works/10.1016/j.jhydrol.2026.135127/agency)
*图：ASR-PINN 的 DOI/Crossref 题录入口用于核验论文身份；由于论文图像当前不可公开直连，下方文字流程图复现其自适应 Runge-Kutta PINN 训练机制。*

- DOI: https://doi.org/10.1016/j.jhydrol.2026.135127
- ResearchGate: https://www.researchgate.net/publication/400792461_ASR-PINN_Adaptive_step-size_runge-kutta_physics-informed_neural_network_for_multi-component_reactive_solute_transport

```text
多组分浓度 C(t_n, x)
        │
        ▼
RK 阶段预测 C^(s) = C^n + h Σ a_sq F(C^(q))
        │
        ├── 高阶更新 C_high^(n+1)
        ├── 低阶更新 C_low^(n+1)
        ▼
局部误差 e = ||C_high - C_low||
        │
        ├── e <= tol: 接受步长，加入 RK/PDE 损失，推进 t_{n+1}
        └── e >  tol: 拒绝步长，缩小 h 重新计算
```

##### 算法伪代码

```python
# ASR-PINN 机制级伪代码
# 输入: 多物种反应输运算子 F(C), 初始/边界/观测数据, 容差 tol
# 输出: 浓度场网络 C_theta(t, x)

theta = init_multi_output_network(num_species=m)
t = t0
h = h_init

while t < T:
    x_batch = sample_spatial_points()

    # 当前时间层网络预测
    Cn = C_theta(theta, t, x_batch)

    # 嵌入式 RK 阶段，b_high/b_low 构成两个不同阶数的更新
    stages = []
    for s in range(num_stages):
        Cs = Cn + h * sum(a[s][q] * F(stages[q], t + c[q] * h, x_batch)
                          for q in range(s))
        stages.append(Cs)

    C_high = Cn + h * sum(b_high[q] * F(stages[q], t + c[q] * h, x_batch)
                          for q in range(num_stages))
    C_low = Cn + h * sum(b_low[q] * F(stages[q], t + c[q] * h, x_batch)
                         for q in range(num_stages))

    error = normalized_norm(C_high - C_low, atol, rtol)

    if error <= 1.0:
        C_next_net = C_theta(theta, t + h, x_batch)
        loss_rk = mean_square(C_next_net - C_high)
        loss_pde = mean_square(transport_reaction_residual(theta, t, x_batch))
        loss_bc_ic = boundary_initial_loss(theta)
        loss_obs = observation_loss(theta)
        theta = optimizer_step(theta, loss_rk + loss_pde + loss_bc_ic + loss_obs)
        t = t + h

    h = safety * h * error ** (-1.0 / (order + 1))
```

##### 反应输运方程

多组分反应性溶质输运常可写成向量 PDE：

$$\frac{\partial C_i}{\partial t}
+ \nabla\cdot(\mathbf{v} C_i)
- \nabla\cdot(\mathbf{D}_i\nabla C_i)
- R_i(\mathbf{C};\mathbf{k})=0,\quad i=1,\dots,m$$

其中 \(C_i\) 是第 \(i\) 个组分浓度，\(\mathbf{v}\) 是地下水流速，\(\mathbf{D}_i\) 是弥散/扩散张量，\(R_i\) 是由反应网络给出的生成/消耗项。对于串联降解链，\(R_i\) 会同时依赖上游物种的衰减和本物种的消耗；对于分支反应，多个 \(R_i\) 还会共享同一前驱物种。

PINN 用多输出网络逼近：

$$\mathbf{C}_\theta(t,x)=
\left[C_{1,\theta}(t,x),\dots,C_{m,\theta}(t,x)\right]$$

并构造每个物种的残差：

$$r_i(t,x;\theta)=
\frac{\partial C_{i,\theta}}{\partial t}
+ \nabla\cdot(\mathbf{v} C_{i,\theta})
- \nabla\cdot(\mathbf{D}_i\nabla C_{i,\theta})
- R_i(\mathbf{C}_\theta;\mathbf{k})$$

总的连续物理残差为：

$$\mathcal{L}_{pde}=
\frac{1}{mN_f}\sum_{i=1}^{m}\sum_{j=1}^{N_f}
|r_i(t_j,x_j;\theta)|^2$$

##### 自适应 RK 约束

ASR-PINN 的关键是把时间推进写成 RK 一致性约束。设 \(\mathbf{F}(\mathbf{C},t,x)\) 表示反应输运方程右端，\(s\) 阶 RK 阶段满足：

$$\mathbf{C}^{(q)}=\mathbf{C}^{n}
+h_n\sum_{j=1}^{s}a_{qj}\mathbf{F}(\mathbf{C}^{(j)},t_n+c_jh_n,x)$$

高阶和低阶嵌入更新为：

$$\mathbf{C}_{high}^{n+1}=\mathbf{C}^{n}
+h_n\sum_{q=1}^{s}b_q\mathbf{F}(\mathbf{C}^{(q)},t_n+c_qh_n,x)$$

$$\mathbf{C}_{low}^{n+1}=\mathbf{C}^{n}
+h_n\sum_{q=1}^{s}\hat{b}_q\mathbf{F}(\mathbf{C}^{(q)},t_n+c_qh_n,x)$$

局部误差估计：

$$e_n=
\left\|
\frac{\mathbf{C}_{high}^{n+1}-\mathbf{C}_{low}^{n+1}}
{\mathrm{atol}+\mathrm{rtol}\max(|\mathbf{C}^{n}|,|\mathbf{C}_{high}^{n+1}|)}
\right\|$$

步长更新：

$$h_{n+1}=\eta h_n e_n^{-1/(p+1)}$$

其中 \(\eta\in(0,1)\) 是安全因子，\(p\) 是低阶方法阶数。若 \(e_n>1\)，当前步长被拒绝并缩小；若 \(e_n\le 1\)，接受该步长并把 RK 一致性加入训练损失：

$$\mathcal{L}_{rk}=
\frac{1}{N_x}\sum_{j=1}^{N_x}
\left\|
\mathbf{C}_\theta(t_n+h_n,x_j)-\mathbf{C}_{high}^{n+1}(x_j)
\right\|^2$$

##### 总损失与训练直觉

一个合理的 ASR-PINN 总损失可写为：

$$\mathcal{L}=
\lambda_{pde}\mathcal{L}_{pde}
+\lambda_{rk}\mathcal{L}_{rk}
+\lambda_{ic}\mathcal{L}_{ic}
+\lambda_{bc}\mathcal{L}_{bc}
+\lambda_{obs}\mathcal{L}_{obs}$$

其中：

$$\mathcal{L}_{ic}=\frac{1}{N_0}\sum_j\|\mathbf{C}_\theta(0,x_j)-\mathbf{C}_0(x_j)\|^2$$

$$\mathcal{L}_{bc}=\frac{1}{N_b}\sum_j\|\mathcal{B}[\mathbf{C}_\theta](t_j,x_j)-g_b(t_j,x_j)\|^2$$

自适应 RK 的直觉是：反应输运问题的困难往往集中在少数时间段，例如污染物前沿刚进入观测截面、快速反应消耗、或分支反应导致浓度突变。固定步长 PINN 必须在所有时间段使用同样的时间分辨率；连续时间 PINN 虽然无显式步长，但会把全时域残差混在一起，容易在刚性局部欠拟合。ASR-PINN 用误差控制把训练重点自动放到难时间段。

##### 与标准 PINN 的区别

| 方面 | 标准连续时间 PINN | 固定步长 RK-PINN | ASR-PINN |
|------|------------------|------------------|----------|
| 时间处理 | 随机采样 \((t,x)\) 残差 | 固定 \(\Delta t\) 的 RK 阶段 | 按误差自适应 \(\Delta t_n\) |
| 难点处理 | 依赖采样密度和损失权重 | 依赖人工选步长 | 误差大时自动缩步 |
| 反应刚性 | 容易平均化误差 | 小步稳定但成本高 | 局部小步，全局省步 |
| 多物种耦合 | PDE 残差耦合 | RK 阶段耦合 | RK 阶段 + 误差控制耦合 |

> ⚠️ 注意：由于正式全文不可访问，以上是对 ASR-PINN 题名所指“adaptive step-size Runge-Kutta + PINN”机制的保守重构；具体采用 Dormand-Prince、Bogacki-Shampine、Cash-Karp 还是 step-doubling，需要以论文正文为准。

#### 🧪 练习题

```yaml
question: "ASR-PINN 中自适应步长机制的主要作用是什么？"
options:
  - "减少网络输出的物种数量"
  - "根据局部时间推进误差动态调整步长，以稳定反应输运训练"
  - "用卷积层替代全连接层"
  - "删除 PDE 残差，只拟合观测浓度"
answer: 1
explain: "自适应 RK 通过比较高低阶更新或等价误差估计决定接受、拒绝和调整步长，使反应剧烈或前沿陡峭的时间段获得更细分辨率。"
```
