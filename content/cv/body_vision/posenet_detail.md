### PoseNet — 姿态网络 (PoseNet)

```yaml
id: posenet
name: PoseNet
full_name: 姿态网络 (PoseNet)
year: '2018'
org: Google
paper_url: https://blog.tensorflow.org/2018/05/real-time-human-pose-estimation-in.html
category: pose
parent: openpose
motivation: 基于MobileNet实现浏览器端实时推理
```

#### 📝 一句话总结

PoseNet 将人体姿态估计模型移植到 TensorFlow.js，并采用适合移动端的 MobileNet 骨干，使单人和多人 2D 姿态估计可以直接在浏览器中实时运行。它用热图、offset 和多人体解码逻辑输出 17 个关键点，在隐私友好的客户端推理场景中普及了实时人体姿态交互。

#### 🎯 核心要点

- 浏览器端实时推理：通过 TensorFlow.js 在本地运行，视频帧和姿态数据不需要上传服务器
- MobileNet 轻量骨干：相比 ResNet 版本牺牲部分精度，换取更小模型和更低延迟
- 支持单人和多人两种 API：单人解码更快，多人解码能处理多个人同时出现的图像
- 17 个 COCO 风格关键点：包括鼻子、眼、耳、肩、肘、腕、髋、膝、踝等
- 核心输出为 heatmaps 与 offsets：热图定位粗网格位置，offset 把坐标校正回原图尺度
- output stride 控制速度/精度：常用 8、16、32，stride 越小输出分辨率越高但推理越慢
- 多人解码借鉴 PersonLab：使用贪心流程和 displacement vectors 沿人体部件图连接关键点
- 面向创意编程和交互应用：降低姿态估计部署门槛，适合网页、WebGL、教育和原型系统

#### 🔬 深入细节

##### 核心流程图

![PoseNet 单人检测流程](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgoLZnc6pMfM_3sbcBCwQ88Q2lnccp0WJWmBLqvtl_X1HbWf8KADUOl2v3kW7E6H33XjYfcAg3mE_BulL8UE243rGtYl8suFFYQpfYWDEUcshSTnKV-DI06k7wriol65gWkrqAOKbywjn4/s1600/c1.png)
*图：TensorFlow.js 官方 blog 给出的 PoseNet 单人姿态估计流程：图像进入 CNN，模型输出热图和 offset，再解码为关键点坐标。*

##### 算法伪代码

```python
# PoseNet 浏览器端推理伪代码
def posenet_estimate(video_frame, mode="single", output_stride=16):
    # Step 1: 图像缩放并送入 MobileNet/ResNet PoseNet
    heatmaps, offsets, displacements = posenet_model(
        video_frame,
        output_stride=output_stride
    )

    if mode == "single":
        # 对每个关键点类型在 heatmap 中取最大响应
        pose = []
        for part_id in range(17):
            y_h, x_h = argmax(heatmaps[:, :, part_id])
            dx = offsets[y_h, x_h, part_id]
            dy = offsets[y_h, x_h, part_id + 17]
            x = x_h * output_stride + dx
            y = y_h * output_stride + dy
            pose.append((part_id, x, y, heatmaps[y_h, x_h, part_id]))
        return [pose]

    # 多人模式：从高置信关键点开始，沿人体图用 displacement vectors 扩展
    poses = []
    root_candidates = priority_queue_from_heatmaps(heatmaps)
    while root_candidates and len(poses) < max_people:
        root = pop_highest_score(root_candidates)
        pose = decode_pose_by_graph(root, heatmaps, offsets, displacements)
        if not overlaps_existing_pose(pose, poses):
            poses.append(pose)
    return poses
```

##### 动机与背景

2018 年的 PoseNet 重点不是提出一个全新的学术姿态估计算法，而是把可用的人体姿态估计能力带到浏览器。此前 OpenPose 等系统已经证明多人姿态估计可行，但部署通常需要桌面 GPU、C++/Python 环境和服务端推理。Google Creative Lab 与 TensorFlow.js 团队的目标是让开发者用几行 JavaScript 在普通网页里调用人体关键点模型，服务创意编程、互动装置、教育和隐私敏感的本地推理。

