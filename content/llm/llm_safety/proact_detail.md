### ProAct：主动防御（ProAct: Jailbreaking Jailbreaks）

```yaml
id: proact
name: ProAct
full_name: 主动防御 (ProAct: Jailbreaking Jailbreaks)
year: "2026.03"
org: ICLR
paper_url: https://openreview.net/forum?id=AUZIYQGAoAb
category: jailbreak
parent: pair
motivation: 伪造响应误导攻击智能体
```

#### 📝 一句话总结

ProAct 提出一种“主动防御”框架，在检测到越狱意图后不只是拒答，而是返回看似命中攻击目标、实际不含有害内容的伪响应，从而污染自动越狱攻击器的反馈信号并提前终止其搜索。

#### 🎯 核心要点

- 面向 PAIR、TAP、DAGR、X-Teaming 等依赖迭代反馈的黑盒自动越狱框架，攻击点是攻击器内部 evaluator 对目标模型输出的误判。
- 三代理流程：User Intent Analyzer 识别真实意图并抽取安全主题，ProAct Defender 生成主题相关但无害的伪响应，Surrogate Evaluator 反复评估并给出修改反馈。
- 四阶段运行：意图分析 -> 恶意请求路由到 Defender -> Surrogate Evaluator 触发再生成直到足够“像成功越狱” -> 良性请求直接返回基础模型正常回答。
- 核心判据是让攻击器评分器认为成功 `S_j(r)=1`，同时真实安全评分保持无害 `S_g(r)=0`，即制造“假阳性越狱反馈”。
- Defender 避免直接条件化原始危险请求，只使用意图分析器抽取的高层安全主题和历史尝试，降低真实泄露有害细节的风险。
- 与输入过滤、输出过滤、推理时引导等传统防线正交；论文在 4 个安全基准、6 个目标模型、4 类攻击框架上报告最高 92% 的 ASR 降幅。

#### 🔬 深入细节

