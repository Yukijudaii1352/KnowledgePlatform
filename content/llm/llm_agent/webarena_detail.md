### WebArena：真实网站上的端到端浏览器智能体评测

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

WebArena 搭建可自托管的真实网站环境，让浏览器 Agent 通过观察网页、点击、输入和导航完成购物、论坛、GitLab、地图与知识查询等端到端任务。

#### 🎯 核心要点

- **核心问题**：真实网页任务包含页面状态、登录账户、复杂导航和长程依赖，静态网页问答无法充分评估 Agent。
- **环境组成**：WebArena 提供购物站点、后台管理、论坛、GitLab、地图、Wikipedia 镜像和主页任务入口。
- **动作空间**：Agent 可基于 accessibility tree、HTML 或截图观察页面，并执行点击、输入、导航等浏览器动作。
- **评测方式**：通过最终页面状态、URL、文本匹配或数据库状态变化判断任务是否成功。
- **代表意义**：它把 Web Agent 评测从 toy browser 推向更接近真实应用的自托管网站群。

#### 🔬 深入细节

![WebArena overview](https://raw.githubusercontent.com/web-arena-x/webarena/main/media/overview.png)

*图源：WebArena 官方 GitHub README，展示多网站环境、浏览器交互和自动评测结构。*

```python
def webarena_episode(agent, task):
    browser = launch_browser(task.start_url, account=task.account)
    observation = browser.observe(mode=agent.observation_mode)
    trace = []

    for step in range(task.max_steps):
        action_text = agent.predict(task.instruction, observation, trace)
        action = parse_browser_action(action_text)
        observation = browser.step(action)
        trace.append((action, observation))
        if action.type == "stop":
            break

    final_state = browser.snapshot()
    return task.success_function(final_state, trace)
```

**方法动机**：WebArena 认为网页 Agent 的难点在于端到端闭环，而不是单个页面元素理解。任务成功率可写成 $Success(\tau, s_T)$，其中 $\tau$ 是浏览器动作轨迹，$s_T$ 是最终网站状态；只要其中任一环节出错，最终任务就失败。

**真实网站设计**：WebArena 使用可自托管网站而不是远程在线网站，既保证可复现，又保留真实网页的复杂性。购物、论坛、GitLab、地图和 Wikipedia 等站点覆盖表单填写、筛选、搜索、代码仓库操作、路线查询和跨页面信息整合。

**观察与动作**：Agent 可读取 accessibility tree、HTML 或截图，并输出结构化浏览器动作。这个设计把网页任务拆成 perception、planning 和 action execution 三层；许多失败并不是模型不知道答案，而是找不到正确控件、动作格式错误或忘记页面状态。

**自动评测**：WebArena 不依赖人工主观打分，而是用 URL、页面文本、数据库状态和任务特定规则验证结果。这样既能规模化比较模型，也能定位失败轨迹，成为后续 Web Agent 和 GUI Agent 研究的重要基准。

#### 🧪 练习题

```yaml
question: WebArena 为什么强调自托管真实网站环境？
options:
  - A. 兼顾可复现性和接近真实网页任务的复杂交互
  - B. 只为了减少图片数量
  - C. 只测试静态文本摘要
  - D. 完全避免浏览器动作
answer: A
explain: 自托管环境让网站状态可控、结果可复现，同时保留真实网页导航和状态变化。
```
