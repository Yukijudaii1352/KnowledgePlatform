### Show-o2

```yaml
id: show-o2
name: "Show-o2"
paper: "Show-o2: Improved Native Unified Multimodal Models"
arxiv: "https://arxiv.org/abs/2506.15564"
year: 2025
org: "NUS Show Lab & ByteDance"
category: unified
parent: show-o
motivation: "强化原生多模态理解与生成协同"
```

📝 **一句话总结**：Show-o2 在 3D 因果 VAE 空间上，通过双路径空间(-时间)融合构建统一视觉表征，结合自回归建模（语言头）与 Flow Matching（流头）实现原生多模态理解与图像/视频生成的统一。

---

🎯 **核心要点**

- **统一视觉表征**：提出双路径（Dual-Path）架构——语义层 $\mathcal{S}(\cdot)$（从 SigLIP 蒸馏）提取高层语义特征 + 投影器 $\mathcal{P}(\cdot)$ 保留低层完整信息，通过空间(-时间)融合（STF）拼接后经 RMSNorm + MLP 得到统一表征 $\mathbf{u}$，同时服务于理解和生成任务。
- **原生双头建模**：基于 LLM（Qwen2.5），语言头用自回归 NTP 预测文本 token，流头（DiT 风格 Transformer + adaLN-Zero）用 Flow Matching 预测视觉 latent 的速度场，训练损失 $\mathcal{L} = \alpha \mathcal{L}_{\text{NTP}} + \mathcal{L}_{\text{FM}}$。
- **3D 因果 VAE**：采用 Wan2.1 的 3D Causal VAE（8× 空间压缩 + 4× 时间压缩），天然支持图像和视频两种模态的统一编解码。
- **Omni-Attention 机制**：序列级因果注意力 + 视觉表征内部全注意力，兼顾自回归生成的因果性和视觉 token 间的全局交互。
- **两阶段训练 + 模型缩放**：Stage-1 冻结 LLM 训练投影器/融合层/流头（66M 图文对）；Stage-2 全模型微调（9M 高质量理解 + 16M 高质量生成数据）。小模型（1.5B）流头可复用到大模型（7B），通过 MLP 对齐隐藏维度快速适配。
- **SOTA 表现**：1.5B 模型在 MME-p（1450.9）、MMMU（37.1）等理解基准上超越同规模 Janus-Pro；7B 模型在 DPG-Bench（86.14）上超越 SD3-Medium 和 Janus-Pro-7B；视频生成 VBench 总分 81.34 超越 Show-1、Emu3、VILA-U。

---

🔬 **深入细节**

#### 1. 整体架构

