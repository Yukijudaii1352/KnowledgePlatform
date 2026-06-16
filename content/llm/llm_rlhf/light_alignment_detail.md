### 轻量对齐 (Light Alignment)

```yaml
id: light_alignment
full_name: "轻量对齐 (Light Alignment)"
year: "2026.02"
paper_url: "https://arxiv.org/abs/2602.02027"
motivation: "单神经元安全专家自反射"
parent: "grpo"
category: "rl_based"
```

#### 📝 一句话总结

Light Alignment 提出了 Neuron-Guided Safe Decoding (NGSD)：只训练同模型家族中最小规模的安全专家，并用单个神经元式门控在解码时按风险选择性触发安全 logit 修正。它解决了传统安全后训练成本高、推理时统一干预易损害 utility、以及轻量方法跨模型泛化差的问题。

#### 🎯 核心要点

- 方法名为 NGSD：Neuron-Guided Safe Decoding，是一种 decoding-time safety alignment 方法。
- 只训练小规模 safety expert，并迁移到同 tokenizer、同模型家族的更大 base model。
- Prompt-level self-reflection 在生成前对输入进行四维风险评分：severity、actionability、evasion、targeting。
- 风险分数决定固定安全强度 \(\alpha\)：高风险 \(r>5\) 取 0.9，低风险 \(r\le 5\) 取 0.1。
- 解码中计算 base model 与 expert model 的 next-token distribution 差异 \(I_t=\frac12\|p_b-p_e\|_1\)，作为即时风险信号。
- 单神经元门控累计历史风险：\(v\leftarrow(1-1/\tau)v+I_t\)，超过阈值才触发 SafeDecoding-style 修正。
- 触发时只在候选集合 \(C=\operatorname{TopK}(p_b)\cup\operatorname{TopK}(p_e)\) 上执行 \(\tilde{p}=p_b+\alpha(p_e-p_b)\)，未触发时完全按 base model 解码。

#### 🔬 深入细节

