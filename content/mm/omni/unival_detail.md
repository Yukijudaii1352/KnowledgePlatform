### 统一价值模型 (UniVal)

```yaml
id: unival
name: UniVal
full_name: "统一价值模型 (UniVal)"
year: '2023'
org: Sorbonne
paper_url: https://arxiv.org/abs/2307.16184
category: unified_seq2seq
parent: ofa
motivation: 四模态轻量统一模型
topic_id: omni
yaml_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/omni.yaml
output_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/omni/unival_detail.md
```

#### 📝 一句话总结

UniVal 提出一个约 0.25B 参数的统一 seq2seq 多模态模型，用 BART 风格 encoder-decoder 与轻量模态编码器统一文本、图像、视频和音频任务，解决小中规模模型难以跨越两种以上模态的问题。

#### 🎯 核心要点

- 统一四个轴：统一模型、统一输入/输出 token 格式、统一任务提示、统一 next-token 训练目标
- 共享核心为 BART-base 初始化的 encoder-decoder Transformer，不使用任务特定 head
- 图像、视频、音频分别使用轻量 CNN 编码器：ResNet-101、3D ResNeXt-101、PANN-CNN14
- 所有任务被转写为带文本提示的序列到序列生成任务，例如 caption、VQA、visual grounding、video QA、audio captioning
- 预训练主要使用高质量公开 image-text 与 video-text 数据，而非十亿级噪声图文对
- 使用 Multimodal Curriculum Learning：先图文，再加入视频文本，最终可微调到音频文本等新模态
- 使用 task balancing 缓解不同数据集规模差异，避免大数据集如 CC12M 主导训练
- 研究多模态任务的权重插值，将不同任务微调得到的权重线性合并以提升鲁棒性和 OOD 泛化
- 支持参数高效微调场景，只训练模态线性连接也能迁移到新任务/新模态

#### 🔬 深入细节

##### 框架总览

![UnIVAL 统一模型示意](https://arxiv.org/html/2307.16184v2/x1.png)
*图：UnIVAL 将架构、任务、输入输出格式和训练目标统一为序列到序列的 next-token prediction。*

![UnIVAL 架构细节](https://arxiv.org/html/2307.16184v2/x7.png)
*图：UnIVAL 使用典型 encoder-decoder Transformer，并在输入侧接入轻量 CNN 模态编码器。*

UnIVAL 的出发点是反对“每个模态、每个任务都配一套专门结构”的做法。它把语言模型作为共享核心，让图像、视频、音频编码器只负责把原始模态压成 token 序列，再线性投影到 LM 的输入维度。这样模型主体始终面对同一种对象：一串带位置、模态和词表语义的 token。

架构上，UnIVAL 采用 encoder-decoder 而不是 decoder-only。原因是非文本模态输入通常需要双向上下文建模，encoder 的 self-attention 适合吸收图像区域、视频帧或音频片段 token；decoder 再通过 cross-attention 读取 encoder 输出并自回归生成答案。其条件生成目标可以写成：

$$
\mathcal{L}_{\text{seq2seq}}=-\sum_{i=1}^{T}\log p_{\theta}(y_i\mid y_{<i},\,x_{\text{modal}},\,p_{\text{task}})
$$

其中 \(x_{\text{modal}}\) 是图像/视频/音频/文本 token，\(p_{\text{task}}\) 是任务提示，例如 “what does the video describe?”，\(y_i\) 是输出序列 token。视觉 grounding 等判别任务也被改写为生成任务：模型输出离散化坐标 token，而不是接一个专门检测 head。

```python
# UnIVAL 预训练与迁移流程伪代码
model = BartLikeEncoderDecoder.init_from_bart_base()
encoders = {
    "image": ResNet101(pretrained="ImageNet"),
    "video": ResNeXt3D101(pretrained="Kinetics400"),
    "audio": PANN_CNN14(pretrained="AudioSet"),
}

for stage in ["image_text", "image_video_text"]:
    tasks = curriculum_tasks(stage)
    for step in range(stage_steps[stage]):
        task = balanced_sample(tasks)  # task balancing
        modal_tokens = encoders[task.modality](task.raw_input)
        lm_tokens = linear_project(flatten(modal_tokens))
        prompt = tokenize(task.prompt)
        target = tokenize_or_discretize(task.target)

        logits = model.encoder_decoder(prompt, lm_tokens, decoder_input=target[:-1])
        loss = cross_entropy(logits, target[1:])
        optimizer.step(loss)

# 新模态或新任务：可全量微调，也可只训练线性连接
freeze(model)
train(linear_projection_for_new_modality)
```

论文强调“小中规模可训练性”。如果所有模态和所有任务一开始混在一起训练，长视频和音频会显著增加计算与显存压力；UnIVAL 使用 Multimodal Curriculum Learning，先做语言/图文，再加入视频文本任务。论文报告两阶段 curriculum 在性能接近 one-stage 的情况下，训练时间约快 18%，GPU 显存约省 25%。这说明 curriculum 的主要价值不是制造新目标，而是让模型逐步适应新模态分布，减少从零混训的成本。

task balancing 则处理另一个实际问题：公开数据集规模差异非常大。若 batch 内样本数按数据集大小自然比例分配，CC12M 这类大集会压过 VQA、RefCOCO 等高质量但较小的任务集，模型会向 caption-style 目标偏移。UnIVAL 改成让任务在 batch 中更均衡出现，使 VQA、visual grounding、captioning 等能力共同训练。

UnIVAL 的预训练任务覆盖 image captioning、VQA、visual grounding、grounded captioning、image-text matching、video captioning、video QA、video-text matching。训练数据包括 COCO、Visual Genome、SBU、CC3M、CC12M、VQAv2、GQA、RefCOCO 系列、WebVid2M、WebVidQA 等。音频并不是主要预训练模态，但模型在音频文本任务上可通过微调 PANN-CNN14 连接层迁移，体现了“统一 LM 核心 + 轻量模态投影”的可扩展性。

论文还研究了多模态模型合并。若从同一个 UnIVAL 预训练权重出发，在不同多模态任务上得到 \(W_A\)、\(W_B\)，可以直接线性插值：

$$
W(\lambda)=\lambda W_A+(1-\lambda)W_B,\quad \lambda\in[0,1]
$$

这个公式的直觉是：共享初始化下的不同微调模型往往处在相连的低损失区域，权重平均可以近似集成多个任务专长，却不会增加推理成本。对多模态模型而言，这提供了除多任务预训练之外的第二条“任务协作”路径。

与 OFA 相比，UnIVAL 的重点不是做更大的图文模型，而是把统一框架推进到图像、视频、音频和文本四类输入/输出场景，并证明 0.25B 量级模型也能通过 curriculum、task balancing 和权重插值获得可用的跨模态迁移能力。它的局限也很清楚：复杂指令跟随、零样本任务和只训练线性连接的性能仍弱于更大模型，因此它更像轻量通用多模态框架的工程可行性验证。

#### 🧪 练习题

```yaml
question: "UnIVAL 使用 Multimodal Curriculum Learning 的主要目的是什么？"
options:
  - "把所有任务改成分类任务"
  - "逐步加入新模态和任务，降低一次性混训的计算/显存成本并提供更好的初始化"
  - "只训练音频模型，放弃图像和视频"
  - "用多个任务特定 head 替换共享 decoder"
answer: 1
explain: "UnIVAL 先训练图文能力，再加入视频文本任务，逐步扩展模态覆盖；这种课程式训练在性能接近的同时减少训练时间和显存需求。"
```
