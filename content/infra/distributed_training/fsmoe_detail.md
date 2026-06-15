### FSMoE: 灵活可扩展MoE

```yaml
id: fsmoe
name: FSMoE
full_name: 灵活可扩展MoE (FSMoE)
year: '2025'
org: CUHK/Huawei
paper_url: https://arxiv.org/abs/2103.13262
category: hybrid
parent: tutel
motivation: 灵活可扩展MoE训练框架
```

#### 📝 一句话总结

任务 URL 对应的 FastMoE 是一个基于 PyTorch 的分布式 MoE 训练系统，它提供灵活接口和高性能专家并行 runtime，使普通 GPU 集群也能训练专家数量随设备数线性扩展的 MoE 模型。

#### 🎯 核心要点

- 任务 id/name 写作 FSMoE，但 `paper_url` 指向 FastMoE 论文；本文按该论文和“灵活可扩展 MoE 训练框架”动机解读。
- 提供层次化接口：既支持像普通 PyTorch module 一样插入 MoE 层，也允许高级用户控制 gate、expert 和通信。
- 基于 expert parallelism 将不同专家放在多 GPU/多节点上，专家数量可随 GPU 数扩展。
- 优化 token dispatch、all-to-all 和 expert computation，避免直接 PyTorch 实现中的大量小 kernel 和拷贝开销。
- 支持与 Transformer-XL、Megatron-LM 等模型结合，使 GPU/PyTorch 社区能复现实用 MoE 训练。

#### 🔬 深入细节

##### 核心示意图

![FastMoE 系统架构示意](https://ar5iv.labs.arxiv.org/html/2103.13262/assets/x1.png)
*图：FastMoE 展示 gate、dispatcher、专家并行和输出组合构成的 PyTorch MoE 训练系统。*

##### 算法伪代码

```python
# FastMoE/FSMoE-style layer
class FMoELayer(nn.Module):
    def forward(self, x):
        gate_score = self.gate(x)
        expert_id, gate = top_k(gate_score, k=self.top_k)

        # dispatch tokens to remote experts
        packed, metadata = fmoe_encode(x, expert_id)
        remote_inputs = fmoe_all_to_all(packed, self.expert_group)

        remote_outputs = []
        for local_expert, tokens in zip(self.local_experts, remote_inputs):
            remote_outputs.append(local_expert(tokens))

        gathered = fmoe_all_to_all(remote_outputs, self.expert_group)
        return fmoe_decode(gathered, metadata, gate)
```

##### 方法解释

早期大规模 MoE 系统主要依赖 Google TPU 和 Mesh TensorFlow，对 GPU/PyTorch 用户不友好。FastMoE 的动机是把 MoE 抽象成可复用 PyTorch 层，同时把高性能分布式 dispatch 隐藏在 runtime 里。用户可以像插入 FFN 一样插入 MoE 层，但底层会根据 gate 输出把 token 发往远端专家。

专家并行是系统核心。若共有 \(E\) 个专家、\(G\) 张 GPU，每张 GPU 只保存 \(E/G\) 个专家。router 为 token 选择专家后，runtime 将 token 按目标专家重新排序和打包，通过 all-to-all 发到对应 GPU；专家本地执行 FFN 后，再通过反向 all-to-all 返回原 GPU，并按 gate 权重组合输出。

FastMoE 的工程优化集中在 encode/all-to-all/decode 热路径。朴素 PyTorch 实现会产生大量 scatter/gather、小 tensor 和 Python 调度开销；FastMoE 使用定制算子和通信调度减少内存拷贝，维护 token 原始位置元数据，使前向和反向都能高效恢复顺序和梯度。

> 💡 关键：FastMoE 的贡献是把 MoE 从特定 TPU 编译栈迁移到通用 GPU/PyTorch 生态，同时保留专家并行的规模扩展能力。

##### 与 Tutel 的关系

FastMoE 更早提供 PyTorch 分布式 MoE 基础设施，重点是接口灵活和 expert parallel 可扩展；Tutel 在此类系统基础上进一步强调自适应并行、all-to-all 优化和动态负载下的 runtime 性能。任务将 FSMoE 置于 Tutel 之后，可以理解为“灵活可扩展 MoE 框架”这一谱系中的基础系统。

#### 🧪 练习题

```yaml
question: "FastMoE/FSMoE 中 expert parallelism 的主要作用是什么？"
options:
  - "把不同专家分布到不同 GPU，使专家数量随设备数扩展"
  - "让每个 token 同时经过所有专家"
  - "取消 router 的 Top-k 选择"
  - "只压缩优化器状态"
answer: 0
explain: "专家并行将专家参数切到多设备上，token 通过 all-to-all 到达对应专家，是 MoE 扩展的核心机制。"
```
