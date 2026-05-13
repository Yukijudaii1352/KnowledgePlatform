# SegMaFormer: A Lightweight Hybrid Mamba-Transformer for 3D Medical Image Segmentation

## 元信息
| 字段 | 内容 |
|------|------|
| 标题 | SegMaFormer: A Lightweight Hybrid Mamba-Transformer for 3D Medical Image Segmentation |
| 作者 | Huy Hoang Nguyen, Khanh-Duy Le, Quang-Huy Che, Thi-Oanh Nguyen |
| 机构 | Ho Chi Minh City University of Technology (HCMUT), VNU-HCM |
| 发表时间 | 2025 |
| 论文链接 | https://arxiv.org/abs/2603.22002 |
| 领域标签 | 3D医学图像分割, Mamba, Transformer, 轻量化模型, 语义分割 |

---

## 研究背景与动机

### 问题定义
3D医学图像分割（如脑肿瘤、腹部器官、心脏结构分割）是临床诊断和治疗规划的核心任务。现有方法面临两大挑战：
1. **计算效率与精度的矛盾**：基于CNN的U-Net及其变体（如nnU-Net）虽然精度高，但参数量巨大（通常>100M），难以部署在资源受限的临床环境中。
2. **全局与局部建模的平衡**：Transformer能捕获长程依赖但二次复杂度限制了3D体积处理；Mamba（状态空间模型）提供线性复杂度但缺乏局部空间感知能力。

### 现有方法的局限
- **CNN方法**（U-Net, nnU-Net）：参数量大（>90M），局部感受野限制全局语义理解。
- **Transformer方法**（UNETR, SwinUNet, nnFormer）：自注意力机制的O(n²)复杂度在3D高分辨率输入下计算代价极高，且参数量仍然庞大（如nnFormer 150.5M）。
- **Mamba方法**（U-Mamba, SegMamba）：线性复杂度但缺乏局部空间归纳偏置，在小数据集上表现不稳定（如ACDC上性能下降）。
- **混合方法**（SegFormer3D）：虽结合了多种组件，但仍依赖CNN进行特征提取，未充分发挥纯token化架构的潜力。

### 本文动机
作者观察到：(1) 浅层特征更需要高效的序列建模（线性复杂度的Mamba适合处理高分辨率早期特征）；(2) 深层特征更需要全局语义交互（Transformer的注意力机制适合低分辨率深层特征）；(3) 3D位置编码对弥补Mamba的空间感知不足至关重要。基于此，提出**完全无CNN**的轻量混合架构。

---

## 方法详解

### 整体架构

