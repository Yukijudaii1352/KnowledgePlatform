### Llama 4 — 原生多模态 MoE 与 iRoPE 长上下文架构

```yaml
id: llama4
name: Llama 4
year: '2025.04'
category: native_multimodal
institution: Meta
paper: —
motivation: 原生MoE+1M上下文
parent: —
description: 原生多模态MoE架构，17B激活参数，1M上下文，LMArena ELO达到1417。
topic_id: visual_language_model
yaml_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/visual_language_model.yaml
output_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/visual_language_model/llama4_detail.md
```

#### 📝 一句话总结

Llama 4 把 Llama 系列从密集文本模型推进到原生多模态 MoE：用 early fusion 统一文本与视觉 token，用稀疏专家把总容量扩到百亿到千亿级，同时保持每 token 约 17B 激活参数。输入元信息中的 1M 上下文与 LMArena ELO 1417 对应 Llama 4 Maverick；同系列 Scout 进一步展示了 10M token 长上下文路线。

#### 🎯 核心要点

- 首批开放权重模型包含 Scout 与 Maverick：Scout 为 109B 总参数、17B 激活、16 experts、10M context；Maverick 为 400B 总参数、17B 激活、128 experts、1M context。
- MoE 前馈层采用共享专家 + 路由专家：每个 token 总是进入 shared expert，并被 router 分配到少量 routed expert，从而在高总容量下控制推理 FLOPs。
- 原生多模态 early fusion：文本、图像和视频帧 token 进入同一主干，而不是在外部拼接一个独立视觉模块后再交给文本模型。
- 视觉编码器基于 MetaCLIP 思路单独适配，模型在预训练中见过多图输入，官方披露预训练最多 48 张图、后训练测试到 8 张图。
- 长上下文核心是 iRoPE：多数层仍使用 RoPE，部分 interleaved attention layers 不使用位置编码，并在推理时做 attention temperature scaling 来改善长度外推。
- 训练上使用 Behemoth 教师模型进行 codistillation，再用轻量 SFT、大规模在线 RL、动态过滤与 DPO 改善推理、编码、图像理解和对话质量。

#### 🔬 深入细节

##### 框架图

