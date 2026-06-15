### GR00T N1.6：NVIDIA 人形机器人基础模型

```yaml
id: groot_n1
name: GR00T N1.6
full_name: NVIDIA人形基础模型 (GR00T Humanoid Foundation)
year: "2026"
org: NVIDIA
paper_url: https://developer.nvidia.com/isaac/groot
category: foundation_model
parent: pi0
motivation: 32层扩散Transformer人形控制
```

#### 📝 一句话总结

GR00T N1.6 是 NVIDIA 在 GR00T N1/N1.5 基础上改进的人形 VLA 模型，用 VLM 负责视觉语言理解、32 层 Diffusion Transformer 负责连续动作去噪，并通过多机器人、多任务和仿真/真实数据预训练提升双臂操作与 loco-manipulation 后训练效果。

#### 🎯 核心要点

- 延续 GR00T N1 的 dual-system 架构：System 2 VLM 编码图像和语言，System 1 DiT 生成动作
- N1.6 使用内部 Cosmos-2B VLM 变体，支持原生长宽比图像和 embodied reasoning 数据
- DiT 从 N1.5 的 16 层扩展到 32 层，增强连续动作去噪和复杂操作表达能力
- 移除 N1.5 的 post-VLM 4 层 adapter，改为在预训练中解冻 VLM 顶部 4 层
- 多数 embodiment 使用 state-relative action chunks，提升平滑性和跨机器人泛化
- 额外加入 Bimanual YAM、AGIBOT Genie-1、Galaxea R1 Pro 仿真和 Unitree G1 全身操作数据
- 预训练 300K steps，后训练通常用较小任务数据集微调 10K-30K steps
- 开源生态围绕 Isaac GR00T、Isaac Lab、LeRobot 格式和 Hugging Face 模型卡组织

#### 🔬 深入细节

##### 核心示意图

![GR00T N1 架构图](https://ar5iv.labs.arxiv.org/html/2503.14734/assets/x3.png)
*图：GR00T N1 的 VLA 架构。VLM 输出视觉语言 token，DiT 结合机器人状态与噪声动作块，通过 flow matching 生成连续控制动作。N1.6 延续该架构并扩大 DiT。*

![GR00T N1.6 预训练数据分布](https://research.nvidia.com/labs/gear/n1_6/training_data_distribution_v3.svg)
*图：NVIDIA Research 页面展示的 GR00T N1.6 预训练数据加权分布。*

##### 算法伪代码

```python
# GR00T N1.6 conceptual training loop

for batch in mixed_humanoid_dataset:
    images, language, state, action_chunk, embodiment_id = batch

    # System 2: VLM reasoning tokens
    vl_tokens = cosmos_vlm(images, language, train_top_layers=True)

    # Embodiment-specific state/action projection
    s = state_encoder[embodiment_id](state)
    tau = sample_flow_timestep()
    eps = randn_like(action_chunk)
    noisy_action = tau * action_chunk + (1 - tau) * eps
    a = action_encoder[embodiment_id](noisy_action, tau)

    # System 1: 32-layer DiT action denoising
    h = dit_32_layers(self_tokens=[s, a], cross_tokens=vl_tokens)
    pred = action_decoder[embodiment_id](h)

    target = action_chunk - eps
    loss = mse(pred, target)
    update(loss)

# post-training
finetune_on_task_data(model, demos, cotrain_pretraining_data=True)
```

##### 方法详解

**动机与背景：人形基础模型为什么需要 dual-system？**

人形机器人要同时解决“理解任务”和“控制身体”两个问题。VLM 擅长从图像和语言中识别目标、理解指令和推断任务上下文，但它不是为 100Hz 以上连续控制设计的。扩散/flow matching 策略擅长生成平滑连续动作，却缺少互联网级语义知识。GR00T 的 dual-system 把两者组合：System 2 负责慢速语义理解，System 1 负责高频动作生成。

在 GR00T N1 论文中，System 2 运行在较低频率，处理图像和语言；System 1 使用 Diffusion Transformer，交叉注意力读取 VLM token，并结合本体状态和噪声动作块输出动作。N1.6 沿用这个范式，但提升 VLM、DiT 和数据配方。

**核心机制一：32 层 DiT 与 action flow matching**

GR00T 的动作生成目标与 π₀ 类似，都是学习连续动作块的向量场。给定真实动作块 \(A\)、噪声 \(\epsilon\) 和时间 \(\tau\)：

$$
A^\tau = \tau A + (1-\tau)\epsilon
$$

DiT 预测：

$$
v_\theta(A^\tau, s, z_{vl}) \approx A - \epsilon
$$

其中 \(s\) 是机器人状态 token，\(z_{vl}\) 是 VLM 的视觉语言 token。N1.6 将 DiT 扩展为 32 层，使动作模块有更强的时序和多关节耦合建模能力，尤其适合双臂、手部和全身移动操作。

**核心机制二：跨 embodiment 的状态/动作编码**

不同机器人有不同自由度、动作空间和传感器布局。GR00T 使用 embodiment-specific encoder/decoder 将各自状态和动作投影到共享隐藏空间。共享 DiT 学通用控制先验，特定 encoder/decoder 处理机器人差异。

N1.6 进一步强调 state-relative action chunks。相对动作通常表示为相对于当前状态或末端姿态的增量：

$$
a_t^{rel} = a_t^{target} - f(s_t)
$$

这种表示在不同场景中数值范围更集中，更容易学习平滑控制，也更利于跨机器人迁移。但相对动作会积累误差，因此 N1.6 在讨论中提到需要结合数据统计、DAgger、RTC 和后训练正则来稳定部署。

**核心机制三：数据金字塔与 N1.6 数据增强**

GR00T N1 的核心不是只靠真实机器人数据，而是混合真实机器人、仿真数据、神经生成轨迹和人类视频。真实数据最接近部署但昂贵；仿真和神经轨迹可扩展；人类视频提供广泛行为先验。N1.6 在 N1.5 数据基础上额外加入多种机器人平台和 Unitree G1 loco-manipulation 数据，使后训练时更容易收敛到复杂全身任务。

**后训练与部署**

N1.6 预训练后并不保证零样本完成所有任务。NVIDIA 的工作流强调 post-training：针对目标 embodiment 和任务收集较小规模数据，微调模型 10K-30K steps，并视情况使用 DAgger、数据增强、co-training 和实时控制补偿。基础模型提供强初始化，后训练负责把能力落到具体硬件。

> 💡 关键：GR00T N1.6 的“基础模型”意义在于跨任务、跨 embodiment 提供可后训练的通用动作先验，而不是跳过机器人数据收集。

#### 🧪 练习题

```yaml
question: "GR00T N1.6 相比 N1.5 的一个关键架构改进是什么？"
options:
  - "将 DiT 动作模块从 16 层扩大到 32 层"
  - "完全取消 VLM，只使用关节状态"
  - "把连续动作改成纯文本输出"
  - "只支持单臂机械臂，不再支持人形机器人"
answer: 0
explain: "N1.6 的公开说明中明确提到使用 2x 更大的 DiT，即 32 层而非 N1.5 的 16 层，以提升动作去噪和复杂控制能力。"
```
