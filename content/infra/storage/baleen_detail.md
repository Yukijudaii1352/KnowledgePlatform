### Baleen

```yaml
id: baleen
name: Baleen
full_name: Baleen ML缓存 (Baleen)
year: '2024'
org: CMU
paper_url: https://www.usenix.org/conference/fast24/presentation/wong
category: cache
parent: quiver
motivation: ML驱动准入与预取决策
```

#### 📝 一句话总结

Baleen 提出基于 `episodes` 缓存驻留模型的 ML 准入与预取协同策略，解决 flash cache 在写入耐久约束下难以同时降低后端硬盘峰值负载和写放大的问题。

#### 🎯 核心要点

- **面向 flash cache 的端到端目标**：不直接优化 IO hit rate 或 byte hit rate，而优化 Disk-head Time，用 HDD seek 与读带宽共同衡量后端负载
- **episodes 驻留模型**：把同一 block 在一次缓存驻留期内可能命中的访问聚合为一个 episode，用于离线打标、收益估计和预取范围学习
- **OPT 近似教师策略**：按 `DT saved / episode size` 为 episode 打分，在 flash write budget 内选择最值得写入的 episode，生成监督学习标签
- **ML admission**：将 miss 上的准入建模为二分类，使用请求元数据和最近 1-6 小时访问计数等特征训练 GBM/LightGBM 模型
- **ML prefetching**：拆成 `ML-Range` 和 `ML-When` 两个子问题，前者预测应预取的 segment 范围，后者判断预取收益是否超过风险阈值
- **系统集成边界清晰**：CacheLib 负责 segment 级准入与缓存，bulk storage/Tectonic 侧在发现 miss 后执行跨 segment 预取
- **评估结果**：在 7 个 Meta Tectonic traces 上，Baleen 默认写入率下比最佳基线平均降低 12% Peak Disk-head Time；Baleen-TCO 通过选择写入率降低约 17% 估算 TCO

#### 🔬 深入细节

