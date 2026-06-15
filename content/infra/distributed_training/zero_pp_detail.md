### ZeRO++: ZeRO增强版

```yaml
id: zero_pp
name: ZeRO++
full_name: ZeRO增强版 (ZeRO++)
year: '2024'
org: Microsoft
paper_url: https://arxiv.org/abs/2306.10209
category: comm
parent: zero
motivation: 量化权重通信+层次化分区4x通信效率
```

#### 📝 一句话总结

ZeRO++ 在 ZeRO-3 的参数 all-gather、梯度 reduce-scatter 和跨节点分区通信上分别引入量化与层次化分区，把巨模型训练的通信量降低约 4 倍，缓解低带宽集群和小 per-GPU batch 下 ZeRO 通信暴露的问题。

#### 🎯 核心要点

- 目标不是重新设计 ZeRO 的内存切分，而是降低 ZeRO-3 三类 collective 的通信体积和跨节点压力。
- `qwZ` 使用 block-based quantization 压缩前向/反向 all-gather 的权重分片。
- `hpZ` 采用 hierarchical partitioning，在节点内保留更多参数副本，以增加少量显存换取跨节点通信减少。
- `qgZ` 用量化梯度通信替代标准 reduce-scatter，通过 all-to-all 风格聚合保持训练精度。
- 论文报告总体通信量约 4x 降低，在 384 GPU 规模最高 2.16x 吞吐提升。

#### 🔬 深入细节

##### 核心示意图

![ZeRO++ 总览图](https://ar5iv.labs.arxiv.org/html/2306.10209/assets/x1.png)
*图：ZeRO++ 针对 ZeRO-3 的权重 all-gather、分区方式和梯度平均分别加入 qwZ、hpZ、qgZ。*

##### 算法伪代码

```python
# one ZeRO++ training step, simplified
for layer in model.layers:
    # qwZ: gather quantized parameter partitions and dequantize for compute
    q_part, scale = quantize_blockwise(local_param_partition(layer))
    full_param = dequantize(all_gather(q_part, scale))
    activation = layer.forward(activation, full_param)

for layer in reversed(model.layers):
    full_param = gather_quantized_params(layer)
    grad = layer.backward(full_param)

    # qgZ: quantized gradient averaging
    q_grad, g_scale = quantize_blockwise(grad)
    avg_grad_partition = quantized_all_to_all_average(q_grad, g_scale)

    # hpZ: update partition within hierarchical ZeRO groups
    optimizer_step(local_partition(layer), avg_grad_partition)
```

##### 方法解释

ZeRO-3 的优势是每张 GPU 只保存参数、梯度和优化器状态的一部分；代价是每层前向和反向都要 all-gather 参数，反向还要 reduce-scatter 梯度。在高带宽集群且 batch 较大时，这些通信能被部分隐藏；但在低带宽网络、小 microbatch 或超大 DP 规模下，通信暴露成为吞吐瓶颈。

`qwZ` 处理权重 all-gather。ZeRO-3 all-gather 的参数只是用于当前层计算，通信后可反量化为计算精度，因此可以在通信前做 block-wise quantization：

$$
\hat{W}_b = Q(W_b), \quad W_b \approx D(\hat{W}_b, s_b)
$$

每个 block 独立 scale，减少 outlier 影响。这样 all-gather 传输的是低 bit 权重加少量 scale 元数据，显著降低前向和反向参数通信体积。

`hpZ` 处理跨节点通信。大集群里节点内 NVLink/NVSwitch 带宽远高于跨节点网络。Hierarchical partitioning 把 ZeRO 分区分成节点内和节点间层次，在节点内适度复制部分参数分区，使更多同步留在高速域内，减少慢速跨节点 all-gather 的次数或体积。这是典型的“用显存换网络”设计。

`qgZ` 处理梯度平均。梯度 reduce-scatter 直接低精度化容易影响收敛，因为梯度噪声会累积到优化器状态。ZeRO++ 设计量化梯度平均流程，在 all-to-all/分组聚合中传输量化梯度，并通过合适的 scale 与聚合顺序控制误差，使最终更新接近 full precision reduce-scatter。

> 💡 关键：ZeRO++ 的三项技术分别对准 ZeRO-3 的三段主要通信路径，因此能组合成端到端 4x 通信体积降低，而不是单点优化。

##### 与 ZeRO 的区别

ZeRO 解决的是“每张卡是否需要保存完整模型状态”；ZeRO++ 解决的是“切分后每一步把状态临时拼回来和同步回去要传多少数据”。在内存模型上，ZeRO++ 仍继承 ZeRO-3 的参数/梯度/优化器分区；在通信模型上，它引入量化和层次化，把 ZeRO-3 从高带宽集群友好扩展到更低带宽或更大规模的环境。

#### 🧪 练习题

```yaml
question: "ZeRO++ 中 hpZ 的主要 trade-off 是什么？"
options:
  - "用更多节点内参数副本和少量显存换取更少跨节点通信"
  - "用更高学习率换取更低显存"
  - "把所有梯度永久丢弃"
  - "取消 ZeRO 的参数分区"
answer: 0
explain: "hpZ 利用节点内带宽更高的事实，分层组织 ZeRO 分区，减少慢速跨节点通信。"
```
