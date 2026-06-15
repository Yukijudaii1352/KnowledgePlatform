### Qwen3 (通义千问3)

```yaml
id: qwen3
name: Qwen3
full_name: Qwen3 (通义千问3)
year: "2025"
org: Alibaba Qwen Team
paper_url: https://arxiv.org/abs/2505.09388
category: foundation
parent: Qwen2.5
motivation: 首个支持混合思考（Thinking/Non-thinking）模式切换的开源大模型系列，通过多阶段后训练将思考与非思考能力融合于同一模型
```

#### 📝 一句话总结

Qwen3 提出了混合思考模式（Thinking/Non-thinking）融合训练框架，通过冷启动强化学习→思考模式强化学习→模式融合→通用强化学习的四阶段后训练管线，在同一密集模型中同时具备深度推理思考能力和快速直接回答能力，成为首个开源的支持模式切换的混合推理大模型系列。

#### 🎯 核心要点

- 密集 Transformer 架构，参数规模覆盖 0.6B / 1.7B / 4B / 8B / 14B / 32B / 235B-A22B 七档
- 预训练数据 36T tokens，覆盖 119+ 种语言，在 Qwen2.5 基础上进行三阶段预训练扩展
- 核心创新：同一模型支持 Thinking（深度思考）和 Non-thinking（快速回答）两种模式，通过 `enable_thinking` 参数控制
- 四阶段后训练管线：①冷启动 SFT → ②Thinking 模式 RL → ③模式融合（SFT+DPO）→ ④通用能力 GRPO
- Thinking 模式训练目标：强化学习驱动，让模型学会生成长 Chain-of-Thought（CoT）推理链，最终输出在 ` ` 标签内
- Non-thinking 模式：跳过显式推理链，直接生成答案，适用于低延迟场景
- 模式融合阶段：通过精心构造的混合 SFT 数据和 DPO 偏好对，将两种模式统一到同一模型参数中
- 预训练三阶段扩展：Stage 1（在原数据上继续训练 5T tokens）→ Stage 2（扩展上下文至 32K，混入更多长文本数据）→ Stage 3（引入高质量多语言和代码数据）
- GRPO（Group Relative Policy Optimization）用于通用能力增强，无需 Value Model
- 支持 Qwen Agent 框架集成，具备工具调用、代码解释器和 RAG 能力

#### 🔬 深入细节

