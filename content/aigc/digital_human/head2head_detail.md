### Head2Head — 基于视频的神经头部合成
```yaml
id: "head2head"
name: "Head2Head"
full_name: "视频神经头部合成 (Video-based Neural Head Synthesis)"
year: "2020"
org: "帝国理工"
paper_url: "https://arxiv.org/abs/2005.10954"
category: "talking_head"
parent: "fomm"
motivation: "神经网络条件视频合成提升质量"
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
