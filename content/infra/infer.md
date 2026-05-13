---
domain: infra
topic_id: infer
topic_name: 推理加速
page_icon: ⚡
page_title: 推理加速算法总结
page_subtitle: 2026-05-12 版
page_desc: 回顾从FlashAttention到PagedAttention，以及投机解码、KV Cache优化、推理引擎的演进历程，涵盖2026年最新的Blackwell架构适配与分布式推理突破。
hero_pills:
- "\U0001F3F7️ KV Cache · 投机解码 · 推理引擎"
count_pill: 52 个算法
categories:
  kv_cache:
    label: KV Cache优化
    color: '#22a06b'
  spec_decode:
    label: 投机解码
    color: '#e56910'
  attention:
    label: 注意力优化
    color: '#0065ff'
  engine:
    label: 推理引擎与系统
    color: '#8270db'
  quantize:
    label: 模型压缩与量化
    color: '#e34935'
  linear_attn:
    label: 线性/高效架构
    color: '#1d7f8c'
---

## 领域综述

### 待定
待定。

## 算法演化关系

```yaml
nodes:
- id: mqa
  x: 50
  y: 80
  category: kv_cache
- id: pagedattn
  x: 350
  y: 50
  category: kv_cache
- id: gqa
  x: 350
  y: 100
  category: kv_cache
- id: h2o
  x: 350
  y: 150
  category: kv_cache
- id: scissorhands
  x: 350
  y: 200
  category: kv_cache
- id: streamingllm
  x: 380
  y: 75
  category: kv_cache
- id: cachegen
  x: 380
  y: 125
  category: kv_cache
- id: kivi
  x: 500
  y: 80
  category: kv_cache
- id: gear
  x: 500
  y: 140
  category: kv_cache
- id: turboquant
  x: 750
  y: 60
  category: kv_cache
- id: bitdecoding
  x: 750
  y: 110
  category: kv_cache
- id: chunkkv
  x: 750
  y: 160
  category: kv_cache
- id: spec_leviathan
  x: 350
  y: 240
  category: spec_decode
- id: spec_chen
  x: 350
  y: 290
  category: spec_decode
- id: medusa
  x: 500
  y: 220
  category: spec_decode
- id: eagle
  x: 500
  y: 270
  category: spec_decode
- id: lookahead
  x: 500
  y: 320
  category: spec_decode
- id: eagle_v2
  x: 500
  y: 370
  category: spec_decode
- id: eagle_v3
  x: 620
  y: 250
  category: spec_decode
- id: p_eagle
  x: 750
  y: 230
  category: spec_decode
- id: ssd
  x: 750
  y: 290
  category: spec_decode
- id: flashattn
  x: 200
  y: 420
  category: attention
- id: flashattn_v2
  x: 350
  y: 400
  category: attention
- id: flash_decoding
  x: 350
  y: 450
  category: attention
- id: ring_attn
  x: 350
  y: 500
  category: attention
- id: striped_attn
  x: 350
  y: 540
  category: attention
- id: mla
  x: 500
  y: 420
  category: attention
- id: flashattn_v3
  x: 500
  y: 460
  category: attention
- id: nsa
  x: 620
  y: 390
  category: attention
- id: flashmla
  x: 620
  y: 440
  category: attention
- id: flashattn_v4
  x: 750
  y: 380
  category: attention
- id: dsa
  x: 750
  y: 430
  category: attention
- id: hisa
  x: 750
  y: 480
  category: attention
- id: orca
  x: 200
  y: 580
  category: engine
- id: deepspeed_infer
  x: 200
  y: 630
  category: engine
- id: vllm
  x: 350
  y: 590
  category: engine
- id: sglang
  x: 350
  y: 640
  category: engine
- id: trt_llm
  x: 500
  y: 570
  category: engine
- id: flashinfer
  x: 750
  y: 560
  category: engine
- id: dynamo
  x: 750
  y: 610
  category: engine
- id: vllm_v1
  x: 750
  y: 660
  category: engine
- id: sglang_v05
  x: 750
  y: 710
  category: engine
- id: gptq
  x: 200
  y: 750
  category: quantize
- id: smoothquant
  x: 200
  y: 800
  category: quantize
- id: sparsegpt
  x: 350
  y: 740
  category: quantize
- id: awq
  x: 350
  y: 790
  category: quantize
- id: wanda
  x: 350
  y: 840
  category: quantize
- id: bitnet_b158
  x: 500
  y: 760
  category: quantize
- id: nvfp4
  x: 750
  y: 750
  category: quantize
- id: mc_sharp
  x: 750
  y: 810
  category: quantize
- id: retnet
  x: 350
  y: 920
  category: linear_attn
- id: mamba
  x: 350
  y: 980
  category: linear_attn
edges:
- from: mqa
  to: gqa
  label: 分组折中
- from: flashattn
  to: flashattn_v2
  label: 优化并行
- from: flashattn_v2
  to: flash_decoding
  label: 序列维并行
- from: flashattn_v2
  to: flashattn_v3
  label: Hopper异步
- from: flashattn
  to: ring_attn
  label: 分布式扩展
- from: ring_attn
  to: striped_attn
  label: 负载均衡
- from: gqa
  to: mla
  label: 低秩压缩
- from: mla
  to: flashmla
  label: 内核优化
- from: spec_leviathan
  to: medusa
  label: 无草稿模型
- from: spec_leviathan
  to: eagle
  label: 特征投机
- from: eagle
  to: eagle_v2
  label: 动态树
- from: pagedattn
  to: vllm
  label: 引擎集成
- from: vllm
  to: sglang
  label: 前缀缓存
- from: gptq
  to: sparsegpt
  label: 结构剪枝
- from: smoothquant
  to: awq
  label: 通道保护
- from: flashattn_v2
  to: nsa
  label: 稀疏化演进
- from: kivi
  to: turboquant
  label: 向量量化
- from: kivi
  to: bitdecoding
  label: 硬件加速
- from: h2o
  to: chunkkv
  label: 语义感知
- from: eagle_v2
  to: eagle_v3
  label: 预测范式
- from: eagle_v3
  to: p_eagle
  label: 并行化
- from: spec_leviathan
  to: ssd
  label: 异步化
- from: flashattn_v3
  to: flashattn_v4
  label: 架构适配
- from: nsa
  to: dsa
  label: 工业级压缩
- from: nsa
  to: hisa
  label: 索引精细化
- from: trt_llm
  to: dynamo
  label: 分布式解耦
- from: flashattn
  to: flashinfer
  label: 内核生成
- from: vllm
  to: vllm_v1
  label: 调度架构
- from: sglang
  to: sglang_v05
  label: 通信优化
- from: smoothquant
  to: nvfp4
  label: 硬件原生
- from: gptq
  to: bitnet_b158
  label: 极低比特
- from: awq
  to: mc_sharp
  label: MoE压缩
milestones:
- flashattn
- vllm
- flashattn_v4
```

