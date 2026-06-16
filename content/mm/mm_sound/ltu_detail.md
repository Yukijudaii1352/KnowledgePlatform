### LTU

```yaml
id: ltu
name: LTU
full_name: 听思理解 (Listen Think Understand)
year: '2024'
org: MIT
paper_url: https://proceedings.iclr.cc/paper_files/paper/2024/hash/510d0935b543a29d686f93fa52d1c288-Abstract-Conference.html
category: audio_llm
parent: salmonn
motivation: 通用音频语义理解
topic_id: mm_sound
yaml_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/mm_sound.yaml
output_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/mm_sound/ltu_detail.md
```

#### 📝 一句话总结

LTU 将通用音频理解统一成 audio question answering，用 AST 音频编码器接入 Vicuna/LLaMA，并通过 OpenAQA-5M 与 perception-to-understanding curriculum 训练模型从声音感知走向开放式推理。它解决了传统音频模型只能输出固定标签、缺少解释与场景理解能力的问题。

#### 🎯 核心要点

- **AST + Vicuna/LLaMA 架构**：CAV-MAE 预训练并在 AudioSet-2M 微调的 AST 负责听觉感知，Vicuna/LLaMA-7B 负责语言生成与推理
- **音频 token 接入方式**：10 秒音频转 128 维 log-Mel fbank，切成 512 个 spectrogram patches，经 AST、频率池化与时间下采样得到 32 个音频 embedding
- **LoRA 参数高效适配**：冻结 LLaMA 主体，在 self-attention 的 key/query projection 加 LoRA，约 4.2M 可训练参数
- **OpenAQA-5M 数据集**：基于 8 个公开音频数据集构造 845K 音频、5.682M QA，其中 1.9M closed-ended、3.7M open-ended
- **Audio Instruction Generation (AIG)**：用音频事件、声学特征、caption、时间戳等文本元信息提示 GPT-3.5 生成开放式音频问答
- **perception-to-understanding curriculum**：先学客观封闭任务来绑定音频，再逐步加入 caption、时间分析和开放式理解任务
- **无需预定义标签集**：推理时用户直接问自然语言问题，模型生成自由文本答案，可覆盖分类、caption、解释、推断和场景理解

#### 🔬 深入细节