![NGSD 管线图](https://ar5iv.labs.arxiv.org/html/2602.02027/assets/x1.png)
*图：Neuron-Guided Safe Decoding 的整体流程。先做 prompt-level self-reflection 决定安全强度，再在解码过程中用单神经元门控选择性调用 safety expert。*

Light Alignment/NGSD 的基本立场是：安全对齐不一定要把大模型参数重新训练一遍，也不应在每个 token 上无差别地施加强安全约束。传统 post-training 方法如 RLHF/DPO 成本高且与目标模型绑定；一些 decoding-time 方法虽然不改参数，但常常需要模型专属 safety vector、复杂搜索或持续 logit 干预，容易造成 over-refusal 或 utility degradation。NGSD 将问题拆成两层：输入层面先判断“这次请求整体危险吗”，token 层面再判断“当前生成位置是否真的需要专家介入”。

第一层是 prompt-level self-reflection。模型在生成前只执行一次风险评估，输出四个 0-10 分的维度：severity \(S\)、actionability \(A\)、evasion \(E\)、targeting \(T\)。论文强调这些维度不是为某类攻击硬编码，而是试图捕捉跨攻击类型的风险属性。聚合方式是先对 \(P=\{A,E,T\}\) 降序排序，取最大两个 \(P_1,P_2\)，再计算：

$$
r=\max\left(S,\frac12S+\frac12\cdot\frac{P_1+P_2}{2}\right),\quad r\in[0,10].
$$

这里 severity 被赋予主导地位，因为高危主题即使没有强 actionability，也不应被低估；而 actionability、evasion、targeting 只取 top-2，是为了减少噪声维度对最终风险的干扰。之后 NGSD 将 \(\alpha\) 固定为：高风险 \(r>5\) 时 \(\alpha=0.9\)，低风险 \(r\le5\) 时 \(\alpha=0.1\)。与 SSD 这类周期性调整 \(\alpha\) 的方法相比，这样的 prompt-level 决策推理开销更低，也减少了超参数动态震荡。

第二层是 neuron-guided decoding。NGSD 在解码时同时计算 base model \(M_b\) 与 safety expert \(M_e\) 的 next-token distribution：

$$
p_b=\operatorname{softmax}(M_b(x,y_{<t})),\quad
p_e=\operatorname{softmax}(M_e(x,y_{<t})).
$$

两者差异用 \(\ell_1\) 距离的一半表示：

$$
I_t=\frac12\|p_b-p_e\|_1.
$$

直觉上，如果 safety expert 与 base model 对下一 token 分布非常一致，说明当前位置没有明显安全分歧；如果差异很大，则可能表示 base model 正朝专家认为不安全的区域移动。NGSD 不直接用 \(I_t\) 的瞬时值触发干预，而是将其输入一个单神经元式时间门控：

$$
v_t=\left(1-\frac1\tau\right)v_{t-1}+I_t,
$$

当 \(v_t\ge v_{th}\) 时发放 spike，触发安全修正并把膜电位重置；否则继续使用 base model 解码。这个设计能过滤单步噪声，又能对连续风险积累快速响应。

触发门控后，NGSD 不在全词表上粗暴替换分布，而是构造候选集合：

$$
C=\operatorname{TopK}(p_b)\cup\operatorname{TopK}(p_e).
$$

然后执行 SafeDecoding-style 修正：

$$
\tilde{p}(y)=p_b(y)+\alpha(p_e(y)-p_b(y)),\quad y\in C.
$$

当 \(\alpha\) 较大时，分布更靠近 safety expert；当 \(\alpha\) 较小时，base model 的原始能力占主导。未触发神经元门控时，NGSD 直接按 \(p_b\) 选择 token，不让专家影响正常生成。这就是论文所谓“balancing intrinsic model capabilities with external guidance”：模型自己的安全意识和语言能力不是被外部专家全程覆盖，而是在高风险 prompt、高风险 token 位置才被加强。

NGSD 的 safety expert 也体现“轻量对齐”。它选择同模型家族中最小规模模型做安全增强训练，原因是 tokenizer 和输出空间兼容，专家分布可以与更大模型的 next-token distribution 对齐。这样，部署大模型时不需要给每个 scale 单独做完整安全后训练，只需让小专家在解码时提供方向。论文实验覆盖 GCG、PAIR、AutoDAN、prefilling attack 等攻击，并报告 NGSD 在安全性、utility、false refusal 和效率上取得更好的折中；方法还包含一个工程性的 early stopping 模块，用于缓解强 logit 干预下可能出现的重复拒绝文本。

```python
# NGSD / Light Alignment 简化伪代码
# 输入：prompt x, base model M_b, lightweight expert M_e, max length M

# 1. Prompt-level self-reflection
S, A, E, T = risk_reflection(x)  # severity/actionability/evasion/targeting, each in [0, 10]
P1, P2 = top2([A, E, T])
r = max(S, 0.5 * S + 0.5 * ((P1 + P2) / 2))
r = clip(r, 0, 10)
alpha = 0.9 if r > 5 else 0.1

# 2. Neuron-guided decoding
v = v_reset
y = []
for t in range(M):
    p_b = softmax(M_b(x, y))
    p_e = softmax(M_e(x, y))
    I_t = 0.5 * l1_norm(p_b - p_e)
    v = (1 - 1 / tau) * v + I_t

    if v >= v_threshold:
        C = topk_tokens(p_b) | topk_tokens(p_e)
        p_tilde = p_b + alpha * (p_e - p_b)
        token = argmax_over(p_tilde, C)
        v = v_reset
    else:
        token = argmax(p_b)

    y.append(token)
    if token == EOS:
        break
return y
```

> ⚠️ 注意：NGSD 的关键不是“安全专家越强越好、介入越多越好”，而是只在 prompt 风险和 token 分布分歧共同指向风险时介入；这正是它降低 over-refusal、保留 utility 的主要机制。

#### 🧪 练习题

```yaml
question: "NGSD 中单神经元门控的主要作用是什么？"
options:
  - "把 base model 的所有 token 概率替换为 expert model 概率"
  - "累计 base 与 safety expert 的分布差异，只在持续风险超过阈值时触发安全修正"
  - "在训练阶段压缩模型参数，使模型变成 1B 参数"
  - "用 beam search 生成多个候选回答，再交给人工评估"
answer: 1
explain: "门控状态 v 会累积 \(I_t=\frac12\|p_b-p_e\|_1\)，超过阈值才执行 \(p_b+\alpha(p_e-p_b)\) 修正，否则保持 base model 原始解码。"
```
