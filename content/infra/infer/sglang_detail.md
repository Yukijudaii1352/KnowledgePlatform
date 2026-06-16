### SGLang: 结构化语言引擎 (SGLang)

```yaml
id: sglang
name: SGLang
full_name: 结构化语言引擎 (SGLang)
year: '2023'
org: UC Berkeley
paper_url: https://arxiv.org/abs/2312.07104
category: engine
parent: vllm
motivation: RadixAttention实现前缀缓存自动复用
```

#### 📝 一句话总结

SGLang 提出了“前端结构化生成语言 + 后端高性能 runtime”的协同设计，用 RadixAttention 在 radix tree 中自动复用跨请求、跨调用的共享前缀 KV cache，解决复杂 LLM 程序重复 prefill 和手写并行/缓存逻辑的问题。

#### 🎯 核心要点

- 提供嵌入 Python 的 DSL，核心 primitive 包括 `extend`、`gen`、`select`、`fork`、`join`
- 将多轮对话、分支求解、树搜索、agent loop、RAG、few-shot 评测等复杂 LLM 应用表达为结构化程序
- Interpreter 把 prompt state 视作异步 stream，管理 intra-stream 与 inter-stream 依赖，并自动并行独立分支
- Compiler 可把 SGLang 程序追踪成计算图，进行 code movement、prefix prefetch 等面向前缀共享的优化
- 后端 SGVM/runtime 通过 RadixAttention 维护全局 radix tree，把请求完成后的 KV cache 保留下来供后续请求复用
- Cache-aware scheduling 按最长匹配前缀优先调度，提升 cache hit rate，减少 cache thrashing
- RadixAttention 与 continuous batching、paged attention 兼容，并可扩展到多模态输入的 hash-key 缓存

#### 🔬 深入细节