## 核心算法

### MQA

```yaml
id: mqa
num: 1
name: MQA
full_name: 多查询注意力 (Multi-Query Attention)
year: '2019'
org: Google
parent: —
paper_url: https://arxiv.org/abs/1911.02150
project_url: ''
category: kv_cache
motivation: 共享Key/Value头减少带宽压力
```

#### 📝 一句话总结
MQA 的核心目标是：共享Key/Value头减少带宽压力。

#### 🎯 核心要点
- 核心动机：共享Key/Value头减少带宽压力
- 代表机构：Google

#### 🔬 深入细节
共享Key/Value头减少带宽压力


### GQA

```yaml
id: gqa
num: 2
name: GQA
full_name: 分组查询注意力 (Grouped-Query Attention)
year: '2023'
org: Google
parent: mqa
paper_url: https://aclanthology.org/2023.emnlp-main.298/
project_url: ''
category: kv_cache
motivation: MHA与MQA的折中兼顾速度与精度
```

#### 📝 一句话总结
GQA 的核心目标是：MHA与MQA的折中兼顾速度与精度。

#### 🎯 核心要点
- 核心动机：MHA与MQA的折中兼顾速度与精度
- 演化来源：继承或改进自 mqa
- 代表机构：Google

#### 🔬 深入细节
MHA与MQA的折中兼顾速度与精度


### PagedAttention

```yaml
id: pagedattn
num: 3
name: PagedAttention
full_name: 分页注意力 (PagedAttention)
year: '2023'
org: UC Berkeley
parent: —
paper_url: https://arxiv.org/abs/2309.06180
project_url: ''
category: kv_cache
motivation: 引入虚拟内存分页解决显存碎片化
```

#### 📝 一句话总结
PagedAttention 的核心目标是：引入虚拟内存分页解决显存碎片化。

#### 🎯 核心要点
- 核心动机：引入虚拟内存分页解决显存碎片化
- 代表机构：UC Berkeley

#### 🔬 深入细节
引入虚拟内存分页解决显存碎片化


### H2O

```yaml
id: h2o
num: 4
name: H2O
full_name: 重击者预言机 (Heavy-Hitter Oracle)
year: '2023'
org: Texas A&M
parent: —
paper_url: https://arxiv.org/abs/2306.14048
project_url: ''
category: kv_cache
motivation: 动态保留高权重标记剔除冗余缓存
```

#### 📝 一句话总结
H2O 的核心目标是：动态保留高权重标记剔除冗余缓存。

#### 🎯 核心要点
- 核心动机：动态保留高权重标记剔除冗余缓存
- 代表机构：Texas A&M

#### 🔬 深入细节
动态保留高权重标记剔除冗余缓存


### Scissorhands

```yaml
id: scissorhands
num: 5
name: Scissorhands
full_name: 剪刀手 (Scissorhands)
year: '2023'
org: Rice Univ
parent: —
paper_url: https://arxiv.org/abs/2305.17118
project_url: ''
category: kv_cache
motivation: 基于重要性持久化假设压缩缓存
```

#### 📝 一句话总结
Scissorhands 的核心目标是：基于重要性持久化假设压缩缓存。

#### 🎯 核心要点
- 核心动机：基于重要性持久化假设压缩缓存
- 代表机构：Rice Univ

#### 🔬 深入细节
基于重要性持久化假设压缩缓存


### StreamingLLM

```yaml
id: streamingllm
num: 6
name: StreamingLLM
full_name: 流式大模型 (StreamingLLM)
year: '2023'
org: MIT
parent: —
paper_url: https://arxiv.org/abs/2309.17453
project_url: ''
category: kv_cache
motivation: 利用注意力汇实现无限长度流式推理
```

#### 📝 一句话总结
StreamingLLM 的核心目标是：利用注意力汇实现无限长度流式推理。

#### 🎯 核心要点
- 核心动机：利用注意力汇实现无限长度流式推理
- 代表机构：MIT

#### 🔬 深入细节
利用注意力汇实现无限长度流式推理


### KIVI

```yaml
id: kivi
num: 7
name: KIVI
full_name: KIVI量化 (KIVI)
year: '2024'
org: Rice Univ
parent: —
paper_url: https://arxiv.org/abs/2402.02750
project_url: ''
category: kv_cache
motivation: 无需微调的非对称2-bit缓存量化
```

#### 📝 一句话总结
KIVI 的核心目标是：无需微调的非对称2-bit缓存量化。

#### 🎯 核心要点
- 核心动机：无需微调的非对称2-bit缓存量化
- 代表机构：Rice Univ

#### 🔬 深入细节
无需微调的非对称2-bit缓存量化


### GEAR

```yaml
id: gear
num: 8
name: GEAR
full_name: GEAR压缩框架 (GEAR)
year: '2024'
org: Georgia Tech
parent: —
paper_url: https://arxiv.org/abs/2403.05527
project_url: ''
category: kv_cache
motivation: 结合量化与误差补偿的高倍率压缩
```

#### 📝 一句话总结
GEAR 的核心目标是：结合量化与误差补偿的高倍率压缩。

#### 🎯 核心要点
- 核心动机：结合量化与误差补偿的高倍率压缩
- 代表机构：Georgia Tech

#### 🔬 深入细节
结合量化与误差补偿的高倍率压缩


### CacheGen

```yaml
id: cachegen
num: 9
name: CacheGen
full_name: 缓存生成 (CacheGen)
year: '2023'
org: Univ of Chicago
parent: —
paper_url: https://arxiv.org/abs/2310.07240
project_url: ''
category: kv_cache
motivation: 通过流式传输与张量编码降低TTFT
```

#### 📝 一句话总结
CacheGen 的核心目标是：通过流式传输与张量编码降低TTFT。

#### 🎯 核心要点
- 核心动机：通过流式传输与张量编码降低TTFT
- 代表机构：Univ of Chicago

#### 🔬 深入细节
通过流式传输与张量编码降低TTFT


### TurboQuant

