### Qwen2.5：通义千问 2.5 技术报告
```yaml
id: qwen25
name: Qwen2.5
full_name: 通义千问 2.5 (Qwen2.5 Technical Report)
year: "2024.12"
org: Alibaba Qwen
paper_url: https://arxiv.org/abs/2412.15115
category: open_foundation
parent: llama3
motivation: 18T语料扩展开放谱系
```

#### 📝 一句话总结
Qwen2.5 把 Qwen 系列扩展到更完整的开放基础模型谱系，通过 18T token 预训练、更强数据混合、长上下文扩展和 SFT+DPO+GRPO 多阶段后训练，显著提升知识、数学、代码、结构化输出与人类偏好对齐能力。它同时发布 0.5B 到 72B 的开放 dense 模型，并提供 Qwen2.5-Turbo/Plus 等 MoE API 模型，形成从端侧到云端的统一模型族。

#### 🎯 核心要点
- 模型谱系：开放 0.5B、1.5B、3B、7B、14B、32B、72B dense decoder-only LLM，另有 Qwen2.5-Turbo 与 Qwen2.5-Plus 两个托管 MoE 变体。
- 数据规模：高质量预训练数据从 Qwen2 的 7T token 扩展到 18T token，并增强数学、代码、多语言与高价值知识域数据。
- 长上下文：多数中大模型支持 128K 上下文与 8K 生成；预训练从 4K 扩到 32K，推理侧结合 YARN 与 Dual Chunk Attention 扩展长度能力。
- 后训练：使用超过 100 万条 SFT 样本，并进行多阶段强化学习，包括离线 DPO 和在线 GRPO。
- 能力提升：重点提升数学、代码、结构化数据理解、JSON/结构化输出、长文本生成、指令遵循和多语言能力。
- 评测定位：Qwen2.5-72B-Instruct 在多个任务上接近或超过更大的 Llama-3.1-405B-Instruct，Qwen2.5-14B/32B 填补中等规模高性能开放模型区间。

#### 🔬 深入细节
![Qwen2.5 模型卡总览](https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen2.5/Qwen2.5%20modelcard.001.jpeg)
*图：Qwen 官方 Qwen2.5 LLM model card。它概览了 0.5B 到 72B 模型的参数规模、层数、注意力头/KV 头、上下文长度、生成长度和许可证。*

Qwen2.5 的核心不是单个新算子，而是一个完整 foundation model pipeline 的升级。预训练目标仍是标准自回归语言建模：

$$
\mathcal{L}_{\text{LM}}(\theta)=-\sum_{t=1}^{T}\log p_\theta(x_t\mid x_{<t})
$$

但论文强调，收益主要来自更大且更干净的数据、面向规模的超参数律、长上下文预训练，以及后训练阶段的系统化偏好优化。相比 Qwen2，Qwen2.5 将高质量语料从 7T 扩到 18T token；数据过滤使用 Qwen2-Instruct 作为质量评估器，对多语言样本进行多维度打分；数据混合则下采样电商、社媒、娱乐等重复/模板化内容，上采样科技、科学、学术等高价值域。

架构上，开放权重 Qwen2.5 是 dense decoder-only Transformer 系列。官方 model card 显示，7B/14B/32B/72B 等中大模型采用较少 KV heads 的 GQA 配置，例如 7B 为 28 个 query heads / 4 个 KV heads，14B 与 32B 为 40 / 8，72B 为 64 / 8。GQA 的直觉是多个 query heads 共享较少的 key/value 投影，从而降低长上下文 KV cache 压力；这与 RoPE、SwiGLU、RMSNorm 等现代 LLM 组件共同构成 Qwen2.5 的基础块。

长上下文训练分阶段进行：先用 4,096 token 上下文做主要预训练，再在最后阶段把上下文扩展到 32,768 token；对于非 Turbo 模型，还通过 YARN 与 DCA 将推理长度能力扩展到 131,072 token。Turbo 版本采用更激进的递进式上下文扩展，训练阶段经过 32K、65K、131K、262K，并在推理侧支持最高 1M token。机制上，RoPE 外推通过调整位置频率基底缓解训练长度与推理长度的分布差异，DCA 则把长序列相对位置映射到更局部的块内/块间结构，减少超长位置带来的注意力退化。

