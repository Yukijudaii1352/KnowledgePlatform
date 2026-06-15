### VL-Rethinker — 视觉语言自反思 (VL Self-Reflection via RL)

```yaml
id: vl_rethinker
name: VL-Rethinker
full_name: "视觉语言自反思 (VL Self-Reflection via RL)"
year: "2026"
org: "PKU"
paper_url: "https://proceedings.neurips.cc/paper_files/paper/2025/hash/2c84844a559e4f962752570bff456ae4-Abstract-Conference.html"
category: "frontier_2026"
parent: "reason_rft"
motivation: "RL激励自反思，提升复杂推理性能"
```

#### 📝 一句话总结

VL-Rethinker 用强化学习直接激励 VLM 形成“先答、再反思、再修正”的慢思考能力，通过 Selective Sample Replay 缓解大模型 GRPO 的 vanishing advantages，并用 Forced Rethinking 显式训练自我检查步骤，在数学、科学和多学科视觉推理中提升复杂问题表现。

#### 🎯 核心要点

- **面向 VLM 的慢思考 RL**：不依赖蒸馏闭源模型，而用可验证奖励直接训练 Qwen2.5-VL 系列
- **Vanishing Advantages 问题**：大模型训练快速饱和，组内样本 reward 变得相同，导致 GRPO 有效梯度减少
- **Selective Sample Replay (SSR)**：从候选样本中优先重放有非零/高优势的 informative queries，提高训练信号密度
- **Forced Rethinking**：在初始 rollout 后追加反思触发语，强制模型生成 self-reflection 步骤
- **ViRL39K 数据集**：约 39K 可验证多模态问答，覆盖 STEM、图表、文档、空间关系和社会科学等
- **SOTA 结果**：VL-Rethinker-72B 在 MathVista、MathVerse、MathVision、MMMU-Pro、EMMA、MEGA-Bench 等基准上推进开源模型表现

#### 🔬 深入细节

##### 核心示意图

