### TensorFlow Extended (TFX)

```yaml
id: tfx
name: TFX
full_name: TensorFlow Extended (TFX)
year: "2017"
org: Google
paper_url: https://www.tensorflow.org/tfx
category: mlops_lifecycle
parent: —
motivation: 端到端生产级ML平台，涵盖数据校验到模型评估
```

#### 📝 一句话总结

TFX 提供端到端生产级 ML pipeline，把数据摄取、统计、校验、转换、训练、评估、模型验证和服务部署串成可重复执行的组件化工作流。

#### 🎯 核心要点

- 核心组件包括 ExampleGen、StatisticsGen、SchemaGen、ExampleValidator、Transform、Trainer、Evaluator、Pusher
- TensorFlow Data Validation 检测数据 schema、分布漂移和异常特征
- TensorFlow Transform 保证训练与服务使用同一特征变换图，减少 training-serving skew
- Evaluator/ModelValidator 在部署前用切片指标和基线模型比较进行质量门控
- 可运行在 Airflow、Beam、Kubeflow Pipelines 等编排后端上

#### 🔬 深入细节

> 图示说明：官方 TFX 页面展示的典型 pipeline 是从 ExampleGen 到 Pusher 的有向组件图：每个组件消费/产生 artifacts，metadata store 记录 lineage。

```python
# TFX pipeline 组件伪代码
example_gen = CsvExampleGen(input_base=data_path)
stats = StatisticsGen(examples=example_gen.outputs['examples'])
schema = SchemaGen(statistics=stats.outputs['statistics'])
validator = ExampleValidator(statistics=stats.outputs['statistics'], schema=schema.outputs['schema'])
transform = Transform(examples=example_gen.outputs['examples'], schema=schema.outputs['schema'])
trainer = Trainer(examples=transform.outputs['transformed_examples'], transform_graph=transform.outputs['transform_graph'])
evaluator = Evaluator(examples=example_gen.outputs['examples'], model=trainer.outputs['model'])
pusher = Pusher(model=trainer.outputs['model'], blessing=evaluator.outputs['blessing'])
```

生产 ML 的问题不只是训练一个模型，还包括输入数据是否异常、特征变换是否和线上一致、模型是否比当前线上版本好、部署后能否追溯来源。TFX 把这些步骤标准化为 pipeline 组件。

TFDV 从训练数据生成统计和 schema，并在后续数据上检查类型、缺失率、取值范围和分布漂移。这样可以在训练前发现数据质量问题，而不是等模型效果下降后排查。

TFT 将特征工程以 TensorFlow graph 形式导出，训练和 serving 都使用同一 transform graph。这个设计直接针对 training-serving skew：离线 Python 预处理和线上 C++/Java 预处理不一致会导致严重错误。

TFX 与 Kubeflow 的关系是层次不同：TFX 定义 ML 生命周期组件和 artifacts 语义，Kubeflow/KFP 更偏 Kubernetes 上的工作流编排。TFX pipeline 可以运行在多种 orchestrator 上。

> 💡 关键：这类 ML 平台论文的贡献通常不在单个数学公式，而在把计算、状态、通信、调度和故障边界重新组织成可扩展的系统抽象。

#### 🧪 练习题

```yaml
question: "TFX Transform 主要解决什么问题？"
options:
  - "训练和服务特征变换不一致"
  - "GPU 显存分配"
  - "网页渲染"
  - "Git 分支冲突"
answer: 0
explain: "TFT 导出同一 transform graph 给训练和 serving 使用，降低 training-serving skew。"
```
