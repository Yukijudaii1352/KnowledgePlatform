---
domain: aigc
topic_id: digital_human
topic_name: 数字人
page_icon: 👤
page_title: 数字人 算法总结
page_subtitle: '{build_date} 版'
page_desc: 从基于GAN的动作迁移到神经辐射场驱动，再到扩散模型与DiT架构下的实时全身生成，数字人技术经历了传统参数化驱动、神经渲染与GAN、生成式大模型三大演进阶段。2026年，DiT架构统治地位确立，3DGS与扩散模型融合实现75FPS实时渲染，原生音视频同步生成成为前沿趋势。
hero_pills:
- 数字形象驱动 · 口型同步 · 表情合成 · 全身动作
count_pill: '{count} 个算法'
categories:
  talking_head:
    label: 数字形象驱动
    color: '#E3F2FD'
  lip_sync:
    label: 口型同步
    color: '#E8F5E9'
  expression:
    label: 表情合成
    color: '#FFF3E0'
  body_motion:
    label: 全身动作
    color: '#F3E5F5'
  foundation:
    label: 基础模型
    color: '#FCE4EC'
image_base: ../../content/aigc/digital_human/assets/
---

## 领域综述

!INCLUDE_RAW ../../temp/content_survey_bulk_20260614_174337/researcher_output/aigc/digital_human/overview/zhihu__[aigc杂谈4][阅读笔记][数字人-Talking_Head_Synthesis_综述]__8808ea00/article.md

## 最新进展综述

!INCLUDE_RAW ../../temp/content_survey_bulk_20260614_174337/researcher_output/aigc/digital_human/latest/zhihu__CVPR_2025_三篇论文直击3D数字人“真实感”痛点：从人-物交互、可解耦生成到可信评估__6531ceeb/article.md

## 算法演化关系

```yaml
nodes:
- id: face2face
  x: 150
  y: 150
  category: talking_head
- id: monkey_net
  x: 350
  y: 150
  category: talking_head
- id: fomm
  x: 350
  y: 185
  category: talking_head
- id: head2head
  x: 450
  y: 150
  category: talking_head
- id: megaportraits
  x: 650
  y: 150
  category: talking_head
- id: liveportrait
  x: 850
  y: 150
  category: talking_head
- id: emo
  x: 850
  y: 185
  category: talking_head
- id: hallo
  x: 850
  y: 185
  category: talking_head
- id: hallo2
  x: 950
  y: 150
  category: talking_head
- id: aniportrait
  x: 850
  y: 185
  category: talking_head
- id: echomimic
  x: 950
  y: 185
  category: talking_head
- id: vasa1
  x: 850
  y: 185
  category: talking_head
- id: vasa3d
  x: 1050
  y: 150
  category: talking_head
- id: sonic
  x: 950
  y: 185
  category: talking_head
- id: teller
  x: 950
  y: 185
  category: talking_head
- id: read
  x: 950
  y: 185
  category: talking_head
- id: dimitra
  x: 950
  y: 185
  category: talking_head
- id: edityourself
  x: 1050
  y: 185
  category: talking_head
- id: mmface_dit
  x: 1050
  y: 185
  category: talking_head
- id: rap
  x: 1050
  y: 185
  category: talking_head
- id: syncnet
  x: 150
  y: 300
  category: lip_sync
- id: wav2lip
  x: 450
  y: 300
  category: lip_sync
- id: makeittalk
  x: 450
  y: 335
  category: lip_sync
- id: audio2head
  x: 550
  y: 300
  category: lip_sync
- id: difftalk
  x: 750
  y: 300
  category: lip_sync
- id: latentsync
  x: 850
  y: 300
  category: lip_sync
- id: audio2face3d
  x: 950
  y: 300
  category: lip_sync
- id: flame
  x: 250
  y: 400
  category: expression
- id: deca
  x: 550
  y: 400
  category: expression
- id: sadtalker
  x: 750
  y: 400
  category: expression
- id: dreamtalk
  x: 750
  y: 435
  category: expression
- id: facetalk
  x: 850
  y: 400
  category: expression
- id: realtalk
  x: 950
  y: 400
  category: expression
- id: gphm
  x: 850
  y: 435
  category: expression
- id: smpl
  x: 50
  y: 500
  category: body_motion
- id: groovenet
  x: 250
  y: 500
  category: body_motion
- id: smplx
  x: 350
  y: 500
  category: body_motion
- id: aistpp
  x: 550
  y: 500
  category: body_motion
- id: mdm
  x: 650
  y: 500
  category: body_motion
- id: lda
  x: 750
  y: 500
  category: body_motion
- id: cyberhost
  x: 950
  y: 500
  category: body_motion
- id: humandit
  x: 950
  y: 535
  category: body_motion
- id: motiongpt3
  x: 950
  y: 535
  category: body_motion
- id: unimotion
  x: 950
  y: 535
  category: body_motion
- id: motion_agent
  x: 950
  y: 535
  category: body_motion
- id: dartcontrol
  x: 950
  y: 535
  category: body_motion
- id: energymogen
  x: 950
  y: 535
  category: body_motion
- id: persona
  x: 1050
  y: 500
  category: body_motion
- id: taoavatar
  x: 1050
  y: 535
  category: body_motion
edges:
- from: face2face
  to: monkey_net
  label: 通用化
- from: monkey_net
  to: fomm
  label: 运动场
- from: fomm
  to: head2head
  label: 神经合成
- from: head2head
  to: megaportraits
  label: 高分辨率
- from: megaportraits
  to: liveportrait
  label: 高效控制
- from: fomm
  to: emo
  label: 端到端
- from: emo
  to: hallo
  label: 分层注入
- from: hallo
  to: hallo2
  label: 长视频
- from: emo
  to: aniportrait
  label: 双条件
- from: aniportrait
  to: echomimic
  label: 可编辑
- from: emo
  to: vasa1
  label: 实时性
- from: vasa1
  to: vasa3d
  label: 3DGS
- from: hallo
  to: sonic
  label: 全局感知
- from: vasa1
  to: teller
  label: 流式生成
- from: vasa1
  to: read
  label: 异步调度
- from: emo
  to: dimitra
  label: cMDT
- from: emo
  to: edityourself
  label: 视频编辑
- from: vasa1
  to: mmface_dit
  label: 多模态
- from: vasa1
  to: rap
  label: Video DiT
- from: syncnet
  to: wav2lip
  label: 同步损失
- from: wav2lip
  to: makeittalk
  label: 身份解耦
- from: makeittalk
  to: audio2head
  label: 姿态生成
- from: wav2lip
  to: difftalk
  label: 扩散范式
- from: difftalk
  to: latentsync
  label: 潜在修正
- from: latentsync
  to: audio2face3d
  label: LLM集成
- from: flame
  to: deca
  label: 细节重建
- from: deca
  to: sadtalker
  label: 运动系数
- from: sadtalker
  to: dreamtalk
  label: 情感控制
- from: dreamtalk
  to: facetalk
  label: NPHM驱动
- from: facetalk
  to: realtalk
  label: 情绪感知
- from: flame
  to: gphm
  label: 3DGS表征
- from: smpl
  to: groovenet
  label: 音乐驱动
- from: smpl
  to: smplx
  label: 表达扩展
- from: groovenet
  to: aistpp
  label: 数据集
- from: smplx
  to: mdm
  label: 扩散生成
- from: mdm
  to: lda
  label: 手势生成
- from: lda
  to: cyberhost
  label: 全身生成
- from: mdm
  to: humandit
  label: DiT架构
- from: mdm
  to: motiongpt3
  label: LLM融合
- from: mdm
  to: unimotion
  label: 双向统一
- from: motiongpt3
  to: motion_agent
  label: 对话生成
- from: mdm
  to: dartcontrol
  label: AR混合
- from: mdm
  to: energymogen
  label: 能量基
- from: cyberhost
  to: persona
  label: 衣物形变
- from: persona
  to: taoavatar
  label: 轻量化
milestones:
- fomm
- wav2lip
- emo
```

## 核心算法

### Face2Face

```yaml
id: face2face
num: 1
name: Face2Face
full_name: 实时面部重演 (Real-time Face Capture and Reenactment)
year: '2016'
org: 斯坦福/纽伦堡大学
parent: —
paper_url: https://openaccess.thecvf.com/content_cvpr_2016/html/Thies_Face2Face_Real-Time_Face_CVPR_2016_paper.html
project_url: ''
category: talking_head
motivation: 首个实时RGB视频面部重演系统
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

### Monkey-Net

```yaml
id: monkey_net
num: 2
name: Monkey-Net
full_name: 任意物体动画化 (Animating Arbitrary Objects)
year: '2019'
org: Snap Inc.
parent: face2face
paper_url: https://arxiv.org/abs/1812.08861
project_url: ''
category: talking_head
motivation: 自监督移动关键点学习实现通用动画
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

### FOMM

```yaml
id: fomm
num: 3
name: FOMM
full_name: 一阶运动模型 (First Order Motion Model)
year: '2019'
org: Snap Inc.
parent: monkey_net
paper_url: https://arxiv.org/abs/2003.00196
project_url: ''
category: talking_head
motivation: 一阶泰勒近似运动场实现单图驱动
```

#### 📝 一句话总结
FOMM 在 Monkey-Net 的无监督关键点框架上加入局部仿射 Jacobian，用一阶泰勒近似构造更精细的稠密运动场，从而实现经典的一张图驱动视频动画。

#### 🎯 核心要点
- **关键改进**：每个关键点不只提供位置，还提供局部 Jacobian，能表达旋转、缩放和剪切等局部一阶运动。
- **运动建模**：为每个关键点构造一个候选变换，再由 dense motion network 预测软掩码混合这些变换。
- **遮挡处理**：输出 occlusion map，告诉生成器哪些源特征可信、哪些区域需要补全。
- **训练方式**：仍然使用同视频帧重建和等变性约束，无需人工关键点。

