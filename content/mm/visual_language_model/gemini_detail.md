### Gemini

```yaml
id: gemini
name: Gemini
year: '2023.12'
category: native_multimodal
institution: Google
paper: Technical Report
motivation: 原生多模态联合训练
parent: pali
description: 从预训练阶段即在跨模态数据上联合训练，支持文本、图像、音频、视频无缝交错，在30/32个基准上刷新SOTA。
topic_id: visual_language_model
yaml_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/visual_language_model.yaml
output_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/visual_language_model/gemini_detail.md
```

#### 📝 一句话总结
Gemini 提出了一组从预训练阶段就联合建模文本、图像、音频、视频的原生多模态 Transformer，解决了“先训练语言模型、再外挂视觉适配器”难以自然处理交错多模态上下文的问题，并在 30/32 个报告基准上刷新或追平当时最佳结果。

#### 🎯 核心要点
- 原生多模态：预训练数据同时包含 web 文档、书籍、代码、图像、音频、视频，而不是只在后期做视觉指令微调
- 统一序列接口：文本 token、视觉 token、音频特征和视频帧可在同一个上下文窗口中交错输入
- Decoder-only Transformer：支持 32K 上下文，使用 Multi-Query Attention 等高效注意力机制优化长上下文推理和 KV cache
- 三档模型族：Ultra 面向复杂推理，Pro 面向成本/延迟平衡，Nano-1/Nano-2 面向端侧部署并由大模型蒸馏
- 视觉与音频处理：视觉编码继承 Flamingo、CoCa、PaLI 路线，视频被表示为帧序列，音频以 16kHz USM 特征直接接入
- 后训练流程：以 SFT、reward model 和 RLHF 对预训练模型进行指令跟随、安全性和产品化能力对齐
- 评测表现：Gemini Ultra 在 MMLU 达到约 90%，并在图像理解、视频理解、语音识别/翻译等多模态基准上取得强结果

#### 🔬 深入细节
##### 核心示意图

