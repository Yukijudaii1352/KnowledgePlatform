### Switch Transformer: Top-1 稀疏专家 Transformer

```yaml
id: switch_transformer
name: Switch Transformer
full_name: Switch Transformer
year: '2022'
org: Google
paper_url: http://www.jmlr.org/papers/v23/21-0998.html
category: hybrid
parent: gshard
motivation: 简化为Top-1路由万亿参数MoE模型
```

#### 📝 一句话总结

Switch Transformer 将 MoE 路由从 GShard 的 Top-2 简化为 Top-1，每个 token 只发往一个专家，从而降低通信和计算复杂度，并首次稳定训练到万亿参数级稀疏语言模型。

#### 🎯 核心要点

- 用 Switch FFN 替换 Transformer 中部分 dense FFN 层，每个 token 只激活一个专家，参数量增加但每 token FLOPs 近似保持。
- Top-1 router 简化 dispatch/combine：无需合并两个专家输出，all-to-all 通信量低于 Top-2 MoE。
- 使用 expert capacity 和 token dropping 控制每个专家的最大 token 数，避免热门专家 OOM。
- 辅助负载均衡损失鼓励 routing probability 和实际 token 分配均匀。
- 引入选择性精度、较小初始化、expert dropout 等稳定训练技巧，使 bfloat16 稀疏模型可训练。

#### 🔬 深入细节

##### 核心示意图

![Switch Transformer 路由示意](https://ar5iv.labs.arxiv.org/html/2101.03961/assets/x1.png)
*图：Switch Transformer 中 router 为每个 token 选择一个专家，token 经 all-to-all 分发到专家 FFN，再组合回原序列位置。*

##### 算法伪代码

```python
# Switch FFN layer
def switch_ffn(tokens, experts, router_w, capacity_factor):
    logits = tokens @ router_w
    probs = softmax(logits, dim=-1)
    expert_id = argmax(probs, dim=-1)        # Top-1 routing
    gate = max(probs, dim=-1)

    capacity = int(capacity_factor * len(tokens) / len(experts))
    dispatch = build_capacity_limited_dispatch(expert_id, capacity)
    expert_inputs = all_to_all(dispatch, tokens)

    expert_outputs = [experts[e](expert_inputs[e]) for e in range(len(experts))]
    outputs = inverse_all_to_all(dispatch, expert_outputs)
    return gate[:, None] * outputs, load_balance_loss(probs, expert_id)
```

##### 方法解释

MoE 的基本目标是扩大参数量而不线性增加计算量。Dense FFN 对所有 token 使用同一组参数；MoE FFN 则准备多个专家 \(E_i\)，router 根据 token 表示 \(x\) 选择少数专家：

$$
y = \sum_i g_i(x) E_i(x)
$$

GShard 使用 Top-2 routing，每个 token 通常发给两个专家并加权合并。Switch Transformer 的关键简化是只选一个专家：

$$
e=\arg\max_i p_i(x), \quad y=p_e(x)E_e(x)
$$

这让 dispatch/combine 逻辑更简单，通信量和专家计算量也更低。Top-1 的代价是 router 更容易负载不均，因此论文保留并强化了 load balancing。辅助损失常写成：

$$
L_{\text{aux}} = \alpha \cdot N \sum_{i=1}^{N} f_i P_i
$$

其中 \(f_i\) 是实际路由到专家 \(i\) 的 token 比例，\(P_i\) 是 router 分配给专家 \(i\) 的平均概率。若某个专家概率高且实际 token 多，损失会增大，推动 router 更均匀。

Expert capacity 是系统侧稳定器。每个专家只接收固定上限 \(C=\mathrm{capacity\_factor}\cdot T/N\) 的 token，超出容量的 token 被 drop 或通过残差路径跳过专家。这避免单个专家因热门 token 过载导致 all-to-all buffer 爆炸。

> 💡 关键：Switch 的“简单”不是功能减少，而是把 Top-2 MoE 中最昂贵的双专家通信/组合简化掉，换来更好的大规模可训练性。

##### 与 GShard 的区别

GShard 证明了 Top-2 MoE Transformer 可扩展到数千 TPU；Switch Transformer 进一步面向稳定性和工程复杂度做减法。它的 Top-1 路由减少通信，选择性 fp32 router 计算和较小初始化缓解训练不稳定，expert dropout 提高下游迁移泛化。结果是更适合扩展到 trillion-parameter 的稀疏模型。

#### 🧪 练习题

```yaml
question: "Switch Transformer 相比 GShard Top-2 routing 的核心简化是什么？"
options:
  - "每个 token 只路由到一个专家，减少通信和 combine 复杂度"
  - "完全取消专家负载均衡损失"
  - "把所有专家复制到每张 GPU"
  - "只训练 encoder，不训练 decoder"
answer: 0
explain: "Switch 使用 Top-1 router，每个 token 只经过一个专家，因此 dispatch/combine 和 all-to-all 成本更低。"
```
