### PyTorch

```yaml
id: pytorch
name: PyTorch
full_name: PyTorch
year: "2019"
org: Meta FAIR
paper_url: https://arxiv.org/abs/1912.01703
category: training_platform
parent: —
motivation: 命令式编程与动态图，提升科研灵活性
```

#### 📝 一句话总结

PyTorch 通过命令式编程、动态图自动微分和高性能张量库，把深度学习模型写成普通 Python 程序，解决静态图框架在研究迭代、调试和动态控制流上的摩擦。

#### 🎯 核心要点

- 动态图 autograd 在运行时记录 op tape，反向传播按实际执行路径求梯度
- Tensor 库与 NumPy 风格接口接近，同时支持 CUDA kernel 和异步 GPU 执行
- Module/Optimizer/DataLoader 组合成轻量训练栈，但不强制模型结构写法
- Python-first 设计便于调试、条件分支、循环、递归和复杂 loss
- 后续通过 TorchScript、JIT、DistributedDataParallel 补足部署与分布式性能

#### 🔬 深入细节

![PyTorch 核心示意图](https://ar5iv.labs.arxiv.org/html/1912.01703/assets/x1.png)
*图：图示是论文中的模型代码示例，强调 PyTorch 将网络定义为普通 Python 程序而非预先构建的静态图。*

```python
# PyTorch 动态图训练伪代码
model = Net().cuda()
opt = torch.optim.Adam(model.parameters())
for x, y in loader:
    opt.zero_grad()
    pred = model(x.cuda())      # 前向执行时记录 autograd graph
    loss = criterion(pred, y.cuda())
    loss.backward()             # 沿本次实际执行路径反传
    opt.step()
```

PyTorch 的核心取舍是“可用性优先但不放弃性能”。早期 TensorFlow 静态图需要先声明计算图再运行 session，图构建与 Python 调试分离；PyTorch 则让每一次前向调用立即执行，用户可用普通断点、print 和控制流。

动态图自动微分在前向执行时记录由 Tensor operation 组成的计算历史。调用 backward 时，autograd engine 从 loss 出发沿 graph 反向调用每个 op 的 gradient function；下一次迭代会重新构建新图，因此天然支持变长输入和条件分支。

性能方面，PyTorch 并不是逐行 Python 解释执行数值计算。Tensor op 会调用底层 C++/CUDA kernel，GPU kernel launch 异步排队，CPU 只负责调度；缓存分配器减少 cudaMalloc/cudaFree 带来的同步开销。

与 TensorFlow 早期静态图相比，PyTorch 更适合科研原型；与纯 NumPy 相比，它有自动微分、GPU、模块系统和分布式训练能力。后续 TorchScript 与 PyTorch 2.x 编译栈则是在保留命令式体验的同时补齐图优化。

> 💡 关键：这类 ML 平台论文的贡献通常不在单个数学公式，而在把计算、状态、通信、调度和故障边界重新组织成可扩展的系统抽象。

#### 🧪 练习题

```yaml
question: "PyTorch 动态图的关键特征是什么？"
options:
  - "每次前向执行都会按实际 Python 控制流构建 autograd graph"
  - "训练前必须把所有 batch 形状固定"
  - "只能在 CPU 上运行"
  - "所有梯度由用户手写"
answer: 0
explain: "动态图让模型执行路径与 Python 程序一致，反向传播基于本次实际记录的计算历史。"
```
