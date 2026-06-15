### OpenVLA：开源视觉语言动作模型

```yaml
id: openvla
name: OpenVLA
full_name: 开源视觉语言动作模型 (Open Vision-Language-Action)
year: "2024"
org: Stanford
paper_url: https://huggingface.co/openvla
category: foundation_model
parent: rt2
motivation: 7B参数开源VLA模型
```

#### 📝 一句话总结

OpenVLA 提出 7B 参数开源 VLA 模型，在 Prismatic VLM 上融合 SigLIP 与 DINOv2 视觉特征，并在 970k 条机器人轨迹上微调，使研究社区可以直接获取、微调和量化部署通用视觉语言动作策略。

#### 🎯 核心要点

- 首个广泛发布的 7B 级开源 VLA，面向多机器人形态的语言条件视觉操作
- 基座为 Prismatic-7B，LLM 使用 Llama 2 7B，视觉塔融合 SigLIP 语义特征与 DINOv2 空间特征
- 使用 Open X-Embodiment 数据集中的约 970k 真实机器人演示轨迹进行动作预测微调
- 将连续动作按维度离散成 256 个 bin，并映射到语言模型 token 空间进行分类预测
- 在多种机器人评测中以远小于 55B RT-2-X 的参数量取得强泛化表现
- 支持 LoRA 参数高效微调，可用少量演示适配新机器人或新任务
- 支持 4-bit 量化推理，降低部署显存门槛

#### 🔬 深入细节

##### 核心示意图

![OpenVLA 架构图](https://ar5iv.labs.arxiv.org/html/2406.09246/assets/x1.png)
*图：OpenVLA 以 Prismatic VLM 为基座，将图像和语言编码后输出离散动作 token，再反量化为机器人控制命令。*

##### 算法伪代码

```python
# OpenVLA: action tokenization and VLA fine-tuning

def discretize_action(action, quantile_bins):
    tokens = []
    for dim, value in enumerate(action):  # e.g. 7 DoF EEF action
        bin_id = bucketize(value, quantile_bins[dim])  # 0..255
        tokens.append(action_token_id(dim, bin_id))
    return tokens

for image, instruction, action in oxe_robot_dataset:
    visual_tokens = siglip_encoder(image) + dinov2_encoder(image)
    prompt_tokens = tokenizer(instruction)
    target_tokens = discretize_action(action, quantile_bins)

    logits = prismatic_vlm(visual_tokens, prompt_tokens)
    loss = cross_entropy(logits.action_positions, target_tokens)
    update(loss)

# inference
logits = model(image, instruction)
action_tokens = constrained_argmax(logits, valid_action_tokens)
action = dequantize(action_tokens, quantile_bins)
robot.step(action)
```

##### 方法详解

**动机与背景：为什么需要开源 VLA？**

RT-2 证明了 VLM 可以通过动作 token 化变成机器人策略，但模型、训练细节和数据并未完全开放，社区难以复现、微调或系统研究。与此同时，传统模仿学习策略虽然可开源，但通常缺少互联网规模视觉语言预训练，跨物体、跨语言指令和跨机器人泛化有限。OpenVLA 的目标就是把 VLA 从闭源演示变成可用研究基线。

**核心机制一：双视觉编码器融合**

OpenVLA 的视觉部分融合 SigLIP 与 DINOv2。SigLIP 更偏语义对齐，擅长回答“图中是什么、和语言指令如何对应”；DINOv2 更偏自监督空间表征，擅长保留物体形状、边界和局部结构。机器人操作同时需要识别目标和定位目标，因此双视觉塔比单一路径更稳。

视觉特征经过投影后进入 LLM token 空间，与语言指令共同作为上下文。语言模型不再只生成文本，而是在动作位置上生成离散动作 token。

**核心机制二：动作离散化**

设连续动作为：

$$
a_t = [\Delta x,\Delta y,\Delta z,\Delta roll,\Delta pitch,\Delta yaw,g]
$$

OpenVLA 对每个维度使用 256 个分位数 bin。训练时，真实连续动作被量化为分类标签：

$$
z_i = Q_i(a_i), \quad z_i \in \{0,\ldots,255\}
$$

损失为动作 token 的交叉熵：

$$
\mathcal{L} =
- \sum_i \log p_\theta(z_i \mid I_t, l_t)
$$

推理时，模型在每个动作维度对应的合法 token 集合中取最大概率，再通过反量化映射回连续动作。该方案牺牲一部分精度，但换来稳定训练和对语言模型训练栈的最大复用。

**核心机制三：大规模机器人轨迹微调**

OpenVLA 使用 Open X-Embodiment 的大规模真实机器人轨迹进行微调。数据覆盖多个机器人、任务、相机视角和动作空间。训练中的关键工程问题是清洗和标准化：去除无效动作、统一动作维度、对齐语言指令，并为不同数据集定义一致的动作 token 化规则。

这种训练让模型不只会“看懂图像”，还学到视觉变化和机器人动作之间的统计关系。相比从头训练的小模型，VLM 预训练提供语义泛化；相比闭源大模型，OpenVLA 提供可微调、可量化、可检查的基线。

**适配与部署**

OpenVLA 的重要贡献之一是证明 VLA 可以用 LoRA 低成本适配新任务。实际使用时，研究者可冻结大部分参数，只在注意力/MLP 线性层插入低秩更新，用几十到数百条演示把模型迁移到新机器人。量化推理进一步降低部署成本，使 7B VLA 不再只属于大集群实验。

> ⚠️ 注意：OpenVLA 的动作离散化适合许多桌面操作，但对于高频灵巧控制仍可能受量化和自回归延迟限制，这也是 π₀ 等连续动作 VLA 后续发展的动机。

#### 🧪 练习题

```yaml
question: "OpenVLA 使用 SigLIP + DINOv2 双视觉编码器的主要原因是什么？"
options:
  - "SigLIP 提供语义对齐，DINOv2 提供空间结构，两者互补支持机器人操作"
  - "两个编码器分别控制左臂和右臂"
  - "DINOv2 负责语言理解，SigLIP 负责动作解码"
  - "只是为了增加参数量，不影响控制性能"
answer: 0
explain: "机器人操作既需要识别语言指令中的目标，也需要准确感知目标位置和形状；SigLIP 与 DINOv2 分别补充语义和空间表征。"
```
