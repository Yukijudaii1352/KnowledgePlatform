### LLaVA-NeXT

```yaml
id: llava_next
name: LLaVA-NeXT
year: '2024.01'
category: connector
institution: UW-ByteDance
paper: arXiv
motivation: AnyRes动态分辨率切片
parent: llava
description: 将高分辨率图像切分为多个336x336子图并保留全局图，支持4倍像素量，显著提升OCR和文档理解能力。
topic_id: visual_language_model
yaml_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/visual_language_model.yaml
output_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/visual_language_model/llava_next_detail.md
```

#### 📝 一句话总结
LLaVA-NeXT 在 LLaVA-1.5 的 CLIP ViT + MLP connector + LLM 框架上加入 AnyRes 动态高分辨率切片，把一张高分辨率图像拆成多个 336×336 局部视图并保留全局视图，解决低分辨率输入导致 OCR、文档、图表细节丢失的问题。

#### 🎯 核心要点
- AnyRes 切片：支持 \(\{2\times2, 1\times\{2,3,4\}, \{2,3,4\}\times1\}\) 网格，覆盖方图、竖长图和横长图
- 4 倍像素量：典型输入从 LLaVA-1.5 的 336×336 扩展到 672×672、336×1344、1344×336
- 全局 + 局部表示：保留一张下采样全局图作为上下文，再拼接高分辨率局部 crop 的视觉 token
- 架构保持轻量：继续使用 303.5M CLIP ViT-L/336px 视觉编码器、MLP connector 和不同规模 LLM
- 数据混合增强：加入高质量用户指令数据、LAION-GPT-V/ShareGPT-4V 类数据、DocVQA、SynDog-EN、ChartQA、DVQA、AI2D 等文档/图表数据
- 两阶段训练：Stage 1 用 558K 数据训练 connector，Stage 2 用 760K 数据全模型微调，总样本约 1.318M
- 工程可训练：官方模型卡给出 7B/13B/34B 训练成本分别约 8×20、16×24、32×30 GPU-hours

#### 🔬 深入细节
##### 核心示意图

