### Llama 2：开放基础与对话模型
```yaml
id: llama2
name: Llama 2
full_name: 开放基础与对话模型 (Llama 2)
year: "2023.07"
org: Meta AI
paper_url: https://arxiv.org/abs/2307.09288
category: open_foundation
parent: llama
motivation: 开放预训练与安全对话谱系
```

#### 📝 一句话总结
Llama 2 在 LLaMA 基础上扩展到 2T 公开 token、4K 上下文和更安全的开放发布，并通过 SFT、奖励建模、拒绝采样、PPO 与 Ghost Attention 构建了面向对话的 Llama 2-Chat。

#### 🎯 核心要点
- 发布 Llama 2 base 与 Llama 2-Chat，公开 7B、13B、70B 规模；34B 在论文中报告但因红队不足未发布。
- 预训练数据为新的公开在线数据混合，不包含 Meta 产品或服务数据；训练 2T token，比 LLaMA 增加约 40%。
- 上下文长度从 2K 扩展到 4K，34B/70B 使用 Grouped-Query Attention (GQA) 提升推理可扩展性。
- 基础架构延续 LLaMA：pre-normalization RMSNorm、SwiGLU、RoPE、SentencePiece BPE、AdamW 和 cosine schedule。
- SFT 阶段强调高质量少量数据：最终收集 27,540 条人工 SFT annotations，并只在 answer tokens 上反传 loss。
- RLHF 使用人类二选一偏好数据，训练 Helpfulness RM 与 Safety RM 两个奖励模型；总偏好比较约 2.9M，其中 Meta 安全与有用性数据约 1.4M。
- 奖励模型采用 pairwise ranking loss，并加入按偏好强度变化的 margin，让“明显更好”的样本对拉开更大分数差。
- 迭代 RLHF 从 V1 到 V5，先使用 Rejection Sampling fine-tuning，后续把 PPO 接在拒绝采样 checkpoint 之后。
- PPO 奖励包含 safety/helpfulness 分段奖励与 KL penalty，防止策略过度偏离原始模型并缓解 reward hacking。
- 提出 Ghost Attention (GAtt)，通过合成多轮系统指令数据和 loss masking 改善多轮对话中系统消息遗忘问题。

