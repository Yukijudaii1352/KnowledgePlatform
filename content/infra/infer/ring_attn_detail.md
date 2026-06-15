### Ring Attention: 环形注意力 (Ring Attention)

```yaml
id: ring_attn
name: Ring Attention
full_name: 环形注意力 (Ring Attention)
year: '2023'
org: UC Berkeley
paper_url: https://arxiv.org/abs/2310.01802
category: attention
parent: flashattn
motivation: 分布式环形通信支持近乎无限上下文
```

#### 📝 一句话总结

Ring Attention 将序列块分布在多设备上，并以环形通信流动 K/V block，使每台设备只存局部块却能计算全局 exact attention，从而扩展超长上下文训练。

#### 🎯 核心要点

- 把长序列切成 blocks 并分布到设备环上
- 每轮沿 ring 传递 K/V block，各设备计算本地 Q 与收到 K/V 的 attention
- 结合 FlashAttention 的 online softmax 合并跨块结果
- 内存随本地序列块而非全局长度增长
- 可扩展到远超单卡显存的上下文长度

#### 🔬 深入细节

![Ring Attention 核心示意图](https://ar5iv.labs.arxiv.org/html/2310.01802/assets/x1.png)
*图：Ring Attention 的设备环通信与分块 attention 计算。*

```python
# Ring Attention sketch
local_Q, local_K, local_V = shard(sequence)
state = init_online_softmax(local_Q)
send_KV = (local_K, local_V)
for step in range(num_devices):
    recv_KV = ring_exchange(send_KV)
    state.update(attend_tile(local_Q, recv_KV))
    send_KV = recv_KV
O_local = state.output()
```

##### 动机与背景

超长上下文训练的 attention 矩阵和 KV 激活无法放入单卡。普通 tensor/sequence parallel 要么通信量大，要么难以处理 causal mask 与 softmax 归一化。

##### 核心机制

每个设备持有一段序列的 Q/K/V。K/V block 沿设备环逐步传递；每个设备用本地 Q 与每个收到的 K/V block 计算局部 attention，并用 online softmax 维护全局归一化。

##### 训练/推理流程

经过 \(P\) 轮 ring exchange 后，每个设备都见过所有 K/V block，得到自己本地 Q 的完整 attention 输出。反向传播也按相似 ring 流程计算梯度。

##### 与传统方法的区别

Ring Attention 不是稀疏近似，而是分布式 exact attention。它用通信换显存，把上下文长度扩展交给设备数量和流水调度。

#### 🧪 练习题

```yaml
question: "Ring Attention 如何让每个设备看到全局 K/V？"
options:
  - "K/V block 沿设备环通信"
  - "复制整个模型到硬盘"
  - "删除 causal mask"
  - "只训练 embedding"
answer: 0
explain: "每轮 ring exchange 传递 K/V block，最终本地 Q 与所有远端 K/V 都完成计算。"
```
