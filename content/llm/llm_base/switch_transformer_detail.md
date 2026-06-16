### Switch Transformer：稀疏专家 Transformer
```yaml
id: switch_transformer
name: Switch Transformer
full_name: "稀疏专家 Transformer (Switch Transformer)"
year: "2021.01"
org: "Google Research"
paper_url: "https://arxiv.org/abs/2101.03961"
category: "sparse_moe"
parent: "t5"
motivation: "Top1路由简化万亿MoE"
```

#### 📝 一句话总结
Switch Transformer 提出把 Transformer/T5 中的 dense FFN 替换为 top-1 路由的稀疏专家 FFN，解决了传统 MoE 路由复杂、通信开销大和训练不稳定的问题。它用每个 token 只激活一个专家的简单机制，在近似保持每 token FLOPs 的同时把参数规模扩展到万亿级。

#### 🎯 核心要点
- 核心架构是 Switch FFN：用稀疏专家层替换 Transformer block 中的前馈网络层，attention 结构保持不变。
- 路由策略从 MoE 的 top-k 简化为 top-1：每个 token 只发往概率最高的一个专家，降低计算、通信和实现复杂度。
- Router 使用 softmax gate：先计算 \(p_i(x)=\mathrm{softmax}(W_r x)_i\)，再选择 \(\arg\max_i p_i(x)\)。
- Switch 层输出为选中专家输出乘以 gate value：\(y=p_{e(x)}(x)E_{e(x)}(x)\)，其中 \(e(x)\) 是 top-1 专家。
- Expert capacity 用 capacity factor 控制每个专家最多处理的 token 数，过载 token 通过残差路径跳过该专家层。
- 训练加入可微的负载均衡辅助损失 \(\alpha N\sum_i f_iP_i\)，鼓励 token 分配和 router 概率都接近均匀。
- 论文以 T5 为基座，在 C4 span-corruption 预训练中展示最高 7x+ pre-training speedup，并在 mT5 101 种语言上普遍收益。
- 工程改进包括 selective precision、专家初始化缩放、稀疏模型 fine-tuning 正则增强，以及 data/model/expert parallelism 组合。

