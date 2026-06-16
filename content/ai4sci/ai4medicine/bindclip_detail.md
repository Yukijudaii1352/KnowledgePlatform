### BindCLIP: A Unified Contrastive-Generative Representation Learning Framework for Virtual Screening

```yaml
id: bindclip
name: BindCLIP
full_name: 统一对比-生成式表征 (BindCLIP)
year: '2026.02'
org: Peking University
paper_url: https://arxiv.org/abs/2602.15236
category: screening
parent: drugclip
motivation: 统一对比-生成式表征框架
```

#### 📝 一句话总结

BindCLIP 将 CLIP 式口袋-配体对比学习与口袋条件扩散式 binding pose 生成联合训练，用生成任务提供原子级、姿态级监督，解决纯对比检索 embedding 对细粒度相互作用不敏感、容易依赖捷径特征的问题。

#### 🎯 核心要点

- 继续采用虚拟筛选的双塔检索范式：口袋和配体编码到共享空间，推理阶段仍按 embedding 相似度或 ANN 检索排序。
- 在对比学习之外加入 pocket-conditioned binding pose generation objective，通过扩散去噪重建结合态配体坐标。
- 扩散去噪器只在训练阶段使用，推理阶段不参与筛选，因此不会破坏 DrugCLIP 类方法的高效检索优势。
- 使用口袋和配体编码器的 atom-level embeddings 作为去噪器 FiLM 调制条件，让原子级相互作用信号反向塑造全局 embedding。
- 引入 hard-negative augmentation：为每个正配体挖掘相似但经 Vina 过滤后较不可能强结合的困难负样本。
- 设计 ligand-ligand anchoring regularizer，避免 hard negatives 在对比学习排斥力下坍缩到远离配体流形的无效区域。

#### 🔬 深入细节

##### 图示与来源

