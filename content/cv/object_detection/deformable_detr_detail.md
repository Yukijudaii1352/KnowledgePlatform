### Deformable DETR — 可变形检测Transformer

```yaml
id: deformable_detr
name: Deformable DETR
full_name: "可变形检测Transformer (Deformable DETR)"
year: "2021"
org: "商汤科技"
paper_url: "https://arxiv.org/abs/2010.04159"
category: "transformer_based"
parent: "detr"
motivation: "多尺度可变形注意力加速收敛"
```

#### 📝 一句话总结

Deformable DETR 用多尺度可变形注意力替代 DETR 中对整张特征图的全局注意力，让每个 query 只关注参考点附近少量采样位置，从而同时解决 DETR 收敛慢、计算重和小目标弱的问题。

#### 🎯 核心要点

- 稀疏采样注意力：每个 query 只在少量可学习偏移点上取特征，而不是遍历全部空间位置
- 多尺度特征输入：直接融合多个 FPN-like 特征层，提升小目标和尺度变化处理能力
- 可变形自注意力与交叉注意力：encoder 和 decoder 都使用同一类采样式注意力模块
- 参考点机制：query 根据参考点预测采样偏移和注意力权重，形成局部但可学习的感受野
- 快速收敛：相比原始 DETR 可用约 1/10 训练轮数达到更好精度
- 两阶段变体：encoder 先产生候选框，再初始化 decoder queries，进一步提升性能

#### 🔬 深入细节

![Deformable DETR 整体架构](https://ar5iv.labs.arxiv.org/html/2010.04159/assets/x1.png)
*图：Deformable DETR 使用多尺度特征和可变形注意力构建端到端检测器。*

##### 1. 动机与背景

原始 DETR 的瓶颈来自 Transformer 注意力直接作用在图像特征图上。图像 token 数量远大于自然语言序列，而且目标通常只与局部区域强相关；如果让每个 query 都和所有空间位置交互，计算量大、优化难，并且低分辨率特征会损害小目标定位。

Deformable DETR 的核心观察是：检测 query 不需要在每一层都看完整幅图，它更需要围绕一个参考位置，从多个尺度中采样少量关键点。这个思想继承了 deformable convolution 的局部自适应采样，但被放进 Transformer 注意力框架中。

##### 2. 可变形注意力模块

![Deformable Attention 模块](https://ar5iv.labs.arxiv.org/html/2010.04159/assets/x2.png)
*图：每个 query 围绕参考点预测多个采样偏移，并对采样特征加权求和。*

标准 cross-attention 对所有 key 做加权：

$$
\text{Attn}(q) = \sum_k A_{qk} W_v x_k
$$

Deformable attention 将这个全局求和改为少量采样点求和。对 query \(q\)，第 \(m\) 个注意力头、第 \(k\) 个采样点会预测偏移 \(\Delta p_{mqk}\) 和权重 \(A_{mqk}\)，输出为：

$$
\text{DeformAttn}(z_q, p_q, x) =
\sum_{m=1}^{M} W_m
\left[
\sum_{k=1}^{K} A_{mqk} \cdot W'_m x(p_q + \Delta p_{mqk})
\right]
$$

其中 \(p_q\) 是参考点，\(K\) 通常很小，例如 4。由于 \(p_q+\Delta p\) 不一定落在整数像素位置，特征读取使用双线性插值。这样每个 query 的复杂度从与 \(HW\) 成正比，降为与 \(K\) 成正比。

##### 3. 多尺度扩展

检测天然需要多尺度特征：高层语义强但分辨率低，低层定位细但语义弱。Deformable DETR 在 \(L\) 个尺度上采样：

$$
\text{MSDeformAttn}(z_q, \hat{p}_q, \{x^l\}_{l=1}^{L}) =
\sum_{m=1}^{M} W_m
\left[
\sum_{l=1}^{L}\sum_{k=1}^{K}
A_{mlqk} \cdot W'_m x^l(\phi_l(\hat{p}_q)+\Delta p_{mlqk})
\right]
$$

\(\hat{p}_q\) 是归一化参考点，\(\phi_l\) 将它映射到第 \(l\) 个特征层坐标。注意力权重在所有尺度和采样点上归一化，因此模型可以自动决定当前 query 应该从高分辨率小目标特征还是低分辨率语义特征中读取信息。

##### 4. 训练与推理流程

```python
# Deformable DETR 核心前向伪代码
multi_scale_feats = backbone(image)  # C3, C4, C5, optional C6
srcs = [project(feat) + pos_embed(feat) for feat in multi_scale_feats]

# Encoder: 多尺度可变形自注意力
memory = srcs
for layer in encoder_layers:
    ref_points = grid_reference_points(memory)
    memory = ms_deform_self_attention(memory, ref_points)
    memory = ffn(memory)

# Decoder: object queries 围绕参考点读取 encoder memory
queries, ref_boxes = init_queries()
for layer in decoder_layers:
    queries = self_attention(queries)
    queries = ms_deform_cross_attention(queries, ref_boxes, memory)
    class_logits, box_delta = heads[layer](queries)
    ref_boxes = refine(ref_boxes, box_delta)

loss = hungarian_set_loss(class_logits, ref_boxes, gt)
```

训练目标仍然沿用 DETR 的集合预测和匈牙利匹配，因此模型仍是端到端检测器，不需要 NMS。变化主要在特征交互方式：encoder 不再做昂贵的全局 dense attention，decoder 也不再让每个 query 扫描所有位置，而是围绕参考点逐层细化。

##### 5. 两阶段变体与优势

两阶段 Deformable DETR 让 encoder 先对多尺度特征上的每个位置预测一个候选框和类别分数，再选 top-K 候选初始化 decoder queries。这与 Faster R-CNN 的 proposal 有相似直觉，但仍在 Transformer 集合预测框架内联合训练。

相对 DETR，它的优势非常明确：多尺度特征补齐小目标信息，稀疏可变形采样降低计算和优化难度，参考点迭代细化提升定位稳定性。后续 DAB-DETR、DN-DETR、DINO 等工作大多继承了“参考点/锚框 query + 可变形注意力 + 多尺度”的基础设计。

> ⚠️ 注意：Deformable DETR 不是回到传统 anchor detector；它的采样参考点是注意力读特征的位置机制，最终监督仍是集合匹配。

#### 🧪 练习题

```yaml
question: "Deformable DETR 相比原始 DETR 收敛更快的主要机制是什么？"
options:
  - "完全移除了 Transformer decoder"
  - "让每个 query 只关注参考点附近少量多尺度采样点，降低注意力搜索空间"
  - "使用 NMS 删除重复预测"
  - "只检测大目标，忽略小目标"
answer: 1
explain: "可变形注意力把全局 dense attention 改为围绕参考点的稀疏多尺度采样，减少计算并让优化更聚焦。"
```