![LLaVA-NeXT AnyRes 动态高分辨率切片](https://llava-vl.github.io/blog/assets/images/llava-1-6/high_res_arch_v2.png)
*图：LLaVA-NeXT 官方博客中的动态高分辨率方案。图像先按网格切为多个 336×336 局部块，同时保留下采样全局图，再将视觉特征拼接给 LLM。*

公开来源：LLaVA-NeXT 官方博客 `https://llava-vl.github.io/blog/2024-01-30-llava-next/`，更新版 LLaVA-1.5 技术报告 `https://static.hliu.cc/files/llava/improved_llava.pdf`，项目页 `https://github.com/LLaVA-VL/LLaVA-NeXT`。

##### 核心流程代码

```python
# LLaVA-NeXT AnyRes preprocessing and visual-token assembly

GRID_CANDIDATES = [(2, 2), (1, 2), (2, 1), (1, 3), (3, 1), (1, 4), (4, 1)]
PATCH_SIZE = 336

def choose_grid(width, height):
    aspect = width / height
    return min(
        GRID_CANDIDATES,
        key=lambda g: abs(aspect - (g[1] / g[0]))  # g = (rows, cols)
    )

def anyres_encode(image, vision_encoder, mlp_projector):
    rows, cols = choose_grid(image.width, image.height)
    resized = resize(image, width=cols * PATCH_SIZE, height=rows * PATCH_SIZE)

    global_view = resize_and_pad(image, PATCH_SIZE, PATCH_SIZE)
    local_views = []
    for r in range(rows):
        for c in range(cols):
            crop = resized.crop(
                c * PATCH_SIZE, r * PATCH_SIZE,
                (c + 1) * PATCH_SIZE, (r + 1) * PATCH_SIZE
            )
            local_views.append(crop)

    visual_tokens = []
    for view in [global_view] + local_views:
        patch_tokens = vision_encoder(view)       # CLIP ViT-L/336px tokens
        visual_tokens.extend(mlp_projector(patch_tokens))
    return add_image_newline_tokens(visual_tokens, rows, cols)
```

##### 关键公式

AnyRes 的目标是从候选网格中选择最接近原图宽高比的布局：

$$
(r^\*, c^\*) =
\arg\min_{(r,c)\in\mathcal{G}}
\left|\frac{W}{H} - \frac{c}{r}\right|,
\quad
\mathcal{G}=\{(2,2),(1,2),(2,1),(1,3),(3,1),(1,4),(4,1)\}
$$

若每个 336×336 视图经 ViT 得到 \(L\) 个视觉 token，保留全局图后的总视觉 token 近似为：

$$
N_{\text{vision}}=(1+r^\*c^\*)L
$$

相比只输入一张 336×336 图像，\((2,2)\) 网格可观察到 \(4\) 倍局部像素，同时全局图缓解切片造成的上下文碎片化。

##### 方法解读

LLaVA-1.5 的成功在于架构极简：CLIP ViT-L/336px 负责视觉编码，MLP connector 把视觉特征投影到 LLM 词向量空间，Vicuna 等 LLM 负责生成。这条路线训练成本低，但 336×336 的单图输入会把文档、表格、代码截图、票据和小字压缩得很厉害。LLaVA-NeXT 的第一步不是换一个复杂 resampler，而是让同一个视觉编码器多看几块局部高分辨率图像。

AnyRes 的核心设计是“网格化而非强行拉伸”。模型根据原图宽高比选择候选网格：方形图可用 \(2\times2\)，横向长图可用 \(1\times4\)，纵向长图可用 \(4\times1\)。每个局部 crop 都被缩放到 CLIP 已支持的 336×336，因此不需要对 ViT 位置编码做高分辨率插值，也不需要重新训练一个高分辨率视觉 backbone。这解释了为什么 LLaVA-NeXT 仍然保持了 LLaVA 系列的数据效率。

全局图是这个方案里容易被忽略但很关键的一步。单纯把图像切成局部块会让 LLM 丢失整体布局，例如表格标题和具体单元格被拆到不同 crop，或者图表坐标轴和图例被分离。LLaVA-NeXT 额外拼接一张下采样全局图，让语言模型先获得整体场景和布局，再从局部块中读取细节。对 OCR 和文档理解来说，这相当于同时给模型“缩略图导航”和“局部放大镜”。

数据混合也同步服务于高分辨率输入。官方博客提到移除与 TextVQA 共享训练图片的 TextCaps，以更干净地观察 zero-shot OCR；同时加入 DocVQA、SynDog-EN、ChartQA、DVQA、AI2D 等文档、图表和示意图数据。也就是说，AnyRes 提供了读取细节的表示能力，文档/图表数据则教模型如何把这些细节转成答案、JSON、推理链或对话回复。

与 LLaVA-1.5-HD 的实验探索相比，LLaVA-NeXT 把高分辨率切片做成稳定发布配方。官方模型卡显示，7B/13B/34B 共享 303.5M 视觉编码器，但 connector 和 LLM 随规模增大；分辨率统一表示为 `336 x [(2,2), (1,2), (2,1), (1,3), (3,1), (1,4), (4,1)]`。这说明 NeXT 的升级重点不是堆视觉参数，而是在不破坏原有 LLaVA 训练范式的前提下扩大可见像素和任务覆盖。

局限也很清楚：AnyRes 会线性增加视觉 token，\((2,2)\) 加全局图约为 5 份 ViT token，长图同理；当 LLM 上下文有限时，多图或视频场景会很快吃满 token budget。此外，切片虽然避免了 ViT 位置插值，但局部块之间的空间关系需要靠拼接顺序和 newline token 间接表达，跨块细粒度定位仍不如显式二维位置建模或专门的高分辨率架构。

#### 🧪 练习题

```yaml
question: "LLaVA-NeXT AnyRes 中保留下采样全局图的主要作用是什么？"
options:
  - "替代所有局部 crop，减少视觉 token 到一个固定长度"
  - "提供整图布局和上下文，缓解局部切片带来的上下文碎片化"
  - "让模型不再需要 MLP connector"
  - "把 OCR 任务转换成纯文本任务"
answer: 1
explain: "局部 crop 提供细节，全局图提供整体布局；二者拼接后模型既能读小字，也能理解这些细节在整图中的位置。"
```
