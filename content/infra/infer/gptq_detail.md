### GPTQ: GPT量化 (GPTQ)

```yaml
id: gptq
name: GPTQ
full_name: GPT量化 (GPTQ)
year: '2022'
org: IST Austria
paper_url: https://arxiv.org/abs/2210.17323
category: quantize
parent: —
motivation: 高效二阶权重补偿实现4-bit无损量化
```

#### 📝 一句话总结

GPTQ 提出了一种面向 GPT/OPT/BLOOM 级大模型的 one-shot 权重量化方法，把低比特量化写成逐层二阶重建问题，并在每列权重量化后用近似 Hessian 逆补偿剩余权重误差。它解决了简单 round-to-nearest 在 3/4-bit 下精度崩坏、而传统二阶 PTQ 又难以扩展到千亿参数模型的问题。

#### 🎯 核心要点

- 逐层最小化量化前后线性层输出误差，而不是只最小化权重本身的舍入误差
- 用少量校准激活构造二阶近似 Hessian，论文实现中使用 128 个 C4 的 2048-token 片段
- 继承 OBQ/OBS 的误差补偿思想：量化一个权重或列后更新未量化权重以抵消输出偏移
- 将 OBQ 的逐行独立顺序改成所有行共享列顺序，使 \(H^{-1}\) 的消元更新只需按列执行
- 使用 lazy batch-update 把列级更新攒成 block，提高 GPU 计算和内存访问效率
- 使用 dampening 与 Cholesky reformulation 稳定大模型上的 Hessian 逆信息
- 目标是 weight-only 3/4-bit PTQ；论文不量化激活，推理加速主要来自低比特权重加载和专用 kernel

#### 🔬 深入细节

![GPTQ block-wise quantization procedure](https://ar5iv.labs.arxiv.org/html/2210.17323/assets/x3.png)
*图：GPTQ 论文 Figure 2，经 ar5iv 渲染；白色列表示当前正在量化的列，蓝色区域表示 block 内 lazy update 和 block 结束后的全局剩余权重更新。*

```python
# GPTQ: layer-wise weight-only quantization, simplified from Algorithm 1
def gptq_quantize_layer(W, X, bits, block_size=128, damping=0.01):
    # X: calibration inputs of this linear layer
    H = 2 * X @ X.T
    H = H + damping * mean(diag(H)) * eye(H.shape[0])
    Hinv_info = cholesky(inv(H)).T

    Q = zeros_like(W)
    for start in range(0, W.shape[1], block_size):
        stop = min(start + block_size, W.shape[1])
        E = zeros(W.shape[0], stop - start)

        for j in range(start, stop):
            q = quantize_to_grid(W[:, j], bits)
            Q[:, j] = q
            err = (W[:, j] - q) / Hinv_info[j, j]
            E[:, j - start] = err

            # 只更新当前 block 内还会影响后续舍入决策的列
            W[:, j:stop] -= err[:, None] * Hinv_info[j, j:stop]

        # block 处理完后，再批量更新右侧所有未量化列
        W[:, stop:] -= E @ Hinv_info[start:stop, stop:]

    return pack_low_bit(Q)
```

GPTQ 的基本目标是让每个线性层在校准输入 \(X\) 上保持输出不变。若原始权重为 \(W\)，量化后权重为 \(\hat W\)，逐层重建目标可以写成：

$$
\hat W = \arg\min_{\tilde W \in \mathcal{Q}} \lVert WX - \tilde W X \rVert_2^2
$$

这里 \(\mathcal{Q}\) 是低比特量化网格。直接 RTN 只关心 \(\lVert W-\hat W\rVert\)，但 GPTQ 关心的是权重误差乘上真实激活后的输出误差。因此，同样大小的权重误差在高能量输入通道上更重要，这正是 Hessian 信息有用的原因。

OBQ 的二阶形式把单行权重的局部目标写成一个二次问题，Hessian 近似为 \(H=2XX^\top\)。当第 \(j\) 列被量化到 \(q_j=\operatorname{quant}(W_{:,j})\) 后，GPTQ 用下式计算需要传播到右侧未量化列的误差：

$$
E_{:,j}=\frac{W_{:,j}-q_j}{[H^{-1}]_{jj}}, \qquad
W_{:,j:} \leftarrow W_{:,j:}-E_{:,j}[H^{-1}]_{j,j:}
$$

直觉上，被量化列造成的输出偏差并不完全由它自己承担，右侧未冻结的权重还可以被微调。\(H^{-1}\) 的第 \(j\) 行告诉算法：为了抵消当前列的舍入误差，哪些后续通道最适合承担补偿。

GPTQ 相比原始 OBQ 的关键扩展在于“共享列顺序”。OBQ 会为每一行独立选择下一个要量化的权重，导致每行都维护不同的未量化集合和 Hessian 逆，复杂度难以扩展。GPTQ 强制所有行按同一列顺序处理，这让 \(H^{-1}\) 只依赖输入激活和列集合，不依赖具体权重行，从而把大量重复的逆矩阵更新合并成一次列级更新。

lazy batch-update 解决的是 GPU 上的工程瓶颈。若每处理一列都更新整个右侧大矩阵，操作会变成大量小粒度内存读写，算力利用率很差。GPTQ 先在一个 block 内更新会影响后续舍入的局部列，等 block 结束后再用矩阵乘法形式批量更新右侧全部列，保持相同算法含义但显著提高吞吐。

数值稳定性是另一个核心细节。论文指出反复消元会让大模型层中的 \(H^{-1}\) 变得不定，导致补偿方向错误；因此 GPTQ 对 \(H\) 加入约为平均对角值 1% 的 dampening，并用 Cholesky 形式预计算后续所需的逆 Hessian 行信息。这个改动不是装饰性的，它是让算法能稳定跑在 OPT-175B/BLOOM-176B 这类模型上的前提。

> 💡 关键：GPTQ 不是通过训练恢复精度，而是在量化每一层时“即时重分配误差”。它的优势来自二阶补偿，代价是需要校准样本、Hessian 近似和比 RTN 更重的离线量化计算。

#### 🧪 练习题

```yaml
question: "GPTQ 能把 OBQ 扩展到千亿参数模型的关键原因是什么？"
options:
  - "对每个权重独立训练一个缩放器"
  - "让所有行按相同列顺序量化，从而共享 Hessian 逆更新并使用 block lazy update"
  - "完全跳过校准数据，只根据权重均值量化"
  - "把激活和权重都量化到 INT8"
answer: 1
explain: "共享列顺序让 Hessian 逆信息可以跨行复用，lazy block 更新又提高 GPU 吞吐；二者共同把二阶量化从小模型推到 GPT 级模型。"
```
