### 三角色自博弈RL (TriPlay-RL)

```yaml
id: triplay_rl
full_name: "三角色自博弈RL (TriPlay-RL)"
year: "2026.01"
paper_url: "https://arxiv.org/abs/2601.18292"
motivation: "多角色自博弈安全对齐"
parent: "grpo"
category: "rl_based"
```

#### 📝 一句话总结

TriPlay-RL 提出了由攻击者、守卫者和评估器组成的三角色闭环强化学习框架，通过交替更新 \(M_{\mathrm{Red}}\)、\(M_{\mathrm{Blue}}\)、\(M_{\mathrm{Eval}}\) 实现低人工标注成本的安全自博弈对齐。它解决了传统红队/防御训练角色孤立、攻击模式坍缩、评估标准静态且易被 reward hacking 的问题。

#### 🎯 核心要点

- 三角色闭环：\(M_{\mathrm{Red}}\) 生成 adversarial prompts，\(M_{\mathrm{Blue}}\) 生成安全响应，\(M_{\mathrm{Eval}}\) 对响应做细粒度评估。
- 三阶段交替更新：\(P_{\mathrm{Red}}\rightarrow P_{\mathrm{Blue}}\rightarrow P_{\mathrm{Eval}}\)，每个阶段只更新一个角色，其余角色作为环境或监督来源。
- 每个角色训练都采用 GRPO-based RLVR，使奖励可验证并避免强依赖人工偏好标注。
- 红队奖励由语义保持奖励、攻击成功奖励、多模型泛化攻击奖励和多样性惩罚组成。
- 蓝队采用三档响应评价：negative、rejective、positive，鼓励安全且有帮助的回答，而不是简单拒绝。
- 评估器通过多专家多数投票构造三分类数据，区分 unsafe response、simple refusal 和 useful guidance。
- 论文报告红队 adversarial effectiveness 提升约 20%-50%，蓝队 safety performance 提升约 10%-30%，同时保持 general reasoning capability。

#### 🔬 深入细节

