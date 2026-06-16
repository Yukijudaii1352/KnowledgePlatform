---
domain: infra
topic_id: infer
topic_name: 推理加速
page_icon: ⚡
page_title: 推理加速算法总结
page_subtitle: 2026-05-12 版
page_desc: 回顾从FlashAttention到PagedAttention，以及投机解码、KV Cache优化、推理引擎的演进历程，涵盖2026年最新的Blackwell架构适配与分布式推理突破。
hero_pills:
- 🏷️ KV Cache · 投机解码 · 推理引擎
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

!INCLUDE_RAW ../../temp/content_survey_bulk_20260614_174337/researcher_output/infra/infer/overview/zhihu__AI_Infra_LLM推理系统：技术发展与演进调研__0ed2d3d0/article.md

## 最新进展综述

!INCLUDE_RAW ../../temp/content_survey_bulk_20260614_174337/researcher_output/infra/infer/latest/zhihu__2026年大模型推理优化全景：从_KV_Cache_压缩到投机解码__5373f722/article.md

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
MQA 提出“一个写入头”：保留多组 Query 头，但让所有头共享同一组 Key/Value 投影与 KV cache，从而把自回归解码中反复读取历史 K/V 的带宽开销按头数压缩。它解决的不是注意力计算近似问题，而是标准 MHA 在增量生成阶段被显存带宽限制的问题。

#### 🎯 核心要点
- 结构改动：去掉 Key/Value 的 heads 维度，Query 和输出投影仍保留多头
- KV cache 压缩：每层缓存从 \(2BHLd_h\) 个元素降到 \(2BLd_h\)，相对 MHA 约减少 \(H\) 倍
- 带宽分析：论文将增量 MHA 的访存/计算比从 \(\Theta(n/d + 1/b)\) 改写为 MQA 的 \(\Theta(1/d + n/(dh) + 1/b)\)
- 推理优势：每个新 token 只追加一份 K/V，所有 Query 头共享读取，显著降低 decoder step 延迟
- 正交性：MQA 可与局部注意力等限制上下文的方法叠加，不改变 softmax 注意力的精确计算形式
- 论文实证：WMT14 EN-DE 与 Billion-Word LM 中质量轻微下降，WMT14 greedy decoder 从 46 微秒/token 降到 3.8 微秒/token

#### 🔬 深入细节
![MQA 与 MHA/GQA 的头组织对比](https://arxiv.org/html/2305.13245v3/extracted/5314337/images/gmq_architecture.png)
*图：GQA 论文 Figure 2 的官方图，左到右对比 MHA、GQA、MQA。MQA 原论文没有独立架构图，因此这里引用后续 Google GQA 论文中对 MQA 结构的公开示意。*

```python
# Multi-Query Attention 的增量解码伪代码
# H: query head 数, L: 已有上下文长度, d_h: head 维度
for step, x_t in enumerate(generated_tokens):
    # Query 仍是多头，形状 [B, H, d_h]
    q = einsum("bd,hdk->bhk", x_t, W_q)

    # Key/Value 只写入一份，形状 [B, d_h]
    k_t = einsum("bd,dk->bk", x_t, W_k)
    v_t = einsum("bd,dv->bv", x_t, W_v)
    K_cache.append(k_t)  # [B, L + 1, d_h]
    V_cache.append(v_t)  # [B, L + 1, d_h]

    # 每个 query head 都读同一份 K/V cache
    logits = einsum("bhk,bmk->bhm", q, K_cache) / sqrt(d_h)
    weights = softmax(causal_mask(logits), dim=-1)
    heads = einsum("bhm,bmv->bhv", weights, V_cache)
    y_t = einsum("bhv,hdv->bd", heads, W_o)
```

标准多头注意力为每个头单独生成 \(K_h,V_h\)：

$$
q_h = xW^Q_h,\quad K_h = MW^K_h,\quad V_h = MW^V_h,\quad
o_h = \mathrm{softmax}\left(\frac{q_hK_h^\top}{\sqrt{d_h}}\right)V_h
$$

MQA 只把 \(K_h,V_h\) 改成共享的 \(K,V\)：

$$
q_h = xW^Q_h,\quad K = MW^K,\quad V = MW^V,\quad
o_h = \mathrm{softmax}\left(\frac{q_hK^\top}{\sqrt{d_h}}\right)V
$$

动机来自 Transformer 的训练/推理不对称。训练时整段序列并行计算，矩阵乘足够大，访存被摊薄；但自回归解码每次只生成一个位置，当前 query 必须读取此前所有 token 的 K/V。随着上下文长度 \(L\) 增长，每层每步都要扫历史缓存，标准 MHA 的缓存形状近似为 \([B,H,L,d_h]\)，显存带宽很快变成瓶颈。论文的分析把增量 MHA 的主要坏项写成 \(n/d\)：序列越长，重复读 K/V 的开销相对计算越大。

MQA 的关键选择是“只共享 K/V，不共享 Q”。不同 Query 头仍可从当前 token 投影出不同查询子空间，输出端仍有每头的 \(W^O_h\)，因此保留了多头对当前状态的多视角读取能力；被压缩的是历史记忆的表示方式。换句话说，MQA 不是把注意力头剪掉，也不是对 attention score 做低秩近似，而是把所有头要查询的历史数据库合并成一份。这样每层 cache 元素数从 \(2BHLd_h\) 降到 \(2BLd_h\)，并且每个 decode step 只追加一组 \(k_t,v_t\)。

推理流程上，prefill 阶段可一次性为 prompt 写入共享 K/V；decode 阶段每来一个新 token，模型计算多头 \(q_h\)，再计算一份 \(k_t,v_t\) 并追加到 cache。随后所有头对同一份 \(K,V\) 做 causal attention。这个过程仍然是精确 softmax attention 的一种参数化，因此不会引入近似检索误差；收益主要来自 cache 体积、cache 写入次数和历史 K/V 读取带宽的下降。

论文还给出一个有用的系统直觉：如果只是增大 batch size，可以缓解访存/计算比中的 \(1/b\) 项，但无法解决 \(n/d\) 项；MQA 把这个项进一步除以头数 \(h\)，即 \(n/(dh)\)。这解释了为什么它特别适合长上下文、低延迟、在线生成：这些场景 batch 不一定足够大，而每步读取历史 K/V 的代价非常稳定。

实验中，作者在 WMT14 English-German 翻译和 Billion-Word 语言模型上比较 MHA、MQA、局部注意力以及减少头数/头维度的替代方案。为了让参数量公平，MQA 版本扩大了 FFN 隐层。结果显示，MQA 的质量接近基线，明显好于简单减少 heads 或 \(d_k,d_v\) 的做法；WMT14 上 greedy 增量 decoder 每 token 成本从 MHA 的 46 微秒降到 3.8 微秒，beam-4 decoder 从 203 微秒降到 32 微秒。

> 💡 关键：MQA 把“每个头写一份历史记忆”改成“所有头读同一份历史记忆”。这牺牲了一部分 K/V 表示容量，但换来 KV cache 的头数级压缩，是后续 GQA、KV cache 量化和推理内存管理工作的基础结构之一。

#### 🧪 练习题
```yaml
question: "MQA 在增量解码中降低显存带宽压力的直接原因是什么？"
options:
  - "把 softmax 替换为线性注意力"
  - "让多个 Query 头共享同一份 Key/Value cache"
  - "减少 Transformer 层数"
  - "只在训练阶段使用注意力"
answer: 1
explain: "MQA 保留多头 Query，但去掉 K/V 的 heads 维度，因此历史 K/V 的存储和读取不再随 Query 头数线性增长。"
```

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
GQA 把 MQA 的“所有 Query 头共享一组 K/V”推广为“每组 Query 头共享一组 K/V”，并给出从已有 MHA checkpoint 低成本 uptraining 到 GQA/MQA 的转换配方。它在 MHA 的质量和 MQA 的解码速度之间提供可调折中。

#### 🎯 核心要点
- 结构插值：\(G=1\) 时退化为 MQA，\(G=H\) 时退化为 MHA，中间组数即 GQA
- 分组共享：\(H\) 个 Query heads 被划分为 \(G\) 组，每组只有一个 Key head 和一个 Value head
- checkpoint 转换：同组 MHA 的 \(W^K_h,W^V_h\) 通过均值池化初始化为 GQA 的组级 K/V 投影
- uptraining 配方：用原预训练目标和数据继续训练约 5% 原始预训练计算，使模型适应共享 K/V 的容量约束
- 推理收益：KV cache 从 \(2BHLd_h\) 降到 \(2BGLd_h\)，缓存与带宽压缩比约为 \(H/G\)
- 实验结论：T5-XXL 上 GQA-8 接近 MQA 的速度，同时质量更接近 MHA；论文选择 8 组作为主要折中点

#### 🔬 深入细节
![GQA 头组织方式](https://arxiv.org/html/2305.13245v3/extracted/5314337/images/gmq_architecture.png)
*图：论文 Figure 2 展示 MHA、GQA、MQA 的头组织方式。GQA 为每个 Query 头组保留一组共享 K/V，介于每头独立和全局共享之间。*

![MHA checkpoint 到 MQA/GQA 的转换](https://arxiv.org/html/2305.13245v3/extracted/5314337/images/recycling.png)
*图：论文 Figure 1 展示 checkpoint conversion。Key/Value 投影矩阵通过均值池化合并，然后继续预训练。*

```python
# 从 MHA checkpoint 转成 GQA，并做少量 uptraining
def convert_mha_to_gqa(layer, num_query_heads, num_kv_groups):
    heads_per_group = num_query_heads // num_kv_groups
    new_Wk, new_Wv = [], []

    for g in range(num_kv_groups):
        start = g * heads_per_group
        end = (g + 1) * heads_per_group
        # 论文发现 mean pooling 优于取第一个 head 或随机初始化
        new_Wk.append(mean(layer.Wk[start:end], axis=0))
        new_Wv.append(mean(layer.Wv[start:end], axis=0))

    layer.Wk = stack(new_Wk)  # [G, d_model, d_h]
    layer.Wv = stack(new_Wv)  # [G, d_model, d_h]
    # Wq 和 Wo 仍保留 H 个 query/output heads
    return layer

for layer in model.decoder_layers:
    convert_mha_to_gqa(layer.self_attn, H, G)
    convert_mha_to_gqa(layer.cross_attn, H, G)

for batch in pretraining_data_subset:  # 约 5% 原预训练 compute
    loss = language_model_loss(model, batch)
    optimizer.step(loss)
```

GQA 的注意力可以写成带 group map 的多头注意力。设 \(g(h)\) 表示 Query head \(h\) 所属的 K/V 组，则：

$$
q_h = xW^Q_h,\quad K_{g(h)} = MW^K_{g(h)},\quad V_{g(h)} = MW^V_{g(h)}
$$

$$
o_h = \mathrm{softmax}\left(\frac{q_hK_{g(h)}^\top}{\sqrt{d_h}}\right)V_{g(h)},\quad
y = \sum_{h=1}^{H} o_h W^O_h
$$

从缓存角度看，MHA 每层存 \(H\) 组 K/V，MQA 只存 1 组，GQA 存 \(G\) 组：

$$
\mathrm{KVCache}_{\mathrm{MHA}} = 2BHLd_h,\quad
\mathrm{KVCache}_{\mathrm{GQA}} = 2BGLd_h,\quad
\mathrm{saving} \approx \frac{H}{G}
$$

GQA 的动机来自 MQA 的两个现实问题。第一，纯 MQA 把所有 heads 的历史表示压到一组 K/V，对大模型尤其是长输入任务可能带来质量下降或训练不稳定。第二，很多可用模型已经以 MHA 训练完，从头训练一个 MQA 版本成本很高。GQA 通过中间组数保留更多 K/V 容量，同时仍显著减少服务时需要读写的 KV cache。

转换步骤的重点不是简单改模型配置，而是尽可能保留原 checkpoint 的信息。论文比较了三种初始化：均值池化原 K/V heads、选择第一个 head、随机初始化。均值池化最好，因为它把同组 heads 的已学表示合并为组级投影，减少结构突变。对 GQA 来说，组 \(S_g\) 的初始化可写为：

$$
W^K_g = \frac{1}{|S_g|}\sum_{h\in S_g}W^K_h,\quad
W^V_g = \frac{1}{|S_g|}\sum_{h\in S_g}W^V_h
$$

随后 uptraining 用原来的语言模型预训练目标继续训练一小段，让 Query heads、共享 K/V heads 和 FFN 层重新协调。论文把 uptraining 比例记为 \(\alpha\)，主结果使用 \(\alpha=0.05\)，也就是约 5% 原预训练计算。这个设计承认均值池化只是一个好的初始化，并不指望一次性转换后模型完全适应新的信息瓶颈。

推理时，GQA 与 MQA 的执行模式相似但粒度更细。每个新 token 每层生成 \(G\) 组 K/V 并写入 cache；每个 Query head 只读取自己所属组的 K/V。相比 MHA，attention score 仍有 \(H\) 个 Query heads，因此当前 token 的查询表达能力保留；相比 MQA，历史记忆不再只有一组，质量损失更小。相比 MHA，历史缓存读取从 \(H\) 组降到 \(G\) 组，因此长上下文 decode 的带宽压力下降。

论文实验基于 T5.1.1 Large 和 XXL，并在 decoder self-attention 与 cross-attention 上应用 MQA/GQA，不应用于 encoder self-attention，因为 encoder 计算可并行，带宽瓶颈没有 decoder 自回归阶段强。任务覆盖 CNN/Daily Mail、arXiv、PubMed、MediaSum、Multi-News、WMT14 EN-DE 和 TriviaQA。表 1 中 T5-XXL MHA 的推理时间为 1.51 秒/sample，5% uptrained MQA-XXL 为 0.24，GQA-8-XXL 为 0.28；GQA-8 的平均指标更接近 MHA-XXL，说明少量速度损失换来了明显质量恢复。

GQA 对大模型还有一个工程细节优势：当模型被张量并行切分时，单一 MQA K/V head 往往需要在多个分片上复制，造成额外浪费；多个 GQA 组更容易与分片和 heads 划分对齐。论文也指出，随着模型尺寸增加，参数/FLOPs 随模型维度平方增长，而 KV cache 更接近线性增长，因此可以用组数调节容量与带宽，避免 MQA 对大模型变成过强的容量削减。

> 💡 关键：GQA 的价值不是“又一种注意力公式”，而是把 MQA 的极端压缩变成可部署旋钮：服务方可以用 \(G\) 控制 KV cache、带宽和质量之间的工程边界。

#### 🧪 练习题
```yaml
question: "GQA 从已有 MHA checkpoint 初始化组级 Key/Value 投影时，论文推荐的方法是什么？"
options:
  - "随机初始化所有 Key/Value 投影"
  - "删除 Query heads，只保留一个 head"
  - "对同组 MHA Key/Value heads 做均值池化"
  - "冻结模型，只修改 tokenizer"
answer: 2
explain: "论文发现均值池化能最大限度保留原 checkpoint 中 K/V heads 的信息，然后用约 5% 原预训练计算继续 uptraining。"
```

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
PagedAttention 把操作系统的分页思想引入 LLM serving，把每个请求的 KV cache 切成固定大小 block，并用 block table 把逻辑连续的 token 序列映射到物理上不连续的显存块。它不改变注意力数学结果，而是通过按需分配、非连续存储和共享前缀显著降低 KV cache 的碎片与重复拷贝。

#### 🎯 核心要点
- KV cache 分块：每个 KV block 容纳固定数量 token 的 key/value 向量，block size 记为 \(B\)
- 逻辑/物理分离：请求看到连续 logical KV blocks，GPU 上实际分配为可不连续的 physical KV blocks
- block table：每个请求维护逻辑块到物理块的映射，并记录最后块已填充位置
- PagedAttention kernel：attention 计算时先查 block table，再按物理块读取 K/V，输出仍是 exact attention
- 按需分配：不按最大输出长度预留，只有前面块填满时才申请新物理块，单请求浪费被限制在一个块内
- 内存共享：引用计数和 copy-on-write 支持 parallel sampling、beam search、shared prefix
- 系统效果：vLLM 基于该机制实现近零 KV cache 浪费，在相同延迟水平下相对 FasterTransformer/Orca 提升 2-4 倍吞吐

#### 🔬 深入细节
![PagedAttention 非连续 KV block](https://ar5iv.labs.arxiv.org/html/2309.06180/assets/x6.png)
*图：论文 Figure 5，PagedAttention 将注意力 Key/Value 存储在非连续物理块中，kernel 按块读取并完成注意力计算。*

![vLLM block table 翻译](https://ar5iv.labs.arxiv.org/html/2309.06180/assets/x7.png)
*图：论文 Figure 6，vLLM 通过 block table 把逻辑 KV blocks 映射到物理 KV blocks，并在 decode 过程中按需分配新块。*

```python
# PagedAttention 的 KV block 管理和注意力读取伪代码
def append_kv(seq, pos, k_t, v_t):
    logical_id = pos // BLOCK_SIZE
    offset = pos % BLOCK_SIZE

    if logical_id not in seq.block_table:
        physical_id = gpu_block_allocator.alloc()
        seq.block_table[logical_id] = {
            "physical": physical_id,
            "filled": 0,
            "refcnt": 1,
        }

    entry = seq.block_table[logical_id]
    write_block(entry["physical"], offset, k_t, v_t)
    entry["filled"] = max(entry["filled"], offset + 1)

def paged_attention(q_i, seq):
    numerator, denominator = 0.0, 0.0
    for logical_id in visible_logical_blocks(seq, q_i.position):
        entry = seq.block_table[logical_id]
        K_j, V_j = read_physical_block(entry["physical"], entry["filled"])
        scores = exp(q_i @ K_j.T / sqrt(d_head))
        numerator += scores @ V_j
        denominator += sum(scores)
    return numerator / denominator
```

论文将长度为 \(B\) 的 KV block 表示为：

$$
K_j = (k_{(j-1)B+1}, \ldots, k_{jB}),\quad
V_j = (v_{(j-1)B+1}, \ldots, v_{jB})
$$

对第 \(i\) 个 query，块级注意力可写为：

$$
A_{ij}=
\frac{\exp(q_i^\top K_j/\sqrt{d})}
{\sum_{t=1}^{\lceil i/B\rceil}\exp(q_i^\top K_t\mathbf{1}/\sqrt{d})},
\quad
o_i=\sum_{j=1}^{\lceil i/B\rceil} V_j A_{ij}^\top
$$

LLM serving 的核心难点是输出长度未知。传统连续 KV cache 管理通常要为每个请求预留最大长度，或者用动态连续张量扩容。前者产生严重内部碎片：请求实际输出远短于上限时，预留空间不能给别的请求用；后者会遇到外部碎片和搬移成本。论文指出，在已有系统中，实际 token 状态只占 KV cache 分配的一部分，碎片和重复复制限制了可并发 batch size。

PagedAttention 的核心抽象是把 token 序列的逻辑连续性和显存物理连续性解耦。一个请求的 logical block 0、1、2 在语义上连续，但它们可以映射到物理块 7、1、3。attention kernel 不再假设 K/V 是一整段连续数组，而是拿到该请求的 block table，逐块读取物理地址。这类似操作系统页表：进程看到连续虚拟地址，页表负责翻译到任意物理页。

这个设计不改变注意力结果。普通 causal attention 对所有可见历史 token 做 \(q_iK^\top\)、softmax、再乘 \(V\)；PagedAttention 只是把 \(K,V\) 分成多个块，逐块累积等价的 softmax 归一化与 value 加权。额外开销是 block table 间接寻址和处理非连续块，但收益是 KV cache 不必连续、无需最大长度预留，且可以把更多请求同时放进显存。

decode 流程上，prefill 阶段只为 prompt 已产生的 KV cache 分配足够 block。每个 decode iteration，vLLM 先由 scheduler 选择可批处理的序列，再为即将写入的新 token 分配必要物理块。如果最后一个 logical block 还有空位，新 K/V 直接写入该块并更新 `#filled`；如果块满了，才申请新的 physical block 并在 block table 中增加映射。请求结束时，相关物理块返回 allocator。

内存浪费被固定 block size 控制。因为每个请求总是从左到右填充 block，除最后一个未满块外，其余块都接近满载；所以单请求内部碎片上界约为一个 block。block size 越大，kernel 一次读块的并行度更好，但最后块浪费也更大；block size 越小，碎片更低，但 block table 和 kernel 间接访问开销更高。论文在 vLLM 中通过实验选择合适区间，而不是把它当成纯算法常数。

PagedAttention 还把共享前缀变成自然的数据结构操作。在 parallel sampling 中，同一 prompt 的多个样本可以把 prompt logical blocks 映射到同一批 physical blocks，并用引用计数记录共享。当某个样本要写入仍被多个序列共享的最后块时，vLLM 执行 copy-on-write：复制一个物理块、降低旧块引用计数，然后只让该样本写新块。beam search 也类似，不同 beam candidate 可以共享尚未分叉的历史块，淘汰候选时只减少引用计数并释放归零的块。

与 FasterTransformer 或 Orca 这类连续缓存/调度思路相比，PagedAttention 的创新点在于把注意力 kernel 和内存管理一起设计。仅有 iteration-level scheduling 仍会受 KV cache 浪费限制；仅有分页 allocator 但 kernel 仍要求连续 K/V 也无法工作。vLLM 的 scheduler、KV block manager、GPU block allocator 和 PagedAttention kernel 共同构成系统：scheduler 下发当前 batch 的 token 与 block table，GPU worker 按映射读取历史 K/V 并写入新 K/V。

论文报告 vLLM 在多种模型和 workload 上相对 FasterTransformer/Orca 达到 2-4 倍吞吐提升，同等延迟下改善在长序列、大模型、复杂解码算法中更明显。注意这不是因为模型输出更近似或减少层数，而是因为显存里能容纳更多真实有效的 KV cache，从而服务系统能维持更大的动态 batch。

> 💡 关键：PagedAttention 是 KV cache 的“页表化”。它把显存管理从“给每个请求切一整段连续大数组”改成“按 token 增长逐块映射”，因此同时解决碎片、预留浪费和前缀共享。

#### 🧪 练习题
```yaml
question: "PagedAttention 中 block table 的作用是什么？"
options:
  - "记录模型每层权重的量化比例"
  - "把请求的逻辑 KV blocks 映射到物理 KV blocks"
  - "为 beam search 排序所有候选 token"
  - "替代 Transformer 的位置编码"
answer: 1
explain: "block table 类似页表，让逻辑连续的 KV cache 可以存放在非连续物理显存块中，并支持按需分配和共享。"
```

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
H2O 提出 Heavy-Hitter Oracle，把 KV cache 淘汰建模为在线选择少量高累计注意力 token 的问题，并用 heavy-hitter cache 加 recent cache 在固定显存预算内维持生成质量。

#### 🎯 核心要点
- 发现预训练 LLM 的注意力矩阵高度稀疏，少数 token 的累计注意力呈 power-law 分布并主导生成质量
- 将关键 token 定义为 Heavy Hitters，即在历史解码中反复获得高注意力权重的 token
- 使用本地累计注意力近似无法观测的未来全局重要性，在线更新 token 分数
- 缓存预算同时分配给 heavy-hitter tokens 和 recent tokens，兼顾远程关键信息与短程局部依赖
- 将 KV cache eviction 形式化为 dynamic submodular maximization，并给出贪心选择的近似保证
- 无需训练或改模型参数，可接入 OPT、LLaMA、GPT-NeoX 等自回归模型的推理阶段

#### 🔬 深入细节
![H2O 总览图](https://arxiv.org/html/2306.14048v1/x1.png)
*图：论文 Figure 1，展示 H2O 与静态稀疏、局部窗口等缓存策略的差异，图片来源为 arXiv HTML。*

```python
# H2O KV cache eviction, simplified from the paper
hh_scores = defaultdict(float)
cache = OrderedDict()

for t, token in enumerate(decode_stream):
    logits, attn, new_kv = model.decode(token, kv_cache=cache)

    # aggregate across heads/layers in practice; here attn[pos] is attention to cached token pos
    for pos, weight in aggregate_attention(attn).items():
        hh_scores[pos] += weight

    cache[t] = new_kv

    if len(cache) > total_budget:
        recent = set(last_positions(cache, recent_budget))
        candidates = set(cache.keys()) - recent
        heavy = topk(candidates, key=lambda p: hh_scores[p], k=hh_budget)
        keep = recent | heavy
        evict_everything_except(cache, keep)
```

H2O 的动机不是“让注意力计算更快”这么宽泛，而是针对解码阶段的状态内存瓶颈：KV cache 随 batch size 和序列长度线性增长，长对话或长文生成时甚至可能接近或超过模型权重显存。传统稀疏注意力多面向训练时的二次复杂度，KV 量化则降低每个 K/V 的 bit 数；H2O 选择另一条路径，直接减少缓存中的 token 数。

论文的关键实证观察有两个。第一，归一化注意力矩阵在 LLM 中天然很稀疏，论文用“每行最大值 1% 作为阈值”观察到多数层的 sparsity 超过 95%。第二，对历史 token 的注意力做累计后，分数呈 power-law，极少数 token 占据大部分注意力质量；把这些 heavy hitters mask 掉会导致准确率明显下降，而只保留 heavy hitters 加最近 token 仍能接近 full cache。

机制上，H2O 为每个历史位置维护累计注意力分数。可以把第 \(j\) 个 token 在时刻 \(t\) 的重要性写成：

$$
s_j(t)=\sum_{\tau=j+1}^{t}\sum_{h \in \mathcal{H}} A_{\tau,j}^{(h)}
$$

其中 \(A_{\tau,j}^{(h)}\) 是第 \(h\) 个 attention head 在生成第 \(\tau\) 个 token 时分配给位置 \(j\) 的注意力。实际系统会按层/头聚合这个分数；当缓存超过预算时，保留累计分数最高的 \(B_{hh}\) 个历史 token，并额外保留最近 \(B_r\) 个 token：

$$
C_t = \operatorname{TopK}_{B_{hh}}(s_1(t), \ldots, s_{t-B_r}(t)) \cup \{t-B_r+1,\ldots,t\}
$$

recent cache 是一个必要补丁：累计注意力有滞后性，新出现的实体、约束或语法依赖还没有足够时间积累高分，如果只按累计分数淘汰，新 token 会被系统性低估。H2O 因而把“长期重要性”和“短期新鲜度”拆成两个预算池，而不是只做 LFU 或只做滑动窗口。

论文还把这个在线淘汰过程解释为 dynamic submodular problem。理想情况下，如果能看到未来所有 query，最优 cache 应该最大化被保留 token 对未来 attention 的覆盖；但未来不可见，H2O 使用当前可见的本地 attention 统计做贪心近似。论文给出的非正式保证是，在 mild assumption 下，贪心得到的集合 \(\tilde{S}_i\) 满足：

$$
f(\tilde{S}_i) \ge (1-\alpha)(1-1/e)\max_{|S|=k} f(S)-\beta
$$

这条式子的直觉是：如果 attention coverage 具有边际收益递减，持续选择累计贡献高的 token 与经典子模最大化的 greedy 选择一致，因此不需要枚举所有淘汰序列。

推理流程分为 prompt phase 和 token generation phase。prompt phase 正常生成所有初始 KV；generation phase 每一步先用当前 cache 解码，再从 attention 权重中更新分数，最后执行淘汰。工程实现上，论文强调不必为被淘汰 KV 做显存搬移，而是让新 KV 直接填入被释放的位置，从而降低 eviction 造成的内存 I/O 开销。

与纯 Local/Sliding Window 相比，H2O 可以保留远处但持续被访问的实体、主题词或格式约束；与 Sparse Transformer 的固定 strided/fixed pattern 相比，它的可见集合随生成内容动态变化；与 KV quantization 相比，它减少的是序列维度而不是数值精度。主要风险也来自这里：一旦重要 token 被淘汰，后续 attention 无法恢复它，所以分数估计、recent 预算和总预算比例会直接决定质量上限。

#### 🧪 练习题
```yaml
question: "H2O 为什么同时保留 heavy-hitter tokens 和 recent tokens？"
options:
  - "heavy-hitter tokens 负责长期高注意力信息，recent tokens 保护尚未积累分数的新近依赖"
  - "recent tokens 用来替代所有 attention 计算"
  - "heavy-hitter tokens 只用于训练 tokenizer"
  - "两个集合只是为了让 batch size 恒定"
answer: 0
explain: "累计注意力能识别长期关键 token，但对刚出现的 token 有滞后；recent cache 防止新信息被过早淘汰。"
```

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
Scissorhands 提出“重要性持久化”假设，用历史注意力识别未来仍可能关键的 pivotal tokens，并在固定 KV cache 预算下优先保留这些 token，从而实现无需微调的测试时缓存压缩。

#### 🎯 核心要点
- 观察到 Repetitive Attention Pattern：不同生成位置会反复关注相同的一小批历史 token
- 提出 Persistence of Importance Hypothesis：过去显著影响生成的 pivotal tokens 未来仍更可能显著影响生成
- 用 attention score 大于平均值阈值 \(\alpha=1/t\) 定义 pivotal token，并用 persistence ratio 验证重合度
- 采用固定预算 KV buffer，超预算时依据历史窗口内的低注意力计数淘汰非关键 token
- 永久保护 recent window，因为最新 token 的重要性尚未被充分观测
- 历史窗口、最近窗口和丢弃量在实验中取 \(w=400\)、\(r=10\)、\(m=0.5B\)，可降低压缩频率开销
- 可与 4-bit quantization 叠加，论文报告 KV cache 最高 5x 压缩且进一步达到更高组合压缩率

#### 🔬 深入细节
![Scissorhands 重复注意力模式](https://ar5iv.labs.arxiv.org/html/2305.17118/assets/x1.png)
*图：论文 Figure 1(a)，展示同一句子中某个生成位置对少数历史位置的高注意力，图片来源为 ar5iv 对 arXiv 源文的 HTML 转换。*

![Scissorhands 持久化比例](https://ar5iv.labs.arxiv.org/html/2305.17118/assets/x4.png)
*图：论文 Figure 2(a)，不同层上的 persistence ratio 多数超过 95%，说明后半段 pivotal tokens 大多已在前半段出现过。*

```python
# Scissorhands budgeted KV cache, simplified from Algorithm 1/2
cache_k, cache_v = [], []
low_score_count = defaultdict(int)

for t, token in enumerate(decode_stream):
    logits, attn, new_kv = model.decode(token, kv_cache=(cache_k, cache_v))
    cache_k.append(new_kv.key)
    cache_v.append(new_kv.value)

    if len(cache_k) > budget:
        low_score_count.clear()

        # collect influence evidence over a recent history window
        for i in range(max(0, t - history_window), t + 1):
            for pos, score in attention_row(i).items():
                if score < 1.0 / max(1, i):
                    low_score_count[pos] += 1

        # newest tokens are protected because their future importance is still unknown
        protected = set(range(max(0, t - recent_window + 1), t + 1))
        candidates = [p for p in cache_positions() if p not in protected]
        evict = topk(candidates, key=lambda p: low_score_count[p], k=drop_amount)
        remove_from_cache(cache_k, cache_v, evict)
```

Scissorhands 面对的问题与普通剪枝不同：模型参数不变，推理仍是自回归的，但 KV cache 的长度不能无限增长。论文以 OPT-175B 为例说明，batch size 128、sequence length 2048 时 KV cache 可达约 950GB，足以超过权重内存。因而它要压缩的是“序列维度上的缓存条目”，不是权重量化，也不是训练阶段的稀疏注意力。

核心观察叫 Repetitive Attention Pattern。作者在 C4 上用 OPT-6B 可视化多个生成位置的 attention map，发现位置 178、228、278 等不同 query 会反复把高注意力分配给类似的历史位置，例如 27、63、98、121、152、177。这说明“谁重要”不是完全随 query 随机变化，而有跨时间的稳定性。

论文把这个稳定性形式化为 pivotal token。若位置 \(t\) 对历史 token 的注意力超过阈值 \(\alpha\)，该历史 token 属于 \(S_t\)。对区间 \([a,b]\) 的 pivotal token 集合定义为：

$$
S_{a \rightarrow b}=\bigcup_{t=a}^{b}S_t
$$

为验证“过去重要的未来仍重要”，论文定义 persistence ratio：

$$
\operatorname{PersistenceRatio}
=\frac{|S_{t+1 \rightarrow l}\cap S_{0 \rightarrow t}|}
{|\{x \mid x \in S_{t+1 \rightarrow l}, x \in \{x_1,\ldots,x_t\}\}|}
$$

实验中取 \(t=l/2\)、\(\alpha=1/t\)。结果显示多数层 persistence ratio 超过 95%，同时 \(|S_{0\rightarrow t}|/t\) 明显小于 1，排除了“所有 token 都重要”的平凡解释。这是 Scissorhands 能在线预测未来重要 token 的经验基础。

算法上，Scissorhands 维护固定大小 \(B\) 的 KV buffer。每次缓存超过预算，不是每步都立即重排所有历史，而是在长度为 \(w\) 的历史窗口里收集重要性证据。论文的 Algorithm 2 用低注意力事件作为淘汰信号：若某 token 在多个历史 attention row 中低于平均注意力 \(1/t\)，它的低分计数增加；压缩时优先丢弃低分计数高、且不在最近窗口内的位置。

完整 attention head 输出为：

$$
a_t=\sum_{i=1}^{t}\alpha_{t,i}\mathcal{V}_t[i],
\quad
\alpha_{t,i}=
\frac{\exp(\langle x_tW_K,\mathcal{K}_t[i]\rangle)}
{\sum_{j=1}^{t}\exp(\langle x_tW_K,\mathcal{K}_t[j]\rangle)}
$$

压缩后只在保留下来的 \(n\le B\) 个 KV 上计算估计输出：

$$
\hat{a}_t=\sum_{i=1}^{n}\hat{\alpha}_{t,i}\bar{\mathcal{V}}_t[i],
\quad
\hat{\alpha}_{t,i}=
\frac{\exp(\langle x_tW_K,\bar{\mathcal{K}}_t[i]\rangle)}
{\sum_{j=1}^{n}\exp(\langle x_tW_K,\bar{\mathcal{K}}_t[j]\rangle)}
$$

这里的风险在于 softmax 归一化分母也被改写了：被删 token 不仅失去 value contribution，也会改变注意力质量在剩余 token 间的分配。Scissorhands 的理论分析用 power-law attention 假设解释为什么删掉低分 token 时误差可控；直觉上，如果注意力质量高度集中，删除尾部低分项对输出向量的扰动相对小。

recent window 的作用与 H2O 类似但理由更直接：新 token 还没有足够历史 attention row 来证明自己是 pivotal token。若不保护最近 \(r\) 个 token，算法会偏向保留“已经被多次观测到”的旧 token，从而误删刚出现但语义关键的内容。论文实验中 \(r=10\)、\(w=400\)，并用 \(m=0.5B\) 控制压缩频率，避免每个解码步都额外做一次历史窗口统计。

与 H2O 相比，Scissorhands 更强调“重要性持久化”的可验证假设，并通过 persistence ratio 来证明未来 pivotal set 与过去 pivotal set 高度重叠；H2O 更强调 heavy-hitter cumulative attention 与 dynamic submodular greedy。与纯 sliding window 相比，Scissorhands 能保留远距离关键 token；与 KV quantization 相比，它减少 KV 条目数，并且可以和 4-bit quantization 正交叠加。

#### 🧪 练习题
```yaml
question: "Scissorhands 为什么要保护 recent window？"
options:
  - "因为最新 token 尚未积累足够历史注意力证据，直接按历史分数淘汰会低估它们"
  - "因为 recent window 可以恢复所有被淘汰 token"
  - "因为只有 recent token 会参与 softmax 分母"
  - "因为模型训练时只见过最近 10 个 token"
answer: 0
explain: "Scissorhands 的重要性估计依赖历史 attention，最新 token 数据不足，因此用 recent window 避免早删。"
```

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
KIVI 提出一种无需微调的非对称 2-bit KV cache 量化方法，用 Key 的 per-channel 量化和 Value 的 per-token 量化分别匹配二者不同的误差模式，从而在长上下文和大 batch 推理中显著降低显存与带宽压力。

#### 🎯 核心要点
- 对 KV cache 分布做系统分析：Key 存在固定通道 outlier，Value 没有稳定通道 outlier 但对 token 级误差隔离更敏感
- Key cache 使用 per-channel group-wise 2-bit 非对称量化，避免异常通道污染普通通道的 scale
- Value cache 使用 per-token group-wise 2-bit 非对称量化，避免注意力加权求和时少数重要 token 被其他 token 的量化范围拖累
- 将 cache 划分为已量化 grouped cache 与 FP16 residual cache，兼容自回归解码中逐 token 到达的流式写入
- 通过 CUDA/Triton 融合反量化与矩阵乘，减少 2-bit cache 在 attention 读取阶段的额外开销
- 在 Llama/Llama-2、Falcon、Mistral 上验证，可在几乎不损失质量的情况下压缩 KV cache，并提升可承载 batch size 与吞吐

#### 🔬 深入细节
![KIVI 算法总览图](https://ar5iv.labs.arxiv.org/html/2402.02750/assets/x2.png)
*图：论文 Figure 9，KIVI 将历史 Key 分组量化、保留最近 residual，并在 Q_MatMul 中融合反量化与矩阵乘。*

```python
# KIVI prefill + decoding 伪代码
def asym_quantize(x, bits, axis, group_size):
    qmax = 2 ** bits - 1
    xmin, xmax = reduce_minmax(x, axis=axis, group_size=group_size)
    scale = (xmax - xmin) / qmax
    zero = round(-xmin / scale)
    q = clamp(round(x / scale) + zero, 0, qmax)
    return q, scale, zero

def kivi_update(K_cache, V_cache, new_k, new_v, G=32, R=128):
    # 新 token 先进入全精度 residual，避免每步都重排 per-channel Key
    K_cache.residual.append(new_k)
    V_cache.residual.append(new_v)

    if len(K_cache.residual) >= R:
        qk, sk, zk = asym_quantize(K_cache.residual, bits=2,
                                   axis="channel", group_size=G)
        K_cache.grouped.append((qk, sk, zk))
        K_cache.residual.clear()

    if len(V_cache.residual) > R:
        old_v = V_cache.residual.pop_left()
        qv, sv, zv = asym_quantize(old_v, bits=2,
                                   axis="token", group_size=G)
        V_cache.grouped.append((qv, sv, zv))

def kivi_attention(q, K_cache, V_cache):
    k_old = q_matmul_dequant(q, K_cache.grouped)  # fused dequant + matmul
    k_new = q @ K_cache.residual.T
    attn = softmax(concat(k_old, k_new) / sqrt(q.shape[-1]))
    v_old = dequantize(V_cache.grouped)
    v = concat(v_old, V_cache.residual)
    return attn @ v
```

KIVI 的基本出发点是：推理阶段的 KV cache 会随 batch size、prompt length 和生成长度线性增长，而每生成一个 token 都要从 HBM 读取历史 KV，因此瓶颈不只是容量，还有显存带宽。普通量化会把 KV 当作同质张量处理，但论文的实测发现 Key 和 Value 的统计结构并不对称：Key 的大幅值常集中在少数固定 channel，Value 则更像 token 间分布不断变化的激活。

非对称量化本身可以写成：

$$
\hat{x}=s\left(\operatorname{clamp}\left(\operatorname{round}(x/s)+z,0,2^b-1\right)-z\right)
$$

其中 \(b=2\)，\(s\) 是 scale，\(z\) 是 zero-point。KIVI 的关键不是公式复杂，而是 scale/zero-point 的统计轴选择：Key 沿 channel 聚合，使每个异常 channel 有自己的范围；Value 沿 token 聚合，使每个 token 的误差留在本 token 内。若 Key 也 per-token，少数异常 channel 会放大整个 token 的量化范围，导致 attention logits \(QK^\top\) 中普通 channel 的有效精度被浪费；若 Value per-channel，attention 输出里的少数高权重 token 会和其他 token 共享量化范围，误差更容易进入最终输出。

注意力中的 Value 使用方式解释了为什么 Value 必须更重视 token 级误差隔离：

$$
O=\operatorname{softmax}\left(\frac{QK^\top}{\sqrt{d}}\right)V
$$

由于注意力分布通常很稀疏，输出往往由少数重要 token 的 Value 主导。per-token 量化把误差限制在单个 token 内，使不重要 token 的量化范围不会影响重要 token；per-channel 量化虽然可能降低元素级重构误差，却会在跨 token 的加权求和里制造更大的输出误差。论文表格中也体现了这一点：Value 的 per-channel 在最终 attention output 上明显更差。

流式解码是另一个核心难点。Value 的 per-token 量化天然适合逐 token 追加，新 token 量化后可直接沿 token 维拼到旧 cache；Key 的 per-channel 量化需要跨多个 token 统计 scale，所以不能每来一个 token 就单独做完整 per-channel 分组。KIVI 因此把 cache 拆成 \(X_g\) 和 \(X_r\)：

$$
X_K=[X_{K_g};X_{K_r}],\quad X_{K_g}=X_K[:l-r],\quad X_{K_r}=X_K[l-r:]
$$

其中 \(X_{K_g}\) 可被 \(G\) 个 token 一组地量化，\(X_{K_r}\) 是最近的 FP16 residual。论文实验中常用 \(G=32\)、\(R=128\)，这让大部分长历史以 2-bit 保存，同时保留一个高精度局部窗口。这个窗口对 GSM8K 等多步推理任务尤其重要，因为最近 token 往往承载局部推理链和格式约束。

系统实现上，KIVI 不要求重训模型，也不改变 attention 的数学语义；它改变的是 cache 的存储和读取路径。prefill 阶段仍把精确 K/V 传给下一层，只是在内存中保留量化版本；decode 阶段通过 tiled matrix multiplication 在 tile 内完成反量化并计算 \(QK^\top\)，避免先把整个历史 cache 展开成 FP16。这样 KIVI 的收益来自两个方向：cache 容量下降带来更长上下文或更大 batch，cache 读取字节数下降带来更高吞吐。

> 💡 关键：KIVI 不是“把 KV 都压到 2-bit”这么简单，而是把 Key 的 outlier 轴、Value 的注意力混合轴、以及自回归流式写入三个约束同时纳入量化粒度设计。

#### 🧪 练习题
```yaml
question: "KIVI 为什么选择 Key per-channel、Value per-token 的非对称量化组合？"
options:
  - "Key 的异常值更稳定地出现在少数通道，而 Value 的误差需要按 token 隔离以保护注意力输出"
  - "Key 不参与注意力计算，Value 只在训练阶段使用"
  - "per-channel 量化总是比 per-token 量化更省显存"
  - "这种组合可以删除位置编码并减少模型层数"
answer: 0
explain: "Key 的通道级 outlier 会污染 per-token scale；Value 在 attention 加权求和中由少数 token 主导，因此 per-token 误差隔离更稳。"
```

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
GEAR 将 KV cache 压缩建模为“低比特量化主体 + 低秩残差 + 稀疏 outlier”的矩阵近似问题，解决单纯量化或 token dropping 在长序列生成中误差累积、输出偏移的问题。

#### 🎯 核心要点
- 把每层 Key/Value 张量 \(X\in\{K_t,V_t\}\) 近似为 \(\hat{D}+L+S\)，分别对应量化主体、低秩补偿和稀疏补偿
- 使用 outlier-reduced quantization：先抽出极大/极小值形成稀疏矩阵，再对剩余主体做 ultra-low-bit 非对称量化
- 对量化残差做低秩近似，利用 KV cache 在 token 维上的相似性捕获共享误差模式
- 稀疏矩阵保留少量个体 outlier，避免这些值拉大量化 scale 或造成生成 logits 的持续漂移
- 引入 streaming buffer，每隔 \(n_b\) 个新 token 批量重压缩，降低每步压缩开销
- 面向 4-bit KV cache 高倍率近无损压缩，论文报告最高 2.38x 吞吐提升与最高 2.29x 峰值显存降低

#### 🔬 深入细节
![GEAR 低秩补偿效果图](https://ar5iv.labs.arxiv.org/html/2403.05527/assets/x7.png)
*图：论文 Figure 2(d)，展示对残差加入低秩近似后，GEAR 相比单一压缩技术能显著降低 KV cache 近似误差。*

```python
# GEAR KV cache compression 伪代码
def filter_outliers(X, sparsity):
    # 保存 top s/2% 与 bottom s/2% 的极端值，其他位置为 0
    mask = top_bottom_mask(X, ratio=sparsity)
    return X * mask

def gear_compress(X, bits=4, rank=5, sparsity=0.02):
    S = filter_outliers(X, sparsity)
    D = X - S
    qD, scale, zero = asymmetric_quantize(D, bits=bits)
    D_hat = dequantize(qD, scale, zero)

    R = X - D_hat - S
    A, B = randomized_power_iteration(R, rank=rank)
    L = A @ B.T
    return qD, scale, zero, A, B, S

def gear_decode(qD, scale, zero, A, B, S):
    return dequantize(qD, scale, zero) + A @ B.T + S

def streaming_generation(initial_kv, buffer_size):
    compressed = compress_all_layers(initial_kv)
    buffer = []
    while not finished():
        token, new_kv = generate_one_token(compressed, buffer)
        buffer.append(new_kv)
        if len(buffer) == buffer_size:
            compressed = recompress(compressed, buffer)
            buffer.clear()
```

GEAR 的问题设定比普通“压到几 bit”更明确：希望用压缩表示 \(\hat{X}\) 近似每层的 KV cache 张量 \(X\)，并让这个误差在自回归生成中不要累积成 logits 偏移。论文把目标写成 Frobenius 范数近似：

$$
\min_{\hat{D},L,S}\left\|X-\hat{D}-L-S\right\|_{F}
$$

其中 \(\hat{D}\) 是量化后的主干矩阵，\(L\) 是低秩矩阵，\(S\) 是稀疏矩阵。这个拆分的直觉是：KV cache 的多数元素幅度相近，适合低比特量化；量化后剩下的误差并非完全随机，常有 token 维共享结构，适合低秩近似；少数极端元素则不适合被量化主体吸收，适合单独保存。

稀疏补偿先处理 outlier。给定 sparsity \(s\)，论文的过滤器可以理解为：

$$
\operatorname{Filter}_{s}(X)_{ij}=
\begin{cases}
X_{ij}, & X_{ij}\text{ 属于 top 或 bottom }s/2\%\text{ 极值}\\
0, & \text{otherwise}
\end{cases}
$$

这一步的作用不是“再多存一点 FP16”那么简单，而是避免极端值扩大主体量化的动态范围。若不抽出 outlier，4-bit 的有限 codebook 会被少数值占用，主体中大量普通元素的相对误差变大；抽出 \(S\) 后，\(\hat{D}\) 可以更专注地表示多数相近幅度元素。

低秩补偿处理的是结构化残差。量化和稀疏过滤后，残差 \(R=X-\hat{D}-S\) 仍会影响 \(QK^\top\) 和 \(AV\)。GEAR 用

$$
L=AB^\top,\quad A\in\mathbb{R}^{n\times r},\quad B\in\mathbb{R}^{d\times r},\quad r\ll n,d
$$

来近似这部分误差。论文观察到残差谱在前几个奇异值处下降较快，因此很小的 rank 就能捕获主要共享模式；示例配置中 \(n=2048,d=4096,r=5\) 已能达到近无损的高倍率压缩。实现上使用 power iteration 近似 top singular vectors，避免完整 SVD 的高延迟。

推理流程上，GEAR 并不要求改变模型结构。初始 prefill 产生的 KV cache 先被压缩为 \((qD,scale,zero,A,B,S)\)；attention 需要读取某层历史 KV 时恢复 \(\hat{X}=\hat{D}+AB^\top+S\)，再进入标准注意力计算。为了避免每生成一个 token 都重压缩整段历史，GEAR 使用小 buffer \(\mathcal{B}\) 暂存最近 \(n_b\) 个新 KV，到达阈值后把 buffer 与既有 cache 合并并重压缩。这样牺牲很小的额外内存，换取更低在线开销。

与 KIVI 这类按 Key/Value 统计轴选择量化粒度的方法相比，GEAR 的重点在误差分解与补偿。它可以叠加在不同量化方案上，把“量化主体还原不准”的部分再拆给低秩和稀疏项；与 H2O 等 token eviction 相比，GEAR 不删除上下文 token，因此更适合需要完整长上下文证据链的 CoT、数学推理、多轮问答场景。

> 💡 关键：GEAR 的核心不是某一种单独压缩技术，而是承认 KV cache 误差有三类来源，并让量化、低秩、稀疏表示各处理最擅长的一类误差。

#### 🧪 练习题
```yaml
question: "GEAR 中低秩矩阵 L 的主要作用是什么？"
options:
  - "近似量化和稀疏过滤后仍然存在的结构化残差"
  - "删除低注意力分数的历史 token"
  - "把模型权重从 FP16 训练成 INT4"
  - "替换 tokenizer 以减少输入长度"
answer: 0
explain: "GEAR 先用量化主体和稀疏矩阵处理多数元素与 outlier，再用低秩项捕获残差中共享的 token 维结构。"
```

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
CacheGen 将可复用长上下文的 KV cache 编码成可网络传输的压缩 bitstream，并通过变更编码、分层量化、channel-layer 算术编码和加载控制器降低跨请求上下文加载的 TTFT。

#### 🎯 核心要点
- 面向 RAG 和多轮对话中“相同上下文被多个查询复用”的场景，避免每次都重新 prefill 长上下文
- KV encoder/decoder 将原始 KV 张量压缩为 bitstream，在线解码后喂回 LLM 以跳过上下文 attention 计算
- change-based encoding 利用邻近 token 在同层同 channel 上的 KV 数值局部性，以 anchor token 与 delta tensor 表示 chunk
- 层级量化按 transformer 层分配 bit，浅层更高精度、深层更激进压缩
- 算术编码按 channel-layer 建模符号分布，在压缩效率与概率表存储开销之间折中
- loading controller 根据上下文长度、网络带宽、解码开销和 TTFT 预算选择压缩等级，必要时回退到直接加载文本

#### 🔬 深入细节
![CacheGen 系统组件图](https://ar5iv.labs.arxiv.org/html/2310.07240/assets/x6.png)
*图：论文 Figure 6，CacheGen 由离线 KV encoder/decoder 与在线 context-loading controller 组成。*

```python
# CacheGen context KV encoding + loading 伪代码
def encode_context_kv(KV, chunk_size=10, levels=((8, 6, 4), (6, 4, 2))):
    # KV shape: [N_tokens, n_layers, n_channels]
    encoded_versions = {}
    for level in levels:
        bitstreams = []
        for chunk in chunks(KV, chunk_size):
            anchor = vectorwise_quantize(chunk[0], bits=8)
            anchor_decoded = dequantize(anchor)
            deltas = []
            for token_features in chunk[1:]:
                delta = token_features - anchor_decoded
                q_delta = layerwise_quantize(delta, bits=level)
                deltas.append(q_delta)
            stream = arithmetic_encode(anchor, deltas,
                                       prob_model="channel_layer")
            bitstreams.append(stream)
        encoded_versions[level] = bitstreams
    return encoded_versions

def load_context(encoded_versions, bandwidth, ttft_budget, text_context):
    candidates = estimate_transfer_decode_time(encoded_versions, bandwidth)
    level = choose_best_quality_under_budget(candidates, ttft_budget)
    if level is None or candidates[level].time > estimate_prefill(text_context):
        return prefill_from_text(text_context)
    compressed_stream = fetch_stream(encoded_versions[level])
    KV = decode_stream_while_fetching(compressed_stream)
    return resume_llm_with_past_key_values(KV)
```

CacheGen 关注的不是单机 GPU 内 KV cache 太大，而是长上下文服务里的“上下文加载”路径：某个文档、会话历史或检索结果已经被处理过，系统可以复用其 KV cache，但如果把 FP16 KV 直接从存储或远端节点取回，网络传输会成为新的 TTFT 瓶颈。论文把 KV cache 看成形状近似为 \([N,l,c]\) 的张量信号，其中 \(N\) 是 token 数、\(l\) 是层数、\(c\) 是 channel 数，并设计了专门的张量编码器。

第一个机制是 change-based encoding。CacheGen 发现同一 layer、同一 channel 上，邻近 token 的 KV feature 数值具有局部性。它把上下文切成 10 个连续 token 的 chunk，chunk 中第一个 token 是 anchor，用较高精度独立编码；后续 token 不直接编码 \(F_j\)，而是编码相对 anchor 解码值的 delta：

$$
\Delta F_j = F_j - F_i',\quad i=\text{anchor token}
$$

这里使用 anchor 而不是相邻 token 差分，有两个实际原因：多个 token 的 delta 可以并行压缩/解压；自然语言 token 的数值变化不像视频帧那样严格平滑，相对同一 anchor 的收益与相邻差分接近但系统更简单。

第二个机制是层级量化。CacheGen 不删除 token，因为离线压缩时还不知道未来用户 query，也就无法基于 query attention 判断哪些 token 可丢。它改用 quantization 降低每个元素 bit 数，并利用“浅层更敏感、深层更鲁棒”的经验规律分配精度：

$$
(b_{\text{shallow}},b_{\text{middle}},b_{\text{deep}})=(x,y,z),\quad x\ge y\ge z
$$

浅层保留更多 bit，因为浅层误差会继续传到后续层并影响高层语义；深层可以更激进压缩。anchor token 通常仍用 8-bit，因为 anchor 只占每个 chunk 的少数 token，但其误差会影响整个 chunk 的 delta 分布。

第三个机制是算术编码。量化后的符号还可以无损熵编码，但概率模型如果只用一个全局分布，会忽略不同层、channel 的统计差异；如果为每个 token-layer-channel 都建模，概率表开销又过大。CacheGen 的折中是为每个 channel-layer 组合分别维护 anchor 与 delta 的符号分布，共 \(l\times c\) 级别的分布，而不是 \(N\times l\times c\)。论文的微基准显示，相比全局符号分布，这种分组可显著降低 bitstream 大小。

在线加载由 controller 决策。系统可以在离线阶段为同一上下文生成多个压缩等级；当新请求到达时，控制器估计：

$$
T_{\text{load}}(q)=\frac{\operatorname{size}(q)}{\operatorname{bandwidth}}+T_{\text{decode}}(q)+T_{\text{H2D}}(q)
$$

并在 TTFT 预算内选择质量最高的压缩等级 \(q\)。如果上下文很短、带宽很低，或解码加传输比直接文本 prefill 更慢，controller 可以选择加载原始文本并重新计算 KV。这一点让 CacheGen 更像系统级 fast context loading 模块，而不是固定压缩率的张量 codec。

与 KIVI、GEAR 主要服务于 GPU 内存容量和 attention 读取带宽不同，CacheGen 的主战场是跨请求、跨节点、跨存储层移动 KV cache。论文报告在测试管线中可将 KV cache size 降低 3.5-4.3x，并将 fetching plus context processing 的总延迟降低 3.2-3.7x，同时对生成质量影响很小。它也与 GPU 内量化方法正交：CacheGen 可以先把可复用上下文变成可传输 bitstream，解码后再结合其他 KV cache 内存优化。

> 💡 关键：CacheGen 的“压缩”目标不是永久替代 KV cache，而是在请求到来前把上下文 KV 变成小而可流式传输的 bitstream，请求到来后尽快恢复到 LLM 可直接接续生成的 past key values。

#### 🧪 练习题
```yaml
question: "CacheGen 为什么按 channel-layer 而不是按全局分布做算术编码概率建模？"
options:
  - "channel-layer 分组能捕获 KV 符号分布差异，同时避免为每个 token 都存概率表"
  - "全局分布无法用于任何无损编码"
  - "channel-layer 分组会删除深层 token"
  - "这样可以绕过 LLM 的位置编码限制"
answer: 0
explain: "CacheGen 发现 channel 和 layer 的信息增益明显高于 token 位置；按 channel-layer 建模比全局分布更准，又比 token-layer-channel 细粒度建模省概率表。"
```

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
TurboQuant 提出训练无关、在线可用的向量量化框架，先用随机旋转后的近最优标量量化压缩主信号，再用 1-bit QJL 对残差做无偏内积校正，从而把 KV cache 压到约 3/3.5 bit 仍保持注意力内积精度。

> 资料说明：上方 YAML 按任务输入保留；该 `paper_url` 实际指向 TPA。本文方法细节依据 Google Research 官方 TurboQuant 博客和实际论文 `https://arxiv.org/abs/2504.19874`。

#### 🎯 核心要点
- 两阶段压缩：\(Q_{\text{mse}}\) 负责低 MSE 重构，\(Q_{\text{qjl}}\) 负责 residual 的 1-bit 无偏内积估计
- 随机旋转预处理：把任意输入向量映射到球面上坐标近似 Beta/高斯分布，允许逐坐标使用预计算 Lloyd-Max 标量码本
- Inner-product TurboQuant：用 \(b-1\) bit 主量化加 1 bit QJL，在总 bitwidth 为 \(b\) 时直接优化 \(q^\top k\) 这类注意力核心量
- 在线/数据无关：无需 k-means 训练、校准集或离线索引构建，适合生成过程中不断追加的 KV cache
- 理论保证：MSE 与内积失真接近 Shannon 下界，论文给出小常数因子的近最优率
- 系统目标：在 LongBench、Needle-In-A-Haystack 与向量检索中验证低比特 KV/embedding 压缩，Google 官方资料报告 3-bit KV、至少 6x cache 缩减和 H100 attention logits 最高约 8x 加速

#### 🔬 深入细节
![TurboQuant LongBench 压缩效果](https://storage.googleapis.com/gweb-research2023-media/images/Quantization-2.width-1250.png)
*图：Google Research 官方博客中的 LongBench 汇总图，展示 TurboQuant/PolarQuant/KIVI 等方法在不同 bitwidth 下的长上下文效果。*

```python
# Inner-product TurboQuant: b-bit KV cache compression
def setup(d, b):
    Pi = random_orthogonal_matrix(d)              # shared random rotation
    codebook = lloyd_max_codebook(beta_dist(d), bits=b - 1)
    S = gaussian_random_matrix(d, d)              # QJL projection
    return Pi, codebook, S

def quantize_key(x, Pi, codebook, S):
    z = Pi @ normalize(x)
    idx = nearest_centroid_indices(z, codebook)   # (b-1)-bit per coordinate
    x_mse = denormalize(Pi.T @ centroids(idx), norm(x))
    r = x - x_mse
    qjl = sign(S @ r)                             # 1-bit residual code
    return idx, qjl, norm(x), norm(r)

def estimate_attention_logit(q, idx, qjl, x_norm, r_norm, Pi, codebook, S):
    x_mse = x_norm * (Pi.T @ centroids(idx, codebook))
    r_hat = qjl_dequantize(qjl, S, scale=r_norm)
    return dot(q, x_mse) + dot(q, r_hat)
```

TurboQuant 的出发点不是“每个 KV 元素重构得像不像”，而是“query 与 key/value 向量参与计算时，几何关系是否还准”。论文把量化器写作 \(Q:\mathbb{R}^d\rightarrow\{0,1\}^{bd}\)，并同时关心两类失真：重构误差 \(D_{\text{mse}}=\mathbb{E}\|x-\tilde{x}\|_2^2\)，以及内积误差

$$
D_{\text{prod}}=\mathbb{E}_{\tilde{x}}\left[\left|\langle y,x\rangle-\langle y,\tilde{x}\rangle\right|^2\right].
$$

对 KV cache 来说，后者更关键，因为注意力 logits 本质上是 \(QK^\top/\sqrt{d}\)。一个 MSE 很低但有系统性内积偏差的量化器，可能把 softmax 排序、needle 检索和长上下文依赖一起扰乱。

第一阶段 \(Q_{\text{mse}}\) 先乘随机正交矩阵 \(\Pi\)，把最坏输入向量变成球面上“看起来更均匀”的坐标。球面随机点的单坐标服从缩放/平移后的 Beta 分布，高维下接近高斯；坐标间也近似独立。因此 TurboQuant 不需要为每个数据集训练大码本，只要预先为该分布解一维 Lloyd-Max/连续 k-means：

$$
\min_{c_1,\ldots,c_{2^b}}\mathbb{E}_{X}\left[\min_i (X-c_i)^2\right].
$$

量化时每个旋转坐标只存最近 centroid 的索引，反量化时查表再乘 \(\Pi^\top\)。论文给出的细粒度小 bitwidth 结果显示，\(b=1,2,3,4\) 时 MSE 约为 \(0.36,0.117,0.03,0.009\)，并证明大 bitwidth 下接近信息论下界。

第二阶段是 TurboQuant 与普通旋转量化的关键分界：MSE 最优量化并不保证内积无偏。例如 1-bit 下，重构会把所有坐标推向固定幅度的符号向量，\(\langle y,\tilde{x}\rangle\) 往往带乘性偏差。TurboQuant 因此把总预算拆成 \(b-1\) bit 主码和 1 bit 残差码：

$$
r=x-Q_{\text{mse}}^{-1}(Q_{\text{mse}}(x)),\qquad
Q_{\text{prod}}(x)=\left(Q_{\text{mse}}(x),\operatorname{sign}(Sr)\right).
$$

其中 \(S\) 是高斯随机投影矩阵，QJL 的 1-bit 符号码在估计内积时满足

$$
\mathbb{E}\left[\langle y,Q_{\text{qjl}}^{-1}(Q_{\text{qjl}}(r))\rangle\right]=\langle y,r\rangle.
$$

所以最终估计量可以写成 \(\langle y,\tilde{x}_{\text{mse}}\rangle+\langle y,\tilde{r}_{\text{qjl}}\rangle\)：主量化承担绝大多数能量，QJL 用极少 bit 消除残差对内积的系统性偏差。论文给出 \(D_{\text{prod}}\le \frac{\sqrt{3}\pi^2\|y\|_2^2}{d4^b}\) 的界，并列出 \(b=1,2,3,4\) 时约为 \(1.57/d,0.56/d,0.18/d,0.047/d\)。

在推理路径里，TurboQuant 适合 KV cache 的原因是“写入时在线、读取时内积友好”。每生成一个 token，就对新的 K/V 向量执行旋转、查码本和 QJL residual 编码；后续 decode 计算 attention logits 时，可以直接用主码重构项加 residual 校正项近似 \(q^\top k\)。与 KIVI 这类 per-channel/per-token 标量量化相比，它更少依赖动态 scale/zero-point 元数据，也不把目标停留在逐元素误差上。

与 PQ/OPQ 等传统向量检索量化相比，TurboQuant 的优势来自数据无关与 GPU 友好。PQ 需要用数据集训练码本，码本本身也要存储，在线追加 KV 时不自然；TurboQuant 的旋转矩阵和标量码本可复用，写入开销主要是矩阵/向量变换和查表。Google 官方博客还说明 PolarQuant 用极坐标/角度视角去掉传统归一化常数的额外开销，TurboQuant 则把这种低开销主压缩与 QJL residual 组合起来，面向长上下文 KV 与高维向量检索两个场景。

#### 🧪 练习题
```yaml
question: "TurboQuant 为什么要在 MSE 主量化之后再加入 1-bit QJL residual？"
options:
  - "因为 MSE 最优量化可能带来内积估计偏差，QJL 用 1 bit 残差码提供无偏校正"
  - "因为 QJL 可以替代 softmax 并删除 attention 计算"
  - "因为随机旋转只能用于 value cache，不能用于 key cache"
  - "因为 PQ 训练码本必须和每个 prompt 一起保存"
answer: 0
explain: "注意力依赖 query-key 内积；TurboQuant 用主码降低残差范数，再用 QJL 的无偏内积估计修正 residual。"
```

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
BitDecoding 是面向低比特 KV cache 的推理系统，它不是再提出一个更准的量化公式，而是把 2/4-bit KV 的布局、反量化、softmax 同步和 MMA 调度重做成 Tensor Core 可高效消费的 decode kernel。

#### 🎯 核心要点
- 解决低比特 KV cache “省显存但跑不快”的系统问题：既有 KIVI/Atom/QServe 路径大量依赖 CUDA cores，Tensor Cores 利用不足
- BitFusion/布局诱导：利用 `ldmatrix` 和 MMA fragment 的线程-寄存器映射，让 packed low-bit 数据天然对齐 Tensor Core interleaved layout
- Residual Kernel：把新产生的 FP16 residual KV 按 Tensor Core 对齐的块大小 \(N_r\) 融合量化、scale/zero-point 计算和 INT16 packing
- Packing Kernel：读取 packed KV，使用 `lop3` 等位操作快速反量化，并用细粒度异步流水重叠 shared-memory load、CUDA dequant 和 Tensor Core MMA
- Query Transformation：在 GQA/MQA/MHA decode 中把单 token query 重排为更大的 head-group tile，避免 \(Q_{\text{len}}=1\) 导致 Tensor Core underfill
- Multi-warps cooperative softmax：沿 \(N\) 维增加 warp 并行，用 shared memory 完成跨 warp max/sum reduction 和 score 重载
- 架构适配：Ampere/Ada/Hopper 使用 mixed-precision dequant+MMA，Hopper 用 WGMMA/STSM，Blackwell 利用 NVFP4/MXFP4 原生低精度 Tensor Core

#### 🔬 深入细节
![BitDecoding 系统总览](https://arxiv.org/html/2503.18773v3/figs/system.png)
*图：BitDecoding 论文 Figure 7，展示 Query Transformation、Residual Kernel 与 Packing Kernel 三个系统组件。*

```python
# BitDecoding decode-time kernel sketch
def bitdecode_attention(Q, packed_K, packed_V, residual_KV, scales, zeros, cfg):
    Q_tile = transform_query_heads(Q, group_size=cfg.gqa_group)
    acc = 0

    for tile in stream_tiles(packed_K, packed_V):
        # CUDA cores: layout-compatible load + bit unpack/dequant
        K_frag_i = ldmatrix(tile.K_pack, layout=cfg.tc_layout)
        K_deq_i = lop3_dequantize(K_frag_i, scales.K, zeros.K)

        # Tensor Cores: overlap current MMA with next dequant/load
        scores_i = mma(Q_tile, K_deq_i.T)
        acc = cooperative_softmax_update(acc, scores_i, smem_tmp=True)

        V_frag_i = ldmatrix(tile.V_pack, layout=cfg.tc_layout)
        V_deq_i = lop3_dequantize(V_frag_i, scales.V, zeros.V)
        output_i = mma(acc.probabilities, V_deq_i)

    output_res = fp16_attention(Q_tile, residual_KV)
    maybe_pack_residual_block(residual_KV)
    return reduce_heads(output_i + output_res)
```

BitDecoding 的核心判断是：长上下文 decode 的瓶颈已经从纯计算转向 KV 读取和低比特处理的协同。低比特 KV 能把 HBM 访问量降下来，但如果解包、反量化、scale/zero-point 处理全靠 CUDA cores 串行完成，主计算又不能进入 Tensor Cores，端到端 latency 可能被“低比特格式税”吞掉。论文因此把量化格式视为 kernel ABI，而不只是模型压缩格式。

第一层机制是 Tensor Core 友好的低比特布局。BitDecoding 观察到 `ldmatrix` 把 shared memory 数据载入寄存器时，会形成 Tensor Core MMA 所需的 interleaved fragment layout。如果 Residual Kernel 在这个寄存器布局里直接对每个线程负责的数据做量化与 packing，那么写回 global memory 的 packed low-bit KV 会隐式保留 FP16 fragment 的排列。后续 Packing Kernel 用相同 `ldmatrix`/`mma` 配置读取并解包，反量化后的值已经处在 MMA 需要的位置，不需要额外全局重排。

这套布局要求 residual cache 的块大小对齐 packing ratio 和 warp tile。论文把低比特宽度记为 \(\beta\)，packed word 宽度记为 \(\omega\)，packing ratio 为

$$
R=\omega/\beta.
$$

若 \(W_n\) 是沿 \(N\) 维的 warp 数，\(P_n\) 是每个 warp tile 处理的元素数，则 residual block size 设为

$$
N_r=P_n\times W_n\times R.
$$

这样每次把 residual FP16 KV 刷入低比特 cache 时，都会形成完整 Tensor Core fragment，避免半满 tile 和补齐开销。prefill 后，前 \(N_p=L-(L\bmod N_r)\) 个 KV 被 packed，最后 \(L\bmod N_r\) 个留在 FP16 residual cache；decode 每步追加新 KV，residual 达到 \(N_r\) 时再融合量化入 packed cache。

第二层机制是 warp 并行和 cooperative softmax。decode 阶段通常 \(Q_{\text{len}}=1\)，传统沿 \(M\) 维分配多个 warp 很容易空转。BitDecoding 将 \(W_m\) 限制为 1，把更多 warp 放到 \(N\) 维，让多个 warp 同时处理不同 packed chunks 的 dequant 与 MMA。问题是 softmax 的 row-wise max/sum 此时分布在多个 warp 的寄存器里，所以论文引入 \(sTMP\) 和 \(sAcc\) 两个 shared-memory buffer：先做 intra-warp reduction，再通过 shared memory 做 inter-warp reduction，并把 Tensor Core 寄存器中的 \(P\) 分数暂存/重载为后续 \(PV\) 的 MMA 对齐输入。

第三层机制是异步流水。Packing Kernel 的循环里，shared memory 到 register 的 `ldmatrix`、CUDA cores 上的 low-bit dequant、Tensor Cores 上的 `mma` 不是顺序执行到底，而是 producer-consumer 式重叠：第 \(i\) 个 slice 进入 MMA 时，第 \(i+1\) 个 slice 正在加载和反量化。Hopper 上还可用 `tma.copy`、WGMMA 和 `STSM` 把 dequantized FP16 值高效写入 shared memory，供 `wgmma_SS` 直接消费；Blackwell 上则用 NVFP4/MXFP4 原生低精度路径绕过显式 dequant。

Query Transformation 是 BitDecoding 兼容现代 LLM attention 变体的关键。MHA、GQA、MQA 的 KV head 共享比例不同，GQA/MQA 下多个 query heads 共用一个 KV head；BitDecoding 将 query 从类似 \([1,(g_q,h_{kv})]\) 的形状重排为 \([g_q,h_{kv}]\)，把 head group 拼成更大的 GEMM tile。这个操作不改变 attention 语义，只改变 kernel 看到的 tile 形状，从而填满 Tensor Core fragment。

和 KIVI 的关系可以这样理解：KIVI 证明 2/4-bit KV 在精度上可行，BitDecoding 证明它在 GPU 上也能高效执行。论文评估显示，在 Blackwell、Hopper、Ada/Ampere 等 GPU 上，相比 FP16 FlashDecoding-v2 平均约 7.5x、最高 8.6x 解码加速；在 LLaMA-3.1-8B 128K context 的单 batch decode 中端到端 latency 降低约 3x，同时 4-bit 精度退化约 0.2%。这些收益主要来自低比特布局和 Tensor Core 共同设计，而不是单纯减少 cache 字节数。

#### 🧪 练习题
```yaml
question: "BitDecoding 中 residual block size 设为 N_r = P_n × W_n × R 的主要目的是什么？"
options:
  - "让 packed low-bit KV 与 Tensor Core warp tile 和 packing ratio 对齐，避免低利用率 fragment"
  - "强制所有模型使用 MHA，取消 GQA/MQA"
  - "把 KV cache 全部留在 FP16 residual buffer 中"
  - "用更大的 tokenizer vocab 替代低比特反量化"
answer: 0
explain: "N_r 对齐 Tensor Core 的 N 维 tile、warp 数和 packing ratio，使量化后的块可以被 ldmatrix/MMA 高效消费。"
```

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
ChunkKV 把 KV cache 剪枝的基本单位从孤立 token 改成连续语义 chunk，通过整块保留高注意力片段和跨层复用保留索引，减少 H2O/SnapKV 类 token 级压缩造成的语义碎片化。

> 资料说明：上方 YAML 按任务输入保留；该 `paper_url` 实际是 KV cache 优化综述。本文方法细节依据 ChunkKV 实际论文 `https://arxiv.org/abs/2502.00299` 与 OpenReview 版本。

#### 🎯 核心要点
- 基本压缩单元改变：按固定大小 chunk 聚合连续 token，整块保留或丢弃，避免只留下关键词而丢掉主谓宾/限定关系
- 注意力聚合评分：用 observe window 的 query 对全体 key 计算注意力分数，再对每个 chunk 内 token 的分数求和得到 chunk score
- Top-\(k\) chunk selection：在预算 \(L_{\max}\) 下选择 \(\lfloor L_{\max}/c\rfloor\) 个最高分 chunk，同时保留原始顺序
- Recent/observe window 拼接：压缩 cache 后用原始 KV 的最后 \(w\) 个 token 替换/拼接，保留近邻生成信息
- Layer-wise index reuse：利用 ChunkKV 保留索引在相邻层间更相似的现象，在每组 \(N_{\text{reuse}}\) 层中只在首层计算索引，其余层复用
- 训练无关：不改模型、不微调、不训练边界检测器；chunk size 在论文中通常取 10，消融显示 10-20 较稳健
- 评测覆盖 LongBench、Needle-In-A-HayStack、GSM8K、JailbreakV 和 DeepSeek-R1/LLaMA/Qwen/Mistral 等模型

#### 🔬 深入细节
![ChunkKV 语义保留示意](https://arxiv.org/html/2502.00299v4/x1.png)
*图：ChunkKV 论文 Figure 1。token 离散选择容易只保留问题相关词而漏掉主体/对象，chunk 选择则保留更完整语义片段。*

```python
# ChunkKV compression
def chunkkv(Q, K, V, observe_window_w, chunk_size_c, max_cache_len):
    # Use recent queries to observe which past positions matter.
    A = Q[-observe_window_w:] @ K.T
    num_chunks = ceil(len(K) / chunk_size_c)

    scores = []
    for i in range(num_chunks):
        left = i * chunk_size_c
        right = min((i + 1) * chunk_size_c, len(K))
        scores.append(A[:, left:right].sum())

    k = floor(max_cache_len / chunk_size_c)
    chosen_chunks = topk_indices(scores, k)
    chosen_token_idx = flatten_chunks_in_original_order(chosen_chunks, chunk_size_c)

    K_comp = K[chosen_token_idx]
    V_comp = V[chosen_token_idx]

    # Keep the most recent/observe window tokens for local generation stability.
    K_comp = replace_tail_with_recent(K_comp, K[-observe_window_w:])
    V_comp = replace_tail_with_recent(V_comp, V[-observe_window_w:])
    return K_comp, V_comp, chosen_token_idx
```

ChunkKV 的问题设定非常直接：KV cache 显存近似随 batch、序列长度、层数、head 数、head 维度线性增长。论文给出的 float16 估算式可写为

$$
M_{\text{KV}}\approx 2\times B\times S\times L\times N\times D\times 2\ \text{bytes},
$$

其中第一个 2 表示 K/V 两份矩阵，最后一个 2 表示 FP16 字节数。长上下文下，token 级 eviction 能降显存，但它把语言片段拆成离散点，可能保留“eat”“bamboo”等高分词，却丢掉“pandas in the wild”这类限定上下文，后续层需要从破碎词集合里重建语义。

方法主体是 chunk-level attention aggregation。设 \(Q_{T_q-w:T_q}\) 是最近 \(w\) 个 query，ChunkKV 先计算 observe attention：

$$
A=Q_{T_q-w:T_q}K^\top.
$$

给定 chunk size \(c\)，key 序列被划分为 \(C=\lceil T_k/c\rceil\) 个连续块。第 \(i\) 个 chunk 的分数为该块内 token 注意力的总和：

$$
A_i=\sum_{j=(i-1)c+1}^{ic} A_{:,j}.
$$

随后选择 \(k=\lfloor L_{\max}/c\rfloor\) 个最高分 chunk，并按原序排列其 token index 生成 \((K',V')\)。这个排序细节很重要：模型仍然看到原文本中的相对顺序，而不是被 top-k 排序打乱的片段。

observe window 的处理体现了 ChunkKV 对“远程语义”和“局部生成”的折中。远程历史由 top chunk 保存，最近 \(w\) 个 token 则从原始 KV cache 直接拼接或替换到压缩 cache 尾部，类似 H2O/SnapKV 中 recent window 的直觉：当前 token 的下一个预测通常强依赖临近上下文，不能只按历史 chunk 分数抽样。

Layer-wise index reuse 是它的系统优化。论文观察到，ChunkKV 选择的是连续语义块，因此相邻层保留下来的 token index 比 SnapKV/H2O 更一致；表中 LLaMA-3-8B、Qwen2-7B、Mistral-7B 上 ChunkKV 相邻层 Jaccard similarity 分别约为 57.74%、44.26%、52.16%，明显高于 token 级方法。于是每 \(N_{\text{reuse}}\) 层为一组，只在组内第一层运行 ChunkKV 得到 \(\mathcal{I}_l\)，后续层直接用

$$
K_{l+r}'=K_{l+r}[\mathcal{I}_l],\qquad V_{l+r}'=V_{l+r}[\mathcal{I}_l],\quad 0<r<N_{\text{reuse}}.
$$

这把“每层重新计算 chunk 分数”的额外开销降下来。论文报告复用索引可减少压缩时间，吞吐提升约 26.5%，并指出相比 FullKV 基线压缩时间约降 20%、性能损失约 0.5%。

从理论解释看，ChunkKV 借用了 in-context learning 的 distinguishability 视角：token 级 sparsification 给历史序列 \(o_{1:t-1}\) 注入离散噪声，会提高区分正确概念 \(\theta^\star\) 与候选 \(\theta\) 所需的 KL 条件；chunk 级保留则让被选中的示例或语义片段更完整，局部依赖链没有被均匀打断。简化地说，token 级方法把所有示例都“轻微污染”，ChunkKV 更像保留少数干净示例、丢弃低价值示例，因此在 many-shot GSM8K、多文档 QA 和 NIAH 检索这类依赖局部完整证据的任务上更稳。

与 H2O/SnapKV 的差异不在于是否用注意力分数，而在于分数的作用粒度。H2O/SnapKV 用单 token score 排名，预算利用更细，但容易破坏短语和实体关系；ChunkKV 用 chunk score 排名，可能牺牲一点 token 级最优预算，却换来语义连贯性、跨层索引复用和更低调度复杂度。论文也承认固定 chunk 对法律/生物医学这类逐字忠实任务可能不够理想，未来可按句法/语义边界自适应切块，但这会增加推理时边界检测开销。

#### 🧪 练习题
```yaml
question: "ChunkKV 相比 H2O/SnapKV 这类 token 级剪枝，最核心的设计变化是什么？"
options:
  - "以连续语义 chunk 为单位聚合注意力分数并整块保留/丢弃"
  - "把所有 KV cache 都量化成 1-bit"
  - "取消 recent/observe window，只保留最旧 token"
  - "训练一个新 Transformer 替代原模型"
answer: 0
explain: "ChunkKV 的关键是压缩粒度从单 token 变成 chunk，从而保留主谓宾、实体限定等连续语义关系。"
```

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
Speculative Decoding 提出“draft model 先猜、target model 并行验证”的无损解码框架，用拒绝采样校正草稿分布偏差，解决大模型自回归采样每个 token 都必须串行前向的延迟瓶颈。

#### 🎯 核心要点
- 两模型协同：目标模型 \(M_p\) 定义最终分布，近似模型 \(M_q\) 低成本生成 speculative tokens
- 每轮草稿长度为 \(\gamma\)：\(M_q\) 串行采样 \(\gamma\) 个候选，\(M_p\) 一次并行计算 \(\gamma+1\) 个位置的 logits
- 接受规则：候选 \(x\) 以 \(\min(1,p(x)/q(x))\) 接受，拒绝时从 \((p-q)_+\) 的归一化分布采样修正 token
- 分布保证：输出边际分布与直接从 \(M_p\) 逐 token 采样一致，属于 lossless inference acceleration
- 加速条件：收益由接受率 \(\alpha=\sum_x\min(p(x),q(x))\)、草稿长度 \(\gamma\)、小模型相对成本 \(c\) 共同决定
- 工程特点：无需改动或重训目标模型，可用于 T5-XXL、LaMDA 等既有 Transformer 推理链路

#### 🔬 深入细节
![Speculative Decoding Figure 1](https://ar5iv.labs.arxiv.org/html/2211.17192/assets/figure1.png)
*图：论文 Figure 1，绿色为被目标模型接受的草稿 token，红色为被拒绝的草稿 token，蓝色为校正采样得到的 token；示例中一次目标模型调用可产出多个 token。*

```python
# Speculative Decoding, using p as target distribution and q as draft distribution.
while len(output) < max_new_tokens:
    draft_tokens = []
    draft_probs = []

    # 1) Cheap model proposes gamma speculative tokens autoregressively.
    for _ in range(gamma):
        q_i = draft_model.next_token_distribution(prefix + draft_tokens)
        x_i = sample(q_i)
        draft_probs.append(q_i)
        draft_tokens.append(x_i)

    # 2) Expensive model scores all speculative positions in one parallel pass.
    # p_dists[j] is p(. | prefix + draft_tokens[:j]).
    p_dists = target_model.parallel_distributions(prefix, draft_tokens)

    # 3) Verify from left to right; stop at the first rejection.
    accepted_all = True
    for j, x_j in enumerate(draft_tokens):
        p_j = p_dists[j]
        q_j = draft_probs[j]
        accept_prob = min(1.0, p_j[x_j] / q_j[x_j])

        if uniform(0, 1) <= accept_prob:
            prefix.append(x_j)
        else:
            correction = relu(p_j - q_j)
            prefix.append(sample(correction / correction.sum()))
            accepted_all = False
            break

    # 4) If every draft token is valid, use the extra target distribution.
    if accepted_all:
        prefix.append(sample(p_dists[gamma]))
```

##### 动机与背景

标准自回归采样的关键瓶颈不是一次矩阵乘是否足够快，而是生成 \(K\) 个 token 需要 \(K\) 次依赖前一步输出的目标模型调用。即使 accelerator 可以并行计算多个位置，普通解码也无法提前知道未来 token，因此只能把大模型权重一轮又一轮从 HBM 搬到计算单元。Leviathan 等人的核心观察是：很多 token 对小模型来说也“足够容易”，可以先低成本猜一段，再让大模型一次性检查这段猜测。

##### 接受-拒绝机制

设目标模型在当前前缀下的分布为 \(p(x)\)，draft model 的分布为 \(q(x)\)。draft 采到候选 \(x\) 后，用下面的概率接受：

$$
a(x)=\min\left(1,\frac{p(x)}{q(x)}\right)
$$

如果 \(q(x)\le p(x)\)，说明 draft 没有过度提出这个 token，候选必然被接受；如果 \(q(x)>p(x)\)，说明 draft 对该 token 的概率质量高于目标模型，只接受 \(p(x)/q(x)\) 的部分。第一次拒绝发生时不能简单回退到 target sampling，因为已经观察到“draft 过度提出了某个 token”这个事件；因此论文从剩余正概率质量采样：

$$
r(x)=\frac{(p(x)-q(x))_+}{\sum_y (p(y)-q(y))_+}
$$

这个修正分布只在 \(p\) 比 \(q\) 更大的 token 上有质量，刚好补回 draft 提案机制没有覆盖够的目标概率。

##### 为什么分布不变

单步看，候选被接受并输出为 \(x\) 的概率质量是 \(q(x)\min(1,p(x)/q(x))=\min(p(x),q(x))\)。若发生拒绝，补偿采样给 \(x\) 的额外质量是 \((p(x)-q(x))_+\)。两者相加：

$$
\min(p(x),q(x))+(p(x)-q(x))_+=p(x)
$$

因此每个位置输出的边际分布仍然是目标模型 \(p\)。多 token 情况下从左到右验证，一旦拒绝就丢弃后续草稿，因为后续草稿条件在新 token 下已经失效；若全部接受，则额外从目标模型为第 \(\gamma+1\) 个位置算出的分布采样一个 token，从而不浪费这次并行前向。

##### 加速模型

论文把接受率写成 draft 与 target 的重叠概率：

$$
\alpha=\mathbb{E}_{x\sim q}\left[\min\left(1,\frac{p(x)}{q(x)}\right)\right]=\sum_x\min(p(x),q(x))
$$

\(\alpha\) 越大，连续接受多个草稿 token 的概率越高。在独立近似下，每轮 target 调用期望产出的 token 数为：

$$
\mathbb{E}[N]=1+\alpha+\alpha^2+\cdots+\alpha^\gamma=\frac{1-\alpha^{\gamma+1}}{1-\alpha}
$$

如果 draft model 单次前向成本是 target model 的 \(c\)，一轮 speculative decoding 的近似时间成本是 \(1+\gamma c\)，所以理想 walltime improvement 可写成：

$$
\text{speedup}\approx\frac{1-\alpha^{\gamma+1}}{(1-\alpha)(1+\gamma c)}
$$

这解释了为什么 \(\gamma\) 不是越大越好：更长草稿增加潜在产出，但也线性增加小模型成本，并且后面 token 只有在前面全部接受后才有机会生效。

##### 与传统方法的区别

Speculative Decoding 不是把大模型替换成小模型，也不是只在贪心解码下做近似匹配。只要实现接受率和校正分布，随机采样、温度采样等非确定性输出都能保持目标模型分布。它与多 token 预测头也不同：这里的 proposer 是一个完整的外部近似模型，优点是无需改目标模型，缺点是生产系统要额外加载、调度、缓存和版本管理 draft model。

> 💡 关键：加速来自“用一次 target 前向验证多个条件位置”，正确性来自“接受 draft 中目标模型也认可的概率质量，拒绝时只从剩余目标概率质量采样”。

#### 🧪 练习题
```yaml
question: "Speculative Decoding 在拒绝 draft token 后为什么要从 (p-q)_+ 归一化分布采样？"
options:
  - "为了让 draft model 继续生成后续 token"
  - "为了补回 target 分布中被 draft 提案不足的概率质量"
  - "为了降低目标模型的显存占用"
  - "为了把采样退化成贪心解码"
answer: 1
explain: "接受部分贡献 min(p,q)，拒绝后的校正分布贡献 (p-q)_+，两者相加才恢复目标模型分布 p。"
```

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
Speculative Sampling 将 draft-verify 解码形式化为严格的修改版拒绝采样算法：小模型先生成长度 \(K\) 的草稿，大模型一次并行评分并校正拒绝事件，从而在不改变目标模型采样分布的前提下降低大模型调用次数。

#### 🎯 核心要点
- 算法对象：draft model \(p(\cdot|\cdot)\) 负责提案，target model \(q(\cdot|\cdot)\) 定义最终采样分布
- lookahead 参数 \(K\)：每轮先自回归生成 \(K\) 个草稿 token，再由 target model 并行计算 \(K+1\) 组 logits
- 修改拒绝采样：候选以 \(\min(1,q(x)/p(x))\) 接受，拒绝时从 \((q-p)_+\) 归一化分布采样
- 严格证明：每个输出 token 的边际分布等于 target model，分布一致性只受硬件数值误差影响
- 系统分析：在 Chinchilla 70B、XSum、HumanEval 等设置中讨论 \(K\)、接受率、循环耗时和端到端加速的权衡
- 与 Leviathan 同期独立：核心算法一致，但该论文更强调分布证明、分布式大模型 serving 和经验速度上限分析

#### 🔬 深入细节
![Speculative Sampling Figure 1](https://ar5iv.labs.arxiv.org/html/2302.01318/assets/x1.png)
*图：论文 Figure 1，展示不同 lookahead \(K\) 下生成 128 token 的耗时、接受 token 占比与每轮循环时间；该论文没有单独的架构总览图，因此这里使用其官方 ar5iv 实验图说明草稿长度的系统权衡。*

```python
# Paper notation: q is the target model, p is the draft model.
while n < target_length:
    draft = []
    p_dists = []

    # 1) Generate K draft tokens with the faster model.
    for t in range(1, K + 1):
        p_t = draft_model.next_token_distribution(prefix + draft)
        x_t = sample(p_t)
        p_dists.append(p_t)
        draft.append(x_t)

    # 2) Score K+1 target distributions in parallel.
    # q_dists[t] = q(. | prefix + draft[:t])
    q_dists = target_model.parallel_distributions(prefix, draft)

    # 3) Modified rejection sampling from left to right.
    all_accepted = True
    for t, x_t in enumerate(draft):
        p_t = p_dists[t]
        q_t = q_dists[t]
        accept_prob = min(1.0, q_t[x_t] / p_t[x_t])

        if uniform(0, 1) <= accept_prob:
            prefix.append(x_t)
        else:
            residual = relu(q_t - p_t)
            prefix.append(sample(residual / residual.sum()))
            all_accepted = False
            break

    # 4) If all K drafts are accepted, sample one extra target token.
    if all_accepted:
        prefix.append(sample(q_dists[K]))
```

##### 动机与背景

Transformer 训练时能并行处理整段序列，但采样时每个 token 都依赖上一个采样结果，因此大模型调用次数等于生成长度。Chen 等人的出发点是硬件层面的：对一个很大的 target model 来说，一次前向并行评分一小段 continuation 的延迟，常常接近只评分下一个 token 的延迟；如果这些 continuation 来自一个快得多的 draft model，就有机会用一次 target 调用产出多个 token。

##### 算法流程

论文的 Algorithm 2 使用 lookahead \(K\)。每一轮先让 draft model \(p\) 自回归采样 \(\tilde{x}_1,\dots,\tilde{x}_K\)，然后 target model \(q\) 在同一次并行调用里计算：

$$
q(\cdot|x_{\le n}),\ q(\cdot|x_{\le n},\tilde{x}_1),\ \dots,\ q(\cdot|x_{\le n},\tilde{x}_{1:K})
$$

验证必须从左到右执行，因为第 \(t+1\) 个草稿 token 的条件前缀包含第 \(t\) 个草稿 token。如果第 \(t\) 个 token 被拒绝，后续草稿都不再对应真实前缀，需要全部丢弃；如果 \(K\) 个 token 全部接受，则可以利用第 \(K+1\) 组 target logits 再采一个额外 token。

##### 分布校正证明

对固定前缀和单个候选位置，draft 采到 token \(x\) 的概率是 \(p(x)\)，接受概率是：

$$
\min\left(1,\frac{q(x)}{p(x)}\right)
$$

因此“由 draft 直接输出 \(x\)”的概率质量是：

$$
p(x)\min\left(1,\frac{q(x)}{p(x)}\right)=\min(p(x),q(x))
$$

如果发生拒绝，算法从 residual 分布采样：

$$
r(x)=\frac{(q(x)-p(x))_+}{\sum_y(q(y)-p(y))_+}
$$

拒绝分支给 \(x\) 的概率质量正好是 \((q(x)-p(x))_+\)。两部分相加：

$$
\Pr[X=x]=\min(p(x),q(x))+(q(x)-p(x))_+=q(x)
$$

这就是论文“modified rejection sampling”严谨性的核心。它保证的是同分布采样，而不是同随机种子下逐 token 位级一致；实际系统中，伪随机数消耗顺序和并行计算数值误差都会让输出文本不同，但样本分布应与 target model 保持一致。

##### lookahead 的工程权衡

\(K\) 增大时，单轮 target 调用可能接受更多 token，理论上减少大模型调用次数；但 draft 需要做更多串行小模型调用，target 评分的序列也更长，而且越靠后的草稿 token 只有在前面全被接受时才有效。论文 Figure 1 显示 \(K\) 过大后速度会平台化甚至回退，例如 XSum 的 nucleus sampling 最优 \(K\) 可落在较小值附近。这说明 speculative sampling 的调参目标不是最大化草稿长度，而是最大化“每轮有效接受 token 数 / 每轮总延迟”。

##### 与经典投机解码的关系

该论文和 Leviathan 等人的 Speculative Decoding 是同期独立工作，数学机制几乎等价：一个快模型提出候选，一个慢模型并行验证，拒绝时使用正部差值分布校正。DeepMind 版本的表达更偏系统与采样理论：它明确区分 target \(q\) 与 draft \(p\)，把算法写成 auto-regressive target/draft models 的通用伪代码，并在 Chinchilla 分布式推理中验证速度提升与样本质量不变。

> ⚠️ 注意：如果实现时把拒绝分支写成“直接从 target \(q\) 采样”，分布会偏向 target 高概率 token，因为已接受分支已经消耗了一部分 \(\min(p,q)\) 的概率质量。

#### 🧪 练习题
```yaml
question: "Speculative Sampling 中 target model 为什么要计算 K+1 组 logits？"
options:
  - "为了训练 draft model"
  - "为了在 K 个草稿全被接受时还能额外采样一个 target token"
  - "为了减少词表大小"
  - "为了让每个 token 使用不同温度"
answer: 1
explain: "target 并行评分草稿前缀上的 K 个位置，同时多算一个后继位置；若所有草稿都接受，这个额外分布可直接产出下一个 token。"
```

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
Medusa 在原 LLM 的最后隐藏状态上附加多个未来 token 解码头，用候选树和 tree attention 一次验证多条 continuation，从而把 speculative decoding 的外部 draft model 替换为单模型内部的轻量 proposer。

#### 🎯 核心要点
- 多解码头：第 \(k\) 个 Medusa head 预测位置 \(t+k+1\) 的 token，原始 LM head 仍预测 \(t+1\)
- 候选树：每个 head 取 top-\(s_k\) 预测，按层组合成多条候选 continuation，而不是只提出一条草稿路径
- tree attention：通过树形 attention mask 让同一路径上的 token 彼此可见，不同分支互相隔离，从而一次前向验证多候选
- 两类训练：Medusa-1 冻结 backbone 只训练 heads，支持相对原模型的无损加速；Medusa-2 联合微调 backbone 和 heads，速度更高但需保护原模型能力
- 接受策略：可复用 speculative decoding 的拒绝采样保持分布一致，也可用 typical acceptance 提升接受率但放弃严格同分布
- 工程收益：不需要单独 draft model，减少显存占用、分布式调度复杂度和 draft-target 分布错配

#### 🔬 深入细节
![Medusa Figure 1](https://arxiv.org/html/2401.10774v3/x1.png)
*图：论文 Figure 1，Medusa 在 LLM 顶部增加多个 heads 预测后续 token，将多个 top predictions 组装成候选树，再用 tree-based attention 并行验证并接受最长合法前缀。*

```python
# Medusa decoding with tree candidates.
while len(output) < max_new_tokens:
    hidden_t, base_logits = base_model.forward_last(prefix)

    # 1) Candidate generation: original LM head predicts t+1,
    #    Medusa heads predict t+2 ... t+K+1.
    levels = []
    levels.append(topk(softmax(base_logits), s0))
    for k, head in enumerate(medusa_heads, start=1):
        logits_k = head(hidden_t)
        levels.append(topk(softmax(logits_k), s[k]))

    # 2) Build candidate tree from selected top predictions.
    tree = build_tree_from_levels(levels)
    tree_mask, tree_positions = make_tree_attention_mask(tree)

    # 3) Verify all tree nodes in one base-model pass.
    verified_logits = base_model.forward_tree(prefix, tree.tokens, tree_mask, tree_positions)

    # 4) Accept the longest prefix under rejection sampling or typical acceptance.
    accepted_prefix = select_longest_accepted_prefix(tree, verified_logits, mode="typical")
    prefix.extend(accepted_prefix)
```

##### 动机与背景

经典 speculative decoding 的瓶颈从“只跑大模型”变成“同时部署大模型和 draft model”。这在生产系统里不是免费操作：draft model 要占显存，要维护 KV cache 和 tokenizer 一致性，要处理 distributed serving 中两个模型的调度，还要保证 draft 足够接近 target，否则接受率低；但 draft 太大又会吞掉加速收益。Medusa 的设计目标是保留“先提出候选、再由原模型验证”的框架，同时把 proposer 变成原模型上的附加 heads。

##### Medusa heads 如何提出候选

给定原模型在位置 \(t\) 的最后隐藏状态 \(h_t\)，Medusa 添加 \(K\) 个额外解码头。第 \(k\) 个 head 输出：

$$
p_t^{(k)}=\mathrm{softmax}(W_k f_k(h_t))
$$

它预测的是未来第 \(k+1\) 个位置，即 \(x_{t+k+1}\)；原始 LM head 负责 \(x_{t+1}\)。训练 heads 时可以使用加权交叉熵：

$$
\mathcal{L}_{\text{heads}}=-\sum_t\sum_{k=1}^{K}\lambda_k\log p_t^{(k)}(x_{t+k+1})
$$

这个目标让每个 head 学会“站在当前 hidden state 上向前看”。它并不替代原模型 logits；候选最终仍要被 backbone 验证，因此 heads 的角色是提高每轮可验证候选的质量和多样性。

##### 候选树与 tree attention

如果每个 head 只取 top-1，Medusa 只能提出一条长度 \(K+1\) 的路径；一旦早期 token 错了，后面的预测都失效。论文改为每层取 top-\(s_k\)，构造候选树。笛卡尔积树的候选节点数为：

$$
N_{\text{tree}}=\sum_{k=1}^{K}\prod_{i=1}^{k}s_i
$$

tree attention 的关键是 mask：一个节点只能 attend 到同一路径上的祖先节点和原 prompt，不能看到兄弟分支。这样，同一次 forward 可以像处理一个 packed sequence 一样处理多条候选路径，但每个节点的条件上下文仍与真实自回归路径一致。位置编码也要按树路径调整，否则同一深度或不同分支的 token 会被错误解释。

##### 接受规则：无损和近似两种模式

Medusa 可以直接复用 speculative decoding 的拒绝采样：把 head/tree 产生的候选当作 proposal，用 backbone 计算的 logits 作为 target 分布，按 \(\min(1,p_{\text{target}}/p_{\text{proposal}})\) 接受并在拒绝时校正。这种方式在 Medusa-1 中尤其清晰，因为 backbone 冻结，目标分布就是原模型分布。

论文还提出 typical acceptance，用原模型概率判断候选是否“足够典型”。候选 token \(x_{n+k}\) 可被接受的条件写作：

$$
p_{\text{original}}(x_{n+k}|x_{1:n+k-1})>\min\left(\epsilon,\delta\exp(-H(p_{\text{original}}(\cdot|x_{1:n+k-1})))\right)
$$

其中 \(H(\cdot)\) 是 entropy，\(\epsilon\) 是硬阈值，\(\delta\exp(-H)\) 是随分布熵变化的阈值。直觉是：如果原模型分布很尖锐，就只接受非常高概率 token；如果分布熵高，说明多个 continuation 都合理，可以放宽接受。该策略通常带来更长接受前缀，但不再保证与原模型逐 token 采样严格同分布。

##### 训练策略与工程落点

Medusa-1 冻结 backbone，只训练新增 heads，内存和风险较低；因为原模型参数不动，若使用 rejection sampling，输出分布可相对原模型保持 lossless。Medusa-2 则联合训练 backbone 与 heads，提高 heads 的预测准确率和接受长度，但需要保留 next-token 能力。论文使用两阶段思路：先得到可用 heads，再用带权损失联合微调；当原训练数据不可用或模型经过 RLHF 时，可通过 self-distillation 让模型自己生成与当前输出分布匹配的数据。

与外部 draft model 相比，Medusa 的部署面更简单：只加载一个模型，heads 的参数量远小于单独小模型，候选验证仍复用 backbone 和 KV cache 机制。代价是目标模型结构需要增加 heads，并且 tree attention、候选树剪枝、接受阈值都要在推理框架里实现。论文实验显示 Medusa-1 已可在不牺牲质量的情况下达到约 2.2x 以上加速，Medusa-2 在更多设置下进一步提高速度。

> 💡 关键：Medusa 的本质不是“让 heads 直接生成答案”，而是“用 heads 低成本扩大候选集合，再让原模型用树形上下文一次性判定哪些前缀可信”。

#### 🧪 练习题
```yaml
question: "Medusa 为什么需要 tree attention？"
options:
  - "为了让不同候选分支共享所有未来 token"
  - "为了在一次前向中验证多条候选路径，同时避免分支之间互相泄漏上下文"
  - "为了删除原始 LM head"
  - "为了把所有候选都强制接受"
answer: 1
explain: "tree attention 用树形 mask 保证每个候选节点只看到自己的祖先路径，因此能并行验证多候选而不破坏自回归条件。"
```

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
EAGLE 提出 Extrapolation Algorithm for Greater Language-model Efficiency，把投机草稿从离散 token 预测改成目标模型第二顶层特征预测，并用向前错位的 token 序列消除采样分支带来的特征不确定性。它仍用标准 speculative sampling 验证候选，因此在 greedy 和非 greedy 采样下都保持目标 LLM 的输出分布不变。

#### 🎯 核心要点
- 草稿阶段不直接自回归预测 token，而是预测目标 LLM 的 second-to-top-layer feature
- 复用目标模型的 Embedding layer 和 LM Head，只训练轻量 Autoregression Head
- 将 feature sequence 与提前一个时间步的 token sequence 拼接，显式注入已经发生的采样结果
- 训练目标由 Smooth L1 特征回归损失和 LM Head 后的分类损失共同组成，默认 \(L=L_{reg}+0.1L_{cls}\)
- 推理阶段用 tree attention 生成树形草稿，再由目标 LLM 一次前向并行验证树中候选
- 验证阶段沿用 speculative sampling 的接受/拒绝规则，理论上保持原始生成分布
- 在 Vicuna、LLaMA2-Chat、Mixtral 8x7B Instruct 及 MT-bench、HumanEval、GSM8K、Alpaca 上验证，LLaMA2-Chat 70B 报告 2.7x-3.5x 延迟加速

#### 🔬 深入细节
![EAGLE 推理流水线](https://ar5iv.labs.arxiv.org/html/2401.15077/assets/x6.png)
*图：论文 Figure 6 展示 EAGLE 的草稿模型流水线；蓝色模块复用目标 LLM 参数，黄色 Autoregression Head 是需要训练的轻量模块，底部展示 3 次草稿前向构造 10-token tree 的过程。*

```python
# EAGLE feature-level speculative decoding, simplified from the paper
while not finished:
    # 1. Target LLM computes exact features for the accepted prefix.
    F_prefix = target_llm.second_to_top_features(prefix)
    shifted_tokens = prefix[1:] + [last_sampled_token]

    # 2. Draft a token tree in feature space.
    draft_tree = Tree(root=prefix)
    frontier = [draft_tree.root]
    for depth in range(tree_depth):
        batch_inputs = []
        for node in frontier:
            fused = concat(node.feature, target_embedding(node.shifted_token))
            batch_inputs.append(fused)

        next_features = autoregression_head(batch_inputs)
        next_probs = target_lm_head(next_features)
        children = sample_topk_children(next_probs, next_features)
        draft_tree.attach(frontier, children)
        frontier = children

    # 3. Target LLM verifies all tree nodes in one pass with tree attention.
    target_probs = target_llm.verify_tree(prefix, draft_tree)
    accepted, replacement = speculative_accept_or_resample(
        draft_tree=draft_tree,
        draft_probs=draft_tree.probs,
        target_probs=target_probs,
    )
    prefix.extend(accepted or [replacement])
```

EAGLE 先把普通自回归过程拆成特征和 token 两层。目标模型在前缀 \(T_{1:j}\) 上的标准一步生成可以写成：

$$
T_{1:j}\rightarrow E_{1:j}\rightarrow f_j\rightarrow
p_{j+1}=\mathrm{LM\_Head}(f_j)\rightarrow t_{j+1}.
$$

传统 speculative sampling 通常让一个小 draft model 直接产生 \(\hat{T}_{j+1:j+\gamma}\)。问题在于 token 是离散、多峰且对上下文模板敏感的变量，弱 draft model 很容易和目标 LLM 分布错位；Medusa 虽然利用目标模型 feature，但多头直接预测未来 token，仍要处理“未来第几个 token 到底是什么”的离散不确定性。EAGLE 的核心判断是：目标模型 LM Head 前的高层 feature 更连续、更结构化，在这个空间做短程外推更容易。

仅预测 feature 还不够，因为采样本身会造成分支不确定性。论文用 “I” 后面可能采样到 “am” 或 “always” 的例子说明：同一个 \(f_I\) 后续会走向不同的 feature 序列，若草稿模型只看 \(F_{1:i}\)，下一特征目标并不唯一。因此 EAGLE 输入 \(T_{2:i+1}\) 这条“提前一个时间步”的 token 序列，把实际采样结果也喂给草稿模型：

$$
\hat f_{i+1}=\mathrm{Draft\_Model}(T_{2:i+1},F_{1:i}).
$$

这个设计的直觉是：feature 提供连续语义状态，shifted token 告诉模型刚刚选择了哪条离散分支，两者合起来才能定义下一步 feature 的监督目标。工程上，EAGLE 将 token 经过目标模型 Embedding 得到 \(e\)，与 \(f\) 拼接成 \(2d\) 维向量，再经 FC 降回 \(d\) 维，最后由一个 decoder layer 预测 \(\hat f\)。Embedding 和 LM Head 冻结复用目标 LLM，新增训练参数集中在 Autoregression Head。

训练目标同时约束“像真实 feature”和“经过 LM Head 后像真实 token 分布”。论文使用 Smooth L1 做 feature regression：

$$
L_{reg}=\mathrm{SmoothL1}\left(f_{i+1},
\mathrm{Draft\_Model}(T_{2:i+1},F_{1:i})\right),
$$

并把真实和预测 feature 都送入目标 LM Head：

$$
p_{i+2}=\mathrm{Softmax}(\mathrm{LM\_Head}(f_{i+1})),\quad
\hat p_{i+2}=\mathrm{Softmax}(\mathrm{LM\_Head}(\hat f_{i+1})),
$$

$$
L_{cls}=\mathrm{CrossEntropy}(p_{i+2},\hat p_{i+2}),\quad
L=L_{reg}+w_{cls}L_{cls},\quad w_{cls}=0.1.
$$

这里的分类损失不是为了替代 feature regression，而是把最终目标拉回“候选 token 是否更可能被目标模型接受”。推理时 Autoregression Head 会连续消费自己预测出来的 feature，存在误差累积风险；论文用在目标 feature 上加入 \(\mathcal U(-0.1,0.1)\) 噪声的数据增强，让训练时就暴露于轻微 feature 偏移，从而提高多步草稿稳定性。

验证阶段仍是 lossless 的关键。EAGLE 用 tree attention 构造树形草稿，目标 LLM 一次前向给出树中每个候选 token 的目标概率 \(p\)。对每个 draft token \(\hat t_{j+i}\)，接受概率沿用 speculative sampling：

$$
\min\left(1,\frac{p_{j+i}(\hat t_{j+i})}{\hat p_{j+i}(\hat t_{j+i})}\right).
$$

若拒绝，则丢弃后续候选，并从

$$
\mathrm{norm}(\max(0,p_{j+i}-\hat p_{j+i}))
$$

中重采样替换 token。由于最终提交的 token 都经过目标模型概率校正，EAGLE 改变的是“每次前向能验证多少候选”，而不是目标模型定义的文本分布。

与标准 speculative decoding 相比，EAGLE 不依赖同系列的小模型作为 draft model，因此 7B 这类没有合适小草稿模型的场景也能加速；与 Medusa 相比，它没有直接在 token 空间猜多个未来位置，而是在 feature 空间逐步外推并通过目标 LM Head 采样。论文结果也说明 feature&shifted-token 的组合比仅 token、仅 feature 或 feature&unshifted-token 更有效，核心收益来自“连续空间外推 + 显式消除采样分支歧义”这一组合。

#### 🧪 练习题
```yaml
question: "EAGLE 为什么要把 token sequence 提前一个时间步输入草稿模型？"
options:
  - "让草稿模型知道实际采样走向，减少 feature-level 自回归目标的不确定性"
  - "把目标模型的词表大小减半，从而减少 LM Head 参数量"
  - "绕过 speculative sampling 的验证步骤，直接接受所有草稿 token"
  - "将目标 LLM 的所有 Transformer 层替换为一个小模型"
answer: 0
explain: "feature 序列会随采样 token 分支变化；shifted token 提供已发生的离散采样结果，使下一 feature 的监督目标更确定。"
```

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
EAGLE-2 在 EAGLE 的特征级草稿模型上引入 context-aware dynamic draft tree，用草稿模型置信度近似候选 token 的接受率，并把固定草稿预算动态分配给更可能被目标 LLM 接受的路径。它不额外训练树结构模型，也不放宽验证条件，因此仍是 lossless 的 speculative acceleration。

#### 🎯 核心要点
- 反驳“草稿 token 接受率只由树中位置决定”的静态树假设，证明接受率同时强依赖上下文
- 利用 EAGLE draft model 的 confidence score 近似 acceptance rate，避免调用目标 LLM 估计候选质量
- 定义节点 value 为根到该节点路径上接受概率的乘积：\(V_i=\prod p_j\approx\prod c_j\)
- expansion phase 只扩展当前层 value 最高的 top-\(k\) 节点，避免树宽指数爆炸
- reranking phase 在全树节点中选择 value 最高的 top-\(m\) 节点，并优先浅层节点以保证选出的草稿仍连通
- flatten 动态树为一维序列，并构造只允许访问祖先节点的 attention mask 供目标 LLM 验证
- 不修改 EAGLE draft model、目标 LLM 或 speculative sampling 接受规则，主要收益来自更合理的草稿树形状

#### 🔬 深入细节
![EAGLE-2 动态草稿树](https://ar5iv.labs.arxiv.org/html/2406.16858/assets/x9.png)
*图：论文 Figure 7 展示 EAGLE-2 的扩展和重排过程；边上的数字是 draft confidence，节点括号内是累积 value，最后选中节点被 flatten 成验证序列，并按树结构生成 attention mask。*

```python
# EAGLE-2 context-aware dynamic draft tree, simplified from the paper
tree = DraftTree(root=Node(token=prefix[-1], value=1.0, depth=0))
current_layer = [tree.root]

for layer in range(max_depth):
    # Expansion phase: expand only promising nodes from the latest layer.
    expand_nodes = topk(current_layer, key=lambda n: n.value, k=expand_width)
    next_layer = []
    for node in expand_nodes:
        # EAGLE draft model returns candidate tokens and confidence scores.
        children = eagle_draft_model.expand(node)
        for token, confidence, feature in children:
            child = Node(
                token=token,
                feature=feature,
                confidence=confidence,
                value=node.value * confidence,
                parent=node,
                depth=node.depth + 1,
            )
            tree.add_child(node, child)
            next_layer.append(child)
    current_layer = next_layer

# Reranking phase: keep the globally most valuable connected subtree.
selected_nodes = connected_top_m(
    tree.nodes,
    key=lambda n: (n.value, -n.depth),
    m=verify_budget,
)
draft_tokens, attention_mask = flatten_with_ancestor_mask(selected_nodes)

# Verification remains the same as EAGLE/speculative sampling.
target_probs = target_llm(prefix + draft_tokens, attention_mask=attention_mask)
accepted = speculative_verify(draft_tokens, target_probs, draft_probs)
prefix.extend(accepted)
```

EAGLE-1 采用静态 draft tree：每轮草稿阶段生成相同形状的树，然后让目标模型验证。这个策略隐含了一个强假设，即某个树位置 \(P_i\) 的候选接受率主要由位置决定。EAGLE-2 的第一步是做诊断：同一位置的接受率在不同 query 上方差很大；例如算术前缀 “10+2=” 的下一个 token 非常确定，而 “10+2” 仍可能接 “=” 或 “+” 等分支。静态树会在简单上下文里浪费宽度，也会在困难上下文里没有给足备选分支。

动态树真正困难的是：候选 token 的真实接受率需要目标 LLM 前向结果，而 speculative decoding 的目标正是减少目标 LLM 前向次数。EAGLE-2 利用 EAGLE 的一个经验性质绕开这个矛盾：draft model 的输出概率和最终接受率强正相关。论文报告 confidence 低于 0.05 的 token 接受率约 0.04，而 confidence 高于 0.95 的 token 接受率约 0.98。因此可以把每条边上的 confidence \(c_j\) 当作节点接受率 \(p_j\) 的低成本近似。

对树中节点 \(t_i\)，它只有在根到该节点路径上的所有祖先都被接受时才可能最终提交，所以 EAGLE-2 定义全局 value：

$$
V_i=\prod_{t_j\in \mathrm{Path}(\mathrm{root},t_i)}p_j
\approx
\prod_{t_j\in \mathrm{Path}(\mathrm{root},t_i)}c_j.
$$

这不是单点置信度，而是路径级成功概率。深层节点即使自身 confidence 高，只要前缀路径上有低置信边，整体 value 也会下降；反过来，简单上下文中的单链高置信路径会持续获得较高 value。这个乘积定义直接匹配 speculative sampling 的前缀接受逻辑。

Expansion phase 解决“扩展谁”的问题。树注意力允许同一层多个节点一次送入 draft model，但若每个节点都扩展，节点数会指数增长，草稿模型本身的前向开销会吃掉加速收益。EAGLE-2 因此只从当前最新层选择 value 最高的 top-\(k\) 节点扩展。直觉上，只有高 value 节点的后代才有较大机会出现在最终被接受的前缀中，低 value 分支继续加深意义不大。

Reranking phase 解决“验证谁”的问题。扩展阶段偏向加深树，但 speculative verification 的预算有限，并且 value 随深度一般非增，因为每条边的 \(p_j,c_j\in[0,1]\)。一些没有被继续扩展的浅层节点可能比更深的节点更值得验证。EAGLE-2 会把整棵草稿树的所有节点按 value 重排，选 top-\(m\) 作为最终草稿；同 value 时优先浅层节点。由于一个节点的 value 不大于其父节点，这种 tie-break 可以保持所选节点形成连通树。

最终目标 LLM 仍只能接收一维 token 序列，因此 EAGLE-2 需要把动态树 flatten 成序列，并重新构造 attention mask。普通自回归是下三角 mask，每个 token 可见所有先前 token；树验证中，不同分支之间不能互相看见，否则验证概率就不再对应“沿某条候选路径生成”的概率。EAGLE-2 的 mask 规则是每个节点只看见自己的祖先节点。验证后仍按 EAGLE/speculative sampling 递归接受或拒绝候选，保证输出分布与原目标模型一致。

与 EAGLE-1 相比，EAGLE-2 没有让 draft model 更强，也没有引入额外训练数据，而是在同一草稿模型和验证预算下重新分配节点。论文在 Vicuna、LLaMA2-Chat、LLaMA3-Instruct 以及 MT-bench、HumanEval、GSM8K、Alpaca、CNN/Daily Mail、Natural Questions 上评估，显示 EAGLE-2 通常拥有更长 average acceptance length；ACL 页面摘要报告最高约 5x 加速，arXiv 版本摘要报告 3.05x-4.26x、比 EAGLE-1 快 20%-40%。这些数值说明动态树的收益来自更高的“每次目标前向提交 token 数”，而非牺牲生成一致性。

#### 🧪 练习题
```yaml
question: "EAGLE-2 中节点 value 的主要作用是什么？"
options:
  - "近似该节点整条路径最终被接受的概率，用于选择扩展和验证预算"
  - "记录 token 在词表中的整数编号，用于排序词表"
  - "衡量目标 LLM 参数量大小，用于选择 GPU"
  - "替代 speculative sampling 的拒绝采样规则"
answer: 0
explain: "节点最终被接受需要其祖先路径全部接受，因此 EAGLE-2 用路径上 confidence 的乘积近似全局接受概率。"
```

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
Lookahead Decoding 将自回归解码改写为非线性方程组的 Jacobi 迭代，用目标 LLM 自身在一个并行窗口里生成、缓存并验证 \(n\)-gram 候选，从而无需 draft model、微调或外部 datastore 也能减少串行解码步数。它通过 verification branch 保持与原始解码相同的输出分布，并可用更多每步 FLOPs 换取更少总步数。

#### 🎯 核心要点
- 不训练辅助草稿模型，不修改目标 LLM 参数，也不依赖检索式 datastore
- 将 greedy 自回归生成写成非线性系统，再用 Jacobi decoding 并行更新多个未来 token 位置
- 使用固定大小 2D window 记录 Jacobi trajectory，从中构造多个彼此不相交的 \(n\)-gram
- 维护 \(n\)-gram pool，缓存历史 lookahead branch 生成的候选，供后续 verification branch 查找
- 每个解码步同时执行 lookahead branch 和 verification branch，并用定制 attention mask 隔离两类 token
- verification branch 只验证以当前最后 token 开头的候选，最多并行验证 \(G\) 条，成功则一次接受多个 token
- 支持 greedy 和 sampling 场景；sampling 版本通过逐步拒绝和归一化证明保持目标模型分布
- 可结合 FlashAttention 和多 GPU lookahead parallelism，论文报告 MT-bench 最高约 1.8x、代码补全多 GPU 强扩展最高约 4x 加速

#### 🔬 深入细节
![Lookahead Decoding 工作流](https://ar5iv.labs.arxiv.org/html/2402.02057/assets/x1.png)
*图：论文 Figure 1 展示 \(W=5,N=3,G=2\) 时的 Lookahead Decoding；每步并行生成 lookahead branch、从 \(n\)-gram pool 中验证候选、缓存新 \(n\)-gram，并滑动窗口。*

```python
# Lookahead Decoding, simplified from Algorithm 2
C = set()                         # n-gram pool
output = []
window = random_init(time=N-1, width=W)
last_token = prompt[-1]

for step in range(max_steps):
    # 1. Lookahead branch: modified Jacobi update over W future positions.
    new_row = []
    for j in range(W):
        context = build_visible_context(
            prompt=prompt,
            output=output,
            window=window,
            position=j,
            lookback=N - 1,
        )
        new_row.append(argmax(target_llm.next_token(context)))
    window.append_row(new_row)

    # 2. Verification branch: find promising candidates from the pool.
    candidates = []
    for _ in range(G):
        candidates.append(pop_ngram_starting_with(C, last_token))

    # 3. Verify candidates in parallel with the target LLM.
    accepted = verify_ngrams(
        prompt=prompt + output,
        model=target_llm,
        candidates=candidates,
        mode="greedy_or_sampling",
    )
    output.extend(accepted)
    last_token = output[-1]

    # 4. Cache newly generated n-grams and slide the 2D window.
    for j in range(W):
        C.add(extract_ngram(window, column=j, length=N))
    window.drop_outdated_rows_and_columns()
```

Lookahead 的出发点是：LLM 单 token 自回归解码通常受内存带宽限制，每一步只生成一个 token，GPU 的并行计算能力没有被充分利用。普通 speculative decoding 通过“小模型猜、大模型验”缓解这个问题，但需要一个高接受率、低开销且能泛化到目标模型和任务的数据分布的 draft model。Lookahead 选择不用额外模型，而是重新解释目标 LLM 自身的一步生成能力。

在 greedy 解码下，长度为 \(m\) 的输出可以写成一组必须按顺序求解的问题：

$$
\begin{aligned}
y_1 &= \arg\max P_M(y_1|\mathbf{x}^0),\\
y_2 &= \arg\max P_M(y_2|y_1,\mathbf{x}^0),\\
&\dots\\
y_m &= \arg\max P_M(y_m|\mathbf{y}_{1:m-1},\mathbf{x}^0).
\end{aligned}
$$

论文进一步把它改写成非线性方程组：

$$
f(y_i,\mathbf{y}_{1:i-1},\mathbf{x}^0)
=y_i-\arg\max P_M(y_i|\mathbf{y}_{1:i-1},\mathbf{x}^0)=0.
$$

Jacobi decoding 会从一个随机初始 \(\mathbf{y}^0\) 出发，在每轮同时更新所有位置：

$$
\mathbf{y}^{r}_{1:m}\leftarrow
\arg\max P_M(\mathbf{y}^{r}_{1:m}|\mathbf{y}^{r-1}_{1:m},\mathbf{x}^0).
$$

这个过程最多 \(m\) 轮能得到与自回归一致的固定点，因为每轮至少第一个未定 token 与标准自回归一致。但直接 Jacobi decoding 通常没有实际加速：它在并行位置上生成的 token 经常出现在错误位置，且已正确的 token 可能被下一轮覆盖。Lookahead 的关键改造不是直接提交 Jacobi 序列，而是把 Jacobi 轨迹里相邻时间步、相邻位置形成的 \(n\)-gram 当作“未来可能会用到的草稿片段”缓存起来。

Lookahead branch 维护一个固定大小的二维窗口。宽度 \(W\) 表示向未来并行预测多少个位置，回看长度 \(N-1\) 表示用过去多少轮 Jacobi trajectory 构造 \(N\)-gram。每个解码步对 \(W\) 个位置做一次 modified Jacobi update，并从窗口的纵向轨迹中抽取 \(N\)-gram 加入 pool。例如 \(N=4\) 时，一个候选 4-gram 可以由前三轮在对应位置上的 token 加上当前新生成 token 组成。窗口随后在时间和位置两个维度滑动，保证每步计算量受控。

Verification branch 则把这些候选变成 lossless 加速。它先从 \(n\)-gram pool 里找“promising” 候选，即第一个 token 等于当前已生成序列最后 token 的 \(n\)-gram；然后最多选 \(G\) 条候选并行送入目标 LLM 验证。greedy 场景下，验证逻辑类似 speculative decoding：若候选第 \(i\) 个 token 等于目标 LLM 对相同前缀的 \(\arg\max\)，则接受并继续检查下一位；若全部候选在某一位都失败，则回退到标准目标 LLM 生成一个 token，保证序列至少前进一步。

sampling 场景更复杂，因为 naive speculative decoding 需要保留 draft token 的采样分布；而 Lookahead 的 \(n\)-gram pool 可能长期保存大量候选，若为每个候选保存完整词表分布会不可行。论文的做法是让 lookahead branch 使用 greedy 生成候选，使 draft 分布退化成 one-hot；verification branch 中若候选 \(s_j\) 被拒绝，就将当前目标分布中 \(s_j\) 的概率置零并归一化，再尝试下一条候选。该过程等价于逐步从目标分布中剔除已拒绝 token，论文附录用归纳证明 \(Q(v)=P(v)\)，即算法最终采样任意 token \(v\) 的概率仍等于目标 LLM 原始分布。

Lookahead 的单步同时包含“预测”和“验证”，因此 attention mask 是工程核心。lookahead branch 中不同并行位置只允许看见其 Jacobi 依赖需要的历史 token；verification branch 中候选 \(n\)-gram 只按各自前缀可见；两条 branch 之间互不可见，避免候选之间串扰。论文还将这种自定义 mask hardcode 到 FlashAttention 中，相比直接 PyTorch 实现带来约 20% 端到端收益。

论文用 step compression ratio 描述缩短解码步数的能力：

$$
\mathcal S=\frac{\#\mathrm{generated\ tokens}}{\#\mathrm{Lookahead\ steps}}.
$$

作为对比，单条 speculative decoding 长度为 \(\gamma\)、平均接受率为 \(\alpha\) 时，期望接受 token 数为：

$$
E(\#tokens)=\frac{1-\alpha^{\gamma+1}}{1-\alpha}.
$$

若每步并行验证 \(b\) 条长度为 \(\gamma\) 的候选，则有：

$$
E(\#tokens)=(\gamma+1)-\sum_{i=1}^{\gamma}(1-\alpha^i)^b.
$$

Lookahead 中可近似令 \(b=G=W\)、\(\gamma=N-1\)。若平均每 \(f\) 步有一步找到好候选，其步压缩率可写成：

$$
\mathcal S=\frac{f-1+E(\#tokens)}{f}.
$$

这个公式表达了 Lookahead 的取舍：增加 \(W,N,G\) 会提高每步 FLOPs，但可能减少总解码步数。因为 vanilla decoding 受内存带宽约束，额外 FLOPs 在单 GPU 或多 GPU 上可能原本闲置；Lookahead parallelism 进一步把 disjoint lookahead/verification 分支分配到不同 GPU，每个 GPU 保留完整模型副本，以近零通信换取更低延迟。

#### 🧪 练习题
```yaml
question: "Lookahead Decoding 为什么不需要训练独立 draft model？"
options:
  - "它利用目标 LLM 的 Jacobi 并行更新轨迹生成 n-gram 候选，再由目标 LLM 自己验证"
  - "它删除了验证阶段，因此所有未来 token 都直接提交"
  - "它只在训练阶段使用，推理时仍是普通自回归"
  - "它把所有候选 token 固定为词表中的最高频 token"
answer: 0
explain: "候选来自目标模型自身的并行 lookahead branch，而不是外部草稿模型；verification branch 确保最终输出仍与目标解码一致。"
```

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
EAGLE-3 移除了 EAGLE 的特征回归约束，改用训练时模拟推理多步的直接 token 预测，并融合目标模型低/中/高三层特征来提升草稿质量。它保持投机解码的 target verification 正确性，同时让 draft model 能从更大训练数据中继续获得接受率和加速收益。

#### 🎯 核心要点
- 直接 token 预测：不再要求 draft 输出拟合目标模型顶层 hidden feature，去掉 \(l_{\text{fea}}\) 对表达能力的限制
- 三层特征融合：从目标模型层索引的低层、中层、高层 hidden states 提取 \(l,m,h\)，拼接后投影为融合特征 \(g\)
- Training-time test：训练阶段显式执行多步 draft，把第 1 步预测输出 \(a\) 回灌到第 2/3 步，缩小训练和推理分布差异
- 单层 decoder 草稿模型：融合特征与已采样 token embedding 拼接后输入 draft decoder，再经 LM head 得到 draft token 分布
- 兼容 EAGLE-2 动态树：推理阶段仍可用 context-aware dynamic draft tree 和 tree attention 让 target 一次验证多条候选路径
- Lossless 加速：最终 token 由目标模型按 speculative sampling 接受/拒绝规则决定，不改 target 权重和输出分布
- 数据扩展有效：论文报告 EAGLE-3 相比 EAGLE-2 约 20%-40% 速度提升，最高约 6.5x，相比原 EAGLE 更能受益于 UltraChat 等更大训练数据

#### 🔬 深入细节
![EAGLE-3 推理管线](https://arxiv.org/html/2503.01840v3/x7.png)
*图源：arXiv HTML Figure 5，展示 EAGLE-3 如何用目标模型三层特征、sampled token embedding 和 draft decoder 连续产生多步候选。*

![EAGLE-3 training-time test mask](https://arxiv.org/html/2503.01840v3/x8.png)
*图源：arXiv HTML Figure 6，展示训练时模拟第 1/2/3 轮 draft 的 attention mask。*

```python
# EAGLE-3 推理与训练时测试的核心逻辑
def fuse_target_features(target_trace, i):
    low = target_trace.low_layer[i]
    mid = target_trace.mid_layer[i]
    high = target_trace.high_layer[i]
    return W_fuse @ concat(low, mid, high) + b_fuse

def eagle3_draft(prefix, target_trace, max_depth):
    # target 已在 prefill 或上一轮 verification 中产生 prefix 的特征
    fused = [fuse_target_features(target_trace, i) for i in range(len(prefix))]
    last_token = prefix[-1]
    draft_tokens, draft_probs = [], []
    current_state = fused[-1]

    for depth in range(max_depth):
        x = W_in @ concat(current_state, embed(last_token))
        a = draft_decoder(x)                 # unconstrained vector, not target feature
        q = softmax(lm_head(a))              # direct token distribution
        token = sample_or_topk(q)
        draft_tokens.append(token)
        draft_probs.append(q[token])

        # 后续步无法拿到 target feature g(token)，用上一轮 draft 输出 a 代替
        current_state = a
        last_token = token

    return build_dynamic_tree(draft_tokens, draft_probs)

def training_time_test(tokens, target_traces, steps=3):
    inputs = [fuse_target_features(target_traces, i) for i in range(len(tokens))]
    total_loss = 0
    for s in range(steps):
        mask = make_tree_like_mask(step=s)   # Figure 6 的分步 mask
        a = draft_decoder(inputs, attention_mask=mask)
        logits = lm_head(a)
        total_loss += cross_entropy(logits, next_tokens(tokens, offset=s + 1))
        inputs = feedback_unconstrained_outputs(a, sampled_or_teacher_tokens(tokens, s))
    return total_loss / steps
```

EAGLE-3 的第一处关键变化是“预测目标”的变化。原始 EAGLE 把目标模型顶层特征 \(f_{t+1}\) 当作 draft 的监督目标，再通过目标模型 LM head 得到 token 分布；因此训练目标近似为

$$
\mathcal{L}_{\text{EAGLE}}
= \mathcal{L}_{\text{token}}
+ \lambda \lVert \hat{f}_{t+1}-f_{t+1}\rVert_2^2 .
$$

这个设计让 draft 输出受限于“必须像 target top hidden state”，但推理真正关心的是 token 是否会被目标模型接受。EAGLE-3 去掉 \(l_{\text{fea}}\)，把 draft decoder 的输出 \(a\) 视为 unconstrained vector，只要求经 LM head 后的分布能预测后续 token：

$$
\mathcal{L}_{\text{EAGLE-3}}
= \sum_{s=1}^{S}\operatorname{CE}\left(
\operatorname{softmax}(W_{\text{LM}} a_{t+s}),\; t_{t+s}
\right).
$$

这使 draft model 不再被迫复原目标模型的某一层表示，而是可以学习“对接受率最有用”的中间表示。

第二处变化是三层特征融合。论文指出，顶层特征最贴近“下一个 token 的 logits”，但它对 next-next token 的信息并不充分；低层保留词法/局部模式，中层保留组合结构，高层贴近语义和最终预测。EAGLE-3 在目标模型 forward 后记录三组 \(k\) 维特征，并用线性层压回 hidden size：

$$
g_i = W_g [l_i; m_i; h_i] + b_g,\qquad
[l_i;m_i;h_i]\in\mathbb{R}^{3k},\; g_i\in\mathbb{R}^{k}.
$$

推理第 1 步可直接使用 prefix 中每个位置的 \(g_i\)；从第 2 步开始，候选 token 尚未被 target 验证，无法得到真实 \(g\)，于是用上一轮 draft decoder 输出 \(a\) 代替缺失的 fused feature。这一点正是 EAGLE-3 必须训练时模拟推理的原因。

Training-time test 解决的是“训练只见真实特征，推理却喂自己输出”的分布偏移。训练中先在真实序列上做 native step，再把第一轮预测出的 \(a\) 回灌到下一轮，并用特殊 attention mask 保持树状依赖：原始训练 token 之间是下三角 causal attention，而第 2/3 轮预测 token 只应看到与推理中一致的祖先节点。论文还指出，除 self-attention mask 外，单层 Transformer decoder 的其他部分不需要改动；对于许多 diagonal 的注意关系，可用向量点积减少无效矩阵乘。

推理阶段仍遵循 lossless speculative sampling。draft tree 只提出候选，target model 对树中 token 并行计算概率，并按从前到后的接受规则决定最终输出。若 draft 分布为 \(q\)、target 分布为 \(p\)，链式候选的典型接受概率为

$$
\alpha_i = \min\left(1,\frac{p(t_i\mid x,t_{<i})}{q(t_i\mid x,t_{<i})}\right).
$$

拒绝时从 residual distribution 重新采样并丢弃后续 draft，因此输出分布仍等价于 target 自回归采样。EAGLE-3 的贡献不在于放宽验证，而在于提高候选更早、更长地通过验证的概率。

与 EAGLE-2 相比，EAGLE-3 的创新重点从“如何组织 draft tree”转向“如何训练一个更可扩展的 drafter”。EAGLE-2 用 confidence 估计动态生成和裁剪树，避免静态树浪费；EAGLE-3 继续兼容这套树验证，但通过去掉 feature regression 与融合多层 target 表示提升每个节点的质量。论文消融显示，两项变化都提升 acceptance length；同时训练数据从 ShareGPT 扩展到 UltraChat-200K 后，EAGLE-3 出现了原 EAGLE 不明显的 scaling curve。

> 💡 关键：EAGLE-3 不是让小模型“更像目标模型的一层 hidden state”，而是让它在训练时提前习惯“用自己的输出继续推理”，并把目标模型多层信息压缩成更适合 draft 的状态。

#### 🧪 练习题
```yaml
question: "EAGLE-3 的 training-time test 主要解决什么问题？"
options:
  - "推理时后续 draft 步无法获得 target 的真实融合特征，输入会包含 drafter 自己的输出"
  - "目标模型显存不足，需要把所有权重移到 CPU"
  - "投机解码必须取消 target verification 才能加速"
  - "LM head 无法把 hidden state 映射到 token logits"
answer: 0
explain: "EAGLE-3 在训练中模拟多步 draft 并回灌预测输出，使模型适应推理时用 a 替代缺失 target feature 的分布。"
```

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
P-EAGLE 把 EAGLE-3 的 draft 生成从 \(K\) 次串行自回归前向改成一次并行多 token 预测，用 learnable shared hidden state 和 mask token embedding 填补未来位置缺失的上下文。它同时提出 mask 预计算与序列分区训练，使并行 drafter 能训练到 reasoning LLM 所需的长上下文。

#### 🎯 核心要点
- 并行 drafting：一次 drafter forward 同时预测 \(K\) 个 draft token，减少 EAGLE-3 中随 speculation depth 线性增长的 drafter latency
- NTP/MTP 位置拆分：第 1 个位置是 Next-Token Prediction，使用真实 target hidden states；第 2 到 \(K\) 个 Multi-Token Prediction 位置使用共享可学习 hidden state
- 两个占位参数：\(h_{\text{shared}}\) 替代未来位置缺失的前序 hidden vector，mask token embedding 替代未知的前序 token embedding
- 目标模型三层特征输入：延续 EAGLE-3，从 target layer \(2,L/2,L-1\) 取 hidden states，拼接为 \(3d\) 后投影给 drafter
- 长上下文训练：用 amortized attention mask construction 避免每个样本重建 \(O((nK)^2)\) mask
- 序列分区：在单条长序列内部做 gradient accumulation，同时保持跨 prediction depth 的 \(p \rightarrow p-1\) 依赖
- 生产实现：集成到 vLLM，论文报告在 GPT-OSS 120B/20B、Qwen3-Coder 30B 上比 autoregressive EAGLE-3 快 1.10x-1.36x

#### 🔬 深入细节
![P-EAGLE 架构图](https://arxiv.org/html/2602.01469v1/x2.png)
*图源：arXiv HTML Figure 2，展示 target hidden states、NTP 位置和多个 MTP 位置如何进入 P-EAGLE drafter。*

![P-EAGLE 序列分区图](https://arxiv.org/html/2602.01469v1/x4.png)
*图源：arXiv HTML Figure 4，展示长序列训练时如何按依赖关系切分不同 prediction depth。*

```python
# P-EAGLE: 一次 forward 生成 K 个 draft token
def p_eagle_parallel_draft(prefix, target_trace, K):
    # NTP position: 和 EAGLE-3 一样使用 target 的三层特征
    h_ntp = project(concat(
        target_trace.layer_2[-1],
        target_trace.layer_mid[-1],
        target_trace.layer_last_minus_1[-1],
    ))
    x_ntp = combine(h_ntp, embed(prefix[-1]))

    # MTP positions: 没有真实的上一轮 hidden/token，用可学习占位符
    xs = [x_ntp]
    for depth in range(1, K):
        xs.append(combine(h_shared, embed(mask_token)))

    states = p_eagle_transformer(xs, rope_positions=make_parallel_positions(K))
    logits = [lm_head(s) for s in states]
    draft_tokens = [sample_or_topk(logits[d]) for d in range(K)]
    return draft_tokens

# 论文中的 sequence partitioning 思路
def sequence_partitioning(sampled_positions, S, L):
    boundaries = [i * L / S for i in range(S + 1)]
    assignment = {}

    # depths 0/1 直接按位置切段
    for g in [0, 1]:
        for p in sampled_positions[g]:
            assignment[g, p] = max(s for s in range(S) if boundaries[s] <= p)

    # depth >= 2 继承它依赖的上一 depth 位置，保持 p -> p-1 依赖不跨段
    for g in range(2, len(sampled_positions)):
        for p in sampled_positions[g]:
            assignment[g, p] = assignment[g - 1, p - 1]

    # 每段累积包含 depth-0 的 causal prefix
    ntp_context = {
        s: [p for p in sampled_positions[0] if p < boundaries[s + 1]]
        for s in range(S)
    }
    return assignment, ntp_context
```

P-EAGLE 首先明确 EAGLE-3 的新瓶颈：draft model 本身已经很小，但要生成 \(K\) 个候选 token 仍需 \(K\) 次串行 forward。若 target verification 足够快、draft quality 足够高，继续加大 speculation depth 会让 drafter latency 成为瓶颈。P-EAGLE 的目标不是改变 target verification，而是把 draft 阶段改成并行多 token 预测：

$$
(\hat{t}_{1},\hat{t}_{2},\ldots,\hat{t}_{K})
= D_{\theta}(x_{\text{NTP}},x_{\text{MTP},2},\ldots,x_{\text{MTP},K})
$$

其中 \(x_{\text{NTP}}\) 使用真实前缀和 target hidden states，后续 MTP 位置用共享参数构造输入。这样每个解码轮次只需一次 drafter forward，然后把 \(K\) 个 draft token 交给目标模型验证。

架构上，P-EAGLE 延续 EAGLE-3 的 target-conditioned drafter。目标模型有 \(L\) 层 decoder 时，从第 2 层、第 \(L/2\) 层和第 \(L-1\) 层取 hidden states 并拼接：

$$
h_i^{\text{tar}} = W_p [h_i^{(2)};h_i^{(L/2)};h_i^{(L-1)}] .
$$

第一个 NTP 位置使用 \(h_i^{\text{tar}}\) 和真实上一 token embedding；而 MTP 位置缺少“上一轮预测 token”和“上一轮 draft hidden”。P-EAGLE 用

$$
x_{\text{MTP},d} = \operatorname{combine}(h_{\text{shared}}, e_{\text{mask}}),\qquad d=2,\ldots,K
$$

作为统一占位输入。论文比较了 depth-specific encoding、注入 NTP hidden、两者结合、正则化注入等替代方案，发现简单共享 \(h_{\text{shared}}\) 反而高 7%-15%。直觉是 RoPE 和 attention 已经能表达绝对位置与可见 NTP 上下文，额外显式注入会制造冗余路径并让优化变差。

训练难点来自并行预测的序列展开。长度为 \(n\)、并行深度为 \(K\) 时，朴素训练会产生 \(nK\) 个位置，attention memory 变为

$$
O((nK)^2).
$$

PARD 的 Conditional Drop-token (COD) 用几何保留率 \(r\) 降低位置数：depth 0 保留 \(n\)，depth 1 保留 \(nr\)，depth 2 保留 \(nr^2\)，总位置数约为

$$
L_{\text{eff}} = n(1+r+r^2+\cdots+r^{K-1})
= n\frac{1-r^K}{1-r}.
$$

但 COD 每个样本随机保留的位置不同，传统做法需要逐样本构造跨 depth causal mask，仍有 \(O((nK)^2)\) 构造成本。P-EAGLE 的 mask 预计算利用“同一位置范围的跨 depth 因果结构与总长度无关”这一事实：初始化时构造最大长度 mask，训练时只切出左上角子矩阵，变成常数时间视图操作。

第二个训练难点是单条长序列本身可能装不进显存，普通 batch-level gradient accumulation 无法解决。P-EAGLE 的序列分区把一条序列拆成 \(S\) 段：depth 0/1 可按位置边界分段，depth \(d\ge2\) 的位置 \(p\) 必须继承它依赖的 depth \(d-1\) 位置 \(p-1\) 所在段。这样每段仍保留正确 attention 依赖；同时每段累积包含 depth-0 前缀，以满足 causal attention。峰值 attention memory 从 \(O(L_{\text{eff}}^2)\) 降为约 \(O(L_{\text{eff}}^2/S^2)\)，代价是多个 segment forward/backward 后再累积梯度。

训练目标本质上仍是多 offset 的 token cross entropy。对被 COD 保留下来的位置集合 \(\mathcal{P}_d\)，第 \(d\) 个 prediction depth 预测 \(d+1\) 步后的 token：

$$
\mathcal{L}
= \sum_{d=0}^{K-1}\sum_{i\in\mathcal{P}_d}
\operatorname{CE}\left(
\operatorname{softmax}(W_{\text{LM}} s_{i,d}),\; t_{i+d+1}
\right).
$$

这让 P-EAGLE 学到“同一前缀下多个未来 offset 的分布”，推理时则仍由 target model 验证候选前缀。因而 P-EAGLE 的正确性边界和 EAGLE-3 一样：draft 越准越快，但 draft 不能绕过 target。

与 EAGLE-3 的关系可以概括为：EAGLE-3 提升单步 draft 质量，P-EAGLE 压缩多步 draft latency。论文强调 P-EAGLE 需要 2-4 层 drafter 才能匹配 1 层 autoregressive EAGLE-3 的 acceptance length；因此低 speculation depth 下不一定总赢，但当 \(K=5\) 到 \(7\) 时，一次 4 层 forward 的开销可以被更深的并行候选摊薄，端到端吞吐提升更明显。

> 💡 关键：P-EAGLE 的“并行”不是并行验证，而是把 EAGLE 的草稿生成本身从链式循环变成一个多位置预测问题；target verification 仍然保证输出分布。

#### 🧪 练习题
```yaml
question: "P-EAGLE 为什么需要 learnable shared hidden state 和 mask token embedding？"
options:
  - "MTP 未来位置没有上一轮预测产生的 hidden vector 和 token embedding，需要可学习占位输入"
  - "目标模型不支持 RoPE，需要换成绝对位置编码"
  - "投机解码的 target verification 必须被删除"
  - "长上下文训练不需要 attention mask"
answer: 0
explain: "P-EAGLE 一次预测多个未来 token，后续 MTP 位置缺少自回归步骤中本应产生的上下文，因此用共享 hidden 和 mask embedding 作为可学习占位符。"
```

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
SSD（Speculative Speculative Decoding）把“下一轮 draft 必须等待当前 verification 完成”的串行依赖再投机化：target 正在验证时，draft 设备提前预测可能的验证结果并为这些结果生成后续草稿。论文的优化实例 Saguaro 用验证结果缓存、几何 fan-out、cache-aware sampling 和 batch-aware fallback，让投机解码的 drafting 与 verification 更充分重叠。

#### 🎯 核心要点
- 异步 draft/verify：draft model 独立运行在与 target verifier 不同的硬件上，在 target verification 期间预计算下一轮 speculations
- 验证结果建模：verification outcome 包含接受了多少 draft token 以及 rejection/all-accept 后采样的 bonus token
- Saguaro cache：在有限预算 \(B\) 下选择最可能命中的 outcome，并为每个 outcome 预生成后续 draft
- 几何扇出：按接受长度概率分配每个位置的 bonus token 猜测数 \(F_k\)，而不是 uniform fan-out
- Cache-aware sampling：主动下调 top-\(F\) draft token 的采样概率，使 residual distribution 更集中到缓存 token
- Fallback 策略：cache miss 时根据 batch size 在慢但准的 primary speculator 和快但弱的 backup speculator 之间切换
- Lossless 保证：SSD 只提前准备候选，最终输出仍由 target speculative verification 决定，cache miss 只影响额外计算和等待时间

#### 🔬 深入细节
![SSD 总览图](https://arxiv.org/html/2603.03251v3/x1.png)
*图源：arXiv HTML Figure 1，左侧是普通 speculative decoding，中间是 SSD 在 target 验证时异步预生成多个可能后续草稿。*

![Saguaro sampling 示意](https://arxiv.org/html/2603.03251v3/x5.png)
*图源：arXiv HTML Figure 5，展示 Saguaro sampling 如何在 acceptance rate 与 cache hit rate 之间折中。*

```python
# SSD / Saguaro 的异步推理骨架
def verifier(prompt, target, channel):
    target.prefill(prompt)
    spec_tokens = channel.recv_from_speculator()
    generated = []
    while True:
        outcome = target.verify(spec_tokens)          # 接受长度 + bonus token
        generated.extend(outcome.tokens)
        channel.send_to_speculator(outcome)
        if outcome.has_eos:
            return generated
        spec_tokens = channel.recv_from_speculator()

def speculator(prompt, primary_draft, backup_draft, channel):
    primary_draft.prefill(prompt)
    spec_tokens = primary_draft.speculate(prompt)
    while True:
        channel.send_to_verifier(spec_tokens)

        # target 正在 verify 时，draft 预测可能 outcome 并并行预生成
        outcomes = predict_verify_outcomes(
            spec_tokens,
            logits=primary_draft.cached_logits,
            fanout_strategy="geometric",
        )
        cache = {
            outcome: primary_draft.speculate(prefix_after(outcome))
            for outcome in outcomes
        }

        actual = channel.recv_from_verifier()
        if actual.has_eos:
            return
        if actual in cache:
            spec_tokens = cache[actual]
        else:
            spec_tokens = fallback_speculate(actual, primary_draft, backup_draft)
```

普通 speculative decoding 已经把“一次 target forward 只出一个 token”变成“draft 多个 token，target 一次并行验证”。但它仍有轮次级别的同步点：第 \(r\) 轮 target 没验证完，第 \(r+1\) 轮 draft 就不知道真实前缀是什么，只能等待。SSD 的核心问题就是：能否在等待 target 时提前猜出 verification outcome，并把下一轮 draft 准备好？如果猜中，verification 结束后 speculator 可以立即交出下一轮候选，draft overhead 在关键路径上接近 0。

SSD 把 verification outcome 记为“接受长度 + bonus token”。若当前 speculation 长度为 \(K\)，接受 \(k\) 个 token 后，目标模型还会从 residual distribution 或 target distribution 采样一个 bonus token；因此 outcome 空间约为

$$
|\mathcal{V}_{\text{outcome}}| \approx (K+1)V,
$$

其中 \(V\) 是词表大小。这个空间太大，无法全部预生成。Saguaro 因此把缓存构造写成预算约束问题：给定最多能预生成的 \(B\) 个 outcome，如何分配到不同接受长度 \(k\) 上，最大化 cache hit probability。

Saguaro 的第一项优化是几何 fan-out。令 \(F_k\) 表示“接受 \(k\) 个 token 时，为 bonus token 猜多少个候选”。论文观察 cache miss rate 随 fan-out 近似服从 power law：

$$
1-p_{\mathrm{hit},*}(F)=\frac{1}{F^r},\qquad r>0.
$$

在 draft token 接受率为 \(a_p\)、总预算 \(\sum_{k=0}^{K}F_k\le B\) 下，最优 fan-out 形状是 capped geometric series：

$$
F_k = F_0 a_p^{k/(1+r)}\quad (k<K),
$$

$$
F_K = F_0 a_p^{K/(1+r)}(1-a_p)^{-1/(1+r)}.
$$

直觉是接受长度本身近似几何分布：越靠后的 \(k\) 通常概率越低，不应平均分配猜测预算；但 \(k=K\) 的 all-accept 情况有特殊 bonus token 分布，所以用 capped 项修正。

第二项优化是 Saguaro sampling。普通 speculative verification 在拒绝时会从 residual distribution 采样：

$$
r(t)\propto \max\left(p_{\mathrm{target}}(t)-p_{\mathrm{draft}}(t),0\right).
$$

若 draft 分布在某个 token 上概率太高，residual 反而不容易采到它。Saguaro 反向利用这一点：对 draft logits 的 top-\(F\) token 下调采样权重，让这些 token 在 residual 中更可能出现，从而让 bonus token 更容易落入 cache。给定 draft logits \(z\)、fan-out \(F\) 和下调常数 \(C\in[0,1]\)，采样分布定义为

$$
\sigma_{F,C}(z)_t \propto
\begin{cases}
C\exp(z_t), & t\in \operatorname{top}_F(z),\\
\exp(z_t), & t\notin \operatorname{top}_F(z).
\end{cases}
$$

\(C\) 越小，cache hit rate 越高，但 draft 分布越偏离 target，接受率可能下降。Saguaro 的设计重点不是单调提高 draft acceptance，而是在 end-to-end latency 上平衡 acceptance length 与 cache hit rate。

第三项优化是 fallback。cache miss 在低 batch、低温度时可能较少，但 batch size 增大后，只要 batch 中某个请求 miss，整批都可能等待 fallback speculation。论文给出的策略是根据 batch size 选择 backup speculator：小 batch 可用慢但准的 primary 做 fallback，以保持后续 cache hit；大 batch 下 miss 几乎不可避免，等待慢模型会放大 stall，因此改用更快的 backup speculator。论文用下式刻画 batch 趋大时 speedup 分母会被 backup latency 主导：

$$
\text{speedup}\rightarrow
\frac{
p_{\mathrm{hit}}E_{\mathrm{hit}}+(1-p_{\mathrm{hit}})E_{\mathrm{miss}}
}{
1+T_b
}
\quad \text{as } b\rightarrow\infty .
$$

这里 \(T_b\) 是 backup speculator 时间，说明大 batch 场景下“miss 后尽快恢复流水线”比“用更准但慢的备份”更重要。

正确性上，SSD 没有改变 speculative decoding 的接受/拒绝规则。预生成 cache 只是提前计算“如果 outcome 是 \(v\)，下一轮 draft 是什么”；真实 outcome 仍由 target verifier 产生。若命中 cache，就直接使用对应 draft；若未命中，就退回 fallback 重新 draft。因此 SSD 的失败模式是性能退化和额外 draft 计算，而不是输出分布错误。

与 Leviathan-style speculative decoding 相比，SSD 的新增投机层位于轮次控制流上：传统 SD 投机 token，SSD 投机“验证会怎样结束”。这使它特别适合 target verification 时间足够长、draft 可放在独立设备上并行工作的场景。论文报告 Saguaro 平均比最强 speculative decoding baseline 快约 30%，最高可达 autoregressive decoding 的 5x，但也指出大 batch、temperature 和额外 draft 设备数量会显著影响最优策略。

> 💡 关键：SSD 的 cache 命中不是为了跳过 target，而是为了在 target 刚完成验证时，下一轮 draft 已经在旁路设备上准备好了。

#### 🧪 练习题
```yaml
question: "Saguaro 为什么采用几何 fan-out 而不是在所有接受长度上平均分配缓存预算？"
options:
  - "不同接受长度的验证结果概率近似几何衰减，平均分配会把计算浪费在低概率 outcome 上"
  - "几何 fan-out 可以取消 target verification"
  - "所有 token 的 residual probability 总是完全相同"
  - "batch size 越大就越不需要 fallback"
answer: 0
explain: "Saguaro 将有限预算更多分配给更可能出现的接受长度，并对 all-accept 位置做 capped 修正，从而提高 cache hit rate。"
```

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
FlashAttention 提出 IO-aware 的 exact attention：用分块、online softmax、重计算和 CUDA kernel fusion 避免读写完整 \(N \times N\) 注意力矩阵，解决标准注意力在长序列上受 HBM 带宽和显存容量限制的问题。

#### 🎯 核心要点
- IO-aware 设计：优化 GPU HBM 与片上 SRAM 之间的读写量，而不是改变注意力数学形式
- 分块计算：将 \(Q,K,V\) 切成 tile，把 \(K,V\) 和当前 \(Q\) block 搬入 SRAM 后局部计算
- Online softmax：维护每一行的最大值 \(m\) 和归一化项 \(\ell\)，跨 block 合并 softmax
- 不物化注意力矩阵：前向不把 \(S=QK^\top\) 或 \(P=\mathrm{softmax}(S)\) 写回 HBM
- 反向重计算：只保存输出 \(O\) 与 softmax 统计量，在反向按 block 重算 \(S,P\)
- 理论性质：保持 exact attention，额外显存从 \(O(N^2)\) 降到 \(O(N)\)，HBM 访问量显著低于标准实现
- 扩展能力：论文还给出 block-sparse FlashAttention，用相同 IO-aware 思路加速稀疏注意力

#### 🔬 深入细节
![FlashAttention 论文 Figure 1：IO-aware 分块注意力与速度收益](https://ar5iv.labs.arxiv.org/html/2205.14135/assets/x1.png)
*图：来自 arXiv HTML 版本的 FlashAttention 论文 Figure 1。左侧展示将 \(Q,K,V\) 分块搬入 SRAM、避免在 HBM 中物化大注意力矩阵；右侧展示相对 PyTorch attention 的加速。*

```python
# FlashAttention forward：按 tile 计算 exact attention
# 输入 Q, K, V 位于 HBM；SRAM 只容纳若干 Br x d、Bc x d 的块。
for i in range(num_q_blocks):
    Qi = load_sram(Q_block=i)
    Oi = zeros(Br, d)
    mi = full(Br, -inf)   # 每个 query row 的 running max
    li = zeros(Br)        # 每个 query row 的 running sum exp

    for j in range(num_kv_blocks):
        Kj = load_sram(K_block=j)
        Vj = load_sram(V_block=j)

        Sij = Qi @ Kj.T / sqrt(d)          # Br x Bc，只在片上存在
        mij = rowmax(Sij)
        m_new = maximum(mi, mij)

        Pij = exp(Sij - m_new[:, None])    # 未除以全局归一化项
        l_new = exp(mi - m_new) * li + rowsum(Pij)

        Oi = (exp(mi - m_new)[:, None] * li[:, None] * Oi + Pij @ Vj) / l_new[:, None]
        mi, li = m_new, l_new

    write_hbm(O_block=i, value=Oi)
    save_stats(m_block=i, l_block=i)       # 供 backward 重计算使用
```

标准注意力的数学形式是：

$$
S = QK^\top,\quad P = \mathrm{softmax}(S),\quad O = PV.
$$

问题不在 FLOPs 公式本身，而在执行路径。常规实现通常先调用 GEMM 得到 \(S\)，把 \(S\) 写入 HBM；再读出 \(S\) 做 softmax，把 \(P\) 写入 HBM；最后读出 \(P,V\) 做第二次 GEMM。对于序列长度 \(N\) 远大于 head dimension \(d\) 的情形，\(S\) 和 \(P\) 都是 \(N \times N\)，读写这些中间矩阵会把注意力变成典型 memory-bound 操作。FlashAttention 的核心判断是：近似注意力减少 FLOPs 不一定带来 wall-clock 加速，真正的瓶颈常常是 HBM 往返。

FlashAttention 的分块策略把慢速 HBM 和高速片上 SRAM 的层次显式纳入算法。每次只把一个 \(Q_i\) block 以及一个 \(K_j,V_j\) block 放到 SRAM，在片上计算 \(S_{ij}=Q_iK_j^\top\)、局部指数和局部输出，然后立即把结果合并到当前 \(O_i\)。这样 \(S_{ij}\) 只是临时 tile，不会形成全局 \(N \times N\) 矩阵。论文的 IO 分析给出标准 attention 需要 \(\Theta(Nd+N^2)\) 级别 HBM 访问，而 FlashAttention 在 SRAM 大小为 \(M\) 时需要 \(\Theta(N^2d^2/M)\) 级别 HBM 访问；当 \(d\) 为 64/128、SRAM 为百 KB 量级时，后者显著更小。

难点是 softmax 不是逐 block 独立的：一行的归一化分母需要整行所有 key 的分数。FlashAttention 使用 online softmax，把每行状态压缩为最大值 \(m\) 和指数和 \(\ell\)。若已有旧 block 状态 \((m,\ell,O)\)，新 block 分数为 \(S\)，则更新为：

$$
m'=\max(m,\mathrm{rowmax}(S)),
$$

$$
\ell'=e^{m-m'}\ell+\mathrm{rowsum}(e^{S-m'}),
$$

$$
O'=\frac{e^{m-m'}\ell O+e^{S-m'}V}{\ell'}.
$$

这个合并式的直觉是：不同 block 可以先用各自稳定的最大值做指数，再通过 \(e^{m-m'}\) 把旧尺度换到新的全局尺度。因此算法虽然分块执行，最终得到的 \(O\) 仍等价于一次性对整行 \(QK^\top\) 做 softmax；它不是稀疏、低秩或采样近似。

反向传播同样围绕 IO 优化。标准实现为了反向通常保存 \(P\)，这会产生 \(O(N^2)\) 激活显存。FlashAttention 只保存前向输出 \(O\) 与每行 softmax 统计量 \((m,\ell)\)，反向时重新加载 \(Q,K,V\) block，在 SRAM 内重算局部 \(S\) 和 \(P\)，再计算 \(\mathrm{d}Q,\mathrm{d}K,\mathrm{d}V\)。这看起来增加了计算，但减少了大矩阵的 HBM 读写；在 GPU 上，少量额外 FLOPs 往往比大量 HBM 访问便宜。

从工程实现看，tiling 还使 kernel fusion 自然成立：\(QK^\top\)、mask、softmax、dropout、\(PV\) 等步骤可以在一个 CUDA kernel 中串起来，输入只加载必要 block，输出只写最终 \(O\) 和少量统计量。论文中 block-sparse 扩展也体现了同一思想：如果注意力 mask 具有 block 结构，就跳过零 block，使 IO 复杂度随非零 block 比例下降。

> 💡 关键：FlashAttention 的贡献不是“少算注意力”，而是“少搬注意力矩阵”。它保留 \(O(N^2d)\) 计算量，却把最昂贵的 HBM 读写从完整矩阵级别压到 tile 级别。

#### 🧪 练习题
```yaml
question: "FlashAttention 能在保持 exact attention 的同时降低显存和加速，最核心的原因是什么？"
options:
  - "用低秩矩阵近似 QK^T"
  - "不再计算 softmax"
  - "通过分块和 online softmax 避免在 HBM 中物化 N×N 注意力矩阵"
  - "把所有注意力计算移动到 CPU"
answer: 2
explain: "FlashAttention 仍计算完整注意力，但只在 SRAM 内保留局部 tile，并用 running max/normalizer 合并 softmax，避免保存完整 S 或 P。"
```

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
FlashAttention-2 在 FlashAttention 的 exact attention 与 IO-aware 分块基础上，重写 online softmax 更新、sequence 维度并行和 warp work partition，使注意力 kernel 更接近 GEMM 的硬件利用率。

#### 🎯 核心要点
- 保持 exact attention：输出仍为 \(\mathrm{softmax}(QK^\top)V\)，不是近似注意力
- 减少非矩阵乘 FLOPs：推迟最终归一化，只保存 logsumexp，降低 rescale、mask、bounds check 等开销
- 更高并行度：除 batch/head 外，进一步沿 sequence length 切分 thread block
- 前向并行：每个 thread block 处理一个 query row block，row block 之间无需通信
- 反向并行：按 column block 切分，使用 atomic add 聚合 \(\mathrm{d}Q\)
- Warp 分工改造：从 sliced-K 改为 sliced-Q，减少 warp 间共享内存读写和同步
- 新能力：支持 head dimension 到 256，并支持 MQA/GQA 的 key/value head 复用
- 实测收益：论文报告相比 FlashAttention 一代约 2 倍加速，在 A100 上达到更高比例理论峰值吞吐

#### 🔬 深入细节
![FlashAttention-2 官方博客图：FlashAttention 分块回顾](https://crfm.stanford.edu/static/img/posts/2023-07-17-flash2/flash_recap_diagram.png)
*图：来自 Stanford CRFM 官方 FlashAttention-2 博文。该图回顾 FlashAttention 如何用 tiling 与 softmax rescaling 避免读写完整注意力矩阵。*

![FlashAttention-2 官方博客图：sliced-K 到 sliced-Q 的 warp 分工变化](https://crfm.stanford.edu/static/img/posts/2023-07-17-flash2/flash_flash2_partitioning.png)
*图：来自 Stanford CRFM 官方 FlashAttention-2 博文。FlashAttention-2 将 warp 内分工从 sliced-K 改为 sliced-Q，以减少 shared memory 通信。*

```python
# FlashAttention-2 forward：更少非 matmul FLOPs + 更好的并行调度
parallel_for batch_id, head_id, q_block_id:
    Qi = load_sram(Q[batch_id, head_id, q_block_id])

    # 在片上维护未归一化输出，直到所有 KV block 扫完再除以 l。
    Oi_tilde = zeros(Br, d)
    mi = full(Br, -inf)
    li = zeros(Br)

    for kv_block_id in range(num_kv_blocks):
        Kj, Vj = load_sram(K[kv_block_id], V[kv_block_id])
        Sij = mma(Qi, Kj.T) * scale

        if causal and block_is_future(q_block_id, kv_block_id):
            continue
        Sij = apply_boundary_mask_if_needed(Sij)

        m_new = maximum(mi, rowmax(Sij))
        Pij = exp(Sij - m_new[:, None])
        li = exp(mi - m_new) * li + rowsum(Pij)
        Oi_tilde = exp(mi - m_new)[:, None] * Oi_tilde + Pij @ Vj
        mi = m_new

    Oi = Oi_tilde / li[:, None]
    L_i = mi + log(li)       # backward 只需要 logsumexp
    write_hbm(Oi, L_i)
```

FlashAttention-1 已经解决了“是否要把 \(S,P\) 写回 HBM”的关键问题，但它还没有把 GPU 用满。论文指出，A100 的 FP16/BF16 Tensor Core matmul 理论吞吐远高于普通 FP32 非 matmul 操作；因此即使非 matmul FLOPs 数量占比不大，实际耗时也可能明显拖慢 kernel。FA2 的第一层优化是算法层面的微调：不在每个 KV block 后都把输出归一化为最终 \(O\)，而是维护未归一化的 \(\tilde{O}\)，最后一次性除以 \(\ell\)。

对应地，FA2 的 online softmax 更新可以写成：

$$
m^{(j)}=\max(m^{(j-1)},\mathrm{rowmax}(S^{(j)})),
$$

$$
\ell^{(j)}=e^{m^{(j-1)}-m^{(j)}}\ell^{(j-1)}
+\mathrm{rowsum}(e^{S^{(j)}-m^{(j)}}),
$$

$$
\tilde{O}^{(j)}=e^{m^{(j-1)}-m^{(j)}}\tilde{O}^{(j-1)}
+e^{S^{(j)}-m^{(j)}}V^{(j)},\quad
O=\tilde{O}^{(T_c)}/\ell^{(T_c)}.
$$

这个变形减少了反复 rescale 的标量操作。FA2 还把前向保存的 \((m,\ell)\) 合并为 \(L=m+\log \ell\)，反向重算概率时直接用 \(P^{(j)}=\exp(S^{(j)}-L)\)。这样做没有改变输出，只是把更多时间留给 Tensor Core 友好的矩阵乘。

第二层优化是 thread block 级并行。FA1 的并行主要来自 batch 和 head：大致是 \(\text{batch size} \times \text{num heads}\) 个 thread block。长序列训练或张量并行后，batch/head 数可能很小，A100 这类 GPU 的很多 SM 会空闲。FA2 把 sequence length 也纳入调度：前向让不同 query row block 由不同 thread block 处理，由于各 row 的 attention 输出互不依赖，前向几乎无需跨 block 通信。反向则更适合按 column block 并行，因为 \(\mathrm{d}K,\mathrm{d}V\) 可在 column block 内累积，而共享的 \(\mathrm{d}Q\) 用 atomic add 汇总。

第三层优化发生在一个 thread block 内。FA1 常用 sliced-K：多个 warp 切 \(K,V\)，每个 warp 得到一部分中间结果，随后需要写 shared memory、同步、再归约。FA2 改为 sliced-Q：多个 warp 切 \(Q\)，共享同一份 \(K,V\)，每个 warp 负责不同 query 行的输出 slice。由于不同 query 行天然独立，warp 之间不必交换 partial output，减少了 shared memory traffic 和 barrier，同样提升了吞吐。

FA2 与 FA1 的关系可以概括为：FA1 是算法 IO 复杂度突破，FA2 是硬件执行效率补课。两者都避免物化 \(N \times N\) 注意力矩阵，也都保持 exact attention；FA2 额外关心“GPU 上哪些 FLOPs 贵”“SM 是否被填满”“warp 之间是否在等共享内存”。这也是为什么它在实际训练 GPT 类模型时能把 attention kernel 的吞吐推到更接近 GEMM 的区间。

> ⚠️ 注意：FlashAttention-2 的 sequence 维度并行与 Flash-Decoding 的 KV split 思路相关但目标不同。FA2 主要优化训练/prefill 中多 query 的前向和反向；Flash-Decoding 专门处理 decode 阶段 query length 等于 1 的小 batch 场景。

#### 🧪 练习题
```yaml
question: "FlashAttention-2 中 sliced-Q 分工相对 sliced-K 的主要好处是什么？"
options:
  - "把 exact attention 改成稀疏 attention"
  - "减少 warp 间 shared memory 写入、同步和归约"
  - "让模型不再需要 Value 矩阵"
  - "把序列长度复杂度从二次降为一次"
answer: 1
explain: "sliced-Q 让不同 warp 负责不同 query 行的输出 slice，共享 K/V 后无需跨 warp 合并 partial output，因此 shared memory 通信更少。"
```

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
Flash-Decoding 针对长上下文自回归解码中 query length 通常为 1、batch 又较小导致 GPU 并行度不足的问题，沿 KV cache 的序列维度切分并行计算局部 attention，再用 log-sum-exp 归约得到 exact attention 输出。

#### 🎯 核心要点
- 专门优化 decoding：每步只生成一个 token，query length 通常为 1
- 新增并行维度：把 KV cache 沿 sequence length 拆成多个 split 并行读取
- 两阶段计算：第一阶段每个 split 独立做 attention，第二阶段归约 partial output
- 保持 exact attention：用每个 split 的 log-sum-exp 重新缩放贡献，不改变 softmax 结果
- 小 batch 友好：长上下文推理常因显存限制无法用大 batch，KV split 能补足 SM occupancy
- 与 FlashAttention 互补：prefill/training 仍适合 FA2，decode 长上下文场景使用 Flash-Decoding
- 官方可用性：Stanford CRFM 博文说明该方法已进入 FlashAttention 2.2 和 xFormers 相关路径
- 实测收益：官方博文报告长序列生成最高约 8 倍 end-to-end 加速，attention microbenchmark 最高约 50 倍

#### 🔬 深入细节
![Flash-Decoding 官方图：沿 KV 序列维度并行](https://crfm.stanford.edu/static/img/posts/2023-10-13-flashdecoding/parallelization_kv.gif)
*图：来自 Stanford CRFM 官方 Flash-Decoding 博文。Flash-Decoding 除 batch/query 维度外，还把 keys/values 的序列长度拆成多个并行 split，最后做小规模归约。*

![Flash-Decoding 官方图：长序列吞吐对比](https://crfm.stanford.edu/static/img/posts/2023-10-13-flashdecoding/performance.png)
*图：来自 Stanford CRFM 官方 Flash-Decoding 博文。长上下文 batch size 为 1 时，Flash-Decoding 随序列长度增长的生成速度下降更慢。*

```python
# Flash-Decoding：两阶段 decode attention
# q: 当前 token 的 query，形状约为 [num_q_heads, d]
# K_cache, V_cache: 历史 token 的 KV cache，沿 sequence 维度切成多个 split

# Stage 1: 每个 KV split 独立并行，写出少量 partial 结果。
parallel_for split_id in range(num_kv_splits):
    K_s = K_cache[split_id]                  # [split_len, d]
    V_s = V_cache[split_id]                  # [split_len, d]

    scores = q @ K_s.T / sqrt(d)
    m_s = max(scores, axis=-1)               # 局部最大值
    p_s_unnorm = exp(scores - m_s[..., None])
    l_s = sum(p_s_unnorm, axis=-1)           # 局部 exp 和
    o_s = p_s_unnorm @ V_s                  # 未按全局 softmax 归一化的局部输出

    write_partial(split_id, m_s, l_s, o_s)

# Stage 2: 用 online softmax / log-sum-exp 合并所有 split。
m = max_over_splits(m_s)
l = sum_over_splits(exp(m_s - m) * l_s)
O = sum_over_splits(exp(m_s - m)[..., None] * o_s) / l[..., None]
return O
```

自回归推理分成 prefill 和 decode 两个阶段。Prefill 处理整段 prompt，有很多 query token，因此 FlashAttention/FlashAttention-2 可以沿 batch、head 和 query block 获得足够并行度。Decode 阶段不同：模型一次只生成下一个 token，当前 query 长度通常是 1；虽然它需要 attend 到全部历史 KV cache，但传统 FlashAttention 调度主要按 batch 和 query 维度并行。如果 batch size 因长上下文显存压力被压到 1 或很小，即使上下文有 32K/64K token，也可能只有很少 thread block 在工作。

Flash-Decoding 的核心改动是把 KV cache 的序列长度也变成并行维度。设当前 query 为 \(q\)，历史 keys/values 被切成 \(S\) 个片段 \((K_s,V_s)\)。每个 split 独立计算局部分数：

$$
a_s=qK_s^\top/\sqrt{d},\quad
m_s=\max(a_s),\quad
\ell_s=\sum_t e^{a_{s,t}-m_s},\quad
\tilde{o}_s=\sum_t e^{a_{s,t}-m_s}v_{s,t}.
$$

第一阶段的每个 split 都可以由独立 thread block 或一组 thread block 处理，因此长 KV cache 会自然产生更多并行任务。关键是第一阶段只写出 \((m_s,\ell_s,\tilde{o}_s)\)，而不是把所有 attention scores 或概率写回 HBM；这延续了 FlashAttention 的 IO-aware 风格。

第二阶段负责把 split 级 softmax 合成全局 softmax。全局最大值为：

$$
m=\max_s m_s,
$$

全局归一化项为：

$$
\ell=\sum_s e^{m_s-m}\ell_s,
$$

最终输出为：

$$
o=\frac{\sum_s e^{m_s-m}\tilde{o}_s}{\ell}.
$$

这个公式与 FlashAttention 的 online softmax 合并本质一致：每个 split 在自己的数值尺度下计算指数和输出，归约时用 \(e^{m_s-m}\) 重新缩放到全局尺度。因此 Flash-Decoding 仍然是 exact attention，不会因为切分 KV cache 改变 softmax 结果。

与直接用 matmul primitives 的实现相比，Flash-Decoding 避免了多个 kernel 反复写读中间 attention 结果；与原始 FlashAttention decode 相比，它牺牲一个很小的最终 reduction kernel，换来按 KV 长度扩展的并行度。长上下文越长，可切出的 KV split 越多，越容易填满 GPU SM；当上下文较短时，额外归约开销可能不值得，因此实际系统通常根据问题规模在 FlashAttention 和 Flash-Decoding 之间调度。

在 MQA/GQA 模型中，多组 query heads 共享较少的 key/value heads，KV cache 更小，但 decode attention 仍要读完整历史。Flash-Decoding 与这种结构兼容：split 维度作用在共享的 KV 序列上，局部输出再映射到相应 query heads。官方博文以 CodeLLaMA-34B 场景为例，说明在 512 到 64K sequence length 的长上下文推理中，该方法能让 attention 时间更接近常数区间，从而改善 token/s。

> 💡 关键：Flash-Decoding 加速的是“单 token query 读长 KV cache”的场景。它不缩短上下文，也不跳过历史 token，而是把读 KV cache 这件事并行化，并用 log-sum-exp 保证合并后的 softmax 精确。

#### 🧪 练习题
```yaml
question: "Flash-Decoding 为什么需要在每个 KV split 写出 log-sum-exp 或等价的 softmax 统计量？"
options:
  - "用于训练奖励模型"
  - "用于把各 split 的局部 attention 输出重新缩放为全局 softmax 输出"
  - "用于删除 KV cache 中的旧 token"
  - "用于把模型权重量化到 int4"
answer: 1
explain: "不同 split 的局部 softmax 使用不同最大值和归一化项，最终归约必须用这些统计量恢复全局 softmax 的尺度。"
```

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
FlashAttention-3 针对 NVIDIA Hopper 的 WGMMA、TMA 和 FP8 Tensor Core 重新设计 exact attention kernel，用异步流水把数据搬运、矩阵乘和 softmax 交叠起来，解决 FlashAttention-2 在 H100 上利用率不足的问题。

#### 🎯 核心要点
- Hopper 专用 exact attention：继承 FlashAttention 的 IO-aware 分块与在线 softmax，不近似注意力结果
- Producer/Consumer warp-group 分工：producer 通过 TMA 异步搬运 Q/K/V，consumer 通过 WGMMA 执行两个 attention GEMM
- Pingpong scheduling：两个 consumer warp-group 交替执行 GEMM 与 softmax，使一个 warp-group 的 softmax 隐藏在另一个 warp-group 的 WGMMA 后台计算中
- 2-stage/3-stage WGMMA-softmax pipeline：跨 K/V tile 打破局部依赖，把第二个 GEMM 与下一轮 softmax 交叠
- FP8 路径：通过块量化、in-kernel transpose 和 incoherent processing 缓解低精度布局与离群值量化误差
- 论文报告 FP16 forward 在 H100 上达到最高约 740 TFLOPs/s、约 75% 理论峰值，FP8 forward 接近 1.2 PFLOPs/s

#### 🔬 深入细节
![FlashAttention-3 pingpong scheduling](https://arxiv.org/html/2407.08608v2/extracted/5728672/figs/pingpong_pipelining.png)
*图：FlashAttention-3 论文 Figure 1，两个 consumer warp-group 采用 pingpong 调度，将一个 warp-group 的 softmax 安排在另一个 warp-group 的 GEMM 执行期间。注：worker 元信息中的 arXiv ID 保持原样；本图与方法细节来自官方 FlashAttention-3 论文 arXiv:2407.08608v2。*

```python
# FlashAttention-3 forward kernel sketch, CTA-level view
for q_block in partition(Q):
    m = full([rows(q_block)], -inf)       # row-wise running max
    l = zeros([rows(q_block)])            # row-wise running denominator
    o = zeros([rows(q_block), head_dim])  # unnormalized output accumulator

    producer.tma_prefetch(q_block, K[0], V[0])
    for j in range(num_kv_blocks):
        producer.tma_prefetch_async(K[j + 1], V[j + 1])  # fill circular SMEM buffer

        # Consumer warp-groups issue asynchronous WGMMA.
        s_j = consumer.wgmma(q_block, K[j].T) * scale
        p_j, m, l = online_softmax_update(s_j, m, l)

        # Pingpong / 2-stage pipeline overlaps this PV GEMM with another stage's softmax.
        o = rescale_old_o_and_accumulate(o, p_j, V[j], m, l)

        producer.release_consumed_stage(j)
    O[q_block] = o / l[:, None]
```

标准注意力仍然是：

$$
\operatorname{Attention}(Q,K,V)=\operatorname{softmax}\left(\frac{QK^\top}{\sqrt{d}}\right)V
$$

FlashAttention 系列的关键是按 K/V block 在线更新 softmax，而不是把完整 \(S=QK^\top\) 和 \(P=\operatorname{softmax}(S)\) 写回 HBM。对第 \(j\) 个 K/V block，设 \(S_j=Q_iK_j^\top/\sqrt{d}\)，行级统计量可写成：

$$
m_j=\max(m_{j-1}, \operatorname{rowmax}(S_j))
$$

$$
\ell_j=e^{m_{j-1}-m_j}\ell_{j-1}+\operatorname{rowsum}\left(e^{S_j-m_j}\right)
$$

$$
O_j=e^{m_{j-1}-m_j}O_{j-1}+e^{S_j-m_j}V_j,\qquad
O=O_T/\ell_T
$$

动机上，FlashAttention-2 已经通过更好的 work partitioning 改善了 A100 上的并行度，但它仍基本遵循同步执行模型。Hopper H100 新增的 WGMMA 是 warp-group 级异步矩阵乘，TMA 是 global memory 到 shared memory 的专用异步搬运单元；如果 kernel 仍按“加载完再算、算完再 softmax”的串行节奏执行，就会让 Tensor Core、TMA 和执行指数函数的 multi-function unit 互相等待。论文指出 FA-2 在 H100 上约只有 35% 理论峰值利用率，而 optimized GEMM 可达到更高利用率，因此 FA-3 的核心不是改 attention 数学，而是把 exact attention 重新映射到 Hopper 的异步硬件模型上。

核心机制第一层是 warp specialization。一个 CTA 内的 warp-group 被分为 producer 和 consumer：producer 主要负责 TMA load，把 Q/K/V tile 放进多阶段 circular shared-memory buffer；consumer 主要负责 WGMMA、online softmax 和输出累加。Hopper 的 `setmaxnreg` 允许给 producer 少分寄存器、给 consumer 多分寄存器，从而让 GEMM 累加器和 softmax 中间量留在寄存器中。这个设计把“谁搬数据、谁做矩阵乘、谁等待 barrier”固定下来，使 TMA load 不必阻塞 WGMMA 的发射，下一块 K/V 在当前块计算时已经进入 shared memory。

核心机制第二层是 GEMM-softmax overlap。注意力 forward 每个 K/V block 至少包含两个 GEMM：\(QK^\top\) 得到 score，softmax 后再乘 \(V\)。softmax 的指数函数吞吐远低于 Tensor Core GEMM，尤其在 FP8 路径中 GEMM 更快，softmax 更容易成为可见瓶颈。FA-3 的 pingpong scheduling 用两个 consumer warp-group 交替推进：warp-group 1 做某一轮 GEMM 时，warp-group 2 执行上一轮 softmax；随后角色交换。论文还提出 2-stage pipeline，在单个 warp-group 内跨迭代保存额外中间量，使第 \(j\) 轮的第二个 WGMMA 与第 \(j+1\) 轮的 softmax 局部重叠。代价是寄存器压力上升，因此 block size、pipeline stage 数和 occupancy 需要通过 profiling 折中。

FP8 路径的难点不只是把输入转成 8 bit。Hopper FP8 WGMMA 对 operand layout 有更严格要求，例如第二个 GEMM 需要适配 k-major 布局，而 attention kernel 中 \(P\) 的 FP32 accumulator layout 与 FP8 operand layout 并不天然一致。FA-3 通过 producer warp-group 中的 LDSM/STSM 做 tile 级 in-kernel transpose，并用 byte permute 调整 accumulator 到下一次 WGMMA 可接受的布局。为了降低离群激活导致的量化误差，论文使用 block quantization，并借鉴 QuIP 类方法做 incoherent processing：对 Q/K 施加随机符号 Hadamard 变换，把少数大幅值特征“摊开”到多个维度，再进行 FP8 量化。

与 FA-2 相比，FA-3 的区别在于优化边界从“减少 HBM IO 与更好划分线程块”推进到“算法-内核-硬件异步调度协同”。它仍然计算 exact softmax attention，在线 softmax 的数学语义没有改变；改变的是执行图：TMA load、WGMMA、softmax、PV GEMM 被安排成多层流水，让 Hopper 的专用单元更少空转。这个思路也解释了为什么 attention kernel 会随 GPU 代际重写：同一组公式在 Ampere 与 Hopper 上的最优执行顺序并不相同。

#### 🧪 练习题
```yaml
question: "FlashAttention-3 相比 FlashAttention-2 最核心的新增优化是什么？"
options:
  - "利用 Hopper 的 WGMMA/TMA 异步能力，把数据搬运、GEMM 和 softmax 流水重叠"
  - "把 softmax attention 改成稀疏近似 attention"
  - "只减少 Transformer 层数来降低计算量"
  - "把 KV cache 全部移动到 CPU 内存"
answer: 0
explain: "FA-3 保持 exact attention 语义，主要贡献是面向 Hopper 的异步 warp-specialized pipeline、GEMM-softmax overlap 和 FP8 低精度路径。"
```

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
MLA 用共享的低维 latent 向量联合压缩 Key/Value cache，并通过解耦 RoPE 保留位置信息，在接近多头注意力表达能力的同时显著降低长上下文解码显存占用。

#### 🎯 核心要点
- 低秩 KV 联合压缩：每个 token 缓存 \(\mathbf{c}^{KV}\)，而不是缓存所有 attention head 的完整 \(\mathbf{K},\mathbf{V}\)
- Query 也可低秩压缩：先得到 \(\mathbf{c}^{Q}\)，再上投影成各头 query，降低投影计算与参数冗余
- Decoupled RoPE：把带旋转位置编码的 query/key 分量与可吸收的 noPE 分量拆开，避免 RoPE 破坏低秩缓存吸收
- Cache 成本公式清晰：推理时主要缓存 \(d_c+d_h^R\) 维，而 MHA 需要 \(2n_hd_h\) 维
- 可与 FlashAttention 类 kernel 结合：score 侧通过权重吸收避免显式恢复完整多头 K，value 侧可先聚合 latent 再上投影
- DeepSeek-V2/V3/R1 系列高吞吐长上下文服务的核心 attention 结构之一

#### 🔬 深入细节
![MLA 与 MHA/GQA/MQA 对比图](https://arxiv.org/html/2405.04434v5/x4.png)
*图：DeepSeek-V2 技术报告 Figure 3，比较 MHA、GQA、MQA 与 MLA 的 KV cache 组织方式；MLA 将每个 token 的多头 K/V 联合压缩为 latent 表示。*

```python
# MLA prefill/decode sketch
def mla_project(h_t):
    c_q = W_DQ @ h_t                         # optional low-rank query compression
    q_nope = split_heads(W_UQ @ c_q)
    q_rope = split_heads(RoPE(W_QR @ c_q))

    c_kv = W_DKV @ h_t                       # latent KV written to cache
    k_nope = split_heads(W_UK @ c_kv)
    v_nope = split_heads(W_UV @ c_kv)
    k_rope = RoPE(W_KR @ h_t)                # decoupled positional key
    return q_nope, q_rope, c_kv, k_nope, v_nope, k_rope

cache.append(c_kv, k_rope)
for c_j, k_rope_j in cache:
    # In optimized inference, q_nope @ (W_UK @ c_j) can be computed as
    # ((W_UK.T @ q_nope) @ c_j), avoiding materializing full per-head K.
    k_nope_j, v_j = up_project(c_j)
    score_j = dot(concat(q_nope, q_rope), concat(k_nope_j, k_rope_j))
    probs_j = online_softmax(score_j)
output = sum_j(probs_j * v_j)
```

MLA 的 noPE 分量可概括为：

$$
\mathbf{c}_t^{KV}=W^{DKV}\mathbf{h}_t,\qquad
\mathbf{k}_t^C=W^{UK}\mathbf{c}_t^{KV},\qquad
\mathbf{v}_t^C=W^{UV}\mathbf{c}_t^{KV}
$$

Query 侧也使用低秩瓶颈：

$$
\mathbf{c}_t^Q=W^{DQ}\mathbf{h}_t,\qquad
\mathbf{q}_t^C=W^{UQ}\mathbf{c}_t^Q
$$

为兼容 RoPE，MLA 将位置相关分量单独拼接：

$$
\mathbf{q}_{t,i}=[\mathbf{q}_{t,i}^C;\mathbf{q}_{t,i}^R],\qquad
\mathbf{k}_{t,i}=[\mathbf{k}_{t,i}^C;\mathbf{k}_{t}^R]
$$

因此每个 token 的推理缓存由低维 latent 和共享 RoPE key 组成：

$$
\operatorname{Cache}_{MLA}\approx d_c+d_h^R,\qquad
\operatorname{Cache}_{MHA}=2n_hd_h
$$

动机上，MHA 的每个 token 每层都要缓存所有 head 的 K 和 V，长上下文解码时显存随 \(2\times n_h\times d_h\times L\) 线性增长，往往比模型权重本身更快成为服务瓶颈。MQA/GQA 通过减少 KV head 数缓解这个问题，但本质仍然保存显式 K/V，只是在 head 维共享。MLA 更进一步，把“缓存多少个 KV 头”改成“缓存一个能生成所有头 K/V 的低秩 latent”，从表示层面降低 cache 维度。

关键机制是权重吸收。对 noPE key 分量，有 \(\mathbf{k}_{j,i}^C=W_i^{UK}\mathbf{c}_j^{KV}\)，于是 score 中的内积可以改写为：

$$
(\mathbf{q}_{t,i}^C)^\top\mathbf{k}_{j,i}^C
=(\mathbf{q}_{t,i}^C)^\top W_i^{UK}\mathbf{c}_j^{KV}
=((W_i^{UK})^\top\mathbf{q}_{t,i}^C)^\top\mathbf{c}_j^{KV}
$$

这意味着推理时不一定要为历史 token 显式恢复每个 head 的 key；可以把 key 上投影矩阵吸收到 query 侧，用压缩 latent 直接参与打分。Value 侧也有类似线性结构：\(\sum_j p_j W_i^{UV}\mathbf{c}_j^{KV}=W_i^{UV}\sum_j p_j\mathbf{c}_j^{KV}\)，因此可以先在 latent 空间按注意力权重聚合，再映射到各 head 输出。这个线性吸收是 MLA 能在 cache 低维化后仍保持高效 kernel 实现的核心。

RoPE 需要单独处理，是因为旋转位置编码会让 query/key 的内积显式依赖 token 位置。若把带 RoPE 的 key 完全吸收到 \(\mathbf{c}^{KV}\) 或上投影权重里，权重就不再是位置无关的固定线性变换，低秩吸收会失效。DeepSeek 的 decoupled RoPE 把 key 拆成 noPE 的压缩分量 \(\mathbf{k}^C\) 与 RoPE 分量 \(\mathbf{k}^R\)：前者承担大部分内容表示并享受 latent cache 压缩，后者以较小维度保留相对位置建模能力。这样既避免完全移除位置编码，也避免为每个 head 缓存完整带 RoPE 的 K。

训练和推理流程上，MLA 对上层 Transformer 来说仍输出标准 attention 结果，不改变 residual、MLP 或 MoE 的接口。prefill 阶段可以并行计算所有 token 的 latent KV、RoPE key 和 query；decode 阶段每步只追加 \(\mathbf{c}^{KV}\) 与 \(\mathbf{k}^R\) 到 KV cache。attention kernel 读取历史 latent，计算 noPE score 与 RoPE score 的和，再执行 online softmax 与 value 聚合。与 GQA/MQA 相比，MLA 的 trade-off 是增加了上/下投影与更复杂 kernel，但换来更小 cache 和更接近 MHA 的多头表达。

#### 🧪 练习题
```yaml
question: "MLA 为什么需要 decoupled RoPE？"
options:
  - "因为 RoPE 的位置相关变换难以被低秩 KV latent 的固定线性上投影完全吸收"
  - "因为 MLA 不允许使用任何位置编码"
  - "因为 GQA 必须为每个 query head 保存独立 RoPE cache"
  - "因为 latent KV 只能用于训练，不能用于推理"
answer: 0
explain: "noPE 分量可以通过权重吸收直接使用 latent cache，而 RoPE 分量依赖位置，单独缓存小维度位置 key 可以兼顾压缩与位置表达。"
```

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
Ring Attention 将超长序列按块分布到多设备上，让 K/V block 沿设备环流动，并用 blockwise exact attention 与在线 softmax 合并结果，从而把单设备显存瓶颈转化为可重叠的环形通信问题。

#### 🎯 核心要点
- 序列维切分：每个 host/device 持有一个或多个 query block 以及本地 K/V block
- 环形 K/V 传递：每轮把当前 K/V block 发给下一个设备，同时从上一个设备接收新的 K/V block
- Blockwise exact attention：本地 Q 与每个到达的 K/V block 计算局部 attention，并用在线归一化合并
- 通信计算重叠：只与相邻设备通信；当 block attention 计算时间大于 K/V 传输时间时，通信开销可被隐藏
- 内存随 block size 而非全局序列长度增长，最大上下文长度随设备数近似线性扩展
- 同时覆盖训练与推理，论文实现使用 JAX `ppermute` 做相邻设备 K/V 交换

#### 🔬 深入细节
![Ring Attention 架构图](https://ar5iv.labs.arxiv.org/html/2310.01889/assets/figures/merged.png)
*图：Ring Attention 论文 Figure 2。上半部分展示 host 组成环并传递 K/V block；下半部分展示原始 Transformer block 被按 query block 与 key-value block 重排计算。注：worker 元信息中的 arXiv ID 保持原样；本图与方法细节来自官方 Ring Attention 论文 arXiv:2310.01889。*

```python
# Ring Attention forward sketch on each device p
q_p, k_p, v_p = shard_sequence_on_device(x, device=p)
state = init_online_attention_state(q_p)
send_k, send_v = k_p, v_p

for step in range(num_devices):
    # In real implementations this is overlapped with local block attention.
    recv_k, recv_v = ring_send_recv(send_k, send_v, dst=(p + 1), src=(p - 1))

    state = online_block_attention_update(
        query=q_p,
        key=send_k,
        value=send_v,
        state=state,
        causal_or_padding_mask=block_mask(p, step),
    )

    send_k, send_v = recv_k, recv_v

o_p = finalize_online_attention(state)
y_p = blockwise_feedforward(o_p)
```

标准注意力是：

$$
\operatorname{Attention}(Q,K,V)=\operatorname{softmax}\left(\frac{QK^\top}{\sqrt{d}}\right)V
$$

当 K/V 被拆成多个 block 时，Ring Attention 依赖与 FlashAttention 相同的在线 softmax 合并律。对本地 query block \(Q_i\) 和第 \(j\) 个到达的 K/V block：

$$
S_j=\frac{Q_iK_j^\top}{\sqrt{d}},\quad
m_j=\max(m_{j-1}, \operatorname{rowmax}(S_j))
$$

$$
\ell_j=e^{m_{j-1}-m_j}\ell_{j-1}+\operatorname{rowsum}(e^{S_j-m_j})
$$

$$
O_j=e^{m_{j-1}-m_j}O_{j-1}+e^{S_j-m_j}V_j,\qquad
O=O_T/\ell_T
$$

动机上，FlashAttention 已经避免了 materialize \(L\times L\) 注意力矩阵，但单设备仍必须容纳本层输入/输出、激活检查点、KV/中间 buffer 和 FFN 激活。Blockwise Parallel Transformer 进一步把 attention 与 feedforward 都按块执行，降低了中间激活峰值；但对于极长序列，每层输出仍随全局序列长度 \(L\) 增长，单卡 HBM 仍会卡住。Ring Attention 的关键观察是：每个 query block 对所有 K/V block 的 attention 可以按任意顺序累计，只要 softmax 统计量正确重标定。因此可以把序列块分散到设备上，让每个设备只负责自己的 query block 输出。

核心机制是“环上流动的是 K/V，固定不动的是本地 Q 和输出累加器”。第 \(p\) 个设备持有 \(Q_p,K_p,V_p\)。第 0 轮它用本地 \(K_p,V_p\) 更新 \(Q_p\) 的 attention；随后把这对 K/V 发给设备 \(p+1\)，同时从 \(p-1\) 接收另一对 K/V。经过 \(P\) 轮后，\(P\) 个设备都看过所有 K/V block，各自得到本地 query block 的完整 exact attention 输出。由于每轮只保留当前和下一组 K/V buffer，加上本地 Q、输出和接收 buffer，显存峰值与 block size \(B\) 成正比，而不是与全局 \(L\) 成正比。

通信是否“免费”取决于算术强度。设单设备算力为 \(F\)，相邻设备带宽为 \(W\)，hidden size 为 \(H\)，block size 为 \(B\)。一次 block attention 的两个主要矩阵乘约需 \(4B^2H\) FLOPs，而传输 K/V block 在 bf16 下约需 \(4BH\) bytes。要把传输藏在计算后面，需要：

$$
\frac{4B^2H}{F}\geq\frac{4BH}{W}
\quad\Longrightarrow\quad
B\geq\frac{F}{W}
$$

这个条件解释了为什么 Ring Attention 偏好足够大的 block，以及为什么 NVLink/TPU ICI 这类高带宽互连更容易达到零额外通信开销。论文中对 A100 NVLink、TPU v3/v4/v5e 等系统给出估算，常见高带宽互连的最小 block size 约在千级 token，适合长上下文训练；而 InfiniBand 跨机带宽较低，要求更大的 block 才能完全隐藏通信。

与传统 sequence parallelism 不同，Ring Attention 不需要每轮 all-gather 全部序列激活，也不把所有远端 K/V 同时堆在本地内存中；它只做邻居间流式交换。与稀疏 attention、滑窗 attention 或检索式压缩不同，它没有改变 attention 图，理论上仍能让每个 token attend 到全局所有 token。causal 场景下只需在 block pair 上应用相应 mask：当某个 K/V block 位于 query block 未来位置时，其 score 被屏蔽；在线 softmax 合并规则不变。

训练流程中，forward 的环形 K/V 传递可以和 blockwise feedforward 结合，backward 也沿相似通信模式传播梯度。推理时，如果上下文被跨设备持久分片，新 token 或 query block 仍可沿环访问历史 K/V。论文报告在大规模 TPU/A100 设置下，Ring Attention 使可训练上下文长度相对 prior memory-efficient Transformer 近似按设备数放大，例如 32 张 A100 上可把 7B 模型上下文扩到百万级 token。它的工程本质是用有序、可隐藏的点对点通信替代单设备显存扩容。

#### 🧪 练习题
```yaml
question: "Ring Attention 能保持 exact attention 的关键原因是什么？"
options:
  - "不同 K/V block 的 softmax 统计量可以用在线归一化重标定并合并，block 处理顺序不改变最终结果"
  - "它只让每个 token 关注固定窗口内的邻居 token"
  - "它把所有 K/V block 一次性复制到每个设备上"
  - "它删除了 Transformer 的 feedforward network"
answer: 0
explain: "Ring Attention 依赖 blockwise attention 的在线 softmax 合并律；K/V 沿环分批到达，本地 query 仍能累计到全局 exact attention 输出。"
```

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
Striped Attention 把 Ring Attention 的连续序列分片改成按设备数取模的条纹分片，解决 causal mask 在分布式 exact attention 中造成的每轮设备负载不均问题。

#### 🎯 核心要点
- 识别 Ring Attention 在 causal self-attention 下的三角掩码负载不均：每轮延迟由最慢设备决定，连续分片会让部分设备完全未掩码、部分设备大量被掩码。
- 采用 residue modulo device count 的条纹分片：第 \(p\) 台设备持有位置 \(p, p+N, p+2N,\ldots\)，而不是一段连续 token。
- 保持 Ring Attention 的通信骨架：本地 \(Q\) 不动，\(K,V\) 仍按环形拓扑逐轮传递，只改变序列物理布局和 causal mask 解释。
- 算法仍是 exact attention：通过置换等变性保证只改变计算布局，不改变 \(\operatorname{Softmax}(QK^\top+C)V\) 的数学结果。
- 配合 tile 级 work skipping：完全被 causal mask 屏蔽的 query-key tile 可跳过；条纹分片让每台设备每轮都有近似相同的可跳过比例。
- 实验在 8 张 A100 80GB 上的 256k 序列训练达到最高 \(1.45\times\) 端到端吞吐提升，在 16 个 TPUv4 chip、786k 序列上达到 \(1.65\times\) 加速。

#### 🔬 深入细节
![Striped Attention 负载均衡示意图](https://ar5iv.labs.arxiv.org/html/2311.09431/assets/x3.png)
*图：论文 Figure 3 的 ar5iv 渲染图。每个设备持有跨全序列均匀分布的 token 后，各轮 causal mask 下的可跳过工作量更均衡。*

```python
# Striped Attention over N devices.
# Each device owns a residue class of the original token positions.
N = num_devices
owner = lambda token_id: token_id % N
local_positions = {
    p: [t for t in range(seq_len) if owner(t) == p]
    for p in range(N)
}

for layer in transformer_layers:
    Q_p, K_p, V_p = project_qkv(local_hidden[p])
    kv_block = (K_p, V_p, local_positions[p])

    for ring_step in range(N):
        recv_K, recv_V, recv_pos = ring_recv_then_send(kv_block)
        for q_tile in tiles(Q_p, local_positions[p]):
            for kv_tile in tiles(recv_K, recv_V, recv_pos):
                # Causal mask uses original token positions, not local layout.
                if all(k_pos > q_pos for q_pos in q_tile.pos for k_pos in kv_tile.pos):
                    continue  # the whole tile is masked out
                online_softmax_update(q_tile, kv_tile, causal_by_original_pos=True)
        kv_block = (recv_K, recv_V, recv_pos)
```

标准 causal attention 可以写成：

$$
O=\operatorname{Softmax}(QK^\top + C)V,\quad
C_{ij}=\begin{cases}
0,&j\le i\\
-\infty,&j>i
\end{cases}
$$

Ring Attention 的问题不在数学公式，而在这个三角 \(C\) 被连续切块后造成的并行时间。假设 \(N\) 台设备各持有长度为 \(c\) 的连续块，在某一轮里，靠后的 query 块可能要和完整 key 块计算 \(c^2\) 个交互，而靠前 query 块面对未来 key 块时几乎全被 mask。因为环上每轮都要等所有设备完成，哪怕有些设备可以跳过，仍会被那个 \(c^2\) 工作量的设备拖住，导致 causal attention 理论上少一半 FLOPs 的优势无法转化成每轮延迟下降。

Striped Attention 的核心是一次性置换分片：第 \(p\) 台设备持有所有满足 \(t\bmod N=p\) 的 token。这样每个本地块同时包含早期、中期和后期 token；当 \(K,V\) 从其他设备传来时，本地 query 与远端 key 的原始位置关系也会均匀混合。论文给出的条纹分片工作量近似为：

$$
\mathrm{Work}(i,j)=
\begin{cases}
\frac{c(c+1)}{2},&i\ge j\\
\frac{c(c-1)}{2},&i<j
\end{cases}
$$

其中 \(c\) 是每设备持有的 token 数。相比 Ring Attention 每轮至少有一台设备承担 \(c^2\) 交互，Striped Attention 中设备间只差一个对角项；当 \(c\) 足够大时，对角项占比线性下降，负载不均可以忽略，核心 attention 的理论最大加速趋近 \(2\times\)。

算法保持 exact 的原因是注意力对同步置换 \(Q,K,V\) 具有等变性。若 \(P\) 是把连续序列改成条纹布局的置换矩阵，则：

$$
\operatorname{Attn}(PQ,PK,PV,PCP^\top)
=P\operatorname{Attn}(Q,K,V,C)
$$

也就是说，内部按条纹顺序计算得到的是原始输出的同一个置换。只要后续层也沿用同一布局，或者在需要时做逆置换，就不会改变模型函数；真正变化的是分布式运行时看到的 tile 排布和 mask 判定。

实现上，论文的 JAX 版本仍使用 Ring Attention 的环通信：\(Q\) 留在本设备，\(K,V\) 每轮传给相邻设备，同时在 tile 粒度检查是否整块被 \(C\) 屏蔽。A100 实验中使用 \(2048\times4096\) 的 query-key tile，TPU 实验中使用 \(2048\times2048\) tile。tile 粒度越粗，越难完全吃到理想的 \(50\%\) causal work skipping；论文也指出，在块较小时只可能跳过约 \(25\%\) 工作，而更长序列让每设备块更大，条纹布局的优势更接近理论上限。

与 Ring Attention 相比，Striped Attention 不是新的近似注意力，也不是降低 KV cache 的方法。它解决的是 sequence parallelism 的调度问题：Ring Attention 先解决“单卡放不下长序列”的显存问题，Striped Attention 进一步解决“因果掩码让多卡算得不均衡”的吞吐问题。这也是它能作为 Ring Attention 的小改动落地的原因：一次性改变分片布局和 mask 解释，不需要改变 Transformer 层的数学定义。

#### 🧪 练习题
```yaml
question: "Striped Attention 为什么能在 causal Ring Attention 上提速？"
options:
  - "它把每台设备的 token 分布到整个序列，使每轮 causal mask 下的可跳过工作更均衡"
  - "它把 softmax 改成线性注意力，因此不再计算精确 attention"
  - "它复制所有 KV 到每台设备，避免环形通信"
  - "它删除了 causal mask，让每个 token 可以看见未来 token"
answer: 0
explain: "Striped Attention 仍计算 exact causal attention，只是用取模条纹分片平衡设备负载，让 tile skipping 在每轮都能发挥作用。"
```

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
FlashMLA 是 DeepSeek 为 Multi-head Latent Attention 解码阶段实现的 Hopper 高性能内核，把 MLA 的压缩 KV cache、在线 softmax、split-K/分页调度和 Tensor Core/CUDA Core 重叠执行合到一个服务端可用的推理路径中。

#### 🎯 核心要点
- 面向 MLA decode 而非标准 MHA/GQA：服务 DeepSeek-V2/V3 系列中通过 latent KV cache 降低推理缓存占用的注意力结构。
- 官方仓库接口围绕 `get_mla_metadata` 和 `flash_mla_with_kvcache`：先为变长请求生成 tile scheduler metadata，再在每个解码 step 调用内核。
- 官方 deep-dive 指出 MLA decode 在 DeepSeek 配置下会变成 compute-bound：当 \(h_qs_q\ge128\) 时，Tensor Core 利用率比单纯 HBM 带宽更关键。
- 新版 kernel 使用 seesaw schedule：在一个输出矩阵寄存器预算内处理两个 KV blocks，拆分 \(O_L/O_R\) 和 \(V_L/V_R\)，交错两个 warpgroup 的 Tensor Core 与 CUDA Core 工作。
- 使用细粒度 TMA copy-GEMM pipeline：一个 \(64\times576\) K block 拆成 9 次 \(64\times64\) TMA copy，数据块一就绪就启动对应 GEMM。
- 结合 cache hint、Programmatic Dependent Launch 和 tile scheduler，平衡 SM 任务并重叠 `splitkv_mla` 与 `combine` 内核。
- 官方 README 报告 dense MLA decoding 在 H800 SXM5、CUDA 12.8 上可达 memory-bound 约 3000 GB/s、compute-bound 约 660 TFLOPS。

#### 🔬 深入细节
![FlashMLA seesaw 调度图](https://raw.githubusercontent.com/deepseek-ai/FlashMLA/refs/heads/main/docs/assets/MLA%20Kernel%20Sched.drawio.svg)
*图：DeepSeek 官方 FlashMLA deep-dive 中的 MLA kernel schedule。该项目没有独立论文图，图源为官方仓库 `docs/assets/MLA Kernel Sched.drawio.svg`。*

```python
# Host-side decode loop exposed by the official FlashMLA API.
tile_scheduler_metadata, num_splits = get_mla_metadata(
    cache_seqlens=cache_seqlens,
    s_q_times_h_q_over_h_kv=s_q * h_q // h_kv,
    h_kv=h_kv,
    h_q=h_q,
    is_fp8=is_fp8_kvcache,
    topk=topk,                  # optional sparse token selection
)

for layer in decoder_layers:
    q = layer.project_query(hidden_states)
    out, lse = flash_mla_with_kvcache(
        q, kvcache[layer], block_table, cache_seqlens, dv,
        tile_scheduler_metadata, num_splits,
        is_causal=True,
        is_fp8_kvcache=is_fp8_kvcache,
        indices=selected_token_indices,
    )
```

MLA 的模型侧动机是压缩 KV cache。典型写法是把每个 token 的 hidden state \(h_t\) 下投影成 latent cache，再在注意力中恢复 key/value 的有效表示：

$$
c_t^{KV}=W^{DKV}h_t,\quad
k_t^C=W^{UK}c_t^{KV},\quad
v_t^C=W^{UV}c_t^{KV}
$$

RoPE 部分通常单独保留或拼接：

$$
k_t=[k_t^C;\,k_t^R],\quad
o_t=\operatorname{Softmax}\left(\frac{q_t k_{\le t}^{\top}}{\sqrt{d}}\right)v_{\le t}
$$

FlashMLA 的价值在于把这个模型结构收益转成内核收益。标准 FlashAttention 假设 \(K,V\) 已经按 MHA/GQA 的常规 head 布局存在，而 MLA decode 的 cache 更像压缩/吸收后的大维度 MQA 表示。官方 README 的支持矩阵把 dense decoding 标成 SM90、MQA、BF16；FP8 KV cache 格式还把每个 token 的 NoPE 部分量化存放，并保留 RoPE 部分为 BF16 以保证精度。因此内核既要做 attention，又要适配 DeepSeek 推理系统真实使用的 cache layout、block table、变长 batch 和可选 sparse indices。

官方 deep-dive 的理论分析解释了为什么这个 decode kernel 不只是 memory-bound。设 query head 数为 \(h_q\)，每请求 query token 数为 \(s_q\)，KV 长度为 \(s_k\)，key/value 维度为 \(d_k,d_v\)。一次 decode 的 FLOPs 与访存近似为：

$$
F\approx2h_qs_qs_k(d_k+d_v),\quad
B\approx2s_kd_k,\quad
\frac{F}{B}\approx h_qs_q\frac{d_k+d_v}{d_k}\approx2h_qs_q
$$

在 DeepSeek 的在线推理配置中，decode instance 不做 tensor parallel，\(h_q=128\)。因此即使 \(s_q=1\)，\(h_qs_q\) 也达到官方分析中的 compute-bound 阈值，优化目标从“少读 HBM”变成“让 Tensor Core 持续忙、同时隐藏 CUDA Core softmax 与 TMA copy 延迟”。

seesaw schedule 是新版 FlashMLA 的关键。由于一个 \(64\times512\) 输出矩阵需要 32768 个 32-bit registers，而一个 SM 只有 65536 个 32-bit registers，不能像 FA-3 ping-pong 那样同时放两个完整输出矩阵。FlashMLA 每步取两组 KV block \(K_0,K_1,V_0,V_1\)，把输出拆成 \(O_L,O_R\)，把 value 拆成 \(V_{0L},V_{0R},V_{1L},V_{1R}\)，在两个 warpgroup 间交错计算：

```python
# Simplified seesaw-style online softmax update.
m = -float("inf")
l = 0.0
O_L, O_R = 0.0, 0.0

for K0, V0, K1, V1 in paired_kv_blocks:
    S0 = q @ K0.T / qk_scale
    S1 = q @ K1.T / qk_scale

    m0 = max(m, max(S0))
    a0 = exp(m - m0)
    P0 = exp(S0 - m0)
    O_L = O_L * a0 + P0 @ V0.left
    l = l * a0 + sum(P0)
    m = m0

    m1 = max(m, max(S1))
    a1 = exp(m - m1)
    P1 = exp(S1 - m1)
    O_R = O_R * a1 + P1 @ V1.right
    O_L = O_L * a1 + P1 @ V1.left
    O_R = O_R + (P0 * a1) @ V0.right
    l = l * a1 + sum(P1)
    m = m1

O = concat(O_L, O_R) / l
```

这个伪代码省略了寄存器归属和 TMA 细节，但保留了数学直觉：它仍是 FlashAttention 的 online softmax，只是把输出矩阵左右拆分后，用一个输出矩阵预算模拟 ping-pong 重叠。这样 Tensor Core 做 \(qK^\top\) 和 \(PV\) 时，CUDA Core 可以处理 max/exp/rescale；当数据不再需要时立即发 TMA，把内存访问也塞进流水。

最后，FlashMLA 还处理服务端内核常见的调度问题。细粒度 TMA copy 把 \(64\times576\) 的 K block 拆成 9 个 \(64\times64\) copy，使 GEMM 不必等整个 block 到齐；cache hint 提升 L2 命中；Programmatic Dependent Launch 用于重叠 `splitkv_mla` 和 `combine`；tile scheduler 把 request/block 工作分配到 SM，缓解不同上下文长度造成的负载不均。相比只描述 MLA 架构，FlashMLA 的重点是这些低层调度把压缩 KV cache 的理论优势落实成 decode 吞吐。

#### 🧪 练习题
```yaml
question: "官方 FlashMLA deep-dive 为什么认为 DeepSeek 配置下的 MLA decode 可能是 compute-bound？"
options:
  - "因为 FLOPs/byte 近似为 2h_qs_q，DeepSeek decode 中 h_q=128，使 Tensor Core 计算成为主要瓶颈"
  - "因为 MLA 完全不访问 KV cache，所以没有内存流量"
  - "因为 decode 阶段不需要 softmax，因此只剩矩阵乘"
  - "因为 FlashMLA 把所有请求固定成相同长度，消除了调度开销"
answer: 0
explain: "官方分析给出 FLOPs/byte 约为 2h_qs_q；DeepSeek decode 不做 tensor parallel，h_q=128，达到 H800 上的 compute-bound 阈值。"
```

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
FlashAttention-4 面向 NVIDIA Blackwell 的非对称硬件扩展重新设计 exact attention 的前向、反向和调度流水，核心目标是让 Tensor Core 翻倍后的算力不再被 shared memory、exp 单元和全局原子累加拖住。

#### 🎯 核心要点
- 延续 FlashAttention 的 exact attention 与 IO-aware 思路：不物化 \(N\times N\) attention 矩阵，仍用 tile 与 online softmax 计算精确结果。
- 针对 Blackwell B200/GB200 的硬件变化：Tensor Core BF16/FP16 吞吐显著提升，但 shared memory 带宽、MUFU exp 吞吐和普通 ALU 没有同比例提升。
- 前向使用新的 ping-pong Q-tile pipeline：每个 CTA 交替处理 high/low 两个 128-token query tile，并通过 TMEM 把 MMA、softmax 和 output correction 解耦。
- 用软件模拟 exponential 和条件 softmax rescaling 降低非矩阵乘开销：部分 \(2^x\) 由 FMA 多项式近似完成，不完全依赖 MUFU。
- 反向重新组织五个 MMA 和 elementwise softmax 梯度，利用 Blackwell tensor memory 与 2-CTA MMA mode 减少 shared memory traffic。
- 2-CTA backward 通过 DSMEM 交换半个 \(dS\) tile，让 \(dQ\) 的双倍 reduction 在 CTA pair 内完成，并将 \(dQ\) 全局 atomic add 数量减半。
- 对 causal mask 和 varlen attention 使用 LPT/SPT 风格调度，缓解 worktile 长短不一导致的 SM 负载不均。
- 论文报告在 B200 BF16 上达到最高 1613 TFLOPs/s、约 71% 理论利用率，相比 cuDNN 9.13 最高 \(1.3\times\)、相比 Triton 最高 \(2.7\times\)。
- 实现完全基于 Python 内嵌的 CuTe-DSL，避免传统 C++ template kernel 的长编译周期，论文报告编译时间降低约 \(20\)-\(30\times\)。

#### 🔬 深入细节
![FlashAttention-4 前向流水图](https://arxiv.org/html/2603.05451v1/Figures/FA4_FWD_p3.png)
*图：论文 Figure 1。FlashAttention-4 前向 pipeline 中，high/low 两个 128-token Q tile 交替执行，MMA、softmax 和 correction stage 被拆开重叠。*

```python
# High-level FlashAttention-4 forward pipeline on Blackwell.
for q_hi, q_lo in paired_query_tiles(size=128):
    state_hi = OnlineSoftmaxState()
    state_lo = OnlineSoftmaxState()

    prefetch_kv_async(next_kv_tile)          # TMA/async path
    for kv in lpt_or_causal_schedule(kv_tiles):
        S_hi = async_mma(q_hi, kv.K, dst="TMEM")
        S_lo = async_mma(q_lo, kv.K, dst="TMEM")

        P_hi = softmax_warpgroup(S_hi, state_hi, exp_impl="mufu+fma_poly")
        P_lo = softmax_warpgroup(S_lo, state_lo, exp_impl="mufu+fma_poly")

        # Output correction can be separated because P travels through TMEM.
        maybe_rescale_output_if_max_changed(state_hi)
        maybe_rescale_output_if_max_changed(state_lo)

        state_hi.O += async_mma(P_hi, kv.V, dst="TMEM")
        state_lo.O += async_mma(P_lo, kv.V, dst="TMEM")

    store(normalize(state_hi.O, state_hi.lse), normalize(state_lo.O, state_lo.lse))
```

基础 attention 目标没有改变：

$$
O=\operatorname{Softmax}\left(\frac{QK^\top}{\sqrt d}+M\right)V
$$

FlashAttention-4 的出发点是 roofline 已经变了。Hopper 上 FA-3 的重点是异步执行和 warp specialization；Blackwell 上 Tensor Core 更快，B200 的 FP16/BF16 Tensor Core 吞吐约为 H100 的两倍，但 shared memory、MUFU exponential、整数/浮点 ALU 的扩展慢得多。论文指出，在典型 attention workload 中，非 MMA 资源会比 MMA 计算多占 \(25\%\)-\(60\%\) 时间，因此只把 FA-3 kernel 搬到 Blackwell 会把瓶颈暴露在 softmax、shared memory traffic 和原子累加上。

前向 pipeline 的关键是用 Blackwell 的 fully asynchronous MMA 和 256 KB tensor memory。FA-4 每个 CTA 同时考虑 \(Q^H,Q^L\) 两个 128-token query tile；MMA 结果写入 TMEM，softmax warpgroup 从 TMEM 取整行做 max、exp、sum，另设 correction warpgroup 处理 online softmax 的输出 rescale。与 FA-3 相比，\(\mathbf P\) 不再必须经寄存器文件传递，输出 rescale 可以从关键路径拆出去，MMA 与 softmax 之间的重叠空间更大。

online softmax 仍维护行最大值和归一化因子：

$$
m_{\text{new}}=\max(m,\max S),\quad
\alpha=\exp(m-m_{\text{new}})
$$

$$
O_{\text{new}}=\alpha O+\exp(S-m_{\text{new}})V,\quad
\ell_{\text{new}}=\alpha\ell+\sum_j\exp(S_j-m_{\text{new}})
$$

FA-4 额外做了条件 rescaling：如果新的 tile 没有改变 running max，或变化不需要立即校正，就尽量跳过中间 rescale，把最终输出写成：

$$
\text{Output}=\frac{1}{\ell_{\text{final}}}O_{\text{final}}
$$

这样可以减少非 MMA 指令和寄存器压力，但仍保持 exact attention 的数值语义。

exp 是另一个瓶颈。Blackwell 上 MUFU 每 SM 每周期的 exp 能力远低于 Tensor Core MMA；而 softmax 每行都要大量 exp。FA-4 对 \(2^x\) 做范围分解：

$$
2^x=2^{\lfloor x\rfloor}2^{x-\lfloor x\rfloor}
$$

整数部分可通过 IEEE 754 exponent bit 操作高效构造，分数部分用 FMA 计算多项式近似：

$$
2^{x_{\mathrm{frac}}}\approx\sum_{i=0}^{n}p_i x_{\mathrm{frac}}^i,\quad x_{\mathrm{frac}}\in[0,1)
$$

论文没有把所有 exp 都改成软件模拟，而是只对一部分元素使用 FMA polynomial，其余继续用 `MUFU.EX2`。这样能把 exp 工作分摊到 FMA 单元，避免全量模拟带来的寄存器占用、寄存器带宽和延迟反噬。

反向更复杂，因为 FlashAttention backward 每个 tile 要重算 \(\mathbf S\)，再计算 \(\mathbf{dP},\mathbf{dV},\mathbf{dS},\mathbf{dQ},\mathbf{dK}\)，共五个 MMA 加 elementwise softmax 梯度。论文的 roofline 分析在 \(M=N=d=128\) 时给出 1-CTA backward 的 shared memory 总时间约 3328 cycles，高于 MMA compute 的 2560 cycles，说明 shared memory 已成主瓶颈。FA-4 因此用 TMEM 存中间 accumulator，并调整 pipeline 让上一轮的 \(dQ/dK\) MMA 与当前轮的 softmax/elementwise 工作重叠。

2-CTA backward 是 Blackwell 专属优化。CTA pair 用 \(M=256,N=K=128\) 的 MMA tile 共同工作，输出在 M 维切分，每个 CTA 只保留自己的 accumulator slice。对 \(dQ\) 来说 reduction 轴天然跨两块 \(dS\)，所以 FA-4 用 DSMEM 在同 cluster 的两个 CTA 间交换半个 \(dS\) tile，使每个 CTA 拥有 \((M/2)\times2N\) 的 operand 并完成双倍 reduction：

$$
dQ=dS\,K,\quad
dK=dS^\top Q,\quad
dV=P^\top dO
$$

这样不仅减少 shared memory operand traffic，也让每个 CTA 只写半个 \(dQ\) tile，全局 atomic reductions 数量随之减半。确定性 backward 仍需要 semaphore lock 序列化 reduction；FA-4 通过 causal 场景下的 SPT 顺序和 batch/head swizzle 减少等待。

最后，FA-4 把调度当成算法的一部分。causal 和 varlen attention 的 worktile mainloop 长度不同，按自然顺序会让 SM 先处理短任务、后处理长任务，尾部拖慢 makespan。论文使用 Longest Processing Time first 思路：causal 中按 batch 外层、head 分段、mblock 逆序遍历；varlen 中可预处理并缓存 virtual-to-actual batch mapping，让长 context 或 decode-heavy batch 优先进入 attention kernel。这些调度不改变 attention 公式，却直接影响 Blackwell 上的端到端利用率。

#### 🧪 练习题
```yaml
question: "FlashAttention-4 面向 Blackwell 的核心瓶颈变化是什么？"
options:
  - "Tensor Core 变得更快后，shared memory、exp 单元和原子累加等非 MMA 资源成为主要限制"
  - "Blackwell 不支持 Tensor Core，因此必须退回普通 CUDA Core"
  - "注意力矩阵必须完整写入 HBM，无法再使用 tiling"
  - "causal mask 被删除，模型只能做双向 attention"
answer: 0
explain: "FA-4 的主要贡献是围绕 Blackwell 的非对称扩展重排 pipeline、exp、backward 和调度，让 exact attention 不被非 MMA 资源限制。"
```

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
NSA 提出一种训练阶段就原生使用的稀疏注意力，把压缩全局摘要、动态块选择和局部窗口三条路径组合起来，解决长上下文中全注意力计算昂贵且后验稀疏化难以高效落地的问题。

#### 🎯 核心要点
- 三分支结构：compressed attention 负责全局粗粒度信息，selected attention 负责重要历史块的精确访问，sliding-window attention 负责近邻局部依赖
- 训练原生稀疏：预训练、前向、反向和解码都使用同一套稀疏结构，避免推理时临时裁剪带来的分布偏移
- 块级动态选择：利用压缩分支的注意力分数推导选择块重要性，再读取 top-n 连续 KV 块以适配 GPU 连续访存和 Tensor Core 计算
- GQA/MQA 友好：在共享 KV 的 query-head group 内聚合块重要性，使同组 query 选择一致的 KV 块，减少解码阶段 KV cache 读取量
- 门控融合：每个 query 对三条路径分别执行 attention，再用输入相关 gate 合并输出，兼顾远程语义、细粒度关键 token 和局部短程模式
- 硬件对齐 kernel：selected attention 采用 group-centric data loading，把同一 GQA 组的 query 和共享稀疏 KV 块放入 SRAM，提升实际而非纸面加速

#### 🔬 深入细节
![NSA 三分支架构图](https://arxiv.org/html/2502.11089v1/x2.png)
*图：arXiv HTML 中的 NSA 架构图，展示 compressed、selected、sliding-window 三条注意力路径及其稀疏模式。*

```python
# Native Sparse Attention core logic
def native_sparse_attention(q_t, K, V, gates, l, d, l_select, top_n, window):
    # 1. Compress historical K/V blocks into coarse-grained memory.
    K_cmp, V_cmp = [], []
    for start in range(0, len(K) - l + 1, d):
        K_cmp.append(phi_key(K[start:start + l]))      # learnable block compressor
        V_cmp.append(phi_value(V[start:start + l]))

    # 2. Use compression attention scores to estimate block importance.
    p_cmp = softmax(q_t @ transpose(K_cmp))
    p_slc = map_compression_scores_to_selection_blocks(p_cmp, l, d, l_select)
    selected_block_ids = topk(sum_over_gqa_group(p_slc), top_n)
    K_slc, V_slc = gather_contiguous_blocks(K, V, selected_block_ids, l_select)

    # 3. Keep exact local context for recent tokens.
    K_win, V_win = K[-window:], V[-window:]

    # 4. Separate attentions are fused by learned gates.
    o_cmp = attention(q_t, K_cmp, V_cmp)
    o_slc = attention(q_t, K_slc, V_slc)
    o_win = attention(q_t, K_win, V_win)
    return gates["cmp"] * o_cmp + gates["slc"] * o_slc + gates["win"] * o_win
```

NSA 先把普通 causal attention 改写成“为当前 query 动态构造更小的 K/V 集合”。标准形式是 \(\mathbf{o}_t=\operatorname{Attn}(\mathbf{q}_t,\mathbf{k}_{:t},\mathbf{v}_{:t})\)，NSA 将其替换为：

$$
\tilde{K}_t=f_K(\mathbf{q}_t,\mathbf{k}_{:t},\mathbf{v}_{:t}),\quad
\tilde{V}_t=f_V(\mathbf{q}_t,\mathbf{k}_{:t},\mathbf{v}_{:t}),\quad
\mathbf{o}_t^*=\operatorname{Attn}(\mathbf{q}_t,\tilde{K}_t,\tilde{V}_t)
$$

更具体地，NSA 使用三类映射 \(\mathcal{C}=\{\mathrm{cmp},\mathrm{slc},\mathrm{win}\}\)，并用 MLP+sigmoid 生成的 gate 合并三路输出：

$$
\mathbf{o}_t^*=\sum_{c\in\mathcal{C}} g_t^c\cdot
\operatorname{Attn}(\mathbf{q}_t,\tilde{K}_t^c,\tilde{V}_t^c),\quad
N_t=\sum_{c\in\mathcal{C}}\operatorname{size}[\tilde{K}_t^c]\ll t
$$

压缩分支把连续历史 token 聚合成块级表示。设压缩块长为 \(l\)，步长为 \(d\)，\(\phi\) 是带块内位置编码的可学习 MLP，则：

$$
\tilde{K}^{\mathrm{cmp}}_t=
\left\{\phi(\mathbf{k}_{id+1:id+l})\mid
0\le i\le \left\lfloor\frac{t-l}{d}\right\rfloor\right\}
$$

这一路牺牲 token 级精度，换来覆盖整个长上下文的粗粒度语义视野。论文中特别采用 \(d<l\) 的重叠压缩来缓解边界切断信息的问题：同一段上下文会被相邻压缩块以不同相对位置编码观察，减少“关键 token 恰好落在块边界”造成的信息损失。

选择分支解决压缩分支的细节损失。NSA 不直接对所有历史 token 做 top-k，因为那会产生随机访存和昂贵索引；它把历史切为选择块，并复用压缩注意力得到的分数估计块重要性。压缩注意力分数为：

$$
\mathbf{p}^{\mathrm{cmp}}_t=\operatorname{Softmax}(\mathbf{q}_t^\top\tilde{K}^{\mathrm{cmp}}_t)
$$

当压缩块和选择块不同步时，NSA 按空间覆盖关系把压缩块分数累加到选择块。设选择块长为 \(l'\)，且 \(l\le l'\)、\(d\mid l\)、\(d\mid l'\)，则：

$$
\mathbf{p}^{\mathrm{slc}}_t[j]
=\sum_{m=0}^{l'/d-1}\sum_{n=0}^{l/d-1}
\mathbf{p}^{\mathrm{cmp}}_t\left[\frac{l'}{d}j-m-n\right]
$$

在 GQA/MQA 场景中，同一 KV group 被多个 query head 共享。如果每个 head 独立选块，解码时需要读取这些选择的并集，实际访存会膨胀。NSA 因此在组内聚合分数 \({\mathbf{p}^{\mathrm{slc}}_t}'=\sum_{h=1}^{H}\mathbf{p}^{\mathrm{slc},(h)}_t\)，再选择 top-n 块：

$$
\mathcal{I}_t=\{i\mid \operatorname{rank}({\mathbf{p}^{\mathrm{slc}}_t}'[i])\le n\},\quad
\tilde{K}^{\mathrm{slc}}_t=
\operatorname{Cat}\left[\{\mathbf{k}_{il'+1:(i+1)l'}\mid i\in\mathcal{I}_t\}\right]
$$

滑动窗口分支保留最近 \(w\) 个 token：\(\tilde{K}^{\mathrm{win}}_t=\mathbf{k}_{t-w:t}\)、\(\tilde{V}^{\mathrm{win}}_t=\mathbf{v}_{t-w:t}\)。它不只是“补一点局部上下文”，更重要的是隔离局部模式：语言模型很容易从近邻 token 获得强信号，如果把局部和长程信息混在同一个稀疏集合里，模型可能走捷径而不学习压缩/选择分支。NSA 用独立 K/V 和独立 attention 路径降低这种梯度干扰。

硬件层面，NSA 的关键不是稀疏率本身，而是让稀疏访问仍然像 FlashAttention 一样可调度。selected attention 的 kernel 不按一段连续 query block 加载，因为相邻 query 可能选到不同 KV 块；它改为对每个位置加载同一 GQA 组的全部 query head 及其共享稀疏 KV 块，把连续 KV block 放进 SRAM 后循环计算。这样既避免同组 head 重复拉取 KV，也把随机 token 读取变成块级连续读取，提升算术强度并减少 HBM 带宽瓶颈。

与 H2O、SnapKV、Quest 等推理时稀疏或 cache eviction 方法相比，NSA 的稀疏结构参与预训练，因此模型参数会适应“压缩摘要 + 精选块 + 局部窗口”的信息接口。它也不同于 Longformer 这类固定稀疏模板：NSA 的选择块由 query 动态决定，同时又通过块级访问维持工程可实现性。直观地说，NSA 把“检索哪些历史信息”变成模型架构的一部分，而不是推理服务端的后处理策略。

#### 🧪 练习题
```yaml
question: "NSA 为什么要把 selected attention 做成块级 top-n，而不是直接逐 token top-k？"
options:
  - "因为块级选择能产生连续 KV 读取，更适合 GPU kernel，同时仍可用压缩分数动态定位重要历史区域"
  - "因为逐 token top-k 无法表达任何长程依赖"
  - "因为 sliding-window attention 已经覆盖所有历史 token"
  - "因为 NSA 只用于评测阶段，不参与训练"
answer: 0
explain: "NSA 的块级选择兼顾动态稀疏和硬件效率；逐 token 随机读取会破坏连续访存，实际延迟可能无法接近理论稀疏收益。"
```

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
DSA 在 DeepSeek-V4-Pro 技术报告中落地为 CSA + HCA 的混合压缩稀疏注意力：先把长历史压缩成更少的 KV 入口，再用稀疏选择、强压缩和局部窗口共同支撑 1M-token 上下文的低 FLOPs、低 KV cache 推理。

#### 🎯 核心要点
- 官方 DeepSeek-V4-Pro 模型卡与技术报告将混合注意力定义为 Compressed Sparse Attention (CSA) + Heavily Compressed Attention (HCA)
- CSA 先以压缩率 \(m\) 将连续 token 聚合成 compressed KV entries，再沿用 DSA 式轻量 indexer 在压缩入口上执行 top-k 稀疏选择
- HCA 使用更大的压缩率 \(m'\gg m\)，把大范围历史强压缩后执行共享 KV 的 MQA，不再做稀疏 top-k
- CSA/HCA 都补充 sliding-window KV entries，弥补压缩块内当前 token 无法访问同块近邻信息的问题
- 注意力内部采用低秩 query 生成、shared key-value MQA、grouped output projection、RMSNorm、partial RoPE 和 attention sink 等稳定性/效率设计
- 官方报告给出的 1M-token 场景收益：DeepSeek-V4-Pro 相比 DeepSeek-V3.2 只需 27% single-token inference FLOPs 和 10% KV cache

#### 🔬 深入细节
![DeepSeek-V4 官方效率图](https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro/resolve/main/assets/dsv4_performance.png)
*图：DeepSeek-V4-Pro 官方模型卡中的性能/效率图；右侧展示 DeepSeek-V4 系列相对 DeepSeek-V3.2 的 single-token FLOPs 与累计 KV cache 优势。*

```python
# DeepSeek-V4 hybrid sparse attention sketch: CSA + HCA
def csa_layer(h, top_k, m, window):
    # Compressed Sparse Attention
    C = h @ W_KV                         # token-level KV entries
    Z = h @ W_Z                          # token-level compression weights
    C_comp = overlapped_weighted_compress(C, Z, rate=m, positional_bias=B)

    K_I_comp = compress_indexer_keys(h, rate=m)
    c_q = h_t @ W_DQ                     # low-rank query latent
    q_index = c_q @ W_IUQ                # indexer query heads
    w_index = h_t @ W_w                  # per-indexer-head gates

    scores = []
    for s, k_s in enumerate(K_I_comp[:floor(t / m)]):
        scores.append(sum(w_index[j] * relu(dot(q_index[j], k_s))
                          for j in range(num_index_heads)))
    sparse_ids = topk(scores, top_k)
    C_sparse = gather(C_comp, sparse_ids)

    local = uncompressed_recent_kv(h, window)
    q_core = c_q @ W_UQ
    return grouped_output_projection(mqa(q_core, key_value=C_sparse + local))

def hca_layer(h, m_prime, window):
    # Heavily Compressed Attention
    C = h @ W_KV
    Z = h @ W_Z
    C_comp = non_overlapped_weighted_compress(C, Z, rate=m_prime, positional_bias=B)
    local = uncompressed_recent_kv(h, window)
    q_core = (h_t @ W_DQ) @ W_UQ
    return grouped_output_projection(mqa(q_core, key_value=C_comp + local))
```

DeepSeek-V4 的公开资料不是一篇只介绍“DSA”的独立论文，而是 DeepSeek-V4-Pro 模型卡和技术报告。报告中的混合注意力可以理解为 DeepSeek 稀疏注意力路线的工程化版本：CSA 保留 DSA 的“轻量 indexer + top-k 选择”思想，但把被选择对象从原始 token 改成压缩后的 KV entries；HCA 则进一步用更强压缩覆盖超长历史，降低 KV cache 规模。这样做的核心取舍是：精确 token 级历史太贵，压缩入口上的稀疏选择在信息保留和推理成本之间更可控。

CSA 的第一步是构造压缩 KV。报告给出 token-level KV 和压缩权重：

$$
C=H W_{KV},\quad Z=H W_Z
$$

随后每个压缩入口由一段 KV 按 learned compression weights 和 positional bias 加权得到。对于 HCA 的非重叠强压缩，公式更直接：

$$
S_{m'i:m'(i+1)-1}=\operatorname{Softmax}_{row}(Z_{m'i:m'(i+1)-1}+B)
$$

$$
C_i^{\mathrm{Comp}}=\sum_{j=m'i}^{m'(i+1)-1} S_j\odot C_j
$$

其中 \(m'\) 是 HCA 的压缩率，\(\odot\) 是逐元素乘法。CSA 的压缩形式与此类似，但使用较小 \(m\) 且带重叠压缩，所以有效上把序列长度压到原来的 \(1/m\)，同时降低块边界造成的信息损失。压缩后的入口既是 attention key，也是 value，这是后续 shared key-value MQA 的基础。

CSA 的稀疏选择由 lightning indexer 完成。它先用低秩方式生成 indexer queries：

$$
\mathbf{c}^Q_t=\mathbf{h}_t W_{DQ},\quad
[\mathbf{q}^I_{t,1};\ldots;\mathbf{q}^I_{t,n_h^I}]=\mathbf{c}^Q_t W_{IUQ}
$$

再从 hidden state 得到每个 indexer head 的权重 \(\mathbf{w}^I_t=\mathbf{h}_t W_w\)，对第 \(s\) 个压缩块打分：

$$
I_{t,s}=\sum_{h=1}^{n_h^I} w^I_{t,h}\cdot
\operatorname{ReLU}(\mathbf{q}^I_{t,h}\cdot K^{IComp}_s)
$$

最终保留 top-k 压缩 KV 入口：

$$
C_t^{\mathrm{SprsComp}}=\{C_s^{\mathrm{Comp}}\mid I_{t,s}\in\operatorname{TopK}(I_{t,:})\}
$$

这与 HISA 论文中回顾的 DSA 接口一致：indexer 输出一个稀疏集合，后端 sparse MLA/MQA 只对该集合做核心 attention。差别在于 DeepSeek-V4 的 CSA 把集合元素换成 compressed KV entries，从而同时减少索引长度、attention FLOPs 和 KV cache 体积。

核心 attention 采用 shared key-value MQA。对第 \(i\) 个 query head，CSA 的核心计算可以写成：

$$
\mathbf{o}_{t,i}=\operatorname{CoreAttn}(
\mathrm{query}=\mathbf{q}_{t,i},
\mathrm{key}=C_t^{\mathrm{SprsComp}},
\mathrm{value}=C_t^{\mathrm{SprsComp}})
$$

HCA 则把 \(C^{\mathrm{Comp}}\) 整体作为 key/value 做 MQA，不再先 top-k。它适合承载更远的大范围历史：压缩率 \(m'\) 很大，单个入口信息更粗，但由于入口数量少，可以用密集方式扫过强压缩历史。CSA 更像“可检索的压缩历史”，HCA 更像“全局强摘要通道”，两者和局部窗口一起覆盖不同时间尺度。

滑动窗口不是附属细节。为了严格因果，压缩块 attention 只允许 query 看见之前的压缩块；这意味着 query 不能直接访问与自己同一个压缩块内的近邻 token，而语言建模中近邻通常最重要。因此 CSA 和 HCA 都额外加入最近 \(n_{win}\) 个未压缩 KV entries，让局部依赖保持细粒度。报告还对 CSA/HCA 的 query、KV entries 和 core attention outputs 的最后 64 维使用 partial RoPE，并对 outputs 施加反向位置的 RoPE，使输出携带相对位置而不是错误累积绝对位置。

从效率角度看，DeepSeek-V4 的收益来自多层叠加：压缩 attention 降低有效序列长度，CSA 的 top-k 降低参与核心 attention 的入口数，HCA 用大压缩率降低长历史 cache，FP8/BF16 混合 KV 存储接近把 KV cache 再减半，lightning indexer 使用 FP4 加速超长上下文下的打分。官方报告因此给出 1M context 下相对 DeepSeek-V3.2 的 27% single-token FLOPs 和 10% KV cache；若对比常见 BF16 GQA8、head dimension 128 的配置，DeepSeek-V4 系列 KV cache 可降到约 2% 量级。

#### 🧪 练习题
```yaml
question: "在 DeepSeek-V4 的混合注意力中，CSA 与 HCA 的关键区别是什么？"
options:
  - "CSA 对压缩 KV entries 做 top-k 稀疏选择，HCA 用更大压缩率生成强压缩历史并直接做共享 KV MQA"
  - "CSA 只用于训练，HCA 只用于分词"
  - "CSA 使用完整 token KV cache，HCA 完全不使用 attention"
  - "CSA 和 HCA 都是 optimizer，不参与模型前向"
answer: 0
explain: "CSA 保留 DSA 式 indexer/top-k 选择，但选择对象是压缩 KV；HCA 使用更强压缩并省去稀疏选择，用少量强压缩入口覆盖长历史。"
```

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
HISA 把 DSA 的全前缀 token-wise indexer 改造成“先选块、再选 token”的两阶段层次化索引，在不改 Sparse MLA、不重新训练的前提下，降低长上下文稀疏注意力中逐 token 搜索的 \(O(L^2)\) 瓶颈。

#### 🎯 核心要点
- 定位瓶颈：DSA 的 Sparse MLA 已经只对 top-k token 做 attention，但 indexer 仍要为每个 query 扫描全部历史 token
- 两阶段搜索：先用 pooled block representatives 做 block-level coarse filtering，再只在候选块内执行原 DSA token-level refinement
- 接口兼容：输出仍是每个 query 的 token index set \(\mathcal{T}_t\)，下游 Sparse MLA operator、KV cache layout 和模型权重保持不变
- 训练免费：HISA 是 plug-and-play indexer replacement，不需要 finetuning，也不改变注意力主算子
- 复杂度下降：单 query 索引成本从 \(\mathcal{O}(L)\) 变为 \(\mathcal{O}(L/B+mB)\)，单层从 \(\mathcal{O}(L^2)\) 变为 \(\mathcal{O}(L^2/B+LmB)\)
- 实证结果：论文在 DeepSeek-V3.2 和 GLM-5 上替换 indexer，LongBench/NIAH 质量接近原 DSA，同时在 64K indexer kernel 上报告约 \(2.16\times\) 到 \(3.75\times\) 加速

#### 🔬 深入细节
![HISA block-to-token indexer](https://arxiv.org/html/2603.28458v3/x2.png)
*图：arXiv HTML 中的 HISA indexer 子图；先选择相关 block，再在候选 block 内做 token-level top-k。*

![DSA flat token-wise indexer](https://arxiv.org/html/2603.28458v3/x1.png)
*图：作为对比，原 DSA indexer 对每个 query 扫描全部历史 indexing keys，成本随前缀长度线性增长。*

```python
# HISA: Hierarchical Indexed Sparse Attention
def hisa_indexer(q_index_heads, gate_weights, token_index_keys, B, m, k):
    # token_index_keys: {k_s^I}_{s=1..L}
    blocks = partition_contiguous_blocks(token_index_keys, block_size=B)
    pooled = [mean_pool(block) for block in blocks]  # \tilde{k}_b^I

    selected_tokens = {}
    for t in query_positions:
        # Stage 1: block-level coarse filtering under the causal mask.
        block_scores = {}
        for b, k_block in causal_eligible_blocks(pooled, t):
            block_scores[b] = sum(
                gate_weights[t][j] * relu(dot(q_index_heads[t][j], k_block))
                for j in range(num_index_heads)
            )
        candidate_blocks = topk(block_scores, m)
        candidate_blocks |= {first_block(), local_or_last_block(t)}

        # Stage 2: original DSA scoring restricted to candidate tokens.
        omega_t = union_tokens(candidate_blocks)
        token_scores = {}
        for s in omega_t:
            token_scores[s] = sum(
                gate_weights[t][j] * relu(dot(q_index_heads[t][j], token_index_keys[s]))
                for j in range(num_index_heads)
            )
        selected_tokens[t] = topk(token_scores, k)

    return selected_tokens  # consumed unchanged by Sparse MLA
```

HISA 的出发点是：token-level sparse attention 的主 attention 已经很省，但“决定看哪些 token”的 indexer 仍可能像全注意力一样贵。以 DSA 为例，indexer 为 query 位置 \(t\) 维护 indexing query \(\mathbf{q}^I_{t,j}\)、indexing key \(\mathbf{k}^I_s\) 和 per-head gate \(w^I_{t,j}\)，对每个历史 token \(s\) 打分：

$$
I_{t,s}=\sum_{j=1}^{H^I} w^I_{t,j}\cdot
\operatorname{ReLU}(\mathbf{q}^I_{t,j}\cdot\mathbf{k}^I_s)
$$

然后选出：

$$
\mathcal{T}_t=\operatorname{TopK}(I_{t,:},k)
$$

Sparse MLA 只在 \(\mathcal{T}_t\) 上计算：

$$
\mathbf{u}_t=\operatorname{Attn}\left(\mathbf{h}_t,\{\mathbf{c}_s\mid s\in\mathcal{T}_t\}\right)
$$

问题在于，虽然主 attention 从 dense \(\mathcal{O}(L^2)\) 降到 sparse \(\mathcal{O}(Lk)\)，但 indexer 对每个 query 仍扫描长度为 \(L\) 的前缀，单层索引成本还是 \(\mathcal{O}(L^2)\)。上下文到 128K、1M 后，这个 indexer 会从小开销变成主瓶颈。

HISA 的第一阶段把前缀切成 \(M=\lceil L/B\rceil\) 个连续 causal blocks \(\mathcal{B}_1,\ldots,\mathcal{B}_M\)，并为每个块维护 mean-pooled representative key：

$$
\tilde{\mathbf{k}}^I_b=\operatorname{Pool}(\{\mathbf{k}^I_s\mid s\in\mathcal{B}_b\})
$$

对 query \(t\)，HISA 复用 DSA 的 query/gate，但先对块代表打分：

$$
J_{t,b}=\sum_{j=1}^{H^I}w^I_{t,j}\cdot
\operatorname{ReLU}(\mathbf{q}^I_{t,j}\cdot\tilde{\mathbf{k}}^I_b)
$$

选出 top-\(m\) 个候选块：

$$
\mathcal{C}_t=\operatorname{TopK}(J_{t,:},m),\quad
\Omega_t=\bigcup_{b\in\mathcal{C}_t}\mathcal{B}_b
$$

论文还强制纳入 first block 和当前 query 附近的 last/local block：first block 承担 attention sink 作用，last/local block 保留最近上下文；所有块选择都遵守 causal mask。这一点很实用，因为 HISA 不是为了得到任意稀疏模式，而是要替换生产系统里的 DSA indexer，边界条件必须稳定。

第二阶段在候选 token 集 \(\Omega_t\) 内执行原始 DSA 打分：

$$
I_{t,s}=\sum_{j=1}^{H^I}w^I_{t,j}\cdot
\operatorname{ReLU}(\mathbf{q}^I_{t,j}\cdot\mathbf{k}^I_s),\quad s\in\Omega_t
$$

最终：

$$
\mathcal{T}_t=\operatorname{TopK}(\{I_{t,s}\mid s\in\Omega_t\},k)
$$

为了保证候选池足够大，需要满足 \(mB\ge k\)。当 \(t\le k\) 时，所有前缀 token 都可被选中，行为等价于 dense；当 \(k<t\le mB\) 时，粗筛不会真正剪掉块，HISA 退化为原 DSA；只有当 \(t>mB\) 时，块级粗筛开始显著减少搜索空间，这正是长上下文场景。

复杂度上，如果 pooled representatives 可以随 KV cache 增量维护，则单 query 只需扫 \(\lceil L/B\rceil\) 个块代表，再扫最多 \(mB\) 个候选 token：

$$
\mathcal{O}\left(\frac{L}{B}+mB\right)
$$

对一层内所有 query 求和：

$$
\mathcal{O}\left(\frac{L^2}{B}+LmB\right)
$$

相比原 DSA indexer 的 \(\mathcal{O}(L^2)\)，HISA 的收益随 \(m\ll M\)、\(B\ll L\) 越明显。这里有清晰 trade-off：更大的 \(B\) 减少块数但代表更粗，过小的 \(m\) 更快但更可能漏掉关键块；论文的经验设置在 block size 128、候选 token 池 8192、最终 token budget 2048 等配置下验证了速度和质量平衡。

HISA 与纯 block-sparse 的关键区别在第二阶段。纯块稀疏一旦选中一个块，就把块内所有 token 都交给 attention，预算会被许多无关 token 消耗；HISA 只把块当作快速候选生成器，最终仍返回 token-level sparse pattern。因此它可以保持 DSA 的细粒度选择接口，又避免对全前缀逐 token 打分。论文在 Needle-in-a-Haystack 和 LongBench 上发现，HISA 接近原 DSA，而 Block-Sparse 明显更容易在中间位置或语义混杂块中漏检。

#### 🧪 练习题
```yaml
question: "HISA 能作为 DSA indexer 的 plug-and-play 替换，关键原因是什么？"
options:
  - "它最终仍输出每个 query 的 token index set，Sparse MLA 和 KV cache layout 不需要改变"
  - "它把所有 attention 都替换成卷积"
  - "它删除了 token-level refinement，只保留 block-level selection"
  - "它需要重新预训练模型后才能使用"
answer: 0
explain: "HISA 只改变搜索路径：先块级粗筛再 token 级细筛；输出接口仍是 \\(\\mathcal{T}_t\\)，所以下游 Sparse MLA 可以原样消费。"
```

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
Orca 提出了 iteration-level scheduling 和 selective batching，把生成式 Transformer 服务从“整批请求跑到结束”改成“每轮 token 重新调度”，解决早完成请求被长请求拖住、晚到请求无法插队以及不同阶段请求难以共同批处理的问题。

#### 🎯 核心要点
- 以 decode iteration 为调度粒度：调度器每次只让执行引擎运行一轮模型，而不是把一批请求固定到全部完成。
- 用 request pool 替代静态 request queue：已到达但未完成的请求持续留在池中，每轮按到达顺序、最大 batch size 和 KV slot 预算选择。
- 区分 initiation phase 与 increment phase：长 prompt 的首次 prefill 和后续单 token decode 可以在同一调度机制下被统一管理。
- selective batching 只批量化不依赖 request 边界的算子，把 Attention 按请求拆开执行，再把结果 merge 回 token-wise batch。
- Attention K/V manager 维护跨 iteration 的 key/value 状态，调度器用 `max_tokens` 预留 KV slot，避免运行中因 cache 空间不足死锁。
- 支持 inter-layer 与 intra-layer model parallelism，并利用迭代级调度改善流水线并行中的空泡。

#### 🔬 深入细节
![Orca selective batching 图示](https://insujang.github.io/assets/images/240107/orca_selective_batching.png)
*图：Insu Jang 技术笔记中对 Orca 论文 Figure 5 的重绘，展示 selective batching；方法依据来自 USENIX OSDI 2022 官方论文 PDF，USENIX 页面未提供单独拆分的图片直链。*

```python
# Orca iteration-level scheduling，整理自论文 Algorithm 1
n_scheduled = 0
n_reserved = 0

while True:
    batch = []
    for req in sort_by_arrival_time(request_pool):
        if req.state == "RUNNING":
            continue
        if len(batch) == max_batch_size:
            break
        if req.state == "INITIATION":
            if n_reserved + req.max_tokens > n_kv_slots:
                break
            n_reserved += req.max_tokens
        batch.append(req)

    engine.run_one_iteration(batch)
    for req in batch:
        req.state = "RUNNING"
        n_scheduled += 1

    if n_scheduled == n_workers:
        returned = engine.wait_returned_batch()
        for req in returned:
            req.state = "INCREMENT"
            if req.finished():
                request_pool.remove(req)
                n_reserved -= req.max_tokens
        n_scheduled -= 1
```

Orca 的出发点是生成式 Transformer 与传统单次推理模型的执行形态不同。GPT 类模型一次请求要经历多次完整模型前向：首次 iteration 读入 prompt 并生成第一个 token，后续每个 iteration 只读入上一个 token 并生成下一个 token。若服务系统像 Triton + FasterTransformer 那样按 request-level batch 调度，一旦某个请求提前生成 `<EOS>`，它仍要等待同 batch 中最长请求结束；新来的请求也只能等当前 batch 全部完成。因此，静态 batching 在输出长度分布很宽时会同时制造额外计算、额外排队和响应延迟。

Orca 的核心机制是把调度接口下沉到“运行一轮模型”。每轮结束后，scheduler 都能观察哪些请求完成、哪些请求仍需继续 decode，并把新请求纳入下一轮候选集合。可以把系统状态理解为一个请求池 \(P\)，每轮调度选择：

$$
B_t=\operatorname{Select}(P_t,\ \text{max\_bs},\ \text{free\_kv\_slots})
$$

执行引擎只对 \(B_t\) 跑一次模型前向并返回一个 token。这个设计后来通常被称为 continuous batching：batch 的成员在 token iteration 之间连续变化，而不是在一个长请求批次生命周期内保持不变。

selective batching 解决的是另一个关键矛盾：迭代级调度会把不同阶段的请求放在同一批里，例如两个请求在 increment phase，只处理 \([1,H]\) token；另两个请求仍在 initiation phase，prompt 长度可能是 \([2,H]\) 与 \([3,H]\)。非 Attention 算子如 Linear、LayerNorm、Add、GeLU 通常只需要 token-wise 输入，可把所有 token 拼成：

$$
X_{\text{flat}}\in\mathbb{R}^{(\sum_i L_i)\times H}
$$

一起执行以复用参数读带宽。但 Attention 必须知道每个 token 属于哪个请求，因为 causal attention 只能访问同一请求的历史 KV；它天然需要 request boundary。Orca 因此在 Attention 前执行 Split，按请求分别计算 attention，再 Merge 回 flat tensor，让大部分参数化算子仍然享受 batching。

从机制上看，Orca 不是改变 Transformer 数学，而是改变 serving 系统与执行引擎的契约。Attention 中每层每个 token 的 key/value 会被保存为内部状态，后续 decode 时读取历史：

$$
\operatorname{Attn}(q_{l,t},K_{l,1:t},V_{l,1:t})
=\operatorname{softmax}\left(\frac{q_{l,t}K_{l,1:t}^{\top}}{\sqrt{d}}\right)V_{l,1:t}
$$

这意味着 KV cache 的生命周期跨越多个 iteration，不能像中间激活那样一轮后释放。论文中的调度算法在请求第一次被调度时按 `max_tokens` 预留 KV slots，完成时再释放，避免系统在所有请求都需要写入下一 token KV 但显存槽不足时停住。

Orca 的分布式设计把大模型并行纳入同一套调度语义。inter-layer parallelism 把层切到不同 worker，intra-layer parallelism 在层内切矩阵或 hidden 维度；调度器向 execution engine master 下发 batch，worker controller 再向各 GPU 下发控制消息和 token。由于每个 batch 只代表“一次 iteration”，流水线中不同 worker 可以更快接收下一批 iteration，减少 request-level batch 必须等完整生成结束带来的长空泡。与后来的 vLLM 相比，Orca 的主要贡献在调度和执行边界；它还没有引入分页式 KV cache，因此仍需要预留式 KV 管理。

> 💡 关键：Orca 让 GPU 调度单位从“请求完成时间”变成“token 生成步”，selective batching 则让这种细粒度调度不会因为 Attention 形状不一致而完全失去 batch 效率。

#### 🧪 练习题
```yaml
question: "Orca 为什么需要 selective batching？"
options:
  - "因为所有 Transformer 算子都无法批处理"
  - "因为不同请求处在不同 token 位置时，Attention 需要保留 request 边界，而非 Attention 算子仍可按 token 拼接批处理"
  - "因为 selective batching 可以删除 KV cache"
  - "因为它把模型训练改成了在线强化学习"
answer: 1
explain: "迭代级调度会混合不同 prompt/生成长度的请求；Orca 对非 Attention 算子做 token-wise batching，对 Attention split/merge，兼顾灵活调度和参数读复用。"
```

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
DeepSpeed-Inference 把面向推理的 Transformer kernel、张量/流水/专家并行和 ZeRO-Inference 异构卸载组合成一个系统，使从低延迟在线推理到资源受限的百亿、千亿乃至万亿参数模型推理都能落地。

#### 🎯 核心要点
- DeepSpeed Transformer 面向 GPU-only 场景，优化小 batch 低延迟和大 batch 高吞吐两类推理负载。
- Deep-Fusion 融合 LayerNorm、transpose、Attention 周边、bias/residual 等多类非 GeMM 操作，减少 kernel launch 和全局内存往返。
- SBI-GeMM 针对 small-batch inference 的 skinny GEMM 设计权重布局、tiling 和 cooperative-group reduction，提高有效内存带宽。
- 多 GPU dense transformer 结合 tensor parallelism 与 inference-optimized pipeline schedule，用 aggregate memory bandwidth 降低超大 dense 模型延迟。
- DeepSpeed-MoE 结合 expert parallelism、expert slicing、data/tensor parallelism 和 all-to-all 通信优化，服务稀疏 MoE 模型。
- ZeRO-Inference 使用 GPU + CPU + NVMe 异构存储，按层预取权重并把 GPU 显存更多留给激活和大 batch，支持 GPU 显存放不下的模型。

#### 🔬 深入细节
![DeepSpeed-Inference kernel 与 Deep-Fusion 图示](https://ar5iv.labs.arxiv.org/html/2207.00032/assets/x1.png)
*图：ar5iv 从论文生成的 Figure 1，展示 small-batch GeMM 调度、权重布局变换和 Deep-Fusion 策略。*

```python
# DeepSpeed-Inference 执行路径概念化伪代码
engine = DeepSpeedInferenceEngine(
    model,
    tensor_parallel_size=tp,
    pipeline_parallel_size=pp,
    kernel_injection=True,
    zero_inference=offload_to_cpu_or_nvme,
)

for request_batch in serving_loop():
    hidden = embed(request_batch.tokens)
    for stage in pipeline_stages:
        for layer in stage.layers:
            if zero_inference:
                prefetch(layer.weights, dst="gpu")

            hidden = deepspeed_transformer_kernel(
                hidden,
                layer.weights,
                kv_cache=request_batch.kv_cache,
                fused_ops=["layernorm", "qkv", "attention_io", "mlp", "residual"],
            )

            if zero_inference:
                evict_or_stream_next(layer.weights)
        hidden = send_to_next_pipeline_stage(hidden)
    emit_next_tokens(sample(hidden))
```

DeepSpeed-Inference 先把问题拆成两类：如果模型能放进聚合 GPU 显存，关键是低延迟和吞吐；如果模型放不进 GPU，关键是可行性和异构带宽利用。在线生成常用小 batch，此时延迟下界接近“把所有权重从显存读到计算单元”的时间，训练时代码常用的大 batch GEMM 并不合适。论文因此提出 DeepSpeed Transformer，用推理专用 kernel、CUDA Graph、张量并行和流水并行来最大化 memory bandwidth utilization，而不是只追求训练式的高算力占用。

Deep-Fusion 的设计直觉是：Transformer 层里很多耗时不来自大矩阵乘本身，而来自小算子的 kernel launch、全局内存写回和再读取。普通 fusion 多停留在 element-wise 操作；Deep-Fusion 以 tile 为单位分析依赖，只要第二个算子的每个 tile 只依赖第一个算子的一个输出 tile，就可以把 reduction、transpose、LayerNorm、部分 GeMM 周边逻辑一起放入同一 kernel。对一个 Transformer block，可近似写成：

$$
Y = X + W_o\operatorname{Attn}(W_q\operatorname{LN}(X), W_k\operatorname{LN}(X), W_v\operatorname{LN}(X))
$$

Deep-Fusion 的目标不是改变这个函数，而是把 \(\operatorname{LN}\)、QKV 投影前后的 layout 变换、attention 输出投影附近的数据搬运合并，减少中间张量写入 HBM 的次数。

SBI-GeMM 解决的是 small-batch skinny matrix multiplication。生成式推理的 token 数很少，矩阵形状常接近 \([B,H]\times[H,4H]\)，其中 \(B\) 很小，cuBLAS/CUTLASS 的训练场景优化不一定能吃满内存带宽。DeepSpeed-Inference 通过沿输出维切 tile、必要时沿输入维二次切分，并在 shared memory 中转置 partial result，让同一输出元素的部分和连续放置，再用 cooperative-group collectives 在寄存器中归约。权重读取也按 cache line 对齐重排，使每个 warp 更充分利用 128B cache line。

当模型跨 GPU 时，DeepSpeed-Inference 把并行策略按模型结构分层。dense transformer 主要用 tensor parallelism 切分线性层，并用流水并行扩展到多节点；MoE 模型则把 expert 参数按 expert parallelism 分散，同时保留 tensor slicing 处理非 expert 参数。论文中的调度思想是让推理阶段的 prompt processing 和 token generation 不被训练式 micro-batch 方式束缚：生成 token 有严格的前后依赖，流水线若只照搬训练 schedule 容易产生空泡，因此 DeepSpeed 使用 inference-optimized pipeline schedule 和 hybrid scheduling 来提高 prompt 和 decode 的设备利用率。

ZeRO-Inference 是另一条线：当模型权重远大于 GPU 显存时，不强行复制或常驻所有权重，而是把参数放在 CPU 或 NVMe，执行到某层时流式搬到 GPU。其有效性来自大 batch 下计算可以隐藏一部分 PCIe/NVMe 传输，且 GPU 显存不再被权重长期占满，可以容纳更大的 activation/KV 工作集。可以把单层执行时间粗略理解为：

$$
T_l \approx \max\left(T_{\text{compute}}(B,l),\ T_{\text{transfer}}(W_l)\right)
$$

当 batch 足够大、预取足够早时，权重传输被计算覆盖；当 batch 太小时，异构卸载会受传输延迟限制。因此 DeepSpeed-Inference 同时提供 GPU-only 低延迟路径和 ZeRO-Inference 资源受限路径，覆盖的是不同 serving 约束。

与 Orca/vLLM 这类主要优化请求调度和 KV cache 管理的系统不同，DeepSpeed-Inference 更偏向“模型本身太大、kernel 太慢、并行通信太贵”这组问题。它可以与 continuous batching 或分页 KV 思想互补：前者决定一轮服务里放哪些请求，DeepSpeed-Inference 决定这些请求经过超大 Transformer 层时如何在 kernel、GPU 集群和 CPU/NVMe 层面高效执行。

> 💡 关键：DeepSpeed-Inference 的核心不是单一算法，而是推理系统栈的组合优化：小 batch kernel 降低延迟，多 GPU 并行扩展带宽，ZeRO-Inference 用异构存储突破显存容量。

#### 🧪 练习题
```yaml
question: "ZeRO-Inference 为什么能让 GPU 显存放不下的模型仍可推理？"
options:
  - "它把 Transformer 的 Attention 层全部删除"
  - "它把权重常驻 CPU/NVMe，并在执行到对应层前预取到 GPU，让 GPU 显存主要用于当前计算、激活和缓存"
  - "它要求所有请求只生成一个 token"
  - "它通过训练一个更小模型替代原模型"
answer: 1
explain: "ZeRO-Inference 的关键是异构权重流式加载和预取；它牺牲部分传输开销，换取远超 GPU 显存容量的模型可执行性。"
```

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
vLLM 基于 PagedAttention 构建高吞吐 LLM serving 引擎，用分页式 KV cache、block table、copy-on-write 和 preemptive scheduling 解决显存碎片与重复 KV 复制问题，从而支撑更大的 continuous batch。

#### 🎯 核心要点
- PagedAttention 把每个请求的 KV cache 切成固定 token 数的 logical blocks，并映射到非连续 physical blocks。
- block table 承担虚拟内存页表角色，让 Attention kernel 按表读取离散 KV blocks，而上层仍看到连续 token 序列。
- 按需分配 block 减少预留式 contiguous KV cache 的 internal/external fragmentation，使显存浪费接近 block 尾部未填满空间。
- 支持 parallel sampling、beam search 和 shared prefix，通过 block 级共享与 copy-on-write 避免重复存储公共前缀。
- vLLM 将 block manager、scheduler、GPU workers 和 PagedAttention CUDA kernel 组合为端到端服务系统。
- 分布式执行采用 Megatron-LM 风格 tensor parallelism，中心 scheduler 维护统一 block table，各 GPU shard 只存自己 attention heads 的 KV。

#### 🔬 深入细节
![vLLM PagedAttention block table 图示](https://ar5iv.labs.arxiv.org/html/2309.06180/assets/x7.png)
*图：ar5iv 从 vLLM/PagedAttention 论文生成的 Figure 3，展示 logical KV blocks、block table 与 GPU physical KV blocks 的映射。*

```python
# vLLM / PagedAttention 推理循环概念化伪代码
while True:
    scheduler.admit(new_requests())

    batch = scheduler.select_running_requests(
        token_budget=max_tokens_per_step,
        block_budget=kv_cache_manager.free_blocks(),
    )

    for seq in batch:
        if seq.needs_new_block():
            physical = kv_cache_manager.allocate_block()
            seq.block_table.append(physical)

    logits = model.forward(
        input_tokens=[seq.last_token for seq in batch],
        block_tables=[seq.block_table for seq in batch],
        paged_kv_cache=kv_cache_manager.physical_blocks,
    )

    for seq, token in sample(logits):
        seq.append(token)          # append may fill current block or allocate next block
        if seq.finished():
            kv_cache_manager.free(seq.block_table)
        elif seq.is_forked() and seq.writes_shared_block():
            seq.block_table[-1] = kv_cache_manager.copy_on_write(seq.block_table[-1])
```

vLLM 论文指出 LLM serving 的吞吐瓶颈常常不是模型权重，而是动态增长的 KV cache。以 A100 40GB 上的 13B 模型为例，权重常驻显存，KV cache 可能占接近三成显存；传统系统为了让每个请求的 KV tensor 连续，会按最大长度或预测长度预留一大段空间。真实输出长度未知，短请求会留下大量 internal fragmentation；不同大小的连续段在反复分配释放后又造成 external fragmentation。结果是 batch size 被 KV 显存浪费限制，而不是被算力限制。

PagedAttention 借鉴操作系统虚拟内存。对请求 \(r\)，逻辑上仍有连续的 token 序列，但 KV 被切成固定大小 block：

$$
\text{logical\_block\_id}(t)=\left\lfloor\frac{t}{B}\right\rfloor,\quad
\text{offset}(t)=t\bmod B
$$

block table 负责把 \((\text{logical\_block\_id}, \text{offset})\) 翻译为 GPU 上的 physical KV block 地址。因为 physical blocks 大小相同、可非连续分配，外部碎片基本消失；因为只在需要时追加 block，内部碎片上界约为每个序列最后一个 block 的空槽，而不是整段最大长度预留。

PagedAttention 的 Attention 计算与标准 causal attention 数学一致：

$$
o_t=\operatorname{softmax}\left(\frac{q_tK_{1:t}^{\top}}{\sqrt{d}}\right)V_{1:t}
$$

变化在于 \(K_{1:t},V_{1:t}\) 不再要求物理连续。CUDA kernel 根据 block table 逐块读取 KV，并把 variable sequence length 的 batch 组织在同一次 kernel 中执行。论文实现还融合了 reshape + block write、block read + attention，以及 copy-on-write 引发的 block copy，避免分页抽象本身带来过多 kernel launch 和小拷贝开销。

vLLM 在系统层把 PagedAttention 与调度器绑在一起。scheduler 每轮选择可运行请求时不仅考虑请求状态，也考虑剩余 physical KV blocks；block manager 负责 allocate、free、fork、append。parallel sampling 和 beam search 会从同一个 prompt 分叉多个序列，传统实现要复制完整前缀 KV；vLLM 让多个序列的 block table 指向同一批 physical blocks，并维护引用计数。只有当某个序列要写入共享 block 时才 copy-on-write，因此前缀共享可以表达为：

$$
\operatorname{mem}_{\text{shared}}\approx \operatorname{mem}(\text{prefix})+\sum_i \operatorname{mem}(\text{suffix}_i)
$$

而不是 \(\sum_i \operatorname{mem}(\text{prefix}+\text{suffix}_i)\)。这也是它在 beam search、parallel sampling 和共享系统提示词场景中收益更大的原因。

分布式执行中，vLLM 使用 Megatron-LM 风格 tensor parallelism：线性层按 shard 计算，GPU workers 通过 all-reduce 同步中间结果；Attention head 维度被切分，所以每个 worker 只保存自己负责 head 的 KV cache。中心 scheduler 维护单一 KV cache manager 和 block table，并在每个 decoding iteration 开始时把 input token ids 与 block table 广播给所有 workers。这样内存管理决策集中在调度器，GPU worker 无需在运行中协商 block 分配，只按收到的映射执行 PagedAttention。

与 Orca 的关系可以这样理解：Orca 证明了 iteration-level scheduling 能提升生成服务吞吐，但它仍依赖预留或连续式 KV 管理；vLLM 继承 continuous batching 的服务模型，同时把 KV cache 改造成“分页内存”。当 KV 浪费下降后，同样延迟目标下可以同时容纳更多请求，因此论文报告 vLLM 相对 FasterTransformer/Orca 在多种 workload 上有 2-4 倍吞吐提升，且长序列、大模型和复杂 decoding 下提升更明显。

> 💡 关键：PagedAttention 不是新的注意力近似；它保持 attention 结果不变，只改变 KV cache 的物理布局和读取方式，让 serving scheduler 能把显存用在真实 token 状态上。

#### 🧪 练习题
```yaml
question: "vLLM 中 block table 的作用最接近操作系统里的什么结构？"
options:
  - "页表：把逻辑 token block 映射到物理 KV block"
  - "进程调度器：决定线程优先级"
  - "文件系统目录：记录文件名"
  - "编译器优化器：重写模型权重"
answer: 0
explain: "PagedAttention 将 KV cache 分成固定大小 block；block table 像页表一样把逻辑连续的 token 位置映射到物理上可非连续的 KV block。"
```

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
TensorRT-LLM 提出了面向 NVIDIA GPU 的端到端 LLM 推理栈，把模型构建、专用 kernel、KV cache 管理、continuous batching、多 GPU 并行和量化部署整合到同一套运行时中，解决通用 PyTorch/服务框架难以榨干硬件吞吐的问题。

#### 🎯 核心要点
- 以 `LLM` API、PyTorch-native model authoring 和 TensorRT/TensorRT-LLM runtime 统一模型定义、构建与服务部署
- `PyExecutor` 后台循环由 Scheduler、KVCacheManager、ModelEngine、Sampler 组成，负责异步请求调度、KV 分配、GPU forward 和采样
- In-flight batching 将 context/prefill 阶段和 generation/decode 阶段混合进同一批次，减少等待并提升 GPU 利用率
- Paged KV cache 将每层 KV 拆成固定 token block，由 cache manager 按需分配、复用、回收，缓解长短请求混跑造成的显存浪费
- 针对 NVIDIA GPU 提供 fused attention、GEMM、RMSNorm、sampling、CUDA Graph、Overlap Scheduler 等软硬件协同优化
- 支持 FP8、NVFP4/FP4、INT4 AWQ、INT8 SmoothQuant、FP8 KV cache 等低精度路径，降低显存和带宽压力
- 支持 tensor parallel、pipeline parallel、expert parallel、multi-node serving、LoRA、guided decoding、speculative decoding 等生产部署特性

#### 🔬 深入细节
![TensorRT-LLM 官方架构图](https://nvidia.github.io/TensorRT-LLM/_images/TRTLLM_Architecture_Overview.png)
*图：TensorRT-LLM 官方文档的 Architecture Overview，展示 `LLM` API、PyExecutor、Scheduler、KVCacheManager、ModelEngine 与 Sampler 的请求执行路径。来源：NVIDIA TensorRT-LLM documentation。*

```python
# TensorRT-LLM executor loop sketch
engine = build_or_load_model_engine(model, plugins, quantization, parallelism)
kv_manager = KVCacheManager(block_size=kv_block_size, reuse=True, offload=True)
scheduler = Scheduler(max_batch_size=max_batch_size, max_num_tokens=max_num_tokens)
sampler = Sampler(default_sampling_params)

while server.is_running():
    new_requests = request_queue.poll()
    scheduler.add(new_requests)

    batch = scheduler.select_ready(
        prefer_decode=True,
        allow_context_and_decode_together=True,
        token_budget=max_num_tokens,
    )
    kv_manager.allocate_or_reuse_prefix_blocks(batch)

    packed_tokens, block_tables = pack_without_padding(batch, kv_manager)
    logits = engine.forward(
        packed_tokens,
        kv_cache_blocks=block_tables,
        cuda_graph=graph_cache.match_or_pad(batch.shape),
    )

    next_tokens = sampler.sample(logits, batch.sampling_params)
    kv_manager.append_generated_tokens(batch, next_tokens)
    scheduler.finish_or_reschedule(batch, next_tokens)
    stream_tokens_to_clients(batch, next_tokens)
```

TensorRT-LLM 不是单个算法 kernel，而是一套“构建期 + 运行期”的推理系统。构建期把 HuggingFace/NeMo/自定义权重映射到 TensorRT-LLM 的模型表示，选择并行策略、量化策略、插件 kernel 和 shape/profile；运行期则通过 `LLM.generate()` 或 serving API 接收请求，由每个 rank 上的 `PyExecutor` 持续执行调度循环。这个分层设计的核心好处是把模型作者接口留在 Python/PyTorch 侧，把真正昂贵的 attention、GEMM、通信、采样和 KV 管理放到更贴近 CUDA/TensorRT 的执行层。

Transformer 自回归推理的重复计算主要来自 attention。第 \(l\) 层在第 \(t\) 个 token 的注意力可写成：

$$
\mathrm{Attn}_{l,t}=\mathrm{softmax}\left(\frac{q_{l,t}K_{l,\le t}^{\top}}{\sqrt{d}}\right)V_{l,\le t}
$$

其中 \(K_{l,\le t}\) 和 \(V_{l,\le t}\) 是历史 token 的 key/value。没有 KV cache 时，每生成一个 token 都要重新计算历史 token 的 key/value；TensorRT-LLM 把这些中间状态保存在每层 cache 中，只为新 token 追加 \(K_{l,t},V_{l,t}\)。若模型有 \(L\) 层、KV head 数为 \(H_{kv}\)、head 维度为 \(d\)、每个元素 \(b\) 字节、上下文长度为 \(T\)，单请求 KV 近似显存为：

$$
M_{\mathrm{KV}}\approx 2 \cdot L \cdot H_{kv} \cdot d \cdot T \cdot b
$$

这解释了为什么 KV cache 是长上下文服务的显存瓶颈，也解释了 TensorRT-LLM 为什么把 KVCacheManager 作为一等组件。

Paged KV cache 的机制类似把一条变长序列切成固定大小的 block。连续 KV cache 会按 `max_seq_len` 为所有请求预留大张量，短请求和提前结束的请求会留下大量空洞；paged KV cache 只在请求推进时从 block pool 分配新块，完成后回收。TensorRT-LLM 还支持跨请求前缀复用、优先级/LRU 驱逐、offload 等策略，因此同一个系统既能服务短问答，也能服务长 prompt 或多轮对话。直觉上，调度器看到的是逻辑 token 序列，kernel 看到的是压缩后的 block table，从而用一次间接寻址换取更高的显存利用率。

In-flight batching 解决的是服务端吞吐问题。传统静态 batching 往往等待一批请求到齐，并把 prefill 和 decode 分开跑；LLM serving 中 decode 每步通常只有一个新 token，若单独成批容易 GPU 利用率低。TensorRT-LLM 允许 context 阶段请求与 generation 阶段请求在同一迭代中执行，并用两个约束控制批次大小：

$$
|B| \le \mathrm{max\_batch\_size}, \qquad
\sum_{r\in B}\mathrm{tokens}(r) \le \mathrm{max\_num\_tokens}
$$

这里 \(\mathrm{tokens}(r)\) 对 prefill 请求是待处理 prompt token 数，对 decode 请求通常是 1 个或少量 token。调度器优先保证正在 decode 的请求能稳定产出 token，再用剩余 token budget 填入新的 prefill 请求。配合 remove input padding，输入 token 被 packed 成紧凑张量，避免把 decode 阶段的 1-token 请求 padding 到最长 prompt 长度。

性能收益还来自 kernel 和 runtime 的组合优化。TensorRT-LLM 的 ModelEngine 调用针对 NVIDIA 架构优化的 attention/GEMM/normalization/sampling 路径；CUDA Graph 将固定形状的 kernel launch 序列捕获为图，降低 Python 和 driver 的发射开销；Overlap Scheduler 则把第 \(n+1\) 步 GPU forward 提前发射，让 CPU 在 GPU 工作时处理第 \(n\) 步的停止条件、采样状态和响应更新。对在线服务而言，这类优化通常比单个 kernel 峰值更关键，因为端到端延迟还包含调度、采样、内存管理和网络流式返回。

量化是 TensorRT-LLM 深度适配硬件的另一条主线。FP8/FP4/NVFP4 降低权重、激活和 KV cache 的字节数，INT4 AWQ/GPTQ 侧重权重量化，FP8 KV cache 则直接降低 decode 阶段的 HBM 带宽压力。可粗略把 decode 的瓶颈看成：

$$
T_{\mathrm{decode}} \approx \max(T_{\mathrm{compute}}, T_{\mathrm{HBM}} + T_{\mathrm{comm}})
$$

当模型已经接近 memory-bound 时，降低 \(T_{\mathrm{HBM}}\) 往往比继续堆算力更有效；但量化也会引入精度校准、kernel 支持和不同 GPU 架构兼容性问题，因此 TensorRT-LLM 把量化 recipe、模型支持矩阵和硬件支持矩阵放在部署流程中统一处理。

与 vLLM、SGLang 等通用开源 serving 引擎相比，TensorRT-LLM 的定位更靠近 NVIDIA 软硬件栈的“极致性能库”。它不只做请求调度，也把 Tensor Core、NVLink/NCCL、TensorRT engine、CUDA Graph、低精度格式和多种并行策略纳入同一个优化空间。代价是部署通常更依赖 NVIDIA GPU 版本、容器、驱动和模型支持路径；收益是在 Hopper/Blackwell 等硬件上更容易获得低延迟、高吞吐和可预测的生产性能。

#### 🧪 练习题
```yaml
question: "TensorRT-LLM 中 in-flight batching 的关键作用是什么？"
options:
  - "把 context 阶段和 generation 阶段请求混合调度，提高 GPU 利用率并降低等待"
  - "把所有请求 padding 到同一最大长度，简化显存管理"
  - "只保留 CPU 上的 KV cache，避免占用 GPU 显存"
  - "用训练时的反向传播来提升推理精度"
answer: 0
explain: "In-flight batching 又称 continuous/iteration-level batching，它允许 prefill 与 decode 请求在同一迭代中共享 token budget，从而减少空转和排队。"
```

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
NVIDIA Dynamo 提出了面向数据中心规模生成式 AI 推理的分布式运行框架，通过 prefill/decode 物理解耦、KV-aware routing、KVBM、NIXL 和 Planner 控制回路，把单机推理后端扩展为可弹性调度、可复用 KV、可跨节点传输状态的生产级 serving 系统。

#### 🎯 核心要点
- 将 serving 拆成 Request Plane、Control Plane、Storage & Events Plane，分别处理请求执行、容量规划和 KV 状态传播
- 支持 PD disaggregation：Prefill worker 计算 prompt KV，Decode worker 接收 KV 后持续生成 token
- Router 同时考虑 worker 负载和 KV overlap，避免简单 round-robin 导致的 KV cache 重算
- Planner 根据 TTFT、ITL、GPU capacity、队列长度和流量形态决定 prefill/decode 资源比例与扩缩容目标
- KVBM 管理 KV block 的复用、驱逐、offload/recall，并把 GPU HBM、CPU DRAM、SSD、远端存储组织成多级缓存
- NIXL 为 prefill/decode worker 之间的 KV handoff 提供异步、低延迟、跨互连的数据传输抽象
- 后端无关，可集成 TensorRT-LLM、vLLM、SGLang、PyTorch 等推理引擎，并支持 Kubernetes/Grove、Gateway、故障检测和请求迁移

#### 🔬 深入细节
![Dynamo 官方三平面架构图](https://raw.githubusercontent.com/ai-dynamo/dynamo/main/docs/assets/img/dynamo-architecture.svg)
*图：Dynamo GitHub 设计文档中的架构图，展示 Request Plane、Control Plane、Storage & Events Plane 及其组件关系。来源：ai-dynamo/dynamo 官方仓库。*

![NVIDIA Dynamo PD 解耦架构图](https://developer-blogs.nvidia.com/wp-content/uploads/2025/03/inference-nvidia-dynamo-architecture-diagram-r2.png)
*图：NVIDIA 技术博客 Figure 3，展示 API Server、Smart Router、disaggregated serving、Prefill/Decode worker 与 NIXL 数据传输。来源：NVIDIA Developer Blog。*

```python
# Dynamo PD-disaggregated serving sketch
def serve(request):
    frontend.validate_and_normalize(request)

    prefill_worker = router.pick_prefill(
        request,
        score=lambda w: capacity(w) - queue_delay(w) + kv_overlap(request, w),
    )
    kv_meta = prefill_worker.prefill(request.prompt_tokens)
    publish_kv_event(request.id, kv_meta, location=prefill_worker)

    decode_worker = router.pick_decode(
        request,
        score=lambda w: capacity(w) - queue_delay(w) - transfer_cost(kv_meta, w),
    )
    nixl.transfer(kv_meta, src=prefill_worker, dst=decode_worker)
    kvbm.register(request.id, kv_meta, owner=decode_worker)

    for token in decode_worker.stream_decode(request.decode_params):
        frontend.stream(token)
        kvbm.update_generated_blocks(request.id, token)

    kvbm.release_or_retain(request.id, policy="reuse-aware")
```

Dynamo 的核心定位不是替代 TensorRT-LLM 或 vLLM 的单机 kernel/runtime，而是在这些后端之上补齐分布式推理系统层。GitHub 设计文档把它拆成三条路径：Request Plane 负责 Frontend、Router、Prefill worker、Decode worker 的低延迟请求流；Control Plane 负责 Planner、Operator、Discovery、Grove/KAI 等容量与拓扑控制；Storage & Events Plane 负责 KV Events、KVBM 和 NIXL，把 cache 的位置、生命周期和跨节点移动显式化。

PD 解耦来自 prefill 与 decode 的资源特征差异。Prefill 对长 prompt 做大矩阵并行，通常更 compute-bound；decode 每步只生成少量 token，但要频繁读取全部历史 KV，通常更 memory-bandwidth-bound。把二者放在同一 GPU 池会造成资源互相干扰。Dynamo 将一次请求拆成：

$$
\mathrm{request} = \mathrm{prefill}(P) \rightarrow \mathrm{transfer}(\mathrm{KV}(P)) \rightarrow \mathrm{decode}(Y\mid P)
$$

并允许 prefill 与 decode 使用不同并行策略、不同 GPU 数、不同扩缩容节奏。一个请求是否值得 PD 解耦，可用近似不等式判断：

$$
T_{\mathrm{prefill}} + T_{\mathrm{transfer}}(\mathrm{KV}) + T_{\mathrm{decode}} + T_{\mathrm{queue}}^{PD}
<
T_{\mathrm{agg}} + T_{\mathrm{queue}}^{agg}
$$

如果 prompt 很短或 KV transfer 代价过高，聚合式执行可能更好；如果 ISL 长、OSL 长或集群负载不均，PD 解耦更容易提升吞吐并稳定 TTFT/ITL。这也是 Dynamo Planner 存在的原因：它不是静态规定所有请求都走某种模式，而是根据 live metrics 和 SLO 调整资源。

KV handoff 是 PD 解耦的技术关键。Prefill worker 计算出的 \(\mathrm{KV}(P)\) 可能很大，近似字节数为：

$$
M_{\mathrm{KV}}\approx 2 \cdot L \cdot H_{kv} \cdot d_{\mathrm{head}} \cdot |P| \cdot b
$$

其中 \(L\) 是层数，\(H_{kv}\) 是 KV head 数，\(d_{\mathrm{head}}\) 是 head 维度，\(b\) 是元素字节数。若每个请求都把这些 KV 通过慢路径复制，PD 的排队收益会被 transfer 抵消。Dynamo 用 NIXL 抽象 HBM、DRAM、SSD、对象存储和网络传输路径，统一 UCX、GPUDirect、S3/custom backend 等数据移动语义，并让传输异步化，从而把 KV 从 prefill 池交到 decode 池。

Smart Router 解决的是“请求应该送到哪里”。普通负载均衡只看队列长度或 worker 数，容易把一个能复用 KV 的请求发到没有 cache 的 worker，导致重复 prefill。Dynamo Router 维护集群级 KV 可见性，对请求 token 做 overlap 估计，并把 cache 命中、队列深度和传输成本合成路由分数：

$$
\mathrm{score}(r,w)=
\alpha\cdot \mathrm{overlap}(r,w)
-\beta\cdot \mathrm{queue}(w)
-\gamma\cdot \mathrm{transfer}(r,w)
+\delta\cdot \mathrm{capacity}(w)
$$

实际实现会比这个式子复杂，但直觉一致：命中更多前缀、队列更短、KV 更近、容量更充足的 worker 更优。这样 Dynamo 可以服务多轮聊天、agent workflow、重复系统 prompt、相似 RAG 查询等高复用流量。

KVBM 把 KV cache 从“单 worker 私有显存状态”提升为系统资源。GPU HBM 最快但最贵，CPU DRAM、local SSD、NFS/对象存储更便宜但延迟更高。KVBM 根据访问频率、复用潜力、显存压力和策略，把 block 保留在 HBM、offload 到较低层级或 recall 回来。其目标不是盲目缓存全部 KV，而是在过度缓存带来的 lookup/offload 成本和缓存不足带来的重算成本之间取平衡。

Control Plane 让这个系统能在生产中运行。Planner 消费指标，输出 prefill/decode worker 的目标容量；Kubernetes 模式下 Operator 根据 DynamoGraphDeployment 等 CRD 协调资源；Grove/KAI 提供 topology-aware placement，使 worker group 能按机架、NVLink/NVSwitch、节点和 NUMA 约束成组放置。2026 年 3 月的 Dynamo 1.0 生产化资料还强调了 ModelExpress 权重流式加载、Inference Gateway 插件、故障检测、请求取消与迁移等能力，说明 Dynamo 的边界已经从“PD 原型”扩展到“多节点推理平台”。

与 TensorRT-LLM 的关系是上下层互补：TensorRT-LLM 擅长在 NVIDIA GPU 上把单模型/单节点或多节点执行做到极致；Dynamo 关注跨 worker 的路由、KV 生命周期、PD 编排、资源规划和故障恢复。与只做单机 continuous batching 的 serving 引擎相比，Dynamo 的创新点在于把“KV 是可移动、可复用、可调度的分布式状态”作为系统设计中心。

> ⚠️ 注意：PD 解耦不是免费收益。若 KV 传输慢、prefix 复用低、decode 队列空闲或 prompt 很短，额外的 transfer 与调度成本可能抵消收益；Dynamo Planner/Router/KVBM 的价值正是动态判断这些权衡。

#### 🧪 练习题
```yaml
question: "Dynamo 中 PD disaggregation 的主要目的是什么？"
options:
  - "将 prefill 和 decode 放到可独立扩缩容的 worker 池，并通过 KV transfer 衔接"
  - "把所有模型权重都移动到 CPU 上执行，完全避免 GPU 通信"
  - "只优化 tokenizer，不改变推理执行路径"
  - "用训练任务替代在线推理任务"
answer: 0
explain: "Prefill 和 decode 的计算/带宽特征不同，Dynamo 将二者物理解耦，并用 Router、KVBM、NIXL 管理 KV 状态和跨 worker handoff。"
```

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
FlashInfer-Bench 将 AI 生成 GPU 内核从“离线写代码”推进到“生产闭环”：用 FlashInfer Trace 统一描述内核契约、真实负载、候选实现和评测结果，再用 `flashinfer_bench.apply()` 把通过验证的最快内核注入 SGLang、vLLM 等推理引擎。它解决的是 LLM serving 中 attention、GEMM、MoE、sampling 等内核变体太多、手写维护和落地验证成本太高的问题。

#### 🎯 核心要点
- FlashInfer Trace：用 Definition、Workload、Solution、Evaluation 四类对象标准化 AI/工程师/评测系统之间的内核任务交换。
- 真实负载数据集：从 SGLang 服务轨迹中采集 DeepSeek-V3、Llama-3.1-8B、Qwen3-30B-A3B 等模型的 GEMM、Paged/Ragged GQA、Paged/Ragged MLA、Fused MoE、RMSNorm、Sampling 工作负载。
- 鲁棒评测：分别处理确定性内核、低精度内核和随机 sampling 内核，并提供隔离模式与持久 worker 模式，兼顾安全性和大规模 sweep 效率。
- 反馈式 agent：让模型根据 Definition 生成 CUDA/Triton/CUTLASS/CuTe DSL 等实现，运行 benchmark，把错误和性能反馈带回下一轮迭代。
- 动态替换路径：`apply()` 根据 Trace 中的最优评测结果替换 FlashInfer kernel，让通过验证的候选在上层推理引擎中 0-day 生效。
- 性能指标同时考虑正确性和速度：只有“正确且超过基线阈值”的 kernel-workload 组合才计入得分，避免只追求微基准速度。

#### 🔬 深入细节
![FlashInfer-Bench 闭环架构图](https://flashinfer.ai/assets/imgs/flashinfer-bench/image9.png)
*图：FlashInfer 官方博客中的 FlashInfer-Bench 架构图，展示 Trace、真实负载数据集、LLM agents/human experts、leaderboard 与 `flashinfer_bench.apply()` 到 LLM engine 的闭环。来源：https://flashinfer.ai/2025/10/21/flashinfer-bench.html*

```python
# FlashInfer-Bench feedback-loop agent 与生产替换流程（简化）
def optimize_and_apply(definition, workloads, language, hardware, max_rounds):
    best = None
    history = []

    for round_id in range(max_rounds):
        prompt = build_prompt(definition, language, hardware, history)
        solution = llm_agent.generate_kernel(prompt)

        report = flashinfer_bench.evaluate(
            definition=definition,
            solution=solution,
            workloads=workloads,
            mode="isolated_or_persistent",
        )
        history.append(report.summary_for_agent())

        if report.correct and (best is None or report.score > best.score):
            best = report
        if no_more_improvement(history):
            break

    if best is not None:
        flashinfer_bench.apply(best.trace)  # redirect FlashInfer operator dispatch
    return best
```

第一层机制是 **Trace 语义契约**。Definition 不是“给模型一段自然语言需求”，而是结构化地声明 `op_type`、输入输出张量、动态轴/静态轴、dtype、layout、ragged 输入以及 Python reference。以 paged attention 为例，KV page table 和 indptr 这类不规则输入不能只靠 shape 描述，Trace 会把完整 page table tensor 与索引指针一起建模，使 agent 知道它面对的是 paged/ragged attention，而不是普通 dense attention。Workload 则绑定真实请求中的具体张量或可复现实例；Solution 存代码、入口函数、兼容硬件和软件版本；Evaluation 存正确性、性能和环境快照。

第二层机制是 **正确性先于性能**。确定性 kernel 用逐元素误差判断：

$$
\left|\hat{y}_i-y_i\right| \le \text{atol}+\text{rtol}\cdot\left|y_i\right|,\quad \forall i
$$

其中 \(y_i\) 是 reference 输出，\(\hat{y}_i\) 是候选 kernel 输出；出现 NaN/Inf 直接失败。FP8 等低精度 kernel 不强制所有元素满足 tight bound，而是使用 matched-ratio 规则：

$$
\frac{1}{N}\sum_{i=1}^{N}\mathbf{1}\left[\left|\hat{y}_i-y_i\right|\le \text{atol}+\text{rtol}\left|y_i\right|\right]\ge \rho
$$

sampling 属于随机算子，不能逐样本比较。FlashInfer-Bench 先由 logits、top-k/top-p mask 和 temperature 得到目标分布 \(p\)，多次运行候选 kernel 得到经验分布 \(\hat{p}\)，再用总变差距离约束：

$$
\operatorname{TVD}(p,\hat{p})=\frac{1}{2}\sum_j \left|p_j-\hat{p}_j\right| \le \epsilon
$$

这保证 sampling kernel 没有把概率质量放到被 mask 掉的 token，也没有通过错误分布“看起来很快”。

第三层机制是 **把 benchmark 目标改成生产相关目标**。论文采用类似 KernelBench 的阈值曲线指标：对候选解 \(s\)、负载集合 \(W\)、速度阈值 \(\tau\)，只统计同时正确且比基线快超过阈值的比例：

$$
S_s(\tau)=\frac{1}{|W|}\sum_{w\in W}\mathbf{1}\left[\operatorname{correct}(s,w)\land \frac{T_{\text{base}}(w)}{T_s(w)}>\tau\right]
$$

改变 \(\tau\) 可以得到 correctness-speed 曲线，曲线面积反映综合能力。当 \(\tau=0\) 时，这个指标退化为正确率；当 \(\tau\) 变大时，只有真正快于 FlashInfer/PyTorch 基线的实现才保留下来。这样能避免 agent 用脆弱特化、未覆盖 corner case 或 benchmark hacking 取得虚假收益。

第四层机制是 **评测隔离与生产替换分离**。评测时，FlashInfer-Bench 可以把每个 solution 放在独立子进程里，运行结束或超时后销毁 CUDA context，防止候选代码读取残留显存、污染后续测试或破坏 worker；大规模 sweep 时又可以切换到持久 worker，用设备锁、warmup、CUDA event timing 和失败恢复机制降低上下文初始化开销。部署时，`apply()` 不要求 vLLM/SGLang 改写执行图，而是在 FlashInfer operator dispatch 层按 Definition 和 Workload 选择已验证实现，形成“生成-验证-替换-再采集”的闭环。

与 FlashAttention 相比，FlashInfer-Bench 的贡献不是单个 attention 算法，而是让 attention/GEMM/MoE/sampling 这类 GPU operator 可以被 AI 可靠地生成、评测和替换。FlashAttention 解决的是 attention 的 IO-aware 计算模式，FlashInfer 2025 版解决的是灵活 attention engine 和 plan/run kernel API；2026 的 FlashInfer-Bench 则把这些 kernel 变成可被 agent 持续改进的系统对象。它的核心判断是：LLM 可能写出有价值的内核，但只有结构化任务、真实负载、严格验证和可回滚的生产路径同时存在，AI 生成 kernel 才能进入 LLM serving 的关键路径。

#### 🧪 练习题
```yaml
question: "FlashInfer-Bench 为什么要把 Definition、Workload、Solution、Evaluation 分开建模？"
options:
  - "为了让 AI 只生成 Python 代码，不接触 GPU 内核"
  - "为了把内核语义、真实输入、候选实现和评测记录解耦，使生成、验证和生产替换都可复现"
  - "为了绕过 correctness check，直接按运行时间排序"
  - "为了只支持固定 batch size 的 dense GEMM"
answer: 1
explain: "四类 Trace 对象构成闭环协议：Definition 给出语义契约，Workload 给出真实输入，Solution 给出实现，Evaluation 给出可审计结果。"
```

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
vLLM v1 是 vLLM 对核心 serving 引擎的重构：把 scheduler、KV cache manager、worker、sampler 和 API server 重新组织到更简单的 EngineCore/worker 架构中，用统一 token budget 调度、增量状态同步、默认 prefix caching 和异步 single-step 思路减少 CPU 调度气泡。它继承 PagedAttention/continuous batching 的内核基础，但主要创新点转向“让 GPU 不等 Python 和控制面”。

#### 🎯 核心要点
- EngineCore 重构：将核心执行循环聚焦在 scheduler 与 model executor，并与 tokenization、detokenization、streaming、API server 等 CPU-heavy 路径重叠。
- 统一 scheduler：不再把 prefill 和 decode 作为两类特殊阶段，而是用 `{request_id: num_tokens}` 表示每步给每个请求分配的 token 数。
- 默认 chunked prefill：固定 token budget 下，长 prompt 可以被切成多步，与 decode 请求共同排队，降低长上下文请求对延迟的阻塞。
- 近零开销 prefix caching：优化 hash/LRU 数据结构和 Python object 创建，使 cache hit 低时也不会明显拖慢吞吐。
- Stateful SPMD workers：worker 侧缓存请求状态，driver/scheduler 每步只发送增量 diff，降低 tensor-parallel 输入广播和 IPC 开销。
- Persistent Batch 输入准备：复用上一轮输入张量和 block table，只对新增 token、block 和请求状态做增量更新。
- `torch.compile` 与 piecewise CUDA graphs：减少 eager 执行和 CUDA launch 开销，同时保留对多模型、多形状的兼容性。

#### 🔬 深入细节
![vLLM v1 统一 token budget 调度图](https://vllm.ai/blog-assets/figures/v1/v1_scheduling.png)
*图：vLLM 官方 V1 博客中的 scheduler 示例。每一步 scheduler 输出 `{request_id: num_tokens}`，把 prompt token 与 output token 都纳入同一个 token budget。来源：https://vllm.ai/blog/2025-01-27-v1-alpha-release*

```python
# vLLM V1 / RFC-style async single-step scheduling（简化）
engine = EngineCore(scheduler, kv_cache_manager, model_executor)
pending_gpu_future = None

while engine.running:
    engine.ingest_api_events_nonblocking()

    # 当 GPU 正在执行第 n 步时，CPU 侧尽量准备第 n+1 步
    budget = scheduler.token_budget()
    plan = scheduler.schedule(
        running_requests=engine.running_requests,
        waiting_requests=engine.waiting_requests,
        kv_budget=kv_cache_manager.free_blocks(),
        max_tokens=budget,
    )  # e.g. {"r1": 1, "r2": 1, "r3": 8}

    input_diff = build_incremental_inputs(plan, persistent_batch=True)
    kv_cache_manager.reserve(plan)

    if pending_gpu_future is not None:
        completed = pending_gpu_future.poll_or_wait_if_needed()
        scheduler.commit_outputs(completed)
        kv_cache_manager.commit(completed)

    pending_gpu_future = model_executor.submit(input_diff)
```

vLLM v1 的核心不是把 PagedAttention 换成另一个 attention，而是把 **控制面成本纳入一等优化目标**。当 H100/B200 上小模型一次 forward 只需要几毫秒时，API server、调度、输入准备、detokenization、streaming 和 Python object 维护都会显得很重。V1 把核心循环收敛为 EngineCore，使它只处理 scheduler 与 model executor；API server 和文本处理等工作通过多进程/异步路径与模型执行重叠。用一个简化式子看，单步时间不再近似为 \(T_{\text{gpu}}+T_{\text{cpu}}\)，而希望变成：

$$
T_{\text{step}}\approx \max(T_{\text{gpu}}, T_{\text{cpu-hidden}})
$$

当 CPU 准备第 \(n+1\) 步能和 GPU 执行第 \(n\) 步重叠时，GPU idle fraction 近似从 \(\frac{T_{\text{cpu}}}{T_{\text{gpu}}+T_{\text{cpu}}}\) 下降到 \(\frac{\max(0,T_{\text{cpu}}-T_{\text{gpu}})}{\max(T_{\text{gpu}},T_{\text{cpu}})}\)。这就是任务元信息里“零泡沫异步调度”的工程含义：不是没有任何 CPU 工作，而是尽量让 CPU 工作不出现在 GPU critical path 上。

统一 scheduler 是第二个关键点。V0 时代很多逻辑围绕 prefill/decode 两阶段展开，chunked prefill、prefix caching、speculative decoding 往往各自引入特殊路径。V1 把调度决策压缩成 token 分配：

$$
\sum_{r\in \mathcal{B}}\Delta_r \le B,\quad \Delta_r\in\mathbb{Z}_{\ge 0}
$$

其中 \(B\) 是本步 token budget，\(\Delta_r\) 是请求 \(r\) 在本步处理的 token 数。prompt token 和 decode token 都只是“待处理 token”，因此长 prompt 可以被切片，decode 请求也能穿插执行。KV cache manager 再根据 block size 计算新增 block：

$$
\operatorname{new\_blocks}_r=\left\lceil\frac{\operatorname{cached}_r+\Delta_r}{b}\right\rceil-\left\lceil\frac{\operatorname{cached}_r}{b}\right\rceil
$$

这让 scheduler、prefix cache 和 PagedAttention 的 block 分配在同一套预算模型下工作。

第三个机制是 **stateful worker + diff 同步**。在 tensor parallel 场景里，如果 scheduler 每步都向所有 worker 广播完整 request metadata、token IDs、block table 和 sampling params，IPC 和 Python 序列化会快速膨胀。V1/RFC 的设计让 worker 保存大部分请求状态，driver 只发送新增请求、已调度请求 ID、新 block ID 等增量。这个设计的直觉类似数据库 WAL：完整状态留在 worker，本步只传“变化”。它同时让单 GPU 和多 GPU worker 的执行路径更对称，降低 Worker 0 与 scheduler 共址这类历史优化造成的架构复杂度。

第四个机制是 **把缓存优化默认化**。V1 的 prefix caching 仍然基于 hash 和 LRU，但重点是把 eviction 做到常数时间、减少 Python object 创建，并在 cache hit rate 为 0% 时也维持接近零额外开销。因此 prefix caching 可以默认打开，命中共享系统 prompt、RAG 文档、多轮上下文时获得收益，未命中时也不明显拖慢请求。Persistent Batch 同理：上一轮输入张量和 block table 不是每步重建，而是按 diff 更新，从而降低模型越来越快后暴露出的 CPU 准备成本。

与原始 vLLM 相比，v1 的边界更清楚：vLLM 早期论文贡献是 PagedAttention 和 continuous batching，把 KV cache 当作分页内存管理，解决高并发内存碎片和 batch 组织问题；V1 则是在这些 kernel 与内存机制之上重构执行引擎，目标是把 chunked prefill、prefix caching、spec decode、多模态预处理、tensor parallel 和 CUDA graph 等功能放进统一架构。它不是单个新 kernel，而是一套降低 CPU overhead、减少 GPU 空泡并提升可维护性的 serving runtime。

#### 🧪 练习题
```yaml
question: "vLLM v1 统一 scheduler 中 `{request_id: num_tokens}` 的主要作用是什么？"
options:
  - "把 prefill token 和 decode token 统一成同一种预算资源，便于 chunked prefill、prefix caching 和 speculative decoding 共享调度路径"
  - "强制每个请求每步只能生成一个 token"
  - "替代 KV cache，不再需要 block table"
  - "只用于统计 API server 的 HTTP 请求数"
answer: 0
explain: "V1 用固定 token budget 给请求分配本步处理量，避免 prefill/decode 两套特殊逻辑，使调度和 KV block 分配可以统一优化。"
```

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
SGLang v0.5 的重点从单机前缀复用扩展到大规模 MoE 与分离式推理：用 Elastic Expert Parallelism 在专家/DP rank 层提供故障与弹性能力，用 GPU Staging Buffer 在异构 TP 的 prefill-decode disaggregation 中把碎片化 KV 传输合并成高效 RDMA 传输。它解决的是 DeepSeek/Qwen-MoE 这类模型在多 GPU、多节点、PD 分离场景下的专家路由不均、局部故障和 KV 跨实例传输效率问题。

#### 🎯 核心要点
- Expert Parallelism：把 MoE experts 分布到多个 GPU rank，token 由 Top-K router 分派到对应 expert，再经 all-to-all dispatch/combine 汇总。
- 模块化 MoE 框架：`FusedMoE.forward -> Dispatcher.dispatch -> MoeRunner.forward -> Dispatcher.combine`，可插入 DeepEP、Mooncake、NIXL、FlashInfer、CUTLASS、DeepGEMM 等后端。
- Elastic EP：通过 DP rank 健康状态、expert-to-GPU 动态映射、冗余专家和 Mooncake EP，在部分 rank 失败时继续服务。
- EPLB 负载均衡：根据专家激活统计重新摆放或复制 experts，降低 GPU utilization 方差和 expert 热点。
- GPU Staging Buffer：在 prefill TP 与 decode TP/DP attention 不一致时，把 KV head slices 先 gather 到连续 GPU buffer，再批量 RDMA，最后 scatter 到 decode KV pages。
- v0.5 系列工程化：release 资料显示 v0.5.12 已把 DeepSeek V4、Expert Parallelism、Context Parallelism、Data Parallel Attention、PD Disaggregation、HiSparse、FlashMLA/DeepGEMM/MegaMoE 等纳入生产路径。

#### 🔬 深入细节
![SGLang Elastic EP 架构图](https://www.lmsys.org/images/blog/eep-partial-failure-tolerance/figure.png)
*图：LMSYS/SGLang 官方博客中的 Elastic EP 4-GPU 示例。scheduler 层过滤失效 DP rank，EP 层重新分配 expert-to-GPU mapping，使输出保持正确。来源：https://www.lmsys.org/blog/2026-03-25-eep-partial-failure-tolerance/*

```python
# SGLang v0.5 MoE + Elastic EP + GPU staging buffer（简化）
def serve_request(request):
    prefix_node = radix_cache.match(request.prompt)
    hidden = prefill_suffix(request.prompt, prefix_node)

    for layer in model.layers:
        if not layer.is_moe:
            hidden = layer.forward(hidden)
            continue

        active_ranks = elastic_ep_state.active_ranks()     # 1 = alive, 0 = inactive
        routes = topk_router(hidden, active_ranks)         # token -> experts
        dispatch_buf = dispatcher.dispatch(hidden, routes) # DeepEP/Mooncake/NIXL
        expert_out = moe_runner.grouped_gemm(dispatch_buf) # DeepGEMM/FlashInfer/etc.
        hidden = dispatcher.combine(expert_out, routes)

    if request.pd_disaggregation and request.prefill_tp != request.decode_tp:
        staged = staging_buffer.gather_kv_heads(hidden.kv_cache_pages)
        rdma_bulk_send(staged, decode_worker)
        decode_worker.scatter_to_kv_pages(staged)

    return decode_stream(hidden, radix_cache)
```

MoE 的基本计算可以写成：

$$
y_t=\sum_{e\in \operatorname{TopK}(x_t)} g_{t,e}\,E_e(x_t)
$$

其中 \(x_t\) 是 token hidden state，\(E_e\) 是第 \(e\) 个 expert，\(g_{t,e}\) 是 router 给该 expert 的权重。Expert Parallelism 的难点在于 \(E_e\) 分布在不同 GPU 上，token 需要先 dispatch 到持有对应 expert 的 rank，执行 grouped GEMM 后再 combine 回原顺序。SGLang 的 EP 文档把这条路径拆成 TopK、Dispatcher、MoeRunner、pre/post-permute、combine 等模块，使 all-to-all 后端和 MoE GEMM 后端可以独立替换。

Elastic EP 在这个 MoE 公式外面加了一层 **可变 expert-to-rank 映射**。令 \(a_r\in\{0,1\}\) 表示 rank \(r\) 是否可用，令 \(m(e)\) 表示 expert \(e\) 当前所在的物理 rank；故障后不再假设 \(m(e)\) 固定，而是重建到健康 rank 的映射：

$$
m'(e)\in\{r\mid a_r=1\},\quad \forall e\in\mathcal{E}_{\text{needed}}
$$

scheduler 层先把失效 DP rank 从新 batch 中屏蔽，EP 层再通过冗余专家和 Mooncake 的容错通信把丢失 expert 迁移或重映射。官方 Elastic EP 文章报告，在 4 节点 32 GPU DeepSeek V3.2 测试中，模拟 1 到 16 个 rank 失败时服务中断保持在约 6 秒量级，并避免传统整实例重启的分钟级停机。

EPLB 解决的是另一个 MoE 常见问题：router 的 Top-K 选择不是均匀分布，热门 experts 会让某些 GPU 忙到成为尾延迟来源。SGLang 集成 DeepSeek 的 Expert Parallelism Load Balancer，按 expert 激活统计计算重排/复制方案，目标是最小化 rank 间计算时间或利用率方差。直观上，如果第 \(r\) 个 rank 的估计负载是 \(L_r=\sum_{e:m(e)=r} c_e\)，EPLB 希望降低：

$$
\max_r L_r-\frac{1}{R}\sum_{r=1}^{R}L_r
$$

这比静态均分 experts 更适合真实线上流量，因为不同领域、不同提示模板会激活不同 expert 子集。

GPU Staging Buffer 针对的是 **PD disaggregation 的 KV 传输碎片化**。prefill worker 负责长 prompt 的 KV 生成，decode worker 负责后续逐 token 生成；当两侧 TP size 不同，例如 prefill TP=4 而 decode 侧使用 DP attention/有效 TP=1 时，KV cache 的 head layout 不一致。朴素实现会把许多小的 KV head slices 逐 token、逐 head 发送，RDMA 请求数高且难以打满带宽。staging buffer 的流程是：

$$
\text{many small slices}\xrightarrow{\text{gather}}\text{contiguous GPU buffer}\xrightarrow{\text{bulk RDMA}}\text{decode staging pool}\xrightarrow{\text{scatter}}\text{KV pages}
$$

官方 PD disaggregation 文档说明，这个机制在高并发异构 TP 传输下可带来约 2-5 倍吞吐提升，并在同构 TP 时自动 bypass。相关环境变量包括 `SGLANG_DISAGG_STAGING_BUFFER`、`SGLANG_DISAGG_STAGING_BUFFER_SIZE_MB` 和 `SGLANG_DISAGG_STAGING_POOL_SIZE_MB`；它主要面向 GQA/MHA 这类非 MLA 模型，DeepSeek-V2/V3 的 MLA 场景不应盲目开启。

与 SGLang 早期版本相比，v0.5 的重心更偏生产后端。原始 SGLang/RadixAttention 的优势在于结构化程序、共享前缀和 radix cache，使多轮对话、RAG 和 agentic workflow 能复用 KV；v0.5 系列则把这些缓存能力放到更复杂的 MoE、PD disaggregation 和多节点场景中。Elastic EP 让专家层在局部失败或弹性扩缩时还能维持数学正确性，GPU staging buffer 则让 prefill/decode 分离不被 KV 小包传输拖垮。二者共同体现了 SGLang v0.5 的方向：不是只追单 kernel 速度，而是把缓存、路由、通信、故障恢复和专家负载放进统一 serving runtime。

#### 🧪 练习题
```yaml
question: "SGLang v0.5 中 GPU Staging Buffer 主要优化什么问题？"
options:
  - "异构 TP 的 PD disaggregation 中 KV head slices 过于碎片化，导致大量小 RDMA 传输"
  - "MoE router 的训练损失不收敛"
  - "浏览器前端的静态资源加载"
  - "单机 tokenizer 的词表大小"
answer: 0
explain: "staging buffer 先把 prefill 侧 KV head slices gather 成连续 GPU buffer，再批量传输并在 decode 侧 scatter 到 KV pages，减少小包和 layout mismatch 带来的开销。"
```

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
GPTQ 提出了一种面向 GPT/OPT/BLOOM 级大模型的 one-shot 权重量化方法，把低比特量化写成逐层二阶重建问题，并在每列权重量化后用近似 Hessian 逆补偿剩余权重误差。它解决了简单 round-to-nearest 在 3/4-bit 下精度崩坏、而传统二阶 PTQ 又难以扩展到千亿参数模型的问题。

#### 🎯 核心要点
- 逐层最小化量化前后线性层输出误差，而不是只最小化权重本身的舍入误差
- 用少量校准激活构造二阶近似 Hessian，论文实现中使用 128 个 C4 的 2048-token 片段
- 继承 OBQ/OBS 的误差补偿思想：量化一个权重或列后更新未量化权重以抵消输出偏移
- 将 OBQ 的逐行独立顺序改成所有行共享列顺序，使 \(H^{-1}\) 的消元更新只需按列执行
- 使用 lazy batch-update 把列级更新攒成 block，提高 GPU 计算和内存访问效率
- 使用 dampening 与 Cholesky reformulation 稳定大模型上的 Hessian 逆信息
- 目标是 weight-only 3/4-bit PTQ；论文不量化激活，推理加速主要来自低比特权重加载和专用 kernel

#### 🔬 深入细节
![GPTQ block-wise quantization procedure](https://ar5iv.labs.arxiv.org/html/2210.17323/assets/x3.png)
*图：GPTQ 论文 Figure 2，经 ar5iv 渲染；白色列表示当前正在量化的列，蓝色区域表示 block 内 lazy update 和 block 结束后的全局剩余权重更新。*

```python
# GPTQ: layer-wise weight-only quantization, simplified from Algorithm 1
def gptq_quantize_layer(W, X, bits, block_size=128, damping=0.01):
    # X: calibration inputs of this linear layer
    H = 2 * X @ X.T
    H = H + damping * mean(diag(H)) * eye(H.shape[0])
    Hinv_info = cholesky(inv(H)).T

    Q = zeros_like(W)
    for start in range(0, W.shape[1], block_size):
        stop = min(start + block_size, W.shape[1])
        E = zeros(W.shape[0], stop - start)

        for j in range(start, stop):
            q = quantize_to_grid(W[:, j], bits)
            Q[:, j] = q
            err = (W[:, j] - q) / Hinv_info[j, j]
            E[:, j - start] = err

            # 只更新当前 block 内还会影响后续舍入决策的列
            W[:, j:stop] -= err[:, None] * Hinv_info[j, j:stop]

        # block 处理完后，再批量更新右侧所有未量化列
        W[:, stop:] -= E @ Hinv_info[start:stop, stop:]

    return pack_low_bit(Q)
```

GPTQ 的基本目标是让每个线性层在校准输入 \(X\) 上保持输出不变。若原始权重为 \(W\)，量化后权重为 \(\hat W\)，逐层重建目标可以写成：

$$
\hat W = \arg\min_{\tilde W \in \mathcal{Q}} \lVert WX - \tilde W X \rVert_2^2
$$

这里 \(\mathcal{Q}\) 是低比特量化网格。直接 RTN 只关心 \(\lVert W-\hat W\rVert\)，但 GPTQ 关心的是权重误差乘上真实激活后的输出误差。因此，同样大小的权重误差在高能量输入通道上更重要，这正是 Hessian 信息有用的原因。

OBQ 的二阶形式把单行权重的局部目标写成一个二次问题，Hessian 近似为 \(H=2XX^\top\)。当第 \(j\) 列被量化到 \(q_j=\operatorname{quant}(W_{:,j})\) 后，GPTQ 用下式计算需要传播到右侧未量化列的误差：

$$
E_{:,j}=\frac{W_{:,j}-q_j}{[H^{-1}]_{jj}}, \qquad
W_{:,j:} \leftarrow W_{:,j:}-E_{:,j}[H^{-1}]_{j,j:}
$$

直觉上，被量化列造成的输出偏差并不完全由它自己承担，右侧未冻结的权重还可以被微调。\(H^{-1}\) 的第 \(j\) 行告诉算法：为了抵消当前列的舍入误差，哪些后续通道最适合承担补偿。

GPTQ 相比原始 OBQ 的关键扩展在于“共享列顺序”。OBQ 会为每一行独立选择下一个要量化的权重，导致每行都维护不同的未量化集合和 Hessian 逆，复杂度难以扩展。GPTQ 强制所有行按同一列顺序处理，这让 \(H^{-1}\) 只依赖输入激活和列集合，不依赖具体权重行，从而把大量重复的逆矩阵更新合并成一次列级更新。

lazy batch-update 解决的是 GPU 上的工程瓶颈。若每处理一列都更新整个右侧大矩阵，操作会变成大量小粒度内存读写，算力利用率很差。GPTQ 先在一个 block 内更新会影响后续舍入的局部列，等 block 结束后再用矩阵乘法形式批量更新右侧全部列，保持相同算法含义但显著提高吞吐。

数值稳定性是另一个核心细节。论文指出反复消元会让大模型层中的 \(H^{-1}\) 变得不定，导致补偿方向错误；因此 GPTQ 对 \(H\) 加入约为平均对角值 1% 的 dampening，并用 Cholesky 形式预计算后续所需的逆 Hessian 行信息。这个改动不是装饰性的，它是让算法能稳定跑在 OPT-175B/BLOOM-176B 这类模型上的前提。

> 💡 关键：GPTQ 不是通过训练恢复精度，而是在量化每一层时“即时重分配误差”。它的优势来自二阶补偿，代价是需要校准样本、Hessian 近似和比 RTN 更重的离线量化计算。

#### 🧪 练习题
```yaml
question: "GPTQ 能把 OBQ 扩展到千亿参数模型的关键原因是什么？"
options:
  - "对每个权重独立训练一个缩放器"
  - "让所有行按相同列顺序量化，从而共享 Hessian 逆更新并使用 block lazy update"
  - "完全跳过校准数据，只根据权重均值量化"
  - "把激活和权重都量化到 INT8"
answer: 1
explain: "共享列顺序让 Hessian 逆信息可以跨行复用，lazy block 更新又提高 GPU 吞吐；二者共同把二阶量化从小模型推到 GPT 级模型。"
```

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
SmoothQuant 提出一种训练无关的等价通道缩放，把 LLM 激活 outlier 的量化难度离线迁移到更容易量化的权重上，从而让 Transformer 中主要 GEMM/BMM 可以执行硬件友好的 W8A8 INT8 推理。

#### 🎯 核心要点
- 针对 LLM 激活通道中的系统性 outlier，解决直接 INT8 激活量化时有效比特不足的问题
- 利用线性层等价变换 \(Y=XW=(X\operatorname{diag}(s)^{-1})(\operatorname{diag}(s)W)\)
- 用每通道平滑因子 \(s_j\) 缩小激活动态范围，并等价放大对应输入通道权重
- 引入迁移强度 \(\alpha\)，在激活量化难度和权重量化难度之间连续折中
- 离线用校准样本统计激活最大值，论文实验使用 Pile 验证集随机句子校准
- 将 smoothing factor 融合进前序 LayerNorm/linear 或 residual 分支，避免运行时额外 kernel
- 在线推理把 linear 和 attention BMM 的输入/权重映射到 INT8，保留 Softmax、LayerNorm 等轻量算子为 FP16

#### 🔬 深入细节
![SmoothQuant intuition](https://raw.githubusercontent.com/mit-han-lab/smoothquant/main/figures/intuition.png)
*图：SmoothQuant 官方 GitHub 仓库中的 intuition 图；左侧激活 outlier 拉大量化范围，右侧通过平滑变换把难度迁移到权重后，激活和权重都更容易量化。*

```python
# SmoothQuant: offline smoothing and W8A8 deployment
def smoothquant_linear(W, calibration_acts, alpha=0.5):
    # act_absmax[j]: input channel j 上校准激活的最大绝对值
    act_absmax = max_abs_per_input_channel(calibration_acts)
    # weight_absmax[j]: W 的输入通道 j 对应整行/整组权重最大绝对值
    weight_absmax = max_abs_per_input_channel(W)

    s = (act_absmax ** alpha) / (weight_absmax ** (1 - alpha))
    W_smooth = diag(s) @ W
    return W_smooth, s

def int8_inference(X, W_smooth, s):
    X_smooth = X @ diag(1 / s)      # 实际部署中通常离线融合掉这一步
    X_int8, sx = quantize_int8(X_smooth)
    W_int8, sw = quantize_int8(W_smooth)
    return int8_gemm(X_int8, W_int8, sx, sw)
```

LLM 的激活量化难点在于 outlier 会支配统一量化步长。对 \(N\)-bit 对称均匀量化，常见量化步长为：

$$
\bar X_{\mathrm{INT8}}=\left\lceil \frac{X_{\mathrm{FP16}}}{\Delta}\right\rfloor,\qquad
\Delta=\frac{\max(|X|)}{2^{N-1}-1}
$$

当某些通道的 \(\max(|X|)\) 远高于其他值时，大部分普通激活只能落在很少的离散格点上，有效比特数下降。LLM.int8() 通过混合精度保留 outlier 可以保精度，但 outlier 分解会让硬件实现变复杂，难以把所有大矩阵乘法都落到高效 INT8 kernel 上。

SmoothQuant 的核心是一个完全等价的对角缩放。对 Transformer 线性层 \(Y=XW\)，选择每个输入通道的正缩放因子 \(s_j\)，有：

$$
Y=XW=(X\operatorname{diag}(s)^{-1})(\operatorname{diag}(s)W)=\hat X\hat W
$$

这意味着激活通道可以除以 \(s_j\) 变“平滑”，而权重对应输入通道乘以 \(s_j\) 后承担这部分尺度。因为权重通常比激活更稳定、更容易做 per-channel 或 per-tensor INT8 量化，所以把一部分难度迁移过去能同时保持精度和硬件友好性。

迁移强度由 \(\alpha\) 控制，论文给出的平滑因子是：

$$
s_j=\frac{\max(|X_j|)^\alpha}{\max(|W_j|)^{1-\alpha}}
$$

\(\alpha=0\) 时几乎不处理激活 outlier，\(\alpha=1\) 时把激活范围强行拉平但会让权重更难量化。论文发现 OPT/BLOOM 多数情况下 \(\alpha=0.5\) 是平衡点，GLM-130B 这类激活 outlier 更强的模型可以用更大的 \(\alpha\)，如 0.75。

部署流程分为离线校准和平滑融合。离线阶段记录每层输入激活的通道最大值，计算 \(s\)，再把 \(\operatorname{diag}(s)\) 融入当前层权重，把 \(\operatorname{diag}(s)^{-1}\) 尽量融合进上一层 LayerNorm、linear 或 residual 分支。这样运行时看到的是已经平滑后的激活分布，不需要额外插入昂贵的逐元素缩放 kernel。

SmoothQuant 与 GPTQ/AWQ 这类 weight-only 低比特方法的目标不同。GPTQ 追求 3/4-bit 权重压缩，矩阵乘通常仍要处理 FP16 激活；SmoothQuant 追求 W8A8，把权重和激活都变成 INT8，使 linear、attention BMM 这类主要算子能直接使用成熟 INT8 GEMM。它牺牲了一部分压缩率，但换来更通用的硬件加速路径。

> 💡 关键：SmoothQuant 并不是“消除 outlier”，而是用数学等价变换改变 outlier 所在张量。输出不变，量化难度的位置变了。

#### 🧪 练习题
```yaml
question: "SmoothQuant 中参数 alpha 的作用是什么？"
options:
  - "控制迁移多少激活量化难度到权重上"
  - "决定模型训练轮数"
  - "选择剪枝后的稀疏率"
  - "替代 attention 的 softmax 温度"
answer: 0
explain: "alpha 越大，激活被平滑得越强，更多动态范围压力会转移到权重；alpha 过大或过小都会让一侧量化误差变大。"
```

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
SparseGPT 提出一种无需重训练的 one-shot 二阶剪枝方法，把大模型逐层稀疏化写成带 mask 的输出重建问题，并用近似 Hessian 逆在剪掉权重后补偿剩余权重。它首次展示了 OPT/BLOOM 级百亿到千亿参数模型可以在 50%-60% 稀疏率下保持较小困惑度损失。

#### 🎯 核心要点
- 面向 post-training pruning，只使用少量校准前向样本，不做反向训练或微调
- 逐层最小化稠密层输出 \(WX\) 与稀疏层输出 \((M\odot\hat W)X\) 的重建误差
- 对固定剪枝 mask，精确重建需要为每一行单独求 masked Hessian 逆，难以扩展到 LLM
- 通过 Hessian synchronization 让所有行共享一串列级 Hessian 逆，避免逐行独立求逆
- 使用 adaptive mask selection，在 block 内按二阶敏感度而非纯幅值选择要保留的权重
- 支持非结构化稀疏，也支持 2:4、4:8 等硬件友好的半结构化稀疏
- 可与 GPTQ 合并成一次 sparse + quantized pass，剪枝和量化共享同一套 Cholesky/Hessian 更新

#### 🔬 深入细节
![SparseGPT reconstruction algorithm](https://ar5iv.labs.arxiv.org/html/2301.00774/assets/x4.png)
*图：SparseGPT 论文 Figure 4，经 ar5iv 渲染；左侧展示按列剪枝并用 Hessian 逆更新右侧权重，右侧展示 block 内自适应选择剪枝 mask。*

```python
# SparseGPT: one-shot pruning for one linear layer, simplified from Algorithm 1
def sparsegpt_prune_layer(W, X, sparsity, block_size=128, mask_block=128, damping=0.01):
    H = X @ X.T
    H = H + damping * mean(diag(H)) * eye(H.shape[0])
    Hinv_info = cholesky(inv(H)).T

    M = ones_like(W)  # 1 means keep, 0 means prune
    for start in range(0, W.shape[1], block_size):
        stop = min(start + block_size, W.shape[1])
        E = zeros(W.shape[0], stop - start)

        for j in range(start, stop):
            if j % mask_block == 0:
                cols = slice(j, min(j + mask_block, W.shape[1]))
                score = (W[:, cols] ** 2) / (diag(Hinv_info)[cols] ** 2)
                M[:, cols] = keep_top_fraction(score, keep=1 - sparsity)

            err = W[:, j] / Hinv_info[j, j]
            err = (1 - M[:, j]) * err      # only pruned entries create error
            E[:, j - start] = err
            W[:, j:stop] -= err[:, None] * Hinv_info[j, j:stop]

        W[:, stop:] -= E @ Hinv_info[start:stop, stop:]

    return W * M
```

SparseGPT 的出发点是逐层剪枝重建。给定线性层权重 \(W_\ell\)、校准输入 \(X_\ell\)、二值 mask \(M_\ell\)，目标是：

$$
\arg\min_{M_\ell,\hat W_\ell}\lVert W_\ell X_\ell-(M_\ell\odot\hat W_\ell)X_\ell\rVert_2^2
$$

纯幅值剪枝只看 \(|W_{ij}|\)，忽略输入通道相关性和剪后补偿空间，因此在 OPT-175B 上很快崩坏。SparseGPT 关注的是剪掉某个权重后层输出能否被右侧未冻结权重补回来，这就需要 Hessian \(H=XX^\top\) 的二阶信息。

如果 mask 已固定，理论上每一行都可以通过最小二乘精确重建保留权重：

$$
w^i_{M_i}=(X_{M_i}X_{M_i}^{\top})^{-1}X_{M_i}(w^i_{M_i}X_{M_i})^\top
$$

但每行的 \(M_i\) 不同，意味着每行都要反复求不同的 masked Hessian 逆，复杂度接近 \(O(d_{\text{row}}\cdot d_{\text{col}}^3)\)。对 Transformer 大层来说，这会随 hidden size 呈四次方增长，无法在千亿参数模型上落地。

SparseGPT 的核心近似是 Hessian synchronization。算法预设列顺序 \(j=1,\ldots,d_{\text{col}}\)，定义共享的未冻结列集合 \(U_{j+1}=U_j-\{j\}\)，并递推维护 \((H_{U_j})^{-1}\)。当第 \(j\) 列中某些行的权重被剪掉时，只更新这些行右侧尚未冻结的权重；未剪的权重被冻结为当前值，不再被未来更新破坏。

这个更新和 GPTQ 很像，只是“量化误差”变成“置零误差”。对第 \(j\) 列，剪掉的条目产生：

$$
E_{:,j}=(1-M_{:,j})\frac{W_{:,j}}{[H^{-1}]_{jj}}, \qquad
W_{:,j:}\leftarrow W_{:,j:}-E_{:,j}[H^{-1}]_{j,j:}
$$

直觉是：如果某个权重被置零，就把它造成的输出偏差按 Hessian 相关性分摊给后续可调整权重；如果该权重被保留，它不会产生剪枝误差，只是在当前值上冻结。

adaptive mask selection 解决“剪哪些权重”的问题。SparseGPT 不在全层一次性决定 mask，而是在 block 内反复选择，并在选择下一个 block 前先应用已有更新。论文伪代码在 Cholesky 形式下按 \(w_c^2/[H^{-1}]_{cc}^2\) 选择保留权重，因此 mask 会考虑二阶敏感度和之前补偿后的当前权重，而不是静态幅值。

半结构化稀疏只是改变 mask 约束：对 2:4 稀疏，每连续 4 个权重必须剪掉 2 个；算法把 mask block 设为 \(m\)，在每组内选损失最小的 \(n\) 个置零。由于重建更新机制不变，SparseGPT 可以同时覆盖非结构化高稀疏和硬件更友好的 N:M 模式。

SparseGPT 与 GPTQ 的关系很紧密。二者都按列冻结权重、用 Cholesky 化的 Hessian 逆信息做 lazy batch update；区别是 GPTQ 把权重冻结到低比特网格，SparseGPT 把一部分权重冻结到 0。论文进一步给出联合稀疏量化误差：

$$
E_{:,j}=\frac{W_{:,j}-M_{:,j}\odot\operatorname{quant}(W_{:,j})}{[H^{-1}]_{jj}}
$$

因此它可以在一次 pass 中同时做剪枝和 GPTQ 风格量化，避免先剪枝再量化时两种误差互相独立、后一步无法影响前一步决策的问题。

> 💡 关键：SparseGPT 的贡献不是“发现大模型能剪”，而是把剪枝、补偿和 mask 选择组织成一个可在单张 A100 上处理 175B 级模型的二阶近似流程。

#### 🧪 练习题
```yaml
question: "SparseGPT 相比简单 magnitude pruning 的核心优势是什么？"
options:
  - "只按权重绝对值排序，速度更慢"
  - "剪掉权重后用 Hessian 逆更新剩余权重，补偿层输出误差"
  - "必须对剪枝模型重新预训练"
  - "只能生成结构化整列剪枝 mask"
answer: 1
explain: "SparseGPT 把剪枝视为逐层重建问题，用二阶信息选择和补偿权重；简单幅值剪枝没有输出误差补偿，高稀疏率下更容易崩坏。"
```

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
Wanda 提出了一种面向预训练大语言模型的后训练剪枝方法，用权重幅值乘以对应输入激活范数来衡量连接重要性，解决了纯幅值剪枝忽略 LLM 激活异常值、而二阶剪枝代价过高的问题。

#### 🎯 核心要点
- 核心分数为 \(S_{ij}=|W_{ij}|\cdot\|X_j\|_2\)，同时考虑权重大小和输入通道激活强度
- 只用少量校准样本前向统计每个线性层的输入激活范数，不需要训练集、梯度或 Hessian 逆
- 按输出通道逐行比较重要性分数，在每个输出神经元内剪掉低分连接，保持输出维度上的稀疏率均衡
- 支持非结构化稀疏，也可扩展到结构化 \(N:M\) 稀疏，在每组连续 \(M\) 个权重内保留高分项
- 剪枝后不做权重重建、不做微调、不更新剩余权重，可直接使用稀疏模型
- 在 LLaMA/LLaMA-2 上显著优于 magnitude pruning，并在 50% 非结构化稀疏下接近 SparseGPT 的效果

#### 🔬 深入细节
![Wanda 权重-激活联合剪枝示意图](https://ar5iv.labs.arxiv.org/html/2306.11695/assets/x1.png)
*图：Wanda 论文 Figure 1。左侧是只看权重幅值的 magnitude pruning，右侧是 Wanda 将每列权重乘以对应输入激活范数后，再按输出行进行局部比较。图片来源：arXiv HTML。*

```python
# Wanda pruning, simplified from Algorithm 1
# W: (C_out, C_in) linear-layer weight
# X: (N * L, C_in) calibration activations collected at this layer
# sparsity: fraction of weights to prune in every output row
def wanda_prune(W, X, sparsity):
    activation_norm = X.norm(p=2, dim=0)                 # shape: (C_in,)
    score = W.abs() * activation_norm.unsqueeze(0)       # broadcast by input channel
    _, sorted_idx = score.sort(dim=1)                    # compare per output row
    prune_count = int(W.shape[1] * sparsity)
    prune_idx = sorted_idx[:, :prune_count]
    mask = torch.ones_like(W, dtype=torch.bool)
    mask.scatter_(dim=1, index=prune_idx, value=False)
    return W * mask
```

Wanda 的出发点是 LLM 中存在少数幅值极大的隐藏特征。对一个线性神经元 \(y=w_1x_1+w_2x_2\)，如果 \(|w_1|\le |w_2|\)，纯幅值剪枝会优先剪掉 \(w_1\)。但当 \(|x_1|\gg |x_2|\) 时，\(|w_1x_1|\) 可能远大于 \(|w_2x_2|\)，剪掉小权重反而造成更大的输出扰动。因此 Wanda 将“连接本身大不大”和“这条输入通道在真实数据上活不活跃”相乘，形成更贴近输出贡献的局部指标。

对权重矩阵 \(W\in\mathbb{R}^{C_{out}\times C_{in}}\) 和校准激活 \(X\in\mathbb{R}^{(N\cdot L)\times C_{in}}\)，Wanda 对单个权重定义：

$$
S_{ij}=|W_{ij}|\cdot\|X_j\|_2
$$

其中 \(X_j\) 是第 \(j\) 个输入通道在校准 batch 与序列 token 上展开后的激活向量。论文报告 \(\ell_2\) 范数比 \(\ell_1\) 或 \(\ell_\infty\) 更稳，因为它既能反映通道能量，又不会像最大值那样完全由单个 token 的极端值决定。这个公式计算量很低：一次前向收集 \(X\)，一次按列求范数，再与 \(|W|\) 广播相乘即可。

另一个关键设计是“按输出通道比较”，而不是在整层或全模型范围内设全局阈值。对连接输入 \(j\) 到输出 \(i\) 的权重，Wanda 的比较组为：

$$
G_{ij}=\{W_{uv}\mid u=i\}
$$

也就是每一行独立排序，并在每个输出神经元中剪掉同样比例的低分权重。这样做看似更受约束，但能避免某些输出行被过度剪空，保持每个输出特征都有相近的可用输入支撑。论文发现这种 per-output grouping 对 LLM 尤其重要，即便把指标换回纯 magnitude，逐输出比较也通常比逐层比较更可靠。

实际流程是逐层顺序剪枝：先用校准样本跑到当前层，统计该层输入 \(X\)；计算 \(S\) 并生成 mask；立即把当前层低分权重置零；再让后续层接收已经被前面稀疏化后的激活。这个顺序很重要，因为前一层剪枝会改变后一层的输入分布。整个流程只需要前向传播和局部排序，没有反向传播、Hessian 构造、矩阵求逆或剩余权重补偿。

Wanda 和 SparseGPT 的关系可以理解为一个极简近似。SparseGPT 从局部重建目标出发，使用二阶信息估计剪掉某个权重的代价，形式上涉及 \(\mathrm{diag}(X^TX+\lambda I)^{-1}\)。若忽略阻尼 \(\lambda\)，并只保留 Hessian 的对角近似，则对应代价会退化到：

$$
S_{ij}\approx\left(|W_{ij}|\cdot\|X_j\|_2\right)^2
$$

平方不改变排序，所以 Wanda 的指标可以看作去掉矩阵逆后的二阶启发式。它牺牲了 SparseGPT 的权重重建步骤，但换来极低实现复杂度；论文中在 LLaMA-7B 上计算剪枝指标只需约 0.54 秒，而 SparseGPT 需要约 203 秒。

结构化 \(N:M\) 稀疏时，Wanda 不再在整行里一次性选最低分，而是在每个输出行的连续 \(M\) 个权重组内用同一分数比较，保留 \(N\) 个高分连接、剪掉 \(M-N\) 个低分连接。这样可满足硬件稀疏张量核对 2:4 或 4:8 模式的约束，但因为组内可选范围更小，质量通常比非结构化 50% 稀疏更难保持。

> 💡 关键：Wanda 的强处不是找到全局最优剪枝 mask，而是把“LLM 激活异常值”这个经验事实编码进一个几乎零额外成本的分数，使剪枝过程足够简单、可复现、可作为后续稀疏方法的强基线。

#### 🧪 练习题
```yaml
question: "Wanda 为什么要把权重绝对值乘以输入激活范数？"
options:
  - "因为同样大小的权重在高激活输入通道上会造成更大输出影响"
  - "因为这样可以避免读取校准数据"
  - "因为乘积会自动生成低秩适配器"
  - "因为它需要恢复被剪掉权重的精确数值"
answer: 0
explain: "Wanda 估计的是连接对线性层输出的贡献，输入通道激活越强，对应权重即使幅值较小也可能更重要。"
```

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
NVFP4 是 NVIDIA Blackwell Tensor Core 原生支持的 4-bit 浮点推理格式，用 E2M1 数值、16 元素 FP8 微块缩放和 FP32 张量级缩放解决 FP4 动态范围窄、量化误差大的问题。

#### 🎯 核心要点
- 数值本体是 E2M1 FP4：1 位符号、2 位指数、1 位尾数，典型可表示约 \([-6,6]\) 的离散值
- 每 16 个 FP4 值共享一个 E4M3 FP8 per-block scale，相比 MXFP4 的 32 值块和 E8M0 幂次缩放更细粒度
- 每个张量额外使用 FP32 per-tensor scale，把整体分布拉到 FP8 scale 容易表达的范围
- Blackwell 第五代 Tensor Core 可在硬件中处理 microscaled FP4 分组、动态缩放和 4-bit 矩阵运算
- 存储开销约为 4-bit 值加每 16 值一个 FP8 scale，即约 4.5 bit/value，再加一个很小的张量级 FP32 scale
- 官方资料给出 DeepSeek-R1-0528 从 FP8 量化到 NVFP4 后多项评测约 1% 以内精度差异，同时相对 FP16 显著降低模型内存

#### 🔬 深入细节
![NVFP4 双层缩放结构](https://developer-blogs.nvidia.com/wp-content/uploads/2025/06/nvfp4-two-level-scaling.gif)
*图：NVFP4 的 E2M1 FP4 值、16 值 E4M3 FP8 微块 scale 和 FP32 张量级 scale。图片来源：NVIDIA Technical Blog “Introducing NVFP4 for Efficient and Accurate Low-Precision Inference”。*

```python
# NVFP4-style quantization/dequantization sketch
# x: one tensor to be quantized for inference
# block_size = 16 in NVFP4
def quantize_nvfp4(x):
    tensor_scale = choose_fp32_tensor_scale(x)
    x_scaled = x / tensor_scale
    packed_values, block_scales = [], []

    for block in x_scaled.flatten().split(16):
        # FP8 E4M3 scale can represent fractional, non-power-of-two scales.
        s = quantize_to_e4m3(max_abs(block) / fp4_e2m1_max)
        q = quantize_to_e2m1(block / s)      # each q is 4-bit E2M1
        packed_values.append(pack_4bit(q))
        block_scales.append(s)

    return packed_values, block_scales, tensor_scale

def dequantize_nvfp4(q, block_scale, tensor_scale):
    # Effective value used by GEMM kernels
    return tensor_scale * block_scale * dequantize_e2m1(q)
```

NVFP4 针对的核心矛盾是：FP4 足够省带宽和算力，但 4 bit 的表达空间太小，若只给整个张量一个 scale，离群值会迫使大量普通值被挤到很粗的网格上；若使用 INT4，动态范围又不如浮点指数自然。NVFP4 保留 E2M1 的微型浮点结构，让每个值本身有符号、指数和尾数，再用微块 scale 处理局部分布，从而把“格式动态范围”和“张量局部尺度”拆开。

E2M1 的值可以写成近似形式：

$$
x_q=(-1)^s\cdot 2^e\cdot (1+m/2)
$$

其中 \(s\) 是符号位，\(e\) 由 2 位指数编码，\(m\) 是 1 位尾数。因为只有 1 位尾数，E2M1 的数值网格很稀疏；NVIDIA 官方示例中正数侧包含 \(0,0.5,1,1.5,2,3,4,6\) 等离散值。真正让它可用于 LLM 推理的是缩放：对第 \(b\) 个 16 元素微块，重建值可表达为：

$$
\hat{x}_{b,k}=S_{\text{tensor}}\cdot S_b^{\mathrm{E4M3}}\cdot q_{b,k}^{\mathrm{E2M1}}
$$

这里 \(S_b^{\mathrm{E4M3}}\) 是每 16 个值共享的 FP8 scale，\(S_{\text{tensor}}\) 是每张量 FP32 scale。若只看单层微块，官方博客也用 \(x=x_q\times s\) 解释：4-bit 编码值 \(x_q\) 负责相对形状，高精度 scale \(s\) 负责局部幅度。

![NVFP4 与 MXFP4 缩放精度对比](https://developer-blogs.nvidia.com/wp-content/uploads/2025/06/quantization-precision-power-of-two-fractional-scaling-comparison.png)
*图：MXFP4 的 E8M0 scale 只能贴到 2 的幂，NVFP4 的 E4M3 scale 可用分数缩放更贴近原始块分布。图片来源：NVIDIA Technical Blog。*

与 MXFP4 相比，NVFP4 的两个变化都围绕降低量化误差：第一，block size 从 32 缩到 16，使一个共享 scale 覆盖的数值范围更局部；第二，scale 从 E8M0 幂次缩放换成 E4M3 FP8 缩放，允许非 \(2^n\) 的分数尺度。NVIDIA 的示意图显示，同一组输入用 E8M0 会被迫贴到较粗的幂次尺度，而 E4M3 能选择更接近原始分布的 scale。代价是需要第二层 FP32 scale 调整整体范围，因为 E4M3 scale 自身的可表示范围比 E8M0 更窄。

推理部署时，NVFP4 通常作为 PTQ/QAT 或框架导出的目标格式：模型优化器先决定哪些线性层、权重、激活或 KV cache 使用 NVFP4，哪些敏感层保留更高精度；随后按张量和 16 值微块生成 scale 与 packed FP4 权重；运行时 TensorRT-LLM、vLLM 等后端在 Blackwell 上调用支持 NVFP4 的 GEMM/attention kernel。因为硬件直接理解 microscaled FP4，scale 应用不需要退回通用 FP16 反量化路径。

NVFP4 和 SmoothQuant 的层次不同。SmoothQuant 是算法层的 W8A8 平滑策略，通过把激活离群值迁移到权重侧来降低 INT8 量化难度；NVFP4 是 Blackwell 上的数值格式与硬件执行路径，目标是在 4 bit 下仍保留足够动态范围。实际系统可以组合两类思想：先用校准、平滑、敏感层回退等策略降低分布难度，再落到 NVFP4 的双层 microscaling 表示。

> ⚠️ 注意：NVFP4 不是“任意模型无损压成 4 bit”。它依赖校准/量化流程、层选择和 Blackwell 原生 kernel；在非 Blackwell 硬件上，NVFP4 格式本身不等于真实吞吐收益。

#### 🧪 练习题
```yaml
question: "NVFP4 相比 MXFP4 降低量化误差的关键设计是什么？"
options:
  - "16 元素微块使用 E4M3 FP8 scale，并叠加 FP32 张量级 scale"
  - "把所有权重都转换为无符号 INT8"
  - "只保留注意力层，删除 MLP 层"
  - "使用 Hessian 逆恢复被量化的权重"
answer: 0
explain: "NVFP4 用更小的 16 值块和可表示分数尺度的 E4M3 FP8 scale 拟合局部分布，再用 FP32 张量级 scale 补足整体范围。"
```

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
BitNet b1.58 将 Transformer 中的线性层替换为 BitLinear，把每个权重约束到 \(\{-1,0,1\}\)，解决了后训练低比特量化仍依赖乘法和反量化开销的问题，并把主要矩阵乘变成整数加减与跳过。

#### 🎯 核心要点
- 每个权重只有三种状态 \(\{-1,0,1\}\)，信息量为 \(\log_2 3\approx1.58\) bit
- 基于 BitNet 架构，把注意力和 FFN 中的 `nn.Linear` 替换为 BitLinear，并从头训练适应离散权重
- 权重采用 absmean quantization：按平均绝对值缩放后四舍五入并裁剪到三值集合
- 激活使用 per-token 8-bit 量化到对称区间 \([-Q_b,Q_b]\)，避免 zero-point 量化
- 保留 LLaMA 风格组件，包括 RMSNorm、SwiGLU、RoPE，并移除 bias，便于接入主流 LLM 生态
- 论文报告从 3B 规模开始可接近或匹配同配置 FP16 LLaMA 基线，同时显著降低内存、延迟、吞吐和能耗成本

#### 🔬 深入细节
![BitNet b1.58 Pareto 与计算范式示意图](https://ar5iv.labs.arxiv.org/html/2402.17764/assets/x2.png)
*图：BitNet b1.58 论文 Figure 1 的计算范式部分。FP16 线性层需要乘法再加法，三值权重把 \(Wx\) 变成加、减或跳过。图片来源：arXiv HTML。*

```python
# BitLinear forward sketch for BitNet b1.58
# W_fp is the trainable high-precision shadow weight used by optimizer.
def bitlinear_forward(x_fp, W_fp, activation_bits=8, eps=1e-6):
    # Weight absmean quantization: {-1, 0, +1}
    gamma_w = W_fp.abs().mean()
    W_q = torch.round(W_fp / (gamma_w + eps)).clamp(-1, 1)

    # Per-token symmetric activation quantization
    Q_b = 2 ** (activation_bits - 1)
    gamma_x = x_fp.abs().amax(dim=-1, keepdim=True).clamp_min(eps)
    x_q = torch.round(x_fp * Q_b / gamma_x).clamp(-Q_b, Q_b)

    # Integer/additive matmul followed by scale recovery
    y_int = x_q @ W_q.T
    y = y_int * (gamma_x / Q_b) * gamma_w
    return y
```

BitNet b1.58 的动机不是压缩一个已经训练好的 FP16 checkpoint，而是从模型设计上改变线性层的数值约束。传统 PTQ 例如 GPTQ/AWQ 可以把权重压到 4 bit，但推理时仍常需要反量化、缩放和低比特乘法 kernel；BitNet b1.58 从训练开始就让权重只取 \(-1,0,1\)，因此矩阵乘中每个权重要么选择输入取反、要么保留输入、要么跳过输入，核心算子更接近加法累加。

论文把权重量化写成 absmean quantization。对权重矩阵 \(W\in\mathbb{R}^{n\times m}\)，先计算平均绝对值尺度：

$$
\gamma=\frac{1}{nm}\sum_{ij}|W_{ij}|
$$

再进行三值化：

$$
\tilde{W}=\mathrm{RoundClip}\left(\frac{W}{\gamma+\epsilon},-1,1\right)
$$

$$
\mathrm{RoundClip}(x,a,b)=\max(a,\min(b,\mathrm{round}(x)))
$$

因此小幅值权重会落到 0，正负较大的权重分别落到 \(+1\) 或 \(-1\)。0 的加入是 b1.58 相比原始 1-bit BitNet 的关键：它提供显式 feature filtering 能力，让模型不仅能选择方向，还能关闭不重要连接；三种状态的信息量就是 \(\log_2 3\approx1.585\) bit。

激活侧并没有压到 1.58 bit，而是使用 8-bit per-token 对称量化。设 \(Q_b=2^{b-1}\)，对每个 token 的隐藏向量可用最大绝对值作为尺度：

$$
\tilde{x}=\mathrm{Clip}\left(x\cdot\frac{Q_b}{\|x\|_\infty+\epsilon},-Q_b,Q_b\right)
$$

这样每个 token 自己决定激活 scale，避免不同 token 的幅值差异互相污染；同时使用对称区间减少 zero-point 处理，便于系统实现。最终输出近似为整数累加结果乘回激活尺度和权重尺度：

$$
y\approx(\tilde{x}\tilde{W})\cdot\frac{\|x\|_\infty}{Q_b}\cdot\gamma
$$

训练时通常保留可学习的高精度 shadow weight，由优化器在反向传播中更新；前向使用量化后的 \(\tilde{W}\) 和 \(\tilde{x}\)，反向通过直通估计器近似离散化操作的梯度。这也是它与 GPTQ 类后训练量化的根本差异：BitNet b1.58 的参数、激活分布和残差路径是在三值约束下共同适应出来的，不能简单把任意 FP16 模型离线 round 成三值并期待同等质量。

![BitNet b1.58 延迟随规模变化](https://ar5iv.labs.arxiv.org/html/2402.17764/assets/x3.png)
*图：BitNet b1.58 论文 Figure 2 左图，模型越大，线性层占比越高，三值线性层带来的解码延迟收益越明显。图片来源：arXiv HTML。*

在架构上，BitNet b1.58 采用 LLaMA-like 组件：RMSNorm、SwiGLU、RoPE、无 bias，并把主要 `nn.Linear` 换成 BitLinear。embedding、归一化、部分输出头等非矩阵乘瓶颈组件通常不承担三值权重收益，因此整体加速会随模型变大而增强。论文在 100B token 训练设置中比较 700M、1.3B、3B、3.9B 等模型，报告 3B BitNet b1.58 的 PPL 可匹配 FP16 LLaMA 3B，同时内存约 3.55 倍更省、延迟约 2.71 倍更低；扩展估算中 70B 还展示了更高吞吐和更低能耗潜力。

推理侧的直觉很直接：若一行权重是 \([1,-1,0,1]\)，则输出项由 \(x_0-x_1+0+x_3\) 构成，不需要 \(0.2961x_0-0.0495x_1-\cdots\) 这种 FP16 乘加。实际速度仍取决于 kernel 和硬件是否能高效打包三值权重、跳过 0、用低位累加器处理 8-bit 激活；论文也强调这种新计算范式会推动专门面向 1-bit/1.58-bit LLM 的硬件设计。

> 💡 关键：BitNet b1.58 的价值在“训练范式 + 数值格式 + kernel/硬件”的协同，而不只是一个量化公式。它更适合从头训练或充分继续训练的模型族，不是 GPTQ 那种即插即用的后训练压缩器。

#### 🧪 练习题
```yaml
question: "BitNet b1.58 中的 1.58 bit 来自哪里？"
options:
  - "权重有 {-1, 0, 1} 三种状态，信息量约为 log2(3)"
  - "激活固定使用 1.58 位整数"
  - "模型只训练 1.58T tokens"
  - "每个 Transformer block 保留 1.58 个线性层"
answer: 0
explain: "三值权重共有 3 种可能状态，编码其信息量约为 log2(3)=1.585 bit，因此称为 b1.58。"
```

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
MC# 提出 Mixture-Compressor-sharp 框架，用预加载混合精度量化压缩 MoE 专家权重，并用在线 Top-any 剪枝按 token 动态减少激活专家，解决 MoE-LLM/VLM 需要预加载所有专家且推理仍激活冗余专家的问题。

#### 🎯 核心要点
- 两阶段压缩：Pre-Loading Mixed-Precision Quantization (PMQ) 负责静态专家权重量化，Online Top-any Pruning (OTP) 负责推理时动态专家剪枝
- 专家重要性建模：同时考虑专家激活频率、路由权重和单专家量化后的激活重构误差，而不是按层统一给定 bit-width
- PMQ 将专家 bit 分配写成整数规划/线性规划问题，在 1、2、3 bit 等候选精度中满足平均 bit 预算并最小化量化损失
- OTP 将专家保留/剪枝视为 token 级 mask 选择问题，用 Gumbel-Softmax 近似离散 mask，使 Top-any 专家数量可学习且可微
- 静态部分兼容 GPTQ/HQQ 等 PTQ 部署工具，非专家模块如 attention、gate、shared experts 可采用统一 4-bit 量化
- 面向 Mixtral 等 MoE-LLM 和 DeepSeek-VL2 等 MoE-VLM；论文报告 DeepSeek-VL2-L 约 2.57 bit 时达到 6.2× 权重压缩、五个多模态基准平均仅约 1.7% 性能损失，OTP 还能进一步减少约 20% 专家激活且损失低于 1%

#### 🔬 深入细节
##### 论文图与整体流程

![MC# 两阶段专家压缩流程](https://arxiv.org/html/2510.10962v1/x3.png)
*图源：MC# arXiv HTML 公开预印本 Figure 3。图中左侧是 PMQ 的预加载混合精度量化，右侧是 OTP 的在线 Top-any 专家剪枝。*

##### 核心伪代码

```python
# MC# pipeline: PMQ + OTP
def mc_sharp_compress(moe_model, calibration_batches, target_avg_bits):
    stats = {}
    for layer in moe_model.moe_layers:
        for expert in layer.experts:
            # 1. 在 16-bit 原模型上收集专家使用统计
            freq = activation_frequency(expert, calibration_batches)
            route_weight = average_router_weight(expert, calibration_batches)

            # 2. 分别试量化到候选 bit，并度量该专家导致的输出重构误差
            quant_loss = {}
            for b in [1, 2, 3]:
                q_expert = ptq_quantize(expert, bits=b)  # GPTQ/HQQ 等 PTQ
                quant_loss[b] = activation_reconstruction_error(
                    moe_model, layer, expert, q_expert, calibration_batches
                )
            stats[(layer.id, expert.id)] = (freq, route_weight, quant_loss)

        # 3. 每个 MoE 层求解整数规划：在 bit 预算下给专家分配不同精度
        bit_plan = solve_integer_program(
            experts=layer.experts,
            stats=stats,
            target_avg_bits=target_avg_bits,
            candidates=[1, 2, 3],
        )
        apply_mixed_precision_ptq(layer.experts, bit_plan)

    # 4. 训练轻量 mask router，用少量样本学习 token-aware top-any 剪枝
    for layer in moe_model.moe_layers:
        layer.mask_router = train_gumbel_mask_router(
            quantized_model=moe_model,
            layer=layer,
            calibration_batches=calibration_batches,
            loss_terms=["distill_logits", "mask_sparsity"],
        )
    return moe_model


def mc_sharp_infer(quantized_moe, token):
    for layer in quantized_moe.moe_layers:
        x = layer.before_moe(token)
        selected, gate = layer.router.topk(x)
        mask = layer.mask_router.sample_mask(x, gate)  # Gumbel-Softmax 训练，推理取硬 mask
        active = [e for e, keep in zip(selected, mask) if keep]
        token = sum(gate[e] * layer.experts[e](x) for e in active) + layer.shared_experts(x)
    return quantized_moe.output_head(token)
```

##### 机制拆解

MoE 的基本负担来自两个方向：部署前必须把所有专家权重放入显存，部署时每个 token 又会由 gate 选择多个专家执行。对第 \(t\) 个 token，MoE 层可抽象为

$$
y_t=\sum_{i\in \operatorname{TopK}(g_t)} g_{t,i}E_i(x_t)+E_{\mathrm{shared}}(x_t),
$$

其中 \(g_{t,i}\) 是 gate 给专家 \(E_i\) 的路由权重。传统 dense LLM 的 AWQ/GPTQ 类方法通常按层或按组压缩权重，但 MoE 的关键异质性在专家维度：有些专家高频、路由权重大、量化后误差敏感；另一些专家很少被访问或对输出重构影响较小。统一 2-bit 或统一 4-bit 会把同等预算浪费在低贡献专家上，也会让高贡献专家过度失真。

PMQ 的做法是先在校准集上度量专家重要性。论文使用激活频率与路由权重描述专家在数据分布中的使用强度，再用单专家量化后的 Frobenius 范数重构误差描述该专家对输出的敏感度。可以把第 \(i\) 个专家在 bit \(b\) 下的代价抽象为

$$
\ell_{i,b}=\left\|Y_{\mathrm{fp16}}-Y_{i,b}\right\|_F^2,\qquad
s_i=\alpha f_i+\beta r_i,
$$

其中 \(f_i\) 是访问频率，\(r_i\) 是平均路由权重，\(s_i\) 是加权重要性。随后令 \(z_{i,b}\in\{0,1\}\) 表示专家 \(i\) 是否选择 bit \(b\)，在平均 bit 预算下求解：

$$
\min_{z}\sum_i\sum_{b\in\mathcal{B}} z_{i,b}\,w(s_i)\ell_{i,b}
\quad\text{s.t.}\quad
\sum_{b\in\mathcal{B}}z_{i,b}=1,\quad
\frac{1}{N}\sum_i\sum_{b\in\mathcal{B}}z_{i,b}b\le \bar b.
$$

这不是重新训练 MoE，而是在预加载阶段决定每个专家使用 1/2/3 bit 中哪一种，并用 GPTQ/HQQ 等 PTQ 执行实际量化。低 bit 专家的存储、加载和反量化开销降低，高重要性专家则被保护在更高精度，因而同样平均 bit 下比 uniform quantization 更稳。

OTP 处理的是另一个瓶颈：即使权重已经低 bit，router 的 Top-K 仍会激活固定数量专家。规则式剪枝常按路由分数阈值删掉低分专家，但在 DeepSeek-VL2 这类候选专家很多、token 分布多样的 MoE-VLM 中，固定阈值难以覆盖不同输入。MC# 把候选专家的保留模式写成 mask \(m_t\)，并通过轻量 router 预测 mask 分布 \(\pi_t\)。离散采样不可导，所以使用 Gumbel-Softmax：

$$
\tilde m_t=\operatorname{softmax}\left(\frac{\log \pi_t+g}{\tau}\right),
\qquad
g=-\log(-\log u),\ u\sim \operatorname{Uniform}(0,1).
$$

温度 \(\tau\) 下降时，\(\tilde m_t\) 趋近 one-hot 或少量 hard mask。训练目标同时约束蒸馏误差和稀疏度：

$$
\mathcal{L}_{\mathrm{OTP}}
=\mathcal{L}_{\mathrm{distill}}\left(y_{\mathrm{masked}},y_{\mathrm{full}}\right)
+\lambda\left\|m\right\|_1.
$$

第一项要求剪枝后的量化 MoE 接近不剪枝输出，第二项阻止模型学成全保留。推理阶段则用 hard mask 直接跳过低收益专家，实现 token 级 Top-any：不同 token 可以保留不同数量专家，而不是固定 Top-1 或 Top-2。

与只做量化的 AWQ/GPTQ 相比，MC# 的重点不在单个线性层的 scale 搜索，而在 MoE 专家之间的资源分配；与只做专家剪枝的方法相比，PMQ 先降低所有专家的预加载成本，OTP 再降低实际激活成本。两者组合后，存储压缩和运行时计算压缩作用在不同阶段，正好贴合 MoE “总参数大、激活参数稀疏但仍冗余” 的结构性问题。

#### 🧪 练习题
```yaml
question: "MC# 中 PMQ 和 OTP 分别主要解决什么问题？"
options:
  - "PMQ 压缩预加载专家权重，OTP 在推理时按 token 动态减少激活专家"
  - "PMQ 训练新的 tokenizer，OTP 扩大上下文窗口"
  - "PMQ 只压缩 attention，OTP 只改变位置编码"
  - "PMQ 删除所有低频专家，OTP 固定保留 Top-1 专家"
answer: 0
explain: "PMQ 是静态混合精度量化，降低专家权重存储和加载成本；OTP 是可学习动态 mask，降低每个 token 的实际专家计算。"
```

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
RetNet 提出 multi-scale retention 机制，把 Transformer 式并行训练、RNN 式常数状态推理和 chunkwise 长序列训练统一为等价计算范式，解决自注意力推理 KV cache 随序列长度增长的问题。

#### 🎯 核心要点
- 用 retention 替代 self-attention，核心计算为带因果 mask 和指数衰减的 \(QK^\top V\)
- 同一个 retention 层同时支持 parallel、recurrent、chunkwise recurrent 三种等价表示
- 推理采用递推状态 \(S_n=\gamma S_{n-1}+K_n^\top V_n\)，每步只维护固定大小状态，避免完整 KV cache
- Multi-Scale Retention 为不同 head 分配不同衰减率 \(\gamma\)，覆盖短期到长期依赖
- Gated Multi-Scale Retention 结合 gate、GroupNorm/SubLN 和 FFN，组成与 Transformer block 类似的 RetNet block
- 长序列训练可在 chunk 内并行、chunk 间递推，使内存复杂度线性增长

#### 🔬 深入细节
##### 论文图与三种范式

![RetNet parallel retention 表示](https://ar5iv.labs.arxiv.org/html/2307.08621/assets/x3.png)
![RetNet recurrent retention 表示](https://ar5iv.labs.arxiv.org/html/2307.08621/assets/x4.png)
*图源：RetNet ar5iv 论文页面 Figure 3。左图是并行表示，右图是递推表示；两者计算同一个 retention，只是执行方式不同。*

##### 核心伪代码

```python
# RetNet retention: parallel, recurrent, and chunkwise recurrent
def parallel_retention(q, k, v, decay_mask):
    # q,k,v: [batch, heads, length, dim]
    scores = q @ k.transpose(-1, -2)
    scores = scores * decay_mask          # causal mask + gamma ** distance
    out = scores @ v
    return group_norm_per_head(out)


def recurrent_retention(q_t, k_t, v_t, state, gamma):
    # state: [batch, heads, qk_dim, value_dim]
    state = gamma * state + outer(k_t, v_t)
    out_t = q_t @ state
    return group_norm_per_head(out_t), state


def chunkwise_retention(q, k, v, state, decay_mask, chunk_decay, inner_decay):
    # chunk 内并行，chunk 间递推
    inner = (q @ k.transpose(-1, -2) * decay_mask) @ v
    cross = (q @ state) * inner_decay
    out = group_norm_per_head(inner + cross)
    state = chunk_decay * state + k.transpose(-1, -2) @ v
    return out, state
```

##### 机制拆解

RetNet 的出发点是所谓 “impossible triangle”：Transformer 能并行训练且性能强，但推理时需要保存所有历史 token 的 KV cache；RNN 推理状态固定，但训练难以像 attention 一样充分并行；一些线性 attention 或 SSM 变体能降低复杂度，却常牺牲表达能力或位置建模。RetNet 试图用一个 retention 算子同时获得三者：训练时像 attention，推理时像 RNN，长序列时用分块折中。

并行表示可以写成

$$
Y = \left(QK^\top \odot D\right)V,\qquad
D_{ij}=\mathbf{1}_{i\ge j}\gamma^{i-j}.
$$

这里 \(D\) 同时承担因果 mask 和指数时间衰减。它和 attention 的相似处是仍然用 \(QK^\top\) 聚合 value；差异在于 retention 不需要 softmax，而是把相对距离衰减直接乘到 token-pair 分数上。这让同一算子可以被改写成递推形式：

$$
S_n=\gamma S_{n-1}+K_n^\top V_n,\qquad
Y_n=Q_nS_n.
$$

递推状态 \(S_n\) 是历史 key/value 外积的指数衰减累积，而不是所有历史 key/value 的列表。生成第 \(n\) 个 token 时，只需读取上一步 \(S_{n-1}\)、加入当前 \(K_n^\top V_n\)、再用当前 \(Q_n\) 读出，因此单步推理成本与历史长度无关。直觉上，\(\gamma\) 越接近 1，记忆越长；\(\gamma\) 越小，模型越偏向近期上下文。

Multi-Scale Retention 将不同 head 的 \(\gamma\) 设为不同尺度，使一层内部同时存在快衰减和慢衰减通道。快通道适合局部语法和短期依赖，慢通道适合跨段信息。因为不同尺度会造成 head 输出方差不同，RetNet 在 retention 输出上使用 per-head GroupNorm/SubLN，再通过 gate 增加非线性，整体形式可抽象为

$$
\operatorname{MSR}(X)=\left(\operatorname{GroupNorm}(\operatorname{Retention}(X))\right)\odot \operatorname{swish}(XW_g).
$$

这种 gate 类似现代 Transformer MLP 中的门控分支，用来补偿没有 softmax attention 后的表达能力。

Chunkwise recurrent 表示服务于长序列训练：如果整段都用 parallel retention，\(QK^\top\) 仍然会产生块内二次矩阵；如果完全递推，GPU 并行度又不足。RetNet 把序列切成 chunk，在 chunk 内用并行矩阵乘法吃满 GPU，在 chunk 之间只传递压缩状态 \(S\)。这使训练时可控地交换并行度和显存，同时保证和完整 recurrent/parallel 形式在数学上对齐。

与 Transformer 相比，RetNet 最大变化不是简单把 softmax 换成线性核，而是显式设计了可互相转换的执行范式。与线性 attention 相比，retention 的指数衰减和 xPos/RoPE 风格的位置结构更强；与 RWKV/AFT 相比，retention 维护的是高维 \(K^\top V\) 状态，表达能力更接近 attention。因此 RetNet 更像一个 foundation backbone 级别的替代架构，而不是单个推理 kernel 优化。

#### 🧪 练习题
```yaml
question: "RetNet 为什么能在自回归推理中避免完整 KV cache？"
options:
  - "它把历史 key/value 信息递推压缩进固定大小的 retention state"
  - "它在推理时禁用所有历史 token"
  - "它只允许长度为 1 的输入"
  - "它把 FFN 替换成卷积后不再需要位置编码"
answer: 0
explain: "recurrent retention 用 S_n=gamma S_{n-1}+K_n^T V_n 累积历史，生成新 token 时只更新固定状态，不保存全部 KV。"
```

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
Mamba 提出选择性状态空间模型 S6，让 \(\Delta\)、\(B\)、\(C\) 等 SSM 参数依赖输入 token，并用硬件感知 selective scan 高效执行，从而在保持线性时间和常数状态推理的同时获得接近 Transformer 的内容选择能力。

#### 🎯 核心要点
- 将传统 LTI SSM 改造成 selective SSM：\(B_t=s_B(x_t)\)、\(C_t=s_C(x_t)\)、\(\Delta_t=s_\Delta(x_t)\)，使模型能按内容写入、遗忘和读出状态
- 选择性破坏卷积等价性，论文改用 recurrent scan，并通过 kernel fusion、parallel scan、recomputation 避免物化巨大状态
- Mamba block 将 H3/SSM 分支与现代 gated MLP 思路合并，使用 input projection、depthwise Conv1D、SiLU、selective scan、gate 和 output projection
- 训练和长序列处理复杂度随序列长度线性增长；自回归推理每层只维护固定 SSM state，不需要 KV cache
- 选择性机制解决 S4 等固定动态模型在 selective copying、induction heads 等离散内容推理任务上的短板
- 论文报告 Mamba 在语言、DNA、音频等多模态序列任务上表现强，Mamba-3B 可匹配约两倍规模 Transformer，并具备更高生成吞吐

#### 🔬 深入细节
##### 论文图与架构

![Mamba selective SSM 总览](https://arxiv.org/html/2312.00752v2/x1.png)
![Mamba block 架构](https://arxiv.org/html/2312.00752v2/x3.png)
*图源：Mamba arXiv HTML Figure 1 和 Figure 3。第一张展示从固定 LTI SSM 到选择性 SSM 后需要硬件感知 scan；第二张展示 Mamba block 如何把 SSM 与 gated MLP 式结构合并。*

##### 核心伪代码

```python
# Mamba selective SSM layer (S6), simplified
def mamba_block(x, state=None):
    # x: [batch, length, d_model]
    u, gate = linear_in(x).chunk(2, dim=-1)
    u = silu(depthwise_conv1d(u))

    # 输入依赖参数：每个 token 都生成自己的 Delta、B、C
    delta = softplus(delta_bias + linear_delta(u))
    B = linear_B(u)
    C = linear_C(u)
    A = negative_diagonal_parameter()  # shared across positions

    # 离散化；实际实现不会把完整 [B,L,D,N] 状态写回 HBM
    A_bar = exp(delta[..., None] * A)
    B_bar = delta[..., None] * B[..., None, :]

    y, new_state = selective_scan(A_bar, B_bar, C, u, state)
    y = y * silu(gate)
    return linear_out(y), new_state


def selective_scan(A_bar, B_bar, C, u, state):
    h = zeros_like_state() if state is None else state
    outputs = []
    for t in range(u.length):  # 真实 kernel 用 parallel prefix scan
        h = A_bar[:, t] * h + B_bar[:, t] * u[:, t, :, None]
        y_t = (C[:, t, None, :] * h).sum(dim=-1)
        outputs.append(y_t)
    return stack(outputs, dim=1), h
```

##### 机制拆解

Mamba 建立在结构化状态空间模型上。连续形式的 SSM 可写为

$$
h'(t)=Ah(t)+Bx(t),\qquad y(t)=Ch(t).
$$

离散化后得到序列递推：

$$
h_t=\bar A h_{t-1}+\bar B x_t,\qquad y_t=C h_t,
$$

其中 \(\bar A=\exp(\Delta A)\)，\(\bar B\) 由 \(\Delta,A,B\) 的离散化规则得到。S4 等模型为了高效通常是 Linear Time-Invariant (LTI)：\(A,B,C,\Delta\) 对所有时间步固定。LTI 带来卷积等价性，训练时能把整段序列变成卷积并行计算，但代价是动态不看输入内容。

论文指出，固定动态对文本这类离散、高信息密度序列不够。Selective Copying 任务需要模型只记住彩色/关键 token，忽略填充 token；Induction Heads 任务需要根据上下文触发关联回忆。固定卷积核只能按位置距离传播信息，无法基于当前 token 决定 “写入还是跳过”。Mamba 的关键改动是让部分 SSM 参数变成输入函数：

$$
B_t=s_B(x_t),\qquad C_t=s_C(x_t),\qquad \Delta_t=\operatorname{softplus}(s_\Delta(x_t)).
$$

直觉上，\(B_t\) 控制当前 token 写入状态的方式，\(C_t\) 控制从状态读出哪些信息，\(\Delta_t\) 控制状态更新步长。较大的 \(\Delta_t\) 会让 \(\bar A_t=\exp(\Delta_t A)\) 更强地衰减历史，效果接近重置并关注当前输入；较小的 \(\Delta_t\) 则让状态更接近保持，效果类似跳过当前输入。这相当于把 RNN 的门控直觉放入连续时间 SSM 框架。

选择性带来一个直接工程问题：参数随时间变化后，模型不再是 LTI，不能像 S4 那样预先构造卷积核。朴素递推又会串行且需要保存形如 \([B,L,D,N]\) 的中间状态。Mamba 的 selective scan 使用三个技巧解决：kernel fusion 把参数离散化、递推和读出合并在一个 GPU kernel 中；parallel scan 利用仿射递推的结合律并行化前缀计算；recomputation 在反向传播时重算中间状态而不是全部存储。这样大状态主要停留在 SRAM/寄存器层级，HBM 只读写输入输出级别张量，思想上接近 FlashAttention 的 IO-aware 设计。

Mamba block 也做了架构简化。传统 Transformer block 交替使用 attention 和 MLP，早期 SSM 架构也常把 SSM block 与 MLP block 分开。Mamba 将输入投影成主分支和门控分支，主分支经过短卷积提供局部混合，再进入 selective SSM，最后与 SiLU gate 相乘并输出投影。用公式概括：

$$
u=\operatorname{SiLU}(\operatorname{Conv1D}(XW_u)),\quad
z=\operatorname{SiLU}(XW_z),\quad
Y=W_o\left(\operatorname{S6}(u)\odot z\right).
$$

这种设计保留了 gated MLP 的非线性和通道扩展，同时把序列混合交给 S6；因此 Mamba 可以同质堆叠 block，而不需要显式 attention 层或独立 MLP 层。

与 Transformer 相比，Mamba 不保存 KV cache，推理状态大小由层数、通道数和 SSM state size 决定，与已生成长度无关；训练成本也避免了 \(O(L^2)\) attention 矩阵。与 RetNet/RWKV 等递推架构相比，Mamba 的选择性参数直接作用在 SSM 的写入、读出和步长上，因而更强调内容感知状态压缩。它的风险也来自同一点：所有历史必须被压缩进有限状态，模型必须学会何时丢弃信息；论文的贡献在于用选择性和硬件实现把这个压缩过程做得足够强且足够快。

#### 🧪 练习题
```yaml
question: "Mamba 中选择性 SSM 相比传统 S4/LTI SSM 的关键变化是什么？"
options:
  - "让 Delta、B、C 等参数依赖输入 token，从而按内容控制状态更新"
  - "把所有参数固定为常数以便使用全局卷积"
  - "在每层加入标准 softmax attention"
  - "删除递推状态，只保留 FFN"
answer: 0
explain: "Mamba 的 S6 通过输入依赖的参数实现选择性写入、遗忘和读出；这破坏卷积等价性，但配合 selective scan 仍保持高效。"
```