![LTU 模型架构与示例](https://ar5iv.labs.arxiv.org/html/2305.10790/assets/x1.png)
*图：LTU 使用 AST 将音频 spectrogram 编码为一串音频 embedding，投影后与文本问题 embedding 拼接，送入带 LoRA 的 LLaMA/Vicuna 生成答案。*

##### 算法伪代码

```python
# LTU 的数据生成、课程训练与推理流程伪代码
def build_open_aqa(public_audio_datasets):
    qa_pairs = []
    for audio, metadata in public_audio_datasets:
        # Closed-ended: 标签、声学特征、caption、时间戳等客观问题
        qa_pairs += make_rule_based_closed_questions(metadata)

        # Open-ended: GPT 只看元信息，不直接听音频，生成多样问题和答案
        prompt = render_audio_instruction_generation_prompt(metadata)
        qa_pairs += gpt35_generate_open_questions(prompt)
    return qa_pairs

def ltu_forward(audio, question):
    fbank = log_mel_filterbank(audio, n_mels=128, win_ms=25, hop_ms=10)
    patches = split_spectrogram_to_patches(fbank, patch_size=(16, 16))
    ast_tokens = ast_encoder(patches)          # 512 x 768
    audio_tokens = temporal_downsample(mean_pool_freq(ast_tokens), target_len=32)
    audio_tokens = projection(audio_tokens)    # 32 x 4096

    text_tokens = vicuna_tokenizer(question)
    return vicuna_lora.generate([audio_tokens, text_tokens])

def train_ltu(open_aqa):
    freeze(llama_backbone)
    # Stage 1: 只训 projection，让随机初始化的音频投影先对齐 LLM 空间
    train(params=[projection], tasks=["classification", "acoustic_features"])
    # Stage 2: 训练 AST + projection + LoRA，仍使用低层感知任务
    train(params=[ast_encoder, projection, lora], tasks=["classification", "acoustic_features"])
    # Stage 3: 加入全部 closed-ended QA
    train(params=[ast_encoder, projection, lora], tasks=["closed_ended"])
    # Stage 4: 加入 closed-ended + open-ended，学习开放式理解和推理
    train(params=[ast_encoder, projection, lora], tasks=["all_open_aqa"])
```

##### 关键公式

LTU 首先把音频 \(x\) 变成固定长度的 32 个音频 token，并投影到 LLaMA 的 hidden size：

$$
A = \operatorname{Proj}(\operatorname{Downsample}(\operatorname{Pool}_{f}(\operatorname{AST}(\operatorname{Fbank}(x)))))
$$

给定音频 token \(A\)、问题 token \(q\) 和答案 \(y_{1:N}\)，训练目标是标准自回归交叉熵：

$$
\mathcal{L}_{\text{LTU}} = -\sum_{t=1}^{N}\log P_{\theta,\phi}(y_t \mid A, q, y_{<t})
$$

LoRA 对冻结权重 \(W\) 加低秩增量，减少需要更新的 LLM 参数：

$$
W' = W + \frac{\alpha}{r}BA,\quad B\in \mathbb{R}^{d\times r},\ A\in \mathbb{R}^{r\times k}
$$

##### 方法解读：把音频任务统一为问答

传统音频模型通常把音频映射到固定标签空间，例如 AudioSet 的 527 类事件。这类模型能“感知”声音，却很难回答“为什么这是紧急场景”“这个声音适合给什么视频配音”“前后两个声音的时间关系说明了什么”。LTU 的关键转变是把分类、caption、声学特征识别、时间分析和开放式推理全部转写成 \((audio, question, answer)\) 三元组，模型不再输出固定类别 id，而是按用户问题生成自然语言答案。

这个统一接口有两个直接收益。第一，封闭式任务仍然可以保留，因为“这段音频里有哪些声音事件？”就是一个普通问题；第二，开放式能力可以通过同一套自回归语言建模目标学习，不需要为每种推理任务新增分类头。也因此，LTU 推理时不要求用户给候选标签集，模型可以直接回答任意音频相关问题。

##### 方法解读：AST 负责听，LLM 负责想

LTU 的音频侧选择 AST，而不是语音专用编码器。AST 把 log-Mel spectrogram 视为二维 patch 序列，先通过 CAV-MAE 自监督预训练，再在 AudioSet 上微调，适合捕捉环境声和通用声音事件。论文中 10 秒音频被处理成 \(1024 \times 128\) 的时频图，再切成 512 个 \(16\times16\) patch；AST 输出 512 个 768 维 embedding 后，经过频率平均池化和 2 倍时间下采样，形成 32 个按时间顺序排列的音频 token。

这些音频 token 会投影到 4096 维，与 LLaMA/Vicuna 的文本 embedding 维度一致，然后直接拼到文本问题前。直觉上，AST 提供“听到了什么”的连续证据，Vicuna 提供“如何根据问题组织答案和推理”的语言能力。冻结 LLM 主体、只训练音频侧和 LoRA，使模型尽量保留 LLM 原有的语言推理与指令跟随能力，同时学会把音频 token 当作上下文条件使用。

##### 方法解读：OpenAQA-5M 与 AIG

LTU 的训练数据不是重新采集音频，而是重标注 AudioSet、VGGSound、FSD50K、AudioCaps、FreeSound、Clotho、Sound Bible 等公开数据。closed-ended 部分由规则和已有标注构造，覆盖分类、声学特征、caption、时间戳分析等客观问题；open-ended 部分使用 Audio Instruction Generation：先把音频事件、声学特征、caption 和时间戳组织成文本元信息，再让 GPT-3.5 生成需要解释、推断、场景理解的问题与答案。

这里有一个重要约束：GPT 生成 QA 时看的是元信息文本，不直接听音频；LTU 训练和推理时输入的是原始音频和问题，不输入那些元信息。这迫使 LTU 必须从音频本身学会恢复事件、时序和语义线索，而不是在推理时依赖外部标签。论文还保留了一部分“无法从音频确定”的问答，这能教模型在证据不足时拒绝过度推断，降低幻觉。

##### 方法解读：从 perception 到 understanding 的课程

直接把开放式 QA 扔给一个还没学会听音频的 LLM，容易得到“靠语言常识乱答”的模型：问题越开放，模型越可能忽略音频条件。LTU 用四阶段课程训练解决这个问题。第一阶段只训练投影层，用分类和声学特征描述把随机初始化的音频投影拉进 LLM 空间；第二阶段开放 AST、投影和 LoRA，但仍聚焦低层感知任务；第三阶段加入全部 closed-ended QA；第四阶段才加入 closed-ended 和 open-ended 全量数据。

> 💡 关键：closed-ended 任务在 LTU 中不是落后的分类残留，而是让模型学会“必须听音频才能答对”的锚点；开放式任务则在这个锚点上扩展解释、推断和场景理解。

#### 🧪 练习题

```yaml
question: "LTU 的 perception-to-understanding curriculum 为什么先训练 closed-ended 感知任务，再加入 open-ended 问答？"
options:
  - "因为 open-ended 问答只用于评测，不能参与训练"
  - "因为先用客观答案约束模型关注音频，可减少早期靠语言先验幻觉作答"
  - "因为 AST 只能输出固定标签，无法处理开放式问题"
  - "因为 LoRA 只能在最后一个训练阶段被启用"
answer: 1
explain: "论文指出开放式任务在训练初期过难，模型容易不看音频而靠语言能力作答；先学封闭式感知任务可以建立音频条件，再逐步过渡到理解与推理。"
```
