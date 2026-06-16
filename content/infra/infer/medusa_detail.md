### Medusa: 美杜莎 (Medusa)

```yaml
id: medusa
name: Medusa
full_name: 美杜莎 (Medusa)
year: '2024'
org: Together AI
paper_url: https://arxiv.org/abs/2401.10774
category: spec_decode
parent: spec_leviathan
motivation: 增加并行解码头消除草稿模型依赖
```

#### 📝 一句话总结

Medusa 在原 LLM 的最后隐藏状态上附加多个未来 token 解码头，用候选树和 tree attention 一次验证多条 continuation，从而把 speculative decoding 的外部 draft model 替换为单模型内部的轻量 proposer。

#### 🎯 核心要点

- 多解码头：第 \(k\) 个 Medusa head 预测位置 \(t+k+1\) 的 token，原始 LM head 仍预测 \(t+1\)
- 候选树：每个 head 取 top-\(s_k\) 预测，按层组合成多条候选 continuation，而不是只提出一条草稿路径
- tree attention：通过树形 attention mask 让同一路径上的 token 彼此可见，不同分支互相隔离，从而一次前向验证多候选
- 两类训练：Medusa-1 冻结 backbone 只训练 heads，支持相对原模型的无损加速；Medusa-2 联合微调 backbone 和 heads，速度更高但需保护原模型能力
- 接受策略：可复用 speculative decoding 的拒绝采样保持分布一致，也可用 typical acceptance 提升接受率但放弃严格同分布
- 工程收益：不需要单独 draft model，减少显存占用、分布式调度复杂度和 draft-target 分布错配

#### 🔬 深入细节

