---
domain: infra
topic_id: model_compression
topic_name: 模型压缩
page_icon: 🗜️
page_title: 模型压缩算法总结
page_subtitle: '{build_date} 版'
page_desc: 综述量化、剪枝、蒸馏与稀疏化部署的技术演进，涵盖从经典压缩范式到2026年最新前沿进展。
hero_pills:
- 🏷️ Quantization · Pruning · Distillation · Sparse Inference
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

!INCLUDE_RAW ../../temp/content_survey_bulk_20260614_174337/researcher_output/infra/model_compression/overview/zhihu__大模型量化技术原理：总结__8a8c4bf9/article.md

## 最新进展综述

!INCLUDE_RAW ../../temp/content_survey_bulk_20260614_174337/researcher_output/infra/model_compression/latest/zhihu__大模型推理部署内存告急？ICLR_2026六种量化与压缩方案帮你省显存__f14c41ea/article.md

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
GPTQ 提出了一种面向 GPT/OPT/BLOOM 等大语言模型的一次性后训练权重量化方法，用近似 Hessian 逆矩阵补偿量化误差，解决了二阶量化精度高但无法扩展到千亿参数模型的问题。

#### 🎯 核心要点
- 将每个线性层的权重量化写成保持层输出 \(\mathbf{W}\mathbf{X}\) 不变的局部重建问题
- 从 Optimal Brain Quantization 出发，用 \((2\mathbf{X}\mathbf{X}^\top+\lambda\mathbf{I})^{-1}\) 估计二阶敏感度
- 固定列顺序同步量化所有行，让全部行共享同一 Hessian 逆更新序列
- 引入 lazy batch update，把列级补偿累积到块级矩阵乘，提升 GPU 利用率
- 使用 Cholesky 形式存储 Hessian 逆信息，提升数值稳定性和运行速度
- 支持 3/4-bit 大模型权重量化，并在 175B 规模上约数小时完成量化

