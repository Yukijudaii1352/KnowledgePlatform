### Qwen3.5-VLM — Gated DeltaNet + 稀疏 MoE 的原生视觉语言模型

```yaml
id: qwen3_5_vlm
name: Qwen3.5-VLM
year: '2026.02'
category: frontier_2026
institution: 阿里巴巴
paper: —
motivation: GDN早期融合架构
parent: qwen_vl
description: Gated Delta Network+MoE，256K原生上下文，早期融合架构，在OmniDocBench上达到90.8。
topic_id: visual_language_model
yaml_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/visual_language_model.yaml
output_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/visual_language_model/qwen3_5_vlm_detail.md
```

#### 📝 一句话总结

Qwen3.5-VLM 的公开模型卡对应 Qwen3.5-397B-A17B / Qwen3.5-Plus 路线：它用 Gated DeltaNet 线性注意力、周期性全注意力和细粒度 MoE 路由组合，解决原生视觉语言模型在 256K 级长上下文、多图文档和视频输入下的推理成本问题。

#### 🎯 核心要点

- 397B 总参数、17B 激活参数，模型类型为带 Vision Encoder 的 causal language model，支持文本、图像和视频输入。
- 60 层语言主干采用重复的 3:1 混合结构：`15 * (3 * (Gated DeltaNet -> MoE) -> 1 * (Gated Attention -> MoE))`。
- Gated DeltaNet 层使用线性注意力状态更新，公开配置为 V 侧 64 个 linear attention heads、QK 侧 16 个 heads、head dimension 128。
- Gated Attention 层提供周期性全局 softmax attention，公开配置为 Q 侧 32 heads、KV 侧 2 heads、head dimension 256、RoPE dimension 64。
- MoE 使用 512 个专家，每个 token 激活 10 个 routed experts + 1 个 shared expert，expert intermediate dimension 为 1024。
- 原生上下文长度为 262,144 tokens，模型卡也给出通过 YaRN RoPE scaling 扩展到 1,010,000 tokens；托管版 Qwen3.5-Plus 默认面向 1M context。
- 早期融合训练把文本、图像和视频 token 作为统一多模态序列建模，官方视觉语言表中 OmniDocBench 1.5 达到 90.8。

#### 🔬 深入细节

##### 框架图

