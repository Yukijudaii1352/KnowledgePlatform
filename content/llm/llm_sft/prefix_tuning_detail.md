### Prefix-Tuning：前缀调优 (Prefix-Tuning)

```yaml
id: prefix_tuning
name: Prefix-Tuning
full_name: 前缀调优 (Prefix-Tuning)
year: "2021.05"
org: Stanford University
paper_url: https://arxiv.org/abs/2101.00190
category: peft
parent: adapter
motivation: 优化连续前缀向量引导生成
```

#### 📝 一句话总结
Prefix-Tuning 冻结预训练语言模型，只学习一段连续的任务前缀向量，让后续 token 像关注“虚拟 token”一样关注该前缀，从而以极少参数完成生成任务适配。

#### 🎯 核心要点
- 将任务特定信息表示为连续 prefix，而不是离散人工 prompt 或完整模型权重更新。
- 冻结 GPT-2/BART 等预训练模型参数 \(\phi\)，只优化前缀矩阵 \(P_\theta\)。
- 对自回归 LM，prefix 被放在输入序列之前；对 encoder-decoder 模型，prefix 可分别作用于 encoder 和 decoder。
- prefix 不是普通词嵌入，而是每层 Transformer 可访问的激活/键值式连续参数，后续 token 可通过注意力读取它。
- 训练时使用 MLP 对前缀重参数化以稳定优化，训练结束后丢弃 MLP，只保存最终 prefix。
- 在表格到文本和摘要任务上，约 0.1% 参数即可接近全量微调；低数据和外推场景中通常优于 fine-tuning。

#### 🔬 深入细节

![Prefix-Tuning 与 Fine-Tuning 对比](https://ar5iv.labs.arxiv.org/html/2101.00190/assets/x1.png)
![Prefix-Tuning 在自回归和编码器-解码器模型中的示意](https://ar5iv.labs.arxiv.org/html/2101.00190/assets/x2.png)
*图：论文 Figure 1 展示 fine-tuning 需要为每个任务保存整份模型，而 prefix-tuning 只保存任务 prefix；Figure 2 展示 prefix 激活如何接入自回归 LM 和 encoder-decoder 架构。*

Prefix-Tuning 的出发点是：生成式模型已经在预训练中学到丰富语言能力，下游任务并不一定需要修改所有权重；真正需要的是一个能“引导”模型行为的任务条件。离散 prompt 可以做到这一点，但人工设计不稳定、表达能力受词表限制；Prefix-Tuning 把 prompt 放到连续空间中学习，使它既像 prompt 一样作为条件，又能通过梯度吸收完整训练集信号。

设输入为 \(x\)，输出序列为 \(y\)，预训练模型参数为 \(\phi\)。标准 fine-tuning 优化 \(\phi\)，而 Prefix-Tuning 固定 \(\phi\)，只优化 \(\theta\)：

$$
\theta^* = \arg\max_\theta \sum_{(x,y)} \log p_\phi(y \mid x; P_\theta).
$$

这里 \(P_\theta\) 是任务前缀，不对应真实词表 token。它的作用不是直接输出答案，而是改变后续 token 的注意力上下文：后续位置在计算 hidden state 时能 attend 到 prefix，就像序列前面真的存在一串“虚拟示例/指令”。

论文给出的形式化递推可以简化为：

$$
h_i =
\begin{cases}
P_\theta[i,:], & i \in \mathsf{P}_{\text{idx}}, \\
\mathrm{LM}_\phi(z_i, h_{<i}), & \text{otherwise}.
\end{cases}
$$

其中 \(\mathsf{P}_{\text{idx}}\) 表示 prefix 的位置集合，\(z\) 是由 prefix、输入和输出拼接而成的序列。对于自回归模型，可理解为 \(z=[\textsc{Prefix};x;y]\)；对于 encoder-decoder 模型，论文使用类似 \(z=[\textsc{Prefix};x;\textsc{Prefix}^{\prime};y]\) 的形式，使 encoder 侧和 decoder 侧都获得任务条件。

直接优化完整 \(P_\theta\) 在实验中对学习率和初始化敏感，因此论文使用重参数化：

$$
P_\theta[i,:] = \mathrm{MLP}_\theta(P'_\theta[i,:]).
$$

训练时优化较小的 \(P'_\theta\) 和 MLP 参数，通过 MLP 映射到实际 prefix 激活维度；训练完成后，只保存展开后的 \(P_\theta\)，丢弃 MLP。这个设计的直觉类似用一个平滑的生成器约束 prefix 空间，避免早期随机 prefix 直接扰乱深层注意力状态。

核心训练伪代码如下：

```python
# Prefix-Tuning for conditional generation
lm = load_pretrained_lm()        # GPT-2 for table-to-text, BART for summarization
freeze(lm.parameters())

P_prime = init_prefix(length=L, dim=k)
mlp = PrefixMLP(input_dim=k, output_dim=lm_hidden_or_kv_dim)

for batch in train_data:
    P = mlp(P_prime)             # produce prefix activations for all layers/positions
    loss = 0.0
    for x, y in batch:
        states = inject_prefix(lm, x, P)
        loss += negative_log_likelihood(lm, y, states)
    update([P_prime, mlp.parameters()], loss)

P_final = mlp(P_prime)
save(P_final)                   # discard reparameterization MLP for inference
```

与 Adapter 相比，Prefix-Tuning 更少触碰模型内部结构。Adapter 在每层插入新的残差模块，直接改变激活；Prefix-Tuning 保持 Transformer 层不变，只在注意力上下文中提供可学习前缀，让原模型利用已有注意力机制自行传播任务信息。因此它通常比 Adapter 更省参数，也更容易为不同用户或任务并行切换：同一个冻结 LM 加载不同 prefix 即可服务不同任务。

与全量 fine-tuning 相比，Prefix-Tuning 的归纳偏置更强。它不能任意改写模型权重，只能通过前缀调节生成轨迹，这限制了过拟合，也解释了论文中低数据和未见主题外推表现较好的现象。代价是 prefix 的位置、长度、初始化和重参数化会影响效果；如果任务需要深度改变模型知识或输出空间，单纯 prefix 可能不如全量微调灵活。

> 💡 关键：Prefix-Tuning 学的不是自然语言提示词，而是一组可被 Transformer 注意力读取的连续控制向量；它把“任务适配”转化为“学习如何条件化冻结语言模型”。

#### 🧪 练习题

```yaml
question: "Prefix-Tuning 训练完成后通常只需要保存什么？"
options:
  - "完整微调后的语言模型参数"
  - "最终 prefix 参数 P_theta，而不是训练时使用的重参数化 MLP"
  - "人工编写的离散 prompt 文本"
  - "每个训练样本对应的一套独立 prefix"
answer: 1
explain: "论文使用 MLP 重参数化来稳定训练，但推理时只保留生成后的 prefix；预训练 LM 参数始终冻结并在任务间共享。"
```
