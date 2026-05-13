### MambaVision: A Hybrid Mamba-Transformer Vision Backbone

```yaml
title: "MambaVision: A Hybrid Mamba-Transformer Vision Backbone"
authors: "Ali Hatamizadeh, Jan Kautz"
institution: "NVIDIA"
publication: "arXiv 2407.08083"
year: 2024
url: "https://arxiv.org/abs/2407.08083"
code: "https://github.com/NVlabs/MambaVision"
tags: ["image_classification", "vision_backbone", "mamba", "state_space_model", "hybrid_architecture"]
```

#### 📝 一句话总结

MambaVision 提出了一种混合 Mamba-Transformer 视觉骨干网络，通过重新设计 Mamba 块（去除因果卷积、增加对称分支）并在最终层引入自注意力机制，在 ImageNet-1K 上实现了精度-吞吐量的新 SOTA Pareto 前沿。

#### 🎯 核心要点

- **混合架构设计**：4 阶段层级结构，Stage 1-2 使用 CNN 残差块进行高分辨率快速特征提取，Stage 3-4 使用 MambaVision Mixer + Transformer 块（各占 N/2 层）
- **MambaVision Mixer 创新**：(1) 用普通卷积替换因果卷积消除方向性限制；(2) 增加无 SSM 的对称分支作为 token mixer 补偿序列建模的信息损失；(3) 双分支各投影到 C/2 维度后拼接
- **自注意力补充**：在 Stage 3-4 的后半部分使用标准 self-attention 块恢复全局上下文建模能力
- **SOTA 性能**：MambaVision-B 以 84.2% Top-1 / 3670 img/s 超越 ConvNeXt-B (83.8% / 1485) 和 Swin-B (83.5% / 1245)，吞吐量提升 2-3 倍
- **下游任务验证**：在 COCO 目标检测/实例分割和 ADE20K 语义分割上均超越同等规模的 Swin 和 ConvNeXt 骨干

#### 🔬 深入细节

##### 4.1 示意图

**整体架构：**

