### Cosmos World Foundation Model Platform for Physical AI

```yaml
标题: "Cosmos World Foundation Model Platform for Physical AI"
作者: "NVIDIA (Agarwal et al.)"
机构: "NVIDIA"
发表: "arXiv 2501.03575, 2025年1月"
链接: "https://arxiv.org/abs/2501.03575"
代码: "https://github.com/NVIDIA/Cosmos"
领域: "视频生成 / 世界模型 / Physical AI"
```

---

## 一句话总结

Cosmos 提出了一个面向 Physical AI 的**世界基础模型 (WFM) 平台**，包含视频 Tokenizer、扩散 Transformer 和自回归 Transformer 双路径预训练模型，以及面向相机控制、机器人操控和自动驾驶的后训练流程，在 1 亿视频片段上预训练，实现了高质量、物理一致的视频世界生成。

---

## 核心要点

| 维度 | 内容 |
|------|------|
| **解决的问题** | Physical AI（机器人、自动驾驶）需要理解和预测物理世界的未来状态，但现有视频生成模型缺乏物理一致性和可控性 |
| **核心思路** | 构建"预训练 + 后训练"范式的世界基础模型平台：先在大规模多样视频上预训练通用世界模型，再针对具体 Physical AI 任务微调 |
| **关键创新** | ① 双路径架构（Diffusion + Autoregressive Transformer）；② 连续/离散双模态视频 Tokenizer（8×8×8 时空压缩）；③ AdaLN-LoRA 参数高效设计（减少 36% 参数）；④ 完整的数据策展→预训练→后训练→安全护栏流水线 |
| **主要结果** | Diffusion 7B/14B 和 AR 4B-13B 模型在视频生成质量、3D 一致性和物理真实性上表现优异；后训练成功应用于相机轨迹控制、机器人操控预测和自动驾驶场景 |
| **局限性** | AR 模型存在物体从底部突然出现的伪影；离散 tokenizer 有损压缩导致模糊；文本条件对 AR 模型效果有限；世界模型问题远未解决 |

---

## 深入细节

### 1. 问题定义与整体架构

**世界基础模型 (WFM)** 被形式化定义为：

$$\hat{x}_{t+1} = \mathcal{W}(x_{0:t}, c_t)$$

其中 $x_{0:t}$ 是过去的视觉观测序列（RGB 视频），$c_t$ 是当前扰动（可以是动作指令、文本描述、随机扰动等），$\hat{x}_{t+1}$ 是预测的下一时刻观测。

**平台架构总览：**

