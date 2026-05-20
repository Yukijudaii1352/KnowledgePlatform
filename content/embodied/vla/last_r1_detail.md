### LaST-R1

```yaml
id: last_r1
name: LaST-R1
full_name: LaST-R1: Latent Reasoning via Large-Scale Sparse Token for VLA
year: "2024"
org: Multi-Institutional (含UC Berkeley等)
paper_url: https://arxiv.org/abs/2604.28192
category: vla
parent: "—"
motivation: 将隐式CoT推理引入VLA+在线RL，实现机器人从"死记硬背"到"动脑思考"的跨越
```

#### 📝 一句话总结

LaST-R1 首次将隐式链式推理（Latent Chain-of-Thought）与在线强化学习结合，使视觉-语言-动作模型（VLA）能够在压缩的隐式 token 空间中进行内在思考，并通过 Latent-Action Policy Optimization（LAPO）实现推理与执行的联合优化。

#### 🎯 核心要点

- 提出 **Last0\*** 架构：用 DINOv3 的 top-k 稀疏 token 替代传统 visual summary，将视觉信息压缩为语义丰富的隐式推理锚点
- **latent reasoning tokens**：在 visual/text tokens 与 action tokens 之间插入可学习的隐式 token，模型在其中进行自主推理后再输出动作
- **Latent-Action Policy Optimization (LAPO)**：首次将隐式推理空间纳入 RL 优化目标，含三部分损失（action loss + latent similarity loss + value loss），对 latent token 采用 importance sampling + 序列级 ratio + token 级 mask
- **Adaptive Latent CoT**：通过 M 个候选位置采样 `<latent_end>` 终止 token，温度 β 控制探索，实现推理长度的自适应学习
- **Hybrid Attention Mask**：latent tokens 使用 causal mask 进行自回归推理，action tokens 使用 bidirectional mask 实现并行解码，兼顾推理深度与执行效率
- 在 LIBERO 四套件上达到 **99.8% SOTA**，超 π_RL（98.3%）和 OpenVLA-OFT（97.1%）
- 真实世界 4 任务 RL 后成功率从 52.5% 提升至 **93.75%**
- OOD 泛化显著优于 Action-Only PPO，验证了隐式推理空间对泛化能力的关键作用

#### 🔬 深入细节

##### 动机与背景

传统 VLA 模型面临"死记硬背"困境：模型直接映射感知到动作，缺乏内在推理过程。虽然 Chain-of-Thought（CoT）在 LLM 中取得了巨大成功，但将其应用于机器人存在两大障碍：

1. **语言 CoT 的时延瓶颈**：显式文本推理增加 2-5 秒延迟，对实时控制不可接受
2. **RL 优化断裂**：文本推理与动作执行无法通过 RL 进行端到端联合优化

LaST-R1 的核心洞察：**推理不一定需要显式语言，可以在压缩的隐式空间中进行**——这既保留了推理深度，又解决了延迟和优化问题。

##### Last0\* 架构

