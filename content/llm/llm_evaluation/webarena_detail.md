### WebArena：真实网页环境中的自治 Agent 评测

```yaml
id: webarena
name: WebArena
full_name: 网页交互竞技场 (WebArena)
year: '2024'
org: CMU
paper_url: https://arxiv.org/abs/2307.13854
category: frontier_2026
parent: —
motivation: 真实网页环境订票数据分析任务
```

#### 📝 一句话总结

WebArena 提出了一个可自托管、可复现的真实网页交互环境，用 812 个长程高层自然语言任务评测 Web Agent 是否真正完成目标，而不是只匹配动作轨迹。

#### 🎯 核心要点

- 构建 4 类完整网站：电商 OneStopShop、社交论坛、GitLab 协作开发、CMS 内容管理系统
- 额外提供地图、计算器、scratchpad、Wikipedia 与用户手册等工具/知识资源，逼近人类网页任务工作流
- 观察空间支持 URL、多标签页、HTML/DOM、截图和 accessibility tree，基线主要使用带元素 ID 的无障碍树
- 动作空间覆盖点击、悬停、输入、按键、滚动、标签页切换、历史前进后退和 URL 跳转
- 基准包含 241 个任务模板、812 个实例，分为信息查找、站点导航、内容与配置操作三大类
- 评测以功能正确性为核心：文本答案用 exact/must_include/fuzzy_match，交互任务用数据库/API/JavaScript locator 检查最终状态
- Docker 化自托管环境可重置到确定性初始状态，避免真实网站验证码、页面变更和数据漂移
- 论文基线显示 GPT-4 Web Agent 最高仅 14.41% 成功率，人类为 78.24%，说明真实网页长程操作仍远未解决

#### 🔬 深入细节

![WebArena 跨网站长程任务示例](https://webarena.dev/static/images/tasks.png)
*图：WebArena 官方项目页的任务示例。一个典型长程任务需要先在 Wikipedia 查找博物馆，再用地图规划路线，最后把结果写入 GitLab 仓库。*

```python
# WebArena 评测流程伪代码
def evaluate_webarena(agent, task, env, max_steps=30):
    env.reset(task.initial_state)
    history = []

    for step in range(max_steps):
        obs = env.observe(mode="accessibility_tree", include_element_ids=True)
        action = agent.act(
            intent=task.intent,
            observation=obs,
            history=history,
        )

        if action.name == "stop":
            break

        next_obs = env.step(action)
        history.append((obs, action, next_obs))

    located_state = task.locator(env.state, env.browser)
    return task.validator(located_state, agent.final_answer)
```

WebArena 的动机是把 Web Agent 从“玩具网页”推向可复现的真实网页任务。过去很多环境要么是简化 DOM，要么是静态缓存页面，要么只要求模型复现参考动作序列；这些设置会低估真实网页中多页面导航、跨站点信息整合、权限状态、失败恢复和替代路径的复杂性。WebArena 因此选择自托管真实网站实现，并用 Docker 和环境重置脚本保证不同模型面对同一初始状态。

形式上，WebArena 可以看作一个交互式环境 \(\mathcal{E}=(\mathcal{S}, \mathcal{A}, \mathcal{O}, T)\)。给定自然语言意图 \(I\)，Agent 在第 \(t\) 步根据当前观察 \(o_t\)、历史 \(h_t\) 和意图输出动作 \(a_t=\pi(I,o_t,h_t)\)，环境由底层网站逻辑确定性转移到新状态。关键区别在于奖励不是“动作像不像人类轨迹”，而是 \(R(I,s_{0:T},a_{1:T})\) 是否满足意图指定的最终状态。

环境层面，论文把网页操作拆成浏览器观察和浏览器动作两部分。观察可以是 DOM、截图或 accessibility tree；accessibility tree 保留按钮、链接、输入框等语义信息，同时比完整 DOM 短得多，适合文本 LLM。动作既可以通过坐标定位，也可以通过元素 ID 定位，例如 `click [1582]`，这样把元素选择转化为有限分类问题，减少模型输出自然语言定位导致的歧义。

任务层面，WebArena 不是收集“点击某按钮”这类局部指令，而是从真实浏览历史和网站功能出发，标注高层 intent 模板并实例化变量。例如电商任务可能要求计算历史订单花费，GitLab 任务可能要求创建仓库并写 README，跨站点任务可能同时用 Wikipedia、地图和 GitLab。812 个任务中既有可完成任务，也有不可完成任务，用来测试 Agent 是否会在证据不足时停止而不是编造。

评测层面是这篇论文最重要的设计。信息查找任务返回文本答案，使用精确匹配、必须包含和 GPT-4 辅助的语义 fuzzy match；站点导航和内容配置任务则通过 locator 找到数据库记录、API 返回值或页面 DOM 片段，再检查 URL、正文、配置项、订单状态等是否满足约束。这让多条不同路径都可能得分，只要最终功能结果正确。

> 💡 关键：WebArena 把 Web Agent 评测从“下一步动作预测”提升到“真实环境中的端到端任务完成”。这也是 GPT-4 只有 14.41% 成功率的重要原因：模型不仅要理解页面，还要规划、回溯、跨标签页整合信息，并在错误操作后恢复。

#### 🧪 练习题

```yaml
question: "WebArena 为什么强调功能正确性评测，而不是只比较 Agent 的动作序列？"
options:
  - "因为网页动作序列没有办法被记录"
  - "因为同一个网页目标可能存在多条有效完成路径，动作表面形式不唯一"
  - "因为所有任务都只需要输出一个文本答案"
  - "因为 WebArena 不支持程序化验证"
answer: 1
explain: "真实网页任务通常有多种可行路径。WebArena 用最终网页/数据库状态验证目标是否达成，能兼容替代路径，比轨迹匹配更贴近真实任务完成。"
```
