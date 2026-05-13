### VideoLoom

```yaml
id: videoloom
name: VideoLoom
full_name: "VideoLoom: 视频时空联合理解 (Weaving Spatial-Temporal Understanding in Video MLLMs)"
year: "2025"
org: "Shanghai AI Lab / CUHK / Fudan / NTU"
paper_url: "https://arxiv.org/abs/2601.07290"
category: "cv/visual_model"
parent: "InternVL3 + SAM2"
motivation: "将视频时间定位（When）和空间分割（Where）统一到单一多模态大模型中，实现联合时空理解"
```

#### 📝 一句话总结

VideoLoom 提出了一种基于 SlowFast 视觉 token 和 MLLM-SAM2 协同架构的统一视频时空理解框架，首次在单一模型中同时实现视频时间定位（temporal grounding）和空间分割（spatial segmentation），并构建了专用数据集 LoomData 和评测基准 LoomBench 来推动联合时空理解研究。

#### 🎯 核心要点

- **统一时空架构**：将 InternVL3（MLLM）与 SAM2（分割基础模型）结合，通过特殊 `[SEG]` token 桥接语言理解和像素级分割
- **SlowFast 视觉 token 设计**：Slow tokens（5帧×256 tokens）保留高分辨率空间细节用于分割，Fast tokens（128帧×16 tokens）压缩时序信息用于时间定位
- **LoomData-8.7K 数据集**：基于 ActivityNet 构建的联合时空标注数据，包含时间边界 + 空间 mask 的配对标注，通过 4 阶段自动化流水线生成
- **LoomBench 评测基准**：包含 When（时间定位）、Where（空间分割）、Combined（联合时空）三类问答，评估模型的联合时空理解能力
- **训练策略**：LoRA 微调 LLM + 全量训练 mask decoder，冻结视觉编码器和 SAM2 image encoder
- **SOTA 性能**：ReVOS 上 63.1 J&F，Charades-STA 上 48.3 R1@0.7，同时在通用视频理解基准上保持竞争力

#### 🔬 深入细节

