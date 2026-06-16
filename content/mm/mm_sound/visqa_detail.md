### ViSQA

```yaml
id: visqa
name: ViSQA
full_name: 越南语音频问答 (ViSQA)
year: '2026'
org: —
paper_url: https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0340771
category: frontier_2026
parent: ltu
motivation: 低资源语言音频QA基准
topic_id: mm_sound
yaml_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/mm_sound.yaml
output_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/mm_sound/visqa_detail.md
```

#### 📝 一句话总结

ViSQA 提出首个面向越南语 Spoken Question Answering 的可复现实验基准，把 UIT-ViQuAD 文本问答通过 TTS、ASR、答案重对齐和噪声增强转换为 spoken QA 数据。它解决了越南语缺少标准音频问答评测集、难以定量分析 ASR 错误如何传递到下游阅读理解的问题。

#### 🎯 核心要点

- **越南语 SQA 基准**：基于 UIT-ViQuAD 构造超过 13,000 个与 spoken inputs 对齐的问答样本
- **可复现 TTS-ASR 流水线**：用合成语音和 ASR 转写固定语言内容，隔离口音、录音设备和自发口语等不可控因素
- **答案跨度重对齐**：对 ASR transcript 中被替换、删除或位置漂移的答案进行 exact/normalized/nearby span matching，无法可靠对齐的样本会被过滤
- **干净与噪声测试集**：在 clean audio 外加入 torch-audiomentations 与 ESC-50 环境噪声，形成不同 WER 条件下的鲁棒性评估
- **五个 Transformer 基线**：比较 PhoBERT、mBERT、XLM-R、BARTPho、ViT5，覆盖 encoder-only span extraction 与 encoder-decoder generative QA
- **ASR 错误诊断**：ViT5 从文本输入的 EM 62.04% 降到 ASR transcript 的 36.30%，说明 moderate WER 会显著损害 QA
- **spoken transcript 训练提升鲁棒性**：在 ViSQA ASR 转写上训练后，ViT5 EM 从 36.30% 回升到 50.70%，mBERT EM 从 23.69% 提升到 46.18%

#### 🔬 深入细节

