### WAVE

```yaml
id: wave
name: WAVE
full_name: 统一音视频嵌入 (Unified Audio-Visual Embeddings)
year: 2026.05
org: ICLR2026
paper_url: https://arxiv.org/abs/2509.21990
code_url: https://github.com/TCL606/WAVE
category: multimodal
parent: bert
motivation: 首个LLM统一音视频嵌入
```

#### 📝 一句话总结

WAVE 提出首个基于 LLM 的统一多模态嵌入模型，通过双音频编码器架构与分层全层特征融合，将文本、音频、无声视频和音视频同步输入映射到统一语义空间，在 MMEB-v2 视频赛道取得 SOTA 并支持跨模态任意对检索。

#### 🎯 核心要点

- **首个统一音视频嵌入 LLM**：单一模型同时处理文本、音频、无声视频、音视频四种模态，支持 any-to-any 跨模态检索
- **双音频编码器设计**：Speech Encoder（来自 Qwen2.5-Omni，擅长语音/音乐）+ BEATs Encoder（擅长环境音效），互补覆盖全音频语义
- **分层全层特征融合**：收集 LLM 所有 28 层的 last-token 隐状态，拼接后通过 2 层 MLP（GELU）生成最终嵌入，优于仅用最后一层
- **联合多模态多任务训练**：同时训练检索（对称 InfoNCE）+ QA（对比式蒸馏），4.9M 样本覆盖视频-文本、音频-文本、视频-音频三类对
- **Prompt-aware 嵌入**：利用 LLM 指令跟随能力，根据不同问题生成条件化嵌入，QA 任务超 Seed-1.6-Embedding 约 12%
- **高效微调**：基于 Qwen2.5-Omni 7B，仅训练 LoRA（rank=128）+ 视觉对齐器 + 融合 MLP，192 GPU 训练 36 小时
- **TMRoPE 时序对齐**：为音频和视频 token 分配统一时间戳位置编码，实现帧级音视频对齐

#### 🔬 深入细节

