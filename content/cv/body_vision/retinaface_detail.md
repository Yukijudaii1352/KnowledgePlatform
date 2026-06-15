### RetinaFace

```yaml
id: retinaface
name: RetinaFace
full_name: "视网膜人脸 (RetinaFace)"
year: "2019"
org: "深睿医疗"
paper_url: "http://openaccess.thecvf.com/content_CVPR_2019/html/Deng_RetinaFace_Single-Shot_Multi-Level_Face_Localisation_in_the_Wild_CVPR_2019_paper.html"
category: "face"
parent: "mtcnn"
motivation: "单阶段多任务检测器引入像素级面部监督"
```

#### 📝 一句话总结

RetinaFace 在单阶段 FPN 人脸检测器上同时预测人脸框、五点 landmarks 和自监督稠密 3D 面部对应，把检测、粗对齐与像素级定位统一成多任务 anchor 回归问题。

#### 🎯 核心要点

- **链接补足**：用户给定 CVPR 2019 路径不可访问；论文正式公开页为 CVPR 2020，arXiv 为 `1905.00641`
- **单阶段密集检测**：基于 RetinaNet/FPN 风格多尺度 anchor，在 P2-P6 上覆盖小脸到大脸
- **多任务 head**：每个正 anchor 输出 face score、bounding box、五点 landmarks 和 dense 3D face vertices
- **额外五点标注**：在 WIDER FACE 上人工标注大量五点 landmarks，显著提升 hard subset 检测
- **自监督 mesh decoder**：用图卷积 mesh decoder 和可微渲染器生成 3D dense branch 的像素监督
- **上下文模块与 DCN**：在 feature pyramid 上加入 context module，并用 deformable convolution 增强几何适应性
- **识别前端收益**：替换 MTCNN 后，ArcFace 在 CFP-FP、IJB-C 等大姿态验证上进一步提升

#### 🔬 深入细节

![RetinaFace 框架图](https://ar5iv.labs.arxiv.org/html/1905.00641/assets/figure/framework.png)
*图：RetinaFace 使用多尺度 FPN 和 context module，在每个 anchor 上计算多任务损失。*

![RetinaFace 多任务损失](https://ar5iv.labs.arxiv.org/html/1905.00641/assets/figure/multitaskloss.png)
*图：正 anchor 同时监督分类、框回归、五点关键点和稠密 3D face regression。*

```python
# RetinaFace 训练伪代码
for image, boxes, landmarks in widerface_loader:
    feats = fpn_backbone(image)          # P2-P6
    preds = detection_heads(context_modules(feats))
    anchors = match_anchors(preds.anchors, boxes, pos_iou=0.5, neg_iou=0.4)
    loss = softmax_face_loss(preds.cls, anchors.labels)
    for a in positive_anchors(anchors):
        loss += lambda_box * smooth_l1(preds.box[a], encode_box(boxes[a]))
        loss += lambda_pts * smooth_l1(preds.landmark[a], encode_landmarks(landmarks[a]))
        rendered = mesh_decoder_and_renderer(preds.mesh[a], camera=preds.camera[a])
        loss += lambda_pix * pixel_dense_loss(rendered, crop(image, a))
    optimize(ohem(loss, neg_pos_ratio=3))
```

**动机与背景。** MTCNN 通过级联结构联合检测和五点对齐，但在密集小脸、遮挡和高分辨率场景下，滑窗级联和少量 landmarks 的表达能力有限。RetinaFace 站在单阶段目标检测发展之后，利用 FPN 的多尺度特征和 anchor 密集采样，把人脸定位扩展为更广义的 face localisation：不仅有框，还要有五点关键点和稠密面部几何。

**多任务损失。** 对每个训练 anchor，RetinaFace 最小化：

$$
\mathcal{L}=L_{\text{cls}}+\lambda_1 p^*L_{\text{box}}+\lambda_2 p^*L_{\text{pts}}+\lambda_3 p^*L_{\text{pixel}}
$$

其中 \(p^*=1\) 表示正 anchor。负 anchor 只计算分类损失；正 anchor 同时计算框、五点和稠密分支。论文设置 \(\lambda_1,\lambda_2,\lambda_3\) 约为 0.25、0.1、0.01，以强调框和关键点定位。

**为什么 landmarks 能提升检测。** 小脸检测难点不仅是分类，还包括边框定位不稳定。五点 landmarks 提供了更强的结构监督：如果模型知道眼、鼻、嘴的大致位置，它对人脸区域的定位会更准确，也更不容易被背景纹理误导。论文在 WIDER FACE 上额外标注五点 landmarks，并观察到 hard subset AP/mAP 明显提升。

**稠密 3D 分支。** 真实 WIDER FACE 没有稠密 3D 标注，RetinaFace 通过 mesh decoder 和可微渲染器做自监督：检测头预测 mesh/camera/illumination 等隐变量，渲染回 2D 人脸 crop，再用像素差异约束。这个分支并不一定让所有稠密对齐都达到专门 3D 对齐模型的精度，但它提供了类似 attention 的面部区域结构监督，进一步帮助检测。

**架构与训练细节。** RetinaFace 使用 ResNet + FPN，P2 到 P6 覆盖不同尺度，P2 专门照顾 tiny faces。每个 pyramid level 后接独立 context module 扩大感受野，并在 lateral/context 模块中引入 deformable convolution。训练时正负 anchor 根据 IoU 匹配，使用 OHEM 处理大量负样本，数据增强包含随机裁剪、翻转和颜色扰动。

**与 MTCNN 的区别。** MTCNN 是级联候选框框架，关键点输出主要服务粗对齐；RetinaFace 是单阶段密集 anchor 检测器，利用 FPN、context、OHEM 和多任务监督获得更强小脸检测能力。对于 ArcFace 等识别模型，RetinaFace 提供更稳定的检测和五点对齐，尤其改善 profile face 和低质量场景。

#### 🧪 练习题

```yaml
question: "RetinaFace 相比 MTCNN 的关键升级是什么？"
options:
  - "把人脸识别损失换成 triplet loss"
  - "在单阶段 FPN 检测器中联合框、五点 landmarks 和稠密 3D 面部监督"
  - "只检测正脸，不处理小脸"
  - "用文本提示控制人脸动作"
answer: 1
explain: "RetinaFace 是单阶段多尺度密集检测器，额外使用 landmarks 和稠密 3D 分支作为定位监督。"
```
