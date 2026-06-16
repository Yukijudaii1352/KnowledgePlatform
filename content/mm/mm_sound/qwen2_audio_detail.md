### Qwen2-Audio

```yaml
id: qwen2_audio
name: Qwen2-Audio
full_name: 通义千问音频2 (Qwen2-Audio)
year: '2024'
org: 阿里巴巴
paper_url: https://arxiv.org/abs/2407.10759
category: audio_llm
parent: qwen_audio
motivation: 升级版多任务音频理解
topic_id: mm_sound
yaml_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/mm_sound.yaml
output_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/mm_sound/qwen2_audio_detail.md
```

#### 📝 一句话总结

Qwen2-Audio 是 Qwen-Audio 的升级版大规模音频语言模型，用 Whisper-large-v3 初始化的音频编码器连接 Qwen-7B，并通过自然语言 prompt 预训练、SFT 和 DPO 提升多任务音频理解与语音交互能力。它将语音、声音、音乐和混合音频统一为文本生成问题，同时支持 Audio Analysis 与 Voice Chat 两种交互模式。

#### 🎯 核心要点

- **8.2B 音频语言模型**：由音频编码器与 Qwen-7B LLM 组成，总参数约 8.2B
- **Whisper-large-v3 初始化音频编码器**：输入音频重采样到 16kHz，转 128 通道 Mel spectrogram，25ms 窗、10ms hop，并用 stride=2 pooling 降低序列长度
- **约 40ms 音频帧粒度**：池化后每个编码器输出帧约对应原始音频 40ms，兼顾语音细节与 LLM 上下文成本
- **自然语言 prompt 预训练**：相对 Qwen-Audio 的层级标签，Qwen2-Audio 在预训练阶段直接使用自然语言任务提示，降低预训练和后训练格式差异
- **三阶段训练流程**：multi-task pre-training → supervised fine-tuning → direct preference optimization
- **两种统一交互模式**：Audio Analysis 允许音频+文本指令做离线分析，Voice Chat 支持纯语音自由对话，实际使用中无需系统 prompt 切换模式
- **覆盖 13 个评测数据集与 AIR-Bench**：任务包括 ASR、S2TT、SER、VSC，以及 speech/sound/music/mixed audio 的指令跟随评测

#### 🔬 深入细节

