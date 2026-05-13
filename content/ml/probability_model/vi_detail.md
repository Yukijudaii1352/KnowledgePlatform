### 变分推断 (Variational Inference)

```yaml
id: vi
name: VI
full_name: "变分推断 (Variational Inference)"
year: 1999
org: UC Berkeley
paper_url: "https://www.jmlr.org/papers/volume3/blei03a/blei03a.pdf"
category: core
parent: em
motivation: "将推断问题转化为优化问题"
```

#### 📝 一句话总结

变分推断通过引入一族可调参数的简单分布来近似复杂的后验分布，将贝叶斯推断中的积分难题转化为优化问题（最大化证据下界 ELBO），使得大规模概率模型的学习和推断成为可能。

#### 🎯 核心要点

- **核心思想**：用参数化的变分分布 \(q(\mathbf{z}|\boldsymbol{\lambda})\) 近似难以计算的真实后验 \(p(\mathbf{z}|\mathbf{x})\)，通过最小化两者的 KL 散度完成推断
- **证据下界 (ELBO)**：将对数边际似然分解为 ELBO + KL 散度，最大化 ELBO 等价于最小化 KL 散度
- **平均场近似 (Mean-Field Approximation)**：假设变分分布完全因子化，即 \(q(\mathbf{z}) = \prod_i q_i(z_i)\)，大幅简化优化过程
- **坐标上升变分推断 (CAVI)**：交替更新各因子的变分参数，每步有闭式解，保证 ELBO 单调递增
- **变分 EM 算法**：将变分推断嵌入 EM 框架，E 步更新变分参数，M 步更新模型参数
- **以 LDA 为典型应用**：论文以隐含狄利克雷分配 (LDA) 为载体，系统展示了变分推断在复杂图模型中的完整流程

#### 🔬 深入细节

![LDA 图模型（板记法）](https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Latent_Dirichlet_allocation_model.png/500px-Latent_Dirichlet_allocation_model.png)
*图：LDA 的概率图模型（板记法）。外层板表示 M 篇文档，内层板表示文档中的 N 个词。α 控制文档-主题分布 θ，β 为主题-词分布矩阵，z 为词的主题分配，w 为观测词。*

```python
# 变分推断核心算法伪代码（以 LDA 为例）
# === 变分 EM 算法 ===
def variational_EM(corpus, K, V):
    """
    corpus: 文档集合, K: 主题数, V: 词汇表大小
    """
    # 初始化模型参数
    alpha = random_init(K)          # Dirichlet 先验参数
    beta = random_init(K, V)        # 主题-词分布 (K × V)
    
    while not converged:
        # === E-step: 对每篇文档做变分推断 ===
        for d in corpus:
            gamma_d = alpha + N_d / K       # 初始化变分 Dirichlet 参数
            phi_d = np.ones((N_d, K)) / K   # 初始化变分多项式参数
            
            while not converged_local:
                for n in range(N_d):        # 对文档中每个词
                    for i in range(K):      # 对每个主题
                        # 更新 φ (公式 6)
                        phi_d[n,i] = beta[i, w_dn] * exp(
                            digamma(gamma_d[i]) - digamma(sum(gamma_d))
                        )
                    phi_d[n] /= sum(phi_d[n])  # 归一化
                
                # 更新 γ (公式 7)
                gamma_d = alpha + sum(phi_d, axis=0)
        
        # === M-step: 更新模型参数 ===
        for i in range(K):
            for j in range(V):
                beta[i,j] = sum_d sum_n phi_d[n,i] * I(w_dn == j)
            beta[i] /= sum(beta[i])         # 归一化
        
        # 更新 alpha（牛顿法，见论文附录 A）
        alpha = newton_update(alpha, {gamma_d})
    
    return alpha, beta
```

##### 动机与背景

在贝叶斯概率模型中，核心任务是计算隐变量的后验分布：

$$p(\boldsymbol{\theta}, \mathbf{z} | \mathbf{w}, \boldsymbol{\alpha}, \boldsymbol{\beta}) = \frac{p(\boldsymbol{\theta}, \mathbf{z}, \mathbf{w} | \boldsymbol{\alpha}, \boldsymbol{\beta})}{p(\mathbf{w} | \boldsymbol{\alpha}, \boldsymbol{\beta})}$$

