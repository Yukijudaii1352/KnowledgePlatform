### MBPO — 基于模型的策略优化 (Model-Based Policy Optimization)

```yaml
id: mbpo
name: MBPO
full_name: 基于模型的策略优化 (Model-Based Policy Optimization)
year: '2019'
org: UC Berkeley
paper_url: https://arxiv.org/abs/1906.08253
category: world_model
parent: sac
motivation: 短步长模型rollout平衡偏差与效率
```

#### 📝 一句话总结

MBPO 提出只在学习到的动力学模型中生成短步长 rollout，并把这些模型样本与真实样本混合训练 SAC，解决模型式 RL 中“样本便宜但误差会随 rollout 长度累积”的核心权衡。它用模型 ensemble 和短 horizon 让模型生成数据足够有用，同时避免长程模型偏差破坏策略优化。

#### 🎯 核心要点

- **短模型 rollout**：从真实 replay buffer 的状态出发，只展开 \(k\) 步模型轨迹，通常 \(k\) 很小
- **模型 ensemble**：训练多个 probabilistic dynamics models，降低单模型过拟合并估计不确定性
- **Dyna 风格混合数据**：真实环境样本进入 \(\mathcal{D}_{env}\)，模型生成样本进入 \(\mathcal{D}_{model}\)，SAC 从混合 buffer 更新
- **理论分析**：论文分析模型误差、策略分布偏移和 rollout 长度对单调改进界的影响
- **模型使用调度**：训练早期使用更短 rollout，随模型变准逐渐增加 rollout horizon
- **低模型偏差优先**：MBPO 不追求完全用模型规划，而是让模型只负责补充局部 transition
- **基准验证**：在 MuJoCo 连续控制任务上以远少于无模型 SAC 的真实交互达到强性能

#### 🔬 深入细节

##### 模型 rollout 示意图

![MBPO 模型使用与 rollout 分析](https://ar5iv.labs.arxiv.org/html/1906.08253/assets/x1.png)

*图：MBPO 论文围绕“何时信任模型”分析 rollout 长度与模型误差的权衡，核心结论是短 rollout 能提供样本效率而不过度放大模型偏差。*

##### 算法伪代码

```python
# Model-Based Policy Optimization
initialize SAC policy pi, Q-functions
initialize environment replay buffer D_env
initialize model replay buffer D_model
initialize probabilistic dynamics ensemble {p_theta_i}

for epoch in range(num_epochs):
    # 真实环境交互
    for step in range(env_steps_per_epoch):
        a = pi.sample(s)
        s_next, r, done = env.step(a)
        D_env.add(s, a, r, s_next, done)
        s = reset_if_done(s_next, done)

    # 训练动力学模型 ensemble
    for model_update in range(model_train_steps):
        batch = D_env.sample()
        update each p_theta_i to maximize log p(s_next, r | s, a)

    # 从真实状态启动短模型 rollout
    for rollout in range(num_model_rollouts):
        s_model = D_env.sample_state()
        for h in range(k):  # k is short
            a_model = pi.sample(s_model)
            model = random_choice(ensemble)
            s_next_model, r_model = model.predict(s_model, a_model)
            D_model.add(s_model, a_model, r_model, s_next_model)
            s_model = s_next_model

    # 用真实 + 模型数据训练 SAC
    for grad_step in range(policy_updates):
        batch = mix_sample(D_env, D_model)
        update_SAC(pi, Q, batch)
```

##### 动机与背景

基于模型的强化学习有一个诱人的优势：一旦学到环境动力学，模型内部生成 transition 的成本远低于真实交互。但神经动力学模型不可避免有误差，长 rollout 会让误差逐步累积，最终把策略训练到真实环境中不存在或不可靠的状态上。

MBPO 的核心判断是：模型最可信的是局部一步或短步转移，而不是长程预测。因此它不让模型承担完整规划任务，而是从真实 replay buffer 中的状态出发，生成短 horizon 的合成样本。真实状态作为起点限制了分布偏移，短 horizon 限制了复合误差。

动力学模型通常预测状态差分和奖励：

$$p_\theta(s_{t+1}, r_t \mid s_t, a_t)$$

并使用负对数似然训练。采用 ensemble 后，每个模型 \(p_{\theta_i}\) 在 bootstrap 数据或不同初始化下学习，生成 rollout 时随机选择一个模型。这样既能提升鲁棒性，也能在实践中减少单个模型错误被策略利用的风险。

##### 偏差-方差权衡

MBPO 的理论分析可简化理解为：模型 rollout 越长，能生成的数据越多、策略更新越接近 on-policy，但模型偏差项会按 horizon 累积；rollout 越短，模型偏差小，但补充样本有限。短 rollout 是二者之间的实用平衡。

策略训练仍使用 SAC 的最大熵目标：

$$J(\pi)=\mathbb{E}\left[\sum_t r_t + \alpha \mathcal{H}(\pi(\cdot|s_t))\right]$$

不同的是，SAC 的 replay batch 现在可同时包含真实 transition 和模型 transition。模型样本扩大了数据量，使 Q 函数和策略能更频繁更新；真实样本持续校正模型和策略，防止偏差失控。

##### 与传统模型式方法的区别

早期 Dyna 方法同样混合真实与模型样本，但在高维连续控制中，模型误差和策略分布偏移会更严重。PETS 等方法强调模型预测控制（MPC），每一步在模型中规划动作；MBPO 则保持一个 amortized policy，用模型主要提升 off-policy actor-critic 的样本效率。

与纯无模型 SAC 相比，MBPO 增加了模型训练成本，但显著减少真实环境步数。与长 horizon 模型规划相比，它牺牲了一部分模型利用率，换来更稳的策略优化。这也是 MBPO 影响后续 Dreamer 系列的关键思想：世界模型很有用，但必须限制和管理模型误差进入策略学习的方式。

> 💡 关键：MBPO 的“模型”不是为了完全替代环境，而是为了在可信的短局部范围内制造额外训练样本。

#### 🧪 练习题

```yaml
question: "MBPO 为什么偏好从真实 replay buffer 状态启动短步长模型 rollout？"
options:
  - "因为短 rollout 可以完全消除模型误差"
  - "因为真实起点减少状态分布偏移，短 horizon 限制模型误差累积"
  - "因为 SAC 只能处理长度为 1 的轨迹"
  - "因为 ensemble 模型无法预测奖励"
answer: 1
explain: "模型误差会随 rollout 长度累积；从真实状态出发并限制 horizon，可以在获得合成样本效率的同时控制模型偏差。"
```
