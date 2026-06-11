### VPR: 可验证过程奖励 (VPR)

```yaml
id: vpr
name: VPR
full_name: 可验证过程奖励 (VPR)
year: '2026.05'
org: Tsinghua University
paper_url: https://arxiv.org/abs/2605.10325
category: reward
parent: istar
motivation: 把可验证中间步骤转成稠密奖励
```

#### 📝 一句话总结
VPR 提出了一个通用框架，将任务特定的可验证结构（MCTS 求解器、约束求解器、概率推断引擎）转化为密集的中间步过程奖励信号，替代传统稀疏结果奖励，显著改善长程多轮推理的信用分配，并在训练环境之外的通用推理和智能体任务中展现出优异的零样本迁移能力。

#### 🎯 核心要点
- 提出 **VPR (Verifiable Process Rewards)** 框架：用策略无关的 Oracle 验证器评估每个中间动作的后验概率 \\(P(a_t \\mid \\tau_{t-1}, \\text{outcome}=1)\\) 作为过程奖励
- 在 **3 个可验证多轮环境**中实例化：Tic-Tac-Toe（MCTS ≥10,000 次模拟）、Sudoku（约束求解器）、Minesweeper（概率推断引擎）
- 过程奖励定义为：对每个中间动作 \\(a_t\\)，Oracle 计算在给定前序 \\(\\tau_{t-1}\\) 且最终成功条件下采取该动作的后验概率
- 训练使用 **turn-level GRPO**：将一个完整轨迹按轮次分组，每轮多个采样动作构成组内对比
- **理论分析（3 个命题）**：(1) VPR 梯度信号在 Oracle 噪声下是有偏估计，但期望上鼓励成功动作；(2) 梯度偏差随 Oracle 平均误差 \\(\\bar{\\epsilon}\\) 线性缩放；(3) VPR 过程奖励信号量级远超稀疏奖励，驱动有效学习
- 基座模型为 **Qwen3-4B** (thinking mode)，训练 100 update steps，每组 128 条轨迹
- VPR 在三个训练环境的所有指标（胜率/成功率/完成率）上一致优于 **OR**（稀疏结果奖励）和 **MC-PR**（100 次 Monte Carlo rollout 过程奖励）两种基线
- 零样本迁移评估覆盖 **7 个通用推理基准**（GSM8K、MATH-500、AIME24/25、GPQA-Diamond、BBH、MMLU-Pro）及 **2 个智能体任务**（ALFWorld、WebShop），VPR 在所有训练环境下均超越 Base 模型
- **Oracle 质量消融实验**：弱 Oracle（MCTS N=100）不仅损害域内性能，还系统性地降低全部下游推理基准，表明过程监督的可靠性比稠密性更为关键
- Minesweeper 训练的 VPR 在 ALFWorld（部分可观测文本规划）上表现最佳，Sudoku 训练的 VPR 在 GPQA-Diamond（约束排除推理）上增益最大

