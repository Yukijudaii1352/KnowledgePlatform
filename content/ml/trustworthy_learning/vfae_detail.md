### VFAE — 变分公平自编码器 (Variational Fair Autoencoder)

```yaml
id: vfae
name: VFAE
full_name: 变分公平自编码器 (Variational Fair Autoencoder)
year: 2015
org: University of Amsterdam
paper_url: https://arxiv.org/abs/1511.00830
category: fairness
parent: LFR
motivation: 基于VAE框架通过分解先验和MMD正则化学习对敏感属性不变的公平表示，同时保留标签预测能力
```

#### 📝 一句话总结

VFAE 提出了一种基于半监督变分自编码器的公平表示学习方法，通过在先验分布中强制敏感变量 \(s\) 与隐变量 \(z\) 的统计独立性，并辅以 Maximum Mean Discrepancy (MMD) 正则化匹配不同敏感组的后验分布，在有效去除敏感信息的同时保留对目标标签的预测能力。

#### 🎯 核心要点

- **VAE 框架下的公平表示学习**：将公平性问题建模为学习对敏感变量 \(s\) 不变的隐表示 \(z_1\)，基于变分自编码器实现端到端训练
- **分解先验 (Factorized Prior)**：设计先验 \(p(z_1, s) = p(z_1)p(s)\) 强制隐变量与敏感属性的先验独立性
- **半监督两层隐变量架构**：引入标签 \(y\) 和辅助隐变量 \(z_2\)，生成模型为 \(y, z_2 \to z_1 \to x\)，利用未标注数据提升表示质量
- **MMD 正则化**：对不同敏感组的边际后验 \(q(z_1|s=0)\) 和 \(q(z_1|s=1)\) 施加 MMD 惩罚，防止信息通过标签相关性"泄露"到后验中
- **Random Fourier Features 加速**：使用随机厨房水槽方法将 MMD 计算从 \(O(M^2)\) 降至 \(O(MD)\)，其中 \(D=500\) 为随机特征维度
- **联合训练策略**：当 \(y\) 与 \(s\) 相关时，联合训练分类器和生成模型（而非分开训练）避免退化表示
- **多任务验证**：在公平分类（German/Adult/Health）、域适应（Amazon Reviews）和不变表示学习（Extended Yale B）三类任务上验证有效性

#### 🔬 深入细节

