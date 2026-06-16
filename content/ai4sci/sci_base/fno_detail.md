### FNO

```yaml
id: fno
name: FNO
full_name: 傅里叶神经算子 (Fourier Neural Operator)
year: '2020'
org: Caltech/NVIDIA
paper_url: https://arxiv.org/abs/2010.08895
category: neural_operator
parent: —
motivation: 傅里叶空间学习PDE算子映射
```

#### 📝 一句话总结

FNO 提出了在傅里叶空间参数化积分核的神经算子，用一次训练直接学习 PDE 参数函数到解函数的算子映射，解决 CNN/PINN 等方法依赖固定网格或单个方程实例的问题。

#### 🎯 核心要点

- **函数到函数的算子学习**：学习 \(\mathcal{G}: a(x) \mapsto u(x)\)，而不是学习固定维度向量映射或为每个 PDE 实例重新求解
- **Lift-Fourier-Project 架构**：输入函数先经 \(P\) 升维到通道空间，再堆叠多个 Fourier layer，最后由 \(Q\) 投影回目标解空间
- **傅里叶层核心计算**：对特征场做 FFT，只在低频模式上学习复值线性变换 \(R\)，截断高频后经 IFFT 回到物理空间
- **全局非局部交互**：频域乘法等价于物理空间卷积，单层即可建模全局依赖，比局部卷积更适合椭圆型、流体等 PDE 解算子
- **分辨率不变性**：参数绑定在 Fourier modes 上，而不是绑定在具体网格点上，可在不同网格分辨率之间共享同一组权重
- **零样本超分辨率**：在 \(64 \times 64 \times 20\) Navier-Stokes 数据上训练后，可直接推理到 \(256 \times 256 \times 80\) 时空网格
- **实验覆盖三类 PDE**：Burgers 方程、Darcy Flow、Navier-Stokes 方程，展示固定分辨率精度、跨分辨率泛化和推理速度优势
- **复杂度来自 FFT**：均匀网格上用 FFT 实现频域变换，使全局卷积接近 \(O(n \log n)\)，显著快于直接积分核计算

#### 🔬 深入细节

##### 架构总览