![WAVE 架构总览](https://raw.githubusercontent.com/TCL606/WAVE/main/assets/wave.jpg)
*图：WAVE 模型架构。左侧为双音频编码器（Speech Encoder + BEATs），右侧为视觉编码器，中间为 LLM backbone 及分层融合模块。*

```python
# WAVE 前向推理伪代码
def wave_forward(text_prompt, video=None, audio=None):
    # 1. 编码各模态输入
    text_tokens = tokenize(text_prompt)
    
    if video is not None:
        # 视觉编码：2fps采样，最多128帧
        visual_tokens = visual_encoder(video)  # ViT from Qwen2.5-Omni
        visual_tokens = visual_aligner(visual_tokens)
    
    if audio is not None:
        # 双音频编码
        speech_tokens = speech_encoder(audio)  # Qwen2.5-Omni speech encoder
        beats_tokens = beats_encoder(audio)    # BEATs for environmental sounds
        beats_tokens = beats_aligner(beats_tokens)  # 2-layer MLP alignment
    
    # 2. TMRoPE 时序对齐：为音频/视频 token 分配统一时间戳
    all_tokens = concat(text_tokens, visual_tokens, speech_tokens, beats_tokens)
    position_ids = compute_tmrope(all_tokens, timestamps)
    
    # 3. LLM 前向（带 LoRA）
    hidden_states = []  # 收集所有层的隐状态
    x = all_tokens
    for layer in llm.layers:  # 28 layers
        x = layer(x, position_ids)  # with LoRA adapters
        hidden_states.append(x[:, -1, :])  # last token of each layer
    
    # 4. 分层融合生成最终嵌入
    if modality == "text":
        embedding = hidden_states[-1]  # 文本用标准 last-token pooling
    else:
        # 多模态：拼接所有层 last-token → MLP 融合
        concat_features = torch.cat(hidden_states, dim=-1)  # [28 * hidden_dim]
        embedding = fusion_mlp(concat_features)  # 2-layer MLP with GELU
    
    return F.normalize(embedding, dim=-1)

# 5. 对比学习损失
def compute_loss(query_embs, target_embs, tau=0.01):
    # 对称 InfoNCE with in-batch negatives
    sim = query_embs @ target_embs.T / tau
    labels = torch.arange(len(sim))
    loss_q2t = F.cross_entropy(sim, labels)
    loss_t2q = F.cross_entropy(sim.T, labels)
    return (loss_q2t + loss_t2q) / 2
```

##### 动机与背景：为什么需要统一音视频嵌入？

现有多模态嵌入模型（如 CLIP、GME、LamRA）主要关注图像-文本或视频-文本对齐，忽略了音频模态。然而现实世界的视频天然包含音频信号——环境音效、语音、背景音乐等都携带丰富的语义信息。例如，一段"海浪拍打礁石"的视频，其音频中的浪声与视觉中的海景共同构成完整语义。传统方法要么将音频丢弃（仅处理视觉帧），要么需要为每种模态对训练独立模型，导致跨模态检索（如"用音频搜视频"）无法实现。

WAVE 的核心动机是：**利用 LLM 强大的语义理解能力，构建一个统一的嵌入空间，使得文本、音频、视频、音视频可以在同一空间中直接比较相似度**。这不仅简化了多模态检索系统的架构，还通过联合训练实现了跨模态知识迁移。

##### 核心机制一：双音频编码器与 TMRoPE 对齐

WAVE 采用双编码器策略处理音频，这是因为不同类型的音频信号具有截然不同的特征：

1. **Speech Encoder**（来自 Qwen2.5-Omni）：擅长处理语音和音乐，能捕捉语言内容和旋律结构
2. **BEATs Encoder**：专门针对环境音效（如鸟鸣、机器声、脚步声）进行预训练，能识别非语言音频事件

BEATs 的输出维度与 LLM 不匹配，因此需要一个对齐器（2 层 MLP + GELU）将其映射到 LLM 的输入空间。该对齐器通过**预训练阶段**（在 WavCaps/AudioCaps/Clotho 上做音频描述生成）单独训练，确保 LLM 能正确解读 BEATs 特征。

为实现音视频的帧级对齐，WAVE 使用 **TMRoPE**（Temporal Multi-modal Rotary Position Embedding）：为每个音频/视频 token 分配其对应的物理时间戳作为位置 ID，使得同一时刻的音频 token 和视频 token 共享相同的时间位置编码，从而让 LLM 的注意力机制自然地建立时序对应关系。

##### 核心机制二：分层全层特征融合

传统 LLM 嵌入提取通常只使用最后一层的 last-token 隐状态。然而研究表明，LLM 不同层承担不同功能：浅层捕捉低级感知特征（颜色、纹理、音调），深层编码高级语义推理。对于多模态理解，这些互补信息都很重要。

WAVE 的融合策略：

$$\mathbf{e} = \text{MLP}\left(\text{Concat}\left[\mathbf{h}_1^{[\text{EOS}]}, \mathbf{h}_2^{[\text{EOS}]}, \ldots, \mathbf{h}_{28}^{[\text{EOS}]}\right]\right)$$

其中 \(\mathbf{h}_l^{[\text{EOS}]}\) 是第 \(l\) 层 EOS token 的隐状态。拼接后维度为 \(28 \times 3584 = 100352\)，通过 2 层 MLP（含 GELU 激活）压缩为最终嵌入维度。

> 💡 关键：消融实验表明，MLP 融合比简单加权求和高 2.2 个点（48.3 → 50.5），说明跨层交互是非线性的，需要学习的变换来捕捉。

值得注意的是，**纯文本输入仍使用标准 last-token pooling**（仅最后一层），这是因为文本的语义在 LLM 顶层已经充分抽象，而多模态输入则需要融合各层的互补信息。

##### 核心机制三：联合多模态多任务训练

WAVE 的训练包含两类任务：

**检索任务**：使用对称 InfoNCE 损失，支持任意模态对（视频↔文本、音频↔文本、视频↔音频）：

$$\mathcal{L}_{\text{ret}} = -\frac{1}{2}\left[\log\frac{\exp(\text{sim}(s,t)/\tau)}{\sum_j \exp(\text{sim}(s,t_j)/\tau)} + \log\frac{\exp(\text{sim}(t,s)/\tau)}{\sum_i \exp(\text{sim}(t,s_i)/\tau)}\right]$$

其中温度 \(\tau = 0.01\)，使用 batch 内负样本。

**QA 任务**：将多选 QA 转化为对比学习——视频+问题的嵌入应与正确答案最相似，与干扰项最不相似。这使模型学会生成 prompt-aware 的条件化嵌入。

> ⚠️ 注意：联合训练的关键发现是**正向跨模态迁移**——同时训练所有模态比分别训练专家模型在 7/8 个任务上更优（Table 6），说明多模态信号的多样性有助于学习更通用的语义表示。

##### 与现有方法的对比

| 特性 | CLIP/SigLIP | GME/LamRA | WAVE |
|------|-------------|-----------|------|
| 支持音频 | ❌ | ❌ | ✅ |
| 音视频对齐 | ❌ | ❌ | ✅ (TMRoPE) |
| LLM backbone | ❌ | ✅ | ✅ (Qwen2.5-Omni) |
| 指令跟随 | ❌ | 有限 | ✅ (prompt-aware) |
| 跨层融合 | N/A | last-layer | all-layer MLP |
| 跨模态检索 | 图↔文 | 图/视频↔文 | 任意模态对 |

WAVE 在 MMEB-v2 视频赛道总分 59.0，超越工业级 Seed-1.6-Embedding（55.3），在 QA 子任务上以 72.5 大幅领先（+11.6）。在音频检索（AudioCaps R@1: 44.2）和音视频检索（VGGSound R@1: 25.0）上也展现强劲性能。

#### 🧪 练习题

```yaml
question: "WAVE 对多模态输入采用分层全层融合而非标准 last-token pooling 的主要原因是什么？"
options:
  - "减少计算量，加速推理"
  - "LLM 不同层编码互补的感知与语义信息，融合可获得更完整的表示"
  - "避免梯度消失问题，改善训练稳定性"
  - "使模型兼容不同长度的输入序列"
answer: 1
explain: "论文消融实验表明 LLM 浅层捕捉低级感知特征、深层编码高级语义，全层 MLP 融合比仅用最后一层高约 1 个点，说明跨层互补信息对多模态嵌入质量至关重要。"
```