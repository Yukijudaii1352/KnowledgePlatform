### Med-R1 - 医学多模态推理 (Medical Multimodal Reasoning via RL)

```yaml
id: med_r1
name: Med-R1
full_name: "医学多模态推理 (Medical Multimodal Reasoning via RL)"
year: "2026"
org: "Stanford Med"
paper_url: "https://ieeexplore.ieee.org/abstract/document/11371404/"
category: "frontier_2026"
parent: "reason_rft"
motivation: "GRPO医学推理，跨模态跨任务泛化"
```

#### 📝 一句话总结

Med-R1 将 GRPO 引入医学 VQA 后训练，用规则化的格式奖励和答案奖励提升小型 VLM 在八类医学影像和五类医学问答任务上的泛化能力。论文还系统比较 Think、No-Think 与 Think-After，指出医学场景中“更长推理”不一定更好，推理质量和领域对齐比推理长度更关键。

#### 🎯 核心要点

- **医学 VLM 的 RL 后训练框架**：以 Qwen2-VL/Qwen2.5-VL 为基础模型，用 GRPO 训练医学视觉问答策略
- **八类影像模态**：CT、MRI、Ultrasound、Dermoscopy、Fundus Photography、OCT、Microscopy、X-ray
- **五类任务类型**：modality recognition、anatomy identification、disease diagnosis、lesion grading、biological attribute analysis
- **规则奖励而非奖励模型**：使用格式奖励检查 `<think>/<answer>` 标签，使用准确率奖励检查多选题答案字母是否匹配
- **组内相对优势**：GRPO 不训练 critic，而是对同一问题采样多条回答，用组内奖励归一化估计 advantage
- **Think/No-Think/Think-After 对比**：No-Think 往往提升跨模态泛化，Think-After 在保留可解释性和稳定性之间取得折中

#### 🔬 深入细节

##### 核心框架

