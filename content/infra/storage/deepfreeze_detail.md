### DeepFreeze

```yaml
id: deepfreeze
name: DeepFreeze
full_name: DeepFreeze异步检查点 (DeepFreeze)
year: '2020'
org: ANL
paper_url: https://ieeexplore.ieee.org/document/9139779
category: checkpoint
parent: —
motivation: VELOC多级持久化,HPC异步I/O
```

#### 📝 一句话总结

DeepFreeze 把 ANL 的 VELOC 异步多级检查点运行时接入 Keras/TensorFlow 数据并行训练，通过轻量序列化、权重分片和执行图内抽取来降低检查点阻塞时间，解决默认 HDF5 同步保存模型权重在 HPC 文件系统上扩展性差的问题。

#### 🎯 核心要点

- 面向同步数据并行深度学习，利用每个 batch 结束后各 rank 权重一致这一安全点做检查点
- 用 Keras callback 封装检查点模块，用户只需把 callback 加入 `model.fit` 的 callbacks 列表
- 对比四类方案：`Keras-Default`、`VELOC-Single`、`VELOC-Sharded`、`VELOC-Opt`
- `VELOC-Single` 将权重取为 numpy arrays 后用 VELOC 本地序列化，并由 VELOC 后台异步刷到 Lustre 等外部存储
- `VELOC-Sharded` 让每个 rank 只保存每个权重数组的一段 slice，分摊序列化和持久化负载
- `VELOC-Opt` 把张量抽取和切片嵌入 TensorFlow execution graph，仅把序列化保留在阻塞路径中
- 实验在 CANDLE-NT3 与 ResNet-50 上显示，VELOC-Opt 相比 Keras 默认方案显著降低 blocking phase 和 runtime overhead

#### 🔬 深入细节

