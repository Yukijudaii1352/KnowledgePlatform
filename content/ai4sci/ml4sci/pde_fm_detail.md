### PDE-FM — PDE 基础模型

```yaml
id: pde_fm
name: PDE-FM
full_name: "PDE 基础模型 (Towards a Foundation Model for PDEs Across Physics Domains)"
year: 2026
org: IBM Research
paper_url: "https://arxiv.org/abs/2511.21861"
category: acceleration
parent: fno
motivation: "Mamba骨干网络误差降低46%"
```

#### 📝 一句话总结

PDE-FM 提出了一种融合**空间-频谱双 Tokenization**、**Mamba 状态空间骨干**和 **FNO 频谱解码器**的跨物理域 PDE 基础模型，通过在 The Well 基准的 12 个异构数据集上联合预训练，在湍流、天体物理和辐射流等非线性域实现了平均 VRMSE 降低 46% 的 SOTA 性能。

#### 🎯 核心要点

- **空间-频谱双 Tokenization**：PatchConv 提取局部空间特征 + 截断 FFT 捕获全局频谱模式，两路 Token 经 Cross-Attention 融合
- **FiLM 物理条件注入**：将数据集元信息（边界条件、物理系数等）通过 Feature-wise Linear Modulation 调制空间 Token，实现跨域泛化
- **Mamba SSM 骨干**：以 \(O(Nd)\) 线性复杂度替代 \(O(N^2)\) 的 Transformer 自注意力，在保持表达能力的同时大幅降低计算开销
- **FNO 频谱解码器**：在傅里叶域通过可学习权重矩阵进行频谱乘法，天然保持周期性和频谱连续性
- **双重损失函数**：VRMSE 物理空间损失 + 频谱 \(L_2\) 损失，可选守恒正则和 PDE 残差惩罚
- **多数据集预训练策略**：温度缩放采样 \(p(i) \propto |\mathcal{D}_i|^{\tau}\)（\(\tau=0.5\)）+ EMA 难度加权 + 数据集特定 1×1 适配器
- **12 个 The Well 数据集**覆盖活性物质、湍流辐射层、粘弹性不稳定性、剪切流、Gray-Scott 反应扩散、Rayleigh-Bénard 对流、中子星并合后、超新星爆炸、引力冷却湍流、红超巨星对流包层、Helmholtz 阶梯、声学散射
- **SOTA 结果**：6/12 数据集最优，均值 VRMSE 0.165（次优 CNextU-net 为 0.304），在 Rayleigh-Bénard 和剪切流上超越基线一个数量级

#### 🔬 深入细节

