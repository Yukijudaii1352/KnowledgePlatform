### One-2-3-45（单图45秒重建, One-2-3-45）论文精读
```yaml
id: one2345
name: One-2-3-45
full_name: 单图45秒重建 (One-2-3-45)
year: 2023
organization: Stanford University
paper_url: https://arxiv.org/abs/2306.16928
category: feed_forward
parent: zero123
motivation: 多视图生成+快速网格重建
```

#### 📝 一句话总结
One-2-3-45 把 Zero-1-to-3 的单图新视角生成与快速多视图 3D 重建串联起来，用少量合成视图在约 45 秒内得到可用 textured mesh，避免每个物体长时间 SDS 优化。

#### 🎯 核心要点
- **流水线思路**：一张输入图先扩展成若干规范视角图，再由多视图重建模块生成 3D 网格。
- **继承 Zero123**：利用相机条件扩散补全未观测视角，解决单图背面缺失问题。
- **速度优势**：目标不是逐 prompt 优化高质量 NeRF，而是快速产出 mesh，适合交互式预览和资产草稿。
- **主要风险**：前端生成视图若不一致，后端重建会融合出扭曲几何或贴图错位。

#### 🔬 深入细节
**核心示意图/框架图**

![One-2-3-45 pipeline](https://ar5iv.labs.arxiv.org/html/2306.16928/assets/figures/pipeline.png)

One-2-3-45 的名字概括了流程：从 one image 到若干 novel views，再到 3D mesh，并强调快速完成。它没有像 DreamFusion 那样把每次渲染送入扩散模型做长时间优化，而是把扩散模型用于一次性补视角，然后交给重建网络或重建流程融合。

典型流程包括：先对输入图做前景分割和规范化；用 Zero-1-to-3 生成固定相机集合的多视图，例如左右后等视角；再用多视图条件的几何重建方法估计隐式表面或体素/SDF；最后用 marching cubes 等方式提取 mesh，并从输入与生成视图回投纹理。

**算法伪代码**

```python
input_img = remove_background_and_center(object_image)
views = {front: input_img}
for pose in canonical_target_poses:
    views[pose] = zero123_generate(input_img, rel_camera=pose)

recon_features = encode_multiview_images(views, camera_poses)
sdf_or_density = reconstruct_geometry(recon_features)
mesh = extract_mesh(sdf_or_density)
texture = project_or_optimize_texture(mesh, views, camera_poses)
return mesh, texture
```

从技术取舍看，One-2-3-45 把难题分解成两个较容易工程化的模块。扩散模型负责“想象不可见部分”，重建模块负责“把多视图约束变成 3D”。这种模块化很实用：可以替换更强的视图生成器，也可以替换更强的重建器；但误差也会级联，前一阶段的幻觉会被后一阶段当作观测。

相对优化式 text/image-to-3D，One-2-3-45 的重建速度是最大卖点；相对真正多视图摄影测量，它又能从单图启动。它适合快速生成粗网格，但对细节、背面真实性、透明/反光材料和非典型物体仍依赖 Zero123 先验的泛化能力。

#### 🧪 练习题
```yaml
questions:
  - type: pipeline
    prompt: "One-2-3-45 为什么比 DreamFusion 类方法快？"
    answer: "它先生成少量视图再前馈/快速重建 mesh，不需要对每个物体进行长时间 SDS 迭代优化。"
  - type: dependency
    prompt: "Zero-1-to-3 在 One-2-3-45 中承担什么角色？"
    answer: "它根据输入图和目标相机生成未观测视角，为后续多视图重建提供伪观测。"
  - type: limitation
    prompt: "如果生成的多视图互相矛盾，最终 mesh 会怎样？"
    answer: "重建模块会融合冲突证据，可能产生几何扭曲、重复结构或贴图错位。"
```
