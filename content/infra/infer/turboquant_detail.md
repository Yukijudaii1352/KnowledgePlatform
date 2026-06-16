### TurboQuant: 涡轮量化 (TurboQuant)

```yaml
id: turboquant
name: TurboQuant
full_name: 涡轮量化 (TurboQuant)
year: '2026'
org: Google Research
paper_url: https://arxiv.org/abs/2501.06425
category: kv_cache
parent: kivi
motivation: PolarQuant+QJL实现3-bit KV压缩
```

#### 📝 一句话总结

TurboQuant 提出训练无关、在线可用的向量量化框架，先用随机旋转后的近最优标量量化压缩主信号，再用 1-bit QJL 对残差做无偏内积校正，从而把 KV cache 压到约 3/3.5 bit 仍保持注意力内积精度。

> 资料说明：上方 YAML 按任务输入保留；该 `paper_url` 实际指向 TPA。本文方法细节依据 Google Research 官方 TurboQuant 博客和实际论文 `https://arxiv.org/abs/2504.19874`。

#### 🎯 核心要点

- 两阶段压缩：\(Q_{\text{mse}}\) 负责低 MSE 重构，\(Q_{\text{qjl}}\) 负责 residual 的 1-bit 无偏内积估计
- 随机旋转预处理：把任意输入向量映射到球面上坐标近似 Beta/高斯分布，允许逐坐标使用预计算 Lloyd-Max 标量码本
- Inner-product TurboQuant：用 \(b-1\) bit 主量化加 1 bit QJL，在总 bitwidth 为 \(b\) 时直接优化 \(q^\top k\) 这类注意力核心量
- 在线/数据无关：无需 k-means 训练、校准集或离线索引构建，适合生成过程中不断追加的 KV cache
- 理论保证：MSE 与内积失真接近 Shannon 下界，论文给出小常数因子的近最优率
- 系统目标：在 LongBench、Needle-In-A-Haystack 与向量检索中验证低比特 KV/embedding 压缩，Google 官方资料报告 3-bit KV、至少 6x cache 缩减和 H100 attention logits 最高约 8x 加速

#### 🔬 深入细节

