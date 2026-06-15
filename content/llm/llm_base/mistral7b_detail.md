### Mistral 7B

```yaml
id: mistral7b
name: Mistral 7B
full_name: Mistral 7B
year: "2023"
org: Mistral AI
paper_url: https://arxiv.org/abs/2310.06825
category: language_model
parent: Llama 2
motivation: 通过分组查询注意力和滑动窗口注意力机制，在7.3B参数规模下实现超越Llama 2 13B的性能
```

#### 📝 一句话总结
Mistral AI 提出 Mistral 7B，通过 Grouped-Query Attention (GQA) 和 Sliding Window Attention (SWA) 两项核心注意力机制创新，结合 Rolling Buffer Cache 实现高效长序列推理，在 7.3B 参数下全面超越 Llama 2 13B，成为当时最强开源 7B 模型。

#### 🎯 核心要点
- **Grouped-Query Attention (GQA)**：将查询头分组共享键值头，在 Multi-Head Attention 质量和 Multi-Query Attention 速度之间取得平衡
- **Sliding Window Attention (SWA)**：每层使用固定窗口大小 \(W\) 的滑动窗口注意力，将计算复杂度从 \(O(n^2)\) 降为 \(O(W\cdot n)\)，支持长序列高效处理
- **Rolling Buffer Cache**：KV 缓存大小固定为 \(W\)，位置 \(i\) 的键值存储在缓存位置 \(i \bmod W\)，32K 序列下节省 8 倍缓存内存
- **Pre-fill and Chunking**：prompt 可预先填充缓存，长 prompt 分块处理，chunk 大小设为窗口大小 \(W\)
- **7.3B 参数性能卓越**：在常识推理、数学、代码、阅读理解等多类 benchmark 上全面超越 Llama 2 13B，数学和代码能力甚至超越 Llama 1 34B
- **高效推理**：等效模型规模达 Llama 2 的 3 倍（推理/STEM），知识压缩比达 1.9 倍
- **指令微调版本**：Mistral 7B Instruct 在 MT-Bench 上超越所有 7B Chat 模型，与 13B Chat 模型相当
- **安全护栏**：支持系统提示 enforce guardrails，100% 拒绝有害问题；具备自反思内容审核能力（精确率 99.4%，召回率 95.6%）

#### 🔬 深入细节

##### 1. 核心架构与注意力机制

Mistral 7B 基于 Transformer 架构，核心创新在于注意力机制的改进。图 1 展示了 Sliding Window Attention 的信息流模式。

![Figure 1: Sliding Window Attention 信息流](https://ar5iv.labs.arxiv.org/html/2310.06825/assets/x1.png)
*图 1：Sliding Window Attention。拥有多层注意力头的模型，其中大部分层使用滑动窗口注意力，信息通过全局注意力层在长距离间传递。*

Mistral 7B 采用了两项注意力机制创新：

**a) Grouped-Query Attention (GQA)**

标准 Multi-Head Attention (MHA) 为每个查询头分配独立的键值头，质量高但推理时 KV 缓存开销大。Multi-Query Attention (MQA) 将所有查询头共享一组键值头，速度快但质量有损。GQA 是两者的折中方案：将查询头分为 \(G\) 组，每组共享一组键值头。

设总查询头数为 \(H\)，键值头数为 \(K\)，则有 \(H = G \times K\)。Mistral 7B 采用的 GQA 配置在保持推理效率的同时，提供了接近 MHA 的建模质量。

**b) Sliding Window Attention (SWA)**

这是 Mistral 7B 最关键的创新。传统的因果注意力允许每个 token 关注所有之前的 token，计算复杂度为 \(O(n^2)\)。SWA 将每个 token 的注意力限制在大小为 \(W\) 的局部窗口内（即前 \(W\) 个 token），将复杂度降为 \(O(W \cdot n)\)。

具体地，对于位置 \(i\) 的 token，其注意力范围为 \([\max(0, i-W+1), i]\)。Mistral 7B 选择 \(W = 4096\)。

> 💡 关键设计：并非所有层都使用滑动窗口。Mistral 7B 在大部分层使用 SWA，但保留了少数全局注意力层（类似于 Beltagy 等人的 Longformer 设计），使信息能够在长距离间传递。这种"局部+全局"的混合设计兼顾了效率和长程依赖建模。

##### 2. Rolling Buffer Cache

由于 SWA 固定了注意力跨度，KV 缓存的大小可以固定为 \(W\) 而非随序列长度线性增长。滚动缓冲区缓存的工作原理：

- 缓存大小为 \(W = 4096\)
- 时间步 \(i\) 的键和值存储在缓存位置 \(i \bmod W\)
- 当 \(i > W\) 时，旧值被覆盖，缓存大小不再增长

