### Show-o — 自回归与离散扩散的混合统一框架

```yaml
id: show-o
name: Show-o
full_name: "Show-o: One Single Transformer to Unify Multimodal Understanding and Generation"
year: "2024"
org: NUS
paper_url: https://arxiv.org/abs/2408.12528
category: unified
parent: chameleon
motivation: 自回归与离散扩散的混合统一框架
```

---

#### 📝 一句话总结

Show-o 提出用**单个自回归 Transformer**（基于 Phi-1.5, 1.3B 参数）同时完成多模态理解与视觉生成，核心创新在于 **Omni-Attention 机制**（文本因果注意力 + 图像全双向注意力）和**离散去噪扩散**（mask-and-predict）的混合建模策略，在理解与生成两类任务上均达到与专用模型可比的性能。

---

#### 🎯 核心要点

| 维度 | 内容 |
|------|------|
| **解决的问题** | 现有多模态模型要么只擅长理解（LLaVA 系列）、要么只擅长生成（DALL-E 系列），缺乏统一架构同时处理两类任务 |
| **关键洞察** | 文本天然适合自回归（因果序列），而图像生成更适合双向建模（全局一致性）；两者可在同一 Transformer 中通过灵活的注意力掩码共存 |
| **核心方法** | Omni-Attention：对文本 token 施加因果掩码（NTP），对图像 token 施加全注意力掩码（MTP/离散扩散），统一在同一 LLM 前向传播中 |
| **图像离散化** | MAGVIT-v2 编码器将 $256 \times 256$ 图像量化为 $16 \times 16 = 256$ 个离散 token，codebook 大小 8192 |
| **理解编码器** | 理解分支使用 CLIP-ViT-L/14 提取连续视觉特征（消融证明远优于 MAGVIT-v2 离散 token） |
| **训练策略** | 三阶段：① 图文对齐（595K，仅训连接器）→ ② 混合理解+生成（LoRA 微调 LLM）→ ③ 质量调优（全参数微调） |
| **推理加速** | 离散扩散支持 $\phi$-步采样（如 $\phi=16$ 步），配合自适应 CFG：$\ell = (1+t)\ell_c - t\ell_u$ |
| **主要结果** | 理解：VQAv2 81.6、GQA 61.3；生成：GenEval 0.53、DPG-Bench 62.15，均接近或超越同规模专用模型 |

---

#### 🔬 深入细节

##### 1. 整体架构

Show-o 的核心思想是在**单个预训练 LLM**（Phi-1.5, 1.3B）中同时支持多模态理解和图像生成，无需额外的扩散网络或独立生成器。

