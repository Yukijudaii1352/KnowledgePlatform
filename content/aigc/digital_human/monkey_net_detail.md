### Monkey-Net — 自监督关键点驱动的任意物体动画
```yaml
id: "monkey_net"
name: "Monkey-Net"
full_name: "任意物体动画化 (Animating Arbitrary Objects)"
year: "2019"
org: "Snap Inc."
paper_url: "https://arxiv.org/abs/1812.08861"
category: "talking_head"
parent: "face2face"
motivation: "自监督移动关键点学习实现通用动画"
```

#### 📝 一句话总结
Monkey-Net 用自监督方式从视频中学习“会动的关键点”，再把源图像外观和驱动视频运动组合起来，实现不依赖人工 landmark 的通用图像动画。

#### 🎯 核心要点
- **从显式人脸模型到通用物体**：不再要求 3DMM、blendshape 或人脸语义点，而是直接从同类视频中学习关键运动点。
- **自监督训练**：从同一视频采样 source frame 和 driving frame，模型必须用 source 外观重建 driving frame。
- **三段结构**：关键点检测器 \(\Delta\)、运动预测网络 \(M\)、图像生成器 \(G\)。
- **对 FOMM 的影响**：Monkey-Net 提出无监督关键点和 dense motion 的基本框架，FOMM 后续用一阶局部仿射运动提升了表达能力。

#### 🔬 深入细节
##### 核心示意图
![Monkey-Net architecture](https://ar5iv.labs.arxiv.org/html/1812.08861/assets/x2.png)

##### 方法拆解
Monkey-Net 的训练样本来自同一视频的两帧 \(x_s\) 和 \(x_d\)。由于两帧属于同一物体或同一身份，模型可以把 \(x_s\) 当作外观来源，把 \(x_d\) 当作运动目标，通过重建 \(x_d\) 自动学到哪些位置在运动中最有解释力。关键点不是人工标签，而是检测器为了降低重建误差主动发现的中间表示。

关键点检测器输出 \(K\) 个二维点：

$$
P_s=\Delta(x_s),\quad P_d=\Delta(x_d)
$$

运动预测网络根据源关键点和驱动关键点之间的位移估计稠密运动场 \(\hat{T}_{s\leftarrow d}\)。生成器再利用该运动场从源图像或源特征中采样，把源外观变形到目标姿态。相比只在稀疏点附近做局部贴图，dense motion 可以让脸颊、衣服、动物肢体等非关键点区域也产生连续变化。

为了避免关键点塌缩到无意义位置，训练通常引入等变性约束：对图像施加随机几何变换 \(T\) 后，关键点也应按同样方式变化：

$$
\Delta(T(x)) \approx T(\Delta(x))
$$

这个约束使关键点更像真实可跟踪的物体部件，而不是生成器内部任意编码。推理时，给定一张源图像和一段驱动视频，系统逐帧取驱动关键点并驱动源图像。若直接使用绝对关键点，源图像可能继承驱动主体的比例；使用相对位移可更好保留源主体形状。

##### 核心流程伪代码
```python
def train_monkey_net(video_batch):
    source, driving = sample_two_frames(video_batch)
    source_kp = keypoint_detector(source)
    driving_kp = keypoint_detector(driving)

    dense_motion = motion_predictor(source, source_kp, driving_kp)
    reconstruction = generator(source, dense_motion)

    loss = perceptual_loss(reconstruction, driving)
    loss += equivariance_loss(keypoint_detector, source)
    update(loss)


def animate(source_image, driving_video):
    source_kp = keypoint_detector(source_image)
    for frame in driving_video:
        driving_kp = keypoint_detector(frame)
        motion = motion_predictor(source_image, source_kp, driving_kp)
        yield generator(source_image, motion)
```

##### 贡献与不足
Monkey-Net 的关键贡献是把动画问题转成“学习可迁移运动表示”的问题。它不限定对象必须是人脸，因此能扩展到人体、动物或其他具有规律运动的类别。

不足在于关键点没有语义监督，稳定性和可控性不如人脸 landmark；当驱动运动超出源图像可见区域时，生成器需要凭训练先验补全，结果容易模糊。它的 dense motion 主要由关键点位移诱导，无法充分刻画局部旋转、尺度和非刚性形变，这正是 FOMM 引入一阶运动近似的原因。

#### 🧪 练习题
```yaml
question: "Monkey-Net 为什么能够在没有人工关键点标注的情况下学习运动关键点？"
options:
  - "因为训练目标要求用源帧外观重建同视频的驱动帧，关键点会被重建损失和等变性约束塑形"
  - "因为所有训练视频都提供了 3DMM 参数"
  - "因为模型只复制驱动帧像素，不需要学习中间表示"
  - "因为关键点固定为 MediaPipe 的 468 个点"
answer: 0
explanation: "Monkey-Net 依赖同视频帧重建和等变性约束自监督学习关键点，而不是使用人工 landmark。"
```
