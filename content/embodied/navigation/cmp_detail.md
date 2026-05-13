### CMP — 认知地图与规划的视觉导航 (Cognitive Mapping and Planning for Visual Navigation)

```yaml
title: "Cognitive Mapping and Planning for Visual Navigation"
authors: "Saurabh Gupta, James Davidson, Sergey Levine, Rahul Sukthankar, Jitendra Malik"
venue: "CVPR 2017 / IJCV 2019"
year: "2017"
url: "https://arxiv.org/abs/1702.03920"
significance: "首次提出端到端可微的Mapper+Planner架构用于视觉导航，将空间记忆显式建模为自中心俯视图belief map，并通过层级Value Iteration Network进行可微规划"
```

#### 📝 一句话总结

CMP 提出了一种端到端可微的 Mapper + Planner 架构，其中 Mapper 将第一人称视觉观测增量式地融合为自中心俯视图空间记忆（belief map），Planner 基于层级 Value Iteration Network 在该 belief map 上进行可微路径规划，解决了传统 SLAM 脆弱且不可微、端到端 RL 缺乏空间记忆的两大痛点。

#### 🎯 核心要点

- **Mapper 架构**：通过 CNN 将第一人称 RGB/深度图像映射为自中心俯视图 free space 预测，结合 ego-motion warp 和置信度加权融合，增量式构建多尺度空间 belief map
- **可微 Warp 操作**：利用双线性采样（bilinear sampling）根据 ego-motion 将上一时刻的 belief map 变换到当前坐标系，保持端到端可微性
- **置信度加权更新**：Mapper 同时输出 free space 预测 \(f'_t\) 和置信度 \(c'_t\)，通过加权平均公式融合历史与当前观测，类似 GRU 的门控机制
- **层级 Value Iteration Network (VIN)**：在多个空间尺度上执行 value iteration（卷积 + channel-wise max-pooling），以 \(l \cdot k\) 次迭代覆盖 \(l \cdot 2^k\) 步的规划范围
- **端到端训练**：整个系统通过 DAGGER（带 scheduled sampling 的模仿学习）训练，Mapper 无需显式地图监督，而是学习生成对 Planner 有用的表示
- **两类导航任务**：几何目标（PointGoal，到达指定坐标）和语义目标（ObjectGoal，找到指定类别物体），在 S3DIS 数据集的未见建筑上测试
- **显著优于基线**：在几何任务上 CMP（depth）达到 89.3% 成功率 / 73.7% SPL，超越 LSTM（88.5% / 69.1%）和 Reactive（62.2% / 52.0%）基线

#### 🔬 深入细节

##### 整体架构

