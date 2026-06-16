### MolGAN — 分子生成对抗网络 (MolGAN)

```yaml
id: molgan
name: MolGAN
full_name: 分子生成对抗网络 (MolGAN)
year: '2018'
org: University of Amsterdam
paper_url: https://arxiv.org/abs/1805.11973
category: generation
parent: —
motivation: 首个图结构GAN支持多目标优化
```

#### 📝 一句话总结

MolGAN 提出直接在分子图空间训练 GAN：生成器一次性输出邻接张量和原子类型矩阵，判别器与奖励网络用 permutation-invariant 的图卷积读取图结构，从而绕开 SMILES 语法和图 likelihood 中昂贵的节点匹配问题。它进一步把 WGAN-GP 与确定性策略梯度式奖励优化结合，使小分子图生成能同时追求真实性和目标化学性质。

#### 🎯 核心要点

- **图结构生成**：分子表示为节点特征矩阵 \(\mathbf{X}\in\mathbb{R}^{N\times T}\) 和边类型邻接张量 \(\mathbf{A}\in\mathbb{R}^{N\times N\times Y}\)
- **一次性非自回归生成**：生成器从高斯噪声 \(\mathbf{z}\) 经 MLP 直接预测完整分子图，而非逐字符或逐节点生成
- **Likelihood-free GAN**：避免图生成 VAE/自回归模型中对节点排列求 likelihood 或图匹配的高成本
- **Improved WGAN 训练**：使用 Wasserstein loss 和 gradient penalty 稳定判别器训练
- **奖励网络 \(\hat R_\psi\)**：学习 RDKit 等外部工具给出的非可微化学性质分数，为生成器提供可微梯度
- **联合目标**：生成器损失为 \(L(\theta)=\lambda L_{WGAN}+(1-\lambda)L_{RL}\)，平衡数据分布拟合和性质优化
- **Relational-GCN 判别器/奖励器**：支持多种键类型，并通过 gated aggregation 聚合为图级表示
- **QM9 设置**：最多 9 个重原子，原子类型为 C/O/N/F/padding，键类型为单键/双键/三键/无键
- **核心缺陷**：虽然有效率高、训练快，但 GAN 和 RL 目标均不显式鼓励多样性，论文报告明显 mode collapse 风险

#### 🔬 深入细节

##### 核心示意图

