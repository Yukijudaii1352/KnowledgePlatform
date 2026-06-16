### KIVI: KIVI量化 (KIVI)

```yaml
id: kivi
name: KIVI
full_name: KIVI量化 (KIVI)
year: '2024'
org: Rice Univ
paper_url: https://arxiv.org/abs/2402.02750
category: kv_cache
parent: —
motivation: 无需微调的非对称2-bit缓存量化
```

#### 📝 一句话总结

KIVI 提出一种无需微调的非对称 2-bit KV cache 量化方法，用 Key 的 per-channel 量化和 Value 的 per-token 量化分别匹配二者不同的误差模式，从而在长上下文和大 batch 推理中显著降低显存与带宽压力。

#### 🎯 核心要点

- 对 KV cache 分布做系统分析：Key 存在固定通道 outlier，Value 没有稳定通道 outlier 但对 token 级误差隔离更敏感
- Key cache 使用 per-channel group-wise 2-bit 非对称量化，避免异常通道污染普通通道的 scale
- Value cache 使用 per-token group-wise 2-bit 非对称量化，避免注意力加权求和时少数重要 token 被其他 token 的量化范围拖累
- 将 cache 划分为已量化 grouped cache 与 FP16 residual cache，兼容自回归解码中逐 token 到达的流式写入
- 通过 CUDA/Triton 融合反量化与矩阵乘，减少 2-bit cache 在 attention 读取阶段的额外开销
- 在 Llama/Llama-2、Falcon、Mistral 上验证，可在几乎不损失质量的情况下压缩 KV cache，并提升可承载 batch size 与吞吐

#### 🔬 深入细节

![KIVI 算法总览图](https://ar5iv.labs.arxiv.org/html/2402.02750/assets/x2.png)
*图：论文 Figure 9，KIVI 将历史 Key 分组量化、保留最近 residual，并在 Q_MatMul 中融合反量化与矩阵乘。*

```python
# KIVI prefill + decoding 伪代码
def asym_quantize(x, bits, axis, group_size):
    qmax = 2 ** bits - 1
    xmin, xmax = reduce_minmax(x, axis=axis, group_size=group_size)
    scale = (xmax - xmin) / qmax
    zero = round(-xmin / scale)
    q = clamp(round(x / scale) + zero, 0, qmax)
    return q, scale, zero

def kivi_update(K_cache, V_cache, new_k, new_v, G=32, R=128):
    # 新 token 先进入全精度 residual，避免每步都重排 per-channel Key
    K_cache.residual.append(new_k)
    V_cache.residual.append(new_v)

    if len(K_cache.residual) >= R:
        qk, sk, zk = asym_quantize(K_cache.residual, bits=2,
                                   axis="channel", group_size=G)
        K_cache.grouped.append((qk, sk, zk))
        K_cache.residual.clear()

    if len(V_cache.residual) > R:
        old_v = V_cache.residual.pop_left()
        qv, sv, zv = asym_quantize(old_v, bits=2,
                                   axis="token", group_size=G)
        V_cache.grouped.append((qv, sv, zv))

def kivi_attention(q, K_cache, V_cache):
    k_old = q_matmul_dequant(q, K_cache.grouped)  # fused dequant + matmul
    k_new = q @ K_cache.residual.T
    attn = softmax(concat(k_old, k_new) / sqrt(q.shape[-1]))
    v_old = dequantize(V_cache.grouped)
    v = concat(v_old, V_cache.residual)
    return attn @ v
```

KIVI 的基本出发点是：推理阶段的 KV cache 会随 batch size、prompt length 和生成长度线性增长，而每生成一个 token 都要从 HBM 读取历史 KV，因此瓶颈不只是容量，还有显存带宽。普通量化会把 KV 当作同质张量处理，但论文的实测发现 Key 和 Value 的统计结构并不对称：Key 的大幅值常集中在少数固定 channel，Value 则更像 token 间分布不断变化的激活。

非对称量化本身可以写成：

$$
\hat{x}=s\left(\operatorname{clamp}\left(\operatorname{round}(x/s)+z,0,2^b-1\right)-z\right)
$$

其中 \(b=2\)，\(s\) 是 scale，\(z\) 是 zero-point。KIVI 的关键不是公式复杂，而是 scale/zero-point 的统计轴选择：Key 沿 channel 聚合，使每个异常 channel 有自己的范围；Value 沿 token 聚合，使每个 token 的误差留在本 token 内。若 Key 也 per-token，少数异常 channel 会放大整个 token 的量化范围，导致 attention logits \(QK^\top\) 中普通 channel 的有效精度被浪费；若 Value per-channel，attention 输出里的少数高权重 token 会和其他 token 共享量化范围，误差更容易进入最终输出。

注意力中的 Value 使用方式解释了为什么 Value 必须更重视 token 级误差隔离：

$$
O=\operatorname{softmax}\left(\frac{QK^\top}{\sqrt{d}}\right)V
$$

由于注意力分布通常很稀疏，输出往往由少数重要 token 的 Value 主导。per-token 量化把误差限制在单个 token 内，使不重要 token 的量化范围不会影响重要 token；per-channel 量化虽然可能降低元素级重构误差，却会在跨 token 的加权求和里制造更大的输出误差。论文表格中也体现了这一点：Value 的 per-channel 在最终 attention output 上明显更差。

流式解码是另一个核心难点。Value 的 per-token 量化天然适合逐 token 追加，新 token 量化后可直接沿 token 维拼到旧 cache；Key 的 per-channel 量化需要跨多个 token 统计 scale，所以不能每来一个 token 就单独做完整 per-channel 分组。KIVI 因此把 cache 拆成 \(X_g\) 和 \(X_r\)：

$$
X_K=[X_{K_g};X_{K_r}],\quad X_{K_g}=X_K[:l-r],\quad X_{K_r}=X_K[l-r:]
$$

其中 \(X_{K_g}\) 可被 \(G\) 个 token 一组地量化，\(X_{K_r}\) 是最近的 FP16 residual。论文实验中常用 \(G=32\)、\(R=128\)，这让大部分长历史以 2-bit 保存，同时保留一个高精度局部窗口。这个窗口对 GSM8K 等多步推理任务尤其重要，因为最近 token 往往承载局部推理链和格式约束。

系统实现上，KIVI 不要求重训模型，也不改变 attention 的数学语义；它改变的是 cache 的存储和读取路径。prefill 阶段仍把精确 K/V 传给下一层，只是在内存中保留量化版本；decode 阶段通过 tiled matrix multiplication 在 tile 内完成反量化并计算 \(QK^\top\)，避免先把整个历史 cache 展开成 FP16。这样 KIVI 的收益来自两个方向：cache 容量下降带来更长上下文或更大 batch，cache 读取字节数下降带来更高吞吐。

> 💡 关键：KIVI 不是“把 KV 都压到 2-bit”这么简单，而是把 Key 的 outlier 轴、Value 的注意力混合轴、以及自回归流式写入三个约束同时纳入量化粒度设计。

#### 🧪 练习题

```yaml
question: "KIVI 为什么选择 Key per-channel、Value per-token 的非对称量化组合？"
options:
  - "Key 的异常值更稳定地出现在少数通道，而 Value 的误差需要按 token 隔离以保护注意力输出"
  - "Key 不参与注意力计算，Value 只在训练阶段使用"
  - "per-channel 量化总是比 per-token 量化更省显存"
  - "这种组合可以删除位置编码并减少模型层数"
answer: 0
explain: "Key 的通道级 outlier 会污染 per-token scale；Value 在 attention 加权求和中由少数 token 主导，因此 per-token 误差隔离更稳。"
```
