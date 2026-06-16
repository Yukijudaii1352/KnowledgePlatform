### CheckFreq

```yaml
id: checkfreq
name: CheckFreq
full_name: CheckFreq动态检查点 (CheckFreq)
year: '2021'
org: MSR
paper_url: https://www.usenix.org/conference/fast21/presentation/mohan
category: checkpoint
parent: —
motivation: 两阶段机制,3.5%开销秒级恢复
```

#### 📝 一句话总结

CheckFreq 提出自动、迭代级、细粒度 DNN 检查点框架，通过两阶段流水线检查点、可恢复数据迭代器和动态频率调节，在把运行时开销限制在约 3.5% 内的同时，把故障恢复损失从 epoch 级小时缩短到秒级。

#### 🎯 核心要点

- 将 DNN 检查点粒度从 epoch boundary 降到 iteration boundary，降低抢占、节点故障或进程失败后的重算 GPU 时间
- 检查点机制拆成 `snapshot()` 与 `persist()` 两阶段：先捕获一致内存快照，再异步写入持久存储
- 利用 DNN 迭代结构，把第 \(i\) 次迭代后的 snapshot 与第 \(i+1\) 次迭代的 forward/backward 重叠，只在下一次 weight update 前同步
- 当 GPU 有空闲显存时优先做 GPU-side snapshot，再异步拷到 CPU/磁盘；显存不足时退回 CPU-side snapshot
- 可恢复数据迭代器保存 epoch id 和已处理样本数，用确定性 shuffle 恢复随机顺序，保证每个 epoch 每个样本恰好使用一次
- 在线 profiling 根据迭代时间、weight update 时间、snapshot 时间、checkpoint size、磁盘吞吐和显存余量计算初始频率
- adaptive rate tuning 根据实际运行时反馈重新调整 checkpoint interval，确保开销不超过用户给定阈值 \(p\)
- PyTorch 可插拔实现基于 DALI 数据管线，只需少量训练脚本改动，并用 `torch.save()` + `fsync()` 保证持久化

#### 🔬 深入细节

