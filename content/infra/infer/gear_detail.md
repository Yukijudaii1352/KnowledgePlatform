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

GEAR 将 KV cache 表示为低比特量化主体加低秩残差和稀疏异常补偿，解决单纯量化在结构化误差与 outlier 上的精度损失。

#### 🎯 核心要点

- 先对 KV cache 做低比特量化获得主体压缩
- 对量化残差做低秩近似以补偿系统性误差
- 保留少量大残差元素作为稀疏 outlier 补偿
- 恢复时叠加量化值、低秩项和稀疏项
- 适用于高倍率 KV cache 压缩和长上下文服务

#### 🔬 深入细节

![GEAR 核心示意图](https://ar5iv.labs.arxiv.org/html/2403.05527/assets/x1.png)
*图：GEAR 的量化、低秩补偿与稀疏补偿组合框架。*

```python
for block in kv_blocks:
    Q, scale = quantize(block, bits=b)
    residual = block - dequant(Q, scale)
    U, V = low_rank(residual, rank=r)
    S = keep_top_abs(residual - U @ V, nnz=s)
    store(Q, scale, U, V, S)

block_hat = dequant(Q, scale) + U @ V + S
out = attention(query, block_hat.K, block_hat.V)
```

##### 动机与背景

极低比特 KV 量化不仅有均匀噪声，还有结构化残差和少量异常大误差。裸量化要么精度不足，要么必须提高 bit 数牺牲压缩率。GEAR 把误差拆开处理。

##### 核心机制

主体张量用低比特量化保存；残差矩阵中可共享的模式用低秩因子表示；剩余最大幅度误差用稀疏矩阵保存。近似形式是 \(X\approx DeQuant(Q)+UV^T+S\)。

##### 训练/推理流程

KV block 生成后被压缩成量化码、scale、低秩因子和稀疏补偿。attention kernel 读取时按块恢复近似 K/V，随后执行标准注意力。压缩率由 bit 数、rank 和稀疏预算共同控制。

##### 与传统方法的区别

KIVI 强调 K/V 不同量化粒度，GEAR 强调误差补偿。它比单纯 outlier 保存更全面，因为低秩项能修复广泛但有结构的偏差；比完整 FP16 cache 更省显存。

#### 🧪 练习题

```yaml
question: "GEAR 中低秩补偿主要修复什么？"
options:
  - "tokenizer 错误"
  - "量化后的结构化残差"
  - "位置编码长度"
  - "batch 排队策略"
answer: 1
explain: "低秩项捕捉残差中的共享结构，稀疏项再保存少数大误差。"
```
