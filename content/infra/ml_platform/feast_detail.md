### Feast

```yaml
id: feast
name: Feast
full_name: Feast特征存储 (Feast)
year: '2019'
org: Gojek/Google
paper_url: https://feast.dev/
category: mlops_lifecycle
parent: kubeflow
motivation: 首个开源特征存储，解决训练与推理数据一致性
```

#### 📝 一句话总结

Feast 提出开源特征存储抽象，用统一的特征定义、离线/在线存储和时间正确的读取 API，解决生产 ML 中训练-推理特征不一致、未来信息泄漏和在线低延迟取数问题。

#### 🎯 核心要点

- 用 Entity、FeatureView、DataSource、FeatureService 描述特征语义、主键、schema、事件时间、TTL 和服务分组
- Registry 保存特征对象元数据，使特征定义可以版本化、复用、审计并被训练和推理共享
- Offline Store 面向历史训练集和 batch scoring，Online Store 面向毫秒级在线推理查询
- `get_historical_features` 执行 point-in-time join，确保训练样本只使用预测时间点之前可见的特征
- materialization 或 push 写入将特征从 batch/stream/request sources 同步到在线存储，降低线上计算复杂度
- Feature Server 和 SDK 使模型服务按 entity row 获取在线特征，避免每个模型服务重复实现特征读取逻辑

#### 🔬 深入细节

![Feast 官方架构图](https://raw.githubusercontent.com/feast-dev/feast/master/docs/assets/feast_marchitecture.png)
*图：Feast 官方架构图，展示 request/stream/batch sources 经 Transform 进入 Feast 的 Store、Serve、Register 三类能力，并输出 online/offline features；图片来源：Feast 官方文档仓库。*

Feast 解决的是生产 ML 数据路径问题，而不是模型结构问题。推荐、广告、风控等系统通常有两套特征逻辑：训练时用 Spark/SQL 从历史表中拼出训练集，线上推理时用服务代码、缓存或 KV store 取最近特征。只要两套逻辑在窗口、过滤条件、缺失值或时间戳处理上不一致，就会出现 training-serving skew；如果训练集 join 时拿到了样本时间之后才产生的值，还会出现未来信息泄漏。

Feast 的对象模型把这些隐含约定显式化。Entity 定义 join key，DataSource 指向表、流或请求输入，FeatureView 定义一组共享实体、时间戳、TTL 和 schema 的特征，Registry 则保存这些定义。训练和服务读取都引用同一份 Registry，因此“哪个特征叫什么、从哪里来、实体键是什么、保鲜期多长”不再散落在训练脚本和线上服务中。

```python
# Feast 特征定义、训练读取、在线读取的核心流程伪代码
from datetime import timedelta
from feast import Entity, FeatureStore, FeatureView, Field
from feast.types import Float32, Int64

driver = Entity(name="driver", join_keys=["driver_id"])

driver_stats = FeatureView(
    name="driver_hourly_stats",
    entities=[driver],
    ttl=timedelta(days=2),
    schema=[
        Field(name="conv_rate", dtype=Float32),
        Field(name="avg_daily_trips", dtype=Int64),
    ],
    source=driver_stats_batch_source,  # 包含 event_timestamp 字段的离线/流式数据源
)

store = FeatureStore(repo_path="feature_repo/")
store.apply([driver, driver_stats])      # 将定义写入 registry
store.materialize(start_date, end_date)  # 将最新可服务特征写入 online store

training = store.get_historical_features(
    entity_df=label_rows_with_event_timestamp,
    features=[
        "driver_hourly_stats:conv_rate",
        "driver_hourly_stats:avg_daily_trips",
    ],
)

online = store.get_online_features(
    features=["driver_hourly_stats:conv_rate"],
    entity_rows=[{"driver_id": 1001}, {"driver_id": 1002}],
)
```

Point-in-time join 是 Feast 最关键的机制。对训练样本 \((e,t)\)，其中 \(e\) 是实体键、\(t\) 是样本预测时间，Feast 不能简单取该实体的最新特征，而要取在 \(t\) 之前已经产生且没有超过 TTL 的最新值：

$$
r^*(e,t)=\operatorname*{arg\,max}_{r \in F(e)}
r.event\_timestamp
\quad \text{s.t.}\quad
r.event\_timestamp \le t,\quad
t-r.event\_timestamp \le TTL
$$

这个公式的直觉很简单：训练时模拟线上预测在当时能看到的信息状态。若样本发生在 10:00，就不能把 10:05 才计算出的点击率 join 进来；否则离线 AUC 会虚高，上线后模型拿不到这些“未来特征”。当数据源有 `created_timestamp` 时，还可以进一步处理迟到数据，避免在某个事件时间已经存在但实际晚到的数据污染训练视图。

在线服务路径则追求低延迟。Feast 推荐把预计算特征 materialize 到 Redis、DynamoDB、Bigtable、PostgreSQL 等 Online Store，让推理服务把特征读取简化为带 TTL 语义的 KV 查询：

$$
\hat{y}=model\big(x_{request},\; f_{online}(entity\_id)\big)
$$

这里 \(x_{request}\) 是请求时才有的上下文特征，\(f_{online}\) 是 Feast 从在线存储返回的预计算特征。把重计算从请求链路中移出后，模型服务不需要连接数据仓库或重跑复杂 SQL，只需通过 SDK 或 Feature Server 拉取统一定义的在线特征。

Feast 的 Transform/Store/Serve/Register 分层也解释了它为什么适合嵌入现有数据平台。Transform 可以发生在请求时、流式链路或离线计算引擎中；Store 不强制替换企业已有的 Snowflake、BigQuery、Spark、Redis 或 DynamoDB；Serve 提供训练和推理两类读取 API；Register 则让元数据成为协作接口。它更像“特征控制面”和“一致读取层”，而不是一个必须托管全部数据的数据库。

与 Kubeflow 的关系可以理解为上下游协同：Kubeflow Pipelines 可以编排特征生成、训练和部署；Feast 则负责让训练步骤和线上 InferenceService 获取同一组特征定义。二者结合后，ML 平台不只会调度容器，还能保证模型输入的数据语义一致。

> 💡 关键：Feast 的核心不是把特征集中存到一个地方，而是把特征定义、时间正确性和离线/在线读取路径集中管理；这正是生产 ML 数据系统最容易出错的部分。

#### 🧪 练习题

```yaml
question: "Feast 的 point-in-time join 主要防止哪类问题？"
options:
  - "训练样本 join 到预测时间之后才可见的未来特征"
  - "GPU 显存被模型权重占满"
  - "Kubernetes 调度器无法创建 Pod"
  - "模型服务只能使用 REST，不能使用 gRPC"
answer: 0
explain: "Point-in-time join 会为每个样本选择其事件时间之前的最新有效特征，避免离线训练看到线上推理时不可用的信息。"
```
