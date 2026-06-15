### DynaWeb

```yaml
id: dynaweb
name: DynaWeb
full_name: "动态网页智能体 (DynaWeb)"
year: "2026"
org: "Stanford"
paper_url: "https://arxiv.org/abs/2601.22149"
category: "frontier_2026"
parent: "webarena_verified"
motivation: "基于想象的模型RL优化在线规划"
```

#### 📝 一句话总结

DynaWeb 提出用 learned web world model 作为合成网页环境来训练 web agent 的模型式强化学习框架，解决直接在真实网页上做在线 RL 成本高、慢且风险大的问题。它把想象 rollout 与真实专家轨迹混合，用序列级策略优化提升 WebArena 与 WebVoyager 上的长程操作成功率。

#### 🎯 核心要点

- 将网页任务形式化为 POMDP，观测用 URL 与 accessibility tree 表示，动作包括 click、type、scroll、goback、stop 等
- 训练 Web World Model 预测动作后的页面状态变化描述，并生成可被 agent 消费的下一步页面表示
- 让 agent 在 world model 中“做梦”生成多步 imagined rollouts，避免大量真实网页交互
- 将 imagined rollouts 与真实专家轨迹随机交织，提高训练稳定性和样本效率
- 采用 Group Sequence Policy Optimization，将重要性比率从 token 级提升到 trajectory/sequence 级
- 在 WebArena 上平均成功率达到 31.0%，相对 WebRL 26.7% 有明显提升；在 WebVoyager 上达到 38.7%

#### 🔬 深入细节

##### 框架总览

![DynaWeb 概览](https://arxiv.org/html/2601.22149v2/x1.png)
*图：DynaWeb 论文 HTML 中的公开图源。方法核心是使用 web world model 生成 imagined rollouts，并与真实专家轨迹混合进行模型式 RL。*

DynaWeb 的核心判断是：web agent 需要在线 RL 式的试错学习，但真实网页不是理想训练场。训练时直接操作 live web 可能触发购买、提交表单、改账户设置，也会遇到非确定性页面变化、IP 限制和延迟。DynaWeb 因此把网页世界模型从“推理时 lookahead 工具”提升为“训练时合成环境”。

##### 算法伪代码

```python
# DynaWeb: imagination-driven model-based RL
world_model = train_wwm(real_transitions)  # (obs, action) -> state-change + next_obs
policy = load_sft_web_agent()

for update in range(num_updates):
    imagined = []
    for task in sample_tasks():
        obs = task.initial_observation
        traj = []
        for t in range(max_dream_steps):
            thought, action = policy.sample(task.query, obs, traj)
            next_obs = world_model.predict(obs, action)
            traj.append((obs, thought, action, next_obs))
            obs = next_obs
            if is_terminal(obs):
                break
        reward = world_model.self_assess(task.query, traj)
        imagined.append((traj, reward))

    expert = sample_real_expert_trajectories(ratio=0.5)
    batch = mix(imagined, expert)
    loss = gspo_sequence_level_objective(policy, batch)
    update_policy(policy, loss)
```

##### 方法细节

论文把 web agent 任务建模为部分可观测 MDP。真实状态 \(s_t\) 是完整网页环境，但 agent 只能看到观测 \(o_t\)，通常包括当前 URL 和 accessibility tree。策略 \(\pi_\theta\) 根据用户 query、历史轨迹和系统提示生成思考链与浏览器动作：

$$
(r_t, a_t) \sim \pi_\theta(\cdot \mid q, o_t, h_t)
$$

传统在线 RL 需要从环境转移 \(s_{t+1}=P(s_t,a_t)\) 得到真实反馈。DynaWeb 用 Web World Model 近似这个转移：输入当前 accessibility tree 和动作，输出“状态变化描述”并把它应用到当前页面表示，得到下一步可见观测 \(\hat{o}_{t+1}\)。模型不直接生成整页文本，因为大多数网页动作只改变页面的一小部分；预测差异描述比重写整棵树更有信息量。

训练 world model 使用 NNetNav 等真实网页交互轨迹，先过滤缺失观测、无效动作和不一致状态，再用强模型生成每个转移的 reasoning trace 与 state-change description。训练好的 world model 就像一个可控网页服务器，agent 可以在其中反复 rollout，而不用访问真实网页。

为了把 imagined trajectory 变成 RL 信号，DynaWeb 对每条轨迹做任务完成自评，得到 terminal reward。然后把策略生成的 imagined rollouts 与真实专家轨迹混合。真实专家轨迹不依赖 world model，可作为高质量锚点，缓解 world model hallucination 和纯自举训练不稳定。实验中还会限制 dream 长度，例如最多 5 步，并在模型产生终止状态时提前停止。

优化目标采用 GSPO。PPO/GRPO 常在 token 级计算概率比，但 web agent 的动作和推理是长序列，token 级优势分配会很噪。GSPO 为整条序列计算一个几何平均概率比：

$$
\rho(\tau)=\exp\left(\frac{1}{|\tau|}\sum_i \log \frac{\pi_\theta(y_i \mid y_{<i})}{\pi_{\theta_{\mathrm{old}}}(y_i \mid y_{<i})}\right)
$$

然后用轨迹级 advantage 更新整条推理-动作序列，更适合稀疏终局奖励下的长程网页任务。

> 💡 关键：DynaWeb 不是只在推理时问 world model“下一步会怎样”，而是把 world model 当作训练环境，让策略在想象中产生可优化的多步经验。

#### 🧪 练习题

```yaml
question: "DynaWeb 为什么要把真实专家轨迹与 imagined rollouts 混合训练？"
options:
  - "为了让 world model 完全不需要训练"
  - "为了用高质量真实交互稳定学习，同时减少对昂贵真实网页交互的依赖"
  - "为了把所有网页任务改成离线分类任务"
  - "为了只提升推理时搜索速度，不改变策略参数"
answer: 1
explain: "Imagined rollouts 提供可扩展经验，但可能受 world model 误差影响；专家轨迹提供真实锚点，提高稳定性和样本效率。"
```
