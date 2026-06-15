### LRM：大规模单图到 NeRF 重建模型
```yaml
id: lrm
name: LRM
full_name: 大规模重建模型 (Large Reconstruction Model)
year: "2024"
org: Adobe Research
paper_url: https://arxiv.org/abs/2311.04400
category: feed_forward
parent: zero123
motivation: Transformer单图5秒预测NeRF
```

#### 📝 一句话总结
LRM 提出用大规模 Transformer 从单张图像直接预测 triplane-NeRF，解决传统单图 3D 重建需要逐实例优化、速度慢且泛化弱的问题。它把 3D 重建训练成前馈预测任务，使一次前向即可得到可体渲染的 3D 表示。

#### 🎯 核心要点
- 图像编码器：使用预训练 DINO 提取单图语义与局部视觉特征。
- Transformer 解码器：以 triplane token 为查询，通过 cross-attention 从图像特征中读取 3D 信息。
- Triplane-NeRF 表示：用三张正交特征平面表示 3D 场，MLP 输出颜色和密度。
- 端到端监督：对随机目标视角进行体渲染，用 RGB/感知损失训练。
- 大规模数据：在约百万级 3D 数据上训练，依靠数据规模获得类别泛化。

#### 🔬 深入细节
![LRM 总体架构](https://arxiv.org/html/2311.04400v2/x1.png)
*图：LRM 的 DINO 图像编码器、Transformer image-to-triplane 解码器和 triplane-NeRF 渲染流程。*

```python
# LRM 核心流程伪代码
image = preprocess(input_image)
image_tokens = DINO(image)

triplane_tokens = learnable_queries(shape=(3, Ht, Wt, C))
for block in transformer_decoder:
    triplane_tokens = block.self_attention(triplane_tokens)
    triplane_tokens = block.cross_attention(query=triplane_tokens, key_value=image_tokens)

triplanes = reshape_to_three_planes(triplane_tokens)
for ray in target_camera.rays:
    samples = sample_points(ray)
    feats = bilinear_sample_triplanes(triplanes, samples)
    sigma, color = mlp(feats, view_dir=ray.direction)
    pixel = volume_render(sigma, color)
```

LRM 的核心判断是：单图 3D 重建不一定要为每个物体单独优化 NeRF，也可以像图像生成模型一样通过大规模监督学习得到一个通用重建器。输入图像先由 DINO 编码，DINO 的预训练特征保留了物体类别、部件和轮廓信息，减少从零学习视觉语义的成本。

Transformer 解码器负责从 2D token 生成 3D triplane token。triplane 是三张互相正交的平面特征 \(T_{xy},T_{xz},T_{yz}\)。对任意 3D 点 \(\mathbf{x}=(x,y,z)\)，分别投影到三张平面采样特征并聚合：

$$
f(\mathbf{x}) =
\phi(T_{xy}(x,y), T_{xz}(x,z), T_{yz}(y,z))
$$

随后 MLP 预测该点的体密度和颜色：

$$
(\sigma, \mathbf{c}) = \text{MLP}(f(\mathbf{x}), \mathbf{d})
$$

其中 \(\mathbf{d}\) 是视线方向。最终通过 NeRF 体渲染把沿光线的颜色和密度积分成目标视角像素。训练时，模型看到输入视角，但监督来自同一 3D 资产的多个随机目标视角，因此它必须学习从可见面推断完整形体。

LRM 与 Zero-1-to-3 类方法的差异在于目标表示。Zero-1-to-3 主要生成新视角图像，仍需要额外多视图融合或优化；LRM 直接输出一个连续 3D 表示，可以从任意相机渲染。与 DreamFusion/Magic3D 这类优化式方法相比，LRM 把推理成本从几十分钟级逐实例优化降到一次前向加渲染。

> 💡 关键：LRM 的“Large”不只是模型大，更重要是用大规模 3D 数据把单图补全先验学进 Transformer。

局限也很明确：单张图像的不可见区域仍然依赖数据先验，复杂拓扑、透明材质、细长结构容易被平均化；triplane-NeRF 渲染质量高但导出高质量网格和纹理仍需后处理。

#### 🧪 练习题
```yaml
question: "LRM 中 Transformer 解码器的主要作用是什么？"
options:
  - "把单张图像直接压缩成文本提示词"
  - "把图像特征映射为 triplane 3D 表示"
  - "对每个测试物体执行 SDS 优化"
  - "只预测相机姿态而不预测几何"
answer: 1
explain: "LRM 使用 triplane token 通过 cross-attention 读取 DINO 图像特征，生成可由 NeRF MLP 查询和体渲染的 3D 表示。"
```
