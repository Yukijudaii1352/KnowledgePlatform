### CUDA

```yaml
id: cuda
name: CUDA
full_name: 统一计算设备架构 (Compute Unified Device Architecture)
year: '2008'
org: NVIDIA
paper_url: —
category: gpu_architecture
parent: —
motivation: 将GPU转变为通用并行计算平台
```

#### 📝 一句话总结

CUDA 提出了面向 NVIDIA GPU 的通用并行编程与执行模型，把图形处理器从固定图形流水线扩展为可编程的大规模数据并行计算平台。它通过线程层次、SIMT 执行、显式内存层次和运行时 API，解决了早期 GPGPU 必须伪装成图形渲染任务、编程门槛高且性能不可控的问题。

#### 🎯 核心要点

- 线程层次：Thread → Block/CTA → Grid，Block 内线程可同步并共享片上 shared memory
- SIMT 执行模型：一个 warp 内多线程共享指令流，按线程谓词处理分支分歧
- 显式内存层次：register、shared memory、global memory、constant/texture memory 分工明确
- 软件栈：CUDA C/C++、运行时 API、驱动 API、PTX 虚拟 ISA 和设备二进制共同构成可移植编程接口
- 性能核心：通过合并访存、占用率、线程块调度和 shared memory tiling 暴露 GPU 并行能力
- 生态意义：为后续 cuBLAS、cuDNN、Tensor Core、NCCL 以及深度学习框架 GPU 后端奠定基础

#### 🔬 深入细节

##### 核心示意图

![CUDA SIMT 执行与内存层次示意](https://placehold.co/900x420/png?text=CUDA+Grid+Block+Thread+SIMT+Memory)
*图：基于 NVIDIA CUDA Programming Guide 整理的 CUDA 线程层次和内存层次示意；官方资料以线程块、网格和 shared/global memory 作为核心抽象。*

##### 算法伪代码

```cuda
// CUDA tiled GEMM 伪代码：用 shared memory 降低全局内存访问
__global__ void matmul(float* A, float* B, float* C, int N) {
    __shared__ float As[T][T], Bs[T][T];
    int row = blockIdx.y * T + threadIdx.y;
    int col = blockIdx.x * T + threadIdx.x;
    float acc = 0.0f;

    for (int tile = 0; tile < N; tile += T) {
        As[threadIdx.y][threadIdx.x] = A[row * N + tile + threadIdx.x];
        Bs[threadIdx.y][threadIdx.x] = B[(tile + threadIdx.y) * N + col];
        __syncthreads();
        for (int k = 0; k < T; k++) acc += As[threadIdx.y][k] * Bs[k][threadIdx.x];
        __syncthreads();
    }
    C[row * N + col] = acc;
}
```

CUDA 的关键动机是把 GPU 上大量算术单元暴露给通用程序。早期 GPGPU 需要把矩阵或数组编码成纹理，再通过 shader 完成计算，开发者必须绕过图形 API 的限制。CUDA 将核心抽象改成 kernel、thread、block 和 grid，使程序员直接表达数据并行任务，硬件调度器则把 block 映射到 SM 上执行。

SIMT 是 CUDA 与传统 SIMD 的重要区别。程序员写的是标量线程代码，但硬件按 warp 成组发射指令；当 warp 内线程走不同分支时，硬件通过 active mask 分阶段执行不同路径。因此高性能 CUDA 程序要尽量减少 warp divergence，并让相邻线程访问连续地址以形成 coalesced memory transaction。

CUDA 也把内存层次变成性能优化对象。global memory 容量大但延迟高，shared memory 容量小但可由 block 内线程协作复用，register 保存线程私有状态。矩阵乘法、卷积和 stencil 等算法通常先把数据 tile 到 shared memory，再在片上复用多次，从而把带宽瓶颈转化为更高算术强度。

与 CPU 线程模型相比，CUDA 不追求少量复杂线程的低延迟，而是依靠海量轻量线程隐藏访存延迟。当某个 warp 等待内存时，SM 可切换到其他 ready warp。这个设计让 GPU 成为深度学习训练和推理的主平台，也解释了后续 Tensor Core、NCCL 和 CUDA Graph 等能力都围绕 CUDA 执行模型演进。

#### 🧪 练习题

```yaml
question: "CUDA 中 shared memory 的主要作用是什么？"
options:
  - "在 block 内缓存并复用数据，减少 global memory 访问"
  - "替代所有寄存器保存线程私有变量"
  - "自动完成跨 GPU 的 RDMA 通信"
  - "让 CPU 直接执行 GPU kernel"
answer: 0
explain: "shared memory 是 SM 上的片上存储，可被同一 block 的线程共享，常用于 tiling 和数据复用。"
```
