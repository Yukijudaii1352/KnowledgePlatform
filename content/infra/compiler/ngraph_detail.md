### nGraph — Intel深度学习统一编译器

```yaml
id: ngraph
name: nGraph
full_name: Intel深度学习统一编译器 (Intel nGraph)
year: '2018'
org: Intel
paper_url: https://arxiv.org/abs/1801.08058
category: graph_compilers
parent: —
motivation: 框架无关统一IR，解决Intel异构硬件多框架适配问题
```

#### 📝 一句话总结

nGraph 提出框架无关的深度学习 IR、Framework Bridge 和 Backend Transformer 体系，把 TensorFlow、MXNet、neon 等前端计算图统一编译到 CPU、Nervana NNP、NVIDIA GPU 等后端，解决多框架乘多硬件适配带来的重复优化问题。

#### 🎯 核心要点

- **统一 IR**：用 stateless operation node 组成 DAG，节点输入和属性决定输出 shape 与 element type，避免被某个框架的图语义绑定
- **Framework Bridge**：每个框架只需实现桥接层，把自身计算图翻译成 nGraph IR，并把编译后的函数接回框架执行引擎
- **Backend Transformer**：每个硬件后端提供 transformer，负责 pattern matching、liveness analysis、memory management、layout 管理和后端代码生成
- **适配复杂度降低**：直接在每个框架里适配每种硬件需要 \(\mathcal{O}(fp)\) 工作量；nGraph 通过 \(f\) 个 bridge 和 \(p\) 个 transformer 将目标逼近 \(\mathcal{O}(f+p)\)
- **布局抽象**：IR 的逻辑轴顺序不固定等同于物理内存布局，使 transformer 能为 MKL-DNN、cuDNN、NNP 等后端选择不同 layout
- **训练与推理并重**：相比仅面向推理标准化的 ONNX，论文强调 nGraph IR 支持训练、自动微分、优化 pass 和多后端执行
- **初始后端**：CPU transformer 调用 MKL-DNN；NNP transformer 针对 Nervana NNP；cuDNN transformer 动态生成 CUDA/cuDNN 调用并可经 LLVM 生成 PTX

#### 🔬 深入细节

