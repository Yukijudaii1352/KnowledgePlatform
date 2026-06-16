### FlowMM — 黎曼流匹配材料生成 (Riemannian Flow Matching for Materials)

```yaml
id: flowmm
name: FlowMM
full_name: "黎曼流匹配材料生成 (Riemannian Flow Matching for Materials)"
year: "2024"
org: MIT
paper_url: "https://arxiv.org/abs/2406.04713"
category: structure_prediction
parent: cdvae
motivation: "流匹配技术效率提升3倍"
```

#### 📝 一句话总结

FlowMM 把晶体生成建模为晶格参数、周期分数坐标和可选原子类型上的黎曼流匹配问题，用连续归一化流替代多种扩散过程，在 CSP 和 de novo 生成中以更少积分步数获得与 DiffCSP 竞争或更好的结构质量。

#### 🎯 核心要点

- **Riemannian Flow Matching**：在晶体天然所在的乘积流形 \(\mathcal{C}=\mathcal{A}\times\mathcal{F}\times\mathcal{L}\) 上学习时间依赖向量场
- **两类模型**：CSP 模型给定组成，只生成分数坐标和晶格；DNG 模型同时生成原子类型、分数坐标和晶格
- **周期分数坐标流形**：把 \(F\) 视作 flat torus，路径沿周期测地线连接 base 样本和真实样本
- **晶格参数化**：用 3 个边长和 3 个角度表示晶胞，角度经 \([60,120]\to\mathbb{R}\) 的可逆变换进入无约束空间
- **更自由的 base distribution**：边长用从训练集拟合的 log-normal，角度用 uniform，坐标用 \(\mathcal{U}(0,1)\)，比扩散模型必须收敛到标准高斯更贴合晶体
- **平移不变的条件向量场**：在坐标分支从 torus log map 中减去平均平移，保证边际概率路径对周期平移不变
- **analog bits 原子类型**：DNG 中用 \(\lceil\log_2 h\rceil\) 维二进制表示替代 100 维 one-hot/simplex，降低原子类型生成维度
- **推理效率**：CSP 中约 50 个积分步即可达到强匹配率，相比 DiffCSP 常用 1000 步显著减少；DNG 稳定材料发现成本约提升 3 倍

#### 🔬 深入细节

