### NavThinker — 导航思考者 (Social Navigation via World Models)

```yaml
id: navthinker
name: NavThinker
full_name: "导航思考者 (Social Navigation via World Models)"
year: "2026.03"
org: "Zhejiang University"
paper_url: "https://arxiv.org/abs/2603.15359"
category: "embodied"
parent: "vjepa21"
motivation: "深度特征空间前瞻思考降低碰撞率"
```

#### 📝 一句话总结

NavThinker 提出面向社交导航的动作条件世界模型，在 Depth Anything V2 patch 特征空间中预测未来场景几何和行人轨迹，并把想象结果注入 DD-PPO 策略，解决机器人在人群中只看当前观测、缺乏前瞻交互推理的问题。

#### 🎯 核心要点

- 将社交导航建模为部分可观测 POMDP，显式处理机器人动作与行人运动相互耦合的问题。
- 世界模型运行在冻结 Depth Anything V2 的 patch feature 空间，用 causal Transformer 做动作条件自回归预测。
- 多头解码器从未来 latent 中预测深度图、行人未来轨迹和奖励，使 latent imagination 与可通行几何和交互风险对齐。
- 策略端使用 ResNet+GRU 编码当前深度观测，并为所有候选离散动作查询世界模型，获得 look-ahead future features。
- 训练采用 DD-PPO，同时使用两种前瞻信号：动作条件未来特征融合、基于预测行人轨迹的 social reward shaping。
- 在 Social-HM3D 单机器人、多机器人设置中超过 A*/ORCA/Habitat/Falcon，并零样本迁移到 Social-MP3D；还在 Unitree Go2 上做真实部署。

#### 🔬 深入细节

![NavThinker 架构图](https://arxiv.org/html/2603.15359v2/x2.png)
*图：NavThinker 由动作条件场景-交互世界模型和 imagination-augmented planner policy 两部分组成。*

```python
# NavThinker 世界模型与策略训练伪代码
def train_world_model(batch):
    z = depth_anything_v2(batch.depth_frames)       # frozen DA-V2 patch tokens
    action_tokens = embed(batch.actions)
    z_pred = causal_transformer(z.history, action_tokens)
    depth_pred = depth_decoder(z_pred)
    traj_pred = human_traj_decoder(z_pred)
    reward_pred = reward_decoder(z_pred)
    loss = latent_loss(z_pred, z.target) \
         + depth_loss(depth_pred, batch.future_depth) \
         + traj_loss(traj_pred, batch.future_humans) \
         + reward_loss(reward_pred, batch.reward)
    update(world_model, loss)

def act_with_imagination(obs, goal):
    h = gru(resnet(obs.depth), obs.prev_action)
    imagined = []
    for a in discrete_actions:
        z_next = world_model.transition(obs.depth_latent, action=a)
        imagined.append(z_next)
    policy_input = fuse(h, concat(imagined), goal)
    return actor_critic(policy_input)  # DD-PPO update
```

社交导航的难点是“预测”和“规划”不能拆开做。若把行人预测看成固定输入，机器人自己的动作对行人的影响就被忽略；若只用 RL 从经验中隐式学习，又很难在遮挡、盲角和密集交互中提前规避冲突。NavThinker 的核心假设是：策略在执行前应该比较不同动作导致的未来场景，从而把未来交互风险纳入当前决策。

论文将机器人状态、静态场景和行人状态拆成潜在状态 \(s_t=(p_t, m_t, h_t^1,\dots,h_t^N)\)，但机器人只能看到局部深度图 \(d_t\)、目标 \(g_t\) 和自身位姿。世界模型用冻结 DA-V2 编码深度：

$$
z_t = E_{\text{DA-V2}}(d_t),
\qquad
\hat z_{t+1}^{(a)} = F_\theta(z_{t-C:t}, a_t),
$$

其中动作 token 被追加到 patch 序列中，causal sliding-window mask 保证模型按时间自回归地想象未来。冻结深度基础模型的好处是 latent 自带几何结构，比从 RGB/深度端到端学动态更稳，也更容易迁移到新场景。

为了让 latent 不只“像特征”，还对导航有用，NavThinker 给预测 latent 接了三个任务头：

$$
\mathcal{L}
= \mathcal{L}_{\text{latent}}
+ \lambda_d \mathcal{L}_{\text{depth}}
+ \lambda_h \mathcal{L}_{\text{traj}}
+ \lambda_r \mathcal{L}_{\text{reward}} .
$$

深度重建让模型关注可通行几何，行人轨迹预测让模型关注动态交互，奖励头把未来与任务收益关联起来。论文消融显示，加入深度和轨迹解码器能提升 latent cosine similarity、降低 depth RMSE 和行人轨迹误差。

策略学习阶段，NavThinker 不让策略完全依赖生成的 latent，而是保持当前真实观测编码 \(h_t\)，再融合每个候选动作的 imagined future：

$$
\pi(a_t\mid o_{\le t}, g_t)
= \pi_\psi\left(h_t, \mathrm{Fuse}\left(\{\hat z_{t+1}^{(a)}\}_{a\in\mathcal{A}}\right), g_t\right).
$$

同时，奖励中加入预测行人轨迹带来的 social cost，使策略在训练时为“未来可能碰撞/侵犯个人空间”的动作付出代价。这样设计的直觉很直接：look-ahead feature 负责让 actor 看到不同动作的后果，trajectory reward shaping 负责让 critic/return 把社会合规性量化进优化目标。

与 ORCA/A* 等规则规划相比，NavThinker 不需要手工规定所有人群交互；与 Falcon 这类未来感知 RL 相比，它的未来来自动作条件世界模型，而不是与动作弱耦合的静态预测。论文结果显示，单机器人 Social-HM3D 上 NavThinker SR/SPL 为 59.46/55.00，并把 human collision 降到 39.09；多机器人设置也在团队成功率和碰撞上取得更好表现。

#### 🧪 练习题

```yaml
question: "NavThinker 为什么选择在 Depth Anything V2 patch feature 空间训练世界模型？"
options:
  - "为了完全避免使用深度图输入"
  - "为了获得与几何结构对齐、可迁移的空间表征，再预测动作条件未来"
  - "为了把离散动作变成连续电机扭矩"
  - "为了让策略不再需要强化学习训练"
answer: 1
explain: "冻结 DA-V2 patch 特征保留丰富几何信息，世界模型在该空间做动作条件自回归预测，再用深度/轨迹/奖励头对齐导航风险。"
```
