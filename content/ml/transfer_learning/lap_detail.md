### LAP — 语言-动作预训练 (Language-Action Pre-training)

```yaml
id: lap
name: LAP
full_name: "语言-动作预训练 (Language-Action Pre-training)"
year: 2025
org: "University of Pennsylvania / Google DeepMind"
paper_url: "https://arxiv.org/abs/2602.10556"
category: transfer_learning
parent: "VLA (Vision-Language-Action Models)"
motivation: "将机器人动作表示为自然语言描述，使VLM的语义理解能力直接服务于跨具身形态的零样本动作迁移"
```

#### 📝 一句话总结

LAP 提出将机器人动作表示为结构化自然语言（如"move forward 5 cm"），使视觉语言模型（VLM）能够在统一的语言空间中同时学习语义理解与动作生成，首次实现了 VLA 在未见过的机器人具身形态上超过 50% 的零样本操作成功率，是当前最强基线的 2 倍。

#### 🎯 核心要点

- **语言-动作表示（Language-Actions）**：将连续动作 chunk 的净位移转换为模板化自然语言（`<verb> <direction> <magnitude> <unit>`），如 "move forward 5 cm, tilt up 10 degrees"
- **双头架构**：PaliGemma-3B VLM 骨干 + 轻量级 flow-matching 动作专家（Mixture-of-Transformers），语言-动作头与连续动作头并行训练
- **联合损失函数**：\(L = L_{\text{FM}} + \lambda \cdot L_{\text{CE}}\)，flow-matching 损失生成精确连续动作，交叉熵损失在语言-动作上提供语义监督信号
- **坐标系随机化**：50% 概率使用基座坐标系、50% 使用末端执行器坐标系描述动作，增强泛化
- **零样本跨具身迁移**：在 3 种未见过的机器人（Custom Franka、YAM、Kinova）上平均成功率 >50%，所有开源 VLA 基线均为 0%
- **微调效率**：迁移到新具身形态时仅需 2.5× 更少的演示数据即可达到同等性能
- **VQA 联合训练**：语言-动作格式天然支持与视觉问答任务联合训练（运动预测 VQA），进一步提升性能
- **良好的缩放特性**：从 4B 到 27B 参数，LAP 的验证损失持续下降，而基线方法出现饱和或退化

#### 🔬 深入细节

##### 核心框架图