![MolGAN 模型结构](https://ar5iv.labs.arxiv.org/html/1805.11973/assets/x2.png)
*图：MolGAN 的完整架构。生成器从噪声输出 dense adjacency tensor \(\mathbf{A}\) 和 annotation matrix \(\mathbf{X}\)，经采样得到离散分子图；同一分子图输入判别器和奖励网络，二者都基于 Relational-GCN。来源为 arXiv HTML Figure 2。*

##### 算法伪代码

```python
# MolGAN 训练伪代码
for epoch in range(num_epochs):
    for real_graphs in qm9_loader:
        # ===== 1. 训练判别器 / critic =====
        z = torch.randn(batch_size, 32)
        A_prob, X_prob = generator(z)                 # dense probabilities
        A_fake, X_fake = discretize_or_relax(A_prob, X_prob)

        d_real = discriminator(real_graphs)
        d_fake = discriminator((A_fake, X_fake))
        gp = gradient_penalty(discriminator, real_graphs, (A_fake, X_fake))
        loss_D = -d_real.mean() + d_fake.mean() + alpha * gp
        update(discriminator, loss_D)

        # ===== 2. 训练奖励网络 =====
        with torch.no_grad():
            rdkit_reward = external_reward((A_fake, X_fake))  # invalid graph -> 0
        pred_reward = reward_network((A_fake, X_fake))
        loss_R = mse_loss(pred_reward, rdkit_reward)
        update(reward_network, loss_R)

        # ===== 3. 训练生成器 =====
        z = torch.randn(batch_size, 32)
        A_prob, X_prob = generator(z)
        A_fake, X_fake = differentiable_sample(A_prob, X_prob)  # continuous/Gumbel/ST

        wgan_loss = -discriminator((A_fake, X_fake)).mean()
        rl_loss = -reward_network((A_fake, X_fake)).mean()
        loss_G = lambda_ * wgan_loss + (1 - lambda_) * rl_loss
        update(generator, loss_G)
```

##### 动机与背景

SMILES 生成模型把分子转成字符串，因此 RNN/Transformer 必须同时学习化学语义、SMILES 语法和同一分子多种字符串排列的歧义。图生成模型更接近分子的本体表示，但 likelihood-based 图模型也有难点：邻接矩阵依赖节点顺序，若要对所有等价节点排列求 likelihood，复杂度会迅速爆炸；若做图匹配，训练也很昂贵。MolGAN 的切入点是使用隐式生成模型：GAN 不需要显式 likelihood，因此判别器只要对节点置换不敏感，生成器就不必为每一种节点顺序分配概率。

MolGAN 关注的是小分子图，尤其是 QM9。每个分子被固定到最多 \(N=9\) 个节点，节点 one-hot 表示原子类型，边 one-hot 表示键类型：

$$
\mathbf{X}=[\mathbf{x}_1,\ldots,\mathbf{x}_N]^T\in\mathbb{R}^{N\times T},\qquad
\mathbf{A}_{ij}\in\mathbb{R}^{Y}
$$

在论文实验中 \(T=5\)（C、O、N、F 和 padding），\(Y=4\)（单键、双键、三键和无键）。这种固定尺寸设计让生成器可以用简单 MLP 一次性输出整张图，代价是难以直接扩展到大分子。

##### 生成器：一次性输出分子图

生成器 \(G_\theta\) 输入 \(D=32\) 维标准正态噪声：

$$
\mathbf{z}\sim\mathcal{N}(\mathbf{0},\mathbf{I})
$$

经过隐藏层大小为 \([128,256,512]\) 的 MLP 后，线性投影到节点类型矩阵和边类型张量的尺寸，并在最后一维 softmax，得到每个节点/边的类别概率。生成真实分子时需要把这些概率离散化为 one-hot：

$$
\tilde{\mathbf{X}}_i\sim\mathrm{Cat}(\mathbf{X}_i),\qquad
\tilde{\mathbf{A}}_{ij}\sim\mathrm{Cat}(\mathbf{A}_{ij})
$$

离散采样不可微，因此论文比较了三种训练近似：直接把连续 \(\mathbf{X},\mathbf{A}\) 送入判别器；加入 Gumbel 噪声但仍传连续值；使用 Gumbel-Softmax/straight-through，在前向传播用离散样本，反向传播用连续松弛值。

##### 判别器和奖励网络：Relational-GCN 读取多键图

判别器 \(D_\phi\) 与奖励网络 \(\hat R_\psi\) 架构相同但不共享参数。二者都用 Relational-GCN 处理多种键类型。节点 \(i\) 在第 \(\ell\) 层的更新为：

$$
\mathbf{h}'^{(\ell+1)}_i =
f_s^{(\ell)}(\mathbf{h}^{(\ell)}_i,\mathbf{x}_i)
+ \sum_{j=1}^{N}\sum_{y=1}^{Y}
\frac{\tilde{\mathbf{A}}_{ijy}}{|\mathcal{N}_i|}
f_y^{(\ell)}(\mathbf{h}^{(\ell)}_j,\mathbf{x}_j)
$$

$$
\mathbf{h}^{(\ell+1)}_i=\tanh(\mathbf{h}'^{(\ell+1)}_i)
$$

其中 \(f_y\) 是键类型 \(y\) 专属的仿射变换，\(f_s\) 是 self-connection。多层传播后，用 gated aggregation 得到图级向量：

$$
\mathbf{h}'_{\mathcal{G}} =
\sum_{v\in\mathcal{V}}
\sigma(i(\mathbf{h}^{(L)}_v,\mathbf{x}_v))
\odot
\tanh(j(\mathbf{h}^{(L)}_v,\mathbf{x}_v))
$$

$$
\mathbf{h}_{\mathcal{G}}=\tanh(\mathbf{h}'_{\mathcal{G}})
$$

这个聚合对节点顺序求和，因此天然具有 permutation invariance。判别器输出实数 critic score；奖励网络输出 \((0,1)\) 范围的性质预测值。

##### WGAN-GP 与 RL 联合损失

MolGAN 使用 Improved WGAN。判别器/critic 对一对真实样本 \(\mathbf{x}\) 与生成样本 \(G_\theta(\mathbf{z})\) 的损失为：

$$
L_D =
-D_\phi(\mathbf{x})
+D_\phi(G_\theta(\mathbf{z}))
+\alpha\left(\left\|\nabla_{\hat{\mathbf{x}}}D_\phi(\hat{\mathbf{x}})\right\|-1\right)^2
$$

其中：

$$
\hat{\mathbf{x}}=\epsilon\mathbf{x}+(1-\epsilon)G_\theta(\mathbf{z}),\qquad
\epsilon\sim\mathcal{U}(0,1)
$$

奖励网络通过均方误差拟合外部工具给出的真实奖励：

$$
L_R(\psi)=\left(\hat R_\psi(\mathcal{G})-R(\mathcal{G})\right)^2
$$

对于无效图，由于无法计算化学性质，论文把奖励设为 0。生成器最终优化 WGAN 和 RL 的线性组合：

$$
L_G(\theta)=\lambda L_{WGAN}(\theta)+(1-\lambda)L_{RL}(\theta)
$$

其中 \(\lambda\in[0,1]\) 控制“像训练集”与“高性质分”的权衡。论文还指出奖励网络需要先预训练若干 epoch；否则早期不准确的奖励梯度会把生成器带偏。

> ⚠️ 注意：MolGAN 的“RL”不是 REINFORCE 式采样回报，而是把生成器看作确定性策略，把奖励网络看作可微 critic，从 \(\hat R_\psi(G_\theta(\mathbf{z}))\) 直接反向传播到生成器。

##### 实验结果和方法差异

在 QM9 基准上，MolGAN 与 CharacterVAE、GrammarVAE、GraphVAE 等方法比较，论文报告 MolGAN 的 validity 可达到约 98% 以上，并且在多个单性质优化任务中能比 ORGAN 更快训练。MolGAN 的优势来自两个方面：图表示避免了 SMILES 语法错误；一次性生成避免了序列模型长 rollout 和 REINFORCE 高方差。

但 MolGAN 的弱点也非常明确：唯一性/多样性偏低，容易 mode collapse。论文用 early stopping 和 unique score 阈值作为简单缓解，但没有从目标函数上解决多样性。因此，MolGAN 更像是“图 GAN 分子生成”的早期里程碑：它证明了图空间 GAN + 可微奖励优化可行，但也暴露了 GAN 在离散小化学空间中覆盖分布困难的问题。

#### 🧪 练习题

```yaml
question: "MolGAN 为什么选择 GAN 这类 likelihood-free 方法来生成分子图？"
options:
  - "因为 GAN 可以自动保证所有生成分子都可合成"
  - "因为图 likelihood 需要处理节点排列/图匹配，显式 likelihood 成本很高"
  - "因为 SMILES 不能表示含环分子"
  - "因为奖励网络只能用于字符串模型"
answer: 1
explain: "分子图的邻接矩阵依赖节点顺序，显式 likelihood 需要处理排列不变性。MolGAN 用 GAN 避开 likelihood，并让判别器/奖励器通过图卷积和聚合实现节点置换不变。"
```
