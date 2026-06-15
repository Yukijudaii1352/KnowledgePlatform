### Hunyuan3D 3.0 - 混元3D 3.0 (Hunyuan3D 3.0)

```yaml
id: hunyuan3d_3
name: Hunyuan3D 3.0
full_name: 混元3D 3.0 (Hunyuan3D 3.0)
year: "2026.04"
org: Tencent
paper_url: https://github.com/tencent/Hunyuan3D-3
category: native_3d
parent: instant3d
motivation: 1536³原生分辨率36亿体素
```

#### 📝 一句话总结

Hunyuan3D 3.0 面向高分辨率原生 3D 资产生成，将图像/文本条件、稀疏 3D latent 扩散、超高分辨率几何解码和纹理生成组合成端到端 pipeline，目标是以 1536³ 级空间分辨率恢复更锐利的几何细节。

#### 🎯 核心要点

- 资料限制：manifest 中的 GitHub 链接当前不可访问，以下基于 manifest 的 1536³/36 亿体素信息和 Hunyuan3D 系列公开架构整理
- 采用两阶段或多阶段资产生成范式：先生成几何，再进行 UV/纹理/PBR 材质生成
- 高分辨率几何核心是稀疏空间查询，避免对完整 \(1536^3\) 体素网格做密集解码
- 使用 3D VAE/DiT 或 rectified-flow diffusion 在 compact latent 中建模形状，再由 SDF/occupancy decoder 输出 mesh
- 通过 coarse occupancy、octree/分块查询、marching cubes/DMC 和网格简化把高分辨率隐式场转为可用 mesh
- 纹理阶段使用多视角渲染条件、UV baking 和材质估计，输出可导入图形引擎的 textured mesh

#### 🔬 深入细节

##### 核心示意图

![Hunyuan3D 系列生成示意](https://raw.githubusercontent.com/Tencent-Hunyuan/Hunyuan3D-2/main/assets/images/teaser.jpg)
*图：Hunyuan3D 系列公开项目中的图像到 3D 资产生成示意。Hunyuan3D 3.0 指定仓库不可访问，因此这里使用同系列公开图表示整体 pipeline。*

##### 核心流程伪代码

```python
# Hunyuan3D 3.0 conceptual high-resolution pipeline
condition = encode_prompt_or_image(input_text, input_image)

# geometry latent generation
z = sample_noise(shape="sparse_3d_latents")
for t in denoising_schedule:
    v = geometry_dit(z, t, condition)
    z = rectified_flow_step(z, v, t)

# high-resolution sparse SDF querying
coarse_mesh, occupancy = decode_coarse_shape(z, resolution=512)
query_blocks = prune_empty_blocks(occupancy, target_resolution=1536)
sdf_values = {}
for block in query_blocks:
    points = sample_grid_points(block)
    sdf_values[block] = sdf_decoder(points, z, condition)

mesh = dual_marching_cubes(sdf_values)
mesh = simplify_and_repair(mesh)

# texture and material
uv = unwrap_uv(mesh)
views = render_geometry_condition(mesh, cameras="uniform")
pbr_maps = texture_model(input_image, views, condition)
asset = bake_textures(mesh, uv, pbr_maps)
```

##### 方法解读

Hunyuan3D 3.0 的 manifest 关键词是“1536³原生分辨率36亿体素”。这类系统的核心挑战不是单纯把网格采样分辨率调大，而是如何在超高空间分辨率下控制计算量。完整 \(1536^3\) 网格约有 36 亿个采样点，若对每个点都运行 dense decoder，显存和时间都会不可接受。因此合理设计通常会采用稀疏 occupancy、分块查询和层级剪枝，只在可能靠近表面的区域查询 SDF 或 occupancy。

几何生成通常先在低维 3D latent 中完成。输入图像或文本经过视觉/文本 encoder 得到条件 \(c\)，扩散 transformer 在 latent 空间学习从噪声到形状 token 的流：

$$z_t = (1-t)\epsilon + t z_1,\quad v_\theta(z_t, t, c) \approx z_1 - \epsilon$$

推理时从噪声出发沿 ODE 或采样调度更新 latent，得到描述整体形状的 \(z_1\)。这样全局结构在 compact latent 中建模，而不是直接在十亿级体素上生成。

高分辨率 decoder 的重点是局部查询。系统先解码一个粗 occupancy 或粗 mesh，确定物体表面可能出现的空间块；再把 1536³ 空间分成较小 block，只对靠近表面的 block 采样 SDF。若粗 occupancy 显示某个 block 完全为空或完全在物体内部，就可以跳过或用低成本规则处理。最终通过 marching cubes 或 dual marching cubes 提取 mesh，并做法线修复、去噪、简化和面数控制。

纹理阶段与几何阶段解耦。几何 mesh 先做 UV 展开，再从多个标准视角渲染法线、深度、位置或可见性条件。纹理模型根据输入参考图和这些几何条件生成多视角 albedo/roughness/metallic 或 RGB 贴图，最后通过 UV baking 合成到 mesh。相比只输出灰模，这一步使资产能进入实时渲染或 DCC 工具链。

与 Instant3D 等早期多视角提升方法相比，Hunyuan3D 3.0 的关键目标是减少 2D 多视角不一致和低分辨率几何带来的边缘钝化。高原生分辨率能恢复更细的孔洞、锐边和薄结构，但也会放大训练数据噪声和后处理成本，因此稀疏解码、网格修复和纹理可见性处理是生产级 pipeline 中不可缺少的部分。

#### 🧪 练习题

```yaml
question: "在 1536³ 级别的 3D 生成中，为什么通常不能对完整体素网格做密集 SDF 解码？"
options:
  - "因为 marching cubes 只能处理 512³ 网格"
  - "因为完整 1536³ 网格包含约 36 亿采样点，密集查询计算和显存开销过高，需要稀疏剪枝"
  - "因为文本条件无法用于高分辨率几何"
  - "因为 UV 展开必须先于几何生成"
answer: 1
explain: "超高分辨率空间的采样点数量巨大，实际系统会先估计粗占据区域，再只在表面附近分块查询 SDF 或 occupancy。"
```