```python
# Qwen2.5 训练与对齐流程伪代码

def build_qwen25(raw_web, code_data, math_data, multilingual_data):
    scored = qwen2_instruct_quality_filter(raw_web)
    clean = remove_low_quality_and_contaminated(scored)
    balanced = domain_rebalance(
        clean,
        downsample=["ecommerce", "social_media", "entertainment"],
        upsample=["technology", "science", "academic", "high_quality_multilingual"],
    )
    corpus_18T = mix(balanced, code_data, math_data, multilingual_data)

    theta = pretrain_decoder_only_lm(corpus_18T, context_length=4096)
    theta = continue_pretrain_long_context(theta, context_length=32768, rope_base=1_000_000)

    theta = supervised_finetune(theta, instruction_samples=1_000_000_plus)
    theta = dpo(theta, preference_pairs="offline human/model feedback")
    theta = grpo(theta, prompts="online RL prompts", reward_models="preference + task rewards")
    return theta
```

后训练阶段可以理解为从“会续写”到“会按人类意图完成任务”的转换。SFT 先用超过 100 万条指令样本建立基础行为分布；DPO 再用成对偏好样本直接优化胜负回答的相对概率。DPO 的典型目标为：

$$
\mathcal{L}_{\text{DPO}}=-\mathbb{E}\left[\log\sigma\left(\beta\log\frac{\pi_\theta(y_w\mid x)}{\pi_{\text{ref}}(y_w\mid x)}-\beta\log\frac{\pi_\theta(y_l\mid x)}{\pi_{\text{ref}}(y_l\mid x)}\right)\right]
$$

其中 \(y_w\) 是偏好回答，\(y_l\) 是较差回答，\(\pi_{\text{ref}}\) 通常是 SFT 后的参考模型。它不显式训练 reward model 再跑 PPO，而是把偏好差异变成一个二分类式的对数概率间隔优化。

GRPO 进一步用于在线强化学习。其直觉是对同一 prompt 采样一组回答，用组内奖励均值和方差构造相对优势：

$$
\hat A_i=\frac{r_i-\operatorname{mean}(r_1,\dots,r_G)}{\operatorname{std}(r_1,\dots,r_G)}
$$

再用类似 PPO 的裁剪比率和 KL 约束更新策略，使高于同组平均的回答概率上升、低于平均的回答概率下降。相比逐样本绝对 reward，组相对优势更适合数学、代码、结构化输出等可自动或半自动评测的任务，也能降低 reward scale 对优化稳定性的影响。

Qwen2.5 的一个重要设计取向是“通用底座 + 专长注入”。预训练阶段把 Qwen2.5-Coder 和 Qwen2.5-Math 的高质量数据纳入通用模型，使基础模型已经具备更强代码与数学能力；后训练阶段再重点提升长文本生成、结构化数据分析、JSON 输出和复杂指令遵循。最终，72B-Instruct 在 MATH、LiveCodeBench、Arena-Hard、MT-Bench 等指标上明显超过 Qwen2-72B-Instruct，并在若干关键任务上接近或超过更大参数量的 Llama-3.1-405B-Instruct。

> 💡 关键：Qwen2.5 的方法贡献更像一条可复用的开放基础模型工程路线：数据质量与规模先把底座能力抬高，再用长上下文扩展和多阶段偏好优化把模型推向可用助手。

#### 🧪 练习题
```yaml
question: "Qwen2.5 相比 Qwen2 的最关键训练侧升级是什么？"
options:
  - "把预训练语料扩展到 18T token，并结合更强数据过滤、数据混合和多阶段后训练"
  - "完全取消 Transformer 注意力并改用状态空间模型"
  - "只发布一个 72B 模型以避免小模型能力下降"
  - "只依赖 DPO，不再进行监督微调"
answer: 0
explain: "论文强调 Qwen2.5 的提升来自 18T 高质量预训练数据、长上下文训练，以及 SFT 后接 DPO/GRPO 的多阶段后训练，而不是更换为非 Transformer 架构。"
```
