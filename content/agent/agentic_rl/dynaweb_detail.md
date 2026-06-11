### DynaWeb: 基于世界模型的网页代理强化学习 (DynaWeb)

```yaml
id: dynaweb
name: DynaWeb
full_name: 基于世界模型的网页代理强化学习 (DynaWeb)
year: '2026.01'
org: Shanghai Jiao Tong University
paper_url: https://arxiv.org/abs/2601.22149
category: frontier
parent: webagent_r1
motivation: 在网页世界模型中做想象式RL
```

#### 📝 一句话总结
DynaWeb 提出了一个基于模型的强化学习框架，通过训练 Web World Model (WWM) 来模拟网页状态转移，生成想象轨迹（imagined rollouts）用于策略优化，使 web agent 无需在线真实交互即可学习，大幅减少训练成本和风险。

#### 🎯 核心要点
- 训练 Web World Model (WWM) 学习网页状态变化描述 \( \Delta(o_t, o_{t+1}) \)，而非完整预测下一状态，解决了网页状态高度相似的稀疏训练信号问题
- 采用 Dyna 框架（Sutton 1991）思路：策略与 WWM 交互生成想象轨迹，免除真实 web 交互
- 引入任务级奖励信号通过模型自我评估（model-based self-assessment）获取，实现无需人工标注的奖励
- 混合真实专家轨迹（50%）与想象轨迹（50%）进行训练，真实数据作为关键正则化项稳定学习
- 使用 GSPO (Group Sequence Policy Optimization) 进行序列级策略优化，将重要性采样从 token 级提升到 trajectory 级
- 在 WebArena 和 WebVoyager 上显著优于离线 RL (WebRL)、推理时前瞻 (ITL)、SFT 等基线方法
- Dream length 分析显示 4-5 步想象深度最优，40% 真实数据即可获得最佳性能收益
- WWM 基于 GPT-oss-120b 推理模型训练，预测推理链 \( r \) 和状态变化描述 \( \Delta \)

#### 🔬 深入细节
##### 架构总览

