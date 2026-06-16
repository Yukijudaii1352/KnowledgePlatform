### FNO — 傅里叶神经算子 (Fourier Neural Operator)

```yaml
id: fno
name: FNO
full_name: 傅里叶神经算子 (Fourier Neural Operator)
year: '2021'
org: Caltech
paper_url: https://arxiv.org/abs/2010.08895
category: operators
parent: —
motivation: 傅里叶空间参数化积分核实现高效全局卷积
```

#### 📝 一句话总结

FNO 将神经算子中的积分核直接参数化到傅里叶空间，用少量低频模态的可学习复权重实现高效全局卷积，解决了传统 CNN/PDE surrogate 绑定固定网格、难以跨分辨率泛化的问题。

#### 🎯 核心要点

- **函数空间到函数空间映射**：直接学习 PDE 参数函数到解函数的算子 \(\mathcal{G}: a \mapsto u\)，而不是为每个 PDE 实例单独训练网络
- **Fourier layer**：每层由局部线性变换 \(Wv(x)\)、傅里叶域低模态线性变换 \(R\cdot \mathcal{F}(v)\)、逆变换和非线性激活组成
- **低模态截断**：只保留前 \(k_{\max}\) 个傅里叶模态，高频被截断，从而以少量参数表达全局相互作用
- **离散化不变性**：参数定义在频率模态上，同一组权重可在不同网格分辨率上评估，支持 zero-shot super-resolution
- **准线性复杂度**：均匀网格上通过 FFT 实现，主计算复杂度约为 \(O(n \log n)\)，显著快于直接积分核或完整图消息传递
- **标准结构**：输入先经 \(P\) lift 到高维通道，堆叠 4 个 Fourier layers，再经 \(Q\) project 回目标物理量
- **验证任务**：在 Burgers 方程、Darcy Flow、Navier-Stokes 湍流上优于 FCN、PCANN、GNO、MGNO、U-Net 等基线，并能在 Navier-Stokes 上做零样本超分辨率

#### 🔬 深入细节

##### 核心架构示意

