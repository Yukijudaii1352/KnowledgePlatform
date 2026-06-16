### DrivePI — 空间感知 4D MLLM 自动驾驶统一框架

```yaml
id: drivepi
name: DrivePI
year: '2026'
category: frontier_2026
institution: —
paper: CVPR 2026
motivation: 4D多模态自动驾驶
parent: —
description: 空间感知的4D多模态大模型，统一自动驾驶的感知、预测与规划，实现端到端闭环控制。
topic_id: visual_language_model
yaml_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/visual_language_model.yaml
output_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/visual_language_model/drivepi_detail.md
```

#### 📝 一句话总结

DrivePI 提出空间感知 4D MLLM，把 LiDAR 点云、多视角图像和语言指令统一到可训练的 VLA 框架中，并并行输出文本理解、3D occupancy、occupancy flow 和规划动作，解决 VLA 模型缺少细粒度 3D 中间结果、VA 模型缺少语言交互的问题。

#### 🎯 核心要点

- 统一 VLA/VA 范式：同时保留 VLA 的语言交互能力和 VA 模型的精细 3D 感知、预测、规划能力
- 多模态输入：融合 nuScenes 风格的 6 路多视角图像、LiDAR 点云和文本指令，由多模态视觉编码器转成 BEV latent feature
- 空间投影器：将 \(F_{bev}\in\mathbb{R}^{H\times W\times C}\) patchify 成 \(K\times K\) 局部块，再用 cross-attention 压缩为 MLLM 可消费的 vision tokens
- 0.5B MLLM 骨干：论文使用 0.5B Qwen2.5 作为 MLLM backbone，证明小型语言模型也可承载精细 4D 自动驾驶任务
- 四个任务头：text head 自回归回答场景问题，3D occupancy head 输出体素占据，occupancy flow head 预测动态流，action diffusion head 输出轨迹规划
- 数据引擎：用 InternVL3-78B 生成前/后视角描述，再基于 occupancy、flow、未来轨迹标注生成 text-occupancy、text-flow 和 text-planning QA
- 联合优化：总损失由 \(L_{llm}\)、\(L_{occ}\)、\(L_{flow}\)、\(L_{action}\) 加权求和，所有任务端到端共同训练
- 评测覆盖：在 nuScenes、nuScenes-QA、OpenOcc、Occ3D 上评估理解、3D 占据、占据流和规划，报告优于 VLA 与专用 VA 基线

#### 🔬 深入细节

##### 核心示意图

