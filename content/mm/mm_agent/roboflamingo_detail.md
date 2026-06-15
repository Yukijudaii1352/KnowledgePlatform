### RoboFlamingo

```yaml
id: roboflamingo
name: RoboFlamingo
full_name: "机器人火烈鸟 (RoboFlamingo)"
year: "2024"
org: "PKU"
paper_url: "https://arxiv.org/abs/2311.01378"
category: "embodied"
parent: "vima"
motivation: "视觉语言模型作为高效模仿学习器"
```

#### 📝 一句话总结

RoboFlamingo 提出了一种把 OpenFlamingo 视觉语言基础模型改造成机器人模仿学习策略的简单框架，解决了从大规模 VLM 到长时序机器人控制之间缺少低成本适配路径的问题。它将单步视觉语言理解交给预训练 VLM，将历史建模和动作预测交给显式 policy head，从而在 CALVIN 语言条件操控任务上取得强性能。

#### 🎯 核心要点

- 基于 OpenFlamingo 构建机器人策略，复用其视觉编码器、Perceiver Resampler 与 gated cross-attention 视觉语言融合能力
- 将机器人策略分解为单步多模态理解 \(X_t=f_\theta(o_t,l)\) 和历史条件动作预测 \(a_t=p_\theta(X_t,h_{t-1})\)
- 使用显式 policy head 建模历史，可选 LSTM、decoder-only Transformer/GPT 或 MLP 变体
- 动作空间覆盖 7-DoF 末端执行器相对位姿与夹爪开合状态
- 训练采用最大似然模仿学习：连续位姿用 MSE，夹爪状态用 BCE
- 微调时主要训练 resampler、gated cross-attention 与 policy head，其余 OpenFlamingo 参数冻结
- 在 CALVIN 长时序语言条件操控基准上验证，强调数据效率、零样本语言泛化和单机可训练部署

#### 🔬 深入细节

##### 框架总览

![RoboFlamingo 框架图](https://ar5iv.labs.arxiv.org/html/2311.01378/assets/x2.png)
*图：RoboFlamingo 使用 Flamingo backbone 对当前视觉观测和语言指令做单步融合，再由 policy head 建模历史并预测机器人动作。*

##### 算法流程

```python
# RoboFlamingo 模仿学习伪代码
for batch in language_conditioned_demos:
    obs_seq, lang, action_seq = batch
    history_state = init_state()
    losses = []

    for t, obs_t in enumerate(obs_seq):
        # OpenFlamingo backbone: 单步视觉语言理解
        visual_tokens = vision_encoder(obs_t.images)
        compact_tokens = perceiver_resampler(visual_tokens)
        X_t = flamingo_decoder(compact_tokens, lang)

        # Policy head: 历史建模 + 动作预测
        pred_pose_t, pred_gripper_t, history_state = policy_head(X_t, history_state)

        pose_loss = mse(pred_pose_t, action_seq[t].pose_delta)
        grip_loss = bce(pred_gripper_t, action_seq[t].gripper_open)
        losses.append(pose_loss + grip_loss)

    loss = mean(losses)
    update(resampler, gated_cross_attention, policy_head, loss)
```

##### 方法细节

RoboFlamingo 的核心动机是：视觉语言基础模型已经具备物体识别、语言理解、视觉 grounding 等能力，但机器人操控还需要时间连续性、状态记忆和低层动作输出。直接把 VLM 当成端到端控制器并不自然，因为 Flamingo 类模型预训练时主要看的是图文对或交错图文，而不是连续机器人轨迹。RoboFlamingo 因此不强迫 VLM 自己完成全部决策，而是让它负责每一步的视觉语言表示，再把时序决策交给额外 policy head。

论文把策略写成：

$$
X_t = f_\theta(o_t, l)
$$

$$
a_t = p_\theta(X_t, h_{t-1})
$$

其中 \(o_t\) 是当前多视角图像和本体感知，\(l\) 是语言目标，\(X_t\) 是 OpenFlamingo 融合后的单步特征，\(h_{t-1}\) 是历史隐藏状态。这个分解的直觉是：视觉语言理解和控制历史建模不是同一个问题，前者可以从大规模预训练迁移，后者必须用机器人演示数据学习。

在视觉侧，输入图像先经过预训练视觉编码器得到 patch token，再由 Perceiver Resampler 压缩为少量视觉 token。压缩后的 token 通过 Flamingo 的 gated cross-attention 注入语言模型解码层，使语言指令和视觉状态在同一表示空间中对齐。相比从零训练机器人视觉编码器，这一步直接继承了 OpenFlamingo 的视觉语言先验。

在控制侧，policy head 负责将 \(X_t\) 与历史 \(h_{t-1}\) 转换为动作。论文比较了不看历史的 MLP、将历史帧送入 VLM 的 MLP、decoder-only Transformer/GPT 以及 LSTM。结论是历史信息很关键，但让 VLM 本体直接处理连续帧未必最优，因为 VLM 预训练并没有学习机器人时间动力学；显式 policy head 是更稳妥的折中。

训练目标是标准模仿学习。连续控制量如末端执行器相对位姿使用均方误差：

$$
\mathcal{L}_{pose}=\left\|\hat{a}^{pose}_t-a^{pose}_t\right\|_2^2
$$

夹爪开合是二分类，使用二元交叉熵：

$$
\mathcal{L}_{grip}=-y_t\log \hat{y}_t-(1-y_t)\log(1-\hat{y}_t)
$$

总损失为二者加权和。实现上只微调 resampler、gated cross-attention 和 policy head，冻结大部分 VLM 参数，以控制训练成本并避免完全破坏预训练能力。

与 RT-1/RT-2 或 VIMA 类路线相比，RoboFlamingo 的重点不是重新设计一个机器人原生 Transformer，而是用最小改动把现成 VLM 变成模仿学习器。它的优势是实现简单、训练成本低、可以在单 GPU 服务器上训练/评估；代价是动作空间和历史建模仍依赖额外 policy head，且真实机器人迁移还需要足够的机器人演示数据。

> 💡 关键：RoboFlamingo 的“有效”来自任务分工，而不是单纯把更多图像帧塞进 VLM。VLM 负责每步理解，policy head 负责时序控制。

#### 🧪 练习题

```yaml
question: "RoboFlamingo 为什么要在 OpenFlamingo backbone 后增加显式 policy head？"
options:
  - "为了把所有机器人动作转换成自然语言回答"
  - "为了建模历史观测并输出连续机器人动作，而不是让 VLM 单独承担时序控制"
  - "为了完全冻结视觉编码器并只训练语言词表"
  - "为了替代 Perceiver Resampler 的视觉 token 压缩功能"
answer: 1
explain: "OpenFlamingo 擅长单步视觉语言融合，但机器人操控需要历史状态和连续动作预测。policy head 正是用来建模 \(h_{t-1}\) 并输出 7-DoF 动作与夹爪状态。"
```
