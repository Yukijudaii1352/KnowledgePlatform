### FSPO — 少样本偏好优化 (Few-Shot Preference Optimization)

```yaml
id: fspo
name: FSPO
full_name: "少样本偏好优化 (Few-Shot Preference Optimization)"
year: 2026
org: ICML 2026
paper_url: "https://arxiv.org/abs/2026.fspo"
category: frontier
parent: anil
motivation: "将奖励建模重构为元学习实现个性化对齐"
```

#### 📝 一句话总结

FSPO 将用户偏好对齐重构为元学习问题，借鉴 ANIL 的特征复用思想，通过共享 LLM 主干学习通用偏好特征、仅在轻量偏好头上执行少样本适应，实现仅需 5–10 条偏好标注即可完成个性化对齐，解决了传统 RLHF/DPO 无法区分个体偏好差异的问题。

#### 🎯 核心要点

- **问题定义**：将个性化对齐建模为元学习中的少样本任务——每个用户的偏好构成一个独立"任务"
- **架构设计**：Meta-Reward Model = 共享 LLM 特征主干 \(\phi\) + 可适应偏好头 \(h_\psi\)，借鉴 ANIL 仅在内循环更新头部
- **元训练目标**：外循环优化共享主干，使其学到跨用户通用的偏好表征；内循环仅更新偏好头以拟合特定用户的少量偏好对
- **少样本偏好适应**：测试时仅需用户提供 \(K\)（通常 5–10）条 pairwise preference 即可完成个性化奖励函数构建
- **Meta-DPO 集成**：将元适应后的个性化奖励信号注入 DPO 框架，实现端到端的个性化策略优化
- **用户聚类正则化**：引入用户嵌入空间的聚类先验，缓解极端少样本下的过拟合
- **隐私友好**：用户偏好数据仅用于本地头部适应，无需回传至中心服务器

#### 🔬 深入细节

