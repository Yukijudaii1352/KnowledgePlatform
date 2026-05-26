### DQN

```yaml
id: dqn
name: DQN
full_name: Deep Q-Network
year: '2015'
org: DeepMind
paper_url: https://www.nature.com/articles/nature14236
category: core
parent: —
motivation: 深度Q网络实现人类水平游戏
```

#### 📝 一句话总结

DQN 将卷积神经网络、经验回放和目标网络结合到 Q-learning 中，把 Atari 原始像素直接映射为各动作的 \(Q\) 值，首次在统一架构和固定超参数下实现了跨 49 个游戏的人类水平强化学习控制。2015 年 Nature 版本在 2013 年 workshop 论文基础上补全了目标网络、稳定化训练细节与大规模评测，奠定了深度强化学习的标准范式。

#### 🎯 核心要点

- 端到端像素控制：输入为 \(84 \times 84 \times 4\) 的连续帧堆叠，输出为每个合法动作的 \(Q\) 值
- 卷积 Q 网络：3 层卷积 + 1 层 512 维全连接 + 动作线性输出层，用表示学习替代手工特征
- 经验回放：把转移样本写入 replay memory，并从中均匀随机采样 mini-batch，打破时间相关性
- 目标网络：每隔 \(C\) 步复制一次在线网络参数，用冻结的 \(\hat{Q}\) 生成 bootstrap target，降低目标漂移
- 奖励裁剪：训练时把正奖励裁成 \(+1\)、负奖励裁成 \(-1\)，统一不同游戏的 reward scale
- 误差裁剪：把 TD 误差裁到 \([-1, 1]\) 之外时转成绝对值型梯度，提升优化稳定性
- 最小先验知识：同一网络结构、同一学习算法、同一超参数直接迁移到 49 个 Atari 游戏

#### 🔬 深入细节

##### 核心示意图

