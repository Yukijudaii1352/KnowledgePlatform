### SAM 2

```yaml
id: sam2
name: SAM 2
full_name: "Segment Anything in Images and Videos (SAM 2)"
year: "2024"
org: "Meta FAIR"
paper_url: "https://arxiv.org/abs/2408.00714"
category: "visual_model"
parent: "SAM"
motivation: "将 SAM 的可提示分割能力从静态图像扩展到视频领域，通过流式记忆架构实现实时视频对象分割"
```

#### 📝 一句话总结

SAM 2 提出了统一的可提示视觉分割（Promptable Visual Segmentation）模型，通过在 SAM 架构上引入流式记忆机制（Memory Attention + Memory Bank），将图像分割能力自然扩展到视频领域，同时构建了迄今最大的视频分割数据集 SA-V（50.9K 视频、642.6K masklets），在 17 个视频分割基准上取得 SOTA，且图像分割速度比 SAM 快 6 倍、精度更高。

#### 🎯 核心要点

- **统一任务定义**：提出 Promptable Visual Segmentation (PVS) 任务，将图像分割（SA）和视频对象分割（VOS）统一为同一框架，支持在视频任意帧上以点击、框、掩码等方式交互式提示
- **流式架构设计**：基于 SAM 扩展，新增 Memory Attention 模块（L 层 Transformer，交叉注意力融合历史记忆）、Memory Encoder（编码预测掩码与图像特征）和 Memory Bank（FIFO 存储最近 N=6 帧 + M 个提示帧 + 对象指针）
- **图像编码器升级**：将 SAM 的 ViT 替换为 Hiera（MAE 预训练的层次化 ViT），支持多尺度特征，速度更快
- **遮挡感知**：在 Mask Decoder 中新增 occlusion prediction head，输出遮挡分数，当目标被遮挡时抑制低质量掩码进入记忆库
- **三阶段数据引擎**：Phase 1（纯 SAM 逐帧标注，37.8s/帧）→ Phase 2（SAM + SAM 2 辅助，7.4s/帧）→ Phase 3（SAM 2 主导 + 人工精修，4.5s/帧），标注效率提升 8.4 倍
- **SA-V 数据集**：50.9K 视频、642.6K masklets、35.5M 掩码，规模是现有最大 VOS 数据集的 53 倍，覆盖 47 个国家的多样化场景
- **全面 SOTA**：在 17 个 VOS 基准上全面超越先前方法；交互式视频分割比 SAM+XMem++/Cutie 组合少 3 倍交互次数；图像分割比 SAM 快 6 倍且精度更高（SA-23 上 1-click mIoU: 61.4 vs 58.1）

#### 🔬 深入细节

##### 模型架构总览

