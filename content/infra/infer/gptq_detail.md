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

GPTQ 将大模型权重量化视为逐层二阶近似问题，用近似 Hessian 逆在量化每列权重后补偿剩余权重，实现无需重训练的高精度 3/4-bit post-training quantization。

#### 🎯 核心要点

- 基于 Optimal Brain Quantization/Surgeon 的二阶误差补偿思想
- 逐层收集校准激活，构造 Hessian 近似 \(H=XX^T\)
- 按列量化权重，并用 Hessian 逆更新未量化列以补偿误差
- 分 block 处理和 Cholesky 稳定化降低计算/内存开销
- 支持百亿到千亿参数 LLM 的一次性低比特权重量化

#### 🔬 深入细节

![GPTQ 核心示意图](https://ar5iv.labs.arxiv.org/html/2210.17323/assets/x1.png)
*图：GPTQ 论文中的量化误差与二阶补偿示意。*

```python
# GPTQ layerwise quantization sketch
X = collect_calibration_activations(layer)
H_inv = inverse(X @ X.T + damping * I)
for block in weight_columns(W):
    for j in block:
        q_j = quantize(W[:, j], bits)
        err = (W[:, j] - q_j) / H_inv[j, j]
        W[:, j] = q_j
        W[:, j+1:] -= err[:, None] * H_inv[j, j+1:]
store_quantized(W)
```

##### 动机与背景

直接 round-to-nearest 量化 LLM 权重在 4-bit 以下会显著降质。量化某一列权重会改变层输出，但剩余未量化权重仍可调整来补偿该误差。GPTQ 用二阶近似快速估计这种补偿。

##### 核心机制

对线性层输出误差 \(\|WX-\hat{W}X\|^2\) 做二阶近似，Hessian 由校准激活外积给出。量化某列后，用 \(H^{-1}\) 指导对后续列的更新，使整体输出误差最小化。

##### 训练/推理流程

逐层读取少量校准样本，计算激活统计；对权重按 block 量化并补偿；写出低比特权重、scale/zero point 和必要元数据。推理时使用 weight-only kernel 反量化或直接低比特 GEMM。

##### 与传统方法的区别

GPTQ 与 AWQ 的区别是使用二阶信息和逐层重建；AWQ 更轻量，依赖激活感知缩放。GPTQ 精度强但校准和计算更重，可能对校准分布更敏感。

#### 🧪 练习题

```yaml
question: "GPTQ 量化后更新剩余权重依赖什么信息？"
options:
  - "Hessian 逆近似"
  - "随机文件名"
  - "奖励模型分数"
  - "网络带宽"
answer: 0
explain: "GPTQ 用校准激活构造 Hessian 近似，并用其逆矩阵计算误差补偿。"
```
