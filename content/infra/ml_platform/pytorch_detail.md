### PyTorch

```yaml
id: pytorch
name: PyTorch
full_name: PyTorch
year: '2019'
org: Meta FAIR
paper_url: https://arxiv.org/abs/1912.01703
category: training_platform
parent: —
motivation: 命令式编程与动态图，提升科研灵活性
```

#### 📝 一句话总结

PyTorch 提出一种 Python-first、命令式、动态图的深度学习框架，把模型、数据加载、优化器和调试过程都保留为普通 Python 程序，同时通过 C++/CUDA 运行时、自动微分和异步 GPU 执行维持高性能。它解决了早期静态图框架在研究迭代、动态控制流和调试体验上的高摩擦问题。

#### 🎯 核心要点

- 采用 imperative/eager execution：Tensor 运算立即执行，模型就是普通 Python 控制流
- 使用 define-by-run 动态计算图，每次前向按实际执行路径构建 autograd graph
- 实现 reverse-mode automatic differentiation，用 operator overloading 记录梯度函数与依赖
- 将控制流留在 Python/C++ host 侧，将张量计算下沉到 libtorch、cuDNN、cuBLAS 和 CUDA kernel
- 通过 CUDA stream 异步排队，使 CPU 调度与 GPU kernel 执行重叠，提高设备利用率
- 使用 caching allocator 与引用计数降低 GPU 内存分配、释放和垃圾回收带来的同步开销
- 保持与 NumPy、DLPack、Python debugger、multiprocessing 和生态工具的互操作性
- 通过 `nn.Module`、`Optimizer`、`DataLoader`、TorchScript、C++ frontend 和分布式工具补齐工程化路径

#### 🔬 深入细节

