### DreamerV3 — 梦想者V3 (Mastering Diverse Domains through World Models)

```yaml
id: dreamerv3
name: DreamerV3
full_name: 梦想者V3 (Mastering Diverse Domains through World Models)
year: '2023'
org: DeepMind
paper_url: https://arxiv.org/abs/2301.04104
category: world_model
parent: dreamerv2
motivation: symlog变换实现跨任务通用性
```

#### 📝 一句话总结

DreamerV3 通过 symlog 预测、离散回归（twohot 编码）和鲁棒的回报归一化等一系列信号尺度无关的设计，使得一套固定超参数即可在超过 150 个跨领域基准任务（Atari、DMC、Minecraft 等）上达到或超越专门调参的算法，首次以通用 MBRL 智能体在 Minecraft 中无人类数据地从零收集钻石。

#### 🎯 核心要点

- **Symlog 预测**：对世界模型的解码器和奖励预测器使用 \(\operatorname{symlog}\) 变换压缩目标尺度，使同一网络适应从 \(10^{-1}\) 到 \(10^{4}\) 量级的信号
- **RSSM 世界模型**：由序列模型（GRU）、编码器、动力学先验、解码器、奖励预测器和 continue 预测器组成，在隐空间中进行想象训练
- **KL 平衡 + Free Bits**：世界模型损失中对 KL 散度使用 \(\alpha=0.5\) 的 KL 平衡和 1 nat 的 free bits，避免后验坍缩和先验过拟合
- **Critic 离散回归**：Critic 在 symlog 空间的 255 个等距桶上输出 softmax 分布，使用 twohot 编码的软标签进行分类交叉熵训练，有效处理多模态回报分布
- **鲁棒回报归一化**：使用 \(\lambda\)-return 的第 5 至第 95 百分位距作为缩放因子 \(S\)，仅在 \(S>1\) 时缩小回报，避免稀疏奖励下放大噪声
- **固定超参数**：单一熵正则化系数 \(\eta=3\times10^{-4}\)、折扣因子 \(\gamma=0.997\)、想象步长 \(T=16\) 等超参数在所有领域通用
- **跨领域验证**：在 7 大领域超过 150 个任务上测试，包括连续/离散动作、稠密/稀疏奖励、2D/3D 视觉输入等多种设置
- **Minecraft 钻石里程碑**：首个无人类演示、无课程学习、从零在 Minecraft 中收集钻石的通用智能体

#### 🔬 深入细节

##### 整体架构示意图

