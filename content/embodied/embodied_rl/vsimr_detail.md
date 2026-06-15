### VSIMR — 变分状态内在奖励 (Variational State Intrinsic Reward)

```yaml
id: vsimr
name: VSIMR
full_name: 变分状态内在奖励 (Variational State Intrinsic Reward)
year: '2025'
org: arXiv
paper_url: https://arxiv.org/abs/2508.18420
category: reward_design
parent: rnd
motivation: 状态新颖性+LLM解决极端稀疏奖励
```

#### 📝 一句话总结

VSIMR 将 VAE 的状态新颖性奖励与 LLM 基于任务描述生成的语义引导奖励结合起来，解决极端稀疏奖励环境中单一好奇心信号方向性不足的问题。它在 A2C 训练中把环境奖励、VAE KL 内在奖励和 LLM 评分奖励相加，使探索既覆盖新状态，也更偏向任务相关状态。

#### 🎯 核心要点

- **VAE 新颖性奖励**：用 VAE 编码状态并以 KL divergence 衡量状态对潜变量分布的“惊讶度”
- **LLM 语义奖励**：把 MiniGrid 状态和任务 mission 格式化成 prompt，请 LLaMA 3.2 评估新状态对目标的帮助程度
- **三路奖励融合**：A2C 接收 \(r^{env}+\beta r^{VAE}+\alpha r^{LLM}\) 作为训练回报
- **Prompt 缓存**：维护 prompt-answer 数据集，避免对重复状态反复调用 LLM
- **周期性 VAE 训练**：收集最近状态后每 \(N\) 步训练 VAE，使新颖性估计随访问覆盖更新
- **A2C 主干**：Actor-Critic 仍负责策略学习，VSIMR/LLM 只改变奖励信号
- **实验环境**：MiniGrid DoorKey-8x8-v0，论文把最大步数从默认 640 增加 40% 到 896 以观察稀疏奖励学习
- **结果观察**：聚合结果中 LLM+VAE 比单独 VAE 更快、更稳定，但不同随机运行仍有明显方差

#### 🔬 深入细节

##### 方法流程示意图

![VSIMR + LLM 内在动机流程](https://arxiv.org/html/2508.18420v1/RL_VAE_AGENTpng.png)

*图：智能体执行动作得到新状态后，VAE 计算状态新颖性奖励，LLM 根据状态文本和任务目标给出语义进展奖励，二者与环境奖励融合后训练 A2C。*

##### 算法伪代码

```python
# A2C with VSIMR and LLM intrinsic reward
initialize actor_critic
initialize VAE encoder/decoder
initialize D_vae = []          # states for VAE training
initialize D_prompt = {}       # prompt cache

for episode in range(num_episodes):
    s = env.reset()
    for t in range(T):
        a = actor_critic.policy.sample(s)
        s_next, r_env, done = env.step(a)

        # VSIMR: variational state novelty
        mu, logvar = VAE.encode(s_next)
        r_vae = KL(q(z | s_next) || p(z))
        D_vae.append(s_next)

        # LLM reward: task-aware semantic guidance
        prompt = build_prompt(mission=env.mission, state=s_next)
        if prompt not in D_prompt:
            D_prompt[prompt] = LLM_score(prompt, scale="0-10")
        r_llm = normalize(D_prompt[prompt])

        r_total = r_env + beta * r_vae + alpha * r_llm
        actor_critic.store(s, a, r_total, s_next, done)

        if t % N == 0:
            actor_critic.update()
            VAE.train(D_vae)
            D_vae.clear()

        s = s_next
        if done:
            break
```

##### 动机与背景

在 DoorKey 这类 MiniGrid 任务里，智能体必须找到钥匙、开门并到达目标，但大多数中间步骤没有外在奖励。仅靠环境奖励训练 A2C，早期几乎没有可学习信号。RND 等预测误差方法能鼓励访问新状态，但它们不理解“钥匙”“门”“目标”之间的任务语义，可能把探索预算花在新颖但无关的区域。

VSIMR 的变分状态奖励来自 VAE。VAE 将状态 \(s\) 编码为潜变量分布 \(q_\phi(z|s)\)，并通过重构损失和 KL 项学习状态结构。对当前状态的内在奖励可以取：

$$r_t^{VAE} = D_{KL}\big(q_\phi(z|s_t)\,\|\,p(z)\big)$$

直觉上，如果一个状态在当前 VAE 表征中不常见或信息量大，它的后验会偏离先验更多，KL 项更高，因此应鼓励智能体访问。这与 RND 的“预测误差高说明不熟悉”相似，但 VSIMR 使用概率潜变量而不是固定随机网络特征。

##### LLM 奖励与融合

论文进一步加入 LLM 奖励。系统把环境 mission、当前可见对象和状态描述写入 prompt，要求 LLM 在 0 到 10 的尺度上判断“这个新状态是否帮助智能体完成最终目标”。这样得到的 \(r_t^{LLM}\) 为探索提供任务方向：看见钥匙、接近门、拿到关键物体等状态可获得比无关移动更高的语义分数。

总奖励写成：

$$r_t = r_t^{env} + \beta r_t^{VAE} + \alpha r_t^{LLM}$$

\(\beta\) 控制新颖性探索强度，\(\alpha\) 控制语言引导强度。若 \(\alpha\) 太大，LLM 的粗糙评分可能覆盖真实任务奖励；若 \(\beta\) 太大，智能体可能持续追逐新状态而不收敛。因此 VSIMR 的关键并不是“更多奖励项”，而是让状态新颖性和任务语义互补。

##### 训练流程与缓存机制

每一步环境交互后，A2C 保存带融合奖励的 transition。VAE 不是每步都立即更新，而是在累计一批状态后周期性训练，以降低噪声和计算开销。LLM 调用同样昂贵，因此实现中保存 prompt-answer 对：若同一个状态描述已经问过，就直接复用结果。

与 RND 相比，VSIMR 的优势是奖励更懂任务；与纯 LLM reward 相比，VAE 新颖性保留了自主探索能力。当 LLM 评分不够细或错误时，VAE 仍能推动智能体覆盖未知区域；当 VAE 只会鼓励无方向探索时，LLM 语义信号又能把探索拉回目标路径。

> ⚠️ 注意：论文实验显示 LLM+VAE 的聚合表现更好，但不同 run 的差异仍然大。这说明该方向有效，但 prompt、奖励权重和 VAE 更新频率仍是敏感超参数。

#### 🧪 练习题

```yaml
question: "VSIMR 中同时使用 VAE 奖励和 LLM 奖励的主要目的是什么？"
options:
  - "让 VAE 负责动作选择，LLM 负责价值函数估计"
  - "把状态新颖性探索与任务语义引导结合，缓解极端稀疏奖励"
  - "用 LLM 替代环境模拟器"
  - "避免训练 Actor-Critic 网络"
answer: 1
explain: "VAE 奖励鼓励访问新状态，LLM 奖励根据任务描述偏向有目标进展的状态，二者组合比单一探索信号更适合稀疏奖励任务。"
```
