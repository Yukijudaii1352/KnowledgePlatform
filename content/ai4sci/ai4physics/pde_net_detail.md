### PDE-Net — 偏微分方程网络 (PDE-Net)

```yaml
id: pde_net
name: PDE-Net
full_name: 偏微分方程网络 (PDE-Net)
year: '2018'
org: 北京大学
paper_url: http://proceedings.mlr.press/v80/long18a.html
category: pde_solving
parent: —
motivation: 卷积矩约束模拟微分算子
```

#### 📝 一句话总结

PDE-Net 提出用受矩约束的卷积滤波器学习空间微分算子，并用点式神经网络学习未知非线性响应 \(F\)，从而同时完成 PDE 系统的时间预测和隐含控制方程发现。

#### 🎯 核心要点

- **目标问题**：从离散观测序列中学习一般形式的二维演化 PDE \(u_t = F(x,y,u,u_x,u_y,u_{xx},u_{xy},u_{yy},\ldots)\)
- **核心结构**：一个 \(\delta t\)-block 对应一次前向 Euler 时间推进，先用卷积得到各阶导数候选，再用共享的点式网络近似非线性响应函数
- **可解释滤波器**：用滤波器的 moment matrix / sum rules 约束卷积核，使指定卷积核近似 \(D_{10},D_{01},D_{20},D_{11},D_{02}\) 等微分算子
- **长时稳定性**：将多个共享参数的 \(\delta t\)-block 堆叠为 PDE-Net，用多步预测损失约束误差累积
- **训练策略**：先用 frozen filters 热启动响应函数，再逐层增加 block 数量训练，并逐步释放滤波器到矩约束集合内学习
- **可发现性**：训练后查看滤波器对应导数项与点式网络/多项式响应，可恢复哪些微分项进入了控制方程
- **实验场景**：在线性变系数 convection-diffusion 方程和带非线性源项的 convection-diffusion 方程上，展示了噪声环境下的预测与方程识别能力

#### 🔬 深入细节

##### 可访问来源与核心示意图

论文正式页面是 PMLR: http://proceedings.mlr.press/v80/long18a.html；图像与公式解读使用可公开访问的 ar5iv HTML 版本: https://ar5iv.labs.arxiv.org/html/1710.09668。