![Figure 2: Rolling Buffer Cache](https://ar5iv.labs.arxiv.org/html/2310.06825/assets/x2.png)
*图 2：滚动缓冲区缓存。缓存固定大小为 \(W=4\)，位置 i 的键值存储在 i mod W 处。当位置超过 W 时，旧值被覆盖。最新生成 token 的隐藏状态以橙色标出。*

在 32K token 序列上，滚动缓冲区缓存将 KV 缓存内存使用减少 8 倍，且不影响模型质量。

##### 3. Pre-fill and Chunking（预填充与分块）

生成序列时需要逐 token 预测，但 prompt 是预先已知的。Mistral 7B 的推理流程：

1. **预填充阶段**：将 prompt 预先填充到 KV 缓存中
2. **分块策略**：若 prompt 很长，将其分成小块（chunk size = \(W\)）
3. **逐块处理**：每个 chunk 需要计算对缓存和自身的注意力

![Figure 3: Pre-fill and Chunking](https://ar5iv.labs.arxiv.org/html/2310.06825/assets/x3.png)
*图 3：预填充与分块。长序列被分为三个 chunk。第三个 chunk（"the dog go to"）使用因果掩码关注自身，使用滑动窗口关注缓存，不关注窗口外的旧 token。*

注意力掩码的设计：
- 右块（当前 chunk）：因果掩码
- 中块（缓存窗口内）：滑动窗口注意力
- 左块（窗口外）：完全不关注

与传统注意力实现相比，结合 FlashAttention 和 xFormers 优化后，16K 序列长度下可获得 2 倍加速。

##### 4. 性能对比

Mistral 7B 在广泛的 benchmark 上进行评估，与 Llama 2 7B/13B 和 Llama 1 34B 对比：

| Benchmark | Mistral 7B | Llama 2 7B | Llama 2 13B | Llama 1 34B |
|-----------|-----------|------------|-------------|-------------|
| MMLU | 60.1% | 44.4% | 55.6% | - |
| HellaSwag | 81.3% | 77.1% | 80.7% | - |
| ARC-C | 55.5% | 43.2% | 48.8% | - |
| HumanEval | 30.5% | 11.6% | 18.9% | - |
| MBPP | 47.5% | 26.1% | 35.4% | - |
| MATH | 13.1% | 3.9% | 6.0% | - |
| GSM8K | 52.2% | 16.0% | 34.3% | - |

> ⚠️ 关键发现：Mistral 7B 在所有 benchmark 上均超越 Llama 2 13B。尤其在数学（GSM8K 52.2% vs 34.3%）和代码（HumanEval 30.5% vs 18.9%）领域优势显著。等效模型规模：推理/STEM 任务上相当于 Llama 2 的 3 倍以上，知识任务上约为 1.9 倍。

##### 5. 指令微调与安全机制

Mistral 7B Instruct 使用公开 HuggingFace 数据集进行指令微调（无专有数据），在 MT-Bench 上得分 6.84，超越所有 7B Chat 模型，与 13B Chat 模型（Vicuna 13B 6.57，Llama 2 13B Chat 6.65）相当。

**系统提示 guardrails**：通过系统提示可 enforce 输出约束：
- 无系统提示：MT-Bench 6.84
- Llama 2 系统提示：MT-Bench 6.38
- Mistral 系统提示：MT-Bench 6.58

使用推荐系统提示时，模型 100% 拒绝了 175 个有害查询。与 Llama 2 不同，Mistral 在安全过滤的同时不会过度拒绝无害问题（如"如何杀死 Linux 进程"）。

**自反思内容审核**：模型可对自己的输出进行分类，判断是否为：非法活动、仇恨/暴力内容、不合格建议。在人工标注的对抗性数据集上达到精确率 99.4%、召回率 95.6%。

##### 6. 与传统方法的区别

| 特性 | 标准 Transformer | Llama 2 | Mistral 7B |
|------|-----------------|---------|------------|
| 注意力类型 | MHA | MHA | GQA + SWA |
| 注意力范围 | 全部前置 token | 全部前置 token | 固定窗口 W=4096 |
| KV 缓存 | \(O(n)\) 增长 | \(O(n)\) 增长 | 固定 O(W)，滚动缓冲 |
| 长序列优化 | 无 | 无 | 窗口+分块预填充 |
| 128K 上下文 | 内存爆炸 | 内存爆炸 | 支持（可外推） |

Mistral 7B 的设计哲学：**不是简单扩大模型，而是让注意力更高效**。通过 SWA 将注意力限制在局部，再用 GQA 压缩 KV 缓存，在有限参数下实现更高效的知识压缩。这为"小模型大能力"开辟了新路径——正如论文结论所言，语言模型的能力空间应从二维（模型能力-训练成本）扩展到三维（模型能力-训练成本-推理成本）。

#### 🧪 练习题

```yaml
question: "Mistral 7B 的 Sliding Window Attention 中，如果窗口大小 W=4096，token 位置 i=5000 的注意力范围是？"
options:
  - "[0, 4095] 内的所有 token"
  - "[904, 5000] 内的所有 token"
  - "[0, 5000] 内的所有因果 token"
  - "[4096, 5000] 内的所有 token"
answer: 1
explain: "SWA 将注意力限制在大小为 W 的局部窗口 [i-W+1, i] 内。i=5000 时范围是 [5000-4096+1, 5000] = [905, 5000]。选项 1 最接近正确范围 [905, 5000]。注意窗口大小为 W=4096，包含当前 token 在内共 4096 个位置。"
```
