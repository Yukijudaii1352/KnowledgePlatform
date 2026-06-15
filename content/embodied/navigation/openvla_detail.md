### OpenVLA — 开源视觉语言动作模型 (Open Vision-Language-Action Model)

```yaml
id: openvla
name: OpenVLA
full_name: "开源视觉语言动作模型 (Open Vision-Language-Action Model)"
year: "2024"
org: "Stanford/UCB"
paper_url: "https://openvla.github.io/"
category: "vla_model"
parent: "—"
motivation: "开源7B参数VLA端到端控制"
```

#### 📝 一句话总结

OpenVLA 提出一个 7B 参数开源视觉-语言-动作模型，把多机器人演示数据中的图像、语言指令和连续动作统一到 autoregressive VLM 中，为端到端机器人控制提供可复现的强基线。

#### 🎯 核心要点

- 基于 Prismatic VLM 和 Llama 2 语言模型，融合 DINOv2 与 SigLIP 视觉特征形成机器人可用视觉输入。
- 使用 Open-X Embodiment 约 970k 条真实机器人演示训练，覆盖多机器人、多任务和多视角数据。
- 将 7 维机器人动作离散化为语言模型词表中的 action token，由 LLM 自回归生成。
- 训练目标是 next-token prediction，把语言建模、视觉理解和动作预测统一成同一个序列建模问题。
- 以 7B 参数规模在多项任务上超过更大闭源 RT-2-X 55B，并支持 LoRA/量化微调。
- 局限是离散自回归动作逐 token 解码较慢，难以天然适配高频连续控制。

#### 🔬 深入细节

![OpenVLA 总览图](https://arxiv.org/html/2406.09246v1/x1.png)
*图：OpenVLA 将图像和语言输入送入 VLM，并把机器人动作作为特殊 token 自回归生成。*

```python
# OpenVLA 推理与训练伪代码
def train_openvla(batch):
    image_tokens = prismatic_vision_encoder(batch.images)  # DINOv2 + SigLIP
    prompt_tokens = tokenize(batch.language_instruction)
    action_tokens = discretize_actions(batch.actions)      # 连续动作 -> token bins
    seq = concat(prompt_tokens, image_tokens, action_tokens)
    loss = next_token_cross_entropy(model(seq[:-1]), seq[1:])
    update(model, loss)

def act_openvla(obs_image, instruction):
    z_img = prismatic_vision_encoder(obs_image)
    tokens = tokenize(instruction)
    y = autoregressive_decode(model, tokens, z_img, max_action_tokens=7)
    action = denormalize(undiscretize(y))
    return action
```

OpenVLA 的核心选择是把机器人控制写成 VLM 的序列预测问题。输入由图像 \(o_t\) 和语言指令 \(\ell\) 组成，输出是动作 \(a_t\)。模型把连续动作的每个维度离散到若干 bin，再映射到词表 token，因此训练目标可写作：

$$
\mathcal{L}_{\text{NTP}}(\theta)=
-\sum_{i=1}^{m}\log p_\theta(y_i \mid y_{<i}, \ell, o_t),
$$

其中 \(y_i\) 是动作 token 序列。这个设计最大化复用了大语言模型的自回归能力：动作不再需要单独的 diffusion head 或回归头，而是作为“机器人语言”被生成。

视觉部分采用 Prismatic VLM 路线，将 DINOv2 的空间/几何特征和 SigLIP 的语义对齐特征融合，再投影到 LLM token 空间。这样做的直觉是，机器人操作既需要知道“这是什么物体”，也需要知道“它在图像中的哪个位置、边缘和姿态如何”。融合视觉编码器比单一 CLIP 式特征更适合抓取、放置和接触任务。

训练流程依赖大规模跨具身数据。Open-X Embodiment 中不同机器人动作维度、坐标系和控制频率并不完全一致，OpenVLA 通过归一化、动作维度适配和统一 token 化，把它们放进同一个 VLA 训练管线。推理时，模型接收当前 RGB 观测和语言目标，生成一段动作 token，再反离散化、反归一化为机器人控制命令。

与 RT-1/RT-2 一类模型相比，OpenVLA 的重要意义是开源和可微调：社区可以检查数据处理、模型权重和微调策略，并在消费级 GPU 上用 LoRA 或量化适配新任务。但它也暴露了第一代 VLA 的典型瓶颈：动作 token 的自回归解码需要逐维输出，若每个控制周期都要生成多个 token，则延迟会成为真实机器人高频控制的限制。

> 💡 关键：OpenVLA 的贡献不是发明新的控制器，而是把大规模 VLM 训练范式开放地迁移到机器人动作预测。

#### 🧪 练习题

```yaml
question: "OpenVLA 如何把连续机器人动作接入语言模型？"
options:
  - "把动作离散化为 action token，并用 next-token prediction 自回归生成"
  - "只输出自然语言计划，不输出低层动作"
  - "使用独立 MPC 求解器完全替代神经网络"
  - "把每个动作维度转换成图像像素"
answer: 0
explain: "OpenVLA 将连续动作归一化、离散化并映射到词表 token，使动作预测可由 LLM 的自回归损失训练。"
```