![Med-R1 奖励与长度曲线](https://arxiv.org/html/2503.13939v4/extracted/6388405/fig_rewards_length.png)
*图：Med-R1 在不同医学模态和任务上的 GRPO 训练奖励与输出长度变化；奖励通常在 100-200 steps 内收敛，输出长度随训练缩短。*

##### 动机与背景

医学影像 VQA 与自然图像 VQA 不同：问题往往要求识别细粒度病灶、解剖结构或影像模态，且不同模态之间视觉分布差异很大。传统 SFT 容易把模型绑定到训练集中的表面模式，例如某种模态的特定纹理或某类问题的常见答案；高质量医学 CoT 标注又昂贵且难以规模化。

Med-R1 的出发点是用 RL 替代单纯最大似然拟合，让模型在规则奖励下探索更稳健的回答策略。与 PPO 相比，GRPO 不需要额外价值模型，适合资源受限的医学 VLM 后训练。

##### GRPO 目标函数

对训练问题集合 \(P(Q)\)，每次采样问题 \(q\)，旧策略 \(\pi_{\theta_{\text{old}}}\) 对同一问题生成 \(G\) 个回答 \(\{o_i\}_{i=1}^{G}\)。GRPO 目标为：

$$
J_{\text{GRPO}}(\theta)=
\mathbb{E}_{q\sim P(Q),\{o_i\}_{i=1}^{G}\sim \pi_{\theta_{\text{old}}}}
\frac{1}{G}\sum_{i=1}^{G}
\left[
\min\left(
\frac{\pi_{\theta_{\text{new}}}(o_i\mid q)}
{\pi_{\theta_{\text{old}}}(o_i\mid q)}A_i,
\text{clip}\left(
\frac{\pi_{\theta_{\text{new}}}(o_i\mid q)}
{\pi_{\theta_{\text{old}}}(o_i\mid q)},
1-\epsilon,1+\epsilon
\right)A_i
\right)
-\beta D_{\text{KL}}(\pi_{\theta_{\text{new}}}\|\pi_{\text{ref}})
\right]
$$

其中 \(\pi_{\text{ref}}\) 是冻结的基础 MLLM，KL 项限制新策略不要偏离基础模型太远。与 PPO 不同，GRPO 的 \(A_i\) 不来自 critic，而来自同组样本的奖励归一化：

$$
A_i = \frac{r_i-\text{mean}(\{r_j\}_{j=1}^{G})}{\text{std}(\{r_j\}_{j=1}^{G})}
$$

直觉上，同一医学问题下多条候选回答互相比，答对且格式正确的回答获得正优势，答错或格式坏的回答获得负优势。

##### 奖励设计

Med-R1 使用两类规则奖励：

- **格式奖励**：要求模型把思考过程放在 `<think>...</think>`，最终答案放在 `<answer>...</answer>` 中；标签存在且格式正确时给 1 分
- **准确率奖励**：医学 VQA 多为选项题，若提取出的首个答案字母与 ground truth 匹配，则给 1 分

```python
# Med-R1 GRPO 奖励伪代码
def med_r1_reward(response, gold_letter, mode="think"):
    if mode == "think":
        format_reward = has_valid_tags(response, ["think", "answer"])
        pred = extract_answer_letter(response)
    elif mode == "no_think":
        format_reward = has_valid_tags(response, ["answer"]) and no_text_outside_answer(response)
        pred = extract_answer_letter(response)
    elif mode == "think_after":
        format_reward = answer_before_rationale(response)
        pred = extract_answer_letter(response)

    accuracy_reward = int(pred == gold_letter)
    return format_reward + accuracy_reward
```

这种奖励很轻量，不依赖医学专家在线判分或训练额外 reward model。代价是它主要适用于有明确答案的 VQA/选择题设置，开放式临床报告生成还需要更复杂的语义和医学事实奖励。

##### Think、No-Think 与 Think-After

Med-R1 的重要贡献不只是“用 GRPO 训练医学 VLM”，还在于比较了推理形式本身。

**Think** 是标准 R1 风格：先输出 `<think>` 中间推理，再在 `<answer>` 中给出答案。它有可解释性，但在医学图像上可能生成领域不对齐的 rationale。例如模型借用自然图像或通用医学常识的语言模式，看似解释充分，实际与影像证据不匹配。

**No-Think** 修改 prompt，只允许输出：

```text
<answer>A</answer>
```

如果 `<answer>` 之外出现任何显式思考文本，答案抽取会变成 null，从而准确率奖励为 0。这会强迫模型直接优化答案选择。论文发现 No-Think 在跨模态泛化中经常优于 Think，说明在缺少高质量医学 CoT 监督时，强行生成中间 rationale 可能反而引入幻觉。

**Think-After** 则先输出答案，再输出事后解释。它的设计目标是让答案优化不被冗长前置推理扰动，同时保留给医生审阅的解释文本：

```text
<answer>B</answer>
<think>post-hoc rationale explaining the decision</think>
```

Think-After 不完全解决推理忠实性问题，但比前置 Think 更稳定，也更符合医学应用中“先给可核验结论，再给解释供审阅”的需求。

##### 训练与推理流程

```python
# Med-R1 训练流程伪代码
def train_med_r1(policy, ref_policy, medical_vqa_data):
    for batch in sample_questions(medical_vqa_data):
        all_responses = []
        for q in batch:
            responses = policy.sample(q, G=group_size)
            rewards = [rule_reward(r, q.gold) for r in responses]
            advantages = normalize_within_group(rewards)
            all_responses.append((q, responses, advantages))

        loss = clipped_grpo_loss(
            policy=policy,
            old_policy=policy.snapshot(),
            ref_policy=ref_policy,
            grouped_samples=all_responses,
            kl_beta=beta,
        )
        policy.update(loss)
    return policy
```

评估时，论文从两个维度测试泛化：跨模态泛化和跨任务泛化。跨模态设置中，模型在某一影像模态上后训练，再测试到其他七类模态；跨任务设置中，模型在某一问题类型上训练，再测试到其他问题类型。这比只测同分布准确率更贴近医学部署，因为真实系统经常遇到新设备、新模态和新问题类型。

##### 关键实验结论

Med-R1 的 2B 模型相对 Qwen2-VL-2B 获得约 29.94% 平均准确率提升，并超过更大的 Qwen2-VL-72B；跨任务泛化相对基础模型提升约 32.06%。这些结果说明，规则 RL 后训练能让小模型更有效地适应医学问答，而不是单纯依赖参数规模。

论文也提醒一个反直觉结论：在医学 VQA 中，推理越长不一定越好。训练曲线显示输出长度会下降，而奖励保持或提升，说明 GRPO 学到的是更直接、更符合标签奖励的决策策略。若没有医学领域对齐的 rationale 监督，长 CoT 可能成为噪声源。

> 💡 关键：Med-R1 把医学 VLM 的问题从“如何让模型多说推理”转为“如何让模型在可验证奖励下学到可泛化且足够可解释的回答策略”。

##### 与 SFT 和通用 R1 的区别

| 方法 | 监督信号 | 优势 | 医学场景风险 |
|---|---|---|---|
| SFT | 固定答案/标注分布 | 稳定、实现简单 | 容易记忆训练模态和任务捷径 |
| 通用 Think CoT | 前置自然语言推理 | 可解释、符合 R1 形式 | rationale 可能与医学影像证据不对齐 |
| No-Think Med-R1 | 只优化答案奖励 | 泛化更稳、训练更直接 | 缺少可审阅解释 |
| Think-After Med-R1 | 先答案后解释 | 兼顾准确率和解释 | 解释仍需进一步校验忠实性 |

#### 🧪 练习题

```yaml
question: "Med-R1 中 No-Think 变体为什么可能比前置 Think 获得更好的跨模态泛化？"
options:
  - "因为医学 VQA 不需要视觉输入"
  - "因为在缺少高质量医学 CoT 监督时，前置自由推理可能产生领域不对齐的幻觉，No-Think 直接优化答案奖励"
  - "因为 GRPO 无法处理 <think> 标签"
  - "因为 No-Think 使用了更大的基础模型"
answer: 1
explain: "论文发现医学场景中推理质量比推理长度更重要。若前置 rationale 来自通用域模式，可能与医学影像证据错位；No-Think 去掉这一路径，直接优化答案正确性。"
```
