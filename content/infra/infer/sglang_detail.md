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

SGLang 将结构化生成语言前端与高性能 serving 后端结合，核心系统特性 RadixAttention 自动复用共享前缀 KV cache，显著提升多轮、树状和程序化 LLM 工作流效率。

#### 🎯 核心要点

- 提供 Python DSL 表达多轮对话、分支、约束解码和工具调用
- RadixAttention 用 radix tree 管理和复用共享 prefix KV cache
- 后端支持 continuous batching、paged memory 和张量并行
- 面向 agent、RAG、评测和复杂 prompt 程序
- 将应用层结构信息传递给推理系统优化执行

#### 🔬 深入细节

![SGLang 核心示意图](https://ar5iv.labs.arxiv.org/html/2312.07104/assets/x1.png)
*图：SGLang 论文图，展示前端结构化语言与后端 Runtime/RadixAttention。*

```python
# SGLang RadixAttention sketch
program = build_prompt_program()
for request in program.requests():
    prefix_node = radix_tree.match_longest_prefix(request.tokens)
    reuse_kv(prefix_node.kv_cache)
    new_tokens = model.prefill_suffix(request.tokens[prefix_node.len:])
    radix_tree.insert(request.tokens, new_tokens.kv)
    decode(request)
```

##### 动机与背景

许多 LLM 应用不是单条独立 prompt，而是共享系统提示、检索上下文、多分支候选和多轮状态。普通 serving 引擎看不到这些结构，容易重复计算相同 prefix。

##### 核心机制

SGLang 前端让用户显式表达生成程序；后端 RadixAttention 把历史请求 token 存在 radix tree 中，最长前缀匹配后直接复用已有 KV cache，只计算 suffix。

##### 训练/推理流程

程序运行时提交结构化请求；runtime 查询 radix tree 找共享前缀，加载对应 KV，执行剩余 prefill 和 decode；新产生的 KV 再插入树中，供后续请求复用。

##### 与传统方法的区别

vLLM 主要优化通用请求调度和分页 KV，SGLang 更强调应用结构和前缀复用。它把“prompt 程序”与“serving runtime”打通，是前端语言和后端引擎的组合。

#### 🧪 练习题

```yaml
question: "SGLang 的 RadixAttention 主要复用什么？"
options:
  - "共享前缀的 KV cache"
  - "GPU 风扇"
  - "训练标签"
  - "文件名后缀"
answer: 0
explain: "RadixAttention 用 radix tree 匹配最长前缀，避免重复 prefill。"
```
