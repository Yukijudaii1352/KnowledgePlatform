### TensorFlow Extended (TFX)

```yaml
id: tfx
name: TFX
full_name: TensorFlow Extended (TFX)
year: '2017'
org: Google
paper_url: https://www.tensorflow.org/tfx
category: mlops_lifecycle
parent: —
motivation: 端到端生产级ML平台，涵盖数据校验到模型评估
```

#### 📝 一句话总结

TFX 提出了面向生产 ML 的端到端 pipeline 平台，把数据摄取、统计、校验、转换、训练、评估、模型验证和推送拆成强类型组件，解决研究脚本难以稳定进入持续训练与生产部署的问题。

#### 🎯 核心要点

- 标准组件链：ExampleGen、StatisticsGen、SchemaGen、ExampleValidator、Transform、Trainer、Tuner、Evaluator、InfraValidator、Pusher、BulkInferrer
- Artifact DAG：每个组件消费和产出强类型 artifacts，orchestrator 根据 artifact 依赖推导执行顺序
- ML Metadata：记录 artifacts、executions、contexts 和 lineage，使每次训练与模型产物可追溯
- TensorFlow Data Validation：通过数据统计与 schema 检查缺失值、类型错误、取值越界、training-serving skew 和 drift
- TensorFlow Transform：把全量统计特征工程导出为 transform graph，保证训练和服务使用同一预处理逻辑
- Evaluator/TFMA：在部署前按指标和数据切片比较候选模型与 baseline，只有 blessed model 才能进入 Pusher
- 多编排后端：TFX workflow 可运行在 Apache Airflow、Apache Beam、Kubeflow Pipelines、Vertex Pipelines 等环境

#### 🔬 深入细节

