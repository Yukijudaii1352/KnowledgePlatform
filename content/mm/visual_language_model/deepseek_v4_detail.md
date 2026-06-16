### DeepSeek-V4 — 面向百万 token 上下文的高效 MoE 与条件记忆路线

```yaml
id: deepseek_v4
name: DeepSeek-V4
year: '2026.04'
category: frontier_2026
institution: DeepSeek
paper: —
motivation: Engram条件内存
parent: —
description: 1.6T参数MoE，Engram条件内存机制，推理成本降低10倍，空间导航胜过GPT-5.4。
topic_id: visual_language_model
yaml_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/visual_language_model.yaml
output_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/visual_language_model/deepseek_v4_detail.md
```

#### 📝 一句话总结
DeepSeek-V4 官方技术报告把核心贡献定义为 1.6T/49B-active MoE、百万 token 上下文、CSA+HCA 混合注意力、mHC 残差连接、Muon 优化器和 on-policy distillation；输入元信息中的 Engram 条件内存与 DeepSeek 同期公开论文高度相关，但在官方 V4 模型卡和技术报告中不是已披露的 V4 主架构模块。

#### 🎯 核心要点
- DeepSeek-V4-Pro 为 1.6T 总参数、49B 激活参数的 MoE；DeepSeek-V4-Flash 为 284B 总参数、13B 激活参数，两者官方均标注支持 1M token context
- 官方 V4 架构保留 DeepSeekMoE 与 MTP，引入 CSA+HCA 混合注意力以降低超长上下文 FLOPs 与 KV cache
- 官方报告称在 1M token 设置下，V4-Pro 的单 token 推理 FLOPs 约为 DeepSeek-V3.2 的 27%，KV cache 约为 10%
- mHC 将 residual stream 扩展为多个 hyper-connection 槽位，并通过流形约束稳定信号传播，缓解普通 HC 在深层堆叠时的数值不稳定
- Muon 优化器用于大规模预训练，提高收敛效率和训练稳定性；MoE expert 参数在发布权重中使用 FP4/FP8 混合精度
- 后训练采用两阶段范式：先分别训练数学、代码、agent、指令遵循等领域专家，再用 on-policy distillation 把多专家能力蒸馏到统一模型
- Engram 论文提出“条件内存”作为 MoE 条件计算之外的新稀疏轴，用 N-gram 式确定性查表进行 \(O(1)\) 静态知识检索，并可把大表放在 host memory
- “空间导航胜过 GPT-5.4”未在官方 V4 技术报告的公开 benchmark 表中作为视觉语言或空间导航结论披露；本文不将该点写成已证实结论

#### 🔬 深入细节
##### 核心示意图

![DeepSeek-V4 性能与长上下文效率图](https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro/resolve/main/assets/dsv4_performance.png)
*图：DeepSeek-V4 官方模型卡展示的 benchmark 对比，以及 V4-Pro/V4-Flash 相比 V3.2 在百万 token 上下文下的推理 FLOPs 与 KV cache 优势。*