![Gemini 官方多模态发布图](https://storage.googleapis.com/gweb-uniblog-publish-prod/images/06_Foundation_01.width-1000.format-webp.webp)
*图：Google 官方 Gemini 发布页配图。技术报告 Figure 2 的核心含义是：文本、图像、音频、视频被组织为同一条交错 token 序列，模型可输出文本以及离散图像 token。*

公开来源：arXiv 技术报告 `https://arxiv.org/abs/2312.11805`，Google 官方报告 PDF `https://storage.googleapis.com/deepmind-media/gemini/gemini_1_report.pdf`，Google 官方发布页 `https://blog.google/innovation-and-ai/technology/ai/google-gemini-ai/`。

##### 核心流程代码

```python
# Gemini-style native multimodal pretraining/inference flow

def encode_interleaved_inputs(items):
    sequence = []
    for item in items:
        if item.type == "text":
            sequence.extend(sentencepiece_tokenizer(item.text))
        elif item.type == "image":
            visual_tokens = vision_encoder(item.image, variable_resolution=True)
            sequence.extend(visual_tokens)
        elif item.type == "video":
            frames = sample_frames(item.video)
            for frame in frames:
                sequence.extend(vision_encoder(frame, variable_resolution=True))
        elif item.type == "audio":
            audio_features = usm_encoder(item.waveform, sample_rate=16000)
            sequence.extend(audio_features)
    return sequence

def train_step(multimodal_example, decoder):
    x = encode_interleaved_inputs(multimodal_example.context)
    y = encode_interleaved_inputs(multimodal_example.target)
    logits = decoder(x + y[:-1])
    return cross_entropy(logits[-len(y):], y)

def generate_response(prompt_items, decoder):
    tokens = encode_interleaved_inputs(prompt_items)
    while not stop(tokens):
        next_token = sample(decoder(tokens)[-1])
        tokens.append(next_token)
    return detokenize_text_and_image_tokens(tokens)
```

##### 关键公式

Gemini 的统一接口可以抽象为把不同模态映射到同一自回归序列：

$$
z = [E_{\text{text}}(x_t), E_{\text{img}}(x_i), E_{\text{aud}}(x_a), E_{\text{vid}}(x_v)]
$$

随后 decoder-only Transformer 以标准 next-token objective 训练：

$$
\mathcal{L}_{\text{NTP}}
= -\sum_{k=1}^{T}\log p_{\theta}(z_k \mid z_{<k})
$$

对于 Multi-Query Attention，可把每个 head 独立的 \(Q_h\) 与共享的 \(K,V\) 结合：

$$
\text{MQA}_h(Q_h,K,V)=\text{softmax}\left(\frac{Q_hK^\top}{\sqrt{d}}\right)V
$$

共享 \(K,V\) 的直觉是降低长上下文生成时的 KV cache 规模，使 32K 上下文、多帧视频和交错图文输入更容易服务。

##### 方法解读

Gemini 的主要动机是把多模态能力前移到预训练阶段。此前很多视觉语言模型沿用“强视觉编码器 + 语言模型 + 连接器”的路线，视觉能力常在后期通过图文对齐或指令数据补进去；这种方案能快速获得视觉问答能力，但模型内部仍然以语言为中心，遇到音频、视频、多图交错、图像输出等场景时需要额外拼接模块。Gemini 则把文本、图像、音频、视频都当成可进入同一上下文的序列元素，让跨模态推理在预训练目标中反复出现。

架构上，Gemini 1.0 仍是 decoder-only Transformer 家族，但它不是纯文本 LLM。技术报告明确提到模型支持 32K 上下文，并采用 Multi-Query Attention 等高效注意力机制；视觉编码设计继承了 Google 在 Flamingo、CoCa、PaLI 上的经验，但区别在于 Gemini 从一开始就是多模态模型。输入端，图像、图表、截图、PDF、视频帧和文本可以自然交错；音频端，模型接收 16kHz 的 USM 特征，而不是先把语音转写成文本再推理，因此保留了更多语音细节。

视频理解在 Gemini 中被处理为长上下文内的帧序列。这个设计看似朴素，但和 32K 上下文、可变分辨率视觉编码结合后，可以在任务需要细粒度视觉信息时投入更多计算，在需要时间关系时把多帧放入同一上下文。其优势是接口统一：视频帧、图片、语音提问和文本说明都进入同一条序列，模型用同一个自回归机制学习“下一步应该输出什么”。

训练数据是 Gemini 区别于后接式 VLM 的关键。报告描述其预训练语料为多模态、多语言混合数据，包含网页文档、书籍、代码以及图像、音频、视频数据；同时使用启发式规则、模型分类器、安全过滤和评测集去污染。训练混合还会分阶段调整，例如在后期提高领域相关数据权重。这意味着 Gemini 的能力不是单靠某个视觉指令集堆出来，而是来自大规模跨模态语料、训练基础设施和后训练策略的组合。

模型族设计也服务于不同部署约束。Ultra 追求复杂推理和多模态 SOTA，Pro 追求质量、成本和延迟平衡，Nano 则由大模型蒸馏并做 4-bit 量化以适配端侧。这个分层非常重要：原生多模态不只是“最大模型能力展示”，还要能把一部分能力迁移到手机等低资源环境。报告中 Nano-1 为 1.8B、Nano-2 为 3.25B，说明 Gemini 从设计上就把模型压缩和端侧运行纳入体系。

与 PaLI/LLaVA 等路线相比，Gemini 的核心差别不在某个连接器，而在训练范式。PaLI 已经证明大规模图文训练有效，LLaVA 证明轻量连接器加视觉指令微调很高效；Gemini 则把范围扩展到音频、视频、代码、图像输出和交错上下文，并用同一个模型族覆盖云端与端侧。代价是报告没有公开完整参数量和所有数据配比，复现难度很高；但它确立了后续原生多模态模型的方向：统一 token 化、统一上下文、统一生成目标。

#### 🧪 练习题

```yaml
question: "Gemini 被称为原生多模态模型的关键原因是什么？"
options:
  - "只在语言模型训练完成后增加一个视觉分类头"
  - "从预训练阶段就联合使用文本、图像、音频、视频等数据，并把它们组织为交错序列"
  - "只使用更高分辨率图像提升 OCR 能力"
  - "把所有音频先转写为文本后再送入语言模型"
answer: 1
explain: "Gemini 的核心是跨模态联合预训练和统一序列接口，而不是后期外挂单一视觉模块。"
```