其中分母——**边际似然（evidence）**——需要对所有隐变量求积分/求和：

$$p(\mathbf{w} | \boldsymbol{\alpha}, \boldsymbol{\beta}) = \int p(\boldsymbol{\theta} | \boldsymbol{\alpha}) \left( \prod_{n=1}^{N} \sum_{z_n} p(z_n | \boldsymbol{\theta}) p(w_n | z_n, \boldsymbol{\beta}) \right) d\boldsymbol{\theta}$$

对于 LDA 等复杂模型，由于 \(\boldsymbol{\theta}\) 和 \(\mathbf{z}\) 之间的耦合（coupling），这个积分是**难以处理的（intractable）**。传统的精确推断方法（如消息传递）在此类模型上计算复杂度呈指数增长。

> 💡 **关键直觉**：既然精确计算后验不可行，我们不如找一个"足够好"的近似分布来替代它。变分推断正是将这个**推断问题转化为优化问题**。

##### 核心机制：ELBO 与 KL 散度

变分推断的核心是引入一个参数化的**变分分布** \(q(\boldsymbol{\theta}, \mathbf{z} | \boldsymbol{\gamma}, \boldsymbol{\phi})\) 来近似真实后验。通过 Jensen 不等式，可以将对数边际似然分解为：

$$\log p(\mathbf{w} | \boldsymbol{\alpha}, \boldsymbol{\beta}) = \mathcal{L}(\boldsymbol{\gamma}, \boldsymbol{\phi}; \boldsymbol{\alpha}, \boldsymbol{\beta}) + D_{\text{KL}}\big(q(\boldsymbol{\theta}, \mathbf{z} | \boldsymbol{\gamma}, \boldsymbol{\phi}) \| p(\boldsymbol{\theta}, \mathbf{z} | \mathbf{w}, \boldsymbol{\alpha}, \boldsymbol{\beta})\big)$$

其中 **ELBO（Evidence Lower Bound，证据下界）** 定义为：

$$\mathcal{L}(\boldsymbol{\gamma}, \boldsymbol{\phi}; \boldsymbol{\alpha}, \boldsymbol{\beta}) = \mathbb{E}_q[\log p(\boldsymbol{\theta}, \mathbf{z}, \mathbf{w} | \boldsymbol{\alpha}, \boldsymbol{\beta})] - \mathbb{E}_q[\log q(\boldsymbol{\theta}, \mathbf{z})]$$

由于 KL 散度始终非负（\(D_{\text{KL}} \geq 0\)），ELBO 构成对数边际似然的**下界**。又因为左边 \(\log p(\mathbf{w}|\boldsymbol{\alpha},\boldsymbol{\beta})\) 对变分参数是常数，**最大化 ELBO 等价于最小化 KL 散度**，即让 \(q\) 尽可能接近真实后验 \(p\)。

> ⚠️ **注意**：变分推断最小化的是 \(D_{\text{KL}}(q \| p)\)（前向 KL），而非 \(D_{\text{KL}}(p \| q)\)（反向 KL）。前向 KL 倾向于让 \(q\) 覆盖 \(p\) 的所有模式（mode-covering），但在平均场近似下实际表现为 mode-seeking。

##### 平均场近似与坐标上升

为使优化可行，论文采用**平均场近似（Mean-Field Approximation）**，假设变分分布完全因子化：

$$q(\boldsymbol{\theta}, \mathbf{z} | \boldsymbol{\gamma}, \boldsymbol{\phi}) = q(\boldsymbol{\theta} | \boldsymbol{\gamma}) \prod_{n=1}^{N} q(z_n | \boldsymbol{\phi}_n)$$

其中：
- \(q(\boldsymbol{\theta} | \boldsymbol{\gamma})\) 是参数为 \(\boldsymbol{\gamma}\) 的 Dirichlet 分布
- \(q(z_n | \boldsymbol{\phi}_n)\) 是参数为 \(\boldsymbol{\phi}_n\) 的多项式分布

