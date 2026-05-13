### MusicLM

```yaml
id: musiclm
name: MusicLM
full_name: "MusicLM: Generating Music From Text"
year: "2023.01"
org: Google Research
paper_url: "https://arxiv.org/abs/2301.11325"
category: audio_lm
parent: audiolm
motivation: "将文本条件音乐生成建模为层次化序列到序列任务，结合 AudioLM 的音频语言建模框架与 MuLan 的音乐-文本联合嵌入，实现高质量、长时一致的文本到音乐生成"
```

#### 📝 一句话总结

MusicLM 将文本条件音乐生成视为层次化的序列到序列建模任务，通过在 AudioLM 框架上引入 MuLan 音乐-文本联合嵌入作为条件信号，经由语义建模、粗粒度声学建模和细粒度声学建模三个自回归阶段，生成 24 kHz 高保真音乐，在音频质量和文本忠实度上均超越已有基线。

#### 🎯 核心要点

- **三阶段层次化生成架构**：语义建模（semantic modeling）→ 粗粒度声学建模（coarse acoustic modeling）→ 细粒度声学建模（fine acoustic modeling），逐步从高层语义到低层声学细节
- **MuLan 条件机制**：利用 MuLan 音乐-文本联合嵌入模型，训练时使用音频端嵌入 \(M_A\)，推理时替换为文本端嵌入 \(M_T\)，实现纯文本到音乐的零样本生成
- **三种音频 Tokenizer 协同**：SoundStream（50 Hz，12 层 RVQ，声学 token）、w2v-BERT（25 Hz，1024 聚类，语义 token）、MuLan（12 个 RVQ token，条件 token）
- **大规模纯音频训练**：280k 小时无标注音乐数据训练，无需音乐-文本配对数据
- **MusicCaps 评估数据集**：5.5k 条由专业音乐人标注的高质量音乐-文本对，公开发布
- **扩展能力**：支持旋律条件生成（melody conditioning）、长序列生成和故事模式（story mode，随时间切换文本描述）
- **记忆化分析**：精确匹配率 < 0.2%，近似匹配约 1%，系统性评估了训练数据记忆风险

#### 🔬 深入细节

##### 模型架构总览

