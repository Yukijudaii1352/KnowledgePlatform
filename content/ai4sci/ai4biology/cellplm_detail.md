### CellPLM — 以细胞为 token 的单细胞语言模型

```yaml
id: cellplm
name: CellPLM
full_name: CellPLM (CellPLM)
year: '2024.05'
org: 智源研究院
paper_url: https://openreview.net/forum?id=CellPLM2024
category: single_cell
parent: —
motivation: 细胞级token实现跨物种表征
```

#### 📝 一句话总结

CellPLM 反转了“基因是 token、细胞是句子”的常见设定，把细胞当作 token、组织或 batch 当作句子，用细胞级 masked language modeling 显式建模 cell-cell relations，从而解决 gene-token 模型忽略细胞间关系且推理成本高的问题。

#### 🎯 核心要点

- **细胞语言模型**：从 \(p(X_{i,j}\mid\text{same-cell genes})\) 扩展为 \(p(X_{i,j}\mid\text{all observed cells and genes})\)，使 masked gene expression 可依赖其他细胞
- **细胞作为 token**：每个细胞先由 gene expression embedder 聚合成一个向量，Transformer 在细胞维度做 self-attention
- **联合 scRNA-seq 与 SRT**：同时利用单细胞转录组和 spatially-resolved transcriptomics，SRT 细胞坐标被编码为 2D sinusoidal positional embedding
- **四模块架构**：gene expression embedder、Flowformer/Transformer encoder、Gaussian mixture latent space、batch-aware decoder
- **Gaussian mixture prior**：用混合高斯而非单一各向同性高斯描述潜在空间，贴合细胞群体/功能状态的多簇结构
- **batch-aware decoder**：decoder 输入 latent variable 和 batch/FOV embedding，把批次信息放进生成端以鼓励 latent space 去批次化
- **细胞级掩码预训练**：选择部分细胞并遮盖其部分已测基因，只在各平台实际测到的基因上计算重构损失
- **高推理效率**：由于 self-attention 在细胞 embedding 上进行，而不是在每个细胞的数千个 gene token 上进行，生成 cell embeddings 的速度显著快于 gene-token 模型

#### 🔬 深入细节

##### 模型架构图与可访问来源

