### RF-DETR — Roboflow检测Transformer

```yaml
id: rf_detr
name: RF-DETR
full_name: "Roboflow检测Transformer (Roboflow Detection Transformer)"
year: "2025"
org: "Roboflow"
paper_url: "https://arxiv.org/abs/2511.09554"
category: "transformer_based"
parent: "rt_detr"
motivation: "NAS优化首破60mAP大关"
```

#### 📝 一句话总结

RF-DETR 将 DINOv2 预训练 ViT、轻量多尺度投影、Deformable DETR decoder 与权重共享 NAS 结合起来，为不同数据集和延迟预算搜索实时检测 Transformer 的 Pareto 最优结构，并报告首个实时检测器突破 COCO 60 AP。

#### 🎯 核心要点

- Foundation backbone：用 DINOv2 ViT 取代传统 CNN/CAEv2 backbone，增强跨域迁移能力
- 实时 DETR 架构：多尺度 projector + deformable cross-attention decoder，保持端到端无 NMS 检测
- 权重共享 NAS：一次训练中随机采样子网，覆盖分辨率、patch size、窗口数、decoder 层数和 query 数
- 数据集/硬件自适应：搜索目标可以绑定具体延迟预算和目标数据集，而不是只给单一手工模型
- Decoder dropout：所有 decoder 层施加检测/分割损失，推理时可丢弃部分层换取更低延迟
- 检测与分割统一：在检测架构上加入轻量实例分割头，保持实时部署特性

#### 🔬 深入细节

![RF-DETR 架构图](https://arxiv.org/html/2511.09554v2/x5.png)
*图：RF-DETR 使用预训练 ViT backbone、多尺度 projector、deformable decoder 和轻量分割头。*

##### 1. 动机与背景

开词汇检测器和大型 VLM 在通用语义上很强，但微调到具体工业或长尾数据集时往往太重、延迟高。另一方面，YOLO、RT-DETR、LW-DETR 等专用检测器速度快，但固定手工结构未必适合每个目标数据集、类别规模、目标尺寸分布和硬件延迟约束。

RF-DETR 的问题定义更偏部署：给定一个目标数据集和一个延迟范围，能否用一次训练得到大量不同结构的候选模型，并从中选择精度-延迟 Pareto 最优点？这就是它引入权重共享 NAS 的原因。

##### 2. 基础架构

RF-DETR 以预训练 DINOv2 ViT 作为 backbone。相比从头训练或只用 CNN，DINOv2 提供更强的互联网规模视觉先验，尤其有助于小数据集和跨域检测。由于 ViT token 原生不是 FPN 格式，模型通过多尺度 projector 组织出 decoder 可用的空间特征。

Decoder 继承 DETR 系列的端到端集合预测思想，使用 deformable cross-attention 在多尺度特征上读少量采样点。输出仍通过匈牙利匹配训练，因此检测分支不依赖 anchor 后处理或 NMS。

##### 3. 权重共享 NAS 搜索空间

![RF-DETR NAS 搜索空间](https://arxiv.org/html/2511.09554v2/x6.png)
*图：RF-DETR 同时搜索 patch size、decoder 层数、query 数、输入分辨率和窗口注意力配置。*

RF-DETR 的 NAS 不是为每个候选结构单独训练模型，而是训练一个 supernet。每次迭代随机采样一组结构旋钮，并只激活对应子网完成前向和反向：

```python
# RF-DETR 权重共享 NAS 训练伪代码
supernet = RFDETRSuperNet(dinov2_backbone, projector, detr_decoder)

for images, targets in dataloader:
    cfg = sample({
        "resolution": [small, medium, large],
        "patch_size": [small_patch, large_patch],
        "window_blocks": [few, many],
        "decoder_layers": [2, 3, 4, 5, 6],
        "num_queries": [100, 200, 300],
    })

    outputs = supernet(images, cfg)
    loss = hungarian_detection_loss(outputs, targets)
    loss += optional_segmentation_loss(outputs, targets)
    loss.backward()
    optimizer.step()

pareto = evaluate_many_subnets(supernet, target_dataset, latency_meter)
deploy_cfg = select_best(pareto, latency_budget)
```

这种训练方式有两个效果。第一，它把上千个候选结构压缩到一次训练中评估，避免 NAS 的重复训练成本。第二，随机结构采样类似 architecture augmentation，让模型在不同分辨率、query 数和 decoder 深度下都保持可用，提升结构迁移性。

##### 4. 关键结构设计

RF-DETR 在 backbone 中交替使用窗口注意力和非窗口注意力，以平衡局部效率和全局建模。窗口注意力降低 ViT 高分辨率 token 的计算量；少量非窗口或更大感受野交互保留全局上下文，避免纯局部窗口损害检测关系建模。

多尺度 projector 使用 layer norm 而不是 batch norm，使梯度累积和小 batch 训练更稳定，也更适合消费级 GPU 微调。分割头则复用 encoder/projector 输出，通过 query embedding 与像素 embedding 点积生成 mask，类似轻量 prototype mask 思路，避免引入重型 mask decoder。

Decoder dropout 是另一个部署友好设计。由于每层 decoder 都有检测/分割辅助损失，较浅层也能输出可用预测；推理时可以减少 decoder 层数来换延迟，而不必重新训练完整模型。

##### 5. 与 RT-DETR 的关系

RT-DETR 证明了 DETR 可以通过高效 hybrid encoder 和 query selection 进入实时检测区间；RF-DETR 则进一步把“实时结构如何选”交给 NAS，并引入 DINOv2 预训练 ViT 作为更强先验。它关注的不只是 COCO 单点成绩，而是 COCO、RF100-VL 等多域数据上的精度-延迟曲线。

> 💡 关键：RF-DETR 的“首破 60 mAP”来自强预训练、实时 DETR 解码器和可部署结构搜索的组合；NAS 的价值在于为不同延迟预算产出一组可选模型，而不是单一最大模型。

#### 🧪 练习题

```yaml
question: "RF-DETR 中权重共享 NAS 的主要作用是什么？"
options:
  - "替代匈牙利匹配，使模型重新依赖 NMS"
  - "在一次训练中覆盖多种结构旋钮，并为目标数据集/延迟预算选择 Pareto 最优子网"
  - "只搜索数据增强策略，不改变网络结构"
  - "把检测任务转换为纯图像分类任务"
answer: 1
explain: "RF-DETR 的 NAS 采样并训练共享权重子网，搜索分辨率、patch、窗口、decoder 层数和 query 数等旋钮，从而适配不同部署约束。"
```
