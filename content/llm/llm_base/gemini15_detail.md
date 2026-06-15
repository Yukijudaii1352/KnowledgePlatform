### Gemini 1.5

```yaml
id: gemini15
name: Gemini 1.5
full_name: 百万上下文 Gemini (Gemini 1.5)
year: "2024.03"
org: Google DeepMind
paper_url: https://arxiv.org/abs/2403.05530
category: long_context
parent: palm
motivation: 百万级上下文近完美召回
```

#### 📝 一句话总结
> Gemini 1.5 提出了基于 MoE（Mixture-of-Experts）和稀疏化注意力的大规模多模态长上下文模型，实现了在超过 10M token 上下文中达到 >99% 的 "Needle-in-a-Haystack" 检索精度，同步推出 Pro（高性能）和 Flash（轻量高效）两个版本，在长文档 QA、长视频 QA、长音频 ASR 等任务上全面超越 GPT-4 Turbo 和 Claude 3。

#### 🎯 核心要点
- 基于 Gemini 1.0 架构演进，引入 **MoE（Mixture-of-Experts）架构**，通过条件化激活部分专家网络参数大幅降低推理计算量
- 发布两个模型变体：**Gemini 1.5 Pro**（高性能旗舰）和 **Gemini 1.5 Flash**（轻量化高效率），后者在质量损失极小下实现更高推理速度
- 上下文窗口扩展至 **10M tokens** 以上，支持文本、视频（数小时）、音频的多模态超长上下文，在 10M token 下 next-token prediction 持续提升
- 在 **Needle-in-a-Haystack** 基准上实现 >99% 的召回率，远超 GPT-4 Turbo（128K）和 Claude 3.0（200K），形成代际跨越
- 多模态能力扩展：在长文档 QA（如 10M-token 书籍理解）、长视频 QA（数小时视频）、长音频 ASR（数小时语音转写）上达到了 SOTA
- 展示**稀疏注意力（Sparse Attention）**与前馈（MoE）层联合优化的高效长上下文训练与推理框架
- 实际应用验证：在 10 个职业类别中帮助专业人士完成任务，实现 **26%~75% 的时间节省**；展示了从 Kalamang 语法书（全球不到 200 人使用）学习翻译英语→Kalamang 的新兴能力

#### 🔬 深入细节

