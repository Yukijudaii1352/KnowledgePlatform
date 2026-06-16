### MiniLLM

```yaml
id: minillm
name: MiniLLM
full_name: 最小化LLM (MiniLLM)
year: 2024
org: 微软
paper_url: https://arxiv.org/abs/2306.08543
category: distillation
parent: tinybert
motivation: 反向KL散度蒸馏大语言模型
```

#### 📝 一句话总结

MiniLLM 提出面向生成式大语言模型的 on-policy 蒸馏，把传统 forward KL 蒸馏改为 reverse KL，并让学生在自身生成分布上接受教师反馈，从而减少开放式生成中的长尾过拟合、暴露偏差和低质量文本概率高估问题。

#### 🎯 核心要点

- 将 LLM 白盒蒸馏目标从 \(\mathrm{KL}(p\|q_\theta)\) 改为 \(\mathrm{KL}(q_\theta\|p)\)，其中 \(p\) 是教师分布，\(q_\theta\) 是学生分布
- 使用 on-policy 训练：学生先按当前策略生成回复，再由教师对学生生成的 token/序列给出概率反馈
- 用 policy gradient 推导离散文本采样下的 reverse KL 优化，而不是直接 teacher forcing 拟合教师样本
- 提出 single-step decomposition/regularization，直接估计单步生成质量以降低长序列蒙特卡洛方差
- 使用 teacher-mixed sampling 缓解 reward hacking，避免小学生通过退化文本骗取高教师分数
- 使用 length normalization 抑制短回复偏置，并结合 PPO clipping 与语言模型预训练损失稳定训练
- 在 Dolly、SelfInst、VicunaEval、Super-NaturalInstructions、UnnaturalInstructions 等指令跟随评测上验证 120M 到 13B 模型规模的蒸馏效果

#### 🔬 深入细节

