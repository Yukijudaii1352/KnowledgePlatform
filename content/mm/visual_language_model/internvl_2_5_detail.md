### InternVL 2.5

```yaml
id: internvl_2_5
name: InternVL 2.5
year: '2024'
category: connector
institution: 上海AI Lab
paper: arXiv
motivation: 动态高分辨率+Pixel Unshuffle
parent: —
description: 采用InternViT-6B视觉端，通过像素逆置减少Token数量，首个在MMMU上突破70分的开源模型。
topic_id: visual_language_model
yaml_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/visual_language_model.yaml
output_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/visual_language_model/internvl_2_5_detail.md
```

#### 📝 一句话总结
InternVL 2.5 沿用 ViT-MLP-LLM 框架，但用 InternViT-6B/300M、动态高分辨率切片和 Pixel Unshuffle 把每个 448×448 tile 的视觉 token 从 1024 压到 256，解决高分辨率视觉输入与 LLM 上下文成本之间的矛盾，并成为首个 MMMU 验证集超过 70 分的开源 MLLM。

#### 🎯 核心要点
- ViT-MLP-LLM 架构：以 InternViT-6B 或 InternViT-300M 为视觉编码器，通过 2 层 MLP projector 连接 InternLM 2.5/Qwen 2.5 等 LLM
- Pixel Unshuffle 压缩：448×448 tile 产生的 32×32=1024 个视觉 token 被重排为 16×16=256 个 token，token 数降为 1/4
- 动态高分辨率：按输入宽高比选择最接近的 tile 网格，resize 后切成多个 448×448 tile，并可追加 448×448 thumbnail 全局视图
- 多数据类型统一：单图、多图、视频分别采用不同 tile budget 分配方式，统一用 `<img>`、`</img>`、`Image-i`、`Frame-i` 等格式组织
- 三阶段训练：Stage 1 MLP warmup，Stage 1.5 可选 ViT incremental learning，Stage 2 full model instruction tuning
- 渐进式扩展：先用较小 LLM 优化 InternViT，再把视觉端迁移到更大 LLM，减少大模型重复训练成本
- 测试时扩展：在 MMMU 等困难任务上结合 CoT、majority voting 提升结果，InternVL2.5-78B CoT 达到 70+ MMMU 验证集表现

#### 🔬 深入细节
##### 核心示意图

