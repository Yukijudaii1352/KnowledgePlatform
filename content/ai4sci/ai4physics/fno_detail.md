### FNO — 傅里叶神经算子 (Fourier Neural Operator)

```yaml
id: fno
name: FNO
full_name: 傅里叶神经算子 (Fourier Neural Operator)
year: '2021'
org: Caltech
paper_url: https://openreview.net/forum?id=c8P9fhUhn9
category: pde_solving
parent: —
motivation: 频率域积分运算实现分辨率无关
```

#### 📝 一句话总结

FNO 将神经算子的全局积分核限制为卷积核，并直接在傅里叶频域学习低频模式上的线性变换，从而用同一组参数学习一族 PDE 的解算子，支持跨网格分辨率推理和 zero-shot super-resolution。

#### 🎯 核心要点

- **算子学习目标**：直接学习从输入函数 \(a(x)\) 到解函数 \(u(x)\) 的映射 \(\mathcal{G}: a \mapsto u\)，而不是为每个 PDE 实例重新优化一个网络
- **Lift-Fourier-Project 架构**：先用局部网络 \(P\) 将输入升维为通道特征 \(v_0(x)\)，堆叠多层 Fourier layer，再用局部网络 \(Q\) 投影回目标物理量
- **傅里叶层核心计算**：每层同时包含频域全局卷积分支 \(\mathcal{F}^{-1}(R_\phi \cdot \mathcal{F}(v))\) 和物理空间局部线性分支 \(Wv\)，二者相加后过非线性激活
- **低频模式截断**：只在前 \(k_{\max}\) 个 Fourier modes 上学习复值权重 \(R_\phi\)，高频直接过滤，计算由 FFT 主导
- **分辨率无关参数**：网络参数定义在连续 Fourier 基上，同一模型可在不同采样网格上训练/推理，论文展示了 Navier-Stokes 的 zero-shot super-resolution
- **代表基准**：Burgers 方程、Darcy flow 和 2D Navier-Stokes；在固定分辨率和跨分辨率设置中均优于 FCN、PCANN、GNO 等学习型求解器
- **数据驱动而非残差驱动**：原始 FNO 主要依赖数值求解器生成的输入-输出函数对训练，不要求显式把 PDE 残差写进损失

#### 🔬 深入细节

##### 可访问来源与核心示意图

任务给出的 OpenReview 链接对应 ICLR 2021 论文；为了嵌入可直接访问的图片，这里使用同论文的 arXiv HTML 版本：https://ar5iv.labs.arxiv.org/html/2010.08895。

