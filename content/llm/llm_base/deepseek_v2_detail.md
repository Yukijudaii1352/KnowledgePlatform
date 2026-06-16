### DeepSeek-V2：经济高效 MoE 语言模型

```yaml
id: deepseek_v2
name: DeepSeek-V2
full_name: 经济高效 MoE 语言模型 (DeepSeek-V2)
year: '2024.05'
org: DeepSeek-AI
paper_url: https://arxiv.org/abs/2405.04434
category: sparse_moe
parent: deepseek_moe
motivation: MLA压缩KV缓存
```

#### 📝 一句话总结
DeepSeek-V2 提出 Multi-head Latent Attention (MLA)，把生成阶段需要缓存的 Key/Value 压缩为低维 latent，并结合 DeepSeekMoE 的细粒度专家和共享专家设计，解决大模型训练成本和长上下文推理显存之间的冲突。

#### 🎯 核心要点
- 236B 总参数、21B 每 token 激活参数，预训练语料规模为 8.1T tokens，并通过 YaRN 支持 128K 上下文。
- MLA 使用低秩 KV 联合压缩，只缓存 \(c_t^{KV}\) 与解耦 RoPE key，将 KV cache 降低 93.3%。
- 解耦 RoPE 将位置信息放到额外的 \(q_t^R,k_t^R\) 通道，避免 RoPE 破坏低秩矩阵吸收。
- DeepSeekMoE 采用 2 个共享专家、160 个路由专家，每个 token 激活 6 个路由专家，兼顾通用能力和专家专化。
- 设备受限路由把每个 token 的专家分配限制到最多 3 个设备，降低跨设备 all-to-all 通信。
- 训练中加入专家级、设备级、通信级三类负载均衡辅助损失，并使用 token-dropping 控制专家容量。
- 相比 DeepSeek 67B，论文报告训练成本降低 42.5%，实际部署最大生成吞吐提升到 5.76 倍。

#### 🔬 深入细节

![DeepSeek-V2 架构图](https://arxiv.org/html/2405.04434/x3.png)
*图：DeepSeek-V2 的基础架构，注意力层采用 MLA，FFN 层采用 DeepSeekMoE。*

```python
# DeepSeek-V2 MLA + DeepSeekMoE 前向流程伪代码
for token_t in sequence:
    h = transformer_input[token_t]

    # 1. MLA: KV 被联合压缩到 latent，并把 RoPE 从压缩 KV 中解耦出来
    c_kv = W_DKV @ h                       # cache this latent
    c_q = W_DQ @ h
    q_c = W_UQ @ c_q
    q_r = rope(W_QR @ c_q, position=token_t)
    k_r = rope(W_KR @ h, position=token_t)  # cache this decoupled RoPE key

    kv_cache.append((c_kv, k_r))
    attn_out = latent_attention(q_c, q_r, kv_cache)

    # 2. DeepSeekMoE: 共享专家恒激活，路由专家 Top-K 激活
    u = h + attn_out
    shared = sum(shared_expert_i(u) for i in range(2))
    candidate_devices = top_m_devices(router_scores(u), m=3)
    routed_ids = top_k_experts(router_scores(u, candidate_devices), k=6)
    routed = sum(gate_i(u) * routed_expert_i(u) for i in routed_ids)

    output[token_t] = u + shared + routed
    update_aux_balance_losses(routed_ids, candidate_devices)
```

MLA 的出发点是标准 MHA 的推理瓶颈。MHA 在生成时要为每层、每个历史 token 缓存完整的 \(K,V\)，缓存量与 \(2n_hd_hl\) 成正比；当 batch size 或上下文长度变大时，显存首先被 KV cache 吃掉。GQA/MQA 可以减少 KV 头数，但会牺牲表达能力。DeepSeek-V2 的做法不是少存几个完整头，而是把所有头共享的 KV 信息先压缩进一个低维向量：

$$
c_t^{KV}=W^{DKV}h_t,\quad
k_t^C=W^{UK}c_t^{KV},\quad
v_t^C=W^{UV}c_t^{KV}
$$

推理时只需要缓存 \(c_t^{KV}\)。更关键的是，\(W^{UK}\) 可以吸收到 query 侧投影里，\(W^{UV}\) 可以吸收到输出投影里，因此计算注意力时不必显式恢复完整的 \(k_t^C,v_t^C\)。DeepSeek-V2 的配置中 \(d_c=512\)，而完整多头维度 \(n_hd_h=128\times128=16384\)，缓存从“完整 K/V”变为“低维 latent”，这是 93.3% KV cache 下降的根本来源。

RoPE 是 MLA 中最容易被忽略的技术难点。若直接对 \(k_t^C=W^{UK}c_t^{KV}\) 加 RoPE，位置相关的旋转矩阵会夹在 \(W^{UK}\) 和 query 投影之间，使推理时的矩阵吸收不再成立。DeepSeek-V2 因此新增解耦通道：

$$
q_t=[q_t^C;q_t^R],\quad k_t=[k_t^C;k_t^R]
$$

其中 \(q_t^R\) 和共享的 \(k_t^R\) 专门承载 RoPE 位置信息。这样主体语义仍由低秩 KV latent 提供，位置信息由额外小维度通道提供。论文给出的直觉是：MLA 的 KV cache 近似等价于只有 2.25 个组的 GQA，但能力在消融中强于 MHA。

DeepSeekMoE 解决的是训练成本而不是 KV cache。它继承 DeepSeekMoE 的两条设计：细粒度专家分割让每个专家更容易专化，共享专家隔离把通用知识从路由专家里拿出来，减少不同路由专家重复学习同一类通用模式。DeepSeek-V2 每个 MoE 层包含 2 个共享专家和 160 个路由专家，每个 token 额外选择 6 个路由专家；共享专家对所有 token 生效，路由专家只处理与自己亲和度高的 token。

MoE 的代价是通信和负载不均衡。DeepSeek-V2 把专家均匀放在 8 个设备上，并要求每个 token 最多发送到 3 个设备；这限制了 all-to-all 的扇出。训练时还计算三类辅助损失：专家级损失约束单个专家的 token 量，设备级损失约束设备整体负载，通信级损失约束设备接收侧负载。若某设备超出容量预算，则按路由亲和度丢弃低优先级 token，并保留一部分序列从不丢弃，以降低训练与推理的不一致。

从系统角度看，DeepSeek-V2 的贡献不是单点 MoE 或单点注意力替换，而是把“低缓存注意力”和“稀疏激活 FFN”一起做成可训练、可部署的模型。MLA 让长上下文和大 batch 推理不被 KV cache 限死，DeepSeekMoE 让 236B 总参数模型每个 token 只激活 21B 参数，设备受限路由和负载均衡损失则保证这套稀疏结构在 H800 集群上不会被通信拖垮。

#### 🧪 练习题

```yaml
question: "DeepSeek-V2 中解耦 RoPE 的主要作用是什么？"
options:
  - "让 MoE 路由更均匀，减少专家负载倾斜"
  - "把位置信息从低秩 KV 压缩主路径中分离出来，保留矩阵吸收带来的 KV cache 节省"
  - "用更大的词表增强中文和英文混合建模"
  - "在训练中完全取消所有负载均衡辅助损失"
answer: 1
explain: "若直接对压缩 key 加 RoPE，位置相关矩阵会破坏推理时的投影矩阵吸收。解耦 RoPE 用额外的 q^R/k^R 通道承载位置信息，从而保留 MLA 的低缓存优势。"
```
