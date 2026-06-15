### FeUdal Networks — 封建网络 (FeUdal Networks)

```yaml
id: feudal
name: FeUdal Networks
full_name: "封建网络 (FeUdal Networks)"
year: "2017"
org: DeepMind
paper_url: https://arxiv.org/abs/1703.01161
category: skill_hierarchical
parent: option_critic
motivation: "主从架构分离目标设定与执行"
```

#### 📝 一句话总结

FeUdal Networks 用 Manager-Worker 架构把“在抽象状态空间中设定方向性目标”和“把目标落地为动作”分开，让高层专注长程目标，低层通过内在奖励学习执行。

#### 🎯 核心要点

- **层次结构**：Manager 每隔较慢时间尺度产生 latent goal，Worker 每个环境步根据 goal 输出原始动作。
- **目标形式**：高层目标不是离散 option，也不是环境坐标，而是特征空间中的方向向量，表示希望未来状态表征朝哪个方向变化。
- **信用分配**：Worker 通过目标达成的内在奖励训练；Manager 主要由外部任务奖励训练，并通过 transition policy gradient 处理长程依赖。
- **梯度隔离**：论文强调不让 Worker 的梯度直接穿回 Manager，避免低层动作损失扭曲高层语义。
- **实验意义**：在 Atari 和 DeepMind Lab 的长程任务中，FuN 展示了层次目标设定对稀疏奖励和记忆任务的帮助。

#### 🔬 深入细节

##### 架构示意

![FeUdal Networks architecture](https://ar5iv.labs.arxiv.org/html/1703.01161/assets/x1.png)

图中可以看到共享感知模块、Manager、Worker 与目标调制动作层。Manager 生成的 goal 不是直接动作，而是传给 Worker 的条件信号。

##### Manager 与 Worker

设感知网络把观测编码为 latent state $s_t$。Manager 在较慢时间尺度上输出 goal：

$$
g_t = \frac{h_t^M}{\|h_t^M\|_2},
$$

其中 $h_t^M$ 来自 Manager 的循环网络状态。Worker 接收当前状态和若干最近 goals，生成动作策略 $\pi_W(a_t|s_t,g_t)$。Worker 的动作 logits 可理解为由状态相关的动作嵌入矩阵 $U_t$ 与 goal embedding $w_t$ 相乘得到：

$$
\pi_W(a_t|s_t,g_t) = \text{softmax}(U_t w_t).
$$

这个结构让 goal 改变动作偏好，而不是简单拼接到输入后交给普通 MLP。

##### 内在奖励

Worker 的学习信号来自 goal 与实际状态变化方向的对齐。若 $c$ 是高层时间跨度，内在奖励可概括为

$$
r_t^I = \frac{1}{c}\sum_{i=1}^{c}
\cos(s_t - s_{t-i}, g_{t-i}).
$$

也就是说，如果 Worker 的动作让 latent state 按照 Manager 指定方向移动，它就得到正奖励。这个设计把高层 goal 转换成低层可密集学习的信号，使 Worker 不必等待稀疏外部奖励。

##### Manager 的长程学习

Manager 不直接被 Worker 的动作损失训练，而是通过外部回报学习“什么方向有助于任务”。论文提出 transition policy gradient，将 Manager 的 goal 与未来 latent transition 的方向联系起来。直观地说，如果某个 goal 之后的未来状态变化带来了高外部回报，那么 Manager 应该更倾向输出类似方向。

Manager 还使用 dilated LSTM 增强长程记忆，减少每一步都反向传播造成的短视问题。这样，高层既能看到较长历史，又不会被低层动作频率淹没。

##### 与 Option-Critic 的差异

Option-Critic 学习的是离散 option 及其终止概率，核心问题是“哪个 option 继续执行”。FuN 则没有显式终止函数，而是让 Manager 周期性地产生连续 goal。它把层次结构从“选择一个子策略”改成“给低层一个方向性控制信号”。

这种连续目标形式在高维控制和像素输入上更灵活，但解释性弱于传统 options。一个 latent goal 未必对应人类能命名的技能，它只需要在表征空间中对 Worker 有用。

##### 算法伪代码

```text
Initialize shared encoder, Manager M, Worker W.

for each rollout:
    encode observation o_t into latent state s_t
    Manager produces normalized goal g_t at a slower temporal scale
    Worker receives s_t and recent goals
    Worker samples primitive action a_t
    environment returns extrinsic reward r_t and next observation

    compute intrinsic reward r_t^I from cosine alignment:
        direction = s_t - s_{t-c}
        r_t^I = cosine(direction, previous Manager goal)

    update Worker to maximize intrinsic reward and action return
    update Manager with extrinsic reward using transition policy gradient
    stop Worker gradients from directly updating Manager

Output: hierarchical Manager-Worker policy
```

##### 适用与局限

FuN 适合存在长程依赖、稀疏外部奖励、但可以通过状态表征变化定义进展的任务。它的主要风险在于 latent space 质量：如果编码器没有学到与任务进展相关的表示，Manager 的方向目标就可能变成噪声。另外，goal 的时间跨度 $c$ 是重要超参，太短会退化成普通低层控制，太长则让 Worker 难以完成目标。

#### 🧪 练习题

```yaml
- question: "FeUdal Networks 中 Manager 输出的 goal 主要表示什么？"
  options:
    A: "原始动作编号"
    B: "特征空间中的目标方向"
    C: "环境奖励函数"
    D: "终止概率"
  answer: B
  explain: "Manager 输出的是 latent state 空间中的方向性目标，Worker 根据该目标执行动作。"
- question: "Worker 的内在奖励通常来自什么？"
  options:
    A: "状态变化方向与 Manager goal 的余弦相似度"
    B: "随机噪声大小"
    C: "高层策略熵的负值"
    D: "replay buffer 的容量"
  answer: A
  explain: "Worker 被奖励去实现 Manager 指定的状态表征变化方向。"
```
