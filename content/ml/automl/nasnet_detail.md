### NASNet — 可迁移架构搜索

```yaml
id: nasnet
name: NASNet
full_name: "可迁移架构搜索网络 (Learning Transferable Architectures for Scalable Image Recognition)"
year: "2018"
org: "Google Brain"
paper_url: "https://arxiv.org/abs/1707.07012"
category: "automl"
parent: "NAS"
motivation: "在小数据集(CIFAR-10)上搜索可复用Cell模块，迁移至大数据集(ImageNet)降低搜索成本"
```

#### 📝 一句话总结

NASNet 提出在小型代理任务（CIFAR-10）上搜索可堆叠的 Cell 结构（Normal Cell + Reduction Cell），并将搜索到的 Cell 直接迁移到大规模 ImageNet 任务上，在将搜索成本降低 7 倍的同时取得了当时 ImageNet 分类和 COCO 检测的最优性能。

#### 🎯 核心要点

- **可迁移搜索空间设计**：搜索目标从"整个网络架构"缩减为"可堆叠的 Cell 模块"，实现跨数据集迁移
- **双 Cell 结构**：Normal Cell（保持空间分辨率）+ Reduction Cell（步长 2，空间减半），交替堆叠构成完整网络
- **Block 级搜索空间**：每个 Cell 由 B=5 个 Block 组成，每个 Block 通过 5 步决策（选 2 个隐状态、选 2 个操作、选 1 个合并方式）构建
- **13 种候选操作**：包含 identity、各种尺寸的深度可分离卷积、空洞卷积、平均/最大池化等
- **RNN 控制器 + PPO 训练**：使用 LSTM 控制器生成架构描述，以验证集准确率为奖励，通过 PPO 优化
- **ScheduledDropPath 正则化**：训练过程中线性增加路径丢弃概率，优于固定 DropPath 和标准 Dropout
- **搜索效率**：500 GPU × 4 天 ≈ 2000 GPU-hours，比原始 NAS 快 7 倍
- **SOTA 结果**：CIFAR-10 2.4% 错误率、ImageNet 82.7% top-1、COCO 43.1% mAP

#### 🔬 深入细节