![FlowMM 概念图](https://arxiv.org/html/2406.04713v1/x1.png)
*图：FlowMM Figure 1。模型学习从 base distribution 到目标晶体分布的向量场，联合处理晶格参数、周期分数坐标和原子类型表示。*

##### 算法伪代码

```python
# FlowMM 训练：Riemannian Flow Matching
for target_crystal in dataset:
    A1, F1, ell1 = encode_crystal(target_crystal)  # ell: lattice lengths + angles
    A0 = normal_bits_like(A1) if de_novo else A1   # CSP 中 A 是条件，不流动
    F0 = uniform(0, 1, shape=F1.shape)
    ell0 = sample_lattice_base_distribution()
    t = uniform(0.0, 1.0)

    # 在各自流形上沿测地线取中间点
    A_t = interpolate_euclidean(A0, A1, t) if de_novo else A1
    F_t = torus_geodesic(F0, F1, t)
    ell_t = euclidean_geodesic(transform(ell0), transform(ell1), t)

    # 目标向量场：欧氏变量是 (x1 - x0)，周期坐标用 torus log map 并去掉平均平移
    u_A = A1 - A0
    u_F = torus_log(F1, F0) - mean_i(torus_log(F1_i, F0_i))
    u_ell = transform(ell1) - transform(ell0)

    v_A, v_F, v_ell = GNN_vector_field(A_t, F_t, ell_t, t)
    loss = weighted_mse(v_A, u_A) + weighted_mse(v_F, u_F) + weighted_mse(v_ell, u_ell)
    optimizer.step(loss)

# FlowMM 推理
A, F, ell = sample_base_distribution(conditioned_composition=None_or_A)
for t in ode_solver_grid(0.0, 1.0, num_steps):
    v_A, v_F, v_ell = GNN_vector_field(A, F, ell, t)
    scale = 1 + s_prime * t              # optional inference anti-annealing
    A = A + dt * scale * v_A
    F = wrap_to_unit_cell(F + dt * scale * v_F)
    ell = ell + dt * scale * v_ell
return discretize_atom_bits(A), decode_lattice_params(ell), F
```

##### 从扩散到流匹配

DiffCSP/CDVAE 要为不同变量设计不同扩散：晶格用高斯 DDPM，周期坐标用 wrapped-normal score matching，原子类型用离散或连续分类扩散。FlowMM 的出发点是：晶体变量本来就在不同几何空间上，与其强行把它们都扩散到某种固定极限分布，不如直接学习从一个可选 base distribution 到目标数据分布的连续流。

Flow Matching 的基本目标是在时间 \(t\in[0,1]\) 上学习向量场 \(v_t^\theta\)，回归一个已知的条件向量场 \(u_t(\cdot\mid m_1)\)：

$$
\mathcal{L}(\theta)=
\mathbb{E}_{t,q(m_1),p_t(m\mid m_1)}
\left\|v_t^\theta(m)-u_t(m\mid m_1)\right\|^2
$$

在推理时，从 base 样本 \(m_0\sim p_0\) 出发，求解 ODE：

$$
\frac{d}{dt}\psi_t(m)=v_t^\theta(\psi_t(m)),\qquad \psi_0(m)=m_0
$$

最终 \(\psi_1(m_0)\) 近似服从目标晶体分布。相比扩散模型反复去噪，FlowMM 的路径是有限时间的确定性流，因此通常需要少得多的积分步。

##### 晶体乘积流形 \(\mathcal{C}\)

FlowMM 把晶体写成：

$$
\mathcal{C}=\mathcal{A}\times\mathcal{F}\times\mathcal{L}
$$

其中 \(\mathcal{F}\) 是 \(n\times 3\) 个分数坐标组成的 flat torus，\(\mathcal{L}\) 是晶格参数空间，\(\mathcal{A}\) 是原子类型空间。CSP 中 \(\mathcal{A}\) 是条件输入，速度为 0；DNG 中 \(\mathcal{A}\) 也参与生成。

晶格不直接用 \(3\times 3\) 矩阵，而用旋转不变的 6 个晶格参数：

$$
\ell=(a,b,c,\alpha,\beta,\gamma)
$$

边长 \(a,b,c>0\)，角度由 Niggli reduction 约束在 \([60,120]\)。为避免角度边界导致向量场不光滑，FlowMM 使用可逆变换：

$$
\varphi(\eta)=\log\frac{(\eta-60)/120}{1-(\eta-60)/120}
$$

推理结束后再用：

$$
\varphi^{-1}(\eta')=120\,\mathrm{sigmoid}(\eta')+60
$$

映回物理角度范围。

##### Base distribution 的选择

扩散模型通常需要一个简单极限分布，例如标准高斯。但晶格边长为正、角度有界，标准高斯并不自然。FlowMM 借助 Flow Matching 可自由选择 base distribution：

$$
p(A,F,\ell)=p(A)p(F)p(\ell)
$$

坐标分支使用：

$$
p(F)=\mathcal{U}(0,1)
$$

晶格边长使用从训练集最大似然拟合的 log-normal，角度使用 \(\mathcal{U}(60,120)\)。DNG 的原子类型用 analog bits：

$$
A\in\{-1,1\}^{\lceil\log_2 h\rceil}
$$

当 \(h\approx 100\) 个元素类别时，analog bits 只需 7 维，而 one-hot/simplex 需要约 100 维。模型在连续空间中流动，最后用 \(\mathrm{sign}\) 离散化为类别编码。

> 💡 关键：FlowMM 的 base distribution 不是“数学上最简单”，而是“对晶体变量更自然”。这减少了模型要学习的无谓变形，尤其是晶格分布。

##### 周期分数坐标的测地线与平移不变目标

在 flat torus 上，两个分数坐标之间的 log map 要按周期最短方向计算。对单个原子坐标 \(f^i\)，FlowMM 使用：

$$
\omega^i=2\pi(f_1^i-f_0^i)
$$

$$
\log_{f_0^i}(f_1^i)=
\frac{1}{2\pi}\operatorname{atan2}(\sin\omega^i,\cos\omega^i)
$$

如果直接用 \(-\log_{F_1}(F)/(1-t)\) 作为坐标向量场，它会对全局周期平移等变，而不是不变。FlowMM 在切空间中减去平均平移：

$$
u_t^{\mathcal{F}}(F\mid F_1)=
\log_{F_1}(F)-
\frac{1}{n}\sum_{i=1}^{n}\log_{f_1^i}(f^i)
$$

这类似欧氏点云中去中心化，但发生在 torus 的切空间里。这样条件路径可以集中到与 \(F_1\) 周期平移等价的一整类点，而边际概率路径保持周期平移不变。

##### FlowMM 目标函数

FlowMM 在三个变量分量上做加权向量场回归。简化写法为：

$$
\mathcal{L}=
\mathbb{E}\left[
\frac{\lambda_A}{hn}\|v_t^{A,\theta}-u_A\|^2+
\frac{\lambda_F}{3n}\|v_t^{F,\theta}-u_F\|^2+
\frac{\lambda_\ell}{6}\|v_t^{\ell,\theta}-u_\ell\|^2
\right]
$$

其中 CSP 中 \(u_A=0\)，DNG 中 \(u_A=A_1-A_0\)；坐标目标 \(u_F\) 使用上面的去平均 torus log map；晶格目标 \(u_\ell\) 在无约束晶格参数空间中计算。论文还约束权重为仿射组合：

$$
\lambda_A+\lambda_F+\lambda_\ell=1
$$

##### 神经网络结构与推理 anti-annealing

FlowMM 在 CSP 中沿用 DiffCSP 风格的 EGNN 消息传递，以便做公平比较。边特征使用相对分数坐标的正弦嵌入：

$$
\mathrm{SinusoidalEmbedding}(x)=
\left(\sin(2\pi kx),\cos(2\pi kx)\right)_{k=0}^{n_{\mathrm{freq}}}
$$

消息传递后，节点头输出 \(\dot F=v_t^{F,\theta}\)，图级池化头输出 \(\dot\ell=v_t^{\ell,\theta}\)。DNG 中再增加 \(\dot A\) 输出头，并用 analog-bit sigmoid cross entropy 辅助原子类型离散化。

推理时，FlowMM 可对速度做 anti-annealing：

$$
\frac{d}{dt}\psi_t^\theta=s(t)v_t^\theta(\psi_t^\theta),\qquad
s(t)=1+s't
$$

论文发现 CSP 中对分数坐标分支增大后期速度通常有益，但对晶格分支可能有害。这是推理技巧，不改变训练目标。

##### 与 CDVAE/DiffCSP 的关系

CDVAE 首先把扩散思想引入晶体生成，但通过 VAE 潜变量和 score decoder 间接生成结构；DiffCSP 把给定组成的 CSP 变成联合扩散问题，显著增强了晶格和坐标协同生成；FlowMM 则把同一问题进一步改写为流匹配，保留 DiffCSP 的对称性思想，同时避免为每类变量设计独立扩散过程。

在实验上，FlowMM 在 MP-20、MPTS-52 等更真实数据集上用更少积分步达到高 match rate。论文报告 CSP 中约 50 步即可达到强表现，相比 DiffCSP 常用 1000 步是数量级下降；DNG 中用 DFT/energy-above-hull 做稳定性验证，稳定材料发现成本约为已有开放方法的 1/3。

#### 🧪 练习题

```yaml
question: "FlowMM 相比 DiffCSP 的核心效率优势来自哪里？"
options:
  - "完全不生成晶格，只复制训练集晶格"
  - "用 Riemannian Flow Matching 学习从合适 base distribution 到晶体分布的连续向量场，减少反向采样步数"
  - "把所有原子类型都固定为碳元素"
  - "取消周期边界条件以简化坐标空间"
answer: 1
explain: "FlowMM 不需要像扩散模型那样长链反向去噪，而是通过连续归一化流积分从 base 分布到目标分布；再配合自然晶格 base 和流形几何，因此推理步数显著减少。"
```
