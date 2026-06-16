### WebArena Verified
```yaml
id: webarena_verified
name: WebArena Verified
full_name: WebArena验证版 (WebArena Verified)
year: '2026'
org: CMU
paper_url: https://openreview.net/forum?id=mU4fB4znmC
category: frontier_2026
parent: webarena
motivation: 修复评估逻辑降低误报率11.3%
```

#### 📝 一句话总结
WebArena Verified 对 WebArena 的 812 个任务、参考答案和 evaluator 做系统审计，用结构化 JSON、类型感知精确匹配、后端状态验证和网络活动检查替换脆弱的字符串/页面文本判断，使网页 agent 评测更确定、更可复现。

#### 🎯 核心要点
- **全量任务审计**：覆盖 WebArena 原始 812 个任务，修复 reference alignment、任务歧义、宽松字符串匹配和不可达任务处理等问题。
- **结构化响应协议**：要求 agent 输出 JSON，显式区分任务类型、成功状态、检索结果和错误状态，减少自由文本解析误差。
- **类型感知匹配**：将 substring matching 替换为 exact/normalized matching，按数字、日期、货币、URL、坐标等类型归一化比较。
- **真实状态验证**：对 mutation 类任务使用 REST API 或数据库查询验证后端状态，而不是只检查页面文本是否出现。
- **活动与不可达校验**：用 network trace 确认 agent 访问目标站点，并用显式状态码替代含混的 `N/A`。
- **Verified Hard 子集**：构造 258-task hard subset，在保持区分度和覆盖面的同时降低评测运行成本。

#### 🔬 深入细节

##### 框架总览

![WebArena Verified 环境控制界面](https://raw.githubusercontent.com/ServiceNow/webarena-verified/main/docs/assets/env-ctrl-dashboard-cropped.png)
*图：WebArena Verified 官方仓库中的环境控制界面。Verified 版本保留 WebArena 的容器化网站环境，但围绕任务定义、agent 响应和 evaluator 证据链重做确定性评分。*

##### 评测流程

```python
# WebArena Verified 的确定性评分伪代码
def evaluate_verified(task, agent_json, network_trace, backend):
    response = validate_json_schema(agent_json)
    if not response.valid:
        return Score(value=0, status="PARSE_ERROR")

    if not visited_required_site(network_trace, task.required_sites):
        return Score(value=0, status="NO_VALID_ACTIVITY")

    if response.status != "SUCCESS":
        return score_explicit_status(task, response.status, network_trace)

    if task.kind == "retrieve":
        expected = normalize(task.expected_value, task.value_type)
        actual = normalize(response.retrieved_data, task.value_type)
        return Score(value=int(actual == expected), status="MATCHED")

    if task.kind == "mutate":
        state = backend[task.site].query(task.check_spec)
        ok = verify_backend_state(state, task.expected_state)
        return Score(value=int(ok), status="STATE_VERIFIED")
```

WebArena 原始版本的重要贡献是提供真实、自托管、可重置的网站环境，让 agent 在浏览器中完成购物、论坛、GitLab、CMS、地图等长程任务。但当模型能力和排行榜竞争提升后，评测器本身的噪声会开始主导结论。WebArena Verified 的论文把问题归为三类：任务规格不清或参考答案错配、评测机制过宽或缺上下文、报告方式缺少不确定性和失败模式拆解。

审计结果显示，原 benchmark 中存在多种会造成误判的模式。reference alignment 问题会让正确完成目标的 agent 被错判；任务歧义会让多个合理答案只有一个被接受；substring matching 会把 `2` 与 `2000`、`Yes` 与包含否定的推理文本混淆；页面文本检查如果不绑定字段上下文，也可能因为目标字符串出现在错误字段而误判成功。Verified 的目标不是降低任务难度，而是让“成功”真正对应任务目标达成。

结构化响应协议是第一层修复。agent 不再只给出一段自由文本，而是输出符合 schema 的 JSON，例如任务类型、`SUCCESS`/错误状态、`retrieved_data` 等字段。这样 evaluator 可以把“格式不可解析”“agent 明确认为不可达”“检索值错误”“状态修改未生效”拆成不同失败模式。形式上，评分从自由文本函数
$$
s=\mathrm{judge}(\mathrm{text},r)
$$
改成了带 schema 和证据约束的确定性函数
$$
s=\mathbf{1}\left[\mathrm{Verify}\bigl(\mathrm{Normalize}(a,\tau),\mathrm{Normalize}(r,\tau),e\bigr)\right],
$$
其中 \(a\) 是 agent 输出，\(r\) 是参考目标，\(\tau\) 是值类型，\(e\) 是网络 trace 或后端状态证据。

第二层修复是类型感知 exact matching。对于检索类任务，日期、货币、数字、URL、坐标等值会先归一化，再做精确比较。这样 `$1,000.00` 与 `1000 USD` 可以被看作等价，但 `2` 不会因为是 `2000` 的子串而过关。这个变化减少了宽松匹配带来的 false positive，也减少了格式差异带来的 false negative。

第三层修复是后端状态验证。状态修改类任务的正确性取决于系统真实状态，例如商品是否加入购物车、issue 是否被创建、地址字段是否被正确修改。只看页面文本会遗漏字段位置和数据库事实；Verified 改用 REST API 或数据库查询检查目标字段，使验证对象从“页面上出现了某个字符串”变成“系统状态满足目标谓词”：
$$
\mathrm{StatePass}=\mathbf{1}\{Q_{\mathrm{backend}}(S_{\mathrm{final}})=S^\star\}.
$$

网络活动检查和不可达任务处理解决另一个漏洞：agent 不能只凭参数知识回答网页任务，也不能过早输出 `N/A` 获得分数。Verified 用 network trace 检查是否访问了相关站点，对不可达任务要求显式状态码和足够探索证据。论文同时推荐按 template 做 macro average 并报告 95% 置信区间：
$$
\mathrm{cSR}_{\mathrm{tmpl}}=\frac{1}{T}\sum_{t=1}^{T}\mathrm{SR}_t.
$$
这比简单按任务平均更能避免高频模板掩盖长尾失败。

> ⚠️ 注意：论文摘要报告新 evaluator 相比原始评分管线将 false-negative rate 降低 11.3 个百分点；本文件的 YAML `motivation` 按任务输入原样保留。

#### 🧪 练习题
```yaml
question: "WebArena Verified 为什么用后端状态验证替代页面文本检查？"
options:
  - "因为状态修改任务的正确性取决于真实数据库/API 状态，而不是某个字符串是否出现在页面上"
  - "因为后端状态验证可以让 agent 不打开浏览器也得分"
  - "因为页面文本检查只能用于移动端 App"
  - "因为 WebArena Verified 删除了所有检索任务"
answer: 0
explain: "页面文本可能出现在错误字段或无关区域。后端查询能直接验证目标字段和系统状态是否满足任务要求。"
```