![Show-o 整体架构](https://arxiv.org/html/2408.12528v2/x2.png)
*图：Show-o 架构总览。左侧为多模态理解流程（CLIP-ViT 编码 → LLM 自回归解码），右侧为图像生成流程（文本 prompt → 离散扩散迭代去噪）。两条路径共享同一个 Transformer 骨干。*

##### 2. 图像 Tokenization 双轨设计

Show-o 对理解和生成使用**不同的图像编码方式**，这是一个关键的设计决策：

| 分支 | 编码器 | 表征类型 | Token 数 | 用途 |
|------|--------|---------|---------|------|
| **理解** | CLIP-ViT-L/14 | 连续特征 | 256 | 视觉问答、描述等 |
| **生成** | MAGVIT-v2 | 离散 token | 256 | 图像生成、编辑 |

消融实验表明，理解分支使用 CLIP-ViT 比使用 MAGVIT-v2 离散 token 在 VQAv2 上高出约 **20 个百分点**（81.6 vs ~61），验证了连续语义特征对理解任务的重要性。

##### 3. Omni-Attention 机制

Omni-Attention 是 Show-o 的核心创新，通过**灵活的注意力掩码**在同一 Transformer 中实现两种建模范式：

![Omni-Attention 机制](https://arxiv.org/html/2408.12528v2/x5.png)
*图：Omni-Attention 掩码设计。文本 token 之间使用因果掩码（下三角），图像 token 之间使用全注意力掩码（全 1），文本到图像为因果掩码，图像到文本为全注意力。*

具体掩码规则：

$$
M_{ij} = \begin{cases}
1 & \text{if } i, j \in \mathcal{T}_{\text{img}} \quad \text{(图像-图像：全注意力)} \\
\mathbb{1}[j \leq i] & \text{if } i, j \in \mathcal{T}_{\text{text}} \quad \text{(文本-文本：因果)} \\
1 & \text{if } i \in \mathcal{T}_{\text{img}}, j \in \mathcal{T}_{\text{text}} \quad \text{(图像→文本：全可见)} \\
\mathbb{1}[j \leq i] & \text{if } i \in \mathcal{T}_{\text{text}}, j \in \mathcal{T}_{\text{img}} \quad \text{(文本→图像：因果)}
\end{cases}
$$

这种设计的直觉是：
- **文本**需要因果建模以保持语言的自回归生成特性
- **图像**需要全局双向注意力以保证空间一致性（类似 BERT/扩散模型的全局感知）
- **跨模态**方向上，图像可以看到所有前置文本（条件信息），文本只能因果地看到前面的内容

##### 4. 离散去噪扩散（Mask-and-Predict）

生成分支采用**离散去噪扩散**而非连续扩散，核心是 mask-and-predict 策略：

**前向过程（加噪）：** 给定干净图像 token 序列 $\mathbf{x}_0$，按照 mask schedule $\gamma(t)$ 随机将部分 token 替换为 $[\text{MASK}]$：

$$
q(\mathbf{x}_t | \mathbf{x}_0) = \prod_{i=1}^{N} \left[ \gamma(t) \cdot \delta_{x_t^i, [\text{MASK}]} + (1 - \gamma(t)) \cdot \delta_{x_t^i, x_0^i} \right]
$$

其中 $\gamma(t) \in [0, 1]$ 是单调递增的 mask ratio，$t=1$ 时全部被 mask。

**反向过程（去噪）：** 模型预测被 mask 位置的原始 token，损失为 Mask Token Prediction (MTP)：

$$
\mathcal{L}_{\text{MTP}} = -\mathbb{E}_{t, \mathbf{x}_0} \left[ \sum_{i: x_t^i = [\text{MASK}]} \log p_\theta(x_0^i | \mathbf{x}_t, \mathbf{c}) \right]
$$

其中 $\mathbf{c}$ 是文本条件。

**推理时的迭代去噪：** 从全 $[\text{MASK}]$ 序列开始，分 $\phi$ 步逐步 unmask：

```text
算法: Show-o 离散扩散推理
输入: 文本条件 c, 总步数 φ, mask schedule γ
输出: 生成的图像 token 序列 x_0

1. x_φ ← [MASK] × N          // 初始化全 mask 序列 (N=256)
2. for t = φ, φ-1, ..., 1:
3.     p_θ(x_0 | x_t, c) ← LLM(x_t, c)    // 预测所有 mask 位置
4.     // 自适应 CFG
5.     ℓ ← (1 + t/φ) · ℓ_c - (t/φ) · ℓ_u
6.     // 选择置信度最高的 k 个位置 unmask
7.     k ← N · (γ(t) - γ(t-1)) / γ(t)
8.     top_k_indices ← argsort(confidence(p_θ))[-k:]
9.     x_{t-1} ← x_t
10.    x_{t-1}[top_k_indices] ← argmax(p_θ)[top_k_indices]
11. return x_0
```

##### 5. 统一 Prompt 格式

![统一 Prompt 格式](https://arxiv.org/html/2408.12528v2/x3.png)
*图：Show-o 的统一输入格式。理解任务和生成任务使用相同的 prompt 模板，通过特殊 token 区分图像区域。*

Show-o 使用统一的 prompt 格式处理不同任务：

- **理解任务：** `[USER]: <image_tokens> Question [ASSISTANT]: Answer`
  - `<image_tokens>` 来自 CLIP-ViT 的连续特征
  
- **生成任务：** `[USER]: Please generate an image: caption [ASSISTANT]: <mask_tokens>`
  - `<mask_tokens>` 初始化为 256 个 $[\text{MASK}]$ token，经离散扩散迭代去噪

- **混合任务（如编辑）：** 同时包含输入图像（CLIP 编码）和输出图像（MAGVIT-v2 离散 token）

##### 6. 三阶段训练流程

| 阶段 | 数据 | 可训参数 | 损失 | 目标 |
|------|------|---------|------|------|
| **Stage 1: 图文对齐** | 595K 图文对（CC3M 子集） | 仅 embedding + connector | NTP | 对齐视觉-语言表征 |
| **Stage 2: 混合训练** | 理解数据 + 生成数据混合 | LLM (LoRA, r=128) + embedding | NTP + MTP | 同时学习理解和生成 |
| **Stage 3: 质量调优** | 高质量子集 | 全部参数 | NTP + MTP | 提升生成质量 |

关键设计：
- Stage 2 使用 **LoRA**（rank=128）而非全参数微调，防止灾难性遗忘
- 理解和生成数据在每个 batch 中**混合采样**，而非交替训练
- Stage 3 解冻全部参数进行精调，进一步提升生成质量

##### 7. 实验结果

**多模态理解：**

| 模型 | 参数量 | VQAv2 | GQA | VizWiz | TextVQA |
|------|--------|-------|-----|--------|---------|
| LLaVA-Phi (专用) | 2.7B | 71.4 | — | 35.9 | 28.9 |
| **Show-o** | **1.3B** | **81.6** | **61.3** | **39.4** | **45.8** |

**文本到图像生成：**

| 模型 | 类型 | GenEval ↑ | DPG-Bench ↑ |
|------|------|-----------|-------------|
| SDv1.5 (专用扩散) | 扩散 | 0.43 | 63.18 |
| LlamaGen (专用AR) | 自回归 | 0.32 | — |
| **Show-o** | **统一** | **0.53** | **62.15** |

##### 8. 关键消融实验

**理解编码器选择：**
- CLIP-ViT-L/14 连续特征 → VQAv2 **81.6**
- MAGVIT-v2 离散 token → VQAv2 ~**61**（下降约 20 点）
- 结论：**语义连续特征对理解至关重要**，离散量化会丢失细粒度语义信息

**Omni-Attention vs 纯因果注意力：**
- Omni-Attention（图像全注意力）→ 生成质量显著优于纯因果注意力
- 纯因果注意力下图像 token 只能看到左上方的 token，缺乏全局一致性

**自适应 CFG 的效果：**

$$
\ell = (1 + t) \cdot \ell_c - t \cdot \ell_u
$$

其中 $t \in [0, 1]$ 为归一化时间步。早期（$t$ 大）引导强度高以确定全局结构，后期（$t$ 小）引导减弱以保留细节多样性。相比固定 CFG scale，自适应策略在 FID 和语义对齐上均有提升。

---

#### 🧪 练习题

**Q1（概念理解）：** Show-o 为什么对理解和生成分别使用 CLIP-ViT 和 MAGVIT-v2 两种不同的图像编码器，而不统一使用一种？

<details><summary>参考答案</summary>

理解任务需要**高层语义特征**来回答问题、描述内容，CLIP-ViT 的连续特征保留了丰富的语义信息（消融实验显示比 MAGVIT-v2 高约 20 点）。而生成任务需要**像素级重建能力**，MAGVIT-v2 的离散 token 可以通过 codebook 解码回高质量图像。两种编码器各有所长，统一使用任一种都会在另一个任务上显著退化。这也是后续工作 UniTok 等试图解决的问题。

</details>

**Q2（方法细节）：** 在 Omni-Attention 中，为什么图像 token 之间需要全注意力（bidirectional）而不是因果注意力？

<details><summary>参考答案</summary>

图像具有**二维空间结构**，像素之间的依赖关系是全局的（如对称性、全局色调一致性）。如果使用因果注意力，图像 token 被强制排列为一维序列，每个 token 只能看到序列中前面的 token，这意味着右下角的像素无法直接参考左上角的信息，导致生成的图像缺乏全局一致性。全注意力允许每个图像 token 与所有其他图像 token 交互，类似于扩散模型中 U-Net 的全局感受野，从而保证空间一致性。

</details>

**Q3（公式推导）：** Show-o 的离散扩散前向过程 $q(\mathbf{x}_t | \mathbf{x}_0)$ 中，当 $\gamma(t) = 1$ 时，$\mathbf{x}_t$ 的分布是什么？当 $\gamma(t) = 0$ 时呢？这与连续扩散的 $q(\mathbf{x}_T | \mathbf{x}_0) = \mathcal{N}(0, I)$ 有何对应关系？

<details><summary>参考答案</summary>

- 当 $\gamma(t) = 1$ 时，所有 token 都被替换为 $[\text{MASK}]$，即 $\mathbf{x}_t$ 是全 mask 序列，对应**纯噪声**状态。这类比连续扩散中 $t=T$ 时 $\mathbf{x}_T \sim \mathcal{N}(0, I)$（纯高斯噪声）。
- 当 $\gamma(t) = 0$ 时，没有 token 被 mask，$\mathbf{x}_t = \mathbf{x}_0$，即**干净数据**。对应连续扩散中 $t=0$ 时 $\mathbf{x}_0$ 本身。
- 核心对应：连续扩散通过加高斯噪声破坏信息，离散扩散通过随机 mask 破坏信息；两者都是从"无信息"状态逐步恢复到"完整信息"状态。

</details>