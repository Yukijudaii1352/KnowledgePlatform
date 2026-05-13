### Jet-Nemotron

```yaml
id: jet_nemotron
name: Jet-Nemotron
full_name: "Jet-Nemotron: Post-Training Neural Architecture Search for Efficient LLMs"
year: "2025"
org: NVIDIA
paper_url: "https://arxiv.org/abs/2508.15884"
category: automl
parent: "—"
motivation: "训练结构优化加速53x"
```

#### 📝 一句话总结

Jet-Nemotron 提出 PostNAS（后训练神经架构搜索）方法，通过四步系统化流程将预训练的全注意力 Transformer 转换为高效的混合注意力架构，在保持甚至超越原模型精度的同时实现高达 53× 的推理吞吐提升。

#### 🎯 核心要点

- 提出 PostNAS 框架：后训练阶段对已有模型进行架构搜索，无需从头预训练
- 四步搜索流程：全注意力层放置 → 线性注意力变体选择 → JetBlock 设计 → 硬件感知滑动窗口搜索
- JetBlock 设计：线性注意力 + 动态卷积（DyConv），用输入依赖的卷积核补偿线性注意力的局部建模缺陷
- 关键发现：KV cache 大小是决定解码吞吐的主导因素，而非 FLOPs
- 两阶段训练：第一阶段冻结 MLP 用蒸馏损失训练 50B tokens，第二阶段全模型训练 350B tokens
- 模型家族：Jet-Nemotron-2B（基于 Qwen2.5-1.5B）和 Jet-Nemotron-4B（基于 Qwen2.5-3B）
- 性能：Jet-Nemotron-2B 相比 Llama-3.2-3B 实现 53× 吞吐提升，相比 Qwen3-1.7B 实现 47× 吞吐提升，精度更优

#### 🔬 深入细节

