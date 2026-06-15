### Online-Mind2Web

```yaml
id: online_mind2web
name: Online-Mind2Web
full_name: "在线思维到网页 (Online-Mind2Web)"
year: "2026"
org: "OSU"
paper_url: "https://www.emergentmind.com/papers/2504.01234"
category: "frontier_2026"
parent: "mind2web_2"
motivation: "136个高流量网站的实时环境基准"
```

#### 📝 一句话总结

Online-Mind2Web 提出一个覆盖 136 个真实高流量网站、300 个在线任务的 web agent 基准，并提出 WebJudge 自动评估方法来缓解在线环境人工评测昂贵的问题。它指出此前静态或短程基准高估了 web agent 能力，当前前沿 agent 在真实在线任务上仍多只能完成约三成任务。

#### 🎯 核心要点

- 构建 300 个多样真实任务，来自 136 个网站，覆盖购物、餐饮、住房、交通等实际用户需求
- 任务运行在 live web 上，持续更新失效、CAPTCHA 或网站变化导致不可用的任务
- 提出 WebJudge 自动评价器：Key Point Identification、Key Screenshot Identification、Outcome Judgment 三阶段
- 通过选择关键截图缓解长轨迹截图过多导致的上下文爆炸
- WebJudge 与人类判断约 85% 一致，高于常见 GPT-4o accessibility tree judge、rule-based 和 WebVoyager 式自动评价
- 详细分析前沿 agent 的失败模式，包括数值/时间约束敏感、探索不足、重复操作、关键词搜索依赖过强

#### 🔬 深入细节

##### 框架总览

![Online-Mind2Web WebJudge 流程](https://raw.githubusercontent.com/OSU-NLP-Group/Online-Mind2Web/main/images/WebJudge.jpg)
*图：WebJudge 先抽取任务关键点，再选择关键截图，最后结合轨迹和截图判断任务是否完成。*

清单中的 emergentmind URL 指向了另一个 arXiv 2504.01234 光网络论文；Online-Mind2Web 的实际论文是 `An Illusion of Progress? Assessing the Current State of Web Agents`，arXiv ID 为 `2504.01382`。本文按 Online-Mind2Web 官方仓库和论文解读，元信息字段保持清单原样。

##### WebJudge 伪代码

```python
# Online-Mind2Web 自动评价流程
for task, trajectory, final_answer in submissions:
    key_points = llm.identify_key_points(task.instruction, task.reference)

    key_screens = []
    for step in trajectory:
        if is_informative(step.screenshot, step.action, key_points):
            key_screens.append(step.screenshot)

    key_screens = compress_or_rank(key_screens, max_images=K)
    judgment = llm.judge_outcome(
        task=task.instruction,
        key_points=key_points,
        screenshots=key_screens,
        action_history=trajectory.actions,
        answer=final_answer,
    )
    score = parse_success_or_failure(judgment)
```

##### 方法细节

Online-Mind2Web 的出发点是“进步幻觉”：许多 web agent 在静态、缓存或短程基准上分数提升，但这些提升不一定能迁移到用户每天访问的真实网站。真实网站会改版、弹窗、反爬、地区限制，且任务常常需要在多个页面中比较筛选。Online-Mind2Web 因此把评测放回 live web，并对任务做持续维护。

任务集合包含 300 个任务、136 个热门网站，领域覆盖衣食住行等普通用户需求。每个任务不只考察“能不能点到某个按钮”，还要求满足约束，例如价格范围、尺寸、评分、时间、库存、地理位置等。论文将 agent 的成功率与人类评估对齐后发现，前沿 agent 仍远低于人类，很多系统在真实在线任务上的成功率约在 30% 附近。

在线评测难点是人工评估成本极高。一个 agent 的轨迹可能有几十步，每步都有截图、URL、动作和思考。如果把全部截图塞给 LLM judge，会超出上下文或引入大量无关视觉噪声。WebJudge 的核心设计就是先做任务关键点抽取，再从轨迹中选出与这些关键点相关的关键截图，只保留足够判断成功/失败的视觉证据。

WebJudge 的三阶段分别对应评价中的三个瓶颈。Key Point Identification 把任务拆成必须满足的条件；Key Screenshot Identification 找到能证明这些条件是否满足的截图，例如筛选器状态、商品详情页、提交确认页；Outcome Judgment 最后综合任务、关键点、关键截图、动作历史和最终答案判定成功或失败。这样既保留视觉证据，又避免无差别塞入全轨迹。

论文还提出效率指标，比较 agent 成功任务所需步数与参考轨迹长度。结果显示，失败轨迹通常明显更长，常由重复动作、弹窗干扰或导航偏离导致。强探索型 agent 更可能找到正确路径但耗时较长；贪心型 agent 步数少，但容易过早停止或陷入死路。这个结论对后续 RL/RFT 很重要：评价器不应只奖励最终成功，也要能区分无效探索和必要探索。

> ⚠️ 注意：Online-Mind2Web 与 Mind2Web-2 的侧重点不同。前者强调 live web 操作任务与轨迹评价，后者强调长程 agentic search 答案及引用归因。

#### 🧪 练习题

```yaml
question: "WebJudge 为什么需要 Key Screenshot Identification？"
options:
  - "为了完全丢弃 agent 的动作历史"
  - "为了只保留与任务关键点相关的视觉证据，避免长轨迹截图造成上下文过载"
  - "为了把网页任务转换成纯文本问答"
  - "为了让所有任务都不再需要人工抽查"
answer: 1
explain: "在线 web agent 轨迹很长，全部截图会带来上下文和噪声问题；筛选关键截图能提高自动评价的可扩展性和一致性。"
```
