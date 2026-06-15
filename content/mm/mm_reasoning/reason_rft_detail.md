### Reason-RFT — 视觉推理强化微调 (Reinforcement Fine-Tuning for Visual Reasoning)

```yaml
id: reason_rft
name: Reason-RFT
full_name: "视觉推理强化微调 (Reinforcement Fine-Tuning for Visual Reasoning)"
year: "2026"
org: "NTU"
paper_url: "https://proceedings.neurips.cc/paper_files/paper/2025/hash/08d70284b013c03ba89cd2b642bc864b-Abstract-Conference.html"
category: "frontier_2026"
parent: "llava_cot"
motivation: "GRPO强化微调，提升推理泛化能力"
```

#### 📝 一句话总结

Reason-RFT 提出两阶段视觉推理强化微调框架，先用少量高质量 CoT SFT 激活 VLM 的推理格式和任务先验，再用 GRPO 与任务可验证奖励提升跨域泛化、数据效率和复杂视觉推理能力。

#### 🎯 核心要点

- **两阶段训练**：Stage 1 用 CoT SFT 做 reasoning activation；Stage 2 用 GRPO 做 RL-based reasoning enhancement
- **面向视觉推理的 GRPO**：不训练单独 value model，而用组内 reward 归一化计算相对优势，降低 RL 微调成本
- **结构化输出奖励**：要求 `<think>...</think>` 包裹推理过程、`<answer>...</answer>` 包裹最终答案
- **三类 accuracy reward**：离散值匹配、数学数值容差匹配、函数序列分步匹配
- **系统化评测任务**：重构视觉计数、结构感知、空间变换三类视觉推理数据，并设计 ID/OOD 域移评测
- **数据效率优势**：少量 CoT 激活 + RL 探索可在少样本设置下接近或超过完整 SFT 基线

#### 🔬 深入细节

##### 核心示意图

