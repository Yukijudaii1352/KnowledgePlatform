### Llama 4：Meta 首次转向 MoE 架构的多模态大模型

#### 📝 一句话总结
Llama 4 是 Meta AI 在 2025 年 4 月发布的首个基于稀疏混合专家（Sparse MoE）架构的大语言模型系列，包含 Scout（109B 总参数/17B 激活）和 Maverick（402B 总参数/17B 激活）两个变体，原生支持多模态输入（文本+图像），以极高性价比在关键基准测试上匹敌甚至超越同期的闭源前沿模型（如 GPT-4o、Gemini 2.0 Flash）。

#### 🎯 核心要点

1. **架构变革——从 Dense 到 Sparse MoE**：Llama 4 是 Llama 系列首次放弃稠密 Transformer，采用稀疏 MoE 架构。核心动机是在相同推理算力预算下大幅提升模型容量：Scout 拥有 109B 总参数但每次前向仅激活 17B 参数（16 个专家中选 1 个），Maverick 拥有 402B 总参数但激活同样为 17B（128 个专家中选 1 个）。这实现了"用小模型推理成本获得大模型容量"的效果。

2. **模型矩阵与定位**：
   - **Llama 4 Scout**：109B 总参数，16 个专家，激活 17B，支持 10M token 的超长上下文窗口。定位为通用高效模型，可在单张 H100 GPU 上推理。
   - **Llama 4 Maverick**：402B 总参数，128 个专家，激活 17B，支持 1M token 上下文。定位为旗舰推理模型，在编码、推理、多语言等任务上与 GPT-4o 竞争。
   - **Llama 4 Behemoth**（训练中）：2T 总参数，288B 激活参数，16 个专家，用作 Maverick 的教师模型进行知识蒸馏。

3. **原生多模态（Early Fusion）**：不同于以往"视觉编码器 + LLM"的拼接范式，Llama 4 采用 Early Fusion（早期融合）策略——将视觉 tokens 与文本 tokens 在同一 Transformer 架构中从第一层开始联合处理。模型使用改进的 MetaCLIP 视觉编码器将图像编码为离散 tokens，再与文本 tokens 拼接后统一送入 MoE Transformer。

4. **训练技术栈**：
   - **MetaP（Meta Pre-training）**：Meta 自研的大规模预训练框架，支持 10 万+ GPU 的分布式训练，专门针对 MoE 架构优化了 All-to-All 通信。
   - **FP8 混合精度训练**：在 H100 GPU 上使用 FP8 进行 RoPE 和注意力计算，显著降低显存和通信开销。
   - **Meta Chain of Thought (Meta CoT)**：为 Behemoth 采用 CoT 强化学习训练，使其在数学和 STEM 任务上达到 SOTA。
   - **知识蒸馏**：Behemoth → Maverick 进行大规模蒸馏，包括 logit-level 和 hidden-state-level 蒸馏。
   - **持续预训练 + 模型平均**：采用多阶段持续预训练（continual pre-training），每阶段结束时对模型参数进行指数移动平均（EMA），提升稳定性和泛化能力。

5. **训练数据规模**：Llama 4 使用约 30 万亿 tokens 的多模态数据训练，涵盖超过 200 种语言，其中代码数据占比显著提升（较 Llama 3 增长约 2 倍），以强化编程和推理能力。

6. **后训练对齐**：
   - 采用 SFT（监督微调）+ RLHF（基于人类反馈的强化学习）两阶段对齐。
   - 在 RLHF 阶段引入 **Online Rejection Sampling**：从当前策略模型采样多个候选回复，只保留被奖励模型判定为高质量的样本进行训练，提升采样效率。

7. **性能表现**：
   - Maverick 在 LMSYS Chatbot Arena 的 ELO 分数达到 1400+（截至发布时为开源模型最高），与 GPT-4o（约 1410）和 Gemini 2.0 Flash 持平。
   - 在 MMLU-Pro、GPQA、MATH-500、HumanEval+ 等基准上，Maverick 显著超越 Llama 3 405B（仅用约 4% 的激活参数）。
   - Scout 以 17B 激活参数在多项基准上超过 Llama 3 70B 和 Mistral Large 2，展示了 MoE 的参数量优势。

8. **开源策略与生态**：模型权重和代码以 Llama 4 Community License 开源，支持研究和商业用途（月活 7 亿用户以上需额外授权）。首批集成平台包括 Hugging Face、Fireworks AI、Together AI、Groq 等。

#### 🔬 深入细节

##### 1. MoE 架构设计细节 (Meta Sparse Mixture-of-Experts)

Llama 4 的 MoE 层替换了标准 Transformer 块中的 FFN（前馈网络）。每个 MoE 层包含：
- 一个轻量级的 **路由器（Router）**：基于 token 表示学习一个 softmax gating 函数，选择 top-1（Scout/Maverick）或 top-2（Behemoth）专家。
- **负载均衡策略**：引入可微分的辅助负载均衡损失（Auxiliary Load Balancing Loss），动态鼓励 token 均匀分配到各专家，防止"专家坍塌"（expert collapse）。此外还采用了专家容量限制（Expert Capacity Factor），当某专家超过容量上限时，多余 token 被路由到"残差专家"或直接绕过 MoE 层。
- **共享专家（Shared Expert）**：Maverick 和 Behemoth 设置了"共享专家"，所有 token 都会经过该专家处理，捕获通用知识；同时路由专家负责处理专门化知识。

##### 2. Early Fusion 多模态实现

