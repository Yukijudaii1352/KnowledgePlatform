### NQS: 神经量子态 (Neural Quantum States)

```yaml
id: nqs
name: NQS
full_name: 神经量子态 (Neural Quantum States)
year: '2017'
org: ETH Zurich
paper_url: https://www.science.org/doi/10.1126/science.aag2302
category: quantum_particle
parent: —
motivation: RBM表示波函数解决多体问题
```

#### 📝 一句话总结
NQS 用限制玻尔兹曼机等神经网络直接参数化多体波函数 \(\Psi(\mathcal{S})\)，通过变分 Monte Carlo 和随机重构优化基态或时间演化。它把指数复杂的量子态表示问题转化为可采样、可优化的神经网络变分 ansatz。

#### 🎯 核心要点
- 波函数黑箱视角：把多体构型 \(\mathcal{S}\) 输入神经网络，输出复值波函数振幅和相位 \(\Psi(\mathcal{S})\)。
- RBM ansatz：使用 \(N\) 个可见自旋和 \(M\) 个隐藏变量，隐藏单元无层内连接，可解析求和得到 \(2\cosh\) 形式。
- 可调表达能力：隐藏单元密度 \(\alpha=M/N\) 控制参数量和精度，类似 MPS 的 bond dimension，但隐藏单元天然引入非局域关联。
- 复值参数：权重 \(\mathcal{W}=\{a_i,b_j,W_{ij}\}\) 可取复数，从而同时表示波函数的幅度与相位。
- 基态求解：用 VMC 采样 \(|\Psi_M(\mathcal{S};\mathcal{W})|^2\)，最小化能量期望 \(E(\mathcal{W})\)。
- 优化方法：采用 stochastic reconfiguration，相当于变分子空间中的虚时间演化，用协方差矩阵 \(S\) 和 force 向量 \(F\) 更新参数。
- 动力学求解：用 Dirac-Frenkel time-dependent variational principle 和 t-VMC 最小化精确演化与变分演化的 Hilbert 空间距离。
- 验证系统：在一维/二维 transverse-field Ising 和 antiferromagnetic Heisenberg 模型上比较精确解、MPS、Jastrow、EPS、PEPS 和 t-DMRG。

#### 🔬 深入细节
来源说明：Science DOI 是正式发表版本；可访问的同文 arXiv 版本为 `https://arxiv.org/abs/1606.02318`，ar5iv HTML 转换提供了论文图像直链。以下公式和算法细节来自 arXiv 源文件及其补充材料。

