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

Ring Attention 将超长序列按块分布到多设备上，让 K/V block 沿设备环流动，并用 blockwise exact attention 与在线 softmax 合并结果，从而把单设备显存瓶颈转化为可重叠的环形通信问题。

#### 🎯 核心要点

- 序列维切分：每个 host/device 持有一个或多个 query block 以及本地 K/V block
- 环形 K/V 传递：每轮把当前 K/V block 发给下一个设备，同时从上一个设备接收新的 K/V block
- Blockwise exact attention：本地 Q 与每个到达的 K/V block 计算局部 attention，并用在线归一化合并
- 通信计算重叠：只与相邻设备通信；当 block attention 计算时间大于 K/V 传输时间时，通信开销可被隐藏
- 内存随 block size 而非全局序列长度增长，最大上下文长度随设备数近似线性扩展
- 同时覆盖训练与推理，论文实现使用 JAX `ppermute` 做相邻设备 K/V 交换

#### 🔬 深入细节

![Ring Attention 架构图](https://ar5iv.labs.arxiv.org/html/2310.01889/assets/figures/merged.png)
*图：Ring Attention 论文 Figure 2。上半部分展示 host 组成环并传递 K/V block；下半部分展示原始 Transformer block 被按 query block 与 key-value block 重排计算。注：worker 元信息中的 arXiv ID 保持原样；本图与方法细节来自官方 Ring Attention 论文 arXiv:2310.01889。*

```python
# Ring Attention forward sketch on each device p
q_p, k_p, v_p = shard_sequence_on_device(x, device=p)
state = init_online_attention_state(q_p)
send_k, send_v = k_p, v_p

for step in range(num_devices):
    # In real implementations this is overlapped with local block attention.
    recv_k, recv_v = ring_send_recv(send_k, send_v, dst=(p + 1), src=(p - 1))

    state = online_block_attention_update(
        query=q_p,
        key=send_k,
        value=send_v,
        state=state,
        causal_or_padding_mask=block_mask(p, step),
    )

    send_k, send_v = recv_k, recv_v

o_p = finalize_online_attention(state)
y_p = blockwise_feedforward(o_p)
```

标准注意力是：

$$
\operatorname{Attention}(Q,K,V)=\operatorname{softmax}\left(\frac{QK^\top}{\sqrt{d}}\right)V
$$

当 K/V 被拆成多个 block 时，Ring Attention 依赖与 FlashAttention 相同的在线 softmax 合并律。对本地 query block \(Q_i\) 和第 \(j\) 个到达的 K/V block：

$$
S_j=\frac{Q_iK_j^\top}{\sqrt{d}},\quad
m_j=\max(m_{j-1}, \operatorname{rowmax}(S_j))
$$

$$
\ell_j=e^{m_{j-1}-m_j}\ell_{j-1}+\operatorname{rowsum}(e^{S_j-m_j})
$$

$$
O_j=e^{m_{j-1}-m_j}O_{j-1}+e^{S_j-m_j}V_j,\qquad
O=O_T/\ell_T
$$

动机上，FlashAttention 已经避免了 materialize \(L\times L\) 注意力矩阵，但单设备仍必须容纳本层输入/输出、激活检查点、KV/中间 buffer 和 FFN 激活。Blockwise Parallel Transformer 进一步把 attention 与 feedforward 都按块执行，降低了中间激活峰值；但对于极长序列，每层输出仍随全局序列长度 \(L\) 增长，单卡 HBM 仍会卡住。Ring Attention 的关键观察是：每个 query block 对所有 K/V block 的 attention 可以按任意顺序累计，只要 softmax 统计量正确重标定。因此可以把序列块分散到设备上，让每个设备只负责自己的 query block 输出。

核心机制是“环上流动的是 K/V，固定不动的是本地 Q 和输出累加器”。第 \(p\) 个设备持有 \(Q_p,K_p,V_p\)。第 0 轮它用本地 \(K_p,V_p\) 更新 \(Q_p\) 的 attention；随后把这对 K/V 发给设备 \(p+1\)，同时从 \(p-1\) 接收另一对 K/V。经过 \(P\) 轮后，\(P\) 个设备都看过所有 K/V block，各自得到本地 query block 的完整 exact attention 输出。由于每轮只保留当前和下一组 K/V buffer，加上本地 Q、输出和接收 buffer，显存峰值与 block size \(B\) 成正比，而不是与全局 \(L\) 成正比。

通信是否“免费”取决于算术强度。设单设备算力为 \(F\)，相邻设备带宽为 \(W\)，hidden size 为 \(H\)，block size 为 \(B\)。一次 block attention 的两个主要矩阵乘约需 \(4B^2H\) FLOPs，而传输 K/V block 在 bf16 下约需 \(4BH\) bytes。要把传输藏在计算后面，需要：

$$
\frac{4B^2H}{F}\geq\frac{4BH}{W}
\quad\Longrightarrow\quad
B\geq\frac{F}{W}
$$

这个条件解释了为什么 Ring Attention 偏好足够大的 block，以及为什么 NVLink/TPU ICI 这类高带宽互连更容易达到零额外通信开销。论文中对 A100 NVLink、TPU v3/v4/v5e 等系统给出估算，常见高带宽互连的最小 block size 约在千级 token，适合长上下文训练；而 InfiniBand 跨机带宽较低，要求更大的 block 才能完全隐藏通信。

与传统 sequence parallelism 不同，Ring Attention 不需要每轮 all-gather 全部序列激活，也不把所有远端 K/V 同时堆在本地内存中；它只做邻居间流式交换。与稀疏 attention、滑窗 attention 或检索式压缩不同，它没有改变 attention 图，理论上仍能让每个 token attend 到全局所有 token。causal 场景下只需在 block pair 上应用相应 mask：当某个 K/V block 位于 query block 未来位置时，其 score 被屏蔽；在线 softmax 合并规则不变。

训练流程中，forward 的环形 K/V 传递可以和 blockwise feedforward 结合，backward 也沿相似通信模式传播梯度。推理时，如果上下文被跨设备持久分片，新 token 或 query block 仍可沿环访问历史 K/V。论文报告在大规模 TPU/A100 设置下，Ring Attention 使可训练上下文长度相对 prior memory-efficient Transformer 近似按设备数放大，例如 32 张 A100 上可把 7B 模型上下文扩到百万级 token。它的工程本质是用有序、可隐藏的点对点通信替代单设备显存扩容。

#### 🧪 练习题

```yaml
question: "Ring Attention 能保持 exact attention 的关键原因是什么？"
options:
  - "不同 K/V block 的 softmax 统计量可以用在线归一化重标定并合并，block 处理顺序不改变最终结果"
  - "它只让每个 token 关注固定窗口内的邻居 token"
  - "它把所有 K/V block 一次性复制到每个设备上"
  - "它删除了 Transformer 的 feedforward network"
answer: 0
explain: "Ring Attention 依赖 blockwise attention 的在线 softmax 合并律；K/V 沿环分批到达，本地 query 仍能累计到全局 exact attention 输出。"
```