![LAP 整体框架](https://ar5iv.labs.arxiv.org/html/2602.10556/assets/x1.png)
*图 1：LAP 框架总览。机器人动作被转换为结构化自然语言描述（语言-动作），VLM 同时通过交叉熵损失学习语言-动作预测和通过 flow-matching 损失学习精确连续动作生成。推理时仅使用动作专家输出。*

![LAP 模型架构](https://ar5iv.labs.arxiv.org/html/2602.10556/assets/x2.png)
*图 2：LAP 的 Mixture-of-Transformers 架构。VLM 骨干处理视觉和语言 token，动作专家通过交叉注意力接收 VLM 的隐状态，独立生成连续动作。语言-动作 token 与任务指令 token 共享 VLM 的输出头。*

##### 算法伪代码

```python
# LAP 训练流程伪代码
# 输入: 视觉观测 o, 任务指令 l, 动作 chunk a (连续), 语言-动作 la (文本)

# === 预训练阶段 (λ=0.8) ===
for batch in dataloader:  # OXE + MolmoAct, batch_size=2048
    o, l, a, la = batch
    
    # 1. 将连续动作转换为语言-动作
    #    计算 action chunk 的净位移 (net displacement)
    net_disp = compute_net_displacement(a)  # Δx, Δy, Δz, Δroll, Δpitch, Δyaw
    
    # 2. 随机选择坐标系 (50% base frame / 50% EE frame)
    frame = random.choice(["base", "end_effector"])
    la_tokens = to_language_action(net_disp, frame)
    # 例: "move forward 5 cm, move left 2 cm, tilt down 10 degrees"
    
    # 3. VLM 前向传播
    hidden_states = vlm_backbone(o, l, la_tokens)  # PaliGemma-3B
    
    # 4. 语言-动作交叉熵损失
    L_CE = cross_entropy(vlm_head(hidden_states), la_tokens)
    
    # 5. Flow-matching 动作专家损失
    t = uniform(0, 1)  # 扩散时间步
    noise = randn_like(a)
    x_t = (1 - t) * noise + t * a  # 线性插值
    v_pred = action_expert(x_t, t, hidden_states)  # 预测速度场
    L_FM = mse(v_pred, a - noise)  # flow matching 目标
    
    # 6. 联合优化
    loss = L_FM + λ * L_CE  # λ=0.8 (pretrain), 0.4 (finetune)
    optimizer.step(loss)

# === 推理阶段 (25Hz on RTX 4090) ===
# 仅运行动作专家, 语言-动作头不参与推理
hidden = vlm_backbone(observation, instruction)
action = action_expert.sample(hidden, num_steps=10)  # ODE 求解
```

##### 动机与背景

当前视觉-语言-动作模型（VLA）面临一个根本性矛盾：VLM 预训练赋予了强大的视觉-语义理解能力，但将动作表示为任意数值 token（如 bin 索引或归一化浮点数）会**破坏 VLM 已学到的语言空间结构**。具体表现为：

1. **语义断裂**：传统 VLA 将动作离散化为 token ID（如 OpenVLA 的 256-bin 离散化），这些 token 对 VLM 而言毫无语义意义，导致预训练知识无法有效迁移到动作生成
2. **具身形态耦合**：不同机器人的动作空间维度、量纲、坐标系各不相同，传统方法学到的动作表示与特定机器人紧密绑定
3. **零样本失败**：实验表明所有现有开源 VLA（OpenVLA、π0.5、X-VLA 等）在未见过的机器人上零样本成功率为 0%

> 💡 关键洞察：自然语言本身就是一种**具身形态无关的动作抽象**。"向前移动 5 厘米"对任何机器人都有明确含义，而 `[0.05, 0, 0, 0, 0, 0]` 的含义取决于具体的坐标系和单位约定。

##### 语言-动作表示设计

LAP 的核心创新是将机器人动作转换为结构化自然语言。具体设计：

**模板格式**：每个动作由多个原子描述组成，格式为 `<verb> <direction> <magnitude> <unit>`：
- **平移**：`move {forward/backward/left/right/up/down} {X} {cm/mm}`
- **旋转**：`tilt {up/down/left/right} {X} degrees` 或 `rotate {clockwise/counterclockwise} {X} degrees`
- **夹爪**：`open/close gripper`

**净位移计算**：对于一个 action chunk（通常 50 步），计算整个 chunk 的净位移（末端位姿变化量），而非逐步描述。这提供了适当的抽象层级——既保留了足够的空间精度，又避免了冗余的逐帧描述。

**坐标系随机化**：训练时以 50% 概率在基座坐标系或末端执行器坐标系中描述动作。这迫使模型学习坐标系无关的运动语义，增强了跨具身形态的泛化能力。

**精度量化**：位移量化到最近的整数厘米/毫米，角度量化到最近的整数度。实验表明这一精度对大多数操作任务足够。

##### 模型架构：Mixture-of-Transformers

LAP 采用 **Mixture-of-Transformers (MoT)** 架构，遵循 π0/π0.5 的设计理念：

$$\text{LAP} = \underbrace{\text{PaliGemma-3B}}_{\text{VLM 骨干}} + \underbrace{\text{Flow-Matching Expert}}_{\text{动作专家}} + \underbrace{\text{Language-Action Head}}_{\text{语言-动作头（仅训练时）}}$$

**VLM 骨干**（PaliGemma-3B）：
- 处理视觉输入（SigLIP 视觉编码器）和语言输入（任务指令 + 语言-动作 token）
- 输出的隐状态同时服务于语言-动作预测和动作专家

**动作专家**：
- 轻量级 Transformer，通过交叉注意力从 VLM 隐状态中提取信息
- 使用 **flow matching**（条件流匹配）生成连续动作
- 推理时通过 ODE 求解器从噪声采样得到动作序列
- 运行频率 25Hz（RTX 4090 上）

**语言-动作头**：
- 复用 VLM 的语言建模头（共享词表）
- 仅在训练时提供额外的语义监督信号
- 推理时完全不使用，不增加推理开销

> ⚠️ 注意：语言-动作头的作用是**训练时的辅助监督**，而非推理时的动作生成器。它通过迫使 VLM 内部表示编码具身形态无关的运动语义，间接提升动作专家的泛化能力。

##### 训练流程与损失函数

**联合损失**：

$$L = L_{\text{FM}} + \lambda \cdot L_{\text{CE}}$$

其中：
- \(L_{\text{FM}}\)：Flow matching 损失，训练动作专家预测从噪声到目标动作的速度场

$$L_{\text{FM}} = \mathbb{E}_{t \sim U(0,1), \epsilon \sim \mathcal{N}(0,I)} \left\| v_\theta(x_t, t, h) - (a - \epsilon) \right\|^2$$

其中 \(x_t = (1-t)\epsilon + ta\) 是噪声与目标动作的线性插值，\(h\) 是 VLM 的隐状态。

- \(L_{\text{CE}}\)：标准交叉熵损失，在语言-动作 token 上计算

$$L_{\text{CE}} = -\sum_{i} \log p_\theta(la_i | la_{<i}, o, l)$$

**训练超参数**：
- 预训练：λ=0.8，batch size=2048，64 TPU v6e，15k steps（~10 小时）
- 微调：λ=0.4（降低语言-动作权重，侧重精确动作生成）
- 数据：Open X-Embodiment (OXE) + MolmoAct 数据集

##### 与传统方法的核心区别

| 维度 | 传统 VLA (OpenVLA/π0) | LAP |
|------|----------------------|-----|
| 动作表示 | 离散 bin token 或归一化浮点数 | 结构化自然语言 |
| 语义保持 | 破坏 VLM 语言空间 | 完全兼容 VLM 语言空间 |
| 跨具身迁移 | 需要具身特定微调 | 零样本迁移 >50% |
| VQA 联合训练 | 不兼容 | 天然兼容 |
| 推理开销 | 相同 | 相同（语言头不参与推理） |
| 缩放行为 | 大模型时饱和/退化 | 持续改善 |

##### 实验关键发现

**零样本跨具身迁移**（图 3）：
- LAP-3B 在 3 种未见机器人上平均成功率 >50%，是最强基线的 **2×**
- 所有开源 VLA（OpenVLA、π0.5-Base、X-VLA、MolmoAct）在未见具身上均为 **0%**
- 即使在已见的 DROID 设置上，LAP-3B 也比同架构基线高约 **15 个百分点**

**微调效率**（图 4）：
- LIBERO 仿真：1 epoch 即达 78%，6 epochs 达 96.8%（基线需要更多 epochs）
- 真实机器人：仅需 **2.5× 更少的演示**即可达到同等任务进度

**表示分析**（图 5）：
- t-SNE 可视化显示 LAP 学到的表示中，未见具身与训练具身高度重叠
- 未见具身上的动作预测误差持续低于基线（ℓ₂ error: 0.151 vs 0.168 vs 0.189）

**缩放行为**（图 7）：
- LAP 从 4B→12B→27B 验证损失持续下降
- π0.5 基线在 12B 后出现饱和甚至退化

#### 🧪 练习题

```yaml
question: "LAP 中语言-动作（Language-Actions）在推理时的作用是什么？"
options:
  - "作为动作生成器直接输出机器人控制指令"
  - "仅在训练时提供语义监督，推理时不参与计算"
  - "作为中间表示先生成语言再转换为连续动作"
  - "用于在线评估动作质量并过滤不合理动作"
answer: 1
explain: "语言-动作头仅在训练时通过交叉熵损失提供辅助语义监督，迫使VLM内部表示编码具身无关的运动语义。推理时仅运行flow-matching动作专家，语言-动作头完全不参与，因此不增加推理开销。"
```