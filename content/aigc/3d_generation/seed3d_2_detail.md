### Seed3D 2.0 - 豆包3D 2.0 (Seed3D 2.0)

```yaml
id: seed3d_2
name: Seed3D 2.0
full_name: 豆包3D 2.0 (Seed3D 2.0)
year: "2026.04"
org: ByteDance
paper_url: https://www.bytedance.com/seed3d
category: native_3d
parent: hunyuan3d_3
motivation: DiT+URDF工业级资产输出
```

#### 📝 一句话总结

Seed3D 2.0 用 locality-aware VAE 与两阶段 coarse-to-fine DiT 提升几何精度，再用统一 PBR 纹理模型和仿真就绪模块输出可分解、可铰接、可导出 URDF 的工业级 3D 资产。

#### 🎯 核心要点

- 几何采用 VecSet 范式：3D VAE 将连续形状压缩为 latent token，decoder 通过 SDF 查询和 DMC 提取 mesh
- locality-aware latent aggregation 将容量集中在复杂几何区域，并用稀疏路由降低 SDF cross-attention 解码成本
- Seed3D-DiT 使用 rectified-flow diffusion transformer，两阶段生成：Stage 1 生成粗结构，Stage 2 依据粗形状 prior 和 voxelized positional encoding 恢复锐边与高频细节
- 纹理从 Seed3D 1.0 的级联 RGB/PBR 流程升级为统一 PBR 模型，直接生成 albedo 与 metallic-roughness
- PBR 模型使用 MoE 扩容和 VLM material prior，缓解未知光照下材质分解的歧义
- 扩展 scene layout planning、part-aware generation、articulation generation，并导出包含 joint、axis、range、mass/friction 的 URDF 等仿真格式

#### 🔬 深入细节

##### 核心示意图

![Seed3D 2.0 几何生成流程](https://arxiv.org/html/2605.13862v1/x2.png)
*图：Seed3D 2.0 的两阶段几何生成 pipeline，Stage 1 建立粗形状，Stage 2 利用粗形状和位置先验恢复高频细节。*

##### 算法伪代码

```python
# Seed3D 2.0 image-to-asset pipeline
image_feat = image_encoder(input_image)

# Stage 1: coarse geometry
z1 = rectified_flow_sample(stage1_dit, condition=image_feat)
coarse_mesh = vae.decode_to_mesh(z1, grid_resolution=512)

# Stage 2: geometry refinement
coarse_latent = vae.encode(coarse_mesh)
occupancy = voxelize_and_dilate(coarse_mesh)
pos_enc = voxelized_positional_encoding(occupancy)
z2 = rectified_flow_sample(
    stage2_dit,
    condition=[image_feat, partially_diffused(coarse_latent), pos_enc],
)
mesh = vae.decode_to_mesh_sparse(z2, target_resolution=1536)
mesh = qem_simplify(mesh)
uv = unwrap(mesh)

# Unified PBR texture
geom_views = render_geometry_buffers(mesh)
material_text = vlm_describe_material(input_image)
pbr = pbr_dit_moe(input_image, geom_views, material_text)
asset = bake_uv_textures(mesh, uv, pbr.albedo, pbr.metallic_roughness)

# Simulation-ready export
parts = partseg(asset.mesh)
part_meshes = part_dit_complete(parts, asset)
articulation = infer_joints_with_vlm_and_video_prior(part_meshes)
export_urdf(part_meshes, articulation, asset.materials)
```

##### 方法解读

Seed3D 2.0 先解决 Seed3D 1.0 的质量缺口。单阶段生成模型需要同时学全局拓扑和局部锐边，容易在复杂结构上过平滑。Seed3D 2.0 将几何分成两步：第一阶段只负责可靠地生成整体形状 latent，第二阶段拿第一阶段输出作为锚点，专门恢复边缘、曲率变化和细表面结构。

3D VAE 采用双分支 perceiver encoder-decoder，把带位置、法线和锐边采样的点云压缩成 VecSet latent。局部感知聚合的直觉是，空间邻近 token 往往包含冗余信息，而几何复杂区域更需要表达容量。因此 encoder 把 token 容量集中到复杂区域；decoder 查询 SDF 时，也不让每个空间点 attend 全部 latent，而是通过 content-adaptive sparse routing 只关注空间相关 token，降低高分辨率 SDF 解码开销。

两阶段 DiT 使用 rectified flow。在 latent 空间中，可把噪声 \(\epsilon\) 与真实 latent \(z_1\) 的插值写作：

$$z_t = (1-t)\epsilon + t z_1,\quad v_\theta(z_t,t,c) \approx z_1-\epsilon$$

Stage 1 的条件主要来自输入图像，目标是得到全局拓扑正确的 coarse latent。Stage 2 则额外接收 partially diffused Stage 1 latent 和 coarse mesh voxelized positional encoding，使模型知道局部细节应依附在哪些空间位置。这样 Stage 2 不必重新发明整体结构，可以把模型容量集中在高频几何上。

纹理部分从级联流程变成统一 PBR 生成。旧流程若先生成多视角 RGB，再估计 albedo/roughness/metallic，误差会层层传递。Seed3D 2.0 的统一模型直接以参考图、几何渲染条件和 VLM 材质描述为条件，生成多视角 albedo 与 MR 图。MoE 用稀疏 expert routing 扩大容量，避免高分辨率纹理带来线性增长的计算量；VLM material prior 则帮助区分“高光来自照明”还是“表面真实金属/粗糙度属性”。

更重要的是，Seed3D 2.0 将资产生成推进到仿真可用。scene layout planning 根据文本、图像或视频推断多物体空间布局；part-aware pipeline 先用 PartSeg 分割功能部件，再用 PartDiT 根据局部点云、全局 shape latent 和图像外观补全部件 mesh；articulation generation 则结合 VLM 语义、几何候选轴和视频运动先验推断 joint type、axis 与 motion range。最终资产不仅是静态 mesh，还能带着层级部件和关节参数导出为 URDF。

#### 🧪 练习题

```yaml
question: "Seed3D 2.0 的 Stage 2 几何 DiT 为什么要使用 Stage 1 粗形状 prior 和 voxelized positional encoding？"
options:
  - "为了完全跳过 VAE 解码"
  - "为了让 Stage 2 锚定全局结构，把优化重点放在锐边和高频细节恢复上"
  - "为了把纹理图直接转换成 URDF"
  - "为了避免输入图像参与条件控制"
answer: 1
explain: "Stage 1 已提供可靠粗拓扑，Stage 2 借助粗形状和空间位置先验专注局部细节，从而缓解单阶段模型在全局与高频之间的冲突。"
```
