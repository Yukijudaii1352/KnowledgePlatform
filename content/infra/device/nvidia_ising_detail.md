### NVIDIA Ising — AI 模型族与训练框架：面向量子计算的校准与纠错

```yaml
id: nvidia_ising
name: NVIDIA Ising
full_name: "NVIDIA Ising: AI Models & Training Framework for Quantum Computing"
year: 2026
org: NVIDIA
paper_url: "https://developer.nvidia.com/ising"
category: quantum_hybrid
parent: "—"
motivation: "AI优化量子纠错实现微秒级混合控制"
related_papers:
  - "arXiv:2604.12841 (Fast AI-Based Pre-Decoders for Surface Codes)"
  - "QCalEval: Benchmarking VLMs for Quantum Calibration Plot Understanding"
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