### AdaWorldPolicy — 自适应世界模型驱动扩散策略 (AdaWorldPolicy: World-Model-Driven Diffusion Policy with Online Adaptive Learning)

```yaml
id: adaworldpolicy
name: AdaWorldPolicy
full_name: 自适应世界模型驱动扩散策略 (AdaWorldPolicy)
year: '2025'
org: NVIDIA / Multi-Institution
paper_url: https://arxiv.org/abs/2602.20057
category: embodied_rl
parent: diffusion_policy
motivation: 将世界模型作为扩散策略的主动监督者，并通过在线自适应学习实现测试时域迁移
```

#### 📝 一句话总结

AdaWorldPolicy 提出了一个统一的世界模型驱动扩散策略框架，将预训练视频世界模型（Cosmos）与动作专家、力预测器通过多模态自注意力（MMSA）深度融合，并创新性地利用世界模型的预测误差作为自监督信号，在测试时通过 LoRA 在线自适应学习（AdaOL）持续缩小视觉与物理域偏移，在仿真和真实机器人操作任务中均达到 SOTA。

#### 🎯 核心要点

- **三模块统一架构**：World Model（2B 参数，基于 Cosmos-Predict2）、Action Model（0.4B DiT）、Force Predictor（0.4B DiT），通过共享的多模态自注意力层（MMSA）深度耦合
- **双运行模式**：Mode I（Action Generation）——给定观测生成动作；Mode II（Future Imagination）——给定观测和动作预测未来帧，世界模型在训练时作为动作模型的主动监督者
- **多模态自注意力（MMSA）**：在 DiT 的 Transformer 层中，将世界模型、动作模型、力预测器的 token 拼接后做联合自注意力，实现跨模态信息流动，优于简单拼接或交叉注意力
- **Flow Matching 训练**：动作模型和力预测器均采用 Rectified Flow Matching 进行去噪训练，损失函数为 \(L_1\)（动作）和 \(L_2\)（力）
- **在线自适应学习（AdaOL）**：测试时利用世界模型预测的未来帧与真实观测在 VAE 隐空间的误差 \(\|E(o_{t+1}) - E(\hat{o}_{t+1})\|^2\) 作为自监督信号，通过 LoRA（rank 16，前 4 层，<0.1% 参数）以极低开销在线更新模型
- **联合训练目标**：\(L_{total} = L_{WM} + \lambda_1 L_{AM} + \lambda_2 L_{FP}\)，世界模型损失同时监督动作模型的学习质量
- **实验覆盖广泛**：LIBERO-10（0.96 成功率 SOTA）、Variant PushT（OOD 恢复）、CALVIN ABC→D（Avg. Len. 3.54 SOTA）、真实机器人 4 任务 4 种 OOD 场景

#### 🔬 深入细节

##### 框架总览

