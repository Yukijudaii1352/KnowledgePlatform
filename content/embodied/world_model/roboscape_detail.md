### 机器人场景 (Physics-informed Embodied World Model)

```yaml
id: roboscape
name: Roboscape
full_name: 机器人场景 (Physics-informed Embodied World Model)
year: "2026.01"
org: Tsinghua University
paper_url: https://arxiv.org/abs/2601.roboscape
category: physics
parent: gns
motivation: 引入物理先验提升机器人场景预测准确性
```

#### 📝 一句话总结

RoboScape 提出在自回归机器人视频世界模型中联合学习 RGB 生成、时间深度预测和自适应关键点动力学，用几何一致性与接触区域运动约束提升机器人交互视频的物理合理性。

#### 🎯 核心要点

- **输入链接限制**：清单中的 `https://arxiv.org/abs/2601.roboscape` 疑似占位符；实际公开论文为 `https://arxiv.org/abs/2506.23135`
- **物理先验数据管线**：从 AGIBOT-World 视频中抽取 RGB、深度、动作、关键点轨迹和质量过滤标签
- **双分支 co-autoregressive Transformer**：RGB token 分支和 depth token 分支并行预测未来帧
- **Temporal depth prediction**：深度分支为 RGB 生成注入 3D 几何一致性约束
- **Adaptive keypoint dynamics learning**：选择运动幅度最大的关键点，约束接触和形变区域的时序 token 一致性
- **Keypoint-guided attention**：对关键点轨迹覆盖区域提高训练权重，强化复杂局部运动学习
- **下游机器人用途**：生成数据可辅助 Diffusion Policy、pi0 等策略训练，也可作为 policy evaluator

#### 🔬 深入细节

![RoboScape 框架图](https://arxiv.org/html/2506.23135v1/x2.png)
*图：RoboScape 将 RGB 视频生成、时间深度预测和关键点动力学学习合并到统一自回归世界模型中。*

##### 算法伪代码

```python
# RoboScape physics-informed world model
for clip in agibot_world_clips:
    rgb_tokens = magvit2.encode_rgb(clip.rgb_frames)
    depth_maps = video_depth_anything(clip.rgb_frames)
    depth_tokens = tokenize_depth(depth_maps)
    keypoints = spatial_tracker(clip.rgb_frames)
    active_kpts = select_top_motion_keypoints(keypoints, top_k=K)
    action_embed = robot_action_encoder(clip.actions)

    # 双分支自回归预测
    rgb_pred, depth_pred, hidden_rgb, hidden_depth = dct_transformer(
        history_rgb=rgb_tokens[:-1],
        history_depth=depth_tokens[:-1],
        actions=action_embed,
    )

    rgb_loss = cross_entropy(rgb_pred, rgb_tokens[1:])
    depth_loss = cross_entropy(depth_pred, depth_tokens[1:])
    kp_consistency = temporal_token_consistency(hidden_rgb, active_kpts)
    kp_weighted_loss = keypoint_guided_attention_loss(rgb_pred, rgb_tokens[1:], active_kpts)

    loss = rgb_loss + lambda_d * depth_loss + lambda_k * kp_consistency + lambda_a * kp_weighted_loss
    update(loss)
```

##### 动机与背景

机器人视频世界模型常被用来生成交互数据、想象未来和评估策略，但纯 RGB 目标会鼓励模型拟合表面纹理，而不是理解物体接触、深度结构和材料形变。对机器人来说，这些错误非常致命：布料可能无物理原因地变形，物体可能穿透，抓取过程可能视觉上平滑但动作不可执行。

RoboScape 的核心判断是：物理合理性不一定要通过昂贵的外部物理仿真器注入，也可以通过多任务辅助监督让视频模型在训练中学习几何和运动先验。论文选用两个易从视频中提取的先验：时间深度一致性和关键点轨迹一致性。

##### 数据处理管线

论文从 AGIBOT-World 构建大规模机器人视频片段，使用多个现成模型产生物理相关标注：Video Depth Anything 生成深度序列，SpatialTracker 采样并跟踪关键点，TransNetV2 检测镜头边界，InternVL 标注动作语义与关键帧，FlowNet 用于过滤低质量或运动混乱片段。

这个管线的作用是把原始互联网/机器人视频整理为更适合世界模型训练的多模态样本：

$$
(o_{1:T}^{rgb}, o_{1:T}^{depth}, a_{1:T}, k_{1:T})
$$

其中 \(a_t\) 是机器人动作，\(k_t\) 是关键点坐标轨迹。

##### 双分支 RGB-Depth 自回归

RoboScape 用 MAGVIT-2 将 RGB 帧压缩为离散 token，也将深度图 token 化。RGB 和 depth 分支都用 Spatial-Temporal Transformer block，并接收动作嵌入：

$$
\hat{z}^{rgb}_{t+1} = f_{rgb}(z^{rgb}_{\le t}, z^{dep}_{\le t}, a_t)
$$

$$
\hat{z}^{dep}_{t+1} = f_{dep}(z^{dep}_{\le t}, a_t)
$$

深度分支的中间特征通过线性投影注入 RGB 分支：

$$
h^{rgb}_{\ell} \leftarrow h^{rgb}_{\ell} + W_{\ell} h^{dep}_{\ell}
$$

这样 RGB 生成不仅学习“下一帧长什么样”，还受到 3D 深度结构的约束。

##### 自适应关键点动力学

对于机器人操作，最关键的物理信息往往集中在接触区域和高运动区域。RoboScape 不依赖手工分割，而是根据关键点运动幅度选择 top-k active keypoints：

$$
\mathcal{K} = \text{TopK}_i \sum_t \|k_{i,t} - k_{i,t-1}\|
$$

然后对这些关键点在各帧对应的视觉 token 施加时序一致性：

$$
\mathcal{L}_{kp} =
\sum_{i \in \mathcal{K}}\sum_t
\|h_{t, k_{i,t}} - h_{0, k_{i,0}}\|_2^2
$$

直觉是：布料、袋子、工具和被抓取物体的局部关键点轨迹反映了材料和接触动力学。让模型关注这些点，比对整幅图平均施加约束更能改善物理交互细节。

##### 联合目标与下游意义

最终训练目标组合 RGB token 预测、depth token 预测、关键点一致性和关键点加权 token loss：

$$
\mathcal{L} =
\mathcal{L}_{rgb}
+ \lambda_d \mathcal{L}_{depth}
+ \lambda_k \mathcal{L}_{kp}
+ \lambda_a \mathcal{L}_{attn}
$$

论文报告在 50,000 视频 clips、约 6.5M 训练 clips 上训练，并在外观保真、几何一致和动作可控性指标上优于 IRASim、iVideoGPT、Genie 和 CogVideoX。更重要的是，RoboScape 生成的视频可作为机器人策略训练数据，也能作为 policy evaluator，与真实仿真评估结果保持相关。

> 💡 关键：RoboScape 的物理先验不是显式求解牛顿方程，而是把“深度几何”和“关键点运动”变成世界模型训练时必须同时解释的监督信号。

#### 🧪 练习题

```yaml
question: "RoboScape 中自适应关键点动力学学习主要约束什么？"
options:
  - "整幅图所有静态背景像素"
  - "运动幅度较大的接触/形变区域在时间上的 token 一致性"
  - "语言提示与动作标签的一致性"
  - "相机内参的标定误差"
answer: 1
explain: "RoboScape 选择运动最活跃的关键点并约束其跨帧 token 表示，促使模型学习接触、形变和材料相关的局部动力学。"
```
