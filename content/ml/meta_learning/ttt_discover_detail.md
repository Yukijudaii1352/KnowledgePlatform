### TTT-Discover: Learning to Discover at Test Time

```yaml
id: ttt_discover
name: TTT-Discover
full_name: 测试时训练发现 (Test-Time Training to Discover)
year: 2025
org: Stanford University / NVIDIA / UC San Diego / Together AI
paper_url: https://arxiv.org/abs/2601.16175
category: meta_learning
parent: —
motivation: 在测试时通过RL持续训练LLM权重来解决科学发现问题，结合熵目标函数和PUCT树搜索，在数学、GPU加速、算法竞赛、生物学等领域实现SOTA
```

---

## 📝 一句话总结

TTT-Discover 在测试时对 LLM 进行强化学习微调（而非冻结权重），通过 **自适应熵目标函数** 偏向最大 reward 和 **PUCT 树搜索** 复用高质量状态，在单个科学发现问题上持续训练 50 步即可超越人类和 AlphaEvolve 等先前 SOTA。

---

## 🎯 核心要点

| 维度 | 内容 |
|------|------|
| **问题** | 科学发现问题要求超越所有人类已知知识的 OOD 泛化，冻结 LLM 的搜索方法（如 AlphaEvolve）受限于固定策略分布 |
| **关键洞察** | 测试时更新权重（TTT）可以让策略分布逐步向高 reward 区域移动，但标准 RL 的期望 reward 目标不适合"只需一个最优解"的发现场景 |
| **方法** | (1) **Entropic Objective** \(J_\beta = \mathbb{E}_\pi[r] + \frac{1}{\beta}\mathcal{H}(\pi)\)，自适应 β 使分布逐步坍缩到最优解；(2) **PUCT 树搜索** 选择初始 state 平衡 exploit/explore，复用历史高分解 |
| **效果** | Erdős 最小重叠上界 0.380876（新 SOTA，较 AlphaEvolve 提升 16×）；GPU TriMul H100 1161μs（超越最佳人类 1371μs）；AtCoder 竞赛 567,062 分（新 SOTA） |
| **局限** | 单次运行成本 ~$500（512 rollouts × 50 steps）；需要可自动评估的 reward 信号；对 reward 噪声敏感 |

---

## 🔬 深入细节

### 问题建模：单问题 MDP

TTT-Discover 将每个科学发现问题建模为一个**单问题 MDP** \(\mathcal{M} = (\mathcal{S}, \mathcal{A}, T, R)\)：
- **State** \(s \in \mathcal{S}\)：候选解决方案（如一段代码或数学构造）
- **Action** \(a \in \mathcal{A}\)：LLM 生成的思考链 + 新代码
- **Transition** \(T\)：确定性地将 action 中的代码提取为新 state
- **Reward** \(R(s)\)：执行代码后的客观评分（如运行时间、数学界的值）

与标准 RL 不同，这里的目标不是最大化期望累积 reward，而是**找到单个最高 reward 的解**——这是科学发现的本质特征。

### 核心算法

