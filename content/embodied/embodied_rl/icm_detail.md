### ICM — 内在好奇心模块 (Intrinsic Curiosity Module)

```yaml
id: icm
name: ICM
full_name: "内在好奇心模块 (Intrinsic Curiosity Module)"
year: "2017"
org: UC Berkeley
paper_url: https://arxiv.org/abs/1705.05363
category: reward_design
parent: "—"
motivation: "预测误差产生好奇心内在奖励"
```

#### 📝 一句话总结

ICM 用特征空间中的前向动力学预测误差作为内在奖励，并用逆动力学学习只关注可由智能体动作影响的状态表示，从而驱动稀疏奖励环境中的探索。

#### 🎯 核心要点

- **核心问题**：外部奖励稀疏时，智能体缺少探索方向；直接预测像素误差又容易被不可控噪声吸引。
- **表示学习**：ICM 通过逆动力学任务学习特征 $\phi(s)$，让表示保留与动作控制相关的信息，忽略无关背景变化。
- **好奇心奖励**：在该特征空间中预测下一状态，预测误差越大，说明转移越新颖或模型越不熟悉，内在奖励越高。
- **联合训练**：策略最大化外部奖励与内在奖励之和；ICM 自身同时优化 inverse model 与 forward model。
- **影响**：ICM 是后续探索奖励、prediction-error curiosity 和 embodied exploration 方法的重要基础。

#### 🔬 深入细节

##### 模块示意

![Intrinsic Curiosity Module](https://ar5iv.labs.arxiv.org/html/1705.05363/assets/x1.png)

图中，agent 执行动作后收到外部奖励，同时 ICM 根据状态转移产生 curiosity reward。ICM 内部包含特征编码器、逆模型和前向模型。

##### 为什么不用原始像素误差

如果直接预测下一帧像素，智能体可能被电视噪声、背景闪烁或随机物体吸引，因为这些信号难以预测但与控制无关。ICM 的解决方案是学习一个只强调可控因素的特征空间：

$$
\phi_t=\phi(s_t), \quad \phi_{t+1}=\phi(s_{t+1}).
$$

这个特征不是通过重建图像学习，而是通过逆动力学学习。只有那些有助于从 $(s_t,s_{t+1})$ 推断动作 $a_t$ 的信息才会被保留。

##### 逆动力学模型

逆模型预测导致状态变化的动作：

$$
\hat a_t = g_\psi(\phi(s_t),\phi(s_{t+1})).
$$

离散动作时，损失通常是交叉熵：

$$
\mathcal{L}_I
= -\log p_\psi(a_t|\phi(s_t),\phi(s_{t+1})).
$$

如果某个环境变化与 agent 动作无关，它无法帮助预测 $a_t$，因此不会被编码器重点保留。这是 ICM 抵抗不可控噪声的关键。

##### 前向模型与内在奖励

前向模型根据当前特征和动作预测下一特征：

$$
\hat \phi(s_{t+1}) = f_\eta(\phi(s_t),a_t).
$$

前向损失为

$$
\mathcal{L}_F =
\frac{1}{2}\|\hat \phi(s_{t+1})-\phi(s_{t+1})\|_2^2.
$$

ICM 将同一个误差作为内在奖励：

$$
r_t^i =
\frac{\eta_r}{2}
\|\hat \phi(s_{t+1})-\phi(s_{t+1})\|_2^2.
$$

策略优化时使用总奖励

$$
r_t = r_t^e + r_t^i,
$$

其中 $r_t^e$ 是环境外部奖励。未被模型掌握的新转移会产生较大 $r_t^i$，推动 agent 去探索。

##### 联合目标

ICM 模块本身的训练目标是

$$
\min_{\phi,\psi,\eta}
(1-\beta)\mathcal{L}_I+\beta\mathcal{L}_F.
$$

策略部分则可使用 A3C 或其他 RL 算法最大化累计总奖励。论文原始实验使用 A3C，并在 VizDoom 和 Super Mario Bros 等稀疏奖励场景中验证：即使没有外部奖励，ICM 也能推动 agent 学会移动、探索地图和发现新区域。

##### 与后续方法的关系

ICM 的好奇心来自“模型还预测不好”的区域，因此它可能在随机性强、不可学习的区域过度停留。后续方法如 RND、episodic curiosity、information gain 等从不同角度处理这个问题。尽管如此，ICM 提出的“在可控特征空间中计算 prediction error”仍是探索奖励设计的经典模板。

##### 算法伪代码

```text
Initialize policy pi, value function V, encoder phi,
inverse model g, and forward model f.

for each rollout:
    observe state s_t
    sample action a_t ~ pi(. | s_t)
    execute action and observe extrinsic reward r_e and next state s_{t+1}

    encode features phi_t = phi(s_t), phi_next = phi(s_{t+1})
    inverse model predicts a_t from (phi_t, phi_next)
    forward model predicts phi_next from (phi_t, a_t)

    compute forward error:
        r_i = eta_r / 2 * ||f(phi_t, a_t) - phi_next||^2
    train ICM with inverse loss and forward loss
    train policy with reward r_e + r_i

Output: exploration policy driven by intrinsic curiosity
```

##### 适用边界

ICM 适合稀疏奖励、状态变化主要受 agent 控制、且探索新转移有助于任务完成的环境。如果环境存在大量 agent 无法影响但可预测困难的随机因素，ICM 仍可能受到干扰。实际具身系统常会把 ICM 与状态过滤、episodic novelty 或任务约束结合，避免追逐无意义的新奇性。

#### 🧪 练习题

```yaml
- question: "ICM 的内在奖励来自哪里？"
  options:
    A: "特征空间中前向模型预测下一状态的误差"
    B: "人工设定的每步固定奖励"
    C: "判别器对技能编号的分类准确率"
    D: "高层 option 的终止概率"
  answer: A
  explain: "ICM 把 forward model 在可控特征空间中的预测误差作为 curiosity reward。"
- question: "ICM 为什么使用逆动力学来学习特征？"
  options:
    A: "为了保留与 agent 动作相关的可控因素，弱化无关噪声"
    B: "为了预测任务语言描述"
    C: "为了删除前向模型"
    D: "为了保证所有状态奖励相同"
  answer: A
  explain: "逆动力学要求从状态转移推断动作，因此鼓励编码器关注可由动作影响的变化。"
```
