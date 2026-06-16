### IREE：中间表示执行环境

```yaml
id: iree
name: IREE
full_name: 中间表示执行环境 (Intermediate Representation Execution Environment)
year: '2021'
org: Google
paper_url: https://arxiv.org/abs/2205.14479
category: infrastructure
parent: mlir
motivation: 基于MLIR实现云端到嵌入式全场景ML部署
```

#### 📝 一句话总结

IREE 基于 MLIR 构建端到端机器学习编译器和运行时，把模型当作普通程序逐步降低为主机 VM 控制逻辑与设备 dispatch workload，实现从服务器、移动端到 TinyIREE 裸机嵌入式目标的一套统一部署路径。

#### 🎯 核心要点

- **MLIR-based compiler + runtime**：IREE 不只是代码生成器，还包括可加载、调度和执行编译产物的运行时
- **模型即程序**：将 ML 模型导入 TOSA/MHLO 等方言，再逐步降低到 Linalg、Vector、LLVM 或设备相关后端
- **结构化代码生成**：利用 Linalg 的 iterator types 与 indexing maps 做 fusion、tiling、loop interchange 和 dispatch region 划分
- **Host/device 分离**：把程序拆成 VM commands 和 device dispatch regions，前者负责 buffer 与调度，后者负责设备原子执行单元
- **VM FlatBuffer 与 EmitC**：控制逻辑可序列化为 VM bytecode `.vmfb`，也可降到 EmitC/C 调用以去掉 bytecode interpreter
- **HAL 抽象层**：Hardware Abstraction Layer 统一 workload loader、scheduler、buffer allocation 与设备可见性控制
- **TinyIREE 部署选项**：支持 embedded-friendly dynamic library、static library、synchronous HAL driver，甚至在固定 workload 下绕过部分 runtime
- **跨 ISA/ABI 生成**：通过 LLVM target triple、CPU feature、ABI flag 生成 x86、Armv7E-M、RISC-V32 等目标代码
- **低内存运行机制**：stream execution、memory pool、瞬态 buffer 管理和权限控制降低常驻内存与运行时尺寸

#### 🔬 深入细节

