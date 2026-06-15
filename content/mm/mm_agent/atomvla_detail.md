### AtomVLA

```yaml
id: atomvla
name: AtomVLA
full_name: "原子视觉语言动作模型 (AtomVLA)"
year: "2026"
org: "UC Berkeley"
paper_url: "https://arxiv.org/abs/2603.08519"
category: "frontier_2026"
parent: "reconvla"
motivation: "子任务感知的预测性潜在世界模型"
```

#### 📝 一句话总结

AtomVLA 提出子任务感知的两阶段 VLA 后训练框架：先用 LLM 将长程演示拆成原子子任务做 SFT，再用预测性潜在世界模型给候选 action chunk 打分并进行离线 GRPO。它解决了高层指令过粗导致长程任务中误差累积、且真实机器人在线 RL 代价过高的问题。

#### 🎯 核心要点

- 使用 Qwen3-VL-4B-Instruct 作为 VLM backbone，并接入 cross-attention Diffusion Transformer action head
- 用 GPT-4o 将每条长程示范拆成 2-5 个原子子任务，标注子任务文本、起始帧和结束帧
- Stage I 监督微调用高层任务指令与当前原子子任务共同指导动作 chunk 预测
- Stage II 用基于 V-JEPA2 的 action-conditioned latent world model 预测候选动作后果
- 以子任务边界帧和最终目标帧为 latent goal，对候选 action chunk 计算奖励并做离线 GRPO
- 在 LIBERO 上平均成功率达到 97.0%，在更难的 LIBERO-PRO 上达到 48.0%，并在 Galaxea R1 Lite 真机验证长程泛化

#### 🔬 深入细节

##### 框架总览

![AtomVLA 论文 PDF](https://arxiv.org/pdf/2603.08519)
*图：论文 PDF Figure 1 展示 AtomVLA 两阶段框架。arXiv 当前未提供 HTML 图片直链，因此使用公开 PDF 作为图源入口。*

AtomVLA 的核心问题是 instruction grounding gap。许多 VLA 只在 SFT 时看到高层指令，例如“整理桌面”或“把物体放到目标位置”，但动作头需要输出连续低层动作。高层语言太粗，不能告诉模型当前阶段应该抓什么、放哪里、是否已经完成上一子目标；长程任务中一步偏差会继续累积。

##### 训练伪代码

```python
# AtomVLA 两阶段训练
for demo in demonstrations:
    subtasks = GPT4o.segment(
        instruction=demo.high_level_instruction,
        frames=sample_frames(demo.video),
        schema=[("subtask_text", "start_frame", "end_frame")],
    )
    add_subtask_labels(demo, subtasks)

# Stage I: SFT
for obs, high_inst, sub_inst, action_chunk in labeled_demos:
    H = qwen3_vl(obs, high_inst + sub_inst)
    pred = diffusion_action_head(H)
    loss = flow_matching_loss(pred, action_chunk)
    update_backbone_and_head(loss)

# Stage II: offline GRPO with latent world model reward
for state in sample_offline_states():
    candidates = policy.sample_action_chunks(state, K=10)
    rewards = []
    for a in candidates:
        z_future = latent_world_model.rollout(encoder(state.obs), a)
        r_sub = similarity(z_future, encoder(state.subgoal_frame))
        r_goal = similarity(z_future, encoder(state.final_goal_frame))
        rewards.append(0.3 * r_sub + 0.4 * r_goal)
    loss = grpo_loss(candidates, normalize(rewards), ref_policy)
    update_action_head(loss)
```

##### 方法细节

模型结构上，AtomVLA 用 Qwen3-VL-4B-Instruct 编码多视角视觉观测 \(O_t\)、高层指令 \(I_t\) 和当前子任务指令 \(SI_t\)，得到上下文 token：

$$
H_t = f_{VLM}(O_t, I_t + SI_t)
$$

动作头是 cross-attention Diffusion Transformer，以 flow matching 方式回归未来 \(N\) 步 action chunk。训练时对真实动作块加噪，模型学习从 noisy action 向真实动作速度场回归；推理时从高斯噪声初始化，经若干 Euler 步迭代得到动作块。这个设计比单步动作更具时间连贯性，但 chunk 过长会降低纠错灵活性，论文实验发现 chunk size 4 最优。

子任务数据来自 LLM 自动分解。给定演示视频帧和任务上下文，GPT-4o 输出 JSON 列表 \((\ell_i, s_i, e_i)\)，其中 \(\ell_i\) 是子任务文本，\(s_i,e_i\) 是起止帧。作者限制子任务粒度为基本操作表达，如 `Pick up [object]`、`Place [object] on [target position]`、`Open/Close [object]`、`Push [object]`，避免过细过程描述。这样每个状态都有“当前该做什么”的中间语言目标。

后训练阶段避免真实机器人在线 RL。AtomVLA 使用 frozen V-JEPA2 encoder \(J(\cdot)\) 把当前观测映射为 latent token，action-conditioned predictor \(W_\theta\) 根据候选 action chunk 预测未来 latent：

$$
\hat{z}_{t+N}=W_\theta(J(O_t), \tilde{a}_{t:t+N})
$$

奖励不是像素生成质量，而是未来 latent 与子任务边界帧、最终目标帧的相似度。这样模型能比较多个候选动作哪个更接近当前子目标和全局目标，同时避免生成式 world model 的视觉伪影。离线 GRPO 在同一状态采样 \(K\) 个候选，组内归一化 reward 得到 advantage，并加入相对 SFT reference policy 的 KL 约束，只更新动作头以稳定 VLM 表示。

实验结论支持两点：第一，原子子任务指令能显著提升长程任务，例如 LIBERO-Long 中“图像+高层任务+原子任务”优于只用图像或只用高层任务；第二，world-model-guided GRPO 在 SFT 之上继续提高目标对齐和抗扰动能力。LIBERO-PRO 的位置、物体、任务扰动更强，AtomVLA 仍保持非平凡成功率，说明 latent reward 比单纯模仿更能约束长程目标进展。

> 💡 关键：AtomVLA 把“语言分解的中间目标”和“latent world model 的候选动作评分”结合起来，提供了一条不依赖昂贵在线机器人 rollout 的 VLA 后训练路径。

#### 🧪 练习题

```yaml
question: "AtomVLA 为什么使用潜在世界模型给候选 action chunk 打分？"
options:
  - "为了直接生成最终渲染图像作为训练数据"
  - "为了在不进行真实机器人在线 rollout 的情况下，估计候选动作是否接近子任务和最终目标"
  - "为了替代所有语言指令"
  - "为了把连续动作离散化成网页点击"
answer: 1
explain: "V-JEPA2 latent world model 能预测候选动作后的 latent 后果，并与子目标/终目标 latent 比较，从而提供离线 GRPO 奖励。"
```
