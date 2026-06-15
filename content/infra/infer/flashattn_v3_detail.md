### FlashAttention-3: 闪电注意力3代 (FlashAttention-3)

```yaml
id: flashattn_v3
name: FlashAttention-3
full_name: 闪电注意力3代 (FlashAttention-3)
year: '2024'
org: Stanford
paper_url: https://arxiv.org/abs/2407.08691
category: attention
parent: flashattn_v2
motivation: 针对Hopper架构实现异步计算重叠
```

#### 📝 一句话总结

FlashAttention-3 针对 NVIDIA Hopper 架构重新设计 attention kernel，利用 WGMMA、TMA 和异步流水重叠矩阵乘与数据搬运，并支持 FP8 低精度路径。

#### 🎯 核心要点

- 面向 Hopper H100 的 WGMMA warp-group matrix multiply
- 使用 TMA 异步搬运 global memory 与 shared memory 数据
- producer/consumer warp-group 流水重叠 load、matmul、softmax
- 支持 FP8 attention 以进一步提升吞吐
- 保持 FlashAttention exact attention 的 IO-aware 核心思想

#### 🔬 深入细节

![FlashAttention-3 核心示意图](https://arxiv.org/html/extracted/5725922/figs/pipeline_alt.png)
*图：FlashAttention-3 在 Hopper 上的异步流水设计，重叠 TMA 搬运和 WGMMA 计算。*

```python
# FA-3 Hopper pipeline sketch
for tile in tiles:
    producer_warpgroup.tma_load_async(KV_tile_next)
    consumer_warpgroup.wgmma(Q_tile, KV_tile_current)
    consumer_warpgroup.update_softmax_and_O()
    pipeline.advance()
```

##### 动机与背景

Hopper GPU 引入 WGMMA 和 TMA 后，旧 kernel 不能自动吃满新硬件能力。attention 还包含 softmax 等非 GEMM 操作，如果调度不好，矩阵乘、数据搬运和 softmax 会相互等待。

##### 核心机制

FA-3 使用 warp-group 级分工：producer 负责 TMA 异步加载，consumer 负责 WGMMA 和 softmax 更新。通过多阶段 pipeline，当前 tile 计算时预取下一 tile，减少等待。FP8 路径进一步降低带宽和提升 Tensor Core 吞吐。

##### 训练/推理流程

kernel 初始化多级 buffer；每个阶段触发下一块 K/V 的 TMA load，同时对当前块执行 WGMMA；softmax 统计在线更新。反向也围绕 Hopper 特性优化流水和并行度。

##### 与传统方法的区别

FA-2 是通用并行策略优化，FA-3 是特定硬件代际的算法-内核协同设计。它说明 exact attention 的瓶颈会随 GPU 架构变化，需要重新映射到新硬件原语。

#### 🧪 练习题

```yaml
question: "FlashAttention-3 主要针对哪类硬件特性优化？"
options:
  - "Hopper 的 WGMMA/TMA 异步能力"
  - "机械硬盘寻道"
  - "CPU 分支预测"
  - "网络路由协议"
answer: 0
explain: "FA-3 通过 TMA 加载和 WGMMA 计算流水化来适配 Hopper GPU。"
```
