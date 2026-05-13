### VALL-E: 神经编解码语言模型实现零样本文本转语音 (Neural Codec Language Models are Zero-Shot Text to Speech Synthesizers)

```yaml
id: valle
name: VALL-E
full_name: "VALL-E: 神经编解码语言模型实现零样本文本转语音 (Neural Codec Language Models are Zero-Shot Text to Speech Synthesizers)"
year: '2023'
org: Microsoft
paper_url: https://arxiv.org/abs/2301.02111
category: tts
parent: —
motivation: 将TTS视为条件语言模型任务，利用大规模数据实现零样本语音合成
```

#### 📝 一句话总结

VALL-E 首次将文本转语音（TTS）重新定义为**条件编解码语言建模**任务，利用 EnCodec 将语音离散化为 token 序列，通过自回归（AR）+ 非自回归（NAR）两阶段 Transformer 解码器在 60K 小时 LibriLight 数据上训练，仅需 3 秒语音提示即可实现高质量零样本语音合成，在说话人相似度和语音自然度上显著超越现有零样本 TTS 系统。

#### 🎯 核心要点

- **TTS 即语言建模**：将 TTS 从传统的连续信号回归问题转化为离散 token 的条件语言建模问题，利用神经编解码器（EnCodec）将 24kHz 语音压缩为 8 层残差向量量化（RVQ）码本的离散 token 序列
- **两阶段生成架构**：AR 模型自回归生成第 1 层（最粗粒度）编码，NAR 模型以第 1 层为条件并行生成第 2-8 层（精细细节）编码，兼顾生成质量与效率
- **上下文学习（In-context Learning）**：借鉴 GPT-3 的 prompt 机制，将 3 秒参考语音的编解码 token 作为 prompt 拼接在输入中，无需微调即可克隆未见说话人的声音特征
- **大规模数据驱动**：在 LibriLight 60K 小时英语语音数据上训练（比此前 TTS 系统大数百倍），是首个利用如此大规模半监督数据的 TTS 模型
- **强零样本性能**：在 LibriSpeech 测试集上，WER 5.9%、说话人相似度 0.580、SMOS 3.8，显著优于 YourTTS 基线（WER 7.7%、相似度 0.510、SMOS 2.4）
- **多样性生成**：AR 模型的采样机制使得同一文本+同一 prompt 可生成多种不同的语音输出，具备多样性和表现力

#### 🔬 深入细节

##### 核心架构总览