![LaST-R1 架构总览图](https://ar5iv.labs.arxiv.org/html/2604.28192/assets/x1.png)
*图：LaST-R1 整体架构——视觉输入经 DINOv3 提取 top-k latent tokens，与 visual/text tokens 拼接后输入 LLM 进行 latent reasoning，最后 action decoder 输出动作块*

模型基于 Qwen3-VL-4B 构建，核心架构如下：

**输入处理**：
- 视觉输入经 vision encoder 提取 N_v 个 visual tokens
- 额外使用预训练 DINOv3 模型提取 top-k 隐式视觉总结 token（离线计算，无额外训练成本）
- 文本指令 token 化后与 visual tokens、latent summary tokens 拼接

**消融实验验证**（Table 1）：
- DINOv3 top-k 方法在 LIBERO-Spatial 上达 97.2%，显著优于 Global Pooling（93.5%）、Convolutional Downsampling（94.8%）、Q-Former（95.1%）
- 隐式 token 长度从 1→8，性能单调提升至 97.2%（长度 1 时仅 93.8%）

**Hybrid Attention Mask 设计**（Figure 6）：
- Vision + Text + Latent tokens：使用 causal lower-triangular mask（自回归生成）
- `<latent_end>` 后 action tokens：使用 bidirectional mask，允许 chunk 内所有 action token 互相 attend
- 该设计实现了"推理串行、执行并行"的效率平衡

##### Latent-Action Policy Optimization (LAPO)

LAPO 是首个将隐式推理空间纳入 RL 优化的框架，其总损失函数为：

$$\mathcal{L}_{LAPO}(\theta) = \mathcal{L}_{action}(\theta) + \lambda_1 \mathcal{L}_{latent}(\theta) + \lambda_2 \mathcal{L}_{value}(\theta)$$

**1. Action Loss（动作损失）**：
基于 PPO-clip 目标，对 action tokens 计算 standard policy gradient：

$$\mathcal{L}_{action} = -\min(r_t(\theta) \hat{A}_t, \text{clip}(r_t(\theta), 1-\epsilon_{\min}, 1+\epsilon_{\max}) \hat{A}_t)$$

其中 ratio \(r_t(\theta)\) 按序列级别计算，\(\epsilon_{\min}=0.2, \epsilon_{\max}=0.28\) 为非对称裁剪。

**2. Latent Loss（隐式损失）**：
对 latent reasoning tokens 采用特殊处理：

- **Importance Sampling**：由于隐式 token 不可直接监督，利用 SFT warm-up 期间计算的 offline DINOv3 GT latent 作为锚点
- **序列级 ratio**：与 action loss 共享同一序列级 ratio（\(r_t(\theta)\)），保持优化一致性
- **Token 级 mask**：仅对 latent token 位置施加损失

$$\mathcal{L}_{latent} = -r_t(\theta) \hat{A}_t \cdot \mathbf{1}_{\text{latent\_position}} \cdot \cos\_\text{sim}(z_{pred}, z_{gt})$$

**3. Value Loss（价值损失）**：
标准 MSE 损失，用于 GAE 优势估计（\(\gamma=0.99, \lambda=0.95\)）。

**超参数消融**（Figure 7）：
- \(\lambda_1=0.1\) 最佳（99.8%），\(\lambda_1=0\) 降至 97.2%，\(\lambda_1=1\) 降至 99.0%
- \(\lambda_2=1\) 最佳（99.8%），\(\lambda_2=0.1\) 降至 97.8%
- \(\lambda_3=0.1\)（transition penalty）最佳，增至 2 降至 98.6%

##### Adaptive Latent CoT

传统方法固定插值长度，无法适配不同任务复杂度。LaST-R1 提出了自适应推理长度机制：

- 设置最大长度 \(L_{max}=8\)，候选终止位置数 \(M=4\)
- 在每个候选位置以概率 \(p(m) \propto \exp(-\beta \cdot m)\) 采样 `<latent_end>` token
- 温度 \(\beta\) 控制探索：\(\beta\) 大 → 偏向短推理（exploitation），\(\beta\) 小 → 偏向长推理（exploration）

**优化目标**包含 transition loss \(\mathcal{L}_{end}\)：

$$\mathcal{L}_{total} = \mathcal{L}_{action} + \lambda_1 \mathcal{L}_{latent} + \lambda_2 \mathcal{L}_{value} + \lambda_3 \mathcal{L}_{end}$$

实验结果（Figure 8）：RL 后模型自动学习到早期退出策略——简单任务用 2-4 步推理，复杂任务保留更长推理。

##### 训练流程

**第一阶段：SFT Warm-up**
- 预训练数据：400K 轨迹（28M 帧），含 Open-X-Embodiment、DROID、ManiSkill 等
- 使用 Qwen3-VL-4B 预训练权重初始化
- 扩展 tokenizer 词表：新增 256 个 action tokens（`<action_i>`，\(i \in [0,255]\)）+ `<latent_end>` token
- 联合优化：cosine similarity loss（latent 对齐）+ CE loss（`<latent_end>` + action tokens），权重比 1:0.1:1
- LIBERO：每任务仅 1 条专家轨迹，训练 10K iterations
- 真实世界：每任务 20 条轨迹，训练 1K iterations

**第二阶段：LAPO RL 在线训练**
- LIBERO：8×H20 GPU，verl+FSDP，每次 rollout 512 条轨迹，4 PPO epochs，学习率 \(3\times10^{-5}\)（actor）/ \(3\times10^{-4}\)（value head）
- 真实世界：Franka Research 3 机器人 + 2×RTX 4090，连续异步 actor-learner 架构，仅更新 LoRA（r=32），冻结基座模型
- 真实世界奖励：任务成功 +10，步惩罚 -0.05

##### 关键实验发现

1. **LIBERO SOTA**（Table 1）：LaST-R1 四套件平均 99.8%，超过所有对比方法
2. **消融 M=4** 最佳，M=1（固定长度）降至 97.5%
3. **执行效率**（Figure 9）：RL 后模型执行步数甚至优于 expert demonstrations
4. **OOD 泛化**（Figure 10）：Action-Only PPO overfitting 严重（20-30%），LaST-R1 持续提升至 54-100%

#### 🧪 练习题

```yaml
question: "LaST-R1 中 LAPO 对隐式推理 token 采用的优化策略是什么？"
options:
  - "直接使用 PPO-clip 进行优化，与 action token 无区别"
  - "采用 importance sampling + 序列级 ratio + token 级 mask，仅对 latent token 位置施加损失"
  - "冻结隐式 token 权重，仅优化 action decoder"
  - "使用 DPO 进行偏好对齐，不涉及 ratio 计算"
answer: 1
explain: "隐式 token 不可直接监督，LAPO 利用 SFT 阶段的 offline DINOv3 GT latent 作为锚点进行 importance sampling，共享序列级 ratio 保持优化一致性，并通过 token 级 mask 仅在 latent 位置施加损失。"
```