![MusicLM 架构图](https://ar5iv.labs.arxiv.org/html/2301.11325/assets/x1.png)
*图 1：MusicLM 整体架构。训练阶段（上）使用 MuLan 音频嵌入 \(M_A\) 作为条件；推理阶段（下）替换为 MuLan 文本嵌入 \(M_T\)，实现文本到音乐的生成。*

![音频表示层次](https://ar5iv.labs.arxiv.org/html/2301.11325/assets/x2.png)
*图 2：不同 token 表示的层次结构。从 MuLan token（高层语义）到语义 token（中层）再到声学 token（低层声学细节），信息粒度逐步细化。*

##### 算法伪代码

```python
# MusicLM 三阶段层次化生成流程

# === 训练阶段 ===
# 输入: 音频片段 x
# 1. 提取三种 token 表示
M_A = MuLan.audio_encoder(x)          # MuLan 音频 token (12 tokens via RVQ)
S   = quantize(w2v_BERT(x), k=1024)   # 语义 token (25 Hz, 1024 聚类)
A_c = SoundStream.encode(x)[:4]       # 粗粒度声学 token (前 4 层 RVQ, 50 Hz)
A_f = SoundStream.encode(x)[4:]       # 细粒度声学 token (后 8 层 RVQ, 50 Hz)

# 2. 三个 Transformer 分别训练
# Stage 1: p(S_t | S_{<t}, M_A)        语义建模
# Stage 2: p(A_c_t | A_c_{<t}, M_A, S) 粗粒度声学建模
# Stage 3: p(A_f_t | A_f_{<t}, A_c)    细粒度声学建模

# === 推理阶段 ===
# 输入: 文本描述 text
M_T = MuLan.text_encoder(text)         # MuLan 文本 token (替代 M_A)
S   = SemanticTransformer.generate(M_T, temperature=1.0)
A_c = CoarseTransformer.generate(M_T, S, temperature=0.95)
A_f = FineTransformer.generate(A_c, temperature=0.4)
audio = SoundStream.decode(concat(A_c, A_f))  # 解码为 24 kHz 波形
```

##### 动机与背景

文本到音乐生成面临三大核心挑战：（1）音乐信号高维且结构复杂，包含旋律、和声、节奏、音色等多层次信息；（2）高质量的音乐-文本配对数据极度稀缺，难以直接训练条件生成模型；（3）生成的音乐需要在较长时间跨度上保持一致性和连贯性。

此前的方法如 Jukebox 虽然能生成较长音乐，但受限于符号化表示或低采样率；Riffusion 基于 Stable Diffusion 在频谱图上操作，音质受限；Mubert 依赖预录制音频片段拼接，灵活性不足。MusicLM 的核心洞察是：**将文本到音乐生成分解为层次化的离散 token 预测任务**，借助已有的自监督音频表示模型，在无需音乐-文本配对数据的情况下完成训练。

##### 核心机制：三阶段层次化建模

MusicLM 的技术方案建立在 AudioLM 的层次化音频生成框架之上，核心创新在于引入 MuLan 作为文本条件桥梁。

**三种 Token 表示的互补角色：**

1. **MuLan Token（条件信号）**：MuLan 是一个音乐-文本联合嵌入模型，其音频编码器和文本编码器分别将音频和文本映射到共享的嵌入空间。MusicLM 对 MuLan 的 128 维嵌入进行 RVQ 量化，得到 12 个离散 token。关键设计是：**训练时使用音频端嵌入 \(M_A\)，推理时替换为文本端嵌入 \(M_T\)**。由于 MuLan 的联合训练确保了两个模态在嵌入空间中的对齐，这种替换是可行的。

2. **语义 Token（高层结构）**：使用 w2v-BERT（一个自监督语音/音频表示模型）的中间层特征，经 k-means 聚类（k=1024）量化为离散 token，频率 25 Hz。语义 token 捕获音乐的高层属性——旋律轮廓、节奏模式、体裁特征——但不包含精细的声学细节。

3. **声学 Token（低层细节）**：使用 SoundStream 神经音频编解码器，以 50 Hz 频率、12 层 RVQ 编码音频。前 4 层为粗粒度声学 token（捕获主要频谱结构），后 8 层为细粒度声学 token（捕获音色、混响等精细特征）。

> 💡 关键：这种层次化分解的核心价值在于——语义 token 提供了"说什么"的信息（音乐内容），声学 token 提供了"怎么说"的信息（音质细节），而 MuLan token 则是连接文本意图和音频内容的桥梁。

**三阶段自回归建模：**

每个阶段使用一个独立的 decoder-only Transformer（430M 参数，24 层，16 头，维度 1024）：

**Stage 1 — 语义建模**：以 MuLan token 为前缀，自回归预测语义 token 序列：

$$p(S_t \mid S_{<t}, M_A)$$

这一阶段决定了音乐的高层结构——体裁、旋律走向、节奏模式。采样温度设为 1.0，保持最大多样性。

**Stage 2 — 粗粒度声学建模**：以 MuLan token 和语义 token 为条件，预测粗粒度声学 token：

$$p(A^c_t \mid A^c_{<t}, S, M_A)$$

由于语义 token（25 Hz）和声学 token（50 Hz）频率不同，采用逐帧对齐：每个语义 token 对应 2 个声学时间步。4 层 RVQ 的 token 按"时间优先、层次其次"的方式展平为单一序列。采样温度 0.95。

**Stage 3 — 细粒度声学建模**：仅以粗粒度声学 token 为条件，预测剩余 8 层 RVQ 的细粒度声学 token：

$$p(A^f_t \mid A^f_{<t}, A^c)$$

这一阶段不再需要 MuLan 条件，因为粗粒度 token 已包含足够的语义信息。采样温度降至 0.4，确保声学一致性。最终将 12 层 RVQ token 拼接后通过 SoundStream 解码器重建 24 kHz 波形。

##### 训练与推理流程

**训练数据与预训练模型：**
- 训练数据：280k 小时的纯音频音乐数据（无文本标注），来源未公开
- SoundStream 和 w2v-BERT 在 Free Music Archive (FMA) 数据集上预训练
- MuLan 在大规模音乐-文本数据上预训练（论文未详述）
- 三个 Transformer 阶段独立训练，均使用交叉熵损失

**训练-推理的桥梁设计：**

训练时所有条件信号均来自音频（\(M_A\)、\(S\)、\(A^c\) 都从同一音频提取），无需任何文本标注。推理时，仅需将 \(M_A\) 替换为 \(M_T\)，即可实现文本驱动生成。这一设计的优雅之处在于：**完全解耦了"学习音乐生成"和"理解文本描述"两个能力**——前者由三阶段 Transformer 负责，后者由预训练的 MuLan 负责。

> ⚠️ 注意：MuLan 的音频-文本嵌入对齐质量直接决定了文本条件的有效性。论文指出 MuLan 对否定词（negation）和时间顺序描述的理解较弱，这成为 MusicLM 的主要局限之一。

##### 与已有方法的对比

| 特性 | MusicLM | Jukebox | Riffusion | Mubert |
|------|---------|---------|-----------|--------|
| 生成方式 | 离散 token 自回归 | 离散 token 自回归 | 频谱图扩散 | 预录制片段拼接 |
| 采样率 | 24 kHz | 44.1 kHz | 44.1 kHz | 44.1 kHz |
| 文本条件 | MuLan 联合嵌入 | 元数据标签 | CLIP 引导 | API 标签匹配 |
| 长时一致性 | ✓（分钟级） | ✓ | ✗（5s 片段） | ✓ |
| 需要配对数据 | ✗ | ✗ | ✗ | N/A |

MusicLM 相比 Jukebox 的关键优势在于引入了语义-声学的层次化分解和 MuLan 文本条件，使得生成质量和文本忠实度大幅提升。相比 Riffusion，MusicLM 能生成更长且更连贯的音乐。相比 Mubert，MusicLM 是真正的生成模型而非检索拼接。

##### 实验结果

在 MusicCaps 数据集上的评估结果：

| 模型 | FAD\(_{Trill}\) ↓ | FAD\(_{VGG}\) ↓ | KLD ↓ | MCC ↑ | 人类偏好 Wins ↑ |
|------|-------------------|-----------------|-------|-------|----------------|
| Riffusion | 0.76 | 13.4 | 1.19 | 0.34 | 158 |
| Mubert | 0.45 | 9.6 | 1.58 | 0.32 | 97 |
| **MusicLM** | **0.44** | **4.0** | **1.01** | **0.51** | **312** |
| MusicCaps (参考) | - | - | - | - | 472 |

关键发现：
- **音频质量**：MusicLM 的 FAD\(_{VGG}\) = 4.0 远优于 Riffusion (13.4) 和 Mubert (9.6)，表明生成音乐的感知质量更高
- **文本忠实度**：MCC = 0.51 显著优于两个基线（0.34 和 0.32），说明 MuLan 条件机制有效捕获了文本语义
- **消融实验**：移除语义建模阶段后，KLD 从 1.01 升至 1.05，MCC 从 0.51 降至 0.49，验证了语义 token 对文本忠实度的贡献
- **记忆化风险**：精确匹配率始终 < 0.2%，近似匹配约 1%，表明模型主要学习了音乐的分布特征而非记忆训练样本

##### 扩展：旋律条件与故事模式

**旋律条件生成（Melody Conditioning）**：通过训练一个旋律联合嵌入模型（使用翻唱、器乐/人声版本等配对数据），将旋律嵌入量化后与 MuLan token 拼接作为条件。推理时可输入哼唱、口哨或乐器演奏的旋律片段，MusicLM 会生成符合该旋律且匹配文本描述的音乐。

**长序列生成与故事模式（Story Mode）**：语义建模阶段在 30 秒序列上训练，通过 15 秒步长的滑动窗口可生成数分钟的连贯音乐。故事模式允许每 15 秒切换文本描述，模型自动生成平滑过渡，保持节奏一致性的同时改变音乐语境。

#### 🧪 练习题

```yaml
question: "MusicLM 在训练和推理阶段分别使用什么作为文本条件信号？"
options:
  - "训练和推理均使用 MuLan 文本嵌入 M_T"
  - "训练使用 MuLan 音频嵌入 M_A，推理替换为 MuLan 文本嵌入 M_T"
  - "训练使用 w2v-BERT 语义 token，推理使用 MuLan 文本嵌入 M_T"
  - "训练使用文本-音频配对数据，推理使用纯文本输入"
answer: 1
explain: "MusicLM 的核心设计是训练时使用 MuLan 音频端嵌入 M_A 作为条件（因此无需文本标注数据），推理时利用 MuLan 联合嵌入空间的对齐特性，将 M_A 替换为文本端嵌入 M_T，实现零样本文本到音乐生成。"
```