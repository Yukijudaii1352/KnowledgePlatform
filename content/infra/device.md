---
domain: infra
topic_id: device
topic_name: AI硬件
page_icon: ⚙️
page_title: AI硬件技术演进图谱
page_subtitle: '{build_date} 版'
page_desc: 梳理从通用GPU到专用AI加速器（TPU/NPU）及存算一体、光计算等前沿硬件的发展历程。
hero_pills:
- 🏷️ AI Accelerators · GPU/NPU/TPU · Architecture
count_pill: '{count} 个算法'
categories:
  gpu_architecture:
    label: GPU架构演进
    color: '#4285F4'
  tpu:
    label: Google TPU系列
    color: '#34A853'
  npu_asic:
    label: NPU与专用AI芯片
    color: '#EA4335'
  emerging_chips:
    label: 新兴AI芯片架构
    color: '#FF6D01'
  pim_cim:
    label: 存算一体
    color: '#AB47BC'
  dataflow:
    label: 数据流与脉动阵列
    color: '#00ACC1'
  interconnect:
    label: 互联技术
    color: '#78909C'
  hw_sw_codesign:
    label: 硬件-软件协同
    color: '#FFB300'
  fpga:
    label: FPGA加速器
    color: '#8D6E63'
  efficiency:
    label: 能效优化
    color: '#66BB6A'
  photonic:
    label: 光计算
    color: '#E91E63'
  chiplet:
    label: Chiplet与封装
    color: '#795548'
  llm_inference:
    label: 大模型推理硬件
    color: '#F44336'
  quantum_hybrid:
    label: 量子-经典混合
    color: '#9C27B0'
image_base: ../../content/infra/device/assets/
---

## 领域综述

!INCLUDE_RAW ../../temp/content_survey_bulk_20260614_174337/researcher_output/infra/device/overview/zhihu__AI硬件是什么，普通人怎么理解这个风口——_AI硬件科普系列_·_总纲篇__43efcd04/article.md

## 最新进展综述

!INCLUDE_RAW ../../temp/content_survey_bulk_20260614_174337/researcher_output/infra/device/latest/zhihu__GTC_Taipei_2026：AI算力基建进入超级周期__cdb30b48/article.md

## 算法演化关系

```yaml
nodes:
- id: cuda
  x: 200
  y: 80
  category: gpu_architecture
- id: volta_tensor_core
  x: 450
  y: 80
  category: gpu_architecture
- id: ampere_sparse
  x: 600
  y: 80
  category: gpu_architecture
- id: hopper_fp8
  x: 700
  y: 80
  category: gpu_architecture
- id: blackwell_fp4
  x: 850
  y: 80
  category: gpu_architecture
- id: rubin_gpu
  x: 950
  y: 80
  category: gpu_architecture
- id: amd_mi400
  x: 950
  y: 120
  category: gpu_architecture
- id: tpu_v1
  x: 450
  y: 180
  category: tpu
- id: tpu_v2v3
  x: 600
  y: 180
  category: tpu
- id: tpu_v4
  x: 750
  y: 180
  category: tpu
- id: tpu_v7
  x: 950
  y: 180
  category: tpu
- id: diannao
  x: 300
  y: 280
  category: npu_asic
- id: dadiannao
  x: 300
  y: 320
  category: npu_asic
- id: cambricon_isa
  x: 380
  y: 280
  category: npu_asic
- id: ascend_davinci
  x: 650
  y: 280
  category: npu_asic
- id: habana_gaudi
  x: 600
  y: 280
  category: npu_asic
- id: cerebras_wse
  x: 800
  y: 380
  category: emerging_chips
- id: graphcore_ipu
  x: 530
  y: 380
  category: emerging_chips
- id: groq_tsp
  x: 600
  y: 380
  category: emerging_chips
- id: sambanova_rdu
  x: 700
  y: 380
  category: emerging_chips
- id: prime
  x: 380
  y: 480
  category: pim_cim
- id: isaac
  x: 380
  y: 520
  category: pim_cim
- id: rram_cim_survey
  x: 650
  y: 480
  category: pim_cim
- id: intel_18a_cim
  x: 950
  y: 480
  category: pim_cim
- id: reram_mlc_cim
  x: 950
  y: 520
  category: pim_cim
- id: mpu_pim
  x: 950
  y: 560
  category: pim_cim
- id: systolic_array
  x: 100
  y: 580
  category: dataflow
- id: eyeriss
  x: 380
  y: 580
  category: dataflow
- id: eyeriss_v2
  x: 530
  y: 580
  category: dataflow
- id: sze_dnn_survey
  x: 450
  y: 580
  category: dataflow
- id: nvlink
  x: 380
  y: 680
  category: interconnect
- id: cxl
  x: 800
  y: 680
  category: interconnect
- id: tvm
  x: 480
  y: 760
  category: hw_sw_codesign
- id: mlir
  x: 650
  y: 760
  category: hw_sw_codesign
- id: mnasnet
  x: 530
  y: 760
  category: hw_sw_codesign
- id: hw_nas_bench
  x: 650
  y: 800
  category: hw_sw_codesign
- id: fuseflow
  x: 950
  y: 760
  category: hw_sw_codesign
- id: tisa
  x: 950
  y: 800
  category: hw_sw_codesign
- id: fpga_cnn_survey
  x: 450
  y: 850
  category: fpga
- id: fpga_svd
  x: 380
  y: 850
  category: fpga
- id: deep_compression
  x: 320
  y: 940
  category: efficiency
- id: eie
  x: 380
  y: 940
  category: efficiency
- id: bnn
  x: 380
  y: 980
  category: efficiency
- id: ampere_24_sparsity
  x: 600
  y: 940
  category: efficiency
- id: sageattention3
  x: 950
  y: 940
  category: efficiency
- id: atropos
  x: 950
  y: 980
  category: efficiency
- id: fp4_training
  x: 950
  y: 1020
  category: efficiency
- id: nanophotonic_nn
  x: 950
  y: 1040
  category: photonic
- id: astra_photonic
  x: 950
  y: 1080
  category: photonic
- id: lightmatter_passage
  x: 950
  y: 1120
  category: photonic
- id: rebellions_chiplet
  x: 950
  y: 1130
  category: chiplet
- id: flare_chiplet
  x: 950
  y: 1170
  category: chiplet
- id: deepstack_3d
  x: 950
  y: 1210
  category: chiplet
- id: moentwine
  x: 950
  y: 1220
  category: llm_inference
- id: diamond_moe
  x: 950
  y: 1260
  category: llm_inference
- id: bitdecoding
  x: 950
  y: 1300
  category: llm_inference
- id: nvidia_ising
  x: 950
  y: 1310
  category: quantum_hybrid
edges:
- from: cuda
  to: volta_tensor_core
  label: 张量核心引入
- from: volta_tensor_core
  to: ampere_sparse
  label: 结构化稀疏
- from: ampere_sparse
  to: hopper_fp8
  label: FP8精度适配
- from: hopper_fp8
  to: blackwell_fp4
  label: FP4万亿参数
- from: systolic_array
  to: tpu_v1
  label: 商用脉动阵列
- from: systolic_array
  to: eyeriss
  label: RS数据流
- from: tpu_v1
  to: tpu_v2v3
  label: 训练架构升级
- from: tpu_v2v3
  to: tpu_v4
  label: 光互联扩展
- from: eyeriss
  to: eyeriss_v2
  label: 灵活互联
- from: diannao
  to: dadiannao
  label: 多核扩展
- from: dadiannao
  to: cambricon_isa
  label: 指令集标准化
- from: prime
  to: isaac
  label: 流水线架构
- from: isaac
  to: rram_cim_survey
  label: 技术综述
- from: deep_compression
  to: eie
  label: 压缩专用硬件
- from: tvm
  to: mlir
  label: 多层级IR统一
- from: mnasnet
  to: hw_nas_bench
  label: 标准化基准
- from: ampere_sparse
  to: ampere_24_sparsity
  label: 硬件稀疏原生
- from: blackwell_fp4
  to: rubin_gpu
  label: NVFP4演进
- from: tpu_v4
  to: tpu_v7
  label: 双芯粒扩展
- from: rram_cim_survey
  to: intel_18a_cim
  label: 数字CIM工业化
- from: rram_cim_survey
  to: reram_mlc_cim
  label: MLC多级存算
- from: isaac
  to: mpu_pim
  label: 通用PIM接口
- from: cerebras_wse
  to: moentwine
  label: 晶圆级MoE
- from: ampere_24_sparsity
  to: atropos
  label: 稀疏处理器
- from: bnn
  to: fp4_training
  label: 极低精度训练
- from: tvm
  to: fuseflow
  label: 稀疏融合编译
- from: hopper_fp8
  to: sageattention3
  label: FP4注意力
- from: rubin_gpu
  to: nvidia_ising
  label: 量子混合加速
- from: intel_18a_cim
  to: flare_chiplet
  label: CIM芯粒融合
- from: rebellions_chiplet
  to: flare_chiplet
  label: 异构芯粒
- from: flare_chiplet
  to: deepstack_3d
  label: 3D堆叠扩展
- from: moentwine
  to: diamond_moe
  label: 边缘MoE下沉
- from: fp4_training
  to: sageattention3
  label: FP4生态互补
- from: lightmatter_passage
  to: tpu_v7
  label: 光互连赋能
milestones:
- systolic_array
- tpu_v1
- volta_tensor_core
```

## 核心算法

### CUDA

```yaml
id: cuda
num: 1
name: CUDA
full_name: 统一计算设备架构 (Compute Unified Device Architecture)
year: '2008'
org: NVIDIA
parent: —
paper_url: —
project_url: ''
category: gpu_architecture
motivation: 将GPU转变为通用并行计算平台
```

#### 📝 一句话总结
CUDA 的核心目标是：将GPU转变为通用并行计算平台。

#### 🎯 核心要点
- 核心动机：将GPU转变为通用并行计算平台
- 代表机构：NVIDIA

#### 🔬 深入细节
将GPU转变为通用并行计算平台


### Volta Tensor Core

```yaml
id: volta_tensor_core
num: 2
name: Volta Tensor Core
full_name: Volta张量核心架构 (Volta Tensor Core Architecture)
year: '2017'
org: NVIDIA
parent: cuda
paper_url: https://arxiv.org/abs/1803.04432
project_url: ''
category: gpu_architecture
motivation: 引入Tensor Core实现硬件级矩阵运算
```

#### 📝 一句话总结
Volta Tensor Core 的核心目标是：引入Tensor Core实现硬件级矩阵运算。

#### 🎯 核心要点
- 核心动机：引入Tensor Core实现硬件级矩阵运算
- 演化来源：继承或改进自 cuda
- 代表机构：NVIDIA

#### 🔬 深入细节
引入Tensor Core实现硬件级矩阵运算


### Ampere 2:4 Sparsity

```yaml
id: ampere_sparse
num: 3
name: Ampere 2:4 Sparsity
full_name: 安培结构化稀疏架构 (Ampere Structured Sparsity)
year: '2020'
org: NVIDIA
parent: volta_tensor_core
paper_url: https://www.nvidia.com/content/dam/en-zz/Solutions/Data-Center/nvidia-ampere-architecture-whitepaper.pdf
project_url: ''
category: gpu_architecture
motivation: 硬件级2:4结构化稀疏与TF32格式
```

#### 📝 一句话总结
Ampere 2:4 Sparsity 的核心目标是：硬件级2:4结构化稀疏与TF32格式。

#### 🎯 核心要点
- 核心动机：硬件级2:4结构化稀疏与TF32格式
- 演化来源：继承或改进自 volta_tensor_core
- 代表机构：NVIDIA

#### 🔬 深入细节
硬件级2:4结构化稀疏与TF32格式


### Hopper FP8

```yaml
id: hopper_fp8
num: 4
name: Hopper FP8
full_name: Hopper FP8变换引擎 (Hopper Transformer Engine)
year: '2022'
org: NVIDIA
parent: ampere_sparse
paper_url: https://www.nvidia.com/en-us/data-center/hopper-architecture/
project_url: ''
category: gpu_architecture
motivation: Transformer Engine支持FP8动态精度
```

#### 📝 一句话总结
Hopper FP8 的核心目标是：Transformer Engine支持FP8动态精度。

#### 🎯 核心要点
- 核心动机：Transformer Engine支持FP8动态精度
- 演化来源：继承或改进自 ampere_sparse
- 代表机构：NVIDIA

#### 🔬 深入细节
Transformer Engine支持FP8动态精度


### Blackwell FP4

```yaml
id: blackwell_fp4
num: 5
name: Blackwell FP4
full_name: Blackwell FP4架构 (Blackwell FP4 Architecture)
year: '2025'
org: NVIDIA
parent: hopper_fp8
paper_url: https://arxiv.org/abs/2507.10789
project_url: ''
category: gpu_architecture
motivation: FP4精度与专用解压引擎优化万亿参数模型
```

#### 📝 一句话总结
Blackwell FP4 的核心目标是：FP4精度与专用解压引擎优化万亿参数模型。

#### 🎯 核心要点
- 核心动机：FP4精度与专用解压引擎优化万亿参数模型
- 演化来源：继承或改进自 hopper_fp8
- 代表机构：NVIDIA

#### 🔬 深入细节
FP4精度与专用解压引擎优化万亿参数模型


### Rubin GPU

```yaml
id: rubin_gpu
num: 6
name: Rubin GPU
full_name: NVIDIA Rubin GPU架构 (NVIDIA Rubin GPU Architecture)
year: '2026'
org: NVIDIA
parent: blackwell_fp4
paper_url: https://www.nvidia.com/en-us/about-nvidia/press-releases/2026/nvidia-vera-rubin-platform-agentic-ai/
project_url: ''
category: gpu_architecture
motivation: NVFP4精度50PFLOPS与HBM4推理能效跃升
```

#### 📝 一句话总结
NVIDIA Rubin 是继 Blackwell 之后的下一代 GPU 架构，首次搭载 **HBM4** 显存（单 GPU 最高 288 GB、带宽约 8 TB/s）、**NVLink 6**（单 GPU 双向 3.6 TB/s）和增强的 **NVFP4 Tensor Core**（单 GPU FP4 推理算力达约 50 PFLOPS），配合全新 ARM 架构 **Vera CPU** 组成 Vera Rubin 超级芯片平台，面向万亿参数 Agentic AI 与推理能效的代际跃升。

#### 🎯 核心要点
- **HBM4 首发**：Rubin 是业界首款采用 HBM4 的 GPU，单 GPU 配备最高 12 颗 HBM4 堆叠（12-hi），容量达 288 GB，带宽约 8 TB/s，相比 Blackwell 的 HBM3e（192 GB / 8 TB/s）在容量上提升 50%，并引入更宽的 2048-bit 接口
- **NVFP4 Tensor Core 增强**：在 Blackwell 引入 FP4 的基础上，Rubin 进一步优化 FP4 数据通路与累加精度，单 GPU FP4 推理算力达约 50 PFLOPS，较 Blackwell B200 的 ~20 PFLOPS FP4 提升约 2.5×
- **NVLink 6 互连**：第六代 NVLink，单 GPU 双向带宽 3.6 TB/s（Blackwell NVLink 5 为 1.8 TB/s，提升 2×），支持 72-GPU NVLink 域通过 NVLink Switch 实现全互连
- **Vera CPU**：全新 ARM Neoverse V3 架构 CPU（取代 Grace），88 核心，DDR5/LPDDR5X 支持，与 Rubin GPU 通过 NVLink-C2C 芯片间互连组成 Vera Rubin Superchip
- **Rubin Ultra**：更高端变体，预计采用双 Rubin GPU die 封装，HBM4 容量翻倍至约 576 GB，面向最大规模训练集群
- **DGX Rubin 系统**：单节点 72 颗 Rubin GPU，NVLink 6 全互连，总 FP4 推理算力超 3.6 EFLOPS，总 GPU 显存超 20 TB
- **制程与封装**：采用 TSMC 3nm（N3）或更先进制程，CoWoS-L 先进封装技术，die 面积预计超过 800 mm²
- **软件生态延续**：完全兼容 CUDA、cuDNN、TensorRT、Triton 推理服务器等现有 NVIDIA 软件栈，支持 NIM 微服务与 Nemo 框架

#### 🔬 深入细节
##### Vera Rubin 平台架构总览

Vera Rubin 平台延续了 NVIDIA "CPU+GPU Superchip" 的设计哲学（始于 Grace Hopper），但在每个关键子系统上都实现了代际升级：

```
┌─────────────────────────────────────────────────────────┐
│                   Vera Rubin Superchip                   │
│                                                         │
│  ┌──────────────┐   NVLink-C2C    ┌──────────────────┐  │
│  │   Vera CPU   │◄──────────────►│    Rubin GPU     │  │
│  │  88× ARM V3  │   900 GB/s     │                  │  │
│  │  DDR5/LPDDR5X│               │  NVFP4 ~50 PFLOPS│  │
│  └──────────────┘               │  FP8  ~25 PFLOPS │  │
│                                  │  FP16 ~12.5 PFLOPS│ │
│                                  │                  │  │
│                                  │  ┌──────────────┐│  │
│                                  │  │  HBM4 288 GB ││  │
│                                  │  │  ~8 TB/s     ││  │
│                                  │  └──────────────┘│  │
│                                  │                  │  │
│                                  │  NVLink 6       │  │
│                                  │  3.6 TB/s bidi  │  │
│                                  └──────────────────┘  │
│                                                         │
│  ┌──────────────┐               ┌──────────────────┐  │
│  │  CX9 SuperNIC│               │ NVLink Switch    │  │
│  │  800G InfiniBand             │ 72-GPU domain    │  │
│  └──────────────┘               └──────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

##### 动机与背景

随着大语言模型（LLM）规模突破万亿参数、Agentic AI 系统需要实时推理与多轮交互，AI 基础设施面临三大核心挑战：

1. **显存容量瓶颈**：万亿参数模型（如 GPT-4 级别）即使在 FP4 精度下仍需 ~500 GB 显存，单 GPU 192 GB（Blackwell）不足以容纳完整模型，需要跨 GPU 切分带来通信开销
2. **推理吞吐需求**：Agentic AI 场景下，单次用户请求可能触发数十次模型调用（工具调用、推理链、验证），要求单 GPU 推理吞吐提升数倍
3. **互连带宽墙**：模型并行（Tensor Parallel、Expert Parallel）的效率直接受限于 GPU 间互连带宽，NVLink 5 的 1.8 TB/s 在 72-GPU 规模下已成为瓶颈

> 💡 **关键洞察**：Rubin 的核心设计目标不是单纯提升峰值算力，而是通过 HBM4 容量/带宽、NVLink 6 互连带宽、NVFP4 精度的**三重协同提升**，实现推理场景下的系统级能效跃升——让更大的模型以更低的精度、更少的通信开销运行在更少的 GPU 上。

##### HBM4 显存子系统

Rubin 是首款采用 HBM4 标准的 GPU，相比 Blackwell 使用的 HBM3e 有以下关键升级：

| 参数 | Blackwell B200 (HBM3e) | Rubin R100 (HBM4) | 提升 |
|------|------------------------|--------------------|----- |
| 单堆叠容量 | 16 GB (8-hi) | 24 GB (12-hi) | 1.5× |
| 堆叠数量 | 8 | 12 | 1.5× |
| 单 GPU 总容量 | 192 GB | 288 GB | 1.5× |
| 接口宽度 | 1024-bit/stack | 2048-bit/stack | 2× |
| 单 GPU 带宽 | ~8 TB/s | ~8 TB/s | ~1× |
| 能效 (pJ/bit) | ~3.9 | ~2.5 (预估) | ~1.6× |

HBM4 的核心创新在于将逻辑层（Logic Die）从 DRAM 厂商转移到 GPU 厂商定制设计，NVIDIA 可以在逻辑层集成定制的内存控制器、ECC 引擎和预取逻辑，实现更紧密的 GPU-HBM 协同优化。2048-bit 宽接口在保持类似带宽的同时降低了信号速率，从而显著改善能效。

##### NVFP4 Tensor Core 深入

NVFP4（4-bit 浮点）格式在 Blackwell 架构中首次引入，Rubin 在此基础上进行了以下增强：

**FP4 数据格式**（E2M1 / E3M0 混合）：
```
FP4 E2M1 格式 (主要用于权重):
┌───┬───┬───┬───┐
│ S │ E₁│ E₀│ M₀│   S=符号位, E=指数(2bit), M=尾数(1bit)
└───┴───┴───┴───┘
可表示: ±{0, 0.5, 1, 1.5, 2, 3, 4, 6}  (含subnormal)

FP4 E3M0 格式 (备选):
┌───┬───┬───┬───┐
│ S │ E₂│ E₁│ E₀│   S=符号位, E=指数(3bit), M=无尾数
└───┴───┴───┴───┘
可表示: ±{0, 0.015625, ..., 64, 128}  (更大动态范围)
```

**Rubin FP4 Tensor Core 增强**：
- **累加精度提升**：FP4×FP4 乘法结果在 Tensor Core 内部以 FP32 累加（Blackwell 为 FP16 累加后转 FP32），减少累加误差
- **Per-block Scaling**：支持更细粒度的 per-128-element 缩放因子（Blackwell 为 per-block），提高量化精度
- **Tensor Core 数量**：每 SM 的 Tensor Core 数量预计从 Blackwell 的 4 个增至 6 个
- **SM 数量**：Rubin 预计包含 192+ SM（Blackwell B200 为 160 SM）

```python
# NVFP4 推理计算示意伪代码
# Rubin Tensor Core FP4 矩阵乘法