![VELOC 架构图](https://ar5iv.labs.arxiv.org/html/2103.02131/assets/x1.png)
*图：VELOC 论文的 Figure 1，展示 VeloC Client、VeloC Engine/Backend、多级存储与异步模式。DeepFreeze 的 Figure 4 基于该 VELOC runtime 构建；这里使用 ar5iv 公开图片 URL 作为 VELOC 架构来源。*

```python
# DeepFreeze / VELOC-Opt 核心流程伪代码
class DeepFreezeCallback(keras.callbacks.Callback):
    def __init__(self, veloc, rank, nranks, checkpoint_every):
        self.veloc = veloc
        self.rank = rank
        self.nranks = nranks
        self.interval = checkpoint_every

    def on_train_batch_end(self, batch, logs=None):
        if batch % self.interval != 0:
            return

        # batch 结束是同步数据并行的安全点：各 replica 权重已通过 all-reduce 对齐
        shards = []
        for tensor in self.model.trainable_weights:
            # VELOC-Opt 将 tensor -> contiguous bytes / slice 的抽取放入 TF graph
            local_slice = graph_extract_slice(
                tensor,
                shard_id=self.rank,
                shard_count=self.nranks,
            )
            shards.append(serialize_contiguous(local_slice))

        # 阻塞路径只等待本地序列化；外部 PFS flush 由 VELOC 后台异步完成
        ckpt_id = f"batch_{batch}_rank_{self.rank}"
        self.veloc.checkpoint_begin(ckpt_id)
        for i, shard in enumerate(shards):
            self.veloc.mem_protect(name=f"w{i}", buffer=shard)
        self.veloc.checkpoint_end()

        # VELOC active backend: local checkpoint -> partner/erasure coding -> PFS
```

DeepFreeze 的问题背景是深度学习训练越来越依赖大型集群和同步数据并行，但常见框架里的检查点机制很朴素。Keras 默认做法是在 callback 中调用 `model.save_weights(ckpt_file)`，用 HDF5 把 rank 0 的模型权重写到外部文件系统。虽然同步数据并行在 batch 结束时各 replica 的权重一致，理论上一个 rank 保存就够了，但这个 rank 会在下一批训练中落后，最终其他 rank 在同步点等待它，阻塞时间会放大成整体训练开销。HPC 环境里的 Lustre/PFS 又不擅长大量小 I/O 和频繁同步写，因此默认方案难以支持高频检查点。

DeepFreeze 的基本拆解是把“从框架张量拿到权重数组”和“把字节写到持久存储”分开看。`VELOC-Single` 仍然由一个 rank 调用 `model.get_weights()` 拿到 numpy arrays 并序列化，但写外部存储由 VELOC 异步后台完成；因此相对 Keras 默认方案，它隐藏了远端 flush，却没有消除张量抽取和本地序列化的阻塞。`VELOC-Sharded` 进一步让每个 rank 保存所有权重数组的一个 slice，理论上把总 checkpoint size 平摊到 \(N\) 个 rank：

$$
S_{\text{rank}} \approx \frac{S_{\text{model}}}{N}, \qquad
T_{\text{serialize, rank}} \approx \frac{S_{\text{model}}}{N \cdot B_{\text{local}}}
$$

不过论文也指出，ResNet-50 这类模型包含许多小 tensor，切片操作本身会产生不可忽略的准备开销，因此简单 sharding 不一定线性受益。

`VELOC-Opt` 是论文最核心的优化。它不在 callback 中额外开一个 Python/TensorFlow 上下文去把 tensor 转 numpy 再切片，而是把抽取、切片等操作嵌入 TensorFlow execution graph。这样训练执行图在正常流中准备好每个 rank 的本地 shard，callback 阻塞路径主要剩下把连续字节交给 VELOC Python binding 的序列化动作。论文把评价指标分成 preparation phase、blocking phase 和 runtime overhead：preparation 衡量张量抽取/切片，blocking 衡量 callback 阻塞训练的时间，runtime overhead 衡量整个训练组的端到端放慢。这个分解很重要，因为异步 I/O 只能隐藏远端写入，若张量抽取仍在关键路径上，训练仍会停顿。

VELOC 负责的是检查点运行时而非深度学习语义。它提供 client API、checkpoint begin/end、内存保护、本地存储、多级持久化、异步 backend、partner replication 或 erasure coding 等能力。DeepFreeze 的贡献在于把 DNN 权重结构映射成 VELOC 能高效处理的连续字节数组，并利用数据并行 rank 之间的对称性切分工作。对外部存储而言，多个 rank 各自写本地 shard，再由 VELOC 后台迁移到 Lustre，能避免 rank 0 单点写入和同步 HDF5 小 I/O 风暴。

从机制上看，DeepFreeze 的总开销可拆成：

$$
T_{\text{ckpt}} =
T_{\text{extract}} +
T_{\text{slice}} +
T_{\text{serialize}} +
T_{\text{local-write}} +
T_{\text{async-flush}}
$$

Keras 默认方案几乎把这些全部放在阻塞路径；`VELOC-Single` 隐藏 \(T_{\text{async-flush}}\)；`VELOC-Sharded` 降低单 rank 数据量但增加切片准备；`VELOC-Opt` 试图把 \(T_{\text{extract}}+T_{\text{slice}}\) 移出 callback 阻塞路径，只留下更小的 \(T_{\text{serialize}}\)。因此论文报告的优势不是“检查点不存在了”，而是阻塞路径被压缩，外部 I/O 被异步化，规模增加时 Keras 默认方案的集中写瓶颈更明显。

与 CheckFreq 这类训练系统相比，DeepFreeze 更偏 HPC I/O runtime 适配：它没有重点讨论数据迭代器恢复、GPU 内存快照或自动频率调节，而是围绕 VELOC 多级持久化、rank 分片和执行图增强来降低检查点保存开销。它的适用边界也因此清晰：当训练框架能暴露权重张量、训练在同步点有一致状态、集群有本地存储和外部 PFS 时，DeepFreeze 能以很小训练代码改动获得异步检查点收益；若训练状态包含复杂 optimizer/sharded state，或者需要恢复 dataloader 随机状态，还必须额外纳入这些状态。

> 💡 关键：DeepFreeze 的“异步”并不等于所有工作都免费，它把远端持久化交给 VELOC 后台，并通过 graph-level extraction 缩短训练必须等待的那一小段同步窗口。

#### 🧪 练习题

```yaml
question: "DeepFreeze 中 VELOC-Opt 相比 VELOC-Sharded 的关键改进是什么？"
options:
  - "只保存 rank 0 的 HDF5 文件，避免所有 rank 参与"
  - "把张量抽取和切片嵌入 TensorFlow execution graph，减少 callback 阻塞路径"
  - "删除外部持久化，只把权重留在 GPU 显存"
  - "通过降低模型精度来减少训练计算量"
answer: 1
explain: "VELOC-Opt 仍使用分片和 VELOC 异步持久化，但把原本在 callback 中阻塞执行的 tensor extraction/slicing 移入执行图，从而降低 blocking phase。"
```