![FNO 架构与 Fourier layer 示意图](https://ar5iv.labs.arxiv.org/html/2010.08895/assets/figs/fourier_full_arch5.png)
*图：FNO 的整体架构与 Fourier layer。输入函数先被 lift 到高维通道，随后每层在傅里叶域对低频模态做可学习线性变换，同时保留空间域局部线性支路，最后 project 到目标解函数。来源为 ar5iv 对 arXiv:2010.08895 的 HTML 渲染图。*

##### 算法伪代码

```python
# Fourier Neural Operator 前向传播伪代码
def spectral_conv(v, R, modes):
    # v: [batch, channels_in, *grid]
    v_hat = fftn(v)                                  # 进入频域
    out_hat = zeros_like_target_modes(v_hat, R)

    # 只在低频模态上学习复数线性变换
    for k in low_frequency_indices(modes):
        out_hat[:, :, k] = R[k] @ v_hat[:, :, k]     # channel mixing in Fourier space

    return ifftn(out_hat).real                       # 回到物理空间

def fno_forward(a, coords):
    # a: PDE 参数/初值/系数字段；coords: 网格坐标，用于保留位置信息
    v = P(concat(a, coords))                         # lift: R^{d_a+d_x} -> R^c

    for layer in range(L):
        global_term = spectral_conv(v, R[layer], modes)
        local_term = pointwise_linear[layer](v)       # W v(x)
        v = activation(global_term + local_term)

    u_pred = Q(v)                                    # project: R^c -> R^{d_u}
    return u_pred

for a_batch, u_batch in dataloader:
    pred = fno_forward(a_batch, coords)
    loss = relative_l2(pred, u_batch)
    loss.backward()
    optimizer.step()
```

##### 动机与背景

传统有限差分、有限元或谱方法需要对每个新的 PDE 参数实例重新求解；纯 CNN surrogate 虽然推理快，但本质上学习的是固定维度向量到固定维度向量的映射，网络结构和误差都强绑定训练分辨率。神经算子的目标是学习连续函数空间上的映射：给定参数函数 \(a(x)\)、初始场或边界条件，直接输出解函数 \(u(x)\)。这样训练一次后，新参数实例只需一次前向传播。

一般神经算子可写成迭代更新：

$$
v_{t+1}(x)=\sigma\left(Wv_t(x)+(\mathcal{K}_{\phi}v_t)(x)\right),
$$

其中 \(Wv_t(x)\) 是点态局部变换，\(\mathcal{K}_{\phi}\) 是非局部积分算子：

$$
(\mathcal{K}_{\phi}v)(x)=\int_D \kappa_{\phi}(x,y)v(y)\,dy.
$$

GNO 用图消息传递近似这个积分，但在密集网格上成本较高。FNO 的关键假设是把积分核限制为平移不变卷积核 \(\kappa(x-y)\)，再利用卷积定理把积分计算变成傅里叶域乘法。

##### 核心机制：傅里叶域参数化积分核

FNO 的 Fourier layer 定义为：

$$
v_{t+1}(x)=\sigma\left(Wv_t(x)+\mathcal{F}^{-1}\left(R_{\phi}\cdot \mathcal{F}(v_t)\right)(x)\right).
$$

这里 \(\mathcal{F}\) 和 \(\mathcal{F}^{-1}\) 分别是 Fourier transform 与 inverse Fourier transform，\(R_{\phi}\) 是可学习的复数权重张量。对第 \(k\) 个频率模态，频域线性变换可写为：

$$
\widehat{u}_{k,i}=\sum_{j=1}^{c_{\text{in}}} R_{k,i,j}\,\widehat{v}_{k,j},
\qquad |k|\le k_{\max}.
$$

当 \(|k|>k_{\max}\) 时，高频模态直接置零或不更新。这个设计有两个效果：第一，低频模态捕获 PDE 解中长程、全局、主导能量结构；第二，参数量与保留模态数相关，而不是与网格点数直接相关，因此同一组 \(R_k\) 可以在 \(64^2\)、\(128^2\)、\(256^2\) 等不同分辨率上复用。

> 💡 关键：FNO 不是把 FFT 当作预处理特征，而是把 Fourier transform 放进每一层，作为神经算子积分核的可学习计算方式。

##### 训练与数据流

完整 FNO 由三部分组成：

1. \(P\)：将输入 \((a(x), x)\) 从低维物理通道 lift 到宽通道表示 \(v_0(x)\)
2. 多个 Fourier layers：交替执行全局谱卷积、点态线性变换和非线性激活
3. \(Q\)：将最终隐藏场 \(v_T(x)\) project 为目标解 \(u(x)\)

训练通常最小化相对 \(L_2\) 误差：

$$
\mathcal{L}(\theta)=\frac{1}{N}\sum_{j=1}^{N}
\frac{\|\mathcal{G}_{\theta}(a_j)-u_j\|_2}{\|u_j\|_2}.
$$

论文实验中，模型学习 Burgers 方程的初值到终态映射、Darcy Flow 的扩散系数到压力场映射，以及 Navier-Stokes 的历史涡量场到未来涡量场映射。对时间依赖问题，FNO 可以用 2D 空间卷积自回归推进，也可以把空间-时间一起作为 3D 张量做 FNO-3d。

##### 与传统方法和 GNO 的区别

| 方法 | 非局部交互 | 网格依赖 | 计算特征 | 主要限制 |
|------|------------|----------|----------|----------|
| CNN/FCN | 依靠局部卷积堆叠扩大感受野 | 强依赖固定分辨率 | \(O(n)\) 局部卷积 | 跨分辨率泛化弱 |
| GNO | 图上消息传递近似积分核 | 可处理不规则点 | 边数相关，可能接近 \(O(n^2)\) | 大网格成本高 |
| FNO | FFT 实现全局卷积 | 频域参数可跨分辨率 | \(O(n\log n)\) | 标准形式偏好规则网格/周期边界 |

FNO 的优势来自“全局线性算子 + 局部非线性激活”的组合：谱卷积让每个位置一层内看到全域信息，非线性激活使多层组合能够表达非线性 PDE 解算子。它也有清晰限制：FFT 要求规则网格，复杂几何和非均匀网格需要后续 Geo-FNO、GNO 或插值/变形策略处理。

#### 🧪 练习题

```yaml
question: "FNO 中 Fourier layer 只学习低频模态权重的主要原因是什么？"
options:
  - "低频模态与 PDE 解的全局结构强相关，同时可减少参数量并支持跨分辨率评估"
  - "低频模态可以完全恢复任意非周期边界条件，因此不需要空间域分支"
  - "高频模态无法通过 FFT 计算，只能通过有限元方法获得"
  - "低频模态使网络退化为普通全连接网络，便于反向传播"
answer: 0
explain: "FNO 在频域对少量低频模态学习复数线性变换，既捕获主导全局结构，又让参数量与网格分辨率解耦；空间域的 W 分支和非线性激活补充局部与非线性表达。"
```
