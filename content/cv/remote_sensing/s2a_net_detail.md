### S2A-Net

```yaml
id: s2a_net
name: S2A-Net
full_name: "单阶段对齐网络 (Single-Shot Alignment Network)"
year: "2021"
org: "Various Institutions"
paper_url: "https://ieeexplore.ieee.org/abstract/document/9377550/"
category: "object_detection"
parent: "gliding_vertex"
motivation: "单阶段特征对齐解决分类定位失调"
```

#### 📝 一句话总结

S2A-Net 在单阶段旋转目标检测中加入特征对齐模块和方向检测模块，用精炼旋转锚框指导 AlignConv 采样，再用方向敏感/方向不变特征分别服务回归和分类，解决航拍目标锚框、特征与定位质量错位的问题。

#### 🎯 核心要点

- 基础框架：RetinaNet/FPN 式单阶段检测器，每个位置只保留一个正方形初始锚框。
- Feature Alignment Module：Anchor Refinement Network 先生成高质量旋转锚框，再用 Alignment Convolution 让采样点贴合目标方向。
- Alignment Convolution：偏移量由旋转锚框几何显式计算，而不是完全学习得到。
- Oriented Detection Module：使用 Active Rotating Filters 编码方向，输出方向敏感特征和方向不变特征。
- 分支解耦：方向敏感特征用于回归，方向不变特征用于分类，缓解分类分数与定位精度不一致。
- 评测数据：DOTA 与 HRSC2016，论文报告在精度与速度上优于多种两阶段和单阶段旋转检测器。
- 官方代码：`https://github.com/csuhan/s2anet`。

#### 🔬 深入细节

![S2A-Net 总体架构](https://ar5iv.labs.arxiv.org/html/2008.09397/assets/x3.png)
*图：S2A-Net 由 backbone、FPN、FAM 和 ODM 构成；FAM 负责锚框与特征对齐，ODM 负责方向感知检测。*

##### 算法伪代码

```python
def s2anet_forward(image):
    pyramids = fpn(backbone(image))
    results = []

    for feat, stride in pyramids:
        # FAM: 先把单个正方形锚框精炼为旋转锚框
        refined_anchor = anchor_refinement_network(feat)
        offsets = geometry_offsets(refined_anchor, stride, kernel_size=3)
        aligned_feat = align_conv(feat, offsets)

        # ODM: 方向编码，并拆分分类/回归适合的特征
        orient_feat = active_rotating_filters(aligned_feat, num_orient=8)
        cls_feat = orientation_pooling(orient_feat)   # 方向不变，适合分类
        reg_feat = orient_feat                        # 方向敏感，适合定位

        cls_score = cls_head(cls_feat)
        box_delta = reg_head(reg_feat)
        results.append(decode(cls_score, box_delta, refined_anchor))

    return rotated_nms(results)
```

##### 方法解读

航拍图像目标方向任意且常密集排列。传统单阶段检测器用固定水平卷积特征预测旋转框，会出现两个错位：初始锚框与真实目标方向/长宽比错位；卷积采样网格与旋转目标区域错位。结果是分类分数高的框未必定位准，NMS 会错误保留或删除框。

FAM 先用 ARN 从一个简单正方形锚框回归到旋转锚框 \((x,y,w,h,\theta)\)。这一步避免手工枚举大量尺度、比例和角度锚框。随后 AlignConv 根据旋转锚框几何计算 \(k\times k\) 采样点：

$$
\mathcal{L}_{p}^{r}=\frac{1}{S}\left(x+\frac{1}{k}(w,h)\cdot r\cdot R^T(\theta)\right)
$$

偏移量是旋转采样点与普通卷积网格的差：

$$
o=\mathcal{L}_{p}^{r}-(p+r)
$$

这和 Deformable Conv 的区别在于：AlignConv 的偏移来自检测框几何，目标明确是“采到旋转目标内部”，而不是完全由网络从数据中学习偏移。

ODM 继续处理分类与定位的不同需求。Active Rotating Filters 生成 \(N\) 个方向通道，默认 \(N=8\)。回归需要知道目标朝向，因此保留方向敏感特征；分类更希望同一类飞机/船舶不因旋转而变成不同模式，因此对方向通道池化，得到方向不变特征。

损失由 FAM 阶段回归、最终分类和最终旋转框回归组成。分类通常使用 Focal Loss，回归使用 Smooth L1：

$$
\mathcal{L}=\frac{1}{N_f}\mathcal{L}_{FAM}+\frac{1}{N_o}(\mathcal{L}_{cls}+\lambda\mathcal{L}_{reg})
$$

相比 Gliding Vertex 的“轻量表征改造”，S2A-Net 更进一步把特征采样也对齐到旋转目标上；相比 RoI Transformer，它保留单阶段流水线，速度更友好。

> 💡 关键：S2A-Net 的核心不是“预测旋转框”本身，而是让用于预测旋转框的特征也按旋转框对齐。

#### 🧪 练习题

```yaml
question: "S2A-Net 中 AlignConv 的偏移量主要来自哪里？"
options:
  - "随机初始化的可学习位置编码"
  - "精炼旋转锚框的几何形状、尺度和角度"
  - "文本提示中的方向词"
  - "分类分支输出的类别概率"
answer: 1
explain: "AlignConv 根据 ARN 预测的旋转锚框显式计算采样网格偏移，使卷积采样与目标方向对齐。"
```
