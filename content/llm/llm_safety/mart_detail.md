### MART：多轮自动红队 (Multi-round Automatic Red-Teaming)

```yaml
id: mart
name: MART
full_name: 多轮自动红队 (Multi-round Automatic Red-Teaming)
year: "2024"
org: Academic
paper_url: https://aclanthology.org/2024.naacl-long.107/
category: alignment
parent: —
motivation: 自动化多轮红队对抗测试
```

#### 📝 一句话总结

MART 提出让 adversarial LLM 与 target LLM 多轮互相博弈：攻击模型持续生成能暴露漏洞的新 prompt，目标模型则用筛选出的安全高质量回答做安全微调。它解决了人工红队成本高、单轮自动红队只能发现风险而不能同步修复模型的问题。

#### 🎯 核心要点

- 同时训练两个模型：攻击侧 \(M_{adv}\) 负责生成 adversarial prompts，防御侧 \(M_{tgt}\) 负责产生并学习安全回答。
- 每轮使用安全 RM \(S_s\) 与有用性 RM \(S_h\) 评价 target response，自动划分 successful attack 与 successful defense。
- successful attack prompts 被加入下一轮攻击模型训练，使 \(M_{adv}\) 学会针对当前目标模型的新漏洞。
- safe 且 helpful 的 target responses 被加入目标模型安全微调数据，使 \(M_{tgt}\) 在真实攻击分布上提升防御能力。
- 采用多轮闭环而非一次性红队，目标模型更新后，攻击模型也随之适应新的失败模式。
- 初始化使用 LLaMA-65B、LIMA 与 Open Assistant 做通用指令能力基础，并用约 2,400 条红队 seed prompt 启动攻击空间。
- 论文报告经过 4 轮 MART，有限安全对齐模型在 adversarial prompt benchmark 上 violation rate 最高下降 84.7%，同时非对抗 prompt 上 helpfulness 基本保持稳定。

#### 🔬 深入细节