![Show-o2 Architecture](https://ar5iv.labs.arxiv.org/html/2506.15564/assets/x1.png)

**图1**：Show-o2 整体架构。输入文本/图像/视频分别经文本 tokenizer 和 3D Causal VAE 编码器处理为连续嵌入和视觉 latent。视觉 latent 经双路径提取 + 空间(-时间)融合构建统一视觉表征，与文本嵌入组成交错序列送入 LLM。语言头自回归预测文本，流头通过 Flow Matching 处理图像/视频 latent。

**序列格式**：
```
[BOS] {Text} [BOI/BOV] {Image/Video} [EOI/EOV] {Text} ... [EOS]
```

#### 2. 统一视觉表征的双路径设计

**核心问题**：多模态理解需要高层语义特征，而生成需要保留完整的低层细节信息。如何用一套视觉表征同时服务两个任务？

**解决方案**：

```
输入: 视觉 latent x_t (可能带噪声)
│
├── 语义路径 S(·): SigLIP ViT blocks + 2×2 patch embedding
│   └── 提取高层语义特征（从 SigLIP 蒸馏初始化）
│
├── 投影路径 P(·): 线性投影
│   └── 保留完整低层信息
│
└── 空间(-时间)融合 STF:
    concat(S(x_t), P(x_t)) → RMSNorm → MLP → MLP → u
```

**语义层预蒸馏**：关键创新是让语义层 $\mathcal{S}(\cdot)$ 能从**带噪声的视觉 latent** 中提取语义特征。训练时对视觉 latent 加噪 $\mathbf{x}_t = t \cdot \mathbf{x}_1 + (1-t) \cdot \mathbf{x}_0$（$\mathbf{x}_0 \sim \mathcal{N}(0,1)$），蒸馏目标为最大化与 SigLIP 原始特征的余弦相似度：

$$\mathcal{L}_{\text{distill}} = -\sum \log \text{sim}(\mathcal{S}(\mathbf{x}_t), \text{SigLIP}(\mathbf{X}))$$

蒸馏后，干净 latent 的特征与 SigLIP 原始特征余弦相似度达 ~0.9。这使得**同一套表征在生成过程中（带噪声）和理解过程中（干净）都能提供有效语义信息**。

**时间步嵌入**：统一视觉表征前置一个时间步 $t$ 的嵌入。对于理解任务（干净图像），$t=1.0$；对于生成任务，$t$ 为当前去噪步。

#### 3. Flow Head 与 Flow Matching

```python
# 伪代码: Show-o2 训练流程
def train_step(text_tokens, visual_latents, is_generation):
    # 1. 文本编码
    text_emb = text_tokenizer(text_tokens)
    
    # 2. 视觉编码 (3D Causal VAE)
    x1 = causal_vae_encode(visual_latents)  # 干净 latent
    
    if is_generation:
        # 3a. 加噪 (Flow Matching 线性插值)
        t = uniform(0, 1)
        x0 = randn_like(x1)  # 噪声
        xt = t * x1 + (1 - t) * x0  # 带噪 latent
        v_target = x1 - x0  # 目标速度
    else:
        xt = x1  # 理解任务用干净 latent
        t = 1.0
    
    # 4. 双路径提取 + 融合
    sem_feat = semantic_layers(xt)      # S(·): 高层语义
    proj_feat = projector(xt)           # P(·): 低层信息
    unified_repr = STF(sem_feat, proj_feat)  # 空间(-时间)融合
    unified_repr = prepend(time_embed(t), unified_repr)
    
    # 5. 构建交错序列, 送入 LLM
    sequence = interleave(text_emb, unified_repr)  # [BOS] text [BOI] visual [EOI] ...
    hidden = LLM(sequence, attention='omni')  # 因果+视觉内全注意力
    
    # 6. 双头预测
    L_NTP = language_head(hidden, text_tokens)  # 自回归文本预测
    if is_generation:
        v_pred = flow_head(hidden, t)  # DiT-style transformer + adaLN-Zero
        L_FM = mse(v_pred, v_target)   # Flow Matching 损失
    
    # 7. 总损失
    loss = alpha * L_NTP + L_FM  # alpha=0.2(Stage1), 1.0(Stage2)
    return loss

# 推理: 图像生成
def generate_image(text_prompt, steps=50, cfg_scale=7.5):
    xt = randn(latent_shape)  # 从噪声开始
    for t in linspace(0, 1, steps):
        v = flow_head(LLM_encode(text_prompt, xt, t))
        xt = xt + v * dt  # ODE 积分
    image = causal_vae_decode(xt)
    return image
```

**Flow Head 结构**：由若干 Transformer 层组成，使用 DiT 风格的 adaLN-Zero 块进行时间步调制。与 DiT 不同的是，它接收的是 LLM 输出的隐藏状态而非独立编码的特征。

#### 4. 两阶段训练策略

| | 可训练组件 | 数据 | 关键设置 |
|---|---|---|---|
| **预蒸馏** | 语义层 $\mathcal{S}(\cdot)$ | SigLIP 特征 | 200K iter, batch=512, 最后20K加噪(p=0.3) |
| **Stage-1** | 投影器 + STF + 流头 | 66M 图文 + WebVid + OmniCorpus | 150K iter, α=0.2, 64×H100, ~1.5天 |
| **Stage-2** | 全模型(除VAE) | 9M 理解指令 + 16M 高质量生成 | 35K iter, α=1.0, ~15小时 |

**模型缩放策略**：1.5B→7B 时，复用小模型预训练的流头，新增轻量 MLP 对齐隐藏维度（3K iter 预热），然后按相同两阶段流程训练。7B 模型总训练约 2.5 天（128×H100）。

#### 5. 消融实验关键发现

| 消融项 | 结论 |
|---|---|
| **空间(-时间)融合** | 加入融合后 MME-p 从 1164.7→1187.8，FID 从 21.8→20.5，理解和生成同时提升 |
| **CFG 引导强度** | CFG=7.5 为最佳平衡点；>5.0 后 GenEval 提升不显著 |
| **推理步数** | 50 步为默认，100 步略有提升但边际收益递减 |
| **训练阶段** | Stage-2 使 GenEval 从 0.63→0.73，DPG-Bench 从 83.28→84.70，显著提升 |

#### 6. 与前作 Show-o 的关键区别

| 特性 | Show-o | Show-o2 |
|---|---|---|
| 视觉编码 | 离散 VQ tokenizer | 3D Causal VAE（连续 latent） |
| 生成范式 | 离散扩散 | Flow Matching |
| 视觉表征 | 单路径 | 双路径（语义+投影）+ 融合 |
| 视频支持 | ❌ | ✅（3D VAE 天然支持） |
| 模型规模 | 1.3B | 1.5B / 7B |
| 理解性能 | MME-p 1097.2 | MME-p 1450.9 / 1620.5 |

#### 7. 局限性

- **文字渲染能力不足**：训练数据中含文字的图像比例较小，已通过增加 TextAtlas 数据和高分辨率训练缓解。
- **小物体细节缺失**：受限于图像分辨率（432×432 基础），已扩展到 512×512 和 1024×1024。
- **7B 模型未训练视频**：因计算成本限制，7B 模型未包含视频和交错数据训练。

---

🧪 **练习题**

1. **概念理解**：Show-o2 为什么需要对语义层 $\mathcal{S}(\cdot)$ 进行"带噪声蒸馏"？如果只用干净 latent 蒸馏会有什么问题？
   <details><summary>参考答案</summary>在生成过程中，视觉 latent 从纯噪声逐步去噪，中间状态都是带噪声的。如果语义层只在干净 latent 上训练，那么在生成的中间步骤中它无法提取有效语义特征，导致 LLM 无法根据当前生成状态做出正确的上下文理解。带噪声蒸馏使语义层在任意噪声水平下都能提取语义信息，实现理解和生成的真正统一。</details>

2. **设计分析**：Show-o2 使用 Omni-Attention（序列因果 + 视觉内全注意力）而非纯因果注意力，这对图像生成有什么好处？
   <details><summary>参考答案</summary>图像/视频的视觉 token 之间存在强空间相关性，纯因果注意力会限制后面的 token 只能看到前面的 token，破坏空间结构。全注意力让所有视觉 token 互相可见，Flow Head 可以基于完整的空间上下文预测速度场，类似于 DiT 中的双向注意力，这对生成高质量图像至关重要。同时序列级因果注意力保证了文本→图像的条件生成方向。</details>

3. **工程思考**：Show-o2 从 1.5B 缩放到 7B 时复用了小模型的流头，为什么这种策略可行？如果直接随机初始化流头会怎样？
   <details><summary>参考答案</summary>流头学习的是从噪声到干净图像的速度场预测，这个映射关系与 LLM 的隐藏维度无关（通过 MLP 对齐后）。小模型已经学到了有效的去噪模式，复用这些权重可以大幅减少大模型的训练时间和计算成本。随机初始化则需要从头学习整个去噪过程，收敛更慢，且在有限训练预算下可能达不到同等质量。论文中仅需 3K iter 预热即可完成维度对齐适配。</details>