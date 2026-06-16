### Quiver

```yaml
id: quiver
name: Quiver
full_name: Quiver知情缓存 (Quiver)
year: '2020'
org: Microsoft
paper_url: https://www.usenix.org/conference/fast20/presentation/kumar
category: cache
parent: —
motivation: 内容哈希+可替代命中,跨作业重用
```

#### 📝 一句话总结

Quiver 提出面向深度学习训练的知情分布式缓存，利用内容哈希能力、可替代 cache hit、协作 miss 处理和收益感知分配，在多作业/多用户共享数据集时避免小缓存随机访问抖动并提升远端训练数据读取吞吐。

#### 🎯 核心要点

- **内容寻址安全共享**：缓存 key 不是文件名或 offset，而是数据项内容哈希；digest file 中的 hash 也充当访问 capability
- **可替代 cache hit**：训练 epoch 只要求随机且不重复地消费样本，不要求固定顺序；miss 时可返回缓存中尚未使用的替代样本
- **小缓存抗抖动**：当缓存只容纳 10%/20% 数据集时，Quiver 通过扩大候选 lookup 和替代命中避免 LRU 式随机访问 thrashing
- **协作 miss 处理**：多个同数据集作业随机拉取不同 miss，写入共享缓存后彼此复用，减少远端对象存储重复读取
- **收益感知 cache placement**：通过测量 cache hit 与 forced miss 的 mini-batch 时间，优先把容量分配给最受 I/O 影响的作业/数据集
- **与 PyTorch 数据层协同**：扩展 Dataset/DataLoader/Sampler，客户端运行在训练进程地址空间，cache server 以容器形式跑在 GPU VM 本地 SSD 上
- **实验结果**：论文在 48 GPU Azure 集群上显示，Quiver 可将部分 DLT 作业加速最高约 3.8x，并把混合工作负载集群吞吐提升最高约 2.1x

#### 🔬 深入细节

