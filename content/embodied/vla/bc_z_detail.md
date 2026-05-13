### BC-Z

```yaml
id: bc_z
name: BC-Z
full_name: "零样本任务泛化的行为克隆 (BC-Z: Zero-Shot Task Generalization with Robotic Imitation Learning)"
year: "2022"
org: "Google Research (Robotics)"
paper_url: "https://arxiv.org/abs/2202.02005"
category: "vla"
parent: "—"
motivation: "通过大规模多任务模仿学习+语言/视频任务条件化，实现对未见任务的零样本泛化"
```

#### 📝 一句话总结

BC-Z 提出了一种大规模多任务行为克隆系统，通过在 100 个操作任务（25,877 条演示）上训练语言/视频条件化策略，实现了对 29 个从未见过的任务的零样本泛化（语言条件下 24 个任务成功率非零，平均 44%），证明了简单的模仿学习方法在足够规模下可以获得任务级别的泛化能力。

#### 🎯 核心要点

- **大规模多任务数据集**：100 个操作任务、25,877 条真机演示，使用 HG-DAgger（共享自主）高效采集数据
- **双模态任务条件化**：支持自然语言指令和人类视频两种任务指定方式，统一映射到 512 维任务嵌入空间
- **语言编码器**：冻结的预训练 Universal Sentence Encoder (USE)，无需额外训练即可提供语义丰富的任务表征
- **视频编码器**：ResNet18 处理人类演示视频，通过语言回归辅助损失（cosine loss）对齐到语言嵌入空间
- **FiLM 条件化架构**：任务嵌入通过 FiLM 层注入 ResNet18 视觉编码器的每个残差块，实现任务感知的视觉特征提取
- **自适应状态差分动作**：将动作定义为到未来 \(N>1\) 步目标姿态的状态差分，避免 10Hz 控制下的微小动作和抖动问题
- **开环轨迹辅助预测**：策略额外预测未来 10 步开环轨迹作为辅助训练目标，推理时仅执行第一步（闭环）
- **零样本泛化**：语言条件下对 29 个未见任务中 24 个实现非零成功率，平均 44%；视频条件下泛化更困难（9 个任务非零，平均 4%）

#### 🔬 深入细节

##### 系统架构