![PDE-Net 单个 delta t block](https://ar5iv.labs.arxiv.org/html/1710.09668/assets/f1.jpg)
*图：一个 \(\delta t\)-block。输入场 \(u\) 经过多个卷积算子 \(D_{ij}\) 得到导数候选，随后由点式网络近似 \(F\)，最后用 Euler 形式得到下一时刻预测。*

![PDE-Net 多步堆叠结构](https://ar5iv.labs.arxiv.org/html/1710.09668/assets/f2.jpg)
*图：PDE-Net 将多个共享参数的 \(\delta t\)-block 串联，用多步误差训练来提高长期预测稳定性。*

##### 算法伪代码

```python
# PDE-Net 训练伪代码
# data[s][j] 表示第 s 条轨迹在第 j 个时间点的场 u_j

initialize_filters_as_frozen_finite_differences()
initialize_pointwise_network_F()

# warm-up: 固定导数滤波器，只训练非线性响应 F
for step in range(warmup_steps):
    u0, u1 = sample_one_step_pairs(data)
    derivs = {key: conv(filter[key], u0) for key in derivative_keys}
    u_pred = conv(avg_filter, u0) + dt * F(x_grid, y_grid, derivs)
    loss = mean_squared_error(u_pred, u1)
    update(F.parameters(), loss)

# layer-wise training: 逐步增加 block 数量
release_filters_with_moment_constraints()
for n_blocks in range(1, max_blocks + 1):
    for step in range(train_steps_per_depth):
        u0, target = sample_n_step_pairs(data, n_blocks)
        u = u0
        for _ in range(n_blocks):
            derivs = {}
            for key in derivative_keys:
                # 每个 filter 在更新后都投影/参数化到指定 moment 约束集合内
                derivs[key] = conv(constrained_filter[key], u)
            response = F(x_grid, y_grid, derivs)
            u = conv(avg_filter, u) + dt * response
        loss = mean_squared_error(u, target)
        update(shared_filter_parameters + F.parameters(), loss)

return constrained_filters, F
```

##### 动机：为什么不是直接做黑盒预测

很多 PDE 发现方法会先固定一组有限差分模板，再对候选导数库做稀疏回归；这类方法的缺点是导数近似和候选库一开始就被写死，噪声或网格误差会直接进入发现过程。另一类 physics-informed 方法通常假设 PDE 的解析形式已知，只学习少数参数。PDE-Net 试图放宽这两个限制：它不预先固定微分算子的离散模板，也不要求非线性响应函数的显式形式完全给定。

论文考虑的基本对象是二维演化 PDE：

$$
u_t(t,x,y) =
F(x,y,u,u_x,u_y,u_{xx},u_{xy},u_{yy},\ldots).
$$

PDE-Net 的关键选择是把一次时间推进写成神经网络层。一个 \(\delta t\)-block 近似前向 Euler 离散：

$$
\tilde{u}_{t+\delta t}
= D_{00}u_t
+ \delta t \cdot
F_\theta(x,y,D_{00}u_t,D_{10}u_t,D_{01}u_t,D_{20}u_t,\ldots).
$$

其中 \(D_{ij}\) 不是手工有限差分，而是带约束的卷积算子；\(D_{00}\) 是平均/平滑算子，用来替代直接 identity，提升数值稳定性；\(F_\theta\) 是对每个空间位置共享参数的点式网络，因此它学习的是局部响应函数，而不是记忆整张图像。

##### 卷积核如何变成微分算子

PDE-Net 最重要的数学设计是 moment matrix。对一个二维卷积核 \(q[k,\ell]\)，定义其 \((i,j)\)-阶矩：

$$
M_{ij}(q)=\sum_{k,\ell} k^i \ell^j q[k,\ell].
$$

如果要让 \(q\) 近似某个微分算子，就对低阶矩施加约束。例如，近似 \(\partial_x\) 的卷积核应让常数项矩为 0，并让一阶 \(x\) 方向矩为非零尺度；近似 \(\partial_{xx}\) 的卷积核则需要一阶矩消失、二阶 \(x\) 方向矩匹配目标尺度。论文将这一点和 wavelet sum rules 联系起来：滤波器的 sum rules 阶数决定它近似微分算子的阶数，total sum rules 决定近似精度。

> 💡 关键：PDE-Net 的滤波器不是任意 CNN 卷积核，而是在“能解释成微分算子”的可行域内学习。这样既保留了数据驱动适配网格与噪声的能力，也使训练后的算子具有物理可读性。

在实现上，滤波器参数可以被拆分为被固定的矩约束部分和可学习的自由部分。固定部分保证“这是 \(u_x\) 或 \(u_{xx}\) 这样的导数近似”，自由部分吸收高阶截断误差、网格误差和噪声影响。

##### 多步训练与损失函数

单个 \(\delta t\)-block 只保证一步预测好，但 PDE 解算最关心长时间滚动时误差是否爆炸。因此 PDE-Net 将同一组参数反复使用 \(n\) 次，并直接优化从 \(u_j\) 到 \(u_{j+n}\) 的误差：

$$
\mathcal{L}(\Theta)
=
\frac{1}{|\mathcal{B}|}
\sum_{(s,j)\in \mathcal{B}}
\left\|
\mathcal{N}_{\Theta}^{(n)}(u^{(s)}_j)
-u^{(s)}_{j+n}
\right\|_2^2.
$$

这里 \(\mathcal{N}_{\Theta}^{(n)}\) 表示共享参数的 \(\delta t\)-block 连续作用 \(n\) 次。共享参数有两层含义：一方面它符合“同一个 PDE 在所有时间步上不变”的物理假设；另一方面它减少参数量，使模型更像一个可迭代的数值格式，而不是普通深层 CNN。

##### 方程发现如何读出来

训练结束后，PDE-Net 产生两类可解释对象：

- 卷积核约束告诉我们每个通道对应哪个微分候选项，例如 \(u_x,u_y,u_{xx},u_{xy}\)
- 点式响应 \(F_\theta\) 告诉我们这些候选项如何组合成 \(u_t\)

如果 \(F_\theta\) 使用多项式或可解释回归器，方程可以更直接地符号化；如果使用小型 MLP，也可以通过对输入导数项的敏感性分析、稀疏化或后处理回归来提取主要项。论文中的线性变系数 convection-diffusion 例子展示了这种读法：网络不仅预测 \(u\) 的未来状态，还能恢复变系数扩散/对流结构。

##### 与传统方法的区别

| 方法 | 微分算子 | 非线性响应 \(F\) | 长时预测 | 可解释性 |
|------|----------|------------------|----------|----------|
| 稀疏回归 PDE 发现 | 固定有限差分模板 | 从预定义字典稀疏选择 | 通常不是训练核心 | 强，但依赖字典 |
| 普通 CNN/ResNet | 黑盒卷积 | 黑盒 | 可训练 | 弱 |
| PINN 类方法 | 由已知 PDE 公式给定 | 形式通常已知 | 通过残差约束 | 学参数为主 |
| PDE-Net | 受矩约束的可学习卷积 | 点式网络/回归器学习 | 多个 block 累积训练 | 导数通道和响应函数均可读 |

PDE-Net 的贡献不只是“用 CNN 预测 PDE”，而是把数值微分、ResNet 式时间推进和方程发现放进同一个可训练架构中。它的局限也来自这里：候选最高导数阶数、网格形式、时间离散方式仍需人为设定；如果真实系统不是局部 PDE，或观测变量不足以闭合动力学，模型可能会给出预测可用但物理解释不可靠的方程。

#### 🧪 练习题

```yaml
question: "PDE-Net 为什么要对卷积滤波器施加 moment matrix / sum rules 约束？"
options:
  - "为了减少卷积层的显存占用，使网络可以堆得更深"
  - "为了让卷积核可解释为特定微分算子的离散近似，同时保留可学习的截断误差修正能力"
  - "为了把非线性响应函数 F 固定成一个已知多项式"
  - "为了避免使用任何时间离散格式"
answer: 1
explain: "moment/sum-rules 约束把卷积核限制在可解释为导数近似的集合内，这是 PDE-Net 能同时预测动力学和识别控制方程的关键。"
```
