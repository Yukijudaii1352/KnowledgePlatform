### WebArena：网页竞技场 (WebArena)

```yaml
id: webarena
name: WebArena
full_name: 网页竞技场 (WebArena)
year: 2024
org: CMU
paper_url: https://proceedings.iclr.cc/paper_files/paper/2024/hash/4410c0711e9154a7a2d26f9b3816d1ef-Abstract-Conference.html
category: benchmark
parent: agentbench
motivation: 真实网站端到端任务执行评测
```

#### 📝 一句话总结

WebArena 提出了一个可自托管、可复现、功能完整的网页智能体环境，用 812 个长程网页任务评估模型是否真正完成用户意图。它解决了以往网页基准依赖静态轨迹或表面动作匹配的问题，转而用程序化验证器检查任务的功能正确性。

#### 🎯 核心要点

- 构建独立可复现的 WebArena 环境，包含电商、论坛、协同开发、内容管理四类完整网站。
- 额外提供地图、计算器、便签和知识资源网站，使任务更接近日常浏览器使用方式。
- 提出 812 个长程网页任务，任务以高层自然语言 intent 表达，而不是给定固定动作序列。
- 观测空间包含 URL、打开的标签页和当前页面内容，页面内容可表示为 HTML DOM、截图或 accessibility tree。
- 动作空间模拟浏览器键鼠操作，包括 click、hover、type、press、scroll、tab 操作、go_back、go_forward、goto(URL)。
- 评估重点是功能正确性，使用 \(r_{\mathrm{info}}\) 对信息查询任务判分，使用 \(r_{\mathrm{prog}}\) 对导航和内容操作任务做程序化状态检查。
- 支持不可完成任务标注，要求智能体在证据不足、权限不足或网站功能缺失时输出 N/A 或等价回复。
- 实验显示最佳 GPT-4 agent 端到端成功率只有 14.41%，显著低于人类 78.24%，暴露真实网页任务对探索和失败恢复的高要求。

#### 🔬 深入细节