![MiniLLM 与序列级 KD 对比图](https://ar5iv.labs.arxiv.org/html/2306.08543/assets/x3.png)
*图源：MiniLLM 论文 Figure 3。左侧 SeqKD 从教师分布采样并最小化 forward KLD；右侧 MiniLLM 从学生分布采样并最小化 reverse KLD。*

```python
# MiniLLM on-policy reverse-KL 蒸馏伪代码
student = sft_init(student, instruction_data)  # 先用真实回复 SFT，选验证集 loss 最低的 checkpoint

for step in range(num_updates):
    prompts = sample_prompts(instruction_data)

    # teacher-mixed sampling: 每步采样分布混合学生和教师，降低退化样本概率
    y = sample_autoregressive(
        prompt=prompts,
        distribution=lambda ctx: (1 - alpha) * q_student(ctx) + alpha * p_teacher(ctx),
    )

    logq = student.log_prob(prompts, y)
    with no_grad():
        logp = teacher.log_prob(prompts, y)

    # reverse KL 的 policy-gradient 信号，length normalization 去掉短句偏置
    reward = length_normalize(logp - logq)
    pg_loss = -stop_gradient(reward) * logq

    # single-step 项直接枚举词表计算一步质量，LM loss 保留通用语言建模能力
    ss_loss = single_step_reverse_kl(student, teacher, prompts, y)
    lm_loss = causal_lm_loss(student, pretraining_corpus_batch)

    loss = clipped_policy_loss(pg_loss) + beta * ss_loss + gamma * lm_loss
    update(student, loss)
```

传统 word-level KD 或 sequence-level KD 本质上接近 forward KL。若教师分布为 \(p(y|x)\)，学生为 \(q_\theta(y|x)\)，forward KL 为：

$$
\mathrm{KL}(p\|q_\theta)
=\mathbb{E}_{y\sim p(y|x)}
\left[\log p(y|x)-\log q_\theta(y|x)\right]
$$

这个目标是 mode-covering：学生被鼓励覆盖教师分布中的所有模式。对分类任务，这通常是优点，因为类别空间有限；但对开放式文本生成，教师的可接受回复存在大量长尾表达，小学生容量不足时会把概率质量铺到教师低概率或空洞区域，最终在自由生成时产生不可靠文本。

MiniLLM 改用 reverse KL：

$$
\mathcal{J}(\theta)
=\mathrm{KL}(q_\theta\|p)
=\mathbb{E}_{y\sim q_\theta(y|x)}
\left[\log q_\theta(y|x)-\log p(y|x)\right]
$$

reverse KL 是 mode-seeking：学生更倾向于集中拟合教师的主要高概率模式，而不是覆盖所有长尾变体。对指令跟随而言，这对应“生成更可靠、更精确的回答”，即宁可少覆盖一些风格变化，也不要给明显低质量区域分配过高概率。

由于文本 \(y\) 是离散采样结果，\(\mathcal{J}(\theta)\) 不能像普通监督学习那样直接对教师样本做 teacher forcing。MiniLLM 用 policy gradient 得到可优化形式：

$$
\nabla_\theta \mathcal{J}(\theta)
=\mathbb{E}_{y\sim q_\theta}
\left[
\nabla_\theta\log q_\theta(y|x)
\left(\log q_\theta(y|x)-\log p(y|x)\right)
\right]
$$

等价地，可以把 \(r(y)=\log p(y|x)-\log q_\theta(y|x)\) 看成教师给学生当前生成的奖励：教师概率越高、学生自信过度越低，奖励越好。训练样本来自学生当前策略，所以优化看到的是学生推理时真正会访问的状态分布，这正是 on-policy 蒸馏区别于 SeqKD 的地方。

> 💡 关键：SeqKD 让学生记住教师采样出的回复；MiniLLM 让学生先暴露自己的生成行为，再让教师评价这些行为是否落在高质量区域。

policy gradient 在长文本中方差高，因为一个早期 token 的错误会影响后面整段奖励。MiniLLM 因此引入 single-step decomposition/regularization，把总奖励拆到 token 级，某些单步项可以通过遍历词表直接计算，而不是完全依赖蒙特卡洛序列采样。这样前缀处的生成质量被更稳定地约束，收敛也更快。

teacher-mixed sampling 处理的是 reward hacking。若完全从弱学生采样，学生可能生成重复、空泛或异常短的文本，却在某些局部上得到看似不错的教师概率。MiniLLM 在每个时间步用混合分布采样：

$$
\tilde{q}(y_t|x,y_{<t})
=(1-\alpha)q_\theta(y_t|x,y_{<t})+\alpha p(y_t|x,y_{<t})
$$

教师混入让采样轨迹少进入明显退化区域，再用重要性采样思路近似修正梯度。论文还加入 length normalization，因为原始序列对数概率会随长度累加变小，若不修正，模型容易偏好空回复或过短回复。

训练流程上，MiniLLM 先用人工指令回复对学生做 SFT 初始化，再进行 on-policy 蒸馏；更新时组合 reverse-KL policy gradient、single-step 项、PPO clipping 稳定项和额外语言建模损失。与 TinyBERT 这类主要对齐中间层表示的 encoder 蒸馏相比，MiniLLM 的核心对象是自回归生成策略本身，更适合白盒 LLM 到小 LLM 的指令跟随蒸馏。

#### 🧪 练习题

```yaml
question: "MiniLLM 为什么把传统 forward KL 蒸馏改成 reverse KL？"
options:
  - "reverse KL 在学生自身生成分布上优化，更倾向学习教师高概率模式并减少长尾低质量区域过拟合"
  - "reverse KL 可以完全不需要教师模型"
  - "reverse KL 会自动删除 Transformer 的注意力层"
  - "reverse KL 的唯一作用是把权重量化为 INT8"
answer: 0
explain: "开放式生成空间有大量模式，小学生难以覆盖教师全部分布；reverse KL 的 mode-seeking 特性更适合让学生聚焦可靠高概率回答。"
```
