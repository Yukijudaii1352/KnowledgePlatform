### CDVAE — 晶体扩散变分自编码器 (Crystal Diffusion Variational AutoEncoder)

```yaml
id: cdvae
name: CDVAE
full_name: "晶体扩散变分自编码器 (Crystal Diffusion Variational AutoEncoder)"
year: "2021"
org: MIT
paper_url: "https://arxiv.org/abs/2110.14810"
category: structure_prediction
parent: —
motivation: "首次将扩散模型引入晶体生成"
```

#### 📝 一句话总结

CDVAE 把周期晶体生成拆成“VAE 潜变量生成组成/晶格/原子数”和“噪声条件分数网络逐步去噪坐标与原子类型”，用退火 Langevin 动力学把随机初始晶体推向稳定结构，解决早期晶体生成模型缺少稳定性归纳偏置和周期对称性处理的问题。

#### 🎯 核心要点

- **VAE + 扩散解码器**：编码真实稳定晶体为潜变量 \(z\)，再由聚合属性预测器输出组成 \(c\)、晶格 \(L\)、原子数 \(N\)，最后用分数网络生成原子坐标和类型
- **周期 PGNN 编码/解码**：使用带周期边界多重图的 SE(3) 等变/不变图网络，显式编码跨晶胞相互作用
- **稳定性归纳偏置**：把真实稳定晶体加噪，再学习去噪方向；生成时分数场类似局部谐振子力场，把坐标推回能量局部极小附近
- **双去噪任务**：坐标分支预测每个原子的 score，类型分支预测真实元素类别，兼顾局部几何稳定性和邻域成键偏好
- **周期最短位移目标**：坐标 score 不直接用 \(X-\tilde X\)，而用跨周期镜像后的最短位移 \(d_{\min}(X,\tilde X)\)，避免等价晶胞表示导致训练目标冲突
- **退火 Langevin 采样**：从预测的组成/晶格约束下随机初始化结构，按噪声从大到小迭代更新坐标并把原子映回晶胞
- **标准基准**：整理 Perov-5、Carbon-24、MP-20 三个数据集，并评估重构、无条件生成、性质优化三类任务

#### 🔬 深入细节

> 来源说明：任务 YAML 给出的 `https://arxiv.org/abs/2110.14810` 实际指向另一篇 HCI 论文。CDVAE 论文的可访问正式来源是 arXiv:2110.06197 和官方代码库 `https://github.com/txie-93/cdvae`，以下方法解读基于这些来源。

