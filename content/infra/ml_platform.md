---
domain: infra
topic_id: ml_platform
topic_name: 机器学习平台
page_icon: ⚙️
page_title: 机器学习平台技术演进
page_subtitle: '{build_date} 版'
page_desc: 回顾从Parameter Server到万卡训练、从TFX到智能MLOps的技术演进，系统梳理机器学习平台从分布式训练到全生命周期治理的发展历程。
hero_pills:
- 🏷️ 训练平台 · 实验管理 · MLOps · 推理优化
count_pill: '{count} 个系统'
categories:
  training_platform:
    label: 训练平台
    color: '#22a06b'
  experiment_mgmt:
    label: 实验管理
    color: '#5b63d3'
  mlops_lifecycle:
    label: MLOps治理
    color: '#e8820c'
  inference_system:
    label: 推理系统
    color: '#9c5ec6'
---

## 领域综述

### 待补充：阶段性领域总结
请补充一篇纵观一段时间以来的总结性文档，建议使用 `!INCLUDE_RAW path/to/article.md` 引入人工筛选后的 Markdown。

## 最新进展综述

### 待补充：最近一个月最新动向
请补充最近一个月该领域最新动向的综述文档，建议使用 `!INCLUDE_RAW path/to/article.md` 引入人工筛选后的 Markdown。

## 算法演化关系

```yaml
nodes:
- id: ps
  x: 50
  y: 80
  category: training_platform
- id: tensorflow
  x: 150
  y: 80
  category: training_platform
- id: horovod
  x: 250
  y: 60
  category: training_platform
- id: ray
  x: 250
  y: 120
  category: training_platform
- id: pytorch
  x: 280
  y: 90
  category: training_platform
- id: gpipe
  x: 280
  y: 50
  category: training_platform
- id: megatron_lm
  x: 350
  y: 90
  category: training_platform
- id: pipedream
  x: 350
  y: 50
  category: training_platform
- id: deepspeed
  x: 450
  y: 90
  category: training_platform
- id: alpa
  x: 420
  y: 130
  category: training_platform
- id: colossal_ai
  x: 520
  y: 130
  category: training_platform
- id: megascale
  x: 550
  y: 90
  category: training_platform
- id: nnscaler
  x: 550
  y: 130
  category: training_platform
- id: axlearn
  x: 650
  y: 100
  category: training_platform
- id: protrain
  x: 650
  y: 80
  category: training_platform
- id: boost
  x: 650
  y: 60
  category: training_platform
- id: tessera
  x: 700
  y: 90
  category: training_platform
- id: mlflow
  x: 250
  y: 220
  category: experiment_mgmt
- id: optuna
  x: 350
  y: 210
  category: experiment_mgmt
- id: dvc
  x: 450
  y: 210
  category: experiment_mgmt
- id: wandb
  x: 450
  y: 230
  category: experiment_mgmt
- id: flashinfer_bench
  x: 650
  y: 210
  category: experiment_mgmt
- id: sagemaker_agent
  x: 650
  y: 230
  category: experiment_mgmt
- id: tfx
  x: 120
  y: 310
  category: mlops_lifecycle
- id: kubeflow
  x: 250
  y: 310
  category: mlops_lifecycle
- id: feast
  x: 350
  y: 310
  category: mlops_lifecycle
- id: tf_serving
  x: 120
  y: 400
  category: inference_system
- id: kserve
  x: 380
  y: 400
  category: inference_system
- id: vllm
  x: 520
  y: 400
  category: inference_system
- id: raidserve
  x: 650
  y: 380
  category: inference_system
- id: superinfer
  x: 650
  y: 400
  category: inference_system
- id: opentela
  x: 650
  y: 420
  category: inference_system
- id: djinn
  x: 700
  y: 400
  category: inference_system
edges:
- from: ps
  to: tensorflow
  label: 数据流图抽象
- from: tensorflow
  to: horovod
  label: Ring AllReduce
- from: tensorflow
  to: ray
  label: 通用计算引擎
- from: tensorflow
  to: gpipe
  label: 流水线并行
- from: pytorch
  to: megatron_lm
  label: 张量并行
- from: gpipe
  to: pipedream
  label: 异步流水线
- from: megatron_lm
  to: deepspeed
  label: 显存优化
- from: ray
  to: alpa
  label: 自动并行
- from: alpa
  to: colossal_ai
  label: 统一系统
- from: alpa
  to: nnscaler
  label: 约束引导
- from: deepspeed
  to: megascale
  label: 万卡扩展
- from: deepspeed
  to: protrain
  label: 内存管理
- from: pytorch
  to: axlearn
  label: 硬件无关
- from: megatron_lm
  to: boost
  label: 低秩优化
- from: megascale
  to: tessera
  label: MoE优化
- from: mlflow
  to: optuna
  label: 超参搜索
- from: mlflow
  to: dvc
  label: 数据版本
- from: mlflow
  to: wandb
  label: 云端协作
- from: mlflow
  to: flashinfer_bench
  label: LLM基准
- from: wandb
  to: sagemaker_agent
  label: 智能代理
- from: tfx
  to: kubeflow
  label: 云原生
- from: kubeflow
  to: feast
  label: 特征存储
- from: tf_serving
  to: kserve
  label: Serverless
- from: kserve
  to: vllm
  label: PagedAttention
- from: vllm
  to: raidserve
  label: 高可用
- from: vllm
  to: superinfer
  label: SLO感知
- from: vllm
  to: opentela
  label: 去中心化
- from: kserve
  to: djinn
  label: GPU解耦
milestones:
- ps
- deepspeed
- vllm
```

## 核心算法

### Parameter Server

```yaml
id: ps
num: 1
name: Parameter Server
full_name: 参数服务器 (Parameter Server)
year: '2014'
org: CMU/Baidu
parent: —
paper_url: https://proceedings.neurips.cc/paper/2014/hash/d5cfead94f5350c12c322b5b664544c1-Abstract.html
project_url: ''
category: training_platform
motivation: 提出异步分布式参数更新框架，奠定分布式ML基础
```

#### 📝 一句话总结
Parameter Server 的核心目标是：提出异步分布式参数更新框架，奠定分布式ML基础。

#### 🎯 核心要点
- 核心动机：提出异步分布式参数更新框架，奠定分布式ML基础
- 代表机构：CMU/Baidu

#### 🔬 深入细节
提出异步分布式参数更新框架，奠定分布式ML基础


### TensorFlow

```yaml
id: tensorflow
num: 2
name: TensorFlow
full_name: TensorFlow
year: '2016'
org: Google Brain
parent: ps
paper_url: https://www.usenix.org/conference/osdi16/technical-sessions/presentation/abadi
project_url: ''
category: training_platform
motivation: 基于数据流图的异构分布式系统，继承DistBelief
```

#### 📝 一句话总结
TensorFlow 的核心目标是：基于数据流图的异构分布式系统，继承DistBelief。

#### 🎯 核心要点
- 核心动机：基于数据流图的异构分布式系统，继承DistBelief
- 演化来源：继承或改进自 ps
- 代表机构：Google Brain

#### 🔬 深入细节
基于数据流图的异构分布式系统，继承DistBelief


### Horovod

```yaml
id: horovod
num: 3
name: Horovod
full_name: Horovod
year: '2018'
org: Uber
parent: tensorflow
paper_url: https://arxiv.org/abs/1802.05799
project_url: ''
category: training_platform
motivation: 引入Ring All-Reduce提升带宽利用率
```

#### 📝 一句话总结
Horovod 的核心目标是：引入Ring All-Reduce提升带宽利用率。

#### 🎯 核心要点
- 核心动机：引入Ring All-Reduce提升带宽利用率
- 演化来源：继承或改进自 tensorflow
- 代表机构：Uber

#### 🔬 深入细节
引入Ring All-Reduce提升带宽利用率


### Ray

```yaml
id: ray
num: 4
name: Ray
full_name: Ray分布式框架 (Ray)
year: '2018'
org: UC Berkeley
parent: —
paper_url: https://www.usenix.org/conference/osdi18/presentation/moritz
project_url: ''
category: training_platform
motivation: 统一的分布式执行引擎，支持动态任务调度
```

#### 📝 一句话总结
Ray 的核心目标是：统一的分布式执行引擎，支持动态任务调度。

#### 🎯 核心要点
- 核心动机：统一的分布式执行引擎，支持动态任务调度
- 代表机构：UC Berkeley

#### 🔬 深入细节
统一的分布式执行引擎，支持动态任务调度


### PyTorch

```yaml
id: pytorch
num: 5
name: PyTorch
full_name: PyTorch
year: '2019'
org: Meta FAIR
parent: —
paper_url: https://arxiv.org/abs/1912.01703
project_url: ''
category: training_platform
motivation: 命令式编程与动态图，提升科研灵活性
```

#### 📝 一句话总结
PyTorch 的核心目标是：命令式编程与动态图，提升科研灵活性。

