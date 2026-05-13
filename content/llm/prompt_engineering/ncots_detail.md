### NCoTS — 神经思维链搜索 (Neural CoT Search)

```yaml
id: ncots
name: NCoTS
full_name: "神经思维链搜索 (Neural CoT Search)"
year: "2026.01"
org: arXiv
paper_url: "https://arxiv.org/abs/2601.11340"
category: frontier_2026
parent: tot
motivation: "搜索最优推理路径减少冗余提升准确率"
```

#### 📝 一句话总结

NCoTS 将大语言模型的推理过程重新建模为**最优思维策略的动态搜索问题**，在每个推理决策点通过双因子启发式函数（路径潜力 + 推理进度）评估候选推理算子，实现了准确率提升 3.5% 同时生成长度缩减 22% 的帕累托改进。

#### 🎯 核心要点

- **推理路径规划瓶颈**：揭示当前大推理模型（LRM）缺乏前瞻性，在关键决策点无法战略性地选择推理方向，导致陷入冗余的次优路径
- **推理算子（Reasoning Operators）**：定义思维 token 集合 \(O = \{\text{Wait}, \text{So}, \text{Then}, \ldots\}\) 作为推理方向的控制信号，不同算子一致性地触发不同思维模式
- **四阶段搜索框架**：暂停生成（Pause）→ 前瞻模拟（Lookahead）→ 启发式评估（Heuristic）→ 概率选择（Selection）
- **双因子启发式函数**：路径潜力估计器 \(\mathcal{H}_{\text{pot}}\)（通过 KL 散度从教师模型策略蒸馏）+ 进度估计器 \(\mathcal{H}_{\text{prog}}\)（MSE 回归预测推理完成比例）
- **复合评分**：\(S(o) = \mathcal{H}_{\text{pot}}(h_t, o) + \lambda \cdot \mathcal{H}_{\text{prog}}(h'_{t,o})\)，加法组合兼顾正确性与效率
- **极低开销**：仅增加 0.0017% 参数量，仅在约 3% 的 token 位置（步骤分隔符处）激活搜索
- **与现有方法兼容**：可与 AdaptThink 等推理效率方法叠加使用，效果进一步提升

#### 🔬 深入细节

##### 核心框架图

![NCoTS 框架总览](https://ar5iv.labs.arxiv.org/html/2601.11340/assets/x2.png)
*图：NCoTS 框架总览。(a) 路径潜力估计器通过策略蒸馏从教师模型获取高层规划能力；(b) 进度估计器预测推理完成比例；(c) 四阶段搜索流程在每个决策点评估候选算子并选择最优方向。*

![推理动机与路径规划重要性](https://ar5iv.labs.arxiv.org/html/2601.11340/assets/x1.png)
*图：(a) 传统 CoT 的规划瓶颈——模型在关键分叉点缺乏前瞻；(b) 来自强教师模型的稀疏引导 token 仅占总输出约 3%，却带来平均 6.2% 的准确率提升，证实路径规划是核心瓶颈。*

##### 算法伪代码

```python
# NCoTS 核心搜索流程伪代码
def ncots_generate(model, prompt, operators, H_pot, H_prog, λ, τ):
    """
    model:     基础推理模型 (如 DeepSeek-R1-Distill-Qwen-7B)
    operators: 推理算子集合 O = {"Wait", "So", "Then", ...}
    H_pot:     路径潜力估计器 (KL散度策略蒸馏训练)
    H_prog:    进度估计器 (MSE回归训练)
    λ:         进度权重超参数
    τ:         softmax温度参数
    """
    tokens = []
    while not is_finished(tokens):
        next_token = model.generate_next(prompt + tokens)
        tokens.append(next_token)

        if next_token == STEP_DELIMITER:  # 检测到 "\n\n" 步骤分隔符
            # ── Phase 1: Pause Generation ──
            # 暂停标准自回归生成

            # ── Phase 2: Lookahead Simulation ──
            scores = {}
            h_t = model.get_hidden_state(tokens)
            for o in operators:
                # 将算子 o 追加到 KV cache，获取前瞻隐藏状态
                h_prime = model.forward_one_token(tokens + [o])

                # ── Phase 3: Heuristic Evaluation ──
                pot  = H_pot(h_t, o)        # 路径潜力 (正确概率)
                prog = H_prog(h_prime)      # 进度估计 (完成比例)
                scores[o] = pot + λ * prog  # 加法复合评分

            # ── Phase 4: Probabilistic Selection ──
            probs = softmax([scores[o] / τ for o in operators])
            best_op = sample(operators, probs)
            tokens.append(best_op)

    return tokens
```

##### 动机与背景

当前的大推理模型（如 DeepSeek-R1、QwQ）通过链式思维（CoT）在数学、逻辑和编程任务上取得了显著进展。然而，这些模型在生成推理步骤时是**逐步顺序生成的，缺乏对整体推理路径的前瞻规划**。这导致模型经常陷入次优的推理路径，产生大量冗余的反思和重复步骤。

> 💡 关键发现：论文通过实验揭示，来自强教师模型（如 DeepSeek-R1）的稀疏引导 token 仅占总输出的约 3%，却能带来平均 6.2% 的准确率提升。这证明**推理模型的核心瓶颈不在于计算能力，而在于路径规划能力**。

##### 推理解空间的量化表征

论文首先对推理解空间进行了系统的量化分析。通过在每个决策点随机采样不同的推理算子，生成大量不同的推理路径，并绘制"平均长度 vs 平均准确率"的密度热力图：

![推理解空间可视化](https://ar5iv.labs.arxiv.org/html/2601.11340/assets/x3.png)
*图：推理解空间的密度热力图。原始模型输出（Original）左上方区域的存在证实了"更准确且更简洁"的优越路径确实存在。*

这一分析揭示了四个关键洞察：
1. **优越路径存在**：确实存在同时比标准输出更准确、更简洁的推理路径
2. **路径稀疏性**：这些优越路径在解空间中是稀疏的，随机搜索难以高效找到
3. **准确率-长度负相关**：更简洁的路径往往更准确，冗余步骤反而降低性能
4. **搜索的必要性**：需要有引导的搜索策略而非随机探索

##### 核心机制：四阶段搜索框架

NCoTS 的核心思想是在推理过程的每个**决策点**（即步骤分隔符 `\n\n` 出现的位置）进行主动的路径搜索：

**阶段 1：暂停生成（Pause Generation）**

标准生成过程在检测到步骤分隔符时立即暂停。步骤分隔符是推理步骤之间的自然边界（通常为 `\n\n`），代表模型即将选择下一个推理方向的关键时刻。

**阶段 2：前瞻模拟（Lookahead Simulation）**

在决策点，系统枚举所有候选推理算子 \(O = \{o_1, o_2, \ldots, o_K\}\)。每个算子对应一个"思维 token"，如 "Wait"（触发反思）、"So"（推进推导）、"Then"（引入新步骤）等。对每个候选算子 \(o\)，将其追加到当前 KV cache 中执行一步前向传播，获取前瞻隐藏状态：

$$\mathbf{h}'_{t,o} = \mathcal{M}\big([x, y_{<t}, o]\big), \quad \forall o \in O$$

> 💡 关键：论文发现推理算子与后续思维模式之间存在强对应关系——"Wait" 一致性地引导反思步骤，"Then" 触发顺序推进，"Alternatively" 引入替代方案。这种对应关系使得仅通过一步前瞻即可有效预测后续推理方向。

![算子与思维模式的对应关系](https://ar5iv.labs.arxiv.org/html/2601.11340/assets/x4.png)
*图：Sankey 图展示推理算子（思维 token）与后续思维模式的强对应关系。*

**阶段 3：启发式评估（Heuristic Evaluation）**

对每个候选算子，使用**双因子启发式函数**进行评分：

**因子 1：路径潜力估计器 \(\mathcal{H}_{\text{pot}}\)**

评估选择某个算子后最终得到正确答案的概率。实现为一个线性投影层，将当前隐藏状态映射为算子集合上的 logits。训练方式为**策略蒸馏**：以强教师模型（如 DeepSeek-R1）在算子集合上的概率分布 \(P_T\) 为目标，最小化 KL 散度：

$$\mathcal{L}_{\text{pot}} = \mathbb{E}_{h_t \sim \mathcal{D}} \left[ D_{\text{KL}} \Big( P_T(h_t) \;\big\|\; \mathcal{H}_{\text{pot}}(h_t) \Big) \right]$$

这一设计将教师模型的战略规划能力迁移到搜索过程中，充当"正确性指南针"。

**因子 2：进度估计器 \(\mathcal{H}_{\text{prog}}\)**

预测当前推理的完成比例，用于**惩罚冗余路径、奖励高效路径**。实现为一个线性回归头，将隐藏状态映射为标量。对于长度为 \(L\) 的完整推理路径中第 \(k\) 个 token，训练标签为归一化进度 \(l_k = k / L\)，使用均方误差损失：

$$\mathcal{L}_{\text{prog}} = \mathbb{E}_{(h_k, l_k) \sim \mathcal{D}} \left[ \left\| \mathcal{H}_{\text{prog}}(h_k) - l_k \right\|^2 \right]$$

通过最大化估计进度，搜索算法偏好能显著推进推理状态的算子，有效惩罚冗长或循环的步骤。

![进度估计器预测 vs 真实进度](https://ar5iv.labs.arxiv.org/html/2601.11340/assets/x5.png)
*图：进度估计器的预测值与真实进度的对比。指数平滑后的预测轨迹与真实进度高度吻合。*

> ⚠️ 注意：进度估计器采用 token 级别的密集监督训练，不仅在决策点处有效，在推理路径的任意位置都能提供可靠的进度预测。

**复合评分函数**

两个因子通过**加法**组合为复合评分：

$$S(o) = \underbrace{\mathcal{H}_{\text{pot}}(h_t, o)}_{\text{路径潜力}} + \lambda \cdot \underbrace{\mathcal{H}_{\text{prog}}(h'_{t,o})}_{\text{推理进度}}$$

其中 \(\lambda\) 是控制简洁性偏好的超参数。这一设计确保：
- 高潜力（更可能正确）的路径获得高分
- 在潜力相近时，进度更高（更接近完成）的路径被优先选择
- \(\lambda\) 越大，模型越倾向于选择简洁的推理路径

**阶段 4：概率选择（Probabilistic Selection）**

为保持多样性并避免局部最优，将评分转化为概率分布后采样：

$$P_{\text{search}}(o | h_t) = \frac{\exp(S(o) / \tau)}{\sum_{o' \in O} \exp(S(o') / \tau)}$$

最终算子通过 \(o^* \sim P_{\text{search}}\) 采样选出。温度参数 \(\tau\) 控制探索-利用平衡。

##### 效率度量与实验结果

论文提出了效率度量指标 \(\eta\)，同时考虑准确率提升和长度缩减：

$$\eta = \left(\frac{\text{Acc}_{\text{method}}}{\text{Acc}_{\text{base}}}\right)^2 \cdot \frac{\text{Len}_{\text{base}}}{\text{Len}_{\text{method}}}$$

准确率的权重更高（平方项），体现"正确性优先"的设计理念。

**主要实验结果**（基于 DeepSeek-R1-Distill-Qwen 系列）：

| 模型规模 | 平均准确率提升 | 平均长度缩减 | 平均 \(\eta\) |
|---------|-------------|------------|-------------|
| 1.5B    | +4.0%       | -22.3%     | 1.595       |
| 7B      | +3.5%       | -22.6%     | 1.524       |

亮点结果：
- GSM8K (1.5B)：长度缩减超过 **50%**，同时准确率提升 2.4%
- AMC23 (7B)：准确率大幅提升 **7.5%**，长度缩减 12%
- 在所有基准上 \(\eta\) 均为最高，显著优于 Budget Forcing、AdaptThink 等基线

##### 与传统方法的区别

| 特性 | 传统 CoT | Tree of Thoughts (ToT) | NCoTS |
|------|---------|----------------------|-------|
| 搜索粒度 | 无搜索 | 完整推理路径级 | 步骤级（决策点） |
| 计算开销 | 无额外开销 | 多次完整生成 | 仅 0.0017% 参数增加 |
| 是否需要外部评估 | 否 | 需要外部评估器/投票 | 内置轻量启发式头 |
| 训练需求 | 无 | 无（提示工程） | 需蒸馏训练两个小型线性头 |
| 推理效率 | 基线 | 显著增加（多路并行） | 减少约 22% |
| 选择策略 | 贪心解码 | 外部评估排序 | 概率采样（softmax + 温度） |

#### 🧪 练习题

```yaml
question: "NCoTS 的路径潜力估计器（Path Potential Estimator）的训练目标是什么？"
options:
  - "最小化预测进度与真实进度之间的均方误差"
  - "最小化学生模型与教师模型在算子分布上的 KL 散度"
  - "最大化推理路径最终得到正确答案的奖励信号"
  - "最小化新旧策略概率比的裁剪目标函数"
answer: 1
explain: "路径潜力估计器通过策略蒸馏训练，以强教师模型在推理算子集合上的概率分布为目标，最小化 KL 散度将教师的战略规划能力迁移到搜索过程中。"
```