![DynaWeb 框架架构图](https://arxiv.org/html/2601.22149v1/figures/dynaweb.png)
*图：DynaWeb 框架总览。左侧：Web World Model 从真实轨迹中学习状态转移预测。右侧：Agent 策略与 WWM 交互生成想象轨迹，结合 GSPO 进行策略优化。*

##### 算法伪代码

```python
# DynaWeb 训练流程
for episode in range(num_episodes):
    # 采样任务 q 和初始观测 o1
    q, o1 = sample_task()
    
    # 初始化缓冲区
    trajectories = []
    
    # 混合采样：50% 真实专家轨迹 + 50% 想象轨迹
    for i in range(G):  # group size
        if random() < 0.5:
            # 真实专家轨迹（从 SFT 数据集采样）
            tau = sample_expert_trajectory(q)
        else:
            # 想象轨迹：策略与 WWM 交互
            o_hat = o1
            tau = [(o_hat, None, None)]  # (obs, thought, action)
            for t in range(max_dream_length):
                # Step 1: 策略生成推理和动作
                h_t, a_t ~ π_θ(· | o_hat, history, q)
                # Step 2: WWM 预测状态变化和下一状态
                r_t, Δ_t ~ p_ϕ(· | o_hat, a_t, q)
                o_hat = apply_delta(o_hat, Δ_t)  # 将Δ应用到当前状态
                tau.append((o_hat, h_t, a_t))
                if is_terminal(o_hat, a_t):
                    break
            # Step 3: 模型自我评估获得奖励
            r_hat = assess_completion(tau, q)  # {0, 1}
        
        trajectories.append((tau, r_hat))
    
    # GSPO 优化
    for each tau in trajectories:
        y = serialize(tau)  # 将推理链和动作序列化
        s_i = (π_θ(y|q,o1) / π_θ_old(y|q,o1)) ^ (1/|y|)  # 序列级比率
        A_i = r_hat - baseline  # 轨迹级优势
        loss = -min(s_i * A_i, clip(s_i, 1-ε, 1+ε) * A_i)
    
    θ_old = θ
    θ = θ - lr * ∇loss
```

##### 动机与背景

训练高质量 web agent 的核心瓶颈在于**在线交互成本极高**且**风险不可控**：在真实网页上执行操作消耗大量时间，可能触发不可逆操作（如删除、支付），且网站结构频繁变化。SFT 方法依赖离线专家标注，覆盖范围有限；离线 RL 方法需要大量在线探索数据。DynaWeb 借鉴经典 Dyna 架构，用学习到的 Web World Model 替代真实环境，在"想象"中进行策略优化，从根本上解决了这一问题。

##### 核心机制详解

**1. Web World Model (WWM): 状态变化建模**

传统世界模型直接预测下一观测 \( o_{t+1} \)，但在网页环境中存在严重问题：网页状态转移通常仅修改小部分页面元素，\( o_t \) 和 \( o_{t+1} \) 高度相似，直接预测完整文本观测几乎无信息增益。DynaWeb 的核心创新是将预测任务**分解为两步**：

- **子任务1（训练）**：给定当前状态 \( o_t \) 和动作 \( a_t \)，WWM 预测自然语言状态变化描述 \( \Delta(o_t, o_{t+1}) \) 和推理链 \( r \)：
  $$\mathcal{L}_{\phi} = \sum_{(I,o_t,a_t,r,\Delta)} -\log p_{\phi}(r, \Delta \mid I, o_t, a_t)$$
  
- **子任务2（推理）**：WWM 利用指令遵循能力，将预测的 \( \Delta \) 应用到当前状态 \( o_t \) 生成 \( \hat{o}_{t+1} \)。

这种设计确保训练目标（状态变化）有高信息密度，同时利用 LLM 的推理能力实现精确的状态转移。

> 💡 **关键**：WWM 基于 GPT-oss-120b 训练，数据来源于 NNetNav 数据集，使用 GPT-oss-120b 自身为每条转移自动标注 \( r \) 和 \( \Delta \)（知识蒸馏式）。WWM 被训练为"推理模型"，需先生成推理链再输出状态变化。

**2. DynaWeb: 基于想象的策略优化**

策略 \( \pi_{\theta} \) 与 WWM 交互构建想象轨迹：
$$a_t \sim \pi_{\theta}(\cdot \mid o_{1:t}, h_{1:t-1}, a_{1:t-1}, q)$$
$$\hat{o}_{t+1} \sim p_{\phi}(\cdot \mid \hat{o}_t, a_t, q), \quad \hat{o}_1 = o_1$$

轨迹终止后，通过模型自我评估获得任务级奖励 \( \hat{r}(\hat{\tau}, q) \in \{0, 1\} \)，判断任务是否完成。训练中混合 50% 真实专家轨迹和 50% 想象轨迹，真实轨迹作为"锚点"稳定学习。

> ⚠️ **注意**：纯粹基于想象的训练容易因 WWM 幻觉而退化。40% 真实数据的引入可实现性能大幅超越 SFT 基线，更多真实数据（60%+）则收益递减。

**3. GSPO: 序列级策略优化**

传统 PPO/clipped objective 在 token 级别进行重要性采样，导致长序列中出现极端比率。GSPO 将重要性采样提升到**轨迹级别**：

$$s^i(\theta) = \left(\frac{\pi_\theta(y^i \mid q, o_1)}{\pi_{\theta_{\text{old}}}(y^i \mid q, o_1)}\right)^{1/|y^i|} = \exp\left(\frac{1}{|y^i|}\sum_{k=1}^{|y^i|} \log r_k^i(\theta)\right)$$

其中 \( y^i \) 是整个轨迹的 token 序列，\( s^i \) 为几何平均比率。最终优化目标：

$$\mathcal{J}_{\text{GSPO}}(\theta) = \mathbb{E}\left[\frac{1}{G}\sum_{i=1}^{G} \min\left(s^i(\theta) \hat{A}^i, \operatorname{clip}(s^i(\theta), 1-\varepsilon, 1+\varepsilon) \hat{A}^i\right)\right]$$

几何平均天然抑制极端值，使长轨迹训练更稳定。

##### 训练流程

1. **WWM 训练**：从 NNetNav 数据集中清洗有效转移，用 GPT-oss-120b 标注 \( r, \Delta \)，微调 WWM 预测推理链 + 状态变化
2. **DynaWeb RL 训练**：
   - 以 NNetNav SFT 模型初始化 \( \pi_\theta \)
   - 每轮采样任务 \( q \)，混合真实/想象轨迹
   - 想象轨迹限制最大 5 步（平衡深度与幻觉），初始状态随机采样自 NNetNav 数据集各阶段
   - 用 GSPO 优化 \( \pi_\theta \)

##### 与传统方法的区别

| 方法 | 训练环境 | 奖励信号 | 交互成本 |
|------|---------|---------|---------|
| SFT (NNetNav, Go-Browse) | 离线专家数据 | 无（行为克隆） | 低 |
| Offline RL (WebRL) | 在线探索→离线优化 | 训练奖励模型 | 高 |
| ITL | 推理时 WWM 前瞻 | 无训练，仅推理 | 在线 |
| **DynaWeb** | **WWM 想象 + 少量真实** | **模型自我评估** | **极低** |

DynaWeb 是唯一将 WWM 用于**训练阶段 on-policy 优化**的方法（ITL 仅在推理时使用），真正实现了"零在线交互"的训练。

#### 🧪 练习题
```yaml
question: "DynaWeb 的 Web World Model 为何不直接预测完整下一观测 o_{t+1}，而是预测状态变化描述 Δ？"
options:
  - "因为直接预测 o_{t+1} 需要的模型参数量过大"
  - "因为网页状态转移中 o_t 和 o_{t+1} 高度相似，预测完整状态信息增益低"
  - "因为状态变化描述 Δ 可以用更少的 token 表示"
  - "因为直接预测 o_{t+1} 会导致梯度消失"
answer: 1
explain: "网页交互通常只修改页面的一小部分元素，o_t 和 o_{t+1} 高度相似，直接预测完整文本观测几乎没有信息增益；预测状态变化 Δ 使训练目标具有高信息密度。"
```
