### KServe

```yaml
id: kserve
name: KServe
full_name: KServe
year: "2021"
org: KubeFlow Community
paper_url: https://kserve.github.io/website/
category: inference_system
parent: tf_serving
motivation: 基于Serverless架构的标准化模型推理协议
```

#### 📝 一句话总结

KServe 在 Kubernetes 上提供标准化模型推理平台，用 InferenceService CRD 封装模型服务器、伸缩、网络、灰度和多框架 runtime，成为云原生模型服务的重要接口。

#### 🎯 核心要点

- InferenceService CRD 描述 predictor、transformer、explainer 和存储 URI
- 支持 TensorFlow、PyTorch、sklearn、XGBoost、ONNX、Hugging Face、vLLM 等多种 runtime
- 基于 Knative/Kubernetes 提供自动扩缩容、scale-to-zero、流量路由和 canary rollout
- 统一 V1/V2 inference protocol，并逐步支持 OpenAI-compatible LLM API
- 可组合 InferenceGraph 实现 ensemble、pipeline 和复杂路由

#### 🔬 深入细节

![KServe 核心示意图](https://kserve.github.io/website/img/kserve-layer.png)
*图：官方架构图展示 KServe 位于 Kubernetes 之上，向上支持预测式和生成式 AI runtime，向下复用 autoscaling、networking 和硬件加速能力。*

```python
# KServe InferenceService 示例
apiVersion: serving.kserve.io/v1beta1
kind: InferenceService
metadata:
  name: llama-service
spec:
  predictor:
    model:
      modelFormat:
        name: huggingface
      storageUri: hf://meta-llama/Llama-3.1-8B-Instruct
      resources:
        limits:
          nvidia.com/gpu: '1'
```

许多团队一开始直接部署模型服务器容器，但很快会遇到多框架 runtime、模型文件加载、自动扩缩容、灰度发布、监控和安全隔离等重复问题。KServe 将这些模式抽象成 Kubernetes 原生资源。

InferenceService 是核心对象。用户声明模型格式、存储位置和资源需求，controller 负责创建底层 Deployment/Knative Service、配置网络路由和模型 server runtime。

对传统预测模型，KServe 支持 transformer/preprocessor、explainer 和 canary；对 LLM，KServe 逐步集成 vLLM、Hugging Face runtime、OpenAI-compatible API 和 KV cache 相关能力。

与 TF Serving 不同，KServe 不只是一个模型进程，而是控制平面。它可以调度不同 runtime，并利用 K8s 生态实现多租户、弹性和标准化运维。

> 💡 关键：这类 ML 平台论文的贡献通常不在单个数学公式，而在把计算、状态、通信、调度和故障边界重新组织成可扩展的系统抽象。

#### 🧪 练习题

```yaml
question: "KServe 的核心 Kubernetes 资源是什么？"
options:
  - "InferenceService"
  - "PodDisruptionBudget"
  - "ConfigMap only"
  - "GitCommit"
answer: 0
explain: "InferenceService 封装模型部署、runtime、资源和路由配置。"
```
