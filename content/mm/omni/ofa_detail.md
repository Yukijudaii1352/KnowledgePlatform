### OFA
```yaml
id: ofa
name: OFA
full_name: 统一架构模型 (One For All)
year: '2022'
org: 阿里达摩院
paper_url: https://arxiv.org/abs/2202.03052
category: unified_seq2seq
parent: —
motivation: 架构/模态/任务三统一的Seq2Seq
topic_id: omni
yaml_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/omni.yaml
output_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/omni/ofa_detail.md
```

#### 📝 一句话总结
OFA 提出了一个指令驱动的统一 Seq2Seq 多模态预训练框架，把视觉、语言、跨模态理解与生成任务都改写成“给定输入与任务指令，生成目标 token 序列”的问题，解决了传统多模态模型依赖任务专用头和模态专用适配器的问题。

#### 🎯 核心要点
- 统一架构：采用 Transformer encoder-decoder，把预训练、微调和零样本推理都放入同一个 Seq2Seq 生成框架。
- 统一 I/O：文本使用 BPE token，图像输出使用离散图像码，目标框使用离散位置 token，所有输出共享同一词表。
- 统一任务：跨模态任务包含 visual grounding、grounded captioning、image-text matching、image captioning、VQA。
- 统一单模态学习：视觉侧使用 image infilling 与 object detection，语言侧使用 text infilling。
- 指令化训练：每个任务用自然语言 instruction 指定输出语义，微调时不增加任务专用层。
- 训练目标：所有任务统一为自回归交叉熵，输出可以是文本、位置序列或图像离散码。

#### 🔬 深入细节
![OFA 预训练任务示意图](https://ar5iv.labs.arxiv.org/html/2202.03052/assets/x1.png)
*图：OFA 将视觉定位、带定位描述、图文匹配、图像描述、VQA、目标检测、图像补全和文本补全统一为 Seq2Seq 预训练任务。*

```python
# OFA 统一 Seq2Seq 训练流程伪代码
for batch in mixed_pretraining_tasks:
    x = encode_input(batch.image, batch.text, batch.region)
    s = build_instruction(batch.task)          # 例如 "What does the image describe?"
    y = encode_target(batch.answer)            # 文本、位置 token 或图像离散码

    h = encoder(concat(x, s))
    logits = decoder(y_shifted_right, cross_attend=h)
    loss = cross_entropy(logits, y)
    update(theta, loss)

for request in downstream_tasks:
    x, s = format_as_instruction(request)
    y_hat = autoregressive_decode(encoder(concat(x, s)), strategy="beam_search")
```

OFA 的关键不是发明一个新的视觉骨干，而是把“任务接口”统一掉。传统 V&L 模型常见做法是：图像先经过检测器或视觉 backbone 得到区域特征，再为 VQA、检索、定位、分类等任务接不同的分类头或回归头。OFA 反过来要求所有任务都输出一串 token：VQA 输出答案文本，visual grounding 输出 \(\langle x_1,y_1,x_2,y_2\rangle\) 位置 token，图像生成输出离散图像码。这样模型看到的训练目标始终是“根据输入和指令预测下一个 token”。

输入表示也围绕这个目标设计。视觉输入 \(\mathrm{x}_v\in\mathbb{R}^{H\times W\times C}\) 经 ResNet 模块转成 patch feature；文本经 BPE 转成子词序列；图像输出被量化成稀疏离散码，例如 \(256\times256\) 图像可表示成 \(16\times16\) 的图像码序列；物体位置则将连续坐标均匀离散为 location token。最终词表同时包含 subword、image code 和 location token，使 decoder 不必切换输出头。

训练目标是标准自回归交叉熵。给定输入 \(x\)、任务指令 \(s\) 和目标序列 \(y\)，OFA 最小化：

$$
\mathcal{L}_{\text{OFA}}=-\sum_{i=1}^{|y|}\log P_{\theta}(y_i\mid y_{<i},x,s)
$$

这个公式的直觉很简单：无论目标是“yes/no”、一段 caption、一个框坐标，还是图像离散码，模型都只学习条件生成分布 \(P_\theta(y_i\mid y_{<i},x,s)\)。任务差异被前缀指令和目标 token 类型吸收，而不是被不同网络分支吸收。

在架构上，OFA 采用 encoder-decoder Transformer。encoder 对输入图像 patch、文本 token 和 instruction 建模，decoder 自回归生成目标序列，并通过 cross-attention 访问 encoder 表示。为了兼容不同模态的位置结构，OFA 使用文本与图像各自的绝对位置嵌入，并结合文本 1D relative position bias 与图像 2D relative position bias；这比只把图像 patch 当成普通一维文本 token 更适合空间任务。

预训练任务覆盖“跨模态 + 视觉单模态 + 语言单模态”。跨模态部分学习图文对齐、描述生成、问答和定位；视觉单模态的 image infilling 让模型从被遮挡图像生成中间区域的离散图像码，object detection 让模型生成对象框和类别；语言侧 text infilling 继承 BART 式去噪预训练。相比只在图文对上训练的模型，OFA 的多任务组合让同一个 decoder 同时练到理解、定位和生成能力。

> 💡 关键：OFA 的“一统”不是把所有模态压成同一种原始特征，而是把所有任务输出压成同一种可生成序列；架构统一由 Seq2Seq 保证，模态统一由离散 token 词表保证，任务统一由 instruction 保证。