![CMP 整体架构](https://ar5iv.labs.arxiv.org/html/1702.03920/assets/x1.png)
*图 1：CMP 整体架构。Mapper 将第一人称图像转换为自中心俯视图 belief map，Planner 在 belief map 上通过 Value Iteration 输出动作策略。整个系统端到端可微。*

![Mapper 网络结构](https://ar5iv.labs.arxiv.org/html/1702.03920/assets/x2.png)
*图 2：Mapper 的 CNN 架构。ResNet 编码器提取图像特征，经全连接层变换到俯视图空间，再通过上卷积解码器输出 free space 预测和置信度。*

![层级 Planner 架构](https://ar5iv.labs.arxiv.org/html/1702.03920/assets/x3.png)
*图 3：层级 Planner 架构。在多个空间尺度上执行 value iteration（卷积 + max-pooling），从粗到细逐级规划，实现高效长程路径规划。*

##### 算法伪代码

```python
# CMP: Cognitive Mapping and Planning 核心流程
# 初始化
f_0 = zeros(H, W)  # belief map (free space)
c_0 = zeros(H, W)  # confidence map

for t in range(1, T+1):
    # === MAPPER ===
    # 1. Warp: 根据 ego-motion 将上一步 belief 变换到当前坐标系
    rho = compute_backward_flow(e_t)          # 解析计算 ego-motion 对应的光流
    f_prev_warped = bilinear_sample(f_{t-1}, rho)  # 可微双线性采样
    c_prev_warped = bilinear_sample(c_{t-1}, rho)
    
    # 2. Observe: CNN 从当前图像预测俯视图 free space + 置信度
    f_prime_t, c_prime_t = phi_CNN(I_t)       # ResNet encoder → FC → UpConv decoder
    
    # 3. Update: 置信度加权融合
    f_t = (f_prev_warped * c_prev_warped + f_prime_t * c_prime_t) / (c_prev_warped + c_prime_t)
    c_t = c_prev_warped + c_prime_t
    
    # === PLANNER (Hierarchical VIN) ===
    # 多尺度 value iteration
    for scale in range(K, -1, -1):  # 从最粗到最细
        map_s = downsample(f_t, factor=2^scale)
        goal_s = downsample(goal_map, factor=2^scale)
        reward = compute_reward(map_s, goal_s)
        value = zeros_like(map_s)
        for i in range(l):  # l 次 value iteration
            Q = conv3x3(value) + reward       # 卷积实现邻域值传播
            value = channel_wise_max(Q)        # max-pooling 选最优动作
        if scale > 0:
            value = center_crop_and_upsample(value)  # 传递到下一细尺度
    
    # 从最细尺度的 value map 提取当前位置的动作
    action_t = extract_policy(Q, robot_position)

# 训练: DAGGER with scheduled sampling
# 专家策略 = 图上最短路径; 逐步退火专家采样概率 (inverse sigmoid decay)
```

##### 动机与背景：为什么需要 CMP？

传统视觉导航方法分为两大阵营，各有致命缺陷。**经典 SLAM + 路径规划**方法（如 ORB-SLAM + A*）将问题分解为定位、建图、规划三个独立模块。这种方法依赖精确的几何重建，对传感器噪声、纹理缺失区域（如白墙）和动态环境极为脆弱。论文实验也验证了这一点：经典方法在使用 RGB 输入时 SPL 仅为 15.9%，因为纹理缺失的墙面无法被三角化重建，导致机器人直接撞上去。另一方面，**端到端深度强化学习**方法（如 DQN/A3C 直接从像素到动作）虽然避免了显式建图的脆弱性，但缺乏空间记忆机制——纯反应式策略无法记住已探索区域，LSTM 的隐状态也难以编码复杂的空间拓扑结构。实验表明，反应式策略在训练环境上表现良好（记忆了布局），但在未见环境上成功率骤降至 8.2%。

CMP 的核心洞察是：**将空间记忆显式建模为自中心俯视图 belief map，同时保持整个系统端到端可微**。这兼具了经典方法的空间推理能力和深度学习的鲁棒性与可学习性。

##### 核心机制：Mapper 的三步更新

Mapper 的核心更新公式为：

$$f_t = U\big(W(f_{t-1}, e_t),\; \phi(I_t)\big)$$

其中三个组件各司其职：

**Warp 函数 \(W\)**：给定 ego-motion \(e_t\)（由动作产生的平移/旋转），解析计算一个 backward flow field \(\rho(e_t)\)，将上一时刻的 belief map \(f_{t-1}\) 通过双线性采样变换到当前坐标系。关键设计是始终在**机器人自中心坐标系**下表示 belief map，而非全局坐标系。这大大简化了 CNN 的学习任务——网络只需预测"正前方的 free space"，而不需要处理任意旋转角度下的预测。双线性采样来自 Spatial Transformer Network，保证了梯度可以从 \(f_t\) 反传到 \(f_{t-1}\)。

**观测函数 \(\phi\)**：一个 ResNet-50 编码器 + 全连接层 + 上卷积解码器的 CNN。编码器在 2D 图像空间提取语义特征，全连接层完成从第一人称视角到俯视图的视角变换（这是一个非局部的几何变换，因此需要全连接层而非纯卷积），解码器上采样生成 free space 预测 \(f'_t\) 和置信度 \(c'_t\)。网络能利用语义线索（地板、墙壁、家具的外观和常见尺寸）来推断 free space，甚至对部分遮挡的区域也能做出合理预测。

**更新函数 \(U\)**：采用解析的置信度加权平均：

$$f_t = \frac{f_{t-1} \cdot c_{t-1} + f'_t \cdot c'_t}{c_{t-1} + c'_t}, \quad c_t = c_{t-1} + c'_t$$

这类似于 GRU 的更新门机制：置信度 \(c'_t\) 控制新观测对 belief 的影响权重。多次观测同一区域会累积置信度，使 belief 更加稳定；新探索区域的置信度低，容易被新观测覆盖。作者选择解析形式以保持架构简洁，但指出可替换为 LSTM 等更强表达力的函数。

##### 层级 Value Iteration Planner

Planner 基于 Value Iteration Network (VIN)，其核心思想是将 value iteration 算法实现为深度卷积网络：每次 value iteration 对应一个 \(3 \times 3\) 卷积（传播邻域值）加 channel-wise max-pooling（选择最优动作方向）。然而，原始 VIN 的规划步数等于网络深度，对于长程导航（32+ 步）计算和梯度传播都不可行。

CMP 引入**层级规划**：将 belief map 下采样 \(k\) 倍，在粗尺度上执行 \(l\) 次 value iteration，然后中心裁剪、上采样到细尺度继续迭代。这样只需 \(l \cdot k\) 次迭代就能覆盖 \(l \cdot 2^k\) 步的规划范围，实现了指数级的效率提升。

> 💡 **关键创新**：Planner 是**学习**得到的而非手工指定的。由于 belief map 是部分观测的（未探索区域的置信度为零），学习到的 Planner 能自然地处理不确定性——它知道哪些区域已观测、哪些未知，并据此做出探索-利用的权衡。

##### 训练流程与端到端学习

整个 CMP 系统使用 **DAGGER**（Dataset Aggregation）进行模仿学习训练。专家策略通过在离散化的导航图上计算最短路径获得。训练采用 online DAGGER：每个 episode 中，以一定概率从专家策略或当前学习策略采样下一步动作，概率通过 inverse sigmoid decay 逐步退火。

> ⚠️ **重要设计**：Mapper 没有显式的地图重建监督。它不需要产生与 ground truth free space 匹配的地图，而是学习生成对 Planner 有用的表示。这意味着 Mapper 可能学会编码超越纯几何信息的语义特征（如"这里看起来像走廊尽头，应该有门"）。

训练细节：ADAM 优化器，学习率 0.001 每 20K 迭代衰减 10 倍，共 60K 迭代。使用 ImageNet 预训练的 ResNet-50，深度图像通过 cross-modal distillation 从 RGB 模型迁移获得预训练权重。

##### 实验结果与对比

在 S3DIS 数据集上，测试集为训练中完全未见的建筑楼层：

| 方法 | 几何任务成功率 (t=199) | SPL | 语义任务成功率 (t=199) |
|------|----------------------|-----|----------------------|
| Reactive (4帧, depth) | 62.2% | 52.0% | 32.1% |
| LSTM (depth) | 88.5% | 69.1% | 29.3% |
| **CMP (depth)** | **89.3%** | **73.7%** | **51.0%** |
| Classical (depth) | 90.7% | 80.6% | 43.9% |
| Classical (RGB) | 17.7% | 15.9% | 22.5% |
| **CMP (RGB)** | **80.0%** | **59.4%** | **40.5%** |

CMP 在所有学习方法中表现最优。与经典方法相比，CMP 在 RGB 输入下优势巨大（59.4% vs 15.9% SPL），因为经典方法无法重建纹理缺失的表面。在 depth 输入下经典方法略优（依赖精确的深度传感器和完美位姿），但 CMP 加入更多训练数据（+6 个 Matterport3D 环境）后达到 82.3% SPL，超越经典方法。

#### 🧪 练习题

```yaml
question: "CMP 中 Mapper 的 belief map 始终在哪个坐标系下表示？这样设计的主要好处是什么？"
options:
  - "全局世界坐标系；方便多智能体共享地图"
  - "机器人自中心坐标系；简化 CNN 的学习任务，只需预测当前视角下的 free space"
  - "目标点坐标系；使 Planner 可以直接读取到目标的距离"
  - "上一时刻坐标系；避免 ego-motion 累积误差"
answer: 1
explain: "CMP 始终在机器人当前自中心坐标系下维护 belief map，这使得 CNN 只需学习从当前视角预测正前方的 free space，而不需要处理由累积 ego-motion 决定的任意世界坐标方向，大大降低了学习难度。"
```