![nGraph 架构图](https://ar5iv.labs.arxiv.org/html/1801.08058/assets/fig.jpeg)
*图：nGraph 通过前端框架桥接层接收计算图，经统一 IR 交给不同 backend transformer 编译和执行。来源：论文 Figure 1*

```python
# nGraph 端到端编译执行伪代码
def run_with_ngraph(framework_graph, framework, target_backend, runtime_inputs):
    # 1. Framework Bridge: 框架图 -> nGraph IR
    ir_function = framework.bridge.lower_to_ngraph_ir(framework_graph)

    # 2. IR 标准化：形状/类型推断、常量属性检查、训练图或推理图分析
    for node in topological_sort(ir_function):
        node.output_shape = node.op.infer_shape(node.inputs, node.attrs)
        node.output_dtype = node.op.infer_dtype(node.inputs, node.attrs)

    # 3. Backend Transformer: 选择硬件相关优化与 kernel strategy
    transformer = TransformerRegistry.get(target_backend)
    transformer.apply_pattern_rewrites(ir_function)
    transformer.plan_liveness_and_memory(ir_function)
    transformer.choose_tensor_layouts(ir_function)

    # 4. 生成可执行函数并交回原框架运行时
    executable = transformer.compile(ir_function)
    buffers = transformer.allocate(runtime_inputs)
    return executable.invoke(buffers)
```

**动机与背景：多框架乘多硬件的适配爆炸**

论文把传统做法称为 direct optimization：TensorFlow、MXNet、Caffe、neon 等框架各自内置 CPU/GPU/ASIC 后端，硬件厂商若想支持新框架，往往需要深入改动该框架的图执行器、算子注册、内存分配和自动微分路径。若框架数为 \(f\)、硬件平台数为 \(p\)，逐对适配的工程量近似为：

$$
C_{\text{direct}} = \mathcal{O}(f \cdot p)
$$

nGraph 的核心抽象是把这张二维适配矩阵拆成两条一维接口：框架侧实现 bridge，硬件侧实现 transformer。理想情况下，新增一个框架只增加一个 bridge，新增一个硬件只增加一个 transformer：

$$
C_{\text{ngraph}} \approx \mathcal{O}(f + p)
$$

这不是单纯的接口封装，而是把图优化、内存计划、layout 决策和后端 kernel selection 收敛到统一 IR 层，避免每个框架重复实现同类编译优化。

**核心机制：stateless DAG IR 与 shape/type 语义**

nGraph IR 是由无状态 operation node 构成的有向无环图。每个节点有若干输入、输出和常量属性，例如 reduction axes、padding、stride 等；节点的输入类型和属性决定输出张量的 shape 与 element type。可以把每个 IR 节点理解为一个纯函数：

$$
(S_{\text{out}}, T_{\text{out}}) =
\operatorname{Infer}_{op}(S_{\text{in}}, T_{\text{in}}, A_{op})
$$

其中 \(S\) 表示 shape，\(T\) 表示 element type，\(A_{op}\) 表示算子属性。这个设计让编译器在执行前就能做静态检查、内存规划和后端选择。与更通用的编程语言 IR 不同，nGraph 有意保持数据流图形态，因为深度学习张量操作通常是大块、可并行、少副作用的计算；简单图 IR 更便于做 liveness、buffer reuse 和 kernel 匹配。

**Framework Bridge：保持框架接口，替换后端执行**

Bridge 的职责不是重写框架，而是伪装成该框架的一个后端。MXNet bridge 会把 NNVM inference graph 翻译为 nGraph IR，选择尽可能大的子图交给目标后端，并可在 nGraph IR 上做 autodiff；TensorFlow bridge 则注册为 XLA device，把 TensorFlow HLO 映射为 nGraph IR，再返回编译函数供 TensorFlow 调用。这个思路降低了迁移门槛：用户仍用原框架写模型，框架仍管理训练 loop 和数据入口，但可把可编译子图下沉到 nGraph。

> 💡 关键：nGraph 的 bridge/transformer 分层让“前端语义适配”和“后端性能优化”解耦。前端只需要知道如何表达计算，后端只需要知道如何高效执行统一 IR。

**Backend Transformer：从统一 IR 到硬件相关执行**

Transformer 是 nGraph 真正的后端编译器。它接收 IR 后执行 pattern matching、活跃性分析、内存管理、tensor layout 管理和 kernel 选择。CPU transformer 借助 MKL-DNN 生成优化 kernel 调用序列；NNP transformer 尽量映射到 Nervana NNP 原生能力，对不支持的子图回退到 CPU transformer；cuDNN transformer 为卷积、softmax 等常见 kernel 生成 CUDA/cuDNN 调用，并把部分图 lowering 到 LLVM IR，再经 PTX 后端生成 GPU 汇编级代码。其抽象可以写成：

$$
\operatorname{Executable}_{b}
= \operatorname{Transformer}_{b}
  \left(\operatorname{Passes}(\operatorname{IR})\right)
$$

其中 \(b\) 是目标后端。与只调用 vendor library 的运行时不同，transformer 可以在图级别做 memory planning 与 layout decision，再与后端库粒度优化叠加。

**布局抽象：逻辑轴不等于物理存储**

很多框架默认把图语义和内存布局绑在一起，例如图像张量常写成 NCHW 或 NHWC。nGraph 论文中特别强调：除了用户可直接访问的张量外，IR 不把 axis order 固定解释为 element layout。这让 transformer 可以为不同后端选择不同地址映射：

$$
\operatorname{addr}
= L_b(i_0, i_1, \ldots, i_{r-1})
$$

同一个逻辑张量索引 \((i_0,\ldots,i_{r-1})\) 可以在 CPU 后端采用缓存友好的 blocked layout，在 GPU 后端采用更适合 cuDNN 的 layout，在 NNP 后端采用芯片原生 layout。其收益不只是避免 transpose，还让 layout propagation、buffer reuse 和 kernel selection 变成同一个 transformer 内部的联合决策。

**与同期系统的区别**

XLA 当时主要作为 TensorFlow 的实验后端，nGraph 的定位更强调多框架；NNVM/TVM 也追求多后端，但论文指出 NNVM 算子集未固定会导致前后端兼容性问题，而 nGraph 选择固定但可扩展的 IR operation set；ONNX 则更偏推理标准交换格式，nGraph 目标还包括训练、pass 和执行。nGraph 的贡献不是提出复杂新优化算法，而是把深度学习编译器工程拆成可扩展架构：框架桥接、统一 IR、后端 transformer 和执行 API。

#### 🧪 练习题

```yaml
question: "nGraph 用 Framework Bridge 和 Backend Transformer 分层的主要目的是什么？"
options:
  - "让所有框架都改用同一种 Python API"
  - "把多框架与多硬件逐对适配的工作拆成前端桥接和后端编译两类接口"
  - "只为 Intel CPU 替换 cuDNN kernel"
  - "把动态图全部改写成控制流语言 IR"
answer: 1
explain: "Bridge 负责框架图到 nGraph IR，Transformer 负责 IR 到硬件执行，目标是把 O(f·p) 的适配矩阵拆成 O(f+p) 的接口集合。"
```
