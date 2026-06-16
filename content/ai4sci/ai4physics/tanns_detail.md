### TANNs — 热力学神经网络 (Thermodynamics-based ANNs)

```yaml
id: tanns
name: TANNs
full_name: 热力学神经网络 (Thermodynamics-based ANNs)
year: '2021'
org: 希腊国立理工
paper_url: https://doi.org/10.1016/j.jmps.2020.104277
category: solid_mechanics
parent: —
motivation: 强制热力学定律模拟粘塑性
```

#### 📝 一句话总结

TANNs 把热力学第一定律和第二定律写进材料点神经网络架构：网络预测自由能与耗散率等标量，再通过自动微分硬连接应力和内变量演化，从而让粘塑性/弹塑性预测在未见加载路径上仍保持热力学一致。

#### 🎯 核心要点

- **面向材料点本构**：针对 strain-rate independent processes，在增量加载下预测应力、内变量、自由能与耗散率
- **两类标量函数驱动**：以 Helmholtz free-energy \(\mathsf{F}\) 和机械耗散率 \(\mathsf{D}\) 为核心输出，其他本构量由它们的导数关系得到
- **自动微分硬连接**：用 reverse-mode autodiff 计算网络输出对输入的导数，将应力、内变量和热力学约束内嵌到网络图中
- **热力学一致性**：第二定律要求 \(\mathsf{D}\ge 0\)，第一定律给出自由能导数与应力/内变量之间的关系
- **比黑箱 ANN 更强泛化**：标准 ANN 可能在训练数据一致时仍产生热力学不一致预测；TANN 因架构受限，在未见增量范围和循环加载中更稳健
- **需要额外标量监督**：相比只监督应力的 ANN，TANN 训练数据通常还需要自由能和耗散率，这些量可从微观力学仿真或部分实验中获得
- **激活函数有特殊要求**：由于训练中会用到输出关于输入的导数，论文强调避免二阶导数消失的激活函数问题

#### 🔬 深入细节

##### 核心示意图

论文 DOI 对应 Journal of the Mechanics and Physics of Solids 147:104277；可访问版本为 arXiv: https://arxiv.org/abs/2005.12183 和 ar5iv HTML: https://ar5iv.labs.arxiv.org/html/2005.12183。下图来自 ar5iv 版 Figure 1(c)，展示 informed neural network 将导数关系放进计算图，而不是只做黑箱输入输出拟合。

