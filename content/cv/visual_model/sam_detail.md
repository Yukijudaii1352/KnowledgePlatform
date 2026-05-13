### Segment Anything

```yaml
标题: "Segment Anything"
作者: "Alexander Kirillov, Eric Mintun, Nikhila Ravi, Hanzi Mao, Chloe Rolland, Laura Gustafson, Tete Xiao, Spencer Whitehead, Alexander C. Berg, Wan-Yen Lo, Piotr Dollár, Ross Girshick"
机构: "Meta AI Research (FAIR)"
发表: "ICCV 2023"
链接: "https://arxiv.org/abs/2304.02643"
代码: "https://github.com/facebookresearch/segment-anything"
id: "sam"
full_name: "Segment Anything Model (SAM)"
year: "2023"
org: "Meta AI"
category: "visual_model"
parent: "—"
motivation: "首个图像分割基础模型，通过可提示分割范式和SA-1B数据集定义新范式"
一句话总结: "提出Segment Anything Model (SAM)——首个图像分割基础模型，通过可提示分割任务（promptable segmentation）统一交互式/自动分割范式，并构建了包含11M图像、1.1B掩码的SA-1B数据集，展现强大的零样本迁移能力。"
```

#### 📝 一句话总结

SAM 将 NLP 中"prompt → response"的基础模型范式迁移到视觉分割领域：给定任意提示（点、框、文本、掩码），模型输出有效的分割掩码，并通过"模型-数据"飞轮（data engine）自举式地构建了迄今最大的分割数据集 SA-1B。

---

#### 🎯 核心要点

- 定义 **可提示分割任务（Promptable Segmentation）** 作为统一预训练目标，支持点、框、文本、掩码等任意 prompt 输入
- 三组件架构：**Image Encoder**（MAE 预训练 ViT-H，632M 参数）+ **Prompt Encoder**（稀疏/稠密双路）+ **Mask Decoder**（2 层 Transformer decoder，~50ms on CPU）
- **歧义感知输出**：同时预测 3 个不同粒度的掩码 + IoU 置信度，训练时只对最小 loss 的掩码回传梯度
- **三阶段数据引擎（Data Engine）**：人工辅助 → 半自动 → 全自动，自举式构建 SA-1B 数据集
- **SA-1B 数据集**：11M 图像、1.1B 掩码（99.1% 全自动生成），94% 掩码与专业标注 IoU > 90%
- 在 23 个分割数据集上零样本迁移，多数任务超越或匹配全监督 prior art
- 损失函数：Focal Loss + Dice Loss（20:1 权重），11 轮交互式 prompt 采样训练

---

#### 🔬 深入细节

##### 整体架构

