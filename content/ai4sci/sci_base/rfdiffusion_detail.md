### RFdiffusion

```yaml
id: rfdiffusion
name: RFdiffusion
full_name: RoseTTAFold扩散 (RoseTTAFold Diffusion)
year: '2023'
org: Baker Lab/UW
paper_url: https://www.nature.com/articles/s41586-023-06415-8
category: protein_structure
parent: rosettafold
motivation: 扩散模型从噪声生成全新蛋白质
```

#### 📝 一句话总结

RFdiffusion 将 RoseTTAFold 结构预测网络微调为蛋白质骨架扩散模型，从随机残基刚体框架逐步去噪生成可设计的三维蛋白结构，解决了传统蛋白设计方法依赖强约束、输出多样性不足且难以统一处理 binder、motif scaffolding 和对称装配的问题。

#### 🎯 核心要点

- **结构预测网络变生成模型**：以 RoseTTAFold 的等变三维结构推理能力为 denoising network，而不是从零训练一个普通扩散 U-Net
- **残基刚体框架扩散**：每个残基由 \(C_\alpha\) 平移和 \(N-C_\alpha-C\) 方向框架表示，对平移加高斯噪声，对旋转在 \(SO(3)\) 上加噪
- **200 步训练扩散过程**：训练时从 PDB 结构采样并加噪到最多 200 个 timestep，模型学习从 \(X_t\) 预测干净结构 \(\hat{X}_0\)
- **自条件 self-conditioning**：每一步把上一轮的 \(\hat{X}_0^{t+1}\) 作为 template 输入，增强去噪轨迹的连贯性，类似 AlphaFold/RoseTTAFold 的 recycling 思路
- **MSE frame loss**：训练中使用未对齐的 frame MSE，而不是 FAPE，以保持全局坐标框架在连续去噪步骤之间稳定
- **条件生成能力**：可通过 motif 坐标、目标蛋白、hotspot residues、对称性、fold/secondary structure 等条件约束生成
- **结构-序列分离流程**：RFdiffusion 通常先生成骨架，再用 ProteinMPNN 为骨架设计序列，最后用 AlphaFold2/RoseTTAFold 等验证折叠
- **实验验证覆盖广**：论文验证了无条件单体、拓扑约束单体、对称寡聚体、金属结合、酶活性位点 scaffold 和 de novo binder 设计

#### 🔬 深入细节

##### 架构总览

