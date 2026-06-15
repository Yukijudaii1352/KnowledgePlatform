### ABQ-LLM

```yaml
id: abq_llm
name: ABQ-LLM
full_name: 任意比特量化 (Arbitrary-Bit Quantization)
year: 2025
org: 中科大
paper_url: https://ojs.aaai.org/index.php/AAAI/article/view/34385
category: quantization
parent: awq
motivation: 实现任意比特量化推理加速
```

#### 📝 一句话总结

ABQ-LLM 提出任意比特权重/激活量化和对应推理框架，用分布校正、注意力 KL 约束与 bit balance 改善低比特全量化精度，并用 Binary TensorCore 等价分解把 W6A6、W2A8 等非标准精度转化为实际加速。

#### 🎯 核心要点

- 将权重缩放因子、激活缩放因子和权重裁剪范围设为可学习量化参数
- 提出 Distribution Correction Loss，约束量化 Transformer block 的输出分布接近浮点模型
- 提出 Attention Map KL Loss，约束低比特量化后的注意力图保持原模型关注模式
- 针对 2-bit 等极低比特的非对称码值利用不足问题提出 bit balance 策略
- 构建任意精度推理引擎，把低比特矩阵乘分解为 Binary TensorCore 可执行的等价操作
- 在 W2A8 等配置下兼顾困惑度、显存压缩和端到端推理加速

#### 🔬 深入细节

![ABQ-LLM 总览图](https://arxiv.org/html/2408.08554v3/ABQ-LLM.png)
*图：ABQ-LLM 使用 DLC loss 和 AKL loss 优化可学习量化参数，并配合任意比特推理引擎部署。*

```python
# ABQ-LLM 量化参数优化伪代码
for block in transformer_blocks:
    s, alpha, beta = init_learnable_scale_and_clip(block)
    for batch in calibration_loader:
        y_fp, attn_fp = block.forward_fp(batch)
        y_q, attn_q = block.forward_quant(batch, s=s, clip=(alpha, beta))

        loss_dlc = mse_or_distribution_loss(y_q, y_fp)
        loss_akl = kl_divergence(attn_fp, attn_q)
        loss_balance = bit_balance_regularizer(block.quant_codes)
        loss = loss_dlc + lambda_akl * loss_akl + lambda_b * loss_balance
        update(s, alpha, beta, loss)

compile_arbitrary_bit_matmul_with_binary_tensorcore()
```

ABQ-LLM 面向的是 weight-activation 全量化，而不是只压缩权重。低比特全量化有两类问题：一是量化误差会在 Transformer block 内改变隐藏状态分布，导致后续层输入偏移；二是 GPU 原生高效整数单元主要支持 INT4/INT8，W6A6、W2A8 这类组合即使理论上减少了 bit，也未必能直接加速。

论文首先把缩放和裁剪写成可优化目标。对于权重 \(\mathbf{W}\) 与激活 \(\mathbf{X}\)，目标近似为：

$$
\arg\min_{\mathbf{s},\alpha,\beta}\left\|\mathbf{W}\mathbf{X}-Q(\mathrm{clip}(\mathbf{W})\mathrm{diag}(\mathbf{s}))Q(\mathrm{diag}(\mathbf{s})^{-1}\mathbf{X})\right\|
$$

这里 \(\mathbf{s}\) 平衡权重与激活的量化难度，\(\alpha,\beta\) 控制权重裁剪上下界。相比手工设置平衡系数，ABQ-LLM 用校准数据直接优化这些参数，使不同层可自适应地选择更合适的尺度。

Distribution Correction Loss 的直觉是：只让单个矩阵乘误差小并不够，Transformer block 的输出分布也要接近原模型，否则误差会逐层累积。Attention Map KL Loss 则进一步约束注意力概率图：

$$
\mathcal{L}_{\mathrm{AKL}}=\mathrm{KL}(\mathbf{A}_{\mathrm{fp}}\|\mathbf{A}_{\mathrm{q}})
$$

其中 \(\mathbf{A}_{\mathrm{fp}}\) 和 \(\mathbf{A}_{\mathrm{q}}\) 分别为浮点与量化 attention map。对于语言模型，注意力模式偏移会直接影响上下文证据选择，因此该约束比只看输出 MSE 更贴近生成质量。

> ⚠️ 注意：ABQ-LLM 的“任意比特”包含算法和系统两部分。若只有可学习量化参数而没有任意比特 GEMM/GEMV 引擎，非 INT4/INT8 配置可能仍无法转化为真实延迟收益。

Bit balance 处理的是极低比特下量化桶利用不均衡的问题。以 2-bit 为例，若分布偏斜导致某些码值很少被使用，有效表示能力会低于标称 2-bit。ABQ-LLM 通过平衡正负或不同码值占用，缓解低比特下的非对称损失。

系统侧，ABQ-LLM 把任意精度整数乘法拆成 Binary TensorCore 等价的二进制运算组合，避免被 GPU 只提供 INT4/INT8 原生路径限制。这样 W6A6、W2A8 等混合精度选择不只是存储格式，而是能对应到实际计算和访存收益。

#### 🧪 练习题

```yaml
question: "ABQ-LLM 为什么强调 Binary TensorCore 等价推理框架？"
options:
  - "为了让任意比特配置获得真实硬件加速，而不是只能离线存储压缩"
  - "为了把所有激活恢复成 FP16"
  - "为了完全避免校准数据"
  - "为了将 Transformer 改造成卷积网络"
answer: 0
explain: "GPU 原生整数单元通常只高效支持少数精度，ABQ-LLM 通过 BTC 等价分解执行任意比特矩阵乘，才能把 W2A8/W6A6 等配置转化为速度收益。"
```
