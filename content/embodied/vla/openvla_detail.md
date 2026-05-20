### OpenVLA：开源视觉语言动作模型

```yaml
id: openvla
name: OpenVLA
full_name: 开源视觉语言动作模型 (Open Vision-Language-Action Model)
year: 2024.06
org: Stanford University / UC Berkeley
paper_url: https://arxiv.org/abs/2406.09246
category: vlm_finetune
parent: rt2
motivation: 双视觉特征7B超越55B RT-2-X
```

#### 📝 一句话总结

OpenVLA 提出了一种基于 7B 参数 Prismatic VLM、融合 SigLIP 与 DINOv2 双视觉编码器的开源视觉语言动作模型，将连续动作离散化为 256 个 bin，在 970k 机器人轨迹上微调后，以不到 RT-2-X 八分之一的参数量实现跨多种机器人形态的显著更高或持平的性能表现。

#### 🎯 核心要点

- 提出 **OpenVLA**：首个完全开源的 7B 级视觉语言动作大模型，在 Open X-Embodiment 数据集上训练
- 采用 **Prismatic-7B** 作为基座 VLM，其视觉塔融合 **SigLIP**（语义特征）与 **DINOv2**（空间特征）双视觉编码器，LLM 骨干为 Llama 2 7B
- 动作预测采用 **256-bin 离散化策略**：将机器人末端执行器的连续位置增量（Δx, Δy, Δz, Δyaw, Δpitch, Δroll 及夹爪开合）按分位数映射为离散 token，复用 VLM 自身的 token 预测能力
- 训练数据整合自 Open X-Embodiment 数据集的 **970k 条机器人轨迹**（经严格清洗，如滤除全零动作），横跨多种机器人形态
- 在 **BridgeData V2**（WidowX 机器人）评测中，7B OpenVLA 的泛化成功率**显著超越** 55B RT-2-X；在 **Google Robot** 评测中性能持平
- 支持 **LoRA 参数高效微调**（仅微调 1.4% 参数即匹配全参数微调性能），可在单张 A100 上 10-15 小时内适配新机器人
- 支持 **4-bit 量化推理**，显存占用仅 7GB，成功率与 bfloat16 推理持平

#### 🔬 深入细节

##### 核心架构图