![DreamerV3 整体架构](https://ar5iv.labs.arxiv.org/html/2301.04104v2/assets/figures/method.png)

*图：DreamerV3 的三阶段训练流程。(1) 世界模型从经验中学习紧凑的隐空间表征；(2) Actor-Critic 在世界模型的想象轨迹中学习行为策略；(3) 智能体在真实环境中执行动作并收集新经验。*

##### 算法伪代码

```python
# DreamerV3 训练循环伪代码
Initialize world model (RSSM), actor π_θ, critic v_ψ, replay buffer D

for each training step:
    # === Phase 1: Environment Interaction ===
    s_t = world_model.encode(o_t)          # 编码观测为模型状态
    a_t ~ π_θ(a_t | s_t)                   # 从策略采样动作
    o_{t+1}, r_t, done = env.step(a_t)     # 环境交互
    D.add(o_t, a_t, r_t, done)             # 存入回放缓冲区

    # === Phase 2: World Model Learning ===
    batch = D.sample(B=16, T=64)           # 采样序列批次
    # RSSM: 编码 → 动力学预测 → 解码
    L_pred = -ln p(o_t|s_t) - ln p(r_t|s_t) - ln p(c_t|s_t)  # symlog MSE + twohot CE
    L_dyn  = max(1, KL[sg(posterior) || prior])                 # free bits
    L_rep  = max(1, KL[posterior || sg(prior)])                 # free bits
    L_WM   = 1·L_pred + 0.5·L_dyn + 0.1·L_rep
    update world_model with L_WM

    # === Phase 3: Imagination (Actor-Critic Learning) ===
    imagine s_{1:T} using dynamics + actor (T=16 steps)
    r_{1:T} = reward_predictor(s_{1:T})
    c_{1:T} = continue_predictor(s_{1:T})

    # Compute λ-returns with bootstrapping
    R^λ_T = v_ψ(s_T)
    for t = T-1 to 1:
        R^λ_t = r_t + γ·c_t·((1-λ)·v_ψ(s_{t+1}) + λ·R^λ_{t+1})

    # Critic: discrete regression with twohot targets
    targets = sg(twohot(symlog(R^λ_t)))
    L_critic = -Σ targets^T · ln p_ψ(·|s_t)     # cross entropy
    update critic with L_critic (+ EMA regularization)

    # Actor: normalized returns + entropy
    S = Percentile(R^λ, 95) - Percentile(R^λ, 5)
    L_actor = -Σ sg(R^λ_t) / max(1, S) - η·H[π_θ(·|s_t)]   # η=3e-4
    update actor with L_actor
```

##### 动机与背景

基于模型的强化学习（MBRL）通过学习环境的世界模型并在模型内部进行"想象"训练，具有极高的样本效率。DreamerV1/V2 在 Atari 和连续控制任务上取得了优异成绩，但面临一个根本性挑战：**不同任务的奖励尺度、频率和动态范围差异巨大**，导致同一套超参数无法跨领域通用。例如，Atari 中奖励可达数千，而机器人控制中奖励通常在 \([0, 1]\) 范围内。

DreamerV3 的核心动机是设计一系列**信号尺度无关（scale-invariant）**的机制，使算法无需针对每个任务调参即可在多样化领域中表现良好。

##### 核心机制 1：Symlog 预测

传统世界模型使用均方误差（MSE）损失训练解码器和奖励预测器。当目标值跨越多个数量级时，大值主导梯度，小值被忽略。DreamerV3 引入 symlog 变换：

$$\operatorname{symlog}(x) \doteq \operatorname{sign}(x)\ln(|x|+1)$$

$$\operatorname{symexp}(x) \doteq \operatorname{sign}(x)(\exp(|x|)-1)$$

网络在 symlog 空间中预测，损失函数变为：

$$\mathcal{L}(\theta) = \frac{1}{2}\big(\operatorname{symlog}(y) - \hat{y}_\theta\big)^2$$

> 💡 **关键直觉**：symlog 是一种"软对数"变换——对大值近似取对数压缩，对小值近似恒等保持。这使得网络可以同时精确预测 0.01 和 10000 量级的目标，而无需调整损失权重。

##### 核心机制 2：RSSM 世界模型

世界模型基于循环状态空间模型（RSSM），模型状态 \(s_t = \{h_t, z_t\}\) 由确定性循环状态 \(h_t\) 和随机离散表征 \(z_t\)（32 个类别 × 32 维 one-hot）组成：

$$\begin{aligned}
\text{Sequence model:} \quad & h_t = f_\phi(h_{t-1}, z_{t-1}, a_{t-1}) \\
\text{Encoder:} \quad & z_t \sim q_\phi(z_t \mid h_t, x_t) \\
\text{Dynamics (prior):} \quad & \hat{z}_t \sim p_\phi(\hat{z}_t \mid h_t) \\
\text{Decoder:} \quad & \hat{x}_t \sim p_\phi(\hat{x}_t \mid h_t, z_t) \\
\text{Reward:} \quad & \hat{r}_t \sim p_\phi(\hat{r}_t \mid h_t, z_t) \\
\text{Continue:} \quad & \hat{c}_t \sim p_\phi(\hat{c}_t \mid h_t, z_t)
\end{aligned}$$

世界模型损失由三部分组成：

$$\mathcal{L}_\text{WM}(\phi) = \beta_\text{pred}\,\mathcal{L}_\text{pred} + \beta_\text{dyn}\,\mathcal{L}_\text{dyn} + \beta_\text{rep}\,\mathcal{L}_\text{rep}$$

其中 \(\beta_\text{pred}=1, \beta_\text{dyn}=0.5, \beta_\text{rep}=0.1\)。动力学损失和表征损失分别使用 stop-gradient 实现 **KL 平衡**：

$$\mathcal{L}_\text{dyn}(\phi) = \max\big(1, \mathrm{KL}[\operatorname{sg}(q_\phi) \| p_\phi]\big)$$

$$\mathcal{L}_\text{rep}(\phi) = \max\big(1, \mathrm{KL}[q_\phi \| \operatorname{sg}(p_\phi)]\big)$$

> ⚠️ **注意**：free bits 阈值为 1 nat，意味着当 KL 散度低于 1 nat 时不产生梯度。这允许编码器保留少量不可预测的信息（如随机噪声），避免过度压缩表征。此外，后验分布混入 1% 均匀分布以防止梯度稀疏。

##### 核心机制 3：Critic 离散回归

传统 Critic 使用标量回归预测回报值，但当回报分布呈多模态（如稀疏奖励下大量零回报 + 少量高回报）时，均值回归会产生偏差。DreamerV3 的 Critic 输出一个在 symlog 空间 \([-20, +20]\) 范围内 255 个等距桶上的 softmax 分布：

$$v_\psi(s_t) \doteq \operatorname{symexp}\big(p_\psi(\cdot\mid s_t)^T B\big), \quad B \doteq [-20 \;\ldots\; +20]$$

训练目标使用 **twohot 编码**的 \(\lambda\)-return 作为软标签，通过分类交叉熵优化：

$$\mathcal{L}_\text{critic}(\psi) = -\sum_{t=1}^{T} y_t^T \ln p_\psi(\cdot \mid s_t), \quad y_t = \operatorname{sg}\big(\operatorname{twohot}(\operatorname{symlog}(R_t^\lambda))\big)$$

其中 twohot 编码将连续值分配到最近的两个桶上，权重与距离成反比。\(\lambda\)-return 的递推公式为：

$$R_t^\lambda \doteq r_t + \gamma c_t \big((1-\lambda)v_\psi(s_{t+1}) + \lambda R_{t+1}^\lambda\big), \quad R_T^\lambda \doteq v_\psi(s_T)$$

> 💡 **关键直觉**：离散回归让 Critic 维护完整的回报分布而非单一均值。在稀疏奖励环境中，Critic 可以同时表示"大概率零回报"和"小概率高回报"两个模态，显著加速学习。

##### 核心机制 4：鲁棒回报归一化

Actor 损失为：

$$\mathcal{L}(\theta) \doteq \sum_{t=1}^{T} \operatorname{E}_{\pi_\theta, p_\phi}\big[\operatorname{sg}(R_t^\lambda) / \max(1, S)\big] - \eta\,\mathrm{H}[\pi_\theta(a_t \mid s_t)]$$

其中 \(\eta = 3 \times 10^{-4}\) 为熵正则化系数。关键创新在于缩放因子 \(S\)：

$$S = \operatorname{Per}(R_t^\lambda, 95) - \operatorname{Per}(R_t^\lambda, 5)$$

使用百分位距而非标准差有两个优势：(1) 对异常值鲁棒；(2) 通过 \(\max(1, S)\) 确保**只缩小大回报、不放大小回报**——当奖励稀疏时 \(S < 1\)，回报不被缩放，策略保持足够的探索熵。

> 💡 **关键直觉**：这一简单的非对称归一化是 DreamerV3 能用单一 \(\eta\) 同时适应稠密和稀疏奖励的核心。传统方法除以标准差会在稀疏奖励下放大噪声，导致策略过早确定化而无法探索。

##### 与 DreamerV2 的关键区别

| 特性 | DreamerV2 | DreamerV3 |
|------|-----------|-----------|
| 预测损失 | MSE / 交叉熵 | **Symlog MSE** |
| Critic 输出 | 标量回归 | **255 桶离散回归 (twohot)** |
| 回报归一化 | 除以标准差 | **百分位距 + max(1, S)** |
| 熵正则 | 需要调参 | **固定 η=3e-4** |
| KL 平衡 | α=0.8 | **α=0.5** |
| 后验分布 | 纯分类 | **混入 1% 均匀分布** |
| 网络初始化 | 默认 | **奖励/Critic 输出层零初始化** |
| 适用范围 | 主要 Atari | **7 大领域 150+ 任务** |

##### 实验亮点

DreamerV3 在以下领域均使用**完全相同的超参数**取得了强竞争力的表现：

- **Atari 100K & 200M**：匹配或超越专门调参的 EfficientZero、MuZero
- **DMControl (Proprio & Vision)**：连续控制基准上达到 SOTA
- **BSuite**：诊断性基准上表现优异
- **Crafter**：程序生成的 2D 生存游戏中刷新记录
- **Minecraft (钻石收集)**：首次无人类数据从零收集钻石，需要完成约 20 步的长程依赖任务链（砍树→制作工作台→制作木镐→挖石头→制作石镐→挖铁→熔炼→制作铁镐→挖钻石）

#### 🧪 练习题

```yaml
question: "DreamerV3 中 Critic 使用离散回归（twohot 编码 + softmax 分布）而非传统标量回归的主要原因是什么？"
options:
  - "减少 Critic 网络的参数量"
  - "使 Critic 能够表示多模态回报分布，加速稀疏奖励环境中的学习"
  - "避免使用目标网络（target network）"
  - "使 Critic 的输出可微分以支持反向传播"
answer: 1
explain: "稀疏奖励环境中回报分布通常呈双模态（大量零回报+少量高回报），标量回归只能预测均值，而离散回归让 Critic 维护完整分布，能同时表示两个模态，显著加速学习。"
```