![Gemini 1.5 MoE 架构示意图](https://arxiv.org/html/2403.05530v5/extracted/5595062/figures/architecture.png)
*图：Gemini 1.5 基于 MoE 的模型架构总览——输入 token 经过路由器（Router）分配到不同的 Expert 子网络*

##### 1. 动机与背景

传统大语言模型在处理长上下文时面临两大瓶颈：（1）Transformer 的自注意力复杂度为 \(O(N^2)\)，超长序列导致计算和内存成本不可接受；（2）大规模稠密模型（Dense Model）在推理时激活全部参数，延迟和功耗随规模线性增长。此前 GPT-4 Turbo 支持 128K、Claude 3.0 支持 200K 上下文，但在极端长上下文（1M+ tokens）下召回率骤降，出现 "Lost in the Middle" 现象——模型倾向于遗忘上下文中间部分的信息。

Gemini 1.5 的核心洞察是：**通过稀疏化 MoE 架构大幅降低单 token 的有效计算量，同时用专用的长上下文训练管线（包括多阶段长度课程学习）将有效上下文窗口扩展至 10M tokens 以上**。

##### 2. 核心机制：MoE + 稀疏注意力

**MoE（Mixture-of-Experts）架构**：

传统 Transformer 的 FFN（前馈网络）层被替换为多个并行的 Expert 子网络，由一个可训练的 Router 网络为每个 token 选择 top-k 个 Expert：

$$y = \sum_{i=1}^{k} G(x)_i \cdot E_i(x)$$

其中 \(G(x) = \text{softmax}(\text{TopK}(W_{\text{router}} \cdot x))\) 为路由权重，\(E_i\) 为第 \(i\) 个 Expert。

> 💡 **关键**：每个 token 仅激活少量 Expert（如 top-2），使单次推理的计算量仅为同类稠密模型的几分之一，但总参数量可以大幅增加。这种 **条件计算（Conditional Computation）** 理念使得长序列推理的算力需求可控。

**稀疏注意力（Sparse Attention）**：

为突破 \(O(N^2)\) 的注意力瓶颈，Gemini 1.5 采用了多层分级的稀疏注意力策略：
- **局部窗口注意力**：每个 token 对邻近窗口内的 token 做全注意力
- **全局注意力 token**：部分特殊 token（如 summary token）对所有位置做全注意力
- **层次化分块**：将长序列划分为多个 chunk，先做 chunk 内注意力，再做 chunk 间注意力

这种设计将注意力复杂度从 \(O(N^2)\) 降至 \(O(N \cdot W)\)（\(W\) 为窗口大小），使 10M token 的上下文推理成为可能。

##### 3. 训练流程

```python
# Gemini 1.5 长上下文训练伪代码
def train_gemini15():
    # 阶段1: 短上下文预训练 (32k tokens)
    model = MoETransformer(num_experts=64, top_k=2)
    model.train(data, seq_len=32768)

    # 阶段2: 渐进式长上下文适配 (Length Curriculum)
    sequence_lengths = [64k, 128k, 256k, 512k, 1M, 2M, 5M, 10M]
    for target_len in sequence_lengths:
        # 混合短序列和长序列数据
        mixed_data = mix_short_long(data, target_len, ratio=0.3)
        # 逐步增加全局注意力的间隔
        model.attention.sparse_config.update(target_len)
        model.train(mixed_data, seq_len=target_len)

    # 阶段3: 多任务微调 (SFT + RLHF)
    sft_data = load_multimodal_qa(video_hours=10, audio_hours=20)
    model.fine_tune(sft_data)
    model.rlhf(preference_data)

# 关键训练细节
class MoETransformer:
    def forward(self, x):
        # Sparse Attention with block-local window
        attn_out = sparse_block_local_attention(x, window_size=4096)
        # MoE FFN: each token routed to top-2 experts
        ffn_out = moe_ffn(attn_out, num_experts=64, top_k=2)
        return ffn_out

    def moe_ffn(self, x, num_experts, top_k):
        # 路由器为每个 token 选择专家
        router_logits = self.router(x)  # [batch, seq, num_experts]
        top_k_weights, top_k_indices = top_k_softmax(router_logits, k=top_k)
        # 仅计算被选中的 expert 输出
        output = zeros_like(x)
        for expert_id in range(num_experts):
            mask = (top_k_indices == expert_id).any(dim=-1)
            if mask.any():
                output[mask] += self.experts[expert_id](x[mask]) * top_k_weights[mask]
        return output
```

> ⚠️ **注意**：MoE 训练中需要注意 **Load Balancing**——确保各 Expert 被均匀使用，防止某些 Expert "退化"。Gemini 1.5 采用了带辅助损失（auxiliary load balancing loss）的训练策略：\(\mathcal{L}_{\text{load}} = \alpha \cdot \sum_{i=1}^{E} f_i \cdot p_i\)，其中 \(f_i\) 为 expert i 的实际负载比例，\(p_i\) 为路由器分配概率的均值。

##### 4. Needle-in-a-Haystack 评测

Gemini 1.5 的核心验证实验是在合成数据上的 Needle-in-a-Haystack 测试（俗称"大海捞针"）：将一段关键信息（needle）随机插入一段长达 N tokens 的无关文本（haystack）中，测试模型能否准确召回该信息。

关键发现：
- Gemini 1.5 Pro 在 **10M tokens 时仍保持 >99% 的召回率**
- GPT-4 Turbo 在 128K 后召回率明显下降（低于 80%）
- Claude 3.0 在 200K 后衰减更严重
- 传统的 Google 模型 PaLM 2 的上下文窗口上限仅为 32K，Gemini 1.5 实现了 **300 倍以上的窗口提升**

##### 5. 多模态长上下文能力

Gemini 1.5 不仅是文本长上下文模型，还在多模态长上下文中展示了令人瞩目的能力：
- **长视频理解**：输入数小时甚至 10 小时以上的视频，模型可以从任意时间点精准回忆起特定场景、对话或物体。例如在一部 5 小时电影中，模型可在第 2 小时 34 分钟 12 秒的场景中定位到"主角说了某句台词"。
- **长音频 ASR**：对长达数小时的音频进行端到端转录，字错误率（WER）显著优于分段拼接方案。
- **跨模态检索**：在给定的长视频中，通过文本查询定位到极短的视觉片段（例如"当某人从桌上拿起红色水杯的那一刻"）。

##### 6. 与前辈工作的区别

| 对比维度 | Gemini 1.5 (2024) | GPT-4 Turbo (2023) | Claude 3.0 (2024) | Gemini 1.0 (2023) |
|---------|-------------------|-------------------|-------------------|-------------------|
| 架构 | **Sparse MoE** | Dense（推测） | Dense（推测） | Dense |
| 最大上下文 | **10M+ tokens** | 128K tokens | 200K tokens | 32K tokens |
| 长上下文召回率 | **>99% @ 10M** | ~50% @ 128K | ~40% @ 200K | N/A |
| 多模态长上下文 | **文本+视频+音频** | 文本+图像 | 文本+图像 | 文本+图像 |
| 推理效率 | 条件计算（仅激活部分参数）| 全参数激活 | 全参数激活 | 全参数激活 |

Gemini 1.5 相对于 Gemini 1.0 的核心改进在于：将稠密模型升级为 **Sparse MoE 架构**，配合**多阶段长度课程学习（Length Curriculum Learning）**，在保持推理效率的同时将上下文窗口扩展了 300 倍以上。

##### 7. 稀疏注意力的直觉解释

想象你在读一本 10000 页的书（≈10M tokens）。传统 Transformer 的做法是：每读一个单词，就要回顾前面所有 9999 页的内容——这显然浪费计算。Gemini 1.5 的策略更接近人类的阅读方式：
1. 你关注当前段落的上下文（**局部窗口注意力**）
2. 你同时记住了每章的摘要或关键标记（**全局 token**）
3. 当需要跨章推理时，你翻阅目录或摘要找到相关内容（**层次化分块**）

这种"粗读 + 精读 + 索引查找"的三级策略，使得 10M token 的上下文推理从不可能变为可能，且计算量仅与窗口大小 \(W\) 成线性关系。

#### 🧪 练习题

```yaml
question: "Gemini 1.5 实现百万级上下文近完美召回的核心架构创新是什么？"
options:
  - "使用更深的 Transformer 层数（100+ 层）来增加模型容量"
  - "采用 MoE 稀疏架构降低单 token 计算量，配合渐进式长度课程学习、稀疏注意力策略"
  - "引入 Retrieval-Augmented Generation (RAG) 将长文档分块索引到外部向量数据库"
  - "将上下文压缩为低秩矩阵，通过矩阵分解减少计算复杂度"
answer: 1
explain: "Gemini 1.5 的核心在于 MoE 架构的条件计算 + 稀疏注意力 + 多阶段长度课程学习，而非单纯加深网络、依赖外部检索或矩阵压缩。这些技术组合使模型在原生的 Transformer 框架内将上下文扩展到 10M+ tokens 并实现 >99% 召回率。"
```