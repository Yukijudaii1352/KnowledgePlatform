### 音频PaLM模型 (AudioPaLM)

```yaml
id: audiopalm
name: AudioPaLM
full_name: "音频PaLM模型 (AudioPaLM)"
year: '2023'
org: Google
paper_url: https://arxiv.org/abs/2306.12925
category: encoder_llm_decoder
parent: speecht5
motivation: 融合PaLM与AudioLM能力
topic_id: omni
yaml_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/omni.yaml
output_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/omni/audiopalm_detail.md
```

#### 📝 一句话总结

AudioPaLM 将 PaLM/PaLM-2 的文本语言能力与 AudioLM 的离散音频建模能力融合到一个 decoder-only Transformer 中，解决单一模型同时听懂语音、生成文本并合成语音的问题。

#### 🎯 核心要点

- 使用 decoder-only Transformer 统一建模文本 token 与音频 token，模型主体结构与文本 LLM 基本不变
- 将 SentencePiece 文本词表与离散音频词表合并为联合词表，音频 token 可作为输入也可作为输出
- 从 PaLM 或 PaLM-2 文本 checkpoint 初始化，仅扩展 embedding/softmax 矩阵以容纳音频 token
- 音频 token 来自 w2v-BERT 或 USM 编码器的离散化表示，典型码率为 25Hz、词表大小为 1024
- 输出音频 token 后，使用 AudioLM stage 2/3 或 SoundStorm 生成 SoundStream token 并还原波形
- 通过任务标签表达 ASR、AST、S2ST、TTS、MT 等任务，例如 `[ASR French]` 或 `[S2ST English French]`
- 引入 combined tasks，让模型在一次自回归解码中先输出中间文本再输出最终文本/音频，类似语音任务里的链式推理
- 训练混合覆盖 CoVoST2/CVSS、VoxPopuli、CommonVoice、Conversational EsEn、YouTube ASR、WMT/TED TTS、PaLM MT TTS 等数据
- 使用 3 秒语音提示作为 voice conditioning，在跨语言语音翻译中保留说话人音色和韵律信息

#### 🔬 深入细节

##### 框架总览

