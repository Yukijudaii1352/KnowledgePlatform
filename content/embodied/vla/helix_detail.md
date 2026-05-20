### Helix-02 — 螺旋双系统 VLA

```yaml
id: helix
name: Helix-02
full_name: 螺旋双系统架构 (Helix-02)
year: "2025.02"
org: Figure AI
paper_url: https://www.figure.ai/news/helix
category: diffusion_flow
parent: pi0
motivation: 双系统架构支持200Hz全身控制
```

#### 📝 一句话总结
Helix 提出了一种“System 2, System 1”双系统 VLA 架构，以 7B 参数 VLM 进行 7–9 Hz 的场景与语言理解，引导 80M 参数的 visuomotor Transformer 在 200 Hz 下输出全身连续控制，从而在一个统一模型内实现从语言到全身动作的零样本泛化，解决传统 VLA 模型无法同时兼顾高层语义推理与高频灵巧控制的瓶颈。

#### 🎯 核心要点
- 双系统架构：System 2（7B VLM，7–9 Hz）负责场景理解与语言解释，System 1（80M Transformer，200 Hz）负责实时 visuomotor 控制
- 端到端联合训练：梯度通过 S2→S1 的 latent communication vector 反向传播，两系统共用一组权重
- 全上身控制输出：手腕位姿、手指屈伸/外展、躯干朝向、头部目标，200 Hz 连续动作空间
- 多机器人协同：单一权重同时驱动物理两机器人完成长程操作任务，无需针对任务微调
- 零样本物体泛化：在混乱环境中拾取数千种训练中未见过的家居物品，仅需自然语言指令
- 纯机载低功耗 GPU 推理：全部推理在嵌入式 GPU 上完成，即用型商业部署
- 自动终止条件预测：动作空间附加“任务完成百分比”合成量，便于多技能序列编排
- 训练数据仅约 500 小时遥操作数据，不到先前 VLA 数据集的 5%

#### 🔬 深入细节

