### WebArena: 网页交互竞技场 (WebArena)
```yaml
id: webarena
name: WebArena
full_name: 网页交互竞技场 (WebArena)
year: "2024"
org: CMU
paper_url: https://arxiv.org/abs/2307.13854
category: frontier_2026
parent: —
motivation: 真实网页环境订票数据分析任务
```

#### 📝 一句话总结
WebArena 提出了一个可自托管、可复现、具备真实网站功能的网页智能体评测环境，用功能正确性而不是动作轨迹相似度来衡量 LLM Agent 是否真正完成了长程网页任务。

#### 🎯 核心要点
- 环境由 4 类全功能网站组成：电商 OneStopShop、论坛 Reddit、协作开发 GitLab、内容管理系统 CMS，并额外接入地图、计算器、记事本和知识库。
- 基准包含 241 个任务模板、812 个实例化高层自然语言意图，覆盖信息查找、站点导航、内容创建与配置操作。
- 观察空间支持 URL、标签页状态、HTML DOM、截图和 accessibility tree，允许文本型和多模态智能体在同一环境中比较。
- 动作空间模拟真实浏览器操作，包括点击、悬停、输入、快捷键、打开/关闭/切换标签页、前进后退和访问 URL。
- 评价方式以功能正确性为核心：信息查找用 exact_match、must_include、fuzzy_match；操作类任务用数据库/API/JavaScript locator 检查状态变化。
- 论文报告 GPT-4 最佳设置仅 14.41% 端到端成功率，而人类为 78.24%，说明真实网页长程任务仍显著挑战现有 LLM Agent。

#### 🔬 深入细节

![WebArena 总体框架图](https://ar5iv.labs.arxiv.org/html/2307.13854/assets/x1.png)
*图：WebArena 将自托管网站、工具、知识资源、Agent 动作和功能正确性验证组合成一个闭环网页环境。*

```python
# WebArena 评测闭环伪代码
for task in webarena_tasks:
    env.reset(seed=task.initial_state)
    intent = task.natural_language_intent
    trajectory = []

    for step in range(max_steps):
        obs = env.observe(mode="accessibility_tree")  # 或 screenshot / DOM / HTML
        action = agent.predict(intent=intent, observation=obs, history=trajectory)
        state = env.step(action)                      # click/type/goto/new_tab/...
        trajectory.append((obs, action, state))

        if action in ["STOP", "N/A"]:
            break

    score = task.evaluator(trajectory, env.final_state)
    record_success(task.id, score)
```

WebArena 的核心动机是补齐“网页智能体看起来会操作浏览器，但评测环境过于简化”的缺口。过去的网页导航或表单任务往往是静态缓存页面、玩具站点或只比较动作序列，导致智能体只要复现某条轨迹就可能得分；但真实网页任务经常存在多条有效路径，例如同一个 GitLab issue 可以通过搜索、项目页、个人任务列表等不同入口抵达。WebArena 因此把任务形式化为部分可观测决策过程：环境状态是完整网站后端与浏览器状态，智能体只能看到当前页面的部分观察，并连续产生动作。

$$
\mathcal{E}=(\mathcal{S},\mathcal{A},\mathcal{O},T),\quad o_t \sim \mathcal{O}(s_t),\quad s_{t+1}=T(s_t,a_t)
$$

这里的关键不是让模型预测“下一步标准答案动作”，而是让动作序列真的改变环境状态并满足用户意图。对于“把旅行路线写入某个仓库 README”这类任务，Agent 需要先在 Wikipedia 找到候选地点，再在地图中比较路线，最后在 GitLab 仓库里修改文件。单步点击准确率无法反映这种任务是否完成，因此论文将奖励设计为依赖最终状态和中间状态的功能判定：

$$
R(I,\tau)=\mathbf{1}\{\text{Eval}_I(s_0,s_1,\dots,s_T,\tau)=\text{success}\}
$$

观察空间是 WebArena 影响后续 Agent 研究的重要设计。论文没有强制使用单一表示，而是同时支持 raw HTML/DOM、截图和 accessibility tree。DOM 信息完整但冗长，截图保留视觉布局但需要视觉 grounding，accessibility tree 则保留角色、文本、可聚焦属性等结构化信息，并给元素分配 ID，使 `click [1582]` 这样的动作可以落到确定元素上。这种设计把网页交互拆成“理解页面语义”和“选择可执行控件”两个问题，便于比较纯文本 LLM、VLM 和混合智能体。

```text
WebArena action space:
- noop
- click(element_id or coordinate)
- hover(element_id or coordinate)
- type(element_id, text)
- press(key_combination)
- tab_focus(index)
- new_tab / tab_close
- go_back / go_forward
- goto(url)
```

评价机制是论文最值得关注的部分。信息查找任务输出文本答案，WebArena 根据答案类型选择精确匹配、必须包含或 LLM 辅助的 fuzzy_match；而站点导航、内容发布、配置修改等任务会检查真实网站状态，例如查询数据库、调用网站 API，或在页面上执行 JavaScript locator 抽取关键内容。这样做避免了“轨迹唯一性”假设：只要最终帖子出现在正确 subreddit 且正文包含要求内容，不管智能体如何导航，都应判为成功。

```python
# 操作类任务的功能正确性示例
url = locate_latest_post_url(user="current_user")
body = locate_latest_post_body(url)
score = must_include(url, "/f/nyc") and must_include(body, "a car in NYC")
```

与 MiniWoB++、WebShop、Mind2Web 等前序基准相比，WebArena 同时强调动态交互、真实网站功能、任务多样性和功能正确性。WebShop 具备交互和功能奖励，但主要围绕购物；Mind2Web 更真实但偏离线轨迹学习；WebArena 则把多个真实网站栈容器化，并提供确定性重置脚本，使不同模型能在同一初始状态下运行。这种可复现性非常关键，因为真实公网网站会不断变化、触发验证码、权限和内容漂移，无法公平比较模型。

> 💡 关键：WebArena 不是一个“网页问答集”，而是一个可执行的网页世界。Agent 的输出必须经由浏览器动作落到真实后端状态，最后由程序检查是否达成用户目标。

实验结果揭示了真实网页任务的几个失败模式：模型经常提前判断任务不可完成、在长程流程中丢失约束、重复无效动作、或在相似模板的不同实例上表现不稳定。论文中 GPT-4 加 CoT 并去除过强的不可达提示后达到 14.41%，仍远低于人类 78.24%。这说明 WebArena 的难点不只是页面理解，还包括规划、状态跟踪、跨网站信息整合、错误恢复和知道何时停止。

#### 🧪 练习题
```yaml
question: "WebArena 为什么主要使用功能正确性而不是动作轨迹相似度来评价 Agent？"
options:
  - "因为网页任务通常只有一条正确点击路径"
  - "因为同一用户意图可能有多条有效执行路径，最终状态是否满足目标更重要"
  - "因为 accessibility tree 不能表示网页元素"
  - "因为所有任务都只需要回答文本"
answer: 1
explain: "WebArena 的任务可通过不同导航路径完成，因此评价器检查数据库、页面内容或答案是否满足意图，而不是要求复现固定动作序列。"
```