![IREE 官方架构图](https://raw.githubusercontent.com/iree-org/iree/main/docs/website/docs/assets/images/iree_architecture.svg)
*图：IREE 官方项目架构图，展示从前端框架导入、MLIR 编译管线、HAL/VM 运行时到多后端执行的整体结构。*

```python
# IREE 从模型到运行的核心流程伪代码
def iree_compile_and_run(model, target_config, inputs):
    # Compile time
    module = import_model_to_mlir(model, dialects=["TOSA", "MHLO"])
    module = lower_to_linalg(module)
    module = fuse_and_tile_linalg(module)
    dispatches = outline_dispatch_regions(module)

    for dispatch in dispatches:
        dispatch = lower_to_vector(dispatch)
        dispatch = lower_to_target_binary(dispatch, target_config)  # LLVM/SPIR-V/etc.

    vm_commands = build_host_side_vm_commands(module, dispatches)
    artifact = package_as_vmfb_or_emitc(vm_commands, dispatches, target_config)

    # Runtime
    runtime = create_iree_runtime(target_config.hal_driver)
    buffers = runtime.allocate_buffers(inputs, permissions=["host-write", "device-read"])
    command_buffer = runtime.vm.prepare_command_buffer(artifact, buffers)
    runtime.hal.schedule(command_buffer, grid=target_config.workgroup_grid)
    return runtime.collect_outputs(buffers)
```

**动机与背景：嵌入式 ML 不该是另一套完全独立的栈**

很多 ML 部署系统要么偏运行时解释器，要么偏特定硬件 kernel 库。TensorFlow Lite Micro 这类 op-by-op runtime 能做到小运行时，但通常依赖有限的手写 operator kernel；Glow、TVM 等编译器能做图优化和算子优化，但嵌入式/裸机目标往往需要额外 extension 来补运行时调度、内存管理和 ABI 细节。IREE 的出发点是把 ML 模型当作一个可编译程序：同一套 MLIR progressive lowering 管线既能面向服务器/GPU，也能通过 TinyIREE 配置缩小到微控制器和裸机平台。

**编译管线：TOSA/MHLO 到 Linalg、Vector、LLVM**

IREE 论文将编译过程描述为一串 MLIR Dialect 降级。前端 Dialect 如 TOSA/MHLO 表达 tensor-level 操作，例如 add、convolution、dot product；Linalg Dialect 把操作表达为结构化完美嵌套循环和标量 loop body，便于 fusion 和 tiling；Vector Dialect 表示可重定向的高层向量操作；LLVM Dialect 则机械转换为 LLVM IR 以交给具体 ISA 后端。以 GEMM 为例，Linalg 用 indexing map 描述 iteration space 到 operand data space 的关系：

$$
D_{ij} = C_{ij} + \sum_k A_{ik}B_{kj}
$$

$$
\#map_A:(i,j,k)\rightarrow(i,k),\quad
\#map_B:(i,j,k)\rightarrow(k,j),\quad
\#map_C:(i,j,k)\rightarrow(i,j)
$$

这种表示让编译器只看 iterator types 和 indexing maps 就能做 producer-consumer fusion、tiling 和 dispatch 划分，而不必枚举高层 op 的所有组合。

**Dispatch region：把计算拆成主机控制与设备原子工作单元**

Linalg 级 tiling 后，每个 tile 可封装为 dispatch region。IREE 的一个核心分解是：

$$
Program = VM_{\text{host control}} \oplus \{\text{DispatchRegion}_r^{\text{device}}\}_{r=1}^{n}
$$

主机侧 VM commands 管理 buffer setup、资源所有权、依赖和 dispatch 顺序；设备侧 dispatch region 包含需要在目标设备上原子执行的计算代码。对 GPU 后端，这可以进一步降为 SPIR-V kernel 和 API 调用；对 CPU/嵌入式后端，则经 Vector/LLVM 生成静态或动态库。这个拆分让 IREE 同时表达“调度逻辑”和“执行逻辑”，避免传统只生成 kernel 却把运行时编排留给外部系统的问题。

**TinyIREE：同一编译流，替换部署形态**

TinyIREE 是 IREE 面向嵌入式/裸机的小型化配置集合。VM 控制逻辑可以保留为 FlatBuffer 中的 bytecode，由 runtime interpreter 执行；也可以通过 VM Dialect 降到 EmitC，再生成 C/C++ 调用，链接时去掉 bytecode interpreter，进一步减小二进制。设备 workload 可以是 dynamic library，方便运行时按架构选择，也可以是 static library，便于裸机和 link-time optimization。论文中的结果显示，切到 static/embedded 模式并使用 EmitC 时，可显著减少 host library 和 workload 尺寸。

**HAL、调度与内存：运行时是 IREE 的另一半**

IREE runtime 通过 HAL driver 抽象不同设备。HAL 包含 workload loader、scheduler、buffer allocator 和设备可见性/权限控制。论文给出的 workload dispatch loop 使用 3D grid：

```c
for (int z = 0; z < worker.cnt.z; ++z)
  for (int y = 0; y < worker.cnt.y; ++y)
    for (int x = 0; x < worker.cnt.x; ++x) {
      vec3_t work_id = {{x, y, z}};
      dispatch_ptr(&state, &work_id);
    }
```

有线程支持时，IREE 可用 asynchronous task scheduler 做 DAG 的乱序和流水执行；裸机或无 OS 目标则可使用 synchronous scheduler 顺序派发。Stream execution 进一步把依赖信息交给底层调度器，并从理解流式行为的 memory pool 中申请临时内存，使常驻内存主要由常量和少量状态组成。Buffer allocator 还能显式设置 host/device 可见性和读写权限，例如输入 buffer 由 host 写入、device 只读消费，这为受限设备和安全执行环境提供了统一接口。

**与传统方案的区别**

与 TFLM 相比，IREE 不是固定 operator subset 的轻量解释器，而是编译器优先的部署栈；模型中的预处理、后处理和线性代数计算只要能降到合适 Dialect，就能走同一套 fusion/tiling/codegen。与只做 kernel 生成的编译器相比，IREE 把 VM、HAL、FlatBuffer/EmitC、scheduler、buffer permission 都纳入系统边界。与一般 MLIR 编译管线相比，IREE 的独特性在于它把编译产物定义为可被运行时加载和调度的 deployment artifact，而不是只输出目标 IR 或目标代码。

> 💡 关键：IREE 的价值在“编译器和运行时共同设计”。MLIR 负责跨抽象层优化，VM/HAL 负责跨设备部署与执行，两者合在一起才支撑从云端到裸机的同一套模型部署路径。

#### 🧪 练习题

```yaml
question: "IREE 中 dispatch region 的主要作用是什么？"
options:
  - "保存训练数据集的元信息"
  - "把设备上原子执行的 tiled computation 从主机 VM 控制逻辑中划分出来"
  - "替代所有 MLIR Dialect，使模型直接变成 Python 代码"
  - "只用于压缩模型权重，与执行调度无关"
answer: 1
explain: "IREE 将程序拆成主机 VM commands 和设备 dispatch regions；dispatch region 承载设备侧计算，VM commands 负责 buffer、依赖和调度。"
```