![SAM 模型架构总览](https://ar5iv.labs.arxiv.org/html/2304.02643/assets/x1.png)
*图：SAM 由 Image Encoder、Prompt Encoder 和 Mask Decoder 三部分组成。Image Encoder 只运行一次，后续所有 prompt 交互复用同一特征图。*

SAM 的设计哲学是"一次编码，多次解码"——将计算量最大的图像特征提取与轻量的 prompt 交互解耦，实现实时交互式分割。

---

##### 1. Promptable Segmentation 任务定义

**动机：** NLP 领域的基础模型（如 GPT）通过"next token prediction"预训练，再通过 prompt engineering 泛化到下游任务。图像分割领域缺乏类似的统一范式——语义分割、实例分割、全景分割各自为政，每种任务需要单独的模型和标注。

**核心定义：** 给定任意 prompt（前景/背景点、边界框、粗掩码、自由文本），返回一个**有效的（valid）**分割掩码。"有效"意味着即使 prompt 有歧义（如点击衬衫上的点，可能指衬衫、人、或整个场景），输出也应是其中至少一个物体的合理掩码。

> 💡 **关键洞察：** 这个任务定义同时解决了预训练和零样本迁移两个问题——预训练时模拟交互式 prompt 序列，推理时通过设计合适的 prompt 即可解决各种下游分割任务（如用检测器的框输出作为 prompt 实现实例分割）。

---

##### 2. Image Encoder — MAE 预训练的 ViT-H

SAM 选择 MAE（Masked Autoencoder）预训练的 ViT-H/16 作为图像编码器（632M 参数）：

- **输入**：\(1024 \times 1024\) 图像
- **输出**：\(64 \times 64 \times 256\) 特征图（16× 下采样）
- **位置编码**：相对位置编码（而非绝对），更好适应不同分辨率
- **注意力优化**：在第 2、5、8、11 个 block 使用全局注意力，其余使用窗口注意力，降低计算量
- **通道映射**：通过 \(1 \times 1\) 和 \(3 \times 3\) 卷积将 ViT 的 1280 维输出降至 256 维

> ⚠️ **计算瓶颈：** Image Encoder 是整个系统的计算瓶颈（~0.15s/image on GPU），但由于其输出不依赖 prompt，只需运行一次。后续所有 prompt 交互都复用同一特征图，实现"摊销"计算。

---

##### 3. Prompt Encoder — 稀疏 + 稠密双路编码

Prompt Encoder 将不同类型的提示统一编码为 256 维向量：

**稀疏 prompt（输出为 token 序列）：**
- **点（point）**：傅里叶位置编码 + 前景/背景可学习嵌入
- **框（box）**：左上角 + 右下角两个点的位置编码 + 可学习嵌入
- **文本（text）**：CLIP 文本编码器提取特征

**稠密 prompt（输出为空间特征图）：**
- **掩码（mask）**：通过 \(4 \times\) 下采样卷积网络编码，逐元素加到图像特征上

位置编码使用**随机傅里叶特征映射**，将 2D 坐标映射到高维空间，与 NeRF 中的位置编码思路一致。

---

##### 4. Mask Decoder — 轻量 Transformer 解码器

这是 SAM 最精巧的部分。Mask Decoder 仅用 **2 层修改版 Transformer decoder** 实现 prompt 到掩码的映射：

```
Mask Decoder 伪代码:
─────────────────────────────────
输入:
  image_embedding: [64×64, 256]    # Image Encoder 输出
  prompt_tokens: [N, 256]          # 稀疏 prompt 编码
  output_tokens: [5, 256]          # 4 个 mask token + 1 个 IoU token (可学习)

for layer in decoder_layers (×2):
    # Step 1: token 间自注意力
    tokens = self_attn(output_tokens + prompt_tokens)
    
    # Step 2: token → image 交叉注意力
    tokens = cross_attn(q=tokens, kv=image_embedding)
    
    # Step 3: MLP 变换
    tokens = MLP(tokens)
    
    # Step 4: image → token 交叉注意力 (关键！双向交互)
    image_embedding = cross_attn(q=image_embedding, kv=tokens)

# 上采样 + 动态 MLP 生成掩码
upsampled = upsample_4x(image_embedding)  # → [256×256, 32]
for i in range(4):
    mask_weights_i = DynamicMLP(mask_token_i)   # [32]
    masks[i] = sigmoid(upsampled @ mask_weights_i)  # [256×256]

iou_scores = MLP(iou_token)  # 4 个 IoU 置信度
─────────────────────────────────
```

**歧义处理机制：** 一个 prompt 可能对应多个合理的分割结果。SAM 同时输出 **3 个不同粒度的掩码**（whole / part / subpart）+ 1 个额外掩码，每个附带 IoU 置信度。训练时只对 loss 最小的掩码回传梯度（类似 DETR 的匹配策略），推理时选 IoU 最高的掩码。

> 💡 **为什么只用 2 层 decoder？** Image Encoder 已提供极其丰富的特征，decoder 只需做轻量的 prompt-conditioned 选择。这使得每次 prompt 交互仅需 ~50ms（CPU），支持实时交互标注。

---

##### 5. 数据引擎 — 三阶段自举式数据飞轮

SAM 的核心洞察：**模型和数据可以互相提升**。数据引擎分三个阶段：

**阶段一：人工辅助标注（Assisted-Manual）**
- 专业标注员使用 SAM 交互式标注（点击 prompt → 模型预测 → 人工修正）
- 类似经典交互式分割，但 SAM 的实时性大幅提升效率
- 收集 **4.3M 掩码**（120K 图像）

**阶段二：半自动标注（Semi-Automatic）**
- SAM 先自动检测高置信度物体，标注员只需标注 SAM 遗漏的物体
- 目标：增加多样性，标注不显眼的物体
- 新增 **5.9M 掩码**（180K 图像），每张图像平均掩码数从 44 增至 72

**阶段三：全自动标注（Fully Automatic）**
- 在图像上铺设 \(32 \times 32 = 1024\) 个均匀网格点作为 prompt
- 每个点预测一组掩码（利用歧义感知输出）
- 通过 NMS（IoU 阈值）+ 置信度过滤 + 稳定性过滤去重
- 最终生成 **1.1B 掩码**（11M 图像），99.1% 全自动

```python
# 全自动标注伪代码
for image in dataset:
    features = image_encoder(image)           # 编码一次
    points = uniform_grid(32, 32)             # 1024 个点
    all_masks = []
    for point in points:
        masks, ious = mask_decoder(features, point)  # 每点 3 个掩码
        all_masks.extend(filter_by_confidence(masks, ious))
    
    # 后处理
    all_masks = NMS(all_masks, iou_threshold=0.7)
    all_masks = stability_filter(all_masks)   # 阈值扰动稳定性
    final_masks = remove_duplicates(all_masks)
```

---

##### 6. 训练策略

**交互式训练模拟：** 每个训练样本模拟 **11 轮交互**：
1. **第 1 轮**：随机选择前景点或边界框作为初始 prompt
2. **第 2-9 轮**：从上一轮预测与 GT 的误差区域采样新的纠正点（false negative → 前景点，false positive → 背景点），同时将上一轮的**未二值化 mask logits** 作为额外 prompt 输入
3. **第 10-11 轮**：不添加新点，让模型学习自我精炼掩码

**损失函数：**

$$\mathcal{L} = \lambda_{\text{focal}} \cdot \text{FocalLoss}(m, \hat{m}) + \lambda_{\text{dice}} \cdot \text{DiceLoss}(m, \hat{m})$$

其中 \(\lambda_{\text{focal}} : \lambda_{\text{dice}} = 20 : 1\)，对 3 个输出掩码取最小 loss 回传。

**优化配置：** AdamW（\(\beta_1=0.9, \beta_2=0.999\)），初始学习率 \(8 \times 10^{-4}\)，250 步线性 warmup，在 60K 和 86.7K 步分别衰减 10×，共训练 90K 步（~2 个 SA-1B epoch），batch size 256，weight decay 0.1，drop path rate 0.4，layer-wise lr decay 0.8。

---

##### 7. 零样本迁移与传统方法对比

SAM 与传统分割方法的核心区别在于：传统方法为每个任务单独训练（语义分割用 FCN/DeepLab，实例分割用 Mask R-CNN，全景分割用 Panoptic FPN），而 SAM 通过 prompt engineering 零样本解决所有任务。

在 23 个数据集上的零样本评估中：
- **单点分割**：平均 mIoU 显著超越 RITM 等交互式分割方法
- **边界框 → 实例分割**：COCO/LVIS 上零样本接近 ViTDet 全监督性能
- **目标提议生成**：全自动网格点 prompt，中大物体 AR 超越 ViTDet
- **边缘检测**：BSDS500 上零样本达到合理性能

> ⚠️ **局限性：** SAM 不生成语义标签（只输出掩码）；对细粒度结构精度有限；文本 prompt 能力尚为初步探索；实时性依赖图像编码器预计算。

---

#### 🧪 练习题

```yaml
question: "SAM 在训练时对 3 个输出掩码的损失函数采用什么策略？"
options:
  - "对 3 个掩码的 loss 取平均后回传梯度"
  - "只对 IoU 置信度最高的掩码回传梯度"
  - "只对与 GT 匹配 loss 最小的掩码回传梯度"
  - "对 3 个掩码分别回传梯度，使用不同的 loss 权重"
answer: 2
explain: "SAM 采用类似 DETR 的匹配策略，训练时只对 loss 最小的那个掩码回传梯度，让每个 output token 学会预测不同粒度的掩码，避免 mode averaging。"
```