```yaml
id: turboquant
num: 10
name: TurboQuant
full_name: 涡轮量化 (TurboQuant)
year: '2026'
org: Google Research
parent: kivi
paper_url: https://arxiv.org/abs/2501.06425
project_url: ''
category: kv_cache
motivation: PolarQuant+QJL实现3-bit KV压缩
```

#### 📝 一句话总结
TurboQuant 的核心目标是：PolarQuant+QJL实现3-bit KV压缩。

#### 🎯 核心要点
- 核心动机：PolarQuant+QJL实现3-bit KV压缩
- 演化来源：继承或改进自 kivi
- 代表机构：Google Research

#### 🔬 深入细节
PolarQuant+QJL实现3-bit KV压缩


### BitDecoding

```yaml
id: bitdecoding
num: 11
name: BitDecoding
full_name: 比特解码 (BitDecoding)
year: '2026'
org: 爱丁堡大学/微软
parent: kivi
paper_url: https://arxiv.org/abs/2503.18773
project_url: ''
category: kv_cache
motivation: 解锁Tensor Core处理低比特KV解码
```

#### 📝 一句话总结
BitDecoding 的核心目标是：解锁Tensor Core处理低比特KV解码。

#### 🎯 核心要点
- 核心动机：解锁Tensor Core处理低比特KV解码
- 演化来源：继承或改进自 kivi
- 代表机构：爱丁堡大学/微软

#### 🔬 深入细节
解锁Tensor Core处理低比特KV解码


### ChunkKV

```yaml
id: chunkkv
num: 12
name: ChunkKV
full_name: 语义分块缓存 (ChunkKV)
year: '2026'
org: X Liu等
parent: h2o
paper_url: https://arxiv.org/abs/2603.20397
project_url: ''
category: kv_cache
motivation: 保留Token间语义关系的KV压缩
```

#### 📝 一句话总结
ChunkKV 的核心目标是：保留Token间语义关系的KV压缩。

#### 🎯 核心要点
- 核心动机：保留Token间语义关系的KV压缩
- 演化来源：继承或改进自 h2o
- 代表机构：X Liu等

#### 🔬 深入细节
保留Token间语义关系的KV压缩


### Speculative Decoding

```yaml
id: spec_leviathan
num: 13
name: Speculative Decoding
full_name: 经典投机解码 (Speculative Decoding)
year: '2023'
org: Google
parent: —
paper_url: https://arxiv.org/abs/2211.17192
project_url: ''
category: spec_decode
motivation: 草稿-验证范式实现无损推理加速
```

#### 📝 一句话总结
Speculative Decoding 的核心目标是：草稿-验证范式实现无损推理加速。

#### 🎯 核心要点
- 核心动机：草稿-验证范式实现无损推理加速
- 代表机构：Google

#### 🔬 深入细节
草稿-验证范式实现无损推理加速


### Speculative Sampling

```yaml
id: spec_chen
num: 14
name: Speculative Sampling
full_name: 投机采样 (Speculative Sampling)
year: '2023'
org: DeepMind
parent: —
paper_url: https://arxiv.org/abs/2302.01318
project_url: ''
category: spec_decode
motivation: 严谨数学证明的拒绝采样加速方案
```

#### 📝 一句话总结
Speculative Sampling 的核心目标是：严谨数学证明的拒绝采样加速方案。

#### 🎯 核心要点
- 核心动机：严谨数学证明的拒绝采样加速方案
- 代表机构：DeepMind

#### 🔬 深入细节
严谨数学证明的拒绝采样加速方案


### Medusa

```yaml
id: medusa
num: 15
name: Medusa
full_name: 美杜莎 (Medusa)
year: '2024'
org: Together AI
parent: spec_leviathan
paper_url: https://arxiv.org/abs/2401.10774
project_url: ''
category: spec_decode
motivation: 增加并行解码头消除草稿模型依赖
```

#### 📝 一句话总结
Medusa 的核心目标是：增加并行解码头消除草稿模型依赖。

#### 🎯 核心要点
- 核心动机：增加并行解码头消除草稿模型依赖
- 演化来源：继承或改进自 spec_leviathan
- 代表机构：Together AI

#### 🔬 深入细节
增加并行解码头消除草稿模型依赖


### EAGLE

```yaml
id: eagle
num: 16
name: EAGLE
full_name: 鹰 (EAGLE)
year: '2024'
org: PKU
parent: spec_leviathan
paper_url: https://arxiv.org/abs/2401.15077
project_url: ''
category: spec_decode
motivation: 在特征空间投机解决标记预测不确定性
```

#### 📝 一句话总结
EAGLE 的核心目标是：在特征空间投机解决标记预测不确定性。

#### 🎯 核心要点
- 核心动机：在特征空间投机解决标记预测不确定性
- 演化来源：继承或改进自 spec_leviathan
- 代表机构：PKU

#### 🔬 深入细节
在特征空间投机解决标记预测不确定性


### EAGLE-2

```yaml
id: eagle_v2
num: 17
name: EAGLE-2
full_name: 鹰2代 (EAGLE-2)
year: '2024'
org: PKU
parent: eagle
paper_url: https://aclanthology.org/2024.emnlp-main.422/
project_url: ''
category: spec_decode
motivation: 引入动态草稿树根据置信度调整路径
```

#### 📝 一句话总结
EAGLE-2 的核心目标是：引入动态草稿树根据置信度调整路径。

#### 🎯 核心要点
- 核心动机：引入动态草稿树根据置信度调整路径
- 演化来源：继承或改进自 eagle
- 代表机构：PKU

#### 🔬 深入细节
引入动态草稿树根据置信度调整路径


### Lookahead Decoding

```yaml
id: lookahead
num: 18
name: Lookahead Decoding
full_name: 展望解码 (Lookahead Decoding)
year: '2024'
org: Stanford
parent: —
paper_url: https://arxiv.org/abs/2402.02057
project_url: ''
category: spec_decode
motivation: 基于Jacobi迭代的并行解码无需微调
```

#### 📝 一句话总结
Lookahead Decoding 的核心目标是：基于Jacobi迭代的并行解码无需微调。

#### 🎯 核心要点
- 核心动机：基于Jacobi迭代的并行解码无需微调
- 代表机构：Stanford

#### 🔬 深入细节
基于Jacobi迭代的并行解码无需微调


### EAGLE-3

```yaml
id: eagle_v3
num: 19
name: EAGLE-3
full_name: 鹰3代 (EAGLE-3)
year: '2025.03'
org: PKU/SafeAI Lab
parent: eagle_v2
paper_url: https://arxiv.org/abs/2503.01840
project_url: ''
category: spec_decode
motivation: 直接Token预测+三层特征融合
```

