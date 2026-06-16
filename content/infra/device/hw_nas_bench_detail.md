### HW-NAS-Bench

```yaml
id: hw_nas_bench
name: HW-NAS-Bench
full_name: 硬件感知NAS基准 (Hardware-Aware NAS Benchmark)
year: '2021'
org: —
paper_url: —
category: hw_sw_codesign
parent: mnasnet
motivation: 首个硬件感知NAS基准推动标准化评测
```

#### 📝 一句话总结

HW-NAS-Bench 构建了面向硬件感知 NAS 的公开可查询基准，把 NAS-Bench-201 和 FBNet 搜索空间中的架构映射到多种边缘设备、FPGA 与 ASIC 的延迟/能耗指标。它解决了 HW-NAS 研究需要重复搭建设备编译、测量和估计 pipeline，导致门槛高、评测不可复现的问题。

#### 🎯 核心要点

- 覆盖两个代表性搜索空间：NAS-Bench-201 cell-based search space 和 FBNet layer-wise search space
- 提供六类目标设备的硬件成本：Edge GPU、Raspberry Pi 4、Edge TPU、Pixel 3、ASIC-Eyeriss、FPGA
- 指标包含真实测量或工具估计的 latency，并在 Edge GPU、ASIC-Eyeriss、FPGA 上包含 energy
- 将设备编译流程纳入基准：TensorRT、TFLite、Edge TPU compiler、Accelergy+Timeloop、DNN-Chip Predictor、Vivado HLS
- 提供 API，NAS 算法可按 architecture index 和 dataset 直接查询硬件指标，避免每次重新部署测量
- 分析 FLOPs/#Params 与真实硬件成本、不同设备成本之间的 Kendall rank correlation，展示设备特异性
- 用 ProxylessNAS 示例说明，面向某个设备搜索得到的最优架构迁移到其他设备时可能不是最优

#### 🔬 深入细节

##### 核心示意图