这一假设**切断了 θ 和 z 之间的依赖关系**，使得原本耦合的推断问题分解为独立的子问题。

通过对 ELBO 关于各变分参数求导并令其为零，得到**坐标上升更新公式**：

**φ 的更新（公式 6）**：

$$\phi_{ni} \propto \beta_{i,w_n} \exp\big(\Psi(\gamma_i) - \Psi(\textstyle\sum_{j=1}^{k} \gamma_j)\big)$$

其中 \(\Psi(\cdot)\) 是 digamma 函数（Γ 函数对数导数）。直觉上，词 \(w_n\) 被分配到主题 \(i\) 的概率取决于两个因素：(1) 该主题生成这个词的概率 \(\beta_{i,w_n}\)；(2) 文档中该主题的预期比例（通过 digamma 函数反映）。

**γ 的更新（公式 7）**：

$$\gamma_i = \alpha_i + \sum_{n=1}^{N} \phi_{ni}$$

直觉上，文档的主题分布参数 = 先验 + 文档中各词对该主题的软分配之和。

这两个更新公式交替迭代直至收敛，每步都保证 ELBO 单调不减，因此算法一定收敛到局部最优。

##### 变分 EM：从推断到学习

单篇文档的变分推断只更新变分参数 \((\boldsymbol{\gamma}, \boldsymbol{\phi})\)。要学习整个语料库的模型参数 \((\boldsymbol{\alpha}, \boldsymbol{\beta})\)，论文将变分推断嵌入 **EM 框架**：

1. **E 步**：对每篇文档 \(d\)，固定 \((\boldsymbol{\alpha}, \boldsymbol{\beta})\)，运行变分推断得到最优的 \((\boldsymbol{\gamma}_d^*, \boldsymbol{\phi}_d^*)\)
2. **M 步**：固定所有文档的变分参数，最大化 ELBO 关于 \((\boldsymbol{\alpha}, \boldsymbol{\beta})\) 的部分

M 步中 β 的更新为：

$$\beta_{ij} \propto \sum_{d=1}^{M} \sum_{n=1}^{N_d} \phi_{d,n,i} \cdot \mathbb{1}(w_{d,n} = j)$$

α 的更新没有闭式解，需要使用牛顿-拉夫森法（Newton-Raphson），利用 Dirichlet 分布的 Hessian 矩阵特殊结构实现高效计算。

##### 与 EM 算法和 MCMC 的对比

| 特性 | EM 算法 | 变分推断 (VI) | MCMC |
|------|---------|--------------|------|
| 后验表示 | 点估计 | 参数化分布 | 样本集合 |
| 适用范围 | 共轭/简单模型 | 广泛 | 理论上任意 |
| 计算效率 | 快 | 较快 | 慢 |
| 精确性 | 仅点估计 | 近似（有偏） | 渐近精确 |
| 收敛判断 | 似然单调 | ELBO 单调 | 困难 |
| 可扩展性 | 好 | 好 | 差 |

变分推断可以看作 EM 的推广：当变分分布退化为点分布时，变分推断退化为 EM 算法。相比 MCMC 方法（如 Gibbs 采样），变分推断牺牲了渐近精确性，但换来了更快的收敛速度和更好的可扩展性，特别适合大规模数据集。

> 💡 **关键洞察**：变分推断的核心贡献在于提供了一个**通用框架**，将任意概率模型的推断问题统一转化为优化问题。这一思想后来深刻影响了 VAE（变分自编码器）、变分 RNN 等深度生成模型的发展。

#### 🧪 练习题

```yaml
question: "在变分推断中，最大化 ELBO 等价于什么操作？"
options:
  - "最大化模型参数的先验概率"
  - "最小化变分分布与真实后验之间的 KL 散度"
  - "最大化观测数据的似然函数"
  - "最小化训练数据的重构误差"
answer: 1
explain: "由于 log p(w) = ELBO + KL(q||p)，且 log p(w) 对变分参数为常数，因此最大化 ELBO 等价于最小化 KL(q||p)，即让变分分布尽可能接近真实后验。"
```