![Quiver 论文 Figure 1：架构图](https://www.usenix.org/system/files/fast20-kumar.pdf#page=5)
*图：Quiver cache server 运行在各 GPU VM 的独立容器中，Quiver client 集成在 DLT 作业内，cache miss 从用户云存储读取，数据集以内容哈希分片到多个 cache server。来源：USENIX FAST '20 官方论文 PDF Figure 1*

![Quiver 官方演示 slides：Architecture of Quiver](https://www.usenix.org/sites/default/files/conference/protected-files/fast20_slides_kumar.pdf#page=27)
*图：官方演示稿中的 Quiver client/server/cache manager 架构。来源：USENIX FAST '20 Open Access slides*

```python
# Quiver Algorithm 1 的简化伪代码：可替代命中 + 协作 miss
g_chunk_index = -1

def get_batch(size, dataset_id, job_id):
    # 1. 为一个 batch 随机多看一些尚未使用的候选样本
    pending = get_pending_indices(size * 10)
    hits = cache.lookup(content_hash(i) for i in pending)

    if len(hits) >= size:
        return pick_and_mark_used(hits, size)

    # 2. 命中不够时，先使用已有命中，再进入当前缓存 chunk
    result = pick_and_mark_used(hits, len(hits))

    global g_chunk_index
    if g_chunk_index < 0:
        g_chunk_index = cache_manager.current_chunk(dataset_id)

    checked = 0
    while checked < total_chunks(dataset_id):
        cache.inform_using_chunk(job_id, dataset_id, g_chunk_index)

        need = size - len(result)
        candidates = get_random_unused_indices(g_chunk_index, need)

        if not candidates:
            cache.inform_done_using_chunk(job_id, dataset_id, g_chunk_index)
        else:
            # 每个作业随机抓取一部分 miss，随后写入共享缓存
            fetched = remote_store.fetch(candidates)
            cache.insert({content_hash(x): x for x in fetched})
            result.extend(pick_and_mark_used(fetched, min(need, len(fetched))))

        if len(result) == size:
            return result

        g_chunk_index = (g_chunk_index + 1) % total_chunks(dataset_id)
        checked += 1

    return result
```

**动机与背景：云上 DLT 的远端对象存储和本地 SSD 都不完美**

Quiver 针对的是云 GPU VM 上的深度学习训练：训练数据可靠地放在 Azure Blob、S3 等远端对象存储中，GPU VM 有本地 SSD，但 VM 可能迁移、抢占或重启，本地 SSD 只是 soft state。多组超参搜索或团队内多作业常常读取同一数据集，每个作业又以不同随机顺序做 50-100 个 epoch。全量缓存很有效，但 ImageNet 全量、OpenImages、YouTube-8M 等数据集可能超过单机 SSD；部分缓存叠加随机访问会让 LRU 反复换入换出，缓存命中率低且远端带宽被多个作业重复消耗。

**内容哈希：同时解决跨用户复用和访问隔离**

Quiver 的缓存 key 是数据内容哈希，例如：

$$
k = H(\text{data item})
$$

每个用户为自己拥有的数据集生成 digest file，条目形如 `<content_hash, file_location>`。如果两个用户各自有 ImageNet 副本，文件路径和云账号不同，但相同样本的内容哈希相同，因此可以复用同一缓存对象。安全性来自 capability 思路：训练作业只有在 digest file 中持有某个 hash，才会向 cache server 请求该内容；由于哈希空间稀疏且抗碰撞，用户不能凭空猜出未授权数据的合法 hash。这样 Quiver 不需要把不同用户的文件命名空间合并，也能在 cache 层复用相同内容。

**可替代命中：训练 I/O 请求不是数据库查询**

Quiver 的关键观察是：一个 epoch 的正确性只要求每个样本被消费一次、每个 mini-batch 是随机样本集合，不要求“第 \(t\) 次请求必须返回原随机排列中的第 \(t\) 个文件”。因此，当 sampler 想拿 \(k\) 个样本时，可以多查 \(m\) 个候选，只要从缓存中拿到 \(k\) 个未使用样本即可。若缓存覆盖数据集比例为 \(c\)，随机看 \(m\) 个候选的期望命中数是：

$$
\mathbb{E}[\text{hits}] = c \cdot m
$$

要得到 batch size \(k\) 的命中，令 \(m \approx k/c\)。例如缓存只有 10% 数据时，查看约 \(10k\) 个候选就期望得到 \(k\) 个可替代命中。普通缓存面对随机 permutation 会不断 miss；Quiver 则把“必须命中特定对象”放宽为“命中任何尚未使用且保持随机性的对象”，因此小缓存也能贡献接近 cache-hit 的训练步。

> 💡 关键：Quiver 改变的是数据加载器和缓存之间的契约，不改变训练样本分布；论文在 ResNet50/ImageNet 和 DeepSpeech2/LibriSpeech 上验证了 chunked/substitutable sampling 不显著影响最终精度。

**协作 miss：让多个作业自然分摊远端读取**

多作业读同一数据集时，传统方案会让每个作业各自从远端对象存储读取相同 miss。Quiver 利用每个作业随机 permutation 不同这一事实：当 cache miss 发生时，各作业随机抓取不同子集并插入共享 cache；随后再次 lookup 时，不只命中自己刚插入的数据，也会命中其他作业刚插入的数据。这个过程不需要中心化调度每个 miss，因为随机化本身就把 miss 分散到不同作业。远端读取次数从“每作业一遍”趋近于“跨作业合计一遍”：

$$
R_{\text{baseline}} \approx J \cdot |D|,\qquad
R_{\text{quiver}} \approx |D| + \epsilon
$$

其中 \(J\) 是同数据集作业数，\(\epsilon\) 是重复抓取和时序错位带来的额外读取。对超参搜索这类多作业工作负载，这直接缓解远端 blob/store 的出口带宽瓶颈。

**容量管理：从“命中率最高”转向“节省 GPU 时间最多”**

Quiver 不把缓存空间平均分给所有数据集，而是测量每个作业对缓存的敏感性。Cache manager 会短暂强制某个作业 miss，得到 miss 下的平均 mini-batch 时间 \(t_i^m\)，再对比 hit 下时间 \(t_i^h\)，定义收益：

$$
b_i = \frac{t_i^m}{t_i^h}
$$

如果作业占用 \(n_i\) 个 GPU，则缓存该作业数据能节省的 GPU 资源可估为：

$$
g_i = b_i \cdot n_i
$$

同一数据集 \(D_k\) 被多个作业访问时，总收益为：

$$
G_{D_k} = \sum_{i \in Jobs(D_k)} g_i
$$

Cache manager 在固定容量 \(S\) 下按 benefit/cost 比贪心选择：全量缓存某数据集、缓存双缓冲 chunk 以启用协作 miss，或完全不缓存。这个策略避免把宝贵 SSD 空间浪费在计算时间远大于 I/O 时间、即使 miss 也不拖慢 GPU 的作业上。

**与传统缓存的区别**

| 维度 | 通用 LRU/文件缓存 | Quiver |
|------|------------------|--------|
| key | 文件名、路径、offset | 内容哈希 |
| 命中语义 | 必须命中特定请求对象 | 可返回随机且未使用的替代对象 |
| 多用户复用 | 受命名空间和权限隔离限制 | digest hash 作为 capability，内容相同即可复用 |
| 小缓存行为 | 随机 epoch 下容易 thrash | 候选扩大 + chunk 双缓冲避免 thrash |
| 多作业 miss | 多个作业重复拉取相同远端对象 | 随机 miss 分摊，插入后互相命中 |
| 目标函数 | 命中率或最近访问 | mini-batch 时间和 GPU 资源收益 |

#### 🧪 练习题

```yaml
question: "Quiver 的可替代 cache hit 为什么能让小缓存仍然有效？"
options:
  - "它要求训练作业固定使用同一个样本顺序"
  - "它把所有样本压缩成同一个文件，消除随机访问"
  - "它利用 mini-batch 只需随机且不重复样本的性质，可用缓存中的未使用样本替代特定 miss"
  - "它完全跳过 cache miss 对应的训练样本并减少 epoch 大小"
answer: 2
explain: "DLT epoch 不要求精确文件顺序；只要样本随机且每轮不重复，Quiver 就能从缓存中返回替代样本，从而避免部分缓存被随机访问模式击穿。"
```