![Qwen3 模型能力总览](https://arxiv.org/html/2505.09388v1/extracted/6279996/figures/overview.png)
*图：Qwen3 系列模型的核心能力示意——同一模型在 Thinking 与 Non-thinking 模式下灵活切换*

**动机与背景**

传统大语言模型存在两类需求之间的矛盾：一方面是深度推理场景（如数学证明、复杂编程）需要模型"慢思考"，生成详细的推理链（Chain-of-Thought）；另一方面是日常对话和简单查询需要模型"快响应"，跳过冗长推理直接输出答案。此前，业界通常分别训练两个独立的模型来应对这两种需求（如 DeepSeek-R1 专精推理，Qwen2.5 主打通用对话），不仅增加了部署成本，也无法在推理时动态切换模式。Qwen3 首次将这两种能力融合到**单一密集模型**中，用户可以通过单个超参数 `enable_thinking` 在推理时自由切换模式。

**核心机制：混合思考模式**

Qwen3 的 Thinking 模式受 DeepSeek-R1 启发但做了关键改进。在 Thinking 模式下，模型生成的内容包含两部分：

1. **推理链**：放在 ` ` 和 ` ` 标签之间，是模型内部的思考过程
2. **最终答案**：放在 ` ` 和 ` ` 标签之间，是呈现给用户的输出

训练时，模型学会在 Thinking 模式中自动插入推理链；在 Non-thinking 模式下，模型直接跳过推理链生成最终答案。这种设计的精妙之处在于：两种模式的输出分布通过**共享的解码头**统一建模，模型在 token 级别学会了何时"思考"、何时"回答"。

```
# Qwen3 推理时的模式切换伪代码
def qwen3_generate(prompt, enable_thinking=True):
    if enable_thinking:
        # 模型自动生成:
        system_prompt = "You are Qwen3, think step by step."
        output = model.generate(
            prompt,
            stop_tokens=["</response>"],
            max_thinking_tokens=4096
        )
    else:
        # 模型跳过推理链，直接输出答案
        system_prompt = "You are Qwen3, answer directly."
        output = model.generate(
            prompt,
            skip_thinking=True,
            max_tokens=2048
        )
    return output
```

**预训练三阶段扩展**

Qwen3 的预训练并非从头开始，而是在 Qwen2.5 的基础上进行了三阶段增量训练，总计新增 36T tokens：

| 阶段 | 训练量 | 核心策略 |
|------|--------|---------|
| Stage 1 | ~5T tokens | 在 Qwen2.5 原有数据分布上继续训练，稳定模型基础能力 |
| Stage 2 | ~15T tokens | 扩展上下文窗口至 32K tokens，大幅增加长文本（书籍、论文、代码仓库）比例 |
| Stage 3 | ~16T tokens | 引入高质量多语言语料（119+语言）和代码数据，提升多语言和编程能力 |

数据配比如下：
- 网页文本：~40%
- 代码：~25%
- 书籍/学术论文：~15%
- 多语言数据：~12%
- 数学/推理：~8%

> 💡 关键：Stage 3 的"质量提升"阶段是 Qwen3 性能跃升的核心——团队使用 Qwen2.5 本身作为数据质量过滤器，对海量语料进行打分，仅保留高质量子集进行训练。

**后训练四阶段管线**

这是 Qwen3 最核心的技术贡献。整个后训练流程分为四个紧密衔接的阶段：

**阶段一：冷启动 SFT（Cold Start Supervised Fine-Tuning）**
- 使用约 50K 高质量人工标注数据对基座模型进行初步微调
- 数据覆盖：通用对话、指令遵循、安全对齐、简单推理
- 目的：让模型获得基础的对话能力，为后续 RL 训练提供合理的初始策略
- 此阶段同时训练 Thinking 和 Non-thinking 两种格式的回复

**阶段二：Thinking 模式强化学习**
- 使用数学（GSM8K、MATH）和代码（LiveCodeBench）等推理密集型任务作为训练环境
- 奖励信号设计：
  - 格式奖励：是否正确使用了 ` ... ` 和 ` ... ` 标签
  - 答案奖励：最终答案是否正确（数学题答案匹配、代码题通过测试用例）
  - 过程奖励（可选）：推理链的中间步骤是否合理
- 使用 PPO（Proximal Policy Optimization）进行策略优化，Reference Model 为阶段一的 SFT 模型
- 关键公式——PPO 裁剪目标：
  $$L^{CLIP}(\theta) = \mathbb{E}_t \left[\min\left(r_t(\theta) \hat{A}_t, \text{clip}(r_t(\theta), 1-\epsilon, 1+\epsilon) \hat{A}_t\right)\right]$$
  其中 \(r_t(\theta) = \frac{\pi_\theta(a_t|s_t)}{\pi_{\theta_{old}}(a_t|s_t)}\) 是新旧策略的概率比，\(\epsilon=0.2\)
- 此阶段模型学会了在推理密集型任务中生成高质量的长推理链

> ⚠️ 注意：此阶段仅强化了 Thinking 模式能力。若直接在此模型上使用 Non-thinking 模式，性能会明显下降——模型"过度思考"，即使在简单问题上也倾向于生成推理链。

**阶段三：模式融合（Mode Merging）**
- 这是 Qwen3 最独特的技术创新，解决"一个模型如何同时掌握两种模式"的关键问题
- 方法：构造混合训练数据，其中：
  - 50% 的样本要求模型以 Thinking 模式回答（含推理链）
  - 50% 的样本要求模型以 Non-thinking 模式直接回答
- 使用两阶段训练：
  1. SFT 阶段：在混合数据上进行监督微调，让模型学会根据任务类型选择合适的输出模式
  2. DPO 阶段：构造偏好对，在简单任务上偏好 Non-thinking 输出（短、直接），在复杂任务上偏好 Thinking 输出（含推理链、准确率高）
- DPO 损失函数：
  $$\mathcal{L}_{DPO}(\pi_\theta; \pi_{ref}) = -\mathbb{E}_{(x, y_w, y_l) \sim \mathcal{D}} \left[\log \sigma\left(\beta \log \frac{\pi_\theta(y_w|x)}{\pi_{ref}(y_w|x)} - \beta \log \frac{\pi_\theta(y_l|x)}{\pi_{ref}(y_l|x)}\right)\right]$$
  其中 \(y_w\) 是偏好输出，\(y_l\) 是不偏好输出，\(\beta\) 控制偏好强度

> 💡 关键洞察：模式融合的本质是让模型在表示空间中学习到两种模式的条件分布——`P(answer|prompt, mode=thinking)` 和 `P(answer|prompt, mode=non-thinking)`。由于两种模式的输出格式差异显著（有无推理链），模型在 token 级别自动形成了可切换的"思维习惯"。

**阶段四：通用能力 GRPO（Group Relative Policy Optimization）**
- 在模式融合之后，使用 GRPO 进一步强化模型的通用能力
- GRPO 是一种无需 Value Model 的策略优化方法，通过组内相对比较来估计优势
- 核心思想：对同一个 prompt 生成 K 个候选回复，使用奖励模型打分，组内归一化后作为优势信号
- 优势计算：
  $$A_i = \frac{R_i - \text{mean}(R_{1:K})}{\text{std}(R_{1:K})}$$
  其中 \(R_i\) 是第 i 个回复的奖励
- 训练任务覆盖：通用 NLP、安全对齐、工具调用、多语言对话
- 此阶段也引入了 GAE（Generalized Advantage Estimation）用于处理多步工具调用场景的优势估计

**与 DeepSeek-R1 的关键区别**

| 维度 | DeepSeek-R1 | Qwen3 |
|------|------------|-------|
| 模型架构 | MoE（专家混合） | 密集 Transformer |
| 推理模式 | 仅 Thinking | Thinking + Non-thinking |
| 模式切换 | 不支持 | `enable_thinking` 参数控制 |
| 后训练 | R1-Zero（纯RL）→ SFT → RL | 冷启动 SFT → RL → 融合 → GRPO |
| 开源 | 部分权重开源 | 全参数开源（0.6B~32B） |

**模型架构细节**

Qwen3 延续了 Qwen2.5 的密集 Transformer 架构，关键配置如下：
- 注意力机制：GQA（Grouped Query Attention），KV 头数随模型规模调整
- 激活函数：SwiGLU
- 位置编码：RoPE，基础频率 1,000,000（支持长上下文外推）
- 分词器：基于 BPE，词表大小 151,936（含多语言和代码特殊 token）
- 上下文窗口：32K tokens（Stage 2 后），通过 YaRN 方法可外推至 128K
- 归一化：RMSNorm，使用 pre-norm 结构

#### 🧪 练习题

```yaml
question: "Qwen3 的模式融合（Mode Merging）阶段的主要目的是什么？"
options:
  - "增加模型参数量以提升推理能力"
  - "将 Thinking 和 Non-thinking 两种输出模式统一到同一模型参数中，实现推理时动态切换"
  - "仅训练 Non-thinking 模式以降低推理延迟"
  - "使用知识蒸馏将大模型压缩为小模型"
answer: 1
explain: "模式融合阶段通过混合 SFT 数据和 DPO 偏好训练，让模型同时掌握 Thinking（含推理链）和 Non-thinking（直接回答）两种输出模式，并通过 enable_thinking 参数在推理时灵活切换。"
```
