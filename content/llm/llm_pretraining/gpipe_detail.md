### GPipe

```yaml
id: gpipe
name: GPipe
full_name: 'GPipe (GPipe: Easy Scaling with Micro-Batch Pipeline)'
year: '2019'
org: Google
paper_url: https://arxiv.org/abs/1811.06965
category: distributed
parent: —
motivation: 流水线并行微批次切分
```

#### 📝 一句话总结

GPipe 提出 batch-splitting pipeline parallelism：把顺序神经网络按层切到多个加速器，并把 mini-batch 切成 micro-batches 以填充流水线，同时在 mini-batch 末尾同步累积梯度更新。它解决的是模型大到单卡放不下时，朴素层并行设备空泡大、异步流水线又会引入 stale weights 的问题。

#### 🎯 核心要点

- 将 \(L\) 层顺序模型分成 \(K\) 个连续 partitions/cells，每个放到一个 accelerator
- mini-batch 被切成 \(M\) 个 micro-batches，不同 micro-batch 在不同 partition 上流水执行
- 所有 micro-batch 的梯度在 mini-batch 末尾累积后同步更新，保证与 partition 数无关的一致训练语义
- 支持 activation rematerialization/checkpointing，只保存 partition 边界激活以降低显存
- pipeline bubble 约随 \(K/M\) 降低，实践中 \(M\ge 4K\) 时利用率更好
- 只在 partition 边界传 activation tensor，通信开销相对张量切分更低
- 在 AmoebaNet 和 Transformer/NMT 上展示可扩展到数十亿参数模型

#### 🔬 深入细节

![GPipe micro-batch pipeline](https://ar5iv.labs.arxiv.org/html/1811.06965/assets/x2.png)
*图：GPipe 论文 Figure 2，展示顺序网络按层分区、朴素模型并行的空闲时间，以及 micro-batch pipeline 如何填充多个 accelerator。*

```python
# GPipe 训练伪代码
def gpipe_train_step(model_partitions, minibatch, micro_batches):
    grads = [zero_like(p.params) for p in model_partitions]
    chunks = split(minibatch, micro_batches)

    # pipeline schedule: forward waves then backward waves
    activations = {}
    for t, mb in enumerate(chunks):
        x = mb
        for k, part in enumerate(model_partitions):
            x = send_to_device(k, x)
            x = part.forward(x)
            activations[(t, k)] = checkpoint_boundary(x)

    for t in reversed(range(len(chunks))):
        grad = loss_grad(chunks[t])
        for k in reversed(range(len(model_partitions))):
            grad, g = model_partitions[k].backward(activations[(t, k)], grad)
            grads[k] += g

    for part, grad in zip(model_partitions, grads):
        optimizer_step(part.params, grad / micro_batches)
```

**动机与背景：模型并行容易让设备闲着。** 如果把一个深模型切成几段，直接让一个 mini-batch 顺序通过设备 1、2、3、4，那么任意时刻大多数设备都在等待前一段输出。大模型虽然能放下了，但硬件利用率很低。GPipe 的想法是把 batch 也切小，让不同 micro-batch 同时处在不同 pipeline stage。

**核心机制：同步微批流水线。** 假设 \(K\) 个 partitions、\(M\) 个 micro-batches。第一个 micro-batch 到达第二个 partition 后，第二个 micro-batch 就可以进入第一个 partition；经过 warmup 后，多个设备同时处理不同 micro-batch。与 PipeDream 类异步方法不同，GPipe 不在 micro-batch 之间立即更新参数，而是等完整 mini-batch 的所有 micro-batch 梯度都算完再同步更新。

$$
g = \frac{1}{M}\sum_{m=1}^{M} \nabla_\theta L(x_m;\theta)
$$

这样得到的梯度与普通 data parallel 中同一 mini-batch 的梯度一致，只是执行被流水化。

**activation rematerialization：用重算换显存。** 深模型训练显存主要来自保存每层激活供反向使用。GPipe 在 partition 内部可以只保存边界激活，反向时重算 partition 内部前向，从而把 activation memory 从随层数线性增长，降低到与 partition 边界和 micro-batch 大小相关。代价是增加一部分计算，但换来更大模型可训练。

**与张量并行的区别：切层而不是切矩阵。** GPipe 的 partition 是连续层组，通信只发生在层组边界，传的是 activation；Megatron-LM 张量并行则在每个 Transformer 层内部切 GEMM，需要层内 all-reduce/all-gather。GPipe 更通用、实现简单，但受 pipeline bubble 和层间负载均衡影响。

> 💡 关键：GPipe 的训练语义是同步 SGD，只是用 micro-batch pipeline 改变执行调度。

#### 🧪 练习题

```yaml
question: "GPipe 使用 micro-batch 的主要目的是什么？"
options:
  - "改变模型损失函数"
  - "填充流水线，减少不同模型分区设备的空闲时间"
  - "删除反向传播"
  - "把词表切成多个文件"
answer: 1
explain: "多个 micro-batch 可同时处于不同 partition，使流水线 warmup 后多个设备并行工作。"
```
