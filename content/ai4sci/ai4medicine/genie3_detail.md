### Genie 3：全原子结构扩散

```yaml
id: genie3
name: Genie 3
full_name: 全原子结构扩散 (Genie 3)
year: '2026.05'
org: Baker Lab
paper_url: https://www.biorxiv.org/content/10.1101/2026.05.05.649431v1
category: generation
parent: rfdiffusion3
motivation: 全原子扩散设计纳摩尔级结合剂
```

#### 📝 一句话总结

Genie 3 是一个全原子 SE(3)-等变蛋白结构扩散模型，通过把蛋白质视为带侧链分支的聚合物、在 single/pair latent 上做强耦合推理，并结合 binder 设计的搜索与迭代条件更新，在无条件生成、motif scaffolding 和 binder design 上推进了等变扩散模型的能力边界。

#### 🎯 核心要点

- **全原子 SE(3)-等变扩散**：不只生成 Cα/backbone，而是把侧链重原子纳入等变结构表示，用 branched polymer/frame tree 表达主链与侧链分支
- **LatentTransformer 主干**：single representation 与 pair representation 每层双向通信，pair 侧使用 triangular multiplicative update，single 侧使用 reduced IPA
- **IPA 结构解码器**：StructureNet 用 Invariant Point Attention、transition 和 backbone/frame update 逐层更新 residue frames，输出结构坐标
- **序列头联合预测**：公开代码包含从 single representation 到 20 种氨基酸 logits 的 SequenceNet，可服务 inverse design 或联合训练信号
- **三类应用**：官方仓库直接支持 unconditional generation、motif scaffolding 和 binder design 三套 CLI 工作流
- **binder 推理增强**：支持 beam search，用 ColabFold reward 在扩散 checkpoint 处筛选轨迹；也支持 iterative design，把前几轮成功界面的统计信息反馈到后续条件
- **训练数据与评估**：官方仓库列出 AlphaFold DB representatives、PiNDER 数据，评估使用 ESMFold/ColabFold、ProteinMPNN、FoldSeek clustering、自一致 RMSD、motif RMSD 和界面 PAE 等指标
- **实验宣称**：公开摘要称 Genie 3 在 binder design、motif scaffolding、unconditional generation 达到 SOTA，并在 Adaptyv Bio Nipah Competition 中设计出 Nipah Glycoprotein G 纳摩尔级 binder，实验成功率 12.5%

#### 🔬 深入细节

