### RT-2 (Robotics Transformer 2)

```yaml
id: rt2
name: RT-2
full_name: Robotics Transformer 2
year: "2023"
org: Google DeepMind
paper_url: https://arxiv.org/abs/2307.15818
category: vla
parent: RT-1, PaLI-X, PaLM-E
motivation: 将视觉语言模型（VLM）直接转化为机器人控制策略，利用大规模网络预训练知识实现泛化能力涌现
```

#### 📝 一句话总结

RT-2 将视觉语言模型（PaLI-X / PaLM-E）通过将动作离散化为文本 token 的方式进行 co-fine-tuning，使 VLM 直接输出机器人动作，无需专门的动作头，从而借助大规模网络数据预训练知识在未见过的任务、物体和场景中展现出 emergent 泛化能力。

#### 🎯 核心要点

- 提出了 VLA（Vision-Language-Action）范式：将机器人动作表示为文本 token，使 VLM 在保留网络知识的同时输出动作
- 动作 tokenization：将连续动作（6-DoF 末端执行器位移）离散化为 256 个 bin，映射到模型词汇表中保留的低频 token（PaLI-X 用 8 个独立整数 token 表示，PaLM-E 覆盖 256 个保留 token）
- 基于两个 VLM 骨干：PaLI-X（55B，视觉语言模型）和 PaLM-E（12B，具身语言模型），在机器人数据与原网络数据上 co-fine-tuning
- Co-fine-tuning 策略：混合机器人演示数据与原始 VLM 训练数据（如 PaLI-X 的图像描述/问答数据），防止灾难性遗忘
- 输出约束（output constraint）：推理时强制模型只从合法动作 token 中采样，确保输出有效动作
- 三分类 emergent 能力：符号理解（Symbol Understanding）、推理（Reasoning）、人类识别（Human Recognition），均超越仅用机器人数据训练的基线
- Chain-of-Thought（CoT）变体：将 CoT 推理步骤作为额外文本 token 介入，使模型先推理再输出动作，在涉及推理的任务上大幅提升
- 55B 模型通过云端 TPU 推理，频率 1-3Hz，离线批量执行方式

#### 🔬 深入细节

