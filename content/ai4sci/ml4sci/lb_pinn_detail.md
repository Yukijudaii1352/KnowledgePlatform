### lbPINN — 损失平衡物理信息神经网络 (Loss-Balanced PINN)

```yaml
id: lb_pinn
name: lbPINN
full_name: 损失平衡物理信息神经网络 (Loss-Balanced PINN)
year: '2021'
org: ETH Zurich
paper_url: https://arxiv.org/abs/2104.06120
category: pinn_family
parent: sa_pinn
motivation: 通过似然估计平衡多目标损失
```

#### 📝 一句话总结

lbPINN 将 PINN 的 PDE、边界、初值和观测数据损失解释为带噪声的高斯似然项，通过联合学习每个损失项的噪声尺度 \(\varepsilon_i\) 自动决定权重，解决手工调参难以平衡多目标物理损失的问题。

#### 🎯 核心要点

- **来源修正**：任务 YAML 中的 `2104.06120` 指向无关量子代数论文；本文方法级解读基于可访问的 lbPINN 论文 `arXiv:2104.06217` 及 ar5iv HTML
- **概率化损失权重**：为每个损失项建立高斯观测模型，噪声尺度 \(\varepsilon_i\) 同时承担不确定性估计和损失权重的角色
- **最大似然推导**：负对数似然给出 \(\frac{1}{2\varepsilon_i^2}\mathcal{L}_i+\log\varepsilon_i\)，避免权重无限变小或变大
- **联合优化**：网络参数 \(\theta\) 和噪声集合 \(\varepsilon=\{\varepsilon_f,\varepsilon_b,\varepsilon_i,\varepsilon_d\}\) 在训练中同步更新
- **面向不可压 Navier-Stokes**：实验覆盖二维稳态 Kovasznay 流、二维非定常圆柱绕流、三维非定常 Beltrami 流
- **鲁棒性检验**：论文比较不同初始噪声配置，发现最终噪声和权重会收敛到相近范围，说明方法对初始化不敏感
- **与固定权重 PINN 的区别**：固定权重需要人工搜索，lbPINN 把权重选择变成可学习的统计参数估计问题

#### 🔬 深入细节

##### 核心架构示意

