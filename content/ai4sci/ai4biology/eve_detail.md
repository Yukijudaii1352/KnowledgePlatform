### EVE — 用进化序列分布预测人类蛋白变异致病性

```yaml
id: eve
name: EVE
full_name: EVE (EVE)
year: '2021.10'
org: Harvard Medical School
paper_url: https://www.nature.com/articles/s41586-021-04043-8
category: genomics
parent: —
motivation: VAE预测人类基因变异致病性
```

#### 📝 一句话总结

EVE 为每个疾病相关蛋白训练一个基于多序列比对的 Bayesian VAE，学习自然进化允许的蛋白序列分布，再用突变序列相对野生型序列的似然下降来预测 missense variant 的致病性。它不依赖 ClinVar 等临床标签训练，却能为 3,219 个疾病基因的 3,600 多万个变异打分，并给大量 VUS 提供独立证据。

#### 🎯 核心要点

- **无监督变异效应模型**：训练时只使用蛋白家族 MSA，不使用“良性/致病”标签，避免标签稀疏、偏倚和循环验证问题
- **蛋白特异 VAE**：每个目标蛋白单独构建 MSA 并训练 VAE，使模型学习该蛋白家族的位点保守性、共变异和氨基酸可替换模式
- **Bayesian decoder**：编码器参数为点估计，解码器权重使用全因子 Gaussian 后验建模，以采样方式估计预测不确定性
- **Evolutionary index**：用突变序列相对野生型序列的负 log-likelihood ratio 作为变异破坏自然进化分布的程度
- **GMM 校准**：对 evolutionary index 拟合良性/致病两成分 Gaussian mixture，把连续分数转成 pathogenic probability 和 uncertainty
- **大规模覆盖**：论文预测超过 36M 个变异，覆盖 3,219 个 disease genes，并为超过 256k 个 variants of unknown significance 提供分类证据
- **深度突变扫描对齐**：EVE 与多个 high-throughput functional assays 的变异效应趋势一致，并在临床标签预测中接近或超过实验 assay
- **可部署资源**：论文提供 evemodel.org、GitHub 代码、MSA、ClinVar 验证、population frequency 和模型预测结果

#### 🔬 深入细节

##### 模型策略图与可访问来源

