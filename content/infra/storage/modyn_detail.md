### Modyn

```yaml
id: modyn
name: Modyn
full_name: Modyn数据流水线平台 (Modyn)
year: '2025'
org: 学术研究
paper_url: https://arxiv.org/abs/2312.06254
category: cache
parent: cedar
motivation: 动态数据集,端到端训练优化
```

#### 📝 一句话总结

Modyn 提出面向持续增长数据集的端到端 ML pipeline orchestrator，用触发策略和数据选择策略声明“何时训练、训练哪些样本”，并通过 sample-level 数据管理、预取与并行读取保持接近顺序读取的训练吞吐。

#### 🎯 核心要点

- **动态数据集 pipeline 抽象**：把持续到来的样本流、触发训练、数据选择、训练配置、模型存储和评估统一为可声明 pipeline
- **触发策略**：支持按样本数量、时间、性能退化和数据漂移触发 retraining，避免固定周期全量重训
- **数据选择策略**：把 presampling 与 downsampling 分离，支持 uniform/class-balanced/trigger-balanced、RS2、loss、DLIS、uncertainty、CRAIG、GradMatch 等策略
- **Composite model 评价**：把一个 pipeline 生命周期内训练出的多个模型映射到统一 evaluation intervals，公平比较不同触发/选择策略
- **模块化分布式架构**：Supervisor、Selector、Storage、Trainer Server、Model Storage、Evaluator 通过 gRPC/FTP 协同
- **高吞吐 sample-level retrieval**：OnlineDataset、TriggerSampleStorage、C++ Storage、partition buffer、prefetch threads 和 gRPC streaming 共同减少随机样本读取 stalls
- **模型快照管理**：Model Storage 支持 full model 与 incremental delta 策略，类似视频编码中的 I-frame/P-frame
- **实验定位**：论文展示 Modyn 在推荐系统和视觉 workloads 中可用 sample-level 数据选择达到接近本地顺序读取的吞吐，并支持策略准确率/成本分析

#### 🔬 深入细节