![lbPINN 自适应损失平衡示意图](https://ar5iv.labs.arxiv.org/html/2104.06217/assets/figure/lbPINN.jpg)
*图：lbPINN 在普通 PINN 的 PDE/边界/初值/数据损失之上引入噪声参数 \(\varepsilon_i\)，用似然目标自适应调节各项权重。*

> 来源说明：任务提供的 `https://arxiv.org/abs/2104.06120` 与 lbPINN 不匹配；可访问论文来源为 `https://arxiv.org/abs/2104.06217`，图示来自其 ar5iv HTML 页面。

##### 算法伪代码

```python
# lbPINN 自适应似然损失训练伪代码
# 输入: PDE/边界/初值/数据采样点, PINN 网络 u_theta, 初始噪声 eps_i > 0
# 输出: 网络参数 theta 与每个损失项的自适应权重

theta = initialize_network()
log_eps = initialize_log_noise(["pde", "bc", "ic", "data"])

for step in range(num_steps):
    # 1. 标准 PINN 多目标损失
    L_pde = mean_square(pde_residual(u_theta, collocation_points))
    L_bc = mean_square(boundary_residual(u_theta, boundary_points))
    L_ic = mean_square(initial_residual(u_theta, initial_points))
    L_data = mean_square(u_theta(data_points) - observations)

    # 2. 高斯负对数似然形式
    eps = exp(log_eps)                         # 保证 eps_i > 0
    losses = [L_pde, L_bc, L_ic, L_data]
    total = 0.0
    for i, Li in enumerate(losses):
        total += Li / (2 * eps[i] ** 2) + log_eps[i]

    # 3. 同步更新网络与噪声参数
    total.backward()
    adam.step([theta, log_eps])

    # 4. 可解释权重: 噪声越小, 惩罚越强
    weights = [1 / (2 * e ** 2) for e in eps]
```

##### 动机与背景

普通 PINN 的训练目标通常是多个损失项的加权和：

$$
\mathcal{L}(\theta)=
\omega_f\mathcal{L}_f+
\omega_b\mathcal{L}_b+
\omega_i\mathcal{L}_i+
\omega_d\mathcal{L}_d
$$

其中 \(\mathcal{L}_f\) 是 PDE 残差，\(\mathcal{L}_b\) 是边界条件，\(\mathcal{L}_i\) 是初值条件，\(\mathcal{L}_d\) 是观测数据误差。问题在于这些损失项的量纲、数值范围和收敛速度不同，固定权重会让训练偏向某一类约束；例如 PDE 残差过大时可能牺牲边界条件，边界权重过大时又会降低域内物理解的准确性。

lbPINN 的关键变化是把“权重调参”改写成“噪声估计”。假设某个约束项对应的观测满足高斯分布：

$$
p(y\mid \hat{u}(x,t;\theta))=
\mathcal{N}(\hat{u}(x,t;\theta),\varepsilon^2)
$$

对该似然取负对数并忽略常数项，可得到：

$$
-\log p(y\mid \hat{u}) \propto
\frac{1}{2\varepsilon^2}\left\|y-\hat{u}(x,t;\theta)\right\|^2+\log\varepsilon
$$

推广到 PINN 的多个损失项：

$$
\mathcal{L}_{lb}(\theta,\varepsilon)=
\sum_{k}
\left(
\frac{1}{2\varepsilon_k^2}\mathcal{L}_k(\theta)+\log\varepsilon_k
\right)
$$

这条公式同时完成两件事：\(\frac{1}{2\varepsilon_k^2}\) 是第 \(k\) 个损失的有效权重；\(\log\varepsilon_k\) 是正则项，防止模型通过把 \(\varepsilon_k\) 任意放大来忽略该约束。

##### 方法机制

如果某个损失项当前很难优化，模型可以通过增大 \(\varepsilon_k\) 暂时降低它对总梯度的支配性；如果某个约束更可靠或需要更强约束，\(\varepsilon_k\) 会变小，对应权重增大。论文用这种机制解释为同方差不确定性建模：不同物理目标的噪声尺度不同，训练过程应该让模型自己学习这些尺度。

在 Navier-Stokes 场景中，网络输出速度和压力，自动微分构造连续性方程与动量方程残差。以简化符号表示，不可压缩约束可写为：

$$
\nabla\cdot \mathbf{u}=0,\qquad
\partial_t\mathbf{u}+(\mathbf{u}\cdot\nabla)\mathbf{u}
+\nabla p-\frac{1}{Re}\Delta\mathbf{u}=0
$$

对应的 PDE 残差、边界约束、初值约束、数据拟合项分别进入 \(\mathcal{L}_{lb}\)。训练时并不需要预先设定 \(\omega_f,\omega_b,\omega_i,\omega_d\)，而是学习 \(\varepsilon_f,\varepsilon_b,\varepsilon_i,\varepsilon_d\)。

> 💡 关键：lbPINN 并不是改变 PINN 的网络结构，而是改变多目标损失的统计解释；任何已有 PINN 只要有多个损失项，都可以替换为这种似然平衡形式。

##### 与传统 PINN 的区别

固定权重 PINN 的难点是权重搜索成本高，且最优权重随问题、采样点、训练阶段变化。lbPINN 把权重设为动态变量，且用 \(\log\varepsilon_k\) 形成内置约束，因此比简单的可训练权重更稳定。与 SA-PINN 的点级注意力不同，lbPINN 更偏向“损失项级别”的全局平衡，适合处理 PDE 残差、边界、初值、数据之间的竞争。

实验中，论文报告了 Kovasznay 流、圆柱绕流和 Beltrami 流上的相对误差与收敛曲线，并展示不同初始噪声配置最终会收敛到相似权重范围。方法的局限也很清楚：噪声参数仍依赖梯度优化，理论上不能保证找到全局最优；当损失景观极端病态时，仍需要采样、网络结构或优化器配合。

#### 🧪 练习题

```yaml
question: "lbPINN 中噪声参数 ε_i 变小时，对应损失项会发生什么？"
options:
  - "该损失项权重降低，训练会忽略它"
  - "该损失项权重提高，约束惩罚变强"
  - "网络结构会增加一层隐藏层"
  - "该损失项会从总损失中删除"
answer: 1
explain: "lbPINN 的有效权重为 1/(2ε_i²)，因此 ε_i 越小，该项在总损失中的惩罚越强；log ε_i 项用于防止噪声尺度退化。"
```
