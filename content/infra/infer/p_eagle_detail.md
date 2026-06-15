### P-EAGLE: 并行鹰 (P-EAGLE)

```yaml
id: p_eagle
name: P-EAGLE
full_name: 并行鹰 (P-EAGLE)
year: '2026.02'
org: Amazon
paper_url: https://arxiv.org/abs/2602.01469
category: spec_decode
parent: eagle_v3
motivation: 并行草稿单次前向生成K个draft
```

#### 📝 一句话总结

P-EAGLE 将 EAGLE 式草稿从自回归逐步生成改为并行多 token 预测，用共享隐藏状态一次前向生成 K 个 draft，并通过可扩展训练技术支持长序列。

#### 🎯 核心要点

- 把 EAGLE drafter 从 K 次串行前向改为一次并行生成 K 个草稿
- 引入 learnable shared hidden state 支持多位置预测
- 使用 attention mask 预计算和序列分区降低长上下文训练复杂度
- 实现到 vLLM 中，面向 reasoning LLM 的长输出加速
- 相对 EAGLE-3 在多模型上进一步减少 drafter latency

#### 🔬 深入细节

![P-EAGLE 核心示意图](https://arxiv.org/html/2602.01469/x1.png)
*图：P-EAGLE 的并行 drafting 架构，一次 drafter 前向产生多个候选位置。*

```python
# P-EAGLE parallel drafting
state = shared_hidden(prefix_feature)
parallel_logits = p_eagle_drafter(state, positions=range(K))
draft_tokens = [sample(logits_i) for logits_i in parallel_logits]
verified = target_model.verify_sequence(prefix, draft_tokens)
prefix.extend(accepted_prefix(verified))
```

##### 动机与背景

EAGLE 系列虽然比外部草稿模型高效，但生成 K 个 draft token 往往仍需要 K 次自回归 drafter 前向。对于长推理输出和更强 drafter，这部分串行开销会成为新瓶颈。

##### 核心机制

P-EAGLE 用共享隐藏状态承载前缀信息，让多个未来位置的预测并行发生。训练上，朴素多位置预测的注意力和显存复杂度会随序列长度与并行位置急剧增长，因此论文引入 mask 预计算、序列分区和序列内梯度累积。

##### 训练/推理流程

训练阶段构造并行位置监督，使 drafter 学会一次输出多个 offset 的 token。推理阶段一次 drafter 前向生成 K 个候选，然后仍交给 target model 按投机规则验证，保证最终输出由 target 决定。

##### 与传统方法的区别

EAGLE-3 提升草稿质量，P-EAGLE 进一步降低草稿生成延迟。它特别针对 reasoning LLM 长输出场景，因为此时每轮少一次或多次 drafter 前向都会显著影响总延迟。

#### 🧪 练习题

```yaml
question: "P-EAGLE 主要消除 EAGLE 的哪个瓶颈？"
options:
  - "K 个 draft token 需要 K 次串行 drafter 前向"
  - "目标模型参数太少"
  - "无法读取 YAML"
  - "KV cache 不存在"
answer: 0
explain: "P-EAGLE 用并行多 token 预测一次生成 K 个草稿，减少 drafter 串行延迟。"
```