![Qwen2-Audio 三阶段训练框架](https://raw.githubusercontent.com/QwenLM/Qwen2-Audio/main/assets/framework.png)
*图：Qwen2-Audio 的训练流程包含多任务预训练、监督微调和 DPO；中心模型由 Audio Encoder 与 QwenLM 组成，输入音频和自然语言指令后自回归生成文本。*

##### 算法伪代码

```python
# Qwen2-Audio 训练与推理流程伪代码
def encode_audio(raw_waveform):
    audio = resample(raw_waveform, target_sr=16000)
    mel = log_mel_spectrogram(audio, n_mels=128, win_ms=25, hop_ms=10)
    hidden = whisper_large_v3_initialized_encoder(mel)
    hidden = pooling(hidden, stride=2)  # about one output frame per 40ms
    return hidden

def qwen2_audio_forward(audio=None, text_prompt=None, history=None):
    audio_tokens = encode_audio(audio) if audio is not None else []
    prompt_tokens = qwen_tokenizer(text_prompt, history=history)
    return qwen_7b.generate([audio_tokens, prompt_tokens])

def train_qwen2_audio():
    # Stage 1: Multi-task pre-training with natural language prompts
    for audio, prompt, answer in pretrain_data:
        loss = next_token_ce(qwen2_audio_forward(audio, prompt), answer)
        update(audio_encoder, qwen_lm, loss)

    # Stage 2: SFT jointly trains Audio Analysis and Voice Chat formats
    for conversation in curated_sft_data:
        loss = supervised_chat_loss(conversation)
        update(audio_encoder, qwen_lm, loss)

    # Stage 3: DPO aligns outputs with preferred behavior
    for x, y_win, y_lose in preference_triplets:
        loss = dpo_loss(policy=qwen2_audio, reference=frozen_reference,
                        x=x, y_win=y_win, y_lose=y_lose)
        update(audio_encoder, qwen_lm, loss)
```

##### 关键公式

给定音频序列 \(x\)、文本 prompt \(p\) 与目标文本 \(y_{1:N}\)，Qwen2-Audio 的基础训练目标是最大化下一个文本 token 概率：

$$
\max_{\theta,\phi}\sum_{t=1}^{N}\log P_{\theta,\phi}(y_t \mid y_{<t}, p, E_{\phi}(x))
$$

其中 \(E_{\phi}\) 是音频编码器，\(\theta\) 是 Qwen LLM 参数。DPO 阶段使用偏好三元组 \((x, y_w, y_l)\)，其中 \(y_w\) 是偏好回答，\(y_l\) 是较差回答：

$$
\mathcal{L}_{\text{DPO}} =
-\mathbb{E}\left[
\log \sigma\left(
\beta \log \frac{\pi_{\theta}(y_w\mid x)}{\pi_{\text{ref}}(y_w\mid x)}
- \beta \log \frac{\pi_{\theta}(y_l\mid x)}{\pi_{\text{ref}}(y_l\mid x)}
\right)
\right]
$$

这个目标直接提高偏好回答相对参考模型的概率，同时降低非偏好回答的相对概率。

##### 方法解读：从 Qwen-Audio 到 Qwen2-Audio 的变化

Qwen-Audio 已经证明了统一音频-语言预训练的价值，但早期方案在任务描述上使用较复杂的层级标签，预训练格式与后续 instruction/chat 格式之间仍有差距。Qwen2-Audio 的核心改动之一，是在预训练阶段就用自然语言 prompt 描述任务，例如“识别这段语音”“为这段声音生成英文 caption”“判断说话者情绪”。这样模型在预训练时看到的输入形式更接近 SFT 和真实交互，后续指令跟随更自然。

另一个升级是音频编码器初始化。Qwen2-Audio 使用 Whisper-large-v3 作为音频编码器初始化基础，输入处理为 16kHz、128 通道 Mel spectrogram，并通过 stride=2 pooling 将表示长度减半。Whisper-large-v3 带来强语音建模先验，池化后约 40ms 一个输出帧，既保留足够语音时间分辨率，又避免长音频让 Qwen-7B 的上下文被音频 token 过度占用。

##### 方法解读：统一 Audio Analysis 与 Voice Chat

Qwen2-Audio 明确支持两种交互范式。Audio Analysis 更像文件分析：用户给一段语音、环境声、音乐或混合音频，再用文字或语音提出问题；Voice Chat 更像语音助手：用户可以只用语音与模型连续对话。论文强调两种模式在训练中联合建模，使用时不需要通过额外 system prompt 手动切换。

这个设计的难点在于模型必须区分“音频内容本身”和“音频里携带的用户指令”。例如一段音频前半段是键盘声，后半段有人问“这是什么声音？”，模型需要把后半段识别为指令，把前半段当作被分析对象。Qwen2-Audio 通过混合音频、多轮对话、音频+文本指令的 SFT 数据，让模型学习在同一输入流中完成命令定位、音频理解和文本回答。

##### 方法解读：三阶段训练如何配合

多任务预训练阶段负责建立广覆盖的音频-文本映射：ASR、语音翻译、声音分类/描述、音乐理解等任务都被写成自然语言 prompt 下的 next-token prediction。SFT 阶段则强调高质量交互样式，尤其是 Audio Analysis 和 Voice Chat 的对话格式、拒答边界、回答风格与复杂指令遵循。DPO 阶段进一步用偏好数据约束模型，让回答更符合人类对事实性、帮助性和行为规范的选择。

从优化角度看，预训练让 \(E_{\phi}(x)\) 能被 Qwen-7B 解释，SFT 让模型知道“用户想要什么形式的回答”，DPO 则在多个可行回答之间校正偏好顺序。与只做 ASR 或只做 caption 的模型相比，Qwen2-Audio 的训练目标始终是文本生成，因此同一个解码器可以输出转写、翻译、分类解释、场景分析和聊天回复。

##### 方法解读：与 SALMONN/LTU 的区别

SALMONN 重点研究双编码器融合和 activation tuning，以激活跨模态涌现能力；LTU 重点通过 OpenAQA-5M 把通用音频任务统一为问答；Qwen2-Audio 则更偏工程化大规模训练与产品交互，将自然语言 prompt 预训练、双模式 SFT 和 DPO 放在同一训练框架中。它没有把模式切换暴露给用户，而是让模型从输入上下文中自动判断应该聊天、转写、翻译还是分析音频。

> 💡 关键：Qwen2-Audio 的“升级版多任务音频理解”不只是模型更大或数据更多，而是把预训练任务格式、指令微调格式和偏好对齐目标统一到了自然语言交互空间。

#### 🧪 练习题

```yaml
question: "Qwen2-Audio 相比 Qwen-Audio，在预训练任务表达上最重要的变化是什么？"
options:
  - "完全移除文本 prompt，只保留音频输入"
  - "用自然语言 prompt 替代复杂层级标签，缩小预训练与后训练的格式差异"
  - "先把所有音频转写成文本，再丢弃原始音频特征"
  - "只在语音识别数据上预训练，不再使用声音和音乐数据"
answer: 1
explain: "技术报告指出 Qwen2-Audio 在预训练阶段用自然语言 prompts 替代 Qwen-Audio 的 hierarchical tags，从而提升泛化和指令跟随能力。"
```
