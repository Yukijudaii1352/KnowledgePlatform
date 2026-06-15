### LivePortrait — 高效隐式关键点肖像动画
```yaml
id: "liveportrait"
name: "LivePortrait"
full_name: "高效肖像动画 (Efficient Portrait Animation)"
year: "2024"
org: "快手"
paper_url: "https://arxiv.org/abs/2407.03168"
category: "talking_head"
parent: "megaportraits"
motivation: "拼接与重定向控制提升效率"
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
