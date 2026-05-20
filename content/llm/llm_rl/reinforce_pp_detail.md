### REINFORCE++: 增强版REINFORCE (REINFORCE++)

```yaml
id: reinforce_pp
name: REINFORCE++
full_name: 增强版REINFORCE (REINFORCE++)
year: "2026"
org: NVIDIA / OpenRLHF
paper_url: https://arxiv.org/abs/2501.03262
category: frontier_2026
parent: remax
motivation: 全局优势归一化大规模训练
```

#### 📝 一句话总结

REINFORCE++ 将 PPO 中的 Token-Level KL 惩罚、PPO-Clip 裁剪机制和全局 Advantage 归一化融入经典 REINFORCE 框架，在移除 Critic 网络的同时实现了与 PPO 相当的性能和远超 GRPO 的训练稳定性，训练时间从 PPO 的 60 小时降至 42 小时。

#### 🎯 核心要点

- 无 Critic 架构：彻底移除 Value Network，通过全局 Advantage 归一化直接估计梯度，减少约一半内存开销
- Token-Level KL 惩罚：在每 token 上施加与 SFT 模型的 KL 散度惩罚，仅在最后 token 加上奖励模型分数，实现更细粒度的信用分配
- PPO-Clip 集成：保留 PPO 的裁剪机制 `clip(r_t(θ), 1-ε, 1+ε)`，约束新旧策略概率比，防止单步更新幅度过大
- Mini-Batch 多轮更新：将 rollout 数据分批进行多次参数更新，引入随机性提升泛化性并加速收敛
- 三层奖励处理：Reward 经 z-score 归一化→裁剪→缩放，消除异常值影响，确保数值稳定
- 全局 Advantage 归一化：对整个 batch 所有 token 的 Advantage 进行 z-score 标准化，使梯度尺度一致，防止训练发散
- 计算效率显著：在 Llama3.1-8B + 70k 样本 + H100 配置下，训练时间较 PPO 减少 30%（60h→42h）
- 稳定性优于 GRPO：在 Bradley-Terry Reward Model 场景下，REINFORCE++ 显著缓解 reward hacking 和长度 hacking 问题

#### 🔬 深入细节

##### 1. 动机：RLHF 中的计算与稳定性困境

RLHF 训练流程通常需要同时维护 Policy Model 和 Value Model（Critic），后者规模常与前者相当，带来巨大的 GPU 内存和计算负担。虽然后续工作如 RLOO、ReMax、GRPO 尝试移除 Critic，但它们引入了新的稳定性问题——例如 GRPO 在 Bradley-Terry Reward Model 场景下容易出现 reward hacking（模型仅优化奖励分数而忽略实际质量）和 output length hacking（生成越来越长的输出以获取更高奖励）。REINFORCE++ 的设计目标是：**在不引入 Critic 的前提下，通过融合 PPO 的成熟稳定化技术，实现简单、稳定且高效的 RLHF 训练**。