![InternVL 2.5 总体架构](https://arxiv.org/html/2412.05271v1/x2.png)
*图：InternVL 2.5 论文 Figure 2。模型保留 ViT-MLP-LLM 范式，视觉端输出经 Pixel Unshuffle 降低 token 数，再通过 MLP projector 接入语言模型。*

公开来源：arXiv HTML `https://arxiv.org/html/2412.05271v1`，论文页 `https://arxiv.org/abs/2412.05271`，Hugging Face 项目页 `https://huggingface.co/OpenGVLab`。

##### 核心流程代码

```python
# InternVL 2.5 dynamic high-resolution + pixel unshuffle pipeline

TILE = 448

def build_target_ratios(n_min, n_max, n):
    ratios = []
    for i in range(1, n + 1):
        for j in range(1, n + 1):
            if n_min <= i * j <= n_max:
                ratios.append((i, j, i / j))
    return ratios

def dynamic_tiles(image, n_min=1, n_max=12, n=12, add_thumbnail=True):
    W, H = image.width, image.height
    aspect = W / H
    i_best, j_best, _ = min(
        build_target_ratios(n_min, n_max, n),
        key=lambda x: abs(aspect - x[2])
    )
    resized = resize(image, width=TILE * i_best, height=TILE * j_best)
    tiles = split_into_tiles(resized, tile_size=TILE)
    if add_thumbnail and len(tiles) > 1:
        tiles.append(resize(image, TILE, TILE))
    return tiles

def pixel_unshuffle_tokens(vit_feature_map, factor=2):
    # vit_feature_map: [32, 32, C] from one 448x448 tile with patch size 14
    # output: [16, 16, 4C], then flatten to 256 tokens
    x = rearrange(
        vit_feature_map,
        "(h r) (w s) c -> h w (r s c)",
        r=factor,
        s=factor
    )
    return flatten(linear_project(x))  # [256, D_llm]

def internvl_forward(sample, internvit, mlp, llm):
    visual_tokens = []
    for tile in dynamic_tiles(sample.image):
        fmap = internvit(tile)
        visual_tokens.extend(mlp(pixel_unshuffle_tokens(fmap)))
    prompt = chatml_wrap("<img>", visual_tokens, "</img>", sample.question)
    return llm.generate(prompt)
```

##### 关键公式

动态分辨率首先构造候选宽高比集合：

$$
\mathcal{R}=
\left\{i/j \mid 1\le i,j\le n,\ i\times j\in[n_{\min},n_{\max}]\right\}
$$

给定原图 \(W\times H\)，选择最接近原图宽高比的目标：

$$
r_{\text{best}}=
\arg\min_{r_{\text{target}}\in\mathcal{R}}
\left|\frac{W}{H}-r_{\text{target}}\right|
$$

若 \(S=448\)，对应网格为 \(i_{\text{best}}\times j_{\text{best}}\)，resize 后尺寸为：

$$
W_{\text{new}}=S\cdot i_{\text{best}},\quad
H_{\text{new}}=S\cdot j_{\text{best}}
$$

Pixel Unshuffle 的 token 压缩可写成：

$$
F\in\mathbb{R}^{32\times32\times C}
\rightarrow
\text{Unshuffle}_{2}(F)\in\mathbb{R}^{16\times16\times4C}
\rightarrow
256\ \text{tokens}
$$

这一步把空间分辨率折叠进通道维，使每个 tile 的 token 数从 \(1024\) 降为 \(256\)。

##### 方法解读

InternVL 2.5 的基本架构并不追求花哨的跨注意力模块，而是继续采用被大量开源 MLLM 验证过的 ViT-MLP-LLM 范式。视觉端可以是 InternViT-6B，也可以是较小的 InternViT-300M；中间使用随机初始化的 2 层 MLP projector；语言端接入 InternLM 2.5 或 Qwen 2.5 等不同规模 LLM。论文强调这种架构与 InternVL 1.5/2.0 保持一致，真正的提升来自视觉端持续增量训练、动态高分辨率、数据质量和测试时推理策略的共同扩展。

Pixel Unshuffle 是 InternVL 处理高分辨率成本的核心。一个 448×448 tile 经过 patch size 14 的 ViT 后会得到 \(32\times32=1024\) 个 patch token；如果多 tile 直接送入 LLM，token 成本会迅速爆炸。Pixel Unshuffle 用因子 2 把相邻 \(2\times2\) 空间位置重排到通道维，得到 \(16\times16\) 个位置，每个位置通道数变成 \(4C\)，再由线性/MLP 投影到 LLM 维度。它牺牲一部分显式空间粒度，但保留局部邻域信息，换来 4 倍 token 压缩。

动态高分辨率负责决定“看哪些 tile”。InternVL 不是把所有图像都压成固定方图，而是先根据原图宽高比在候选集合 \(\mathcal{R}\) 中找最接近的网格，再把图像 resize 到 \(448i\times448j\)，切成多个 448×448 tile。若 tile 数大于 1，还会追加一个 448×448 thumbnail 作为全局视图。这个设计和 LLaVA-NeXT 的全局+局部思想相近，但 InternVL 用更大的 tile 和 Pixel Unshuffle 控制 token 预算。

InternVL 2.5 还把动态高分辨率扩展到多图和视频。单图样本会尽量把 \(n_{\max}\) 分配给一张图，以获得最高分辨率；多图样本会把 tile budget 按图片数分配，并用 `Image-1` 等辅助标签区分；视频样本则通常把 \(n_{\max}=1\)，每帧 resize 到 448×448，因为 32 或 64 帧已经会产生 8192 或 16384 个视觉 token。这个数据格式设计让单图、多图、视频都能复用同一个 LLM 接口。

训练流程分三步。Stage 1 只训练 MLP projector，冻结 InternViT 和 LLM，用 next-token prediction 让视觉特征先进入语言空间；Stage 1.5 可选地解冻视觉编码器和 MLP，用同样的预训练数据增强 InternViT，重点补强多语言 OCR、数学图表等 web-scale CLIP 数据不充分覆盖的领域；Stage 2 全模型 instruction tuning，让 ViT、MLP、LLM 一起适配高质量多模态指令。论文特别强调 Stage 2 数据质量，因为 LLM 已经可训练，少量噪声就可能诱发重复输出等异常行为。

渐进式扩展是 InternVL 2.5 的工程亮点。作者观察到，即便 InternViT 和某个较小 LLM 通过 NTP 联合训练，视觉特征仍能迁移给其他 LLM；因此可以先用较小 LLM 优化视觉端，再把训练好的 InternViT 接到 72B/78B 等更大语言模型，跳过昂贵的重复视觉增量学习。论文给出的对比是 Qwen2-VL 累计处理约 1.4T token，而 InternVL2.5-78B 约 120B token，体现了组件复用对训练成本的意义。

性能提升不只来自模型训练，也来自测试时扩展。InternVL2.5-78B 在 MMMU 直接回答和 CoT 设置中取更高分，CoT 可带来明显提升；进一步的 majority voting 也能改善困难多模态问答。这里的启发是：高分辨率视觉输入负责提供可见证据，Pixel Unshuffle 控制 token 成本，CoT/投票把推理时间换成更稳定的答案，三者共同支撑了其 MMMU 70+ 的开源结果。

#### 🧪 练习题

```yaml
question: "InternVL 2.5 中 Pixel Unshuffle 的主要作用是什么？"
options:
  - "把 448×448 图像放大到更高分辨率"
  - "将 32×32 视觉特征重排为 16×16 特征，把每个 tile 的 token 数降到 1/4"
  - "替代语言模型中的自注意力层"
  - "把多图样本随机丢弃到单图样本"
answer: 1
explain: "Pixel Unshuffle 将局部空间邻域折叠到通道维，保留局部信息的同时显著降低送入 LLM 的视觉 token 数。"
```
