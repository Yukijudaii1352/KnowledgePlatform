### GR00T N1 — 面向通用人形机器人的开放基础模型

```yaml
id: groot-n1
name: "GR00T N1.6"
full_name: "GR00T N1: An Open Foundation Model for Generalist Humanoid Robots"
year: 2026
org: NVIDIA
paper_url: "https://arxiv.org/abs/2503.14734"
category: vla_model
parent: pi0
motivation: "双系统（快思考/慢思考）VLA 架构 + 数据金字塔 + Flow-Matching 扩散动作生成，面向通用人形机器人操作"
```

#### 📝 一句话总结

GR00T N1 提出了一种受 Kahneman 双系统理论启发的 Vision-Language-Action（VLA）架构：以 Eagle-2 VLM 作为"慢思考"系统理解场景与语言指令，以 DiT + Flow-Matching 作为"快思考"系统生成连续动作；同时构建了"数据金字塔"训练范式，将人类视频、合成/神经轨迹与真实机器人数据分层融合，在仿真和 GR-1 人形机器人真机实验中均大幅超越 Diffusion Policy 基线。

#### 🎯 核心要点

- **双系统 VLA 架构**：System 2（Eagle-2 VLM，SigLIP-2 视觉编码器 + SmolLM2 语言模型）负责场景理解与语言推理；System 1（DiT + Flow-Matching）负责高频动作生成，通过 cross-attention 桥接两个系统
- **模型规模**：GR00T-N1-2B 共 2.2B 参数（VLM 1.34B + DiT ~0.86B），单次推理 63.9ms/action chunk（L40 GPU），支持 15Hz 控制频率
- **Flow-Matching 动作生成**：使用条件流匹配（Conditional Flow Matching）替代传统扩散模型，仅需 K=4 步去噪即可生成 H=16 步动作块（action chunk）
- **数据金字塔**：底层为大规模人类视频（通过 VQ-VAE 潜在动作 LAPA 或 IDM 伪标签提取动作），中层为合成/神经轨迹（DexMimicGen + 视频生成模型增强），顶层为少量真实机器人遥操作数据
- **神经轨迹增强**：微调视频生成模型（Cosmos）生成语义一致的新轨迹，配合 IDM 标注动作，实现 10× 数据增强（88h → 827h）
- **DexMimicGen**：自动化仿真数据生成管线，11 小时内生成 780K 条灵巧手操作轨迹（等效 6500 小时）
- **多具身支持**：通过具身特定的 state/action projector 模块，支持不同机器人形态（GR-1 人形、Franka 机械臂等）及潜在动作空间
- **真机实验**：在 GR-1 人形机器人 24 个任务上，GR00T-N1-2B 以 76.8% 平均成功率大幅超越 Diffusion Policy（46.4%）；仅用 10% 数据即达 42.6%，接近 DP 全量数据水平

#### 🔬 深入细节

##### 整体架构

