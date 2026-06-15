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

MiniLLM 提出面向生成式 LLM 的 on-policy 蒸馏，用反向 KL 让学生在自身生成分布上接受教师反馈，解决了序列级 KD 容易让学生死记教师样本、暴露偏差和低概率区域过拟合的问题。

#### 🎯 核心要点

- 将 LLM 蒸馏目标从 forward KL \(\mathrm{KL}(p\|q_\theta)\) 改为 reverse KL \(\mathrm{KL}(q_\theta\|p)\)
- 学生从自身策略 \(q_\theta(y|x)\) 采样，属于 on-policy 训练
- 使用教师模型对学生生成序列给出 token/sequence 级反馈
- 通过 policy gradient 推导优化反向 KL
- 引入 single-step decomposition 降低方差
- 使用 teacher-mixed sampling 缓解 reward hacking，并用 length normalization 消除长度偏置

#### 🔬 深入细节

![MiniLLM 与序列级 KD 对比图](https://ar5iv.labs.arxiv.org/html/2306.08543/assets/x3.png)
*图：序列级 KD 让学生模仿教师样本，MiniLLM 则让学生生成自己的回答，并用教师反馈改进。*

```python
# MiniLLM on-policy 蒸馏伪代码
for prompt in instruction_data:
    y_student = sample(student, prompt)              # y ~ q_theta
    with no_grad():
        logp_teacher = teacher.log_prob(prompt, y_student)
    logp_student = student.log_prob(prompt, y_student)

    reward = normalize_length(logp_teacher - logp_student)
    loss = -stop_gradient(reward) * logp_student     # policy gradient form
    loss += stability_terms_single_step_and_teacher_mixing()
    update(student, loss)
```

传统序列级 KD 通常从教师分布采样回答，再让学生最大似然拟合这些回答，本质接近 forward KL：

$$
\mathrm{KL}(p\|q_\theta)=\mathbb{E}_{y\sim p}\left[\log\frac{p(y|x)}{q_\theta(y|x)}\right]
$$

这个目标倾向于覆盖教师分布的所有模式，对分类蒸馏有用，但对开放式生成可能让小学生过度追逐教师的长尾表达，生成时一旦偏离教师样本轨迹就会出现暴露偏差。

MiniLLM 改用反向 KL：

$$
\mathrm{KL}(q_\theta\|p)=\mathbb{E}_{y\sim q_\theta}\left[\log\frac{q_\theta(y|x)}{p(y|x)}\right]
$$

由于采样来自学生自己，训练时看到的是学生推理时真实会进入的状态。教师不再提供要死记的样本，而是评估学生当前生成是否像教师认可的高质量回答。

> 💡 关键：reverse KL 更偏 mode-seeking，能帮助小模型集中学习教师高概率、可靠的生成区域，而不是覆盖所有低概率变体。

反向 KL 的梯度需要处理离散采样，因此 MiniLLM 用 policy gradient 推导，并加入工程稳定项。single-step decomposition 降低长序列奖励方差；teacher-mixed sampling 防止学生利用教师评分漏洞；length normalization 避免模型单纯偏好短回答或长回答。

与 TinyBERT 这类 encoder 蒸馏不同，MiniLLM 面向自回归生成模型，重点从“对齐中间表示”转向“在生成策略上优化学生行为”。这更贴近指令跟随、长文本生成和开放式回答质量。

#### 🧪 练习题

```yaml
question: "MiniLLM 为什么使用 reverse KL 而不是传统 forward KL？"
options:
  - "为了让学生在自身生成分布上学习，并减少对教师低概率长尾样本的过拟合"
  - "为了删除所有 attention 层"
  - "为了实现 INT8 激活量化"
  - "为了完全不需要教师模型"
answer: 0
explain: "reverse KL 的期望在学生分布上计算，更符合自回归生成推理时的状态分布，并倾向于学习教师高概率模式。"
```
