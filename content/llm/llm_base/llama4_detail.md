### Llama 4：Llama 4 MoE 模型群 (Scout / Maverick)

```yaml
id: llama4
name: Llama 4
full_name: Llama 4 MoE 模型群 (Scout / Maverick)
year: "2025.04"
org: Meta AI
paper_url: https://ai.meta.com/blog/llama-4-multimodal-intelligence/
category: sparse_moe
parent: llama3
motivation: Llama首次转向MoE
```

#### 📝 一句话总结

Llama 4 将 Llama 系列首次转向原生多模态 MoE 架构，推出 Scout 与 Maverick，并用 Behemoth 教师模型进行蒸馏，解决 dense Llama 在成本、上下文长度和多模态融合上的扩展瓶颈。其关键变化是稀疏专家路由、early fusion 多模态预训练、iRoPE 长上下文结构，以及更轻量但更偏在线探索的 post-training 流程。

#### 🎯 核心要点

- Llama 4 Scout 是 17B active parameters、16 experts、109B total parameters 的开放权重多模态 MoE，支持 10M token 输入上下文
- Llama 4 Maverick 是 17B active parameters、128 experts、400B total parameters 的多模态 MoE，面向高性能通用 assistant 与视觉理解
- Llama 4 Behemoth 是 288B active parameters、16 experts、近 2T total parameters 的教师模型，用于 Scout/Maverick 的 codistillation
- MoE 层包含 shared expert 与 routed experts，每个 token 进入 shared expert，并被 router 发送到一个 routed expert
- 模型采用 alternating dense and MoE layers，以在稀疏激活和推理效率之间取得平衡
- 原生多模态采用 early fusion，将文本、图像、视频帧 token 融入统一 backbone，而不是只在后端拼接视觉结果
- Llama 4 Scout 使用 iRoPE 架构：交错部分无位置编码 attention 层、其余层使用 RoPE，并结合 inference-time attention temperature scaling 提升长度泛化
- Post-training 流程改为 lightweight SFT → online RL → lightweight DPO，并持续过滤保留 medium-to-hard prompts

#### 🔬 深入细节

