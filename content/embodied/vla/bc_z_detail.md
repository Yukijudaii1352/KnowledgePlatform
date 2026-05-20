### BC-Z: Zero-Shot Task Generalization with Robotic Imitation Learning

```yaml
id: bc_z
name: BC-Z
full_name: BC-Z: Zero-Shot Task Generalization with Robotic Imitation Learning
year: "2022"
org: Google Robotics
paper_url: https://arxiv.org/abs/2202.02005
category: embodied/vla
parent: —
motivation: 使用任务嵌入空间实现多任务模仿学习的零样本泛化，使机器人能执行训练时未见过的语言指令任务
```

#### 📝 一句话总结

BC-Z 提出了一个大规模多任务模仿学习框架，将 100+ 机器人操作任务共享一个控制策略，并通过任务嵌入空间（Task Embedding）实现零样本泛化——训练时仅见过 72 个任务，测试时能执行 28 个全新任务，成功率可达 32%（语言指令）和 4%（视频演示）。

#### 🎯 核心要点

- 构建了一个包含 100+ 机器人操作任务、25,877 条演示的大规模多任务数据集
- 提出基于任务嵌入条件的多任务模仿学习：策略 \\(\pi(a|s, z)\\) 以任务嵌入 \\(z\\) 为条件，而非任务 ID
- 任务嵌入通过编码器 \\(q(z|w)\\) 从语言指令或人类视频中提取，实现跨模态任务指定
- 采用 Hindsight Relabeling（后见重标定）和 HG-DAgger（人工引导 DAgger）高效收集高质量演示数据
- 提出 Adaptive State-Diff 方案：根据动作幅度自适应选择未来状态计算专家动作，避免拟合噪声
- 支持三种任务指定方式：one-hot 任务 ID、自然语言指令、人类操作视频

#### 🔬 深入细节

##### 核心框架图