![MambaVision Architecture](https://ar5iv.labs.arxiv.org/html/2407.08083/assets/x2.png)

MambaVision 采用 4 阶段层级架构。Stem 由两个 3×3 卷积（stride=2）组成，将输入图像从 $H \times W \times 3$ 转换为 $\frac{H}{4} \times \frac{W}{4} \times C$ 的特征图。各阶段之间通过 3×3 卷积（stride=2）进行下采样。

**MambaVision Mixer 结构：**

![MambaVision Mixer](https://ar5iv.labs.arxiv.org/html/2407.08083/assets/x3.png)

MambaVision Mixer 的核心创新在于双分支设计：一条分支包含 SSM（Selective Scan）进行序列建模，另一条对称分支仅使用卷积+激活进行空间特征混合，两者拼接后通过线性层投影回原始维度。

##### 4.2 伪代码

```python
# MambaVision Mixer - PyTorch-like Pseudocode
class MambaVisionMixer(nn.Module):
    def __init__(self, dim, d_state=16, kernel_size=3):
        super().__init__()
        self.in_proj = nn.Linear(dim, dim)  # project to dim (split into 2 x dim//2)
        # SSM branch (x path)
        self.conv1d_x = nn.Conv1d(dim//2, dim//2, kernel_size, padding='same', groups=dim//2)
        self.x_proj = nn.Linear(dim//2, dt_rank + d_state*2)  # project to dt, B, C
        self.dt_proj = nn.Linear(dt_rank, dim//2)
        # Symmetric branch (z path) - NO SSM
        self.conv1d_z = nn.Conv1d(dim//2, dim//2, kernel_size, padding='same', groups=dim//2)
        # Output projection
        self.out_proj = nn.Linear(dim, dim)
    
    def forward(self, hidden_states):
        # Input projection and split into two branches
        xz = rearrange(self.in_proj(hidden_states), 'b l d -> b d l')
        x, z = xz.chunk(2, dim=1)  # each: [B, C//2, L]
        
        # Branch 1: Conv + SiLU + SSM (Selective Scan)
        x = F.silu(self.conv1d_x(x))         # regular (non-causal) conv
        dt, B, C = self.x_proj(x)            # input-dependent parameters
        x_ssm = selective_scan(x, dt, A, B, C, D)  # SSM forward
        
        # Branch 2: Conv + SiLU only (no SSM)
        z = F.silu(self.conv1d_z(z))          # spatial mixing without SSM
        
        # Concatenate and project
        output = rearrange(torch.cat([x_ssm, z], dim=1), 'b d l -> b l d')
        return self.out_proj(output)
```

**整体 Block 结构：**
```python
# Stage 3-4 Layer: first N/2 layers use MambaVision Mixer, last N/2 use Self-Attention
X_hat = Mixer(LayerNorm(X)) + X       # Token mixing (Mamba or Attention)
X_out = MLP(LayerNorm(X_hat)) + X_hat  # Channel mixing
```

##### 4.3 方法细节

**宏观架构设计哲学。** MambaVision 的核心设计理念是"分而治之"：在高分辨率的早期阶段（Stage 1-2），使用计算高效的 CNN 残差块（3×3 Conv + BatchNorm + GELU）进行快速局部特征提取；在低分辨率的后期阶段（Stage 3-4），使用 MambaVision Mixer 和 Transformer 块进行全局特征建模。这种分层策略避免了在高分辨率特征图上运行复杂的 SSM 或注意力机制，显著提升了推理吞吐量。作者通过系统实验发现，将 Transformer 块放在最终层（而非均匀分布或放在早期层）能最有效地恢复全局上下文建模能力。

**MambaVision Mixer 的关键改进。** 原始 Mamba 块为 NLP 设计，存在两个不适合视觉任务的问题：(1) 因果卷积（causal conv）限制了信息只能单向流动，而视觉特征本质上是二维且无方向性的；(2) SSM 的序列约束可能丢失部分空间信息。MambaVision 通过两个改进解决这些问题：首先，将因果卷积替换为普通卷积（padding='same'），允许双向信息流动；其次，增加一条不含 SSM 的对称分支，仅通过卷积+SiLU 激活进行空间特征混合，补偿 SSM 序列建模可能丢失的内容。消融实验验证了每个改进的贡献：去因果性 +0.4%，加对称分支 +0.4%，使用拼接融合 +1.0%，总计从 80.5% 提升到 82.3%。

**SSM 数学基础与选择性机制。** MambaVision 中的 SSM 分支基于 Mamba 的选择性状态空间模型。连续时间 SSM 定义为 $h'(t) = \mathbf{A}h(t) + \mathbf{B}x(t)$，$y(t) = \mathbf{C}h(t)$，通过零阶保持（ZOH）离散化为 $\bar{\mathbf{A}} = \exp(\Delta \mathbf{A})$，$\bar{\mathbf{B}} = (\Delta \mathbf{A})^{-1}(\exp(\Delta \mathbf{A}) - \mathbf{I}) \cdot \Delta \mathbf{B}$。Mamba 的核心创新是使参数 $B$、$C$、$\Delta$ 依赖于输入（通过线性投影），实现选择性信息过滤。在 MambaVision 中，SSM 仅作用于 C/2 维度的子空间，另一半通过对称分支处理，这既保留了 SSM 的长程建模能力，又通过并行分支增强了局部空间特征的保留。

**训练策略与模型变体。** 所有模型在 ImageNet-1K 上训练 300 epochs，使用余弦衰减学习率调度（含 20 epochs warmup 和 cooldown），LAMB 优化器（比 AdamW 对高学习率更鲁棒），全局 batch size 4096，初始学习率 0.005，权重衰减 0.05，使用 32 张 A100 GPU。模型提供 T/T2/S/B/L/L2 六个变体，参数量从 31.8M 到 241.5M，覆盖从轻量到大规模的不同需求。各变体在 ImageNet-1K 上的表现如下：

| 模型 | Params (M) | FLOPs (G) | Throughput (img/s) | Top-1 (%) |
|------|-----------|-----------|-------------------|-----------|
| MambaVision-T | 31.8 | 4.4 | 6298 | 82.3 |
| MambaVision-T2 | 35.1 | 5.1 | 5990 | 82.7 |
| MambaVision-S | 50.1 | 7.5 | 4700 | 83.3 |
| MambaVision-B | 97.7 | 15.0 | 3670 | 84.2 |
| MambaVision-L | 227.9 | 34.9 | 2190 | 85.0 |
| MambaVision-L2 | 241.5 | 37.5 | 1021 | 85.3 |

**下游任务表现。** 在 MS COCO 上使用 Mask R-CNN，MambaVision-T 达到 box AP 46.4 / mask AP 41.8，超越 ConvNeXt-T 和 Swin-T。使用 Cascade Mask R-CNN，MambaVision-S 达到 48.2 box AP，MambaVision-B 达到 49.1 box AP。在 ADE20K 语义分割（UPerNet）上，MambaVision-T/S/B 分别达到 46.6/48.2/49.1 mIoU，均超越同等规模竞争模型。

##### 4.4 公式

**SSM 连续形式：**

$$h'(t) = \mathbf{A}h(t) + \mathbf{B}x(t), \quad y(t) = \mathbf{C}h(t)$$

**ZOH 离散化：**

$$\bar{\mathbf{A}} = \exp(\Delta \mathbf{A}), \quad \bar{\mathbf{B}} = (\Delta \mathbf{A})^{-1}(\exp(\Delta \mathbf{A}) - \mathbf{I}) \cdot \Delta \mathbf{B}$$

**离散递推：**

$$h_k = \bar{\mathbf{A}} h_{k-1} + \bar{\mathbf{B}} x_k, \quad y_k = \mathbf{C} h_k + \mathbf{D} x_k$$

**MambaVision Mixer 公式：**

$$X_1 = \text{Scan}(\sigma(\text{Conv}(\text{Linear}_{C \to C/2}(X_{in}))))$$

$$X_2 = \sigma(\text{Conv}(\text{Linear}_{C \to C/2}(X_{in})))$$

$$X_{out} = \text{Linear}_{C \to C}(\text{Concat}(X_1, X_2))$$

**Layer 结构：**

$$\hat{X}^n = \text{Mixer}(\text{Norm}(X^{n-1})) + X^{n-1}$$

$$X^n = \text{MLP}(\text{Norm}(\hat{X}^n)) + \hat{X}^n$$

#### 🧪 练习题

1. **[概念理解]** MambaVision 为什么要将因果卷积替换为普通卷积？这对视觉任务有什么好处？

2. **[架构设计]** 为什么 MambaVision 选择在 Stage 3-4 的后半部分使用 Self-Attention 而非全部使用 MambaVision Mixer？如果全部使用 Mixer 会有什么问题？

3. **[计算分析]** MambaVision Mixer 将输入分为两个 C/2 维度的分支，相比原始 Mamba 在完整 C 维度上运行 SSM，这种设计如何影响计算量和参数量？

4. **[实验分析]** 从消融实验来看（80.5→80.9→81.3→82.3），哪个改进贡献最大？为什么拼接（concat）比不拼接（w/o concat）效果好这么多？

5. **[对比思考]** MambaVision-B (84.2%, 3670 img/s) vs Swin-B (83.5%, 1245 img/s)：为什么 MambaVision 能同时在精度和速度上超越 Swin？从架构角度分析原因。