### KServe

```yaml
id: kserve
name: KServe
full_name: KServe
year: '2021'
org: KubeFlow Community
paper_url: https://kserve.github.io/website/
category: inference_system
parent: tf_serving
motivation: 基于Serverless架构的标准化模型推理协议
```

#### 📝 一句话总结

KServe 提出以 Kubernetes CRD 为核心的云原生模型服务抽象，把模型运行时选择、模型加载、推理协议、弹性伸缩、流量治理和预处理/后处理/可解释组件统一封装到 `InferenceService` 生命周期中。

#### 🎯 核心要点

- 以 `InferenceService` 为核心 API，将 `predictor`、`transformer`、`explainer`、模型存储 URI、资源需求和流量策略声明为 Kubernetes 原生资源。
- 通过 `ServingRuntime`/`ClusterServingRuntime` 解耦模型格式与模型服务器，支持 TensorFlow、PyTorch、scikit-learn、XGBoost、ONNX、Triton、Hugging Face、vLLM 等运行时。
- 控制面采用 Kubernetes controller reconcile 模式，把高层模型服务声明翻译为 Deployment/Knative Service、Service、Gateway/Ingress、HPA/KEDA 和状态条件。
- 数据面提供预测模型的 V1/V2 Open Inference Protocol，以及生成式模型的 OpenAI-compatible API、SSE 流式返回和 LLM 路由能力。
- 支持 canary、A/B testing、InferenceGraph、pre/post-processing、explainability、model cache、storage container 和多租户资源隔离。
- 与 TF Serving 这类单模型服务器不同，KServe 的贡献在于平台级标准化：模型服务器只是一个可插拔 runtime，生命周期、网络、弹性和协议由控制面统一治理。

#### 🔬 深入细节

![KServe 官方分层架构](https://kserve.github.io/website/img/kserve-layer.png)
*图：KServe 官方架构图，来源为 KServe website；图中展示 KServe 位于 Kubernetes 编排层之上，并向上统一 predictive/generative runtime、GenAI integration、autoscaling、networking 和硬件加速能力。*

```python
# KServe controller 的核心 reconcile 逻辑（简化伪代码）
def reconcile_inference_service(isvc):
    spec = isvc.spec
    runtime = select_serving_runtime(
        model_format=spec.predictor.model.modelFormat,
        explicit_runtime=spec.predictor.model.runtime,
    )
    model_volume = resolve_storage_uri(spec.predictor.model.storageUri)

    workload = build_predictor_workload(
        runtime=runtime,
        model_volume=model_volume,
        resources=spec.predictor.resources,
        mode=isvc.annotations.get("deploymentMode", "standard"),
    )
    if spec.transformer:
        workload = attach_transformer(workload, spec.transformer)
    if spec.explainer:
        workload = attach_explainer(workload, spec.explainer)

    route = configure_gateway_or_knative_route(isvc, traffic=spec.predictor.canaryTrafficPercent)
    scaler = configure_autoscaler(isvc, min_replicas=spec.predictor.minReplicas)
    status = observe_readiness(workload, route, scaler)
    patch_status(isvc, status)
```

KServe 的基本设计动机是把“运行一个模型服务器容器”提升为“声明一个生产推理服务”。在直接使用 TF Serving、TorchServe 或自定义容器时，团队通常还要重复实现模型下载、runtime 参数、健康检查、灰度、伸缩、网关、协议适配和可观测性。KServe 将这些重复模式收敛到 `InferenceService`、`ServingRuntime`、`InferenceGraph`、`LocalModelCache` 等 CRD 中，使推理服务可以像其他 Kubernetes 工作负载一样被声明、审计、滚动更新和回滚。

从机制上看，`InferenceService` 是一个高层 desired state，控制面持续执行：

$$
\text{InferenceServiceSpec}
\xrightarrow{\text{reconcile}}
\{\text{Runtime Pod},\text{Model Storage},\text{Service},\text{Gateway Route},\text{Autoscaler},\text{Status}\}
$$

这个映射的关键是分离“模型语义”和“平台实现”。`modelFormat` 与 `storageUri` 描述用户真正关心的模型，`ServingRuntime` 描述该模型应由哪个 server image 运行，controller 再根据部署模式选择标准 Kubernetes Deployment、Knative Service、Gateway API/Ingress 与 HPA/KEDA。这样，平台管理员可以统一维护 runtime 模板、资源默认值、镜像安全策略和网络策略，而模型开发者只需要提交服务声明。

KServe 的数据面则把请求路径标准化。预测式模型通常走 V1 或 V2 inference protocol：V1 延续 TensorFlow Serving 风格的 `:predict`/`:explain`，V2 使用 `/infer`、metadata、readiness/liveness 和 REST/gRPC 接口，便于 Triton 等 server 互通。生成式模型增加 OpenAI-compatible endpoints，例如 `/v1/chat/completions`、`/v1/completions`、`/v1/embeddings`，并支持流式 token 返回。其抽象可以写成：

$$
y = R_{\theta}(\tau_{\text{pre}}(x;\phi),\; m,\; p), \qquad
\hat{y} = \tau_{\text{post}}(y;\psi)
$$

其中 \(R_{\theta}\) 是被 `ServingRuntime` 封装的模型服务器，\(m\) 是模型文件或 Hugging Face/对象存储 URI，\(p\) 是协议参数，\(\tau_{\text{pre}}\) 与 \(\tau_{\text{post}}\) 分别对应可选 `transformer` 中的预处理和后处理。KServe 把这些组件放在一个 endpoint 的流量链路中，调用方看到的是稳定 API，平台内部可以独立升级 runtime、替换 storage backend 或扩缩容副本。

控制面和数据面分离是 KServe 相比传统模型服务器的核心差别。TF Serving 主要关注单进程内的模型版本加载、batching 和 RPC；KServe 关注跨模型、跨框架、跨租户的运维边界。它把灰度发布表述为 Gateway/Knative 的流量比例，把 scale-to-zero 或按指标伸缩交给 Knative/HPA/KEDA，把复杂模型组合交给 `InferenceGraph`。因此它的“算法”更像系统编排算法：通过 CRD、controller 和 runtime contract 将模型服务变成可组合的 Kubernetes 原生资源。

> 💡 关键：KServe 的创新不是新的神经网络公式，而是把推理服务的控制面状态、数据面协议和 runtime 插拔点统一成声明式接口，降低多框架生产部署的运维复杂度。

#### 🧪 练习题

```yaml
question: "KServe 相比直接部署 TF Serving 容器，最核心的系统抽象是什么？"
options:
  - "用 InferenceService CRD 声明模型服务，并由控制面统一生成 runtime、网络、伸缩和状态资源"
  - "把所有模型强制转换成 TensorFlow SavedModel"
  - "只提供一个固定 REST endpoint，不管理底层 Kubernetes 资源"
  - "用单个 GPU kernel 同时执行所有模型"
answer: 0
explain: "KServe 的核心贡献是平台级 CRD 与 reconcile 控制面；模型服务器是可插拔 runtime，而不是唯一抽象。"
```