![HW-NAS-Bench 框架示意](https://ar5iv.labs.arxiv.org/html/2103.10584/assets/x1.png)
*图：HW-NAS-Bench 论文 Figure 1 的 ar5iv 公开镜像，展示从 NAS 搜索空间到多设备硬件指标数据集，再到 HW-NAS 算法查询评测的基准闭环。*

##### 算法伪代码

```python
# HW-NAS-Bench: build once, query many times
database = {}

for space in ["NAS-Bench-201", "FBNet"]:
    for arch in enumerate_architectures(space):
        for device in ["edge_gpu", "raspi4", "edge_tpu", "pixel3", "eyeriss", "fpga"]:
            deployable = compile_for_device(arch, device)

            if device in ["edge_gpu", "raspi4", "edge_tpu", "pixel3"]:
                metrics = measure_on_real_device(deployable, repeats=50)
            else:
                metrics = estimate_with_hardware_toolflow(deployable, device)

            database[(space, arch.index, device)] = metrics

def query_by_index(space, arch_idx, dataset):
    acc = lookup_accuracy_if_available(space, arch_idx, dataset)
    hw = {device: database[(space, arch_idx, device)] for device in all_devices}
    return {"accuracy": acc, "hardware": hw}

def hw_nas_objective(arch_idx, target_device, budget):
    record = query_by_index("NAS-Bench-201", arch_idx, dataset="cifar100")
    return pareto_score(record["accuracy"], record["hardware"][target_device], budget)
```

##### 方法机制解读

HW-NAS-Bench 的直接背景是 MnasNet/ProxylessNAS 之后的硬件感知搜索变得有效，但每个研究组都要为目标设备自己搭 latency lookup table 或预测器。这个过程并不只是“跑一次模型”：需要把 PyTorch/TensorFlow 模型导出到设备支持的格式，调用对应 compiler/runtime，配置功耗或计时工具，再处理重复运行、warmup、batch size、CPU 核心绑定和模拟器参数。论文把这些硬件工程步骤前置成公共数据集，让 NAS 算法开发者用 API 查询。

基准的数据模型可以抽象成一个三元映射：

$$
\mathcal{H}: (a, d, x)\mapsto \{LAT(a,d,x), ENERGY(a,d,x)\}
$$

其中 \(a\) 是架构，\(d\) 是设备，\(x\) 是数据集或输入配置。NAS-Bench-201 提供 4 节点、6 条边、5 个候选操作的 cell 空间，共 \(5^6=15{,}625\) 个架构，并已有 CIFAR-10、CIFAR-100、ImageNet16-120 精度日志；HW-NAS-Bench 在此基础上补齐多设备硬件成本。FBNet 空间则有 22 个可搜索位置、9 个预定义 cell 候选，结构更接近硬件友好的移动网络；对这类巨大 layer-wise 空间，基准通过测量/估计块级成本并组合为架构成本，使查询成本远低于重新部署。

六类设备体现了“同一网络在不同硬件上排序会变”的事实。Edge GPU 使用 Jetson TX2 和 TensorRT；Raspberry Pi 4、Pixel 3 走 TFLite；Edge TPU 还需要 Edge TPU compiler；ASIC-Eyeriss 通过 Accelergy+Timeloop 与 DNN-Chip Predictor 估计；FPGA 通过 Vivado HLS 面向 Xilinx ZC706/Zynq 平台获得成本。这里的关键不是所有指标都来自同一种测量方式，而是每种设备都采用其合理部署链路，因此比 FLOPs/#Params 更接近真实 HW-NAS 目标。

论文用 Kendall rank correlation 说明理论指标和硬件指标可能不一致。对两个架构 \(a_i,a_j\)，若 FLOPs 排序和设备延迟排序方向相同则为 concordant，否则为 discordant；整体相关性可写成：

$$
\tau=\frac{N_{concordant}-N_{discordant}}{\binom{n}{2}}
$$

当 \(\tau\) 低时，用 FLOPs 替代 latency 会把搜索引向错误架构。论文进一步比较不同设备之间的硬件成本相关性，发现同一批架构在 Edge GPU、Edge TPU、Eyeriss、FPGA 上的排序可能差异很大。这意味着“在设备 A 上快”的网络不一定在设备 B 上快，硬件感知 NAS 不能只拿一个通用 proxy 代表所有部署环境。

从使用方式看，HW-NAS-Bench 把昂贵的硬件评价从搜索内循环中移出。一个 NAS 算法可以在评估候选架构时直接调用：

$$
\max_a ACC(a) - \lambda\log(LAT(a,d))
\quad\text{或}\quad
\max_a ACC(a)\ \text{s.t.}\ LAT(a,d)\le B
$$

其中 \(d\) 可以切换为 Edge GPU、Raspi 4、FPGA 等目标设备。这样同一个搜索算法可以在统一数据集、统一硬件成本表和统一预算下与其他算法比较。论文的 ProxylessNAS 示例也显示，针对 Edge GPU、Raspi 4、FPGA 分别搜索会得到不同最优架构；把针对一个设备的架构拿到另一个设备上运行，常常失去延迟优势。

HW-NAS-Bench 的局限也来自基准化本身：它固定搜索空间、设备和输入设置，因此不能覆盖任意新算子、新 runtime 或新芯片；部分大空间成本使用块级加和或模拟估计，也不等价于所有端到端真实测量。但它的价值在于把 HW-NAS 的公共比较基础先建立起来，让研究者可以在算法层面讨论搜索策略、约束处理和设备特异性，而不是反复重建硬件测量基础设施。

> 💡 关键：HW-NAS-Bench 把“硬件成本评价”从每个 NAS 论文的私有工程流程变成可查询公共基准，使硬件感知搜索可以被复现、比较和系统分析。

#### 🧪 练习题

```yaml
question: "HW-NAS-Bench 相比只报告 FLOPs/#Params 的 NAS 基准，最核心的改进是什么？"
options:
  - "提供多种真实或估计硬件平台上的延迟/能耗指标，并允许 NAS 算法直接查询"
  - "取消所有搜索空间，只保留一个人工设计网络"
  - "只测量服务器 GPU 的吞吐量，不考虑边缘设备"
  - "要求每个候选架构在搜索时都重新从零搭建硬件测量环境"
answer: 0
explain: "HW-NAS-Bench 的贡献是把 NAS-Bench-201/FBNet 架构映射到多设备硬件成本数据，并通过 API 让 HW-NAS 可复现地使用这些指标。"
```
