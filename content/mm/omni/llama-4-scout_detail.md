### Llama 4 Scout全模态 (Llama 4 Scout)
```yaml
id: llama-4-scout
name: Llama 4 Scout
full_name: Llama 4 Scout全模态 (Llama 4 Scout)
year: '2026'
org: Meta
paper_url: https://llama.meta.com/llama4-launch
category: frontier_2026
parent: chameleon
motivation: MoE长上下文多模态
topic_id: omni
yaml_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/omni.yaml
output_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/omni/llama-4-scout_detail.md
```

#### 📝 一句话总结
Llama 4 Scout 在 Chameleon 式早期融合多模态自回归架构上引入稀疏 MoE、iRoPE 长上下文机制和 10M token 上下文窗口，解决开放权重模型在多图视觉理解、超长文档/代码库推理与单卡可部署效率之间难以兼得的问题。

#### 🎯 核心要点
- 早期融合多模态：把文本 token 与视觉 patch token 放入统一 Transformer 主干，自回归地产生文本/代码输出。
- 稀疏 MoE 架构：Scout 为 17B active parameters、16 experts、109B total parameters，单 token 只激活部分参数以降低训练和推理开销。
- 10M 长上下文：官方模型卡给出 Scout 最大上下文长度 10M tokens，Meta 博客强调从 Llama 3 的 128K 大幅扩展。
- iRoPE 长度泛化：交错使用带 RoPE 的注意力层和无位置编码注意力层，并在推理时对注意力做温度缩放。
- 视觉输入格式：支持文本 + 图像输入，官方文档说明图像按 336×336 tile 切分，并追加全局缩放 tile。
- 训练流程：多模态预训练、长上下文 mid-training、轻量 SFT、在线多模态 RL、轻量 DPO，并用难例筛选保持推理/编码/数学能力。
- 部署目标：INT4 量化版本可在单张 NVIDIA H100 上运行，适合长文档分析、多文档总结和大代码库推理。