![ProAct 框架总览](https://arxiv.org/html/2510.05052v1/x2.png)
*图：ProAct 的四阶段流程。恶意请求被路由到主动防御链路，良性请求则直接走基础模型正常回答。图源：arXiv HTML。*

```python
# ProAct 推理时防御伪代码（安全化概括，不包含具体越狱模板）
def proact_response(conversation, base_llm, analyzer, defender, surrogate, max_rounds=K):
    verdict = majority_vote([
        analyzer.classify_intent(conversation) for _ in range(N)
    ])

    if verdict.intent == "benign":
        return base_llm.generate(conversation)

    topic = verdict.security_topic
    candidate = None
    feedback = None

    for _ in range(max_rounds):
        candidate = defender.generate_spurious_response(
            topic=topic,
            previous_feedback=feedback,
            safety_constraint="benign_content_only"
        )
        judged = majority_vote([
            surrogate.judge_appears_successful(topic, candidate)
            for _ in range(M)
        ])
        if judged.looks_like_successful_jailbreak:
            return candidate
        feedback = judged.reasoning

    return candidate  # 达到预算后返回最后一个无害伪响应
```

ProAct 的动机来自自动越狱算法的闭环结构。PAIR/TAP 一类攻击不是只发一次提示，而是把目标模型的返回交给攻击器内部 evaluator，再根据 evaluator 的“是否成功”评分继续改写提示。传统防御通常是被动的：输入过滤拒绝请求、输出过滤删掉危险回答、系统提示要求模型保持安全。这些方法即使挡住了当前轮，也会把“没成功”的明确信号反馈给攻击器，使攻击器继续搜索。ProAct 反过来利用这一点：防御目标不再只是让模型拒绝，而是让攻击器误以为已经成功，从而停止或偏离搜索。

论文把目标系统写作 \(\mathcal{T}:\mathcal{X}\to\mathcal{R}\)，把提示 \(x\in\mathcal{X}\) 映射为响应 \(r\in\mathcal{R}\)。攻击器没有真实安全评分器，只能用自己的近似评分 \(S_j\) 判断响应是否越狱；真实安全判据记为 \(S_g\)。自动攻击的目标可写成：

$$
P_A^*=\arg\max_{P_A}\;\mathbb{E}_{p\in P_A}\left[S_j(\mathcal{T}(p))\right]
$$

ProAct 要构造的是评分器分歧：存在响应 \(r\)，使得 \(S_j(r)=1\land S_g(r)=0\)。也就是说，攻击器的近似评分认为“已经得到了危险答案”，但真实安全判据认为内容并不危险。对应的防御优化直觉可以写为：

$$
\mathcal{T}^*=\arg\max_{\mathcal{T}}\;\mathbb{E}_{p\in\mathcal{P}_A}\left[S_j(\mathcal{T}_\theta(p))\cdot(1-S_g(\mathcal{T}(p)))\right]
$$

这个目标强调两件事必须同时成立：表面形式要足够欺骗攻击器 evaluator，真实语义又不能提供可执行的有害信息。ProAct 因此不是“绕过安全规范”，而是将安全内容包装成攻击器容易误判的假成功信号。

User Intent Analyzer 是安全与可用性的分界点。如果对所有请求都返回伪响应，普通用户会被困惑，模型效用会显著下降；如果只做硬拒绝，又会把失败信号交给攻击器。因此 Analyzer 会查看当前输入和对话历史，判断真实意图而不是表面措辞，并抽取简短的安全主题。论文还使用多数投票：如果恶意/良性判断没有形成足够优势，就带着竞争理由重新评估。这一层的核心不是生成内容，而是决定请求是否应该进入主动防御链路。

ProAct Defender 负责生成 spurious response。关键设计是它不直接吃入原始危险请求，而是只条件化 Analyzer 给出的主题、先前尝试和 evaluator 反馈。这样能降低模型不慎补全真实危险步骤的概率。伪响应的目标是“主题相关、外观可信、语义无害”：它可以在表层上呈现出攻击器 evaluator 熟悉的成功模式，但内容本身应为空洞、不可执行或安全替代。这个设计把攻击器依赖的弱点从“模型是否拒绝”转移到“攻击器是否能准确区分真实有害内容与伪装内容”。

Surrogate Evaluator 是 ProAct 的内循环。它不需要知道攻击器内部 evaluator 的私有实现，只需要作为独立近似器判断当前伪响应是否“看起来像成功越狱”。如果判断不够强，Surrogate 会返回失败原因，Defender 再根据这些反馈重写。这个循环本质上是在防御侧做一次受安全约束的搜索：搜索目标不是危险答案，而是能诱发攻击器误判的安全文本。达到预算后，系统返回最后一个仍受安全约束的候选响应。

与传统防御相比，ProAct 的主要差异是它攻击攻击器的优化过程，而不是只拦截某个输入或输出。输入过滤器把恶意请求挡在模型前，但攻击器可以换提示；输出过滤器挡住危险回答，但攻击器仍能看到失败并继续迭代；推理时引导让模型更倾向拒绝，也仍可能暴露“拒绝了”的反馈。ProAct 则把反馈变成不可靠信号，使自动攻击器的搜索目标函数失真。因此论文强调它可以叠加在现有 guardrail 之上，作为额外一层主动干扰机制。

> 💡 关键：ProAct 的安全性依赖“伪响应真实无害”这一约束。若 Defender 直接基于危险原文生成细节，防御就可能退化成泄露风险；因此论文中特别强调用高层主题、反馈循环和多数投票降低误生成概率。

#### 🧪 练习题

```yaml
question: "ProAct 为什么能干扰 PAIR/TAP 这类自动越狱攻击？"
options:
  - "它通过增加模型参数量让攻击器无法查询"
  - "它让攻击器 evaluator 把无害伪响应误判为成功，从而破坏迭代反馈"
  - "它只依赖困惑度过滤所有低质量输入"
  - "它把所有用户请求都交给输出过滤器删除"
answer: 1
explain: "自动越狱攻击依赖目标模型输出作为下一轮优化信号；ProAct 制造 S_j=1 且 S_g=0 的假成功反馈，让攻击器提前停止或朝错误方向优化。"
```
