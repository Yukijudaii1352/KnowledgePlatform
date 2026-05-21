### ReMax · 贪心基线强化学习

```yaml
id: remax
name: ReMax
full_name: 贪心基线强化学习 (REINFORCE with Max Baseline)
year: "2023.10"
org: CUHK-Shenzhen / Nanjing University / Polixir.ai
paper_url: https://arxiv.org/abs/2310.10505
category: online_rl
parent: ppo
motivation: 移除Critic节省50%显存
```

#### 📝 一句话总结
ReMax 观察到 RLHF 具有“快速仿真、确定性转移、轨迹级奖励”三项特殊结构，因此不再沿用通用 RL 的 PPO+value model 方案，而是回到 REINFORCE，并用同一 prompt 下的贪心响应作为 baseline 做方差约简，在大幅降低显存和训练时间的同时保持甚至超过 PPO 的对齐效果。

#### 🎯 核心要点
- 重新审视 RLHF 的任务结构，指出 PPO 对 LLM 对齐来说过于复杂，value model 带来大量显存和调参负担
- 基于 REINFORCE 构造无偏策略梯度，不再训练额外 critic / value model
- 关键方差约简技巧：对每个 prompt 额外生成一个 greedy baseline response，用 reward 差值替代原始 reward
- 保留 reference model 用于 KL regularization，但移除所有与 value model 相关的模块
- 相比 PPO 能少掉至少 4 个关键超参数，例如 clip ratio、GAE 系数、value lr、off-policy epoch 数
- 在 7B 模型上约节省 46% GPU 显存，训练吞吐约为 PPO 的 1.6 倍
- 在 Mistral-7B 上取得 94.78% AlpacaEval 胜率和 7.739 MT-Bench 分数，论文报告为当时开源 7B 模型新 SOTA

#### 🔬 深入细节

##### 1. 核心框架图

