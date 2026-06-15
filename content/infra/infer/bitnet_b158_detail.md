### BitNet b1.58: 比特网 (BitNet b1.58)

```yaml
id: bitnet_b158
name: BitNet b1.58
full_name: 比特网 (BitNet b1.58)
year: '2024'
org: 微软
paper_url: https://arxiv.org/abs/2402.17764
category: quantize
parent: gptq
motivation: 三值化权重消除浮点乘法
```

#### 📝 一句话总结

BitNet b1.58 将 Transformer 线性层权重三值化为 {-1, 0, 1}，配合激活量化和专门训练，使大模型主要用加法/减法替代浮点乘法，显著降低计算和内存成本。

#### 🎯 核心要点

- BitLinear 层用三值权重替代全精度权重
- 权重 bit 数平均约 1.58 bit，对应 {-1,0,1} 三种状态
- 通常需要从头预训练或充分训练以适应三值约束
- 激活保留较高位宽量化以维持信息流
- 目标是在 scaling law 上接近全精度 Transformer，同时获得低能耗推理

#### 🔬 深入细节

![BitNet b1.58 核心示意图](https://ar5iv.labs.arxiv.org/html/2402.17764/assets/x1.png)
*图：BitNet b1.58 论文中的 BitLinear/三值权重框架。*

```python
# BitLinear quantization sketch
scale_w = mean(abs(W))
W_q = clip(round(W / scale_w), -1, 1)   # {-1, 0, 1}
scale_x = max(abs(X)) / 127
X_q = round(X / scale_x).clip(-128, 127)
Y = (X_q @ W_q) * scale_x * scale_w
```

##### 动机与背景

后训练 4-bit 量化能省存储，但矩阵乘仍常需要反量化和低比特专用 kernel。BitNet 追求更激进的训练时约束：让权重本身只表示 -1、0、1，从模型设计层面减少乘法。

##### 核心机制

BitLinear 用三值化权重近似全精度权重，乘法可变成加、减或跳过。激活通常做 8-bit 量化，保留足够动态信息。训练过程中使用直通估计器等方法让离散权重可优化。

##### 训练/推理流程

模型从训练阶段就使用 BitLinear 替代标准 Linear；前向使用量化权重和激活；反向通过近似梯度更新潜在全精度参数或量化参数。部署时存储三值权重并使用专门 kernel。

##### 与传统方法的区别

GPTQ/AWQ 是训练后压缩已有模型，BitNet b1.58 是模型架构和训练范式改变。它不适合简单套到任意 checkpoint，但在从头训练时有更大硬件效率潜力。

#### 🧪 练习题

```yaml
question: "BitNet b1.58 权重为什么称为 1.58 bit？"
options:
  - "三值 {-1,0,1} 约需 log2(3) bit"
  - "固定使用 1.58 层"
  - "每个 token 1.58 秒"
  - "只支持 158 个词"
answer: 0
explain: "三种权重状态的信息量约为 log2(3)=1.58 bit。"
```
