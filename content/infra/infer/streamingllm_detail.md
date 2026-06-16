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

StreamingLLM 发现自回归 LLM 会把初始 token 当作 attention sink；推理时固定保留少量初始 sink tokens 加滚动最近窗口，即可让有限上下文训练的模型稳定处理无限长流式输入。

#### 🎯 核心要点

- 揭示 Window Attention 崩溃的直接触发点：滑窗移出初始 token 后困惑度急剧上升
- 定义 attention sink：语义上未必重要，但因 softmax 归一化而吸收大量冗余注意力的 token
- 解释 sink 为什么常出现在序列开头：初始 token 对几乎所有后续 token 可见，更容易在预训练中承担 sink 角色
- 推理 cache 拆成两部分：固定的 initial sink KV 和 rolling recent KV
- 通常保留 4 个初始 token 就能显著恢复窗口注意力质量，无需微调
- 对 RoPE/ALiBi 等相对位置编码，使用 cache 内连续位置而不是原文本绝对位置
- 训练未来模型时可加入 learnable sink token，让单个专用 token 承担注意力汇功能

#### 🔬 深入细节

![StreamingLLM 方法对比](https://arxiv.org/html/2309.17453v3/x1.png)
*图：论文 Figure 1，对比 Dense Attention、Window Attention、Sliding Window with Re-computation 与 StreamingLLM，图片来源为 arXiv HTML。*

![StreamingLLM Rolling KV Cache](https://arxiv.org/html/2309.17453v3/x4.png)
*图：论文 Figure 4，StreamingLLM 的 KV cache 由初始 attention sinks 和最近 rolling window 组成。*

```python
# StreamingLLM rolling KV cache with attention sinks
sink_budget = 4
window_budget = 1020

sink_kv = prefill_and_keep(first_tokens[:sink_budget])
rolling = KVWindow(maxlen=window_budget)

for token in incoming_stream:
    visible_kv = concat(sink_kv, rolling.kv)
    pos_ids = arange(len(visible_kv) + 1)  # positions inside cache, not original stream ids
    logits, new_kv = model.decode(token, kv_cache=visible_kv, position_ids=pos_ids)
    rolling.append(new_kv)
```

StreamingLLM 解决的是流式场景，而不是让模型“真正记住无限历史”。Dense attention 会让 KV cache 随文本长度增长，并且当文本长度超过预训练窗口后也会退化；普通 Window Attention 只保留最近 \(w\) 个 KV，内存固定，但论文发现当文本长度超过 cache size、初始 token 被滑出窗口后，Llama-2、MPT、Falcon、Pythia 等模型的困惑度会突然恶化。

关键原因是 attention sink。标准 attention 的 softmax 要把所有可见 token 的注意力归一到 1：

$$
\operatorname{SoftMax}(x)_i =
\frac{e^{x_i}}{e^{x_1}+\sum_{j=2}^{N}e^{x_j}},
\quad x_1 \gg x_j
$$

当当前 query 对历史 token 没有强语义匹配时，模型仍必须把“多余”的注意力质量分给某些位置。由于自回归训练中初始 token 对几乎所有后续 token 都可见，它们最容易被训练成稳定的注意力落点。论文的可视化显示，除底部少数层外，许多层和 head 都会把大量注意力分配给开头 token，即便这些 token 被替换为换行符也能恢复困惑度，说明 sink 的核心不是语义，而是位置和归一化结构。

StreamingLLM 的缓存集合可写成：

$$
C_t = \{0,1,\ldots,s-1\}\cup\{t-w+1,\ldots,t\}
$$

其中 \(s\) 是 sink token 数，论文默认 \(s=4\)，\(w\) 是 rolling window 大小。前半部分永不淘汰，用于稳定 attention distribution；后半部分随流式输入滑动，用于保留局部语言建模所需的最近上下文。这使 cache size 从 \(O(t)\) 变为常数 \(O(s+w)\)。

一个容易忽略但非常关键的实现细节是位置编码。StreamingLLM 对 cache 中 token 重新使用连续位置，而不是保留它们在原始长文本中的绝对下标。假设当前 cache 中有原始 token \([0,1,2,3,6,7,8]\)，正在解码第 9 个 token，模型应看到连续位置 \([0,1,2,3,4,5,6,7]\)，而不是带空洞的 \([0,1,2,3,6,7,8,9]\)。对 RoPE，论文建议缓存旋转前的 keys，并在每个解码阶段按 cache 内位置重新应用 rotary transformation；对 ALiBi，则使用连续线性 bias，避免距离跳变。

StreamingLLM 与滑窗重计算的差别也很重要。Sliding Window with Re-computation 会用最近窗口重新跑一遍上下文来获得一致 KV，因此质量好但复杂度高；StreamingLLM 不重算历史窗口，只保留 sink KV 和 rolling KV，推理路径接近普通 KV cache。论文报告它可在 4M tokens 级别保持稳定困惑度，并相对重计算 baseline 获得显著速度提升。

论文还讨论了面向未来模型的训练改造：在每个训练样本开头加入一个 learnable sink token，让模型把冗余注意力集中到专门位置。另一种思想是 SoftMax-off-by-One：

$$
\operatorname{SoftMax}_1(x)_i =
\frac{e^{x_i}}{1+\sum_{j=1}^{N}e^{x_j}}
$$

它等价于在 attention 中加入一个 key/value 全零的虚拟 sink，使注意力总和不必完全压到真实上下文 token 上。实验中 learnable sink token 比 zero sink 更稳定，说明显式训练一个专用 sink 位置可以减少对多个初始内容 token 的依赖。

与 H2O/Scissorhands 不同，StreamingLLM 不动态估计每个历史 token 的语义重要性；它使用固定规则保留开头和最近窗口。因此它的优势是简单、稳定、开销低，缺点也很清楚：中间被滑出的普通历史 token 不会被召回，模型并不获得真正的长程记忆。它适合流式续写、多轮长会话的稳定运行，但若任务要求精确检索很久以前的细节，还需要外部记忆、检索或更复杂的 KV 管理方法补充。

#### 🧪 练习题

```yaml
question: "StreamingLLM 中 attention sink 的主要作用是什么？"
options:
  - "作为稳定注意力归一化的落点，避免纯滑窗移除初始 token 后分布漂移"
  - "保存所有中间历史 token 的语义内容"
  - "把 RoPE 替换成绝对位置编码"
  - "让模型在训练时跳过 softmax"
answer: 0
explain: "attention sink 吸收冗余注意力质量；保留少量初始 sink KV 可以让窗口推理的注意力分布接近正常推理。"
```