![WebArena 总体框架](https://webarena.dev/static/images/overview.png)
*图：WebArena 将 AI agent 放入自托管网页环境，通过真实网页应用、工具站点和程序化验证器评估功能完成度。*

WebArena 的出发点是：如果只在缓存页面或标注动作序列上评测网页 agent，模型可能学会复述动作，却未必能在真实交互中完成用户目标。论文因此构建了一套独立网站环境，网站内容来自真实世界对应物，但通过 Docker 打包为可复现环境。这样既避免 live website 随时间变化导致评测不可重复，又保留电商下单、论坛发帖、GitLab 仓库操作、CMS 配置等真实功能。

```python
# WebArena 端到端网页任务评测伪代码
for task in webarena_tasks:
    env.reset(config=task.initial_state)
    trajectory = []
    obs = env.observe(mode="accessibility_tree")

    for step in range(task.max_steps):
        prompt = build_prompt(
            intent=task.intent,
            url=obs.url,
            tabs=obs.tabs,
            page_content=obs.accessibility_tree,
            previous_actions=trajectory,
        )
        thought, action = agent.generate_next_action(prompt)

        if action == "stop":
            break

        obs = env.step(action)
        trajectory.append((thought, action, obs))

    if task.type == "information_seeking":
        answer = extract_final_answer(agent.output)
        score = r_info(answer, task.reference_answer)
    else:
        state_sequence = env.collect_intermediate_states(trajectory)
        score = r_prog(state_sequence, task.validator)

    record_success(task.id, score == 1)
```

环境层面，WebArena 选择了四类高频网页应用：在线购物对应 OneStopShop，论坛对应 Postmill 风格 Reddit，协同开发对应 GitLab，内容管理对应 Magento 管理后台。论文还加入地图、计算器、scratchpad 和离线 Wikipedia、GitLab 文档、Adobe Commerce 文档等知识资源。这个设计让任务可以跨网站组合，例如先在 Wikipedia 或地图找信息，再把结果写入 GitLab README，而不是停留在单页按钮点击。

观测空间是 WebArena 的关键机制。模型在每一步会看到页面 URL、标签页状态和当前页面内容。页面内容可用三种形式表示：HTML DOM 树、截图、accessibility tree。论文实验主要使用带元素 ID 的 accessibility tree，因为它比 DOM 更紧凑，同时保留 link、button、textbox 等可交互角色和文本属性。元素 ID 使动作选择变成明确的分类问题，例如 `click [1582]` 表示点击观察中编号为 1582 的按钮，避免了自然语言描述元素时的歧义。

动作空间模拟浏览器使用，而不是只允许固定 API 调用。核心动作包括：

```python
# WebArena 代表性动作空间
noop()
click(elem)
hover(elem)
type(elem, text)
press(key_comb)
scroll(direction)
tab_focus(index)
new_tab()
tab_close()
go_back()
go_forward()
goto(url)
```

这些动作让 agent 可以完成多标签页对照、表单输入、页面导航、搜索、配置修改等长程行为。与静态网页问答相比，这里每一步都会改变页面状态或 agent 可见的信息，因此模型必须持续维护任务目标、当前状态和下一步计划。

WebArena 最重要的评测创新是功能正确性。对信息查询任务，论文给每个 intent 标注参考答案 \(a^*\)，并用三类函数比较预测答案 \(\hat{a}\)：`exact_match` 要求完全一致，`must_include` 要求答案包含关键内容，`fuzzy_match` 使用 GPT-4 判断语义等价。可写作：

$$
r_{\mathrm{info}}(\hat{a}, a^*)\in\{\mathrm{exact\_match},\mathrm{must\_include},\mathrm{fuzzy\_match}\}
$$

对导航、内容创建和配置任务，答案不是一句文本，而是网站状态是否被正确改变。论文定义程序化检查函数 \(r_{\mathrm{prog}}(s)\)，其中 \(s\) 是执行轨迹中的中间状态或最终状态。验证器先用 locator 找到关键内容，例如当前 URL、最新帖子、仓库 README、数据库记录或页面 DOM 片段，再用 `exact_match` 或 `must_include` 检查是否满足 intent。

整体成功率可以概括为：

$$
\mathrm{SR}=\frac{1}{N}\sum_{i=1}^{N}\mathbf{1}[\mathrm{validator}_i(\tau_i)=1]
$$

其中 \(\tau_i\) 是第 \(i\) 个任务的执行轨迹，\(\mathrm{validator}_i\) 根据任务类型调用 \(r_{\mathrm{info}}\) 或 \(r_{\mathrm{prog}}\)。这个指标允许多条不同路径都被判为正确，因为只要最终网站状态满足用户目标，轨迹不必与参考动作完全相同。

WebArena 还显式设计不可完成任务。真实用户可能提出证据不存在、权限不足或网站不支持的请求，例如要求查找网站没有公开的联系电话。此时正确行为不是编造答案，而是识别不可完成并返回 N/A 或等价说明。这个机制让 WebArena 同时评估“完成任务”的能力和“不该行动时停止”的能力。

实验结果说明真实网页任务远比传统基准困难。使用 accessibility tree 和 CoT 提示时，GPT-4 的端到端成功率仍只有 14.41%，人类为 78.24%。论文分析发现，UA hint 会帮助模型识别不可完成任务，却也会让 GPT-4 过早把可行任务判断为不可完成；移除该提示后可行任务表现提升，但不可完成任务识别下降。这表明交互式网页 agent 对提示细节非常敏感，也说明真实任务需要更强的主动探索、状态核对和失败恢复能力。

> ⚠️ 注意：WebArena 不是“网页问答数据集”，而是一个带可执行网站、状态重置和程序化验证器的环境；它评估的是端到端完成意图，而不是预测下一步参考动作。

#### 🧪 练习题

```yaml
question: "WebArena 相比基于参考动作序列的网页基准，最核心的评估变化是什么？"
options:
  - "只评估模型是否输出更长的 Chain-of-Thought"
  - "只比较模型点击的元素 ID 是否和人工轨迹完全一致"
  - "通过信息匹配或程序化状态检查评估任务是否功能性完成"
  - "把所有网页任务都转换成多项选择题"
answer: 2
explain: "WebArena 允许不同有效路径完成同一意图，因此重点检查最终答案或网站状态是否满足 intent，而不是要求动作序列表面一致。"
```
