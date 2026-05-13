### MedSAM2: Segment Anything in 3D Medical Images and Videos

```yaml
id: medsam2
name: MedSAM2
full_name: "MedSAM2: Segment Anything in 3D Medical Images and Videos"
year: "2025"
org: "University of Toronto / Vector Institute"
paper_url: "https://arxiv.org/abs/2504.03600"
category: "cv/medical_vision"
parent: "SAM2"
motivation: "将SAM2迁移到医学3D图像和视频分割，通过人在回路标注管线大幅降低标注成本"
```

#### 📝 一句话总结

MedSAM2 将 SAM2 的视频分割范式迁移到医学领域，将 3D 医学图像视为视频序列，通过在中间切片给定 bounding box 提示后双向传播分割，结合 45.5 万+ 3D 图像-掩码对和 7.6 万视频帧的大规模微调，实现了跨模态（CT/MRI/PET/超声/内窥镜）的高精度交互式分割，并通过人在回路标注管线将标注时间减少 85% 以上。

#### 🎯 核心要点

- **统一框架**：将 3D 医学图像（CT/MRI/PET）视为视频序列，复用 SAM2 的记忆注意力机制实现切片间传播，统一处理 3D 体积数据和真实医学视频（超声心动图、内窥镜）
- **大规模训练数据**：收集 455K+ 3D 图像-掩码对 + 76K 视频帧，涵盖 CT（363K）、MRI（77K）、PET（15K）、超声（19K）、内窥镜（56K）五种模态
- **高效交互范式**：仅需在中间切片绘制一个 bounding box，模型自动双向传播到整个 3D 体积或视频序列
- **人在回路标注管线**：3 轮迭代（标注→微调→再标注），CT 病灶标注从 525.9 秒降至 74.3 秒（减少 85%+），超声心动图从 102.3 秒/帧降至 8.4 秒/帧（减少 92%）
- **基于 SAM2.1-Tiny 微调**：~39M 参数（Hiera encoder 28M + 其余 10.9M），双学习率策略（encoder 3e-5，其余 5e-5），Focal + Dice 联合损失
- **多平台部署**：3D Slicer 插件、终端、JupyterLab、Colab、Gradio 五种部署方式
- **SOTA 性能**：CT 器官 88.84% DSC、CT 病灶 86.68%、MRI 器官 87.06%、MRI 病灶 88.37%、PET 87.22%、超声心动图左心室 96.13%、息肉视频 92.22%

#### 🔬 深入细节

##### 4.1 核心架构示意图

