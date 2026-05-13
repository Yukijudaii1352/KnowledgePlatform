---
domain: infra
topic_id: model_compression
topic_name: 模型压缩
page_icon: "\U0001F5DC️"
page_title: 模型压缩算法总结
page_subtitle: '{build_date} 版'
page_desc: 综述量化、剪枝、蒸馏与稀疏化部署的技术演进，涵盖从经典压缩范式到2026年最新前沿进展。
hero_pills:
- "\U0001F3F7️ Quantization · Pruning · Distillation · Sparse Inference"
count_pill: '{count} 个算法'
categories:
  quantization:
    label: 量化技术
    color: '#22a06b'
  pruning:
    label: 剪枝技术
    color: '#5b63d3'
  distillation:
    label: 知识蒸馏
    color: '#e8820c'
  sparsity_deploy:
    label: 稀疏化与部署
    color: '#d32f2f'
---

## 领域综述

### 待定
待定。

## 算法演化关系

```yaml
nodes:
- id: qat
  x: 2018
  y: 100
  category: quantization
- id: gptq
  x: 2023
  y: 100
  category: quantization
- id: smoothquant
  x: 2023
  y: 130
  category: quantization
- id: awq
  x: 2024
  y: 100
  category: quantization
- id: abq_llm
  x: 2025
  y: 100
  category: quantization
- id: spinquant
  x: 2025
  y: 130
  category: quantization
- id: efficientqat
  x: 2025
  y: 160
  category: quantization
- id: lottery_ticket
  x: 2019
  y: 250
  category: pruning
- id: movement_pruning
  x: 2020
  y: 250
  category: pruning
- id: sparsegpt
  x: 2023
  y: 250
  category: pruning
- id: saap
  x: 2026
  y: 250
  category: pruning
- id: replaceme
  x: 2026
  y: 280
  category: pruning
- id: vitcop
  x: 2026
  y: 220
  category: pruning
- id: hinton_kd
  x: 2015
  y: 400
  category: distillation
- id: distilbert
  x: 2019
  y: 400
  category: distillation
- id: tinybert
  x: 2020
  y: 400
  category: distillation
- id: minillm
  x: 2024
  y: 400
  category: distillation
- id: activeprune
  x: 2026
  y: 400
  category: distillation
- id: longformer
  x: 2020
  y: 550
  category: sparsity_deploy
- id: bigbird
  x: 2020
  y: 580
  category: sparsity_deploy
- id: nm_sparsity
  x: 2021
  y: 550
  category: sparsity_deploy
- id: permllm
  x: 2026
  y: 550
  category: sparsity_deploy
- id: gigamoe
  x: 2026
  y: 520
  category: sparsity_deploy
- id: hierasparse
  x: 2026
  y: 580
  category: sparsity_deploy
edges:
- from: qat
  to: smoothquant
  label: 离群值优化
- from: qat
  to: efficientqat
  label: 效率提升
- from: gptq
  to: awq
  label: 激活感知
- from: gptq
  to: spinquant
  label: 旋转变换
- from: gptq
  to: sparsegpt
  label: 跨域迁移
- from: awq
  to: abq_llm
  label: 任意比特
- from: lottery_ticket
  to: movement_pruning
  label: 动态剪枝
- from: movement_pruning
  to: replaceme
  label: 深度剪枝
- from: sparsegpt
  to: saap
  label: 结构感知
- from: saap
  to: vitcop
  label: 多模态协同
- from: hinton_kd
  to: distilbert
  label: 预训练蒸馏
- from: distilbert
  to: tinybert
  label: 多层蒸馏
- from: tinybert
  to: minillm
  label: LLM蒸馏
- from: minillm
  to: activeprune
  label: 主动学习
- from: longformer
  to: bigbird
  label: 随机注意力
- from: bigbird
  to: hierasparse
  label: 分层稀疏
- from: nm_sparsity
  to: permllm
  label: 通道排列
- from: nm_sparsity
  to: gigamoe
  label: MoE结合
milestones:
- id: hinton_kd
  year: 2015
  description: 奠定知识蒸馏理论基础，开创模型压缩新范式
- id: gptq
  year: 2023
  description: 首个支持LLM的高效后训练量化，推动大模型压缩普及
- id: permllm
  year: 2026
  description: 可学习稀疏模式，标志N:M稀疏进入软件定义时代
```

## 核心算法

### QAT

```yaml
id: qat
num: 1
name: QAT
full_name: 量化感知训练 (Quantization-Aware Training)
year: '2018'
org: Google
parent: —
paper_url: https://arxiv.org/abs/1712.05877
project_url: ''
category: quantization
motivation: 引入伪量化节点模拟训练中量化误差
```

#### 📝 一句话总结
QAT 提出了一套完整的量化感知训练框架：在训练前向传播中插入模拟量化（fake quantization）节点来模拟定点推理的精度损失，配合 Batch Normalization 折叠和 Straight-Through Estimator 反向传播，使得量化后的模型可以在纯整数算术硬件上高效推理，同时将精度损失控制在极小范围内。

#### 🎯 核心要点
- **仿射量化方案**：采用 \(r = S(q - Z)\) 的非对称量化映射，权重和激活量化为 8-bit 整数，bias 量化为 32-bit 整数
- **纯整数推理**：矩阵乘法完全在整数域完成，唯一的浮点操作是一个预计算的定点乘数 \(M = S_1 S_2 / S_3\)，通过定点乘法实现
- **模拟量化训练（Fake Quantization）**：前向传播中插入 fake_quant 节点模拟量化误差，反向传播使用 STE（Straight-Through Estimator）直通梯度
- **量化范围确定**：权重使用逐层 min/max，激活使用 EMA（指数移动平均）跟踪运行范围
- **BN 折叠量化**：训练时模拟推理阶段的 BN 折叠效果，对折叠后的等效权重进行量化
- **训练 Warmup**：训练初期（50K~2M 步）禁用激活量化，先让网络收敛到合理范围再引入量化噪声
- **实验覆盖广泛**：在 ResNet、InceptionV3、MobileNet 上验证，涵盖分类（ImageNet）、检测（COCO）、人脸检测等任务

