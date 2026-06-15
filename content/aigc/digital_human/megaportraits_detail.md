### MegaPortraits — 百万像素级一张图神经头像
```yaml
id: "megaportraits"
name: "MegaPortraits"
full_name: "百万像素神经头像 (One-shot Megapixel Neural Head Avatars)"
year: "2022"
org: "Samsung AI"
paper_url: "https://arxiv.org/abs/2207.07621"
category: "talking_head"
parent: "head2head"
motivation: "交叉注意力机制实现百万像素级合成"
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
