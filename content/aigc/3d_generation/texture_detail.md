### TEXTure：基于深度扩散的迭代式 3D 纹理生成
```yaml
id: texture
name: TEXTure
full_name: 文本纹理 (TEXTure)
year: "2023"
org: Technion
paper_url: https://arxiv.org/abs/2302.01721
category: texture
parent: —
motivation: 迭代投影涂色生成无缝纹理
```

#### 📝 一句话总结
TEXTure 提出从不同视角迭代渲染、扩散生成、再投影到 mesh 的文本引导纹理方法，解决 2D 扩散模型直接用于 3D 纹理时跨视角不一致和接缝明显的问题。它用动态 trimap 区分已完成、待补全和待细化区域，使每次生成只更新需要更新的可见 texel。

#### 🎯 核心要点
- 输入为已有 3D mesh 和文本提示，不负责生成几何。
- 使用预训练 depth-to-image 扩散模型，在渲染视图上生成纹理细节。
- 动态 trimap：把当前视图划分为 keep、refine、generate 三种状态。
- 迭代投影：每个视角生成后投影回 UV/纹理图，并更新 texel 可见状态。
- 支持纹理生成、编辑、迁移和局部 scribble 控制。

#### 🔬 深入细节
![TEXTure 纹理流程图](https://texturepaper.github.io/TEXTurePaper/static/figures/texturing_figure.png)
*图：TEXTure 项目页展示的迭代式 texturing pipeline，从渲染视图生成纹理并投影回 3D mesh。*

```python
# TEXTure 核心流程伪代码
mesh = load_mesh()
texture_map = initialize_blank_texture()
texel_state = initialize_state(mesh)  # unpainted / painted / refine

for camera in planned_view_sequence:
    depth, visible_texels = render_depth(mesh, camera)
    current_rgb = render_texture(mesh, texture_map, camera)
    trimap = build_trimap(visible_texels, texel_state)

    generated_view = depth_to_image_diffusion(
        prompt=text_prompt,
        depth=depth,
        image=current_rgb,
        mask=trimap.generate_or_refine,
    )

    texture_map = project_to_uv(texture_map, generated_view, visible_texels, trimap)
    texel_state = update_texel_state(texel_state, visible_texels)
```

TEXTure 的前提是几何已经存在，任务是给 mesh 生成符合文本描述的纹理。直接让 2D 扩散模型对每个视角独立生成会导致严重不一致：同一个 texel 在不同视角可能被画成不同颜色，边界处也容易出现接缝。TEXTure 的核心是让 2D 生成结果不断回写到统一 texture map，使后续视角能看到之前已画的内容。

动态 trimap 是方法关键。对当前渲染视图中的像素，系统根据对应 texel 的历史状态分为三类：已完成区域尽量保持，边界或低置信区域允许细化，从未绘制区域由扩散模型补全。这样扩散模型不是每次重画整张图，而是在已有纹理的上下文中做受控 inpainting。

可以把每次更新写成：

$$
T^{k+1} = \Pi^{-1}_{c_k}\left(
D_{\theta}(R(T^k,c_k), \text{Depth}(M,c_k), m_k, y)
\right)
$$

其中 \(T^k\) 是当前纹理图，\(R\) 是渲染，\(D_{\theta}\) 是 depth-to-image 扩散模型，\(m_k\) 是 trimap/mask，\(\Pi^{-1}_{c_k}\) 表示从当前视角投影回 UV。

> 💡 关键：TEXTure 用 3D texture map 作为跨视角记忆，用 trimap 控制哪些区域可改，从而把 2D 扩散模型变成 3D 一致的纹理生成器。

与 CLIP 优化式纹理方法相比，TEXTure 直接利用扩散模型的图像先验，细节更丰富；与一次性 UV 生成相比，迭代视角投影更容易处理遮挡和复杂几何。但它仍依赖 mesh UV 和渲染质量，深凹区域、不可见区域或极细结构可能需要更多视角和后处理。

#### 🧪 练习题
```yaml
question: "TEXTure 中 trimap 的主要作用是什么？"
options:
  - "把 mesh 自动转换成点云"
  - "区分保留、细化和新生成区域，控制扩散模型的局部更新"
  - "替代深度图作为扩散条件"
  - "只用于压缩最终纹理文件"
answer: 1
explain: "trimap 告诉扩散模型哪些像素应保持、哪些应细化、哪些需要新生成，从而降低跨视角不一致和接缝。"
```