![VideoLoom 整体架构图](https://ar5iv.labs.arxiv.org/html/2601.07290/assets/x2.png)
*图：VideoLoom 架构总览。左侧为 SlowFast 视觉 token 编码，右侧为 MLLM 与 SAM2 的协同推理流程。*

##### 算法伪代码

```python
# VideoLoom 推理流程伪代码
def videoloom_forward(video, text_query):
    # Step 1: SlowFast Visual Token Encoding
    frames = sample_frames(video, n_fast=128, n_slow=5)
    
    # Fast tokens: 全局时序理解 (128帧, 每帧16 tokens)
    fast_tokens = vision_encoder(frames[:128])  # [128, 256, D]
    fast_tokens = pixel_shuffle_downsample(fast_tokens)  # [128, 16, D]
    
    # Slow tokens: 高分辨率空间细节 (5帧, 每帧256 tokens)
    slow_tokens = vision_encoder(frames[:5])  # [5, 256, D]
    
    # Step 2: MLLM Reasoning
    input_tokens = concat([fast_tokens, slow_tokens, tokenize(text_query)])
    output = mllm(input_tokens)  # InternVL3-8B with LoRA
    
    # Step 3: Parse output
    if task == "temporal_grounding":
        timestamps = extract_timestamps(output)  # <ts>start</ts><ts>end</ts>
        return timestamps
    elif task == "spatial_segmentation":
        seg_token = extract_seg_token(output)  # [SEG] hidden state
        # Step 4: SAM2 Mask Decoding
        seg_embedding = mlp_projection(seg_token)  # project to SAM2 space
        masks = sam2_mask_decoder(
            image_embeddings=sam2_encoder(frames),
            prompt_embedding=seg_embedding
        )
        masks = propagate_masks(masks, video)  # SAM2 memory-based propagation
        return masks
    elif task == "combined":
        timestamps = extract_timestamps(output)
        seg_token = extract_seg_token(output)
        masks = sam2_decode_and_propagate(seg_token, frames[timestamps])
        return timestamps, masks
```

##### 动机与背景

现有视频理解方法通常将**时间理解**（如视频时间定位 VTG、视频高光检测 VHD）和**空间理解**（如指代视频目标分割 RVOS）作为独立任务处理。然而，人类对视频的理解天然是时空交织的——例如"当运动员起跳时，他的位置在哪里？"需要同时定位时间段和空间区域。

传统方法的缺陷：
1. **分离式架构**：时间定位模型无法输出像素级分割，分割模型无法理解长视频时序
2. **token 效率矛盾**：高分辨率 token 适合分割但帧数受限；低分辨率 token 适合长视频但丢失空间细节
3. **缺乏联合标注数据**：现有数据集要么只有时间标注，要么只有空间标注

##### 核心机制：SlowFast 视觉 Token

SlowFast 设计灵感来自 SlowFast Networks，但应用于 token 层面：

$$\text{Visual Input} = \underbrace{[\mathbf{F}_1^{fast}, ..., \mathbf{F}_{128}^{fast}]}_{\text{128帧} \times \text{16 tokens}} \oplus \underbrace{[\mathbf{S}_1^{slow}, ..., \mathbf{S}_5^{slow}]}_{\text{5帧} \times \text{256 tokens}}$$

- **Fast pathway**：对 128 帧视频进行 pixel shuffle 下采样（将 \(16 \times 16\) 的 token grid 压缩为 \(4 \times 4 = 16\) tokens），总共 \(128 \times 16 = 2048\) tokens，捕获长程时序动态
- **Slow pathway**：均匀采样 5 帧保持原始 \(16 \times 16 = 256\) tokens 分辨率，总共 \(5 \times 256 = 1280\) tokens，保留精细空间信息用于分割

> 💡 关键：SlowFast 设计使得单一模型同时拥有"看得远"（128帧时序覆盖）和"看得清"（高分辨率空间细节）的能力，总 token 数仅 3328，计算可控。

##### MLLM-SAM2 协同机制

VideoLoom 通过特殊的 `[SEG]` token 实现语言推理到像素级分割的桥接：

1. **MLLM 推理阶段**：模型在文本输出中生成 `[SEG]` token，其隐藏状态编码了目标对象的语义信息
2. **投影层**：通过 MLP 将 `[SEG]` token 的隐藏状态投影到 SAM2 的 prompt embedding 空间
3. **SAM2 解码**：将投影后的 embedding 作为 prompt 输入 SAM2 的 mask decoder，生成参考帧上的分割 mask
4. **时序传播**：利用 SAM2 的 memory-based propagation 机制将 mask 传播到整个视频

损失函数设计：

$$\mathcal{L} = \mathcal{L}_{CE}(\text{text output}) + \lambda_1 \mathcal{L}_{BCE}(\text{mask}) + \lambda_2 \mathcal{L}_{Dice}(\text{mask})$$

其中 \(\lambda_1 = 2.0\)，\(\lambda_2 = 0.5\)。BCE loss 处理像素级分类，Dice loss 处理前景/背景不平衡问题。

##### LoomData 构建流程

![LoomData 标注流水线](https://ar5iv.labs.arxiv.org/html/2601.07290/assets/x1.png)
*图：LoomData 4 阶段自动化标注流水线*

1. **Shot Partition**：利用 PySceneDetect 将视频切分为镜头片段
2. **Temporal Annotation**：基于 ActivityNet 已有时间标注，对齐到镜头边界
3. **Spatial Annotation**：使用 Grounding DINO + SAM2 生成空间 mask，并通过 GPT-4o 验证质量
4. **QA Generation**：生成 When/Where/Combined 三类问答对

##### 与传统方法的对比

| 维度 | 传统时间定位模型 | 传统分割模型 | VideoLoom |
|------|-----------------|-------------|-----------|
| 时间理解 | ✅ | ❌ | ✅ |
| 空间分割 | ❌ | ✅ | ✅ |
| 联合时空 | ❌ | ❌ | ✅ |
| 长视频支持 | 有限 | 有限 | 128帧 |
| 统一架构 | — | — | 单一模型端到端 |

##### 关键实验结果

- **时间定位**：Charades-STA 上 R1@0.5=68.3, R1@0.7=48.3；ActivityNet-Captions 上 R1@0.5=56.2
- **空间分割**：MeVIS 上 J&F=57.2，ReVOS 上 J&F=63.1（SOTA）
- **联合理解**：LoomBench 上 tIoU=41.6，J&F_bi-fore=49.1
- **消融实验**：SlowFast 联合训练比单独 Slow/Fast 分别提升 +4.8 mIoU（时间）和 +3.2 J&F（空间）；LoomData 带来 +5.0 J&F_bi-fore 提升；模型从 4B→8B 持续获益

> ⚠️ 注意：VideoLoom 的核心创新不在于单项任务的绝对性能（某些专用模型可能更强），而在于首次证明了单一模型可以同时高质量地完成时间定位和空间分割，且两者相互促进。

#### 🧪 练习题

```yaml
question: "VideoLoom 中 SlowFast 视觉 token 设计的核心目的是什么？"
options:
  - "减少模型参数量以加速推理"
  - "在有限 token 预算下同时兼顾长程时序覆盖和高分辨率空间细节"
  - "替代 SAM2 的图像编码器以降低计算成本"
  - "使模型能够处理不同分辨率的输入视频"
answer: 1
explain: "Fast tokens 用少量 token 覆盖 128 帧实现时序理解，Slow tokens 用高分辨率 token 保留 5 帧空间细节用于分割，两者互补实现统一时空理解。"
```