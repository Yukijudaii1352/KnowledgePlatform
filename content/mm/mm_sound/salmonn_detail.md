### SALMONN

```yaml
id: salmonn
name: SALMONN
full_name: 通用听觉大模型 (SALMONN)
year: '2024'
org: 清华大学
paper_url: https://proceedings.iclr.cc/paper_files/paper/2024/hash/476ab8f369e489c04187ba84f68cfa68-Abstract-Conference.html
category: audio_llm
parent: qwen_audio
motivation: 双编码器(Whisper+BEATs)
topic_id: mm_sound
yaml_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/mm_sound.yaml
output_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/mm_sound/salmonn_detail.md
```

#### 📝 一句话总结

SALMONN 提出一个端到端通用听觉大模型，用 Whisper 语音编码器与 BEATs 音频编码器共同接入 Vicuna，让 LLM 能直接理解语音、环境声和音乐。它还提出 activation tuning，缓解音频指令微调后只会做 ASR/音频 caption 等训练任务、难以泛化到跨模态推理的问题。

#### 🎯 核心要点

- **双听觉编码器**：Whisper Encoder 捕获语音与转写相关信息，BEATs Encoder 捕获非语音音频事件语义，两者 50Hz 帧率对齐后拼接
- **Window-level Q-Former**：把变长音频帧按窗口压缩为可喂给 LLM 的 auditory tokens，兼顾长音频效率与时间单调对齐
- **Vicuna + LoRA 适配**：冻结 Whisper、BEATs 和 Vicuna 主体，只训练 Q-Former 与 Vicuna 自注意力中的 LoRA 适配器
- **三阶段跨模态训练**：ASR/AAC 预训练 → 多任务 instruction tuning → 少样本 activation tuning
- **覆盖多类听觉任务**：训练任务包括 ASR、语音翻译、音频 caption、音素识别、情感识别、音乐 caption、重叠语音识别、说话人验证和音频问答等
- **显式研究跨模态涌现能力**：评测未训练任务，如英语到德语/日语语音翻译、语音关键词抽取、spoken QA、slot filling、音频故事生成和 speech-audio co-reasoning
- **activation tuning**：用降低 LoRA scaling factor 后生成的少量长答案/故事样本再训练，恢复开放式跨模态指令跟随能力

#### 🔬 深入细节

