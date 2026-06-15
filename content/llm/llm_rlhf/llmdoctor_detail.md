### LLM医生 (LLMdoctor)

```yaml
id: llmdoctor
full_name: LLM医生 (LLMdoctor)
year: '2026.01'
paper_url: https://arxiv.org/abs/2601.10416
motivation: 流引导Token级测试时对齐
parent: tdpo
category: token_multimodal
```

#### 📝 一句话总结
LLMdoctor 提出一种测试时对齐框架，用 token-level flow-guided preference optimization 学出“医生”式稀疏奖励分布，并在解码时引导基础模型生成更有帮助且更安全的回答。

#### 🎯 核心要点
- 框架包含 patient/base LLM、doctor guidance model、token-level reward flow 和 reward-guided decoding。
- 通过正负行为变体估计 token 级偏好差异，构造稀疏而精确的对齐信号。
- 使用类似 GFlowNet 的 flow matching / subtrajectory balance 训练 reward flow，缓解 dense reward 对中性 token 的误导。
- 推理时不全量微调大模型，而是把基础模型分布与 doctor 奖励分布组合，完成 test-time alignment。
- 在 HH-RLHF、AlpacaEval 等设置中强调 helpfulness-harmlessness Pareto 前沿和弱到强引导。

#### 🔬 深入细节
![LLMdoctor 总体框架](https://arxiv.org/html/2601.10416v1/x2.png)
*图：LLMdoctor 用 token-level flow 学出指导分布，在解码时像医生一样对基础模型给出局部处方。*

```python
# LLMdoctor / TFPO 简化伪代码
for x, y in alignment_corpus:
    pos_logp = logp(positive_behavior_model, y, x)
    neg_logp = logp(negative_behavior_model, y, x)
    token_signal = abs(pos_logp - neg_logp)
    sparse_targets = keep_salient_tokens(token_signal, threshold=theta)
    train_flow_with_subtrajectory_balance(doctor_flow, x, y, sparse_targets)

for decoding_step in range(max_len):
    base_dist = patient_lm.next_token_distribution(prefix)
    reward_dist = doctor_flow.reward_distribution(prefix)
    guided_dist = normalize(base_dist ** (1 / tau) * reward_dist ** (beta / tau))
    token = sample(guided_dist)
    prefix.append(token)
```

LLMdoctor 关注的问题不是“如何再训练一个更大的 aligned model”，而是在推理阶段给现有模型提供可控的局部引导。传统 reward-guided decoding 容易把奖励预算铺到大量中性 token 上，导致多样性下降或出现 ceiling effect；LLMdoctor 则把奖励建模成 token 轨迹上的稀疏 flow，只在真正影响偏好的位置施加较强引导。

token 级监督来自正负行为模型之间的条件概率差异。直觉上，如果某个 token 在 positive behavior model 下概率高、在 negative behavior model 下概率低，它更可能承载有益或安全行为；反之则可能是风险 token。论文用类似 \(\Delta_t=|\log\pi_{\mathrm{pos}}(y_t|s_t)-\log\pi_{\mathrm{neg}}(y_t|s_t)|\) 的信号筛出显著 token。

方法核心是 TFPO：把整段回答视作 token 轨迹，用 flow model 给前缀状态和动作分配可传播的偏好流。Subtrajectory Balance 约束让短片段和长片段的 flow 保持一致，value discrimination loss 让 doctor 区分正负行为。这样得到的 doctor 不是普通 reward model，而是能在每个解码步给出稀疏偏好方向的指导器。

推理阶段，LLMdoctor 将基础模型分布 \( \pi_0 \) 和 doctor 分布 \( \pi_r \) 做乘性组合：\( \pi_{\mathrm{decode}}(a|s)\propto \pi_0(a|s)^{1/\tau}\pi_r(a|s)^{\beta/\tau} \)。\(\beta\) 控制对齐强度，\(\tau\) 控制采样温度；这使得模型保留原有语言能力，同时在危险或价值敏感 token 上被 doctor 拉回更好的方向。

> ⚠️ 注意：LLMdoctor 的优势依赖 token signal 的稀疏性；如果把所有 token 都当作同等重要的奖励目标，方法会退化为高开销且易过度约束的解码重加权。

#### 🧪 练习题
```yaml
question: "LLMdoctor 在推理时如何利用 doctor 模型？"
options:
  - "完全替换基础模型的下一词分布"
  - "把基础模型分布和 doctor 奖励分布按强度组合后采样"
  - "只在训练集上重写偏好标签"
  - "删除所有低概率 token"
answer: 1
explain: "LLMdoctor 是测试时引导方法，核心是用 doctor 的 token-level reward distribution 调整基础模型解码，而不是替换基础模型。"
```
