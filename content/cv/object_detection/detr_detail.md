### DETR — 检测Transformer

```yaml
id: detr
name: DETR
full_name: "检测Transformer (Detection Transformer)"
year: "2020"
org: "FAIR"
paper_url: "https://arxiv.org/abs/2005.12872"
category: "transformer_based"
parent: "—"
motivation: "Transformer实现端到端检测"
```

#### 📝 一句话总结

DETR 将目标检测改写为集合预测问题，用 Transformer 编码器-解码器、固定数量 object queries 和匈牙利二分匹配损失直接输出一组无重复检测框，解决了传统检测器依赖 anchor、proposal 和 NMS 后处理的问题。

#### 🎯 核心要点

- 端到端集合预测：固定 \(N\) 个预测槽位一次性输出所有目标和 “no object” 类别
- CNN + Transformer 架构：CNN 提取 2D 特征，Transformer 建模全局图像上下文和目标关系
- Object queries：使用可学习查询向量作为解码器输入，每个查询学习负责一个潜在目标
- 匈牙利匹配损失：训练时对预测集合和真值集合做一对一匹配，天然抑制重复框
- 无 anchor / proposal / NMS：推理阶段直接保留非空类别预测，不需要手工设计后处理
- COCO 基准验证：与强 Faster R-CNN 基线精度相当，大目标表现突出，但小目标和收敛速度是早期短板

#### 🔬 深入细节

![DETR 端到端检测流程](https://ar5iv.labs.arxiv.org/html/2005.12872/assets/x1.png)
*图：DETR 将 CNN 特征送入 Transformer，并通过二分匹配把预测槽位唯一分配给真值目标。*

##### 1. 动机与背景

传统检测器通常把检测拆成多阶段工程流水线：预设 anchor 或 proposal、密集分类与回归、再用 NMS 去掉重复框。这个设计有效但包含大量先验和超参数，例如 anchor 尺寸、IoU 阈值、NMS 阈值等；同一个图像中的多个候选框还会竞争同一个目标，训练目标和最终输出并不完全一致。

DETR 的核心转变是把检测看成“集合到集合”的预测：图像中真实目标是一个无序集合，模型输出也应是一个无序集合。只要训练时能建立预测和真值之间的一对一分配，重复预测就可以直接作为损失惩罚，而不需要在推理后再用 NMS 清理。

##### 2. 模型结构

![DETR 架构图](https://ar5iv.labs.arxiv.org/html/2005.12872/assets/x2.png)
*图：CNN backbone、位置编码、Transformer encoder-decoder、共享 FFN 检测头构成 DETR。*

输入图像先经过 ResNet 等 CNN backbone 得到特征图 \(f \in \mathbb{R}^{C \times H \times W}\)，再通过 \(1 \times 1\) 卷积映射到 Transformer 隐空间维度。特征图被展平为 \(HW\) 个 token，并加入二维位置编码：

$$
z_0 = \text{flatten}(\text{Conv}_{1\times1}(f)) + p
$$

Transformer encoder 在所有空间位置之间做全局自注意力，使每个位置都能感知整幅图像中的其他区域。Decoder 接收 \(N\) 个可学习 object queries，每个 query 通过 cross-attention 从 encoder memory 中读取与自身相关的图像证据，最后由共享 FFN 输出类别分布和归一化边界框：

$$
\hat{y}_i = (\hat{p}_i, \hat{b}_i), \quad i=1,\dots,N
$$

##### 3. 集合损失与匈牙利匹配

DETR 最关键的训练机制是先找一个最优排列 \(\hat{\sigma}\)，将真值目标 \(y_i\) 唯一匹配到预测 \(\hat{y}_{\sigma(i)}\)：

$$
\hat{\sigma} = \arg\min_{\sigma \in \mathfrak{S}_N} \sum_i \mathcal{L}_{match}(y_i, \hat{y}_{\sigma(i)})
$$

匹配代价由分类代价和框代价组成，框代价通常结合 \(L_1\) 和 GIoU：

$$
\mathcal{L}_{box}(b_i, \hat{b}_{\sigma(i)}) =
\lambda_{L1}\|b_i-\hat{b}_{\sigma(i)}\|_1 +
\lambda_{giou}\mathcal{L}_{giou}(b_i,\hat{b}_{\sigma(i)})
$$

完成匹配后，只有被匹配到的预测负责对应目标；未匹配预测都被监督为 \(\varnothing\) 类。这样一来，如果两个 query 预测同一个物体，只有其中一个能被匹配，另一个会受到“非目标”或错误定位惩罚，这就是 DETR 不需要 NMS 的根本原因。

##### 4. 训练与推理流程

```python
# DETR 训练/推理核心逻辑
features = backbone(image)
tokens = flatten(project(features)) + pos_encoding
memory = transformer_encoder(tokens)

queries = learned_object_queries  # [N, D]
decoded = transformer_decoder(queries, memory)
class_logits, boxes = detection_head(decoded)

if training:
    matching = hungarian_match(class_logits, boxes, gt_labels, gt_boxes)
    loss = class_loss(matching) + l1_box_loss(matching) + giou_loss(matching)
    loss.backward()
else:
    keep = softmax(class_logits).argmax(-1) != "no_object"
    detections = boxes[keep], class_logits[keep]
```

推理阶段非常直接：对每个 query 的类别分布取最大非空类别，过滤掉 \(\varnothing\) 即可得到检测结果。传统检测器通常需要产生上千个候选，再根据类别分数和 IoU 做 NMS；DETR 只产生固定数量预测槽位，例如 100 个，输出集合已经被训练成尽量无重复。

##### 5. 与传统检测器的区别

DETR 的优点是概念统一：分类、定位、去重都在同一个端到端目标下优化；Transformer 自注意力还让模型天然适合捕获远距离目标关系和全局上下文。因此它在大目标和拥挤目标关系建模上很有吸引力。

它的代价也很明确：全局注意力对高分辨率特征开销大，早期 DETR 只用较低分辨率特征，小目标性能受限；同时二分匹配训练早期不稳定，需要很长训练周期。后续 Deformable DETR、DINO、RT-DETR/RF-DETR 等工作基本都围绕“多尺度、小目标、收敛速度、实时部署”继续改进。

> 💡 关键：DETR 的创新不只是用了 Transformer，而是把检测输出从“密集候选 + 后处理”改成了“直接预测无序集合”。

#### 🧪 练习题

```yaml
question: "DETR 能够在推理阶段去掉 NMS 的关键原因是什么？"
options:
  - "Transformer 编码器自动删除低分框"
  - "匈牙利匹配训练让预测与真值一对一分配，重复预测会被损失惩罚"
  - "CNN backbone 只输出一个尺度的特征"
  - "Object queries 的数量等于图像中的真实目标数"
answer: 1
explain: "DETR 的集合损失通过匈牙利匹配建立一对一监督，未匹配预测被训练为 no object，因此模型学习直接输出少重复的检测集合。"
```