![TurboQuant LongBench 压缩效果](https://storage.googleapis.com/gweb-research2023-media/images/Quantization-2.width-1250.png)
*图：Google Research 官方博客中的 LongBench 汇总图，展示 TurboQuant/PolarQuant/KIVI 等方法在不同 bitwidth 下的长上下文效果。*

```python
# Inner-product TurboQuant: b-bit KV cache compression
def setup(d, b):
    Pi = random_orthogonal_matrix(d)              # shared random rotation
    codebook = lloyd_max_codebook(beta_dist(d), bits=b - 1)
    S = gaussian_random_matrix(d, d)              # QJL projection
    return Pi, codebook, S

def quantize_key(x, Pi, codebook, S):
    z = Pi @ normalize(x)
    idx = nearest_centroid_indices(z, codebook)   # (b-1)-bit per coordinate
    x_mse = denormalize(Pi.T @ centroids(idx), norm(x))
    r = x - x_mse
    qjl = sign(S @ r)                             # 1-bit residual code
    return idx, qjl, norm(x), norm(r)

def estimate_attention_logit(q, idx, qjl, x_norm, r_norm, Pi, codebook, S):
    x_mse = x_norm * (Pi.T @ centroids(idx, codebook))
    r_hat = qjl_dequantize(qjl, S, scale=r_norm)
    return dot(q, x_mse) + dot(q, r_hat)
```

TurboQuant 的出发点不是“每个 KV 元素重构得像不像”，而是“query 与 key/value 向量参与计算时，几何关系是否还准”。论文把量化器写作 \(Q:\mathbb{R}^d\rightarrow\{0,1\}^{bd}\)，并同时关心两类失真：重构误差 \(D_{\text{mse}}=\mathbb{E}\|x-\tilde{x}\|_2^2\)，以及内积误差

$$
D_{\text{prod}}=\mathbb{E}_{\tilde{x}}\left[\left|\langle y,x\rangle-\langle y,\tilde{x}\rangle\right|^2\right].
$$

对 KV cache 来说，后者更关键，因为注意力 logits 本质上是 \(QK^\top/\sqrt{d}\)。一个 MSE 很低但有系统性内积偏差的量化器，可能把 softmax 排序、needle 检索和长上下文依赖一起扰乱。

第一阶段 \(Q_{\text{mse}}\) 先乘随机正交矩阵 \(\Pi\)，把最坏输入向量变成球面上“看起来更均匀”的坐标。球面随机点的单坐标服从缩放/平移后的 Beta 分布，高维下接近高斯；坐标间也近似独立。因此 TurboQuant 不需要为每个数据集训练大码本，只要预先为该分布解一维 Lloyd-Max/连续 k-means：

$$
\min_{c_1,\ldots,c_{2^b}}\mathbb{E}_{X}\left[\min_i (X-c_i)^2\right].
$$

量化时每个旋转坐标只存最近 centroid 的索引，反量化时查表再乘 \(\Pi^\top\)。论文给出的细粒度小 bitwidth 结果显示，\(b=1,2,3,4\) 时 MSE 约为 \(0.36,0.117,0.03,0.009\)，并证明大 bitwidth 下接近信息论下界。

第二阶段是 TurboQuant 与普通旋转量化的关键分界：MSE 最优量化并不保证内积无偏。例如 1-bit 下，重构会把所有坐标推向固定幅度的符号向量，\(\langle y,\tilde{x}\rangle\) 往往带乘性偏差。TurboQuant 因此把总预算拆成 \(b-1\) bit 主码和 1 bit 残差码：

$$
r=x-Q_{\text{mse}}^{-1}(Q_{\text{mse}}(x)),\qquad
Q_{\text{prod}}(x)=\left(Q_{\text{mse}}(x),\operatorname{sign}(Sr)\right).
$$

其中 \(S\) 是高斯随机投影矩阵，QJL 的 1-bit 符号码在估计内积时满足

$$
\mathbb{E}\left[\langle y,Q_{\text{qjl}}^{-1}(Q_{\text{qjl}}(r))\rangle\right]=\langle y,r\rangle.
$$

所以最终估计量可以写成 \(\langle y,\tilde{x}_{\text{mse}}\rangle+\langle y,\tilde{r}_{\text{qjl}}\rangle\)：主量化承担绝大多数能量，QJL 用极少 bit 消除残差对内积的系统性偏差。论文给出 \(D_{\text{prod}}\le \frac{\sqrt{3}\pi^2\|y\|_2^2}{d4^b}\) 的界，并列出 \(b=1,2,3,4\) 时约为 \(1.57/d,0.56/d,0.18/d,0.047/d\)。

在推理路径里，TurboQuant 适合 KV cache 的原因是“写入时在线、读取时内积友好”。每生成一个 token，就对新的 K/V 向量执行旋转、查码本和 QJL residual 编码；后续 decode 计算 attention logits 时，可以直接用主码重构项加 residual 校正项近似 \(q^\top k\)。与 KIVI 这类 per-channel/per-token 标量量化相比，它更少依赖动态 scale/zero-point 元数据，也不把目标停留在逐元素误差上。

与 PQ/OPQ 等传统向量检索量化相比，TurboQuant 的优势来自数据无关与 GPU 友好。PQ 需要用数据集训练码本，码本本身也要存储，在线追加 KV 时不自然；TurboQuant 的旋转矩阵和标量码本可复用，写入开销主要是矩阵/向量变换和查表。Google 官方博客还说明 PolarQuant 用极坐标/角度视角去掉传统归一化常数的额外开销，TurboQuant 则把这种低开销主压缩与 QJL residual 组合起来，面向长上下文 KV 与高维向量检索两个场景。

#### 🧪 练习题

```yaml
question: "TurboQuant 为什么要在 MSE 主量化之后再加入 1-bit QJL residual？"
options:
  - "因为 MSE 最优量化可能带来内积估计偏差，QJL 用 1 bit 残差码提供无偏校正"
  - "因为 QJL 可以替代 softmax 并删除 attention 计算"
  - "因为随机旋转只能用于 value cache，不能用于 key cache"
  - "因为 PQ 训练码本必须和每个 prompt 一起保存"
answer: 0
explain: "注意力依赖 query-key 内积；TurboQuant 用主码降低残差范数，再用 QJL 的无偏内积估计修正 residual。"
```
