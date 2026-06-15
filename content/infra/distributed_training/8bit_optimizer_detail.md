### 8-bit Optimizers: 8比特优化器

```yaml
id: 8bit_optimizer
name: 8-bit Optimizers
full_name: 8比特优化器 (8-bit Optimizers)
year: '2021'
org: Univ. of Washington
paper_url: https://arxiv.org/abs/2110.02861
category: comm
parent: —
motivation: 块量化Adam/AdaGrad减少75%状态内存
```

#### 📝 一句话总结

8-bit Optimizers 用块级动态量化保存 Adam/AdaGrad/momentum 的优化器状态，解决大模型训练中优化器状态占用显存远超参数本身的问题，同时保持接近 32-bit 优化器的收敛表现。

#### 🎯 核心要点

- 将一阶/二阶动量等 stateful optimizer 统计量从 32-bit 降到 8-bit，理论上可减少约 75% 状态内存。
- Block-wise quantization 将张量切成小块，每块独立 scale，避免少数 outlier 破坏整张量量化精度。
- Dynamic quantization 使用非线性分桶，对小幅值和大幅值都保留较好分辨率。
- Stable embedding layer 降低语言模型中 token 频率极不均衡带来的 embedding 梯度方差。
- 作为 drop-in optimizer 使用，论文报告在 LM、GLUE、ImageNet、WMT14、MoCo、RoBERTa 等任务中无需改原始超参即可接近 32-bit 表现。

#### 🔬 深入细节

##### 核心示意图

![8-bit Optimizers 块量化示意](https://ar5iv.labs.arxiv.org/html/2110.02861/assets/x1.png)
*图：论文展示 8-bit optimizer state 通过块级量化降低内存占用，并在反量化后参与标准优化器更新。*

##### 算法伪代码

```python
# 8-bit Adam update with block-wise quantized states
for param, grad in model.parameters():
    m = dequantize(state_m8[param], scale_m[param])
    v = dequantize(state_v8[param], scale_v[param])

    m = beta1 * m + (1 - beta1) * grad
    v = beta2 * v + (1 - beta2) * grad * grad
    update = m / (sqrt(v) + eps)
    param -= lr * update

    state_m8[param], scale_m[param] = blockwise_quantize_dynamic(m, block_size=2048)
    state_v8[param], scale_v[param] = blockwise_quantize_dynamic(v, block_size=2048)
```

##### 方法解释

Adam 的显存瓶颈来自优化器状态。混合精度训练中，参数可用 fp16/bf16，但 Adam 通常仍保存 fp32 的一阶动量 \(m_t\)、二阶动量 \(v_t\)，有时还保存 fp32 master weight。对大模型来说，优化器状态可能是参数显存的数倍，限制最大模型规模和 batch size。

直接把 \(m_t,v_t\) 线性量化到 8-bit 会遇到 outlier 问题：若整张量共享一个 scale，少数极大值会压缩绝大多数小值的分辨率。论文采用 block-wise quantization，把张量分成固定大小块，每块独立统计 scale：

$$
q_i = \mathrm{round}\left(\frac{x_i}{s_b}\right), \quad s_b=\frac{\max_{j \in b}|x_j|}{127}
$$

这样 outlier 只影响所在 block。动态量化进一步使用非线性码本，让靠近 0 的值拥有更密集的表示，因为优化器状态中大量元素幅值较小但对更新方向仍重要。

语言模型还需要 stable embedding。输入 token 频率高度不均匀，常见 token 的 embedding 梯度统计与稀有 token 差异很大，量化状态更容易不稳定。Stable embedding 将 embedding 的归一化和初始化做得更保守，降低梯度方差，使 8-bit state 不会在训练早期被异常更新破坏。

> 💡 关键：8-bit Optimizers 并不是把前向/反向计算都变成 8-bit，而是只压缩优化器历史统计量；计算更新时仍可反量化到较高精度。

##### 与通信压缩的关系

它在任务分类中属于 `comm`，但核心收益更偏显存：减小 optimizer state 后，单 GPU 可容纳更大模型或 batch，分布式训练中也能减少 ZeRO/offload 需要搬运的状态量。与 DGC/ScaleCom 压缩每轮梯度通信不同，8-bit Optimizers 压缩的是跨 step 保存的优化器状态，通常与梯度 all-reduce、ZeRO 和 activation checkpointing 互补。

#### 🧪 练习题

```yaml
question: "8-bit Optimizers 为什么采用 block-wise quantization？"
options:
  - "让每个小块独立缩放，减少 outlier 对整张量量化精度的影响"
  - "强制每个参数块使用不同学习率"
  - "替代反向传播中的梯度计算"
  - "只为了减少模型参数数量"
answer: 0
explain: "块级量化把 outlier 的影响限制在局部 block 内，提高大多数元素的 8-bit 表示精度。"
```
