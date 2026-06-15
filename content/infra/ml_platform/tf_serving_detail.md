### TensorFlow Serving

```yaml
id: tf_serving
name: TF Serving
full_name: TensorFlow Serving
year: "2017"
org: Google
paper_url: https://www.tensorflow.org/tfx/guide/serving
category: inference_system
parent: —
motivation: 高性能模型推理系统，支持模型版本热切换
```

#### 📝 一句话总结

TensorFlow Serving 提供高性能模型服务系统，通过 SavedModel、版本化模型目录、servable manager 和 batching 支持模型热切换、低延迟推理与生产部署。

#### 🎯 核心要点

- 以 Servable 抽象管理模型、词表等可服务对象，常见形式是 TensorFlow SavedModel
- ModelServer 监控版本化目录，自动加载新版本并卸载旧版本
- 支持 gRPC/REST Predict API、多模型多版本并存和版本策略
- Batching 将多个请求合并执行，提高 GPU/CPU 吞吐并控制延迟
- 与 TFX Pusher 衔接，形成训练评估后自动部署链路

#### 🔬 深入细节

> 图示说明：官方 Serving 架构可概括为 Source 发现模型版本，Loader 加载 Servable，Manager 管理生命周期，Server 通过 gRPC/REST 接收请求并路由到对应版本。

```python
# TensorFlow Serving 版本化部署伪代码
/models/resnet/
  1/saved_model.pb
  2/saved_model.pb

model_config_list {
  config { name: 'resnet', base_path: '/models/resnet', model_platform: 'tensorflow' }
}

# server loop
while serving:
    version = policy.select_latest_available('resnet')
    batch = batching_queue.collect(requests, max_latency_ms=5)
    response = saved_model[version].predict(batch)
```

模型上线的难点在于服务进程不能因为新模型加载而中断，也不能让请求打到半加载状态。TensorFlow Serving 将模型版本作为目录结构管理，服务端监控新版本并完成生命周期切换。

Servable 是核心抽象：一个可服务对象可以是模型，也可以是词表或其他资源。Manager 决定何时加载、卸载和暴露某个 servable 版本；Loader 封装具体加载逻辑。

Batching 对深度模型推理很重要。单请求矩阵计算往往无法打满硬件，Serving 将短时间窗口内请求合批，在延迟预算内换取更高吞吐。

与 KServe 相比，TensorFlow Serving 是模型服务器本身；KServe 是 Kubernetes 上的推理平台，可以把 TensorFlow Serving 作为后端 runtime 之一，并额外提供 autoscaling、路由和 CRD。

> 💡 关键：这类 ML 平台论文的贡献通常不在单个数学公式，而在把计算、状态、通信、调度和故障边界重新组织成可扩展的系统抽象。

#### 🧪 练习题

```yaml
question: "TensorFlow Serving 如何支持模型热切换？"
options:
  - "通过版本化模型目录和 Servable 生命周期管理加载新版本"
  - "要求停止整个集群再复制文件"
  - "把模型写进源码重新编译"
  - "只允许一个固定模型"
answer: 0
explain: "Serving 监控模型版本目录，加载新版本后按策略切换请求。"
```