![SegMaFormer Architecture](https://ar5iv.labs.arxiv.org/html/2603.22002/assets/Network-Architecture-Page-1.png)

SegMaFormer采用编码器-解码器结构，**完全不使用卷积神经网络**，仅由Mamba块和Transformer块组成：

- **编码器**：4个阶段，每阶段包含Overlapped Patch Embedding + 特征提取块
  - Stage 1-2：使用Mamba块（处理高分辨率特征，利用线性复杂度优势）
  - Stage 3-4：使用Transformer块（处理低分辨率特征，利用全局注意力优势）
- **解码器**：轻量MLP解码器，通过skip connection融合多尺度特征
- **位置编码**：3D旋转位置编码（3D-RoPE）嵌入到每个阶段

### 核心组件详解

#### 1. Overlapped Patch Embedding
使用3D卷积（kernel=3, stride=2, padding=1）实现重叠的patch嵌入，在下采样的同时保留相邻patch间的空间连续性。每个阶段的通道维度逐步增加：C₁=32, C₂=64, C₃=128, C₄=256。

#### 2. 3D旋转位置编码（3D-RoPE）

![Detailed Blocks](https://ar5iv.labs.arxiv.org/html/2603.22002/assets/Network-Architecture-Page-2.png)

3D-RoPE将标准的1D旋转位置编码扩展到三维空间，为每个token注入其在(depth, height, width)三个轴上的绝对位置信息。具体做法：
- 将嵌入维度均分为三份，分别编码D、H、W三个轴的位置
- 使用旋转矩阵对query和key进行位置调制
- 这使得注意力分数自然地编码了token间的相对3D空间距离

3D-RoPE的关键作用是**弥补Mamba缺乏的空间归纳偏置**，使模型在不依赖CNN的情况下仍能感知局部空间结构。

#### 3. Mamba块（Stage 1-2）
Mamba块基于选择性状态空间模型（S6），核心公式：

$$h_t = \bar{A}h_{t-1} + \bar{B}x_t$$
$$y_t = Ch_t$$

其中离散化参数通过输入自适应生成：
- $\Delta_t = \text{softplus}(W_\Delta x_t)$（步长参数）
- $B_t = W_B x_t$, $C_t = W_C x_t$（输入相关的状态矩阵）
- $\bar{A} = \exp(\Delta_t A)$, $\bar{B} = \Delta_t B_t$

Mamba块的完整流程：LayerNorm → Linear投影 → 1D Conv → SiLU → SSM → 门控输出 → 残差连接。

**设计理由**：在编码器早期阶段，特征图分辨率高（如D/2×H/2×W/2），token数量大。Mamba的线性复杂度O(n)相比Transformer的O(n²)具有显著计算优势。

#### 4. Transformer块（Stage 3-4）
使用Efficient Self-Attention（ESA），通过空间降维减少key和value的序列长度：

$$\text{ESA}(Q, K, V) = \text{Softmax}\left(\frac{QK^T}{\sqrt{d}}\right)V$$

其中K和V通过reshape+线性投影从(N, C)降维到(N/R, C)，降维比R在不同阶段设置不同。

**设计理由**：在编码器深层，特征图分辨率已降低（如D/16×H/16×W/16），token数量有限，Transformer的全局注意力能有效捕获跨区域语义关系，且计算开销可控。

#### 5. 轻量MLP解码器
解码器采用自顶向下的特征融合策略：
1. 对每个阶段的编码器输出进行MLP投影统一通道数
2. 逐步上采样并与skip connection特征相加融合
3. 最终通过线性分类头输出分割结果

### 设计亮点与创新点
1. **纯Token化架构**：完全摒弃CNN，证明Mamba+Transformer的组合可以替代CNN进行3D医学图像分割
2. **阶段性混合策略**：根据分辨率特点分配计算模块——高分辨率用线性复杂度的Mamba，低分辨率用全局建模的Transformer
3. **3D-RoPE**：为纯序列模型注入3D空间先验，弥补Mamba缺乏的空间归纳偏置
4. **极致轻量化**：仅2.0M参数，比主流方法小10-75倍

### 损失函数
使用Dice Loss + Cross-Entropy Loss的组合：
$$\mathcal{L} = \mathcal{L}_{Dice} + \mathcal{L}_{CE}$$

---

## 实验与结果

### 实验设置
| 配置项 | 设置 |
|--------|------|
| 数据集 | BraTS 2024 (脑肿瘤), Synapse (腹部多器官), ACDC (心脏) |
| 输入尺寸 | 128×128×128 (BraTS), 其他按数据集标准 |
| 优化器 | AdamW (lr=1e-4, weight_decay=0.01) |
| 训练轮数 | 1000 epochs |
| 学习率调度 | Polynomial decay |
| Batch size | 2 |
| 数据增强 | 随机翻转、旋转、强度缩放 |

### 模型配置（Table 1）
| 模型 | Params(M) | FLOPs(G) | Encoder Dims | Mamba/Trans Blocks |
|------|-----------|----------|--------------|-------------------|
| SegMaFormer-T | 0.7 | 5.1 | [16,32,64,128] | [1,1,1,1] |
| SegMaFormer-S | 2.0 | 12.0 | [32,64,128,256] | [1,1,1,1] |
| SegMaFormer-B | 7.8 | 43.3 | [64,128,256,512] | [1,1,1,1] |

### 主要实验结果

#### BraTS 2024 脑肿瘤分割（Table 2）
| 方法 | Params(M) | Avg Dice(%) | ET | TC | WT |
|------|-----------|-------------|-----|-----|-----|
| SegMamba | 108.17 | 91.81 | 90.43 | 92.56 | 92.44 |
| **SegMaFormer (Ours)** | **2.0** | **91.74** | **90.01** | **92.73** | **92.47** |
| SegFormer3D | 4.5 | 91.55 | 89.86 | 92.47 | 92.32 |
| UNETR | 92.49 | 91.44 | 89.71 | 92.49 | 92.11 |
| SwinUNETR | 62.19 | 91.21 | 89.32 | 92.06 | 92.25 |

**关键发现**：SegMaFormer以2.0M参数达到91.74%平均Dice，与108M参数的SegMamba仅差0.07%，参数量减少54倍。

#### Synapse 腹部多器官分割（Table 3）
| 方法 | Params(M) | Avg Dice(%) | AOR | LIV | LKID | RKID | GAL | PAN | SPL | STO |
|------|-----------|-------------|------|------|------|------|------|------|------|------|
| U-Mamba | 172.63 | 87.98 | 90.8 | 96.90 | 94.6 | 94.5 | 73.80 | 79.3 | 95.80 | 81.70 |
| nnFormer | 150.5 | 86.57 | 92.04 | 96.84 | 86.57 | 86.25 | 70.17 | 83.35 | 90.51 | 86.83 |
| **Ours** | **2.0** | **83.33** | 89.98 | 96.47 | 90.49 | 90.53 | 57.29 | 70.57 | 93.03 | 78.70 |
| SegFormer3D | 4.5 | 82.15 | 90.43 | 95.68 | 86.53 | 86.13 | 55.26 | 73.06 | 89.02 | 81.12 |
| UNETR | 92.49 | 79.56 | 89.99 | 94.46 | 85.66 | 84.80 | 60.56 | 59.25 | 87.81 | 73.99 |

**关键发现**：SegMaFormer以2.0M参数超越SegFormer3D（4.5M）1.18%，仅落后U-Mamba（172.63M）4.65%，参数量差距达86倍。

#### ACDC 心脏分割（Table 4）
| 方法 | Params(M) | Avg Dice(%) | RV | Myo | LV |
|------|-----------|-------------|-----|------|-----|
| nnFormer | 150.5 | 92.06 | 90.94 | 89.58 | 95.65 |
| **Ours** | **2.0** | **91.11** | 90.06 | 89.1 | 94.14 |
| SegFormer3D | 4.5 | 90.96 | 88.5 | 88.86 | 95.53 |

**关键发现**：3D-RoPE有效弥补了Mamba缺乏局部空间偏置的问题，使模型在ACDC上保持竞争力（与nnFormer仅差0.95%，参数量少75倍）。

### 消融实验与分析

论文通过实验验证了以下设计选择的有效性：
1. **Mamba在浅层 vs Transformer在深层**：浅层使用Mamba利用线性复杂度处理高分辨率token，深层使用Transformer捕获全局语义
2. **3D-RoPE的作用**：特别在ACDC数据集上，3D-RoPE显著提升了模型对局部空间结构的感知能力，弥补了纯Mamba架构的不足
3. **无CNN设计的可行性**：证明overlapped patch embedding + Mamba + Transformer的纯token化方案可以完全替代CNN

### 效率分析
| 对比维度 | SegMaFormer-S | SegMamba | nnFormer | UNETR |
|----------|--------------|----------|----------|-------|
| Params(M) | 2.0 | 108.17 | 150.5 | 92.49 |
| FLOPs(G) | 12.0 | - | - | - |
| 参数效率 | 基准 | 54× | 75× | 46× |

---

## 总结与展望

### 核心贡献
1. **提出SegMaFormer**：首个完全无CNN的轻量级Mamba-Transformer混合架构用于3D医学图像分割，仅2.0M参数
2. **阶段性混合策略**：根据特征分辨率合理分配Mamba（浅层/高分辨率）和Transformer（深层/低分辨率），实现效率与精度的最优平衡
3. **3D-RoPE位置编码**：将旋转位置编码扩展到3D空间，为纯序列模型提供空间先验，有效弥补Mamba的局部感知不足
4. **极致效率**：在三个主流基准上以2.0M参数达到与10-75倍大模型竞争的精度

### 局限性
1. 在Synapse数据集上与大模型（U-Mamba, nnFormer）仍有4-5%的差距，特别是在小器官（胆囊、胰腺）上表现较弱
2. 论文未提供推理速度（latency/throughput）的详细对比
3. 仅在三个数据集上验证，缺乏更广泛的泛化性评估

### 未来方向
1. 探索更深的Mamba-Transformer混合比例和动态路由策略
2. 将3D-RoPE与Mamba块更深度集成（当前主要用于Transformer块的注意力计算）
3. 在更多3D医学分割任务（如肺结节、血管分割）上验证泛化能力
4. 结合知识蒸馏进一步压缩模型

### 对领域的启示
本文证明了**纯token化架构**（无CNN）在3D医学图像分割中的可行性和高效性，为轻量化医学AI模型的设计提供了新范式。Mamba在浅层+Transformer在深层的混合策略为后续工作提供了重要的架构设计参考。
