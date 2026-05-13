### 可灵3.0 (Kling 3.0)

```yaml
id: kling3
name: "Kling 3.0"
full_name: "可灵3.0 (Kling 3.0)"
year: "2026.01"
org: "快手"
paper_url: "https://arxiv.org/abs/2512.16776"
category: "diffusion_based"
parent: "kling"
motivation: "4K/60fps生成，Kling-Foley原生音频"
```

#### 📝 一句话总结

Kling-Omni 提出了一个基于 Diffusion Transformer (DiT) 与视觉语言模型 (VLM) 对齐的统一多模态视频生成与编辑框架，通过 Multi-modal Visual Language (MVL) 输入协议将生成、编辑、参考引导等任务统一到单一模型中，支持 4K/60fps 输出并原生集成音频生成（Kling-Foley），在参考生成和视频编辑任务上达到业界领先水平。

#### 🎯 核心要点

- **统一架构**：DiT 骨干网络与 VLM 对齐，通过共享嵌入空间实现视频生成、编辑、多模态参考引导等任务的统一建模
- **MVL 输入协议**：Multi-modal Visual Language 格式将文本、图像、视频等多模态输入编码为统一序列，消除任务间的输入格式差异
- **渐进式分辨率训练**：从 256px 到 4K 的多阶段渐进训练策略，结合 flow matching（v-prediction 参数化）作为生成范式
- **一致性蒸馏**：将多步扩散模型蒸馏为少步生成模型，大幅降低推理延迟
- **NTK-aware RoPE**：位置编码外推技术，支持训练时未见过的更长序列和更高分辨率
- **级联超分辨率 DiT**：专用超分模型实现 4K 分辨率和 60fps 帧率输出
- **Kling-Foley 音频生成**：原生集成视频到音频生成模块，实现视听一体化
- **高效训练基础设施**：弹性 Ulysses 并行、流水线感知 offloading、97% 有效训练时间比
- **FP8 混合量化推理**：覆盖 GEMM 和注意力模块的 FP8 量化，结合缓存机制实现约 2× 推理加速
- **三层数据过滤体系**：基础质量过滤 → 时序稳定性评估 → 跨模态对齐检测的系统化数据工程

#### 🔬 深入细节

