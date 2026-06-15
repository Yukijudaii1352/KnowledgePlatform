### YOLOv10: Real-Time End-to-End Object Detection

```yaml
id: yolov10
name: YOLOv10
full_name: "你只需要看一次v10 (You Only Look Once v10)"
year: "2024"
org: "清华大学"
paper_url: "https://arxiv.org/abs/2405.14458"
category: "one_stage"
parent: "yolov8"
motivation: "NMS-Free一致性双重分配"
```

#### 📝 一句话总结

YOLOv10 提出一致性双重标签分配，让 YOLO 在训练时保留 one-to-many 的丰富监督、推理时只使用 one-to-one 分支实现 NMS-free 检测。它还系统重设计分类头、下采样、基础块、卷积核和部分自注意力，把 YOLOv8 类基线推向端到端实时检测。

#### 🎯 核心要点

- **NMS-free 训练**：推理只保留 one-to-one 分支，每个目标输出一个高质量预测，避免 NMS 后处理延迟。
- **Dual assignments**：one-to-many 分支提供密集监督，one-to-one 分支学习唯一匹配，二者联合训练。
- **Consistent matching metric**：两分支使用一致的匹配度量，减少监督目标不一致。
- **轻量分类头**：分类 head 计算冗余大，YOLOv10 用 depthwise separable 设计降低延迟。
- **空间-通道解耦下采样**：将空间降采样和通道变换拆开，降低信息损失和计算冗余。
- **Rank-guided block design**：根据 intrinsic rank 判断各 stage 冗余，选择性替换为 CIB compact inverted block。
- **精度增强模块**：小模型使用 large-kernel depthwise conv，低分辨率 stage 使用 PSA partial self-attention。

#### 🔬 深入细节

##### 4.1 核心示意图

![YOLOv10 一致性双重分配](https://arxiv.org/html/2405.14458v1/x3.png)
*图：YOLOv10 的 consistent dual assignments。训练时 one-to-many 和 one-to-one 双分支共同学习，推理时只保留 one-to-one 分支以消除 NMS。*

##### 4.2 算法伪代码

```python
# YOLOv10 训练/推理伪代码
def train_yolov10(images, targets):
    feats = model.backbone_neck(images)
    pred_o2m = model.head_one_to_many(feats)
    pred_o2o = model.head_one_to_one(feats)

    match_o2m = assign_many(pred_o2m, targets, metric="consistent")
    match_o2o = assign_one(pred_o2o, targets, metric="consistent")

    loss = det_loss(pred_o2m, match_o2m) + det_loss(pred_o2o, match_o2o)
    loss.backward()

def infer_yolov10(image):
    feats = model.backbone_neck(image)
    pred = model.head_one_to_one(feats)
    return topk_decode(pred)  # no NMS
```

##### 4.3 方法解读

传统 YOLO 会产生大量重叠候选框，最后依靠 NMS 删除重复框。NMS 不是端到端可学习组件，并且在部署时引入额外延迟和硬件不友好的后处理。直接用 DETR 式 one-to-one matching 可以避免重复预测，但 YOLO 训练会失去 one-to-many 密集监督，收敛和精度受损。YOLOv10 的折中是训练用双分支，推理用单分支。

匹配度量一般由分类置信度和定位质量共同决定，可抽象为：

$$
m=\hat{p}^{\alpha}\cdot \text{IoU}(\hat{b},b)^{\beta}
$$

YOLOv10 的“consistent”在于 one-to-many 和 one-to-one 分支采用一致的 \(\alpha,\beta\) 匹配度量，使 one-to-one 学到的正样本与 one-to-many 的高质量候选保持一致。否则，两个分支会对“哪个候选最应该负责目标”产生冲突，降低 NMS-free 分支质量。

双分支训练可以理解为教师-辅助式监督：one-to-many 分支像传统 YOLO 一样给多个正样本梯度，帮助 backbone/neck 学到充分表征；one-to-one 分支学习每个目标唯一预测，最后用于推理。推理阶段删除 one-to-many 分支，也不需要 NMS：

$$
\text{Output}=\text{Decode}(\text{Head}_{1\to1}(\mathbf{F}))
$$

架构上，YOLOv10 不只改 label assignment。论文指出 YOLOv8 类模型在分类头、下采样和深层 stage 存在冗余，因此提出轻量分类头、spatial-channel decoupled downsampling、rank-guided CIB。对精度侧，小模型在深层使用 large-kernel depthwise conv 扩大感受野；PSA 只对部分通道做自注意力，并放在低分辨率 stage，降低二次复杂度开销。

> 💡 关键：YOLOv10 的 NMS-free 不是简单删掉 NMS，而是让训练目标提前学会“一目标一预测”，同时保留传统 YOLO 密集监督带来的收敛优势。

##### 4.4 与 YOLOv8 的区别

YOLOv8 的 anchor-free split head 仍输出多候选框并依赖 NMS；YOLOv10 在 YOLOv8 类基线上加入 one-to-one 推理分支，解决部署端 NMS 延迟。YOLOv10 还通过模型结构审计去掉冗余组件，因此不仅端到端，也更强调真实 latency，而不是只看 FLOPs。

#### 🧪 练习题

```yaml
question: "YOLOv10 为什么同时使用 one-to-many 和 one-to-one 分支训练？"
options:
  - "one-to-many 用于提供丰富监督，one-to-one 用于推理时避免重复预测和 NMS"
  - "one-to-many 只用于图像分类，one-to-one 只用于语义分割"
  - "两者用于生成 anchor box 的不同长宽比"
  - "为了在推理时同时执行两次 NMS"
answer: 0
explain: "YOLOv10 用 one-to-many 保持 YOLO 的密集训练信号，用 one-to-one 学习每个目标唯一预测，推理只保留 one-to-one 分支实现 NMS-free。"
```