![Engram 条件内存架构图](https://raw.githubusercontent.com/deepseek-ai/Engram/main/figures/arch.png)
*图：DeepSeek Engram 仓库中的条件内存架构。Engram 用局部 N-gram key 查表得到静态 memory embedding，再与动态 hidden state 融合。*

公开来源：DeepSeek-V4 官方模型卡 `https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro`，官方技术报告 PDF `https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro/resolve/main/DeepSeek_V4.pdf`，Engram 论文 `https://arxiv.org/abs/2601.07372`，Engram 官方仓库 `https://github.com/deepseek-ai/Engram`。

##### 核心流程代码

```python
# DeepSeek-V4 official path + Engram conditional-memory research path

def deepseek_v4_block(x, layer, kv_cache):
    # mHC expands and mixes residual streams before and after the Transformer block.
    x_in = layer.mhc_pre_block_mixing(x)

    if layer.attention_type == "CSA":
        # Compress KV along sequence, then run sparse attention over selected chunks.
        k_comp, v_comp = compress_kv_by_blocks(kv_cache.k, kv_cache.v)
        selected = sparse_indexer(query=x_in, compressed_keys=k_comp)
        attn_out = sparse_attention(x_in, k_comp[selected], v_comp[selected])
    else:  # HCA
        # More aggressive compression, but dense attention over compressed states.
        k_h, v_h = heavily_compress_kv(kv_cache.k, kv_cache.v)
        attn_out = dense_attention(x_in, k_h, v_h)

    x_mid = layer.mhc_residual_mixing(x, attn_out)
    moe_out = deepseek_moe(x_mid)          # routed experts + shared experts
    x_out = layer.mhc_post_block_mixing(x_mid, moe_out)
    return x_out


def post_train_v4(base_model, domain_data):
    teachers = []
    for domain in ["math", "code", "agent", "instruction"]:
        expert = copy(base_model)
        train_sft(expert, domain_data[domain].sft)
        train_grpo(expert, domain_data[domain].rl, reward_model=domain_data[domain].reward)
        teachers.append(expert)

    student = copy(base_model)
    for prompt in on_policy_prompts():
        teacher_logits = route_to_best_teacher(teachers, prompt).generate_logits(prompt)
        student_logits = student(prompt)
        loss = reverse_kl(student_logits, teacher_logits)
        update(student, loss)
    return student


def engram_memory_lookup(tokens, hidden):
    # Engram is a separately published DeepSeek conditional-memory module.
    key = hash_ngram(tokens[-N:])          # deterministic O(1) address
    mem = memory_table[key]               # can be hosted outside GPU memory
    gate = sigmoid(Wg @ hidden)
    return hidden + gate * Wm(mem)
```

##### 关键公式

mHC 的基础形式来自 Hyper-Connections：把残差状态从单条向量扩展为 \(n_{\mathrm{hc}}\) 条槽位，让层函数只作用于映射后的 \(d\)-维输入，再写回扩展残差空间：

$$
X_{l+1}
=
B_lX_l + C_lF_l(A_lX_l),
\qquad
X_l\in\mathbb{R}^{n_{\mathrm{hc}}\times d}
$$

CSA/HCA 的共同目标是减少 KV 随序列长度线性增长带来的显存和带宽压力。若把长度为 \(L\) 的 KV cache 按块压缩为 \(M\ll L\) 个条目，attention 可近似写成：

$$
\tilde{K},\tilde{V}=\operatorname{Compress}(K,V),
\qquad
\operatorname{Attn}_{\mathrm{HCA}}(q)
=
\operatorname{softmax}
\left(\frac{q\tilde{K}^{\top}}{\sqrt{d}}\right)\tilde{V}
$$

CSA 在压缩后进一步选择 query-critical chunk，只对集合 \(S(q)\) 中的压缩 KV 做稀疏注意力：

$$
\operatorname{Attn}_{\mathrm{CSA}}(q)
=
\operatorname{softmax}_{j\in S(q)}
\left(\frac{q\tilde{k}_j^{\top}}{\sqrt{d}}\right)\tilde{v}_j
$$

Engram 的条件内存可以抽象为确定性地址函数 \(h(\cdot)\) 与查表融合：

$$
m_t = E[h(x_{t-N+1:t})],
\qquad
\hat{h}_t = h_t + \sigma(W_g h_t)\odot W_m m_t
$$

这里 \(E\) 是大规模静态 memory table，\(h(\cdot)\) 用最近 \(N\)-gram token 构造 key。直觉上，MoE 选择“计算专家”，Engram 选择“静态记忆条目”，两者是不同稀疏轴。

##### 方法解读

DeepSeek-V4 的官方叙事核心是“百万 token 上下文的效率”。传统 Transformer 在长上下文下最大瓶颈不是参数量，而是 attention FLOPs 与 KV cache：prefill 要处理海量历史 token，decoding 时每个新 token 都要访问越来越大的 KV。V4 用 CSA+HCA 组合把这一问题拆开：CSA 保留稀疏选择能力，让模型只关注与当前 query 相关的压缩块；HCA 更激进地压缩 KV，但维持 dense attention，给模型一条更稳定的全局上下文通道。二者混用，使 1M context 不只是“位置编码拉长”，而是推理成本曲线被重写。

mHC 解决的是大模型深层信号传播问题。普通 residual connection 把每层输出加回同一个 residual stream，表达路径相对固定；Hyper-Connections 扩展出多个残差槽位，用 \(A_l,B_l,C_l\) 控制每层读入和写回的位置，相当于在深度方向增加可学习的信息路由。但 HC 扩展后容易出现数值不稳定，mHC 通过把残差映射限制在特定流形上提高稳定性。对 1.6T 级别 MoE 来说，这类连接结构的意义不只是涨分，而是让超深/超宽训练能稳定跑完。

后训练阶段的 on-policy distillation 也与传统“一个模型直接 RL 到底”不同。DeepSeek-V4 先把数学、代码、agent、指令等领域分别培养成专家：每个专家先 SFT 再 GRPO，对应各自的 reward 或 success criteria。随后统一模型作为学生，在自身分布上学习多个专家的输出分布，优化 reverse KL。这样做的工程动机是降低多目标 RL 的互相干扰：专家阶段追求单域强，蒸馏阶段再合并能力，而不是让一个 reward 混合体同时拉扯所有能力。

Engram 论文与用户元信息中的“条件内存”高度对应，但需要和 V4 官方报告区分开。Engram 认为 MoE 只解决“该激活哪个计算专家”，没有给 Transformer 一个原生的“静态知识查表”原语；于是它用现代化 N-gram embedding 作为 \(O(1)\) lookup，把局部 token 模式映射到超大 memory table。论文报告 27B Engram 在等参数、等 FLOPs 条件下优于纯 MoE baseline，并指出确定性寻址允许从 CPU/host memory 预取，降低 GPU 显存压力。这是一个很合理的下一代稀疏方向，但官方 V4 报告公开披露的主线仍是 CSA/HCA、mHC、Muon 和 OPD。

从视觉语言模型视角看，DeepSeek-V4 本身不是公开披露的原生 VLM；它更像可作为多模态系统语言/推理底座的长上下文 MoE。若要服务视觉语言任务，通常还需要视觉编码器、投影器、OCR/文档解析器或 GUI/空间任务工具链，把视觉 token、结构化坐标、页面文本和行动轨迹送入 V4 的长上下文窗口。它的“百万 token + 高效 KV”优势会在长视频、长文档、多屏 GUI agent、跨文件代码审查这类场景中体现，而不是直接等价于有视觉感知能力。

> ⚠️ 注意：输入描述里的“Engram 条件内存机制”和“空间导航胜过 GPT-5.4”不能从官方 DeepSeek-V4 技术报告直接核验。本文保留元信息不改动，但正文按可核验来源把 V4 官方架构与 Engram 相邻研究分开解读。

#### 🧪 练习题

```yaml
question: "DeepSeek-V4 官方技术报告中，降低百万 token 上下文成本的核心架构手段是什么？"
options:
  - "CSA+HCA 混合注意力压缩 KV 并进行稀疏/压缩注意力计算"
  - "把所有 MoE expert 改成稠密 FFN"
  - "只增加视觉编码器分辨率，不改变语言模型注意力"
  - "取消 KV cache，每次 decoding 都从头重算完整上下文"
answer: 0
explain: "官方报告明确把 CSA+HCA 作为长上下文效率核心：V4-Pro 在 1M token 设置下仅需 V3.2 约 27% 的单 token FLOPs 和约 10% 的 KV cache。"
```