![PyTorch 异步执行 trace](https://ar5iv.labs.arxiv.org/html/1912.01703/assets/x1.png)
*图：PyTorch 论文 Figure 3 的 ar5iv 镜像。论文没有传统框架总览图，这张 trace 展示了 PyTorch 的关键运行时机制：CPU 侧快速排队算子，GPU 侧异步执行卷积、BatchNorm 等 kernel，从而让命令式 Python 代码仍能保持较高设备利用率。*

```python
# PyTorch 动态图自动微分训练伪代码
class RouterBlock(torch.nn.Module):
    def __init__(self, small, large, head):
        super().__init__()
        self.small = small
        self.large = large
        self.head = head

    def forward(self, x):
        # Python 控制流决定本次真实计算图；下一次 forward 可以走不同路径
        h = self.large(x) if x.shape[-1] > 512 else self.small(x)
        return self.head(torch.relu(h))

model = RouterBlock(small_net, large_net, classifier).cuda()
optimizer = torch.optim.Adam(model.parameters(), lr=3e-4)

for x, y in loader:
    optimizer.zero_grad(set_to_none=True)
    logits = model(x.cuda(non_blocking=True))   # eager 前向，同时记录 autograd 节点
    loss = torch.nn.functional.cross_entropy(logits, y.cuda(non_blocking=True))
    loss.backward()                             # reverse-mode AD 反向遍历本次图
    optimizer.step()                            # 参数更新仍是普通 Python 调用
```

PyTorch 的核心立场是“深度学习模型首先是程序”。静态图框架要求用户先声明完整 dataflow graph，再交给运行时反复执行；这种方式利于全图优化，但会把 Python 调试器、条件分支、循环、递归、动态 shape 和复杂训练逻辑隔离在图构建之外。PyTorch 选择 eager execution：`forward` 调用时立即执行，用户可以在任意中间值上打断点、打印、画图或调用普通 Python 库。论文的关键论证是：通过谨慎的运行时实现，动态图的可用性不必以大幅性能损失为代价。

自动微分是 PyTorch 让“普通程序”可训练的桥梁。每个需要梯度的 Tensor 在运算时会生成或连接到一个 `grad_fn`，运行时记录本次实际执行过的算子、输入输出关系和反向所需的 saved tensors。若前向可写成 \(y=f_\theta(x)\)、损失为 \(L(y)\)，反向传播本质上是在动态图上做向量-Jacobian 积累：

$$
\bar{x}_i=\sum_j \bar{y}_j\frac{\partial y_j}{\partial x_i},
\quad \bar{\theta}=\frac{\partial L}{\partial \theta}
$$

这里 \(\bar{y}_j=\partial L/\partial y_j\)。PyTorch 使用 reverse-mode AD，是因为训练中通常是一个标量 loss 对大量参数求梯度；每个算子只需要实现本地 vector-Jacobian product，autograd engine 就能从 loss 节点反向调度整个图。由于图是在前向时临时构建的，下一次 batch 可以走不同分支或不同循环次数，这正是 define-by-run 的灵活性来源。

命令式接口之所以没有把性能拖垮，是因为 PyTorch 明确分离 control flow 和 data flow。Python 负责决定执行哪些算子，数值密集计算由 C++ core/libtorch 调用底层 CPU/GPU kernel。GPU 上的算子通过 CUDA stream 排队，CPU 发起 kernel 后通常不等待其完成，而是继续提交后续工作；只在读取 GPU 结果、跨 stream 依赖或显式同步时才阻塞。可以把一次训练 step 的执行理解为：

$$
\text{Python control} \rightarrow
\text{C++ dispatcher} \rightarrow
\text{CUDA enqueue} \rightarrow
\text{GPU kernel execution}
$$

论文的 trace 图说明，CPU 侧排队速度可以快于 GPU 侧实际计算时间，于是解释器开销被隐藏在异步执行之后。这也是 PyTorch 能在保持 Pythonic 使用体验的同时接近静态图框架吞吐的关键。

内存管理是另一个容易被低估的系统点。GPU 内存分配通常会触发昂贵同步，如果每个临时 Tensor 都直接 `cudaMalloc/cudaFree`，eager 模式会频繁卡住。PyTorch 使用 caching allocator 复用已释放的块，并结合 CPython 引用计数尽早释放不再使用的 Tensor。对用户来说，这保持了“对象离开作用域就可回收”的直觉；对运行时来说，缓存池避免了分配器同步和碎片化带来的性能悬崖。

PyTorch 的设计也刻意降低生态边界。Tensor 可以与 NumPy 或 DLPack 做零拷贝互转，`Dataset`/`DataLoader` 把 Python 数据处理和 pinned memory 传输组织成训练输入管线，`torch.multiprocessing` 能把 Tensor 存储移到共享内存以减少进程间复制。`nn.Module` 并不是强制图语言，而是参数注册、层组合和状态管理约定；Optimizer 也只是操作参数集合的 Python 对象，因此 GAN、元学习、多损失交替优化等非标准训练循环可以直接表达。

与 TensorFlow 1.x/Theano 这类静态图相比，PyTorch 牺牲了一部分提前全图优化空间，换来模型定义、调试和研究迭代的直接性；与纯 NumPy 相比，它补上了自动微分、GPU kernel、模块系统、数据管线和分布式训练。后续 TorchScript、C++ frontend 与编译路径可以看作在同一哲学下补足部署需求：先让研究代码自然运行，再在需要时把一部分动态程序捕获、编译或迁移到非 Python 环境。

> 💡 关键：PyTorch 论文的贡献不是某个新损失函数，而是证明“命令式 Python 程序 + 动态 autograd + C++/CUDA 高性能运行时”可以同时满足研究灵活性和主流深度学习性能。

#### 🧪 练习题

```yaml
question: "PyTorch define-by-run 动态图最核心的含义是什么？"
options:
  - "每次前向执行都会按真实 Python 控制流记录本次计算图，反向传播只沿本次图求梯度"
  - "训练开始前必须把所有算子编译成固定静态图"
  - "用户需要为每个 Tensor 手写梯度公式"
  - "动态图意味着所有运算只能在 CPU 上同步执行"
answer: 0
explain: "PyTorch 在 eager 前向中用 operator overloading 记录实际发生的运算；loss.backward() 根据这次记录的图做 reverse-mode 自动微分。"
```