![TFX component flow](https://raw.githubusercontent.com/tensorflow/tfx/master/docs/guide/images/prog_fin.png)
*图：TFX 官方文档的 Component Flow，来源为 TensorFlow/tfx GitHub 文档源码；图中展示从 ExampleGen 到 Pusher 的标准组件数据流。*

```python
# TFX 标准 pipeline 伪代码
example_gen = CsvExampleGen(input_base=data_path)
statistics = StatisticsGen(examples=example_gen.outputs["examples"])
schema = SchemaGen(statistics=statistics.outputs["statistics"])
validator = ExampleValidator(
    statistics=statistics.outputs["statistics"],
    schema=schema.outputs["schema"],
)
transform = Transform(
    examples=example_gen.outputs["examples"],
    schema=schema.outputs["schema"],
    module_file="preprocessing.py",
)
trainer = Trainer(
    examples=transform.outputs["transformed_examples"],
    transform_graph=transform.outputs["transform_graph"],
    schema=schema.outputs["schema"],
    module_file="model.py",
)
evaluator = Evaluator(
    examples=example_gen.outputs["examples"],
    model=trainer.outputs["model"],
    baseline_model=latest_blessed_model,
    eval_config=eval_config,
)
pusher = Pusher(
    model=trainer.outputs["model"],
    model_blessing=evaluator.outputs["blessing"],
    push_destination=serving_dir,
)
```

TFX 的出发点是生产 ML 与普通软件发布不同：输入数据本身会变化，特征工程可能依赖全量统计，训练脚本和服务预处理容易不一致，模型上线前还要和当前线上版本做切片级比较。KDD 2017 的 TFX 论文把这些问题抽象成生产级 ML 平台需求；开源 TFX 则把这些需求落成组件化 pipeline，使一次模型训练不再只是执行 Python 脚本，而是生成一组有 lineage 的 artifacts。

Pipeline 的基本结构是 artifact dependency DAG。组件 \(C_i\) 声明输入 artifacts、输出 artifacts 和执行参数，TFX 根据依赖关系构造有向无环图：

$$
C_j \rightarrow C_i \quad \Longleftrightarrow \quad \mathrm{outputs}(C_j) \cap \mathrm{inputs}(C_i) \ne \varnothing
$$

例如 SchemaGen 依赖 StatisticsGen 的 statistics，ExampleValidator 同时依赖 statistics 和 schema，Transform 依赖 examples 与 schema。这样 orchestrator 可以安全地并行运行没有相互依赖的节点，例如 ExampleValidator 和 Transform 在满足共同上游后可并行；同时 ML Metadata 会记录每个 execution 使用了哪些输入、产生了哪些输出，便于定位某个线上模型到底来自哪批数据、哪个 schema 和哪段训练代码。

数据质量控制由 TFDV 负责。StatisticsGen 先计算训练/评估数据的 summary statistics，SchemaGen 从统计中推断初始 schema，ExampleValidator 再用 schema 检查异常。schema 可以表达 dtype、required/optional、取值域、稀疏特征 valency、训练/服务环境差异等约束。一个简化的异常判定可以写成：

$$
\mathrm{anomaly}(f)=
\mathbf{1}[\mathrm{type}(f)\notin S_f]
\lor \mathbf{1}[\mathrm{missing\_rate}(f)>\tau_m]
\lor \mathbf{1}[\mathrm{drift}(P_t(f),P_{t+1}(f))>\tau_d]
$$

其中 \(S_f\) 是 schema 对特征 \(f\) 的约束，\(\tau_m\) 是缺失率阈值，\(\tau_d\) 是 drift 阈值。TFDV 官方文档中，categorical drift 可用 L-infinity distance，numeric drift 可用近似 Jensen-Shannon divergence；这让数据问题在训练前暴露，而不是等模型指标下降后再排查。

Transform 组件解决 training-serving skew。许多特征工程需要全量 pass，例如归一化、分桶、词表构建；如果训练时用 pandas/Beam 计算，服务时用另一套 Java/C++/Python 逻辑复写，很容易出现边界处理不一致。TFT 要求用户定义 `preprocessing_fn`，离线阶段基于训练数据分析出常量、词表和变换图，随后把同一个 `transform_graph` 同时喂给 Trainer 与 serving signature。机制上，它把训练和服务预处理约束为同一个函数：

$$
x'_{\mathrm{train}} = g_\theta(x), \quad x'_{\mathrm{serve}} = g_\theta(x)
$$

这里 \(\theta\) 是从训练数据分析得到的均值、方差、vocabulary 等 transform 状态。只要服务加载的是同一份 `transform_graph`，线上和离线就不会因为手写预处理差异产生系统性偏差。

Evaluator/TFMA 是部署门控。它会在评估集和指定 slices 上计算候选模型指标，并可与最新 blessed baseline 比较：如果候选模型在 AUC、loss、accuracy 等指标上满足绝对阈值和相对变化阈值，Evaluator 产生 blessing；否则 Pusher 不会把模型推到服务目录。这个机制把“模型是否足够好”从人工看几张图变成 pipeline 的显式条件，也使持续训练可以自动运行但不自动发布坏模型。

与 Kubeflow Pipelines、Airflow 的区别在于抽象层级。Airflow/KFP 更偏通用工作流编排；TFX 定义的是 ML 生命周期里的标准组件、artifact 类型和元数据语义。TFX pipeline 可以交给这些 orchestrator 执行，但仍保留 ExampleGen、Transform、Evaluator、Pusher 等 ML 专用契约。对 ML 平台而言，这种契约比单纯 DAG 更重要，因为它规定了数据校验、特征一致性、模型祝福和 lineage 的边界。

> 💡 关键：TFX 的核心贡献是把生产 ML 的隐性工程约束组件化、类型化和可追踪化，让持续训练与部署从手工流程变成可审计 pipeline。

#### 🧪 练习题

```yaml
question: "TFX Transform 组件主要解决的生产问题是什么？"
options:
  - "让训练和服务加载同一份 transform graph，减少 training-serving skew"
  - "替代所有模型训练算法"
  - "只负责把 CSV 文件压缩成 zip"
  - "绕过模型评估直接发布模型"
answer: 0
explain: "TFT 会把从训练数据分析得到的预处理逻辑导出为 transform graph，并同时用于训练与服务。"
```
