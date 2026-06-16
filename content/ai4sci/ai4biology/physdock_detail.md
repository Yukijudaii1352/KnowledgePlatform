### PhysDock (PhysDock)

```yaml
id: physdock
name: PhysDock
full_name: PhysDock (PhysDock)
year: '2025.04'
org: Zhang et al.
paper_url: https://arxiv.org/abs/2504.12345
category: drug_discovery
parent: diffdock
motivation: 物理势能引导扩散提升对接真实性
```

#### 📝 一句话总结

PhysDock 是面向蛋白-小分子复合物预测的 physics-guided all-atom diffusion 模型，将 AF3 风格的全原子坐标去噪、口袋/关键残基等物理先验条件、配体 conformer library、MMFF94 力场投影和手性检查结合起来，提升 docking 位姿的几何准确性与物理合理性。

#### 🎯 核心要点

- **链接校正**：任务给定 `https://arxiv.org/abs/2504.12345` 实际指向无关城市科学论文；PhysDock 的可访问 DOI 是 `10.1101/2025.04.28.650887`，官方代码为 `https://github.com/KexinZhangResearch/PhysDock`
- **全原子扩散**：不是仅扩散配体平移/旋转/扭转，而是直接在蛋白-配体复合物全原子坐标上做 denoising diffusion
- **蛋白 precision-flexibility**：允许结合口袋残基产生细微构象调整，避免把蛋白视为完全刚体
- **DiffusionConditioning**：整合原子特征、MSA、template、相对位置、token bonds、pocket feature、key residue feature 等条件信息
- **AF3DiT 去噪器**：采用 atom DiT encoder → token DiT → atom DiT decoder 的三段式结构，在原子级和 token 级交替传播几何信息
- **两阶段物理引导**：高噪声阶段用参考 conformer library/刚体对齐约束配体几何；低噪声阶段用 RDKit MMFF94 局部优化修正键长、键角、碰撞和手性问题
- **迭代采样与筛选**：多轮采样、手性检查、接受/拒绝队列、K-means 聚类和代表构象排序，提高多模态位姿探索能力
- **应用场景**：官方仓库支持 redocking、cross docking、blind docking、standard precision flexible docking 和 virtual screening；当前限制是多蛋白链加单个小分子 ligand

#### 🔬 深入细节

