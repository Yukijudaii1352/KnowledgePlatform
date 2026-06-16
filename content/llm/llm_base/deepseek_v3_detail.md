### DeepSeek-V3：大规模 MLA+MoE 语言模型

```yaml
id: deepseek_v3
name: DeepSeek-V3
full_name: 大规模 MLA+MoE 语言模型 (DeepSeek-V3)
year: '2024.12'
org: DeepSeek-AI
paper_url: https://arxiv.org/abs/2412.19437
category: sparse_moe
parent: deepseek_v2
motivation: 无辅助损失负载均衡
```

#### 📝 一句话总结
DeepSeek-V3 在 DeepSeek-V2 的 MLA 和 DeepSeekMoE 基础上扩展到 671B 总参数，并提出无辅助损失的专家负载均衡策略，解决传统 MoE 依赖 auxiliary loss 时负载均衡信号与语言建模目标相互干扰的问题。

#### 🎯 核心要点
- 671B 总参数、37B 每 token 激活参数，预训练 14.8T 高质量 tokens，完整训练约 2.788M H800 GPU hours。
- 继续使用 MLA 压缩 KV cache，保持高效长上下文推理能力。
- DeepSeekMoE 配置升级为每层 1 个共享专家、256 个路由专家，每个 token 激活 8 个路由专家。
- 提出 auxiliary-loss-free load balancing：Top-K 选择时加入动态 bias，负载更新与主损失解耦。
- 每个 token 最多路由到 4 个节点，并取消 token dropping，减少训练和推理行为不一致。
- 加入 Multi-Token Prediction (MTP)，在 next-token 之外额外预测一个未来 token，训练后推理可直接丢弃 MTP 模块。
- 支持 FP8 混合精度训练，激活使用 1x128 tile-wise 量化，权重使用 128x128 block-wise 量化，并用更高精度累加降低误差。
- 训练系统采用 2048 张 H800、16-way pipeline parallelism、64-way expert parallelism、ZeRO-1 和 DualPipe 通信计算重叠。

#### 🔬 深入细节