![Qwen3.5-Omni 原生多模态 Thinker/Talker 框架](https://arxiv.org/html/2604.15804v1/figures/model.jpg)
*图：Qwen3.5-Omni 技术报告中的原生多模态框架图。Qwen3.5-VLM 模型卡未单独给出架构图，但同系列公开资料显示视觉、音频和文本 token 通过统一主干进行早期融合；本文重点解读 VLM 公开模型卡中的 Gated DeltaNet + MoE 主干。*

##### 混合注意力与 MoE 前向伪代码

```python
# Qwen3.5-397B-A17B / Qwen3.5-VLM 的简化主干
def qwen35_vlm_forward(text, images=None, video=None, thinking=True):
    text_tokens = tokenizer(text)
    vision_tokens = vision_encoder(images, sample_video(video, fps=2))
    x = early_fusion_pack(text_tokens, vision_tokens)  # text/image/video token 统一序列

    # 60 layers = 15 groups，每组 3 个 Gated DeltaNet block + 1 个 Gated Attention block
    for group in range(15):
        for _ in range(3):
            x = x + gated_deltanet(x)                 # 线性时间长上下文混合
            x = x + sparse_moe(x, top_k=10, shared=True, num_experts=512)

        x = x + gated_attention(x, q_heads=32, kv_heads=2, rope_dim=64)
        x = x + sparse_moe(x, top_k=10, shared=True, num_experts=512)

    if thinking:
        x = generate_hidden_reasoning_tokens(x)       # 模型卡默认 thinking mode
    return decode_text(lm_head(x), max_tokens=81920)

def sparse_moe(h, top_k, shared, num_experts):
    router_logits = router(h)
    routed = topk(router_logits, k=top_k)
    y = shared_expert(h) if shared else 0
    for expert_id, weight in routed:
        y += softmax(router_logits)[expert_id] * experts[expert_id](h)
    return y
```

##### 关键公式

Gated DeltaNet 可以看作固定大小 fast-weight memory 的在线更新。设当前 token 的 query/key/value 为 \(q_t,k_t,v_t\)，状态矩阵为 \(S_t\)，遗忘门为 \(\alpha_t\)，写入步长为 \(\beta_t\)：

$$
\tilde{S}_t = \alpha_t S_{t-1}
$$

$$
S_t = \tilde{S}_t + \beta_t \left(v_t - \tilde{S}_t k_t\right) k_t^\top
$$

$$
o_t = S_t q_t
$$

其中 \(\left(v_t - \tilde{S}_t k_t\right)\) 是“当前记忆对 key 的预测误差”。MoE 路由则把高容量 FFN 写成条件专家求和：

$$
\operatorname{MoE}(h_t)
= E_s(h_t) + \sum_{e \in \operatorname{TopK}(W_r h_t, 10)}
\operatorname{softmax}(W_r h_t)_e E_e(h_t)
$$

混合层比例使序列混合成本在长上下文下更接近线性层主导，而周期性 full attention 负责补充精确全局交互：

$$
C_{\text{group}}(n)
\approx 3 \cdot O(n d^2) + 1 \cdot O(n^2 d_{\text{attn}}) + 4 \cdot C_{\text{MoE-active}}
$$

##### 方法解读

Qwen3.5-VLM 的核心动机是让“原生多模态”和“超长上下文”同时成立。标准 Transformer attention 对长度 \(n\) 的成本是 \(O(n^2)\)，在 256K token、长文档、多页图像或视频帧序列中会迅速不可承受。Gated DeltaNet 把历史压进固定大小状态 \(S_t\)，每个 token 只更新一次状态并读取一次状态，因此长序列成本更接近线性，适合文档和视频这类输入长度远大于普通聊天的问题。

但纯线性注意力也有风险：所有历史都被压缩进状态矩阵，精确检索、跨段对齐和细粒度引用可能下降。Qwen3.5 的 3:1 hybrid layout 就是折中方案：大多数层用 Gated DeltaNet 维持吞吐和长上下文，周期性插入 Gated Attention 层做全局 softmax 交互，帮助模型在长文档中找回具体表格单元、OCR 片段或视频关键帧。这个设计比“全层 softmax attention”便宜，也比“全层线性注意力”更稳。

MoE 是第二个效率杠杆。397B 总参数提供足够大的知识和任务容量，但每个 token 只激活 17B 级参数；512 个专家中只选择 10 个 routed experts，再加一个 shared expert。shared expert 提供通用语言/视觉变换，routed experts 让不同 token 走向更专门的能力区域，例如代码、数学、OCR、视频理解或多语言表达。对 VLM 来说，细粒度 MoE 还能缓冲不同模态 token 分布差异带来的训练冲突。

早期融合使 Qwen3.5 不再把视觉理解看成外接任务。图像和视频经过 vision encoder 后与文本 token 打包为同一序列，语言主干直接在统一 token 流上做推理。这样模型能在同一次自回归生成中处理“图像区域 -> OCR 文本 -> 表格关系 -> 用户问题 -> 推理答案”的链条。OmniDocBench 1.5 的 90.8 说明这种训练方式对复杂文档解析特别有效，因为文档理解需要同时使用版面、文字、图表和跨页上下文。

推理侧的长上下文能力还依赖上下文管理。模型卡给出 262,144 原生长度，托管版 Qwen3.5-Plus 面向 1M context；这并不意味着所有任务都应把原始材料无差别塞满上下文。更合理的工程做法是保留原始多模态证据、按任务构造检索或折叠策略，再让模型在关键片段上执行 thinking mode 和结构化输出。也就是说，GDN+MoE 降低了长上下文成本，但高质量答案仍依赖输入组织、采样帧率和证据选择。

> 💡 关键：Qwen3.5-VLM 的新意不是单点指标，而是把 Gated DeltaNet 的线性长程记忆、周期性 full attention、512-expert 稀疏 MoE 和 early-fusion 多模态训练放进同一个主干里。

#### 🧪 练习题

```yaml
question: "Qwen3.5-VLM 为什么采用 3 个 Gated DeltaNet 层接 1 个 Gated Attention 层的混合布局？"
options:
  - "让所有层都退化成普通 CNN"
  - "用线性注意力降低长上下文成本，同时用周期性全注意力补充精确全局交互"
  - "避免模型处理图像和视频"
  - "让每个 token 激活全部 512 个专家"
answer: 1
explain: "Gated DeltaNet 适合长序列高吞吐，但全注意力有更强的精确检索和跨段交互能力。3:1 混合布局是在效率和精度之间折中。"
```
