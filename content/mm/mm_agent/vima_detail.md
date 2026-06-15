### VIMA

```yaml
id: vima
name: VIMA
full_name: "多模态提示机器人 (VIMA)"
year: "2023"
org: "NVIDIA"
paper_url: "https://arxiv.org/abs/2210.03094"
category: "embodied"
parent: "rt2"
motivation: "多模态提示词驱动的任务规范"
```

#### 📝 一句话总结

VIMA 提出用多模态提示统一描述机器人操作任务，将语言、目标图像、物体图像和视频示范交错成 prompt，并用 Transformer 自回归输出动作，解决不同机器人任务需要不同任务接口和策略架构的问题。它把机器人任务规范从单一语言指令扩展为更表达力强的 multimodal prompt。

#### 🎯 核心要点

- **多模态 prompt 任务接口**：文本与图像/视频帧交错，可表达语言指令、视觉目标、单样本模仿、视觉约束和视觉推理
- **VIMA-Bench**：基于 Ravens 模拟器构建 17 类任务、600K+ expert trajectories 和四级泛化评测协议
- **对象中心视觉表示**：用检测器把场景图像解析成对象 token，每个对象包含边界框位置和裁剪图像特征
- **Transformer 编码-解码架构**：T5 编码 prompt，因果 Transformer decoder 通过交替 self-attention / cross-attention 生成动作
- **自回归动作建模**：每一步基于 prompt、当前观察和历史动作预测机器人控制动作
- **可扩展与数据高效**：训练 2M 到 200M 参数模型，在最难零样本泛化设置下相对替代方案最高约 2.9 倍成功率

#### 🔬 深入细节

##### 框架总览

![VIMA 架构示意图](https://ar5iv.labs.arxiv.org/html/2210.03094/assets/x3.png)
*图：VIMA 使用预训练 T5 编码多模态 prompt，并用带 cross-attention 的因果 Transformer 控制器根据观察和历史动作生成机器人动作。*

##### 算法流程

```python
# VIMA 训练/推理核心流程
def encode_multimodal_prompt(prompt):
    prompt_tokens = []
    for segment in prompt:
        if segment.type == "text":
            prompt_tokens += t5_text_encoder(segment.text)
        elif segment.type in ["scene_image", "object_image", "video_frame"]:
            objects = object_detector(segment.image)
            for obj in objects:
                box_feat = box_mlp(normalize(obj.box))
                crop_feat = vit_encoder(obj.crop)
                prompt_tokens.append(project(concat(box_feat, crop_feat)))
    return prompt_tokens

def vima_policy(prompt, observations, action_history):
    prompt_tokens = encode_multimodal_prompt(prompt)
    obs_tokens = encode_object_tokens(observations[-1])

    # decoder 交替 self-attention 处理历史，cross-attention 读取 prompt
    action = transformer_decoder.generate(
        prompt_tokens=prompt_tokens,
        observation_tokens=obs_tokens,
        action_history=action_history,
    )
    return action

for trajectory in expert_data:
    prompt = trajectory.prompt
    for t in range(len(trajectory)):
        pred = vima_policy(prompt, trajectory.obs[:t+1], trajectory.actions[:t])
        loss = action_loss(pred, trajectory.actions[t])
        update(loss)
```

##### 方法细节

**1. 动机与背景**

机器人任务规范非常分散：有的任务用自然语言描述，有的给目标图像，有的给视频示范，有的要求避开某个视觉区域。传统方法往往为不同任务接口设计不同模型和数据管线，难以组合。VIMA 的核心观察是：这些任务都可以写成“多模态 prompt”，即一段交错的文本和视觉 token。

例如，视觉目标任务可以写成“把当前物体摆成 <goal image> 的样子”；单样本模仿可以写成“跟随 <frame1>, <frame2>, ... 的轨迹”；视觉约束可以写成“不要进入 <image> 表示的区域”。统一接口之后，训练目标也可以统一成序列建模。

**2. VIMA-Bench**

VIMA-Bench 基于 Ravens tabletop manipulation simulator 构建。它包含 17 类代表性任务，每类任务可程序化生成大量物体、纹理和布局组合，总计 600K+ 专家轨迹。评测协议有四个等级，从训练分布内随机布局到组合变化、未见对象、未见任务，逐步增加零样本泛化难度。

这种设计让研究者能系统测量模型是否真正理解 prompt 中的视觉概念，而不是只记住固定任务模板。

**3. 对象中心 tokenization**

VIMA 不直接把整张图像作为密集 patch 输入控制器，而是先用检测器解析场景对象。每个对象 token 包含两部分：归一化边界框位置和裁剪图像特征。边界框可表示为：

$$
b=[x_{center},y_{center},h,w]
$$

裁剪图像经过 ViT 编码，位置经过 MLP 编码，两者拼接后投影到 Transformer embedding 维度。对象中心表示减少了背景噪声，也让模型更容易对“目标物体”“同纹理物体”“容器”等实体做绑定。

**4. Prompt 编码与动作解码**

文本部分使用预训练 T5 的 tokenizer 和 embedding；视觉部分转成对象 token；整个 prompt 被编码后作为条件。控制器是因果 Transformer decoder，使用 self-attention 处理历史观察和动作，用 cross-attention 读取 prompt：

$$
p(a_{1:T}\mid P,o_{1:T})=\prod_{t=1}^{T}p_\theta(a_t \mid P,o_{\le t},a_{<t})
$$

这里 \(P\) 是多模态 prompt，\(o_t\) 是对象化观察，\(a_t\) 是当前步动作。VIMA 的动作通常对应 tabletop pick-and-place 操作中的连续位姿参数，训练时用模仿学习拟合专家轨迹。

**5. 与 RT-1 / RT-2 的区别**

RT-1 和 RT-2 的任务主要通过自然语言指令给出；VIMA 更强调“任务规范本身可以是多模态的”。RT-2 将动作写成文本 token 来复用 VLM 预训练，VIMA 则将任务描述写成多模态 prompt 来统一多种机器人任务。两者都体现了序列模型思想，但切入点不同：RT-2 统一动作输出格式，VIMA 统一任务输入格式。

> 💡 关键：VIMA 的强项是 prompt 表达力。只靠一句自然语言很难精确指定新物体、新轨迹或视觉约束，而多模态 prompt 可以直接把这些信息放进模型输入。

#### 🧪 练习题

```yaml
question: "VIMA 中多模态 prompt 的主要作用是什么？"
options:
  - "只用来生成图像 caption"
  - "把语言、目标图像、视频示范等任务规范统一成一个序列输入接口"
  - "替代所有机器人动作，不再需要控制器"
  - "把真实机器人数据转换成网页 DOM"
answer: 1
explain: "VIMA 的核心是用文本和视觉 token 交错的 prompt 表达多类机器人任务，再由同一个 Transformer 控制器根据 prompt 和观察输出动作。"
```
