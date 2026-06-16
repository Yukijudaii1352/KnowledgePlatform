### PI-DeepONet — 物理信息DeepONet (Physics-Informed DeepONet)

```yaml
id: pi_deeponet
name: PI-DeepONet
full_name: 物理信息DeepONet (Physics-Informed DeepONet)
year: '2022'
org: 布朗大学
paper_url: https://link.springer.com/book/10.1007/978-3-031-36644-4
category: pde_solving
parent: deeponet
motivation: 物理信息嵌入算子网络
```

#### 📝 一句话总结

PI-DeepONet 将 PINN 的 PDE 残差约束嵌入 DeepONet 的算子学习框架，使模型不仅学习从输入函数/参数到 PDE 解函数的映射，还通过自动微分让预测解满足控制方程、初边值条件和物理约束。

#### 🎯 核心要点

- **DeepONet 主体**：沿用 branch net 编码输入函数 \(u(x_1),\ldots,u(x_m)\)，trunk net 编码查询坐标 \(y\)，二者点积输出连续解函数 \(G_\theta(u)(y)\)
- **物理信息正则**：在 DeepONet 输出上用自动微分计算空间/时间导数，将 PDE 残差写入损失函数
- **数据需求降低**：可在没有成对输入-输出解数据时训练，只依赖 PDE、初始/边界条件和 collocation points
- **算子层面的 PINN**：普通 PINN 学一个实例的解 \(s_\theta(y)\)，PI-DeepONet 学一族参数化 PDE 的解算子 \(u\mapsto s(u)\)
- **连续输出表示**：trunk net 接收任意查询点，训练后可在不同分辨率或任意坐标上评估预测解
- **代表任务**：反导数算子、扩散-反应系统、Burgers 方程、对流方程和 Eikonal/气动几何问题
- **加速效果**：训练后的算子可一次性服务大量 PDE 实例，论文报告在时间依赖 PDE 上相对传统求解器可达千倍级推理加速

#### 🔬 深入细节

##### 可访问来源与核心示意图

任务给出的 Springer 链接是书籍页面，并不是 PI-DeepONet 的主要论文页面；本文方法解读基于同名论文的开放版本 https://arxiv.org/abs/2103.10974、作者代码库 https://github.com/PredictiveIntelligenceLab/Physics-informed-DeepONets，以及公开解读页中的论文 Figure 1 图示。

