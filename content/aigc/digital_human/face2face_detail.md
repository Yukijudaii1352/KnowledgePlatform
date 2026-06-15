### Face2Face — 实时 RGB 面部重演
```yaml
id: "face2face"
name: "Face2Face"
full_name: "实时面部重演 (Real-time Face Capture and Reenactment)"
year: "2016"
org: "斯坦福/纽伦堡大学"
paper_url: "https://openaccess.thecvf.com/content_cvpr_2016/html/Thies_Face2Face_Real-Time_Face_CVPR_2016_paper.html"
category: "talking_head"
parent: "—"
motivation: "首个实时RGB视频面部重演系统"
```

#### 📝 一句话总结
Face2Face 把单目 RGB 视频中的源人物表情实时转移到目标人物视频上，用显式 3D 人脸模型、在线跟踪、表情变形迁移和嘴部检索共同完成早期高质量 talking-head 重演。

#### 🎯 核心要点
- **问题定义**：输入源演员与目标演员的普通 RGB 视频，实时估计源表情并驱动目标视频中的同一身份说出或做出新的表情。
- **核心思想**：先为目标估计身份、反照率和光照，再在线求解每帧表情参数；重演时只替换表达相关的 blendshape 系数，保持目标身份、姿态和场景一致。
- **关键模块**：非刚性模型拟合、稠密光度跟踪、稀疏 landmark 约束、blendshape deformation transfer、嘴部内腔检索与无缝融合。
- **历史位置**：它不是神经生成模型，而是将传统 3DMM/optimization 系统工程做到实时，对后续 Face2Face-style reenactment、FOMM 和音频驱动头像有重要启发。

#### 🔬 深入细节
##### 核心示意图
论文主页可访问，但部分原图直链不稳定；这里使用公开 ar5iv 页面中可访问的 Face2Face pipeline 图作为框架图。

![Face2Face pipeline](https://ar5iv.labs.arxiv.org/html/2007.14808/assets/images/pipeline2.jpg)

##### 方法拆解
Face2Face 使用参数化人脸模型描述几何形状，通常可以写成身份与表情的线性可加形式：

$$
M_{geo}(\alpha,\delta)=\bar{M}+B_{id}\alpha+B_{exp}\delta
$$

其中 \(\alpha\) 表示目标人物身份，\(\delta\) 表示当前表情。系统离线阶段会通过非刚性 model-based bundling 从目标视频中恢复较稳定的身份、纹理/反照率与光照估计；在线阶段则在每一帧快速优化姿态、表情和少量光照，使合成脸能够贴合输入视频。

在线跟踪的目标函数由光度项、landmark 项、正则项和时间平滑项组成：

$$
E_{track}=E_{photo}+\lambda_{lan}E_{lan}+\lambda_{reg}E_{reg}+\lambda_{temp}E_{temp}
$$

光度项约束渲染图像和真实帧在可见区域的颜色一致，landmark 项抑制纯光度优化在快速运动和遮挡下的漂移，正则项避免身份/表情系数落到不可信区域，时间项让连续帧参数更平滑。由于每帧都依赖上一帧初始化，并且只优化低维参数，该系统可以接近实时运行。

表情转移不是直接拷贝像素，而是在源和目标的 blendshape 空间中做 deformation transfer。源视频估计出的表达变化会被映射到目标身份上，目标仍保留自己的头部姿态、肤色、光照和背景。随后系统重新渲染目标脸部，并与原视频融合。

嘴部区域是系统最脆弱的部分，因为牙齿、舌头和口腔内部很难由简单 3DMM 正确建模。Face2Face 为目标视频建立 mouth interior database，根据当前口型和时间连续性检索合适的嘴部纹理，再和重演结果融合。这让它在 2016 年的实时场景下获得了比单纯渲染更自然的口腔细节。

##### 核心流程伪代码
```python
def face2face_reenact(source_video, target_video):
    target_identity = bundle_fit_identity(target_video)
    target_reflectance, target_lighting = estimate_appearance(target_video, target_identity)
    mouth_database = build_target_mouth_database(target_video, target_identity)

    for src_frame, tgt_frame in stream(source_video, target_video):
        src_params = track_rgb_frame(src_frame)
        tgt_params = track_rgb_frame(tgt_frame, identity=target_identity)

        transferred_expr = deformation_transfer(
            source_expression=src_params.expression,
            target_identity=target_identity,
        )
        reenacted_mesh = render_target_face(
            identity=target_identity,
            expression=transferred_expr,
            pose=tgt_params.pose,
            lighting=target_lighting,
        )
        mouth = retrieve_mouth_texture(mouth_database, transferred_expr, prev_choice=True)
        output = composite_face_and_mouth(tgt_frame, reenacted_mesh, mouth)
        yield output
```

##### 优势与局限
Face2Face 的优势是可解释、可控、实时，并且不需要大规模神经网络训练。它直接显式操控表情参数，所以适合早期实时交互和可视化研究。

局限也来自同一套显式建模假设：系统依赖人脸跟踪质量，难以处理大遮挡、极端姿态、复杂头发和非刚性皮肤细节。身份纹理主要来自目标视频，重演的真实感受目标素材覆盖度影响明显。和后来的扩散模型或神经渲染方法相比，它的生成能力较弱，但工程闭环非常清晰。

#### 🧪 练习题
```yaml
question: "Face2Face 中嘴部内腔检索模块主要解决什么问题？"
options:
  - "让目标人物的身份参数完全等于源人物"
  - "弥补 3DMM 难以真实建模牙齿、舌头和口腔内部的问题"
  - "把 RGB 视频转换为语音特征"
  - "训练一个扩散模型预测整帧图像"
answer: 1
explanation: "Face2Face 的口腔内部细节难以由低维 3D 人脸模型渲染，因此从目标视频数据库中检索合适嘴部纹理并融合。"
```
