### RFdiffusion3 — 全原子约束下的蛋白质生成设计模型

```yaml
id: rfdiffusion3
name: RFdiffusion3
full_name: RFdiffusion3 (RFdiffusion All-Atom)
year: '2025.12'
org: Baker Lab
paper_url: https://www.bakerlab.org/2025/12/03/rfdiffusion3-now-available/
category: protein_design
parent: rfdiffusion
motivation: 全原子精度蛋白质设计
```

#### 📝 一句话总结

RFdiffusion3 将 RFdiffusion 从残基/骨架级生成推进到全原子级生成，把蛋白质骨架、侧链以及配体、DNA/RNA 等非蛋白原子放在同一个扩散框架中建模。它用原子级条件、轻量化 Transformer U-Net 和 classifier-free guidance，在更低计算成本下完成小分子结合、DNA 结合、酶活性位点 scaffolding 与对称蛋白设计。

#### 🎯 核心要点

- **全原子扩散单位**：每个残基统一表示为 4 个 backbone atom + 10 个 side-chain atom；较小侧链用放在 \(C_\beta\) 的 virtual atoms 补齐
- **统一生物分子上下文**：可在配体、核酸、蛋白结合伙伴、催化基团等任意非蛋白原子环境中生成新蛋白
- **轻量架构**：采用 downsampling → sparse transformer → upsampling 的 U-Net 式扩散模块，把 AF3 类 Pairformer 从 48 层缩到 2 层，最终约 168M 可训练参数
- **原子-残基双尺度交换**：通过稀疏 attention 和 cross-attention 在 atom features 与 token/residue features 间上下采样，只让几何邻近的原子/残基高效交互
- **丰富约束条件**：支持固定 motif 坐标、未编号 catalytic motif、氢键 donor/acceptor、ligand atom burial/RASA、目标相对质心、蛋白-DNA 共生成和对称噪声
- **classifier-free guidance**：每步同时做有条件和无条件前向，通过加权组合增强复杂条件满足率
- **训练数据与流程**：在 PDB 复合物、蛋白-小分子、蛋白-DNA、功能 motif scaffolding 和高质量 AF2 distillation 结构上训练，PDB 数据覆盖至 2024 年 12 月
- **结果亮点**：典型长度上比 RFdiffusion2 约快 10 倍；无条件生成 98% 设计可被 AF3 预测回 1.5Å 内；AME enzyme benchmark 上 37/41 个案例优于 RFD2；湿实验中 5 个 DNA binder 测到 1 个低微摩尔结合，190 个 cysteine hydrolase 设计测到 35 个多周转催化剂

#### 🔬 深入细节

##### 来源与框架图

