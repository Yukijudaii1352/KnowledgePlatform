### AIStore

```yaml
id: aistore
name: AIStore
full_name: NVIDIA AIStore (AIStore)
year: '2019'
org: NVIDIA
paper_url: https://aiatscale.org/
category: cache
parent: —
motivation: 集成ETL,存储节点直接数据增强
```

#### 📝 一句话总结

AIStore 提出面向 AI 工作负载的弹性对象存储与快速数据层，把对象存储、远端 bucket 缓存、批量预取、分布式 reshuffling 和存储节点侧 ETL 结合起来，解决大规模训练中数据读取、格式转换和增强远离数据导致的吞吐瓶颈。

#### 🎯 核心要点

- **Proxy/Target 双角色架构**：proxy 负责前端 API、控制面和 cluster map，target 负责本地磁盘上的对象数据
- **线性扩展目标**：对象通过一致性/HRW 类策略均衡分布到 target，本地磁盘聚合为横向扩展对象命名空间
- **Fast tier 模式**：可部署在 S3、GCS、Azure Blob、OCI 等远端后端前面，通过 cold GET 和 batch prefetch 形成热数据层
- **存储侧 ETL**：用户 transformation container 与 target 同置，支持 inline GET 变换和 offline bucket-to-bucket 变换
- **AI 数据集重排**：dSort/iShard 将小文件或原始样本重组为训练友好的 shard，减少小文件 IOPS 与随机读开销
- **数据保护和校验**：提供端到端 checksum、N-way mirroring、erasure coding 与 self-healing，但 EC 不进入读写 fast path
- **多协议与工具链**：提供原生 API、S3 兼容 API、CLI、Go/Python SDK、PyTorch/TensorFlow 集成和 get-batch 训练批读取

#### 🔬 深入细节

