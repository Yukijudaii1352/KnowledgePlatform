### RFdiffusion3 — 全原子生物分子交互从头设计

```yaml
id: rfdiffusion3
name: RFdiffusion3
full_name: "RoseTTAFold Diffusion 3：全原子生物分子交互从头设计"
year: "2025.09"
org: "Baker Lab / University of Washington"
doi: "10.1101/2025.09.18.676967"
category: generation
parent: targetdiff
motivation: "基于全原子扩散的通用生物分子交互设计框架，以原子为基本单元统一蛋白质、DNA、小分子结合物的从头设计，速度较RFdiffusion2提升约10倍"
```

#### 📝 一句话总结

RFdiffusion3 提出了以原子（而非残基）为基本扩散单元的全原子生物分子设计框架 AtomWorks，通过稀疏注意力 Transformer U-Net 架构与多层次条件控制机制，在蛋白质结合物、DNA 结合蛋白、小分子结合物及酶的从头设计任务上全面超越前代方法，同时实现约 10 倍的推理加速。

#### 🎯 核心要点

- **全原子扩散**：以 14 个原子/残基为基本单元（4 骨架 + 10 侧链，不足用虚拟 Cβ 填充），直接在原子坐标空间进行扩散与去噪
- **AtomWorks 架构**：Transformer-based U-Net，包含下采样编码器（原子→token）、稀疏 Transformer 主干、上采样解码器（token→原子坐标更新），仅 168M 参数（AF3 约 350M）
- **稀疏注意力**：基于几何邻近性的稀疏 attention，避免全原子 \(O(N^2)\) 复杂度，实现约 10× 加速
- **精简 Pairformer**：仅 2 层（AF3 为 48 层），移除三角乘法/三角注意力更新，大幅降低计算开销
- **多层次条件控制**：原子级热点（hotspot）、氢键供体/受体、溶剂可及表面积（SASA）、质心位置、motif 支架约束
- **Classifier-free guidance**：训练时随机丢弃条件信号，推理时通过引导强度 \(s\) 增强条件遵从
- **蛋白质结合物设计**：5 个靶标中 4 个优于 RFdiffusion1，平均独立结合簇 8.2 vs 1.4
- **DNA 结合蛋白设计**：首次实现 de novo DNA 结合蛋白设计，单体通过率 8.67%，实验验证 EC50 = 5.89 μM
- **小分子结合物设计**：联合采样配体构象，4 个靶标全部优于 RFdiffusionAA
- **酶设计**：AME 基准 41 个案例中 37 个优于 RFdiffusion2，实验验证半胱氨酸水解酶 \(k_{\text{cat}}/K_m = 3557\)

#### 🔬 深入细节

![RFdiffusion3 架构总览](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC12458353/bin/nihpp-2025.09.18.676967v2-f0001.jpg)
*图 1：RFdiffusion3 的 AtomWorks 架构与条件控制机制。(a) 全原子扩散过程示意；(b) Transformer U-Net 架构：下采样→稀疏 Transformer→上采样；(c) 多种条件控制信号*

![蛋白质与DNA结合物设计结果](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC12458353/bin/nihpp-2025.09.18.676967v2-f0002.jpg)
*图 2：蛋白质结合物设计（上）与 DNA 结合蛋白设计（下）的计算与实验验证结果*

```python
# RFdiffusion3 核心扩散与去噪伪代码
# === 训练阶段 ===
for (x0_atoms, cond) in training_data:          # x0: 全原子坐标 [N_atoms, 3]
    t = sample_timestep()                        # EDM 噪声调度
    sigma = noise_schedule(t)                    # σ(t) from Karras et al.
    eps = randn_like(x0_atoms)
    x_noisy = x0_atoms + sigma * eps             # 前向扩散：加噪

    # 条件信号随机丢弃 (classifier-free guidance)
    if random() < p_uncond:
        cond = mask_all(cond)                    # 丢弃所有条件

    # AtomWorks 前向传播
    atom_feats, pair_feats = embed(x_noisy, cond)          # 原子+对特征嵌入
    token_feats = cross_attn_downsample(atom_feats)        # 原子→token 下采样
    token_feats = sparse_transformer(token_feats, pair_feats)  # 稀疏注意力主干
    delta_x = cross_attn_upsample(token_feats, atom_feats)    # token→原子 上采样
    x0_pred = x_noisy + delta_x                            # 预测去噪坐标

    seq_pred = predict_sequence(x0_pred)         # 从去噪结构预测序列
    loss = mse(x0_pred, x0_atoms) + ce(seq_pred, seq_true)

# === 推理阶段 (采样) ===
x_T = randn(N_atoms, 3) * sigma_max             # 从纯噪声初始化
for t in reversed(timesteps):
    # Classifier-free guidance
    x0_cond = model(x_t, t, cond)               # 有条件预测
    x0_uncond = model(x_t, t, no_cond)           # 无条件预测
    x0_guided = x0_uncond + s * (x0_cond - x0_uncond)  # s: 引导强度
    x_{t-1} = denoise_step(x_t, x0_guided, t)   # EDM 去噪步
    # 自条件化：将 x0_guided 作为下一步额外输入
```