![Medusa Figure 1](https://arxiv.org/html/2401.10774v3/x1.png)
*图：论文 Figure 1，Medusa 在 LLM 顶部增加多个 heads 预测后续 token，将多个 top predictions 组装成候选树，再用 tree-based attention 并行验证并接受最长合法前缀。*

```python
# Medusa decoding with tree candidates.
while len(output) < max_new_tokens:
    hidden_t, base_logits = base_model.forward_last(prefix)

    # 1) Candidate generation: original LM head predicts t+1,
    #    Medusa heads predict t+2 ... t+K+1.
    levels = []
    levels.append(topk(softmax(base_logits), s0))
    for k, head in enumerate(medusa_heads, start=1):
        logits_k = head(hidden_t)
        levels.append(topk(softmax(logits_k), s[k]))

    # 2) Build candidate tree from selected top predictions.
    tree = build_tree_from_levels(levels)
    tree_mask, tree_positions = make_tree_attention_mask(tree)

    # 3) Verify all tree nodes in one base-model pass.
    verified_logits = base_model.forward_tree(prefix, tree.tokens, tree_mask, tree_positions)

    # 4) Accept the longest prefix under rejection sampling or typical acceptance.
    accepted_prefix = select_longest_accepted_prefix(tree, verified_logits, mode="typical")
    prefix.extend(accepted_prefix)
```

##### 动机与背景

经典 speculative decoding 的瓶颈从“只跑大模型”变成“同时部署大模型和 draft model”。这在生产系统里不是免费操作：draft model 要占显存，要维护 KV cache 和 tokenizer 一致性，要处理 distributed serving 中两个模型的调度，还要保证 draft 足够接近 target，否则接受率低；但 draft 太大又会吞掉加速收益。Medusa 的设计目标是保留“先提出候选、再由原模型验证”的框架，同时把 proposer 变成原模型上的附加 heads。

##### Medusa heads 如何提出候选

给定原模型在位置 \(t\) 的最后隐藏状态 \(h_t\)，Medusa 添加 \(K\) 个额外解码头。第 \(k\) 个 head 输出：

$$
p_t^{(k)}=\mathrm{softmax}(W_k f_k(h_t))
$$

它预测的是未来第 \(k+1\) 个位置，即 \(x_{t+k+1}\)；原始 LM head 负责 \(x_{t+1}\)。训练 heads 时可以使用加权交叉熵：

$$
\mathcal{L}_{\text{heads}}=-\sum_t\sum_{k=1}^{K}\lambda_k\log p_t^{(k)}(x_{t+k+1})
$$

这个目标让每个 head 学会“站在当前 hidden state 上向前看”。它并不替代原模型 logits；候选最终仍要被 backbone 验证，因此 heads 的角色是提高每轮可验证候选的质量和多样性。

##### 候选树与 tree attention

如果每个 head 只取 top-1，Medusa 只能提出一条长度 \(K+1\) 的路径；一旦早期 token 错了，后面的预测都失效。论文改为每层取 top-\(s_k\)，构造候选树。笛卡尔积树的候选节点数为：

$$
N_{\text{tree}}=\sum_{k=1}^{K}\prod_{i=1}^{k}s_i
$$

tree attention 的关键是 mask：一个节点只能 attend 到同一路径上的祖先节点和原 prompt，不能看到兄弟分支。这样，同一次 forward 可以像处理一个 packed sequence 一样处理多条候选路径，但每个节点的条件上下文仍与真实自回归路径一致。位置编码也要按树路径调整，否则同一深度或不同分支的 token 会被错误解释。

##### 接受规则：无损和近似两种模式

Medusa 可以直接复用 speculative decoding 的拒绝采样：把 head/tree 产生的候选当作 proposal，用 backbone 计算的 logits 作为 target 分布，按 \(\min(1,p_{\text{target}}/p_{\text{proposal}})\) 接受并在拒绝时校正。这种方式在 Medusa-1 中尤其清晰，因为 backbone 冻结，目标分布就是原模型分布。

论文还提出 typical acceptance，用原模型概率判断候选是否“足够典型”。候选 token \(x_{n+k}\) 可被接受的条件写作：

$$
p_{\text{original}}(x_{n+k}|x_{1:n+k-1})>\min\left(\epsilon,\delta\exp(-H(p_{\text{original}}(\cdot|x_{1:n+k-1})))\right)
$$

其中 \(H(\cdot)\) 是 entropy，\(\epsilon\) 是硬阈值，\(\delta\exp(-H)\) 是随分布熵变化的阈值。直觉是：如果原模型分布很尖锐，就只接受非常高概率 token；如果分布熵高，说明多个 continuation 都合理，可以放宽接受。该策略通常带来更长接受前缀，但不再保证与原模型逐 token 采样严格同分布。

##### 训练策略与工程落点

Medusa-1 冻结 backbone，只训练新增 heads，内存和风险较低；因为原模型参数不动，若使用 rejection sampling，输出分布可相对原模型保持 lossless。Medusa-2 则联合训练 backbone 与 heads，提高 heads 的预测准确率和接受长度，但需要保留 next-token 能力。论文使用两阶段思路：先得到可用 heads，再用带权损失联合微调；当原训练数据不可用或模型经过 RLHF 时，可通过 self-distillation 让模型自己生成与当前输出分布匹配的数据。

与外部 draft model 相比，Medusa 的部署面更简单：只加载一个模型，heads 的参数量远小于单独小模型，候选验证仍复用 backbone 和 KV cache 机制。代价是目标模型结构需要增加 heads，并且 tree attention、候选树剪枝、接受阈值都要在推理框架里实现。论文实验显示 Medusa-1 已可在不牺牲质量的情况下达到约 2.2x 以上加速，Medusa-2 在更多设置下进一步提高速度。

> 💡 关键：Medusa 的本质不是“让 heads 直接生成答案”，而是“用 heads 低成本扩大候选集合，再让原模型用树形上下文一次性判定哪些前缀可信”。

#### 🧪 练习题

```yaml
question: "Medusa 为什么需要 tree attention？"
options:
  - "为了让不同候选分支共享所有未来 token"
  - "为了在一次前向中验证多条候选路径，同时避免分支之间互相泄漏上下文"
  - "为了删除原始 LM head"
  - "为了把所有候选都强制接受"
answer: 1
explain: "tree attention 用树形 mask 保证每个候选节点只看到自己的祖先路径，因此能并行验证多候选而不破坏自回归条件。"
```
