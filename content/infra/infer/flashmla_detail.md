### FlashMLA: 闪电MLA内核 (FlashMLA)

```yaml
id: flashmla
name: FlashMLA
full_name: 闪电MLA内核 (FlashMLA)
year: '2025.02'
org: DeepSeek
paper_url: https://github.com/deepseek-ai/FlashMLA
category: attention
parent: mla
motivation: 针对Hopper优化的MLA高效解码内核
```

#### 📝 一句话总结

FlashMLA 是 DeepSeek 面向 MLA 解码的高效 Hopper kernel，把 MLA 的 latent KV 布局、分页/变长 cache 和高吞吐 attention 结合起来，支撑 DeepSeek 系列低成本长上下文推理。

#### 🎯 核心要点

- 针对 Multi-Head Latent Attention 的 compressed KV cache 设计 decode kernel
- 面向 Hopper GPU 优化，利用高效 tile 调度和内存访问
- 支持变长序列、paged KV cache 与 batch decode 场景
- 将 latent KV 的上投影/访问方式与 attention 计算融合
- 官方开源仓库作为 DeepSeek 推理内核组件维护

#### 🔬 深入细节

![FlashMLA 核心示意图](https://opengraph.githubassets.com/1/deepseek-ai/FlashMLA)
*图：DeepSeek FlashMLA 官方 GitHub 仓库预览；仓库 README 未提供单一论文框架图，核心流程在下方伪代码说明。*

```python
# FlashMLA decode kernel sketch
for request in batch:
    q = load_query(request)
    for block in paged_latent_kv_blocks(request):
        c_kv, k_rope = load_latent_block(block)
        k_nope, v = fused_up_project(c_kv)
        score = dot(q, concat(k_nope, k_rope))
        update_online_softmax(score, v)
    write_output(request)
```

##### 动机与背景

MLA 降低了 KV cache 体积，但也带来新的 kernel 问题：attention 读取的是 latent KV，需要上投影或等效变换；服务端还需要处理变长请求、paged cache 和小 batch decode。通用 FlashAttention kernel 不能直接吃满这一结构优势。

##### 核心机制

FlashMLA 围绕 compressed latent cache 设计数据布局和 tile 计算，将 latent 读取、必要的投影/组合、softmax 和 value 聚合尽量融合。Hopper 上通过合适的 block 调度减少访存和同步。

##### 训练/推理流程

推理引擎为每个请求维护 paged latent KV blocks；decode kernel 按 block 读取 latent 和 RoPE 部分，计算当前 query 对历史块的注意力，在线合并 softmax 并输出。

##### 与传统方法的区别

FlashAttention 优化标准 MHA/GQA attention，FlashMLA 优化 MLA 这一特殊注意力结构。算法价值在于把模型结构节省的 cache 真正转化为端到端 decode 吞吐。

#### 🧪 练习题

```yaml
question: "FlashMLA 主要服务哪种注意力结构？"
options:
  - "Multi-Head Latent Attention"
  - "卷积神经网络池化层"
  - "RNN 隐状态复制"
  - "图数据库索引"
answer: 0
explain: "FlashMLA 是 DeepSeek 针对 MLA latent KV 解码开源的高效 attention kernel。"
```
