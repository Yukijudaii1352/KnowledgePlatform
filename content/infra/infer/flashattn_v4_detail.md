### FlashAttention-4: 闪电注意力4代 (FlashAttention-4)

```yaml
id: flashattn_v4
name: FlashAttention-4
full_name: 闪电注意力4代 (FlashAttention-4)
year: '2026.03'
org: Tri Dao
paper_url: https://arxiv.org/abs/2603.05451
category: attention
parent: flashattn_v3
motivation: 算法与内核协同设计适配Blackwell
```

#### 📝 一句话总结

FlashAttention-4 针对 Blackwell 架构协同设计 attention 算法和 kernel，利用新一代 Tensor Core、异步数据路径和更细粒度流水进一步提高 exact attention 吞吐。

#### 🎯 核心要点

- 面向 NVIDIA Blackwell GPU 的 attention kernel 设计
- 重新组织 forward/backward 的 tile、CTA 和 warp-group 协作
- 更充分重叠数据搬运、softmax 与矩阵乘
- 延续 FlashAttention 的 exact attention 和 IO-aware 思想
- 展示算法设计必须随硬件代际共同演进

#### 🔬 深入细节

![FlashAttention-4 核心示意图](https://ar5iv.labs.arxiv.org/html/2603.05451/assets/Figures/FA4_FWD_p3.png)
*图：FlashAttention-4 前向流水图，展示 Blackwell 上的 tile 和 pipeline 组织。*

```python
# FlashAttention-4 high-level pipeline
for q_tile in q_tiles:
    prefetch_next_kv_tiles_async()
    for kv_tile in schedule(q_tile):
        tc_acc = blackwell_mma(q_tile, kv_tile.K)
        softmax_state.update(tc_acc)
        output_acc += softmax_state.prob @ kv_tile.V
    store(output_acc)
```

##### 动机与背景

Blackwell 相比 Hopper 继续改变矩阵乘、内存层级和异步执行能力。旧 FA-3 kernel 即使可运行，也未必匹配新硬件的最佳 tile 粒度、CTA 协作和流水深度。

##### 核心机制

FA-4 将 attention 拆成更适合 Blackwell 的计算/搬运阶段，重新选择 tile shape、CTA 分工和数据驻留策略。核心仍是 online softmax 和不物化 attention matrix，但实现围绕新硬件原语展开。

##### 训练/推理流程

前向按 query tile 调度，异步预取 K/V tile；矩阵乘、softmax 更新和输出累积在多阶段 pipeline 中交叠。反向同样重构数据流以减少 HBM 访问和同步开销。

##### 与传统方法的区别

FA-4 与 FA-3 的关系类似 FA-3 与 FA-2：数学目标一致，但硬件映射不同。它强调 attention 性能优化不是一次性算法，而是随 GPU 架构迭代的协同设计。

#### 🧪 练习题

```yaml
question: "FlashAttention-4 的主要适配对象是什么？"
options:
  - "NVIDIA Blackwell 架构"
  - "纯 CPU 单线程"
  - "机械键盘输入"
  - "传统硬盘缓存"
answer: 0
explain: "FA-4 面向 Blackwell 的新硬件原语重新设计 exact attention kernel。"
```
