### Token级策略优化 (TLPO)

```yaml
id: tlpo
full_name: "Token级策略优化 (TLPO)"
year: "2026.04"
paper_url: "https://arxiv.org/abs/2604.26553"
motivation: "Token级策略优化缓解语言混淆"
parent: "tdpo"
category: "token_multimodal"
```

#### 📝 一句话总结

TLPO 提出在语言混淆发生位置进行 token 级探索与 PPO 式策略更新，只惩罚会诱发错误语言的候选 token，从而缓解多语言 LLM 的 language confusion，同时尽量保留通用任务能力。

#### 🎯 核心要点

- 目标问题是 multilingual LLM 在目标语言提示下混入非目标语言 token，即 language confusion。
- 相比 SFT、DPO、ORPO、GRPO 等序列级方法，TLPO 只在错误位置更新策略，避免把整段正确上下文一起压低。
- 三步流程：检测 confusion point \(c\)，从 \(\pi_\theta(\cdot\mid x,y_{<c})\) 选 Top-N 候选 token，基于短 lookahead 判断候选 token 是否诱发语言混淆并给 reward。
- 使用 probability-ranked exploration，而不是随机采样候选 token；advantage 同时考虑候选 token 原始概率和 centered reward。
- 优化目标借鉴 PPO：候选 token 概率比裁剪、reference KL 正则、token-level advantage 共同约束局部策略更新。
- 实验覆盖 Llama、Qwen、Ministral、Gemma 等多语言模型和中/阿/韩/日等目标语言，评价 Response Pass Rate、Word Pass Rate 与下游任务 accuracy 的权衡。

#### 🔬 深入细节

