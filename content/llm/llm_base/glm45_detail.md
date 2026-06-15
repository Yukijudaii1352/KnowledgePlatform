### GLM-4.5 (Agentic, Reasoning, and Coding Foundation Models)

#### 📝 一句话总结

GLM-4.5 提出了一种 **355B 总参数 / 32B 激活参数的 MoE 架构大语言模型**，通过多阶段预训练（23T tokens）与专家模型迭代 + 强化学习的后训练流程，在 Agent、推理、编码（ARC）三大任务上取得顶尖性能——以远少于竞品的参数量，在 TAU-Bench、AIME 24、SWE-bench Verified 上分别达到 70.1%、91.0%、64.2%，综合排名第 3（Agent 子榜第 2），并同步开源了紧凑版 GLM-4.5-Air（106B）。

#### 🎯 核心要点

- **MoE 架构设计**：355B 总参数，32B 激活参数，采用 **loss-free balance routing** 与 **sigmoid gates**，减少宽度（hidden dim + routed experts 数量）换取更深网络，提升推理能力
- **自注意力创新**：Grouped-Query Attention + 部分 RoPE，**2.5 倍多的注意力头**（96 头 / 5120 hidden dim），配合 QK-Norm 稳定注意力 logits，虽不降训练 Loss 但显著提升 MMLU/BBH 推理基准
- **23T tokens 多阶段预训练**：从 4K 逐步扩展至 128K 上下文，中训阶段引入 repo-level 代码、合成推理数据、长上下文 Agent 训练
- **后训练两阶段专家迭代**：Stage 1（Expert Training）分赛道独立训练推理/Agent/通用专家；Stage 2（Unified Training）融合蒸馏为单一模型，支持 hybrid 思考/快速响应模式
- **推理 RL**：基于 GRPO（去 KL 项），采用 **难度课程学习**（两阶段：中等到极难）、**单阶段 64K 输出长度**优于多阶段渐进式、动态采样温度调节探索
- **Agent RL**：Outcome Supervision + Process Action Format Penalty，迭代自蒸馏，**通过增加交互轮数扩展推理时计算**
- **通用 RL**：Holistic RL 多任务混合、Instruction Following RL、Function Calling RL、Pathology RL（纠正拒答/重复等病态行为）
- **Slime RL 基础设施**：Megatron 训练 + vLLM 推理的混合架构，支持混合精度加速 rollout，面向 Agent 场景的异步长任务 RL 设计

#### 🔬 深入细节

---

##### 1. 模型架构：更深、更多头的 MoE

GLM-4.5 是智谱首个开源 MoE 模型，架构上有几处**反直觉但有效的设计选择**：

