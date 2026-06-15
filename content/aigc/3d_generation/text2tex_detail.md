### Text2Tex：渐进式深度感知纹理合成
```yaml
id: text2tex
name: Text2Tex
full_name: 文本转纹理 (Text2Tex)
year: "2023"
org: Stanford University
paper_url: https://arxiv.org/abs/2303.11396
category: texture
parent: texture
motivation: 渐进式策略确保全局一致性
```

#### 📝 一句话总结
Text2Tex 提出用深度感知 inpainting 扩散模型渐进式生成局部纹理，并自动选择下一最佳视角，解决文本到 3D 纹理中局部清晰但全局不一致的问题。它把每个可见 texel 的生成状态编码成 mask，引导扩散模型只更新需要补全或修复的区域。

#### 🎯 核心要点
- 输入为给定 mesh 和文本 prompt，目标是生成高分辨率 texture map。
- 使用预训练 depth-aware diffusion / ControlNet depth inpainting 作为 2D 纹理先验。
- 动态 generation mask：标记当前视角中哪些 texel 是新区域、已生成区域或需更新区域。
- 渐进式视角策略：自动选择下一视角以最大化未覆盖纹理区域并减少拉伸伪影。
- 生成加细化两阶段：先覆盖主要表面，再用较低强度更新改善接缝和一致性。

#### 🔬 深入细节
![Text2Tex 方法概览](https://raw.githubusercontent.com/daveredrum/Text2Tex/main/docs/static/teaser/overview.jpg)
*图：Text2Tex 仓库中的概览图，展示从多视角渲染、深度感知 inpainting 到纹理回投影的渐进流程。*

```python
# Text2Tex 核心流程伪代码
mesh = normalize_mesh(input_mesh)
uv_texture = init_texture(mesh)
status = init_texel_status(mesh)  # unseen / generated / update

view_queue = plan_initial_views(mesh)
for view in view_queue:
    rgb, depth, texel_ids = render(mesh, uv_texture, view)
    mask = build_generation_mask(texel_ids, status)

    partial_texture = depth_aware_inpaint(
        prompt=prompt,
        image=rgb,
        depth=depth,
        mask=mask,
        strength=choose_strength(mask),
    )

    uv_texture = back_project(partial_texture, texel_ids, uv_texture)
    status = update_status(status, texel_ids)
    view_queue = select_next_best_view(mesh, status)
```

Text2Tex 与 TEXTure 共享“渲染视图到 2D、扩散生成、回投影到 UV”的基本思路，但更强调渐进式策略和视角选择。问题的核心是：3D 纹理图是一个全局对象，而 2D 扩散模型一次只看当前渲染视图。如果视角顺序和更新区域控制不好，后画的区域会覆盖前画的语义，或者在斜视角产生拉伸纹理。

方法首先渲染当前 mesh 的 RGB、depth 和 texel 可见性。depth 条件让扩散模型知道物体轮廓和局部几何，inpainting mask 则指定新生成区域。对当前视图 \(v\)，扩散模型近似学习：

$$
I_v^{new} = D_{\theta}(I_v^{old}, Z_v, M_v, y)
$$

其中 \(Z_v\) 是深度图，\(M_v\) 是 generation mask，\(y\) 是文本 prompt。生成结果再根据渲染时记录的 texel-id 或 UV 坐标投影回纹理图。

generation mask 是保持一致性的关键。未见过的 texel 使用高强度生成；已生成但当前可见的 texel作为上下文保留；边界和低质量区域可以低强度更新。这样模型每次“补一块”而不是“重画一切”，全局 texture map 会逐步收敛。

自动视角选择进一步减少人为设定。下一视角通常优先覆盖最多未生成 texel，并避免极端斜角导致纹理拉伸。可以把目标写成：

$$
v^* = \arg\max_v \left(\text{coverage}(v) - \lambda \text{distortion}(v)\right)
$$

> 💡 关键：Text2Tex 的贡献不是单纯调用 ControlNet，而是用 texel 状态、mask 和视角策略把 2D inpainting 组织成 3D 一致的纹理合成过程。

相对 TEXTure，Text2Tex 的渐进式策略更系统地处理“先覆盖、再更新”的流程；相对 GAN 或 CLIP 优化纹理方法，它利用大规模 2D 扩散先验生成更丰富的语义细节。局限是它依赖已有 mesh 和 UV 参数化，且对不可见内凹区域仍需要额外视角或后处理。

#### 🧪 练习题
```yaml
question: "Text2Tex 中自动视角选择主要为了什么？"
options:
  - "最大化新 texel 覆盖并减少拉伸伪影"
  - "让所有视角都使用同一个相机内参"
  - "完全跳过纹理回投影"
  - "把 3D mesh 转换成文本"
answer: 0
explain: "Text2Tex 渐进式生成纹理，需要优先选择能覆盖未生成区域且投影失真较小的视角。"
```