![AdaWorldPolicy 框架总览](https://ar5iv.labs.arxiv.org/html/2602.20057/assets/x2.png)

*图：AdaWorldPolicy 整体架构。左侧为统一的世界模型驱动扩散策略，包含 World Model、Action Model 和 Force Predictor 三个模块，通过 MMSA 层深度耦合。右侧为在线自适应学习（AdaOL）流程：利用世界模型预测误差驱动 LoRA 在线更新。*

##### 算法伪代码

```python
# ===== 离线训练阶段 =====
# 输入: 数据集 D = {(o_t, a_t, f_t, o_{t+1})}
for batch in DataLoader(D):
    o_t, a_t, f_t, o_next = batch
    
    # 编码观测到 VAE 隐空间
    z_t = VAE_Encode(o_t)
    z_next = VAE_Encode(o_next)
    
    # --- Mode I: Action Generation ---
    # 对动作和力加噪 (Flow Matching)
    noise_a, noise_f = sample_noise()
    t = uniform(0, 1)
    a_noisy = (1-t) * noise_a + t * a_t
    f_noisy = (1-t) * noise_f + t * f_t
    
    # MMSA 联合前向: WM tokens + AM tokens + FP tokens
    wm_out, am_out, fp_out = MMSA_Forward(
        wm_input=z_t,           # 世界模型: 当前帧
        am_input=a_noisy,       # 动作模型: 带噪动作
        fp_input=f_noisy,       # 力预测器: 带噪力
        timestep=t
    )
    
    L_AM = L1(am_out, a_t - noise_a)      # 动作 flow matching loss
    L_FP = L2(fp_out, f_t - noise_f)      # 力 flow matching loss
    
    # --- Mode II: Future Imagination ---
    z_next_pred = WorldModel_Forward(z_t, a_t)  # 用真实动作预测下一帧
    L_WM = diffusion_loss(z_next_pred, z_next)  # 世界模型重建损失
    
    # 联合优化
    L_total = L_WM + lambda1 * L_AM + lambda2 * L_FP
    optimizer.step(L_total)

# ===== 在线自适应阶段 (AdaOL) =====
# 测试时, 每收到新观测 o_{t+1}:
for each new observation o_{t+1}:
    # 1. 用上一步动作 a_t 和观测 o_t 预测未来帧
    o_hat_next = WorldModel_Predict(o_t, a_t)
    
    # 2. 计算 VAE 隐空间预测误差
    L_AdaOL = ||VAE_Encode(o_{t+1}) - VAE_Encode(o_hat_next)||^2
    
    # 3. LoRA 在线更新 (rank=16, 前4层, lr=5e-7, 2 gradient steps)
    lora_optimizer.step(L_AdaOL)
    
    # 4. 生成下一步动作
    a_{t+1} = ActionModel_Generate(o_{t+1})  # Mode I 推理
```

##### 动机与背景

传统的机器人操作策略学习面临两大核心挑战：

1. **策略与世界理解的割裂**：现有方法要么将世界模型仅用于数据增强或辅助表征学习，要么完全依赖行为克隆，无法让世界模型在训练过程中主动指导策略优化。世界模型蕴含的丰富物理先验（物体运动规律、接触动力学）未被充分利用。

2. **域偏移下的脆弱性**：离线训练的策略在部署时面临不可避免的视觉偏移（光照、背景、物体外观变化）和物理偏移（摩擦力、物体质量变化），性能急剧下降。传统方法缺乏测试时自适应能力。

AdaWorldPolicy 的核心洞察是：**世界模型不仅是一个被动的环境模拟器，更应该是策略学习的主动监督者**。通过将世界模型与动作策略深度耦合，世界模型的预测质量直接影响策略的学习信号；而在测试时，世界模型的预测误差天然提供了一个无需人工标注的自监督信号，可用于在线自适应。

##### 核心机制详解

**1. 多模态自注意力（MMSA）融合**

AdaWorldPolicy 的三个模块（World Model、Action Model、Force Predictor）并非简单串联，而是通过 MMSA 在 Transformer 层级深度交互。具体而言，在每个 DiT block 中：

$$
[\mathbf{h}_{WM}, \mathbf{h}_{AM}, \mathbf{h}_{FP}] = \text{SelfAttn}([\mathbf{z}_{WM} \| \mathbf{z}_{AM} \| \mathbf{z}_{FP}])
$$

其中 \(\mathbf{z}_{WM}\) 是世界模型的视频 token（来自 Cosmos-Predict2 的 2B 参数骨干），\(\mathbf{z}_{AM}\) 和 \(\mathbf{z}_{FP}\) 分别是动作模型和力预测器的 token。三者在同一注意力矩阵中自由交互，使得：
- 动作模型可以"看到"世界模型对未来的预测，从而学习物理一致的动作
- 力预测器可以感知视觉上下文，提升接触力估计精度
- 世界模型可以获得动作意图信息，提升预测准确性

> 💡 关键：消融实验表明，将 MMSA 替换为简单拼接（Concatenation）成功率从 76.3% 暴跌至 36.3%，替换为交叉注意力（Cross-Attention）也仅有 50.0%，证明了联合自注意力对多模态融合的必要性。

**2. 双模式训练机制**

框架支持两种运行模式，共享同一套参数：

- **Mode I（Action Generation）**：输入当前观测 \(o_t\)，通过 Flow Matching 去噪过程生成动作序列 \(a_t\) 和力预测 \(f_t\)。此模式用于实际部署。

- **Mode II（Future Imagination）**：输入当前观测 \(o_t\) 和真实动作 \(a_t\)，世界模型预测未来帧 \(\hat{o}_{t+1}\)。此模式的损失 \(L_{WM}\) 反向传播时会通过 MMSA 影响动作模型的参数更新，实现"世界模型监督策略学习"。

联合训练目标为：

$$
L_{total} = L_{WM} + \lambda_1 L_{AM} + \lambda_2 L_{FP}
$$

其中 \(L_{AM}\) 采用 \(L_1\) 损失（对动作的稀疏变化更鲁棒），\(L_{FP}\) 采用 \(L_2\) 损失（力信号更连续）。

> ⚠️ 注意：消融实验显示，移除世界模型监督（\(L_{WM}\)）后，框架退化为普通行为克隆，成功率从 76.3% 降至 46.3%，这是所有消融中影响最大的因素。

**3. 在线自适应学习（AdaOL）**

AdaOL 是本文最具创新性的贡献之一。其核心思想是：在测试时，世界模型对下一帧的预测 \(\hat{o}_{t+1}\) 与真实观测 \(o_{t+1}\) 之间的差异，直接反映了当前模型与真实环境之间的域偏移程度。

自适应损失定义为：

$$
L_{AdaOL} = \| E(o_{t+1}) - E(\hat{o}_{t+1}) \|^2
$$

其中 \(E(\cdot)\) 是 VAE 编码器，将比较放在隐空间而非像素空间，既降低计算量又过滤无关的高频噪声。

为实现高效在线更新，AdaOL 采用以下策略：
- **LoRA 微调**：仅在前 4 层 Transformer 插入 rank=16 的 LoRA 适配器，可训练参数 <0.1%
- **极低学习率**：\(lr = 5 \times 10^{-7}\)，防止灾难性遗忘
- **少量梯度步**：每个新样本仅做 2 步梯度更新
- **实时性**：整个闭环（动作生成 + 在线更新 + 设备延迟）平均运行在 4Hz，仅比无 AdaOL 慢约 5%

**4. 力预测器的作用**

力预测器（Force Predictor）是一个 0.4B 参数的 DiT，与动作模型共享 MMSA 层。它预测机器人末端执行器的接触力 \(f_t \in \mathbb{R}^6\)（6 维力/力矩）。

力预测的意义在于：
- 为动作模型提供隐式的物理约束（通过 MMSA 的信息流动）
- 帮助模型理解接触动力学，对抓取、推动等需要精细力控的任务至关重要
- 消融实验显示移除力预测器后成功率从 76.3% 降至 53.8%

##### 与传统方法的区别

| 维度 | Diffusion Policy | 世界模型+策略（松耦合） | **AdaWorldPolicy** |
|------|-----------------|----------------------|-------------------|
| 世界模型角色 | 无 | 数据增强/表征学习 | **主动监督者** |
| 模态融合 | 单模态 | 串联/独立 | **MMSA 深度耦合** |
| 力感知 | 无 | 通常无 | **力预测器联合训练** |
| 测试时适应 | 无 | 无 | **AdaOL 在线 LoRA** |
| 自监督信号 | 无 | 无 | **世界模型预测误差** |

##### 实验亮点

- **LIBERO-10**：平均成功率 0.96，超越 OpenVLA (0.82)、DP (0.78)、π₀-ft (0.92) 等强基线
- **CALVIN ABC→D**：Avg. Len. 3.54（带 AdaOL），超越 GR-MG (3.42)、MoDE (3.39)、OpenVLA (3.27)
- **Variant PushT OOD**：在背景/颜色/形状偏移下，AdaOL 将成功率从 0.47 提升至 0.51（背景偏移），从 0.61 提升至 0.66（形状偏移）
- **真实机器人**：4 种 OOD 场景（光照、背景、桌面、物体变化）下，AWP (ol) 一致性显著优于离线版本

#### 🧪 练习题

```yaml
question: "AdaWorldPolicy 在测试时在线自适应学习（AdaOL）使用的自监督信号是什么？"
options:
  - "机器人动作与专家动作之间的模仿误差"
  - "世界模型预测的未来帧与真实观测在 VAE 隐空间的重建误差"
  - "力预测器输出与真实力传感器读数的差异"
  - "策略网络输出动作的熵值变化"
answer: 1
explain: "AdaOL 的核心是利用世界模型预测的下一帧 ô_{t+1} 与真实观测 o_{t+1} 在 VAE 编码器隐空间的 L2 距离作为自监督损失，无需任何人工标注即可驱动在线适应。"
```