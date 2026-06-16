### Ascend Da Vinci

```yaml
id: ascend_davinci
name: Ascend Da Vinci
full_name: 昇腾达芬奇架构 (Ascend Da Vinci Architecture)
year: '2021'
org: Huawei
paper_url: —
category: npu_asic
parent: —
motivation: 3D Cube计算单元实现端云统一架构覆盖
```

#### 📝 一句话总结

Ascend Da Vinci 是华为昇腾 NPU 的核心计算架构，用 Cube、Vector、Scalar 和显式存储搬运单元组成 AI Core。它通过 3D Cube 矩阵计算和可扩展 AI Core 集群覆盖训练、推理、边缘和端侧场景，解决了统一架构下兼顾矩阵吞吐、算子灵活性和能效的问题。

#### 🎯 核心要点

- AI Core 由 Cube、Vector、Scalar、MTE 和片上多级存储组成，分别负责矩阵、向量、控制和数据搬运
- Cube 单元面向矩阵乘/卷积主算子，把神经网络中的 GEMM 映射到高吞吐 3D 计算结构
- Vector 单元处理激活、归一化、逐元素算子、数据类型转换和后处理，补足 Cube 的固定矩阵能力
- Scalar 单元负责控制流、地址生成、循环调度和指令协同，使 AI Core 不是纯固定功能阵列
- 显式内存层次包含 Global Memory、L1、L0A/L0B/L0C、Unified Buffer 等，由编译器/算子代码安排搬运
- CANN、TBE/TIK、Ascend C 等软件栈把深度学习图编译成 AI Core 可执行的分块、搬运和计算流水线
- 同一 Da Vinci 架构思想被扩展到 Ascend 310、Ascend 910 等芯片，覆盖边缘推理到数据中心训练

#### 🔬 深入细节

##### 核心示意图

![Da Vinci Architecture](https://media.springernature.com/full/springer-static/image/chp%3A10.1007%2F978-981-19-2879-6_6/MediaObjects/513316_1_En_6_Fig2_HTML.png)
*图：Da Vinci Architecture 的公开架构示意，展示 Cube、Vector、Scalar、Memory Migration Unit、Instruction Queue 与事件同步模块；来源为 Springer Nature Open Access 章节《Huawei Atlas AI Computing Solution》。*

##### 算法伪代码

```python
# Ascend Da Vinci AI Core 上的分块 GEMM/卷积数据流伪代码
for core in ai_cores:
    for m_tile, n_tile, k_tile in schedule(problem_shape):
        mte2_copy_gm_to_l1(A[m_tile, k_tile], B[k_tile, n_tile])
        mte1_copy_l1_to_l0(l0a=A_tile, l0b=B_tile)
        c_tile = cube_mmad(l0a, l0b, accumulate=True)
        ub_tile = move_l0c_to_ub(c_tile)
        ub_tile = vector_postprocess(ub_tile, bias, activation, cast)
        mte3_copy_ub_to_gm(C[m_tile, n_tile], ub_tile)
```

Da Vinci 架构的基本判断是：神经网络工作负载中，绝大多数 FLOPs 来自矩阵乘、卷积和 attention 里的 batched GEMM，但一个完整模型并不只包含矩阵乘。激活函数、LayerNorm/BatchNorm、reshape、padding、数据格式转换和 loss 计算都需要更灵活的向量与标量能力。Da Vinci 因此没有把 AI Core 设计成单一脉动阵列，而是把高吞吐 Cube 与可编程 Vector/Scalar 组合在一起。

Cube 单元对应主计算公式：

$$C_{m,n}=\sum_{k=0}^{K-1}A_{m,k}B_{k,n}$$

3D Cube 的直觉是把矩阵块的 \(M\)、\(N\)、\(K\) 三个维度同时展开：\(M\) 和 \(N\) 方向产生输出块，\(K\) 方向做乘累加规约。这样一个 Cube 指令可以消耗 L0A/L0B 中的输入块并把累加结果写入 L0C。与把 GEMM 拆成大量通用 SIMD 指令相比，Cube 暴露了更粗粒度的数据复用机会，也能让硬件在固定数据路径内提升吞吐/瓦特。

Da Vinci 的另一个关键是显式存储层次。Global Memory 保存模型权重、激活和梯度，L1/Unified Buffer 承接较大的片上块，L0A/L0B/L0C 分别服务 Cube 输入和累加输出。数据搬运由 MTE 管线完成，计算由 Cube/Vector 管线完成，性能好坏很大程度取决于能否让搬运与计算重叠：

$$T_{\text{tile}}\approx \max(T_{\text{copy}},T_{\text{cube}},T_{\text{vector}})+T_{\text{sync}}$$

这也是 Ascend 算子开发强调 tiling、double buffer 和 pipeline 的原因。算子不是只写数学公式，还要决定每个 tile 的形状、在片上哪个缓冲区驻留、什么时候预取下一块、什么时候把结果写回。

Vector 与 Scalar 使架构具备可编程性。Vector 管线执行逐元素运算、类型转换、比较选择和归一化中的局部规约；Scalar 管线负责循环、分支、地址计算和指令控制。一个典型算子会让 Scalar 维护 tile 循环，MTE 预取下一块数据，Cube 计算当前矩阵块，Vector 对上一块结果做 bias、activation 或 cast，从而形成多管线并行。

与 GPU 的 SIMT/warp 模型相比，Da Vinci 更接近“显式编排的张量数据流机器”。GPU 程序通常依赖缓存层次和线程调度器隐藏复杂性；Ascend AI Core 则要求编译器或算子模板明确表达数据搬运和片上存储占用。代价是开发和编译复杂度更高，收益是对深度学习主算子的能效、确定性和端云统一部署更友好。

#### 🧪 练习题

```yaml
question: "Ascend Da Vinci AI Core 中 Cube 单元主要解决什么问题？"
options:
  - "高吞吐执行矩阵乘和卷积等神经网络主算子"
  - "替代所有片上存储，直接从主存逐元素计算"
  - "只负责 Python 控制流解释执行"
  - "专门处理以太网 RDMA 通信"
answer: 0
explain: "Cube 是 Da Vinci AI Core 的矩阵计算核心，配合 L0/L1/UB 和 MTE 数据搬运实现高效 GEMM/卷积数据流。"
```