![OpenVLA 架构总览](https://ar5iv.labs.arxiv.org/html/2406.09246/assets/x1.png)
*图 1：OpenVLA 模型架构。左侧为 Prismatic-7B VLM 基座（SigLIP+DINOv2 双视觉编码器 + Llama 2 7B LLM），右侧展示动作离散化与预测流程——连续动作经分位数 bin 映射为 256 类离散 token，由 LLM 输出 logits 解码为机器人动作。*

##### 动作离散化伪代码

```python
# OpenVLA 动作离散化与反离散化
# 连续动作空间：7维（Δx, Δy, Δz, Δyaw, Δpitch, Δroll, gripper）

# 1. 离散化（训练时）
for dim in range(7):
    # 按全局分位数将各维动作值映射到 {0, 1, ..., 255}
    bin = quantize(action[dim], bins[dim])  # bins[dim]: 256个分位数界限
    action_token = dim * 256 + bin           # 共7×256=1792个独立token

# 2. 反离散化（推理时）
for dim in range(7):
    # 从 softmax 分布中取最大值索引
    bin_logits = model_output[:, dim*256 : (dim+1)*256]
    bin = argmax(bin_logits)
    action[dim] = dequantize(bin, bins[dim])  # 还原为连续值
```

##### 方法深入解读

**动机与背景：为什么需要 OpenVLA？**

在 OpenVLA 之前，以 Google DeepMind RT-2 为代表的视觉语言动作模型虽展示了将互联网预训练的 VLM 用于机器人控制的巨大潜力，但其 55B 参数模型完全闭源，研究社区无法自由获取、微调和改进。同时，已有开源策略模型（如 Octo，93M 参数）未利用大规模互联网视觉语言预训练，泛化能力有限。OpenVLA 的核心动机即填补这一空白——**构建一个性能顶尖、完全开源、且可在普通 GPU 上微调和推理的 VLA 模型**。

**双视觉编码器的精妙设计：SigLIP + DINOv2 的协同互补**

OpenVLA 的视觉塔是架构中的关键创新。基座 VLM（Prismatic-7B）在训练时发现融合 **SigLIP** 和 **DINOv2** 两种视觉特征可获得最佳下游效果。这一设计在机器人控制场景中恰好意义深远：

- **SigLIP**（出自 Google DeepMind，ICCV 2023）采用 sigmoid loss 进行大规模图像-文本对比预训练，擅长提取**语义层面**的视觉特征（"这是什么物体？"），有助于语言指令的视觉接地（visual grounding）。
- **DINOv2**（出自 Meta AI，自监督训练）擅长捕获**空间结构**信息（"物体在什么位置？什么姿态？"），对机器人精确操作的方位导向至关重要。

两者特征经 MLP 投影到 LLM 嵌入空间后拼接，形成**既"识物"又"知位"**的视觉表征。论文通过消融实验直接验证：仅使用 SigLIP 的简化版 OpenVLA 仍能保持较强性能，佐证了语义特征的主导作用；但融合空间特征对于需要精细空间推理的任务尤为重要。

> 💡 关键：这一设计与 CLIPort 等先前工作中的"What Where"双通路（two-stream）思想本质一脉相承，但 OpenVLA 将其内生于 VLM 框架，避免了额外的外挂模块。

**离散化动作预测：让 LLM 原语预测机器人动作**

如何让为文本 token 设计的 LLM 输出连续机器人动作？OpenVLA 采用了一个简洁高效的方案：**将每个动作维度的连续值域划分为 256 个等频率 bin（分位数离散化）**，7 个动作维度共产生 7×256=1792 个独立 token。在推理时，模型在每个维度对应的 256 个 logit 上取 argmax 选择 bin 索引，再通过反量化还原为连续动作值。

这一策略的优势：
1. **复用 LLM 的完整训练栈**：无需在 LLM 之上额外添加复杂的回归头，最大化利用 VLM 的表达能力；
2. **训练稳定性**：分类任务比直接回归连续值更容易优化，尤其在大范围数据混合的场景中；
3. **与 RT-2 的 token 化方案一致**：在语义上与 RT-2 的做法对齐，但 OpenVLA 将其扩展为真正开源的实现。

> ⚠️ 注意：256-bin 离散化带来一定的精度损失（每个维度 256 个分辨率），但在大范围机器人操作任务中，这种精度对成功率影响有限，而训练稳定性的收益远大于精度的微小损失。

**训练与推理：从 64 卡大规模预训练到单卡 LoRA 微调**

OpenVLA 的训练分为两个阶段。第一阶段是 VLM 基座（Prismatic-7B）的预训练——在 LLaVA-1.5 数据混合（含 590k 条视觉问答数据）上训练，建立视觉-语言对齐。第二阶段是在 970k 条机器人轨迹上进行动作预测微调：使用 64 张 A100 GPU，跨 14 天，batch size 2048，学习率 1e-4 配合 cosine 衰减。微调时仅预测动作 token 的交叉熵损失，视觉和语言部分保持冻结或仅轻微调整。

在适配新机器人场景时，OpenVLA 展示了出色的数据效率：仅需 10-150 条专家示教，通过 LoRA（rank=32）作用于所有线性层，可在单张 A100 上 10-15 小时完成适配，训练参数仅 97.6M（不到总参数的 1.4%），性能即与全参数微调持平。推理端，4-bit 量化可将模型压缩至 7GB 显存，在消费级 GPU（如 RTX 4090）上达到 3Hz 以上的控制频率。

**与 RT-2 的对比：小模型如何超越大模型？**

OpenVLA 以 7B 参数量在 BridgeData V2 评测上显著优于 55B RT-2-X，这一反直觉结果源于三个要素：
1. **数据集质量**：OpenVLA 的 970k 轨迹经过了更严格的清洗（如滤除 Bridge 数据集中的全零动作、修正标注错误），而 RT-2-X 使用的 350k 轨迹未经同等程度的清理；
2. **视觉特征的融合**：RT-2-X 依赖 PaLI 系列的单一视觉编码器，而 OpenVLA 显式融合语义（SigLIP）和空间（DINOv2）特征，对操作类任务的视觉理解更全面；
3. **全参数机器人微调**：OpenVLA 在机器人数据上全参数微调了 LLM 骨干，而 RT-2-X 的微调策略在论文中未公开细节，可能涉及额外的约束（如保留互联网知识的正则化）。

#### 🧪 练习题

```yaml
question: "OpenVLA 的动作离散化策略中，每个动作维度被划分为多少个 bin？"
options:
  - "128 个 bin，以匹配 7 维动作空间"
  - "256 个 bin，通过分位数映射保证均匀分布"
  - "512 个 bin，以提高动作精度"
  - "1000 个 bin，每个 bin 对应一个独立的动作 token"
answer: 1
explain: "OpenVLA 将每个动作维度（如 Δx、Δy、Δz 等）均匀划分为 256 个 bin，采用分位数离散化保证各 bin 在训练数据中的样本量均衡，7 个维度共产生 7×256=1792 个独立动作 token。"
```