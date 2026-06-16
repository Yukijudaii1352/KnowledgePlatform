### TensorRT：NVIDIA 深度学习推理优化引擎

```yaml
id: tensorrt
name: TensorRT
full_name: NVIDIA深度学习推理优化引擎 (TensorRT)
year: '2015'
org: NVIDIA
paper_url: https://developer.nvidia.com/tensorrt
category: hardware_specific
parent: —
motivation: 量化校准与算子融合深度集成，实现GPU极致推理性能
```

#### 📝 一句话总结

TensorRT 将训练框架导出的模型编译成面向特定 NVIDIA GPU 的优化 engine，通过图融合、低精度量化、kernel tactic 搜索和运行时内存规划，解决通用深度学习框架推理延迟高、吞吐低、硬件特性利用不足的问题。

#### 🎯 核心要点

- **Builder/Runtime 两阶段架构**：Builder 将 ONNX 或 API 构造的 network definition 编译为序列化 engine，Runtime 反序列化 engine 并在 GPU 上执行 inference
- **图级优化**：执行常量折叠、无用层消除、layout/reformat 插入与消除、convolution-bias-activation fusion、pointwise fusion 等跨层优化
- **低精度推理**：支持 FP32/TF32/FP16/BF16/FP8/INT8 等精度路径；INT8/PTQ 通过代表性数据估计 scale，QAT/显式 Q/DQ 则把量化语义固化进图
- **Tactic 搜索**：对每层或融合子图枚举 cuDNN、cuBLASLt、自研 kernel、Tensor Core kernel、plugin kernel 等候选实现，计时后选择最快 tactic
- **动态形状支持**：通过 optimization profile 指定 min/opt/max shape，针对目标输入范围生成可复用 engine
- **硬件特定部署**：engine 包含 kernel 选择、张量格式、内存规划和目标 GPU 相关优化，换 GPU、换 batch/shape 范围时通常需要重新构建或重新 profile
- **可扩展插件机制**：不支持的算子可通过 TensorRT plugin 接入，并参与序列化、格式选择和运行时调度

#### 🔬 深入细节

