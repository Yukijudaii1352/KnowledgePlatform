### Think or Not — 选择性推理 (Selective Reasoning via RL)

```yaml
id: think_or_not
name: Think or Not
full_name: "选择性推理 (Selective Reasoning via RL)"
year: "2026"
org: "Tsinghua"
paper_url: "https://proceedings.neurips.cc/paper_files/paper/2025/hash/a168b27492ec2eb7aa184815fa0cd046-Abstract-Conference.html"
category: "frontier_2026"
parent: "reason_rft"
motivation: "GRPO选择性推理，动态调整推理深度"
```

#### 📝 一句话总结

Think or Not 提出 TON 两阶段训练策略，让 VLM 先通过 Thought Dropout 学会“空思考”格式，再用 GRPO 自主探索何时跳过推理、何时展开推理，在保持或提升准确率的同时显著减少输出长度和训练/推理成本。

#### 🎯 核心要点

- **选择性推理目标**：模型不是总要长 CoT，而是先决定当前样本是否值得显式推理
- **Thought Dropout**：SFT 阶段随机把 reasoning trace 替换为空 thought，给模型建立 no-think 冷启动格式
- **Reverse Thinking 数据构造**：给定问题、图像和答案，让基座模型反推简洁 reasoning trace，避免依赖闭源教师
- **GRPO 自探索**：RL 阶段不额外加入长度惩罚，让 outcome reward 自然选择 think 或 non-think
- **多任务验证**：在 CLEVR 计数、GeoQA 数学、AITZ 手机导航及 OOD 设置上评估
- **高效收益**：相比 vanilla GRPO，TON 可将 completion length 最高减少约 90%，同时准确率不降甚至提升

#### 🔬 深入细节

##### 核心示意图

![TON teaser](https://github.com/kokolerk/TON/raw/main/assets/teaser.png)
*图：简单题中 TON 跳过冗长思考直接回答，难题中仍保留完整推理链。*

##### 动机与背景

GRPO 等 RL 后训练方法常鼓励模型在回答前生成完整 reasoning trace，这在复杂任务上有效，但也会带来过度推理：简单计数、显然的图形问题或重复模板任务不需要长篇 `<think>`，长输出反而增加训练采样时间、推理延迟和错误暴露面。

论文的核心观察是：有些样本即使去掉整个 reasoning trace，答案仍然正确；而仅靠 prompt 让模型“简单题不要思考”并不可靠，模型会保守地继续输出完整推理。因此，“是否思考”不是推理能力的副产品，而是一种需要训练的格式和策略能力。

##### Stage 1：Thought Dropout

常规 SFT 数据形如：

```text
<think>reasoning trace</think><answer>answer</answer>
```

TON 随机把 `<think>` 中的内容替换为空白，例如只保留换行：

```python
def thought_dropout(thought, dropout_prob):
    if random.random() < dropout_prob:
        thought = "\n\n"
    return thought
```

训练后模型见过两类合法格式：

```text
<think>完整推理</think><answer>...</answer>
<think>

</think><answer>...</answer>
```

这一步的作用不是告诉模型具体哪些题该跳过，而是让“跳过思考”成为可生成的合法动作。真正的选择策略交给第二阶段 RL 学习。

##### Reverse Thinking：构造冷启动 thoughts

如果没有人工 CoT 标注，TON 使用 reverse thinking：给定图像 \(I\)、问题 \(q\) 和标准答案 \(a^\*\)，让基座模型生成解释“如何从输入得到答案”的简洁 thought：

$$r \sim \pi_{base}(r \mid I,q,a^\*)$$

这样可以低成本构造 SFT 所需的 reasoning trace，再对其执行 Thought Dropout。与调用闭源教师相比，这种方式更轻量，也让 thoughts 风格接近目标基座模型。

##### Stage 2：GRPO 选择 think / non-think

SFT 只提供格式能力，GRPO 学习决策。对同一图像问题采样 \(G\) 个候选输出，有的包含完整 thought，有的为空 thought。每个输出根据任务 reward 评分：

$$R=R_{format}+R_{outcome}$$

组内优势为：

$$\hat{A}_i=\frac{R_i-\mu_R}{\sigma_R}$$

如果某个简单样本在 non-think 模式下也能答对，它会得到与 think 模式相同或更稳定的 reward；随着训练推进，模型会提高空 thought 的概率，减少输出长度。对于困难样本，空 thought 更容易答错，完整推理样本获得更高优势，模型会保留推理。

```python
# TON 训练伪代码
def train_ton(model, sft_data, rl_data, dropout_prob=0.5):
    # Stage 1: SFT with thought dropout
    for image, question, thought, answer in sft_data:
        thought = thought_dropout(thought, dropout_prob)
        target = f"<think>{thought}</think><answer>{answer}</answer>"
        update(model, sft_loss(model, image, question, target))

    # Stage 2: GRPO
    reference = freeze(copy(model))
    for image, question, answer in rl_data:
        outputs = model.sample_group(image, question, group_size=G)
        rewards = [
            format_reward(o) + outcome_reward(o.answer, answer)
            for o in outputs
        ]
        advantages = normalize_within_group(rewards)
        update(model, grpo_loss(model, reference, outputs, advantages))

    return model
```

##### Reward 设计

TON 的 reward 不需要显式惩罚长度。它主要使用：

- **Format reward**：输出是否包含合法 `<think>` 和 `<answer>` 标签，空 thought 也是合法格式
- **Discrete matching**：计数、分类、数学数值题要求预测答案匹配 ground truth
- **Continuous matching**：AITZ 等 UI 导航任务对坐标或点击位置设置容差区域，既评估 action type，也评估 exact click

这种设计的重点是给 non-think 留出空间，而不是强制短输出。模型如果空 thought 答错，reward 会自然低；如果空 thought 答对，就会逐步学会跳过。

##### 实验设置

TON 在三类任务上验证：

- **CLEVR / Super-CLEVR**：3D 物体计数，包含 OOD 计数测试
- **GeoQA**：中学几何数学题，推理难度较高
- **AITZ**：移动端 GUI 导航，输出结构化 action 和坐标，包含 Web shopping、Google apps、Install 等 OOD 域

基座使用 Qwen2.5-VL-Instruct-3B/7B。论文发现 TON 在简单或中等任务上能显著提升 skip-thought ratio，输出长度随训练下降；在难题上仍会保留推理链，说明它学到的是样本级自适应，而不是简单截断。

##### 与传统 GRPO 的区别

| 方法 | SFT 格式 | RL 行为空间 | 输出长度 |
|---|---|---|---|
| Vanilla GRPO | 总是完整 `<think>` | 主要探索不同推理内容 | 容易持续变长 |
| 长度惩罚 RL | 完整 `<think>` + 短输出偏好 | 被外部惩罚压短 | 可能压坏难题推理 |
| TON | 完整 thought 与空 thought 都合法 | 同时探索 think / non-think | 简单题短，难题长 |

> 💡 关键：TON 把“是否思考”显式纳入动作空间，而不是事后压缩已经生成的推理链。

#### 🧪 练习题

```yaml
question: "Think or Not 中 Thought Dropout 的核心作用是什么？"
options:
  - "在 SFT 阶段随机删除答案，让模型学会拒答"
  - "把部分 reasoning trace 替换为空 thought，使模型获得跳过显式推理的冷启动格式"
  - "强制所有样本都不输出 `<think>` 标签"
  - "用外部奖励模型给每个 token 打分"
answer: 1
explain: "Thought Dropout 让空 thought 成为合法输出形式；随后 GRPO 根据任务 reward 学习哪些样本适合跳过推理，哪些仍需要完整推理。"
```