![VALL-E 系统概览](https://ar5iv.labs.arxiv.org/html/2301.02111/assets/prompt.jpg)
*图 1：VALL-E 系统概览。给定一段 3 秒的语音片段作为 prompt，VALL-E 能够合成高质量的个性化语音。VALL-E 在说话人情感保持和声学环境一致性方面显著优于基线系统。*

![EnCodec 编解码器结构](https://ar5iv.labs.arxiv.org/html/2301.02111/assets/codec.jpg)
*图 2：EnCodec 编解码器的离散化过程。24kHz 语音通过编码器降采样至 75Hz 的连续表示，再经 8 层残差向量量化（RVQ）得到离散 token 矩阵 $C \in \{0,...,1023\}^{8 \times T'}$，其中每层码本大小为 1024。*

![VALL-E 模型架构](https://ar5iv.labs.arxiv.org/html/2301.02111/assets/x1.png)
*图 3：VALL-E 的两阶段模型架构。左侧为自回归（AR）编解码器，逐 token 生成第 1 层量化码；右侧为非自回归（NAR）编解码器，并行生成第 2-8 层量化码。两者均以音素序列和声学 prompt 为条件。*

##### 算法伪代码

```python
# VALL-E 推理伪代码
# 输入: phoneme_seq (音素序列), prompt_audio (3秒参考语音)
# 模型: AR_decoder, NAR_decoder, EnCodec

# Step 0: 对 prompt 语音提取 EnCodec token
prompt_tokens = EnCodec.encode(prompt_audio)  # [8, T_prompt], 8层RVQ码

# Step 1: AR 模型 —— 自回归生成第1层编码
# 条件: 音素序列 x, prompt第1层token C̃[:,1]
# 输出: 目标语音第1层token C[:,1]
ar_input = concat(phoneme_embedding(x), prompt_tokens[0])  # 拼接prompt
C_layer1 = []
for t in range(max_length):
    # p(c_t,1 | C_{<t,1}, x, C̃_{:,1})
    logits = AR_decoder(ar_input, C_layer1)
    next_token = sample(logits, top_p=0.95)  # nucleus sampling
    if next_token == EOS:
        break
    C_layer1.append(next_token)

# Step 2: NAR 模型 —— 非自回归逐层生成第2-8层编码
C = [C_layer1]  # 已有第1层
for j in range(2, 9):  # 第2层到第8层
    # p(C_{:,j} | C_{:,<j}, x, C̃)
    # NAR模型使用层级嵌入区分不同量化层
    # 对前j-1层的嵌入求和作为声学输入
    acoustic_input = sum(Embedding_l(C[l]) for l in range(j-1))
    C_layer_j = NAR_decoder(phoneme_embedding(x), acoustic_input, 
                             prompt_tokens, layer_id=j)  # 并行输出所有时间步
    C.append(C_layer_j)

# Step 3: EnCodec 解码器将8层离散token还原为波形
C_matrix = stack(C)  # [8, T']
waveform = EnCodec.decode(C_matrix)  # 24kHz 语音波形
```

##### 动机与背景

传统 TTS 系统面临**零样本泛化能力不足**的核心挑战：

- **数据规模受限**：现有 TTS 模型通常在数百至数千小时的单/多说话人录音棚数据上训练，导致泛化到未见说话人时质量急剧下降
- **连续信号建模困难**：传统方法将 TTS 视为连续 mel 频谱图的回归任务，需要复杂的编码器-解码器-声码器流水线，且难以利用语言模型的强大建模能力
- **微调依赖**：现有说话人适应方法（如 speaker embedding、adapter 微调）需要额外的适应步骤，无法实现真正的零样本

VALL-E 的核心洞察是：**将语音视为一种"语言"**，通过神经编解码器将连续波形离散化为 token，就可以直接复用大语言模型的训练范式（大数据 + Transformer + 上下文学习），从而突破传统 TTS 的数据和架构瓶颈。

##### 方法详解

###### 1. 语音离散化：EnCodec 残差向量量化

VALL-E 使用 Meta 的 EnCodec 模型作为语音 tokenizer：

- **编码器**：将 24kHz 波形降采样 320 倍至 75Hz 的连续表示
- **残差向量量化（RVQ）**：8 层级联量化，每层码本大小 1024
  - 第 1 层捕获最重要的粗粒度信息（说话人身份、韵律）
  - 第 2-8 层逐步补充精细的声学细节
  - 总比特率：75 × 8 × 10 = 6000 bps
- **解码器**：从 8 层离散 token 重建 24kHz 波形

关键性质：RVQ 的层级结构天然适合分阶段生成——第 1 层最重要且依赖关系最强（适合 AR），后续层可基于前面层并行生成（适合 NAR）。

###### 2. 自回归（AR）模型：生成第 1 层编码

AR 模型是一个仅解码器的 Transformer，建模第 1 层 token 的条件分布：

$$p(C_{:,1} | \tilde{C}_{:,1}, x) = \prod_{t=0}^{T'} p(c_{t,1} | C_{<t,1}, \tilde{C}_{:,1}, x; \theta_{AR})$$

其中：
- $x = (x_0, ..., x_L)$：音素序列
- $\tilde{C}_{:,1}$：prompt 语音的第 1 层 token
- $C_{:,1} = (c_{0,1}, ..., c_{T',1})$：目标语音的第 1 层 token

模型结构细节：
- 音素序列和声学 token 共享同一个 Transformer，但使用不同的嵌入层
- 音素部分使用**双向注意力**（可看到完整文本），声学部分使用**因果注意力**（仅看到历史 token）
- Prompt 的声学 token $\tilde{C}_{:,1}$ 直接拼接在目标序列 $C_{:,1}$ 前面
- 训练目标：标准的交叉熵损失（next-token prediction）

###### 3. 非自回归（NAR）模型：生成第 2-8 层编码

NAR 模型同样是 Transformer 架构，但以非自回归方式并行生成每一层：

$$p(C_{:,2:8} | C_{:,1}, \tilde{C}, x) = \prod_{j=2}^{8} p(C_{:,j} | C_{:,<j}, \tilde{C}, x; \theta_{NAR})$$

模型结构细节：
- 8 个独立的声学嵌入层 $E_1, ..., E_8$，每层对应一个 RVQ 量化层
- 输入声学表示：前 $j-1$ 层嵌入的**逐元素求和** $\sum_{l=1}^{j-1} E_l(C_{:,l})$
- 使用**层级嵌入（layer embedding）**告知模型当前生成的是第几层
- Prompt 的完整 8 层 token $\tilde{C}$ 同样通过嵌入求和后拼接
- 所有位置使用**双向注意力**（NAR 无需因果约束）
- 训练时随机采样层 $j \in \{2,...,8\}$，仅计算该层的交叉熵损失

###### 4. 推理策略

- AR 阶段使用 **nucleus sampling**（top-p = 0.95），支持多样性生成
- NAR 阶段使用 **greedy decoding**（argmax），确保精细层的稳定性
- 最终将 8 层 token 送入 EnCodec 解码器重建波形

##### 实验设置

| 配置项 | 详情 |
|--------|------|
| **训练数据** | LibriLight 60K 小时（含 7000+ 说话人），使用现有 ASR 模型生成转录文本 |
| **音素化** | 使用 G2P 工具将文本转为音素序列 |
| **编解码器** | EnCodec 24kHz，8 层 RVQ，每层码本 1024，帧率 75Hz |
| **AR 模型** | 12 层 Transformer 解码器，16 头注意力，嵌入维度 1024，FFN 维度 4096，约 0.37B 参数 |
| **NAR 模型** | 12 层 Transformer 解码器，16 头注意力，嵌入维度 1024，FFN 维度 4096，约 0.37B 参数 |
| **优化器** | AdamW，学习率线性预热 + 逆平方根衰减 |
| **训练步数** | 800K 步（AR），400K 步（NAR） |
| **批大小** | 6K 声学 token / GPU |
| **硬件** | 16 × NVIDIA V100 32GB GPU |
| **评估数据** | LibriSpeech test-clean（续写任务），VCTK（跨数据集零样本） |

##### 实验结果

###### LibriSpeech 续写任务（Continuation）

| 模型 | WER ↓ | 说话人相似度 ↑ | SMOS ↑ | CMOS |
|------|-------|----------------|--------|------|
| Ground Truth | 2.2% | 0.754 | 4.09 | 0 |
| YourTTS | 7.7% | 0.510 | 2.41 | -0.52 |
| **VALL-E** | **5.9%** | **0.580** | **3.81** | **+0.12** |

- VALL-E 在所有指标上大幅超越 YourTTS 基线
- CMOS +0.12 表明 VALL-E 的合成质量甚至略优于真实语音的续写拼接
- WER 5.9% 接近真实语音的 2.2%，表明语音内容的准确性很高

###### VCTK 跨数据集零样本

| 模型 | WER ↓ | 说话人相似度 ↑ | SMOS ↑ |
|------|-------|----------------|--------|
| YourTTS | 9.2% | 0.337 | — |
| **VALL-E** | **6.2%** | **0.381** | **3.40** |

- 在完全未见过的 VCTK 数据集上，VALL-E 仍保持较好的零样本性能
- 说话人相似度从 0.337 提升至 0.381

###### Prompt 长度消融

| Prompt 长度 | WER ↓ | 说话人相似度 ↑ | SMOS ↑ |
|-------------|-------|----------------|--------|
| 原始 enrolled（完整句） | 3.8% | 0.617 | — |
| 3 秒 | 5.9% | 0.580 | 3.81 |

- 更长的 prompt 提供更多说话人信息，可进一步提升性能

##### 消融实验

论文通过以下消融验证了关键设计选择：

1. **AR+NAR vs 纯 AR**：纯 AR 模型（逐层自回归生成所有 8 层）的推理速度极慢（8 倍），且后续层的自回归建模收益递减。AR+NAR 的两阶段设计在质量和效率间取得最优平衡。

2. **Prompt 长度影响**：3 秒 prompt 已足够捕获说话人特征（相似度 0.580），但更长的 prompt（完整句子）可将相似度提升至 0.617。

3. **采样策略**：AR 阶段使用 nucleus sampling（top-p=0.95）相比 greedy decoding 能生成更自然、更多样的语音，但 WER 略有上升。

4. **数据规模**：60K 小时的大规模数据是零样本能力的关键——论文指出这是首个在如此大规模数据上训练的 TTS 模型，数据规模比此前系统大数百倍。

##### 关键公式

**AR 模型目标函数（第 1 层自回归生成）：**

$$\mathcal{L}_{AR} = -\sum_{t=1}^{T'} \log p(c_{t,1} | c_{<t,1}, \tilde{C}_{:,1}, x; \theta_{AR})$$

**NAR 模型目标函数（第 j 层非自回归生成）：**

$$\mathcal{L}_{NAR} = -\sum_{t=1}^{T'} \log p(c_{t,j} | C_{:,<j}, \tilde{C}, x; \theta_{NAR}), \quad j \sim \text{Uniform}\{2,...,8\}$$

**声学嵌入融合（NAR 输入构造）：**

$$e_t = \sum_{l=1}^{j-1} E_l(c_{t,l})$$

其中 $E_l$ 为第 $l$ 层的嵌入矩阵，$c_{t,l}$ 为时间步 $t$ 第 $l$ 层的量化码。

#### 💡 优缺点分析

##### 优点

1. **范式创新**：首次将 TTS 完全转化为语言建模问题，打通了 LLM 技术栈与语音合成的桥梁，开创了"语音语言模型"的新研究方向
2. **强零样本能力**：仅需 3 秒 prompt 即可克隆未见说话人的声音，无需任何微调或适应步骤
3. **大规模数据利用**：首次证明 TTS 也能从大规模半监督数据中获益，60K 小时数据显著提升了模型的泛化能力
4. **多样性生成**：AR 采样机制使得同一输入可生成多种不同的语音，突破了传统 TTS 的确定性输出限制
5. **情感与环境保持**：能够保留 prompt 中的情感状态和声学环境（如混响），这是传统 TTS 难以实现的

##### 缺点与局限

1. **鲁棒性不足**：AR 模型的自回归采样可能导致错误累积，出现词语不清晰、跳词/重复等问题（WER 5.9% vs GT 2.2%）
2. **数据需求巨大**：需要 60K 小时语音数据训练，计算资源要求高（16 × V100），不利于低资源语言和小团队复现
3. **合成速度较慢**：AR 阶段逐 token 生成，推理延迟较高，不适合实时应用场景
4. **EnCodec 质量上限**：最终语音质量受限于 EnCodec 编解码器的重建质量，编解码器的失真会传递到最终输出
5. **仅支持英语**：论文仅在英语数据上实验，多语言和跨语言能力未验证
6. **缺乏可控性**：无法显式控制语速、音高等韵律参数，这些完全依赖于 prompt 和模型的隐式学习

#### 🔗 与相关工作对比

| 维度 | VALL-E | YourTTS | Tacotron 2 | VITS |
|------|--------|---------|------------|------|
| **建模方式** | 离散 token 语言模型 | 端到端 + 说话人嵌入 | mel 回归 + 声码器 | 端到端 VAE+Flow+GAN |
| **语音表示** | EnCodec 离散码 | 连续 mel 频谱 | 连续 mel 频谱 | 连续频谱 |
| **零样本能力** | ✅ 强（上下文学习） | ✅ 弱（说话人嵌入） | ❌ 需微调 | ❌ 需微调 |
| **训练数据** | 60K 小时 | ~500 小时 | ~25 小时 | ~25 小时 |
| **生成多样性** | ✅ 采样多样 | ❌ 确定性 | ❌ 确定性 | ✅ 有限 |
| **实时性** | ❌ AR 较慢 | ✅ 较快 | ✅ 较快 | ✅ 快 |
| **音质** | 高（受限于编解码器） | 中等 | 高（单说话人） | 高（单说话人） |

#### 💭 启发与思考

1. **语音即语言的统一范式**：VALL-E 证明了将语音离散化后可以直接复用 NLP 的语言模型技术栈，这一思路后续催生了 SoundStorm、AudioPaLM、SpeechGPT 等一系列工作，推动了语音-文本多模态统一建模的发展
2. **数据规模的重要性**：类似 GPT-3 在 NLP 中的启示，VALL-E 表明 TTS 领域同样存在"数据规模涌现"现象——60K 小时数据带来的零样本能力是小数据集无法实现的
3. **AR+NAR 混合架构的通用性**：这种"粗粒度自回归 + 细粒度非自回归"的两阶段设计思想可推广到其他层级化生成任务（如图像、视频、音乐）
4. **安全与伦理风险**：3 秒即可克隆声音的能力带来了严重的深度伪造风险，论文也提到需要开发检测模型来识别 VALL-E 生成的语音，这是该方向不可回避的社会责任问题
5. **后续改进方向**：VALL-E 的局限（鲁棒性、速度、可控性）直接催生了 VALL-E X（跨语言）、VALL-E 2（重复感知采样）、VALL-E R（非自回归改进）等后续工作