#### 📝 一句话总结
EAGLE-3 的核心目标是：直接Token预测+三层特征融合。

#### 🎯 核心要点
- 核心动机：直接Token预测+三层特征融合
- 演化来源：继承或改进自 eagle_v2
- 代表机构：PKU/SafeAI Lab

#### 🔬 深入细节
直接Token预测+三层特征融合


### P-EAGLE

```yaml
id: p_eagle
num: 20
name: P-EAGLE
full_name: 并行鹰 (P-EAGLE)
year: '2026.02'
org: Amazon
parent: eagle_v3
paper_url: https://arxiv.org/abs/2602.01469
project_url: ''
category: spec_decode
motivation: 并行草稿单次前向生成K个draft
```

#### 📝 一句话总结
P-EAGLE 的核心目标是：并行草稿单次前向生成K个draft。

#### 🎯 核心要点
- 核心动机：并行草稿单次前向生成K个draft
- 演化来源：继承或改进自 eagle_v3
- 代表机构：Amazon

#### 🔬 深入细节
并行草稿单次前向生成K个draft


### SSD

```yaml
id: ssd
num: 21
name: SSD
full_name: 异步投机解码 (SSD)
year: '2026.03'
org: Stanford/Together AI
parent: spec_leviathan
paper_url: https://arxiv.org/abs/2603.03251
project_url: ''
category: spec_decode
motivation: 异步草稿验证+几何扇出策略
```

#### 📝 一句话总结
SSD 的核心目标是：异步草稿验证+几何扇出策略。

#### 🎯 核心要点
- 核心动机：异步草稿验证+几何扇出策略
- 演化来源：继承或改进自 spec_leviathan
- 代表机构：Stanford/Together AI

#### 🔬 深入细节
异步草稿验证+几何扇出策略


### FlashAttention

```yaml
id: flashattn
num: 22
name: FlashAttention
full_name: 闪电注意力 (FlashAttention)
year: '2022'
org: Stanford
parent: —
paper_url: https://arxiv.org/abs/2205.14135
project_url: ''
category: attention
motivation: IO感知的分块计算减少内存访问
```

#### 📝 一句话总结
FlashAttention 的核心目标是：IO感知的分块计算减少内存访问。

#### 🎯 核心要点
- 核心动机：IO感知的分块计算减少内存访问
- 代表机构：Stanford

#### 🔬 深入细节
IO感知的分块计算减少内存访问


### FlashAttention-2

```yaml
id: flashattn_v2
num: 23
name: FlashAttention-2
full_name: 闪电注意力2代 (FlashAttention-2)
year: '2023'
org: Stanford
parent: flashattn
paper_url: https://arxiv.org/abs/2307.08691
project_url: ''
category: attention
motivation: 优化并行策略提升硬件利用率
```

#### 📝 一句话总结
FlashAttention-2 的核心目标是：优化并行策略提升硬件利用率。

#### 🎯 核心要点
- 核心动机：优化并行策略提升硬件利用率
- 演化来源：继承或改进自 flashattn
- 代表机构：Stanford

#### 🔬 深入细节
优化并行策略提升硬件利用率


### Flash-Decoding

```yaml
id: flash_decoding
num: 24
name: Flash-Decoding
full_name: 闪电解码 (Flash-Decoding)
year: '2023'
org: Stanford
parent: flashattn_v2
paper_url: https://crfm.stanford.edu/2023/10/12/flash-decoding.html
project_url: ''
category: attention
motivation: 沿序列维度切分并行加速长文本解码
```

#### 📝 一句话总结
Flash-Decoding 的核心目标是：沿序列维度切分并行加速长文本解码。

#### 🎯 核心要点
- 核心动机：沿序列维度切分并行加速长文本解码
- 演化来源：继承或改进自 flashattn_v2
- 代表机构：Stanford

#### 🔬 深入细节
沿序列维度切分并行加速长文本解码


### FlashAttention-3

```yaml
id: flashattn_v3
num: 25
name: FlashAttention-3
full_name: 闪电注意力3代 (FlashAttention-3)
year: '2024'
org: Stanford
parent: flashattn_v2
paper_url: https://arxiv.org/abs/2407.08691
project_url: ''
category: attention
motivation: 针对Hopper架构实现异步计算重叠
```

#### 📝 一句话总结
FlashAttention-3 的核心目标是：针对Hopper架构实现异步计算重叠。

#### 🎯 核心要点
- 核心动机：针对Hopper架构实现异步计算重叠
- 演化来源：继承或改进自 flashattn_v2
- 代表机构：Stanford

#### 🔬 深入细节
针对Hopper架构实现异步计算重叠


### MLA

```yaml
id: mla
num: 26
name: MLA
full_name: 多头潜在注意力 (Multi-Head Latent Attention)
year: '2024.05'
org: DeepSeek
parent: gqa
paper_url: https://arxiv.org/abs/2405.04434
project_url: ''
category: attention
motivation: KV低秩压缩大幅降低缓存显存占用
```

#### 📝 一句话总结
MLA 的核心目标是：KV低秩压缩大幅降低缓存显存占用。

#### 🎯 核心要点
- 核心动机：KV低秩压缩大幅降低缓存显存占用
- 演化来源：继承或改进自 gqa
- 代表机构：DeepSeek

#### 🔬 深入细节
KV低秩压缩大幅降低缓存显存占用


### Ring Attention

```yaml
id: ring_attn
num: 27
name: Ring Attention
full_name: 环形注意力 (Ring Attention)
year: '2023'
org: UC Berkeley
parent: flashattn
paper_url: https://arxiv.org/abs/2310.01802
project_url: ''
category: attention
motivation: 分布式环形通信支持近乎无限上下文
```

#### 📝 一句话总结
Ring Attention 的核心目标是：分布式环形通信支持近乎无限上下文。

#### 🎯 核心要点
- 核心动机：分布式环形通信支持近乎无限上下文
- 演化来源：继承或改进自 flashattn
- 代表机构：UC Berkeley

#### 🔬 深入细节
分布式环形通信支持近乎无限上下文


### Striped Attention

```yaml
id: striped_attn
num: 28
name: Striped Attention
full_name: 条纹注意力 (Striped Attention)
year: '2023'
org: UC Berkeley
parent: ring_attn
paper_url: https://arxiv.org/abs/2311.09431
project_url: ''
category: attention
motivation: 交错分配标记解决因果掩码负载不均
```

