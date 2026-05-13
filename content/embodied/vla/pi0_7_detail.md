### π0.7：通过多模态提示实现组合泛化的通用机器人基础模型

```yaml
id: pi0_7
name: "π0.7"
full_name: "物理智能零点七 (π0.7)"
year: "2026.04"
org: "Physical Intelligence"
paper_url: "https://www.pi.website/blog/pi0-7-a-steerable-model-with-emergent-capabilities"
arxiv: "2604.15483v2"
category: diffusion_flow
parent: pi0
motivation: "组合泛化支持跨多种机器人本体"
```

#### 📝 一句话总结

π0.7 通过**多模态提示扩展（Diverse Prompting）**——在训练时向 VLA 模型注入子任务语言、子目标图像和 episode 元数据——使单一 5B 参数的 flow-matching 策略在无需微调的情况下实现组合泛化、跨机器人本体零样本迁移和灵活的语言指令跟随，性能匹配甚至超越针对单任务微调的 RL 专家策略。

#### 🎯 核心要点

- **架构**：5B 参数 = 4B VLM 骨干（Gemma 3 4B + 400M SigLIP 视觉编码器）+ 860M flow-matching 动作专家，采用 block-causal 注意力掩码和知识隔离（Knowledge Insulation）训练
- **多模态上下文 \(C_t\)**：包含任务语言 \(\ell_t\)、子任务语言 \(\hat{\ell}_t\)、最多 3 张子目标图像 \(g_t\)、episode 元数据（质量 1-5、速度、错误标记、控制模式）
- **MEM 视频历史编码器**：4 个相机 × 6 帧历史观测，压缩为固定长度 token 序列，支持长时记忆任务
- **子目标图像生成**：集成 BAGEL 世界模型生成视觉子目标，为跨本体迁移提供视觉类比
- **训练策略**：flow-matching 目标 + 知识隔离（VLM 用 FAST token 交叉熵训练，动作专家梯度不回传 VLM）+ 系统性 dropout（子目标 25%、子任务 30%、元数据 15%）
- **混合数据学习**：融合人类演示、RL 自主评估数据、人类视频和 web 数据，通过元数据消歧不同质量的数据
- **涌现能力**：组合泛化（新任务×新场景×新物体）、跨本体零样本迁移（自动发现适配目标形态的操作策略）、语言 coaching 学习新任务、速度/质量可控

#### 🔬 深入细节

##### 核心架构示意图

