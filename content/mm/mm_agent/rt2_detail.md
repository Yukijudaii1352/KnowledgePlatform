### RT-2

```yaml
id: rt2
name: RT-2
full_name: "机器人Transformer 2 (RT-2)"
year: "2023"
org: "DeepMind"
paper_url: "https://arxiv.org/abs/2307.15818"
category: "embodied"
parent: "palm_e"
motivation: "VLA范式将动作表示为文本Token"
```

#### 📝 一句话总结

RT-2 提出 Vision-Language-Action (VLA) 范式，把机器人动作编码成文本 token，并将 Web 规模视觉语言模型与机器人轨迹共同微调，解决纯机器人数据难以带来语义泛化的问题。它让同一个模型既能继承 VLM 的视觉语言知识，又能直接输出可执行机器人动作。

#### 🎯 核心要点

- **动作即语言**：将连续机器人动作离散化后映射到已有 tokenizer 的保留 token，以文本序列形式训练和解码
- **VLA 模型族**：在 PaLI-X 和 PaLM-E 等预训练 VLM 上构建 RT-2-PaLI-X 与 RT-2-PaLM-E
- **动作空间设计**：包含 6-DoF 末端执行器位移/旋转、夹爪扩展和 episode termination，连续维度离散为 256 bins
- **Co-fine-tuning**：机器人轨迹数据与原始 Web 视觉语言任务共同微调，避免只在机器人数据上微调导致泛化退化
- **受限动作解码**：执行机器人任务时限制输出词表，只允许合法动作 token，保证可执行性
- **真实机器人规模评测**：约 6K 次真实评测，展示未见物体、符号、关系理解和简单语义推理能力
- **云端实时推理**：55B 模型通过多 TPU 云服务约 1-3 Hz 控制，5B 模型约 5 Hz

#### 🔬 深入细节

##### 框架总览

![RT-2 VLA 框架概览](https://ar5iv.labs.arxiv.org/html/2307.15818/assets/x1.png)
*图：RT-2 将机器人动作视为另一种语言，把动作 token 与互联网视觉语言数据一起训练，使 VLM 成为可执行策略。*

##### 算法流程

```python
# RT-2 co-fine-tuning
for batch in mixed_batches(robot_data, web_vl_data):
    if batch.type == "robot":
        image, instruction, continuous_action = batch

        # 1. 连续动作离散化
        bins = discretize_to_256_bins(continuous_action)

        # 2. 将每个 bin 映射为 action token，并拼成文本目标
        target_text = " ".join(action_token[b] for b in bins)

        # 3. 用 next-token objective 训练 VLM 输出动作文本
        loss = vlm.next_token_loss(image, instruction, target_text)
    else:
        image, text_prompt, text_answer = batch
        loss = vlm.next_token_loss(image, text_prompt, text_answer)

    update(loss)

# 机器人推理：限制解码词表为合法动作 token
def rt2_control(image, instruction):
    token_string = vlm.generate(
        image=image,
        prompt=instruction,
        allowed_tokens=ACTION_TOKEN_SET,
    )
    return decode_action_tokens(token_string)
```

##### 方法细节

**1. 动机与背景**

RT-1 已经证明大规模真实机器人数据可以训练通用动作策略，但它主要从机器人数据中学习。机器人数据昂贵、覆盖窄，很难包含“把物体放到数字 3 上”“拿起最小的物体”“选择适合作为工具的物品”这类开放语义。视觉语言模型在互联网图文数据上见过大量物体、符号和关系，但普通 VLM 只能输出文本，不能直接控制机器人。

RT-2 的核心想法是把动作也写成文本。只要机器人动作可以被 tokenizer 表示，预训练 VLM 就能用同一个 next-token loss 学会在机器人场景下输出动作 token。

**2. 动作 token 化**

机器人动作由多个维度组成，包括末端执行器平移、旋转、夹爪和终止信号。连续维度被均匀离散为 256 个 bins：

$$
b^d_t=\text{bin}(a^d_t), \quad b^d_t \in \{0,\ldots,255\}
$$

然后每个 bin 映射到一个保留文本 token，整个动作向量变成一个短文本序列：

$$
y_t=[\text{tok}(b_t^1),\ldots,\text{tok}(b_t^D)]
$$

训练目标仍是自回归语言建模：

$$
\mathcal{L}_{VLA}=-\sum_t\sum_j \log p_\theta(y_{t,j}^\* \mid I_t, x, y_{t,<j}^\*)
$$

其中 \(I_t\) 是当前图像，\(x\) 是语言指令。对 VLM 来说，动作 token 与普通词 token 在训练接口上没有差别。

**3. Co-fine-tuning 为什么重要**

如果只把预训练 VLM 在机器人轨迹上微调，模型会快速适配动作输出，但可能丢失 Web 数据带来的语义知识。RT-2 因此在同一训练过程中混合机器人数据和原始视觉语言任务，并提高机器人数据采样权重。这样模型一边学习低层动作分布，一边保持对开放世界物体、符号和关系的理解。

论文消融显示，co-fine-tuning 优于只微调机器人数据，也优于从头训练。直觉上，机器人数据告诉模型“如何动”，Web 数据维持模型“知道世界是什么”。

**4. 合法动作约束与实时控制**

标准 VLM 可能生成任意文本，但机器人执行需要固定格式动作。RT-2 在机器人任务解码时限制词表，只允许动作 token，从而保证输出可解析。对非机器人视觉语言任务，模型仍可输出普通自然语言。

由于模型最大达到 55B 参数，无法直接部署在机器人本地 GPU 上。论文使用云端 TPU 服务进行推理，真实机器人通过网络查询模型动作，55B 约 1-3 Hz，5B 约 5 Hz。这是把超大 VLM 用于闭环机器人控制的重要工程尝试。

**5. 与 PaLM-E 和 RT-1 的区别**

PaLM-E 主要输出文本计划或高层子目标，需要低层策略执行；RT-1 直接输出动作，但知识主要来自机器人数据。RT-2 处在两者之间：它继承 VLM 的语义知识，同时直接输出低层动作 token。这也是 VLA 范式的价值。

> 💡 关键：RT-2 的“动作即语言”让机器人控制第一次可以大规模复用互联网视觉语言预训练，而不是只依赖昂贵的机器人轨迹。

#### 🧪 练习题

```yaml
question: "RT-2 中 co-fine-tuning 的主要作用是什么？"
options:
  - "只用机器人数据从零训练一个小模型"
  - "同时训练机器人动作数据和 Web 视觉语言任务，使模型既会行动又保留语义知识"
  - "把所有动作都改成人类可读的自然语言解释"
  - "在推理时取消动作 token 的词表约束"
answer: 1
explain: "RT-2 混合机器人轨迹和原始视觉语言数据共同微调，避免模型只适配动作而丢失来自 Web 预训练的语义泛化能力。"
```