#### 📝 一句话总结
Striped Attention 的核心目标是：交错分配标记解决因果掩码负载不均。

#### 🎯 核心要点
- 核心动机：交错分配标记解决因果掩码负载不均
- 演化来源：继承或改进自 ring_attn
- 代表机构：UC Berkeley

#### 🔬 深入细节
交错分配标记解决因果掩码负载不均


### FlashMLA

```yaml
id: flashmla
num: 29
name: FlashMLA
full_name: 闪电MLA内核 (FlashMLA)
year: '2025.02'
org: DeepSeek
parent: mla
paper_url: https://github.com/deepseek-ai/FlashMLA
project_url: ''
category: attention
motivation: 针对Hopper优化的MLA高效解码内核
```

#### 📝 一句话总结
FlashMLA 的核心目标是：针对Hopper优化的MLA高效解码内核。

#### 🎯 核心要点
- 核心动机：针对Hopper优化的MLA高效解码内核
- 演化来源：继承或改进自 mla
- 代表机构：DeepSeek

#### 🔬 深入细节
针对Hopper优化的MLA高效解码内核


### FlashAttention-4

```yaml
id: flashattn_v4
num: 30
name: FlashAttention-4
full_name: 闪电注意力4代 (FlashAttention-4)
year: '2026.03'
org: Tri Dao
parent: flashattn_v3
paper_url: https://arxiv.org/abs/2603.05451
project_url: ''
category: attention
motivation: 算法与内核协同设计适配Blackwell
```

#### 📝 一句话总结
FlashAttention-4 的核心目标是：算法与内核协同设计适配Blackwell。

#### 🎯 核心要点
- 核心动机：算法与内核协同设计适配Blackwell
- 演化来源：继承或改进自 flashattn_v3
- 代表机构：Tri Dao

#### 🔬 深入细节
算法与内核协同设计适配Blackwell


### NSA

```yaml
id: nsa
num: 31
name: NSA
full_name: 原生稀疏注意力 (Native Sparse Attention)
year: '2025'
org: DeepSeek
parent: flashattn_v2
paper_url: https://arxiv.org/abs/2502.11089
project_url: ''
category: attention
motivation: 硬件对齐的原生可训练稀疏注意力
```

#### 📝 一句话总结
NSA 的核心目标是：硬件对齐的原生可训练稀疏注意力。

#### 🎯 核心要点
- 核心动机：硬件对齐的原生可训练稀疏注意力
- 演化来源：继承或改进自 flashattn_v2
- 代表机构：DeepSeek

#### 🔬 深入细节
硬件对齐的原生可训练稀疏注意力


### DSA

```yaml
id: dsa
num: 32
name: DSA
full_name: DeepSeek稀疏注意力 (DeepSeek Sparse Attention)
year: '2026'
org: DeepSeek
parent: nsa
paper_url: https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro
project_url: ''
category: attention
motivation: 混合架构减90%KV缓存
```

#### 📝 一句话总结
DSA 的核心目标是：混合架构减90%KV缓存。

#### 🎯 核心要点
- 核心动机：混合架构减90%KV缓存
- 演化来源：继承或改进自 nsa
- 代表机构：DeepSeek

#### 🔬 深入细节
混合架构减90%KV缓存


### HISA

```yaml
id: hisa
num: 33
name: HISA
full_name: 层次化索引稀疏注意力 (HISA)
year: '2026'
org: Y Xu等
parent: nsa
paper_url: https://arxiv.org/abs/2603.28458
project_url: ''
category: attention
motivation: 层次化索引实现细粒度稀疏注意力
```

#### 📝 一句话总结
HISA 的核心目标是：层次化索引实现细粒度稀疏注意力。

#### 🎯 核心要点
- 核心动机：层次化索引实现细粒度稀疏注意力
- 演化来源：继承或改进自 nsa
- 代表机构：Y Xu等

#### 🔬 深入细节
层次化索引实现细粒度稀疏注意力


### Orca

```yaml
id: orca
num: 34
name: Orca
full_name: 虎鲸 (Orca)
year: '2022'
org: SNU
parent: —
paper_url: https://www.usenix.org/conference/osdi22/presentation/yu
project_url: ''
category: engine
motivation: 首次提出迭代级调度实现连续批处理
```

#### 📝 一句话总结
Orca 的核心目标是：首次提出迭代级调度实现连续批处理。

#### 🎯 核心要点
- 核心动机：首次提出迭代级调度实现连续批处理
- 代表机构：SNU

#### 🔬 深入细节
首次提出迭代级调度实现连续批处理


### DeepSpeed-Inference

```yaml
id: deepspeed_infer
num: 35
name: DeepSpeed-Inference
full_name: DeepSpeed推理 (DeepSpeed-Inference)
year: '2022'
org: Microsoft
parent: —
paper_url: https://arxiv.org/abs/2207.00032
project_url: ''
category: engine
motivation: 异构存储卸载支持万亿参数模型推理
```

#### 📝 一句话总结
DeepSpeed-Inference 的核心目标是：异构存储卸载支持万亿参数模型推理。

#### 🎯 核心要点
- 核心动机：异构存储卸载支持万亿参数模型推理
- 代表机构：Microsoft

#### 🔬 深入细节
异构存储卸载支持万亿参数模型推理


### vLLM

```yaml
id: vllm
num: 36
name: vLLM
full_name: vLLM引擎 (vLLM)
year: '2023'
org: UC Berkeley
parent: pagedattn
paper_url: https://arxiv.org/abs/2309.06180
project_url: ''
category: engine
motivation: 集成PagedAttention的高吞吐引擎
```

#### 📝 一句话总结
vLLM 的核心目标是：集成PagedAttention的高吞吐引擎。

#### 🎯 核心要点
- 核心动机：集成PagedAttention的高吞吐引擎
- 演化来源：继承或改进自 pagedattn
- 代表机构：UC Berkeley

#### 🔬 深入细节
集成PagedAttention的高吞吐引擎


### TensorRT-LLM

```yaml
id: trt_llm
num: 37
name: TensorRT-LLM
full_name: TensorRT推理库 (TensorRT-LLM)
year: '2024'
org: NVIDIA
parent: —
paper_url: https://github.com/NVIDIA/TensorRT-LLM
project_url: ''
category: engine
motivation: 深度适配NVIDIA硬件的极致性能库
```

#### 📝 一句话总结
TensorRT-LLM 的核心目标是：深度适配NVIDIA硬件的极致性能库。

#### 🎯 核心要点
- 核心动机：深度适配NVIDIA硬件的极致性能库
- 代表机构：NVIDIA