def rubin_fp4_matmul(A_fp4, B_fp4, scale_A, scale_B, block_size=128):
    """
    A_fp4: 激活值 [M, K], 4-bit 量化, per-block 缩放
    B_fp4: 权重 [K, N], 4-bit 量化, per-block 缩放
    scale_A: [M, K//block_size], FP8 缩放因子
    scale_B: [K//block_size, N], FP8 缩放因子
    """
    # 在 Tensor Core 内部执行
    C_fp32 = zeros([M, N], dtype=fp32)  # FP32 累加器

    for k_block in range(K // block_size):
        k_start = k_block * block_size
        k_end = k_start + block_size

        # 取出当前 block 的 FP4 数据
        A_block = A_fp4[:, k_start:k_end]  # [M, 128] in FP4
        B_block = B_fp4[k_start:k_end, :]  # [128, N] in FP4

        # Tensor Core: FP4 × FP4 → FP32 累加
        # 硬件内部: 反量化 → FP8 乘法 → FP32 累加
        partial = tensor_core_fp4_mma(A_block, B_block)  # [M, N] in FP32

        # 应用 per-block 缩放因子
        scale = outer_product(scale_A[:, k_block], scale_B[k_block, :])
        C_fp32 += partial * scale

    return C_fp32  # 输出 FP32 或按需转换为 FP8/FP16
```

##### NVLink 6 互连架构

NVLink 6 是 Rubin 平台的关键互连技术，实现了带宽的代际跃升：

| 特性 | NVLink 5 (Blackwell) | NVLink 6 (Rubin) |
|------|---------------------|-------------------|
| 单链路带宽 | 100 GB/s | 200 GB/s |
| 每 GPU 链路数 | 18 | 18 |
| 每 GPU 总带宽 | 1.8 TB/s bidi | 3.6 TB/s bidi |
| NVLink Switch 代 | 4th gen | 5th gen |
| 最大 NVLink 域 | 72 GPU | 72 GPU |
| 信号速率 | 112 Gbps/lane (PAM4) | 224 Gbps/lane (PAM4) |
| 协议特性 | SHARP v3 in-network reduction | SHARP v4 + 硬件 MoE 路由 |

NVLink 6 的 3.6 TB/s 双向带宽意味着在 72-GPU NVLink 域内执行 Tensor Parallel 时，All-Reduce 延迟可降低约 2×，直接提升 MoE（Mixture of Experts）模型的 Expert Parallel 效率。新增的**硬件 MoE 路由**功能允许 NVLink Switch 在网络层面直接执行 token-to-expert 的路由与 All-to-All 通信，减少 GPU 端的调度开销。

##### Vera CPU 架构

Vera 是 NVIDIA 继 Grace 之后的第二代自研 ARM 服务器 CPU：

- **核心架构**：88 个 ARM Neoverse V3 核心（Grace 为 72 个 Neoverse V2）
- **内存**：支持 DDR5-6400 和 LPDDR5X，最大容量 512 GB
- **NVLink-C2C**：与 Rubin GPU 之间 900 GB/s 一致性互连（Grace Hopper 为 900 GB/s，保持一致）
- **PCIe**：PCIe Gen6 x16 通道
- **定位**：作为 Rubin GPU 的 host CPU，负责数据预处理、调度、网络协议栈等任务

##### DGX Rubin 系统规格

DGX Rubin 是基于 Vera Rubin 平台的旗舰 AI 系统：

```
DGX Rubin 系统架构:
┌─────────────────────────────────────────────┐
│              DGX Rubin Node                 │
│                                             │
│  72× Rubin GPU (NVLink 6 全互连)            │
│  ├─ 总 FP4 算力: ~3.6 EFLOPS              │
│  ├─ 总 HBM4 容量: ~20.7 TB                │
│  └─ GPU 间带宽: 3.6 TB/s per GPU          │
│                                             │
│  36× Vera CPU (每 CPU 配 2 GPU)            │
│  ├─ 总 CPU 核心: 3,168                     │
│  └─ 总系统内存: ~18 TB DDR5               │
│                                             │
│  网络:                                      │
│  ├─ CX9 SuperNIC: 800G InfiniBand/GPU     │
│  └─ NVLink Switch: 5th gen, 72-GPU domain │
│                                             │
│  功耗: ~120 kW (预估)                      │
└─────────────────────────────────────────────┘
```

##### 架构代际演进对比

| 特性 | Hopper H100 (2022) | Blackwell B200 (2024) | Rubin R100 (2026) |
|------|--------------------|-----------------------|-------------------|
| 制程 | TSMC 4N | TSMC 4NP (双 die) | TSMC 3N |
| Tensor Core 精度 | FP8 | FP4 / FP8 | FP4 增强 / FP8 |
| FP4 算力 | — | ~20 PFLOPS | ~50 PFLOPS |
| FP8 算力 | 3.96 PFLOPS | ~10 PFLOPS | ~25 PFLOPS |
| FP16 算力 | 1.98 PFLOPS | ~5 PFLOPS | ~12.5 PFLOPS |
| 显存类型 | HBM3 | HBM3e | HBM4 |
| 显存容量 | 80 GB | 192 GB | 288 GB |
| 显存带宽 | 3.35 TB/s | ~8 TB/s | ~8 TB/s |
| NVLink 代 | NVLink 4 | NVLink 5 | NVLink 6 |
| NVLink 带宽/GPU | 900 GB/s | 1.8 TB/s | 3.6 TB/s |
| 配套 CPU | — (外部 x86) | Grace (ARM V2) | Vera (ARM V3) |
| 最大 NVLink 域 | 8 GPU | 72 GPU | 72 GPU |
| TDP (预估) | 700W | 1000W | 1200W+ |

##### 对推理工作负载的影响

Rubin 架构的设计重心明显向**推理能效**倾斜，体现在以下几个方面：

1. **FP4 算力密度**：50 PFLOPS FP4 意味着对于一个 405B 参数的 Llama 级模型（FP4 权重约 200 GB），单 GPU 即可容纳完整模型并以极高吞吐执行推理，无需 Tensor Parallel 切分
2. **HBM4 容量红利**：288 GB 容量使得 MoE 模型（如 Mixtral 8×22B 的 FP4 版本约 88 GB）可以在单 GPU 上加载全部 Expert，消除 Expert Parallel 通信开销
3. **Batch 推理效率**：更大的 HBM 容量允许更大的 KV Cache，支持更长上下文（128K+ tokens）和更大批次的并发推理
4. **NVLink 6 对 MoE 的加速**：对于需要跨 GPU 的超大 MoE 模型，NVLink 6 的硬件 MoE 路由可将 All-to-All 通信延迟降低 50%+

> 💡 **关键洞察**：Rubin 的"50 PFLOPS FP4"并非简单的算力数字堆叠——它与 288 GB HBM4 容量形成了**算力-容量平衡点**的代际跃迁：在 FP4 精度下，单 GPU 既有足够容量装下 500B+ 参数模型，又有足够算力以毫秒级延迟完成单次前向推理。这是 Agentic AI（需要快速多轮推理）的硬件基础。

##### 与竞品的对比

| 特性 | NVIDIA Rubin R100 | AMD MI400 (预期) | Intel Falcon Shores |
|------|-------------------|------------------|---------------------|
| 显存 | HBM4 288 GB | HBM3e 256 GB | HBM3e 128 GB |
| 互连 | NVLink 6 3.6 TB/s | Infinity Fabric 4 | Xe Link |
| FP4 支持 | 原生 NVFP4 | MXFP4 (OCP) | MXFP4 (OCP) |
| 软件生态 | CUDA/TensorRT | ROCm/PyTorch | oneAPI/OpenVINO |
| 系统规模 | 72-GPU NVLink 域 | 8-GPU IF 域 | TBD |

NVIDIA 在 NVLink 互连规模（72 GPU 全互连 vs 竞品 8 GPU）和软件生态成熟度上保持显著优势，这是 Rubin 平台在大规模训练和推理部署中的核心壁垒。

#### 🧪 练习题
```yaml
question: "NVIDIA Rubin GPU 相比 Blackwell 的核心显存升级是什么？"
options:
  - "从 HBM2e 升级到 HBM3，带宽提升 2×"
  - "从 HBM3e 升级到 HBM4，单 GPU 容量从 192 GB 提升至 288 GB"
  - "从 GDDR6X 升级到 HBM3e，首次引入高带宽显存"
  - "从 HBM3 升级到 HBM3e，能效提升但容量不变"
answer: 1
explain: "Rubin 是业界首款采用 HBM4 的 GPU，相比 Blackwell 的 HBM3e（192 GB），HBM4 将单 GPU 容量提升至 288 GB（12 颗 12-hi 堆叠），并引入 2048-bit 宽接口以改善能效。这一容量跃升使得单 GPU 可容纳 500B+ 参数的 FP4 模型。"
```

### AMD MI400

```yaml
id: amd_mi400
num: 7
name: AMD MI400
full_name: AMD Instinct MI400加速器 (AMD Instinct MI400 Accelerator)
year: '2026'
org: AMD
parent: —
paper_url: https://www.tomshardware.com/pc-components/gpus/amd-data-center-roadmap-2026-2027-mi400-mi500-zen-6-zen-7
project_url: ''
category: gpu_architecture
motivation: CDNA5架构2nm工艺432GB HBM4
```

#### 📝 一句话总结
AMD MI400 的核心目标是：CDNA5架构2nm工艺432GB HBM4。

#### 🎯 核心要点
- 核心动机：CDNA5架构2nm工艺432GB HBM4
- 代表机构：AMD

#### 🔬 深入细节
CDNA5架构2nm工艺432GB HBM4


### TPU v1

```yaml
id: tpu_v1
num: 8
name: TPU v1
full_name: 张量处理单元v1 (Tensor Processing Unit v1)
year: '2017'
org: Google
parent: —
paper_url: https://arxiv.org/abs/1704.04760
project_url: ''
category: tpu
motivation: 8位整数脉动阵列实现推理能效比提升15-30倍
```

#### 📝 一句话总结
TPU v1 的核心目标是：8位整数脉动阵列实现推理能效比提升15-30倍。

#### 🎯 核心要点
- 核心动机：8位整数脉动阵列实现推理能效比提升15-30倍
- 代表机构：Google

#### 🔬 深入细节
8位整数脉动阵列实现推理能效比提升15-30倍


### TPU v2/v3

```yaml
id: tpu_v2v3
num: 9
name: TPU v2/v3
full_name: 张量处理单元v2/v3训练版 (TPU v2/v3 for Training)
year: '2020'
org: Google
parent: tpu_v1
paper_url: https://dl.acm.org/doi/10.1145/3360307
project_url: ''
category: tpu
motivation: 引入bfloat16格式支持大规模集群训练
```

#### 📝 一句话总结
Google 设计了 TPU v2/v3 训练芯片与 Pod 级超级计算机系统——每颗芯片包含 2 个 TensorCore（各含 128×128 bfloat16 脉动阵列 MXU），通过高带宽 ICI 2D 环面互连组成最大 1024 芯片的 Pod（TPU v3 Pod 峰值 >100 PFLOPS），在 ResNet-50、Transformer 等主流训练任务上相比同期 NVIDIA V100 GPU 集群实现 **1.2×–1.9× 性能/瓦特优势**，验证了领域专用架构（DSA）在大规模 DNN 训练中的可行性与优越性。

#### 🎯 核心要点
- **领域专用架构（DSA）理念**：放弃通用处理器的复杂分支预测、乱序执行等机制，将晶体管预算集中在矩阵乘法单元（MXU）上，以 128×128 脉动阵列实现极高的算力密度
- **bfloat16 数值格式**：保留 FP32 的 8 位指数（动态范围不变），截断尾数至 7 位，在几乎不影响训练收敛性的前提下将算力翻倍、内存减半
- **TensorCore 架构**：每颗 TPU 芯片包含 2 个 TensorCore，每个 TensorCore 含 128×128 MXU（bf16 乘 + fp32 累加）、向量处理单元（VPU）、标量单元和转置/置换单元
- **TPU v2**：45 TFLOPS（bf16），16 GB HBM，600 GB/s 内存带宽；**TPU v3**：123 TFLOPS（bf16），32 GB HBM，900 GB/s 内存带宽，液冷散热
- **2D 环面互连（ICI）**：芯片间通过 Inter-Core Interconnect 组成 2D 环面拓扑，支持高效的 AllReduce 等集合通信；TPU v2 Pod 256 芯片（11.5 PFLOPS），TPU v3 Pod 1024 芯片（>100 PFLOPS）
- **XLA 编译器**：将 TensorFlow 计算图编译为 TPU 指令，自动进行算子融合、内存布局优化和通信调度
- **数据并行 + 模型并行**：支持灵活的并行策略，通过 ICI 2D 环面实现高效的梯度同步和激活值通信
- **性能对比**：在 6 个代表性 DNN 训练任务上，TPU v3 Pod（1024 芯片）相比等规模 V100 GPU 集群，性能/瓦特优势约 1.2×–1.9×

#### 🔬 深入细节
##### 核心架构图

![TPU v2/v3 芯片架构](../assets/tpu_v2v3_chip_arch.png)
*图 1：TPU v2/v3 芯片架构。每颗芯片包含 2 个 TensorCore，各自拥有独立的 128×128 MXU、向量单元、标量单元和 HBM 存储。芯片间通过 ICI（Inter-Core Interconnect）互连。*

![TPU v2/v3 2D 环面互连拓扑](../assets/tpu_v2v3_2d_torus.png)
*图 2：TPU Pod 的 2D 环面互连拓扑示意（4×4 简化示例）。实际 TPU v2 Pod 为 16×16=256 芯片，TPU v3 Pod 为 32×32=1024 芯片。每条 ICI 链路提供高带宽、低延迟的芯片间通信。*

![bfloat16 数值格式对比](../assets/tpu_v2v3_bfloat16.png)
*图 3：FP32、FP16 与 BF16（Brain Floating Point）的位宽对比。BF16 保留 FP32 的 8 位指数（相同动态范围），仅截断尾数至 7 位，是 TPU 训练的核心数值格式。*

##### 算法伪代码

```python
# TPU v2/v3 上的分布式 DNN 训练伪代码（数据并行 + AllReduce）

# ========== 系统初始化 ==========
num_chips = 1024                    # TPU v3 Pod
cores_per_chip = 2                  # 每芯片 2 个 TensorCore
total_cores = num_chips * cores_per_chip  # 2048 个 TensorCore

# XLA 编译器将 TensorFlow 计算图编译为 TPU 指令
compiled_program = xla_compile(
    tf_graph,
    target='tpu_v3',
    optimizations=['op_fusion', 'layout_assignment', 'memory_planning']
)

# ========== 数据并行训练主循环 ==========
# 每个 TensorCore 持有完整模型副本，处理不同数据分片
for epoch in range(num_epochs):
    for global_batch in dataset:
        # 将全局 batch 分片到所有 core
        local_batch = global_batch[core_id::total_cores]  # 每 core 一个 micro-batch
        
        # ---- 前向传播（在单个 TensorCore 上） ----
        for layer in model.layers:
            if layer.type == 'matmul' or layer.type == 'conv':
                # MXU 执行：bf16 输入 × bf16 权重 → fp32 累加
                # 128×128 脉动阵列，每周期输出 128×128 个 fp32 部分和
                activations = mxu_matmul_bf16(input_bf16, weight_bf16)  # fp32 output
                activations = cast_to_bf16(activations)  # 截断回 bf16 存储
            elif layer.type in ['relu', 'layernorm', 'softmax']:
                # VPU（向量处理单元）执行非线性/归一化操作
                activations = vpu_elementwise(activations, op=layer.type)
        
        loss = compute_loss(activations, labels)
        
        # ---- 反向传播 ----
        gradients = backprop(loss, model)  # 同样利用 MXU 做梯度矩阵乘
        
        # ---- AllReduce 梯度同步（通过 ICI 2D 环面） ----
        # 2D 环面上的高效 AllReduce：先沿行 reduce-scatter，再沿列 all-gather
        # ICI 带宽：TPU v3 每链路约 656 Gbps
        synced_gradients = ici_allreduce_2d_torus(gradients)
        
        # ---- 权重更新 ----
        # fp32 master weights 用于精确更新
        for param, grad in zip(model.parameters(), synced_gradients):
            param_fp32 -= learning_rate * grad  # fp32 精度更新
            param_bf16 = cast_to_bf16(param_fp32)  # 前向/反向用 bf16 副本

# ========== MXU 脉动阵列核心操作 ==========
def mxu_matmul_bf16(A_bf16, B_bf16):
    """
    128×128 脉动阵列矩阵乘法
    - 输入：A[M,K] 和 B[K,N]，均为 bf16
    - 输出：C[M,N]，fp32
    - 分块：将大矩阵切分为 128×128 的 tile
    """
    C_fp32 = zeros(M, N)
    for m_tile in range(0, M, 128):
        for n_tile in range(0, N, 128):
            for k_tile in range(0, K, 128):
                # 每个 128×128 tile 送入脉动阵列
                # 数据从左侧和顶部流入，结果在阵列内部累加
                # 每周期：128×128 = 16384 次 bf16 乘加操作
                C_fp32[m_tile:m_tile+128, n_tile:n_tile+128] += \
                    systolic_128x128(
                        A_bf16[m_tile:m_tile+128, k_tile:k_tile+128],
                        B_bf16[k_tile:k_tile+128, n_tile:n_tile+128]
                    )
    return C_fp32
```

##### 动机与背景

2017 年 Google 发布了 TPU v1（推理专用），在数据中心推理任务上展现了领域专用架构（DSA）相比通用 CPU/GPU 的巨大优势。然而 **DNN 训练**比推理面临更大的挑战：

1. **算力需求呈指数增长**：2012–2018 年间，顶级 AI 模型的训练算力需求每 3.4 个月翻一倍（OpenAI 统计），远超摩尔定律速度。单芯片算力增长无法满足需求，必须构建**超级计算机级别**的训练系统。
2. **训练需要反向传播**：推理只需前向计算，训练还需反向传播梯度和权重更新，对内存容量和带宽的需求约为推理的 3 倍。
3. **数值精度要求**：推理可用 INT8 甚至更低精度，训练则需要足够的动态范围以保证梯度不溢出/下溢。
4. **分布式通信**：大规模训练需要高效的芯片间通信（梯度同步），传统以太网/InfiniBand 的延迟和带宽成为瓶颈。

> 💡 **核心洞察**：DNN 训练的计算本质是大量矩阵乘法（占 >90% 计算量），且对尾数精度的容忍度远高于科学计算。这使得**用 bfloat16 脉动阵列替代通用 FP64/FP32 计算单元**成为可能，在不影响训练收敛的前提下获得数量级的算力密度和能效提升。

##### bfloat16 数值格式

bfloat16（Brain Floating Point 16）是 Google 为 TPU 训练设计的 16 位浮点格式：

| 格式 | 总位宽 | 符号位 | 指数位 | 尾数位 | 动态范围 | 精度 |
|------|--------|--------|--------|--------|----------|------|
| FP32 | 32 | 1 | 8 | 23 | ±3.4×10³⁸ | ~7 位十进制 |
| FP16 | 16 | 1 | 5 | 10 | ±6.5×10⁴ | ~3 位十进制 |
| **BF16** | **16** | **1** | **8** | **7** | **±3.4×10³⁸** | **~2 位十进制** |

BF16 的关键设计选择：
- **保留 FP32 的 8 位指数**：动态范围与 FP32 完全相同，避免了 FP16 训练中常见的梯度溢出/下溢问题（FP16 的 5 位指数仅覆盖 ±6.5×10⁴）
- **截断尾数至 7 位**：精度损失对 DNN 训练影响极小，因为随机梯度本身就有噪声
- **FP32 到 BF16 的转换极其简单**：只需截断低 16 位尾数（或加舍入），无需重新编码

> ⚠️ **关键设计决策**：TPU 的 MXU 使用 **bf16 输入乘法 + fp32 累加**。即两个 bf16 操作数相乘后，结果在 fp32 精度下累加到输出矩阵中。这确保了矩阵乘法的中间结果不会丢失精度，同时输入/权重的存储和带宽需求减半。

##### TensorCore 微架构

每颗 TPU v2/v3 芯片包含 **2 个 TensorCore**，每个 TensorCore 是一个完整的计算核心：

**矩阵乘法单元（MXU）**：
- 128×128 二维脉动阵列（systolic array）
- 每周期执行 128×128 = 16,384 次乘加操作
- bf16 输入乘法，fp32 累加
- TPU v2 MXU 时钟频率约 700 MHz → 每 MXU 约 22.5 TFLOPS
- TPU v3 MXU 时钟频率约 940 MHz → 每 MXU 约 30.8 TFLOPS（加上其他优化达 ~61.5 TFLOPS/core）

**脉动阵列工作原理**：数据从阵列的左侧（激活值）和顶部（权重）流入，每个处理单元（PE）执行一次乘加操作后将数据传递给相邻 PE。整个阵列形成一个流水线，一旦填满后每周期输出一行结果。相比 GPU 的 SIMT 架构，脉动阵列的优势在于：
- **极高的数据复用率**：每个权重被 128 个激活值复用，每个激活值被 128 个权重复用
- **极低的控制开销**：无需复杂的指令调度，数据流由物理布线决定
- **高能效**：大部分能量用于计算而非数据搬运

**向量处理单元（VPU）**：
- 执行逐元素操作：激活函数（ReLU、GELU）、归一化（BatchNorm、LayerNorm）、Softmax、池化等
- 支持 bf16 和 fp32 运算
- 带宽与 MXU 输出匹配，确保流水线不被阻塞

**标量单元**：处理控制流、地址计算等标量操作

**转置/置换单元**：支持矩阵转置和数据重排，用于反向传播中的梯度计算（需要权重矩阵的转置）

##### 芯片级规格对比

| 指标 | TPU v2 | TPU v3 | NVIDIA V100 |
|------|--------|--------|-------------|
| 峰值算力（bf16/fp16） | 45 TFLOPS | 123 TFLOPS | 125 TFLOPS (fp16 Tensor Core) |
| 峰值算力（fp32） | 22.5 TFLOPS | 61.5 TFLOPS | 15.7 TFLOPS |
| HBM 容量 | 16 GB | 32 GB | 32 GB (V100-32GB) |
| HBM 带宽 | 600 GB/s | 900 GB/s | 900 GB/s |
| TDP | ~280 W | ~450 W（液冷） | 300 W |
| 制程 | 16nm | 16nm | 12nm |
| 芯片面积 | ~625 mm² | ~648 mm² | 815 mm² |
| 互连 | ICI (专用) | ICI (专用) | NVLink 2.0 |

> 💡 **关键对比**：虽然 TPU v3 和 V100 的峰值 fp16/bf16 算力相近（~123–125 TFLOPS），但 TPU 的优势在于：(1) ICI 互连在 Pod 规模下的通信效率远高于 InfiniBand；(2) 脉动阵列的实际利用率（通常 >40%）高于 GPU Tensor Core（通常 30%–40%）；(3) XLA 编译器的全图优化减少了内存搬运开销。

##### Pod 级超级计算机系统

TPU v2/v3 的核心创新不仅在芯片层面，更在于**将数百到上千颗芯片组成一台超级计算机**：

**2D 环面互连（ICI - Inter-Core Interconnect）**：
- 每颗 TPU 芯片有 4 个 ICI 端口（上下左右），直接连接到相邻芯片
- 无需外部交换机——芯片间直接互连，延迟极低（~数百纳秒）
- TPU v2 Pod：16×16 = 256 芯片，ICI 每链路约 496 Gbps
- TPU v3 Pod：32×32 = 1024 芯片，ICI 每链路约 656 Gbps
- 环面拓扑的边缘芯片通过 wrap-around 链路连接到对侧，确保任意两芯片间的最大跳数为 N/2

**Pod 级性能**：

| 系统 | 芯片数 | 峰值算力 | 总 HBM | 总 HBM 带宽 |
|------|--------|----------|--------|-------------|
| TPU v2 Pod | 256 | 11.5 PFLOPS | 4 TB | 153.6 TB/s |
| TPU v3 Pod | 1024 | 126 PFLOPS | 32 TB | 921.6 TB/s |

**AllReduce 在 2D 环面上的实现**：
- 利用环面拓扑的对称性，将 AllReduce 分解为两个维度上的独立操作
- 沿行方向执行 Reduce-Scatter，沿列方向执行 All-Gather（或反过来）
- 通信量为 $2 \cdot \frac{N-1}{N} \cdot D$（$N$ 为芯片数，$D$ 为数据量），与最优理论值匹配
- 由于 ICI 是专用硬件互连（非通用网络），AllReduce 的延迟和带宽远优于基于 InfiniBand 的 GPU 集群

##### 软件栈：XLA 编译器

XLA（Accelerated Linear Algebra）是 TPU 的核心编译器，负责将 TensorFlow/JAX 计算图编译为 TPU 机器指令：

1. **算子融合（Op Fusion）**：将多个连续的逐元素操作融合为一个内核，减少 HBM 读写次数。例如 `MatMul → BiasAdd → ReLU` 融合为单个操作
2. **内存布局优化（Layout Assignment）**：自动选择最优的数据布局（如 NHWC vs NCHW），使 MXU 的 128×128 tile 对齐
3. **通信调度**：自动插入 ICI 通信操作，将计算与通信重叠（overlap）
4. **内存规划**：在有限的 HBM 容量内优化张量的生命周期和复用

##### 训练性能评估

论文在 6 个代表性 DNN 训练任务上进行了详细评估：

| 模型 | 任务 | TPU v3 Pod (1024 chips) | 等规模 GPU 集群 | TPU 优势 |
|------|------|------------------------|----------------|----------|
| ResNet-50 | ImageNet 分类 | ~2 min/epoch | ~3 min/epoch | 1.5× |
| Transformer (大) | WMT 翻译 | 显著优势 | — | ~1.3× |
| SSD | 目标检测 | — | — | ~1.2× |
| Mask R-CNN | 实例分割 | — | — | ~1.4× |
| GNMT | 机器翻译 | — | — | ~1.3× |
| AmoebaNet | NAS | — | — | ~1.9× |

**关键发现**：
- **矩阵乘法密集型模型受益最大**：如 AmoebaNet（大量卷积）和 Transformer（大量注意力矩阵乘），TPU 的 MXU 利用率高
- **通信密集型模型优势更明显**：ICI 2D 环面的通信效率远高于 InfiniBand，在需要频繁 AllReduce 的大规模数据并行中优势显著
- **小 batch size 模型优势较小**：当 batch size 不足以填满 MXU 的 128×128 tile 时，利用率下降

##### 散热与能效

TPU v3 的一个重要工程创新是**液冷散热**：
- TPU v2 使用传统风冷，TDP 约 280W
- TPU v3 由于算力提升至 123 TFLOPS，TDP 达 ~450W，超出风冷能力
- 采用直接液冷（direct liquid cooling），冷却液直接流过芯片散热器
- 液冷使得数据中心的散热效率提升约 30%，PUE（Power Usage Effectiveness）更低

##### 与传统方法的对比

| 维度 | TPU v2/v3 | NVIDIA V100 + InfiniBand | 传统 CPU 集群 |
|------|-----------|--------------------------|--------------|
| 计算单元 | 128×128 脉动阵列 (MXU) | Tensor Core (4×4×4) | AVX-512 SIMD |
| 数值格式 | bf16 乘 + fp32 累加 | fp16 乘 + fp32 累加 | fp32/fp64 |
| 芯片间互连 | ICI 2D 环面（专用） | NVLink + InfiniBand | 以太网/InfiniBand |
| 编程模型 | XLA (图编译) | CUDA + NCCL | MPI + OpenMP |
| 扩展方式 | Pod（紧耦合） | 集群（松耦合） | 集群 |
| 能效 (TFLOPS/W) | ~0.27 (v3) | ~0.21 (V100) | ~0.01 |
| 最大系统规模 | 1024 芯片/Pod | 数千 GPU（需交换机） | 数万节点 |

TPU 的核心架构优势在于**端到端的领域专用设计**：从数值格式（bf16）、计算单元（脉动阵列）、互连拓扑（2D 环面）到编译器（XLA），每一层都针对 DNN 训练进行了深度优化，而非在通用硬件上叠加加速器。

#### 🧪 练习题
```yaml
question: "TPU v2/v3 使用的 bfloat16 (bf16) 数值格式与 IEEE FP16 相比，最关键的设计差异是什么？"
options:
  - "bf16 的总位宽为 8 位，比 FP16 的 16 位更短"
  - "bf16 保留了 FP32 的 8 位指数（相同动态范围），而 FP16 仅有 5 位指数"
  - "bf16 使用定点表示而非浮点表示"
  - "bf16 的尾数位数比 FP16 更多，精度更高"
answer: 1
explain: "bfloat16 保留了 FP32 的 8 位指数位（动态范围 ±3.4×10³⁸），仅将尾数从 23 位截断至 7 位；而 IEEE FP16 使用 5 位指数（动态范围仅 ±6.5×10⁴）和 10 位尾数。bf16 的设计优先保证动态范围，避免训练中常见的梯度溢出/下溢问题，这是其最关键的设计差异。"
```

### TPU v4

```yaml
id: tpu_v4
num: 10
name: TPU v4
full_name: 张量处理单元v4光互联版 (TPU v4 with Optical Interconnect)
year: '2023'
org: Google
parent: tpu_v2v3
paper_url: https://arxiv.org/abs/2304.01433
project_url: ''
category: tpu
motivation: 光路交换机实现3D Torus拓扑动态重构
```

#### 📝 一句话总结
TPU v4 的核心目标是：光路交换机实现3D Torus拓扑动态重构。

#### 🎯 核心要点
- 核心动机：光路交换机实现3D Torus拓扑动态重构
- 演化来源：继承或改进自 tpu_v2v3
- 代表机构：Google

#### 🔬 深入细节
光路交换机实现3D Torus拓扑动态重构


### TPU v7 Ironwood

```yaml
id: tpu_v7
num: 11
name: TPU v7 Ironwood
full_name: 张量处理单元v7铁杉版 (TPU v7 Ironwood)
year: '2026'
org: Google
parent: tpu_v4
paper_url: https://cloud.google.com/tpu/docs/release-notes
project_url: ''
category: tpu
motivation: 3nm双芯粒架构42.5 Exaflops集群算力
```

#### 📝 一句话总结
TPU v7 Ironwood 的核心目标是：3nm双芯粒架构42.5 Exaflops集群算力。

#### 🎯 核心要点
- 核心动机：3nm双芯粒架构42.5 Exaflops集群算力
- 演化来源：继承或改进自 tpu_v4
- 代表机构：Google

#### 🔬 深入细节
3nm双芯粒架构42.5 Exaflops集群算力


### DianNao

```yaml
id: diannao
num: 12
name: DianNao
full_name: 电脑深度学习加速器 (DianNao Accelerator)
year: '2014'
org: ICT-CAS/Inria
parent: —
paper_url: —
project_url: ''
category: npu_asic
motivation: 首个DL专用加速器解决片上访存瓶颈
```

#### 📝 一句话总结
DianNao 的核心目标是：首个DL专用加速器解决片上访存瓶颈。

#### 🎯 核心要点
- 核心动机：首个DL专用加速器解决片上访存瓶颈
- 代表机构：ICT-CAS/Inria

#### 🔬 深入细节
首个DL专用加速器解决片上访存瓶颈


### DaDianNao

```yaml
id: dadiannao
num: 13
name: DaDianNao
full_name: 大电脑多核架构 (DaDianNao Multi-chip Architecture)
year: '2014'
org: ICT-CAS/Inria
parent: diannao
paper_url: —
project_url: ''
category: npu_asic
motivation: eDRAM片上存储消除外部DRAM访问压力
```

#### 📝 一句话总结
DaDianNao 的核心目标是：eDRAM片上存储消除外部DRAM访问压力。

#### 🎯 核心要点
- 核心动机：eDRAM片上存储消除外部DRAM访问压力
- 演化来源：继承或改进自 diannao
- 代表机构：ICT-CAS/Inria

#### 🔬 深入细节
eDRAM片上存储消除外部DRAM访问压力


### Cambricon ISA

```yaml
id: cambricon_isa
num: 14
name: Cambricon ISA
full_name: 寒武纪神经网络指令集 (Cambricon Instruction Set Architecture)
year: '2016'
org: ICT-CAS
parent: dadiannao
paper_url: https://dl.acm.org/doi/abs/10.1145/3007787.3001179
project_url: ''
category: npu_asic
motivation: 首个神经网络指令集架构标准化AI芯片编程
```

#### 📝 一句话总结
Cambricon ISA 的核心目标是：首个神经网络指令集架构标准化AI芯片编程。

#### 🎯 核心要点
- 核心动机：首个神经网络指令集架构标准化AI芯片编程
- 演化来源：继承或改进自 dadiannao
- 代表机构：ICT-CAS

#### 🔬 深入细节
首个神经网络指令集架构标准化AI芯片编程


### Ascend Da Vinci

```yaml
id: ascend_davinci
num: 15
name: Ascend Da Vinci
full_name: 昇腾达芬奇架构 (Ascend Da Vinci Architecture)
year: '2021'
org: Huawei
parent: —
paper_url: —
project_url: ''
category: npu_asic
motivation: 3D Cube计算单元实现端云统一架构覆盖
```

#### 📝 一句话总结
Ascend Da Vinci 的核心目标是：3D Cube计算单元实现端云统一架构覆盖。

#### 🎯 核心要点
- 核心动机：3D Cube计算单元实现端云统一架构覆盖
- 代表机构：Huawei

#### 🔬 深入细节
3D Cube计算单元实现端云统一架构覆盖


### Habana Gaudi

```yaml
id: habana_gaudi
num: 16
name: Habana Gaudi
full_name: Habana高迪处理器 (Habana Gaudi Processor)
year: '2020'
org: Intel/Habana
parent: —
paper_url: https://ieeexplore.ieee.org/abstract/document/9018203/
project_url: ''
category: npu_asic
motivation: 集成10×100GbE以太网支持RDMA横向扩展
```

#### 📝 一句话总结
Habana Gaudi 是一款面向深度学习训练的异构加速处理器，其核心创新在于**片上集成 10 个 100GbE RoCE v2 RDMA 端口**（总带宽 2 Tb/s 双向），配合异构计算架构（1 个 MME 矩阵引擎 + 8 个可编程 TPC 张量核心），在无需外部 InfiniBand 交换机的前提下实现高效的多卡/多节点横向扩展训练。

#### 🎯 核心要点
- **异构双引擎架构**：1 个 MME（Matrix Multiplication Engine，脉动阵列）负责 GEMM 运算 + 8 个 TPC（Tensor Processing Core，VLIW SIMD）负责非矩阵张量运算，两类引擎可完全并行
- **片上集成以太网**：10×100GbE RoCE v2 端口直接集成在芯片上，提供 2 Tb/s 双向 RDMA 带宽，是区别于 NVIDIA GPU 的核心差异化设计
- **HLS-1 系统拓扑**：8 张 Gaudi 卡通过 100GbE 全互联（7 端口卡间 + 3 端口跨服务器），无需外部交换机即可构建训练集群
- **TPC 可编程性**：TPC 采用 2048-bit SIMD 向量引擎，支持 TPC-C 编程语言自定义算子内核，覆盖 FP32/BF16/FP16/INT8/INT16/INT32 多种数据类型
- **大容量片上存储**：32 GB HBM2 显存（1 TB/s 带宽）+ 24 MB 共享 SRAM，SRAM 作为 MME 与 TPC 之间的高速数据交换缓冲
- **SynapseAI 软件栈**：包含图编译器（Graph Compiler）、TPC 编译器、运行时系统，原生支持 PyTorch 和 TensorFlow 框架
- **TSMC 7nm 工艺**：采用台积电 7nm FinFET 制程，在功耗和面积效率上具有竞争力

#### 🔬 深入细节
##### 1. 设计动机与背景

深度学习训练工作负载对计算和通信能力提出了双重挑战。在计算层面，训练过程中的前向传播和反向传播包含大量矩阵乘法（GEMM）运算，同时也包含激活函数、归一化（Normalization）、损失计算等非矩阵运算。在通信层面，分布式训练（如数据并行）需要在多个加速器之间高频执行 AllReduce 等集合通信操作，梯度同步的带宽和延迟直接影响训练的扩展效率。

传统方案（如 NVIDIA GPU + InfiniBand）中，计算芯片与网络接口是分离的：GPU 通过 PCIe 连接到主机，再由主机上的 InfiniBand HCA（Host Channel Adapter）或 NVLink/NVSwitch 完成卡间通信。这种架构存在以下问题：

1. **外部交换机成本高昂**：InfiniBand 交换机价格昂贵，且随着集群规模增长，交换机层级和成本呈超线性增长
2. **PCIe 瓶颈**：GPU 到网络接口之间需要经过 PCIe 总线，增加了通信延迟
3. **灵活性受限**：InfiniBand 拓扑相对固定，难以灵活适配不同规模的训练集群

Habana Labs（2019 年被 Intel 收购）提出了一种根本性的架构创新：**将高速以太网 RDMA 接口直接集成到加速器芯片上**。这一设计使得：
- 加速器之间可以通过标准以太网直连，无需昂贵的专用交换机
- 数据从计算引擎到网络端口的路径极短，减少通信延迟
- 以太网生态成熟、成本低廉，有利于大规模部署

![Gaudi 芯片架构框图](assets/gaudi_chip_arch.png)
*图 1：Habana Gaudi 芯片架构框图。芯片包含 1 个 MME 矩阵引擎、8 个 TPC 张量处理核心、24 MB 共享 SRAM、32 GB HBM2 以及 10 个 100GbE RoCE v2 网络端口。*

##### 2. 芯片架构详解

Gaudi 采用 TSMC 7nm FinFET 工艺制造，芯片内部采用**异构计算架构**，将深度学习训练中的不同运算类型映射到专用的硬件引擎上。

###### 2.1 MME（Matrix Multiplication Engine）

MME 是 Gaudi 的矩阵运算核心，采用**脉动阵列（Systolic Array）**架构，专门优化大规模矩阵乘法运算。在深度学习训练中，卷积层（通过 im2col 转换为 GEMM）、全连接层、注意力机制中的 \(QK^T\) 和 \(AV\) 运算等均由 MME 处理。

MME 的关键设计特点包括：

- **高吞吐量脉动阵列**：数据在阵列中以流水线方式传播，每个时钟周期完成大量乘累加（MAC）运算
- **混合精度支持**：原生支持 BF16（Brain Floating Point 16）和 FP32 运算，BF16 模式下吞吐量翻倍
- **自动分块（Tiling）**：MME 编译器自动将大矩阵分解为适合硬件阵列尺寸的小块，最大化硬件利用率

> 💡 **关键设计理念**：MME 是一个"固定功能"引擎——它只做矩阵乘法，但做得极其高效。所有非 GEMM 运算（如激活函数、BatchNorm、损失计算）则交给 TPC 处理。这种分工使得两类引擎可以**流水线并行**执行，MME 计算下一层的矩阵乘法时，TPC 同时处理当前层的后处理运算。

###### 2.2 TPC（Tensor Processing Core）

TPC 是 Gaudi 架构中最具创新性的组件之一。每颗 Gaudi 芯片包含 **8 个 TPC**，每个 TPC 是一个完全可编程的 VLIW（Very Long Instruction Word）处理器，配备宽向量 SIMD 执行单元。

![TPC 内部架构](assets/tpc_architecture.png)
*图 2：TPC 内部架构。每个 TPC 包含 VLIW 指令发射单元、2048-bit 向量处理单元（VPU）、标量处理单元（SPU）、本地存储和张量寻址单元。*

TPC 的核心规格：

| 特性 | 规格 |
|------|------|
| 指令架构 | VLIW（4 槽位：LOAD / STORE / VPU / SPU） |
| 向量宽度 | 2048-bit SIMD |
| FP32 吞吐 | 64 ops/cycle（每 TPC） |
| BF16 吞吐 | 128 ops/cycle（每 TPC） |
| INT8 吞吐 | 256 ops/cycle（每 TPC） |
| 支持数据类型 | FP32, BF16, FP16, INT8, INT16, INT32 |
| 编程模型 | TPC-C（类 C 语言） |

TPC 的 **VLIW 4 槽位设计**允许在单个时钟周期内同时发射：
- 一条 **LOAD** 指令（从 SRAM/HBM 加载数据到本地寄存器）
- 一条 **STORE** 指令（将结果写回 SRAM/HBM）
- 一条 **VPU** 指令（2048-bit 向量运算）
- 一条 **SPU** 指令（标量运算，用于控制流和地址计算）

这种设计使得 TPC 能够在执行向量计算的同时进行数据搬运，有效隐藏内存访问延迟。

**TPC-C 可编程性**是 Gaudi 相对于竞品的重要差异化特性。开发者可以使用类 C 语言（TPC-C）编写自定义算子内核，编译为 TPC 指令集架构（ISA）后在硬件上执行。这意味着：

- 新的激活函数、归一化方法等可以快速实现，无需等待硬件更新
- 研究人员可以实验自定义运算，不受固定硬件功能的限制
- 软件栈可以持续优化，通过更新 TPC 内核提升已部署硬件的性能

```c
// TPC-C 自定义算子示例：GELU 激活函数
void main(tensor input, tensor output) {
    int5 index = get_index_space_offset();
    int5 end = get_index_space_size() + index;
    
    // 2048-bit SIMD 向量化处理
    float64 x = v_f32_ld_tnsr(index, input);
    
    // GELU(x) = 0.5 * x * (1 + tanh(sqrt(2/π) * (x + 0.044715 * x³)))
    float64 x3 = x * x * x;
    float64 inner = 0.7978845608f * (x + 0.044715f * x3);
    float64 result = 0.5f * x * (1.0f + v_f32_tanh(inner));
    
    v_f32_st_tnsr(index, output, result);
}
```

> ⚠️ **注意**：上述代码为简化示意。实际 TPC-C 编程需要处理张量维度映射、内存对齐、流水线调度等细节，Habana 提供了完整的 TPC SDK 和编程指南。

###### 2.3 存储层次

Gaudi 的存储层次设计体现了对深度学习训练数据流的深入理解：

$$\text{存储层次}: \underbrace{\text{TPC Local Regs}}_{\text{最快}} \rightarrow \underbrace{\text{Shared SRAM (24 MB)}}_{\text{片上}} \rightarrow \underbrace{\text{HBM2 (32 GB)}}_{\text{片外}}$$

- **共享 SRAM（24 MB）**：这是 Gaudi 架构的关键设计。24 MB 的片上 SRAM 被 MME 和所有 8 个 TPC 共享，作为高速数据交换缓冲区。MME 将矩阵乘法的中间结果写入 SRAM，TPC 从 SRAM 读取数据执行后处理（如 BatchNorm、ReLU），然后将结果写回 SRAM 供 MME 读取进行下一层计算。这种设计避免了中间结果频繁读写 HBM 的带宽浪费。

- **HBM2（32 GB，1 TB/s）**：用于存储模型权重、激活值、梯度等大容量数据。1 TB/s 的带宽确保了大批量训练时的数据供给能力。

> 💡 **关键洞察**：24 MB SRAM 的设计哲学是"让数据尽可能留在片上"。在典型的 ResNet-50 训练中，单层的中间激活值通常在几 MB 量级，可以完全放入 SRAM。这使得 MME→SRAM→TPC→SRAM→MME 的流水线几乎不需要访问 HBM，极大提升了能效比。

##### 3. 片上集成网络：核心创新

Gaudi 最具颠覆性的设计是**将 10 个 100GbE RoCE v2（RDMA over Converged Ethernet v2）端口直接集成在芯片上**。这是 Gaudi 区别于所有竞品（包括 NVIDIA GPU、Google TPU）的核心差异化特性。

###### 3.1 为什么选择以太网而非 InfiniBand？

| 维度 | InfiniBand | 以太网（RoCE v2） |
|------|-----------|-------------------|
| 生态成熟度 | 专用 HPC 生态 | 全球最广泛的网络生态 |
| 交换机成本 | 极高（专用 ASIC） | 相对低廉（商用交换机） |
| 运维复杂度 | 需要专业 IB 运维团队 | 数据中心运维团队可复用 |
| 带宽 | HDR 200 Gb/s | 100 GbE × 10 = 1 Tb/s |
| RDMA 支持 | 原生 RDMA | RoCE v2（基于 UDP/IP） |
| 可扩展性 | 需要专用交换机层级 | 可利用现有以太网基础设施 |

Habana 选择以太网的核心逻辑是：**以太网的总体拥有成本（TCO）远低于 InfiniBand**，尤其在大规模集群部署场景下。虽然单端口带宽不如 InfiniBand HDR（200 Gb/s），但 Gaudi 通过集成 10 个端口实现了 **1 Tb/s 单向 / 2 Tb/s 双向**的总带宽，在聚合带宽上具有竞争力。

###### 3.2 片上集成的技术优势

将网络接口集成在加速器芯片上（而非作为外部 NIC）带来了多重优势：

1. **零拷贝 RDMA**：计算引擎的输出可以直接通过片上网络端口发送到远端加速器，无需经过 PCIe 总线和主机内存，实现真正的零拷贝数据传输

2. **极低延迟**：数据从 HBM/SRAM 到网络端口的路径完全在芯片内部，延迟仅为纳秒级，远低于通过 PCIe 到外部 NIC 的微秒级延迟

3. **计算-通信重叠**：由于网络端口与计算引擎共享同一芯片，DMA 引擎可以在计算进行的同时异步发送/接收梯度数据，实现高效的计算-通信重叠（overlap）

4. **简化系统设计**：无需外部 NIC、无需额外的 PCIe 通道分配，系统板卡设计更简洁

###### 3.3 HLS-1 系统拓扑

Habana 设计了 HLS-1（Habana Labs Server 1）作为 Gaudi 的标准服务器配置，包含 **8 张 Gaudi 加速卡**。

![HLS-1 系统拓扑](assets/hls1_topology.png)
*图 3：HLS-1 系统拓扑。8 张 Gaudi 卡通过 100GbE 全互联，每卡使用 7 个端口进行卡间通信，剩余 3 个端口用于跨服务器扩展。*

每张 Gaudi 卡的 10 个 100GbE 端口分配如下：

$$\underbrace{7 \text{ ports}}_{\text{intra-server (全互联)}} + \underbrace{3 \text{ ports}}_{\text{inter-server (跨服务器)}} = 10 \text{ ports total}$$

- **7 个端口用于服务器内全互联**：8 张卡之间形成全连接（full-mesh）拓扑，任意两张卡之间有直连的 100GbE 链路。AllReduce 操作可以在不经过任何交换机的情况下完成，延迟极低。

- **3 个端口用于跨服务器扩展**：每张卡有 3 个端口连接到 ToR（Top-of-Rack）以太网交换机，用于多服务器之间的通信。这 3 个端口提供 300 Gb/s 的跨服务器带宽。

这种拓扑设计的优势在于：
- 服务器内 AllReduce 完全无交换机，延迟最低
- 跨服务器通信利用标准以太网交换机，成本可控
- 8 卡全互联拓扑天然适合 Ring-AllReduce 和 Recursive Halving-Doubling 等集合通信算法

##### 4. SynapseAI 软件栈

硬件创新需要配套的软件栈才能发挥效能。Habana 开发了 **SynapseAI** 作为 Gaudi 的完整软件栈。

![SynapseAI 软件栈](assets/software_stack.png)
*图 4：SynapseAI 软件栈层次结构。从上到下依次为框架层、图编译器、MME/TPC 编译器、硬件抽象层和硬件层。*

SynapseAI 的核心组件包括：

1. **Graph Compiler（图编译器）**：接收来自 PyTorch 或 TensorFlow 的计算图，执行图级优化（算子融合、内存规划、调度优化），然后将运算分配给 MME 或 TPC

2. **MME Compiler**：将 GEMM 运算编译为 MME 指令，自动完成矩阵分块（tiling）、数据布局转换等优化

3. **TPC Compiler**：将 TPC-C 内核编译为 TPC ISA 指令，执行向量化、循环展开、寄存器分配等优化

4. **Runtime**：管理设备内存、DMA 传输、多流（stream）调度、集合通信等运行时功能

5. **框架集成**：通过 Habana PyTorch Bridge 和 TensorFlow Integration 提供对主流框架的透明支持，用户代码只需少量修改即可在 Gaudi 上运行

```python
# PyTorch on Gaudi 示例代码
import torch
import habana_frameworks.torch.core as htcore

# 将模型和数据移动到 Gaudi 设备
device = torch.device("hpu")  # Habana Processing Unit
model = model.to(device)
optimizer = torch.optim.SGD(model.parameters(), lr=0.01)

for data, target in train_loader:
    data, target = data.to(device), target.to(device)
    output = model(data)
    loss = criterion(output, target)
    loss.backward()
    optimizer.step()
    htcore.mark_step()  # Gaudi 特有：触发图编译和执行
```

> 💡 **关键**：`htcore.mark_step()` 是 Gaudi 编程模型的核心概念。Gaudi 采用**延迟执行（lazy execution）**模式——PyTorch 操作被记录为计算图，直到 `mark_step()` 被调用时才触发图编译和硬件执行。这使得图编译器有机会看到完整的计算图并执行全局优化。

##### 5. 对比分析与个人评价

###### 5.1 与 NVIDIA A100 的对比

| 维度 | Habana Gaudi | NVIDIA A100 |
|------|-------------|-------------|
| 制程 | TSMC 7nm | TSMC 7nm |
| 计算架构 | MME + 8×TPC（异构） | 108 SM（同构 CUDA 核心 + Tensor Core） |
| 显存 | 32 GB HBM2, 1 TB/s | 40/80 GB HBM2e, 1.6/2.0 TB/s |
| 片上 SRAM | 24 MB 共享 | 40 MB L2 Cache |
| 卡间互联 | 10×100GbE RoCE v2（片上） | NVLink 3.0（600 GB/s） |
| 跨节点互联 | 100GbE（片上集成） | InfiniBand HDR（外部 NIC） |
| 编程模型 | SynapseAI + TPC-C | CUDA + cuDNN |
| 生态成熟度 | 新兴生态 | 极度成熟 |

**个人分析**：

Gaudi 的**片上集成网络**是一个极具前瞻性的设计决策。在大模型训练时代，通信带宽已经成为与计算能力同等重要的瓶颈。NVIDIA 通过 NVLink/NVSwitch 解决了服务器内的互联问题，但跨节点仍依赖外部 InfiniBand 网络。Gaudi 将网络接口内化为芯片的一部分，从架构层面消除了"计算芯片"和"网络芯片"之间的边界，这一思路在后续的 Gaudi2 和 Gaudi3 中得到了延续和强化。

然而，Gaudi 的**软件生态**是其最大的短板。CUDA 经过 15 年以上的积累，拥有海量的优化库、开发工具和社区支持。SynapseAI 虽然功能完整，但在算子覆盖率、调试工具成熟度、第三方库支持等方面仍有差距。这也是为什么尽管 Gaudi 在性价比上具有优势，但市场份额仍然有限的主要原因。

###### 5.2 与 Google TPU v3 的对比

| 维度 | Habana Gaudi | Google TPU v3 |
|------|-------------|---------------|
| 计算核心 | MME + TPC（可编程） | MXU（脉动阵列，固定功能） |
| 可编程性 | TPC-C 自定义算子 | XLA 编译器优化（用户不可编程硬件） |
| 互联 | 以太网（开放标准） | ICI（专用互联，仅限 Google Cloud） |
| 可用性 | 可购买硬件 | 仅 Google Cloud 租用 |
| 存储 | 32 GB HBM2 | 32 GB HBM |

**个人分析**：

Gaudi 与 TPU 在架构哲学上有相似之处——都采用了脉动阵列作为矩阵运算核心。但两者在**可编程性**和**开放性**上存在根本差异。TPU 的 MXU 是纯固定功能单元，所有优化依赖 XLA 编译器；而 Gaudi 的 TPC 提供了硬件级的可编程性，允许开发者直接编写自定义算子。这种设计在面对快速演进的深度学习算法时更具灵活性——例如，当新的激活函数（如 SwiGLU）或归一化方法（如 RMSNorm）出现时，TPC 可以快速实现而无需等待硬件迭代。

在互联方面，TPU 使用 Google 专有的 ICI（Inter-Chip Interconnect）构建 Pod 级别的超大规模互联网络（TPU v3 Pod 包含 1024 个 TPU 核心），但这一能力仅限于 Google Cloud 内部。Gaudi 选择开放的以太网标准，虽然单跳带宽不如 ICI，但**任何数据中心都可以部署**，不受云厂商锁定。

###### 5.3 架构创新的深远影响

Gaudi 的片上集成网络设计对行业产生了深远影响：

1. **验证了以太网训练的可行性**：在 Gaudi 之前，业界普遍认为 InfiniBand 是大规模训练的唯一选择。Gaudi 证明了基于 RoCE v2 的以太网方案在性能上可以满足训练需求，推动了更多厂商探索以太网训练方案。

2. **推动了"计算-网络融合"趋势**：Gaudi 的设计理念——将网络接口作为计算芯片的一等公民——影响了后续芯片设计。NVIDIA 在 Grace Hopper 超级芯片中也开始将 NVLink 和网络功能更紧密地集成。

3. **降低了 AI 基础设施门槛**：以太网方案的 TCO 优势使得更多组织能够构建自己的训练集群，不再被 InfiniBand 的高成本所限制。

总体而言，Habana Gaudi 是一款**设计理念领先于时代**的处理器。其片上集成网络的创新在 2020 年发布时显得激进，但随着大模型训练对通信带宽需求的爆发式增长，这一设计的前瞻性已经得到充分验证。Gaudi 的主要挑战在于软件生态的追赶——这不是一个技术问题，而是一个时间和投入的问题。

#### 🧪 练习题
```yaml
question: "Habana Gaudi 芯片上集成了多少个 100GbE RoCE v2 网络端口？在 HLS-1 系统（8卡配置）中，这些端口如何分配？"
options:
  - "8 个端口：4 个卡间 + 4 个跨服务器"
  - "10 个端口：7 个卡间全互联 + 3 个跨服务器扩展"
  - "12 个端口：8 个卡间 + 4 个跨服务器"
  - "10 个端口：5 个卡间 + 5 个跨服务器"
answer: 1
explain: "Gaudi 集成 10 个 100GbE 端口，在 HLS-1 的 8 卡配置中，7 个端口用于服务器内 8 卡全互联（full-mesh），3 个端口用于跨服务器扩展通信。"
```

### Cerebras WSE

```yaml
id: cerebras_wse
num: 17
name: Cerebras WSE
full_name: Cerebras晶圆级引擎 (Cerebras Wafer-Scale Engine)
year: '2024'
org: Cerebras
parent: —
paper_url: —
project_url: ''
category: emerging_chips
motivation: 整片晶圆单颗芯片85万核消除芯片间通信
```

#### 📝 一句话总结
Cerebras WSE 的核心目标是：整片晶圆单颗芯片85万核消除芯片间通信。

#### 🎯 核心要点
- 核心动机：整片晶圆单颗芯片85万核消除芯片间通信
- 代表机构：Cerebras

#### 🔬 深入细节
整片晶圆单颗芯片85万核消除芯片间通信


### Graphcore IPU

```yaml
id: graphcore_ipu
num: 18
name: Graphcore IPU
full_name: Graphcore智能处理单元 (Graphcore Intelligence Processing Unit)
year: '2019'
org: Graphcore
parent: —
paper_url: —
project_url: ''
category: emerging_chips
motivation: MIMD架构片上300MB SRAM适合稀疏图计算
```

#### 📝 一句话总结
Graphcore IPU 的核心目标是：MIMD架构片上300MB SRAM适合稀疏图计算。

#### 🎯 核心要点
- 核心动机：MIMD架构片上300MB SRAM适合稀疏图计算
- 代表机构：Graphcore

#### 🔬 深入细节
MIMD架构片上300MB SRAM适合稀疏图计算


### Groq TSP

```yaml
id: groq_tsp
num: 19
name: Groq TSP
full_name: Groq张量流处理器 (Groq Tensor Streaming Processor)
year: '2020'
org: Groq
parent: —
paper_url: https://ieeexplore.ieee.org/abstract/document/9138986/
project_url: ''
category: emerging_chips
motivation: 确定性调度取消缓存实现极低延迟推理
```

#### 📝 一句话总结
Groq TSP 的核心目标是：确定性调度取消缓存实现极低延迟推理。

#### 🎯 核心要点
- 核心动机：确定性调度取消缓存实现极低延迟推理
- 代表机构：Groq

#### 🔬 深入细节
确定性调度取消缓存实现极低延迟推理


### SambaNova RDU

```yaml
id: sambanova_rdu
num: 20
name: SambaNova RDU
full_name: SambaNova可重构数据流单元 (SambaNova Reconfigurable Dataflow Unit)
year: '2022'
org: SambaNova
parent: —
paper_url: —
project_url: ''
category: emerging_chips
motivation: 三级存储架构应对万亿参数模型存储墙
```

#### 📝 一句话总结
SambaNova RDU 的核心目标是：三级存储架构应对万亿参数模型存储墙。

#### 🎯 核心要点
- 核心动机：三级存储架构应对万亿参数模型存储墙
- 代表机构：SambaNova

#### 🔬 深入细节
三级存储架构应对万亿参数模型存储墙


### PRIME

```yaml
id: prime
num: 21
name: PRIME
full_name: ReRAM存内计算架构 (Processing-in-ReRAM Architecture)
year: '2016'
org: UCSB
parent: —
paper_url: https://dl.acm.org/doi/abs/10.1145/3007787.3001140
project_url: ''
category: pim_cim
motivation: ReRAM交叉阵列实现模拟矩阵乘法
```

#### 📝 一句话总结
PRIME 的核心目标是：ReRAM交叉阵列实现模拟矩阵乘法。

#### 🎯 核心要点
- 核心动机：ReRAM交叉阵列实现模拟矩阵乘法
- 代表机构：UCSB

#### 🔬 深入细节
ReRAM交叉阵列实现模拟矩阵乘法


### ISAAC

```yaml
id: isaac
num: 22
name: ISAAC
full_name: 原位模拟计算加速器 (In-Situ Analog Arithmetic in Crossbars)
year: '2016'
org: Utah/HP Labs
parent: prime
paper_url: https://dl.acm.org/doi/abs/10.1145/3007787.3001139
project_url: ''
category: pim_cim
motivation: 完整流水线架构平衡模拟计算与数字控制
```

#### 📝 一句话总结
ISAAC 的核心目标是：完整流水线架构平衡模拟计算与数字控制。

#### 🎯 核心要点
- 核心动机：完整流水线架构平衡模拟计算与数字控制
- 演化来源：继承或改进自 prime
- 代表机构：Utah/HP Labs

#### 🔬 深入细节
完整流水线架构平衡模拟计算与数字控制


### RRAM-CIM Survey

```yaml
id: rram_cim_survey
num: 23
name: RRAM-CIM Survey
full_name: RRAM存算一体综述 (RRAM-based CIM Survey)
year: '2021'
org: ASU
parent: isaac
paper_url: —
project_url: ''
category: pim_cim
motivation: 系统综述从器件到架构的CIM技术演进
```

#### 📝 一句话总结
RRAM-CIM Survey 的核心目标是：系统综述从器件到架构的CIM技术演进。

#### 🎯 核心要点
- 核心动机：系统综述从器件到架构的CIM技术演进
- 演化来源：继承或改进自 isaac
- 代表机构：ASU

#### 🔬 深入细节
系统综述从器件到架构的CIM技术演进


### Intel 18A CIM

```yaml
id: intel_18a_cim
num: 24
name: Intel 18A CIM
full_name: Intel 18A数字存内计算加速器 (Intel 18A Digital CIM Accelerator)
year: '2026'
org: Intel
parent: rram_cim_survey
paper_url: https://ieeexplore.ieee.org/abstract/document/11409207/
project_url: ''
category: pim_cim
motivation: 18A工艺147TOPS/W数字CIM加速器
```

#### 📝 一句话总结
Intel 18A CIM 的核心目标是：18A工艺147TOPS/W数字CIM加速器。

#### 🎯 核心要点
- 核心动机：18A工艺147TOPS/W数字CIM加速器
- 演化来源：继承或改进自 rram_cim_survey
- 代表机构：Intel

#### 🔬 深入细节
18A工艺147TOPS/W数字CIM加速器


### ReRAM MLC CIM

```yaml
id: reram_mlc_cim
num: 25
name: ReRAM MLC CIM
full_name: 多级ReRAM存内计算宏 (MLC ReRAM Compute-in-Memory Macro)
year: '2026'
org: ISSCC
parent: rram_cim_survey
paper_url: https://ieeexplore.ieee.org/abstract/document/11409297/
project_url: ''
category: pim_cim
motivation: MLC ReRAM CIM支持多架构推理
```

#### 📝 一句话总结
ReRAM MLC CIM 的核心目标是：MLC ReRAM CIM支持多架构推理。

#### 🎯 核心要点
- 核心动机：MLC ReRAM CIM支持多架构推理
- 演化来源：继承或改进自 rram_cim_survey
- 代表机构：ISSCC

#### 🔬 深入细节
MLC ReRAM CIM支持多架构推理


### MPU

```yaml
id: mpu_pim
num: 26
name: MPU
full_name: 存内处理通用接口 (Memory Processing Unit)
year: '2026'
org: HPCA
parent: isaac
paper_url: https://ieeexplore.ieee.org/abstract/document/11408599/
project_url: ''
category: pim_cim
motivation: 通用PIM接口实现端到端存内执行
```

#### 📝 一句话总结
MPU 的核心目标是：通用PIM接口实现端到端存内执行。

#### 🎯 核心要点
- 核心动机：通用PIM接口实现端到端存内执行
- 演化来源：继承或改进自 isaac
- 代表机构：HPCA

#### 🔬 深入细节
通用PIM接口实现端到端存内执行


### Systolic Array

```yaml
id: systolic_array
num: 27
name: Systolic Array
full_name: 脉动阵列 (Systolic Array)
year: '1982'
org: CMU
parent: —
paper_url: https://www.eecs.harvard.edu/~htk/publication/1982-kung-why-systolic-architecture.pdf
project_url: ''
category: dataflow
motivation: 数据在处理单元间脉动流转解决I/O瓶颈
```

#### 📝 一句话总结
Systolic Array 的核心目标是：数据在处理单元间脉动流转解决I/O瓶颈。

#### 🎯 核心要点
- 核心动机：数据在处理单元间脉动流转解决I/O瓶颈
- 代表机构：CMU

#### 🔬 深入细节
数据在处理单元间脉动流转解决I/O瓶颈


### Eyeriss

```yaml
id: eyeriss
num: 28
name: Eyeriss
full_name: Eyeriss能效加速器 (Eyeriss Energy-Efficient Accelerator)
year: '2016'
org: MIT
parent: systolic_array
paper_url: https://ieeexplore.ieee.org/abstract/document/7738524/
project_url: ''
category: dataflow
motivation: Row-Stationary数据流最大化局部数据复用
```

#### 📝 一句话总结
Eyeriss 的核心目标是：Row-Stationary数据流最大化局部数据复用。

#### 🎯 核心要点
- 核心动机：Row-Stationary数据流最大化局部数据复用
- 演化来源：继承或改进自 systolic_array
- 代表机构：MIT

#### 🔬 深入细节
Row-Stationary数据流最大化局部数据复用


### Eyeriss v2

```yaml
id: eyeriss_v2
num: 29
name: Eyeriss v2
full_name: Eyeriss v2灵活互联架构 (Eyeriss v2 Flexible Architecture)
year: '2019'
org: MIT
parent: eyeriss
paper_url: —
project_url: ''
category: dataflow
motivation: 层级化网格互联支持更广泛的网络拓扑
```

#### 📝 一句话总结
Eyeriss v2 的核心目标是：层级化网格互联支持更广泛的网络拓扑。

#### 🎯 核心要点
- 核心动机：层级化网格互联支持更广泛的网络拓扑
- 演化来源：继承或改进自 eyeriss
- 代表机构：MIT

#### 🔬 深入细节
层级化网格互联支持更广泛的网络拓扑


### DNN硬件综述

```yaml
id: sze_dnn_survey
num: 30
name: DNN硬件综述
full_name: 深度学习硬件加速综述 (Efficient Processing of DNNs Survey)
year: '2017'
org: MIT
parent: eyeriss
paper_url: —
project_url: ''
category: dataflow
motivation: 定义数据流分类学权威综述DNN硬件加速
```

#### 📝 一句话总结
DNN硬件综述 的核心目标是：定义数据流分类学权威综述DNN硬件加速。

#### 🎯 核心要点
- 核心动机：定义数据流分类学权威综述DNN硬件加速
- 演化来源：继承或改进自 eyeriss
- 代表机构：MIT

#### 🔬 深入细节
定义数据流分类学权威综述DNN硬件加速


### NVLink/NVSwitch

```yaml
id: nvlink
num: 31
name: NVLink/NVSwitch
full_name: NVLink高速互联 (NVLink/NVSwitch Interconnect)
year: '2016'
org: NVIDIA
parent: —
paper_url: —
project_url: ''
category: interconnect
motivation: 私有高速协议支持数千GPU统一寻址
```

#### 📝 一句话总结
NVLink/NVSwitch 的核心目标是：私有高速协议支持数千GPU统一寻址。

#### 🎯 核心要点
- 核心动机：私有高速协议支持数千GPU统一寻址
- 代表机构：NVIDIA

#### 🔬 深入细节
私有高速协议支持数千GPU统一寻址


### CXL

```yaml
id: cxl
num: 32
name: CXL
full_name: 计算快速链接 (Compute Express Link)
year: '2024'
org: CXL Consortium
parent: —
paper_url: https://dl.acm.org/doi/abs/10.1145/3669900
project_url: ''
category: interconnect
motivation: 基于PCIe 5.0的缓存一致性开放互联标准
```

#### 📝 一句话总结
CXL 的核心目标是：基于PCIe 5.0的缓存一致性开放互联标准。

#### 🎯 核心要点
- 核心动机：基于PCIe 5.0的缓存一致性开放互联标准
- 代表机构：CXL Consortium

#### 🔬 深入细节
基于PCIe 5.0的缓存一致性开放互联标准


### TVM

```yaml
id: tvm
num: 33
name: TVM
full_name: 张量虚拟机 (Tensor Virtual Machine)
year: '2018'
org: UW/AWS
parent: —
paper_url: https://www.usenix.org/conference/osdi18/presentation/chen
project_url: ''
category: hw_sw_codesign
motivation: 自动调优编译器高效部署模型到多种硬件
```

#### 📝 一句话总结
TVM 的核心目标是：自动调优编译器高效部署模型到多种硬件。

#### 🎯 核心要点
- 核心动机：自动调优编译器高效部署模型到多种硬件
- 代表机构：UW/AWS

#### 🔬 深入细节
自动调优编译器高效部署模型到多种硬件


### MLIR

```yaml
id: mlir
num: 34
name: MLIR
full_name: 多层级中间表示 (Multi-Level Intermediate Representation)
year: '2021'
org: Google
parent: tvm
paper_url: —
project_url: ''
category: hw_sw_codesign
motivation: 统一多层级IR框架成为现代AI编译器基础
```

#### 📝 一句话总结
MLIR 的核心目标是：统一多层级IR框架成为现代AI编译器基础。

#### 🎯 核心要点
- 核心动机：统一多层级IR框架成为现代AI编译器基础
- 演化来源：继承或改进自 tvm
- 代表机构：Google

#### 🔬 深入细节
统一多层级IR框架成为现代AI编译器基础


### MnasNet

```yaml
id: mnasnet
num: 35
name: MnasNet
full_name: 移动端硬件感知NAS (Mobile Neural Architecture Search)
year: '2019'
org: Google
parent: —
paper_url: http://openaccess.thecvf.com/content_CVPR_2019/html/Tan_MnasNet_Platform-Aware_Neural_Architecture_Search_for_Mobile_CVPR_2019_paper.html
project_url: ''
category: hw_sw_codesign
motivation: 将硬件延迟纳入NAS搜索目标
```

#### 📝 一句话总结
MnasNet 的核心目标是：将硬件延迟纳入NAS搜索目标。

#### 🎯 核心要点
- 核心动机：将硬件延迟纳入NAS搜索目标
- 代表机构：Google

#### 🔬 深入细节
将硬件延迟纳入NAS搜索目标


### HW-NAS-Bench

```yaml
id: hw_nas_bench
num: 36
name: HW-NAS-Bench
full_name: 硬件感知NAS基准 (Hardware-Aware NAS Benchmark)
year: '2021'
org: —
parent: mnasnet
paper_url: —
project_url: ''
category: hw_sw_codesign
motivation: 首个硬件感知NAS基准推动标准化评测
```

#### 📝 一句话总结
HW-NAS-Bench 的核心目标是：首个硬件感知NAS基准推动标准化评测。

#### 🎯 核心要点
- 核心动机：首个硬件感知NAS基准推动标准化评测
- 演化来源：继承或改进自 mnasnet
- 代表机构：—

#### 🔬 深入细节
首个硬件感知NAS基准推动标准化评测


### FuseFlow

```yaml
id: fuseflow
num: 37
name: FuseFlow
full_name: 融合中心稀疏编译框架 (FuseFlow Fusion-Centric Compilation)
year: '2026'
org: Stanford/SambaNova
parent: tvm
paper_url: https://asplos-conference.org/asplos2026/program/
project_url: ''
category: hw_sw_codesign
motivation: 以融合为中心的稀疏深度学习编译框架
```

#### 📝 一句话总结
FuseFlow 的核心目标是：以融合为中心的稀疏深度学习编译框架。

#### 🎯 核心要点
- 核心动机：以融合为中心的稀疏深度学习编译框架
- 演化来源：继承或改进自 tvm
- 代表机构：Stanford/SambaNova

#### 🔬 深入细节
以融合为中心的稀疏深度学习编译框架


### TISA

```yaml
id: tisa
num: 38
name: TISA
full_name: 三合一动态调度架构 (TISA Tri-in-One Dynamic Scheduling)
year: '2026'
org: ISCA
parent: —
paper_url: https://www.eeworld.com.cn/mp/yixingzhineng/a114343.jspx
project_url: ''
category: hw_sw_codesign
motivation: 硬件调度器实时优化算力三合一动态分配
```

#### 📝 一句话总结
TISA 的核心目标是：硬件调度器实时优化算力三合一动态分配。

#### 🎯 核心要点
- 核心动机：硬件调度器实时优化算力三合一动态分配
- 代表机构：ISCA

#### 🔬 深入细节
硬件调度器实时优化算力三合一动态分配


### FPGA-CNN综述

```yaml
id: fpga_cnn_survey
num: 39
name: FPGA-CNN综述
full_name: FPGA加速CNN综述 (FPGA-based CNN Acceleration Survey)
year: '2017'
org: NUDT
parent: —
paper_url: —
project_url: ''
category: fpga
motivation: 系统总结FPGA在CNN加速中的关键优化技术
```

#### 📝 一句话总结
FPGA-CNN综述 的核心目标是：系统总结FPGA在CNN加速中的关键优化技术。

#### 🎯 核心要点
- 核心动机：系统总结FPGA在CNN加速中的关键优化技术
- 代表机构：NUDT

#### 🔬 深入细节
系统总结FPGA在CNN加速中的关键优化技术


### SVD-FPGA

```yaml
id: fpga_svd
num: 40
name: SVD-FPGA
full_name: SVD压缩FPGA加速 (SVD-based FPGA Acceleration)
year: '2016'
org: Tsinghua
parent: —
paper_url: —
project_url: ''
category: fpga
motivation: 基于SVD压缩的FPGA定制化量化推理
```

#### 📝 一句话总结
SVD-FPGA 的核心目标是：基于SVD压缩的FPGA定制化量化推理。

#### 🎯 核心要点
- 核心动机：基于SVD压缩的FPGA定制化量化推理
- 代表机构：Tsinghua

#### 🔬 深入细节
基于SVD压缩的FPGA定制化量化推理


### Deep Compression

```yaml
id: deep_compression
num: 41
name: Deep Compression
full_name: 深度压缩 (Deep Compression)
year: '2015'
org: Stanford
parent: —
paper_url: https://arxiv.org/abs/1510.00149
project_url: ''
category: efficiency
motivation: 剪枝量化Huffman编码实现模型50倍压缩
```

#### 📝 一句话总结
Deep Compression 提出了一个三阶段压缩流水线——**剪枝、训练式量化与 Huffman 编码**——将深度神经网络存储需求压缩 35×–49×（如 AlexNet 从 240 MB 压至 6.9 MB），且不损失精度，使模型可完全放入片上 SRAM 而无需访问高能耗的 DRAM。

#### 🎯 核心要点
- **三阶段压缩流水线**：Pruning → Trained Quantization → Huffman Coding，三者正交互不干扰，可叠加获得极高压缩率
- **网络剪枝**：移除权重绝对值低于阈值的连接，AlexNet 参数量减少 9×，VGG-16 减少 13×；使用 CSR/CSC 稀疏格式存储，索引差分编码（conv 层 8 bit，fc 层 5 bit）
- **训练式量化与权重共享**：对每层权重做 k-means 聚类，同簇连接共享一个质心权重；CONV 层 256 簇（8 bit 索引），FC 层 32 簇（5 bit 索引）；训练时按簇聚合梯度更新质心
- **质心初始化策略**：比较了 Forgy（随机）、密度优先、线性三种初始化，线性初始化效果最优，因其对大权重覆盖更均匀
- **Huffman 编码**：利用量化权重和稀疏索引的非均匀分布，进一步节省 20%–30% 存储
- **压缩效果**：AlexNet 35×（240 MB → 6.9 MB），VGG-16 49×（552 MB → 11.3 MB），均无精度损失
- **硬件友好**：压缩后模型可放入片上 SRAM，避免 DRAM 访问；在 CPU/GPU/移动 GPU 上获得 3×–4× 加速和 3×–7× 能效提升

#### 🔬 深入细节
##### 核心框架图

![Deep Compression 三阶段压缩流水线](https://ar5iv.labs.arxiv.org/html/1510.00149/assets/x1.png)
*图 1：Deep Compression 的三阶段压缩流水线：剪枝将连接数减少 10×，量化进一步压缩至 27×–31×，Huffman 编码最终达到 35×–49×。压缩率已包含稀疏表示的元数据开销。*

![权重共享与质心微调示意](https://ar5iv.labs.arxiv.org/html/1510.00149/assets/x3.png)
*图 3：权重共享示意（上）与质心微调过程（下）。同色权重共享同一质心值，反向传播时按簇聚合梯度更新质心。*

##### 算法伪代码

```python
# Deep Compression 三阶段压缩流水线伪代码

# ========== 阶段 1：剪枝 ==========
model = train_network(data)                    # 正常训练至收敛
for layer in model.layers:
    threshold = compute_threshold(layer.weights)  # 基于权重分布确定阈值
    mask = abs(layer.weights) > threshold          # 保留大权重
    layer.weights *= mask                          # 置零小权重
model = retrain_network(model, data, masks)    # 仅更新保留的连接
# 用 CSR/CSC 格式存储稀疏权重，索引用差分编码

# ========== 阶段 2：训练式量化 ==========
for layer in model.layers:
    k = 256 if layer.is_conv else 32           # CONV 8-bit, FC 5-bit
    centroids, indices = kmeans(layer.weights[mask], k)  # k-means 聚类
    layer.codebook = centroids                 # 存储码本
    layer.indices = indices                    # 存储索引
# 微调：按簇聚合梯度更新质心
for epoch in range(finetune_epochs):
    for batch in data:
        grads = compute_gradients(model, batch)
        for layer in model.layers:
            for c_k in range(len(layer.codebook)):
                # 聚合属于第 k 簇的所有梯度
                grad_sum = sum(grads[i,j] for i,j if indices[i,j] == c_k)
                layer.codebook[c_k] -= lr * grad_sum

# ========== 阶段 3：Huffman 编码（离线，无需训练） ==========
for layer in model.layers:
    layer.encoded_weights = huffman_encode(layer.codebook)
    layer.encoded_indices = huffman_encode(layer.indices)
```

##### 动机与背景

深度神经网络虽然在计算机视觉等任务上取得了最先进的性能，但其巨大的参数量（AlexNet 约 240 MB，VGG-16 约 552 MB）严重阻碍了在移动端和嵌入式设备上的部署。核心瓶颈有两个：

1. **存储限制**：移动应用商店对包体大小敏感（如 iOS App Store 限制 100 MB 以上需 Wi-Fi 下载），数百 MB 的模型无法直接嵌入 App。
2. **能耗瓶颈**：在 45nm CMOS 工艺下，一次 32-bit DRAM 访问消耗 640 pJ，是 32-bit SRAM 访问（5 pJ）的 128 倍，是一次浮点加法（0.9 pJ）的 700 倍。大模型无法放入片上 SRAM，必须频繁访问 DRAM，导致能耗远超移动设备的功率预算。

> 💡 **关键洞察**：如果能将模型压缩到足够小（几 MB），就可以完全放入片上 SRAM 缓存，从根本上消除 DRAM 访问的能耗瓶颈。

##### 阶段 1：网络剪枝

剪枝的核心思想是**移除冗余连接**，只保留对网络输出贡献最大的权重。具体流程：

1. 正常训练网络至收敛
2. 将权重绝对值低于阈值的连接移除（置零）
3. 对剩余稀疏网络重新训练（retrain），微调保留连接的权重

剪枝后，AlexNet 的连接数减少 9×，VGG-16 减少 13×。

**稀疏存储格式**：剪枝后的稀疏权重矩阵使用 CSR（Compressed Sparse Row）或 CSC（Compressed Sparse Column）格式存储，需要 \(2a + n + 1\) 个数（\(a\) 为非零元素数，\(n\) 为行/列数）。为进一步压缩索引，采用**相对索引**（存储索引差值而非绝对位置），conv 层用 8 bit、fc 层用 5 bit 编码。当差值超出编码范围时，插入填充零（filler zero）来处理溢出。

![稀疏索引的相对编码与填充零](https://ar5iv.labs.arxiv.org/html/1510.00149/assets/x2.png)
*图 2：用相对索引表示矩阵稀疏性，当索引差超出范围时填充零防止溢出。*

##### 阶段 2：训练式量化与权重共享

量化阶段的目标是**减少表示每个权重所需的比特数**。核心方法是让多个连接共享同一权重值：

1. **k-means 聚类**：对每层已剪枝的权重做一维 k-means 聚类，将 \(n\) 个原始权重 \(W = \{w_1, w_2, \ldots, w_n\}\) 划分为 \(k\) 个簇 \(C = \{c_1, c_2, \ldots, c_k\}\)，最小化簇内平方和：

$$\underset{C}{\arg\min} \sum_{i=1}^{k} \sum_{w \in c_i} |w - c_i|^2$$

2. **存储方式**：每个连接只需存储一个 \(\log_2(k)\) bit 的索引指向码本中的共享权重。压缩率公式为：

$$r = \frac{n \cdot b}{n \cdot \log_2(k) + k \cdot b}$$

其中 \(n\) 为连接数，\(b\) 为原始比特数（32），\(k\) 为簇数。

3. **质心微调**：聚类后，通过反向传播微调质心。每个质心的梯度是所有属于该簇的权重梯度之和：

$$\frac{\partial \mathcal{L}}{\partial C_k} = \sum_{i,j} \frac{\partial \mathcal{L}}{\partial W_{ij}} \cdot \mathbb{1}(I_{ij} = k)$$

> ⚠️ **注意**：权重共享不跨层进行——每层独立聚类，拥有自己的码本。

**质心初始化的影响**：

![质心初始化方法对比](https://ar5iv.labs.arxiv.org/html/1510.00149/assets/x4.png)
*图 4：三种质心初始化方法对比（左）及权重分布与码本微调前后的变化（右）。*

- **Forgy（随机）初始化**：从数据中随机选取 k 个观测值作为初始质心，倾向于集中在双峰分布的峰值附近
- **密度优先初始化**：在权重 CDF 的 y 轴上等距采样，质心在峰值处更密集
- **线性初始化**：在权重的 \([\min, \max]\) 之间等距分布质心，对分布不敏感

> 💡 **关键发现**：线性初始化效果最优。原因是大权重虽然数量少但对网络输出影响大，Forgy 和密度优先方法在大权重区域分配的质心过少，导致表示精度不足。

实验中，CONV 层使用 8 bit（256 个共享权重），FC 层使用 5 bit（32 个共享权重），在不损失精度的前提下实现了高效量化。

##### 阶段 3：Huffman 编码

![量化权重和稀疏索引的分布](https://ar5iv.labs.arxiv.org/html/1510.00149/assets/x6.png)
*图 5：量化权重（左）和稀疏索引（右）的分布均呈现明显偏斜，适合 Huffman 编码。*

Huffman 编码是一种最优前缀码，用变长编码表示源符号——出现频率越高的符号用越短的编码。由于量化后的权重集中在双峰附近、稀疏索引差值集中在小值区域，分布高度非均匀，Huffman 编码可在量化基础上进一步节省 **20%–30%** 的存储。

Huffman 编码是纯离线操作，不需要额外训练，在剪枝和量化微调全部完成后执行。

##### 与传统方法的对比

| 方法 | 核心思路 | AlexNet 压缩率 |
|------|---------|----------------|
| 原始网络 | — | 1× |
| HashedNets (Chen et al., 2015) | 哈希函数预定义权重共享 | — |
| 仅剪枝 (Han et al., 2015) | 移除小权重连接 | 9× |
| 仅量化 | k-means 权重共享 | ~8× |
| **Deep Compression** | **剪枝 + 量化 + Huffman** | **35×** |

Deep Compression 的核心优势在于三种技术**正交互补**：剪枝减少连接数量，量化减少每个连接的比特数，Huffman 编码利用统计冗余进一步压缩。论文实验证明，剪枝不仅不会损害量化效果，反而因为去除了接近零的权重，使得剩余权重的分布更有利于聚类。

##### 压缩效果总结

| 网络 | 原始大小 | 压缩后大小 | 压缩率 | 精度变化 |
|------|---------|-----------|--------|---------|
| LeNet-300-100 | 1070 KB | 27 KB | **40×** | Top-1: 1.64% → 1.58%（提升） |
| LeNet-5 | 1720 KB | 44 KB | **39×** | Top-1: 0.80% → 0.74%（提升） |
| AlexNet | 240 MB | 6.9 MB | **35×** | Top-1/5: 42.78%/19.73% → 42.78%/19.70% |
| VGG-16 | 552 MB | 11.3 MB | **49×** | Top-1/5: 31.50%/11.32% → 31.17%/10.91%（提升） |

在硬件层面，压缩后的网络在 CPU 上获得 3× 加速，在 GPU 上获得 3.5× 加速，在移动 GPU 上获得 4× 加速；能效方面，CPU 上提升 7×，GPU 上提升 3.3×。

#### 🧪 练习题
```yaml
question: "Deep Compression 中，训练式量化阶段使用什么方法实现权重共享？"
options:
  - "对权重矩阵做 SVD 低秩分解"
  - "使用哈希函数将权重映射到固定桶"
  - "对每层权重做 k-means 聚类，同簇连接共享质心值"
  - "将所有权重统一截断到最近的 2 的幂次"
answer: 2
explain: "Deep Compression 对每层已剪枝的权重进行 k-means 聚类，同一簇内的所有连接共享该簇的质心作为权重值，存储时只需保存索引和码本，从而大幅减少比特数。"
```

### EIE

```yaml
id: eie
num: 42
name: EIE
full_name: 高效推理引擎 (Efficient Inference Engine)
year: '2016'
org: Stanford
parent: deep_compression
paper_url: —
project_url: ''
category: efficiency
motivation: 首个针对压缩稀疏模型的专用硬件加速器
```

#### 📝 一句话总结
EIE 的核心目标是：首个针对压缩稀疏模型的专用硬件加速器。

#### 🎯 核心要点
- 核心动机：首个针对压缩稀疏模型的专用硬件加速器
- 演化来源：继承或改进自 deep_compression
- 代表机构：Stanford

#### 🔬 深入细节
首个针对压缩稀疏模型的专用硬件加速器


### BNN

```yaml
id: bnn
num: 43
name: BNN
full_name: 二值神经网络 (Binarized Neural Networks)
year: '2016'
org: MILA
parent: —
paper_url: —
project_url: ''
category: efficiency
motivation: 权重和激活限制为1位极大简化硬件乘法器
```

#### 📝 一句话总结
BNN 的核心目标是：权重和激活限制为1位极大简化硬件乘法器。

#### 🎯 核心要点
- 核心动机：权重和激活限制为1位极大简化硬件乘法器
- 代表机构：MILA

#### 🔬 深入细节
权重和激活限制为1位极大简化硬件乘法器


### Ampere 2:4 Sparsity HW

```yaml
id: ampere_24_sparsity
num: 44
name: Ampere 2:4 Sparsity HW
full_name: 安培2:4稀疏硬件 (Ampere 2:4 Structured Sparsity)
year: '2020'
org: NVIDIA
parent: ampere_sparse
paper_url: https://www.nvidia.com/content/dam/en-zz/Solutions/Data-Center/nvidia-ampere-architecture-whitepaper.pdf
project_url: ''
category: efficiency
motivation: Ampere架构原生2:4结构化稀疏硬件支持
```

#### 📝 一句话总结
Ampere 2:4 Sparsity HW 的核心目标是：Ampere架构原生2:4结构化稀疏硬件支持。

#### 🎯 核心要点
- 核心动机：Ampere架构原生2:4结构化稀疏硬件支持
- 演化来源：继承或改进自 ampere_sparse
- 代表机构：NVIDIA

#### 🔬 深入细节
Ampere架构原生2:4结构化稀疏硬件支持


### SageAttention3

```yaml
id: sageattention3
num: 45
name: SageAttention3
full_name: 微缩放FP4注意力机制 (SageAttention3 Microscaling FP4 Attention)
year: '2026'
org: NeurIPS
parent: —
paper_url: https://proceedings.neurips.cc/paper_files/paper/2025/hash/4db397e0f760cc573c681e81a01a3dba-Abstract-Conference.html
project_url: ''
category: efficiency
motivation: 微缩放FP4注意力机制大幅提升推理能效
```

#### 📝 一句话总结
SageAttention3 的核心目标是：微缩放FP4注意力机制大幅提升推理能效。

#### 🎯 核心要点
- 核心动机：微缩放FP4注意力机制大幅提升推理能效
- 代表机构：NeurIPS

#### 🔬 深入细节
微缩放FP4注意力机制大幅提升推理能效


### Atropos

```yaml
id: atropos
num: 46
name: Atropos
full_name: 稀疏Transformer处理器 (Atropos Sparse Transformer Processor)
year: '2026'
org: IEEE
parent: ampere_24_sparsity
paper_url: https://ieeexplore.ieee.org/abstract/document/11435429/
project_url: ''
category: efficiency
motivation: 12nm稀疏处理器达18.1TFLOPs/W能效比
```

#### 📝 一句话总结
Atropos 是一颗 12 nm FinFET Transformer 推理加速器，首次将**熵信号**同时用于三项优化——提前退出（Early Exit）、FP4/FP8 混合精度切换和逐句电压-频率缩放（DVFS），在 BERT/ALBERT 推理中实现 18.1 TFLOPs/W 峰值能效和 65 mJ/句的能耗，较传统 12 层全推理节省 7.14× 能量。

#### 🎯 核心要点
- **芯片规格**：12 nm FinFET，面积 4.60 mm²，集成于 64 mm² SoC（含 Ariane RISC-V CPU + 32×32 Systolic Array）
- **三合一熵控制**：第一层 Transformer 输出的熵值同时驱动 (1) 提前退出层预测、(2) FP4/FP8 精度选择、(3) 供电电压与时钟频率缩放
- **提前退出**：基于熵阈值 \(E_T\) 预测退出层，SST-2 任务平均仅需 3.9 层（vs 12 层），延迟降低 6.13×
- **混合精度 MAC**：FP8 (E4M3) 与 FP4 (E3M0) 双数据通路，FP4 向量宽度 32（FP8 为 16），配合 per-vector INT6 指数偏置，FP4 精度损失仅 1.2%（91.0% vs 92.2% baseline）
- **细粒度 DVFS**：16 组 V/F 对（0.62–1.0 V，77–717 MHz），通过 cell-based PMOS header + 无反馈 LDO + DCO 实现，切换粒度为单句
- **能效**：FP4 峰值 18.1 TFLOPs/W，FP8 峰值 8.24 TFLOPs/W；2 秒 QoS 目标下 65 mJ/句
- **加速比**：相比同 SoC 上的 Ariane CPU 加速 64.1×，相比 Systolic Array 加速 2.12×
- **模型**：ALBERT（BERT-base 参数共享变体），SST-2/MNLI/QQP 三个 NLP 任务验证

#### 🔬 深入细节
##### 系统架构总览

![Atropos 系统架构图](../assets/atropos_p3_img0.png)
*图：Atropos 系统级架构。核心包括混合精度 MAC 单元、SFU（特殊功能单元，含 32 KB 辅助缓冲）、熵计算引擎、cell-based PMOS power header + 无反馈 LDO + DCO 构成的本地电源域。*

Atropos 的设计核心是将**语义复杂度**（以熵量化）映射为硬件控制信号。整个推理流程如下：

1. **第一层推理**：以最高频率（717 MHz）执行第一个 Transformer 层，获得分类 logits
2. **熵计算**：SFU 中的向量化熵引擎计算 softmax 输出的自熵 \(H(z^{(\ell)})\)
3. **三路决策**：
   - 若 \(H < E_T\)，直接退出（句子已"确定"）
   - 否则，查 LUT 预测退出层 \(L\)，计算目标频率 \(f' = N / (T - T_{\text{curr}})\)，查 DVFS LUT 获得最优电压 \(V'_{DD}\)
   - 同时根据熵值决定后续层使用 FP4 还是 FP8 精度
4. **降频推理**：以降低后的 V/F 完成第 2 到第 \(L\) 层推理

##### 熵引导的提前退出算法

传统提前退出（Algorithm 1）在每层都计算熵并判断是否退出，但这导致延迟不可预测。Atropos 的改进（Algorithm 2）在**仅第一层**就预测退出层，从而可以提前规划频率：

```python
# Algorithm 2: Atropos Early Exit Inference
for sentence_i in sentences:
    # Phase 1: 全速执行第一层
    z_1 = transformer_layer_1(sentence_i)
    H = entropy(z_1)
    
    if H < E_T:
        exit()  # 第一层就够了
    
    # Phase 2: 预测退出层，规划频率
    L = LUT_EE(H, E_T)           # 查表：熵 → 预测退出层
    f_prime = N / (T - T_curr)    # 剩余周期数 / 剩余时间
    V_DD = LUT_DVFS(f_prime)      # 查表：频率 → 最优电压
    
    # Phase 3: 降频执行剩余层
    for layer in range(2, L+1):
        z_l = transformer_layer(sentence_i)
        if entropy(z_l) < E_T:
            exit()  # 提前退出仍然可能
```

> 💡 **关键设计思想**：第一层的熵与最终退出层之间存在强相关性（论文通过线性层/LUT 建模）。利用这一点，Atropos 将"何时退出"的不确定性转化为"以什么速度跑完"的确定性调度，从而给出**统一的延迟保证**（如 2 秒 QoS 目标）。

##### 混合精度 FP4/FP8 MAC 数据通路

![混合精度 MAC 与熵计算硬件](../assets/atropos_p5_img0.png)
*图：(上) FP4/FP8 混合精度 MAC 单元结构，展示 per-vector 指数偏置机制；(下) 熵计算引擎的向量化实现。*

MAC 单元支持两种模式：

| 特性 | FP8 (E4M3) | FP4 (E3M0) |
|------|-----------|-----------|
| 向量宽度 | 16 | 32 |
| 是否有尾数乘法器 | 有 | 无（仅指数加法） |
| 吞吐量 | 1× | 2× |
| 峰值能效 | 8.24 TFLOPs/W | 18.1 TFLOPs/W |

FP4 格式编码为：

$$(-1)^{\text{sign}} \times 2^{\text{exponent} + \text{expbias} / \gamma}$$

其中 \(\gamma\) 控制数值间距。关键创新在于 **per-vector 指数偏置**（而非 per-tensor）：每个向量附带一个 INT6 指数偏置值，存储在 PE 内部寄存器中。这将 FP4 per-tensor 量化的 SST-2 精度从 69.0% 提升至 88.3%（per-vector），结合熵引导的混合精度切换最终达到 91.0%（仅比 baseline 92.2% 低 1.2%）。

| 量化策略 | SST-2 准确率 |
|---------|------------|
| Baseline (FP32) | 92.2% |
| FP8 per-tensor expbias | 92.1% |
| FP4 per-tensor expbias | 69.0% |
| FP4 per-vector expbias | 88.3% |
| 熵引导混合精度（本工作） | 91.0% |

> ⚠️ **注意**：FP4 (E3M0) 没有尾数位，仅靠 3 位指数 + 1 位符号表示数值。如果没有 per-vector expbias 补偿动态范围，精度会灾难性下降（69%）。per-vector 粒度的偏置是使 FP4 可用的关键。

##### 熵计算的硬件实现

![熵计算硬件框图](../assets/atropos_p5_img1.png)
*图：熵函数硬件实现。输出同时驱动 V/F 缩放、混合精度选择和提前退出信号。*

熵计算通过 3 步向量化流水线实现（Algorithm 3）：

```python
# Algorithm 3: Vectorized Softmax & Entropy Calculation
# Input: early exit vector z_l[0..k-1], vector width n

# Step 1: 找最大值（数值稳定性）
max_k = -inf
for i in range(ceil(k/n)):
    v = LOAD(z_l[n*i : n*i+n-1])
    max_k = max(max_k, MAX(v))

# Step 2: 计算指数和与加权指数和
sum_exp = 0
x_sum_exp = 0
for i in range(ceil(k/n)):
    v = LOAD(z_l[n*i : n*i+n-1])
    sum_exp  += SUM(exp(v - max_k))
    x_sum_exp += SUM(v * exp(v - max_k))

# Step 3: 计算熵
H = ln(sum_exp) - max_k - x_sum_exp / sum_exp
```

> 💡 **数值稳定性技巧**：通过减去最大值 \(\text{max}_k\) 避免指数运算溢出。`exp()` 和 `ln()` 均使用**分段线性近似**（bit-accurate piecewise linear）实现，兼顾精度与面积效率。

##### 细粒度电压-频率缩放

![LDO 电流响应与 V/F 相关性](../assets/atropos_p6_img0.png)
*图：(左) 后硅实测 LDO 电流响应轨迹，展示熵控制的 VFS 切换过程；(右) 每句熵值与对应 V/F 缩放的相关性。*

电源管理子系统的独特设计：

- **Cell-based PMOS power headers**：而非传统的片外稳压器，使用标准单元库中的 PMOS 管作为电源开关
- **无反馈 LDO（Free-running LDO）**：省去传统 LDO 的反馈环路，通过 16 个预表征的电阻值（存储在 SFU 的 32 KB LUT 中）直接设置输出电压
- **DCO（数字控制振荡器）**：由 LDO 输出供电，电压降低时频率自然降低，实现 V/F 的自然耦合
- **16 组 V/F 对**：覆盖 0.62–1.0 V 和 77–717 MHz 范围

这种设计的优势是**切换速度快**（无需等待反馈环路稳定）且**完全自包含**（不依赖主时钟域），使得逐句级别的 DVFS 成为可能。

##### 测量结果与对比

![芯片测量结果](../assets/atropos_p8_img0.png)
*图：(a) 芯片显微照片与面积分布；(b) Shmoo 图展示功能正确的 V/F 工作范围；(c) 各处理阶段运行时间对比；(d) CPU vs 加速器运行时间对比。*

**关键测量数据**：

| 指标 | 数值 |
|------|------|
| 工艺 | 12 nm FinFET |
| 面积 | 4.60 mm²（SoC 总 64 mm²） |
| 电压范围 | 0.62 – 1.0 V |
| 频率范围 | 77 – 717 MHz |
| 功耗（FP4） | 9 – 111 mW |
| 功耗（FP8） | 10 – 122 mW |
| 峰值吞吐（FP4） | 0.734 TOPS |
| 峰值吞吐（FP8） | 0.367 TOPS |
| 峰值能效（FP4） | 18.1 TFLOPs/W |
| 峰值能效（FP8） | 8.24 TFLOPs/W |
| SRAM | 647 KB |
| 每句能耗 | 65 mJ（2s QoS 目标） |
| 平均退出层（SST-2） | 3.9 / 12 层 |
| SST-2 准确率 | 91.0%（vs 92.2% baseline） |

**与先前工作对比**（Table 3）：

| 工作 | 工艺 | 面积 | 数据类型 | 峰值能效 | 逐句自适应 |
|------|------|------|---------|---------|-----------|
| JSSC'22 | 16 nm | 8.84 mm² | FP8/Posit8 | 7.8 TOPS/W | ✗ |
| VLSI'22 | 5 nm | 0.153 mm² | INT4 | 95.6 TOPS/W | ✗ |
| ISSCC'22 | 28 nm | 6.82 mm² | INT8 | 4.25 TOPS/W | ✗ |
| VLSI'24 | 22 nm | 6.4 mm² | INT12 | 20.58 TOPS/W | ✗ |
| JSSC'25 | 40 nm | 65.6 mm² | BF16 | 0.50 TOPS/W | ✗ |
| **Atropos** | **12 nm** | **4.60 mm²** | **FP4/FP8** | **18.1 TOPS/W** | **✓ (EE+MP+VFS)** |

> 💡 **独特优势**：Atropos 是唯一支持**逐句自适应优化**（Sentence-Level Adaptive Optimization）的设计。虽然 VLSI'22 在 5 nm 工艺下以 INT4 达到了更高的绝对能效（95.6 TOPS/W），但其不具备根据输入复杂度动态调整计算量和功耗的能力。Atropos 的核心贡献不在于绝对峰值数字，而在于**将算法级自适应（early exit + mixed precision）与电路级自适应（DVFS）统一到一个熵信号下**的系统级协同设计方法学。

##### 与传统方法的区别

| 维度 | 传统 Transformer 加速器 | Atropos |
|------|----------------------|---------|
| 推理层数 | 固定（12 层） | 自适应（平均 3.9 层） |
| 数据精度 | 固定（FP8 或 INT8） | 熵引导动态切换 FP4/FP8 |
| 电压/频率 | 固定或粗粒度调节 | 逐句 16 级 DVFS |
| 延迟保证 | 最坏情况设计 | QoS 目标驱动（如 2 秒） |
| 控制信号 | 无统一信号 | 单一熵信号驱动三项优化 |

#### 🧪 练习题
```yaml
question: "Atropos 为什么选择在第一层 Transformer 输出上计算熵，而不是在每一层都计算？"
options:
  - "第一层的熵计算精度最高"
  - "为了在推理早期就预测退出层并规划降频策略，从而提供统一的延迟保证"
  - "后续层没有分类输出，无法计算熵"
  - "为了减少熵计算硬件的面积开销"
answer: 1
explain: "Atropos 的核心设计目标是提供统一的延迟保证（如 2 秒 QoS）。通过在第一层就预测退出层，可以计算剩余所需周期数并降低频率，将不确定的提前退出转化为确定的调度计划。虽然减少面积也是好处，但这不是主要动机。"
```

### FP4 Training

```yaml
id: fp4_training
num: 47
name: FP4 Training
full_name: FP4全量化训练 (FP4 Fully Quantized LLM Training)
year: '2026'
org: NeurIPS
parent: bnn
paper_url: https://proceedings.neurips.cc/paper_files/paper/2025/hash/8340b085045cf13f1f0b6c2c4cc0a89c-Abstract-Conference.html
project_url: ''
category: efficiency
motivation: 首次实现FP4精度全量化LLM训练
```

#### 📝 一句话总结
本文首次实现了 FP4 精度下的 **全量化** LLM 从头训练（权重、激活、梯度全部量化为 4-bit 浮点），通过提出 **NVFP4 数据格式**、**Split Rounding 策略** 和 **QAF 收尾微调**，在 Llama2-7B / 1T tokens 规模上达到与 BF16 基线持平的性能，预估可比 BF16 训练加速约 85%。

#### 🎯 核心要点
- **首次全量化 FP4 训练**：同时将权重 \(W\)、激活 \(a\)、梯度 \(\delta\) 量化为 FP4，覆盖训练中全部三个 GEMM（Forward / Backward / Update）
- **NVFP4 格式优于 MXFP4**：采用 E2M1 数据 + E4M3 缩放因子 + block_size=16，相比 MXFP4（E8M0 缩放 + block_size=32）在训练 loss 上显著更优
- **Split Rounding 策略**：前向传播使用 Round-to-Nearest (RtN)，反向传播和参数更新使用 Stochastic Rounding (SR)，针对不同 GEMM 的 6 个量化位置分别选择最优舍入方式
- **理论分析**：证明当梯度标准差降至 \(\sqrt{3} \cdot \sigma_q\) 以下时 FP4 训练失效，为 QAF 切换时机提供理论依据
- **QAF 收尾微调**：训练末期切换为前向 FP4 + 反向 BF16，仅需 4% 额外 tokens（40B/1T）即可完全闭合与 BF16 的精度差距
- **大规模验证**：Llama2-7B 在 256 块 Gaudi2 HPU 上训练 1T tokens（约 30 天），零样本评估平均准确率 45.75 vs BF16 的 45.63

#### 🔬 深入细节
##### 核心框架示意

论文的核心思路可概括为下图所示的三阶段流程：

```
┌─────────────────────────────────────────────────────────────────┐
│                    FP4 全量化训练框架                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────┐   ┌──────────────┐   ┌──────────────────┐    │
│  │  Forward GEMM │   │ Backward GEMM│   │   Update GEMM    │    │
│  │  Q(W)·Q(a)   │   │ Q(Wᵀ)·Q(δ)  │   │   Q(δ)·Q(aᵀ)    │    │
│  │              │   │              │   │                  │    │
│  │ W: RtN (FP4) │   │ W: RtN (FP4) │   │ δ: SR  (FP4)     │    │
│  │ a: RtN (FP4) │   │ δ: SR  (FP4) │   │ a: SR  (FP4)     │    │
│  └──────┬───────┘   └──────┬───────┘   └────────┬─────────┘    │
│         │                  │                     │              │
│         ▼                  ▼                     ▼              │
│    输出激活 a          梯度 δ 传播           权重更新 ΔW          │
│   (BF16 存储)        (BF16 存储)          (BF16 主权重)         │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│  训练末期 QAF：Forward 保持 FP4，Backward/Update 切回 BF16       │
│  仅需 ~4% 额外 tokens 即可闭合与 BF16 的精度差距                  │
└─────────────────────────────────────────────────────────────────┘
```

*图：FP4 全量化训练的三个 GEMM 及其量化策略。每个 GEMM 的两个输入矩阵分别采用不同的舍入方式（Split Rounding）。*

##### 算法伪代码

```python
# FP4 全量化 LLM 训练 (Split Rounding + QAF)
# ============================================

def quantize_fp4(x, block_size=16, rounding='rtn'):
    """将 BF16 张量量化为 NVFP4 格式 (E2M1 data + E4M3 scale)"""
    # 按 block_size 分组，每组计算 E4M3 缩放因子
    blocks = x.reshape(-1, block_size)
    scales = blocks.abs().max(dim=-1).values  # E4M3 格式存储
    normalized = blocks / scales.unsqueeze(-1)
    if rounding == 'rtn':
        quantized = round_to_nearest(normalized, fp4_grid)  # 确定性舍入
    elif rounding == 'sr':
        quantized = stochastic_round(normalized, fp4_grid)   # 随机舍入
    return quantized, scales

def fp4_train_step(model, x, y, optimizer, phase='fp4'):
    # ========== Forward GEMM: Q_rtn(W) · Q_rtn(a) ==========
    for layer in model.layers:
        W_q = quantize_fp4(layer.weight, rounding='rtn')   # 权重: RtN
        a_q = quantize_fp4(layer.input,  rounding='rtn')   # 激活: RtN
        layer.output = gemm_fp4(W_q, a_q)  # FP4×FP4 → BF16 累加

    loss = cross_entropy(model.output, y)

    if phase == 'fp4':  # 全 FP4 阶段
        # ========== Backward GEMM: Q_rtn(Wᵀ) · Q_sr(δ) ==========
        for layer in reversed(model.layers):
            W_q = quantize_fp4(layer.weight.T, rounding='rtn')  # 权重: RtN
            d_q = quantize_fp4(layer.grad_out,  rounding='sr')  # 梯度: SR
            layer.grad_in = gemm_fp4(W_q, d_q)

        # ========== Update GEMM: Q_sr(δ) · Q_sr(aᵀ) ==========
        for layer in model.layers:
            d_q = quantize_fp4(layer.grad_out,   rounding='sr')  # 梯度: SR
            a_q = quantize_fp4(layer.input.T,    rounding='sr')  # 激活: SR
            grad_W = gemm_fp4(d_q, a_q)
            optimizer.step(layer.weight, grad_W)  # BF16 主权重更新

    elif phase == 'qaf':  # QAF 收尾阶段
        # Backward 和 Update 使用 BF16 精度
        loss.backward()  # 标准 BF16 反向传播
        optimizer.step()

# 主训练循环
total_tokens = 1_000_000_000_000  # 1T tokens
qaf_tokens   =    40_000_000_000  # 40B tokens (4%)

for step, (x, y) in enumerate(dataloader):
    tokens_seen = step * batch_size * seq_len
    if tokens_seen < total_tokens - qaf_tokens:
        fp4_train_step(model, x, y, optimizer, phase='fp4')
    else:
        fp4_train_step(model, x, y, optimizer, phase='qaf')
```

##### 方法详解

**1. 动机与背景：为什么要 FP4 训练？**

当前 LLM 训练的主流精度路径为 BF16 → FP8，但 FP4（4-bit 浮点）训练此前被认为不可行，因为 4-bit 仅能表示 16 个离散值（含符号），量化噪声极大。然而，FP4 GEMM 的理论吞吐量是 FP8 的 2 倍、BF16 的 4 倍，若能实现 FP4 训练将带来巨大的效率提升。

此前的工作要么仅量化权重和激活（不量化梯度），要么仅量化梯度（不量化权重和激活），从未实现过三者同时 FP4 量化的**全量化训练**。本文首次攻克了这一挑战。

**2. NVFP4 vs MXFP4：数据格式的选择**

FP4 有两种主流格式：

| 特性 | NVFP4 | MXFP4 |
|------|-------|-------|
| 数据位宽 | E2M1 (4-bit) | E2M1 (4-bit) |
| 缩放因子格式 | **E4M3** (8-bit FP) | E8M0 (8-bit, 纯指数) |
| Block 大小 | **16** | 32 |
| 缩放因子精度 | 高（有尾数位） | 低（无尾数位，仅2的幂） |

> 💡 **关键洞察**：NVFP4 的优势来自两方面——(1) E4M3 缩放因子比 E8M0 精度更高（有 3 位尾数），能更精确地表示每个 block 的动态范围；(2) block_size=16 比 32 更细粒度，减少了组内异常值对量化精度的影响。实验表明 NVFP4 在训练 loss 上比 MXFP4 低约 0.05（350M 模型，15B tokens）。

**3. Split Rounding：不同位置用不同舍入**

这是本文最核心的技术贡献。训练中的三个 GEMM 共涉及 6 个量化位置（每个 GEMM 的两个输入矩阵）。作者发现：

- **前向传播**中的权重和激活应使用 **RtN**（Round-to-Nearest），因为 RtN 的均方误差比 SR 更小（SR 引入的方差会在前向传播中累积）
- **反向传播**中的梯度和**参数更新**中的梯度/激活应使用 **SR**（Stochastic Rounding），因为 SR 是无偏的（\(\mathbb{E}[Q_{SR}(x)] = x\)），能保证梯度期望正确

> ⚠️ **为什么不能全用 RtN？** RtN 是有偏的——当真实值恰好落在两个量化点中间时，RtN 总是偏向同一方向。对于前向传播这不是大问题（推理也用 RtN），但对于梯度更新，这种偏差会导致优化收敛到错误的点。Appendix B.2 证明了 RtN 梯度会产生残差损失 \(L_\infty = \mu_\varepsilon^2 / (2\lambda)\)，永远无法收敛到最优解。

> ⚠️ **为什么不能全用 SR？** SR 虽然无偏，但方差更大。在前向传播中，SR 的额外方差会使输出噪声增大，反而降低训练质量。实验（Figure 7）证实：对前向传播中的权重和激活使用 RtN 比 SR 的 loss 更低。

Split Rounding 的完整策略总结：

$$
\begin{aligned}
\text{Forward:} \quad & Q_{\text{RtN}}(W) \cdot Q_{\text{RtN}}(a) \\
\text{Backward:} \quad & Q_{\text{RtN}}(W^\top) \cdot Q_{\text{SR}}(\delta) \\
\text{Update:} \quad & Q_{\text{SR}}(\delta) \cdot Q_{\text{SR}}(a^\top)
\end{aligned}
$$

**4. 理论分析：FP4 训练何时失效？**

作者通过量化 SGD 的收敛性分析，推导出 FP4 训练的**临界噪声阈值**。核心推导如下：

使用二阶 Taylor 展开，量化梯度更新的期望损失变化为：

$$
\mathbb{E}[L(\theta_{t+1}) - L(\theta_t)] \approx \underbrace{-\eta\|\nabla L\|_2^2 + \frac{1}{2}\eta^2 \nabla L^\top H \nabla L}_{\text{有用下降分量}} + \underbrace{\frac{1}{2}\eta^2 \sigma_q^2 \text{tr}(H)}_{\text{量化噪声效应}}
$$

其中 \(\sigma_q^2\) 是量化噪声方差，\(H\) 是 Hessian 矩阵。对最优步长 \(\eta^*\) 求解后，找到损失对噪声最敏感的临界点：

$$
\sigma_{\text{critical}} = \frac{\|\nabla L(\theta_t)\|_2}{\sqrt{3d}}
$$

> 💡 **直觉解释**：当每个参数维度的平均梯度幅度降到量化噪声标准差的 \(\sqrt{3}\) 倍以下时，量化噪声开始主导梯度信号，FP4 训练失去有效性。这为 QAF 切换时机提供了理论指导——当观察到 loss 曲线开始偏离 BF16 基线时，说明梯度已接近临界阈值。

**5. QAF（Quantization-Aware Finetuning）收尾策略**

训练末期（学习率衰减阶段），梯度幅度减小，FP4 量化噪声的相对影响增大，导致 FP4 训练的 loss 曲线与 BF16 基线出现 gap。QAF 的解决方案：

- **前向传播**：保持 FP4 量化（维持量化感知）
- **反向传播 + 参数更新**：切回 BF16 精度（消除梯度量化噪声）
- **学习率**：使用 FP4 训练结束时的最后学习率作为 QAF 的峰值学习率

QAF 所需的额外 tokens 比例随总训练量增加而降低：

| 总训练量 | QAF 长度 | 比例 |
|---------|---------|------|
| 200B | 20B | 10% |
| 500B | 28B | 5.6% |
| 1T | 40B | **4%** |

**6. 实验规模与结果**

最大规模实验：**Llama2-7B**，1T tokens，256 块 Gaudi2 HPU，训练约 30 天。

零样本评估结果（QAF 后）：

| 基准 | BF16 | FP4+QAF |
|------|------|---------|
| ARC-e | 54.0 | 54.6 |
| ARC-c | 27.6 | 28.2 |
| HellaSwag | 52.2 | 52.2 |
| PIQA | 72.4 | 72.0 |
| WinoGrande | 58.6 | 58.2 |
| **平均** | **45.63** | **45.75** |

> 💡 **关键结论**：FP4 全量化训练 + QAF 收尾后的模型性能与 BF16 基线完全持平（甚至略优），证明了 FP4 训练的可行性。

**7. 与前作的对比**

| 方法 | 权重量化 | 激活量化 | 梯度量化 | 全量化 |
|------|---------|---------|---------|-------|
| [21] Quantized LLM Training | ✅ FP4 | ✅ FP4 | ❌ | ❌ |
| [19] 4-bit Gradient | ❌ | ❌ | ✅ FP4 | ❌ |
| **本文** | **✅ FP4** | **✅ FP4** | **✅ FP4** | **✅** |

本文是首个将三者统一到 FP4 精度的工作，使得训练中的**所有 GEMM 运算**都可以在 FP4 精度下执行。

**8. 性能预估**

由于 Gaudi2 HPU 不原生支持 FP4 运算（实验为模拟），作者基于 GEMM 吞吐量理论分析给出预估：

- 相比 FP8 训练：**加速 35-40%**
- 相比 BF16 训练：**加速约 85%**
- 内存节省：FP4 权重/激活存储减半，梯度通信量减半

#### 🧪 练习题
```yaml
question: "在 FP4 全量化训练的 Split Rounding 策略中，前向传播的权重和激活使用 RtN 而非 SR 的主要原因是什么？"
options:
  - "RtN 计算速度比 SR 更快，可以加速前向传播"
  - "RtN 的均方误差更小，减少前向传播中的累积噪声"
  - "SR 在前向传播中会导致梯度消失问题"
  - "RtN 可以保证前向传播结果的无偏性"
answer: 1
explain: "RtN 虽然是有偏估计，但其均方误差（MSE）比 SR 更小。在前向传播中，量化噪声的方差会逐层累积，因此选择 MSE 更小的 RtN 可以减少输出噪声，提升训练质量。SR 的无偏性优势主要体现在梯度更新中。"
```

### Nanophotonic NN

```yaml
id: nanophotonic_nn
num: 48
name: Nanophotonic NN
full_name: 逆向设计纳米光子神经网络 (Inverse-Designed Nanophotonic Neural Network)
year: '2026'
org: Nature Comms
parent: —
paper_url: https://www.nature.com/articles/s41467-026-68648-1
project_url: ''
category: photonic
motivation: 逆向设计实现超紧凑片上光学计算
```

#### 📝 一句话总结
Nanophotonic NN 的核心目标是：逆向设计实现超紧凑片上光学计算。

#### 🎯 核心要点
- 核心动机：逆向设计实现超紧凑片上光学计算
- 代表机构：Nature Comms

#### 🔬 深入细节
逆向设计实现超紧凑片上光学计算


### ASTRA

```yaml
id: astra_photonic
num: 49
name: ASTRA
full_name: 硅光子随机Transformer加速器 (ASTRA Silicon Photonic Transformer Accelerator)
year: '2026'
org: ACM TECS
parent: —
paper_url: https://dl.acm.org/doi/abs/10.1145/3769092
project_url: ''
category: photonic
motivation: 硅光子随机计算降低注意力机制功耗
```

#### 📝 一句话总结
ASTRA 的核心目标是：硅光子随机计算降低注意力机制功耗。

#### 🎯 核心要点
- 核心动机：硅光子随机计算降低注意力机制功耗
- 代表机构：ACM TECS

#### 🔬 深入细节
硅光子随机计算降低注意力机制功耗


### Lightmatter Passage

```yaml
id: lightmatter_passage
num: 50
name: Lightmatter Passage
full_name: Lightmatter 3D光子互连 (Lightmatter Passage 3D Photonic Interconnect)
year: '2026'
org: Lightmatter
parent: —
paper_url: https://lightmatter.co/blog/isscc-2026-scaling-ai-with-light/
project_url: ''
category: photonic
motivation: 3D光子互连链路功耗从30W降至9W
```

#### 📝 一句话总结
Lightmatter Passage 的核心目标是：3D光子互连链路功耗从30W降至9W。

#### 🎯 核心要点
- 核心动机：3D光子互连链路功耗从30W降至9W
- 代表机构：Lightmatter

#### 🔬 深入细节
3D光子互连链路功耗从30W降至9W


### Rebellions Quad-Chiplet

```yaml
id: rebellions_chiplet
num: 51
name: Rebellions Quad-Chiplet
full_name: Rebellions四芯粒AI SoC (Rebellions Quad-Chiplet AI SoC)
year: '2026'
org: Rebellions
parent: —
paper_url: https://isscc.org/2026-highlights/
project_url: ''
category: chiplet
motivation: 四芯粒4nm NPU与HBM3E UCIe互连
```

#### 📝 一句话总结
Rebellions Quad-Chiplet 的核心目标是：四芯粒4nm NPU与HBM3E UCIe互连。

#### 🎯 核心要点
- 核心动机：四芯粒4nm NPU与HBM3E UCIe互连
- 代表机构：Rebellions

#### 🔬 深入细节
四芯粒4nm NPU与HBM3E UCIe互连


### FLARE

```yaml
id: flare_chiplet
num: 52
name: FLARE
full_name: 细粒度CIM异构多芯粒加速器 (FLARE Multi-Chiplet LLM Accelerator)
year: '2026'
org: IEEE JETCAS
parent: —
paper_url: https://ieeexplore.ieee.org/abstract/document/11456071/
project_url: ''
category: chiplet
motivation: 细粒度CIM异构多芯粒LLM加速器
```

#### 📝 一句话总结
FLARE 的核心目标是：细粒度CIM异构多芯粒LLM加速器。

#### 🎯 核心要点
- 核心动机：细粒度CIM异构多芯粒LLM加速器
- 代表机构：IEEE JETCAS

#### 🔬 深入细节
细粒度CIM异构多芯粒LLM加速器


### DeepStack

```yaml
id: deepstack_3d
num: 53
name: DeepStack
full_name: 分布式3D堆叠AI加速器 (DeepStack Distributed 3D-Stacked Accelerator)
year: '2026'
org: arXiv
parent: —
paper_url: https://arxiv.org/abs/2604.04750
project_url: ''
category: chiplet
motivation: 分布式3D堆叠架构优化LLM推理效率
```

#### 📝 一句话总结
DeepStack 提出了面向 3D 堆叠 DRAM 加速器的端到端性能建模与设计空间探索（DSE）框架，通过事务感知的 3D DRAM 带宽建模、层次化片上网络（NoC）仿真、完整并行策略搜索（TP/EP/SP/CP/DP/PP）以及热-功耗协同约束，在 \(\sim 2.5 \times 10^{14}\) 的设计空间中高效搜索最优硬件-软件配置，相比基线实现最高 9.5× 的吞吐提升。

#### 🎯 核心要点
- **五层层次化硬件建模**：PE → Cluster（3D DRAM 堆叠）→ Die（L1 NoC）→ Chip（L2 UCIe）→ System（L3 Ethernet），覆盖从计算单元到多芯片集群的完整架构
- **事务感知 3D DRAM 带宽模型**：捕获四个关键效应——(i) 事务大小依赖带宽、(ii) Little's Law 缓冲约束、(iii) bank 并行度受限、(iv) bank 冲突，精确建模有效带宽与理论带宽的差距
- **双阶段网络建模**：Stage 1 构建逻辑流量矩阵（与拓扑无关），Stage 2 映射到物理拓扑并执行路由仿真，比 NS-3 快 \(10^5\)× 且误差仅 2.12%
- **完整并行策略搜索**：支持 TP × EP × SP × CP × DP × PP = N 的全维度搜索，允许不同模块（Attention/MoE/MLP）采用独立并行策略
- **Tile 级 Compute-Communication Overlap**：将算子拆分为 tile 粒度的流水线，通过 prologue-steady-epilogue 三阶段模型精确估计端到端延迟
- **热-功耗协同约束**：集成 1D 稳态热模型，将 DRAM 层数、功率密度与温度约束（85°C）纳入 DSE 循环
- **多阶段剪枝 DSE**：通过并行策略可行性检查、内存占用过滤、层次化 NoC 搜索等策略，将 \(\sim 2.5 \times 10^{14}\) 的搜索空间压缩至 512 核 CPU 上约 2 天可完成
- **关键设计洞察**：batch size 比 prefill/decode 区分更能决定最优架构；DRAM 堆叠层数存在倒 U 型曲线（>9 层有效带宽反而下降）；不完整的并行策略搜索会永久扭曲架构设计

#### 🔬 深入细节
##### 框架总览

![DeepStack 框架总览](https://ar5iv.labs.arxiv.org/html/2604.04750/assets/x1.png)
*图：DeepStack 框架总览。左侧为五层层次化硬件模型（PE→Cluster→Die→Chip→System），中间为系统级分布式推理建模（并行策略搜索 + 网络仿真 + overlap 建模），右侧为 DSE 引擎输出 Pareto 最优设计。*

DeepStack 的核心架构分为三个紧密耦合的子系统：

1. **芯片级 3D DRAM 性能建模**：在单个 Cluster（compute die + 3D DRAM 层）粒度上，精确建模计算吞吐、DRAM 有效带宽、面积分配和热约束。
2. **系统级分布式推理建模**：将多个 Cluster 组织为 Die → Chip → System 的层次化互连，建模完整的 LLM 推理流水线，包括并行策略、集合通信和 compute-comm overlap。
3. **DSE 引擎**：在硬件配置（SM 数量、DRAM 层数、NoC 拓扑/带宽）× 软件配置（并行策略）的联合空间中搜索 Pareto 最优解。

##### 3D DRAM 有效带宽建模

这是 DeepStack 最核心的技术贡献之一。传统建模工具假设 DRAM 带宽为常数，但 3D 堆叠 DRAM 的有效带宽受多个因素制约：

```python
# DeepStack 3D DRAM 有效带宽计算伪代码
def compute_effective_bandwidth(config, workload):
    # Step 1: 事务大小依赖带宽
    # 小事务无法填满 burst length，带宽利用率下降
    txn_size = workload.transaction_size
    burst_len = config.dram.burst_length
    bw_txn = config.dram.peak_bw * min(txn_size / burst_len, 1.0)
    
    # Step 2: Little's Law 缓冲约束
    # 有效带宽 ≤ buffer_entries × txn_size / latency
    # 需要足够的 outstanding requests 才能饱和带宽
    max_outstanding = config.l1_buffer_entries
    dram_latency = config.dram.access_latency  # ~ns级
    bw_littles = max_outstanding * txn_size / dram_latency
    
    # Step 3: Bank 并行度受限
    # 有效带宽 ≤ num_banks × bank_bandwidth
    bw_bank = config.dram.num_banks * config.dram.per_bank_bw
    
    # Step 4: Bank 冲突建模
    # 随机访问模式下，N个请求命中B个bank的冲突概率
    N_req = max_outstanding
    B_banks = config.dram.num_banks
    # 期望独立bank数 = B * (1 - (1-1/B)^N)
    effective_banks = B_banks * (1 - (1 - 1/B_banks)**N_req)
    bw_conflict = effective_banks * config.dram.per_bank_bw
    
    # 最终有效带宽 = 四个约束的最小值
    effective_bw = min(bw_txn, bw_littles, bw_bank, bw_conflict)
    return effective_bw
```

> 💡 **关键洞察**：理论带宽随 DRAM 层数线性增长，但有效带宽在约 9 层后出现倒 U 型下降。这是因为 Little's Law 约束了 outstanding requests 数量——当 DRAM 层数增加时，理论带宽增大，但 L1 缓冲区深度有限，无法产生足够的并发请求来饱和更高的带宽。

四个约束的数学表达：

$$BW_{\text{eff}} = \min\left( BW_{\text{txn}}, \; \frac{N_{\text{buf}} \cdot S_{\text{txn}}}{t_{\text{lat}}}, \; N_{\text{banks}} \cdot BW_{\text{bank}}, \; \mathbb{E}[B_{\text{active}}] \cdot BW_{\text{bank}} \right)$$

其中 \(\mathbb{E}[B_{\text{active}}] = B \cdot \left(1 - \left(1 - \frac{1}{B}\right)^N\right)\) 是 \(N\) 个请求在 \(B\) 个 bank 上的期望活跃 bank 数。

##### 双阶段网络建模

![网络建模双阶段](https://ar5iv.labs.arxiv.org/html/2604.04750/assets/x3.png)
*图：双阶段网络建模。Stage 1 从并行策略推导逻辑流量矩阵，Stage 2 将流量映射到物理拓扑执行路由仿真。*

**Stage 1: 逻辑流量矩阵构建**

给定并行策略（如 TP=4, EP=8），DeepStack 自动推导每个集合通信操作（AllReduce、AllGather、All-to-All 等）的流量矩阵 \(T \in \mathbb{R}^{N \times N}\)，其中 \(T_{ij}\) 表示节点 \(i\) 到节点 \(j\) 的数据传输量。

关键创新在于**并行策略到通信模式的自动映射**：
- **TP (Tensor Parallelism)**：在 Attention/MLP 层产生 AllReduce
- **EP (Expert Parallelism)**：在 MoE 层产生 All-to-All
- **SP (Sequence Parallelism)**：在 LayerNorm/Dropout 处产生 AllGather + ReduceScatter
- **CP (Context Parallelism)**：长序列分片产生 P2P 通信
- **PP (Pipeline Parallelism)**：跨 stage 的 P2P 传输 + pipeline bubble

DeepStack 允许不同模块采用独立并行策略（如 Attention 用 TP，MoE 用 EP），并自动插入必要的重分布集合通信。

**Stage 2: 物理拓扑映射与路由**

```python
# Stage 2 网络仿真伪代码
def simulate_network(traffic_matrix, topology, routing_algo):
    """
    将逻辑流量矩阵映射到物理拓扑，计算通信延迟
    支持三层层次化拓扑: L1(Cluster内) / L2(Die内) / L3(Chip间)
    """
    total_latency = 0
    for src, dst, data_size in traffic_matrix.entries():
        # 确定通信路径（跨越哪些层次）
        path = routing_algo.find_path(src, dst, topology)
        
        # 计算每一跳的延迟
        hop_latency = sum(hop.latency for hop in path.hops)
        
        # 计算传输延迟（考虑链路带宽和拥塞）
        transfer_time = data_size / path.bottleneck_bandwidth
        
        # 支持 ring / tree / direct 等集合通信算法
        total_latency = max(total_latency, hop_latency + transfer_time)
    
    return total_latency
```

该方法相比 NS-3 的离散事件仿真实现了 \(\sim 10^5 \times\) 加速（0.1s vs 3h），同时保持 2.12%（Switch）和 1.62%（Torus）的加权误差。

##### Tile 级 Compute-Communication Overlap

DeepStack 将每个算子（如 GEMM）拆分为多个 tile，实现计算与通信的流水线重叠：

$$T_{\text{e2e}} = T_{\text{prologue}} + (K-2) \cdot \max(T_{\text{comp}}^{\text{tile}}, T_{\text{comm}}^{\text{tile}}) + T_{\text{epilogue}}$$

其中 \(K\) 是 tile 数量，prologue 是第一个 tile 的通信时间（尚无计算可重叠），epilogue 是最后一个 tile 的计算时间（尚无通信可重叠），中间的 steady state 阶段取计算和通信的最大值。

> ⚠️ **注意**：overlap 的有效性取决于 tile 粒度的选择。tile 太大则流水线级数太少，overlap 不充分；tile 太小则启动开销占比增大。DeepStack 在 DSE 中搜索最优 tile 大小。

##### 完整并行策略搜索

DeepStack 支持的并行策略空间为：

$$\text{TP} \times \text{EP} \times \text{SP} \times \text{CP} \times \text{DP} \times \text{PP} = N$$

其中 \(N\) 为总设备数。关键设计决策包括：

| 并行维度 | 通信模式 | 适用场景 | 通信量 |
|---------|---------|---------|-------|
| TP | AllReduce | 小 batch，低延迟需求 | \(O(2 \cdot \frac{p-1}{p} \cdot M)\) |
| EP | All-to-All | MoE 模型，大 batch | \(O(2 \cdot \frac{p-1}{p} \cdot \text{tokens} \cdot d)\) |
| SP | AllGather + ReduceScatter | 长序列 | \(O(\frac{p-1}{p} \cdot M)\) |
| CP | P2P Ring | 超长上下文 | \(O(\text{seq\_len} \cdot d / p)\) |
| PP | P2P + Bubble | 大模型分层 | \(O(\text{hidden} \cdot \text{micro\_bs})\) |
| DP | AllReduce (gradients) | 大 batch | \(O(2 \cdot \frac{p-1}{p} \cdot |\theta|)\) |

> 💡 **关键发现**：最优并行策略随 batch size 剧烈变化。小 batch 时 TP 主导（隐藏延迟），大 batch 时 PP 和 EP 更优（摊薄 bubble 和通信开销）。对于 MoE 模型，EP 在大 batch 下贡献最大增益（DeepSeek-V3 上 5.03× 提升）。

##### DSE 多阶段剪枝策略

```python
# DeepStack DSE 多阶段剪枝伪代码
def design_space_exploration(models, area_budget, thermal_limit):
    """
    搜索空间 ~2.5×10^14，通过四阶段剪枝降至可行规模
    """
    candidates = generate_all_configs()  # 硬件 × 并行策略
    
    # Stage 1: 并行策略可行性 (剪枝 ~80%)
    # 例: TP=1, DP=1 在给定batch下不可行
    candidates = [c for c in candidates if is_parallel_feasible(c)]
    
    # Stage 2: 内存占用检查 (剪枝 ~50%)
    # 权重 + KV cache + 峰值激活 ≤ DRAM容量 × 0.9
    candidates = [c for c in candidates 
                  if memory_footprint(c) <= c.dram_capacity * 0.9]
    
    # Stage 3: 层次化 NoC 搜索
    # 先搜基础架构+堆叠配置，取 top 5%
    top_arch = sorted(candidates, key=evaluate)[:len(candidates)*0.05]
    # 再搜 NoC 延迟，取 top 5%
    top_noc = sorted(top_arch, key=evaluate_noc)[:len(top_arch)*0.05]
    # 最后逐层带宽微调
    final = fine_tune_bandwidth(top_noc)
    
    # Stage 4: 热约束过滤
    final = [c for c in final if thermal_check(c) <= thermal_limit]
    
    return pareto_frontier(final)
```

##### 实验验证与关键结果

**建模精度**：
- 对比 Cadence Palladium 周期精确仿真：误差 < 5%
- 对比 8×H100 Triton-Distributed 内核：平均误差 3.97%（AllGather GEMM）
- 对比 8×B200 vLLM 端到端推理：MAPE 12.18%
- 对比 ASTRA-sim NS-3 后端：误差 2.12%（Switch）/ 1.62%（Torus），速度提升 \(10^5\)×

**性能提升（消融实验，DeepSeek-V3 decode）**：

| 步骤 | 技术 | STPS (BS=4) | STPS (BS=1024) |
|-----|------|------------|----------------|
| 1 | 基线 (ASTRA-sim: DP/TP/PP) | 177.1 | 5,729 |
| 2 | + 完整并行策略 (EP/SP/CP) | 256.4 (+45%) | 21,252 (+271%) |
| 3 | + 模块级灵活并行 | 256.4 (—) | 24,488 (+15%) |
| 4 | + 芯片架构搜索 | 314.2 (+23%) | 31,350 (+28%) |
| 5 | + Compute-Comm Overlap | 340.5 (+8%) | 38,061 (+21%) |
| 6 | + DRAM 层数 DSE | 493.3 (+45%) | 51,095 (+34%) |
| 7 | + NoC DSE | 494.1 (+0.2%) | 54,280 (+6.2%) |
| — | **总加速比** | **2.8×** | **9.5×** |

##### 核心设计洞察

![DRAM层数与有效带宽的倒U型关系](https://ar5iv.labs.arxiv.org/html/2604.04750/assets/x5.png)
*图：随 DRAM 堆叠层数增加，理论带宽线性增长，但有效带宽在约 9 层后下降（倒 U 型曲线），原因是 Little's Law 缓冲约束。*

**洞察 1：Batch size 比 prefill/decode 更能决定最优架构**

传统 PD 解耦（prefill-decode disaggregation）将推理分为两个阶段分别优化。DeepStack 的 DSE 揭示了更本质的划分：
- **大 batch prefill**：浅堆叠（2 层），最大化计算面积
- **小 batch prefill + 大 batch decode**：中等堆叠（6-7 层），平衡计算与带宽
- **小 batch decode**：深堆叠（~9 层），最大化带宽

这意味着**batch-size-aware 硬件解耦**可能比 PD 解耦更有效。

**洞察 2：不完整的并行策略搜索会永久扭曲硬件设计**

消融实验表明，移除 EP 维度不仅降低吞吐，还导致 DSE 收敛到完全不同的芯片设计：
- 有 EP：ep=32, tp=4, 7 层堆叠, 6 个 SM
- 无 EP：tp=16, pp=8, 8 层堆叠, 5 个 SM（触及功耗墙）

> ⚠️ **警告**：这种硅片级的设计偏差无法通过后期软件调优弥补，强调了在流片前进行完整硬件-软件协同搜索的必要性。

**洞察 3：能效最优与吞吐最优需要根本不同的架构**

吞吐最优设计最大化连接层数以饱和带宽，而能效最优设计倾向于更多堆叠但更少连接（空闲）层，通过更大的片上缓冲和改进的数据复用来补偿带宽损失，功率密度降低 10-48%，tokens/J 提升 3-24%。

#### 🧪 练习题
```yaml
question: "DeepStack 发现 3D 堆叠 DRAM 的有效带宽在超过约 9 层后反而下降，主要原因是什么？"
options:
  - "DRAM 层数增加导致热阻过高，必须降频运行"
  - "TSV 数量有限，物理连接带宽无法线性扩展"
  - "Little's Law 约束下，有限的缓冲区深度无法产生足够的并发请求来饱和更高的理论带宽"
  - "bank 冲突概率随层数增加而急剧上升"
answer: 2
explain: "根据 Little's Law，有效带宽 ≤ buffer_entries × txn_size / latency。当 DRAM 层数增加使理论带宽超过此上限时，L1 缓冲区深度成为瓶颈，无法维持足够的 outstanding requests 来饱和带宽，导致有效带宽出现倒 U 型下降。"
```

### MoEntwine

```yaml
id: moentwine
num: 54
name: MoEntwine
full_name: 晶圆级MoE专家并行推理 (MoEntwine Wafer-Scale Expert Parallel Inference)
year: '2026'
org: HPCA
parent: cerebras_wse
paper_url: https://ieeexplore.ieee.org/abstract/document/11408594/
project_url: ''
category: llm_inference
motivation: 释放晶圆级芯片超大规模MoE并行推理潜力
```

#### 📝 一句话总结
MoEntwine 提出 **Entwined Ring Mapping (ER-Mapping)** 与 **Non-Invasive Balancer (NI-Balancer)** 两项协同技术，通过将 TP 组交错编织为紧凑的 Full Token Domain 消除 mesh 网络中心拥塞，并利用通信阶段的冷链路实现零开销专家迁移，在晶圆级计算机上相比 NVL72 实现平均 39% 的 MoE 推理性能提升。

#### 🎯 核心要点
- **目标平台**：Wafer-Scale Computer (WSC)，单片晶圆集成数百 die，die 间通过 2D mesh 拓扑直连，带宽远超传统 GPU 集群但受限于多跳路由
- **核心问题一 — 通信拥塞**：MoE Expert Parallelism 的 all-to-all 通信在 mesh 中心产生严重拥塞，传统 TP 组角落映射导致 Full Token Domain (FTD) 面积大且相互交叉
- **核心问题二 — 专家迁移开销**：WSC 无片上磁盘，动态负载均衡必须通过 mesh 网络迁移专家权重，侵入式迁移中断推理流水线
- **ER-Mapping**：将 TP 组交错编织为相邻排列，使 FTD 从 3×3 缩小为 2×2 且互不交叉，all-to-all 通信距离降低 >50%；代价是 all-reduce 变为 2-hop entwined ring（延迟 ×2 但绝对值小）
- **Hierarchical ER-Mapping (HER-Mapping)**：多晶圆场景下将 all-reduce 拆分为 reduce-scatter + all-gather 两阶段，消除跨晶圆多跳开销
- **NI-Balancer**：利用 all-reduce 阶段 FTD 内链路空闲（冷链路）执行 Local Migration，all-to-all 阶段 FTD 间链路空闲执行 Global Migration，通过 CUDA stream 流水线化实现零开销
- **拓扑感知贪心算法**：基于历史负载预测，选择最热设备的最热门专家，复制到拓扑距离最近的冷设备 shadow slot
- **评估**：基于 ASTRA-sim 2.0 模拟 B200 等效 WSC die，在 DeepSeek-V3/V2、Qwen3、DBRX、Mixtral 上验证，ER-Mapping 最高降低 62% 通信延迟，NI-Balancer 降低 54% 计算延迟，整体比 NVL72 提升 39%

#### 🔬 深入细节
![MoEntwine 系统总览：WSC 架构与 MoE 推理挑战](../assets/moentwine_fig1_wsc_overview.png)
*图 1：晶圆级计算机架构总览。单片晶圆集成数百个 die，die 间通过 2D mesh 拓扑直连，带宽远超传统 NVLink 集群，但多跳路由在中心区域产生严重拥塞。*

**动机与背景：WSC 上 MoE 推理的两大瓶颈。** Mixture-of-Experts (MoE) 模型通过稀疏激活实现参数规模的高效扩展，Expert Parallelism (EP) 将不同专家分布在多个设备上，推理时需要 all-to-all 通信将 token 路由到对应专家设备。在传统 GPU 集群（如 DGX B200）中，节点内设备通过 NVSwitch 全连接，all-to-all 为单跳通信。然而在 WSC 的 2D mesh 拓扑中，远距离设备间的通信必须经过多个中间节点，导致中心链路成为瓶颈。论文通过理论分析证明：当 TP 组按传统方式映射到网格角落时，每个 Full Token Domain（FTD，即持有一个 TP 组全部 token 的最小设备集合）面积为 3×3，且不同 FTD 在中心区域严重交叉，all-to-all 流量在中心链路叠加产生 \(O(n)\) 级拥塞。同时，WSC 没有片上磁盘存储，动态负载均衡所需的专家迁移只能通过已经拥塞的 mesh 网络完成，传统侵入式迁移（暂停推理→迁移→恢复）每次中断相当于 2 个推理迭代的开销。

![FTD 概念与拥塞分析](../assets/moentwine_fig6_ftd_concept.png)
*图 6：Full Token Domain (FTD) 概念。左：传统角落映射下 FTD 为 3×3 区域且相互交叉；右：ER-Mapping 下 FTD 缩小为 2×2 且互不交叉。*

**核心机制一：Entwined Ring Mapping (ER-Mapping)。** ER-Mapping 的核心洞察是：all-to-all 通信的瓶颈源于 FTD 过大和交叉，而 all-reduce 的延迟天然较低（数据量小）。因此可以牺牲少量 all-reduce 性能来大幅优化 all-to-all。具体做法是将属于不同 TP 组的设备交错编织排列，使得每个 FTD 仅占 2×2 的紧凑区域且互不重叠。在 Attention 层，ER-Mapping 保留 all-gather 操作使每个设备持有完整 KV cache，这样后续 all-to-all 的源和目的都在同一个 2×2 FTD 内，通信距离从多跳降为 1-2 跳。代价是 all-reduce 不再能在连续设备上执行经典 ring，而是形成"entwined ring"——环上相邻节点在物理拓扑上间隔 2 跳，all-reduce 延迟约为原来的 2 倍。但由于 all-reduce 数据量（hidden_size 级别）远小于 all-to-all 数据量（token_count × hidden_size 级别），这一权衡在绝大多数配置下都是有利的。

![ER-Mapping 设计](../assets/moentwine_fig7_er_mapping.png)
*图 7：ER-Mapping 将 TP 组交错编织，形成紧凑的 2×2 FTD。右侧展示了 all-to-all 通信路径的显著缩短。*

![Entwined Ring All-Reduce](../assets/moentwine_fig8_entwined_ring.png)
*图 8：Entwined Ring 上的 all-reduce 操作。环上相邻逻辑节点在物理 mesh 上间隔 2 跳，延迟约为传统 ring 的 2 倍，但绝对值仍远小于 all-to-all。*

对于多晶圆系统，论文进一步提出 **Hierarchical ER-Mapping (HER-Mapping)**：将 all-reduce 拆分为晶圆内 reduce-scatter 和跨晶圆 all-gather 两个阶段。reduce-scatter 在本地 entwined ring 上执行，all-gather 通过晶圆间高速互连完成，避免了跨晶圆多跳 ring 的长延迟。HER-Mapping 在所有并行配置下都能稳定带来性能提升，最高达 62%。

> 💡 **关键洞察**：ER-Mapping 的本质是用 all-reduce 的"富余带宽"换取 all-to-all 的"拓扑距离"——在 MoE 推理中 all-to-all 数据量通常是 all-reduce 的 \(K\)（激活专家数）倍，因此即使 all-reduce 延迟翻倍，总通信时间仍大幅下降。

**核心机制二：Non-Invasive Balancer (NI-Balancer)。** MoE 推理中 gating 函数的动态路由导致专家负载不均衡，最热设备负载可达平均值的 2 倍。传统方法通过复制热门专家到空闲设备来均衡负载，但迁移专家权重（数百 MB）需要占用网络带宽并中断推理流水线。NI-Balancer 的核心洞察是 **冷热链路的时间互补性**：

- **All-Reduce 阶段**：FTD 内部链路繁忙，但 FTD 之间的链路空闲 → 利用空闲链路执行 **Global Migration**（跨 FTD 的专家复制）
- **All-to-All 阶段**：FTD 之间链路繁忙，但 FTD 内部链路空闲 → 利用空闲链路执行 **Local Migration**（FTD 内的专家复制）

![NI-Balancer 流水线](../assets/moentwine_fig11_ni_balancer.png)
*图 11：NI-Balancer 利用通信阶段的冷链路执行专家迁移，通过 CUDA stream 流水线化实现零开销。Compute、Communication、Migration 三个 stream 并行执行。*

迁移操作通过独立的 CUDA stream 与计算/通信并行执行，完全不阻塞推理流水线。论文还利用了专家负载的 **时间局部性**——在固定场景下负载比例在 warm-up 后趋于稳定，混合场景下也呈现缓慢变化的趋势——通过历史窗口预测未来负载，仅在累积不均衡超过阈值 \(\alpha\) 时触发迁移，避免频繁无效操作。

```python
# NI-Balancer 拓扑感知贪心算法（简化伪代码）
def topology_aware_balance(devices, load_history, mesh_topology):
    predicted_load = predict_from_history(load_history)  # 时间局部性预测
    
    while max(predicted_load) / avg(predicted_load) > 1 + alpha:
        # 找到最热设备上最热门的专家
        hot_device = argmax(predicted_load)
        hot_expert = most_popular_expert(hot_device)
        
        # 在拓扑距离最近的冷设备上找到空闲 shadow slot
        cold_devices = sorted_by_topology_distance(
            [d for d in devices if has_shadow_slot(d)], 
            center=hot_device
        )
        target = cold_devices[0]
        
        # 调度迁移（在下一个冷链路窗口执行）
        if same_ftd(hot_device, target):
            schedule_local_migration(hot_expert, target)   # A2A阶段执行
        else:
            schedule_global_migration(hot_expert, target)  # AR阶段执行
        
        # 更新预测负载
        predicted_load[hot_device] -= expert_load(hot_expert) * redistribution_ratio
        predicted_load[target] += expert_load(hot_expert) * redistribution_ratio
```

**实验验证与消融分析。** 论文基于 ASTRA-sim 2.0 构建了精确的 WSC 模拟器，每个 die 等效于 NVIDIA B200 GPU（2250 TFLOPS BF16、180GB HBM、8TB/s 带宽），die 间互连带宽 900GB/s。在 DeepSeek-V3（671B, 256 experts）、DeepSeek-V2（236B）、Qwen3（235B）、DBRX（132B）、Mixtral-8x22B（141B）五个主流 MoE 模型上进行了全面评估。

![ER-Mapping 通信性能](../assets/moentwine_fig13_er_results.png)
*图 13：ER-Mapping 在不同模型、规模、并行度下的通信延迟对比。WSC 相比 DGX 平均降低 56% 通信延迟，ER-Mapping 进一步带来最高 35% 的额外提升。*

ER-Mapping 的通信优化效果随激活专家数增加而增强（all-to-all 占比更高），在 DeepSeek-V3（激活 8/256 experts）上效果最为显著。对于仅激活 2 个专家的 Mixtral，all-to-all 占比较小，ER-Mapping 的增益有限。HER-Mapping 在多晶圆场景下表现稳定，所有配置均有提升，最高达 62%。

![运行时负载轨迹](../assets/moentwine_fig15_runtime_trace.png)
*图 15：运行时专家负载轨迹。无均衡时最大负载偏离均值 2×；贪心均衡频繁中断推理；拓扑感知均衡减少中断；非侵入式均衡完全消除中断。*

NI-Balancer 的消融实验显示：无负载均衡时最大设备负载偏离均值 2 倍；基线贪心均衡（EPLB）平均每 10 次迭代中断一次，每次中断等效 2 次迭代开销；在混合场景的 Decode-only 模式下，侵入式迁移开销高达 45%。NI-Balancer 完全消除迁移开销，MoE 计算延迟降低最高 54%，all-to-all 通信延迟降低 23%。

![端到端消融](../assets/moentwine_fig17_ablation.png)
*图 17：端到端消融分析。以 NVL72 为基线，逐步叠加 ER-Mapping → HER-Mapping → 负载均衡 → 拓扑感知 → 非侵入式，最终 WSC 相比 NVL72 实现平均 39% 的每设备 MoE 性能提升。*

端到端消融以 NVIDIA NVL72（72 设备全连接超级节点）为基线，WSC 使用 4 块 8×8 晶圆（256 设备）。NVL72 的 EP=72 导致每设备多专家、内存访问主导执行时间，负载均衡增益仅 26%。WSC 的 EP=256 实现单专家每设备，但原始 mesh 拓扑下 all-to-all 延迟远超计算时间。ER-Mapping 降低 30% all-to-all 延迟，HER-Mapping 将降幅扩大到 71%，消除通信瓶颈。叠加 NI-Balancer 后计算和通信分别再降 49% 和 20%，最终 WSC 相比 NVL72 实现平均 **39%** 的每设备 MoE 推理性能提升。

> ⚠️ **注意**：ER-Mapping 的收益依赖于 all-to-all/all-reduce 的数据量比值。对于激活专家数极少（如 Mixtral 的 2/8）的模型，all-to-all 占比小，ER-Mapping 的权衡可能不利。论文建议此类模型考虑 ESP（Expert Sharding Parallelism）替代方案。

#### 🧪 练习题
```yaml
question: "MoEntwine 的 ER-Mapping 将 TP 组交错编织排列的核心收益是什么？"
options:
  - "降低 all-reduce 通信延迟"
  - "将 Full Token Domain (FTD) 从 3×3 缩小为 2×2 且互不交叉，大幅减少 all-to-all 通信距离"
  - "增加每个设备上的专家数量以提高计算利用率"
  - "消除 MoE gating 函数带来的负载不均衡"
answer: 1
explain: "ER-Mapping 通过交错编织 TP 组使 FTD 紧凑化（2×2）且互不重叠，all-to-all 通信被限制在小范围内，距离从多跳降为 1-2 跳。代价是 all-reduce 延迟约翻倍，但由于 all-reduce 数据量远小于 all-to-all，总通信时间仍大幅下降。"
```

### DIAMoND

```yaml
id: diamond_moe
num: 55
name: DIAMoND
full_name: 异构存内MoE推理架构 (DIAMoND Heterogeneous In-Memory MoE)
year: '2026'
org: ISCA
parent: —
paper_url: https://mengli.me/news/2026-03-31-isca2026/
project_url: ''
category: llm_inference
motivation: 异构NAND/DRAM实现边缘侧存内MoE推理
```

#### 📝 一句话总结
DIAMoND 的核心目标是：异构NAND/DRAM实现边缘侧存内MoE推理。

#### 🎯 核心要点
- 核心动机：异构NAND/DRAM实现边缘侧存内MoE推理
- 代表机构：ISCA

#### 🔬 深入细节
异构NAND/DRAM实现边缘侧存内MoE推理


### BitDecoding

```yaml
id: bitdecoding
num: 56
name: BitDecoding
full_name: 低比特KV Cache解码 (BitDecoding Low-Bit KV Cache Decoding)
year: '2026'
org: HPCA
parent: —
paper_url: https://hpca-conf.org/2026/program/
project_url: ''
category: llm_inference
motivation: 低比特KV Cache量化释放Tensor Core算力
```

#### 📝 一句话总结
BitDecoding 的核心目标是：低比特KV Cache量化释放Tensor Core算力。

#### 🎯 核心要点
- 核心动机：低比特KV Cache量化释放Tensor Core算力
- 代表机构：HPCA

#### 🔬 深入细节
低比特KV Cache量化释放Tensor Core算力


### NVIDIA Ising

```yaml
id: nvidia_ising
num: 57
name: NVIDIA Ising
full_name: NVIDIA Ising量子AI模型 (NVIDIA Ising Quantum AI Model)
year: '2026'
org: NVIDIA
parent: —
paper_url: https://nvidianews.nvidia.com/news/nvidia-ising-open-source-quantum-ai-models
project_url: ''
category: quantum_hybrid
motivation: AI优化量子纠错实现微秒级混合控制
```

#### 📝 一句话总结
NVIDIA Ising 提出了面向量子计算的 AI 模型族与训练框架，包含基于 MoE VLM 的量子校准模型（Ising Calibration 1）和基于 3D CNN 的表面码预解码器（Ising Decoder SurfaceCode 1），分别在量子处理器校准和量子纠错解码两大关键任务上超越现有最优方案，结合 NVQLink GPU-QPU 耦合架构实现微秒级实时混合量子-经典控制。

#### 🎯 核心要点
- **模型族三大组件**：Ising Calibration 1（校准 VLM）、Ising Decoder SurfaceCode 1 Fast（快速解码器）、Ising Decoder SurfaceCode 1 Accurate（精确解码器），覆盖量子计算从校准到纠错的全流程
- **校准模型**：基于 Qwen3.5-35B-A3B 的 MoE VLM（~35B 总参数，~3B 活跃/token，256 专家取 8），在 QCalEval 基准上零样本平均分 74.7，超越 Gemini 3.1 Pro（+3.27%）、Claude Opus 4.6（+9.68%）、GPT 5.4（+14.5%）
- **QCalEval 基准**：首个量子校准图理解 VLM 基准，243 样本 × 87 场景类型 × 22 实验族，覆盖超导量子比特与中性原子，6 类问题
- **3D CNN 预解码器架构**：轻量级 3D 卷积网络处理时空综合征体积，Fast 版（912K 参数，R=9）实现 2.5× 快于 PyMatching 且精度提升 1.1×；Accurate 版（1.79M 参数，R=13）实现 2.3× 快且精度提升 1.5×
- **训练框架**：利用 cuQuantum cuStabilizer 高效生成 SI1000 去极化噪声训练数据，结合 PyTorch 训练，支持量化部署
- **NVQLink 集成**：通过 GH200 Grace Hopper + ConnectX-7 RDMA/RoCE 实现 GPU-QPU 耦合，平均延迟 3.84μs（<4μs），支持 CUDA-Q QEC 实时解码
- **Quantinuum Helios 实证**：Bring 码 qLDPC 编码（30 物理比特编码 8 逻辑比特），BP+OSD 解码器中位延迟 67μs，错误率改善 5.4×

#### 🔬 深入细节
##### 系统架构总览

NVIDIA Ising 是一个完整的 AI-for-Quantum 技术栈，解决量子计算走向容错的两大核心挑战：**量子处理器校准**（QPU Bring-up）和**量子纠错解码**（QEC Decoding）。

```
┌─────────────────────────────────────────────────────────────┐
│                    NVIDIA Ising 技术栈                        │
├─────────────────────┬───────────────────────────────────────┤
│   Ising Calibration │          Ising Decoding               │
│                     │                                       │
│  ┌───────────────┐  │  ┌─────────────┐  ┌───────────────┐  │
│  │ Calibration 1 │  │  │ Decoder     │  │ Decoder       │  │
│  │ (MoE VLM)     │  │  │ Fast 912K   │  │ Accurate 1.8M │  │
│  │ Qwen3.5-35B   │  │  │ 4-layer CNN │  │ 6-layer CNN   │  │
│  │ -A3B base     │  │  │ R=9         │  │ R=13          │  │
│  └───────┬───────┘  │  └──────┬──────┘  └───────┬───────┘  │
│          │          │         │                  │          │
│  ┌───────▼───────┐  │  ┌──────▼──────────────────▼──────┐  │
│  │ Agentic       │  │  │ cuQuantum cuStabilizer         │  │
│  │ Workflow      │  │  │ + PyTorch Training Framework    │  │
│  │ (QPU Bring-up)│  │  │ (SI1000 Noise Model)           │  │
│  └───────────────┘  │  └───────────────┬────────────────┘  │
├─────────────────────┴─────────────────┬─┘                   │
│                                       │                     │
│  ┌────────────────────────────────────▼──────────────────┐  │
│  │          CUDA-Q QEC Runtime + NVQLink                 │  │
│  │   GH200 Grace Hopper ←─ RDMA/RoCE (<4μs) ─→ QPU     │  │
│  │              ConnectX-7 SmartNIC                       │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

##### 1. Ising Calibration 1：量子校准视觉语言模型

**动机与背景**：量子处理器校准依赖于解读实验数据图（校准图），这是量子硬件 bring-up 和重调校的核心环节。传统方法依赖人类专家逐图判读，效率低下且难以规模化。通用 VLM（如 GPT、Gemini、Claude）虽然具备图像理解能力，但在量子校准这一专业领域表现不佳。

**模型架构**：

- **基座模型**：Qwen3.5-35B-A3B（Mixture-of-Experts）
- **参数规模**：~35B 总参数，~3B 活跃参数/token
- **专家配置**：256 个专家，每 token 激活 8 个
- **架构类型**：集成视觉编码器 + MoE 语言模型的自回归文本生成

**训练方法论**：

采用两阶段监督微调（SFT）策略：

```python
# Ising Calibration 1 训练流程伪代码
# Phase 1: ICL-formatted SFT (In-Context Learning 格式)
phase1_data = load_icl_formatted_entries(n=23800)  # 23.8K ICL格式样本
model = load_pretrained("Qwen3.5-35B-A3B")

for epoch in range(num_epochs_phase1):
    for batch in phase1_data:
        # 每个样本包含: 示例校准图+问答对 → 目标校准图+问题
        images, context_qa, target_question = batch
        loss = model.forward(images, context_qa, target_question)
        optimizer.step(loss)

# Phase 2: Zero-shot-formatted SFT (零样本格式)
phase2_data = load_zeroshot_formatted_entries()
for epoch in range(num_epochs_phase2):
    for batch in phase2_data:
        # 直接: 校准图 + 问题 → 答案
        image, question, answer = batch
        loss = model.forward(image, question, answer)
        optimizer.step(loss)
```

> 💡 **关键发现**：零样本格式和 ICL 格式的微调分别提升不同能力——没有单一训练配方能同时改善所有任务，尤其是开放式分析任务。

**QCalEval 基准详情**：

| 问题类型 | Ising Calibration 1 | Qwen3.5-35B 基座 |
|---------|---------------------|-------------------|
| Q1 技术描述 | **87.8** | 86.8 |
| Q2 实验结论 | **67.1** | 39.9 |
| Q3 实验意义 | **64.7** | 45.7 |
| Q4 拟合质量评估 | **90.5** | 52.7 |
| Q5 参数提取 | **62.5** | 57.8 |
| Q6 实验成功判定 | **75.3** | 50.6 |
| **总体平均** | **74.7** | 55.5 |

> ⚠️ **注意**：评分由 GPT-5.4 和 Gemini-3.1-Pro 双评委平均得出。基准覆盖超导量子比特和中性原子两大主流量子硬件平台。

**Agentic 工作流**：Ising Calibration 1 可部署为量子校准 Agent，自动化 QPU bring-up 流程——输入实验工作流描述，Agent 调用 VLM 评估实验结果图，自主决策下一步校准操作。

##### 2. Ising Decoder SurfaceCode 1：3D CNN 预解码器

**动机与背景**：量子纠错（QEC）解码器需要同时满足三个约束：(1) 低延迟（微秒级），(2) 低逻辑错误率（LER），(3) 跨空间和时间可扩展以支持格手术（lattice surgery）操作。传统解码器如 PyMatching（基于最小权重完美匹配 MWPM）在精度和延迟之间存在权衡。此前没有机器学习预解码器能同时在这三个维度上取得突破。

**3D CNN 架构**：

核心创新是将量子纠错综合征（syndrome）建模为 **三维时空体积**，使用 3D 卷积网络直接处理：

```
输入张量: (B, 4, T, D, D)
  B = batch size
  4 = 通道数 (综合征类型)
  T = 时间步 (QEC 轮次)
  D = 码距 (空间维度)

┌─────────────────────────────────────────────────────────┐
│              3D CNN Pre-Decoder Architecture              │
│                                                          │
│  Input (B,4,T,D,D)                                       │
│      │                                                   │
│      ▼                                                   │
│  ┌──────────────────┐                                    │
│  │ Conv3D(4→128)    │  kernel=3×3×3, same-padding        │
│  │ + GELU + Dropout │                                    │
│  └────────┬─────────┘                                    │
│           │                                              │
│  ┌────────▼─────────┐                                    │
│  │ Conv3D(128→128)  │  × (L-2) layers                   │
│  │ + GELU + Dropout │  Fast: L=4, Accurate: L=6         │
│  └────────┬─────────┘                                    │
│           │                                              │
│  ┌────────▼─────────┐                                    │
│  │ Conv3D(128→4)    │  最终层，无 Dropout                 │
│  └────────┬─────────┘                                    │
│           │                                              │
│  Output (B,4,T,D,D) → 局部修正预测                        │
└─────────────────────────────────────────────────────────┘
```

**感受野公式**：

$$R = 1 + \sum_{i=1}^{L} (k_i - 1)$$

其中 \(L\) 为层数，\(k_i\) 为第 \(i\) 层卷积核大小。对于 kernel=3 的情况：
- Fast（4 层）：\(R = 1 + 4 \times 2 = 9\)
- Accurate（6 层）：\(R = 1 + 6 \times 2 = 13\)

> 💡 **设计直觉**：same-padding 保证空间和时间维度在所有层中保持不变，使得预解码器可以为每个综合征位置输出局部修正，然后传递给下游标准解码器（如 PyMatching）进行最终解码。这种 **预解码器 + 标准解码器** 的级联设计既利用了 CNN 的速度优势，又保留了 MWPM 的理论保证。

**模型对比**：

| 配置 | 层数 | 通道宽度 | 参数量 | 感受野 | 延迟提升 | 精度提升 |
|------|------|---------|--------|--------|---------|---------|
| Fast | 4 | 4→128→128→128→4 | ~912K | R=9 | **2.5×** vs PyMatching | **1.1×** |
| Accurate | 6 | 4→128(×5)→4 | ~1.79M | R=13 | **2.3×** vs PyMatching | **1.5×** |

*基准条件：d=13（码距），p=0.003（物理错误率），SI1000 去极化噪声模型*

**训练流程**：

```python
# Ising Decoder 训练框架伪代码
import cuquantum  # cuQuantum cuStabilizer 用于高效综合征采样
import torch

# Step 1: 使用 cuStabilizer 生成训练数据
noise_model = SI1000_Depolarizing(distance=13, p_phys=0.003)
syndromes, corrections = cuquantum.custabilizer.sample(
    noise_model, 
    num_samples=1_000_000,  # 大规模采样
    num_rounds=13           # 时间步 = 码距
)
# syndromes shape: (N, 4, T, D, D)
# corrections shape: (N, 4, T, D, D) — 局部 Pauli 修正标签

# Step 2: PyTorch 训练
model = IsingSurfaceCodeCNN(
    in_channels=4, hidden=128, 
    num_layers=4,  # Fast 版
    kernel_size=3, activation='gelu'
)

for epoch in range(num_epochs):
    for batch_syn, batch_corr in dataloader:
        pred = model(batch_syn)  # (B, 4, T, D, D)
        loss = F.binary_cross_entropy_with_logits(pred, batch_corr)
        optimizer.zero_grad()
        loss.backward()
        optimizer.step()

# Step 3: 量化 & 部署
quantized_model = quantize_fp16(model)
deploy_to_cuda_q_qec(quantized_model)  # 集成 CUDA-Q QEC 实时推理
```

> ⚠️ **关键**：cuQuantum cuStabilizer 是训练数据生成的核心加速器——它利用 GPU 并行化稳定子模拟，使得百万级综合征样本的生成从小时级降至分钟级，这是大规模训练 QEC 解码器的前提条件。

##### 3. NVQLink：GPU-QPU 微秒级耦合架构

实时 QEC 解码要求端到端延迟在量子比特退相干时间内完成。NVQLink 架构实现了 GPU 与 QPU 之间的超低延迟通信：

```
┌──────────────┐    RDMA/RoCE     ┌──────────────┐
│   GH200      │◄────────────────►│    QPU       │
│ Grace Hopper │    <4μs 平均     │ (量子处理器)  │
│              │    3.84μs 实测   │              │
│ ┌──────────┐ │                  │ ┌──────────┐ │
│ │GPU: H200 │ │                  │ │ 量子比特  │ │
│ │(解码推理) │ │                  │ │ + 控制    │ │
│ └──────────┘ │                  │ │ 电子学    │ │
│ ┌──────────┐ │                  │ └──────────┘ │
│ │ConnectX-7│ │                  │              │
│ │SmartNIC  │ │                  │              │
│ └──────────┘ │                  │              │
└──────────────┘                  └──────────────┘
```

**Quantinuum Helios 实证**：
- **编码方案**：Bring 码 qLDPC（量子低密度奇偶校验码），30 物理量子比特编码 8 逻辑量子比特
- **解码器**：BP+OSD（Belief Propagation + Ordered Statistics Decoding）
- **解码延迟**：中位 67μs
- **错误率改善**：5.4× 优于无纠错基线
- **意义**：首次在真实量子硬件上演示 GPU 加速的实时 QEC 解码闭环

##### 4. 与传统方法的对比

| 维度 | 传统方法 | NVIDIA Ising |
|------|---------|-------------|
| **校准** | 人工判读校准图 + 规则脚本 | VLM Agent 自动化判读与决策 |
| **解码精度** | PyMatching (MWPM) 作为金标准 | 3D CNN 预解码器 + PyMatching 级联，LER 降低 1.1-1.5× |
| **解码延迟** | PyMatching 基线 | 2.3-2.5× 加速 |
| **可扩展性** | 解码器需针对每种码手工设计 | 训练框架支持自定义噪声模型，一键训练 |
| **GPU-QPU 通信** | 传统 PCIe/网络，ms 级 | NVQLink RDMA，<4μs |

> 💡 **核心创新**：Ising 的关键突破不在于单一模型的性能，而在于构建了 **从数据生成（cuStabilizer）→ 模型训练（PyTorch）→ 实时部署（CUDA-Q QEC）→ 硬件集成（NVQLink）** 的完整技术栈，使量子计算研究者无需机器学习专业知识即可利用 AI 加速量子纠错。

#### 🧪 练习题
```yaml
question: "NVIDIA Ising Decoder SurfaceCode 1 的 3D CNN 预解码器为什么采用 same-padding 设计？"
options:
  - "为了减少模型参数量，降低计算开销"
  - "为了保持时空维度不变，使每个综合征位置都能输出局部修正，与下游标准解码器级联"
  - "为了增大感受野，捕获更远距离的量子比特关联"
  - "为了兼容不同码距的表面码，实现零样本泛化"
answer: 1
explain: "same-padding 保证输入输出的空间和时间维度一致，使预解码器能为每个综合征位置生成局部 Pauli 修正预测，这些修正随后传递给 PyMatching 等标准解码器进行最终解码，实现精度和速度的双重提升。"
```
