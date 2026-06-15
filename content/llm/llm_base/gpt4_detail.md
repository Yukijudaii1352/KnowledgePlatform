### GPT-4 技术报告

```yaml
id: gpt4
name: GPT-4
full_name: GPT-4 技术报告 (GPT-4 Technical Report)
year: '2023.03'
org: OpenAI
paper_url: https://arxiv.org/abs/2303.08774
category: autoregressive
parent: gpt3
motivation: 可预测扩展到多模态前沿
```

#### 📝 一句话总结

> GPT-4 提出了一个大规模多模态 Transformer 语言模型，通过可预测扩展（predictable scaling）方法将文本与视觉能力统一在一个自回归框架中，在多项人类考试与专业基准上达到人类顶尖水平，同时系统性地构建了安全性对齐流程。

#### 🎯 核心要点

- **多模态输入输出**：GPT-4 接受图像和文本交织输入，输出纯文本，是 OpenAI 首个公开的大规模多模态模型
- **可预测扩展（Predictable Scaling）**：基于小规模模型的计算规律，在训练前就能高精度预测最终大模型的 loss，无需昂贵的大规模试错
- **极度广泛的基准验证**：覆盖学术考试（SAT/AP/BAR/LSAT/GRE）、多语言理解（MMLU 各语种子集）、代码竞赛（LeetCode/Codeforces）、图像理解等多维基准
- **人类考试顶尖表现**：在 BAR（律师资格）中达前 10%，SAT 数学 700+/800，GRE Verbal 169/170，全面超越 GPT-3.5
- **安全与对齐前置**：在预训练完成后即引入 RLHF（Reinforcement Learning from Human Feedback）及基于规则的奖励模型（RBRM）来校准模型行为，拒绝有害指令的能力大幅提升
- **技术细节罕有公开**：报告刻意不披露模型参数量、训练数据构成、架构细节和具体训练成本，以强调能力评估和安全性而非技术实现
- **Visual grounding 能力的系统评估**：首次大规模测试了 LLM 对图表、截图、手写文字和复杂排版文档中的信息提取与推理能力
- **Code generation 飞跃**：在 LeetCode 等算法题上准确率远超 GPT-3.5，能处理复杂多文件工程任务
- **可操纵性（Steerability）大幅增强**：通过 System Message 机制实现灵活的风格、角色和语气切换，Tool Use 能力内置支持

#### 🔬 深入细节

##### 1. 模型架构与设计哲学

GPT-4 本质上是一个 **Transformer-based 的自回归预训练模型**，但与 GPT-3 相比，其设计哲学发生了根本性转变：

**从 Scaling Law 到 Predictable Scaling**

传统大模型训练遵循 Kaplan et al. (2020) 的 scaling law —— 即模型性能随参数量、数据量和计算量呈幂律关系。但这种方法的问题在于：你必须实际训练每个规模的模型才能知道最终性能。

GPT-4 的关键创新在于 **Predictable Scaling**：OpenAI 团队开发了一套方法，使得在训练最终大模型之前，可以通过小型模型的训练结果高精度预测最终大模型的 loss。具体做法：

1. 使用相同的数据分布和架构在小规模模型上训练
2. 拟合 loss 曲线并外推至大模型规模
3. 实际大模型的最终 loss 与预测值高度吻合（"few percent" 误差内）

这使得 OpenAI 能在大规模训练前就做出架构和超参数决策，大幅降低了训练风险。

**多模态架构（推测）**：

虽然论文未公开具体架构，但基于 OpenAI 后续披露和相关工作，GPT-4 大概率采用了类似 Flamingo (Alayrac et al., 2022) 的视觉编码器 + 语言模型的设计：
- 视觉输入经 ViT 编码器转为 patch embedding
- 通过交叉注意力层或 Q-Former 结构将视觉 token 注入 Transformer 层
- 文本和视觉 token 在统一的序列中进行自回归预测

##### 2. 训练流程

GPT-4 的训练分为两个主要阶段：

**第一阶段：预训练（Pretraining）**

- 在大规模互联网语料上进行下一个 token 预测的自回归训练
- 使用 Predictable Scaling 方法在小型模型上验证训练稳定性
- 具体训练数据、硬件配置、训练时长均未公开

**第二阶段：后训练对齐（Post-training Alignment）**

这是 GPT-4 报告中最具方法论创新的部分：

1. **RLHF (Reinforcement Learning from Human Feedback)**：
   - 收集人类偏好标注：对同一 prompt 的多个生成回答进行排名
   - 训练 Reward Model 来预测人类偏好
   - 使用 PPO 算法优化模型以最大化奖励信号

2. **Rule-Based Reward Model (RBRM)**：
   - 针对安全敏感场景，引入基于规则的奖励模型作为 RLHF 的补充
   - 分类器自动检测模型输出的拒绝/遵从行为
   - 当分类器高置信度判定拒绝（refusal）时给予正向奖励