![RFdiffusion 蛋白质设计流程](https://media.springernature.com/lw685/springer-static/image/art%3A10.1038%2Fs41586-023-06415-8/MediaObjects/41586_2023_6415_Fig1_HTML.png)
*图：Nature 论文 Fig. 1，展示 RFdiffusion 如何把 RoseTTAFold 微调为扩散去噪网络，并从随机残基框架迭代生成无条件或条件蛋白骨架。*

论文正文和图像来源为 Nature 文章 `https://www.nature.com/articles/s41586-023-06415-8`；官方代码与推理配置发布在 `https://github.com/RosettaCommons/RFdiffusion`。

##### 核心流程伪代码

```python
# RFdiffusion 推理流程的高层伪代码
def rfdiffusion_sample(length, conditions=None, T=200):
    # X_t: 每个残基的 Cα 坐标和平移/旋转刚体框架
    X_t = sample_random_residue_frames(length)
    x0_prev = None

    for t in reversed(range(1, T + 1)):
        model_input = {
            "noised_frames": X_t,
            "timestep": t,
            "conditions": conditions,      # motif, target, symmetry, hotspots...
            "self_condition": x0_prev,     # previous x0 prediction as template
        }

        x0_hat = rosettafold_denoiser(model_input)
        X_t = reverse_diffusion_step(X_t, x0_hat, t)
        x0_prev = x0_hat

    backbone = x0_prev
    sequences = protein_mpnn_design(backbone, num_samples=8)
    ranked = validate_with_structure_prediction(backbone, sequences)
    return ranked
```

##### 动机：从预测结构到生成结构

RoseTTAFold、AlphaFold2 等模型擅长从序列和模板预测蛋白结构，但蛋白设计问题通常反过来：给定一个功能目标，想找到能折叠成某种骨架、携带某个 motif、或结合某个靶标的全新蛋白。传统 hallucination、inpainting 或 Rosetta 搜索方法常需要较强初始约束；当约束很少时，优化容易陷入有限模式，生成多样性不足。

扩散模型适合这个反问题，因为它从随机噪声出发，每条采样轨迹都可能落到不同的高概率结构。但蛋白质不是普通图像：骨架具有刚体几何、旋转等变性、链连续性、二级结构和长程接触约束。RFdiffusion 的关键判断是：与其从零训练一个扩散网络，不如把 RoseTTAFold 中已经学到的蛋白几何推理能力改造成去噪器。

> 💡 关键：RFdiffusion 的生成能力来自“扩散采样”，而生成结果像蛋白质则很大程度来自 RoseTTAFold 预训练结构网络中的几何先验。

##### 残基框架与前向加噪过程

RFdiffusion 使用每个残基的刚体 frame 表示结构。一个残基 \(i\) 的状态可以写作：

$$
T_i = (R_i, \mathbf{x}_i)
$$

其中 \(\mathbf{x}_i \in \mathbb{R}^3\) 是 \(C_\alpha\) 坐标，\(R_i \in SO(3)\) 由 \(N-C_\alpha-C\) 定义的局部方向框架给出。前向扩散对平移和旋转分别加噪。平移可用标准 DDPM 形式概括：

$$
q(\mathbf{x}_t|\mathbf{x}_0)
=
\mathcal{N}
\left(
\sqrt{\bar{\alpha}_t}\mathbf{x}_0,
(1-\bar{\alpha}_t)\mathbf{I}
\right)
$$

旋转部分不能直接加欧式高斯噪声，因为 \(R_i\) 位于旋转群 \(SO(3)\) 上。论文使用旋转矩阵流形上的 Brownian motion 来扰动方向，使噪声过程保持在合法旋转空间内。这样，模型看到的 \(X_t\) 既包含被扰动的 \(C_\alpha\) 坐标，也包含被扰动的残基朝向。

##### 去噪网络与训练目标

在 timestep \(t\)，RFdiffusion 接收加噪结构 \(X_t\)、条件信息 \(c\) 和可选的上一轮自条件 \(\hat{X}_0^{t+1}\)，输出当前对干净结构的预测：

$$
\hat{X}_0^t
=
f_\theta(X_t, t, c, \hat{X}_0^{t+1})
$$

训练目标是让 \(\hat{X}_0^t\) 接近原始 PDB 结构 \(X_0\)。论文强调这里使用 frame prediction 与真实结构之间的 MSE，且不做全局对齐：

$$
\mathcal{L}_{frame}
=
\frac{1}{N}
\sum_{i=1}^{N}
\left\|
\hat{\mathbf{x}}_{0,i}
-
\mathbf{x}_{0,i}
\right\|_2^2
+
\lambda_R
d_{SO(3)}(\hat{R}_{0,i},R_{0,i})^2
$$

上式是便于理解的简化写法，表示平移和旋转 frame 都要接近真实值。它不同于结构预测中常用的 FAPE：FAPE 对全局旋转平移不敏感，而 RFdiffusion 的未对齐 MSE 会鼓励去噪轨迹在同一个全局参考系中连续演化，便于从 \(X_t\) 逐步插值到 \(\hat{X}_0\)。

反向采样时，模型不会直接把 \(\hat{X}_0^t\) 当作最终结果，而是按扩散后验从 \(X_t\) 朝 \(\hat{X}_0^t\) 移动并加入适量噪声：

$$
X_{t-1}
\sim
p_\theta(X_{t-1}|X_t)
\approx
\mathcal{N}
\left(
\mu_\theta(X_t,\hat{X}_0^t,t),
\sigma_t^2 I
\right)
$$

这种“预测干净结构，再生成下一步 noisy structure”的方式让采样既能收敛到蛋白质分布，又保留随机性和多样性。

##### Self-conditioning：让生成轨迹更连贯

RFdiffusion 的一项重要训练/推理策略是 self-conditioning。图示中每个 timestep 的网络不仅接收当前 noisy frames \(X_t\)，还把上一 timestep 预测的 \(\hat{X}_0^{t+1}\) 作为 template 输入。这类似 AlphaFold2 和 RoseTTAFold 的 recycling：模型不是每一步都从头猜完整结构，而是在上一轮粗预测基础上修正。

self-conditioning 的好处在蛋白设计中很直观。早期 timestep 的结构非常嘈杂，模型只能给出宽泛的折叠倾向；随着 \(t\) 变小，上一轮 \(\hat{X}_0\) 已经包含二级结构、链走向和长程接触，下一轮可以专注于消除局部冲突、改善 packing 和满足条件约束。论文报告 self-conditioning 明显提升了无条件和条件设计任务的 in silico 成功率。

##### 条件生成：同一个模型处理多类设计任务

RFdiffusion 的条件信息 \(c\) 可以落在多个层级。motif scaffolding 固定一小段功能残基的坐标，要求模型生成其余骨架来稳定展示该 motif；binder design 提供靶蛋白结构和 hotspot residues，要求新链在指定界面附近形成结合面；对称设计把 \(C_n\)、\(D_n\) 等对称约束施加到生成结构；fold conditioning 则用二级结构或 block adjacency 限定拓扑。

这些任务都可以被写成条件扩散：

$$
p_\theta(X_0|c)
=
\int
p(X_T)
\prod_{t=1}^{T}
p_\theta(X_{t-1}|X_t,c)
\mathrm{d}X_{1:T}
$$

条件越强，采样空间越窄；条件越弱，模型越依赖 RoseTTAFold 几何先验和 PDB 学到的结构分布。与确定性 inpainting 相比，扩散的随机初始化和噪声注入允许针对同一 motif 或 target 生成多条不同骨架方案。

##### 结构到序列：为什么还需要 ProteinMPNN

RFdiffusion 主要生成 backbone，而不是直接输出最终氨基酸序列。论文流程通常在骨架生成后使用 ProteinMPNN 设计序列，每个骨架采样多条序列，再用结构预测模型筛选是否能折叠回目标骨架或形成目标复合物。这个分工降低了问题难度：RFdiffusion 专注学习可设计的几何骨架，ProteinMPNN 专注解决“哪些序列能编码这个骨架”。

实际设计流程可概括为：

```python
for backbone in rfdiffusion_backbones:
    seqs = protein_mpnn(backbone, n=8)
    for seq in seqs:
        pred = alphafold_or_rosettafold(seq, optional_target)
        score = evaluate_backbone_match_and_interface(pred, backbone)
        keep_if(score.pae_low and score.rmsd_low and score.interface_good)
```

这种 pipeline 也解释了 RFdiffusion 的实验验证方式：in silico 成功只是第一步，论文进一步对数百个设计进行实验表征，覆盖对称装配、金属结合蛋白和靶标 binder，并用冷冻电镜结构验证了部分设计与模型高度一致。

##### 与 RoseTTAFold/传统设计方法的区别

RoseTTAFold 原本是判别式结构预测模型：给定序列、MSA、模板等输入，输出结构。RFdiffusion 则把“输入结构被加噪，输出干净结构”作为训练任务，使模型学会从随机 frame 分布回到蛋白质骨架分布。相较于 RFjoint inpainting，RFdiffusion 不是一次性补全，而是通过多步去噪逐渐形成全局 fold，因此在弱约束和需要多样性的任务上更稳健。

与纯能量搜索或手工 Rosetta 设计相比，RFdiffusion 把 PDB 中的结构统计和 RoseTTAFold 的几何推理压缩进神经去噪器，能在较短时间内探索大量候选骨架。它的局限也来自这一点：模型生成的是训练分布和条件约束下“看起来可设计”的结构，最终功能、稳定性、表达和结合仍需 ProteinMPNN、结构预测、物理筛选和实验验证共同闭环。

#### 🧪 练习题

```yaml
question: "RFdiffusion 中 self-conditioning 的主要作用是什么？"
options:
  - "把蛋白质序列翻译成 DNA 序列"
  - "将上一去噪步骤预测的干净结构作为当前步骤输入，使扩散轨迹更连续、更容易逐步细化"
  - "强制所有生成蛋白都具有同一种对称性"
  - "用 FAPE 完全替代扩散模型的反向采样"
answer: 1
explain: "RFdiffusion 在每个 timestep 接收上一轮的 \\(\\hat{X}_0\\) 预测作为 template，类似 recycling，让后续步骤在已有粗结构上继续修正。"
```
