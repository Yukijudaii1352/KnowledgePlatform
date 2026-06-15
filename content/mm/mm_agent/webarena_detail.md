### WebArena

```yaml
id: webarena
name: WebArena
full_name: "网页竞技场 (WebArena)"
year: "2023"
org: "CMU"
paper_url: "https://arxiv.org/abs/2307.13854"
category: "web"
parent: "mind2web"
motivation: "长程推理基准模拟真实网站集群"
```

#### 📝 一句话总结

WebArena 构建了可复现、自托管、功能完整的网站环境和 812 个长程网页任务，用程序化验证器评估任务是否真正完成，解决以往 Web Agent 基准过度简化、只比对动作轨迹而不验证结果的问题。它把网页 Agent 评测从离线下一步预测推进到真实浏览器中的端到端执行。

#### 🎯 核心要点

- **自托管真实网站集群**：包含电商、社交论坛、协作开发平台、内容管理系统四类网站，并导入真实风格数据
- **辅助工具与知识资源**：提供地图、计算器、草稿板，以及 Wikipedia、网站手册等外部知识源
- **形式化环境**：WebArena 定义为 \(\mathcal{E}=\langle\mathcal{S},\mathcal{A},\mathcal{O},\mathcal{T}\rangle\)，底层网站决定确定性状态转移
- **多模态/多表示观察**：观察包括 URL、标签页、页面内容；页面内容可表示为 HTML DOM、截图或 accessibility tree
- **复合动作空间**：支持元素操作、标签页操作、URL 导航；元素可用坐标或自动生成的元素 ID 指定
- **功能正确性评测**：每个任务用程序化 validator 判断最终状态是否满足目标，允许不同有效执行路径
- **强基线仍表现有限**：GPT-4 最佳端到端成功率约 14.41%，显著低于人类 78.24%

#### 🔬 深入细节

##### 框架总览

![WebArena 环境概览](https://raw.githubusercontent.com/web-arena-x/webarena/main/media/overview.png)
*图：WebArena 官方概览。环境由多个可交互网站、工具、知识资源和任务验证器组成，用于评估长程网页 Agent。*

##### 算法流程

```python
# WebArena 端到端评测流程
def evaluate_agent(agent, task_config):
    env = ScriptBrowserEnv(
        observation_type="accessibility_tree",  # 也可使用 html 或 screenshot
        current_viewport_only=True,
    )
    obs, info = env.reset(options={"config_file": task_config})
    history = []

    for step in range(max_steps):
        prompt = build_prompt(
            intent=task_config["intent"],
            observation=obs,
            history=history,
        )
        action_text = agent.generate(prompt)
        action = parse_action(action_text)

        obs, _, terminated, _, info = env.step(action)
        history.append((action_text, obs["url"]))

        if terminated or is_repeated_invalid(history):
            break

    # 不是比对参考轨迹，而是检查最终网站状态
    return task_config["validator"](env.current_state())
```

##### 方法细节

**1. 动机与背景**

Mind2Web 提供真实网页快照和人类动作标注，但它仍是离线下一步预测。真实网页任务更难：Agent 会犯错、需要恢复、可能打开多个标签页、需要使用外部工具，并且同一个目标可以通过多条路径完成。WebArena 因此强调两个标准：环境要足够真实，评测要可复现。

可复现通过自托管实现。WebArena 不依赖实时公网网站，避免 CAPTCHA、页面更新、账号状态变化等问题；真实感通过使用开源网站系统和导入真实风格数据实现，例如 GitLab 风格的协作开发、论坛、电商和 CMS。

**2. 环境形式化**

论文将 WebArena 表示为：

$$
\mathcal{E}=\langle\mathcal{S},\mathcal{A},\mathcal{O},\mathcal{T}\rangle
$$

其中 \(\mathcal{S}\) 是网站状态，\(\mathcal{A}\) 是浏览器动作，\(\mathcal{O}\) 是 Agent 可见观察，\(\mathcal{T}:\mathcal{S}\times\mathcal{A}\rightarrow\mathcal{S}\) 是由底层网站实现决定的状态转移。给定高层意图 \(\mathbf{i}\)，Agent 在第 \(t\) 步基于当前观察 \(o_t\)、历史动作和历史观察输出动作 \(a_t\)。

这一形式化和传统 RL 环境相似，但 WebArena 的状态不是网格或模拟器对象，而是真实 Web 应用的数据库、页面路由、登录用户、标签页状态和页面内容。

**3. 观察空间与动作空间**

观察空间模拟浏览器体验：当前 URL、打开的标签页、焦点标签页内容。页面内容可以是 DOM、截图或 accessibility tree。论文基线主要使用 accessibility tree，因为它比完整 DOM 紧凑，同时保留角色、文本、属性和可交互信息。

动作空间分三类：元素操作包括 click、hover、type、按键组合；标签页操作包括新建、关闭、切换；导航操作包括访问 URL、前进、后退。元素可以用屏幕坐标指定，也可以用遍历 DOM/a11y tree 时生成的 ID 指定，例如 `click [1582]`。

**4. 任务与验证器**

WebArena 发布 812 个任务实例，来自模板化高层意图。任务不是“点击第几个按钮”，而是更接近日常工作，例如跨页面查找信息、修改项目设置、比较内容、在 CMS 中完成配置等。关键创新在评测：每个任务都有 validator 检查最终状态是否满足目标。

如果只比对参考动作序列，Agent 采用另一条正确路径会被错判；如果只让人主观判断，评测不可复现。程序化验证器在两者之间取得平衡：只要最终网站数据库或页面状态正确，就判定成功。

**5. 基线结果揭示的难点**

论文评测 GPT-3.5、GPT-4、PaLM-2 等模型，并比较 direct prompting、chain-of-thought、是否提示不可达任务等策略。即使 GPT-4 在最佳设置下也只有约 14.41% 端到端成功率，人类约 78.24%。失败常来自长程状态追踪不足、过早停下、重复无效动作、缺少探索和错误恢复。

> 💡 关键：WebArena 的难点不是单步元素选择，而是长程闭环执行。一个早期错误可能改变后续页面状态，Agent 必须发现并恢复。

#### 🧪 练习题

```yaml
question: "WebArena 相比 Mind2Web 最核心的评测差异是什么？"
options:
  - "WebArena 只评测网页截图分类"
  - "WebArena 在自托管浏览器环境中端到端执行，并用验证器检查最终功能正确性"
  - "WebArena 不允许 Agent 使用自然语言任务"
  - "WebArena 只包含单步点击任务"
answer: 1
explain: "Mind2Web 主要是离线下一步动作预测，WebArena 要求 Agent 在可交互网站中执行完整任务，并以最终状态验证是否达成目标。"
```