![BindCLIP 框架图](https://arxiv.org/html/2602.15236v1/materials/framework.jpg)

*图：BindCLIP 将口袋条件 binding pose 生成、CLIP 式对比学习和 hard-negative augmentation 组合成统一训练框架。公开来源为 arXiv HTML: https://arxiv.org/html/2602.15236v1，论文页: https://arxiv.org/abs/2602.15236。*

##### 核心算法伪代码

```python
# BindCLIP 联合训练伪代码
# Encoders: f_pocket, f_ligand
# Denoiser: phi_d, only used during training

for batch in pocket_ligand_complexes:
    # Positive pairs with resolved binding pose
    pockets = batch.pockets
    ligands_unbound = rdkit_mmff_conformers(batch.ligands)
    binding_pose = batch.ligand_bound_coordinates

    # 1. Hard-negative mining / loading
    hard_negs = []
    for p_i, m_i in zip(pockets, batch.ligands):
        candidates = nearest_neighbors_in_unimol_space(m_i, large_molecule_library)
        candidates = filter_by_vina_score(candidates, pocket=p_i, positive=m_i)
        hard_negs.append(candidates[:k])

    # 2. Encode positives and hard negatives
    z_p, H_p = f_pocket(pockets)             # global and atom-level pocket embeddings
    z_m, H_m = f_ligand(ligands_unbound)     # global and atom-level ligand embeddings
    z_hn, H_hn = f_ligand(hard_negs)

    # 3. Hard-negative contrastive objective
    loss_c_hn = pocket_side_infonce_with_extra_negatives(z_p, z_m, z_hn)
    loss_c_hn += molecule_side_infonce(z_p, z_m)
    loss_c_hn *= 0.5

    # 4. Pocket-conditioned diffusion pose generation
    t = uniform_integer(1, T)
    x_t = add_gaussian_noise(binding_pose, t)
    x0_hat, atom_type_hat = phi_d(x_t, pockets, t, condition=[H_p, H_m])
    loss_d = mse(binding_pose, x0_hat) + lambda_type * cross_entropy(atom_type_hat, atom_types)

    # 5. Ligand-ligand anchoring for hard negatives
    loss_anchor = hinge_anchor(z_m, z_hn, in_batch_ligand_similarities=z_m @ z_m.T)

    loss = loss_c_hn + lambda_d * loss_d + lambda_a * loss_anchor
    update(f_pocket, f_ligand, phi_d, loss)

# Inference: denoiser is discarded
mol_index = build_ann_index({m: normalize(f_ligand(m).z) for m in library})
query = normalize(f_pocket(query_pocket).z)
hits = mol_index.search(query, top_k=k)
```

##### 方法机制

BindCLIP 的核心批判是：DrugCLIP 类纯对比模型虽然高效，但全局 embedding 可能只捕捉粗粒度相关性，例如分子整体物化性质或训练集分布捷径，而不一定真正理解盐桥、供体/受体、羟基遮蔽等局部相互作用变化。虚拟筛选的排序问题恰恰依赖这些微小差异，因此仅让真实配对在 batch 对角线上相似是不够的。

基础检索公式仍然与 CLIP/DrugCLIP 一致。给定口袋 \(p\) 和分子库 \(\mathcal{M}=\{m_1,\ldots,m_n\}\)，口袋编码器与分子编码器输出：

$$
(z,H)=f(\{(v_i,a_i)\}_{i=0}^{N}),\qquad
z\in\mathbb{R}^{d},\;H\in\mathbb{R}^{N\times d}
$$

其中 \(z\) 是 `[CLS]` 全局 embedding，\(H\) 是 atom-level embeddings。推理打分使用余弦相似度：

$$
s(p_i,m_j)
=
\frac{z_{p_i}^{\top}z_{m_j}}
{\|z_{p_i}\|\|z_{m_j}\|}
$$

标准对比损失为：

$$
\mathcal{L}_{p}
=
-\frac{1}{B}\sum_{i=1}^{B}
\log
\frac{\exp(s(p_i,m_i)/\tau)}
{\sum_{j=1}^{B}\exp(s(p_i,m_j)/\tau)}
$$

$$
\mathcal{L}_{m}
=
-\frac{1}{B}\sum_{i=1}^{B}
\log
\frac{\exp(s(p_i,m_i)/\tau)}
{\sum_{j=1}^{B}\exp(s(p_j,m_i)/\tau)}
,\qquad
\mathcal{L}_{c}=\frac{1}{2}(\mathcal{L}_{p}+\mathcal{L}_{m})
$$

BindCLIP 的第一项创新是把 binding pose 生成作为训练期辅助监督。对复合物中的配体结合态坐标 \(\mathbf{x}^{(0)}\in\mathbb{R}^{N_m\times3}\)，扩散前向过程在时间步 \(t\) 加入高斯噪声得到 \(\mathbf{x}^{(t)}\)。反向去噪器 \(\phi_{\theta_d}\) 根据噪声坐标、口袋、时间步以及编码器产生的 atom-level 条件 \((H_p,H_m)\) 预测干净结合姿态：

$$
\hat{\mathbf{x}}^{(0)}
=
\phi_{\theta_d}(\mathbf{x}^{(t)},p,t,H_p,H_m)
$$

去噪器采用 SE(3)-equivariant block，以保持几何变换一致性。每一层中，来自口袋和配体编码器的 atom-level embeddings 被映射为 FiLM 参数，对隐藏状态做逐原子调制：

$$
[\gamma_{\ell,i},\beta_{\ell,i}]
=
g_\ell([H_p;H_m]_i)
$$

$$
h_{\ell,i}
=
\gamma_{\ell,i}\odot \tilde{h}_{\ell,i}
+\beta_{\ell,i}
$$

扩散生成损失包含坐标重建和配体原子类型预测：

$$
\mathcal{L}_{d}
=
\|\mathbf{x}^{(0)}-\hat{\mathbf{x}}^{(0)}\|_2^2
+
\lambda_{\mathrm{type}}\mathrm{CE}(\mathbf{v},\hat{\mathbf{v}})
$$

直觉上，如果 \((H_p,H_m)\) 不包含氢键、疏水接触、排斥冲突等局部相互作用信息，去噪器就无法从 \(\mathbf{x}^{(t)}\) 可靠恢复结合态坐标。因此，生成目标把“能否解释正确结合姿态”变成对编码器的监督信号。由于 Uni-Mol 的 `[CLS]` 全局 token 与 atom-level token 共享注意力和参数，优化 atom-level 条件也会间接塑造用于检索的全局 embedding。

第二项创新是 hard-negative augmentation。对于正样本 \((p_i,m_i)\)，BindCLIP 先在 Uni-Mol 分子 embedding 空间中找与 \(m_i\) 相似的候选，再用 AutoDock Vina 过滤掉 docking score 比正样本更好的候选，降低把潜在真阳性错当负样本的风险。口袋侧 InfoNCE 的分母因此加入额外困难负样本：

$$
\mathcal{L}_{p}^{HN}
=
-\frac{1}{B}\sum_{i=1}^{B}
\log
\frac{\exp(s(p_i,m_i)/\tau)}
{\sum_{j=1}^{B}\exp(s(p_i,m_j)/\tau)
+
\sum_{j=1}^{B\times k}\exp(s(p_i,\tilde{m}_j)/\tau)}
$$

分子侧损失保持不变，组合为：

$$
\mathcal{L}_{c}^{HN}
=
\frac{1}{2}(\mathcal{L}_{p}^{HN}+\mathcal{L}_{m}^{HN})
$$

只加 hard negatives 也会带来问题：这些困难负样本总被当作负类排斥，可能被推到远离分子流形的区域，导致后续梯度失去信息。BindCLIP 因此加入 ligand-ligand anchoring regularizer。令 \(s_i^{hard}\) 表示正配体与其 hard negatives 中最高相似度，\(\bar{s}_i\) 表示正配体与 batch 内其他随机配体的平均相似度，使用 hinge 约束：

$$
\mathcal{L}_{a}
=
\sum_{i=1}^{B}
\max\left(
0,\;
\mathrm{sg}(\bar{s}_i)-s_i^{hard}+\delta
\right)
$$

其中 \(\mathrm{sg}\) 是 stop-gradient。这个正则要求 hard negatives 不要比随机分子还离谱地远，保留“相似但不匹配”的训练价值；同时对比损失仍会把它们与目标口袋区分开。

最终训练目标为：

$$
\mathcal{L}(\theta_p,\theta_m,\theta_d)
=
\mathcal{L}_{c}^{HN}(\theta_p,\theta_m)
+
\lambda_d\mathcal{L}_{d}(\theta_d,\theta_p,\theta_m)
+
\lambda_a\mathcal{L}_{a}(\theta_m)
$$

推理阶段丢弃扩散去噪器，只保留 \(f_{\theta_p}\) 和 \(f_{\theta_m}\)。这使 BindCLIP 的部署成本接近 DrugCLIP：候选分子可离线预编码，在线只需编码查询口袋并做相似度检索。方法上的关键取舍是训练更重，但把姿态级生成监督蒸馏进检索 embedding，从而提高对 OOD 虚拟筛选和近似配体 analogue 排序的敏感性。

#### 🧪 练习题

```yaml
question: "BindCLIP 中扩散式 binding pose generation 的主要作用是什么？"
options:
  - "在推理时为每个候选分子生成最终 docking pose 后再排序"
  - "作为训练期辅助目标，用姿态级监督塑造更关注相互作用的检索 embedding"
  - "替代口袋编码器，使模型只输入配体结构"
  - "把所有 hard negatives 合成为新的正样本"
answer: 1
explain: "BindCLIP 的扩散去噪器只在训练中使用，通过重建结合态坐标和预测原子类型给 atom-level embeddings 提供细粒度监督；推理时仍使用双塔 embedding 检索。"
```
