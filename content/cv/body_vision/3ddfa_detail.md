### 3DDFA

```yaml
id: 3ddfa
name: 3DDFA
full_name: "3D对齐 (3D Dense Face Alignment)"
year: "2016"
org: "中科院"
paper_url: "http://openaccess.thecvf.com/content_cvpr_2016/html/Zhu_Face_Alignment_Across_CVPR_2016_paper.html"
category: "face"
parent: "deepface"
motivation: "拟合3DMM模型解决大角度人脸对齐问题"
```

#### 📝 一句话总结

3DDFA 将大姿态人脸对齐转化为 CNN 级联回归 3DMM 参数的问题，用 PNCC 特征和 WPDC 损失拟合稠密 3D 人脸模型，从根本上处理侧脸自遮挡和不可见关键点。

#### 🎯 核心要点

- **3DMM 稠密模型**：不直接回归稀疏 2D landmarks，而是拟合包含形状、表情、姿态的 3D morphable model
- **Cascaded CNN 回归**：每次根据当前参数生成 PNCC，与图像拼接后预测参数更新，迭代 3 次左右收敛
- **PNCC 特征**：Projected Normalized Coordinate Code 用颜色编码当前 3D 顶点在图像中的投影，提供几何反馈
- **WPDC 损失**：Weighted Parameter Distance Cost 按参数对最终顶点误差的影响自适应加权
- **Face Profiling 数据增强**：把中小姿态训练样本通过 3D 旋转合成大姿态侧脸，构建 300W-LP
- **可见/不可见 landmark 处理**：由拟合的稠密 3D 面自动推断 landmark 可见性，缓解侧脸标注歧义

#### 🔬 深入细节

![3DDFA 网络结构](https://ar5iv.labs.arxiv.org/html/1511.07212/assets/fig-overview.jpg)
*图：3DDFA 将 PNCC 与原图拼接输入级联 CNN，输出 234 维 3DMM 参数更新。*

```python
# 3DDFA 级联拟合伪代码
params = initialize_3dmm_params(face_box)
for stage in range(3):
    pncc = render_projected_normalized_coordinate_code(params)
    inp = concat_rgb_and_pncc(face_crop, pncc)   # 100 x 100 x 6
    delta = cnn_stage(inp)                       # pose + shape + expression update
    params = params + delta

mesh_3d = build_3dmm(params)
landmarks_2d = project_landmark_vertices(mesh_3d, params.pose)
visibility = zbuffer_visibility(mesh_3d)
```

**动机与背景。** 2D 人脸对齐模型默认 landmarks 都能在图像上看到，这在正脸和中等姿态下可行，但大侧脸时半张脸被自遮挡，很多语义点没有可见图像证据。多视角 2D 模型可以为每个姿态训练不同 landmarks 配置，但计算复杂且标注困难。3DDFA 的思路是用完整 3D 脸模型解释 2D 图像：即使某些点不可见，它们仍是 3D 面上的合法顶点。

**3DMM 参数化。** 3DDFA 使用 3D Morphable Model 表示脸形：

$$
S=\bar{S}+A_{\text{id}}\alpha_{\text{id}}+A_{\text{exp}}\alpha_{\text{exp}}
$$

其中 \(\bar{S}\) 是平均脸，\(\alpha_{\text{id}}\) 控制身份形状，\(\alpha_{\text{exp}}\) 控制表情。再通过弱透视投影得到图像平面坐标：

$$
P=s \cdot R \cdot S + t
$$

最终参数包含 6 维姿态、199 维形状和 29 维表情，共 234 维更新量。

**PNCC：让 CNN 知道当前拟合在哪里。** 单纯把图像送进 CNN 回归 3DMM 参数很难，因为网络不知道当前迭代的模型位置。PNCC 先把平均 3D 脸每个顶点的归一化坐标 \((x,y,z)\) 当作 RGB 颜色，再按当前参数投影到图像上。若当前 3D 模型和真实脸对齐，PNCC 上的颜色区域会落在正确的眼、鼻、嘴位置。把 RGB 图像和 PNCC 拼接后，CNN 可以学习“当前几何投影与图像纹理的错位”，从而预测参数更新。

**WPDC 损失。** 参数空间各维影响不同：同样数值误差，yaw 或 scale 对顶点投影影响远大于某个 PCA 系数。直接用 Parameter Distance Cost 会错误地等权优化；直接用 Vertex Distance Cost 更符合目标，但曲率病态，训练容易 zig-zag。WPDC 为每个参数估计重要性权重：

$$
\mathcal{L}_{\text{WPDC}}=(\Delta p-\Delta p^*)^\top W(\Delta p-\Delta p^*)
$$

权重来自“只把第 \(i\) 个参数替换成预测值时对顶点误差造成多大影响”。因此早期模型优先学姿态、尺度、平移等高影响参数，后期再细化形状和表情。

**Face Profiling。** 大姿态标注很难，尤其不可见 landmarks 需要猜测。3DDFA 先对已有中小姿态样本拟合 3D 深度，再旋转到更大 yaw，合成侧脸训练图，生成 300W-LP。这个增强策略让 CNN 在训练阶段看到足够多 profile appearance，同时保留由 3D 模型产生的完整 landmarks 和参数真值。

**与 MTCNN/RetinaFace 的区别。** MTCNN 输出 2D 框和五点 landmarks，适合识别前处理；RetinaFace 在检测器内加入五点和 3D dense 分支，但仍是检测优先。3DDFA 的核心任务是稠密 3D 对齐和大姿态 3DMM 拟合，因此能解释不可见点和完整脸形。

#### 🧪 练习题

```yaml
question: "3DDFA 中 PNCC 的作用是什么？"
options:
  - "替代 RGB 图像作为唯一输入"
  - "把当前 3DMM 投影位置编码成图像特征，为级联 CNN 提供几何反馈"
  - "计算人脸识别的 128 维 embedding"
  - "从音频中预测唇形"
answer: 1
explain: "PNCC 将 3D 顶点坐标按当前参数投影到图像上，使 CNN 能判断当前拟合与真实图像的错位并预测参数更新。"
```
