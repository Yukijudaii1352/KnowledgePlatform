### MedVersa: 通用医学影像基础模型

```yaml
id: medversa
name: MedVersa
full_name: "MedVersa: 通用医学影像基础模型"
year: 2026
org: MGH/哈佛大学
paper_url: https://ai.nejm.org/doi/abs/10.1056/AIoa2500595
category: foundation_model
parent: medsam2
motivation: 多任务通用医学影像基础模型支持报告生成
```

#### 📝 一句话总结

MedVersa 提出以 LLM 为核心编排器的通用医学影像基础模型，通过动态任务协议（DTP）让 LLM 自主决定是否调用检测/分割等视觉模块，在 9 类医学影像任务上以单一模型实现 SOTA，并在放射科报告生成中 71% 的 AI 报告达到或超越人类水平。

#### 🎯 核心要点

- **三组件架构**：多模态输入协调器（Multimodal Input Coordinator）+ LLM 编排器（LLM Orchestrator）+ 视觉任务模块（Vision Modules: DET/2DSEG/3DSEG）
- **动态任务协议（DTP）**：LLM 通过生成 `<DET>`、`<2DSEG>`、`<3DSEG>` 等特殊标记自主决定是否调用视觉模块，无需预定义任务路由
- **域感知小批量梯度下降**：按任务类型 × 影像模态分组构建 minibatch，解决多模态多任务联合训练的优化冲突
- **参照图像指令微调（Referring Image Instruction Tuning）**：使用 `<img0>v0</img0>` 标记支持多图输入与纵向对比
- **大规模训练数据**：91 个公开数据集，约 2900 万训练实例，覆盖 2D/3D 多种影像模态
- **9 类任务统一**：报告生成、分类、检测、2D 分割、3D 分割、VQA、区域描述、纵向对比、开放式问答
- **报告生成 SOTA**：BLEU-4 达 17.8、RadCliQ 2.71（findings），大幅超越 MAIRA（BLEU-4 12.5）和 Med-PaLM M
- **通用学习增益**：通用训练比专项训练平均提升 6.4%，证明跨任务知识迁移的有效性
- **临床验证**：放射科医师盲评中 71% 的 AI 报告与人类报告临床等效或更优

#### 🔬 深入细节

