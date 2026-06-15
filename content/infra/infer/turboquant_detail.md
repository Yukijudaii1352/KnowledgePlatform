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

TurboQuant 用 PolarQuant 和 QJL 残差校正实现训练无关的 3-bit KV 压缩，目标不是最小化逐元素误差，而是保持注意力所需的内积精度。

#### 🎯 核心要点

- PolarQuant 将向量变换到极坐标式表示，减少常规量化的尺度开销
- QJL 用 1-bit 随机投影表示残差，校正内积偏差
- 面向 KV cache 和向量检索中的 inner-product preservation
- 无需微调或校准训练，适合生产推理插拔
- 任务元信息强调 3-bit KV 压缩和 H100 上注意力加速

#### 🔬 深入细节

![TurboQuant 核心示意图](https://arxiv.org/html/2501.06425/x1.png)
*图：TurboQuant 论文/官方资料中的压缩框架图，展示 PolarQuant 与残差校正组合。*

```python
# TurboQuant inner-product-preserving compression
for vector in KV_cache:
    code_polar = polar_quantize(vector, bits=b-1)
    residual = vector - dequantize(code_polar)
    code_qjl = sign(random_projection(residual))  # 1 bit residual code
    store(code_polar, code_qjl)

score_hat = inner_product(query, dequant_polar(code_polar)) + qjl_correction(query, code_qjl)
```

##### 动机与背景

KV cache 量化真正影响的是 attention score，即 query 与 key 的内积。逐元素 MSE 很低并不必然保证内积无偏；同时常规量化还要保存 scale/zero point，长上下文下这些元数据也会累积。

##### 核心机制

PolarQuant 用更适合方向/角度分布的表示减少尺度元数据；QJL 对量化残差做随机投影并只保留符号，用很小开销修正内积估计偏差。核心目标从 \(\|x-\hat{x}\|\) 转向 \(q^Tx\) 的保真。

##### 训练/推理流程

压缩时先对 KV 向量做 PolarQuant，再对残差生成 1-bit QJL 码。解码或 attention kernel 中，内积由主量化值贡献和残差校正共同组成。该设计可用于 KV cache，也可用于大规模向量检索。

##### 与传统方法的区别

KIVI/GEAR 更多围绕张量重构误差，TurboQuant 明确围绕内积无偏和元数据开销设计。它适合注意力这种以内积排序和 softmax 权重为核心的计算。

#### 🧪 练习题

```yaml
question: "TurboQuant 更直接优化的量是什么？"
options:
  - "注意力内积精度"
  - "词表大小"
  - "训练数据顺序"
  - "模型层数"
answer: 0
explain: "注意力分数来自 query-key 内积，TurboQuant 通过 PolarQuant+QJL 重点保持该内积。"
```