#### 🔬 深入细节
深度适配NVIDIA硬件的极致性能库


### SGLang

```yaml
id: sglang
num: 38
name: SGLang
full_name: 结构化语言引擎 (SGLang)
year: '2023'
org: UC Berkeley
parent: vllm
paper_url: https://arxiv.org/abs/2312.07104
project_url: ''
category: engine
motivation: RadixAttention实现前缀缓存自动复用
```

#### 📝 一句话总结
SGLang 的核心目标是：RadixAttention实现前缀缓存自动复用。

#### 🎯 核心要点
- 核心动机：RadixAttention实现前缀缓存自动复用
- 演化来源：继承或改进自 vllm
- 代表机构：UC Berkeley

#### 🔬 深入细节
RadixAttention实现前缀缓存自动复用


### Dynamo

```yaml
id: dynamo
num: 39
name: Dynamo
full_name: NVIDIA Dynamo (Dynamo)
year: '2026.03'
org: NVIDIA
parent: trt_llm
paper_url: https://github.com/ai-dynamo/dynamo
project_url: ''
category: engine
motivation: 开源分布式推理框架支持PD物理解耦
```

#### 📝 一句话总结
Dynamo 的核心目标是：开源分布式推理框架支持PD物理解耦。

#### 🎯 核心要点
- 核心动机：开源分布式推理框架支持PD物理解耦
- 演化来源：继承或改进自 trt_llm
- 代表机构：NVIDIA

#### 🔬 深入细节
开源分布式推理框架支持PD物理解耦


### FlashInfer

```yaml
id: flashinfer
num: 40
name: FlashInfer
full_name: FlashInfer (FlashInfer)
year: '2026'
org: CMU/Dao-AILab
parent: flashattn
paper_url: https://arxiv.org/abs/2601.00227
project_url: ''
category: engine
motivation: AI驱动的GPU注意力内核生成框架
```

#### 📝 一句话总结
FlashInfer 的核心目标是：AI驱动的GPU注意力内核生成框架。

#### 🎯 核心要点
- 核心动机：AI驱动的GPU注意力内核生成框架
- 演化来源：继承或改进自 flashattn
- 代表机构：CMU/Dao-AILab

#### 🔬 深入细节
AI驱动的GPU注意力内核生成框架


### vLLM v1

```yaml
id: vllm_v1
num: 41
name: vLLM v1
full_name: vLLM v1 (vLLM v1)
year: '2026'
org: vLLM社区
parent: vllm
paper_url: https://github.com/vllm-project/vllm
project_url: ''
category: engine
motivation: V2架构零泡沫异步调度
```

#### 📝 一句话总结
vLLM v1 的核心目标是：V2架构零泡沫异步调度。

#### 🎯 核心要点
- 核心动机：V2架构零泡沫异步调度
- 演化来源：继承或改进自 vllm
- 代表机构：vLLM社区

#### 🔬 深入细节
V2架构零泡沫异步调度


### SGLang v0.5

```yaml
id: sglang_v05
num: 42
name: SGLang v0.5
full_name: SGLang v0.5 (SGLang v0.5)
year: '2026'
org: UC Berkeley
parent: sglang
paper_url: https://github.com/sgl-project/sglang
project_url: ''
category: engine
motivation: 弹性专家并行+GPU Staging Buffer
```

#### 📝 一句话总结
SGLang v0.5 的核心目标是：弹性专家并行+GPU Staging Buffer。

#### 🎯 核心要点
- 核心动机：弹性专家并行+GPU Staging Buffer
- 演化来源：继承或改进自 sglang
- 代表机构：UC Berkeley

#### 🔬 深入细节
弹性专家并行+GPU Staging Buffer


### GPTQ

```yaml
id: gptq
num: 43
name: GPTQ
full_name: GPT量化 (GPTQ)
year: '2022'
org: IST Austria
parent: —
paper_url: https://arxiv.org/abs/2210.17323
project_url: ''
category: quantize
motivation: 高效二阶权重补偿实现4-bit无损量化
```

#### 📝 一句话总结
GPTQ 的核心目标是：高效二阶权重补偿实现4-bit无损量化。

#### 🎯 核心要点
- 核心动机：高效二阶权重补偿实现4-bit无损量化
- 代表机构：IST Austria

#### 🔬 深入细节
高效二阶权重补偿实现4-bit无损量化


### SmoothQuant

```yaml
id: smoothquant
num: 44
name: SmoothQuant
full_name: 平滑量化 (SmoothQuant)
year: '2022'
org: MIT
parent: —
paper_url: https://arxiv.org/abs/2211.10438
project_url: ''
category: quantize
motivation: 迁移激活值量化难度实现W8A8推理
```

#### 📝 一句话总结
SmoothQuant 的核心目标是：迁移激活值量化难度实现W8A8推理。

#### 🎯 核心要点
- 核心动机：迁移激活值量化难度实现W8A8推理
- 代表机构：MIT

#### 🔬 深入细节
迁移激活值量化难度实现W8A8推理


### SparseGPT

```yaml
id: sparsegpt
num: 45
name: SparseGPT
full_name: 稀疏GPT (SparseGPT)
year: '2023'
org: IST Austria
parent: gptq
paper_url: https://arxiv.org/abs/2301.00774
project_url: ''
category: quantize
motivation: 一步式无结构剪枝支持千亿参数模型
```

#### 📝 一句话总结
SparseGPT 的核心目标是：一步式无结构剪枝支持千亿参数模型。

#### 🎯 核心要点
- 核心动机：一步式无结构剪枝支持千亿参数模型
- 演化来源：继承或改进自 gptq
- 代表机构：IST Austria

#### 🔬 深入细节
一步式无结构剪枝支持千亿参数模型


### AWQ

```yaml
id: awq
num: 46
name: AWQ
full_name: 激活感知权重量化 (AWQ)
year: '2023'
org: MIT
parent: smoothquant
paper_url: https://arxiv.org/abs/2306.00978
project_url: ''
category: quantize
motivation: 保护显著权重通道提升低比特量化精度
```

#### 📝 一句话总结
AWQ 提出了一种激活感知的权重量化方法，通过观察激活分布识别显著权重通道并施加逐通道缩放保护，无需反向传播或权重重建即可显著提升低比特（INT3/INT4）权重量化精度，同时保持对不同领域和模态的泛化能力。

