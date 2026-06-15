### Feast

```yaml
id: feast
name: Feast
full_name: Feast特征存储 (Feast)
year: "2019"
org: Gojek/Google
paper_url: https://feast.dev/
category: mlops_lifecycle
parent: kubeflow
motivation: 首个开源特征存储，解决训练与推理数据一致性
```

#### 📝 一句话总结

Feast 提出开源特征存储，把离线训练特征和在线推理特征用统一定义管理，解决训练-服务特征不一致、重复特征工程和低延迟在线读取问题。

#### 🎯 核心要点

- FeatureView/Entity 定义特征语义、主键、时间戳和数据源
- 离线 store 用于训练集构建和 point-in-time join，在线 store 用于低延迟 serving 查询
- materialization 将离线计算好的最新特征同步到 Redis/DynamoDB 等在线存储
- Registry 保存特征定义、版本和 lineage，支持团队复用特征
- 强调 time-aware join，避免训练样本使用未来信息造成数据泄漏

#### 🔬 深入细节

> 图示说明：官方架构可概括为：数据源进入 offline store，Feast registry 管理特征定义，materialize 将特征写入 online store，训练和 serving 分别通过统一 API 读取。

```python
# Feast 特征定义与读取伪代码
user_stats = FeatureView(
    name='user_stats', entities=[user], ttl=timedelta(days=7),
    schema=[Field(name='ctr_7d', dtype=Float32)],
    source=batch_source,
)
store.apply([user, user_stats])
store.materialize(start_date, end_date)

training_df = store.get_historical_features(entity_df, features=['user_stats:ctr_7d'])
online_features = store.get_online_features(features=['user_stats:ctr_7d'], entity_rows=[{'user_id': 42}])
```

推荐、广告和风控系统中，特征工程往往比模型本身更复杂。若训练时用 Spark 逻辑生成特征，线上用另一套服务代码实时计算，很容易出现定义不一致和数据泄漏。

Feast 用 FeatureView 把特征定义集中管理，包括实体主键、事件时间、TTL、数据源和 schema。训练集构建时执行 point-in-time join，保证每个样本只能看到其时间点之前的特征。

在线推理要求毫秒级读取，因此 Feast 将离线 store 中计算好的特征 materialize 到在线 KV store。模型服务通过 entity id 查询最新特征，而不需要重复实现特征生产逻辑。

与 DVC 管数据版本不同，Feast 管的是可复用特征语义和在线/离线一致读取路径。它是 MLOps 生命周期中连接数据平台与在线推理的关键层。

> 💡 关键：这类 ML 平台论文的贡献通常不在单个数学公式，而在把计算、状态、通信、调度和故障边界重新组织成可扩展的系统抽象。

#### 🧪 练习题

```yaml
question: "Feast point-in-time join 的主要目的是什么？"
options:
  - "避免训练样本使用未来特征造成泄漏"
  - "加密模型权重"
  - "替代 GPU 通信"
  - "压缩日志"
answer: 0
explain: "按样本时间点回看特征可以保持训练数据的时间因果一致性。"
```
