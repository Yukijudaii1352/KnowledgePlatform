### Orca: 虎鲸 (Orca)

```yaml
id: orca
name: Orca
full_name: 虎鲸 (Orca)
year: '2022'
org: SNU
paper_url: https://www.usenix.org/conference/osdi22/presentation/yu
category: engine
parent: —
motivation: 首次提出迭代级调度实现连续批处理
```

#### 📝 一句话总结

Orca 首次系统提出迭代级调度和 selective batching，把不同请求的每个 decode iteration 动态组成 batch，显著提升 Transformer 生成服务吞吐并降低排队浪费。

#### 🎯 核心要点

- 将调度粒度从整请求改为每个生成 iteration
- prefill 和 decode 分阶段处理，避免长短请求互相阻塞
- selective batching 只批处理可共享形状/算子的部分
- 支持 early finish 请求及时离开 batch，释放资源
- 奠定 continuous batching 在 LLM serving 中的核心范式

#### 🔬 深入细节

![Orca 核心示意图](https://www.usenix.org/system/files/osdi22-yu.pdf)
*图：USENIX OSDI 2022 官方论文 PDF；论文框架图展示 Orca 的迭代级调度和批处理执行流程。*

```python
# Orca iteration-level scheduling
waiting = request_queue
running = []
while True:
    admit_prefill_requests(waiting, running, budget)
    batch = collect_next_iterations(running)
    outputs = model.forward(batch)  # one decode iteration per request
    for req, out in outputs:
        req.append(out.token)
        if req.finished():
            running.remove(req)
```

##### 动机与背景

传统深度学习 serving 常按请求级 batching：一批请求必须一起完成。生成式模型输出长度不一，长请求会拖住短请求；每步 decode 只生成一个 token，若不连续补充新请求，GPU 很容易空转。

##### 核心机制

Orca 把每个请求拆成 prefill 和一系列 decode iterations。调度器每一轮重新组 batch，已完成请求立刻退出，新请求可插入。selective batching 进一步处理不同阶段和不同张量形状，避免为了批处理牺牲太多效率。

##### 训练/推理流程

请求进入队列后先执行 prefill；随后在每个 decode iteration 加入运行集。模型前向返回新 token 后，调度器检查停止条件、更新 KV cache 和请求状态，然后构造下一轮 batch。

##### 与传统方法的区别

Orca 与静态 batching 最大区别是调度粒度。它不是新的模型结构，而是 LLM 服务系统的执行范式，后续 vLLM、TensorRT-LLM、SGLang 等都继承或扩展了 continuous batching 思想。

#### 🧪 练习题

```yaml
question: "Orca 的关键调度粒度是什么？"
options:
  - "整请求级"
  - "迭代级 decode step"
  - "训练 epoch"
  - "文件块"
answer: 1
explain: "Orca 每个生成 iteration 重新组成 batch，使完成请求及时退出、新请求及时加入。"
```
