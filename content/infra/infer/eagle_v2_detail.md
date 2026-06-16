### EAGLE-2: 鹰2代 (EAGLE-2)

```yaml
id: eagle_v2
name: EAGLE-2
full_name: 鹰2代 (EAGLE-2)
year: '2024'
org: PKU
paper_url: https://aclanthology.org/2024.emnlp-main.422/
category: spec_decode
parent: eagle
motivation: 引入动态草稿树根据置信度调整路径
```

#### 📝 一句话总结

EAGLE-2 在 EAGLE 的特征级草稿模型上引入 context-aware dynamic draft tree，用草稿模型置信度近似候选 token 的接受率，并把固定草稿预算动态分配给更可能被目标 LLM 接受的路径。它不额外训练树结构模型，也不放宽验证条件，因此仍是 lossless 的 speculative acceleration。

#### 🎯 核心要点

- 反驳“草稿 token 接受率只由树中位置决定”的静态树假设，证明接受率同时强依赖上下文
- 利用 EAGLE draft model 的 confidence score 近似 acceptance rate，避免调用目标 LLM 估计候选质量
- 定义节点 value 为根到该节点路径上接受概率的乘积：\(V_i=\prod p_j\approx\prod c_j\)
- expansion phase 只扩展当前层 value 最高的 top-\(k\) 节点，避免树宽指数爆炸
- reranking phase 在全树节点中选择 value 最高的 top-\(m\) 节点，并优先浅层节点以保证选出的草稿仍连通
- flatten 动态树为一维序列，并构造只允许访问祖先节点的 attention mask 供目标 LLM 验证
- 不修改 EAGLE draft model、目标 LLM 或 speculative sampling 接受规则，主要收益来自更合理的草稿树形状

#### 🔬 深入细节

