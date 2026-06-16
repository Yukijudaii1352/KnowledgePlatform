### FEDONet

```yaml
id: fedonet
name: FEDONet
full_name: 傅里叶嵌入DeepONet (Fourier-embedded DeepONet)
year: '2026'
org: JCP
paper_url: https://www.sciencedirect.com/science/article/pii/S0021999126002846
category: pde_solving
parent: deeponet
motivation: 嵌入傅里叶特征实现谱精度学习
```

#### 📝 一句话总结

FEDONet 在 DeepONet 的 trunk 坐标输入前加入固定随机 Fourier 特征嵌入，解决普通 MLP trunk 对高频、振荡和多尺度 PDE 解场表达不足的问题。它保留 DeepONet 的 branch-trunk 内积形式，却用轻量的谱坐标提升获得更好的频谱保真度、样本效率和噪声鲁棒性。

#### 🎯 核心要点

- **核心架构**：保留 DeepONet 的 branch network 编码输入函数、trunk network 编码查询坐标、二者内积输出算子值
- **关键改动**：将 raw coordinate \(\zeta\) 先映射为 \(\gamma(\zeta)=[\sin(2\pi Z\zeta),\cos(2\pi Z\zeta)]\)，再输入 trunk
- **随机 Fourier 特征**：\(Z\in\mathbb{R}^{M\times d}\) 为固定 Gaussian 频率矩阵，不随训练更新
- **谱预条件解释**：Fourier embedding 近似 shift-invariant kernel，扩大 trunk 的有效假设空间并缓解 MLP 的低频谱偏置
- **训练目标**：与监督 DeepONet 一样，用输入函数-输出场样本最小化 MSE，几乎不增加训练流程复杂度
- **评估指标**：除相对 \(L^2\) 误差外，论文强调 Fourier energy spectrum 的谱保真度、输入噪声鲁棒性和低数据量样本效率
- **benchmark**：Burgers、2D Poisson、Eikonal airfoil SDF、Allen-Cahn、Kuramoto-Sivashinsky
- **相对 DeepONet 的收益**：在冲击、界面、几何尖角和混沌宽频系统中明显减少过平滑与高频能量丢失

#### 🔬 深入细节

##### 图示与来源

