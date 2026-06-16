### Striped Attention: 条纹注意力 (Striped Attention)

```yaml
id: striped_attn
name: Striped Attention
full_name: 条纹注意力 (Striped Attention)
year: '2023'
org: UC Berkeley
paper_url: https://arxiv.org/abs/2311.09431
category: attention
parent: ring_attn
motivation: 交错分配标记解决因果掩码负载不均
```

#### 📝 一句话总结

Striped Attention 把 Ring Attention 的连续序列分片改成按设备数取模的条纹分片，解决 causal mask 在分布式 exact attention 中造成的每轮设备负载不均问题。

#### 🎯 核心要点

- 识别 Ring Attention 在 causal self-attention 下的三角掩码负载不均：每轮延迟由最慢设备决定，连续分片会让部分设备完全未掩码、部分设备大量被掩码。
- 采用 residue modulo device count 的条纹分片：第 \(p\) 台设备持有位置 \(p, p+N, p+2N,\ldots\)，而不是一段连续 token。
- 保持 Ring Attention 的通信骨架：本地 \(Q\) 不动，\(K,V\) 仍按环形拓扑逐轮传递，只改变序列物理布局和 causal mask 解释。
- 算法仍是 exact attention：通过置换等变性保证只改变计算布局，不改变 \(\operatorname{Softmax}(QK^\top+C)V\) 的数学结果。
- 配合 tile 级 work skipping：完全被 causal mask 屏蔽的 query-key tile 可跳过；条纹分片让每台设备每轮都有近似相同的可跳过比例。
- 实验在 8 张 A100 80GB 上的 256k 序列训练达到最高 \(1.45\times\) 端到端吞吐提升，在 16 个 TPUv4 chip、786k 序列上达到 \(1.65\times\) 加速。

#### 🔬 深入细节

![Striped Attention 负载均衡示意图](https://ar5iv.labs.arxiv.org/html/2311.09431/assets/x3.png)
*图：论文 Figure 3 的 ar5iv 渲染图。每个设备持有跨全序列均匀分布的 token 后，各轮 causal mask 下的可跳过工作量更均衡。*

```python
# Striped Attention over N devices.
# Each device owns a residue class of the original token positions.
N = num_devices
owner = lambda token_id: token_id % N
local_positions = {
    p: [t for t in range(seq_len) if owner(t) == p]
    for p in range(N)
}

for layer in transformer_layers:
    Q_p, K_p, V_p = project_qkv(local_hidden[p])
    kv_block = (K_p, V_p, local_positions[p])

    for ring_step in range(N):
        recv_K, recv_V, recv_pos = ring_recv_then_send(kv_block)
        for q_tile in tiles(Q_p, local_positions[p]):
            for kv_tile in tiles(recv_K, recv_V, recv_pos):
                # Causal mask uses original token positions, not local layout.
                if all(k_pos > q_pos for q_pos in q_tile.pos for k_pos in kv_tile.pos):
                    continue  # the whole tile is masked out
                online_softmax_update(q_tile, kv_tile, causal_by_original_pos=True)
        kv_block = (recv_K, recv_V, recv_pos)
```

标准 causal attention 可以写成：

$$
O=\operatorname{Softmax}(QK^\top + C)V,\quad
C_{ij}=\begin{cases}
0,&j\le i\\
-\infty,&j>i
\end{cases}
$$

Ring Attention 的问题不在数学公式，而在这个三角 \(C\) 被连续切块后造成的并行时间。假设 \(N\) 台设备各持有长度为 \(c\) 的连续块，在某一轮里，靠后的 query 块可能要和完整 key 块计算 \(c^2\) 个交互，而靠前 query 块面对未来 key 块时几乎全被 mask。因为环上每轮都要等所有设备完成，哪怕有些设备可以跳过，仍会被那个 \(c^2\) 工作量的设备拖住，导致 causal attention 理论上少一半 FLOPs 的优势无法转化成每轮延迟下降。

Striped Attention 的核心是一次性置换分片：第 \(p\) 台设备持有所有满足 \(t\bmod N=p\) 的 token。这样每个本地块同时包含早期、中期和后期 token；当 \(K,V\) 从其他设备传来时，本地 query 与远端 key 的原始位置关系也会均匀混合。论文给出的条纹分片工作量近似为：

$$
\mathrm{Work}(i,j)=
\begin{cases}
\frac{c(c+1)}{2},&i\ge j\\
\frac{c(c-1)}{2},&i<j
\end{cases}
$$

其中 \(c\) 是每设备持有的 token 数。相比 Ring Attention 每轮至少有一台设备承担 \(c^2\) 交互，Striped Attention 中设备间只差一个对角项；当 \(c\) 足够大时，对角项占比线性下降，负载不均可以忽略，核心 attention 的理论最大加速趋近 \(2\times\)。

算法保持 exact 的原因是注意力对同步置换 \(Q,K,V\) 具有等变性。若 \(P\) 是把连续序列改成条纹布局的置换矩阵，则：

$$
\operatorname{Attn}(PQ,PK,PV,PCP^\top)
=P\operatorname{Attn}(Q,K,V,C)
$$

也就是说，内部按条纹顺序计算得到的是原始输出的同一个置换。只要后续层也沿用同一布局，或者在需要时做逆置换，就不会改变模型函数；真正变化的是分布式运行时看到的 tile 排布和 mask 判定。

实现上，论文的 JAX 版本仍使用 Ring Attention 的环通信：\(Q\) 留在本设备，\(K,V\) 每轮传给相邻设备，同时在 tile 粒度检查是否整块被 \(C\) 屏蔽。A100 实验中使用 \(2048\times4096\) 的 query-key tile，TPU 实验中使用 \(2048\times2048\) tile。tile 粒度越粗，越难完全吃到理想的 \(50\%\) causal work skipping；论文也指出，在块较小时只可能跳过约 \(25\%\) 工作，而更长序列让每设备块更大，条纹布局的优势更接近理论上限。

与 Ring Attention 相比，Striped Attention 不是新的近似注意力，也不是降低 KV cache 的方法。它解决的是 sequence parallelism 的调度问题：Ring Attention 先解决“单卡放不下长序列”的显存问题，Striped Attention 进一步解决“因果掩码让多卡算得不均衡”的吞吐问题。这也是它能作为 Ring Attention 的小改动落地的原因：一次性改变分片布局和 mask 解释，不需要改变 Transformer 层的数学定义。

#### 🧪 练习题

```yaml
question: "Striped Attention 为什么能在 causal Ring Attention 上提速？"
options:
  - "它把每台设备的 token 分布到整个序列，使每轮 causal mask 下的可跳过工作更均衡"
  - "它把 softmax 改成线性注意力，因此不再计算精确 attention"
  - "它复制所有 KV 到每台设备，避免环形通信"
  - "它删除了 causal mask，让每个 token 可以看见未来 token"
answer: 0
explain: "Striped Attention 仍计算 exact causal attention，只是用取模条纹分片平衡设备负载，让 tile skipping 在每轮都能发挥作用。"
```
