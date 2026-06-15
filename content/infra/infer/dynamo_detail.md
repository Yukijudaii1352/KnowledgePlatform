### Dynamo: NVIDIA Dynamo (Dynamo)

```yaml
id: dynamo
name: Dynamo
full_name: NVIDIA Dynamo (Dynamo)
year: '2026.03'
org: NVIDIA
paper_url: https://github.com/ai-dynamo/dynamo
category: engine
parent: trt_llm
motivation: 开源分布式推理框架支持PD物理解耦
```

#### 📝 一句话总结

NVIDIA Dynamo 是面向大规模分布式 LLM 推理的开源运行框架，重点支持 prefill/decode 物理解耦、KV 传输、智能路由和多节点弹性部署。

#### 🎯 核心要点

- 将 prefill 和 decode workers 解耦以分别优化吞吐与延迟
- 通过 KV transfer 在不同 worker 间传递预填充结果
- 包含 router、planner、runtime 和 worker 等服务组件
- 可与 TensorRT-LLM、vLLM 等后端集成
- 面向多节点、多 GPU、生产级推理服务编排

#### 🔬 深入细节

![Dynamo 核心示意图](https://opengraph.githubassets.com/1/ai-dynamo/dynamo)
*图：Dynamo 官方 GitHub 仓库预览；README 展示其分布式推理框架定位。*

```python
# Dynamo PD-disaggregated serving sketch
router.receive(request)
prefill_worker = planner.pick_prefill_worker(request)
kv_handle = prefill_worker.prefill(request.prompt)
decode_worker = planner.pick_decode_worker(request, kv_handle)
decode_worker.load_kv(kv_handle)
for token in decode_worker.stream_decode():
    router.send(token)
```

##### 动机与背景

长 prompt 的 prefill 是大矩阵吞吐型任务，decode 是小步延迟敏感任务。把两者混在同一 worker 上会造成资源干扰，也难以跨节点扩展。

##### 核心机制

Dynamo 采用 PD disaggregation：prefill worker 专注处理 prompt 并产出 KV，decode worker 接收 KV 后持续生成。router/planner 根据负载、KV 位置和资源状态分配请求，runtime 管理通信和生命周期。

##### 训练/推理流程

请求进入 router 后被拆分为 prefill 和 decode 阶段。prefill 完成后 KV 通过高速传输或缓存句柄交给 decode worker；decode worker 流式返回 token。系统可按阶段独立扩容。

##### 与传统方法的区别

TensorRT-LLM/vLLM 是单机或后端执行引擎，Dynamo 更像分布式 serving 编排层。它关注跨 worker 的 KV 生命周期、路由和弹性，而不仅是单 kernel 性能。

#### 🧪 练习题

```yaml
question: "Dynamo 的 PD 解耦指什么？"
options:
  - "Prefill 与 Decode 物理解耦"
  - "Python 与 Docker 解耦"
  - "图片与文本解耦"
  - "训练与标注解耦"
answer: 0
explain: "Dynamo 将 prefill 和 decode 放到不同 worker/资源池，靠 KV transfer 衔接。"
```
