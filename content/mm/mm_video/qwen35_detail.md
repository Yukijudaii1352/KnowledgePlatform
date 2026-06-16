### Qwen3.5：原生多模态长视频理解模型

```yaml
id: qwen35
name: Qwen3.5
full_name: 通义千问3.5视频版 (Qwen3.5-122B-A10B)
year: '2026'
org: Alibaba
paper_url: https://llm-stats.com/benchmarks/mlvu
category: frontier_2026
parent: videollama3
motivation: 原生多模态支持2小时视频
topic_id: mm_video
yaml_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/mm_video.yaml
output_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/mm_video/qwen35_detail.md
```

#### 📝 一句话总结

Qwen3.5-122B-A10B 是 Qwen 系列的原生多模态 MoE 模型，通过视觉编码器、早期多模态 token 融合、Gated DeltaNet/Attention 混合序列建模和稀疏专家路由，在 10B active 参数成本下支持长上下文图像/视频理解，并在 MLVU 长视频榜单上取得领先结果。

#### 🎯 核心要点

- 模型类型为 Causal Language Model with Vision Encoder，支持图像和视频 token 进入同一个聊天序列
- 参数规模为 122B total、10B active，采用 sparse MoE 降低每 token 前向成本
- 语言主干 48 层，布局为 \(12\times(3\times(\text{Gated DeltaNet}\rightarrow\text{MoE})+1\times(\text{Gated Attention}\rightarrow\text{MoE}))\)
- MoE 包含 256 个专家，每 token 激活 8 个 routed experts 加 1 个 shared expert
- 视觉编码器使用 16×16 patch、temporal patch size 2、spatial merge size 2，并输出到 3072 维语言隐藏空间
- 原生上下文长度 262,144 tokens，可通过 YaRN 扩展到约 1,010,000 tokens
- 阿里云 Model Studio 文档标注 Qwen3.5 系列视频输入时长为 2 秒到 2 小时，单文件公网 URL 可到 2GB，视频帧列表最多 8,000 张
- LLM Stats 的 MLVU 页面显示 Qwen3.5-122B-A10B 以 0.873/87.3% 领先该长视频理解榜单

#### 🔬 深入细节

