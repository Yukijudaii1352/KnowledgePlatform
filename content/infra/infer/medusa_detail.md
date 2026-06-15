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

Medusa 在原 LLM 上增加多个并行解码头来预测未来不同偏移的 token，并用树注意力一次验证多条候选路径，从而摆脱独立 draft model 的部署和训练成本。

#### 🎯 核心要点

- 为同一 backbone 增加多个 Medusa heads，分别预测第 1、2、... 个未来 token
- 构造候选树而非单一路径，提高每轮可接受 token 数
- 使用 tree attention 在一次 target 前向中验证候选树
- Medusa-1 冻结 backbone 只训练 heads，Medusa-2 可联合微调
- 消除额外小模型带来的内存、调度和分布不匹配问题

#### 🔬 深入细节

![Medusa 核心示意图](https://ar5iv.labs.arxiv.org/html/2401.10774/assets/x1.png)
*图：Medusa 的多解码头与候选树验证框架。*

```python
# Medusa decoding
hidden = base_model.forward(prefix)
branches = []
for head in medusa_heads:
    branches.append(topk(head(hidden), k=head_topk))
tree = build_candidate_tree(branches)
verified_logits = base_model.tree_attention(prefix, tree)
accepted = longest_prefix_accepted(tree, verified_logits)
prefix.extend(accepted)
```

##### 动机与背景

经典投机解码需要额外 draft model。生产部署中，这意味着额外显存、加载、调度和模型版本管理；如果 draft 太小接受率低，太大又吞掉加速收益。Medusa 试图把 proposer 变成原模型的一组轻量 heads。

##### 核心机制

Medusa heads 共享 backbone hidden state，每个 head 预测一个未来位置的 token 分布。多个 head 的 top-k 组合成候选树，tree attention 让原模型在一次前向里验证多条路径的 logits。验证仍以原模型为准，因此可保持 lossless。

##### 训练/推理流程

训练时可冻结主模型，只用监督数据训练 heads 预测未来 token；推理时先运行 backbone 得到当前位置 hidden，再由 heads 生成候选树，最后执行带树 mask 的验证前向并接受最长合法前缀。

##### 与传统方法的区别

Medusa 与 EAGLE 都避免外部小模型，但 Medusa 直接在 token logits 上增加多头；EAGLE 更强调在特征空间预测。Medusa 的工程优势是部署单模型，代价是需要给目标模型加 heads 并训练。

#### 🧪 练习题

```yaml
question: "Medusa 消除独立 draft model 的方式是什么？"
options:
  - "在原模型上增加多个未来 token 解码头"
  - "删除验证步骤"
  - "只用滑动窗口"
  - "把 KV cache 量化为 1 bit"
answer: 0
explain: "Medusa heads 共享原 LLM backbone，直接提出多未来 token 候选，再由原模型验证。"
```