![DQN 卷积 Q 网络结构图](https://media.springernature.com/m312/springer-static/image/art%3A10.1038%2Fnature14236/MediaObjects/41586_2015_BFnature14236_Fig1_HTML.jpg)
*图：Nature 2015 论文中的 DQN 网络结构。输入是预处理后的 \(84 \times 84 \times 4\) 图像堆叠，经过 3 层卷积和 2 层全连接后，一次前向传播直接输出所有动作的 \(Q\) 值。*

##### 算法伪代码

```python
# DQN with experience replay and target network
replay = ReplayBuffer(capacity=N)
Q = ConvQNetwork()
Q_target = copy(Q)

for episode in range(M):
    s = env.reset()
    phi = preprocess_and_stack(s)  # 84x84x4

    for t in range(T):
        if random() < epsilon:
            a = random_action()
        else:
            a = argmax_a(Q(phi)[a])

        s_next, r, done = env.step(a)
        phi_next = preprocess_and_stack(s_next)
        replay.add(phi, a, r, phi_next, done)

        batch = replay.sample(batch_size)
        targets = []
        for phi_j, a_j, r_j, phi_next_j, done_j in batch:
            if done_j:
                y_j = r_j
            else:
                y_j = r_j + gamma * max(Q_target(phi_next_j))
            targets.append(y_j)

        loss = mean((targets - Q(batch.phi, batch.a)) ** 2)
        optimize(loss)

        if step % C == 0:
            Q_target.load_state_dict(Q.state_dict())

        phi = phi_next
        if done:
            break
```

##### 动机与背景

传统 Q-learning 在低维状态空间中可以直接维护 \(Q(s, a)\) 表，但在 Atari 这类高维视觉任务中，状态是 \(210 \times 160\) 的原始 RGB 图像，既无法枚举，也无法依赖手工特征稳定泛化。DQN 的核心目标，就是让一个卷积网络同时承担“状态表示学习”和“动作价值估计”两件事，把强化学习第一次真正推进到大规模视觉控制场景。

但一旦把非线性神经网络塞进 Q-learning，训练立刻会变得不稳定。原因主要有三类：第一，连续时间步样本高度相关，违反了 SGD 假设的近似独立同分布；第二，网络一更新，策略就变，数据分布也跟着漂移；第三，bootstrap target 本身依赖当前网络，容易出现“自己追自己”的震荡。这三点正是 DQN 要解决的核心工程难题。

##### 核心机制 1：把 Q-learning 写成可微目标

论文将动作价值函数参数化为 \(Q(s, a; \theta)\)，并把单步 TD 更新改写为最小化平方 Bellman 误差：

$$
L_i(\theta_i) =
\mathbb{E}_{(s,a,r,s') \sim U(D)}
\left[
\left(y_i - Q(s, a; \theta_i)\right)^2
\right],
$$

其中 target 为

$$
y_i =
\begin{cases}
r, & s' \text{ 为终止状态} \\
r + \gamma \max_{a'} \hat{Q}(s', a'; \theta_i^-), & \text{否则}
\end{cases}
$$

这里最关键的变化有两个。第一，不再对每个状态动作单独更新，而是用卷积网络一次性输出所有动作的价值，从而能对视觉输入做泛化。第二，target 中使用冻结的目标网络 \(\hat{Q}\)，而不是直接用当前在线网络 \(Q\)。这让优化目标在若干步内近似固定，显著缓解了 bootstrap 造成的正反馈震荡。

##### 核心机制 2：经验回放与目标网络如何稳定训练

经验回放（experience replay）是 DQN 的第一根支柱。算法把每一步转移 \((s_t, a_t, r_t, s_{t+1})\) 存进 replay memory，并从中均匀随机抽样 mini-batch。这样做的作用不是“为了复用数据”这么简单，更重要的是把高度相邻、强相关的在线轨迹打散，从而让梯度估计更接近独立采样。论文明确指出，这既提升了样本效率，也降低了更新方差。

目标网络（target network）是第二根支柱。论文做法是每隔 \(C\) 步把在线网络参数复制给目标网络一次，在这 \(C\) 步里都用旧参数产生 target。直觉上，这相当于给 Bellman target 增加一个时间延迟，让“被优化的函数”和“定义优化目标的函数”不要在同一时间尺度上一起快速漂移。DQN 后续所有重要分支，包括 Double DQN、Rainbow、Dueling DQN，几乎都保留了这个机制。

##### 输入处理、网络结构与训练细节

输入端也有一套非常关键的预处理。论文先对当前帧和前一帧做逐像素最大值，以消除 Atari 精灵闪烁；再抽取亮度通道并缩放到 \(84 \times 84\)；最后堆叠最近 \(m=4\) 帧，构造近似马尔可夫状态。这样做的核心原因是单帧图像无法表达速度与运动方向，而 4 帧堆叠可以把短时动态信息显式编码进去。

网络本身采用标准而高效的卷积结构：第一层 32 个 \(8 \times 8\) 卷积核、stride 4；第二层 64 个 \(4 \times 4\) 卷积核、stride 2；第三层 64 个 \(3 \times 3\) 卷积核、stride 1；随后是 512 维全连接层和动作输出层。训练时还加入了两个常被忽略但很重要的稳定化技巧：一是 reward clipping，把所有正奖励压成 \(+1\)、负奖励压成 \(-1\)；二是 TD error clipping，把过大的平方误差梯度切换到绝对值型梯度区间，本质上类似后来的 Huber loss 思路。

> 💡 关键：DQN 的真正突破不只是“用 CNN 近似 \(Q\) 函数”，而是同时用 replay memory 和 target network 解决了深度网络进入 bootstrap RL 后最致命的分布漂移与目标漂移问题。

##### 与此前方法的区别

在 DQN 之前，强化学习与深度学习的结合通常停留在“先学特征，再做 RL”或者“小网络 + 小任务”的阶段。DQN 直接把原始像素作为输入，用统一网络结构学习多种 Atari 游戏策略，证明了深度表示学习可以和时序差分学习结合并规模化工作。它把强化学习从依赖手工状态设计的阶段，推进到依赖表示学习的阶段，这也是后来 AlphaGo、MuZero、Decision Transformer、RLHF 一系列路线的基础前提。

#### 🧪 练习题

```yaml
question: "DQN 中引入目标网络（target network）的主要作用是什么？"
options:
  - "增加动作空间大小，使网络能处理更多动作"
  - "让输入从单帧图像变为四帧堆叠"
  - "延迟 bootstrap target 的变化，减少训练震荡和发散"
  - "把离策略学习改成在策略学习"
answer: 2
explain: "目标网络在若干步内保持冻结，用旧参数生成 y_j，从而避免在线网络更新后 target 同步剧烈漂移，这是 DQN 稳定训练的关键机制之一。"
```
