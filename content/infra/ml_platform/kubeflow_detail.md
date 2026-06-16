### Kubeflow

```yaml
id: kubeflow
name: Kubeflow
full_name: Kubeflow
year: '2018'
org: Google/Cisco
paper_url: https://www.kubeflow.org/
category: mlops_lifecycle
parent: tfx
motivation: 基于Kubernetes的云原生ML工作流编排平台
```

#### 📝 一句话总结

Kubeflow 将机器学习开发、训练、调参、流水线和服务部署统一到 Kubernetes 资源模型上，解决了 ML 系统在多团队、多框架、多集群环境中的可复现编排和生产化运维问题。

#### 🎯 核心要点

- 以 Kubernetes 为底座，用 CRD、controller、namespace、RBAC、PVC、Service 等原生机制表达 ML 工作负载
- Kubeflow Pipelines 将端到端 ML 流程编译为由容器化组件组成的 DAG，并追踪 run、artifact、metadata 与参数
- Kubeflow Trainer/Training Operator 将分布式训练封装为 TrainJob、PyTorchJob、TFJob、MPIJob 等声明式 API
- Notebooks、Profiles、Central Dashboard 提供多租户交互开发入口，并把用户隔离映射到 Kubernetes 命名空间和权限
- Katib 负责超参数搜索和 AutoML，KServe 负责模型推理服务、自动扩缩容、健康检查、流量治理和灰度发布
- 与 TFX 的差异在于 Kubeflow 更偏云原生平台层：它不绑定单一 ML 框架，而是把框架、数据处理、训练和服务都托管到 K8s 生态

#### 🔬 深入细节

![Kubeflow 官方架构图](https://www.kubeflow.org/docs/started/images/kubeflow-architecture.drawio.svg)
*图：Kubeflow Architecture 官方文档中的 Overview Diagram，展示 Kubeflow subprojects 如何覆盖 AI lifecycle 并运行在 Kubernetes 之上；图片来源：Kubeflow 官方文档。*

Kubeflow 的核心思想不是发明新的集群调度器，而是把机器学习任务“翻译”为 Kubernetes 能理解的声明式资源。一个训练任务、一次流水线运行或一个推理服务都可以看成期望状态 \(S_{desired}\)，controller 持续观察实际状态 \(S_{actual}\)，并通过创建 Pod、Service、PVC、Job、InferenceService 等资源让二者收敛：

$$
\text{reconcile}(S)=\arg\min_{a \in A} d(S_{desired}, a(S_{actual}))
$$

这个机制使 Kubeflow 可以继承 Kubernetes 的资源调度、故障恢复、服务发现、密钥管理、配额和审计能力。对 ML 平台团队而言，关键收益是边界清晰：数据科学家提交的是 pipeline 或 training spec，平台侧负责把它落到 GPU、存储、网络、权限和日志系统中。

```python
# Kubeflow 端到端训练与部署流程伪代码
from kfp import dsl

@dsl.component
def preprocess(raw_uri: str) -> str:
    dataset_uri = run_spark_or_container_job(raw_uri)
    return dataset_uri

@dsl.component
def train(dataset_uri: str, epochs: int) -> str:
    # 实际实现可创建 PyTorchJob/TFJob/TrainJob，由 Kubernetes controller 编排 worker pod。
    model_uri = submit_distributed_training(
        image="registry.example.com/trainer:latest",
        inputs={"dataset": dataset_uri, "epochs": epochs},
        resources={"gpu": 8, "cpu": 64},
    )
    return model_uri

@dsl.component
def evaluate(model_uri: str, holdout_uri: str) -> float:
    metrics = run_batch_inference(model_uri, holdout_uri)
    return metrics["auc"]

@dsl.component
def deploy(model_uri: str):
    apply_kserve_inferenceservice(
        name="fraud-model",
        predictor={"tensorflow": {"storageUri": model_uri}},
        autoscaling={"minReplicas": 1, "maxReplicas": 20},
    )

@dsl.pipeline(name="train-evaluate-deploy")
def pipeline(raw_uri: str, holdout_uri: str, epochs: int = 5):
    ds = preprocess(raw_uri=raw_uri)
    model = train(dataset_uri=ds.output, epochs=epochs)
    auc = evaluate(model_uri=model.output, holdout_uri=holdout_uri)
    with dsl.If(auc.output > 0.80):
        deploy(model_uri=model.output)
```

Kubeflow Pipelines 将工作流建模为有向无环图 \(G=(V,E)\)。每个节点 \(v \in V\) 是一个容器化组件，边 \(e=(u,v)\) 表示数据依赖或执行顺序，因此调度约束可以写成：

$$
e=(u,v) \in E \Rightarrow start(v) \ge finish(u)
$$

组件之间传递的是参数和 artifact，而不是隐式共享的本地文件。这样做牺牲了一点开发便利性，但换来可复现性：每次 run 的输入、镜像、参数、产物位置和指标都能被记录，失败节点可以单独重试，缓存也可以基于组件输入输出进行判断。相比把整个 ML 脚本塞进一个单体 Job，DAG 把“数据准备、训练、评估、注册、部署”拆成可审计的边界。

分布式训练层体现了 Kubeflow 的第二个系统抽象：将框架特定的启动协议写入 CRD 和 controller。例如 PyTorch 分布式训练需要 rank、world size、master 地址、worker 副本、重启策略和资源请求；TFJob 又有 chief、worker、parameter server 等角色。Kubeflow 把这些内容声明为训练资源，controller 负责创建 Pod、注入环境变量、观察状态和汇总 job condition。资源可行性由 Kubernetes 调度器处理：

$$
\sum_{p \in node} cpu_p \le C_{node},\quad
\sum_{p \in node} mem_p \le M_{node},\quad
\sum_{p \in node} gpu_p \le G_{node}
$$

模型服务层通常通过 KServe 接入。Kubeflow 不把“服务模型”简化为启动一个 Flask 进程，而是把模型 URI、runtime、protocol、autoscaling、canary traffic 和 health check 组织为 InferenceService。训练产物从 pipeline artifact 或模型仓库流入服务层，线上请求再通过网关路由到 predictor。这使部署过程能被 GitOps、审计和回滚管理，而不是依赖人工复制模型文件。

Kubeflow 的平台价值还在多租户。Profiles 和 namespace 将不同团队的 notebook、pipeline run、secret、PVC 和服务隔离开；RBAC 决定谁能提交训练、读取产物或发布服务。这个设计非常贴合企业 ML 平台：数据科学家使用 Notebook 和 SDK，平台工程师维护 cluster policy，安全团队审计 Kubernetes 对象和访问控制。

> 💡 关键：Kubeflow 的“算法”不是某个损失函数，而是一套云原生控制面抽象。它把 ML 生命周期中的状态、依赖、资源和权限都变成声明式对象，再用 Kubernetes reconciliation loop 保持系统收敛。

#### 🧪 练习题

```yaml
question: "Kubeflow Pipelines 为什么适合表达端到端机器学习流程？"
options:
  - "它把每个步骤表示为容器化组件 DAG，并记录参数、产物和运行元数据"
  - "它要求所有模型必须用 TensorFlow 编写"
  - "它通过单机 shell 脚本顺序执行所有任务"
  - "它只负责展示 notebook，不参与训练或部署"
answer: 0
explain: "KFP 的核心是组件 DAG 和元数据追踪；这让数据准备、训练、评估和部署可以被复现、重试、缓存和审计。"
```
