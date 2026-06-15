### 轻量对齐 (Light Alignment)

```yaml
id: light_alignment
full_name: 轻量对齐 (Light Alignment)
year: '2026.02'
paper_url: https://arxiv.org/abs/2602.02027
motivation: 单神经元安全专家自反射
parent: grpo
category: rl_based
```

#### 📝 一句话总结
Light Alignment / NGSD 用小型安全专家和单神经元门控判断何时介入解码，只在高风险位置触发安全引导，从而以很低成本改善安全性并减少过度拒答。

#### 🎯 核心要点
- 方法名为 Neuron Guided Safe Decoding (NGSD)，核心是安全专家、自反射风险判断、神经元门控和选择性 SafeDecoding。
- 只训练同系列最小模型作为 safety expert，避免为每个大模型训练昂贵的完整对齐模型。
- 使用分布差异和单神经元 gating 判断是否启用安全引导，论文发现 L1 差异适合该门控。
- 自反射模板从多个风险维度评估 prompt，防止对所有请求无差别介入。
- 还包含 over-alignment early stopping，用规则识别过度拒答并提前停止强安全解码。

#### 🔬 深入细节
![NGSD 流程图](https://arxiv.org/html/2602.02027v1/x1.png)
*图：NGSD 先用自反射和神经元门控识别风险，再选择性调用安全专家引导解码。*

```python
# NGSD / Light Alignment 简化伪代码
safety_expert = train_small_family_model(safety_data)

for prompt in requests:
    risk_report = self_reflect(prompt, dimensions=["harm", "privacy", "illegality", "abuse"])
    base_dist = base_model.next_token_distribution(prompt)
    expert_dist = safety_expert.next_token_distribution(prompt)
    gate_score = neuron_gate(l1_distance(base_dist, expert_dist), risk_report)

    for step in range(max_len):
        if gate_score > threshold and not over_aligned(prefix):
            dist = safe_decoding_mix(base_dist, expert_dist, alpha=gate_score)
        else:
            dist = base_dist
        token = sample(dist)
        prefix.append(token)
```

Light Alignment 的核心问题是安全对齐的部署成本。传统做法要么对每个目标模型做 RLHF/DPO，要么在推理时始终启用外部安全解码，前者训练成本高，后者容易牺牲通用能力并造成 benign prompt 的误拒。NGSD 选择训练一个小 safety expert，然后把它当作可插拔的解码指导源。

门控机制是方法的关键。模型先通过自反射模板判断请求是否有安全风险，再比较基础模型和安全专家的 token 分布差异。若差异大且风险判断高，说明基础模型可能朝危险方向生成，而 safety expert 提供了不同的安全偏置；此时才启用 SafeDecoding 混合分布。

论文强调“单神经元”安全门控，是因为不需要一个复杂分类器才能判断是否干预。风险信息与分布差异可以压缩成一个可解释 gate：\(g=\mathbb{1}[d(\pi_{\mathrm{base}},\pi_{\mathrm{safe}})>\tau]\)。其中 \(d\) 可取 L1 distance，直觉是安全专家与基础模型在下一词分布上分歧越明显，越应该让专家介入。

与 GRPO/DPO 式全量训练相比，NGSD 更像轻量级推理控制。它不追求把所有安全知识写入目标模型参数，而是把安全能力集中在小专家中，按需注入到大模型解码过程。这种设计适合多模型服务场景，但也意味着 expert 的覆盖面和 gate 阈值会直接决定最终安全-有用性平衡。

> ⚠️ 注意：过强或过早的安全引导会导致 over-alignment；NGSD 因此加入早停规则，避免安全专家把普通请求也导向模板化拒绝。

#### 🧪 练习题
```yaml
question: "NGSD 中神经元门控的主要作用是什么？"
options:
  - "决定何时让安全专家介入解码"
  - "增加模型参数量"
  - "替代 tokenizer"
  - "把所有请求都强制拒绝"
answer: 0
explain: "门控根据风险反思和分布差异触发安全引导，使方法只在必要时介入，降低过度拒答。"
```
