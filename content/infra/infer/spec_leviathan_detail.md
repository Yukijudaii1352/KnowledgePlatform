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

经典 Speculative Decoding 使用小 draft model 一次提出多个候选 token，再用大 target model 并行验证，并通过拒绝采样校正保证输出分布与直接从 target model 采样完全一致。

#### 🎯 核心要点

- draft model 自回归生成 gamma 个候选 token
- target model 一次前向并行计算这些位置的条件分布
- 逐 token 按 min(1, p/q) 接受候选，失败时从校正分布采样
- 额外从 target 分布采样一个 token 以利用全部验证结果
- 在不改变目标模型输出分布的前提下降低大模型前向次数

#### 🔬 深入细节

![Speculative Decoding 核心示意图](https://ar5iv.labs.arxiv.org/html/2211.17192/assets/figure1.png)
*图：Leviathan 等提出的 speculative decoding 流程，小模型提出草稿，大模型并行验证。*

```python
while not finished:
    draft = []
    for i in range(gamma):
        x = sample(q_model(. | prefix + draft))
        draft.append(x)
    p = target_model.distributions(prefix, draft)  # one parallel forward
    for i, x in enumerate(draft):
        accept_prob = min(1.0, p[i][x] / q[i][x])
        if random() < accept_prob:
            prefix.append(x)
        else:
            prefix.append(sample(normalize(p[i] - q[i].clamp(max=p[i]))))
            break
    if all_accepted:
        prefix.append(sample(p[gamma]))
```

##### 动机与背景

自回归解码每生成一个 token 都要跑一次大模型，延迟由串行前向次数决定。即使 GPU 能并行处理多个位置，标准采样也不能提前知道后续 token，因此无法直接批量生成。

##### 核心机制

投机解码引入较快的近似分布 \(q\) 作为提案分布，目标模型分布 \(p\) 作为校验分布。若 draft token 在 \(p\) 下也足够可能，则接受；若不接受，则从校正后的剩余分布采样，保证边际分布仍等于 \(p\)。

##### 训练/推理流程

每轮先让 draft model 连续生成 \(\gamma\) 个 token；然后 target model 对 prefix+draft 做一次并行前向，得到每个位置的 \(p_i\)。验证从左到右进行，直到第一次拒绝或全部接受。接受越多，单次 target 前向产出的 token 越多。

##### 与传统方法的区别

它与贪心近似、多 token head 不同，是严格 lossless 的采样加速。加速上限取决于 draft model 速度和接受率；draft 越接近 target，接受长度越长，但 draft 成本也可能上升。

#### 🧪 练习题

```yaml
question: "经典投机解码为什么能保持目标模型分布不变？"
options:
  - "完全跳过 target model"
  - "通过拒绝采样和校正分布修正 draft 提案"
  - "只使用贪心解码"
  - "把温度固定为 0"
answer: 1
explain: "接受/拒绝规则以 target 分布 p 为准，拒绝时从 p 与 q 的差值校正分布采样，因此边际分布保持为 p。"
```
