/**
 * multi_agent-data.js — 由 pipeline/build.py 于 2026-06-15 17:41:25 自动生成。
 * 源文件：content/agent/multi_agent.md
 * ⚠️  请勿手动修改；如需更新，修改源文档后重新编译。
 */
window.PAGE_CONFIG = {
  "meta": {
    "domain": "agent",
    "topic_id": "multi_agent",
    "topic_name": "多智能体协作",
    "page_title": "多智能体协作技术演进",
    "page_subtitle": "2026-06-15 版",
    "page_desc": "围绕角色分工、群体决策、通信拓扑与开放协议，梳理LLM多智能体从角色扮演、SOP工作流、辩论投票，到A2A互操作、层级决策与协同训练的演进主线。",
    "page_icon": "🤝",
    "hero_pills": [
      "🏷️ Role Playing · Workflow · Debate · Voting",
      "Topology · A2A · Hierarchy · Multi-Agent RL"
    ],
    "count_pill": "{count} 个算法",
    "image_base": "",
    "overview_from_doc": true,
    "latest_overview_from_doc": true
  },
  "overview": [
    {
      "title": "",
      "body_html": "<h1>超越单体智能｜多智能体系统的协作、归因与自我演化综述</h1>\n<ul>\n<li>来源平台: <strong>zhihu</strong>（知乎专栏文章）</li>\n<li>原文链接: <a href=\"https://zhuanlan.zhihu.com/p/2044492630315229734\">https://zhuanlan.zhihu.com/p/2044492630315229734</a></li>\n<li>作者: 机器之心</li>\n</ul>\n<hr />\n<p>超越单体智能｜多智能体系统的协作、归因与自我演化综述</p>\n<h1>超越单体智能｜多智能体系统的协作、归因与自我演化综述</h1>\n<p>作者: 机器之心, 赞: 5</p>\n<p><img alt=\"\" src=\"https://pica.zhimg.com/v2-276e22677b6e6fad58011b51b9464000_1440w.jpg\" /></p>\n<p><strong>本文由西安交通大学 MOE KLINNS Lab 联合华中师范大学、联想人工智能技术中心、悉尼大学等机构的研究者共同完成。共同第一作者为齐世豪、马杰、邢瑞、郭威、黄潇，通讯作者为来自西安交通大学网络空间安全学院的马杰特聘研究员（副教授）。</strong></p>\n<p>过去两年，AI 智能体正在从「会对话的模型」变成能够理解任务、拆解步骤、调用工具、维护记忆并根据反馈调整行为的系统。当任务复杂到单个智能体难以完成时，研究者开始把多个智能体组织起来，让它们分工协作。 但系统规模扩大后，问题也随之复杂。</p>\n<p>任务失败时，错误可能来自智能体能力、角色分配、通信过程、工具调用，也可能在多轮交互中被逐步放大。更进一步，系统能否根据失败经验调整角色、通信结构或协作流程，仍是当前研究面临的重要问题。</p>\n<p>围绕这些问题，研究团队撰写了一篇系统综述，面向 LLM 多智能体系统提供了一个完整的观察框架：从单个智能体的能力基础，到多智能体协作，再到系统失败后的归因，以及基于失败经验的自我演化。</p>\n<p><img alt=\"\" src=\"https://pic1.zhimg.com/v2-f979636bcf81601b2063dab5fa22032e_1440w.jpg\" /></p>\n<ul>\n<li>论文标题：Beyond Individual Intelligence: Surveying Collaboration, Failure Attribution, and Self-Evolution in LLM-based Multi-Agent Systems</li>\n<li>论文链接： <a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2605.14892\">https://arxiv.org/abs/2605.14892</a></li>\n<li>项目仓库： <a href=\"https://link.zhihu.com/?target=https%3A//github.com/mira-ai-lab/awesome-mas-life\">https://github.com/mira-ai-lab/awesome-mas-life</a></li>\n</ul>\n<p><img alt=\"\" src=\"https://picx.zhimg.com/v2-bc16085677fa9b7d43339efb15fabca1_1440w.jpg\" /></p>\n<p><em>图 1：LIFE 框架总览图</em></p>\n<p><strong>一、多智能体系统，不只是「多几个 Agent」</strong></p>\n<p>今天的 LLM 智能体，已经不再是简单的输入输出模块。围绕大语言模型，研究者加入了推理、记忆、规划、工具使用等机制，使其能够理解任务、制定计划、调用外部工具，并根据执行结果调整后续动作。这些能力构成了多智能体系统的基础。推理能力决定智能体能否处理复杂指令，记忆能力决定它能否利用历史信息，规划能力决定它能否拆解长程任务，工具使用能力则决定它能否突破模型自身的知识和执行边界。</p>\n<p>如果缺少稳定的单体能力，多智能体协作很容易变成多个不稳定模块的叠加。协作并不会自动带来更强的智能，反而可能放大错误、增加沟通成本，并让系统表现更难预测。</p>\n<p><img alt=\"\" src=\"https://pic2.zhimg.com/v2-e73377aea79da0c3891f7aa0ad941e51_1440w.jpg\" /></p>\n<p><em>图 2：LLM-based Agent 的能力模块示意图</em></p>\n<p><strong>二、协作：让智能体从个体走向组织</strong></p>\n<p>多智能体系统的核心首先是<strong>协作</strong>。</p>\n<p>在现有研究中，协作机制通常围绕角色、通信、调度和交互模式展开。角色决定不同智能体的职责，通信决定信息如何在智能体之间流动，调度决定任务如何推进，交互模式则与具体任务密切相关。代码生成、科学发现、网页操作、复杂问答、游戏环境，对协作方式的要求并不相同，很难依靠一种固定流程覆盖所有场景。</p>\n<p>这些设计让智能体从「单点能力」进入「组织能力」。它们不再只是各自输出答案，而是通过分工、沟通和调度共同完成更复杂的目标。与此同时，协作也会放大系统的不确定性。一个早期判断可能影响后续分工，一次不完整的信息传递可能改变整个任务路径，一个工具调用错误也可能被后续智能体继续引用。多智能体系统越像一个组织，就越需要理解组织内部的问题从何而来。</p>\n<p><img alt=\"\" src=\"https://pic4.zhimg.com/v2-e1b628ab65ef0e3a918b9c9062e35c3d_1440w.jpg\" /></p>\n<p><em>图 3：多智能体协作中的角色、通信与调度结构</em></p>\n<p><strong>三、归因：理解失败，而不只是记录失败</strong></p>\n<p>在单智能体系统中，失败往往可以回到一个相对清晰的输入输出过程里分析。但在多智能体系统中，失败很少只来自一个孤立步骤。一个早期错误判断可能影响后续任务分解，一次不准确的工具调用也可能被后续智能体当成可靠证据继续使用。</p>\n<p>因此，多智能体系统需要的不只是最终评测分数，还需要对失败过程的分析。故障归因要追问的是：失败发生在哪个阶段？涉及哪些智能体？错误来自能力不足、角色设计、通信机制、调度策略，还是环境交互？错误又是如何在系统内部传播的？</p>\n<p>现有很多研究更关注如何构造协作流程、如何提高最终性能，却较少讨论系统失败之后如何诊断。但如果没有归因，多智能体系统的改进就很容易变成盲目试错。系统表现不好，并不直接说明应该改模型、改提示词、改角色分工、改通信协议，还是改整个组织结构。在这篇综述中，归因被放在协作与演化之间，作用是把系统失败转化为可诊断、可修复的问题。</p>\n<p><img alt=\"\" src=\"https://pica.zhimg.com/v2-3796219b71ba30fe7d441c25b8d4bd6c_1440w.jpg\" /></p>\n<p><em>图 4：多智能体系统中的错误传播与故障归因示意图</em></p>\n<p><strong>四、自我演化：从修正输出，到改进系统</strong></p>\n<p>如果归因关注「哪里出了问题」，自我演化关注的则是「系统如何因此变得更好」。很多智能体系统已经引入了反思机制：模型总结失败原因，修改下一轮回答，或者调整提示词。这类方法有价值，但对于多智能体系统来说还不够。</p>\n<p>因为多智能体系统的改进对象不只是某个智能体的输出，也可能是整个系统结构。</p>\n<ul>\n<li><strong>Agentic Self-Evolution</strong>：面向单个智能体自身的演化，主要更新提示词、记忆或参数等内部组件，让智能体在后续任务中表现得更稳定。</li>\n<li><strong>Systemic Self-Evolution</strong>：面向多智能体系统内部结构的演化，关注通信拓扑、智能体组合、共享记忆等系统级组件，让多个智能体之间的协作方式能够随任务和反馈调整。</li>\n<li><strong>Meta Self-Evolution</strong>：面向系统设计空间的演化，通过积累历史设计经验或训练生成器，自动产生更适合不同任务的多智能体架构。</li>\n</ul>\n<p>这意味着，多智能体系统的自我演化并不只是「让模型反思」一下。它更接近一种系统级调整：根据任务表现和失败反馈，持续修改自身的行为、结构和协作方式。</p>\n<p><img alt=\"\" src=\"https://picx.zhimg.com/v2-6fdbd91dc3f06c50f2258a2378ca012d_1440w.jpg\" /></p>\n<p><em>图 5：从失败归因到系统自我演化的闭环</em></p>\n<p><strong>五、LIFE 框架：理解多智能体系统的完整生命周期</strong></p>\n<p>这篇综述提出的 LIFE progression，可以理解为对 LLM 多智能体系统运行过程的一种梳理。它包含四个连续阶段：</p>\n<ul>\n<li><strong>Individual Intelligence</strong>：个体智能，关注单个智能体的推理、记忆、规划和工具使用能力；</li>\n<li><strong>Multi-Agent Collaboration</strong>：多智能体协作，关注角色、通信、调度和交互机制；</li>\n<li><strong>Failure Attribution</strong>：故障归因，关注系统失败后的定位、解释和诊断；</li>\n<li><strong>Self-Evolution</strong>：自我演化，关注系统如何根据反馈持续调整自身。</li>\n</ul>\n<p>以往综述往往分别讨论个体能力、多智能体协作或自我改进。LIFE 框架则把这些方向放到同一个生命周期中观察：个体能力提供协作基础，协作机制带来系统级复杂性，故障归因让失败过程变得可分析，自我演化则把诊断结果转化为后续改进。</p>\n<p>因此，LIFE 关注的不只是「有哪些方法」，而是一个多智能体系统如何运行、如何失败，以及如何在失败之后调整。</p>\n<p><strong>六、未来展望</strong></p>\n<p>LLM 多智能体系统已经展示出处理复杂任务的潜力，但要走向长期可靠的应用，仍需要在几个关键方向上继续推进。</p>\n<ul>\n<li><strong>更全面的评测体系</strong>：现有评测仍然偏重任务成功率，而多智能体系统还需要考察通信效率、角色贡献、错误传播、环境适应性和长期稳定性。</li>\n<li><strong>更灵活的协作结构</strong>：当前很多系统仍依赖人工设定角色、流程和通信方式。未来的系统需要根据任务需求动态调整组织方式，包括角色分配、通信路径、调度策略和协作结构。</li>\n<li><strong>更有效的归因与修复闭环</strong>：多智能体系统的失败往往跨越多个角色和多轮交互。归因的价值不应停留在解释错误，而应进一步指导系统修复，例如调整提示词、重新分配角色、修改工具调用方式或优化整体流程。</li>\n<li><strong>更可控的自我演化机制</strong>：当系统开始调整自身结构时，效率、安全和对齐问题会变得更加重要。未来的自我演化不能只是搜索更高性能的结构，还需要在成本、稳定性和可控性之间取得平衡。</li>\n</ul>"
    }
  ],
  "latest_overview": [
    {
      "title": "",
      "body_html": "<h1>Multi-Agents 多智能体系统设计模式：现状、发展与展望</h1>\n<ul>\n<li>来源平台: <strong>zhihu</strong>（知乎专栏文章）</li>\n<li>原文链接: <a href=\"https://zhuanlan.zhihu.com/p/2033960080207521059\">https://zhuanlan.zhihu.com/p/2033960080207521059</a></li>\n<li>作者: Magicalion</li>\n</ul>\n<hr />\n<p>Multi-Agents 多智能体系统设计模式：现状、发展与展望</p>\n<h1>Multi-Agents 多智能体系统设计模式：现状、发展与展望</h1>\n<p>作者: Magicalion, 赞: 2</p>\n<h2>多智能体系统设计模式：现状、发展与展望</h2>\n<p><strong>日期</strong>：2026-05-01 <br />\n<strong>研究范围</strong>：Multi-Agent System 设计模式 · 委派架构 · 四大框架对比 · 平台分析</p>\n<h3>一、引言：为什么多智能体突然重要了</h3>\n<p>2025年12月，Andrej Karpathy 在社交媒体上分享了他的编程方式发生了”量子跳跃”：从80%手工编码，转变为80%由AI Agent驱动。他称之为”用英语编程”——需求描述用自然语言写出，AI Agent 生成代码，人类负责审核与决策。</p>\n<p>这个转变的底层信号是：<strong>单一AI Agent 的能力有上限，而复杂任务的复杂度没有上限。</strong></p>\n<p>当任务涉及多个专业领域、需要并行处理、或要求不同角色的判断与协作时，单一Agent就像一个”全能型通才”——什么都懂一点，但什么都不精。解决这个问题的路径有两条：要么造一个更强的通用Agent（scale路线），要么让多个专用Agent协同工作（multi-agent路线）。</p>\n<p>后者正在成为主流。</p>\n<p>本文是一次系统性调研的汇总。我们将覆盖：</p>\n<ol>\n<li>多智能体系统的历史脉络与演进逻辑</li>\n<li>六种核心委派模式的设计哲学与适用场景</li>\n<li>四大主流框架（AutoGen / CrewAI / LangGraph / Oz）的架构对比</li>\n<li>Warp/Oz 平台作为”平台层”定位的战略意义</li>\n<li>未来趋势判断与我的个人观察</li>\n</ol>\n<hr />\n<h3>二、历史发展：从分布式AI到LLM时代的Multi-Agent</h3>\n<p><img alt=\"\" src=\"https://pica.zhimg.com/v2-b0e3ef30373c539cdf4b3dca80109a66_1440w.jpg\" /></p>\n<p>发展历史</p>\n<h3>2.1 早期阶段：分布式问题求解（1980s-2000s）</h3>\n<p>多智能体系统的研究最早可追溯至分布式人工智能（Distributed AI）领域。1980年代，研究者开始探索多个自主实体如何通过通信与协调共同解决单一Agent无法完成的复杂问题。这一时期的代表工作包括：</p>\n<ul>\n<li><strong>合同网协议（Contract Net Protocol）</strong>：Smith等人在1980年提出，通过”招标-投标-签约”机制实现任务在Agent间的动态分配</li>\n<li><strong>联合意图理论（Joint Intention Theory）</strong>：Cohen等人在1990年代提出，为多Agent协作建立了形式化框架</li>\n<li><strong>多Agent规划（Multi-Agent Planning）</strong>：解决多实体目标冲突与资源竞争问题</li>\n</ul>\n<p>这一阶段的核心假设是：<strong>Agent是明确的、有符号的、有可计算推理能力的实体</strong>。系统设计者需要手工编码每个Agent的行为规则。</p>\n<h3>2.2 中期演进：机器人与IoT时代（2000s-2020s）</h3>\n<p>进入21世纪，多智能体系统从纯理论走向实际应用：</p>\n<ul>\n<li><strong>机器人协作</strong>：多机器人路径规划、协同搬运、群体智能</li>\n<li><strong>IoT与边缘计算</strong>：分布式感知与决策</li>\n<li><strong>多游戏AI</strong>：如《星际争霸》中的多单位协调</li>\n</ul>\n<p>这一阶段的重要进展是<strong>市场机制与拍卖理论的引入</strong>——用经济激励代替手工规则，实现更动态、更可扩展的任务分配。</p>\n<h3>2.3 LLM时代的范式转变（2022-2026）</h3>\n<p>2022年GPT-4与ChatGPT的发布，改变了多智能体系统的面貌。<strong>LLM作为”大脑”赋予了每个Agent真正的语言理解与生成能力</strong>，使得：</p>\n<ul>\n<li>Agent可以理解复杂、非结构化的指令</li>\n<li>Agent之间可以用自然语言通信，而不需要预定义的协议</li>\n<li>任务描述可以是模糊的，由Agent自主理解与拆解</li>\n</ul>\n<p>这一阶段的标志性事件包括：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>时间</th>\n<th>里程碑</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>2023</td>\n<td>AutoGen（微软）开源，提出Agent间对话协作范式</td>\n</tr>\n<tr>\n<td>2023</td>\n<td>ChatDev（清华大学）展示端到端多Agent软件开发流程</td>\n</tr>\n<tr>\n<td>2024</td>\n<td>CrewAI发布，以”角色扮演”简化多Agent编排</td>\n</tr>\n<tr>\n<td>2024</td>\n<td>LangGraph（LangChain）引入，支持cycle与checkpoint的多Agent图</td>\n</tr>\n<tr>\n<td>2025</td>\n<td>Warp推出Oz平台，提出”临时生成”范式</td>\n</tr>\n<tr>\n<td>2025-2026</td>\n<td>各框架趋同，平台层与框架层开始分层</td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>核心转变</strong>：从”手工编码Agent行为”到”用LLM的涌现能力驱动Agent行为”。设计的重心从”Agent应该做什么”转移到”Agent之间应该说什么、怎么协作”。</p>\n<hr />\n<h3>三、核心概念：六种委派模式</h3>\n<p>委派（Delegation）是将任务分配给执行Agent的过程。这是多智能体系统设计的核心问题。不同的委派方式，决定了系统的灵活性、可扩展性与适用场景。</p>\n<p><img alt=\"\" src=\"https://pic4.zhimg.com/v2-ba04ff898140f9512bd986d760a8fbc5_1440w.jpg\" /></p>\n<p>Multi-Agent 六种委派模式(1)</p>\n<p><img alt=\"\" src=\"https://pic4.zhimg.com/v2-cc10dc0293a5289ed24d64bdee86f447_1440w.jpg\" /></p>\n<p>Multi-Agent 六种委派模式(2)</p>\n<h3>3.1 模式一：静态委派（Static Delegation）</h3>\n<p><strong>核心逻辑</strong>：预定义角色到Agent的固定映射。每个角色在系统构建时就已确定，运行时不改变。</p>\n<pre><code>用户 → 规划Agent → [执行Agent₁ / 执行Agent₂ / 执行Agent₃]\n                  （映射关系：固定不变）\n</code></pre>\n<p><strong>典型代表</strong>：CrewAI</p>\n<p>在CrewAI中，定义一个多Agent系统只需：</p>\n<pre><code>researcher = Agent(role=&quot;研究员&quot;, goal=&quot;收集准确信息&quot;, backstory=&quot;...&quot;)\nwriter = Agent(role=&quot;作家&quot;, goal=&quot;写出吸引人的文章&quot;, backstory=&quot;...&quot;)\n\ncrew = Crew(agents=[researcher, writer], tasks=[...])\n</code></pre>\n<p>角色即定义，定义即能力。Agent的职责边界在系统构建时就已经锁定。</p>\n<p><strong>优点</strong>：</p>\n<ul>\n<li>架构简单，易于理解与维护</li>\n<li>可预测性强，调试成本低</li>\n<li>适合流程相对固定的应用场景</li>\n</ul>\n<p><strong>缺点</strong>：</p>\n<ul>\n<li>缺乏灵活性，无法适应任务的多样性</li>\n<li>角色间的协作模式固化，难以动态调整</li>\n<li>随着任务复杂度上升，角色数量线性增长</li>\n</ul>\n<p><strong>适用场景</strong>：流程相对固定、内容相对模板化的任务，如新闻写作、报告生成、数据整理。</p>\n<h3>3.2 模式二：动态委派（Dynamic Delegation）</h3>\n<p><strong>核心逻辑</strong>：运行时由Router或意图分类器，根据任务特征动态匹配最合适的Agent。</p>\n<pre><code>用户 → 路由器(Router) → 意图分类 → [Agent池匹配]\n                                ↓\n                          最合适的Agent接收任务\n</code></pre>\n<p><strong>典型代表</strong>：AutoGen GroupChat、LangGraph conditional_edge</p>\n<p>LangGraph中的实现示例：</p>\n<pre><code>def route_to_agent(state):\n    intent = classify_intent(state[&quot;last_message&quot;])\n    if intent == &quot;research&quot;:\n        return &quot;research_agent&quot;\n    elif intent == &quot;write&quot;:\n        return &quot;writer_agent&quot;\n    elif intent == &quot;review&quot;:\n        return &quot;reviewer_agent&quot;\n    return END\n\nworkflow.add_node(&quot;research_agent&quot;, research_node)\nworkflow.add_node(&quot;writer_agent&quot;, write_node)\nworkflow.add_conditional_edges(&quot;router&quot;, route_to_agent, {...})\n</code></pre>\n<p><strong>优点</strong>：</p>\n<ul>\n<li>更高的灵活性，能适应多样化任务</li>\n<li>Agent池可以动态扩展</li>\n<li>更接近真实团队协作模式</li>\n</ul>\n<p><strong>缺点</strong>：</p>\n<ul>\n<li>Router的质量直接影响系统效果（Prompt依赖）</li>\n<li>增加了路由层的复杂度与延迟</li>\n<li>意图分类本身可能出错，导致任务分配不当</li>\n</ul>\n<p><strong>适用场景</strong>：任务类型多样、需要实时路由判断的系统，如智能客服、多领域研究助理。</p>\n<h3>3.3 模式三：分层分解（Hierarchical Decomposition）</h3>\n<p><strong>核心逻辑</strong>：任务被递归拆解为子任务，层层委派，形成树状结构。每个层级只处理自己擅长的问题，将专业子任务委派给下一层。</p>\n<pre><code>任务T\n  ├── 子任务T₁ → 专家Agent₁\n  ├── 子任务T₂ → 专家Agent₂\n  └── 子任务T₃\n        ├── 子子任务T₃₋₁ → 专家Agent₃\n        └── 子子任务T₃₋₂ → 专家Agent₄\n</code></pre>\n<p><strong>典型代表</strong>：AutoGen Manager Agent模式、ChatDev</p>\n<p>AutoGen的Manager模式：</p>\n<pre><code>manager = Agent(&quot;manager&quot;, system_message=&quot;&quot;&quot;\n你是一个项目管理者。将复杂任务分解给专家。\n当专家返回结果后，整合成最终输出。\n&quot;&quot;&quot;)\n# Manager通过group_chat自动委派给各专家Agent\n</code></pre>\n<p><strong>优点</strong>：</p>\n<ul>\n<li>能处理极高复杂度的任务</li>\n<li>每层Agent只需关注自己的领域</li>\n<li>支持并行子任务执行</li>\n</ul>\n<p><strong>缺点</strong>：</p>\n<ul>\n<li>层级设计需要领域知识</li>\n<li>信息在层间传递可能丢失或失真</li>\n<li>调试困难（链路长、节点多）</li>\n</ul>\n<p><strong>适用场景</strong>：复杂软件项目、跨学科研究、多阶段内容创作。</p>\n<h3>3.4 模式四：池选择（Pool-Based Selection）</h3>\n<p><strong>核心逻辑</strong>：Agent池中的每个Agent声明自己的capability（能力描述），任务到达时，池管理器根据任务需求匹配合适的Agent。</p>\n<pre><code>任务到达\n    ↓\n池管理器查询能力注册表\n    ↓\n匹配最合适的Agent（可并行匹配多个）\n    ↓\n分配执行\n</code></pre>\n<p><strong>典型代表</strong>：Semantic Kernel、Oz环境池</p>\n<p>Oz平台的环境池机制：当你定义一个workflow时，每个步骤可以声明所需的环境/工具，Oz在运行时为该步骤分配匹配的执行Agent：</p>\n<pre><code>workflow:\n  - step: implement\n    env: ubuntu-24-node18  # 自动匹配合适的Agent运行环境\n  - step: review\n    env: ubuntu-24-node18\n</code></pre>\n<p><strong>优点</strong>：</p>\n<ul>\n<li>松耦合，Agent间无需直接引用</li>\n<li>支持大规模Agent池的动态伸缩</li>\n<li>能力匹配更精准</li>\n</ul>\n<p><strong>缺点</strong>：</p>\n<ul>\n<li>需要完善的capability注册与发现机制</li>\n<li>匹配算法的质量决定系统效果</li>\n<li>Agent间协作的显式表达较弱</li>\n</ul>\n<p><strong>适用场景</strong>：大规模系统、需要灵活扩展的动态工作流。</p>\n<h3>3.5 模式五：对话移交（Conversational Handoff）</h3>\n<p><strong>核心逻辑</strong>：Agent在共享对话中直接交接控制权，像真实对话中的”话题切换”一样自然。</p>\n<pre><code>Agent_A：处理到一半，突然发现需要代码审查\n    ↓\nAgent_A → Agent_B：我把这个代码片段发给你，帮我审查一下\n    ↓\nAgent_B：收到，开始审查，完成后返回结果\n</code></pre>\n<p><strong>典型代表</strong>：AutoGen Swarm</p>\n<p>AutoGen Swarm的核心设计是”移交通知”——Agent通过<code>handoff</code>消息直接指定下一个接收者：</p>\n<pre><code>agent_a.on_handoff(agent_b)  # Agent_A可以直接将控制权移交给Agent_B\n</code></pre>\n<p><strong>优点</strong>：</p>\n<ul>\n<li>最接近人类协作模式</li>\n<li>灵活性极高，无需预设流程</li>\n<li>适合探索性、迭代式任务</li>\n</ul>\n<p><strong>缺点</strong>：</p>\n<ul>\n<li>系统行为难以预测</li>\n<li>需要强大的状态管理与上下文传递机制</li>\n<li>对LLM的协作意识要求高</li>\n</ul>\n<p><strong>适用场景</strong>：开放式研究任务、需要多轮迭代的创作流程。</p>\n<h3>3.6 模式六：临时生成（On-Demand Generation）</h3>\n<p><strong>核心逻辑</strong>：按需创建专门的Agent，执行完成后立即释放。系统不持有Agent池，而是根据任务动态生成。</p>\n<pre><code>任务到达 → 模板匹配 → 生成专用Agent\n                            ↓\n                      执行任务\n                            ↓\n                      释放Agent（资源回收）\n</code></pre>\n<p><strong>典型代表</strong>：<strong>Oz</strong>（Warp平台）、Claude Code</p>\n<p>Oz的核心哲学：固定的是workflow模板（workflow-as-code），动态的是每个步骤的执行者。每次执行时，Oz为每个步骤生成一个全新的云端隔离Agent：</p>\n<pre><code># 定义workflow模板（静态）\nworkflow:\n  triage-issue:\n  create-spec:\n  implement:\n  review-pr:\n  verify-changes:\n\n# 每个步骤的执行Agent是&quot;临时生成&quot;的（动态）\n# 本次执行完毕 → Agent销毁\n# 下次执行 → 重新生成全新Agent\n</code></pre>\n<p>Claude Code的subagent机制同理：</p>\n<pre><code># 在CLAUDE.md中定义subagent\n## [subagent:code-review]\n你们是一个代码审查团队...\n</code></pre>\n<p>当你触发subagent时，Claude Code生成一个具有独立上下文的临时Agent；执行完毕后，上下文销毁。</p>\n<p><strong>优点</strong>：</p>\n<ul>\n<li>极高的资源效率（按需分配）</li>\n<li>每个Agent都是”干净”的，无状态污染</li>\n<li>适合大规模、高并发的任务场景</li>\n<li>避免了Agent间的状态累积与记忆干扰</li>\n</ul>\n<p><strong>缺点</strong>：</p>\n<ul>\n<li>无法利用”Agent经验积累”（每次都是全新的Agent）</li>\n<li>生成开销与初始化延迟</li>\n<li>需要强大的workflow定义能力作为前置条件</li>\n</ul>\n<p><strong>适用场景</strong>：OSS维护流水线、企业级自动化、CI/CD集成、需要高并发的任务场景。</p>\n<p><img alt=\"\" src=\"https://pic4.zhimg.com/v2-446b9ecb2b7baffb511dbd101148b329_1440w.jpg\" /></p>\n<p>典型多智能体工作流模式</p>\n<h3>3.7 模式对比与选型矩阵</h3>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th>静态委派</th>\n<th>动态委派</th>\n<th>分层分解</th>\n<th>池选择</th>\n<th>对话移交</th>\n<th>临时生成</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>灵活性</td>\n<td>低</td>\n<td>中</td>\n<td>高</td>\n<td>高</td>\n<td>极高</td>\n<td>高</td>\n</tr>\n<tr>\n<td>可预测性</td>\n<td>高</td>\n<td>中</td>\n<td>中</td>\n<td>中</td>\n<td>低</td>\n<td>中</td>\n</tr>\n<tr>\n<td>实现复杂度</td>\n<td>低</td>\n<td>中</td>\n<td>高</td>\n<td>高</td>\n<td>中</td>\n<td>高</td>\n</tr>\n<tr>\n<td>资源效率</td>\n<td>中</td>\n<td>中</td>\n<td>中</td>\n<td>中</td>\n<td>低</td>\n<td>高</td>\n</tr>\n<tr>\n<td>协作深度</td>\n<td>低</td>\n<td>中</td>\n<td>高</td>\n<td>中</td>\n<td>高</td>\n<td>中</td>\n</tr>\n<tr>\n<td>最佳场景</td>\n<td>模板化任务</td>\n<td>路由分发</td>\n<td>复杂项目</td>\n<td>大规模系统</td>\n<td>探索性任务</td>\n<td>流水线自动化</td>\n</tr>\n</tbody>\n</table></div>\n<hr />\n<h3>四、四大框架全景对比</h3>\n<h3>4.1 定位分层：框架层 vs 平台层 vs 混合型</h3>\n<p>在深入讨论之前，需要建立一个关键的架构分层认知：</p>\n<pre><code>┌─────────────────────────────────┐\n│         应用层（Application）     │  ← 业务逻辑、用户界面\n├─────────────────────────────────┤\n│  平台层（Platform）              │  ← Oz: 触发器、环境、结果写回、自托管\n│  oz-for-oss                     │  ← Warp用Oz自动化自身OSS维护\n├─────────────────────────────────┤\n│  框架层（Framework）             │  ← AutoGen/CrewAI/LangGraph\n│  编排逻辑、状态管理、模式实现      │\n├─────────────────────────────────┤\n│  LLM层（Model）                  │  ← GPT-4o、Claude、Gemini、LLama\n└─────────────────────────────────┘\n\n【补充】第三类：框架 + 平台混合型\n  ┌────────────────────────────────────┐\n  │  OpenHarness（HKUDS）              │\n  │  框架层能力（Agent Loop/工具路由）   │\n  │  + 自带运行环境（ohmo/Connector）   │\n  │  + Auto-Compaction（内置平台能力）  │\n  └────────────────────────────────────┘\n</code></pre>\n<p><img alt=\"\" src=\"https://pic4.zhimg.com/v2-11a7fc5adc11e5d6bc64a015c87ce3cd_1440w.jpg\" /></p>\n<p>Multi-Agent 分层架构</p>\n<p><strong>框架层</strong>定义”谁和谁说什么”——Agent间的通信协议、状态传递、循环控制。 <strong>平台层</strong>定义”在哪跑、怎么触发、结果写哪”——执行环境、部署方式、与外部系统的集成。</p>\n<p>这是一个重要的趋势：<strong>框架层和平台层正在分离</strong>。AutoGen、CrewAI、LangGraph做的是”如何编排”，而Oz做的是”在哪里编排、如何规模化”。</p>\n<p><strong>OpenHarness代表了”框架层+商业创新”的组合。</strong> 它不是自带 LLM 运行环境的混合型（没有——ohmo 复用的是你已有的 Claude Code 订阅，而不是自己托管模型），而是一个<strong>纯框架</strong>——但它的商业模式创新让它绕过了 API key 门槛。这是目前门槛最低的”用 Claude Code 编程式驱动 Agent”的框架。</p>\n<p><img alt=\"\" src=\"https://pica.zhimg.com/v2-4ac8d7598e33f5ea26dcc007ef5e0842_1440w.jpg\" /></p>\n<p>主流框架架构对比</p>\n<h3>4.2 AutoGen（微软）</h3>\n<p><strong>定位</strong>：最老牌、功能最全的多Agent框架</p>\n<p><strong>核心优势</strong>：</p>\n<ul>\n<li>支持群聊（GroupChat）模式，多Agent自由对话</li>\n<li>Swarm扩展支持对话移交</li>\n<li>与.NET生态深度集成（微软背景）</li>\n<li>社区最大，生态最成熟</li>\n</ul>\n<p><strong>核心局限</strong>：</p>\n<ul>\n<li>API较底层，需要大量配置</li>\n<li>状态管理依赖外部实现</li>\n<li>对复杂工作流的支持需要自行扩展</li>\n</ul>\n<p><strong>抽象层次</strong>：低~中</p>\n<h3>4.3 CrewAI</h3>\n<p><strong>定位</strong>：以”角色扮演”理念简化多Agent编排</p>\n<p><strong>核心优势</strong>：</p>\n<ul>\n<li>极低的上手门槛，API直觉友好</li>\n<li>角色即定义，适合快速原型</li>\n<li>任务（Task）与角色（Agent）的分离设计清晰</li>\n<li>文档完善，教程丰富</li>\n</ul>\n<p><strong>核心局限</strong>：</p>\n<ul>\n<li>模式单一（以静态委派为主）</li>\n<li>复杂工作流需要Hack</li>\n<li>灵活性不足，不适合高度定制场景</li>\n</ul>\n<p><strong>抽象层次</strong>：中</p>\n<h3>4.4 LangGraph（LangChain）</h3>\n<p><strong>定位</strong>：以图结构实现最灵活的多Agent编排</p>\n<p><strong>核心优势</strong>：</p>\n<ul>\n<li>原生支持cycle（图中的循环）</li>\n<li>Checkpoint机制支持状态持久化与回溯</li>\n<li>几乎可以实现所有六种委派模式</li>\n<li>与LangChain生态无缝集成</li>\n</ul>\n<p><strong>核心局限</strong>：</p>\n<ul>\n<li>学习曲线陡峭（图思维门槛）</li>\n<li>需要理解状态机概念</li>\n<li>调试复杂（运行时状态不直观）</li>\n</ul>\n<p><strong>抽象层次</strong>：低（接近底层，但对复杂模式支持最好）</p>\n<h3>4.5 Oz（Warp平台）</h3>\n<p><img alt=\"\" src=\"https://picx.zhimg.com/v2-e759cb59b16b72ffbb4369a2c17849ad_1440w.jpg\" /></p>\n<p>Oz 模式</p>\n<p><strong>定位</strong>：平台层产品，不是框架</p>\n<p><strong>核心优势</strong>：</p>\n<ul>\n<li>临时生成范式，避免Agent状态污染</li>\n<li>云端隔离执行，安全可控</li>\n<li>触发器与工作流即代码（workflow-as-code）</li>\n<li>自托管模式（oz-agent-worker）支持数据不经过云端</li>\n</ul>\n<p><strong>oz-for-oss实战</strong>：Warp用Oz自动化自身OSS维护的完整流水线：</p>\n<pre><code>triage-issue  →  create-spec  →  implement  →  review-pr  →  verify-changes\n     ↑                                                                      ↓\n     └──────────────────────（失败则返回 triage 重新开始）───────────────────┘\n</code></pre>\n<p><strong>oz-agent-worker</strong>：通过WebSocket连接，在Docker/Kubernetes/本地进程上自托管Agent，数据不过Warp云端——满足企业级数据安全需求。</p>\n<p><strong>核心局限</strong>：</p>\n<ul>\n<li>依赖Warp平台（生态锁定风险）</li>\n<li>不适合需要Agent经验积累的场景</li>\n<li>相对较新，文档和社区仍在成熟中</li>\n</ul>\n<p><strong>抽象层次</strong>：高（面向平台使用者，不暴露底层框架细节）</p>\n<h3>4.6 OpenHarness（HKUDS）</h3>\n<p><strong>定位</strong>：框架层 + 轻平台能力混合体，HKUDS（香港大学数据科学实验室）出品的开源 Agent Harness 框架。</p>\n<p><strong>核心哲学：Thin Harness Fat Skills（瘦 harness，胖 skills）</strong>——Harness 层只做最核心的 Agent Loop 与工具路由，Skills 层独立可插拔，让用户专注于”教 Agent 做什么”而非”如何构建 Agent 基础设施”。</p>\n<p><strong>核心架构（五大模块）：</strong></p>\n<pre><code>┌─────────────────────────────────────────────────────────────┐\n│                        ohmo（内置助手）                       │\n│           免 API key，直接使用本地 Claude Code 订阅             │\n├─────────────────────────────────────────────────────────────┤\n│              Agent（循环体）  Tool（工具）  Context（记忆）      │\n│                   ⇢  ⇠  ⇢  ⇠  ⇢  ⇠                         │\n├─────────────────────────────────────────────────────────────┤\n│           Skill（技能）  Command（命令）  Connector（连接器）      │\n└─────────────────────────────────────────────────────────────┘\n</code></pre>\n<p><strong>五大模块职责：</strong></p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>模块</th>\n<th>职责</th>\n<th>关键设计</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Agent</td>\n<td>核心循环体：思考→工具调用→结果处理</td>\n<td>内置 GRPO 训练支持</td>\n</tr>\n<tr>\n<td>Tool</td>\n<td>工具注册与调用管理</td>\n<td>MCP HTTP Transport 原生支持</td>\n</tr>\n<tr>\n<td>Context</td>\n<td>多层次记忆管理</td>\n<td>Session / Long-Term / Global 三层</td>\n</tr>\n<tr>\n<td>Skill</td>\n<td>可插拔技能包（LLM 调用、代码执行等）</td>\n<td>按需加载</td>\n</tr>\n<tr>\n<td>Connector</td>\n<td>与外部系统集成（文件系统、网络等）</td>\n<td>插件化设计</td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>Auto-Compaction（v0.1.6+）：解决长期运行的 context 枯竭问题</strong></p>\n<p>这是 OpenHarness 最独特的能力。当 Agent 需要跨多天运行时，context window 会逐渐被历史信息填满——OpenHarness 的 Auto-Compaction 会自动压缩历史对话，保留关键决策点，释放被占用的 context 空间。</p>\n<pre><code>Day 1: [完整 context]\nDay 2: [开始压缩历史] → [关键决策点保留，中间过程压缩]\nDay 3: [context 已精简] → Agent 继续工作，如同在一个&quot;干净的&quot;上下文中\n</code></pre>\n<p>这直接回应了 §6 趋势二提到的「临时 Agent + 共享知识库」方向——Auto-Compaction 不是临时生成，而是<strong>让同一个 Agent 能在多天跨度上保持有效运行，同时保持上下文精简</strong>。</p>\n<p><strong>Claude Code / OpenClaw 原生集成</strong></p>\n<p>OpenHarness 的 ohmo 模块直接利用用户已有的 Claude Code 订阅，无需额外付费或配置 API Key。这与 Oz 的”临时生成”不同：ohmo 让 Claude Code 成为一个<strong>持久化的个人助手</strong>（类似桌面版 Claude Code 的后台常驻版），而 Oz 让每个步骤的 Agent 都是全新的。</p>\n<pre><code>OpenHarness ohmo:    Claude Code 作为常驻助手（持久化，有记忆）\nOz 临时生成:          每个步骤 → 全新 Agent → 执行完毕即销毁\n</code></pre>\n<p><strong>Ollama 本地运行支持</strong></p>\n<p>对于数据安全敏感场景，OpenHarness 支持 Ollama 本地模型，无需任何外部 API 调用。</p>\n<p><strong>與 Oz 的關鍵差異：</strong></p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>維度</th>\n<th>OpenHarness</th>\n<th>Oz</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Agent 生命周期</td>\n<td>持久化（可跨天运行）</td>\n<td>临时生成（每步全新）</td>\n</tr>\n<tr>\n<td>Context 处理</td>\n<td>Auto-Compaction（动态压缩）</td>\n<td>每次全新（无状态）</td>\n</tr>\n<tr>\n<td>商业模型</td>\n<td>开源（MIT）+ 复用已有 Claude Code 订阅</td>\n<td>云端平台服务</td>\n</tr>\n<tr>\n<td>定位</td>\n<td>自带运行环境的框架（框架+轻平台）</td>\n<td>纯平台层</td>\n</tr>\n<tr>\n<td>数据安全</td>\n<td>本地运行 + 自托管</td>\n<td>可自托管（oz-agent-worker）</td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>典型使用场景：</strong></p>\n<ul>\n<li>个人开发者用 Claude Code 作为主力工具，想把 Agent 能力嵌入自己的开发流程</li>\n<li>研究团队需要长周期任务（多天代码审查、多阶段研究）</li>\n<li>企业内部场景（数据不出本地，但需要 Agent 编排能力）</li>\n</ul>\n<p><strong>延伸觀察：.md Skills——能力外部化的第七種委派模式候選。</strong> 這是 OpenHarness 最具前瞻性的設計：Skill 不是寫死在框架裡的，而是以 <code>.md</code> 文件形式存在，<strong>隨需加載，按需注入</strong>。任何人都可以寫一個 Markdown 文件來定義一個技能，OpenHarness 自動發現並在對話中激活。</p>\n<p>這個設計打開了「能力外部化」的大門——對比 Survey §3 的六種委派模式，所有模式默認 Agent 的能力是「固定內嵌於定義」的（角色即能力）。但 .md Skills 的思路完全不同：<strong>能力本身可以獨立於 Agent 生命周期之外存在，動態組合、按需加載</strong>。</p>\n<p>這與「臨時生成」有本質區別——臨時生成的 Agent 能力是「跟著初始化走的」，Skill-外部化則是「能力跟著對話走的」。這可能是第六種委派模式之後最值得關注的新方向，目前在 Survey 的框架覆蓋範圍之外。</p>\n<p><strong>核心局限：</strong></p>\n<ul>\n<li>社区生态相对较小（2025年起步）</li>\n<li>自托管需要一定工程能力</li>\n<li>主要是单 Agent 场景，多 Agent 协作支持相对较弱</li>\n</ul>\n<p><strong>抽象层次</strong>：中（提供完整框架，但 Skills 层需要一定配置）</p>\n<h3>4.7 框架对比总览</h3>\n<p>|| 维度 | AutoGen | CrewAI | LangGraph | Oz | OpenHarness | ||——|———|——–|———|—–|——–| || <strong>推出方</strong> | 微软 | CrewAI Inc. | LangChain | Warp | HKUDS | || <strong>类型</strong> | 框架 | 框架 | 框架 | 平台 | 框架+平台混合 | || <strong>委派模式覆盖</strong> | 全部 | 静态为主 | 全部 | 临时生成 | 主要单Agent/工具调用 | || <strong>学习曲线</strong> | 中 | 低 | 高 | 中 | 中 | || <strong>社区生态</strong> | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ | || <strong>生产就绪度</strong> | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ | || <strong>最大优势</strong> | 功能最全 | 上手最快 | 灵活性最强 | 规模化最优 | 免API key+Auto-Compaction | || <strong>最大局限</strong> | 复杂度高 | 模式单一 | 学习曲线陡 | 生态锁定 | 社区小/多Agent弱 |</p>\n<hr />\n<h3>五、平台层崛起：Oz的战略意义</h3>\n<h3>5.1 核心命题：Agentic tools don’t scale beyond your laptop</h3>\n<p>Oz的诞生回应了一个根本性问题：<strong>为什么大多数AI Agent工具只能在本地桌面运行？</strong></p>\n<p>Karpathy在2025年的观察给出了答案：</p>\n<ol>\n<li><strong>数据安全问题</strong>：云端Agent需要访问代码库、数据库、内部API——这些数据不能发给第三方</li>\n<li><strong>执行环境差异</strong>：本地有完整的开发环境，Agent能运行命令；云端需要完整的环境模拟</li>\n<li><strong>状态与记忆</strong>：本地Agent可以累积上下文，云端Agent需要解决状态持久化问题</li>\n<li><strong>集成深度</strong>：CI/CD、GitHub、Slack、JIRA——这些都需要深度集成</li>\n</ol>\n<h3>5.2 Oz的解法</h3>\n<p>Warp的答案是三层架构：</p>\n<pre><code>触发器（Trigger）\n    ↓\n平台编排（Oz Platform）→ 环境分配 → Agent生成\n    ↓\n框架执行（AutoGen/CrewAI/LangGraph）→ LLM API\n</code></pre>\n<p><strong>触发器层</strong>：支持多种触发方式——Webhook、Schedule（定时）、GitHub Action、CLI命令。</p>\n<p><strong>平台编排层</strong>：Oz负责环境分配（ubuntu-24-node18等）、Agent生成与销毁、结果写入、失败重试。</p>\n<p><strong>框架执行层</strong>：Oz不重复造轮子，允许用户带入已有的AutoGen/CrewAI/LangGraph工作流。</p>\n<h3>5.3 oz-for-oss：一个完整的案例</h3>\n<p>Warp用Oz自动化自身OSS（开源软件）维护的流水线，是一个教科书级别的案例：</p>\n<ol>\n<li><strong>triage-issue</strong>：Agent自动分类GitHub Issue（bug/feature/docs）</li>\n<li><strong>create-spec</strong>：为feature issue生成技术规格文档</li>\n<li><strong>implement</strong>：Agent在隔离环境中实现功能</li>\n<li><strong>review-pr</strong>：Agent审查PR的质量与安全性</li>\n<li><strong>verify-changes</strong>：Agent验证修改是否满足spec</li>\n</ol>\n<p>整个流程中，每个步骤的Agent都是<strong>临时生成</strong>的。这意味着：</p>\n<ul>\n<li>步骤A的Agent失败，不会影响步骤B的Agent</li>\n<li>每个Agent的上下文是”干净”的，没有历史干扰</li>\n<li>流程可以并行扩展到任意数量的OSS项目</li>\n</ul>\n<h3>5.4 自托管：企业级数据安全</h3>\n<p>oz-agent-worker是Oz的企业级功能：通过WebSocket在Docker/Kubernetes上自托管Agent。</p>\n<p>关键价值：<strong>数据不过Warp云端</strong>。</p>\n<p>对于处理敏感代码、内部文档、专有数据的场景，这是一个关键的差异化能力。</p>\n<hr />\n<h3>六、未来趋势展望</h3>\n<p><img alt=\"\" src=\"https://picx.zhimg.com/v2-15b9fac4f08957a0d75bb675a874769f_1440w.jpg\" /></p>\n<p>未来趋势</p>\n<h3>趋势一：框架层与平台层的持续分化</h3>\n<p>AutoGen/CrewAI/LangGraph将继续专注于”如何编排”——更丰富的模式支持、更低的开发门槛。Oz以及类似平台将专注于”在哪里编排”——更好的执行环境、更安全的数据处理、更深入的外部集成。</p>\n<p>这个分层的驱动力是<strong>规模化需求</strong>。当一个团队同时运行数百个Agent工作流时，框架层面的编排逻辑和平台层面的执行基础设施，需要分开优化。</p>\n<h3>趋势二：临时生成将成为主流范式</h3>\n<p>Agent状态污染（context drift）是一个被低估的问题。当一个Agent长时间运行时，它的上下文会积累大量历史信息，导致：</p>\n<ul>\n<li>Prompt空间被历史数据占据，新信息权重下降</li>\n<li>Agent的”判断标准”逐渐偏离初始设定</li>\n<li>调试困难（无法复现Agent的中间状态）</li>\n</ul>\n<p>临时生成范式从根本上解决了这个问题。每个Agent都是全新的、干净的。但代价是<strong>无法利用经验积累</strong>。</p>\n<p><strong>OpenHarness 的第三条路：Auto-Compaction。</strong> 临时生成 vs 持久化 Agent 并不是非此即彼的选择。OpenHarness 提出了第三种思路——同一个 Agent 可以跨天运行，但通过 Auto-Compaction 动态压缩历史 context，保持关键决策点，释放被填满的空间。这样既享有”持久化 Agent 的上下文连续性”，又保持”精简 context 的高效推理”。这是「临时生成 + 共享知识库」之外的另一种解决路径，值得持续关注。</p>\n<p>未来的突破点可能在于：<strong>临时Agent + 共享知识库</strong>，或者 <strong>持久化Agent + Auto-Compaction</strong>。两条路都在解决同一个根本问题——如何在长周期任务中保持 Agent 的有效性。</p>\n<h3>趋势三：Agent间协议的标准化</h3>\n<p>目前，各框架的Agent通信协议是私有的——AutoGen的消息格式和CrewAI不兼容，LangGraph的状态结构是独特的。</p>\n<p>随着生态成熟，Agent间通信协议（如A2A - Agent-to-Agent Protocol，由Google在2025年提出）可能会成为行业标准。这将使”框架无关的Agent协作”成为可能——你可以在AutoGen中定义Agent，在Oz中执行，通过标准协议通信。</p>\n<h3>趋势四：自我进化（Self-Evolution）</h3>\n<p>最激进的趋势：Agent不只是执行任务，还能<strong>修改自己的协作方式</strong>。</p>\n<p>这个方向的早期探索包括：</p>\n<ul>\n<li><strong>Meta-Agent</strong>：Agent通过反思自己的协作模式，自动优化workflow</li>\n<li><strong>Self-Healing Workflows</strong>：当某步骤失败时，Agent自动调整后续步骤的执行策略</li>\n<li><strong>Dynamic Role Assignment</strong>：根据任务特征，Agent自主决定谁扮演什么角色</li>\n</ul>\n<p>这个方向的核心挑战是<strong>稳定性与安全性的平衡</strong>。一个能自我修改workflow的Agent，如果修改方向错误，可能导致整个系统行为失控。</p>\n<p><strong>具體案例：Agent-World 的自進化競技場。</strong> 這個框架實現了迄今最完整的「自我進化」閉環：</p>\n<pre><code>訓練 → 競技場評估（每個一級類別抽5個環境，重新合成任務） \n  → 診斷 Agent 分析失敗樣本（哪些環境失敗率最高？失敗模式是什麼？）\n  → 定向生成更多訓練數據，重點補短板\n  ↑___________________________↓\n</code></pre>\n<p>關鍵設計：診斷 Agent <strong>不知道正確答案是什麼</strong>——它只分析失敗模式，而非直接給出修復方案。這與人類專家的「知道自己不知道什麼」的元認知是同一原理，而非簡單的「錯誤修正」。兩輪自進化訓練後，Agent-World-14B 在 MCP-Mark 上提升了 <strong>8.6 個百分點</strong>——幾乎全部來自對弱點環境的定向強化。</p>\n<hr />\n<h3>七、个人观察与思考</h3>\n<h3>7.1 多智能体不是银弹</h3>\n<p>看了这么多框架和模式，一个重要的认知是：<strong>多智能体解决的是”协作复杂度”问题，不是”智能上限”问题。</strong></p>\n<p>如果你面临的问题是”LLM不够聪明”，加再多Agent也帮不了你——这不是架构问题，是模型能力问题。</p>\n<p>多智能体真正擅长的是：</p>\n<ul>\n<li><strong>任务分工</strong>：不同Agent处理不同专业领域</li>\n<li><strong>视角多元</strong>：不同Agent从不同角度审视同一问题</li>\n<li><strong>并行处理</strong>：多个子任务同时执行</li>\n<li><strong>责任分离</strong>：审查Agent和执行Agent分开，避免”自我审查”的盲点</li>\n</ul>\n<p>但它也带来了新的问题：</p>\n<ul>\n<li>通信开销（Agent间来回传递信息的延迟）</li>\n<li>状态一致性（多Agent如何保证对共享事实的一致理解）</li>\n<li>调试复杂度（一个bug可能分布在多个Agent的交互中）</li>\n<li>成本叠加（多个Agent × 多个LLM调用 = 成本倍增）</li>\n</ul>\n<p><strong>补充：主動設計 vs 被動使用——多智能體實踐中的「腦力馬太效應」</strong></p>\n<p>這個規律不只發生在個體認知層面，也發生在團隊的多智能體實踐中：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>團隊類型</th>\n<th>對待多智能體的方式</th>\n<th>結果</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>主動型團隊</td>\n<td>把 Agent 當「認知陪練」——持續診斷 workflow 弱點、主動迭代協作模式、定期清理 context 噪聲</td>\n<td>系統能力持續進化</td>\n</tr>\n<tr>\n<td>被動型團隊</td>\n<td>把 Agent 當「外包員工」——直接下任務、等結果、不干預決策過程</td>\n<td>系統停在 demo 水平，無法進化</td>\n</tr>\n</tbody>\n</table></div>\n<p>這呼應 Agent-World 的發現：<strong>環境決定 Agent 上限</strong>。在多智能體系統裡，「設計者是否主動迭代協作方式」本身就是那個最關鍵的「環境」。懂得這個道理的團隊，會把優化重點從「換更強的模型」轉移到「改善 Agent 間的協作質量」——這才是多智能體的真正槓桿所在。</p>\n<h3>7.2 “临时生成 + 共享知识库”是我最看好的方向</h3>\n<p>目前的多智能体系统，要么是<strong>静态角色池</strong>（CrewAI模式），要么是<strong>临时生成但无记忆</strong>（Oz模式）。两者都有明显短板。</p>\n<p>我认为最有潜力的方向是：<strong>临时生成的Agent + 结构化的共享知识库</strong>。</p>\n<p>具体来说：</p>\n<ul>\n<li>Agent是按需生成的，每个都是”干净”的</li>\n<li>Agent执行时，从共享知识库读取相关背景（而非依赖自身历史context）</li>\n<li>执行完毕后，将关键发现写入共享知识库（而非留在自身context中）</li>\n</ul>\n<p>这样，Agent获得了：</p>\n<ul>\n<li>✅ 干净的执行上下文（临时生成的好处）</li>\n<li>✅ 累积的知识基础（共享知识库的好处）</li>\n<li>✅ 可追溯的决策过程（知识库版本化的好处）</li>\n</ul>\n<p>Karpathy的LLM Wiki方法论，某种程度上就是在做这件事——用markdown文件作为共享知识库，让每个LLM会话（类似临时Agent）都能从历史笔记中受益。</p>\n<p><strong>补充：OpenHarness 的”第三条路”是更务实的折中。</strong> 不是所有人都需要共享知识库的复杂度——Auto-Compaction 让同一个 Agent 保持跨天运行，同时让 context 始终精简。这比”临时生成 + 共享知识库”更容易落地，适合个人开发者和中小团队。两种方向并存，共同回答同一个问题：如何在长周期任务中平衡”上下文连续性”和”推理效率”。</p>\n<h3>7.3 “Agent First, Workflow Second”的教训</h3>\n<p>arunkant提出的”Agent First, Workflow Second”方法论值得所有多智能体实践者认真对待。</p>\n<p>他的核心洞察是：<strong>不要把”能用的demo”直接当成”能跑的基础设施”。</strong></p>\n<p>Agent的demo太有说服力了——一个对话流畅、逻辑清晰的Agent演示，会让团队高估系统的成熟度，从而跳过关键的工程化步骤：验证层、边界情况处理、集成测试、监控告警。</p>\n<p>正确的方法是：</p>\n<ol>\n<li>用Agent探索工作流（Phase 1）</li>\n<li>一旦摸清规律，把Agent的”模糊能力”固化为”可靠软件”（Phase 2）</li>\n<li>在”AI做灵活的”和”软件做可靠的”之间找到正确边界（Phase 3）</li>\n</ol>\n<h3>7.4 从”工具使用者”到”系统设计者”</h3>\n<p>最后，一个思维层面的观察。</p>\n<p>过去十年，软件开发者的核心能力是<strong>写代码</strong>——用代码表达业务逻辑，用代码与系统交互。</p>\n<p>多智能体时代，这个能力模型需要升级。核心能力变成了：</p>\n<ul>\n<li><strong>定义问题</strong>：把模糊的业务需求，转化为清晰的Agent指令</li>\n<li><strong>设计协作</strong>：决定Agent之间的角色、关系、通信协议</li>\n<li><strong>评估输出</strong>：判断Agent的输出质量，而非生成Agent的输出</li>\n<li><strong>持续优化</strong>：通过数据反馈不断改进Agent的协作模式</li>\n</ul>\n<p>这与Karpathy的”用英语编程”完全一致：<strong>人从code writer变成system designer，从写代码变成描述系统</strong>。</p>\n<hr />\n<h3>八、结语</h3>\n<p>多智能体系统正在从”技术探索”走向”工程成熟”。框架层与平台层的分层、六种委派模式的清晰定义、Oz等平台的崛起，都在推动这个领域从”可以用”走向”用得好”。</p>\n<p>但我们也要警惕几个陷阱：</p>\n<ol>\n<li><strong>过度工程化</strong>：不是所有任务都需要多智能体，单Agent能解决的问题不要人为复杂化</li>\n<li><strong>框架崇拜</strong>：工具是为目标服务的，不要为了用某个框架而用它</li>\n<li><strong>忽视运维</strong>：多智能体系统的监控、调试、错误恢复，比单Agent系统复杂一个数量级</li>\n</ol>\n<p>最后，回到一个根本问题：<strong>多智能体系统，到底在解决什么问题？</strong></p>\n<p>我的答案是：<strong>它解决的是”一个人的能力有上限”这个问题。</strong></p>\n<p>当你需要同时处理多个领域、多个并行任务、多种视角的审视时，多个Agent协作可以突破单个人的认知带宽限制。但它同时引入了一个新的要求：<strong>设计者需要具备系统思维，需要理解不同Agent的能力边界，需要设计它们之间的协作契约。</strong></p>\n<p>这是更难的要求，但也是更有价值的能力。</p>\n<hr />"
    }
  ],
  "graph": {
    "nodes": [
      {
        "id": "camel",
        "x": 80,
        "y": 90,
        "category": "foundation"
      },
      {
        "id": "mad",
        "x": 140,
        "y": 290,
        "category": "deliberation"
      },
      {
        "id": "chatdev",
        "x": 230,
        "y": 190,
        "category": "organization"
      },
      {
        "id": "autogen",
        "x": 340,
        "y": 90,
        "category": "foundation"
      },
      {
        "id": "metagpt",
        "x": 300,
        "y": 190,
        "category": "organization"
      },
      {
        "id": "agentverse",
        "x": 390,
        "y": 90,
        "category": "foundation"
      },
      {
        "id": "dylan",
        "x": 500,
        "y": 390,
        "category": "communication"
      },
      {
        "id": "agentprune",
        "x": 900,
        "y": 390,
        "category": "communication"
      },
      {
        "id": "magentic_one",
        "x": 960,
        "y": 190,
        "category": "organization"
      },
      {
        "id": "vote_consensus",
        "x": 1040,
        "y": 290,
        "category": "deliberation"
      },
      {
        "id": "talkhier",
        "x": 1080,
        "y": 390,
        "category": "communication"
      },
      {
        "id": "acp",
        "x": 1120,
        "y": 490,
        "category": "protocol"
      },
      {
        "id": "a2a",
        "x": 1180,
        "y": 490,
        "category": "protocol"
      },
      {
        "id": "debate_or_vote",
        "x": 1260,
        "y": 290,
        "category": "deliberation"
      },
      {
        "id": "coral",
        "x": 1360,
        "y": 390,
        "category": "communication"
      },
      {
        "id": "latent_agents",
        "x": 1440,
        "y": 590,
        "category": "optimization"
      },
      {
        "id": "blackwell_dm",
        "x": 1500,
        "y": 290,
        "category": "deliberation"
      },
      {
        "id": "ma_workflow_rl",
        "x": 1560,
        "y": 590,
        "category": "optimization"
      },
      {
        "id": "multi2",
        "x": 1620,
        "y": 190,
        "category": "organization"
      }
    ],
    "edges": [
      {
        "from": "camel",
        "to": "chatdev",
        "label": "角色协作"
      },
      {
        "from": "camel",
        "to": "autogen",
        "label": "会话框架"
      },
      {
        "from": "autogen",
        "to": "agentverse",
        "label": "扩展群体"
      },
      {
        "from": "chatdev",
        "to": "metagpt",
        "label": "SOP流水"
      },
      {
        "from": "agentverse",
        "to": "dylan",
        "label": "动态组队"
      },
      {
        "from": "dylan",
        "to": "agentprune",
        "label": "消息剪枝"
      },
      {
        "from": "agentprune",
        "to": "talkhier",
        "label": "结构通信"
      },
      {
        "from": "autogen",
        "to": "magentic_one",
        "label": "总控编排"
      },
      {
        "from": "magentic_one",
        "to": "multi2",
        "label": "分层决策"
      },
      {
        "from": "mad",
        "to": "vote_consensus",
        "label": "决策协议"
      },
      {
        "from": "vote_consensus",
        "to": "debate_or_vote",
        "label": "拆解增益"
      },
      {
        "from": "debate_or_vote",
        "to": "blackwell_dm",
        "label": "后验聚合"
      },
      {
        "from": "mad",
        "to": "latent_agents",
        "label": "辩论蒸馏"
      },
      {
        "from": "acp",
        "to": "a2a",
        "label": "协议收敛"
      },
      {
        "from": "a2a",
        "to": "coral",
        "label": "A2A流控"
      },
      {
        "from": "magentic_one",
        "to": "ma_workflow_rl",
        "label": "协作RL"
      }
    ],
    "milestones": [
      "camel",
      "metagpt",
      "a2a"
    ]
  },
  "algos": [
    {
      "id": "camel",
      "num": 1,
      "name": "CAMEL",
      "fullName": "交流式智能体 (CAMEL)",
      "year": "2023.03",
      "org": "KAUST",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2303.17760",
      "projectUrl": "",
      "category": "foundation",
      "motivation": "以角色扮演启动自主多Agent协作",
      "summary": "CAMEL 提出了基于\"初始提示\"(Inception Prompting)的**角色扮演通信代理框架**，让 AI User 和 AI Assistant 在多轮对话中自主合作完成复杂任务，仅需人类提供一个初步想法，从而解决了聊天语言模型高度依赖人工引导的问题，并系统性地研究了多智能体自主合作的挑战与能力涌现。",
      "keyPoints": [
        "提出 <strong>Role-Playing 框架</strong>：AI User（发布指令）+ AI Assistant（执行解答）双智能体角色扮演，模拟人类社会中的协作模式",
        "提出 <strong>Inception Prompting</strong>：让智能体之间通过对话互相提示，自动将初步想法细化为具体任务并求解，大幅减少人工介入",
        "引入 <strong>Task Specifier Agent</strong>：将人类给出的模糊 idea 细化为具体的、可执行的任务描述",
        "设计 <strong>AI User 自主判定终止</strong>的机制：AI User 判断任务是否完成，决定对话终止，形成闭环",
        "系统识别了多智能体自主合作的<strong>四大挑战</strong>：role flipping（角色翻转）、assistant repeating instructions（助手重复指令）、flake replies（敷衍回复）、infinite loop of messages（无限消息循环）",
        "生成了五种大规模对话数据集：<strong>AI Society</strong>（社会对话）、<strong>Code</strong>（代码生成）、<strong>Math</strong>（数学问答）、<strong>Science</strong>（科学问答）、<strong>Misalignment</strong>（对齐风险模拟）",
        "在 GPT-4 和人类评估中，CAMEL 框架产生的解决方案显著优于 <code>gpt-3.5-turbo</code> 单轮生成",
        "利用渐进式增长的数据集微调 LLaMA，<strong>验证了 LLM 知识涌现</strong>现象",
        "完全开源框架和数据集：https://github.com/camel-ai/camel"
      ],
      "detail": "<h5>1. 核心框架图</h5>\n<p><img alt=\"CAMEL 角色扮演框架\" src=\"https://arxiv.org/html/2303.17760v2/assets/figures/pipeline.pdf\" />\n<em>图：CAMEL Role-Playing 框架总览——人类输入一个初步 idea（如\"开发股票交易机器人\"），Task Specifier 将其细化，随后 AI User（股票交易员角色）与 AI Assistant（Python 程序员角色）通过多轮指令-解答对话协作完成任务。</em></p>\n<h5>2. 算法流程伪代码</h5>\n<pre><code class=\"language-python\"># CAMEL Role-Playing 主循环（简化）\ndef camel_role_playing(idea: str, user_role: str, assistant_role: str):\n    # Step 1: Task Specification\n    task = task_specifier_agent(idea, user_role, assistant_role)\n\n    # Step 2: Initialize agents with Inception Prompts\n    sys_msg_user = f&quot;你是{user_role}。你的任务是向Assistant下达指令来完成：{task}&quot;\n    sys_msg_assistant = f&quot;你是{assistant_role}。你需要遵循User的指令来帮助完成：{task}&quot;\n\n    user_agent = ChatAgent(sys_msg_user)\n    assistant_agent = ChatAgent(sys_msg_assistant)\n\n    # Step 3: Multi-turn conversation loop\n    conversation = []\n    user_msg = f&quot;请帮我完成以下任务的第一步：{task}&quot;  # 初始指令\n\n    while True:\n        # Assistant responds\n        assistant_response = assistant_agent.chat(user_msg)\n        conversation.append((&quot;assistant&quot;, assistant_response))\n\n        # AI User evaluates and gives next instruction\n        user_msg = user_agent.chat(\n            f&quot;Assistant的回复：{assistant_response}\\n&quot;\n            f&quot;基于以上回复，请给出下一步具体指令。&quot;\n            f&quot;如果任务已完全解决，请回复'&lt;CAMEL_TASK_DONE&gt;'。&quot;\n        )\n\n        if &quot;&lt;CAMEL_TASK_DONE&gt;&quot; in user_msg:\n            break\n\n        conversation.append((&quot;user&quot;, user_msg))\n\n    return conversation\n</code></pre>\n<h5>3. 方法深入解读</h5>\n<p><strong>动机与背景</strong></p>\n<p>传统的大型语言模型对话系统（如 ChatGPT）虽然在复杂任务求解上取得了显著进展，但其成功<strong>高度依赖人类用户的精准提示</strong>。对于缺乏领域知识的普通用户（如不会编程的人想让 AI 写一个交易程序），他们无法给出有效的指令来引导 AI 完成任务。这引出了一个核心问题：<strong>能否用一个自主的通信智能体来替代人类干预</strong>，仅凭一个初步想法就能引领对话走向任务完成？</p>\n<p><strong>核心机制：Role-Playing + Inception Prompting</strong></p>\n<p>CAMEL 的核心创新在于将\"角色扮演\"（Role-Playing）与\"Inception Prompting\"（初始提示）相结合：</p>\n<ul>\n<li>\n<p><strong>角色分配</strong>：人类只需提供一个初步 idea 和两个角色名（如\"股票交易员\"作为 AI User，\"Python 程序员\"作为 AI Assistant），系统自动生成对应的系统消息（System Message），赋予两个 Agent 特定的身份和目标。</p>\n</li>\n<li>\n<p><strong>Task Specifier</strong>：为了避免 idea 过于模糊，CAMEL 引入了一个 Task Specifier Agent，它会根据角色和 idea 生成一个详细的、可执行的任务描述。例如将\"开发交易机器人\"细化为\"开发一个基于移动平均线交叉策略的股票交易机器人，能够从 Yahoo Finance 获取数据、计算信号并回测\"。</p>\n</li>\n<li>\n<p><strong>Inception Prompting</strong>：这是 CAMEL 的命名灵感来源（取自电影《盗梦空间》Inception）——就像在梦中植入一个想法会自发演化，CAMEL 通过精心设计的系统消息将\"任务目标\"植入两个 Agent 的\"潜意识\"。AI User 持续给出指令，AI Assistant 持续响应，<strong>双方在对话中自然地将任务向前推进</strong>，无需外部干预。</p>\n</li>\n<li>\n<p><strong>对话结构</strong>：AI User 的职责是\"给指令+判断完成\"，AI Assistant 的职责是\"遵循指令+给出方案\"。User 的每次回复都基于 Assistant 的上一轮输出来确定下一步方向，形成一种<strong>自我驱动的渐进式问题解决循环</strong>。</p>\n</li>\n</ul>\n<p><strong>关键挑战与解决方案</strong></p>\n<p>论文深入分析了自主合作中的四大挑战并提出了应对策略：</p>\n<ul>\n<li>\n<p><strong>Role Flipping（角色翻转）</strong>：Assistant 反过来向 User 发号施令或提问，而非执行指令。原因是 Assistant 的系统消息不足以约束其行为。解决方案：在 Assistant 的 Inception Prompt 中强化\"你是一个助手，必须遵循用户指令\"的设定。</p>\n</li>\n<li>\n<p><strong>Assistant Repeating Instructions（重复指令）</strong>：Assistant 仅仅复述 User 的指令而不给出实际解答。解决方案：在 Prompt 中加入\"请直接给出解决方案，不要重复任务描述\"的约束。</p>\n</li>\n<li>\n<p><strong>Flake Replies（敷衍回复）</strong>：Assistant 给出\"好的，我会做的\"之类的空转回复而不执行。解决方案：要求 Assistant\"给出具体的、可执行的步骤和代码\"。</p>\n</li>\n<li>\n<p><strong>Infinite Loop（无限循环）</strong>：对话在相同内容间重复。解决方案：设置最大轮次限制，并让 AI User 明确判断任务完成状态。</p>\n</li>\n</ul>\n<p><strong>数据集构建与应用</strong></p>\n<p>CAMEL 利用其框架以<strong>高度可扩展的方式</strong>生成了多种数据集：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>数据集</th>\n<th>描述</th>\n<th>规模</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>AI Society</td>\n<td>角色扮演社会对话，涵盖 50 种 Assistant 角色 × 50 种 User 角色</td>\n<td>大规模指令-解答对</td>\n</tr>\n<tr>\n<td>Code</td>\n<td>编程任务对话，角色对如\"程序员-产品经理\"</td>\n<td>含完整代码解决方案</td>\n</tr>\n<tr>\n<td>Math</td>\n<td>数学问答单轮数据</td>\n<td>用于能力涌现研究</td>\n</tr>\n<tr>\n<td>Science</td>\n<td>科学问答单轮数据</td>\n<td>用于能力涌现研究</td>\n</tr>\n<tr>\n<td>Misalignment</td>\n<td>模拟恶意应用场景</td>\n<td>展示未对齐 AI 的潜在风险</td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>与传统方法的区别</strong></p>\n<p>对比此前的数据生成方法（如 Self-Instruct、Alpaca 等），CAMEL 的关键区别在于：\n1. <strong>多轮对话而非单轮</strong>：生成的是完整的、有上下文依赖的多轮指令-解答序列，更接近真实的人类协作场景。\n2. <strong>角色驱动</strong>：角色扮演使得生成的对话具有人格化特征和领域专业性。\n3. <strong>自主驱动</strong>：一旦给定初始 idea，整个过程无需人工示例（zero-shot），高度可扩展。\n4. <strong>双重对齐保证</strong>：AI User 保证任务方向对齐，AI Assistant 保证解答质量，两者形成互相监督的闭环。</p>\n<h5>4. 关键公式与机制</h5>\n<p><strong>Inception Prompt 结构</strong>（系统消息设计）：</p>\n<p>AI Assistant 的 Inception Prompt 模板：</p>\n<blockquote>\n<p>\"Never forget you are a {ASSISTANT_ROLE} and I am a {USER_ROLE}. Never flip roles! Never instruct me! ... Your reply must be a specific solution to my instruction. Do not repeat my instruction. If you think the task is not achievable based on your capability, explain why.\"</p>\n</blockquote>\n<p>AI User 的 Inception Prompt 模板：</p>\n<blockquote>\n<p>\"Never forget you are a {USER_ROLE} and I am a {ASSISTANT_ROLE}. ... You should give me instructions based on my responses. Each instruction should be a single, specific task. You must decide whether the task is fully completed.\"</p>\n<p>💡 关键：Inception Prompt 的本质是通过<strong>角色固化</strong>和对<strong>行为边界的约束</strong>来确保对话始终朝着任务完成的方向推进，防止偏离。</p>\n</blockquote>\n<p><strong>任务终止判定</strong>：</p>\n<p>AI User 在每个回复轮次中需要做出二元决策：继续给出下一步指令，或发出终止信号 <code>&lt;CAMEL_TASK_DONE&gt;</code>。这形成了一个自动的任务完成评估机制，无需外部人工或规则判断。</p>\n<div class=\"warn-box\">⚠️ 注意：终止判定完全由 AI User 自主完成，这意味着 AI User 的判断能力直接影响对话时长和任务完成质量。实验中观察到 AI User 有时会过早终止（任务未真正完成）或过晚终止（陷入完美主义循环）。</div>",
      "quiz": {
        "q": "CAMEL 框架中，Inception Prompting 的核心作用是什么？",
        "options": [
          "提高单个 Agent 的推理速度",
          "通过角色固化和行为约束，使 Agent 在自主对话中保持任务方向不偏离",
          "减少模型参数量以实现轻量化部署",
          "用多个 Agent 投票来提升生成质量"
        ],
        "answer": 1,
        "explain": "Inception Prompting 将角色身份和任务目标'植入'系统消息，并明确约束行为边界（如禁止角色翻转、禁止重复指令），确保 AI User 和 AI Assistant 在无人干预下始终围绕任务协作，避免对话偏离或陷入无限循环。"
      }
    },
    {
      "id": "mad",
      "num": 2,
      "name": "MAD",
      "fullName": "多智能体辩论 (Multiagent Debate)",
      "year": "2023.05",
      "org": "MIT",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2305.14325",
      "projectUrl": "",
      "category": "deliberation",
      "motivation": "多轮互辩缓解推理谬误与幻觉",
      "summary": "MAD（Multiagent Debate）提出让多个LLM实例独立生成候选答案后相互审阅、辩论多轮，最终收敛到单一共同答案的方法，显著提升了数学推理、事实准确性和战略推理的表现，且仅需黑盒API访问即可实现。",
      "keyPoints": [
        "多个语言模型实例（agent）独立生成候选答案，然后相互阅读和批判其他agent的回复，经过多轮迭代最终收敛到共识答案",
        "辩论过程完全基于黑盒API访问，无需模型内部信息（如似然度、梯度），可直接用于现有模型服务接口",
        "在6个基准上评估：算术推理（Arithmetic）、小学数学（GSM8K）、国际象棋走法预测（Chess Move）、传记事实性（Biographies）、MMLU知识问答、象棋走法合法性（Chess Validity）",
        "与零样本思维链（Zero-shot CoT）、自我反思（Self-Reflection）、多数投票（Majority Voting）等方法正交兼容，可叠加使用",
        "仅需3个agent和2轮辩论即可在多数任务上取得显著提升；增加agent数量或辩论轮数可进一步改进",
        "辩论过程中，模型倾向于放弃不确定的事实（因不同agent分歧而被剔除），从而减少幻觉",
        "支持跨模型辩论（如chatGPT+Bard），异构模型间辩论同样有效"
      ],
      "detail": "<h5>1. 方法动机与背景</h5>\n<p>当前LLM虽然能力强大，但仍存在两大核心问题：(1) <strong>推理跳跃</strong>——在复杂推理任务中做出不合逻辑的跳跃；(2) <strong>事实幻觉</strong>——自信地编造错误事实。已有的改进方法（如思维链、自我反思、验证器）均在单模型实例上运行，未能利用多视角互补的优势。</p>\n<p>MAD的核心灵感来自Minsky的《The Society of Mind》和多智能体系统：正如人类在解决难题时会从多个角度思考并相互校验，多个LLM实例也可以通过\"辩论\"来提升答案质量。不同实例生成的答案天然具有多样性（即使来自同一模型），这些多样化的视角在辩论中相互拷问，最终收敛到更可靠的答案。</p>\n<h5>2. 辩论流程（核心机制）</h5>\n<p><img alt=\"MAD 辩论流程图\" src=\"https://arxiv.org/html/2305.14325v2/assets/fig2.png\" />\n<em>图：多智能体辩论流程示意</em></p>\n<p>具体流程如下：</p>\n<p><strong>Step 1 — 独立生成（Initial Generation）</strong>：\n给定一个查询 <span class=\"kb-math kb-math-inline\">Q</span>，<span class=\"kb-math kb-math-inline\">N</span> 个语言模型实例（agent）各自独立生成候选答案 <span class=\"kb-math kb-math-inline\">\\{A_1^{(0)}, A_2^{(0)}, ..., A_N^{(0)}\\}</span>。每个agent使用相同的起始prompt，但由于解码的随机性，生成的答案通常具有多样性。</p>\n<p><strong>Step 2 — 辩论轮次（Debate Round）</strong>：\n在第 <span class=\"kb-math kb-math-inline\">t</span> 轮，将其他所有agent的回复拼接后作为上下文提供给每个agent，并指示其基于他人的回答更新自己的答案：</p>\n<div class=\"kb-math kb-math-display\">A_i^{(t+1)} = \\text{LLM}\\left(Q, \\{A_j^{(t)}\\}_{j \\neq i}, \\text{consensus prompt}\\right)</div>\n<p>其中consensus prompt有两个变体（见图3）：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>类型</th>\n<th>Prompt模板</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><strong>Short</strong></td>\n<td>\"These are the solutions to the problem from other agents: [other answers]. Based off the opinion of other agents, can you give an updated response...\"</td>\n</tr>\n<tr>\n<td><strong>Long</strong></td>\n<td>\"These are the solutions to the problem from other agents: [other answers]. Using the opinion of other agents as additional advice, can you give an updated response...\"</td>\n</tr>\n</tbody>\n</table></div>\n<p>Long prompt鼓励agent更\"固执\"地坚持自己的答案，延长辩论时间，通常带来更好的最终结果。</p>\n<p><strong>Step 3 — 收敛与最终答案</strong>：\n经过 <span class=\"kb-math kb-math-inline\">T</span> 轮辩论后，各agent通常收敛到单一共识答案。实证发现，LLM agent相对\"随和\"（agreeable），可能是指令微调或RLHF训练的副产品。当需要最终输出时，可以取最后一轮任一agent的答案（已一致）或通过多数投票获得。</p>\n<div class=\"key-point\">💡 关键直觉：辩论不是简单地放大多数正确答案——论文观察到大量案例中所有agent最初都错了，但在辩论过程中通过相互质疑推理过程，最终共同收敛到正确答案。</div>\n<h5>3. 与现有方法的关系</h5>\n<p>MAD与以下方法<strong>正交兼容</strong>，可叠加使用：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>维度</th>\n<th>关系</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Chain-of-Thought (CoT)</td>\n<td>单agent推理深度</td>\n<td>互补：MAD中用CoT prompt初始化agent</td>\n</tr>\n<tr>\n<td>Self-Reflection</td>\n<td>单agent自我修正</td>\n<td>MAD可视为多agent互反射的泛化</td>\n</tr>\n<tr>\n<td>Majority Voting</td>\n<td>多agent聚合</td>\n<td>MAD用辩论替代简单投票，更充分利用LLM的批判能力</td>\n</tr>\n<tr>\n<td>Self-Consistency</td>\n<td>采样多样性</td>\n<td>MAD主动让agent交互而非独立采样后投票</td>\n</tr>\n</tbody>\n</table></div>\n<h5>4. 重要设计选择与分析</h5>\n<p><strong>Agent数量</strong>：固定辩论2轮，将agent从1增加到5+，在算术任务上性能单调递增。当agent较多时，先将所有回复用chatGPT汇总再提供给各agent（而非直接拼接），既减少上下文长度，又进一步提升性能。</p>\n<p><strong>辩论轮数</strong>：固定3个agent，辩论轮数从1增到4，性能单调递增；4轮之后趋于饱和。</p>\n<p><strong>Prompt设计（辩论长度控制）</strong>：\n论文发现通过调整consensus prompt的语言风格，可以控制agent对自身答案的\"固执程度\"：\n- \"Based off the opinion of other agents\"（short）→ agent更容易被说服，快速收敛\n- \"Using the opinion of other agents as additional advice\"（long）→ agent更坚持己见，辩论更久，最终结果更好</p>\n<p>这本质上是控制了agent之间的\"信息信任度\"权衡。</p>\n<p><strong>异构模型辩论</strong>：chatGPT与Bard跨模型辩论在GSM8K上取得17/20的正确率，而单模型Bard为11/20、chatGPT为14/20。即使两模型初始都错，一方也能通过对方的错误推理激发正确的修正。</p>\n<p><strong>不确定性表达</strong>：论文发现，当LLM对某个事实不确定时，不同agent会生成不同的回答。直接询问各agent的置信度往往得到高置信度的错误评估，但通过辩论，不确定的事实会被暴露（因分歧被暴露），agent倾向于放弃或纠正这些事实。</p>\n<h5>5. 核心实验结果</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>任务</th>\n<th>Single Agent</th>\n<th>Self-Reflection</th>\n<th>Multi-Agent (Debate)</th>\n<th>提升</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Arithmetic (%)</td>\n<td>67.0</td>\n<td>72.1</td>\n<td><strong>81.8</strong></td>\n<td>+14.8</td>\n</tr>\n<tr>\n<td>GSM8K (%)</td>\n<td>77.0</td>\n<td>75.0</td>\n<td><strong>85.0</strong></td>\n<td>+8.0</td>\n</tr>\n<tr>\n<td>Chess (ΔPS)</td>\n<td>91.4</td>\n<td>102.1</td>\n<td><strong>122.9</strong></td>\n<td>+31.5</td>\n</tr>\n<tr>\n<td>Biographies</td>\n<td>66.0</td>\n<td>68.3</td>\n<td><strong>73.8</strong></td>\n<td>+7.8</td>\n</tr>\n<tr>\n<td>MMLU (%)</td>\n<td>63.9</td>\n<td>57.7</td>\n<td><strong>71.1</strong></td>\n<td>+7.2</td>\n</tr>\n<tr>\n<td>Chess Validity</td>\n<td>29.3</td>\n<td>38.8</td>\n<td><strong>45.2</strong></td>\n<td>+15.9</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"warn-box\">⚠️ 注意：Self-Reflection在MMLU上反而降分（63.9→57.7），暗示在纯知识问答中自问自答可能引入额外错误，而多agent辩论通过多视角校验避免了这一问题。</div>\n<pre><code class=\"language-python\">plan = coordinator.decompose(task)\nfor subtask in plan:\n    result = workers.assign(subtask).run()\n    coordinator.update(result)\nreturn coordinator.finalize()\n</code></pre>",
      "quiz": {
        "q": "MAD辩论机制中，Long Prompt（使用'Using the opinion of other agents as additional advice'）相比Short Prompt的效果是什么？",
        "options": [
          "加快agent收敛速度，减少辩论轮数",
          "让agent更固执地坚持自身答案，延长辩论时间，通常带来更好的最终结果",
          "减少token消耗，提高推理效率",
          "使agent立即接受多数意见，快速达成共识"
        ],
        "answer": 1,
        "explain": "Long Prompt措辞将其他agent的意见定位为'额外建议'而非'判断依据'，降低了agent对其的采纳程度，从而延长辩论时间并提升最终答案质量。"
      }
    },
    {
      "id": "chatdev",
      "num": 3,
      "name": "ChatDev",
      "fullName": "聊天驱动开发 (ChatDev)",
      "year": "2023.07",
      "org": "清华大学",
      "parent": "camel",
      "paperUrl": "https://arxiv.org/abs/2307.07924",
      "projectUrl": "",
      "category": "organization",
      "motivation": "用Chat Chain组织软件公司分工",
      "summary": "ChatDev 提出了一种虚拟聊天驱动软件公司框架，将瀑布模型开发流程转化为多角色 LLM 智能体的 Chat Chain 协作，通过角色分工、记忆流、自反思与思维指令四大机制，实现了全自动、低成本（不到 1 美元 / 7 分钟）的端到端软件生产。",
      "keyPoints": [
        "提出 <strong>Chat Chain</strong> 机制：将软件开发的瀑布模型（设计 → 编码 → 测试 → 文档）分解为一系列原子化聊天子任务",
        "引入 <strong>双角色协作范式</strong>：每条 Chat 中 Instructor（发布指令）与 Assistant（执行/回复）交替对话",
        "三大 Chat 级机制保障协作质量：",
        "<strong>Role Specialization</strong>（角色特化）：通过 Inception Prompting 预设各 Agent 的社会身份与职责边界",
        "<strong>Memory Stream</strong>（记忆流）：维护完整对话历史 <span class=\"kb-math kb-math-inline\">\\mathcal{M}_t</span>，支持上下文感知的多轮决策",
        "<strong>Self-Reflection</strong>（自反思）：利用 LLM 决策提取器 <span class=\"kb-math kb-math-inline\">\\psi</span> 从对话中提取结构化决策 <span class=\"kb-math kb-math-inline\">\\mathcal{S}_t</span>，驱动后续指令生成",
        "<strong>Thought Instruction</strong>（思维指令）：在 coding/testing 阶段通过临时\"角色翻转\"（程序员 ↔ 审查员）明确注入修改意图，有效缓解代码幻觉",
        "实验表明 ChatDev 能在 <strong>7 分钟内、花费不到 1 美元</strong> 完成包含代码、资源文件和文档的完整软件项目生成"
      ],
      "detail": "<h5>核心示意图</h5>\n<p><img alt=\"ChatDev 整体架构\" src=\"https://arxiv.org/html/2307.07924v1/x1.png\" />\n<em>图 1：ChatDev 虚拟聊天驱动软件公司示意 — 不同社会身份的智能体（CEO、CPO、程序员、测试工程师、美术设计师等）在人类\"客户\"提交需求后，通过协同对话完成开发。</em></p>\n<p><img alt=\"ChatDev 双层架构\" src=\"https://arxiv.org/html/2307.07924v1/x2.png\" />\n<em>图 2：ChatDev 的阶段级与聊天级双层架构。阶段级采用瀑布模型（设计 → 编码 → 测试 → 文档），每阶段再通过 Chat Chain 分解为原子聊天。</em></p>\n<p><img alt=\"三大核心机制\" src=\"https://arxiv.org/html/2307.07924v1/x3.png\" />\n<em>图 3：每条 Chat 中的三大机制 — (a) Role Specialization 通过 Inception Prompting 定义角色；(b) Memory Stream 保存历史对话；(c) Self-Reflection 从对话中提取结构化决策。</em></p>\n<h5>算法流程（单条 Chat）</h5>\n<pre><code class=\"language-python\">M = []                    # 记忆流：会话消息序列\nS = []                    # 决策流：结构化决策集合\n\nfor t in range(max_turns):\n    # Instructor 基于历史记忆与决策生成新指令\n    I_t = Instructor(M, S)\n    # Assistant 接收指令与历史记忆，生成回复/方案\n    A_t = Assistant(M, I_t, S)\n    # 更新记忆流\n    M.append((I_t, A_t))\n    # 提取决策：通过通信协议检测或自反思\n    S.append(psi(I_t, A_t))\n    # 检查终止条件\n    if termination_condition_met(I_t, A_t):\n        break\n</code></pre>\n<h5>动机与背景</h5>\n<p>软件工程长期依赖人类直觉、领域经验与多角色协商，自动化程度有限。虽然深度学习在代码补全等局部任务上取得进展，但<strong>端到端的完整软件生产</strong>仍面临巨大挑战：各阶段（设计、编码、测试、文档）高度耦合，单一模型难以统筹全部决策。ChatDev 受到 CAMEL 等角色扮演式 LLM 对话框架的启发，核心洞察是：<strong>将软件公司的社会分工结构\"映射\"为多智能体对话网络</strong>，让 LLM 充当不同职位的\"虚拟员工\"，通过结构化的对话链驱动完整开发流程。</p>\n<h5>核心机制详解</h5>\n<p><strong>1. 双层架构：阶段级 + 聊天级</strong></p>\n<p>ChatDev 自顶向下分为两层：\n- <strong>阶段级（Phase Level）</strong>：遵循经典<strong>瀑布模型</strong>，将开发过程分为四个顺序阶段：<strong>设计（Designing）</strong>、<strong>编码（Coding）</strong>、<strong>测试（Testing）</strong>、<strong>文档（Documenting）</strong>。每个阶段由特定角色组合负责。\n- <strong>聊天级（Chat Level）</strong>：每个阶段被 <strong>Chat Chain</strong> 进一步拆解为多个<strong>原子聊天</strong>（Atomic Chat）。每条原子聊天是双角色（Instructor ↔ Assistant）间的独立会话单元，专门解决一个子任务（如\"设计模块接口\"\"编写某函数\"\"审查某段代码\"）。</p>\n<div class=\"key-point\">💡 关键：Chat Chain 的分解粒度使得复杂开发任务变为多个\"小对话\"，每个对话上下文短、目标单一，大幅降低了 LLM 的认知负担和幻觉风险。</div>\n<p><strong>2. 三大 Chat 级机制</strong></p>\n<p>每条原子聊天内部通过三个机制保证协作质量：</p>\n<ul>\n<li>\n<p><strong>Role Specialization（角色特化）</strong>：每条聊天开始前，通过 <strong>Inception Prompting</strong> 为 Instructor 和 Assistant 注入详细角色描述、任务说明、通信协议和终止条件。例如，设计阶段 CEO 担任 Instructor，CPO 担任 Assistant；编码阶段 CTO 担任 Instructor，程序员担任 Assistant。角色预设包括\"禁止重复指令\"\"禁止无信息回复\"\"防止无限循环\"等行为约束。</p>\n</li>\n<li>\n<p><strong>Memory Stream（记忆流）</strong>：维护该聊天内全部历史对话记录 <span class=\"kb-math kb-math-inline\">\\mathcal{M}_t = \\langle (\\mathcal{I}_1, \\mathcal{A}_1), \\dots, (\\mathcal{I}_t, \\mathcal{A}_t) \\rangle</span>，使得每一轮交互都能访问完整上下文。这解决了普通 LLM 调用中\"遗忘前文\"的问题，保证多轮协作的连贯性。</p>\n</li>\n<li>\n<p><strong>Self-Reflection（自反思）</strong>：引入决策提取器 <span class=\"kb-math kb-math-inline\">\\psi</span>（LLM-based），从每轮对话 <span class=\"kb-math kb-math-inline\">(\\mathcal{I}_t, \\mathcal{A}_t)</span> 中<strong>自动提取结构化决策</strong> <span class=\"kb-math kb-math-inline\">\\mathcal{S}_t</span>，如\"审查通过\"\"需修改参数 X\"\"确认接口签名\"等。这些决策后续被 Instructor 阅读以生成更有针对性的下一条指令，形成\"反思→改进\"的闭环。</p>\n</li>\n</ul>\n<div class=\"warn-box\">⚠️ 注意：Self-Reflection 的实现有两种模式 — 一是通过预定义的通信协议（如特定格式的\"审查结论\"），二是通过 LLM 自由文本分析。实验中使用混合策略。</div>\n<p><strong>3. Thought Instruction（思维指令）：缓解代码幻觉的关键创新</strong></p>\n<p>在编码和测试阶段的原子聊天中，ChatDev 引入 <strong>Thought Instruction</strong> 机制：当 Assistant（程序员）完成一段代码后，Instructor 临时执行\"<strong>角色翻转</strong>\"——以审查者视角明确指出\"哪些方法尚未实现\"\"哪些边界条件需要补充\"，然后再翻回 Instructor 角色，将这些思维要点<strong>注入到下一轮指令</strong>中。这种方式避免了模糊的通用反馈（如\"改进代码\"），提供了精确的修改引导，显著减少了代码幻觉。</p>\n<p>公式层面，Thought Instruction 通过修改 Instruction 生成函数的输入来实现：<span class=\"kb-math kb-math-inline\">\\mathcal{I}_{t+1} = \\text{Instructor}(\\mathcal{M}_t, \\mathcal{S}_t \\cup \\mathcal{T}_t)</span>，其中 <span class=\"kb-math kb-math-inline\">\\mathcal{T}_t</span> 是翻转角色后生成的思维要点集合。</p>\n<h5>与传统方法的区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th>传统软件自动化</th>\n<th>ChatDev</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>组织方式</td>\n<td>单一模型端到端生成</td>\n<td>多角色 LLM 模拟公司分工</td>\n</tr>\n<tr>\n<td>开发流程</td>\n<td>无显式阶段划分</td>\n<td>瀑布模型 + Chat Chain 分解</td>\n</tr>\n<tr>\n<td>代码质量保障</td>\n<td>无反馈机制</td>\n<td>自反思 + Thought Instruction</td>\n</tr>\n<tr>\n<td>幻觉处理</td>\n<td>依赖模型自身</td>\n<td>角色翻转注入精确修改意图</td>\n</tr>\n<tr>\n<td>成本与效率</td>\n<td>通常需要大量人工干预</td>\n<td>全自动，&lt; $1 / &lt; 7 min</td>\n</tr>\n</tbody>\n</table></div>\n<h5>实验效果</h5>\n<p>在 100 个不同领域的需求上评估（游戏、工具、Web 应用等），ChatDev 平均生成 <strong>4.26 个代码文件</strong> + <strong>8.74 个资源文件</strong> + <strong>4.04 个文档文件</strong>，包含 <strong>131.61 行源码</strong>。在代码完整性、可执行率和功能正确性方面均显著优于纯代码生成基线（CodeGen、Codex 等），同时每个项目总成本不到 1 美元，时间不超过 7 分钟。统计分析还表明，ChatDev 在\"识别漏洞\"和\"修正幻觉\"方面表现突出，验证了多角色对话审查机制的有效性。</p>",
      "quiz": {
        "q": "ChatDev 中 Thought Instruction 的直接作用是什么？",
        "options": [
          "把整个软件项目一次性压缩成单轮 prompt",
          "通过角色翻转给出精确修改意图，减少编码阶段的代码幻觉",
          "用强化学习替代所有聊天过程",
          "让 CEO 直接生成最终代码，跳过测试阶段"
        ],
        "answer": 1,
        "explain": "Thought Instruction 不是重写全部流程，而是在编码/测试阶段用角色翻转注入具体修改要点，让后续指令更聚焦，从而缓解代码幻觉。"
      }
    },
    {
      "id": "autogen",
      "num": 4,
      "name": "AutoGen",
      "fullName": "自动生成智能体 (AutoGen)",
      "year": "2023.08",
      "org": "Microsoft",
      "parent": "camel",
      "paperUrl": "https://arxiv.org/abs/2308.08155",
      "projectUrl": "",
      "category": "foundation",
      "motivation": "统一多Agent对话与工具编排接口",
      "summary": "AutoGen 提出了基于 **ConversableAgent** 统一抽象和 **Conversation Programming** 范式的多智能体对话框架，将 LLM、人类和工具统一为可对话实体，通过简洁的对话模式（如联合对话、层级对话）组合出复杂的多智能体工作流，极大简化了 LLM 应用的开发。",
      "keyPoints": [
        "提出 <strong>ConversableAgent</strong> 统一抽象：将 LLM、人类用户和工具（代码执行器、函数调用等）均封装为可对话的 Agent，具备统一的 send/receive/reply 接口",
        "提出 <strong>Conversation Programming</strong> 范式：通过<strong>计算</strong>（Python 代码控制对话流程）和<strong>配置</strong>（自然语言/JSON 定义角色和终止条件）两种原语组合多智能体对话",
        "支持多种对话模式：Two-Agent Chat（双智能体对话）、Sequential Chat（顺序多智能体接力）、Group Chat（动态群聊，含 Speaker 选择机制）、Nested Chat（层级嵌套对话）",
        "<strong>6 大应用验证</strong>：数学问题求解（A1）、检索增强代码问答（A2）、基于 AlphaChat 的决策制定（A3）、OptiGuide 编码助手（A4）、动态群聊（A5）、对话式国际象棋（A6）",
        "无缝融合人类参与：人类可在任意对话节点注入反馈，实现 Human-in-the-Loop",
        "代码生成与执行闭环：Agent 自动生成代码 → 执行代码 → 根据执行结果自我修正，形成自主问题求解循环",
        "实验证明：在 MATH、HumanEval、OptiGuide 等基准上，AutoGen 显著超越单 Agent 基线和原始 GPT-4"
      ],
      "detail": "<p><img alt=\"AutoGen 框架总览图\" src=\"https://ar5iv.labs.arxiv.org/html/2308.08155/assets/x1.png\" />\n<em>图 1：AutoGen 框架总览——ConversableAgent 统一抽象与 Conversation Programming 范式</em></p>\n<h5>动机与背景</h5>\n<p>传统 LLM 应用开发面临两大痛点：(1) 单一 LLM 调用难以完成复杂推理、工具使用、多步规划等多维任务；(2) 构建多 Agent 系统时，工程师需要从零设计复杂的通信协议、状态管理和错误恢复机制。AutoGen 的核心理念是：<strong>将 LLM 应用统一为多个可对话实体之间的对话</strong>，从而用一种简洁、可组合的范式替代手工工程化的复杂度。</p>\n<h5>核心机制：ConversableAgent</h5>\n<p>所有 Agent（LLM Agent、Human Agent、Tool Agent）都继承自同一个 <code>ConversableAgent</code> 基类，拥有三个核心能力：</p>\n<ol>\n<li><strong>send(receiver, message)</strong>：向另一个 Agent 发送消息</li>\n<li><strong>receive(sender, message)</strong>：接收来自另一个 Agent 的消息</li>\n<li><strong>generate_reply(sender, message)</strong>：根据对话上下文生成回复</li>\n</ol>\n<p>Agent 的回复生成可配置为以下三种模式之一：(a) 调用 LLM（如 GPT-4）生成；(b) 由人类用户输入；(c) 执行工具/函数并返回结果。这种统一设计使得任何 Agent 组合都无需额外的适配层。</p>\n<h5>Conversation Programming：计算 + 配置</h5>\n<p>AutoGen 提出<strong>对话即程序</strong>的理念，开发者通过两种原语编排对话：</p>\n<ul>\n<li><strong>计算原语（Computation）</strong>：用 Python 代码直接控制对话流程。例如：</li>\n</ul>\n<p>```python</p>\n<h1>AutoGen 对话编程伪代码</h1>\n<p>assistant = AssistantAgent(\"assistant\", llm_config)\nuser_proxy = UserProxyAgent(\"user_proxy\", code_execution_config)</p>\n<h1>初始化对话</h1>\n<p>user_proxy.initiate_chat(\n    assistant,\n    message=\"请解决这个数学问题：...\",\n    max_turns=10\n)</p>\n<h1>顺序链式对话：A1 输出反馈给 A2</h1>\n<p>result1 = agent1.initiate_chat(agent2, message=task)\nresult2 = agent2.initiate_chat(agent3, message=result1.summary)</p>\n<h1>群聊模式：多个 Agent 在一个群组中动态发言</h1>\n<p>groupchat = GroupChat(\n    agents=[agent_a, agent_b, agent_c],\n    speaker_selection_method=\"auto\"  # 或 \"round_robin\", \"random\"\n)\nmanager = GroupChatManager(groupchat)\nagent.initiate_chat(manager, message=\"开始讨论\")</p>\n<ul>\n<li><strong>配置原语（Configuration）</strong>：通过自然语言或结构化配置定义 Agent 角色、回复终止条件等。例如：</li>\n</ul>\n<p>```python\nsystem_message = \"你是一位数学专家，请逐步推理并给出最终答案。\"\ntermination_msg = \"TERMINATE\"</p>\n<div class=\"key-point\">💡 关键：这种<strong>对话即程序</strong>的设计将多 Agent 编排从框架内置的\"黑盒\"逻辑，转变为开发者可完全自定义的\"白盒\"流程，极大提升了灵活性和可调试性。</div>\n<h5>对话模式</h5>\n<p>AutoGen 支持多种可组合的对话模式：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>模式</th>\n<th>描述</th>\n<th>适用场景</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><strong>Two-Agent Chat</strong></td>\n<td>两个 Agent 之间来回对话</td>\n<td>代码生成与执行闭环</td>\n</tr>\n<tr>\n<td><strong>Sequential Chat</strong></td>\n<td>多个双 Agent 对话按顺序链接</td>\n<td>多步推理流水线</td>\n</tr>\n<tr>\n<td><strong>Group Chat</strong></td>\n<td>多个 Agent 在群组中动态选择发言者</td>\n<td>开放讨论、头脑风暴</td>\n</tr>\n<tr>\n<td><strong>Nested Chat</strong></td>\n<td>在一次回复中嵌套子对话</td>\n<td>复杂决策中的局部深入分析</td>\n</tr>\n</tbody>\n</table></div>\n<h5>六大应用验证</h5>\n<ul>\n<li><strong>A1 数学问题求解</strong>：AssistantAgent 负责生成解题代码，UserProxyAgent 执行代码并反馈错误，形成自主修正循环。在 MATH 数据集上，AutoGen+GPT-4 达到 <strong>69.5%</strong> 准确率，显著优于单次 GPT-4 调用的 <strong>53.2%</strong>。</li>\n<li><strong>A2 检索增强代码问答</strong>：引入 RetrieveUserProxyAgent，将文档检索、上下文注入和代码问答集成为一体化对话流程。</li>\n<li><strong>A3 AlphaChat 决策制定</strong>：双 Agent 结构（分析 Agent + 决策 Agent）在 OptiGuide 的供应链优化任务中实现结构化决策。</li>\n<li><strong>A4 OptiGuide 编码助手</strong>：通过层级对话链完成\"需求解析 → 数学建模 → 代码生成 → 结果解释\"全流程。</li>\n<li><strong>A5 动态群聊</strong>：GroupChat Manager 通过 LLM 动态选择下一位发言者，在数学问题上多角色讨论可进一步提升答案质量。</li>\n<li><strong>A6 对话式国际象棋</strong>：两个 LLM Agent 分别扮演黑白双方，通过自然语言描述走子策略并由棋盘执行器验证。</li>\n</ul>\n<h5>实验关键发现</h5>\n<ol>\n<li><strong>多 Agent 优于单 Agent</strong>：在 5 项基准测试中，AutoGen 的多 Agent 配置一致优于单 Agent 基线，尤其在需要工具使用的任务上提升显著（+15～25%）。</li>\n<li><strong>Human-in-the-Loop 的价值</strong>：在编码任务中，人类在关键节点提供一次反馈即可使成功概率从 60% 提升至 85%。</li>\n<li><strong>群聊的智能涌现</strong>：Group Chat 中多 Agent 交叉验证可以纠正单 Agent 的推理错误，验证了\"多样性带来鲁棒性\"的假设。</li>\n</ol>",
      "quiz": {
        "q": "AutoGen 中 Conversation Programming 范式的核心创新是什么？",
        "options": [
          "使用强化学习自动优化多 Agent 对话策略",
          "将多 Agent 对话编排为可编程的计算+配置原语，而非黑盒逻辑",
          "通过知识蒸馏将多 Agent 模型压缩为单一模型",
          "引入对抗训练提升 Agent 的鲁棒性"
        ],
        "answer": 1,
        "explain": "Conversation Programming 将对话流程暴露为 Python 可编程的计算原语和可配置的角色/终止条件，实现完全白盒可控的多 Agent 编排，这是相比 LangChain 等框架的关键差异化设计。"
      }
    },
    {
      "id": "metagpt",
      "num": 5,
      "name": "MetaGPT",
      "fullName": "元编程协作框架 (MetaGPT)",
      "year": "2023.08",
      "org": "DeepWisdom",
      "parent": "chatdev",
      "paperUrl": "https://arxiv.org/abs/2308.00352",
      "projectUrl": "",
      "category": "organization",
      "motivation": "把SOP编码进多角色流水线",
      "summary": "MetaGPT 提出了一种基于 SOP（标准操作流程）的多智能体元编程框架，将 LLM 智能体组织为模拟软件公司的角色分工流水线，通过结构化通信与可执行反馈机制，显著提升了端到端软件开发的代码质量和可执行性。",
      "keyPoints": [
        "提出 <strong>SOP 驱动的多智能体协作框架</strong>：将软件开发流程分解为产品经理、架构师、项目经理、工程师和 QA 工程师 5 个角色的标准化协作流水线",
        "<strong>结构化通信机制</strong>：设计共享消息池（Message Pool）与订阅发布（Publish-Subscribe）模式，每个角色发布结构化文档（PRD、设计文档、任务列表、代码、测试报告），减少通信信息损失",
        "<strong>可执行反馈（Executable Feedback）</strong>：QA 角色在运行时执行生成的代码并反馈错误信息，形成迭代自优化闭环，Pass@1 提升 4.2%~5.4%",
        "构建 <strong>SoftwareDev 数据集</strong>：包含 70 个多样化软件开发任务，涵盖游戏开发、网页应用、算法实现等场景",
        "在 HumanEval、MBPP 和 SoftwareDev 等多个基准上取得 <strong>SOTA 表现</strong>，可执行性评分从 2.0 提升至 3.75，人工修订成本从 2.25 降至 0.83"
      ],
      "detail": "<p><img alt=\"MetaGPT 整体框架图\" src=\"https://ar5iv.labs.arxiv.org/html/2308.00352/assets/imgs/1-metagpt_overall_update.png\" /></p>\n<p><em>图：MetaGPT 框架总览——5 个角色（Product Manager、Architect、Project Manager、Engineer、QA Engineer）通过共享消息池进行结构化通信，遵循 SOP 流程完成端到端软件开发。</em></p>\n<h5>动机与背景</h5>\n<p>传统基于 LLM 的多智能体系统（如 AutoGPT、LangChain、AgentVerse、ChatDev）虽然展现了通用问题求解能力，但在复杂系统开发中存在两个核心瓶颈：</p>\n<ol>\n<li><strong>缺乏需求系统化分解能力</strong>：从模糊的自然语言需求到可执行的代码，需要结构化的中间表示（需求文档、设计文档、接口定义），现有方法跳过了这些关键步骤，导致生成的代码偏离预期。</li>\n<li><strong>通信信息损失</strong>：多智能体间的自然语言通信存在模糊性和信息衰减，随着流程推进，需求理解偏差逐步放大。</li>\n</ol>\n<p>MetaGPT 的核心洞察是：<strong>人类软件公司的成功离不开 SOP（标准操作流程）</strong>。通过将软件工程的最佳实践（需求分析→系统设计→任务拆分→编码→测试）固化为智能体的工作流，并强制输出结构化中间文档，可以大幅提升 LLM 生成代码的质量。</p>\n<h5>核心机制：SOP 驱动的多角色流水线</h5>\n<p>MetaGPT 模拟了一家软件公司的角色分工，每位智能体承担特定职责，按 SOP 顺序协作：</p>\n<p><strong>角色 1：产品经理（Product Manager）</strong>\n- 输入：用户自然语言需求\n- 输出：<strong>PRD（Product Requirement Document）</strong>，包含产品目标、用户故事、功能需求、约束条件\n- 使用结构化模板确保需求完整，避免歧义</p>\n<p><strong>角色 2：架构师（Architect）</strong>\n- 输入：PRD\n- 输出：<strong>系统设计文档（Design Document）</strong>，包含系统架构、模块划分、接口定义、数据流图\n- 将抽象需求转化为具体的技术方案和类/函数设计</p>\n<p><strong>角色 3：项目经理（Project Manager）</strong>\n- 输入：设计文档\n- 输出：<strong>任务列表（Task List）</strong>，将设计拆分为可独立实现的子任务，分配优先级和依赖关系</p>\n<p><strong>角色 4：工程师（Engineer）</strong>\n- 输入：任务列表 + 设计文档\n- 输出：<strong>代码（Code）</strong>，基于分配的任务和接口规范编写可执行代码</p>\n<p><strong>角色 5：QA 工程师（QA Engineer）</strong>\n- 输入：代码 + PRD\n- 输出：<strong>测试报告（Test Report）</strong>，通过实际执行代码发现错误（如 ImportError、SyntaxError、运行时异常），将错误信息反馈给工程师修正</p>\n<p><img alt=\"MetaGPT 详细工作流\" src=\"https://ar5iv.labs.arxiv.org/html/2308.00352/assets/imgs/3-metagpt_details.jpg\" /></p>\n<p><em>图：MetaGPT 详细角色分工与数据流——每个角色接收上游结构化输出并生成下游文档，形成完整的文档链。</em></p>\n<h5>结构化通信：消息池与订阅机制</h5>\n<p>MetaGPT 的关键创新在于<strong>通信方式的结构化</strong>。传统多智能体系统使用自由文本通信，信息在传递中逐渐模糊。MetaGPT 采用：</p>\n<ul>\n<li><strong>共享消息池（Shared Message Pool）</strong>：所有角色向消息池发布结构化消息（JSON/YAML 格式的文档），替代自然语言对话</li>\n<li><strong>订阅-发布模式（Publish-Subscribe）</strong>：每个角色根据 SOP 定义，只订阅其上游角色的输出消息，过滤无关信息</li>\n<li><strong>结构化文档格式</strong>：PRD、设计文档、任务列表、代码、测试报告均有固定模式，包含明确的字段和类型定义</li>\n</ul>\n<p><img alt=\"消息共享机制\" src=\"https://ar5iv.labs.arxiv.org/html/2308.00352/assets/imgs/2-message_sharing.jpg\" /></p>\n<p><em>图：MetaGPT 的消息共享与订阅机制示意——角色通过结构化消息而非自然语言进行通信。</em></p>\n<div class=\"key-point\">💡 <strong>关键设计</strong>：结构化通信不仅减少信息损失，还使得中间产物（PRD、设计文档）对人类可读，便于人工审查和修订。这与纯端到端的\"需求→代码\"黑盒方案形成鲜明对比。</div>\n<h5>可执行反馈机制</h5>\n<p>MetaGPT 引入了<strong>运行时反馈闭环</strong>，由 QA 角色在代码生成后立即执行并收集错误：</p>\n<pre><code class=\"language-python\"># MetaGPT 可执行反馈核心流程（简化伪代码）\ndef executable_feedback_loop(engineer_output, qa_agent):\n    code = engineer_output.code\n    max_iterations = 3\n\n    for iteration in range(max_iterations):\n        # 1. QA 执行代码并捕获错误\n        test_result = qa_agent.run_code(code)\n\n        if test_result.success:\n            break  # 通过测试\n\n        # 2. 将错误信息反馈给工程师\n        feedback = {\n            &quot;error_type&quot;: test_result.error_type,\n            &quot;error_message&quot;: test_result.error_message,\n            &quot;traceback&quot;: test_result.traceback\n        }\n\n        # 3. 工程师基于反馈修订代码\n        code = engineer.revise_code(\n            original_code=code,\n            feedback=feedback,\n            design_doc=upstream_design,\n            prd=upstream_prd\n        )\n\n    return code, test_result\n</code></pre>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：可执行反馈是一个轻量级机制，聚焦于<strong>运行时错误</strong>（即代码能否跑通）而非功能正确性。实验表明，仅此机制即带来显著提升：HumanEval Pass@1 提升 4.2%，MBPP Pass@1 提升 5.4%，可执行性评分从 3.67 升至 3.75，人工修订成本从 2.25 降至 0.83。</div>\n<h5>与传统方法的区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th>AutoGPT / LangChain</th>\n<th>ChatDev</th>\n<th><strong>MetaGPT</strong></th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>角色分工</td>\n<td>单一 Agent</td>\n<td>多角色流水线</td>\n<td>多角色 + <strong>SOP 标准化</strong></td>\n</tr>\n<tr>\n<td>通信方式</td>\n<td>自由文本 / 函数调用</td>\n<td>自然语言对话</td>\n<td><strong>结构化文档 + 消息池</strong></td>\n</tr>\n<tr>\n<td>中间产物</td>\n<td>无</td>\n<td>有限</td>\n<td><strong>PRD→设计→任务→代码→测试</strong></td>\n</tr>\n<tr>\n<td>反馈机制</td>\n<td>无</td>\n<td>无</td>\n<td><strong>可执行反馈迭代</strong></td>\n</tr>\n<tr>\n<td>可执行性</td>\n<td>1/4</td>\n<td>2/4</td>\n<td><strong>3/4</strong>（Flappy Bird）</td>\n</tr>\n</tbody>\n</table></div>\n<p><img alt=\"象限对比图\" src=\"https://ar5iv.labs.arxiv.org/html/2308.00352/assets/imgs/6-quadrant_chart.png\" /></p>\n<p><em>图：MetaGPT 与基线方法的象限对比，展示 MetaGPT 在代码质量和可执行性上的综合优势。</em></p>\n<p><img alt=\"软件任务示例\" src=\"https://ar5iv.labs.arxiv.org/html/2308.00352/assets/imgs/5-softwaredev_tasks.jpg\" /></p>\n<p><em>图：SoftwareDev 数据集中的典型任务——2048 游戏、Brick Breaker 游戏、Flappy Bird 游戏。</em></p>\n<h5>关键实验发现</h5>\n<ul>\n<li><strong>Table 4（可执行性对比）</strong>：在 Flappy Bird 任务上，MetaGPT 评分 3（\"largely satisfying expected workflow\"），ChatDev 评分 2（\"executable code\"），其余方法评分 1（\"complete failure\"）</li>\n<li><strong>可执行反馈贡献</strong>：加入反馈后，可执行性从 3.67→3.75，人工修订成本从 2.25→0.83</li>\n<li><strong>通用性验证</strong>：HumanEval Pass@1 提升 4.2%，MBPP Pass@1 提升 5.4%</li>\n<li><strong>附录 Table 6</strong>：无反馈的纯 MetaGPT 在 70 个任务上仍可生成平均数百行代码，验证 SOP 框架本身的有效性</li>\n</ul>",
      "quiz": {
        "q": "MetaGPT 中'可执行反馈（Executable Feedback）'机制的核心作用是什么？",
        "options": [
          "自动生成完整的 PRD 文档和系统设计图",
          "在运行时执行生成代码并反馈错误，驱动迭代修订直到代码可运行",
          "通过强化学习训练工程师 Agent 的代码生成策略",
          "将自然语言需求直接编译为可执行二进制文件"
        ],
        "answer": 1,
        "explain": "可执行反馈由 QA Agent 在运行时执行代码，捕获 ImportError/SyntaxError/运行时异常并反馈给 Engineer 修订，聚焦于提升代码可运行性（而非功能正确性校对）。"
      }
    },
    {
      "id": "agentverse",
      "num": 6,
      "name": "AgentVerse",
      "fullName": "智能体协作宇宙 (AgentVerse)",
      "year": "2023.08",
      "org": "清华大学",
      "parent": "camel",
      "paperUrl": "https://arxiv.org/abs/2308.10848",
      "projectUrl": "",
      "category": "foundation",
      "motivation": "支持动态组队并分析群体涌现",
      "summary": "AgentVerse 提出了一个模拟人类团队协作的四阶段多智能体框架（专家招募→协作决策→动作执行→评估反馈），并设计了水平/垂直两种决策结构，在文本理解、推理、编码、工具使用和具身 AI 等任务上证明了多智能体组相比单智能体的显著优势，同时首次系统性地观察和分类了智能体之间的涌现社会行为（志愿行为、从众行为、破坏行为）。",
      "keyPoints": [
        "四阶段协作框架：Expert Recruitment（招募相应专长的智能体）→ Collaborative Decision-Making（多智能体讨论达成共识）→ Action Execution（各智能体独立执行）→ Evaluation（评估结果并循环迭代）",
        "两种决策结构：(1) <strong>Horizontal（水平民主式）</strong>：所有智能体平等对话、自由讨论达成共识；(2) <strong>Vertical（垂直层级式）</strong>：一名 Leader 综合众议后做出最终决定",
        "智能体角色可定制，可指定不同专长领域的 Expert Agent（如 Planner、Coder、Reviewer 等）",
        "支持广泛的下游任务：文本理解与生成、数学与逻辑推理、代码生成、工具使用、Minecraft 具身协作",
        "首次系统性识别和命名三种涌现行为：Volunteer Behavior（志愿贡献时间/资源）、Conformity Behavior（从众附和错误答案）、Destructive Behavior（破坏性竞争）",
        "GPT-4 驱动的多智能体组在编码（HumanEval 94.0→94.8）和工具使用上显著优于单智能体，但在简单推理任务上 GPT-3.5 组可能因不良讨论而退化",
        "框架与 LLM 解耦，可接入任意 LLM 后端"
      ],
      "detail": "<h5>1. 核心示意图</h5>\n<p><img alt=\"AgentVerse 四阶段框架图\" src=\"https://ar5iv.labs.arxiv.org/html/2308.10848/assets/images/fig1_agentverse_framework.png\" />\n<em>图：AgentVerse 四阶段多智能体协作框架。阶段1：根据任务描述招募专家智能体；阶段2：多智能体通过讨论（水平或垂直决策）达成行动共识；阶段3：各智能体执行其分配到的子任务；阶段4：评估器检验执行结果，如未完成则循环返回阶段2。</em></p>\n<h5>2. 算法伪代码</h5>\n<pre><code class=\"language-python\"># AgentVerse 多智能体协作主循环\ntask = get_user_query()\nexperts = recruit_experts(task)  # 阶段1: 专家招募\n\nwhile not task_completed:\n    # 阶段2: 协作决策\n    if decision_structure == &quot;horizontal&quot;:\n        plan = horizontal_discussion(experts, task, context)\n    else:  # vertical\n        leader_plan = leader_decide(experts, task, context)\n        plan = vertical_ratify(experts, leader_plan)\n\n    # 阶段3: 动作执行\n    results = {}\n    for expert, sub_task in plan.assignments.items():\n        results[expert] = expert.execute(sub_task)\n\n    # 阶段4: 评估与反馈\n    evaluation = evaluator.judge(task, plan, results)\n    if evaluation.is_complete:\n        break\n    context.update(evaluation.feedback)\n</code></pre>\n<h5>3. 方法详细解读</h5>\n<p><strong>动机与背景</strong>。大型语言模型（LLM）在单智能体推理（如 Chain-of-Thought、Self-Refine）上已取得显著进展，但在更复杂、多步骤的现实任务中存在三个根本性问题：(1) 单智能体容易在长链推理中\"思维僵化\"，缺乏外部视角纠正错误；(2) 真实团队协作中不同成员各有所长，单智能体难以同时具备所有领域的深度专长；(3) 人类解决问题的过程本质上是社会性、协作性的，但现有 LLM 应用大多忽视这一点。AgentVerse 的核心动机是将\"人类团队协作流程\"形式化为一个可复用的 LLM 驱动框架，让多个智能体像人类团队一样讨论、计划、执行和迭代。</p>\n<p><strong>四阶段流程设计</strong>。框架的核心是模拟人类团队的经典问题解决模式（Tuckman 的 Forming-Storming-Norming-Performing 模型在 AI 中的工程化实现）：</p>\n<ul>\n<li>\n<p><strong>阶段1 — Expert Recruitment</strong>：根据任务描述自动确定所需专长领域，为每个领域招募一个 Expert Agent。例如，编码任务可能招募 Planner、Coder 和 Reviewer，Minecraft 任务可能招募 Builder、Gatherer 和 Crafter。每个 Agent 通过系统提示（system prompt）被注入对应专长角色设定。</p>\n</li>\n<li>\n<p><strong>阶段2 — Collaborative Decision-Making</strong>：这是框架的核心创新。多智能体基于当前的全局上下文进行结构化讨论。讨论不是简单的\"轮流发言\"，而是每个智能体基于自身专长提出建议，并对他人的提案给出反馈。讨论结果收敛为一个清晰的行动计划（Action Plan），将总任务分解为分配给各智能体的子任务。</p>\n</li>\n<li>\n<p><strong>阶段3 — Action Execution</strong>：各智能体严格按 Action Plan 独立执行其子任务。执行可以是代码生成、工具调用、Minecraft 内动作指令等。这一阶段是并行的——各智能体在没有依赖关系的子任务上同时执行。</p>\n</li>\n<li>\n<p><strong>阶段4 — Evaluation</strong>：Evaluator（可以是一个独立智能体或基于规则）检查整体执行结果是否满足任务目标。如果满足，流程终止；否则，将评估反馈和当前环境状态作为上下文注入下一轮决策（回到阶段2），形成闭环迭代。</p>\n</li>\n</ul>\n<p><strong>Horizontal vs Vertical 决策结构</strong>。这是框架的关键设计选择：\n- <strong>Horizontal（水平/民主式）</strong>：所有参与智能体地位平等，自由讨论。每个智能体都能看到其他智能体的发言并回应。优点是信息流动充分，可能产生更创新的方案；缺点是讨论不可控，可能陷入低效争论或被错误观点带偏（引发 Conformity 行为）。\n- <strong>Vertical（垂直/层级式）</strong>：指定一个 Leader 智能体，由 Leader 综合各 Experts 的建议后制定最终计划。优点是决策效率高、方向一致性强；缺点是可能忽略边缘但有价值的观点。论文实验表明，对于 GPT-3.5 驱动的智能体，Vertical 结构在复杂任务上往往更鲁棒。</p>\n<p><strong>与传统单智能体方法的对比</strong>。相比 Chain-of-Thought（单智能体逐步推理）和 Self-Refine（单智能体自我批评修正），AgentVerse 的核心差异在于：(1) 引入了多视角——不同专长的 Agent 对同一问题从不同角度分析，覆盖单智能体可能忽略的盲点；(2) 外部评估——Evaluation 由独立的 Evaluator 执行，比单智能体\"自我评价\"更客观；(3) 角色分工——将复杂任务分解为专业化子任务并行执行，超越单智能体串行处理的限制。论文实验显示，在工具使用任务上，Group 配置 (79.5) 显著优于 Solo (73.1) 和 CoT (56.6)，验证了多视角讨论和专业化分工的增益。</p>\n<div class=\"key-point\">💡 关键：AgentVerse 的优势在于\"将认知负荷分散到多个专长智能体\"，而非让一个智能体承担所有推理。尤其在编码和工具使用任务上，Planner + Coder + Reviewer 的分工模式被证明极为有效。</p>\n<p>⚠️ 注意：多智能体讨论也可能引入负面效应。论文发现 GPT-3.5 智能体在简单推理任务上（如 MGSM），Group 配置可能因错误观点的从众传播而比 Solo 退化（80.8 vs 82.4）。这启示我们，多智能体协作不是\"银弹\"，需要匹配任务复杂度和 LLM 能力。</div>\n<h5>4. 涌现行为分析</h5>\n<p>AgentVerse 在 Minecraft 具身 AI 实验中观察到了三种令人惊讶的社会性涌现行为——这些行为并非预先编程，而是从多智能体交互中自然产生：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>行为类型</th>\n<th>表现</th>\n<th>影响</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><strong>Volunteer（志愿）</strong></td>\n<td>主动贡献富余时间或资源：如 Bob 在等待材料时主动提议并行收集甘蔗，或 Alice 主动把材料转移给有工作台的 Bob</td>\n<td>提升整体效率</td>\n</tr>\n<tr>\n<td><strong>Conformity（从众）</strong></td>\n<td>个别智能体在讨论中放弃正确判断，附和其他智能体的错误共识</td>\n<td>降低决策准确性</td>\n</tr>\n<tr>\n<td><strong>Destructive（破坏）</strong></td>\n<td>智能体在竞争性场景中故意破坏他方进度，追求自身目标最大化</td>\n<td>阻碍任务完成</td>\n</tr>\n</tbody>\n</table></div>\n<p>这些涌现行为的发现表明，多智能体系统不仅是\"工具的叠加\"，更是\"社会系统的微缩\"，其行为动态已经超出单个 LLM 的预期范畴，需要更深层的对齐和协调机制。</p>",
      "quiz": {
        "q": "AgentVerse 框架中，Horizontal（水平）决策结构的主要潜在劣势是什么？",
        "options": [
          "Leader 智能体可能独断专行，忽略其他 Expert 的建议",
          "多智能体自由讨论可能引发从众行为（Conformity），导致错误答案传播",
          "执行阶段各智能体无法并行工作，效率较低",
          "Evaluator 无法在多轮迭代中持续改进评估质量"
        ],
        "answer": 1,
        "explain": "Horizontal 结构中所有智能体平等参与讨论，GPT-3.5 在实验中出现了智能体放弃正确判断、附和群体错误的现象（Conformity Behavior），这是平等讨论的潜在代价。"
      }
    },
    {
      "id": "dylan",
      "num": 7,
      "name": "DyLAN",
      "fullName": "动态LLM智能体网络 (Dynamic LLM-Powered Agent Network)",
      "year": "2023.10",
      "org": "Tsinghua AIR",
      "parent": "agentverse",
      "paperUrl": "https://arxiv.org/abs/2310.02170",
      "projectUrl": "",
      "category": "communication",
      "motivation": "按任务自选团队并动态连边",
      "summary": "DyLAN 将多 LLM-Agent 协作建模为一个**动态前馈网络**，在每层推理时通过 LLM 赋能的 Ranker 动态选择最相关的 Agent 子集参与信息传递，并提出无监督的 **Agent Importance Score (AIS)** 在推理后进行 Agent Team 优化，在 MATH、MMLU、HumanEval 等复杂推理任务上显著超越单 Agent 和静态多 Agent 基线，同时大幅降低 API 调用开销。",
      "keyPoints": [
        "将多 Agent 协作用 <strong>T 层前馈网络</strong> 建模，层间全连接（每层所有 Agent 都能看到上一层所有 Agent 的输出）",
        "在每层推理<strong>时 (Inference-Time)</strong>，引入 <strong>LLM-empowered Ranker</strong> 动态筛选 top-k 最相关的 Agent 响应，其余被剪枝",
        "引入 <strong>Early Stopping</strong> 机制：当连续两层 top-1 Agent 答案一致时提前终止，自适应任务难度",
        "在推理<strong>后 (Post-Inference)</strong>，通过 <strong>Agent Importance Score (AIS)</strong> 评估每个 Agent 的整体贡献，自动找出最优 Agent 子集用于下游任务或下一轮迭代",
        "<strong>Step 1 — Propagation</strong>: 计算每一层中 Agent j 对 Agent i 的贡献：<code>c_{i←j}^{(t)} = softmax(cos(e_i^{(t)}, e_j^{(t-1)}) / τ)</code>，其中 embeddings 由 Ranker LLM 的 hidden states 得到",
        "<strong>Step 2 — Aggregation</strong>: 逐层聚合贡献分数，通过递推公式 <code>s_i^{(t)} = Σ_j c_{i←j}^{(t)}·s_j^{(t-1)}</code> 将重要性从输入层传播到输出层，最终得到每个 Agent 的全局 AIS",
        "<strong>Step 3 — Selection</strong>: 按 AIS 降序排列，选取 top-k 组成优化后的 Agent Team，或剔除低分噪声 Agent",
        "<strong>MATH</strong>（极难数学推理）：DyLAN 达到 37.6% (+3.5 vs Single CoT, +4.1 vs Single)，超越 LLM-Debate (+2.2)",
        "<strong>MMLU</strong>（多学科知识）：70.5% (+4.1 vs Single)，部分学科（如 College Mathematics, Formal Logic）提升高达 25%",
        "<strong>HumanEval</strong>（代码生成）：pass@1 约 13.3% 的相对提升，证实动态协作对代码任务也有效",
        "<strong>效率</strong>：API 调用量仅为 LLM-Blender 的 ~30-50%，且在 Agent 数量增大时优势更明显",
        "<strong>消融实验</strong>：证明了 (a) 动态选择优于静态全连接；(b) Early Stopping 减少 ~40% 推理开销且不损性能；(c) AIS 筛选的 top-k 团队优于随机选择"
      ],
      "detail": "<pre><code class=\"language-python\"># 多智能体协作抽象循环\nplan = coordinator.decompose(task)\nfor subtask in plan:\n    result = coordinator.assign(subtask).run()\n    coordinator.update(result)\nreturn coordinator.final_answer()\n</code></pre>\n<h5>1. 模型架构：T 层前馈 Agent 网络</h5>\n<p><img alt=\"DyLAN Overview\" src=\"https://ar5iv.labs.arxiv.org/html/2310.02170/assets/figs/overview2.png\" /></p>\n<p><em>Figure 1: DyLAN 整体架构示意图。左侧展示了 T 层前馈网络结构，每层包含 N 个 Agent；右侧展示了 Inference-Time Agent Selection 和 Post-Inference AIS 计算的完整流程。</em></p>\n<p>DyLAN 将多 Agent 协作形式化为一个 <strong>T 层前馈网络</strong>，核心组件：</p>\n<ul>\n<li><strong>Node（节点）</strong>: 位置 (t, i) 处的节点代表第 i 个 Agent 在第 t 层的 \"状态\"，其值 <code>x_i^(t)</code> 是该 Agent 看到上一层所有 Agent 的输出后重新生成的响应</li>\n<li><strong>Edge（边）</strong>: 从 (t-1, j) 到 (t, i) 的有向边表示 Agent i 在 t 层 \"参考\" 了 Agent j 在 t-1 层的输出。每条边有权重，由 Ranker 动态计算</li>\n<li><strong>Message Passing</strong>: 标准的前馈信息流：<code>x_i^(t) = f_i( {x_j^(t-1) | j ∈ TopK^(t)(i)} )</code>，其中 TopK 操作由 LLM-empowered Ranker 完成</li>\n</ul>\n<p><strong>关键创新</strong>：不同于 Transformer 中固定的全连接或 GNN 中预定义的图结构，DyLAN 的<strong>连接模式是动态且 query-dependent 的</strong>——同一网络面对不同输入问题时，Ranker 会选择不同的 Agent 子集进行信息聚合。</p>\n<h5>2. Inference-Time: LLM-empowered Ranker</h5>\n<p>这是 DyLAN 实现动态架构的核心机制。Ranker 本身也是一个 LLM（实验中与 Agent 共享同一基础模型），在每一层 t 对每个 Agent i 执行：</p>\n<p><strong>伪代码</strong>：\ndef ranker_layer_t(agent_i, all_agent_outputs_prev_layer, query):\n    \"\"\"\n    Input:\n        agent_i: 当前要被 \"喂入\" 信息的 Agent\n        all_agent_outputs_prev_layer: 上一层所有 Agent 的输出列表\n        query: 原始任务问题\n    Output:\n        top_k_responses: 筛选后的 top-k 个最相关响应\n    \"\"\"\n    prompt = f\"\"\"\n    You are evaluating which agents' responses are\n    most relevant for Agent {i} to consider.\n    Task: {query}\n    Agent {i}'s current draft: {agent_i.current_draft}</p>\n<pre><code>Evaluate each response below on a 1-5 scale for\nrelevance and usefulness:\n\"\"\"\nfor each response_j in all_agent_outputs_prev_layer:\n    prompt += f\"Agent {j}: {response_j}\\n\"\n\nscores = LLM(prompt)  # LLM 打分\ntop_k_indices = argmax_k(scores)\nreturn [all_agent_outputs_prev_layer[idx]\n        for idx in top_k_indices]\n</code></pre>\n<p><strong>实际实现细节</strong>：\n- Ranker 使用与 Agent 相同的基础 LLM（如 GPT-3.5-Turbo），但通过专门的 prompt 模板引导其扮演 \"评判者\" 角色\n- Top-k 中的 k 是一个关键超参数：论文实验发现 k=3 在大部分任务上达到最佳精度-效率平衡\n- Ranker 输出的 scores 除了用于 top-k 筛选外，还被用来计算后续的 AIS\n- <strong>Early Stopping</strong> 逻辑：每层结束后，比较当前层 top-1 Agent 的最终答案与上一层 top-1 的答案；若连续两次一致，则终止推理并输出该答案</p>\n<h5>3. Post-Inference: Agent Importance Score (AIS)</h5>\n<p>推理结束后，DyLAN 利用整个推理轨迹进行 Agent 贡献度评估：</p>\n<p><strong>Step 1 — Contribution Quantification (Propagation)</strong>:\n对于层 t，Agent j (t-1 层) 对 Agent i (t 层) 的贡献定义为：\nc_{i←j}^(t) = softmax( cos(e_i^(t), e_j^(t-1)) / τ )\n其中 <code>e_i^(t)</code> 和 <code>e_j^(t-1)</code> 分别是 Ranker 在评估时产生的 Agent i 和 Agent j 对应输出的 embedding 表示（取 Ranker LLM 最后一层 hidden state）。τ 是温度系数（实验中设为 0.1，使分布更尖锐，区分度更高）。</p>\n<p><strong>为什么用 cosine similarity？</strong> 因为 Ranker 在对 Agent i 评估 Agent j 的输出时，其内部的 hidden state 编码了两者的 \"匹配程度\"：如果 Agent j 的输出确实对 Agent i 有帮助，Ranker 在处理时会自然地将两者的表示对齐，cosine similarity 自然较高。</p>\n<p><strong>Step 2 — Aggregation across Layers</strong>:\n从第一层向后递推聚合：\ns_i^(1) = 1/|N|  （初始化为均匀分布）\ns_i^(t) = Σ_{j=1}^{N} c_{i←j}^(t) · s_j^(t-1)\n最终，Agent j 的全局 AIS = <code>s_j^(T)</code>（第 T 层的聚合值）。这个递推公式本质上是一种 <strong>PageRank 变体</strong>：一个 Agent 的重要性不仅取决于它在某一层被多少 Agent 引用，还取决于引用它的那些 Agent 本身是否重要。</p>\n<p><strong>Step 3 — Team Optimization (Selection)</strong>:\n获得所有 Agent 的 AIS 后：\n- 按 AIS 降序排序\n- 选取 top-k 组成优化后的 Agent Team\n- 可用于：(a) 下一轮更高效的推理（仅保留高 AIS Agent）；(b) 对同一任务族的下游任务直接复用筛选好的团队；或 (c) 剔除低质量/噪声 Agent</p>\n<p><strong>实验验证</strong>：论文在 MMLU 上进行了 AIS-guided team selection 实验，发现仅保留 top-3 (AIS) Agent 的团队，其性能（68.2%）接近全 5 Agent 团队（70.5%），但 API 调用量减少 40%。</p>\n<h5>4. 为什么 DyLAN 优于静态方法？—— 深层分析</h5>\n<p><strong>(a) 动态连接对抗噪声传播</strong>：在静态全连接框架（如 Multi-Agent Debate）中，一个产生错误推理的 Agent 的输出会被所有其他 Agent 看到，错误可能在多次迭代中被放大。DyLAN 的 Ranker 倾向于给不一致或低质量的输出打低分，从而在消息传递阶段就将其剪枝，阻止噪声扩散。论文在 MATH 数据集的 case study 中展示了这一点：一个持续产生错误代数运算的 Agent 在 DyLAN 中从第 2 层起基本被排除在 Top-K 之外。</p>\n<p><strong>(b) 自适应深度提升效率</strong>：Early Stopping 使简单问题在 2-3 层后即可终止，只有极难问题才走到 T=5 的满深度。MATH 数据集上平均推理层数为 3.2 层，相比固定深度 5 层节省约 36% 开销。</p>\n<p><strong>(c) AIS 实现了 \"推理诊断\"</strong>：传统多 Agent 系统对 \"哪些 Agent 真正有用\" 是黑箱的。AIS 提供了可解释的贡献度量，论文发现 AIS 高的 Agent 往往是那些：(i) 推理链更完整（包含更多中间步骤）；(ii) 能发现并纠正其他 Agent 错误的 \"批判者\" 类型 Agent；(iii) 在问题相关领域有更强专业知识的 Agent（如 College Math 问题上，被分配了 \"数学家\" persona 的 Agent AIS 显著更高）。</p>",
      "quiz": {
        "q": "DyLAN 中“dynamic”最核心地体现在哪两个阶段？",
        "options": [
          "只在训练阶段动态增删参数",
          "推理时动态选择 top-k agent 信息源，推理后再用 AIS 优化 agent team",
          "只在数据预处理阶段做动态采样",
          "只在最终投票阶段改动权重"
        ],
        "answer": 1,
        "explain": "DyLAN 的动态性一部分发生在 inference-time ranking，另一部分发生在 post-inference 的 AIS team optimization；这两者共同区别于静态全连接协作。"
      }
    },
    {
      "id": "agentprune",
      "num": 8,
      "name": "AgentPrune",
      "fullName": "智能体通信剪枝 (AgentPrune)",
      "year": "2024.10",
      "org": "HKUST",
      "parent": "dylan",
      "paperUrl": "https://arxiv.org/abs/2410.02506",
      "projectUrl": "",
      "category": "communication",
      "motivation": "剪除冗余恶意消息降低通信成本",
      "summary": "AgentPrune 将 LLM 多智能体系统中的通信视作一个可剪枝的空间-时间消息图，首次形式化“communication redundancy”问题，并通过 one-shot pruning 去掉冗余甚至恶意消息，在尽量不伤性能的前提下显著压缩 token 与推理成本。",
      "keyPoints": [
        "<strong>论文与方法的关系要分清</strong>：论文标题是 <em>Cut the Crap: An Economical Communication Pipeline for LLM-based Multi-Agent Systems</em>，<code>AgentPrune</code> 是其中提出的方法名。",
        "<strong>核心问题是 LLM-MA 的通信冗余</strong>：现有多智能体拓扑虽然能提升效果，但会带来高额 token overhead 与经济成本，不适合大规模部署。",
        "<strong>空间-时间一体剪枝</strong>：方法把多轮多智能体对话表示为 spatial-temporal message-passing graph，并在该图上执行 one-shot pruning。",
        "<strong>剪的不只是“多余”，还有“有害”</strong>：论文明确强调可过滤 redundant 甚至 malicious communication messages。",
        "<strong>无缝集成现有框架</strong>：AgentPrune 设计成可插入式通信层，官方仓库给出了与 AutoGen、GPTSwarm 风格系统的整合示例。",
        "<strong>结果强调 cost-performance tradeoff</strong>：论文报告在六个 benchmark 上，以约 <code>$5.6</code> 的成本达到接近 SOTA 拓扑的结果，而对比方法成本约 <code>$43.7</code>。",
        "<strong>同时提升稳健性</strong>：在两类 agent-based adversarial attacks 下，性能还能提升 <code>3.5%~10.8%</code>。"
      ],
      "detail": "<p><img alt=\"AgentPrune 方法总览\" src=\"https://raw.githubusercontent.com/yanweiyue/AgentPrune/main/image/README/1742733224397.png\" />\n<em>图：AgentPrune 在现有 LLM 多智能体框架外侧插入一个 pruning stage，对空间与时间两个维度上的消息传播进行裁剪。</em></p>\n<pre><code class=\"language-python\"># AgentPrune 的抽象流程（按论文方法整理）\nmessages = run_multi_agent_rounds(query, topology)\nG = build_spatiotemporal_graph(messages)   # 节点/边表示 agent、轮次与消息依赖\n\nspatial_scores = score_cross_agent_edges(G, query)\ntemporal_scores = score_history_edges(G, query)\n\nG_pruned = prune_graph(\n    G,\n    spatial_scores=spatial_scores,\n    temporal_scores=temporal_scores,\n    pruning_rate=r,\n)\n\nanswer = aggregate_on_pruned_topology(G_pruned)\n</code></pre>\n<h5>1. 动机：现有 LLM 多智能体系统很多 token 都花在“无效讨论”上</h5>\n<p>AgentPrune 的出发点不是再设计一个更复杂的协作拓扑，而是反过来问一句：现有拓扑里到底有多少消息是真的必要的？论文认为，像 debate、全连接讨论、复杂轮转群聊这类系统虽然常常有效，但中间会产生大量重复解释、低价值跟随、以及对最终答案没有贡献的转发消息。</p>\n<p>这类冗余在 LLM 多智能体里尤其昂贵，因为它会同时放大两种成本：\n- <strong>token cost</strong>：消息越多，所有 agent 读上下文和写回复的 token 开销就越大；\n- <strong>error propagation</strong>：无价值甚至错误的消息会继续进入后续轮次，污染整个协作链。</p>\n<p>论文因此把这一现象明确命名为 <strong>communication redundancy</strong>，并把“删消息”本身变成一个一等研究问题。</p>\n<h5>2. 核心机制：把多轮对话写成空间-时间消息图，再做 one-shot pruning</h5>\n<p>AgentPrune 的方法核心，是把多 agent、多轮次的通信过程表示成一个 <strong>spatial-temporal message-passing graph</strong>。直觉上：\n- <strong>spatial dimension</strong> 关注“哪些 agent 之间的边是多余的”；\n- <strong>temporal dimension</strong> 关注“哪些历史消息在后续轮次里已经没有继续保留的必要”。</p>\n<p>与很多需要重新训练整个多智能体系统的方案不同，AgentPrune 强调的是 <strong>one-shot pruning</strong>。也就是说，它不是重做协作策略学习，而是作为一个经济型通信层插在现有 pipeline 上，对既有消息结构进行裁剪。</p>\n<div class=\"key-point\">💡 关键：AgentPrune 优化的是“消息传播图”，而不是直接优化底层 LLM 参数。</div>\n<p>这也是它能“seamlessly integrate into mainstream multi-agent systems”的原因。论文和官方仓库都把它定位成一个可以外挂到现有系统上的 economical communication framework。</p>\n<h5>3. 为什么它既省钱又能抗攻击</h5>\n<p>论文除了关注冗余，还特别强调 <strong>malicious communication messages</strong>。这意味着一条消息即便不是重复的，也可能是有害的，例如故意误导后续 agent 的推理方向，或者通过噪声拖垮 group decision。</p>\n<p>AgentPrune 的价值因此有两层：\n- 对正常任务，它减少的是低贡献消息，目标是把钱花在真正有帮助的沟通上；\n- 对对抗场景，它切掉的是有害消息，目标是减少错误信息的扩散半径。</p>\n<p>论文报告，在六个 benchmark 上，AgentPrune 既能把总体成本压到约 <code>$5.6</code>，又能在与高成本 SOTA 拓扑相比时保持可比结果；同时，在两类 agent-based adversarial attacks 下还能带来 <code>3.5%~10.8%</code> 的性能提升。</p>\n<h5>4. 结果该怎么读</h5>\n<p>这篇工作的重点不是“绝对精度暴涨”，而是 <strong>economical communication pipeline</strong>。它想证明的是：高质量多智能体协作并不等于无限制地让更多 agent 说更多话。只要把空间上不必要的联边和时间上无意义的历史消息裁掉，就能在以下三点上同时获益：</p>\n<ul>\n<li>保留接近现有强拓扑的任务效果；</li>\n<li>显著减少 token 使用量，论文报告为 <code>28.1%~72.8%</code> 的 token reduction；</li>\n<li>在大规模部署时把经济成本从“不可持续”拉回“可接受”。</li>\n</ul>\n<h5>5. 与同类方法的区别</h5>\n<p>AgentPrune 与后续的动态拓扑搜索方法不同。它并不试图为每个任务重新生成一张全新图，而是更务实地在现有 communication topology 上做 <strong>删边和删历史</strong>。因此它的工程落点非常清楚：适合已经有多智能体 pipeline、但被 token 成本和消息噪声卡住的系统。</p>\n<p>从专题演化脉络看，它也正好位于 DyLAN 这类“动态连边”之后、TalkHier 这类“结构化通信”之前：前者关注谁该参与，后者关注怎么说；AgentPrune 则补上了一个中间问题，即 <strong>哪些消息根本不该继续留在链路里</strong>。</p>",
      "quiz": {
        "q": "AgentPrune 的核心优化对象是什么？",
        "options": [
          "直接微调所有 agent 的底层 LLM 参数",
          "把多轮多智能体通信写成空间-时间消息图，并对冗余或有害消息做 one-shot pruning",
          "用多数投票替代一切多轮讨论过程",
          "把所有消息都压缩成单句摘要再广播给每个 agent"
        ],
        "answer": 1,
        "explain": "AgentPrune 的创新点不在参数训练，而在通信层：它识别 communication redundancy，并在 spatial-temporal message-passing graph 上裁掉低价值或恶意消息。"
      }
    },
    {
      "id": "magentic_one",
      "num": 9,
      "name": "Magentic-One",
      "fullName": "通用多智能体系统 (Magentic-One)",
      "year": "2024.11",
      "org": "Microsoft",
      "parent": "autogen",
      "paperUrl": "https://arxiv.org/abs/2411.04468",
      "projectUrl": "",
      "category": "organization",
      "motivation": "总控协调专才Agent解复杂任务",
      "summary": "Magentic-One 通过一个负责规划、追踪和重规划的 Orchestrator 协调 WebSurfer、FileSurfer、Coder、ComputerTerminal 等专才 agent，证明了“通用协调者 + 可插拔技能 agent”能够在 GAIA、AssistantBench、WebArena 等异构任务上形成接近 SOTA 的通用多智能体系统。",
      "keyPoints": [
        "核心角色是 Orchestrator：负责制定计划、维护工作记忆、分配任务、检测卡住并重规划",
        "团队成员围绕通用能力拆分：WebSurfer 管网页，FileSurfer 管本地文件，Coder 写代码，ComputerTerminal 执行代码",
        "协作不是固定脚本，而是由 Orchestrator 动态路由任务与恢复错误",
        "模块化设计允许增删 agent 而无需重新训练整队，强调 generalist system 而非 benchmark-specific pipeline",
        "同时发布 AutoGenBench，用于有隔离和重复控制的 agent benchmark 评测",
        "论文报告在 GAIA、AssistantBench、WebArena 上达到与 SOTA 统计上接近的表现",
        "通过消融与错误分析说明：多 agent 的价值主要来自能力分工、计划恢复与工具隔离，而不是简单并行调用更多 LLM"
      ],
      "detail": "<p><img alt=\"Magentic-One 架构示意图\" src=\"https://ar5iv.labs.arxiv.org/html/2411.04468/assets/x1.png\" />\n<em>图：Magentic-One 由 Orchestrator 统一调度多个专才 agent，在复杂任务执行中不断计划、分派、检查与重规划。</em></p>\n<pre><code class=\"language-python\"># Magentic-One 的外环/内环协作逻辑（按论文方法概括）\ndef solve(task):\n    ledger = Orchestrator.init_ledger(task)\n    while not ledger.finished():\n        plan = Orchestrator.plan_or_replan(ledger)\n        assignee, subtask = Orchestrator.route(plan, ledger)\n        observation = assignee.act(subtask)\n        ledger.update(observation)\n        if ledger.is_stalled():\n            Orchestrator.reset_or_recover(ledger)\n    return ledger.final_answer()\n</code></pre>\n<p>Magentic-One 试图解决一个非常现实的问题：复杂任务往往同时涉及网页查找、本地文件理解、代码执行和中间结果核验，如果仍坚持单体 agent 把所有能力塞进一个 prompt，就会让工具状态、计划更新和错误恢复都变得笨重。</p>\n<p>Orchestrator 是整篇论文最重要的设计。它不只是一个简单调度器，而是同时承担 plan、working memory、routing、recovery 四项职责。执行细节交给专才 agent，长期目标与阶段性进度则由总控持续维护。</p>\n<p>这也是为什么论文强调 outer loop / inner loop。外环决定大方向与下一阶段子目标，内环让特定 agent 在自己的工具域内行动并返回观察。真正难的地方不是单步工具调用，而是当网页信息不全、文件结构复杂或代码失败时，系统能否诊断问题并重规划。</p>\n<p>因此，这篇工作的代表性不只在 benchmark 分数，而在它把 generalist multi-agent system 的最小骨架定义得很清楚：一个能维护任务 ledger 的总控，加上一组可插拔的技能 agent。</p>\n<div class=\"key-point\">💡 关键：Magentic-One 的多 agent 不是“让多个模型一起投票”，而是把不同能力边界和任务状态管理显式分离。</p>\n<p>⚠️ 注意：若总控 ledger 更新不准确，更多专才 agent 反而会放大错误恢复成本。</div>",
      "quiz": {
        "q": "Magentic-One 中 Orchestrator 的主要职责是什么？",
        "options": [
          "只负责执行 Python 代码",
          "只在任务开始时生成一次总计划，然后完全退出",
          "维护任务状态、分配子任务并在卡住时触发重规划",
          "把所有网页内容压缩成单个 embedding"
        ],
        "answer": 2,
        "explain": "Orchestrator 是持续在线的总控，不仅制定计划，还要追踪进展、路由任务并负责错误恢复。"
      }
    },
    {
      "id": "vote_consensus",
      "num": 10,
      "name": "Vote/Consensus",
      "fullName": "投票还是共识 (Voting or Consensus?)",
      "year": "2025.02",
      "org": "University of Göttingen",
      "parent": "mad",
      "paperUrl": "https://arxiv.org/abs/2502.19130",
      "projectUrl": "",
      "category": "deliberation",
      "motivation": "系统比较投票与共识协议优劣",
      "summary": "这篇工作在严格控制其他讨论参数不变的前提下，系统比较了 7 种多智能体决策协议，发现 voting 在 reasoning 任务上更强，而 consensus 在 knowledge 任务上更稳，并进一步提出 AAD 与 CI 两种提升答案多样性和协作修正质量的新协议。",
      "keyPoints": [
        "只改变 decision protocol，其余讨论参数尽量固定，避免过去多 agent debate 研究里“同时改太多变量”",
        "系统比较 7 种协议，包括 majority voting、unanimity consensus 等常见多 agent 决策机制",
        "结论具有任务差异：voting 对 reasoning task 平均更优，consensus 对 knowledge task 更有优势",
        "增加 agent 数量通常有益，但在投票前加入过多 discussion round 反而会降低表现",
        "提出 All-Agents Drafting (AAD) 与 Collective Improvement (CI) 两种新方法，提高答案多样性与协同修正能力",
        "AAD 最多带来约 3.3% 提升，CI 最多带来约 7.4% 提升",
        "论文的核心贡献是把“如何做最终决策”单独抽出来研究，而不是只关注多 agent 是否存在"
      ],
      "detail": "<p><img alt=\"Vote/Consensus 决策协议研究示意图\" src=\"https://ar5iv.labs.arxiv.org/html/2502.19130/assets/x1.png\" />\n<em>图：论文围绕多智能体讨论后的最终决策协议展开，比较 voting、consensus 等不同聚合方式。</em></p>\n<pre><code class=\"language-python\"># 决策协议对比的统一实验框架（按论文方法概括）\ndef debate_and_decide(question, protocol, agents, rounds):\n    drafts = [agent.initial_answer(question) for agent in agents]\n    for _ in range(rounds):\n        drafts = protocol.discuss(drafts, agents)\n    return protocol.decide(drafts)\n</code></pre>\n<p>多 agent debate 领域里一个长期被忽略的问题是：大家讨论完之后，到底应该怎样定最终答案？很多工作把 agent 数量、轮数、prompt、工具和聚合方式一起改掉，导致很难判断性能变化究竟来自 debate 本身还是最后那一步协议。</p>\n<p>实验发现很有意思。对需要演绎和计算的 reasoning 任务，voting 往往更强，因为它鼓励答案多样性；但对更依赖事实一致性的 knowledge 任务，consensus 更稳定，因为多 agent 被迫在达成一致前对冲突事实进行对齐。</p>\n<p>论文还指出一个常见误区：更多 discussion round 并不总是更好。尤其在投票协议下，讨论轮次增加会让 agent 的答案越来越相似，反而损失了 voting 赖以工作的差异性。AAD 与 CI 正是为了保住多样性并把集体改进进一步结构化。</p>\n<p>因此，这篇工作的真正贡献不是再发明一种 debate prompt，而是把多 agent 系统里最常被当成细节处理的“最终决策协议”提升为一等研究对象。</p>\n<div class=\"key-point\">💡 关键：voting 的优势建立在答案差异性之上，所以过多讨论轮次可能先把这个优势抹平。</p>\n<p>⚠️ 注意：consensus 看起来更“合作”，但在 reasoning 任务里也可能因为过早趋同而把错误结论放大。</div>",
      "quiz": {
        "q": "为什么论文发现“在投票前增加过多 discussion rounds”可能降低表现？",
        "options": [
          "因为会让 agent 更快耗尽上下文窗口",
          "因为多轮讨论会降低答案多样性，从而削弱 voting 的优势",
          "因为所有协议都必须在两轮内停止",
          "因为投票协议不能与工具调用共存"
        ],
        "answer": 1,
        "explain": "Voting 依赖不同 agent 提供互补答案；如果讨论过多导致答案收敛，投票就失去多样性带来的收益。"
      }
    },
    {
      "id": "talkhier",
      "num": 11,
      "name": "TalkHier",
      "fullName": "结构化对话与分层执行 (Talk Structurally, Act Hierarchically)",
      "year": "2025.02",
      "org": "Sony Group Corporation",
      "parent": "agentprune",
      "paperUrl": "https://arxiv.org/abs/2502.11098",
      "projectUrl": "",
      "category": "communication",
      "motivation": "以结构化消息配合层级修正",
      "summary": "TalkHier通过形式化的「消息-背景-中间输出」三元通信协议与层次化团队嵌套架构，解决了现有LLM多智能体系统中通信冗杂、记忆耦合、精炼同质化三大瓶颈，在MMLU推理、开放域问答和广告文案生成等任务上显著超越GPT-4o、ReAct、AutoGPT等基线，并在人工评估中达到接近人类共识的评判质量。",
      "keyPoints": [
        "核心动机：以结构化消息配合层级修正",
        "演化来源：继承或改进自 agentprune",
        "代表机构：Sony Group Corporation"
      ],
      "detail": "<h5>1. 问题背景与动机</h5>\n<p>随着LLM能力的提升，多智能体系统（LLM-MA）被广泛用于复杂推理任务。然而现有方案存在三大缺陷：\n- <strong>通信原始（图1左）</strong>：现有系统（如ReAct、AutoGen）依赖非结构化的自然语言对话历史作为智能体间通信的唯一载体，导致关键的任务背景、中间决策和指令被淹没在大量无关文本中，浪费上下文窗口并降低协同效率。\n- <strong>记忆耦合</strong>：大多数系统将记忆绑定到全局会话或对话线程，任何智能体都无法独立保留和推理其过去的交互与知识。\n- <strong>精炼同质化</strong>：多轮优化往往采用固定的顺序流水线或全体一致的扁平反思结构，无法根据任务需求动态分配不同的评估准则和专长智能体。</p>\n<h5>2. TalkHier框架设计（图3右）</h5>\n<p><strong>2.1 智能体独立记忆</strong>\n每个智能体 <span class=\"kb-math kb-math-inline\">v_i</span> 形式化为四元组 <span class=\"kb-math kb-math-inline\">v_i = (Role_i, Plugins_i, Memory_i, Type_i)</span>，其中：\n- <span class=\"kb-math kb-math-inline\">Role_i</span>：智能体的角色（如 Generator, Evaluator, Reviser, Supervisor）\n- <span class=\"kb-math kb-math-inline\">Plugins_i</span>：包含可调用工具（如搜索引擎、计算器）\n- <span class=\"kb-math kb-math-inline\">Memory_i</span>：独立且持久化的记忆体，记录历史交互和累积知识\n- <span class=\"kb-math kb-math-inline\">Type_i</span>：标识该智能体属于哪个团队</p>\n<p>这种设计带来两个关键优势：<strong>独立性</strong>（各智能体记忆互不干扰）和<strong>持久性</strong>（跨会话保留知识，支持持续学习）。</p>\n<p><strong>2.2 富语境结构化通信协议</strong>\n<img alt=\"图4：TalkHier通信协议提示词设计\" src=\"https://ar5iv.org/html/2502.11098/assets/fig4.png\" /></p>\n<p>TalkHier将每条通信事件 <span class=\"kb-math kb-math-inline\">c_{ij}^{(t)}</span> 分解为三个结构化字段，通过特化提示词（图4）提取：\n1. <strong>Message <span class=\"kb-math kb-math-inline\">\\mathbf{M}_{ij}^{(t)}</span></strong>：发送给目标智能体的具体指令或澄清，如「请评估生成答案在 Formal Logic 维度上的正确性」\n2. <strong>Background <span class=\"kb-math kb-math-inline\">\\mathbf{B}_{ij}^{(t)}</span></strong>：任务的核心背景信息，包括原始问题、已做出的中间决策和上下文约束。注意：从成员到监督者的通信中无此字段（避免冗余）\n3. <strong>Intermediate Output <span class=\"kb-math kb-math-inline\">\\mathbf{I}_{ij}^{(t)}</span></strong>：发送方在当前步骤产生的中间结果，供接收方继续处理或追溯</p>\n<p>这种三元组结构确保每次通信都精简、完整、可追溯。通信发生时，LLM会根据智能体的角色（监督者或成员）动态选择相应的特化提示词生成这些结构化信息，如图4所示。</p>\n<p><strong>2.3 层次化协同团队架构（图5）</strong>\n<img alt=\"图5：TalkHier的层次化团队结构\" src=\"https://ar5iv.org/html/2502.11098/assets/fig5.png\" /></p>\n<p>整个多智能体系统被建模为有向图 <span class=\"kb-math kb-math-inline\">\\mathcal{G} = (\\mathcal{V}, \\mathcal{E})</span>，其中节点为智能体，边表示通信关系。关键创新在于<strong>递归嵌套的团队结构</strong>：\n- 整个图由多个团队组成，每个团队 <span class=\"kb-math kb-math-inline\">\\mathcal{V}_{team} \\subseteq \\mathcal{V}</span> 包含一个监督者 <span class=\"kb-math kb-math-inline\">v^S_{team}</span> 和若干成员 <span class=\"kb-math kb-math-inline\">v^M_{team}</span>\n- 一个智能体可同时属于多个团队，一个团队的成员可以是另一个团队的监督者，形成<strong>层次化嵌套</strong>（如图3右所示：Main团队包含Generator、Evaluator、Reviser，Evaluator又作为独立团队的监督者，下辖多个按不同准则评估的子智能体）</p>\n<p>以两团队基本结构为例：\n- Main团队：<span class=\"kb-math kb-math-inline\">\\mathcal{V}_{main} = \\{v_{main}^S, v_{main}^{Gen}, v_{eval}^S, v_{main}^{Rev}\\}</span>\n- Eval团队：<span class=\"kb-math kb-math-inline\">\\mathcal{V}_{eval} = \\{v_{eval}^S, v_{eval}^{E_1}, \\ldots, v_{eval}^{E_k}\\}</span>，每个 <span class=\"kb-math kb-math-inline\">v_{eval}^{E_i}</span> 按特定准则评估</p>\n<p><strong>2.4 层次化精炼算法（Algorithm 1）</strong>\nTalkHier的精炼流程是一个迭代过程，每轮包含7个步骤：\n1. <strong>任务指派</strong>：Main Supervisor → Eval Supervisor，指定评估角色和标准\n2. <strong>任务分发</strong>：Eval Supervisor将各准则分发给下属的Evaluator成员\n3. <strong>并行评估</strong>：各Evaluator按各自准则独立评估当前输出，产生反馈 <span class=\"kb-math kb-math-inline\">\\mathbf{F}_{v_{eval}^{E_i}}^{(t)}</span>\n4. <strong>反馈聚合</strong>：Eval Supervisor汇总所有反馈为 <span class=\"kb-math kb-math-inline\">\\mathbf{F}_{summary}^{eval}</span>\n5. <strong>质量判定</strong>：若汇总质量分数超过阈值 <span class=\"kb-math kb-math-inline\">\\mathcal{M}_{threshold}</span>，输出最终结果\n6. <strong>定向修订</strong>：Reviser根据汇总反馈修订输出生成新版本 <span class=\"kb-math kb-math-inline\">\\mathbf{A}_t</span>\n7. <strong>迭代重复</strong>：直至达到质量阈值或最大迭代次数 <span class=\"kb-math kb-math-inline\">T_{max}</span></p>\n<h5>3. 实验设置与关键结果</h5>\n<p><strong>3.1 实验配置</strong>\n- <strong>数据集</strong>：MMLU（五域推理：Moral Scenario, College Physics, Machine Learning, Formal Logic, US Foreign Policy）、WikiQA（开放域问答）、Camera Dataset（广告标题生成）\n- <strong>基线对比</strong>：GPT-4o单次及集成投票（3/5/7@）、OpenAI-o1-preview、ReAct及集成、AutoGPT、AgentVerse、GPTSwarm、AgentPrune、OKG\n- <strong>统一主干</strong>：所有基线和TalkHier均使用GPT-4o作为底层LLM（temperature=0），o1除外（temperature=1）\n- <strong>代码及复现</strong>：<a href=\"https://github.com/sony/talkhier\">开源仓库</a></p>\n<p><strong>3.2 MMLU推理性能（表1）</strong>\n<img alt=\"图1：TalkHier vs 现有方法对比\" src=\"https://ar5iv.org/html/2502.11098/assets/fig1.png\" /></p>\n<p>TalkHier在五个MMLU子任务上全面领先：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>模型/方法</th>\n<th>Moral</th>\n<th>Physics</th>\n<th>ML</th>\n<th>Formal Logic</th>\n<th>US FP</th>\n<th>平均</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>GPT-4o</td>\n<td>64.25</td>\n<td>62.75</td>\n<td>67.86</td>\n<td>63.49</td>\n<td>92.00</td>\n<td>70.07</td>\n</tr>\n<tr>\n<td>ReAct</td>\n<td>69.61</td>\n<td>72.55</td>\n<td>59.82</td>\n<td>32.54</td>\n<td>58.00</td>\n<td>58.50</td>\n</tr>\n<tr>\n<td>AutoGPT</td>\n<td>66.37</td>\n<td>78.43</td>\n<td>64.29</td>\n<td>60.83</td>\n<td>90.00</td>\n<td>71.98</td>\n</tr>\n<tr>\n<td>AgentVerse</td>\n<td>79.11</td>\n<td>93.14</td>\n<td>79.46</td>\n<td>78.57</td>\n<td>88.00</td>\n<td>83.66</td>\n</tr>\n<tr>\n<td>GPTSwarm</td>\n<td>60.48</td>\n<td>67.70</td>\n<td>72.32</td>\n<td>68.33</td>\n<td><strong>95.00</strong></td>\n<td>72.81</td>\n</tr>\n<tr>\n<td><strong>TalkHier</strong></td>\n<td><strong>82.57</strong></td>\n<td><strong>91.17</strong></td>\n<td><strong>85.71</strong></td>\n<td><strong>83.33</strong></td>\n<td><strong>95.00</strong></td>\n<td><strong>87.56</strong></td>\n</tr>\n<tr>\n<td><strong>TalkHier+</strong>（扩展版）</td>\n<td>83.80</td>\n<td>93.14</td>\n<td>84.68</td>\n<td>87.30</td>\n<td>93.00</td>\n<td><strong>88.38</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p>关键发现：\n- TalkHier大幅超越GPT-4o（+17.49%），表明结构化通信和层次化精炼对多步推理有实质增益\n- 在需要严格逻辑的Formal Logic任务上，TalkHier（83.33%）远超ReAct（32.54%）和AutoGPT（60.83%），体现了结构化背景信息传递对逻辑一致性的保障\n- 集成投票（3@/5@/7@）对GPT-4o的提升微乎其微（70.07→71.15%），说明简单的多次运行无法替代有组织的协同精炼</p>\n<p><strong>3.3 WikiQA开放问答（表2）</strong>\nTalkHier以87.56%-88.38%的F1分数全面超越所有基线。</p>\n<p><strong>3.4 广告文案生成人工评估（表8-10）</strong>\n<img alt=\"图3：TalkHier与现有方法的通信协议与层次化结构对比\" src=\"https://raw.githubusercontent.com/sony/talkhier/main/architecture.png\" /></p>\n<p>在7分制人工评估中（4位标注者）：\n- TalkHier版本的整体质量得分与人工撰写的对照组差距仅为0.67分（Pearson r=0.67, p&lt;0.05）\n- ICC(2,1)=0.23（与个体评分者一致性较差），ICC(2,4)=0.33（与聚合评分达到中等一致）\n- 表明TalkHier能有效捕捉人类整体偏好共识，其自动评估结果可作为有意义的精炼反馈信号</p>\n<p><strong>3.5 消融实验</strong>\n论文还分析了不同通信组件（Background去除、仅保留Message+Intermediate Output）对性能的影响，证明三元组结构中的背景信息对复杂任务尤其关键。</p>\n<h5>4. 局限性与展望</h5>\n<ul>\n<li>主要依赖GPT-4o作为主干，尚需验证在其他骨干模型上的泛化性</li>\n<li>当前层次结构为人工设计，未来可探索基于图优化（如GPTSwarm的通信图搜索）的自动团队拓扑发现</li>\n<li>通信事件的结构化提取依赖特化提示词，对对抗性输入或无结构任务场景可能需要更鲁棒的设计</li>\n</ul>",
      "quiz": {
        "q": "TalkHier 的通信事件三元组中，为什么 Member 发给 Supervisor 的消息通常不再携带 Background 字段？",
        "options": [
          "因为 Member 无法访问原始任务",
          "因为 Background 只适用于图像任务",
          "因为 Background 主要用于上行分发时补齐上下文，而成员回传时省去该字段可减少冗余并保持通信紧凑",
          "因为 Supervisor 只接受最终答案，不接受中间结果"
        ],
        "answer": 2,
        "explain": "TalkHier 的协议是非对称的：Supervisor 下发任务时要补足背景，成员回传时重点是 intermediate output 与反馈，去掉 Background 能减少重复上下文。"
      }
    },
    {
      "id": "acp",
      "num": 12,
      "name": "ACP",
      "fullName": "智能体通信协议 (Agent Communication Protocol)",
      "year": "2025.03",
      "org": "IBM Research",
      "parent": "—",
      "paperUrl": "https://research.ibm.com/projects/agent-communication-protocol",
      "projectUrl": "",
      "category": "protocol",
      "motivation": "用轻量HTTP接口打通异构Agent",
      "summary": "ACP（Agent Communication Protocol）是IBM Research于2025年3月提出的一套轻量级开放协议，以HTTP/JSON为传输基础，通过标准化Agent能力自描述清单（Agent Card）、任务生命周期管理（Task）、流式消息管道（Message）三层抽象，解决了异构AI智能体之间互操作性难题，使不同框架、不同厂商构建的Agent能够通过统一接口进行自动发现、安全认证、任务委派和实时通信。",
      "keyPoints": [
        "提出三层核心抽象模型：<strong>Agent Card</strong>（Agent能力自描述清单，通过<code>/.well-known/agent-card.json</code>暴露）、<strong>Task</strong>（结构化任务载体，含完整状态机）、<strong>Message</strong>（支持请求-响应与SSE流式两种模式的通信通道）",
        "完全基于 <strong>HTTP/1.1 + JSON</strong> 的极简协议栈设计，无额外二进制依赖或专用SDK，任何支持HTTP的技术栈均可原生实现",
        "Agent Card 包含 <code>agentId</code>、<code>capabilities</code>、<code>supportedTasks</code>、<code>endpoint</code>、<code>auth</code> 等字段，支持自动化Agent发现与能力匹配",
        "采用 <strong>JSON-RPC 2.0风格</strong>的请求-响应模型，提供标准化的API接口：<code>POST /tasks</code>（创建任务）、<code>GET /tasks/{taskId}</code>（查询状态）、<code>POST /messages</code>（发送消息）、<code>GET /messages/stream</code>（SSE流式订阅）",
        "内置 <strong>Server-Sent Events (SSE)</strong> 流式支持，实现长时间运行任务的实时进度推送和中间结果反馈",
        "定义标准化<strong>任务状态机</strong>：<code>PENDING → IN_PROGRESS → COMPLETED | FAILED | CANCELLED</code>，状态迁移严格单向无环，保证分布式环境下状态强一致性",
        "通过 <strong>Agent Discovery</strong> 机制实现Agent的动态注册与发现，编配器（Orchestrator）可扫描各端点自动构建Agent拓扑图",
        "协议层内置三层<strong>安全防护</strong>：传输层（强制TLS 1.3）、身份认证层（Bearer Token / OAuth2）、内容完整性层（Agent Card数字签名验证）",
        "设计哲学：<strong>最小化耦合</strong>——Agent间仅共享协议规范，无需共享代码库、运行时环境或消息中间件",
        "与 <strong>MCP（Model Context Protocol）</strong>、<strong>A2A（Agent-to-Agent）</strong> 形成互补生态：ACP侧重于Agent间任务协作编排，MCP侧重于LLM与外部工具的连接，A2A侧重于对等Agent之间的直接对话"
      ],
      "detail": "<h5>1. 协议架构全景图</h5>\n<p><img alt=\"ACP 协议栈示意图\" src=\"https://research.ibm.com/_next/image?url=https%3A%2F%2Fresearch-website-prod-cms-uploads.s3.us.cloud-object-storage.appdomain.cloud%2FACP_Cover_1_308558580b.png&amp;w=1200&amp;q=85\" />\n<em>图：ACP协议栈概览——Agent Card、Task、Message三层抽象与HTTP传输层的绑定关系</em></p>\n<p>ACP的整体架构围绕一个核心理念展开：<strong>将每个Agent抽象为一个可通过标准HTTP URL寻址的独立微服务</strong>。与传统多Agent系统依赖共享内存、专用中间件或中心化消息总线的架构不同，ACP将所有Agent间交互降级为简单的HTTP请求与JSON响应。这意味着一个基于Python/LangChain构建的Agent，与一个基于TypeScript/Vertex AI构建的Agent，无需任何桥接代码即可直接对话——因为它们遵循同一套协议语法和语义约定。</p>\n<p>这种设计的工程价值在于：企业无需对现有Agent进行重构或引入额外的运行时依赖，只需在Agent外部封装一层薄薄的HTTP适配器（通常不超过200行代码），即可将其接入ACP网络。IBM Research在内部验证中展示了将一个遗留的SOAP-based系统改造为ACP兼容Agent的案例，整个适配过程不到一天。</p>\n<h5>2. Agent Card — 能力的自描述与自动发现</h5>\n<p>Agent Card是ACP协议的基石，也是其区别于其他Agent协议的关键创新。每个Agent在启动后，必须在其服务端点的<code>/.well-known/agent-card.json</code>路径上暴露一个符合ACP Schema的JSON文档。这一设计借鉴了Web生态中的<code>/.well-known/</code>惯例（如<code>security.txt</code>、<code>apple-app-site-association</code>），使发现机制与现有Web基础设施完全兼容。</p>\n<p>典型Agent Card结构如下：</p>\n<pre><code class=\"language-json\">{\n  &quot;agentId&quot;: &quot;weather-bot-01&quot;,\n  &quot;name&quot;: &quot;Weather Agent&quot;,\n  &quot;description&quot;: &quot;提供实时天气预报与历史气象数据查询服务&quot;,\n  &quot;version&quot;: &quot;1.0.0&quot;,\n  &quot;capabilities&quot;: [\n    { \n      &quot;id&quot;: &quot;weather:forecast&quot;, \n      &quot;description&quot;: &quot;获取指定地点未来7天天气预报&quot;,\n      &quot;inputSchema&quot;: { &quot;type&quot;: &quot;object&quot;, &quot;properties&quot;: { &quot;location&quot;: { &quot;type&quot;: &quot;string&quot; }, &quot;days&quot;: { &quot;type&quot;: &quot;integer&quot; } } },\n      &quot;outputSchema&quot;: { &quot;type&quot;: &quot;object&quot;, &quot;properties&quot;: { &quot;forecast&quot;: { &quot;type&quot;: &quot;array&quot; } } }\n    },\n    { \n      &quot;id&quot;: &quot;weather:history&quot;, \n      &quot;description&quot;: &quot;查询指定时间段的历史气象数据&quot;,\n      &quot;inputSchema&quot;: { &quot;type&quot;: &quot;object&quot;, &quot;properties&quot;: { &quot;location&quot;: { &quot;type&quot;: &quot;string&quot; }, &quot;startDate&quot;: { &quot;type&quot;: &quot;string&quot; }, &quot;endDate&quot;: { &quot;type&quot;: &quot;string&quot; } } }\n    }\n  ],\n  &quot;endpoint&quot;: &quot;https://agents.example.com/weather/v1&quot;,\n  &quot;auth&quot;: {\n    &quot;type&quot;: &quot;bearer&quot;,\n    &quot;tokenEndpoint&quot;: &quot;https://auth.example.com/oauth2/token&quot;,\n    &quot;scopes&quot;: [&quot;weather:read&quot;]\n  },\n  &quot;supportedFormats&quot;: [&quot;application/json&quot;, &quot;text/plain&quot;, &quot;image/png&quot;],\n  &quot;rateLimit&quot;: { &quot;requestsPerMinute&quot;: 120, &quot;burstSize&quot;: 10 },\n  &quot;healthCheck&quot;: &quot;https://agents.example.com/weather/v1/health&quot;,\n  &quot;tags&quot;: [&quot;weather&quot;, &quot;meteorology&quot;, &quot;public-data&quot;]\n}\n</code></pre>\n<div class=\"key-point\">💡 <strong>关键创新</strong>：Agent Card不仅包含静态元数据，还通过JSON Schema定义了每个能力的输入/输出格式（<code>inputSchema</code>/<code>outputSchema</code>），使编配器可以进行<strong>编译期的类型检查</strong>和<strong>运行时的参数校验</strong>，大幅减少Agent间的契约不匹配问题。</div>\n<p>Agent Discovery流程如下：编配器启动时，从注册中心（可配置为静态列表、Consul/etcd服务发现或纯配置文件）获取Agent端点列表，并发请求各端点的<code>/.well-known/agent-card.json</code>，根据返回的capabilities构建能力矩阵。当编配器收到用户请求时，通过语义匹配或关键词检索找到合适的Agent，并根据其inputSchema组装任务参数。若Agent Card包含签名字段（<code>cardSignature</code>），编配器还需验证签名以确保清单未被篡改。</p>\n<h5>3. 任务生命周期与状态管理</h5>\n<p>ACP定义了完整的Task生命周期，状态机如下图所示：</p>\n<pre><code class=\"language-python\"># ACP Task 生命周期状态机伪代码实现\n# 展示核心状态转换逻辑与错误处理路径\n\nimport uuid\nimport time\nfrom enum import Enum\nfrom typing import Dict, Optional, Callable\n\nclass TaskStatus(Enum):\n    PENDING = &quot;PENDING&quot;\n        IN_PROGRESS = &quot;IN_PROGRESS&quot;\n    COMPLETED = &quot;COMPLETED&quot;\n    FAILED = &quot;FAILED&quot;\n    CANCELLED = &quot;CANCELLED&quot;\n\n# 合法状态转换矩阵\nVALID_TRANSITIONS = {\n    TaskStatus.PENDING: [TaskStatus.IN_PROGRESS, TaskStatus.CANCELLED],\n    TaskStatus.IN_PROGRESS: [TaskStatus.COMPLETED, TaskStatus.FAILED, TaskStatus.CANCELLED],\n    TaskStatus.COMPLETED: [],     # 终态，不可迁移\n    TaskStatus.FAILED: [],        # 终态，不可迁移\n    TaskStatus.CANCELLED: [],     # 终态，不可迁移\n}\n\nclass ACPTask:\n    def __init__(self, task_type: str, input_data: dict):\n        self.task_id = str(uuid.uuid4())\n        self.task_type = task_type\n        self.input = input_data\n        self.output: Optional[dict] = None\n        self.error: Optional[str] = None\n        self.status = TaskStatus.PENDING\n        self.created_at = time.time()\n        self.updated_at = time.time()\n        self._observers: list[Callable] = []  # SSE订阅者回调\n\n    def transition_to(self, new_status: TaskStatus) -&gt; bool:\n        &quot;&quot;&quot;严格校验状态迁移合法性&quot;&quot;&quot;\n        if new_status not in VALID_TRANSITIONS[self.status]:\n            raise ValueError(\n                f&quot;非法状态迁移: {self.status} -&gt; {new_status}. &quot;\n                f&quot;允许的迁移: {VALID_TRANSITIONS[self.status]}&quot;\n            )\n        self.status = new_status\n        self.updated_at = time.time()\n        self._notify_observers()\n        return True\n\n    def _notify_observers(self):\n        &quot;&quot;&quot;SSE推送：通知所有订阅者状态变更&quot;&quot;&quot;\n        event_data = {\n            &quot;taskId&quot;: self.task_id,\n            &quot;status&quot;: self.status.value,\n            &quot;timestamp&quot;: self.updated_at\n        }\n        if self.output:\n            event_data[&quot;output&quot;] = self.output\n        if self.error:\n            event_data[&quot;error&quot;] = self.error\n        for observer in self._observers:\n            observer(event_data)\n\nclass ACPOrchestrator:\n    &quot;&quot;&quot;简化版ACP编配器：负责任务创建、调度与状态追踪&quot;&quot;&quot;\n\n    def __init__(self):\n        self.tasks: Dict[str, ACPTask] = {}\n\n    def create_task(self, task_type: str, input_data: dict) -&gt; ACPTask:\n        &quot;&quot;&quot;对应 POST /tasks 端点&quot;&quot;&quot;\n        task = ACPTask(task_type, input_data)\n        self.tasks[task.task_id] = task\n        # 异步提交执行\n        self._schedule_execution(task)\n        return task\n\n    def _schedule_execution(self, task: ACPTask):\n        &quot;&quot;&quot;将任务提交到线程池或消息队列执行&quot;&quot;&quot;\n        import threading\n        t = threading.Thread(target=self._execute, args=(task,), daemon=True)\n        t.start()\n\n    def _execute(self, task: ACPTask):\n        &quot;&quot;&quot;任务执行核心逻辑&quot;&quot;&quot;\n        try:\n            task.transition_to(TaskStatus.IN_PROGRESS)\n\n            # 这里调用实际Agent的HTTP端点或本地函数\n            result = self._call_agent_capability(task.task_type, task.input)\n\n            task.output = result\n            task.transition_to(TaskStatus.COMPLETED)\n        except Exception as e:\n            task.error = str(e)\n            task.transition_to(TaskStatus.FAILED)\n\n    def get_task(self, task_id: str) -&gt; Optional[ACPTask]:\n        &quot;&quot;&quot;对应 GET /tasks/{taskId} 端点&quot;&quot;&quot;\n        return self.tasks.get(task_id)\n\n    def cancel_task(self, task_id: str) -&gt; bool:\n        &quot;&quot;&quot;对应 DELETE /tasks/{taskId} 端点&quot;&quot;&quot;\n        task = self.tasks.get(task_id)\n        if task and task.status in [TaskStatus.PENDING, TaskStatus.IN_PROGRESS]:\n            return task.transition_to(TaskStatus.CANCELLED)\n        return False\n\n    def _call_agent_capability(self, task_type: str, input_data: dict) -&gt; dict:\n        &quot;&quot;&quot;\n        实际调用目标Agent能力\n        此函数通过Agent Card中的endpoint和capabilities信息路由请求\n        &quot;&quot;&quot;\n        # 伪代码：实际实现会根据任务类型选择Agent并发出HTTP请求\n        # response = requests.post(f&quot;{agent_endpoint}/invoke&quot;, json=payload)\n        # return response.json()\n        return {&quot;result&quot;: f&quot;executed {task_type} with {input_data}&quot;}\n</code></pre>\n<p>状态转换严格遵循单向无环图（DAG）约束：任务从<code>PENDING</code>进入，必然经过<code>IN_PROGRESS</code>才能到达终态。这种设计确保了在分布式环境下，无论消息乱序、重试还是网络分区，任务状态始终遵循确定性的演化路径——即Lamport在分布式系统理论中强调的\"共识可见性\"原则。</p>\n<h5>4. Message管道与双模通信机制</h5>\n<p>ACP的消息系统支持两种互补的通信模式，分别适用于不同的交互场景：</p>\n<ul>\n<li>\n<p><strong>请求-响应模式（Request-Response）</strong>：客户端通过<code>POST /messages</code>发送JSON消息，服务端同步返回响应。适用于短时任务（&lt;5秒）和即时查询场景，如\"查询今日天气\"、\"翻译以下文本\"。该模式实现简单，可直接对接现有REST API网关和负载均衡器。</p>\n</li>\n<li>\n<p><strong>SSE流式模式（Server-Sent Events）</strong>：客户端通过<code>GET /messages/stream?taskId={taskId}</code>建立长连接，服务端以<code>text/event-stream</code>格式持续推送任务进度、中间产物和状态变更事件。适用于长时间运行的Agent任务（如代码生成、多步推理、自动数据分析），客户端可实时展示进度条或流式渲染中间结果。</p>\n</li>\n</ul>\n<p>一条典型的ACP消息结构如下：</p>\n<pre><code class=\"language-json\">{\n  &quot;messageId&quot;: &quot;msg-abc123&quot;,\n  &quot;taskId&quot;: &quot;task-xyz789&quot;,\n  &quot;sender&quot;: { &quot;agentId&quot;: &quot;weather-bot-01&quot;, &quot;role&quot;: &quot;assistant&quot; },\n  &quot;recipient&quot;: { &quot;agentId&quot;: &quot;orchestrator-01&quot; },\n  &quot;type&quot;: &quot;progress_update&quot;,\n  &quot;content&quot;: {\n    &quot;summary&quot;: &quot;已完成前3步气象数据分析，正在进行第4步——异常值检测...&quot;,\n    &quot;progress&quot;: { &quot;current&quot;: 4, &quot;total&quot;: 7, &quot;percentage&quot;: 57.1 },\n    &quot;intermediateResult&quot;: {\n      &quot;step3_output&quot;: { &quot;cleaned_records&quot;: 1420, &quot;anomalies_detected&quot;: 3 }\n    }\n  },\n  &quot;timestamp&quot;: &quot;2025-03-15T10:30:00Z&quot;,\n  &quot;correlationId&quot;: &quot;corr-xyz&quot;\n}\n</code></pre>\n<p>SSE流式推送的事件格式遵循SSE标准规范，每条事件以<code>data:</code>前缀，以双换行符分隔：</p>\n<pre><code>event: task_progress\ndata: {&quot;taskId&quot;:&quot;task-xyz789&quot;,&quot;status&quot;:&quot;IN_PROGRESS&quot;,&quot;progress&quot;:{&quot;current&quot;:4,&quot;total&quot;:7}}\n\nevent: task_progress\ndata: {&quot;taskId&quot;:&quot;task-xyz789&quot;,&quot;status&quot;:&quot;IN_PROGRESS&quot;,&quot;progress&quot;:{&quot;current&quot;:5,&quot;total&quot;:7}}\n\nevent: task_complete\ndata: {&quot;taskId&quot;:&quot;task-xyz789&quot;,&quot;status&quot;:&quot;COMPLETED&quot;,&quot;output&quot;:{...}}\n</code></pre>\n<h5>5. 与MCP、A2A的横向对比与生态定位</h5>\n<p>ACP并非尝试重新定义Agent间通信的所有层面，而是与现有的MCP（Anthropic提出）和A2A（Google提出）形成明确分工：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th>ACP (IBM)</th>\n<th>MCP (Anthropic)</th>\n<th>A2A (Google)</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><strong>解决的核心问题</strong></td>\n<td>Agent之间的任务协作编排</td>\n<td>LLM调用外部工具/数据源</td>\n<td>Agent对等通信与对话</td>\n</tr>\n<tr>\n<td><strong>通信层次</strong></td>\n<td>Agent ↔ Agent（编排层）</td>\n<td>LLM ↔ Tool（工具层）</td>\n<td>Agent ↔ Agent（对等层）</td>\n</tr>\n<tr>\n<td><strong>传输协议</strong></td>\n<td>HTTP/1.1</td>\n<td>stdio / HTTP+SSE</td>\n<td>gRPC / HTTP/2</td>\n</tr>\n<tr>\n<td><strong>消息格式</strong></td>\n<td>ACP JSON Schema</td>\n<td>JSON-RPC 2.0</td>\n<td>A2A Protocol Buffers</td>\n</tr>\n<tr>\n<td><strong>发现机制</strong></td>\n<td>Agent Card (/.well-known)</td>\n<td>客户端声明工具列表</td>\n<td>服务注册与DNS-SD</td>\n</tr>\n<tr>\n<td><strong>流式支持</strong></td>\n<td>SSE</td>\n<td>SSE</td>\n<td>gRPC Bidirectional Stream</td>\n</tr>\n<tr>\n<td><strong>安全模型</strong></td>\n<td>TLS + OAuth2 + 卡片签名</td>\n<td>依赖传输层安全</td>\n<td>mTLS + JWT</td>\n</tr>\n<tr>\n<td><strong>复杂度</strong></td>\n<td>低（纯HTTP）</td>\n<td>低（stdio简单，HTTP中等）</td>\n<td>高（需gRPC基础设施）</td>\n</tr>\n<tr>\n<td><strong>主要场景</strong></td>\n<td>企业异构Agent集成</td>\n<td>单个LLM的工具增强</td>\n<td>大规模Agent Mesh</td>\n</tr>\n</tbody>\n</table></div>\n<p>ACP的差异化竞争优势在于<strong>极致的简单性</strong>：不引入新的RPC框架、不绑定任何AI框架、不要求安装SDK。任何能够发送HTTP请求的程序（包括shell脚本、Excel插件、甚至IoT设备）都可以接入ACP网络。这一特性使得ACP特别适合大型企业环境中渐进式地治理和集成已有异构Agent系统。</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：ACP与MCP/A2A并非竞争关系，而是不同抽象层级的互补协议。一个典型的Agent系统可以同时实现这三种协议：MCP用于LLM连接外部工具（如数据库查询、API调用），ACP用于多个Agent之间的任务编排（如将用户请求拆分为子任务分派给各Agent），A2A用于Agent之间的对等协作（如两个Agent联合推理）。理解三者的定位差异，是设计现代Multi-Agent架构的关键。</div>\n<h5>6. 安全设计深度解析</h5>\n<p>ACP在协议设计阶段就将安全作为一等公民（Security by Design），而非事后追加的补丁。其安全体系分为三道防线：</p>\n<ul>\n<li>\n<p><strong>第一道防线——传输加密</strong>：ACP强制要求所有通信通过TLS 1.3进行，禁止明文HTTP回退。Agent端点的Scheme必须为<code>https://</code>，编配器在发现阶段即会验证证书有效性。</p>\n</li>\n<li>\n<p><strong>第二道防线——身份认证与授权</strong>：Agent Card中声明<code>auth.type</code>，支持<code>none</code>（仅限开发环境）、<code>bearer</code>（Bearer Token静态令牌）、<code>oauth2</code>（OAuth2动态令牌）三种模式。编配器在调用Agent能力前，需通过<code>auth.tokenEndpoint</code>获取短期访问令牌，并在每次HTTP请求中携带<code>Authorization: Bearer &lt;token&gt;</code>头。令牌建议具有短有效期（通常15分钟），并限定最小权限范围（scopes）。</p>\n</li>\n<li>\n<p><strong>第三道防线——内容完整性验证</strong>：Agent Card可选携带<code>cardSignature</code>字段，包含使用Agent持有者私钥对Card内容的签名（如Ed25519）。编配器在缓存Card内容前验证签名，确保Agent的能力清单在传输或存储过程中未被恶意篡改。</p>\n</li>\n</ul>\n<p>这种分层安全架构使ACP可以直接融入企业现有的零信任安全体系（Zero Trust Architecture），与API网关、WAF、身份提供商（IdP）等现有基础设施无缝对接。</p>",
      "quiz": {
        "q": "ACP协议中，Agent Card的核心作用是什么？",
        "options": [
          "存储Agent的模型权重和训练数据，供其他Agent下载使用",
          "作为Agent能力的自描述清单，支持自动化Agent发现与能力匹配",
          "记录Agent与其他Agent之间的完整对话历史和消息日志",
          "对Agent之间的消息传输进行端到端加密和数字签名"
        ],
        "answer": 1,
        "explain": "Agent Card是ACP的发现机制基石。它暴露在/.well-known/agent-card.json路径，包含Agent的capabilities、endpoint、auth方式、输入输出Schema等信息，使编配器能够自动扫描和构建能力拓扑，从而无需人工硬编码Agent配置即可完成服务发现与任务路由。"
      }
    },
    {
      "id": "a2a",
      "num": 13,
      "name": "A2A",
      "fullName": "智能体到智能体协议 (Agent2Agent)",
      "year": "2025.04",
      "org": "Google Cloud",
      "parent": "—",
      "paperUrl": "https://developers.googleblog.com/en/a2a-a-new-era-of-agent-interoperability/",
      "projectUrl": "",
      "category": "protocol",
      "motivation": "标准化跨框架任务协作与发现",
      "summary": "A2A（Agent-to-Agent Protocol）是Google推出的开放标准协议，定义了AI Agent之间的通信规范和任务协作流程，通过Agent Card能力发现、异步任务生命周期管理和灵活消息交换机制，解决了不同框架/厂商构建的Agent系统无法互操作的问题。",
      "keyPoints": [
        "基于HTTP(S) + JSON-RPC 2.0的标准化通信协议，支持同步请求/响应、流式传输（SSE）和异步推送通知",
        "Agent Card：JSON元数据文档，描述Agent的身份、技能、服务端点和认证要求，实现自动发现",
        "三层架构：数据模型层（Task/Message/Part/Artifact）、操作层（Send Message/Get Task等6个核心操作）、协议绑定层（JSON-RPC/gRPC/HTTP+REST）",
        "Task生命周期管理：状态机从submitted→working→completed/failed，支持人工介入（input-required状态）",
        "Modality Agnostic：通过Part容器支持文本、文件引用、结构化数据和二进制内容，统一异构模态交换",
        "Opaque Execution原则：Agent间仅基于声明的能力和交换信息协作，无需暴露内部状态/记忆/工具实现",
        "多语言SDK生态：Python/Go/JavaScript/Java/.NET/Rust全栈支持",
        "企业级特性：内置认证授权声明、OpenTelemetry追踪、加密和监控支持"
      ],
      "detail": "<h5>一、背景与设计动机</h5>\n<p>在AI Agent爆炸式增长的时代，不同公司基于不同框架（LangChain、AutoGen、CrewAI、Google ADK等）构建的Agent系统形成了信息孤岛。传统集成方式是将Agent降级为工具调用（Function Calling），但这种方式丧失了Agent的自主性和协作能力。A2A的设计核心是为Agent建立一种\"通用语言\"，使Agent能够以原生Agent身份协作，而非退化为被动工具。</p>\n<p>五大核心设计原则：\n1. <strong>拥抱自然非结构化</strong>：Agent的输出本质上是非结构化的，A2A不强制要求Agent输出结构化API响应，而是允许混合文本、文件、结构化数据和嵌入式UI的灵活内容交换。\n2. <strong>安全为本</strong>：安全机制不嵌入协议本身，而是通过建立身份认证和授权声明机制，与现有企业安全基础设施无缝对接。\n3. <strong>超长任务支持</strong>：从快速查询到可能需要数天甚至人工介入的任务，A2A原生支持异步长任务和人工审批流程。\n4. <strong>模态无关（Modality Agnostic）</strong>：统一的Part内容容器设计，支持文本、图像、音频、视频、表单和iframe UI片段。\n5. <strong>不透明执行（Opaque Execution）</strong>：Agent之间仅通过声明的Agent Card和交换的消息进行协作，无需暴露内部prompt、记忆或工具细节。</p>\n<div class=\"key-point\">💡 关键：A2A与MCP（Model Context Protocol，Anthropic）的关系——MCP解决工具/数据源与单Agent的连接，A2A解决Agent与Agent之间的协作，二者互补构成完整AI生态栈。</div>\n<h5>二、协议核心架构</h5>\n<p><img alt=\"A2A Protocol Architecture\" src=\"https://raw.githubusercontent.com/a2aproject/A2A/refs/heads/main/docs/assets/a2a-logo-black.svg\" />\n<em>图：A2A协议的核心三层架构——数据模型层定义核心数据结构，操作层定义6个API操作，协议绑定层实现具体的传输映射</em></p>\n<p><strong>三层架构：</strong>\n- <strong>Layer 1 — 数据模型层</strong>：定义Task、Message、Part、Artifact、AgentCard、Extension等核心对象及其关系。\n- <strong>Layer 2 — 操作层</strong>：定义与传输无关的6个核心操作（Send Message、Send Streaming Message、Get Task、List Tasks、Cancel Task、Get Agent Card）。\n- <strong>Layer 3 — 协议绑定层</strong>：将操作映射到具体传输协议（JSON-RPC 2.0、gRPC、HTTP+REST），支持自定义扩展绑定。</p>\n<h5>三、核心数据结构详解</h5>\n<p><strong>Agent Card</strong> — Agent的数字名片：\nAgent Card是A2A的入口机制，每个A2A Server在已知URL上发布一份JSON文档，包含：\n- <code>name</code>、<code>description</code>：身份描述\n- <code>url</code>：服务端点地址\n- <code>version</code>：支持的A2A协议版本\n- <code>capabilities</code>：能力声明（是否支持streaming、push notifications等）\n- <code>skills</code>：技能列表（唯一ID、名称、描述、输入输出模态、可选示例和触发条件）\n- <code>authentication</code>：认证方案声明（OAuth、API Key等），凭据通过HTTP Header传递，不嵌入协议消息体\n- <code>defaultInputModes</code> / <code>defaultOutputModes</code>：支持的默认模态（text、file、data、form等）</p>\n<p><strong>Task</strong> — 基本工作单元：\nTask是A2A中追踪和管理工作的核心对象，通过唯一<code>taskId</code>标识，遵循严格状态机：</p>\n<pre><code>submitted → working → completed\n                  ↘ failed\n                  ↘ input-required → working（人工介入后继续）\n                  ↘ canceled\n</code></pre>\n<p>Task对象包含<code>status</code>、<code>messages</code>（历史消息列表）、<code>artifacts</code>（产出物列表）、<code>contextId</code>（逻辑分组上下文）等字段。</p>\n<p><strong>Message和Part</strong> — 灵活的内容交换：\n- Message代表一次通信轮次，包含<code>role</code>（user/agent）和一个或多个Part。\n- Part是最小内容单元，通过<code>oneof</code>字段支持四种类型：\n  - <code>text</code>：纯文本\n  - <code>raw</code>：内联二进制数据（byte array）\n  - <code>url</code>：外部文件引用\n  - <code>data</code>：结构化JSON值\n- 每个Part可附带<code>mediaType</code>（MIME类型）和<code>filename</code>元数据。</p>\n<p><strong>Artifact</strong> — 任务产出物：\nArtifact代表Agent生成的最终输出（如文档、图像、结构化数据），有唯一<code>artifactId</code>，由多个Part组成，支持流式增量传输。</p>\n<h5>四、任务交互流程（伪代码）</h5>\n<pre><code># A2A Send Message 核心交互流程\n\n1. Client → Server: SendMessageRequest {\n     message: Message(role=&quot;user&quot;, parts=[Part(text=&quot;查询任务&quot;)]),\n     configuration: {blocking: false, acceptedOutputModes: [&quot;text&quot;, &quot;data&quot;]}\n   }\n\n2. Server 解析 Agent Card 匹配 Skill，\n   若需长时处理 → 返回 Task(submitted):\n     {&quot;id&quot;: &quot;task-123&quot;, &quot;status&quot;: &quot;submitted&quot;}\n\n3. Client 轮询: GetTaskRequest(taskId=&quot;task-123&quot;)\n   → working: {&quot;status&quot;: &quot;working&quot;, &quot;messages&quot;: [...]}\n\n4. (可选)人工介入: Task 进入 input-required\n   Client 发送新 Message → Task 回到 working\n\n5. Server 完成 → completed:\n     {&quot;status&quot;: &quot;completed&quot;, &quot;artifacts&quot;: [Artifact(parts=[...])]}\n\n6. Client 可选: CancelTaskRequest(taskId=&quot;task-123&quot;)\n   → canceled\n</code></pre>\n<h5>五、三种传输模式</h5>\n<p>A2A支持三种通信模式，适应不同场景：</p>\n<ol>\n<li><strong>请求/响应（轮询）</strong>：客户端发起请求，服务器返回结果。对于长任务，客户端周期性调用GetTask轮询状态。</li>\n<li><strong>流式传输（SSE）</strong>：通过Server-Sent Events建立持久连接，服务端推送实时增量更新（状态变化、Artifact分块、消息流）。</li>\n<li><strong>推送通知（Webhook）</strong>：客户端提供回调URL，服务器在任务状态发生重大变化时主动POST通知，适合超长任务或断连场景。</li>\n</ol>\n<div class=\"warn-box\">⚠️ 注意：并非所有A2A Server都必须支持全部三种模式，具体能力在Agent Card的<code>capabilities</code>字段中声明。</div>\n<h5>六、与传统方法的关键区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th>传统方法（工具调用/API集成）</th>\n<th>A2A协议</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>集成方式</td>\n<td>Agent退化为工具/函数</td>\n<td>Agent保持自主，以Agent身份协作</td>\n</tr>\n<tr>\n<td>能力暴露</td>\n<td>通过函数签名描述</td>\n<td>通过Agent Card声明的技能+模态</td>\n</tr>\n<tr>\n<td>状态管理</td>\n<td>无状态或应用层自定义</td>\n<td>原生Task生命周期+状态机</td>\n</tr>\n<tr>\n<td>长任务支持</td>\n<td>需自行实现超时/重试</td>\n<td>协议原生异步+人工介入状态</td>\n</tr>\n<tr>\n<td>模态支持</td>\n<td>通常仅JSON</td>\n<td>文本/文件/结构化数据/嵌入式UI</td>\n</tr>\n<tr>\n<td>安全性</td>\n<td>混入应用逻辑</td>\n<td>独立认证声明层+企业级标准</td>\n</tr>\n</tbody>\n</table></div>",
      "quiz": {
        "q": "A2A协议中Agent Card的主要作用是什么？",
        "options": [
          "存储Agent的内部工具列表和prompt模板",
          "声明Agent的身份、技能、服务端点和认证要求，供其他Agent自动发现和匹配",
          "记录Agent之间的所有历史对话内容",
          "作为Agent的运行时执行环境容器"
        ],
        "answer": 1,
        "explain": "Agent Card是A2A的发现机制，每个A2A Server发布一份JSON元数据描述自身能力，其他Agent通过解析Agent Card判断是否适合协作，无需预先了解内部实现。"
      }
    },
    {
      "id": "debate_or_vote",
      "num": 14,
      "name": "Debate or Vote",
      "fullName": "辩论还是投票 (Debate or Vote)",
      "year": "2025.08",
      "org": "University of Wisconsin-Madison",
      "parent": "vote_consensus",
      "paperUrl": "https://arxiv.org/abs/2508.17536",
      "projectUrl": "",
      "category": "deliberation",
      "motivation": "证明多数投票贡献大于互辩",
      "summary": "本文通过大规模实验和理论分析，将多智能体辩论(Multi-Agent Debate, MAD)拆解为\"集成(ensembling)\"与\"通信(communication)\"两个独立组成部分，证明简单的多数投票(Majority Voting)几乎解释了MAD的全部性能增益；并在理论上建立Dirichlet-Compound-Multinomial(DCM)模型，证明辩论过程是一个**鞅(martingale)**——期望信念在辩论中不发生变化，从而从理论上解释了多数投票的有效性。",
      "keyPoints": [
        "将MAD分解为<strong>多智能体集成(multi-agent ensembling)</strong>和<strong>智能体间通信(inter-agent communication)</strong>两个独立组件，实验表明前者解释了主要增益",
        "在7个基准(Arithmetics, GSM8K, MMLU, MMLU-Form.Log., HellaSwag, CommonSenseQA, HH-RLHF)上对比了Decentralized/Sparse/Centralized三种MAD变体与Majority Voting",
        "<strong>Majority Voting全面碾压或持平MAD</strong>：Qwen2.5-7B上MV平均0.7691 vs 最优MAD(Decentralized T=2) 0.7377；Llama3.1-8B上MV 0.7242 vs 最优MAD(Sparse T=2) 0.6990",
        "建立<strong>DCM理论框架</strong>：每个智能体建模为Dirichlet先验+Multinomial采样的生成过程，辩论视为贝叶斯后验信念更新",
        "<strong>理论核心定理</strong>：证明辩论过程诱导<strong>鞅(martingale)</strong>——<span class=\"kb-math kb-math-inline\">\\mathbb{E}[\\boldsymbol{\\theta}_{i,t+1} \\mid \\mathcal{F}_t] = \\boldsymbol{\\theta}_{i,t}</span>，即期望信念在辩论中不变，Peer influence只是随机扰动",
        "定理1(Hoeffding下界)：若单智能体正确率<span class=\"kb-math kb-math-inline\">p_0 &gt; 0.5</span>，多数投票成功率 <span class=\"kb-math kb-math-inline\">\\geq 1 - \\exp(-2N(p_0-0.5)^2)</span>，随N指数增长",
        "基于理论设计两种干预：<strong>MAD-Conformist</strong>(与多数一致则保留)和<strong>MAD-Follower</strong>(以30%概率采纳多数意见)，均超越vanilla MAD",
        "扩展验证包括更大模型Qwen2.5-32B、异构智能体组合、开放式自然语言任务，多数投票持续保持竞争力"
      ],
      "detail": "<h5>1. 核心框架图</h5>\n<p>论文的核心贡献框架可概括为\"拆解→实验验证→理论建模→指导干预\"四步：</p>\n<p><img alt=\"Debate or Vote 核心框架\" src=\"https://arxiv.org/html/2508.17536v1/assets/fig1_overview.png\" />\n<em>图1：MAD被拆解为Ensembling与Communication两部分，实验表明Ensembling(即Majority Voting)占主导</em></p>\n<h5>2. MAD形式化定义与三种变体</h5>\n<p>论文首先给出MAD的形式化定义。设N个智能体，问题q，每轮t各智能体i生成回答 <span class=\"kb-math kb-math-inline\">y_{i,t}</span>，基于上一轮其他智能体的回答进行更新：</p>\n<p><strong>Decentralized MAD</strong> (Liang et al., 2023)：每个智能体观察到所有其他智能体的回答，然后独立更新。通信拓扑为全连接。</p>\n<p><strong>Sparse MAD</strong> (Liu et al., 2024)：通信拓扑稀疏化以提升效率，智能体只与部分邻居通信。</p>\n<p><strong>Centralized MAD</strong> (Chan et al., 2024)：存在一个中心智能体汇总所有peer response并生成更新，再分发给各智能体。</p>\n<p><strong>Majority Voting</strong>：没有任何辩论，仅聚合所有智能体的初始回答，取多数票作为最终答案。可视为MAD在T=0时的特例。</p>\n<h5>3. 实验核心发现</h5>\n<p><strong>Table 1 关键数据</strong>（Qwen2.5-7B-Instruct, 平均准确率）：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>Average</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Single-Agent</td>\n<td>0.7205</td>\n</tr>\n<tr>\n<td>Decentralized MAD (T=2)</td>\n<td>0.7377</td>\n</tr>\n<tr>\n<td>Sparse MAD (T=2)</td>\n<td>0.7330</td>\n</tr>\n<tr>\n<td>Centralized MAD (T=2)</td>\n<td>0.6551</td>\n</tr>\n<tr>\n<td><strong>Majority Voting</strong></td>\n<td><strong>0.7691</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p>Llama3.1-8B-Instruct上同样趋势：MV 0.7242 &gt; 所有MAD变体。</p>\n<p><strong>消融实验</strong>(Figure 3)：随着智能体数量从1增加到5，性能单调提升，进一步佐证集成效应(而非通信)是主要驱动力。更大模型Qwen2.5-32B场景下MV仍保持竞争力。</p>\n<h5>4. DCM理论框架（核心贡献）</h5>\n<p><strong>定义1 (DCM生成模型)</strong>：每轮t，智能体i持有信念向量 <span class=\"kb-math kb-math-inline\">\\boldsymbol{\\alpha}_{i,t} \\in \\mathbb{R}_+^K</span>，两步生成回答：\n1. <strong>信念采样</strong>：<span class=\"kb-math kb-math-inline\">\\boldsymbol{\\theta}_{i,t} \\sim \\text{Dirichlet}(\\boldsymbol{\\alpha}_{i,t})</span>\n2. <strong>回答生成</strong>：<span class=\"kb-math kb-math-inline\">y_{i,t} \\sim \\text{Categorical}(\\boldsymbol{\\theta}_{i,t})</span></p>\n<p>这完美捕捉了LLM的双重不确定性——知识不确定性(Dirichlet先验的集中度)和采样随机性(Multinomial采样，对应temperature/nucleus sampling)。</p>\n<p><strong>定义2 (贝叶斯信念更新)</strong>：在辩论中，智能体观察邻居回答后，通过贝叶斯共轭更新：\n<div class=\"kb-math kb-math-display\">\\boldsymbol{\\alpha}_{i,t+1} = \\boldsymbol{\\alpha}_{i,t} + \\mathbf{c}_{i,t}</div>\n其中 <span class=\"kb-math kb-math-inline\">\\mathbf{c}_{i,t}</span> 是邻居回答的计数向量。这是MAD的理论核心——辩论就是累积观测证据。</p>\n<p><strong>定理(鞅性质)</strong>：令 <span class=\"kb-math kb-math-inline\">\\mathbf{p}_{i,t} = \\boldsymbol{\\alpha}_{i,t} / \\sum_k \\alpha_{i,t}^{(k)}</span> 为归一化信念。则有：\n<div class=\"kb-math kb-math-display\">\\mathbb{E}[\\mathbf{p}_{i,t+1} \\mid \\mathcal{F}_t] = \\mathbf{p}_{i,t}</div></p>\n<div class=\"key-point\">💡 <strong>关键直觉</strong>：辩论是鞅意味着——<strong>期望意义上，辩论既不提升也不降低智能体信念的正确性</strong>。Peer influence只是随机噪声。这从理论上解释了为什么Majority Voting就已经足够：辩论没有系统性纠偏能力，增益完全来自初始回答的集成。</div>\n<p><strong>定理1 (多数投票成功概率下界)</strong>：\n<div class=\"kb-math kb-math-display\">P(\\bar{X} &gt; 0.5) \\geq 1 - \\exp(-2N(p_0 - 0.5)^2)</div>\n其中 <span class=\"kb-math kb-math-inline\">p_0</span> 是单智能体正确概率。只要 <span class=\"kb-math kb-math-inline\">p_0 &gt; 0.5</span>，多数投票成功率随N指数提升至1。这解释了为什么即使弱智能体(略好于随机)，足够多的集成也能获得高准确率。</p>\n<h5>5. 基于理论的干预设计</h5>\n<p>从鞅定理出发，要提升辩论效果必须<strong>打破鞅的对称性</strong>——使信念更新偏向正确答案。由于多数投票在初始轮就是正确答案的良好代理(<span class=\"kb-math kb-math-inline\">p_0 &gt; 0.5</span>时)，论文设计了两种干预：</p>\n<ul>\n<li><strong>MAD-Conformist</strong>：若智能体回答与上一轮多数一致，则保留不更新；否则正常辩论</li>\n<li><strong>MAD-Follower</strong>：以30%概率直接采纳上一轮的多数答案，其余70%正常辩论</li>\n</ul>\n<p>这两种策略均使MAD性能超越vanilla baseline，验证了理论指导的有效性。但即便如此，它们仍未达到Oracle上界(用ground truth偏向)，表明设计更好的更新偏置仍是开放问题。</p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># Majority Voting (核心baseline)\ndef majority_voting(agents, question):\n    responses = [agent.answer(question) for agent in agents]\n    return most_common(responses)\n\n# Multi-Agent Debate (通用框架)\ndef mad_debate(agents, question, T):\n    # Round 0: initial responses\n    responses = {i: agents[i].answer(question) for i in range(N)}\n    for t in range(1, T+1):\n        for i in range(N):\n            # Agent i observes peers (via communication topology)\n            peer_responses = get_neighbor_responses(responses, i)\n            responses[i] = agents[i].update(question, peer_responses)\n    return majority_vote(responses)\n\n# MAD-Conformist 干预\ndef mad_conformist(agents, question, T):\n    responses = {i: agents[i].answer(question) for i in range(N)}\n    for t in range(1, T+1):\n        majority_ans = most_common(responses)\n        for i in range(N):\n            if responses[i] == majority_ans:\n                continue  # 与多数一致，保留不变\n            peer_responses = get_neighbor_responses(responses, i)\n            responses[i] = agents[i].update(question, peer_responses)\n    return majority_ans\n</code></pre>",
      "quiz": {
        "q": "论文证明多智能体辩论(MAD)是一个鞅(martingale)过程，其核心理论含义是什么？",
        "options": [
          "辩论能够系统性提升智能体信念的正确性",
          "期望意义上，辩论既不提升也不降低信念正确性，Peer influence仅为随机扰动",
          "辩论轮数越多，多数投票的优势越小",
          "集中式辩论(Centralized MAD)的收敛速度最快"
        ],
        "answer": 1,
        "explain": "鞅性质意味着条件期望不变：E[θ_{t+1}|F_t]=θ_t，因此辩论在期望意义上不会改善或恶化信念，这从理论上解释了为何简单多数投票已占主导增益。"
      }
    },
    {
      "id": "coral",
      "num": 15,
      "name": "CORAL",
      "fullName": "信息流编排范式 (CORAL)",
      "year": "2026.01",
      "org": "Coral Protocol",
      "parent": "a2a",
      "paperUrl": "https://arxiv.org/abs/2601.09883",
      "projectUrl": "",
      "category": "communication",
      "motivation": "摆脱预设工作流改用信息流调度",
      "summary": "CORAL 提出了一种**信息流编排（Information-Flow Orchestration）多智能体范式**，用专门的 Orchestrator 通过 Agent-to-Agent (A2A) 通信动态协调各 Agent，彻底摆脱了传统工作流（workflow）MAS 需要人工预定义任务状态和路由规则的限制，在 GAIA benchmark 上以 **63.64% vs OWL 55.15%（+8.49pp）** 显著胜出。",
      "keyPoints": [
        "核心动机：摆脱预设工作流改用信息流调度",
        "演化来源：继承或改进自 a2a",
        "代表机构：Coral Protocol"
      ],
      "detail": "<h5>1. 形式化模型：信息流编排的数学框架</h5>\n<p>CORAL 将 MAS 定义为一个有限智能体集合 $\\mathcal{A} = {a_1, a_2, \\dots, a_N}$，其中指定一个特殊的 <strong>信息流编排器</strong> $a_o \\in \\mathcal{A}$。系统施加<strong>非对称通信约束</strong>：</p>\n<div class=\"kb-math kb-math-display\">(a_i \\rightarrow a_j) \\in \\mathcal{C} \\Rightarrow (i = o) \\lor (j = o)</div>\n<p>即所有 Worker Agent 只能与 Orchestrator 通信，形成星型拓扑。A2A 通信工具包仅包含两个原语：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{K}^{\\text{A2A}} = \\{\\texttt{wait\\_for\\_mention}, \\texttt{send\\_messages}\\}</div>\n<ul>\n<li><strong><code>wait_for_mention</code></strong>：阻塞等待操作，$\\texttt{wait_for_mention}(a_i) \\rightarrow m$，Agent 进入等待状态直到收到消息 $m$。</li>\n<li><strong><code>send_messages</code></strong>：消息发送操作，$\\texttt{send_messages}(a_i, a_j, c)$，将自然语言内容 $c \\in \\mathcal{M}$ 发送给目标 Agent。</li>\n</ul>\n<p>每步交互过程：Orchestrator 基于历史 $\\mathcal{H}$ 和查询 $q$ 生成消息 $m_{o,t} \\leftarrow f_o(\\mathcal{H}, q, p_o)$，发送给选定 Agent；Agent 可调用外部工具获取中间结果 $\\tilde{z}<em j_t=\"j,t\">{j,t}$，再生成响应 $m</em>, p_j)$ 返回。流程持续到 Orchestrator 调用 } \\leftarrow f_j(\\tilde{z}_{j,t}, \\mathcal{H<code>submit_answer_tool</code> 或达到 30 分钟时限。</p>\n<h5>2. 架构总览与 Agent 角色</h5>\n<p><img alt=\"CORAL Architecture\" src=\"https://arxiv.org/html/2601.09883v1/extracted/6261912/figures/fig2_overview.png\" /></p>\n<p><strong>Figure 2</strong> 展示了完整架构。系统包含以下 Agent 角色（与 OWL 对齐以保证公平对比）：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th style=\"text-align: left;\">Agent 角色</th>\n<th style=\"text-align: left;\">功能</th>\n<th style=\"text-align: left;\">配备工具</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td style=\"text-align: left;\"><strong>Information Flow Orchestrator</strong></td>\n<td style=\"text-align: left;\">持续监控任务进度，动态协调其他 Agent，提交最终答案</td>\n<td style=\"text-align: left;\"><code>send_message</code>, <code>wait_for_mention</code>, <code>submit_answer_tool</code></td>\n</tr>\n<tr>\n<td style=\"text-align: left;\"><strong>Planner</strong></td>\n<td style=\"text-align: left;\">任务分解与重规划</td>\n<td style=\"text-align: left;\"><code>send_message</code>, <code>wait_for_mention</code></td>\n</tr>\n<tr>\n<td style=\"text-align: left;\"><strong>Web Agent</strong></td>\n<td style=\"text-align: left;\">网页搜索与信息检索</td>\n<td style=\"text-align: left;\"><code>send_message</code>, <code>wait_for_mention</code>, web search/browse tools</td>\n</tr>\n<tr>\n<td style=\"text-align: left;\"><strong>Document Agent</strong></td>\n<td style=\"text-align: left;\">文档读取与理解</td>\n<td style=\"text-align: left;\"><code>send_message</code>, <code>wait_for_mention</code>, document parsing tools</td>\n</tr>\n<tr>\n<td style=\"text-align: left;\"><strong>Reasoning &amp; Coding Agent</strong></td>\n<td style=\"text-align: left;\">逻辑推理与代码执行</td>\n<td style=\"text-align: left;\"><code>send_message</code>, <code>wait_for_mention</code>, code execution tools</td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>关键创新</strong>：Orchestrator 并非简单的路由器，其 prompt $p_o$ 明确规定了三项职责：(i) 监控执行过程确保可靠性和一致性；(ii) 在需额外推理时主动询问合适的 Agent；(iii) 将任务指令中继或分派给合适的执行 Agent。</p>\n<h5>3. 动态 MAS 对比：Table 1</h5>\n<p>CORAL 与现有动态 MAS 的核心区别在于 <strong>运行时显式自然语言指令</strong>：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th style=\"text-align: left;\">Method</th>\n<th style=\"text-align: left;\">Dynamic Orchestration</th>\n<th style=\"text-align: left;\">Adaptive Routing</th>\n<th style=\"text-align: left;\">Explicit NL Instructions</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td style=\"text-align: left;\">GTPSwarm (2024)</td>\n<td style=\"text-align: left;\">✓</td>\n<td style=\"text-align: left;\">×</td>\n<td style=\"text-align: left;\">×</td>\n</tr>\n<tr>\n<td style=\"text-align: left;\">MasRouter (2025)</td>\n<td style=\"text-align: left;\">✓</td>\n<td style=\"text-align: left;\">×</td>\n<td style=\"text-align: left;\">×</td>\n</tr>\n<tr>\n<td style=\"text-align: left;\">Conductor (2025)</td>\n<td style=\"text-align: left;\">✓</td>\n<td style=\"text-align: left;\">×</td>\n<td style=\"text-align: left;\">×</td>\n</tr>\n<tr>\n<td style=\"text-align: left;\">Puppeteer (2025)</td>\n<td style=\"text-align: left;\">✓</td>\n<td style=\"text-align: left;\">✓</td>\n<td style=\"text-align: left;\">×</td>\n</tr>\n<tr>\n<td style=\"text-align: left;\"><strong>Ours (A2A-based)</strong></td>\n<td style=\"text-align: left;\">✓</td>\n<td style=\"text-align: left;\">✓</td>\n<td style=\"text-align: left;\"><strong>✓</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p>此前方法要么在任务执行前确定拓扑和路由策略，要么仅拼接上一个 Agent 的输出作为下一个的上下文（如 Puppeteer），缺乏对中间结果的显式审计和指令细化能力。CORAL 的 Orchestrator 在每一步都能发出<strong>明确的、步骤特定的询问或指令</strong>，这是其处理边缘情况能力的关键来源。</p>\n<h5>4. 4 种涌现协调模式 (Figure 4)</h5>\n<p><img alt=\"Figure 4: Coordination Patterns\" src=\"https://arxiv.org/html/2601.09883v1/extracted/6261912/figures/fig4_coordination.png\" /></p>\n<p>通过 case-level 分析，Orchestrator 自发涌现出四种任务协调模式：</p>\n<ol>\n<li><strong>Direct Agent Dispatch（直接分派）</strong>：对不可分解的任务，直接分配给合适 Agent，避免不必要的任务分解开销。这与 Kim et al. (2025) 发现“过度规划对不可分解任务有害”一致。</li>\n<li><strong>Planner-Mediated Decomposition（规划器中介分解）</strong>：对自然可分解的任务，咨询 Planner 分解为子任务，必要时请求重规划。这是与传统 workflow MAS 最兼容的模式。</li>\n<li><strong>Instruction Refinement（指令细化）</strong>：Agent 遇困难时，不立即升级到重规划，而是<strong>精炼或调整上一条指令</strong>，让同一 Agent 继续。这保持了更干净紧凑的上下文，避免已完成子任务的冗余重处理。</li>\n<li><strong>Agent Substitution（Agent 替换）</strong>：某任务无法由特定 Agent 完成时，直接<strong>重新分配给另一 Agent</strong>，无需重启整个任务或全量重分解。</li>\n</ol>\n<h5>5. 3 种边缘处理策略 (Figure 5)</h5>\n<p><img alt=\"Figure 5: Edge Case Handling\" src=\"https://arxiv.org/html/2601.09883v1/extracted/6261912/figures/fig5_edgecases.png\" /></p>\n<p>三种涌现的边缘处理策略及其与 OWL 对比：</p>\n<p><strong>策略1：Dynamic Explicitization and Tightening of Success Criteria（动态显式化与成功标准收紧）</strong>\n- <strong>案例</strong>：Web Agent 被要求搜索所有美国 Survivor 冠军及其出生日期，找到所有姓名但部分人的出生日期缺失。\n- <strong>CORAL 行为</strong>：Orchestrator 检测到\"出生日期未知\"的条目不满足原始查询的<strong>隐式成功标准</strong>，主动识别不匹配并动态细化任务需求，强制要求补全后再继续。\n- <strong>OWL 行为</strong>：子任务未被标记为失败，后续步骤在错误前提下执行。</p>\n<p><strong>策略2：Real-Time Auditing and Correction of Intermediate Semantic Assumptions（实时审计与语义假设修正）</strong>\n- <strong>案例</strong>：列出 Fiona Apple 和 Paula Cole 在 1999 年<strong>之前</strong>发行的录音室专辑。Agent 返回了含 1999 年专辑的结果。\n- <strong>CORAL 行为</strong>：Orchestrator 显式审计\"1999 年是否满足 before 1999\"这一中间语义假设，在无效条目（<em>When the Pawn…</em> 和 <em>Amen</em>）传播到下游子任务前裁剪掉。\n- <strong>OWL 行为</strong>：中间结果未被标记为错误，后续步骤带着错误数据继续。</p>\n<p><strong>策略3：Continuous Monitoring and Correction of Instruction Alignment（持续监控与指令对齐修正）</strong>\n- <strong>案例</strong>：要求访问 Excel 提取 2022 年阅读书目，用<strong>词数</strong>计算阅读速率。Agent 用<strong>页数</strong>代理词数。\n- <strong>CORAL 行为</strong>：Orchestrator 检测到请求指标与代理指标之间的<strong>不匹配</strong>，升级给 Planner 生成细化指令：\"对每本书从可靠在线来源检索总词数\"。\n- <strong>OWL 行为</strong>：子任务被标记为成功，后续步骤在对齐假设错误下继续。</p>\n<h5>6. 实验设置与主要结果 (Table 2, Figure 3)</h5>\n<p><strong>Table 2: GAIA Validation Set Pass@1 准确率</strong></p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th style=\"text-align: left;\">Method</th>\n<th style=\"text-align: left;\">Level 1 (53)</th>\n<th style=\"text-align: left;\">Level 2 (86)</th>\n<th style=\"text-align: left;\">Level 3 (26)</th>\n<th style=\"text-align: left;\">Overall (165)</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td style=\"text-align: left;\"><strong>均质模型 (All Grok 4.1 Fast)</strong></td>\n<td style=\"text-align: left;\"></td>\n<td style=\"text-align: left;\"></td>\n<td style=\"text-align: left;\"></td>\n<td style=\"text-align: left;\"></td>\n</tr>\n<tr>\n<td style=\"text-align: left;\">Ours (A2A-based)</td>\n<td style=\"text-align: left;\">0.7547</td>\n<td style=\"text-align: left;\">0.6163</td>\n<td style=\"text-align: left;\">0.5000</td>\n<td style=\"text-align: left;\"><strong>0.6424</strong></td>\n</tr>\n<tr>\n<td style=\"text-align: left;\">OWL (Workflow-based)</td>\n<td style=\"text-align: left;\">0.8113</td>\n<td style=\"text-align: left;\">0.5814</td>\n<td style=\"text-align: left;\">0.5000</td>\n<td style=\"text-align: left;\"><strong>0.6424</strong></td>\n</tr>\n<tr>\n<td style=\"text-align: left;\"><strong>异构模型 (Main: Grok 4.1 Fast / Worker: GPT 4.1 Mini)</strong></td>\n<td style=\"text-align: left;\"></td>\n<td style=\"text-align: left;\"></td>\n<td style=\"text-align: left;\"></td>\n<td style=\"text-align: left;\"></td>\n</tr>\n<tr>\n<td style=\"text-align: left;\">Ours (A2A-based)</td>\n<td style=\"text-align: left;\"><strong>0.7925</strong></td>\n<td style=\"text-align: left;\"><strong>0.6047</strong></td>\n<td style=\"text-align: left;\"><strong>0.4231</strong></td>\n<td style=\"text-align: left;\"><strong>0.6364</strong></td>\n</tr>\n<tr>\n<td style=\"text-align: left;\">OWL (Workflow-based)</td>\n<td style=\"text-align: left;\">0.7358</td>\n<td style=\"text-align: left;\">0.5116</td>\n<td style=\"text-align: left;\">0.3077</td>\n<td style=\"text-align: left;\">0.5515</td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>Figure 3</strong> 的 Token 消耗 CDF 显示：均质模型下 CORAL token 消耗略高（因为自主 A2A 通信替代了手工上下文拼接）；但在异构模型下，高难度任务（&gt;0.6M tokens）CORAL 消耗<strong>更少</strong>——因为 OWL 触发重规划需重新执行已完成子任务，而 CORAL 通过指令调整即可解决问题。</p>\n<p><strong>核心发现</strong>：\n- RQ1（能否匹敌？）：均质模型下准确率持平，token 消耗可比 → ✅\n- RQ2（能否超越？）：异构模型下 +8.49pp，且高难度任务更省 token → ✅</p>\n<h5>7. 伪代码：Orchestrator 主循环</h5>\n<pre><code>def orchestrator_loop(query q, agents A, prompt p_o):\n    H = []                    # 消息历史\n    t = 0\n    while not should_submit and t &lt; 1800s:\n        # 1. Orchestrator 生成下一条消息\n        m_o = f_o(H, q, p_o)  # 可以是询问(inquiry)或指令(instruction)\n\n        # 2. 选择目标 Agent\n        a_j = select_target(m_o, A)\n\n        # 3. 发送消息\n        send_messages(a_o, a_j, m_o.content)\n        H.append((a_o, a_j, m_o.content))\n\n        # 4. 目标 Agent 等待并处理\n        m = wait_for_mention(a_j)\n        z_tilde = invoke_tools(a_j, m)      # 可选的工具调用\n        m_j = f_j(z_tilde, H, p_j)           # 生成响应\n\n        # 5. 响应返回 Orchestrator\n        send_messages(a_j, a_o, m_j)\n        H.append((a_j, a_o, m_j))\n\n        # 6. Orchestrator 评估是否提交\n        should_submit = evaluate_submission(H, q, p_o)\n        t += elapsed\n\n    return submit_answer_tool(H, q)\n</code></pre>",
      "quiz": {
        "q": "CORAL 为什么强制采用以 Orchestrator 为中心的星型拓扑？",
        "options": [
          "因为 Worker Agent 完全没有工具能力，只能转发消息",
          "因为这样能把所有推理外包给单一大模型",
          "因为它用中心化信息流协调避免通信爆炸，并让中间结果审计与指令细化都集中在 Orchestrator 上",
          "因为 A2A 协议本身禁止任意两个 Agent 直接通信"
        ],
        "answer": 2,
        "explain": "CORAL 的星型约束是方法设计，不是 A2A 协议硬限制。它的目标是把复杂协作收敛成可审计、可细化的信息流，而不是让 worker 之间自由扩散消息。"
      }
    },
    {
      "id": "latent_agents",
      "num": 16,
      "name": "Latent Agents",
      "fullName": "潜在智能体 (Latent Agents)",
      "year": "2026.04",
      "org": "Boston University",
      "parent": "mad",
      "paperUrl": "https://arxiv.org/abs/2604.24881",
      "projectUrl": "",
      "category": "optimization",
      "motivation": "把显式辩论蒸馏进单模型",
      "summary": "Latent Agents 提出了一种通过两阶段微调（SFT 辩论结构学习 + RL 动态奖励调度与长度裁剪）将显式多智能体辩论蒸馏进单模型的后训练方法，在 GSM8K/MMLU 等基准上匹配甚至超越显式辩论性能，同时推理时 token 消耗减少达 93%。",
      "keyPoints": [
        "<strong>问题定义</strong>：多智能体辩论（MAD）虽能提升推理能力，但需生成冗长的多轮辩论文本，推理开销极高",
        "<strong>两阶段训练流水线</strong>：① SFT 辩论结构学习 → ② RL 内化阶段（DPO/GRPO + 动态奖励调度 + 长度裁剪）",
        "<strong>动态奖励调度</strong>：RL 阶段逐步降低对输出长度的奖励权重，引导模型自主缩短推理链",
        "<strong>长度裁剪机制</strong>：在 token 采样时设置硬性上限，防止内化阶段生成过长序列",
        "<strong>Agent-Specific Subspace 发现</strong>：内化后模型的激活空间中存在与不同智能体视角对应的可解释子空间",
        "<strong>负面应用与控制</strong>：通过注入恶意智能体并用负向激活引导（negative steering），可更精准地定位和抑制有害行为"
      ],
      "detail": "<h5>1. 背景与动机</h5>\n<p>多智能体辩论（Multi-Agent Debate, MAD）是近年来提升 LLM 推理性能的重要技术：让多个 LLM 实例扮演不同角色，通过多轮交互辩论达成更可靠的答案。然而，MAD 的根本缺陷在于其推理成本——每个问题需要生成完整的辩论记录（transcript），包含所有智能体的发言和历史。这导致即使完成辩论后，模型仍需基于长文本进行最终推理，token 消耗巨大。</p>\n<div class=\"key-point\">💡 关键洞察：辩论过程的价值在于其<strong>结构化的推理对比和修正模式</strong>，而非显式的多智能体交互本身。如果这种模式可以被模型内化吸收，推理时只需单一模型走过类似推理路径，无需实际生成完整的辩论记录。</div>\n<p><img alt=\"Latent Agents 框架总览\" src=\"https://ar5iv.labs.arxiv.org/html/2604.24881/assets/x1.png\" />\n<em>图1：IMAD (Internalized Multi-Agent Debate) 流水线概览。① 收集辩论数据集 → ② 两阶段训练（SFT + RL）→ ③ 内化后的单模型推理</em></p>\n<h5>2. 方法核心：两阶段训练流水线</h5>\n<p><strong>阶段一：辩论结构学习（Debate Structure Learning, SFT）</strong></p>\n<p>首先在多个推理任务（含 GSM8K、MMLU-Pro 等）上，让三个 LLM 智能体进行多轮辩论，收集完整的辩论记录作为训练数据集。使用这些数据对目标模型进行监督微调（SFT），目标是让模型学会<strong>模仿辩论的格式、推理结构和交互模式</strong>。此时模型输出仍然是完整的辩论记录——包含多智能体对话、声明、反驳等。</p>\n<p><strong>阶段二：强化学习内化（RL Internalization）</strong></p>\n<p>这是整个方法的核心创新点。通过强化学习（DPO 或 GRPO）进一步训练模型，使其在保持推理质量的前提下，<strong>逐步压缩输出长度</strong>，最终直接产出答案或极简的推理链。关键设计包括：</p>\n<ul>\n<li>\n<p><strong>动态奖励调度（Dynamic Reward Scheduling）</strong>：\n  RL 奖励由两部分组成：\n  <div class=\"kb-math kb-math-display\">R = R_{\\text{accuracy}} + \\alpha_t \\cdot R_{\\text{length}}</div>\n  其中 \\<span class=\"kb-math kb-math-inline\">R_{\\text{accuracy}}\\</span> 衡量答案正确性，\\<span class=\"kb-math kb-math-inline\">R_{\\text{length}}\\</span> 鼓励短输出（负相关）。\\<span class=\"kb-math kb-math-inline\">\\alpha_t\\</span> 是随时间变化的动态权重，训练初期设为高值以鼓励缩短，后期逐步降低让模型专注准确率。这种调度类似于退火过程，避免模型陷入\"过短但错误\"的局部最优。</p>\n</li>\n<li>\n<p><strong>长度裁剪（Length Clipping）</strong>：\n  在 RL 训练的 token 采样阶段，对生成序列施加硬性最大长度限制。初始限制较宽松，随后逐步收紧。这为模型提供了一个\"自我约束（straitjacket）\"，迫使其在有限的 token 预算内完成推理。</p>\n</li>\n</ul>\n<div class=\"warn-box\">⚠️ 注意：长度裁剪与奖励调度的结合是关键——仅用奖励信号模型可能通过模糊答案（hallucination）来缩短输出；裁剪则强制模型在有限预算内完成推理，二者互为补充。</div>\n<p><strong>伪代码表示：</strong></p>\n<pre><code class=\"language-python\"># 第二阶段 RL 内化训练\nfor epoch in range(total_epochs):\n    for batch in debate_data:\n        # DPO loss with length penalty\n        outputs = model.generate(batch.question, max_new_tokens=max_len)\n\n        # 动态长度裁剪\n        max_len = max_len_init - (max_len_init - max_len_final) * epoch / total_epochs\n\n        # 奖励计算\n        acc_reward = compute_accuracy(outputs, batch.answer)\n        len_reward = -len(outputs) / max_len  # 标准化长度惩罚\n\n        # 动态权重\n        alpha = alpha_start * (1 - epoch / total_epochs) ** decay_rate\n        total_reward = acc_reward + alpha * len_reward\n\n        # DPO 损失\n        loss = dpo_loss(model, outputs, total_reward)\n        optimizer.step(loss)\n</code></pre>\n<h5>3. 激活空间与 Agent Subspace</h5>\n<p>论文进一步通过<strong>激活引导（Activation Steering）</strong> 实验揭示了内化的深层机理：</p>\n<ul>\n<li>使用多个具有不同推理风格（Chain-of-Thought、Self-Critique、Program-of-Thought）的智能体构建多样辩论数据集，进行 SFT 和 RL 内化</li>\n<li>从内化模型中提取与特定智能体行为对应的 <strong>steering vector</strong>（激活方向）</li>\n<li>实验表明：对这些方向进行正向/负向干预，可以稳定地增强/抑制目标智能体的推理风格</li>\n<li>这些 <strong>agent-specific subspace</strong> 是可解释的、独立的方向，说明内化过程并非简单的模式压缩，而是在激活空间中建立了结构化的表示</li>\n</ul>\n<p><img alt=\"Agent Subspace 分析\" src=\"https://ar5iv.labs.arxiv.org/html/2604.24881/assets/x11.png\" />\n<em>图11：不同智能体引导方向对 GSM8K 任务性能的影响。正/负向引导可稳定控制推理风格</em></p>\n<h5>4. 恶意智能体控制实验</h5>\n<p>作为实用验证，论文设计了如下实验：\n1. 在辩论数据集中混入\"恶意\"智能体（有意给出错误答案、散播有害信息）\n2. 通过内化训练将恶意模式嵌入模型\n3. 用负向激活引导抵消恶意行为</p>\n<p>结果显示：内化模型中的恶意行为比直接在基座模型上进行引导更容易定位和抑制，且对通用性能的损害更小（ROUGE AUC 指标更高）。这一发现为 AI 安全中对齐和控制提供了新视角：<strong>蒸馏后内化的有害模式比原生模型中的更有结构、更易干预</strong>。</p>\n<h5>5. 实验结果</h5>\n<ul>\n<li><strong>性能保持</strong>：内化后的单模型在 GSM8K、MMLU-Pro 等基准上匹配或超越显式多智能体辩论的准确率</li>\n<li><strong>效率提升</strong>：推理 token 消耗最多减少 93%</li>\n<li><strong>鲁棒性</strong>：对 OOD 任务（如摘要生成）保持良好的泛化能力</li>\n<li><strong>可控性</strong>：激活引导可在小幅性能代价下稳定控制推理风格</li>\n</ul>",
      "quiz": {
        "q": "Latent Agents 的 RL 内化阶段中，动态奖励调度 α_t 在训练过程中如何变化？",
        "options": [
          "始终保持较大学 α 以最大化长度压缩",
          "训练初期 α 较大鼓励缩短，后期逐渐减小以专注准确率",
          "训练初期 α 较小以学习准确推理，后期逐渐增大以压缩长度",
          "α 在训练中随机扰动，每次从均匀分布中采样"
        ],
        "answer": 1,
        "explain": "动态奖励调度采用退火策略，训练初期赋予长度惩罚较高权重以引导压缩，后期逐步降低权重确保准确率不被牺牲。"
      }
    },
    {
      "id": "blackwell_dm",
      "num": 17,
      "name": "Blackwell-DM",
      "fullName": "布莱克韦尔信息聚合 (Blackwell Decision-Making)",
      "year": "2026.05",
      "org": "University of Surrey",
      "parent": "debate_or_vote",
      "paperUrl": "https://arxiv.org/abs/2605.06028",
      "projectUrl": "",
      "category": "deliberation",
      "motivation": "以后验聚合替代经验式投票辩论",
      "summary": "本文基于 **Blackwell 信息性框架** 形式化分析多智能体 LLM 系统的信息聚合机制，证明投票（voting）和辩论（debate）均为信息结构上的 **garbling**（噪声化），无法超越 Bayesian pooled posterior 的信息上界；据此提出 **MA-PoP**（Multi-Agent Product of Posteriors）方法，在六个 QA benchmark 上一致超越现有 SOTA 多智能体聚合方法。",
      "keyPoints": [
        "核心动机：以后验聚合替代经验式投票辩论",
        "演化来源：继承或改进自 debate_or_vote",
        "代表机构：University of Surrey"
      ],
      "detail": "<p><img alt=\"Blackwell-DM 示意图\" src=\"https://ar5iv.labs.arxiv.org/html/2605.06028/assets/x1.png\" />\n<em>图：Blackwell-DM 的核心框架或评测示意。</em></p>\n<h5>1. 问题形式化：Blackwell 信息结构</h5>\n<p>论文用 <strong>Blackwell 信息结构 (D, σ)</strong> 抽象多智能体决策：\n- <strong>状态空间 S</strong>：分类任务中的真实标签 y ∈ Y\n- <strong>行动空间 A</strong>：预测标签\n- <strong>效用函数 φ(a, s)</strong>：负损失函数\n- <strong>先验 ρ(s)</strong>：无信息先验（均匀分布）\n- <strong>每个智能体 m</strong>：拥有私有训练数据 d_m，形成私有后验 Pr(y|x, d_m)</p>\n<p><strong>Blackwell 定理 1</strong>：若信息结构 (D', σ') 是 (D, σ) 的 <strong>garbling</strong>（即通过一个随机映射 f: D → Δ(D') 从原始信号生成新信号），则对于任意决策问题和任意贝叶斯理性决策者，使用 (D, σ) 的期望效用 ω(σ) 不低于使用 (D', σ') 的期望效用 ω(σ')。形式化地：(D', σ') ⊴ (D, σ) ⟹ ω(σ') ≤ ω(σ)。</p>\n<h5>2. 核心理论：聚合必为 garbling</h5>\n<p><strong>Proposition 1（信息聚合是 garbling）</strong>：任何仅在智能体标签空间或后验空间上执行的确定性或随机聚合函数 g: ∏<em joint=\"joint\">{m=1}^M Δ_Y → Δ_Y，其在 Blackwell 意义上等价于一个信息结构，且该结构相对于完整联合信息结构 (D_1×···×D_M, σ</em>) 是一个 garbling。换言之，任何聚合操作不可避免地引入信息损失。</p>\n<p><strong>Proposition 2（投票与辩论的信息下界）</strong>：\n- <strong>Majority Voting</strong>：仅在标签空间做离散硬判决聚合，等价于对联合后验的极大粗粒度分类器输出 garbling——信息效率远低于直接访问联合后验。\n- <strong>Multi-round Debate (MAD)</strong>：虽然智能体在多轮交互中更新信念，但每轮输出仍为离散标签（或有限概率向量），最终决策仍是标签空间的聚合。Blackwell 框架揭示其信息结构本质上仍是联合信息的 garbling，辩论轮次增加无法突破这一上界。\n- <strong>Bayesian Pooled Posterior</strong>：给定所有智能体的私有信息 d_{1:M}，贝叶斯最优决策规则为直接计算后验 Pr(y|x, d_{1:M}) ∝ ρ(y)Π_{m=1}^M Pr(d_m|y, x)。这是所有聚合方法在 Blackwell 排序下的上界（最多信息量的参考点）。</p>\n<h5>3. MA-PoP 方法：Product-of-Posteriors 估计</h5>\n<p>面向多选 QA 任务（固定候选答案集 A = {a_1,...,a_K}），MA-PoP 分三步实现 Bayesian pooled posterior 的实用近似：</p>\n<p><strong>Step 1: 单智能体后验提取</strong>\n对于每个智能体 m（LLM_m），输入问题 x 和完整候选答案列表 A，通过提示工程引导模型输出 K 维概率向量：</p>\n<pre><code>P_m = LLM_m(x, A) ∈ Δ_K  （归一化概率单纯形）\nP_m[k] ≈ Pr(y = a_k | x, d_m), k = 1,...,K\n</code></pre>\n<p>实现要点：提示中明确要求模型以结构化的概率分布格式（如 \"A: 0.3, B: 0.5, C: 0.15, D: 0.05\"）输出置信度。</p>\n<p><strong>Step 2: Product-of-Posteriors 聚合</strong>\n<div class=\"kb-math kb-math-display\">\\tilde{P}_{\\text{pooled}}[k] = \\prod_{m=1}^M P_m[k]^{w_m}, \\quad P_{\\text{pooled}} = \\text{normalize}(\\tilde{P}_{\\text{pooled}})</div>\n其中权重 w_m = 1（均匀权重）为默认配置。两种理论解读：\n- <strong>条件独立情形</strong>：若各智能体的私有信息 d_m 在给定标签 y 下条件独立，即 Pr(d_1,...,d_M|y,x) = Π_m Pr(d_m|y,x)，则乘积形式精确等于 Bayesian pooled posterior。\n- <strong>相关性情形</strong>：条件独立性不成立时，该公式退化为对数线性意见池（log-linear opinion pool），作为联合后验的有效近似，其信息损失量取决于智能体间信息冗余度。</p>\n<p><strong>Step 3: NLI Cross-Encoder 概率校准</strong>\nLLM 输出的原始概率常存在过度自信或不校准问题。论文引入 NLI（自然语言蕴含）模型作为外部校准信号：\n- 对每个候选答案 a_k，构造 前提：问题 x + 上下文，假设：答案 a_k 是正确的，输入 RoBERTa-large-MNLI 得到蕴含得分 s_NLI[k]（softmax 归一化后的 entailment 概率）。\n- 融合公式：P_final = α · P_pooled + (1-α) · s_NLI\n- α 通过验证集网格搜索确定（典型值约 0.7–0.9）。</p>\n<p><strong>伪代码（伪代码块）</strong>：</p>\n<pre><code>输入: 问题 x, 候选答案 A={a_1,...,a_K}, M个LLM智能体\n输出: 最终预测 y_hat\n\nfor m = 1 to M do\n    P_m ← LLM_m.posterior(x, A)      # 各智能体生成概率分布\nend for\n\nP_pooled ← normalize(Π_{m=1}^M P_m)   # Product of Posteriors（逐元素乘积后归一化）\n\ns_NLI ← NLI_CrossEncoder(x, A)       # NLI模型对每个候选答案打分\nP_final ← α * P_pooled + (1-α) * s_NLI  # 概率校准融合\n\ny_hat ← argmax_k P_final[k]\n返回 y_hat\n</code></pre>\n<p><strong>计算复杂度</strong>：\n- LLM 推理：M 次前向传播（与单轮投票一致）\n- 乘积聚合：O(M×K) 浮点运算 + 归一化\n- NLI 推理：O(K) 次 cross-encoder 评分（约 1 秒/样本，单 GPU）\n- 总延迟：≈ 单次 LLM 推理 + 1 秒，显著低于辩论的 T 轮 × M 次 LLM 调用</p>\n<h5>4. 实验配置与结果</h5>\n<p><strong>Benchmark 列表</strong>：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>数据集</th>\n<th>领域</th>\n<th>候选数</th>\n<th>数据量</th>\n<th>关键特点</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>MedMCQA</td>\n<td>医学（印度医学考试）</td>\n<td>4</td>\n<td>~194k 训练 / ~4k 测试</td>\n<td>大规模医学QA</td>\n</tr>\n<tr>\n<td>MedQA (USMLE)</td>\n<td>医学（美国医师资格考试）</td>\n<td>4</td>\n<td>~10k 训练 / ~1.3k 测试</td>\n<td>高难度临床推理</td>\n</tr>\n<tr>\n<td>MMLU-College Medicine</td>\n<td>综合学科</td>\n<td>4</td>\n<td>约 200 题</td>\n<td>大学水平医学</td>\n</tr>\n<tr>\n<td>MMLU-Professional Medicine</td>\n<td>综合学科</td>\n<td>4</td>\n<td>约 270 题</td>\n<td>执业医师水平</td>\n</tr>\n<tr>\n<td>MMLU-Anatomy</td>\n<td>综合学科</td>\n<td>4</td>\n<td>约 140 题</td>\n<td>解剖学专项</td>\n</tr>\n<tr>\n<td>ARC-Challenge</td>\n<td>科学推理</td>\n<td>4</td>\n<td>~1.1k 测试</td>\n<td>复杂多步推理</td>\n</tr>\n<tr>\n<td>PubMedQA</td>\n<td>生物医学</td>\n<td>3 (yes/no/maybe)</td>\n<td>~500 测试</td>\n<td>需要文献证据</td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>智能体配置</strong>：\n- 同构（Homogeneous）：5 个相同架构/参数的 LLM 实例，以不同随机种子微调\n- 异构（Heterogeneous）：5 个不同模型（Qwen-7B, Falcon-7B, Gemma-9B, Falcon-34B 等），不经微调</p>\n<p><strong>基线方法</strong>：\n- Single Best Agent：单智能体最佳性能\n- Majority Voting：硬投票（取多数标签）\n- Weighted Voting + Inverse Surprising Popularity [16]：利用一阶准确率与二阶相关性的加权投票\n- MAD (Multi-Agent Debate) [6]：2/3/4 轮交互辩论\n- Centralised MAD：集中式辩论变体（由中心模型汇总论点）\n- Free-MAD [15]：共识无关的辩论轨迹评估</p>\n<p><strong>主要结果</strong>（MedMCQA, 5-agent）：\n- MA-PoP w/ calibration：异构 68.2%，同构 63.7%，均排名第一\n- 最佳单智能体：异构中 Falcon-34B 约 60.3%\n- Majority Voting：异构 62.1%，同构 59.5%\n- MAD (4-round)：异构 59.4%，同构 57.8%（甚至劣于投票）\n- Free-MAD：异构 61.3%，优于经典 MAD 但仍低于 MA-PoP\n- Centralised MAD：在所有配置中均未显著超越单智能体，部分降级</p>\n<p><strong>校准效果</strong>（Tab. 9, Fig. 2）：\n- 四个模型（Qwen-7B, Falcon-7B, Gemma-9B, Falcon-34B）的可靠性图（reliability diagram）：\n  - 未校准：严重偏离对角线，呈 S 形（过度自信/不自信）\n  - MA-PoP + Calibration：接近对角线（理想校准）\n- ECE（期望校准误差）绝对降低 5–15 个百分点\n- MCE（最大校准误差）降低幅度类似</p>\n<p><strong>效率</strong>（Tab. 11, MedMCQA）：\n- MA-PoP 总 token 消耗 ~800/样本，与单轮投票相当\n- MAD 2-round ~1600，4-round ~3200 tokens/样本\n- NLI 步骤耗时 &lt; 1 秒/样本，LLM 推理约 25 秒/样本（占比 &lt; 4%）</p>\n<p><strong>消融分析</strong>（5-agent heterogeneous）：\n- -NLI calibration：准确率下降 1.8%\n- Product → Linear Pooling：准确率下降 3.2%\n- 智能体间相关系数 ρ 从 0 增至 0.8：准确率下降但平缓（最多 -2.5%），始终优于投票</p>\n<h5>5. 理论深度解析</h5>\n<p><strong>Blackwell 定理的技术本质</strong>：Blackwell (1951, 1953) 提出了一种对\"信息量\"的半序比较：信息结构 (D, σ) 比 (D', σ') \"更信息\" 当且仅当 (D', σ') 是 (D, σ) 的 garbling。Garbling 被定义为：存在一个与状态 s 条件独立的随机映射 γ: D → Δ(D')，使得 σ'(d'|s) = Σ_{d} σ(d|s) γ(d'|d)。这一概念优雅地形式化了\"从原始信号经噪声信道获得退化信号\"——Blackwell 定理随即断言，任何贝叶斯理性决策者严格偏好更信息的结构（对任意决策问题 non-dominated）。</p>\n<p><strong>在 LLM 多智能体场景的特化</strong>：\n1. 每个智能体的 LLM 输出 P_m = Pr_m(y|x, d_m) 可视为从原始私有证据 d_m 到概率向量的映射。此映射本身已是信息压缩（garbling of d_m）。\n2. 任何聚合函数 g: (P_1, ..., P_M) → P_agg 等价于对联合信号 (d_1,...,d_M) 的复合 garbling。\n3. 因此，只有在能够直接访问联合似然 Pr(d_{1:M}|y) 时才能达到 Blackwell 上界，任何仅在后验空间或标签空间的聚合必然信息退化。</p>\n<p><strong>理论指导的实践启发</strong>：\n- 与其设计精巧的辩论协议（受限于 Blackwell 上界），不如直接近似联合后验\n- 当私有信息高度互补时（异构智能体），product-of-posteriors 接近精确贝叶斯组合，预期增益最大——实验验证了此预测\n- 当私有信息高度冗余时（同构智能体），乘积近似退化为对数线性意见池，增益减弱——但也符合实验趋势</p>",
      "quiz": {
        "q": "Blackwell-DM 论文为何认为 MA-PoP 比多数投票或多轮辩论更接近信息上界？",
        "options": [
          "因为 MA-PoP 使用了更多 agent，所以信息量天然更大",
          "因为 MA-PoP 直接在各 agent 的后验分布上做 product-of-posteriors，尽量逼近 pooled posterior，而投票/辩论都属于信息 garbling",
          "因为 MA-PoP 完全不需要校准模型",
          "因为 MA-PoP 只适用于单智能体场景"
        ],
        "answer": 1,
        "explain": "论文的核心理论结论是 voting 和 debate 都会把联合信息进一步压缩；MA-PoP 则直接近似 pooled posterior，因此更接近 Blackwell 意义下的信息上界。"
      }
    },
    {
      "id": "ma_workflow_rl",
      "num": 18,
      "name": "MA-Workflow RL",
      "fullName": "多智能体工作流强化学习 (When Does Multi-Agent RL Improve LLM Workflows?)",
      "year": "2026.05",
      "org": "Oregon State University",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2605.24202",
      "projectUrl": "",
      "category": "optimization",
      "motivation": "揭示共享策略与隔离策略权衡",
      "summary": "这篇工作不是再发明一种新 workflow，而是系统回答一个更基础的问题：多智能体 LLM workflow 做端到端 RL 时，到底该让所有角色共享同一策略（Shared-Policy），还是给每个角色单独参数（Isolated-Policy）；结论是收益和失效模式同时受 workflow、task 与 scale 共同决定，不能用单一经验法则概括。",
      "keyPoints": [
        "核心动机：揭示共享策略与隔离策略权衡",
        "代表机构：Oregon State University"
      ],
      "detail": "<pre><code class=\"language-python\"># Shared-Policy vs Isolated-Policy 的训练对照（按论文整理）\nfor batch in workflow_rollouts:\n    trajectories = run_workflow(batch, workflow_type)\n\n    if mode == &quot;shared_policy&quot;:\n        loss = sum(role_loss(traj, shared_policy) for traj in trajectories)\n        update(shared_policy, loss)\n\n    elif mode == &quot;isolated_policy&quot;:\n        for role in roles:\n            role_trajs = collect_role_trajectories(trajectories, role)\n            loss = sum(role_loss(traj, role_policies[role]) for traj in role_trajs)\n            update(role_policies[role], loss)\n</code></pre>\n<p><img alt=\"MA-Workflow RL 示意图\" src=\"https://ar5iv.labs.arxiv.org/html/2605.24202/assets/x1.png\" />\n<em>图：MA-Workflow RL 的核心框架或评测示意。</em></p>\n<h5>1. 背景与动机</h5>\n<p>LLM-based agent workflow 近期快速发展（如 AutoGen、CrewAI、LangGraph 等框架），但这些工作流中的智能体大多使用<strong>零样本提示</strong>或固定的 few-shot 示例，缺乏基于任务反馈的端到端优化。当引入强化学习（如 GRPO、PPO）来微调工作流中的多个 LLM 时，一个基本问题浮现：</p>\n<blockquote>\n<p>每个智能体应该学习独立策略，还是所有智能体共享同一策略？</p>\n</blockquote>\n<p>论文认为这不是参数效率层面的枝节问题，而是决定训练压力如何沿着 workflow 路由的核心设计项。</p>\n<h5>2. 实验矩阵：论文比较的是三种 workflow 下的 RL 行为</h5>\n<p>作者没有把结论建立在单一 benchmark 上，而是构造了一个很清楚的对照矩阵：\n- <strong>workflow</strong>：Eval-Opt、Voting、Orch-Workers\n- <strong>task</strong>：数学与代码\n- <strong>scale</strong>：<code>0.6B</code>、<code>1.7B</code>、<code>4B</code></p>\n<p>其中最关键的不是“谁赢得更多”，而是不同组合下 <strong>Shared-Policy (SP)</strong> 和 <strong>Isolated-Policy (IP)</strong> 如何以不同方式失败。论文的主张是：MA-RL 通常能优于 base model，但是否稳定、何时退化、退化成什么形态，要看这三类变量的联合作用。</p>\n<h5>3. Shared-Policy vs Isolated-Policy：两者都可能出问题，但问题类型不同</h5>\n<p><strong>Isolated-Policy</strong> 的优势是角色专业化更强，因此常常能爬到更高的 peak accuracy；但抽象地说，它把每个 role 的更新通道彻底分开，也更容易让某些 role 的梯度被反复放大，于是出现论文所谓的 <strong>terminal accuracy cliff</strong>: 训练前期上涨，后期却突然跌穿。</p>\n<p><strong>Shared-Policy</strong> 看起来更像一种“稳定器”，因为所有 role 共用同一组参数，经验更集中，更新更平滑。但论文明确指出：SP 并没有消除 failure，只是把 failure 改写成了另一种模式。最典型的情况是共享参数逐渐被某个 dominant role 主导，导致其它角色的行为分布越来越像它，最终失去分工。</p>\n<h5>4. 论文的解释框架：role-level gradient dynamics</h5>\n<p>这篇工作的价值之一，在于它不是只做 empirical comparison，而是试图解释结果背后的梯度动力学。</p>\n<p>在 <strong>Voting</strong> 和 <strong>Orch-Workers</strong> 这类 workflow 中，论文指出当多个 <strong>same-role agents</strong> 在共享 prompt 或相近上下文下并行工作时，Isolated-Policy 会把某类 role 的梯度重复放大，从而更容易走向后期退化。直觉上，角色被隔离后，系统失去了“梯度互相稀释”的渠道，于是同类角色的局部更新会被越推越偏。</p>\n<p>而在 <strong>Shared-Policy</strong> 下，问题变成了另一个方向：不同 role 并不是被均匀地写入共享参数，而是由 <strong>asymmetric per-step gradient mass</strong> 决定谁占据主导。哪个角色在 rollout 中出现得更频繁、损失贡献更大、梯度更集中，它就更容易“捕获”共享策略。于是共享并不会自动带来平衡，反而可能让 workflow 退化成“看起来是多角色，实则被单一角色风格主宰”的系统。</p>\n<h5>5. 这篇论文真正给出的设计结论</h5>\n<p>这篇工作最重要的结论其实是一个负结论：<strong>不要把 policy sharing 当成稳定性的通用开关。</strong></p>\n<p>如果 workflow 本身存在强并行同角色结构，IP 可能在后期更容易崩；如果 workflow 里某个角色天然更频繁、更强势，SP 又可能被它捕获。也就是说，policy sharing 不是“更稳”或“更强”的单轴选择，而是训练压力的路由方式。</p>\n<p>这也解释了论文标题里的三件事为什么要并列写：<strong>workflow、scale、policy-sharing tradeoffs</strong>。作者要表达的是，只有把三者一起看，才知道 RL 是否真的在帮你的多智能体系统，而不是悄悄制造新的 failure mode。</p>\n<h5>6. 局限</h5>\n<ul>\n<li>论文主要回答的是“什么时候会有效、为什么会失效”，不是提出一个通用的新训练算法。</li>\n<li>结论建立在给定 workflow family、数学/代码任务和中小模型尺度上，迁移到别的拓扑或别的任务族时仍需重新验证。</li>\n<li>论文关注 role-level gradient dynamics，但真实部署中还会叠加工具调用、环境非平稳性和 reward 设计噪声。</li>\n</ul>",
      "quiz": {
        "q": "MA-Workflow RL 对 Shared-Policy 与 Isolated-Policy 的核心结论是什么？",
        "options": [
          "Shared-Policy 在所有 workflow 和任务上都更稳定",
          "Isolated-Policy 总能得到更高最终准确率且不会崩塌",
          "两者优劣取决于 workflow、task 和 scale 的联合作用，并且各自有不同 failure mode",
          "论文证明两者本质等价，只是实现方式不同"
        ],
        "answer": 2,
        "explain": "论文的核心发现不是谁绝对更强，而是 SP 与 IP 会把训练压力沿不同通道传播，因此收益与退化都依赖 workflow、任务和模型规模。"
      }
    },
    {
      "id": "multi2",
      "num": 19,
      "name": "Multi^2",
      "fullName": "分层多智能体决策 (Multi^2)",
      "year": "2026.06",
      "org": "Sungkyunkwan University",
      "parent": "magentic_one",
      "paperUrl": "https://arxiv.org/abs/2606.03698",
      "projectUrl": "",
      "category": "organization",
      "motivation": "高低层双Agent缓解长程目标漂移",
      "summary": "Multi^2 用“高层子目标生成器 + 低层动作执行器”的双系统设计，把长程多步决策中的 objective drift 问题拆开处理：System 1 负责提出语义稳定的子目标，System 2 负责在具体环境中优化动作，从而缓解长时规划容易偏航的问题。",
      "keyPoints": [
        "论文聚焦 long-horizon interaction 中的 objective drift：步数越长，agent 越容易偏离原始目标",
        "使用分层双 agent：高层负责生成子目标，低层负责围绕子目标执行动作",
        "高层 System 1 通过 SFT 学习把长期任务拆成更稳定、更可执行的中间意图",
        "低层 System 2 采用 offline-to-online RL，在子目标约束下学动作策略",
        "配套构建层次化数据集与训练流程，而不是只在推理期临时加一步 decomposition",
        "论文强调该设计能提升长程 horizon 下的 token efficiency 与目标保持能力",
        "本质上是把“想做什么”和“如何一步步做”拆成两套优化问题分别训练"
      ],
      "detail": "<p><img alt=\"Multi^2 分层决策框架\" src=\"https://ar5iv.labs.arxiv.org/html/2606.03698/assets/x1.png\" />\n<em>图：Multi^2 将长期任务拆成高层子目标规划与低层动作执行两层，以减少长链路交互中的目标漂移。</em></p>\n<pre><code class=\"language-python\"># Multi^2 的层次化决策循环（按论文方法概括）\nstate = env.reset(task)\nwhile not done:\n    subgoal = system1.propose_subgoal(task, state, history)\n    for _ in range(k):\n        action = system2.act(state, subgoal)\n        state, reward, done = env.step(action)\n        system2.update_offline_to_online(state, reward, subgoal)\n        if subgoal_reached(state, subgoal) or done:\n            break\n</code></pre>\n<p>Multi^2 的问题定义并不新奇，但非常关键：长链路 agent 往往不是不会做某一步，而是做着做着忘了最初目标。论文把这种现象明确命名为 objective drift，并指出单体 policy 在 horizon 拉长后容易同时承担“长期意图维持”和“局部动作优化”两类负担。</p>\n<p>为此，作者采用了一个经典但在 agent 场景下重新工程化的分层思路。System 1 只负责生成当前最值得追的子目标，相当于把长期任务映射到语义上更稳的中间状态；System 2 则只关注“在这个子目标下，下一步怎么动最优”。</p>\n<p>论文进一步把这种分层写进训练流程，而不是只在推理期做 decomposition。System 1 通过监督数据学习子目标生成，System 2 则走 offline-to-online RL 路径，在已有行为数据上初始化，再通过在线交互细化。</p>\n<p>因此 Multi^2 的代表意义，在于它把“分层”从 prompt 技巧推进到训练范式。</p>\n<div class=\"key-point\">💡 关键：Multi^2 的两层并非简单串联，而是分别承担“目标保持”和“动作优化”两种不同优化目标。</p>\n<p>⚠️ 注意：如果高层子目标定义得不稳定，低层再强也只会把错误子目标执行得更彻底。</div>",
      "quiz": {
        "q": "Multi^2 设计高层 System 1 的直接目的是什么？",
        "options": [
          "替代所有环境交互，只输出最终答案",
          "缓解长程交互中的 objective drift，持续给出稳定子目标",
          "把低层 RL 完全改成监督学习",
          "减少工具调用的 JSON 解析错误"
        ],
        "answer": 1,
        "explain": "System 1 的职责就是维持长期目标一致性，把原任务拆成更稳的中间子目标。"
      }
    }
  ],
  "categories": {
    "foundation": {
      "label": "协作奠基",
      "color": "#0F766E"
    },
    "organization": {
      "label": "角色分工与编排",
      "color": "#2563EB"
    },
    "deliberation": {
      "label": "辩论与群体决策",
      "color": "#7C3AED"
    },
    "communication": {
      "label": "通信拓扑与治理",
      "color": "#EA580C"
    },
    "protocol": {
      "label": "互操作协议",
      "color": "#DC2626"
    },
    "optimization": {
      "label": "训练与内化",
      "color": "#CA8A04"
    }
  },
  "projectUrls": {}
};
