### WebArena Verified

```yaml
id: webarena_verified
name: WebArena Verified
full_name: "WebArena验证版 (WebArena Verified)"
year: "2026"
org: "CMU"
paper_url: "https://openreview.net/forum?id=mU4fB4znmC"
category: "frontier_2026"
parent: "webarena"
motivation: "修复评估逻辑降低误报率11.3%"
```

#### 📝 一句话总结

WebArena Verified 对 WebArena 的 812 个任务、参考答案和评测器做系统审计，用结构化 JSON、类型感知匹配、后端状态校验和网络活动追踪替换脆弱字符串/DOM 检查。它解决了原始 WebArena 因任务歧义、检查器错配和宽松匹配导致的误判问题，使 web agent 评估更确定、可复现。

#### 🎯 核心要点

- 审计全部 812 个 WebArena 任务，修复 46 个 reference alignment 问题并澄清 211 个歧义任务
- 用结构化响应协议约束 agent 输出，字段包含任务类型、状态、结果和错误细节
- 用类型感知 exact matching 替换宽松 substring matching，支持日期、货币、坐标等语义归一化
- 对状态修改任务使用 REST API 或数据库查询做 backend state verification，减少 DOM/页面文本误判
- 对不可达任务用显式 status code 替代含混的 `N/A`，区分真正找不到和过早放弃
- 引入 WebArena Verified Hard 子集，保留高难度任务并显著降低评测成本

#### 🔬 深入细节

##### 框架总览

![WebArena Verified 环境控制界面](https://raw.githubusercontent.com/ServiceNow/webarena-verified/main/docs/assets/env-ctrl-dashboard-cropped.png)
*图：WebArena Verified 公开仓库中的环境控制界面。论文方法的核心是围绕同一容器化环境强化任务、输出和评测器的确定性。*

清单中的 OpenReview ID 与当前公开页面不一致；本文依据公开的 WebArena Verified OpenReview 论文页、PDF 和官方仓库撰写，元信息保持清单原样。论文报告的主要方向是 benchmark verification，而不是提出新 agent：它保留 WebArena 的自托管网站环境，但重写任务定义、响应协议和评测器，使分数更接近真实任务完成情况。

##### 评测器伪代码

```python
# WebArena Verified 的确定性评分流程
def evaluate(task, agent_response_json, network_trace, backend_clients):
    response = parse_schema(agent_response_json)
    if not response.valid:
        return Score(status="PARSE_ERROR", value=0)

    if not interacted_with_required_site(network_trace, task.required_sites):
        return Score(status="NO_VALID_ACTIVITY", value=0)

    if response.status != "SUCCESS":
        return handle_explicit_error_status(task, response.status)

    if task.kind == "retrieve":
        expected = normalize(task.expected_value, task.value_type)
        actual = normalize(response.retrieved_data, task.value_type)
        return exact_compare(expected, actual)

    if task.kind == "mutate":
        state = backend_clients[task.site].query(task.check_spec)
        return verify_backend_state(state, task.expected_state)
```

##### 方法细节

WebArena 原始版本的优势是环境真实、可复现：它提供购物、论坛、GitLab、CMS、地图等容器化网站，让 agent 通过浏览器完成长程任务。但随着 agent 能力提升，评估问题变得突出。论文把问题拆成三类：任务规格问题、评测机制问题和报告问题。任务规格问题包括参考答案与任务目标不一致、指令有多种合理解释；评测机制问题包括 substring matching 过宽、页面文本检查缺少字段上下文、不可达任务的 `N/A` 被滥用；报告问题则是缺少置信区间和失败模式分析。

系统审计结合人工标注与轨迹分析。作者查看高排名 agent 的公开轨迹，重点排查“所有 agent 都失败”或“通过方式明显异常”的任务，并用四名研究者做任务级双标与仲裁。结果显示，46 个任务存在 reference alignment 问题，211 个任务存在歧义，340 个任务受宽松字符串匹配影响，92 个任务存在 context-free 页面内容检查，36 个任务是不可达任务。

Verified 版本的第一项修改是结构化响应协议。agent 不再自由输出一段文本，而要给出 JSON，明确 `task_type`、`status`、`retrieved_data` 或错误信息。这样做把“内容是否正确”和“格式是否可解析”分开，解析失败、状态矛盾、错误状态都能成为独立失败模式，而不是混在一个 LLM judge 分数里。

第二项修改是类型感知比较与后端验证。检索任务对日期、货币、数字、坐标等值做归一化后 exact match，例如 `$1,000.00` 与 `1000 USD` 可以视作一致，但 `2` 不会被 `2000` 的子串误命中。状态修改任务则直接查询数据库或 REST API，而不是只检查页面上某个字符串是否出现，从而避免 agent 把值写进错误字段也被判成功。

第三项修改是网络活动与不可达任务处理。WebArena 的目标是评估网页交互能力，因此 knowledge-only agent 不应该只凭参数知识回答就得分；Verified 用网络 trace 检查 agent 是否真的访问了目标站点。对不可达任务，显式状态码取代 `N/A`，并结合探索充分性减少策略性放弃。论文还提供 template-level macro average、95% 置信区间和 failure-mode breakdown，使不同 agent 的比较更稳健。

> ⚠️ 注意：WebArena Verified 的价值在于修正度量，而不是让任务变简单。一个 agent 在 Verified 上分数下降，可能表示旧评测高估；分数上升，也可能表示旧检查器造成 false negative。

#### 🧪 练习题

```yaml
question: "WebArena Verified 为什么用后端状态验证替代页面文本检查？"
options:
  - "因为后端查询可以直接判断真实系统状态，避免文本出现在错误字段也被误判成功"
  - "因为后端查询能让 agent 不需要打开浏览器"
  - "因为页面文本检查只能用于移动端 App"
  - "因为所有任务都被改成了单步检索任务"
answer: 0
explain: "状态修改任务的正确性取决于数据库/API 中的真实目标字段，而不是页面上是否出现某个字符串。"
```