![BC-Z 网络架构](https://ar5iv.labs.arxiv.org/html/2202.02005v1/assets/x3.png)
*图：BC-Z 网络架构。单目 RGB 图像经 ResNet18 编码，通过 FiLM 层接收任务嵌入 \(z\) 的条件化，最后经多头 MLP 预测各动作分量（delta XYZ、delta 轴角、夹爪角度）。*

##### 算法伪代码

```python
# BC-Z 训练流程伪代码
# 1. 数据采集（HG-DAgger 共享自主）
for round in range(num_rounds):
    deploy policy π with human supervisor
    human takes over when robot deviates  # 干预数据
    collect (s, a, task_id) into dataset D

# 2. 任务嵌入编码
z_lang = USE(language_command)           # 冻结，512-dim
z_video = ResNet18_video(human_video)    # 可训练，512-dim

# 3. 策略训练
for batch in dataloader(D):
    s, a, task_id = batch
    z = sample_task_embedding(task_id)   # 随机选语言或视频嵌入
    
    # FiLM 条件化视觉编码
    features = ResNet18_policy(image=s, film_conditioning=z)
    
    # 多头动作预测
    pred_xyz = MLP_xyz(features)         # delta XYZ
    pred_rot = MLP_rot(features)         # delta axis-angle
    pred_grip = MLP_grip(features)       # gripper angle
    
    # 行为克隆损失
    L_bc = HuberLoss(pred_xyz, a_xyz) + HuberLoss(pred_rot, a_rot) \
         + LogLoss(pred_grip, a_grip)
    
    # 语言回归辅助损失（对齐视频嵌入到语言空间）
    L_lang = CosineLoss(z_video, z_lang)
    
    # 总损失
    loss = L_bc + L_lang
    loss.backward()
    optimizer.step()
```

##### 动机与背景

传统的模仿学习方法通常针对单一任务训练，每个新任务都需要从头采集大量演示数据。这种范式在面对开放世界的多样化任务需求时，数据效率极低。BC-Z 的核心问题是：**能否通过在大量任务上训练一个统一的策略，使其具备对从未见过的任务的零样本泛化能力？**

此前的工作主要集中在少样本（few-shot）设置下，通过元学习等方法从少量演示中快速适应新任务。但这些方法仍需要新任务的机器人演示数据。BC-Z 探索了一个更激进的设定：**完全不需要新任务的任何机器人数据**，仅通过自然语言描述或人类视频即可执行新任务。

##### 数据采集：HG-DAgger 共享自主

BC-Z 采用 HG-DAgger（Human-Gated DAgger）方法高效采集数据。与传统的纯遥操作演示不同，HG-DAgger 让策略自主执行任务，人类操作员仅在策略偏离时接管控制：

$$\mathcal{D} = \mathcal{D}_{\text{expert}} \cup \mathcal{D}_{\text{DAgger}}$$

> 💡 **关键优势**：HG-DAgger 相比纯人工演示，在相同数据量下将任务成功率从 27% 提升至 53%（Table 4），因为干预数据天然覆盖了策略容易犯错的状态分布。

具体流程：7 台 Everyday Robots 机器人并行采集，每台配备头部单目 RGB 摄像头，操作员通过 6-DoF 手柄遥操作 7-DoF 机械臂（控制频率 10Hz）。总计采集 25,877 条演示，覆盖 100 个操作任务。

##### 任务嵌入：双模态条件化

BC-Z 的任务指定支持两种模态：

**语言条件化**：使用冻结的 Universal Sentence Encoder (USE) 将自然语言指令映射为 512 维嵌入向量。USE 的预训练语义空间天然具备泛化能力——语义相近的指令（如 "pick up the apple" 与 "grasp the fruit"）在嵌入空间中距离较近。

**视频条件化**：使用可训练的 ResNet18 编码器处理人类演示视频，输出 512 维嵌入。为解决视频嵌入容易过拟合的问题，引入**语言回归辅助损失**：

$$\mathcal{L}_{\text{lang}} = D_{\cos}(z_h^i, z_\ell^i)$$

其中 \(z_h^i = q(\cdot | w_h)\) 是视频嵌入，\(z_\ell^i = q(\cdot | w_\ell^i)\) 是对应的语言嵌入。这个辅助损失迫使视频编码器学习与语言空间对齐的语义表征，而非仅记忆视觉细节。

> ⚠️ **注意**：实验表明（Table 3），语言条件化远优于视频条件化（held-out 任务：32% vs 4%），说明从视频推断任务意图比从语言推断困难得多。

##### 策略网络：FiLM 条件化 + 多头动作预测

策略网络的核心设计是通过 **FiLM (Feature-wise Linear Modulation)** 层将任务嵌入注入视觉处理流程：

$$\text{FiLM}(x_c) = \gamma_c(z) \cdot x_c + \beta_c(z)$$

其中 \(x_c\) 是 ResNet18 第 \(c\) 个通道的特征图，\(\gamma_c(z)\) 和 \(\beta_c(z)\) 是从任务嵌入 \(z\) 线性投影得到的通道级缩放和偏移参数。FiLM 层应用于 ResNet18 的全部 4 个残差块，使视觉特征提取过程从底层就受到任务语义的调制。

ResNet18 的最后一层均值池化后，分支为三个独立的 MLP 动作头（各含 2 个 256 维隐藏层 + ReLU）：
- **Delta XYZ**：末端执行器的位置增量
- **Delta 轴角**：末端执行器的姿态增量
- **夹爪角度**：归一化的夹爪开合度

##### 自适应状态差分动作

在 10Hz 控制频率下，相邻帧之间的动作差异极小，直接克隆会导致策略学到近乎零的动作并产生抖动。BC-Z 将动作重新定义为**到未来第 \(N\) 步目标姿态的状态差分**：

$$a_t = s_{t+N} - s_t$$

其中 \(N > 1\) 通过自适应算法根据手臂和夹爪的运动幅度动态选择。消融实验表明（Table 4），不使用自适应状态差分（\(N=1\)）时成功率从 45% 骤降至 3%。

##### 完整训练目标

综合行为克隆损失和语言回归辅助损失，BC-Z 的完整训练目标为：

$$\min \sum_{\text{task } i} \sum_{(s,a) \sim \mathcal{D}_e^i,\; w_h \sim \mathcal{D}_h^i \cup \mathcal{D}_e^i} \underbrace{-\log \pi(a|s, z^i)}_{\text{behavior cloning}} + \underbrace{D_{\cos}(z_h^i, z_\ell^i)}_{\text{language regression}}$$

其中行为克隆损失对 XYZ 和轴角使用 Huber loss，对夹爪角度使用 log loss。

##### 实验核心发现

**单任务验证**：在 bin-emptying 任务上达到 3.4 picks/min（人类 6.3），door opening 任务 87% 成功率（holdout 场景 94%）。

**零样本泛化**（Table 2）：
- 语言条件（1 个干扰物）：38% 平均成功率
- 语言条件（4-5 个干扰物）：32% 平均成功率
- 视频条件（4-5 个干扰物）：4% 平均成功率

**瓶颈分析**（Table 3）：训练任务上 one-hot（42%）≈ 语言（40%）>> 视频（24%），说明语言嵌入空间已足够好，性能瓶颈主要在控制层而非编码器。

**关键消融**（Table 4）：
- 多任务 vs 单任务：52% vs 5%（跨任务数据共享至关重要）
- HG-DAgger vs 纯演示：53% vs 27%（干预数据显著提升性能）
- 自适应状态差分 vs 原始动作：45% vs 3%（防止动作抖动）

##### 与传统方法的区别

| 维度 | 传统少样本模仿学习 | BC-Z |
|------|-------------------|------|
| 新任务数据需求 | 需要少量机器人演示 | **零机器人数据** |
| 任务指定方式 | 机器人演示视频 | 自然语言或人类视频 |
| 泛化机制 | 元学习快速适应 | 大规模多任务预训练 + 语义嵌入 |
| 训练规模 | 通常 < 10 任务 | **100 任务，25,877 演示** |
| 核心洞察 | 学习如何学习 | 足够多样的任务数据 + 好的任务表征 = 泛化 |

> 💡 **核心启示**：BC-Z 证明了"简单的模仿学习 + 大规模数据 + 预训练语言嵌入"这一朴素组合就能实现任务级泛化，无需复杂的元学习或强化学习算法。这一发现为后续的 RT-1、RT-2 等大规模机器人基础模型奠定了重要基础。

#### 🧪 练习题

```yaml
question: "BC-Z 中语言回归辅助损失的主要作用是什么？"
options:
  - "提升语言编码器 USE 的表征质量"
  - "将视频编码器的嵌入空间与预训练语言嵌入空间对齐，改善视频条件化的语义泛化"
  - "加速行为克隆损失的收敛"
  - "使策略网络学习更精确的动作预测"
answer: 1
explain: "语言回归损失通过 cosine distance 约束视频嵌入向语言嵌入对齐，防止视频编码器过拟合到视觉细节，从而学习更具语义组织性的任务表征空间。USE 语言编码器本身是冻结的，不受此损失影响。"
```