#### 🔬 深入细节
![Switch Transformer 编码器块示意图](https://ar5iv.labs.arxiv.org/html/2101.03961/assets/x3.png)
*图：论文 Figure 2。Switch Transformer 将 dense FFN 替换为 Switch FFN，router 为每个 token 独立选择一个专家，并用对应 gate value 缩放专家输出。*

![Switch Transformer expert capacity 示意图](https://ar5iv.labs.arxiv.org/html/2101.03961/assets/x4.png)
*图：论文 Figure 3。capacity factor 决定每个专家的 token 缓冲区大小；过小会丢 token，过大则浪费通信和计算。*

```python
# Switch FFN 的核心逻辑，省略设备并行细节

def switch_ffn(tokens, experts, router_w, capacity_factor, alpha=1e-2):
    # tokens: [T, d_model]
    logits = tokens @ router_w                  # [T, num_experts]
    probs = softmax(to_float32(logits), axis=-1)

    # top-1 routing: 每个 token 只选择一个专家
    gate, expert_id = top1(probs)               # [T], [T]
    expert_mask = one_hot(expert_id, num_experts)

    # 负载均衡损失：f 是真实 dispatch 占比，P 是 router 概率占比
    f = mean(expert_mask, axis=0)               # fraction of tokens per expert
    P = mean(probs, axis=0)                     # fraction of probability mass
    aux_loss = alpha * num_experts * sum(f * P)

    # expert capacity：每个专家最多处理固定数量 token
    capacity = ceil((len(tokens) / num_experts) * capacity_factor)
    positions = cumsum_per_expert(expert_mask)
    keep = positions < capacity

    outputs = zeros_like(tokens)
    for i, expert in enumerate(experts):
        selected = (expert_id == i) & keep
        outputs[selected] = gate[selected, None] * expert(tokens[selected])

    # overflow token 在实际 Transformer block 中主要依赖残差连接保留表示
    return outputs, aux_loss
```

Switch Transformer 的动机是把“参数规模”和“每 token 计算量”解耦。普通 dense Transformer 每个 token 都经过同一套 FFN 参数；如果直接把模型加宽或加深，参数、显存、FLOPs 都同步增长。MoE 的想法是准备多个专家 \(E_1,\ldots,E_N\)，但每个 token 只调用其中一部分专家，因此总参数可以很大，单个 token 的实际计算仍接近一个 FFN。Switch 的贡献在于把此前较复杂的 top-k MoE 路由简化到 top-1，让稀疏化更容易稳定扩展。

传统 MoE 对 token 表示 \(x\) 计算 router logits：

$$
h(x)=W_r x
$$

然后得到专家概率：

$$
p_i(x)=\frac{e^{h_i(x)}}{\sum_{j=1}^{N}e^{h_j(x)}}
$$

top-k MoE 会选择集合 \(\mathcal{T}\) 中的多个专家并线性组合：

$$
y=\sum_{i\in\mathcal{T}}p_i(x)E_i(x)
$$

Switch 的变化是令 \(|\mathcal{T}|=1\)。若 \(e(x)=\arg\max_i p_i(x)\)，则输出近似为：

$$
y=p_{e(x)}(x)E_{e(x)}(x)
$$

这个设计看似更“硬”，但论文发现它反而更好用。top-1 让每个 token 只需要一次专家 FFN 计算，expert capacity 可以比 top-2 至少减半；跨设备通信也更简单，因为 token 不需要被复制到多个专家再聚合。Router 仍可训练的关键在于 gate value \(p_{e(x)}(x)\) 出现在输出中，梯度可以通过被选中专家的概率回传到 router，虽然 \(\arg\max\) 本身不可微。

容量控制是 Switch 能否高效运行的核心工程问题。每个专家在编译图中必须有固定 batch shape，因此论文定义：

$$
\text{expert capacity}=\left(\frac{\text{tokens per batch}}{\text{number of experts}}\right)\times\text{capacity factor}
$$

capacity factor 大于 1 会为负载不均衡预留缓冲，但会增加空槽位、通信和内存；capacity factor 太小则会发生 token overflow。论文的实现中，如果某个专家已满，溢出的 token 不经过该 Switch FFN，而是在 Transformer block 的残差连接中继续向后传播。因此，capacity factor 和负载均衡损失共同决定了稀疏层是否既高效又不损害质量。

负载均衡损失是避免“所有 token 都挤到少数专家”的关键。设一个 batch 有 \(T\) 个 token，\(f_i\) 是实际被派发到专家 \(i\) 的 token 比例：

$$
f_i=\frac{1}{T}\sum_{x\in B}\mathbf{1}\{\arg\max p(x)=i\}
$$

\(P_i\) 是 router 给专家 \(i\) 的平均概率质量：

$$
P_i=\frac{1}{T}\sum_{x\in B}p_i(x)
$$

辅助损失为：

$$
\mathcal{L}_{\text{aux}}=\alpha\cdot N\sum_{i=1}^{N}f_iP_i
$$

当 \(f\) 和 \(P\) 都接近均匀分布 \(1/N\) 时，该点积最小。这里 \(f\) 由 hard routing 产生，不可微；\(P\) 可微，因此损失仍能推动 router logits 变得更均衡。论文使用 \(\alpha=10^{-2}\)，认为它足以快速平衡负载，又不会压过主交叉熵目标。

训练流程继承 T5 的 span-corruption 预训练：在 C4 中遮蔽 15% token，把连续 mask span 替换为 sentinel token，模型预测缺失内容。Switch 不是改 attention，而是改 FFN，因此它可以直接嵌入 T5-Base、T5-Large、mT5 等架构。实验中，Switch-Base 与 dense T5-Base 保持相近 FLOPs per token，但通过增加专家数获得更多参数容量；论文报告在固定资源下可达到 7x 量级的预训练速度优势，大规模模型对 T5-XXL 也有约 4x speedup。

论文还强调 Switch 的稳定训练不是只靠 top-1 路由。Selective precision 指 router 相关计算使用 float32，而其余大部分计算可用 bfloat16，从而降低低精度下 router 抖动；初始化缩放降低专家层激活方差，帮助更多专家扩展；fine-tuning 时对专家层使用更强 dropout/正则，缓解稀疏专家在小数据任务上的过拟合。换言之，Switch 的算法核心很短，但能扩到万亿参数依赖一整套路由、容量、精度和并行策略。

> 💡 关键：Switch Transformer 不是让每个 token 使用“更多计算”，而是让不同 token 使用“不同参数”。这就是它能在近似固定 FLOPs 下增加总参数量的原因。

与 dense scaling 相比，Switch scaling 增加的是专家维度；与早期 MoE 相比，它牺牲 top-2 聚合的表达冗余，换来 top-1 路由的简单性、吞吐和更低通信成本。这个取舍非常适合大规模预训练：当 batch 很大、专家很多、设备很多时，减少一次专家通信和一次 FFN 计算比理论上更平滑的 top-k 混合更有价值。

#### 🧪 练习题
```yaml
question: "Switch Transformer 将 MoE 的 top-k 路由改为 top-1 路由，最直接的收益是什么？"
options:
  - "每个 token 会同时利用所有专家，因此表达能力最大"
  - "每个 token 只经过一个专家，降低路由计算、专家计算和跨设备通信"
  - "不再需要负载均衡损失"
  - "可以完全移除 Transformer 的 attention 层"
answer: 1
explain: "Switch 的核心简化是 top-1 routing；它仍需要负载均衡和 attention，但每个 token 只发送到一个专家，因此计算和通信更低。"
```
