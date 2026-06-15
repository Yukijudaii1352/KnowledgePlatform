### Zebra-CoT — 交错视觉语言推理数据集 (Zebra Chain-of-Thought Dataset)

```yaml
id: zebra_cot
name: Zebra-CoT
full_name: "交错视觉语言推理数据集 (Zebra Chain-of-Thought Dataset)"
year: "2025"
org: "Meta"
paper_url: "https://arxiv.org/abs/2507.16746"
category: "frontier_2026"
parent: "visual_thoughts"
motivation: "交错视觉语言推理数据，训练基础"
```

#### 📝 一句话总结

Zebra-CoT 构建了一个包含 182,384 条图文交错 reasoning trace 的大规模 Visual CoT 数据集，覆盖科学、2D/3D 视觉推理和策略游戏等 18 个领域，用高质量中间图像-文本链解决视觉 CoT 缺少训练数据的问题。

#### 🎯 核心要点

- **大规模 interleaved Visual CoT 数据**：182,384 条逻辑连贯的文本-图像交错推理轨迹
- **覆盖 18 个领域、50+ 任务**：科学推理、2D 视觉推理、3D 视觉推理、视觉逻辑与策略游戏
- **四大任务族**：Scientific Reasoning、2D Visual Reasoning、3D Visual Reasoning、Visual Logic & Strategic Games
- **面向原生视觉 CoT 训练**：训练模型在推理过程中生成中间图像，而不是只输出文本解释
- **Anole-7B 与 Bagel-7B 微调验证**：Anole-7B 在测试集提升约 +12%，标准 VLM benchmark 最高提升约 +13%
- **开放数据与模型**：发布 Hugging Face 数据集和 Bagel-Zebra-CoT 模型，支持后续 visual reasoning 研究

#### 🔬 深入细节

##### 核心示意图