![AudioPaLM 模型示意](https://arxiv.org/html/2306.12925/x1.png)
*图：AudioPaLM 在预训练文本模型上扩展音频 token embedding，输入可混合文本和音频 token，输出可为文本或音频 token。*

AudioPaLM 的核心非常简洁：把语音也变成离散 token，然后让 LLM 像处理文本一样处理它。这样一来，ASR 是“音频 token 到文本 token”，TTS 是“文本 token 到音频 token”，S2ST 是“源语言音频 token 到目标语言音频 token”，都可以被同一个自回归 token 预测目标覆盖。

文本模型迁移的关键在 embedding surgery。设原文本词表大小为 \(t\)，embedding 维度为 \(m\)，音频词表大小为 \(a\)。PaLM 的输入 embedding 为 \(\mathbf{E}\in\mathbb{R}^{t\times m}\)，输出 softmax 权重共享为 \(\mathbf{E}'=\mathbf{E}^{\top}\)。AudioPaLM 将其扩展为：

$$
\mathbf{E}_{\text{multi}}=
\begin{bmatrix}
\mathbf{E}_{\text{text}}\\
\mathbf{E}_{\text{audio}}
\end{bmatrix}
\in\mathbb{R}^{(t+a)\times m}
$$

前 \(t\) 行保留原 SentencePiece 文本 embedding，后 \(a\) 行随机初始化为音频 token embedding。除此之外，Transformer 主体不需要改结构；论文发现训练时需要更新全部参数，而不是只冻结原文本 LLM。

音频 tokenization 直接决定模型能听到什么。论文比较了三类 token：多语 w2v-BERT 特征经 k-means 离散化、USM-v1 特征离散化、以及带辅助 ASR 损失训练的 USM-v2 token。w2v-BERT/USM-v1 都产生约 25Hz 的 token 序列，词表大小 1024；USM-v2 的目标是让离散单元更适合多语语音理解和翻译。

```python
# AudioPaLM 训练与推理流程伪代码
text_llm = load_checkpoint("PaLM_or_PaLM2")
E_text = text_llm.token_embedding
E_audio = random_init(num_audio_tokens=1024, dim=E_text.dim)
model = expand_embedding(text_llm, concat(E_text, E_audio))

for batch in speech_text_mixture:
    task_tag = tokenize("[ASR French]")  # 或 [ASR AST S2ST English French]
    input_tokens = task_tag + tokenize_modal_inputs(batch)
    target_tokens = tokenize_modal_outputs(batch)

    tokens = input_tokens + target_tokens
    logits = model(tokens[:-1])
    loss = masked_cross_entropy(logits, tokens[1:], mask_only_target=True)
    adafactor_update(model.parameters(), loss, lr=5e-5)

def synthesize_speech(prompt_audio, source_audio, target_lang):
    source_tokens = audio_tokenizer(source_audio)
    task = tokenize(f"[S2ST source {target_lang}]")
    semantic_tokens = model.generate(task + source_tokens)
    voice_cond = first_3_seconds(prompt_audio)
    soundstream_tokens = audiolm_or_soundstorm(semantic_tokens, voice_cond)
    return soundstream_decoder(soundstream_tokens)
```

训练目标仍是标准自回归语言模型损失，只是对输入部分做 loss masking，让模型主要为目标输出付出损失：

$$
\mathcal{L}_{\text{AR}}=-\sum_{i\in\mathcal{O}}\log p_{\theta}(z_i\mid z_{<i})
$$

其中 \(z\) 是文本 token 与音频 token 的混合序列，\(\mathcal{O}\) 表示需要预测的输出位置。这个统一目标的好处是不同任务可以自然混训：ASR/AST 强化语音到文本映射，TTS/S2ST 让模型学会输出音频 token，MT 保留文本翻译能力。

AudioPaLM 还将任务表达为普通文本前缀，而不是新增大量特殊符号。例如 `[ASR French]` 表示转写法语音频，`[TTS English]` 表示读出英文文本，`[S2ST English French]` 表示英到法语音翻译。论文指出人类可读的任务短语与方括号标签效果接近，但在低资源语言中显式写出语言名有帮助。

combined tasks 是论文中很实用的设计。直接 S2ST 要模型从源音频 token 一步生成目标音频 token；combined 版本则要求模型在一次自回归过程中先输出源转写，再输出目标翻译文本，最后输出目标音频 token：

$$
p(y_{\text{src text}},y_{\text{tgt text}},y_{\text{tgt audio}}\mid x_{\text{src audio}})
=\prod_i p(z_i\mid z_{<i},x_{\text{src audio}})
$$

这不是级联调用三个模型，因为所有中间结果和原始音频都在同一个上下文里，生成目标音频时仍能注意到源音频中的韵律和说话人信息。论文实验显示 combined tasks 能提升复杂语音翻译任务的表现。

输出音频 token 之后，AudioPaLM 还需要语音解码器。AudioLM 路线用 stage 2 生成低码率 SoundStream token，再用 stage 3 重建更高层 residual quantizer；SoundStorm 则用非自回归迭代方式并行生成，速度快两个数量级且音色一致性更好。两者都可接收 3 秒 voice conditioning，因此 AudioPaLM 能在翻译时保留未见说话人的音色。

与 SpeechT5 这类 encoder-decoder 统一语音文本框架相比，AudioPaLM 更接近“给 LLM 扩词表”。它的优势是继承 PaLM/PaLM-2 的文本知识和翻译能力，同时借助 AudioLM/SoundStorm 把离散语音 token 还原成自然语音；代价是强依赖音频 tokenizer 质量，且输出音频任务会占用模型容量，可能对纯文本输出的 ASR/AST 指标产生一定折衷。

#### 🧪 练习题

```yaml
question: "AudioPaLM 将文本 PaLM 改造成语音-文本模型时，最核心的结构改动是什么？"
options:
  - "把 decoder-only Transformer 改成 CNN 编码器"
  - "扩展 token embedding/softmax 矩阵，加入离散音频 token 词表"
  - "删除文本 SentencePiece 词表，只保留音频 token"
  - "把所有语音任务拆成多个独立模型串联调用"
answer: 1
explain: "AudioPaLM 保留 PaLM 主体结构，只把联合词表扩展为文本 token 与音频 token 的并集，并随机初始化新增音频 embedding 后在混合任务上微调。"
```
