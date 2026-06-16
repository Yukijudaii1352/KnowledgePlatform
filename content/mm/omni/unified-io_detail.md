### Unified-IO
```yaml
id: unified-io
name: Unified-IO
full_name: 统一输入输出模型 (Unified-IO)
year: '2022'
org: Allen AI
paper_url: https://arxiv.org/abs/2206.08916
category: unified_seq2seq
parent: ofa
motivation: 首个处理95种视觉语言任务
topic_id: omni
yaml_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/omni.yaml
output_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/omni/unified-io_detail.md
```

#### 📝 一句话总结
Unified-IO 将文本、图像、深度图、分割 mask、关键点、框等输入输出全部离散化为统一词表 token，并用单一 T5 式 encoder-decoder 处理 95 个视觉、语言和多模态数据集，解决了通用视觉语言模型仍依赖任务或模态专用分支的问题。

#### 🎯 核心要点
- 单一架构：基于 T5 的 Transformer encoder-decoder，无任务专用 head、无模态专用输出分支。
- 统一表示：文本用 SentencePiece，图像与密集结构用 VQ-GAN token，框和关键点用 1000 个离散坐标 token。
- 密集输出转图像：深度、法线、分割等 per-pixel 输出先转成 RGB/灰度图，再通过 VQ-GAN 变为离散 token。
- 两阶段训练：先做文本 span denoising 与 masked image denoising，再在 95 个数据集、62 个公开数据源上大规模多任务训练。
- 训练混合策略：任务组近似均衡采样，图像生成与密集标注单独调权，组内按数据集规模平方根采样以照顾小任务。
- 泛化目标：不做任务专用 fine-tuning，直接覆盖 GRIT 7 个任务，并在 16 个额外 CV/NLP benchmark 上验证。

#### 🔬 深入细节
![Unified-IO 架构示意图](https://ar5iv.labs.arxiv.org/html/2206.08916/assets/x2.png)
*图：Unified-IO 用同一个 Seq2Seq 模型处理对象分割、VQA、深度估计和目标定位等异构任务。*

```python
# Unified-IO 统一输入输出流程伪代码
for example in train_stream:
    prompt = task_to_prompt(example.task)
    input_tokens = []
    input_tokens += sentencepiece(example.text_input)
    input_tokens += patch_embed(example.image_input)
    input_tokens += coord_tokens(example.sparse_input)

    if example.output_is_dense:
        target_tokens = vqgan_encode(to_rgb_image(example.dense_target))
    elif example.output_is_sparse:
        target_tokens = coord_tokens(example.boxes_or_keypoints)
    else:
        target_tokens = sentencepiece(example.text_target)

    logits = unified_encoder_decoder(prompt, input_tokens, target_tokens[:-1])
    loss = cross_entropy(logits, target_tokens)
    update(theta, loss)
```

Unified-IO 延续 OFA 的 Seq2Seq 方向，但把“统一输入输出”的范围显著扩大到更典型的计算机视觉任务。它面对的难点是：VQA 输出文本，检测输出框，关键点输出坐标，深度估计输出连续图，语义或实例分割输出 mask，图像生成输出像素。如果每种输出都接一个 head，模型仍然只是共享 backbone，不是真正统一。Unified-IO 的做法是把这些输出全部转成 token 序列，让 decoder 始终只做离散序列生成。

密集结构的处理是核心设计。深度图被归一化为灰度图，surface normal 的 \(x/y/z\) 方向被映射到 \(r/g/b\)，分割 mask 则将实例映射为颜色图并在文本中说明颜色到类别的对应关系。随后这些图像式目标通过 VQ-GAN 编码为离散码；论文使用 \(256\times256\) 分辨率、压缩率 16、16384 大小 codebook 的 VQ-GAN，因此一个密集输出可以变成 \(16\times16=256\) 个视觉 token。

稀疏结构则用坐标 token。模型向词表加入 1000 个 location token，将归一化坐标离散化；一个点由 \(x,y\) 两个 token 表示，一个 box 由四个角点坐标 token 表示，带标签的 box 再跟随文本类别 token。于是检测、定位、姿态估计都可以写成：

$$
y=[\text{loc}_{x_1},\text{loc}_{y_1},\text{loc}_{x_2},\text{loc}_{y_2},\text{text label}]
$$

统一后的训练目标仍是自回归似然。若把文本、图像 patch、坐标和 VQ-GAN token 统一记为输入序列 \(z\)，则：

$$
\mathcal{L}_{\text{UIO}}=-\sum_{i=1}^{|y|}\log P_{\theta}(y_i\mid y_{<i},z)
$$

这个目标让所有任务共用同一 decoder softmax。词表总规模约为 49536，其中包含 32152 个语言 token、1000 个 location token 和 16384 个 vision token；因此“生成一个类别词”和“生成一个图像码”在建模形式上完全一致，只是 token 类型不同。

架构层面，Unified-IO 基本沿用 T5 encoder-decoder：encoder 接收提示、文本、图像 patch 和稀疏结构，decoder 生成目标 token。为了适配视觉输入，它将图像 reshape 为 patch 后线性投影，并扩展 T5 的相对位置表示为二维 learned relative embedding，同时加入绝对位置嵌入，因为深度、分割、定位这类任务对空间位置极敏感。

训练分两步。第一步预训练包含 text span denoising 和 masked image denoising：文本随机破坏 15% token，图像随机遮挡 75% patch，并允许另一模态作为上下文。第二步多任务训练把 95 个数据集混合进 batch。采样策略不是简单按样本量抽取，否则小任务几乎见不到；论文对任务组做近似均衡，对组内数据集按规模平方根采样，使深度估计、grounded VQA 等小任务仍能得到训练信号。

> 💡 关键：Unified-IO 的贡献在于把“任务适配”从模型结构中移出，放到输入提示、输出 token 化和数据混合策略中；模型本身始终是一个普通的 Seq2Seq Transformer。