![MedSAM2 整体框架](https://arxiv.org/html/2504.03600v1/extracted/6336905/main-imgs/fig1.png)
*图 1：MedSAM2 整体框架。(a) 数据收集与标注流程；(b) 模型架构——将 3D 医学图像视为视频，在关键切片给定 bbox 提示后通过记忆机制双向传播；(c) 人在回路标注管线；(d) 多平台部署方案。*

![MedSAM2 分割结果](https://arxiv.org/html/2504.03600v1/extracted/6336905/main-imgs/fig2.png)
*图 2：MedSAM2 在 CT/MRI/PET/超声/内窥镜等多模态任务上的分割结果可视化。*

![人在回路标注效率](https://arxiv.org/html/2504.03600v1/extracted/6336905/main-imgs/fig3.png)
*图 3：人在回路标注管线的效率提升——经过 3 轮迭代，标注时间大幅减少。*

##### 4.2 算法伪代码

```python
# MedSAM2 推理流程伪代码
def medsam2_inference(volume_3d, bbox, mid_slice_idx):
    """
    volume_3d: 3D医学图像 [D, H, W] 或视频 [T, H, W, 3]
    bbox: 用户在中间切片上绘制的bounding box [x1, y1, x2, y2]
    mid_slice_idx: 提示所在的切片/帧索引
    """
    # Step 1: 预处理 — 将3D体积视为视频序列
    frames = preprocess(volume_3d)  # → [N, 3, 512, 512]
    
    # Step 2: 图像编码 — Hiera encoder + FPN neck
    multi_scale_feats = {}
    for i, frame in enumerate(frames):
        multi_scale_feats[i] = hiera_encoder(frame)  # 4-stage hierarchical features
    
    # Step 3: 提示编码 — 在中间切片编码bbox
    prompt_embed = prompt_encoder(bbox)  # bbox → dense + sparse embeddings
    
    # Step 4: 中间切片分割 — mask decoder
    memory_bank = MemoryBank(max_frames=8)
    mid_feat = memory_attention(multi_scale_feats[mid_slice_idx], memory_bank)
    mask_mid = mask_decoder(mid_feat, prompt_embed)  # [1, 128, 128] → upsample to [512, 512]
    memory_bank.add(mid_slice_idx, mid_feat, mask_mid)
    
    # Step 5: 双向传播 — 从中间切片向两端传播
    masks = {mid_slice_idx: mask_mid}
    
    # 正向传播: mid → end
    for i in range(mid_slice_idx + 1, len(frames)):
        feat_i = memory_attention(multi_scale_feats[i], memory_bank)  # cross-attend to memory
        mask_i = mask_decoder(feat_i, prompt_embed=None)  # 无需额外提示
        memory_bank.add(i, feat_i, mask_i)
        masks[i] = mask_i
    
    # 反向传播: mid → start
    memory_bank.reset()
    memory_bank.add(mid_slice_idx, mid_feat, mask_mid)
    for i in range(mid_slice_idx - 1, -1, -1):
        feat_i = memory_attention(multi_scale_feats[i], memory_bank)
        mask_i = mask_decoder(feat_i, prompt_embed=None)
        memory_bank.add(i, feat_i, mask_i)
        masks[i] = mask_i
    
    return stack_masks(masks)  # [D, H, W] binary segmentation
```

```python
# MedSAM2 训练流程伪代码
def medsam2_train():
    model = load_pretrained("SAM2.1-Tiny")  # 39M params
    
    # 双学习率策略
    optimizer = AdamW([
        {"params": model.image_encoder.parameters(), "lr": 3e-5},   # 28M params
        {"params": model.other_modules.parameters(), "lr": 5e-5},   # 10.9M params
    ], betas=(0.9, 0.999), weight_decay=0.01)
    
    for epoch in range(70):
        for batch in dataloader:  # batch_size=8/GPU, 8 consecutive slices per sample
            images, gt_masks, bboxes = batch  # [B, 8, 3, 512, 512]
            
            # 模拟bbox提示: 从GT标注生成，加0-10像素随机扰动
            noisy_bboxes = add_perturbation(bboxes, max_shift=10)
            
            # 前向传播: 中间帧提示 + 双向传播
            pred_masks = model(images, noisy_bboxes, mid_idx=4)
            
            # 联合损失: Focal Loss + Dice Loss (权重 20:1)
            loss = 20 * focal_loss(pred_masks, gt_masks) + dice_loss(pred_masks, gt_masks)
            
            loss.backward()
            optimizer.step()
```

##### 4.3 方法详解

**动机与背景**

医学图像分割是临床诊断和治疗规划的基础任务，但传统方法面临两大挑战：(1) 3D 医学图像（CT/MRI/PET）需要逐切片标注，耗时且昂贵；(2) 不同模态和解剖结构需要训练不同的专用模型。SAM（Segment Anything Model）虽然在自然图像上表现出色，但直接应用于医学图像效果不佳，且仅支持 2D 分割。SAM2 引入了视频分割能力，通过记忆注意力机制在帧间传播分割结果，这一特性恰好可以用于 3D 医学图像——将连续切片视为视频帧。

> 💡 **核心洞察**：3D 医学图像的连续切片之间具有天然的空间连续性，与视频帧之间的时间连续性高度类似。SAM2 的记忆传播机制可以直接复用于切片间传播。

**模型架构**

MedSAM2 基于 SAM2.1-Tiny 架构，包含四个核心组件：

**① 图像编码器（Image Encoder）— 28M 参数**

采用 Hiera（Hierarchical Vision Transformer）作为骨干网络，具有四阶段架构：
- 阶段配置：layers = {1, 2, 7, 2}，共 12 层
- 输入分辨率从 SAM2 原始的 \(3 \times 1024 \times 1024\) 降至 \(3 \times 512 \times 512\)，更适合医学图像的典型尺寸，同时降低计算开销
- 在第 5、7、9 层引入**全局注意力块**（global attention blocks），捕获长距离依赖关系
- 顶部接 FPN（Feature Pyramid Network）颈部网络，提取多尺度特征

**② 记忆注意力模块（Memory Attention）**

这是实现切片间传播的核心机制：
- 包含 **4 层 Transformer**，每层同时具有自注意力和交叉注意力
- 使用 **RoPE（Rotary Position Embedding）** 进行 2D 空间编码，特征尺寸为 \(32 \times 32\)
- 维护一个**记忆库（Memory Bank）**，存储最近 8 帧的特征和掩码信息
- 当前帧的特征通过交叉注意力机制与记忆库中的历史信息交互，从而利用空间连续性

> ⚠️ **注意**：记忆库固定为 8 帧，这意味着对于非常长的序列（如数百帧的超声视频），早期帧的信息会被逐渐遗忘，可能导致跟踪漂移。

**③ 提示编码器（Prompt Encoder）**

将用户输入的 bounding box 坐标转换为嵌入向量，引导分割过程。仅在关键切片（中间切片）使用提示，后续切片通过记忆传播自动分割。

**④ 掩码解码器（Mask Decoder）**

- 通过**跳跃连接**整合图像编码器多个尺度的特征
- 输出分辨率为 \(128 \times 128\)，通过双线性插值上采样至 \(512 \times 512\)

**训练策略**

训练采用了多项精心设计的策略：

*数据平衡采样*：由于不同模态数据量差异巨大（CT 363K vs PET 15K），对少数模态进行过采样——MRI ×3、PET ×40、视频 ×40。

*双学习率微调*：图像编码器使用较低学习率 \(3.0 \times 10^{-5}\) 以保留预训练特征，其余组件使用较高学习率 \(5.0 \times 10^{-5}\) 以快速适应医学领域特性。

*数据增强*：随机水平翻转、仿射变换、颜色抖动、随机灰度转换。视频数据额外进行 2× 和 4× 的帧采样率增强。

*Bbox 提示模拟*：从专家标注生成 bounding box，并加入 0-10 像素的随机扰动，模拟真实使用场景中的不精确提示。

*训练规模*：batch size 8/GPU，每样本 8 个连续切片/帧，3 个计算节点（各 4 张 H100 GPU），共训练 70 个 epoch，耗时 4 天。

**人在回路标注管线**

这是 MedSAM2 的重要应用创新，采用 3 轮迭代策略：

1. **第 1 轮**：放射科医生使用初始 MedSAM2 模型辅助标注，生成初始标注数据集
2. **第 2 轮**：用第 1 轮数据微调模型（学习率减半，6 个 epoch），再用改进模型辅助标注
3. **第 3 轮**：用累积数据继续微调（15 个 epoch），最终模型辅助完成剩余标注

效率提升（以 CT 病灶标注为例）：
| 轮次 | 标注时间/例 | 相比纯手动 |
|------|-----------|-----------|
| 纯手动 | 525.9 秒 | — |
| 第 1 轮 | 215.3 秒 | -59% |
| 第 2 轮 | 131.7 秒 | -75% |
| 第 3 轮 | 74.3 秒 | **-86%** |

**与传统方法的区别**

| 特性 | nnU-Net | SAM/MedSAM | SAM2 原版 | **MedSAM2** |
|------|---------|------------|----------|-------------|
| 交互方式 | 全自动 | 2D bbox/点 | 视频 bbox | 3D bbox 传播 |
| 3D 支持 | ✅ 原生 | ❌ 逐切片 | ⚠️ 未针对医学优化 | ✅ 切片传播 |
| 跨模态 | ❌ 需重训 | ✅ | ✅ | ✅ |
| 视频支持 | ❌ | ❌ | ✅ | ✅ |
| 医学优化 | ✅ | 部分 | ❌ | ✅ |

MedSAM2 相比 SAM2.1 原版在医学任务上的优势主要来自：(1) 大规模医学数据微调；(2) 输入分辨率从 1024 降至 512 更适合医学图像；(3) 人在回路标注管线持续改进模型。

**局限性**

- 仅支持 bounding box 提示，对管状结构（血管、气道）效果有限
- 固定 8 帧记忆库，长序列可能出现跟踪漂移
- 推理需要 GPU 支持，限制了边缘部署场景

##### 4.4 核心公式

**联合损失函数**

$$\mathcal{L} = 20 \cdot \mathcal{L}_{\text{focal}} + \mathcal{L}_{\text{dice}}$$

其中 Focal Loss 用于处理前景/背景的类别不平衡问题：

$$\mathcal{L}_{\text{focal}} = -\alpha_t (1 - p_t)^\gamma \log(p_t)$$

Dice Loss 直接优化区域重叠度：

$$\mathcal{L}_{\text{dice}} = 1 - \frac{2 \sum_i p_i g_i}{\sum_i p_i + \sum_i g_i}$$

其中 \(p_i\) 为预测概率，\(g_i\) 为真实标签。Focal Loss 权重设为 20，远高于 Dice Loss，强调对困难样本（边界区域）的关注。

**评估指标**

Dice Similarity Coefficient (DSC)：

$$\text{DSC} = \frac{2|P \cap G|}{|P| + |G|}$$

Normalized Surface Distance (NSD)，边界容差 \(\tau = 2\text{mm}\)：

$$\text{NSD} = \frac{|\{p \in \partial P : d(p, \partial G) \leq \tau\}| + |\{g \in \partial G : d(g, \partial P) \leq \tau\}|}{|\partial P| + |\partial G|}$$

> 💡 **关键设计选择**：20:1 的 Focal-Dice 损失权重比是经验性的，Focal Loss 的高权重确保模型在边界和小目标区域获得足够的梯度信号，而 Dice Loss 保证整体区域重叠度。

#### 🧪 练习题

```yaml
question: "MedSAM2 将 3D 医学图像视为视频序列进行分割，其核心传播机制依赖于以下哪个组件？"
options:
  - "Feature Pyramid Network (FPN) 的多尺度特征融合"
  - "Memory Attention 模块中的交叉注意力与记忆库机制"
  - "Prompt Encoder 对 bounding box 的编码传递"
  - "Mask Decoder 的跳跃连接结构"
answer: 1
explain: "MedSAM2 的切片间传播依赖 Memory Attention 模块——它通过 4 层 Transformer 的交叉注意力机制，让当前帧特征与记忆库中存储的历史帧特征和掩码交互，从而实现从提示切片向其他切片的双向传播。"
```