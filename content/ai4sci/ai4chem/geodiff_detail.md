### GeoDiff — 直接生成 3D 分子构象的几何扩散模型

```yaml
id: geodiff
name: GeoDiff
full_name: 几何扩散模型 (GeoDiff)
year: '2022'
org: Stanford University
paper_url: https://arxiv.org/abs/2203.02923
category: generation
parent: jt_vae
motivation: 首个3D构象生成扩散模型
```

#### 📝 一句话总结

GeoDiff 提出一个面向分子构象生成的几何扩散模型，直接在原子 3D 坐标上学习从噪声到稳定构象的反向 Markov 过程，并用 SE(3) 等变转移核保证生成分布对旋转和平移不敏感。

#### 🎯 核心要点

- **任务定位**：给定 2D 分子图 \(G\)，生成符合 Boltzmann 构象分布的 3D 原子坐标 \(C\)
- **直接坐标建模**：不先预测距离矩阵、键角或扭转角，而是在坐标空间中扩散和去噪
- **热力学扩散直觉**：把原子看作粒子，正向过程逐步加噪破坏构象，反向过程逐步恢复平衡构象
- **不变分布理论**：若初始密度 SE(3) 不变、Markov transition SE(3) 等变，则边缘构象分布天然 SE(3) 不变
- **CoM-free prior**：把坐标移到零质心子空间，在采样和似然中处理平移不变性
- **Graph Field Network (GFN)**：用依赖距离和边类型的不变消息更新节点特征，再用相对方向加权和更新坐标，得到等变噪声场
- **改进训练目标**：从 diffusion ELBO 推出噪声预测损失，并用 alignment 或 chain-rule 构造等变监督信号
- **一阶段采样**：从 CoM-free Gaussian 噪声开始，经反向 Markov kernels 逐步采样 \(C^{T-1},\ldots,C^0\)
- **基准验证**：在 GEOM-QM9 和 GEOM-Drugs 构象生成上用 COV/MAT recall/precision 评估，尤其在大分子上显著优于当时 ML baselines

#### 🔬 深入细节

##### 框架图与可访问来源

