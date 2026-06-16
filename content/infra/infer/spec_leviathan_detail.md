### Speculative Decoding: 经典投机解码 (Speculative Decoding)

```yaml
id: spec_leviathan
name: Speculative Decoding
full_name: 经典投机解码 (Speculative Decoding)
year: '2023'
org: Google
paper_url: https://arxiv.org/abs/2211.17192
category: spec_decode
parent: —
motivation: 草稿-验证范式实现无损推理加速
```

#### 📝 一句话总结

Speculative Decoding 提出“draft model 先猜、target model 并行验证”的无损解码框架，用拒绝采样校正草稿分布偏差，解决大模型自回归采样每个 token 都必须串行前向的延迟瓶颈。

#### 🎯 核心要点

- 两模型协同：目标模型 \(M_p\) 定义最终分布，近似模型 \(M_q\) 低成本生成 speculative tokens
- 每轮草稿长度为 \(\gamma\)：\(M_q\) 串行采样 \(\gamma\) 个候选，\(M_p\) 一次并行计算 \(\gamma+1\) 个位置的 logits
- 接受规则：候选 \(x\) 以 \(\min(1,p(x)/q(x))\) 接受，拒绝时从 \((p-q)_+\) 的归一化分布采样修正 token
- 分布保证：输出边际分布与直接从 \(M_p\) 逐 token 采样一致，属于 lossless inference acceleration
- 加速条件：收益由接受率 \(\alpha=\sum_x\min(p(x),q(x))\)、草稿长度 \(\gamma\)、小模型相对成本 \(c\) 共同决定
- 工程特点：无需改动或重训目标模型，可用于 T5-XXL、LaMDA 等既有 Transformer 推理链路

#### 🔬 深入细节