![CDVAE 方法总览](https://ar5iv.labs.arxiv.org/html/2110.06197/assets/x2.png)
*图：CDVAE Figure 2。模型先从晶体编码出潜变量，再预测组成、晶格和原子数，随后通过条件分数网络和退火 Langevin 动力学生成周期晶体结构。*

##### 算法伪代码

```python
# CDVAE 训练与生成的核心流程
for crystal M = (A, X, L) in stable_crystal_dataset:
    # 1. VAE 编码：周期多重图 -> 潜变量
    mu, logvar = PGNN_encoder(M)
    z = mu + exp(0.5 * logvar) * normal_noise()

    # 2. 聚合属性预测：组成、晶格参数、原子数
    c_hat = MLP_comp(z)
    L_hat = MLP_lattice(z)
    N_hat = MLP_num_atoms(z)

    # 3. 条件加噪：类型按组成分布扰动，坐标按高斯噪声扰动
    sigma_A, sigma_X = sample_noise_levels()
    A_tilde = perturb_atom_types(A, c_hat, sigma_A)
    X_tilde = X + sigma_X * normal_noise_like(X)

    # 4. 分数解码器：预测周期最短方向和真实元素分布
    score_X, prob_A = PGNN_decoder(A_tilde, X_tilde, L, z, sigma_A, sigma_X)
    loss_dec = mse(score_X, d_min(X, X_tilde) / sigma_X) + atom_ce(prob_A, A)
    loss = loss_agg(c_hat, L_hat, N_hat) + loss_dec + beta * kl_normal(mu, logvar)
    optimizer.step(loss)

# 生成
z = normal_noise()
c, L, N = MLP_agg(z)
A = sample_atom_types(c, N)
X = uniform_points_inside_cell(L, N)
for sigma_A, sigma_X in descending_noise_schedule:
    alpha = eps * sigma_X**2 / sigma_X_min**2
    for step in range(T):
        score_X, prob_A = PGNN_decoder(A, X, L, z, sigma_A, sigma_X)
        X = X + alpha * score_X + sqrt(2 * alpha) * normal_noise_like(X)
        X = back_to_unit_cell(X, L)
        A = sample_or_argmax(prob_A)
return A, X, L
```

##### 动机与背景

晶体结构生成不是普通 3D 点云生成。一个晶体可写成 \(\mathcal{M}=(A,X,L)\)：\(A\) 是原子类型，\(X\in\mathbb{R}^{N\times 3}\) 是原子坐标，\(L\in\mathbb{R}^{3\times 3}\) 是晶格矩阵。它还代表无限周期结构：

$$
\{x_i + k_1 l_1 + k_2 l_2 + k_3 l_3 \mid i=1,\ldots,N,\; k_1,k_2,k_3\in\mathbb{Z}\}
$$

稳定材料只占所有周期排列的极小子空间：坐标和晶格需要接近量子力学能量面的局部极小，元素邻域还要满足复杂成键偏好。早期 voxel、坐标向量或自回归方法通常缺少旋转、平移、置换、周期等不变性，也没有把“从扰动结构回到稳定结构”作为训练目标。

CDVAE 的关键判断是：训练集中的晶体本来就是稳定结构，因此给稳定结构加噪再学习去噪，相当于学习一个把结构推回稳定流形的方向场。这个方向场在坐标上像力场，在元素类型上像局部成键偏好修正器。

##### 模型分解：编码器、聚合属性、分数解码器

CDVAE 的 VAE 部分用周期图神经网络编码晶体：

$$
q_\phi(z\mid M)=\mathcal{N}(\mu_\phi(M),\sigma_\phi^2(M)I),\qquad
z=\mu_\phi(M)+\sigma_\phi(M)\odot\epsilon
$$

解码时并不直接一次性输出所有坐标，而是先预测三个聚合属性：

$$
\hat c,\hat L,\hat N = \mathrm{MLP}_{\mathrm{Agg}}(z)
$$

其中组成 \(c\) 用交叉熵监督，晶格 \(L\) 先经 Niggli reduction 规约成 3 个边长和 3 个夹角，再用回归损失监督，原子数 \(N\) 用分类损失监督。聚合属性约束了后续搜索空间，避免分数网络从完全任意的 100 多元素随机结构开始去噪。

##### 条件分数匹配损失

对真实晶体 \(M=(A,X,L)\)，CDVAE 采样类型噪声 \(\sigma_A\) 和坐标噪声 \(\sigma_X\)。坐标扰动为：

$$
\tilde X \sim \mathcal{N}(X,\sigma_X^2 I)
$$

类型扰动不是简单随机替换，而是用预测组成分布 \(\hat c\) 与真实 one-hot 类型分布 \(p_A\) 混合：

$$
\tilde A \sim \frac{1}{1+\sigma_A}p_A + \frac{\sigma_A}{1+\sigma_A}p_{\hat c}
$$

分数解码器输入 \((\tilde A,\tilde X,L,z,\sigma_A,\sigma_X)\)，输出坐标 score \(s_X\) 和元素概率 \(p_\theta(A)\)。由于晶体坐标有周期等价性，坐标监督目标采用跨镜像后的最短位移：

$$
d_{\min}(x_i,\tilde x_i)=
\min_{k_1,k_2,k_3}
\left(x_i-\tilde x_i+k_1l_1+k_2l_2+k_3l_3\right)
$$

解码器损失可概括为：

$$
\mathcal{L}_{\mathrm{Dec}} =
\frac{1}{2L}\sum_{j=1}^{L}
\mathbb{E}\left[
\left\|s_X(\tilde M\mid z)-\frac{d_{\min}(X,\tilde X)}{\sigma_{X,j}}\right\|_2^2
+\frac{\lambda_a}{\sigma_{A,j}}\mathcal{L}_{a}(p_\theta(A\mid \tilde M,z),p_A)
\right]
$$

总损失为：

$$
\mathcal{L} =
\mathcal{L}_{\mathrm{Agg}}+
\mathcal{L}_{\mathrm{Dec}}+
\beta\,D_{\mathrm{KL}}\left(q_\phi(z\mid M)\,\|\,\mathcal{N}(0,I)\right)
$$

> 💡 关键：CDVAE 的“扩散”不是独立于 VAE 的完整 DDPM，而是把噪声条件分数网络作为 VAE 解码器，用 Langevin 动力学在解码阶段搜索稳定周期结构。

##### 退火 Langevin 动力学与力场直觉

生成时，模型从 \(z\sim\mathcal{N}(0,I)\) 开始预测 \((c,L,N)\)，再随机初始化 \((A_0,X_0)\)。在每个噪声层级 \(j\) 上，用解码器给出的 score 更新坐标：

$$
X_t' = X_{t-1} + \alpha_j s_X(A_{t-1},X_{t-1},L\mid z;\sigma_{A,j},\sigma_{X,j})
+ \sqrt{2\alpha_j}\epsilon_t
$$

$$
X_t = \mathrm{back\_to\_cell}(X_t',L),\qquad
\alpha_j=\epsilon\frac{\sigma_{X,j}^2}{\sigma_{X,L}^2}
$$

论文证明，当噪声足够小时，若分数网络把去噪目标拟合到零误差，则坐标更新中的“力”项近似：

$$
\alpha_j s_X(\tilde A,\tilde X,L\mid z;\sigma_{A,j},\sigma_{X,j})
= -k\,d_{\min}(\tilde X,X)
$$

若扰动小到不跨越周期边界，则退化为普通谐振子力场：

$$
F(\tilde X)=-k(\tilde X-X)
$$

这解释了为什么 CDVAE 的生成过程不像任意坐标采样，而更像在学习数据驱动的局部势能面：坐标被逐步拉回局部平衡位置，元素类型也通过邻域消息传递被拉向合理成键组合。

##### 与此前晶体生成方法的区别

与 voxel-VAE 或直接坐标向量 VAE 相比，CDVAE 明确处理周期多重图和 SE(3) 对称性；与传统 DFT 搜索相比，它不在生成时反复调用昂贵量子计算，而是从稳定结构分布学习低成本先验；与后续 DiffCSP 相比，CDVAE 仍先预测晶格、再在固定晶格下去噪坐标和类型，没有联合扩散晶格和分数坐标，因此在给定组成的 CSP 场景中会被 DiffCSP 进一步改进。

#### 🧪 练习题

```yaml
question: "CDVAE 为什么用周期最短位移 d_min(X, X_tilde) 作为坐标去噪目标？"
options:
  - "为了让所有晶体都转换成正交晶胞"
  - "为了让周期等价的坐标扰动对应同一个去噪方向，避免训练目标冲突"
  - "为了去掉元素类型预测分支"
  - "为了把 Langevin 动力学替换成一次性 MLP 解码"
answer: 1
explain: "晶体中原子跨出晶胞后可由周期镜像表示，同一物理结构有多种坐标写法。d_min 选择跨镜像后的最短位移，使 score 目标与周期等价性一致。"
```