3. **System Message 机制**：
   - GPT-4 在 RLHF 阶段就被训练来理解和遵循 system message
   - 用户可通过自然语言定义模型的人格、语气、角色和边界条件
   - 这一机制成为后来 ChatGPT 和 API 的核心功能

##### 3. 核心公式与机制

**自回归语言建模目标**：

L = - Σ_{t=1}^{T} log P_θ(x_t | x_{<t})

其中 x_t 是序列中第 t 个 token，θ 为模型参数。

**Predictable Scaling 的 Loss 外推**：

设 N 为模型规模指标（如有效参数量），OpenAI 发现 loss 遵循：

L(N) = L_∞ + (N_0 / N)^α

其中 L_∞ 为不可约 loss，N_0 和 α 为拟合参数。通过在小 N 下拟合这些参数，可以外推预测大 N 的 loss。

**RLHF 中的 PPO 目标**：

max_θ E_{x~D, y~π_θ(·|x)} [ r_ϕ(x, y) - β · D_KL(π_θ(·|x) || π_ref(·|x)) ]

其中 r_ϕ 为训练的 reward model，β·D_KL 项约束模型不要偏离参考策略 π_ref 太远，防止 reward hacking。

##### 4. 评估体系：重新定义 LLM 能力测试

GPT-4 报告最突出的贡献之一是其极其系统的评估体系：

| 类别 | 代表性测试 | GPT-4 表现 | GPT-3.5 |
|------|-----------|-----------|---------|
| 学术考试 | BAR Exam | 前 10%（298/400） | 后 10% |
| | SAT Evidence-Based Reading & Writing | 710/800 | 670 |
| | SAT Math | 700/800 | 590 |
| | GRE Verbal | 169/170 | 154 |
| 多语言 MMLU | 26 种语言 | 全部超越 GPT-3.5 英语水平 | — |
| 代码 | LeetCode Easy | ~100% | ~72% |
| | LeetCode Medium | ~90% | ~46% |
| | LeetCode Hard | ~50% | ~7% |
| 图像理解 | 图表/文档/截图 | 多项任务超越专用模型 | 不支持 |
| 安全性 | 有害内容拒绝率 | 82%+ 绝对提升 | — |

> 💡 关键：GPT-4 在几乎**所有**测试基准上都展现出 "明显的跨越"（significant leap），尤其是需要复杂推理和跨领域知识整合的任务。

##### 5. 与传统方法的区别

| 维度 | GPT-3 / 传统 LLM | GPT-4 |
|------|-----------------|-------|
| 多模态 | 纯文本 | 文本+图像输入 |
| Scaling | 训练后才知道性能 | Predictable Scaling 预知 |
| 安全对齐 | 事后修补 | 从 RLHF 阶段前置 |
| 可操纵性 | Prompt 工程为主 | System Message 内置 |
| 评估深度 | 少数基准 | 系统性的人类考试 & 多语言 |
| 技术透明度 | 公开参数/数据 | 刻意隐藏细节 |

##### 6. 示意图（论文 Figure 1）

> [图] GPT-4 在多项学术和专业考试中的百分位表现，横轴为各考试（BAR, LSAT, GRE Q, GRE V, SAT Math, SAT EBRW 等），纵轴为 GPT-4 得分所处的百分位。GPT-4 在大多数考试中位于前 10%，远超 GPT-3.5。

> ⚠️ 注意：GPT-4 技术报告刻意不披露模型参数量、训练数据构成和架构细节。OpenAI 表示这是出于 "competitive landscape and the safety implications of large-scale models" 的考虑。这使得社区对 GPT-4 规模的讨论停留在推测层面（广为流传的 1.76T 参数 MoE 说法来自 SemiAnalysis 等第三方分析，未经 OpenAI 证实）。

##### 训练/推理流程总结

```
                    ┌──────────────┐
  [文本 + 图像] ──▶ │  GPT-4 Base  │ ──▶ [Raw Completions]
                    │ (Pretrained) │
                    └──────┬───────┘
                           │
              ┌────────────▼────────────┐
              │  RLHF + RBRM 对齐       │
              │  - Reward Model 训练     │
              │  - PPO 优化             │
              │  - 安全分类器监督        │
              └────────────┬────────────┘
                           │
                    ┌──────▼───────┐
                    │  GPT-4 最终   │
                    │  (Aligned)   │
                    └──────────────┘
                           │
              ┌────────────▼────────────┐
              │  System Message 注入     │
              │  + 用户 Prompt          │
              └────────────┬────────────┘
                           ▼
                    [安全、可控的输出]
```

#### 🧪 练习题

```yaml
question: "GPT-4 报告中提出的 'Predictable Scaling' 方法的核心价值是什么？"
options:
  - "大幅降低模型推理延迟"
  - "在小规模模型上预测大模型的训练损失，减少大规模试错成本"
  - "自动调节学习率，使训练更稳定"
  - "通过增加模型层数线性提升性能"
answer: 1
explain: "Predictable Scaling 的核心在于利用小模型 loss 曲线外推大模型的最终性能，减少盲目进行大规模训练的成本和风险。论文指出实际 loss 与预测值误差仅 'few percent'。"
```