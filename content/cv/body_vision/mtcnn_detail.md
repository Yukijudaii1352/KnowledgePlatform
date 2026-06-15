### MTCNN

```yaml
id: mtcnn
name: MTCNN
full_name: "多任务级联网络 (Multi-task Cascaded CNN)"
year: "2016"
org: "中科院"
paper_url: "https://arxiv.org/abs/1604.02878"
category: "face"
parent: "deepface"
motivation: "三级级联CNN同时完成检测回归与对齐"
```

#### 📝 一句话总结

MTCNN 用 P-Net、R-Net、O-Net 三阶段级联 CNN 同时做人脸分类、边框回归和五点关键点定位，将候选框从粗到细筛选并对齐，成为轻量实时人脸检测与对齐前端。

#### 🎯 核心要点

- **三阶段 cascade**：P-Net 快速产生候选框，R-Net 过滤和校正候选框，O-Net 输出最终框与五点 landmarks
- **多任务监督**：每个阶段共享卷积特征，同时优化 face/non-face 分类、bounding box regression、landmark localization
- **图像金字塔**：对输入多尺度缩放，P-Net 以全卷积方式扫描不同尺度人脸
- **NMS 级联去重**：每阶段用非极大值抑制合并高重叠候选框
- **Online Hard Sample Mining**：训练时按损失选择难样本，让模型自动聚焦误检和难对齐样本
- **实时性**：网络小、级联过滤强，能在 FDDB、WIDER FACE、AFLW 上保持较高精度和实时速度

#### 🔬 深入细节

![MTCNN 官方检测示例](https://raw.githubusercontent.com/kpzhang93/MTCNN_face_detection_alignment/master/paper/examples.png)
*图：官方仓库展示的 FDDB 与 WIDER FACE 检测/五点对齐结果；框和关键点来自三阶段级联输出。*

```python
# MTCNN 推理伪代码
def mtcnn_detect(image):
    pyramid = build_image_pyramid(image)
    candidates = []
    for scaled in pyramid:
        score_map, bbox_reg = PNet(scaled)
        boxes = generate_boxes(score_map, bbox_reg, threshold=t1)
        candidates.extend(nms(boxes))

    crops = crop_and_resize(image, candidates, size=24)
    scores, bbox_reg = RNet(crops)
    candidates = calibrate(candidates, bbox_reg)
    candidates = nms(filter_by_score(candidates, scores, t2))

    crops = crop_and_resize(image, candidates, size=48)
    scores, bbox_reg, landmarks = ONet(crops)
    boxes = calibrate(candidates, bbox_reg)
    boxes = nms(filter_by_score(boxes, scores, t3), mode="min")
    return boxes, landmarks
```

**动机与背景。** 传统人脸检测和对齐常分开做：先用检测器找框，再用对齐模型定位眼、鼻、嘴。问题是两者强相关，检测框的偏差会影响关键点，关键点信息也能帮助判断一个候选是否真是人脸。MTCNN 的核心思想是把这两类任务放进同一个级联系统里，让共享特征同时服务检测和对齐。

**三级级联机制。** P-Net 是 Proposal Network，输入图像金字塔，以全卷积方式快速给出大量候选框和粗略框回归。R-Net 是 Refine Network，对 P-Net 裁剪出的候选窗口做更强的二分类和框校正，过滤大批误检。O-Net 是 Output Network，容量更大，输出最终人脸分数、边框回归和五个关键点。三阶段都执行 NMS 和 bounding box calibration，因此框会逐步收紧。

**多任务损失。** 对样本 \(i\)，MTCNN 的总损失可以概括为：

$$
\mathcal{L}=\sum_i \left(\alpha_{\text{det}}L_i^{\text{det}}+\alpha_{\text{box}}L_i^{\text{box}}+\alpha_{\text{lm}}L_i^{\text{lm}}\right)
$$

其中检测使用交叉熵，边框和 landmarks 使用欧氏回归损失。不同训练样本承担不同任务：positive/negative 样本主要用于分类，part face 样本用于框回归，landmark face 样本用于关键点定位。这样避免给没有关键点标注的样本强行计算 landmark loss。

**Online Hard Sample Mining。** 级联检测面对极端类别不平衡：绝大多数窗口不是人脸，简单样本会主导训练。MTCNN 在 mini-batch 内前向计算所有样本损失，然后只选损失最高的一部分反向传播。这个过程不需要人工维护 hard example 集合，能随模型训练状态动态调整。

**与 DeepFace/FaceNet 的关系。** DeepFace 和 FaceNet 的主要任务是人脸表示学习，但都需要稳定的人脸裁剪与对齐前端。MTCNN 解决的正是这个前端问题：输出框和五点关键点后，可进行相似变换对齐，再送入 FaceNet、ArcFace 等识别模型。它的价值不在于识别嵌入，而在于快速、统一地提供检测和粗对齐。

**局限。** MTCNN 是级联滑窗思路，面对密集小脸、极端遮挡和超高分辨率场景时，后来的单阶段密集检测器 RetinaFace 通常更稳。它也只输出五点 landmarks，无法提供 RetinaFace/3DDFA 那样的稠密人脸几何。

#### 🧪 练习题

```yaml
question: "MTCNN 中 P-Net、R-Net、O-Net 的级联设计主要解决什么问题？"
options:
  - "把人脸识别嵌入压缩到 128 字节"
  - "先快速产生候选，再逐级过滤、校正并输出关键点，提高速度和精度"
  - "用 3DMM 生成大姿态训练样本"
  - "直接生成说话人头像视频"
answer: 1
explain: "级联结构让浅层网络承担高召回候选生成，后续网络只处理少量候选，从而兼顾实时性和定位精度。"
```
