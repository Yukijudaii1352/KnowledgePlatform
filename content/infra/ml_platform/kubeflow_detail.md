### Kubeflow

```yaml
id: kubeflow
name: Kubeflow
full_name: Kubeflow
year: "2018"
org: Google/Cisco
paper_url: https://www.kubeflow.org/
category: mlops_lifecycle
parent: tfx
motivation: 基于Kubernetes的云原生ML工作流编排平台
```

#### 📝 一句话总结

Kubeflow 将机器学习工作流云原生化，基于 Kubernetes 提供 notebook、pipeline、training operator、模型服务等组件，使 ML 作业能用统一 K8s 资源模型编排和运维。

#### 🎯 核心要点

- Kubeflow Pipelines 用组件 DAG 表达可复现 ML 工作流，运行结果记录为 experiments/runs/artifacts
- Training Operators 支持 TFJob、PyTorchJob、MPIJob、XGBoostJob 等分布式训练 CRD
- Notebook/Profiles 提供多租户开发环境和命名空间隔离
- 与 KServe 集成提供模型部署、自动扩缩容和推理协议支持
- 充分利用 Kubernetes 的调度、资源配额、服务发现、存储和 RBAC 能力

#### 🔬 深入细节

> 图示说明：官方架构可概括为 Kubernetes 控制平面上运行一组 ML CRD/controller：Pipeline 编排步骤，Training Operator 管理训练 Pod，KServe 管理 InferenceService。

```python
# Kubeflow Pipeline 伪代码
@dsl.component
def preprocess(data_uri: str) -> str: ...
@dsl.component
def train(dataset: str) -> str: ...
@dsl.component
def deploy(model_uri: str): ...

@dsl.pipeline(name='train-and-serve')
def pipeline(data_uri: str):
    ds = preprocess(data_uri=data_uri)
    model = train(dataset=ds.output)
    deploy(model_uri=model.output)
```

Kubernetes 已经解决了容器调度、资源隔离、服务发现、弹性和权限问题。Kubeflow 的思路是不要重新发明集群管理，而是在 K8s 上添加机器学习所需的 CRD、UI 和 SDK。

Pipeline 把 ML 流程拆成容器化组件，每个组件声明输入输出。后端将 DAG 编译为 Kubernetes 工作负载，并记录每次运行的参数、产物和状态。

Training Operator 将分布式训练模式固化为 CRD。例如 PyTorchJob 描述 master/worker replica、资源请求和启动策略，controller 负责创建 Pod、监控状态和清理。

与 TFX 相比，Kubeflow 更通用、更基础设施导向；与 KServe 相比，Kubeflow 覆盖训练和工作流全生命周期，而 KServe 专注模型推理服务。

> 💡 关键：这类 ML 平台论文的贡献通常不在单个数学公式，而在把计算、状态、通信、调度和故障边界重新组织成可扩展的系统抽象。

#### 🧪 练习题

```yaml
question: "Kubeflow 的基础运行平台是什么？"
options:
  - "Kubernetes"
  - "Hadoop HDFS"
  - "单机 cron"
  - "浏览器 localStorage"
answer: 0
explain: "Kubeflow 通过 Kubernetes CRD 和 controller 管理 ML 工作负载。"
```
