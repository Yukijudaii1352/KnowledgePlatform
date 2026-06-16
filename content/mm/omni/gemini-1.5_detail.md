### Gemini 1.5专业版 (Gemini 1.5 Pro)

```yaml
id: gemini-1.5
name: Gemini 1.5 Pro
full_name: Gemini 1.5专业版 (Gemini 1.5 Pro)
year: '2024'
org: Google
paper_url: https://arxiv.org/abs/2403.05530
category: native_e2e
parent: gpt-4o
motivation: 稀疏MoE+200万token上下文
topic_id: omni
yaml_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/omni.yaml
output_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/omni/gemini-1.5_detail.md
```

#### 📝 一句话总结

Gemini 1.5 Pro 提出了稀疏 MoE Transformer 原生多模态模型，通过条件计算和长上下文训练把文本、图像、音频、视频、代码统一放入同一序列中建模，解决了高质量通用能力与百万级上下文成本难以兼得的问题。

#### 🎯 核心要点

- **稀疏 MoE Transformer**：用学习到的路由函数只激活部分专家参数，在总参数规模扩大的同时保持每个 token 的激活计算量相对稳定
- **原生多模态长上下文**：同一输入序列支持交错文本、图像、视频、音频和代码，报告中强调 2M+ 上下文能力，并在研究评测中扩展到 10M token 级别
- **长上下文能力不牺牲核心能力**：在文本、视觉、音频、视频、代码、函数调用等基准上达到或超过 Gemini 1.0 Ultra，同时显著降低训练和服务成本
- **多模态 needle-in-a-haystack 评测**：在文本、视频、音频中测试不同长度和不同插入深度的检索，1M token 内接近完美召回，研究设置延伸到 10M token
- **真实长上下文任务**：覆盖长文档 QA、长视频 QA、长音频 ASR、代码库理解、整本语法书上下文学习低资源语言 Kalamang
- **训练与对齐流程**：大规模多模态多语言预训练后，使用多模态指令数据微调，并结合人类偏好数据进行后训练对齐

#### 🔬 深入细节

![Gemini 1.5 Pro 多模态长上下文检索热力图](https://arxiv.org/html/2403.05530v2/extracted/5559627/figs/haystack/gemini_1.5_tech-report_03.png)
*图：Gemini 1.5 Pro 在文本、视频、音频 needle-in-a-haystack 任务中的召回热力图。横轴是上下文长度，纵轴是目标信息插入深度，绿色表示成功召回。*

Gemini 1.5 Pro 的核心不是把一个短上下文多模态模型简单扩窗，而是同时重做了架构、数据、优化和服务系统。论文把它定义为 sparse mixture-of-experts Transformer：在 Transformer 的若干前馈或专家模块处，用路由器 \(g_\phi(x)\) 为每个 token 选择少数专家，只有被选中的专家参与计算。因此模型可以拥有更大的总容量 \(N_{\text{total}}\)，但单次前向传播激活的参数量 \(N_{\text{active}}\) 只随 top-\(k\) 专家增长。

$$
h' = \sum_{i \in \operatorname{TopK}(g_\phi(h), k)} g_i(h)\,E_i(h),
\qquad
N_{\text{active}} \ll N_{\text{total}}
$$

这个设计解释了 Gemini 1.5 Pro 的效率来源：长上下文会让注意力和 KV 缓存压力急剧上升，如果每个 token 都激活完整稠密参数，百万级上下文的训练和服务成本会非常高。MoE 的条件计算把“容量”和“每 token 计算量”部分解耦，使模型能保持足够的知识和推理容量，同时把实际激活计算控制在可服务范围内。

```python
# Gemini 1.5 Pro 风格的长上下文多模态推理流程（概念伪代码）
def gemini15_infer(multimodal_prompt):
    # 1. 将文本、图像帧、音频片段、视频帧、代码等统一转换为 token/embedding 序列
    tokens = []
    for segment in multimodal_prompt:
        tokens.extend(encode_by_modality(segment))

    # 2. 构造百万级上下文位置与模态标记
    states = add_position_and_modality_embeddings(tokens)

    # 3. Transformer 层处理；MoE 层只激活 top-k 专家
    kv_cache = {}
    for layer in transformer_layers:
        states = layer.self_attention(states, kv_cache=kv_cache)
        if layer.has_moe:
            route = router(states)             # 每个 token 的专家分配
            states = sum_topk_experts(states, route, k=2)
        else:
            states = layer.feed_forward(states)

    # 4. 自回归解码，输出文本答案或工具调用等结构化结果
    return decode_next_tokens(states)
```

长上下文能力的关键评测是“needle-in-a-haystack”：把一个目标事实、关键词或事件插入到很长的干扰上下文中，要求模型在问题中准确取回。令 \(L\) 表示上下文长度、\(d\in[0,1]\) 表示插入深度、\(s\) 表示目标信息，评测本质上是在估计：

$$
\operatorname{Recall}(L,d)=\mathbb{1}\{\operatorname{extract}(M(x_{1:L}, q_s)) = s\}
$$

论文的重点在于，这个检索不是只做文本；视频和音频会先被编码成长序列，并与文本查询一起输入同一个多模态模型。因而模型需要同时具备跨模态感知、长距离定位和指令遵循能力。报告中给出的现实量级很直观：10M token 约对应 107 小时音频、10.5 小时 1 FPS 视频，或者远超整本《战争与和平》的文本长度。

训练流程也体现了“原生多模态”的路线。预训练数据来自网页、代码、图像、音频、视频等多域多语言数据；后训练阶段用成对的多模态指令与期望响应做指令微调，再用人类偏好数据改善有用性、安全性和风格。可以把目标写成多项加权优化：

$$
\mathcal{L}
= \mathcal{L}_{\text{next-token}}
+ \lambda_{\text{inst}}\mathcal{L}_{\text{instruction}}
+ \lambda_{\text{pref}}\mathcal{L}_{\text{preference}}
+ \lambda_{\text{safety}}\mathcal{L}_{\text{safety}}
$$

与传统 RAG 或滑窗式长文处理相比，Gemini 1.5 Pro 的优势是把大量上下文直接放入模型可见窗口，让模型能在同一次前向/解码上下文中做跨段推理。RAG 的检索器若漏掉关键片段，下游模型通常无法恢复；而百万级上下文模型能在整本书、完整代码库或长视频中直接综合多个远距离证据。不过这也带来新的工程约束：注意力效率、KV cache、长序列位置泛化、低延迟流式服务和长上下文安全评测都必须一起解决。

> 💡 关键：Gemini 1.5 Pro 的“长上下文”不是单一技巧，而是 MoE 条件计算、原生多模态序列化、大规模长序列训练、后训练对齐和服务系统共同作用的结果。

#### 🧪 练习题

```yaml
question: "Gemini 1.5 Pro 使用稀疏 MoE 的主要目的是什么？"
options:
  - "让所有专家在每个 token 上同时计算，从而提升召回率"
  - "用路由器为 token 选择少数专家，在扩大总模型容量的同时控制单次激活计算量"
  - "把视频和音频预先检索成文本摘要，避免多模态编码"
  - "只提升短文本聊天能力，与长上下文无关"
answer: 1
explain: "MoE 的条件计算让模型拥有更大的总参数容量，但每个 token 只经过少数专家，因此有助于在百万级上下文下兼顾质量和训练/服务效率。"
```
