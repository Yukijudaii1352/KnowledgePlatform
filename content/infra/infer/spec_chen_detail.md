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

Speculative Sampling 对 draft-verify 加速给出严谨采样证明：用近似模型提出候选序列，目标模型并行验证并以校正分布处理拒绝，确保采样结果精确服从大模型分布。

#### 🎯 核心要点

- 把投机生成形式化为 speculative sampling 算法
- 小模型连续提出多个 token，大模型一次计算验证分布
- 接受概率由目标分布与草稿分布的比值决定
- 拒绝时从正部差值分布采样以修正偏差
- 分析了接受率、草稿长度和端到端加速之间的关系

#### 🔬 深入细节

![Speculative Sampling 核心示意图](https://ar5iv.labs.arxiv.org/html/2302.01318/assets/x1.png)
*图：Speculative Sampling 论文中的算法流程，展示 draft proposal 与 target verification。*

```python
for round in decoding:
    y = draft_model.sample_k(prefix, k)
    p = target_model(prefix + y).next_token_distributions()
    for i in range(k):
        if uniform() <= min(1, p[i][y[i]] / q[i][y[i]]):
            prefix.append(y[i])
        else:
            r = relu(p[i] - q[i])
            prefix.append(sample(r / r.sum()))
            break
    if accepted_all:
        prefix.append(sample(p[k]))
```

##### 动机与背景

工程上早已有用小模型猜 token 的直觉，但若只是猜对就用、猜错再回退，会改变非贪心采样的概率分布。Chen 等工作的重点是把该过程变成数学上精确的采样算法。

##### 核心机制

draft 分布 \(q\) 负责提出候选，target 分布 \(p\) 负责定义正确采样。候选 token \(x\) 以 \(\min(1,p(x)/q(x))\) 接受；拒绝时从 \((p-q)_+\) 归一化后的分布采样，补上被 draft 过度提案的概率质量。

##### 训练/推理流程

每轮 draft 自回归生成多个 token；target 并行计算每个候选位置的 logits；验证从前到后进行。一旦某个 token 被拒绝，后续 draft 被丢弃，因为其条件前缀已经不成立。

##### 与传统方法的区别

与 Leviathan 版本高度相近，但该论文突出数学证明和 speculative sampling 形式化。它不是近似加速，只要实现接受/拒绝与校正采样，输出分布就与逐 token target sampling 一致。

#### 🧪 练习题

```yaml
question: "Speculative Sampling 拒绝候选后从哪里采样？"
options:
  - "草稿模型原分布"
  - "目标分布与草稿分布差值的正部归一化"
  - "均匀词表分布"
  - "固定 EOS token"
answer: 1
explain: "校正分布使用 (p-q)_+ 的归一化结果，用来恢复目标分布的剩余概率质量。"
```