![TANN informed neural network 示意图](https://ar5iv.labs.arxiv.org/html/2005.12183/assets/x3.png)
*图：TANN 的 informed neural network 思路。灰色节点是输入，黑色节点是输出，中间通过自动微分建立自由能、耗散率、应力和内变量之间的关系。*

##### 算法伪代码

```python
# TANN 材料点增量本构训练伪代码
def tann_forward(eps_t, delta_eps, zeta_t):
    # 状态输入: 当前应变、应变增量、当前内变量
    I = concat(eps_t, delta_eps, zeta_t)

    # 网络直接预测热力学标量
    F_free = free_energy_net(I)          # Helmholtz free energy
    D_diss = softplus(dissipation_net(I))  # enforce D >= 0

    # 由自动微分得到本构相关导数
    dF_deps = grad(F_free, eps_t)
    dF_dzeta = grad(F_free, zeta_t)
    dD_dzeta_rate = grad(D_diss, delta_eps)

    # 根据热力学关系生成应力和内变量更新
    sigma = stress_relation(dF_deps, D_diss, delta_eps)
    delta_zeta = flow_relation(dF_dzeta, dD_dzeta_rate)
    zeta_next = zeta_t + delta_zeta

    return {
        "F": F_free,
        "D": D_diss,
        "sigma": sigma,
        "zeta_next": zeta_next,
    }

for batch in material_point_paths:
    pred = tann_forward(batch.eps_t, batch.delta_eps, batch.zeta_t)
    loss = (
        mse(pred["sigma"], batch.sigma_target)
        + mse(pred["zeta_next"], batch.zeta_target)
        + mse(pred["F"], batch.free_energy_target)
        + mse(pred["D"], batch.dissipation_target)
    )
    optimizer.step(loss)
```

##### 热力学约束从哪里来

TANN 的出发点是，材料本构不应只是 \((\varepsilon^t,\Delta\varepsilon)\mapsto\Delta\sigma\) 的黑箱映射。热力学第一定律要求能量收支一致，第二定律要求熵产生或机械耗散非负。论文在等温材料点设置中把这些约束转化为网络内部关系。

局部 Clausius-Duhem 不等式可简化为机械耗散非负：

$$
\mathsf{D}\ge 0.
$$

对含内变量 \(\mathcal{Z}\) 的等温过程，Helmholtz 自由能可写成：

$$
\mathsf{F}
=
\widetilde{\mathsf{F}}(\theta,\varepsilon,\mathcal{Z}).
$$

当温度固定时，关键变量是应变 \(\varepsilon\)、内变量 \(\mathcal{Z}\) 以及增量路径。TANN 不让网络直接随意输出所有本构量，而是让网络输出 \(\mathsf{F}\) 和 \(\mathsf{D}\)，并通过它们对输入的导数计算应力与内变量关系。直觉上，\(\mathsf{F}\) 描述“可恢复储能”，\(\mathsf{D}\) 描述“不可逆耗散”；弹性、硬化、软化、塑性流动都必须同时解释这两部分。

在一维增量形式中，可以把网络输入抽象为：

$$
\mathcal{I}=(\varepsilon^t,\Delta\varepsilon,\zeta^t),
$$

其中 \(\zeta\) 表示材料内变量，如塑性应变或硬化变量。网络输出包括：

$$
\mathcal{O}
=
(\Delta\sigma,\Delta\zeta,\mathsf{F},\mathsf{D}).
$$

但 \(\Delta\sigma\) 与 \(\Delta\zeta\) 不是完全独立的普通输出。TANN 通过自动微分建立类似如下的依赖：

$$
\sigma
\sim
\frac{\partial \mathsf{F}}{\partial \varepsilon},
\qquad
\text{thermodynamic force}
\sim
-
\frac{\partial \mathsf{F}}{\partial \zeta}.
$$

具体符号会随 1D/3D、hyper-plastic/hypo-plastic 设置变化，但架构原则不变：应力和内变量演化必须与自由能梯度、耗散率以及耗散不等式一致。

##### 损失函数与训练信号

TANN 的训练目标通常同时监督材料可观测量和热力学标量：

$$
\mathcal{L}
=
w_\sigma\|\sigma_\theta-\sigma\|_2^2
+w_\zeta\|\zeta_\theta-\zeta\|_2^2
+w_F\|\mathsf{F}_\theta-\mathsf{F}\|_2^2
+w_D\|\mathsf{D}_\theta-\mathsf{D}\|_2^2.
$$

其中 \(\mathsf{F}\) 和 \(\mathsf{D}\) 是 TANN 相比普通 ANN 的额外监督代价。论文指出，这些标量在微观力学模拟中较容易获得，在部分实验中也可能通过能量测量间接得到。换来的好处是，网络不需要从应力数据里自行发现热力学定律；定律已经由计算图和导数关系写死。

> ⚠️ 注意：TANN 不是“给 ANN 加一个物理惩罚项”这么简单。它的关键是把自由能和耗散率设置为中间核心量，并让其他输出通过导数生成，因此训练失败往往意味着数据或结构与热力学假设不兼容。

##### 为什么激活函数很重要

因为 TANN 需要对网络输出求导，甚至训练这些导数生成的量，激活函数的二阶导数不能在大范围内消失。若使用 ReLU 这类分段线性函数，二阶导数几乎处处为 0，网络在学习“输出的导数”时会遇到论文所说的 second-order vanishing gradients。

因此 TANN 更偏好 smooth 且二阶导数非零的激活函数或改造激活函数，例如指数型 ELU、带二次项的变体等。这个细节对普通监督 ANN 可能只是优化选择，对 TANN 则直接影响热力学导数链是否可训练。

##### 与标准 ANN 的区别

| 方法 | 直接学习对象 | 热力学一致性 | 所需数据 | 主要风险 |
|------|--------------|--------------|----------|----------|
| 标准 ANN 本构 | 应力增量或下一步状态 | 训练后才检查，未见路径可能破坏 | 主要是应力/状态数据 | 可产生负耗散或能量不一致 |
| PINN 式软约束 | 黑箱输出 + 物理残差惩罚 | 取决于权重与优化质量 | 数据 + 残差点/物理项 | 软惩罚不一定严格满足 |
| TANN | 自由能、耗散率及其导数关系 | 架构层面硬编码 \(\mathsf{D}\ge0\) 和导数关系 | 还需 \(\mathsf{F},\mathsf{D}\) 标量 | 数据源必须能提供热力学标量 |

论文实验覆盖 1D 和 3D 弹塑性，包括运动硬化、软化和循环加载。标准 ANN 在训练分布附近可以拟合应力，但当应变增量超出训练范围或换加载路径时，容易出现热力学不一致；TANN 的归纳偏置更强，因此对未见路径更稳健，也更适合放入有限元增量求解的材料点例程中。

#### 🧪 练习题

```yaml
question: "TANNs 相比普通 ANN 本构模型的核心结构差异是什么？"
options:
  - "TANNs 只使用更深的 MLP，因此能拟合更多数据"
  - "TANNs 直接输出网格位移场，用 PDE 残差训练"
  - "TANNs 以自由能和耗散率为核心，并用自动微分硬连接应力和内变量关系"
  - "TANNs 不需要任何材料实验或仿真数据"
answer: 2
explain: "TANN 的重点是把热力学标量及其导数关系写入网络架构，使输出满足能量和耗散约束，而不是单纯增加网络容量。"
```