![EAGLE-2 动态草稿树](https://ar5iv.labs.arxiv.org/html/2406.16858/assets/x9.png)
*图：论文 Figure 7 展示 EAGLE-2 的扩展和重排过程；边上的数字是 draft confidence，节点括号内是累积 value，最后选中节点被 flatten 成验证序列，并按树结构生成 attention mask。*

```python
# EAGLE-2 context-aware dynamic draft tree, simplified from the paper
tree = DraftTree(root=Node(token=prefix[-1], value=1.0, depth=0))
current_layer = [tree.root]

for layer in range(max_depth):
    # Expansion phase: expand only promising nodes from the latest layer.
    expand_nodes = topk(current_layer, key=lambda n: n.value, k=expand_width)
    next_layer = []
    for node in expand_nodes:
        # EAGLE draft model returns candidate tokens and confidence scores.
        children = eagle_draft_model.expand(node)
        for token, confidence, feature in children:
            child = Node(
                token=token,
                feature=feature,
                confidence=confidence,
                value=node.value * confidence,
                parent=node,
                depth=node.depth + 1,
            )
            tree.add_child(node, child)
            next_layer.append(child)
    current_layer = next_layer

# Reranking phase: keep the globally most valuable connected subtree.
selected_nodes = connected_top_m(
    tree.nodes,
    key=lambda n: (n.value, -n.depth),
    m=verify_budget,
)
draft_tokens, attention_mask = flatten_with_ancestor_mask(selected_nodes)

# Verification remains the same as EAGLE/speculative sampling.
target_probs = target_llm(prefix + draft_tokens, attention_mask=attention_mask)
accepted = speculative_verify(draft_tokens, target_probs, draft_probs)
prefix.extend(accepted)
```

EAGLE-1 采用静态 draft tree：每轮草稿阶段生成相同形状的树，然后让目标模型验证。这个策略隐含了一个强假设，即某个树位置 \(P_i\) 的候选接受率主要由位置决定。EAGLE-2 的第一步是做诊断：同一位置的接受率在不同 query 上方差很大；例如算术前缀 “10+2=” 的下一个 token 非常确定，而 “10+2” 仍可能接 “=” 或 “+” 等分支。静态树会在简单上下文里浪费宽度，也会在困难上下文里没有给足备选分支。

动态树真正困难的是：候选 token 的真实接受率需要目标 LLM 前向结果，而 speculative decoding 的目标正是减少目标 LLM 前向次数。EAGLE-2 利用 EAGLE 的一个经验性质绕开这个矛盾：draft model 的输出概率和最终接受率强正相关。论文报告 confidence 低于 0.05 的 token 接受率约 0.04，而 confidence 高于 0.95 的 token 接受率约 0.98。因此可以把每条边上的 confidence \(c_j\) 当作节点接受率 \(p_j\) 的低成本近似。

对树中节点 \(t_i\)，它只有在根到该节点路径上的所有祖先都被接受时才可能最终提交，所以 EAGLE-2 定义全局 value：

$$
V_i=\prod_{t_j\in \mathrm{Path}(\mathrm{root},t_i)}p_j
\approx
\prod_{t_j\in \mathrm{Path}(\mathrm{root},t_i)}c_j.
$$

这不是单点置信度，而是路径级成功概率。深层节点即使自身 confidence 高，只要前缀路径上有低置信边，整体 value 也会下降；反过来，简单上下文中的单链高置信路径会持续获得较高 value。这个乘积定义直接匹配 speculative sampling 的前缀接受逻辑。

Expansion phase 解决“扩展谁”的问题。树注意力允许同一层多个节点一次送入 draft model，但若每个节点都扩展，节点数会指数增长，草稿模型本身的前向开销会吃掉加速收益。EAGLE-2 因此只从当前最新层选择 value 最高的 top-\(k\) 节点扩展。直觉上，只有高 value 节点的后代才有较大机会出现在最终被接受的前缀中，低 value 分支继续加深意义不大。

Reranking phase 解决“验证谁”的问题。扩展阶段偏向加深树，但 speculative verification 的预算有限，并且 value 随深度一般非增，因为每条边的 \(p_j,c_j\in[0,1]\)。一些没有被继续扩展的浅层节点可能比更深的节点更值得验证。EAGLE-2 会把整棵草稿树的所有节点按 value 重排，选 top-\(m\) 作为最终草稿；同 value 时优先浅层节点。由于一个节点的 value 不大于其父节点，这种 tie-break 可以保持所选节点形成连通树。

最终目标 LLM 仍只能接收一维 token 序列，因此 EAGLE-2 需要把动态树 flatten 成序列，并重新构造 attention mask。普通自回归是下三角 mask，每个 token 可见所有先前 token；树验证中，不同分支之间不能互相看见，否则验证概率就不再对应“沿某条候选路径生成”的概率。EAGLE-2 的 mask 规则是每个节点只看见自己的祖先节点。验证后仍按 EAGLE/speculative sampling 递归接受或拒绝候选，保证输出分布与原目标模型一致。

与 EAGLE-1 相比，EAGLE-2 没有让 draft model 更强，也没有引入额外训练数据，而是在同一草稿模型和验证预算下重新分配节点。论文在 Vicuna、LLaMA2-Chat、LLaMA3-Instruct 以及 MT-bench、HumanEval、GSM8K、Alpaca、CNN/Daily Mail、Natural Questions 上评估，显示 EAGLE-2 通常拥有更长 average acceptance length；ACL 页面摘要报告最高约 5x 加速，arXiv 版本摘要报告 3.05x-4.26x、比 EAGLE-1 快 20%-40%。这些数值说明动态树的收益来自更高的“每次目标前向提交 token 数”，而非牺牲生成一致性。

#### 🧪 练习题

```yaml
question: "EAGLE-2 中节点 value 的主要作用是什么？"
options:
  - "近似该节点整条路径最终被接受的概率，用于选择扩展和验证预算"
  - "记录 token 在词表中的整数编号，用于排序词表"
  - "衡量目标 LLM 参数量大小，用于选择 GPU"
  - "替代 speculative sampling 的拒绝采样规则"
answer: 0
explain: "节点最终被接受需要其祖先路径全部接受，因此 EAGLE-2 用路径上 confidence 的乘积近似全局接受概率。"
```