![PDE-FM 架构总览图](https://ar5iv.labs.arxiv.org/html/2511.21861/assets/figures/architecture_fm4pde.png)
*图：PDE-FM 的五阶段流水线架构——空间-频谱双 Tokenization → FiLM 物理条件注入 → Cross-Attention 融合 → Mamba SSM 骨干 → FNO 频谱解码器*

##### 算法伪代码

```python
# PDE-FM 前向传播伪代码
def forward(u_t, metadata_c):
    # Stage 1: 空间-频谱双 Tokenization
    z_spatial = PatchConv(u_t)                    # [B, N_p, d]
    z_spectral = TruncFFT(u_t, k_max)            # [B, C, k_max, k_max] → Linear → [B, M, d]

    # Stage 2: FiLM 物理条件注入
    gamma, beta = FiLM_MLP(metadata_c)            # 从元信息生成调制参数
    z_spatial = gamma * z_spatial + beta           # 逐特征仿射变换

    # Stage 3: Cross-Attention 融合
    z_fused = CrossAttn(Q=z_spatial, K=z_spectral, V=z_spectral) + z_spatial

    # Stage 4: Mamba SSM 骨干 (L 层)
    for l in range(L):
        z_fused = z_fused + Mamba_Block(LayerNorm(z_fused))  # O(Nd) 线性复杂度

    # Stage 5: FNO 频谱解码器
    z_proj = Conv1x1(z_fused).reshape(B, C_out, H, W)
    u_hat = z_proj + sum(iFFT(R_k * FFT(z_proj)) for k in range(K_modes))

    return u_hat  # 预测 u_{t+1}
```

##### 动机与背景

传统 PDE 求解器（有限元/有限差分）在高分辨率三维场景下计算成本极高，单次模拟可能需要数千 GPU 小时。**神经算子**（如 FNO、DeepONet）虽然能以数据驱动方式加速求解，但存在两个核心瓶颈：

1. **单域训练**：每个 PDE 族需要独立训练一个模型，无法利用不同物理域之间的共享结构（如不可压缩性、涡度守恒等）
2. **频谱退化**：纯空间域方法在长时间推演中高频分量迅速衰减，导致预测模糊化

PDE-FM 的核心洞察是：**不同 PDE 族共享底层的频谱-空间对偶结构**，通过联合预训练可以学习到可迁移的归纳偏置。

##### 核心机制详解

**（1）空间-频谱双 Tokenization**

空间分支使用 PatchConv（步幅卷积）将输入场 \(u_t \in \mathbb{R}^{C \times H \times W}\) 分割为 \(N_p\) 个 Patch Token：

$$z_{\text{spatial}} = \text{PatchConv}(u_t) \in \mathbb{R}^{N_p \times d}$$

频谱分支对输入做 2D FFT 并截断到前 \(k_{\max}\) 个模态，再通过线性投影对齐维度：

$$z_{\text{spectral}} = \text{Linear}\left(\text{TruncFFT}(u_t, k_{\max})\right) \in \mathbb{R}^{M \times d}$$

> 💡 **关键**：空间 Token 捕获局部梯度和边界信息，频谱 Token 捕获全局周期结构和能量级联——两者互补，缺一不可。

**（2）FiLM 物理条件注入**

为实现跨域泛化，PDE-FM 将数据集元信息（PDE 类型、边界条件、物理系数等）编码为条件向量 \(c\)，通过 Feature-wise Linear Modulation 调制空间 Token：

$$z_{\text{cond}} = \gamma(c) \odot z_{\text{spatial}} + \beta(c)$$

其中 \(\gamma(c), \beta(c) \in \mathbb{R}^d\) 由两层 MLP 从 \(c\) 生成。这种设计让同一骨干网络能根据物理上下文动态调整特征表示，无需为每个 PDE 族维护独立参数。

**（3）Cross-Attention 融合**

空间和频谱两路 Token 通过标准交叉注意力机制融合：

$$z_{\text{fused}} = \text{softmax}\!\left(\frac{Q_{\text{spatial}} \cdot K_{\text{spectral}}^T}{\sqrt{d}}\right) V_{\text{spectral}} + z_{\text{spatial}}$$

空间 Token 作为 Query，频谱 Token 作为 Key/Value，使每个空间位置都能"查询"全局频谱信息。残差连接确保局部空间特征不被稀释。

**（4）Mamba SSM 骨干**

融合后的 Token 序列送入 \(L\) 层 Mamba 残差块。Mamba 是一种选择性状态空间模型（Selective SSM），其核心递推为：

$$h_n = \bar{A} h_{n-1} + \bar{B} x_n, \quad y_n = C h_n$$

其中 \(\bar{A}, \bar{B}\) 通过零阶保持（ZOH）离散化得到，且 \(B, C, \Delta\) 均为输入依赖的（input-dependent），赋予模型选择性记忆能力。

> 💡 **关键**：Mamba 的计算复杂度为 \(O(Nd)\)（\(N\) 为序列长度，\(d\) 为隐藏维度），相比 Transformer 的 \(O(N^2)\) 在高分辨率 PDE 场景下优势显著。消融实验显示 Mamba+FNO（VRMSE 0.2581）略优于 Transformer+FNO（0.2779）。

**（5）FNO 频谱解码器**

骨干输出经 1×1 卷积投影回物理空间维度后，通过 FNO 头进行频谱精修：

$$\hat{u}_{t+1} = z_{\text{proj}} + \sum_{k=1}^{K} \mathcal{F}^{-1}\!\left(R_k \cdot \mathcal{F}(z_{\text{proj}})\right)$$

其中 \(R_k \in \mathbb{C}^{d_{\text{out}} \times d_{\text{out}}}\) 是可学习的频谱权重矩阵，\(\mathcal{F}\) 和 \(\mathcal{F}^{-1}\) 分别为 FFT 和逆 FFT。这种设计天然保持频谱连续性，避免了纯卷积解码器的高频衰减问题。

**（6）损失函数**

训练使用双重损失：

$$\mathcal{L} = \mathcal{L}_{\text{VRMSE}} + \lambda \cdot \mathcal{L}_{\text{spectral}}$$

其中 VRMSE 按空间方差归一化，确保不同物理量级的场（密度、压力、速度）具有可比性：

$$\mathcal{L}_{\text{VRMSE}} = \frac{\|u - \hat{u}\|_2}{\sqrt{\text{Var}_{\text{spatial}}(u)}}$$

频谱损失在傅里叶域计算 \(L_2\) 距离，惩罚高频分量的偏差。可选的守恒损失和 PDE 残差损失进一步增强物理一致性。

##### 多数据集预训练策略

PDE-FM 在 The Well 基准的 12 个数据集上联合预训练，涵盖从 \(128^2\) 到 \(256^3\) 的 2D/3D 系统。关键设计包括：

- **温度缩放采样**：\(p(i) \propto |\mathcal{D}_i|^{\tau}\)，\(\tau=0.5\) 平衡数据集多样性与收敛稳定性
- **数据集特定适配器**：1×1 卷积进行通道归一化和空间插值，将异构输入映射到标准化网格
- **EMA 难度加权**：用指数移动平均跟踪每个数据集的损失，动态提升困难数据集的采样权重，缓解负迁移

##### 与现有方法的对比

| 方法 | 骨干 | 复杂度 | 跨域能力 | 均值 VRMSE |
|------|------|--------|----------|------------|
| FNO | 频谱卷积 | \(O(N \log N)\) | ❌ 单域 | 0.441 |
| TFNO | Transformer+频谱 | \(O(N^2)\) | ❌ 单域 | 0.469 |
| U-net | 编码器-解码器 | \(O(N)\) | ❌ 单域 | 0.588 |
| CNextU-net | ConvNeXt+U-net | \(O(N)\) | ❌ 单域 | 0.304 |
| PhysiX | 自回归 Transformer (4.5B) | \(O(N^2)\) | ✅ 多域 | 仅 2D |
| **PDE-FM** | **Mamba+FNO** | **\(O(Nd)\)** | **✅ 多域** | **0.165** |

> ⚠️ **局限性**：PDE-FM 在粘弹性不稳定性（VRMSE 0.52 vs CNextU-net 0.25）和线性声学散射等局部刚性/准稳态系统上仍落后于卷积架构，表明长期应力-应变耦合需要显式的物理先验或时序记忆机制。

##### 消融实验关键发现

| 配置 | 均值 VRMSE |
|------|------------|
| Mamba + FiLM + FNO + SpecTok + XAttn + LayerNorm | **0.2581** |
| Transformer + FNO + SpecTok + XAttn + LayerNorm | 0.2779 |
| Transformer + Conv + SpecTok + LayerNorm | 0.3045 |
| Transformer + FNO（无 LayerNorm） | 0.3134 |
| Transformer + Conv（无 SpecTok/XAttn/Norm） | 0.3297 |

三个关键结论：(1) FNO 解码器一致优于卷积解码器；(2) Mamba 骨干略优于 Transformer 且计算成本更低；(3) 频谱 Tokenizer 和 Cross-Attention 贡献了最大的性能增益。

#### 🧪 练习题

```yaml
question: "PDE-FM 中 Cross-Attention 融合模块的 Query 和 Key/Value 分别来自哪里？"
options:
  - "Query 来自频谱 Token，Key/Value 来自空间 Token"
  - "Query 来自空间 Token，Key/Value 来自频谱 Token"
  - "Query、Key、Value 均来自空间 Token（自注意力）"
  - "Query、Key、Value 均来自频谱 Token（自注意力）"
answer: 1
explain: "空间 Token 作为 Query 查询频谱 Token（Key/Value），使每个空间位置能获取全局频率信息，实现局部-全局特征融合。"
```