![Reason-RFT pipeline](https://tanhuajie.github.io/ReasonRFT/images/pipeline.png)
*图：Reason-RFT 先进行 SFT-based activation，再用 GRPO 与格式/准确性奖励进行强化微调。*

##### 动机与背景

传统视觉推理增强主要依赖两类方法：神经符号程序或 CoT SFT。神经符号方法可解释，但依赖程序生成和模块组合，系统复杂；CoT SFT 更直接，但需要大量高质量推理标注，容易让模型记住训练分布中的固定解题模式，面对视角变化、物体外观变化或题型迁移时泛化不足。

Reason-RFT 的出发点是把 SFT 和 RL 的优势结合起来。SFT 用于冷启动，让模型知道“如何按结构化格式推理”；RL 用于探索，让模型不只模仿标注轨迹，而是根据答案正确性优化自己的推理策略。这样可以缓解纯 SFT 的 cognitive rigidity，也避免纯 RL 初期没有稳定推理格式的问题。

##### Stage 1：SFT-based Reasoning Activation

第一阶段使用带 CoT 的视觉推理数据训练模型生成推理步骤 \(r\) 与答案 \(a\)。给定图像 \(I\)、问题 \(q\)，训练目标是最大化：

$$\mathcal{L}_{SFT}=-\log p_\theta(r,a \mid I,q)$$

这一步不追求覆盖所有任务，只要求建立稳定先验：模型会分解问题、输出 `<think>` 和 `<answer>`，并能在视觉计数、几何结构、空间变换等任务中形成基本推理链。

> 💡 关键：Reason-RFT 不是用 SFT 解决全部问题，而是用 SFT 给 RL 一个可优化的起点。

##### Stage 2：GRPO-based Reasoning Enhancement

第二阶段对每个输入采样一组候选回答：

$$\{o_i\}_{i=1}^{G}\sim \pi_{\theta_{old}}(\cdot\mid I,q)$$

每个候选通过 reward function 得到分数 \(R_i\)。GRPO 不需要 value model，而是在组内计算相对优势：

$$\hat{A}_i=\frac{R_i-\mathrm{mean}(\{R_j\}_{j=1}^{G})}{\mathrm{std}(\{R_j\}_{j=1}^{G})}$$

再用 clipped policy objective 更新策略：

$$\mathcal{J}_{GRPO}=\frac{1}{G}\sum_{i=1}^{G}\frac{1}{|o_i|}\sum_t
\min\left(\rho_{i,t}\hat{A}_i,\mathrm{clip}(\rho_{i,t},1-\epsilon,1+\epsilon)\hat{A}_i\right)
-\beta D_{KL}(\pi_\theta||\pi_{ref})$$

其中 \(\rho_{i,t}\) 是新旧策略在 token \(t\) 上的概率比。KL 项限制模型不要偏离参考模型过远，clip 项避免单次更新过激。

##### Reward 设计

Reason-RFT 的 reward 由格式和准确性组成：

$$R=R_{format}+R_{acc}$$

**格式奖励**检查输出是否遵循：

```text
<think> reasoning process </think>
<answer> final answer </answer>
```

**准确性奖励**按任务类型区分：

- **Discrete-valued reward**：用于计数、选择题、离散结构感知，答案完全匹配得 1，否则 0
- **Mathematical reward**：用于角度、长度、数值或 LaTeX 表达，允许小容差并可给部分分
- **Function-based reward**：用于空间变换序列，按函数名、对象、参数分层匹配，完整匹配得高分，部分匹配得较低分

这种 reward 设计让同一个 GRPO 框架能覆盖不同视觉推理任务，而不必为每个任务训练独立奖励模型。

##### 训练流程伪代码

```python
# Reason-RFT 两阶段训练伪代码
def train_reason_rft(vlm, cot_data, rl_data):
    # Stage 1: reasoning activation
    for image, question, rationale, answer in cot_data:
        target = f"<think>{rationale}</think><answer>{answer}</answer>"
        loss = -vlm.log_prob(target, image=image, question=question)
        update(vlm, loss)

    policy = copy(vlm)
    reference = freeze(copy(vlm))

    # Stage 2: GRPO enhancement
    for image, question, ground_truth in rl_data:
        outputs = policy.sample_group(image, question, group_size=G)
        rewards = []

        for out in outputs:
            r_format = check_format(out)
            r_acc = task_specific_accuracy(out.answer, ground_truth)
            rewards.append(r_format + r_acc)

        advantages = normalize_within_group(rewards)
        loss = grpo_clipped_loss(policy, reference, outputs, advantages)
        update(policy, loss)

    return policy
```

##### 数据与评测

Reason-RFT 将视觉推理拆成三类核心能力：

- **Visual Counting**：基于 CLEVR-Math 构造训练和 ID 测试，并用 Super-CLEVR 资产构造 OOD 视角/外观分布
- **Structure Perception**：从 Geo170K、Math360K 等筛选几何、图表、结构关系题，并用 Geometry3K 测试域移
- **Spatial Transformation**：基于 TRANCE 生成初始/最终 3D 状态，要求预测变换函数序列，并用不同视角渲染评估泛化

实验对比了 ANS-SFT、CoT-SFT、Reason-RFT-Zero 和 Reason-RFT。结论是：纯 SFT 在 ID 上可有效，但 OOD 泛化弱；纯 RL 可探索更短或更灵活的链路，但冷启动不稳；SFT 激活后再 RL 的 Reason-RFT 在准确率、域移鲁棒性和少样本效率上更均衡。

##### 与传统方法的区别

| 方法 | 训练信号 | 优势 | 风险 |
|---|---|---|---|
| ANS-SFT | 只学最终答案 | 简单直接 | 缺少显式推理 |
| CoT-SFT | 模仿标注推理链 | 冷启动稳定 | 可能过拟合标注风格 |
| Reason-RFT-Zero | 直接 RL | 推理更自由 | 初期格式和探索不稳 |
| Reason-RFT | CoT SFT + GRPO | 兼顾稳定性与泛化 | 需要可验证 reward |

#### 🧪 练习题

```yaml
question: "Reason-RFT 为什么要先做 CoT SFT，再进行 GRPO 强化微调？"
options:
  - "因为 GRPO 只能训练文本模型，不能训练视觉语言模型"
  - "因为 SFT 用于激活结构化推理格式和任务先验，GRPO 再通过可验证奖励提升泛化"
  - "因为 SFT 会冻结所有参数，GRPO 只更新视觉编码器"
  - "因为格式奖励无法在强化学习中使用"
answer: 1
explain: "SFT 提供稳定冷启动，避免纯 RL 初期不会按格式推理；GRPO 则用组内相对优势和任务 reward 推动模型探索更泛化的推理策略。"
```