![DeepSeek-V3 架构图](https://arxiv.org/html/2412.19437/x2.png)
*图：DeepSeek-V3 的基础架构，沿用 MLA 与 DeepSeekMoE，并加入 MTP 训练目标。*

```python
# DeepSeek-V3 MoE 层与无辅助损失负载均衡伪代码
for step, batch in enumerate(pretraining_stream):
    expert_load = zeros(num_routed_experts)
    loss = 0

    for token in batch.tokens:
        h = mla_attention(token.hidden, kv_latent_cache=True)

        # Sigmoid gating 得到原始专家亲和度；bias 只用于选择，不作为主损失梯度学习
        affinity = sigmoid(router(h))              # shape: [256]
        selection_score = affinity + balance_bias
        selected = top_k(selection_score, k=8, node_limit=4)

        shared_out = shared_expert(h)
        routed_out = 0
        normalizer = sum(affinity[i] for i in selected)
        for i in selected:
            gate = affinity[i] / normalizer
            routed_out += gate * routed_expert[i](h)
            expert_load[i] += 1

        h = h + shared_out + routed_out
        loss += next_token_ce(h, token.next_token)
        loss += mtp_ce(h, token.future_token_2) * mtp_weight

    # 动态 bias 更新与反向传播解耦：过载专家降 bias，欠载专家升 bias
    target = mean(expert_load)
    for i in range(num_routed_experts):
        if expert_load[i] > target:
            balance_bias[i] -= gamma
        elif expert_load[i] < target:
            balance_bias[i] += gamma

    loss += tiny_sequence_balance_loss(batch)       # 防止单序列极端不均衡
    optimizer.backward_and_step(loss)
```

DeepSeek-V3 的架构主线是“保留 V2 已验证的高效注意力和稀疏 FFN，同时把 MoE 负载均衡从损失函数里拿出来”。MLA 部分与 DeepSeek-V2 一致，用 \(c_t^{KV}=W^{DKV}h_t\) 压缩 KV，并用解耦 RoPE 保留位置编码可用性。这样 V3 在扩到 671B 参数后，推理时仍不需要为每个历史 token 缓存完整多头 \(K,V\)，否则 128K 级上下文和大 batch 服务会被显存限制。

MoE 规模比 V2 明显更大。每个 MoE 层有 1 个共享专家和 256 个路由专家，路由专家中每个 token 选 8 个，专家中间层维度为 2048。共享专家负责所有 token 都需要的通用能力，路由专家负责更细粒度的知识和模式。论文还限制每个 token 最多被发往 4 个节点，目的是在扩大专家数量时把跨节点 all-to-all 通信控制在可隐藏的范围内。

传统 MoE 常用辅助损失鼓励专家负载均匀，问题是这个损失会和语言建模目标竞争：模型可能为了均匀使用专家而降低本应出现的专家专化。DeepSeek-V3 的关键改动是为每个路由专家维护一个动态 bias \(b_i\)，Top-K 选择用 \(s_{i,t}+b_i\)，但门控权重仍来自原始亲和度 \(s_{i,t}\)。当某专家在当前 step 中过载，就降低它的 bias；低于平均负载，就提高它的 bias：

$$
b_i \leftarrow b_i + \gamma\cdot\mathrm{sign}(T_{\mathrm{target}}-T_i)
$$

这里的 bias 更新不通过反向传播进入语言模型损失，因此不会直接扭曲 token 到专家的语义匹配。论文在预训练配置中把 bias update speed \(\gamma\) 在前 14.3T tokens 设为 0.001，最后 500B tokens 设为 0。为了避免单条序列内部出现极端不均衡，V3 仍保留一个很小的 sequence-wise balance loss；但主要负载均衡压力由动态 bias 承担。

V3 还取消了 V2 训练中的 token dropping。V2 需要在设备容量超限时丢弃低亲和度 token，以保证训练吞吐；V3 的辅助损失无关负载均衡和节点受限路由已经能把专家负载压住，因此可以让所有 token 都被处理。这个改变很重要，因为 token dropping 会制造训练和推理不一致：训练时某些 token 的专家计算缺失，推理时却不会缺失。

MTP 是另一个训练目标层面的改动。DeepSeek-V3 设置 prediction depth \(D=1\)，含义是除了主模型预测下一个 token，还通过一个顺序 MTP 模块额外预测再下一个 token。第 \(k\) 个 MTP 模块会把上一深度的 hidden state 与第 \(i+k\) 个 token 的 embedding 拼接、归一化、投影，再经过 Transformer block 输出预测分布。总损失可简化为：

$$
\mathcal{L}=\mathcal{L}_{\mathrm{next}}+\lambda\mathcal{L}_{\mathrm{MTP}}
$$

论文中 \(\lambda\) 在前 10T tokens 为 0.3，剩余 4.8T tokens 为 0.1。MTP 的好处是迫使 hidden state 携带更远一步的可预测信息，提升数据效率；推理时可以直接丢弃 MTP 模块，因此不增加主模型的常规生成成本，也可以把它改作 speculative decoding 的草稿模块。

在系统层面，DeepSeek-V3 的 FP8 训练和 DualPipe 同样关键。FP8 让计算和存储更便宜，但大模型训练容易被量化误差毁掉。V3 对激活采用 1x128 tile-wise scaling，对权重采用 128x128 block-wise scaling，并把部分累加提升到更高精度，缓解 H800 Tensor Core FP8 GEMM 累加精度不足的问题。训练框架使用 16-way PP、64-way EP 和 ZeRO-1，不使用昂贵的 tensor parallelism；DualPipe 通过把 attention、all-to-all dispatch、MLP、all-to-all combine 以及反向计算重排，尽量隐藏跨节点专家并行带来的通信开销。

因此，DeepSeek-V3 的方法贡献可以概括为三层协同：MLA 解决推理 KV cache，DeepSeekMoE 解决参数规模和计算成本，auxiliary-loss-free balancing 解决大规模 MoE 的专家负载与模型质量冲突。再叠加 MTP、FP8 和 DualPipe，论文才得以用 14.8T tokens 训练 671B 参数模型，并把完整训练成本控制在约 2.788M H800 GPU hours。

#### 🧪 练习题

```yaml
question: "DeepSeek-V3 的无辅助损失负载均衡为什么比传统 MoE auxiliary loss 更适合大规模模型？"
options:
  - "它把所有专家都改成 dense FFN，避免了路由问题"
  - "它用动态 bias 调整 Top-K 选择，负载控制不直接通过主损失反向传播，从而减少对语言建模目标的干扰"
  - "它只在推理阶段启用，因此不会影响训练"
  - "它通过减少注意力头数降低 KV cache"
answer: 1
explain: "V3 的 balance bias 根据专家负载单独更新，用于影响路由选择，但不作为语言建模损失中的强辅助项优化，因此更少破坏专家专化和主任务性能。"
```