![NASNet 整体架构与 Cell 搜索空间](https://production-media.paperswithcode.com/methods/nasnet_cell.png)
*图：NASNet 的可堆叠 Cell 架构（左）与 Cell 内部搜索空间的 Block 结构（右）。Normal Cell 保持特征图尺寸，Reduction Cell 将空间维度减半。整个网络通过重复堆叠 N 个 Normal Cell 并在适当位置插入 Reduction Cell 构建。*

##### 算法伪代码

```python
# NASNet 架构搜索流程
# 控制器: LSTM RNN, 优化器: PPO

for iteration in range(max_iterations):
    # Step 1: 控制器采样架构
    for block_i in range(B):  # B=5 blocks per cell
        h1 = controller.predict_hidden_state()   # 从已有隐状态中选择
        h2 = controller.predict_hidden_state()   # 选第二个隐状态
        op1 = controller.predict_operation()     # 13种候选操作之一
        op2 = controller.predict_operation()     # 13种候选操作之一
        combine = controller.predict_combine()   # add 或 concat
    
    # Step 2: 构建子网络并在 CIFAR-10 上训练
    child_net = build_network(normal_cell, reduction_cell, N=6, filters=32)
    accuracy = train_and_evaluate(child_net, cifar10, epochs=50)
    
    # Step 3: 用验证准确率作为奖励更新控制器
    reward = accuracy
    controller.update_with_ppo(reward)

# 最终: 将搜索到的最佳 Cell 迁移到 ImageNet
# 通过增大 N (堆叠次数) 和初始滤波器数量来扩展模型
imagenet_model = build_network(best_normal_cell, best_reduction_cell, N=6, filters=4032)
```

##### 动机与背景

神经架构搜索（NAS）的核心问题是**搜索成本过高**。原始 NAS 直接在目标数据集上搜索完整网络架构，在 CIFAR-10 上需要 22,400 GPU-hours（800 GPU × 28 天），在 ImageNet 上则完全不可行。

NASNet 的关键洞察是：**优秀的局部结构（Cell）具有跨任务迁移性**。类比人工设计的网络（如 ResNet 的残差块、Inception 的多尺度模块），这些基本构建单元在不同规模的任务上都有效。因此，只需在小数据集上搜索最优 Cell，再通过调整堆叠次数和通道数迁移到大数据集。

##### 核心机制：可迁移的 Cell 搜索空间

**1. 网络宏观结构（固定）**

整个网络的宏观布局是预先确定的：

$$\text{Network} = \underbrace{\text{NCell} \times N}_{\text{第1组}} \to \text{RCell} \to \underbrace{\text{NCell} \times N}_{\text{第2组}} \to \text{RCell} \to \underbrace{\text{NCell} \times N}_{\text{第3组}} \to \text{Softmax}$$

其中 NCell 为 Normal Cell，RCell 为 Reduction Cell，\(N\) 为每组中 Cell 的重复次数。搜索时 \(N=6\)，迁移到 ImageNet 时可增大 \(N\) 以提升容量。

> 💡 关键：宏观结构固定使得搜索空间大幅缩减——控制器只需学习 Cell 内部的微观连接方式。

**2. Cell 内部搜索空间（Block 结构）**

每个 Cell 接收前两层的输出 \(h_{i-1}\) 和 \(h_{i-2}\) 作为初始隐状态集合。Cell 由 \(B=5\) 个 Block 构成，每个 Block 的构建过程如下：

- **Step 1**：从现有隐状态集合中选择 \(h_a\)
- **Step 2**：从现有隐状态集合中选择 \(h_b\)
- **Step 3**：为 \(h_a\) 选择一个操作 \(o_a\)
- **Step 4**：为 \(h_b\) 选择一个操作 \(o_b\)
- **Step 5**：选择合并方法（element-wise addition 或 concatenation）

最终输出为：\(\text{output} = \text{combine}(o_a(h_a),\; o_b(h_b))\)

每个 Block 的输出被加入隐状态集合，供后续 Block 选择。Cell 的最终输出是所有**未被任何 Block 选为输入**的隐状态的 concatenation。

**3. 13 种候选操作**

| 类别 | 操作 |
|------|------|
| 恒等 | identity |
| 卷积 | 1×1 conv, 3×3 conv, 1×3 then 3×1 conv, 1×7 then 7×1 conv |
| 深度可分离卷积 | 3×3, 5×5, 7×7 depthwise-separable conv |
| 空洞卷积 | 3×3 dilated conv |
| 池化 | 3×3 avg pool, 3×3 max pool, 5×5 max pool, 7×7 max pool |

> ⚠️ 注意：Normal Cell 中所有操作步长为 1；Reduction Cell 中对来自 \(h_{i-1}\) 或 \(h_{i-2}\) 的输入使用步长 2，实现空间下采样。

**4. 搜索空间规模**

每个 Block 有 5 个离散决策，Cell 有 5 个 Block，搜索 Normal + Reduction 两种 Cell：

$$|\mathcal{S}| \approx (|\text{hidden states}| \times |\text{ops}| \times |\text{combine}|)^{2 \times B} \sim 10^{28}$$

##### 控制器与训练流程

控制器是一个**单层 LSTM**，每个时间步输出一个 softmax 分类器来做出一个离散决策。对于两种 Cell（Normal + Reduction），控制器共输出 \(2 \times 5 \times 5 = 50\) 个决策 token。

训练采用 **Proximal Policy Optimization (PPO)**，奖励信号为子网络在 CIFAR-10 验证集上的准确率。相比原始 NAS 使用的 REINFORCE，PPO 提供了更稳定的策略更新。

搜索配置：
- 代理任务：CIFAR-10，子网络训练 50 epochs
- 控制器训练：500 个子网络并行评估
- 硬件：500 P100 GPU，4 天完成搜索
- 总计算量：~2000 GPU-hours（原始 NAS 的 1/7）

##### ScheduledDropPath 正则化

NASNet 发现标准的 Dropout 对 Cell 结构效果有限，提出了 **ScheduledDropPath**：

$$p_{\text{drop}}^{(t)} = p_{\max} \cdot \frac{t}{T}$$

其中 \(t\) 为当前训练步，\(T\) 为总训练步数，\(p_{\max}\) 为最终丢弃概率。训练初期路径丢弃概率接近 0（允许充分学习），后期逐渐增大（增强正则化）。

对比实验表明：
- 无 DropPath：3.03% 错误率
- 固定 DropPath（\(p=0.6\)）：2.97%
- **ScheduledDropPath**（\(p_{\max}=0.6\)）：**2.40%**

> 💡 关键：ScheduledDropPath 的设计直觉是——训练初期网络需要所有路径来学习有效表示，后期逐步丢弃路径迫使网络学习更鲁棒的特征。

##### 实验结果与对比

**CIFAR-10**：NASNet-A + cutout 达到 2.40% 错误率（3.3M 参数），超越所有手工设计架构和同期 NAS 方法。

**ImageNet 分类**（单模型，单裁剪）：

| 模型 | 分辨率 | 参数量 | Mult-Adds | Top-1 | Top-5 |
|------|--------|--------|-----------|-------|-------|
| Inception-ResNet-v2 | 299×299 | 55.8M | 13.2B | 80.1% | 95.1% |
| NASNet-A (7@1920) | 299×299 | 22.6M | 4.93B | 80.8% | 95.3% |
| SENet | 320×320 | 145.8M | 42.3B | 82.7% | 96.2% |
| **NASNet-A (6@4032)** | **331×331** | **88.9M** | **23.8B** | **82.7%** | **96.2%** |

NASNet-A 在达到相同 82.7% top-1 的同时，计算量仅为 SENet 的 56%（23.8B vs 42.3B）。

**移动端**：NASNet-A (4@1056) 以 5.3M 参数、564M Mult-Adds 达到 74.0% top-1，超越 MobileNet (70.6%) 和 ShuffleNet (70.9%)。

**COCO 目标检测**：以 NASNet-A 作为 Faster-RCNN 的 backbone，在 test-dev 上达到 43.1% mAP，超越此前最佳 4.0%。

##### 与传统方法的区别

| 维度 | 原始 NAS (2017) | NASNet (2018) |
|------|----------------|---------------|
| 搜索目标 | 完整网络架构 | 可堆叠的 Cell 模块 |
| 搜索数据集 | 目标数据集本身 | 小型代理数据集 (CIFAR-10) |
| 可迁移性 | 无（每个任务重新搜索） | 强（Cell 直接迁移到 ImageNet） |
| 搜索成本 | 22,400 GPU-hours | 2,000 GPU-hours（7× 加速） |
| 可扩展性 | 固定网络大小 | 通过 N 和滤波器数灵活缩放 |
| 优化算法 | REINFORCE | PPO（更稳定） |

NASNet 的核心贡献不仅是找到了更好的架构，更重要的是建立了 **"搜索 Cell → 堆叠迁移"** 的范式，这一思想被后续的 ENAS、DARTS、ProxylessNAS 等工作广泛采用。

#### 🧪 练习题

```yaml
question: "NASNet 相比原始 NAS 能将搜索成本降低 7 倍的最关键设计是什么？"
options:
  - "使用 PPO 替代 REINFORCE 作为控制器优化算法"
  - "将搜索目标从完整网络缩减为可迁移的 Cell 模块，在小数据集上搜索后迁移"
  - "将候选操作从 20 种减少到 13 种"
  - "使用 ScheduledDropPath 加速子网络训练收敛"
answer: 1
explain: "NASNet 的核心加速来自搜索空间的重新设计：只搜索 Cell 结构而非完整网络，并在小型 CIFAR-10 上完成搜索后迁移到 ImageNet，避免了在大数据集上的昂贵搜索。"
```