![MART 多轮自动红队框架](https://figures.semanticscholar.org/709af143f78bc62413c50ea1a7ee75b0702c4f59/2-Figure1-1.png)
*图：MART 根据 evaluator 反馈把成功攻击用于训练 adversarial LLM，把安全且有用的成功防御回答用于训练 target LLM。*

```python
# MART Algorithm 1/2 的简化合并版
M_adv = initialize_with_instruction_model()
M_tgt = initialize_with_instruction_model()
P_adv = seed_red_team_prompts
S_s = safety_reward_model
S_h = helpfulness_reward_model

for i in range(1, T):
    # 1. 攻击模型基于上一轮成功攻击生成新 adversarial prompts
    P_gen = generate_prompts(M_adv, P_adv, k=K_adv)

    # 2. 目标模型回答这些新攻击
    A_tgt = generate_answers(M_tgt, P_gen, k=K_tgt)

    next_P_adv = []
    R_tgt = []
    for prompt, answer in zip(P_gen, A_tgt):
        safety_score = S_s(prompt, answer)
        helpful_score = S_h(prompt, answer)

        if safety_score < theta_adv_s:
            next_P_adv.append(prompt)       # successful attack: train M_adv
        elif safety_score > theta_tgt_s and helpful_score > theta_tgt_h:
            R_tgt.append((prompt, answer))  # successful defense: train M_tgt

    M_adv = supervised_finetune(M_adv, pairs_from(P_adv, next_P_adv))
    M_tgt = supervised_finetune(M_tgt, R_tgt)
    P_adv = next_P_adv
```

MART 的动机来自红队训练的两个缺口。第一，人工红队有效但昂贵，尤其当模型多轮迭代后，之前的攻击样本很快变得过时，需要人持续设计新漏洞测试。第二，已有自动红队通常只负责“找出失败样本”，没有把安全回答生成和目标模型修复纳入同一个闭环。MART 把攻击生成和安全微调放进同一轮循环，使红队不再只是评测工具，而是训练数据生产器。

方法中有三个核心对象：攻击模型 \(M_{adv}\)、目标模型 \(M_{tgt}\)、评价器 \((S_s,S_h)\)。\(S_s\) 是 safety reward model，用来判断回答是否安全；\(S_h\) 是 helpfulness reward model，用来避免模型只学会机械拒答。对于第 \(i\) 轮生成的 prompt-response 对 \((p,a)\)，MART 计算：

$$
s_s = S_s(p,a),\quad s_h = S_h(p,a)
$$

若 \(s_s < \theta^{s}_{adv}\)，说明 target 在该 prompt 上被攻破，这个 prompt 进入 \(P^i_{adv}\)，用于训练攻击模型产生类似但更新的攻击。若 \(s_s > \theta^{s}_{tgt}\) 且 \(s_h > \theta^{h}_{tgt}\)，说明 target 给出了既安全又有帮助的回答，这个回答进入 \(R^i_{tgt}\)，用于目标模型的安全微调。这个双阈值筛选是 MART 的关键机制：攻击侧需要“能攻破”的 prompt，防御侧需要“安全且不失帮助”的 response。

攻击模型训练采用监督式 pairwise 生成。论文先用红队 seed 数据预训练 \(M_{adv}\)，让它学会把一个恶意或边界 prompt 改写成同类的新 prompt。在第 \(i\) 轮，如果 \(p^{i-1}_{adv}\) 触发了新的成功攻击 \(p^i_{adv}\)，就把 \((p^{i-1}_{adv},p^i_{adv})\) 作为输入输出对训练 \(M_{adv}\)。这相当于让攻击模型沿着“已知成功攻击附近”的方向搜索，而不是在整个 prompt 空间中随机探索，因此更容易发现目标模型当前仍薄弱的局部区域。

目标模型训练则是 feedback-guided safety finetuning。MART 不把所有拒答都视为好样本，因为过度强调 safety 会让模型退化为不愿回答。只有同时通过 \(\theta^{s}_{tgt}\) 和 \(\theta^{h}_{tgt}\) 的回答才被认为是高质量安全回答。目标模型用这些 \((p,a)\) 做 SFT，学习在 adversarial prompt 上先处理安全风险，再在允许范围内提供有用信息。这也是论文强调 helpfulness 在非对抗 prompts 上保持稳定的原因：训练数据不是单纯的“拒绝模板”，而是经过有用性 RM 过滤的安全回答。

MART 的“multi-round”并不是简单重复数据增强，而是一个非静态对抗过程。目标模型每轮更新后，旧攻击可能失效，但新漏洞也可能出现；攻击模型必须根据上一轮成功样本继续适配。用集合表示，单轮流程可以概括为：

$$
P^i_{gen}=\mathrm{Generate}(M^i_{adv},P^{i-1}_{adv}),\quad
A^i_{tgt}=\mathrm{Generate}(M^i_{tgt},P^i_{gen})
$$

$$
P^i_{adv}=\{p\in P^i_{gen}:S_s(p,M^i_{tgt}(p))<\theta^s_{adv}\}
$$

$$
R^i_{tgt}=\{(p,a):S_s(p,a)>\theta^s_{tgt}\land S_h(p,a)>\theta^h_{tgt}\}
$$

然后分别更新：

$$
M^{i+1}_{adv}\leftarrow\mathrm{Train}(M^i_{adv},P^{i-1}_{adv},P^i_{adv}),\quad
M^{i+1}_{tgt}\leftarrow\mathrm{Train}(M^i_{tgt},P^i_{gen},R^i_{tgt})
$$

论文还补充了两个工程细节。第一轮目标模型安全能力较弱，能直接通过双阈值的高质量回答可能太少，因此使用 context distillation：给 prompt 添加安全前缀，引导模型产生更安全回答，再参与筛选。后期模型趋于稳定时，新增可用样本减少，论文使用 rejection sampling：对同一 prompt 采样多个回答、调整温度扩大候选集，再从通过阈值的回答中抽取训练样本。这两个技巧解决的是数据稀疏问题，而不是改变 MART 的主循环。

与 Safe RLHF 或 DPO 相比，MART 的贡献更偏“数据生成与对抗训练流程”。DPO 关注如何从静态偏好对中直接优化策略；Safe RLHF 关注如何把安全当作约束；MART 则关注安全样本从哪里来，以及模型更新后如何持续发现新风险。它特别适合安全红队场景：每一轮都同时产出更强攻击器和更强防御器，最终把发现漏洞、筛选安全回答、修复目标模型串成可扩展闭环。

> 💡 关键：MART 的 evaluator 不只是打分器，而是路由器；低 safety score 的样本流向攻击模型，高 safety 且高 helpfulness 的样本流向目标模型。

#### 🧪 练习题

```yaml
question: "MART 中一个 prompt-response 对会被用于目标模型安全微调的条件是什么？"
options:
  - "只要 prompt 来自上一轮 successful attack 集合"
  - "只要回答的 safety score 很低，说明攻击足够强"
  - "回答同时超过目标侧 safety 阈值和 helpfulness 阈值"
  - "攻击模型和目标模型生成了完全相同的文本"
answer: 2
explain: "MART 用双阈值选择 successful defense：回答必须既安全又有帮助，才会进入目标模型的安全微调集合。"
```