![Jet-Nemotron PostNAS 框架总览](https://arxiv.org/html/2508.15884v1/x1.png)
*图：PostNAS 四步搜索流程示意。从预训练的全注意力模型出发，逐步确定全注意力层位置、线性注意力变体、注意力块设计和滑动窗口层配置。*

```python
# PostNAS 四步搜索伪代码
def PostNAS(pretrained_model):
    # Step 1: 确定保留全注意力的层（用检索任务评估）
    full_attn_layers = search_full_attention_placement(
        model=pretrained_model,
        task="retrieval",  # NIAH/RULER
        metric="accuracy"
    )
    
    # Step 2: 选择最佳线性注意力变体（用困惑度评估）
    linear_attn_type = select_linear_attention(
        candidates=["HGRN2", "GLA", "DeltaNet", "Mamba2", ...],
        metric="perplexity",
        data="pretraining_corpus"
    )
    
    # Step 3: 设计 JetBlock（线性注意力 + 动态卷积）
    jet_block = JetBlock(
        linear_attention=linear_attn_type,
        dynamic_conv=DyConv(kernel_size=searched)
    )
    
    # Step 4: 硬件感知搜索滑动窗口注意力层
    swa_layers = hardware_aware_search(
        model=model,
        task="MMLU",
        constraint="maximize_throughput"
    )
    
    # 组装最终混合架构
    hybrid_model = assemble(full_attn_layers, jet_block, swa_layers)
    
    # 两阶段训练
    stage1_train(hybrid_model, tokens=50B, freeze_mlp=True, loss="distillation")
    stage2_train(hybrid_model, tokens=350B, freeze_mlp=False)
    
    return hybrid_model
```

##### 动机与背景

大语言模型（LLM）的推理效率受限于标准 Transformer 中 softmax 注意力的 \(O(n^2)\) 复杂度和线性增长的 KV cache。虽然线性注意力、状态空间模型等替代方案已被提出，但它们通常需要从头预训练，且在关键能力（如长距离检索）上存在明显不足。

> 💡 关键洞察：**KV cache 大小是推理吞吐的决定性瓶颈**，而非计算 FLOPs。即使模型参数量更大，只要 KV cache 足够小，解码吞吐就能大幅提升。

PostNAS 的核心思路是：**不从头训练，而是将已有的高质量全注意力模型"改造"为混合架构**，通过系统化的搜索确定最优的层级配置，再用少量训练恢复精度。

##### Step 1：全注意力层放置

并非所有注意力层都可以被替换。论文发现，某些层对长距离信息检索至关重要。搜索策略如下：

1. 使用 Needle-in-a-Haystack（NIAH）和 RULER 等检索任务作为评估标准
2. 逐层测试：将某一层替换为线性注意力后，观察检索精度下降程度
3. 保留那些替换后精度显著下降的层作为全注意力层

对于 Jet-Nemotron-2B（基于 Qwen2.5-1.5B 的 28 层），最终保留第 15 和第 20 层为全注意力层。对于 Jet-Nemotron-4B（基于 Qwen2.5-3B 的 36 层），保留第 18、21、33 层。

##### Step 2：线性注意力变体选择

在确定哪些层需要替换后，需要选择最优的线性注意力变体。论文比较了多种候选方案：

- **HGRN2**：基于门控线性循环的模型
- **GLA**（Gated Linear Attention）：门控线性注意力
- **DeltaNet**：基于增量规则的线性注意力
- **Mamba2**：结构化状态空间模型

评估方法是将所有可替换层统一替换为某一变体，然后在预训练语料上测量困惑度（perplexity）。实验发现 **DeltaNet** 在困惑度指标上表现最优，因此被选为 JetBlock 的线性注意力组件。

##### Step 3：JetBlock 设计——线性注意力 + 动态卷积

JetBlock 是本文的核心架构创新。其设计动机来自对线性注意力局限性的分析：

$$\text{LinearAttn}(Q, K, V) = \frac{\phi(Q) \cdot (\phi(K)^T V)}{\phi(Q) \cdot \phi(K)^T \mathbf{1}}$$

线性注意力通过将 softmax 替换为特征映射 \(\phi\) 来实现线性复杂度，但这导致其**局部建模能力不足**——softmax 注意力天然具有的局部聚焦特性（近距离 token 获得更高权重）在线性注意力中丢失。

> ⚠️ 注意：线性注意力的固定大小状态无法精确保留所有历史信息，尤其是近距离的局部模式。

为此，JetBlock 引入**动态卷积（DyConv）**来补偿局部建模能力：

$$\text{JetBlock}(X) = \text{LinearAttn}(X) + \text{DyConv}(X)$$

动态卷积的核心是**输入依赖的卷积核**：

$$\text{DyConv}(X)_t = \sum_{k=0}^{K-1} w_k(X_t) \cdot X_{t-k}$$

其中卷积核权重 \(w_k(X_t)\) 由当前输入动态生成（通过一个小型线性层），而非固定参数。这使得模型能够根据上下文自适应地聚焦局部信息。

##### Step 4：硬件感知滑动窗口注意力搜索

论文发现，某些任务（如 MMLU 等多选题）主要依赖 softmax 操作的模式匹配特性来将知识路由到选项。完全移除 softmax 会导致这类任务精度下降。

解决方案是引入**滑动窗口注意力（SWA）**层——它保留了 softmax 的模式匹配能力，但窗口大小有限（如 4096 tokens），因此 KV cache 增长受限，不会显著影响吞吐。

搜索策略：
1. 以 MMLU 精度为目标，逐步添加 SWA 层
2. 同时监控吞吐影响，确保添加的 SWA 层不会过度降低推理速度
3. 最终 Jet-Nemotron-2B 使用 2 个 SWA 层，Jet-Nemotron-4B 使用 7 个 SWA 层

##### 训练流程

训练分为两个阶段：

**第一阶段（蒸馏，50B tokens）：**
- 冻结所有 MLP 层参数（保留原模型知识）
- 仅训练新引入的线性注意力和动态卷积参数
- 使用蒸馏损失，以原始全注意力模型为教师
- 数据：Nemotron-CC + Redstone-QA

**第二阶段（全模型训练，350B tokens）：**
- 解冻所有参数进行端到端训练
- 加入更多高质量数学和代码数据
- 总训练量仅为原始预训练的约 2%（Qwen2.5-1.5B 预训练用了 18T tokens）

##### 与传统方法的区别

| 维度 | 传统混合模型 | PostNAS (Jet-Nemotron) |
|------|-------------|----------------------|
| 训练起点 | 从头预训练 | 复用已有预训练模型 |
| 架构设计 | 人工设计或简单规则 | 系统化四步搜索 |
| 搜索代价 | 需要完整预训练验证 | 仅需少量 token 评估 |
| 训练成本 | 数万亿 tokens | 400B tokens（~2%） |
| 吞吐优化 | 关注 FLOPs | 关注 KV cache 大小 |

> 💡 关键优势：PostNAS 将架构搜索与预训练解耦，使得任何高质量的全注意力模型都可以被高效地转换为混合架构，大幅降低了开发高效 LLM 的成本。

#### 🧪 练习题

```yaml
question: "Jet-Nemotron 中 JetBlock 引入动态卷积（DyConv）的主要目的是什么？"
options:
  - "减少模型参数量以提升推理速度"
  - "补偿线性注意力在局部模式建模上的不足"
  - "替代 MLP 层以降低计算复杂度"
  - "增强模型在长距离检索任务上的能力"
answer: 1
explain: "线性注意力用固定大小状态替代了 KV cache，丢失了 softmax 注意力天然的局部聚焦特性。动态卷积通过输入依赖的卷积核显式建模局部依赖，补偿了这一缺陷。"
```