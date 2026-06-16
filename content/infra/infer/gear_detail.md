### GEAR: GEAR压缩框架 (GEAR)

```yaml
id: gear
name: GEAR
full_name: GEAR压缩框架 (GEAR)
year: '2024'
org: Georgia Tech
paper_url: https://arxiv.org/abs/2403.05527
category: kv_cache
parent: —
motivation: 结合量化与误差补偿的高倍率压缩
```

#### 📝 一句话总结

GEAR 将 KV cache 压缩建模为“低比特量化主体 + 低秩残差 + 稀疏 outlier”的矩阵近似问题，解决单纯量化或 token dropping 在长序列生成中误差累积、输出偏移的问题。

#### 🎯 核心要点

- 把每层 Key/Value 张量 \(X\in\{K_t,V_t\}\) 近似为 \(\hat{D}+L+S\)，分别对应量化主体、低秩补偿和稀疏补偿
- 使用 outlier-reduced quantization：先抽出极大/极小值形成稀疏矩阵，再对剩余主体做 ultra-low-bit 非对称量化
- 对量化残差做低秩近似，利用 KV cache 在 token 维上的相似性捕获共享误差模式
- 稀疏矩阵保留少量个体 outlier，避免这些值拉大量化 scale 或造成生成 logits 的持续漂移
- 引入 streaming buffer，每隔 \(n_b\) 个新 token 批量重压缩，降低每步压缩开销
- 面向 4-bit KV cache 高倍率近无损压缩，论文报告最高 2.38x 吞吐提升与最高 2.29x 峰值显存降低

#### 🔬 深入细节

![GEAR 低秩补偿效果图](https://ar5iv.labs.arxiv.org/html/2403.05527/assets/x7.png)
*图：论文 Figure 2(d)，展示对残差加入低秩近似后，GEAR 相比单一压缩技术能显著降低 KV cache 近似误差。*

```python
# GEAR KV cache compression 伪代码
def filter_outliers(X, sparsity):
    # 保存 top s/2% 与 bottom s/2% 的极端值，其他位置为 0
    mask = top_bottom_mask(X, ratio=sparsity)
    return X * mask

def gear_compress(X, bits=4, rank=5, sparsity=0.02):
    S = filter_outliers(X, sparsity)
    D = X - S
    qD, scale, zero = asymmetric_quantize(D, bits=bits)
    D_hat = dequantize(qD, scale, zero)

    R = X - D_hat - S
    A, B = randomized_power_iteration(R, rank=rank)
    L = A @ B.T
    return qD, scale, zero, A, B, S

def gear_decode(qD, scale, zero, A, B, S):
    return dequantize(qD, scale, zero) + A @ B.T + S

def streaming_generation(initial_kv, buffer_size):
    compressed = compress_all_layers(initial_kv)
    buffer = []
    while not finished():
        token, new_kv = generate_one_token(compressed, buffer)
        buffer.append(new_kv)
        if len(buffer) == buffer_size:
            compressed = recompress(compressed, buffer)
            buffer.clear()
```

GEAR 的问题设定比普通“压到几 bit”更明确：希望用压缩表示 \(\hat{X}\) 近似每层的 KV cache 张量 \(X\)，并让这个误差在自回归生成中不要累积成 logits 偏移。论文把目标写成 Frobenius 范数近似：

$$
\min_{\hat{D},L,S}\left\|X-\hat{D}-L-S\right\|_{F}
$$

其中 \(\hat{D}\) 是量化后的主干矩阵，\(L\) 是低秩矩阵，\(S\) 是稀疏矩阵。这个拆分的直觉是：KV cache 的多数元素幅度相近，适合低比特量化；量化后剩下的误差并非完全随机，常有 token 维共享结构，适合低秩近似；少数极端元素则不适合被量化主体吸收，适合单独保存。

稀疏补偿先处理 outlier。给定 sparsity \(s\)，论文的过滤器可以理解为：

$$
\operatorname{Filter}_{s}(X)_{ij}=
\begin{cases}
X_{ij}, & X_{ij}\text{ 属于 top 或 bottom }s/2\%\text{ 极值}\\
0, & \text{otherwise}
\end{cases}
$$

这一步的作用不是“再多存一点 FP16”那么简单，而是避免极端值扩大主体量化的动态范围。若不抽出 outlier，4-bit 的有限 codebook 会被少数值占用，主体中大量普通元素的相对误差变大；抽出 \(S\) 后，\(\hat{D}\) 可以更专注地表示多数相近幅度元素。

低秩补偿处理的是结构化残差。量化和稀疏过滤后，残差 \(R=X-\hat{D}-S\) 仍会影响 \(QK^\top\) 和 \(AV\)。GEAR 用

$$
L=AB^\top,\quad A\in\mathbb{R}^{n\times r},\quad B\in\mathbb{R}^{d\times r},\quad r\ll n,d
$$

来近似这部分误差。论文观察到残差谱在前几个奇异值处下降较快，因此很小的 rank 就能捕获主要共享模式；示例配置中 \(n=2048,d=4096,r=5\) 已能达到近无损的高倍率压缩。实现上使用 power iteration 近似 top singular vectors，避免完整 SVD 的高延迟。

推理流程上，GEAR 并不要求改变模型结构。初始 prefill 产生的 KV cache 先被压缩为 \((qD,scale,zero,A,B,S)\)；attention 需要读取某层历史 KV 时恢复 \(\hat{X}=\hat{D}+AB^\top+S\)，再进入标准注意力计算。为了避免每生成一个 token 都重压缩整段历史，GEAR 使用小 buffer \(\mathcal{B}\) 暂存最近 \(n_b\) 个新 KV，到达阈值后把 buffer 与既有 cache 合并并重压缩。这样牺牲很小的额外内存，换取更低在线开销。

与 KIVI 这类按 Key/Value 统计轴选择量化粒度的方法相比，GEAR 的重点在误差分解与补偿。它可以叠加在不同量化方案上，把“量化主体还原不准”的部分再拆给低秩和稀疏项；与 H2O 等 token eviction 相比，GEAR 不删除上下文 token，因此更适合需要完整长上下文证据链的 CoT、数学推理、多轮问答场景。

> 💡 关键：GEAR 的核心不是某一种单独压缩技术，而是承认 KV cache 误差有三类来源，并让量化、低秩、稀疏表示各处理最擅长的一类误差。

#### 🧪 练习题

```yaml
question: "GEAR 中低秩矩阵 L 的主要作用是什么？"
options:
  - "近似量化和稀疏过滤后仍然存在的结构化残差"
  - "删除低注意力分数的历史 token"
  - "把模型权重从 FP16 训练成 INT4"
  - "替换 tokenizer 以减少输入长度"
answer: 0
explain: "GEAR 先用量化主体和稀疏矩阵处理多数元素与 outlier，再用低秩项捕获残差中共享的 token 维结构。"
```