![GLM-4.5 ARC 基准综合表现](https://ar5iv.labs.arxiv.org/html/2508.06471/assets/x1.png)
*图 1：GLM-4.5 在 Agent/Reasoning/Coding (ARC) 综合基准上的表现，355B 即排名第 3，106B 的 Air 版排名第 6*

**MoE 层设计**：
- 采用 **loss-free balance routing**（参考 [Wang et al. 2024]），无需额外负载均衡损失即可实现专家均衡负载
- 门控函数使用 **sigmoid gates**（而非 Softmax），与 DeepSeek-V3 和 Kimi K2 一致
- **关键差异**：相比 DeepSeek-V3 和 Kimi K2，GLM-4.5 **减少了宽度**（hidden dimension 和 routed experts 数量），转而**增加深度**（更多层），实验发现更深模型具有更好的推理能力
- MoE 层替换了标准 Transformer 中的 MLP 层，前 1/3 层为 Dense MLP，后 2/3 层为 MoE

**注意力机制创新**：
```python
# GLM-4.5 注意力设计的核心思路
# 1. Grouped-Query Attention (GQA) + 部分 RoPE
# 2. 2.5倍注意力头数：5120 hidden_dim → 96 heads
#    标准配置通常为 ~40 heads
# 3. QK-Norm 稳定注意力 logits

# 伪代码：注意力层
class GLM45Attention:
    def __init__(self, hidden_dim=5120, num_heads=96):
        self.num_heads = num_heads  # 2.5x 标准配置
        self.head_dim = hidden_dim // num_heads
        self.q_proj = Linear(hidden_dim, hidden_dim)
        self.k_proj = Linear(hidden_dim, num_kv_heads * head_dim)  # GQA
        self.v_proj = Linear(hidden_dim, num_kv_heads * head_dim)
        self.qk_norm = QKLayerNorm()  # 稳定 logits 范围
        self.out_proj = Linear(hidden_dim, hidden_dim)

    def forward(self, x, rope_pos):
        q = self.q_proj(x)
        k = self.k_proj(x)
        v = self.v_proj(x)
        # QK-Norm 在计算注意力分数前稳定分布
        q, k = self.qk_norm(q), self.qk_norm(k)
        # 部分 RoPE：仅对部分维度施加旋转位置编码
        q, k = apply_partial_rope(q, k, rope_pos)
        # 标准缩放点积注意力 + GQA 扩展
        return flash_attention(q, k, v)
```

> **反直觉现象**：增加注意力头数到 2.5 倍**并不会改善训练 Loss**，但在 MMLU、BBH 等推理基准上持续提升——这是一种典型的"训练-评测解耦"现象，说明更多注意力头增强了模型的泛化与推理模式多样性。

**总览**：
| 模型 | 总参数 | 激活参数 | 层数 | Hidden Dim | 注意力头 |
|------|--------|----------|------|------------|----------|
| GLM-4.5 | 355B | 32B | 较多 | 5120 | 96 |
| GLM-4.5-Air | 106B | ~12B | — | — | — |

---

##### 2. 预训练与中训：23T tokens 的多阶段配方

![预训练与中训阶段](https://ar5iv.labs.arxiv.org/html/2508.06471/assets/x3.png)
*图 3：GLM-4.5 的预训练与中训（Mid-Training）阶段概览，上下文从 4K 逐步扩展至 128K*

**多阶段预训练**：
1. **Stage 1**：4K 上下文，通用语料预训练
2. **Stage 2**：逐步扩展上下文至 128K（长文本适应）
3. **数据组成**：多语言（中英为主）、代码（GitHub 等）、数学与科学文献

**中训（Mid-Training）三大专项**——提升推理与 Agent 能力的关键阶段：

- **Repo-level Code Training**：在完整代码仓库级别进行训练，让模型理解跨文件依赖、项目结构、构建系统
- **Synthetic Reasoning Data Training**：合成推理链数据，训练模型的多步逻辑推理能力
- **Long-context & Agent Training**：长上下文 + 工具调用/环境交互的 Agent 数据

---

##### 3. 后训练核心：专家模型迭代 + 强化学习

后训练的精妙之处在于**"分而治之，再融合"**的两阶段设计：

**Stage 1 — Expert Training（专家训练）**：
各赛道独立训练专家模型：
- 推理专家（Reasoning Expert）：推理 RL 优化
- Agent 专家（Agentic Expert）：Agent RL 优化
- 通用专家（General Expert）：通用 RL 优化

每个专家在各自领域都经过 SFT 冷启动 → RL 优化的完整流程。

**Stage 2 — Unified Training（统一训练）**：
将多个专家模型的能力通过 SFT 蒸馏融合为单一模型，最终产出同时支持 **thinking 模式**（复杂推理/Agent 任务）和 **non-thinking 模式**（即时响应）的混合推理模型。

---

##### 4. 推理 RL：难度课程 + 单阶段长输出

![难度课程学习](https://ar5iv.labs.arxiv.org/html/2508.06471/assets/x4.png)
*图 5：两阶段难度课程在 AIME'24 上的效果。蓝线（本文方法）第二阶段切换到极难问题（pass@8==0, pass@512>>0），带来持续提升*

**GRPO 变体**：
- 基于 GRPO 框架，**移除了 KL 损失项**（实践中发现不必要）
- 奖励信号完全来自结果验证（数学题答案匹配、代码执行通过率等）

**三大技术创新**：

**(a) 难度课程学习（Difficulty-based Curriculum）**：
```
Stage 1: 中等难度问题 → 建立基本推理能力
Stage 2: 极难问题（pass@8 == 0）→ 激发涌现的深度推理能力
关键洞察：切换到极难问题后，虽然 pass@8=0，但 pass@512>>0，
说明模型在探索中发现了有效但罕见的推理路径
```

**(b) 单阶段 64K 输出长度训练**：
![单阶段 vs 多阶段 RL](https://ar5iv.labs.arxiv.org/html/2508.06471/assets/x5.png)
*图 6：单阶段 64K RL（红线）vs 多阶段渐进式（蓝线）的对比。单阶段直接训练长输出效果更好*

> **反直觉发现**：直接从 64K 输出长度开始训练（单阶段）优于逐步增加输出长度的多阶段训练。渐进式训练在每次长度切换时都会经历性能下降，说明模型需要"一次性"学会在长上下文中分配思考预算。

**(c) 动态采样温度**：
- 训练过程中根据难度和训练阶段自适应调整采样温度
- 简单问题：低温度，鼓励精确解
- 困难问题：高温度，鼓励多样化探索

**(d) 代码与科学 RL 的 Token-Weighted Loss**：
![Code & Science RL 消融](https://ar5iv.labs.arxiv.org/html/2508.06471/assets/x6.png)
*图 7：代码与科学 RL 的消融实验。Token-weighted mean loss（绿色）相比 sequence-mean loss 收敛更快*

```python
# 基于论文描述的简化伪代码
def compute_rl_loss(sequences, rewards, advantages):
    """
    Token-weighted mean loss（论文提出的改进）
    相比 sequence-mean loss，对每个 token 按其所在序列的 advantage 加权
    """
    total_loss = 0
    total_tokens = 0
    for seq, r, adv in zip(sequences, rewards, advantages):
        for token_logprob in seq:
            # 每个 token 的 loss 用整条序列的 advantage 加权
            total_loss += -token_logprob * adv
            total_tokens += 1
    return total_loss / total_tokens  # token-weighted mean
```

---

##### 5. Agent RL：交互轮数即推理时计算

**数据收集与合成**：自动化 Agent SFT 数据构建管线，无需人工标注即可大规模生成 Agent 训练数据。

**RL 优化**：

**(a) Outcome Supervision + Process Action Format Penalty**：
- 仅对最终结果给予奖励（Outcome Supervision），不设过程奖励模型
- 额外施加 **动作格式惩罚**：对格式错误的 tool call 进行负奖励，确保模型输出的 Action 始终可解析、可执行

**(b) 迭代自蒸馏（Iterative Self-distillation）**：
```
for iteration in 1..N:
    1. 用当前策略采样多条 Agent 交互轨迹
    2. 筛选成功轨迹（完成任务）
    3. 用成功轨迹进行 SFT 蒸馏（教师=采样策略，学生=当前模型）
    4. 在蒸馏后的模型上进行新一轮 RL
```

**(c) 通过交互轮数扩展推理时计算**：
![交互轮数扩展](https://ar5iv.labs.arxiv.org/html/2508.06471/assets/x7.png)
*图 8：BrowseComp 上交互轮数扩展的效果——更多交互轮数 ≈ 更多"思考"时间*

> **核心洞察**：在 Agent 场景中，推理时计算（test-time compute）的形式不是思考 token，而是**与环境交互的轮数**。论文展示了通过增加交互轮数可以有效提升 Agent 任务表现，类似于推理模型中的"长思考链"。

---

##### 6. 通用 RL：从指令遵循到病理纠正

![Instruction Following RL](https://ar5iv.labs.arxiv.org/html/2508.06471/assets/x8.png)
*图 9：Instruction Following RL 训练曲线，reward 与 SysBench-ISR 分数同步提升*

GLM-4.5 的通用 RL 阶段包含四项训练，每一项针对特定的模型行为缺陷：

| RL 类型 | 目标 | 关键技术 |
|---------|------|----------|
| **Holistic RL** | 多任务综合能力提升 | 混合所有任务类型数据，统一训练 |
| **Instruction Following RL** | 精确遵循复杂指令 | GRPO + SysBench-ISR 作为奖励信号 |
| **Function Calling RL** | 准确生成结构化工具调用 | 格式正确性 + 调用结果正确性双奖励 |
| **Pathology RL** | 纠正病态行为（拒答、重复、冗长） | 负例惩罚 + 正例奖励 |

---

##### 7. Slime RL 基础设施：异步混合架构

![Slime RL 基础设施](https://ar5iv.labs.arxiv.org/html/2508.06471/assets/x9.png)
*图 10：Slime RL 基础设施总览。三大核心模块：Training（Megatron）、Inference（vLLM 混合精度）、Agent Controller（异步长任务）*

**架构设计三大亮点**：

**(a) 灵活的混合训练与数据生成架构**：
```
Training Module (Megatron) ← Data Buffer → Inference Module (vLLM)
         ↓                                        ↓
    梯度同步 & 参数更新                    异步 Rollout 生成
```

**(b) 混合精度推理加速 Rollout**：
- 推理模块使用混合精度（FP8/INT8）加速轨迹采样
- 训练模块保持高精度（BF16/FP32）

**(c) 面向 Agent 的异步 RL 基础设施**：
- Agent 任务涉及复杂环境交互（网页浏览、代码执行、API 调用），单次 rollout 可能耗时数分钟
- Slime 设计了**异步 Agent Controller**，将 Agent rollout 与训练循环解耦
- 支持大规模并行 Agent 交互，不阻塞训练主循环

---

##### 8. 性能总结

![SWE-bench vs 参数规模](https://ar5iv.labs.arxiv.org/html/2508.06471/assets/x2.png)
*图 2：SWE-bench Verified 分数 vs 模型参数量。GLM-4.5 以一半于 DeepSeek-R1 的参数实现 64.2% 的得分*

| 基准 | GLM-4.5 (355B) | GLM-4.5-Air (106B) | 对比亮点 |
|------|----------------|---------------------|----------|
| TAU-Bench (Agent) | 70.1% | — | Agent 榜单第 2 |
| AIME 24 (Reasoning) | 91.0% | — | 接近 o3 水平 |
| SWE-bench Verified | 64.2% | — | 代码榜单第 3 |
| 综合 ARC 排名 | 第 3 | 第 6 | 参数远少于对手 |

---

#### 📚 练习题

1. **MoE 宽度 vs 深度**：论文选择减少宽度、增加深度的设计，并指出更深模型推理能力更强。请分析这一现象可能的原因（可从表达能力的角度思考）。

2. **多注意力头的反直觉现象**：2.5 倍注意力头不改善训练 Loss 但提升推理性能。请设计一个实验来验证这一现象是否具有普适性，以及可能的理论解释。

3. **单阶段 vs 多阶段 RL**：论文发现单阶段 64K 训练优于渐进式多阶段。这一结论是否可能依赖于模型规模或任务类型？请讨论其适用边界。

4. **Agent 交互轮数即 Test-time Compute**：在 Agent 场景中，如何将"交互轮数"与推理模型中的"思考 token 数"建立形式化类比？尝试设计一个统一的理论框架。

5. **两阶段专家迭代**：Stage 1 分赛道训练专家、Stage 2 融合蒸馏。这种模式的潜在缺陷是什么？如果专家之间的能力互相冲突，融合阶段应如何处理？

---

*论文链接：https://arxiv.org/abs/2508.06471*
