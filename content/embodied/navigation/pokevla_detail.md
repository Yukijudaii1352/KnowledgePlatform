### PokeVLA — 轻量几何对齐VLA (Lightweight Geometry-Aligned VLA)

```yaml
id: pokevla
name: PokeVLA
full_name: "轻量几何对齐VLA (Lightweight Geometry-Aligned VLA)"
year: "2026"
org: "arXiv"
paper_url: "https://arxiv.org/abs/2603.pokevla"
category: "vla_model"
parent: "openvla"
motivation: "1.22B轻量SEG几何对齐VLA"
```

#### 📝 一句话总结

PokeVLA 提出 1.22B 轻量 VLA，通过目标感知语义分割、多视角几何对齐和动作专家，把小模型做成更适合真实机器人部署的几何感知控制策略。

#### 🎯 核心要点

- YAML 中 `https://arxiv.org/abs/2603.pokevla` 疑似占位符；可访问公开论文为 arXiv:2604.20834，项目页为 `https://getterupper.github.io/PokeVLA`。
- 模型规模约 1.22B，目标是 pocket-sized VLA，在资源受限硬件上减少推理成本。
- 第一阶段预训练 PokeVLM，使用约 2.4M 多模态 embodied 样本学习空间 grounding、affordance 和 embodied reasoning。
- 第二阶段 VL-action post-training 加入目标感知多视角语义学习、几何对齐模块和 action query/action expert。
- 视觉编码结合 SigLIP、DINOv2、SAM-like dense features，并通过 VGGT 等几何基础模型对齐 wrist/base 多视角。
- 在 LIBERO-Plus、跨任务迁移和真实 xArm7 双 RealSense 场景中展示优于 OpenVLA-OFT/VLA-Adapter 的泛化表现。

#### 🔬 深入细节

![PokeVLA 架构图](https://getterupper.github.io/PokeVLA/static/images/main.png)
*图：PokeVLA 将紧凑 VLM、SEG token、多视角几何对齐和动作查询结合，形成轻量 VLA 控制器。*

```python
# PokeVLA 两阶段训练与推理伪代码
def pretrain_pokevlm(batch):
    image_feat = siglip_dinov2_encoder(batch.images)
    text_feat = language_encoder(batch.text)
    seg_token = predict_seg_token(image_feat, text_feat)
    loss = vlm_loss(image_feat, text_feat) + grounding_loss(seg_token, batch.masks)
    update(pokevlm, loss)

def posttrain_action(batch):
    base_feat = pokevlm.encode(batch.multi_view_images, batch.instruction)
    geom_feat = geometry_align(base_feat, batch.camera_params)  # wrist/base 多视角对齐
    seg_feat = goal_aware_segmentation(base_feat, batch.goal)
    action_queries = init_action_queries(horizon=H)
    pred_actions = action_expert(action_queries, geom_feat, seg_feat, batch.proprio)
    loss = action_loss(pred_actions, batch.action_chunk)
    update(pokevla, loss)
```

PokeVLA 的动机是对 OpenVLA 系列做“轻量化但不弱化几何”。大模型 VLA 有较强语义能力，但推理成本高；小模型若只压缩参数，又容易丢失抓取/放置所需的空间细节。PokeVLA 因此把问题拆成两个阶段：先训练紧凑 PokeVLM 保留 embodied 语义，再在动作阶段显式加入 segmentation 和 geometry alignment。

其目标感知分割机制可以理解为让语言目标 \(\ell\) 选择图像中的可操作区域。若视觉特征为 \(F\)，目标 token 为 \(h_\ell\)，则 SEG token 产生 mask：

$$
M = \sigma(\phi_{\text{seg}}(F, h_\ell)),
$$

动作头不只看全局图像 token，还看 \(M\) 指向的物体/区域。这对“拿红色杯子而不是蓝色杯子”“按右侧按钮”等目标歧义任务尤其重要。

多视角几何对齐解决的是 wrist camera 与 base camera 的坐标不一致问题。PokeVLA 借助几何基础模型估计跨视角的空间对应，将不同相机特征投到更一致的几何空间：

$$
\tilde{F}^{v} = \mathrm{Align}(F^{v}, \Pi^{v}, D^{v}),\quad
F_{\text{geo}}=\mathrm{Fuse}_{v=1}^{V}(\tilde{F}^{v}),
$$

其中 \(\Pi^v\) 表示相机投影/位姿信息，\(D^v\) 是深度或几何先验。这样 action expert 看到的是跨视角一致的操作目标，而不是互相割裂的 2D patch。

与 OpenVLA-OFT 相比，PokeVLA 不只是换动作头或损失，而是在轻量模型里显式补上“看哪里”和“空间如何对齐”。与纯 diffusion/flow action model 相比，它更强调视觉 grounding 和几何结构先验。论文结果显示，这种设计在模型规模较小的情况下仍能保持较强的 LIBERO-Plus 与真实机器人迁移能力。

> ⚠️ 注意：原 YAML `paper_url` 疑似占位符；本精读依据可访问的 arXiv:2604.20834 与项目页整理，YAML 中保留原始链接以满足清单一致性。

#### 🧪 练习题

```yaml
question: "PokeVLA 在轻量化之外最强调的技术设计是什么？"
options:
  - "完全删除视觉模块，只保留语言提示"
  - "目标感知语义分割和多视角几何对齐"
  - "用 PDDL 规划器替代所有动作学习"
  - "只在单摄像头、单任务环境中训练"
answer: 1
explain: "PokeVLA 通过 SEG token 和几何对齐模块弥补小模型空间感知能力，使动作专家更可靠地定位目标和融合多视角。"
```