![PhysDock Overview](https://raw.githubusercontent.com/KexinZhangResearch/PhysDock/master/figs/PhysDockOverview.png)
*图：PhysDock 官方仓库总览图。由于 bioRxiv 页面在当前环境触发 Cloudflare 限制，图示使用官方 GitHub raw 图片；论文摘要和全文镜像可通过 ScienceCast、Sciety、Semantic Scholar 与 ResearchGate 交叉核对。*

##### 来源说明

PhysDock 的 bioRxiv 页面 `https://www.biorxiv.org/content/10.1101/2025.04.28.650887v1` 在当前环境不可直接抓取全文，但 ScienceCast、Sciety 和 Semantic Scholar 均给出同一 DOI、作者列表和摘要；ResearchGate 提供了可读全文镜像；官方 GitHub 提供代码、模型参数下载、总览图、推理脚本和基准图。因此本文方法细节以官方 GitHub 源码为主，辅以可访问全文镜像中的方法描述。

##### 算法伪代码

```python
# PhysDock inference with physics-guided all-atom diffusion
def physdock_predict(receptor_pdb, ligand_sdf, model, max_rounds=10, steps=40):
    # 1. system preparation
    system = build_system_pkl(receptor_pdb, ligand_sdf)
    msa_feat = search_msa(system.protein_sequence)        # HHsuite / HMMER databases
    plip_key_res = detect_key_residues(system)            # optional interaction priors
    batch = featurize(system, msa_feat, plip_key_res,
                      use_pocket=True, use_key_res=True)

    accepted, rejected = [], []
    ref_conformers = rdkit_embed_conformers(ligand_sdf, num_confs=128)
    gamma_factor = 6.0

    for round_id in range(max_rounds):
        # 2. diffusion conditioning: atom/token/pair representations
        cond = model.diffusion_conditioning(batch)

        # 3. EDM/Karras sampling on all atom coordinates
        x = normal_noise(shape=(num_samples, batch.num_atoms, 3)) * sigma_max
        for sigma_i, sigma_next in karras_schedule(steps, rho=1000):
            x_hat = add_churn_noise(x, sigma_i)
            x_denoised = model.af3_dit_denoise(x_hat, sigma_i, cond)

            if sigma_i > gamma_factor:
                # phase 1: project ligand geometry toward a reference conformer library
                x_proj = align_ligand_to_best_conformer(x_denoised, ref_conformers)
            else:
                # phase 2: local MMFF94 correction for ligand geometry
                x_proj = mmff94_optimize_ligand_atoms(x_denoised, iters=5)

            direction = (x_hat - replace_ligand_part(x_denoised, x_proj)) / sigma_i
            x = x_hat + (sigma_next - sigma_i) * direction

        # 4. chirality check and adaptive retry
        for pose in x:
            if ligand_chirality_ok(pose, ligand_sdf):
                accepted.append(pose)
            else:
                rejected.append(pose)
        gamma_factor = adapt_projection_strength(gamma_factor, accepted)
        if len(accepted) >= target_num_samples:
            break

    # 5. cluster/rank diverse final poses
    poses = accepted if accepted else rejected
    return kmeans_representative_poses(poses, k=5)
```

##### 从 DiffDock 到 PhysDock：为什么要全原子与物理投影

DiffDock 把 docking 建模为配体平移、旋转和扭转自由度上的扩散生成，优点是搜索空间清晰、采样高效；但蛋白一般被近似为刚体，模型主要输出配体位姿。PhysDock 的出发点是：真实结合不仅是配体进入口袋，口袋侧链也会发生细微调整，且配体本身必须满足键长、键角、手性、空间排斥等物理约束。仅靠几何 RMSD 很接近的扩散位姿，仍可能出现不合理手性或局部碰撞。

因此 PhysDock 直接在全原子坐标 \(x \in \mathbb{R}^{N \times 3}\) 上做扩散，覆盖蛋白与 ligand 原子。训练时给真实复合物坐标加噪：

$$
x_\sigma=x_0+\sigma\epsilon,\qquad \epsilon\sim \mathcal{N}(0,I)
$$

去噪网络 \(D_\theta(x_\sigma,\sigma,c)\) 在条件 \(c\) 下预测干净坐标。核心 denoising loss 可简化为：

$$
\mathcal{L}_{\text{diff}}
=\mathbb{E}_{x_0,\sigma,\epsilon}
\left[
w(\sigma)\left\|D_\theta(x_0+\sigma\epsilon,\sigma,c)-\operatorname{Align}(x_0)\right\|_2^2
\lambda_{\text{lddt}}\mathcal{L}_{\text{lDDT}}
\lambda_{\text{dist}}\mathcal{L}_{\text{distogram}}
\lambda_{\text{bond}}\mathcal{L}_{\text{bond}}
\right]
$$

源码中 weighted MSE 使用 EDM 风格权重：

$$
w(\sigma)=\frac{\sigma^2+\sigma_{\text{data}}^2}{(\sigma\sigma_{\text{data}})^2}
$$

并对 DNA、RNA、ligand token 赋予更高权重，其中 ligand 的默认权重增益最大，以强调结合位姿。

##### DiffusionConditioning：把生物与物理先验变成条件

PhysDock 的 `DiffusionConditioning` 分为 AtomEmbedder 与 TokenEmbedder。AtomEmbedder 处理 atom-wise reference features、reference coordinates、atom pair masks 等，构造原子表征 \(a\) 和原子对表征 \(a_p\)。TokenEmbedder 将原子表征下采样到 token/residue 层级，并加入 target features、pocket residue feature、key residue feature、relative position、token bonds、MSA features 和 template pair features。

可抽象为：

$$
(a,a_p)=\operatorname{AtomEmbedder}(f_{\text{atom}},x_{\text{ref}})
$$

$$
(s,z)=\operatorname{TokenEmbedder}(a,\text{MSA},\text{template},\text{pocket},\text{key-res},\text{bonds})
$$

其中 \(s_i\) 是 token 表征，\(z_{ij}\) 是 pair 表征。TokenEmbedder 内部包含 Evoformer、Triangleformer 和 Pairformer，因此继承了 AlphaFold 系列中利用 MSA、三角更新和 pair-biased attention 维持几何一致性的思想。最后，\(s,z\) 会再投影回原子层，补充到 \(a,a_p\) 中，为全原子 DiT 去噪器提供条件。

##### AF3DiT 去噪器：原子级和 token 级交替建模

PhysDock 的 `AF3DiT` 由三段组成：AtomDiffusionTransformer encoder、Token DiffusionTransformer、AtomDiffusionTransformer decoder。它先把 noisy coordinates 通过 EDM preconditioning 缩放：

$$
c_{\text{in}}=\frac{1}{\sqrt{\sigma^2+\sigma_{\text{data}}^2}}, \qquad
c_{\text{noise}}=\frac{\log(\sigma/\sigma_{\text{data}})}{4}
$$

然后把 \(c_{\text{in}}x_\sigma\)、原子条件 \(a\) 和时间嵌入送入 atom-level DiT；中间下采样到 token 级与 \(s,z\) 交互；最后上采样回原子级输出残差。EDM denoised 坐标为：

$$
D_\theta(x_\sigma,\sigma,c)
=c_{\text{skip}}x_\sigma+c_{\text{out}}\,r_\theta(x_\sigma,\sigma,c)
$$

$$
c_{\text{skip}}=\frac{\sigma_{\text{data}}^2}{\sigma^2+\sigma_{\text{data}}^2}, \qquad
c_{\text{out}}=\frac{\sigma_{\text{data}}\sigma}{\sqrt{\sigma^2+\sigma_{\text{data}}^2}}
$$

这种结构避免只在 residue/token 层级预测，再粗糙还原到原子；它让 ligand 原子、口袋侧链原子和远距离原子对都能通过 attention 参与去噪。

##### Karras 采样与两阶段物理引导

PhysDock 采样使用 Karras/EDM 噪声日程。源码默认 \(\rho=1000\)，让低噪声阶段有更密的步长：

$$
\sigma_i=\left(\sigma_{\max}^{1/\rho}+
\frac{i}{N-1}(\sigma_{\min}^{1/\rho}-\sigma_{\max}^{1/\rho})\right)^\rho
$$

每步先进行 stochastic churn：

$$
\hat{\sigma}_i=(1+\gamma_i)\sigma_i,\qquad
\hat{x}_i=x_i+\sqrt{\hat{\sigma}_i^2-\sigma_i^2}\epsilon
$$

普通 EDM 更新方向是：

$$
d_i=\frac{\hat{x}_i-D_\theta(\hat{x}_i,\hat{\sigma}_i,c)}{\hat{\sigma}_i}, \qquad
x_{i+1}=\hat{x}_i+(\sigma_{i+1}-\hat{\sigma}_i)d_i
$$

PhysDock 的关键改动是把 ligand 部分替换为物理投影后的去噪目标 \(P(D_\theta)\)。高噪声阶段，\(P\) 从 RDKit 生成的 reference conformer library 中选择内部距离矩阵最接近当前 ligand 的构象，并做 weighted rigid alignment；低噪声阶段，\(P\) 使用 MMFF94 对 ligand 做少量局部优化。于是 ligand 更新方向变成：

$$
d_i^{\text{lig}}=\frac{\hat{x}_i-P(D_\theta(\hat{x}_i,\hat{\sigma}_i,c))}{\hat{\sigma}_i}
$$

这相当于在扩散轨迹中加入“软物理校正”：早期保证构象族合理，后期修复局部化学错误。源码还会用 RDKit 检查手性，失败样本进入 reject queue；若当前轮通过样本少，会自适应调整 projection 边界并继续采样。

##### 推理、排序与局限

官方仓库的推理先把 receptor `.pdb` 与 ligand `.sdf` 编成 system `.pkl.gz`，再运行 MSA 搜索生成 `msa_feature` 和 `uniprot_msa_feature`。用户可启用 pocket feature、key residue feature、physics correction、ranking 和 sidechain relaxation。最终多个候选 pose 会根据 ligand 之间的 RMSD 距离做 K-means 聚类，选择代表构象作为 top-k 输出。

论文与仓库都强调 PhysDock 在 redocking、cross-docking、CB1/CB2 receptor selectivity 和 NTRK3 virtual screening 上展示实用价值；但它当前主要面向一个小分子 ligand 和一个或多个蛋白链，不是通用多配体、多核酸或肽-蛋白复合物预测器。此外，方法依赖 MSA 数据库、RDKit conformer 生成和 MMFF 投影，推理工程栈比单纯端到端 diffusion docking 更复杂。

> 💡 关键：PhysDock 的“物理引导”不是简单把打分函数接到输出末端，而是把 conformer library 与 MMFF94 作为采样轨迹中的投影算子，逐步改变反向扩散方向。

#### 🧪 练习题

```yaml
question: "PhysDock 相比 DiffDock 的关键方法差异是什么？"
options:
  - "PhysDock 只预测 2D 分子图，不输出三维坐标"
  - "PhysDock 在全原子坐标上做扩散，并在采样中用 conformer library 与 MMFF94 力场投影修正 ligand 几何"
  - "PhysDock 完全删除蛋白结构，只根据 SMILES 做虚拟筛选"
  - "PhysDock 只使用刚体平移和旋转，不处理配体内部构象"
answer: 1
explain: "DiffDock 主要在配体位姿自由度上建模；PhysDock 采用全原子坐标扩散，并把物理投影嵌入反向采样过程，以减少手性、键长键角和碰撞等物理错误。"
```