#### 🔬 深入细节
![GPTQ 量化流程图](https://ar5iv.labs.arxiv.org/html/2210.17323/assets/x3.png)
*图：GPTQ 按列递归量化一个权重块，并用 Cholesky 形式的 Hessian 逆信息更新尚未量化的权重。*

```python
# GPTQ 单层权重量化伪代码
H_inv = cholesky(inverse(2 * X @ X.T + lambda_ * I)).T
Q = zeros_like(W)

for block_start in range(0, W.num_cols, B):
    E = zeros(W.num_rows, B)
    for j in range(block_start, block_start + B):
        Q[:, j] = quantize(W[:, j])
        E[:, j - block_start] = (W[:, j] - Q[:, j]) / H_inv[j, j]
        W[:, j:block_start+B] -= outer(E[:, j - block_start],
                                       H_inv[j, j:block_start+B])
    W[:, block_start+B:] -= E @ H_inv[block_start:block_start+B, block_start+B:]
```

GPTQ 的目标不是重新训练模型，而是在少量校准样本上让量化后的每一层尽量复现原始层输出。对一个线性层，输入激活为 \(\mathbf{X}\)，权重为 \(\mathbf{W}\)，量化后的权重为 \(\mathbf{Q}\)，局部目标可写成：

$$
\min_{\mathbf{Q}}\|\mathbf{W}\mathbf{X}-\mathbf{Q}\mathbf{X}\|_2^2
$$

把该目标在权重附近二阶展开，可得到 Hessian 近似 \(\mathbf{H}=2\mathbf{X}\mathbf{X}^\top+\lambda\mathbf{I}\)。当第 \(j\) 列权重被量化为 \(\mathrm{quant}(\mathbf{w}_j)\) 时，GPTQ 用 Hessian 逆的对角线衡量该列误差的敏感度，并用非对角项把误差传播到后续未量化列：

$$
\mathbf{e}_j=\frac{\mathbf{w}_j-\mathrm{quant}(\mathbf{w}_j)}{[\mathbf{H}^{-1}]_{jj}}
$$

直觉上，若某个方向的 Hessian 对角值很大，说明输出对这个方向的扰动敏感，量化误差需要更谨慎地补偿；若某些权重列相关性强，非对角项会把当前误差分摊到未来列。

传统 OBQ 会为每一行独立选择和更新量化顺序，复杂度随行数重复放大。GPTQ 的关键工程化假设是固定列顺序对大模型足够有效，因此所有行共享同一个未量化列集合和同一套 Hessian 逆更新。这样复杂度从接近 \(O(d_{\text{row}}d_{\text{col}}^3)\) 降到 \(O(\max(d_{\text{row}}d_{\text{col}}^2,d_{\text{col}}^3))\)。

> 💡 关键：GPTQ 的精度来自二阶误差补偿，速度来自“所有行同步列顺序 + 块级 lazy update”。单独保留二阶公式而不做同步和分块，仍然难以在 175B 模型上落地。

Lazy batch update 解决的是 GPU 内存带宽问题。逐列更新会反复对巨大权重矩阵做低算术强度操作，无法充分利用 GPU。GPTQ 先在 \(B=128\) 左右的块内递归更新，等块处理完后再用一次矩阵乘把累计误差传播到剩余列，从而把大量小更新合并为更高吞吐的 GEMM。

与普通 round-to-nearest 量化相比，GPTQ 不只是把每个权重独立映射到最近量化点，而是在量化一个权重块时持续修正后续权重，因此能在 3/4-bit 下保持语言模型困惑度。与需要蒸馏或微调的量化方法相比，它只依赖校准数据前向统计，不需要反向训练，适合部署前快速压缩大模型。

#### 🧪 练习题
```yaml
question: "GPTQ 能扩展到千亿参数模型的关键原因是什么？"
options:
  - "逐权重搜索最优量化顺序"
  - "所有行共享固定列顺序和 Hessian 逆更新，并用块级 lazy update 提升吞吐"
  - "只量化激活而保留权重为 FP16"
  - "在量化后对模型进行完整预训练"
answer: 1
explain: "GPTQ 保留二阶补偿，但避免每行重复维护 Hessian 逆，并把列更新合并为块级矩阵操作，因此能在大模型上高效运行。"
```

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
SmoothQuant 提出一种训练自由的 W8A8 后训练量化方法，通过等价的逐通道缩放把大语言模型中难量化的激活离群值平滑迁移到更易量化的权重上，解决了激活 INT8 量化在大模型上严重掉点的问题。

#### 🎯 核心要点
- 观察到 LLM 的量化瓶颈主要来自激活通道中的系统性离群值，而权重分布相对平滑、对通道缩放更鲁棒
- 对每个线性层做数学等价变换：\(\mathbf{X}\mathbf{W}=(\mathbf{X}\mathrm{diag}(\mathbf{s})^{-1})(\mathrm{diag}(\mathbf{s})\mathbf{W})\)
- 使用少量校准样本离线估计平滑因子 \(\mathbf{s}\)，不需要反向传播或重新训练模型参数
- 用迁移强度 \(\alpha\) 控制激活和权重之间的量化难度分配，典型甜点区间约为 0.4 到 0.6
- 支持 Transformer 中线性层和 attention BMM 等主要计算密集算子走统一 INT8 GEMM/BMM 路径
- 在 OPT、BLOOM、GLM、LLaMA、MT-NLG 等模型上实现接近无损的 W8A8 推理，并报告最高 1.56 倍加速和 2 倍显存节省

#### 🔬 深入细节
![SmoothQuant 平滑量化直觉图](https://ar5iv.labs.arxiv.org/html/2211.10438/assets/x2.png)
*图：来源为论文 Figure 2 的 ar5iv 渲染。SmoothQuant 将激活中的跨通道尺度差异迁移到权重中，使平滑后的激活和调整后的权重都更适合 INT8 量化。*

```python
# SmoothQuant 离线校准与部署伪代码
def smoothquant_transform(model, calibration_batches, alpha=0.5):
    for layer in model.transformer_layers:
        for linear in layer.quantized_linears:
            # 1. 在校准集上统计该线性层输入激活的逐输入通道最大幅值
            x_absmax = collect_input_channel_absmax(linear, calibration_batches)
            # 2. 统计权重在相同输入通道上的最大幅值
            w_absmax = abs(linear.weight).amax(dim=0)
            eps = 1e-6

            # 3. 计算平滑因子：alpha 越大，越多难度从激活迁移到权重
            s = (x_absmax.clamp_min(eps) ** alpha) / (
                w_absmax.clamp_min(eps) ** (1 - alpha)
            )

            # 4. 做等价重参数化；工程实现中可把 1 / s 融合进前序 LayerNorm/Linear
            linear.weight = linear.weight * s.reshape(1, -1)
            linear.input_smoother = 1.0 / s

            # 5. 对平滑后的权重和运行时激活使用硬件友好的 INT8 量化
            linear.weight_int8, linear.weight_scale = quantize_weight_int8(linear.weight)
            linear.act_scale = calibrate_activation_scale(linear, calibration_batches)
    return export_int8_runtime(model)
```

LLM 的普通 W8A8 量化会失败，是因为少数激活通道的幅值远大于其他通道。对称均匀量化通常用最大绝对值确定量化步长：

$$
\bar{\mathbf{X}}^{\mathrm{INT8}}=
\left\lfloor\frac{\mathbf{X}^{\mathrm{FP16}}}{\Delta}\right\rceil,\quad
\Delta=\frac{\max(|\mathbf{X}|)}{2^{N-1}-1}
$$

当 \(\max(|\mathbf{X}|)\) 被离群值主导时，大部分非离群值只能落在很少的整数桶里，有效量化级数急剧下降。论文指出，激活离群值不是随机散落，而是长期集中在少数固定通道；这意味着如果能按输入通道缩放激活，就可以显著降低量化误差。但直接做激活 per-channel scaling 不适合标准 INT8 GEMM，因为缩放发生在矩阵乘的 inner dimension 上，硬件 kernel 难以高效插入。

SmoothQuant 的核心是把这个不可高效实现的激活逐通道缩放，改写成线性层的离线等价重参数化：

$$
\mathbf{Y}=\mathbf{X}\mathbf{W}
=\left(\mathbf{X}\mathrm{diag}(\mathbf{s})^{-1}\right)
\left(\mathrm{diag}(\mathbf{s})\mathbf{W}\right)
=\hat{\mathbf{X}}\hat{\mathbf{W}}
$$

这里 \(\mathbf{s}\) 是输入通道维度的平滑因子。平滑后的 \(\hat{\mathbf{X}}\) 不再有严重通道离群值，而权重 \(\hat{\mathbf{W}}\) 虽被相反方向放大，但权重原本更平坦，通常仍能被 INT8 良好表示。由于浮点函数完全等价，校准阶段只改变参数化方式，不改变模型预测函数；部署时 \(\mathbf{s}^{-1}\) 还可以融合到前序 LayerNorm 或前序线性层的参数中，避免额外 runtime kernel。

平滑因子的常用估计式为：

$$
s_j=\frac{\max(|\mathbf{X}_j|)^\alpha}{\max(|\mathbf{W}_j|)^{1-\alpha}}
$$

其中 \(\max(|\mathbf{X}_j|)\) 来自校准样本中第 \(j\) 个输入通道的激活峰值，\(\max(|\mathbf{W}_j|)\) 是相同通道对应权重的峰值。\(\alpha=0\) 时几乎不迁移激活难度，激活仍难量化；\(\alpha=1\) 时把难度几乎全压给权重，权重量化误差会变大。论文消融显示 \(\alpha\) 过小或过大都会损害精度，OPT/BLOOM 等模型常用 0.5 左右，离群更强的模型可取更大的迁移强度。

> 💡 关键：SmoothQuant 不是学习一个新稀疏结构或低秩补偿，而是把同一个线性映射换成更量化友好的坐标系。正因为它是等价变换，才能作为 PTQ 方法直接用于大模型部署。

在 Transformer 块中，SmoothQuant 默认对 self-attention 和 FFN 的线性层输入做 smoothing，并把线性层权重与激活都量化到 INT8；attention 中的 BMM 也可量化为 INT8。LayerNorm、Softmax、残差加法、激活函数等轻量算子保留 FP16，以避免把不占主要耗时的部分复杂化。与 LLM.int8() 通过 FP16 旁路保留离群通道不同，SmoothQuant 的目标是消除混合精度分支，让主要矩阵乘全部落到标准 INT8 kernel 上；与 GPTQ/AWQ 这类 weight-only 方法相比，它同时量化激活，因此在批量推理和长上下文阶段更容易兑现硬件吞吐收益。

#### 🧪 练习题
```yaml
question: "SmoothQuant 中平滑因子 s 的核心作用是什么？"
options:
  - "学习一个低秩适配器来恢复量化误差"
  - "通过等价缩放把激活离群值的量化难度转移到权重"
  - "只量化权重并在推理时反量化为 FP16"
  - "把所有 LayerNorm 和 Softmax 都改成 INT8"
answer: 1
explain: "SmoothQuant 保持 XW 完全等价，但把输入激活除以通道尺度、把权重乘以同一尺度，从而让激活和权重都更适合 INT8 表示。"
```

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
ABQ-LLM 提出任意比特权重/激活量化和对应推理框架，用分布校正、注意力 KL 约束与 bit balance 改善低比特全量化精度，并用 Binary TensorCore 等价分解把 W6A6、W2A8 等非标准精度转化为实际加速。

#### 🎯 核心要点
- 将权重缩放因子、激活缩放因子和权重裁剪范围设为可学习量化参数
- 提出 Distribution Correction Loss，约束量化 Transformer block 的输出分布接近浮点模型
- 提出 Attention Map KL Loss，约束低比特量化后的注意力图保持原模型关注模式
- 针对 2-bit 等极低比特的非对称码值利用不足问题提出 bit balance 策略
- 构建任意精度推理引擎，把低比特矩阵乘分解为 Binary TensorCore 可执行的等价操作
- 在 W2A8 等配置下兼顾困惑度、显存压缩和端到端推理加速

#### 🔬 深入细节
![ABQ-LLM 总览图](https://arxiv.org/html/2408.08554v3/ABQ-LLM.png)
*图：ABQ-LLM 使用 DLC loss 和 AKL loss 优化可学习量化参数，并配合任意比特推理引擎部署。*

```python
# ABQ-LLM 量化参数优化伪代码
for block in transformer_blocks:
    s, alpha, beta = init_learnable_scale_and_clip(block)
    for batch in calibration_loader:
        y_fp, attn_fp = block.forward_fp(batch)
        y_q, attn_q = block.forward_quant(batch, s=s, clip=(alpha, beta))

        loss_dlc = mse_or_distribution_loss(y_q, y_fp)
        loss_akl = kl_divergence(attn_fp, attn_q)
        loss_balance = bit_balance_regularizer(block.quant_codes)
        loss = loss_dlc + lambda_akl * loss_akl + lambda_b * loss_balance
        update(s, alpha, beta, loss)

compile_arbitrary_bit_matmul_with_binary_tensorcore()
```

ABQ-LLM 面向的是 weight-activation 全量化，而不是只压缩权重。低比特全量化有两类问题：一是量化误差会在 Transformer block 内改变隐藏状态分布，导致后续层输入偏移；二是 GPU 原生高效整数单元主要支持 INT4/INT8，W6A6、W2A8 这类组合即使理论上减少了 bit，也未必能直接加速。

论文首先把缩放和裁剪写成可优化目标。对于权重 \(\mathbf{W}\) 与激活 \(\mathbf{X}\)，目标近似为：

$$
\arg\min_{\mathbf{s},\alpha,\beta}\left\|\mathbf{W}\mathbf{X}-Q(\mathrm{clip}(\mathbf{W})\mathrm{diag}(\mathbf{s}))Q(\mathrm{diag}(\mathbf{s})^{-1}\mathbf{X})\right\|
$$

这里 \(\mathbf{s}\) 平衡权重与激活的量化难度，\(\alpha,\beta\) 控制权重裁剪上下界。相比手工设置平衡系数，ABQ-LLM 用校准数据直接优化这些参数，使不同层可自适应地选择更合适的尺度。

Distribution Correction Loss 的直觉是：只让单个矩阵乘误差小并不够，Transformer block 的输出分布也要接近原模型，否则误差会逐层累积。Attention Map KL Loss 则进一步约束注意力概率图：

$$
\mathcal{L}_{\mathrm{AKL}}=\mathrm{KL}(\mathbf{A}_{\mathrm{fp}}\|\mathbf{A}_{\mathrm{q}})
$$

其中 \(\mathbf{A}_{\mathrm{fp}}\) 和 \(\mathbf{A}_{\mathrm{q}}\) 分别为浮点与量化 attention map。对于语言模型，注意力模式偏移会直接影响上下文证据选择，因此该约束比只看输出 MSE 更贴近生成质量。

> ⚠️ 注意：ABQ-LLM 的“任意比特”包含算法和系统两部分。若只有可学习量化参数而没有任意比特 GEMM/GEMV 引擎，非 INT4/INT8 配置可能仍无法转化为真实延迟收益。

Bit balance 处理的是极低比特下量化桶利用不均衡的问题。以 2-bit 为例，若分布偏斜导致某些码值很少被使用，有效表示能力会低于标称 2-bit。ABQ-LLM 通过平衡正负或不同码值占用，缓解低比特下的非对称损失。

系统侧，ABQ-LLM 把任意精度整数乘法拆成 Binary TensorCore 等价的二进制运算组合，避免被 GPU 只提供 INT4/INT8 原生路径限制。这样 W6A6、W2A8 等混合精度选择不只是存储格式，而是能对应到实际计算和访存收益。

#### 🧪 练习题
```yaml
question: "ABQ-LLM 为什么强调 Binary TensorCore 等价推理框架？"
options:
  - "为了让任意比特配置获得真实硬件加速，而不是只能离线存储压缩"
  - "为了把所有激活恢复成 FP16"
  - "为了完全避免校准数据"
  - "为了将 Transformer 改造成卷积网络"
answer: 0
explain: "GPU 原生整数单元通常只高效支持少数精度，ABQ-LLM 通过 BTC 等价分解执行任意比特矩阵乘，才能把 W2A8/W6A6 等配置转化为速度收益。"
```

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
EfficientQAT 提出面向大语言模型的两阶段高效量化感知训练框架，用 Block-AP 逐块训练所有参数、再用 E2E-QP 端到端只训练量化 step size，从而在接近 PTQ 成本下获得更接近 QAT 的低比特精度。

#### 🎯 核心要点
- 面向 2/3/4-bit 低比特 LLM 量化，重点解决传统 QAT 训练代价过高、PTQ 在极低比特下掉点严重的问题
- 使用两阶段流程：Block-wise training of All Parameters (Block-AP) 和 End-to-End training of Quantization Parameters (E2E-QP)
- Block-AP 在每个 Transformer block 内直接训练原始权重 \(\mathbf{W}\)、step size \(s\) 和 zero point \(z\)，用逐块重建损失控制显存
- E2E-QP 固定低比特整数权重，只端到端训练 step size \(s\)，用语言建模或目标任务损失捕捉跨模块交互
- 采用 uniform group-wise 权重量化，量化公式由 \(\mathbf{W}_{int}\)、\(s\)、\(z\) 和目标位宽 \(N\) 定义，便于部署到低比特 kernel
- 论文报告可在单张 A100-80GB 上用 41 小时得到 2-bit Llama-2-70B，平均准确率 69.48，对比 FP16 的 72.41 下降不到 3 个点
- 评测覆盖 Llama-2、Llama-3、base LLM、instruction-tuned LLM 和多模态 LLM，并在 2-bit 场景明显优于多种 uniform PTQ/Q-PEFT 方法

#### 🔬 深入细节
![EfficientQAT 两阶段整体流程](https://arxiv.org/html/2407.11062v3/x3.png)
*图：来源为论文 Figure 2 的 arXiv HTML 图片。左侧展示传统 QAT 的端到端全参数训练，右侧展示 EfficientQAT 的 Block-AP 与 E2E-QP 两阶段流程。*

```python
# EfficientQAT 两阶段训练伪代码
def efficient_qat(fp_model, train_data, n_bits=2, group_size=64):
    q_model = copy_model(fp_model)

    # Phase 1: Block-AP，逐块训练所有参数 W、s、z
    for block_id, block in enumerate(q_model.transformer_blocks):
        block_inputs = collect_inputs_after_previous_quantized_blocks(
            q_model, train_data, block_id
        )
        fp_targets = fp_model.transformer_blocks[block_id](block_inputs).detach()

        initialize_groupwise_quant_params(block, n_bits, group_size)
        set_trainable(block, weights=True, step_size=True, zero_point=True)

        for epoch in range(2):
            for x, y_ref in minibatches(block_inputs, fp_targets):
                y_q = block.forward_with_fake_quant(x)  # round/clamp 用 STE 传梯度
                loss = mse(y_q, y_ref)
                loss.backward()
                optimizer_block_ap.step()

        freeze_quantized_block(block)

    # Phase 2: E2E-QP，固定整数权重，只训练 step size
    freeze_integer_weights(q_model)
    set_trainable(q_model, weights=False, step_size=True, zero_point=False)

    for batch in train_data:
        logits = q_model(batch.input_ids)
        loss = language_modeling_loss(logits, batch.labels)
        loss.backward()
        optimizer_e2e_qp.step()

    return q_model
```

EfficientQAT 的出发点是 QAT 和 PTQ 的矛盾。原生 QAT 把量化约束放进训练图中，并允许全模型端到端调整，所以低比特精度好；但对 70B 级 LLM 来说，全参数、全优化器状态、全数据训练几乎不可接受。PTQ 或 block-wise reconstruction 显著便宜，却常常限制可训练变量，例如只训 rounding、clipping threshold 或 step size；这减少了过拟合风险，也压缩了优化空间，在 2-bit 和 3-bit 下很难恢复损失信息。

论文采用的 uniform 量化和反量化写作：

$$
\mathbf{W}_{int}=
\mathrm{clamp}\left(
\left\lfloor\frac{\mathbf{W}}{s}\right\rceil+z,\ 0,\ 2^N-1
\right)
$$

$$
\widehat{\mathbf{W}}=(\mathbf{W}_{int}-z)\cdot s
$$

其中 \(N\) 是目标位宽，\(s\) 是分组共享的 FP16 step size，\(z\) 是 zero point。Block-AP 把这两个式子放进每个 block 的计算图，用 straight-through estimator 近似 round/clamp 的梯度，并且直接训练 \(\mathbf{W},s,z\)。简化地说，第 \(b\) 个 block 的优化目标可以写成：

$$
\mathcal{L}_{\mathrm{BlockAP}}^{(b)}
=\left\|B_b^{q}(\mathbf{H}_b;\mathbf{W},s,z)
-B_b^{fp}(\mathbf{H}_b)\right\|_2^2
$$

这里 \(\mathbf{H}_b\) 是该 block 的输入，\(B_b^{fp}\) 是浮点 block 输出，\(B_b^{q}\) 是带 fake quantization 的量化 block 输出。逐块训练的关键好处是显存只需容纳当前 block、当前 block 的优化器状态和样本激活，而不需要同时反传整条 70B 模型；同时，训练所有内生参数又比只训练少数代理变量更有表达能力。

E2E-QP 弥补 Block-AP 的局部性。逐块重建只保证每个 block 在给定输入上贴近浮点输出，但量化误差会跨层累积，最终影响语言建模概率。第二阶段从 Block-AP 得到的量化模型出发，固定 \(\mathbf{W}_{int}\)，默认只训练 \(s\)，端到端最小化目标任务损失：

$$
\mathcal{L}_{\mathrm{E2E}}
=-\sum_t \log p_{\widehat{\theta}(s)}(x_t\mid x_{<t})
$$

因为这一阶段不再执行新的 quantize，只做 \(\widehat{w}=(w_q-z)s\) 的反量化，step size 的梯度很直接：\(\partial\widehat{w}/\partial s=w_q-z\)。论文消融显示，E2E-QP 训练 \(s\)、\(z\) 或二者的精度接近；但把 \(z\) 从低比特格式转成 FP16 可训练变量会增加平均位宽，因此默认只训练 \(s\)，以获得更好的内存和模型大小权衡。

> 💡 关键：Block-AP 负责“给每个 block 足够大的可优化空间”，E2E-QP 负责“让整网知道各 block 的误差如何相互作用”。两者相加才是 EfficientQAT 的核心，而不是单纯的 block-wise PTQ。

实验也支持这种分工。以 Llama-2-7B w2g64 为例，不用两个组件时平均 PPL 极高；只用 Block-AP 或只用 E2E-QP 都能明显改善，二者叠加达到最佳平均准确率 60.14。训练参数消融中，Block-AP 同时训练 \(s,z,\mathbf{W}\) 优于只训练 clipping、\(s,z\)、rounding 或 \(\mathbf{W}\)；原因是从预训练模型出发时，直接调整 step size 和 zero point 可以最小化量化误差，而原始权重只需较小改动即可保留已学知识。对部署而言，group size 也形成精度和模型大小的权衡：更小 group 更细粒度但额外量化参数更多，论文默认在 2-bit 下常用 g64 或 g128。

#### 🧪 练习题
```yaml
question: "EfficientQAT 的 E2E-QP 阶段默认只训练 step size s 的主要原因是什么？"
options:
  - "s 是唯一参与前向计算的参数，zero point 不参与反量化"
  - "训练 s、z 或二者精度接近，但训练 z 需要把低比特 z 转成 FP16，增加平均位宽"
  - "E2E-QP 不需要任何训练数据，只需重新排序权重"
  - "Block-AP 已经删除了所有 zero point，因此只能训练 s"
answer: 1
explain: "论文消融显示训练 s 与训练 z 的效果非常接近；默认只训练 s 可以保持低内存和低平均比特数，同时捕捉跨 block 交互。"
```

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
Movement Pruning 提出在预训练语言模型微调过程中根据权重是“远离零”还是“靠近零”的运动趋势来学习剪枝 mask，解决了迁移学习场景中单纯按权重幅值剪枝无法反映下游任务适配方向的问题。

#### 🎯 核心要点
- 面向 BERT 等预训练语言模型的下游微调压缩，而不是从头训练完成后的静态剪枝
- 为每个可剪权重维护一个并行重要性分数 \(\mathbf{S}\)，通过 top-\(v\) 或阈值函数生成二值 mask \(\mathbf{M}\)
- hard movement pruning 使用 \(\mathrm{Top}_v(\mathbf{S})\) 保留最高分连接，并用 straight-through estimator 让梯度穿过离散 mask
- soft movement pruning 用阈值化分数和正则项控制稀疏率，使分数持续受到向下压力
- 重要性信号来自微调中的一阶梯度与权重方向，倾向保留正在远离零、对任务适配变重要的连接
- 使用渐进稀疏率调度和可选知识蒸馏，在高稀疏率下显著优于 magnitude pruning
- 论文在 SQuAD v1.1、MNLI、QQP 上剪枝 BERT-base，并报告结合蒸馏时可在只保留约 3% 参数下保持较小精度损失

#### 🔬 深入细节
![Movement Pruning 权重运动对比图](https://ar5iv.labs.arxiv.org/html/2005.07683/assets/finetuning_delta_mvp.png)
*图：来源为论文 Figure 1 的 ar5iv 渲染。Magnitude pruning 倾向保留远离 0 的大幅值权重，Movement pruning 则关注微调期间相对初始值和 0 点的运动方向。*

```python
# Movement Pruning 微调剪枝伪代码
def movement_pruning_finetune(model, task_loader, final_keep_ratio):
    W = model.trainable_weights()
    S = {name: zeros_like(weight) for name, weight in W.items()}

    for step, batch in enumerate(task_loader):
        keep_ratio = cubic_keep_ratio_schedule(step, final_keep_ratio)

        masks = {}
        for name, score in S.items():
            # hard movement pruning: 全局或分层保留分数最高的 keep_ratio
            masks[name] = topk_binary_mask(score, keep_ratio)

        logits = model.forward_with_masks(batch.inputs, masks)
        loss = supervised_task_loss(logits, batch.labels)
        if has_teacher():
            loss = loss + distillation_loss(logits, teacher_logits(batch.inputs))

        loss.backward()

        # W 正常由任务梯度更新；S 通过 STE 接收 mask 梯度
        optimizer_w.step(W)
        optimizer_s.step(S)
        optimizer_w.zero_grad()
        optimizer_s.zero_grad()

    return export_sparse_model(model, masks)
```

Movement Pruning 先把通用剪枝写成带 mask 的前向计算。对权重矩阵 \(\mathbf{W}\)、重要性分数 \(\mathbf{S}\) 和二值 mask \(\mathbf{M}\)，输入 \(\mathbf{x}\) 的线性输出为：

$$
\mathbf{a}=(\mathbf{W}\odot\mathbf{M})\mathbf{x},\quad
\mathbf{M}\in\{0,1\}^{n\times n}
$$

保留比例为 \(v\) 时，hard 版本用 top-\(v\) 函数生成 mask：

$$
\mathrm{Top}_v(\mathbf{S})_{i,j}=
\begin{cases}
1,& S_{i,j}\ \text{in top }v\%\\
0,& \text{otherwise}
\end{cases}
$$

Magnitude pruning 的分数是 \(\mathbf{S}=|\mathbf{W}|\)，本质上只看当前权重离 0 多远。这个假设在迁移学习微调中会变弱：预训练权重通常不会大幅离开原始值，因此“现在小”不等于“对下游任务不重要”，“现在大”也不等于“应该保留”。Movement Pruning 把分数 \(\mathbf{S}\) 作为可学习变量，在微调时与权重一起更新，让下游任务梯度参与决定哪些连接留下。

hard movement pruning 的困难是 \(\mathrm{Top}_v\) 几乎处处不可导。论文采用 straight-through estimator：前向仍使用离散 mask，反向时忽略 top-\(v\) 的不可导性，把 mask 梯度近似传给分数。对单个线性输出 \(a_i=\sum_j W_{i,j}M_{i,j}x_j\)，可把分数梯度直观写成：

$$
\frac{\partial\mathcal{L}}{\partial S_{i,j}}
\approx
\frac{\partial\mathcal{L}}{\partial M_{i,j}}
=
\frac{\partial\mathcal{L}}{\partial a_i}W_{i,j}x_j
$$

SGD 更新 \(S_{i,j}\leftarrow S_{i,j}-\eta\partial\mathcal{L}/\partial S_{i,j}\)。如果 \(W_{i,j}>0\) 且任务梯度推动它继续增大，那么上式为负，分数会上升；如果 \(W_{i,j}<0\) 且任务梯度推动它继续变得更负，分数同样会上升。也就是说，分数累计的是“权重远离 0 的证据”；相反，朝 0 收缩或对任务损失没有正贡献的连接会逐步失去分数。

> 💡 关键：Movement Pruning 的一阶信号不是梯度绝对值大小，而是梯度方向和权重符号的组合。它保留的是下游微调正在使用的连接，而不只是预训练模型里已经幅值较大的连接。

soft movement pruning 则把 top-\(v\) 换成阈值 mask，例如 \(M_{i,j}=\mathbf{1}\{S_{i,j}>\tau\}\)，并加入鼓励分数下降的正则项来间接控制稀疏率。它比 hard 版本少了每一步显式 top-k 排序的刚性，但需要调节阈值和正则强度。两种版本通常都配合渐进稀疏率调度：先 warm-up 做正常微调，再逐步提高目标稀疏率，最后 cool-down 稳定已形成的稀疏结构，避免训练早期一次性删除过多连接。

实验设置也体现了它与 Lottery Ticket/静态剪枝的区别。论文对 BERT-base 的 transformer 层和任务头做微调剪枝，冻结 embedding，并在 SQuAD v1.1、MNLI、QQP 等任务上评估。低稀疏率时 magnitude pruning 仍然很强，因为大幅值权重通常可靠；但当只保留很少参数时，Movement Pruning 能利用任务数据重新排序连接重要性，因此明显更稳。结合蒸馏时，稀疏学生模型还学习教师 logits，能在极高压缩率下减少任务性能损失。

#### 🧪 练习题
```yaml
question: "Movement Pruning 相比 Magnitude Pruning 的核心区别是什么？"
options:
  - "只剪除 attention head，不剪除 MLP 权重"
  - "根据微调时权重远离零或靠近零的趋势学习重要性分数"
  - "完全不需要下游任务数据"
  - "使用二阶 Hessian 精确计算每个权重的删除损失"
answer: 1
explain: "Movement Pruning 在微调中学习分数，并通过一阶梯度方向判断连接是否正在被下游任务推离 0，因此比静态幅值规则更适合迁移学习压缩。"
```

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
SparseGPT 提出面向 GPT 规模模型的一次性后训练剪枝算法，把剪枝转化为逐层稀疏重建，并用近似二阶信息补偿被剪权重带来的输出误差，从而在无需重训练的情况下剪掉 OPT/BLOOM 175B 级模型 50% 以上权重。

#### 🎯 核心要点
- 将全模型剪枝拆成逐层稀疏回归问题，目标是在校准输入上保持每个线性层的输出不变
- 使用 OBS 风格的二阶误差估计，令 \(\mathbf{H}=2\mathbf{X}\mathbf{X}^{\top}\)，通过 \(\mathbf{H}^{-1}\) 衡量输入特征相关性
- 采用固定列顺序和 Hessian synchronization，使不同行共享同一组“未来列”逆 Hessian，避免为每一行单独求逆
- 每次剪掉权重后只更新右侧未处理列，并冻结已处理列，形成与 GPTQ 类似的列式贪心框架
- 用 iterative blocking 自适应选择剪枝 mask，允许不同列、不同 outlier 特征承受不同剪枝比例
- 支持非结构化稀疏、2:4/4:8 半结构化稀疏，并能与低比特权重量化在同一补偿过程中联合执行
- 论文在 OPT/BLOOM 175B 级模型上展示单张 A100 数小时级剪枝，校准数据只需少量 C4 token 片段

#### 🔬 深入细节
![SparseGPT 重建算法示意图](https://ar5iv.labs.arxiv.org/html/2301.00774/assets/x4.png)
*图源：SparseGPT 论文 Figure 4。左侧展示按列剪枝与右侧权重补偿，右侧展示按块自适应选择剪枝 mask。*

```python
# SparseGPT 单个线性层的核心流程，W: [out_features, in_features], X: 校准输入
H = 2 * X @ X.T
H = damp(H)                              # 数值稳定，通常加阻尼到对角线
H_inv_info = cholesky_inverse_info(H)    # GPTQ 风格预计算逆 Hessian/Cholesky 信息

for block in column_blocks(W, block_size=B):
    # 根据当前权重和 Hessian 对角项，为这个 mask block 选择要置零的权重
    scores = (W[:, block] ** 2) / diag(H_inv_info, block)
    mask = choose_pruned_weights(scores, sparsity, pattern="unstructured_or_n:m")

    errors = zeros_like(W[:, block])
    for j in block:                       # 固定列顺序，所有行同步处理第 j 列
        q = W[:, j].clone()
        q[mask[:, j]] = 0                 # SparseGPT 的“量化值”就是 0

        err = (W[:, j] - q) / H_inv_info[j, j]
        W[:, j] = q                       # 已处理列冻结，不再被未来更新改变
        errors[:, j - block.start] = err

        # 块内 lazy update：用被剪权重的误差补偿右侧尚未冻结的列
        W[:, j + 1:block.end] -= outer(err, H_inv_info[j, j + 1:block.end])

    # 块外一次性更新，提升矩阵乘计算效率
    W[:, block.end:] -= errors @ H_inv_info[block, block.end:]
```

SparseGPT 的基本目标来自后训练逐层压缩：给定一层权重 \(\mathbf{W}\) 和校准输入 \(\mathbf{X}\)，希望压缩后的权重 \(\widehat{\mathbf{W}}\) 在这些输入上复现原层输出，而不是直接最小化权重差异：

$$
\min_{\mathbf{M},\widehat{\mathbf{W}}}
\left\|\mathbf{W}\mathbf{X}-(\mathbf{M}\odot\widehat{\mathbf{W}})\mathbf{X}\right\|_F^2,
\qquad \|\mathbf{M}\|_0 \leq k
$$

其中 \(\mathbf{M}\) 是二值保留 mask。这个目标强调“函数保持”：只要输出响应接近，剩余权重可以被重构成不同数值。难点是 mask 选择与剩余权重重构耦合在一起，精确求解相当于大规模稀疏回归，直接用于隐藏维数上万、层数上百的大语言模型不可行。

SparseGPT 借用 Optimal Brain Surgeon 的局部二阶更新。对某一行权重中待剪掉的第 \(p\) 个权重 \(w_p\)，在二次近似下，置零带来的最小误差和对剩余权重的补偿方向为：

$$
\varepsilon_p=\frac{w_p^2}{[\mathbf{H}^{-1}]_{pp}},
\qquad
\delta=-\frac{w_p}{[\mathbf{H}^{-1}]_{pp}}\mathbf{H}^{-1}_{:,p},
\qquad
\mathbf{H}=2\mathbf{X}\mathbf{X}^{\top}
$$

直觉上，单纯 magnitude pruning 只看 \(w_p\) 的大小；SparseGPT 还看这个输入方向是否敏感。如果某个小权重对应的输入特征与许多输出变化强相关，\([\mathbf{H}^{-1}]_{pp}\) 会改变它的剪枝代价，使算法少剪“看似小但很关键”的连接。

传统 OBS 的瓶颈在于每一行的 mask 不同，理论上每行都要对被保留特征的 Hessian 子矩阵求逆。SparseGPT 的关键近似是固定列处理顺序：当处理第 \(j\) 列时，只允许更新第 \(j\) 列右侧尚未冻结的权重，因此所有行共享同一组未来列集合 \(\mathcal{F}_j=\{j,j+1,\dots,d\}\)。这样只需为这些列集合维护一条逆 Hessian 序列，而不是为每一行、每一种 mask 重新求逆。

> 💡 关键：SparseGPT 的近似并不是“不补偿误差”，而是限制补偿只能流向未来列。已处理列冻结保证算法单向推进；未来列仍能吸收当前剪枝误差，所以精度远好于直接置零。

自适应 mask selection 解决的是 outlier 特征问题。若每一列都按固定比例剪，稀疏度会被强行均匀分布到所有输入特征上；但 LLM 中少量 outlier 通道非常敏感。SparseGPT 因此按多个连续列组成的 mask block 计算 OBS 误差分数，在块内统一选择最便宜的权重置零，让稀疏度可以在列之间非均匀分配。

半结构化稀疏只改变 mask 约束，不改变二阶补偿框架。例如 2:4 稀疏要求每 4 个连续权重里恰好 2 个为零，SparseGPT 就在每个 4 元组内选择 OBS 误差最小的 2 个权重剪掉。联合量化也类似：对保留权重不再固定为当前浮点值，而是四舍五入到量化网格；随后把“置零误差”和“量化舍入误差”一起传递给右侧未来列补偿。

#### 🧪 练习题
```yaml
question: "SparseGPT 能在无需重训练的情况下剪枝 GPT 规模模型，最核心的机制是什么？"
options:
  - "只剪 embedding 和输出层，避免影响 Transformer block"
  - "使用二阶 Hessian 逆估计剪枝误差，并把误差补偿到尚未冻结的未来权重"
  - "先完整微调模型，再根据梯度大小删除权重"
  - "对所有层使用完全相同的随机稀疏 mask"
answer: 1
explain: "SparseGPT 的关键是逐层稀疏重建：剪掉权重后利用输入 Hessian 的逆近似更新未来列，使层输出尽量保持不变。"
```

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
SAAP 提出结构感知自适应剪枝，通过融合不同耦合结构的重要性与不确定性来选择要裁剪的模块，并用 group-wise fine-tuning 恢复性能，解决了 LLM 结构化剪枝中层间重要性波动大、统一阈值容易误剪的问题。

#### 🎯 核心要点
- 面向 LLM 的结构化剪枝，删除可部署友好的耦合结构而非孤立权重
- 将依赖检测得到的 attention head、MLP channel 等耦合结构视为 pruning group
- 结合 vector-wise 与 element-wise 重要性，构造 adaptive importance fusion metric
- 用 homoscedastic uncertainty 自适应调节不同重要性指标的权重
- 按模块/层排序选择要剪的结构，以满足给定剪枝率和性能约束
- 用 group-wise fine-tuning 对剪枝后的组进行高效恢复，减少全模型微调开销

#### 🔬 深入细节
![SAAP 方法总览图](https://arxiv.org/html/2412.15127v1/x2.png)
*图：SAAP 先用自适应重要性评估删除最不稳定结构，再通过高效 group-wise fine-tuning 恢复剪枝模型。*

```python
# SAAP 结构感知剪枝伪代码
groups = detect_coupled_structures(llm)  # heads, channels, coupled modules
for group in groups:
    I_vector = estimate_vector_importance(group, calibration_data)
    I_element = estimate_element_importance(group, calibration_data)
    uncertainty = estimate_homoscedastic_uncertainty(group)
    score[group] = fuse_importance(I_vector, I_element, uncertainty)

pruned_groups = select_low_score_groups(score, target_ratio)
llm_pruned = remove_structures(llm, pruned_groups)
group_wise_finetune(llm_pruned, calibration_or_task_data)
```

LLM 的结构化剪枝比普通权重剪枝更难，因为 Transformer 中很多参数存在耦合关系：剪掉一个 attention head、MLP 中间维度或投影通道时，前后矩阵的对应维度必须一起删除，否则张量形状和语义流都会被破坏。SAAP 首先识别这些耦合结构，把它们作为统一评估和删除的 group。

论文中的重要性估计沿用泰勒近似思想。对第 \(i\) 个结构权重 \(\mathbf{W}_i\)，删除它造成的损失变化可近似为：

$$
I_i \approx \left|\frac{\partial \mathcal{L}^\top}{\partial \mathbf{W}_i}\mathbf{W}_i-\frac{1}{2}\mathbf{W}_i^\top\mathbf{H}\mathbf{W}_i\right|
$$

实际计算中，vector-wise 指标更关注整个结构向量的整体贡献，element-wise 指标更细粒度地刻画权重内部差异。只使用其中一种指标会偏向某些层或某类结构，难以在不同 LLM 架构间泛化。

SAAP 的 adaptive importance fusion 用同方差不确定性来给不同指标分配权重，可理解为：

$$
I_{\mathrm{fuse}}=\sum_m \frac{1}{2\sigma_m^2}I^{(m)}+\log\sigma_m
$$

其中 \(I^{(m)}\) 是一种重要性度量，\(\sigma_m\) 表示该度量的不确定性。若某个指标在当前结构上波动大、不可靠，它对最终分数的影响会被降低；若指标稳定，则获得更高权重。

> 💡 关键：SAAP 不是用一个全局幅值阈值剪所有层，而是先在结构组级别估计“重要且稳定”的程度，再按层和模块做自适应选择。

剪枝后，模型会出现层间分布偏移和能力下降。SAAP 采用 group-wise fine-tuning：不对所有参数做昂贵的完整微调，而是围绕被剪结构相关的组进行恢复训练，使输出分布重新对齐。这样保留结构化剪枝带来的推理加速，同时降低恢复成本。

与 SparseGPT 这类非结构化/半结构化一次性剪枝相比，SAAP 更强调删除完整可部署结构，因此理论压缩更容易转成实际延迟收益。与 LLM-Pruner 等结构化方法相比，SAAP 的重点在于用不确定性处理不同层重要性分数不可比的问题。

#### 🧪 练习题
```yaml
question: "SAAP 中 homoscedastic uncertainty 的主要作用是什么？"
options:
  - "随机选择要剪掉的层"
  - "自适应调节不同重要性指标在融合分数中的权重"
  - "把所有权重量化到 4 bit"
  - "替代剪枝后的微调过程"
answer: 1
explain: "不同结构和层的重要性指标波动不同，不确定性项可以降低不稳定指标的影响，使剪枝排序更可靠。"
```

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
ReplaceMe 提出训练自由的深度剪枝方法，用一个由校准数据估计的线性变换替换连续 Transformer blocks，解决了直接删除层会造成隐藏状态接口不匹配、而恢复微调成本又很高的问题。

#### 🎯 核心要点
- 针对 depth pruning，删除连续 Transformer blocks 而不是单个权重或通道
- 用小规模校准集估计线性变换 \(T\)，近似被剪块序列对隐藏状态的作用
- 将 \(T\) 融合进保留块的 MLP down projection，不增加额外推理参数
- 支持 L2/cosine 距离等目标，并可加入 L1/L2 正则增强泛化
- 可扩展到多个不重叠 block 组，每组估计独立线性变换
- 在低到中等剪枝率下无需 healing training 即保持较高 benchmark 性能

#### 🔬 深入细节
![ReplaceMe 深度剪枝示意图](https://arxiv.org/html/2505.02819v1/x1.png)
*图：ReplaceMe 绕过一段连续 Transformer blocks，并插入估计出的线性变换来对齐后续 block 期望的输入空间。*

```python
# ReplaceMe 训练自由深度剪枝伪代码
for candidate_span in contiguous_block_spans(model):
    H_before, H_after = collect_hidden_states(model, calibration_data, candidate_span)
    score[candidate_span] = distance(H_before, H_after)

span = choose_low_impact_span(score, target_depth_reduction)
M_i, Y_i, L_after = collect_mlp_and_residual_states(model, calibration_data, span)
T = solve_or_optimize_linear_transform(M_i, L_after - Y_i,
                                       objective="cosine_or_l2",
                                       regularization="l1_l2")
fuse_T_into_previous_mlp_down_projection(model, span.start, T)
remove_blocks(model, span.middle_blocks)
```

普通深度剪枝直接跳过若干 Transformer blocks，计算量减少明显，但隐藏状态会进入后续层不熟悉的分布区域。ReplaceMe 的核心假设是：一段连续 blocks 的整体作用，在低压缩率下可以由一个线性映射近似，尤其可以把第 \(i\) 个 block 的 MLP 输出映射到第 \(i+n+1\) 个 block 期望的输入空间。

论文把 Transformer block 拆成 attention 残差、MLP 输出和最终残差。若 \(M_i\) 是第 \(i\) 个 block 的 MLP 输出，\(Y_i\) 是 attention 后残差，\(L_{i+n}\) 是保留后续层所需的目标隐藏状态，则可估计：

$$
T^\*=\arg\min_T h(M_iT+Y_i, L_{i+n})
$$

为降低内存，论文还使用等价近似形式：

$$
T^\*=\arg\min_T \cos(M_iT, L_{i+n}-Y_i)
$$

其中 \(h\) 可取 L2 或 cosine 距离。L2 目标在部分设定下可给出闭式解，cosine 目标则通常用 Adam 等优化器求解。这个过程只需要校准数据前向统计，不需要更新原模型权重。

> 💡 关键：ReplaceMe 不是“删层后额外挂一个新层”，而是把估计出的线性变换融合进前一个 MLP 的 down projection，因此推理图中不会多出新的模块。

正则化用于防止线性变换在校准集上过拟合。L1 可鼓励稀疏变换，L2 可限制权重过大；论文观察到正则可能改善准确率 benchmark，但也可能牺牲困惑度，因此需要按部署目标选择。

与 Movement Pruning 这类微调中剪权重的方法相比，ReplaceMe 不依赖任务训练过程，适合已经训练好的 LLM 快速 depth compression。与普通 layer dropping 相比，它用线性接口补偿被删 blocks 的分布变换，因此在不做 healing 的情况下更稳。

#### 🧪 练习题
```yaml
question: "ReplaceMe 为什么能在删除连续 Transformer blocks 后不增加额外推理参数？"
options:
  - "它把所有被删 blocks 替换成稀疏注意力"
  - "它将估计出的线性变换融合进前序 MLP 的 down projection"
  - "它只删除 embedding 层"
  - "它要求重新预训练整个模型"
answer: 1
explain: "线性变换和已有 MLP 投影是连续线性算子，可代数合并为一个权重矩阵，因此模型结构只体现为 blocks 被删除。"
```

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
ViTCoP 提出视觉与文本语义协同的 LVLM token 剪枝框架，先在视觉编码器过滤冗余视觉 token，再在 LLM 浅层和深层逐步结合视觉多样性与文本相关性剪枝，解决了早剪丢关键信息、晚剪保留冗余 token 的矛盾。

#### 🎯 核心要点
- 面向 LLaVA 等大视觉语言模型中的视觉 token 冗余
- 三阶段流程：视觉编码器粗剪、LLM 浅层协同剪枝、LLM 深层文本显著性剪枝
- 在视觉编码器中利用 `[CLS]` attention 识别初始重要视觉 token
- 在浅层使用 VIC clustering 和 K-norm merging 保留多样且关键的视觉证据
- 在深层使用 Key 向量 L2 norm 作为与 FlashAttention 兼容的 token saliency
- 同时降低推理延迟和 GPU 显存，极端剪枝率下优于单纯视觉或单纯文本剪枝

#### 🔬 深入细节
![ViTCoP 框架图](https://arxiv.org/html/2601.17818v1/x7.png)
*图：ViTCoP 的三阶段流程：视觉编码器粗剪、浅层视觉文本协同剪枝、深层文本显著性激进剪枝。*

```python
# ViTCoP 多阶段视觉 token 剪枝伪代码
visual_tokens = vision_encoder(image)
visual_tokens = coarse_prune_by_cls_attention(visual_tokens, keep_ratio_stage1)

for layer_id, layer in enumerate(llm.layers):
    if layer_id in shallow_layers:
        saliency = key_norm(layer, visual_tokens)
        clusters = VIC_cluster(visual_tokens)
        visual_tokens = co_prune_and_merge(visual_tokens, saliency, clusters)
    elif layer_id in deep_layers:
        saliency = key_norm(layer, visual_tokens, text_tokens)
        visual_tokens = keep_topk(visual_tokens, saliency, keep_ratio_stage3)
    text_tokens, visual_tokens = layer(text_tokens, visual_tokens)
```

LVLM 的视觉编码器会为高分辨率图片或长视频产生大量视觉 token，而 Transformer 复杂度随序列长度平方增长。已有方法若在 vision encoder 过早剪枝，可能删除后续回答需要的细节；若只在 LLM 内部晚剪，虽然能利用文本信息，但前面层已经为大量冗余 token 付出了计算成本。

ViTCoP 的设计是分阶段逐步收缩视觉 token。第一阶段在视觉编码器中做粗剪，利用 `[CLS]` attention 找到明显重要的视觉区域，快速去掉大批低贡献 token。该阶段重在减少后续输入规模，因此剪枝不能过于激进。

第二阶段发生在 LLM 浅层。此时文本和视觉已经开始交互，但语义尚未完全聚焦，ViTCoP 同时考虑视觉 token 的多样性与重要性：VIC clustering 避免所有保留 token 集中在同一物体或区域，K-norm merging 则用 Key 向量范数衡量 token 在注意力中的潜在影响，并把被删 token 的信息合并到代表 token。

深层阶段的 LLM 已更明确地围绕问题形成语义焦点，因此 ViTCoP 转向更激进的文本相关剪枝。Key 向量 L2 norm 被用作 saliency：

$$
s_i=\|\mathbf{k}_i\|_2
$$

相比直接读取 attention score，该指标实现轻量，并且更容易与 FlashAttention 等高效 attention kernel 兼容。

> 💡 关键：ViTCoP 不是单一阈值 token pruning，而是随着层深改变剪枝准则：早期保多样性，中期协同视觉文本，后期保与问题最相关的证据。

与 SparseVLM、VisionZip 等方法相比，ViTCoP 更强调层级特征：浅层视觉信息仍分散，深层才适合强文本引导。这样能在极端剪枝率下减少“看错区域”或“保留重复区域”的风险，尤其适合图像问答和视频理解等需要定位细节的任务。

#### 🧪 练习题
```yaml
question: "ViTCoP 为什么要分浅层和深层采用不同剪枝策略？"
options:
  - "因为浅层只处理文本，深层只处理图像"
  - "因为 LVLM 的文本语义聚焦随层深增强，浅层应保留多样视觉证据，深层可按文本相关性激进剪枝"
  - "因为 FlashAttention 只能用于第一层"
  - "因为视觉编码器不能输出 token"
answer: 1
explain: "ViTCoP 利用 LVLM 层级语义变化，先避免过早丢失视觉信息，再在深层保留最相关 token。"
```

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
Hinton KD 提出用大模型或模型集成的 soft targets 训练小模型，并通过温度系数 \(T\) 放大非正确类别之间的相对概率，解决了强教师模型部署昂贵但其泛化行为可以迁移到轻量学生模型的问题。

#### 🎯 核心要点
- 将 cumbersome model、强正则大模型或模型集合作为教师，将更小、更适合部署的模型作为学生
- 用高温 softmax 生成 soft targets，让低概率类别之间的相对大小携带“暗知识”
- 学生训练时同时匹配教师软分布和真实硬标签，推理时恢复普通温度 \(T=1\)
- 软目标损失通常乘以 \(T^2\)，抵消高温导致的梯度尺度缩小
- 证明高温极限下匹配 soft targets 近似等价于匹配 zero-mean logits
- 引入 generalist + specialist models：通用模型覆盖全类别，专家模型专门区分易混类别簇
- 在 MNIST、Android 语音识别声学模型和 JFT specialist 实验中验证蒸馏与软目标正则化效果

#### 🔬 深入细节
![知识蒸馏教师-学生流程图](https://upload.wikimedia.org/wikipedia/commons/e/e8/Knowledge-distillation-example.png)
*图源：Wikimedia Commons CC0 图，原 Hinton KD 论文没有单独架构图；该图展示教师 soft labels、学生 soft predictions、硬标签监督和蒸馏损失的标准流程。*

```python
# Hinton Knowledge Distillation 的标准训练伪代码
for x, y in transfer_loader:
    with no_grad():
        teacher_logits = teacher_or_ensemble(x)
        teacher_soft = softmax(teacher_logits / T)

    student_logits = student(x)
    student_soft_log = log_softmax(student_logits / T)
    student_hard = softmax(student_logits)       # 推理温度对应 T=1

    loss_soft = KLDivLoss(student_soft_log, teacher_soft) * (T * T)
    loss_hard = CrossEntropyLoss(student_logits, y)
    loss = alpha * loss_soft + (1 - alpha) * loss_hard

    loss.backward()
    optimizer.step()
```

论文的出发点是把“知识”从参数值中解耦出来。教师模型可以是一个大网络，也可以是多个模型预测分布的平均；学生不需要复制教师结构，只需要学习教师从输入到输出分布的映射。对于部署场景，训练阶段可以承受大模型和集成的成本，推理阶段则需要把这种泛化能力折叠进一个小模型。

温度 softmax 是 Hinton KD 的核心机制。给定 logit \(z_i\)，带温度的类别概率为：

$$
p_i^{(T)}=\frac{\exp(z_i/T)}{\sum_j \exp(z_j/T)}
$$

当 \(T>1\) 时，分布变平，非正确类别不再全部贴近 0。硬标签只告诉学生“BMW 不是垃圾车也不是胡萝卜”，而教师 soft target 会告诉学生“BMW 被误认为其他汽车的概率远高于被误认为胡萝卜”。这些错误类别之间的相对概率就是论文强调的 dark knowledge。

常用的蒸馏目标写作：

$$
\mathcal{L}
=(1-\alpha)\,\mathrm{CE}\left(y,\mathrm{softmax}(\mathbf{z}_s)\right)
+\alpha T^2\,\mathrm{KL}\left(p_t^{(T)}\|p_s^{(T)}\right)
$$

其中 \(p_t^{(T)}\) 与 \(p_s^{(T)}\) 分别是教师和学生在高温下的分布。高温会让 softmax 梯度随 \(T\) 变小，论文指出软目标项的梯度量级大致按 \(1/T^2\) 缩放，因此实践中把蒸馏项乘以 \(T^2\)，使调节温度时软目标与硬标签的相对权重不至于被意外改变。

论文还解释了为什么“匹配 logits”是蒸馏的一个特例。在 \(T\) 足够大且每个样本的 logits 做零均值处理时，softmax 可以线性化，交叉熵梯度近似为：

$$
\frac{\partial C}{\partial z_i}
\approx \frac{1}{N T^2}(z_i-v_i)
$$

这里 \(z_i\) 是学生 logit，\(v_i\) 是教师 logit，\(N\) 是类别数。也就是说，高温蒸馏近似在拉近教师和学生的 logit 差值；但在中等温度下，极低概率类别的噪声会被自然压低，学生更关注教师真正有意义的类别关系。

> 💡 关键：KD 的目标不是让学生追求教师 top-1 答案，而是让学生学习教师如何分配“剩余概率质量”。这使每个样本提供的监督从一个类别扩展为完整类别相似性结构。

在训练流程上，transfer set 可以是原训练集，也可以是未标注迁移数据；若有真实标签，论文建议用软目标损失和硬标签损失的加权平均。硬标签防止学生在教师不确定或教师错误时偏离任务目标，软标签则起到更低方差、更强正则化的监督作用。论文在语音识别中展示，10 个模型集成的帧分类准确率提升大部分可以迁移到单个蒸馏模型，并且 WER 保持在集成水平附近。

specialist models 是论文的另一项重要设计。generalist 模型负责全类别预测，specialist 模型只关注通用模型容易混淆的一簇类别，把其余类别合成 dustbin 类，从而用小 softmax 学习细粒度区分。推理时先由 generalist 找到 top 类别集合，再激活覆盖这些类别的 specialists，并求一个全局分布 \(q\) 来同时贴近 generalist 和 active specialists：

$$
\min_q\ \mathrm{KL}(p_g\|q)+\sum_{m\in\mathcal{A}}\mathrm{KL}(p_m\|q_m)
$$

这一部分说明 KD 不只是一条 teacher-student 训练技巧，也是一种把多个互补模型的判断合并再压缩的框架。后来的 DistilBERT、TinyBERT、MiniLLM 等方法延续了 Hinton KD 的思想，但把蒸馏信号从分类 logits 扩展到隐藏状态、注意力、序列分布和生成策略。

#### 🧪 练习题
```yaml
question: "Hinton KD 中温度 T 的主要作用是什么？"
options:
  - "让教师模型参数更少"
  - "软化类别概率分布，使非正确类别之间的相对概率更明显"
  - "把学生模型权重量化到低比特"
  - "完全替代真实标签，不再需要交叉熵"
answer: 1
explain: "较高温度会让 softmax 分布更平滑，使学生看到教师对错误类别相似性的判断；训练中通常仍会结合硬标签。"
```

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
DistilBERT 将知识蒸馏提前到 BERT 预训练阶段，用三重损失训练一个层数减半的通用语言表示模型，在减少约 40% 参数、提升约 60% 推理速度的同时保留约 97% 语言理解能力。

#### 🎯 核心要点
- 学生模型保留 BERT 的 hidden size 和 vocabulary，但层数从 12 层减为 6 层
- 用教师 BERT 的每隔一层参数初始化学生，提高预训练蒸馏稳定性
- 去掉 token-type embeddings 和 NSP 目标，聚焦 masked language modeling
- 三重损失：MLM loss、蒸馏 soft target loss、隐藏状态 cosine embedding loss
- 在预训练阶段获得通用小模型，再像 BERT 一样 fine-tune 到下游任务
- 在 GLUE 等任务上保持接近 BERT-base 的性能，并更适合边端/低资源部署

#### 🔬 深入细节
![DistilBERT 参数规模对比图](https://ar5iv.labs.arxiv.org/html/1910.01108/assets/GOOD_big.png)
*图：DistilBERT 论文展示了预训练语言模型参数规模快速增长，说明压缩通用表示模型的必要性。*

```python
# DistilBERT 预训练蒸馏伪代码
student = init_from_every_other_layer(bert_base_teacher, num_layers=6)
for tokens in pretraining_corpus:
    teacher_logits, teacher_hidden = teacher(tokens, output_hidden=True)
    student_logits, student_hidden = student(tokens, output_hidden=True)

    loss_mlm = cross_entropy(student_logits[masked_pos], labels[masked_pos])
    loss_kd = KLDivLoss(log_softmax(student_logits / T),
                        softmax(teacher_logits / T)) * T * T
    loss_cos = 1 - cosine_similarity(student_hidden[-1], teacher_hidden[-1]).mean()
    loss = lambda_mlm * loss_mlm + lambda_kd * loss_kd + lambda_cos * loss_cos
    update(student, loss)
```

多数早期 BERT 蒸馏关注下游任务 fine-tuning 后的小模型，而 DistilBERT 的关键是预训练阶段蒸馏。这样得到的是一个通用学生模型，可复用到多个任务，而不是每个任务单独蒸馏一次。它保留 BERT 的表示维度，让学生仍能使用类似的下游分类头。

三重损失分别约束不同层面的知识。MLM loss 保证学生仍学习语言建模任务；蒸馏 loss 让学生 logits 接近教师 logits；cosine loss 直接拉近学生和教师隐藏表示方向：

$$
\mathcal{L}=\lambda_{\mathrm{MLM}}\mathcal{L}_{\mathrm{MLM}}+\lambda_{\mathrm{KD}}T^2\mathrm{KL}(p_t^T\|p_s^T)+\lambda_{\cos}(1-\cos(\mathbf{h}_s,\mathbf{h}_t))
$$

其中 hidden cosine loss 的作用是防止学生只拟合输出词分布，却学不到教师中间表示的语义几何。

> 💡 关键：DistilBERT 的压缩主要来自“少层数”，不是降低 hidden size。这样可减少串行 Transformer 层带来的延迟，同时保持每层表示容量。

初始化也很重要。学生 6 层通常从 BERT-base 的 12 层中隔层抽取初始化，避免从随机小模型开始追教师造成优化困难。预训练完成后，DistilBERT 可以像 BERT 一样对 GLUE、SQuAD 等任务 fine-tune。

与 Hinton KD 相比，DistilBERT 把蒸馏从分类输出扩展到了 masked LM 预训练和隐藏表示对齐。与 TinyBERT 相比，它的中间层监督较少、结构更简洁，因此是一种轻量实用的通用 BERT 压缩基线。

#### 🧪 练习题
```yaml
question: "DistilBERT 的三重损失不包括以下哪一项？"
options:
  - "Masked language modeling loss"
  - "教师 soft logits 的蒸馏损失"
  - "学生与教师隐藏状态的 cosine loss"
  - "Hessian 逆矩阵二阶量化损失"
answer: 3
explain: "DistilBERT 是蒸馏方法，不使用 GPTQ 那类 Hessian 逆二阶量化目标。"
```

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
TinyBERT 提出面向 Transformer 的两阶段知识蒸馏框架，在通用预训练和任务微调阶段同时蒸馏 embedding、attention、hidden states 与 prediction layer，解决了只蒸馏 logits 难以充分压缩 BERT 内部表示的问题。

#### 🎯 核心要点
- 设计 Transformer distillation，将教师知识拆成嵌入层、注意力矩阵、隐藏状态和预测 logits
- 使用两阶段学习：general distillation 学通用语言知识，task-specific distillation 学下游任务知识
- 支持层映射，把教师 BERT 的多层知识对齐到较浅的 TinyBERT 学生层
- 注意力蒸馏直接对齐 multi-head attention 矩阵，保留 token 间关系
- 隐藏层蒸馏用线性变换对齐不同 hidden size 后计算表示损失
- TinyBERT4 在 GLUE 上保留教师大部分性能，同时显著减少参数和推理时间

#### 🔬 深入细节
![TinyBERT 学习框架图](https://ar5iv.labs.arxiv.org/html/1909.10351/assets/x1.png)
*图：TinyBERT 通过两阶段 Transformer distillation，把教师 BERT 的多层知识迁移到小学生模型。*

```python
# TinyBERT 两阶段蒸馏伪代码
for stage in ["general_distillation", "task_specific_distillation"]:
    data = general_corpus if stage == "general_distillation" else augmented_task_data
    for x, y in data:
        teacher_outputs = teacher(x, output_attn=True, output_hidden=True)
        student_outputs = student(x, output_attn=True, output_hidden=True)

        loss_emb = mse(student.embedding, teacher.embedding)
        loss_attn = sum(mse(A_s, A_t) for A_s, A_t in mapped_attentions)
        loss_hidden = sum(mse(W_h @ H_s, H_t) for H_s, H_t in mapped_hiddens)
        loss_pred = KLDivLoss(log_softmax(z_s / T), softmax(z_t / T)) * T * T
        update(student, loss_emb + loss_attn + loss_hidden + loss_pred)
```

TinyBERT 的出发点是：BERT 的知识不只存在于最终 logits。Transformer 的 attention 矩阵记录 token 之间的依赖，隐藏状态记录上下文语义，embedding 层记录词表基础表示。如果只用 Hinton KD 的输出分布，学生可能学到任务答案，却丢失教师内部推理路径。

对于第 \(m\) 个学生层，TinyBERT 会映射到教师的某一层 \(g(m)\)。attention 蒸馏可写成：

$$
\mathcal{L}_{\mathrm{attn}}=\frac{1}{h}\sum_i\|\mathbf{A}_{s,i}^{m}-\mathbf{A}_{t,i}^{g(m)}\|_2^2
$$

隐藏状态维度不一致时，TinyBERT 使用可学习线性变换 \(\mathbf{W}_h\) 对齐学生表示：

$$
\mathcal{L}_{\mathrm{hidn}}=\|\mathbf{W}_h\mathbf{H}_s^m-\mathbf{H}_t^{g(m)}\|_2^2
$$

> 💡 关键：TinyBERT 的“深蒸馏”覆盖 Transformer 内部结构，因此比只蒸馏最终预测层更适合压缩多层语言表示模型。

两阶段设计也很关键。general distillation 在大规模语料上压缩通用 BERT 知识；task-specific distillation 在下游任务数据及其增强样本上进一步对齐任务决策边界。这样学生既不是纯通用小模型，也不是只靠小任务数据硬拟合的模型。

与 DistilBERT 相比，TinyBERT 的蒸馏信号更细，尤其显式对齐 attention 和中间层；代价是训练流程更复杂，需要教师中间输出和任务数据增强。它适合对小模型精度要求更高、可接受额外离线蒸馏成本的场景。

#### 🧪 练习题
```yaml
question: "TinyBERT 相比只蒸馏 logits 的方法，多蒸馏了哪些 Transformer 内部知识？"
options:
  - "attention 矩阵、隐藏状态和 embedding 表示"
  - "GPU kernel 调度策略"
  - "Hessian 逆矩阵"
  - "稀疏 KV cache 元数据"
answer: 0
explain: "TinyBERT 的 Transformer distillation 显式对齐嵌入层、注意力矩阵、隐藏状态和预测层。"
```

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
MiniLLM 提出面向生成式大语言模型的 on-policy 蒸馏，把传统 forward KL 蒸馏改为 reverse KL，并让学生在自身生成分布上接受教师反馈，从而减少开放式生成中的长尾过拟合、暴露偏差和低质量文本概率高估问题。

#### 🎯 核心要点
- 将 LLM 白盒蒸馏目标从 \(\mathrm{KL}(p\|q_\theta)\) 改为 \(\mathrm{KL}(q_\theta\|p)\)，其中 \(p\) 是教师分布，\(q_\theta\) 是学生分布
- 使用 on-policy 训练：学生先按当前策略生成回复，再由教师对学生生成的 token/序列给出概率反馈
- 用 policy gradient 推导离散文本采样下的 reverse KL 优化，而不是直接 teacher forcing 拟合教师样本
- 提出 single-step decomposition/regularization，直接估计单步生成质量以降低长序列蒙特卡洛方差
- 使用 teacher-mixed sampling 缓解 reward hacking，避免小学生通过退化文本骗取高教师分数
- 使用 length normalization 抑制短回复偏置，并结合 PPO clipping 与语言模型预训练损失稳定训练
- 在 Dolly、SelfInst、VicunaEval、Super-NaturalInstructions、UnnaturalInstructions 等指令跟随评测上验证 120M 到 13B 模型规模的蒸馏效果

#### 🔬 深入细节
![MiniLLM 与序列级 KD 对比图](https://ar5iv.labs.arxiv.org/html/2306.08543/assets/x3.png)
*图源：MiniLLM 论文 Figure 3。左侧 SeqKD 从教师分布采样并最小化 forward KLD；右侧 MiniLLM 从学生分布采样并最小化 reverse KLD。*

```python
# MiniLLM on-policy reverse-KL 蒸馏伪代码
student = sft_init(student, instruction_data)  # 先用真实回复 SFT，选验证集 loss 最低的 checkpoint

for step in range(num_updates):
    prompts = sample_prompts(instruction_data)

    # teacher-mixed sampling: 每步采样分布混合学生和教师，降低退化样本概率
    y = sample_autoregressive(
        prompt=prompts,
        distribution=lambda ctx: (1 - alpha) * q_student(ctx) + alpha * p_teacher(ctx),
    )

    logq = student.log_prob(prompts, y)
    with no_grad():
        logp = teacher.log_prob(prompts, y)

    # reverse KL 的 policy-gradient 信号，length normalization 去掉短句偏置
    reward = length_normalize(logp - logq)
    pg_loss = -stop_gradient(reward) * logq

    # single-step 项直接枚举词表计算一步质量，LM loss 保留通用语言建模能力
    ss_loss = single_step_reverse_kl(student, teacher, prompts, y)
    lm_loss = causal_lm_loss(student, pretraining_corpus_batch)

    loss = clipped_policy_loss(pg_loss) + beta * ss_loss + gamma * lm_loss
    update(student, loss)
```

传统 word-level KD 或 sequence-level KD 本质上接近 forward KL。若教师分布为 \(p(y|x)\)，学生为 \(q_\theta(y|x)\)，forward KL 为：

$$
\mathrm{KL}(p\|q_\theta)
=\mathbb{E}_{y\sim p(y|x)}
\left[\log p(y|x)-\log q_\theta(y|x)\right]
$$

这个目标是 mode-covering：学生被鼓励覆盖教师分布中的所有模式。对分类任务，这通常是优点，因为类别空间有限；但对开放式文本生成，教师的可接受回复存在大量长尾表达，小学生容量不足时会把概率质量铺到教师低概率或空洞区域，最终在自由生成时产生不可靠文本。

MiniLLM 改用 reverse KL：

$$
\mathcal{J}(\theta)
=\mathrm{KL}(q_\theta\|p)
=\mathbb{E}_{y\sim q_\theta(y|x)}
\left[\log q_\theta(y|x)-\log p(y|x)\right]
$$

reverse KL 是 mode-seeking：学生更倾向于集中拟合教师的主要高概率模式，而不是覆盖所有长尾变体。对指令跟随而言，这对应“生成更可靠、更精确的回答”，即宁可少覆盖一些风格变化，也不要给明显低质量区域分配过高概率。

由于文本 \(y\) 是离散采样结果，\(\mathcal{J}(\theta)\) 不能像普通监督学习那样直接对教师样本做 teacher forcing。MiniLLM 用 policy gradient 得到可优化形式：

$$
\nabla_\theta \mathcal{J}(\theta)
=\mathbb{E}_{y\sim q_\theta}
\left[
\nabla_\theta\log q_\theta(y|x)
\left(\log q_\theta(y|x)-\log p(y|x)\right)
\right]
$$

等价地，可以把 \(r(y)=\log p(y|x)-\log q_\theta(y|x)\) 看成教师给学生当前生成的奖励：教师概率越高、学生自信过度越低，奖励越好。训练样本来自学生当前策略，所以优化看到的是学生推理时真正会访问的状态分布，这正是 on-policy 蒸馏区别于 SeqKD 的地方。

> 💡 关键：SeqKD 让学生记住教师采样出的回复；MiniLLM 让学生先暴露自己的生成行为，再让教师评价这些行为是否落在高质量区域。

policy gradient 在长文本中方差高，因为一个早期 token 的错误会影响后面整段奖励。MiniLLM 因此引入 single-step decomposition/regularization，把总奖励拆到 token 级，某些单步项可以通过遍历词表直接计算，而不是完全依赖蒙特卡洛序列采样。这样前缀处的生成质量被更稳定地约束，收敛也更快。

teacher-mixed sampling 处理的是 reward hacking。若完全从弱学生采样，学生可能生成重复、空泛或异常短的文本，却在某些局部上得到看似不错的教师概率。MiniLLM 在每个时间步用混合分布采样：

$$
\tilde{q}(y_t|x,y_{<t})
=(1-\alpha)q_\theta(y_t|x,y_{<t})+\alpha p(y_t|x,y_{<t})
$$

教师混入让采样轨迹少进入明显退化区域，再用重要性采样思路近似修正梯度。论文还加入 length normalization，因为原始序列对数概率会随长度累加变小，若不修正，模型容易偏好空回复或过短回复。

训练流程上，MiniLLM 先用人工指令回复对学生做 SFT 初始化，再进行 on-policy 蒸馏；更新时组合 reverse-KL policy gradient、single-step 项、PPO clipping 稳定项和额外语言建模损失。与 TinyBERT 这类主要对齐中间层表示的 encoder 蒸馏相比，MiniLLM 的核心对象是自回归生成策略本身，更适合白盒 LLM 到小 LLM 的指令跟随蒸馏。

#### 🧪 练习题
```yaml
question: "MiniLLM 为什么把传统 forward KL 蒸馏改成 reverse KL？"
options:
  - "reverse KL 在学生自身生成分布上优化，更倾向学习教师高概率模式并减少长尾低质量区域过拟合"
  - "reverse KL 可以完全不需要教师模型"
  - "reverse KL 会自动删除 Transformer 的注意力层"
  - "reverse KL 的唯一作用是把权重量化为 INT8"
answer: 0
explain: "开放式生成空间有大量模式，小学生难以覆盖教师全部分布；reverse KL 的 mode-seeking 特性更适合让学生聚焦可靠高概率回答。"
```

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
ActivePrune 提出一种可插拔的主动学习数据剪枝框架，用 KenLM 5-gram 困惑度快速扫描全量未标注池，再用 Gemma-2B 等量化 LLM 对小候选集打质量分，解决大规模主动学习中 acquisition function 逐样本评估过慢的问题。

#### 🎯 核心要点
- 定位不是新的 acquisition function，而是放在 acquisition function 之前的 unlabeled pool pruning 模块
- 第一阶段使用 KenLM 5-gram 与 SentencePiece 对全量未标注池计算困惑度，保留低困惑度样本进入过滤池
- 第二阶段从剩余高困惑度区域抽取候选，用量化 Gemma-2B 计算 LLM 数据质量分，保留高质量样本
- LLM 质量分由任务提示生成 yes/no 判断，并取 yes token 的 softmax 概率作为 \(q(x_i)\)
- Perplexity reweighting 在每轮标注后降低远离已选样本的候选困惑度，使未覆盖区域更容易进入下一轮过滤池
- 可与 Least Confidence、Coreset、IDDS、NSP 等不同主动学习策略组合，实验覆盖翻译、情感分类、主题分类和摘要
- 在 IT domain 数据集上，剪枝时间相对 Perplexity/ASK-LLM 这类全量 LLM 方法下降约 97%，端到端主动学习时间最高减少约 74.5%

#### 🔬 深入细节
![ActivePrune 框架图](https://arxiv.org/html/2410.04275v1/x1.png)
*图：来自论文 Figure 1 的 ActivePrune 流程。未标注池先经 KenLM 5-gram 计算困惑度，再对候选子集运行量化 LLM 质量评分，合并后的过滤池交给主动学习 acquisition function。*

```python
# ActivePrune 的核心流程，整理自论文 Algorithm 1
def active_prune(unlabeled_pool, total_budget, query_budget, prune_size, beta):
    labeled_set = []
    ppl = compute_kenlm_perplexity(unlabeled_pool)

    while len(labeled_set) < total_budget:
        filtered_pool = set()

        low_ppl = select_bottom_k(unlabeled_pool, score=ppl, k=prune_size)
        filtered_pool.update(low_ppl)

        llm_candidates = unlabeled_pool - low_ppl
        quality = compute_llm_quality_scores(llm_candidates)
        high_quality = select_top_k(llm_candidates, score=quality, k=prune_size)
        filtered_pool.update(high_quality)

        selected = acquisition_function(filtered_pool, budget=query_budget)
        labels = human_oracle(selected)
        labeled_set.extend(labels)
        unlabeled_pool -= selected

        ppl = reweight_perplexity(ppl, unlabeled_pool, selected, beta)

    return labeled_set
```

主动学习的标准循环可以写成：给定未标注池 \(\mathcal{U}=\{x_i\}_{i=1}^{N}\)、已标注集 \(\mathcal{L}\) 和 acquisition function \(\mathcal{Q}\)，每轮从 \(\mathcal{U}\) 中挑选最值得标注的样本，再用新标签训练 acquisition model \(\mathcal{M}\)。问题在于，当 \(\mathcal{U}\) 很大时，\(\mathcal{Q}\) 需要对海量样本做模型推理、不确定性估计或多样性计算，交互式标注流程会被长时间等待打断。ActivePrune 的设计点是只构造一个较小但高质量的过滤池 \(\mathcal{F}\)，让 \(\mathcal{Q}\) 面对 \(\mathcal{F}\) 而不是全量 \(\mathcal{U}\)。

第一阶段使用 n-gram LM 的困惑度做便宜的全局扫描。对样本 \(x=(w_1,\ldots,w_N)\)，困惑度可理解为语言模型对该序列的平均惊讶程度：

$$
\mathrm{PPL}(x)=\exp\left(-\frac{1}{N}\sum_{i=1}^{N}\log p(w_i\mid w_{<i})\right)
$$

论文选择 KenLM 5-gram 是工程上很关键的取舍：它不是最强的语义模型，但查询快、内存友好，适合每轮覆盖全量未标注池。ActivePrune 将困惑度升序排序，选取最低困惑度的 bottom-\(k\) 样本加入 \(\mathcal{F}\)。直觉是，极高困惑度样本往往包含噪声、格式异常或分布外文本；先保留流畅、可学习的样本，可以避免 acquisition function 被大量低质量输入拖慢。

第二阶段专门处理第一阶段没有直接保留的高困惑度区域。论文对 \(x\in\mathcal{U}\setminus\mathcal{P}_s\) 构造任务相关提示 \(P(x_i,\tau)\)，询问该样本是否适合用于任务 \(\tau\) 的训练，并要求 LLM 只回答 yes/no。若 LLM 输出 logits 为 \(L\)，质量分定义为 yes token 的 softmax 概率：

$$
q(x_i)=\mathrm{softmax}(L)_{\text{yes}}=
\frac{\exp(L_{\text{yes}})}{\sum_j \exp(L_j)}
$$

这样做的细节价值在于，它没有把高困惑度样本全部丢弃。某些样本困惑度高是因为领域术语、长句或信息密度大，但这类样本对主动学习可能很有价值。量化 LLM 只在较小候选集上运行，承担更昂贵的语义质量判断；最终过滤池 \(\mathcal{F}=\mathcal{P}_s\cup\mathcal{Q}_s\) 同时包含语言上稳定的低困惑度样本和 LLM 认为值得学习的高质量样本。

Perplexity reweighting 解决的是跨轮多样性。若每轮都按原始困惑度取 bottom-\(k\)，采样会反复落在相似困惑度区间。ActivePrune 在第 \(t\) 轮结束后，对未标注样本 \(x_i\) 计算它与最新标注样本集合 \(\mathcal{S}\) 在困惑度空间中的平均距离：

$$
A(x_i,\mathcal{S})=\frac{1}{|\mathcal{S}|}\sum_{l\in\mathcal{S}}|P(x_i)-P(l)|
$$

随后更新困惑度：

$$
P_{\mathrm{new}}(x_i)=P_{\mathrm{old}}(x_i)-\beta\cdot A(x_i,\mathcal{S})
$$

由于 ActivePrune 下一轮仍会优先取低困惑度样本，距离最近标注样本较远的候选会被降低困惑度，从而更容易被选入过滤池。这个机制不是给 acquisition function 本身加 diversity loss，而是在剪枝层面改变候选池分布，因此可以和不同主动学习策略组合。论文给出的命题说明，若某个子集在困惑度上持续不同于已选样本，重加权会逐步提高它被选中的概率。

> 💡 关键：ActivePrune 的效率来自“便宜的全量困惑度扫描 + 昂贵的局部 LLM 评分”，质量来自“低困惑度稳定样本 + 高 LLM 质量样本 + 跨轮重加权”的组合。

从模型压缩视角看，ActivePrune 压缩的不是模型参数，而是主动学习每轮交给 acquisition function 的候选空间。它和蒸馏/压缩链条的关系在于：使用量化 LLM 作为低成本数据质量评估器，把全量大模型评分替换成两阶段近似流程。相比 Random 或 UPS，它更有语义质量意识；相比 Perplexity/ASK-LLM 全量 LLM 打分，它显著减少推理成本，同时保持主动学习选择质量。

#### 🧪 练习题
```yaml
question: "ActivePrune 中 perplexity reweighting 的主要作用是什么？"
options:
  - "让与近期已选样本困惑度差异较大的未标注样本在后续轮次更容易进入过滤池"
  - "把 KenLM 替换成 full attention Transformer"
  - "直接训练最终下游模型的分类头"
  - "删除主动学习中的人工标注步骤"
answer: 0
explain: "重加权会降低远离近期已选样本的候选困惑度，而下一轮会优先选择低困惑度样本，因此 underrepresented 区域会被逐步带入候选池。"
```

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
Longformer 将标准 Transformer 的全连接自注意力替换为滑动窗口局部注意力、可选空洞窗口和任务驱动全局注意力的组合，使 BERT/RoBERTa 类模型能以近似线性复杂度处理数千 token 的长文档。

#### 🎯 核心要点
- 使用 sliding window attention，每个 token 只关注固定窗口内邻居，把注意力复杂度从 \(O(n^2)\) 降到 \(O(nw)\)
- 支持 dilated sliding window，通过空洞间隔扩大感受野，不显著增加每层连接数
- 引入 task motivated global attention，使 `[CLS]`、问题 token 等少量关键 token 与全序列双向交互
- 局部注意力和全局注意力使用两套线性投影 \(Q_s,K_s,V_s\) 与 \(Q_g,K_g,V_g\)，提升不同注意力类型的建模灵活性
- 注意力模式可作为标准 self-attention 的 drop-in replacement，用 RoBERTa checkpoint 继续 MLM 预训练
- 提供 loop、chunk、自定义 CUDA/TVM kernel 等实现路径，在长序列下显存随长度近似线性增长
- 论文同时提出 Longformer-Encoder-Decoder (LED)，用于 arXiv summarization 等长文档生成任务

#### 🔬 深入细节
![Longformer 全局加滑动窗口注意力](https://ar5iv.labs.arxiv.org/html/2004.05150/assets/x5.png)
*图：来自论文 Figure 2(d) 的 global + sliding window attention。少量全局 token 连接整段序列，其余 token 主要保留局部窗口连接。*

```python
# Longformer 单层注意力模式伪代码
def longformer_attention(tokens, window, global_indices):
    outputs = []
    for i, token in enumerate(tokens):
        attend = set(range(max(0, i - window // 2),
                           min(len(tokens), i + window // 2 + 1)))

        # 全局 token 读取全序列；普通 token 也读取所有全局 token
        if i in global_indices:
            attend = set(range(len(tokens)))
            q, k, v = project_global_query(token), project_global_keys(tokens), project_global_values(tokens)
        else:
            attend.update(global_indices)
            q, k, v = project_local_query(token), project_mixed_keys(tokens, attend), project_mixed_values(tokens, attend)

        outputs.append(scaled_dot_product_attention(q, k[attend], v[attend]))
    return outputs
```

标准 Transformer 的自注意力会计算完整的 \(QK^\top\) 矩阵：

$$
\mathrm{Attention}(Q,K,V)=\mathrm{softmax}\left(\frac{QK^\top}{\sqrt{d_k}}\right)V
$$

当序列长度为 \(n\) 时，矩阵大小为 \(n\times n\)，时间和显存复杂度都是 \(O(n^2)\)。这正是 BERT/RoBERTa 常见 512 token 限制背后的核心瓶颈。Longformer 的基本判断是：长文档中绝大多数局部语义依赖可以通过邻近窗口捕获，而少数任务关键位置需要全局视野；没有必要让每个 token 都直接连接所有 token。

滑动窗口注意力把第 \(i\) 个 token 的可见集合定义为：

$$
\mathcal{A}_{\mathrm{local}}(i)=\{j:\ |i-j|\le w/2\}
$$

固定窗口大小 \(w\) 后，每个 token 只和 \(w\) 个左右邻居交互，总连接数变为 \(O(nw)\)。在 \(w\) 不随 \(n\) 增长时，这就是线性扩展。多层堆叠会扩大有效感受野：若每层窗口近似为 \(w\)，堆叠 \(\ell\) 层后，顶层表示可整合约 \(\ell\times w\) 范围内的信息。这一点类似 CNN 的局部卷积堆叠，只是每个窗口内部仍然通过注意力动态加权。

Dilated sliding window 用空洞间隔 \(d\) 进一步扩大感受野：

$$
\mathcal{A}_{\mathrm{dilated}}(i)=\{i+k\cdot d:\ k\in[-w/2,w/2]\}
$$

这样每个 token 仍然只看 \(w\) 个位置，但覆盖跨度变为约 \(d\cdot w\)。论文在字符级语言建模中让低层更多关注无空洞的局部上下文，高层使用部分带 dilation 的 head 捕获远距离关系。这种层级配置避免低层过早稀释局部语法信号，同时让高层拥有长程建模能力。

全局注意力是 Longformer 用于下游任务的关键补丁。对于分类，`[CLS]` 需要聚合整篇文档；对于问答，question tokens 需要和文档 token 直接比较。Longformer 因此为少量预选 token 设置 symmetric global attention：全局 token attends to all tokens，所有普通 token 也 attends to global tokens。若全局 token 数为 \(g\)，总复杂度可写作：

$$
O(nw+ng+g n)
$$

当 \(g\ll n\) 且由任务固定时，复杂度仍近似 \(O(n)\)。注意这里的全局 token 不是恢复 full attention，而是提供低成本的信息汇聚和广播通道。论文还为局部与全局注意力使用不同投影：\(Q_s,K_s,V_s\) 计算 sliding attention，\(Q_g,K_g,V_g\) 计算 global attention，并用局部投影初始化全局投影，使模型可在继续预训练时稳定迁移。

> 💡 关键：Longformer 的稀疏化不是随机丢边，而是把“局部上下文建模”和“任务级全局汇聚”拆成两种明确角色。

训练流程上，Longformer 先从 RoBERTa checkpoint 出发，把 self-attention 替换为长序列稀疏注意力，再继续进行 MLM 预训练，最大输入扩展到 4096 token。对于 character-level LM，论文采用分阶段训练：从较短序列和较小窗口开始，逐阶段加倍序列长度和窗口大小，并降低学习率。这能先学稳局部上下文，再逐步让模型利用更长范围。实现上，Longformer-loop 易理解但慢，Longformer-chunk 适合无 dilation 的预训练/微调，自定义 CUDA kernel 支持更完整的 dilated pattern。

与传统截断或 chunking 方法相比，Longformer 的优势是单次前向能保留完整文档上下文，避免跨 chunk 信息丢失和额外聚合模型。与后来的 BigBird 相比，Longformer 更偏工程和任务归纳偏置：它没有依靠随机边提供理论连通性证明，而是用清晰的 local + global 结构服务长文档分类、问答、共指和摘要。

#### 🧪 练习题
```yaml
question: "Longformer 为什么需要在滑动窗口之外加入 global attention？"
options:
  - "因为分类或问答等任务需要少量关键 token 直接聚合或访问全序列信息"
  - "因为滑动窗口会删除所有位置信息"
  - "因为 global attention 能把模型参数量降为零"
  - "因为所有 token 都必须恢复完整二次复杂度注意力"
answer: 0
explain: "纯局部窗口的信息传播依赖层数；global token 作为任务驱动的信息枢纽，让 `[CLS]` 或问题 token 直接连接整段文档，同时保持整体近似线性复杂度。"
```

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
BigBird 提出由随机注意力、滑动窗口注意力和全局注意力组成的块稀疏 Transformer，在把长序列注意力复杂度降为线性的同时，保留 Transformer 的通用逼近能力和图灵完备性等理论性质。

#### 🎯 核心要点
- 稀疏注意力由三类连接组成：random attention、sliding window attention、global attention
- 使用 block sparse attention，把 token 分块后按稀疏图计算注意力，适合 GPU/TPU 上紧凑执行
- 随机连接提供远距离短路径，使稀疏注意力图具备更好的连通性和快速信息传播
- 滑动窗口连接保留文本序列的局部结构，对语法、短语和邻近上下文建模稳定
- 全局 token 与全序列双向连接，可采用 BigBird-itc 的内部全局 token 或 BigBird-etc 的额外全局 token
- 当窗口块数 \(w\)、随机块数 \(r\)、全局块数 \(g\) 固定时，注意力连接数随序列长度 \(n\) 线性增长
- 理论上证明包含 star graph 的稀疏注意力仍可作为序列函数的 universal approximator，并可在 encoder-decoder 架构中保持图灵完备性
- 实验覆盖问答、摘要和基因组序列建模，最长可在相近硬件上处理比既有模型更长的序列

#### 🔬 深入细节
![BigBird 组合注意力模式](https://ar5iv.labs.arxiv.org/html/2007.14062/assets/x4.png)
*图：来自论文 Figure 1(d) 的 BigBird 组合模式。白色表示无连接，最终注意力由随机块、局部窗口块和全局块叠加而成。*

```python
# BigBird block sparse attention 伪代码
def bigbird_attention(tokens, block_size, window_blocks, random_blocks, global_blocks):
    blocks = split_into_blocks(tokens, block_size)
    outputs = {}

    for i, block in enumerate(blocks):
        if i in global_blocks:
            attend = set(range(len(blocks)))              # global block attends all blocks
        else:
            attend = set()
            attend.update(local_neighbor_blocks(i, window_blocks))
            attend.update(sample_random_blocks(i, random_blocks, len(blocks)))
            attend.update(global_blocks)                  # all blocks attend global blocks

        outputs[i] = block_sparse_attention(query=blocks[i],
                                            keys=[blocks[j] for j in attend],
                                            values=[blocks[j] for j in attend])
    return merge_blocks(outputs)
```

BigBird 的出发点比 Longformer 更理论化：如果只用局部窗口，复杂度可以线性化，但远距离 token 的信息传播需要很多层；如果加入少量全局 token，任务汇聚变得容易，但普通 token 之间的长程路径仍可能受限。BigBird 将注意力矩阵看成有向图 \(D\)：节点是 token 或 block，边表示 query 可以 attend 到哪些 key。设计好的稀疏图需要同时满足局部结构、远距离短路径和全局汇聚。

三类边的职责很清晰。滑动窗口边让第 \(i\) 个 block 关注附近 block：

$$
\mathcal{A}_{\mathrm{window}}(i)=\{j:\ |i-j|\le w/2\}
$$

随机边让每个 query block 额外连接 \(r\) 个随机 key block：

$$
\mathcal{A}_{\mathrm{random}}(i)=\{j_1,\ldots,j_r\},\quad j_k\sim \mathrm{Uniform}([1,n])
$$

全局边让少量全局 block \(G\) 与全序列双向连接：

$$
\mathcal{A}_{\mathrm{global}}(i)=G,\qquad \mathcal{A}(g)=\{1,\ldots,n\},\ g\in G
$$

最终 BigBird 的可见集合可以概括为：

$$
\mathcal{A}_{\mathrm{BigBird}}(i)=
\mathcal{A}_{\mathrm{window}}(i)\cup
\mathcal{A}_{\mathrm{random}}(i)\cup
\mathcal{A}_{\mathrm{global}}(i)
$$

若每个 block 的窗口连接数 \(w\)、随机连接数 \(r\)、全局连接数 \(g\) 都固定，则总连接数近似为：

$$
|\mathcal{E}|=O(n(w+r+g))
$$

这使注意力计算和显存从 full attention 的 \(O(n^2)\) 降为 \(O(n)\) 级别。论文采用 block sparse 的原因也在这里：实际硬件上按单个 token 随机 gather 往往低效，按 block 组织稀疏矩阵能更好地打包局部窗口、全局列和随机列，在 GPU/TPU 上执行更紧凑。

随机注意力是 BigBird 相比 Longformer 的核心差异。论文借鉴随机图和 small-world network 的直觉：在只有 \(\tilde{\Theta}(n)\) 条边的随机图中，任意节点间的最短路径通常是对数级，信息混合速度明显好于纯局部链式结构。对注意力图来说，随机边不是噪声，而是廉价的远程捷径；它让远隔数千 token 的片段可以通过少量层建立通信路径。

全局 token 则承担理论和任务两方面的角色。论文讨论了两种设计：BigBird-itc 将现有输入中的一部分 token 设为 global；BigBird-etc 额外引入全局 token，并可按任务结构设计，例如 question token、paragraph token 或 `[CLS]`。理论证明中，包含以特殊 token 为中心的 star graph \(S\) 是关键条件：若稀疏图 \(D\) 包含 \(S\)，则对连续序列函数 \(f\)，存在稀疏 Transformer \(g\) 可以逼近它：

$$
\forall f\in \mathcal{F}_{\mathrm{CD}},\ \forall \epsilon>0,\quad
\exists g\in \mathcal{T}_{D}^{H,m,q}\ \text{s.t.}\ d_p(f,g)\le \epsilon
$$

直观解释是，全局 token 先收集全序列的上下文编码，再通过后续层把上下文广播回各位置，从而补偿稀疏注意力缺失的直接全连接。论文进一步说明，稀疏 encoder-decoder Transformer 在相同理想化精度条件下仍可模拟图灵机，说明 BigBird 并不是单纯工程剪枝，而是在理论表达能力上保留了 full Transformer 的关键性质。

> 💡 关键：BigBird 的三类连接分别解决三个问题：窗口边保局部结构，随机边降图直径，全局边做汇聚和理论上的信息中转。

与 Longformer 对比，BigBird 的 local + global 部分相似，但额外随机边让图连通性更强，也带来了 universal approximation 和 Turing completeness 的证明。代价是实现和调参更复杂：随机 block 的采样、稀疏 gather、全局 token 的任务设计都会影响性能。部署时，BigBird 更适合需要极长上下文且长程交互重要的任务，如多跳问答、长文档摘要和 DNA 序列建模；若任务主要依赖邻近上下文和少量聚合 token，Longformer 的确定性窗口结构可能更简单。

#### 🧪 练习题
```yaml
question: "BigBird 中 random attention 的核心作用是什么？"
options:
  - "用少量远程随机边缩短稀疏注意力图中的路径，改善长距离信息传播"
  - "随机删除所有全局 token"
  - "把滑动窗口大小固定为 1"
  - "将模型权重量化为 4 bit"
answer: 0
explain: "随机边让原本局部链式传播的稀疏图获得远程捷径，与窗口边和全局边共同维持线性复杂度下的连通性。"
```

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
N:M Sparsity 将每 \(M\) 个连续权重约束为最多 \(N\) 个非零值，并用 SR-STE 从头训练这种细粒度结构稀疏网络，解决了非结构化稀疏难以硬件加速、粗粒度结构稀疏精度损失大的矛盾。典型的 NVIDIA Ampere 2:4 形式让稀疏模式可以被 Sparse Tensor Core 直接利用，把规则稀疏转化为真实矩阵乘吞吐收益。

#### 🎯 核心要点
- 定义 N:M 细粒度结构稀疏：每个连续 \(M\) 权重组中最多 \(N\) 个非零，兼具局部规则性和细粒度表达能力
- 典型 2:4 模式适配 NVIDIA Ampere Sparse Tensor Core，权重矩阵压缩为非零值加少量索引元数据
- 使用在线幅值投影 \(S(W,N,M)\)，前向时在每组内保留幅值最大的 \(N\) 个权重并生成稀疏子网络
- 从头训练稀疏网络，避免 ASP 类“两阶段稠密训练 + 剪枝 + 重训”的额外训练成本
- 用 STE 近似不可导 top-k/mask 操作，但指出 vanilla STE 会造成稀疏拓扑频繁震荡
- 提出 Sparse-Refined Straight-Through Estimator (SR-STE)，只对被剪权重加入稀疏修正项，稳定 mask
- 定义 Sparse Architecture Divergence (SAD) 度量二值稀疏 mask 在训练过程中的拓扑变化
- 在 ImageNet、检测、分割、光流、机器翻译等任务上验证 N:M + SR-STE 的通用性

#### 🔬 深入细节
![2:4 structured sparsity pattern and compression](https://developer-blogs.nvidia.com/wp-content/uploads/2023/06/2-4-structured-sparsity-pattern.png)
*图：NVIDIA 官方技术博客中的 2:4 结构化稀疏压缩示意。论文 Figure 1 也展示了同一核心机制：连续权重分组、按组剪枝、压缩为非零值与索引元数据后交给专用稀疏计算单元。*

```python
# N:M sparsity with SR-STE: 从头训练而非先训练稠密模型
for x, y in train_loader:
    sparse_params = {}
    masks = {}

    for name, W in model.named_weights():
        group = W.reshape(-1, M)
        # 每组保留幅值最大的 N 个；其余权重前向中置零
        mask_group = topk_abs_mask(group, k=N)
        masks[name] = mask_group.reshape_as(W)
        sparse_params[name] = W * masks[name]

    logits = model.forward_with(sparse_params, x)
    loss = criterion(logits, y)
    loss.backward()

    for name, W in model.named_weights():
        pruned_mask = 1 - masks[name]
        # vanilla STE: W.grad 直接来自稀疏子网络
        # SR-STE: 对当前被剪权重加入 lambda_W * W，推动它们继续变小
        W.grad = W.grad + lambda_W * pruned_mask * W

    optimizer.step()
    optimizer.zero_grad()
```

论文的核心切入点是“稀疏的表达粒度”和“稀疏的硬件可执行性”之间的折中。非结构化稀疏可以在任意位置置零，因此给优化器留下的自由度最大，但非零索引分布不规则，GPU 上的加载、调度和矩阵乘都很难稳定跳过零值。通道剪枝、块剪枝等粗粒度结构化稀疏更容易映射到硬件，却一次删除整组通道或子结构，常常把可用表达能力一并删掉。N:M 稀疏位于中间：它只要求局部连续 \(M\) 个权重中最多 \(N\) 个非零，约束足够规则，硬件能压缩存储和调度；同时组很小，模型仍可在每个局部组内选择最重要连接。

N:M 投影可写成一个带约束的训练目标：

$$
\min_{S(W,N,M)} \mathcal{L}(W;\mathcal{D})
$$

其中 \(S(W,N,M)\) 表示满足 N:M 约束的稀疏参数。对任意长度为 \(M\) 的连续权重组 \(\mathbf{w}=(w_1,\ldots,w_M)\)，前向投影保留幅值最大的 \(N\) 个元素：

$$
\tilde{w}_i =
\begin{cases}
w_i, & |w_i| \ge \xi_N(\mathbf{w}) \\
0, & |w_i| < \xi_N(\mathbf{w})
\end{cases}
$$

\(\xi_N(\mathbf{w})\) 是组内第 \(N\) 大幅值阈值。2:4 是最常见的硬件形态，可简写为 \(\|\mathbf{w}_{k:k+4}\|_0 \le 2\)。部署时，原始 \(R\times C\) 权重矩阵可以压缩为约一半的非零数据值，以及每组用于标识保留位置的 \(\log_2 M\) 位索引；Sparse Tensor Core 读取这种规则元数据后执行稀疏矩阵乘。

训练难点在于 top-k mask 是离散投影，普通反向传播无法对“谁被保留”直接求导。论文先用 STE 让稀疏子网络的梯度直接回传到稠密影子权重：

$$
W_{t+1} \leftarrow W_t-\gamma_t g(\tilde{W}_t)
$$

问题是 \(\tilde{W}_t=S(W_t,N,M)\) 和 \(W_t\) 不一致：未被保留的权重前向中是 0，反向更新的却是原始稠密变量。这样得到的梯度对被剪权重尤其粗糙，可能把原本应保持为 0 的权重重新推大，下一步 top-k 又换掉一批连接，造成稀疏架构来回震荡。

SR-STE 的修正项正是为了解决这种震荡。令 \(E_t\) 是当前保留权重的二值 mask，\(\bar{E}_t=1-E_t\) 表示当前被剪权重，更新式变为：

$$
W_{t+1}=W_t-\gamma_t\left(g(\tilde{W}_t)+\lambda_W(\bar{E}_t\odot W_t)\right)
$$

当 \(\lambda_W=0\) 时退化为 vanilla STE；当 \(\lambda_W>0\) 时，额外项只作用在被剪权重上，把它们继续向 0 收缩。直觉上，当前被剪掉的连接如果仍被大幅更新，就会在下一次分组 top-k 中重新挤进保留集合；SR-STE 降低这种翻转概率，让 sparse architecture 更稳定。

为了量化这种稳定性，论文定义了 Sparse Architecture Divergence：

$$
\mathrm{SAD}_{i:j}=\|E_j-E_i\|_1
$$

它统计两次迭代之间二值 mask 的连接状态变化数量。SAD 小不等于永远不更新结构，而是说明结构变化更受控；论文实验显示，vanilla STE 的 SAD 更高且精度明显低于稠密模型，而 SR-STE 在合适 \(\lambda_W\) 下能降低 SAD，使稀疏网络精度回到接近稠密网络的水平。

> 💡 关键：N:M 的价值不只是“参数更少”，而是把局部稀疏模式固定到硬件能识别的形状；SR-STE 则让这种形状可以从头训练出来，而不是依赖昂贵的稠密预训练和剪枝重训。

和 ASP 这类两阶段方法相比，论文的训练路径更直接：每个 step 都在前向生成 N:M 子网络，用稀疏子网络计算损失，再用 SR-STE 更新背后的稠密权重。这样省去了“稠密训练收敛后再剪枝再训练”的额外成本，同时保留了部署时所需的 2:4 或其他 N:M 格式。与动态稀疏训练相比，它不需要任意位置 regrow，而是在每个连续组内竞争名额；这使得最终模型天然满足硬件格式，不需要部署前再做复杂转换。

实际应用中，N:M 的约束通常施加在卷积和线性层权重上，第一层、归一化层或少数敏感层可以按任务选择保留稠密。2:4 和 4:8 都是 50% 稀疏，但硬件支持、索引编码和精度表现不同；1:4 或 2:8 更激进，FLOPs 更低但表达损失更大。论文给出的经验是：N:M 比“随意剪掉一半权重”更受限，但比删除整通道温和得多，适合与量化、蒸馏、TensorRT/cuSPARSELt 等部署链路组合。

#### 🧪 练习题
```yaml
question: "SR-STE 相比 vanilla STE 在训练 N:M 稀疏网络时主要解决什么问题？"
options:
  - "用额外项约束当前被剪权重，减少稀疏 mask 的无效震荡"
  - "取消 N:M 分组，让权重可以任意非结构化剪枝"
  - "把所有被剪权重永久冻结，训练中不再更新任何参数"
  - "只在推理阶段压缩权重，不影响训练"
answer: 0
explain: "SR-STE 在 STE 梯度中加入 \\(\\lambda_W(\\bar{E}_t\\odot W_t)\\)，只惩罚当前被剪权重，从而降低 SAD 并稳定稀疏拓扑。"
```

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
GigaMoE 将高分辨率广域图像检测 backbone 中昂贵的 FFN 替换为稀疏引导 MoE，用稀疏区域选择已有的重要性分数决定每个窗口调用多少专家，解决了 gigapixel detection 中所有候选区域被迫消耗同等计算的问题。它把“选哪些区域处理”的空间稀疏进一步扩展为“给重要区域分配更多计算”的条件计算稀疏。

#### 🎯 核心要点
- 面向 HRW/gigapixel object detection，基于 SparseFormer 等稀疏区域处理范式
- 观察到 SparseFormer backbone 中 FFN 占主要计算量，论文报告其占 backbone FLOPs 的 61.4%
- 在 GigaMoE Local Block 中保留局部窗口注意力，将标准 FFN 替换为 shared expert + specialized experts
- shared expert 处理所有被选窗口，提供稳定基础表征；specialized experts 只服务于需要额外容量的窗口
- Sparsity-Guided Routing 复用 ScoreNet 的窗口重要性分数，先决定每个窗口的专家数量 \(k_w\)，再由 router 选择具体专家
- 使用 inverted-pyramid 分配策略，论文最佳配置 \(P=(0.4,0.3,0.2,0.1)\)，让 top 10% 窗口调用 3 个专家
- 每个 expert 的隐藏维度按 \(C_{\mathrm{expert}}=C_{\mathrm{ffn}}/(k_{\max}+1)\) 缩小，避免最坏情况下超过原 FFN 计算规模
- 使用无辅助损失的在线 expert load balancing，通过随训练衰减的 bias 更新平衡专家负载
- 在 PANDA benchmark 上报告 DINO+GigaMoE 达到 79.1% AP，并相比 DINO+SparseFormer 降低 32.3% GFLOPs

#### 🔬 深入细节
![GigaMoE AAAI poster thumbnail](https://assets.underline.io/lecture/141368/poster_document_thumbnail/large-090b5475cd4d9b4bf5ff5c66e52213cf.jpg)
*图：AAAI 论文页面的 Poster 链接跳转到 Underline，图中 URL 是该官方展示页公开的 poster thumbnail。论文 PDF Figure 2 展示了四阶段层级 backbone、ScoreNet 选窗、Heuristic Mapping 分配 \(k\)、Router 选择专家和 shared/specialized expert pool 的整体结构。*

```python
# GigaMoE local block: sparsity-guided expert allocation
for feature_map in hierarchical_stages:
    z = global_attention_on_aggregated_windows(feature_map)
    scores = ScoreNet(z - window_average(z))        # window importance
    selected_windows = topk_windows(z, scores, K)

    ranks = rank_descending(scores[selected_windows])
    for w in selected_windows:
        # Heuristic Mapping: score rank -> number of specialized experts
        k_w = allocate_expert_count(rank=ranks[w], distribution=P)

        z_w = layer_norm(local_window_attention(w.features))
        pooled = mean_pool(z_w)
        gate = router(pooled) + expert_bias
        chosen = topk(gate, k=k_w)

        y_w = shared_expert(z_w)
        for i in chosen:
            y_w += softmax(gate)[i] * specialized_expert[i](z_w)

    # Loss-free online load balancing
    counts = count_assignments(chosen, num_experts=Ns)
    error = mean(counts) - counts
    expert_bias += update_rate(t) * sign(error)
```

Gigapixel/HRW 图像的核心困难不是单张图像语义更复杂，而是像素巨大、目标稀疏且尺度变化极端。SparseFormer 类方法先把全图切成窗口，用 ScoreNet 选择信息量高的窗口，只在这些窗口上做昂贵的局部处理。这已经减少了“处理哪里”的冗余，但论文进一步发现：即便窗口已经被筛过，标准 Transformer FFN 仍对所有被选窗口一视同仁。背景边缘、空旷天空、稀疏道路和密集人群都通过同一个大 FFN，导致内容简单区域浪费计算，复杂区域又没有额外容量。

GigaMoE 的第一步仍沿用稀疏处理框架。窗口聚合特征经过全局注意力补充长程上下文，再用 ScoreNet 产生窗口重要性：

$$
\mathrm{ScoreNet}(z,\hat{z})=\mathrm{SoftMax}(\mathrm{MLP}(z-\hat{z}))
$$

接着通过 top-k selection 得到稀疏窗口集合：

$$
Z_{\mathrm{sparse}}=M_{\mathrm{select}}\cdot Z
$$

关键变化发生在 GigaMoE Local Block：局部窗口注意力之后，原本的单体 FFN 被拆成一个 shared expert 和 \(N_s\) 个 specialized experts。shared expert 总是执行，保证每个窗口至少得到基础变换；specialized experts 按需执行，为复杂窗口提供额外表达能力。

专家数量不是 router 自己拍脑袋决定，而是由窗口分数排序决定。令 \(S=\{s_w\}_{w=1}^{K}\) 为被选窗口分数，按分数从高到低得到 rank \(r_w\)。给定分布 \(P=(p_0,\ldots,p_{k_{\max}})\)，窗口 \(w\) 被分配的 specialized expert 数量为：

$$
k_w=j,\quad
K\sum_{i=j+1}^{k_{\max}}p_i < r_w \le K\sum_{i=j}^{k_{\max}}p_i
$$

论文最佳配置 \(k_{\max}=3\)、\(P=(0.4,0.3,0.2,0.1)\)：最低 40% 窗口只过 shared expert，接下来的 30%/20%/10% 分别调用 1/2/3 个 specialized experts。这种 inverted-pyramid 让高分窗口拿到更多预算，同时限制平均 FLOPs。

在专家身份选择上，router \(G\) 对窗口归一化特征的均值池化表示打分：

$$
g_w=G(\mathrm{mean}(\mathrm{LN}(z_w)))
$$

输出是 shared expert 加上 top-\(k_w\) specialized experts 的加权和：

$$
y_w=E_{\mathrm{shared}}(z_w')+
\sum_{i\in \mathrm{TopK}(g_w,k_w)}
\mathrm{SoftMax}(g_w)_i\cdot E_i(z_w')
$$

这里的 \(k_w\) 控制“用多少专家”，router 控制“用哪些专家”。这比普通 top-k MoE 多了一层稀疏检测信号注入：区域选择分数既决定该不该处理，也决定处理到什么深度。

> 💡 关键：GigaMoE 的路由不是只看 token feature，而是复用稀疏检测流程已有的重要性信号，让“目标更可能出现、内容更复杂”的窗口获得更多专家计算。

MoE 常见风险是 expert collapse：router 总是选择少数专家，其他专家训练不足。传统做法通常加 auxiliary load-balancing loss，但这会引入额外损失权重，且可能干扰检测主目标。GigaMoE 使用 bias-based online balancing：每个 specialized expert 有一个 bias \(b_i\)，训练时统计当前 batch 分配量 \(c_i\)，计算 \(e_i=\bar{c}-c_i\)，再更新

$$
b_i \leftarrow b_i + u_t\cdot \mathrm{sign}(e_i)
$$

若专家使用不足，\(e_i>0\)，bias 增大，之后更容易被选中；若专家过载，bias 降低。更新率 \(u_t=u_{\mathrm{init}}\alpha_t\) 随训练步数线性或余弦衰减，前期快速纠偏，后期减少对已形成路由模式的扰动。

从计算设计看，GigaMoE 不是简单“加专家提高容量”。论文把每个 expert 的隐藏维度设置为 \(C_{\mathrm{expert}}=C_{\mathrm{ffn}}/(k_{\max}+1)\)，因此即使某窗口经过 shared expert 和最多 \(k_{\max}\) 个 specialized experts，总计算也与原来的大 FFN 大致可比；大多数窗口由于 \(k_w<k_{\max}\)，实际平均成本更低。这解释了为什么它能在 PANDA 上同时提高 AP 并降低 FLOPs。

与 N:M Sparsity 的固定硬件规则稀疏不同，GigaMoE 是输入相关的条件计算稀疏。N:M 在权重矩阵里固定每组保留几个非零，用于部署时的矩阵乘加速；GigaMoE 不删除专家权重，而是在每张图、每个窗口上动态决定激活哪些专家。它特别适合 gigapixel detection：同一张图里有极大背景、密集小目标、建筑边缘和复杂纹理，静态统一 FFN 难以同时满足效率和精度。

论文实验也符合这个直觉：SparseFormer 已经能筛掉大量空间冗余，但它的 FFN 仍是瓶颈；GigaMoE 把这个瓶颈改造成按重要性分配的专家计算后，在 DINO 检测头下报告 79.1% AP、51.24 GFLOPs，而 SparseFormer 对应为 75.71 GFLOPs。更重要的是，小目标和复杂区域获得更高预算，这正对应 PANDA 这类人群/车辆密集场景的检测难点。

#### 🧪 练习题
```yaml
question: "GigaMoE 中 Sparsity-Guided Routing 的核心作用是什么？"
options:
  - "用稀疏 backbone 的区域重要性分数决定每个窗口调用多少 specialized experts"
  - "把所有专家都固定激活"
  - "删除目标检测 head"
  - "将图像下采样到 224x224 后再检测"
answer: 0
explain: "GigaMoE 先用 ScoreNet 分数排序窗口，再按预设分布映射出 \\(k_w\\)，让复杂或高分窗口调用更多专家，简单窗口只用 shared expert 或少量专家。"
```

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
HieraSparse 提出分层半结构化稀疏 KV Cache 压缩与注意力 kernel，在 block 级和 N:M element 级同时稀疏化 key/value，并分别支持 prefill 与 decode，加速长上下文 LLM 中逐渐占主导的 KV attention 计算。

#### 🎯 核心要点
- 面向长上下文 LLM 的 KV Cache 显存和 attention 延迟瓶颈
- 将 KV cache 划分为 dense blocks 与 sparse blocks，形成 block-level 稀疏
- 对 sparse blocks 内部进一步执行 N:M 半结构化 element-level 稀疏
- 分别支持 key cache 和 value cache 的不同稀疏设置
- 支持 prefill 和 decode 阶段使用不同稀疏策略
- 提供压缩 kernel、metadata/memory pool 管理和 GPU sparse tensor core attention kernel

#### 🔬 深入细节
![HieraSparse 工作流](https://arxiv.org/html/2604.16864v1/x1.png)
*图：HieraSparse 将 KV cache 分为 dense/sparse block，对 sparse block 做 N:M 压缩，并用专门 attention kernel 在 prefill/decode 中读取。*

```python
# HieraSparse KV attention 伪代码
K_blocks, V_blocks = split_kv_cache_by_block(K_cache, V_cache)
for block in K_blocks, V_blocks:
    if important(block):
        dense_pool.store(block)
        block_index.add(block, type="dense", offset=dense_pool.offset)
    else:
        values, metadata = nm_prune_and_compress(block, N, M)
        sparse_pool.store(values, metadata)
        block_index.add(block, type="sparse", offset=sparse_pool.offset)

prefill_attention(query, dense_pool, sparse_pool, block_index)
optional_reprune_after_prefill()
decode_attention(new_query, dense_pool, sparse_pool, block_index)
```

长上下文 LLM 的 attention 成本随上下文长度快速增长。prefill 阶段要处理长输入，attention 可能占据 time-to-first-token 的主要部分；decode 阶段每生成一个 token 都要读历史 KV cache，KV 显存带宽和存储也会成为瓶颈。HieraSparse 同时压缩计算和 cache。

它的“分层”体现在两级稀疏。第一层是 block-level：把 KV cache 按序列块划分，重要块保持 dense，不重要块进入 sparse 路径。第二层是 element-level：对 sparse block 内部使用半结构化 N:M 稀疏，使它能被 sparse tensor core 加速。

若一个 sparse block 的向量被分成长度 \(M\) 的组，则约束为：

$$
\|\mathbf{v}_{k:k+M}\|_0\le N
$$

压缩后需要同时保存非零值和 metadata。block index mapping 记录每个块在 dense pool 或 sparse pool 中的位置，使 attention kernel 能按块类型加载数据。

> 💡 关键：HieraSparse 不只“剪 KV cache”，还提供与压缩格式匹配的 prefill/decode attention kernel，否则稀疏很难转化为真实速度。

prefill 与 decode 的最优稀疏策略不同。prefill 可批量处理长序列，decode 则是小 query 反复访问大 KV cache；HieraSparse 允许两个阶段使用不同稀疏率、key/value 也可分别设置稀疏模式。这种灵活性让质量、显存和延迟可以按部署目标调节。

与 BigBird/Longformer 的静态注意力图稀疏不同，HieraSparse 更贴近现代 LLM serving：模型结构可不变，重点压缩运行时 KV cache 并写专用 kernel。它适合百万 token 上下文、RAG 和 agent memory 等 KV cache 极大的场景。

#### 🧪 练习题
```yaml
question: "HieraSparse 的分层稀疏主要指哪两层？"
options:
  - "block-level KV cache 稀疏和 block 内 N:M element-level 半结构化稀疏"
  - "embedding 层稀疏和输出层稀疏"
  - "数据集剪枝和标签剪枝"
  - "教师模型和学生模型双模型蒸馏"
answer: 0
explain: "HieraSparse 先决定哪些 KV block 走 dense/sparse 路径，再对 sparse block 内部做 N:M 压缩以适配 sparse tensor core。"
```