#### 🔬 深入细节
![Llama 2-Chat 训练流程](https://ar5iv.labs.arxiv.org/html/2307.09288/assets/x3.jpg)
*图：Llama 2-Chat 从公开数据预训练开始，经 SFT 得到初始 chat 模型，再通过人类偏好数据、奖励模型、拒绝采样和 PPO 迭代改进。*

```python
# Llama 2 / Llama 2-Chat 训练流程（按论文方法整理）
base = pretrain_llama2(tokens="2T public online data", context=4096, gqa_for=["34B", "70B"])
chat = supervised_finetune(base, annotations=27_540, loss_on="assistant_answer_tokens_only")

for version in ["RLHF-V1", "RLHF-V2", "RLHF-V3", "RLHF-V4", "RLHF-V5"]:
    comparisons = collect_pairwise_preferences(chat, dimensions=["helpfulness", "safety"])
    helpful_rm = train_reward_model(comparisons, target="helpfulness")
    safety_rm = train_reward_model(comparisons, target="safety")

    candidates = sample_k_answers(chat, prompts=comparisons.prompts, temperature="retuned per version")
    best_answers = select_by_reward(candidates, helpful_rm, safety_rm)
    chat = finetune_on_rejection_samples(chat, best_answers)

    if version in ["RLHF-V4", "RLHF-V5"]:
        chat = ppo_update(chat, reward=piecewise_helpful_safety_reward, kl_to_initial_policy=True)

chat = ghost_attention_finetune(chat, synthetic_multiturn_system_messages=True)
```

Llama 2 的第一层贡献是把 LLaMA 的开放基础模型路线工程化升级。基础模型仍是自回归 Transformer，但训练语料扩大到 2T token，上下文长度翻倍到 4096，且大模型引入 GQA。GQA 的直觉是让多个 query heads 共享较少的 key/value heads，从而降低 KV cache 体积和解码带宽压力；这对 34B/70B 这类服务成本高的模型尤其重要。预训练 loss 仍是标准 next-token objective：

$$
\mathcal{L}_{\text{pretrain}}(\theta)=-\sum_{t}\log p_\theta(x_t\mid x_{<t})
$$

SFT 阶段的重点不是堆海量指令数据，而是高质量人工样本。论文先用公开 instruction tuning 数据启动，但发现许多第三方 SFT 数据多样性和质量不足，于是转向数万条 vendor-based 高质量标注。对每个 prompt-answer 样本，训练时会把 prompt 和 answer 拼接为同一序列，但 prompt token 的 loss 被置零，只在 assistant answer tokens 上反传：

$$
\mathcal{L}_{\text{SFT}}(\theta)=-\sum_{t\in\text{answer}}\log p_\theta(y_t\mid x,y_{<t})
$$

这样做避免模型学习“复述用户输入”，把梯度集中到期望回答风格和内容上。论文报告 SFT 使用初始学习率 \(2\times10^{-5}\)、batch size 64、sequence length 4096、训练 2 epochs。

RLHF 数据采集使用二选一偏好比较：标注者写 prompt，然后在两个模型回答中选择更好的一个，并标注偏好强度，包括 significantly better、better、slightly better、negligibly better/unsure。Llama 2 把 helpfulness 和 safety 分开建模，因为“尽可能有帮助”和“必要时拒绝不安全请求”天然存在张力。奖励模型从 chat checkpoint 初始化，把 LM head 换成 scalar regression head，因此 reward model 继承了基础模型知识，减少奖励模型偏好幻觉答案的风险。

基础 pairwise ranking loss 为：

$$
\mathcal{L}_{\text{ranking}}=-\log\sigma(r_\theta(x,y_c)-r_\theta(x,y_r))
$$

其中 \(y_c\) 是被人类选择的回答，\(y_r\) 是被拒绝的回答。Llama 2 进一步加入 margin，让偏好越强的样本对分数间隔越大：

$$
\mathcal{L}_{\text{ranking}}=-\log\sigma(r_\theta(x,y_c)-r_\theta(x,y_r)-m(r))
$$

这个设计的直觉是：如果两个回答只是“略好”，奖励模型不应强行拉开过大差距；如果一个回答显著更好，就应该给模型更明确的排序信号。论文还分别训练 Helpfulness RM 和 Safety RM，并按数据配方混合 Meta 自采数据、Anthropic Helpful/Harmless、OpenAI Summarize/WebGPT、StackExchange、SHP 等偏好数据。

RLHF 优化分为 Rejection Sampling 和 PPO。拒绝采样在每个 prompt 上采样 \(K\) 个回答，用当前最好的 reward model 选出最高分回答，再把它作为新的“gold”样本进行类似 SFT 的微调。它的优势是 breadth：同一 prompt 能探索多个候选。PPO 的优势是 depth：每一步采样都来自刚更新过的策略。论文早期到 RLHF V4 主要用拒绝采样，之后把 PPO 接在拒绝采样 checkpoint 后继续优化。

PPO 阶段的优化目标是最大化奖励模型估计的人类偏好：

$$
\arg\max_{\pi}\mathbb{E}_{p\sim\mathcal{D},g\sim\pi}[R(g\mid p)]
$$

最终奖励包含白化后的 safety/helpfulness 分段奖励和到原始策略 \(\pi_0\) 的 KL 惩罚：

$$
R(g\mid p)=\tilde{R}_c(g\mid p)-\beta D_{KL}(\pi_\theta(g\mid p)\parallel\pi_0(g\mid p))
$$

其中：

$$
R_c(g\mid p)=
\begin{cases}
R_s(g\mid p) & \text{if }\textsc{is\_safety}(p)\text{ or }R_s(g\mid p)<0.15\\
R_h(g\mid p) & \text{otherwise}
\end{cases}
$$

$$
\tilde{R}_c(g\mid p)=\textsc{whiten}(\textsc{logit}(R_c(g\mid p)))
$$

KL penalty 的作用是防止 reward hacking：策略如果只追求 reward model 分数，可能学会奖励模型漏洞，导致人工评价下降。论文中 7B/13B 设 \(\beta=0.01\)，34B/70B 设 \(\beta=0.005\)，PPO clip threshold 为 0.2，每轮 batch size 为 512。

Ghost Attention 解决的是另一个对话模型常见问题：多轮对话中系统消息或初始约束会逐渐被遗忘。GAtt 构造合成训练数据，把同一个系统指令拼接到多轮用户消息上，再用最新 RLHF 模型采样回答；训练时只保留第一轮系统消息形式，同时把之前轮次 token 的 loss 置零。这样模型在训练中学到“初始指令应持续影响后续多轮回答”，但不会因为中间轮次文本分布不匹配而被错误梯度污染。论文报告 GAtt 在 20+ turns 范围内能改善一致性，直到达到最大上下文长度。

与 LLaMA 相比，Llama 2 不只是“更多 token 的 base model”，而是把开放基础模型、对话对齐、安全奖励和迭代发布策略整合成一条谱系。它的关键意义在于：公开模型不再只发布预训练权重，也公开了接近 ChatGPT 风格对话模型所需的 SFT/RLHF 工程细节，包括奖励模型数据、拒绝采样、PPO、KL 约束、安全/有用性拆分和多轮系统消息控制。

#### 🧪 练习题
```yaml
question: "Llama 2-Chat 中同时训练 Helpfulness RM 和 Safety RM 的主要原因是什么？"
options:
  - "两个奖励模型可以减少预训练 token 数量"
  - "helpfulness 与 safety 存在目标张力，分开建模能更清晰地优化不同偏好"
  - "Safety RM 只用于压缩模型参数"
  - "Helpfulness RM 用于替代 tokenizer"
answer: 1
explain: "论文指出有用性和安全性可能冲突，单一奖励模型难以同时处理；分开训练再在 RLHF 奖励中按场景组合更稳定。"
```
