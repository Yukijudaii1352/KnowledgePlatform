### DiffCSP — 扩散晶体结构预测 (Diffusion-based Crystal Structure Prediction)

```yaml
id: diffcsp
name: DiffCSP
full_name: "扩散晶体结构预测 (Diffusion-based Crystal Structure Prediction)"
year: "2024"
org: Tsinghua
paper_url: "https://openreview.net/forum?id=9T_v_8AAAAJ"
category: structure_prediction
parent: cdvae
motivation: "学习原子坐标扩散提升搜索率"
```

#### 📝 一句话总结

DiffCSP 提出对晶格矩阵和分数坐标进行联合等变扩散，用 DDPM 处理连续晶格、用 wrapped-normal score matching 处理周期分数坐标，解决 CDVAE 固定晶格去噪和笛卡尔坐标建模难以充分表达晶体几何对称性的问题。

#### 🎯 核心要点

- **CSP 条件生成**：给定化学组成 \(A\)，直接生成稳定晶格 \(L\) 和分数坐标 \(F\)，目标是结构预测而非纯无条件材料生成
- **联合扩散**：同时更新晶格和坐标，而不是先预测晶格再固定晶格去噪坐标
- **分数坐标表示**：用 \(F\in[0,1)^{3\times N}\) 表示原子位置，天然适配周期边界，比笛卡尔坐标上的周期多重图更直接
- **晶格 DDPM**：把 \(L\) 作为连续变量扩散到高斯先验，并用 O(3)-等变噪声预测器反向去噪
- **坐标 wrapped normal**：把分数坐标视作环面/商空间，用 wrapped normal 前向扰动和 score matching 反向采样
- **周期 E(3) 对称性**：模型保证置换不变、晶格旋转/反射等变、分数坐标周期平移不变
- **Fourier 相对坐标特征**：在全连接图上用 \(\sin/\cos\) 展开相对分数坐标，避免动态周期多重图在噪声晶格下不稳定
- **实验基准**：在 Perov-5、Carbon-24、MP-20、MPTS-52 上对比 CDVAE、P-cG-SchNet、随机搜索、BO、PSO 等方法

#### 🔬 深入细节

> 来源说明：任务给出的 OpenReview 链接可访问但返回 “Note not found”。DiffCSP 论文可访问来源为 arXiv:2309.04475（Crystal Structure Prediction by Joint Equivariant Diffusion）和官方代码库 `https://github.com/jiaor17/DiffCSP`，以下方法解读基于这些来源。