![Kling-Omni 整体架构图](https://arxiv.org/html/2512.16776v1/x1.png)
*图：Kling-Omni 整体架构。DiT 骨干与 VLM 对齐，接受 MVL 格式的多模态输入，统一处理生成、编辑、参考引导等任务。*

![渐进式训练策略](https://arxiv.org/html/2512.16776v1/x2.png)
*图：渐进式分辨率训练流程，从低分辨率逐步提升至 4K，每阶段引入更复杂的任务和数据。*

```python
# Kling-Omni 核心训练流程伪代码
# 1. MVL 输入编码
def encode_mvl_input(text, images, videos, edit_instructions):
    """将多模态输入统一编码为 MVL 序列"""
    text_tokens = text_encoder(text)           # 文本编码
    image_tokens = vae_encode(images)          # 图像 → latent tokens
    video_tokens = vae_encode(videos)          # 视频 → latent tokens
    # VLM 对齐：将所有模态映射到共享嵌入空间
    unified_cond = vlm_align([text_tokens, image_tokens, video_tokens])
    return unified_cond

# 2. Flow Matching 训练 (v-prediction)
def train_step(dit_model, x_0, condition):
    t = sample_timestep()                      # 采样时间步
    noise = torch.randn_like(x_0)
    x_t = (1 - t) * x_0 + t * noise           # 线性插值构造含噪样本
    v_target = noise - x_0                     # v-prediction 目标
    v_pred = dit_model(x_t, t, condition)      # DiT 预测速度场
    loss = mse_loss(v_pred, v_target)
    loss.backward()
    optimizer.step()

# 3. 一致性蒸馏 (少步推理)
def consistency_distill(teacher, student, x_0):
    """将多步 teacher 蒸馏为少步 student"""
    t_n, t_n1 = sample_adjacent_timesteps()
    x_tn = add_noise(x_0, t_n)
    # Teacher: ODE 求解从 t_n 到 t_n+1
    x_teacher = ode_solve(teacher, x_tn, t_n, t_n1)
    # Student: 直接预测
    x_student = student(x_tn, t_n)
    loss = mse_loss(x_student, x_teacher.detach())
    return loss

# 4. 渐进式分辨率训练
stages = [
    {"resolution": 256,  "tasks": ["t2v_basic"]},
    {"resolution": 512,  "tasks": ["t2v", "i2v"]},
    {"resolution": 1024, "tasks": ["t2v", "i2v", "editing", "reference"]},
    {"resolution": 2048, "tasks": ["all_tasks"]},
    {"resolution": 4096, "tasks": ["all_tasks + super_resolution"]},
]
for stage in stages:
    train(model, stage["resolution"], stage["tasks"])
```

##### 动机与背景

传统视频生成领域面临严重的任务碎片化问题：文本到视频（T2V）、图像到视频（I2V）、视频编辑、参考引导生成等任务通常需要独立的专家模型。这不仅增加了系统复杂度，还导致不同任务间的能力无法共享和协同。此外，现有方法在以下方面存在明显不足：
- **分辨率与帧率受限**：大多数模型难以达到 4K/60fps 的高质量输出
- **多模态理解不足**：缺乏对复杂多模态输入（多图参考、视频参考、编辑指令组合）的统一理解能力
- **音视频割裂**：视频生成和音频生成通常是分离的流程

Kling-Omni 的核心动机是构建一个"通才型"生成模型，用单一架构替代碎片化的专家模型群。

##### 核心架构：DiT + VLM 对齐

Kling-Omni 的架构核心是一个 Diffusion Transformer (DiT)，与视觉语言模型 (VLM) 进行深度对齐。这种设计的关键创新在于：

1. **共享嵌入空间**：VLM 将文本、图像、视频等不同模态的输入映射到统一的语义空间中，使 DiT 能够以一致的方式理解和处理各类条件信号。

2. **MVL 输入协议**：所有任务的输入被统一编码为 Multi-modal Visual Language 格式。例如，"根据参考图像生成视频"和"编辑视频中的某个对象"在 MVL 格式下具有相同的输入结构，只是条件内容不同。这使得模型无需为每个任务设计特定的输入处理逻辑。

3. **条件注入机制**：编码后的条件信号通过交叉注意力机制注入 DiT 的每一层，实现细粒度的条件控制。

> 💡 关键：MVL 协议的核心价值在于将"任务类型"从显式的架构差异转化为隐式的输入内容差异，从而实现真正的任务统一。

##### 训练策略：渐进式多阶段训练

Kling-Omni 采用渐进式分辨率训练策略，从低分辨率逐步提升到高分辨率：

- **低分辨率阶段**（256-512px）：模型学习基本的时空建模能力和语义理解
- **中分辨率阶段**（512-1024px）：引入更复杂的任务（编辑、参考引导），模型学习跨模态对齐
- **高分辨率阶段**（1024-2048px）：全任务训练，提升细节质量和时序一致性
- **超高分辨率阶段**（4K）：通过级联超分辨率 DiT 实现最终的 4K/60fps 输出

生成范式采用 **Flow Matching** 框架，使用 v-prediction 参数化。相比传统的 \(\epsilon\)-prediction，v-prediction 在训练稳定性和生成质量上具有优势，其目标函数为：

$$\mathcal{L} = \mathbb{E}_{t, x_0, \epsilon} \left[ \| v_\theta(x_t, t, c) - ({\epsilon} - x_0) \|^2 \right]$$

其中 \(x_t = (1-t) x_0 + t \epsilon\) 是线性插值构造的含噪样本，\(c\) 是条件信号。

##### 一致性蒸馏与推理加速

为解决扩散模型推理步数多、延迟高的问题，Kling-Omni 采用一致性蒸馏（Consistency Distillation）技术：

- **Teacher 模型**：完整的多步扩散模型，通过 ODE 求解器进行高质量采样
- **Student 模型**：学习在更少的步数内直接映射到去噪结果
- 蒸馏过程中，Student 被训练为在任意噪声水平上都能一步预测出与 Teacher 多步求解一致的结果

推理端还结合了以下优化：
- **FP8 混合量化**：大部分 GEMM 和自注意力模块量化为 FP8，量化/反量化操作融合进其他 kernel，实现零额外开销
- **条件缓存**：对参考图像和视频的条件编码进行缓存，避免重复计算，实现约 2× 加速
- **混合并行推理**：Ulysses 并行 + 张量并行，配合计算-通信重叠，隐藏大部分通信开销

##### 位置编码外推：NTK-aware RoPE

为支持推理时生成比训练时更长的序列（更高分辨率或更多帧），Kling-Omni 采用 NTK-aware RoPE 位置编码。其核心思想是调整 RoPE 的基频参数，使模型能够在不重新训练的情况下外推到更长的序列：

$$\text{RoPE}(x, m) = x \cdot e^{im\theta_k}, \quad \theta_k = \beta^{-2k/d}$$

其中 \(\beta\) 是经过 NTK 感知调整的基频，\(m\) 是位置索引。通过适当增大 \(\beta\)，高频分量的周期被拉长，从而避免在超出训练长度时出现位置编码冲突。

##### 级联超分辨率与音频生成

**超分辨率**：专用的超分 DiT 模型将基础分辨率输出提升至 4K/60fps。该模型以低分辨率视频作为条件输入，学习添加高频细节和时序插帧。

**Kling-Foley 音频生成**：原生集成的视频到音频生成模块，能够根据视频内容自动生成匹配的音效和环境音。这是 Kling-Omni 区别于其他视频生成模型的重要特性，实现了真正的视听一体化输出。

##### 训练基础设施

![训练流水线调度](https://arxiv.org/html/2512.16776v1/x4.png)
*图：Kling-Omni 的流水线调度。VAE/TE 的推理分布在数据并行和流水线并行维度上，采用交错 1F1B 调度。*

Kling-Omni 的训练基础设施实现了多项关键优化：

1. **在线数据流水线**：推理调度器将原始数据分配到 DP/PP 组，推理后由训练调度器重排以平衡负载
2. **弹性 Ulysses 并行**：微批次级别的动态 UP 度切换，在线自适应调度器异步确定每个微批次的并行度
3. **两层 All-to-All 通信**：节点内聚合 + 节点间交换，缓解 spine 交换机负载
4. **MM-FlashAttention**：支持任意跨模态 mask 和变长序列的打包版多模态 FlashAttention kernel
5. **选择性重计算 + 流水线感知 offloading**：将激活值卸载到 CPU，减少 GPU 显存占用
6. **97% 有效训练时间比**：自动故障检测（分钟级挂起检测）、亚分钟级重启、并行化 warmup

##### 数据工程

数据系统覆盖跨模态（图像/文本/视频）和跨任务（I2V、V2V、编辑、参考生成）两个维度：

- **真实数据采集**：大规模互联网数据挖掘，利用内部嵌入模型构建语义相关的跨模态样本
- **合成数据构造**：专家模型驱动的合成流水线，包括自动逆向合成策略，构建保持时序一致性的参考-视频训练对
- **三层过滤体系**：
  - 基础过滤：分辨率/时长阈值、帧级去重、音视频损坏检测、NSFW 过滤
  - 时序质量评估：模糊/抖动/压缩噪声检测、场景切换检测、低动作密度过滤
  - 跨模态对齐：视频-文本语义一致性、参考图像-目标视频保真度、编辑指令-执行结果对齐、人物身份一致性检查

> ⚠️ 注意：Kling-Omni 的核心创新不仅在于模型架构，更在于将生成、编辑、参考引导等任务通过 MVL 协议统一到单一模型中，并配合系统化的数据工程和高效训练基础设施实现了工业级部署。

#### 🧪 练习题

```yaml
question: "Kling-Omni 中 MVL (Multi-modal Visual Language) 输入协议的核心作用是什么？"
options:
  - "提升模型的参数效率，减少模型大小"
  - "将不同任务的多模态输入统一编码为一致格式，消除任务间的输入差异"
  - "替代 VAE 编码器，直接处理原始像素输入"
  - "实现音频和视频的同步生成"
answer: 1
explain: "MVL 协议将文本、图像、视频等多模态输入编码为统一序列格式，使得生成、编辑、参考引导等不同任务可以被同一个模型以一致的方式处理，这是 Kling-Omni 实现任务统一的关键设计。"
```