#### 🎯 核心要点
- 核心动机：命令式编程与动态图，提升科研灵活性
- 代表机构：Meta FAIR

#### 🔬 深入细节
命令式编程与动态图，提升科研灵活性


### GPipe

```yaml
id: gpipe
num: 6
name: GPipe
full_name: 流水线并行 (GPipe)
year: '2019'
org: Google Brain
parent: tensorflow
paper_url: https://arxiv.org/abs/1811.06965
project_url: ''
category: training_platform
motivation: 通过微批次实现流水线并行，开创性工作
```

#### 📝 一句话总结
GPipe 的核心目标是：通过微批次实现流水线并行，开创性工作。

#### 🎯 核心要点
- 核心动机：通过微批次实现流水线并行，开创性工作
- 演化来源：继承或改进自 tensorflow
- 代表机构：Google Brain

#### 🔬 深入细节
通过微批次实现流水线并行，开创性工作


### Megatron-LM

```yaml
id: megatron_lm
num: 7
name: Megatron-LM
full_name: Megatron-LM
year: '2019'
org: NVIDIA
parent: pytorch
paper_url: https://arxiv.org/abs/1909.08053
project_url: ''
category: training_platform
motivation: 高效张量并行支持千亿参数训练
```

#### 📝 一句话总结
Megatron-LM 的核心目标是：高效张量并行支持千亿参数训练。

#### 🎯 核心要点
- 核心动机：高效张量并行支持千亿参数训练
- 演化来源：继承或改进自 pytorch
- 代表机构：NVIDIA

#### 🔬 深入细节
高效张量并行支持千亿参数训练


### PipeDream

```yaml
id: pipedream
num: 8
name: PipeDream
full_name: PipeDream
year: '2019'
org: Microsoft/CMU
parent: gpipe
paper_url: https://dl.acm.org/doi/10.1145/3341301.3359646
project_url: ''
category: training_platform
motivation: 异步流水线减少bubble开销
```

#### 📝 一句话总结
PipeDream 的核心目标是：异步流水线减少bubble开销。

#### 🎯 核心要点
- 核心动机：异步流水线减少bubble开销
- 演化来源：继承或改进自 gpipe
- 代表机构：Microsoft/CMU

#### 🔬 深入细节
异步流水线减少bubble开销


### DeepSpeed ZeRO

```yaml
id: deepspeed
num: 9
name: DeepSpeed ZeRO
full_name: DeepSpeed ZeRO
year: '2020'
org: Microsoft
parent: megatron_lm
paper_url: https://arxiv.org/abs/1910.02054
project_url: ''
category: training_platform
motivation: 消除冗余状态突破显存限制
```

#### 📝 一句话总结
ZeRO（Zero Redundancy Optimizer）通过将优化器状态、梯度和参数在数据并行进程间分区而非复制，消除了数据并行训练中的内存冗余，在不牺牲通信效率的前提下实现了与设备数量成线性比例的显存节省，使得在 1024 块 GPU 上训练万亿参数模型成为可能。

#### 🎯 核心要点
- **三阶段渐进式内存优化（ZeRO-DP）**：Stage 1 分区优化器状态（4× 节省）、Stage 2 叠加分区梯度（8× 节省）、Stage 3 叠加分区参数（线性于 \(N_d\) 倍节省）
- **通信量几乎不增加**：Stage 1+2 通信量与标准数据并行相同（\(2\Psi\)）；Stage 3 仅增加 50%（\(3\Psi\)）
- **混合精度训练内存分析**：系统量化了 Adam + fp16 训练中优化器状态（fp32 参数副本 + 动量 + 方差 = \(12\Psi\) 字节）占主导的内存消耗
- **ZeRO-R 优化残余内存**：包括激活值分区（\(P_a\)）、固定大小临时缓冲区（\(C_B\)）和主动内存碎片整理（\(M_D\)）
- **超线性加速**：100B 参数模型在 400 GPU 上实现超线性加速，达到 15 PFlops 吞吐
- **无需模型并行即可训练 13B 参数模型**，降低了大模型训练的工程门槛
- **Turing-NLG 17B**：利用 ZeRO 训练了当时最大的语言模型，刷新准确率记录