![RFdiffusion3 all-atom design overview](https://cdn.ncbi.nlm.nih.gov/pmc/blobs/ff5c/12642843/0eefa14d2742/nihpp-2025.09.18.676967v2-f0001.jpg)
*图：RFdiffusion3 论文 Figure 1。图中展示 100 步全原子扩散轨迹、生物分子相互作用生成、模型架构以及相对 RFdiffusion 前代的推理速度。*

任务给出的 `paper_url` 是 IPD/Baker Lab 新闻页；方法级细节可追溯到 bioRxiv/PMC 全文 `https://pmc.ncbi.nlm.nih.gov/articles/PMC12458353/` 和 RosettaCommons Foundry 官方文档 `https://github.com/RosettaCommons/foundry/tree/production/models/rfd3`。下面解读基于这些可访问来源。

##### 推理伪代码

```python
# RFdiffusion3 条件生成伪代码
def rfd3_design(condition, length, num_steps=100, guidance_w=1.5):
    """
    condition: 可包含固定配体/DNA坐标、motif原子、H-bond donor/acceptor、
               RASA burial 标签、COM 约束、对称约束等
    length: 待生成蛋白残基数
    """
    # 1. 初始化全原子噪声：每个残基 14 个原子坐标
    x_t = sample_atom14_noise(length)

    # 2. 若有固定目标分子或 motif，把其坐标作为条件放入同一原子环境
    context = build_atomic_context(condition)

    for t in reversed(range(1, num_steps + 1)):
        # 有条件预测：模型看到配体/DNA/motif/氢键/RASA等条件
        x0_cond = model_denoise(x_t, t, context=context)

        # 无条件预测：同一步去掉条件，用于 classifier-free guidance
        x0_uncond = model_denoise(x_t, t, context=None)

        # guidance 加强条件遵循
        x0_hat = x0_uncond + guidance_w * (x0_cond - x0_uncond)

        # 采样下一步更干净的全原子坐标
        x_t = diffusion_update(x_t, x0_hat, t)

        # 可选：对称设计时，对噪声或输出施加 Cn/Dn 对称变换
        x_t = enforce_symmetry_if_needed(x_t, condition)

    # 3. RFD3 输出 backbone + side-chain atom14 坐标；序列通常再由 MPNN/LigandMPNN 拟合
    backbone_and_sidechains = x_t
    sequence = ligand_mpnn_or_protein_mpnn(backbone_and_sidechains, context)

    # 4. 用 AF3/RF3/Chai/Rosetta 等筛选复折叠、界面和活性位点几何
    return filter_designs(backbone_and_sidechains, sequence, condition)
```

##### 扩散目标与 guidance 公式

RFD3 的训练样本来自天然或预测结构，先对真实全原子坐标 \(\mathbf{x}_0\) 加噪得到 \(\mathbf{x}_t\)，再让网络预测去噪坐标或等价的 coordinate update。简化写法如下：

$$
\mathbf{x}_t = \alpha_t \mathbf{x}_0 + \sigma_t \boldsymbol{\epsilon},
\quad \boldsymbol{\epsilon}\sim \mathcal{N}(0,I)
$$

$$
\mathcal{L}_{\text{coord}}
= \sum_{i\in \mathcal{A}} w_i(t)\,
\left\|\hat{\mathbf{x}}_{0,i}(\mathbf{x}_t,t,c)-\mathbf{x}_{0,i}\right\|_2^2
$$

其中 \(\mathcal{A}\) 是参与生成/预测的 atom14 原子集合，\(c\) 是条件信息。条件可非常细粒度：某个 ligand atom 需要被埋藏、某个原子应接受氢键、某段 DNA 的形状可以固定或与蛋白一起采样、某个活性位点 motif 只有部分原子固定而不指定序列位置。

classifier-free guidance 的去噪组合可写成：

$$
\hat{\mathbf{x}}_0^{\text{guided}}
= \hat{\mathbf{x}}_0^{\emptyset}
+ \omega\left(\hat{\mathbf{x}}_0^{c}-\hat{\mathbf{x}}_0^{\emptyset}\right)
$$

这里 \(\hat{\mathbf{x}}_0^c\) 是有条件预测，\(\hat{\mathbf{x}}_0^\emptyset\) 是无条件预测，\(\omega\) 控制“贴合条件”的强度。论文报告氢键 donor/acceptor 条件在小分子 binder 中把目标相互作用比例从 26.67% 提升到 32.67%，再配合 guidance 到 36.67%。

##### 为什么要从残基扩散改成原子扩散

RFdiffusion1 的强项是生成蛋白骨架和蛋白-蛋白 binder，但设计小分子结合或酶活性位点时，真正决定功能的是具体原子的距离、角度、电性和氢键方向。RFdiffusion2 引入了少量“tip atom”来约束催化/配体关键原子，但主扩散过程仍是残基级，因此它难以同时生成更多侧链相互作用，也不方便表达“这个 ligand atom 要被埋藏”“这个碱基边缘要接收氢键”这类全局原子条件。

RFdiffusion3 的 atom14 表示把所有残基都补齐到相同原子数，使网络可以在固定张量形状下直接扩散 backbone 与 sidechain。对 tryptophan 这类最大侧链保留真实 10 个侧链原子；较小侧链的多余槽位放在 \(C_\beta\) 附近作为 virtual atom。这个设计既保留了全原子控制，又避免了不同氨基酸原子数不同导致的模型结构复杂化。由于序列在设计时可未知，网络最后输出的侧链几何也会暗示适合哪些氨基酸，后续再由 ProteinMPNN 或 LigandMPNN 拟合序列。

##### 架构与条件输入

RFD3 借鉴 AF3 diffusion module 的 U-Net 思想，但为“设计”而不是“给定序列预测结构”做了大幅瘦身。输入不是完整天然序列，而是长度、目标分子、motif、氢键、RASA、COM 等设计条件，所以不需要昂贵的 48 层 Pairformer。论文将条件处理模块缩到 2 层，并去掉 triangle multiplicative/triangle attention 等高成本更新，最终得到约 168M 参数的网络。

网络内部有两个尺度：atom track 负责细粒度坐标和局部相互作用，token/residue track 负责残基层级的全局结构组织。稀疏 attention 只在噪声态下几何邻近的原子/残基之间通信，避免全连接原子 attention 的平方级成本；cross-attention 用于把 atom features 聚合到 token features，再从 token features 调制回 atom features。这是 RFD3 能同时保持全原子表达力和较快推理速度的关键。

##### 训练与筛选流程

训练时，RFD3 在 PDB 中的蛋白-蛋白、蛋白-小分子、蛋白-DNA/RNA 复合物、功能 motif scaffolding 任务，以及 AF2 高质量 distillation 结构上构造不同“设计问题”。每个训练样本会随机选择哪些信息固定、哪些信息遮蔽、哪些原子作为 motif 或 tip atom、哪些坐标/序列/索引条件可见，从而迫使模型学会在多种约束组合下复原全原子结构。

推理后通常不是直接接受 RFD3 单次输出，而是进入设计管线：RFD3 采样 backbone + sidechain 几何，ProteinMPNN/LigandMPNN 生成序列，AF3/RF3/Chai 验证设计是否能复折叠并保持目标界面，Rosetta 或几何规则进一步筛选能量与活性位点。论文中的成功标准也多用 AF3/Chai 的 RMSD、pAE、ipTM 和 motif RMSD 组合定义。

##### 结果与边界

论文报告 RFD3 在多类 in silico 任务上优于前代：无条件长度 100-200 的设计中，98% 至少有一个 ProteinMPNN 序列被 AF3 预测到 1.5Å 内；DNA binder 任务平均 pass rate 为单体 8.67%、二聚体 6.67%；小分子 binder 在 FAD、SAM、IAI、OQO 四个 benchmark 上均优于 RFdiffusionAA；酶 AME benchmark 中 37/41 个案例优于 RFD2，且超过 4 个 residue islands 的困难案例中 passing design 比例约为 15% vs RFD2 的 4%。

湿实验部分展示了方法可落地但仍需筛选。DNA 结合蛋白只测试 5 个设计，其中 1 个通过 yeast surface display 测到 \(EC_{50}=5.89\pm2.15\,\mu M\)。cysteine hydrolase 任务筛选 190 个设计，35 个表现出 multi-turnover catalysis，最佳 \(k_{\text{cat}}/K_m=3557\,M^{-1}s^{-1}\)。这些结果说明全原子条件能显著提高复杂功能设计的命中率，但当前仍是“生成大量候选 + 严格计算筛选 + 实验验证”的工程流程，而不是一次生成即保证功能。

> 💡 关键：RFD3 的突破不是单纯“更精细的坐标输出”，而是让设计者可以把功能约束写到原子层。酶、核酸结合和小分子结合的关键相互作用终于和扩散模型的基本建模单位一致了。

#### 🧪 练习题

```yaml
question: "RFdiffusion3 相比 RFdiffusion2 在方法上的核心变化是什么？"
options:
  - "只保留 Cα 原子以提升速度"
  - "把扩散基本单位从残基/少量 tip atom 推进到 backbone 与 side-chain 的 atom14 全原子表示"
  - "取消所有条件输入，改为无条件蛋白生成"
  - "只使用 ProteinMPNN，不再使用扩散模型"
answer: 1
explain: "RFD3 直接扩散每个残基的 4 个骨架原子和 10 个侧链原子，配合固定 motif、氢键、RASA、DNA/ligand 等原子级条件，因此更适合设计酶活性位点和非蛋白分子相互作用。"
```