#### 🎯 核心要点
- **核心观察**：LLM 中仅 1% 的显著权重通道（由激活幅度决定而非权重幅度）对量化性能至关重要
- **逐通道缩放**：对显著权重通道乘以缩放因子 \(s > 1\)，等价地缩小对应激活通道，在不引入混合精度的前提下降低量化误差
- **激活感知搜索**：缩放因子搜索空间设计为 \(s = s_X^\alpha\)（\(s_X\) 为逐通道激活均值，\(\alpha \in [0, 1]\)），通过网格搜索最小化量化输出误差
- **无需训练/回归**：仅需少量校准数据测量激活统计量，比 GPTQ 所需校准集小 10 倍
- **对校准集分布鲁棒**：跨域校准时 PPL 仅增加 0.5-0.6，而 GPTQ 增加 2.3-4.9
- **广泛泛化**：支持 LLaMA、OPT 等基础模型，以及指令微调模型（Vicuna）和多模态模型（OpenFlamingo、LLaVA）
- **TinyChat 推理系统**：通过内核融合实现实际加速，4090 上达 3.9× 加速，笔记本 4070（8GB）上以 33 tok/s 运行 Llama-2-13B
- **与 GPTQ 正交**：可与 GPTQ 组合进一步提升 INT2 极低比特量化性能

