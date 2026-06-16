### SageAttention3: 微缩放 FP4 注意力机制

```yaml
id: sageattention3
name: SageAttention3
full_name: 微缩放FP4注意力机制 (SageAttention3 Microscaling FP4 Attention)
year: '2026'
org: NeurIPS
paper_url: https://proceedings.neurips.cc/paper_files/paper/2025/hash/4db397e0f760cc573c681e81a01a3dba-Abstract-Conference.html
category: efficiency
parent: —
motivation: 微缩放FP4注意力机制大幅提升推理能效
```

#### 📝 一句话总结

SageAttention3 提出面向 Blackwell FP4 Tensor Core 的微缩放 FP4 注意力，把注意力中的 \(QK^\top\) 与 \(PV\) 两个矩阵乘压到 NVFP4 路径，同时为训练探索 8-bit 前向/反向注意力，解决长序列注意力在推理和微调中的算力瓶颈。

#### 🎯 核心要点

- 首个面向推理的 FP4 attention 实现，在 RTX5090 上达到 1038 TOPS，论文报告相对 RTX5090 上最快 FlashAttention 约 5 倍 kernel 加速
- 使用 NVFP4 而非 MXFP4：E2M1 数据、1x16 微块量化、E4M3 FP8 scale，使 FP4 只有 15 个可表示值时仍能维持注意力精度
- 对 \(Q,K,V\) 使用微缩放 FP4 量化，并复用 SageAttention2 的 Smooth-K / Smooth-Q 处理以抑制离群值
- 对 attention map \(P=\mathrm{Softmax}(QK^\top)\) 引入两级量化：先逐 token 拉伸到更宽范围，再做 FP4 microscaling，缓解 E4M3 scale 动态范围利用不足
- 在 kernel 侧结合 FP4MM、online softmax、列置换、shuffle 复用和 producer-warp epilogue，减少 FP4 量化额外开销
- 额外提出 SageBwd 训练路径：前向和反向 attention 中 7 个矩阵乘的 6 个使用 INT8，最敏感的 \(\mathbf{dO}_i\mathbf{V}_j^\top\) 保持 FP16
- 实验覆盖 CogVideoX、HunyuanVideo、Mochi、Flux、Stable Diffusion 3.5、Qwen2.5、Llama3.2 等模型；推理质量基本无损，SageBwd 在指令微调中无损但预训练收敛较慢

#### 🔬 深入细节

##### 核心示意图