PoseNet 因此选择 MobileNet 作为默认骨干。MobileNet 使用 depthwise separable convolution，大幅减少参数量和乘加量；这对浏览器 WebGL 后端和移动设备非常关键。官方说明中也提到 ResNet 版本精度更高，但页面加载和实时推理成本更大，所以 TensorFlow.js 首发版本更强调 MobileNet 的实用性。

##### Heatmap、Offset 与输出坐标

PoseNet 不直接回归每个关键点的原图坐标，而是先输出低分辨率热图。给定输入图像大小 \(N\) 和 output stride \(s\)，输出分辨率近似为：

$$
\text{resolution} = \left\lfloor \frac{N - 1}{s} \right\rfloor + 1
$$

热图大小为 \(\text{resolution} \times \text{resolution} \times 17\)，第 \(k\) 个通道表示第 \(k\) 类关键点出现在每个网格位置的概率。由于热图网格较粗，PoseNet 同时输出 offset tensor，大小为 \(\text{resolution} \times \text{resolution} \times 34\)，其中前 17 个通道是 \(x\) 偏移，后 17 个通道是 \(y\) 偏移。

若第 \(k\) 个关键点在热图中的最大响应位置为 \((x_h, y_h)\)，其原图坐标解码为：

$$
x = x_h \cdot s + O_x(x_h,y_h,k), \quad
y = y_h \cdot s + O_y(x_h,y_h,k)
$$

直觉上，heatmap 负责“在哪个格子附近”，offset 负责“格子内的精确位置”。这种设计比直接坐标回归更稳定，也比只用低分辨率热图取整更精确。

##### 单人模式与多人模式

单人模式假设画面中只有一个主要人体，解码逻辑简单：对 17 个关键点通道分别取最大响应，再加 offset 得到坐标。它速度快，适合摄像头前单人交互；但如果画面中有多人，可能把不同人的关键点合成同一副骨架。

多人模式更接近 bottom-up 解码。它从高置信关键点候选出发，沿人体部件图使用 displacement vectors 查找相邻关键点，并通过贪心过程生成多个 pose。官方 blog 指出多人算法主要借鉴 PersonLab 的 fast greedy decoding：计算量基本不随人数显著增加，但解码逻辑比单人模式复杂。

##### Output Stride 的速度/精度权衡

PoseNet 暴露 `outputStride` 作为核心参数，常见取值为 8、16、32。stride 越大，输出热图分辨率越低，模型越快但关键点定位越粗；stride 越小，热图分辨率更高，精度更好但耗时更高。为了在 stride 8 或 16 下保持感受野，模型使用 atrous convolution 调整后续层的卷积覆盖范围。

> 💡 关键：PoseNet 的工程价值在于把姿态估计拆成“轻量模型 + 可调 stride + 浏览器端解码 API”，让开发者可以按设备性能动态选择精度和延迟。

##### 与 OpenPose 的区别

OpenPose 的 PAF 是更完整的多人关联建模，目标是高质量多人姿态估计系统；PoseNet 的 2018 TensorFlow.js 版本更强调易用、轻量和浏览器实时性。两者都使用热图式关键点定位，也都支持多人组合，但 PoseNet 把复杂度隐藏在 JavaScript API 后面，并把模型选择和参数暴露给前端开发者。对交互应用来说，端侧运行和低部署成本往往比极限精度更重要。

#### 🧪 练习题

```yaml
question: "PoseNet 中 outputStride 参数主要影响什么？"
options:
  - "人体关键点类别数量"
  - "输出热图分辨率，从而影响速度与定位精度的权衡"
  - "是否启用浏览器摄像头权限"
  - "训练数据集中包含的人体数量"
answer: 1
explain: "outputStride 决定模型输出相对输入图像的下采样比例，stride 小热图更密、精度更高但更慢，stride 大则更快但更粗。"
```
