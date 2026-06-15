### OpenVLA

```yaml
id: openvla
name: OpenVLA
full_name: "开源视觉语言动作模型 (OpenVLA)"
year: "2024"
org: "Stanford"
paper_url: "https://arxiv.org/abs/2406.09246"
category: "embodied"
parent: "rt2"
motivation: "基于Open X-Embodiment的7B开源VLA"
```

#### 📝 一句话总结

OpenVLA 提出了一个 7B 参数开源 Vision-Language-Action 模型，把图像观测和语言指令映射为离散动作 token，解决了此前 VLA 模型大多闭源、难以复现和难以低成本微调的问题。它基于 Prismatic VLM、Open X-Embodiment 机器人数据和动作 token 化训练，成为开源机器人通用策略的重要基线。

#### 🎯 核心要点

- 开源 7B VLA：发布模型权重、训练代码、微调 notebook 和 Open X-Embodiment 数据训练支持
- 使用 Prismatic-7B VLM backbone：DINOv2 + SigLIP 双视觉编码器、MLP projector、Llama 2 7B 语言模型
- 训练数据来自 Open X-Embodiment，筛选约 970k 真实机器人演示轨迹，覆盖多机器人、多任务、多场景
- 将连续 7 维机器人动作离散为每维 256 个 bin，并复用 Llama tokenizer 中最少使用的 256 个 token 作为动作 token
- 使用 next-token prediction 目标训练，但只在动作 token 上计算交叉熵损失
- 系统研究 VLA 低成本适配：LoRA 微调、量化推理和远程 VLA inference server
- 相比 RT-2-X 55B 更小且开源，在多机器人任务上取得更高平均成功率

#### 🔬 深入细节

##### 框架总览

![OpenVLA 模型架构](https://arxiv.org/html/2406.09246v3/x1.png)
*图：OpenVLA 接收图像观测和语言指令，经 DINOv2+SigLIP 视觉编码、projector 和 Llama 2 语言模型，输出 7 维机器人动作 token。*

##### 算法流程

```python
# OpenVLA 训练与推理伪代码
for image, instruction, continuous_action in openx_dataset:
    # 1. 视觉语言输入
    siglip_feat = siglip_encoder(image)
    dinov2_feat = dinov2_encoder(image)
    visual_tokens = projector(concat(siglip_feat, dinov2_feat))

    # 2. 动作离散化：每一维映射到 256 个 bin
    action_bins = []
    for d in range(7):
        q1, q99 = quantile_bounds[d]
        bin_id = discretize(continuous_action[d], q1, q99, num_bins=256)
        action_bins.append(bin_id)

    action_tokens = map_bins_to_llama_tokens(action_bins)

    # 3. 只对动作 token 做 next-token prediction
    logits = llama2_backbone(visual_tokens, instruction, action_tokens[:-1])
    loss = cross_entropy(logits.action_positions, action_tokens)
    update_all_parameters(loss)

# 推理时：自回归生成动作 token，再反量化为连续控制量
pred_tokens = generate_action_tokens(image, instruction)
robot_action = detokenize(pred_tokens, quantile_bounds)
execute(robot_action)
```

##### 方法细节

OpenVLA 的出发点是 VLA 范式已经被 RT-2 等模型证明有效，但关键系统仍然闭源：模型结构、数据配比、训练细节和部署代码都不可见。这使得研究者很难比较设计决策，也很难把通用 VLA 迁移到新的机器人平台。OpenVLA 的贡献不是提出复杂的新控制算法，而是给出一个可复现、可微调、可部署的开源 VLA 配方。

模型 backbone 选择 Prismatic-7B。它的视觉侧同时使用 SigLIP 和 DINOv2：SigLIP 提供语义对齐能力，DINOv2 提供更强的局部空间表征。二者输出拼接后经 projector 映射到语言模型嵌入空间，再作为视觉 token 送入 Llama 2 7B。这个选择针对机器人控制很关键，因为操控任务不仅要知道“是什么物体”，还要知道物体的位置、相对关系和可抓取区域。

动作建模是 OpenVLA 最核心的工程化设计。给定连续动作 \(a\in\mathbb{R}^{7}\)，每个维度单独离散化为 256 个 bin。论文不用全局 min/max，而用训练集该维度动作的 1% 和 99% 分位点作为边界：

$$
b_d=\text{clip}\left(\left\lfloor 256\cdot\frac{a_d-q_{1,d}}{q_{99,d}-q_{1,d}}\right\rfloor,0,255\right)
$$

这样可以降低异常动作值对 bin 宽度的影响，避免少量 outlier 让大部分正常动作挤在很窄的区间里。由于 Llama tokenizer 可新增 special token 数量不足，OpenVLA 直接覆盖词表中最少使用的 256 个 token，将它们作为动作 bin token。

训练目标仍是语言模型熟悉的 next-token prediction，但只在动作 token 位置计算损失：

$$
\mathcal{L}_{VLA}=-\sum_{t\in \mathcal{A}}\log p_\theta(y_t\mid y_{<t}, I, x)
$$

其中 \(\mathcal{A}\) 是动作 token 位置，\(I\) 是图像，\(x\) 是语言指令。直觉上，OpenVLA 把“控制机器人”改写为“在视觉语言上下文中生成动作字符串”，从而复用大模型训练基础设施。

数据方面，OpenVLA 从 Open X-Embodiment 中构建约 970k 条真实机器人演示轨迹，覆盖 WidowX、Google Robot 等不同 embodiment。论文的消融显示，OpenX 的数据多样性比单一 BridgeData V2 更能带来泛化能力；缺少大规模多场景预训练时，性能会明显下降。

部署与适配是 OpenVLA 区别于闭源 VLA 的另一重点。论文验证 LoRA 可以在单张 A100 上完成新任务微调，且只训练少量参数即可接近全量微调效果；量化推理可显著降低显存占用；远程 inference server 允许机器人端只发送观测并接收动作，减少本地算力要求。

> ⚠️ 注意：OpenVLA 当前主要支持单张图像观测，不直接建模长历史、多相机流或本体感知序列。这是它作为开放基线的清晰边界，也是后续 VLA 工作常见的扩展方向。

#### 🧪 练习题

```yaml
question: "OpenVLA 为什么将连续机器人动作离散成语言模型 token？"
options:
  - "为了让动作预测可以复用 VLM 的自回归 next-token prediction 训练框架"
  - "为了让机器人只输出自然语言解释，不再执行动作"
  - "为了避免使用图像编码器"
  - "为了将所有任务限制为单一机器人平台"
answer: 0
explain: "OpenVLA 将动作维度离散为 256 个 bin 并映射到 tokenizer token，使 VLM 可以像生成文本一样生成动作序列，并只在动作 token 上计算交叉熵损失。"
```