![Baleen 架构图](https://chameleoncloud.org/media/filer_public/e5/ee/e5ee9cb2-0f19-4da8-b630-ee5718b11e0b/image6.png)
*图：Baleen 的离线训练与在线部署架构。训练 trace 被转换为 episodes 后用于训练 admission policy 与 prefetcher；部署时 admission policy 在 CacheLib 中决定是否写入 flash，prefetching 在 bulk storage/Tectonic 请求路径中扩展后端读取范围。来源：Chameleon 官方 Baleen 博客 Figure 3。*

![Baleen episodes 模型](https://chameleoncloud.org/media/filer_public/6b/27/6b2722fc-dede-4c0d-8c68-0590f0eebdb7/image3.png)
*图：episodes 通过访问间隔和平均 eviction age 把访问流切分为缓存驻留期。来源：Chameleon 官方 Baleen 博客 Figure 2。*

```python
# Baleen 的离线训练与在线决策伪代码
def build_episodes(trace, eviction_age):
    episodes = []
    for block_id, accesses in group_by_block(trace):
        cur = []
        for access in sorted(accesses, key=lambda x: x.time):
            if cur and access.time - cur[-1].time > eviction_age:
                episodes.append(cur)
                cur = []
            cur.append(access)
        if cur:
            episodes.append(cur)
    return episodes

def train_baleen(trace, target_flash_write_rate):
    assumed_ea = hours(2)
    while True:
        episodes = build_episodes(trace.train_day, assumed_ea)
        for ep in episodes:
            ep.score = disk_head_time_saved(ep) / segment_span_size(ep)

        opt_admitted = choose_top_episodes_under_write_budget(
            episodes, target_flash_write_rate
        )
        admission_model = train_gbm_classifier(
            features=first_k_access_features(episodes, k=6),
            labels=[ep in opt_admitted for ep in episodes],
        )
        range_model = train_regressors_to_predict_opt_range(opt_admitted)
        when_model = train_prefetch_benefit_classifier(opt_admitted, epsilon_ms=5)

        stats = simulate_cachelib(trace.train_day, admission_model, range_model, when_model)
        if close(stats.avg_eviction_age, assumed_ea):
            return admission_model, range_model, when_model, stats.threshold
        assumed_ea = stats.avg_eviction_age

def serve_request(req, cache, models):
    hit_segments, miss_segments = cache.lookup(req.block_id, req.segment_range)
    if not miss_segments:
        return cache.read(req)

    if models.admission.predict(req.features) > models.threshold:
        cache.admit(req.block_id, miss_segments)

    if models.when.predict(req.features) and any(hit_segments):
        start, end = models.range.predict(req.features)
        extra = segments_between(start, end) - hit_segments - miss_segments
        backend_read(req.block_id, miss_segments | extra)
        cache.admit(req.block_id, extra)
    else:
        backend_read(req.block_id, miss_segments)
```

**动机与背景：flash cache 的核心矛盾不是容量，而是写入预算。** 在 bulk storage 中，HDD 提供低成本大容量，但随机 IO 能力有限；flash cache 能吸收热点访问，却受 SSD endurance 限制。若每次 miss 都写入 flash，论文中的 traces 最高可达到几十个 drive-writes-per-day，远超常见 3 DWPD 假设，导致 SSD 寿命被压缩到数月级。因此准入策略必须回答：一次 flash write 是否能在未来节省足够多的 HDD disk-head time。Baleen 的关键取舍是把 flash write 当成稀缺预算，而不是把 cache hit 当成唯一目标。

**Disk-head Time 是 Baleen 的系统目标函数。** 对一次后端 IO，Baleen 用 seek 固定成本和按字节读取成本组合衡量 HDD 资源消耗：

$$
DT_i = t_{\mathrm{seek}} + n_i \cdot t_{\mathrm{read}}
$$

对一个时间窗口，后端利用率可写成：

$$
Util_{DT} =
\frac{\sum_i DT_i}{DT_{\mathrm{provisioned}}}
=
\frac{Fetches_{IO}\cdot t_{\mathrm{seek}} + Fetches_{Bytes}\cdot t_{\mathrm{read}}}{DT_{\mathrm{provisioned}}}
$$

这比 IO miss rate 更稳健，因为两个访问序列可能有相同 miss 数，却读取完全不同的字节量；也比 byte miss rate 更完整，因为小随机 IO 的 seek 成本会主导 HDD 负载。Baleen 训练模型时围绕 DT saved 构造标签，避免出现“命中率提高但后端峰值负载变差”的错配。

**episodes 把难以训练的在线缓存问题转成可监督学习的问题。** 传统访问流中的每次决策相互影响：一次准入会改变未来 hit/miss、eviction age 和写入预算。Baleen 用 LRU 的平均 eviction age 近似缓存驻留期，把同一 block 中相邻访问间隔不超过 eviction age 的访问归为一个 episode。episode 的收益是若在开头准入可节省的 DT，成本是需要写入的 segment 范围大小。这样，准入决策可以近似看成对 episode 的选择：

$$
Score(E)=\frac{DT_{\mathrm{saved}}(E)}{Size(E)}
$$

OPT 先离线生成 episodes，再按上述分数排序，并在 flash write budget 内选择前若干个 episode。这个 OPT 不是线上可实现的真最优，因为它看到了未来 trace，但它给 Baleen 生成了可解释的监督标签：某个 miss 所属 episode 是否值得准入。

**ML admission 的设计重点是边界样本，而不是热门样本。** 论文将准入建模为二分类：miss 的特征输入 GBM，输出概率超过阈值则写入 flash。特征包括请求来源元数据（namespace、user、temporary/permanent 标签）以及最近 1-6 小时 block/segment 访问计数。训练时只取每个 episode 的前 6 次访问，避免大热门 episode 产生过多训练样本并掩盖“只有少量未来命中但总体数量很多”的边界 episode。阈值不是固定超参，而是通过在线 simulator 反复调整，使最终模拟的 flash write rate 达到目标预算。

**预取被拆成 what 和 when 两个模型。** 当某次 miss 已经必须访问 HDD 时，系统可以扩大读取范围，顺便把未来可能访问的 segment 写入 flash。问题在于预取错误同时浪费 HDD DT、flash write 和 cache space。Baleen 先用 `OPT-Range` 定义一个 episode 内覆盖所有未来访问的最小 segment 范围，再训练两个回归器预测 `ML-Range` 的 start/end；随后用 `ML-When` 判断预取是否值得做。论文中的收益判定可以概括为：

$$
PFBenefit^{OPT}_{eps} = DT^{NoPrefetch}_{eps} - DT^{OPT\text{-}Range}_{eps}
$$

$$
PFBenefit^{ML}_{eps} =
\begin{cases}
0, & \text{if underfetch}\\
PFBenefit^{OPT}_{eps} - OF, & \text{otherwise}
\end{cases}
$$

$$
MLWhen(eps)=PFBenefit^{ML}_{eps}>\epsilon
$$

其中 `underfetch` 表示预测范围未覆盖 OPT-Range，`OF` 是额外 segment 带来的 overfetch DT 成本，\(\epsilon\) 是保守阈值，用来抵消未知的 cache space 与写入机会成本。

**与传统策略的区别在于协同和可解释性。** CoinFlip 只用概率控制写入率，RejectX 只按历史出现次数过滤 one-hit-wonder，CacheLib-ML 类方法容易把模型训练目标放在单次访问命中或分类准确率上。Baleen 的不同点是：先用 episodes 把一次写入的完整生命周期显式化，再让 admission 与 prefetch 共享同一收益模型，并用 DT/TCO 而不是中间命中指标做优化目标。因此它不是简单“给缓存加一个模型”，而是把缓存控制面重写为一个可离线验证、可在线模拟、可在生产 CacheLib 路径中部署的 ML-for-systems 流程。

#### 🧪 练习题

```yaml
question: "Baleen 为什么引入 episodes，而不是直接用每次访问的 hit/miss 训练准入模型？"
options:
  - "episodes 可以把一次写入在整个缓存驻留期内的收益和成本绑定起来，生成更接近准入决策的监督标签"
  - "episodes 主要用于压缩图片数据，减少训练 trace 的存储空间"
  - "episodes 让 CacheLib 不再需要 eviction policy"
  - "episodes 只用于替代 GBM 模型中的特征归一化"
answer: 0
explain: "flash 准入的成本在写入时一次性发生，收益却分布在后续多个访问上；episodes 把这些访问聚合为一次驻留期，使 OPT 打分和 ML 标签更贴近真实准入决策。"
```