![SAM 2 模型架构图](https://raw.githubusercontent.com/facebookresearch/sam2/main/assets/model_diagram.png?raw=true)
*图：SAM 2 整体架构。图像编码器逐帧提取特征，Memory Attention 模块融合历史记忆，Prompt/Mask Decoder 生成分割掩码，Memory Encoder 将结果写入 Memory Bank 供后续帧使用。*

SAM 2 的核心设计理念是：**将视频视为"带记忆的图像序列"**。当模型处理单帧图像时，它退化为类 SAM 的交互式分割器；当处理视频时，Memory Attention 模块通过交叉注意力机制融合来自 Memory Bank 的时序信息，实现跨帧追踪。

##### 核心组件详解

**1. Image Encoder（图像编码器）**

SAM 2 将原始 SAM 的 ViT-H 编码器替换为 **Hiera**（Ryali et al., 2023），一种通过 MAE（Masked Autoencoder）预训练的层次化视觉 Transformer。Hiera 的关键优势在于：
- **多尺度特征提取**：类似 FPN 的层次结构，在不同分辨率下提取特征
- **计算效率**：去除了 ViT 中不必要的组件，推理速度显著提升
- **实时处理**：图像编码器对整个视频的每一帧运行（非条件化于交互），编码结果可被后续所有交互复用

> 💡 关键：图像编码器是**无条件的**（不依赖提示），因此对于一段视频只需编码一次，后续的多次交互可以复用特征，这是实现实时交互的关键。

**2. Memory Attention（记忆注意力）**

Memory Attention 是 SAM 2 相对于 SAM 最核心的新增模块，由 **L 层堆叠的 Transformer 块**组成。每层包含：
- **Self-Attention**：当前帧特征的自注意力
- **Cross-Attention to Memories**：当前帧特征对 Memory Bank 中存储的记忆进行交叉注意力

其计算过程可以表示为：

$$\text{MemAttn}(Q, K_{\text{mem}}, V_{\text{mem}}) = \text{Softmax}\left(\frac{Q \cdot K_{\text{mem}}^T}{\sqrt{d}}\right) V_{\text{mem}}$$

其中 \(Q\) 来自当前帧的图像特征，\(K_{\text{mem}}\) 和 \(V_{\text{mem}}\) 来自 Memory Bank 中存储的历史帧空间特征和对象指针。

经过 Memory Attention 处理后的特征被称为 **conditioned features**，它们融合了当前帧的视觉信息和历史帧的时序上下文。

**3. Prompt Encoder & Mask Decoder（提示编码器与掩码解码器）**

基本沿用 SAM 的设计：
- **Prompt Encoder**：将点击（正/负）、边界框、掩码等提示编码为 token
- **Mask Decoder**：轻量级 Transformer 解码器，融合 conditioned features 和 prompt tokens，输出分割掩码

**关键改进 — 遮挡预测头（Occlusion Head）**：

$$\text{occ\_score} = \sigma(W_{\text{occ}} \cdot h_{\text{IoU}} + b_{\text{occ}})$$

在视频场景中，目标物体可能被遮挡或离开画面。SAM 2 在 IoU 预测头旁新增了一个 occlusion prediction head，输出当前帧目标是否被遮挡的概率。当遮挡分数较高时：
- 该帧的预测掩码**不会被添加到 Memory Bank**，避免低质量记忆污染后续预测
- 输出的掩码可能为空（表示目标不可见）

**4. Memory Encoder（记忆编码器）**

Memory Encoder 将当前帧的预测结果编码为记忆表示，供后续帧使用：

$$\text{Memory}_t = \text{Conv}(\text{ImageFeature}_t) + \text{Conv}(\text{Mask}_t)$$

具体来说，它将 Image Encoder 输出的**未经条件化的特征图**（不含提示信息）与当前帧预测掩码通过轻量级卷积层融合，生成空间维度的记忆特征。

**5. Memory Bank（记忆库）**

Memory Bank 是 SAM 2 的"时序记忆系统"，存储三类信息：

| 记忆类型 | 数量 | 来源 | 说明 |
|---------|------|------|------|
| Recent Memories | N=6 | 最近 N 帧的预测 | FIFO 队列，保持时序局部性 |
| Prompted Memories | M（1-2） | 用户交互帧 | 高质量锚点，长期保留 |
| Object Pointers | 每帧 1 个 | Mask Decoder 输出 token | 高维语义向量，编码目标外观 |

> ⚠️ 注意：Object Pointers 是从 Mask Decoder 的输出 token 中提取的高维向量（类似 SAM 中的 IoU token），它们编码了目标在每帧中的高层语义信息，作为 Memory Attention 中交叉注意力的额外 key-value 对参与计算。

##### 训练策略

SAM 2 的训练采用**模拟交互式提示**的策略：

```python
# SAM 2 训练伪代码
for video_clip in training_data:  # 采样 8 帧的视频片段
    # 随机选择 1-2 帧作为"交互帧"
    prompted_frames = random_select(video_clip, k=2)
    
    for frame_t in video_clip:
        # 1. Image Encoder 提取特征
        features_t = image_encoder(frame_t)
        
        # 2. Memory Attention 融合历史记忆
        cond_features_t = memory_attention(features_t, memory_bank)
        
        if frame_t in prompted_frames:
            # 3a. 交互帧：模拟用户点击（基于GT与预测的误差区域采样）
            prompt = simulate_click(gt_mask, pred_mask)
            mask_t = mask_decoder(cond_features_t, prompt)
        else:
            # 3b. 非交互帧：无提示，纯传播
            mask_t = mask_decoder(cond_features_t, no_prompt)
        
        # 4. 计算损失（Focal + Dice Loss）
        loss += focal_loss(mask_t, gt_t) + dice_loss(mask_t, gt_t)
        
        # 5. 更新 Memory Bank
        if not is_occluded(mask_t):
            memory_bank.update(memory_encoder(features_t, mask_t))
```

训练时在 8 帧序列上展开，最多模拟 2 次交互式校正（iterative refinement），使用 Focal Loss + Dice Loss 监督。

##### 数据引擎与 SA-V 数据集

SAM 2 的数据引擎采用**模型-标注员协同的三阶段迭代**策略，逐步提升标注效率：

| 阶段 | 工具 | 每帧耗时 | 加速比 | 说明 |
|------|------|---------|--------|------|
| Phase 1 | SAM（逐帧） | 37.8s | 1× | 使用 SAM 在每帧上独立标注，无时序传播 |
| Phase 2 | SAM + SAM 2 Mask | 7.4s | 5.1× | SAM 2 提供初始掩码传播，标注员用 SAM 精修 |
| Phase 3 | SAM 2 完整版 | 4.5s | 8.4× | SAM 2 主导分割，标注员仅需少量点击校正 |

每个阶段结束后，收集的数据用于重新训练 SAM 2 模型，形成数据飞轮效应。此外，还通过**自动 masklet 生成**进一步扩充数据：对未标注的视频帧运行 SAM 生成掩码提议，再用 SAM 2 传播到全视频，经过质量过滤后加入训练集。

最终构建的 **SA-V 数据集**：
- **50.9K 视频**，平均 14 秒，来自 47 个国家
- **642.6K masklets**（视频级对象轨迹）
- **35.5M 掩码**（帧级），是现有最大 VOS 数据集的 53 倍
- 涵盖整体对象和部件级标注，场景多样性远超 DAVIS/YouTube-VOS 等传统数据集

##### 与 SAM 的关键区别

| 特性 | SAM | SAM 2 |
|------|-----|-------|
| 输入 | 单张图像 | 图像或视频（流式处理） |
| 编码器 | ViT-H（MAE） | Hiera（MAE，层次化） |
| 时序建模 | 无 | Memory Attention + Memory Bank |
| 遮挡处理 | 无 | Occlusion Head 抑制低质量记忆 |
| 推理速度 | 1× | ~6× 更快（图像任务） |
| 训练数据 | SA-1B（11M 图像） | SA-1B + SA-V（50.9K 视频）+ VOS 数据集 |

##### 实验结果亮点

**视频分割（交互式）**：在 9 个零样本视频数据集上，SAM 2 仅需 **3 次点击**即可达到 SAM+XMem++/Cutie 组合 **9 次点击**的效果，交互效率提升 3 倍。

**VOS 基准（首帧掩码）**：

| 方法 | MOSE \(\mathcal{J\&F}\) | DAVIS \(\mathcal{J\&F}\) | SA-V val \(\mathcal{J\&F}\) | SA-V test \(\mathcal{J\&F}\) |
|------|------|-------|---------|----------|
| Cutie-base+ | 71.7 | 88.1 | 61.3 | 62.8 |
| SAM 2 (Hiera-B+) | 75.8 | 90.9 | 73.6 | 74.1 |
| **SAM 2 (Hiera-L)** | **77.2** | **91.6** | **75.6** | **77.6** |

**图像分割**：在 SA-23 基准上，SAM 2 (Hiera-L) 1-click mIoU 达到 **61.4**，优于 SAM (ViT-H) 的 58.1，同时推理速度快 **6 倍**。

**数据消融**：
- 仅用 VOS 数据训练时，零样本性能仅 59.7 \(\mathcal{J\&F}\)
- 加入 SA-V 数据引擎数据后，零样本性能提升 **+12.1%** 至 71.8
- 混合所有数据（VOS + SA-1B + SA-V）获得最佳综合性能

#### 🧪 练习题

```yaml
question: "SAM 2 的 Memory Bank 中不包含以下哪种类型的记忆？"
options:
  - "最近 N 帧的空间记忆特征（Recent Memories）"
  - "用户交互帧的记忆特征（Prompted Memories）"
  - "从 Mask Decoder 输出 token 提取的对象指针（Object Pointers）"
  - "Image Encoder 的原始多尺度特征图（Raw Feature Maps）"
answer: 3
explain: "Memory Bank 存储三类信息：Recent Memories（最近 N 帧经 Memory Encoder 编码的特征）、Prompted Memories（用户交互帧的编码特征）和 Object Pointers（Mask Decoder 输出的高维语义向量）。Image Encoder 的原始特征图不直接存入 Memory Bank，而是经过 Memory Encoder 处理后才写入。"
```