![GeoDiff 扩散与反向生成过程](https://ar5iv.labs.arxiv.org/html/2203.02923/assets/x1.png)
*图：GeoDiff Figure 1。正向过程把真实构象逐步扰动为噪声，反向过程从高斯噪声逐步恢复 3D 构象。*

可访问来源：arXiv 论文 https://arxiv.org/abs/2203.02923；ar5iv HTML 图像页 https://ar5iv.labs.arxiv.org/html/2203.02923；官方实现 https://github.com/MinkaiXu/GeoDiff。

##### 算法伪代码

```python
# GeoDiff sampling: conformation generation conditioned on molecular graph G
def geodiff_sample(G, reverse_model, T, alpha, alpha_bar, beta, sigma):
    # Sample initial coordinates from an isotropic Gaussian, then remove CoM.
    C_t = sample_standard_gaussian(shape=(num_atoms(G), 3))
    C_t = C_t - C_t.mean(axis=0, keepdims=True)

    for t in reversed(range(1, T + 1)):
        # Equivariant noise/vector field predicted by Graph Field Network.
        eps_hat = reverse_model.eps_theta(G, C_t, t)
        eps_hat = eps_hat - eps_hat.mean(axis=0, keepdims=True)

        # DDPM-style reverse mean.
        mu = (C_t - beta[t] / sqrt(1 - alpha_bar[t]) * eps_hat) / sqrt(alpha[t])
        mu = mu - mu.mean(axis=0, keepdims=True)

        if t > 1:
            z = sample_standard_gaussian(C_t.shape)
            z = z - z.mean(axis=0, keepdims=True)
            C_t = mu + sigma[t] * z
        else:
            C_t = mu

    return C_t  # generated conformation C^0
```

##### 为什么不能只预测距离或扭转角

分子构象的观测形式是原子坐标，但真实物理性质不依赖整体旋转和平移。早期方法为了规避这个对称性，常把问题改写为预测距离矩阵、键长、键角或 torsion，再通过 distance geometry 或规则流程重建坐标。GeoDiff 指出这类中间变量路线有两个缺陷：训练时模型学习的是间接几何量，采样时还要再解一个坐标重建问题；中间预测误差会在重建过程中累积，距离矩阵甚至可能违反三角不等式。

GeoDiff 的选择是更直接的：在 \(N\times 3\) 坐标矩阵 \(C\) 上做扩散，但让整个反向过程满足几何等变性。这样既避免了中间变量 OOD 问题，又保留了分子构象对刚体变换不敏感的归纳偏置。

##### 正向扩散与反向 Markov 过程

给定真实构象 \(C^0\)，正向过程逐步加入高斯噪声：

$$
q(C^t\mid C^{t-1})=\mathcal{N}\left(C^t;\sqrt{1-\beta_t}C^{t-1},\beta_t I\right)
$$

令 \(\alpha_t=1-\beta_t\)，\(\bar{\alpha}_t=\prod_{s=1}^{t}\alpha_s\)，任意时刻可以直接采样：

$$
q(C^t\mid C^0)=\mathcal{N}\left(C^t;\sqrt{\bar{\alpha}_t}C^0,(1-\bar{\alpha}_t)I\right)
$$

反向生成过程学习：

$$
p_\theta(C^{t-1}\mid G,C^t)=\mathcal{N}\left(C^{t-1};\mu_\theta(G,C^t,t),\sigma_t^2 I\right)
$$

其中 \(\mu_\theta\) 用噪声预测网络 \(\epsilon_\theta\) 参数化：

$$
\mu_\theta(G,C^t,t)=\frac{1}{\sqrt{\alpha_t}}\left(C^t-\frac{\beta_t}{\sqrt{1-\bar{\alpha}_t}}\epsilon_\theta(G,C^t,t)\right)
$$

如果 \(\epsilon_\theta\) 对旋转等变、对平移不变，并且所有坐标都投影到零质心子空间，那么反向 transition 就能保持几何对称性。

##### SE(3) 不变性的构造

GeoDiff 的理论核心可以概括为：从一个 SE(3) 不变的初始密度出发，如果每一步 Markov kernel 都是 SE(3) 等变的，那么任意时刻的边缘密度都是 SE(3) 不变的。分子构象的似然因此不会因为整体旋转或平移而改变。

平移问题通过 CoM-free 系统处理。对坐标矩阵 \(C\)，使用：

$$
\tilde{C}=C-\frac{1}{N}\sum_{i=1}^{N}C_i
$$

即把所有原子坐标移到零质心。旋转问题交给等变网络：如果输入坐标被旋转 \(RC\)，网络输出的噪声场也应变为 \(R\epsilon_\theta(C)\)。这样，反向均值会跟随坐标一起旋转，而不是学习到依赖绝对坐标轴的伪模式。

##### Graph Field Network 的机制

GFN 维护原子特征 \(h_i\) 和坐标 \(x_i\)。一层更新可写为：

$$
m_{ij}=\phi_e\left(h_i,h_j,\|x_i-x_j\|^2,e_{ij},t\right)
$$

$$
h_i'=\phi_h\left(h_i,\sum_{j\in\mathcal{N}(i)}m_{ij}\right)
$$

$$
x_i'=x_i+\sum_{j\in\mathcal{N}(i)}(x_i-x_j)\phi_x(m_{ij})
$$

消息 \(m_{ij}\) 只依赖原子特征、边类型和距离平方，因而对旋转和平移不变；坐标更新由相对方向 \((x_i-x_j)\) 乘以不变标量权重组成，所以整体对旋转等变、对平移不变。邻域 \(\mathcal{N}(i)\) 不只包含化学键，也可包含半径阈值内的非键合原子，从而显式建模长程相互作用。

> 💡 关键：GFN 输出的是“该如何移动每个原子以去噪”的向量场。这个向量场像力场一样指向更稳定的构象区域，但它来自学习到的扩散反向动力学。

##### 训练目标：带几何修正的噪声预测

扩散模型的 ELBO 可以化简为加权噪声回归：

$$
\mathcal{L}_{\text{diff}}=
\mathbb{E}_{t,C^0,\epsilon}
\left[
w_t\left\|\tilde{\epsilon}-\epsilon_\theta(G,C^t,t)\right\|_2^2
\right]
$$

其中 \(C^t=\sqrt{\bar{\alpha}_t}C^0+\sqrt{1-\bar{\alpha}_t}\epsilon\)，\(\tilde{\epsilon}\) 是经过几何处理的监督噪声。普通 DDPM 直接用 \(\epsilon\) 作标签，但 GeoDiff 注意到这个噪声标签本身不一定与 \(C^t\) 等变一致，所以提出两种修正：

- **Alignment approach**：先用 Kabsch alignment 将 \(C^t\) 与 \(C^0\) 对齐，再反推出等变噪声标签
- **Chain-rule approach**：从距离等不变量的 score 出发，通过链式法则得到坐标上的等变噪声向量

这两种训练方式分别对应论文中的 GeoDiff-A 和 GeoDiff-C。实验证据显示 chain-rule 版本通常略优，说明监督信号是否尊重几何对称性会直接影响采样质量。

##### 采样与传统方法对比

采样阶段只需要给定分子图 \(G\)，先从 CoM-free Gaussian 抽取混乱坐标，再迭代应用反向 transition。整个流程没有“先预测距离再求解坐标”的后处理，因此误差不会在中间几何变量和坐标重建之间来回传递。

| 维度 | 距离/角度中间变量方法 | GeoDiff |
|------|----------------------|---------|
| 建模对象 | 距离矩阵、键角、torsion 等 | 原子 3D 坐标 |
| 对称性处理 | 中间变量天然不变 | CoM-free prior + 等变 Markov kernel |
| 训练流程 | 常涉及重建或复杂优化 | 端到端噪声预测 |
| 采样流程 | 预测几何量后求解坐标 | 从噪声直接反向扩散到坐标 |
| 主要风险 | 中间误差累积、无效距离矩阵 | 扩散步数带来采样成本 |

GeoDiff 的意义在于把“3D 构象生成”从工程化几何重建问题转化为一个带物理对称性的概率生成问题，这也是后续等变扩散分子模型的重要起点。

#### 🧪 练习题

```yaml
question: "GeoDiff 为什么要使用 CoM-free Gaussian 和等变 Markov kernels？"
options:
  - "为了减少 SMILES token vocabulary 的大小"
  - "为了让构象生成分布对整体平移和旋转保持不变"
  - "为了把所有分子强制映射到二维平面"
  - "为了跳过正向加噪过程，只训练分类器"
answer: 1
explain: "CoM-free 处理移除平移自由度，等变 transition 保证输入旋转时输出也同步旋转；二者结合使边缘构象密度不依赖绝对坐标系。"
```