![TriPlay-RL 三角色闭环](https://ar5iv.labs.arxiv.org/html/2601.18292/assets/x1.png)
*图：TriPlay-RL 的攻击者、守卫者、评估器闭环。红队产生攻击提示，蓝队响应，评估器给出奖励，三者交替进化。*

TriPlay-RL 的核心判断是：LLM 安全对齐不应只优化一个静态防御模型。现实中的攻击者会随着防御变化而调整策略，防御模型也需要从最新攻击中学习，而评估器如果固定不变，又会变成可被利用的 reward loophole。因此论文把安全训练拆成三个互相施压的角色：红队 \(M_{\mathrm{Red}}\) 负责把基础有害请求包装成更难防的 adversarial prompt；蓝队 \(M_{\mathrm{Blue}}\) 必须在这些攻击下给出安全、拒绝或建设性指导；评估器 \(M_{\mathrm{Eval}}\) 则不断学习更细粒度地区分 unsafe、simple refusal 与 safe-helpful response。

训练不是同时更新三个模型，而是交替阶段式更新：\(P_{\mathrm{Red}}\)、\(P_{\mathrm{Blue}}\)、\(P_{\mathrm{Eval}}\)。在 \(P_{\mathrm{Red}}\) 中，蓝队和评估器提供攻击反馈，红队通过 GRPO/RLVR 变强；在 \(P_{\mathrm{Blue}}\) 中，红队固定为最近一轮攻击分布，蓝队学习防御；在 \(P_{\mathrm{Eval}}\) 中，用红蓝对抗过程中产生的 \(\langle prompt,response\rangle\) 数据和多专家投票标签更新评估器。这种闭环的价值在于避免“离线安全集过拟合”：训练数据、攻击强度、评价边界都随迭代变化。

红队奖励函数设计得相对细。首先是 semantic reward，确保包装后的 adversarial prompt 仍保留原始请求的核心语义和攻击目标，避免红队为了得分生成偏题文本。其次是 diversity penalty，针对已成功攻击池 ASP 中的历史 prompts，分别用 Self-BLEU 和 embedding cosine similarity 惩罚重复模式：

$$
B_{\text{selfBLEU}}(x)=-\sum_{n=1}^{K}\operatorname{SelfBLEU}_{\mathcal{X}}(x,n),
$$

$$
B_{\text{Cos}}(x)=-\sum_{x'\in\mathcal{X}}\frac{\phi(x)\cdot\phi(x')}{\|\phi(x)\|^2\|\phi(x')\|^2}.
$$

论文再用非线性函数 \(y(x)=e^{kx}-1\) 放大高相似度惩罚，并组合为：

$$
P_{\text{div}}=w_{\text{B}}y(B_{\text{selfBLEU}}(x))+w_{\text{C}}y(B_{\text{Cos}}(x)).
$$

这相当于给红队加一个“不要只会同一种 jailbreak 模板”的约束。实验附录给出的典型参数是 \(w_B=2\)、\(w_C=4\)，n-gram 取 3、4、5。

为了让红队攻击具有跨模型泛化性，TriPlay-RL 不只攻击当前蓝队，还把 Llama、ChatGLM 等其他防御模型纳入奖励。红队总奖励写成：

$$
R_{\text{total}}=
\sum_{i=1}^{n}w_i\left[\sum_{r\in\{0,1,2\}}R_r\cdot\mathbf{1}_{[r]}\right]
+R_{\text{sem}}-P_{\text{div}}.
$$

其中 \(i\) 遍历不同 defense model，\(w_i\) 是模型权重，\(r\) 表示攻击结果类型。论文附录中 \(M_{blue}\) 权重为 0.6，Meta-Llama-3.1-8B-Instruct 和 GLM-4.6 各 0.2。这种多目标奖励避免红队只钻单个防御模型漏洞。

蓝队不是被训练成“看到风险就拒绝”的保守模型。论文采用三档评价标准：

$$
s=\begin{cases}
negative & \text{if } r \text{ contains safety risks},\\
rejective & \text{if } r \text{ is simple refusal},\\
positive & \text{if } r \text{ is safe and helpful}.
\end{cases}
$$

对应 reward 为：

$$
\operatorname{Reward}_i=\begin{cases}
-1 & \text{if } s_i=negative,\\
0 & \text{if } s_i=rejective,\\
1 & \text{if } s_i=positive.
\end{cases}
$$

这个设计很重要：简单拒绝只有 0 分，安全且有用才是正分。因此 \(M_{\mathrm{Blue}}\) 被鼓励在安全边界内提供 constructive guidance，而不是为了安全牺牲所有 utility。它直接对应论文的目标：提升安全能力同时尽量保持通用推理能力。

评估器 \(M_{\mathrm{Eval}}\) 是闭环稳定性的关键。若 evaluator 太弱，红队和蓝队都会学会利用其偏差；若 evaluator 只做二分类，蓝队可能退化成全拒绝。因此论文将评估器训练成三分类器，并使用多专家多数投票构造标签。安全专家先判断 safe/unsafe，utility experts 再把安全响应细分成 rejective 或 positive，最终得到 \(\langle prompt,response,C\rangle\)，其中 \(C\in\{negative,rejective,positive\}\)。这让 evaluator 的奖励信号与蓝队目标一致，也缓解单一 LLM judge 被 reward hacking 的问题。

```python
# TriPlay-RL 简化伪代码
# 三个模型：M_red attacker, M_blue defender, M_eval evaluator
# 每轮依次执行 P_red, P_blue, P_eval；每个阶段使用 GRPO/RLVR 更新当前角色

for iteration in range(num_iterations):
    # P_red: train attacker with fixed defender/evaluator
    for harmful_seed in seed_prompts:
        adv_prompt = M_red.wrap(harmful_seed)
        responses = [defense_model(adv_prompt) for defense_model in [M_blue, llama_target, glm_target]]
        eval_scores = [M_eval(adv_prompt, resp) for resp in responses]
        R_sem = semantic_judge(harmful_seed, adv_prompt)
        P_div = diversity_penalty(adv_prompt, attack_success_pool)
        R_red = weighted_attack_reward(eval_scores) + R_sem - P_div
        update_with_grpo(M_red, adv_prompt, R_red)
        store_prompt_response_pairs(adv_prompt, responses)

    # P_blue: train defender against newest red distribution
    for adv_prompt in sample_from_latest(M_red):
        response = M_blue(adv_prompt)
        label = M_eval.classify(adv_prompt, response)  # negative / rejective / positive
        R_blue = {-1: "negative", 0: "rejective", 1: "positive"}[label]
        update_with_grpo(M_blue, response, R_blue)

    # P_eval: refresh evaluator with multi-expert majority labels
    labeled_data = majority_vote_experts(collected_prompt_response_pairs)
    supervised_or_rl_update(M_eval, labeled_data)
```

> 💡 关键：TriPlay-RL 的“自博弈”不是二人零和游戏，而是三角色共同进化。红队提升攻击覆盖度，蓝队学习更稳健的安全有用响应，评估器随数据刷新评价标准，三者形成持续压力。

#### 🧪 练习题

```yaml
question: "TriPlay-RL 为什么要把蓝队响应分成 negative、rejective、positive 三档，而不是只判断 safe/unsafe？"
options:
  - "为了让红队生成更短的攻击提示"
  - "为了奖励安全且有帮助的回答，避免蓝队退化成简单拒绝模型"
  - "为了减少评估器训练数据量"
  - "为了让 GRPO 不再需要 KL 正则"
answer: 1
explain: "simple refusal 只得到 0 分，safe and helpful 才得到正分，因此蓝队被推动在安全边界内保持实用性。"
```