![CheckFreq 训练架构图](https://img-blog.csdnimg.cn/direct/4bf1fbe3362242f9b675d3275835b475.png)
*图：CheckFreq 论文 Figure 3 的公开转存图。原始来源为 USENIX FAST'21 论文/幻灯片，图中包含 Iterator、Policy、Snapshot、Persist 和反馈回路。*

```python
# CheckFreq 机制与策略伪代码
class CheckFreqIterator:
    def __init__(self, dataset, model, optimizer, target_overhead_p):
        self.epoch = 0
        self.items_seen = 0
        self.k = None
        self.p = target_overhead_p
        self.inflight = None

    def profile_and_choose_k(self):
        Ti = profile_iteration_time()
        Tw = profile_weight_update_time()
        Tg = profile_gpu_snapshot_time()
        Tc = profile_cpu_snapshot_time()
        Ts = profile_persist_time()
        free_mem, total_mem = profile_gpu_memory()
        ckpt_size = estimate_checkpoint_size()

        snapshot_cost = Tg if free_mem >= ckpt_size else Tc
        visible_cost = max(0, snapshot_cost - (Ti - Tw)) + max(0, Ts - Ti)
        self.k = ceil(visible_cost / (self.p * Ti))

    def maybe_checkpoint(self, step, model, optimizer):
        if self.k is None:
            self.profile_and_choose_k()
        if step % self.k != 0:
            return

        if self.inflight and not self.inflight.done():
            self.inflight.wait()          # 保证任意时刻最多一个未完成 checkpoint

        state = {
            "model": snapshot(model),     # 与下一轮 forward/backward 流水线化
            "optimizer": snapshot(optimizer),
            "iterator": {"epoch": self.epoch, "items_seen": self.items_seen},
        }
        self.inflight = background_persist(state, fsync=True)

    def restore(self, checkpoint):
        load_model_and_optimizer(checkpoint)
        self.epoch = checkpoint["iterator"]["epoch"]
        self.items_seen = checkpoint["iterator"]["items_seen"]
        reseed_shuffle(epoch=self.epoch)
        skip_to(self.items_seen)
```

CheckFreq 的出发点是传统 DNN 容错策略的粒度太粗。很多训练脚本只在 epoch 结束保存模型，而现代 ImageNet/BERT 级训练中一个 epoch 可能持续数小时；作业被抢占或节点失败后，只能从上一个 epoch checkpoint 恢复，中间 GPU 计算全部浪费。若每个 epoch 有 \(n\) 次 iteration、单次耗时 \(T_i\)，epoch boundary checkpoint 的平均恢复损失近似为：

$$
R_{\text{avg,epoch}} \approx \frac{nT_i}{2}, \qquad
R_{\max,\text{epoch}} \approx nT_i
$$

CheckFreq 改为每 \(k\) 次 iteration 做一次 checkpoint，若系统保证最多只回滚一个完成 checkpoint，则恢复损失变为：

$$
R_{\max,\text{CheckFreq}} \le kT_i + T_{\text{restore}}
$$

因此核心问题变成：如何让 \(k\) 足够小，同时不让频繁 checkpoint 把训练拖慢。

两阶段 checkpoint 是 CheckFreq 的机制核心。传统同步 checkpoint 把模型状态复制、序列化和写盘全部放在训练关键路径，GPU 必须等待 CPU/磁盘完成。CheckFreq 将其拆成 `snapshot()` 和 `persist()`：`snapshot()` 捕获模型状态、optimizer 状态和 iterator 状态的一致副本；`persist()` 在后台把副本写到磁盘。关键观察是 DNN iteration 的状态修改位置很集中：forward/backward 主要读模型参数并计算梯度，真正改变 learnable parameters 的是 weight update。于是第 \(i\) 次 weight update 后开始的 snapshot 可以与第 \(i+1\) 次 forward/backward 重叠，只要在第 \(i+1\) 次 weight update 前确保 snapshot 完成，就不会混入下一次迭代的部分更新。

这个同步边界可以写成机制约束：

$$
\text{snapshot}_i.\text{finish} \le \text{weight\_update}_{i+1}.\text{start}
$$

若 snapshot 在下一次 weight update 前没完成，训练短暂停等；若完成了，checkpoint stall 基本被 forward/backward 计算隐藏。`persist()` 阶段也被后台化，但 CheckFreq 不允许无限堆积持久化任务：当策略准备发起下一个 checkpoint 时，如果上一个 persist 仍未完成，训练会等待它完成。这样保证任意时刻最多一个 in-flight checkpoint，故障时不会因为连续放弃未完成 checkpoint 而回滚到很旧状态。

CheckFreq 还利用 GPU snapshot 降低复制成本。如果 GPU 显存有足够余量，它先在 GPU 内存中复制模型状态，因为 GPU 内部复制远快于 GPU-to-CPU 传输；随后再异步把快照搬到 CPU 并写盘。如果显存不足，则直接做 CPU-side snapshot。这个选择会影响策略中的可见开销：当 snapshot 完全被 forward/backward 覆盖时，用户几乎只看到很小 stall；当 snapshot 或 persist 超过可覆盖窗口时，超出的部分必须通过增大 \(k\) 来摊薄。

频率策略不是固定经验值，而是在线 profiling + adaptive tuning。论文的 Algorithm 1 接收 \(T_i,T_w,T_c,T_g,T_s,m,M,M_{\max},p\) 等输入，其中 \(T_i\) 是 iteration time，\(T_w\) 是 weight update time，\(T_c/T_g\) 分别是 CPU/GPU snapshot 成本，\(T_s\) 代表持久化相关成本，\(m/M/M_{\max}\) 刻画显存可用性，\(p\) 是用户允许的开销比例。直觉上，若一次 checkpoint 的可见成本为 \(C_{\text{visible}}\)，为了把均摊开销限制在 \(p\) 内，需要：

$$
k \ge \left\lceil \frac{C_{\text{visible}}}{pT_i} \right\rceil
$$

论文举例说明：若 checkpoint 成本和 iteration 都是 1 个时间单位，阈值 \(p=5\%\)，则应每 20 次 iteration checkpoint 一次。运行中若其他作业共享存储导致写入变慢，iterator 会观察实际 checkpoint interval 的运行时间，并重新计算 \(k\)，这就是 adaptive rate tuning。

正确恢复还要求 dataloader 状态可恢复。若训练中断后只恢复模型参数，而数据迭代器重新随机 shuffle，可能在同一 epoch 重复或跳过样本，破坏“每个 epoch 每个样本恰好一次”的训练数据不变式。CheckFreq 的轻量 iterator 对每个 epoch 使用由 epoch id 派生的随机种子，checkpoint 时只保存 epoch id 和已消费的数据项数量；恢复时重建同一 shuffle 序列并跳到对应位置。这样不需要持久化整个预取队列或 DALI operator graph，状态很小，且随机裁剪/变换的顺序可确定恢复。

与 DeepFreeze 相比，CheckFreq 更完整地覆盖训练系统语义：它不只优化模型权重写入，还把 iterator、checkpoint frequency、GPU/CPU snapshot 选择和反馈控制纳入一个闭环。与单纯异步 `torch.save()` 相比，CheckFreq 的优势在于严格控制一致性边界和回滚界限；与 epoch checkpoint 相比，它牺牲少量持续开销，换取故障后少量 iteration 级恢复成本。论文在多个模型、存储后端和 GPU 代际上的结论是：CheckFreq 能把恢复时间从小时级降到秒级，并把运行时开销控制在 3.5% 以内。

> ⚠️ 注意：CheckFreq 的频繁 checkpoint 并不是“越频繁越好”。若 \(k\) 过小，snapshot/persist 无法被计算覆盖，训练吞吐会下降；若 \(k\) 过大，故障恢复损失又接近 epoch checkpoint。它的算法价值正在于自动寻找满足开销上限的最短间隔。

#### 🧪 练习题

```yaml
question: "CheckFreq 为什么要把 checkpoint 拆成 snapshot() 和 persist() 两阶段？"
options:
  - "为了让模型参数不再需要持久化到磁盘"
  - "为了先捕获一致内存快照，再把写盘放到后台并与训练计算重叠"
  - "为了把所有 checkpoint 都推迟到 epoch 结束"
  - "为了只保存 dataloader 状态而不保存模型状态"
answer: 1
explain: "snapshot() 负责在正确同步边界捕获一致状态，persist() 负责异步写入持久存储；两者分离后，CheckFreq 可以把大部分 checkpoint 成本与后续训练迭代重叠。"
```
