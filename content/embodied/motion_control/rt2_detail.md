### RT-2：Vision-Language-Action Models — 将网络知识迁移至机器人控制

```yaml
id: rt2
name: RT-2
full_name: "Robotics Transformer 2 (Vision-Language-Action Models)"
year: "2023"
org: "Google DeepMind"
paper_url: "https://arxiv.org/abs/2307.15818"
category: "vision-language-action"
parent: "RT-1, PaLI-X, PaLM-E"
motivation: "将预训练视觉-语言模型（VLM）直接微调为机器人策略，通过动作文本化实现 web 知识到机器人控制的零样本迁移"
```

#### 📝 一句话总结

RT-2 提出了 Vision-Language-Action (VLA) 模型范式，将预训练的大规模视觉-语言模型（PaLI-X、PaLM-E）通过**动作 token 化 + 协同微调**直接转化为机器人策略，使机器人继承 web 规模预训练的语义理解与推理能力，在未见物体、场景和指令上实现约 **2× 的泛化性能提升**。

#### 🎯 核心要点

- **VLA 范式**：首次将 VLM 端到端微调为可直接输出机器人动作的策略模型，无需额外任务特定头
- **动作 token 化**：将 8 维连续动作（6-DoF 末端执行器位移 + 夹爪开合 + 终止标志）离散化为 256 个 bin，表示为整数字符串 token
- **两种 VLM 骨干**：基于 PaLI-X（5B/55B 参数）和 PaLM-E（12B 参数）分别构建 RT-2-PaLI-X 和 RT-2-PaLM-E
- **协同微调（Co-fine-tuning）**：同时使用原始 web VQA 数据和机器人演示数据进行微调，防止灾难性遗忘
- **输出约束解码**：推理时限制 token 采样空间仅包含合法动作 token，确保输出始终为有效机器人动作
- **涌现能力**：继承 VLM 的符号理解、语义推理、多语言理解和人物识别能力，在涌现任务上达到基线 3× 以上的成功率
- **链式思维（Chain-of-Thought）**：通过数据增强让模型先输出自然语言计划再输出动作，展示了规划与控制的统一
- **大规模评估**：在真实机器人上进行超过 6000 次评估试验，覆盖已见任务、未见任务和涌现能力三大类别

#### 🔬 深入细节

##### 核心架构示意图