![SGLang 系统总览图](https://ar5iv.labs.arxiv.org/html/2312.07104/assets/x3.png)
*图：SGLang 论文 Figure 3，展示语言前端、interpreter/compiler 与后端 SGVM runtime 的整体关系。来源：arXiv HTML 论文。*

![RadixAttention 维护 radix tree 示例](https://ar5iv.labs.arxiv.org/html/2312.07104/assets/x6.png)
*图：SGLang 论文 Figure 6，展示 RadixAttention 在多次请求到来时如何拆分节点、插入节点并按 LRU 策略维护 KV cache。来源：arXiv HTML 论文。*

```python
# Cache-aware scheduling for RadixAttention
waiting = runtime.pending_requests()

for req in waiting:
    node, prefix_len = radix_tree.match_prefix(req.input_tokens)
    req.prefix_node = node
    req.prefix_len = prefix_len

waiting.sort(key=lambda r: r.prefix_len, reverse=True)
batch = []
token_budget = max_num_tokens

for req in waiting:
    suffix_len = len(req.input_tokens) - req.prefix_len
    if len(batch) < max_batch_size and suffix_len <= token_budget:
        radix_tree.pin(req.prefix_node)
        batch.append(req)
        token_budget -= max(1, suffix_len)

for req in batch:
    prefix_kv = radix_tree.load_kv(req.prefix_node)
    suffix = req.input_tokens[req.prefix_len:]
    suffix_kv, first_logits = model.prefill_suffix(prefix_kv, suffix)
    radix_tree.insert(req.input_tokens, concat(prefix_kv, suffix_kv))
    decode_and_stream(req, first_logits)
    radix_tree.unpin(req.prefix_node)
```

SGLang 的出发点是：真实 LLM 应用经常不是“一条 prompt 进、一段文本出”，而是由多个 generation call、控制流、工具调用和共享上下文组成的程序。例如 self-consistency 会从同一个问题并行采样多个解，tree-of-thought 会在树上展开和回溯，多轮 agent 会反复把 thought/action/observation 追加到历史中。传统 OpenAI-like API 或单请求 serving engine 很难看见这些结构，因此会重复计算大量相同前缀。

论文把 LLM 程序的结构信息放到语言层表达。`fork` 复制当前 prompt state 形成多条并行 stream，`join` 合并分支，`gen` 和 `select` 负责生成或受限选择。Interpreter 在 Python 程序执行时维护 prompt stream 的依赖：同一 stream 中后续操作必须等待前序操作，不同 stream 只有在读取彼此变量时才同步。这让“并行分支”成为语言语义的一部分，而不是用户额外维护线程池、future、缓存 key 和结果拼接。

RadixAttention 的关键观察来自 KV cache 的前缀性质。对任意 token 序列 \(x_{1:t}\)，第 \(l\) 层 cache 可记作：

$$
\mathrm{KV}_l(x_{1:t}) = \left(K_l(x_{1:t}), V_l(x_{1:t})\right)
$$

如果一个新请求 \(x\) 可以拆成共享前缀 \(p\) 和私有后缀 \(s\)，即 \(x=p\circ s\)，那么推理时只需要复用 \(\mathrm{KV}(p)\) 并计算后缀：

$$
\mathrm{KV}(p\circ s)=\mathrm{concat}\left(\mathrm{KV}(p),\mathrm{ForwardKV}_{\theta}(s\mid p)\right)
$$

这里的节省不只是少算 \(|p|\) 个 token 的线性投影；在 prefill attention 中，后缀 token 对前缀 token 做注意力，但前缀 token 之间的 key/value 已经存在，避免了大段共享上下文反复前向。

radix tree 是比普通 trie 更紧凑的前缀索引：每条边可以存一段 token，而不是单个 token。SGLang runtime 收到完整 prompt 后，在树中做 longest-prefix match，找到可复用的最大前缀节点；若新请求和已有路径只共享部分 token，则拆分边并插入新节点；请求完成后，prompt 与生成结果对应的 KV 也被保留在树中。树节点携带 KV block 引用、引用计数和 LRU 信息，因此正在被 batch 使用的前缀不会被驱逐，空闲节点则可按 LRU 回收。

Cache-aware scheduling 处理的是“有缓存但调度顺序破坏局部性”的问题。若大量请求同时到来，FCFS 可能在多个不相关前缀之间来回切换，导致刚插入的 cache 被挤出。SGLang 的 Algorithm 1 先对等待队列中的每个请求计算匹配前缀长度，再优先调度匹配更长的请求。可把调度目标近似理解为最大化本批次节省的 prefill token：

$$
\max_{B}\sum_{r\in B}\mathrm{prefix\_len}(r)
\quad \text{s.t.}\quad
|B|\le B_{\max},\ \sum_{r\in B}\mathrm{new\_tokens}(r)\le T_{\max}
$$

论文还指出 interpreter 可以给调度器额外提示：例如 `fork` 产生多个高概率共享同一前缀的分支，runtime 可以先把共享前缀 forward 并插入树，再发送能复用该前缀的分支请求。

Compiler 优化进一步把语言结构转成执行图。Code movement 会尝试把常量 prompt 片段前移，增加可共享前缀长度；prefetch annotation 则在图中插入提示，让 runtime 在真正需要长前缀前把 CPU 侧 cache 换入 GPU。论文报告在 4k 前缀函数调用中，prefetch 可把 first-token latency 从约 1 秒降到 0.2 秒，说明 SGLang 的优化不局限于单个 serving loop，而是让“程序图”和“KV 生命周期”协同。

与 vLLM 的关系可以理解为继承并扩展。vLLM 解决了 paged attention 和通用 batching 的显存/吞吐问题，但 API 层仍主要面对独立请求；SGLang 则让应用结构进入 runtime，使多次调用、分支、循环、共享系统 prompt、共享检索上下文都能被缓存系统自动发现。与 LMQL/Guidance 相比，SGLang 不只提供更方便的 prompt 语言，还把并行、batching、RadixAttention、调度和编译优化作为系统设计的一部分。

> 💡 关键：RadixAttention 不是新的 Transformer attention 公式，而是“KV cache 的前缀索引和调度机制”。它复用的是已经算好的 \(K,V\)，因此主要降低 prefill 计算和显存重复占用。

#### 🧪 练习题

```yaml
question: "SGLang 中 RadixAttention 使用 radix tree 的主要原因是什么？"
options:
  - "压缩并索引共享 token 前缀，从而自动复用对应 KV cache"
  - "替代 softmax attention，使模型训练更稳定"
  - "把所有请求强制转换为固定长度 batch"
  - "只用于存储最终生成文本，不参与推理调度"
answer: 0
explain: "RadixAttention 在 radix tree 中做最长前缀匹配，命中后复用该前缀的 KV cache，只对后缀做新的 prefill。"
```