![VFAE 模型架构图](https://arxiv.org/html/1511.00830v2/extracted/figures/model.png)
*图：VFAE 的生成模型（左）与推断模型（右）。生成过程：\(y, z_2 \to z_1 \to x\)，其中 \(s\) 仅在解码器中作为输入，先验中与 \(z_1\) 独立。推断过程：\(x, s \to z_1 \to y \to z_2\)。*

```python
# VFAE 训练伪代码
# 输入: 标注数据 (x_l, s_l, y_l), 未标注数据 (x_u, s_u)
# 超参: alpha (分类权重), beta (MMD 权重)

for epoch in range(num_epochs):
    for (x_l, s_l, y_l), (x_u, s_u) in minibatches:
        # === 标注数据 ELBO (L_s) ===
        z1_l = encoder_z1(x_l, s_l)          # q(z1|x,s)
        y_pred = classifier(z1_l)             # q(y|z1)
        z2_l = encoder_z2(z1_l, y_l)          # q(z2|z1,y)
        x_recon_l = decoder(z1_l, s_l)        # p(x|z1,s)
        
        L_s = recon_loss(x_l, x_recon_l) 
              - KL(q(z1|x,s) || p(z1|z2,y)) 
              - KL(q(z2|z1,y) || p(z2))
        
        # === 未标注数据 ELBO (L_u) ===
        z1_u = encoder_z1(x_u, s_u)
        y_marginal = classifier(z1_u)         # q(y|z1) 枚举所有 y
        # 对所有可能的 y 值求期望
        L_u = sum_y q(y|z1) * [recon + KL terms for each y]
        
        # === MMD 正则化 ===
        z1_all = concat(z1_l, z1_u)
        s_all = concat(s_l, s_u)
        z1_s0 = z1_all[s_all == 0]
        z1_s1 = z1_all[s_all == 1]
        mmd = compute_mmd_rff(z1_s0, z1_s1, D=500)
        
        # === 总损失 ===
        loss = -(L_s + L_u) + alpha * cross_entropy(y_pred, y_l) + beta * mmd
        optimizer.step(loss)
```

**动机与背景**

在机器学习的公平性研究中，核心挑战是：如何学习一个数据表示，使其不包含关于敏感属性（如性别、种族、年龄）的信息，同时仍然保留足够的信息用于下游预测任务？先前工作 LFR (Zemel et al., 2013) 提出了基于聚类的方法，但其局限在于：(1) 聚类表示无法利用分布式表示的表达能力；(2) 仅匹配一阶矩（均值），无法保证高阶矩的一致性，信息仍可能通过方差等高阶统计量泄露。

VFAE 的核心洞察是：变分自编码器的概率框架天然适合建模"不变性"约束——通过设计先验分布的因子化结构，可以在概率意义上强制独立性。

**核心机制一：分解先验实现先验独立**

VFAE 的生成模型设计为：

$$p(\mathbf{x}, \mathbf{z}_1, \mathbf{z}_2, \mathbf{y}, \mathbf{s}) = p(\mathbf{s})p(\mathbf{y})p(\mathbf{z}_2)p_\theta(\mathbf{z}_1|\mathbf{z}_2, \mathbf{y})p_\theta(\mathbf{x}|\mathbf{z}_1, \mathbf{s})$$

关键设计：先验中 \(\mathbf{z}_1\) 仅依赖于 \(\mathbf{z}_2\) 和 \(\mathbf{y}\)，与 \(\mathbf{s}\) 完全独立。而解码器 \(p_\theta(\mathbf{x}|\mathbf{z}_1, \mathbf{s})\) 接收 \(\mathbf{s}\) 作为输入，这意味着 \(\mathbf{s}\) 对 \(\mathbf{x}\) 的影响完全通过解码器的直接路径解释，\(\mathbf{z}_1\) 无需编码任何关于 \(\mathbf{s}\) 的信息。

> 💡 关键：将 \(\mathbf{s}\) 同时输入编码器和解码器，使得模型有一条"捷径"来解释 \(\mathbf{s}\) 对 \(\mathbf{x}\) 的影响，从而减轻 \(\mathbf{z}_1\) 编码 \(\mathbf{s}\) 信息的压力。

**核心机制二：半监督两层隐变量结构**

为了在去除敏感信息的同时保留标签预测能力，VFAE 采用半监督 VAE 架构：

- **推断网络**分解为三部分：
  - \(q_\phi(\mathbf{z}_1|\mathbf{x}, \mathbf{s})\)：从输入编码不变表示
  - \(q_\phi(\mathbf{y}|\mathbf{z}_1)\)：从不变表示预测标签（即分类器）
  - \(q_\phi(\mathbf{z}_2|\mathbf{z}_1, \mathbf{y})\)：捕获给定 \(\mathbf{z}_1\) 和 \(\mathbf{y}\) 后的残余变异

- **标注数据的 ELBO**：

$$\mathcal{L}_s = \mathbb{E}_{q(\mathbf{z}_1|\mathbf{x},\mathbf{s})q(\mathbf{z}_2|\mathbf{z}_1,\mathbf{y})}[\log p_\theta(\mathbf{x}|\mathbf{z}_1, \mathbf{s})] - \text{KL}[q(\mathbf{z}_1|\mathbf{x},\mathbf{s}) \| p_\theta(\mathbf{z}_1|\mathbf{z}_2, \mathbf{y})] - \text{KL}[q(\mathbf{z}_2|\mathbf{z}_1,\mathbf{y}) \| p(\mathbf{z}_2)]$$

- **未标注数据的 ELBO**：将 \(\mathbf{y}\) 视为缺失变量，对所有可能的 \(\mathbf{y}\) 值求期望：

$$\mathcal{L}_u = \sum_y q_\phi(\mathbf{y}=y|\mathbf{z}_1) \cdot \mathcal{L}_s(\mathbf{x}, \mathbf{s}, y)$$

- **联合训练目标**（Eq. 5）：

$$\mathcal{F}_{\text{VAE}} = \mathcal{L}_s + \mathcal{L}_u + \alpha \cdot \log q_\phi(\mathbf{y}|\mathbf{z}_1)$$

> ⚠️ 注意：当 \(\mathbf{y}\) 与 \(\mathbf{s}\) 高度相关时（如在公平分类场景中），必须联合训练分类器和生成模型。若分开训练（如 Kingma et al. 2014），分类器可能学到依赖 \(\mathbf{s}\) 的特征，导致表示退化。

**核心机制三：MMD 正则化防止后验信息泄露**

尽管先验独立性提供了归纳偏置，但近似后验 \(q_\phi(\mathbf{z}_1|\mathbf{s})\) 仍可能因 \(\mathbf{y}\) 与 \(\mathbf{s}\) 的相关性而保留敏感信息。VFAE 引入 MMD 惩罚直接约束后验：

$$\mathcal{F}_{\text{VFAE}} = \mathcal{F}_{\text{VAE}} - \beta \cdot \ell_{\text{MMD}}(\mathbf{Z}_{1_{s=0}}, \mathbf{Z}_{1_{s=1}})$$

其中 MMD 度量两个分布之间的距离：

$$\ell_{\text{MMD}}(\mathbf{X}, \mathbf{X}') = \frac{1}{N_0^2}\sum_{n,m}k(\mathbf{x}_n, \mathbf{x}_m) + \frac{1}{N_1^2}\sum_{n,m}k(\mathbf{x}'_n, \mathbf{x}'_m) - \frac{2}{N_0 N_1}\sum_{n,m}k(\mathbf{x}_n, \mathbf{x}'_m)$$

使用高斯核 \(k(x, x') = e^{-\gamma\|x-x'\|^2}\) 时，MMD 为零当且仅当两个分布完全相同。

**高效计算：Random Fourier Features**

为避免 \(O(M^2)\) 的 Gram 矩阵计算，VFAE 使用随机傅里叶特征近似核函数：

$$\psi_{\mathbf{W}}(\mathbf{x}) = \sqrt{\frac{2}{D}} \cos\left(\sqrt{\frac{2}{\gamma}} \mathbf{x}\mathbf{W} + \mathbf{b}\right)$$

其中 \(\mathbf{W} \in \mathbb{R}^{K \times D}\) 为标准高斯随机矩阵，\(\mathbf{b}\) 为 \([0, 2\pi]\) 均匀随机向量。这将 MMD 计算降至 \(O(MD)\) 复杂度，实验中取 \(D=500\)。

**与 LFR 的关键区别**

| 方面 | LFR (Zemel et al., 2013) | VFAE |
|------|--------------------------|------|
| 表示类型 | 聚类（局部表示） | 连续隐变量（分布式表示） |
| 不变性约束 | 匹配一阶矩（聚类比例） | 先验独立 + MMD（匹配所有矩） |
| 训练方式 | 优化组合目标 | 变分推断 + ELBO |
| 半监督 | 不支持 | 天然支持未标注数据 |
| 生成能力 | 无 | 可生成新样本 |

**实验验证**

在三个公平分类数据集上（Adult: 45,222 样本；German: 1,000 样本；Health: 147,473 样本），VFAE 相比 LFR 和普通 VAE：
- 更有效地去除敏感信息（通过 Random Forest 和 Logistic Regression 预测 \(\mathbf{s}\) 的准确率更接近随机水平）
- MMD 惩罚显著降低了歧视度量（discrimination metric）
- 在域适应（Amazon Reviews 12 个跨域任务）和不变表示学习（Extended Yale B，准确率 84.6% vs 基线 82%）上同样有效

#### 🧪 练习题

```yaml
question: "VFAE 中引入 MMD 正则化的主要原因是什么？"
options:
  - "加速模型训练收敛"
  - "当标签 y 与敏感变量 s 相关时，防止敏感信息通过后验分布泄露到隐表示中"
  - "替代 KL 散度项以获得更紧的变分下界"
  - "使隐变量 z1 的维度自动选择"
answer: 1
explain: "尽管先验独立性提供了归纳偏置，但当 y 与 s 相关时，近似后验 q(z1|s) 仍可能保留 s 的信息。MMD 直接约束不同敏感组的后验分布相匹配，堵住这一泄露通道。"
```