![DrivePI 框架图](https://arxiv.org/html/2512.12799v1/sec/figures/framework.png)
*图：DrivePI 先把多视角图像与 LiDAR 点云编码为 BEV 表示，经 spatial projector 映射为视觉 token，再由 MLLM 和四类任务头并行完成理解、3D perception、prediction 与 planning。*

![DrivePI 数据引擎](https://arxiv.org/html/2512.12799v1/x2.png)
*图：DrivePI 的多阶段数据管线。先生成前后视角 caption，再构造 4D spatial QA 与 planning reasoning QA，使语言模型学习 occupancy、flow 和规划相关空间知识。*

公开来源：CVPR OpenAccess `https://openaccess.thecvf.com/content/CVPR2026/html/Liu_DrivePI_Spatial-aware_4D_MLLM_for_Unified_Autonomous_Driving_Understanding_Perception_CVPR_2026_paper.html`，论文 PDF `https://openaccess.thecvf.com/content/CVPR2026/papers/Liu_DrivePI_Spatial-aware_4D_MLLM_for_Unified_Autonomous_Driving_Understanding_Perception_CVPR_2026_paper.pdf`，arXiv `https://arxiv.org/abs/2512.12799`。

##### 核心流程伪代码

```python
# DrivePI: spatial-aware 4D MLLM for autonomous driving

def spatial_projector(F_bev, patch_size, llm_dim):
    # F_bev: [H, W, C], usually much denser than language-token budget allows
    patches = patchify(F_bev, size=(patch_size, patch_size))  # [N, K*K, C]
    pooled = mean_pool(patches, dim=1, keepdim=True)           # [N, 1, C]

    # Use pooled token as query, local patch tokens as key/value.
    local = cross_attention(query=pooled, key=patches, value=patches)
    vision_tokens = linear(local.squeeze(dim=1), out_dim=llm_dim)  # [N, C_l]
    return vision_tokens

def drivepi_forward(multiview_images, lidar_points, text_prompt, labels):
    F_bev = multimodal_vision_encoder(multiview_images, lidar_points)
    vision_tokens = spatial_projector(F_bev, patch_size=K, llm_dim=C_l)
    text_tokens = tokenizer(text_prompt)

    hidden = qwen25_mllm(tokens=[vision_tokens, text_tokens], trainable=True)

    text_logits = text_head(hidden)                 # scene understanding / QA
    occ_logits = occupancy_head(hidden.vision)      # 3D occupancy
    flow_pred = occupancy_flow_head(hidden.vision)  # occupancy flow
    action_traj = action_diffusion_head(hidden)     # trajectory planning

    loss_llm = autoregressive_ce(text_logits, labels.answer_tokens)
    loss_occ = occupancy_loss(occ_logits, labels.occupancy)
    loss_flow = velocity_loss(flow_pred, labels.occupancy_flow)
    loss_action = diffusion_planning_loss(action_traj, labels.future_traj)

    loss = (lambda_1 * loss_llm
            + lambda_2 * loss_occ
            + lambda_3 * loss_flow
            + lambda_4 * loss_action)
    update_all_trainable_modules(loss)
    return text_logits, occ_logits, flow_pred, action_traj
```

##### 关键公式

DrivePI 首先把 BEV latent feature 切成局部块，并计算视觉 token 数：

$$
F_{bev}\in\mathbb{R}^{H\times W\times C},\qquad
F_{patch}\in\mathbb{R}^{N\times K^2\times C},\qquad
N=\frac{H}{K}\times\frac{W}{K}
$$

空间投影器用池化后的局部摘要作为 query，用原始 patch token 作为 key/value，避免直接池化丢失局部几何：

$$
F_v
=
\mathrm{Linear}\left(
\mathrm{Attn}(Q=F_{pool},K=F_{patch},V=F_{patch})
\right),
\qquad
F_v\in\mathbb{R}^{N\times C_l}
$$

训练目标把语言、占据、流和动作规划四个损失联合起来：

$$
L_{total}
=
\lambda_1L_{llm}
+
\lambda_2L_{occ}
+
\lambda_3L_{flow}
+
\lambda_4L_{action}
$$

其中 \(L_{llm}\) 约束文本回答和场景描述，\(L_{occ}\) 约束 3D occupancy，\(L_{flow}\) 约束动态占据流，\(L_{action}\) 约束规划轨迹或动作扩散输出。

##### 方法解读

DrivePI 的问题设定来自自动驾驶里两条路线的互补短板。传统 Vision-Action 模型如 UniAD/VAD 强在 3D perception、prediction、planning 的结构化输出，因此可解释性和安全检查更清晰，但自然语言交互弱；VLA/MLLM 路线可以回答问题、接受指令并解释场景，却常常只输出文本或动作，缺少 occupancy 与 flow 这样的细粒度 3D 中间量。DrivePI 的核心贡献是把二者放进同一个可训练框架：语言模型不只是“看图说话”，还必须通过专门头输出可度量的 4D 空间结果。

输入侧，DrivePI 不满足于多视角 camera-only VLA，而是加入 LiDAR 点云来补足精确几何。视觉编码器把多视角图像和点云转换成 BEV feature \(F_{bev}\)，这一步继承了自动驾驶感知系统擅长的鸟瞰空间表示。BEV 的分辨率通常超过 \(100\times100\)，如果直接把每个位置当成 token 喂给 MLLM，长度和显存都会失控；如果简单池化，又会损失车辆、行人、可行驶区域边界等局部结构。

空间投影器是 DrivePI 连接 BEV 与语言模型的关键。它先把 BEV 切成 \(K\times K\) 局部块，每个块形成 \(K^2\) 个局部 token；再把该块池化成一个 query，原始局部 token 作为 key/value 做 cross-attention。这样每个输出 vision token 仍是一块 BEV 的压缩摘要，但摘要是内容自适应的，而不是固定平均池化。直觉上，模型可以在同样 token budget 下保留“这个区域里哪些空间细节值得带给 MLLM”。

MLLM 主体接收 vision tokens 和 text tokens 后，DrivePI 不只用 text head 预测自然语言答案，还从多模态 hidden state 中抽取对应视觉 token，经线性投影还原为空间特征图，再接 3D occupancy、occupancy flow、action diffusion 三类细粒度头。这个设计让语言模型内部表征同时服务文本推理和几何任务：如果模型想在 QA 中说“左前方车辆正在靠近”，它也需要在 occupancy/flow 头中给出相应空间证据。

数据引擎补齐了普通驾驶 QA 数据缺少 4D supervision 的问题。论文先用强 MLLM 为前后视角生成 caption，再合并成完整场景描述；随后基于真实 occupancy 和 flow 标注构造多轮 text-occupancy/text-flow QA，例如某个位置是否被占据、属于什么类别、速度如何；最后基于未来 ego 轨迹生成 planning QA。论文报告训练集包含 nuScenes-QA 的 377k QA、84k 场景描述、560k 4D spatial reasoning QA 和 24k planning reasoning QA，总规模超过 100 万 QA。

联合损失使 DrivePI 的优势不只来自“多任务头堆叠”。如果只训练文本头，MLLM 可能学会模糊描述但无法保证几何一致；如果只训练 VA 头，模型缺少语言可控性和解释能力。加权总损失把两类约束施加到同一个多模态表征上：语言目标提供交互式语义，occupancy/flow 提供可验证空间中间结果，action diffusion 负责把这些中间结果落实到未来轨迹。论文因此报告单个 0.5B Qwen2.5 backbone 的 DrivePI 能在 nuScenes-QA、OpenOcc、Occ3D 和规划指标上同时对比 VLA 与专用 VA 方法。

实验结果也体现了这种统一目标的收益。CVPR OpenAccess 摘要报告 DrivePI 相比 OpenDriveVLA-7B 在 nuScenes-QA 上 mean accuracy 高 2.5%，相对 ORION 将 nuScenes collision rate 从 0.37% 降到 0.11%；相对专用 VA 模型，OpenOcc 3D occupancy 比 FB-OCC 高 10.3 RayIoU，occupancy flow 的 mAVE 从 0.591 降到 0.509，规划 L2 error 相对 VAD 从 0.72m 降到 0.49m。更重要的是，这些结果来自一个统一模型，而不是为理解、感知、预测、规划分别训练不同系统。

> 💡 关键：DrivePI 的“4D MLLM”不是把驾驶结果都转成文字，而是让语言模型内部表征同时接受文本、3D occupancy、occupancy flow 和动作规划监督，从而把可交互性与可验证空间输出结合起来。

#### 🧪 练习题

```yaml
question: "DrivePI 的 spatial projector 为什么不用简单平均池化直接压缩 BEV feature？"
options:
  - "因为 BEV feature 没有空间维度，无法池化"
  - "因为 cross-attention 可以在压缩 token 数的同时保留局部块内更细的空间信息"
  - "因为 MLLM 只能接收 LiDAR 原始点云，不能接收 BEV token"
  - "因为 occupancy flow 只能由文本 token 预测"
answer: 1
explain: "DrivePI 将 BEV 切成局部 patch 后，用 pooled token 查询原始局部 token，避免简单池化丢掉细粒度几何，同时控制进入 MLLM 的 token 数。"
```