![Speculative Decoding Figure 1](https://ar5iv.labs.arxiv.org/html/2211.17192/assets/figure1.png)
*图：论文 Figure 1，绿色为被目标模型接受的草稿 token，红色为被拒绝的草稿 token，蓝色为校正采样得到的 token；示例中一次目标模型调用可产出多个 token。*

```python
# Speculative Decoding, using p as target distribution and q as draft distribution.
while len(output) < max_new_tokens:
    draft_tokens = []
    draft_probs = []

    # 1) Cheap model proposes gamma speculative tokens autoregressively.
    for _ in range(gamma):
        q_i = draft_model.next_token_distribution(prefix + draft_tokens)
        x_i = sample(q_i)
        draft_probs.append(q_i)
        draft_tokens.append(x_i)

    # 2) Expensive model scores all speculative positions in one parallel pass.
    # p_dists[j] is p(. | prefix + draft_tokens[:j]).
    p_dists = target_model.parallel_distributions(prefix, draft_tokens)

    # 3) Verify from left to right; stop at the first rejection.
    accepted_all = True
    for j, x_j in enumerate(draft_tokens):
        p_j = p_dists[j]
        q_j = draft_probs[j]
        accept_prob = min(1.0, p_j[x_j] / q_j[x_j])

        if uniform(0, 1) <= accept_prob:
            prefix.append(x_j)
        else:
            correction = relu(p_j - q_j)
            prefix.append(sample(correction / correction.sum()))
            accepted_all = False
            break

    # 4) If every draft token is valid, use the extra target distribution.
    if accepted_all:
        prefix.append(sample(p_dists[gamma]))
```

##### 动机与背景

标准自回归采样的关键瓶颈不是一次矩阵乘是否足够快，而是生成 \(K\) 个 token 需要 \(K\) 次依赖前一步输出的目标模型调用。即使 accelerator 可以并行计算多个位置，普通解码也无法提前知道未来 token，因此只能把大模型权重一轮又一轮从 HBM 搬到计算单元。Leviathan 等人的核心观察是：很多 token 对小模型来说也“足够容易”，可以先低成本猜一段，再让大模型一次性检查这段猜测。

##### 接受-拒绝机制

设目标模型在当前前缀下的分布为 \(p(x)\)，draft model 的分布为 \(q(x)\)。draft 采到候选 \(x\) 后，用下面的概率接受：

$$
a(x)=\min\left(1,\frac{p(x)}{q(x)}\right)
$$

如果 \(q(x)\le p(x)\)，说明 draft 没有过度提出这个 token，候选必然被接受；如果 \(q(x)>p(x)\)，说明 draft 对该 token 的概率质量高于目标模型，只接受 \(p(x)/q(x)\) 的部分。第一次拒绝发生时不能简单回退到 target sampling，因为已经观察到“draft 过度提出了某个 token”这个事件；因此论文从剩余正概率质量采样：

$$
r(x)=\frac{(p(x)-q(x))_+}{\sum_y (p(y)-q(y))_+}
$$

这个修正分布只在 \(p\) 比 \(q\) 更大的 token 上有质量，刚好补回 draft 提案机制没有覆盖够的目标概率。

##### 为什么分布不变

单步看，候选被接受并输出为 \(x\) 的概率质量是 \(q(x)\min(1,p(x)/q(x))=\min(p(x),q(x))\)。若发生拒绝，补偿采样给 \(x\) 的额外质量是 \((p(x)-q(x))_+\)。两者相加：

$$
\min(p(x),q(x))+(p(x)-q(x))_+=p(x)
$$

因此每个位置输出的边际分布仍然是目标模型 \(p\)。多 token 情况下从左到右验证，一旦拒绝就丢弃后续草稿，因为后续草稿条件在新 token 下已经失效；若全部接受，则额外从目标模型为第 \(\gamma+1\) 个位置算出的分布采样一个 token，从而不浪费这次并行前向。

##### 加速模型

论文把接受率写成 draft 与 target 的重叠概率：

$$
\alpha=\mathbb{E}_{x\sim q}\left[\min\left(1,\frac{p(x)}{q(x)}\right)\right]=\sum_x\min(p(x),q(x))
$$

\(\alpha\) 越大，连续接受多个草稿 token 的概率越高。在独立近似下，每轮 target 调用期望产出的 token 数为：

$$
\mathbb{E}[N]=1+\alpha+\alpha^2+\cdots+\alpha^\gamma=\frac{1-\alpha^{\gamma+1}}{1-\alpha}
$$

如果 draft model 单次前向成本是 target model 的 \(c\)，一轮 speculative decoding 的近似时间成本是 \(1+\gamma c\)，所以理想 walltime improvement 可写成：

$$
\text{speedup}\approx\frac{1-\alpha^{\gamma+1}}{(1-\alpha)(1+\gamma c)}
$$

这解释了为什么 \(\gamma\) 不是越大越好：更长草稿增加潜在产出，但也线性增加小模型成本，并且后面 token 只有在前面全部接受后才有机会生效。

##### 与传统方法的区别

Speculative Decoding 不是把大模型替换成小模型，也不是只在贪心解码下做近似匹配。只要实现接受率和校正分布，随机采样、温度采样等非确定性输出都能保持目标模型分布。它与多 token 预测头也不同：这里的 proposer 是一个完整的外部近似模型，优点是无需改目标模型，缺点是生产系统要额外加载、调度、缓存和版本管理 draft model。

> 💡 关键：加速来自“用一次 target 前向验证多个条件位置”，正确性来自“接受 draft 中目标模型也认可的概率质量，拒绝时只从剩余目标概率质量采样”。

#### 🧪 练习题

```yaml
question: "Speculative Decoding 在拒绝 draft token 后为什么要从 (p-q)_+ 归一化分布采样？"
options:
  - "为了让 draft model 继续生成后续 token"
  - "为了补回 target 分布中被 draft 提案不足的概率质量"
  - "为了降低目标模型的显存占用"
  - "为了把采样退化成贪心解码"
answer: 1
explain: "接受部分贡献 min(p,q)，拒绝后的校正分布贡献 (p-q)_+，两者相加才恢复目标模型分布 p。"
```