**动机与背景：从残基级到全原子级扩散**

RFdiffusion 系列的前代方法（RFdiffusion1/2）主要在残基级别（以 Cα 坐标为代表）进行扩散，这在蛋白质骨架设计中取得了巨大成功，但面临两个根本性限制：(1) 无法直接建模侧链原子与非蛋白质分子（DNA、小分子配体）之间的精细交互；(2) 需要额外的序列设计步骤（如 ProteinMPNN）和侧链填充步骤，引入误差累积。RFdiffusion3 的核心洞察是：**将原子作为扩散的基本单元**，每个残基用 14 个原子表示（4 个骨架原子 N, Cα, C, O 加 10 个侧链原子，不足的用虚拟 Cβ 坐标填充），从而在统一框架下同时生成骨架、侧链和非蛋白质分子的全原子坐标。这一设计使得模型能够直接优化原子级别的氢键、疏水接触和配位几何，而无需后处理。

**AtomWorks 架构：稀疏注意力 Transformer U-Net**

AtomWorks 的核心架构创新在于将全原子表示与高效 Transformer 结合。直接对所有原子做全注意力的计算复杂度为 \(O(N_{\text{atoms}}^2)\)，对于典型的蛋白质-靶标复合物（数千原子）是不可接受的。RFdiffusion3 采用了受 Byte Latent Transformer (Pagnoni et al., 2024) 启发的 U-Net 策略：

1. **下采样编码器**：通过交叉注意力（cross-attention）将原子级特征池化为残基级 token 特征。每个 token 通过 attention 聚合其对应残基内所有原子的信息，同时融合对（pair）特征。原子级特征包括原子类型、元素类型、噪声坐标等；对特征包括原子间距离、键连接等。

2. **稀疏 Transformer 主干**：在 token 级别运行，但注意力范围限制在**几何邻近**的 token 之间（基于 Cα 距离阈值），而非全局注意力。这将复杂度从 \(O(N_{\text{res}}^2)\) 降至近似 \(O(N_{\text{res}} \cdot k)\)，其中 \(k\) 是平均邻居数。主干仅包含 **2 层 Pairformer**（对比 AlphaFold3 的 48 层），且**完全移除了三角乘法更新（triangle multiplicative update）和三角注意力更新（triangle attention）**——这些是 AF2/AF3 中最昂贵的操作。作者发现，在生成任务中这些组件并非必要，移除后模型参数量从约 350M 降至 **168M**，推理速度提升约 10 倍。

3. **上采样解码器**：通过反向交叉注意力将 token 级特征映射回原子级坐标更新 \(\Delta \mathbf{x}\)，最终预测去噪后的全原子坐标 \(\hat{\mathbf{x}}_0 = \mathbf{x}_t + \Delta \mathbf{x}\)。序列通过从去噪结构中预测残基类型来联合生成。

> 💡 **关键设计**：稀疏注意力 + 精简 Pairformer 的组合使 RFdiffusion3 在保持全原子精度的同时，推理速度比 RFdiffusion2 快约 10 倍。对于 200 残基的蛋白质，单次采样仅需数十秒。

**扩散过程与噪声调度**

RFdiffusion3 采用 EDM（Elucidating the Design Space of Diffusion-Based Generative Models, Karras et al., 2022）噪声调度。前向扩散过程将全原子坐标 \(\mathbf{x}_0\) 逐步加噪：

$$\mathbf{x}_t = \mathbf{x}_0 + \sigma(t) \cdot \boldsymbol{\epsilon}, \quad \boldsymbol{\epsilon} \sim \mathcal{N}(0, \mathbf{I})$$

其中 \(\sigma(t)\) 是随时间单调递增的噪声水平。模型被训练为预测去噪后的坐标 \(\hat{\mathbf{x}}_0\)（而非噪声 \(\boldsymbol{\epsilon}\)），损失函数为：

$$\mathcal{L} = \lambda(t) \|\hat{\mathbf{x}}_0 - \mathbf{x}_0\|^2 + \mathcal{L}_{\text{seq}}$$

其中 \(\lambda(t)\) 是时间依赖的权重，\(\mathcal{L}_{\text{seq}}\) 是序列预测的交叉熵损失。推理时采用自条件化（self-conditioning）：将上一步的预测 \(\hat{\mathbf{x}}_0^{(t+1)}\) 作为当前步的额外输入，显著提升生成质量。