![GR00T N1 架构总览](https://ar5iv.labs.arxiv.org/html/2503.14734v1/assets/x2.png)
*图：GR00T N1 双系统架构。左侧 System 2（VLM）处理多视角图像和语言指令，输出语义嵌入；右侧 System 1（DiT）通过 cross-attention 接收 VLM 嵌入，结合机器人本体状态，经 flow-matching 去噪生成动作序列。*

GR00T N1 的设计灵感来自 Daniel Kahneman 的双系统理论：

- **System 2（慢思考）**：基于 Eagle-2 VLM，由 SigLIP-2 视觉编码器和 SmolLM2-360M 语言模型组成。每帧 224×224 图像经 SigLIP-2 编码后通过 pixel-shuffle 压缩为 64 个视觉 token，支持多视角输入。VLM 不直接输出动作，而是提供丰富的语义表征。
- **System 1（快思考）**：一个 Diffusion Transformer（DiT），以 flow-matching 为生成范式。它通过 cross-attention 层从 VLM 的第 12 层隐藏状态中提取语义信息，结合机器人本体感知状态（关节角度等），在 K=4 步去噪中生成 H=16 步的连续动作块。

> 💡 **关键设计**：使用 cross-attention（而非 MoE）桥接 VLM 与 DiT，使两个子系统的架构选择完全解耦，便于独立升级。同时提取 VLM 中间层（第 12 层）而非最终层的嵌入，因为中间层保留了更丰富的空间信息。

##### 算法伪代码

```python
# GR00T N1 推理流程伪代码
def groot_n1_inference(images, language_instruction, proprioception, model):
    """
    images: list of multi-view camera images, each 224x224
    language_instruction: str, e.g. "Pick up the red apple"
    proprioception: robot joint states [q1, ..., qN]
    """
    # === System 2: VLM 场景理解 ===
    # 视觉编码: SigLIP-2 + pixel-shuffle → 64 tokens/frame
    vis_tokens = model.siglip2_encode(images)          # [N_views, 64, D]
    lang_tokens = model.tokenize(language_instruction)  # [L, D]
    
    # VLM 前向: 获取第 12 层隐藏状态作为语义嵌入
    vlm_embeddings = model.eagle2_vlm(
        vis_tokens, lang_tokens, return_layer=12
    )  # [S, D_vlm]
    
    # === System 1: DiT 动作生成 (Flow-Matching) ===
    # 本体感知编码 (embodiment-specific projector)
    state_embed = model.state_projector(proprioception)  # [D_dit]
    
    # 初始化噪声动作
    a_0 = torch.randn(H, action_dim)  # H=16 步动作块
    
    # K=4 步去噪 (Euler 积分)
    a_t = a_0
    for k in range(K):  # K=4
        t = k / K  # 时间步 t ∈ [0, 1]
        # DiT 预测速度场, 通过 cross-attention 融合 VLM 嵌入
        v_t = model.dit(
            a_t, t, state_embed,
            cross_attn_context=vlm_embeddings
        )
        a_t = a_t + (1/K) * v_t  # Euler step
    
    # 动作解码 (embodiment-specific projector)
    actions = model.action_projector(a_t)  # [H, action_dim]
    return actions  # 执行前 H 步, 然后重新规划
```

##### 核心方法详解

**1. Flow-Matching 动作生成**

传统扩散模型（DDPM）需要数百步去噪，而 GR00T N1 采用条件流匹配（Conditional Flow Matching, CFM），将动作生成建模为从噪声分布到目标动作分布的概率流 ODE：

$$\frac{d\mathbf{a}_t}{dt} = v_\theta(\mathbf{a}_t, t, \mathbf{c})$$

其中 \(\mathbf{a}_t\) 是时间 \(t\) 处的动作状态，\(v_\theta\) 是 DiT 参数化的速度场，\(\mathbf{c}\) 是条件信息（VLM 嵌入 + 本体状态）。训练目标为：

$$\mathcal{L}_{\text{FM}} = \mathbb{E}_{t \sim \mathcal{U}[0,1],\, \mathbf{a}_1 \sim p_{\text{data}}} \left\| v_\theta(\mathbf{a}_t, t, \mathbf{c}) - (\mathbf{a}_1 - \mathbf{a}_0) \right\|^2$$

其中 \(\mathbf{a}_0 \sim \mathcal{N}(0, I)\) 为初始噪声，\(\mathbf{a}_1\) 为真实动作，\(\mathbf{a}_t = (1-t)\mathbf{a}_0 + t\mathbf{a}_1\) 是线性插值路径。推理时仅需 K=4 步 Euler 积分即可生成高质量动作。

> 💡 **直觉**：Flow-Matching 学习的是从噪声到动作的"最短直线路径"上的速度场，相比 DDPM 的弯曲去噪路径，收敛更快、步数更少。

**2. 数据金字塔与预训练策略**

![数据金字塔](https://ar5iv.labs.arxiv.org/html/2503.14734v1/assets/x3.png)
*图：GR00T N1 数据金字塔。底层为海量人类视频（通过 LAPA/IDM 提取潜在动作），中层为合成与神经轨迹，顶层为少量高质量真实机器人数据。*

GR00T N1 的数据策略分为三层：

- **底层 — 人类视频数据**：利用 Ego4D、Epic-Kitchens 等大规模人类操作视频。由于这些视频没有机器人动作标签，论文提出两种方案：
  - **LAPA（Latent Action Pre-training for general Action models）**：训练一个 VQ-VAE 将连续帧间的运动编码为离散潜在动作 token，VLA 在预训练时预测这些潜在动作
  - **IDM（Inverse Dynamics Model）**：训练逆动力学模型，根据前后帧预测伪动作标签

- **中层 — 合成与神经轨迹**：
  - **DexMimicGen**：在 Isaac Lab 仿真环境中，从少量人类演示自动生成大规模灵巧手操作轨迹。通过物体姿态变换和子任务分解，11 小时内从 100 条种子演示扩展到 780K 条轨迹
  - **神经轨迹（Neural Trajectories）**：微调 Cosmos 视频生成模型，以任务指令和初始帧为条件生成新的操作视频，再用 IDM 标注动作。实现 88 小时 → 827 小时的 10× 数据增强

- **顶层 — 真实机器人数据**：通过 VR 遥操作在 GR-1 人形机器人上收集的高质量演示数据

预训练使用约 50K H100 GPU 小时，最多 1024 GPU 并行训练。

**3. 多具身支持与动作空间设计**

GR00T N1 通过具身特定的 projector 模块支持不同机器人：

$$\mathbf{s}_{\text{embed}} = \text{StateProjector}_e(\mathbf{s}_{\text{raw}}), \quad \mathbf{a}_{\text{out}} = \text{ActionProjector}_e(\mathbf{a}_{\text{dit}})$$

其中下标 \(e\) 表示具身类型。不同机器人的关节数、动作维度各异，projector 负责将异构的状态/动作空间映射到统一的 DiT 隐空间。对于无动作标签的视频数据，使用 LAPA 的潜在动作空间作为统一的"虚拟具身"。

**4. 后训练与神经轨迹协同训练**

后训练（Post-training）阶段，将真实机器人数据与神经轨迹按 1:1 比例混合协同训练。实验表明：

- 在 RoboCasa 仿真中，神经轨迹协同训练在 30/100/300 条数据量级分别带来 +4.2%/+8.8%/+6.8% 的提升
- 在 GR-1 真机上，平均提升 +5.8%
- 随着真实数据量增加，IDM 标注的动作质量提升，正迁移效果更显著

**5. 与传统方法的对比**

| 特性 | Diffusion Policy | RT-2 / Octo | π₀ | **GR00T N1** |
|------|-----------------|-------------|-----|-------------|
| 语言理解 | ✗ | VLM 直接输出动作 | VLM + Flow | VLM + DiT (解耦) |
| 动作生成 | DDPM ~100步 | 自回归 token | Flow-Matching | Flow-Matching 4步 |
| 多具身 | 单一 | 有限 | 有限 | Projector 模块 |
| 无动作视频利用 | ✗ | ✗ | 部分 | LAPA + IDM |
| 预训练数据 | 无 | 网络数据 | 机器人数据 | 数据金字塔 |

> ⚠️ **注意**：GR00T N1 的核心创新不仅在架构上（双系统解耦），更在数据工程上（数据金字塔使得模型能从海量非机器人数据中学习操作先验）。

##### 实验结果

**仿真评估**（100 条演示/任务）：

| 方法 | RoboCasa (24任务) | DexMimicGen (9任务) | GR-1 Sim (24任务) | 平均 |
|------|-------------------|--------------------|--------------------|------|
| BC-Transformer | 16.5% | 41.2% | 33.3% | 26.4% |
| Diffusion Policy | 23.2% | 52.3% | 36.7% | 33.4% |
| **GR00T-N1-2B** | **32.1%** | **66.5%** | **50.0%** | **45.0%** |

**真机评估**（GR-1 人形机器人，24 个任务）：

| 方法 | Pick-and-Place | Articulated | Industrial | Coordination | 平均 |
|------|---------------|-------------|------------|-------------|------|
| DP (10% Data) | 3.0% | 14.3% | 6.7% | 27.5% | 10.2% |
| DP (Full Data) | 36.0% | 38.6% | 61.0% | 62.5% | 46.4% |
| GR00T-N1 (10% Data) | 35.0% | 62.0% | 31.0% | 50.0% | 42.6% |
| **GR00T-N1 (Full)** | **82.0%** | **70.9%** | **70.0%** | **82.5%** | **76.8%** |

> 💡 **数据效率亮点**：GR00T-N1 仅用 10% 数据（42.6%）即接近 Diffusion Policy 全量数据的表现（46.4%），体现了预训练带来的强大迁移能力。

#### 🧪 练习题

```yaml
question: "GR00T N1 中 System 1（DiT）与 System 2（VLM）之间的信息传递机制是什么？"
options:
  - "VLM 直接输出离散动作 token，DiT 将其解码为连续动作"
  - "通过 Mixture-of-Experts (MoE) 层融合 VLM 和 DiT 的特征"
  - "DiT 通过 cross-attention 从 VLM 中间层隐藏状态中提取语义信息"
  - "VLM 和 DiT 共享同一组 Transformer 层，交替处理视觉和动作 token"
answer: 2
explain: "GR00T N1 使用 cross-attention 机制让 DiT 从 VLM 第 12 层的隐藏状态中提取语义嵌入，而非使用 MoE（如 π₀）或共享层。这种设计使两个子系统架构完全解耦，便于独立升级。"
```