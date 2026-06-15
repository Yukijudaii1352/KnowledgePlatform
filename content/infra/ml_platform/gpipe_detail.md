### GPipe

```yaml
id: gpipe
name: GPipe
full_name: 流水线并行 (GPipe)
year: "2019"
org: Google Brain
paper_url: https://arxiv.org/abs/1811.06965
category: training_platform
parent: tensorflow
motivation: 通过微批次实现流水线并行，开创性工作
```

#### 📝 一句话总结

GPipe 提出用微批次流水线并行训练超大网络：把模型按层切到多个加速器，并将一个 mini-batch 拆成 micro-batches 以填满流水线，从而在保持同步梯度语义的同时突破单设备内存限制。

#### 🎯 核心要点

- 按层将模型划分为多个 pipeline stage，每个 stage 放置在不同加速器
- 将 mini-batch 拆成 micro-batches，前向和反向在多个 stage 上流水执行
- 使用同步梯度累积：所有 micro-batch 反传完成后统一更新参数，避免权重陈旧
- 结合 rematerialization/activation recomputation 降低激活显存占用
- 展示 AmoebaNet 和 Transformer 等大模型可通过流水线扩展到更多 TPU core

#### 🔬 深入细节

![GPipe 核心示意图](https://ar5iv.labs.arxiv.org/html/1811.06965/assets/x1.png)
*图：图示展示 GPipe 将网络层分段并用 micro-batch 填充流水线，减少设备空泡。*

```python
# GPipe 同步流水线训练伪代码
stages = partition_layers(model, num_devices)
for minibatch in loader:
    micros = split(minibatch, chunks=M)
    losses = []
    for micro in pipeline_forward(stages, micros):
        losses.append(loss_fn(micro.output))
    for loss in reversed(losses):
        pipeline_backward(stages, loss)
    all_stages_optimizer_step()   # 所有 micro-batch 梯度累积后同步更新
```

模型并行的难点是设备利用率。朴素按层切分时，一个 batch 先在 stage 0 前向，再到 stage 1，其他设备大部分时间空闲；如果每个小 batch 都立即更新，又会引入不同 stage 权重版本不一致。

GPipe 的做法是把一个全局 mini-batch 切成多个 micro-batch。第一个 micro-batch 进入 stage 1 时，stage 0 已经可以处理第二个 micro-batch；随着流水线填充，多数设备能并行工作。

为了保持与普通同步 SGD 接近的语义，GPipe 不在每个 micro-batch 后更新参数，而是累积整个 mini-batch 的梯度后统一 optimizer step。因此所有 micro-batch 的前向/反向都基于同一版本权重，避免 PipeDream 式权重陈旧。

空泡比例大致与 stage 数 \(K\) 和 micro-batch 数 \(M\) 有关，\(M\) 越大，填充和排空开销占比越小；但 micro-batch 太小会降低矩阵乘效率，因此需要在吞吐、显存和 batch 统计稳定性之间折中。

> 💡 关键：这类 ML 平台论文的贡献通常不在单个数学公式，而在把计算、状态、通信、调度和故障边界重新组织成可扩展的系统抽象。

#### 🧪 练习题

```yaml
question: "GPipe 为什么要把 mini-batch 拆成 micro-batch？"
options:
  - "为了减少模型参数量"
  - "为了填充流水线并降低设备空闲时间"
  - "为了完全取消反向传播"
  - "为了把同步 SGD 改成异步 SGD"
answer: 1
explain: "micro-batch 让不同流水线 stage 能同时处理不同样本，减少 bubble。"
```