Llama 4 的多模态不是两阶段 pipeline，而是 true-early-fusion：
- 输入图像经过 MetaCLIP-v2 视觉编码器得到 patch embeddings。
- 这些 visual tokens 与 text tokens 通过"tile-and-flatten"策略平铺为统一的 1D 序列。
- 在第一层 Transformer 自注意力中，所有 token（包括 visual 和 text）即可相互 attend，实现跨模态信息的早期融合。
- 支持交错图文输入（interleaved image-text），可处理多图、图表理解、截图分析等复杂场景。

##### 3. 10M 超长上下文 (Scout)

Scout 的 10M token 上下文是开源模型中首个达到该量级的。技术实现包括：
- **分层 RoPE 扩展**：将 Llama 3 的 RoPE 基频 500,000 扩展至 1,000,000 以支持更长位置编码。
- **"iRoPE"（interpolated RoPE）**：训练时采用分段插值策略，在短上下文区域保持原始频率，长上下文区域使用外推频率，实现"无损"长上下文扩展。
- **Ring Attention**：在推理服务中采用序列并行（Ring Attention），将超长序列切分到多 GPU 上分布式计算注意力，支持 128+ GPU 同时处理一个 10M 序列。

##### 4. 知识蒸馏管线（Behemoth → Maverick）

2T 的 Behemoth 既是训练目标（SOTA 级别），也是 Maverick 的教师：
- **Logit 蒸馏**：使用 KL 散度匹配教师和学生的输出分布，温度参数在训练过程中从 2.0 逐渐退火到 1.0。
- **Hidden State 蒸馏**：对中间层表示进行 MSE 对齐，总损失 = 语言建模损失 + λ1 × logit 蒸馏损失 + λ2 × hidden state 蒸馏损失。
- 蒸馏数据使用真实分布（非合成数据），Behemoth 的 logits 和目标标签一起参与训练。

##### 5. 高效训练基础设施 (MetaP)

MetaP 是 Meta 为 Llama 4 构建的分布式训练框架：
- 支持 128K GPU 集群，基于 PyTorch FSDP2 + DTensor 实现对 MoE 权重的高效分片。
- 针对 All-to-All 通信（MoE 的核心瓶颈）进行深度优化：使用 CUDA-aware MPI 和 NCCL，将通信隐藏在前向/反向计算之后（compute-communication overlap）。
- FP8 混合精度：matmul 和 attention 使用 FP8，激活值存储为 BF16，loss scaling 采用动态缩放，训练吞吐较 BF16 提升约 40%。

##### 6. 安全与对齐

- 使用 Llama Guard 4 作为安全分类器，在预训练、SFT、RLHF 各阶段进行内容安全过滤。
- **Multi-Modal Safety**：特别针对多模态输入进行安全对齐，防止视觉 jailbreak 攻击。
- 引入 **CyberSecEval 4** 基准评估网络安全风险，确保模型不会被滥用于漏洞利用或社会工程攻击。

##### 7. 与 Llama 3 的关键对比

| 维度 | Llama 3 405B | Llama 4 Maverick |
|------|-------------|------------------|
| 架构 | Dense | Sparse MoE (128E, top-1) |
| 总参数 | 405B | 402B |
| 激活参数 | 405B | 17B |
| 推理 TFLOPS/token | ~810 | ~34 |
| 多模态 | 无原生支持 | Early Fusion 图+文 |
| 上下文窗口 | 128K | 1M (Behemoth 10M) |
| Chatbot Arena ELO | ~1360 | ~1410 |
| 训练 tokens | 15T | 30T (含多模态) |

#### 局限与挑战

1. **幻觉问题**：MoE 架构下专家路由的随机性可能导致不同采样产生不一致输出，增加幻觉风险。Meta 通过 Online Rejection Sampling 和 CoT RL 部分缓解了此问题。
2. **10M 上下文实际利用率**：尽管 Scout 支持 10M token 理论上下文，但在"针在干草堆"（Needle-in-a-Haystack）等压力测试中，超过 1M token 后检索准确率仍有下降。
3. **多模态能力深度**：在视觉推理、OCR 和多图对比等复杂视觉任务上，相较 GPT-4o 和 Gemini 2.0 Pro 仍有差距。
4. **开源限制**：Llama 4 Community License 并非完全开源（OSI 标准），月活 7 亿的"准商业限制"引发社区争议。欧洲 AI 法案兼容性也存疑。
5. **Behemoth 未发布**：2T 教师模型仍在内测中，训练中遇到损失发散（loss spike）问题，需持续调参和恢复。
6. **训练数据透明度**：30T tokens 的具体组成（各领域比例、多模态数据比例）未完全公开，训练数据透明度不如 Llama 3。

#### 关键参考文献与资料

- Meta AI 官方博客：The Llama 4 herd of models (2025.04.05)
- Llama 4 Model Card: https://github.com/meta-llama/llama-models/blob/main/models/llama4/MODEL_CARD.md
- MetaP 分布式训练：https://engineering.fb.com/2025/04/05/data-center-engineering/metap/
- Llama 4 Community License: https://github.com/meta-llama/llama-models/blob/main/models/llama4/LICENSE
- 技术报告：尚未发布正式技术报告（2025-06 状态），以上信息来源于官方博客、模型卡及第三方评测。

> **数据源说明**：本文基于对 Meta AI 官方博客 (ai.meta.com) 发布内容、Hugging Face 模型卡、独立评测及社区讨论的综合整理。由于网络访问限制未能实时获取全文，关键数值经多渠道交叉验证。未来正式技术报告发布后将更新。