![EVE modelling strategy](https://media.springernature.com/lw685/springer-static/image/art%3A10.1038%2Fs41586-021-04043-8/MediaObjects/41586_2021_4043_Fig1_HTML.png)
*图：EVE Nature Fig. 1。流程包括 MSA one-hot 输入、Bayesian VAE 重构蛋白家族序列、用突变/野生型似然比计算 evolutionary index，以及用 Gaussian mixture model 输出致病概率和不确定性。*

可访问来源：论文页面 `https://www.nature.com/articles/s41586-021-04043-8`；Nature 主文为订阅预览，但摘要、图、Extended Data 与补充材料入口可访问。方法级细节还可从官方代码 `https://github.com/OATML-Markslab/EVE`、Zenodo 归档和补充信息获取。

##### 算法伪代码

```python
# EVE 训练与变异评分伪代码
def train_eve_for_protein(wild_type_sequence, homologous_sequences):
    msa = build_and_filter_msa(wild_type_sequence, homologous_sequences)
    x_train = one_hot_encode_msa(msa)  # [num_sequences, L, 20]
    weights = sequence_reweighting(msa, identity_threshold=0.8)

    # Bayesian VAE: encoder q_phi(z|x), decoder p_theta(x|z)
    for step in range(num_updates):
        x = sample_msa_batch(x_train, weights)
        mu_z, logvar_z = encoder_phi(flatten(x))
        z = reparameterize(mu_z, logvar_z)

        theta_sample = sample_decoder_weights(q_theta)  # Bayesian decoder
        logits = decoder_theta(z, theta_sample)         # [L, 20]
        recon = categorical_log_likelihood(x, logits)
        kl_z = kl_normal(mu_z, logvar_z, prior="N(0,I)")
        kl_theta = kl_decoder_posterior_to_prior(q_theta)

        loss = -(recon - kl_z - kl_theta)
        optimizer.step(loss)

    return encoder_phi, q_theta


def evolutionary_index(model_ensemble, wild_type, mutant):
    # Monte Carlo over latent variables and decoder weight posterior
    logp_wt = monte_carlo_log_probability(model_ensemble, wild_type)
    logp_mut = monte_carlo_log_probability(model_ensemble, mutant)
    return -(logp_mut - logp_wt)  # larger means more evolutionarily disfavored


def classify_variants(indices):
    gmm = fit_two_component_gaussian_mixture(indices)
    pathogenic_prob = gmm.posterior(component="pathogenic", x=indices)
    uncertainty = 1.0 - abs(pathogenic_prob - 0.5) * 2.0
    return pathogenic_prob, uncertainty
```

##### 从 MSA 学习“自然允许的蛋白序列”

EVE 的基本假设是：如果一个氨基酸替换在进化中很少被允许，且与该蛋白家族的协同变异模式冲突，那么它更可能破坏蛋白功能并导致疾病。给定某个人类蛋白，EVE 先收集同源序列形成 MSA，把每条序列表示为 \(L \times 20\) 的 one-hot 矩阵，其中 \(L\) 是蛋白长度，20 是标准氨基酸类别。

MSA 中近乎重复的同源序列会让模型过度关注某些物种分支，因此通常需要 sequence reweighting。一个常见写法是：

$$
w_i = \frac{1}{\sum_j \mathbf{1}[\operatorname{ID}(x_i,x_j) > \tau]},
\quad
N_{\text{eff}} = \sum_i w_i
$$

其中 \(\tau\) 是序列相似度阈值。这样，某个进化分支中大量相似序列不会在训练中等价于大量独立证据。

##### Bayesian VAE 架构与 ELBO

EVE 的 VAE 用编码器把输入序列 \(x\) 映射到潜变量分布：

$$
q_\phi(z\mid x)=\mathcal{N}(\mu_\phi(x),\operatorname{diag}(\sigma_\phi^2(x)))
$$

再由解码器从 \(z\) 生成每个位点的氨基酸 categorical distribution：

$$
p_\theta(x\mid z)=\prod_{l=1}^{L}p_\theta(x_l\mid z)
$$

Extended Data 中给出的架构是对称的 3 层 encoder/decoder：encoder 为 2,000-1,000-300，decoder 为 300-1,000-2,000，latent dimension 为 50。输入序列先展平；decoder 输出再经过一维卷积捕获相邻位点氨基酸使用的局部相关，最后 softmax 得到每个位点 20 个氨基酸的概率。

训练目标是最大化 evidence lower bound：

$$
\log p_\theta(x) \ge
\mathbb{E}_{q_\phi(z\mid x)}[\log p_\theta(x\mid z)]
- \operatorname{KL}(q_\phi(z\mid x)\,\|\,p(z))
$$

由于 EVE 使用 Bayesian decoder，解码器权重本身也有后验 \(q(\theta)\)，实际目标还包含权重后验到先验的 KL 项：

$$
\mathcal{L}_{\text{EVE}}
= \mathbb{E}_{q(\theta)q_\phi(z\mid x)}[\log p_\theta(x\mid z)]
- \operatorname{KL}(q_\phi(z\mid x)\,\|\,p(z))
- \operatorname{KL}(q(\theta)\,\|\,p(\theta))
$$

Bayesian decoder 的意义不只是正则化。它让模型可以通过多次采样 decoder weights 和 latent variables 得到一组似然估计，从而为每个变异分数提供不确定性，而不是只输出一个点估计。

##### Evolutionary index：变异越不符合进化分布，分数越高

对某个单氨基酸变异 \(v\)，构造野生型序列 \(x^{\text{wt}}\) 和突变序列 \(x^{v}\)。EVE 的核心分数是 evolutionary index，可写为负 log-likelihood ratio：

$$
E_v
= -\log\frac{p_\theta(x^{v})}{p_\theta(x^{\text{wt}})}
= \log p_\theta(x^{\text{wt}})-\log p_\theta(x^{v})
$$

如果突变序列在模型学到的进化分布下概率显著低于野生型，\(E_v\) 就大，表示该突变更可能破坏功能。论文中对 evolutionary index 的估计会从近似后验采样，并对多个独立训练的 VAE ensemble 做平均，以降低单模型随机性。

这个分数与传统 conservation score 的区别在于：EVE 不只是看单个位点是否保守，还通过 VAE 潜变量和 decoder 学习跨位点共变异。例如某个位点的氨基酸替换单独看似可接受，但如果它没有伴随另一个结构接触位点的补偿性替换，VAE 仍可能给出低似然。

##### GMM 校准与不确定性

Evolutionary index 是连续分数，不直接等于临床标签。EVE 对大量变异的 \(E_v\) 分布拟合两成分 Gaussian mixture model：

$$
p(E)=\pi_b\mathcal{N}(E;\mu_b,\sigma_b^2)
+\pi_p\mathcal{N}(E;\mu_p,\sigma_p^2)
$$

低分成分对应 evolutionarily tolerated/benign，高分成分对应 constrained/pathogenic。给定一个分数，致病概率可由后验责任度表示：

$$
P(\text{pathogenic}\mid E)
=
\frac{\pi_p\mathcal{N}(E;\mu_p,\sigma_p^2)}
{\pi_b\mathcal{N}(E;\mu_b,\sigma_b^2)+\pi_p\mathcal{N}(E;\mu_p,\sigma_p^2)}
$$

当 \(P\) 接近 0.5 时，两个成分重叠，模型会报告更高 uncertainty；当 \(P\) 接近 0 或 1 时，分类更有把握。这个设计很适合临床 VUS 场景，因为它允许“高置信分类”和“不确定，暂不分类”分开处理。

##### 为什么不直接用临床标签监督训练

ClinVar 等数据库中的标签非常稀疏，而且分布偏向被研究得多的疾病基因和已知热点位点。监督模型若直接用这些标签训练，容易学到数据收集偏差，且在评估中可能出现 circularity：同一类证据既参与训练又参与验证。EVE 避开这个问题，把训练信号放在进化序列本身，临床标签只用于事后验证和阈值解释。

与早期 DeepSequence 相比，EVE 的主要工程强化在于面向临床规模的稳定评分、Bayesian uncertainty、GMM 分类和大规模资源发布。它不是替代 ACMG/AMP 规则的单一判据，而是提供一类独立的 computational evidence，尤其适合缺少功能实验和病例统计的 missense variants。

> 💡 关键：EVE 的“监督信号”来自数亿年进化筛选留下的序列分布，而不是人类手工标签。变异越让蛋白序列偏离家族分布，越可能是功能有害的。

#### 🧪 练习题

```yaml
question: "EVE 中 evolutionary index 的核心含义是什么？"
options:
  - "突变序列相对野生型序列在进化 VAE 分布下的似然下降幅度"
  - "ClinVar 中致病标签出现的次数"
  - "蛋白质三维结构中两个原子的欧氏距离"
  - "MSA 中序列数量除以蛋白长度的固定阈值"
answer: 0
explain: "EVE 用突变序列与野生型序列的负 log-likelihood ratio 打分；分数越高，说明突变越不符合进化允许的蛋白家族分布。"
```
