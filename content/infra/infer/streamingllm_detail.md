### StreamingLLM: 流式大模型 (StreamingLLM)

```yaml
id: streamingllm
name: StreamingLLM
full_name: 流式大模型 (StreamingLLM)
year: '2023'
org: MIT
paper_url: https://arxiv.org/abs/2309.17453
category: kv_cache
parent: —
motivation: 利用注意力汇实现无限长度流式推理
```

#### 📝 一句话总结

StreamingLLM 发现初始 token 会形成 attention sink；固定保留少量 sink token 加最近窗口，就能让有限上下文训练的 LLM 稳定进行无限长度流式推理。

#### 🎯 核心要点

- 揭示 attention sink：开头 token 会吸收大量注意力质量
- 缓存由初始 sink tokens 和 recent window 两部分组成
- 无需微调即可缓解滑动窗口推理困惑度崩溃
- 可通过训练时加入 sink token 进一步增强稳定性
- 将 cache 大小变为常数级，适合流式长输入

#### 🔬 深入细节

![StreamingLLM 核心示意图](https://ar5iv.labs.arxiv.org/html/2309.17453/assets/x1.png)
*图：StreamingLLM 展示的 attention sink 现象和保留 sink+窗口的推理策略。*

```python
sink_kv = prefill(first_k_tokens)
window = KVWindow(maxlen=recent_size)
for token in stream:
    kv = concat(sink_kv, window.kv)
    logits, new_kv = model.decode(token, kv_cache=kv)
    window.append(new_kv)
```

##### 动机与背景

普通滑窗会在窗口移动后丢失序列开头，导致注意力分布与训练时差异变大，长流式推理困惑度突然恶化。StreamingLLM 发现问题不只是语义信息缺失，还包括注意力归一化缺少稳定锚点。

##### 核心机制

attention sink 是初始少量 token 对后续所有位置可见后形成的稳定注意力落点。即便其语义不重要，它们也帮助 softmax 分配多余注意力质量。保留 sink 后，模型在滑窗下仍维持类似训练时的注意力结构。

##### 训练/推理流程

预填充保留最开始 \(k\) 个 token 的 KV；之后每步只维护这些 sink KV 和最近 \(w\) 个 token 的 KV。普通旧 token 会被丢弃，sink 永不滑出窗口。

##### 与传统方法的区别

与 H2O/Scissorhands 的动态重要性打分不同，StreamingLLM 是固定规则：\(C_t=\{1..k\}\cup\{t-w+1..t\}\)。它牺牲远距离普通语义记忆，但换来稳定、简单和常数 cache。

#### 🧪 练习题

```yaml
question: "StreamingLLM 保留 attention sink 的主要作用是什么？"
options:
  - "稳定注意力分布的锚点"
  - "替代所有历史语义"
  - "减少词表大小"
  - "训练新的草稿模型"
answer: 0
explain: "sink token 帮助维持模型熟悉的注意力归一化结构，避免纯滑窗分布漂移。"
```