![TTT-Discover Overview](https://arxiv.org/html/2601.16175v1/x1.png)

**图 1**：TTT-Discover 在测试时持续训练 LLM。随着训练步数增加（step 0→9→24→49），策略生成的解的 reward 分布逐步右移并超越人类最佳水平（以 GPU TriMul 竞赛为例）。

**Algorithm 1: TTT-Discover 主循环**

$$
\begin{aligned}
&\textbf{for } i = 0, 1, \ldots, N_{\text{steps}}-1 \textbf{ do} \\
&\quad s_{\text{init}} \leftarrow \text{PUCT-Select}(\text{Tree}) \quad \triangleright \text{选择初始状态} \\
&\quad \{(s_j, a_j, r_j)\}_{j=1}^{K} \leftarrow \text{Rollout}(\pi_{\theta_i}, s_{\text{init}}) \quad \triangleright K=512 \text{ 并行采样} \\
&\quad \text{Tree.Update}(\{s_j, r_j\}) \quad \triangleright \text{更新搜索树} \\
&\quad \theta_{i+1} \leftarrow \text{Train}(\theta_i, \{(s_j, a_j, r_j)\}, \beta_i) \quad \triangleright \text{Entropic RL 更新} \\
&\textbf{end for}
\end{aligned}
$$

### 组件一：自适应 Entropic Objective

标准 RL 最大化期望 reward \(\mathbb{E}_\pi[r]\)，但在发现问题中我们只关心**最大值** \(\max r\)。TTT-Discover 引入带温度参数的熵正则化目标：

$$
J_\beta(\theta) = \mathbb{E}_{\pi_\theta}[r(s)] + \frac{1}{\beta} \mathcal{H}(\pi_\theta)
$$

当 \(\beta \to \infty\) 时，最优策略 \(\pi^*_\beta\) 的概率质量集中在最高 reward 的解上（即 \(\pi^*(s) \propto e^{\beta \cdot r(s)}\)）。关键创新在于 **β 自适应调度**：

$$
\beta_i = \beta_0 \cdot \alpha^i, \quad \alpha > 1
$$

初始 β 较小（鼓励探索），随训练步数指数增长（逐步聚焦最优解）。这避免了标准 RL 中过早坍缩到次优解的问题，同时最终收敛到 max-reward 策略。

实际训练使用 **GRPO（Group Relative Policy Optimization）** 作为策略梯度估计器，配合 LoRA rank-32 进行参数高效微调。

### 组件二：PUCT 树搜索复用状态

每步训练需要选择一个初始 state \(s_{\text{init}}\) 作为 prompt 的一部分。朴素方法（如 ε-greedy）要么过度 exploit 当前最优解，要么随机 explore 低质量区域。TTT-Discover 借鉴 AlphaGo 的 PUCT 公式：

$$
\text{PUCT}(s) = Q(s) + c \cdot \frac{\sqrt{\sum_{s'} N(s')}}{1 + N(s)}
$$

其中 \(Q(s)\) 是节点 s 的最大（而非平均）子树 reward，\(N(s)\) 是访问次数，\(c\) 是探索常数。选择 PUCT 值最高的节点作为下一步的初始状态。

**关键设计选择**：使用 **max-Q**（最大子节点 reward）而非 mean-Q，因为发现问题只关心找到单个最优解。这与标准 MCTS 使用 mean-Q 的博弈场景不同。

### 实验结果

**Table 1: 跨领域主要结果**

| 领域 | 指标 | Best Human | Prev. Best AI | TTT-Discover |
|------|------|-----------|---------------|--------------|
| 数学 (Erdős) | 上界 ↓ | 0.380927 | 0.380924 (Novikov'25) | **0.380876** |
| GPU Kernel (A100) | 延迟 ↓ | 4531μs | N/A | **2198μs** |
| GPU Kernel (H100) | 延迟 ↓ | 1371μs | N/A | **1161μs** |
| 算法 (AtCoder) | 分数 ↑ | 566,997 | 558,026 (Lange'25) | **567,062** |
| 生物 (去噪) | 相关性 ↑ | 0.64 | N/A | **0.71** |

在 Erdős 最小重叠问题上，TTT-Discover 将上界从 0.380927 降至 0.380876，改进量是 AlphaEvolve 的 **16 倍**（AlphaEvolve: 0.380926→0.380924，改进 2×10⁻⁶；TTT-Discover 改进 51×10⁻⁶）。

### 消融实验（Table 8, GPU TriMul H100）

| 配置 | 延迟 (μs) | 说明 |
|------|-----------|------|
| **Full TTT-Discover** | **1203** | 完整系统 |
| Constant β | 1484 | 去掉自适应，β 固定 |
| Expected reward (β→0) | 1986 | 标准 RL 目标 |
| No TTT (frozen LLM) | 2061 | 不更新权重 |
| ε-greedy (no PUCT) | 1329 | 简单探索策略 |
| No state reuse | 5274 | 每步从空白开始 |
| Naive RL | 5329 | 无 PUCT + 标准目标 |
| Best-of-N | 5352 | 纯采样基线 |

消融表明：(1) 自适应 β 相比固定 β 提升 23%，相比标准期望目标提升 65%；(2) PUCT 相比 ε-greedy 提升 10%；(3) 状态复用是最关键因素（无复用性能下降 4.4×）；(4) TTT 本身（权重更新）相比 frozen LLM 提升 71%。

### 实现细节

- **基础模型**：Qwen2.5-Coder-32B-Instruct
- **微调**：LoRA rank 32，仅更新 attention 层
- **每步采样**：512 rollouts（并行生成）
- **总步数**：50 步（共 25,600 次代码生成）
- **单次运行成本**：~$500（8×H100 约 4 小时）
- **PUCT 探索常数**：c = 1.0
- **β 调度**：β₀ = 0.1，α = 1.1（指数增长）

---

## 🧪 练习题

1. **概念题**：为什么科学发现问题中最大化"期望 reward"不如最大化"最大 reward"？试从信息论角度解释 entropic objective 如何在 β→∞ 时实现后者。

2. **推导题**：证明当 \(\pi^*(s) \propto e^{\beta \cdot r(s)}\) 时，\(\beta \to \infty\) 的极限分布将所有概率质量集中在 \(\arg\max_s r(s)\) 上。提示：考虑 softmax 温度趋近 0 的行为。

3. **设计题**：假设你要将 TTT-Discover 应用于蛋白质折叠优化（reward = 结构稳定性分数），但每次 reward 评估需要 10 分钟的分子动力学模拟。你会如何修改算法以适应高评估成本？考虑：(a) 减少每步 rollout 数量的影响；(b) 是否可以训练一个 reward 代理模型；(c) PUCT 中 exploration 常数 c 应如何调整。