![FNO 架构与 Fourier layer](https://ar5iv.labs.arxiv.org/html/2010.08895/assets/figs/fourier_full_arch5.png)
*图：FNO 的整体神经算子架构和单个 Fourier layer；图片来自论文 arXiv 源包中的 `figs/fourier_full_arch5.png`。*

FNO 的目标不是求一个固定初值或固定系数下的 PDE 解，而是学习一个解算子。设 \(D\) 为空间域，\(a \in \mathcal{A}(D)\) 是 PDE 的参数函数、初值或系数场，\(u \in \mathcal{U}(D)\) 是对应解，FNO 直接近似：

$$
\mathcal{G}^{\dagger}: \mathcal{A}(D) \to \mathcal{U}(D), \qquad a \mapsto u
$$

这和传统有限差分/有限元的思路不同：传统数值方法每来一个新 \(a\) 都要重新迭代求解；FNO 训练完成后，对新的 \(a\) 只需一次前向传播。因此它更像一个可复用的 PDE surrogate solver。

##### 神经算子层

FNO 继承 neural operator 的迭代形式。输入先被局部网络 \(P\) 升维：

$$
v_0(x) = P(a(x))
$$

然后重复更新 \(v_t \mapsto v_{t+1}\)：

$$
v_{t+1}(x) =
\sigma\left(
Wv_t(x) + \left(\mathcal{K}(\phi)v_t\right)(x)
\right)
$$

其中 \(W\) 是逐点线性变换，负责局部通道混合；\(\mathcal{K}\) 是非局部积分算子，负责跨位置的信息传播；\(\sigma\) 是非线性激活。最后输出由另一个局部网络 \(Q\) 给出：

$$
u(x) = Q(v_T(x))
$$

普通神经算子的瓶颈在于积分核：

$$
\left(\mathcal{K}v_t\right)(x)
= \int_D \kappa(x,y)v_t(y)\,\mathrm{d}y
$$

如果直接计算所有 \(x,y\) 的交互，复杂度高且难以扩展。FNO 的关键改动是令核具有卷积结构 \(\kappa(x,y)=\kappa(x-y)\)，再用卷积定理把积分核搬到傅里叶空间。

##### Fourier layer 的关键计算

FNO 将非局部算子定义为：

$$
\left(\mathcal{K}(\phi)v_t\right)(x)
=
\mathcal{F}^{-1}\left(
R_\phi \cdot \mathcal{F}(v_t)
\right)(x)
$$

在离散网格上，\(\mathcal{F}\) 用 FFT 实现，\(R\) 是只作用于低频模式的复值权重张量。对第 \(k\) 个频率模式和输出通道 \(l\)，乘法为：

$$
\left(R \cdot \mathcal{F}(v_t)\right)_{k,l}
=
\sum_{j=1}^{d_v} R_{k,l,j}\left(\mathcal{F}(v_t)\right)_{k,j}
$$

这里 \(d_v\) 是隐空间通道数。实现时只保留前 \(k_{\max}\) 个低频模式，高频被置零；这既降低计算量，也把模型容量集中在 PDE 解中最稳定、能量最大的低频结构上。

```python
# FNO Fourier layer 伪代码：2D 情况
def fourier_layer(v, W, R, modes1, modes2):
    # v: [batch, height, width, channels]
    v_ft = fft2(v)  # 转到频域，得到复值 Fourier modes

    out_ft = zeros_like(v_ft)
    out_ft[:, :modes1, :modes2, :] = complex_channel_mix(
        v_ft[:, :modes1, :modes2, :],
        R
    )
    # 未写入的高频模式保持为 0，相当于截断高频

    global_part = ifft2(out_ft).real
    local_part = pointwise_linear(v, W)
    return activation(global_part + local_part)

def fno_forward(a):
    v = lift_network_P(a)
    for _ in range(num_fourier_layers):
        v = fourier_layer(v, W, R, modes1, modes2)
    return projection_network_Q(v)
```

> 💡 关键：FNO 不是简单把 CNN 换成 FFT。它学习的是连续函数空间上的算子，只是在均匀离散网格上用 FFT 高效实现这个算子。

##### 为什么 Fourier 参数化带来分辨率不变性

CNN 的卷积核通常绑定在固定网格上的局部邻域，例如 \(3 \times 3\) 像素。网格变密时，同一个 \(3 \times 3\) 卷积覆盖的物理尺度发生变化，因此模型容易依赖训练分辨率。FNO 的参数则绑定在频率模式 \(k\) 上，傅里叶基函数 \(e^{2\pi i\langle x,k\rangle}\) 在连续域上定义；只要新网格能表示这些低频模式，同一组 \(R_k\) 就可以用于不同分辨率。

这种设计解释了论文中的 zero-shot super-resolution：模型训练时只见过低分辨率 Navier-Stokes 轨迹，推理时在更密的空间和时间网格上计算 FFT/IFFT，并复用已学习的低频权重。高频并不是完全丢失，因为每个 Fourier layer 后都有非线性激活和局部线性通道混合，多层组合可以逐步恢复更复杂的高频结构。

##### 与传统方法的区别

与有限元、有限差分相比，FNO 不显式求解每个新样本的 PDE 离散方程，而是从数据中学习整个参数化 PDE 家族的解算子；与 PINN 相比，FNO 不需要为每个新初值或系数场重新优化网络；与普通 CNN 相比，FNO 的单层频域卷积天然是全局的，且权重不直接依赖物理网格大小。

论文实验在 Burgers、Darcy Flow 和 Navier-Stokes 三类问题上验证这一点。对时间无关问题，FNO 学习从初值/系数场到最终解的映射；对 Navier-Stokes，FNO-2D 可按时间递推，FNO-3D 则把空间和时间一起视作三维函数场并直接预测后续轨迹。训练通常使用相对误差损失：

$$
\mathcal{L}(\theta)
=
\frac{1}{N}\sum_{i=1}^N
\frac{\|\mathcal{G}_\theta(a_i)-u_i\|_2}{\|u_i\|_2}
$$

这种损失直接度量预测函数和真实解函数之间的整体误差，适合不同 PDE 数据集之间比较。

##### 训练与推理流程

```python
# FNO 训练流程伪代码
for epoch in range(num_epochs):
    for a, u_true in dataloader:
        u_pred = fno_forward(a)
        loss = relative_l2(u_pred, u_true)
        optimizer.zero_grad()
        loss.backward()
        optimizer.step()

# 推理时可更换网格分辨率，只要输入被插值/采样到目标网格
u_high_res = fno_forward(a_high_res_grid)
```

实际使用时，FNO 常需要注意边界条件和非均匀网格。FFT 天然对应周期结构，论文通过局部变换 \(W\)、非线性层和输入坐标/边界信息缓解非周期边界；若网格极不规则，则需要改用更一般的神经算子或插值到规则网格。

#### 🧪 练习题

```yaml
question: "FNO 中 Fourier layer 只学习低频 Fourier modes 的主要作用是什么？"
options:
  - "让模型完全忽略高频信息，从而只能预测平滑常数解"
  - "把非局部卷积转化为频域中的少量复值线性变换，降低复杂度并支持跨分辨率泛化"
  - "强制 PDE 满足周期边界条件，因此不再需要训练数据"
  - "把所有空间位置打乱，从而获得排列不变性"
answer: 1
explain: "FNO 在低频模式上学习 R 权重，并用 FFT/IFFT 实现全局卷积；参数绑定在频率模式而非固定网格点上，因此更容易迁移到新分辨率。"
```