![TensorRT 工作流程](https://developer.download.nvidia.com/images/tensorrt/how-tensor-rt-works.jpg)
*图：TensorRT 从训练好的 DNN 出发，经 ONNX 转换、TensorRT Optimizer 构建 engine，再由 TensorRT Runtime 在 NVIDIA GPU 上部署。来源：NVIDIA Developer TensorRT 页面*

```python
# TensorRT engine 构建伪代码
def build_tensorrt_engine(onnx_model, calibration_data, target_gpu):
    network = parse_onnx_to_network_definition(onnx_model)
    network = fold_constants_and_eliminate_dead_layers(network)
    network = infer_shapes_and_insert_reformats(network)

    if use_int8_ptq(network):
        stats = collect_activation_ranges(network, calibration_data)
        for tensor in network.activations:
            tensor.scale = choose_symmetric_scale(stats[tensor])
        network = insert_or_preserve_qdq_semantics(network)

    fused_graph = []
    for subgraph in find_fusible_patterns(network):
        fused_graph.append(fuse_layers(subgraph))

    engine_plan = []
    for layer_or_fusion in fused_graph:
        candidates = enumerate_tactics(layer_or_fusion, target_gpu)
        timings = {t: benchmark(t, layer_or_fusion.opt_shape) for t in candidates}
        best = argmin(timings)
        engine_plan.append((layer_or_fusion, best))

    memory_plan = plan_activation_buffers(engine_plan)
    return serialize_engine(engine_plan, memory_plan, target_gpu)
```

**动机与背景：训练框架不是极致推理编译器**

PyTorch、TensorFlow 等训练框架的执行模型要保留动态图调试、自动微分、训练态算子、宽泛硬件兼容等能力，推理时会带来额外调度和内存开销。生产推理的目标不同：模型结构固定，权重固定，输入 shape 范围通常可枚举，硬件也明确。TensorRT 正是利用这些约束，把模型提前编译成 engine。Builder 阶段可以花更多时间做 profile 和 tactic 选择，Runtime 阶段只做低开销执行，因此适合在线服务、自动驾驶、边缘设备和高吞吐离线推理。

**图融合：减少 kernel launch 和内存往返**

TensorRT 的第一类优化是把多层图模式变成一个 GPU kernel 或一个更紧凑的执行片段。典型模式是：

$$
y = \text{ReLU}(\text{Conv}(x, W) + b)
$$

若拆成 convolution、bias add、activation 三个 kernel，中间 tensor 需要写回和再读出显存，还会支付多次 launch overhead。融合后，卷积输出可在寄存器或 shared memory 中直接加 bias 并应用激活函数，只写最终结果。Pointwise fusion 同理，可把连续的 elementwise、scale、activation、cast、Q/DQ 等操作合成单次访存路径。对 batch 小、层多、算术强度不高的网络，融合带来的收益常常比单个 kernel 微优化更直接。

**量化与校准：把数值范围变成编译信息**

INT8 量化的核心是为浮点张量选择 scale \(s\)，把实数映射到有限整数范围。对称量化可写成：

$$
x_q = \text{clip}(\text{round}(x / s), -128, 127),\qquad \hat{x}=s\cdot x_q
$$

最简单的 scale 选择是 \(s=\max(|x|)/127\)，实际 PTQ 会用代表性校准数据统计激活分布，在精度损失和饱和比例之间折中。早期 TensorRT 的 INT8 workflow 强调 calibrator；现代 TensorRT 更推荐显式 Q/DQ 或 TensorRT Model Optimizer 生成的 PTQ/QAT 图。无论入口形式如何，关键都是让 builder 知道哪些张量以低精度表示、哪些边界需要反量化、哪些 Q/DQ 可与上下游算子融合，从而选择 INT8 Tensor Core kernel 或合适的混合精度 tactic。

**Tactic 搜索：把硬件选择交给构建期 profile**

同一个卷积或矩阵乘可能有许多合法实现：direct convolution、implicit GEMM、Winograd、FFT、cuDNN tactic、cuBLASLt matmul、Tensor Core tile、稀疏 kernel、自定义 plugin 等。TensorRT Builder 会在给定 GPU、shape、precision、workspace 限制下计时候选 tactic，选择最优实现。可把每层选择近似写成：

$$
t_l^*=\arg\min_{t\in\mathcal{T}_l}\ \text{latency}(t;\ \text{shape},\ \text{precision},\ \text{GPU})+\lambda\cdot\text{workspace}(t)
$$

这里 \(\mathcal{T}_l\) 是该层或融合子图的候选实现集合。由于计时会受 GPU clock、缓存、驱动状态影响，生产环境常使用 timing cache、固定 clock、增加平均计时次数和 engine inspector 来提高 tactic 复现性，并避免每次构建都重新完整 benchmark。

**动态 shape、profile 与运行时执行**

TensorRT engine 不是完全动态解释器。对于可变 batch、分辨率或序列长度，需要在构建期提供 optimization profile：每个动态维度给出 min/opt/max。Builder 主要围绕 opt shape 做 tactic 选择，同时保证 min/max 范围可执行。Runtime 创建 execution context 后，应用设置实际输入 shape、绑定 buffer、调用 `enqueueV3()` 把执行提交到 CUDA stream。若 shape 或 profile 切换，TensorRT 需要重新推导中间 shape 和 tactic 资源，首次 enqueue 可能更慢；稳定服务通常会按常见 shape 拆分 profile 或 engine，以降低尾延迟。

**与通用框架和 TVM 类编译器的区别**

TensorRT 的边界更靠近硬件和部署：它不追求训练、自动微分或任意后端可移植，而是充分利用 NVIDIA GPU kernel 库、Tensor Core、CUDA Graph、DLA、plugin、timing cache 和 engine 序列化。和 TVM/MLIR 这类通用编译栈相比，TensorRT 的搜索空间和 runtime 受 NVIDIA 平台约束更强，但因此能把 kernel tactic、量化、内存规划和部署 API 做得更深。它的工程价值在于把“固定模型 + 固定硬件 + 固定 shape 范围”转化为一次性编译优势。

> ⚠️ **注意**：TensorRT engine 是硬件和配置相关的产物。更换 GPU 架构、精度策略、dynamic shape profile 或 plugin 版本时，应重新构建并用真实输入分布验证 latency、吞吐和精度。

#### 🧪 练习题

```yaml
question: "TensorRT Builder 在 tactic selection 阶段主要做什么？"
options:
  - "根据训练集重新训练模型权重"
  - "枚举并计时同一层或融合子图的多个 GPU kernel 实现，选择目标硬件上最快的方案"
  - "把所有算子强制转换为 CPU 实现以提高兼容性"
  - "删除所有 Q/DQ 节点，保证模型始终以 FP32 运行"
answer: 1
explain: "TensorRT 的 builder 会针对目标 GPU、shape、precision 和 workspace 约束选择 tactic。这个选择被写入 engine，runtime 执行时不再做昂贵搜索。"
```