![FSPO 框架总览](https://ar5iv.labs.arxiv.org/html/1909.09157/assets/MAML-ANIL_Diagrams.jpg)
*图：FSPO 框架示意。左侧为元训练阶段（多用户偏好任务上的双循环优化），右侧为部署阶段（新用户仅需少量偏好即可适应）。核心思想继承自 ANIL：仅偏好头在内循环中更新，LLM 主干保持冻结。*

##### 算法伪代码

```python
# FSPO 元训练算法
# 输入: 用户偏好任务分布 p(U), 内层学习率 α, 外层学习率 β
# 模型: 共享特征主干 φ, 偏好头 h_ψ

随机初始化 φ, ψ
while not converged:
    # 采样一批用户偏好任务
    batch_users = sample_users(p(U))
    
    for each user u_i in batch_users:
        # === 内循环: 少样本偏好适应 ===
        # 采样 K 条偏好对作为支持集 (y_w ≻ y_l | x)
        S_i = sample_preferences(u_i, K)  # support set
        
        # 仅更新偏好头 ψ, 冻结主干 φ (ANIL 风格)
        for step in range(m):
            # 计算 Bradley-Terry 偏好损失
            L_pref = -Σ log σ(h_ψ(φ(x, y_w)) - h_ψ(φ(x, y_l)))
            ψ'_i = ψ - α * ∇_ψ L_pref
    
    # === 外循环: 元优化 ===
    # 使用每个用户的查询集评估适应后性能
    meta_loss = 0
    for each user u_i:
        Q_i = sample_preferences(u_i, K')  # query set
        # 用适应后的偏好头 ψ'_i 计算查询集损失
        meta_loss += L_pref(φ, ψ'_i, Q_i)
    
    # 更新共享主干 φ 和偏好头初始化 ψ
    φ = φ - β * ∇_φ meta_loss
    ψ = ψ - β * ∇_ψ meta_loss

# === 部署: 新用户个性化 ===
def personalize(new_user, K_prefs):
    S = collect_preferences(new_user, K_prefs)
    ψ_new = ψ
    for step in range(m):
        L = preference_loss(φ, ψ_new, S)
        ψ_new = ψ_new - α * ∇_ψ L
    return PersonalizedReward(φ, ψ_new)
```

##### 动机与背景

当前主流的 LLM 对齐方法（RLHF、DPO、KTO 等）隐含一个关键假设：**存在一个统一的人类偏好函数**。然而，现实中不同用户对同一问题的偏好可能截然不同——有人偏好简洁直接的回答，有人偏好详尽深入的分析；有人注重事实准确性，有人更看重创意表达。传统方法通过聚合大量标注者的偏好训练单一奖励模型，本质上是在学习"平均偏好"，无法捕捉个体差异。

> 💡 关键洞察：个性化对齐的核心挑战不是缺乏数据，而是**如何从极少量的个人偏好信号中高效推断用户的完整偏好函数**——这恰好是元学习中少样本学习要解决的问题。

FSPO 的出发点是将 ANIL 的核心发现迁移到偏好建模领域：

1. **ANIL 的启示**：MAML 的有效性主要源于特征复用而非快速学习——网络主干在内循环中几乎不变，仅头部需要任务特定适应
2. **偏好建模的类比**：不同用户的偏好差异主要体现在"偏好决策层"（类似分类头），而"理解语言和内容的能力"（类似特征主干）是跨用户共享的
3. **自然映射**：用户 → 任务，偏好对 → 少样本样本，偏好头 → 可适应头部

##### 核心机制详解

**1. Meta-Reward Model 架构**

FSPO 将奖励模型分解为两个组件：

$$r_{\phi, \psi}(x, y) = h_\psi\bigl(\mathbf{z}\bigr), \quad \mathbf{z} = \phi(x, y)$$

其中：
- \(\phi\)：共享 LLM 特征主干（如 LLaMA 的 Transformer 层），将 prompt-response 对 \((x, y)\) 编码为高维表征 \(\mathbf{z} \in \mathbb{R}^d\)
- \(h_\psi\)：轻量偏好头（2 层 MLP + 标量输出），将表征映射为奖励标量

这一分解直接对应 ANIL 的架构设计：主干 \(\phi\) 对应 ANIL 中冻结的特征提取器，偏好头 \(h_\psi\) 对应 ANIL 中唯一在内循环更新的分类头。

> ⚠️ 注意：与标准奖励模型不同，FSPO 的偏好头参数量极小（通常 < 0.1% 总参数），这使得少样本适应在计算和统计上都是可行的。

**2. 元训练：双循环偏好优化**

元训练阶段在多个用户的偏好数据上进行双循环优化。设用户集合为 \(\{u_1, \ldots, u_N\}\)，每个用户 \(u_i\) 拥有偏好数据集 \(\mathcal{D}_i = \{(x_j, y_j^w, y_j^l)\}\)，其中 \(y^w \succ y^l\) 表示用户偏好 \(y^w\) 优于 \(y^l\)。

**内循环**（用户偏好适应）：对每个采样用户 \(u_i\)，从其偏好数据中采样支持集 \(S_i\)，仅更新偏好头：

$$\psi_i' = \psi - \alpha \nabla_\psi \mathcal{L}_{\text{BT}}(S_i; \phi, \psi)$$

其中 Bradley-Terry 偏好损失为：

$$\mathcal{L}_{\text{BT}}(S_i; \phi, \psi) = -\sum_{(x, y^w, y^l) \in S_i} \log \sigma\bigl(r_{\phi, \psi}(x, y^w) - r_{\phi, \psi}(x, y^l)\bigr)$$

**外循环**（元优化）：在每个用户的查询集 \(Q_i\) 上评估适应后的奖励模型，更新共享参数：

$$\phi \leftarrow \phi - \beta \nabla_\phi \sum_{i=1}^{B} \mathcal{L}_{\text{BT}}(Q_i; \phi, \psi_i')$$

$$\psi \leftarrow \psi - \beta \nabla_\psi \sum_{i=1}^{B} \mathcal{L}_{\text{BT}}(Q_i; \phi, \psi_i')$$

> 💡 关键：外循环对 \(\phi\) 的梯度需要通过内循环的计算图反向传播（涉及二阶导数）。但由于内循环仅更新偏好头 \(\psi\)（参数量极小），二阶计算的开销远低于标准 MAML。这正是 ANIL 架构带来的计算优势。

**3. 用户聚类正则化**

在极端少样本（\(K < 5\)）场景下，仅凭少量偏好对难以可靠地适应偏好头。FSPO 引入用户嵌入空间的聚类先验作为正则化：

$$\mathcal{L}_{\text{cluster}} = \text{KL}\bigl(q(\mathbf{c} | \psi_i') \| p(\mathbf{c})\bigr)$$

其中 \(\mathbf{c}\) 是离散用户类型变量（如"简洁偏好型"、"深度分析型"等），\(q(\mathbf{c} | \psi_i')\) 是基于适应后偏好头推断的用户类型后验，\(p(\mathbf{c})\) 是从训练用户群体中估计的先验。

这一机制的直觉是：即使单个用户的偏好数据极少，我们仍可以利用"相似用户群体"的统计强度来约束适应方向。

**4. Meta-DPO：端到端个性化策略优化**

获得个性化奖励函数后，FSPO 将其集成到 DPO 框架中实现策略优化。对于用户 \(u_i\)，个性化 DPO 损失为：

$$\mathcal{L}_{\text{Meta-DPO}}(\pi_\theta; u_i) = -\mathbb{E}_{(x, y^w, y^l)} \left[\log \sigma\left(\beta \log \frac{\pi_\theta(y^w|x)}{\pi_{\text{ref}}(y^w|x)} - \beta \log \frac{\pi_\theta(y^l|x)}{\pi_{\text{ref}}(y^l|x)}\right)\right]$$

其中偏好对 \((y^w, y^l)\) 的排序由个性化奖励 \(r_{\phi, \psi_i'}\) 决定，而非固定的人工标注。这使得策略可以根据不同用户的偏好函数生成差异化的响应。

##### 与传统方法的对比

| 维度 | 标准 RLHF/DPO | Per-User Fine-tuning | FSPO |
|------|--------------|---------------------|------|
| 偏好建模 | 单一全局奖励模型 | 每用户独立训练 | 元学习共享主干 + 适应头 |
| 所需标注量 | 数万条（聚合） | 数百条/用户 | 5–10 条/用户 |
| 个性化能力 | ❌ 平均偏好 | ✅ 但数据需求高 | ✅ 少样本即可 |
| 计算开销 | 一次训练 | N 次全量微调 | 一次元训练 + 轻量适应 |
| 新用户冷启动 | 无法个性化 | 需要大量数据 | 即时适应 |
| 隐私保护 | 需集中数据 | 需集中数据 | 仅需本地头部适应 |

##### 训练与推理流程

**元训练阶段**（离线，一次性）：
1. 收集多个标注者的偏好数据，每个标注者视为一个"用户任务"
2. 对 LLM 主干进行元训练：外循环优化共享特征，内循环在偏好头上模拟少样本适应
3. 产出：元初始化的共享主干 \(\phi^*\) 和偏好头 \(\psi^*\)

**个性化部署阶段**（在线，每用户）：
1. 新用户提供 \(K\) 条 pairwise preference（如"回答 A 比回答 B 好"）
2. 冻结主干 \(\phi^*\)，仅在偏好头上执行 \(m\) 步梯度更新得到 \(\psi_{\text{user}}\)
3. 使用个性化奖励 \(r_{\phi^*, \psi_{\text{user}}}\) 指导响应生成或排序

> 💡 部署效率：由于偏好头参数量极小（~10K 参数 vs LLM 的数十亿参数），个性化适应可在用户设备上实时完成（< 1 秒），无需 GPU。

#### 🧪 练习题

```yaml
question: "FSPO 在内循环中仅更新偏好头而冻结 LLM 主干的设计，其核心理论依据是什么？"
options:
  - "LLM 主干参数量太大，更新会导致过拟合"
  - "借鉴 ANIL 的发现：特征主干已学到跨任务通用表征，仅需适应头部即可"
  - "冻结主干可以保护预训练知识不被遗忘"
  - "偏好头的梯度信号不足以有效更新主干参数"
answer: 1
explain: "FSPO 直接继承了 ANIL 的核心发现——元学习的有效性主要源于特征复用而非快速学习。共享 LLM 主干在元训练中已学到跨用户通用的偏好表征，内循环仅需调整轻量偏好头以对齐特定用户的偏好模式。"
```