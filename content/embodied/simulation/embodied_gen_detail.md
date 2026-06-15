### EmbodiedGen生成式3D世界引擎 (EmbodiedGen)

```yaml
id: embodied_gen
name: EmbodiedGen
full_name: EmbodiedGen生成式3D世界引擎 (EmbodiedGen)
year: '2025.06'
org: ByteDance
paper_url: https://arxiv.org/abs/2506.10600
category: generative
parent: genesis
motivation: 从单张图片或文本生成交互式3D世界
```

#### 📝 一句话总结
EmbodiedGen 提出面向具身智能的生成式 3D 世界工具包，从图像或文本生成带真实尺度、物理属性、URDF、mesh/3DGS 表示和场景布局的交互式资产，解决传统 3D 资产昂贵、缺物理语义、难直接进仿真的问题。

#### 🎯 核心要点
- 论文公开作者单位主要为 Horizon Robotics、GigaAI、SJTU 等；YAML 中 `org: ByteDance` 按清单原样保留。
- 包含六个模块：Image-to-3D、Text-to-3D、Texture Generation、Articulated Object Generation、Scene Generation、Layout Generation。
- Image-to-3D 从单图生成 mesh 与 3DGS，再进行质量检查、物理属性恢复、真实尺度估计和 URDF 转换。
- Text-to-3D 采用 text-to-image → image-to-3D 两阶段设计，便于在 2D 阶段提前过滤语义/分割失败样本。
- Texture Generation 使用 GeoLifter 将几何条件注入扩散模型，生成多视角一致、可控风格的 2K UV 纹理。
- Articulated Object Generation 使用 dual-state image pair 与图推理生成关节对象结构，支持抽屉、柜门、家电等可操作资产。
- Scene Generation 从文本或图像生成 panorama，再恢复 mesh/3DGS、尺度和坐标，用于构建可交互 3D 场景。
- RoboSplatter 将 3DGS 渲染接入 MuJoCo/Isaac Lab 等物理仿真，提高视觉真实感。

#### 🔬 深入细节
![EmbodiedGen 框架图](https://arxiv.org/html/2506.10600v1/x2.png)
*图：EmbodiedGen 可从真实图像创建 digital twin，也可从任务描述自动生成场景布局、3D 物体资产和可交互世界。*

```python
# EmbodiedGen 从文本/图像到仿真资产的伪代码
def generate_asset(input):
    if input.type == "image":
        mesh, gs = trellis_image_to_3d(input.image)
    else:
        image = text_to_image(input.prompt)
        if not semantic_and_segmentation_check(image):
            image = retry_text_to_image(input.prompt)
        mesh, gs = trellis_image_to_3d(image)

    if not quality_check(mesh, image, checks=["aesthetic", "segmentation", "geometry"]):
        return regenerate_with_new_seed(input)

    scale = physics_expert.estimate_real_scale(mesh, context=input.context)
    mass, friction, category = physics_expert.estimate_physical_properties(mesh)
    texture = geolifter_texture(mesh, prompt=input.texture_prompt)
    urdf = convert_to_urdf(mesh, texture, scale, mass, friction)
    return {"mesh": mesh, "3dgs": gs, "urdf": urdf}

scene = generate_scene(prompt_or_image)
assets = [generate_asset(obj) for obj in scene.objects]
export_to_simulator(scene, assets, target=["MuJoCo", "IsaacLab", "SAPIEN"])
```

EmbodiedGen 的动机是具身智能数据很难像互联网文本/图像那样无成本扩展。机器人需要与物体接触、碰撞、抓取和导航，因此 3D 资产不仅要好看，还要有真实尺度、闭合几何、质量、摩擦、关节结构和仿真器可读格式。许多图形学 3D 资产缺少这些属性，直接导入仿真会导致碰撞不准、物体漂浮、尺度错误或无法交互。

Image-to-3D 模块以 Trellis 等开源 3D 生成模型为基础，生成 mesh 和 3DGS 双表示。EmbodiedGen 在其后增加 robotics-specific 后处理：AestheticChecker 检查纹理质量，ImageSegChecker 检查前景分割，MeshGeoChecker 检查几何完整性和合理性；失败样本会调整设置和 seed 后重试。通过 GPT-4o/Qwen 构建的 physics expert agent 估计真实高度、质量、摩擦系数和类别，并把资产转换成 URDF。

Text-to-3D 采用两阶段路线，而不是端到端直接文本生成 3D。先 text-to-image，再复用统一 Image-to-3D 服务。这样可以在 2D 阶段用质量检查提前淘汰语义不符或分割困难样本，减少昂贵 3D 生成浪费，也让系统能持续受益于新的 text-to-image 和 image-to-3D 模型。

纹理生成模块 GeoLifter 将 normal map、position map、mask 等几何条件注入文本到图像扩散模型，生成六视角一致纹理。随后使用去光照和超分辨率，再通过多视角 back-projection 合成 UV map。论文中的纹理融合可以概括为对每个视角按法线朝向、边缘遮挡和视角置信度加权：

$$
T(u,v)=\frac{\sum_i C_i(u,v) I_i(u,v)}{\sum_i C_i(u,v)+\epsilon}
$$

其中 \(C_i\) 包含可见性、法线夹角、边缘过滤和视角权重。

Articulated Object Generation 解决柜门、抽屉、家电等可动对象。论文使用 DIPO，从 resting/open 双状态图像对中推断部件、连接关系和运动结构，并用 chain-of-thought 图推理生成 articulation graph。Scene Generation 则从文本或图像得到 panorama，再用 Pano2Room 风格流程恢复 mesh/3DGS，经过 PanoSelector、inpainting、mesh repair、super-resolution、scale alignment，得到尺度一致的场景背景。

与 Genesis 的关系可以理解为：EmbodiedGen 更偏“生成仿真资产和世界”，Genesis 更偏“执行多物理仿真和渲染”。EmbodiedGen 输出的 URDF/mesh/3DGS 资产可导入 MuJoCo、Isaac Lab、OpenAI Gym、SAPIEN 等平台；若与 Genesis/Isaac/MuJoCo 这类高吞吐仿真器结合，就能形成从文本/单图到交互式仿真任务的数据生成闭环。

> 💡 关键：EmbodiedGen 的真正贡献不是单纯 3D 生成，而是把生成结果补齐成“可仿真、可交互、带物理属性和真实尺度”的机器人资产。

#### 🧪 练习题
```yaml
question: "EmbodiedGen 为什么要把生成资产转换为 URDF 并恢复真实尺度和物理属性？"
options:
  - "为了让资产只适合静态图片展示"
  - "为了让生成的 3D 物体能直接进入物理仿真器进行碰撞、控制和任务评估"
  - "为了删除 mesh 和 3DGS 表示"
  - "为了避免任何质量检查"
answer: 1
explain: "机器人仿真需要尺度、质量、摩擦、碰撞几何和关节等信息；URDF/物理属性使生成资产可交互、可训练、可评估。"
```
