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

KIVI 提出无需微调的 2-bit 非对称 KV cache 量化，根据 Key 的通道级 outlier 和 Value 的 token 级分布差异分别选择量化粒度，在长上下文推理中显著降低显存。

#### 🎯 核心要点

- Key cache 采用 per-channel 量化以处理固定通道 outlier
- Value cache 采用 per-token 量化以适应 token 间分布变化
- 使用非对称 2-bit 量化并保留 FP16 residual cache
- 无需校准训练或模型微调
- 适配多种开源 LLM 并扩展可服务上下文长度

#### 🔬 深入细节

![KIVI 核心示意图](https://ar5iv.labs.arxiv.org/html/2402.02750/assets/x1.png)
*图：KIVI 对 Key/Value cache 分布差异的分析及非对称量化设计。*

```python
# KIVI KV cache quantization
K_old, K_recent = split_old_recent(K_cache)
V_old, V_recent = split_old_recent(V_cache)
K_q, K_scale, K_zp = quantize_asym(K_old, bits=2, axis='channel')
V_q, V_scale, V_zp = quantize_asym(V_old, bits=2, axis='token')
K = concat(dequant(K_q, K_scale, K_zp), K_recent)
V = concat(dequant(V_q, V_scale, V_zp), V_recent)
out = attention(Q, K, V)
```

##### 动机与背景

KV cache 量化可以减少显存，但 2-bit 极低精度容易被 outlier 放大误差。直接用统一粒度量化 K/V 会破坏 attention score 或 value aggregation，尤其在长上下文中误差累积明显。

##### 核心机制

KIVI 的关键是 K 和 V 分开处理：Key 的异常值更稳定地出现在某些通道，因此 per-channel scale 更合适；Value 的数值范围更随 token 变化，因此 per-token scale 更合适。最近 token 保持 FP16 residual，避免频繁小批量量化带来的误差和开销。

##### 训练/推理流程

解码产生的新 K/V 先进入 residual cache；当 residual 达阈值，旧部分被批量量化为 2-bit。attention 时对旧 cache 反量化或用融合 kernel 读取，再与最近 FP16 cache 拼接参与计算。

##### 与传统方法的区别

KIVI 不删除 token，也不需要重训模型。相比普通 per-tensor 量化，它利用 K/V 统计结构；相比 GEAR，它主要靠粒度选择和 residual cache，而不是显式低秩误差补偿。

#### 🧪 练习题

```yaml
question: "KIVI 为什么 Key 用 per-channel 而 Value 用 per-token？"
options:
  - "二者统计分布和 outlier 模式不同"
  - "Value 不需要参与推理"
  - "Key 永远是整数"
  - "为了减少模型层数"
answer: 0
explain: "Key outlier 更偏通道级，Value 范围更随 token 变化，分别设粒度能降低误差。"
```