![π0.7 架构总览](https://ar5iv.labs.arxiv.org/html/2604.15483v2/assets/x3.png)
*图：π0.7 模型架构。左侧为 VLM 骨干处理多模态上下文（语言、视觉历史、子目标图像、元数据），右侧为 flow-matching 动作专家通过 block-causal 注意力读取 VLM 表征并生成连续动作轨迹。知识隔离确保动作专家梯度不回传至 VLM。*

![多模态提示组成](https://ar5iv.labs.arxiv.org/html/2604.15483v2/assets/x5.png)
*图：π0.7 的多模态上下文 \(C_t\) 组成，包括任务/子任务语言指令、子目标图像和 episode 元数据，训练时通过系统性 dropout 确保推理时各组件可选。*

##### 算法伪代码

```python
# π0.7 训练流程伪代码
# 架构: VLM (4B Gemma3) + ActionExpert (860M flow-matching)

for batch in dataset:
    # === 1. 构建多模态上下文 C_t ===
    obs_history = MEM_encode(cameras[0:4], frames[t-5:t+1])  # 4cam × 6frames → fixed tokens
    task_lang = tokenize(task_instruction)                      # 任务语言 ℓ_t
    
    # 系统性 dropout
    if random() < 0.75:
        subtask_lang = tokenize(subtask_instruction)            # 子任务语言 ℓ̂_t
    if random() < 0.75:
        subgoal_imgs = encode_images(goal_images[:3])           # 最多3张子目标图像
        if subgoal_present and random() < 0.30:
            subtask_lang = None                                 # 子目标存在时额外 drop 子任务
    if random() < 0.85:
        metadata = encode_metadata(quality, speed, mistake, ctrl_mode)
    
    C_t = concat(task_lang, subtask_lang, subgoal_imgs, metadata, obs_history)
    
    # === 2. VLM 前向 (知识隔离) ===
    vlm_tokens = VLM.forward(C_t)                              # Gemma3 处理多模态输入
    fast_loss = cross_entropy(vlm_tokens, FAST_action_tokens)  # VLM 用 FAST token 训练
    
    # === 3. 动作专家前向 (flow-matching) ===
    t_flow = uniform(0, 1)                                     # 采样 flow 时间步
    noise = randn_like(action_chunk)                           # a_{t:t+H}
    x_t = (1 - t_flow) * noise + t_flow * action_chunk        # 线性插值
    
    with stop_gradient(vlm_tokens):                            # 知识隔离: 梯度不回传 VLM
        v_pred = ActionExpert(x_t, t_flow, vlm_tokens)        # 预测速度场
        # ActionExpert 使用 adaptive RMSNorm 注入 t_flow
        # Block-causal attention: expert tokens attend to VLM tokens
    
    flow_loss = MSE(v_pred, action_chunk - noise)              # flow-matching 损失
    
    # === 4. 联合优化 ===
    total_loss = fast_loss + flow_loss
    optimizer.step(total_loss)

# === 推理 (RTC: Rotation-Then-Chunking) ===
def inference(obs, context, num_denoise_steps=10):
    C_t = build_context(obs, context, metadata={"quality": 5, "speed": "fast"})
    vlm_tokens = VLM.forward(C_t)
    x_0 = randn(action_dim * horizon)                         # 50 action tokens
    for k in range(num_denoise_steps):
        t_k = k / num_denoise_steps
        v = ActionExpert(x_0, t_k, vlm_tokens)
        x_0 = x_0 + v * (1 / num_denoise_steps)              # Euler 积分
    # RTC: 旋转拼接多次预测实现平滑轨迹
    return x_0
```

##### 方法细节

**1. 动机与背景**

先前的机器人基础模型（如 π0、RT-2、Octo）面临一个根本矛盾：要在大量任务上表现良好，需要海量高质量数据；但收集每个新任务的专用数据成本极高。这些模型通常只能在训练分布内的任务上工作，缺乏**组合泛化**能力——即将已学会的技能重新组合以解决从未见过的任务。

传统方法的核心缺陷在于：(1) 训练数据中的行为质量参差不齐，但模型无法区分高质量和低质量演示；(2) 模型缺乏足够的上下文信息来理解当前应该执行什么子任务；(3) 不同机器人本体之间的形态差异使得跨本体迁移极为困难。

π0.7 的核心洞察是：通过在训练时提供**丰富的多模态上下文**（语言子任务、视觉子目标、质量元数据），模型可以学会根据上下文调节行为模式，从而在推理时通过组合不同的上下文实现泛化。

**2. 核心机制：多模态提示扩展（Diverse Prompting）**

π0.7 的训练目标为最大化条件对数似然：

$$\max_\theta \; \mathbb{E}_{\mathcal{D}} \left[ \log \pi_\theta \left( a_{t:t+H} \mid o_{t-T:t}, C_t \right) \right]$$

其中 \(a_{t:t+H}\) 是未来 \(H\) 步的动作块，\(o_{t-T:t}\) 是过去 \(T\) 帧的观测历史，\(C_t\) 是多模态上下文。关键创新在于 \(C_t\) 的设计：

$$C_t = \left( \ell_t, \; \hat{\ell}_t, \; g_t, \; m_t \right)$$

- **任务语言 \(\ell_t\)**：高层任务描述（如"折叠T恤"）
- **子任务语言 \(\hat{\ell}_t\)**：当前步骤的细粒度指令（如"用左手抓住衣领"），来源于人类标注或高层策略
- **子目标图像 \(g_t\)**：最多 3 张未来状态的视觉预期，来源于：25% 为片段末帧 + 75% 为均匀采样未来 0-4 秒的帧 + 世界模型（BAGEL）生成
- **元数据 \(m_t\)**：episode 级别的质量评分（1-5）、执行速度、是否包含错误、控制模式（关节/末端执行器）

> 💡 **关键**：训练时通过系统性 dropout（子目标 25% 的 batch 丢弃、子任务在子目标存在时额外 30% 丢弃、元数据 15% 丢弃）确保模型在推理时可以灵活使用任意子集的上下文。这使得同一个模型既可以在无额外提示时自主执行，也可以在有详细 coaching 时精确跟随指令。

**3. 架构设计：VLM + Flow-Matching Action Expert**

π0.7 采用双塔架构，总计约 5B 参数：

- **VLM 骨干（~4B）**：基于 Gemma 3 4B 语言模型 + 400M SigLIP 视觉编码器。处理所有多模态输入（语言、图像、元数据），输出统一的 token 表征。
- **Flow-Matching 动作专家（~860M）**：专门的 Transformer 模块，通过 block-causal 注意力读取 VLM 的输出表征，生成 50 个连续动作 token。使用 **adaptive RMSNorm** 注入 flow 时间步 \(\sigma\)，避免额外的时间步嵌入层。

**知识隔离（Knowledge Insulation, KI）**是关键训练技巧：

$$\mathcal{L}_{\text{total}} = \mathcal{L}_{\text{FAST}}^{\text{VLM}} + \mathcal{L}_{\text{flow}}^{\text{expert}}$$

其中 VLM 使用 FAST token 的交叉熵损失训练，动作专家使用 flow-matching 损失训练，但**动作专家的梯度通过 stop-gradient 不回传至 VLM**。这防止了连续动作回归的梯度破坏 VLM 预训练的语言/视觉理解能力。

> ⚠️ **注意**：知识隔离是 π0.7 能够保持强大语言理解能力的关键。没有它，flow-matching 的连续回归梯度会"污染"VLM 的离散 token 表征空间，导致语言跟随能力退化。

**MEM 视频历史编码器**将 4 个相机 × 6 帧历史（共 24 张图像）压缩为固定长度的 token 序列，使模型能够高效处理视频历史而不会因 token 数量爆炸导致计算瓶颈。

**4. Flow-Matching 动作生成**

动作专家使用 flow-matching 框架生成连续动作轨迹。给定噪声样本 \(x_0 \sim \mathcal{N}(0, I)\) 和目标动作 \(x_1 = a_{t:t+H}\)，训练时构造线性插值：

$$x_\sigma = (1 - \sigma) x_0 + \sigma x_1, \quad \sigma \sim \mathcal{U}(0, 1)$$

模型学习预测速度场 \(v_\theta(x_\sigma, \sigma, z)\)（其中 \(z\) 是 VLM 输出的表征），训练损失为：

$$\mathcal{L}_{\text{flow}} = \mathbb{E}_{\sigma, x_0, x_1} \left\| v_\theta(x_\sigma, \sigma, z) - (x_1 - x_0) \right\|^2$$

推理时通过 Euler 积分从噪声逐步去噪得到动作轨迹。**RTC（Rotation-Then-Chunking）**机制通过旋转拼接多次预测的动作块，实现平滑的轨迹过渡。

**5. 跨本体迁移与涌现策略**

π0.7 展现出令人惊讶的跨本体迁移能力。在折叠任务中，训练数据全部来自小型双臂机器人，但模型能够零样本迁移到形态差异显著的 UR5e 双臂平台：

- 在源机器人上，操作员倾斜末端执行器将织物压在桌面上再抬起
- 在目标 UR5e 上，π0.7 **自动发现**了垂直抓取策略，更适合大型机械臂的运动学特性

这种涌现的策略适配不是简单的动作复制，而是模型理解了任务语义后根据目标本体的物理约束重新规划操作方式。世界模型生成的子目标图像进一步增强了这种迁移，因为它能为目标本体构造合理的视觉类比。

**6. 数据可扩展性与元数据消歧**

在洗衣折叠任务的消融实验中，将数据按质量和速度分为 4 个桶（top 30%、50%、80%、100%）：

- **无元数据**的模型在加入低质量数据后性能反而下降
- **有元数据**的模型随数据量增加持续提升，即使新增数据质量更低

$$\text{Performance}(\text{w/ metadata}) \uparrow \quad \text{as} \quad |\mathcal{D}| \uparrow, \quad \text{even if avg quality} \downarrow$$

这证明元数据有效消歧了不同质量的行为模式，使模型能够从混合质量数据中学习，在推理时通过设置 `quality=5` 选择最优行为模式。

**7. 与先前方法的对比**

| 特性 | π0 | π0.5/π0.6 | π0.7 |
|------|-----|-----------|------|
| 语言跟随 | 弱 | 中等 | 强（开放词汇） |
| 跨本体迁移 | 无 | 有限 | 零样本 + 策略适配 |
| 数据质量处理 | 需过滤 | 需过滤 | 元数据消歧，混合质量可用 |
| 子目标条件 | 无 | 无 | 世界模型生成 |
| 组合泛化 | 无 | 有限 | 新任务×新场景×新物体 |
| 新任务学习 | 需数据收集 | 需微调 | 语言 coaching → 自主策略 |

#### 🧪 练习题

```yaml
question: "π0.7 中知识隔离（Knowledge Insulation）的核心作用是什么？"
options:
  - "加速 flow-matching 动作专家的收敛速度"
  - "防止 flow-matching 连续回归梯度破坏 VLM 预训练的语言/视觉理解能力"
  - "减少 VLM 骨干的参数量以提高推理效率"
  - "使动作专家能够独立于 VLM 进行预训练"
answer: 1
explain: "知识隔离通过 stop-gradient 阻止动作专家的 flow-matching 损失梯度回传至 VLM，防止连续回归信号破坏 VLM 在大规模预训练中获得的离散 token 表征能力，从而保持强大的语言理解和指令跟随能力。"
```