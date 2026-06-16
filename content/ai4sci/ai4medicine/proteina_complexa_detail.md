### Proteina-Complexa — 蛋白复合物生成

```yaml
id: proteina_complexa
name: Proteina-Complexa
full_name: 蛋白复合物生成 (Proteina-Complexa)
year: '2026.04'
org: NVIDIA
paper_url: https://www.rosettacommons.org/news/next-generation-generative-model-unlocks-de-novo-designs-scale
category: generation
parent: rfdiffusion3
motivation: 比RFdiffusion快30-60倍
```

#### 📝 一句话总结

Proteina-Complexa 提出了一套面向蛋白结合物与蛋白复合物设计的全原子生成框架，把部分潜变量流匹配生成模型与推理时搜索结合起来，解决了纯生成模型速度快但质量不稳、纯 hallucination/优化方法质量高但计算慢的问题。

#### 🎯 核心要点

- **全原子共设计**：同时生成 binder 的骨架、侧链原子坐标和氨基酸序列，减少 RFdiffusion 系列常见的后置 ProteinMPNN 序列重设计依赖
- **部分潜变量表示**：显式建模骨架 \(C_\alpha\) 坐标，将侧链与序列压缩为固定维度 latent，使全原子建模在计算上可扩展
- **基于 La-Proteina 的流匹配先验**：先用自动编码器学习全原子蛋白的 latent，再训练 target-conditioned denoiser 在 \(C_\alpha + z\) 空间中从噪声流向设计分布
- **Teddymer 预训练数据**：从 AlphaFold DB 等单体预测结构中挖掘 domain-domain 交互，构造大规模合成 binder-target pair，用于补足实验复合物数据不足
- **推理时搜索**：在采样轨迹中加入 Best-of-N、beam search 等 reward-guided search，对 ipAE、氢键、碰撞、界面质量等可计算指标做在线筛选
- **多任务扩展**：覆盖蛋白靶标 binder、小分子靶标 binder、motif scaffolding、酶设计、界面氢键优化与 fold class-guided generation
- **大规模实验验证**：NVIDIA 项目页报告对 127 个靶标筛选超过 100 万条设计序列，86/127 个靶标获得 on-design hit，覆盖率约 68%
- **速度动机**：Rosetta Commons 新闻页称其在定制蛋白设计中相对 RFdiffusion 运行快 30-60 倍，核心原因是潜变量生成空间与推理时搜索的结合

#### 🔬 深入细节