#### 🔬 深入细节
![QAT 量化感知训练流程](https://arxiv.org/html/1712.05877v1/extracted/figures/training_graph.png)
*图：QAT 训练与推理流程对比。训练时在浮点权重/激活后插入 fake_quant 节点模拟量化；推理时将权重直接量化为整数，所有计算在整数域完成。*

```python
# QAT 核心训练流程伪代码 (Algorithm 1)
# Phase 1: 构建训练图
float_graph = build_model()                    # 构建浮点模型
for layer in float_graph.layers:
    # 在权重后插入 fake_quant 节点
    layer.weight = fake_quantize(layer.weight, n_bits=8)
    # 在激活后插入 fake_quant 节点
    layer.activation = fake_quantize(layer.activation, n_bits=8)

# Phase 2: 训练（前向模拟量化，反向 STE）
for step in range(total_steps):
    if step < warmup_steps:
        disable_activation_quantization()       # 初期禁用激活量化
    else:
        enable_activation_quantization()
    loss = forward_with_fake_quant(batch)
    loss.backward()                             # STE: 梯度直通 fake_quant 节点
    optimizer.step()

# Phase 3: 导出推理图
for layer in float_graph.layers:
    layer.weight = quantize_to_int8(layer.weight)  # 真正量化为整数
    layer.bn = fold_into_weight(layer.bn)           # BN 折叠
# 推理时所有计算在 int8/int32 域完成
```

**动机与背景**

深度神经网络在移动端和嵌入式设备上的部署面临两大挑战：（1）模型体积大，内存受限；（2）浮点运算慢，能耗高。量化（Quantization）将 32-bit 浮点参数压缩为 8-bit 或更低位宽的整数，可以同时解决存储和计算效率问题。然而，直接对训练好的模型进行 Post-Training Quantization（PTQ）往往导致显著的精度损失，尤其是对 MobileNet 等轻量模型。QAT 的核心思想是：**在训练过程中就模拟量化带来的精度损失，让模型学会适应量化噪声**。

**核心机制一：仿射量化方案**

论文采用仿射（非对称）量化，将实数值 \(r\) 映射到整数 \(q\)：

$$r = S(q - Z)$$

其中 \(S\)（scale）和 \(Z\)（zero-point）由数据范围决定：

$$S = \frac{r_{\max} - r_{\min}}{q_{\max} - q_{\min}}, \quad Z = \text{round}\left(q_{\min} - \frac{r_{\min}}{S}\right)$$

> 💡 **关键**：zero-point \(Z\) 是整数，确保实数 0.0 可以被精确表示为某个量化值。这对 ReLU 激活（大量零值）和 zero-padding 至关重要，避免了系统性偏差。

权重量化到 \([-127, 127]\)（int8，排除 -128 以保持对称性），激活量化到 \([0, 255]\)（uint8，因 ReLU 后非负）。

**核心机制二：纯整数矩阵乘法**

两个量化矩阵相乘时，展开仿射映射后得到：

$$q_3^{(i,k)} \approx Z_3 + M \sum_{j=1}^{N} \left(q_1^{(i,j)} - Z_1\right)\left(q_2^{(j,k)} - Z_2\right)$$

其中 \(M = \frac{S_1 \cdot S_2}{S_3}\) 是唯一需要浮点的部分。论文的关键洞察是：\(M\) 总在 \((0, 1)\) 区间内，可以表示为 \(M = 2^{-n} M_0\)，其中 \(M_0 \in [0.5, 1)\) 用定点整数乘法实现，\(2^{-n}\) 用位移实现。这样**整个推理过程完全在整数域完成**。

> ⚠️ **注意**：Bias 使用 int32 量化，其 scale 为 \(S_{\text{bias}} = S_1 \cdot S_2\)，zero-point 为 0。由于累加器本身就是 int32，bias 加法无额外开销。

**核心机制三：模拟量化训练（Fake Quantization）**

训练时不真正将权重转为整数，而是在浮点域模拟量化-反量化过程：

$$\text{clamp}(r; a, b) = \min(\max(r, a), b)$$

$$s = \frac{b - a}{n - 1}$$

$$q(r; a, b, n) = \left\lfloor \frac{\text{clamp}(r; a, b) - a}{s} \right\rceil \cdot s + a$$

其中 \(a, b\) 是量化范围，\(n\) 是量化级数（8-bit 时 \(n = 2^8 = 256\)），\(\lfloor \cdot \rceil\) 表示四舍五入。这个操作将浮点值"snap"到最近的量化格点上，模拟了量化引入的舍入误差。

反向传播时，由于 round 操作不可导，使用 **Straight-Through Estimator（STE）**：在 \([a, b]\) 范围内梯度直通（即 \(\frac{\partial q}{\partial r} = 1\)），范围外梯度为零（clamp 的效果）。

**量化范围确定策略**：
- **权重**：每层使用当前 batch 的 \(\min(w)\) 和 \(\max(w)\)，训练中动态更新
- **激活**：使用 EMA 跟踪运行统计量的范围，平滑因子接近 1（如 0.999），避免单 batch 异常值影响

**核心机制四：Batch Normalization 折叠**

推理时 BN 层会被折叠进卷积权重以减少计算。训练时必须模拟这一折叠效果，否则训练和推理的量化行为不一致。折叠后的等效权重为：

$$w_{\text{fold}} = \frac{\gamma \cdot w}{\sqrt{\text{EMA}(\sigma_B^2) + \epsilon}}$$

> 💡 **关键**：分母使用的是 BN 的 EMA 统计量（而非当前 batch 统计量），这样折叠后的权重变化更平滑，有利于训练稳定性。训练时对 \(w_{\text{fold}}\) 进行 fake quantization，确保量化行为与推理一致。

**训练 Warmup 策略**

论文发现，在训练初期直接引入量化噪声会导致收敛困难。因此采用延迟量化策略：
- 前 50K~2M 步（视模型大小而定）仅做正常浮点训练
- 之后再开启激活的 fake quantization
- 权重量化通常从一开始就启用（因为权重分布相对稳定）

**实验结果与对比**

| 模型 | 任务 | Float 精度 | Int8 精度 | 精度损失 |
|------|------|-----------|----------|---------|
| ResNet-50 | ImageNet Top-1 | 76.4% | 74.9% | -1.5% |
| ResNet-150 | ImageNet Top-1 | 78.8% | 76.7% | -2.1% |
| InceptionV3 (ReLU6) | ImageNet Top-1 | 78.4% | 75.4% | -3.0% |
| InceptionV3 (ReLU6, 7-bit) | ImageNet Top-1 | 78.4% | 75.0% | -3.4% |
| MobileNet SSD (DM=100%) | COCO mAP | 22.1 | 21.7 | -1.8% |
| MobileNet SSD (DM=50%) | COCO mAP | 16.7 | 16.6 | -0.6% |

与同期方法对比（ResNet-50 ImageNet Top-1）：BWN 68.7%、TWN 72.5%、INQ 74.8%、FGQ 70.8%，本文方法 **74.9%** 在 8-bit 量化中达到最优。

**延迟收益**：在 Qualcomm Snapdragon 835 上，量化 MobileNet 在相同延迟预算下精度提升约 **10%**（LITTLE 核心，33ms 实时约束下）。COCO 检测任务中延迟降低高达 **50%**（370ms → 272ms，big 核心）。人脸检测中实现约 **2× 加速**，25% DM 模型从 23fps 提升到 36fps 达到实时。

> 💡 **关键洞察**：论文主张不应仅关注"给定模型的量化精度损失"，而应关注**延迟-精度权衡曲线**。量化后可以使用更大的模型在相同延迟下获得更高精度，这比单纯比较同一模型的精度损失更有实际意义。

**与传统 PTQ 方法的区别**

| 维度 | Post-Training Quantization (PTQ) | QAT（本文） |
|------|--------------------------------|------------|
| 训练开销 | 无需重训练 | 需要完整训练流程 |
| 精度损失 | 较大（尤其轻量模型） | 极小 |
| BN 处理 | 推理时直接折叠 | 训练时模拟折叠后量化 |
| 范围确定 | 校准集统计 | EMA 动态跟踪 |
| 适用场景 | 大模型、精度不敏感 | 轻量模型、精度敏感 |

#### 🧪 练习题
```yaml
question: "QAT 训练中使用 Straight-Through Estimator (STE) 的原因是什么？"
options:
  - "加速训练收敛"
  - "round 操作不可导，STE 让梯度在量化范围内直通以实现反向传播"
  - "减少模型参数量"
  - "避免 Batch Normalization 折叠带来的数值不稳定"
answer: 1
explain: "fake quantization 中的 round 操作导数几乎处处为零，无法传递梯度。STE 在量化范围 [a,b] 内将梯度直通（视为恒等映射），范围外梯度置零，从而使训练可以正常进行。"
```

### GPTQ

```yaml
id: gptq
num: 2
name: GPTQ
full_name: 生成式预训练量化 (GPTQ)
year: '2023'
org: ISTA
parent: —
paper_url: https://arxiv.org/abs/2210.17323
project_url: ''
category: quantization
motivation: 基于Hessian的二阶近似实现极速PTQ
```

#### 📝 一句话总结
GPTQ 的核心目标是：基于Hessian的二阶近似实现极速PTQ。

#### 🎯 核心要点
- 核心动机：基于Hessian的二阶近似实现极速PTQ
- 代表机构：ISTA

#### 🔬 深入细节
基于Hessian的二阶近似实现极速PTQ


### AWQ

```yaml
id: awq
num: 3
name: AWQ
full_name: 激活感知权重量化 (AWQ)
year: '2024'
org: MIT
parent: gptq
paper_url: https://arxiv.org/abs/2306.00978
project_url: ''
category: quantization
motivation: 保护1%显著权重通过激活感知缩放
```

#### 📝 一句话总结
AWQ 通过观察激活分布识别 1% 的关键权重通道，利用 per-channel scaling（而非混合精度）在量化前放大这些通道的有效位宽，仅需网格搜索一个超参 $\alpha$ 即可在 INT3/INT4 下取得优于 GPTQ 的精度，且天然泛化到指令微调模型和视觉语言模型。

#### 🎯 核心要点
- **核心观察**：LLM 权重中存在约 1% 的 salient channels，其重要性由**激活幅度**（而非权重幅度）决定；跳过这 1% 的量化即可大幅恢复精度（OPT-6.7B INT3 PPL 从 43.2 降至 13.0）
- **关键创新**：用 per-channel scaling $\mathbf{s} = \mathbf{s}_X^\alpha$ 在量化前放大 salient channels，等价地缩小量化相对误差，避免了混合精度的硬件不友好问题
- **无需训练**：不依赖反向传播或逐层重建，仅在校准集上测量平均激活幅度 + 网格搜索 $\alpha \in [0,1]$（grid size=20），极度数据高效（16 条序列即可）
- **泛化性强**：不过拟合校准集分布，跨域 PPL 仅增 0.5-0.6（GPTQ 增 2.3-4.9）；首次成功量化 VLM（OpenFlamingo-9B、LLaVA-13B）
- **系统加速**：TinyChat 推理引擎在 INT4 下实现 3.2-3.3× speedup over HF FP16；Llama-2-70B 可部署在单块 Jetson Orin 64GB 上

#### 🔬 深入细节
##### 方法概览

![AWQ 方法示意图](https://arxiv.org/html/2306.00978v2/x1.png)

**Figure 1**：左图为直接 RTN 量化（PPL=43.2），中图为保留 1% salient weights 为 FP16（PPL=13.0，但硬件不友好），右图为 AWQ per-channel scaling 方案（PPL 接近混合精度，且硬件友好）。

##### 算法伪代码

```
Algorithm: AWQ — Activation-aware Weight Quantization
Input: 预训练权重 W ∈ R^{c_o × c_i}, 校准集激活 X ∈ R^{c_i × T}
Output: 量化后权重 Q(W')

1. 计算每通道激活均值: s_X(j) = mean(|X[j,:]|)   // j = 1..c_i
2. 网格搜索最优 α:
   for α in linspace(0, 1, 20):
       s = s_X^α                          // per-channel scaling factor
       W' = W · diag(s)                    // 放大 salient channels
       X' = diag(s⁻¹) · X                 // 等价缩小输入（数学恒等）
       loss(α) = ||Q(W') · X' - W · X||   // 量化误差（MSE）
3. α* = argmin loss(α)
4. s* = s_X^{α*}
5. 返回 Q(W · diag(s*))，推理时输入乘 diag(s*⁻¹) 或融合到前层
```

##### 数学推导

**量化误差分析**：对权重组 $\mathbf{w}$，量化函数为：

$$Q(\mathbf{w}) = \Delta \cdot \text{Round}\!\left(\frac{\mathbf{w}}{\Delta}\right), \quad \Delta = \frac{\max(|\mathbf{w}|)}{2^{N-1}}$$

输出误差为 $\text{Err}(Q(\mathbf{w})) = \Delta \cdot \text{RoundErr}\!\left(\frac{\mathbf{w}}{\Delta}\right) \cdot \mathbf{x}$。

**Scaling 的作用**：对第 $j$ 个输入通道乘以缩放因子 $s_j > 1$，权重变为 $w_j \cdot s_j$，输入变为 $x_j / s_j$（数学恒等变换）。量化误差变为：

$$\text{Err}(w_j \cdot s_j) \cdot \frac{x_j}{s_j} \approx \frac{\Delta}{s_j} \cdot \text{RoundErr} \cdot x_j$$

即 salient channel 的量化误差被缩小了 $s_j$ 倍。但 $s_j$ 过大会增大 $\Delta$（因为 $\max(|\mathbf{w}|)$ 变大），损害非 salient channels。因此需要搜索最优 $\alpha$：

$$\alpha^* = \arg\min_{\alpha \in [0,1]} \; \mathcal{L}(\alpha) = \left\| Q\!\left(\mathbf{W} \cdot \text{diag}(\mathbf{s}_X^\alpha)\right) \left(\text{diag}(\mathbf{s}_X^{-\alpha}) \cdot \mathbf{X}\right) - \mathbf{W}\mathbf{X} \right\|$$

**Weight Clipping**：在 scaling 基础上，进一步对权重做 clipping 以缩小 $\Delta$：

$$\Delta' = \frac{\text{clip}(\max(|\mathbf{w}|), \; \beta)}{2^{N-1}}, \quad \beta < \max(|\mathbf{w}|)$$

Clipping 牺牲离群值精度换取整体更小的量化步长。

##### 与 GPTQ 的对比

| 维度 | AWQ | GPTQ |
|------|-----|------|
| **核心思路** | 激活感知 per-channel scaling | 基于 Hessian 的逐列权重重建 |
| **是否需要反向传播** | ❌ 不需要 | ❌ 不需要（但需要逐层矩阵分解） |
| **校准数据量** | 极少（16 条序列即可） | 较多（128-192 条序列） |
| **过拟合风险** | 低（仅测量激活均值） | 高（重建过拟合校准集分布） |
| **跨域泛化** | PPL 仅增 0.5-0.6 | PPL 增 2.3-4.9 |
| **VLM/指令微调支持** | ✅ 首次成功 | ⚠️ 泛化性差 |
| **INT3 LLaMA-7B PPL** | 6.35 | 8.81（需 reorder 降至 6.53） |
| **INT4 LLaMA-65B PPL** | 3.62 | 3.66 |
| **推理加速** | 3.2-3.3× (TinyChat) | 需额外 kernel 支持 |

##### 关键实验结果

**语言模型量化**（WikiText-2 PPL↓）：
- INT4-g128 LLaMA-65B：AWQ **3.62** vs GPTQ 3.66 vs RTN 3.67（FP16=3.53）
- INT3-g128 Llama-2-70B：AWQ **3.74** vs GPTQ 3.88 vs RTN 3.98（FP16=3.32）
- AWQ 在所有模型规模（7B-70B）和所有位宽（INT3/INT4）上一致优于 GPTQ

**视觉语言模型**（OpenFlamingo-9B COCO CIDEr↑）：
- INT4-g128 32-shot：AWQ **80.53** vs RTN 77.13 vs GPTQ 74.98（FP16=81.70）
- AWQ 将量化退化从 -4.57 降至 **-1.17**，实现 4× 压缩近乎无损

**系统效率**：
- TinyChat INT4 推理：3.2-3.3× speedup over HF FP16
- Llama-2-13B 在笔记本 RTX 4070 (8GB) 上达到 30 tokens/s
- Llama-2-70B 可部署在 NVIDIA Jetson Orin (64GB)

![AWQ 校准效率与泛化性](https://arxiv.org/html/2306.00978v2/x6.png)

**Figure 6**：左图显示 AWQ 仅需 16 条序列即可达到 GPTQ 192 条序列的精度；右图显示 AWQ 跨域校准仅增 0.5-0.6 PPL，而 GPTQ 增 2.3-4.9。

#### 🧪 练习题
```yaml
question: "AWQ 确定 salient weights 的依据是什么？"
options:
  A: "权重的 L2 范数大小"
  B: "对应输入激活通道的平均幅度"
  C: "权重梯度的大小"
  D: "Hessian 矩阵的对角元素"
answer: B
explanation: >
  AWQ 的核心发现是：权重的重要性应由其对应的输入激活幅度决定，
  而非权重自身的大小。实验表明基于权重 L2 范数选择的 FP16 通道
  几乎无法改善量化精度（与随机选择相当），而基于激活幅度选择的
  0.1%-1% 通道即可显著恢复性能。
```

### SmoothQuant

```yaml
id: smoothquant
num: 4
name: SmoothQuant
full_name: 平滑量化 (SmoothQuant)
year: '2023'
org: MIT/NVIDIA
parent: qat
paper_url: http://proceedings.mlr.press/v202/xiao23c.html
project_url: ''
category: quantization
motivation: 将激活量化难度平滑转移至权重
```

#### 📝 一句话总结
SmoothQuant 的核心目标是：将激活量化难度平滑转移至权重。

#### 🎯 核心要点
- 核心动机：将激活量化难度平滑转移至权重
- 演化来源：继承或改进自 qat
- 代表机构：MIT/NVIDIA

#### 🔬 深入细节
将激活量化难度平滑转移至权重


### ABQ-LLM

```yaml
id: abq_llm
num: 5
name: ABQ-LLM
full_name: 任意比特量化 (Arbitrary-Bit Quantization)
year: '2025'
org: 中科大
parent: awq
paper_url: https://ojs.aaai.org/index.php/AAAI/article/view/34385
project_url: ''
category: quantization
motivation: 实现任意比特量化推理加速
```

#### 📝 一句话总结
ABQ-LLM 的核心目标是：实现任意比特量化推理加速。

#### 🎯 核心要点
- 核心动机：实现任意比特量化推理加速
- 演化来源：继承或改进自 awq
- 代表机构：中科大

#### 🔬 深入细节
实现任意比特量化推理加速


### SpinQuant

```yaml
id: spinquant
num: 6
name: SpinQuant
full_name: 旋转量化 (SpinQuant)
year: '2025'
org: Meta
parent: gptq
paper_url: https://proceedings.iclr.cc/paper_files/paper/2025/hash/e5b1c0d4866f72393c522c8a00eed4eb-Abstract-Conference.html
project_url: ''
category: quantization
motivation: 学习旋转矩阵减少量化误差
```

#### 📝 一句话总结
SpinQuant 提出在 Transformer 的四个旋转不变位置插入可学习的正交旋转矩阵，通过 Cayley SGD 在 Stiefel 流形上优化旋转参数以消除激活/权重中的离群值，使 W4A4KV4 量化在 LLaMA-2 7B 上仅损失 2.9 个百分点精度，大幅超越 SmoothQuant、LLM-QAT 和 QuaRot 等方法。

#### 🎯 核心要点
- **旋转不变性**：识别 Transformer 中 4 个可插入正交旋转矩阵且不改变全精度输出的位置（残差流 \(R_1\)、注意力头 \(R_2\)、Query/Key \(R_3\)、FFN 下投影 \(R_4\)）
- **随机旋转方差大**：不同随机旋转矩阵导致量化后零样本推理精度差异高达 13 个百分点
- **Cayley SGD 优化**：在 Stiefel 流形上用 Cayley 变换优化 \(R_1, R_2\)，仅需 100 次迭代、800 个 WikiText2 样本、约 1.3 小时（7B 模型，单 A100）
- **极低额外参数**：优化的旋转矩阵仅占模型权重的 0.26%，且可吸收进相邻权重矩阵，无推理开销（\(R_3, R_4\) 使用在线 Hadamard 变换）
- **兼容 GPTQ**：可与 GPTQ 权重量化联合使用，进一步提升精度
- **SOTA 结果**：W4A4KV4 下 LLaMA-2 7B 仅 2.9pt gap（vs LLM-QAT 22pt, SmoothQuant 27pt）；LLaMA-3 70B 仅 4.4pt gap

#### 🔬 深入细节
##### 核心框架图

![SpinQuant 旋转位置示意图](https://ar5iv.labs.arxiv.org/html/2405.16406v3/assets/x1.png)
*图：SpinQuant 在 Transformer 块中的四个旋转插入位置。\(R_1\) 作用于残差流，\(R_2\) 作用于注意力输出，\(R_3\) 作用于 Q/K 向量，\(R_4\) 作用于 FFN 下投影层输入。其中 \(R_1, R_2\) 可吸收进权重矩阵（离线），\(R_3, R_4\) 需在线计算（使用高效 Hadamard 变换）。*

##### 算法伪代码

```python
# SpinQuant 旋转矩阵优化流程
# 输入: 预训练LLM权重 W, 校准集 D (800 samples from WikiText2)
# 输出: 优化后的旋转矩阵 R1, R2

# Step 1: 初始化旋转矩阵为随机 Hadamard 矩阵
R1 = random_hadamard(D_token, D_token)       # 残差流旋转
R2 = {l: random_hadamard(D_head, D_head)      # 每层每头的注意力旋转
       for l in range(num_layers)}
R3 = hadamard(D_head)                         # Q/K 旋转 (固定, 在线)
R4 = hadamard(D_intermediate)                 # FFN 旋转 (固定, 在线)

# Step 2: 将 R1, R2 吸收进权重 (不改变全精度输出)
W_rotated = absorb_rotations(W, R1, R2)

# Step 3: Cayley SGD 优化 (在 Stiefel 流形上)
for iteration in range(100):
    # 前向传播: 对旋转后的权重和激活进行量化
    loss = 0
    for batch in calibration_loader(D):
        # 量化权重和激活 (仅量化激活用于优化, 权重量化交给GPTQ)
        output = quantized_forward(W_rotated, batch, R3, R4)
        loss += cross_entropy(output, batch.labels)
    
    # 计算梯度并用 Cayley 变换更新
    grad = compute_gradient(loss, R1, R2)
    # Cayley 更新: R' = (I + η/2 · A)^{-1} (I - η/2 · A) R
    # 其中 A = grad @ R^T - R @ grad^T (反对称矩阵)
    R1 = cayley_update(R1, grad_R1, lr=1.5 * (1 - iteration/100))
    R2 = cayley_update(R2, grad_R2, lr=1.5 * (1 - iteration/100))
    
    # 重新吸收旋转进权重
    W_rotated = absorb_rotations(W, R1, R2)

# Step 4: 最终量化 (可选配合 GPTQ)
model_quantized = quantize(W_rotated, method="RTN_or_GPTQ", bits=4)
```

##### 动机与背景

**离群值问题**：LLM 的激活和权重中存在少量极端离群值（outliers），这些值拉伸了量化范围，导致大部分正常值只能使用很少的有效比特表示，造成严重的量化误差。例如，直接对 LLaMA-2 7B 进行 W4A4 RTN 量化，零样本精度从 66.9% 暴跌至 37.1%。

**随机旋转的局限**：QuIP 和 QuaRot 等工作发现，对权重/激活矩阵乘以随机正交矩阵可以统计性地"打散"离群值，使分布更均匀。然而 SpinQuant 的关键发现是：**不同的随机旋转矩阵之间存在巨大的性能差异**——在 LLaMA-2 7B W4A4KV4 设置下，100 个随机种子的零样本精度范围从约 53% 到 66%，差距高达 13 个百分点。这意味着随机选择旋转矩阵是一种"碰运气"的做法。

##### 核心机制：四个旋转位置

SpinQuant 系统性地识别了 Transformer 中四个满足**旋转不变性**的位置，即插入正交矩阵 \(R\)（满足 \(RR^T = I\)）后不改变全精度网络的输出：

**\(R_1\) — 残差流旋转（Residual Rotation）**

在每个 Transformer 块的残差连接处插入旋转。由于 RMSNorm 对旋转不变（\(\text{RMSNorm}(Rx) = R \cdot \text{RMSNorm}(x)\)），可以将 \(R_1\) 吸收进相邻的线性层权重中：

$$W'_{\text{proj}} = W_{\text{proj}} \cdot R_1^T, \quad W'_{\text{out}} = R_1 \cdot W_{\text{out}}$$

这样 \(R_1\) 不引入任何推理开销。\(R_1\) 的维度为 \(D_{\text{token}} \times D_{\text{token}}\)（如 LLaMA-2 7B 为 4096×4096）。

> 💡 **关键**：\(R_1\) 同时改变了输入到注意力层和 FFN 层的激活分布，以及所有投影矩阵的权重分布，是影响最大的旋转位置。

**\(R_2\) — 注意力头内旋转（MHSA Rotation）**

在每个注意力头的 Value 投影和 Output 投影之间插入逐头旋转矩阵。由于 \(V \cdot R_2^T\) 和 \(R_2 \cdot W_O\) 可以分别吸收进 \(W_V\) 和 \(W_O\)，同样无推理开销。维度为 \(D_{\text{head}} \times D_{\text{head}}\)（如 128×128），每层独立学习。

**\(R_3\) — Query/Key Hadamard 旋转**

对 Query 和 Key 向量在每个头内施加 Hadamard 变换。由于 RoPE 位置编码的存在，\(R_3\) 无法吸收进权重（RoPE 对非对角旋转不不变），必须在线计算。但 Hadamard 变换的计算复杂度仅为 \(O(d \log d)\)，开销极小。

**\(R_4\) — FFN 下投影 Hadamard 旋转**

在 FFN 的 Gate/Up 投影输出与 Down 投影输入之间插入 Hadamard 变换。由于 SiLU 激活函数的非线性，\(R_4\) 同样无法吸收进权重，需在线计算。

> ⚠️ **注意**：\(R_1, R_2\) 通过 Cayley SGD 优化学习；\(R_3, R_4\) 保持为固定的 Hadamard 矩阵（在线高效计算）。这种设计平衡了优化效果和推理效率。

##### Cayley SGD 优化

旋转矩阵必须保持正交性（\(RR^T = I\)），这意味着优化空间是 **Stiefel 流形**而非欧氏空间。SpinQuant 采用 Cayley SGD 方法：

1. 计算欧氏梯度 \(\nabla_R \mathcal{L}\)
2. 构造反对称矩阵 \(A = \nabla_R \mathcal{L} \cdot R^T - R \cdot (\nabla_R \mathcal{L})^T\)
3. 通过 Cayley 变换更新：

$$R' = \left(I + \frac{\eta}{2} A\right)^{-1} \left(I - \frac{\eta}{2} A\right) R$$

这保证了更新后的 \(R'\) 仍然是正交矩阵。整个优化过程：
- 学习率从 1.5 线性衰减到 0
- 仅 100 次迭代，800 个 WikiText2 校准样本
- LLaMA-2 7B 约 1.25 小时（8×A100），LLaMA-3 8B 约 1.39 小时
- 从不同随机种子初始化，优化后的结果方差极小

##### 与 GPTQ 的协同

SpinQuant 发现一个重要的实践技巧：当同时量化权重和激活时，应**仅针对激活量化误差优化旋转矩阵**（即在 W16A4 设置下优化），然后再用 GPTQ 处理权重量化误差。这种分工策略比同时优化两者效果更好，因为 GPTQ 已经能很好地处理权重量化误差，而旋转矩阵更擅长处理激活分布的不均匀性。

##### 实验结果亮点

| 设置 | 模型 | SpinQuant | QuaRot | LLM-QAT | FP |
|------|------|-----------|--------|---------|-----|
| W4A4KV4 | LLaMA-2 7B | 64.0 | 62.5 | 44.9 | 66.9 |
| W4A4KV4 | LLaMA-2 13B | 66.9 | 66.2 | — | 68.3 |
| W4A4KV4 | LLaMA-2 70B | 71.2 | 70.3 | — | 72.9 |
| W4A4KV4 | LLaMA-3 8B | 65.2 | 63.3 | 43.2 | 69.6 |
| W4A4KV4 | LLaMA-3 70B | 69.3 | 65.1 | — | 74.5 |

> 💡 **关键**：SpinQuant 在最具挑战性的 W4A4KV4 设置下，将 LLaMA-2 7B 与全精度的差距缩小到仅 2.9 个百分点，而 LLM-QAT 差距为 22 个百分点，SmoothQuant 差距为 27 个百分点。在 LLaMA-3 70B 上，SpinQuant 将差距从 QuaRot 的 9.4pt 缩小到 5.2pt。

##### 各旋转位置的贡献（消融实验）

- **无旋转**：W4A4KV4 精度仅约 38%（几乎不可用）
- **仅 \(R_1\)**：精度大幅提升，是最重要的单一旋转位置
- **\(R_1 + R_2\)**：进一步改善注意力层的量化质量
- **\(R_1 + R_2 + R_3 + R_4\)**（全部）：达到最佳效果
- **Cayley 优化 vs 随机**：优化后的旋转比最佳随机旋转（100 种子中最好的）还要好，且方差极小

#### 🧪 练习题
```yaml
question: "SpinQuant 中为什么 R3（Query/Key 旋转）不能像 R1 那样吸收进权重矩阵？"
options:
  - "因为 R3 的维度太大，无法存储"
  - "因为 RoPE 位置编码的存在使得旋转无法与权重合并"
  - "因为 Query 和 Key 需要不同的旋转矩阵"
  - "因为注意力分数的 softmax 操作对旋转不不变"
answer: 1
explain: "RoPE 对每个位置施加不同的旋转，与 R3 不可交换，因此 R3 无法被吸收进 W_Q/W_K 权重中，必须在推理时在线计算。"
```

### EfficientQAT

```yaml
id: efficientqat
num: 7
name: EfficientQAT
full_name: 高效量化感知训练 (EfficientQAT)
year: '2025'
org: 北大
parent: qat
paper_url: https://aclanthology.org/2025.acl-long.498/
project_url: ''
category: quantization
motivation: 显著降低大模型量化训练资源消耗
```

#### 📝 一句话总结
EfficientQAT 的核心目标是：显著降低大模型量化训练资源消耗。

#### 🎯 核心要点
- 核心动机：显著降低大模型量化训练资源消耗
- 演化来源：继承或改进自 qat
- 代表机构：北大

#### 🔬 深入细节
显著降低大模型量化训练资源消耗


### Lottery Ticket

```yaml
id: lottery_ticket
num: 8
name: Lottery Ticket
full_name: 彩票假设 (Lottery Ticket Hypothesis)
year: '2019'
org: MIT
parent: —
paper_url: https://arxiv.org/abs/1803.03635
project_url: ''
category: pruning
motivation: 发现网络中存在可训练稀疏子网络
```

#### 📝 一句话总结
彩票假设提出：随机初始化的稠密网络中存在稀疏子网络（"中奖彩票"），这些子网络在使用**原始初始化权重**单独训练时，能以不超过原网络的迭代次数达到相当甚至更优的测试精度，从而揭示了初始化与网络结构的深层耦合关系。

#### 🎯 核心要点
- **彩票假设定义**：稠密随机初始化的前馈网络包含稀疏子网络（winning tickets），单独训练可匹配原网络精度且训练时间相当
- **基于幅值的非结构化剪枝**：训练后按权重绝对值大小剪枝，保留幅值最大的连接
- **权重回卷（Weight Rewinding）**：剪枝后将存活连接的权重重置为训练前的原始初始化值 \(\theta_0\)，而非保留训练后的值
- **迭代剪枝（Iterative Pruning）**：多轮"训练→剪枝→回卷"循环，每轮剪去 \(p^{1/n}\%\) 存活权重，比一次性剪枝找到更小的 winning tickets
- **初始化的关键性**：随机重新初始化相同结构的子网络无法复现 winning ticket 的性能，证明特定初始化是成功的关键
- **实验覆盖**：在 Lenet/MNIST 和 Conv-2/4/6/CIFAR10 上验证，winning tickets 通常仅为原网络 10-20% 的参数量
- **学习率敏感性**：在较深网络中，需要学习率预热（warmup）才能成功找到 winning tickets

#### 🔬 深入细节
![Lottery Ticket 核心实验结果](https://ar5iv.labs.arxiv.org/html/1803.03635/assets/x1.png)
*图：不同剪枝比例下 winning tickets（实线）与随机稀疏子网络（虚线）的 early-stopping 迭代次数（左）和测试精度（右）对比。Winning tickets 在大幅剪枝后仍能保持甚至超越原网络性能。*

![网络架构](https://ar5iv.labs.arxiv.org/html/1803.03635/assets/x2.png)
*图：论文中测试的网络架构，包括 Lenet（全连接）和 Conv-2/4/6（卷积，VGG 变体）。*

##### 算法伪代码

```python
# Lottery Ticket 迭代剪枝算法
# 输入：网络 f(x; θ)，剪枝轮数 n，总剪枝比例 p%
# 输出：winning ticket 子网络 f(x; m ⊙ θ_0)

θ_0 = random_init()           # Step 1: 随机初始化
m = ones(|θ_0|)               # 初始 mask 全为 1

for round in range(n):
    θ_j = train(f, m ⊙ θ_0)  # Step 2: 用当前 mask 和原始初始化训练至收敛
    # Step 3: 按幅值剪枝，每轮剪去存活权重的 p^(1/n)%
    scores = abs(θ_j) * m
    threshold = percentile(scores[scores > 0], p ** (1/n))
    m = m * (scores >= threshold).float()
    # Step 4: 权重回卷至 θ_0（不保留训练后的权重）

# 最终输出：f(x; m ⊙ θ_0) 即为 winning ticket
```

##### 动机与背景

传统神经网络剪枝（如 Han et al., 2015; LeCun et al., 1990）已经证明训练好的网络可以在不损失精度的情况下减少 90% 以上的参数。然而，这些方法的标准流程是"先训练大网络→剪枝→微调"，剪枝后的稀疏网络依赖训练后的权重作为微调起点。一个自然的问题是：**能否直接从头训练这些小网络？** 当时的经验表明这是困难的——随机初始化的小网络通常无法达到大网络的精度（Li et al., 2016; Han et al., 2015 均有类似观察）。

彩票假设对这一现象给出了全新的解释：问题不在于小网络本身缺乏容量，而在于**初始化**。稠密网络之所以容易训练，是因为它包含了大量可能的子网络，其中某些子网络恰好获得了"幸运"的初始化——这些就是"中奖彩票"。

##### 核心机制详解

**形式化定义。** 考虑稠密网络 \(f(x; \theta)\)，初始参数 \(\theta = \theta_0 \sim \mathcal{D}_\theta\)。通过 SGD 训练后在第 \(j\) 次迭代达到最小验证损失 \(l\)，测试精度为 \(a\)。现在考虑带掩码的子网络 \(f(x; m \odot \theta)\)，其中 \(m \in \{0,1\}^{|\theta|}\)，初始化为 \(m \odot \theta_0\)。彩票假设预测存在掩码 \(m\) 使得：

$$j' \leq j \quad (\text{训练时间相当}), \quad a' \geq a \quad (\text{精度相当}), \quad \|m\|_0 \ll |\theta| \quad (\text{参数更少})$$

这一假设的关键在于三个条件同时满足：子网络不仅更小，而且训练速度不慢、精度不低。

**权重回卷的重要性。** 与传统剪枝方法保留训练后权重不同，彩票假设的核心操作是将存活连接的权重**重置为原始初始化值** \(\theta_0\)。这一设计的目的是验证：特定的初始化（而非训练后的权重）才是 winning ticket 成功的根本原因。实验证实，如果对同一子网络结构使用新的随机初始化 \(\theta_0' \sim \mathcal{D}_\theta\)，性能将显著下降，说明结构本身不足以解释 winning ticket 的成功。

> 💡 **关键洞察**：Winning ticket 的成功源于初始化权重与网络结构的特定组合，而非单纯的网络拓扑。这意味着"哪些连接被保留"和"这些连接的初始值是什么"同等重要。

**一次性剪枝 vs 迭代剪枝。** 一次性剪枝（one-shot）直接训练一次后剪去 \(p\%\) 的权重。迭代剪枝（iterative pruning）将这一过程分为 \(n\) 轮，每轮剪去存活权重的 \(p^{1/n}\%\)。例如，若目标剪枝率为 \(p = 90\%\)，分 \(n = 10\) 轮，则每轮剪去约 \(90^{0.1}\% \approx 79.4\%\) 的存活权重（即保留约 20.6%）。迭代剪枝的优势在于每轮的剪枝决策基于更精确的权重重要性估计，因此能找到更小的 winning tickets。

> ⚠️ **注意**：迭代剪枝的计算成本很高——需要反复训练网络 \(n\) 次以上。这也是该方法的主要局限之一，使其难以直接扩展到 ImageNet 等大规模任务。

##### 与传统方法的区别

| 方面 | 传统剪枝（Han et al., 2015） | 彩票假设 |
|------|------|------|
| **目标** | 压缩已训练模型 | 发现可从头训练的稀疏子网络 |
| **剪枝后权重** | 保留训练后的权重，继续微调 | 回卷至原始初始化 \(\theta_0\) |
| **训练流程** | 训练→剪枝→微调 | 训练→剪枝→回卷→从头训练 |
| **核心发现** | 训练后的网络可压缩 | 稠密网络中存在可训练的稀疏子网络 |
| **初始化角色** | 不关注 | 核心——特定初始化是成功关键 |

##### 主要实验发现

论文在 Lenet（全连接，MNIST）和 Conv-2/4/6（卷积，CIFAR10）上进行了系统实验：

1. **Winning tickets 普遍存在**：在所有测试架构中，均能找到仅占原网络 10-20% 参数的 winning tickets，且测试精度不低于原网络。
2. **Winning tickets 学习更快**：在剪枝比例适中时，winning tickets 不仅精度更高，而且收敛速度更快（early-stopping 迭代次数更少）。
3. **随机重初始化失败**：将 winning ticket 的结构保留但随机重新初始化权重后，性能大幅下降，证明初始化的关键作用。
4. **迭代剪枝优于一次性剪枝**：迭代剪枝能在更高压缩率下找到有效的 winning tickets。
5. **学习率敏感性**：在 Conv-4/6 等较深网络中，使用较大学习率时需要 warmup 策略才能成功找到 winning tickets。

#### 🧪 练习题
```yaml
question: "在彩票假设的实验中，剪枝后对存活连接的权重进行什么操作？"
options:
  - "保留训练后的权重值，直接进行推理"
  - "将权重重置为原始随机初始化值 θ_0，重新训练"
  - "将权重全部设为零，重新训练"
  - "用新的随机值重新初始化权重，重新训练"
answer: 1
explain: "彩票假设的核心操作是'权重回卷'——将存活连接的权重重置为训练前的原始初始化值 θ_0，而非保留训练后的权重或重新随机初始化。实验证明正是这些特定的初始化值使得 winning ticket 能够成功训练。"
```

### Movement Pruning

```yaml
id: movement_pruning
num: 9
name: Movement Pruning
full_name: 运动剪枝 (Movement Pruning)
year: '2020'
org: HuggingFace
parent: lottery_ticket
paper_url: https://proceedings.neurips.cc/paper/2020/hash/eae15aabaa768ae4a5993a8a4f4fa6e4-Abstract.html
project_url: ''
category: pruning
motivation: 微调中根据权重趋势动态剪枝
```

#### 📝 一句话总结
Movement Pruning 的核心目标是：微调中根据权重趋势动态剪枝。

#### 🎯 核心要点
- 核心动机：微调中根据权重趋势动态剪枝
- 演化来源：继承或改进自 lottery_ticket
- 代表机构：HuggingFace

#### 🔬 深入细节
微调中根据权重趋势动态剪枝


### SparseGPT

```yaml
id: sparsegpt
num: 10
name: SparseGPT
full_name: 稀疏GPT (SparseGPT)
year: '2023'
org: ISTA
parent: gptq
paper_url: https://arxiv.org/abs/2301.00774
project_url: ''
category: pruning
motivation: 首个支持千亿参数模型一键剪枝
```

#### 📝 一句话总结
SparseGPT 的核心目标是：首个支持千亿参数模型一键剪枝。

#### 🎯 核心要点
- 核心动机：首个支持千亿参数模型一键剪枝
- 演化来源：继承或改进自 gptq
- 代表机构：ISTA

#### 🔬 深入细节
首个支持千亿参数模型一键剪枝


### SAAP

```yaml
id: saap
num: 11
name: SAAP
full_name: 结构感知自适应剪枝 (SAAP)
year: '2026'
org: IEEE
parent: sparsegpt
paper_url: https://ieeexplore.ieee.org/abstract/document/11360603/
project_url: ''
category: pruning
motivation: 维持LLM理解能力的结构感知剪枝
```

#### 📝 一句话总结
SAAP 的核心目标是：维持LLM理解能力的结构感知剪枝。

#### 🎯 核心要点
- 核心动机：维持LLM理解能力的结构感知剪枝
- 演化来源：继承或改进自 sparsegpt
- 代表机构：IEEE

#### 🔬 深入细节
维持LLM理解能力的结构感知剪枝


### ReplaceMe

```yaml
id: replaceme
num: 12
name: ReplaceMe
full_name: 深度剪枝替换 (ReplaceMe)
year: '2026'
org: NeurIPS
parent: movement_pruning
paper_url: https://proceedings.neurips.cc/paper_files/paper/2025/hash/1c10d0c087c14689628124bbc8fa69f6-Abstract-Conference.html
project_url: ''
category: pruning
motivation: 深度剪枝与Transformer块线性化
```

#### 📝 一句话总结
ReplaceMe 的核心目标是：深度剪枝与Transformer块线性化。

#### 🎯 核心要点
- 核心动机：深度剪枝与Transformer块线性化
- 演化来源：继承或改进自 movement_pruning
- 代表机构：NeurIPS

#### 🔬 深入细节
深度剪枝与Transformer块线性化


### ViTCoP

```yaml
id: vitcop
num: 13
name: ViTCoP
full_name: 视觉文本协同剪枝 (ViTCoP)
year: '2026'
org: arXiv
parent: saap
paper_url: https://arxiv.org/abs/2601.17818
project_url: ''
category: pruning
motivation: 视觉与文本语义协同加速多模态
```

#### 📝 一句话总结
ViTCoP 的核心目标是：视觉与文本语义协同加速多模态。

#### 🎯 核心要点
- 核心动机：视觉与文本语义协同加速多模态
- 演化来源：继承或改进自 saap
- 代表机构：arXiv

#### 🔬 深入细节
视觉与文本语义协同加速多模态


### Hinton KD

```yaml
id: hinton_kd
num: 14
name: Hinton KD
full_name: 知识蒸馏 (Knowledge Distillation)
year: '2015'
org: Google
parent: —
paper_url: https://arxiv.org/abs/1503.02531
project_url: ''
category: distillation
motivation: 引入Soft Targets和温度系数T
```

#### 📝 一句话总结
Hinton KD 的核心目标是：引入Soft Targets和温度系数T。

#### 🎯 核心要点
- 核心动机：引入Soft Targets和温度系数T
- 代表机构：Google

#### 🔬 深入细节
引入Soft Targets和温度系数T


### DistilBERT

```yaml
id: distilbert
num: 15
name: DistilBERT
full_name: 蒸馏BERT (DistilBERT)
year: '2019'
org: HuggingFace
parent: hinton_kd
paper_url: https://arxiv.org/abs/1910.01108
project_url: ''
category: distillation
motivation: 预训练阶段三重损失蒸馏保留97%性能
```

#### 📝 一句话总结
DistilBERT 的核心目标是：预训练阶段三重损失蒸馏保留97%性能。

#### 🎯 核心要点
- 核心动机：预训练阶段三重损失蒸馏保留97%性能
- 演化来源：继承或改进自 hinton_kd
- 代表机构：HuggingFace

#### 🔬 深入细节
预训练阶段三重损失蒸馏保留97%性能


### TinyBERT

```yaml
id: tinybert
num: 16
name: TinyBERT
full_name: 微型BERT (TinyBERT)
year: '2020'
org: 华为
parent: distilbert
paper_url: https://aclanthology.org/2020.findings-emnlp.372/
project_url: ''
category: distillation
motivation: 两阶段蒸馏涵盖嵌入中间预测层
```

#### 📝 一句话总结
TinyBERT 的核心目标是：两阶段蒸馏涵盖嵌入中间预测层。

#### 🎯 核心要点
- 核心动机：两阶段蒸馏涵盖嵌入中间预测层
- 演化来源：继承或改进自 distilbert
- 代表机构：华为

#### 🔬 深入细节
两阶段蒸馏涵盖嵌入中间预测层


### MiniLLM

```yaml
id: minillm
num: 17
name: MiniLLM
full_name: 最小化LLM (MiniLLM)
year: '2024'
org: 微软
parent: tinybert
paper_url: https://arxiv.org/abs/2306.08543
project_url: ''
category: distillation
motivation: 反向KL散度蒸馏大语言模型
```

#### 📝 一句话总结
MiniLLM 的核心目标是：反向KL散度蒸馏大语言模型。

#### 🎯 核心要点
- 核心动机：反向KL散度蒸馏大语言模型
- 演化来源：继承或改进自 tinybert
- 代表机构：微软

#### 🔬 深入细节
反向KL散度蒸馏大语言模型


### ActivePrune

```yaml
id: activeprune
num: 18
name: ActivePrune
full_name: 主动剪枝蒸馏 (ActivePrune)
year: '2026'
org: EACL
parent: minillm
paper_url: https://aclanthology.org/2026.findings-eacl.229/
project_url: ''
category: distillation
motivation: 结合数据剪枝与蒸馏的主动学习
```

#### 📝 一句话总结
ActivePrune 的核心目标是：结合数据剪枝与蒸馏的主动学习。

#### 🎯 核心要点
- 核心动机：结合数据剪枝与蒸馏的主动学习
- 演化来源：继承或改进自 minillm
- 代表机构：EACL

#### 🔬 深入细节
结合数据剪枝与蒸馏的主动学习


### Longformer

```yaml
id: longformer
num: 19
name: Longformer
full_name: 长文档Transformer (Longformer)
year: '2020'
org: Allen AI
parent: —
paper_url: https://arxiv.org/abs/2004.05150
project_url: ''
category: sparsity_deploy
motivation: 局部窗口+全局注意力实现线性复杂度
```

#### 📝 一句话总结
Longformer 的核心目标是：局部窗口+全局注意力实现线性复杂度。

#### 🎯 核心要点
- 核心动机：局部窗口+全局注意力实现线性复杂度
- 代表机构：Allen AI

#### 🔬 深入细节
局部窗口+全局注意力实现线性复杂度


### BigBird

```yaml
id: bigbird
num: 20
name: BigBird
full_name: 大鸟 (BigBird)
year: '2020'
org: Google
parent: longformer
paper_url: https://proceedings.neurips.cc/paper/2020/hash/c8512d142a2d849725f31a9a7a361ab9-Abstract.html
project_url: ''
category: sparsity_deploy
motivation: 引入随机注意力块保持全图连通
```

#### 📝 一句话总结
BigBird 的核心目标是：引入随机注意力块保持全图连通。

#### 🎯 核心要点
- 核心动机：引入随机注意力块保持全图连通
- 演化来源：继承或改进自 longformer
- 代表机构：Google

#### 🔬 深入细节
引入随机注意力块保持全图连通


### N:M Sparsity

```yaml
id: nm_sparsity
num: 21
name: N:M Sparsity
full_name: N:M细粒度稀疏 (N:M Sparsity)
year: '2021'
org: NVIDIA
parent: —
paper_url: https://arxiv.org/abs/2102.04010
project_url: ''
category: sparsity_deploy
motivation: 硬件原生2:4稀疏兼顾精度与加速
```

#### 📝 一句话总结
N:M Sparsity 的核心目标是：硬件原生2:4稀疏兼顾精度与加速。

#### 🎯 核心要点
- 核心动机：硬件原生2:4稀疏兼顾精度与加速
- 代表机构：NVIDIA

#### 🔬 深入细节
硬件原生2:4稀疏兼顾精度与加速


### PermLLM

```yaml
id: permllm
num: 22
name: PermLLM
full_name: 可学习排列LLM (PermLLM)
year: '2026'
org: NeurIPS
parent: nm_sparsity
paper_url: https://proceedings.neurips.cc/paper_files/paper/2025/hash/1d3fe3adb016edebc4fa615c25d22cb0-Abstract-Conference.html
project_url: ''
category: sparsity_deploy
motivation: 可学习通道排列优化N:M稀疏精度
```

#### 📝 一句话总结
PermLLM 发现手工设计的通道排列指标与实际剪枝损失几乎不相关，转而将排列矩阵参数化为可学习的 Sinkhorn 双随机矩阵，配合 block-wise 分解和 STE 梯度传递，端到端学习最优通道排列，在 LLaMA/Qwen 等模型的 2:4 和 4:8 稀疏下大幅超越现有通道排列方法（如 LLaMA-3.1 8B 2:4 PPL 从 21.09 降至 14.03）。

#### 🎯 核心要点
- **核心发现**：手工排列指标（最大化保留权重重要性之和）与实际剪枝损失的 Spearman 相关系数仅 0.09–0.28，说明现有启发式排列策略本质上是在错误的代理目标上优化
- **可微排列学习**：将排列矩阵松弛为双随机矩阵（Sinkhorn 归一化），前向用 Hungarian 算法硬化为真排列矩阵，反向用 STE 穿透离散操作传梯度
- **Block-wise 分解**：将 $C_{in} \times C_{in}$ 排列矩阵分解为 $N_B$ 个 $B \times B$ 块对角矩阵，参数量从 $O(C_{in}^2)$ 降至 $O(C_{in} \cdot B)$，Hungarian 复杂度从 $O(C_{in}^3)$ 降至 $O(C_{in} \cdot B^2)$
- **即插即用**：PermLLM 可与任意 N:M 剪枝指标（Wanda、RIA）组合，仅需 128 条校准样本、约 2.5 小时（7B/4×GPU）即可完成排列学习
- **高效部署**：设计 CUDA kernel 实现 block-wise 排列，相比 PyTorch 原生实现加速 84×，排列开销可忽略

#### 🔬 深入细节
##### 问题动机

![Figure 1: 手工排列指标与实际剪枝损失的对比](https://ar5iv.labs.arxiv.org/html/2510.10136/assets/x1.png)

**Figure 1**：对同一层的不同通道排列，手工指标 Score $S$（保留权重重要性之和）最高的排列（左图）实际剪枝损失反而最大；而 Score 较低的排列（右图）实际损失最小。这说明最大化 $S$ 是一个错误的代理目标。

##### 方法概览

![Figure 2: PermLLM 框架](https://ar5iv.labs.arxiv.org/html/2510.10136/assets/x2.png)

**Figure 2**：PermLLM 整体流程。对每个线性层：(1) 学习 block-wise 排列矩阵 $P_B$；(2) 对权重施加排列 $W \cdot P_B$；(3) 基于剪枝指标生成 N:M mask $M$；(4) 最小化稀疏输出与稠密输出的距离。

##### Sinkhorn 可微排列

**核心思想**：排列矩阵 $P \in \{0,1\}^{n \times n}$ 是离散的，无法直接求梯度。PermLLM 将其松弛为双随机矩阵（每行每列之和均为 1 的非负矩阵），通过 Sinkhorn 归一化实现：

$$\hat{P} = \text{Sinkhorn}(W_P, \tau) \quad \text{where} \quad W_P \in \mathbb{R}^{n \times n} \text{ is learnable}$$

Sinkhorn 迭代过程：
1. 初始化：$S^{(0)} = \exp(W_P / \tau)$（温度 $\tau$ 控制软硬程度）
2. 行归一化：$S^{(l)} = S^{(l-1)} \oslash (S^{(l-1)} \mathbf{1} \mathbf{1}^\top)$
3. 列归一化：$S^{(l)} = S^{(l)} \oslash (\mathbf{1} \mathbf{1}^\top S^{(l)})$
4. 重复 $L$ 次（默认 $L=5$），得到软排列 $\hat{P}$

**前向硬化**：用 Hungarian 算法从 $\hat{P}$ 提取最优硬排列 $P^* = \text{Hungarian}(\hat{P})$

**反向 STE**：$\nabla_{W_P} \mathcal{L} = \nabla_{\hat{P}} \mathcal{L}$（梯度直接穿透 Hungarian 操作传给软排列）

**温度退火**：$\tau$ 从 1 线性衰减到 0.1，使训练初期探索充分、后期逼近离散解。

##### Block-wise 排列

全排列矩阵 $P \in \mathbb{R}^{C_{in} \times C_{in}}$ 参数量和 Hungarian 复杂度过高（如 $C_{in}=4096$）。PermLLM 将其分解为块对角结构：

$$P_B = \text{diag}(P_1, P_2, \ldots, P_{N_B}), \quad N_B = C_{in} / B$$

每个 $P_i \in \mathbb{R}^{B \times B}$，默认 $B=64$。这意味着排列只在每个大小为 $B$ 的通道块内进行，跨块通道顺序不变。

**复杂度对比**：

| | 参数量 | Hungarian 复杂度 |
|---|---|---|
| 全排列 | $C_{in}^2$ | $O(C_{in}^3)$ |
| Block-wise | $C_{in} \times B$ | $O(C_{in} \cdot B^2)$ |

当 $B=64, C_{in}=4096$：参数从 16.8M 降至 262K（64×），复杂度从 $O(10^{10})$ 降至 $O(10^6)$。

##### Mask 生成与 STE

给定排列后的权重 $W \cdot P_B^*$ 和剪枝指标（如 Wanda: $|w_{ij}| \cdot \|x_j\|_2$），计算重要性分数 $S$。

**前向**：在每个 M 元素组内，用 argmax 选择 top-N 生成硬 mask $M^*$

**反向**：用 softmax 近似 argmax 以传递梯度：

$$\hat{M}_{ij} = \frac{\exp(S_{ij} / t)}{\sum_{k \in \text{group}} \exp(S_{ik} / t)}$$

STE 使得梯度可以从 mask 传回排列矩阵参数。

##### 损失函数

逐层优化，最小化稀疏层输出与稠密层输出的余弦距离：

$$\mathcal{L} = 1 - \cos(Y_{\text{dense}}, \; Y_{\text{sparse}})$$

其中 $Y_{\text{sparse}} = (M^* \odot (W \cdot P_B^*)) \cdot X$，$Y_{\text{dense}} = W \cdot X$。

##### 算法伪代码

```
Algorithm: PermLLM — Learnable Channel Permutation for N:M Sparsity
Input: 预训练权重 W ∈ R^{C_out × C_in}, 校准集输入 X, 
       block_size B=64, Sinkhorn iter L=5, τ: 1→0.1
Output: 最优排列 P*_B, 稀疏 mask M*

1. 初始化 W_P ∈ R^{N_B × B × B} (N_B = C_in/B 个块)
2. for each training step:
   a. Sinkhorn 归一化:
      for each block i = 1..N_B:
          P̂_i = Sinkhorn(W_P[i], τ)      // 软双随机矩阵
          P*_i = Hungarian(P̂_i)           // 硬排列矩阵
      P*_B = diag(P*_1, ..., P*_NB)
   b. 排列权重: W_perm = W · P*_B
   c. 计算重要性: S = metric(W_perm, X)   // e.g., Wanda
   d. 生成 mask:
      前向: M* = argmax_N:M(S)            // 硬 mask
      反向: M̂ = softmax_N:M(S/t)          // 软 mask (STE)
   e. 稀疏输出: Y_sparse = (M* ⊙ W_perm) · X
   f. 损失: L = 1 - cos(W·X, Y_sparse)
   g. 反向传播: ∇W_P via STE through Hungarian and argmax
   h. 更新 W_P (AdamW, lr ∈ {1e-3, 5e-3})
   i. 线性衰减 τ
3. 返回 P*_B, M*
```

##### 实验结果

**主要结果（WikiText-2 PPL，↓ 更好）**：

| 模型 | 稀疏度 | Wanda | Wanda+CP | PermLLM_Wanda |
|---|---|---|---|---|
| LLaMA-2 7B | 2:4 | 12.03 | 12.02 | **11.07** |
| LLaMA-2 13B | 2:4 | 9.54 | 9.37 | **8.85** |
| LLaMA-3.1 8B | 2:4 | 15.82 | 21.09 | **14.03** |
| Qwen-2.5 7B | 2:4 | 13.10 | 12.83 | **11.63** |

- Wanda+CP 使用手工排列指标（最大化保留权重重要性之和），在 LLaMA-3.1 上反而严重恶化（21.09 vs 15.82），验证了手工指标的不可靠性
- PermLLM 在所有模型和稀疏度设置下均一致优于基线
- 与 RIA 指标组合同样有效：LLaMA-2 7B 2:4 PPL 从 11.49 降至 10.75

**部署效率**：自定义 CUDA kernel 实现 block-wise 排列，相比 PyTorch 原生 `index_select` 加速 **84×**（0.01ms vs 0.84ms per layer），额外延迟可忽略。

**训练开销**：128 条 C4 校准样本，序列长度 1024，LLaMA-2 7B 在 4×A100 上约 2.5 小时。

#### 🧪 练习题
```yaml
**Q1**：为什么 PermLLM 不直接优化全排列矩阵 $P \in \mathbb{R}^{C_{in} \times C_{in}}$，而要使用 block-wise 分解？如果 block_size 设为 $C_{in}$（即全排列），会发生什么？

<details><summary>参考答案</summary>

全排列矩阵的参数量为 $C_{in}^2$（如 4096² = 16.8M），Hungarian 算法复杂度为 $O(C_{in}^3)$（如 $O(10^{10})$），在 LLM 的每个线性层上都不可接受。Block-wise 分解将参数量降至 $C_{in} \times B$，Hungarian 复杂度降至 $O(C_{in} \cdot B^2)$。如果 $B = C_{in}$，则退化为全排列，训练将极其缓慢且内存不足。论文消融实验表明 $B=64$ 已接近最优，更大的 $B$ 收益递减。

</details>

**Q2**：PermLLM 中有两处使用了 STE（Straight-Through Estimator），分别是哪里？为什么需要 STE？

<details><summary>参考答案</summary>

两处 STE：
1. **排列矩阵硬化**：前向用 Hungarian 算法将软双随机矩阵 $\hat{P}$ 转为硬排列 $P^*$，反向时梯度直接传给 $\hat{P}$（跳过 Hungarian）
2. **Mask 生成**：前向用 argmax 在每个 M 元素组内选 top-N 生成硬 mask $M^*$，反向时用 softmax 近似 argmax 传递梯度

两处都涉及离散操作（Hungarian 和 argmax），其梯度为零或未定义。STE 通过在反向传播时用连续近似替代离散操作，使梯度能够流过这些不可微节点，从而实现端到端优化。

</details>

**Q3**：在 LLaMA-3.1 8B 上，Wanda+CP（手工排列）的 PPL 从 15.82 恶化到 21.09，而 PermLLM 则改善到 14.03。请解释为什么手工排列可能反而损害性能。

<details><summary>参考答案</summary>

手工排列方法（如 Channel Permutation）使用"最大化保留权重重要性之和"作为排列质量指标。但论文 Figure 1 表明，该指标与实际剪枝损失的 Spearman 相关系数仅 0.09–0.28，几乎不相关。这意味着手工指标可能将通道排列到一个看似"重要性分数高"但实际输出误差更大的配置。在 LLaMA-3.1 这种架构上，这种错误代理目标的危害尤为严重，导致排列后的剪枝质量反而不如不排列。PermLLM 直接优化真实目标（稀疏输出与稠密输出的余弦相似度），因此能找到真正最优的排列。

</details>
```

### GigaMoE

```yaml
id: gigamoe
num: 23
name: GigaMoE
full_name: 十亿像素MoE (GigaMoE)
year: '2026'
org: AAAI
parent: nm_sparsity
paper_url: https://ojs.aaai.org/index.php/AAAI/article/view/38810
project_url: ''
category: sparsity_deploy
motivation: 稀疏引导MoE高效十亿像素检测
```

#### 📝 一句话总结
GigaMoE 的核心目标是：稀疏引导MoE高效十亿像素检测。

#### 🎯 核心要点
- 核心动机：稀疏引导MoE高效十亿像素检测
- 演化来源：继承或改进自 nm_sparsity
- 代表机构：AAAI

#### 🔬 深入细节
稀疏引导MoE高效十亿像素检测


### HieraSparse

```yaml
id: hierasparse
num: 24
name: HieraSparse
full_name: 分层稀疏注意力 (HieraSparse)
year: '2026'
org: arXiv
parent: bigbird
paper_url: https://arxiv.org/abs/2604.16864
project_url: ''
category: sparsity_deploy
motivation: 分层半结构化稀疏KV注意力
```

#### 📝 一句话总结
HieraSparse 的核心目标是：分层半结构化稀疏KV注意力。

#### 🎯 核心要点
- 核心动机：分层半结构化稀疏KV注意力
- 演化来源：继承或改进自 bigbird
- 代表机构：arXiv

#### 🔬 深入细节
分层半结构化稀疏KV注意力