![Modyn 系统架构](https://ar5iv.labs.arxiv.org/html/2312.06254/assets/img/modyn_sys.svg)
*图：Modyn 系统架构。数据源进入 Storage，Supervisor 根据 trigger policy 编排 pipeline，Selector 生成 trigger training set，Trainer 拉取样本并训练，Model Storage 保存模型，Evaluator 评估模型序列。来源：ar5iv 渲染的 arXiv 论文 Figure 3。*

![Modyn OnlineDataset 架构](https://ar5iv.labs.arxiv.org/html/2312.06254/assets/img/dataloading.svg)
*图：OnlineDataset 通过 worker、partition buffer、prefetching threads、Selector 与 Storage gRPC 请求，把 sample-level key list 转换为训练 batch。来源：ar5iv 渲染的 arXiv 论文 Figure 6。*

```python
# Modyn 持续训练 pipeline 伪代码
class ModynPipelineExecutor:
    def run(self, stream):
        for batch in stream:  # S_t = (s_1, ..., s_n)
            sample_keys = storage.ingest(batch)
            supervisor.notify_new_samples(sample_keys)

            trigger_points = trigger_policy.decide(batch, pipeline_state)
            for trigger in trigger_points:
                # 1. Selector 生成第 r 次 trigger 的训练集合
                window = selector.data_window(trigger, policy.window)
                presampled = selector.presample(window)
                tss_path = trigger_sample_storage.write_partitions(presampled)

                # 2. Trainer 使用 OnlineDataset 按 key 拉取样本
                dataset = OnlineDataset(
                    trigger_sample_storage=tss_path,
                    selector=selector,
                    storage=storage,
                    partition_buffer_size=B,
                    prefetch_threads=P,
                )
                model = model_storage.load_previous_if_needed()
                trained_model = trainer.train(model, dataset, downsampler=policy.downsampler)

                # 3. 保存并评估
                model_id = model_storage.store(trained_model, incremental=True)
                evaluator.evaluate(model_id, interval_generation_fn)

class OnlineDatasetWorker:
    def prefetch_loop(self):
        while has_more_partitions():
            keys = selector.get_partition_keys(worker_id, partition_id)
            # Storage 将任意 key set 按文件分组并并行读 payload
            for payload in storage.stream_payloads(keys):
                partition_buffer.put(payload)

    def __iter__(self):
        while training:
            payload = partition_buffer.get()
            tensor = bytes_parser(payload.bytes)
            tensor = apply_transformations(tensor)
            yield tensor, payload.label, payload.weight
```

**动机与背景：真实 ML 数据不是静态 benchmark，而是不断增长的时间序列。** 生产模型的数据来自点击流、传感器、日志或用户内容，分布会随时间漂移；模型需要吸收新数据，但每来一批数据就从头全量重训成本不可接受。训练成本可粗略写成：

$$
Cost(P)\propto \sum_{r=1}^{R_P} |D_r|\cdot C_{\mathrm{train}}(m_r)
$$

其中 \(R_P\) 是 pipeline 生命周期内触发训练次数，\(D_r\) 是第 \(r\) 次触发选择出的训练集。Modyn 的核心问题因此被拆成两维：triggering policy 决定何时训练，data selection policy 决定训练哪些样本。相比只记录实验的 MLFlow/W&B 或只支持固定工作流的部分平台，Modyn 直接把这两个策略作为系统一等公民。

**Modyn 对动态 pipeline 做形式化建模。** 数据流在离散时间进入，批次为 \(S_t=(s_1,\ldots,s_{n_t})\)。触发策略可以表示为：

$$
\pi:\mathcal{P}(S)\rightarrow \bigcup_{n=0}^{\infty}\mathcal{P}([1,\ldots,n])
$$

它对每个到来的 batch 输出哪些样本位置触发新训练。若样本 \(s_k\in S_t\) 导致第 \(r\) 次 trigger，系统已观察到的数据为：

$$
D^{tot}_r=\{s_i\in S_t\mid i\le k\}\cup\bigcup_{t'<t} set(S_{t'})
$$

数据选择策略则是一个赋权函数：

$$
\xi_r:D^{tot}_r\rightarrow \mathbb{R}^{|D^{tot}_r|}
$$

权重大于 0 的样本进入第 \(r\) 次 trigger training set \(D_r\)，权重还可在反向传播时乘到梯度上。这套定义让“全量重训”“只用新增数据 fine-tune”“混合旧数据防遗忘”“只选高 loss 样本”等策略都能落在同一抽象下。

**Composite model 解决不同 retraining 策略的公平评价。** 一个 pipeline 会训练出模型序列 \(M_P=(m_1,\ldots,m_R)\)，不同触发策略得到的模型时间戳不同，不能只看最后一个模型或用各自训练区间评价。Modyn 先定义统一 evaluation intervals \(\varphi\)，再定义 composite model 映射：

$$
\mu_P:\varphi\rightarrow M_P
$$

例如 currently-active composite model 会把每个评价窗口映射到该窗口 anchor 之前最近完成训练的模型：

$$
\mu^{active}_P(\varphi_i)=
\arg\max_{m_x\in M_P}\{t^e_x\mid t^e_x\le \tau^a_i\}
$$

这样，不同 pipeline 可以在同一时间窗口序列上比较 accuracy、ROC-AUC、训练成本和系统吞吐，避免“训练越频繁就评价窗口越短”带来的偏差。

**系统架构按职责拆分，热路径用 C++ 保吞吐。** Supervisor 负责接收 CLI 提交的 pipeline，并以 PipelineExecutor 状态机执行触发逻辑；Selector 负责 presampling 状态和 trigger training set 生成；Trainer Server 启动通用训练循环，支持 PyTorch、mixed precision、learning-rate scheduler 和在线 featurization；Storage 管理样本元数据与 payload 读取；Model Storage 保存 full model 或 incremental delta；Evaluator 对每个模型执行滑动/滚动窗口评估。论文实现中，数据抓取热路径放在 C++，策略接口保留 Python，兼顾研究扩展性和运行效率。

**Selector 把 presampling 与 downsampling 分层。** Presampling 在训练前选择候选样本，可在线或离线执行；例如 class-balanced、uniform、trigger-balanced、混合旧数据等策略可在 Selector 中维护状态。Downsampling 需要 forward pass 信息，因此发生在 Trainer 中，例如 loss sampling、DLIS、uncertainty、CRAIG、GradMatch。Modyn 还区分 sample-then-batch 与 batch-then-sample 模式：前者先为所有样本建立选择状态再训练，后者对 batch 做 forward 后挑子集并累积成反向传播 batch。这个设计让研究者只实现策略逻辑，不必重写存储、调度和训练循环。

**Fast Data Retrieval 是 Modyn 的系统核心。** 数据选择输出的是任意 sample keys，而不是连续文件范围；若逐 key 同步读取，GPU 会被随机 IO 和网络往返拖空。Modyn 先用 TriggerSampleStorage 将固定 trigger training set 按 partition 写入本地二进制文件，避免每个 epoch 都查数据库。OnlineDataset 的每个 PyTorch worker 拿到各 partition 的份额后，启动多个 prefetching threads：先向 Selector/TSS 拉 key list，再向 Storage 以 gRPC streaming 拉 payload。worker 主线程只要 buffer 中已有 payload，就立即执行 bytes parser 和 transformations 并产出 tensor，不等待整个 partition 下载完成。

**Storage 把任意 key set 重排为高效文件读取。** Storage 用 Postgres 追踪 sample ID、label、source file 和文件内位置，底层 FileSystemWrapper 抽象本地文件或未来的 S3，FileWrapper 抽象 CSV、定长 binary、单样本图片等格式。收到一组 keys 后，Storage 会把 key list 切成多个部分并行处理；每个线程查询元数据后按 source file 分组，批量实例化 FileWrapper，从文件中提取样本并填入 send buffer，buffer 满或文件读完就流式返回给 worker。对推荐系统常见的定长 binary 数据，BinaryFileWrapper 使用避免整文件加载的 `std::ifstream` 与端序优化解析，减少内存复制。

**与 cedar 的关系是层级不同。** cedar 关注单次训练作业内部的输入管道优化：operator 如何重排、缓存、offload、prefetch。Modyn 关注动态数据集上的 pipeline 生命周期：何时触发训练、选择哪些历史样本、如何调度训练、如何保存模型和评价模型序列。Modyn 的 OnlineDataset 同样使用预取和并行读取，但服务于 sample-level data selection；cedar 的 optimizer 则服务于通用数据变换图的自动物理计划选择。

#### 🧪 练习题

```yaml
question: "Modyn 中 TriggerSampleStorage (TSS) 的主要作用是什么？"
options:
  - "把每次 trigger 固定下来的训练样本 key/weight 按 partition 持久化，供 Trainer worker 快速并行读取"
  - "替代 Model Storage 保存完整 PyTorch 模型参数"
  - "在 GPU 显存中缓存所有样本 payload"
  - "根据 validation accuracy 自动选择学习率"
answer: 0
explain: "数据选择产生的是任意 sample key 集合；TSS 将其按固定 partition 写入高效二进制格式，OnlineDataset worker 可并行取 key 并预取 payload，减少训练期数据 stalls。"
```