![RT-2 架构概览](https://arxiv.org/html/2307.15818v2/assets/rt2_overview.png)
*图：RT-2 框架图。左侧：预训练 VLM（PaLI-X 或 PaLM-E）在图像和文本输入上训练；右侧：将机器人数据转换为文本-动作 token 序列，与原始 VLM 数据混合进行 co-fine-tuning。推理时，输入图像和任务指令，模型直接输出动作 token 序列。*

##### 方法动机

传统机器人学习方法通常从头训练或仅在机器人数据上微调，缺乏利用互联网规模数据中蕴含的语义知识与视觉理解的能力。RT-1（Brohan et al., 2022）虽然展示了 Transformer 在机器人控制中的有效性，但其动作输出仍依赖专门的动作头（action head），无法直接利用大规模预训练模型的知识。RT-2 的核心洞察是：**动作可以像文本一样被 tokenize**——将连续动作空间离散化为有限 token，使 VLM 无需架构修改即可同时处理视觉、语言和动作。这桥接了互联网预训练知识与物理世界的操作需求。

##### 动作 Tokenization

对于 6 自由度末端执行器动作（位置变化 Δx, Δy, Δz, 旋转变化 Δroll, Δpitch, Δyaw, 夹爪开度 g），RT-2 采用均匀离散化：

- 每个动作维度被离散化为 \\(N = 256\\) 个 bin，将连续值映射到最近的 bin 索引 \\(a_i \\in \\{0, ..., 255\\}\\)
- **PaLI-X 方案**：对每个动作维度使用独立的离散 token（共 8 个整数 token，分别是 Δpos, Δrot, gripper），这些 token 在 PaLI-X 词汇表中有自然对应的数值 token；例如动作值"125"被分解为独立的数字 token "1", "2", "5"，模型通过已有词汇表中的数字 token 来表示动作
- **PaLM-E 方案**：PaLM-E 的词汇表相对紧凑，RT-2 保留 256 个原本最不常用的 token，将其"重映射"为动作 token——即用 1 个 token 直接覆盖一个动作 bin，总共 256 个动作 token 被叠加到词汇表中存在但极少使用的 token 上

> 💡 关键：PaLI-X 的方案利用了视觉语言模型中已有的数字 token 语义（"125"对模型有数值含义），而 PaLM-E 的方案更具灵活性但依赖覆盖低频 token。前者受益于模型对数字的已有理解，后者在 token 效率上更优。

##### Co-fine-tuning 策略

直接将 VLM 在机器人数据上微调会导致**灾难性遗忘**——模型失去原有的视觉理解和语言能力。RT-2 采用 co-fine-tuning：

1. **混合批次**：每个训练批次中按比例混合机器人演示数据和原始 VLM 训练数据（如 PaLI-X 的图像描述、VQA 数据）
2. **统一格式**：两种数据都被转换为文本 token 序列。机器人数据的格式为 `[image] Q: what action should the robot take? A: Δx=128 Δy=150 ...`，原 VLM 数据保持其问答格式
3. **联合优化**：使用标准的下一个 token 预测损失（next-token prediction loss）同时优化两种数据，无需额外的辅助损失
4. **数据比例**：论文通过实验确定机器人数据与原始数据的比例，平衡技能习得与知识保留

这类似于 InstructGPT/ChatGPT 的指令微调混合策略——通过在微调中保留原始分布防止模型退化。

##### 输出约束（Output Constraint）与推理

RT-2 在推理时面临一个关键问题：模型可能生成不代表有效动作的 token 序列。解决方法：

1. **格式约束**：预定义动作输出的合法格式（如 8 个数字 token + EOS），模型在生成时被限制只能采样符合该格式的 token
2. **范围约束**：每个动作维度的 token 必须在 [0, 255] 范围内；若模型尝试生成越界 token，其概率被置零，按约束重采样
3. **推理效率**：55B 模型以 1-3Hz 频率通过云端 TPU 推理，控制周期约 300-1000ms——这意味着 RT-2 倾向于离线批处理式执行，而非高频实时控制

##### CoT（Chain-of-Thought）变体

为进一步提升模型在涉及多步推理、语义理解的任务上的表现，RT-2 引入了 CoT 变体：

```
[image] Q: Should I move the coke can to the person with glasses?
A: Plan: 1. Identify the coke can.
   2. Identify the person with glasses.
   3. Move the coke can to that person.
Action: Δx=100 Δy=50 ... Gripper=1
```

模型首先输出自然语言推理步骤（Plan），再输出动作。Plan token 与 Action token 在同一个自回归序列中生成。CoT 微调需要带有 Plan 标注的演示数据——这些 Plan 可以通过 LLM 自动标注或人工标注获取。在涉及符号推理、场景理解的任务中，CoT 变体比标准 RT-2 提升 25% 以上。

##### Emergent 能力三分类

RT-2 的核心贡献在于证明了 VLA 模型展现出**仅靠机器人数据训练无法获得的 emergent 能力**，论文将其分为三类：

1. **符号理解（Symbol Understanding）**：模型理解符号与物理对象的关联——如将箭头指向的物体拿给用户，或将印有特定标志的物体放入对应垃圾桶。这要求模型将视觉符号语义映射到操作行为
2. **推理（Reasoning）**：涉及多步骤逻辑——如"把不在盘子里的水果放进盘子"，需模型首先理解场景中有哪些水果、哪些在盘子外，然后执行操作。这类能力直接受益于 VLM 预训练中习得的常识推理
3. **人类识别（Human Recognition）**：基于视觉特征识别人——如"将可乐递给戴眼镜的人"，要求模型识别人脸特征（眼镜、帽子等）并匹配到动作目标。此类能力源自 VLM 在大规模图像-文本数据中学习的人物属性理解

> ⚠️ 注意：这些 emergent 能力在仅用机器人数据训练的 RT-1 或从头训练的 VLA 中几乎不存在（接近随机水平），证明了大规模视觉语言预训练知识向机器人操作泛化的可行性。

##### 算法伪代码

```python
# RT-2 Co-fine-tuning 伪代码
def rt2_co_fine_tuning(vlm, robot_data, web_data, ratio=0.5):
    """混合机器人数据和网络数据联合训练"""
    for batch in training_loader:
        # 按比例采样
        if random() < ratio:
            # 机器人数据: image -> text_instruction -> action_tokens
            img, instruction, action = sample(robot_data)
            action_tokens = discretize_actions(action, bins=256)
            input_seq = f"[IMG] Q: {instruction} A: "
            target_seq = action_tokens  # e.g., "128 150 100 50 20 10 1"
        else:
            # 原 VLM 数据: image captioning, VQA 等
            img, input_seq, target_seq = sample(web_data)
        
        # 拼接并预测下一个 token
        full_seq = concat(img_tokens, input_seq, target_seq)
        loss = cross_entropy(vlm(full_seq[:-1]), full_seq[1:])
        loss.backward()
        optimizer.step()

def inference_rt2(vlm, img, instruction):
    """推理时输出约束"""
    prompt = f"[IMG] Q: {instruction} A:"
    tokens = []
    for _ in range(8):  # 8 个动作维度
        logits = vlm(prompt + tokens)
        # 输出约束：只允许合法动作 token
        logits = apply_output_constraint(logits, token_idx=len(tokens))
        next_token = sample(logits)
        tokens.append(next_token)
    actions = decode_actions(tokens)
    return actions

def chain_of_thought_inference(vlm, img, instruction):
    """CoT 推理变体"""
    prompt = f"[IMG] Q: {instruction} A: Plan:"
    plan_tokens = vlm.generate(prompt, stop="Action:")
    prompt += plan_tokens + " Action:"
    action_tokens = constrained_sample(vlm, prompt, num_tokens=8)
    return decode_actions(action_tokens)
```

##### 与相关工作的区别

| 方法 | 动作输出方式 | 预训练数据利用 | Emergent 能力 |
|------|-------------|---------------|--------------|
| RT-1 | Transformer + 专用动作头 | 无 | 无 |
| GATO (Reed et al., 2022) | 多任务 token 统一，但动作离散化有限 | 多模态预训练 | 有限 |
| PaLM-E (Driess et al., 2023) | 视觉语言模型 + 动作规划输出文本，需下游执行 | 大规模 VLM + 具身数据 | 文本规划层 |
| **RT-2** | **VLM 直接输出动作 token** | **VLM 预训练 + co-fine-tuning** | **三分类 emergent** |

RT-2 的关键创新在于：不需要单独的动作规划层或动作头——VLM 的文本输出头直接成为动作输出通道，这使得网络预训练知识的迁移路径最短。

##### 局限性

1. **无法学习新运动技能**：RT-2 只能输出已有的离散化动作（如末端位移），无法学习复杂灵巧操作或动态运动技能（如跑跳、工具精细化使用）
2. **推理频率限制**：55B 模型的云端推理仅达 1-3Hz，不适用于需要高频闭环控制的任务
3. **依赖于演示数据的动作空间**：动作空间的粒度（256 bin）和类型（绝对/相对位移）由训练数据决定，灵活性受限

#### 🧪 练习题

```yaml
question: "RT-2 的 co-fine-tuning 策略中，混合原始 VLM 训练数据的主要目的是什么？"
options:
  - "增加训练数据量以提高模型准确率"
  - "防止模型在机器人数据上微调时发生灾难性遗忘"
  - "提升推理速度"
  - "减少动作 token 的数量"
answer: 1
explain: "Co-fine-tuning 中混合原始 VLM 数据（如图像描述、VQA）是为了保留模型在大规模预训练中习得的视觉理解和常识推理能力，防止仅在机器人数据上微调导致的灾难性遗忘，这正是 RT-2 emergent 能力的来源。"
```