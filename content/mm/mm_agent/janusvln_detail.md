### JanusVLN

```yaml
id: janusvln
name: JanusVLN
full_name: 双面神导航 (JanusVLN)
year: '2026'
org: MIT
paper_url: https://iclr.cc/virtual/2026/poster/12345
category: frontier_2026
parent: hamt
motivation: 双重隐式神经内存解耦语义与空间
```

#### 📝 一句话总结

JanusVLN 提出面向连续视觉语言导航的双重隐式记忆框架，将视觉语义记忆与空间几何记忆分开建模并用 KV cache 增量更新，解决显式历史帧/文本地图带来的空间信息损失、重复计算和记忆膨胀问题。

#### 🎯 核心要点

- 双重隐式记忆：分别维护 visual-semantic memory 与 spatial-geometric memory，且记忆大小不随轨迹长度线性增长
- 3D 几何先验：引入 VGGT 作为空间几何编码器，仅用 RGB 视频提取深度、点云等隐式 3D 结构信息
- 混合 KV 更新：保留 initial window 的 KV 作为全局 attention sink，同时用 sliding window 保存最近帧上下文
- 双编码器解耦：Qwen2.5-VL 视觉编码器负责“是什么”，VGGT 空间编码器负责“在哪里、空间关系如何”
- 空间感知融合：将语义 token 与空间几何 token 对齐后经轻量 MLP 融合，再输入 MLLM 预测下一步动作
- 实验结果：在 R2R-CE 与 RxR-CE 上超过 20 个近期方法，证明 RGB-only 输入也能获得强空间导航能力

#### 🔬 深入细节

##### 框架示意图

![JanusVLN 框架](https://arxiv.org/html/2509.22548v1/x2.png)
*图：JanusVLN 使用双编码器分别提取视觉语义与空间几何特征，并把历史 KV cache 构造成固定大小的双重隐式记忆。*

##### 核心算法伪代码

```python
# JanusVLN 在线导航推理伪代码
M_sem_init, M_sem_slide = [], Queue(maxlen=n_sem)
M_geo_init, M_geo_slide = [], Queue(maxlen=n_geo)

for t, frame in enumerate(rgb_video_stream):
    semantic_tokens, sem_kv = qwen_visual_encoder(
        frame,
        memory=M_sem_init + list(M_sem_slide),
    )
    geometry_tokens, geo_kv = vggt_geometry_encoder(
        frame,
        memory=M_geo_init + list(M_geo_slide),
    )

    if t < initial_window:
        M_sem_init.append(sem_kv)
        M_geo_init.append(geo_kv)
    else:
        M_sem_slide.push(sem_kv)
        M_geo_slide.push(geo_kv)

    geometry_tokens = spatial_merge(geometry_tokens)
    fused_tokens = mlp_project(concat(semantic_tokens, lambda_g * geometry_tokens))
    action = mllm_next_action(instruction, fused_tokens)
    execute(action)
```

##### 方法解释

VLN-CE 要求智能体在连续 3D 环境中跟随语言指令前进、转向或停止。近期 MLLM 导航方法通常依赖显式记忆：一种做法是把历史观测写成文本认知地图，另一种做法是保存历史视频帧。前者容易丢失方向、深度和相对位置等空间信息，后者每一步都要重新处理长历史帧，计算量和上下文长度都会爆炸。

JanusVLN 的核心假设是：导航记忆不必保存为原始文本或图像，而可以保存为神经网络内部已经压缩过的 KV cache。对于每个新帧，模型只需要与固定容量的历史 KV 做交互，即可取回过去环境信息：

$$
M = M_{\text{initial}} \cup M_{\text{sliding}}
$$

其中 \(M_{\text{initial}}\) 保存最开始若干帧的 KV，用作全局锚点；\(M_{\text{sliding}}\) 保存最近 \(n\) 帧的 KV，用于实时局部决策。这样记忆规模为常数，不会随导航步数无限增长。

第二个关键是语义和空间的解耦。JanusVLN 使用 Qwen2.5-VL 的视觉编码器提取语义 token \(S_t\)，用于理解物体类别、场景语义和指令相关实体；同时使用 VGGT 的 encoder/fusion decoder 提取空间几何 token \(G_t\)，提供 RGB-only 输入中的 3D 先验。二者融合为：

$$
F_t = \mathrm{MLP}\left([S_t;\lambda G_t]\right)
$$

其中 \(\lambda\) 控制空间几何信息的权重。论文实现中 \(\lambda=0.2\)，initial/sliding window 分别设为 8 和 48 帧。

> 💡 关键：JanusVLN 不是把深度图作为额外传感器输入，而是用预训练 3D 几何模型从 RGB 视频中提取空间先验，因此部署上仍保持 RGB-only。

训练时，JanusVLN 基于 Qwen2.5-VL 7B 和 VGGT 构建，只微调 LLM 与投影层，语义编码器和空间编码器保持冻结。动作空间遵循 VLN-CE 设置，包括小角度旋转、前进和 Stop。实验在 R2R-CE 与 RxR-CE 上报告 NE、OS、SR、SPL 与 nDTW 等指标。

消融结果显示，移除 spatial memory 会使 SPL 明显下降，移除 semantic memory 会导致 SR 下降；同时移除双重隐式记忆会让性能接近崩溃。这说明两类记忆不是冗余模块，而是分别负责“理解目标语义”和“维护 3D 空间关系”。

#### 🧪 练习题

```yaml
question: "JanusVLN 中 initial window 与 sliding window 的组合主要解决什么问题？"
options:
  - "把 RGB 图像转换成文本描述"
  - "在固定记忆容量下同时保留全局锚点和最近上下文，避免重复处理全部历史帧"
  - "让机器人一次预测完整导航轨迹"
  - "用真实深度传感器替代视觉编码器"
answer: 1
explain: "Initial KV 提供长期全局锚点，sliding KV 保存近期观测，使模型能增量更新历史信息，同时避免显式历史帧带来的计算和内存膨胀。"
```
