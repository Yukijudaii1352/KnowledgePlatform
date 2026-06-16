### Online-Mind2Web

```yaml
id: online_mind2web
name: Online-Mind2Web
full_name: 在线思维到网页 (Online-Mind2Web)
year: '2026'
org: OSU
paper_url: https://www.emergentmind.com/papers/2504.01234
category: frontier_2026
parent: mind2web_2
motivation: 136个高流量网站的实时环境基准
```

#### 📝 一句话总结

Online-Mind2Web 提出了一个覆盖 136 个高流量真实网站、300 个在线任务的 live web agent 基准，并用 WebJudge 自动评估长轨迹任务是否完成，解决静态网页基准高估 agent 能力的问题。

#### 🎯 核心要点

- 构建 live web 基准：300 个真实用户任务来自 136 个网站，覆盖购物、餐饮、出行、住宿、本地服务等高频场景
- 任务强调真实约束：价格、时间、地点、库存、评分、规格、账户状态、表单提交结果等都可能影响是否成功
- 提出 WebJudge 自动评估流程：Key Point Identification → Key Screenshot Identification → Outcome Judgment
- 通过关键截图筛选压缩长轨迹，避免把几十步甚至上百步网页截图全部塞入多模态 judge
- 采用人类标注校准自动评价，报告 WebJudge 与人工判断的一致性高于纯文本 accessibility-tree judge 和简单规则评估
- 暴露当前 web agent 的真实短板：动态网页弹窗、跨页比较、条件筛选、数值约束、长程纠错和重复动作控制
- 与 Mind2Web/Mind2Web-2 的静态或离线设定不同，Online-Mind2Web 把评测对象放回持续变化的在线网站

#### 🔬 深入细节

##### 框架总览