![RBM 神经量子态结构](https://ar5iv.labs.arxiv.org/html/1606.02318/assets/x1.png)
*图：NQS 论文中的 RBM 架构，黄色节点是物理可见自旋 \(\sigma_i^z\)，灰色节点是隐藏变量 \(h_j\)，网络输出构型 \(\mathcal{S}\) 的波函数值。*

```python
# NQS 基态 VMC + stochastic reconfiguration 伪代码
initialize_complex_parameters(W = {a_i, b_j, W_ij})

for step in range(num_optimization_steps):
    samples = []
    S = random_spin_configuration()
    for _ in range(num_mcmc_steps):
        S_new = flip_random_spin(S)
        accept_prob = min(1, abs(psi(S_new, W) / psi(S, W)) ** 2)
        S = accept_or_reject(S, S_new, accept_prob)
        samples.append(S)

    E_loc = [local_energy(S, W, Hamiltonian) for S in samples]
    O = [log_derivatives(S, W) for S in samples]
    S_matrix = covariance(O.conjugate(), O)
    F_vector = covariance(O.conjugate(), E_loc)
    W = W - gamma * solve_regularized(S_matrix, F_vector)
```

NQS 的核心是把量子多体波函数看成一个函数近似问题。对 \(N\) 个离散自由度的构型 \(\mathcal{S}=(\sigma_1^z,\ldots,\sigma_N^z)\)，RBM 形式写为：

$$
\Psi_M(\mathcal{S};\mathcal{W})=
\sum_{\{h_i\}}
\exp\left(
\sum_j a_j\sigma_j^z+
\sum_i b_i h_i+
\sum_{ij} W_{ij}h_i\sigma_j^z
\right)
$$

因为 RBM 没有可见-可见和隐藏-隐藏连接，隐藏变量可解析求和，得到更实用的闭式表达：

$$
\Psi_M(\mathcal{S};\mathcal{W})=
\exp\left(\sum_i a_i\sigma_i^z\right)
\prod_{j=1}^{M}2\cosh\theta_j(\mathcal{S})
$$

$$
\theta_j(\mathcal{S})=b_j+\sum_i W_{ij}\sigma_i^z
$$

这组参数可取复数，因此网络既能表示概率幅大小，也能表示相位。隐藏单元密度 \(\alpha=M/N\) 是精度旋钮：增加 \(\alpha\) 会增加非局域相关通道，使表示能力提高。若利用平移对称性，还可以把权重写成共享 filter，减少参数并让模型学习类似卷积特征的关联模式。

基态问题通过变分原理处理。给定 Hamiltonian \(\mathcal{H}\)，优化目标是能量期望：

$$
E(\mathcal{W})=
\frac{\langle\Psi_M|\mathcal{H}|\Psi_M\rangle}
{\langle\Psi_M|\Psi_M\rangle}
$$

由于完整 Hilbert 空间指数大，不能枚举所有 \(\mathcal{S}\)。NQS 用 Metropolis-Hastings 从 \(|\Psi_M(\mathcal{S})|^2\) 采样，单次翻转一个自旋并按以下概率接受：

$$
A(\mathcal{S}^{(k)}\rightarrow\mathcal{S}^{(k+1)})
=
\min\left(
1,
\left|
\frac{\Psi_M(\mathcal{S}^{(k+1)})}
{\Psi_M(\mathcal{S}^{(k)})}
\right|^2
\right)
$$

采样后计算局域能量和 log-derivative：

$$
E_{\textrm{loc}}(\mathcal{S})=
\frac{\langle\mathcal{S}|\mathcal{H}|\Psi_M\rangle}
{\Psi_M(\mathcal{S})},\quad
\mathcal{O}_k(\mathcal{S})=
\frac{1}{\Psi_M(\mathcal{S})}
\partial_{\mathcal{W}_k}\Psi_M(\mathcal{S})
$$

随机重构的更新式为：

$$
\mathcal{W}(p+1)=\mathcal{W}(p)-\gamma S^{-1}(p)F(p)
$$

其中

$$
S_{kk'}=
\langle\mathcal{O}_k^\star\mathcal{O}_{k'}\rangle
-\langle\mathcal{O}_k^\star\rangle\langle\mathcal{O}_{k'}\rangle
$$

$$
F_k=
\langle E_{\textrm{loc}}\mathcal{O}_k^\star\rangle
-\langle E_{\textrm{loc}}\rangle\langle\mathcal{O}_k^\star\rangle
$$

直觉上，普通梯度下降只看能量下降方向，而 SR 用 \(S\) 近似变分流形上的自然度量，减少参数化方式对优化路径的影响。论文使用对角正则化或伪逆处理 \(S\) 的病态问题。

时间演化部分把参数设为时间依赖 \(\mathcal{W}(t)\)，用 Dirac-Frenkel 变分原理最小化变分态和 Schrödinger 精确演化之间的残差：

$$
R(t;\dot{\mathcal{W}}(t))=
\mathrm{dist}\left(
\partial_t\Psi(\mathcal{W}(t)),
-i\mathcal{H}\Psi
\right)
$$

最小化后得到：

$$
\dot{\mathcal{W}}(t)=-iS^{-1}(t)F(t)
$$

这就是 t-VMC 的参数运动方程。对量子淬火等非平衡动力学，NQS 只沿变分流形积分参数，而不显式存储指数维波函数。论文在 TFI 和 AFH 模型中展示：随着 \(\alpha\) 增大，基态能量误差和时间演化残差系统性下降；在二维 Heisenberg 上，NQS 可达到或超过当时若干张量网络变分态的精度。

与 MPS/PEPS 等张量网络相比，NQS 的重要区别是非局域性。MPS 在一维非常强，但二维或长程纠缠时需要更高 bond dimension；RBM 的隐藏单元可以连接任意可见自旋，因此一个隐藏变量就能编码跨距离关联。这也是 NQS 后续发展成深度 NQS、费米子 NQS、自回归采样和神经网络量子 Monte Carlo 的原因。

#### 🧪 练习题
```yaml
question: "Carleo 和 Troyer 的 NQS 中，隐藏单元密度 alpha=M/N 的主要作用是什么？"
options:
  - "控制 RBM 表示能力和变分精度，alpha 越大通常越能表达复杂关联"
  - "决定 Hamiltonian 中自旋的物理维度"
  - "把复值波函数强制变成实值概率分布"
  - "消除 Metropolis-Hastings 采样步骤"
answer: 0
explain: "alpha 是隐藏单元数相对可见自旋数的比例，类似可调容量参数；增加 alpha 可提供更多非局域关联通道，但计算成本也会上升。"
```
