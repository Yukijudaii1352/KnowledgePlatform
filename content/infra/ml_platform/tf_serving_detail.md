### TensorFlow Serving

```yaml
id: tf_serving
name: TF Serving
full_name: TensorFlow Serving
year: '2017'
org: Google
paper_url: https://www.tensorflow.org/tfx/guide/serving
category: inference_system
parent: —
motivation: 高性能模型推理系统，支持模型版本热切换
```

#### 📝 一句话总结

TensorFlow Serving 提出面向生产推理的高性能模型服务器，用 Servable 生命周期管理、版本策略、SavedModel 集成和请求 batching 解决模型热更新、低延迟访问和多模型服务化问题。

#### 🎯 核心要点

- Servable 是核心抽象，可表示 SavedModel、查找表、词表或组合模型，而生命周期由 Serving Core 管理
- Source 发现模型版本，Loader 封装加载/卸载逻辑，Manager 根据 aspired versions 和 version policy 控制上线状态
- 版本化模型目录支持在不中断服务的情况下加载新版本，并允许客户端请求 latest 或指定版本
- TensorFlow ModelServer 提供 gRPC/REST Predict API，并能通过 model config 同时托管多个模型
- Batching 将多个小请求合并为一次推理，在 GPU/CPU 加速器上用可控排队延迟换取更高吞吐
- Availability Preserving Policy 偏可用性，Resource Preserving Policy 偏资源节省，二者对应不同热切换成本

#### 🔬 深入细节

![TensorFlow Serving 官方架构图](https://raw.githubusercontent.com/tensorflow/serving/master/tensorflow_serving/g3doc/images/serving_architecture.svg)
*图：TensorFlow Serving 官方架构图，展示 Source、Loader、Manager 与 Servable 的生命周期关系；图片来源：TensorFlow Serving 官方文档仓库。*

TensorFlow Serving 面对的核心问题是“模型是动态对象，但服务 API 必须稳定”。训练系统会持续产出新模型版本，线上服务却不能在加载权重时停止接收请求，也不能让请求访问到半加载的模型。Serving 的设计把模型文件、加载过程、版本选择和请求路径拆开，使服务端 API 保持稳定，同时后台异步更新可服务对象。

官方论文和文档中最重要的抽象是 Servable。Servable 是客户端真正使用的对象，可以是一个 TensorFlow SavedModelBundle，也可以是 embedding lookup table、词表或其他推理依赖。它本身不管理生命周期；Source 负责发现某个 servable stream 的新版本，Loader 知道如何把该版本装入内存，Manager 决定何时加载、暴露和卸载。

```python
# TensorFlow Serving 生命周期与推理路径伪代码
class FileSystemSource:
    def poll(self, base_path):
        # /models/ranker/1, /models/ranker/2, ... 目录号即模型版本
        versions = sorted(list_numeric_subdirs(base_path))
        loaders = [SavedModelLoader(path=f"{base_path}/{v}", version=v) for v in versions]
        manager.update_aspired_versions("ranker", loaders)

class Manager:
    def update_aspired_versions(self, model_name, loaders):
        plan = version_policy.plan(current=self.loaded[model_name], aspired=loaders)
        for action in plan:
            if action.kind == "load" and resource_ok(action.loader):
                servable = action.loader.load()
                self.publish(model_name, action.version, servable)
            if action.kind == "unload" and policy_allows_unload(action.version):
                self.unpublish_and_free(model_name, action.version)

def predict(request):
    model_name = request.model_spec.name
    version = request.model_spec.version or manager.latest_ready_version(model_name)
    with manager.get_servable_handle(model_name, version) as servable:
        batch = batch_scheduler.enqueue_or_form_batch(request)
        return servable.session.run(
            fetches=request.output_tensor_names,
            feed_dict=batch.to_feed_dict(),
        )
```

版本控制可以写成一个 aspired set 问题。Source 在时刻 \(t\) 观测到希望服务的版本集合 \(A_t=\{v_1,\dots,v_k\}\)，Manager 已加载集合为 \(L_t\)。Version policy 负责生成加载/卸载动作，使最终状态接近 \(A_t\)，并满足可用性或资源约束：

$$
L_{t+1} = policy(L_t, A_t, R)
$$

Availability Preserving Policy 的约束是尽量保证任意时刻至少有一个可用版本，因此常见顺序是先加载新版本再卸载旧版本；Resource Preserving Policy 则避免新旧模型同时占用内存，可能先卸载旧版本再加载新版本。前者适合强可用服务，后者适合模型很大或显存紧张的场景。

```text
/models/fraud_detector/
  1678900000/
    saved_model.pb
    variables/
  1679000000/
    saved_model.pb
    variables/

model_config_list {
  config {
    name: "fraud_detector"
    base_path: "/models/fraud_detector"
    model_platform: "tensorflow"
    model_version_policy { latest { num_versions: 2 } }
  }
}
```

这个目录约定让部署系统非常简单：训练完成后导出 SavedModel 到一个新的数字版本目录，Serving 通过 Source 轮询或外部通知发现新目录，再由 Loader 构建 servable。客户端可以继续请求 `fraud_detector` 的 latest，也可以在灰度、回滚或 A/B test 中指定版本号。相比把模型权重直接嵌入业务服务，版本目录和 Manager 把“发布模型”变成了一个受控生命周期事件。

Batching 是 TensorFlow Serving 的性能机制。单个在线请求的 batch size 往往很小，矩阵乘法和 GPU kernel 启动成本无法被摊薄。Serving 在请求到达后等待一个很短窗口，把满足形状兼容条件的请求组成批：

$$
B=\{r_i \mid 0 \le arrival(r_i)-arrival(r_0) \le \Delta,\ |B|\le B_{max}\}
$$

平均计算成本可以近似理解为：

$$
cost_{per\_request}(B) \approx \frac{T_{infer}(|B|)+T_{queue}}{|B|}
$$

其中 \(\Delta\) 或 `batch_timeout_micros` 决定额外排队延迟，`max_batch_size` 决定吞吐上限和显存风险。调参的本质是寻找延迟 SLO 和硬件利用率之间的平衡：低流量服务可能不值得等待，高并发 GPU 推理则通常能从 batching 中获得显著吞吐收益。

TensorFlow Serving 与 KServe 的层次不同。TensorFlow Serving 是模型服务器和 Serving Core，关注模型加载、版本、推理 API 和 batching；KServe 是 Kubernetes 上的推理控制面，关注 InferenceService CRD、自动扩缩容、网关路由、canary 和多框架 runtime。生产系统中经常由 KServe 管理 TensorFlow Serving runtime，从而把单机模型服务器能力接入集群级发布和弹性能力。

> 💡 关键：TF Serving 的创新点在于把模型服务拆为稳定 API、动态 servable 生命周期和可调性能路径。热切换不是“覆盖文件”，而是 Source、Loader、Manager、Version Policy 共同完成的状态迁移。

#### 🧪 练习题

```yaml
question: "TensorFlow Serving 中 Manager 的核心职责是什么？"
options:
  - "根据 Source 提供的 aspired versions 管理 Servable 的加载、暴露和卸载"
  - "训练神经网络并更新反向传播梯度"
  - "替代客户端生成所有输入特征"
  - "把 Kubernetes 集群节点扩容到更多机器"
answer: 0
explain: "Manager 监听 Source/Loader 产生的版本信息，并按 version policy 管理 servable 生命周期，保证客户端拿到可用版本。"
```
