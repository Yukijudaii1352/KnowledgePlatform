### Rodin Gen-2 - Rodin二代 (Rodin Gen-2)

```yaml
id: rodin_gen2
name: Rodin Gen-2
full_name: Rodin二代 (Rodin Gen-2)
year: "2026.04"
org: Microsoft
paper_url: https://microsoft.com/rodin
category: native_3d
parent: seed3d_2
motivation: 100亿参数四边形拓扑生成
```

#### 📝 一句话总结

Rodin Gen-2 面向生产级 text/image-to-3D 资产生成，以 100 亿参数级生成模型和 BANG 式部件分解/拓扑控制为核心，将多图条件、四边形 mesh、HD texture 和可编辑部件输出整合到商业化 3D pipeline。

#### 🎯 核心要点

- 资料限制：manifest 指向的 `microsoft.com/rodin` 当前不是稳定论文页，公开产品资料多以 Hyper3D/Rodin Gen-2 形式出现；以下按 manifest 与可公开访问产品说明整理
- 输入支持文本、单图和多图，多图模式用于约束同一物体的多视角一致性
- 生成目标是 production-ready asset，而不仅是隐式场预览，输出格式通常面向 GLB/mesh/texture 工作流
- manifest 强调 100 亿参数和四边形拓扑生成，说明模型重点从“能生成”转向“可编辑、可布线、可投产”
- BANG 式 part decomposition 支持部件级 refinement，使复杂资产能按功能区域局部修改
- 推理参数通常包含 mesh mode、poly count、HD texture、material、bounding box 或高质量包等控制项

#### 🔬 深入细节

##### 核心示意图

![Rodin Gen-2 产品示意](https://assets.runware.ai/og/hyper3d-rodin-gen-2.png)
*图：公开 API/产品页中的 Rodin Gen-2 示意图。由于没有可访问论文方法图，这里使用产品页图，并在下文给出概念级技术流程。*

##### 核心流程伪代码

```python
# Rodin Gen-2 conceptual production asset pipeline
cond = encode_conditions(
    text_prompt=prompt,
    images=multi_view_images,
    bbox=optional_bounding_boxes,
    material_mode=material_setting,
)

# Large 3D generator samples structured asset latent
z = sample_noise()
for t in denoising_or_autoregressive_steps:
    z = generator_10b.step(z, t, cond)

# BANG-style part decomposition and topology generation
parts = decompose_into_parts(z, cond)
quad_meshes = []
for part in parts:
    surface = decode_part_surface(part)
    quad_mesh = quad_remesh_or_generate(surface, target_poly_count)
    quad_meshes.append(local_refine(quad_mesh, cond))

mesh = assemble_parts(quad_meshes)
uv = unwrap_quad_mesh(mesh)
textures = generate_hd_textures(mesh, uv, cond)
asset = export_glb(mesh, textures, topology="quad")
```

##### 方法解读

Rodin Gen-2 的公开资料更接近产品/API 文档，而不是完整论文。根据 manifest 和可见产品能力，它的技术重点可以理解为：用更大的生成模型建模复杂 3D 资产，同时把输出从三角网格预览推进到可编辑、可纹理化、可控制面数和拓扑的资产。这里的“100亿参数四边形拓扑生成”指向两个关键方向：大模型容量和面向 DCC/游戏引擎的拓扑质量。

输入层支持文本和图像条件。文本 prompt 提供语义、风格、材质和结构描述；多图输入可提供不同视角，缓解单图中背面和遮挡区域的不确定性；bounding box 或类似控制项用于约束比例和空间占位。条件编码后进入 3D 生成器，生成器可以是扩散式 latent generator，也可以混合自回归结构，核心都是在结构化 3D latent 中采样资产。

与只输出点云、NeRF 或任意三角 mesh 的方法不同，Rodin Gen-2 更强调四边形 topology。四边形网格对后续编辑、绑定、细分曲面和 UV 展开更友好，但直接生成四边形拓扑比生成隐式表面更困难，因为它要求面流、边环和部件边界尽量符合物体结构。概念上，模型需要同时优化几何误差和拓扑可用性：

$$Q_{\text{asset}} =
\lambda_g Q_{\text{geometry}} +
\lambda_t Q_{\text{topology}} +
\lambda_m Q_{\text{material}} +
\lambda_a Q_{\text{alignment}}$$

其中 topology 项不仅关心面数，还关心四边形比例、非流形错误、部件边界、UV 友好度和局部细节是否被合理保留。

BANG 式部件分解可以看作把复杂资产拆成可局部生成和局部编辑的子结构。对于包含多个功能部件的物体，整体一次性生成容易出现融合、穿插或细节互相污染；先分解再组装可以让每个部件拥有更清晰的边界、材质和拓扑。Gen-2 Edit 等后续能力也依赖这种部件级表示，因为局部文本编辑需要知道“改哪里”以及“哪些区域不应被改动”。

纹理阶段通常在 mesh/UV 确定后进行。HD texture 模块根据 prompt、输入图和几何缓冲生成贴图，并按材质模式输出更适合渲染管线的颜色、粗糙度、金属度或法线信息。最终 GLB 或类似格式把 quad mesh、UV、纹理和材质打包，服务于产品可用性而非只展示渲染图。

与 Seed3D 2.0 的研究型 pipeline 相比，Rodin Gen-2 的公开信息更强调商业控制面：多图输入、mesh mode、poly count、HD texture、material 选项和高质量包。它的局限也来自资料透明度不足：没有公开论文时，具体网络结构、训练数据、损失函数和拓扑生成细节只能按产品能力与 3D 生成通用技术进行概念化解读。

#### 🧪 练习题

```yaml
question: "Rodin Gen-2 强调四边形拓扑生成的主要工程意义是什么？"
options:
  - "四边形网格天然比任何隐式场占用更少显存"
  - "四边形拓扑更适合 DCC 编辑、细分、绑定、UV 展开和生产级资产管线"
  - "四边形拓扑不需要纹理贴图"
  - "四边形网格可以完全避免多视角不一致"
answer: 1
explain: "生产资产不仅要形状像，还要可编辑、可布线、可贴图；四边形拓扑通常比任意三角网格更适合后续建模和引擎工作流。"
```