![Online-Mind2Web WebJudge 流程](https://raw.githubusercontent.com/OSU-NLP-Group/Online-Mind2Web/main/images/WebJudge.jpg)
*图：WebJudge 先抽取任务关键点，再从 agent 轨迹中选择能证明成败的关键截图，最后结合任务、关键点、截图和动作历史判断结果。*

清单中的 emergentmind 链接使用了 `2504.01234`，该编号页面并非 Online-Mind2Web 论文；Online-Mind2Web 对应论文为 OSU 的 *An Illusion of Progress? Assessing the Current State of Web Agents*，arXiv 编号为 `2504.01382`。这里保留 YAML 元信息不变，但方法内容按 Online-Mind2Web 官方论文和仓库解释。

##### WebJudge 伪代码

```python
# Online-Mind2Web / WebJudge 的核心评估流程
for task in online_mind2web_tasks:
    trajectory = run_agent_on_live_website(task.instruction)

    # 1. 将自然语言任务拆成必须满足的检查点
    key_points = judge_llm.identify_key_points(
        instruction=task.instruction,
        reference_requirements=task.requirements,
    )

    # 2. 从长轨迹中筛选最能证明成败的截图和动作
    scored_frames = []
    for step in trajectory:
        score = judge_llm.score_evidence(
            screenshot=step.screenshot,
            url=step.url,
            action=step.action,
            key_points=key_points,
        )
        scored_frames.append((score, step))
    key_frames = top_k(scored_frames, k=K)

    # 3. 结合关键证据做最终 outcome judgment
    judgment = judge_llm.judge_outcome(
        instruction=task.instruction,
        key_points=key_points,
        key_screenshots=[s.screenshot for _, s in key_frames],
        actions=[s.action for _, s in key_frames],
        final_answer=trajectory.final_answer,
    )
    task_success = parse_binary_success(judgment)
```

##### 方法细节

Online-Mind2Web 的核心动机是检验“网页 agent 进步幻觉”。许多系统在静态 DOM、缓存网页或短程点击任务上看起来进步很快，但真实网站会变化：按钮文案调整、弹窗出现、库存状态改变、地区服务不可用、搜索结果排序浮动、登录或验证码干扰都会破坏离线轨迹。论文因此把任务设计为在线执行，并持续维护任务可用性，目的是测量 agent 在真实网页环境里的端到端完成能力。

可以把一个任务形式化为 \(\tau=(x, R)\)，其中 \(x\) 是用户指令，\(R=\{r_1,\ldots,r_m\}\) 是必须满足的隐式或显式约束。Agent 在 live web 上产生轨迹：

$$
H=\{(o_t, a_t, u_t)\}_{t=1}^{T}
$$

其中 \(o_t\) 是截图或 DOM 观察，\(a_t\) 是点击、输入、滚动、搜索等动作，\(u_t\) 是 URL 或页面状态。任务成功不是“最后一步是否停下”，而是所有关键约束是否被满足：

$$
y=\mathbb{1}\left[\bigwedge_{j=1}^{m}\operatorname{sat}(r_j,H)=1\right]
$$

这也是 WebJudge 要先抽取 key points 的原因：真实任务往往包含多个约束，漏掉任意一个都应判失败。例如“找一家今晚 7 点后仍营业、评分 4.5 以上、距离酒店 2 英里以内的餐厅”至少包含时间、评分、距离和餐厅类型四类条件。

WebJudge 把自动评估分成三步。第一步 Key Point Identification 将任务转成检查清单 \(K=\{k_1,\ldots,k_M\}\)，让 judge 明确知道要验证什么。第二步 Key Screenshot Identification 对轨迹每一步估计证据价值：

$$
s_t=f_\phi(o_t,a_t,u_t,K),\qquad C=\operatorname{TopK}_{t\in[1,T]} s_t
$$

其中 \(C\) 是被保留的关键截图集合。第三步 Outcome Judgment 再用多模态模型判断 \(\hat{y}=J_\theta(x,K,C,A_C)\)，其中 \(A_C\) 是关键步骤附近的动作历史。这样做的直觉很直接：长网页轨迹里大量截图只是导航过程，真正能证明成功或失败的通常是筛选器状态、详情页、购物车、确认页或最终提交结果。

这种分解比把全轨迹交给 LLM judge 更稳。全轨迹会遇到上下文长度、图片数量和视觉噪声问题，judge 也容易被无关页面误导；只看最后截图又会漏掉中间是否满足约束，例如 agent 曾经选中过正确日期但后续提交前被页面重置。Key screenshot 筛选保留关键证据，同时让评估成本随 \(K\) 而不是随完整轨迹长度 \(T\) 增长。

论文报告的系统评测显示，当前强模型在 online setting 里仍经常失败。失败不是单一的视觉识别问题，而是交互链条中任一环节出错都会导致最终失败：搜索词过窄导致候选不足，筛选条件设置错误，价格或时间约束读错，重复点击同一控件，遇到 cookie 弹窗后无法恢复，或者在页面跳转后丢失已经建立的任务状态。Online-Mind2Web 的价值正是在于把这些真实交互问题暴露出来。

评价指标上，任务成功率可以写成：

$$
\operatorname{SR}=\frac{1}{|\mathcal{D}|}\sum_{\tau_i\in\mathcal{D}}\hat{y}_i
$$

但仅看成功率不足以区分“稳健完成”和“偶然完成”。因此论文还关注轨迹长度、无效动作、重复动作和错误恢复等行为特征。对 web agent 训练来说，这意味着后续优化不应只奖励最终 success，还需要惩罚明显无效的循环，并鼓励在关键页面留下可验证证据。

> 💡 关键：Online-Mind2Web 的方法创新不在新的浏览器控制器，而在 live benchmark 和可扩展 judge。它把 web agent 评测从“能否复现离线标注动作”推进到“能否在真实网站中满足用户约束”。

#### 🧪 练习题

```yaml
question: "WebJudge 为什么要先做 Key Screenshot Identification？"
options:
  - "为了完全丢弃 agent 的动作历史"
  - "为了只保留与任务关键点相关的视觉证据，降低长轨迹带来的上下文和噪声压力"
  - "为了把网页任务改写成纯文本问答"
  - "为了让所有在线任务都不需要人工校准"
answer: 1
explain: "在线网页轨迹通常很长，全部截图会造成上下文过载并引入大量无关视觉信息；筛选关键截图能保留判断成败所需证据。"
```