![DiffCSP 方法总览](https://arxiv.org/html/2309.04475v2/x2.png)
*图：DiffCSP Figure 2。给定组成后，模型在时间步 \(t\) 上同时处理晶格矩阵 \(L_t\) 与分数坐标 \(F_t\)，并预测两者的去噪项。*

##### 算法伪代码

```python
# DiffCSP 训练
for crystal in dataset:
    A, L0, F0 = crystal.atom_types, crystal.lattice, crystal.frac_coords
    t = uniform_int(1, T)

    # 晶格 DDPM 前向扰动
    eps_L = normal_like(L0)
    L_t = sqrt(alpha_bar[t]) * L0 + sqrt(1 - alpha_bar[t]) * eps_L

    # 分数坐标 wrapped-normal 前向扰动
    eps_F = normal_like(F0)
    F_t = wrap_to_unit_cell(F0 + sigma[t] * eps_F)

    # 周期 E(3) 等变/不变 denoising model
    eps_L_hat, score_F_hat = phi(L_t, F_t, A, t)

    loss_L = mse(eps_L_hat, eps_L)
    loss_F = lambda_t * mse(score_F_hat, grad_log_wrapped_normal(F_t, F0, sigma[t]))
    optimizer.step(loss_L + loss_F)

# DiffCSP 采样 / CSP 推理
L_T = normal_matrix()
F_T = uniform(0, 1, shape=(3, N))
for t in reversed(range(1, T + 1)):
    eps_L_hat, score_F_hat = phi(L_t, F_t, A, t)
    L_t_minus_1 = ddpm_reverse_step(L_t, eps_L_hat, t)
    F_t_minus_1 = predictor_step_wrapped_normal(F_t, score_F_hat, t)
    F_t_minus_1 = langevin_corrector(F_t_minus_1, score_F_hat, gamma)
    F_t_minus_1 = wrap_to_unit_cell(F_t_minus_1)
return L_0, F_0
```

##### 问题设定与表示

CSP 的输入是组成 \(A\)，输出是稳定结构 \((L,F)\)。晶体的笛卡尔坐标可由晶格和分数坐标恢复：

$$
X = L F
$$

分数坐标的关键好处是周期性变成模 1 的坐标等价：

$$
F \sim w(F+\tau\mathbf{1}^{\top}),\qquad \tau\in\mathbb{R}^{3}
$$

其中 \(w(\cdot)\) 取每个坐标的小数部分。这样，平移周期边界不再需要在笛卡尔空间构造多个镜像边；模型只需在 \([0,1)\) 的环面上学习相对位置。

DiffCSP 把晶体结构分布的对称性拆成三类：原子顺序置换不变、晶格 \(L\) 对 O(3) 旋转/反射等变、分数坐标 \(F\) 对周期平移不变。只要先验分布具备这些不变性，反向转移具备相应等变性，扩散生成的边际分布就继承这些对称性。

##### 晶格扩散：DDPM 处理 \(L\)

晶格矩阵 \(L\) 是连续变量，因此 DiffCSP 使用标准 DDPM 前向过程：

$$
q(L_t\mid L_0)=
\mathcal{N}\left(L_t\mid \sqrt{\bar\alpha_t}L_0,\,(1-\bar\alpha_t)I\right)
$$

等价重参数化为：

$$
L_t=\sqrt{\bar\alpha_t}L_0+\sqrt{1-\bar\alpha_t}\epsilon_L,\qquad
\epsilon_L\sim\mathcal{N}(0,I)
$$

反向过程由 denoising model \(\phi\) 预测噪声 \(\hat\epsilon_L(M_t,t)\)：

$$
p(L_{t-1}\mid M_t)=
\mathcal{N}\left(L_{t-1}\mid \mu(M_t),\sigma^2(M_t)I\right)
$$

$$
\mu(M_t)=\frac{1}{\sqrt{\alpha_t}}
\left(L_t-\frac{\beta_t}{\sqrt{1-\bar\alpha_t}}\hat\epsilon_L(M_t,t)\right)
$$

训练损失是噪声预测误差：

$$
\mathcal{L}_{L}=
\mathbb{E}_{\epsilon_L,t}
\left[\left\|\epsilon_L-\hat\epsilon_L(M_t,t)\right\|_2^2\right]
$$

为了保证生成分布对晶格旋转/反射不敏感，\(\hat\epsilon_L\) 要满足 O(3)-等变：

$$
\hat\epsilon_L(QL_t,F_t,A,t)=Q\hat\epsilon_L(L_t,F_t,A,t),\qquad Q^\top Q=I
$$

##### 分数坐标扩散：wrapped normal + score matching

分数坐标 \(F\) 的定义域是 \([0,1)^{3\times N}\)，本质上是由周期性诱导的商空间 \(\mathbb{R}^{3\times N}/\mathbb{Z}^{3\times N}\)。普通高斯 DDPM 的极限分布不适合这个有界环面，因此 DiffCSP 用 wrapped normal 前向扰动：

$$
F_t=w(F_0+\sigma_t\epsilon_F),\qquad \epsilon_F\sim\mathcal{N}(0,I)
$$

其转移密度可写成所有整数镜像的高斯和：

$$
q(F_t\mid F_0)\propto
\sum_{Z\in\mathbb{Z}^{3\times N}}
\exp\left(
-\frac{\|F_t-F_0+Z\|_F^2}{2\sigma_t^2}
\right)
$$

当 \(\sigma_T\) 足够大时，wrapped normal 接近 \(\mathcal{U}(0,1)\)，因此反向采样可从均匀分数坐标开始。坐标分支训练为 score matching：

$$
\mathcal{L}_{F}=
\mathbb{E}_{F_t,t}
\left[
\lambda_t
\left\|
\nabla_{F_t}\log q(F_t\mid F_0)
-\hat\epsilon_F(M_t,t)
\right\|_2^2
\right]
$$

其中 \(\lambda_t\) 用 Monte Carlo 估计做尺度归一化。反向采样结合 ancestral predictor 和 Langevin corrector：predictor 负责沿扩散反向转移推进，corrector 负责用 score 在当前噪声层细化坐标。

> 💡 关键：DiffCSP 没有把周期性当作图构建的后处理，而是直接把坐标空间建模为环面；这让扩散噪声、score 目标和周期平移不变性保持一致。

##### 去噪网络：Fourier 相对分数坐标

DiffCSP 的 denoising model 建在 EGNN 风格消息传递上，但输入边特征不是笛卡尔距离多重边，而是相对分数坐标的 Fourier 展开。第 \(s\) 层可概括为：

$$
m_{ij}^{(s)}=
\varphi_m\left(
h_i^{(s-1)},h_j^{(s-1)},L^\top L,\psi_{\mathrm{FT}}(f_j-f_i),t
\right)
$$

$$
m_i^{(s)}=\sum_j m_{ij}^{(s)},\qquad
h_i^{(s)}=h_i^{(s-1)}+\varphi_h(h_i^{(s-1)},m_i^{(s)})
$$

Fourier 特征可写成：

$$
\psi_{\mathrm{FT}}(\Delta f)=
\left(\sin(2\pi k\Delta f),\cos(2\pi k\Delta f)\right)_{k=1}^{K}
$$

由于 \(\sin/\cos\) 对整数平移周期不变，\(\psi_{\mathrm{FT}}(w(f_j+\tau)-w(f_i+\tau))=\psi_{\mathrm{FT}}(f_j-f_i)\)。晶格分支用全局池化后的节点表示预测 \(\hat\epsilon_l\)，再左乘 \(L\) 得到 O(3)-等变的 \(\hat\epsilon_L=L\hat\epsilon_l\)；坐标分支输出每个原子的 \(\hat\epsilon_F\)，保持周期平移不变。

##### 与 CDVAE 的差异

CDVAE 更像“VAE 先预测聚合属性，固定晶格后用分数网络去噪坐标和类型”；DiffCSP 则把给定组成下的 CSP 看成条件扩散问题，对 \(L\) 和 \(F\) 联合建模。这个联合过程能在生成时同步修正晶胞形状和原子排布，避免坐标去噪被早期晶格预测误差限制。

此外，CDVAE 使用周期多重图处理笛卡尔坐标；DiffCSP 改用分数坐标和 Fourier 相对位置，使周期性成为坐标系统的一部分。论文消融显示，动态多重图在噪声晶格下会带来训练不稳定，而 Fourier 特征帮助模型更快收敛并避免破坏周期平移不变性。

#### 🧪 练习题

```yaml
question: "DiffCSP 为什么不用普通高斯 DDPM 直接扩散分数坐标 F？"
options:
  - "因为分数坐标是离散变量，不能求梯度"
  - "因为分数坐标位于周期环面上，普通高斯不能正确表达模 1 等价和均匀极限"
  - "因为 DDPM 只能用于图像，不能用于材料"
  - "因为晶格矩阵 L 已经包含了所有坐标信息"
answer: 1
explain: "分数坐标的 0 和 1 在周期边界下等价，定义域是商空间/环面。wrapped normal 的镜像求和能保持这种周期性，并在大噪声时接近均匀分布。"
```