![TLPO confusion point 检测](https://arxiv.org/html/2604.26553v1/x3.png)
![TLPO 候选 token 探索](https://arxiv.org/html/2604.26553v1/x4.png)
![TLPO advantage 计算](https://arxiv.org/html/2604.26553v1/x5.png)
*图：TLPO Figure 2 的三个阶段，依次是检测混淆点、在该位置取候选 token、为候选 token 计算 reward 和 advantage。*

TLPO 处理的是一个非常局部但常见的多语言对齐问题：模型整体知道如何回答问题，却在某个位置突然生成英语、乌克兰语或其他非目标语言 token。序列级 SFT 或 DPO 会把整段回答当作一个样本优化，虽然能提高语言一致性，但也容易牺牲原有知识和推理能力。TLPO 的基本判断是：如果错误只由少数 token 触发，那么优化也应该只发生在这些 token 的决策边界，而不是惩罚完整 response。

方法首先让当前策略 \(\pi_\theta\) 对 prompt \(x\) 生成 response \(y\)，再检测第一个或关键的 confusion point \(c\)。在这个位置之前的上下文 \((x,y_{<c})\) 被视为有效上下文，TLPO 不改写它；只在该上下文条件下查看 next-token 分布，并选择概率排名最高的 \(N\) 个候选 token：\(\mathcal{T}=\{t_i\}_{i=1}^{N}\)。这种 probability-ranked exploration 避免了大词表随机采样的低效，也使训练集中在模型本来就可能输出的 token 上。

每个候选 token 的 reward \(R(t_i)\) 来自短 lookahead。因为某些文字在 tokenizer 中可能由多个 token 组成，单看当前 token 未必能判断是否产生语言混淆，所以 TLPO 从 \(t_i\) 开始继续自回归生成很短的 \(k\) 个 token，论文实践中设 \(k=3\)，再 detokenize 检查该片段是否包含非目标语言。不会诱发混淆的 token 获得正向 reward，会诱发混淆的 token 获得负向 reward。这样，reward 是 token-conditioned 的局部信号，而不是整段 response 的粗粒度评分。

TLPO 先给出 token-level expected reward 目标：

$$
J_{\mathrm{TLPO}}(\theta)=
\mathbb{E}_{x\sim D, y\sim\pi_\theta(\cdot\mid x)}
\left[\frac{1}{N}\sum_{t_i\in\mathcal{T}}R(t_i)\right]
$$

实际优化时改写为 PPO 式 clipped objective。设候选 token 由旧策略 \(\pi_{\theta_{old}}\) 选出，概率比为
\(r_i(\theta)=\frac{\pi_\theta(t_i\mid x,y_{<c})}{\pi_{\theta_{old}}(t_i\mid x,y_{<c})}\)，则：

$$
J_{\mathrm{TLPO}}(\theta)=
\mathbb{E}\left[
\frac{1}{N}\sum_{t_i\in\mathcal{T}}
\left(
\min\left(r_i(\theta)A_i,\operatorname{clip}(r_i(\theta),1-\epsilon,1+\epsilon)A_i\right)
-\beta D_{\mathrm{KL}}(\pi_\theta\Vert\pi_{\theta_{ref}})
\right)
\right]
$$

advantage 不是简单的 \(R(t_i)-\bar{R}\)，而是乘上旧策略下的候选 token 概率：

$$
A_i=\frac{1}{Z}\pi_{\theta_{old}}(t_i\mid x,y_{<c})\big(R(t_i)-\mu\big)
$$

其中 \(\mu\) 是候选集合内的 probability-weighted average reward，\(Z\) 用于归一化，使所有候选 token 的 advantage 绝对值和保持稳定。这个设计有一个重要直觉：TLPO 想压低错误语言 token，但不希望把原模型已经学到的合理 token 排序彻底打乱。因此，高概率且有害的 token 会受到更强负 advantage；高概率且有效的 token 会被保留或增强；低概率 token 即便 reward 极端，也不会主导更新。

```python
# TLPO Algorithm 1 的简化伪代码
policy = init_from(reference_policy)

for step in range(M):
    batch = sample_prompts(D)
    local_training_items = []

    for x in batch:
        y = sample(policy, x)
        c = detect_confusion_point(y, target_language=x.target_language)
        if c is None:
            continue

        prefix = y[:c]
        T = top_n_tokens(policy.next_token_dist(x, prefix), N)
        rewards = []
        for t in T:
            lookahead = rollout(policy, x, prefix + [t], k=3)
            rewards.append(language_reward(t, lookahead, target_language=x.target_language))
        local_training_items.append((x, prefix, T, rewards))

    old_policy = freeze_copy(policy)
    for _ in range(p):
        objective = compute_tlpo_objective(policy, old_policy, reference_policy, local_training_items)
        policy.gradient_ascent(objective, lr=alpha)
```

> ⚠️ 注意：TLPO 的“token 级”不是把完整序列 loss 拆到每个 token，而是只对检测到的 confusion point 生成候选 token 集合，并只对这个局部决策点计算 reward、advantage 与 PPO 裁剪更新。

与 DPO/ORPO 的区别在于 credit assignment。DPO 需要 chosen/rejected 序列对，优化的是整段回答的相对 likelihood；如果回答只有一个 token 混入错误语言，DPO 仍会影响整段序列概率，可能压低大量本来正确的上下文 token。TLPO 则把问题转化为“在 \(c\) 位置选哪个 token”，通过候选 token reward 直接惩罚错误语言候选，保留周围上下文的生成能力。这也是论文强调它能在提高 Response Pass Rate 的同时减少 accuracy drop 的原因。

KL 项的作用是防止局部更新过度偏离初始 policy。论文采用与 GRPO 类似的无偏 KL 估计形式，对候选 token 位置计算 \(D_{\mathrm{KL}}(\pi_\theta\Vert\pi_{\theta_{ref}})\)，使策略既能压低混淆 token，又不会为了语言一致性把 next-token 分布推到不自然的形状。PPO 的 clip 机制则进一步限制单次更新幅度，避免某些负 reward token 被一次性打到过低概率而影响流畅性。

实验上，TLPO 的主指标不是单一 accuracy，而是语言一致性与能力保留的 Pareto 权衡。论文报告 Response Pass Rate 和 Word Pass Rate 来衡量回答是否保持目标语言，同时用 MIF、MMMLU、GPQA、ARC-C、BBH、MATH、GSM8K 等任务检查通用能力。在 English 作为 neutral category 的设定下，TLPO 在平均 RPR/WPR 上超过基线和 DPO/ORPO，同时平均 accuracy 接近原始模型；在更严格的 English 也算 confusion 的设定下，TLPO 仍取得最高平均 RPR，说明局部 token 更新比序列级强约束更稳。

#### 🧪 练习题

```yaml
question: "TLPO 为什么要使用短 lookahead 来评估候选 token 的 reward？"
options:
  - "因为 PPO 只能处理固定长度为 3 的 rollout"
  - "因为一个可读字符或语言片段可能由多个 tokenizer token 构成，单个 token 不足以判断语言混淆"
  - "因为 lookahead 可以替代 reference KL 项"
  - "因为 TLPO 需要生成完整回答后才能计算序列级 DPO loss"
answer: 1
explain: "论文用短 lookahead 解码候选 token 后续片段，再判断是否出现非目标语言，从而得到局部 token reward。"
```
