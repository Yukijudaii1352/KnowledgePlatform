### Colossal-AI

```yaml
id: colossal_ai
name: Colossal-AI
full_name: Colossal-AI
year: "2023"
org: HPC-AI Tech
paper_url: https://arxiv.org/abs/2110.14883
category: training_platform
parent: alpa
motivation: 统一的大规模并行训练系统
```

#### 📝 一句话总结

Colossal-AI 提出统一的大规模并行训练系统，将数据并行、张量并行、流水线并行、序列并行和内存优化封装为可组合能力，降低超大模型训练的使用门槛。

#### 🎯 核心要点

- 提供 Gemini/ZeRO 类内存管理，将参数、梯度、优化器状态在 GPU/CPU 间动态放置
- 支持 1D/2D/2.5D/3D 张量并行、pipeline 并行和数据并行组合
- Booster/Plugin 抽象把并行策略与用户训练循环解耦
- 面向 PyTorch 生态，保留命令式开发体验并提供自动混合精度、checkpoint 等能力
- 目标是以统一接口覆盖从单卡到大规模集群的训练配置

#### 🔬 深入细节

> 图示说明：官方论文/项目资料的系统图可概括为 Booster 接管 model、optimizer、dataloader，再由不同 plugin 注入 ZeRO、tensor parallel、pipeline parallel、AMP 和 checkpoint 策略。

```python
# Colossal-AI Booster 风格训练伪代码
booster = Booster(plugin=HybridParallelPlugin(tp_size=2, pp_size=4, zero_stage=2))
model, optimizer, criterion, dataloader, scheduler = booster.boost(
    model, optimizer, criterion, dataloader, scheduler
)
for batch in dataloader:
    outputs = model(batch)
    loss = criterion(outputs)
    booster.backward(loss, optimizer)
    optimizer.step(); optimizer.zero_grad()
```

随着大模型训练进入百亿参数规模，单一并行方式通常不够。数据并行受显存冗余限制，张量并行受高速互联范围限制，流水线并行受 bubble 和切分平衡影响；工程系统需要把这些策略组合起来。

Colossal-AI 的定位是把复杂并行策略封装进 PyTorch 训练栈。用户仍写常规 model、optimizer 和 dataloader，再由 Booster/Plugin 对模块、参数和通信进行包装。

内存优化是系统重点。ZeRO/Gemini 思路将不同模型状态分片或卸载，按计算阶段把需要的状态调入 GPU；这与张量/流水线并行正交，可共同降低单卡显存。

与 Alpa 侧重自动搜索不同，Colossal-AI 更偏工程平台：提供多种并行原语和可插拔运行时，让用户按硬件拓扑和模型规模选择组合策略。

> 💡 关键：这类 ML 平台论文的贡献通常不在单个数学公式，而在把计算、状态、通信、调度和故障边界重新组织成可扩展的系统抽象。

#### 🧪 练习题

```yaml
question: "Colossal-AI Booster/Plugin 抽象的主要目的是什么？"
options:
  - "把并行和内存策略封装起来，尽量少改用户训练循环"
  - "替代所有深度学习框架"
  - "只做数据清洗"
  - "生成随机数据集"
answer: 0
explain: "Booster 接管训练对象并注入并行、AMP、ZeRO 等策略。"
```