![ViSQA 数据构造流水线](https://journals.plos.org/plosone/article/figure/image?id=10.1371/journal.pone.0340771.g001&size=large)
*图：ViSQA 从 UIT-ViQuAD 文本 QA 出发，经 TTS 合成、ASR 转写、答案重对齐和噪声增强，得到可控的越南语 spoken QA benchmark。*

##### 算法伪代码

```python
# ViSQA 数据构造与答案跨度重对齐伪代码
def build_visqa(uit_viquad_validation):
    examples = []
    for passage, question, answers in uit_viquad_validation:
        clean_audio = vietnamese_tts(passage)
        clean_asr = google_speech_to_text(clean_audio)

        noisy_audio = add_noise(
            clean_audio,
            effects=["reverb", "bandpass", "clipping"],
            environmental_sounds="ESC-50",
        )
        noisy_asr = google_speech_to_text(noisy_audio)

        clean_span = align_answer_span(answers, clean_asr)
        noisy_span = align_answer_span(answers, noisy_asr)

        if clean_span is not None:
            examples.append((clean_audio, clean_asr, question, clean_span))
        if noisy_span is not None:
            examples.append((noisy_audio, noisy_asr, question, noisy_span))
    return examples

def align_answer_span(answer_texts, transcript):
    candidates = []
    for answer, original_start in answer_texts:
        candidates += exact_matches(answer, transcript)
        if not candidates:
            norm_answer = normalize_whitespace(answer)
            norm_transcript = normalize_whitespace(transcript)
            for norm_pos in exact_matches(norm_answer, norm_transcript):
                pos = map_to_original(norm_pos, transcript)
                nearby = search_window(transcript, answer, center=pos, radius=50)
                if nearby:
                    candidates.append(nearby)
        if candidates:
            return closest_to_original_start(candidates, original_start)
    return None

def evaluate_sqa(audio, question, mrc_model, asr_model):
    transcript = asr_model.transcribe(audio)
    return mrc_model.answer(context=transcript, question=question)
```

##### 关键公式

ViSQA 的核心不是提出新网络层，而是把 spoken QA 建成可诊断的受控数据生成过程。给定文本段落 \(c\)、问题 \(q\) 和原答案跨度 \(a\)，TTS-ASR 流水线可写成：

$$
x = \operatorname{TTS}(c), \quad \hat{c} = \operatorname{ASR}(x), \quad \hat{a} = \operatorname{Align}(a, \hat{c})
$$

其中 \(\hat{c}\) 是带 ASR 错误的 transcript，\(\hat{a}\) 是在 transcript 中重新定位后的答案跨度。ASR 质量用 WER 衡量：

$$
\operatorname{WER} = \frac{S + D + I}{N}
$$

这里 \(S,D,I\) 分别表示 substitution、deletion、insertion 数量，\(N\) 是参考文本词数。QA 模型仍用 Exact Match 和 token-level F1 评估：

$$
\operatorname{F1} = \frac{2 \cdot P \cdot R}{P + R}
$$

##### 方法解读：为什么从 UIT-ViQuAD 合成 spoken QA

越南语已有 UIT-ViQuAD、ViNewsQA、VIMQA 等文本阅读理解数据，但这些数据只评估干净文本，不回答一个更现实的问题：当用户面对的是语音内容，系统必须先 ASR 再做 QA 时，识别错误会怎样影响答案抽取。ViSQA 选择从 UIT-ViQuAD 的验证集出发，是因为这些样本有可用 gold answer 和 plausible answer，便于在 ASR transcript 中重新定位答案；而 UIT-ViQuAD test split 没有公开 ground-truth answers，不适合作为构造基础。

这个设计牺牲了真实人声中的口音、停顿和 spontaneous speech 多样性，但换来了非常强的实验控制。论文明确把 ViSQA 定位为 controlled synthetic baseline：先固定语言内容，再系统改变 ASR 系统、噪声强度和训练输入类型。这样模型性能变化可以更可靠地归因于 transcription quality，而不是录音设备、说话人差异或标注噪声。

##### 方法解读：答案重对齐是数据集可用性的关键

普通文本 QA 的答案是原 passage 中的字符跨度；但经过 TTS 和 ASR 后，\(\hat{c}\) 不再逐字等于 \(c\)。ASR 可能把实体写错、删除量词、改变空白或断句，导致原来的 answer_start 在 transcript 中失效。如果不重新对齐，模型会看到“问题有答案，但标签指向错误位置”的训练样本，span extraction 模型会被严重污染。

ViSQA 的对齐算法先尝试 exact substring match，再做 whitespace normalization 后匹配；如果仍失败，就把 normalized index 映射回原 transcript，并在估计位置周围 50 个字符窗口里搜索。只有能恢复 gold answer 或 plausible answer 的样本才保留。这个过滤步骤使数据集既保留 ASR 错误的真实影响，又避免把无答案或错标签样本混入训练。

##### 方法解读：干净/噪声/不同 ASR 形成诊断矩阵

ViSQA 的评测不是单一排行榜，而是一个诊断矩阵。第一维是输入质量：clean audio 的 Google ASR、加噪后的 Google ASR，以及更高质量的 AssemblyAI ASR。第二维是训练方式：模型可以只在干净文本上训练，也可以在 spoken transcripts 上训练。第三维是模型结构：PhoBERT、mBERT、XLM-R 更偏 span extraction，BARTPho 和 ViT5 则是生成式 encoder-decoder。

结果显示，文本训练模型迁移到 ASR transcript 会显著掉分，例如 ViT5 EM 从 62.04% 降到 36.30%。但当模型直接在 ViSQA spoken transcriptions 上训练，鲁棒性明显回升，ViT5 EM 可到 50.70%，mBERT EM 从 23.69% 到 46.18%。这说明 SQA 的瓶颈不是只有 ASR 前端，MRC 模型也必须暴露在 ASR 风格的噪声分布下。

##### 方法解读：ViSQA 与端到端音频大模型的关系

与 LTU、SALMONN、Qwen2-Audio 这类直接接收音频 token 的 Audio-LLM 不同，ViSQA 采用传统 SQA pipeline：音频先进入 ASR，得到 transcript，再交给 MRC 模型。这个设置看似朴素，但它能精确测量错误传播：当 WER 从 11.02% 升到 15.83%，不同模型的 EM/F1 下降幅度可以被直接观察；当 Google STT 换成 AssemblyAI，ViT5 F1 从 73.10% 提升到 77.08%，也能说明转写质量对下游理解的边际价值。

> 💡 关键：ViSQA 的贡献不在于一个更大的模型，而在于把“越南语语音内容 + 问题 + 答案跨度 + 可控 ASR 错误”变成可复现 benchmark，让低资源语言 SQA 的错误来源可以被拆开研究。

#### 🧪 练习题

```yaml
question: "ViSQA 为什么需要在 ASR transcript 上重新对齐答案跨度？"
options:
  - "因为 TTS 会随机改变问题文本，必须重新生成问题"
  - "因为 ASR 错误会让原 passage 中的 answer_start 在 transcript 中失效"
  - "因为 ViSQA 只评估音频分类，不需要原始答案"
  - "因为 encoder-decoder 模型不能使用文本 transcript"
answer: 1
explain: "SQA 模型实际读取的是 ASR transcript；如果答案跨度仍使用原文本位置，替换、删除和空白变化会造成标签错位，因此必须重新匹配或过滤。"
```
