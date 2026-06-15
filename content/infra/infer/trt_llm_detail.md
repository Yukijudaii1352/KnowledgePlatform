### TensorRT-LLM: TensorRT推理库 (TensorRT-LLM)

```yaml
id: trt_llm
name: TensorRT-LLM
full_name: TensorRT推理库 (TensorRT-LLM)
year: '2024'
org: NVIDIA
paper_url: https://github.com/NVIDIA/TensorRT-LLM
category: engine
parent: —
motivation: 深度适配NVIDIA硬件的极致性能库
```

#### 📝 一句话总结

TensorRT-LLM 是 NVIDIA 面向 LLM 的高性能推理库，整合图优化、插件 kernel、in-flight batching、paged KV cache、量化和多 GPU 并行，深度适配 NVIDIA 硬件。

#### 🎯 核心要点

- 提供 TensorRT 构图、编译和运行时优化
- 包含 fused attention、GEMM、sampling 等专用插件 kernel
- 支持 in-flight batching/continuous batching 和 paged KV cache
- 支持 tensor/pipeline parallel、quantization、LoRA 等部署特性
- 与 NVIDIA GPU、CUDA、TensorRT 生态深度集成

#### 🔬 深入细节

![TensorRT-LLM 核心示意图](https://opengraph.githubassets.com/1/NVIDIA/TensorRT-LLM)
*图：TensorRT-LLM 官方 GitHub 仓库预览；README/文档描述其优化 kernel、runtime 和 Python API。*

```python
# TensorRT-LLM serving flow
engine = build_tensorrt_llm_engine(model_config, plugins, quantization)
runtime = Executor(engine, kv_cache='paged', batching='inflight')
for request in server_stream:
    runtime.enqueue(request)
    batch = runtime.schedule()
    tokens = runtime.decode_step(batch)
    runtime.return_completed(tokens)
```

##### 动机与背景

NVIDIA GPU 上 LLM 推理性能取决于 kernel、图编译、通信和调度整体协同。通用 PyTorch eager 模式难以充分利用 Tensor Core、融合算子和多 GPU 通信。

##### 核心机制

TensorRT-LLM 将模型转换为 TensorRT engine，使用专用插件实现 attention、GEMM、RMSNorm、sampling 等热点。runtime 支持请求持续进入的 in-flight batching，并管理 paged KV cache。

##### 训练/推理流程

离线构建 engine，选择量化和并行策略；在线 Executor 接收请求，调度 prefill/decode，调用优化 kernel，维护 KV cache 和输出流。多 GPU 场景通过 NCCL/通信插件完成张量或流水并行。

##### 与传统方法的区别

vLLM 更偏通用开源 serving 引擎，TensorRT-LLM 更偏 NVIDIA 硬件极致性能库。它的收益来自软硬件生态闭环和大量模型特定插件。

#### 🧪 练习题

```yaml
question: "TensorRT-LLM 的主要定位是什么？"
options:
  - "NVIDIA GPU 上的高性能 LLM 推理库"
  - "数据标注工具"
  - "浏览器插件"
  - "关系数据库"
answer: 0
explain: "它通过 TensorRT engine、插件 kernel 和 runtime 调度优化 NVIDIA GPU 推理。"
```