![FEDONet 架构图](https://arxiv.org/html/2509.12344v4/69.png)
*图：FEDONet 在 trunk 坐标端加入 sin/cos Fourier embedding，branch 输出与 trunk 输出继续通过内积得到 \(\mathcal{G}(u_0)(\zeta)\)。可访问来源包括 arXiv HTML https://arxiv.org/html/2509.12344v4、JCP DOI 页面和官方实现 https://github.com/as26101999/Fourier-Embedded-DeepONets。*

##### 算法伪代码

```python
# FEDONet forward and training sketch
Z = normal(shape=(num_fourier_features, coord_dim))  # fixed, not trainable

def fourier_embed(zeta):
    proj = 2 * pi * (Z @ zeta)
    return concat(sin(proj), cos(proj))

def fedonet(u_sensor_values, zeta):
    b = BranchNet(u_sensor_values)        # [p]
    t = TrunkNet(fourier_embed(zeta))     # [p]
    return dot(b, t)                      # operator value at zeta

for u, y_ref, query_points in dataset:
    preds = [fedonet(u.sensors, zeta) for zeta in query_points]
    loss = mean_square(preds - y_ref)
    update(branch_params + trunk_params, loss)
```

##### 方法机制

DeepONet 学习的是非线性算子 \(\mathcal{G}: u \mapsto s\)，例如从初始条件、边界条件或几何 mask 映射到 PDE 解场。标准形式把输入函数在传感器点上的取值送入 branch network，把查询坐标 \(\zeta=(x,t)\) 或 \((x,y)\) 送入 trunk network，然后用两个向量的内积输出该坐标处的解：

$$
\mathcal{G}_\theta(u)(\zeta)
=\sum_{k=1}^{p} b_k(u)\,t_k(\zeta).
$$

这个结构简单、可跨坐标查询，但 trunk 往往只是浅层 MLP。对于 Burgers shock、Allen-Cahn 界面、Eikonal 几何尖角或 Kuramoto-Sivashinsky 混沌轨迹，解场含有大量高频或多尺度成分。普通 MLP 存在 spectral bias，常先学低频结构，导致预测被过度平滑，频谱尾部能量不足，甚至在混沌系统中发生相位漂移。

FEDONet 的改动非常小：不把原始坐标 \(\zeta\) 直接喂给 trunk，而是先做固定随机 Fourier 特征映射：

$$
\gamma(\zeta)=
\begin{bmatrix}
\sin(2\pi Z\zeta)\\
\cos(2\pi Z\zeta)
\end{bmatrix},
\qquad Z_{ij}\sim \mathcal{N}(0,\sigma^2).
$$

于是算子近似变为

$$
\mathcal{G}_\theta^{\mathrm{FED}}(u)(\zeta)
=\sum_{k=1}^{p} b_k(u)\,t_k(\gamma(\zeta)).
$$

这相当于在 trunk 前做一次谱 lifting。根据随机 Fourier 特征和 Bochner 定理的直觉，\(\gamma(\zeta)\) 近似把坐标放入 shift-invariant kernel 的特征空间，使浅层 trunk 不必从 raw coordinate 中自己“造出”振荡基函数。论文还从 operator neural tangent kernel 的角度解释这种 embedding 的 whitening / conditioning 效果：特征相关性下降后，优化问题更接近各向同性，梯度传播更稳定。

训练目标保持监督 DeepONet 的经验风险最小化。若训练集为 \(\{(u^{(i)},s^{(i)})\}_{i=1}^{N}\)，并在每个样本上查询 \(Q\) 个坐标，则

$$
\mathcal{L}(\theta)
=\frac{1}{NQ}\sum_{i=1}^{N}\sum_{q=1}^{Q}
\left|
\mathcal{G}_\theta^{\mathrm{FED}}(u^{(i)})(\zeta_q)
-s^{(i)}(\zeta_q)
\right|^2.
$$

Fourier embedding 矩阵 \(Z\) 固定不训练，因此额外开销主要是一层矩阵乘法和 sin/cos 计算。相比 FNO 这类全局 spectral convolution，FEDONet 没有改变 DeepONet 的 branch-trunk 模块，也不要求在规则网格上做 FFT；它更像给 trunk 加了一个通用坐标预处理器，适合已有 DeepONet 代码中直接替换输入层。

论文评估不仅看相对 \(L^2\) 误差：

$$
\varepsilon_{\mathrm{rel}}
=\frac{\|\widehat{s}-s\|_2}{\|s\|_2},
$$

还比较预测场与参考场的 Fourier energy spectrum。这个指标能揭示普通 DeepONet 常见的“视觉上大形状对了，但高频不对”的问题。例如在 Burgers 和 Allen-Cahn 中，FEDONet 更能保持 shock/interface 附近的陡峭梯度；在 2D Poisson 中，它减少局部极值和中高波数段的伪影；在 Eikonal airfoil SDF 中，它更好恢复前缘/后缘高曲率附近的 signed distance；在 KS 方程中，FEDONet 对宽频混沌结构的优势最大，能显著降低相对误差并保留振幅和相位结构。

与传统 DeepONet 相比，FEDONet 的创新点是“把谱偏置放在坐标表示上”，而不是引入复杂的全局算子层或问题专用 Fourier basis。它的边界是：随机频率尺度 \(M,\sigma\) 仍需选择；对于强非周期边界、复杂几何或局部不连续，固定正弦基可能需要与 graph trunk、wavelet 或物理约束结合。但作为一个几乎不改变训练接口的增强，FEDONet 提供了非常直接的谱精度提升路径。

#### 🧪 练习题

```yaml
question: "FEDONet 为什么能改善普通 DeepONet 对高频 PDE 结构的拟合？"
options:
  - "它把 branch network 删除，只保留 trunk network"
  - "它在 trunk 坐标输入前加入随机 Fourier sin/cos 特征，缓解 MLP 的低频谱偏置"
  - "它用有限差分替代神经网络训练"
  - "它只预测频域系数，不再输出物理空间解"
answer: 1
explain: "FEDONet 保留 DeepONet 的 branch-trunk 内积结构，但将查询坐标谱提升为 sin/cos Fourier 特征，使 trunk 更容易表达振荡、多尺度和高梯度解场。"
```