![CellPLM ICLR poster](https://iclr.cc/media/PosterPDFs/ICLR%202024/19221.png?t=1714641405.8754995)
*图：ICLR 2024 poster。左侧展示 CellPLM 的预训练框架：scRNA-seq/SRT atlas 输入后，经 gene expression embedder、cell-level Transformer、Gaussian mixture latent space 和 batch-aware decoder 进行 masked reconstruction。*

可访问来源：ICLR 页面 https://iclr.cc/virtual/2024/poster/19221；OpenReview 论文 PDF https://openreview.net/pdf?id=BKXvPDekud；官方代码 https://github.com/OmicsML/CellPLM。任务 YAML 中的 `paper_url` 指向 `CellPLM2024`，实际可访问 ICLR 2024 OpenReview 条目为 `BKXvPDekud`。

##### 算法伪代码

```python
# CellPLM 细胞级 masked language modeling 伪代码
def gene_expression_embedder(X, gene_emb):
    # X: [N_cells, K_genes], normalized + log1p sparse matrix
    # gene_emb[j]: learnable vector h_j
    E = sparse_matmul(X, gene_emb)  # E_i = sum_j X_ij h_j
    return E


def pretrain_cellplm(batch):
    X, measured_mask, batch_id, spatial_xy = batch

    # 只在各数据集实际测到的基因中采样 mask
    M = sample_measured_gene_mask(measured_mask)
    X_tilde = X * M

    E = gene_expression_embedder(X_tilde, gene_emb)
    P = sinusoidal_2d_pe(spatial_xy) if spatial_xy is not None else shared_scrna_pe()
    H = E + P

    # cells are tokens; tissue/FOV/batch is the "sentence"
    for layer in flowformer_layers:
        H = layer(H)

    # mixture posterior q(y|z), q(z|X_tilde)
    pi, mu, sigma = estimate_gmm_params(H)
    y = sample_cluster(pi)
    z = reparameterize(mu[y], sigma[y])

    # batch-aware reconstruction
    b = batch_lookup(batch_id)
    X_hat = mlp_decoder(z + b)

    loss_mse = mse_on_masked_measured_genes(X_hat, X, M, measured_mask)
    loss_cond = kl_qz_to_component_prior(z, y, mu, sigma)
    loss_y = kl_qy_to_mixture_prior(y, pi)
    loss = loss_mse + loss_cond + loss_y
    optimizer.step(loss)
```

##### 为什么要把细胞当作 token

Geneformer、scBERT、scGPT 等模型通常把一个细胞内部的基因看作 token 序列，目标是从同一细胞内的已知基因恢复 masked gene。CellPLM 认为这个类比忽略了单细胞数据的两个事实：第一，scRNA-seq 是 bag-of-genes 矩阵，基因没有自然语言那样的顺序；第二，同一组织内细胞谱系、微环境和细胞通讯会提供强烈的 denoising 与状态识别信号。

传统 gene language model 可写成：

$$
p\left(X_{i,j}\mid \{X_{i,o}:o\in O(i)\}\right),\quad j\in U(i)
$$

其中预测第 \(i\) 个细胞中基因 \(j\) 的表达只依赖同一细胞内其他已观测基因。CellPLM 将条件扩展到整批细胞的未遮盖表达：

$$
p\left(X_{i,j}\mid \{X_{u,v}:(u,v)\in M^C\}\right),\quad (i,j)\in M
$$

这意味着被遮盖表达不仅可由同一细胞的基因上下文推断，也可由相邻或同组织细胞的状态推断。直觉上，如果一批细胞中存在相似谱系或空间邻近细胞，它们应能互相提供缺失表达的先验。

##### Gene Expression Embedder：从 bag-of-genes 到细胞 token

对第 \(i\) 个细胞，CellPLM 为每个基因 \(j\) 维护可学习向量 \(h_j\)，然后按表达值加权求和：

$$
E_i=\sum_{j=1}^{k}X_{i,j}h_j
$$

这里 \(X\in\mathbb{R}^{N\times k}\) 是 cell-by-gene 矩阵，\(E_i\in\mathbb{R}^{d}\) 是第 \(i\) 个 cell token 的初始表达嵌入。由于 scRNA-seq 通常非常稀疏，这一步可用 sparse matrix multiplication 实现，避免对大量零表达基因做无效计算。

对 SRT 数据，模型还将二维空间坐标 \(C_i=(x_i,y_i)\) 编码为 \(P_i\)，形成：

$$
H_i^{(0)}=E_i+P_i
$$

对普通 scRNA-seq 数据，所有细胞共享一个可学习位置向量，以便和 SRT 输入形式统一。这样设计让模型既可学习一般 cell-cell relations，也可利用空间邻近关系捕获局部微环境。

##### Encoder：在细胞维度建模组织上下文

CellPLM 的 Transformer encoder 接收的是 \(N\) 个 cell token：

$$
H^{(\ell)}=\mathrm{TransformerLayer}^{(\ell)}(H^{(\ell-1)})
$$

由于一个组织样本或 batch 可包含上万细胞，普通 \(O(N^2)\) attention 成本较高，论文实现采用线性复杂度的 Flowformer 变体。与 gene-token 模型相比，这个设计的注意力矩阵描述的是 cell-cell relation，而不是 gene-gene relation。

> 💡 关键：CellPLM 的速度优势来自 token 粒度变化。一次前向可为整批细胞生成 embedding，而不是逐细胞处理数千个 gene tokens。

##### Gaussian mixture latent space 与去批次 decoder

单细胞潜在空间通常不是一个单峰高斯，而是由细胞类型、发育阶段、疾病状态等形成多个簇。CellPLM 因此使用混合高斯先验：

$$
p(y_i;\pi)=\mathrm{Multinomial}(\pi)
$$

$$
p(z_i\mid y_i=l)=\mathcal{N}\left(\mu_l,\mathrm{diag}(\sigma_l^2)\right)
$$

$$
p_{\theta}(x_i\mid z_i)=\mathcal{N}\left(f_{\mathrm{dec}}(z_i),\sigma^2I\right)
$$

其中 \(y_i\) 表示隐含细胞簇，\(z_i\) 是连续 latent variable。这个先验比单一高斯更适合保留生物学群体结构；在可视化中也表现为更平滑、更按细胞类型组织的 embedding space。

decoder 使用 latent variable 与 batch embedding：

$$
h^{(0)}=z+b,\quad h^{(\ell)}=\mathrm{FFLayer}^{(\ell)}(h^{(\ell-1)})
$$

把 batch label 提供给 decoder 的思想类似 scVI：技术批次差异由生成端解释，latent space 更专注保存生物状态。最终 decoder 输出 \(H^{(L)}\in\mathbb{R}^{N\times k}\)，用于重构 masked expression。

##### 预训练目标

CellPLM 的目标是 denoising variational lower bound，可拆成重构项、条件先验项和 cluster prior 项：

$$
\mathcal{L}_{\mathrm{CellLM}}
=
\mathcal{L}_{\mathrm{recon}}
-\mathcal{L}_{\mathrm{cond}}
-\mathcal{L}_{Y}
$$

在实现中，重构项用 masked MSE 估计。若 \(M_{i,j}=1\) 表示可见、\(M_{i,j}=0\) 表示 masked，则可写成：

$$
\mathcal{L}_{\mathrm{MSE}}
=
\left\|
(1-M)\odot \left(H^{(L)}-X\right)
\right\|_F^2
$$

总预训练损失为：

$$
\mathcal{L}_{\mathrm{pretrain}}
=
\mathcal{L}_{\mathrm{MSE}}
+\mathcal{L}_{\mathrm{cond}}
+\mathcal{L}_{Y}
$$

论文中特别强调，由于不同测序平台测得的基因数差距很大，mask 和 reconstruction loss 只作用在该数据集中实际 measured genes 上，避免要求模型重构技术上未观测的基因。

##### 与 gene-token foundation model 的区别

| 维度 | Gene-token 模型 | CellPLM |
|------|-----------------|---------|
| token | gene | cell |
| sentence/context | single cell | tissue、FOV 或 batch 中的一组细胞 |
| attention 关系 | gene-gene within cell | cell-cell across sample |
| 空间信息 | 通常不是预训练核心输入 | SRT 2D 坐标作为 positional embedding |
| latent prior | 多为 deterministic embedding 或单峰 VAE | Gaussian mixture prior |
| 主要优势 | gene-level 解释和表达生成自然 | cell embedding 快、显式利用细胞间关系 |

CellPLM 的局限也来自这个选择：它更擅长细胞级表征、聚类、注释、denoising 和空间 imputation，但如果任务需要精细 gene-gene regulatory attention，gene-token 模型的结构更直接。因此它不是简单替代 scGPT/scFoundation，而是把单细胞 foundation model 的建模重点从“细胞内基因语法”推到“组织内细胞语法”。

#### 🧪 练习题

```yaml
question: "CellPLM 为什么把细胞而不是基因作为 Transformer token？"
options:
  - "因为 scRNA-seq 中基因有严格自然语言式顺序"
  - "为了显式建模同一组织或 batch 中的 cell-cell relations，并降低逐细胞 gene-token attention 的推理成本"
  - "为了完全不使用基因表达值"
  - "因为 Gaussian mixture prior 只能用于图像数据"
answer: 1
explain: "CellPLM 认为细胞间关系对单细胞分析很关键，因此先把基因表达聚合成 cell token，再在细胞维度做 attention，同时显著提升生成 cell embeddings 的效率。"
```