![Genie 3 binder design demo](https://raw.githubusercontent.com/aqlaboratory/genie3/main/assets/binder_design_demo.gif)
*图：Genie 3 官方仓库提供的 binder design demo。bioRxiv 页面在当前环境触发 Cloudflare 校验，方法图未能直接读取；此处使用官方 GitHub 可访问资源作为图示来源。*

> 来源说明：任务给定的 bioRxiv URL `10.1101/2026.05.05.649431v1` 未能检索到对应记录；可访问公开来源显示 Genie 3 预印本 DOI 为 `10.64898/2026.05.01.722168v1`，题名为 *Fast and Ultra-Capable Protein Design: Advancing the Frontier Through Atomistic SE(3)-Equivariance with Genie 3*。正文页面受 Cloudflare 阻挡，因此下述解读综合官方 GitHub、作者页面摘要、检索摘要和公开代码结构。

```python
# Genie 3 结构扩散与 binder 设计伪代码
for protein_or_complex in training_data:
    frames_0, atom_coords_0, seq = featurize_all_atom_branched_polymer(protein_or_complex)
    t = sample_timestep()
    atom_coords_t = add_diffusion_noise(atom_coords_0, t)
    single, pair, init_frames = embed(atom_coords_t, seq, t, conditions)

    # LatentTransformer: single <-> pair 双向通信
    for block in latent_transformer:
        single = single + reduced_ipa(single, pair, mask)
        pair = pair + single_to_pair(single)
        pair = pair + triangle_multiplication_outgoing(pair)
        pair = pair + triangle_multiplication_incoming(pair)
        pair = pair_transition(pair)

    # StructureNet: IPA + transition + frame update
    frames = init_frames
    for layer in structure_net:
        single = single + ipa(single, pair, frames, mask)
        single = structure_transition(single)
        frames = compose(frames, backbone_or_branch_update(single))

    pred_coords_0 = frames_to_all_atom_coords(frames)
    seq_logits = sequence_head(single)
    loss = coord_or_fape_loss(pred_coords_0, atom_coords_0) + sequence_ce(seq_logits, seq)
    optimize(loss)

# Binder design 推理
designs = diffuse_conditioned_on_target(target_structure, hotspots_or_interface)
if beam_search:
    designs = keep_top_by_colabfold_reward(designs, checkpoints)
if iterative_design:
    interface_stats = summarize_successful_interfaces(previous_rounds)
    designs = resample_with_updated_interface_condition(interface_stats)
```

**从 Genie/Genie 2 到 Genie 3：重新评估等变性的价值**

早期 Genie 系列强调 SE(3)-等变扩散：输入结构旋转或平移时，模型输出的位移和坐标也按同一刚体变换变化。这类模型数据效率高、推理快，但常被认为在复杂 binder interface、全原子侧链和多 motif 约束上不如更重的全原子非等变或 hallucination 管线。Genie 3 的公开摘要把问题表述为 generation-hallucination gap：hallucination 方法直接优化 AlphaFold/ColabFold 等 oracle，成功率高但计算成本大；扩散生成快但复杂任务成功率不足。

Genie 3 的回答是把等变建模推进到全原子层面，而不是放弃等变性。它将蛋白质表示为 branched polymer：主链是线性聚合物，侧链由残基 frame 派生出分支 frame。这样，结构生成不再只关心 Cα 或 backbone trace，而能把侧链原子和界面几何纳入同一个 SE(3)-一致的坐标系统。等变约束可写为：

$$
\hat{\mathbf{X}}_0(R\mathbf{X}_t+\mathbf{t}, c, t)
=R\hat{\mathbf{X}}_0(\mathbf{X}_t,c,t)+\mathbf{t}
$$

其中 \(\mathbf{X}_t\) 是带噪全原子坐标或 frame 表示，\(c\) 是 motif、target、hotspot/interface 等条件。这个性质减少了模型需要从数据中重新学习全局朝向不变性的负担。

**LatentTransformer：single/pair 的紧耦合几何推理**

公开代码显示，Genie 3 的 `LatentTransformerBlock` 维护两套表示：single \(s_i\) 表示每个 token/residue 的局部状态，pair \(p_{ij}\) 表示 residue pair 的相互关系。每层先用 reduced IPA 把 pair bias 注入 single，再把 single 通过线性投影回写到 pair：

$$
p_{ij}\leftarrow p_{ij}+W_p(W_i s_i+W_j s_j)
$$

随后 pair 侧执行 triangular multiplicative updates：

$$
p_{ij}\leftarrow p_{ij}
+\operatorname{TriMulOut}(p)_{ij}
+\operatorname{TriMulIn}(p)_{ij}
+\operatorname{PairTransition}(p_{ij})
$$

这类三角更新来自 AlphaFold/Evoformer 系列，直觉是让 \(i\)-\(j\) 的关系通过第三个 residue \(k\) 进行一致性校正。对 binder 和 motif scaffolding 来说，界面上的几何约束不是两两独立的：一个 hotspot、一个疏水 patch、一个 backbone 方向会共同约束多对残基关系，pair latent 的三角通信正是为这种高阶一致性服务。

代码还支持 global tokens，用于在长链或复合物设计中携带全局上下文。作者公开摘要称模型能泛化到比训练长度更长的蛋白，这与 global token、pair communication 和等变局部 frame 表示共同相关。

**IPA 结构解码器与全原子 frame 更新**

`StructureNet` 由多层 `StructureLayer` 组成，每层包含 Invariant Point Attention、StructureTransition 和 BackboneUpdate。IPA 的注意力分数同时使用 scalar query/key、pair bias 和点集距离项：

$$
a_{ij}^{h}
=
\frac{q_i^h\cdot k_j^h}{\sqrt{d}}
b_{ij}^h
-\frac{1}{2}\sum_m w_h\left\|T_i q_{i,m}^h-T_j k_{j,m}^h\right\|^2
$$

这里 \(T_i\) 是 residue frame，点查询/键先在局部 frame 中生成，再变换到全局坐标计算距离。因为距离项对全局旋转平移不变，而 frame update 输出在局部坐标中组合，IPA 能在保持 SE(3)-一致性的同时让网络“看见”真实 3D 几何。

Genie 3 的全原子性可以理解为：扩散变量不只是 backbone frame，而是通过 backbone 与 side-chain branch frame 共同决定全原子位置。训练目标可概括为去噪结构误差、局部 frame 对齐误差和序列预测误差的组合：

$$
\mathcal{L}
=
\lambda_{\text{coord}}\|\hat{\mathbf{X}}_0-\mathbf{X}_0\|_2^2
+\lambda_{\text{FAPE}}\mathcal{L}_{\text{FAPE}}
+\lambda_{\text{seq}}\operatorname{CE}(\hat{\mathbf{a}},\mathbf{a})
$$

其中 \(\mathcal{L}_{\text{FAPE}}\) 用局部 frame 度量坐标误差，能减少全局刚体变换对损失的干扰；SequenceNet 则把 single representation 映射到氨基酸 logits。公开仓库的损失工具包含 FAPE/MSE，说明实现层面会同时关心坐标精度和 frame 一致性。

**推理扩展：beam search 与 iterative design**

Genie 3 不只给出一个 denoiser，还把真实设计工作流纳入采样。官方仓库的 binder design 配置支持 beam search：同时展开 \(N\) 条扩散轨迹，在若干 checkpoint 用 ColabFold reward 评估复合物，保留 top \(N\) 继续去噪。这相当于在生成过程中引入外部 oracle，但只在少数节点评估，而不是对每个序列做昂贵的持续优化。

iterative design 则利用前几轮成功设计的共同界面信息更新条件。若 round 0 产生了一批通过过滤器的复合物，后续 round 可以提取 common interface 或按成功频率采样 interface residues，再把这些信息注入条件分布：

$$
p_{\theta}^{(r+1)}(\mathbf{X}\mid T, C_{r+1}),\quad
C_{r+1}=g(C_r,\{\text{successful interfaces}\}_{0:r})
$$

这是一种 inference-time scaling：额外计算不是简单生成更多样本，而是把已发现的成功模式反馈给下一轮采样。对于 binder design，这比无记忆地增加采样数更有效，因为界面热点覆盖、binder pTM、interaction PAE 等过滤条件本身具有强几何约束。

**评估与实验解读**

官方仓库把三类任务拆开评估：无条件生成用 self-consistency RMSD 小于 2 Å 作为 in-silico success；motif scaffolding 同时检查整体 self-consistency 和 motif Cα/backbone/all-atom RMSD；binder design 使用 ColabFold 预测复合物，过滤条件包括 complex self-consistency RMSD、binder pTM、minimum interface PAE 和 hotspot coverage，并用 FoldSeek 聚类衡量多样性。

公开摘要中最具代表性的湿实验结果是 Nipah Glycoprotein G binder：这是结构和生物物理表征较少的四聚体靶标，Genie 3 在 Adaptyv Bio Nipah Competition 中得到纳摩尔级 binder，成功率 12.5%。这说明该方法的价值不只在更低 RMSD 或更好 in-silico 指标，而在于把全原子几何推理、快速等变采样和 oracle-guided 搜索结合成可实际闭环的设计流程。

> ⚠️ 注意：当前环境无法直接读取 bioRxiv 正文，且任务元信息的 `paper_url` 与公开检索到的 DOI 不一致；因此本文对具体图号和论文内部超参数不做臆造，方法机制以官方仓库和公开摘要可核验信息为边界。

#### 🧪 练习题

```yaml
question: "Genie 3 中 LatentTransformer 的核心作用是什么？"
options:
  - "把蛋白结构转换成 SMILES 字符串"
  - "让 single 表示和 pair 表示逐层双向通信，并用三角更新强化几何一致性"
  - "只根据氨基酸频率随机采样序列"
  - "在生成完成后用 OpenBabel 自动补全化学键"
answer: 1
explain: "公开代码显示 LatentTransformer 先用 reduced IPA 更新 single，再将 single 信息写回 pair，并对 pair 做 triangular multiplicative update；这正是复杂 motif 和 binder interface 推理所需的高阶几何一致性机制。"
```