![REINFORCE++ 通用领域结果](https://ar5iv.labs.arxiv.org/html/2501.03262/assets/imgs/llama3.png)
*图 1：通用领域 Bradley-Terry Reward Model 场景下，PPO 与 REINFORCE++ 的奖励曲线和输出长度对比。REINFORCE++ 与 PPO 的 reward hacking 和 length hacking 程度相近，远优于 GRPO。*

##### 2. 核心机制：五大增强模块详解

**Token-Level KL 惩罚**：传统 REINFORCE 仅在最终 token 施加 KL 惩罚，但 LLM 的生成是自回归的，仅在末尾约束无法有效控制中间 token 的分布漂移。REINFORCE++ 在每个 token 上计算与 SFT 模型的 KL 散度并累加至奖励函数：

$$r(s_t, a_t) = \mathbf{I}(s_t=[EOS]) \cdot r(x,y) - \beta \cdot \text{KL}(t)$$

$$\text{KL}(t) = \log\left(\frac{\pi_{\theta_{old}}^{RL}(a_t|s_t)}{\pi^{SFT}(a_t|s_t)}\right)$$

其中 \( \mathbf{I}(s_t=[EOS]) \) 确保奖励模型分数仅在序列末尾施加，\( \beta \) 为 KL 惩罚系数（通用领域 0.01，数学领域 0.001）。该设计既保持了奖励信号的干净（不在中间插入外部奖励），又实现了逐 token 的分布约束，为 Process Reward Model 的融合提供了天然接口。

> 💡 关键：Token-Level KL 惩罚与仅末尾 KL 相比，相当于在每个生成步骤都施加了一个"回正力"，防止策略在生成中途大幅偏离 SFT 模型，从而抑制 reward hacking。

**PPO-Clip 集成**：REINFORCE++ 直接沿用 PPO 的裁剪目标函数来约束策略更新：

$$L^{CLIP}(\theta) = \mathbb{E}_t\left[\min\left(r_t(\theta)\hat{A}_t, \text{clip}(r_t(\theta), 1-\epsilon, 1+\epsilon)\hat{A}_t\right)\right]$$

$$r_t(\theta) = \frac{\pi_{\theta}(a_t|s_t)}{\pi_{\theta_{old}}(a_t|s_t)}$$

其中 \( \epsilon = 0.2 \) 为裁剪半径。当优势函数 \( \hat{A}_t > 0 \) 时，`clip` 阻止概率比超过 \( 1+\epsilon \) 带来的正向收益；当 \( \hat{A}_t < 0 \) 时，阻止概率比低于 \( 1-\epsilon \) 带来的负向收益。这一设计在不依赖 Value Model 的前提下，为 REINFORCE 提供了"信任域"式的训练约束。

> ⚠️ 注意：PPO 原版裁剪依赖 Advantage 的相对值（通过 GAE 从 Value Model 估算），而 REINFORCE++ 直接使用全局归一化后的 Advantage，裁剪的有效性高度依赖归一化的质量。

**奖励归一化与裁剪**：REINFORCE++ 对 Reward 实施三层处理：首先进行 z-score 归一化（减去 batch 均值除以标准差）消除不同任务间的奖励尺度差异；接着将值裁剪至预定义区间（如 [-5, 5]）防止极端异常值；最后应用缩放因子保证与 Advantage 的量级匹配。这一流程在 reward 信号进入 optimizer 之前完成了"清洗"。

**全局 Advantage 归一化**：REINFORCE++ 中 Advantage 定义为：

$$A_t(s_t, a_t) = r(x,y) - \beta \cdot \sum_{i=t}^{T} \text{KL}(i)$$

即从最终 reward 中减去当前位置起所有后续 token 的 KL 惩罚累积值。整个 batch 所有 token 的 Advantage 随后进行 z-score 标准化：

$$A_{normalized} = \frac{A - \mu_A}{\sigma_A}$$

其中 \( \mu_A, \sigma_A \) 为该 batch 所有样本所有 token 的均值和标准差。这一操作使得每个 batch 内正负 Advantage 各半、梯度尺度一致，有效防止了因 reward 尺度变化导致的训练波动。

**Mini-Batch 更新**：在 rollout 阶段收集 256 个样本为一组后，REINFORCE++ 不进行全量更新，而是切成 batch_size=128 的小批次，对每个 mini-batch 可进行多次（通常 1 epoch）参数更新。这种设计在保证梯度多样性的同时，通过多次利用同批数据提升了收敛速度。

##### 3. 训练流程与超参数

REINFORCE++ 的训练流程遵循标准 RLHF 范式：

1. **Rollout**：固定 batch 中 256 个 prompt，每个 prompt 用当前策略采样 4 个 response（共 1024 条）
2. **Reward 计算**：Reward Model 对每条 response 打分，每个 token 累加 KL 惩罚
3. **Advantage 计算**：每条 response 的每个 token 得到 `Advantage = reward - β × ΣKL(tokens_from_current_onward)`
4. **全局归一化**：收集所有 1024×N 个 token 的 Advantage，进行 z-score 标准化
5. **Mini-Batch 更新**：以 128 条 response 为一批次，计算 PPO-Clip loss，更新策略参数
6. **Repeat**：一轮 rollout 后，可对新 batch 重复上述流程，总共最多 25000 个 prompt

| 参数 | 值 |
|------|-----|
| KL 惩罚系数 \( \beta \) | 0.01 (通用) / 0.001 (数学) |
| 最大样本数 | 25,000 prompts |
| 每 prompt 采样数 | 4 |
| Rollout Batch Size | 256 |
| Training Batch Size | 128 |
| Actor Learning Rate | \( 5 \times 10^{-7} \) |
| Critic Learning Rate | \( 9 \times 10^{-6} \)（保留接口） |
| Discount Factor \( \gamma \) | 1.0 |
| Clip \( \epsilon \) | 0.2 |

##### 4. 伪代码

```python
# REINFORCE++ 核心训练循环（简化版）
for rollout_batch in prompt_loader:
    # 1. 采样阶段
    responses = []
    for prompt in rollout_batch:
        for _ in range(4):  # 每 prompt 采样 4 个 response
            response, logprobs = policy.sample(prompt)
            responses.append((prompt, response, logprobs))
    
    # 2. 计算 Rewards 与 KL 惩罚
    rewards = reward_model.score(responses)
    for resp, r in zip(responses, rewards):
        kl_per_tok = resp.logprobs_rl - resp.logprobs_sft  # token-level KL
        resp.advantage = torch.zeros(len(resp.tokens))
        for t in reversed(range(len(resp.tokens))):
            running_sum = 0 if t == len(resp.tokens)-1 else resp.advantage[t+1]
            resp.advantage[t] = running_sum - beta * kl_per_tok[t]
        resp.advantage[-1] += r  # reward 仅加在 EOS token
    
    # 3. 全局 Advantage 归一化
    all_adv = torch.cat([r.advantage for r in responses])
    all_adv = (all_adv - all_adv.mean()) / (all_adv.std() + 1e-8)
    
    # 4. Mini-Batch PPO-Clip 更新
    for minibatch in split(responses, size=128):
        ratio = torch.exp(policy.logprob - old_policy.logprob)  # π_θ / π_θ_old
        clipped_ratio = torch.clamp(ratio, 1 - eps, 1 + eps)
        loss = -torch.min(ratio * all_adv, clipped_ratio * all_adv).mean()
        loss.backward()
        optimizer.step()
        optimizer.zero_grad()
```

##### 5. 实验结果与效率分析

实验在 Llama3.1-8B-SFT 和 Qwen2.5-7B-Instruct 两个基座模型上进行，覆盖三类奖励机制：

- **通用 Bradley-Terry RM**：REINFORCE++ 的 reward 曲线与 PPO 高度一致，output length 增长幅度远低于 GRPO（图 1），证明其有效抑制了长度 hacking
- **规则型 Reward Model**（数学题）：REINFORCE++ 与 GRPO (Group Norm) 达到可比性能（图 2）
- **数学 Reward Model**：在相同 KL 消耗下，REINFORCE++ 和 RLOO 的 reward 提升幅度优于 GRPO（图 3）

| 方法 | 训练时间 (H100, 70k samples) |
|------|------------------------------|
| PPO | 60 小时 |
| REINFORCE++ | 42 小时（↓30%） |

REINFORCE++ 将 Critic 的推理和前向/反向传播完全移除，仅在 rollout 阶段节省了约 40% 的 GPU 内存和 30% 的训练墙钟时间，同时保留了 PPO 的稳定性优势。

![REINFORCE++ 数学场景 1](https://ar5iv.labs.arxiv.org/html/2501.03262/assets/imgs/rule.jpg)
*图 2：规则型奖励下，REINFORCE++ 与 GRPO (Group Norm) 性能相当。*

![REINFORCE++ 数学场景 2](https://ar5iv.labs.arxiv.org/html/2501.03262/assets/imgs/math.jpg)
*图 3：数学 RM 下，相同 KL 消耗时 REINFORCE++ 的 reward 提升优于 GRPO。*

#### 🧪 练习题

```yaml
question: "REINFORCE++ 的全局 Advantage 归一化主要解决了什么问题？"
options:
  - "减少了 Reward Model 的计算量"
  - "替代了 Critic 网络，通过 batch 内 z-score 标准化使梯度尺度一致，防止训练发散"
  - "提升了采样速度"
  - "增加了 KL 惩罚的强度"
answer: 1
explain: "全局 Advantage 归一化取代了 Value Model 的基线估计功能，对 batch 内所有 token 的 Advantage 进行 z-score 标准化，使均值归零、方差为 1，确保梯度幅度稳定，是 REINFORCE++ 在无 Critic 下保持训练稳定的核心设计。"
```