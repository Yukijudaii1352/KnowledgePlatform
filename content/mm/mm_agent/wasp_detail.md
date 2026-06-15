### WASP

```yaml
id: wasp
name: WASP
full_name: Web智能体安全基准 (WASP)
year: '2025'
org: UC Berkeley
paper_url: https://proceedings.neurips.cc/paper_files/paper/2025/hash/1c9818387f5dd0a0bc151214660f059d-Abstract-Datasets_and_Benchmarks_Track.html
category: frontier_2026
parent: —
motivation: 衡量Web Agent对抗提示注入攻击能力
```

#### 📝 一句话总结

WASP 提出一个端到端 Web Agent 提示注入安全基准，在自托管 GitLab/Reddit 等真实网页环境中模拟受限攻击者注入恶意指令，衡量 Agent 是否被劫持偏离用户目标以及是否真正完成攻击者目标。

#### 🎯 核心要点

- 真实 Web 环境：基于 VisualWebArena/WebArena 式自托管网站构建，主要使用 GitLab 与 Reddit 场景
- 现实威胁模型：攻击者只是网站普通用户，只能在 issue、评论、帖子等可写区域注入内容，不能控制整个网站或知道 Agent 内部实现
- 端到端评估：Agent 从用户任务开始真实浏览、点击、输入，最终检查网页状态而不是只检查单步 API 调用
- 双层 ASR：ASR-intermediate 判断 Agent 是否被劫持偏离用户目标，ASR-end-to-end 判断攻击者目标是否完成
- 注入形式：包含 plain-text injection 与 URL anchor injection，测试模型对网页正文和地址栏上下文的鲁棒性
- 兼容多类 Agent：支持 Claude Computer Use、VisualWebArena scaffold、GPT tool-calling loop 等不同 Agent 框架
- 核心发现：攻击可让 Agent 在最高约 86% 情况下部分偏离目标，但端到端攻击完成率低得多，暴露“security through incompetence”现象

#### 🔬 深入细节

##### 基准示意图

![WASP 端到端评估流程](https://quickchart.io/graphviz?format=png&graph=digraph%20G%20%7B%20rankdir%3DLR%3B%20node%20%5Bshape%3Dbox%2C%20style%3D%22rounded%2Cfilled%22%2C%20fillcolor%3D%22%23fff4e8%22%5D%3B%20user%20%5Blabel%3D%22User%20Goal%22%5D%3B%20agent%20%5Blabel%3D%22Web%20Agent%22%5D%3B%20web%20%5Blabel%3D%22GitLab%20%2F%20Reddit%0Awith%20Injection%22%5D%3B%20eval%20%5Blabel%3D%22ASR%20Intermediate%0AASR%20End-to-End%22%5D%3B%20attacker%20%5Blabel%3D%22Attacker%20Goal%22%5D%3B%20user%20-%3E%20agent%20-%3E%20web%20-%3E%20agent%3B%20web%20-%3E%20attacker%20%5Bstyle%3Ddashed%5D%3B%20agent%20-%3E%20eval%3B%20attacker%20-%3E%20eval%3B%20%7D)
*图：WASP 的端到端评估流程重绘：用户任务驱动 Agent 访问含注入内容的 GitLab/Reddit 页面，最终同时评估偏离用户目标和攻击目标完成情况。*

##### 核心算法伪代码

```python
# WASP 端到端提示注入评估伪代码
def wasp_attack_eval(agent, user_goal, attacker_goal, injection_template):
    web_env = reset_self_hosted_webarena(["gitlab", "reddit"])

    # 攻击者只能在正常用户可写区域放置恶意内容
    malicious_content = render_injection(
        template=injection_template,
        attacker_goal=attacker_goal,
    )
    web_env.post_as_attacker(location="issue_or_comment", content=malicious_content)

    trajectory = []
    for step in range(max_steps):
        obs = web_env.observe()
        action = agent.act(user_goal=user_goal, observation=obs)
        web_env.execute(action)
        trajectory.append((obs, action))
        if agent_declares_done(action):
            break

    asr_intermediate = judge_hijack(trajectory, user_goal, attacker_goal)
    asr_end_to_end = rule_check_attacker_goal(web_env.state, attacker_goal)
    utility = rule_check_user_goal(web_env.state, user_goal)
    return asr_intermediate, asr_end_to_end, utility
```

##### 方法解释

WASP 针对的是间接提示注入：Agent 正在执行用户的正常网页任务，却在页面中读到攻击者写入的恶意指令。由于 LLM 很难天然区分“用户/系统指令”和“不可信网页内容”，它可能把网页里的攻击语句当成更高优先级指令执行。

论文特别强调现实威胁模型。攻击者不是能改完整网站的管理员，也不知道 Agent 的系统提示或实现细节；攻击者只能像普通用户一样创建 issue、评论或帖子。这比“整个网页都被攻击者控制”的设定弱得多，也更贴近真实 Web。

WASP 的评估不是孤立单步，而是端到端工作流。一个测试包含用户目标、攻击者目标和注入模板。Agent 必须先进入网页、阅读页面、点击或输入；评估器最后检查两件事：

$$
\mathrm{ASR}_{intermediate} =
\frac{\#\text{agent 被劫持偏离用户目标}}{\#\text{total tasks}}
$$

$$
\mathrm{ASR}_{end-to-end} =
\frac{\#\text{攻击者目标最终完成}}{\#\text{total tasks}}
$$

这两个指标的差异很关键。论文发现许多 Agent 很容易被注入内容带偏，但因为网页操作能力、长程规划或表单执行能力不足，最终未必能完成攻击者目标。

> 💡 关键：“security through incompetence” 指当前较低的端到端攻击完成率不是因为 Agent 真正安全，而是因为 Agent 还不够会操作网页。随着 Agent 能力提升，风险可能同步上升。

WASP 中的注入模板包括直接在页面内容里写紧急命令的 plain-text injection，也包括把恶意目标藏在 URL anchor 中的 URL injection。后者利用了浏览器地址栏或当前 URL 可能进入 Agent 上下文的事实，即使网页正文看似普通，锚点里的文字也可能影响决策。

与 AgentDojo、InjecAgent、ASB 等基准相比，WASP 的差异在于它面向通用 Web 导航 Agent，使用真实自托管全栈网站，且要求攻击目标在环境最终状态中被验证。它既衡量安全性，也保留 utility 评估，避免一个“什么都不做”的 Agent 因拒绝所有操作而被误判为安全。

#### 🧪 练习题

```yaml
question: "WASP 中 ASR-intermediate 和 ASR-end-to-end 的区别是什么？"
options:
  - "前者看 Agent 是否被注入劫持偏离用户目标，后者看攻击者目标是否真的完成"
  - "前者只用于 Reddit，后者只用于 GitLab"
  - "前者评估模型速度，后者评估模型参数量"
  - "二者都只检查网页文本中是否出现攻击语句"
answer: 0
explain: "ASR-intermediate 衡量劫持是否发生，ASR-end-to-end 衡量攻击是否实际达成；二者差距揭示了 security through incompetence。"
```