![PI-DeepONet 架构示意](https://transferlab.ai/pills/2023/physics-informed-deeponet/pideeponet.svg)
*图：DeepONet 的 branch/trunk 结构输出可微解函数，再通过 PDE、边界条件和初始条件残差训练成 physics-informed DeepONet。*

![PI-DeepONet Burgers 示例](https://transferlab.ai/pills/2023/physics-informed-deeponet/burgers.png)
*图：Burgers 方程示例展示预测解、误差以及批量求解时相对传统谱方法的推理耗时。*

##### 算法伪代码

```python
# PI-DeepONet 训练伪代码
for step in range(num_steps):
    # 1. 采样一批输入函数/参数，例如初始条件、源项或几何参数
    u_batch = sample_input_functions()
    sensor_values = evaluate_on_sensors(u_batch, x_sensors)

    # 2. 在边界/初始条件点和域内 collocation points 上查询模型
    y_data, target_data = sample_boundary_or_initial_points(u_batch)
    y_res = sample_collocation_points(u_batch)

    # 3. DeepONet 前向：branch 编码输入函数，trunk 编码查询坐标
    s_data = deeponet(sensor_values, y_data)  # G_theta(u)(y)
    s_res = deeponet(sensor_values, y_res)

    # 4. 自动微分构造 PDE 残差
    derivatives = autodiff(s_res, y_res)
    residual = pde_operator(u_batch, s_res, derivatives)

    # 5. 联合优化观测/边界项和物理残差项
    loss_operator = mean((s_data - target_data) ** 2)
    loss_physics = mean(residual ** 2)
    loss = loss_operator + lambda_phys * loss_physics

    optimizer.step(loss)
```

##### DeepONet 的算子表示

PI-DeepONet 先继承 DeepONet 对非线性算子的表示方式。设输入函数 \(u\) 在固定传感器点 \(\{x_i\}_{i=1}^m\) 上被观测，branch net 输出 \(q\) 维特征：

$$
\mathbf{b}(u)=
\left[
b_1(u(x_1),\ldots,u(x_m)),\ldots,b_q(u(x_1),\ldots,u(x_m))
\right].
$$

trunk net 对查询坐标 \(y\) 输出：

$$
\mathbf{t}(y)=
\left[t_1(y),\ldots,t_q(y)\right].
$$

二者通过点积给出目标解函数在 \(y\) 处的值：

$$
G_\theta(u)(y)=
\sum_{k=1}^{q}
b_k(u(x_1),\ldots,u(x_m))\,t_k(y).
$$

这个形式的关键是 \(G_\theta(u)(y)\) 对查询坐标 \(y\) 是连续且可微的。因此只要 trunk net 使用可微激活函数，就可以对输出做自动微分，计算 \(\partial_t G_\theta\)、\(\partial_x G_\theta\)、\(\partial_{xx}G_\theta\) 等 PDE 残差需要的导数。

##### 物理信息损失

对一般参数化 PDE，可写为：

$$
\mathcal{N}(u,s)=0,\qquad s=G(u),
$$

其中 \(u\) 是输入函数、系数、源项、初始条件或几何参数，\(s\) 是对应 PDE 解。普通 DeepONet 只最小化成对监督数据误差：

$$
\mathcal{L}_{operator}(\theta)=
\frac{1}{NP}\sum_{i=1}^{N}\sum_{j=1}^{P}
\left|
G_\theta(u^{(i)})(y_j^{(i)})-
G(u^{(i)})(y_j^{(i)})
\right|^2.
$$

PI-DeepONet 在域内 collocation points 上增加物理残差：

$$
\mathcal{L}_{physics}(\theta)=
\frac{1}{NQ}\sum_{i=1}^{N}\sum_{j=1}^{Q}
\left|
\mathcal{N}\left(u^{(i)},G_\theta(u^{(i)})(y_{r,j}^{(i)})\right)
\right|^2.
$$

总体目标可写成：

$$
\mathcal{L}(\theta)=
\mathcal{L}_{operator}(\theta)
+\lambda_{phys}\mathcal{L}_{physics}(\theta).
$$

当没有内部解标签时，\(\mathcal{L}_{operator}\) 可以只承担初始条件和边界条件监督；域内行为则由 \(\mathcal{L}_{physics}\) 约束。这是 PI-DeepONet 与纯监督 DeepONet 的核心差别：它把“解要满足 PDE”变成训练目标，而不是事后验证指标。

##### 以扩散-反应系统为例

论文中的扩散-反应示例可以抽象为由输入函数 \(u(x)\) 驱动的 PDE。PI-DeepONet 对每个 \(u^{(i)}\) 预测解 \(G_\theta(u^{(i)})(x,t)\)，并用自动微分构造残差：

$$
R_\theta^{(i)}(x,t)=
\frac{\partial G_\theta(u^{(i)})(x,t)}{\partial t}
-D\frac{\partial^2G_\theta(u^{(i)})(x,t)}{\partial x^2}
-k\left[G_\theta(u^{(i)})(x,t)\right]^2.
$$

如果方程右端包含输入源项，则物理损失比较 \(R_\theta^{(i)}(x,t)\) 与 \(u^{(i)}(x)\)；若控制方程写成齐次残差，则直接让 \(R_\theta^{(i)}(x,t)\approx 0\)。直觉上，branch net 负责告诉模型“这次 PDE 实例是什么”，trunk net 负责告诉模型“当前查询哪个时空位置”，物理残差负责排除那些虽然插值看起来合理但不满足方程的解函数。

##### 与 PINN 和 DeepONet 的区别

| 方法 | 学习对象 | 训练信号 | 一次训练后能否泛化到多组输入函数 | 主要瓶颈 |
|------|----------|----------|----------------------------------|----------|
| PINN | 单个 PDE 实例的解函数 \(s_\theta(y)\) | 初边值 + PDE 残差 | 通常不能，需要为新实例重训 | 长时间、多尺度和刚性 PDE 优化困难 |
| DeepONet | 解算子 \(G:u\mapsto s\) | 大量成对输入-输出解数据 | 可以 | 高保真训练数据昂贵，预测不保证物理一致 |
| PI-DeepONet | 物理约束下的解算子 \(G_\theta\) | 初边值/少量标签 + PDE 残差 | 可以 | 残差点规模、导数计算和损失权重会影响训练稳定性 |

> 💡 关键：PI-DeepONet 不是简单把 PINN 和 DeepONet 并排堆叠，而是利用 DeepONet 输出对坐标可微这一性质，在“算子学习”的训练循环中直接加入 PDE 约束。

##### 实践注意点

PI-DeepONet 的收益最大时，通常是同一类 PDE 需要在大量输入函数、边界条件或参数下反复求解。若只求一个固定实例，普通 PINN 或传统数值方法更直接；若已有海量高质量解数据，标准 DeepONet/FNO 可能已经足够。PI-DeepONet 的难点在于残差采样和损失尺度：\(\mathcal{L}_{operator}\) 与 \(\mathcal{L}_{physics}\) 梯度量级差异过大时，模型可能只满足边界但内部残差大，或只压低残差却无法贴合初边值。

#### 🧪 练习题

```yaml
question: "PI-DeepONet 相比普通 DeepONet 的核心变化是什么？"
options:
  - "把 branch net 删除，只保留 trunk net"
  - "用 PDE 残差和初边值条件约束 DeepONet 的可微输出函数"
  - "强制所有输入函数都必须在同一个网格分辨率上输出"
  - "只学习单个 PDE 实例，不再学习解算子"
answer: 1
explain: "PI-DeepONet 保留 DeepONet 的算子表示，但通过自动微分构造 PDE 残差，把物理一致性加入训练损失。"
```
