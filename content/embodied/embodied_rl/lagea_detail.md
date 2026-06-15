### LaGEA — 时间接地奖励塑形 (Temporally Grounded Reward Shaping)

```yaml
id: lagea
name: LaGEA
full_name: 时间接地奖励塑形 (Temporally Grounded Reward Shaping)
year: '2026'
org: arXiv
paper_url: https://arxiv.org/abs/2602.03001
category: reward_design
parent: rnd
motivation: VLM反射时间接地奖励塑形
```

#### 📝 一句话总结

LaGEA 提出把 VLM 对失败轨迹的结构化语言反思转成时间局部化的 dense reward shaping，解决机器人操作中稀疏奖励无法指出“何时、为何失败”的问题。它通过关键帧、图文反馈对齐、delta potential 和自适应塑形权重，让语言反馈在早期探索中强介入、在策略变好后逐渐退出。

#### 🎯 核心要点

- **结构化 VLM 反思**：每个 rollout 后由 Qwen-2.5-VL-3B 生成 schema-constrained JSON 反馈，避免自由文本漂移
- **关键帧时间接地**：从目标相似度轨迹中选取接近目标、变化快或转折明显的帧，把反馈权重扩散到局部时间窗口
- **反馈-视觉对齐**：用图像、目标、指令和反馈投影器把状态图像与语言反馈嵌入到共享空间
- **Goal-delta reward**：根据当前状态与目标图像/指令的 potential 变化奖励真实进展
- **Feedback-delta reward**：根据状态与 VLM 诊断反馈的一致性变化奖励纠错方向
- **自适应塑形系数**：只在失败轨迹上强化塑形，并随成功率 EMA 和进展信号提升而衰减
- **在线 RL 接入**：最终奖励输入 SAC critic，保留环境 sparse reward，同时添加 bounded VLM shaping
- **资料限制**：清单中的 `paper_url` 指向 arXiv:2602.03001，但该链接实际是非 LaGEA 的 batch-size/GNS 论文；本文正文基于公开 LaGEA 论文 arXiv:2509.23155 与其 arXiv HTML 页面，YAML 元信息按清单原样保留

#### 🔬 深入细节

##### 整体架构示意图

![LaGEA 框架总览](https://arxiv.org/html/2509.23155v2/x1.png)

*图：LaGEA 在每次 rollout 后抽取关键帧并查询 VLM，随后把结构化反馈与视觉状态对齐，最终把目标进展和反馈一致性转成 step-wise shaping reward。*

##### 算法伪代码

```python
# LaGEA 训练循环伪代码
initialize SAC policy, critic, replay buffer
initialize visual encoder, text encoder, feedback/image projectors

for episode in range(num_episodes):
    traj = rollout(policy, env)
    keyframes, weights = select_keyframes(traj.obs, goal_image)

    feedback_json = VLM_reflect(
        task_instruction=instruction,
        frames=keyframes,
        error_taxonomy=taxonomy,
        recent_history=history,
    )
    f = encode_feedback(feedback_json)

    for transition (s_t, a_t, r_env, s_next) in traj:
        phi_goal_t = goal_potential(s_t, goal_image, instruction)
        phi_goal_next = goal_potential(s_next, goal_image, instruction)
        r_goal = gamma * phi_goal_next - phi_goal_t

        phi_fb_t = feedback_potential(s_t, f)
        phi_fb_next = feedback_potential(s_next, f)
        r_feedback = weight_t * (gamma * phi_fb_next - phi_fb_t)

        confidence = instruction_feedback_agreement(instruction, f)
        r_vlm = mix(confidence, r_goal, r_feedback)
        alpha = failure_aware_schedule(success_ema, progress)
        r_total = r_env + alpha * r_vlm
        replay.add(s_t, a_t, r_total, s_next)

    update projectors with calibration + contrastive losses
    update SAC actor and critic from replay
```

##### 动机与背景

VLM 可以判断图像是否接近语言目标，但直接把 VLM 分数作为 reward 往往不稳定：同一失败可能被不同视角解释成不同原因，单帧评分也无法告诉 RL 哪一步造成了失败。机器人操作任务又常是长程、稀疏奖励，只有 episode 末端的成功/失败信号会导致大量无效探索。

LaGEA 的设计目标是把“自然语言反思”变成 RL 可用的局部学习信号。它不让 VLM 直接控制动作，而是在每个 episode 后生成可审计的结构化反馈，例如失败阶段、约束违反、可恢复建议等；再用关键帧选择把这段反馈绑定到轨迹中真正关键的时间片。

关键帧选择以目标相似度轨迹为基础。设图像嵌入为 \(e_t\)，目标嵌入为 \(g\)，则可以得到接近度 \(c_t=\cos(e_t,g)\)，并结合一阶变化和局部转折得到 saliency \(u_t\)。选出的关键帧再通过三角核扩散成逐步权重 \(w_t\)，避免把同一段反馈平均撒到所有 transition 上。

##### Delta Potential 奖励

LaGEA 的奖励塑形借鉴 potential-based shaping：不直接奖励某个状态的高分，而奖励 potential 的变化：

$$r_t^{\Delta\Phi}=\gamma \Phi(s_{t+1})-\Phi(s_t)$$

这能缓解“站在看起来接近目标的位置反复刷分”的问题。Goal potential 由当前状态与目标图像、任务指令的相似度组成；Feedback potential 则衡量当前状态与 VLM 反馈 embedding 的一致性，并由关键帧权重 \(w_t\) 控制强度。

两个 delta 奖励通过置信度混合：

$$r_t^{\text{vlm}}=\lambda_t r_t^{\text{goal}} + (1-\lambda_t) r_t^{\text{feedback}}$$

其中 \(\lambda_t\) 可由指令和反馈的一致性估计得到。若 VLM 反馈与任务指令高度一致，反馈项权重大；若反馈不可靠，系统更多依赖目标图像/指令的进展信号。

##### 动态塑形与 SAC 训练

LaGEA 的最终奖励为：

$$r_t = r_t^{\text{env}} + \alpha_t r_t^{\text{vlm}}$$

\(\alpha_t\) 不是常数，而是 failure-aware schedule：失败时塑形较强，成功率 EMA 上升后逐步减弱。这样做的直觉是，语言反馈适合帮助早期探索和失败恢复，但当策略已经学会任务后，继续过度依赖 VLM 可能造成 reward hacking 或偏离真实环境目标。

与 RND 这类通用新颖性奖励相比，LaGEA 的内在信号更“任务语义化”：RND 奖励没见过的状态，LaGEA 奖励“按反馈看起来在纠错的状态变化”。因此它更适合目标明确但中间奖励稀缺的机器人操作任务；代价是需要 VLM、视觉语言嵌入与反馈模板，系统复杂度高于纯预测误差方法。

> 💡 关键：LaGEA 的核心不是“让 VLM 打分”，而是把 VLM 反思先结构化、再时间接地、最后只以 potential difference 的形式进入 RL 奖励。

#### 🧪 练习题

```yaml
question: "LaGEA 为什么使用 delta potential 而不是直接把状态-目标相似度作为奖励？"
options:
  - "为了让 VLM 可以直接输出动作"
  - "为了奖励朝目标或反馈方向的进展，避免静态高相似状态被反复奖励"
  - "为了完全替代环境 sparse reward"
  - "为了减少视觉编码器的参数量"
answer: 1
explain: "Delta potential 使用 γΦ(s_{t+1})-Φ(s_t) 奖励变化方向，强调进展而不是静态分数，更不容易让策略停在高相似但无进展的位置刷奖励。"
```