![Proteina-Complexa 生成与推理时搜索总览](https://arxiv.org/html/2603.27950v1/x1.png)
*图：Proteina-Complexa 先做 target-conditioned partially latent binder generation，再将中间候选解码、与靶标共折叠/评估，并用 reward-guided search 保留高质量轨迹。来源：论文 HTML 图 1。*

![Proteina-Complexa 模型架构](https://arxiv.org/html/2603.27950v1/x5.png)
*图：模型由自动编码器、target-conditioned denoiser 和 pair-biased Transformer 组成；骨架 \(C_\alpha\) 坐标显式生成，序列与非 \(C_\alpha\) 原子通过 latent 表示生成。来源：论文附录架构图。*

任务给出的 `paper_url` 是 Rosetta Commons 新闻页路径；可访问的技术来源包括 OpenReview/arXiv 预印本 `https://arxiv.org/html/2603.27950v1`、NVIDIA 项目页 `https://research.nvidia.com/labs/genair/proteina-complexa/`、官方博客 `https://developer.nvidia.com/blog/designing-protein-binders-using-the-generative-model-proteina-complexa/` 和代码仓库 `https://github.com/NVIDIA-BioNeMo/Proteina-Complexa`。下面的方法解读以预印本和 NVIDIA 官方材料为主。

```python
# Proteina-Complexa 核心流程伪代码

# 1. 训练全原子自动编码器：把序列和非 Cα 原子压缩到 latent
for protein in atomistic_protein_dataset:
    ca_coords = protein.ca_coords                  # 显式三维骨架
    sidechain_coords = protein.non_ca_atom_coords  # 侧链和其他原子
    sequence = protein.sequence

    q_z = encoder(ca_coords, sidechain_coords, sequence)
    z = sample_gaussian(q_z.mean, q_z.log_scale)
    pred_sequence, pred_atoms = decoder(ca_coords, z)

    recon_loss = ce(pred_sequence, sequence) + mse(pred_atoms, sidechain_coords)
    kl_loss = kl_divergence(q_z, standard_normal())
    ae_loss = recon_loss + beta * kl_loss
    update(encoder, decoder, ae_loss)

# 2. 训练 target-conditioned flow model：在 (Cα, z) 空间学习从噪声到 binder
for target, binder in binder_target_pairs:
    y_data = concat(binder.ca_coords, encoder_latent(binder))
    y_noise = randn_like(y_data)
    t = uniform(0, 1)
    y_t = (1 - t) * y_noise + t * y_data
    target_velocity = y_data - y_noise

    pred_velocity = denoiser(y_t, t, target_structure=target)
    fm_loss = mse(pred_velocity, target_velocity)
    update(denoiser, fm_loss)

# 3. 推理时搜索：生成多条轨迹，在线打分并保留高 reward 候选
beam = [sample_noise_state()]
for step in reversed(time_grid):
    proposals = []
    for state in beam:
        for _ in range(branch_factor):
            next_state = flow_step(denoiser, state, step, target)
            partial_binder = decoder(next_state.ca_coords, next_state.latent)
            complex_pose = cofold_or_score(partial_binder, target)
            reward = score(ipae=complex_pose.ipae,
                           hbonds=complex_pose.interface_hbonds,
                           clashes=complex_pose.clashes,
                           fold_confidence=complex_pose.confidence)
            proposals.append((reward, next_state))
    beam = top_k(proposals, k=beam_width)

final_designs = decode_and_filter(beam)
```

**动机：把生成模型和结构预测反馈统一起来**

蛋白 binder 设计长期存在两类路线：一类是 RFdiffusion 这样的条件生成模型，能从靶标表面快速生成结构，但候选质量受训练分布和单次采样影响；另一类是 BindCraft 式 hallucination/优化方法，利用结构预测模型的界面置信度反复优化序列，质量强但每个靶标需要大量迭代。Proteina-Complexa 的核心判断是：这两类方法不应分开，而应先训练一个强生成先验，再在推理阶段投入可变计算量做 reward-guided search。

**部分潜变量流匹配：为什么不直接在所有原子上扩散**

全原子蛋白设计的难点在于维度太高：每个残基不仅有 \(C_\alpha\) 骨架，还有可变数量的侧链原子和离散氨基酸身份。如果直接在所有原子坐标和序列上做扩散/流匹配，计算和表示都会变重。Proteina-Complexa 采用部分潜变量表示：骨架 \(C_\alpha\) 保持在三维空间中显式生成，序列与非 \(C_\alpha\) 原子由自动编码器压缩为 per-residue latent \(z\)。自动编码器训练目标可概括为：

$$
\mathcal{L}_{\text{AE}}
= \mathbb{E}_{q_\phi(z|x)}
\left[-\log p_\theta(s, x_{\neg C_\alpha}\mid x_{C_\alpha}, z)\right]
+ \beta D_{\mathrm{KL}}\left(q_\phi(z|x)\,\|\,\mathcal{N}(0,I)\right)
$$

其中 \(s\) 是序列，\(x_{\neg C_\alpha}\) 是侧链与其他非 \(C_\alpha\) 原子坐标。直觉上，这相当于只把最关键的几何骨架放在显式坐标空间里搜索，而把局部化学细节交给 latent 表示和解码器恢复。

**流匹配目标：学习从噪声到 binder 分布的速度场**

在训练 denoiser 时，模型不是预测离散步骤的噪声，而是学习连续路径上的速度场。设 \(y=(x_{C_\alpha},z)\) 表示 binder 的部分潜变量状态，\(\epsilon\sim\mathcal{N}(0,I)\) 是噪声，线性插值路径为：

$$
y_t = (1-t)\epsilon + t y,\quad t\in[0,1]
$$

条件流匹配目标可写成：

$$
\mathcal{L}_{\text{FM}}
= \mathbb{E}_{y,\epsilon,t}
\left\|v_\theta(y_t,t,c_{\text{target}}) - (y-\epsilon)\right\|_2^2
$$

其中 \(c_{\text{target}}\) 是靶标结构、热点和任务条件。推理时从噪声初始化 \(y_0\)，沿学习到的速度场积分到 \(y_1\)，再由 decoder 还原完整序列和全原子结构。

**Teddymer：用合成二聚体补足训练数据**

真实高质量 binder-target 复合物数量有限，直接训练大模型容易受数据规模限制。Proteina-Complexa 引入 Teddymer：从大量计算预测的单体蛋白结构中识别 domain-domain interaction，构造合成 binder-target pair，再与 PDB、PLINDER 等实验/整理后的多聚体数据结合。这个数据策略的意义不是简单扩大样本数，而是让模型在预训练阶段见到更多界面几何、靶标表面类型和 binder fold 多样性。

**推理时搜索：在连续 latent 空间中做“可计算奖励”优化**

Proteina-Complexa 的关键差异在推理阶段。普通生成模型一次采样后再筛选；Complexa 在采样中间就解码多个候选，计算界面 reward，然后把高分分支保留下来继续生成。一个典型 reward 可以抽象为：

$$
R(x)
= w_{\text{ipAE}}\big(-\mathrm{ipAE}(x)\big)
+ w_{\text{HB}}\mathrm{HBonds}(x)
- w_{\text{clash}}\mathrm{Clash}(x)
+ w_{\text{conf}}\mathrm{Confidence}(x)
$$

这里 \(\mathrm{ipAE}\) 表示界面预测对齐误差，氢键项鼓励极性界面，碰撞项惩罚不合理原子重叠。论文图中展示的 `f_ipAE`、`f_H-Bond` 等 reward 就是这类可插拔目标。这样做的直觉类似大模型 test-time compute scaling：对于难靶标投入更多搜索分支，而不是只依赖固定成本的一次前向生成。

**与 RFdiffusion/RFdiffusion3 的差异**

RFdiffusion 系列把 binder 设计建模为条件扩散，通常先生成骨架，再用 ProteinMPNN 或类似逆折叠模型补序列，最后用结构预测/界面指标筛选。RFdiffusion3 已经推进到全原子扩散，但仍以扩散采样为主。Proteina-Complexa 则把序列、骨架和侧链放进同一个部分潜变量生成框架，并把搜索过程前移到采样阶段：生成模型提供高质量先验，reward search 在推理时向目标性质偏置。NVIDIA/Rosetta 的 30-60 倍速度说法主要来自这种低维 latent 采样与中间剪枝，而不是把所有原子都逐步优化。

**实验与应用边界**

官方项目页报告，Proteina-Complexa 在 127-target panel 中对超过 100 万条设计进行了 multiplexed phage display 实验筛选，获得 86 个靶标的 on-design hit。项目页还报告它在 PDGFR、Nipah virus、肌肉萎缩相关受体、kinase mini-protein/peptide binder 和 carbohydrate binder 等案例上有湿实验验证。需要注意的是，新闻页和项目页强调的是大规模验证亮点；方法细节、消融和 in-silico benchmark 需要以 OpenReview/arXiv 预印本为准。

#### 🧪 练习题

```yaml
question: "Proteina-Complexa 相比纯生成式 binder 设计模型的核心改进是什么？"
options:
  - "只生成蛋白骨架，再完全依赖人工设计序列"
  - "将流匹配生成先验与推理时 reward-guided search 结合，在采样过程中筛选高质量轨迹"
  - "完全取消结构打分，只用序列语言模型预测结合能力"
  - "把所有原子固定，只优化靶标构象"
answer: 1
explain: "Proteina-Complexa 的关键是把部分潜变量流匹配生成模型和推理时搜索统一起来，用 ipAE、氢键、碰撞等 reward 在生成过程中保留更优分支。"
```