**多层次条件控制机制**

RFdiffusion3 的另一核心创新是丰富的条件控制体系，使用户能够精确指定设计目标：

- **原子级热点（Atomic Hotspots）**：不同于 RFdiffusion1 的残基级热点，RFdiffusion3 允许指定靶标上的**单个原子**作为结合热点。模型通过 classifier-free guidance 学习将设计的结合界面集中在这些原子附近，实现更精细的界面控制。

- **氢键供体/受体条件**：用户可以指定设计蛋白中特定位置应形成氢键供体或受体，这对于 DNA 结合蛋白设计尤为关键——DNA 碱基的识别主要依赖于大沟中的氢键模式。

- **SASA（溶剂可及表面积）条件**：通过标记残基的埋藏/暴露状态，控制设计蛋白的疏水核心与表面极性残基分布。

- **质心（CoM）位置条件**：指定设计蛋白质心相对于靶标的空间位置，引导结合物在靶标表面的特定区域生成。

- **Motif 支架约束**：支持"未索引原子 motif"（unindexed atomic motifs），即仅指定关键功能基团的原子坐标而不指定其在序列中的位置，模型自动将其整合到设计的蛋白质中。这对酶活性位点设计至关重要。

所有条件信号均通过 classifier-free guidance 实现：训练时以概率 \(p_{\text{uncond}}\) 随机丢弃条件，推理时通过引导公式增强条件遵从：

$$\hat{\mathbf{x}}_0^{\text{guided}} = \hat{\mathbf{x}}_0^{\text{uncond}} + s \cdot (\hat{\mathbf{x}}_0^{\text{cond}} - \hat{\mathbf{x}}_0^{\text{uncond}})$$

其中 \(s > 1\) 为引导强度。

**实验验证与关键结果**

![小分子结合物与酶设计结果](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC12458353/bin/nihpp-2025.09.18.676967v2-f0003.jpg)
*图 3：小分子结合物设计（左）与酶设计（右）的计算基准与实验验证*

在**蛋白质结合物设计**方面，RFdiffusion3 在 5 个靶标（包括 IL-7Rα、TrkA、FGFR2、PD-L1、InsulinR）上进行了系统评估。在 4/5 个靶标上，RFdiffusion3 生成的结合物在 AlphaFold2 预测的界面准确度（ipTM）和结合物多样性上均优于 RFdiffusion1。平均每个靶标产生 8.2 个独立结合簇（vs RFdiffusion1 的 1.4 个），表明模型能够探索更广泛的结合模式空间。

在**DNA 结合蛋白设计**方面，RFdiffusion3 首次实现了 de novo DNA 结合蛋白的计算设计。模型联合生成蛋白质结构和 DNA 双链构象，通过氢键条件控制实现碱基特异性识别。在计算筛选中，单体设计通过率为 8.67%，二聚体为 6.67%。实验验证了 5 个设计，其中 1 个展现出明确的 DNA 结合活性，EC50 = 5.89 ± 2.15 μM。

在**小分子结合物设计**方面，RFdiffusion3 在 4 个靶标（雌二醇、地高辛、生物素、褪黑素）上全部优于 RFdiffusionAA。关键创新是联合采样配体构象——模型不仅设计蛋白质口袋，还同时优化配体在口袋中的结合姿态。

在**酶设计**方面，使用 AME（Automated Motif Extraction）基准的 41 个案例进行评估，RFdiffusion3 在 37/41（90%）个案例中优于 RFdiffusion2。实验验证了半胱氨酸水解酶设计：从 190 个设计中，35 个展现多轮催化活性，最佳设计的 \(k_{\text{cat}}/K_m = 3557 \, \text{M}^{-1}\text{s}^{-1}\)。

> ⚠️ **注意**：RFdiffusion3 的训练数据仅来自 PDB，未使用合成数据或预训练语言模型。模型的泛化能力完全来自全原子扩散框架的归纳偏置和丰富的条件控制机制。

#### 🧪 练习题

```yaml
question: "RFdiffusion3 相比 AlphaFold3 在架构上的关键简化是什么？"
options:
  - "将原子数从 14 个/残基减少到 4 个/残基"
  - "将 Pairformer 从 48 层缩减至 2 层并移除三角更新操作"
  - "使用全局注意力替代稀疏注意力以提升精度"
  - "增加 Reference Model 进行 KL 散度约束"
answer: 1
explain: "RFdiffusion3 将 Pairformer 从 AF3 的 48 层缩减至仅 2 层，并完全移除了三角乘法更新和三角注意力更新，使参数量从约 350M 降至 168M，推理速度提升约 10 倍。"
```