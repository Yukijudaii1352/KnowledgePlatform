### RetNet: 保留网络 (Retentive Network)

```yaml
id: retnet
name: RetNet
full_name: 保留网络 (Retentive Network)
year: '2023'
org: Microsoft
paper_url: https://arxiv.org/abs/2307.08621
category: linear_attn
parent: —
motivation: 三种范式统一实现线性推理复杂度
```

#### 📝 一句话总结

RetNet 提出 retention 机制，将 Transformer 的并行训练、RNN 的递推推理和 chunkwise 训练统一起来，以多尺度指数衰减记忆实现线性复杂度序列建模。

#### 🎯 核心要点

- Multi-Scale Retention 用多组衰减因子捕捉不同时间尺度
- 提供 parallel、recurrent、chunkwise recurrent 三种等价计算范式
- 推理时维护固定大小状态，每步复杂度与历史长度无关
- 训练时可像 Transformer 一样并行处理整段序列
- 结合门控、归一化和 FFN 构成 RetNet block

#### 🔬 深入细节

![RetNet 核心示意图](https://ar5iv.labs.arxiv.org/html/2307.08621/assets/x1.png)
*图：RetNet 论文中的 retention block 与三种计算范式示意。*

```python
# Retention recurrent form
state = zeros(d, d)
for t, x_t in enumerate(sequence):
    q = x_t @ W_q
    k = x_t @ W_k
    v = x_t @ W_v
    state = gamma * state + outer(k, v)
    y_t = q @ state
    y_t = group_norm(y_t)
```

##### 动机与背景

Transformer 训练并行但推理 KV cache 随长度增长；RNN 推理常数状态但训练并行性弱。RetNet 试图同时获得并行训练、低成本递推推理和长上下文建模能力。

##### 核心机制

retention 可写成带指数衰减的历史键值外积累积。并行形式类似 masked attention 加衰减矩阵；递推形式维护状态 \(S_t=\gamma S_{t-1}+K_t^TV_t\)；chunkwise 形式在块内并行、块间递推。多尺度 retention 使用不同 \(\gamma\) 覆盖短期和长期依赖。

##### 训练/推理流程

训练时通常用 parallel 或 chunkwise 形式高效利用 GPU；推理时每层每头只维护 retention state，新 token 到来后更新状态并计算输出，不需要保存完整 KV cache。

##### 与传统方法的区别

RetNet 与线性 attention 都追求线性复杂度，但 RetNet 明确给出并行/递推/chunkwise 三范式等价，并通过指数衰减引入稳定的时间尺度控制。它是 Transformer 替代架构而非单纯推理 kernel。

#### 🧪 练习题

```yaml
question: "RetNet 推理时为什么不需要完整 KV cache？"
options:
  - "历史被压缩进固定大小 retention state"
  - "模型没有层"
  - "输入 token 被删除"
  - "只能生成一个词"
answer: 0
explain: "递推形式用衰减状态累计历史 K/V 外积，每步只更新固定大小状态。"
```