![AIStore 高层架构图](https://files.buildwithfern.com/aistore.docs.buildwithfern.com/aistore/704f52e9f375d6e4dee9aae87072a51cb3adf4b4e066f3993d2a5826fb3f7b0e/pages/images/cluster-block-v3.26.png)
*图：AIS cluster 聚合任意数量的 proxy 与 target，对前端提供原生/S3/API/SDK，对后端连接 S3、GCS、OCI、Azure Blob 或其他 AIS cluster。来源：NVIDIA AIStore In-depth Overview*

![AIStore ETL 存储侧变换](https://files.buildwithfern.com/aistore.docs.buildwithfern.com/aistore/29c18ca1b57638d9fc60567413d14a3392db2fb9c7a4d1269d3bb89dc2a3e591/pages/images/etl-v3.3.png)
*图：ETL container 在 AIS target 侧与数据同置，TensorFlow/PyTorch 训练流可以通过 REST/YAML API 获取 inline transformation 的结果。来源：NVIDIA AIStore In-depth Overview*

```python
# AIStore 训练数据访问与存储侧 ETL 伪代码
class AISCluster:
    def get_object(self, bucket, key, etl=None):
        target = hrw_select_target(bucket, key, self.cluster_map.targets)

        if not target.has_valid_object(bucket, key):
            # Fast tier: cold GET from remote backend, then cache in AIS target
            obj = remote_backend.get(bucket, key)
            target.put(bucket, key, obj, checksum=obj.crc32c)

        obj = target.read(bucket, key)

        if etl is None:
            return obj

        # Inline ETL: transformation pod runs close to target-local data
        transformed = target.etl_runtime[etl].transform(obj)
        return transformed

def prefetch_training_range(bucket, keys):
    for key in keys:
        submit_background_xaction("prefetch", bucket=bucket, key=key)

def offline_etl(src_bucket, dst_bucket, etl_name):
    for target in cluster.targets:
        for key in target.local_keys(src_bucket):
            y = target.etl_runtime[etl_name].transform(target.read(src_bucket, key))
            target.put(dst_bucket, key, y)
```

**动机与背景：AI 数据不只是“存下来”，还要以训练友好的形态被持续消费**

大规模训练通常面对两个同时存在的问题：一是数据集巨大，远端对象存储可靠但延迟和出口带宽有限；二是原始数据往往不是模型直接可用的 batch，例如小文件图像需要 decode/resize，音频需要重采样，文本或 WebDataset shard 需要解包、过滤和重新排序。传统分布式文件系统强调 POSIX 语义或通用块/文件抽象，而 AIStore 选择对象语义加 AI 数据路径优化：让应用保留对 shard 边界、样本格式和变换逻辑的控制，存储层负责把数据靠近 GPU 集群、均衡到磁盘、并在 target 侧并行处理。

**核心架构：proxy 做控制面，target 做数据面**

AIS cluster 有两类节点。Proxy（gateway）是前端入口，处理原生 API/S3 API/SDK/CLI 请求、维护 cluster map、做认证和重定向；Target 是真正持有对象的存储节点，管理 mountpath、本地文件系统和对象校验。读写路径尽量避免中心化元数据服务，目标对象位置由 bucket/key 和 cluster map 计算得出：

$$
target(o) = \arg\max_{t \in T} H(o, t)
$$

这里 \(H(o,t)\) 可理解为对对象和 target 的 rendezvous/HRW 打分。加入或移除 target 时，只需要迁移受影响 key 空间的一部分对象；稳定状态下，每个 target 承担大约 \(1/|T|\) 的 namespace。聚合吞吐近似为所有 target 磁盘和网络能力之和：

$$
BW_{\text{cluster}} \approx \sum_{i=1}^{N} BW_{\text{target}_i}
$$

> 💡 关键：AIStore 的扩展点是 target 本地磁盘和数据面并行，不是让所有请求穿过单个 metadata server；proxy 主要是入口和控制面。

**Fast tier：cold GET、prefetch 与本地热数据层**

当 AIS 部署在 S3/GCS/Azure Blob/OCI 前面时，它可以作为 fast tier。第一次 GET 如果本地 target 没有对象、checksum 不正确或版本过旧，就执行 cold GET 从远端后端拉取，然后在 AIS 中保留副本；后续 GET 直接由 AIS target 服务。训练开始前也可根据 manifest、range 或对象列表触发 batch prefetch，让后台 xaction 提前填充热数据。这个模式把远端对象存储从每步训练的关键路径挪到后台和 cache miss 路径中：

$$
T_{\text{get}} =
\begin{cases}
T_{\text{local-target}}, & \text{cache hit in AIS} \\
T_{\text{remote-backend}} + T_{\text{fill}}, & \text{cold GET}
\end{cases}
$$

对多 epoch 训练而言，第一轮可能负责填充热层，后续 epoch 主要受本地 target 聚合带宽约束。与普通 HTTP cache 不同，AIS 同时保留对象存储语义、bucket 配置、校验、远端版本感知和训练工具链，因此更像“可持久化的 AI 数据平面”。

**存储侧 ETL：把变换移动到数据所在的 target**

AIStore 的 ETL 是它区别于通用对象存储的关键设计。用户将 transformation 逻辑封装成容器或脚本，由 AIS 在 Kubernetes/target 环境中运行。Inline ETL 在每次 GET 时即时变换并返回结果，适合动态参数、轻量增强或推理前处理；Offline ETL 类似带变换的 bucket copy，把源 bucket 的对象批量处理后写入目标 bucket，适合长期复用的格式转换。这样可以把大量 I/O 密集型预处理限制在存储集群内部，避免“读到客户端、处理、再写回”的双倍网络成本：

$$
Cost_{\text{client-ETL}} \approx R_{\text{src}\to\text{client}} + C_{\text{transform}} + W_{\text{client}\to\text{dst}}
$$

$$
Cost_{\text{AIS-ETL}} \approx R_{\text{target-local}} + C_{\text{target-transform}} + W_{\text{target-local/dst}}
$$

当变换与数据同置且每个 target 并行处理本地对象时，端到端时间由最慢 target 的分片决定，而不是由单客户端或单预处理节点决定。对训练数据增强来说，这意味着可以在存储节点直接执行解码、重采样、格式转换、过滤、压缩格式重写等工作，再把训练真正需要的样本流交给 PyTorch WebDataset 或 TensorFlow Dataset。

**dSort/iShard：不要在存储层盲目切块，而是生成训练友好的 shard**

AIStore 文档强调，AI 数据集常常已经按应用语义预分片；存储系统不应强行把对象切成需要复杂全局元数据重组的小块。相反，AIS 提供 dSort/iShard 这类数据集转换能力：把大量小文件或原始目录转成 tar/zip/tar-lz4 等 shard，并可按 key 或内容排序。其目标不是最大化小文件 IOPS，而是把样本组织成后续训练容易顺序读取、批量读取和随机打散的格式。对于 GPU 训练，这通常比优化单个小文件 lookup 更有效，因为数据加载器需要的是连续的样本批，而不是 POSIX 目录树本身。

**可靠性权衡：checksum 和冗余存在，但 fast path 仍优先性能**

AIS 为对象维护端到端 checksum，支持 N-way mirroring 和 erasure coding，并能在检测损坏时 self-heal。值得注意的是，文档明确指出 EC 的哲学是 recovery，EC 不参与 fast path；AIS 总是保留 HRW 位置上的完整副本，以免每次读取都要做纠删码重构。这个取舍符合训练场景：高吞吐、低尾延迟的热路径优先，冗余和恢复能力作为后台或异常路径保障数据可靠性。

#### 🧪 练习题

```yaml
question: "AIStore 将 ETL container 放在 target 侧运行的主要收益是什么？"
options:
  - "让 proxy 保存所有对象内容，减少 target 数量"
  - "把数据变换靠近本地对象执行，减少客户端往返和远端读写放大"
  - "强制所有数据集都按固定块大小切分"
  - "用 erasure coding 替代所有对象读取"
answer: 1
explain: "Target 侧 ETL 让变换在数据所在节点并行执行，inline 或 offline 结果可直接服务训练或写回 bucket，避免把原始数据搬到客户端再处理。"
```