#### 🔬 深入细节
![AWQ 核心方法示意图](https://ar5iv.labs.arxiv.org/html/2306.00978/assets/x1.png)
*图：AWQ 方法概览。左：直接 INT3 量化导致严重性能退化（PPL=43.2）；中：保留 1% 显著权重为 FP16 可大幅改善（PPL=13.0），但混合精度硬件不友好；右：AWQ 通过逐通道缩放保护显著权重，实现硬件友好的高精度量化。*

```python
# AWQ 核心算法伪代码
# 输入: 权重矩阵 W (c_out × c_in), 校准集激活 X, 量化比特数 N, 搜索粒度 n_grid
# 输出: 最优缩放向量 s*

def awq_search(W, X, N, n_grid=20):
    # Step 1: 计算逐通道激活均值作为显著性指标
    s_X = X.abs().mean(dim=0)  # shape: (c_in,)
    
    best_loss = float('inf')
    best_alpha = 0
    
    # Step 2: 网格搜索最优 alpha
    for alpha in linspace(0, 1, n_grid):
        s = s_X.pow(alpha)  # 缩放因子
        
        # Step 3: 对权重施加缩放后量化
        W_scaled = W * s.unsqueeze(0)        # W · diag(s)
        W_q = quantize(W_scaled, N)           # Q(W · diag(s))
        
        # Step 4: 计算量化输出误差 (缩放逆变换应用于激活)
        X_scaled = X / s.unsqueeze(0)         # diag(s)^{-1} · X
        loss = (W_q @ X_scaled - W @ X).pow(2).mean()
        
        if loss < best_loss:
            best_loss = loss
            best_alpha = alpha
    
    return s_X.pow(best_alpha)

def quantize(w, N):
    """均匀量化函数"""
    delta = w.abs().max() / (2**(N-1) - 1)
    return delta * torch.round(w / delta)
```

##### 动机与背景

大语言模型（LLM）的参数量从数十亿到数千亿不等，部署时面临严峻的内存和计算瓶颈。**权重量化**（Weight-only Quantization）是一种有效的模型压缩方法，将权重从 FP16 压缩到 INT3/INT4，可以减少 3-4 倍模型大小，并加速 token 生成阶段的内存受限推理。

现有方法存在两大问题：
1. **Round-to-Nearest (RTN)**：直接将权重四舍五入到最近整数，简单但在低比特（≤4bit）下性能退化严重
2. **GPTQ**：基于逐层权重重建（OBQ/OBS），通过最小化重建误差调整量化权重，但依赖反向传播/回归过程，容易**过拟合校准集**，损害模型在其他领域和模态上的泛化能力

> 💡 **关键洞察**：AWQ 发现 LLM 权重的重要性不均等——仅 1% 的权重通道对模型性能至关重要，而这些显著通道应通过**激活分布**（而非权重分布）来识别。

##### 核心机制：激活感知缩放

**Step 1: 识别显著权重通道**

AWQ 的第一个发现是：保留少量（0.1%-1%）权重通道为 FP16 可以显著改善量化性能。关键在于如何选择这些通道：

- 按**权重幅度**选择 → 效果与随机选择相当
- 按**激活幅度**选择 → 显著提升性能，甚至匹配 GPTQ

直觉是：激活幅度大的输入特征通常更重要，保留对应权重可以保护这些特征的传递。

**Step 2: 用缩放替代混合精度**

混合精度（部分 FP16 + 部分 INT3）虽然有效，但硬件实现困难。AWQ 提出用**逐通道缩放**来等效保护显著权重。

对于线性运算 \(y = \mathbf{w} \cdot \mathbf{x}\)，量化误差为：

$$\text{Err}(Q(\mathbf{w})) = \Delta \cdot \text{RoundErr}, \quad \Delta = \frac{\max(|\mathbf{w}|)}{2^{N-1} - 1}$$

当对权重通道乘以缩放因子 \(s > 1\) 时（同时对激活除以 \(s\) 以保持等价性），量化误差变为：

$$\text{Err}(Q(w \cdot s) / s \cdot x) = \frac{\Delta \cdot \text{RoundErr}}{s} \cdot x$$

> 💡 **关键**：缩放因子 \(s\) 使得显著通道的**相对量化误差**降低为原来的 \(1/s\)。虽然 \(\Delta\) 可能因最大值变化而略微增大，但对于显著通道（激活幅度大），\(s\) 带来的误差降低远大于 \(\Delta\) 增大的代价。

**Step 3: 自动搜索最优缩放因子**

直接为每个通道独立搜索 \(s\) 会导致搜索空间过大。AWQ 巧妙地将搜索空间参数化为：

$$\mathbf{s} = \mathbf{s}_X^\alpha, \quad \alpha \in [0, 1]$$

其中 \(\mathbf{s}_X\) 是逐通道的激活均值幅度。这一设计的直觉是：
- \(\alpha = 0\)：不缩放（等同于 RTN）
- \(\alpha = 1\)：完全按激活幅度缩放
- 最优 \(\alpha\) 在两者之间，平衡显著通道保护与非显著通道的量化精度

搜索目标为最小化量化前后的输出误差：

$$\mathcal{L}(\mathbf{s}) = \| Q(\mathbf{W} \cdot \text{diag}(\mathbf{s})) \cdot (\text{diag}(\mathbf{s})^{-1} \cdot \mathbf{X}) - \mathbf{W} \mathbf{X} \|$$

通过在 \([0, 1]\) 上进行网格搜索（默认 20 个点），逐层确定最优 \(\alpha\)。整个搜索过程无需梯度计算，仅需前向传播，非常高效。

> ⚠️ **注意**：缩放操作在数学上等价于将缩放因子融合到前一层的权重或归一化参数中（如 LayerNorm），因此不引入额外的推理开销。

##### 与传统方法的对比

| 特性 | RTN | GPTQ | AWQ |
|------|-----|------|-----|
| 是否需要反向传播 | ❌ | ✅（逐层重建） | ❌ |
| 校准数据需求 | 无 | 较多（128-192 序列） | 极少（~16 序列） |
| 校准集过拟合风险 | 无 | 高 | 低 |
| 多模态/跨域泛化 | 一般 | 差（过拟合） | 好 |
| INT3 LLaMA-7B PPL | 25.54 | 5.69 | 5.60 |
| INT4 LLaMA-7B PPL | 5.68 | 5.63 | 5.60 |
| 与 GPTQ 组合 | — | — | ✅（INT2 场景） |

##### TinyChat 推理系统

AWQ 不仅是量化算法，还配套了 TinyChat 高效推理系统：

- **内核融合**：将反量化与矩阵乘法融合，减少中间 DRAM 访问和内核启动开销
- **全模型优化**：同时优化量化线性层和非量化层（如 LayerNorm、Attention）
- **跨平台部署**：支持桌面 GPU（RTX 4090）、笔记本 GPU（RTX 4070）和边缘设备（Jetson Orin）
- **实测加速**：
  - RTX 4090：2.7-3.9× 加速（对比 HuggingFace FP16）
  - RTX 4070（8GB）：以 33 tok/s 运行 Llama-2-13B（FP16 连 7B 都无法加载）
  - Jetson Orin（32GB）：可运行 MPT-30B，达 7.8 tok/s

#### 🧪 练习题
```yaml
question: "AWQ 选择显著权重通道的依据是什么？"
options:
  - "权重的 L2 范数大小"
  - "权重的绝对值大小"
  - "对应输入激活的幅度大小"
  - "梯度的幅度大小"
answer: 2
explain: "AWQ 的核心发现是按激活幅度（而非权重幅度）选择显著通道效果最好，因为激活幅度大的特征通常更重要，保护对应权重可以保留这些关键特征的传递。"
```

### Wanda

```yaml
id: wanda
num: 47
name: Wanda
full_name: 权重与激活剪枝 (Wanda)
year: '2023'
org: CMU
parent: —
paper_url: https://arxiv.org/abs/2306.11695
project_url: ''
category: quantize
motivation: 极简剪枝准则无需二阶信息计算
```

#### 📝 一句话总结
Wanda 的核心目标是：极简剪枝准则无需二阶信息计算。

#### 🎯 核心要点
- 核心动机：极简剪枝准则无需二阶信息计算
- 代表机构：CMU

#### 🔬 深入细节
极简剪枝准则无需二阶信息计算


### NVFP4

```yaml
id: nvfp4
num: 48
name: NVFP4
full_name: NVIDIA FP4 (NVFP4)
year: '2026'
org: NVIDIA
parent: smoothquant
paper_url: https://developer.nvidia.com/blog/nvfp4-blackwell-inference/
project_url: ''
category: quantize
motivation: E2M1双层微缩放实现硬件原生FP4推理
```

#### 📝 一句话总结
NVFP4 的核心目标是：E2M1双层微缩放实现硬件原生FP4推理。

#### 🎯 核心要点
- 核心动机：E2M1双层微缩放实现硬件原生FP4推理
- 演化来源：继承或改进自 smoothquant
- 代表机构：NVIDIA

#### 🔬 深入细节
E2M1双层微缩放实现硬件原生FP4推理


### BitNet b1.58

```yaml
id: bitnet_b158
num: 49
name: BitNet b1.58
full_name: 比特网 (BitNet b1.58)
year: '2024'
org: 微软
parent: gptq
paper_url: https://arxiv.org/abs/2402.17764
project_url: ''
category: quantize
motivation: 三值化权重消除浮点乘法
```

#### 📝 一句话总结
BitNet b1.58 的核心目标是：三值化权重消除浮点乘法。

#### 🎯 核心要点
- 核心动机：三值化权重消除浮点乘法
- 演化来源：继承或改进自 gptq
- 代表机构：微软

#### 🔬 深入细节
三值化权重消除浮点乘法


### MC#

```yaml
id: mc_sharp
num: 50
name: MC#
full_name: 混合压缩器 (MC#)
year: '2026'
org: IEEE TPAMI
parent: awq
paper_url: https://ieeexplore.ieee.org/document/10884444/
project_url: ''
category: quantize
motivation: 自适应混合精度量化+在线剪枝压缩MoE
```

#### 📝 一句话总结
MC# 的核心目标是：自适应混合精度量化+在线剪枝压缩MoE。

#### 🎯 核心要点
- 核心动机：自适应混合精度量化+在线剪枝压缩MoE
- 演化来源：继承或改进自 awq
- 代表机构：IEEE TPAMI

#### 🔬 深入细节
自适应混合精度量化+在线剪枝压缩MoE


### RetNet

```yaml
id: retnet
num: 51
name: RetNet
full_name: 保留网络 (Retentive Network)
year: '2023'
org: Microsoft
parent: —
paper_url: https://arxiv.org/abs/2307.08621
project_url: ''
category: linear_attn
motivation: 三种范式统一实现线性推理复杂度
```

#### 📝 一句话总结
RetNet 的核心目标是：三种范式统一实现线性推理复杂度。

#### 🎯 核心要点
- 核心动机：三种范式统一实现线性推理复杂度
- 代表机构：Microsoft

#### 🔬 深入细节
三种范式统一实现线性推理复杂度


### Mamba

```yaml
id: mamba
num: 52
name: Mamba
full_name: 曼巴 (Mamba)
year: '2023'
org: CMU/Princeton
parent: —
paper_url: https://arxiv.org/abs/2312.00752
project_url: ''
category: linear_attn
motivation: 选择性状态空间模型线性时间扩展
```

#### 📝 一句话总结
Mamba 的核心目标是：选择性状态空间模型线性时间扩展。

#### 🎯 核心要点
- 核心动机：选择性状态空间模型线性时间扩展
- 代表机构：CMU/Princeton

#### 🔬 深入细节
选择性状态空间模型线性时间扩展
