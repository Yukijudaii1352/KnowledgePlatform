### FEDONet — 傅里叶嵌入深度算子网络 (Fourier-Embedded DeepONet)

```yaml
id: fedonet
name: FEDONet
full_name: 傅里叶嵌入深度算子网络 (Fourier-Embedded DeepONet)
year: '2026'
org: arXiv
paper_url: https://arxiv.org/abs/2511.09
category: operators
parent: deeponet
motivation: 傅里叶嵌入增强高频特征捕捉
```

#### 📝 一句话总结

FEDONet 在 DeepONet 的 trunk 输入端加入固定随机 Fourier feature embedding，解决普通 MLP trunk 对高频、尖锐梯度和多尺度 PDE 解存在低频偏置的问题，同时保留 Branch-Trunk 算子学习框架的连续坐标查询能力。

#### 🎯 核心要点

- **可访问来源说明**：任务给定的 `https://arxiv.org/abs/2511.09` 不指向有效论文；可访问预印本为 arXiv:2509.12344《FEDONet: Fourier-Embedded DeepONet for Spectrally Accurate Operator Learning》
- **即插即用改造**：不改 branch network，只把 trunk 的原始坐标 \(\zeta\) 替换为 Fourier embedding \(\phi(\zeta)\)
- **随机 Fourier 特征**：使用固定高斯频率矩阵 \(B\)，构造 \([\sin(2\pi B\zeta),\cos(2\pi B\zeta)]\) 作为坐标特征
- **缓解谱偏置**：把高频模式显式暴露给 trunk MLP，提升对振荡、间断、尖锐界面和混沌时空结构的表达
- **核近似视角**：\(\phi(\zeta)^\top\phi(\zeta')\) 近似 shift-invariant kernel，相当于对 trunk 做谱预条件
- **训练目标保持简单**：仍采用监督式 operator learning 和 MSE/relative \(L_2\) 误差，不需要额外 PDE 残差项
- **验证范围广**：论文覆盖 2D Poisson、Burgers、Lorenz-63、Eikonal、Lorenz-96、Allen-Cahn、Kuramoto-Sivashinsky 等 PDE/动力系统基准

#### 🔬 深入细节

##### 核心架构示意

![FEDONet 架构示意图](https://arxiv.org/html/2509.12344v1/Fourier_Embedded_DeepONet_Diagram.png)
*图：FEDONet 保持 DeepONet 的 branch-trunk 内积结构，但在 trunk 前插入 Fourier embedding，使坐标输入先被映射到随机正弦/余弦谱特征。来源为 arXiv:2509.12344v1 HTML 的 Figure 1。*

##### 算法伪代码

```python
# FEDONet 前向传播伪代码
class FourierEmbedding:
    def __init__(self, coord_dim, num_frequencies, sigma):
        self.B = normal(mean=0.0, std=sigma, shape=(num_frequencies, coord_dim))
        self.B.requires_grad_(False)                  # 论文默认固定，不训练

    def __call__(self, zeta):
        phase = 2.0 * pi * zeta @ self.B.T
        return concat([sin(phase), cos(phase)], dim=-1)

def fedonet_forward(u_sensors, zeta):
    # u_sensors: 输入函数在 sensors 上的值
    # zeta: 输出查询坐标，可为空间坐标或空间-时间坐标
    branch_coeff = branch_net(u_sensors)              # [batch, p]
    trunk_feat = fourier_embedding(zeta)              # [batch, 2M]
    trunk_basis = trunk_net(trunk_feat)                # [batch, p]
    pred = sum(branch_coeff * trunk_basis, dim=-1)
    return pred

for u_batch, zeta_batch, target_batch in dataloader:
    pred = fedonet_forward(u_batch, zeta_batch)
    loss = mean_squared_error(pred, target_batch)
    loss.backward()
    optimizer.step()
```

##### 动机与背景

标准 DeepONet 的预测形式为：

$$
\mathcal{G}_{\theta}(u)(\zeta)=B_{\theta}(u)\cdot T_{\theta}(\zeta).
$$

其中 branch 输出由输入函数决定，trunk 输出由查询位置决定。这个分解让 DeepONet 可以在任意坐标上求值，但 trunk 通常是以原始坐标为输入的 MLP。普通 MLP 存在 spectral bias：训练早期倾向先拟合低频分量，高频和局部尖锐结构收敛慢、误差大。对 Poisson 源项、Burgers 激波、Allen-Cahn 相界面或 KS 混沌轨迹，这种偏置会表现为过平滑和能谱衰减。

FEDONet 的改动很小：给定 \(\zeta\in\mathbb{R}^{d}\)，先做随机 Fourier 特征映射：

$$
\phi(\zeta)=\left[\sin(2\pi B\zeta),\cos(2\pi B\zeta)\right],
\qquad B_{ij}\sim\mathcal{N}(0,\sigma^2).
$$

然后把 \(\phi(\zeta)\) 而不是 \(\zeta\) 输入 trunk：

$$
\mathcal{G}_{\theta}(u)(\zeta)
=B_{\theta}(u)\cdot T_{\theta}(\phi(\zeta))
=\sum_{k=1}^{p}b_k(u)\,t_k(\phi(\zeta)).
$$

##### 核心机制：谱预条件的 trunk

Fourier embedding 的第一层作用可以理解为把低维坐标提升到一组固定正弦/余弦基上。若 \(B\) 中包含足够多尺度的频率，trunk MLP 不必从原始坐标里慢慢学习出高频振荡，而是可以直接组合已有谱特征。

从 kernel 视角看，随机特征满足近似关系：

$$
k(\zeta,\zeta')\approx \phi(\zeta)^{\top}\phi(\zeta').
$$

这意味着 trunk 不再只是在欧氏坐标上学习，而是在一个近似平移不变核的特征空间中学习。论文还讨论了近似 whitening：

$$
\mathbb{E}_{\zeta}\left[\phi(\zeta)\phi(\zeta)^{\top}\right]\approx I,
$$

它降低特征相关性，使优化问题更接近各向同性，对梯度下降和 NTK 条件数都有帮助。

##### 训练流程与损失函数

FEDONet 采用监督式数据集：

$$
\mathcal{D}=
\left\{\left(u^{(i)}, \{\zeta_j^{(i)},s_j^{(i)}\}_{j=1}^{Q}\right)\right\}_{i=1}^{N},
\qquad s_j^{(i)}=G(u^{(i)})(\zeta_j^{(i)}).
$$

训练目标是经验 MSE：

$$
\mathcal{L}(\theta)=
\frac{1}{N}\sum_{i=1}^{N}\frac{1}{Q}\sum_{j=1}^{Q}
\left\|G_{\theta}(u^{(i)})(\zeta_j^{(i)})-s_j^{(i)}\right\|^2.
$$

因为 Fourier embedding 固定不训练，新增开销主要是一次矩阵乘法和三角函数计算；branch-trunk 内积、任意查询坐标、连续输出等 DeepONet 优点都保留。频率尺度 \(\sigma\) 和频率数 \(M\) 是关键超参数：太小无法覆盖高频，太大可能引入过高频噪声或使训练更难。

##### 与 DeepONet 和 FNO 的区别

FEDONet 与 FNO 都利用频域思想，但层级完全不同。FNO 在每一层通过 FFT 参数化全局积分核，适合规则网格上的全场张量输入输出；FEDONet 只在 trunk 坐标端做 Fourier lifting，仍是 DeepONet 式的点查询结构，更容易处理连续坐标查询、非固定输出位置和已有 DeepONet 代码。

与普通 DeepONet 相比，FEDONet 的 branch 部分不变，主要改变 trunk 的函数类：

$$
\mathcal{H}_{\phi}\supset \mathcal{H}_{\text{vanilla}}.
$$

直觉上，原始 trunk 必须用 MLP 权重自己“合成”高频基；FEDONet 先把多尺度正弦/余弦交给 trunk，再由 MLP 学习组合系数。因此它对细尺度、振荡和能谱尾部更友好。论文在多个基准上报告 FEDONet 相比 vanilla DeepONet 有约 2-3 倍平均相对 \(L_2\) 改善，在 Kuramoto-Sivashinsky 等高频混沌问题上提升尤其明显。

> 💡 关键：FEDONet 的创新点不是把 DeepONet 改成 Fourier operator，而是用固定 Fourier 特征修正 trunk 的坐标表示，让 DeepONet 更像一个可学习的谱/Galerkin 合成器。

#### 🧪 练习题

```yaml
question: "FEDONet 中 Fourier embedding 放在 DeepONet 的哪个位置，主要解决什么问题？"
options:
  - "放在 trunk 输入端，用谱特征缓解 MLP 对高频结构的低频偏置"
  - "放在 branch 输出端，用随机噪声增强输入函数采样"
  - "放在损失函数之后，用 FFT 直接替代反向传播"
  - "放在优化器内部，用频率裁剪减少学习率"
answer: 0
explain: "FEDONet 将查询坐标映射为随机正弦/余弦特征后送入 trunk，使 trunk 更容易表示振荡、多尺度和尖锐结构，同时保留 DeepONet 的 branch-trunk 结构。"
```