#### 🔬 深入细节
##### 核心示意图
![FOMM overview](https://ar5iv.labs.arxiv.org/html/2003.00196/assets/x5.png)

##### 方法拆解
FOMM 的核心观察是：只用关键点位移描述运动过于粗糙。真实面部或人体运动在关键点附近不只是平移，还包含局部旋转、缩放和非刚性变形。因此论文把局部运动写成一阶泰勒展开，关键点 \(p_k\) 附近的变换由位置和 Jacobian 共同决定。

对第 \(k\) 个关键点，源到驱动的候选反向变换可写成：

$$
T_{s\leftarrow d,k}(z)=p_{s,k}+J_{s,k}J_{d,k}^{-1}(z-p_{d,k})
$$

其中 \(p_{s,k},p_{d,k}\) 是源帧和驱动帧的关键点位置，\(J_{s,k},J_{d,k}\) 是对应局部仿射矩阵。这个公式让局部区域可以随驱动帧发生旋转和形变，而不只是围绕关键点平移。

Dense motion network 会接收所有候选变换后的源图像/特征，并预测每个像素属于哪个局部运动的软掩码 \(M_k(z)\)。最终稠密运动场是多个候选场的加权和：

$$
\hat{T}_{s\leftarrow d}(z)=\sum_{k=0}^{K}M_k(z)T_{s\leftarrow d,k}(z)
$$

其中 \(k=0\) 常表示背景恒等变换。由于驱动姿态可能暴露源图像中不存在的区域，网络还会预测遮挡图 \(\hat{O}\)，生成器据此决定哪些 warping 特征可用，哪些需要由生成先验补全。

##### 核心流程伪代码
```python
def fomm_forward(source, driving):
    kp_s, jac_s = keypoint_detector(source)
    kp_d, jac_d = keypoint_detector(driving)

    candidate_flows = [identity_flow()]
    for k in range(num_keypoints):
        local_flow = first_order_flow(
            source_point=kp_s[k],
            driving_point=kp_d[k],
            source_jacobian=jac_s[k],
            driving_jacobian=jac_d[k],
        )
        candidate_flows.append(local_flow)

    masks, occlusion = dense_motion_network(source, candidate_flows)
    dense_flow = weighted_sum(masks, candidate_flows)
    return generator(source, dense_flow, occlusion)
```

##### 训练与推理
训练时，FOMM 从同一视频抽取源帧和驱动帧，要求重建驱动帧。关键点检测器、dense motion network 和生成器端到端训练。等变性损失同样重要：随机变换图像后，关键点位置和 Jacobian 应与该变换一致，这会抑制关键点漂移到纹理噪声上。

推理时，源图像只需一张。驱动视频逐帧提供运动，FOMM 通过相对关键点运动把驱动表情、头部姿态或物体姿态迁移到源图像上。它的速度和质量让它成为 talking-head 和 image animation 领域的强基线。

局限是它仍依赖 2D warping。大姿态变化、严重遮挡、侧脸转正、口腔内部和头发等不可见区域需要生成器补全，容易出现模糊或伪影。后续 Head2Head、MegaPortraits、LivePortrait 和扩散式方法大多在高分辨率、3D 表达或时序生成方面继续改进。

#### 🧪 练习题
```yaml
question: "FOMM 相比 Monkey-Net 的关键技术提升是什么？"
options:
  - "完全取消关键点检测器"
  - "把关键点从 2D 坐标扩展为位置加局部 Jacobian 的一阶运动表示"
  - "只使用文本提示生成视频"
  - "用人工标注 landmark 替代自监督训练"
answer: 1
explanation: "FOMM 通过局部 Jacobian 建模关键点附近的一阶仿射运动，从而获得比单纯位移更精细的 dense motion。"
```

### Head2Head

```yaml
id: head2head
num: 4
name: Head2Head
full_name: 视频神经头部合成 (Video-based Neural Head Synthesis)
year: '2020'
org: 帝国理工
parent: fomm
paper_url: https://arxiv.org/abs/2005.10954
project_url: ''
category: talking_head
motivation: 神经网络条件视频合成提升质量
```

#### 📝 一句话总结
Head2Head 把 3D 人脸跟踪得到的可控几何条件交给神经视频渲染器，让目标人物在目标身份下复现源视频的表情、头姿和眼动。

#### 🎯 核心要点
- **两阶段设计**：先做 3DMM 人脸重建和运动迁移，再用神经渲染器合成真实视频帧。
- **条件表示**：使用 NMFC、眼睛注视图和分割/掩码等中间图像，避免直接让网络从源视频像素中猜目标外观。
- **视频一致性**：渲染器使用历史帧、光流和视频判别器抑制闪烁。
- **与 FOMM 的区别**：FOMM 更像单图 warping，Head2Head 明确使用 3D 参数和目标视频训练的 neural rendering。

#### 🔬 深入细节
##### 核心示意图
![Head2Head pipeline](https://ar5iv.labs.arxiv.org/html/2005.10954/assets/x1.png)

##### 方法拆解
Head2Head 的第一阶段从输入视频估计 3DMM 参数，包括身份、表情、头部姿态和相机。跟踪目标函数通常由 landmark 重投影、先验约束和时间平滑组成：

$$
E=E_l+\lambda_{pr}E_{pr}+\lambda_{sm}E_{sm}
$$

\(E_l\) 保证投影后的 3D landmark 贴合检测点，\(E_{pr}\) 约束身份和表情参数不要偏离合理人脸空间，\(E_{sm}\) 让连续帧动作平滑。得到参数后，系统可以把源视频的表情、头姿和眼动迁移到目标身份上，生成目标人物应该执行的 3D 条件序列。

第二阶段是 neural video renderer。网络输入不是原始源脸，而是目标身份下的语义几何渲染，包括 NMFC（Normalized Mean Face Coordinates）、眼睛相关图和前景 mask。NMFC 可以理解为“当前像素属于标准人脸模型的哪个位置”，因此比 RGB 图像更稳定，也能让渲染器专注于把几何条件翻译成目标人物的真实纹理。

为了提升时序质量，渲染器不只看当前条件帧，还参考前几帧生成结果，并结合光流或视频判别器约束连续帧一致。论文还特别强调嘴部区域，因为嘴唇和牙齿是人类最敏感的错误来源；针对嘴部的局部判别器能加强口型细节。

##### 核心流程伪代码
```python
def head2head_pipeline(source_video, target_video):
    target_model = fit_target_identity_and_renderer(target_video)
    target_identity = target_model.identity

    for source_frame in source_video:
        source_params = track_3dmm(source_frame)
        transferred = {
            "identity": target_identity,
            "expression": source_params.expression,
            "head_pose": source_params.head_pose,
            "eye_gaze": source_params.eye_gaze,
        }
        nmfc = render_nmfc(transferred)
        eye_image = render_eye_condition(transferred)
        mask = render_face_mask(transferred)
        frame = neural_video_renderer(nmfc, eye_image, mask, previous_outputs=True)
        yield frame
```

##### 价值与局限
Head2Head 的价值在于把“可控的几何参数”和“神经网络的真实感渲染”结合起来。几何阶段提供明确可编辑的表情、姿态和注视控制，神经阶段补足传统渲染难以处理的皮肤、头发、口腔和背景边界。

它的代价是通常需要目标人物视频用于个体化训练或适配，泛化到新身份不像后来的 one-shot 方法那样方便。3DMM 跟踪错误也会传导到渲染条件中。相比扩散模型，Head2Head 的生成分布更窄，但在受控目标身份和视频到视频重演场景中具有清晰的工程路径。

#### 🧪 练习题
```yaml
question: "Head2Head 使用 NMFC 作为渲染条件的主要原因是什么？"
options:
  - "NMFC 是音频频谱图，可以直接表示语音"
  - "NMFC 提供目标身份下稳定的标准人脸坐标条件，便于神经渲染器合成真实纹理"
  - "NMFC 会自动生成高分辨率背景"
  - "NMFC 用来替代所有时间一致性约束"
answer: 1
explanation: "NMFC 把几何位置编码为规范人脸坐标，减少 RGB 源图像带来的身份泄漏，让渲染器专注于目标外观合成。"
```

### MegaPortraits

```yaml
id: megaportraits
num: 5
name: MegaPortraits
full_name: 百万像素神经头像 (One-shot Megapixel Neural Head Avatars)
year: '2022'
org: Samsung AI
parent: head2head
paper_url: https://arxiv.org/abs/2207.07621
project_url: ''
category: talking_head
motivation: 交叉注意力机制实现百万像素级合成
```

#### 📝 一句话总结
MegaPortraits 将一张源肖像编码为可变形的 3D 神经体表示，再用驱动视频的头姿和表情控制它，目标是把 one-shot 头像动画提升到百万像素级别。

#### 🎯 核心要点
- **表示升级**：不只在 2D 图像平面 warping，而是把源身份编码进 latent 3D volume，提高头部转动和遮挡处理能力。
- **驱动分解**：motion encoder 预测旋转、平移和表情 latent，appearance encoder 预测源身份的体特征和全局描述符。
- **高分辨率策略**：先训练 512px 基础模型，再用高分辨率图像和 enhancer/super-resolution 式模块提升到 1024px 级别。
- **位置关系**：继承 Head2Head 的神经渲染思想，但更强调 one-shot 泛化和高分辨率头像质量。

#### 🔬 深入细节
##### 核心示意图
![MegaPortraits base model](https://ar5iv.labs.arxiv.org/html/2207.07621/assets/x1.png)

##### 方法拆解
MegaPortraits 的基础模型把源图像 \(I_s\) 编码为两类外观信息：一个三维神经体特征 \(v_s\)，以及一个全局外观描述符 \(e_s\)。驱动图像或驱动视频帧 \(I_d\) 通过 motion encoder 得到头部旋转、平移和表情相关 latent。这种设计把“这个人长什么样”和“现在怎么动”拆开处理。

可以把生成过程抽象为：

$$
v_s,e_s=A(I_s),\quad m_d=M(I_d),\quad \hat{I}_d=G(W(v_s,m_d),e_s)
$$

其中 \(A\) 是 appearance encoder，\(M\) 是 motion encoder，\(W\) 是按照驱动运动对 3D volume 做 canonical-to-driving 变形的模块，\(G\) 是投影后的 2D 生成器。由于中间表示具有 3D 结构，模型在较大头姿变化时比纯 2D 特征变形更稳。

高分辨率是论文的重要目标。直接在百万像素视频上训练完整模型开销大，而且高分辨率动态 paired 数据不足。因此系统先学习中等分辨率的可控头像生成，再用高分辨率静态肖像、视频帧和增强器学习皮肤、眼睛、头发等细节。这个阶段不能简单理解为普通超分辨率，因为模型还必须在新表情和新姿态下保持身份一致。

论文还讨论了蒸馏和轻量化思路：基础模型可以作为 teacher，把高质量神经头像能力压缩到更高效的 student 中，方便实际部署。MegaPortraits 的贡献不在于完全解决所有 talking-head 问题，而在于把 one-shot 驱动、3D latent 表示和高分辨率渲染较系统地结合起来。

##### 核心流程伪代码
```python
def megaportaits_generate(source_image, driving_video):
    volume, appearance_code = appearance_encoder(source_image)

    for driving_frame in driving_video:
        motion_code = motion_encoder(driving_frame)
        canonical_volume = source_to_canonical_warp(volume)
        driven_volume = canonical_to_driving_warp(canonical_volume, motion_code)
        low_res = neural_renderer_2d(driven_volume, appearance_code)
        high_res = portrait_enhancer(low_res, source_image, appearance_code)
        yield high_res
```

##### 优势与局限
MegaPortraits 的优势是高质量 one-shot 头像动画，尤其适合单张参考图加驱动视频的场景。3D latent volume 让它在转头和表情变化时比普通 2D warping 更有几何余量。

局限在于模型复杂度和训练成本较高，高分辨率阶段依赖数据分布和增强器质量。对于极端侧脸、手部遮挡、复杂发型和强光照变化，latent volume 仍可能无法完整恢复真实 3D 几何。后续 LivePortrait 更重视效率和可部署性，而扩散式方法则从生成先验和音频条件方向继续扩展。

#### 🧪 练习题
```yaml
question: "MegaPortraits 为什么引入 latent 3D volume？"
options:
  - "为了用文本替代所有视频条件"
  - "为了把源身份外观放到具有三维结构的隐空间中，改善头姿变化和遮挡下的渲染"
  - "为了取消外观编码器"
  - "为了只生成 64 像素头像"
answer: 1
explanation: "latent 3D volume 提供比 2D 平面特征更强的空间结构，可在驱动运动下进行更稳定的神经渲染。"
```

### LivePortrait

```yaml
id: liveportrait
num: 6
name: LivePortrait
full_name: 高效肖像动画 (Efficient Portrait Animation)
year: '2024'
org: 快手
parent: megaportraits
paper_url: https://arxiv.org/abs/2407.03168
project_url: ''
category: talking_head
motivation: 拼接与重定向控制提升效率
```

#### 📝 一句话总结
LivePortrait 回到高效的隐式关键点和 warping 路线，通过更好的数据、架构、拼接模块和眼唇重定向控制，在速度和可控性之间取得实用平衡。

#### 🎯 核心要点
- **非扩散路线**：不像 EMO/Hallo 那样逐步去噪，而是采用隐式关键点、特征变形和生成器，推理速度明显更高。
- **基础框架**：外观特征提取、规范关键点、头姿/表情运动变换、warping estimator、decoder/generator。
- **实用增强**：stitching module 让动画头部与源图非头部区域衔接，eye/lip retargeting 让眼睛闭合和唇形开合可控。
- **数据与训练**：利用大规模高质量视频帧、混合图像-视频训练和 landmark-guided 隐式关键点优化提升稳定性。

#### 🔬 深入细节
##### 核心示意图
![LivePortrait training pipeline](https://ar5iv.labs.arxiv.org/html/2407.03168/assets/x2.png)

##### 方法拆解
LivePortrait 的基本生成路径可以写成：源图像提取外观特征，源和驱动图像分别估计隐式关键点及其运动参数，然后用驱动运动变换源特征，最后由生成器输出动画帧。隐式关键点不一定对应人类可命名的眼角或嘴角，但它们在训练中承担可变形控制点的作用。

一种简化的关键点变换形式为：

$$
x_s=s_s(R_s x_{c,s}+\Delta_s)+t_s,\quad
x_d=s_d(R_d x_{c,d}+\Delta_d)+t_d
$$

其中 \(x_c\) 是规范空间关键点，\(R\)、\(t\)、\(s\) 表示头姿旋转、平移和尺度，\(\Delta\) 表示表情形变。推理时，模型根据源和驱动的相对运动构造目标关键点，再通过 warping estimator 对源特征做变形。

LivePortrait 的工程价值来自两个补丁式但很关键的控制模块。Stitching module 预测关键点或特征残差，让生成头部与源图背景、脖子、肩部等非头部区域自然衔接。Eye/lip retargeting module 根据眼睛开合比和嘴唇开合比调整动画，避免源图闭眼、驱动睁眼或口型幅度不匹配时产生错误。

相比 FOMM，LivePortrait 更重视部署速度和用户可调控制；相比 MegaPortraits，它没有把重点放在复杂 3D volume 和百万像素神经头像，而是让常见单图肖像动画在消费级硬件上快速稳定运行。

##### 核心流程伪代码
```python
def liveportrait_animate(source_image, driving_video, eye_ratio=None, lip_ratio=None):
    source_feature = appearance_feature_extractor(source_image)
    source_kp = canonical_keypoint_detector(source_image)
    source_motion = motion_estimator(source_image)

    for driving_frame in driving_video:
        driving_motion = motion_estimator(driving_frame)
        target_kp = transform_keypoints(source_kp, source_motion, driving_motion)

        if eye_ratio is not None:
            target_kp = eye_retargeting(target_kp, eye_ratio)
        if lip_ratio is not None:
            target_kp = lip_retargeting(target_kp, lip_ratio)

        stitched_kp = stitching_module(source_kp, target_kp)
        flow, occlusion = warping_estimator(source_feature, source_kp, stitched_kp)
        yield generator(source_feature, flow, occlusion)
```

##### 优势与局限
LivePortrait 的优势是速度、可控性和开源生态友好。它适合实时预览、交互式头像、批量短视频生成等场景，不需要扩散模型的长步数采样。

局限在于 warping 路线仍受源图可见内容限制。大角度转头、复杂遮挡、夸张表情和口腔细节仍可能比强生成先验的扩散模型更困难。它的亮点不是理论上最强的生成能力，而是把可用性、可控性和效率做成了可部署系统。

#### 🧪 练习题
```yaml
question: "LivePortrait 中 stitching module 的作用是什么？"
options:
  - "把音频转成文字提示"
  - "预测衔接相关的残差，使动画头部与源图非头部区域更自然地融合"
  - "替代所有隐式关键点检测"
  - "只负责提高训练集分辨率"
answer: 1
explanation: "stitching module 主要改善重演头部和源图背景/身体区域之间的拼接一致性。"
```

### EMO

```yaml
id: emo
num: 7
name: EMO
full_name: 情感肖像生成 (Emote Portrait Alive)
year: '2024'
org: 阿里巴巴
parent: fomm
paper_url: https://arxiv.org/abs/2402.17485
project_url: ''
category: talking_head
motivation: 直接Audio2Video无需中间表征
```

#### 📝 一句话总结
EMO 用扩散模型直接从参考肖像和语音生成会说话的视频，弱化 3DMM、landmark 或 mesh 等中间表示，让表情、头动和口型由音频条件共同驱动。

#### 🎯 核心要点
- **直接 Audio2Video**：不显式预测 landmark、blendshape 或 3D 网格，减少中间表示误差传递。
- **扩散骨架**：以 Stable Diffusion/UNet 风格的视频扩散模型为基础，加入 ReferenceNet、Audio-Attention 和 Temporal Modules。
- **身份保持**：参考图像通过 ReferenceNet 注入外观特征，face locator/mask 限定人脸区域。
- **训练分阶段**：先图像级身份与外观建模，再视频级时间建模和音频对齐，最后训练运动速度相关控制。

#### 🔬 深入细节
##### 核心示意图
![EMO pipeline](https://ar5iv.labs.arxiv.org/html/2402.17485/assets/images/pipeline.png)

##### 方法拆解
EMO 的输入是一张参考肖像 \(I_{ref}\) 和一段音频 \(a_{1:T}\)，输出视频帧 \(\hat{I}_{1:T}\)。扩散模型从噪声 latent 开始，逐步在参考身份和音频条件下去噪：

$$
z_{t-1}=D_\theta(z_t, I_{ref}, A(a), m, c_{speed}, t)
$$

其中 \(A(a)\) 是预训练音频编码器提取的语音特征，\(m\) 是人脸区域或运动区域 mask，\(c_{speed}\) 是运动速度相关条件。相比先预测 landmark 再渲染，EMO 让网络在视频生成空间内直接学习音频到口型、表情和头部运动的对应关系。

ReferenceNet 负责从参考图中提取身份和细节特征，并通过 attention 注入 denoising UNet。音频特征通常需要覆盖当前帧附近的上下文窗口，因为口型不仅由当前音素决定，还受前后音素和发音过渡影响。可以抽象为：

$$
A_t = [A(a_{t-w}),\ldots,A(a_t),\ldots,A(a_{t+w})]
$$

Temporal Modules 在帧间传播信息，减少闪烁并让头部运动连续。Face locator 或 facial mask 提供弱空间约束，帮助模型知道应该在哪些区域生成与语音相关的变化，而不是让整个图像随音频无规律抖动。

##### 核心流程伪代码
```python
def emo_generate(reference_image, audio):
    ref_features = reference_net(reference_image)
    audio_features = audio_encoder(audio)
    face_mask = face_locator(reference_image)
    latents = sample_video_noise(num_frames=audio_to_frames(audio))

    for step in reversed(diffusion_steps):
        local_audio = collect_audio_context(audio_features, step)
        eps = denoising_unet(
            latents,
            timestep=step,
            reference=ref_features,
            audio=local_audio,
            face_mask=face_mask,
            temporal_context=True,
        )
        latents = diffusion_scheduler.step(latents, eps, step)

    return vae_decode_video(latents)
```

##### 意义与局限
EMO 的意义在于把 audio-driven portrait 从“中间结构预测 + 图像合成”的管线推向端到端视频生成。它能利用扩散模型强大的视觉先验，生成更丰富的表情和头动，而不被 landmark 的低维表达限制。

局限是推理成本较高，采样速度慢于 LivePortrait 这类 warping 方法。直接生成也意味着精确编辑更难：如果用户希望锁定某个眼神、头部轨迹或特定口型，显式控制不如 landmark/3DMM 路线直接。长视频还需要额外的分段连续性策略，否则身份、姿态和背景可能随时间漂移。

#### 🧪 练习题
```yaml
question: "EMO 相比传统 audio-to-landmark-to-video 管线的主要区别是什么？"
options:
  - "EMO 不使用任何参考图像"
  - "EMO 直接在视频扩散模型中注入音频和参考身份条件，减少显式中间表征"
  - "EMO 只能生成静态图片"
  - "EMO 必须先训练目标人物专属 3DMM"
answer: 1
explanation: "EMO 的核心是直接 Audio2Video，依赖扩散模型和参考特征生成视频，而不是先预测 landmark 或 mesh。"
```

### Hallo

```yaml
id: hallo
num: 8
name: Hallo
full_name: 分层音频驱动合成 (Hierarchical Audio-Driven Visual Synthesis)
year: '2024'
org: 复旦/阿里
parent: emo
paper_url: https://arxiv.org/abs/2406.08801
project_url: ''
category: talking_head
motivation: 分层音频注入解决时序一致性
```

#### 📝 一句话总结
Hallo 在扩散式音频驱动肖像生成中引入分层音频-视觉交叉注意力，把语音分别作用到唇部、表情和姿态层级，以改善口型同步和整体动态一致性。

#### 🎯 核心要点
- **继承 EMO 思路**：参考肖像 + 音频条件 + 视频扩散去噪，避免强依赖 3DMM/landmark。
- **核心创新**：Hierarchical Audio-Visual Cross Attention，将音频信息按唇部、表情、姿态等层级注入。
- **长视频策略**：使用前一段生成的 motion frames 作为连续性条件，缓解分段生成的断裂。
- **训练方式**：先单帧学习身份/外观，再加入 temporal motion module 和音频注意力训练视频动态。

#### 🔬 深入细节
##### 核心示意图
![Hallo pipeline](https://ar5iv.labs.arxiv.org/html/2406.08801/assets/fig_tab/halo.png)

##### 方法拆解
Hallo 的整体框架仍是条件视频扩散。参考图像经 ReferenceNet 提供身份与纹理，音频经 wav2vec 类编码器得到语音特征，denoising UNet 在这些条件下逐步生成视频 latent。基础去噪可抽象为：

$$
z_{t-1}=D_\theta(z_t, f_{ref}, f_{audio}, f_{motion}, t)
$$

其中 \(f_{motion}\) 可以来自上一视频片段的运动帧，用来保持长视频段落之间的头部姿态和表情连续。

分层音频注入是 Hallo 的关键。语音对人脸不同区域的影响并不相同：音素强烈影响嘴唇开合，语调和韵律影响表情，节奏和情绪可能影响头部运动。如果把全部音频特征一次性注入所有视觉 token，网络容易在口型同步和自然运动之间互相干扰。Hallo 将视觉特征分成不同层级或区域，通过交叉注意力分别融合音频：

$$
H_r=\operatorname{softmax}\left(\frac{Q_rK_a^\top}{\sqrt{d}}\right)V_a,\quad
r\in\{\text{lip},\text{expr},\text{pose}\}
$$

最终视觉更新可以看作多个层级响应的加权组合：

$$
H=w_lH_{lip}+w_eH_{expr}+w_pH_{pose}
$$

这种结构让嘴部区域更专注于音素级同步，同时给表情和头姿保留更平滑、更低频的音频响应。训练中 motion module 常初始化自通用图像到视频模型，以获得更好的时序先验。

##### 核心流程伪代码
```python
def hallo_generate(reference_image, audio, previous_motion_frames=None):
    ref_features = reference_net(reference_image)
    audio_features = wav2vec_encoder(audio)
    motion_context = encode_motion_frames(previous_motion_frames)
    latents = init_video_latents(audio_duration=audio.duration)

    for step in reversed(diffusion_steps):
        visual_tokens = denoising_unet.backbone(latents, step, ref_features)
        lip_tokens, expr_tokens, pose_tokens = split_visual_hierarchy(visual_tokens)
        lip_tokens = cross_attention(lip_tokens, audio_features, level="lip")
        expr_tokens = cross_attention(expr_tokens, audio_features, level="expression")
        pose_tokens = cross_attention(pose_tokens, audio_features, level="pose")
        latents = denoise_with_motion_module(
            latents,
            merge(lip_tokens, expr_tokens, pose_tokens),
            motion_context,
            step,
        )

    return decode_video(latents)
```

##### 价值与局限
Hallo 的价值在于承认 audio-to-face 不是单一映射。嘴唇、表情、头姿对音频的敏感频率和语义层级不同，分层注入比简单拼接音频条件更符合问题结构。

局限是扩散采样成本仍高，长视频仍需要分段生成和运动上下文维持。分层注意力能改善同步和自然度，但不能完全保证精确可编辑性；当用户需要指定某个头部轨迹或表情曲线时，显式 landmark 或控制信号仍更直接。

#### 🧪 练习题
```yaml
question: "Hallo 的 Hierarchical Audio-Visual Cross Attention 主要想解决什么问题？"
options:
  - "让所有视觉区域完全忽略音频"
  - "按唇部、表情、姿态等层级注入音频，减少同步和自然运动之间的干扰"
  - "把视频压缩为单张图片"
  - "替代参考图像中的身份信息"
answer: 1
explanation: "Hallo 将音频条件分层作用于不同视觉层级，使唇形同步、表情变化和头姿运动各自获得更合适的音频响应。"
```

### Hallo2

```yaml
id: hallo2
num: 9
name: Hallo2
full_name: 长时高分辨率肖像动画 (Long-duration High-resolution Portrait)
year: '2025'
org: 阿里巴巴
parent: hallo
paper_url: https://arxiv.org/abs/2410.07718
project_url: ''
category: talking_head
motivation: 渐进式训练实现4K小时级生成
```

#### 📝 一句话总结
Hallo2 在 Hallo 的音频驱动扩散框架上重点解决长时一致性和高分辨率问题，用分段连续条件、条件增强和高分辨率重建模块支撑更长、更清晰的肖像动画。

#### 🎯 核心要点
- **目标升级**：从短片段 audio-driven portrait 生成扩展到长时、高分辨率甚至 4K 级输出。
- **抗漂移设计**：对前序 motion frames 做 patch-drop 和噪声增强，减少模型过度复制历史帧外观导致的身份污染。
- **高清生成**：引入高质量解码/超分阶段或 VQGAN 式离散 latent 表示，把低分辨率动态一致性和高分辨率细节分开学习。
- **可控性**：在音频之外结合文本或语义提示控制表情风格，使长视频不只是机械口型同步。

#### 🔬 深入细节
##### 核心示意图
![Hallo2 overview](https://ar5iv.labs.arxiv.org/html/2410.07718/assets/fig/overview.png)

##### 方法拆解
Hallo2 的基本输入仍是一张参考肖像和长音频，但生成不再一次性完成全部帧，而是按时间窗口分段。第 \(i\) 个片段的生成可以抽象为：

$$
\hat{V}_i=D_\theta(I_{ref}, A_i, \tilde{C}_{i-1}, p)
$$

其中 \(A_i\) 是当前音频窗口特征，\(\tilde{C}_{i-1}\) 是由上一片段末尾构造的运动连续性条件，\(p\) 是可选表情或风格提示。这样模型能在段落之间继承姿态和表情趋势，避免每个窗口从静态参考图重新开始。

长视频中的一个典型风险是历史 motion frames 同时携带运动和外观。如果模型过度依赖这些帧，就可能逐段累积颜色、纹理或背景误差。Hallo2 使用 patch-drop 和高斯噪声等增强扰动连续性条件：

$$
\tilde{C}=M\odot C+(1-M)\odot \epsilon,\quad \epsilon\sim\mathcal{N}(0,\sigma^2)
$$

这会迫使模型从 motion frames 中提取运动线索，而不是简单复制上一段的像素外观，从而降低长时漂移。

高分辨率部分通常不让扩散主干直接承担全部 4K 细节。更可行的做法是先在较低 latent 分辨率中保证运动、身份和口型同步，再通过高质量 decoder、VQ token 对齐或超分模块恢复高清细节。这样把“时间一致的动态生成”和“空间细节增强”拆成两个更稳定的学习问题。

##### 核心流程伪代码
```python
def hallo2_long_generate(reference_image, long_audio, prompt=None):
    ref_features = reference_net(reference_image)
    previous_tail = None
    outputs = []

    for audio_window in split_audio(long_audio, seconds=5, overlap=True):
        audio_features = audio_encoder(audio_window)
        motion_condition = build_motion_context(previous_tail)
        motion_condition = patch_drop_and_noise(motion_condition)

        low_res_clip = diffusion_generate_clip(
            ref_features=ref_features,
            audio_features=audio_features,
            motion_context=motion_condition,
            prompt=prompt,
        )
        high_res_clip = high_resolution_decoder(low_res_clip, reference_image)
        outputs.append(blend_overlap(high_res_clip))
        previous_tail = select_tail_frames(low_res_clip)

    return concatenate(outputs)
```

##### 优势与局限
Hallo2 的价值在于把 audio-driven portrait 从 demo 级短视频推向长时内容生产。分段生成、运动上下文、条件增强和高分辨率恢复构成了一套比较完整的工程方案。

局限是长时生成仍然非常依赖数据分布和后处理。即使有 motion context，情绪、视线、背景和身份细节也可能在超长时间中累积偏移。4K 细节模块能提升观感，但也可能放大低分辨率阶段的口型或边界错误。因此它更适合作为长视频肖像动画系统，而不是保证逐帧物理一致的数字人仿真器。

#### 🧪 练习题
```yaml
question: "Hallo2 对历史 motion frames 做 patch-drop 和噪声增强的目的是什么？"
options:
  - "让模型完全丢弃音频条件"
  - "减少对历史帧外观的直接复制，促使模型利用其中的运动连续性线索"
  - "把所有视频帧转成文本"
  - "只提升文件压缩率"
answer: 1
explanation: "条件增强削弱历史帧的像素外观信息，降低长视频段落间的外观污染和漂移。"
```

### AniPortrait

```yaml
id: aniportrait
num: 10
name: AniPortrait
full_name: 音频驱动逼真肖像 (Audio-driven Photorealistic Portrait)
year: '2024'
org: 腾讯
parent: emo
paper_url: https://arxiv.org/abs/2403.17694
project_url: ''
category: talking_head
motivation: 双流ReferenceNet双条件扩散
```

#### 📝 一句话总结
AniPortrait 采用“Audio2Lmk + Lmk2Video”两阶段路线，先把音频转为 3D/2D landmark 和头姿，再用参考图条件扩散模型生成逼真的说话肖像视频。

#### 🎯 核心要点
- **两阶段框架**：Audio2Lmk 负责从语音预测可控运动结构，Lmk2Video 负责把结构渲染成目标身份视频。
- **显式控制**：landmark 作为中间表示，便于编辑、平滑和检查，区别于 EMO 的直接 Audio2Video。
- **扩散渲染**：Lmk2Video 基于参考图、PoseGuider/landmark 条件和 temporal module 生成连续视频。
- **训练数据**：利用人脸视频数据和 MediaPipe 等 landmark 标注，分开学习音频到运动与运动到图像。

#### 🔬 深入细节
##### 核心示意图
![AniPortrait framework](https://ar5iv.labs.arxiv.org/html/2403.17694/assets/x1.png)

##### 方法拆解
AniPortrait 的第一阶段把音频特征映射为面部运动。语音经 wav2vec2.0 类模型编码后，Transformer 或序列网络预测 3D mesh/landmark 和头部姿态，再投影成 2D landmark 序列：

$$
L_{1:T},P_{1:T}=F_{audio}(A(a_{1:T}))
$$

其中 \(L\) 表示脸部关键点，\(P\) 表示头姿。因为 landmark 是显式几何轨迹，系统可以在这一阶段做平滑、幅度调整或和外部控制信号混合。

第二阶段 Lmk2Video 用参考图保持身份，用 landmark 图驱动运动。它和 AnimateAnyone/ControlNet 风格的视频扩散模型相近：ReferenceNet 提取参考外观，PoseGuider 或 landmark encoder 把 2D landmark 转为多尺度控制特征，denoising UNet 在 temporal module 帮助下生成视频 latent。

可以把图像生成写成：

$$
\hat{V}=G_\theta(I_{ref}, \operatorname{Rasterize}(L_{1:T},P_{1:T}), \epsilon)
$$

其中 landmark rasterization 把点序列画成结构图，让扩散模型在每一帧知道嘴唇、眼睛、脸轮廓和头部位置。相比纯音频条件，landmark 条件给模型提供更明确的空间对齐信号。

##### 核心流程伪代码
```python
def aniportrait_generate(reference_image, audio):
    audio_features = wav2vec_encoder(audio)
    mesh_seq, pose_seq = audio_to_mesh_and_pose(audio_features)
    landmark_seq = project_to_2d_landmarks(mesh_seq, pose_seq)
    landmark_seq = smooth_and_normalize(landmark_seq)

    ref_features = reference_net(reference_image)
    landmark_conditions = pose_guider(rasterize_landmarks(landmark_seq))
    latents = sample_video_noise(len(landmark_seq))

    for step in reversed(diffusion_steps):
        eps = denoising_unet(
            latents,
            timestep=step,
            reference=ref_features,
            landmark_condition=landmark_conditions,
            temporal_context=True,
        )
        latents = scheduler_step(latents, eps, step)

    return vae_decode_video(latents)
```

##### 优势与局限
AniPortrait 的优势是把可控几何和扩散生成结合起来。Audio2Lmk 给出结构化运动，Lmk2Video 用生成模型补足真实纹理和细节；当用户需要修改口型、头姿或表情时，landmark 序列比纯 latent 音频条件更容易干预。

局限是两阶段误差会传递：Audio2Lmk 如果预测口型或头姿错误，后续扩散模型通常会忠实渲染错误条件。landmark 本身也压缩了细微表情、舌头、牙齿和眼神细节。与 EMO/Hallo 这类直接生成方法相比，它更可控但上限受中间表示表达能力限制。

#### 🧪 练习题
```yaml
question: "AniPortrait 采用 Audio2Lmk + Lmk2Video 两阶段设计的主要好处是什么？"
options:
  - "完全不需要参考图像"
  - "通过 landmark 中间表示提供可检查、可编辑的运动控制，再由扩散模型合成真实视频"
  - "只能处理静音视频"
  - "让音频编码器直接输出最终 RGB 像素"
answer: 1
explanation: "AniPortrait 先预测 landmark/头姿，再用这些显式条件驱动视频扩散模型，因此控制性比纯 Audio2Video 更强。"
```

### EchoMimic

```yaml
id: echomimic
num: 11
name: EchoMimic
full_name: 可编辑关键点驱动 (Lifelike Audio-driven Portrait)
year: '2025'
org: 蚂蚁集团
parent: aniportrait
paper_url: https://arxiv.org/abs/2411.10061
project_url: ''
category: talking_head
motivation: 可编辑Landmark条件增强控制
```

#### 📝 一句话总结
EchoMimic 将音频条件和可编辑 facial landmark 条件并行注入视频扩散模型，让用户既能用语音驱动口型，也能通过关键点控制眨眼、表情和头部动作。

#### 🎯 核心要点
- **资料说明**：manifest 给出的 paper_url 与公开常见的 EchoMimic V1 论文编号存在差异；本文件保留 manifest 元信息，并基于 EchoMimic 公开方法资料归纳。
- **多模式控制**：支持 audio-only、landmark-only、audio + selected landmarks 等模式，兼顾自动生成和人工编辑。
- **扩散框架**：Reference U-Net 保持身份，Denoising U-Net 生成视频，Audio-Attention、Landmark Encoder 和 Temporal-Attention 分别注入条件。
- **相对 AniPortrait 的差异**：AniPortrait 串联预测 landmark，EchoMimic 更强调音频与 landmark 的并行、可选择条件控制。

#### 🔬 深入细节
##### 核心示意图
![EchoMimic pipeline](https://ar5iv.labs.arxiv.org/html/2407.08136/assets/x2.png)

##### 方法拆解
EchoMimic 面向的核心矛盾是：纯音频可以自动驱动口型，但难以精确控制眼睛、表情和头部动作；纯 landmark 可控，但需要用户或上游模型提供完整运动轨迹。EchoMimic 因此把音频和 landmark 同时作为条件，让模型在不同模式下使用不同信息源。

扩散去噪过程可抽象为：

$$
z_{t-1}=D_\theta(z_t, f_{ref}, f_{audio}, f_{lmk}, t)
$$

\(f_{ref}\) 来自参考图像，保证身份和外观；\(f_{audio}\) 来自语音编码器，主要控制口型与发音节奏；\(f_{lmk}\) 来自 landmark encoder，提供眼睛、眉毛、嘴部或头姿等可编辑空间结构。训练时随机丢弃或组合条件，可以让模型在推理时支持不同控制模式。

与 AniPortrait 的“音频先转 landmark”不同，EchoMimic 不必把所有音频信息都压缩到 landmark 序列里。音频仍能直接通过 attention 影响口型细节，landmark 则负责用户关心的显式动作。对于眨眼、视线、表情幅度等难以从语音唯一确定的因素，这种并行条件尤其有价值。

长视频生成中，EchoMimic 也需要 temporal attention 和 motion frames 维持连续性。参考图像只提供静态身份，连续帧的表情和姿态需要在去噪网络内部保持一致，否则容易出现抖动、身份漂移或局部五官闪烁。

##### 核心流程伪代码
```python
def echomimic_generate(reference_image, audio=None, landmarks=None, mode="audio_landmark"):
    ref_features = reference_unet(reference_image)
    audio_features = audio_encoder(audio) if audio is not None else None
    landmark_features = landmark_encoder(landmarks) if landmarks is not None else None
    latents = sample_video_noise(num_frames=infer_length(audio, landmarks))

    for step in reversed(diffusion_steps):
        eps = denoising_unet(
            latents,
            timestep=step,
            reference=ref_features,
            audio=audio_features if mode in ["audio", "audio_landmark"] else None,
            landmarks=landmark_features if mode in ["landmark", "audio_landmark"] else None,
            temporal_attention=True,
        )
        latents = scheduler_step(latents, eps, step)

    return decode_video(latents)
```

##### 优势与局限
EchoMimic 的优势是控制入口更灵活。自动内容生产可以只给音频，精修场景可以额外给 selected landmarks 控制眨眼、表情或头部运动。并行条件比串联管线更不容易让某个中间预测错误完全决定最终结果。

局限是多条件训练和推理更复杂，条件冲突时需要模型学会取舍。例如音频暗示大幅张嘴，但用户给的嘴部 landmark 幅度很小，输出可能在口型同步和编辑意图之间折中。manifest 链接与公开 EchoMimic 资料存在版本差异，也意味着实现细节应以实际代码或论文版本为准。

#### 🧪 练习题
```yaml
question: "EchoMimic 相比只使用音频条件的肖像生成方法，主要增强了哪类能力？"
options:
  - "只能生成更小分辨率的图片"
  - "通过 landmark 条件提供眨眼、表情、头姿等可编辑控制"
  - "取消参考图像身份保持"
  - "把所有视频帧转换成文本摘要"
answer: 1
explanation: "EchoMimic 的重点是把可编辑 landmark 与音频条件结合，让口型由音频驱动，同时允许用户控制非语音唯一决定的面部运动。"
```

### VASA-1

```yaml
id: vasa1
num: 12
name: VASA-1
full_name: 实时逼真说话人脸 (Lifelike Audio-driven Talking Faces)
year: '2024'
org: 微软
parent: emo
paper_url: https://arxiv.org/abs/2404.10667
project_url: ''
category: talking_head
motivation: 潜在空间整体面部动力学建模
```

#### 📝 一句话总结
VASA-1 不只预测嘴唇，而是在压缩的面部动态潜空间中联合建模口型、表情、眼神和头部运动，再以实时速度把单张肖像和音频合成为自然说话视频。

#### 🎯 核心要点
- **整体动态建模**：把 talking face 视为完整面部动力学问题，而不是单独 lip-sync。
- **潜空间路线**：先学习可解码的人脸外观/运动 latent，再让音频条件模型预测连续运动 latent。
- **可控性**：支持对头部姿态、视线、表情或情绪强度等属性进行一定程度的条件控制。
- **效率目标**：相比多步扩散直接生成 RGB 视频，VASA-1 更强调低延迟、实时或近实时的肖像动画。

#### 🔬 深入细节
##### 核心示意图
本次快速检索中页面响应不稳定；下图采用公开 ar5iv 镜像中常见的 VASA-1 pipeline 图路径，正文基于 manifest 与公开论文方法信息归纳。

![VASA-1 pipeline](https://ar5iv.labs.arxiv.org/html/2404.10667/assets/figures/pipeline_.jpg)

##### 方法拆解
VASA-1 的关键是把人脸视频压缩到一个适合建模的 latent dynamics 空间。单张参考图提供身份和静态外观，训练视频提供真实说话时的面部动态。编码器把每帧的动态状态映射为 latent \(m_t\)，解码器学习从身份外观和动态 latent 重建视频帧：

$$
\hat{I}_t=G_\phi(I_{ref}, m_t)
$$

当这个 latent 空间学好后，音频驱动任务就变成预测 \(m_{1:T}\)，而不是直接预测高维 RGB 帧。音频编码器提取语音特征，序列生成模型根据音频和可选控制信号生成连续的面部动态：

$$
m_{1:T}=F_\theta(A(a_{1:T}), c_{pose}, c_{gaze}, c_{emotion})
$$

这种表示使模型能同时控制嘴部、脸部表情、眼睛和头部运动。相比只优化唇形同步，VASA-1 更强调“这个人正在自然说话”的整体感觉：头部会随语音节奏微动，表情和眼神也随语义或情绪变化。

VASA-1 与 EMO/Hallo 的差异在于生成粒度。EMO/Hallo 倾向于用扩散模型在视频 latent 或图像 latent 中去噪；VASA-1 更像先构建一个可实时解码的面部动态空间，再在这个空间中做音频条件生成。这样能显著降低推理延迟，也更方便加入可控变量。

##### 核心流程伪代码
```python
def train_vasa_latent_space(video_frames, reference_image):
    motion_latents = motion_encoder(video_frames)
    reconstruction = face_decoder(reference_image, motion_latents)
    loss = reconstruction_loss(reconstruction, video_frames)
    loss += temporal_smoothness(motion_latents)
    update(loss)


def vasa1_generate(reference_image, audio, controls=None):
    identity_code = appearance_encoder(reference_image)
    audio_features = audio_encoder(audio)
    motion_latents = dynamics_generator(audio_features, controls=controls)

    frames = []
    for latent in motion_latents:
        frame = face_decoder(identity_code, latent)
        frames.append(frame)
    return frames
```

##### 优势与局限
VASA-1 的优势是实时性和整体自然度。它不只让嘴对上音频，而是把表情、头动和视线纳入同一个动态空间，适合交互式数字人、实时通话头像和低延迟内容生成。

局限在于 latent 空间的表达上限决定了最终视频的多样性。若参考图中没有足够的侧脸、牙齿或发型信息，解码器仍需依赖训练先验补全。控制信号虽然比纯音频更强，但不等于完全物理可控；当用户指定的姿态或情绪与音频节奏冲突时，模型仍可能折中生成。

#### 🧪 练习题
```yaml
question: "VASA-1 为什么要在面部动态潜空间中预测运动，而不是直接逐像素生成视频？"
options:
  - "因为潜空间能降低生成维度，便于实时预测整体面部动力学并保持可控性"
  - "因为潜空间会删除所有表情信息"
  - "因为逐像素生成不需要任何训练数据"
  - "因为音频只能转换为静态图片"
answer: 0
explanation: "潜空间建模把高维视频生成转成低维连续动态预测，有利于实时性、时序一致性和控制信号注入。"
```

### VASA-3D

```yaml
id: vasa3d
num: 13
name: VASA-3D
full_name: 音频驱动高斯头像 (Audio-driven Gaussian Head Avatars)
year: '2026'
org: 微软
parent: vasa1
paper_url: https://www.microsoft.com/en-us/research/project/vasa-3d/
project_url: ''
category: talking_head
motivation: 3DGS多视角一致实时75FPS渲染
```

#### 📝 一句话总结
VASA-3D 将 VASA-1 的 2D 运动潜码（motion latent）引入 3D 高斯溅射（3DGS）头部模型，通过 FLAME 绑定的基础变形与运动潜码驱动的密集残差变形（VAS Deformation），仅需单张肖像图即可构建实时（75 FPS @ 512×512）、多视角一致、表情丰富的 3D 说话头像。

#### 🎯 核心要点
- **单图输入 → 3D 头像**：利用 VASA-1 从单张肖像合成大量多姿态多表情的 2D 训练视频（默认 10 小时），再用这些合成数据训练个性化 3DGS 头部模型
- **双层变形架构**：Base Deformation（运动潜码 → FLAME 参数 → 网格驱动高斯几何变换）+ VAS Deformation（运动潜码条件化的密集残差 MLP，预测位置/旋转/缩放/颜色/透明度残差）
- **鲁棒训练策略**：针对合成数据的纹理不一致性，采用感知损失（LPIPS + 对抗损失）替代纯像素级损失；SDS 损失消除侧视角伪影；渲染一致性损失（Render Consistency Loss）防止 VAS 残差过拟合
- **实时推理**：音频驱动动画 + 512×512 渲染在单张 RTX 4090 上达到 75 FPS，首帧延迟仅 65ms
- **继承 VASA-1 控制能力**：支持情绪偏移、眼神方向、头部距离等额外控制信号
- **用户研究压倒性优势**：与 ER-NeRF、GeneFace、MimicTalk、TalkingGaussian 对比，用户偏好率达 93.91%

#### 🔬 深入细节
##### 整体框架

![VASA-3D 框架总览](https://ar5iv.labs.arxiv.org/html/2512.14677/assets/x2.png)
*图：VASA-3D 整体流程。单张肖像经 VASA-1 生成多样化合成视频及对应运动潜码，用于训练基于 FLAME 绑定的可变形 3D 高斯模型。推理时由音频/视频生成运动潜码实时驱动 3D 头像。*

VASA-3D 的核心思路是**桥接 2D 与 3D**：VASA-1 已经学会了从海量 2D 视频中提取丰富的面部运动表示（motion latent），但其输出是 2D 视频，无法自由视角渲染。VASA-3D 将这些运动潜码"提升"到 3D 空间，通过 3DGS 实现多视角一致的实时渲染。

##### 3D 高斯表示与双层变形

头部被表示为一组 3D 高斯 \(\mathcal{G} = \{\mathbf{g}_i = (\boldsymbol{\mu}_i, \boldsymbol{r}_i, \boldsymbol{s}_i, \boldsymbol{c}_i, \alpha_i)\}_{i=1}^{N}\)，每个高斯具有位置、旋转、缩放、颜色和透明度属性，绑定在 FLAME 网格三角面上（沿用 GaussianAvatars 方案）。

**Base Deformation（基础变形）**：

VASA-1 的运动潜码 \(\mathbf{x} = [\mathbf{z}^{dyn}, \mathbf{z}^{pose}]\) 首先通过两个 MLP 映射为 FLAME 参数：

$$\boldsymbol{\varepsilon}^{exp} = (\boldsymbol{\psi}, \boldsymbol{\theta}^{eye}, \boldsymbol{\theta}^{jaw}) \leftarrow \mathcal{M}^{e}(\mathbf{z}^{dyn})$$

$$\boldsymbol{\varepsilon}^{pose} = (\boldsymbol{\theta}^{neck}, \boldsymbol{\theta}^{global}, \mathbf{t}) \leftarrow \mathcal{M}^{p}(\mathbf{z}^{pose})$$

其中 \(\mathcal{M}^{e}\) 和 \(\mathcal{M}^{p}\) 均为 3 层全连接网络（256 隐藏单元 + ReLU）。FLAME 网格根据这些参数进行蒙皮变形，带动绑定的高斯的 \((\boldsymbol{\mu}_i, \mathbf{r}_i, \mathbf{s}_i)\) 发生变化。形状系数 \(\boldsymbol{\varepsilon}^{shape}\) 在训练时联合优化，推理时固定。

> 💡 **关键洞察**：Base Deformation 提供了粗粒度的全局表情和姿态控制，但 FLAME 参数空间的表达力有限，无法捕捉 VASA-1 运动潜码中编码的微妙面部细节。

**VAS Deformation（密集残差变形）**：

在 Base Deformation 之上，两个额外的 MLP 分别预测面部区域和颈部区域高斯的全属性残差：

$$\Delta\mathbf{g}_{i \in \Omega_{face}} \leftarrow \mathcal{D}^{e}(\mathbf{g}_i, \mathbf{z}^{dyn}, \boldsymbol{\varepsilon}^{exp})$$

$$\Delta\mathbf{g}_{j \in \Omega_{neck}} \leftarrow \mathcal{D}^{p}(\mathbf{g}_j, \mathbf{z}^{pose}, \boldsymbol{\varepsilon}^{pose})$$

残差包括 \(\Delta\boldsymbol{\mu}, \Delta\mathbf{r}, \Delta\mathbf{s}, \Delta\mathbf{c}, \Delta\alpha\)，即位置、旋转、缩放、颜色和透明度的全面修正。输入的高斯位置使用正弦位置编码（\(L=4\)）。

> ⚠️ **注意**：VAS Deformation 同时接收 VASA 运动潜码和 FLAME 参数作为输入，使其能够感知当前基础表情状态，从而学习更精确的残差。

##### 算法伪代码

```python
# VASA-3D 推理流程
def vasa3d_inference(audio, portrait_image):
    # 1. VASA-1 生成运动潜码
    z_dyn, z_pose = vasa1_diffusion_transformer(audio)
    
    # 2. Base Deformation: 运动潜码 → FLAME 参数
    eps_exp = MLP_e(z_dyn)          # 表情PCA + 眼睛/下巴姿态
    eps_pose = MLP_p(z_pose)        # 颈部/全局旋转 + 平移
    
    # 3. FLAME 网格蒙皮 → 驱动绑定的高斯
    G_base = flame_skinning(gaussians, eps_exp, eps_pose, eps_shape)
    
    # 4. VAS Deformation: 密集残差预测
    delta_face = D_e(G_base[face], z_dyn, eps_exp)
    delta_neck = D_p(G_base[neck], z_pose, eps_pose)
    G_final = G_base + delta_face + delta_neck
    
    # 5. 高斯溅射渲染
    image = gaussian_splatting_render(G_final, camera_params)
    return image  # 512x512, 75 FPS on RTX 4090
```

##### 合成训练数据生成

由于 VASA-3D 仅需单张肖像图作为输入，训练数据完全由 VASA-1 合成：
1. 从 VoxCeleb2 数据集随机采样最多 10 小时视频片段
2. 提取每帧的 VASA-1 运动潜码
3. 用 VASA-1 解码器驱动肖像图生成对应帧
4. 配对的（运动潜码, 视频帧）用于训练

> 💡 **关键**：合成数据的姿态和表情范围远超单人视频能合理捕捉的范围，但代价是帧间纹理不一致——这正是后续鲁棒训练策略要解决的核心挑战。

##### 鲁棒训练策略

![消融实验：VAS 变形与损失函数效果](https://ar5iv.labs.arxiv.org/html/2512.14677/assets/x4.png)
*图：VAS 变形不仅提升图像质量，还能捕捉表达情感的微妙面部细节（左）。SDS 损失消除侧视角伪影，渲染一致性损失恢复被 SDS 平滑掉的细节（右）。*

总损失函数：

$$L = L_{ssim} + L_1 + L_{lpips} + L_{adv} + L_{sds} + L_{consist} + L_{cas} + L_{others}$$

各损失的设计动机和细节：

**1. 重建损失** \(L_{recon} = \lambda_{ssim} L_{ssim} + (1 - \lambda_{ssim}) L_1\)：标准的 SSIM + L1 组合。

**2. 感知损失** \(L_{perc} = \lambda_{lpips} L_{lpips} + \lambda_{adv} L_{adv}\)：
- LPIPS（VGG 预训练）对纹理不一致具有鲁棒性
- 三个多尺度 patch 判别器提供对抗损失，进一步提升真实感

**3. SDS 损失**：使用 StableDiffusion v2.1，从 \([-180°, 180°]\) 方位角和 \([-22.5°, 22.5°]\) 仰角均匀采样随机视角渲染，CFG=10.0，梯度缩放=0.001，文本提示为 "human portrait, realistic photography, by DSLR camera"。每 10 次迭代应用一次。

> ⚠️ **注意**：SDS 损失虽然消除了侧视角伪影，但也倾向于平滑所有区域的细节，尤其影响 VAS 残差（因为残差是逐帧学习的，灵活性高更容易受 SDS 副作用影响）。

**4. 渲染一致性损失（核心创新）**：

$$L_{consist} = \text{LPIPS}\bigl(I'(\mathcal{G}''), \text{stop\_grad}(I'(\mathcal{G}'))\bigr)$$

在每次训练迭代中，从偏离当前训练视角较远的方位角（\([35°, 55°]\) 或 \([-55°, -35°]\)）渲染一对额外图像：一张用 Base Deformation 后的高斯 \(\mathcal{G}'\)，一张用 VAS Deformation 后的 \(\mathcal{G}''\)。stop_gradient 防止 \(\mathcal{G}'\) 被负面影响。

> 💡 **设计直觉**：\(\mathcal{G}'\) 需要联合拟合多帧数据（不同姿态），因此天然具有多视角一致性，不易被 SDS 过度平滑。用它作为锚点来约束 \(\mathcal{G}''\)，既保留了 VAS 残差的表达力，又避免了侧视角的过拟合。

**5. CAS 锐化损失**：在 200K 迭代训练完成后，额外微调 20K 迭代，对渲染图像应用对比度自适应锐化（CAS）滤波器，用 LPIPS 损失引导模型学习更锐利的输出。

**关键训练细节**：
- 所有损失同时在 \(\mathcal{G}'\)（Base 后）和 \(\mathcal{G}''\)（VAS 后）上计算，确保基础变形捕捉跨帧共享特征，VAS 残差专注于逐帧细节
- 损失权重：\(\lambda_{ssim}=0.1, \lambda_{lpips}=1.0, \lambda_{adv}=0.001, \lambda_{sds}=1.0, \lambda_{consist}=0.01, \lambda_{cas}=10.0\)
- 默认 200K 迭代，4×A100 40G GPU，batch size 4
- 高斯密集化/剪枝从 10K 开始，间隔 2K，100K 后停止或高斯数超过 200K 时停止

##### 实验结果

| 设置 | PSNR↑ | L1↓ | SSIM↑ | LPIPS↓ | S_C↑ | S_D↓ |
|------|-------|-----|-------|--------|------|------|
| Basic (仅 Base) | 25.74 | 0.0228 | 0.8544 | 0.0768 | 6.63 | 8.13 |
| +VAS deform. | 27.19 | 0.0195 | 0.8654 | 0.0695 | 6.96 | 7.91 |
| +L_sds | 27.23 | 0.0195 | 0.8653 | 0.0707 | 6.96 | 7.92 |
| +L_consist | 27.33 | 0.0192 | 0.8672 | 0.0706 | 6.94 | 7.92 |
| +L_cas | 26.62 | 0.0209 | 0.8472 | **0.0657** | 6.91 | 7.94 |

与 VASA-1（上界）的对比：VASA-3D 的 FID 为 7.45 vs VASA-1 的 5.24，唇音同步和身份相似度差距微小，但 VASA-3D 提供了 VASA-1 无法实现的真 3D 自由视角渲染。

与现有 3D 说话头像方法对比（均在相同合成视频数据上训练）：

| 方法 | S_C↑ | S_D↓ | ID Sim↑ | 视觉质量评分↑ | 用户偏好↑ |
|------|------|------|---------|-------------|----------|
| ER-NeRF | 5.92 | 8.78 | 0.773 | 1.82 | 1.08% |
| GeneFace | 5.92 | 9.61 | 0.786 | 1.73 | 0.72% |
| MimicTalk | 5.27 | 10.94 | 0.775 | 2.23 | 3.58% |
| TalkingGaussian | 6.70 | 8.11 | **0.797** | 2.38 | 0.72% |
| **VASA-3D** | **8.12** | **6.93** | 0.787 | **4.29** | **93.91%** |

**局限性**：不建模头部背面（训练数据视角有限）；不处理动态配饰；仅限头部，未扩展到上半身。

#### 🧪 练习题
```yaml
question: "VASA-3D 中渲染一致性损失（Render Consistency Loss）的核心设计思想是什么？"
options:
  - "用 SDS 损失生成的伪标签监督侧视角渲染"
  - "用 Base Deformation 后的多视角一致渲染作为锚点，约束 VAS Deformation 后的渲染在偏离视角下不过拟合"
  - "强制 Base Deformation 和 VAS Deformation 的输出在所有视角完全一致"
  - "用真实多视角视频数据监督侧视角渲染质量"
answer: 1
explain: "渲染一致性损失利用 G'（Base 后，天然多视角一致）作为锚点，通过 stop_gradient 单向约束 G''（VAS 后）在偏离训练视角的侧视图下保持合理，既保留残差表达力又防止过拟合。"
```

### Sonic

```yaml
id: sonic
num: 14
name: Sonic
full_name: 全局音频感知 (Shifting Focus to Global Audio Perception)
year: '2025'
org: 阿里巴巴
parent: hallo
paper_url: https://arxiv.org/abs/2410.10223
project_url: ''
category: talking_head
motivation: 全局-局部音频注入提升表达力
```

#### 📝 一句话总结
Sonic 将音频条件从“局部短窗驱动口型”扩展为“全局语义/韵律感知 + 局部音素对齐”的联合注入，解决长时肖像动画中表情单薄、节奏不连贯和局部口型过拟合的问题。

#### 🎯 核心要点
- 提出全局音频感知框架，将整段语音的韵律、停顿和情绪趋势编码为全局条件。
- 保留局部音频注入，用短窗音频特征对齐每一帧的唇形和下颌运动。
- 在扩散式视频生成骨干中融合参考图像、局部音频 token、全局音频 token 和时序运动信息。
- 相比 Hallo 类分层音频注入，重点增强跨句子、跨片段的表达一致性。
- 适用于长时 talking-head 生成，尤其缓解只有局部音素时常见的机械口型和表情漂移。

#### 🔬 深入细节
![Sonic 框架图](https://arxiv.org/html/2411.16331v1/x1.png)
*图：Sonic 公开 arXiv HTML 中的整体框架图，展示参考图像、音频条件和视频扩散生成骨干的协同关系。*

> ⚠️ 资料限制：manifest 中的 `paper_url` 指向 `2410.10223`，快速核验后与 Sonic 论文不匹配；本文依据公开可匹配的 Sonic 论文题名、HTML 图资源和该方向公开方法整理，YAML 仍保留 manifest 原始链接。

Sonic 的动机来自一个常见缺陷：多数音频驱动肖像方法只看当前帧附近的音频窗口，因此能对齐嘴唇，却难以理解更长范围内的语气、停顿、重音和情绪变化。局部窗口足以决定“这一帧嘴张多大”，但不足以决定“这一句话整体应该如何起伏、何时点头、何时收敛表情”。

方法上，Sonic 可以理解为在扩散式 talking-head 骨干上增加两级音频条件。局部分支提取与帧同步的 wav2vec/Hubert 类特征，进入 cross-attention 或调制层，负责精细唇形；全局分支对整段音频或较长上下文做 Transformer 聚合，得到全局韵律 token，再在视频 UNet/DiT 的时序层中注入，负责长程表情和头部动态。

核心条件可以写为：

$$\epsilon_\theta = f_\theta(z_t, t, I_{ref}, A_{local}, A_{global})$$

其中 \(z_t\) 是带噪视频 latent，\(I_{ref}\) 是身份参考图，\(A_{local}\) 提供帧级音素/能量线索，\(A_{global}\) 提供句子级节奏和情绪上下文。这样设计的直觉是：局部音频约束“准确”，全局音频约束“自然”。

```python
# Sonic 核心流程伪代码
def sonic_generate(reference_image, audio):
    ref_feat = reference_encoder(reference_image)
    local_tokens = audio_encoder(audio, window="frame_aligned")
    global_tokens = global_audio_transformer(audio)

    z = sample_video_noise()
    for step in diffusion_steps:
        cond = fuse_conditions(ref_feat, local_tokens, global_tokens)
        eps = video_denoiser(z, step, cond)
        z = scheduler.step(z, eps, step)
    return video_decoder(z)
```

与只用局部音频的框架相比，Sonic 的关键收益不是单帧指标上的小幅提升，而是长序列观感：停顿时嘴部和脸部能自然静止，重音附近表情/头部运动更明显，句间过渡更少突然抖动。它也延续 Hallo 系列的思想：不把音频直接变成像素，而是在视频扩散模型中作为多尺度条件参与生成。

#### 🧪 练习题
```yaml
question: "Sonic 引入全局音频感知的主要目的是什么？"
options:
  - "替代参考图像编码器以减少显存"
  - "利用整段语音的韵律和语义上下文增强长时表情与运动一致性"
  - "只提升单帧图像分辨率"
  - "将扩散模型改为 GAN"
answer: 1
explain: "局部音频负责帧级口型，全局音频提供长程韵律、停顿和情绪趋势，从而提升自然度和时序一致性。"
```

### Teller

```yaml
id: teller
num: 15
name: Teller
full_name: 实时流式音频驱动 (Real-time Streaming Audio-driven Portrait)
year: '2025'
org: 字节跳动
parent: vasa1
paper_url: https://arxiv.org/abs/2409.01776
project_url: ''
category: talking_head
motivation: 自回归实时流式生成架构
```

#### 📝 一句话总结
Teller 提出首个面向实时流式 talking-head 的自回归运动生成框架，用 Facial Motion Latent Generation 和 Efficient Temporal Module 在低延迟条件下生成自然连续的面部与身体细节运动。

#### 🎯 核心要点
- 采用自回归 Transformer 按流式音频逐步预测肖像运动 latent，避免等待完整音频。
- 用 Residual VQ 将隐式关键点运动压缩为离散/紧凑 motion token。
- Facial Motion Latent Generation 负责从音频和历史状态预测下一段面部运动。
- Efficient Temporal Module 对生成的运动序列做真实性与时序平滑修正。
- 面向实时应用优化首帧延迟、内存和流式稳定性，而不是离线整段重采样。

#### 🔬 深入细节
![Teller 整体框架](https://arxiv.org/html/2503.18429v1/x2.png)
*图：Teller 的实时流式音频驱动肖像动画框架，包含自回归运动 latent 生成和时序真实性增强模块。*

> ⚠️ 资料限制：manifest 中 `paper_url` 指向的 `2409.01776` 与 Teller 标题不匹配；公开可匹配论文为 `Teller: Real-Time Streaming Audio-Driven Portrait Animation with Autoregressive Motion Generation`，本文据此整理。

Teller 针对的是实时系统里的核心矛盾：高质量扩散/视频生成往往需要整段上下文和多步推理，而直播、对话代理、数字人客服需要边听边动。直接使用离线扩散模型会带来不可接受的延迟；直接逐帧回归又容易抖动、表情僵硬。

它先把复杂的面部和身体局部运动压缩到 motion latent 空间。Residual VQ 模型把隐式关键点或运动表示编码成紧凑 token，自回归 Transformer 每次接收当前音频特征和历史 motion token，预测下一组 token。论文图注指出，Teller 的 AR 输入/输出以 token pair 为单位，目的是在流式条件下同时保持局部细节和相邻帧关系。

Efficient Temporal Module 是第二个关键模块。它不重新生成整段视频，而是在低成本的时序模块中校正运动真实性，抑制自回归累积误差。最终 renderer 再把 motion latent 作用到参考肖像上生成视频帧。

```python
# Teller 流式推理伪代码
def teller_stream(reference_image, audio_stream):
    state = init_motion_tokens(reference_image)
    cache = init_transformer_cache()
    for audio_chunk in audio_stream:
        audio_feat = encode_audio(audio_chunk)
        next_tokens, cache = ar_transformer(audio_feat, state, cache)
        refined_motion = efficient_temporal_module(next_tokens, state)
        frame = portrait_renderer(reference_image, refined_motion)
        state = update_state(state, refined_motion)
        yield frame
```

与 VASA-1 等潜在运动建模方法相比，Teller 的重点不是一次性生成完整 latent 序列，而是把运动生成改造成可缓存、可递推的在线过程。这样做牺牲了一部分全局后验修正能力，但换来了实时首包输出和持续流式响应能力。

#### 🧪 练习题
```yaml
question: "Teller 为什么要采用自回归 motion token 生成？"
options:
  - "为了完全避免使用音频编码器"
  - "为了能在流式音频到达时逐步生成运动，降低实时系统延迟"
  - "为了把图像分辨率固定为 4K"
  - "为了只生成静态头像"
answer: 1
explain: "自回归结构可以缓存历史状态，并随音频 chunk 到达预测下一段运动，是实时 streaming talking-head 的关键。"
```

### READ

```yaml
id: read
num: 16
name: READ
full_name: 实时异步扩散 (Real-time Efficient Asynchronous Diffusion)
year: '2025'
org: 学术界
parent: vasa1
paper_url: https://arxiv.org/abs/2508.03457
project_url: ''
category: talking_head
motivation: 异步噪声调度实现实时性
```

#### 📝 一句话总结
READ 提出实时音频驱动 talking-head 的扩散 Transformer 框架，通过时间 VAE、SpeechAE 和异步噪声调度大幅压缩视频/语音 token，使扩散生成从离线多步推理走向实时应用。

#### 🎯 核心要点
- 用 temporal VAE 学习时空高度压缩的视频 latent，显著减少 DiT token 数。
- 预训练 Speech Autoencoder，将语音特征压缩到与视频 latent 对齐的时间尺度。
- 采用 asynchronous noise schedule，让不同时间片在训练/推理中处于不同噪声阶段。
- DiT 在压缩 latent 空间完成音频条件去噪，兼顾速度和唇音对齐。
- 目标是解决扩散 talking-head 推理慢、实时性差的问题。

#### 🔬 深入细节
![READ 框架图](https://arxiv.org/html/2508.03457v1/x1.png)
*图：READ 框架。先预训练 SpeechAE，再用异步前向过程训练 DiT，推理时执行异步去噪以提升实时效率。*

READ 的问题设定很明确：扩散模型在 talking-head 上质量高，但标准视频扩散需要大量空间 token、时间 token 和采样步数。若直接对每帧 latent 同步去噪，延迟和吞吐都难以满足实时数字人。

第一步是压缩表示。Temporal VAE 不只压缩空间分辨率，也压缩时间维，把一段视频映射到更短、更稠密的 latent 序列；SpeechAE 则把原始语音特征压缩到相同时间粒度，避免音频 token 远多于视频 token 导致对齐困难。

第二步是异步噪声调度。传统扩散对整段 latent 使用同一个时间步 \(t\)，READ 则允许序列中不同块处在不同噪声级别。靠近当前输出的块更快完成去噪，后续块保留较高噪声继续滚动优化，从而形成连续流式生成。

```python
# READ 训练/推理核心流程
def read_inference(reference, audio):
    video_latent = init_noisy_latent_queue()
    speech_latent = speech_autoencoder(audio)
    ref_feat = encode_reference(reference)

    for realtime_tick in stream_ticks:
        # 每个 latent block 使用不同扩散步，形成异步去噪
        timesteps = asynchronous_schedule(video_latent)
        eps = dit_denoiser(video_latent, timesteps, speech_latent, ref_feat)
        video_latent = scheduler.step_async(video_latent, eps, timesteps)
        yield temporal_vae.decode_ready_frames(video_latent)
```

从公式看，READ 学的是：

$$\epsilon_\theta(z_t, t_i, c_a, c_r) \rightarrow \epsilon$$

其中每个时间块的 \(t_i\) 可以不同，\(c_a\) 是 SpeechAE 输出的语音 latent，\(c_r\) 是参考肖像条件。异步设计的直觉是：实时系统只要求“马上要播放的帧”足够干净，而不要求未来所有帧同步完成采样。

#### 🧪 练习题
```yaml
question: "READ 的异步噪声调度主要解决什么问题？"
options:
  - "让所有帧在同一步扩散中同步结束"
  - "让不同时间块处于不同去噪阶段，从而降低流式生成延迟"
  - "完全取消视频 VAE"
  - "把语音识别替换为文本输入"
answer: 1
explain: "异步调度允许即将输出的帧先完成去噪，未来帧继续滚动优化，是 READ 实时性的关键。"
```

### Dimitra

```yaml
id: dimitra
num: 17
name: Dimitra
full_name: 音频驱动表情扩散 (Audio-driven Diffusion for Expressive Talking Head)
year: '2025'
org: 学术界
parent: emo
paper_url: https://arxiv.org/abs/2502.17198
project_url: ''
category: talking_head
motivation: 条件运动扩散Transformer架构
```

#### 📝 一句话总结
Dimitra 用条件 Motion Diffusion Transformer 在 3D 人脸运动空间生成唇形、表情和头部姿态，解决仅靠音频到像素生成时身份保持弱、表情不自然和运动难控的问题。

#### 🎯 核心要点
- Motion Modeling Module 从训练视频提取 3DMM/3D mesh 运动序列作为扩散目标。
- Conditional Motion Diffusion Transformer 生成面部运动，而不是直接生成像素。
- 仅以音频序列和参考人脸图像为主条件，简化推理输入。
- 从音频中进一步提取 phoneme 与 transcript 相关特征，分别增强口型和表情/头姿真实感。
- 由 video renderer 将生成的 3D 运动序列渲染回最终 talking-head 视频。

#### 🔬 深入细节
![Dimitra 框架图](https://arxiv.org/html/2502.17198v1/extracted/6228656/Figures/dimitra.png)
*图：Dimitra 包含 Motion Modeling Module、条件 Motion Diffusion Transformer 和 Video Renderer 三部分。*

Dimitra 的核心取舍是先生成“运动”，再生成“视频”。音频到像素的端到端模型虽然直接，但很容易把口型、身份纹理、头姿、背景稳定性混在一起学习；Dimitra 将中间表示显式设为 3D 人脸运动序列，使扩散模型只负责动态建模。

训练时，Motion Modeling Module 从真实视频中估计 3DMM 或 mesh 运动，得到 \(m_{1:T}\)。扩散模型学习从噪声恢复该运动序列：

$$\mathcal{L} = \mathbb{E}_{t,m,\epsilon}\|\epsilon - \epsilon_\theta(m_t, t, a, r)\|_2^2$$

其中 \(a\) 是音频特征，\(r\) 是参考图像特征。论文摘要特别强调 phoneme 序列提升唇部运动真实性，transcript 相关信息帮助表情和头姿更符合语义节奏。

```python
# Dimitra 核心流程伪代码
def dimitra_generate(reference_image, audio):
    ref_cond = face_reference_encoder(reference_image)
    audio_cond = audio_encoder(audio)
    phoneme_cond = phoneme_encoder(audio)
    text_cond = transcript_encoder(audio)

    motion = gaussian_noise(shape=[T, motion_dim])
    for step in diffusion_steps:
        eps = cMDT(motion, step, ref_cond, audio_cond, phoneme_cond, text_cond)
        motion = scheduler.step(motion, eps, step)
    return video_renderer(reference_image, motion)
```

与 EMO 这类直接 Audio2Video 方法相比，Dimitra 的优势是可解释和可控：口型、表情、头姿都落在运动空间中，便于约束和分析。缺点是上限依赖 3D 运动估计器和 renderer，若 3DMM 无法表示细微皱纹或复杂遮挡，最终视频也会受限。

#### 🧪 练习题
```yaml
question: "Dimitra 为什么先生成 3D 人脸运动而不是直接生成视频像素？"
options:
  - "为了避免使用扩散模型"
  - "为了将唇形、表情和头姿解耦到更可控的运动空间"
  - "为了只支持文本输入"
  - "为了删除参考图像条件"
answer: 1
explain: "3D 运动空间能把动态和身份纹理分离，扩散模型专注学习运动序列，renderer 再负责视频合成。"
```

### EditYourself

```yaml
id: edityourself
num: 18
name: EditYourself
full_name: 音频驱动生成与编辑 (Audio-Driven Generation and Manipulation)
year: '2026'
org: 学术界
parent: emo
paper_url: https://arxiv.org/abs/2502.09876
project_url: ''
category: talking_head
motivation: 视频到视频编辑修复能力
```

#### 📝 一句话总结
EditYourself 将通用视频 DiT 扩展为音频条件的视频到视频编辑模型，通过口部区域噪声训练和音频 cross-attention，实现替换台词、增删片段和重定时的 talking-head 修复。

#### 🎯 核心要点
- 面向已有预录视频的 V2V 编辑，而不是只从单图重新生成整段视频。
- 在视频 DiT 中加入 global audio projection 和 audio cross-attention。
- 训练时对口部区域 latent 加噪，让模型学习在保持身份/背景的前提下重绘可说话区域。
- 推理时通过不同 mask 控制 lip、face、head 三种同步范围。
- 支持时间线级编辑：插入新语音、删除片段、重定时相邻 latent 以平滑过渡。

#### 🔬 深入细节
![EditYourself 框架图](https://arxiv.org/html/2601.22127v1/x2.png)
*图：EditYourself 在视频 DiT 中加入全局音频投影和音频 cross-attention，并对口部 token 做区域化去噪编辑。*

> ⚠️ 资料限制：manifest 中 `2502.09876` 快速核验为不相关论文；公开可匹配论文为 `EditYourself: Audio-Driven Generation and Manipulation of Talking Head Videos with Diffusion Transformers`，本文据此整理，YAML 保留 manifest 原链接。

EditYourself 解决的问题与传统 talking-head 生成不同：很多真实需求并不是从照片生成全新视频，而是修改已有视频中的一句话。如果直接整段重生成，身份、背景、头部运动和镜头质感都会改变；如果只贴嘴，又难以处理新增词、删除词或语速改变带来的脸部运动变化。

方法的关键是区域化扩散编辑。训练时保留干净的首帧/上下文 latent，只对嘴部区域 token 加噪，并要求模型根据新音频把这些 token 去噪回来。这样模型学到的是“在已有视频结构中修复说话区域”，而不是无约束地生成全帧。

```python
# EditYourself V2V 编辑伪代码
def edit_yourself(video, new_audio, edit_mask, timeline_ops):
    latents = video_vae.encode(video)
    latents = apply_timeline_ops(latents, timeline_ops)  # add/remove/retime
    noisy = add_noise(latents, region=edit_mask)
    audio_tokens = audio_encoder(new_audio)

    for step in diffusion_steps:
        eps = video_dit(noisy, step, audio_tokens, mask=edit_mask)
        noisy = scheduler.step(noisy, eps, step, region=edit_mask)
    return video_vae.decode(merge_clean_and_edited(latents, noisy, edit_mask))
```

mask 的大小决定编辑强度：只 mask mouth 可获得最强身份和背景保持；扩大到 face 可以让表情也匹配新音频；扩大到 head 则允许生成新的头部动态。这个设计让 EditYourself 更像视频后期工具，而不仅是一个 talking-head 生成器。

#### 🧪 练习题
```yaml
question: "EditYourself 训练时为什么只对口部等编辑区域 latent 加噪？"
options:
  - "为了让模型只学习修改需要变化的区域，同时保留原视频身份、背景和非编辑运动"
  - "为了完全删除音频条件"
  - "为了让所有帧随机重排"
  - "为了把视频变成单张图片"
answer: 0
explain: "区域化加噪将生成能力集中在需要同步新音频的部分，能减少全帧重生成带来的身份漂移和背景闪烁。"
```

### MMFace-DiT

```yaml
id: mmface_dit
num: 19
name: MMFace-DiT
full_name: 多模态面部生成DiT (Multimodal Face Generation with DiT)
year: '2026'
org: CVPR 2026
parent: vasa1
paper_url: https://arxiv.org/abs/2601.12345
project_url: ''
category: talking_head
motivation: 双流DiT多模态融合架构
```

#### 📝 一句话总结
MMFace-DiT 提出双流扩散 Transformer，将文本语义与 mask、sketch、edge 等空间条件在统一 DiT block 中融合，解决人脸生成里语义可控性和结构可控性难以协同的问题。

#### 🎯 核心要点
- 在 VAE latent 空间生成高保真人脸，避免像素空间扩散的高成本。
- 采用 image token 与 text token 双流处理，而不是外接独立 ControlNet。
- 用 AdaLN 注入全局条件，用 RoPE attention 作为跨模态融合核心。
- 支持文本 + 分割 mask、文本 + sketch 等多模态人脸控制。
- 重点是可控人脸图像生成，不是典型音频驱动 talking-head；纳入数字人管线时可作为人脸资产/参考图生成模块。

#### 🔬 深入细节
![MMFace-DiT 生成流程](https://arxiv.org/html/2603.29029v1/Images/MMDiT_Process.jpg)
*图：MMFace-DiT 生成流程。图像 latent 被切成 image tokens，文本由 CLIP 编码为空间外语义条件，空间先验作为结构控制输入。*

> ⚠️ 资料限制：manifest 中 `2601.12345` 快速核验后标题不匹配；公开可匹配论文为 `MMFace-DiT: A Dual-Stream Diffusion Transformer for High-Fidelity Multimodal Face Generation`，本文据此整理。

传统多模态人脸生成常把空间控制模块拼接到预训练文本扩散模型外部，例如额外加 ControlNet 或多个单模态分支。这类做法能快速复用模型，但不同条件之间常出现冲突：文本说“高发髻”，mask 给出另一种轮廓，模型可能只服从其中一个条件。

MMFace-DiT 的核心是把多模态融合放进 DiT 主干。图像 latent token 和文本 token 并行流动，空间条件经过编码后影响 image stream；全局条件通过 AdaLN 调制每个 DiT block；RoPE attention 在统一注意力中建模 token 间空间关系和语义关系。

```python
# MMFace-DiT 采样伪代码
def mmface_generate(prompt, spatial_condition):
    z = sample_noise_latent()
    text_tokens = clip_text_encoder(prompt)
    spatial_tokens = condition_encoder(spatial_condition)  # mask/sketch/edge
    global_cond = pool(text_tokens, spatial_tokens)

    for step in diffusion_steps:
        img_tokens = patchify(z)
        eps_tokens = dual_stream_dit(
            img_tokens, text_tokens, spatial_tokens,
            timestep=step, global_cond=global_cond
        )
        z = scheduler.step(z, unpatchify(eps_tokens), step)
    return vae.decode(z)
```

对数字人系统而言，MMFace-DiT 的意义在于“可控身份/脸部资产生成”：它不解决音频驱动运动，但能为 talking-head 模型提供结构一致、属性可控的参考人脸。与 VASA/Teller/RAP 这类动态生成方法结合时，它更像上游资产生成器。

#### 🧪 练习题
```yaml
question: "MMFace-DiT 相比外接 ControlNet 式多模态控制的主要优势是什么？"
options:
  - "完全不使用扩散采样"
  - "在 DiT 主干内部统一融合文本和空间条件，减少多模态冲突"
  - "只能生成低分辨率灰度图"
  - "只支持音频输入"
answer: 1
explain: "双流 DiT 让语义 token 与空间 token 在主干中共同建模，比外接多个独立控制模块更利于协同融合。"
```

### RAP

```yaml
id: rap
num: 20
name: RAP
full_name: 实时音频驱动肖像 (Real-time Audio-driven Portrait with Video DiT)
year: '2026'
org: 腾讯
parent: vasa1
paper_url: https://arxiv.org/abs/2601.23456
project_url: ''
category: talking_head
motivation: Video DiT架构实时生成
```

#### 📝 一句话总结
RAP 用高度压缩的图像/音频 token 和 Video Diffusion Transformer 统一生成实时 talking portrait，在低延迟约束下兼顾口型同步、表情自然度和背景稳定性。

#### 🎯 核心要点
- 以参考图像和音频片段为输入，生成自然肖像动画。
- 将图像和音频编码为紧凑 token，降低 Video DiT 的推理成本。
- 使用混合注意力模块同时建模空间细节、时间一致性和音频对齐。
- 重点解决实时条件下压缩 latent 易丢失细节、导致音画同步变差的问题。
- 在 HDTF、VFHQ 等 talking-head 数据上与既有方法比较视觉质量和时序稳定性。

#### 🔬 深入细节
![RAP 框架图](https://arxiv.org/html/2508.05115v1/x2.png)
*图：RAP pipeline。音频和参考图像被编码为压缩 token，经 DiT 去噪生成 talking portrait 视频。*

> ⚠️ 资料限制：manifest 中的 `2601.23456` 返回 404；公开可匹配论文为 `RAP: Real-time Audio-driven Portrait Animation with Video Diffusion Transformer`，本文据此整理。

RAP 面向实时部署的难点与 READ 类似：为了快，必须使用很紧凑的 latent；但 latent 越紧凑，唇部细节、牙齿边界、微表情和背景稳定性越容易丢。RAP 的设计目标是在压缩空间中仍能保留足够的音画同步信息。

框架先把参考图像编码为身份/外观 token，把音频编码为时间对齐 token，再在 Video DiT 中执行条件去噪。混合注意力模块把空间 token、时间 token 和音频 token 放在同一生成过程中交互，避免“嘴动了但脸部其他区域不跟随”或“头部自然但口型不准”的割裂。

```python
# RAP 推理伪代码
def rap_generate(reference_image, audio_clip):
    image_tokens = image_encoder(reference_image)
    audio_tokens = audio_encoder(audio_clip)
    z = sample_compressed_video_noise()

    for step in fast_diffusion_steps:
        eps = video_dit(
            z, step,
            image_tokens=image_tokens,
            audio_tokens=audio_tokens,
            attention="hybrid_spatial_temporal_audio"
        )
        z = scheduler.step(z, eps, step)
    return video_decoder(z)
```

与纯自回归 token 方法相比，RAP 保留了扩散模型的全局修复能力；与标准视频扩散相比，它通过压缩 token 和快速采样控制延迟。它的关键工程取舍是：把高维视频细节尽量交给参考图像和解码器保持，把动态变化集中在音频相关的低维 token 中建模。

#### 🧪 练习题
```yaml
question: "RAP 在实时场景中使用压缩 token 后，最需要额外处理的问题是什么？"
options:
  - "压缩 latent 可能丢失细粒度口型和时序信息，影响音画同步"
  - "模型无法读取参考图像"
  - "视频一定只能黑白输出"
  - "音频不再需要编码"
answer: 0
explain: "实时压缩降低计算量，但也会损失细节；RAP 通过 Video DiT 和混合注意力补偿音频对齐与时序一致性。"
```

### SyncNet

```yaml
id: syncnet
num: 21
name: SyncNet
full_name: '音视频同步判别器 (Out of Time: Audio-Visual Synchronisation)'
year: '2016'
org: 牛津VGG
parent: —
paper_url: https://arxiv.org/abs/1606.00264
project_url: ''
category: lip_sync
motivation: 双流CNN对比学习音视频对齐
```

#### 📝 一句话总结
SyncNet 用双流 CNN 将口部视频片段和语音片段映射到同一嵌入空间，通过距离最小化判断音视频是否同步，成为后续 Wav2Lip、LSE-C/LSE-D 等口型同步训练与评估的基础。

#### 🎯 核心要点
- 使用视觉流处理连续口部 ROI，音频流处理对应语音频谱。
- 用正负时间偏移样本进行自监督/弱监督对比学习，不依赖逐帧人工标注。
- 通过扫描时间 offset 找到音频和视频嵌入距离最小的位置。
- 可用于自动纠正音画延迟、主动说话人检测和唇读辅助。
- 后续 talking-head 论文常把 SyncNet 作为唇同步判别器或评价指标来源。

#### 🔬 深入细节
![SyncNet 论文图示](https://www.robots.ox.ac.uk/~vgg/publications/2016/Chung16a/chung16a.pdf)
*图：官方论文 PDF 中给出了 SyncNet 双流音视频嵌入框架；早期项目页未提供稳定图片直链，因此此处使用官方 PDF 作为图示来源。*

> ⚠️ 资料限制：manifest 中 `1606.00264` 快速核验为不相关 arXiv 条目；SyncNet 对应官方论文为 Oxford VGG 的 `Out of time: automated lip sync in the wild` PDF，本文据该公开资料整理。

SyncNet 的核心不是生成视频，而是回答一个判别问题：给定一小段口部图像序列 \(v\) 和一小段音频 \(a\)，它们是否来自同一时间？如果同步，视觉嵌入和音频嵌入应该接近；如果错开若干帧，距离应该变大。

模型由两个分支组成。视觉分支输入连续 mouth ROI，提取唇形运动特征；音频分支输入 MFCC/频谱片段，提取发音特征。两个分支输出同维 embedding，训练时用 contrastive loss 拉近同步样本、推远异步样本：

$$\mathcal{L}=yD^2+(1-y)\max(m-D,0)^2,\quad D=\|f_v(v)-f_a(a)\|_2$$

推理时，SyncNet 会在多个时间偏移上计算距离曲线，距离最小的位置就是估计的同步 offset。后续 Wav2Lip 把类似判别器变成训练监督：生成器只有让口型与音频 embedding 接近，才能获得低 sync loss。

```python
# SyncNet offset 搜索伪代码
def syncnet_offset(video_mouth, audio):
    scores = []
    for offset in range(-max_shift, max_shift + 1):
        v_emb = visual_cnn(crop_mouth_window(video_mouth))
        a_emb = audio_cnn(shift_audio_window(audio, offset))
        scores.append((offset, l2_distance(v_emb, a_emb)))
    return min(scores, key=lambda x: x[1])  # distance 最小即最同步
```

SyncNet 的影响在于它给 talking-head 领域提供了一个可学习的“同步感知度量”。相比只看像素重建，SyncNet 更关注发音和口型之间的跨模态一致性，因此特别适合作为唇同步任务的训练信号。

#### 🧪 练习题
```yaml
question: "SyncNet 判断音视频同步的核心依据是什么？"
options:
  - "视频帧的颜色直方图是否一致"
  - "音频嵌入和口部视觉嵌入在共同空间中的距离是否足够小"
  - "人脸检测框面积是否固定"
  - "视频是否达到 4K 分辨率"
answer: 1
explain: "SyncNet 训练双流网络学习共同嵌入，同步音视频距离小，错位样本距离大。"
```

### Wav2Lip

```yaml
id: wav2lip
num: 22
name: Wav2Lip
full_name: 口型同步专家 (A Lip Sync Expert Is All You Need)
year: '2020'
org: IIIT Hyderabad
parent: syncnet
paper_url: https://arxiv.org/abs/2008.10010
project_url: ''
category: lip_sync
motivation: SyncNet判别器强制精确同步
```

#### 📝 一句话总结
Wav2Lip 预训练强唇同步专家判别器，并用它监督生成器重绘任意身份视频的嘴部区域，解决野外视频中口型与目标语音不准的问题。

#### 🎯 核心要点
- 输入目标音频和待修改人脸帧，生成与音频匹配的下半脸/嘴部。
- 使用预训练 lip-sync expert 提供同步损失，而不是只靠像素重建。
- 生成器包含人脸编码器、音频编码器和解码器，融合语音与视觉身份特征。
- 额外使用视觉质量判别器提升嘴部纹理真实感。
- 提出更严格的 LSE-C、LSE-D 等同步评价思路，影响后续口型同步论文。

#### 🔬 深入细节
![Wav2Lip 框架图](https://ar5iv.labs.arxiv.org/html/2008.10010/assets/x1.png)
*图：Wav2Lip 使用音频编码、视觉编码和 lip-sync expert 监督生成口型同步结果。*

Wav2Lip 的关键观察是：普通重建损失会鼓励模型生成“平均嘴型”，但不会强制每个音素对应正确唇形。于是论文先训练一个专家同步网络 \(D_{sync}\)，它像 SyncNet 一样判断音频片段和嘴部视频片段是否同步，再把它冻结为生成器的训练监督。

生成器输入包括目标帧、被 mask 的下半脸区域和音频 mel 片段。视觉编码器负责保留身份、姿态、光照；音频编码器提取当前发音；解码器输出修复后的嘴部图像。核心同步损失可写为：

$$\mathcal{L}_{sync}=-\log\left(\cos(f_v(\hat{V}), f_a(A))\right)$$

总损失通常结合重建项、同步项和视觉质量对抗项：

$$\mathcal{L}=\mathcal{L}_{recon}+\lambda_{sync}\mathcal{L}_{sync}+\lambda_{adv}\mathcal{L}_{adv}$$

```python
# Wav2Lip 训练伪代码
def train_wav2lip(face_frames, audio_mel, gt_frames):
    masked_face = mask_lower_half(face_frames)
    pred = generator(masked_face, face_frames, audio_mel)
    recon_loss = l1(pred, gt_frames)
    sync_loss = lip_sync_expert_loss(pred, audio_mel)  # expert 冻结
    adv_loss = visual_quality_discriminator(pred)
    loss = recon_loss + lambda_sync * sync_loss + lambda_adv * adv_loss
    loss.backward()
```

与 MakeItTalk、Audio2Head 等生成完整头部运动的方法相比，Wav2Lip 更专注“口型重绘”。它的优势是同步精度高、身份泛化强；局限是头部运动和表情整体自然度主要继承输入视频，不能从单图生成完整动态。

#### 🧪 练习题
```yaml
question: "Wav2Lip 的核心创新是什么？"
options:
  - "只用 L1 像素损失训练嘴部生成器"
  - "用预训练唇同步专家作为冻结监督，强制生成嘴型与音频匹配"
  - "完全不输入人脸图像"
  - "只生成音频而不生成视频"
answer: 1
explain: "lip-sync expert 提供跨模态同步信号，使生成器不只是重建像素，而是学会按音频发音修正口型。"
```

### MakeItTalk

```yaml
id: makeittalk
num: 23
name: MakeItTalk
full_name: 说话人感知动画 (Speaker-Aware Talking-Head Animation)
year: '2020'
org: Adobe Research
parent: wav2lip
paper_url: https://arxiv.org/abs/2004.12992
project_url: ''
category: lip_sync
motivation: 解耦语音内容与说话人身份
```

#### 📝 一句话总结
MakeItTalk 将语音内容和说话人身份解耦，先预测说话人感知的面部 landmark 运动，再渲染单张肖像为完整 talking-head 视频，解决直接音频到像素难以生成自然表情的问题。

#### 🎯 核心要点
- 以单张人脸图像和音频为输入，输出完整说话头动画。
- 将音频拆分为 content 信息和 speaker 信息，分别控制唇部与个体化动态。
- 使用 landmark 作为中间表示，降低音频到视频的学习难度。
- 预测不仅包含嘴部，也包含脸部轮廓、眉眼和头部相关运动。
- 渲染阶段根据预测 landmark 驱动源图像生成最终视频。

#### 🔬 深入细节
![MakeItTalk 框架图](https://ar5iv.labs.arxiv.org/html/2004.12992/assets/x1.png)
*图：MakeItTalk 从音频中分离内容与说话人特征，预测 landmark 运动并渲染 talking-head。*

MakeItTalk 的动机是：同一句话由不同人说出来，嘴部内容相似，但表情幅度、头部摆动、眨眼和说话习惯不同。因此，音频驱动不应只学习 phoneme 到嘴型的映射，还要建模说话人风格。

方法先提取音频内容特征，驱动与发音强相关的嘴部 landmark；再引入 speaker embedding，控制更个性化的面部动态。landmark 序列作为中间层，既比像素更低维，又能显式表达运动结构。

```python
# MakeItTalk 核心流程伪代码
def makeittalk(source_image, audio):
    base_landmarks = detect_landmarks(source_image)
    content_feat = speech_content_encoder(audio)
    speaker_feat = speaker_encoder(audio)
    landmark_motion = speaker_aware_landmark_decoder(
        base_landmarks, content_feat, speaker_feat
    )
    return face_renderer(source_image, landmark_motion)
```

与 Wav2Lip 相比，MakeItTalk 更强调“整张脸动起来”，而不是只重绘嘴部；与后来的扩散方法相比，它的生成空间较低维、速度更快，但图像真实感和复杂表情细节受限于 landmark 表示和 renderer 能力。

#### 🧪 练习题
```yaml
question: "MakeItTalk 中 speaker-aware 设计主要用于控制什么？"
options:
  - "只控制输出视频编码格式"
  - "控制不同说话人的表情幅度、头部动态和个性化说话风格"
  - "删除音频内容特征"
  - "把 landmark 替换为随机噪声"
answer: 1
explain: "语音内容决定发音相关嘴形，说话人特征决定个体化动态，两者解耦能生成更自然的动画。"
```

### Audio2Head

```yaml
id: audio2head
num: 24
name: Audio2Head
full_name: 音频驱动单样本头部 (Audio-driven One-shot Talking-head)
year: '2021'
org: 浙江大学
parent: makeittalk
paper_url: https://arxiv.org/abs/2107.09293
project_url: ''
category: lip_sync
motivation: Flow网络驱动头部姿态生成
```

#### 📝 一句话总结
Audio2Head 用运动感知 RNN 预测与语音韵律匹配的 6D 头部姿态，并用关键点驱动的 dense motion field 生成完整 talking-head 视频，解决单图说话头缺少自然头动和大姿态下背景不稳的问题。

#### 🎯 核心要点
- 显式预测 6D 刚性头部运动，作为低频整体动态。
- 使用 motion-aware RNN 建模语音韵律与头姿之间的时序关系。
- 再用关键点/光流式 dense motion field 表示整幅图像运动。
- 生成器专注细粒度脸部运动，同时保持非脸区域稳定。
- 支持单张参考图像驱动，强调自然头部运动而非只做嘴部同步。

#### 🔬 深入细节
![Audio2Head 框架图](https://ar5iv.labs.arxiv.org/html/2107.09293/assets/x1.png)
*图：Audio2Head 先预测头部姿态，再通过 dense motion field 驱动单图生成 talking-head。*

Audio2Head 针对的是早期单图 talking-head 的典型问题：嘴会动，但头不动或头动不自然。人的头部运动往往与语音韵律、重音和停顿有关，属于低频整体运动；嘴唇和表情则是高频局部运动。把两者混在一个像素生成器里学习会很困难。

因此论文先预测 6D 头姿 \(p_t=(R_t, T_t)\)，再把头姿转换成关键点运动和 dense motion field。运动场告诉生成器每个像素应从源图哪里采样或如何变形，能在大姿态下更好保持身份和背景。

```python
# Audio2Head 推理伪代码
def audio2head(source_image, audio):
    audio_feat = audio_encoder(audio)
    pose_seq = motion_aware_rnn(audio_feat)  # 6D head pose
    kp_source = keypoint_detector(source_image)
    frames = []
    for pose in pose_seq:
        kp_driving = transform_keypoints(kp_source, pose)
        flow, occlusion = dense_motion_network(kp_source, kp_driving)
        frames.append(generator(source_image, flow, occlusion, audio_feat))
    return frames
```

相比 MakeItTalk 的 landmark 中间表示，Audio2Head 更强调通过 flow/dense motion 描述整幅图像的运动，尤其是头部转动带来的非嘴部区域变化。相比 Wav2Lip，它牺牲部分极致唇同步精度，换取更完整的头部自然运动。

#### 🧪 练习题
```yaml
question: "Audio2Head 为什么先预测 6D 头部姿态？"
options:
  - "因为头部姿态是语音相关的低频整体运动，可帮助生成自然头动并减轻后续生成器负担"
  - "因为不需要生成嘴部"
  - "因为只能处理静音视频"
  - "因为姿态预测可以替代所有图像渲染"
answer: 0
explain: "显式头姿提供整体运动骨架，后续 dense motion 和生成器再补充脸部细节。"
```

### DiffTalk

```yaml
id: difftalk
num: 25
name: DiffTalk
full_name: 扩散模型肖像动画 (Crafting Diffusion Models for Portraits)
year: '2023'
org: 学术界
parent: wav2lip
paper_url: https://arxiv.org/abs/2301.03786
project_url: ''
category: lip_sync
motivation: 首个扩散模型口型同步方法
```

#### 📝 一句话总结
DiffTalk 将 talking-head 生成建模为音频条件的潜在扩散去噪过程，并同时引入参考人脸和 landmark 条件，解决传统方法在生成质量与跨身份泛化之间难以兼顾的问题。

#### 🎯 核心要点
- 将肖像动画放入 Latent Diffusion Model 中生成，降低像素扩散成本。
- 不只使用音频，还引入参考人脸图像和 landmark 作为身份与结构条件。
- 通过时序一致的去噪过程生成连贯 talking-head 序列。
- 将口型同步、身份保持和视觉质量统一到扩散生成框架。
- 相比纯 GAN/flow 方法，具备更好的生成多样性和修复能力。

#### 🔬 深入细节
![DiffTalk 框架图](https://ar5iv.labs.arxiv.org/html/2301.03786/assets/x1.png)
*图：DiffTalk 将参考肖像、音频和 landmark 条件注入潜在扩散模型，逐步去噪生成说话人视频。*

DiffTalk 的背景是 2023 年前后潜在扩散在图像生成上已经表现出强大的细节建模能力，但 talking-head 还常依赖 GAN、landmark renderer 或局部口型修复。DiffTalk 的关键尝试是把肖像动画改写为“条件视频 latent 去噪”。

在训练中，真实视频经 VAE 编码为 latent \(z_0\)，扩散前向过程加入噪声得到 \(z_t\)。模型学习在音频 \(a\)、参考图 \(r\)、landmark \(l\) 条件下预测噪声：

$$\mathcal{L}=\mathbb{E}_{z_0,t,\epsilon}\|\epsilon-\epsilon_\theta(z_t,t,a,r,l)\|_2^2$$

音频决定嘴部动态，参考图约束身份外观，landmark 提供几何结构和大致姿态。三者结合后，扩散模型不必从音频中同时猜身份、纹理和结构，生成难度显著降低。

```python
# DiffTalk 采样伪代码
def difftalk_generate(reference_image, audio, landmarks):
    ref_cond = reference_encoder(reference_image)
    audio_cond = audio_encoder(audio)
    lm_cond = landmark_encoder(landmarks)
    z = sample_noise_latent()

    for step in diffusion_steps:
        eps = latent_unet(z, step, ref_cond, audio_cond, lm_cond)
        z = scheduler.step(z, eps, step)
    return vae.decode(z)
```

与 Wav2Lip 相比，DiffTalk 不局限于嘴部修复，而是能生成更完整的肖像动画；与后来的 DiT/实时方法相比，它的推理速度较慢，但奠定了“扩散模型 + 多条件 talking-head”的基本范式。

#### 🧪 练习题
```yaml
question: "DiffTalk 为什么同时使用音频、参考图和 landmark 条件？"
options:
  - "三类条件分别约束口型动态、身份外观和几何结构，降低扩散生成难度"
  - "为了让模型忽略音频"
  - "为了只生成随机头像"
  - "为了取消 VAE latent"
answer: 0
explain: "音频、参考图和 landmark 分别提供不同信息，组合后能同时提升同步、身份保持和结构稳定性。"
```

### LatentSync

```yaml
id: latentsync
num: 26
name: LatentSync
full_name: 潜在扩散口型同步 (Lip Sync with SyncNet in LDM)
year: '2024'
org: 字节跳动
parent: difftalk
paper_url: https://arxiv.org/abs/2412.09262
project_url: ''
category: lip_sync
motivation: 潜在空间口型修正消除伪影
```

#### 📝 一句话总结
LatentSync 提出在音频条件潜在扩散模型中引入稳定收敛的 SyncNet 监督和 TREPA 时序表征对齐，解决端到端 LDM 容易依赖视觉捷径、忽略音频-口型对应关系的问题。

#### 🎯 核心要点
- **端到端潜在扩散口型同步**：在 VAE latent 中进行视频 inpainting，避免像素扩散的高成本和两阶段方法的信息瓶颈
- **shortcut learning 诊断**：指出模型会利用嘴部周围视觉上下文猜口型，而不是严格对齐输入音频
- **StableSyncNet**：重新设计 SyncNet 的视觉/音频编码器、输入帧数、batch size 和音画偏移预处理，使口型同步监督更可靠
- **像素空间 SyncNet 监督**：训练时把预测 latent 解码到像素空间计算同步损失，避免 latent 空间丢失唇部细节
- **TREPA 时序表征对齐**：用 VideoMAE-v2 等时序视觉表征约束生成片段，降低牙齿、嘴唇、胡须等高频细节闪烁
- **评估数据**：在 HDTF、VoxCeleb2 等说话人视频数据上比较 FID、FVD、SyncNet confidence、LMD 等指标

#### 🔬 深入细节
##### 核心示意图

![LatentSync 框架图](https://arxiv.org/html/2412.09262v2/x3.png)
*图：LatentSync 使用 Whisper 音频嵌入、参考帧、masked frames 和 noisy latents 作为 U-Net 输入，并在训练时加入 StableSyncNet 与 TREPA 监督。*

资料说明：该论文的 arXiv HTML 可访问，图像链接来自 arXiv HTML 转换页；这里优先解读方法部分，实验数字只保留对方法有帮助的结论。

##### 核心流程伪代码

```python
# LatentSync 训练流程简化
for video_clip, audio in dataloader:
    ref_frames, masked_frames = build_inpainting_inputs(video_clip)
    z0 = vae.encode(video_clip)
    t = sample_diffusion_step()
    eps = normal_like(z0)
    zt = sqrt(alpha_bar[t]) * z0 + sqrt(1 - alpha_bar[t]) * eps

    audio_tokens = whisper_encoder(audio)
    eps_hat = unet(concat(zt, ref_frames, masked_frames),
                   audio_context=audio_tokens,
                   timestep=t)
    z0_hat = predict_x0(zt, eps_hat, t)

    loss_diff = mse(eps_hat, eps)
    frames_hat = vae.decode(z0_hat)
    loss_sync = stable_syncnet_loss(frames_hat, audio)
    loss_trepa = temporal_representation_alignment(frames_hat, video_clip)
    loss = loss_diff + lambda_sync * loss_sync + lambda_trepa * loss_trepa
    loss.backward()
```

##### 方法解读

LatentSync 的出发点是：把音频条件 LDM 直接用于口型同步时，模型看似有音频输入，实际可能走视觉捷径。因为输入包含 masked face、参考帧和局部面部肌肉信息，U-Net 能从眼睛、脸颊、嘴角残留形态中推测一个“合理嘴形”，但这个嘴形不一定与当前音素严格同步。论文通过改变 mask 尺寸并观察 SyncNet confidence，验证了这种 shortcut learning：没有 SyncNet 监督时，mask 越小模型越容易依赖视觉上下文；加入同步监督后，对 mask 尺寸的敏感性明显下降。

模型主体仍是 latent diffusion inpainting。干净视频帧经 VAE 编码为 \(z_0\)，前向扩散为：

$$
z_t=\sqrt{\bar{\alpha}_t}z_0+\sqrt{1-\bar{\alpha}_t}\epsilon
$$

U-Net 接收 noisy latent、masked frames、reference frames 和 Whisper 音频 token，并通过 cross-attention 注入语音条件。基础扩散损失仍是噪声预测：

$$
\mathcal{L}_{diff}=\mathbb{E}_{t,z_0,\epsilon}\left[\|\epsilon-\epsilon_\theta(z_t,a,t)\|_2^2\right]
$$

关键增量在监督信号。LatentSync 尝试把 SyncNet 放到 latent 空间或像素空间，最后倾向像素空间监督：先把预测 latent 解码成图像，再输入 StableSyncNet 计算音频-唇部同步损失。直觉是 VAE latent 已压缩了细粒度唇形、牙齿边缘等信息，直接在 latent 上训练同步网络不稳定；在像素空间计算同步更贴近真实口型判别。

StableSyncNet 不是简单复用旧 SyncNet，而是针对高分辨率、人脸对齐和大批量训练重新调参。论文报告的关键经验包括：用 SD U-Net encoder 变体作为视觉/音频编码器、较大 batch size、合适的连续帧数、先做仿射对齐再校正音画偏移。这样训练出的 SyncNet 在 HDTF out-of-distribution 测试上更稳定，才能作为扩散模型的有效教师。

TREPA 解决的是另一个常见问题：逐帧口型看起来对齐，但跨帧高频细节闪烁。它用强视频表征模型抽取 temporal representation，让生成片段和真实片段在时序特征上接近。和只做像素/LPIPS 重建不同，TREPA 关注“运动表征是否连贯”，因此对牙齿、唇线、胡须等细节抖动更有约束力。

> 💡 关键：LatentSync 的核心不是“把扩散模型用于口型同步”本身，而是证明音频条件 LDM 会偷懒，并用可收敛的 SyncNet 监督把学习目标重新拉回音频-视觉相关性。

#### 🧪 练习题
```yaml
question: "LatentSync 中 StableSyncNet 监督主要解决什么问题？"
options:
  - "让 VAE latent 的维度更小"
  - "迫使 LDM 学习音频与唇部运动的相关性，减少视觉捷径"
  - "替代 Whisper 音频编码器"
  - "只提升视频背景清晰度"
answer: 1
explain: "论文指出音频条件 LDM 容易依赖嘴部周围视觉线索猜口型。StableSyncNet 提供音频-唇形同步监督，使模型不能只靠视觉上下文完成 inpainting。"
```

### Audio2Face-3D

```yaml
id: audio2face3d
num: 27
name: Audio2Face-3D
full_name: 音频驱动真实面部动画 (Audio-driven Realistic Facial Animation)
year: '2025'
org: NVIDIA
parent: latentsync
paper_url: https://developer.nvidia.com/audio2face
project_url: ''
category: lip_sync
motivation: 开源SDK集成LLM会话能力
```

#### 📝 一句话总结
Audio2Face-3D 提出从语音直接生成高质量 3D 面部、舌头、下颌和眼部动画的工业级系统，并通过回归网络、扩散网络、情感控制、流式推理和 blendshape 求解把神经输出接入实际数字人制作管线。

#### 🎯 核心要点
- **两类核心网络**：Audio2Face-3D-v2.3 使用回归网络，Audio2Face-3D-v3.0 使用扩散去噪网络
- **密集 3D 输出**：预测 skin、tongue、jaw、eye 等组件的动画，而不是只输出 2D 嘴部或少量关键点
- **混合音频编码**：结合自相关音频特征与 Wav2Vec 2.0 / HuBERT 类自监督语音特征，兼顾音高、能量、音素和多语言泛化
- **情感与身份条件**：用 emotion vector、identity vector 或文本情感嵌入调节说话风格和表情强度
- **辅助 phoneme prediction**：训练期显式预测音素，改善双唇音等精细口型
- **流式推理**：用滑动 1s 音频窗口生成中心 0.5s 动画片段，支持实时数字人交互
- **后处理与 rig 适配**：提供 ARKit/自定义 blendshape solver、jaw 约束和 Maya/SDK 集成

#### 🔬 深入细节
##### 核心示意图

![Audio2Face-3D 扩散网络架构](https://arxiv.org/html/2508.16401/x6.png)
*图：Audio2Face-3D-v3.0 的扩散式网络，以噪声动画、扩散步、音频、情感和身份为条件，预测去噪后的面部动画偏移。*

资料说明：manifest 的 `paper_url` 是 NVIDIA Audio2Face 产品页。方法细节主要依据公开的 Audio2Face-3D 论文页面 `https://arxiv.org/abs/2508.16401` 与 NVIDIA 官方页面；该项更接近系统/SDK论文，而不是单一学术算法。

##### 核心流程伪代码

```python
# Audio2Face-3D v3.0 推理流程简化
def audio2face3d(audio, emotion, identity, mode="streaming"):
    if mode == "offline":
        windows = [audio]
    else:
        windows = sliding_windows(audio, length=1.0, stride=0.5)

    hidden = None
    output = []
    for wav in windows:
        audio_feat = hybrid_audio_encoder(wav)      # autocorr + SSL speech features
        x_t = sample_gaussian_animation()
        for t in reversed(diffusion_steps):          # 实时模式可用很少步数
            cond = concat(audio_feat, emotion, identity, timestep_embed(t))
            x0_hat, hidden = gru_denoiser(x_t, cond, hidden)
            x_t = ddim_or_ddpm_step(x_t, x0_hat, t)
        output.append(center_segment(x0_hat, duration=0.5))

    dense_motion = stitch(output)
    blendshape_weights = solve_blendshapes(dense_motion)
    return postprocess(blendshape_weights)
```

##### 方法解读

Audio2Face-3D 的目标不是只让嘴巴“对上字”，而是从语音生成可以落到真实数字人 rig 上的 3D 动画。它把输出拆为面部皮肤、舌头、下颌、眼睛等通道，形式上可写为：

$$
f_\theta(A,e,i,t)\rightarrow (x_{\text{skin}},x_{\text{tongue}},x_{\text{jaw}},x_{\text{eye}})
$$

其中 \(A\) 是语音，\(e\) 是情感条件，\(i\) 是身份条件。这样设计的好处是它不仅能描述唇形闭合，还能对下颌开合、舌位和上半脸情感作协同控制。

v2.3 回归网络把音频特征送入 animation decoder，一步预测动画帧；v3.0 则使用扩散模型，把 noisy animation 逐步去噪为干净运动。扩散版的训练目标接近 \(x_0\)-prediction：不是预测噪声 \(\epsilon\)，而是直接预测去噪动画 \(\hat{X}_0\)，并用 MSE、上脸正则、lip distance 等项约束输出：

$$
\mathcal{L}=\mathcal{L}_{simple}+\alpha_{\text{upper}}\mathcal{L}_{upper}+\alpha_{\text{lip}}\mathcal{L}_{lip}
$$

音频编码是系统泛化的关键。传统自相关特征能稳定捕捉 pitch、volume，对唱歌和非语言声音有帮助；Wav2Vec 2.0 / HuBERT 类特征提供音素级语义和跨语言能力。论文还加入 phoneme prediction head 作为训练期辅助任务，让音频编码器显式学习音素边界，尤其改善 /m/、/b/、/p/ 等双唇音闭合。

面向实时数字人时，完整扩散采样太慢。Audio2Face-3D 用滑动窗口实现 streaming inference：每次取约 1 秒音频，生成中间 0.5 秒动画并把 GRU hidden state 传给下一段。这样既能利用左右上下文，又能保持低延迟；论文还指出少量扩散步已足以得到可用结果。

最后一层工程价值在 retargeting。神经网络通常输出某个模板拓扑上的密集运动，但应用侧需要 ARKit 或自定义 rig 的 blendshape 权重。Audio2Face-3D 因此提供从 dense geometry 到 blendshape weights 的求解器，并用下颌软约束、表情区域编辑、平滑后处理把结果接到 Maya、ACE、LLM 对话数字人等管线中。

> ⚠️ 注意：Audio2Face-3D 的贡献很大一部分是“可部署系统”而非单点网络结构，因此评价时要同时看口型同步、情感自然度、流式延迟和角色重定向质量。

#### 🧪 练习题
```yaml
question: "Audio2Face-3D 为什么需要 blendshape solver？"
options:
  - "把音频采样率转换为 16kHz"
  - "把神经网络生成的密集 3D 面部运动转换为可被角色 rig 使用的 blendshape 权重"
  - "替代扩散模型中的噪声调度"
  - "只用于训练 phoneme classifier"
answer: 1
explain: "实际数字人通常由 ARKit 或自定义 blendshape rig 驱动，网络的 dense geometry 输出需要被求解成这些 rig 参数，才能进入动画制作和实时渲染管线。"
```

### FLAME

```yaml
id: flame
num: 28
name: FLAME
full_name: 面部参数化模型 (Faces Learned with Articulated Model)
year: '2017'
org: MPI-IS
parent: —
paper_url: https://arxiv.org/abs/1606.05535
project_url: ''
category: expression
motivation: 统计学3D面部颈部联合参数化
```

#### 📝 一句话总结
FLAME 提出把身份形状、表情 blendshape、下颌/颈部/眼球关节姿态和线性蒙皮统一到一个低维可微 3D 头部模型中，解决传统 3DMM 对头颈姿态和大表情建模不足的问题。

#### 🎯 核心要点
- **统计头部模型**：从 3D/4D 扫描中学习身份形状空间和表情空间
- **关节式建模**：显式包含颈部、下颌、眼球等 articulations，而不是只拟合静态面部网格
- **线性 blend skinning**：沿用 SMPL 风格的 pose-dependent deformation 与 LBS，使模型可动画化
- **低维参数接口**：通常由形状参数 \(\beta\)、表情参数 \(\psi\)、姿态参数 \(\theta\) 控制，便于优化和学习
- **可微拟合基础件**：后续 DECA、SMPL-X、talking head、avatar reconstruction 等大量方法以 FLAME 作为脸部先验
- **资料限制**：manifest 中 arXiv 链接可访问，但 FLAME 的正式资料主要来自 MPI 官方页面和论文 PDF/项目资源

#### 🔬 深入细节
##### 核心示意图

![FLAME 模型示意图](https://ar5iv.labs.arxiv.org/html/1606.05535/assets/x1.png)
*图：FLAME 的形状、表情和姿态参数共同驱动头部网格，输出带颈部与下颌运动的可动画化人脸。*

##### 核心流程伪代码

```python
# FLAME 前向模型简化
def flame_forward(beta, psi, theta):
    # beta: identity shape, psi: expression, theta: neck/jaw/eye pose
    T = template_vertices
    T = T + shape_basis @ beta
    T = T + expression_basis @ psi
    T = T + pose_corrective_blendshapes(theta)

    joints = regress_joints(T)
    vertices = linear_blend_skinning(
        vertices=T,
        joints=joints,
        rotations=axis_angle_to_rotmat(theta),
        skinning_weights=W,
    )
    landmarks = barycentric_landmark_interpolation(vertices)
    return vertices, landmarks
```

##### 方法解读

传统 3DMM 常把脸看成一个静态线性空间：

$$
S=\bar{S}+B_{\text{shape}}\beta+B_{\text{exp}}\psi
$$

这种表示易于拟合，但对大幅张嘴、转头、抬头、低头等带关节运动的变化不够自然。FLAME 的核心是把面部统计模型和 articulated body model 思路合并：先用身份和表情 blendshape 得到模板形变，再用姿态相关修正与线性蒙皮产生最终网格。

更完整的形式可以写成：

$$
M(\beta,\psi,\theta)=W(T_P(\beta,\psi,\theta), J(\beta), \theta, \mathcal{W})
$$

其中 \(T_P\) 是加入身份、表情和 pose-corrective blendshape 后的模板，\(J(\beta)\) 是由形状回归出的关节位置，\(\mathcal{W}\) 是蒙皮权重，\(W\) 是 LBS。这个结构让下颌张开不再只是局部嘴部顶点线性形变，而是受 jaw joint 旋转控制，因而更适合说话、咀嚼和夸张表情。

FLAME 的另一个重要选择是把颈部纳入模型。对数字人来说，脸部表情和头部姿态不是分离的：说话时下颌、脖子和头部会共同运动。加入 neck pose 可以让模型在拟合视频或动捕时避免把头部转动错误吸收到表情系数里，减少身份形变和表情形变的混淆。

训练上，FLAME 依赖大规模 3D head scans 和 4D expression sequences。身份空间从中性扫描学习，表情空间从动态表情序列学习，姿态相关形变则补偿骨骼旋转带来的非刚性变化。最终模型的参数低维、可微、可渲染，因此非常适合作为 inverse rendering、单图 3D face reconstruction、talking head motion transfer 的优化变量。

和更早的 Basel Face Model 相比，FLAME 的关键优势不是纹理统计，而是“可动画化”：它把可控关节、表情空间和头颈一致性放进同一个函数。后续 DECA 在 FLAME 上增加细节位移，SMPL-X 把 FLAME 融入全身模型，NPHM/GPHM 等新模型也常以 FLAME 作为对照基线或初始化先验。

> 💡 关键：FLAME 是很多数字人方法的“几何参数接口”，它牺牲了毛发、牙齿、细纹等高频外观，换来稳定、低维、可优化的头脸控制空间。

#### 🧪 练习题
```yaml
question: "FLAME 相比传统线性 3DMM 的核心改进是什么？"
options:
  - "只使用 2D landmark，不需要 3D 扫描"
  - "引入颈部、下颌等关节姿态和线性蒙皮，使人脸模型可动画化"
  - "完全用 NeRF 替代网格"
  - "只建模头发和衣服"
answer: 1
explain: "FLAME 不只是线性形状/表情 PCA，还显式建模 neck、jaw、eyes 等姿态，并用 LBS 生成最终网格，因此能更自然地表示说话和头颈运动。"
```

### DECA

```yaml
id: deca
num: 29
name: DECA
full_name: 可动画化细节人脸 (Learning Animatable Detailed 3D Face)
year: '2021'
org: MPI-IS
parent: flame
paper_url: https://arxiv.org/abs/2012.04012
project_url: ''
category: expression
motivation: FLAME基础上增加细节置换
```

#### 📝 一句话总结
DECA 在 FLAME 的低维可动画化头脸模型上增加 UV 位移细节解码器，从单张野外图像同时恢复稳定的粗几何、表情和可随表情变化的皱纹细节。

#### 🎯 核心要点
- **粗到细两阶段表征**：粗层用 FLAME 估计身份、表情、姿态、相机、反照率和光照；细层用 UV displacement map 补充皱纹和皮肤细节
- **可动画化细节**：细节解码器不仅依赖个人 detail code，还依赖表情，使皱纹可随表情变化
- **野外单图训练**：使用 differentiable rendering，把 landmark、photometric、identity、regularization 等损失组合起来训练
- **detail consistency**：同一身份不同表情的高频细节应共享身份相关部分，同时允许表情相关皱纹变化
- **FLAME 兼容**：输出仍保持 FLAME 参数接口，方便后续表情编辑、重定向和 talking head 驱动
- **弱监督优势**：不需要每张训练图都有高精 3D scan 标注，可从 2D 图像学习细节先验

#### 🔬 深入细节
##### 核心示意图

![DECA teaser](https://ar5iv.labs.arxiv.org/html/2012.04012/assets/images/teaser/deca_teaser_solid_lines2.png)
*图：DECA 从单张图像估计 FLAME 粗模型，并在 UV 空间生成可动画化细节位移。*

##### 核心流程伪代码

```python
# DECA 单图重建与训练简化
def deca_forward(image):
    coarse = coarse_encoder(image)
    beta, psi, theta, cam, albedo, lighting = unpack(coarse)
    flame_vertices = FLAME(beta, psi, theta)

    detail_code = detail_encoder(image)
    uv_disp = detail_decoder(detail_code, expression=psi, pose=theta)
    detailed_vertices = apply_uv_displacement(flame_vertices, uv_disp)

    rendered = differentiable_render(detailed_vertices, albedo, lighting, cam)
    return rendered, flame_vertices, detailed_vertices, uv_disp

for batch in images:
    rendered, coarse_mesh, detail_mesh, uv_disp = deca_forward(batch)
    loss = landmark_loss(rendered, batch)
    loss += photometric_loss(rendered, batch)
    loss += identity_loss(rendered, batch)
    loss += regularize_flame_and_detail(coarse_mesh, uv_disp)
    loss += detail_consistency_loss(batch)
    loss.backward()
```

##### 方法解读

FLAME 能稳定表达身份、表情和头部姿态，但它的网格是低频统计模型，无法表达额头纹、法令纹、眼角皱纹、嘴唇褶皱等高频几何。直接把这些细节烘焙到身份形状里会导致不可动画：一张皱眉图像的皱纹会在所有表情下都存在。DECA 的核心是把“可控粗模型”和“表情相关细节”分离。

粗层仍由 FLAME 给出：

$$
M_c = M_{\text{FLAME}}(\beta,\psi,\theta)
$$

其中 \(\beta\) 控制身份，\(\psi\) 控制表情，\(\theta\) 控制头颈和下颌姿态。粗层还估计相机 \(c\)、albedo \(\alpha\) 和 spherical harmonics lighting \(l\)，用于可微渲染和图像重建损失。

细层在 UV 空间预测 displacement map：

$$
D = F_d(z_d,\psi,\theta)
$$

这里 \(z_d\) 是从图像编码出的身份相关细节 latent，\(\psi,\theta\) 提供当前表情和姿态条件。将 \(D\) 沿法线方向施加到 FLAME 表面，就得到详细几何。UV 空间的好处是拓扑固定、方便卷积解码，也便于把细节贴回可动画化网格。

训练的难点是没有大规模“单图到高精细节 3D”的监督。DECA 用 differentiable rendering 把几何投影回图像，通过 2D landmark、光度误差、感知/身份特征和正则项训练。同时，detail consistency 约束同一身份在不同表情下的细节编码保持一致，避免网络把表情皱纹错误吸收到身份 detail code 中。

DECA 与普通 3D face reconstruction 的区别在于“细节可被重新驱动”。推理时保留 \(z_d\)，改变 \(\psi\) 就能生成同一身份在不同表情下合理变化的皱纹，而不是固定贴一张高频 bump map。这也是它被大量 avatar、talking head 和 face reenactment 方法采用的原因。

> 💡 关键：DECA 并不是替代 FLAME，而是在 FLAME 稳定参数空间上学习一个表情条件的高频位移层。

#### 🧪 练习题
```yaml
question: "DECA 为什么让细节解码器同时依赖 detail code 和表情参数？"
options:
  - "为了减少 FLAME 顶点数量"
  - "为了让身份相关皮肤细节稳定，同时让皱纹等高频细节随表情变化"
  - "为了完全不需要可微渲染"
  - "为了把 3D 模型转换成 2D 关键点"
answer: 1
explain: "如果细节只由身份 code 决定，皱纹会变成静态贴图；加入表情条件后，细节位移可以随笑、皱眉、张嘴等动作变化。"
```

### SadTalker

```yaml
id: sadtalker
num: 30
name: SadTalker
full_name: 真实3D运动系数学习 (Learning Realistic 3D Motion Coefficients)
year: '2023'
org: 西安交大/腾讯
parent: deca
paper_url: https://arxiv.org/abs/2211.12194
project_url: ''
category: expression
motivation: 3DMM运动系数作为中间表征
```

#### 📝 一句话总结
SadTalker 提出以 3DMM 运动系数作为中间表征，通过 ExpNet 从音频生成仅含唇部运动的表情系数、PoseVAE 生成风格化头部姿态，再经 3D 感知面部渲染器（mappingNet + face-vid2vid）将显式 3DMM 系数映射到隐式无监督 3D 关键点空间以合成最终视频，解决了此前方法中面部扭曲、身份偏移和运动不自然的问题。

#### 🎯 核心要点
- **3DMM 解耦中间表征**：将说话人动画分解为表情系数 \(\beta\)（64 维）和头部姿态 \(\rho\)（6 维旋转+平移），分别独立建模，降低音频到运动映射的不确定性
- **ExpNet（音频→表情）**：ResNet 音频编码器 + 线性映射网络，以首帧表情 \(\beta_0\) 消除身份不确定性，以 Wav2Lip 生成的"仅唇部"系数为训练目标，附加眨眼控制信号 \(z_{blink}\)
- **PoseVAE（音频→头部姿态）**：条件 VAE 学习姿态残差（相对首帧 \(\rho_0\)），以音频特征和风格身份标签为条件，生成多样且节奏对齐的头部运动
- **3D 感知面部渲染器（FaceRender）**：基于 face-vid2vid 的无监督 3D 关键点动画框架，新增 mappingNet 将显式 3DMM 系数映射到隐式关键点空间，两阶段训练（先自监督动画器，再冻结训练映射网络）
- **多损失函数协同**：蒸馏损失 \(\mathcal{L}_{distill}\)、唇读损失 \(\mathcal{L}_{read}\)、关键点损失 \(\mathcal{L}_{lks}\)、KL 散度 \(\mathcal{L}_{KL}\)、对抗损失 \(\mathcal{L}_{GAN}\)
- **HDTF 数据集评测**：在 FID、CPBD、CSIM、LSE-C/D、Diversity、Beat Align 等多指标上全面优于 MakeItTalk、Audio2Head 等方法

#### 🔬 深入细节
##### 整体框架

![SadTalker 整体框架](https://ar5iv.labs.arxiv.org/html/2211.12194/assets/x2.png)
*图：SadTalker 整体流程。音频分别经 ExpNet 和 PoseVAE 生成表情系数与头部姿态，再通过 FaceRender 中的 mappingNet 映射到无监督 3D 关键点空间，驱动源图像生成最终视频。*

SadTalker 的核心观察是：**说话时不同面部运动与音频的关联强度不同**——唇部运动与音频高度相关，而头部姿态与音频仅有弱相关性。因此，将运动生成解耦为两个独立子任务，分别用不同网络建模，可以显著降低学习难度。

系统以 3D 可变形模型（3DMM）的运动系数作为中间表征。3DMM 将人脸建模为：

$$S = \bar{S} + \alpha U_{id} + \beta U_{exp}$$

其中 \(\bar{S}\) 为平均脸形状，\(\alpha \in \mathbb{R}^{80}\) 为身份系数，\(\beta \in \mathbb{R}^{64}\) 为表情系数，\(U_{id}\) 和 \(U_{exp}\) 分别为对应的 PCA 基。头部姿态 \(\rho \in \mathbb{R}^{6}\) 包含 3 维旋转和 3 维平移。

##### ExpNet：音频到表情系数生成

![ExpNet 结构](https://ar5iv.labs.arxiv.org/html/2211.12194/assets/x3.png)
*图：ExpNet 结构。利用 Wav2Lip 生成仅含唇部运动的视频，再通过 3D 重建提取"仅唇部"表情系数作为训练目标，同时引入可微分 3D 渲染器计算感知损失。*

音频到表情的映射面临两个核心困难：(1) 不同身份说同样的话会有不同的表情模式（一对多映射）；(2) 表情系数中包含大量与音频无关的运动（如眨眼），干扰预测精度。

**解决身份不确定性**：将首帧的表情系数 \(\beta_0\) 作为参考条件输入网络，将表情运动锚定到特定身份。

**解决音频无关运动**：利用预训练的 Wav2Lip 生成仅含唇部运动的视频，再通过 3D 人脸重建网络 \(R_e\) 提取其表情系数作为训练目标。这样训练目标中只包含唇部相关运动，其他面部运动（如眨眼）通过额外的控制信号和损失函数引入。

网络公式为：

$$\beta_{\{1,...,t\}} = \Phi_M(\Phi_A(a_{\{1,...,t\}}), z_{blink}, \beta_0)$$

其中 \(\Phi_A\) 为 ResNet 音频编码器（输入为 0.2s 梅尔频谱图），\(\Phi_M\) 为线性映射网络，\(z_{blink} \in [0,1]\) 为眨眼控制信号。

**损失函数设计**：
- **蒸馏损失** \(\mathcal{L}_{distill}\)：生成系数与 Wav2Lip 仅唇部系数之间的差异
- **关键点损失** \(\mathcal{L}_{lks}\)：通过可微分 3D 渲染器 \(R_d\) 渲染面部后，计算关键点距离（同时监督眨眼范围和整体表情精度）
- **唇读损失** \(\mathcal{L}_{read}\)：使用预训练唇读网络 \(\Phi_{reader}\) 计算时序唇部感知损失，确保唇形的时序一致性

> 💡 **关键设计**：仅使用首帧 \(I_0\) 输入 Wav2Lip 生成训练目标，避免了姿态变化和其他表情对唇部系数提取的干扰。

##### PoseVAE：音频到头部姿态生成

![PoseVAE 结构](https://ar5iv.labs.arxiv.org/html/2211.12194/assets/x4.png)
*图：PoseVAE 结构。条件 VAE 以音频特征和风格标签为条件，学习头部姿态相对首帧的残差分布。*

头部姿态与音频的关系较弱且具有多样性——同一段音频可以对应多种合理的头部运动。因此采用条件 VAE（CVAE）建模姿态分布。

**核心设计**：
- **残差学习**：不直接生成绝对姿态，而是学习相对首帧姿态 \(\rho_0\) 的残差，使推理时能生成更长、更稳定、更连续的头部运动
- **条件输入**：音频特征 \(a_{\{1,...,t\}}\) 提供节奏信息，风格身份标签 \(Z_{style}\) 提供个人说话习惯的先验
- **网络结构**：编码器和解码器均为两层 MLP，训练时使用连续 32 帧

**损失函数**：
- KL 散度 \(\mathcal{L}_{KL}\)：约束生成运动的分布
- MSE 损失 \(\mathcal{L}_{MSE}\)：保证生成质量
- 对抗损失 \(\mathcal{L}_{GAN}\)：提升运动的真实感和多样性

##### 3D 感知面部渲染器（FaceRender）

![FaceRender 结构](https://ar5iv.labs.arxiv.org/html/2211.12194/assets/x5.png)
*图：FaceRender 与 face-vid2vid 的对比。由于没有驱动视频，SadTalker 通过 mappingNet 将显式 3DMM 系数映射到 face-vid2vid 的无监督 3D 关键点空间。*

face-vid2vid 是一个强大的图像动画框架，但需要真实驱动视频提供运动信号。SadTalker 的 FaceRender 通过 **mappingNet** 桥接了显式 3DMM 系数与隐式无监督 3D 关键点之间的鸿沟。

**mappingNet 设计**：由多层 1D 卷积构成，输入为时间窗口内的 3DMM 系数（仅表情 + 头部姿态，不含面部对齐系数），输出为无监督 3D 关键点。

> ⚠️ **重要发现**：论文实验证明，使用面部对齐（crop）系数作为运动系数的一部分（如 PIRenderer 的做法）会导致生成视频出现不自然的对齐运动。SadTalker 仅使用表情和姿态系数，避免了此问题。

**两阶段训练**：
1. **第一阶段**：以自监督方式训练 face-vid2vid（外观编码器、规范关键点估计器、图像生成器）
2. **第二阶段**：冻结第一阶段所有参数，仅训练 mappingNet，使用 GT 视频的 3DMM 系数进行重建式训练，监督信号包括无监督关键点域的 \(\mathcal{L}_1\) 损失和最终生成视频的损失

```python
# SadTalker 推理伪代码
def sadtalker_inference(source_image, audio, style_id):
    # Step 1: 提取参考帧 3DMM 系数
    alpha_0, beta_0, rho_0 = face_3d_recon(source_image)
    
    # Step 2: 音频特征提取 (0.2s mel-spectrogram per frame)
    audio_features = extract_mel_spectrogram(audio)  # [T, mel_dim]
    
    # Step 3: ExpNet 生成表情系数
    z_blink = sample_blink_signal()  # controllable [0, 1]
    beta_seq = ExpNet(audio_features, z_blink, beta_0)  # [T, 64]
    
    # Step 4: PoseVAE 生成头部姿态 (残差 + 首帧)
    z = sample_from_prior()  # VAE latent
    rho_residual = PoseVAE.decode(z, audio_features, style_id)
    rho_seq = rho_0 + rho_residual  # [T, 6]
    
    # Step 5: FaceRender 生成最终视频
    # mappingNet: 3DMM coefficients -> unsupervised 3D keypoints
    keypoints_driven = mappingNet(beta_seq, rho_seq)  # temporal window
    keypoints_source = keypoint_estimator(source_image)
    appearance = appearance_encoder(source_image)
    
    video_frames = []
    for t in range(T):
        frame = image_generator(appearance, keypoints_source, keypoints_driven[t])
        video_frames.append(frame)
    
    return video_frames
```

##### 实验结果与消融分析

在 HDTF 数据集（346 个视频，约 70k 帧）上的评测结果：

| 方法 | LSE-C ↑ | LSE-D ↓ | Diversity ↑ | Beat Align ↑ | FID ↓ | CSIM ↑ |
|------|---------|---------|-------------|--------------|-------|--------|
| Real Video | 8.211 | 6.982 | 0.259 | 0.271 | 0.000 | 1.000 |
| Wav2Lip | **10.221** | **5.535** | — | — | 21.725 | 0.849 |
| MakeItTalk | 5.110 | 10.059 | 0.257 | 0.268 | 28.243 | 0.838 |
| Audio2Head | 7.357 | 7.535 | 0.181 | 0.267 | 24.392 | 0.823 |
| **SadTalker** | 7.290 | 7.772 | **0.278** | **0.293** | **22.057** | 0.843 |

> 💡 **关键观察**：SadTalker 在头部运动多样性（Diversity）和节奏对齐（Beat Align）上超越所有方法（包括真实视频），同时在图像质量（FID）和身份保持（CSIM）上也表现优异。Wav2Lip 的唇同步指标最优是因为它仅修改唇部区域，其余区域保持原图不变。

**消融实验关键发现**：
- **ExpNet**：移除参考表情 \(\beta_0\) 导致严重身份变化；使用真实系数（而非仅唇部系数）作为目标会大幅降低唇同步性能；唇读损失 \(\mathcal{L}_{read}\) 对时序一致性至关重要
- **PoseVAE**：对抗损失 \(\mathcal{L}_{GAN}\) 对运动多样性贡献最大；音频条件对节奏对齐至关重要；混合风格标签比固定风格产生更高多样性
- **FaceRender**：相比 PIRenderer，基于无监督 3D 关键点的映射在表情重建上更精确；移除面部对齐系数可避免不自然的头部运动

#### 🧪 练习题
```yaml
question: "SadTalker 的 ExpNet 为什么使用 Wav2Lip 生成的'仅唇部'表情系数作为训练目标，而非直接使用真实视频的表情系数？"
options:
  - "因为 Wav2Lip 的表情系数精度更高"
  - "因为真实视频的表情系数包含与音频无关的运动（如眨眼、皱眉），会干扰音频到唇部运动的学习"
  - "因为 Wav2Lip 可以生成更多训练数据进行数据增强"
  - "因为真实视频的 3DMM 重建存在系统性误差"
answer: 1
explain: "真实视频的表情系数包含眨眼、皱眉等与音频无关的面部运动，这些运动会引入额外的不确定性，使网络难以准确学习音频与唇部运动的对应关系。使用 Wav2Lip 仅含唇部运动的输出作为目标，可以显式地将训练聚焦于唇同步任务。"
```

### DreamTalk

```yaml
id: dreamtalk
num: 31
name: DreamTalk
full_name: 情感可控扩散说话人脸 (Emotional Talking Head with Diffusion)
year: '2023'
org: 清华/字节
parent: sadtalker
paper_url: https://arxiv.org/abs/2312.09767
project_url: ''
category: expression
motivation: LDM情感嵌入实现情感控制
```

#### 📝 一句话总结
DreamTalk 提出用扩散模型生成情感说话人脸的 3DMM 运动，并用 style-aware lip expert 与 style predictor 同时保证唇同步、表情风格和无需额外风格视频的情感控制。

#### 🎯 核心要点
- **三组件架构**：denoising network、style-aware lip expert、style predictor
- **3DMM 运动扩散**：扩散模型在面部运动参数空间生成表情/口型，而不是直接逐像素生成视频
- **风格参考控制**：style encoder 从参考视频的 3DMM expression sequence 中提取 speaking style code
- **style-aware lip expert**：在给定说话风格条件下评估音频和嘴部运动同步，避免情感夸张破坏口型
- **style predictor**：从音频和输入 portrait 预测 style code，使推理时可以只靠语音指定情感说话风格
- **classifier-free guidance**：通过引导强度 \(\omega\) 调节情感/风格强度
- **适用数据**：在 MEAD、HDTF、VoxCeleb2 等数据上评估表情一致性、唇同步、图像质量和身份保持

#### 🔬 深入细节
##### 核心示意图

![DreamTalk 方法框架](https://arxiv.org/html/2312.09767/x2.png)
*图：DreamTalk 包含扩散去噪网络、style-aware lip expert 和 style predictor。风格可来自参考视频，也可由音频和 portrait 预测。*

##### 核心流程伪代码

```python
# DreamTalk 推理简化
def dreamtalk(portrait, audio, style_ref=None, guidance=1.0):
    id_params = extract_3dmm_identity(portrait)
    audio_feat = speech_encoder(audio)

    if style_ref is not None:
        style_motion = extract_3dmm_expression(style_ref)
        style_code = style_encoder(style_motion)
    else:
        style_code = diffusion_style_predictor(audio_feat, id_params)

    motion_t = normal_sequence()
    for t in reversed(diffusion_steps):
        cond = denoiser(motion_t, audio_feat, style_code, t)
        uncond = denoiser(motion_t, audio_feat, empty_style, t)
        motion_0 = uncond + guidance * (cond - uncond)
        motion_t = diffusion_step(motion_t, motion_0, t)

    frames = face_renderer(portrait, motion_0)
    return frames
```

##### 方法解读

情感 talking head 的难点是“一段音频同时决定口型和情绪”。普通唇同步模型倾向只优化嘴部闭合与音素对齐，容易生成中性表情；情感模型若过度追求表情强度，又会把应闭合的嘴做成张开，破坏 /m/、/b/ 等音素。DreamTalk 用扩散模型建模多样 speaking style，再用专门的 lip expert 约束风格条件下的同步。

扩散主体在 3DMM motion \(\mathbf{m}\) 上工作。前向过程把真实运动加噪：

$$
q(\mathbf{m}_t|\mathbf{m}_0)=\mathcal{N}(\sqrt{\bar{\alpha}_t}\mathbf{m}_0,(1-\bar{\alpha}_t)I)
$$

denoising network 接收 noisy motion、音频窗口 \(\mathbf{A}_w\)、timestep 和 style code \(\mathbf{s}\)，预测干净运动 \(\hat{\mathbf{m}}_0\)。论文使用 transformer 结构：音频经 encoder，噪声运动和 timestep 作为 key/value，style code 重复成 query token，最终输出中间帧的运动预测。

style-aware lip expert 的直觉类似“带情感条件的 SyncNet”。它不是只判断音频和嘴形是否同步，而是在给定 style reference 的条件下，把嘴部顶点运动和音频分别编码后计算相似度。这样，模型可以在“愤怒大张嘴”“悲伤嘴角下压”等风格中寻找正确的唇形，而不是被普通同步网络拉回中性嘴型。

style predictor 解决部署成本。早期情感方法常要求用户提供一段同一风格的参考视频，实际使用并不方便。DreamTalk 的 predictor 用音频特征和 portrait 的身份信息预测 style code；加入 portrait 是因为 style code 与说话者身份、性别、脸型等因素相关，完全只靠音频会导致身份风格不匹配。

classifier-free guidance 用来调节风格强度：

$$
\hat{\epsilon}_{guided}=(1+\omega)\epsilon_\theta(\mathbf{m}_t,\mathbf{s})-\omega\epsilon_\theta(\mathbf{m}_t,\varnothing)
$$

\(\omega=0\) 时更接近中性表达；增大 \(\omega\) 会增强指定情感，但过大可能降低唇同步或引入嘴部伪影。DreamTalk 的设计重点就是在这个表情强度与口型准确度之间取得更稳定的平衡。

> ⚠️ 注意：DreamTalk 仍依赖 3DMM 表达参数，参考身份和目标 portrait 差异很大时，表达参数可能泄漏身份信息，导致轻微 identity drift。

#### 🧪 练习题
```yaml
question: "DreamTalk 中 style-aware lip expert 的作用是什么？"
options:
  - "只预测人脸身份参数"
  - "在说话风格条件下约束音频与嘴部运动同步，平衡情感表达和口型准确"
  - "把 3DMM 网格转换为 NeRF"
  - "删除 classifier-free guidance"
answer: 1
explain: "情感表达可能改变嘴部形态，普通同步监督会与风格控制冲突。style-aware lip expert 在风格条件下评估同步，使模型既保留情感又对齐音频。"
```

### FaceTalk

```yaml
id: facetalk
num: 32
name: FaceTalk
full_name: 音频驱动运动扩散 (Audio-Driven Motion Diffusion for NPHM)
year: '2024'
org: TUM/Meta
parent: dreamtalk
paper_url: https://arxiv.org/abs/2312.17635
project_url: ''
category: expression
motivation: 扩散模型驱动NPHM参数化头部
```

#### 📝 一句话总结
FaceTalk 提出在 Neural Parametric Head Model 的表达 latent 空间中用音频条件扩散模型生成 3D 头部运动，解决 FLAME/3DMM 表达能力有限、难以高保真驱动完整头部的问题。

#### 🎯 核心要点
- **NPHM 表达空间**：用神经参数化头模型表示包含头部、耳朵、头发附近几何的高保真 volumetric head
- **音频到表达扩散**：以 Wav2Vec 2.0 音频嵌入为条件，扩散生成 NPHM expression sequence
- **Transformer decoder + FiLM**：表达解码器通过 self-attention、cross-attention 和 FiLM timestep 注入完成去噪
- **配对数据构建**：利用 Nersemble 多视角视频，把每帧优化成 temporally consistent NPHM expression，构造音频-表达训练集
- **随机采样带来多样性**：同一音频可从不同噪声采样出合理但不同的面部运动
- **资料限制**：manifest 中 `paper_url` 指向 `2312.17635`，该链接与 FaceTalk 不匹配；本文方法依据公开正确论文 `https://arxiv.org/abs/2312.08459`

#### 🔬 深入细节
##### 核心示意图

![FaceTalk pipeline](https://arxiv.org/html/2312.08459v2/x2.png)
*图：FaceTalk 使用冻结 Wav2Vec 2.0 提取音频嵌入，扩散模型在 NPHM expression sequence 上迭代去噪，并用 transformer decoder 与 FiLM timestep conditioning 生成最终表达序列。*

##### 核心流程伪代码

```python
# FaceTalk 训练和推理简化
for audio, theta_exp_0 in paired_audio_nphm_dataset:
    audio_feat = wav2vec2(audio).detach()
    t = sample_timestep()
    noise = normal_like(theta_exp_0)
    theta_t = sqrt(alpha_bar[t]) * theta_exp_0 + sqrt(1 - alpha_bar[t]) * noise

    theta_hat = expression_decoder(
        noisy_expression=theta_t,
        audio_context=audio_feat,
        timestep=t,
    )
    loss = mse(theta_hat, theta_exp_0)
    loss.backward()

def sample_facetalk(audio):
    audio_feat = wav2vec2(audio)
    theta_t = normal_sequence()
    for t in reversed(diffusion_steps):
        theta_0 = expression_decoder(theta_t, audio_feat, t)
        theta_t = ddpm_or_ddim_step(theta_t, theta_0, t)
    return NPHM(identity_code, theta_0)
```

##### 方法解读

FaceTalk 的背景是：FLAME/3DMM 参数低维、稳定、易拟合，但对复杂口腔、眼睑、脸颊细节和非模板头部几何表达不足。NPHM 用神经隐式/参数化方式描述完整头部，可以表示更丰富的身份和表达，但它本身不是音频驱动模型。FaceTalk 把音频条件扩散接到 NPHM 的 expression latent 上。

训练数据是论文的关键工程。公开数据集通常有音频和视频，却没有逐帧 NPHM 表达参数。FaceTalk 使用 Nersemble 多视角说话视频，通过多视角几何、landmark、temporal prior 等约束，把每帧拟合到 NPHM expression code，并对序列做时间一致性优化。这样得到 \((A,\theta_{\text{exp}}^{1:N})\) 配对样本。

扩散过程对表达序列加噪：

$$
q(\theta_t|\theta_0)=\mathcal{N}(\sqrt{\bar{\alpha}_t}\theta_0,(1-\bar{\alpha}_t)I)
$$

模型学习反向去噪 \(p_\theta(\theta_{t-1}|\theta_t,A)\)。与图像扩散不同，FaceTalk 的目标是低维但时序相关的 expression sequence，因此采用 transformer decoder 结构：noisy expression 先嵌入到 latent 维度，Wav2Vec 2.0 特征作为 cross-attention 条件，timestep 通过 FiLM 调制中间层。

FaceTalk 的输出是 NPHM expression code，而不是最终 RGB 图像。渲染或重建时把 expression code 与 identity/shape code 输入 NPHM，即可得到高保真头部几何和动画。这个解耦让模型专注学习“音频到运动”，把几何细节和身份保持交给 NPHM 先验。

与 DreamTalk 相比，FaceTalk 更偏 3D 头部动画而非 2D talking head 视频生成；与 FLAME 系方法相比，它牺牲了一些简单参数接口，换来更丰富的 volumetric head 表示和更真实的复杂表情。扩散采样也允许同一音频产生多样合理 motion，而不是确定性平均表情。

> 💡 关键：FaceTalk 的创新在于把音频驱动从传统 3DMM/FLAME 系数迁移到 NPHM expression latent，使 talking head 可以利用更强的神经头部先验。

#### 🧪 练习题
```yaml
question: "FaceTalk 为什么要先构造音频-NPHM expression 配对数据？"
options:
  - "因为公开音频视频数据通常不直接提供 NPHM 表达参数"
  - "因为 Wav2Vec 2.0 只能处理 3D 网格"
  - "因为扩散模型不能在 latent 空间训练"
  - "因为 NPHM 不支持身份参数"
answer: 0
explain: "FaceTalk 的训练目标是从音频生成 NPHM expression sequence，但原始视频数据没有这些参数，因此需要通过多视角拟合和时间一致性优化先得到监督信号。"
```

### RealTalk

```yaml
id: realtalk
num: 33
name: RealTalk
full_name: 情绪感知逼真说话头 (Realistic Emotion-Aware Lifelike Talking-Head)
year: '2025'
org: ICCV 2025
parent: facetalk
paper_url: https://arxiv.org/abs/2406.18284
project_url: ''
category: expression
motivation: 情绪感知机制自动生成微表情
```

#### 📝 一句话总结
RealTalk 提出了两阶段音频驱动说话人脸生成框架：第一阶段通过融合身份形状和历史表情先验的跨模态注意力 Transformer 将音频精准映射为3D表情系数；第二阶段通过可学习遮罩和身份对齐网络（FIA，结合 AdaIN 注入3D系数与 Cross-Attention 对齐参考帧纹理）实现仅需单帧参考的实时高保真人脸渲染，在多个基准上全面超越现有方法且速度达 30FPS。

#### 🎯 核心要点
- **两阶段解耦框架**：Stage1 Audio-to-Expression (A2E) Transformer 预测3D表情系数 → Stage2 Expression-to-Face (E2F) 渲染器生成最终图像
- **改进的3D面部先验**：引入身份形状系数 \(\alpha\) 和历史表情系数 \(\beta_{1:N}\) 作为 Transformer 的额外条件，通过 Cross-Modal Self-Attention (CMSA) 编码器融合音频与面部先验
- **可学习遮罩 (Learnable Mask)**：利用预测的3D表情系数投影生成自适应遮罩（覆盖嘴部+下颌轮廓），替代传统固定下半脸遮罩，与目标音频内在关联
- **FIA 模块 (Face Identity-Aware Alignment)**：共享编码器提取源/参考帧多尺度特征 → 解码器每层通过 AdaIN 注入3D系数控制表情 + Cross-Attention 从参考帧查询纹理细节
- **高效设计**：仅需1帧参考（对比 IP-LAP 的25帧、DINet 的5帧），Cross-Attention 仅在 1/8 和 1/16 分辨率执行，V100 上达 33.1ms/帧（约30FPS），比 IP-LAP 快 11.5×
- **全面的损失设计**：A2E 阶段使用 MSE + 顶点距离损失；E2F 阶段使用 L1 像素 + VGG 感知 + GAN 对抗 + 牙齿区域局部像素损失
- **在 VoxCeleb1、MEAD、HDTF 三个基准上全面 SOTA**，FID 指标在 MEAD 上超越第二名 51%，用户研究中视觉质量和唇同步分别超越 IP-LAP 33% 和 44%

#### 🔬 深入细节
##### 框架总览

![RealTalk 框架总览图](https://arxiv.org/html/2406.18284v2/x2.png)
*图：RealTalk 整体框架。上半部分为 Audio-to-Expression Transformer（CMSA 编码器 + TCA 解码器），下半部分为 Expression-to-Face 渲染器（Learnable Mask + FIA 模块）。*

##### 算法流程伪代码

```python
# ========== Stage 1: Audio-to-Expression Transformer ==========
# 输入: audio_features A (mel-spectrogram), shape α, history expressions β_{1:N}
# 输出: predicted expressions β̂_{1:T}

# CMSA Encoder: 跨模态自注意力融合
audio_tokens = linear_proj(A)           # [l tokens], l=32 audio frames
shape_token = linear_proj(α)            # [1 token], 身份形状先验
expr_tokens = linear_proj(β_{1:N})      # [N tokens], N=16 历史表情先验
x = concat(audio_tokens, shape_token, expr_tokens)  # [l+N+1 tokens]
for layer in cmsa_encoder:
    x = multi_head_self_attention(x) + x  # 跨模态交互

# TCA Decoder: 时序交叉注意力解码
query = positional_embedding(T)         # T=16 target frames
for layer in tca_decoder:
    query = cross_attention(Q=query, K=x, V=x) + query
β̂ = linear_head(query)                 # 预测 T 帧表情系数

# ========== Stage 2: Expression-to-Face Renderer ==========
# 输入: source image I_s, reference image I_r, 3D coefficients (α, β̂, ρ)
# 输出: generated face Î

# Step 1: Learnable Mask 生成
V = reconstruct_3d_vertices(α, β̂, ρ)   # 3DMM 重建顶点
V_xy = perspective_project(V, τ)         # 投影到2D
M = convex_hull(V_xy)                    # 凸包生成遮罩
I_s_masked = M * I_s                     # 遮罩源图像

# Step 2: 共享编码器提取多尺度特征
F_s = shared_encoder(I_s_masked)         # {F_s^1, ..., F_s^d}, d=4 scales
F_r = shared_encoder(I_r)               # {F_r^1, ..., F_r^d}

# Step 3: FIA 解码器逐层生成
F̄ = bottleneck_features
for i in range(d):  # d=4, 从低分辨率到高分辨率
    F̄ = upsample(F̄)
    # AdaIN: 3D系数注入控制表情
    γ, μ = MLP([α, β̂, ρ])
    F̄ = γ * normalize(F̄) + μ
    F̄ = residual_blocks(F̄, num_blocks=2)
    # Cross-Attention: 从参考帧查询纹理 (仅在1/8和1/16分辨率)
    if scale in [1/8, 1/16]:
        F̄ = cross_attention(Q=F̄, K=F_r[d-i], V=F_r[d-i]) + F̄

# Step 4: Blending 融合
Î = M * I_s + (1 - M) * F̄_final        # 遮罩外保留源图，遮罩内用生成结果
```

##### 动机与背景

现有音频驱动说话人脸生成方法面临三大核心挑战：

**1. 音频到表情的映射缺乏身份感知。** 传统方法（如 Wav2Lip、IP-LAP）直接将音频特征映射到嘴部运动，忽略了不同人说同一句话时嘴型幅度和习惯差异巨大的事实。例如，面部骨骼结构（宽脸 vs 窄脸）和个人说话习惯（张嘴幅度大 vs 小）都会显著影响嘴部运动模式。RealTalk 的核心洞察是：**3D 面部形状系数 \(\alpha\) 编码了骨骼结构信息，历史表情系数 \(\beta_{1:N}\) 编码了个人说话习惯**，将两者作为先验注入 Transformer 可实现身份感知的表情预测。

**2. 固定遮罩导致面部结构变化困难。** 大多数方法使用固定的下半脸遮罩，但说话时下颌轮廓会随嘴部张合而变化。固定遮罩要么遮盖不足（无法生成大张嘴时的下颌变化），要么遮盖过多（增加不必要的生成难度）。RealTalk 提出的可学习遮罩直接从预测的3D表情系数投影生成，自适应地覆盖需要修改的区域。

**3. 多帧参考的效率瓶颈。** IP-LAP 需要25帧参考图通过光流对齐，DINet 需要5帧参考图提取变形特征，这严重制约了推理速度。RealTalk 的 FIA 模块通过 Cross-Attention 机制从单帧参考中自适应查询所需纹理，无需显式对齐即可完成纹理迁移。

##### 核心机制详解

**A. Audio-to-Expression Transformer**

A2E Transformer 的设计核心在于 CMSA（Cross-Modal Self-Attention）编码器。它将三种模态的 token 拼接后进行自注意力计算：

$$X = [A_1, ..., A_l, \alpha, \beta_1, ..., \beta_N]$$

其中 \(l=32\) 个音频 token、1 个形状 token、\(N=16\) 个历史表情 token。自注意力机制使得音频 token 可以"看到"身份形状和历史表情模式，从而学习到身份感知的音频-表情映射。

> 💡 **关键直觉**：形状系数 \(\alpha\) 告诉模型"这个人的脸长什么样"，历史表情 \(\beta_{1:N}\) 告诉模型"这个人说话时嘴巴通常怎么动"，两者共同约束了音频到表情的映射空间。

TCA（Temporal Cross-Attention）解码器则以可学习的位置编码作为 query，通过交叉注意力从编码器输出中解码出 \(T=16\) 帧的表情系数序列。

A2E 阶段的损失函数为：

$$\mathcal{L}_{a2e} = \mathcal{L}_{MSE} + 0.1 \cdot \mathcal{L}_V$$

其中 \(\mathcal{L}_{MSE}\) 是表情系数的均方误差，\(\mathcal{L}_V\) 是通过3DMM重建后的顶点距离损失。顶点损失的引入确保了系数空间的误差能反映到实际的面部几何变化上。

**B. Learnable Mask**

可学习遮罩的生成过程完全可微分：

$$V_{xy} = P(V(\alpha, \hat{\beta}, \rho), \tau)$$
$$M = C(V_{xy})$$
$$I_s^m = M \cdot I_s$$

其中 \(V(\cdot)\) 是3DMM顶点重建函数，\(P(\cdot)\) 是透视投影，\(C(\cdot)\) 是凸包运算。由于遮罩由预测的表情系数 \(\hat{\beta}\) 决定，它天然与目标音频关联——张大嘴时遮罩自动扩大覆盖下颌变化区域，闭嘴时遮罩自动缩小。

> ⚠️ **注意**：遮罩不参与梯度反传到 A2E 阶段（两阶段独立训练），但它在 E2F 阶段的 blending 操作中起到关键作用——遮罩外区域直接保留源图像像素，遮罩内区域由网络生成，大幅降低了生成难度。

**C. FIA 模块（Face Identity-Aware Alignment Network）**

FIA 是本文最核心的架构创新，其设计哲学是**将3D系数的"控制信号"和参考帧的"纹理信息"解耦注入**：

1. **共享权重编码器**：同一个编码器分别处理遮罩后的源图像和参考图像，提取4个尺度的特征金字塔 \(\{F^1, ..., F^4\}\)。共享权重确保两路特征在同一语义空间中，便于后续 Cross-Attention 对齐。

2. **AdaIN 注入3D系数**：在解码器每一层，将拼接的3D系数 \([\alpha, \hat{\beta}, \rho]\) 通过 MLP 映射为仿射变换参数 \((\gamma, \mu)\)，通过 Adaptive Instance Normalization 注入特征：

$$\text{AdaIN}(F, \gamma, \mu) = \gamma \cdot \frac{F - \text{mean}(F)}{\text{std}(F)} + \mu$$

这使得3D系数直接控制生成特征的统计分布，实现对表情和姿态的精确控制。

3. **Cross-Attention 纹理对齐**：在 1/8 和 1/16 分辨率的解码层中，以当前生成特征为 query、参考帧特征为 key/value 进行交叉注意力：

$$\text{CrossAttn}(Q, K, V) = \text{softmax}\left(\frac{QK^T}{\sqrt{d_k}}\right)V$$

> 💡 **为什么 Cross-Attention 优于光流/变形卷积？** 光流和变形卷积建立的是像素级的刚性对应关系，当源图和参考图姿态差异较大时容易产生伪影。Cross-Attention 则允许每个生成位置从参考帧的**任意位置**加权聚合纹理信息，实现更灵活的非刚性纹理迁移。消融实验证实 Cross-Attention 在 FID 上优于 Flow（12.73 vs 13.68）和 Deformation（12.73 vs 13.38），且参数量更少（69.24M vs 82.94M/98.79M）。

4. **Blending 融合**：最终输出通过可学习遮罩混合源图像和生成结果：

$$\hat{I} = M \cdot I_s + (1 - M) \cdot \bar{F}_d$$

遮罩外区域（额头、背景等）直接保留源图像的原始像素，网络只需关注嘴部和下颌区域的生成。

**D. 渲染损失函数**

E2F 阶段的总损失为：

$$\mathcal{L}_{e2f} = \lambda_1 \mathcal{L}_1 + \lambda_2 \mathcal{L}_2 + \lambda_3 \mathcal{L}_3 + \lambda_4 \mathcal{L}_4$$

其中 \(\lambda_1=1, \lambda_2=1, \lambda_3=0.1, \lambda_4=1\)：
- \(\mathcal{L}_1\)：L1 像素重建损失
- \(\mathcal{L}_2\)：VGG 感知损失（多层特征匹配）
- \(\mathcal{L}_3\)：GAN 对抗损失（权重较小以稳定训练）
- \(\mathcal{L}_4\)：牙齿区域局部 L1 损失（使用牙齿区域二值遮罩 \(M'\)），专门提升牙齿纹理清晰度

##### 实验结果与消融分析

**定量比较**：在 VoxCeleb1、MEAD、HDTF 三个数据集上，RealTalk 在几乎所有指标上均取得最优。关键数据：

| 指标 | VoxCeleb1 | MEAD | HDTF |
|------|-----------|------|------|
| FID ↓ | **12.73** (vs IP-LAP 16.84) | **11.68** (vs IP-LAP 31.57, ↓63%) | **6.065** (vs IP-LAP 9.490, ↓36%) |
| LPIPS ↓ | **0.0916** | **0.0958** | **0.0820** |
| Runtime | **33.1ms** (vs IP-LAP 381.5ms, 11.5×快) | 同左 | 同左 |

**用户研究 (MOS)**：视觉质量 3.77 分（IP-LAP 2.84，↑33%），唇同步 3.72 分（IP-LAP 2.58，↑44%）。

**消融实验关键发现**：

1. **面部先验的有效性**（Table 6）：移除形状先验和历史表情先验后，表情系数预测的 MSE 增加 57.9%。两种先验互补——形状提供身份约束，历史表情提供个人习惯约束。

2. **可学习遮罩 vs 固定遮罩**（Table 6）：使用固定下半脸遮罩时性能下降，因为固定遮罩包含无关背景区域且无法适应不同张嘴幅度。

3. **FIA 中 Cross-Attention vs Flow vs Deformation**（Table 7）：Cross-Attention 以最少参数（69.24M）取得最优 FID（12.73），Flow（82.94M, FID 13.68）和 Deformation（98.79M, FID 13.38）均不如。

4. **残差块数量**（Table 7）：1 block 快但质量差，3 blocks 质量好但超实时，2 blocks 是速度-质量的最优平衡点。

#### 🧪 练习题
```yaml
question: "RealTalk 的 Audio-to-Expression Transformer 中，CMSA 编码器融合了哪些模态的信息？"
options:
  - "音频特征 + 2D 面部关键点"
  - "音频特征 + 3D 身份形状系数 + 历史表情系数"
  - "音频特征 + 参考图像特征 + 姿态系数"
  - "音频特征 + 光流特征 + 深度图"
answer: 1
explain: "CMSA 将音频 token、身份形状系数 α（1个token）和历史表情系数 β_{1:N}（N个token）拼接后进行自注意力计算，使音频特征能感知说话人的面部结构和个人表情习惯，实现身份感知的表情预测。"
```

### 3D-GPHM

```yaml
id: gphm
num: 34
name: 3D-GPHM
full_name: 3D高斯参数化头部 (3D Gaussian Parametric Head Model)
year: '2024'
org: 学术界
parent: flame
paper_url: https://link.springer.com/chapter/10.1007/978-3-031-72761-0_8
project_url: ''
category: expression
motivation: 3DGS表征的可动画化头部模型
```

#### 📝 一句话总结
3D-GPHM 将 3D Gaussian Splatting 与身份/表情参数空间结合，构建可渲染、可拟合、可动画化的参数化头部模型，解决传统 mesh/SDF/NeRF 头模在细节质量、渲染速度和少样本重建上的折中问题。

#### 🎯 核心要点
- **Gaussian parametric head model**：以一组 3D 高斯椭球表示头部，并用 identity/expression latent 控制位置、形状和外观变化
- **实时高质量渲染**：继承 3DGS 的 splatting rasterization，渲染速度优于 NeRF 体渲染
- **形状与表情解耦**：身份 latent 控制个体外观和结构，expression/motion latent 控制动态表情
- **两阶段训练**：先训练 mesh-guided model，再迁移到 Gaussian model 并用 mesh 几何初始化高斯点，提升收敛稳定性
- **单目/少样本重建**：训练好参数先验后，可从 monocular video、few-shot image 甚至单图拟合头部 avatar
- **新增 GPHMv2 思路**：引入表达编码器、非面部运动编码器和 LivePortrait 生成的表达条件图，降低身份信息泄漏

#### 🔬 深入细节
##### 核心示意图

![GPHM method](https://arxiv.org/html/2407.15070/extracted/5944733/figures/method.jpg)
*图：GPHM/GPHMv2 将身份、表情和非面部运动条件映射到 3D Gaussian 属性，利用可微 splatting 训练并渲染高保真头部 avatar。*

##### 核心流程伪代码

```python
# GPHM 训练与拟合简化
def gphm_render(identity_code, expression_code, motion_code, camera):
    base_gaussians = canonical_gaussians()
    offsets = identity_mlp(identity_code) + expression_mlp(expression_code)
    dynamic = motion_mlp(motion_code)
    gaussians = update_gaussian_attributes(base_gaussians, offsets, dynamic)
    return gaussian_splatting_render(gaussians, camera)

# stage 1: mesh-guided warmup
train_mesh_guided_networks(multiview_images, landmarks)

# stage 2: initialize Gaussian points near learned mesh and train splatting model
initialize_gaussians_from_mesh()
for views in multiview_video:
    expr = expression_encoder(views.expression_condition)
    motion = non_face_motion_encoder(views.motion_condition)
    pred = gphm_render(identity_code, expr, motion, views.camera)
    loss = photometric_loss(pred, views.image)
    loss += landmark_loss(pred, views.landmarks)
    loss += regularize_gaussians()
    loss.backward()
```

##### 方法解读

传统参数化头模通常是 mesh 3DMM：低维、可控、可拟合，但毛发、耳朵、眼镜、皮肤细节和复杂外观不足。NeRF 类 head avatar 能渲染逼真图像，但体渲染慢，且几何一致性和动画控制不如显式参数模型。3D-GPHM 的核心判断是：3DGS 兼具显式点状几何和快速渲染，非常适合成为新一代参数化头模的底层表示。

每个 Gaussian 可包含位置 \(\mu\)、协方差 \(\Sigma\)、颜色/球谐系数 \(c\)、不透明度 \(\alpha\)。GPHM 不把这些属性完全自由优化成某个单人 avatar，而是让它们由低维参数驱动：

$$
G_i(\beta,\psi)=G_i^0+\Delta G_i^{id}(\beta)+\Delta G_i^{exp}(\psi)
$$

其中 \(\beta\) 是身份 latent，\(\psi\) 是表情 latent。这样模型既能保留 3DGS 的细节表达，又能像 FLAME 一样通过参数控制身份和表情。

训练高斯参数模型并不直接。3DGS 的点是无结构的，如果随机初始化，很容易出现点漂移、冗余、噪声和不稳定收敛。GPHM 因此采用两阶段策略：先用 mesh-guided model 学到大致头部几何，再把网络参数迁移到 Gaussian 模型，并把高斯点初始化在学到的表面附近。这个初始化比直接用 FLAME 模板更能覆盖头发和完整头部区域。

GPHMv2 进一步面向单目重建和跨身份 reenactment。它把表情、身份和非面部运动拆开编码，并用 LivePortrait 生成“同表情不同身份”的条件图，迫使 expression encoder 学表情而不是偷带身份外观。否则表达 latent 会泄漏头发、脸型、肤色等信息，跨身份驱动时目标 avatar 会被源身份污染。

与 FLAME 相比，GPHM 的优势是高频外观和完整头部渲染；与单人 3DGS avatar 相比，GPHM 的优势是有参数空间和先验，可少样本拟合、表达编辑和跨身份驱动。代价是训练数据和系统复杂度更高，而且泛化仍受训练身份、光照和发型分布限制。

> 💡 关键：GPHM 不是“给每个人训练一个 3DGS”，而是学习一个可由身份和表情 latent 控制的 Gaussian head prior。

#### 🧪 练习题
```yaml
question: "GPHM 为什么采用 mesh-guided 到 Gaussian 的两阶段训练？"
options:
  - "因为 3DGS 不能渲染彩色图像"
  - "因为随机训练无结构高斯点容易不稳定，mesh 引导能提供合理表面初始化"
  - "因为 FLAME 已经能表示所有头发细节"
  - "因为不需要任何多视角图像监督"
answer: 1
explain: "3D Gaussian 点属性自由度高，直接训练容易出现冗余和漂移。先学 mesh-guided 几何再初始化 Gaussian，可让高斯点靠近真实头部表面并稳定收敛。"
```

### SMPL

```yaml
id: smpl
num: 35
name: SMPL
full_name: 蒙皮多人线性模型 (Skinned Multi-Person Linear Model)
year: '2015'
org: MPI-IS
parent: —
paper_url: https://arxiv.org/abs/1312.4659
project_url: ''
category: body_motion
motivation: 统计学人体参数化行业标准
```

#### 📝 一句话总结
SMPL 提出用低维形状参数、关节姿态、姿态相关 blendshape 和线性蒙皮统一表示可动画化人体网格，解决统计人体模型难以兼容传统动画/游戏引擎的问题。

#### 🎯 核心要点
- **标准人体网格**：常用版本包含 6890 个顶点、24 个关节和固定拓扑
- **形状参数 \(\beta\)**：用 PCA 形状空间表达身高、体型、比例等身份差异
- **姿态参数 \(\theta\)**：用每个关节的相对旋转控制骨架姿态
- **pose-dependent blend shapes**：把姿态导致的肌肉/软组织形变写成关节旋转矩阵元素的线性函数
- **线性蒙皮兼容**：最终用 LBS 或 DQBS 生成网格，能直接进入 Maya、Unity、Blender 等图形管线
- **监督数据来源**：从对齐 3D body scans 学习模板、形状空间、蒙皮权重、姿态修正和关节回归器
- **资料限制**：manifest 中 arXiv `1312.4659` 不是 SMPL 论文；正文依据官方 SMPL 页面与论文 PDF `https://files.is.tue.mpg.de/black/papers/SMPL2015.pdf`

#### 🔬 深入细节
##### 核心示意图

![SMPL 24 关节模型示意](https://chingswy.github.io/easymocap-public-doc/images/dataset/SMPL.png)
*图：SMPL 人体网格及 24 个常用身体关节索引。该公开图用于展示 SMPL 的参数化人体拓扑；论文核心图请见官方 PDF。*

##### 核心流程伪代码

```python
# SMPL 前向计算简化
def smpl_forward(beta, theta):
    # 1. 身份形状
    T_shaped = T_bar + B_shape @ beta

    # 2. 由形状回归关节位置
    J = joint_regressor @ T_shaped

    # 3. 姿态相关修正，输入是各关节旋转相对 rest pose 的差
    pose_feature = flatten(rotmat(theta[1:]) - identity_rotations)
    T_posed = T_shaped + B_pose @ pose_feature

    # 4. 线性蒙皮得到最终 posed mesh
    vertices = linear_blend_skinning(T_posed, J, theta, weights)
    joints = joint_regressor @ vertices
    return vertices, joints
```

##### 方法解读

SMPL 的目标是把“真实人体统计变化”和“动画软件可用性”同时保留下来。早期 SCAPE 类模型能表示身体形状和姿态变化，但不容易放进标准 graphics pipeline。SMPL 采用骨骼蒙皮加 blendshape 的形式，使输出仍是普通 skinned mesh。

核心函数可写为：

$$
M(\beta,\theta)=W(T_P(\beta,\theta), J(\beta), \theta, \mathcal{W})
$$

其中 \(W\) 是 skinning 函数，\(\mathcal{W}\) 是蒙皮权重，\(J(\beta)\) 是由人体形状回归出的关节位置。模板先经过身份形变：

$$
T_S(\beta)=\bar{T}+B_S(\beta)
$$

再加入姿态相关修正：

$$
T_P(\beta,\theta)=T_S(\beta)+B_P(\theta)
$$

SMPL 的一个关键简化是让 \(B_P(\theta)\) 成为关节旋转矩阵元素的线性函数，而不是复杂非线性模型。直觉上，当手臂抬起、膝盖弯曲时，身体表面会出现可预测的隆起和压缩；这些变化可以由相对 rest pose 的旋转偏移触发。

训练时，论文把不同身份、不同姿态的 3D 扫描对齐到统一拓扑，在同一优化框架中学习模板、形状基、姿态基、蒙皮权重和关节回归器。因此 SMPL 既是统计模型，也是动画模型。推理时只需 \(\beta\) 和 \(\theta\)，就能生成完整人体网格。

SMPL 后来成为数字人和人体动作生成的底层坐标系。动作生成模型常预测 joint rotations、root translation 或 SMPL/SMPL-X 参数，再渲染为 mesh；人体重建模型则从图像估计 \(\beta,\theta\)。它的局限是没有手指精细动作和面部表情，这也推动了 MANO、SMPL+H、SMPL-X 等扩展。

> 💡 关键：SMPL 的工程价值来自“低维可优化参数 + 固定拓扑 mesh + 标准蒙皮兼容”，这让学术模型能直接进入动画生产链路。

#### 🧪 练习题
```yaml
question: "SMPL 中 pose-dependent blend shapes 的主要作用是什么？"
options:
  - "只改变人体纹理颜色"
  - "补偿关节姿态造成的非刚性身体表面形变"
  - "删除所有骨骼关节"
  - "把 3D 网格转换成音频"
answer: 1
explain: "单纯 LBS 会在弯肘、弯膝等姿态下产生不自然形变。SMPL 用姿态相关 blendshape 根据关节旋转修正表面几何。"
```

### GrooveNet

```yaml
id: groovenet
num: 36
name: GrooveNet
full_name: 实时音乐驱动舞蹈 (Real-time Music-driven Dance)
year: '2017'
org: Simon Fraser
parent: smpl
paper_url: https://arxiv.org/abs/1706.06225
project_url: ''
category: body_motion
motivation: 首个实时音乐驱动舞蹈生成
```

#### 📝 一句话总结
GrooveNet 提出利用 Factored Conditional Restricted Boltzmann Machine (FCRBM) 将音频特征作为条件上下文，学习音乐与舞蹈动作之间的跨模态非线性映射，实现从音乐音频流实时生成连续全身舞蹈动作，是音乐驱动舞蹈生成领域的早期探索性工作。

#### 🎯 核心要点
- **三种映射策略**：提出 one-to-many、synchronized many-to-many、unsynchronized many-to-many 三种音频到动作的映射方案，本文实现 one-to-many 方案
- **FCRBM 生成模型**：采用 Factored Conditional Restricted Boltzmann Machine 作为核心模型，将音频特征输入 context unit 以非线性方式调制动作生成的能量景观
- **自建同步数据集**：录制 4 段同步音乐-动捕数据（约 23 分钟，82151 帧，60fps），使用 40 台 Vicon 摄像头光学动捕系统
- **84 维音频特征**：包含 RMS、Bark bands、MFCC、频谱特征、音高等，经 Essentia 库提取后通过 5Hz FIR 低通滤波平滑
- **52 维动作表示**：将 Euler 角转换为指数映射 (exponential maps)，根节点全局位置替换为地面投影速度
- **训练歌曲上有效**：模型可在训练歌曲上生成节奏同步的舞蹈动作，捕捉到音乐节拍与动作的对应关系
- **泛化能力不足**：模型无法泛化到未见歌曲，主要归因于训练数据过小过稀疏
- **满足实时要求**：500 hidden units + 500 factors + order 30，每帧生成仅需 0.0115s，满足 60fps 实时生成

#### 🔬 深入细节
##### 问题定义与动机

音乐驱动的舞蹈动作生成是一个高度非线性的跨模态时序映射问题。与语音驱动的手势生成不同，音乐与舞蹈之间的关系远更复杂和任意——它依赖于舞蹈和音乐的流派、舞者的专业水平和个人特征，并呈现从短期节拍同步到长期舞蹈模式演变的复杂时间层次结构。

此前的方法主要依赖于 HMM 等概率模型，需要对音频信号进行节拍检测和分类，将舞蹈限制在预定义的动作模式集合中，限制了生成新颖动作的能力。GrooveNet 的核心思路是让模型以**无监督方式**学习从音频信息到动作数据的连续跨模态映射，而非依赖分类或分割。

> 💡 关键：GrooveNet 的目标应用是公共交互装置——观众提供自己的音乐，驱动虚拟角色实时跳舞，因此对实时性和泛化性有严格要求。

##### 数据处理流水线

![GrooveNet 数据处理流水线](https://metacreation.net/wp-content/uploads/2017/08/groovenet_pipeline.png)
*图：GrooveNet 的音频与动作数据处理流水线（来自论文 Figure 2）。若链接不可用，请参阅原始论文 PDF。*

**音频特征提取（84 维）：**

原始音频 → 使用 Essentia 库提取低级特征（窗口 66.7ms，跳步 16.7ms）→ FIR 低通滤波（截止频率 5Hz）→ 拼接归一化 → 84 维向量。特征包括：
- 低级特征：RMS 能量、Bark 频带
- 频谱特征：低/中/高频能量、谱质心、谱展宽、谱偏度、谱峰度、谱滚降、谱峰值、谱通量、谱复杂度
- 音色特征：MFCC、Tristimulus
- 旋律特征：基频（YIN 算法）、音高显著性、不谐和度、不协和度

> ⚠️ 注意：5Hz 低通滤波是关键设计——确保音频描述符的时间尺度与舞蹈动作的时间尺度匹配，避免高频音频细节干扰动作生成。

**动作捕捉数据处理（52 维）：**

原始动捕（30 关节，93 维 Euler 角）→ 转换为指数映射 (exponential maps) → 以身体为中心的朝向 → 根节点全局位置替换为地面投影 2D 速度 + 垂直轴旋转速度 → 移除空维度 → 归一化 → 52 维向量。

指数映射的使用避免了 Euler 角的万向锁问题和自由度损失，根节点速度替代全局位置使模型学习相对运动而非绝对位置。

##### FCRBM 模型架构

论文 Figure 3 展示了 FCRBM 的架构：

```
         ┌──────────────┐
         │  Hidden Layer │
         └──────┬───────┘
                │
    ┌───────────┼───────────┐
    │     Multiplicative    │
    │     Three-Way Gates   │
    │   (Factored Weights)  │
    └───┬───────┬───────┬───┘
        │       │       │
  ┌─────┴──┐ ┌─┴────┐ ┌┴──────────┐
  │ Mocap  │ │Context│ │  Mocap    │
  │ Output │ │(Audio)│ │  History  │
  └────────┘ └───────┘ └───────────┘
```

FCRBM 是一种基于能量的生成模型，其核心机制是通过**三组乘法门控 (multiplicative gates)** 实现条件生成：

$$E(\mathbf{v}, \mathbf{h} \mid \mathbf{c}, \mathbf{x}) = -\sum_{f} \left( \sum_i W^v_{if} v_i \right) \left( \sum_j W^h_{jf} h_j \right) \left( \sum_k W^c_{kf} c_k + \sum_l W^x_{lf} x_l \right)$$

其中：
- \(\mathbf{v}\) 是输出可见单元（生成的动捕帧）
- \(\mathbf{h}\) 是隐藏单元
- \(\mathbf{c}\) 是上下文单元（音频特征）
- \(\mathbf{x}\) 是条件单元（动捕历史帧）
- \(f\) 索引因子 (factors)，实现权重的低秩分解

> 💡 关键：Context unit 的值直接调制隐藏层与输出层之间的权重连接，从而以非线性方式控制网络的能量景观——不同的音频输入会导致模型倾向于生成不同风格的动作。

##### 训练与生成流程

```python
# GrooveNet 训练伪代码
# 输入: 同步的音频特征序列 A 和动捕帧序列 M
# 模型: FCRBM with N_hidden=500, N_factors=500, order=30

for epoch in range(num_epochs):
    for t in range(order, len(M)):
        # 构建输入
        mocap_history = M[t-order : t]      # 过去 30 帧动捕数据
        audio_context = A[t]                 # 当前时刻音频特征 (84D)
        mocap_target  = M[t]                 # 目标动捕帧 (52D)
        
        # FCRBM 对比散度 (Contrastive Divergence) 学习
        # 正相: 从数据计算隐藏层激活
        h_pos = sigmoid(W_factor @ (mocap_target, mocap_history, audio_context))
        # 负相: Gibbs 采样重构
        v_neg = sample_visible(h_pos, mocap_history, audio_context)
        h_neg = sigmoid(W_factor @ (v_neg, mocap_history, audio_context))
        
        # 更新权重
        update_weights(h_pos, h_neg, v_pos=mocap_target, v_neg=v_neg)

# 生成伪代码
def generate(audio_stream, seed_frames, order=30):
    """实时逐帧生成舞蹈动作"""
    history = seed_frames[-order:]  # 初始动捕历史
    for t in range(len(audio_stream)):
        audio_t = audio_stream[t]   # 当前音频特征
        # FCRBM 迭代采样: 给定历史和音频，预测下一帧
        new_frame = fcrbm.sample(history, audio_t)
        history = concat(history[1:], new_frame)  # 滑动窗口更新
        yield new_frame  # 输出生成帧 (0.0115s/帧 << 16.7ms/帧@60fps)
```

训练采用标准的对比散度 (Contrastive Divergence, CD) 算法。生成时采用**自回归迭代采样**：模型预测一帧动作后，将其加入历史窗口作为下一步预测的输入，同时读取新的音频帧作为上下文。

##### 实验结果分析

论文报告了三组实验：

**实验 1：独立舞蹈模式生成。** 手动将舞蹈序列按歌曲段落分割并标注，用 one-hot 编码替代音频特征作为 context。结果表明 FCRBM 仅用约 4 分钟的单条动捕序列即可学习并生成不同的舞蹈模式，切换标签可平滑过渡到不同模式。

**实验 2：训练歌曲上的舞蹈生成。** 使用完整 4 段数据无监督训练，用训练集中的歌曲驱动生成。模型成功捕捉到音乐节奏结构与动作之间的同步关系（论文 Figure 6 展示了臀部垂直位置与音频振幅的对应）。但生成的动作偶尔出现抖动和脚滑等伪影。

**实验 3：未见歌曲上的舞蹈生成。** 使用训练集外的歌曲驱动生成，结果表明模型**无法泛化**，严重过拟合于训练数据。作者将此归因于训练数据过小（仅 23 分钟，4 段表演）。

**计算性能：** 模型含 1,452,720 个可训练参数，在 Intel i7-4850HQ CPU 上每帧生成耗时 0.0115 秒，满足 60fps 实时要求。

##### 与传统方法的对比

| 特性 | HMM-based (Ofli et al.) | GrooveNet (FCRBM) |
|------|------------------------|-------------------|
| 音频处理 | 需要节拍检测 + 模式分类 | 直接使用连续低级特征 |
| 动作表示 | 离散舞蹈图案 (dance figures) | 连续动捕帧 (52D) |
| 映射方式 | 分类→检索预定义模式 | 无监督连续映射 |
| 新颖性 | 受限于预定义模式库 | 可生成训练集中未出现的动作 |
| 实时性 | 支持 | 支持（0.0115s/帧） |
| 泛化性 | 依赖模式库覆盖度 | 当前版本泛化能力不足 |

> ⚠️ 注意：本文是 workshop paper，报告的是初步结果。作者规划的后续方向包括：(1) 扩大数据集；(2) 半监督预训练——先在无音乐的舞蹈动捕数据上预训练动作模型，再结合 WaveNet 风格的音频嵌入进行跨模态学习；(3) 探索 LSTM-RNN 和 seq-to-seq 架构实现 many-to-many 映射。

#### 🧪 练习题
```yaml
question: "GrooveNet 中 FCRBM 的 context unit 接收什么输入来控制舞蹈动作的生成？"
options:
  - "动作捕捉的历史帧序列"
  - "舞蹈模式的 one-hot 标签"
  - "当前时刻的音频特征向量"
  - "隐藏层的激活值"
answer: 2
explain: "FCRBM 的 context unit 接收当前时刻的 84 维音频特征向量，通过乘法门控机制调制隐藏层与输出层之间的权重，从而使音频信息以非线性方式控制生成的舞蹈动作。动捕历史帧输入的是 condition unit 而非 context unit。"
```

### SMPL-X

```yaml
id: smplx
num: 37
name: SMPL-X
full_name: 表达性身体捕捉 (Expressive Body Capture)
year: '2019'
org: MPI-IS
parent: smpl
paper_url: https://arxiv.org/abs/1904.05866
project_url: ''
category: body_motion
motivation: 统一身体手部面部表达
```

#### 📝 一句话总结
SMPL-X 将 SMPL 身体、MANO 手部和 FLAME 面部统一成一个可微全身模型，并配合 SMPLify-X 从单张图像拟合身体姿态、手势和面部表情。

#### 🎯 核心要点
- **全身表达模型**：同时覆盖躯干、四肢、双手手指、下颌、眼球和面部表情
- **统一参数接口**：由 body pose、hand pose、jaw/eye pose、shape \(\beta\)、expression \(\psi\) 和全局位姿控制
- **模型融合**：继承 SMPL 的身体、MANO 的手和 FLAME 的脸，并统一拓扑与关节层级
- **SMPLify-X 拟合**：从 2D keypoints、身体轮廓、手/脸关键点优化 SMPL-X 参数
- **VPoser 姿态先验**：用学习到的人体姿态先验约束优化，降低不自然姿态
- **数字人意义**：为动作生成、全身重建、手势交互和表情驱动提供同一 mesh 参数空间

#### 🔬 深入细节
##### 核心示意图

![SMPL-X teaser](https://ps.is.tuebingen.mpg.de/uploads/publication/image/22547/smplx_teaser_watermark.png)
*图：SMPL-X 把身体、手和脸整合到统一表达性人体模型中，可从图像拟合全身、手势和面部表情。*

##### 核心流程伪代码

```python
# SMPLify-X 单图拟合简化
params = initialize_camera_body_shape(image)
for stage in ["body", "hands_face", "full_refine"]:
    keypoints_2d = detect_body_hand_face_keypoints(image)
    vertices, joints = SMPLX(params)
    projected = camera_project(joints, params.camera)

    loss = robust_keypoint_loss(projected, keypoints_2d)
    loss += shape_prior(params.beta)
    loss += vposer_prior(params.body_pose)
    loss += hand_pose_prior(params.hand_pose)
    loss += expression_prior(params.expression)
    loss += collision_penalty(vertices)
    params = optimizer.step(loss, params)
return SMPLX(params)
```

##### 方法解读

SMPL 的身体参数空间非常成功，但它没有精细手指和面部表情。对真实数字人来说，这两个部分恰恰很重要：手势决定交流意图，脸部决定情绪和身份。SMPL-X 的核心是把 SMPL、MANO、FLAME 这三个成熟模型合并到一个统一 mesh 和 kinematic tree 中。

模型函数可以概括为：

$$
M(\beta,\theta,\psi)=W(T(\beta,\theta,\psi),J(\beta),\theta,\mathcal{W})
$$

其中 \(\theta\) 不再只是身体关节，也包括手指、下颌和眼球姿态；\(\psi\) 是面部表情参数。模板形变包含身份形状、表情 blendshape 与姿态修正：

$$
T=\bar{T}+B_S(\beta)+B_E(\psi)+B_P(\theta)
$$

论文的另一个贡献是 SMPLify-X。它不是直接训练一个回归网络，而是通过优化把模型投影到图像上，与 OpenPose 等检测出的身体/手/脸 2D 关键点对齐。为避免优化落入不自然姿态，SMPLify-X 引入 VPoser：一个在真实人体姿态上训练的 VAE pose prior，让优化在 plausible pose manifold 内进行。

全身模型还会遇到自穿插，例如手臂穿过身体、手掌穿脸。SMPLify-X 因此加入碰撞惩罚和阶段式优化：先稳定身体和相机，再细化手与脸，最后全局联合优化。这个流程提高了单图拟合的鲁棒性。

与 SMPL 相比，SMPL-X 的参数更高维、优化更难，但表达能力覆盖了数字人交互最关键的区域。后续 motion generation、avatar reconstruction、talking head + gesture 联合生成常使用 SMPL-X 作为统一输出格式，避免身体、手、脸各自一套坐标系带来的拼接问题。

> 💡 关键：SMPL-X 的价值不只是“更多关节”，而是把身体、手和脸放进同一可微模型，使全身表达能被联合估计和联合生成。

#### 🧪 练习题
```yaml
question: "SMPL-X 相比 SMPL 的主要扩展是什么？"
options:
  - "只减少身体顶点数量"
  - "统一建模身体、双手和面部表情"
  - "取消所有姿态参数"
  - "只用于音频分类"
answer: 1
explain: "SMPL-X 将 SMPL 身体、MANO 手部和 FLAME 面部整合到统一模型中，因此能表达手势、面部表情和全身姿态。"
```

### AIST++

```yaml
id: aistpp
num: 38
name: AIST++
full_name: AI编舞师 (AI Choreographer)
year: '2021'
org: Google
parent: groovenet
paper_url: https://arxiv.org/abs/2101.08779
project_url: ''
category: body_motion
motivation: 大规模舞蹈数据集与基线
```

#### 📝 一句话总结
AIST++ 提供大规模音乐-3D 舞蹈动作配对数据，并提出 FACT 全注意力跨模态 Transformer，从音乐和短 seed motion 自回归生成长时 3D 舞蹈。

#### 🎯 核心要点
- **数据集贡献**：5.2 小时、1408 个 3D 舞蹈序列、约 1.1M 帧、30 名舞者、10 类舞蹈、60 段音乐
- **多视角重建**：基于 AIST 多视角视频和相机标定，拟合/重建 SMPL 3D motion 与全局位移
- **输出表示**：舞蹈表示为 joint rotations 加 global translation，便于角色重定向
- **FACT 模型**：Full-Attention Cross-modal Transformer，融合 music encoder 和 seed motion encoder
- **future-N supervision**：一次预测多个未来帧，缓解自回归模型的冻结和漂移
- **early fusion**：早期跨模态融合音乐与动作，使生成动作更依赖输入音乐差异
- **评估方式**：包含客观指标和用户研究，关注动作真实感与音乐相关性

#### 🔬 深入细节
##### 核心示意图

![AIST++ FACT 框架](https://ar5iv.labs.arxiv.org/html/2101.08779/assets/figs/model.png)
*图：FACT 接收音乐片段和 2 秒 seed motion，经跨模态 Transformer 预测未来动作，并自回归生成长舞蹈序列。*

##### 核心流程伪代码

```python
# FACT 训练与生成简化
for music, motion in AISTpp:
    seed = motion[t - seed_len:t]
    target = motion[t:t + future_N]
    music_window = extract_music_features(music, t)

    music_tokens = music_transformer(music_window)
    seed_tokens = motion_transformer(seed)
    fused = cross_modal_transformer(music_tokens, seed_tokens)  # full attention
    pred_future = motion_head(fused)

    loss = rotation_loss(pred_future, target)
    loss += translation_loss(pred_future.root, target.root)
    loss += velocity_smoothness_loss(pred_future)
    loss.backward()

def generate_dance(music, seed):
    motion = list(seed)
    while not end(music):
        pred = FACT(music_window(music), last_2_seconds(motion))
        motion.extend(pred[:step_size])  # autoregressive rollout
    return motion
```

##### 方法解读

AIST++ 的第一贡献是把“跳舞视频”变成可训练的 3D 动作数据。原始 AIST Dance Video Database 有多视角同步视频和音乐，论文利用相机参数、2D pose 检测和 SMPL fitting 重建 3D 人体运动。最终每帧包含 SMPL pose、global translation、3D/2D keypoints 等标注，使音乐条件舞蹈生成从小规模 mocap 走向较大规模视频重建数据。

音乐到舞蹈是强一对多问题：同一段音乐可以有很多合理编舞，同一动作也能配不同音乐。AIST++ 的基线不是把音乐直接回归成下一帧，而是给模型一段 seed motion，让生成保持当前舞蹈风格和相位，再由音乐决定后续节奏与动作变化。

FACT 的三个关键设计是 full attention、future-N supervision 和 early fusion。full attention 让 seed motion 和音乐 token 在较短上下文内充分交互；future-N supervision 让模型一次学习一段未来动作，而非只预测一帧，从而减少自回归 rollout 时的均值化和冻结；early fusion 则迫使模型在深层前就建立音乐-动作对应，而不是最后简单拼接条件。

形式上，模型学习：

$$
\hat{X}_{t:t+N}=F_\theta(M_{t-w:t+N}, X_{t-s:t})
$$

其中 \(M\) 是音乐特征，\(X_{t-s:t}\) 是 seed motion，输出是未来 \(N\) 帧舞蹈。测试时不断把已生成片段作为新 seed，滚动生成长序列。

与 GrooveNet 早期的 FCRBM 相比，AIST++ 的差异在数据规模、3D 表示和模型容量。GrooveNet 证明了实时音乐驱动动作的可能性，但训练数据很小；AIST++ 提供更大、更标准的 3D 舞蹈 benchmark，并把 Transformer 作为跨模态建模基线。

> 💡 关键：AIST++ 的长期影响不只在 FACT，而是把音乐-舞蹈生成任务标准化为可复现的数据集和评测问题。

#### 🧪 练习题
```yaml
question: "FACT 中 future-N supervision 的主要目的是什么？"
options:
  - "一次预测多个未来帧，减少自回归生成中的冻结和漂移"
  - "只预测音乐节拍，不预测动作"
  - "把 3D 动作转换为 2D 图片"
  - "删除 seed motion 输入"
answer: 0
explain: "如果只预测下一帧，自回归 rollout 容易回归到均值并逐渐冻结。future-N supervision 让模型学习一段未来运动结构，提高长序列稳定性。"
```

### MDM

```yaml
id: mdm
num: 39
name: MDM
full_name: 人体运动扩散模型 (Human Motion Diffusion Model)
year: '2022'
org: Tel Aviv Univ.
parent: smplx
paper_url: https://arxiv.org/abs/2209.14916
project_url: ''
category: body_motion
motivation: 文本动作条件扩散运动生成
```

#### 📝 一句话总结
MDM 将 classifier-free diffusion 适配到人体动作序列，用 Transformer 直接预测干净 motion sample，并引入几何损失和运动 inpainting，使文本到动作、动作类别到动作和局部编辑共享同一框架。

#### 🎯 核心要点
- **Transformer backbone**：不用图像扩散常见 U-Net，而用适合时间序列的 Transformer encoder/decoder 结构
- **\(x_0\)-prediction**：每个扩散步预测最终干净 motion \(\hat{x}_0\)，而不是只预测噪声
- **几何损失可用**：因为预测 \(\hat{x}_0\)，可以直接在关节位置、速度和脚接触上加 loss
- **classifier-free guidance**：训练时随机丢弃条件，推理时用 guidance scale 平衡保真度和多样性
- **多任务条件**：同一架构支持 text-to-motion、action-to-motion、unconditional generation
- **动作编辑**：把已知关节或时间段固定，在未知部分扩散去噪，实现 in-betweening 和 body-part editing
- **基准数据**：HumanML3D、KIT、HumanAct12、UESTC 等

#### 🔬 深入细节
##### 核心示意图

![MDM 架构图](https://guytevet.github.io/mdm-page/static/figures/mdm_arch.png)
*图：MDM 将 noisy motion、扩散步和文本/动作条件输入 Transformer，在每个采样步预测干净 motion sample。*

##### 核心流程伪代码

```python
# MDM 训练和 classifier-free sampling 简化
for x0, condition in motion_dataset:
    if random() < p_uncond:
        condition = null_condition
    t = sample_timestep()
    eps = normal_like(x0)
    xt = sqrt(alpha_bar[t]) * x0 + sqrt(1 - alpha_bar[t]) * eps

    x0_hat = transformer_mdm(xt, timestep=t, condition=condition)
    loss = mse(x0_hat, x0)
    loss += lambda_pos * joint_position_loss(x0_hat, x0)
    loss += lambda_vel * joint_velocity_loss(x0_hat, x0)
    loss += lambda_foot * foot_contact_loss(x0_hat)
    loss.backward()

def sample(condition, scale=2.5):
    xt = normal_motion()
    for t in reversed(diffusion_steps):
        cond = transformer_mdm(xt, t, condition)
        uncond = transformer_mdm(xt, t, null_condition)
        x0_hat = uncond + scale * (cond - uncond)
        xt = diffusion_reverse_step(xt, x0_hat, t)
    return x0_hat
```

##### 方法解读

人体动作生成天然是一对多问题：“a person walks forward and waves” 可以对应无数合理动作。扩散模型适合表达这种多模态分布，但直接照搬图像 U-Net 并不合适，因为 motion 是关节时间序列，不是二维局部纹理。MDM 因此用 Transformer 处理 \(N\) 帧动作 token，并把条件和 timestep 注入序列建模。

扩散前向过程是标准 DDPM：

$$
x_t=\sqrt{\bar{\alpha}_t}x_0+\sqrt{1-\bar{\alpha}_t}\epsilon
$$

MDM 的关键选择是预测 \(\hat{x}_0=G_\theta(x_t,t,c)\)，训练目标为：

$$
\mathcal{L}_{simple}=\mathbb{E}\left[\|x_0-G_\theta(x_t,t,c)\|_2^2\right]
$$

相比噪声预测，\(x_0\)-prediction 让模型输出直接处在动作空间，因此能额外计算几何损失。例如关节位置损失约束骨架位置，速度损失抑制抖动，脚接触损失减少 foot sliding。这些 motion-domain 先验对人类感知质量很关键。

文本条件通常来自 CLIP text embedding；动作类别条件则用 learned action embedding。classifier-free training 随机把条件替换为空条件，使同一模型同时学条件分布和无条件分布。采样时使用：

$$
\hat{x}_{0,guided}=\hat{x}_{0,\varnothing}+s(\hat{x}_{0,c}-\hat{x}_{0,\varnothing})
$$

较大的 \(s\) 会更贴合文本，但可能降低多样性；论文在实验中讨论了 guidance scale 的折中。

MDM 的另一个实用点是 motion editing。因为扩散采样可以在每一步把已知区域重新写回，模型能只生成缺失关节、缺失时间段或指定 body part。这样同一个模型既能做 text-to-motion，也能做 in-betweening 和局部语义编辑。

> 💡 关键：MDM 把扩散模型的概率生成能力和人体动作领域的几何约束结合起来，核心设计是 Transformer + \(x_0\)-prediction + classifier-free guidance。

#### 🧪 练习题
```yaml
question: "MDM 为什么选择预测干净动作 x0 而不是只预测噪声 epsilon？"
options:
  - "因为这样可以直接在预测动作上施加关节位置、速度和脚接触等几何损失"
  - "因为 Transformer 不能预测噪声"
  - "因为文本条件只能输入 x0"
  - "因为扩散过程不再需要加噪"
answer: 0
explain: "预测 x0 后，模型输出具有动作几何意义，可以计算 motion-domain losses；这些损失对减少抖动、脚滑和不自然姿态很有帮助。"
```

### Listen Denoise Action

```yaml
id: lda
num: 40
name: Listen Denoise Action
full_name: 音频驱动运动合成 (Audio-driven Motion Synthesis)
year: '2023'
org: KTH
parent: mdm
paper_url: https://arxiv.org/abs/2211.09707
project_url: ''
category: body_motion
motivation: 扩散模型驱动手势生成
```

#### 📝 一句话总结
Listen, Denoise, Action! 将 DiffWave 式扩散模型改造成音频条件 3D 人体运动生成器，并用 Conformer、classifier-free guidance 和 product-of-experts 实现高质量手势/舞蹈生成与风格控制。

#### 🎯 核心要点
- **音频驱动扩散运动生成**：用概率扩散模型处理语音手势、音乐舞蹈和路径驱动 locomotion 的一对多问题
- **DiffWave 改造**：从音频波形生成架构迁移到多维 motion sequence 生成
- **Conformer 残差块**：结合 self-attention 和卷积，兼顾长程动作结构与局部节奏模式
- **classifier-free guidance**：训练时随机丢弃风格标签，推理时调节风格强度
- **product-of-experts**：组合多个扩散专家的噪声预测，实现风格插值、跨模型组合和迁移
- **多数据评估**：Trinity Speech-Gesture、ZeroEGGS、Motorica Dance、100STYLE、MMA 等任务
- **主观评测重要**：论文强调 motion realism 和 style appropriateness 需要用户研究辅助判断

#### 🔬 深入细节
##### 核心示意图

![LDA 网络架构](https://ar5iv.labs.arxiv.org/html/2211.09707/assets/x1.png)
*图：LDA 的去噪网络由残差块堆叠组成，残差块内使用 Conformer 处理运动序列，并注入音频、扩散步和风格条件。*

##### 核心流程伪代码

```python
# LDA 训练与推理简化
for motion_x0, audio_cond, style in dataloader:
    n = sample_diffusion_step()
    eps = normal_like(motion_x0)
    x_n = sqrt(alpha_bar[n]) * motion_x0 + sqrt(1 - alpha_bar[n]) * eps

    if random() < p_uncond:
        style = null_style
    eps_hat = conformer_diffwave(x_n, audio_cond, style, n)
    loss = mse(eps_hat, eps)
    loss.backward()

def guided_sample(audio_cond, style, s):
    x = normal_motion()
    for n in reversed(diffusion_steps):
        eps_cond = model(x, audio_cond, style, n)
        eps_uncond = model(x, audio_cond, null_style, n)
        eps = (1 + s) * eps_cond - s * eps_uncond
        x = denoise_step(x, eps, n)
    return x

def product_of_experts_step(x, experts, weights, n):
    eps = sum(w * expert.predict_noise(x, n) for w, expert in zip(weights, experts))
    return denoise_step(x, eps, n)
```

##### 方法解读

音频驱动动作比普通回归更适合概率模型：同一句话可以配很多自然手势，同一段音乐也能跳出不同舞步。确定性 MSE 模型会输出平均动作，表现为手势幅度小、舞蹈无力。LDA 用扩散模型从噪声逐步采样动作序列，天然支持多样结果。

前向扩散为：

$$
q(x_n|x_0)=\mathcal{N}(\sqrt{\bar{\alpha}_n}x_0,(1-\bar{\alpha}_n)I)
$$

去噪网络学习预测噪声：

$$
\mathcal{L}=\mathbb{E}_{n,x_0,\epsilon}\left[\|\epsilon-\epsilon_\theta(x_n,c,n)\|_2^2\right]
$$

其中 \(c\) 包含音频特征和可选风格标签。网络结构继承 DiffWave 的 residual/skip 设计，但把原本的膨胀卷积增强为 Conformer。Conformer 的 self-attention 建模长程身体协调，卷积部分建模局部节奏和短期平滑，对语音手势和舞蹈都很重要。

风格控制使用 classifier-free guidance。训练时以一定概率把风格标签替换为空标签 \(\varnothing\)，推理时组合条件与无条件噪声预测：

$$
\hat{\epsilon}=(1+s)\epsilon_\theta(x_n,c,y,n)-s\epsilon_\theta(x_n,c,\varnothing,n)
$$

\(s\) 越大，风格越明显，但也可能牺牲自然度。这个设计让一个模型可以在推理时连续调节动作风格强度，而不是为每种强度重训模型。

Product-of-experts 是论文的独立亮点。多个扩散模型或同一模型的不同条件都可视为 experts，对每一步噪声预测做加权组合：

$$
\hat{\epsilon}_{poe}=\sum_m \gamma_m\hat{\epsilon}_m
$$

这相当于把多个分布约束相乘：生成结果要同时满足不同专家偏好。论文用它做风格插值、手势风格迁移，以及把舞蹈模型和 MMA/locomotion 模型组合到同一采样过程。

与 MDM 相比，LDA 更强调音频同步和风格化 motion synthesis；与 AIST++/FACT 相比，它从确定性 Transformer 过渡到概率扩散模型，更适合一对多音频-动作映射。

> 💡 关键：LDA 的核心价值是把扩散模型、音频条件、Conformer 时序建模和推理期风格组合放在一个通用动作合成框架里。

#### 🧪 练习题
```yaml
question: "LDA 中 product-of-experts 的主要用途是什么？"
options:
  - "把多个扩散专家的预测组合起来，实现风格插值或跨模型约束"
  - "把音频采样率提高到 48kHz"
  - "替代所有 Conformer 层"
  - "只用于计算训练集大小"
answer: 0
explain: "PoE 在采样时加权组合多个专家的噪声预测，使生成动作同时满足多个条件或风格分布，可用于风格插值和模型组合。"
```

### CyberHost

```yaml
id: cyberhost
num: 41
name: CyberHost
full_name: 单阶段说话身体扩散 (One-stage Diffusion for Talking Body)
year: '2025'
org: 阿里巴巴
parent: lda
paper_url: https://arxiv.org/abs/2409.13501
project_url: ''
category: body_motion
motivation: 音频驱动全身视频单阶段生成
```

#### 📝 一句话总结
CyberHost 提出单阶段音频驱动 talking body 扩散框架，用 Region Attention Module 和 Human-Prior-Guided Conditions 同时缓解手部细节破损、身份不一致和仅靠音频驱动时的运动不确定性。

#### 🎯 核心要点
- 单阶段生成：直接从参考图像、音频和结构先验生成说话半身/身体视频，不再拆成“音频到姿态”和“姿态到视频”两个独立阶段。
- Region Attention Module：在去噪 U-Net 多层插入区域注意力，用可学习的时空 region latent bank 和局部身份特征强化手部、脸部等关键区域。
- Human-Prior-Guided Conditions：引入 body movement map、hand clarity score、pose-aligned reference features，降低音频到身体动作的一对多不确定性。
- Reference network：利用历史运动帧抽取时序延续线索，提升长片段的身份一致性与动作连续性。
- 资料限制：manifest 中 `paper_url` 可打开但与 CyberHost 题名不匹配；本文精读使用实际公开论文 `https://arxiv.org/abs/2409.01876` 和论文 HTML 图源。

#### 🔬 深入细节
##### 核心示意图/框架图
![CyberHost overall framework](https://arxiv.org/html/2409.01876v3/extracted/6337763/figs/halfbody.png)
*图：CyberHost 总体结构。RAM 插入扩散 U-Net，结构先验和参考网络共同约束音频驱动的视频生成。*

##### 核心流程伪代码
```python
# CyberHost audio-driven talking body generation
for video_clip, audio, reference_image in training_data:
    z0 = video_vae.encode(video_clip)
    t = sample_diffusion_step()
    eps = normal_like(z0)
    zt = add_noise(z0, eps, t)

    face_crop, hand_crop = crop_regions(reference_image)
    region_tokens = RAM.latent_bank_attend(face_crop, hand_crop)
    priors = build_human_priors(audio, video_clip)  # movement map, hand clarity, pose-aligned refs
    ref_feat = reference_net(previous_motion_frames)

    eps_hat = denoising_unet(zt, t, audio, reference_image, region_tokens, priors, ref_feat)
    loss = mse(eps_hat, eps) + lambda_mask * region_mask_loss()
    update(loss)

def infer(audio, reference_image):
    z = normal_latent()
    for t in reversed(diffusion_steps):
        region_tokens = RAM.extract(reference_image)
        priors = build_inference_priors(audio, reference_image)
        z = denoise_step(z, t, audio, reference_image, region_tokens, priors)
    return video_vae.decode(z)
```

##### 方法解读
CyberHost 的问题设定是跨模态 talking body：输入一张人物图像和一段音频，输出与语音同步、身份一致、手和脸不崩的视频。传统级联做法先预测姿态或 motion，再用视频生成器渲染，优点是条件明确，缺点是误差会级联，而且手、脸等局部区域在低分辨率姿态中很容易丢细节。CyberHost 选择单阶段扩散，让视觉合成和运动建模在同一个去噪网络里共同优化。

核心扩散目标仍是噪声预测：
$$
\mathcal{L}_{diff}=\mathbb{E}_{z_0,t,\epsilon}\left[\|\epsilon-\epsilon_\theta(z_t,t,c_{audio},c_{img},c_{prior})\|_2^2\right],
$$
其中 \(z_t\) 是视频 latent 加噪后的状态，条件 \(c\) 包含音频、参考图像、区域特征和人体先验。直觉上，音频告诉模型“什么时候说话、节奏如何”，参考图像告诉模型“是谁、衣服和脸长什么样”，人体先验告诉模型“身体大概该怎样动”。

RAM 的设计是把局部区域拆成“身份无关的结构模式”和“身份相关的外观描述”。论文中 RAM 维护 spatial latent bank 与 temporal latent bank，并对手、脸区域使用局部 descriptor 做注意力融合。这样做的原因是手部拓扑和脸部表情存在可复用的通用模式，但最终渲染必须贴合输入人物的身份细节；单纯靠全局 self-attention 往往会在这些小区域平均化。

Human-Prior-Guided Conditions 处理另一个困难：仅凭语音不能唯一决定身体动作。CyberHost 因此加入 body movement map 约束全局运动范围，用 hand clarity score 区分训练样本中手部清晰度，并用 pose-aligned reference features 补充局部对齐的身份特征。训练时这些条件让模型学到“清晰手部应该对应什么样的局部纹理和运动”；推理时输入更高质量的条件可以把生成分布推向更稳定的样本。

与 LDA 这类音频到动作扩散相比，CyberHost 的重点从“生成骨架/动作序列”扩展到“直接生成视频”。它牺牲了一部分显式可控性，换来端到端优化的视觉一致性；同时通过 RAM 和先验条件补回单阶段模型最容易丢掉的局部结构约束。

> 💡 关键：CyberHost 的贡献不是简单把音频塞进视频扩散模型，而是专门为 talking body 的局部崩坏和运动不确定性设计了区域记忆与人体先验。

#### 🧪 练习题
```yaml
question: "CyberHost 中 RAM 的主要作用是什么？"
options:
  - "把音频转写成文本后再驱动表情"
  - "用区域 latent bank 和局部身份特征增强手部、脸部等关键区域"
  - "将扩散模型替换为自回归 Transformer"
  - "只预测 3D 骨架而不生成像素"
answer: 1
explain: "RAM 被插入去噪 U-Net，用可学习的时空区域记忆和局部 descriptor 强化小区域结构与身份一致性。"
```

### HumanDiT

```yaml
id: humandit
num: 42
name: HumanDiT
full_name: 姿态引导扩散Transformer (Pose-guided Diffusion Transformer)
year: '2025'
org: 学术界
parent: mdm
paper_url: https://arxiv.org/abs/2502.04847
project_url: ''
category: body_motion
motivation: DiT架构长序列时序一致性
```

#### 📝 一句话总结
HumanDiT 提出姿态引导的 Diffusion Transformer 视频生成框架，用 3D VAE、prefix-latent reference、Keypoint-DiT 和 Pose Adapter 解决长序列人体视频中的身份保持、细粒度手脸渲染和可变分辨率问题。

#### 🎯 核心要点
- DiT 视频去噪器：在视频 latent 上做全注意力建模，支持多分辨率和可变时长，而不是固定尺寸的 U-Net 管线。
- Prefix-latent reference：把首帧/参考图像编码成无噪声 prefix latent，使长视频生成过程中持续保留人物身份。
- Pose guider：将身体、手、脸关键点转成空间条件特征，约束最终视频严格跟随姿态。
- Keypoint-DiT：在推理时生成后续关键点序列，用于静态图像的视频续写和长序列延展。
- Pose Adapter：对外部 pose transfer 序列做对齐和过渡帧 refinement，缓解参考图与目标姿态之间的尺度和局部错位。

#### 🔬 深入细节
##### 核心示意图/框架图
![HumanDiT overview](https://arxiv.org/html/2502.04847v1/x2.png)
*图：HumanDiT 总览。3D VAE 编码视频，prefix latent 保存参考身份，DiT 在姿态条件下完成视频去噪，Keypoint-DiT 与 Pose Adapter 支持续写和姿态迁移。*

##### 核心流程伪代码
```python
# HumanDiT training and inference skeleton
for video, pose_seq, ref_frame in dataset:
    z0 = video_vae.encode(video)              # 3D latent tokens
    prefix = video_vae.encode(ref_frame)       # noise-free reference latent
    t = sample_t()
    eps = randn_like(z0[:, 1:])
    zt = concat(prefix, add_noise(z0[:, 1:], eps, t))

    pose_feat = pose_guider(pose_seq)
    eps_hat = video_dit(zt, t, pose_feat, prefix_mask=True)
    loss = mse(eps_hat, eps)
    update(loss)

def generate(ref_image, optional_pose=None):
    if optional_pose is None:
        pose_seq = keypoint_dit.sample(initial_pose(ref_image))
    else:
        pose_seq = pose_adapter.refine(initial_pose(ref_image), optional_pose)
    return diffusion_decode_with_prefix(ref_image, pose_seq)
```

##### 方法解读
HumanDiT 面对的是“从单图或短视频生成长人体视频”。此前 pose-guided human animation 常见问题有三类：手和脸在长序列里细节不稳，人物身份随着时间漂移，模型只能处理固定分辨率或短片段。HumanDiT 的核心策略是把视频压到 3D VAE latent，再用 DiT 进行时空联合去噪，让时间维和空间维都能进入 Transformer attention。

扩散训练目标可写成：
$$
\mathcal{L}=\mathbb{E}_{z_0,t,\epsilon}\left[\|\epsilon-\epsilon_\theta(z_t,t,\phi(P),z_{ref})\|_2^2\right],
$$
其中 \(\phi(P)\) 是 pose guider 从关键点序列得到的条件特征，\(z_{ref}\) 是参考帧 latent。与把参考图作为普通条件拼接不同，prefix-latent reference 将参考帧保留为无噪声前缀 token，让后续 token 在每一步去噪中都能直接 attend 到稳定身份锚点。

Keypoint-DiT 解决“没有完整驱动姿态怎么办”。给定第一帧关键点 \(j_0\)，它迭代去噪得到后续 \(\{j_1,\ldots,j_m\}\)。这让系统可以从静态图像自动续写运动，而不是依赖外部视频模板。对于 pose transfer，外部关键点往往和参考图的体型、脸手尺度不一致，Pose Adapter 会先做对齐，再交给 Keypoint-DiT refinement 生成平滑过渡。

HumanDiT 的训练数据规模是论文强调的另一部分：大规模 wild human videos 让 DiT 学到多场景、多衣着、多动作的分布。和 MDM 类“生成 3D motion 序列”的模型相比，HumanDiT 直接生成人体视频，因此评估重点转为身份保持、视觉质量、pose accuracy 和 temporal consistency。

> ⚠️ 注意：HumanDiT 的“长序列一致性”不是只靠更长上下文，而是 reference prefix、pose 条件和 Keypoint-DiT 共同减少身份漂移与姿态漂移。

#### 🧪 练习题
```yaml
question: "HumanDiT 中 prefix-latent reference 的核心目的是什么？"
options:
  - "减少训练数据规模"
  - "把参考帧作为无噪声前缀，稳定长视频中的人物身份"
  - "把 2D 姿态转换成 3D SMPL 参数"
  - "在推理时完全跳过扩散采样"
answer: 1
explain: "prefix latent 在每一步去噪中作为稳定参考 token 被 DiT 访问，比普通条件拼接更利于长序列身份保持。"
```

### MotionGPT3

```yaml
id: motiongpt3
num: 43
name: MotionGPT3
full_name: 运动作为第二模态 (Human Motion as a Second Modality)
year: '2025'
org: 学术界
parent: mdm
paper_url: https://arxiv.org/abs/2502.12345
project_url: ''
category: body_motion
motivation: LLM第二模态扩散解码
```

#### 📝 一句话总结
MotionGPT3 将人体运动作为独立于文本的第二连续模态，用 motion VAE、双流 Transformer 和轻量扩散头统一运动理解与生成，缓解离散量化误差和单流多模态训练互相干扰。

#### 🎯 核心要点
- 连续运动表示：用预训练 motion VAE 将原始 motion 编码为连续 latent，避免 VQ token 的量化误差。
- 双流/混合架构：文本和运动保留各自参数通路，通过共享或跨模态 attention 交换信息，减少模态干扰。
- 运动扩散头：从语言 backbone hidden states 预测运动 latent 分布，用 diffusion supervision 提升生成多样性和保真度。
- 三阶段训练：先生成、再跨模态对齐、最后联合微调，降低多任务联合训练不稳定。
- 资料限制：manifest 中 `2502.12345` 与该题名不匹配；本文使用公开论文 `https://arxiv.org/abs/2506.24086` 与项目页资料。

#### 🔬 深入细节
##### 核心示意图/框架图
![MotionGPT3 method overview](https://arxiv.org/html/2506.24086v1/x3.png)
*图：MotionGPT3 方法总览。运动先经 VAE 得到连续 latent，再进入独立运动分支，与语言分支通过跨模态连接完成理解和生成。*

##### 核心流程伪代码
```python
# MotionGPT3 multimodal training
for batch in motion_language_tasks:
    text_tokens = text_tokenizer(batch.text)
    motion_latent = motion_vae.encode(batch.motion) if batch.has_motion else None

    text_h, motion_h = dual_stream_transformer(
        text_tokens=text_tokens,
        motion_latents=motion_latent,
        cross_modal_links=True,
    )

    loss = 0
    if batch.task == "motion_to_text":
        loss += cross_entropy(text_head(text_h), batch.target_text)
    if batch.task == "text_to_motion":
        target_z = motion_vae.encode(batch.target_motion)
        eps, t = sample_noise(target_z)
        eps_hat = diffusion_head(motion_h, t, text_h)
        loss += mse(eps_hat, eps)
    if batch.task == "alignment":
        loss += contrastive_or_matching_loss(text_h, motion_h)
    update(loss)
```

##### 方法解读
早期 MotionGPT/T2M-GPT 系列常把运动离散化成 VQ token，再让 LLM 像生成单词一样生成动作。这样天然适配自回归语言模型，但会带来两层问题：运动本身是连续轨迹，离散 codebook 会造成重建误差；把文本 token 和运动 token 混在单流 backbone 里训练，也容易损伤语言能力或让 motion task 互相干扰。

MotionGPT3 的第一步是把运动编码为连续 latent：
$$
z=\mathcal{E}(m^{1:M}),\qquad \hat{m}^{1:M}=\mathcal{D}(z),
$$
其中 \(\mathcal{E}\) 和 \(\mathcal{D}\) 是 motion VAE。连续 latent 保留了更多速度、关节角、接触等细粒度信息；同时 diffusion head 可以在 latent 空间建模一对多生成，而不是被迫输出单一 token 序列。

双流 Transformer 的直觉是“共享语义，不共享所有参数”。文本流保留预训练语言模型的语言知识，运动流拥有专门处理 motion latent 的参数；跨模态连接只在需要的位置打开，让文本描述影响运动生成，也让运动特征反向支持 captioning 和问答。相比单流拼接，这种架构更接近 mixture-of-transformers，对新增运动模态更友好。

训练调度同样重要。论文采用 generate-then-align 的三阶段策略：先让模型在生成任务上学会从文本产生运动 latent，再做文本-运动对齐，最后联合训练理解和生成任务。这样可以避免一开始就把 captioning、text-to-motion、QA 等目标混在一起导致梯度冲突。

与 MDM 的区别在于，MDM 是专用运动扩散模型，输入文本条件直接生成 motion；MotionGPT3 则把运动作为 LLM 的第二模态，使同一模型既能生成运动，也能解释运动、回答运动相关问题。其代价是系统更复杂，但优点是任务覆盖面和语言理解能力更强。

#### 🧪 练习题
```yaml
question: "MotionGPT3 为什么采用连续 motion VAE latent 而不是只使用 VQ 离散运动 token？"
options:
  - "为了完全取消 Transformer"
  - "为了避免量化误差并保留更细粒度的运动信息"
  - "为了让运动只能做分类任务"
  - "为了把所有 motion 变成固定一帧"
answer: 1
explain: "连续 latent 能减少 VQ codebook 的信息损失，并为扩散头在 latent 空间建模多样运动提供基础。"
```

### UniMotion

```yaml
id: unimotion
num: 44
name: UniMotion
full_name: 统一运动合成与理解 (Unifying 3D Human Motion Synthesis)
year: '2025'
org: ICRA 2025
parent: mdm
paper_url: https://arxiv.org/abs/2502.23456
project_url: ''
category: body_motion
motivation: 双向Transformer统一生成与理解
```

#### 📝 一句话总结
UniMotion 提出统一的多模态运动扩散模型，把全局文本、帧级局部文本和 3D motion 放进同一个概率框架，同时支持层级 text-to-motion、motion-to-text 和联合生成。

#### 🎯 核心要点
- 统一合成与理解：同一模型既能从文本生成 motion，也能从 motion 预测帧级文本，还能无条件联合采样 motion 与局部描述。
- 全局+局部双层文本控制：全局文本描述整段动作意图，局部文本按时间对齐到具体动作片段，实现 hierarchical control。
- 多模态扩散：对 pose 和局部文本分别使用扩散时间变量，训练时覆盖不同条件组合和无条件分布。
- 时序对齐编码：局部文本 token 与 motion frame 对齐，避免只有 sequence-level prompt 时无法说明“什么时候发生什么动作”。
- 资料限制：manifest 中 `2502.23456` 返回不可用；本文使用公开论文 `https://arxiv.org/abs/2409.15904` 和项目页 `https://coral79.github.io/uni-motion/`。

#### 🔬 深入细节
##### 核心示意图/框架图
![UniMotion universality](https://arxiv.org/html/2409.15904v1/x1.png)
*图：UniMotion 的任务统一能力，包括层级文本生成运动、motion-to-text、无条件联合生成和文本编辑。*

##### 核心流程伪代码
```python
# UniMotion joint motion-text diffusion
for motion, global_text, local_text_segments in merged_dataset:
    x0 = encode_motion(motion)
    y0 = align_local_text_to_frames(local_text_segments)
    c = encode_global_text(global_text) if use_global_condition() else null

    tx = sample_motion_diffusion_step()
    ty = sample_text_diffusion_step()
    xt = diffuse_motion(x0, tx)
    yt = diffuse_local_text(y0, ty)

    condition_mask = sample_condition_subset(["global", "local", "motion", "none"])
    pred = transformer(xt, yt, c, tx, ty, condition_mask)
    loss = motion_denoise_loss(pred.motion, x0) + local_text_loss(pred.text, y0)
    update(loss)

def sample(global_text=None, local_text=None, observed_motion=None):
    return reverse_diffusion_with_available_conditions(global_text, local_text, observed_motion)
```

##### 方法解读
传统 text-to-motion 通常只接收一句全局 prompt，例如“a person walks then waves”。这种条件适合表达整体意图，但不擅长指定帧级时间线；反过来，帧级脚本能精确控制每段动作，却要求用户提供很细的标注。UniMotion 的出发点是把两种控制层级合并，并让模型同时具备运动理解能力。

在概率建模上，UniMotion 不是只学习 \(p(x\mid c)\)，而是学习 motion \(x\)、局部文本 \(y\) 与全局文本 \(c\) 之间的多种条件分布。可以把它理解为：
$$
p_\theta(x,y\mid c),\quad p_\theta(x\mid y,c),\quad p_\theta(y\mid x,c),\quad p_\theta(x,y).
$$
训练时随机遮蔽不同模态，让模型见到“只有全局文本”“只有局部文本”“全局+局部”“给定 motion 预测文本”等组合。

局部文本的时序对齐是核心机制。模型将每个动作片段的文本 token 对齐到 motion frame，使 Transformer 能在同一时间索引上比较“这一段文本”和“这一段姿态”。这比简单把所有文本拼成一句 prompt 更适合编辑，因为用户修改某个局部描述后，模型可以只在对应时间段重采样或调整 motion。

论文继承了 MDM 式的 motion diffusion 思想，但把文本也纳入多模态扩散。不同模态可拥有不同 diffusion timestep，意味着模型可以在“motion 很 noisy、文本较清晰”或“文本 noisy、motion 清晰”的状态下学习互相补全。这个设计是 motion-to-text 和联合生成的基础。

与 MotionGPT3 的差异在于，UniMotion 不强调 LLM 语言智能，而强调 motion 与帧级文本的概率统一和时序可编辑性；与普通 MDM 相比，它不只是生成动作，还能输出动作发生时间对应的文字解释。

#### 🧪 练习题
```yaml
question: "UniMotion 相比只使用全局 prompt 的 text-to-motion 模型，关键增强是什么？"
options:
  - "只生成单帧人体姿态"
  - "引入与 motion frame 对齐的局部文本，实现层级控制和帧级理解"
  - "完全取消扩散过程"
  - "只支持无条件生成"
answer: 1
explain: "UniMotion 将局部文本按时间对齐到动作帧，并与全局文本共同建模，因此能控制和解释动作在时间轴上的发生位置。"
```

### Motion-Agent

```yaml
id: motion_agent
num: 45
name: Motion-Agent
full_name: 对话式运动生成框架 (Conversational Framework for Motion)
year: '2025'
org: ICLR 2025
parent: motiongpt3
paper_url: https://arxiv.org/abs/2405.01234
project_url: ''
category: body_motion
motivation: LLM规划扩散执行对话生成
```

#### 📝 一句话总结
Motion-Agent 提出用 LLM 做多轮规划、用 MotionLLM 做运动-语言执行器的对话式运动生成框架，使用户能通过自然语言逐步生成、编辑和理解复杂人体动作。

#### 🎯 核心要点
- 对话式 agent：将多轮用户意图解析为动作生成、编辑、连接、理解等子任务，而不是一次性 text-to-motion。
- MotionLLM 执行器：把 motion token 与 text token 放入统一词表，通过轻量 adapter 微调开源 LLM 完成 motion-language 映射。
- Motion tokenization：使用 VQ/RVQ tokenizer-detokenizer 将连续 motion 转成 LLM 可处理的离散 token，再解码回 3D motion。
- 参数高效训练：只训练 LLM 约 1-3% 参数的 adapter，保留预训练语言模型的泛化能力。
- 资料限制：manifest 中 `2405.01234` 与该题名不匹配；本文使用 ICLR 2025 项目页 `https://knoxzhao.github.io/Motion-Agent` 和公开 arXiv `https://arxiv.org/abs/2405.17013`。

#### 🔬 深入细节
##### 核心示意图/框架图
![Motion-Agent overview](https://knoxzhao.github.io/Motion-Agent/images/model.png)
*图：Motion-Agent 框架。上层 LLM 负责多轮对话规划，MotionLLM 负责把文本与 motion token 互相转换并输出可渲染动作。*

##### 核心流程伪代码
```python
# Motion-Agent conversational generation
memory = []
motion_state = None

while user_message := receive():
    plan = gpt4_or_planner.generate_plan(user_message, memory, motion_state)
    for step in plan:
        if step.type == "generate":
            motion_tokens = motion_llm.generate_tokens(step.text_prompt)
            motion_state = motion_detokenizer.decode(motion_tokens)
        elif step.type == "edit":
            edit_prompt = build_edit_prompt(motion_state, step.instruction)
            motion_tokens = motion_llm.generate_tokens(edit_prompt)
            motion_state = motion_detokenizer.decode(motion_tokens)
        elif step.type == "caption":
            caption = motion_llm.caption(motion_tokenizer.encode(motion_state))
            memory.append(caption)
        elif step.type == "transition":
            motion_state = blend_or_regenerate_transition(motion_state, step.target)
    memory.append((user_message, plan, motion_state))
```

##### 方法解读
普通 text-to-motion 模型通常是一次输入一句话，输出一段 motion。Motion-Agent 关注的是交互式创作：用户可能先说“让人向前走”，再说“中间加一个转身”，再要求“把结尾改成挥手”。这类任务需要记住上下文、拆分意图并调用运动模型多次执行，因此论文把系统分成 agent planner 和 MotionLLM 执行器。

MotionLLM 的底层机制是 motion tokenization。给定连续运动序列 \(m^{1:T}\)，tokenizer 将其映射为离散 token：
$$
q = \operatorname{Quantize}(\mathcal{E}(m^{1:T})),\qquad \hat{m}^{1:T}=\mathcal{D}(q).
$$
这些 motion token 被加入 LLM 词表，文本和运动都变成 token-in/token-out 问题。生成任务是从文本 token 自回归地产生 motion token；captioning 则反过来从 motion token 生成自然语言描述。

参数高效 adapter 是 MotionLLM 能作为 agent 工具的关键。论文报告只需微调少量 adapter 参数即可达到与从头训练的 transformer 或 diffusion 基线相近的结果。这样做的好处是保留 LLM 的语言理解和指令泛化能力，坏处是运动质量受 tokenizer 上限影响，复杂交互和多人动作仍可能漂移。

Motion-Agent 在此基础上接入 GPT-4 等强规划器，不额外训练也能完成复杂多轮任务。规划器负责把“先跳一下再转身并自然衔接”拆成子 prompt、过渡和编辑操作；MotionLLM 负责执行每个子动作。与 MotionGPT3 相比，Motion-Agent 更像系统框架：它不只讨论模型结构，还强调对话记忆、任务分解和多步调用。

> 💡 关键：Motion-Agent 的“agent”能力来自上层语言规划与下层 motion-language 模型的组合；MotionLLM 是执行器，不等同于完整的对话系统。

#### 🧪 练习题
```yaml
question: "Motion-Agent 为什么需要把连续 motion 转成离散 token？"
options:
  - "为了让运动可以作为 LLM 的输入/输出词元进行自回归建模"
  - "为了去掉所有动作的时间顺序"
  - "为了让模型只能做图像生成"
  - "为了避免使用任何解码器"
answer: 0
explain: "MotionLLM 继承 LLM 的 token-in/token-out 范式，因此需要 motion tokenizer/detokenizer 在连续动作和离散词元之间转换。"
```

### DartControl

```yaml
id: dartcontrol
num: 46
name: DartControl
full_name: 扩散自回归运动控制 (Diffusion-based Autoregressive Motion)
year: '2025'
org: ICLR 2025
parent: mdm
paper_url: https://arxiv.org/abs/2405.02345
project_url: ''
category: body_motion
motivation: AR与Diffusion混合实时控制
```

#### 📝 一句话总结
DartControl 的核心目标是：AR与Diffusion混合实时控制。

#### 🎯 核心要点
- 核心动机：AR与Diffusion混合实时控制
- 演化来源：继承或改进自 mdm
- 代表机构：ICLR 2025

#### 🔬 深入细节
AR与Diffusion混合实时控制


### EnergyMoGen

```yaml
id: energymogen
num: 47
name: EnergyMoGen
full_name: 能量基组合运动生成 (Compositional Human Motion with EBM)
year: '2025'
org: CVPR 2025
parent: mdm
paper_url: https://arxiv.org/abs/2405.03456
project_url: ''
category: body_motion
motivation: EBM潜在扩散组合运动生成
```

#### 📝 一句话总结
EnergyMoGen 从能量模型视角重写 latent motion diffusion，用 latent-aware 与 semantic-aware 两类 EBM 组合多个文本概念，并通过 Synergistic Energy Fusion 同时缓解语义错配、脚滑和动作抖动。

#### 🎯 核心要点
- Latent-aware EBM：把扩散模型的去噪分布视作 latent 空间中的能量项，支持多个扩散模型/条件的 conjunction 与 negation。
- Semantic-aware EBM：基于 cross-attention 构造语义能量，对文本 embedding 做自适应梯度下降，增强多概念 prompt 的可组合性。
- Synergistic Energy Fusion：融合 latent-aware、semantic-aware 和 multi-concept generation 的分布，减少文本错配和运动失真。
- 新操作：不仅支持“概念 A and 概念 B”，还支持“概念 A but not 概念 B”的 negation 组合。
- 资料限制：manifest 中 `2405.03456` 与 EnergyMoGen 题名不匹配；本文使用公开论文 `https://arxiv.org/abs/2412.14706` 和项目页图源。

#### 🔬 深入细节
##### 核心示意图/框架图
![EnergyMoGen framework](https://jiro-zhang.github.io/EnergyMoGen/static/images/Framework.png)
*图：EnergyMoGen 框架。方法从 latent-aware 和 semantic-aware 两条能量谱系组合动作概念，并用 SEF 融合。*

##### 核心流程伪代码
```python
# EnergyMoGen compositional sampling
def compose_motion(prompts, negative_prompts=None):
    z = randn_latent()
    text_embeds = text_encoder(prompts)
    neg_embeds = text_encoder(negative_prompts or [])

    for t in reversed(diffusion_steps):
        # latent-aware energy: combine denoising scores
        scores = [diffusion_score(z, t, e) for e in text_embeds]
        neg_scores = [diffusion_score(z, t, e) for e in neg_embeds]
        score_latent = sum(scores) - sum(neg_scores)

        # semantic-aware energy: update text embeddings by attention energy gradient
        energy = cross_attention_energy(z, text_embeds)
        text_embeds = text_embeds - gamma * grad(energy, text_embeds)
        score_semantic = diffusion_score(z, t, fuse(text_embeds))

        score = synergistic_energy_fusion(score_latent, score_semantic)
        z = denoise_step(z, t, score)
    return motion_decoder(z)
```

##### 方法解读
组合运动生成的难点是“多个语义同时成立”。例如“左手挥动，同时向前走，并且不要跳跃”要求模型在时间、身体部位和语义层面组合多个约束。普通 text-to-motion diffusion 通常把整句 prompt 编成一个条件向量，容易只满足最显著概念，或把多个动作混成不自然的平均动作。

EnergyMoGen 用 EBM 语言描述这个问题。能量模型定义：
$$
p_\theta(X)=\frac{\exp(-E_\theta(X))}{Z(\theta)}.
$$
低能量代表更符合目标概念的运动。能量的可加性让组合变得自然：conjunction 可近似为多个能量相加，negation 可通过提高某个概念对应区域的能量来排斥它。

Latent-aware EBM 将扩散模型的 score/去噪方向看成 latent 分布的能量梯度。多个 prompt 对应多个条件 score，组合时对这些 score 做加权加减。直觉上，每个 score 都在告诉 latent “朝满足这个概念的方向移动”，conjunction 就是同时听多个方向，negation 则从不想要的概念方向移开。

Semantic-aware EBM 则从 cross-attention 入手。多概念 prompt 的文本 embedding 可能在注意力中竞争或错位，论文对 attention energy 求梯度并自适应更新文本 embedding，使模型更清楚哪个概念应该约束哪个身体部位或时间片段。这个机制能提升语义覆盖，但单独使用可能引入脚滑和抖动。

Synergistic Energy Fusion 是平衡器：latent-aware 组合语义稳定但可能文本错配，semantic-aware 组合更灵活但可能运动失真。SEF 将两者的分布和 multi-concept generation 结果融合，保留复杂概念组合能力，同时约束物理连续性和足部接触。

#### 🧪 练习题
```yaml
question: "EnergyMoGen 中 negation 组合的直觉是什么？"
options:
  - "删除所有文本条件，只做无条件生成"
  - "把不想要概念对应的能量方向从组合 score 中排斥出去"
  - "只训练一个更大的 VAE"
  - "把所有动作裁剪成同一长度"
answer: 1
explain: "在能量视角下，conjunction 组合低能量区域，negation 则提高或减去不希望概念的吸引方向，使采样远离该概念。"
```

### PERSONA

```yaml
id: persona
num: 48
name: PERSONA
full_name: 个性化全身3D化身 (Personalized Whole-Body 3D Avatar)
year: '2026'
org: ICCV 2026
parent: cyberhost
paper_url: https://arxiv.org/abs/2508.09973
project_url: ''
category: body_motion
motivation: 单图生成非刚性衣物形变全身3D
```

#### 📝 一句话总结
PERSONA 用扩散生成的 pose-rich 视频补足单张图像缺少的姿态变化，再优化 3DGS/参数化 avatar，并通过 balanced sampling 与 geometry-weighted optimization 保持身份真实性和非刚性衣物形变。

#### 🎯 核心要点
- 单图个性化 avatar：输入一张人物图像，生成可动画化的全身 3D 化身，而不是要求多视角或长视频采集。
- 扩散生成训练视频：利用 2D pose-conditioned diffusion animator 从单图生成多姿态视频，提供衣物和身体的 pose-driven deformation 监督。
- Balanced sampling：优化 avatar 时过采样原始输入图，抵消扩散生成帧的身份漂移和纹理伪影。
- Geometry-weighted optimization：降低生成帧的 image loss 权重、提高 geometry loss 权重，避免把扩散伪影烘进 3D 表示。
- 资料说明：manifest 保留 2026/ICCV 2026 元信息；公开 arXiv 页面 `2508.09973` 发布时间为 2025 年 8 月。

#### 🔬 深入细节
##### 核心示意图/框架图
![PERSONA overview](https://arxiv.org/html/2508.09973v1/x1.png)
*图：PERSONA 对比 3D-based 与 diffusion-based avatar 路线，并将二者结合为单图个性化 3D avatar。*

##### 核心流程伪代码
```python
# PERSONA single-image avatar personalization
input_image = load_person_image()
smplx_init = estimate_body_model(input_image)

# 1. Generate pose-rich pseudo videos from a single image
pose_bank = sample_diverse_poses()
generated_frames = diffusion_animator(input_image, pose_bank)

# 2. Balanced sampling mixes authentic input and generated frames
train_set = balanced_sample(
    authentic=[input_image],
    generated=generated_frames,
    ratio=(1, 1),
)

# 3. Optimize avatar with geometry-weighted losses
for frame, pose in train_set:
    render_rgb, render_geom = avatar.render(pose)
    target_geom = estimate_geometry(frame)
    w_img, w_geom = choose_weights(frame_is_generated(frame))
    loss = w_img * l1(render_rgb, frame) + w_geom * l1(render_geom, target_geom)
    loss += regularize_pose_driven_offsets()
    update_avatar(loss)
```

##### 方法解读
单图 avatar 的核心矛盾是：真实身份信息只有一张图，姿态驱动形变却需要大量不同姿态下的观测。传统 3D-based 方法能保持身份，但要学习衣服褶皱、宽松衣物离体等非刚性形变，通常需要 pose-rich 视频。Diffusion-based 方法能从大规模视频中学到姿态形变，却容易在生成帧中改变人脸、衣纹和身份。

PERSONA 的策略是“用扩散补姿态，用 3D 优化保身份”。它先用 pose-conditioned diffusion animator 生成多姿态训练帧，让模型看到抬手、转身等动作下衣物如何变形；然后基于这些帧优化个性化 3D avatar。这样做把 diffusion 的泛化形变能力转化成可渲染、可重定位的 3D 表示。

Balanced sampling 解决身份漂移。若训练时生成帧占比过高，avatar 会逐渐拟合扩散模型的平均脸、错误纹理或阴影；若只用输入图，又无法学习 pose-driven deformation。论文因此在采样中提高原始输入图出现频率，使身份锚点反复参与优化。直觉上，输入图负责“像本人”，生成帧负责“会变形”。

Geometry-weighted optimization 解决伪影烘焙。对生成帧直接施加强 image loss，会把模糊纹理、错位衣纹、光照阴影写进 3D avatar。PERSONA 因此对生成帧降低 RGB 重建权重，并提高 geometry map 约束：
$$
\mathcal{L}=w_{img}\|I-\hat{I}\|_1+w_{geo}\|G-\hat{G}\|_1+\lambda\mathcal{R}.
$$
对于扩散生成帧，\(w_{img}\) 较低、\(w_{geo}\) 较高；对于真实输入图，身份相关的 image loss 更重要。

与 CyberHost 这种直接生成 2D talking body 的模型相比，PERSONA 的目标是可复用的 3D avatar。它不会只输出一段视频，而是优化出可在新姿态、新视角下渲染的个性化表示；代价是需要一次个体级优化流程。

#### 🧪 练习题
```yaml
question: "PERSONA 中 balanced sampling 的主要作用是什么？"
options:
  - "让所有训练帧都来自扩散模型"
  - "过采样原始输入图，抵消扩散生成帧导致的身份漂移"
  - "把 3D avatar 压缩成文本 token"
  - "完全取消几何损失"
answer: 1
explain: "原始输入图提供最可靠的身份和纹理锚点，balanced sampling 防止优化过程过度拟合扩散生成帧中的身份偏移和伪影。"
```

### TaoAvatar

```yaml
id: taoavatar
num: 49
name: TaoAvatar
full_name: 高保真3DGS全身化身 (High-fidelity 3DGS Full-body Avatar)
year: '2026'
org: 学术界
parent: persona
paper_url: https://arxiv.org/abs/2601.34567
project_url: ''
category: body_motion
motivation: 轻量化3DGS移动端90FPS渲染
```

#### 📝 一句话总结
TaoAvatar 提出面向 AR 的轻量高保真 3DGS 全身 talking avatar，用 StyleUnet 教师学习复杂非刚性形变，再蒸馏到 MLP 学生并用 blend shapes 补偿细节，实现移动/头显端实时渲染。

#### 🎯 核心要点
- 3DGS+SMPLX++ 模板：构建带衣物扩展的参数化全身模板，并绑定 Gaussian 表示外观。
- StyleUnet teacher：在前后正交投影的 2D texture/position map 上学习高频、姿态相关的非刚性 Gaussian deformation。
- Baking/distillation：把 teacher 的动态 Gaussian deformation 蒸馏进轻量 MLP mesh deformation field，降低移动端计算量。
- Gaussian blend shapes：用两个轻量可学习 blend shape 补偿 MLP 学生丢失的高频外观细节。
- 资料限制：manifest 中 `2601.34567` 返回不可用；本文使用公开论文 `https://arxiv.org/abs/2503.17032`、CVPR 2025 版本和项目页图源。

#### 🔬 深入细节
##### 核心示意图/框架图
![TaoAvatar method overview](https://pixelai-team.github.io/TaoAvatar/static/images/method_overview.png)
*图：TaoAvatar 方法。先重建 clothed SMPLX++ 与 Gaussian texture，再用 StyleUnet teacher 学形变，最后蒸馏到 MLP student 并加 blend shape 补偿。*

##### 核心流程伪代码
```python
# TaoAvatar training and deployment pipeline
template = reconstruct_smplx_plus_plus(multiview_sequence)
gaussians = bind_gaussians_to_template(template)

# Teacher: high-capacity StyleUnet deformation in texture space
for frame in multiview_sequence:
    pos_maps = rasterize_front_back_position_maps(template, frame.pose)
    delta_gaussian = styleunet_teacher(pos_maps, view_dir=frame.view)
    render = gaussian_renderer(gaussians.apply(delta_gaussian), frame.camera)
    loss_teacher = photometric_loss(render, frame.image) + perceptual_loss(render, frame.image)
    update_teacher(loss_teacher)

# Student: bake deformation into compact MLP field
for pose in sampled_poses:
    teacher_deform = teacher_predict(pose)
    student_deform = mlp_student(pose, template_vertices)
    loss_student = distill(student_deform, teacher_deform) + semantic_regularization()
    update_student(loss_student)

deploy(student=quantize_fp16(mlp_student), blend_shapes=learned_bs, renderer="3DGS")
```

##### 方法解读
全身 talking avatar 的部署难点比离线 avatar 更苛刻：既要脸、手、衣服细节真实，又要被语音、表情、手势和身体姿态实时驱动，还要能在 AR 设备上高帧率渲染。纯 StyleUnet/隐式网络能表达复杂非刚性形变，但太重；纯 MLP 或传统 skinning 很快，却难以处理宽松衣物、头发和高频纹理变化。

TaoAvatar 先构建 clothed SMPLX++ 模板，把人体控制能力保留下来。SMPLX 提供身体、手和表情的可控参数，扩展衣物模板负责更贴近真实外形，3D Gaussian Splatting 则提供显式、快速、可高质量 rasterize 的外观表示。每个 Gaussian 与模板绑定后，姿态变化可以通过模板和 deformation field 驱动。

Teacher 阶段使用 StyleUnet 学习复杂 pose-dependent deformation。论文把 T-pose 模板投影成 front/back position maps，并输入 view direction，输出 Gaussian 属性残差或 deformation maps。这个 teacher 能捕捉高频衣物细节，但参数量和推理开销不适合 Apple Vision Pro 等设备。

Baking 阶段是关键工程折中。TaoAvatar 将 teacher 预测的复杂动态形变蒸馏给 MLP student：
$$
\mathcal{L}_{distill}=\|\Delta_{\text{student}}(v,\theta)-\Delta_{\text{teacher}}(v,\theta)\|_1+\lambda\mathcal{L}_{sem}.
$$
学生网络在 mesh deformation field 上推理，速度快得多；但 MLP 容量有限，容易丢高频细节，因此再用可学习 Gaussian blend shapes 补偿残余外观变化。

部署侧还包括 FP16 量化、Gaussian sorting 的低精度优化、动画系统与渲染系统异步等策略。论文报告其在 Apple Vision Pro 等高分辨率立体设备上可达到 90 FPS。与 PERSONA 的单图个性化不同，TaoAvatar 依赖多视角序列建立高保真全身模板，目标更偏实时 AR talking avatar。

#### 🧪 练习题
```yaml
question: "TaoAvatar 为什么要先训练 StyleUnet teacher 再蒸馏到 MLP student？"
options:
  - "因为 StyleUnet 负责高质量学习复杂非刚性形变，MLP student 负责移动端实时推理"
  - "因为 MLP 不能接受姿态输入"
  - "因为 3DGS 无法渲染静态人体"
  - "因为 blend shapes 会完全替代所有网络"
answer: 0
explain: "teacher 具有更强表达能力但太重，baking/distillation 把其形变知识压到轻量 MLP，再用 blend shapes 补偿细节。"
```