![PPO 与 ReMax 的模块对比](https://arxiv.org/html/2310.10505v4/x1.png)

*图：论文 Figure 1。ReMax 保留 policy model、reward model 和 reference model，但去掉了 PPO 中占大头的 value model 及其训练链路。*

##### 2. 核心算法伪代码

```python
# ReMax for RLHF
for prompt in dataset:
    # 1. 从当前策略采样一个随机响应
    seq = lm.sample(prompt, greedy=False)

    # 2. 对同一 prompt 再生成一个贪心响应，作为 baseline
    seq_max = lm.sample(prompt, greedy=True)

    # 3. 用 reward 差值做 advantage-like 标量
    rew = rm(prompt, seq) - rm(prompt, seq_max)

    # 4. 计算随机响应的 token log-prob
    logp = lm.inference(prompt, seq)

    # 5. REINFORCE 更新
    loss = -(logp.sum(dim=-1) * rew).mean()
    lm.minimize(loss)
```

##### 3. 为什么 PPO 在 RLHF 里“杀鸡用牛刀”

ReMax 的出发点不是单纯想做一个更轻量的 PPO 变体，而是从任务结构上质疑 PPO 是否真的是 RLHF 的最佳选择。论文指出，RLHF for LLMs 与经典强化学习环境有三个本质区别：

- **fast simulation**：生成一条完整 response 的代价相对低，不像机器人或游戏环境那样需要昂贵交互；
- **deterministic transitions**：下一个状态就是“已有上下文 + 当前生成 token”，不存在环境随机动力学；
- **trajectory-level rewards**：reward model 通常只在整条 response 结束后给一个整体分数，而不是每步 dense reward。

这三点意味着，PPO 在通用 RL 中引入的许多复杂机制，在 RLHF 里并没有被充分利用。特别是 value model：在经典 RL 中，它承担长期回报估计、bootstrapping 和方差控制的重要作用；但在 RLHF 这种 deterministic、terminal-reward 的 setting 下，它的收益并没有大到足以覆盖额外代价。作者认为，PPO 更像是“能用”，而不是“最合适”。

论文因此回到更朴素的策略梯度观点：既然环境转移不随机、奖励在轨迹末端一次性给出，那么用 trajectory-level REINFORCE 就已经能够构造无偏梯度，真正的问题只剩下 **如何把方差压下来**。

##### 4. 从 REINFORCE 到 ReMax：用贪心响应做 baseline

标准 REINFORCE 的形式是：

$$
\nabla_\theta J(\theta)
=
\mathbb{E}_{y\sim\pi_\theta(\cdot|x)}
\left[
r(x,y)\,\nabla_\theta \log \pi_\theta(y|x)
\right].
$$

它是无偏的，但 notoriously 高方差。原因在于不同 prompt 上 reward scale 可能差异极大，而 open-ended generation 的随机性又会进一步放大梯度波动。ReMax 的关键观察是：在 RLHF 中，我们可以对同一个 prompt 很便宜地再生成一条 **greedy response**，把它当作 control variate / baseline。

于是论文把更新量改成：

$$
\nabla_\theta J_{\mathrm{ReMax}}(\theta)
=
\mathbb{E}
\left[
\bigl(r(x,y)-r(x,y_{\max})\bigr)\,
\nabla_\theta \log \pi_\theta(y|x)
\right],
$$

其中 \(y\) 是随机采样响应，\(y_{\max}\) 是当前模型在同一 prompt 下的贪心输出。这个 baseline 有几个好处：

- 它与当前 prompt 强相关，比全局平均 reward 更贴近局部参考；
- 它不依赖额外学习出的 value model，因此不会引入 critic 训练误差；
- 它仍然保持了 REINFORCE 的无偏结构，同时显著降低奖励尺度波动。

直觉上可以这么理解：ReMax 不再问“这个随机响应本身值多少分”，而是问“它比当前模型最稳妥的贪心答案好还是差多少”。这样做以后，优化目标更像“超过自己当前最确定的策略”，而不是在不同 prompt 之间直接比较绝对 reward。

> 💡 关键：ReMax 不是 best-of-n。它不会在推理时保留多个候选里最好的那个，而是在训练时用 greedy response 作为方差约简基线，真正更新的仍然是随机采样 response 的 log-prob。

##### 5. 与 PPO、REINFORCE 和 DPO 的区别

ReMax 可以看作位于 PPO 与纯 REINFORCE 之间的一条折中路线。

和 **PPO** 相比：
- 它保留在线采样和 reward model 更新信号，因此仍属于标准 RLHF 路线；
- 但它完全移除了 value model，不再需要 GAE、clip ratio 调参和多轮 off-policy epoch；
- 同时保留 reference model 的 KL penalty，以防策略偏离初始 SFT/reference 太远。

和 **纯 REINFORCE** 相比：
- 它的无偏性没有变；
- 但通过 `reward(sample) - reward(greedy)` 的结构，把梯度方差压低了很多。

论文 Figure 4 直接展示了这一点：纯 REINFORCE 在大模型上会出现非常不稳定的梯度范数和更差的 reward 演化，而 ReMax 则稳定得多。

和 **DPO** 相比：
- DPO 是离线偏好学习，不需要 reward model 在线打分；
- ReMax 则继续保留在线 RLHF 的 adaptive reward across prompts 和 online update 能力；
- 因此在作者的比较表里，ReMax 同时拥有“在线更新 + reward 自适应 + 高效率”，而 DPO 缺少在线适应能力。

##### 6. 显存与效率：为什么它能省这么多

论文给出的工程结果非常直接。对 7B 模型，reward model 只占很小一部分显存，而 value model 连同其优化状态、激活、梯度等，会吞掉约 46% 的 GPU 内存。因此只要把 value model 删除，ReMax 就能立即获得大幅度资源节省。

![PPO 与 ReMax 的显存和时间开销对比](https://arxiv.org/html/2310.10505v4/x2.png)

*图：论文 Figure 2。ReMax 在 Llama-2-7B 上显著降低显存使用，并缩短训练时间。*

论文报告，在 Llama-2-7B + A800-80GB 的设定下：
- PPO 如果不做 optimizer offload 会顶爆显存；
- ReMax 可以在不依赖这些内存节省技巧的情况下直接训练；
- wall-clock 训练速度大约是 PPO 的 \(1.6\times\)。

这也是 ReMax 在工程上最有现实价值的地方：它不是只在 toy setup 上省一点，而是真的改变了“7B 级 RLHF 在普通算力下能不能跑起来”这个问题。

##### 7. 论文实验结论

论文做了两大类实验：

- **效果实验**：在 full-hh-rlhf 上对比 PPO、DPO、REINFORCE、ReMax 的 reward 演化和 win-rate；
- **效率实验**：测显存、每 iteration 时间、不同模型规模下的可训练性；
- **Leaderboard 实验**：在 Mistral-7B 上做 RLHF，对 AlpacaEval 和 MT-Bench 打榜。

其中最关键的结论有三条：

- ReMax 的最终 reward 和 win-rate 至少能匹配 PPO，在不少设定下更稳定；
- 它显著优于纯 REINFORCE，说明 greedy baseline 确实解决了方差过大问题；
- 它的 compute efficiency 接近 reward-model-free 方法，但保留了在线 RLHF 的性能优势。

作者最终给出的代表性成绩是：Mistral-7B ReMax 模型在 AlpacaEval 上达到 94.78% 胜率，在 MT-Bench 上达到 7.739，论文将其描述为当时开源 7B 模型的新 SOTA。

#### 🧪 练习题
```yaml
question: "ReMax 相比标准 REINFORCE 的核心改进是什么？"
options:
  - "额外训练一个 value model 来估计每个 token 的优势函数"
  - "把离线偏好对转换为 Bradley-Terry 分类损失"
  - "对同一 prompt 生成一个 greedy baseline response，用 reward 差值降低策略梯度方差"
  - "使用 PPO 的裁剪目标限制策略更新幅度"
answer: 2
explain: "ReMax 的关键不是引入 critic 或 PPO clipping，而是用同 prompt 下的贪心输出作为 baseline，使 REINFORCE 在 RLHF 中既无偏又更低方差。"
```