![MedVersa 架构总览](https://arxiv.org/html/2405.07988v2/x1.png)
*图：MedVersa 整体架构。左侧为多模态输入协调器将图像/文本统一编码；中间 LLM 编排器生成文本并通过特殊标记触发视觉模块；右侧为检测、2D 分割、3D 分割三个专用视觉模块。*

##### 算法伪代码

```python
# MedVersa 推理流程伪代码
def medversa_inference(images, text_instruction):
    # 1. 多模态输入协调器
    if images.ndim == 3:  # 2D 图像
        vis_features = swin_transformer_2d(images)        # [B, C, H, W]
    else:                  # 3D 体积
        vis_features = unet3d_encoder(images)              # [B, C, D, H, W]
    
    vis_tokens = adaptive_avg_pool(vis_features, output_size=9)  # 固定 9 个 token
    vis_tokens = linear_proj(layer_norm(vis_tokens))             # → [B, 9, 4096]
    
    text_tokens = llama_tokenizer(text_instruction)
    # 多图场景: "<img0>v0</img0> <img1>v1</img1> 请对比两次检查"
    input_seq = interleave(vis_tokens, text_tokens)  # 图文交错
    
    # 2. LLM 编排器 (LLaMA-2-Chat + LoRA)
    output_tokens = llm_orchestrator(input_seq)  # 自回归生成
    
    # 3. 动态任务协议 — LLM 自主决定是否调用视觉模块
    results = parse_text(output_tokens)
    
    if "<DET>" in output_tokens:
        det_embeddings = extract_embeddings(output_tokens, "<DET>")
        # 检测头: LayerNorm → Linear(4096→256) → ReLU → LayerNorm → Linear(256→4)
        bboxes = detection_head(det_embeddings)  # [x1, y1, x2, y2]
        results["detection"] = bboxes
    
    if "<2DSEG>" in output_tokens:
        seg_embedding = extract_embeddings(output_tokens, "<2DSEG>")
        # 2D 分割: ResNet18 编码器 + UNet 解码器, 条件注入 seg_embedding
        mask_2d = segmentation_2d(images, seg_embedding)
        results["segmentation_2d"] = mask_2d
    
    if "<3DSEG>" in output_tokens:
        seg_embedding = extract_embeddings(output_tokens, "<3DSEG>")
        # 3D 分割: 3D UNet, 条件注入 seg_embedding
        mask_3d = segmentation_3d(images, seg_embedding)
        results["segmentation_3d"] = mask_3d
    
    return results
```

```python
# 域感知小批量梯度下降 (Domain-Aware Minibatch GD)
task_groups = ["captioning", "classification", "detection", 
               "segmentation", "vqa", "region_caption", "longitudinal"]
modality_types = ["CXR", "CT", "MRI", "dermoscopy", "pathology", ...]

for iteration in training_loop:
    modality = random.choice(modality_types)          # 随机选影像模态
    task = random.choice(tasks_for(modality))          # 选该模态下的任务
    batch = sample_batch(task, modality)               # 同任务同模态 minibatch
    
    if task in ["captioning", "vqa", "classification"]:
        loss = cross_entropy(llm_output, target)
    elif task == "detection":
        loss = cross_entropy(llm_output, target) + regression_loss(bboxes, gt_bboxes)
    elif task == "segmentation":
        loss = focal_loss(pred_mask, gt_mask) + dice_loss(pred_mask, gt_mask)
    
    loss.backward()
    optimizer.step()  # AdamW + cosine schedule
```

##### 动机与背景

现有医学影像基础模型存在两个核心局限：（1）**任务覆盖不全**——大多数模型仅支持视觉-语言任务（如报告生成、VQA），无法执行检测和分割等视觉中心任务；（2）**模态单一**——通常只处理 2D 图像或特定影像类型。临床实践中，放射科医师需要在同一工作流中完成阅片、定位病灶、分割器官、撰写报告等多种任务，且需处理 X 光、CT、MRI、皮肤镜等多种模态。MedVersa 的目标是构建一个**单一模型覆盖所有这些任务**的通用基础模型。

##### 核心机制：LLM 作为编排器

MedVersa 的关键创新在于将 LLM 从"文本生成器"提升为"任务编排器"。传统多任务模型需要预定义任务路由（如根据输入类型选择不同的 head），而 MedVersa 让 LLM **在生成过程中自主决定**是否需要调用视觉模块：

- 当 LLM 判断需要定位病灶时，它会在输出中生成 `<DET>` 标记
- 当需要分割时，生成 `<2DSEG>` 或 `<3DSEG>` 标记
- 当只需文本回答时，直接输出自然语言

> 💡 **关键洞察**：这种设计使得 MedVersa 能够处理**复合任务**——例如"描述这张 CT 中的异常并分割出病灶区域"，LLM 会同时生成文本描述和 `<3DSEG>` 标记，一次推理完成多个子任务。

##### 多模态输入协调器

协调器负责将异构输入统一为 LLM 可处理的 token 序列：

1. **视觉编码器**：2D 图像使用 Swin Transformer-Base（ImageNet 预训练，4 阶段，窗口大小 7，patch 大小 4，初始特征维度 128）；3D 体积使用 3D UNet 编码器
2. **自适应池化**：无论输入分辨率如何，统一池化为 **9 个视觉 token**，大幅减少序列长度
3. **线性投影适配器**：`AdaptiveAvgPool → LayerNorm → Linear(→4096)`，将视觉 token 对齐到 LLM 的嵌入空间（4096 维，与 LLaMA-2 一致）
4. **多图支持**：通过 `<img0>v0</img0>` 格式标记不同图像，支持纵向对比（如前后两次 CT 对比）

> ⚠️ **注意**：2D 和 3D 使用**不同的线性投影器**，因为两种模态的特征分布差异显著。

##### 视觉任务模块

三个轻量级专用模块，由 LLM 的特殊标记触发：

| 模块 | 架构 | 输入 | 输出 |
|------|------|------|------|
| 检测（DET） | LayerNorm → Linear(4096→256) → ReLU → LayerNorm → Linear(256→4) | `<DET>` 嵌入 | 归一化边界框 \([x_1, y_1, x_2, y_2]\) |
| 2D 分割（2DSEG） | ResNet18 编码器 + UNet 解码器 | 原始图像 + `<2DSEG>` 嵌入 | 像素级分割掩码 |
| 3D 分割（3DSEG） | 3D UNet | 原始体积 + `<3DSEG>` 嵌入 | 体素级分割掩码 |

检测模块特别精巧：对于多类检测，LLM 会为每个类别分别生成 `<DET>` 或 `<NODET>` 标记，其中 `<NODET>` 表示该类别不存在。只有 `<DET>` 对应的嵌入才会被送入检测头。

##### 域感知小批量梯度下降

多任务多模态联合训练面临严重的**梯度冲突**问题——不同任务的损失函数量级和梯度方向差异大。MedVersa 的解决方案：

1. **按任务分组**：将训练数据分为 7 个任务组（报告生成、分类、检测、分割、VQA、区域描述、纵向对比）
2. **按模态细分**：每个任务组内再按影像模态（CXR、CT、MRI 等）细分
3. **同质 minibatch**：每个 minibatch 只包含**同一任务 + 同一模态**的样本
4. **任务特定损失**：
   - 视觉-语言任务：交叉熵损失
   - 检测：交叉熵 + 回归损失
   - 分割：Focal Loss + Dice Loss（等权重）

> 💡 **关键**：这种策略确保每次梯度更新都是"纯净"的——不会因为混合不同任务/模态的样本而产生相互抵消的梯度。

##### 训练配置

- **LLM 骨干**：LLaMA-2-Chat，使用 **LoRA**（rank=16, alpha=16）微调，优于全参数训练
- **优化器**：AdamW + 余弦学习率调度
- **数据规模**：91 个公开数据集，约 2900 万训练实例
- **图像预处理**：随机裁剪（50%~100%）→ resize 至 224×224；分割任务使用随机翻转增强；3D 数据沿随机轴翻转

##### 与现有方法的对比

| 特性 | Med-PaLM M | MAIRA | LLaVA-Med | **MedVersa** |
|------|-----------|-------|-----------|-------------|
| 视觉-语言任务 | ✅ | ✅ | ✅ | ✅ |
| 检测 | ❌ | ❌ | ❌ | ✅ |
| 2D/3D 分割 | ❌ | ❌ | ❌ | ✅ |
| 多图对比 | ❌ | ❌ | ❌ | ✅ |
| 动态任务路由 | ❌ | ❌ | ❌ | ✅（DTP） |
| 报告生成 BLEU-4 | — | 12.5 | — | **17.8** |

MedVersa 的核心优势在于**统一性**：不是简单地将多个专用模型拼接，而是通过 LLM 编排器实现了真正的端到端多任务推理。实验表明，通用训练策略比专项训练平均提升 6.4%，说明不同任务之间存在正向知识迁移。

#### 🧪 练习题

```yaml
question: "MedVersa 中 LLM 编排器如何决定是否调用视觉分割模块？"
options:
  - "根据输入图像的模态类型自动路由到对应模块"
  - "通过预定义的任务分类器判断输入属于哪类任务"
  - "LLM 在自回归生成过程中输出特殊标记（如 <2DSEG>）来触发对应模块"
  - "用户必须在输入指令中显式指定需要调用的模块"
answer: 2
explain: "MedVersa 的动态任务协议（DTP）让 LLM 在生成文本的过程中自主决定是否输出 <DET>、<2DSEG>、<3DSEG> 等特殊标记，这些标记的隐层嵌入会被提取并传递给对应的视觉模块，无需预定义路由或用户显式指定。"
```