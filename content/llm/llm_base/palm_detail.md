### PaLM: Pathways 语言模型 (Pathways Language Model)

```yaml
id: palm
name: PaLM
full_name: Pathways 语言模型 (Pathways Language Model)
year: '2022.04'
org: Google Research
paper_url: https://arxiv.org/abs/2204.02311
category: autoregressive
parent: gpt3
motivation: 540B稠密模型验证规模化
```

#### 📝 一句话总结
PaLM 训练了 540B 参数的稠密 decoder-only Transformer，用 Pathways 在 6144 块 TPU v4 上实现跨 Pod 高效训练，验证了 500B+ 稠密语言模型继续规模化仍能带来 few-shot、推理、多语言和代码能力提升。它的核心贡献是把超大稠密模型的训练系统、架构细节和涌现评估连成了一次完整规模化实验。

#### 🎯 核心要点
- 提出 8B、62B、540B 三档 PaLM 稠密自回归语言模型，最大模型 540B 参数、训练约 780B tokens。
- 使用 Pathways 系统跨两个 TPU v4 Pod 训练，合计 6144 芯片，并采用 pod 级二路数据并行加 pod 内模型/数据并行。
- 训练效率以 MFU（Model FLOPs Utilization）衡量，PaLM 540B 达到 46.2% MFU 和 57.8% HFU。
- 架构采用 decoder-only Transformer，并结合 SwiGLU、Parallel Layers、Multi-Query Attention、RoPE、无 bias 等规模化友好的设计。
- 数据集包含网页、社交媒体对话、书籍、代码、维基百科、新闻等高质量文本，词表为 256k SentencePiece。
- 论文系统评估英语 NLP、BIG-bench、GSM8K、代码、多语言任务，并观察到若干任务随规模出现非连续跃迁。
- PaLM 代表的是 GPT-3 路线的“更大稠密模型”验证，后续也为 Chinchilla/LLaMA 等更重视数据-参数配比的工作提供了强基线。

#### 🔬 深入细节
![PaLM Pathways 跨 TPU Pod 数据并行示意图](https://ar5iv.labs.arxiv.org/html/2204.02311/assets/x3.png)
*图：论文 Figure 2 的 Pathways 执行图面板，展示跨两个 TPU v4 Pod 的前向/反向、梯度传输和优化器更新流程。*

```python
# PaLM/Pathways 跨 Pod 训练流程伪代码
def train_palm_with_pathways(global_batch, pod_a, pod_b, optimizer):
    # 每个 pod 内部持有同一模型的分片副本，使用模型并行 + fully sharded data parallel
    batch_a, batch_b = split(global_batch, parts=2)

    # 1. pod 内并行执行前向和反向
    grads_a = pod_a.forward_backward(batch_a)
    grads_b = pod_b.forward_backward(batch_b)

    # 2. pod 之间只交换对方需要累加的梯度分片
    remote_for_a = pathways_send_recv(grads_a, source=pod_a, target=pod_b)
    remote_for_b = pathways_send_recv(grads_b, source=pod_b, target=pod_a)

    # 3. 两侧累加本地和远端梯度，独立执行同一优化器更新
    full_grads_a = add_sharded_gradients(grads_a, remote_for_a)
    full_grads_b = add_sharded_gradients(grads_b, remote_for_b)
    pod_a.params = optimizer.step(pod_a.params, full_grads_a)
    pod_b.params = optimizer.step(pod_b.params, full_grads_b)

    # 更新后两个 pod 的参数保持 bitwise-identical
    assert same_parameters(pod_a.params, pod_b.params)
```

PaLM 的第一层意义是系统工程：540B 稠密模型不能只靠常规单集群数据并行训练。论文用 Pathways 将一个 Python client 发出的 sharded dataflow program 调度到两个 TPU v4 Pod，每个 Pod 内部使用 12 路模型并行和 256 路 fully sharded data parallel；跨 Pod 则做二路数据并行。每一步中两个 Pod 各自处理半个 batch，完成反向传播后交换梯度，再各自累加并更新参数，从而在没有流水线并行的情况下把训练扩展到 6144 芯片。

这种设计刻意避开了 pipeline parallelism 的 bubble 和微批次权重重复加载问题，但代价是跨数据中心网络的梯度传输会非常突发。论文报告每步对应主机之间要交换约 GB 级梯度，聚合带宽峰值很高，因此 Pathways 需要把传输拆成小块并走多路径路由。PaLM 用 MFU 而不是只看 HFU，是因为 rematerialization 等实现会改变硬件实际执行 FLOPs；MFU 更接近“按模型理论前反向 FLOPs 计算，系统每秒真正处理了多少 token”。

架构上，PaLM 仍是 GPT-3 风格的自回归 decoder-only Transformer，但做了几处面向大规模训练和推理的改动。SwiGLU 用门控前馈层增强表达能力；Parallel Layers 让 attention 和 MLP 从同一个归一化输入并行计算，便于融合矩阵乘并提升吞吐；Multi-Query Attention 让所有 query heads 共享 key/value，降低自回归解码时 KV cache 带宽；RoPE 用旋转位置编码注入相对位置信息；去掉 dense kernel 和 LayerNorm bias 则简化参数与训练行为。这些设计单独看都不是 PaLM 首创，但 PaLM 证明它们能在 540B 稠密规模上组合工作。

训练目标仍是标准 next-token prediction。若输入 token 序列为 \(x_1,\dots,x_T\)，模型优化：

$$
\mathcal{L}(\theta)=-\sum_{t=1}^{T}\log p_\theta(x_t \mid x_{<t})
$$

优化器使用 Adafactor，学习率先保持较大初值再按步数衰减，并配合全局梯度裁剪。PaLM 的数据混合约 780B tokens，覆盖对话、网页、书籍、代码、维基百科和新闻；256k SentencePiece 词表帮助多语言和代码场景保留更细的可逆文本信息。这里的关键不是“有监督任务微调”，而是在统一预训练目标下测试规模本身能否提升 few-shot 适应能力。

评估结果显示，PaLM 540B 在大量英文 NLP 基准、BIG-bench、数学推理、代码生成和多语言任务上明显强于 8B/62B，并在部分 BIG-bench 任务中出现规模跃迁。论文把这种现象描述为 discontinuous improvements：从小模型到中等模型变化不大，但到 540B 后能力突然显现。这个观察推动了后来关于 emergence、chain-of-thought 和规模阈值的讨论，不过也要注意，PaLM 同时消耗了极高训练算力；Chinchilla 随后会指出，在同样或相近预算下，数据-参数配比可能比继续堆参数更关键。

> ⚠️ 注意：PaLM 的“算法贡献”不只是 540B 参数本身，而是大模型训练系统、架构选择、数据混合、优化设置和评估协议的组合；离开 Pathways 训练栈，很难复现这一级别的稠密模型训练效率。

#### 🧪 练习题
```yaml
question: "PaLM 使用 Pathways 跨两个 TPU v4 Pod 训练时，pod 级并行的关键步骤是什么？"
options:
  - "把模型层按顺序切成流水线，每个 Pod 只保存连续若干层"
  - "两个 Pod 各处理一半 batch，交换梯度后各自执行相同参数更新"
  - "一个 Pod 只训练 embedding，另一个 Pod 只训练 Transformer block"
  - "每个 Pod 训练独立模型，最后对 logits 做 ensemble"
answer: 1
explain: "PaLM 540B 使用 pod 级二路数据并行：每个 Pod 内完成前向/反向，跨 Pod 交换并累加梯度，再并行更新以保持参数一致。"
```