#### 🔬 深入细节
![ZeRO-DP 三阶段内存对比](https://ar5iv.labs.arxiv.org/html/1910.02054/assets/x1.png)
*图：以 7.5B 参数模型、64 路数据并行为例，展示基线 DP 与 ZeRO 三个阶段（\(P_{os}\)、\(P_{os+g}\)、\(P_{os+g+p}\)）的显存消耗对比。基线需要 120GB/GPU，ZeRO Stage 3 仅需 1.9GB/GPU。*

```python
# ZeRO-DP 三阶段训练伪代码
# 假设 Nd 个数据并行进程，模型参数 Ψ，每个进程负责第 rank 个分区

# ===== Stage 1: 优化器状态分区 (P_os) =====
# 每个进程仅持有 1/Nd 的优化器状态（fp32 参数副本 + momentum + variance）
for step in training_steps:
    loss = forward(model, micro_batch)        # 前向：所有进程持有完整参数
    loss.backward()                           # 反向：计算完整梯度
    all_reduce(gradients)                     # 全规约梯度（与标准 DP 相同）
    # 每个进程仅更新自己负责的 1/Nd 参数分区
    optimizer.step(params[rank_start:rank_end])
    all_gather(params)                        # 收集更新后的完整参数

# ===== Stage 2: + 梯度分区 (P_os+g) =====
for step in training_steps:
    loss = forward(model, micro_batch)
    # 反向传播中，每层梯度就绪后立即 reduce-scatter（而非 all-reduce）
    for layer in reversed(model.layers):
        grad = layer.backward()
        reduce_scatter(grad)                  # 每个进程仅保留自己分区的已规约梯度
        # 非本分区的梯度内存立即释放
    optimizer.step(params[rank_start:rank_end])
    all_gather(params)

# ===== Stage 3: + 参数分区 (P_os+g+p) =====
for step in training_steps:
    # 前向：按需广播参数
    for layer in model.layers:
        all_gather(layer.params)              # 从各进程收集该层完整参数
        output = layer.forward(input)
        # 非本分区的参数用完即释放
    # 反向：同样按需广播参数
    for layer in reversed(model.layers):
        all_gather(layer.params)              # 再次收集完整参数用于梯度计算
        grad = layer.backward()
        reduce_scatter(grad)
    optimizer.step(params[rank_start:rank_end])
    # 无需最终 all_gather——参数始终按需获取
```

##### 动机与背景：数据并行的内存瓶颈

训练超大模型的核心挑战在于**单设备显存不足**。现有解决方案主要有两类：

1. **模型并行（MP）**：将模型按层或按张量切分到多个设备。虽然能减少单卡显存，但带来大量跨设备通信，且实现复杂、通用性差。Megatron-LM 的张量并行在超过单节点（通常 8 GPU）后效率急剧下降。
2. **数据并行（DP）**：每个设备持有完整模型副本，仅切分数据。通信效率高，但**每张卡都冗余存储了完整的模型状态**。

论文首先对混合精度训练（fp16 参数 + fp32 Adam 优化器）的内存消耗进行了精确量化。对于参数量为 \(\Psi\) 的模型：

$$\text{总内存} = \underbrace{2\Psi}_{\text{fp16 参数}} + \underbrace{2\Psi}_{\text{fp16 梯度}} + \underbrace{4\Psi + 4\Psi + 4\Psi}_{K\Psi = 12\Psi \text{ (fp32 参数副本 + 动量 + 方差)}} = 16\Psi \text{ 字节}$$

> 💡 **关键洞察**：优化器状态占据了 75% 的显存（\(12\Psi / 16\Psi\)），而在标准数据并行中这些状态在每个 GPU 上完全冗余复制。这正是 ZeRO 的突破口。

以 GPT-2（1.5B 参数）为例，仅模型状态就需要 24GB，已超出当时主流 GPU（16–32GB）的容量。而 1.4B 参数是标准 DP 在 32GB GPU 上的极限。

##### 核心机制：ZeRO-DP 三阶段分区

ZeRO-DP 的核心思想极为简洁：**既然数据并行中每个进程最终只需要更新 \(1/N_d\) 的参数，那么每个进程也只需要存储对应的 \(1/N_d\) 优化器状态和梯度**。

**Stage 1 — 优化器状态分区（\(P_{os}\)）**：将 Adam 的 fp32 参数副本、一阶动量和二阶方差均匀分成 \(N_d\) 份，第 \(i\) 个进程仅存储和更新第 \(i\) 份。前向和反向仍使用完整参数和梯度（通过标准 all-reduce 同步梯度），更新后通过 all-gather 收集完整参数。内存从 \(4\Psi + 12\Psi = 16\Psi\) 降至 \(4\Psi + 12\Psi/N_d\)，当 \(N_d\) 较大时约为 \(4\Psi\)，实现 **4× 节省**。通信量不变，仍为 \(2\Psi\)（all-reduce = reduce-scatter + all-gather）。

**Stage 2 — 梯度分区（\(P_{os+g}\)）**：既然每个进程只更新 \(1/N_d\) 的参数，那么它只需要对应分区的规约后梯度。因此将 all-reduce 替换为 **reduce-scatter**：反向传播中每层梯度就绪后，立即通过 reduce-scatter 将不同分区的梯度规约到对应进程，非本分区的梯度内存随即释放。内存进一步降至 \(2\Psi/N_d + 12\Psi/N_d\)（加上 \(2\Psi\) 的 fp16 参数），实现 **8× 节省**。通信量仍为 \(2\Psi\)（reduce-scatter \(\Psi\) + all-gather \(\Psi\)），与标准 DP 完全相同。

> ⚠️ **注意**：实现中使用固定大小的桶（bucket）来批量执行 reduce-scatter，在梯度就绪后先写入桶缓冲区，桶满后一次性通信，以提高带宽利用率。

**Stage 3 — 参数分区（\(P_{os+g+p}\)）**：每个进程仅存储 \(1/N_d\) 的 fp16 参数。前向和反向传播中，当需要某一层的完整参数时，通过 all-gather 从各进程临时收集，计算完成后立即丢弃非本分区的参数。总内存降至 \(16\Psi/N_d\)，**与 \(N_d\) 成线性比例**。通信量增加到 \(3\Psi\)（前向 all-gather \(\Psi\) + 反向 all-gather \(\Psi\) + 反向 reduce-scatter \(\Psi\)），相比基线的 \(2\Psi\) 仅增加 **50%**。

$$\text{Stage 3 通信量} = \underbrace{\Psi}_{\text{前向 all-gather}} + \underbrace{\Psi}_{\text{反向 all-gather}} + \underbrace{\Psi}_{\text{反向 reduce-scatter}} = 3\Psi = 1.5 \times 2\Psi$$

##### ZeRO-R：残余内存优化

在 ZeRO-DP 大幅削减模型状态内存后，激活值、临时缓冲区和内存碎片成为次要瓶颈。ZeRO-R 提供三项互补优化：

1. **激活值分区（\(P_a\)）**：结合激活检查点（activation checkpointing）技术，将检查点激活值在数据并行组间分区存储，需要时通过 all-gather 恢复。对于超大模型，还可将激活值卸载到 CPU 内存。
2. **固定大小缓冲区（\(C_B\)）**：标准实现中 all-reduce 等操作会将所有梯度融合为一个巨大的扁平缓冲区（如 1.5B 参数模型的 fp32 缓冲区需 6GB）。ZeRO-R 使用固定大小的缓冲区，在保证通信效率的同时避免内存爆炸。
3. **内存碎片整理（\(M_D\)）**：训练过程中频繁的内存分配/释放导致碎片化，即使总空闲内存充足也可能因缺乏连续空间而 OOM（观察到 30% 以上可用内存无法使用的极端情况）。ZeRO-R 通过预分配连续内存块并主动管理张量生命周期来缓解碎片问题。

##### 与传统方法的对比

| 维度 | 标准数据并行 | 模型并行 (Megatron) | ZeRO-DP |
|------|-------------|-------------------|---------|
| 单卡内存 | \(16\Psi\)（完全冗余） | \(\sim 16\Psi/N_m\) | \(16\Psi/N_d\)（Stage 3） |
| 通信量 | \(2\Psi\) | \(\mathcal{O}(\Psi \cdot \text{layers})\) | \(2\Psi\) ~ \(3\Psi\) |
| 可扩展性 | 受单卡内存限制 | 受节点内带宽限制 | 线性扩展至千卡 |
| 实现复杂度 | 低 | 高（需改模型代码） | 低（优化器层面） |
| 最大模型 | ~1.4B (32GB GPU) | ~20B (跨节点效率低) | 万亿级 |

> 💡 **关键优势**：ZeRO 与模型并行正交，可以组合使用。实验中 ZeRO + Megatron 张量并行在 400 GPU 上训练 100B 参数模型达到 15 PFlops，实现超线性加速（因为更大的分区使每卡 batch 更适配 GPU 计算特性）。

#### 🧪 练习题
```yaml
question: "ZeRO-DP Stage 2 (P_os+g) 将标准数据并行的 all-reduce 操作替换为了什么？"
options:
  - "all-gather + broadcast"
  - "reduce-scatter + all-gather"
  - "仅 reduce-scatter"
  - "ring all-reduce + reduce"
answer: 1
explain: "Stage 2 在反向传播中用 reduce-scatter 替代 all-reduce 的前半部分，使每个进程仅保留自己分区的规约梯度；更新后再通过 all-gather 收集完整参数。总通信量 = reduce-scatter(Ψ) + all-gather(Ψ) = 2Ψ，与标准 all-reduce 相同。"
```

### Alpa

```yaml
id: alpa
num: 10
name: Alpa
full_name: Alpa自动并行 (Alpa)
year: '2022'
org: UC Berkeley
parent: ray
paper_url: https://arxiv.org/abs/2201.12023
project_url: ''
category: training_platform
motivation: 自动生成算子间与算子内并行策略
```

#### 📝 一句话总结
Alpa 的核心目标是：自动生成算子间与算子内并行策略。

#### 🎯 核心要点
- 核心动机：自动生成算子间与算子内并行策略
- 演化来源：继承或改进自 ray
- 代表机构：UC Berkeley

#### 🔬 深入细节
自动生成算子间与算子内并行策略


### Colossal-AI

```yaml
id: colossal_ai
num: 11
name: Colossal-AI
full_name: Colossal-AI
year: '2023'
org: HPC-AI Tech
parent: alpa
paper_url: https://arxiv.org/abs/2110.14883
project_url: ''
category: training_platform
motivation: 统一的大规模并行训练系统
```

#### 📝 一句话总结
Colossal-AI 的核心目标是：统一的大规模并行训练系统。

#### 🎯 核心要点
- 核心动机：统一的大规模并行训练系统
- 演化来源：继承或改进自 alpa
- 代表机构：HPC-AI Tech

#### 🔬 深入细节
统一的大规模并行训练系统


### MegaScale

```yaml
id: megascale
num: 12
name: MegaScale
full_name: MegaScale万卡训练 (MegaScale)
year: '2024'
org: ByteDance
parent: deepspeed
paper_url: https://arxiv.org/abs/2402.15627
project_url: ''
category: training_platform
motivation: 万卡规模训练的容错与通信优化
```

#### 📝 一句话总结
MegaScale 的核心目标是：万卡规模训练的容错与通信优化。

#### 🎯 核心要点
- 核心动机：万卡规模训练的容错与通信优化
- 演化来源：继承或改进自 deepspeed
- 代表机构：ByteDance

#### 🔬 深入细节
万卡规模训练的容错与通信优化


### nnScaler

```yaml
id: nnscaler
num: 13
name: nnScaler
full_name: nnScaler
year: '2024'
org: Microsoft
parent: alpa
paper_url: https://arxiv.org/abs/2312.05009
project_url: ''
category: training_platform
motivation: 约束引导的并行策略生成
```

#### 📝 一句话总结
nnScaler 的核心目标是：约束引导的并行策略生成。

#### 🎯 核心要点
- 核心动机：约束引导的并行策略生成
- 演化来源：继承或改进自 alpa
- 代表机构：Microsoft

#### 🔬 深入细节
约束引导的并行策略生成


### AXLearn

```yaml
id: axlearn
num: 14
name: AXLearn
full_name: AXLearn
year: '2026'
org: Apple
parent: pytorch
paper_url: https://mlsys.org/Conferences/2026/Schedule?type=Poster
project_url: ''
category: training_platform
motivation: 模块化、硬件无关训练平台
```

#### 📝 一句话总结
AXLearn 的核心目标是：模块化、硬件无关训练平台。

#### 🎯 核心要点
- 核心动机：模块化、硬件无关训练平台
- 演化来源：继承或改进自 pytorch
- 代表机构：Apple

#### 🔬 深入细节
模块化、硬件无关训练平台


### ProTrain

```yaml
id: protrain
num: 15
name: ProTrain
full_name: ProTrain
year: '2026'
org: MLSys Community
parent: deepspeed
paper_url: https://mlsys.org/Conferences/2026/Schedule?type=Poster
project_url: ''
category: training_platform
motivation: 自动内存管理机制，动态张量生命周期分析
```

#### 📝 一句话总结
ProTrain 提出了一套自适应内存管理系统，通过 Chunk 级模型状态管理、Block 级激活管理和内存感知运行时 Profiler 三大组件的协同，自动搜索最优的 offloading/checkpointing/swapping 配置，无需用户手动调参即可在有限 GPU 内存下实现 1.43×–2.71× 的训练吞吐量提升。

#### 🎯 核心要点
- **Chunk-Based Model State Management**：将模型状态（参数、梯度、优化器状态）组织为统一大小的 Chunk，支持 5 种关键操作（all-gather、reduce-scatter、upload、offload、prefetch），并引入 persistent chunk（常驻 GPU）和 chunk buffer 减少动态内存分配
- **Block-Wise Activation Management**：以 Transformer Block 为粒度管理激活，每个 Block 独立选择 swapping / checkpointing / 不处理三种策略，采用交错式 swapping+checkpointing 布局隐藏通信开销
- **Memory-Aware Runtime Profiler**：采用 drop-and-regenerate 方法在有限内存下完成全模型 profiling，通过 hook 机制推断不可 hook 算子的内存和时间开销
- **Adaptive Memory Management**：包含 Chunk-Aware Runtime Estimator、Peak Memory Usage Estimator 和 Optimal Configuration Search 三个子模块，自动搜索最优配置
- **核心公式**：\(T_{\text{Iteration}} = T_{\text{FWD}} + \max\{T_{\text{BWD}} + T_{\text{GPU\_OPTIM}},\; T_{\text{CPU\_OPTIM}}\}\)
- **实验结果**：在 RTX 3090 上训练模型规模可达 DeepSpeed 的 2×，吞吐量平均提升 1.77×–2.71×；在 A100 上模型规模可达 FSDP 的 7×，吞吐量提升 1.43×–2.25×

#### 🔬 深入细节
##### 系统架构总览

![ProTrain Chunk-Based Model State Management](https://arxiv.org/html/2406.08334v2/x1.png)
*图 1：Chunk-Based Model State Management 的五种关键操作示意。每个 Chunk 在分布式训练中被均匀分片到各 GPU，通过 all-gather 聚合、reduce-scatter 归约、upload/offload 在 CPU-GPU 间迁移。*

![ProTrain Block-Wise Activation Management](https://arxiv.org/html/2406.08334v2/x2.png)
*图 2：Block-Wise Activation Management 布局及内存使用趋势。展示了 swapping block、checkpointing block 和普通 block 的交错排布策略。*

##### 算法伪代码

```python
# ProTrain 自适应内存管理搜索伪代码
def protrain_adaptive_search(model, hardware_info):
    # Step 1: Memory-Aware Runtime Profiling
    profiler = MemoryAwareProfiler(model)
    profiler.drop_and_regenerate_profile()  # 逐层 profile，丢弃非当前层数据
    op_times, op_memory, peak_memory = profiler.collect()

    # Step 2: 枚举配置空间
    best_config, best_time = None, float('inf')
    for n_persistent in range(0, max_persistent + 1):       # persistent chunk 数量
        for n_chunk_buf in range(1, max_buf + 1):            # chunk buffer 数量
            for swap_interval in candidate_intervals:         # activation swap 间隔
                # Step 3: Chunk-Aware Runtime Estimation
                T_fwd = estimate_forward(op_times, n_persistent, n_chunk_buf)
                T_bwd = estimate_backward(op_times, n_persistent, swap_interval)
                T_gpu_optim = estimate_gpu_optim(n_persistent)
                T_cpu_optim = estimate_cpu_optim(n_persistent, n_chunk_buf)
                T_iter = T_fwd + max(T_bwd + T_gpu_optim, T_cpu_optim)

                # Step 4: Peak Memory Usage Estimation
                peak_mem = estimate_peak_memory(
                    n_persistent, n_chunk_buf, swap_interval,
                    op_memory, peak_memory
                )

                # Step 5: 选择满足内存约束的最快配置
                if peak_mem <= hardware_info.gpu_memory and T_iter < best_time:
                    best_config = (n_persistent, n_chunk_buf, swap_interval)
                    best_time = T_iter

    return best_config

# ProTrain 单次迭代训练流程
def protrain_train_step(model, data, config):
    n_persistent, n_chunk_buf, swap_interval = config

    # Forward: 逐 chunk prefetch + 计算，activation 按策略处理
    for block_id, chunk in enumerate(model.chunks):
        prefetch_next_chunk(block_id + 1)           # ❶ 异步预取下一个 chunk
        all_gather(chunk)                            # ❷ 聚合完整参数
        activations[block_id] = forward(chunk, data)
        if is_swap_block(block_id, swap_interval):
            async_offload_activation(activations[block_id])  # swap out
        elif is_ckpt_block(block_id, swap_interval):
            save_input_only(activations[block_id])           # checkpoint

    # Backward: 逆序处理，recompute/swap-in 激活
    for block_id in reversed(range(len(model.chunks))):
        chunk = model.chunks[block_id]
        all_gather(chunk)                            # ❷ 重新聚合参数
        if is_swap_block(block_id, swap_interval):
            async_prefetch_activation(block_id)      # swap in
        elif is_ckpt_block(block_id, swap_interval):
            recompute_activation(block_id)           # 重计算
        grads = backward(chunk, activations[block_id])
        reduce_scatter(chunk)                        # ❸ 梯度归约
        async_offload_gradients(chunk)               # ❹ 梯度异步下传 CPU

    # Optimizer: GPU 更新 persistent chunks，CPU 更新其余
    gpu_optim_step(persistent_chunks)                # ❺ GPU 上更新
    cpu_optim_step(non_persistent_chunks)            # CPU 并行更新（与 BWD 重叠）
```

##### 方法细节深入解析

**1. 动机与背景：为什么需要自适应内存管理？**

LLM 训练的内存消耗主要来自两部分：**模型状态**（参数 + 梯度 + 优化器状态，每个参数约需 16× 内存）和**激活**（随 batch size 和模型深度线性增长）。现有框架如 DeepSpeed、FSDP 提供的内存管理存在两个关键缺陷：

1. **粒度过粗**：只支持 ZeRO-2/ZeRO-3 的二选一、offloading 的全开/全关、gradient checkpointing 的全部/不用，无法针对不同 block 做差异化处理
2. **依赖手动配置**：用户需要手动选择 ZeRO stage、offloading 目标（CPU/NVMe）、各种阈值参数，配置不当会导致 OOM 或性能低下

> 💡 **关键洞察**：不同的 Transformer block 在内存压力和计算特性上是相似的，但整体的内存-计算-IO 平衡点取决于模型规模、硬件配置和 batch size 的组合。ProTrain 的核心思想是将这个多维搜索问题自动化。

**2. Chunk-Based Model State Management：统一粒度的模型状态管理**

ProTrain 将所有模型状态组织为**统一大小的 Chunk**，每个 Chunk 通常对应一个 Transformer Block 的全部参数。这种设计带来三个优势：

- **带宽效率**：大块连续内存的传输比零散小张量更高效，充分利用 PCIe/NVLink 带宽
- **内存可预测性**：统一大小使得内存占用可精确计算，为自适应搜索提供基础
- **减少碎片**：通过 chunk buffer 机制复用内存，避免频繁的 malloc/free

ProTrain 引入两个关键概念：

- **Persistent Chunk**：常驻 GPU 内存的 chunk，无需 offload/upload，适用于内存充裕时保留高频访问的参数
- **Chunk Buffer**：GPU 上的临时缓冲区，用于存放从 CPU 上传的 chunk 数据，数量决定了 prefetch 的并行度

Chunk 按**运行时执行顺序**（而非初始化顺序）排列，减少因内存不足导致的反复加载卸载。

**3. Block-Wise Activation Management：交错式激活管理**

ProTrain 对每个 Transformer Block 的激活独立选择三种策略之一：

| 策略 | 内存开销 | 计算开销 | IO 开销 |
|------|---------|---------|---------|
| **Neither**（保留） | 高（全部激活驻留 GPU） | 无 | 无 |
| **Checkpointing**（重计算） | 低（仅保存 block 输入） | 高（backward 时重算 forward） | 无 |
| **Swapping**（换出） | 低（激活移至 CPU） | 无 | 高（需要 swap-out/swap-in） |

> ⚠️ **注意**：单纯使用 swapping 会因 PCIe 带宽瓶颈导致性能下降。ProTrain 的关键创新是**交错式布局**：典型配置为 1 个 swap block 后跟若干个 checkpoint block，swap 间隔精心选择使得 swap-out 的 IO 时间恰好被后续 checkpoint block 的计算时间覆盖。

具体来说，swapping interval \(I\) 的选择满足：

$$T_{\text{swap-out}}(1\text{ block}) \leq I \times T_{\text{compute}}(1\text{ block})$$

这确保了 swap 操作完全被计算隐藏，不引入额外延迟。在 backward 阶段，先处理 neither block（释放内存），再处理 checkpoint 和 swap block，形成内存使用的"先降后升"曲线，避免峰值溢出。

**4. Memory-Aware Runtime Profiler：精确的运行时感知**

传统 profiling 方法存在两个问题：
- **静态分析**低估实际内存需求（忽略临时缓冲区）
- **逐层 profiling**无法捕获不可 hook 算子的开销

ProTrain 的 **drop-and-regenerate** 方法解决了大模型 profiling 的内存限制：在 profiling 每一层时，丢弃其他层的数据（参数、梯度、激活），仅保留当前层所需数据。通过在每个可 hook 算子前后注册 hook，监控内存变化和峰值，推断不可 hook 算子的内存和时间开销。

Profiler 还收集硬件指标：内存传输带宽、集合通信延迟（在隔离和重叠场景下分别测量），为 Runtime Estimator 提供准确的硬件参数。

**5. Adaptive Memory Management：自动配置搜索**

搜索空间由三个维度定义：
- \(n_p\)：persistent chunk 数量（0 到总 chunk 数）
- \(n_b\)：chunk buffer 数量（决定 prefetch 并行度）
- \(I\)：activation swapping interval

对于每个候选配置，ProTrain 通过以下公式估算单次迭代时间：

$$T_{\text{Iteration}} = T_{\text{FWD}} + \max\{T_{\text{BWD}} + T_{\text{GPU\_OPTIM}},\; T_{\text{CPU\_OPTIM}}\}$$

其中：
- \(T_{\text{FWD}}\) 和 \(T_{\text{BWD}}\) 通过逐 chunk 聚合算子时间 + 通信时间（取 compute-bound 和 communication-bound 中的较大值）得到
- \(T_{\text{GPU\_OPTIM}}\) 为 persistent chunk 使用 FusedAdam 的更新时间
- \(T_{\text{CPU\_OPTIM}}\) 为非 persistent chunk 在 CPU 上的更新时间，与 backward 计算并行

Peak Memory Estimator 结合 profiler 数据和 chunk 配置，精确预测峰值内存。最终选择满足内存约束且迭代时间最短的配置。

**6. 与现有方法的对比**

| 特性 | DeepSpeed | FSDP | Colossal-AI | **ProTrain** |
|------|-----------|------|-------------|-------------|
| 内存管理粒度 | 全局（ZeRO stage） | 全局 | Chunk 级 | **Chunk + Block 级** |
| Offloading 控制 | 全开/全关 | 全开/全关 | 用户指定比例 | **自动决定** |
| Checkpointing | 全部/不用 | 全部/不用 | 全部/不用 | **逐 Block 选择** |
| Activation Swapping | 不支持 | 不支持 | 不支持 | **交错式 Swapping** |
| 用户配置需求 | 高（多参数） | 中 | 中（需指定比例） | **零配置** |
| 最大模型规模（4×RTX3090） | 15B | 15B | 25B | **30B** |

#### 🧪 练习题
```yaml
question: "ProTrain 的 Block-Wise Activation Management 中，交错式 swapping+checkpointing 策略的核心设计目的是什么？"
options:
  - "通过增加 checkpointing block 数量来最大化内存节省"
  - "让 swap-out 的 IO 时间被后续 checkpoint block 的重计算时间覆盖，从而隐藏通信开销"
  - "减少 backward 阶段的重计算量以加速训练"
  - "确保所有 block 的激活都被换出到 CPU 以释放 GPU 内存"
answer: 1
explain: "交错式布局的关键在于 swap interval 的选择使得 swap-out 的 IO 时间恰好被后续若干个 checkpoint block 的计算时间覆盖，实现通信与计算的重叠，在节省内存的同时不引入额外延迟。"
```

### BOOST

```yaml
id: boost
num: 16
name: BOOST
full_name: BOOST
year: '2026'
org: MLSys Community
parent: megatron_lm
paper_url: https://mlsys.org/Conferences/2026/Schedule?type=Poster
project_url: ''
category: training_platform
motivation: 针对低秩大模型训练的瓶颈优化框架
```

#### 📝 一句话总结
BOOST 的核心目标是：针对低秩大模型训练的瓶颈优化框架。

#### 🎯 核心要点
- 核心动机：针对低秩大模型训练的瓶颈优化框架
- 演化来源：继承或改进自 megatron_lm
- 代表机构：MLSys Community

#### 🔬 深入细节
针对低秩大模型训练的瓶颈优化框架


### Tessera

```yaml
id: tessera
num: 17
name: Tessera
full_name: Tessera
year: '2026'
org: OSDI Community
parent: megascale
paper_url: https://www.usenix.org/conference/osdi26/technical-sessions
project_url: ''
category: training_platform
motivation: 整体流水线并行框架，解决万亿参数MoE训练
```

#### 📝 一句话总结
Tessera 的核心目标是：整体流水线并行框架，解决万亿参数MoE训练。

#### 🎯 核心要点
- 核心动机：整体流水线并行框架，解决万亿参数MoE训练
- 演化来源：继承或改进自 megascale
- 代表机构：OSDI Community

#### 🔬 深入细节
整体流水线并行框架，解决万亿参数MoE训练


### MLflow

```yaml
id: mlflow
num: 18
name: MLflow
full_name: MLflow
year: '2018'
org: Databricks
parent: —
paper_url: https://www.mlflow.org/
project_url: ''
category: experiment_mgmt
motivation: 定义实验追踪、项目打包与模型注册标准接口
```

#### 📝 一句话总结
MLflow 提出了一个由 Tracking、Projects 和 Models 三大组件构成的开放平台，通过统一的 API 和格式规范解决机器学习生命周期中实验追踪困难、工作流不可复现、模型部署碎片化三大核心痛点，成为业界最广泛采用的 ML 平台标准接口。

#### 🎯 核心要点
- **三大组件架构**：MLflow Tracking（实验记录）、MLflow Projects（可复现打包）、MLflow Models（多环境部署），各组件可独立使用也可组合
- **MLflow Tracking**：提供 API 和 UI，自动记录实验的参数（parameters）、指标（metrics）、代码版本、数据文件和产出物（artifacts），支持任意 ML 库
- **MLflow Projects**：基于约定的目录结构 + `MLproject` 描述文件 + Conda 环境，实现代码打包与可复现执行，支持本地/远程/云端多种运行后端
- **MLflow Models**：引入 **flavor** 概念，同一模型可以同时导出为多种格式（如 `python_function`、`tensorflow`、`sklearn`），部署工具只需理解对应 flavor 即可
- **开放设计理念**：不绑定特定 ML 库、语言或基础设施，通过 REST API 和文件格式约定实现跨平台互操作
- **四大 ML 生命周期挑战**：多种工具难追踪、结果难复现、模型难部署、缺乏中心化管理
- **实际应用验证**：发布 4 个月内被超过 200 家公司采用，GitHub 获得 2800+ stars

#### 🔬 深入细节
![MLflow 平台架构概览](https://mlflow.org/img/hero.png)
*图：MLflow 平台整体架构，涵盖实验追踪、项目管理和模型部署三大核心模块*

##### 核心 API 使用示例

```python
# MLflow Tracking API 示例
import mlflow

# 开始一次实验运行
with mlflow.start_run():
    # 记录超参数
    mlflow.log_param("learning_rate", 0.01)
    mlflow.log_param("num_layers", 3)
    
    # 训练过程中记录指标
    for epoch in range(100):
        loss = train_one_epoch(model, data)
        mlflow.log_metric("loss", loss, step=epoch)
    
    # 保存模型产出物
    mlflow.sklearn.log_model(model, "model")
    mlflow.log_artifact("output/feature_importance.png")
```

```yaml
# MLproject 文件示例 —— 定义可复现的项目入口
name: My ML Project
conda_env: conda.yaml

entry_points:
  main:
    parameters:
      learning_rate: {type: float, default: 0.01}
      batch_size: {type: int, default: 64}
    command: "python train.py --lr {learning_rate} --batch {batch_size}"
  
  validate:
    parameters:
      model_path: path
    command: "python validate.py --model {model_path}"
```

```python
# MLflow Models —— 多 flavor 模型保存与加载
import mlflow.pyfunc
import mlflow.tensorflow

# 保存时同时注册多种 flavor
mlflow.tensorflow.log_model(tf_model, "model")
# 自动生成 MLmodel 描述文件，包含:
# flavors:
#   python_function:
#     loader_module: mlflow.tensorflow
#   tensorflow:
#     saved_model_dir: ...

# 部署时按需选择 flavor
model = mlflow.pyfunc.load_model("runs:/abc123/model")  # 通用 Python 接口
prediction = model.predict(input_df)
```

##### 动机与背景

机器学习的生命周期远比传统软件开发复杂。论文作者 Matei Zaharia 等人（Databricks 团队）在与数百家企业的合作中识别出四大核心挑战：

1. **工具繁多，实验难以追踪**：数据科学家需要在众多 ML 库（TensorFlow、PyTorch、scikit-learn 等）、数据处理框架和特征工程工具之间切换，每种工具有不同的接口和配置方式，导致实验参数、结果和中间产物散落各处，难以系统化管理和对比。

2. **结果不可复现**：即使拿到同事的代码，由于缺乏对运行环境（库版本、系统依赖、数据版本）的完整记录，往往无法复现其实验结果。这在团队协作和模型审计中造成严重障碍。

3. **模型部署路径碎片化**：从研究到生产的"最后一公里"极为困难——每个 ML 库输出的模型格式不同，部署目标（REST API、批处理、边缘设备、Spark）各异，导致大量重复的集成工作。

4. **缺乏中心化生命周期管理**：没有统一的平台来管理数据准备、模型训练、部署和监控的完整流程，各阶段之间的衔接依赖临时脚本和手工操作。

> 💡 关键：MLflow 的设计哲学是 **"开放接口优先"**——不试图替代任何现有 ML 工具，而是通过轻量级的 API 和格式约定，在已有工具之上建立统一的管理层。

##### 核心机制：三大组件详解

**1. MLflow Tracking —— 实验记录与对比**

MLflow Tracking 是整个平台的基础组件，解决"实验追踪"问题。其核心概念是 **Run**（一次运行），每个 Run 记录：

- **Parameters**：输入的超参数（如学习率、批大小），类型为字符串键值对
- **Metrics**：输出的评估指标（如准确率、损失），支持随时间步记录变化曲线
- **Artifacts**：任意输出文件（模型文件、可视化图表、数据样本等）
- **Source**：运行的代码来源（Git commit hash 或项目入口）
- **Tags & Notes**：用户自定义的标签和备注

多个 Run 可以组织为 **Experiment**（实验），Tracking UI 提供可视化对比界面，支持按指标排序、筛选和图表展示。

存储后端支持两种模式：
- **本地文件系统**：适合个人使用，零配置
- **远程 Tracking Server**：通过 REST API 提供团队共享的中心化存储，支持 SQL 数据库 + 对象存储（S3/Azure Blob/GCS）

> ⚠️ 注意：Tracking API 的设计刻意保持极简——仅需 `log_param()`、`log_metric()`、`log_artifact()` 三类调用，即可与任何 ML 框架集成，无需修改训练逻辑。

**2. MLflow Projects —— 可复现的代码打包**

MLflow Projects 通过约定优于配置（Convention over Configuration）的方式解决可复现性问题。一个 Project 就是一个包含 `MLproject` 文件的目录（或 Git 仓库），其中定义：

- **环境描述**：通过 Conda 环境文件（`conda.yaml`）精确锁定所有依赖版本，也支持 Docker 容器
- **入口点（Entry Points）**：定义可执行的命令及其参数（含类型和默认值）
- **参数类型系统**：支持 `float`、`int`、`string`、`path` 四种类型，其中 `path` 类型会自动处理本地/远程文件的下载

执行方式灵活：

$$
\text{mlflow run} \xrightarrow{\text{解析 MLproject}} \text{创建 Conda 环境} \xrightarrow{\text{注入参数}} \text{执行 entry point} \xrightarrow{\text{自动记录}} \text{Tracking Run}
$$

Projects 可以嵌套调用——一个 Project 的步骤可以通过 `mlflow.run()` API 调用另一个 Project，形成多步骤工作流（multi-step workflow）。这使得复杂的 ML 流水线（数据预处理 → 特征工程 → 训练 → 评估）可以模块化组织。

**3. MLflow Models —— 多格式模型部署**

MLflow Models 引入了 **flavor（风味）** 这一关键抽象来解决模型部署的碎片化问题。

核心思想：每个模型可以同时以多种 flavor 导出，每种 flavor 对应一种使用方式。例如一个 TensorFlow 模型可以同时具有：
- `tensorflow` flavor：保留完整的 TF SavedModel，供 TensorFlow Serving 使用
- `python_function` flavor：封装为通用 Python 函数，接受 pandas DataFrame 输入，适用于任何 Python 环境

模型以目录形式存储，包含一个 `MLmodel` 元数据文件（YAML 格式）描述可用的 flavor 及其加载方式：

```yaml
# MLmodel 文件示例
artifact_path: model
flavors:
  python_function:
    loader_module: mlflow.sklearn
    python_version: 3.8.10
  sklearn:
    pickled_model: model.pkl
    sklearn_version: 0.24.2
```

部署工具只需理解它支持的 flavor 即可。MLflow 内置了多种部署目标：
- **本地 REST Server**：`mlflow models serve`
- **Docker 容器**：`mlflow models build-docker`
- **Apache Spark UDF**：将模型注册为 Spark SQL 用户自定义函数，实现大规模批处理
- **云平台**：Azure ML、Amazon SageMaker 等

> 💡 关键：flavor 机制的精妙之处在于它实现了 **模型生产者与消费者的解耦**——训练代码只需按框架原生方式保存模型，部署工具只需按自己支持的 flavor 加载，中间通过 MLmodel 元数据文件桥接。

##### 与传统方法的区别

| 维度 | 传统 ML 工具链 | MLflow |
|------|---------------|--------|
| 实验管理 | 手工记录（Excel/笔记）或各框架自带日志 | 统一 Tracking API + 可视化 UI |
| 可复现性 | 依赖文档说明，环境配置靠人工 | MLproject + Conda/Docker 自动化环境 |
| 模型格式 | 每个框架独立格式（.pb/.pt/.pkl） | 多 flavor 统一封装 + MLmodel 元数据 |
| 部署方式 | 针对每种框架×每种目标单独开发 | flavor 抽象解耦，一次保存多处部署 |
| 平台锁定 | 通常绑定特定云/框架生态 | 开放 API，不绑定任何特定工具 |
| 工作流编排 | 需要额外的调度系统（Airflow 等） | Projects 多步骤嵌套 + Tracking 自动关联 |

与同期的其他 ML 平台相比（如 Google TFX、Facebook FBLearner、Uber Michelangelo），MLflow 的核心差异在于：
- **开源开放**：不绑定特定公司的基础设施
- **增量采用**：可以只使用一个组件，无需全盘迁移
- **库无关**：支持任意 ML 框架，而非仅限于自家框架

##### 设计原则总结

论文明确提出了 MLflow 的四大设计原则：

1. **API-first（API 优先）**：所有功能通过编程 API 暴露，而非 GUI 操作，便于自动化集成
2. **Modular（模块化）**：三个组件独立使用，降低采用门槛
3. **Library-agnostic（库无关）**：通过 REST API 和通用格式（而非框架插件）实现集成
4. **Open（开放）**：开源实现，开放格式，避免供应商锁定

#### 🧪 练习题
```yaml
question: "MLflow Models 中 flavor 机制的核心作用是什么？"
options:
  - "将模型压缩为更小的文件格式以节省存储空间"
  - "让同一模型以多种格式导出，实现模型生产者与部署消费者的解耦"
  - "自动选择最优的模型架构进行超参数调优"
  - "将不同框架的模型统一转换为 ONNX 格式"
answer: 1
explain: "flavor 机制允许一个模型同时以多种格式（如 python_function、tensorflow、sklearn）导出，部署工具只需理解它支持的 flavor 即可加载模型，从而解耦了模型训练框架与部署环境之间的依赖关系。"
```

### Optuna

```yaml
id: optuna
num: 19
name: Optuna
full_name: Optuna
year: '2019'
org: Preferred Networks
parent: mlflow
paper_url: https://arxiv.org/abs/1907.10902
project_url: ''
category: experiment_mgmt
motivation: Define-by-run接口，支持高效剪枝与超参搜索
```

#### 📝 一句话总结
Optuna 的核心目标是：Define-by-run接口，支持高效剪枝与超参搜索。

#### 🎯 核心要点
- 核心动机：Define-by-run接口，支持高效剪枝与超参搜索
- 演化来源：继承或改进自 mlflow
- 代表机构：Preferred Networks

#### 🔬 深入细节
Define-by-run接口，支持高效剪枝与超参搜索


### DVC

```yaml
id: dvc
num: 20
name: DVC
full_name: DVC数据版本控制 (DVC)
year: '2020'
org: Iterative.ai
parent: mlflow
paper_url: https://dvc.org/
project_url: ''
category: experiment_mgmt
motivation: 将Git版本控制引入数据集与模型文件管理
```

#### 📝 一句话总结
DVC 的核心目标是：将Git版本控制引入数据集与模型文件管理。

#### 🎯 核心要点
- 核心动机：将Git版本控制引入数据集与模型文件管理
- 演化来源：继承或改进自 mlflow
- 代表机构：Iterative.ai

#### 🔬 深入细节
将Git版本控制引入数据集与模型文件管理


### W&B

```yaml
id: wandb
num: 21
name: W&B
full_name: Weights & Biases
year: '2020'
org: W&B Inc.
parent: mlflow
paper_url: https://wandb.ai/
project_url: ''
category: experiment_mgmt
motivation: 云端协作式实验看板，强化团队开发效率
```

#### 📝 一句话总结
W&B 的核心目标是：云端协作式实验看板，强化团队开发效率。

#### 🎯 核心要点
- 核心动机：云端协作式实验看板，强化团队开发效率
- 演化来源：继承或改进自 mlflow
- 代表机构：W&B Inc.

#### 🔬 深入细节
云端协作式实验看板，强化团队开发效率


### FlashInfer-Bench

```yaml
id: flashinfer_bench
num: 22
name: FlashInfer-Bench
full_name: FlashInfer-Bench
year: '2026'
org: MLSys Community
parent: mlflow
paper_url: https://mlsys.org/Conferences/2026/Schedule?type=Poster
project_url: ''
category: experiment_mgmt
motivation: AI驱动的LLM系统基准测试平台
```

#### 📝 一句话总结
FlashInfer-Bench 的核心目标是：AI驱动的LLM系统基准测试平台。

#### 🎯 核心要点
- 核心动机：AI驱动的LLM系统基准测试平台
- 演化来源：继承或改进自 mlflow
- 代表机构：MLSys Community

#### 🔬 深入细节
AI驱动的LLM系统基准测试平台


### SageMaker AI Agent

```yaml
id: sagemaker_agent
num: 23
name: SageMaker AI Agent
full_name: SageMaker AI Agent
year: '2026'
org: AWS
parent: wandb
paper_url: https://aws.amazon.com/sagemaker/
project_url: ''
category: experiment_mgmt
motivation: 智能代理自动完成数据准备到微调策略选择
```

#### 📝 一句话总结
Amazon SageMaker AI 推出 Agent 引导的模型定制工作流，用户通过自然语言描述需求即可由 AI Agent 自动完成数据准备、训练策略选择和无服务器强化学习微调，将大模型定制周期从数周压缩至数天，覆盖 Amazon Nova、Llama、Qwen、DeepSeek 等主流模型。

#### 🎯 核心要点
- **AI Agent 引导工作流**：用户以自然语言描述定制目标，Agent 自动编排数据预处理、超参选择、训练策略推荐的全流程
- **无服务器强化学习（Serverless RL）**：无需预置 GPU 集群，按需启动 GRPO/PPO 等 RL 训练任务，按实际使用量计费
- **多模型支持**：通过 SageMaker JumpStart 接入 1000+ 预训练模型（Amazon Nova、Llama、Qwen、DeepSeek、GPT-OSS 等）
- **多技术路线**：支持监督微调（SFT）、强化学习（RL/GRPO）、LoRA/QLoRA 等参数高效微调方法
- **HyperPod 分布式训练**：跨数千 AI 加速器的自动化集群管理，训练时间减少最高 40%，支持无检查点连续训练和弹性伸缩
- **推理优化**：覆盖 80+ 实例类型，提供实时、无服务器、异步和批量推理四种部署模式
- **MLflow 集成**：全托管 MLflow 实验追踪，无需自建基础设施即可管理模型版本与指标对比
- **SageMaker Unified Studio**：统一 IDE 整合数据处理、模型开发、部署监控全链路

#### 🔬 深入细节
```
┌──────────────────────────────────────────────────────────────────┐
│                    SageMaker AI Agent 工作流                      │
│                                                                  │
│  ┌──────────┐    ┌──────────────┐    ┌───────────────────────┐  │
│  │  用户输入  │───▶│  AI Agent    │───▶│  自动化编排引擎        │  │
│  │ (自然语言) │    │ (意图理解 +  │    │                       │  │
│  └──────────┘    │  策略推荐)   │    │  ┌─────────────────┐  │  │
│                  └──────────────┘    │  │ 1. 数据验证&预处理│  │  │
│                                      │  │ 2. 模型选择       │  │  │
│  ┌──────────────────────────────┐   │  │ 3. 训练策略推荐   │  │  │
│  │     SageMaker JumpStart      │   │  │ 4. 超参配置       │  │  │
│  │  1000+ 预训练模型            │◀──│  │ 5. 启动训练       │  │  │
│  │  Nova/Llama/Qwen/DeepSeek   │   │  └─────────────────┘  │  │
│  └──────────────────────────────┘   └───────────────────────┘  │
│                  │                              │                │
│                  ▼                              ▼                │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              训练基础设施层                                │  │
│  │  ┌────────────────┐  ┌─────────────────────────────────┐│  │
│  │  │ Serverless RL   │  │  HyperPod 分布式集群             ││  │
│  │  │ (GRPO/PPO/SFT) │  │  • 自动故障恢复                  ││  │
│  │  │ • 按需计费      │  │  • 弹性伸缩                      ││  │
│  │  │ • 零运维        │  │  • 无检查点连续训练               ││  │
│  │  └────────────────┘  └─────────────────────────────────┘│  │
│  └──────────────────────────────────────────────────────────┘  │
│                              │                                  │
│                              ▼                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              部署 & 监控层                                 │  │
│  │  推理优化 (80+ 实例) │ MLflow 实验追踪 │ Unified Studio   │  │
│  └──────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────┘
```
*图：SageMaker AI Agent 端到端模型定制工作流架构示意*

```python
# SageMaker AI Agent 引导的模型定制伪代码
import sagemaker
from sagemaker.jumpstart import JumpStartModel
from sagemaker.customization import AgentWorkflow

# 1. 用户通过自然语言描述定制需求
user_request = """
我需要一个中文客服对话模型，基于 Qwen-72B，
使用我们的客服日志数据进行微调，
要求回答准确且语气友好。
"""

# 2. AI Agent 解析意图并生成定制方案
agent = AgentWorkflow(region="us-west-2")
plan = agent.analyze(
    request=user_request,
    available_models=JumpStartModel.list(),  # 1000+ 模型
)
# plan 包含: base_model, technique, hyperparams, data_config

print(plan)
# → {base_model: "Qwen-72B", technique: "GRPO",
#    data_format: "conversation", epochs: 3,
#    lora_rank: 16, learning_rate: 2e-5}

# 3. Agent 自动执行数据预处理
processed_data = agent.prepare_data(
    source_s3="s3://my-bucket/customer-service-logs/",
    target_format=plan.data_format,
    validation_split=0.1,
)

# 4. 无服务器强化学习训练（无需预置集群）
training_job = agent.launch_training(
    plan=plan,
    training_data=processed_data,
    serverless=True,           # 无服务器模式
    technique="GRPO",          # Group Relative Policy Optimization
    reward_model="auto",       # Agent 自动选择/构建奖励模型
)

# 5. 自动评估与部署
eval_results = agent.evaluate(training_job)
if eval_results.meets_criteria():
    endpoint = agent.deploy(
        model=training_job.best_model,
        instance_type="ml.g6e.xlarge",  # Agent 推荐的最优实例
        optimization="auto",            # 自动量化/编译优化
    )
```

**动机与背景：从手动微调到 Agent 自动化编排**

在大模型时代，企业对模型定制的需求急剧增长，但传统的微调流程面临三大痛点：（1）基础设施复杂——需要手动配置 GPU 集群、管理分布式训练框架、处理节点故障；（2）技术门槛高——选择 SFT 还是 RL、确定 LoRA rank、设置学习率等超参数需要深厚的 ML 经验；（3）周期长——从数据准备到模型上线通常需要数周甚至数月。SageMaker AI Agent 的核心设计理念是将这些专家知识封装进 AI Agent，让用户只需描述业务目标，Agent 即可自动完成从数据到部署的全链路编排。这一思路与 AutoML 的理念一脉相承，但将自动化范围从超参搜索扩展到了包含 RL 训练策略、数据格式转换、奖励模型选择在内的完整工作流。

**核心机制：Agent 引导 + 无服务器 RL 的双轮驱动**

SageMaker AI Agent 的技术架构可分为两个核心层。第一层是 **Agent 引导层**：Agent 接收用户的自然语言描述后，通过意图理解模块解析出目标模型类型、数据特征和性能要求，然后从 JumpStart 的 1000+ 模型库中匹配最合适的基座模型，并根据任务特征推荐最优训练策略（如对话任务推荐 GRPO，分类任务推荐 SFT + LoRA）。Agent 还会自动验证数据格式、检测数据质量问题并提出修复建议。第二层是 **无服务器训练层**：与传统需要预先申请 GPU 实例的方式不同，Serverless RL 采用按需分配计算资源的模式。用户无需关心底层集群管理，系统根据模型规模和数据量自动选择合适的实例类型和数量。特别值得注意的是对 GRPO（Group Relative Policy Optimization）的原生支持——这是 DeepSeek 提出的一种无需独立 Value Model 的 RL 算法，通过组内相对排序计算优势函数，显著降低了 RL 微调的资源开销。训练过程中，Agent 持续监控损失曲线和评估指标，在检测到过拟合或训练不稳定时自动调整学习率或提前终止。

**HyperPod 与推理优化：从训练到部署的全链路加速**

对于需要大规模训练的场景，SageMaker HyperPod 提供了跨数千 AI 加速器的分布式训练能力。其三大创新特性包括：（1）**无检查点连续训练（Checkpointless Training）**——传统分布式训练在节点故障时需要从最近的检查点重启，而 HyperPod 通过内存级状态复制实现故障透明恢复，消除了检查点 I/O 开销和恢复期间的空闲计算成本；（2）**弹性训练（Elastic Training）**——根据计算资源可用性自动扩缩训练作业规模，无需人工重新配置；（3）**自动集群管理**——自动处理节点健康检查、网络拓扑优化和数据并行/模型并行策略选择。在推理侧，SageMaker 提供覆盖 80+ 实例类型的四种部署模式（实时、无服务器、异步、批量），并内置自动量化（INT8/FP8）、模型编译（Neuron Compiler）和推测解码等优化技术，将部署周期从数月缩短至数小时。

**与传统 ML 平台的差异化定位**

与 Weights & Biases（W&B）等实验管理平台相比，SageMaker AI Agent 的差异化在于其 **全托管 + Agent 驱动** 的定位。W&B 侧重于实验追踪和可视化，是一个"记录工具"；而 SageMaker AI Agent 是一个"执行引擎"，不仅记录实验过程，还主动驱动实验执行。通过集成 MLflow 的实验追踪能力，SageMaker AI 实现了"Agent 执行 + MLflow 记录"的协同模式。此外，SageMaker Unified Studio 将数据湖（Lakehouse）、ETL 管道、模型开发、部署监控整合在统一 IDE 中，消除了传统 ML 工作流中工具碎片化的问题。这种从"工具集合"到"智能平台"的演进，代表了 MLOps 领域从被动记录向主动编排的范式转变。

> 💡 **关键**：SageMaker AI Agent 的核心价值不在于单一技术突破，而在于将 AutoML、Serverless Computing、RL Training、Agent Orchestration 四大能力整合为统一的自然语言驱动工作流，大幅降低了企业级模型定制的技术门槛和时间成本。

#### 🧪 练习题
```yaml
question: "SageMaker AI Agent 引导工作流中，无服务器强化学习（Serverless RL）的核心优势是什么？"
options:
  - "支持更大的模型参数量训练"
  - "无需预置 GPU 集群，按需分配资源并自动管理训练基础设施"
  - "仅支持 PPO 算法以确保训练稳定性"
  - "要求用户手动指定所有超参数以获得最优结果"
answer: 1
explain: "Serverless RL 的核心优势在于用户无需预先申请和管理 GPU 集群，系统根据任务需求自动分配计算资源并按实际使用量计费，同时 Agent 自动推荐超参数配置，大幅降低了 RL 微调的运维和技术门槛。"
```

### TFX

```yaml
id: tfx
num: 24
name: TFX
full_name: TensorFlow Extended (TFX)
year: '2017'
org: Google
parent: —
paper_url: https://www.tensorflow.org/tfx
project_url: ''
category: mlops_lifecycle
motivation: 端到端生产级ML平台，涵盖数据校验到模型评估
```

#### 📝 一句话总结
TFX 的核心目标是：端到端生产级ML平台，涵盖数据校验到模型评估。

#### 🎯 核心要点
- 核心动机：端到端生产级ML平台，涵盖数据校验到模型评估
- 代表机构：Google

#### 🔬 深入细节
端到端生产级ML平台，涵盖数据校验到模型评估


### Kubeflow

```yaml
id: kubeflow
num: 25
name: Kubeflow
full_name: Kubeflow
year: '2018'
org: Google/Cisco
parent: tfx
paper_url: https://www.kubeflow.org/
project_url: ''
category: mlops_lifecycle
motivation: 基于Kubernetes的云原生ML工作流编排平台
```

#### 📝 一句话总结
Kubeflow 的核心目标是：基于Kubernetes的云原生ML工作流编排平台。

#### 🎯 核心要点
- 核心动机：基于Kubernetes的云原生ML工作流编排平台
- 演化来源：继承或改进自 tfx
- 代表机构：Google/Cisco

#### 🔬 深入细节
基于Kubernetes的云原生ML工作流编排平台


### Feast

```yaml
id: feast
num: 26
name: Feast
full_name: Feast特征存储 (Feast)
year: '2019'
org: Gojek/Google
parent: kubeflow
paper_url: https://feast.dev/
project_url: ''
category: mlops_lifecycle
motivation: 首个开源特征存储，解决训练与推理数据一致性
```

#### 📝 一句话总结
Feast 的核心目标是：首个开源特征存储，解决训练与推理数据一致性。

#### 🎯 核心要点
- 核心动机：首个开源特征存储，解决训练与推理数据一致性
- 演化来源：继承或改进自 kubeflow
- 代表机构：Gojek/Google

#### 🔬 深入细节
首个开源特征存储，解决训练与推理数据一致性


### TF Serving

```yaml
id: tf_serving
num: 27
name: TF Serving
full_name: TensorFlow Serving
year: '2017'
org: Google
parent: —
paper_url: https://www.tensorflow.org/tfx/guide/serving
project_url: ''
category: inference_system
motivation: 高性能模型推理系统，支持模型版本热切换
```

#### 📝 一句话总结
TF Serving 的核心目标是：高性能模型推理系统，支持模型版本热切换。

#### 🎯 核心要点
- 核心动机：高性能模型推理系统，支持模型版本热切换
- 代表机构：Google

#### 🔬 深入细节
高性能模型推理系统，支持模型版本热切换


### KServe

```yaml
id: kserve
num: 28
name: KServe
full_name: KServe
year: '2021'
org: KubeFlow Community
parent: tf_serving
paper_url: https://kserve.github.io/website/
project_url: ''
category: inference_system
motivation: 基于Serverless架构的标准化模型推理协议
```

#### 📝 一句话总结
KServe 的核心目标是：基于Serverless架构的标准化模型推理协议。

#### 🎯 核心要点
- 核心动机：基于Serverless架构的标准化模型推理协议
- 演化来源：继承或改进自 tf_serving
- 代表机构：KubeFlow Community

#### 🔬 深入细节
基于Serverless架构的标准化模型推理协议


### vLLM

```yaml
id: vllm
num: 29
name: vLLM
full_name: vLLM
year: '2023'
org: UC Berkeley
parent: kserve
paper_url: https://arxiv.org/abs/2309.06180
project_url: ''
category: inference_system
motivation: 提出PagedAttention，极大提升LLM推理吞吐量
```

#### 📝 一句话总结
vLLM 的核心目标是：提出PagedAttention，极大提升LLM推理吞吐量。

#### 🎯 核心要点
- 核心动机：提出PagedAttention，极大提升LLM推理吞吐量
- 演化来源：继承或改进自 kserve
- 代表机构：UC Berkeley

#### 🔬 深入细节
提出PagedAttention，极大提升LLM推理吞吐量


### RaidServe

```yaml
id: raidserve
num: 30
name: RaidServe
full_name: RaidServe
year: '2026'
org: MLSys Community
parent: vllm
paper_url: https://mlsys.org/Conferences/2026/Schedule?type=Poster
project_url: ''
category: inference_system
motivation: 高可靠弹性推理平台，冗余计算与快速恢复
```

#### 📝 一句话总结
RaidServe 的核心目标是：高可靠弹性推理平台，冗余计算与快速恢复。

#### 🎯 核心要点
- 核心动机：高可靠弹性推理平台，冗余计算与快速恢复
- 演化来源：继承或改进自 vllm
- 代表机构：MLSys Community

#### 🔬 深入细节
高可靠弹性推理平台，冗余计算与快速恢复


### SuperInfer

```yaml
id: superinfer
num: 31
name: SuperInfer
full_name: SuperInfer
year: '2026'
org: MLSys Community
parent: vllm
paper_url: https://mlsys.org/Conferences/2026/Schedule?type=Poster
project_url: ''
category: inference_system
motivation: 针对超级芯片的SLO感知调度系统
```

#### 📝 一句话总结
SuperInfer 的核心目标是：针对超级芯片的SLO感知调度系统。

#### 🎯 核心要点
- 核心动机：针对超级芯片的SLO感知调度系统
- 演化来源：继承或改进自 vllm
- 代表机构：MLSys Community

#### 🔬 深入细节
针对超级芯片的SLO感知调度系统


### OpenTela

```yaml
id: opentela
num: 32
name: OpenTela
full_name: OpenTela
year: '2026'
org: OSDI Community
parent: vllm
paper_url: https://www.usenix.org/conference/osdi26/technical-sessions
project_url: ''
category: inference_system
motivation: 统一去中心化HPC集群的异构LLM推理系统
```

#### 📝 一句话总结
OpenTela 的核心目标是：统一去中心化HPC集群的异构LLM推理系统。

#### 🎯 核心要点
- 核心动机：统一去中心化HPC集群的异构LLM推理系统
- 演化来源：继承或改进自 vllm
- 代表机构：OSDI Community

#### 🔬 深入细节
统一去中心化HPC集群的异构LLM推理系统


### Djinn

```yaml
id: djinn
num: 33
name: Djinn
full_name: Djinn
year: '2026'
org: OSDI Community
parent: kserve
paper_url: https://www.usenix.org/conference/osdi26/technical-sessions
project_url: ''
category: inference_system
motivation: 语义感知的透明GPU解耦系统
```

#### 📝 一句话总结
Djinn 的核心目标是：语义感知的透明GPU解耦系统。

#### 🎯 核心要点
- 核心动机：语义感知的透明GPU解耦系统
- 演化来源：继承或改进自 kserve
- 代表机构：OSDI Community

#### 🔬 深入细节
语义感知的透明GPU解耦系统