![FNO 总体架构与 Fourier layer](https://ar5iv.labs.arxiv.org/html/2010.08895/assets/figs/fourier_full_arch5.png)
*图：上半部分是 FNO 的 lift-Fourier-project 主干；下半部分展示 Fourier layer 中的 FFT、低频模式线性变换、逆 FFT 和局部线性分支。*

![FNO 在 Navier-Stokes 上的 zero-shot super-resolution](https://ar5iv.labs.arxiv.org/html/2010.08895/assets/figs/FourierNN_NV2.png)
*图：FNO 在 Navier-Stokes 涡量序列上用低分辨率数据训练，并在更高分辨率时间/空间网格上推理。*

##### 算法伪代码

```python
# FNO 前向传播伪代码，以规则网格上的 2D 场为例

def spectral_conv(v, R, modes):
    # v: [batch, nx, ny, channels]
    v_hat = rfft2(v)                         # 物理空间 -> Fourier 空间
    out_hat = zeros_like_selected_modes(v_hat)

    # 只学习低频 Fourier modes；R 是复值权重张量
    out_hat[:, :modes_x, :modes_y] = complex_matmul(
        v_hat[:, :modes_x, :modes_y],
        R
    )

    return irfft2(out_hat, spatial_shape=(nx, ny))

def fno_forward(a, grid):
    # 常见实现会把坐标 grid 与输入系数/初值拼接，帮助处理非周期边界
    v = P(concat(a, grid))                    # lift: d_a -> d_v

    for layer in fourier_layers:
        v_freq = spectral_conv(v, layer.R, layer.modes)
        v_local = pointwise_linear(v, layer.W)
        v = gelu(v_freq + v_local)            # 全局频域项 + 局部线性项

    u = Q(v)                                  # project: d_v -> d_u
    return u

for a_i, u_i in dataloader:
    pred = fno_forward(a_i, grid_i)
    loss = relative_l2(pred, u_i)
    optimizer.step(loss)
```

##### 从 PDE 解算到算子学习

传统数值求解器面对参数化 PDE 时，通常对每个新的初值、边界条件或系数字段 \(a\) 重新求解一次：

$$
\mathcal{P}(a, u)=0,\qquad u=\mathcal{G}(a).
$$

FNO 的目标不是学习一个单独的解函数 \(u_\theta(x)\)，而是学习整个解算子：

$$
\mathcal{G}_\theta: a(\cdot)\mapsto u(\cdot).
$$

训练数据是有限组函数对 \(\{(a_i, u_i)\}_{i=1}^N\)，常用经验风险可写为：

$$
\min_\theta
\frac{1}{N}\sum_{i=1}^{N}
\frac{\|\mathcal{G}_\theta(a_i)-u_i\|_2}{\|u_i\|_2}.
$$

这与 PINN 的“给定一个 PDE 实例后优化一个坐标网络”不同。FNO 训练一次后，新输入 \(a_\mathrm{new}\) 只需一次前向传播即可得到整场解，因此适合需要大量重复求解的代理模型、反问题采样和快速设计循环。

##### 神经算子层的数学形式

通用神经算子把隐藏函数 \(v_t(x)\) 迭代更新为：

$$
v_{t+1}(x)
=
\sigma\left(
W v_t(x)
+
(\mathcal{K}_\phi v_t)(x)
\right),
$$

其中 \(Wv_t(x)\) 是点态线性变换，\(\mathcal{K}_\phi\) 是非局部积分算子：

$$
(\mathcal{K}_\phi v)(x)
=
\int_D \kappa_\phi(x,y)v(y)\,dy.
$$

FNO 的关键约束是把核写成平移不变卷积核 \(\kappa_\phi(x-y)\)。根据卷积定理，卷积可以在频域变成逐模式线性乘法：

$$
(\mathcal{K}_\phi v)(x)
=
\mathcal{F}^{-1}
\left(
R_\phi \cdot \mathcal{F}(v)
\right)(x).
$$

实际实现只保留有限个低频模式：

$$
\hat{v}'(k)=
\begin{cases}
R_\phi(k)\hat{v}(k), & |k|\le k_{\max},\\
0, & |k|>k_{\max}.
\end{cases}
$$

直觉上，低频 Fourier modes 捕获解场的大尺度结构，非线性激活和后续层会重新混合模式并恢复部分高频信息。这样既避免在物理空间显式计算全局积分核的 \(O(n^2)\) 代价，又保留了长程相互作用建模能力。

##### 为什么能跨分辨率

CNN、FCN 这类有限维网络通常把输入看成固定大小数组，卷积核参数绑定在训练网格上；分辨率变化时，网络结构或插值策略往往需要调整。FNO 的参数 \(R_\phi(k)\) 绑定在 Fourier modes 上，而 Fourier 基函数可以在任意采样点 \(x\) 上评估。若输入函数在更细网格上采样，只需在该网格上做 FFT、取同样的低频 modes、应用同一组 \(R_\phi\)，再逆变换回物理空间。

> 💡 关键：FNO 的“分辨率无关”不是说训练数据无限精确，而是说模型参数不依赖某个固定网格尺寸；误差仍取决于训练分布、采样质量、模式截断和 PDE 本身的频谱复杂度。

##### Fourier layer 的两个分支为什么都需要

频域卷积分支提供全局感受野，任何位置的输出都能依赖整个输入场。这对椭圆型 PDE、不可压 Navier-Stokes 的压力/涡量耦合等非局部结构很重要。

局部线性分支 \(Wv(x)\) 则承担两类作用。第一，它像残差通道一样保留局部信息，避免所有信息都被低频截断过滤。第二，论文指出它帮助跟踪非周期边界或局部边界效应，使 FNO 不局限于严格周期问题。许多后续实现还会把坐标网格作为输入通道拼接进去，使网络知道点在域内的位置。

##### 与传统谱方法的区别

FNO 使用 FFT，但它不是传统意义上“把 PDE 变到频域后手写求解”。传统谱方法依赖已知 PDE 形式、边界条件和时间推进公式；FNO 则从数据中学习频域乘子 \(R_\phi\)，并通过多层非线性组合近似未知或复杂的解算子。

| 方法 | 学习/求解对象 | 是否每个实例重算 | 网格依赖 | 主要优势 |
|------|---------------|------------------|----------|----------|
| 有限差分/有限元 | 单个 PDE 实例的离散解 | 是 | 强 | 稳定、可解释、精度理论成熟 |
| PINN | 单个实例的连续解函数 | 通常是 | 弱 | 可利用 PDE 残差和少量观测 |
| CNN/FCN 代理模型 | 固定网格上的数组映射 | 否 | 强 | 工程实现简单 |
| FNO | 函数空间到函数空间的解算子 | 否 | 弱 | 全局建模、高效、可跨分辨率 |

##### 训练与推理流程

训练阶段通常先用可信数值求解器生成函数对，例如 Burgers 方程中的初值到末态，Darcy flow 中渗透率系数字段到压力场，Navier-Stokes 中初始涡量到后续涡量序列。模型在离散网格上看到的是数组，但优化目标对应的是函数误差的离散近似。

推理阶段给定新的 \(a(x)\)，FNO 只做一次前向传播。对时间相关问题，可以把时间维作为输出通道/网格维，也可以学习一步或多步演化算子再递推。论文中的 Navier-Stokes 例子强调：即使在较粗分辨率训练，模型也能在更细空间和时间网格上直接评估，表现为 zero-shot super-resolution。

> ⚠️ 注意：FNO 的 FFT 假设数据位于规则网格，因此原始 FNO 对复杂几何和非结构网格不够自然。后续 Geo-FNO、GNO、MeshGraphNets 等方法分别从坐标变换、图积分和网格图建模方向扩展这一限制。

#### 🧪 练习题

```yaml
question: "FNO 中 Fourier layer 的主要设计目的是什么？"
options:
  - "用可学习低频 Fourier 模式近似全局卷积积分算子，并通过 FFT 提高效率"
  - "把 PDE 残差强制为 0，从而不需要任何训练数据"
  - "只保留物理空间中的局部卷积，避免任何频域计算"
  - "为每个新的 PDE 参数重新训练一个坐标 MLP"
answer: 0
explain: "FNO 的核心是把积分核限制为卷积并在 Fourier 空间学习低频线性变换；FFT 让全局算子计算近似达到准线性复杂度。"
```