#### 🔬 深入细节
![Llama 4 MoE 架构示意](https://scontent-sin11-1.xx.fbcdn.net/v/t39.2365-6/488655517_650996354186993_1043942188415715102_n.png?_nc_cat=105&_nc_gid=VOqEH1RPzVOypMfYnMo47w&_nc_ht=scontent-sin11-1.xx&_nc_oc=AdqtwDvug5p8qikmdahrLbTU3y_kyD3rreSZnPDdK1oKjDdN_1JDUfsrmagrQLhHHwQ&_nc_ohc=MLLT0x0HCvAQ7kNvwGyuHzi&_nc_sid=e280be&_nc_ss=78100&_nc_zt=14&ccb=1-7&oe=6A4ADD00&oh=00_Af8kwVSjnjFLxXIJ85ZbuQ8Zoj4xp3iFThL_DLBFD5oJlQ)
*图：Meta 在 Llama 4 发布页展示的 MoE 层示意。官方以 Maverick 为例说明 shared expert + routed experts 的稀疏激活模式；Scout 同属 Llama 4 MoE 家族，公开卡确认 16 experts、17B active、109B total。*

```python
# Llama 4 Scout 的抽象训练/推理流程（公开资料级别）
def encode_multimodal(prompt):
    seq = []
    for item in prompt:
        if item.type == "text":
            seq.extend(text_tokenizer(item.text))
        elif item.type == "image":
            # 官方文档：动态图像切分为 336x336 局部 tile，并追加一个全局 tile
            tiles = split_into_tiles(item.image, tile_size=336)
            tiles.append(resize_global_tile(item.image, 336))
            seq.extend(vision_encoder_and_image_tokens(tiles))
    return add_role_modality_and_position_features(seq)

def llama4_scout_forward(prompt, kv_cache=None):
    h = encode_multimodal(prompt)
    for layer in transformer_layers:
        h = layer.attention(h, kv_cache=kv_cache, position_scheme=layer.irope_mode)
        if layer.kind == "moe":
            route = router(h, experts=16)          # token -> routed expert
            h = shared_or_dense_path(h) + routed_expert(route, h)
        else:
            h = dense_ffn(h)
    return autoregressive_decode(h, output_modalities=["text", "code"])

# 后训练概念流程
pretrain(multimodal_web_text_image_video_data)
midtrain(long_context_specialized_data, target_context=256_000)
lightweight_sft(hard_instruction_data)
online_multimodal_rl(filter_by="medium_to_hard_prompts")
lightweight_dpo(corner_case_preference_data)
```

Llama 4 Scout 继承了 Chameleon 代表的 early-fusion 思路：不要先用一个独立视觉模型生成文本描述，再把描述交给 LLM，而是把视觉切片映射成和文本同处一个上下文序列的 token/embedding。若文本 token 为 \(t_{1:n}\)，图像经 tile 化和视觉编码后得到 \(v_{1:m}\)，模型实际看到的是交错序列：

$$
z = [e(t_1), \ldots, e(t_n), g(v_1), \ldots, g(v_m)] + e_{\mathrm{role}} + e_{\mathrm{modality}}
$$

然后用自回归目标建模文本或代码输出：

$$
p_{\theta}(y_{1:T}\mid z)=\prod_{t=1}^{T}p_{\theta}(y_t\mid y_{<t}, z)
$$

这种设计的价值在于视觉信息没有被预先压缩成 caption，模型可以直接在文字、图表、文档截图、多张图片之间做联合注意力。官方文档还披露了具体图像 prompt 格式：大图会被切成 336×336 patch token，并添加一个全局缩放视图，用局部细节和全局布局共同支持 DocVQA、ChartQA、图像 grounding 等任务。

Scout 的第二个关键是 MoE 条件计算。稠密模型每个 token 都经过同一套 FFN 参数，扩容会直接增加每 token 计算；MoE 则让路由器为 token 选择少数专家。可抽象为：

$$
r(h)=\operatorname{TopK}(\operatorname{softmax}(W_rh), k),\qquad
\operatorname{MoE}(h)=E_{\mathrm{shared}}(h)+\sum_{i\in r(h)}\alpha_iE_i(h)
$$

其中 \(E_i\) 是专家 FFN，\(\alpha_i\) 是路由权重。对 Scout，公开模型卡给出总参数 109B、活跃参数 17B、16 个专家；这意味着模型需要在内存中保存较大容量，但服务单个 token 时只激活一部分计算路径。它的工程目标不是追求最大总参数，而是在开放权重场景里把多模态质量、长上下文和单 H100 INT4 部署放到同一个可用点上。

长上下文来自训练和位置机制的组合，而不是简单把 RoPE 外推到 10M。Meta 披露 Scout 在预训练和后训练中使用 256K context，并通过 long-context mid-training 获得长度泛化；架构上使用 iRoPE，即大多数层保留 RoPE，部分 interleaved attention layers 不使用位置编码，再配合推理时 attention temperature scaling。可把第 \(\ell\) 层注意力写成：

$$
\operatorname{Attn}_{\ell}(Q,K,V)=
\operatorname{softmax}\left(
\frac{s_{\ell}(Q,K)}{\tau_{\ell}(L)\sqrt{d}}
\right)V
$$

$$
s_{\ell}(q_i,k_j)=
\begin{cases}
(R_iq_i)^\top(R_jk_j), & \ell\in\mathcal{R}_{\mathrm{RoPE}} \\
q_i^\top k_j, & \ell\in\mathcal{R}_{\mathrm{NoPE}}
\end{cases}
$$

这里 \(L\) 是推理上下文长度，\(\tau_{\ell}(L)\) 表示公开资料中提到的推理时注意力温度缩放。直觉上，RoPE 层保留相对位置信息，NoPE 层减少对训练位置范围的硬绑定，温度缩放在极长序列下调整注意力分布，缓解长上下文里注意力权重过度稀释的问题。

后训练方面，Meta 对 Llama 4 系列采用轻量 SFT → 在线 RL → 轻量 DPO。其核心不是把所有指令数据都塞进 SFT，而是先用模型判别去掉大量 easy 数据，让 SFT 聚焦较难样本；在线 RL 阶段持续采样和过滤 medium-to-hard prompts，使模型在多模态、推理、编码、数学任务上保持探索；最后用轻量 DPO 修复回答质量和对话边角问题。一个简化目标可以写成：

$$
\mathcal{L}=
\mathcal{L}_{\mathrm{pretrain}}
+\lambda_{\mathrm{lc}}\mathcal{L}_{\mathrm{long\ context}}
+\lambda_{\mathrm{sft}}\mathcal{L}_{\mathrm{sft}}
-\lambda_{\mathrm{rl}}\mathbb{E}[R(x,y)]
+\lambda_{\mathrm{dpo}}\mathcal{L}_{\mathrm{pref}}
$$

与 Chameleon 相比，Scout 的创新点更偏系统化：Chameleon 证明了图文 token 早期融合可以形成统一自回归多模态模型；Scout 在此基础上把稀疏专家、长上下文位置泛化、图像 tile 化和开放权重部署打包成一个可服务模型。它仍不是音频/视频输出的 any-to-any 生成器，公开模型卡写明输入为文本 + 最多 5 张图像、输出为文本；但训练中使用视频帧静图来增强视觉理解，因此更适合作为“超长上下文视觉-语言推理模型”来理解。

> ⚠️ 注意：Meta 未公开完整逐层超参数、路由损失、专家容量因子和 iRoPE 具体层位配置；上面的公式是对官方 MoE、early fusion、iRoPE 和后训练流程的可解释抽象，不代表未披露实现细节。

#### 🧪 练习题
```yaml
question: "Llama 4 Scout 支持 10M 上下文的关键组合是什么？"
options:
  - "只把 Llama 3 的 RoPE 最大位置参数改成 10M"
  - "用 ASR 先把所有图像和视频转成文本摘要"
  - "256K 长上下文训练、long-context mid-training、iRoPE 交错注意力和推理时注意力温度缩放"
  - "完全取消注意力机制，只保留 MoE 路由器"
answer: 2
explain: "Meta 公开资料说明 Scout 经过 256K context 预训练和后训练，并使用 iRoPE 与推理时 attention temperature scaling 来增强长度泛化。"
```