![BC-Z 系统概览](https://ar5iv.labs.arxiv.org/html/2202.02005/assets/fig1.png)
*图 1：BC-Z 系统概览。左：数据集组成（100+ 任务、25,877 demos、8 名操作员）。右：策略架构——任务嵌入 \\(z\\) 从语言或视频中提取，与状态拼接后输入策略网络 \\(\pi(a|s, z)\\)。*

##### 动机与背景

传统机器人模仿学习面临的关键瓶颈是**数据和泛化**：
- 单任务策略：每个任务需要独立收集大量演示数据，成本高昂且无法泛化
- 多任务策略：虽然可以共享数据，但传统方法（如 one-hot 条件）无法将知识迁移到全新任务
- 任务指定：如何让机器人理解"未见过的任务描述"是一个开放问题

BC-Z 的核心洞察是：**如果任务之间共享底层操作技能（如抓取、放置、推动），那么通过一个共享的嵌入空间，模型就能从已学任务的组合中推断出新任务的执行方式。**

##### 核心机制详解

**1. 任务嵌入条件策略 (Task-Conditioned Policy)**

传统多任务模仿学习使用 one-hot 任务 ID 作为条件：
$$\pi(a|s, \text{task_id})$$

BC-Z 改用任务嵌入作为条件：
$$\pi_\theta(a|s, z), \quad z \sim q_\phi(z|w)$$

其中：
- \\(w\\) 是任务指定信息（语言句子或人类操作视频）
- \\(q_\phi\\) 是任务编码器（Sentence-BERT 用于语言，ResNet-18 用于视频帧）
- \\(z \in \mathbb{R}^{64}\\) 是共享的任务嵌入向量

> 💡 关键：同一个策略网络 \\(\pi_\theta\\) 处理所有任务，任务之间的知识共享通过梯度反向传播自动进行。训练时见过的任务组合方式，使模型能在嵌入空间中"插值"出未见任务的行为。

**2. Adaptive State-Diff 专家动作**

模仿学习需要从演示数据中提取专家动作。传统方法是对相邻帧做差分（state diff）：
$$a_t^{\text{naive}} = s_{t+1} - s_t$$

问题：噪声大、动作不平滑，尤其在演示动作幅度较小时，差分信号接近噪声。

BC-Z 提出 **Adaptive State-Diff**：根据动作幅度自适应选择未来时间步：
$$a_t^{\text{adaptive}} = s_{t+N} - s_t$$

其中 \\(N = \max\\{k \mid \|s_{t+k} - s_t\|_2 < \epsilon\\}\\)，即选择第一个超出阈值 \\(\epsilon\\) 的未来状态。这样确保在慢速动作时扩大差分步长，在快速动作时缩小步长，有效抑制噪声。

> ⚠️ 注意：Ablation 实验表明，去掉 Adaptive State-Diff 直接使用 naive diff（N=1）会导致策略拟合噪声、动作过慢，最终成功率从 52% 降至 3%。

**3. HG-DAgger 数据收集**

HG-DAgger（Human-Guided DAgger）是对经典 DAgger 算法的扩展，允许人工操作员在策略执行过程中进行干预和纠正：

- 策略执行时，操作员观察并通过遥操作设备进行实时干预
- 被干预的轨迹自动标记为"需要纠正"并加入训练集
- 干预次数与最终成功率呈负相关（见图 5），可用作实时性能代理指标

实验表明，用 50% 专家演示 + 50% HG-DAgger 干预数据训练的模型，性能**显著优于**100% 专家演示训练的模型，说明有针对性的干预数据比均匀采样的专家数据更有价值。

**4. Hindsight Relabeling**

为提升数据效率，BC-Z 使用后见重标定技术：
- 在执行轨迹中，即使最终目标未达成，中间步骤也可能完成了其他子任务
- 例如：执行"把瓶子放进碗里"时，过程中可能恰好完成了"抓起瓶子"
- 将这些中间步骤重标定为相应子任务的正面样本，大幅提升数据利用率

##### 训练流程

```python
# BC-Z 训练伪代码
# 多任务演示数据集 D = {(trajectory_i, task_desc_i)}

# 1. 任务编码器 q_phi (使用预训练模型，可冻结)
#   language: Sentence-BERT (all-mpnet-base-v2) -> MLP -> z in R^64
#   video: ResNet-18 (ImageNet pretrained) -> MLP -> z in R^64

# 2. 多任务 BC 训练循环
for batch in dataloader:
    s_t, future_states, task_desc = batch

    # 2.1 提取任务嵌入
    z = task_encoder(task_desc)  # shape: [B, 64]

    # 2.2 Adaptive State-Diff 计算目标动作
    for t in range(T):
        k = 1
        while norm(future_states[t+k] - s_t[t]) < epsilon:
            k += 1
        a_target[t] = future_states[t+k] - s_t[t]  # 自适应差分到第k帧

    # 2.3 策略预测
    a_pred = policy_network(concat(s_t, z))  # MLP: [S+64] -> [A]

    # 2.4 MSE 损失
    loss = mean((a_pred - a_target) ** 2)
    optimizer.step(loss)
```

##### 与传统方法的区别

| 维度 | 传统多任务 BC | 单任务 BC | BC-Z |
|------|-------------|----------|------|
| 任务指定 | one-hot ID | N/A | 语言/视频嵌入 |
| 数据共享 | 部分共享 | 独立 | 全部共享 |
| 零样本泛化 | ❌ | ❌ | ✅ (语言32%, 视频4%) |
| 数据效率 | 中 | 低 | 高 (HG-DAgger + Hindsight) |
| 动作提取 | naive diff | naive diff | Adaptive State-Diff |

##### 实验结果亮点

- **训练任务 21 项平均**：one-hot 42%，语言 40%，视频 24%
- **零样本泛化（28 项未见任务）**：语言 32%，视频 4%
- **Multi-task vs Single-task**：多任务 52% vs 单任务 5%（同一任务）
- **HG-DAgger 提升**：50% 干预数据优于 100% 专家数据（53% vs 27%）

#### 🧪 练习题

```yaml
question: "BC-Z 中 Adaptive State-Diff 的核心作用是什么？"
options:
  - "加速策略网络的推理速度"
  - "根据动作幅度自适应选择差分步长，抑制噪声并提高动作平滑性"
  - "在不同任务之间自适应分配网络容量"
  - "自动调整学习率以适应多任务训练"
answer: 1
explain: "Adaptive State-Diff 根据当前动作幅度动态选择 N（首个超出阈值的未来状态），避免 naive 差分在缓慢动作时拟合噪声，是模型成功的关键设计（去除后成功率从 52% 降至 3%）。"
```