![SageAttention3 微缩放 FP4 attention 工作流](https://arxiv.org/html/2505.11594/x2.png)
*图：SageAttention3 Figure 2，来源为 arXiv HTML 论文图。流程展示先平滑 \(Q,K,V\)，再对 \(Q,K,V\) 和 attention map \(P\) 做 FP4 microscaling，并用 FP4MM 完成两次注意力矩阵乘。*

##### 算法伪代码

```python
# SageAttention3 microscaling FP4 attention 的简化流程
def msquant_fp4(x, group_shape=(1, 16), scale_dtype="e4m3", value_dtype="e2m1"):
    q_blocks, scales = [], []
    for block in split_into_blocks(x, group_shape):
        # 每个 1x16 微块共享一个 FP8 scale，值本身量化为 FP4 E2M1
        s = quantize_to_fp8_e4m3(max_abs(block) / fp4_e2m1_max())
        q = round_to_fp4_e2m1(block / s)
        q_blocks.append(pack_fp4(q))
        scales.append(s)
    return q_blocks, scales

def sageattention3_forward(Q, K, V, block_q, block_kv):
    K = smooth_k(K)  # 继承 SageAttention 系列的离群值平滑
    O = zeros_like_attention_output(Q, V)

    Q_tiles = tile_rows(Q, block_q)
    K_tiles = tile_rows(K, block_kv)
    V_tiles = tile_rows(V, block_kv)

    qQ_all, sQ_all = [], []
    for Qi in Q_tiles:
        Qi = smooth_q(Qi)
        qQi, sQi = msquant_fp4(Qi, group_shape=(1, 16))
        qQ_all.append(qQi)
        sQ_all.append(sQi)

    for i, (qQi, sQi) in enumerate(zip(qQ_all, sQ_all)):
        running_softmax = OnlineSoftmaxState()
        partial_O = 0

        for Kj, Vj in zip(K_tiles, V_tiles):
            qKj, sKj = msquant_fp4(permute_for_fp4mma(Kj), group_shape=(1, 16))
            qVj, sVj = msquant_fp4(Vj, group_shape=(1, 16))

            # 第一次 FP4MM: 近似 S_ij = Q_i K_j^T，并接 online softmax
            Sij = fp4mma(qQi, qKj.T, sQi, sKj, accumulate="fp32")
            Pij = running_softmax.update(Sij)

            # 两级量化: 先逐 token 扩展 P 的范围，再做 FP4 microscaling
            P_scaled, row_scale = per_token_quantize(Pij, target_range=(0, 448 * 6))
            qPij, sPij = msquant_fp4(P_scaled, group_shape=(1, 16))

            # 第二次 FP4MM: 近似 O_ij = P_ij V_j
            partial_O += fp4mma(qPij, qVj, sPij * row_scale, sVj, accumulate="fp32")

        O[i] = partial_O
    return O
```

##### FP4 attention 的基本机制

标准注意力由两次矩阵乘和一次 softmax 组成：

$$
S = QK^\top,\qquad P=\mathrm{Softmax}(S),\qquad O=PV.
$$

FlashAttention 的关键是分块计算并用 online softmax 避免把完整 \(S\) 与 \(P\) 写回显存；SageAttention3 沿用这个分块数据流，但把两次矩阵乘都改成 Blackwell 支持的 FP4 microscaling matrix multiply。对任意块 \(X\)，其微缩放量化可以理解为

$$
(\widehat X, s_X)=\mathrm{MSQuant}_{\mathrm{FP4}}(X),\qquad
X\approx s_X\widehat X,
$$

其中 \(\widehat X\) 是 packed FP4 E2M1 值，\(s_X\) 是 FP8 E4M3 scale。于是两次注意力乘法变成

$$
\widetilde S_{ij}
=\mathrm{FP4MM}(\widehat Q_i,\widehat K_j^\top,s_{Q_i},s_{K_j}),\qquad
\widetilde O_{ij}
=\mathrm{FP4MM}(\widehat P_{ij},\widehat V_j,s_{P_{ij}},s_{V_j}).
$$

这个设计的主要难点不是调用 FP4 指令本身，而是如何让 FP4 的 15 个有效取值覆盖注意力张量的局部分布。论文选择 NVFP4，是因为它使用 1x16 的微块 scale；离群值只污染一个小块，不会像 per-tensor 或过粗粒度 block 那样把整行/整块压到很低分辨率。论文中 CogVideoX 真实 \(Q,K,V\) 的 ablation 显示，NVFP4 的相似度、L1 和 RMSE 明显优于 MXFP4。

##### 为什么 \(P\) 需要两级量化

attention map \(P\) 的数值通常在 \([0,1]\)，而且 softmax 后大量值非常小。如果直接对 \(P\) 做 FP4 microscaling，每个微块的 scale 大多落在很窄的范围内；硬件又要求 scale 用 FP8 E4M3 表示，E4M3 的可表示范围没有被充分利用，scale 自身的舍入误差会被放大。SageAttention3 因此先做逐 token 量化，把每行 \(P\) 映射到更宽的 \([0,448\times 6]\) 区间，再对这个中间表示做 FP4 微缩放：

$$
P \xrightarrow{\text{per-token scale}} P^{(1)}
\xrightarrow{\mathrm{MSQuant}_{\mathrm{FP4}}}
(\widehat P, s_P).
$$

直觉上，第一层 scale 负责把 softmax 概率从“过小、过窄”的区间拉出来，第二层 microscaling 再把局部 1x16 块贴到 FP4 网格上。论文 Figure 3 的分布分析显示，两级量化能显著降低 \(P\) 的表示误差；Table 1 的 ablation 中，两级方案比直接量化有更高余弦相似度和更低 RMSE。

##### kernel 级优化为何必要

如果只把数据类型换成 FP4，attention kernel 不一定变快，因为量化、scale 加载、寄存器布局和线程间 shuffle 会吞掉 Tensor Core 收益。SageAttention3 的实现围绕 Blackwell FP4MM 做了三类工程优化。第一，FP4 MatMul 的 FP32 accumulator 布局与 operand A 寄存器布局不一致，论文选择置换 \(K\) 的列，使结果布局天然对齐，避免在主循环里做昂贵的 thread shuffle。

第二，\(\widetilde P\) 的 1x16 微块量化需要找连续 16 个元素的最大值，而这些元素跨多个线程。论文把这个 max reduction 与 online softmax 已经要做的行内最大值计算融合起来，复用部分 shuffle 和 max 操作，减少约一半冗余同步。第三，常规 warp-specialized kernel 常让 consumer warp 既做 MatMul 又做 store；SageAttention3 受寄存器压力限制，改成 producer warp 之间 ping-pong，一个加载下一块，一个把上一块结果写回，让 consumer warp 专注于把 MatMul 结果从寄存器搬到 shared memory。

> 💡 关键：SageAttention3 的速度来自“FP4 Tensor Core + FlashAttention 数据流 + scale/布局工程”共同作用。只做离线 FP4 量化而没有在线 softmax、两级 \(P\) scale 和 FP4MM 布局优化，很难复现论文中的 1000+ TOPS。

##### SageBwd: 低比特注意力用于训练的边界

论文的第二部分探索训练 attention。前向 attention 可以用 INT8 per-block 量化 \(Q,K,V\)，并对 \(P\) 做 per-token 量化；反向 attention 有五个核心矩阵乘：

$$
\mathbf{dP}_{ij}=\mathbf{dO}_i\mathbf{V}_j^\top,\qquad
\mathbf{dQ}_i \leftarrow \mathbf{dQ}_i+\mathbf{dS}_{ij}\mathbf{K}_j,
$$

$$
\mathbf{dK}_j \leftarrow \mathbf{dK}_j+\mathbf{dS}_{ij}^\top\mathbf{Q}_i,\qquad
\mathbf{dV}_j \leftarrow \mathbf{dV}_j+\mathbf{P}_{ij}^\top\mathbf{dO}_i.
$$

SageBwd 的经验结论是：\(\mathbf{dO}_i\mathbf{V}_j^\top\) 不能量化到 INT8，因为 \(\mathbf{dP}\) 会继续进入 softmax backward 形成 \(\mathbf{dS}\)，再沿序列长度递推影响 \(\mathbf{dQ}\) 和 \(\mathbf{dK}\)。这个位置的误差会累积，而其他矩阵乘的误差更局部。因此最终策略是在 7 个 attention 相关矩阵乘中加速 6 个，保留最敏感的 \(\mathbf{dO}_i\mathbf{V}_j^\top\) 为 FP16。实验显示这种 8-bit attention 在指令微调上能对齐 BF16，但预训练收敛速度变慢，说明低比特 training attention 可行但还不是通用替代品。

资料来源：NeurIPS 2025 论文页 https://proceedings.neurips.cc/paper_files/paper/2025/hash/4db397e0f760cc573c681e81a01a3dba-Abstract-Conference.html；arXiv HTML/PDF https://arxiv.org/abs/2505.11594；官方实现 https://github.com/thu-ml/SageAttention。

#### 🧪 练习题

```yaml
question: "SageAttention3 为什么要对 attention map P 使用两级量化，而不是直接做 FP4 microscaling？"
options:
  - "因为 P 的值集中在较小范围，直接量化会让 E4M3 scale 动态范围利用不足"
  - "因为 P 必须存成 INT4 才能进入 softmax"
  - "因为 Blackwell FP4 Tensor Core 不支持 V 矩阵输入"
  - "因为两级量化可以完全取消 online softmax"
answer: 0
explain: "P 来自 softmax，数值多在 [0,1] 且大量接近 0；先逐 token 扩展范围再做 microscaling，可以更好利用 FP8 E4M3 scale 并降低 FP4 表示误差。"
```
