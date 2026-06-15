### 星辰 (Autoregressive Denoising World Model)

```yaml
id: astra
name: Astra
full_name: 星辰 (Autoregressive Denoising World Model)
year: "2026.01"
org: Tsinghua/Kuaishou
paper_url: https://arxiv.org/abs/2512.08931
category: generative
parent: sora
motivation: 自回归流与扩散去噪确保长时序物理连贯
```

#### 📝 一句话总结

Astra 提出把预训练视频扩散骨干改造成自回归去噪世界模型，通过 ACT-Adapter、噪声增强历史记忆和 Mixture of Action Experts 统一处理相机、机器人和键鼠等动作条件，解决长时序视频世界模型难以同时保持历史一致性和动作响应性的问题。

#### 🎯 核心要点

- **自回归去噪架构**：以 chunk 为单位从历史观测、动作和可选文本提示生成未来视频
- **Temporal causal attention**：保证模型只能使用过去 chunk 作为条件，支持流式长时程输出
- **ACT-Adapter**：在预训练 video DiT 的 latent 特征空间直接注入 action-induced shift
- **Noise-as-mask 历史记忆**：训练时污染历史帧，缓解模型过度复制历史而忽视动作的 visual inertia
- **Action-free guidance**：类似 CFG，通过有/无动作条件的速度场差异放大动作响应
- **MoAE 多动作专家**：动态路由相机 pose、机器人 pose、键鼠离散命令等异构动作模态
- **跨场景数据训练**：使用 nuScenes、Sekai、SpatialVID、RT-1、Multi-Cam Video 等多源数据

#### 🔬 深入细节

![Astra 框架图](https://arxiv.org/html/2512.08931v3/x2.png)
*图：Astra 以初始图像、历史 chunk、动作和提示为条件，逐 chunk 进行自回归去噪生成。*

##### 算法伪代码

```python
# Astra autoregressive denoising training
for video, actions, prompt in dataset:
    history, target_chunk = sample_history_and_target(video)

    # noise-as-mask: 训练时弱化历史视觉条件，避免 visual inertia
    corrupted_history = add_context_noise(history)
    action_embed = MoAE(actions)                       # camera / robot / keyboard-mouse

    z_t, noise, t = flow_matching_noising(target_chunk)
    pred_velocity = video_dit_with_act_adapter(
        noisy_target=z_t,
        history=corrupted_history,
        action=action_embed,
        prompt=prompt,
        timestep=t,
    )
    loss = flow_matching_loss(pred_velocity, noise)
    update(loss)

# inference with action-free guidance
history = [initial_frame]
for chunk_id in range(num_chunks):
    v_action = model(history, action=actions[chunk_id])
    v_null = model(history, action=null_action)
    v_guided = v_null + guidance_scale * (v_action - v_null)
    next_chunk = denoise(v_guided)
    history.append(next_chunk)
```

##### 动机与背景

现有视频生成模型的强项是短视频质量，但世界模型要求更苛刻：它必须从过去观测和动作预测未来，且能长时间滚动。简单地把视频扩散模型串成自回归 rollout 会遇到两个问题：历史帧太强导致模型只维持视觉惯性、不响应新动作；动作条件太强又会破坏时序一致性。

Astra 的核心思路是保留预训练视频扩散模型的生成先验，同时用轻量模块让它变成交互式世界模型。论文基于 Wan-2.1 类 flow transformer backbone，仅添加动作适配和专家路由，避免从零训练大视频模型。

##### 自回归去噪世界模型

设历史视频 chunk 为 \(H_{<i}\)，动作序列为 \(a_i\)，目标是生成下一段视频 \(X_i\)：

$$
p(X_i \mid H_{<i}, a_i, c)
$$

Astra 使用 flow matching / denoising 形式学习速度场：

$$
v_{\theta}(z_t, t, H_{<i}, a_i, c)
$$

推理时逐 chunk 去噪得到 \(X_i\)，再把 \(X_i\) 追加到历史中，用于下一步预测。Temporal causal attention 保证生成过程符合时间因果。

##### ACT-Adapter 与动作注入

动作不是文本提示，而是会在 latent dynamics 中导致特征位移的控制信号。Astra 将动作编码为与视频 latent 对齐的向量，并在每个 Transformer block 中通过 ACT-Adapter 注入：

$$
h_{\ell}' = h_{\ell} + A_{\ell}(e_a)
$$

其中 \(A_{\ell}\) 是初始化为近似恒等的轻量线性层。论文还冻结大部分 backbone，只微调 self-attention 和 adapter，既保留视频生成能力，又学习动作对未来状态的影响。

##### 噪声历史记忆与 visual inertia

长历史能提升一致性，但也让模型过度依赖过去画面，忽略“转向、抓取、移动”等新动作。Astra 在训练时对历史条件加入独立噪声：

$$
\tilde{H}_{<i} = H_{<i} + \sigma \epsilon
$$

这相当于 soft mask：历史仍提供场景身份和粗结构，但不能被模型直接复制。这样模型被迫综合动作和历史，而不是只做视觉外推。

##### MoAE：统一异构动作

不同任务的动作结构差异很大：相机控制可能是 7D/12D pose，机器人操作常是 7D end-effector pose，游戏/探索可能是键鼠离散输入。MoAE 先把每种动作投影到共享空间，再由 router 选择 top-k MLP experts：

$$
e_a = \sum_{m \in \text{TopK}(r(a))} \alpha_m E_m(P_m(a))
$$

这种设计让模型共享世界生成能力，同时保留动作模态专门化。论文在 397K 视频片段、约 360 小时数据上训练，并报告在 instruction following、subject/background consistency 和 motion smoothness 等指标上优于 Wan-2.1、MatrixGame 和 YUME。

> 💡 关键：Astra 的贡献不是单个动作编码器，而是把“预训练视频去噪 + 自回归历史 + 动作响应”组织成可扩展的交互式世界模型训练范式。

#### 🧪 练习题

```yaml
question: "Astra 中 noise-as-mask 历史记忆的主要作用是什么？"
options:
  - "减少视频分辨率以节省显存"
  - "弱化历史帧的直接复制倾向，让模型更重视动作条件"
  - "把连续动作离散化成文本 token"
  - "替代扩散模型中的随机噪声"
answer: 1
explain: "训练时给历史条件加噪可以缓解 visual inertia，使模型在保持长期一致性的同时对当前动作更敏感。"
```