![Llama 4 MoE 层示意图](https://scontent-sjc3-1.xx.fbcdn.net/v/t39.2365-6/488655517_650996354186993_1043942188415715102_n.png?_nc_cat=105&_nc_gid=jAu4FVVuVWJhx-yA99mh2Q&_nc_ht=scontent-sjc3-1.xx&_nc_oc=Adp3SXDM6sAEW3lAQImzdn3II-6LLCRkdmaMcCGsfXRTzWW7z7mPSmZThJxN_xNB1GI&_nc_ohc=MLLT0x0HCvAQ7kNvwHcy6QK&_nc_sid=e280be&_nc_ss=78100&_nc_zt=14&ccb=1-7&oe=6A4ADD00&oh=00_Af9lNgA6auJXYH9AteODJIqmCo4wExysmD8nRUCAhlR7PQ)
*图：Meta 官方博客中的 Llama 4 MoE 层示意图，展示 shared expert、router 与 routed experts 的组合方式。*

```python
# Simplified Llama 4 MoE block and training recipe
# Scout uses 16 experts; Maverick uses 128 routed experts.
def llama4_moe_ffn(hidden, router, shared_expert, routed_experts):
    shared = shared_expert(hidden)
    gate = softmax(router(hidden))
    expert_id = argmax(gate)              # top-1 routed expert in Meta's description
    routed = gate[expert_id] * routed_experts[expert_id](hidden)
    return shared + routed


def post_train_llama4(model, prompts):
    hard_prompts = filter_easy_prompts(prompts, judge="Llama-as-judge")
    model = lightweight_sft(model, hard_prompts)

    while online_rl_budget_remaining():
        batch = sample_medium_to_hard_prompts(hard_prompts)
        rollouts = model.generate(batch)
        rewards = multimodal_and_reasoning_rewards(rollouts)
        model = online_rl_update(model, rollouts, rewards)
        hard_prompts = retain_medium_to_hard(batch, rollouts)

    model = lightweight_dpo(model, corner_case_preferences())
    return model
```

Llama 4 的最大结构变化是从 dense Llama 转向 sparse MoE。dense 模型中每个 token 都经过相同 FFN 参数，质量提升通常意味着每 token 计算量随模型变大一起增加。MoE 则把参数容量和激活计算解耦：总参数可以很大，但每个 token 只激活 shared expert 与少数 routed experts。对一个 hidden state \(\mathbf h\)，可用如下形式理解 Llama 4 的 MoE 层：

$$
\mathbf y = E_{\mathrm{shared}}(\mathbf h) + \sum_{e\in\mathrm{Top1}(g(\mathbf h))} p_e E_e(\mathbf h),\quad
p=\mathrm{softmax}(\mathbf W_r\mathbf h).
$$

其中 \(E_{\mathrm{shared}}\) 提供所有 token 都共享的通用变换，\(E_e\) 提供被 router 选中的专家能力。Meta 在博客中明确写到 Maverick 的 MoE 层有 128 个 routed experts 和一个 shared expert，每个 token 被送到 shared expert，同时送到一个 routed expert。Scout、Maverick 都保持 17B active parameters，但总参数分别达到 109B 与 400B，这就是性能成本比提升的来源。

第二个关键变化是原生多模态 early fusion。Llama 4 不是先用独立视觉模型生成 caption，再把 caption 交给语言模型，而是把文本 token 与视觉 token 送入同一模型 backbone 进行联合预训练。视觉编码器基于 MetaCLIP，并与冻结的 Llama 模型配合训练以适配 LLM。early fusion 的好处是模型可以在底层注意力和专家路由阶段就学习跨模态对应关系，例如图像区域、视频帧、问题文本之间的直接交互。

Llama 4 Scout 的长上下文能力主要依赖 iRoPE。Scout 在 pre-training 与 post-training 中都使用 256K context，并通过架构和推理时缩放泛化到 10M input context。iRoPE 中的 “i” 表示 interleaved：一部分 attention 层不使用位置编码，另一部分层保留 RoPE。这样做的直觉是减少所有层都强绑定训练长度位置分布带来的外推压力，同时保留 RoPE 对局部顺序和相对位置的建模能力。推理时 attention temperature scaling 可以写成直觉形式：

$$
\mathrm{Attn}(Q,K,V)=\mathrm{softmax}\left(\frac{QK^\top}{\tau_l\sqrt d}+B_{\mathrm{pos}}\right)V,
$$

其中 \(\tau_l\) 表示层相关的温度缩放，\(B_{\mathrm{pos}}\) 在 RoPE 层隐式来自旋转位置编码，在无位置编码层可以视为缺省。温度缩放调节 attention 分布的尖锐程度，帮助模型在远超训练长度时避免注意力过度集中或失真。

Post-training 流程也明显不同于“堆大量 SFT 和 DPO”的做法。Meta 报告称 Maverick 的难点是同时保持多模态、推理和对话能力，因此采用 lightweight SFT → online RL → lightweight DPO。SFT 前先用 Llama judge 移除超过 50% 的 easy 数据，只保留更难的样本，避免 SFT 和 DPO 过度约束模型探索。online RL 阶段通过更难 prompts 获得能力跃迁，并持续交替“训练模型”和“用模型过滤 medium-to-hard prompts”。最后的轻量 DPO 主要处理 response quality 的角落案例，而不是作为主要能力来源。

Behemoth 的作用是教师模型。它仍是 MoE 多模态模型，规模接近 2T total parameters，288B active parameters。Meta 使用 codistillation 将 Behemoth 的能力迁移到 Maverick，并设计动态加权的蒸馏损失，在 soft targets 与 hard targets 之间随训练调整权重。与传统离线蒸馏不同，Behemoth 对新增数据提供前向目标，而大部分训练数据上的教师前向成本通过预训练期间的 codistillation 摊销。

与 Llama 3 相比，Llama 4 的创新不只是“更大”。Llama 3 主要是 dense 文本模型路线，Llama 4 则把稀疏 MoE、原生多模态、长上下文位置策略、教师蒸馏和在线 RL 组合成一条新路线。代价是部署时需要存储 total parameters，并处理专家路由、专家并行和多模态输入的系统复杂度；收益是每 token 激活计算保持在相对可控范围内，同时获得更高容量、更长上下文和更强视觉理解。

#### 🧪 练习题

```yaml
question: "Llama 4 MoE 层中 shared expert 的主要作用是什么？"
options:
  - "替代所有 routed experts，让模型退化为 dense FFN"
  - "为所有 token 提供共享变换，同时 routed expert 负责稀疏专门化能力"
  - "只处理图像 token，不处理文本 token"
  - "只在 DPO 阶段使用，推理时不参与计算"
answer: 1
explain: "Meta 的 MoE 描述中，每个 token 同时进入 shared expert 和一个 routed expert；shared expert 承担通用能力，routed expert 提供条件化容量。"
```