![Qwen3.5 官方模型卡图](https://qianwen-res.oss-accelerate.aliyuncs.com/logo_qwen3.5.png)
*图：Qwen3.5 官方模型卡使用的标识。该条目没有标准论文页，方法解读基于 Qwen 官方 Hugging Face 模型卡、阿里云视觉理解文档和 MLVU 榜单。*

![Qwen3.5 官方模型卡 benchmark 图](https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen3.5/Figures/qwen3.5_middle_size_score.png)
*图：Qwen3.5 模型卡中的中等规模模型 benchmark 对比图，包含多模态和视频理解结果。*

Qwen3.5 的关键不是在 VideoLLaMA3 这种专门 video LMM 框架上继续加一个视频压缩器，而是把多模态能力做进通用基础模型。模型卡中的 chat template 明确把图像和视频都表示为特殊视觉片段：

$$
\texttt{<|vision\_start|><|image\_pad|><|vision\_end|>},\qquad
\texttt{<|vision\_start|><|video\_pad|><|vision\_end|>}
$$

这些占位符对应的视觉特征会被视觉编码器转换成与语言主干同维度的 token，再和文本 token 一起进入自回归模型。因此它不是“先做视频分类再把结果交给 LLM”的级联方案，而是早期融合的 vision-language foundation：视觉 token、视频 token 和文本指令共同参与后续推理。

视觉侧可以概括为 patch 化和合并。根据公开 config，vision encoder 的 patch size 为 16，temporal patch size 为 2，spatial merge size 为 2，输出 hidden size 为 3072。对一个抽帧后的视频片段，粗略的视觉 token 数可写成：

$$
N_{\text{video}}
\approx
\left\lceil\frac{T}{2}\right\rceil
\cdot
\left\lceil\frac{H}{16}\right\rceil
\cdot
\left\lceil\frac{W}{16}\right\rceil
\cdot \frac{1}{2^2}
$$

这里 \(T,H,W\) 分别是帧数、高度和宽度，最后的 \(1/2^2\) 来自 2×2 spatial merge 的近似压缩。这个公式解释了为什么长视频理解高度依赖抽帧率、分辨率和上下文预算：即使单帧 token 被合并，2 小时视频仍需要强长上下文主干才能承载足够时间覆盖。

```python
# Qwen3.5-122B-A10B 视频理解流程伪代码
def qwen35_video_chat(video_url, user_prompt, model):
    # 1. 解码和采样视频；实际服务可按 fps、max_pixels、max_frames 控制成本
    frames = decode_and_sample_video(video_url, fps=2.0, max_frames=8000)

    # 2. 视觉编码：时间 patch、空间 patch、空间合并后投影到语言维度
    video_patches = make_video_patches(
        frames,
        patch_size=16,
        temporal_patch_size=2,
        spatial_merge_size=2,
    )
    visual_tokens = vision_encoder(video_patches)  # hidden dim -> 3072

    # 3. 聊天模板把视频 token 和文本 token 放进同一个序列
    sequence = [
        "<|im_start|>user",
        "<|vision_start|>", visual_tokens, "<|vision_end|>",
        user_prompt,
        "<|im_end|>",
        "<|im_start|>assistant",
    ]

    # 4. 48 层混合主干：三层线性注意力后接一层全注意力，层层接 MoE
    h = embed(sequence)
    for layer_id in range(48):
        if layer_id % 4 in (0, 1, 2):
            h = gated_deltanet(h)      # 线性注意力路径，适合长上下文
        else:
            h = gated_attention(h)     # 周期性全注意力，补全全局交互
        h = sparse_moe(h, routed_experts=8, shared_experts=1)

    return autoregressive_decode(h, max_new_tokens=81920)
```

语言主干的效率来自两层设计叠加。第一层是 Gated DeltaNet 与 Gated Attention 的 3:1 混合：多数层使用线性注意力路径处理长序列，周期性插入全注意力层保持全局 token 交互。粗略地说，如果序列长度为 \(L\)，纯全注意力的代价随 \(L^2\) 增长，而线性注意力路径更接近随 \(L\) 增长；混合后可写成：

$$
C_{\text{mix}}
\approx
\frac{3}{4}C_{\text{linear}}(L)
+\frac{1}{4}C_{\text{full}}(L)
$$

这不是严格实现代价公式，但能说明设计直觉：长视频需要大量视觉 token，不能每层都做完整二次复杂度注意力；同时完全去掉全注意力又可能损失远距离细粒度依赖。

第二层是 sparse MoE。对每个 token 的隐藏状态 \(h\)，router 从 256 个 experts 中选择 8 个 routed experts，并叠加 1 个 shared expert：

$$
\operatorname{MoE}(h)
=E_{\text{shared}}(h)
+\sum_{e\in \operatorname{TopK}(g(h),8)}
\alpha_e E_e(h)
$$

其中 \(g(h)\) 是 router 打分，\(\alpha_e\) 是归一化路由权重。这样模型拥有 122B 总容量，但单 token 只激活约 10B 参数，兼顾能力和推理成本。这对视频理解很重要，因为视频输入通常比文本问答消耗更多上下文和 KV/cache 资源。

长视频能力还依赖服务侧输入策略。阿里云视觉理解文档把 Qwen3.5 系列定位为最新一代视觉理解模型，适合多模态推理、图像/视频理解和多模态 agent；在视频限制中，Qwen3.5 系列单视频文件时长范围为 2 秒到 2 小时，公网 URL 文件大小可到 2GB，作为图片列表输入时最多 8,000 张。文档同时说明视频文件的音频不会被视觉理解模型处理，因此“2 小时视频”在这里主要指视觉帧序列的长时程理解，而不是完整音视频联合理解。

MLVU 榜单的意义在于验证长视频综合能力，而不是单一动作定位。MLVU 覆盖 3 分钟到 2 小时的视频，任务包括推理、captioning、识别和摘要等 9 类；LLM Stats 页面显示 Qwen3.5-122B-A10B 得分 0.873，领先同页列出的 Qwen3.6 Plus、Qwen3.6-27B、Qwen3-VL-235B 等模型。结合模型结构看，这个结果来自三方面：视觉 token 能进入原生语言主干，长上下文机制能承载足够帧证据，MoE 让大容量模型在视频场景下仍可部署。

与 VideoLLaMA3 相比，Qwen3.5 更像“通用多模态基础设施”。VideoLLaMA3 的优势是围绕视频 token 压缩和图像中心训练做专项设计；Qwen3.5 的优势是统一模型规模、长上下文、agent 能力和视觉理解能力。对 KnowledgePipeline 中的演进关系而言，它代表从专门 Video-LLM 走向原生多模态基础模型：视频不再是附加模块，而是和文本、图像一起进入主干推理。

> ⚠️ 注意：给定 `paper_url` 是 MLVU 榜单而非 Qwen3.5 技术论文；因此这里的“方法”来自公开模型卡、config 和阿里云文档的结构信息，部分训练细节没有论文级展开。

#### 🧪 练习题

```yaml
question: "Qwen3.5-122B-A10B 为什么能在 122B 总参数规模下保持较低的单 token 前向成本？"
options:
  - "每次只使用第一帧视频，不处理完整上下文"
  - "使用 sparse MoE，每 token 只激活 8 个 routed experts 加 1 个 shared expert，约 10B active 参数"
  - "完全删除语言模型，只保留视觉编码器"
  - "把所有视频离线转成固定标签，不进行生成式推理"
answer: 1
explain: "模型总容量来自 256 个专家，但 router 每 token 只选择少量专家，并叠加共享专家，因此 active 参数远小于总参数。"
```