![VL-Rethinker overview](https://tiger-ai-lab.github.io/VL-Rethinker/static/images/overview.png)
*图：VL-Rethinker 由 Selective Sample Replay 和 Forced Rethinking 两个关键训练组件组成。*

##### 动机与背景

GPT-o1、DeepSeek-R1 等慢思考模型证明了显式反思能提升复杂数学和代码问题表现，但视觉语言模型的慢思考能力并未同步提升。很多 VLM 即使用长 CoT，也容易把第一轮错误视觉理解一路推到最终答案，缺少“我刚才看错了吗”的自我检查。

VL-Rethinker 的目标是用 RL 直接诱导 VLM 的 self-reflection，而不是从强模型蒸馏反思文本。它先发现标准 GRPO 在 72B 级 VLM 上存在严重训练信号稀释：模型很快对大量样本全答对或全答错，组内 reward 方差趋近 0，相对优势消失，更新效率下降。

##### Vanishing Advantages

GRPO 依赖组内 reward 差异计算优势：

$$\hat{A}_i=\frac{R_i-\mu_R}{\sigma_R}$$

如果一个 query 的 \(G\) 个采样回答全部正确或全部错误，则 \(\sigma_R\) 很小或为 0，这个 query 几乎不提供有效策略梯度。随着大模型能力增强，这类“全对/全错”的 query 比例上升，有效 query 比例下降。

![Vanishing advantages](https://tiger-ai-lab.github.io/VL-Rethinker/static/images/vanishing_adv.png)
*图：随着训练推进，72B 模型中有效 query 比例下降，说明标准 GRPO 的训练信号逐渐稀疏。*

##### Selective Sample Replay

SSR 从 active learning 角度处理这个问题：训练应该更多关注“接近能力边界”的样本，也就是模型有时答对、有时答错、组内优势不为 0 的样本。它将这些样本放入 replay buffer，并按优势强度采样重放。

```python
# Selective Sample Replay 伪代码
def selective_sample_replay(candidates, replay_size, alpha=1.0):
    # candidates: rollouts grouped by query, each query has rewards and advantages
    effective = []
    for query_group in candidates:
        if has_nonzero_advantage(query_group):
            effective.append(query_group)

    weights = normalize([advantage_strength(q) ** alpha for q in effective])
    replay_batch = sample(effective, size=replay_size, p=weights)
    return replay_batch
```

与简单过滤不同，SSR 不是只丢弃无效样本，而是把 informative samples 重新分配到训练中，提高每个 batch 的有效优势密度。这样可以让大模型继续在边界样本上学习，而不是浪费计算在已经饱和的 query 上。

##### Forced Rethinking

SSR 提升了 RL 效率，但论文观察到仅用 SSR 得到的模型并不一定会自然生成反思或自验证步骤。为此，VL-Rethinker 引入 Forced Rethinking：在 RL 训练的初始 rollout 末尾追加一个反思触发语，引导模型检查自己的第一轮推理。

形式上，模型先生成初始回答：

$$o^{(1)}\sim \pi_\theta(\cdot\mid I,q)$$

训练环境再追加触发语 \(t_{rethink}\)，例如“Wait, does it seem right?”，要求模型继续生成：

$$o^{(2)}\sim \pi_\theta(\cdot\mid I,q,o^{(1)},t_{rethink})$$

最终 reward 根据反思后的答案计算。这样模型会学到：在复杂视觉推理中，先验答案可以被重新检查，必要时修正视觉理解或数学推导。

![Forced Rethinking 示例](https://tiger-ai-lab.github.io/VL-Rethinker/static/images/rethinking.png)
*图：Forced Rethinking 让模型显式复查初始推理，并在发现误读题意时自我修正。*

##### 训练流程伪代码

```python
# VL-Rethinker 训练伪代码
def train_vl_rethinker(policy, data):
    reference = freeze(copy(policy))
    replay_buffer = []

    for batch in data:
        rollouts = policy.sample_group(batch, group_size=G)
        rewards = rule_based_verify(rollouts, batch.answers)
        advantages = group_relative_advantages(rewards)

        replay_buffer.extend(select_informative(rollouts, advantages))
        replay = selective_sample_replay(replay_buffer, replay_size=B)

        rethinking_rollouts = []
        for item in replay:
            first = item.response
            prompt2 = item.prompt + first + "\nWait, does it seem right?"
            second = policy.generate(prompt2)
            rethinking_rollouts.append((first, second))

        final_rewards = verify_after_rethinking(rethinking_rollouts)
        loss = grpo_loss(policy, reference, rethinking_rollouts, final_rewards)
        update(policy, loss)
```

##### 数据与评估

VL-Rethinker 使用 ViRL39K 作为 RL 数据基础。它强调可验证性和覆盖面：数学、物理、化学、生物，图表/表格/文档推理，空间关系，多学科 STEM 和社会科学问题；同时带有模型能力标注，便于给不同规模模型选择合适难度样本。

模型在 Qwen2.5-VL-7B/72B 上训练，72B 版本在 MathVista、MathVerse、MathVision 等数学视觉推理基准上显著增强，也在 MMMU-Pro、EMMA、MEGA-Bench 等综合基准上缩小与强闭源模型差距。

##### 与 Reason-RFT 的关系

Reason-RFT 关注“如何用 SFT + GRPO 提升视觉推理泛化”；VL-Rethinker 更进一步关注“RL 训练出来的模型是否会反思”。它处理两个更细的问题：大模型 GRPO 的有效样本减少，以及模型虽然答得更强但缺少自我检查行为。

| 方法 | 核心训练信号 | 主要目标 |
|---|---|---|
| Reason-RFT | CoT SFT + 任务 reward | 泛化与数据效率 |
| VL-Rethinker | SSR + Forced Rethinking | 大模型 RL 稳定性与自反思 |
| Think or Not | Thought Dropout + GRPO | 动态决定是否需要推理 |

#### 🧪 练习题

```yaml
question: "VL-Rethinker 中 Selective Sample Replay 主要解决什么问题？"
options:
  - "视觉编码器无法读取高分辨率图片"
  - "标准 GRPO 中大量 query 组内 reward 相同，导致相对优势消失、有效训练信号变少"
  - "模型无法输出 JSON 格式"
  - "训练数据没有任何图像"
answer: 1
explain: "SSR 优先重放具有非零或高优势的样本，把训练集中到模型能力边界附近，从而缓解大模型训练中的 vanishing advantages。"
```