![SALMONN 模型架构图](https://ar5iv.labs.arxiv.org/html/2310.13289/assets/x1.png)
*图：SALMONN 通过 Whisper + BEATs 双编码器提取听觉特征，经 window-level Q-Former 压缩为 auditory tokens，并与文本指令一起送入带 LoRA 的 Vicuna 生成文本回答。*

##### 算法伪代码

```python
# SALMONN 训练与推理流程伪代码
def salmonn_forward(audio, text_prompt):
    # 1. 冻结的双编码器提取互补听觉特征
    speech_feat = whisper_encoder(audio)       # [T, d_w], speech-centric
    audio_feat = beats_encoder(audio)          # [T, d_b], event/music-centric
    joint_feat = concat([speech_feat, audio_feat], dim=-1)

    # 2. 变长音频按窗口进入 Q-Former，减少 token 数并保持时间顺序
    auditory_tokens = []
    for window in split_into_windows(joint_feat, window_size=W):
        q_tokens = window_level_qformer(learnable_queries, window)
        auditory_tokens.extend(q_tokens)

    # 3. 拼接听觉 token 与文本指令，交给带 LoRA 的 Vicuna
    llm_inputs = [auditory_tokens, tokenize(text_prompt)]
    response = vicuna_with_lora.generate(llm_inputs)
    return response

def train_salmonn():
    freeze(whisper_encoder, beats_encoder, vicuna_backbone)
    trainable = [window_level_qformer, lora_adapters]

    # Stage 1: cross-modal pre-training
    optimize(trainable, data=["ASR", "audio captioning"], loss=next_token_ce)

    # Stage 2: instruction tuning on speech/audio/music tasks
    optimize(trainable, data=multi_task_instruction_data, loss=next_token_ce)

    # Stage 3: activation tuning for emergent open-ended abilities
    pseudo_stories = generate_with_discounted_lora_scaling(few_shot_audio)
    optimize(trainable, data=pseudo_stories, loss=next_token_ce, steps=12)
```

##### 关键公式

双编码器先把同一段音频 \(x\) 映射到互补帧级表示，再沿特征维拼接：

$$
H = [E_{\text{Whisper}}(x); E_{\text{BEATs}}(x)], \quad H \in \mathbb{R}^{T \times (d_w+d_b)}
$$

window-level Q-Former 用一组可学习查询 \(Q\) 对每个局部窗口 \(H_i\) 做跨注意力，得到可接入 LLM 的 auditory tokens：

$$
Z = \operatorname{Concat}_{i=1}^{\lceil T/W \rceil} \operatorname{QFormer}_{\phi}(Q, H_i)
$$

给定文本指令 \(p\) 与目标回答 \(y_{1:N}\)，SALMONN 仍按自回归语言建模优化：

$$
\mathcal{L}_{\text{CE}} = -\sum_{t=1}^{N}\log P_{\theta,\phi}(y_t \mid y_{<t}, p, Z)
$$

其中 \(\theta\) 主要对应 LoRA 参数，\(\phi\) 对应 Q-Former；Whisper、BEATs 和 Vicuna 主体保持冻结。

##### 方法解读：为什么需要 Whisper + BEATs

SALMONN 的问题设定不是单纯语音识别，而是让 LLM 获得 generic hearing abilities：同一个模型要能听懂人说话、背景环境声和音乐。只用 Whisper 会偏向语音转写和语音翻译，遇到非语音事件、音乐属性或语音与背景声共同推理时信息不足；只用 BEATs 又缺少足够强的语音识别与语言内容建模能力。因此论文把 Whisper Encoder 和 BEATs Encoder 并联，并利用二者相同的 50Hz 输出帧率做帧级拼接，让 LLM 的上游输入同时包含“说了什么”和“发生了什么声音”。

这与 AudioGPT 一类工具编排系统的差异很关键：AudioGPT 是 LLM 调用外部专家模型，任务边界由模型注册表和 prompt 决定；SALMONN 则把听觉编码器、跨模态连接器和 LLM 接成单个端到端生成模型。端到端结构的收益是推理时不必先显式 ASR 或显式声音分类，也能处理 speech-audio co-reasoning，例如音频里有人用语音提问，同时背景声提供答案线索。

##### 方法解读：window-level Q-Former 解决变长音频接入

音频和图像最大的差别是长度：图像编码器通常产生固定或近似固定数量的 patch tokens，而语音/音频帧会随时长线性增长，直接喂给 LLM 会导致 token 过长。SALMONN 没有对整段音频只压成固定数量 token，因为那会损失时间顺序和语音细节；它将拼接后的听觉帧切成窗口，对每个窗口分别用 Q-Former 的可学习查询做跨注意力压缩。

这种设计有两个直觉优势。第一，窗口级压缩让输出 token 数随音频时长增长，但增长速度远低于原始帧序列，适合长音频。第二，每个窗口产生的 token 顺序仍与原始音频大体单调对应，这对 ASR、音素识别、重叠语音识别等依赖时间顺序的任务更友好。也就是说，Q-Former 不只是“降维层”，而是控制 LLM 可见听觉上下文粒度的关键接口。

##### 方法解读：LoRA 与 task over-fitting

SALMONN 冻结 Vicuna 主体，只在注意力层的 query/value 矩阵上加 LoRA。参数高效微调降低了训练成本，也减少了破坏语言模型原有推理能力的风险；但论文发现，仅经过预训练和 instruction tuning 后，模型会出现 task over-fitting：即使 prompt 要求开放式问答或推理，模型也倾向输出训练集中最常见、最确定的任务格式，例如直接转写或生成 caption。

论文把这个问题解释为跨模态训练诱导出的 intrinsic conditional LM 偏向了短、确定、低多样性的回答分布。形式上，当训练集中某些 prompt 类型 \(p_k\) 的样本更多、监督更确定时，优化目标会更强地提升这些任务的条件概率：

$$
\max_{\theta,\phi}\sum_{p_k}\sum_{(x,y)\in D_k}\log P_{\theta,\phi}(y \mid x, p_k)
$$

测试时遇到未训练的新 prompt \(p^\*\)，模型虽然有 Vicuna 的语言推理先验，但跨模态适配层学到的条件分布可能把音频输入解释成“熟悉任务”的证据，从而忽略指令。这解释了为什么模型能在训练任务上表现好，却无法稳定完成故事生成、spoken QA 或 speech-audio co-reasoning。

##### 方法解读：activation tuning 的作用

activation tuning 的核心不是再堆大量标注数据，而是用很少样本“唤醒”被 instruction tuning 压住的开放式能力。论文先在测试时降低 LoRA scaling factor，使模型短暂摆脱对高频训练任务的强偏置，生成更长、更开放的故事式回答；再把这些回答作为 teacher-forcing 样本微调少量步数。实验中最终阶段只用了 12 条故事样本、12 个训练 step，就显著提高了 Story、SAC、SQQA 等任务的 following rate，同时基本保留 ASR 等 level-1 任务能力。

> 💡 关键：SALMONN 的贡献不只是“双编码器接 LLM”，还在于指出音频指令微调会让模型过拟合常见听觉任务，并给出少样本 activation tuning 作为恢复跨模态涌现能力的实用办法。

#### 🧪 练习题

```yaml
question: "SALMONN 为什么采用 window-level Q-Former，而不是把整段音频一次性压成固定数量 token？"
options:
  - "为了让 Whisper 和 BEATs 的参数都参与全量微调"
  - "为了在压缩变长音频的同时保留近似单调的时间对齐"
  - "为了把音频先转换成离散文本再交给 Vicuna"
  - "为了完全避免使用文本指令 prompt"
answer: 1
explain: "window-level Q-Former 对局部时间窗口分别压缩，既减少 LLM 输入长度，又保留与原始音频顺序相关的时间分辨率，这对语音和长音频任务很重要。"
```