![RT-2 整体架构](https://ar5iv.labs.arxiv.org/html/2307.15818/assets/x1.png)
*图 1：RT-2 将视觉-语言模型（VLM）转化为视觉-语言-动作模型（VLA）。模型接收机器人摄像头图像和自然语言指令，直接输出以文本 token 表示的机器人动作。*

![RT-2 动作 token 化与训练流程](https://ar5iv.labs.arxiv.org/html/2307.15818/assets/x2.png)
*图 2：动作 token 化方案。连续动作被离散化为 256 个 bin 并表示为整数字符串，与自然语言 token 共享同一词表空间。*

##### 算法伪代码

```python
# RT-2 训练与推理伪代码

# === 动作 token 化 ===
def tokenize_action(action_vector):
    """将 8 维连续动作转为文本 token 序列"""
    # action_vector: [Δx, Δy, Δz, Δroll, Δpitch, Δyaw, gripper, terminate]
    tokens = []
    for dim in action_vector:
        # 将连续值均匀离散化到 [0, 255]
        bin_idx = int((dim - min_val) / (max_val - min_val) * 255)
        bin_idx = clip(bin_idx, 0, 255)
        tokens.append(str(bin_idx))  # 转为整数字符串
    return " ".join(tokens)  # e.g., "128 64 200 132 100 98 255 1"

# === 协同微调 ===
def co_fine_tune(vlm, web_data, robot_data):
    """在 web VQA 数据和机器人数据上联合微调"""
    for batch in interleave(web_data, robot_data):
        if batch.source == "web":
            # 标准 VQA: image + question → answer
            loss = cross_entropy(vlm(batch.image, batch.question), batch.answer)
        else:
            # 机器人: image + instruction → action tokens
            action_str = tokenize_action(batch.action)
            loss = cross_entropy(vlm(batch.image, batch.instruction), action_str)
        optimizer.step(loss)

# === 受限解码推理 ===
def inference(vlm, image, instruction):
    """推理时限制输出为合法动作 token"""
    valid_tokens = set(range(0, 256))  # 仅允许 0-255 的整数 token
    output_tokens = []
    for step in range(8):  # 8 个动作维度
        logits = vlm.next_token_logits(image, instruction, output_tokens)
        # 将非法 token 的 logits 设为 -inf
        for t in range(vocab_size):
            if t not in valid_tokens:
                logits[t] = -float('inf')
        next_token = argmax(logits)
        output_tokens.append(next_token)
    return detokenize_action(output_tokens)
```

##### 方法详解

**动机与背景：为什么需要 VLA？**

传统机器人学习方法面临严重的数据瓶颈：机器人演示数据的采集成本极高（RT-1 数据集由 13 台机器人耗时 17 个月收集），且覆盖的物体、场景和指令极为有限。与此同时，视觉-语言模型（VLM）已在 web 规模数据上学到了丰富的语义知识——它们理解数千种物体、场景关系和抽象概念。RT-2 的核心洞察是：**如果能让 VLM 直接输出机器人动作，就能将这些 web 知识零成本迁移到机器人控制中**。此前的工作（如 SayCan、PaLM-E）仅将 LLM/VLM 用作高层规划器，仍需独立的低层策略；RT-2 则首次实现了感知、理解、推理与控制的端到端统一。

**核心机制：动作 token 化与 VLM 复用**

RT-2 的关键技术创新在于将机器人动作表示为自然语言 token，从而复用 VLM 的整个架构和训练流程。具体而言，每个时间步的动作是一个 8 维向量：

$$\mathbf{a} = [\Delta x, \Delta y, \Delta z, \Delta \text{roll}, \Delta \text{pitch}, \Delta \text{yaw}, \text{gripper}, \text{terminate}]$$

其中前 6 维为末端执行器的位移增量，第 7 维为夹爪开合状态，第 8 维为终止标志。每个连续维度被均匀离散化为 256 个 bin（即 \(b_i = \lfloor (a_i - a_{\min}) / (a_{\max} - a_{\min}) \times 255 \rfloor\)），然后将 bin 索引转为整数字符串。例如，一个动作可能被表示为 `"128 64 200 132 100 98 255 1"`。

对于 **PaLI-X** 骨干，这些整数字符串可以直接作为 token 使用，因为 PaLI-X 的词表本身包含数字 token。对于 **PaLM-E** 骨干，由于其词表中数字 token 的语义已被占用，RT-2 采用了一种巧妙的方案：**覆写词表中使用频率最低的 256 个 token**，将它们重新映射为动作 bin 索引。这样做既不影响模型在常见文本上的表现，又能无缝引入动作表示。

> 💡 **关键洞察**：动作 token 化的本质是将控制问题转化为"受限文本生成"问题。VLM 不需要任何架构修改——它只是在"回答一个特殊格式的问题"。

**协同微调策略**

简单地用机器人数据微调 VLM 会导致灾难性遗忘——模型会丢失预训练阶段学到的语义知识。RT-2 采用**协同微调（co-fine-tuning）**策略：在微调阶段同时混合原始 web 数据（VQA、图像描述等）和机器人轨迹数据。消融实验证实，co-fine-tuning 在泛化性能上显著优于纯机器人数据微调（fine-tuning only），而纯微调又远优于从头训练（training from scratch）。这表明 web 数据在微调阶段的持续参与对于保持语义泛化能力至关重要。

**推理与部署**

推理时，模型接收当前摄像头图像和自然语言指令，自回归地生成 8 个动作 token。为确保输出始终为合法动作，RT-2 在解码时施加**输出约束**：将所有非动作 token 的 logits 设为负无穷，使采样仅在有效动作空间内进行。55B 参数的 RT-2-PaLI-X 通过多 TPU 云服务实现 1-3 Hz 的推理频率；5B 版本可达约 5 Hz。尽管频率低于 RT-1 的实时速率，但对于桌面操作任务已足够。

**涌现能力与链式思维**

RT-2 展现了三类涌现能力，均未在机器人数据中出现过：

1. **符号理解**：执行 "move apple to 3"（理解数字符号）或 "push coke can on top of heart"（理解形状符号）
2. **语义推理**：执行 "move the apple to the cup with the same color"（视觉推理）、"move X near the sum of two plus one"（数学推理）、"mueve la manzana al vaso verde"（多语言理解）
3. **人物识别**：执行 "move the coke can to the person with glasses"

在涌现能力评估中，RT-2-PaLI-X 的平均成功率达到基线 RT-1 的 **3 倍以上**。

链式思维（Chain-of-Thought）变体通过数据增强引入 "Plan" 步骤：模型先生成自然语言计划（如 "Plan: pick rxbar chocolate"），再生成动作 token。这为将 VLM 规划器与低层策略统一到单一模型中提供了初步证据。

![涌现能力与消融实验结果](https://ar5iv.labs.arxiv.org/html/2307.15818/assets/figures/rt2_emergent_dm.png)
*图：RT-2 在符号理解、推理和人物识别等涌现任务上显著超越 RT-1 和 VC-1 基线。*

**模型规模与训练策略消融**

消融实验揭示了三个关键发现：

| 配置 | 泛化性能 |
|------|---------|
| 从头训练 5B | 极差（跳过 55B 评估） |
| 纯微调 5B | 中等 |
| 协同微调 5B | 良好 |
| 协同微调 55B | **最佳** |

$$\text{泛化性能排序: co-fine-tune 55B} > \text{co-fine-tune 5B} > \text{fine-tune 5B} \gg \text{from scratch 5B}$$

> ⚠️ **注意**：RT-2 不会习得新的运动技能——其物理操作能力仍限于机器人数据中出现过的技能分布。VLM 知识迁移的价值在于让已有技能能够泛化到新的语义场景中。

##### 与传统方法的对比

| 方法 | 参数量 | 预训练数据 | 动作表示 | 泛化能力 |
|------|--------|-----------|---------|---------|
| RT-1 | 35M | 无 | 离散化 token（专用头） | 基线 |
| VC-1 / R3M | ~100M | 视觉预训练 | 冻结特征 + 策略头 | 略优于 RT-1 |
| MOO | ~35M | 无 | 同 RT-1 | 与 RT-1 相当 |
| **RT-2-PaLI-X** | **55B** | **web VQA + 图像** | **文本 token（共享词表）** | **~2× RT-1** |
| **RT-2-PaLM-E** | **12B** | **web 文本 + 图像** | **覆写 token** | **~2× RT-1** |

#### 🧪 练习题

```yaml
question: "RT-2 中 PaLM-E 骨干如何将动作 bin 索引映射到词表中？"
options:
  - "在词表末尾追加 256 个新 token"
  - "直接使用词表中已有的数字 token（0-255）"
  - "覆写词表中使用频率最低的 256 个 token"
  - "使用独立的动作解码头，不经过词表"
answer: 2
explain: "PaLM-E 的数字 token 语义已被占用，因此 RT-2 选择覆写词表中最不常用的 256 个 token 来表示动作 bin 索引，既不影响常见文本生成，又能复用自回归解码框架。"
```