![Llama 4 MoE 层结构](https://scontent-sjc3-1.xx.fbcdn.net/v/t39.2365-6/488655517_650996354186993_1043942188415715102_n.png?_nc_cat=105&_nc_gid=9gjaxdwM37lCTDyVZx66-Q&_nc_ht=scontent-sjc3-1.xx&_nc_oc=AdoyPuzYlJDMUskw4VipzPX9gfdmPolpOdYbxqYJ7HWQyz6OzZlr62BkwVuAZ_Qjtjc&_nc_ohc=MLLT0x0HCvAQ7kNvwECBnTY&_nc_sid=e280be&_nc_ss=78100&_nc_zt=14&ccb=1-7&oe=6A4B4D80&oh=00_Af_gHYOpTVUdeomqREPZi-BuS1ULoxAUZVQfdp6YCNTPJw)
*图：Meta 官方博客给出的 Llama 4 MoE 层示意。左侧是 Transformer block 堆叠，右侧显示 token 经 router 进入 routed expert 与 shared expert 后再汇合。*

##### 推理与训练流程伪代码

```python
# Llama 4 Maverick/Scout 的简化前向流程
def llama4_forward(text_tokens, images=None, video_frames=None):
    vision_tokens = []
    for frame_or_image in (images or []) + sample_video_stills(video_frames):
        vision_tokens.extend(meta_clip_encoder(frame_or_image))

    # early fusion: 图像/视频 token 与文本 token 进入同一自回归主干
    x = embed(interleave_modal_tokens(text_tokens, vision_tokens))

    for layer_id, block in enumerate(transformer_layers):
        x = block.attention(x, rope_mode=irope_schedule(layer_id))

        if block.is_moe:
            route_logits = router(x)
            routed_id = top1(route_logits)       # Maverick: 128 routed experts 中选少量，公开描述强调每 token 进 1 个 routed expert
            y_shared = shared_expert(x)
            y_routed = expert[routed_id](x)
            x = x + combine(y_shared, y_routed, route_logits)
        else:
            x = x + dense_ffn(x)

    return lm_head(x)

# Behemoth codistillation 的核心思想
for batch in multimodal_pretraining_data:
    teacher_logits = behemoth(batch)             # 2T 级教师模型，离线或在线产生软目标
    student_logits = maverick_or_scout(batch)
    hard_loss = cross_entropy(student_logits, batch.next_tokens)
    soft_loss = kl_divergence(student_logits, teacher_logits)
    loss = alpha(step) * soft_loss + (1 - alpha(step)) * hard_loss
    update_student(loss)
```

##### 关键公式

MoE 层可以抽象成条件计算。设 token 表示为 \(h_t\)，router 给出专家分布 \(p_t=\operatorname{softmax}(W_r h_t)\)，被选中的专家集合为 \(\mathcal{E}_t\)，shared expert 为 \(E_s\)：

$$
\operatorname{MoE}(h_t)
= E_s(h_t) + \sum_{e \in \mathcal{E}_t} p_{t,e} E_e(h_t)
$$

因此单 token 的推理成本主要随激活专家数增长，而不是随总专家数线性增长：

$$
\operatorname{FLOPs}_{\text{token}}
\approx \operatorname{FLOPs}_{\text{attn}}
+ \operatorname{FLOPs}(E_s)
+ |\mathcal{E}_t| \cdot \operatorname{FLOPs}(E_e)
$$

iRoPE 的直觉是把位置归纳偏置拆开：多数层保留 RoPE 的局部相对位置能力，少数 interleaved attention layer 弱化或移除显式位置编码，让长距离 token 不被训练长度内的位置频率强行绑定。可以把第 \(l\) 层注意力写成：

$$
A_l =
\begin{cases}
\operatorname{softmax}\left(\frac{Q_l R(\theta) (K_l R(\theta))^\top}{\tau_l \sqrt{d}}\right), & l \notin \mathcal{I} \\
\operatorname{softmax}\left(\frac{Q_l K_l^\top}{\tau_l \sqrt{d}}\right), & l \in \mathcal{I}
\end{cases}
$$

其中 \(\mathcal{I}\) 是不使用位置编码的 interleaved 层集合，\(\tau_l\) 是推理时 attention temperature scaling。

##### 方法解读

Llama 4 的核心变化不是单纯把 Llama 3 放大，而是换成“稀疏容量 + 原生多模态 + 长上下文外推”的组合。密集模型每个 token 都激活全部 FFN 参数，扩总参数会直接推高推理成本；MoE 则把 FFN 容量拆成专家池，让 token 只访问 shared expert 与少量 routed expert。这样 Maverick 可以存储约 400B 总参数，却维持 17B 级激活规模，服务成本更接近小模型，知识与任务容量更接近大模型。

shared expert 的作用是给所有 token 一条稳定通路。纯 top-k routed experts 容易出现负载不均、领域漂移和专家过窄的问题；shared expert 则承担通用变换，routed expert 才负责条件化的专门能力。对多模态模型来说，这一点尤其重要，因为文本 token、OCR token、图像区域 token、视频帧 token 的分布差异很大，统一 shared path 能减少路由错误导致的表示断裂。

early fusion 是 Llama 4 相对“视觉编码器 + 投影器 + 文本 LLM”范式的关键升级。传统 late fusion 多在对齐阶段把视觉 embedding 映射进 LLM 词向量空间，视觉与语言主干的共同训练深度有限；Llama 4 在预训练中直接混合文本、图像和视频帧 token，使 attention 层可以从底层开始学习跨模态对应关系。这样做的代价是训练数据与算力要求更高，但收益是多图推理、视觉 grounding、图表/OCR 和视频帧关系不再完全依赖后期指令微调补救。

长上下文部分解决的是另一个瓶颈：RoPE 在训练长度外可能出现频率外推不稳定，而完全去掉位置编码又会损害局部顺序建模。iRoPE 用交错策略折中：大部分层继续保留 RoPE 的顺序归纳偏置，少数层提供更弱位置约束的全局混合通道，再通过推理时温度缩放调节超长序列的 attention sharpness。Scout 从 256K 训练长度外推到 10M 级上下文，说明这种设计服务于“训练成本可控但推理上下文极长”的目标。

Behemoth codistillation 则解释了为什么 17B 激活模型能接近更大模型的表现。教师模型提供软标签，包含比 one-hot token 更丰富的分布信息；学生模型同时学习硬目标和教师分布，相当于在预训练阶段吸收大模型的偏好与不确定性。后训练阶段再用轻量 SFT、大规模在线 RL 和 DPO 清理对话风格、推理路径和边界样例，形成面向聊天与视觉任务的最终模型。

> 💡 关键：Llama 4 的“17B active”不是小模型参数量，而是每 token 的激活预算；真正的能力来自数百亿到数千亿总参数专家池、原生跨模态预训练和教师模型蒸馏的叠加。

#### 🧪 练习题

```yaml
question: "Llama 4 Maverick 使用 MoE 的主要工程收益是什么？"
options:
  - "让每个 token 同时激活全部 400B 参数"
  - "在扩大总参数容量的同时，让每个 token 只激活共享专家和少量路由专家"
  - "完全取消 attention 计算"
  - "只支持图像输入，不再支持文本输入"
answer: 1
explain: "MoE 的核心是条件计算。Maverick 保存大量专家参数，但单 token 只走 shared expert 与少量 routed expert，因此能在高容量和可控推理成本之间折中。"
```