![Cosmos Platform Overview](https://ar5iv.labs.arxiv.org/html/2501.03575/assets/figures/cosmos_teaser_v3.jpg)

整个平台包含四大模块：
1. **数据策展管线** — 从 20M 小时视频中提取 100M 高质量片段
2. **视频 Tokenizer** — 连续/离散双模态编码器
3. **预训练 WFM** — Diffusion 和 Autoregressive 双路径
4. **后训练 WFM** — 面向相机控制、机器人、自动驾驶的专用模型

WFM 的应用场景包括：策略评估（在虚拟世界中测试策略）、策略初始化、策略训练（配合奖励模型做 RL）、规划/模型预测控制、合成数据生成。

---

### 2. 视频 Tokenizer（Sec 4）

Cosmos Tokenizer 是一套同时支持**连续**和**离散**表示的因果视频 tokenizer。

**架构设计：**
- 基于注意力机制的 encoder-decoder 架构
- **因果时空压缩**：支持 8×8×8（时间×高度×宽度）的压缩率
- 第一个时间 token 对应第一帧，实现图像 ($T=0$) 和视频 ($T>0$) 的联合 tokenization

**两种 token 类型：**

| 类型 | 潜在维度 | 量化方式 | 用途 |
|------|---------|---------|------|
| **连续 token** | 16 维向量 | 无量化 | 扩散模型输入 |
| **离散 token** | 6 维 FSQ | FSQ levels = (8,8,8,5,5,5)，词表大小 64,000 | 自回归模型输入 |

> **FSQ (Finite Scalar Quantization)**：将每个维度量化到有限个离散级别，避免了 VQ-VAE 中码本坍塌的问题。6 个维度分别量化到 8/8/8/5/5/5 个级别，总词表 $8^3 \times 5^3 = 64{,}000$。

**训练策略：**
- 联合图像-视频训练，共享潜在空间
- 多种压缩率变体（如 CV8x8x8 表示连续视频 8×8×8 压缩）

```
伪代码：Cosmos Tokenizer
输入: 视频 V ∈ R^{T×3×H×W}
# 编码
z = Encoder(V)  # z ∈ R^{T/8 × C × H/8 × W/8}
# 连续路径
z_cont = z  # C=16, 直接用于扩散模型
# 离散路径  
z_disc = FSQ(z)  # 6维, 每维量化为整数索引, 词表64k
# 解码
V_recon = Decoder(z_cont) 或 Decoder(Lookup(z_disc))
```

---

### 3. 扩散世界基础模型（Sec 5.1）

基于 **Transformer 的扩散模型**，使用连续 token 和 flow matching 训练。

**核心架构组件：**

**① 3D Patchification**
- 输入潜在表示 $T \times C \times H \times W$
- 用线性层将非重叠 3D 块 $(p_t, p_h, p_w) = (1, 2, 2)$ 投影为 token
- 展平为 1D 时空序列，长度 $THW/(p_t \cdot p_h \cdot p_w)$

**② 混合位置编码：FPS-aware 3D RoPE + 可学习嵌入**
- **3D 分解 RoPE**：将特征维度分为三个近似相等的块，分别沿时间、高度、宽度轴施加 RoPE
- **FPS 感知**：根据视频帧率缩放时间频率，支持不同帧率的视频
- **NTK-RoPE**：渐进式训练中改变分辨率/视频长度时快速收敛（5000 步内达到合理性能）
- **额外可学习绝对位置嵌入**：每个 Transformer block 添加，减少形变伪影

**③ 文本条件：Cross-Attention**
- 每个 Transformer block：Self-Attention → Cross-Attention → FFN
- Cross-Attention 使用 **T5-XXL** 文本嵌入作为 key/value

**④ QK 归一化**
- 对 Q 和 K 使用 RMSNorm（带可学习缩放），防止注意力 logit 增长导致的训练不稳定

**⑤ AdaLN-LoRA（关键创新）**
- DiT 的自适应层归一化 (AdaLN) 占大量参数但 FLOPs 贡献极小
- 用 LoRA 分解 AdaLN 中的密集线性投影为低秩近似
- **效果**：参数从 11B 降至 7B（减少 36%），性能不变

```
伪代码：Cosmos Diffusion WFM 前向
输入: 噪声潜在 z_t, 时间步 t, 文本嵌入 text_emb
# 3D Patchify
tokens = LinearProject(z_t, patch_size=(1,2,2))  # [B, L, D]
# 添加位置编码
tokens += LearnableAPE(tokens)
for block in transformer_blocks:
    # 3D RoPE 应用于 Q, K
    q, k, v = block.self_attn_proj(tokens)
    q, k = apply_3d_rope(q, k, fps)
    q, k = rms_norm(q), rms_norm(k)  # QK-Norm
    tokens = self_attention(q, k, v)
    # Cross-attention with text
    tokens = cross_attention(tokens, text_emb)
    # AdaLN-LoRA + FFN
    tokens = adaln_lora(tokens, t) → ffn(tokens)
# Unpatchify
output = Unpatchify(tokens)
```

**模型规模：**
- Cosmos-1.0-Diffusion-**7B**（AdaLN-LoRA 优化后）
- Cosmos-1.0-Diffusion-**14B**

**训练配方：**
- 渐进式训练：从低分辨率短视频逐步增加到高分辨率长视频
- Flow matching 目标函数
- 联合图像-视频训练

---

### 4. 自回归世界基础模型（Sec 5.2）

基于 **Transformer 的自回归模型**，使用离散 token 和 next-token prediction。

**架构设计：**

![AR Architecture](https://ar5iv.labs.arxiv.org/html/2501.03575/assets/figures/ar_architecture.png)

- 输入视频 → Cosmos-1.0-Tokenizer-DV8x16x16 编码为离散 token → 学习嵌入
- 重复 Transformer block：APE + 3D RoPE → Self-Attention → Cross-Attention (T5) → 2-layer MLP
- 输出 token → Tokenizer 解码器重建视频

**与扩散模型的关键差异：**

| 特性 | 扩散模型 | 自回归模型 |
|------|---------|-----------|
| Token 类型 | 连续（16维向量） | 离散（FSQ 64k 词表） |
| 生成方式 | 从噪声逐步去噪 | 逐 token 预测 |
| 位置编码 APE | 可学习嵌入 | 正弦嵌入 |
| RoPE 扩展 | NTK-RoPE | YaRN（仅时间轴） |
| 训练目标 | Flow matching | Cross-entropy (next-token) |

**词表设计：**
- 视频 token 词表：64,000（来自 FSQ tokenizer）
- 文本 token 词表：与 LLM tokenizer 共享
- 总词表 = 视频词表 + 文本词表

**Diffusion Decoder 增强：**
- AR 模型输出因离散 tokenizer 有损压缩而模糊
- 将 AR 输出通过扩散解码器增强清晰度，同时保持内容一致性

**模型规模：**
- Cosmos-1.0-Autoregressive-**4B** / **12B**（无文本条件）
- Cosmos-1.0-Autoregressive-**5B** / **13B**-Video2World（有文本条件）

**失败率分析：**

| 模型 | 图像条件 | 视频条件(9帧) |
|------|---------|-------------|
| AR-4B | 15% | 1% |
| AR-5B-V2W | 7% | 2% |
| AR-12B | 2% | 1% |
| AR-13B-V2W | 3% | 0% |

---

### 5. 数据策展管线（Sec 3）

**规模：** 从 20M 小时视频中提取约 **100M 视频片段**（2-60 秒）

**关键流程：**
1. **视频解码/转码**：利用 GPU 硬件 H.264 编解码器加速
2. **动态丰富度筛选**：定位富含动态和高视觉质量的片段
3. **VLM 字幕生成**：每 256 帧使用视觉语言模型生成一个字幕
4. **Ray 编排管线**：协调不同吞吐量的预训练理解模型，最大化整体处理速度

---

### 6. 后训练（Sec 6）

#### 6.1 相机可控性后训练
- 微调预训练 Diffusion WFM，使其以**相机位姿**为条件
- 创建可导航的虚拟世界，用户可通过移动虚拟视点探索生成的世界

#### 6.2 机器人操控后训练
- 在视频-动作序列数据上微调 WFM
- 利用预训练 WFM 的先验知识，更好地预测机器人动作导致的未来世界状态
- 支持指令跟随的机器人操控任务

#### 6.3 自动驾驶后训练
- 针对自动驾驶相关任务微调预训练 WFM
- 生成驾驶场景的未来状态预测

---

### 7. 安全护栏（Sec 7）

- **Pre-Guard**：阻止有害输入进入模型
- **Post-Guard**：阻止有害输出被返回给用户
- 为 Physical AI 开发者提供安全保障

---

### 8. 关键技术总结图

```
┌─────────────────────────────────────────────────────────┐
│                 Cosmos WFM Platform                      │
├─────────────┬───────────────────────────────────────────┤
│  数据策展    │ 20M小时 → 100M片段, Ray编排, VLM字幕      │
├─────────────┼───────────────────────────────────────────┤
│  Tokenizer  │ 连续(16D) + 离散(FSQ 64k), 8×8×8压缩     │
├─────────────┼─────────────────┬─────────────────────────┤
│  预训练WFM  │ Diffusion 7B/14B│ Autoregressive 4B-13B   │
│             │ 连续token        │ 离散token               │
│             │ Flow matching    │ Next-token prediction   │
│             │ 3D RoPE+学习APE  │ 3D RoPE+正弦APE+YaRN   │
│             │ AdaLN-LoRA       │ Diffusion decoder增强   │
├─────────────┼─────────────────┴─────────────────────────┤
│  后训练     │ 相机控制 | 机器人操控 | 自动驾驶             │
├─────────────┼───────────────────────────────────────────┤
│  安全护栏   │ Pre-Guard (输入过滤) + Post-Guard (输出过滤)│
└─────────────┴───────────────────────────────────────────┘
```

---

## 练习题

### 概念理解

1. **世界基础模型 (WFM) 与传统视频生成模型的核心区别是什么？** WFM 不仅生成视觉上逼真的视频，还需要对物理世界的动态规律建模，能够根据输入的扰动（动作、指令等）预测物理一致的未来状态。

2. **为什么 Cosmos 同时采用扩散和自回归两种架构？各自的优劣是什么？** 扩散模型生成质量更高（连续 token 无量化损失），但推理需要多步去噪；自回归模型推理更灵活（逐 token 生成，易于与 LLM 集成），但离散化导致信息损失。两者互补。

3. **AdaLN-LoRA 的设计动机是什么？为什么 AdaLN 层适合用 LoRA 压缩？** AdaLN 层占大量参数但 FLOPs 贡献极小（仅做逐元素仿射变换的参数生成），说明其内在维度较低，适合低秩近似。LoRA 分解使参数从 11B 降至 7B 而不损失性能。

4. **FSQ 相比 VQ-VAE 的优势是什么？** FSQ 直接将每个维度量化到有限级别，避免了 VQ-VAE 中常见的码本坍塌问题和辅助损失的调参困难。

### 深入思考

5. **如果要将 Cosmos 扩展到更长的视频生成（如 10 分钟），你认为主要的技术瓶颈在哪里？** 提示：考虑 token 序列长度、注意力复杂度、时间一致性维持、以及 RoPE 外推能力。

6. **论文提到 AR 模型的文本条件效果有限，你认为可能的改进方向是什么？** 提示：考虑预训练阶段文本-视频对齐的比例、CLIP 对比学习、以及 instruction tuning 策略。

7. **设计一个实验来验证 WFM 在机器人策略训练中的有效性。** 提示：对比使用 WFM 生成的合成数据 vs 纯真实数据训练策略模型的成功率，控制数据量变量。