![Zebra-CoT 数据组成](https://github.com/multimodal-reasoning-lab/Bagel-Zebra-CoT/raw/main/assets/zebra_cot_datacard.png)
*图：Zebra-CoT 数据集覆盖科学、2D、3D、视觉逻辑与策略游戏四大类任务。*

##### 动机与背景

Visual CoT 的目标是让模型像人一样在解决复杂问题时画图、标注、移动物体或构造中间视觉状态。但训练这类模型有两个现实困难：第一，现成模型的 visual CoT 能力较弱，用它们做强化学习冷启动很不稳定；第二，高质量图文交错推理数据稀缺，尤其缺少“中间图像确实服务于推理”的样本。

Zebra-CoT 的定位不是提出一个新模型结构，而是补齐训练基础设施。它把任务设计成天然需要视觉辅助的形式，让每个样本包含问题图像、文本思考步骤、中间视觉结果和最终答案，训练模型学会何时生成视觉中间状态以及如何让它推动后续推理。

##### 示例与数据形态

![Bagel-Zebra-CoT 推理示例](https://github.com/multimodal-reasoning-lab/Bagel-Zebra-CoT/raw/main/assets/bagel-cot-example.png)
*图：模型先删除圆柱体、再加入红色球体，逐步生成中间图像并给出答案。*

一个 Zebra-CoT 样本可以抽象为：

$$D_i=(x_0,\;q,\;(t_1,x_1),(t_2,x_2),...,\;a)$$

其中 \(x_0\) 是初始图像，\(q\) 是问题，\(t_k\) 是第 \(k\) 步文本 rationale，\(x_k\) 是对应中间图像，\(a\) 是最终答案。与普通 CoT 数据相比，Zebra-CoT 的关键在于 \(x_k\) 不是装饰图，而是会改变或显式呈现推理状态。

例如在 2D 物体操作任务中，文本步骤“Remove all cylinders”对应一张已删除圆柱体的中间图；下一步“Add 1 red sphere”对应再加入红球的图。最终答案依赖这些视觉状态的逐步更新。

##### 数据构建流程

```python
# Zebra-CoT 数据构建伪代码
def build_zebra_cot(task_spec):
    initial_state = sample_problem_state(task_spec)
    question, answer_plan = create_question_and_plan(initial_state, task_spec)

    trace = []
    state = initial_state
    for step in answer_plan:
        text_thought = render_text_rationale(step, state)
        state = apply_visual_operation(state, step)
        reasoning_image = render_state_as_image(state)
        trace.append((text_thought, reasoning_image))

    final_answer = compute_answer(state, question)

    if verify_trace_consistency(initial_state, question, trace, final_answer):
        return {
            "image": initial_state.image,
            "question": question,
            "interleaved_trace": trace,
            "answer": final_answer,
        }
```

实际构建中，不同任务族使用不同生成器或验证器。例如几何、物理、图算法等科学任务强调符号约束和图形一致性；视觉搜索、拼图、关系推理强调图像状态变化；3D embodied/robot planning 强调空间与动作链；棋类、Connect Four、Tetris、RPM 等强调规则推演。

##### 任务覆盖

Zebra-CoT 特别选择“画图有价值”的任务，而不是任意 VQA：

- **Scientific Reasoning**：几何、物理、化学、图算法、竞赛编程等，需要公式、图形或状态转移辅助推理
- **2D Visual Reasoning**：视觉搜索、jigsaw puzzle、文本/文档搜索、关系推理、通用 VQA
- **3D Visual Reasoning**：具身 CoT、多跳物体计数、机器人规划
- **Visual Logic & Strategic Games**：ARC-AGI、Chess、Checkers、Maze、RPM、Tetris、Connect Four、Ciphers 等

这种任务分布让模型不仅学习“描述图像”，还学习“通过生成/修改图像推进推理”。

##### 训练与目标函数

微调 interleaved 模型时，可以把文本 token 与图像 token 放在同一序列中做自回归建模：

$$\mathcal{L}=-\sum_t \log p_\theta(y_t \mid y_{<t}, x_0, q)$$

其中 \(y_t\) 可能是文本 token，也可能是图像 tokenizer 的离散 image token。模型因此同时学习：

- 在什么位置生成 `<think>` 文本；
- 在什么位置生成中间图像；
- 中间图像如何反映上一步操作；
- 最终 `<answer>` 如何读取视觉状态并给出结果。

对于 Bagel/Anole 这类 any-to-any 模型，Zebra-CoT 可以直接作为 interleaved sequence 训练数据。对于只支持文本输出的 VLM，则可把中间图像转成描述或引用，但会损失 Zebra-CoT 的核心优势。

##### 与传统 CoT 数据的区别

| 数据类型 | 中间步骤 | 是否改变视觉状态 | 适合训练的能力 |
|---|---|---|---|
| 文本 CoT | 文本 rationale | 否 | 语言推理、解释 |
| Visual CoT caption 数据 | 图像描述 + 文本 | 通常否 | 视觉信息提取 |
| Zebra-CoT | 文本 + 中间图像 | 是 | 原生图文交错推理、视觉状态更新 |

> 💡 关键：Zebra-CoT 的价值在于让模型看到“中间图像如何服务于下一步推理”，这比只给最终答案或只给文本解释更接近 visual thinking 的训练信号。

##### 效果与意义

论文用 Anole-7B 和 Bagel-7B 验证数据集效果。Anole-7B 微调后在 Zebra-CoT 测试集上提升约 +12%，在标准 VLM benchmark 上最高带来约 +13% 的增益；Bagel-7B 则能生成更自然的图文交错视觉推理链。

这说明 Zebra-CoT 不只是 benchmark，也能作为训练集提升模型的 multimodal reasoning 能力。它对后续 Visual Thoughts、COVT、Latent Sketchpad 等路线的意义在于：提供了可监督的图文交错推理轨迹，让模型先学会“何时需要视觉中间态”，再进一步用 RL 或 latent token 方法优化。

#### 🧪 练习题

```yaml
question: "Zebra-CoT 相比普通文本 CoT 数据集的核心区别是什么？"
options:
  - "只包含最终答案，不包含任何推理过程"
  - "包含逻辑连贯的文本-图像交错推理轨迹，中间图像会显式推进视觉状态"
  - "只用于 OCR 识别，不涉及复杂推理"
  - "要求模型在推理阶段调用固定外部检测器"
answer: 1
explain: "Zebra-CoT 的每条样本包含 interleaved text-image trace，中间图像是推理状态的一部分，用于训练模型原生执行 Visual CoT。"
```