#### 🔬 深入细节
![VPR 框架示意图](https://arxiv.org/html/2605.10325v1/x1.png)
*图：VPR 框架概览——任务特定的 Oracle 验证器为多轮轨迹的每个中间动作提供密集的后验过程奖励，替代传统稀疏结果奖励*

##### 动机与背景

多轮智能体推理面临的核心挑战是**信用分配**（credit assignment）：在长达数十步的交互中，最终失败往往只能获得稀疏的二元结果信号（成功=1 / 失败=0），导致模型难以识别"哪一步决策出了问题"。现有的解决方案存在明显局限：

- **结果奖励（OR / RLVR）**：仅在轨迹结束时提供反馈，对中间步骤无监督，长程推理中梯度信号稀释严重
- **人工标注 PRM**：成本高、不一致，且易被 reward hacking
- **Monte Carlo PRM**：用策略模型自身做 rollout 估计中间值，计算量大且信号噪声高，在严格约束（如 Sudoku）中甚至不如 OR

VPR 的核心洞察是：**许多交互环境的结构本身就是可验证的**——游戏有完美信息的求解器，逻辑题有约束传播引擎，概率推理有贝叶斯检验——这些策略无关的 Oracle 可以直接判定"在当前位置，哪些动作是通往成功的"，从而为每一步提供精确的过程级监督。

##### 核心机制

**1. 后验过程奖励定义**

给定任务特定的 Oracle 验证器，VPR 将过程奖励定义为：

$$R_{\\text{VPR}}(a_t \\mid \\tau_{t-1}) = P_{\\text{oracle}}\\left(a_t \\mid \\tau_{t-1}, \\text{outcome}=1\\right)$$

即在给定前序轨迹 \\(\\tau_{t-1}\\) 且假设最终结果为成功的条件下，Oracle 评估采取动作 \\(a_t\\) 的后验概率。这一定义具有三个关键性质：

- **策略无关**：Oracle 不依赖当前策略模型，避免了 rollout-based PRM 中的策略偏差
- **密集且精确**：每一步都获得 0-1 之间的连续信号，且信号来自真实的环境结构验证
- **信用分配自然**：成功路径上的动作获得高奖励（接近 1），失败路径上的动作获得低奖励（接近 0），危险动作获得即时负反馈

> 💡 **关键**：后验概率 \\(P(a_t \\mid \\tau_{t-1}, \\text{outcome}=1)\\) 的计算方式决定了 Oracle 的质量。VPR 的消融实验表明，这一质量必须足够高（MCTS ≥1000 次模拟），否则会适得其反。

**2. 三种 Oracle 实例化**

| 环境 | Oracle 类型 | 过程奖励计算 | 挑战 |
|---|---|---|---|
| **Tic-Tac-Toe** | MCTS 搜索树 | 从当前棋局 \\(s_t\\) 出发，运行 N=10,000 次 MCTS 模拟，统计棋步 \\(a_t\\) 在成功路径中被选中的后验频率 | 必须同时学习先手和后手的博弈策略；局部贪心会导致长程失利 |
| **Sudoku** | 约束求解器 | 对候选数字执行约束传播，若填数后剩余空格仍存在唯一解则 \\(a_t\\) 获得高概率；若导致矛盾则概率为 0 | 单步合法≠全局可解；局部看似合理的填数可能导致后续无解 |
| **Minesweeper** | 概率推断引擎 | 基于已知格子的数字线索，用约束满足计算每个未知格是雷的后验概率；安全揭开获得高奖励，踩雷获得 0 奖励 | 部分可观测；需要在不确定下进行信息收集推理 |

**3. Turn-Level GRPO 训练**

VPR 的损失函数基于 GRPO（Group Relative Policy Optimization），但做了 turn-level 改造：对于每个轨迹的每一轮 \\(t\\)，从当前状态 \\(s_t\\) 采样 \\(G\\) 个候选动作，每个候选动作通过 Oracle 获得过程奖励，组内计算相对优势后应用 GRPO 裁剪目标更新策略。

```python
# VPR 训练流程伪代码（Turn-Level GRPO）
for update_step in range(100):
    trajectories = policy_model.sample_batch(128)  # 128 trajectories

    for each trajectory, each turn t:
        # Step 1: Oracle computes posterior process reward for G candidate actions
        for g in range(G):
            r[g] = oracle.posterior(a[t][g] | tau[:t], outcome=1)

        # Step 2: Within-group normalization to get advantage
        advantage = (r - mean(r)) / (std(r) + 1e-8)

        # Step 3: GRPO clipped loss
        ratio = exp(log_prob_new - log_prob_old)
        loss = -min(ratio * advantage,
                    clip(ratio, 0.8, 1.2) * advantage)

    loss.backward()
    optimizer.step()
```

> ⚠️ **注意**：与标准 GRPO（轨迹级分组）不同，turn-level GRPO 在每一步独立分组，这使得每轮对比聚焦于"在当前状态下什么动作更好"，而非"哪条完整轨迹更好"，显著提升信用分配精度。

##### 理论分析

VPR 提供了三个命题支撑其设计的合理性：

**命题 1（梯度信号的性质）**：当 Oracle 存在噪声误差 \\(\\epsilon_t\\) 时，VPR 梯度是真实梯度的有偏估计，但偏差受误差方差约束。期望上，Oracle 倾向于为成功路径上的动作分配更高的过程奖励，因此梯度期望的方向仍然指向成功策略。

**命题 2（偏差的线性缩放）**：梯度偏差 \\(\\|\\mathbb{E}[\\nabla\\hat{L}] - \\nabla L\\|\\) 随 Oracle 平均误差 \\(\\bar{\\epsilon}\\) 线性增长。这解释了为何弱 Oracle 不仅无益反而有害——当噪声过大时，梯度方向偏离真实提升方向，模型学会的是利用 Oracle 的误差而非真正改进推理。

**命题 3（信号量级优势）**：VPR 过程奖励在每一步都提供非零梯度信号，而稀疏结果奖励仅在轨迹末的少数几步有信号。在 \\(T\\) 轮任务中，VPR 的总信号量级大约是 OR 的 \\(T\\) 倍，这一理论优势在 Minesweeper（平均 10+ 步）中尤为显著。

##### 实验发现

**域内性能**：VPR 在所有三个环境的所有六项指标上一致最优。特别地，Tic-Tac-Toe 中 VPR 是唯一先后手都接近最优（return ≈ -0.1）的方法；Sudoku 中 Base 模型虽能填对大部分格但几乎无法完整求解（SR≈0%），VPR 将 SR 提升至 21%；Minesweeper 中 VPR 的 CR 增益最大（+14% vs Base），说明过程奖励帮助模型在不确定状态下做出更安全的局部推理。

**跨域泛化**：VPR 训练后的模型在 7 个推理基准和 2 个智能体任务上全面超越 Base。Minesweeper-VPR 在 ALFWorld 上表现最佳（+4.48%），Sudoku-VPR 在 GPQA-Diamond 上增益最大（+6.87%），显示出训练环境结构与迁移任务之间存在合理的技能对齐。

**Oracle 质量消融**：这是 VPR 最关键的发现——将 Tic-Tac-Toe 的 MCTS 模拟次数从 10,000 降至 100 后，VPR 在域内（return 从 -0.10 跌至 -0.50，低于 Base 的 -0.33）和全部 7 个下游基准上均全面劣于 Base。这说明**不可靠的过程监督比没有过程监督更差**。

##### 与现有方法的区别

| 维度 | OR (RLVR) | MC-PR | VPR |
|---|---|---|---|
| 监督密度 | 稀疏（仅末端） | 密集 | 密集 |
| 信号可靠性 | 高（二元） | 低（rollout 噪声） | 高（策略无关 Oracle） |
| 计算开销 | 低 | 高（每步 100 次 rollout） | 中（Oracle 每步评估一次） |
| 信用分配 | 差 | 中等 | 优秀 |
| 泛化能力 | 有限 | 不稳定 | 稳定且全面 |

#### 🧪 练习题
```yaml
question: "VPR 框架中，当 Oracle 质量不足（如 MCTS 模拟次数过少）时会发生什么？"
options:
  - "过程奖励退化为结果奖励，效果与 OR 相当"
  - "模型仅丢失训练环境性能，但下游泛化不受影响"
  - "噪声过程奖励会系统性损害域内性能和全部下游推理基准，效果甚至不如 Base 模型"
  - "训练速度变慢但最终收敛到相同性能"
answer: 2
explain: "消融实验显示弱 Oracle（N=100）导致域内 return 低于 Base，且 7 个下游基准均全面下降。命题 2 从理论上解释了这一现象：梯度偏差随 Oracle 误差线性放大，模型会学习利用 Oracle 的缺陷而非真正改进推理能力。"
```
