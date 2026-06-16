### Speculative Sampling: 投机采样 (Speculative Sampling)

```yaml
id: spec_chen
name: Speculative Sampling
full_name: 投机采样 (Speculative Sampling)
year: '2023'
org: DeepMind
paper_url: https://arxiv.org/abs/2302.01318
category: spec_decode
parent: —
motivation: 严谨数学证明的拒绝采样加速方案
```

#### 📝 一句话总结

Speculative Sampling 将 draft-verify 解码形式化为严格的修改版拒绝采样算法：小模型先生成长度 \(K\) 的草稿，大模型一次并行评分并校正拒绝事件，从而在不改变目标模型采样分布的前提下降低大模型调用次数。

#### 🎯 核心要点

- 算法对象：draft model \(p(\cdot|\cdot)\) 负责提案，target model \(q(\cdot|\cdot)\) 定义最终采样分布
- lookahead 参数 \(K\)：每轮先自回归生成 \(K\) 个草稿 token，再由 target model 并行计算 \(K+1\) 组 logits
- 修改拒绝采样：候选以 \(\min(1,q(x)/p(x))\) 接受，拒绝时从 \((q-p)_+\) 归一化分布采样
- 严格证明：每个输出 token 的边际分布等于 target model，分布一致性只受硬件数值误差影响
- 系统分析：在 Chinchilla 70B、XSum、HumanEval 等设置中讨论 \(K\)、接受率、循环耗时和端到端加速的权衡
- 与 Leviathan 同期独立：核心算法一致，但该论文更强调分布证明、分布式大模型 serving 和经验速度上限分析

#### 🔬 深入细节

![Speculative Sampling Figure 1](https://ar5iv.labs.arxiv.org/html/2302.01318/assets/x1.png)
*图：论文 Figure 1，展示不同 lookahead \(K\) 下生成 128 token 的耗时、接受 token 占比与每轮循环时间；该论文没有单独的架构总览图，因此这里使用其官方 ar5iv 实验图说明草稿长度的系统权衡。*

```python
# Paper notation: q is the target model, p is the draft model.
while n < target_length:
    draft = []
    p_dists = []

    # 1) Generate K draft tokens with the faster model.
    for t in range(1, K + 1):
        p_t = draft_model.next_token_distribution(prefix + draft)
        x_t = sample(p_t)
        p_dists.append(p_t)
        draft.append(x_t)

    # 2) Score K+1 target distributions in parallel.
    # q_dists[t] = q(. | prefix + draft[:t])
    q_dists = target_model.parallel_distributions(prefix, draft)

    # 3) Modified rejection sampling from left to right.
    all_accepted = True
    for t, x_t in enumerate(draft):
        p_t = p_dists[t]
        q_t = q_dists[t]
        accept_prob = min(1.0, q_t[x_t] / p_t[x_t])

        if uniform(0, 1) <= accept_prob:
            prefix.append(x_t)
        else:
            residual = relu(q_t - p_t)
            prefix.append(sample(residual / residual.sum()))
            all_accepted = False
            break

    # 4) If all K drafts are accepted, sample one extra target token.
    if all_accepted:
        prefix.append(sample(q_dists[K]))
```

##### 动机与背景

Transformer 训练时能并行处理整段序列，但采样时每个 token 都依赖上一个采样结果，因此大模型调用次数等于生成长度。Chen 等人的出发点是硬件层面的：对一个很大的 target model 来说，一次前向并行评分一小段 continuation 的延迟，常常接近只评分下一个 token 的延迟；如果这些 continuation 来自一个快得多的 draft model，就有机会用一次 target 调用产出多个 token。

##### 算法流程

论文的 Algorithm 2 使用 lookahead \(K\)。每一轮先让 draft model \(p\) 自回归采样 \(\tilde{x}_1,\dots,\tilde{x}_K\)，然后 target model \(q\) 在同一次并行调用里计算：

$$
q(\cdot|x_{\le n}),\ q(\cdot|x_{\le n},\tilde{x}_1),\ \dots,\ q(\cdot|x_{\le n},\tilde{x}_{1:K})
$$

验证必须从左到右执行，因为第 \(t+1\) 个草稿 token 的条件前缀包含第 \(t\) 个草稿 token。如果第 \(t\) 个 token 被拒绝，后续草稿都不再对应真实前缀，需要全部丢弃；如果 \(K\) 个 token 全部接受，则可以利用第 \(K+1\) 组 target logits 再采一个额外 token。

##### 分布校正证明

对固定前缀和单个候选位置，draft 采到 token \(x\) 的概率是 \(p(x)\)，接受概率是：

$$
\min\left(1,\frac{q(x)}{p(x)}\right)
$$

因此“由 draft 直接输出 \(x\)”的概率质量是：

$$
p(x)\min\left(1,\frac{q(x)}{p(x)}\right)=\min(p(x),q(x))
$$

如果发生拒绝，算法从 residual 分布采样：

$$
r(x)=\frac{(q(x)-p(x))_+}{\sum_y(q(y)-p(y))_+}
$$

拒绝分支给 \(x\) 的概率质量正好是 \((q(x)-p(x))_+\)。两部分相加：

$$
\Pr[X=x]=\min(p(x),q(x))+(q(x)-p(x))_+=q(x)
$$

这就是论文“modified rejection sampling”严谨性的核心。它保证的是同分布采样，而不是同随机种子下逐 token 位级一致；实际系统中，伪随机数消耗顺序和并行计算数值误差都会让输出文本不同，但样本分布应与 target model 保持一致。

##### lookahead 的工程权衡

\(K\) 增大时，单轮 target 调用可能接受更多 token，理论上减少大模型调用次数；但 draft 需要做更多串行小模型调用，target 评分的序列也更长，而且越靠后的草稿 token 只有在前面全被接受时才有效。论文 Figure 1 显示 \(K\) 过大后速度会平台化甚至回退，例如 XSum 的 nucleus sampling 最优 \(K\) 可落在较小值附近。这说明 speculative sampling 的调参目标不是最大化草稿长度，而是最大化“每轮有效接受 token 数 / 每轮总延迟”。

##### 与经典投机解码的关系

该论文和 Leviathan 等人的 Speculative Decoding 是同期独立工作，数学机制几乎等价：一个快模型提出候选，一个慢模型并行验证，拒绝时使用正部差值分布校正。DeepMind 版本的表达更偏系统与采样理论：它明确区分 target \(q\) 与 draft \(p\)，把算法写成 auto-regressive target/draft models 的通用伪代码，并在 Chinchilla 分布式推理中验证速度提升与样本质量不变。

> ⚠️ 注意：如果实现时把拒绝分支写成“直接从 target \(q\) 采样”，分布会偏向 target 高概率 token，因为已接受分支已经消耗了一部分 \(\min(p,q)\) 的概率质量。

#### 🧪 练习题

```yaml
question: "Speculative Sampling 中 target model 为什么要计算 K+1 组 logits？"
options:
  - "为了训练 draft model"
  - "为了在 K 个草稿全被接受时还能额外采样一个 target token"
  - "为了减少词表大小"
  - "为了让每个 token 使用不同温度"
answer: 1
explain: "target 并行评分草稿前缀上的 K 个位置，同时多算一个后继位置；若所有草稿都接受，这个额外分布可直接产出下一个 token。"
```
