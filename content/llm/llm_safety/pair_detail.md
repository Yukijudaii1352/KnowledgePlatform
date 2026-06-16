### PAIR：提示词自动迭代优化（Prompt Automatic Iterative Refinement）

```yaml
id: pair
name: "PAIR"
full_name: "提示词自动迭代优化 (Prompt Automatic Iterative Refinement)"
year: "2024"
org: "UPenn"
paper_url: "https://ieeexplore.ieee.org/abstract/document/10992337/"
category: "jailbreak"
parent: "autodan"
motivation: "攻击者LLM迭代优化提示词"
```

#### 📝 一句话总结
PAIR 提出用一个 attacker LLM 通过黑盒查询、自然语言反馈和迭代反思来自动生成 prompt-level 红队测试提示。它解决了手写提示不可扩展与 GCG 式 token 级攻击查询量大、不可解释、迁移性受限的问题，通常在很少轮次内完成语义级候选优化。

#### 🎯 核心要点
- 使用三个角色：attacker LLM 生成候选提示，target LLM 返回响应，judge 函数判断是否达到红队测试目标
- 只需要黑盒 API 访问，不要求目标模型权重、logits 或梯度信息
- 攻击粒度是 prompt-level semantic jailbreak，生成结果保持人类可读，区别于 token-level adversarial suffix
- 每轮包含四步：attack generation、target response、jailbreaking scoring、iterative refinement
- attacker 的上下文保存历史候选、目标响应和 judge 分数，并生成自然语言 improvement 来指导下一轮
- 支持并行 streams，用宽度 \(N\) 和深度 \(K\) 控制探索，最坏查询复杂度为 \(N\cdot K\)
- 论文用 JailbreakBench/JBB-Behaviors、AdvBench 等数据，并比较 GCG 与人工模板类方法
- judge 既可用 GPT-4 等强模型校验，也可用 Llama Guard 等可复现实验的开源安全分类器

#### 🔬 深入细节

![PAIR 官方流程示意图](https://jailbreaking-llms.github.io/static/images/pair_example.jpg)
*图：PAIR 项目页示意 attacker 与 target 的闭环。attacker 根据系统目标生成候选提示，target 返回响应，attacker 再基于历史反馈改进下一轮候选；论文实现中还加入 judge 对候选响应进行二元评分。*

```python
# PAIR 单流抽象伪代码：用于授权红队评估的黑盒迭代提示优化
conversation = []
attacker = AttackerLLM(system_prompt=redteam_objective_and_rules)
target = TargetLLM(black_box_api=True)
judge = SafetyJudge()

for step in range(K):
    # 1. attacker 基于历史记录生成候选提示和改进说明
    candidate_prompt, improvement = attacker.propose(conversation)

    # 2. target 只暴露黑盒响应
    target_response = target.generate(candidate_prompt)

    # 3. judge 判断响应是否满足预定义红队测试判据
    score = judge(candidate_prompt, target_response)  # score in {0, 1}

    if score == 1:
        return candidate_prompt

    # 4. 将失败样本、响应和分数写回上下文，驱动下一轮 refinement
    conversation.append({
        "prompt": candidate_prompt,
        "response_summary": summarize_for_safety(target_response),
        "score": score,
        "improvement": improvement,
    })

return best_candidate_seen(conversation)
```

PAIR 的问题设定非常直接：给定黑盒目标模型 \(T\)、候选提示 \(P\)、目标响应 \(R\sim q_T(P)\)，以及一个 judge 函数，算法希望在有限查询内找到能触发预定义红队判据的提示。论文把 judge 结果写成二元变量：

$$
S=\texttt{JUDGE}(P,R)\in\{0,1\}.
$$

当 \(S=1\) 时，候选被认为通过测试并停止；当 \(S=0\) 时，PAIR 不做梯度更新，而是把 \((P,R,S)\) 放入 attacker 的对话历史，让 attacker 用自然语言解释失败原因并提出下一轮候选。

PAIR 和 AutoDAN/GCG 的关键差异是搜索算子来自 LLM 的 in-context refinement，而不是遗传交叉或 token 梯度。attacker LLM 被设定为红队助手，它每轮读取目标 \(O\) 和历史 \(C_t\)，生成候选：

$$
P_t \sim A(\cdot\mid O,C_t).
$$

目标模型返回：

$$
R_t \sim T(\cdot\mid P_t),
$$

judge 给出：

$$
S_t=\texttt{JUDGE}(P_t,R_t).
$$

若失败，则更新历史：

$$
C_{t+1}=C_t\cup\{P_t,R_t,S_t,\text{improvement}_t\}.
$$

这个循环把搜索空间保持在自然语言提示层面，避免生成不可解释 token 后缀；同时，它利用强 LLM 的常识、角色扮演理解、语境重写和失败归因能力，减少人工模板设计成本。

论文强调 PAIR 的四个步骤：第一是 attack generation，即 attacker 生成候选提示；第二是 target response，即把候选发给目标模型并收集黑盒响应；第三是 jailbreaking scoring，即用 judge 判断响应是否满足测试目标；第四是 iterative refinement，即把历史结果反馈给 attacker 继续搜索。这个设计本质上是一个小样本黑盒优化器：目标函数不可微、反馈稀疏、搜索空间是自然语言，但优化器本身也具备语言建模能力。

并行 streams 是 PAIR 的工程关键。单条链路深度为 \(K\)，可能过早陷入某种策略；多条链路宽度为 \(N\)，可以同时探索不同语义方向。最坏查询次数满足：

$$
Q_{\max}=N\cdot K.
$$

当 \(N\ll K\) 时，算法偏向深度迭代，适合需要多轮修正的目标；当 \(N\gg K\) 时，算法偏向广度搜索，适合快速尝试多种语义策略。论文实验默认使用较大的并行宽度和较小深度，这与“少量查询内发现候选”的目标一致。

PAIR 的优势来自黑盒性和语义性。GCG 需要白盒梯度或大量近似查询，且输出 token 后缀常不可读；人工模板可读但依赖人工经验。PAIR 处在二者之间：它不需要模型内部信息，也不需要人工逐条设计，而是让 attacker 自动提出、观察、修正。由于候选是自然语言，成功样本往往更容易跨模型迁移；但这也意味着评估必须保守，judge 需要尽量降低误报，并且实验应在授权红队范围内进行。

> 💡 关键：PAIR 的“优化变量”不是 token 向量，而是 attacker LLM 的对话上下文。每一次失败都会变成下一轮生成的条件，因此算法的有效性高度依赖历史摘要、judge 质量和并行搜索预算。

#### 🧪 练习题
```yaml
question: "PAIR 为什么可以在没有目标模型梯度的情况下迭代优化提示？"
options:
  - "它训练了一个新的目标模型来替代黑盒模型"
  - "它让 attacker LLM 根据目标响应、judge 分数和历史记录进行自然语言 refinement"
  - "它只使用固定人工模板，不进行搜索"
  - "它通过困惑度过滤直接保证所有候选成功"
answer: 1
explain: "PAIR 将黑盒反馈写入 attacker 的上下文，利用 LLM 的自然语言改写和失败归因能力生成下一轮候选，因此不需要目标模型梯度。"
```