![Helix 技能缩放曲线](https://images.ctfassets.net/qx5k8y1u9drj/3iC6I99o9zVebi4YAct58Z/c0f52b7200aee4c9638fe9fb1d9a5788/NEW_SCALING_LAWS.png?fm=webp)
*图: Helix vs 传统方法的技能获取缩放曲线——传统启发式操控依赖 PhD 人工编程，模仿学习依赖海量遥操作数据，而 Helix 通过自然语言即可即时获得新技能。*

##### 动机与背景
传统机器人系统的技能扩展面临严重的瓶颈：每新增一种行为都需要 PhD 级手工编程或数千次遥操作示范。这一范式在工业结构化环境中尚可维持，但在家庭等非结构化场景——涉及成千上万形状、颜色、材质各异的物体——完全不可扩展。

同时，已有 VLA（Vision-Language-Action）模型面临根本性折衷：VLM 骨干具有极强的语义泛化能力，但推理速度太慢（通常只到个位数 Hz）；而 visuomotor 策略能跑 200 Hz，却缺乏泛化。Helix 的核心思路是将两者分离为异步协同的两个系统，打通 VLM 的常识知识到高速动作控制的链路。

##### System 2（S2）—— 慢思考，语义推理
S2 是承载所有语义与场景理解的核心。其设计要点：
- **骨干**: 7B 参数的开源开放权重 VLM，经互联网规模预训练，在推理时微调部署于机载 GPU。
- **输入**: 单目机器人图像 + 机器人状态（手腕位姿、手指位置），通过视觉-语言嵌入空间投影后输入 VLM；外加自然语言指令。
- **输出**: 单个连续 latent vector，将所有语义级任务信息（目标物体类型、容器位置、协作意图等）压缩其中，传递给 S1 进行条件控制。
- **频率**: 7–9 Hz，作为异步后台进程运行，持续更新共享内存中的 latent vector。

> 💡 关键：S2 不做任何动作 token 化。它不输出离散动作码本，而是将高层次意图编码为连续 latent，避免离散化带来的信息损失和复杂的 tokenization 方案，这是 Helix 相对现有 VLA（如 RT-2 等）的重大区别。

##### System 1（S1）—— 快思考，实时执行
S1 是一个 80M 参数的 cross-attention encoder-decoder Transformer，专门为高速闭环控制设计：
- **视觉骨干**: 全卷积多尺度视觉网络，使用纯仿真数据预训练初始化权重，以获取稳健的视觉表征。
- **输入**: 与 S2 相同的图像和状态输入，但在更高频率（200 Hz）下处理，实现即时响应。
- **条件注入**: S2 的 latent vector 被投影到 S1 的 token 空间，沿序列维度与 S1 视觉特征拼接，构成任务条件。
- **输出空间**: 200 Hz 全上身控制，包括手腕目标位姿、手指屈伸控制、手指外展控制、躯干朝向目标、头部朝向目标，以及一个合成的“任务完成百分比”信号。

> ⚠️ 注意: S2 和 S1 并非简单的串行 pipeline，而是异步并行。S2 在后台慢速迭代，S1 读取最新的共享 latent vector 运行实时闭环控制。这样 S1 不会因等待 S2 推理而丢帧。

##### 端到端训练
Helix 从原始像素和文本指令直接映射到连续动作，使用标准回归损失进行端到端训练。梯度从 S1 经 latent communication vector 反向传播到 S2，实现两个系统的联合优化。

训练时引入时序偏移（temporal offset）：在 S1 和 S2 输入之间加入人工延迟，该延迟被校准为部署时 S1/S2 推理延迟的差值。这一步确保训练条件与实际部署的实时控制需求精确对齐，避免训练-部署分布漂移。

<!-- 训练伪代码 -->

```python
# Helix 端到端训练伪代码
for batch in dataloader:
    # S2: 慢速语义推理（7-9 Hz）
    img_s2 = batch.image_s2
    state_s2 = batch.state_s2
    cmd = batch.text_command
    latent = S2(img_s2, state_s2, cmd)  # 输出连续 latent vector

    # S1: 高速控制（200 Hz），用 latent 条件控制
    # 训练中加入 temporal offset 模拟部署延迟
    img_s1 = batch.image_s2[offset:]  # offset 模拟 S2 推理延迟
    state_s1 = batch.state_s2[offset:]
    action_pred = S1(img_s1, state_s1, latent)

    # 回归损失
    loss = MSE(action_pred, batch.ground_truth_action)
    # 梯度经 latent 向量反向传播至 S2
    loss.backward()  # 同时更新 S1 和 S2 参数
```

##### 训练数据
约 500 小时的高质量多机器人、多操作员遥操作数据。为生成自然语言条件训练对，使用自动标注 VLM 对机载摄像头视频片段进行事后指令生成（"What instruction would you have given the robot to get the action seen in this video?"）。所有训练期间接触的物品均被排除在评测之外，确保零样本泛化测试的严格性。

##### 推理部署
推理管线分别在两个机载低功耗嵌入式 GPU 上运行：一个专门跑 S2（异步后台，持续消费最新观察），一个专门跑 S1（实时 200 Hz 控制循环）。S2 持续更新共享内存中的 latent vector，S1 取最新值执行闭环控制。

##### 与传统方法的区别
| 维度 | 传统 VLA（如 RT-2） | 传统 visuomotor 策略 | Helix |
|------|---------------------|----------------------|-------|
| 泛化能力 | 强（VLM 骨干） | 弱（单任务） | 强（S2 驱动泛化） |
| 控制频率 | 低（~1–5 Hz） | 高（50–200 Hz） | 高（200 Hz S1） |
| 动作空间 | 离散 token | 连续 | 连续，全上身 |
| 动作 token 化 | 需要 | 不需要 | 不需要（latent 传递） |
| 多任务 | 需单独头/微调 | 单任务 | 统一权重 |
| 部署 | 需云端 | 可机载 | 纯机载 GPU |

> 💡 关键创新：通过 latent vector 桥接自然语言语义与连续控制信号，Helix 从根本上避免了动作 tokenization 灾难。离散 token 在高维连续空间（如 23 自由度的全上身）中几乎不可扩展，而 latent 传递是唯一可泛化的方案。

#### 🧪 练习题

```yaml
question: "Helix 的双系统架构中，System 2 与 System 1 之间的通信机制是什么？"
options:
  - "将 S2 的语言输出转换为离散动作码本，通过查找表传给 S1"
  - "S2 输出连续 latent vector，通过共享内存异步传递给 S1 作为条件输入"
  - "S2 直接输出关节力矩，S1 负责平滑滤波"
  - "S2 和 S1 共享同一个视觉 backbone，通过注意力矩阵交互"
answer: 1
explain: "Helix 的核心设计是将 S2 的高层语义压缩到单个连续 latent vector，通过共享内存传递给 S1 做条件控制，避免离散 tokenization 方案的信息损失和扩展性问题。"
```