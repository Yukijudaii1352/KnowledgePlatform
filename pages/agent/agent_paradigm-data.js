/**
 * agent_paradigm-data.js — 由 pipeline/build.py 于 2026-06-15 17:41:24 自动生成。
 * 源文件：content/agent/agent_paradigm.md
 * ⚠️  请勿手动修改；如需更新，修改源文档后重新编译。
 */
window.PAGE_CONFIG = {
  "meta": {
    "domain": "agent",
    "topic_id": "agent_paradigm",
    "topic_name": "Agent范式",
    "page_title": "Agent范式技术演进",
    "page_subtitle": "2026-06-15 版",
    "page_desc": "围绕单体 LLM Agent 的控制与规划主线，梳理从零样本规划、ReAct 循环，到搜索式规划、世界模型、分层 plan-execute，再到前瞻反思与约束执行闭环的核心范式。",
    "page_icon": "🧭",
    "hero_pills": [
      "🏷️ ReAct · Search · World Model · Plan-Execute",
      "Reflection · Replanning · Constrained Execution"
    ],
    "count_pill": "{count} 个算法",
    "image_base": "",
    "overview_from_doc": true,
    "latest_overview_from_doc": true
  },
  "overview": [
    {
      "title": "",
      "body_html": "<h1>VALSE 2026 年度进展报告 | 郝建业教授：基于大语言模型的智能体</h1>\n<ul>\n<li>来源平台: <strong>zhihu</strong>（知乎专栏文章）</li>\n<li>原文链接: <a href=\"https://zhuanlan.zhihu.com/p/2037258478889219863\">https://zhuanlan.zhihu.com/p/2037258478889219863</a></li>\n<li>作者: 强化学习实验室</li>\n</ul>\n<hr />\n<p>VALSE 2026 年度进展报告 | 郝建业教授：基于大语言模型的智能体</p>\n<h1>VALSE 2026 年度进展报告 | 郝建业教授：基于大语言模型的智能体</h1>\n<p>作者: 强化学习实验室, 赞: 10</p>\n<p><strong>Agent 的真正价值，不在于单次生成能力，而在于能否在真实任务中持续调用工具、沉淀经验，并在安全边界内完成长期协作。</strong></p>\n<p><strong>——郝建业</strong></p>\n<p>http://weixin.qq.com/r/mp/ZydAWJvE_caGrd8793J1 (二维码自动识别)</p>\n<p><img alt=\"\" src=\"https://pic2.zhimg.com/v2-e63644930c55a9d369a46223348c1f03_1440w.jpg\" /></p>\n<p>（图源：VALSE 2026）</p>\n<p>VALSE（视觉与学习青年学者研讨会，Vision And Learning SEminar）自2011年发起以来，已成为中国计算机视觉与机器学习领域最具权威性和影响力的年度学术盛会之一，累计成功举办15届，历届参会规模持续攀升，极大提升了中国学者在国际学术舞台的影响力。</p>\n<p>VALSE 2026 于2026年5月8日至10日在武汉国际会议中心隆重举行，逾7000名专家学者参会。MemoraX AI 创始人、天津大学菁英教授郝建业受邀作年度进展报告，主题为《基于大语言模型的智能体》。报告系统梳理了过去一年大模型智能体在工具使用、记忆管理、安全治理三大核心方向上的研究进展，并以多个代表性工作和真实落地场景，勾勒出 Agent 从“能用”走向“能打”的清晰路径。</p>\n<p>以下是本次报告的精华整理。</p>\n<h2><strong>01背景：基座模型演进，正在不断拓宽智能体的能力边界</strong></h2>\n<p>过去一年，前沿基座模型在语言、数学、代码与多模态等基础能力上持续跃升，与此同时，Agentic 能力、应用形态也随之快速演进。基座模型的持续演进，正在不断拓宽自主智能体的能力边界。</p>\n<p><img alt=\"\" src=\"https://pic1.zhimg.com/v2-a0737adc1d34dde46099581c8b6dac40_1440w.jpg\" /></p>\n<p>报告刻画了智能体工程范式的三段演进：</p>\n<p><img alt=\"\" src=\"https://pic4.zhimg.com/v2-14a01a867328143461b1350a11c99d95_1440w.jpg\" /></p>\n<p>报告以 OpenClaw（多入口可治理的 Agent 执行链路）和 Hermes（以安全边界治理为底座、以经验沉淀与 Skills 复用驱动的持续成长型 Agent）为例，剖析了 Harness 的两个发展阶段。但真正落地仍取决于三件事——工具执行可靠、记忆自进化稳定、安全持续可控。</p>\n<p>这正是报告后续三大主线的起点。</p>\n<h2><strong>02工具使用（Tool-use）：从“会调工具”到“会在环境中持续决策”</strong></h2>\n<p>工具使用涉及五大核心挑战：工具选择、参数生成、结果理解、多步规划、信用分配。郝老师梳理了一条清晰的演进路径：</p>\n<p><img alt=\"\" src=\"https://pic4.zhimg.com/v2-a78bd7339b09d3c2dfdfcab217db77cb_1440w.jpg\" /></p>\n<p>报告重点解读了以下工作：</p>\n<p>ToolRL（UIUC, NeurIPS 2025）——把“何时调用、调用什么、如何填参”转化为可训练的序列决策问题，相比 SFT 平均提升14个百分点。</p>\n<p><img alt=\"\" src=\"https://pic2.zhimg.com/v2-fba96ee6fadea2df6de78f01c68f2a37_1440w.jpg\" /></p>\n<p>Tool-Star（RUC, SIGIR 2026）——通用 TIR 数据合成 + Cold-Start SFT + Self-Critic RL（GRPO 与 DPO 穿插），相比 ToolRL 再提升8.3个百分点。</p>\n<p><img alt=\"\" src=\"https://picx.zhimg.com/v2-9deb08a218cbdf7adb1295551dca683b_1440w.jpg\" /></p>\n<p><strong>基座模型的Agentic 化——Qwen3、GLM-4.5、Kimi K2/K2.5 的技术报告显示，前沿基座普遍把多步规划、工具调用、自我修正前置为明确的训练目标，预训练引入长上下文与Agentic 轨迹，后训练面向 Agent 任务端到端优化。</strong></p>\n<p><img alt=\"\" src=\"https://pic4.zhimg.com/v2-3076538fae4449068c347aaa56705781_1440w.jpg\" /></p>\n<p>三大典型场景：</p>\n<p>Search 场景：Search-o1、DualRAG、Search-R1（端到端 RL，相比 Search-o1 平均提升 20.2）、WebResearcher（数据引擎 + 迭代研究 + Agentic RL 三位一体）。</p>\n<p><img alt=\"\" src=\"https://picx.zhimg.com/v2-f0a780e481b26fc5deffaa7ad324ba6d_1440w.jpg\" /><img alt=\"\" src=\"https://picx.zhimg.com/v2-9cd0669d0d77b61b28500424b5ea8a55_1440w.jpg\" /><img alt=\"\" src=\"https://pic3.zhimg.com/v2-315fa9680d995b19979acf0d07fe54d2_1440w.jpg\" /></p>\n<p>GUI 场景：Agent S3 通过多次并行探索与 bBoN 推理时扩展提升复杂 GUI 任务成功率，超过人类水平。</p>\n<p><img alt=\"\" src=\"https://pic4.zhimg.com/v2-b54cdbe527038577590a148c9e1367ef_1440w.jpg\" /><img alt=\"\" src=\"https://pic4.zhimg.com/v2-062b2f1011781a8cd3c9c0f7186ac701_1440w.jpg\" /></p>\n<p>Coding 场景：Claude Code、Codex、Kimi Code、Trae Agent，以及 SWE-RL、SWE-smith 等数据/训练范式。</p>\n<p><img alt=\"\" src=\"https://picx.zhimg.com/v2-c58a9dcc55c605aa05ea8c26fceff7e5_1440w.jpg\" /></p>\n<h2><strong>03记忆管理（Memory）：从“更长上下文”到“长期学习闭环”</strong></h2>\n<p>如果说工具决定 Agent 的行动边界，那么记忆决定 Agent 的成长能力。报告指出，记忆管理面临四大挑战：高冗余、易冲突、难组织、难融入推理。</p>\n<p><img alt=\"\" src=\"https://pic4.zhimg.com/v2-989985c6bd057aa54fc279fb88cfecd9_1440w.jpg\" /></p>\n<p>记忆系统的三大关键趋势：</p>\n<p><img alt=\"\" src=\"https://picx.zhimg.com/v2-c205fbffafc2404ae85c6802690bcf4b_1440w.jpg\" /></p>\n<p>报告对每个代表性工作进行了精细剖析：</p>\n<p>Mem0 2.0：单次抽取 + ADD-only 存储 + 混合检索 + 实体链接，让记忆系统具备时序演化与可追溯性。</p>\n<p><img alt=\"\" src=\"https://pic1.zhimg.com/v2-cb40c9cb731d99c1eb2cd899f2d6fbb8_1440w.jpg\" /></p>\n<p>LightMem（浙大, ICLR 2026）：感知压缩 + 主题聚合 + Sleep-time 离线长期更新。在 LoCoMo 上将在线 token 消耗从 1693k 压缩到 80k，复杂度与调用频率显著低于传统系统。</p>\n<p><img alt=\"\" src=\"https://picx.zhimg.com/v2-6a8fcd566d712ff3313d14e35620dae7_1440w.jpg\" /></p>\n<p>Memory-R1（LMU Munich）：用 GRPO 训练 LLM 主动管理显式记忆，让模型自主决策 ADD / UPDATE / DELETE / NOOP，超越传统存储式框架。</p>\n<p><img alt=\"\" src=\"https://picx.zhimg.com/v2-c9f5428961565597e8f1f5a04bf16541_1440w.jpg\" /></p>\n<p>M3-Agent（ByteDance Seed, ICLR 2026）：把长期记忆扩展到视觉、听觉与事件，构建实体中心多模态图谱，并通过 RL 控制多模态记忆的检索与推理。</p>\n<p><img alt=\"\" src=\"https://picx.zhimg.com/v2-36e16a60ac04b9a9da68507ed14111fb_1440w.jpg\" /></p>\n<p>Hierarchical Memories（Apple）&amp; MLP Memory（SJTU）：参数化记忆——通过梯度优化将知识编码进可训练的参数化记忆单元，从依赖外部文本检索的“不可学习”知识库，走向“内化检索”。</p>\n<p><img alt=\"\" src=\"https://pic4.zhimg.com/v2-5900731b7d9cc2061375e436eebc4869_1440w.jpg\" /></p>\n<p>MemGen（NUS, ICLR 2026）：隐式记忆（Latent Memory）不再把历史经验写成可读文本，而是表示成模型内部可直接使用的记忆向量，兼具“经验内化”与“动态调用”两方面优势。</p>\n<p><img alt=\"\" src=\"https://pica.zhimg.com/v2-3f4659308e53813da21a7df7d1a6bf62_1440w.jpg\" /></p>\n<p><strong>MemoraX AI：归因驱动的持续自进化记忆系统</strong></p>\n<p>作为 2026 年记忆方向的代表性工作之一，报告系统介绍了 MemoraX AI 的三点核心创新：</p>\n<ol>\n<li>可学习的记忆序列决策建模——将 Write / Update / Retrieve / Harness 统一建模为可优化的决策过程；</li>\n<li>反馈驱动的自演进学习机制——通过“评测—归因—优化—积累”闭环，让系统在使用中持续进化；</li>\n<li>分布感知的归因机制——把端到端错误拆解到具体记忆层（写入 / 检索 / 利用），并在分布视角下分析收益与风险。</li>\n</ol>\n<p><strong>Memory 的未来不只是“更长的上下文窗口”和“把历史存进向量库”，而是围绕写入、组织、检索、使用和反馈形成的长期学习闭环。</strong></p>\n<p><img alt=\"\" src=\"https://pic1.zhimg.com/v2-1afc3d5311b0281a18ce577c312bf646_1440w.jpg\" /></p>\n<p>评测：校准记忆系统的真实能力边界</p>\n<p>报告还介绍了一组面向“真实记忆能力”的评测基准——南京大学联合上海AI LAB发布的LoCoMo-Refined、MemoraX AI 联合牛津大学发布的ScriptMem和SWE Context Bench，分别从对话记忆评测校准、真实剧本复杂记忆链、代码场景经验复用三个维度，重新刻画记忆系统的真实能力边界。</p>\n<p><img alt=\"\" src=\"https://picx.zhimg.com/v2-692da3bca4b06bb7d68ffc4981ffe027_1440w.jpg\" /></p>\n<p>在三大基准上，MemoraX AI 均显著领先：</p>\n<ul>\n<li>LoCoMo-Refined：MemoraX 82.65，领先第二名 MemOS（63.60）近 20 分；</li>\n<li>ScriptMem：MemoraX 整体 60.3，超过第二名 40%，在用户画像、事件、时序演化、社会关系、精细化数据、经验教训六大维度全面领先；</li>\n<li>SWE Context Bench：MemoraX 35.35%，领先最强 baseline +5.05pp。</li>\n</ul>\n<p><img alt=\"\" src=\"https://picx.zhimg.com/v2-68b1a4b66d51bec4aa49f072fc2b5823_1440w.jpg\" /></p>\n<p><strong>长期记忆的价值不只是“记住事实”，而是能否在新任务中低成本、可验证地复用历史经验，并带来任务成功率与效率提升。</strong></p>\n<h2><strong>04安全（Safety）：从“识别恶意提示”到“约束长期行为”</strong></h2>\n<p>智能体越来越强大、自主、普及，但也带来了新的攻击面。报告统计：60%+ 的组织计划在 2025 年部署 Agent 系统，但 50% 的企业对其安全性表示担忧，多达 35% 的真实任务中观察到至少一种安全问题。</p>\n<p><img alt=\"\" src=\"https://pic3.zhimg.com/v2-1bcac206f4d839206e50a7e0297e9fb4_1440w.jpg\" /></p>\n<p>四大攻击面：</p>\n<ul>\n<li>提示注入（直接/间接）——已从人工编写走向自动化、规模化生成；</li>\n<li>工具篡改与恶意调用——从“工具优先级篡改”，进一步发展为“工具调用链操控”；</li>\n<li>记忆污染与上下文压缩——MINJA（NeurIPS 2025）证明仅通过多轮对话即可注入有害记忆；记忆压缩本身也可能导致指令意图丢失；</li>\n<li>跨链路风险——攻击面从输入扩展到工具、记忆、外部数据全链路。</li>\n</ul>\n<p><img alt=\"\" src=\"https://pica.zhimg.com/v2-b33855e45f20ef1d0cb3437f2173ea0a_1440w.jpg\" /><img alt=\"\" src=\"https://pic1.zhimg.com/v2-e7b218f359ea8786eb6c3c6c9157bca2_1440w.jpg\" /></p>\n<p>多层次纵深防御：</p>\n<ul>\n<li>输入侧：Task Shield（ACL 2025）通过指令抽取与对齐检查，阻止间接注入；</li>\n<li>记忆侧：A-MemGuard（arXiv 2025）通过双记忆结构与一致性校验，避免恶意信息长期沉淀；</li>\n<li>工具侧：IPIGUARD（EMNLP 2025）通过工具依赖图，约束 Agent 沿合法路径执行。</li>\n</ul>\n<p><img alt=\"\" src=\"https://pic1.zhimg.com/v2-81b77f9474e2582da78e7c292a5182a6_1440w.jpg\" /></p>\n<p><strong>智能体安全难题已从“识别恶意提示”，转向“在真实环境中约束智能体的长期行为”。</strong></p>\n<h2><strong>05应用：Agent 正在五大场景走向真实落地</strong></h2>\n<p>报告以五个真实场景，展示了大模型智能体的落地路径：</p>\n<p>个人陪伴：Tolan、Character.AI、Friend、Nomi 快速增长（2025年7月全球消费者支出达 2.21 亿美元）。记忆是关键支撑，也是当前瓶颈——长期关系记忆、人格一致性、多模态生活上下文、隐私边界。</p>\n<p><img alt=\"\" src=\"https://picx.zhimg.com/v2-df1af374a0dbe56c3df1ed61597bcef7_1440w.jpg\" /></p>\n<p>办公场景：Excel Copilot、NotebookLM、Outlook Copilot、飞书妙记，覆盖表格分析、文档知识库、邮件日程、会议纪要。</p>\n<p><img alt=\"\" src=\"https://pic3.zhimg.com/v2-8293b5668d663491f279bdbd9f8c9f02_1440w.jpg\" /></p>\n<p>医疗能源：DeepRare（Nature 2026，全球首个智能体式罕见病循证推理系统，已服务 600+ 医疗机构）、CellAgent（ICLR 2026，单细胞分析多智能体）、BatteryAgent（电池故障诊断）。</p>\n<p><img alt=\"\" src=\"https://pica.zhimg.com/v2-1b946f2ec55e89ee00af6c31ebf07a6e_1440w.jpg\" /></p>\n<p>科学研究：The AI Scientist（Nature 2026，Idea→Code→Experiment→Figure→Paper→Review 全流程，单篇成本低于 15 美元，AI 生成论文通过顶会 workshop 第一轮同行评审）、EvoScientist（Researcher / Engineer / Evolution Manager 三类 Agent + Ideation Memory + Experimentation Memory）。</p>\n<p><img alt=\"\" src=\"https://pic1.zhimg.com/v2-f5cc8124f130df8e67543e1cfadf0450_1440w.jpg\" /></p>\n<p>️网络安全：Google Big Sleep 与 Claude Mythos 已开始用于真实漏洞挖掘——Mythos Preview 在 Firefox JS shell exploit 任务中成功利用率达 72.4%，远超通用模型的 4.4%。</p>\n<p><img alt=\"\" src=\"https://pic1.zhimg.com/v2-ee6c1a0b04e39e9f7f1c32f8d752020e_1440w.jpg\" /></p>\n<h2><strong>06总结：Agent 的真正价值</strong></h2>\n<p>报告以一段清晰的判断收尾：</p>\n<p>工具让 Agent 连接真实环境，从回答问题走向执行任务——从“会不会调用工具”，转向“能否在长程、不确定、可反馈的真实环境中学习稳定的行动策略”。</p>\n<p>记忆让 Agent 从一次性助手变成个性化长期协作者——从“存什么、怎么检索”，转向“如何把长期交互转化为可更新、可迁移、可归因、可进化的记忆”。</p>\n<p>安全决定 Agent 能否真正进入生产环境——关键在于如何在不牺牲自主性的前提下，实现最小权限、运行时监控、可审计记忆与可验证执行。</p>\n<p>Agent 的真正价值，不在于单次生成能力，而在于能否在真实任务中持续调用工具、沉淀经验，并在安全边界内完成长期协作。</p>\n<p><strong>这既是对过去一年研究进展的系统性回望，也是对 Agent 技术下一站的明确指引——让大模型不仅“会想会答”，更要“会想、会学、会记”。</strong></p>\n<hr />\n<p><strong>欢迎添加微信进群交流：</strong></p>\n<p>https://u.wechat.com/EMgEOdY2156lwgo-y5rX5ko?s=2 (二维码自动识别)</p>\n<hr />\n<p><strong>关于报告人</strong></p>\n<p><img alt=\"\" src=\"https://pic2.zhimg.com/v2-ba5c7fea182d3cb0f36e56b40fae1ae7_1440w.jpg\" /></p>\n<p>（图源：VALSE 2026）</p>\n<p>郝建业，MemoraX AI创始人，天津大学菁英教授、博士生导师。国家优秀青年科学基金获得者，全球前2%科学家。</p>\n<p>曾先后任华为决策与推理实验室主任、大模型算法实验室主任、医疗军团技术副总裁，负责华为公司决策智能方向技术创新和产业落地，从0到1孵化多个重量级产业项目。</p>"
    }
  ],
  "latest_overview": [
    {
      "title": "",
      "body_html": "<h1>Agent核心技术概念与范式演变</h1>\n<ul>\n<li>来源平台: <strong>zhihu</strong>（知乎专栏文章）</li>\n<li>原文链接: <a href=\"https://zhuanlan.zhihu.com/p/2046948952411477633\">https://zhuanlan.zhihu.com/p/2046948952411477633</a></li>\n<li>作者: 寒江孤影</li>\n</ul>\n<hr />\n<p>Agent核心技术概念与范式演变</p>\n<h1>Agent核心技术概念与范式演变</h1>\n<p>作者: 寒江孤影, 赞: 1</p>\n<p>——————————记录agent计算范式背后的演化逻辑————————</p>\n<h2>一、前言</h2>\n<p>如果搞不清楚 Agent 技术范式背后的演化逻辑，很容易陷入“为了升级新架构而升级架构”或者“盲目追求最新技术概念”的误区。本文旨在结合最新的行业实践和技术趋势，以及我个人对 Agent 的长期理解，详细拆解 Agent 的演化范式，希望能帮助大家在纷繁复杂的技术浪潮中，理清思路，找到最适合特定场景的技术选型。</p>\n<h2>二、从被动响应到自进化：Agent 发展的四个阶段</h2>\n<p>回顾 2023~2026 这三年的时间，Agent 的技术形态并非线性平滑过渡，而是经历了四个我认为比较有<strong>显著特征</strong>的<strong>“四个阶段”</strong>。理解这四个阶段的演进过程，有助于我们看清当前技术选型的底层脉络。</p>\n<p><img alt=\"\" src=\"https://pic3.zhimg.com/v2-75c76bb76123b5bf7647fe72df1df790_1440w.jpg\" /></p>\n<h3>2.1 <strong>阶段一：</strong>早期被动式 ReAct Agent（2023，启蒙期）</h3>\n<p>2023年是LLM爆发的元年，也可以说是 Agent 概念的<strong>启蒙期</strong>。这一阶段的代表性理论源自 Lilian Weng 的那篇著名博客《LLM Powered Autonomous Agents》，它定义了基于大模型的 Agent 基本架构：<strong>LLM + Planning + Tools + Memory</strong>，给出了当时早期 Agent 比较理想的模型。</p>\n<ul>\n<li>理论基础：LLM + Planning + Tools + Memory（LLM + 规划 + 工具 + 记忆 ）经典架构，代表博客《LLM Powered Autonomous Agents》</li>\n<li>代表项目：AgentGPT、AutoGen、MetaGPT</li>\n<li>核心特征：被动响应，遵循“Reasoning → Observe → Response <strong>推理→观察→回复</strong>单步链路</li>\n<li>局限：依赖用户明确指令，仅能完成短链路简单任务；无长期规划，长任务易中断、偏离。</li>\n</ul>\n<h3><code>Reasoning → Observe → Response</code> 是什么？</h3>\n<p>这是对早期 Agent 执行<strong>单个任务步骤</strong>时内部逻辑的详细拆解。我们可以把它想象成一个简单的三步走流程：</p>\n<h3>第一步：Reasoning（推理/思考）</h3>\n<ul>\n<li><strong>发生了什么</strong>：Agent 接收到你的指令（比如“帮我查一下今天的天气”）。</li>\n<li><strong>内心活动</strong>：它会进行短暂的“思考”（实际上是模型的计算），决定为了完成这个指令，它需要调用哪个工具。比如它“想”：“我要查天气，我需要调用‘天气API’这个工具。”</li>\n</ul>\n<h3>第二步：Observe（观察/执行）</h3>\n<ul>\n<li><strong>发生了什么</strong>：Agent 执行了第一步“想”出来的动作。</li>\n<li><strong>具体行为</strong>：它调用工具（比如调用天气API），并<strong>观察</strong>工具返回的结果。比如它看到了API返回了“上海，晴，26度”。</li>\n</ul>\n<h3>第三步：Response（回应/反馈）</h3>\n<ul>\n<li><strong>发生了什么</strong>：Agent 把第二步看到的结果，原封不动或者稍作整理后，反馈给你。</li>\n<li><strong>具体行为</strong>：它对你说：“主人，今天上海是晴天，26度。”</li>\n</ul>\n<p>为什么说它是「理想方式」</p>\n<ol>\n<li><strong>理念足够通用、优雅</strong><br />\n    不做人工硬编码流程，完全交给模型自主思考 + 行动，一套逻辑适配所有场景，是学界 / 开发者心中 ** 最接近 “通用智能”** 的形态，属于理想范式。</li>\n</ol>\n<p>没有人工约束，面对企业复杂流程、标准化工作，结果不可控、不可复现。</p>\n<h3>2.2 工作流 Workflow Agent（2024，工程化控稳）</h3>\n<ul>\n<li>诞生背景：纯模型驱动稳定性不足，ToB 业务追求确定性</li>\n<li>代表框架：LangGraph、Dify</li>\n<li>核心思路：<strong>工程约束弥补模型不确定性</strong>，刚性流程编排</li>\n<li>特点：固定流水线 / 状态机，牺牲灵活性换取高可控、可解释；适配标准化、重复性企业工作，至今仍是高性价比落地方案</li>\n</ul>\n<p>（1）纯靠 ReAct 这种“理想方式”解决不了复杂问题的情况下，<strong>Agentic Workflow</strong> 成为了主流，。这一阶段的核心理念是：<strong>用工程化的约束来弥补模型的不确定性。</strong>像 LangGraph、Dify 等都提供Workflow的流程编排。</p>\n<p>（2）与早期 Agent 阶段的纯模型驱动不同，Workflow Agent 引入了大量的硬约束和流程编排，我觉得这也可以理解为早期的 Harness （驾驭工程里的“约束”）吧，虽然当时没有这个概念，但所做事情的目标本质是一样的。这个阶段的 Agent 主要是如下几个特点：</p>\n<p><strong>架构特征</strong>：要么是整个大框架是一个固定的 Workflow，<strong>关键节点嵌入 LLM</strong>；要么是 LLM 作为中枢，调用预定义好的子 <strong>Workflow</strong>。是一套比较重的 Harness，虽然牺牲了一定的灵活性，但换来了极高的可控性和可解释性。</p>\n<p><strong>应用场景</strong>：Workflow 在 to B 领域极受欢迎。因为很多<strong>企业服务</strong>或<strong>日常重复性工作</strong>，并不需要真正的“智能决策”，只需要按照步骤 1、2、3 按时、按量、保质地完成即可。</p>\n<p><strong>价值体现</strong>：对于<strong>非长尾、非极度复杂</strong>的场景，Workflow Agent 依然是目前性价比最高、落地最稳定的方案。时至今日，仍有大量企业在使用这种形态，因为它能确保效果的下限。</p>\n<h3>2.3 自主 Agent（2025，自主执行）</h3>\n<ul>\n<li>代表产品：Manus、Claude Code、Codex、OpenClaw</li>\n<li>核心能力：具备<strong>复杂任务规划</strong>，可自主拆解需求、规划路径、多轮迭代</li>\n<li>能力升级：支持长程企业级任务运行；搭配自检机制，长流程中自主纠错；角色从 “辅助工具” 转为 “独立执行者”。</li>\n</ul>\n<p>2025年是 Agent 迈向<strong>“自主性”的关键转折点</strong>。先是以 Manus 为代表的通用 Agent的火爆，以及 Claude Code、Codex 等 AI Coding Agent 的出现等等，标志着 Agent 能力再一次质的飞跃。随后在2026年初火爆的 OpenClaw 等框架，继续扩大了受众群体，进一步巩固了这一技术趋势。</p>\n<p>这一阶段的 Agent 可以被称为“自主 Agent”（Autonomous Agent），主要特征如下：</p>\n<p><strong>核心变化</strong>：它不再满足于快速调用几个工具后给出结论，而是具备了复杂的 <strong>Planning（规划）</strong> 能力。面对用户模糊或宏大的需求，它能自行拆解任务、规划路径、调用工具，并进行多轮迭代。</p>\n<p><strong>长程任务能力</strong>：只要用户清晰描述需求，并设定好<strong>开发规范（Specs）</strong>，Agent 就可以连续运行很长时间，自主处理企业级的项目代码或复杂业务流程。</p>\n<p><strong>自我校验</strong>：配合<strong>轻量级的 Harness</strong>或<strong>自我校验机制</strong>，模型能够在长程运行中不断修正错误，最终交付高质量的结果。这是从“辅助者”向“执行者”角色的根本转变。</p>\n<h3>2.4：自进化 Agent（2026，持续成长）</h3>\n<ul>\n<li>代表框架：Hermes Agent、LLM-Wiki</li>\n<li>核心突破：解决静态模型与动态业务的矛盾，实现<strong>经验沉淀、自我升级</strong></li>\n<li>运行机制：依托记忆、反思、反馈循环沉淀知识与技能；自动优化提示词、工具策略，甚至微调模型</li>\n<li>价值：Agent 从一次性工具变为可长期积累的数字资产。</li>\n</ul>\n<p>随着2026年 Hernes Agent 等新一代框架的兴起，再配合上 LLM-Wiki 等这些开源项目，Agent 可以自我沉淀Skill、自我沉淀知识库，甚至可以通过 RL 训练来提升模型能力，让 Agent 的发展进入了<strong>“自进化”（Self-Evolving）</strong>的新阶段。</p>\n<p>这一阶段的核心本质，是开始解决“静态模型”与“动态世界”之间的矛盾。</p>\n<p><strong>机制原理</strong>：Agent 不仅仅是在完成任务，更是在完成任务的过程中<strong>沉淀经验</strong>。通过记忆模块、反馈循环和自我反思机制，Agent 能够将从前一次任务中获得的教训转化为新的知识或策略。</p>\n<p><strong>最终目标</strong>：实现<strong>“越用越好用”</strong>。Agent 能够根据历史交互数据，自动优化自身的提示词、工具选择策略甚至微调局部模型参数，实现自我升级和进化。</p>\n<p><strong>意义</strong>：这标志着 Agent 从“一次性消耗品”变成了<strong>“可积累资产”</strong>，为构建真正具备长期生命力的数字员工奠定了基础。</p>\n<p>从最早期的 ReAct Agent，到结构化 Workflow Agent，再到后面可以自主规划长程任务的Agent，直至2026年开始出现的自进化 Agent，Agent 的范式演化清晰地展示了一条从“简单交互”到“复杂执行”，再到“智能成长”的技术进阶之路。需要注意的是，这四个阶段并非完全的替代关系，而是<strong>并存且互补</strong>的。在实际落地中，我们需要根据业务的复杂度、对稳定性的要求以及成本预算，选择合适的 Agent 范式，或者将多种范式组合使用。接下来，我们将从更深入的技术概念的角度，来展开介绍核心技术的前后演进变化。</p>\n<h2>三、六大核心技术模块演进（核心变化 + 动因 + 落地形态）</h2>\n<p>现如今，创建一个哪怕是最轻量级的 Agent，除了最关键的 Agent Loop，还会涉及到Prompt、Planning、Memory、Tools、Workflow、Environment等各个方面，今天我就以这六个最核心的技术维度，展开来介绍这些概念和实现都<strong>发生了哪些变化，以及为什么会发生这些变化？</strong></p>\n<p><strong>0. Agent Loop（智能体循环）</strong></p>\n<p>Agent 最核心的<strong>运行主循环</strong>，也是所有 Agent 的底层骨架。</p>\n<p>固定流程：<strong>接收指令 → 思考规划 → 调用工具 / 执行动作 → 记录记忆 / 观察结果 → 回到起点继续循环</strong>。</p>\n<ol>\n<li><strong>Prompt（提示词）</strong><br />\n    写给大模型的指令、人设、规则、要求，用来引导模型行为。</li>\n<li><strong>Planning（规划）</strong><br />\n    Agent 对复杂任务<strong>拆解步骤、制定执行方案</strong>的能力。</li>\n<li><strong>Memory（记忆）</strong><br />\n    存储对话历史、过往经验、业务知识、用户偏好等数据，分短期 / 长期记忆。</li>\n<li><strong>Tools（工具）</strong><br />\n    Agent 能调用的外部能力：搜索、计算、文件操作、接口、命令行、脚本等。</li>\n<li><strong>Workflow（工作流）</strong><br />\n    人工提前编排好的<strong>固定执行流程 / 步骤流水线</strong>，用来约束 Agent、保证稳定。</li>\n<li><strong>Environment（运行环境）</strong><br />\n    Agent 运行的载体、工作空间、沙箱 / 本地环境，负责文件读写、状态隔离、权限管理。</li>\n</ol>\n<h3>3.1 Prompt：深耦合单体 → 动静分离 + 渐进式加载</h3>\n<ul>\n<li>旧模式：单任务对应独立大段系统提示词，人设、规则、示例全部耦合，维护混乱、成本高。</li>\n<li>\n<p>新模式：</p>\n</li>\n<li>\n<p>固化通用底层系统指令，保持稳定；</p>\n</li>\n<li>动态内容（技能、人设、领域规则）拆分为独立 Markdown 文件（SKILL.md、USER.md 等）；</li>\n<li>\n<p>任务执行时<strong>渐进式加载</strong>外部文件，实现模块化管理</p>\n</li>\n<li>\n<p>优势：解耦易维护，场景适配更灵活。</p>\n</li>\n</ul>\n<p><img alt=\"\" src=\"https://pic4.zhimg.com/v2-1dd0d03856ffed31c560d9c6b85ffa23_1440w.jpg\" /></p>\n<p>回想早期构建 Agent 的阶段，我们绝大部分的精力都耗费在撰写 Prompt 上。当时为了解决特定领域或独立场景的问题，我们的做法往往是“<strong>一个任务创建一个Agent</strong>”。比如，为了完成一篇高质量的文章，我们会拆解出多个 Agent：一个负责撰写初稿的“写作 Agent”，一个负责润色优化的“编辑 Agent”，还有一个负责生成配图的“绘图 Agent”等等。每个 Agent 的背后，都对应着一段精心调试、独立存在的System Prompt，这个 Prompt 里需要包括Agent的人设、任务目标、任务要求、约束条件、注意事项、各种示例等等。这种模式下，Prompt Engineering 几乎等同于针对每个任务单独写一段“小作文”，不仅维护成本极高，而且随着场景增多，Prompt 的管理变得极其混乱。</p>\n<p>但随着实践的深入，我们发现这种将<strong>“系统级指令”</strong>与<strong>“任务要求&amp;细节”</strong>紧耦合的方式存在明显的瓶颈。于是，在 Agent 近期的技术演进中，出现了许多 System Prompt 层面的<strong>“解耦策略”</strong>。核心思路是：<strong>尽量固化System Prompt，将动态的、具体的任务要求剥离出来</strong>。所以，现在的 Agent 系统的 System Prompt，基本上只保留最底层、最通用的系统级指令和基本行为规范，所需要的一些工具信息、Skill使用方式，基本保留的都是比较“固定”的部分，不太容易变化，使其保持极度的“稳定”。而原本堆积在System Prompt中的大量具体的、细节的，比如<strong>任务要求、领域知识、人设规范</strong>等<strong>“动态内容”</strong>，则被拆解并存储到了外部的文件系统中，然后通过<strong>渐进式披露（Progressive Disclosure）</strong>的方式来进行读取和加载。</p>\n<p>具体来说，Prompt的动态性主要分为两个方向：</p>\n<p>●<strong>Skill层面的沉淀</strong>：我们将执行某项具体任务的方法论、步骤要求、领域约束等，沉淀为独立的Markdown文件，比如 SKILL.md 等。这些文件构成了Agent的“技能库”或者“要求库”，Agent在执行特定任务时，会动态的渐进式披露加载对应的Skill中的Markdown文件，从而获取具体的操作指南。</p>\n<p><strong>配置文件存储</strong>：对于人设定义、用户偏好、搜索规则等通用规范，我们将其存储在类似 USER.md、<code>SOUL.md</code> 或 <code>CLAUDE.md</code>、<code>AGENTS.md</code>这样的配置文件中。同样通过渐进式加载文件系统的方式，实现了对Prompt内容的模块化管理。</p>\n<p>这种从“单体大System Prompt”到“System Prompt + 渐进式加载上下文文件”的转变，主要是“<strong>上下文的组织形式发生了变化</strong>”，这样做让 System Prompt 变得更加纯粹和稳定，而将易变的业务逻辑和领域知识通过结构化的 Markdown 文件进行灵活挂载。这不仅降低了维护复杂度，也让Agent在面对不同场景时，能够更灵活地组合所需的上下文信息，实现了真正的“动静分离”。</p>\n<p><strong><em>###上面讲的太好了，我们实际看一个例子，就更加明白了</em></strong></p>\n<p>我给你<strong>用最直观、最落地、一看就懂</strong>的方式讲清楚：<br />\n<strong>什么是 System Prompt（固定不变）</strong><br />\n<strong>什么是 Skill（随任务变化）</strong></p>\n<p>我会先给你<strong>早期耦合在一起的大 Prompt</strong>，<br />\n 再把它<strong>拆成干净的 System Prompt + Skill.md</strong>，<br />\n 你马上就明白区别！</p>\n<p>一、先看：早期耦合版 Prompt（全部揉在一起）</p>\n<p>这是你文章里说的 **“单体大 Prompt、小作文模式”**：</p>\n<pre><code>你是一名专业的文章写作助手。\n你的任务是帮助用户完成高质量的文章创作。\n你需要先理解用户需求，然后生成结构清晰、语言流畅、逻辑严谨的文章。\n写作步骤：\n1. 先分析主题\n2. 列出大纲\n3. 撰写正文\n4. 润色语言\n5. 检查错别字\n约束条件：\n- 不能使用夸张表述\n- 语言正式\n- 段落分明\n- 字数控制在800-1200字\n你必须严格按照步骤执行，不能跳过任何环节。\n现在，请根据用户输入的主题，完成一篇完整的文章。\n</code></pre>\n<p>问题：</p>\n<p>所有东西都揉在一起，<strong>既是系统规则，又是写作技能</strong>。<br />\n 改一点点就要重写整个 Prompt，维护爆炸。</p>\n<p>二、现在的架构：拆成 2 部分</p>\n<p>1）<strong>System Prompt（底层规则 → 永远不变）</strong></p>\n<p>这是 Agent 的<strong>底层性格、底层行为、底层约束</strong>。<br />\n 不管写什么文章、做什么任务，<strong>永远不变</strong>。</p>\n<pre><code>你是一个专业、严谨、按步骤执行的智能助手。\n你遵循指令，不擅自发挥。\n你会根据加载的技能文件执行对应任务。\n你保持输出格式规范、逻辑清晰、语言正式。\n你不会编造信息，不会违反约束。\n</code></pre>\n<p>特点：通用、稳定、不随任务变化、不包含具体业务步骤</p>\n<p>2）<strong>Skill.md（写作技能 → 随任务切换）</strong></p>\n<p>这是<strong>具体任务的方法、步骤、规则</strong>，<br />\n 属于动态加载的技能。</p>\n<p><code>SKILL_文章写作.md</code></p>\n<p>markdown</p>\n<pre><code># 技能：文章写作\n## 执行步骤\n1. 分析主题\n2. 生成文章大纲\n3. 撰写正文\n4. 语言润色\n5. 错误检查\n\n## 输出要求\n- 结构清晰\n- 段落分明\n- 字数 800~1200 字\n- 语言正式、不夸张\n</code></pre>\n<p>三、最关键的区别（你一定能看懂）</p>\n<p>✅ <strong>System Prompt = 你是谁 + 你遵守什么底层规则</strong></p>\n<p>（永远不变）</p>\n<ul>\n<li>我是助手</li>\n<li>我守规矩</li>\n<li>我按技能执行</li>\n<li>我不胡说</li>\n</ul>\n<p>✅ <strong>Skill = 这个任务怎么做</strong></p>\n<p>（随任务切换）</p>\n<ul>\n<li>写文章怎么做</li>\n<li>画图怎么做</li>\n<li>代码怎么做</li>\n<li>数据分析怎么做</li>\n</ul>\n<p>四、一句话总结你文章里的意思</p>\n<p><strong>早期：</strong><br />\n System + Skill 全部揉成一大段 Prompt → 维护难、混乱、改不动。</p>\n<p><strong>现在：</strong></p>\n<ul>\n<li><strong>System Prompt 固定不动</strong>（底层规则）</li>\n<li><strong>Skill 动态加载</strong>（任务方法）</li>\n<li>需要什么技能就读什么 <code>.md</code> 文件</li>\n<li>\n<p>实现<strong>动静分离</strong></p>\n</li>\n<li>\n<p><strong>System Prompt = 你的性格、原则、底线（一辈子不变）</strong></p>\n</li>\n<li><strong>Skill = 你今天要做的事的说明书（随任务变）</strong></li>\n</ul>\n<h3>3.2. Planning：简单思维链 → 复杂长程智能规划</h3>\n<ul>\n<li>旧模式：依赖 CoT 思维链，仅线性串行推理，复杂任务易逻辑断裂。</li>\n<li>新模式：依托大模型强推理能力，实现三大能力：复杂任务结构化拆解、长流程动态调优、动态调用子 Agent 协同作业。</li>\n<li>本质：从 “提示词技巧” 升级为智能决策中枢。</li>\n</ul>\n<p><img alt=\"\" src=\"https://pic1.zhimg.com/v2-38b14e8d76a643bbf5056abbf183aae8_1440w.jpg\" /></p>\n<p>还是回到早期 Agent 的理论基础，在 Lilian Weng 的《LLM Powered Autonomous Agents》一文中的 Planning 在刚提出的时候是一个非常新鲜的概念，这让很多人都坚信：一个真正<strong>会对任务做“Planning”的 Agent 才是真正意义上的 Agent</strong>。然而，在那个基础模型还不够强的时代，Planning 的实现还是相对比较朴素的，主要就是依赖大模型原生的思维链（CoT， Chain of Thought）能力，比如通过类似<strong>“Let's think step by step”</strong> 这样的提示词引导模型进行<strong>线性的、串行的逻辑推导</strong>。这种模式在处理简单任务时尚可应付，但在面对复杂场景时，往往显得力不从心，容易陷入逻辑断层或死循环。</p>\n<p>然而，随着基础模型推理能力的飞速迭代，尤其是在 Reasoning 能力的显著增强的今天，如今的 Planning 机制其实已经发生了质的飞跃。现在的 Agent 不再仅仅满足于单步的思考，而是具备了更高级的如下的能力：</p>\n<p>1.<strong>复杂问题的结构化分解</strong>：Agent 能够主动将一个宏大的、模糊的目标拆解为多个可执行的子任务（Sub-tasks），并生成结构化的 Todo List。</p>\n<p>2.<strong>多步协同与长程推理</strong>：基于生成的任务列表，Agent 能够按步骤有序执行，并在执行过程中动态调整计划。这种能力使得 Agent 能够处理具有极长上下文依赖的复杂任务，保持逻辑的一致性和连贯性。</p>\n<p>3.<strong>子 Agent 的动态构建</strong>：在更先进的架构中，Planning 甚至涉及到根据子任务的需求，动态实例化或调用特定的子 Agent 来专项解决某个环节的问题，实现了从“单体思考”到“协同作战”的转变。</p>\n<p>Planning 层面能够做到这样的演化的核心驱动力，归根结底在于“<strong>底层基座模型推理能力升级</strong>”所带来的。随着模型在逻辑推理、长文本理解以及复杂指令遵循上的表现越来越强，Agent 的 Planning 模块也从简单的“提示词技巧”演变成了真正的“智能决策中枢”，能够胜任更加复杂、长周期的自主任务规划。</p>\n<h3>3.3. Memory：纯向量检索 → 文件系统 + 向量检索混合架构</h3>\n<p>短期记忆</p>\n<ul>\n<li>变化：不再堆砌对话历史，通过<strong>阈值控制、摘要提炼、关键信息提取</strong>做记忆压缩，适配有限上下文窗口。</li>\n</ul>\n<p>长期记忆</p>\n<ol>\n<li>事项型记忆（行为 / 偏好 / 日志）：主流用 Markdown 文件存储，可读性、可控性更强；</li>\n<li>知识型记忆：个人场景偏向本地知识库（LLM-Wiki、笔记工具）；企业海量场景结合<strong>文件系统 + 轻量化向量检索</strong>，兼顾可解释性与召回精度。</li>\n</ol>\n<p>第三个关键的变化，我们来看下“记忆（Memory）”模块的演进上。在 Lilian Weng 早期的经典架构中，Memory 被划分为短期记忆（Short-term Memory）和长期记忆（Long-term Memory）。当时的定义相对直观：</p>\n<p>●<strong>短期记忆</strong>：主要指对话上下文，包括 System Prompt、历史对话中的 User 和 Assistant 回复等。</p>\n<p>●<strong>长期记忆</strong>：主要指外部知识库，通常通过 RAG 从向量数据库中检索相关的文档或知识片段，作为背景信息注入给大模型。</p>\n<p><img alt=\"\" src=\"https://picx.zhimg.com/v2-5d69b317158002844013f613dcd4509b_1440w.jpg\" /></p>\n<p><strong>短期记忆层面</strong>（Short-term Memory），核心挑战从“存储”转向了“管理”与“压缩”。由于 Context Window（上下文窗口）有限且成本敏感，为了保证长上下文下 Agent 的效果，以及高效利用有限的 token 就成为关键。从OpenClaw、Hermes这些最佳实践来看，上下文不再只是简单堆砌历史对话，而是引入了多种记忆压缩策略：</p>\n<p>●阈值控制：基于固定 token 数或动态语义密度阈值触发压缩。</p>\n<p>●结构化摘要：对中间过程的对话进行 Summary 提炼，同时保留头尾的关键指令和最终结论，确保核心意图不丢失。</p>\n<p>●重点提取：从冗长的对话流中提取关键事实或状态变化，剔除无关噪音。这些手段使得短期记忆更加精炼、高密度，显著提升了模型在长对话中的注意力集中度。</p>\n<p><strong>长期记忆层面（Long-term Memory）</strong>，变化相对更大，逐步在从“向量数据库主导”向“文件系统主导”回归的趋势，并细分为两个子方向：</p>\n<p>●<strong>事项型记忆（Episodic Memory）</strong>：针对用户偏好、历史行为、每日待办等动态变化的“事实”，越来越多的框架，比如 OpenClaw、Hermes Agent等就倾向于使用文件系统进行记录。例如，通过生成 MEMORY.md 或每日的Memory日志文件，以结构化的 Markdown 格式存储关键事件。这种方式比向量检索更可控、更易读，也便于 Agent 直接读取和理解时间序列上的状态变化。</p>\n<p>●<strong>知识型记忆（Semantic Memory）</strong>：随着 Karpathy 等提出的 LLM-Wiki、GBrain这类本地化知识库理念的普及，大模型在知识存储上也在发生变化。传统的纯 RAG 方案正在被更灵活的<strong>本地文件系统 + Obsidian 等笔记工具</strong>所补充甚至替代。通过这些文件系统知识工具，Agent 可以直接访问组织良好的 Markdown 知识库，非常适合个人知识库的构建使用。当然，如果是企业级的知识库，存储了海量知识的背景下，仅通过这类“文件系统即记忆”的模式，还是不太够的，只通过</p>\n<p><code>grep</code> 类的命令关键词检索，很容易不准确。因此，除了文件系统之外，还需要搭配 QMD 或者 SQLite 等轻量化的向量化检索机制，甚至更加高度复杂的场景还需要企业级的向量检索，才能不仅保留 RAG 的海量知识优势，还赋予了开发者通过目录结构、标签、链接来显式组织知识的能力，使得知识的召回更加精准和可解释。</p>\n<p>综上所述，Memory 的演进本质上是开始<strong>从纯向量文本检索走向“文件系统化的沉淀+向量检索混合管理”</strong>。无论是短期的对话压缩，还是长期的事项记录与知识沉淀，都在追求更高的记忆效果、可读性和效率的均衡。</p>\n<h3>3.4. Tools：Function Call 函数调用 → CLI + Script 脚本</h3>\n<p>旧模式：封装大量 API 函数，Schema 管理复杂、开发维护成本高；MCP 仅优化协议，未改变底层逻辑。</p>\n<ul>\n<li>\n<p>新模式：</p>\n</li>\n<li>\n<p>CLI 命令行：利用模型预训练原生知识，无需额外适配接口，支持自助查询帮助文档；</p>\n</li>\n<li>\n<p>Script 脚本：封装复杂逻辑、鉴权、API 调用，屏蔽底层细节，可打包为独立技能。</p>\n</li>\n<li>\n<p>核心转变：从 “人为适配模型” 变为 “利用模型原生能力”，轻量化、易扩展。</p>\n</li>\n</ul>\n<p><img alt=\"\" src=\"https://pic1.zhimg.com/v2-fa82796804406099875ae77b51935e26_1440w.jpg\" /></p>\n<p>第四个部分，也是我认为 Agent范式中变化最为大的一个部分，在于“工具（Tools）”执行方式的变化。</p>\n<p>回顾 Agent 发展的早期阶段，工具调用的主流范式是 <strong>Function Call</strong>。我们需要针对具体的业务场景，将系统能力封装成标准的 API，并注册为模型可调用的函数。这种方式虽然实现了模型与外部系统的连接，但存在一个显著的痛点：<strong>极高的开发与维护成本</strong>。现实中，大量的系统或数据源并没有现成的 API 可供调用，为了弥补这一缺口，团队往往需要投入大量精力去“补全”API，这不仅费时费力，而且随着工具数量的膨胀，API Schema 的管理变得极其复杂。随后出现的<strong>MCP（Model Context Protocol）</strong>虽然在协议层面优化了工具的注册与发现机制，实现了“一次注册，自动暴露”，但这本质上仍停留在接口标准化的层面，并未从根本上改变工具调用的底层逻辑。</p>\n<p>而真正的范式转移发生在两个关键维度的变化：<strong>CLI 命令行原生化与Script 脚本化</strong>。</p>\n<p>首先，<strong>CLI（命令行界面）</strong>，一种除了程序员之外，大部分人比较陌生的工具，在 Agent 时代再次焕新了它的生机。其实 CLI 这种枯燥的命令行和参数，对人类来讲并不是一种友好的交互方式，但对机器而言反而是足够友好的，从而演变成了 Agent 时代的“天然工具”。</p>\n<p>CLI的主要的特点如下：</p>\n<p>●<strong>零样本学习优势</strong>：对于人类用户，记忆 grep、<code>cat</code>、<code>vim</code> 等 Linux / Unix命令及其参数是高门槛的；但对于大模型而言，这些命令是其预训练数据中海量代码和技术文档的一部分，属于“<strong>先天知识</strong>”。这意味着，让模型通过 CLI操作文件系统或网络，无需额外定义复杂的 API Schema（名称、描述、参数类型等），只需指令其使用标准命令即可。这节省了巨大的 token 空间和调试成本。</p>\n<p><strong>可扩展性与自解释性</strong>：即使面对模型未曾见过的第三方 CLI 工具，只要遵循标准的 Linux/Unix 规范（如支持 --help），模型就能在运行时通过查询帮助文档，自主理解参数用法并执行调用。这种“按需查询、即时学习”的模式，完美契合了上下文工程的渐进式加载理念。</p>\n<p>●<strong>Skill 集成</strong>：新的第三方 CLI 工具可以通过 Skill 进行包装，在 Skill 的描述文件中提供安装指南和使用示例，使模型能够快速掌握新工具的使用。</p>\n<p>同时，在 <strong>Agent Skills 体系</strong>中，<strong>Resources 形态的 Script 脚本</strong>逐渐也成为工具承载的主流模式。无论是 Python 还是其他语言，具体的工具逻辑被封装为独立的脚本文件。这些脚本具有极强的灵活性：</p>\n<p>1.<strong>本地与远程的统一</strong>：它们既可以直接执行本地命令（如文件操作、环境配置），也可以内部封装对远程 API 的调用。</p>\n<p>2.<strong>协议的黑盒化</strong>：复杂的 API 鉴权、参数拼接等细节被隐藏在脚本内部，Agent 只需关注“调用哪个脚本”以及“传入什么核心参数”，极大地降低了模型理解的门槛。这也是为什么安装一个 Skill 往往就能赋予 Agent 处理复杂任务的能力——因为 Skill 不仅包含了 Prompt 指引，更内置了可执行的工具脚本。</p>\n<p>综上所述，从早期的 Function Call 到如今的 CLI + Script 模式，Tools 的演进核心是从“人为适配模型”转向“利用模型原生能力”。我们不再试图为每一个操作编写专用的 API 接口，而是充分利用模型在预训练阶段积累的通用计算机操作知识（CLI）和代码执行能力（Script），构建更加轻量、灵活且易于扩展的工具生态。</p>\n<h4>上面的解释太专业了 ，下面白话一些</h4>\n<p>早期 Agent 怎么调用工具 → 现在 Agent 怎么像<strong>真正的电脑操作者</strong>一样干活。</p>\n<p>先一句话讲懂核心</p>\n<p><strong>早期工具调用（Function Call）：人要给模型写好接口，模型才能用。</strong><br />\n<strong>现在工具调用（CLI / Script）：模型天生就会用电脑，直接敲命令、跑脚本。</strong></p>\n<p>一、先讲：早期 Function Call 有多麻烦？（你知识盲区的起点）</p>\n<p>早期 Agent 想做一件事，<strong>必须人提前给它写好 API 函数</strong>。</p>\n<p>例子：让 Agent 读一个文件</p>\n<p>早期必须<strong>开发者先写好一个函数</strong>，像这样：</p>\n<pre><code>@tool\ndef read_file(path: str):\n    with open(path, 'r', encoding='utf-8') as f:\n        return f.read()\n</code></pre>\n<p>问题：</p>\n<ol>\n<li><strong>每一个功能都要写代码封装</strong></li>\n<li><strong>每一个都要定义参数格式</strong></li>\n<li><strong>维护巨麻烦</strong></li>\n</ol>\n<p>这就是文章说的：<br />\n<strong>人为了适配模型，累死累活写 API → 这叫 “人适配模型”</strong></p>\n<p>二、现在的革命性变化：CLI 命令行（模型天生就会）</p>\n<p>大模型在训练时看过<strong>无数 Linux 命令</strong>，它<strong>天生就懂命令行</strong>！</p>\n<p>所以现在不用给模型写任何 API！</p>\n<p>想让模型读文件？<br />\n 直接让模型<strong>自己敲命令</strong></p>\n<p>cat test.txt</p>\n<p>重点来了：</p>\n<p><strong>模型不需要你教！不需要你封装 API！不需要定义 Schema！</strong><br />\n 它天生就会，就像人会用筷子一样。</p>\n<p>这就是文章说的：<br />\n<strong>零样本学习 → 模型先天就会 → 不用人适配</strong></p>\n<p>再讲：Script 脚本（把复杂操作藏起来）</p>\n<p>Script = 一个<code>.py</code>文件，模型直接跑。</p>\n<p>例子：</p>\n<p>你想让 Agent 每天自动发邮件<br />\n 不用写 API，不用定义 Schema<br />\n 直接写一个 <code>send_email.py</code></p>\n<pre><code># 复杂逻辑、鉴权、邮箱配置全都藏在这里\nimport smtplib\ndef send(to, content):\n    pass\n</code></pre>\n<p>Agent 只需要执行：</p>\n<p>python send_email.py \"to=xxx@qq.com\" \"content=你好\"</p>\n<p>好处：</p>\n<p>模型不用懂底层逻辑<br />\n<strong>只需要知道：运行这个脚本就行</strong></p>\n<p><strong>#####举个例子</strong></p>\n<p>场景：让 Agent 读取文件，查找 “AI” 关键词，保存结果</p>\n<p>方式 1：早期 Function Call（麻烦死）</p>\n<p>你必须写 3 个工具：</p>\n<ol>\n<li>read_file()</li>\n<li>search_keyword()</li>\n<li>save_file()</li>\n</ol>\n<p>每个工具都要：</p>\n<ul>\n<li>写代码</li>\n<li>定义参数</li>\n<li>注册给模型</li>\n<li>维护 Schema</li>\n</ul>\n<p><strong>人累死 → 模型才能用</strong></p>\n<p>方式 2：现在 CLI 命令行（模型直接干）</p>\n<p>模型直接自己敲 3 条命令：</p>\n<p>bash  </p>\n<p>运行  </p>\n<p>cat article.txt grep \"AI\" article.txt echo result &gt; result.txt</p>\n<p><strong>你什么都不用做！</strong><br />\n<strong>模型天生就会！</strong></p>\n<p>方式 3：现在 Script 脚本（更简单）</p>\n<p>你写一个脚本 <code>search_ai.py</code><br />\n 模型直接运行：</p>\n<p>bash  </p>\n<p>运行  </p>\n<p>python search_ai.py article.txt</p>\n<p>完事！</p>\n<p>五、文章核心结论（我给你翻成大白话）</p>\n<p>早期工具调用：<br />\n<strong>人要拼命给模型造工具 → 人适配模型</strong></p>\n<p>现在工具调用：<br />\n<strong>模型本来就会用电脑 → 直接敲命令、跑脚本 → 利用模型原生能力</strong></p>\n<p>这就是：<br />\n<strong>Function Call → CLI / Script 的巨大革命</strong></p>\n<p>最终总结（3 句秒懂）</p>\n<ol>\n<li><strong>Function Call = 模型必须理解内部结构（白盒，很累）</strong></li>\n<li><strong>Script = 模型只执行命令，内部全黑盒（轻松）</strong></li>\n<li><strong>不是写 1 个还是 3 个函数的区别，是模型要不要理解内部逻辑的区别！</strong></li>\n</ol>\n<h3>3.5. Workflow：刚性硬编码编排 → Skill+Workflow 混合架构</h3>\n<p>旧模式：固定流水线，机械执行，无法根据场景动态调整。</p>\n<ul>\n<li>\n<p>新模式：</p>\n</li>\n<li>\n<p>常规逻辑、可变流程封装为 Skill（文档 + 脚本），提升灵活性；</p>\n</li>\n<li>\n<p>高稳定性、强约束的主干流程保留传统 Workflow 兜底。</p>\n</li>\n<li>\n<p>落地策略：<strong>Skill 为主，Workflow 为辅</strong>，平衡灵活度与确定性。</p>\n</li>\n</ul>\n<p><img alt=\"\" src=\"https://picx.zhimg.com/v2-3e4421e5dcbaa541e76b92fc0de917f3_1440w.jpg\" /></p>\n<p>在 Agent 发展的早期阶段，由于基础大模型的指令遵循能力和逻辑稳定性相对较弱，我们往往依赖显式的、硬编码的 Workflow 来保障任务的执行。这种模式类似于传统的“<strong>状态机</strong>”或“<strong>流水线Pipline</strong>”，将复杂任务拆解为严格固定的“第一步、第二步、第三步”，强制模型按部就班地执行。这种方式虽然牺牲了灵活性，但在当时是确保 Agent 不“跑偏”、不掉链子的必要手段。</p>\n<p>然而，Workflow 也存在着很多的问题，比如运行过程非常“<strong>机械化</strong>”，无论Agent的外部环境发生了怎样的变化，Workflow 还仍然死板的严格遵循第一步、第二步...这样去运转，<strong>无法根据实际情况做出动态调整</strong>。但是，随着模型能力的不断跃升以及前文提到的 Agent Skills 体系的出现，Workflow 的形态正在发生深刻的重构：<strong>从“刚性的流程编排”转向“动态的 Skill 封装与混合架构”</strong>。主要分为两部分：</p>\n<p><strong>逻辑内聚化</strong>：原本分散在 Workflow 引擎中的步骤定义、约束条件、核心判断逻辑，现在可以直接写入 Skill 的 Markdown 描述文件（如 SKILL.md）中。模型通过阅读 Skills 的文档，即可理解任务的完整链路。</p>\n<p>●<strong>执行脚本化</strong>：对于需要精确控制的环节，不再依赖外部工作流引擎的状态跳转，而是通过 Skill 关联的 Resources 的 Script 脚本进行代码级的编排和控制。这意味着，一个复杂的业务流程，现在可以被打包成一个独立的、可复用的 Skills。</p>\n<p>这种转变带来了更大的灵活性和智能性，但也引入了新的挑战：可控性与稳定性的博弈。纯 Skill 驱动的模式赋予了 Agent 更高的自主性，但在面对极端复杂或容错率极低的场景时，模型仍可能出现理解偏差或执行跳跃，导致结果不可控。相比之下，传统的刚性 Workflow 虽然笨重，却提供了确定性的边界。</p>\n<p>因此，当前的 Agent 研发范式正处于一个<strong>新旧技术交叉融合的过渡期</strong>。在企业级落地实践中，我们很少非此即彼地选择某一种方案，而是倾向于采用<strong>混合架构</strong>：</p>\n<p>将成熟的、标准化的子任务封装为 <strong>Skills</strong>，通过Markdown文件来维护逻辑，利用其灵活性和易用性；</p>\n<p>●Workflow 里的固定运行部分其实是可以全部转换为Script的，但是代码的可读性，很多时候没有Workflow方便。因此，将关键的、对稳定性要求极高的主干流程仍然保留为 <strong>Workflow</strong>，或者将特定的 Workflow 封装为一个特殊的 <strong>Tool</strong> 供 Agent 调用也是一个现阶段比较好的办法。</p>\n<p>这种“Skill 为主，Workflow 为辅/兜底”的策略，既利用了新技术的红利，又保留了一定的确定性，是当前平衡开发效率与运行稳定性的最佳实践。</p>\n<p>我先用一句话把整段讲明白</p>\n<p><strong>早期 Workflow = 死板流水线（必须按步骤走）</strong><br />\n<strong>现在 Skill = 灵活说明书（模型自己看懂自己做）</strong><br />\n<strong>现在最佳方案 = 主干用 Workflow 兜底，细节用 Skill 灵活处理</strong></p>\n<h3>3.6. Environment：无状态调用 → 专属隔离运行时环境</h3>\n<ul>\n<li>旧模式：无独立运行环境，仅做简单工具调用，无状态管理。</li>\n<li>\n<p>新模式：标配专属工作空间，分两类：</p>\n</li>\n<li>\n<p>本地环境：灵活便捷，适配个人办公，需加强权限 / 二次确认；</p>\n</li>\n<li>沙箱 / 云容器（Docker/K8s）：企业主流，强隔离，规避安全与数据风险。</li>\n</ul>\n<p><img alt=\"\" src=\"https://pic4.zhimg.com/v2-f24c455aa776f7376e598a02fe38090d_1440w.jpg\" /></p>\n<p>早期的 Agent 对工具调用、子Agent调用都是无状态的，几乎不需要所谓的“<strong>运行环境</strong>”。但是，随着 Agent 能力的增强，特别是引入了文件系统操作、代码执行等能力后，它不再仅仅是一个“问答机器”，而是一个需要持久化存储、文件读写和状态管理的“数字员工”。这就意味着，Agent 必须拥有一个专属的 <strong>Workspace（工作空间）</strong>。在这个工作空间中，Agent 可以安全地读取配置、写入日志、生成中间文件，甚至管理其 Skill 和 Memory 数据。</p>\n<p>根据应用场景和安全要求的不同，这个 Runtime 环境主要呈现为两种形态：</p>\n<p>●<strong>本地个人电脑（Local Desktop）</strong>：有着极高的便利性和灵活性。Agent 可以直接操作用户本地的文件系统、应用和网络，实现诸如“整理桌面文件”、“自动化办公流程”等贴近个人生活的复杂任务，OpenClaw 最早就是基于个人电脑的操作而“火”起来的。但是，由于缺乏严格的隔离机制，Agent 的操作失误可能导致用户重要数据丢失或系统配置混乱。因此，在本地环境中，通常需要引入更严格的用户确认机制或权限控制。</p>\n<p><strong>沙箱环境（Sandbox/Cloud Server）</strong>：沙箱是企业级生产环境的主流选择。通过Docker、Kubernetes等容器化技术来构建隔离的沙箱，Agent 的所有操作被限制在特定的虚拟文件系统内。即使 Agent 执行了破坏性命令，也不会影响宿主机或其他服务。提供了必要的安全边界和资源管控，确保 Agent 在不可预测的行为下依然保持系统的整体稳定性。</p>\n<h2>总结</h2>\n<p>回顾全文，我们不难发现一个有趣的现象：从宏观架构上看，今天的 Agent 依然由 Prompt、Planning、Memory、Tools 等经典模块组成，这与 Lilian Weng 早期提出的理论框架并无二致。<strong>“形”未变，但“神”已大不同</strong>。这并不是简单的技术升级，而是一场深刻的<strong>内核重构</strong>。Agent 的研发范式变化中，<strong>Prompt</strong> 从单体的“小作文”演变为解耦的上下文工程；<strong>Planning</strong> 从线性的 CoT 思维链升级为复杂的长程任务拆解；<strong>Memory</strong> 从传统的前置向量检索转向文件系统化+向量检索的混合架构；<strong>Tools</strong> 从高成本的 API 封装回归到原生的 CLI 与脚本交互；<strong>Workflow</strong> 从刚性的外部编排内化为灵活的 Agent Skills 封装；<strong>Environment</strong> 从无状态的调用延伸为有状态的隔离运行时Runtime系统环境。</p>\n<p>每一个模块背后的运行逻辑、数据流转方式以及工程实现范式，都发生了翻天覆地的变化。我们不再仅仅依赖模型的“智商”去硬扛所有问题，而是通过更精细的工程化手段（如文件化解耦、CLI 原生利用、沙箱隔离等）来弥补模型的不足，放大模型的优势。这也说明 Agent 正在从“魔法调优”到“系统工程”的转变，标志着 Agent 技术正在走向成熟，同时，更是我们对“<strong>如何构建好的 Agent</strong>”这一认知过程的不断深化。虽然各个模块的具体实现方式仍在快速演进，但其核心目标始终未变：<strong>即在保证安全、可控的前提下，最大化释放模型的推理与执行潜力，让 Agent 真正成为能够解决复杂现实问题的得力助手。</strong></p>\n<p>对于每一位从事 Agent 应用和落地的同学们而言，理解这些演进背后的逻辑，比掌握具体的某个工具更为重要。因为Agent还在持续发展，<strong>模型会继续升级、工具会继续变化，框架会持续更新</strong>，但这种 “通过工程化手段构建确定性，以承载模型不确定性” 的核心思想，将是未来很长一段时间内构建高质量 Agent 的基石。</p>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//mp.weixin.qq.com/s/11Krmb5KYmCHDQ4zN9O4uQ\">https://mp.weixin.qq.com/s/11Krmb5KYmCHDQ4zN9O4uQ</a></p>"
    }
  ],
  "graph": {
    "nodes": [
      {
        "id": "zero_shot_planner",
        "x": 80,
        "y": 80,
        "category": "foundation"
      },
      {
        "id": "inner_monologue",
        "x": 170,
        "y": 80,
        "category": "foundation"
      },
      {
        "id": "react",
        "x": 240,
        "y": 170,
        "category": "reactive"
      },
      {
        "id": "reflexion",
        "x": 330,
        "y": 440,
        "category": "closed_loop"
      },
      {
        "id": "rap",
        "x": 380,
        "y": 260,
        "category": "search"
      },
      {
        "id": "adaplanner",
        "x": 430,
        "y": 440,
        "category": "closed_loop"
      },
      {
        "id": "rewoo",
        "x": 470,
        "y": 350,
        "category": "decomposition"
      },
      {
        "id": "llm_dp",
        "x": 560,
        "y": 350,
        "category": "decomposition"
      },
      {
        "id": "lats",
        "x": 650,
        "y": 260,
        "category": "search"
      },
      {
        "id": "adapt",
        "x": 730,
        "y": 350,
        "category": "decomposition"
      },
      {
        "id": "llm_compiler",
        "x": 810,
        "y": 350,
        "category": "decomposition"
      },
      {
        "id": "devils_advocate",
        "x": 860,
        "y": 440,
        "category": "closed_loop"
      },
      {
        "id": "wkm",
        "x": 920,
        "y": 260,
        "category": "search"
      },
      {
        "id": "system_1_x",
        "x": 1000,
        "y": 260,
        "category": "search"
      },
      {
        "id": "plan_and_act",
        "x": 1080,
        "y": 350,
        "category": "decomposition"
      },
      {
        "id": "preflect",
        "x": 1160,
        "y": 440,
        "category": "closed_loop"
      },
      {
        "id": "lwm_planner",
        "x": 1220,
        "y": 260,
        "category": "search"
      },
      {
        "id": "tape",
        "x": 1240,
        "y": 440,
        "category": "closed_loop"
      }
    ],
    "edges": [
      {
        "from": "zero_shot_planner",
        "to": "inner_monologue",
        "label": "接入反馈"
      },
      {
        "from": "inner_monologue",
        "to": "react",
        "label": "通用闭环"
      },
      {
        "from": "react",
        "to": "reflexion",
        "label": "失败记忆"
      },
      {
        "from": "react",
        "to": "rap",
        "label": "搜索规划"
      },
      {
        "from": "react",
        "to": "adaplanner",
        "label": "显式改写"
      },
      {
        "from": "react",
        "to": "rewoo",
        "label": "先计划后做"
      },
      {
        "from": "react",
        "to": "llm_dp",
        "label": "神经符号"
      },
      {
        "from": "rap",
        "to": "lats",
        "label": "接入环境"
      },
      {
        "from": "rewoo",
        "to": "adapt",
        "label": "递归分解"
      },
      {
        "from": "rewoo",
        "to": "llm_compiler",
        "label": "并行编排"
      },
      {
        "from": "reflexion",
        "to": "devils_advocate",
        "label": "预判失败"
      },
      {
        "from": "rap",
        "to": "wkm",
        "label": "知识建模"
      },
      {
        "from": "rap",
        "to": "system_1_x",
        "label": "快慢混合"
      },
      {
        "from": "adapt",
        "to": "plan_and_act",
        "label": "双层执行"
      },
      {
        "from": "devils_advocate",
        "to": "preflect",
        "label": "前瞻反思"
      },
      {
        "from": "lats",
        "to": "lwm_planner",
        "label": "事实前瞻"
      },
      {
        "from": "adaplanner",
        "to": "tape",
        "label": "反馈重规划"
      },
      {
        "from": "plan_and_act",
        "to": "tape",
        "label": "约束执行"
      }
    ],
    "milestones": [
      "react",
      "lats",
      "tape"
    ]
  },
  "algos": [
    {
      "id": "zero_shot_planner",
      "num": 1,
      "name": "Zero-Shot Planner",
      "fullName": "零样本规划器 (Language Models as Zero-Shot Planners)",
      "year": "2022.01",
      "org": "UC Berkeley",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2201.07207",
      "projectUrl": "",
      "category": "foundation",
      "motivation": "首次把LLM直接用于高层任务分解",
      "summary": "Zero-Shot Planner 证明了大语言模型即使不做任务专门训练，也能直接把自然语言目标分解成一串可执行高层动作，并通过动作翻译与迭代重规划，把预训练语言知识转成具身任务中的 planning prior。",
      "keyPoints": [
        "核心目标是把预训练语言模型中的常识顺序知识直接拿来做 embodied planning，而不是重新训练任务专用策略。",
        "规划流程分三步：LM 先生成自由文本计划，再把自然语言步骤翻译成环境允许的动作集合，最后按执行反馈迭代重规划。",
        "使用“admissible actions”约束，解决 LM 输出自由文本与机器人/模拟器动作空间不一致的问题。",
        "通过 prompt 工程让模型学会把长目标拆成短步骤，例如“找到锅、打开炉子、加热”等高层动作序列。",
        "在虚拟家务与机器人操作场景中验证，说明语言模型对“动作顺序”的世界知识可直接迁移到 planning。",
        "论文的重要意义不在精细控制，而在首次把 LLM 当成高层 planner，而不是只当问答模型或文本生成器。"
      ],
      "detail": "<p><img alt=\"Zero-Shot Planner 框架图\" src=\"https://ar5iv.labs.arxiv.org/html/2201.07207/assets/x1.png\" />\n<em>图：论文展示了从自然语言目标到高层文本计划、再到可执行动作序列的整体链路。</em></p>\n<pre><code class=\"language-python\"># Zero-Shot Planner 的抽象流程\ngoal = task_description\nhistory = []\n\nwhile not task_finished(goal, history):\n    # 1) 让语言模型直接生成下一段高层计划\n    free_form_plan = llm.plan(goal, history)\n\n    # 2) 把自由文本步骤翻译到环境允许动作\n    action_seq = translate_to_admissible_actions(free_form_plan, action_set)\n\n    # 3) 执行动作并记录反馈\n    for action in action_seq:\n        obs = env.step(action)\n        history.append((action, obs))\n        if needs_replan(obs):\n            break\n</code></pre>\n<p>Zero-Shot Planner 的出发点非常朴素：大语言模型在海量文本里已经见过“做一顿饭”“清理桌面”“把东西收纳好”这类任务的常见步骤顺序，因此它天然拥有某种高层 planning prior。论文问的不是“能不能让 LM 学会控制机器人”，而是“能不能先把它当成一个零样本的高层规划器”，把这种顺序知识直接抽出来。</p>\n<p>具体做法上，模型先根据任务描述输出自由形式的文本计划，例如 “walk to the kitchen, find the pot, turn on the stove”。这一步不要求动作必须严格符合环境 API，因此生成更自然、更接近语言模型原本擅长的分解方式。随后系统再把这些自由文本步骤映射到环境允许的 admissible actions，解决语言空间与动作空间之间的接口问题。</p>\n<p>真正让它成为 agent 范式起点的，是“先规划、再翻译、再按反馈重规划”这条链路。它虽然还没有 ReAct 那样完整的 thought-action-observation 闭环，也没有后来的树搜索、反思、工作记忆，但已经把 LLM 明确放进了 agent 控制栈的最上层，让模型负责“决定先做什么、后做什么”。</p>\n<p>从后续演化看，Inner Monologue 把环境反馈写回语言回路，ReAct 把推理与行动交错起来，RAP/LATS 则进一步引入搜索。Zero-Shot Planner 的历史价值就在这里：它是“LLM 做高层规划”这条主线的第一块地基。</p>\n<div class=\"key-point\">💡 关键：论文关注的是 high-level planning，不是 low-level control；LM 输出的是“步骤顺序知识”，不是电机级动作。</p>\n<p>⚠️ 注意：由于自由文本计划仍需动作翻译，这一方法很依赖 action grounding 的质量；如果翻译错误，LM 的高层计划再合理也无法可靠落地。</div>",
      "quiz": {
        "q": "Zero-Shot Planner 相比后来的 ReAct，最核心的定位差异是什么？",
        "options": [
          "它主要解决低层运动控制，而不是高层规划",
          "它先生成高层文本计划，再做动作翻译，还没有完整的交错式行动闭环",
          "它依赖大规模强化学习训练后才能规划",
          "它完全不使用自然语言，而是直接生成 PDDL"
        ],
        "answer": 1,
        "explain": "Zero-Shot Planner 的关键贡献是把 LLM 当作零样本高层 planner；它先产出自由文本计划，再翻译成可执行动作，尚未发展成 ReAct 式的交错闭环。"
      }
    },
    {
      "id": "inner_monologue",
      "num": 2,
      "name": "Inner Monologue",
      "fullName": "内心独白 (Inner Monologue)",
      "year": "2022.07",
      "org": "Google",
      "parent": "zero_shot_planner",
      "paperUrl": "https://arxiv.org/abs/2207.05608",
      "projectUrl": "",
      "category": "foundation",
      "motivation": "把环境反馈写回语言规划回路",
      "summary": "Inner Monologue 提出将环境反馈（成功检测、场景描述、人机对话）以自然语言形式注入大语言模型的规划闭环，使得 LLM 能在具身机器人任务中根据实时反馈进行重规划和纠正，大幅提升了长程操作与导航任务中对抗干扰的鲁棒性。",
      "keyPoints": [
        "首次系统地将三种环境反馈——<strong>成功检测（Success Detection）</strong>、<strong>被动场景描述（Passive Scene Description）</strong>、<strong>主动场景描述（Active Scene Description）</strong>——统一以自然语言注入 LLM 规划回路，构成「内心独白」闭环",
        "提出<strong>高层次指令→LLM 分解为可执行步骤序列</strong>的架构，LLM 输出结构化文本（如 <code>put the blue block on the yellow bowl</code>），由低层控制策略执行",
        "在三个不同具身场景验证：<strong>模拟桌面重排</strong>（Ravens）、<strong>真实桌面重排</strong>、<strong>真实厨房移动操作</strong>，分别使用 InstructGPT、Code as Policies 等方法",
        "通过对抗扰动实验（人为移动物体、任务中途换指令）证明闭环反馈能实现<strong>零样本重规划</strong>，比开环方法提升 20%–50% 的指令完成率",
        "探索了 emergent capabilities：LLM 可根据场景描述主动调整策略（如识别物体缺失并报告用户）、在部分可观测环境中持续查询环境状态"
      ],
      "detail": "<h5>核心框架：LLM + 环境反馈闭合回路</h5>\n<p>Inner Monologue 的核心思想受 Vygotsky 心理学中「内心独白」启发——人在执行复杂任务时通过自我对话来监控和调整行为。作者将其映射到机器人规划中：<strong>LLM 规划器在每一步不仅接收任务指令和当前状态，还会接收由环境返回的自然语言反馈，从而形成「规划→执行→反馈→重规划」的闭环。</strong></p>\n<p><img alt=\"Inner Monologue 框架图\" src=\"https://ar5iv.labs.arxiv.org/html/2207.05608/assets/x1.png\" />\n<em>图：Inner Monologue 总体框架示意。LLM 规划器接收人类指令和每一步的环境反馈（成功检测、场景描述、人机问答），输出可执行步骤序列给机器人底层控制策略。</em></p>\n<h5>三种反馈源</h5>\n<p>论文将环境反馈分为三类，三者可单独或组合使用：</p>\n<p><strong>1. 成功检测（Success Detection）</strong>\n- 形式：二分类语义信号，判断底层技能 π_k 是否成功执行\n- 模拟环境中用 ground-truth 状态自动判断；真实环境中用训练好的成功分类器（基于图像）\n- 将结果以自然语言注入：「Skill <code>pick blue block</code> succeeded.」或「Skill <code>place blue block</code> failed.」</p>\n<p><strong>2. 被动场景描述（Passive Scene Description）</strong>\n- 每步自动向 LLM 提供结构化的场景语义信息\n- 例如：「The objects currently visible are: red block, blue block, yellow bowl, green bowl.」\n- 在桌面重排任务中来自物体识别器；在厨房移动操作中来自 VQA 模型对场景的语义描述</p>\n<p><strong>3. 主动场景描述（Active Scene Description）</strong>\n- LLM 规划器可以主动向环境发出自然语言查询\n- 由人类或预训练的 VQA 模型回答开放式问题\n- 论文中称为「Human feedback」模式——例如 LLM 可以问「Which bowl is the largest?」，人类回答「The yellow bowl.」，LLM 据此调整规划</p>\n<div class=\"key-point\">💡 关键：三种反馈本质上是让 LLM 获得一个不断更新的「世界状态描述」，而非仅靠初始指令和自身知识库进行一步式推理。这是从开环规划到闭环控制的关键跃迁。</div>\n<h5>算法流程（伪代码）</h5>\n<pre><code class=\"language-text\"># Inner Monologue 主循环\ninit_state, instruction, history = get_state(), get_instruction(), []\nstep = 0\n\nwhile not task_complete and step &lt; max_steps:\n    # 1. 获取环境反馈\n    success_fb  = success_detector(current_state)       # &quot;success&quot; / &quot;failure&quot;\n    scene_fb    = scene_descriptor(current_state)       # 被动场景描述\n    active_query = llm_generate_query(history)          # LLM 可选地主动查询\n    active_fb   = human_or_vqa_answer(active_query)     # 主动场景描述\n\n    # 2. 构建 prompt: 指令 + 历史 + 反馈\n    prompt = construct_prompt(instruction, history,\n                              success_fb, scene_fb, active_fb)\n\n    # 3. LLM 规划: 输出可执行步骤\n    llm_output = llm_planner(prompt)   # e.g. &quot;pick red block&quot;\n\n    # 4. 解析并执行\n    action = parse_action(llm_output)\n    if action == &quot;done&quot;: break\n\n    new_state, skill_ok = low_level_policy(action, current_state)\n\n    # 5. 更新历史与状态\n    history.append({&quot;out&quot;: llm_output, &quot;success&quot;: skill_ok})\n    current_state = new_state; step += 1\n</code></pre>\n<p><em>伪代码：Inner Monologue 的规划-执行-反馈闭环。LLM 在每个时间步接收三种自然语言反馈，根据完整历史进行下一步规划。</em></p>\n<h5>核心机制深入</h5>\n<p><strong>动机与背景</strong>：传统 LLM 在机器人规划中的用法是「给出指令 → LLM 一次性分解为动作序列 → 机器人执行」。这种方法（如 SayCan、Code as Policies）有两个致命弱点：(1) 对环境状态变化的<strong>零容忍</strong>——执行中若物体被移动、任务目标变化，LLM 完全无法感知；(2) <strong>部分可观测性</strong>无法处理——LLM 无法在任务途中查询当前场景的具体状态。Inner Monologue 的动机正是将控制理论中已充分验证的「闭环反馈」原理引入 LLM 规划，用自然语言作为反馈载体。</p>\n<p><strong>为什么是自然语言反馈？</strong> 论文的关键洞察：LLM 已经在海量文本上预训练，自然语言是其最自然的「感知模态」。与其费力将多模态感知（图像、深度等）向量化后注入 LLM（如 PaLM-E 做法），不如利用已有的视觉识别器、VQA 模型等将感知结果翻译为<strong>自然语言文本</strong>，直接拼接到 prompt 中。这样做有三个优势：(1) 无需重新训练或微调 LLM；(2) 充分利用了 LLM 的常识推理能力；(3) 人机交互对人类也同样可读。</p>\n<p><strong>Prompt 的结构设计</strong>：每个环境中 prompt 包含四个部分：\n1. <strong>角色设定</strong>（如「You are a robot that can manipulate objects on a table」）\n2. <strong>可用技能列表</strong>（如 <code>pick(object)</code>, <code>place(object, location)</code>, <code>done()</code>）\n3. <strong>少样本示例</strong>（1–3 个完整任务轨迹作为 in-context example）\n4. <strong>当前环境反馈</strong>（动态变化，每步更新）</p>\n<p><strong>对抗扰动实验</strong>：论文在模拟环境中设计了极具挑战性的场景——(a) 执行中实验者主动移动目标物体位置；(b) 任务中途变更指令（如「把蓝色积木放进蓝色碗」→「把蓝色积木放进黄色碗」）。开环方法毫无反应，而 Inner Monologue 能够根据场景描述检测到物体位置变化或指令变更，自动重规划并完成任务，成功率从约 30% 提升至约 80%。</p>\n<div class=\"warn-box\">⚠️ 注意：Inner Monologue 的效果高度依赖于各反馈模块（物体识别器、成功检测器）的准确度。论文中指出的主要失败模式包括：(1) 成功检测误判（false positive 引入对抗性部分可观测；false negative 导致不必要重试）；(2) LLM 偶尔「忽略」环境反馈，继续计划使用已不存在的物体；(3) 底层控制策略的能力瓶颈限制了 LLM 的规划范围。</div>\n<p><strong>三个实验场景的差异化实现</strong>：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th>模拟桌面 (Ravens)</th>\n<th>真实桌面</th>\n<th>厨房移动操作</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>LLM 方法</td>\n<td>InstructGPT</td>\n<td>Code as Policies</td>\n<td>LLM 高层规划 + Affordance 低层</td>\n</tr>\n<tr>\n<td>成功检测</td>\n<td>Ground-truth / CLIP</td>\n<td>人标注</td>\n<td>视觉分类器</td>\n</tr>\n<tr>\n<td>场景描述</td>\n<td>物体识别器</td>\n<td>物体识别器</td>\n<td>VQA 模型</td>\n</tr>\n<tr>\n<td>关键挑战</td>\n<td>对抗扰动</td>\n<td>Real-world noise</td>\n<td>长程任务 + 部分可观测</td>\n</tr>\n</tbody>\n</table></div>\n<h5>与传统方法的区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>反馈形式</th>\n<th>重规划能力</th>\n<th>依赖</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>SayCan</td>\n<td>无环境反馈</td>\n<td>无</td>\n<td>固定价值函数</td>\n</tr>\n<tr>\n<td>Code as Policies</td>\n<td>无显式反馈</td>\n<td>有限（代码可含条件）</td>\n<td>LLM 代码生成能力</td>\n</tr>\n<tr>\n<td><strong>Inner Monologue</strong></td>\n<td><strong>自然语言三通道反馈</strong></td>\n<td><strong>连续重规划</strong></td>\n<td><strong>多个感知模型 + LLM</strong></td>\n</tr>\n<tr>\n<td>PaLM-E</td>\n<td>多模态向量</td>\n<td>有限</td>\n<td>多模态大模型训练</td>\n</tr>\n</tbody>\n</table></div>\n<p>Inner Monologue 的独特贡献在于：<strong>用已有的单模态能力组件（物体识别、VQA、LLM）通过自然语言接口拼接出多模态闭环能力，无需端到端训练新的多模态模型</strong>。</p>",
      "quiz": {
        "q": "Inner Monologue 中三种环境反馈的核心作用是什么？",
        "options": [
          "提升 LLM 的代码生成质量",
          "以自然语言将环境状态变化注入 LLM 规划回路，实现闭环重规划",
          "替代低层控制策略，直接输出机器人关节角度",
          "减少 LLM 推理时所需的 token 数量"
        ],
        "answer": 1,
        "explain": "成功检测、被动和主动场景描述三种反馈本质都是将环境状态以自然语言输入 LLM，使其能在执行中感知变化并重规划，这是开环→闭环的关键创新。"
      }
    },
    {
      "id": "react",
      "num": 3,
      "name": "ReAct",
      "fullName": "推理-行动协同 (ReAct)",
      "year": "2022.10",
      "org": "Google",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2210.03629",
      "projectUrl": "",
      "category": "reactive",
      "motivation": "交错生成思考行动观测主循环",
      "summary": "ReAct是一种让大语言模型在生成行动的同时穿插\"思考文本\"的提示范式——通过将动作空间扩展为\"实际动作+推理轨迹(thought)\"，使模型在知识推理任务中能用工具消除幻觉、在交互决策任务中能用推理引导探索，仅需1-2个示例即可超越训练了10^3~10^5条轨迹的模仿学习/强化学习方法。",
      "keyPoints": [
        "原始动作空间 $\\mathcal{A}$（与外部环境交互，产生Observation）",
        "扩展后 $\\hat{\\mathcal{A}}=\\mathcal{A} \\cup \\mathcal{L}$，其中 $\\mathcal{L}$ 是自然语言空间",
        "在语言空间中的动作 $\\hat{a}_t \\in \\mathcal{L}$ 称为\"思维/推理轨迹\"，其目的不是影响环境，而是通过推理组合有用信息"
      ],
      "detail": "<p><img alt=\"ReAct 示意图\" src=\"https://ar5iv.labs.arxiv.org/html/2210.03629/assets/x1.png\" />\n<em>图：ReAct 的核心框架或评测示意。</em></p>\n<h5>1. 范式对比：图1核心示意图</h5>\n<p>图1展示了同一条HotpotQA问题在4种范式下的行为对比：</p>\n<ul>\n<li><strong>(a) Standard</strong>：直接生成答案 → 无推理无交互，容易出错</li>\n<li><strong>(b) CoT（仅推理）</strong>：生成推理链后答案 → 纯内部推理，可能产生幻觉（如对\"Apple Remote\"的错误事实描述）</li>\n<li><strong>(c) Act-only（仅行动）</strong>：反复搜索Wikipedia → 缺乏推理，会生成无效搜索或无法融合信息</li>\n<li><strong>(d) ReAct（推理+行动）</strong>：Thought分析需要搜索什么 → Action调Wikipedia API → Observation返回结果 → Thought分析结果发现需要更多信息 → 继续搜索 → 最终生成答案。<strong>轨迹可读、可溯源、可纠错</strong></li>\n</ul>\n<h5>2. 核心算法框架（伪代码）</h5>\n<pre><code>输入: 任务描述 + Few-Shot示例(含Thought→Action→Observation交替)\n初始化: context ← [task_prompt, few_shot_examples]\n\n循环直到终止:\n    response ← LLM.generate(context)  # 生成下一段文本\n    if response是Thought:\n        将 Thought 追加到 context  # 不与环境交互\n    elif response是Action:\n        执行Action于环境，获得Observation\n        将 Action + Observation 追加到 context\n    elif response是结束标记(Answer/Finish):\n        输出最终答案/动作，退出循环\n</code></pre>\n<p><strong>关键设计</strong>：\n- Thought和Action在token级别由LLM自行决定何时产生（通过few-shot示例中的模式引导）\n- 当遇到知识密集型任务（HotpotQA），ReAct会交替搜索多个子问题并逐步合成答案\n- 当遇到具身任务（ALFWorld），ReAct先用Thought分解子目标（\"我需要找到并拿起一个干净的苹果\"），再生成低级动作（go to fridge, open fridge, take apple...）</p>\n<h5>3. 不同任务的ReAct轨迹深度分析</h5>\n<p><strong>(a) 知识推理任务 — HotpotQA（多跳问答）与Fever（事实验证）</strong>\n- 动作空间：<code>search[entity]</code>（查询Wikipedia）、<code>lookup[string]</code>（在当前页面内精确定位）、<code>finish[answer]</code>\n- ReAct vs CoT关键优势：当模型内部知识错误或缺失时，ReAct通过搜索外部知识库自动纠偏。例如\"Apple Remote\"的制造商问题，CoT幻觉为\"由Apple Inc.制造\"，而ReAct搜索后纠正为\"由Universal Electronics制造\"\n- ReAct vs Act-only：Act-only容易陷入\"搜索→无结果→继续搜索→循环\"的困境；ReAct的Thought能在搜索前明确意图，在搜索后评估信息充分性\n- <strong>Hallucination消减</strong>：Fever任务上，纯CoT的幻觉率显著更高；ReAct通过显式搜索Wikipedia API，将错误信息替换为可验证的外部证据</p>\n<p><strong>(b) 交互决策任务 — ALFWorld（具身AI）与WebShop（网页购物）</strong>\n- ALFWorld动作空间：<code>goto[location], open[object], close[object], take[object], put[object], clean[object], heat[object], cool[object]</code>\n- ALFWorld空间庞大、奖励稀疏，纯RL需要大量交互训练\n- ReAct的Thought发挥<strong>稀疏奖励下的推理引导</strong>作用：将高级目标分解为低级子任务序列，例如\"任务是加热一个土豆\"→分解为：找土豆→取土豆→找微波炉→放进去→加热\n- WebShop动作空间：搜索、点击产品、选择选项、购买\n- ReAct的Thought帮助权衡产品属性与用户需求，生成类似人类购物决策的推理轨迹</p>\n<h5>4. 详细的定量结果</h5>\n<p><strong>HotpotQA + Fever（Table 1 &amp; 2）</strong>：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>HotpotQA EM/F1</th>\n<th>Fever Acc</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Standard</td>\n<td>25.7/33.8</td>\n<td>51.0</td>\n</tr>\n<tr>\n<td>CoT</td>\n<td>29.4/35.1</td>\n<td>56.3</td>\n</tr>\n<tr>\n<td>CoT-SC</td>\n<td>33.8/40.8</td>\n<td>60.4</td>\n</tr>\n<tr>\n<td>Act</td>\n<td>25.2/25.9</td>\n<td>58.9</td>\n</tr>\n<tr>\n<td>ReAct</td>\n<td>27.4/35.8</td>\n<td>54.6</td>\n</tr>\n<tr>\n<td><strong>ReAct→CoT-SC</strong></td>\n<td><strong>35.1/42.0</strong></td>\n<td><strong>64.6</strong></td>\n</tr>\n</tbody>\n</table></div>\n<ul>\n<li>纯ReAct在某些任务上不如CoT-SC（内部知识更全面时），但ReAct的轨迹更<strong>基于证据</strong>、<strong>幻觉更少</strong></li>\n<li><strong>ReAct→CoT-SC</strong>：先运行ReAct收集外部信息，再将完整的ReAct轨迹+检索到的证据输入CoT-SC进行最终推理，达到SOTA</li>\n</ul>\n<p><strong>ALFWorld（Table 3）</strong>：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>示例数</th>\n<th>成功率</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>BUTLER (imitation)</td>\n<td>10^5</td>\n<td>37%</td>\n</tr>\n<tr>\n<td>BUTLER (BUTLER+RL)</td>\n<td>10^5</td>\n<td>22% (探索失败)</td>\n</tr>\n<tr>\n<td>Act (6-shot)</td>\n<td>6</td>\n<td>45%</td>\n</tr>\n<tr>\n<td><strong>ReAct (2-shot)</strong></td>\n<td>2</td>\n<td><strong>71%</strong></td>\n</tr>\n<tr>\n<td><strong>ReAct (1-shot)</strong></td>\n<td>1</td>\n<td><strong>62%</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>仅需2个示例，超越10万条训练数据的系统，绝对提升34%！</strong></p>\n<p><strong>WebShop（Table 4）</strong>：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>成功率</th>\n<th>Reward</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>IL</td>\n<td>29.1%</td>\n<td>62.4</td>\n</tr>\n<tr>\n<td>IL+RL</td>\n<td>28.7%</td>\n<td>62.3</td>\n</tr>\n<tr>\n<td>Act (1-shot)</td>\n<td>30.1%</td>\n<td>61.5</td>\n</tr>\n<tr>\n<td><strong>ReAct (2-shot)</strong></td>\n<td><strong>40.0%</strong></td>\n<td><strong>66.6</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>仅需2次示例提升10%成功率，且Reward显著更高（购买的商品更匹配需求）。</strong></p>\n<h5>5. ReAct的内部工作原理与消融实验</h5>\n<ul>\n<li><strong>Thought的评分机制</strong>：ReAct在生成Thought时，通过计算该Thought对未来动作的<strong>互信息增益</strong>来判断是否需要更深度的推理——如果当前上下文已经足够做出正确动作，则跳过冗长推理</li>\n<li><strong>内部推理 vs 外部搜索的互补</strong>（Table 5）：消融实验显示，当知识存于内部（模型预训练中已学到），CoT更优；当知识仅存于外部（罕见/新知识），ReAct显示必要性。最优策略是<strong>先用ReAct获取外部信息，再用CoT集成内外部知识</strong>（ReAct→CoT-SC）</li>\n<li><strong>Thought的必要性实验</strong>（Table 7）：移除所有Thought（变为纯Act），在ALFWorld上成功率大幅下降；验证了在交互任务中推理对动作生成的关键支撑</li>\n<li><strong>微调实验</strong>（§4-6）：在HotpotQA上用3K条ReAct轨迹微调PaLM-8B和PaLM-62B，微调后的ReAct模型在域内任务上性能大幅提升，且<strong>对Prompt中示例数量的敏感度降低</strong></li>\n</ul>\n<h5>6. 失败模式与局限性</h5>\n<ul>\n<li><strong>推理受阻</strong>：LLM有时会陷入重复生成相同Thought的循环（如反复说\"我需要搜索更多\"但不行动），论文通过限制最大步数截断</li>\n<li><strong>搜索失败</strong>：对外部API返回无结果时，模型有时无法优雅处理，继续尝试相似查询</li>\n<li><strong>长轨迹遗忘</strong>：超过15步后，模型倾向于遗忘早期Observation或产生不一致推理</li>\n<li><strong>幻觉在执行中</strong>：即使推理正确，生成的具体Action有时包含幻想的地点/物品名（尤其在ALFWorld中）</li>\n<li><strong>微调的潜在方向</strong>：Prompt范式受限于LLM固有的推理和行动能力边界，通过微调可以进一步扩展</li>\n</ul>\n<h5>7. 与相关工作的关系</h5>\n<ul>\n<li><strong>CoT (Wei et al., 2022)</strong>：ReAct将CoT的\"推理链\"嵌入到与环境的交互循环中，从纯推理范式扩展为感知-推理-行动循环</li>\n<li><strong>SayCan / Inner Monologue</strong>：机器人领域的语言指导动作，ReAct提供更统一的Prompt范式</li>\n<li><strong>Toolformer (Schick et al., 2023)</strong>：通过自监督学习API调用，ReAct采用无需训练的Prompt方式实现工具使用</li>\n<li><strong>AutoGPT / LangChain Agent生态</strong>：直接继承了ReAct的\"Thought-Action-Observation\"范式</li>\n</ul>",
      "quiz": {
        "q": "ReAct 的核心范式差异是什么？",
        "options": [
          "让模型只负责检索，不再做语言推理",
          "把推理文本当作内部动作，与外部 Action/Observation 交错出现",
          "先生成完整计划，再完全离线执行",
          "把所有决策都交给符号规划器"
        ],
        "answer": 1,
        "explain": "ReAct 的关键就在于 Thought 不是最终答案，而是会进入后续上下文的内部动作，与真实环境中的 Action 和 Observation 交替形成闭环。"
      }
    },
    {
      "id": "reflexion",
      "num": 4,
      "name": "Reflexion",
      "fullName": "语言反思强化 (Reflexion)",
      "year": "2023.03",
      "org": "Northeastern",
      "parent": "react",
      "paperUrl": "https://arxiv.org/abs/2303.11366",
      "projectUrl": "",
      "category": "closed_loop",
      "motivation": "把失败教训写入记忆驱动重试",
      "summary": "Reflexion 是一种不更新模型参数、仅通过**自然语言反思文本**将试错失败的经验注入后续推理上下文的强化学习框架：LLM Agent 行动失败后，自动生成“自我反思”存入跨回合记忆，下一轮迭代作为语义引导纠正错误决策，由此在 AlfWorld、HotPotQA、HumanEval 等任务上实现 11%–22% 的绝对提升。",
      "keyPoints": [
        "<strong>语言化强化（Verbal RL）</strong>：把 RL 的奖励信号转化为自然语言反思文本，以“语义梯度”替代数值梯度，全程不涉及模型权重更新",
        "<strong>三组件闭环架构</strong>：Actor（LLM 生成决策）→ Evaluator（环境或启发式判定成败）→ Self-Reflection（LLM 分析失败根因，输出一段操作性反思文本）",
        "<strong>跨 Episode 记忆缓冲</strong>：失败反思存入滑动窗口式的 Episodic Memory Buffer，下轮推理时拼入 prompt 前缀，形成“试错→反思→重试”的累积学习循环",
        "<strong>多层反思粒度</strong>：支持动作级反思（单步错误）和轨迹级反思（全局策略缺陷），并以链式多轮反思叠加构建高层元反思",
        "<strong>多源头反馈信号</strong>：支持二元环境信号、手写启发式规则、LLM 自评分类、自写单元测试等多种评估方式，灵活适配不同任务",
        "<strong>全新基准 LeetcodeHardGym</strong>：贡献 40 道 Leetcode Hard 级编程题的 RL Gym 环境，覆盖 19 种编程语言",
        "<strong>三个领域 SOTA 提升</strong>：AlfWorld +22%（134 任务 12 轮迭代后 130/134 解决），HotPotQA +20%，HumanEval pass@1 达 91%（超越 GPT-4 的 80%）"
      ],
      "detail": "<h5>核心框架图</h5>\n<p><img alt=\"Reflexion 核心框架图\" src=\"https://arxiv.org/html/2303.11366/x1.png\" />\n<em>图：Reflexion 在决策、编程、推理三类任务上的工作示意——Agent 经试错、自我反思、记忆回注三阶段累积改进</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># Reflexion 核心循环\nbuffer = []  # 跨 Episode 的反思记忆（滑动窗口，默认保留最近 3 条）\n\nfor episode in range(max_episodes):\n    # 1. 构建 prompt：任务指令 + 历史反思 + 当前观测\n    prompt = build_prompt(task_desc, observation, buffer)\n\n    # 2. Actor 执行轨迹\n    trajectory = []\n    for step in range(max_steps):\n        action = llm_actor(prompt, observation)     # LLM 生成思考+动作\n        observation, reward, done = env.step(action)\n        trajectory.append((action, observation, reward))\n        if done: break\n\n    # 3. Evaluator 判定结果\n    result = evaluator(trajectory)   # 二值/等级/启发式\n    if result == SUCCESS:\n        break  # 任务完成\n\n    # 4. Self-Reflection：失败轨迹 → 自然语言反思\n    reflection = llm_reflect(trajectory, result)\n    buffer.append(reflection)\n\n    # 5. 滑动窗口截断，防止 prompt 超长\n    if len(buffer) &gt; MAX_BUFFER_SIZE:\n        buffer = buffer[-MAX_BUFFER_SIZE:]\n</code></pre>\n<h5>核心机制拆解</h5>\n<p><strong>1. 动机与背景——跨回合信息断层的难题</strong></p>\n<p>传统 LLM Agent 框架（如 ReAct）尽管能够在单次 Episode 内进行“推理-行动-观察”的循环，但<strong>不同 Episode 之间完全独立</strong>——Agent 可能在完全相同的位置重复犯同样的错误（如 AlfWorld 中反复误判“我已持有该物品”）。基于梯度微调的方案（RLHF/PPO）可以全局改善行为，但计算开销巨大、需大量训练数据，无法按单个任务实时调整。</p>\n<p>Reflexion 的核心洞察在于：<strong>LLM 本身已具备从文本中理解自身错误并生成改进策略的元能力</strong>（如“Let’s think step by step”现象），只需系统化地将其置入跨 Episode 的记忆流转循环，即可在不触碰权重的前提下实现定向行为优化。</p>\n<p><strong>2. 反思生成——从失败轨迹到可操作策略</strong></p>\n<p>Self-Reflection 模块复用同一 LLM，但切换角色指令：输入为完整失败轨迹（动作序列、环境反馈、最终失败结果），要求模型分析“哪里出错”及“下次如何改进”。生成的反思文本高度语义化，例如：</p>\n<blockquote>\n<p><em>“在上次尝试中，我误以为已经取到了苹果，实际上 Take 操作失败了。下次进入厨房后，应先用 Look 确认物品是否在手中，再执行后续搬运操作。”</em></p>\n</blockquote>\n<p>反思按粒度分为三层：\n- <strong>简单反思</strong>：一句指出错误类型（“我没有打开所有抽屉就断言物品不存在”）\n- <strong>分析式反思</strong>：详述根因并给出具体策略调整\n- <strong>链式反思</strong>：多轮失败后追加元反思（“我连续三次浪费时间在已检查过的柜子上，应记录已探索位置并优先搜索新区域”）</p>\n<p>为确保反思质量，实践中会做<strong>长度过滤</strong>（去除空洞套话）、<strong>可操作性校验</strong>（必须提及具体错误步骤和改进动作），并且反思 prompt 经过精心设计以引导模型产出指向性明确的文本。</p>\n<p><strong>3. 与传统方法的核心区别</strong></p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th>Reflexion</th>\n<th>ReAct</th>\n<th>RLHF / PPO</th>\n<th>RAG</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>学习方式</td>\n<td>语言反思文本</td>\n<td>无跨回合学习</td>\n<td>梯度更新参数</td>\n<td>检索外部文档</td>\n</tr>\n<tr>\n<td>参数更新</td>\n<td>❌ 完全冻结</td>\n<td>❌</td>\n<td>✅ 永久改变</td>\n<td>❌</td>\n</tr>\n<tr>\n<td>记忆来源</td>\n<td>运行时动态生成</td>\n<td>—</td>\n<td>训练语料</td>\n<td>固定知识库</td>\n</tr>\n<tr>\n<td>针对性</td>\n<td>当前任务高度特化</td>\n<td>—</td>\n<td>泛化到同类任务</td>\n<td>通用知识</td>\n</tr>\n<tr>\n<td>计算成本</td>\n<td>极低（仅额外 prompt token）</td>\n<td>低</td>\n<td>高（需 GPU 集群）</td>\n<td>中（需向量库）</td>\n</tr>\n</tbody>\n</table></div>\n<p>Reflexion 可视为在 ReAct 外层套上一个“跨回合学习循环”，将其从单次推理器升级为能够在连续试错中积累经验的自治 Agent。与思维树（ToT）/思维图（GoT）的单回合多路径并行搜索不同，Reflexion 利用<strong>历史轨迹的语义压缩</strong>，在纵向的多个 Episode 间串行积累。</p>\n<p><strong>4. 评估器（Evaluator）的灵活分层设计</strong></p>\n<p>Reflexion 支持三种评估方式以适应不同任务特性：</p>\n<ul>\n<li><strong>环境二元信号</strong>：适用于有明确终点的任务（AlfWorld 目标物品是否正确放置、HumanEval 代码是否通过所有测试用例）</li>\n<li><strong>启发式规则</strong>：捕获常见失败模式，如 AlfWorld 中同一动作重复 &gt;3 次或轨迹长度超过 30 步的“无效规划”检测</li>\n<li><strong>LLM 自评</strong>：对开放式任务（HotPotQA 问答质量），用 LLM 作二元分类器判断回答是否正确，或采用 EM/F1 等启发式指标</li>\n</ul>\n<p>多评估源可以混合使用，例如在 AlfWorld 中环境信号用于终点判定，启发式规则用于中途触发内部反思。</p>\n<p><strong>5. 训练/推理流程</strong></p>\n<p>Reflexion <strong>零训练</strong>——整个流程在推理时完成，模型权重完全冻结。部署只需设计三组提示词模板：\n- <strong>Actor 指令</strong>：任务描述 + 工具/环境约束 + 思考-行动格式\n- <strong>Evaluator 规则</strong>：判定成功条件和失败触发阈值\n- <strong>Self-Reflection 指令</strong>：要求分析失败根因并给出可操作的改进策略</p>\n<p>数据流：每 Episode 开始 → Actor 读取当前观测 + 历史反思 → 生成动作 → 环境执行 → 轨迹收集 → Episode 完成 → Evaluator 判定 → 若失败，Reflector 生成反思追加到 Buffer → 下轮开始。Buffer 默认保留最近 3 条反思，可通过聚类或摘要压缩扩展长程记忆。</p>\n<p><strong>6. 关键实验结果</strong></p>\n<ul>\n<li><strong>AlfWorld（具身决策）</strong>：134 个家务任务中，ReAct + Reflexion 在 12 轮迭代后累计解决 130 个（+22%），而单纯 ReAct 在 6-7 轮后提升停滞。分析表明 Reflexion 几乎消除了“误以为持有物品”导致的幻觉型失败。</li>\n<li><strong>HotPotQA（多跳推理）</strong>：Reflexion + CoT 实现 Q→A 和 (Q, C_gt)→A 模式下的显著提升，使模型能从检索策略缺陷中自我调整，改进信息覆盖率和答案准确率。</li>\n<li><strong>HumanEval &amp; LeetcodeHard（代码生成）</strong>：Reflexion 在 HumanEval 上 pass@1 达 91%（GPT-4 基线 80%），在面对 40 道 Leetcode Hard 题时也能基于编译/测试错误生成有效的“self-debugging”反思，第二轮生成通过率大幅跃升。</li>\n<li><strong>消融实验</strong>：仅靠“重试”无反思的基线几乎无提升；静态提示（“请更仔细”）改进微弱；只有<strong>基于失败轨迹动态生成的具体反思</strong>才能产生显著效果。</li>\n</ul>\n<div class=\"key-point\">💡 <strong>关键洞察</strong>：Reflexion 的核心力量不在于让模型“某一次想得更清楚”，而在于构建了一个<strong>跨 Episode 的语义信息通道</strong>——反思文本作为压缩后的经验载体，将连续试错从独立的骰子游戏转变为对正确答案的定向逼近。</p>\n<p>⚠️ <strong>注意</strong>：反思质量高度依赖 LLM 的自评能力。如果模型无法准确分析自身失败原因，反思可能引入噪音甚至误导后续尝试。实践中需对反思做基础校验（长度裁剪、空话过滤），且反思 prompt 需设计明确指令（“指出哪个具体步骤出错、原因是什么、下次如何做不同”）。此外，Reflexion 不提供形式化的收敛保证——其可靠性随 LLM 能力提升而增长。</div>",
      "quiz": {
        "q": "Reflexion 与 ReAct 最核心的区别是什么？",
        "options": [
          "Reflexion 使用更大的语言模型",
          "Reflexion 在 ReAct 外层增加了跨 Episode 的自我反思与记忆回注循环",
          "Reflexion 仅能用于代码生成任务",
          "Reflexion 需要进行额外的模型微调"
        ],
        "answer": 1,
        "explain": "ReAct 在每个 Episode 内进行推理-行动循环，但 Episode 间完全独立；Reflexion 在 ReAct 外层追加了失败反思生成和跨回合记忆注入机制，使 Agent 能从历史错误中累积学习。"
      }
    },
    {
      "id": "rap",
      "num": 5,
      "name": "RAP",
      "fullName": "通过规划进行推理 (Reasoning via Planning)",
      "year": "2023.05",
      "org": "UC San Diego",
      "parent": "react",
      "paperUrl": "https://arxiv.org/abs/2305.14992",
      "projectUrl": "",
      "category": "search",
      "motivation": "将LLM重塑为世界模型并做MCTS",
      "summary": "RAP 将大语言模型的推理过程重新定义为马尔可夫决策过程（MDP），引入世界模型与蒙特卡洛树搜索（MCTS）进行战略性前瞻探索，从而替代传统从左到右的链式解码，显著提升了数学推理、逻辑推理和规划任务的准确性。",
      "keyPoints": [
        "将 LLM 推理建模为 <strong>MDP</strong>：状态为当前推理上下文（中间步骤序列），动作为推理子步骤的生成",
        "引入 <strong>世界模型（World Model）</strong>：利用 LLM 自身模拟状态转移，预测采取某动作后的下一个推理状态",
        "设计 <strong>多层次奖励函数</strong>：包含自评估奖励（Self-evaluation）、动作似然奖励（Action Likelihood）、任务特定奖励（Task-specific）和置信度奖励（Confidence）",
        "提出 <strong>MCTS 四阶段搜索</strong>：选择（Selection）→ 扩展（Expansion）→ 模拟（Simulation）→ 反向传播（Backpropagation），在推理树中进行前瞻探索",
        "提出 <strong>RAP-Aggregate</strong> 方法：聚合多条高奖励推理路径，进一步提升推理准确性",
        "在 GSM8k（数学推理）、PrOntoQA（逻辑推理）、Blocksworld（规划）三大基准上均取得显著提升"
      ],
      "detail": "<h5>1. 核心框架：推理即规划</h5>\n<p><img alt=\"RAP 核心框架图\" src=\"https://ar5iv.labs.arxiv.org/html/2305.14992/assets/x1.png\" />\n<em>图：RAP 将推理建模为世界模型驱动的规划问题，并在推理树上执行 MCTS 前瞻搜索。</em></p>\n<p>RAP 的核心洞察是：<strong>传统 LLM 推理采用自回归式一步接一步生成，缺乏全局前瞻能力</strong>，容易在推理早期走入死胡同而不自知。RAP 通过将推理重新定义为规划问题来解决这一根本缺陷：</p>\n<ul>\n<li><strong>状态 <span class=\"kb-math kb-math-inline\">s_t</span></strong>：当前推理上下文，包含已生成的所有中间步骤</li>\n<li><strong>动作 <span class=\"kb-math kb-math-inline\">a_t</span></strong>：从当前状态出发的下一步推理子步骤——例如数学推理中的下一行计算、逻辑推理中的下一跳推理、或规划任务中的下一个操作</li>\n<li><strong>策略 <span class=\"kb-math kb-math-inline\">\\pi(a|s)</span></strong>：LLM 根据当前状态决定下一步动作的概率分布</li>\n</ul>\n<div class=\"key-point\">💡 关键：这种 MDP 建模将推理从\"被动生成\"转变为\"主动规划\"——模型不再仅仅根据前缀预测下一个 token，而是基于当前状态评估多个可能的方向，再选择最优路径。</div>\n<h5>2. 世界模型与状态转换</h5>\n<p>世界模型是 RAP 的基础组件之一，负责模拟动作的后果。在标准 MCTS 中，世界模型需要预测执行动作后环境将转移到的下一个状态。RAP 巧妙地<strong>复用 LLM 自身作为世界模型</strong>：</p>\n<div class=\"kb-math kb-math-display\">s_{t+1} = \\text{LLM}(s_t, a_t)</div>\n<p>具体而言，给定当前状态 <span class=\"kb-math kb-math-inline\">s_t</span>（例如 \"Step 1: …\\nStep 2: …\"）和候选动作 <span class=\"kb-math kb-math-inline\">a_t</span>（例如 \"下一步：计算 x + y = …\"），世界模型将两者拼接后输入 LLM，生成下一个状态 <span class=\"kb-math kb-math-inline\">s_{t+1}</span>。这种设计使得世界模型天然具备语义理解能力，能够处理自然语言推理步骤中的复杂状态转换。</p>\n<div class=\"warn-box\">⚠️ 注意：与强化学习中精确的环境模型不同，RAP 的世界模型是概率性的且可能产生错误。这也正是 MCTS 需要探索多条路径的原因。</div>\n<h5>3. 奖励函数设计</h5>\n<p>RAP 设计了<strong>四类互补的奖励</strong>来评估推理路径的质量：</p>\n<p><strong>（1）自评估奖励（Self-evaluation Reward）</strong><span class=\"kb-math kb-math-inline\">R_{\\text{self}}</span>：\nLLM 本身对当前状态是否\"在正确轨道上\"给出置信度评分。Prompt 设计为：\n- 给定问题、当前部分推理、可能的下步行动，评估该行动后状态是否合理\n- 输出 0-1 之间的分数</p>\n<p><strong>（2）动作似然奖励（Action Likelihood Reward）</strong><span class=\"kb-math kb-math-inline\">R_{\\text{action}}</span>：\n基于 LLM 生成动作时的对数似然来评估动作的\"自然程度\"：\n<div class=\"kb-math kb-math-display\">R_{\\text{action}}(a_t|s_t) = \\frac{1}{|a_t|}\\sum_{i=1}^{|a_t|} \\log P_{\\text{LLM}}(w_i|s_t, w_{&lt;i})</div></p>\n<p>这在结构化推理任务（如 Blocksworld 中的操作）中尤其有效，因为合理的动作通常具有更高的生成概率。</p>\n<p><strong>（3）任务特定奖励（Task-specific Reward）</strong><span class=\"kb-math kb-math-inline\">R_{\\text{task}}</span>：\n根据任务目标定义的确定性奖励，例如 Blocksworld 中判断是否达到目标布局。这类奖励最为可靠但仅在规划类任务中可用。</p>\n<p><strong>（4）置信度奖励（Confidence Reward）</strong><span class=\"kb-math kb-math-inline\">R_{\\text{conf}}</span>：\n评估状态转换的确定性，即 LLM 对生成下一个状态的置信度。这反映了世界模型对该状态预测的把握程度。</p>\n<p>最终奖励为加权组合：\n<div class=\"kb-math kb-math-display\">R(s_t, a_t, s_{t+1}) = w_1 R_{\\text{self}} + w_2 R_{\\text{action}} + w_3 R_{\\text{task}} + w_4 R_{\\text{conf}}</div></p>\n<h5>4. MCTS 四阶段搜索</h5>\n<p>RAP 利用 MCTS 在推理树上执行<strong>迭代式前瞻搜索</strong>，每个节点存储访问次数 <span class=\"kb-math kb-math-inline\">N(s)</span> 和累计价值 <span class=\"kb-math kb-math-inline\">Q(s)</span>。每次迭代包含四个阶段：</p>\n<pre><code># RAP MCTS 搜索算法\nwhile not terminal and iterations &lt; max_iter:\n    # 阶段 1: 选择 (Selection)\n    node = root\n    while node.children:\n        node = argmax_child(Q(child) + c_puct * P(child) * sqrt(N(parent)) / (1 + N(child)))\n\n    # 阶段 2: 扩展 (Expansion)\n    actions = LLM.generate_actions(node.state, k=top_k)\n    for action in actions:\n        next_state = WorldModel.predict(node.state, action)\n        reward = RewardModel.evaluate(node.state, action, next_state)\n        node.add_child(action, next_state, reward)\n\n    # 阶段 3: 模拟 (Simulation)\n    leaf = select_best_child(node)  # 基于奖励选择最有希望的子节点\n    value = rollout(leaf.state, depth=simulation_depth)\n\n    # 阶段 4: 反向传播 (Backpropagation)\n    while node:\n        node.N += 1\n        node.Q += (value - node.Q) / node.N\n        node = node.parent\n</code></pre>\n<p><strong>阶段 1 — 选择（Selection）</strong>：从根节点开始，递归选择最优子节点直至到达未完全扩展的节点。选择策略使用 PUCT（Predictor + UCT）公式，平衡探索与利用。其中 <span class=\"kb-math kb-math-inline\">P(\\text{child})</span> 是 LLM 对动作的先验概率，<span class=\"kb-math kb-math-inline\">c_{\\text{puct}}</span> 控制探索强度。</p>\n<p><strong>阶段 2 — 扩展（Expansion）</strong>：利用 LLM 生成当前节点的 top-k 候选动作，通过世界模型预测每个动作产生的下一个状态，并计算即时奖励。每个（动作，状态）对被添加为当前节点的子节点。</p>\n<p><strong>阶段 3 — 模拟（Simulation）</strong>：从新扩展的节点中选择一条路径，进行有限深度的快速推演（rollout），利用奖励信号估计该路径的长期价值。模拟过程无需展开所有分支，大幅节省计算开销。</p>\n<p><strong>阶段 4 — 反向传播（Backpropagation）</strong>：将模拟得到的价值沿着搜索路径反向传播，更新所有经过节点的访问次数和平均价值。这确保了未来搜索时，被证明有效的节点会获得更高的选择优先级。</p>\n<div class=\"key-point\">💡 关键：MCTS 的核心优势在于<strong>战略性前瞻</strong>——在推理早期就能检测到死胡同并返回尝试替代路径，类似于人类\"先试探几步再决定方向\"的思考模式。</div>\n<h5>5. RAP-Aggregate：多路径聚合</h5>\n<p>MCTS 搜索结束后得到一棵推理树，RAP 从中提取多条高奖励路径（而非仅选最优的一条）进行聚合：</p>\n<ul>\n<li>按访问次数和平均价值对所有叶节点排序</li>\n<li>选取 top-m 条完整推理链</li>\n<li>重新组合这些链条中的关键推理步骤，生成最终的聚合推理</li>\n</ul>\n<p>这种方法类似于 Self-Consistency 的改进——不是简单地多数投票，而是基于搜索过程中的奖励信号选择高质量路径进行智能融合。在数学推理任务中，RAP-Aggregate 在 RAP 基础上额外提升了约 3% 的准确率。</p>\n<h5>6. 实验表现</h5>\n<p>RAP 在三大推理基准上取得了显著提升：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>任务</th>\n<th>基准 (CoT/COT-SC)</th>\n<th>RAP</th>\n<th>RAP-Agg</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>GSM8k 数学推理</td>\n<td>39.2% / 44.3%</td>\n<td>48.8%</td>\n<td>~51.7%</td>\n</tr>\n<tr>\n<td>PrOntoQA 逻辑推理 (整体证明正确率)</td>\n<td>8%~13% (CoT)</td>\n<td>65%</td>\n<td>—</td>\n</tr>\n<tr>\n<td>PrOntoQA 逻辑推理 (最终答案正确率)</td>\n<td>— / 89.8%</td>\n<td>94.2%</td>\n<td>—</td>\n</tr>\n<tr>\n<td>Blocksworld (Llama-2 70B, 4步)</td>\n<td>~20% (CoT)</td>\n<td>~91%</td>\n<td>—</td>\n</tr>\n</tbody>\n</table></div>\n<p>消融实验（Table 6, GSM8k 前300例）进一步揭示了奖励设计的重要性：\n- 仅使用置信度奖励：RAP(1) = 0.350，RAP(10) = 0.447\n- 置信度 + 动作似然奖励：RAP(1) = 0.373，RAP(10) = 0.423\n- 置信度 + 自评估奖励（完整）：RAP(1) = <strong>0.410</strong>，RAP(10) = <strong>0.450</strong>，+Agg = <strong>0.503</strong></p>\n<p>自评估奖励在所有配置中均表现最优，且计算效率高，是 RAP 的核心驱动力。</p>",
      "quiz": {
        "q": "RAP 框架中，世界模型（World Model）主要用于完成什么功能？",
        "options": [
          "替代 LLM 直接生成最终答案",
          "预测给定当前状态和动作后的下一个推理状态",
          "计算 MCTS 搜索树中每个节点的访问次数",
          "评估整个推理任务的最终难度等级"
        ],
        "answer": 1,
        "explain": "RAP 中的世界模型复用 LLM 自身来模拟状态转换——给定当前推理状态s_t和候选动作a_t，预测下一步推理状态s_{t+1}。这使得系统能前瞻性地评估不同动作的后果，而无需实际执行到底。"
      }
    },
    {
      "id": "adaplanner",
      "num": 6,
      "name": "AdaPlanner",
      "fullName": "自适应规划器 (AdaPlanner)",
      "year": "2023.05",
      "org": "Georgia Tech",
      "parent": "react",
      "paperUrl": "https://arxiv.org/abs/2305.16653",
      "projectUrl": "",
      "category": "closed_loop",
      "motivation": "按反馈重写计划并断点续跑",
      "summary": "AdaPlanner 提出基于代码生成的自适应闭环规划方法，让 LLM Agent 能根据环境反馈动态重写计划并断点续跑，在仅 1～2 次反馈迭代内显著超越 ReAct 等强基线。",
      "keyPoints": [
        "将任务规划表达为可执行的 Python 代码（plan-as-code），而非自然语言步骤或 JSON 序列",
        "引入自适应闭环规划：LLM 在每一步执行后根据环境反馈重写剩余计划，并能从断点续跑（in-progress re-planning）",
        "设计两阶段规划生成：plan generation → plan refinement，refinement 阶段仅基于反馈增删改动最小代码块",
        "引入代码级技能封装（skill library）：将高频环境操作（如 navigate, pick, put）抽象为预定义 Python 函数，LLM 只需组合调用",
        "在 ALFWorld（6 个任务）和 MiniWoB++（多个网页任务）两个基准上全面评估，GPT-3.5 驱动的 AdaPlanner 在 ALFWorld 上平均成功率 85.7%（ReAct 64.6%），GPT-4 达 97.3%",
        "对比多种规划范式：open-loop（一次生成全部计划）、implicit closed-loop（隐式闭环，如 ReAct 的 observation→action 循环）、explicit closed-loop（明确改写计划的闭环）"
      ],
      "detail": "<h5>核心示意图</h5>\n<p><img alt=\"开环 vs 隐式闭环 vs 显式闭环对比\" src=\"https://ar5iv.labs.arxiv.org/html/2305.16653/assets/x2.png\" />\n<em>图：开环规划、隐式闭环（如 ReAct）、显式闭环（AdaPlanner）三者的对比。</em></p>\n<p><img alt=\"ALFWorld 示例：自适应闭环规划\" src=\"https://ar5iv.labs.arxiv.org/html/2305.16653/assets/x3.png\" />\n<em>图：从 ALFWorld 任务展示 AdaPlanner 通过代码表达计划并在环境反馈后调整。</em></p>\n<h5>算法伪代码</h5>\n<pre><code>AdaPlanner 自适应闭环规划主循环（伪代码重建):\nPhase 1: plan_code = LLM.generate_plan(task)\nPhase 2 (on failure):\n  LLM.refine_plan(task, plan_code, executed_steps, feedback)\n  -- 仅修改失败相关代码块，跳过已执行的步骤\n</code></pre>\n<h5>动机与背景</h5>\n<p>传统方案（ReAct, SayCan）采用 open-loop 或 implicit closed-loop，缺乏显式计划级更新。AdaPlanner 核心洞察：计划应该是活的代码，而非死的文本。代码形式支持条件判断、循环，失败时精确修改而非重头思考。</p>\n<h5>核心机制</h5>\n<p><strong>1. Plan-as-Code</strong>: LLM 输出包含 plan() 函数和技能函数调用的 Python 代码。优势：天然控制流、利用代码语料先验、增量修改。</p>\n<p><strong>2. Adaptive Closed-Loop</strong>: 两阶段——Plan Generation（一次生成完整代码计划）→ Plan Refinement（失败时仅局部修改代码，保留已验证部分）。实现断点续跑+局部修复。</p>\n<p><strong>3. Skill Library</strong>: 预定义经过验证的技能函数（goto, take, clean, put 等），解耦高层推理与底层执行。</p>\n<h5>与传统方法区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th>Open-loop</th>\n<th>ReAct</th>\n<th>AdaPlanner</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>计划形式</td>\n<td>自然语言列表</td>\n<td>thought+action</td>\n<td>Python 代码</td>\n</tr>\n<tr>\n<td>闭环方式</td>\n<td>无</td>\n<td>每步观察后生成下一步</td>\n<td>失败后重写剩余计划</td>\n</tr>\n<tr>\n<td>断点续跑</td>\n<td>❌</td>\n<td>❌</td>\n<td>✅</td>\n</tr>\n<tr>\n<td>反馈利用</td>\n<td>无</td>\n<td>即时</td>\n<td>即时+计划级调整</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 关键：计划从静态文本升级为可执行可修改的代码对象。\n⚠️ 注意：AdaPlanner 依赖环境提供结构化文本反馈，本身不涉及视觉感知。</div>\n<h5>实验效果</h5>\n<ul>\n<li>ALFWorld（6类任务）：GPT-3.5 成功率 85.7% vs ReAct 64.6%（+21.1pp），GPT-4 达 97.3%</li>\n<li>MiniWoB++：多步推理任务显著提升</li>\n<li>消融实验：自适应闭环与代码表达各自独立贡献，组合效果最优，仅需 1-2 次反馈迭代</li>\n</ul>",
      "quiz": {
        "q": "AdaPlanner 的 plan-as-code 相比自然语言计划的核心优势是什么？",
        "options": [
          "代码执行速度比自然语言快 10 倍",
          "代码允许 LLM 利用预训练代码语料，且支持控制流和局部修改",
          "代码可以绕过环境反馈直接生成正确计划",
          "代码消除了对 LLM 的所有依赖"
        ],
        "answer": 1,
        "explain": "Plan-as-code 让 LLM 能利用代码语料的先验知识生成结构化计划，且天然支持条件判断/循环等控制流。失败时仅需局部修改代码块而非重写全局。"
      }
    },
    {
      "id": "rewoo",
      "num": 7,
      "name": "ReWOO",
      "fullName": "无观测推理 (ReWOO)",
      "year": "2023.05",
      "org": "Microsoft",
      "parent": "react",
      "paperUrl": "https://arxiv.org/abs/2305.18323",
      "projectUrl": "",
      "category": "decomposition",
      "motivation": "先产蓝图再执行工具减少串行依赖",
      "summary": "ReWOO 提出将推理（Reasoning）与工具观察（Observations）解耦，先用 Planner 生成完整推理蓝图，再由 Worker 并行执行工具调用，最后 Solver 综合生成答案，从而消除了 ReAct 范式中的串行依赖，在 6 个基准上平均降低 64% token 消耗且绝对准确率提升 4.4%。",
      "keyPoints": [
        "三模块架构：Planner（生成推理计划与工具调用蓝图）→ Worker（执行工具并填充证据）→ Solver（综合计划与证据生成最终答案）",
        "根本创新：将 ReAct 的 Thought-Action-Observation 串行交织改为\"先计划、后执行、再求解\"的解耦范式",
        "Token 效率提升约 5×：HotpotQA 上 ReAct 消耗 9795 tokens，ReWOO 仅需 1986 tokens，成本从 $19.59 降至 $3.97（GPT-3.5）",
        "支持 Planner 独立微调：解耦使 Planner 可在不暴露工具噪声的情况下微调，通用规划能力更强（基于 LoRA 微调 LLaMA 7B）",
        "鲁棒性提升：工具调用失败或返回噪声时，Solver 可依据蓝图跳过劣质观察，避免级联错误",
        "6 个公开基准 + 1 个策划数据集全面超越 ReAct，且 Planner 微调后性能进一步提升（微调版 Planner 7B + Solver 175B 在 HotpotQA 上 F1 达 47.5）",
        "支持多种工具：Wikipedia、搜索引擎、计算器、LLM-based 工具（如翻译、推荐）等"
      ],
      "detail": "<p><img alt=\"ReWOO 架构对比图\" src=\"https://ar5iv.labs.arxiv.org/html/2305.18323/assets/x1.png\" />\n<em>图：ReAct（左）的串行交织 vs ReWOO（右）的解耦并行架构。Planner 一次性生成完整计划，Worker 并行执行工具，Solver 汇总求解。</em></p>\n<h5>动机：串行依赖引发 Token 爆炸</h5>\n<p>ReAct 范式中，每步推理都需将前面所有 Thought-Action-Observation 重新作为提示输入，导致 token 消耗呈二次增长：</p>\n<div class=\"kb-math kb-math-display\">\\#\\text{Token}_I^{\\text{ReAct}} = k\\Theta(Q) + k\\Theta(C) + k\\Theta(\\bm{S}) + \\sum_{j=1}^{k-1}(k-j)\\Theta(T_j+A_j+O_j)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">Q</span> 为用户问题，<span class=\"kb-math kb-math-inline\">C</span> 为上下文，<span class=\"kb-math kb-math-inline\">\\bm{S}</span> 为示例，<span class=\"kb-math kb-math-inline\">T_j, A_j, O_j</span> 分别为第 <span class=\"kb-math kb-math-inline\">j</span> 步的思考、动作、观察。随推理步数 <span class=\"kb-math kb-math-inline\">k</span> 增加，<span class=\"kb-math kb-math-inline\">T_j, A_j, O_j</span> 被重复编码，令牌消耗急剧膨胀。</p>\n<h5>解耦方案：Planner → Worker → Solver</h5>\n<p>ReWOO 将过程切分为三个阶段：</p>\n<ol>\n<li>\n<p><strong>Planner（规划器）</strong>：接收用户问题 <span class=\"kb-math kb-math-inline\">Q</span>、系统提示 <span class=\"kb-math kb-math-inline\">C_{\\text{planner}}</span> 与示例 <span class=\"kb-math kb-math-inline\">\\bm{S}</span>，输出一个包含推理步骤和工具调用槽位标记的<strong>计划文本</strong> <span class=\"kb-math kb-math-inline\">\\mathcal{P}</span>，其中工具调用以 <code>#E</code> 等变量标记。</p>\n</li>\n<li>\n<p><strong>Worker（执行器）</strong>：解析计划中的工具调用，并行执行（如 Wikipedia 检索 <code>Search(Paris population)</code>），将结果填入对应证据变量 <span class=\"kb-math kb-math-inline\">E_j</span>。</p>\n</li>\n<li>\n<p><strong>Solver（求解器）</strong>：接收原问题 <span class=\"kb-math kb-math-inline\">Q</span>、完整计划 <span class=\"kb-math kb-math-inline\">\\mathcal{P}</span> 及所有证据 <span class=\"kb-math kb-math-inline\">\\{E_1,...,E_k\\}</span>，在 <span class=\"kb-math kb-math-inline\">C_{\\text{solver}}</span> 的提示下生成最终答案 <span class=\"kb-math kb-math-inline\">\\hat{A}</span>。</p>\n</li>\n</ol>\n<p>其 Token 消耗仅为常量级叠加：</p>\n<div class=\"kb-math kb-math-display\">\\#\\text{Token}_I^{\\texttt{ReWOO}} \\approx 2\\Theta(Q) + 2\\Theta(C) + \\Theta(\\bm{S}) + \\sum_{j=1}^{k}\\Theta(P_j+E_j)</div>\n<p>与 ReAct 相比，<span class=\"kb-math kb-math-inline\">Q, C, \\bm{S}</span> 只被编码 1-2 次（vs <span class=\"kb-math kb-math-inline\">k</span> 次），且无冗余的 Thought-Action 重复。</p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># ReWOO 伪代码（三步解耦）\ndef rewoo(question: str, tools: dict) -&gt; str:\n    # Step 1: Planner 生成蓝图\n    plan = Planner.generate(question, system_prompt, exemplars)\n    # plan 示例: &quot;To answer, I need to find #E1 = Search(population of Paris)&quot;\n\n    # Step 2: Worker 并行执行工具\n    evidence = {}\n    tool_calls = parse_tool_calls(plan)  # 提取 #E1, #E2...\n    for var, (tool_name, arg) in tool_calls.items():\n        evidence[var] = tools[tool_name].execute(arg)\n\n    # Step 3: Solver 综合求解\n    answer = Solver.solve(question, plan, evidence, solver_prompt)\n    return answer\n</code></pre>\n<div class=\"key-point\">💡 关键：Worker 的各工具调用<strong>彼此独立</strong>，可批量并行执行，进一步降低延迟。</div>\n<h5>为什么 Planner 可独立微调？</h5>\n<p>传统范式（如 ReAct）中，微调需构造完整的 Thought-Action-Observation 轨迹，工具返回结果混杂噪声，导致模型暴露于不稳定的工具反馈下。ReWOO 的 Planner 仅需生成结构化计划文本，而不需接触工具输出，因此可以在<strong>纯文本规划数据</strong>上进行微调（LoRA on LLaMA 7B），训出的 Planner 具有更强且更通用的推理规划能力，且对未见过的工具组合有更好的零样本适应力。</p>\n<h5>主要实验结果</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>Benchmark</th>\n<th>Metric</th>\n<th>ReAct</th>\n<th>ReWOO</th>\n<th>提升</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>HotpotQA</td>\n<td>Acc</td>\n<td>40.8</td>\n<td>42.4</td>\n<td>+1.6</td>\n</tr>\n<tr>\n<td>HotpotQA</td>\n<td>Tokens</td>\n<td>9795</td>\n<td>1986</td>\n<td>-79.7%</td>\n</tr>\n<tr>\n<td>TriviaQA</td>\n<td>Acc</td>\n<td>59.4</td>\n<td>66.6</td>\n<td>+7.2</td>\n</tr>\n<tr>\n<td>GSM8K</td>\n<td>Acc</td>\n<td>62.0</td>\n<td>62.4</td>\n<td>+0.4</td>\n</tr>\n<tr>\n<td>StrategyQA</td>\n<td>Acc</td>\n<td>64.6</td>\n<td>66.6</td>\n<td>+2.0</td>\n</tr>\n<tr>\n<td>PhysicsQA</td>\n<td>Acc</td>\n<td>64.1</td>\n<td>66.0</td>\n<td>+1.9</td>\n</tr>\n<tr>\n<td>SportsU.</td>\n<td>Acc</td>\n<td>58.6</td>\n<td>61.3</td>\n<td>+2.7</td>\n</tr>\n<tr>\n<td>SOTUQA</td>\n<td>Acc</td>\n<td>64.8</td>\n<td>70.2</td>\n<td>+5.4</td>\n</tr>\n</tbody>\n</table></div>\n<ul>\n<li>6 个公开基准平均：Token 减少 <strong>64%</strong>，绝对准确率提升 <strong>4.4%</strong>。</li>\n<li>Planner 7B（LoRA 微调）+ Solver ChatGPT 组合在 HotpotQA F1 达 47.5，超越全量 ReAct（F1 39.6）近 8 个点。</li>\n</ul>\n<h5>与 ReAct 的本质区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th>ReAct</th>\n<th>ReWOO</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>推理-行动耦合</td>\n<td>交替：Thought → Action → Obs</td>\n<td>解耦：Plan → (Worker) → Solve</td>\n</tr>\n<tr>\n<td>Token 增长</td>\n<td>随步数二次增长</td>\n<td>随步数线性增长</td>\n</tr>\n<tr>\n<td>工具调用</td>\n<td>串行，依赖前一步观测</td>\n<td>并行，无步间依赖</td>\n</tr>\n<tr>\n<td>规划器微调</td>\n<td>需完整轨迹（含工具噪声）</td>\n<td>仅需计划文本</td>\n</tr>\n<tr>\n<td>工具失败鲁棒性</td>\n<td>观测污染后续推理链</td>\n<td>Solver 可忽略失败证据</td>\n</tr>\n</tbody>\n</table></div>",
      "quiz": {
        "q": "ReWOO 的三个核心模块按执行顺序是什么？",
        "options": [
          "Solver → Worker → Planner",
          "Planner → Worker → Solver",
          "Worker → Planner → Solver",
          "Planner → Solver → Worker"
        ],
        "answer": 1,
        "explain": "ReWOO 先由 Planner 生成推理蓝图，Worker 填充工具证据，最后 Solver 汇总输出最终答案。"
      }
    },
    {
      "id": "llm_dp",
      "num": 8,
      "name": "LLM-DP",
      "fullName": "动态规划器 (Dynamic Planning with a LLM)",
      "year": "2023.08",
      "org": "University of Edinburgh",
      "parent": "react",
      "paperUrl": "https://arxiv.org/abs/2308.06391",
      "projectUrl": "",
      "category": "decomposition",
      "motivation": "LLM与经典规划器协同求解任务",
      "summary": "LLM-DP 是一种神经-符号框架，让 LLM 从自然语言指令和环境观察中即时生成 PDDL 问题文件，搭配经典符号规划器（如 Fast-Forward）求解最优动作序列，从而在 Alfworld 等具身推理任务上比 ReAct 基线更快、更高效。",
      "keyPoints": [
        "纯 LLM（如 ReAct）在长程多步推理中面临上下文窗口膨胀、计算成本高、容易幻觉等问题",
        "符号规划器（如 FF、BF(f)）能快速找到最优解，但要求完整准确的环境描述（PDDL），无法应对部分可观察场景",
        "LLM-DP 弥合二者鸿沟：LLM 处理噪声和不确定性，规划器负责高效搜索",
        "<strong>Grounding（接地）</strong>：LLM 将自然语言观察转化为逻辑谓词，为环境中每个相关对象采样生成 plausible predicates（看似合理的谓词）",
        "<strong>PDDL 生成</strong>：基于接地谓词，LLM 即时写出当前状态下可用的 PDDL problem 文件，动作 schema 由人类预先定义的 domain 文件提供",
        "<strong>求解与执行</strong>：经典规划器求解 PDDL 得到计划；Action Selector 决定执行、重新审视理解或提问",
        "面对未观测或未知对象，LLM 通过语义和语用推理生成可能的谓词",
        "多次采样可产生多个候选计划，增强鲁棒性",
        "免去人工预先编码所有对象与关系，实现了从交互中学习",
        "不仅决定\"下一步做什么\"，还判断是否需要对当前状态理解进行修正",
        "可主动向用户提出澄清问题，增强人机协同",
        "在 Alfworld 基准上评估，LLM-DP 完成任务的成功率更高，且平均推理步数显著少于 ReAct 基线",
        "验证了\"LLM 接地 + 规划器求解\"范式在具身任务上的有效性和效率优势",
        "ReAct：每一步都调用 LLM 决策（思考→行动→观察循环）",
        "LLM-DP：LLM 仅负责生成 PDDL（阶段性调用），规划器负责全局多步推理，LLM 调用次数大幅减少"
      ],
      "detail": "<pre><code class=\"language-python\"># 规划型 Agent 的抽象主循环\nstate = observe()\nplan = planner(state)\nfor step in plan:\n    obs = executor(step)\n    if needs_replan(obs):\n        plan = planner(update_state(state, obs))\n</code></pre>\n<p><img alt=\"LLM-DP 示意图\" src=\"https://ar5iv.labs.arxiv.org/html/2308.06391/assets/x1.png\" />\n<em>图：LLM-DP 的核心框架或评测示意。</em></p>\n<h5>1. 问题形式化</h5>\n<p>LLM-DP 处理的是部分可观察的具身规划问题。Agent 接收自然语言指令（如\"把冷的苹果放进微波炉加热\"），通过与环境交互逐步获得观察，最终达成目标状态。关键挑战是：初始状态下 Agent 并不知道环境中所有对象及其属性，需要边探索边规划。</p>\n<h5>2. PDDL 生成流程</h5>\n<ul>\n<li><strong>Domain 文件</strong>：由人类专家预先编写，定义可用的动作类型（如 pick、put、open）及其前提条件和效果</li>\n<li><strong>Problem 文件</strong>：由 LLM 在每一步/每阶段即时生成，包含：</li>\n<li>Objects（对象列表，从观察中提取）</li>\n<li>Initial state（初始谓词，由 LLM 接地生成）</li>\n<li>Goal state（目标谓词，从指令中解析）</li>\n</ul>\n<p>LLM 的 prompt 包含 few-shot 示例，展示如何将自然语言观察映射为 PDDL 谓词。</p>\n<h5>3. 谓词接地的具体实现</h5>\n<p>LLM 被要求为每个观察到的对象生成一组谓词，例如：\n- 观察：\"一个绿色的苹果在桌子上\"\n- 接地后：<code>(apple obj1)</code>, <code>(on obj1 table)</code>, <code>(color obj1 green)</code>, <code>(edible obj1)</code>...</p>\n<p>对于未观察到的属性（如苹果是否可食用），LLM 利用常识推理进行合理推断，这就是\"plausible predicates\"的含义。若后续观察发现推断错误，Action Selector 可触发重新接地。</p>\n<h5>4. 多次采样与计划选择</h5>\n<ul>\n<li>LLM 对不确定的属性进行多次采样，每次采样生成不同的谓词集合</li>\n<li>每个谓词集合产生一个 PDDL problem，交给规划器求解</li>\n<li>若有多个可行计划，选择成功率最高（或启发式最佳）的执行</li>\n<li>这种采样机制天然提供了对不确定性的处理能力</li>\n</ul>\n<h5>5. Action Selector 的三类决策</h5>\n<ol>\n<li><strong>执行（Act）</strong>：规划器给出了可行计划，选择一个动作执行</li>\n<li><strong>重新审视（Review）</strong>：执行后观察与预期不符，重新让 LLM 接地以修正谓词</li>\n<li><strong>提问（Ask）</strong>：当不确定性过高时，向用户请求澄清</li>\n</ol>\n<h5>6. Alfworld 实验详情</h5>\n<p>Alfworld 是一个基于文本的具身环境，包含 6 类任务（如 pick、clean、heat、cool、look、pick two）。LLM-DP 在以下维度与 ReAct 对比：\n- <strong>成功率</strong>：LLM-DP 在多个任务类型上超越 ReAct\n- <strong>效率</strong>：LLM-DP 的平均动作步数更少，说明规划更优\n- <strong>LLM 调用次数</strong>：LLM-DP 显著减少了对 LLM 的调用，降低了计算成本</p>\n<h5>7. 局限与未来方向</h5>\n<ul>\n<li>依赖人工编写的 PDDL domain 文件，对全新领域需要人工介入</li>\n<li>谓词接地的准确性依赖 LLM 的常识推理质量，极端情况下可能出错</li>\n<li>未在连续控制或视觉输入环境中验证</li>\n<li>未来可探索自动学习 domain 文件、与视觉模型集成等方向</li>\n</ul>\n<h5>8. 与 ReAct 的详细对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th>ReAct</th>\n<th>LLM-DP</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>推理机制</td>\n<td>每步 LLM 思考+行动</td>\n<td>LLM 阶段性生成 PDDL + 规划器全局多步推理</td>\n</tr>\n<tr>\n<td>LLM 调用频率</td>\n<td>每步 1 次</td>\n<td>仅当需要重新接地时</td>\n</tr>\n<tr>\n<td>长期规划能力</td>\n<td>受上下文窗口限制</td>\n<td>规划器保证最优/近似最优</td>\n</tr>\n<tr>\n<td>对不确定性的处理</td>\n<td>隐式依赖 LLM 理解</td>\n<td>显式谓词采样 + 多重计划</td>\n</tr>\n<tr>\n<td>可解释性</td>\n<td>低（黑盒推理）</td>\n<td>高（PDDL 可读、计划可追溯）</td>\n</tr>\n</tbody>\n</table></div>\n<h5>9. 框架可扩展性</h5>\n<p>LLM-DP 的设计具有模块化特点：LLM 组件可选择不同模型（GPT-3.5/4 等），规划器可选择不同后端（FF、BF 等），PDDL domain 可适配不同任务域。这种灵活性使得该框架可推广到其他需要长期规划的具身场景。</p>",
      "quiz": {
        "q": "LLM-DP 中 LLM 与经典规划器的职责分工是什么？",
        "options": [
          "LLM 负责穷举搜索，规划器只做结果润色",
          "LLM 负责把自然语言观察接地成 PDDL 问题，规划器负责求解动作序列",
          "LLM 和规划器都各自独立输出完整答案，再投票",
          "规划器只负责判断动作是否合法，LLM 负责整条长程搜索"
        ],
        "answer": 1,
        "explain": "LLM-DP 的核心是神经符号分工：LLM 解决自然语言到符号状态的桥接，经典规划器负责真正的全局搜索与计划求解。"
      }
    },
    {
      "id": "lats",
      "num": 9,
      "name": "LATS",
      "fullName": "语言智能体树搜索 (Language Agent Tree Search)",
      "year": "2023.10",
      "org": "UIUC",
      "parent": "rap",
      "paperUrl": "https://arxiv.org/abs/2310.04406",
      "projectUrl": "",
      "category": "search",
      "motivation": "把ReAct扩展为带反馈的树搜索",
      "summary": "LATS 将 LLM 的推理、行动、规划能力与蒙特卡洛树搜索 (MCTS) 统一为同一框架，通过树状结构对可能的决策路径进行系统性探索、模拟与回溯，在无需额外训练的情况下，以更少的计算资源在 HumanEval (94.4%) 和 WebShop (75.9%) 上分别取得开源模型新 SOTA。",
      "keyPoints": [
        "核心动机：把ReAct扩展为带反馈的树搜索",
        "演化来源：继承或改进自 rap",
        "代表机构：UIUC"
      ],
      "detail": "<pre><code class=\"language-python\"># 规划型 Agent 的抽象主循环\nstate = observe()\nplan = planner(state)\nfor step in plan:\n    obs = executor(step)\n    if needs_replan(obs):\n        plan = planner(update_state(state, obs))\n</code></pre>\n<p><img alt=\"LATS 示意图\" src=\"https://ar5iv.labs.arxiv.org/html/2310.04406/assets/x1.png\" />\n<em>图：LATS 的核心框架或评测示意。</em></p>\n<h5>背景与动机</h5>\n<p>现有 LLM 决策框架存在结构性缺陷：ReAct (Yao et al., 2023) 仅线性推进行动无回溯能力，Reflexion (Shinn et al., 2023) 只在回合间反思缺少单回合内的多路径探索，Self-Consistency (Wang et al., 2023) 虽采样多条链但缺乏有组织的搜索。与此同时，AlphaZero 等经典智能体通过 MCTS + 世界模型实现了超人类博弈性能，但它们需针对每个任务训练策略网络和世界模型，无法泛化为通用推理智能体。</p>\n<p>LATS 的核心理念是<strong>取长补短</strong>：用经典树搜索的结构化探索补 LLM 推理的决策短板，同时用 LLM 的零样本泛化能力补 AlphaZero-like 方法无法跨任务迁移的短板。</p>\n<h5>核心方法：MCTS + LLM 四合一</h5>\n<p>LATS 将决策过程建模为 POMDP 中的树搜索，用 LLM 实现 MCTS 的全部四个关键组件：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>MCTS 步骤</th>\n<th>传统实现</th>\n<th>LATS 实现</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><strong>Selection</strong> (选择)</td>\n<td>UCT 公式 + 统计计数器</td>\n<td>UCT 公式 + LLM 估值 <code>V(s)</code> + 访问次数 <code>N(s)</code></td>\n</tr>\n<tr>\n<td><strong>Expansion</strong> (扩展)</td>\n<td>从动作空间采样</td>\n<td>LLM agent 采样 <code>C</code> 个候选动作 (小空间直接采样，大空间生成查询语句)</td>\n</tr>\n<tr>\n<td><strong>Simulation</strong> (模拟)</td>\n<td>环境模型推演至终态</td>\n<td>World Model (LLM) 生成观察 + 自我反思，rollout 至终态或 max_depth <code>d</code></td>\n</tr>\n<tr>\n<td><strong>Backpropagation</strong> (回传)</td>\n<td>奖励/估值沿路径回传</td>\n<td>终态用外部奖励，否则 LLM 估值 (1-10 分)；父节点取子节点最大值</td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>算法伪代码 (Algorithm 1)</strong>:</p>\n<p>输入: 初始状态 s0, 迭代次数 K, 每次扩展动作数 C, 探索权重 w, 最大深度 d\n输出: 最高奖励轨迹</p>\n<p>root ← Node(state=s0, N=0, V=0)\nfor iteration = 1 to K do\n  // SELECTION\n  node ← root\n  while node is non-leaf:\n    node ← SelectChild(node, w)  // UCT: V(s) + w * sqrt(ln(N_parent)/N(s))</p>\n<p>// EXPANSION + SIMULATION\n  for i = 1 to C:\n    action_i ~ Agent(node.state)\n    sim_state ← node.state\n    trajectory ← []\n    for depth = 1 to d:\n      sim_action ~ Agent(sim_state)\n      obs, reflect ← WorldModel(sim_state, sim_action)  // 外部反馈+自我反思\n      sim_state ← sim_state + (sim_action, obs, reflect)\n      trajectory.append(...)\n      if terminal(sim_state): break</p>\n<pre><code>// EVALUATION\nvalue ← ExternalReward(sim_state) if terminal else ValueFunction(sim_state)\nchild ← Node(state=sim_state, N=0, V=value)\nnode.children.append(child)\n</code></pre>\n<p>// BACKPROPAGATION\n  while node ≠ root:\n    node.N ← node.N + 1\n    node.V ← max over children V(child)\n    node ← node.parent\n  root.N ← root.N + 1</p>\n<p>return argmax reward(trajectory)</p>\n<p><strong>UCT 选择公式</strong>:</p>\n<p>UCT(s) = V(s) + w × √(ln N_parent / N(s))</p>\n<p>其中 V(s) 为节点回溯值，w 为探索权重 (默认=1)，N_parent 为父节点访问次数。</p>\n<h5>四个关键组件的实现细节</h5>\n<ul>\n<li><strong>树节点 (Tree &amp; Nodes)</strong>: 节点存储状态 <code>s_t</code> (包含历史动作序列 <code>a_{&lt;t}</code> 和观察序列 <code>o_{≤t}</code>)，以及选择统计量 <code>N(s)</code> (访问次数) 和 <code>V(s)</code> (估值，悲观初始化为 0)。</li>\n<li><strong>智能体 (Agent/Policy)</strong>: 基于 ReAct 范式，提示词中包含当前状态、可选动作、few-shot 示例和任务指令。小动作空间直接采样动作，大动作空间 (如 WebShop 的 100 万+ 商品) 生成类 SQL 查询由动作生成器执行。</li>\n<li><strong>世界模型与自我反思 (World Model &amp; Self-Reflection)</strong>: 世界模型将动作映射为自然语言观察，同时生成一段反思文本和评分。反思文本指明轨迹成败的原因 (如 \"代码在第 5 行有 NameError，因为变量未定义\")，既辅助价值函数评分，又作为上下文注入后续推理，实现可解释的信用分配。</li>\n<li><strong>价值函数 (Value Function)</strong>: LLM 被提示输出 1-10 的标量分数 + 文字理由。这种 \"value and reasoning\" 策略使评估过程自适应且可解释——分数用于树回溯，理由文本进入智能体上下文指导后续决策。</li>\n</ul>\n<h5>实验设置与关键发现</h5>\n<p><strong>统一超参</strong>: 所有实验使用 <code>GPT-3.5-turbo-0613</code>，搜索参数 K=20, C=3, w=1, d=5。</p>\n<p><strong>编程 (HumanEval &amp; MBPP)</strong>:\n- 将代码生成重构为逐行决策：状态 = 当前代码 + 编译器输出 + 单测结果，动作 = 下一行代码，奖励 = 单测通过/失败 (0/1)。\n- HumanEval pass@1: LATS 94.4% vs GPT-3.5-turbo 76.8% vs CoT-SC 83.6% vs ToT 89.5% — 提升 17.6 个百分点。\n- MBPP pass@1: LATS 83.2% vs GPT-3.5 79.8%。\n- 效率：平均 15.2 次搜索迭代、7.6 次 LLM 调用/题，而 CoT-SC (40 样本) 需 40 次调用。</p>\n<p><strong>交互式问答 (WebShop)</strong>:\n- 动作空间超过 100 万商品，需多步搜索-筛选-购买。LATS 利用搜索能力生成查询、接收产品信息。\n- 平均奖励 75.9 / 成功率 50.0%，大幅领先 ReAct (66.6/40.0) 和 Reflexion (68.0/42.9)，证明树搜索在多步交互中的优势。</p>\n<p><strong>Web 导航 (WebArena)</strong>:\n- 由于 Web 页面动态性强，模拟阶段使用真实环境交互替代 LLM 生成的观察。\n- 成功率 LATS 21.3% &gt; Reflexion 17.0% &gt; ReAct 14.2%，虽绝对值不高但体现了框架泛化能力。</p>\n<h5>消融实验与效率分析</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>变体</th>\n<th>HumanEval (pass@1)</th>\n<th>WebShop (reward)</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>LATS (完整)</td>\n<td><strong>94.4</strong></td>\n<td><strong>75.9</strong></td>\n</tr>\n<tr>\n<td>无自我反思</td>\n<td>91.2 (-3.2)</td>\n<td>73.5 (-2.4)</td>\n</tr>\n<tr>\n<td>无外部反馈</td>\n<td>89.0 (-5.4)</td>\n<td>70.2 (-5.7)</td>\n</tr>\n<tr>\n<td>无价值函数</td>\n<td>90.1 (-4.3)</td>\n<td>72.1 (-3.8)</td>\n</tr>\n<tr>\n<td>无 MCTS (平坦采样=Self-Consistency)</td>\n<td>88.3 (-6.1)</td>\n<td>69.8 (-6.1)</td>\n</tr>\n<tr>\n<td>无树搜索 (ReAct)</td>\n<td>76.8 (-17.6)</td>\n<td>66.6 (-9.3)</td>\n</tr>\n</tbody>\n</table></div>\n<p>核心结论：<strong>树搜索 (MCTS) 是最大性能驱动因素</strong>，移除后性能断崖式下降；外部反馈在环境复杂的 WebShop 上影响尤甚 (-5.7)；自我反思和价值函数均有不可忽视的增益。</p>\n<p>搜索预算分析显示，性能从 K=5→10 显著提升，K=10→20 趋于平缓并到达平台期，验证了框架的效率-性能平衡能力。</p>\n<h5>局限性</h5>\n<ol>\n<li><strong>依赖 LLM 质量</strong>：弱模型难以生成有效动作、准确反思和估值，世界模型的模拟精度受限于 LLM 的知识边界。</li>\n<li><strong>世界模型幻觉</strong>：LLM 模拟的结果可能与真实环境偏差，在长程任务上误差会累积，外部反馈仅能部分缓解。</li>\n<li><strong>计算开销</strong>：虽然少于 Self-Consistency 类采样方法，但仍比 ReAct 等单路径方法昂贵（WebShop 平均 25.4 次 LLM 调用），限制了在实时性要求高的场景的应用。</li>\n<li><strong>人工奖励设计</strong>：需要手动定义终态奖励函数，不支持从无监督交互中学习，限制了开放环境下的自主探索能力。</li>\n<li><strong>模拟保真度依赖</strong>：WebArena 实验中被迫使用真实环境交互进行模拟，说明在高度动态/无已知动态的环境下，LLM 世界模型的泛化仿真能力仍有较大缺口。</li>\n</ol>",
      "quiz": {
        "q": "LATS 相比 ReAct 的结构性新增能力是什么？",
        "options": [
          "把工具调用改成完全并行执行",
          "把单路径 thought-action 循环扩展成带回溯的树搜索",
          "用 PDDL 替代自然语言规划",
          "在训练时更新策略网络参数"
        ],
        "answer": 1,
        "explain": "LATS 的核心是把 ReAct 式单路径决策升级成 MCTS 驱动的多路径树搜索，因此能前瞻、回溯并比较候选轨迹。"
      }
    },
    {
      "id": "adapt",
      "num": 10,
      "name": "ADaPT",
      "fullName": "按需分解与规划 (ADaPT)",
      "year": "2023.11",
      "org": "Allen AI",
      "parent": "rewoo",
      "paperUrl": "https://arxiv.org/abs/2311.05772",
      "projectUrl": "",
      "category": "decomposition",
      "motivation": "子任务卡住时递归分解再执行",
      "summary": "> ADaPT（As-Needed Decomposition and Planning）针对LLM Agent在复杂任务中面临的困境——Reactive Agent（如ReAct）缺乏全局规划、容易丢失任务主线，而Plan-and-Solve Agent（如ReWOO）在陌生环境中灵活性不足、一次性生成完整计划又计算浪费——提出了\"按需\"触发分解与规划的折中方案：Agent默认以Reactive模式执行，仅当LLM Monitor检测到卡住（重复动作、随机行为等）时才切换至Decompose-and-Plan组件，将当前子任务递归分解为可执行的子目标序列，由独立的Plan-Executor逐条执行，执行失败则递归再分解。在AlfWorld上ADaPT以GPT-3.5达到77%成功率（ReAct基线仅46%），以GPT-4+两步提示达到90%匹配微调模型BUTLER（90.6%）；在WebActions上超越最强基线25个百分点以上。",
      "keyPoints": [
        "核心动机：子任务卡住时递归分解再执行",
        "演化来源：继承或改进自 rewoo",
        "代表机构：Allen AI"
      ],
      "detail": "<p><img alt=\"ADaPT 示意图\" src=\"https://ar5iv.labs.arxiv.org/html/2311.05772/assets/x1.png\" />\n<em>图：ADaPT 的核心框架或评测示意。</em></p>\n<h5>1. 问题背景与动机</h5>\n<p>LLM Agent在交互式决策任务中面临规划挑战：Reactive Agent（ReAct、Toolformer）每步基于环境观察决定下一动作，灵活但容易在意外状态下丢失全局任务主线；Plan-and-Solve Agent（Plan-and-Solve、ReWOO）先生成完整计划再顺序执行，缺乏遇到意外时重新规划的能力，且对大多数简单任务生成详细计划是计算浪费。两类方法在不同条件（陌生领域、模糊目标、结构化需求）下各有优势与失败模式，尚无方法能统一两者的长处。ADaPT的动机正是要找到中间地带：像Reactive一样灵活，但在需要时像Plan-and-Solve一样有条理地分解任务。</p>\n<h5>2. 核心方法/框架</h5>\n<p>ADaPT包含两个核心组件，整体流程为\"默认Reactive + 按需递归分解\"：</p>\n<pre><code class=\"language-mermaid\">flowchart TB\n    A[接收任务T] --&gt; B[Reactive模式: ReAct执行]\n    B --&gt; C{Monitor: Agent卡住?}\n    C --&gt;|否| B\n    C --&gt;|是| D[Decompose-and-Plan: LLM生成子目标序列]\n    D --&gt; E[Plan-Executor逐条执行子目标]\n    E --&gt; F{子目标执行成功?}\n    F --&gt;|成功| G{还有子目标?}\n    G --&gt;|是| E\n    G --&gt;|否| B\n    F --&gt;|失败| H{可递归分解?}\n    H --&gt;|是, D&gt;0| D\n    H --&gt;|否/达到递归上限| I[回溯到父级，报告失败]\n    I --&gt; B\n</code></pre>\n<ul>\n<li><strong>Reactive组件</strong>：继承ReAct范式，每步接收环境观察ot，由LLM预测动作at，维护包含完整历史与高层计划（hl_plan）的上下文C。</li>\n<li><strong>Monitor</strong>：LLM-based二分类器，判断Agent是否卡住（结合启发式规则：重复同一动作3次、随机动作≥4次、递归次数超限后强制回到Reactive模式）。</li>\n<li><strong>Decompose-and-Plan组件</strong>：当Monitor触发时，以当前环境状态和目标为输入，LLM生成线性子目标序列（如AlfWorld中\"拿起土豆→用微波炉加热→放入冰箱\"）；每个子目标由新初始化的Plan-Executor（ReAct-style）执行；若某子目标失败，递归调用Decompose-and-Plan对该子目标细粒度分解，直到成功或达到递归深度上限。</li>\n<li><strong>状态管理</strong>：通过global_vars字典（如IN_HAND）跨递归层传递任务状态，每完成一个子目标后重置全局变量，防止状态污染。</li>\n</ul>\n<p>与DEPS的关键区别：DEPS仅在执行失败后进行一次性全量重规划，而ADaPT支持递归分解，可在不同粒度级别动态重规划，消融实验证明这正是性能提升的关键来源。</p>\n<h5>3. 实验与发现</h5>\n<ul>\n<li><strong>AlfWorld</strong>（110任务，6种子任务类型，3次随机种子平均）：</li>\n<li>ReAct（GPT-3.5-turbo-1106）：46%</li>\n<li>ADaPT（GPT-3.5-turbo-1106）：77%（+31个百分点）</li>\n<li>ADaPT w.o. 递归分解（类DEPS基线）：65%（递归带来+12%）</li>\n<li>ADaPT + GPT-4（两步提示，类似BUTLER）：90%，匹配微调模型BUTLER的90.6%</li>\n<li>Plan-and-Solve：44%（低于ReAct基线2%）</li>\n<li>\n<p>CodeLlama-34B + ADaPT：73%（+27%），追平GPT-4的ReAct水平</p>\n</li>\n<li>\n<p><strong>WebActions</strong>（76任务，4个网站，3次随机种子平均）：</p>\n</li>\n<li>ReAct（GPT-3.5）：10.5%</li>\n<li>Plan-and-Solve（GPT-3.5）：4%</li>\n<li>ADaPT（GPT-3.5）：30.3%（+19.8，&gt;基线25个百分点）</li>\n<li>ADaPT w.o. 递归分解：20.2%（递归带来+10.1%）</li>\n<li>\n<p>分站点：CMS 33%（ReAct 5%）、Reddit 34%（14%）、Shopping 33%（15%）、Maps 11%（0%）</p>\n</li>\n<li>\n<p><strong>监控严格度消融</strong>：严格模式下仅22%任务触发分解（成功率74%），默认模式31%触发（77%），宽松模式45%触发（80%），主动规划即使非严格必要也有益。</p>\n</li>\n<li>\n<p><strong>温度消融</strong>：Executor在温度0时仅41%成功率（重复动作被误判卡住），温度0.7时77%；Decomposition在温度0时更稳定（失效率29%→26%）。</p>\n</li>\n</ul>\n<h5>4. 局限与个人思考</h5>\n<p>ADaPT的主要失败模式有三类：(1)分解成功但执行失败（AlfWorld中60%），原因包括Plan-Executor幻觉（拾取不存在的物体）和非法动作参数，可通过检索增强生成改善接地性；(2)Monitor未能识别卡住状态（27%），在WebActions上更严重（52%），需要更细粒度的监控机制；(3)分解生成的子目标无效（13%），如生成与原任务相同的单个子目标，提示设计有优化空间。此外ADaPT目前是zero-shot方法，未进行微调，未来可通过微调优化性能与成本折中；递归深度限制是粗粒度的，可能造成死循环浪费。ADaPT的递归分解思想在Web导航、机器人操控、信息检索等场景有广阔泛化空间，但Monitor的精准度仍是影响实际部署的关键瓶颈。</p>\n<h5>5. 与相关工作的关系（论文树/知识图谱）</h5>\n<p>ADaPT处于LLM Agent规划的\"中间地带\"节点，其知识位置如下：</p>\n<ul>\n<li><strong>Parent节点——ReWOO</strong>：ADaPT继承ReWOO将规划与执行分离的思路，但改为\"按需触发\"而非预先全量规划，避免ReWOO在陌生环境生成无效全局计划的风险。</li>\n<li><strong>并列Reactive分支</strong>：ReAct是ADaPT的默认执行模式基础；Reflexion的反思机制与ADaPT的监控-重规划逻辑有相似之处，但Reflexion侧重失败后反思改进，ADaPT侧重在卡住时主动分解。</li>\n<li><strong>并列Plan-and-Solve分支</strong>：Plan-and-Solve和ReWOO代表一次性全量规划；DEPS是最接近ADaPT的方法（交错规划与执行），但DEPS仅在失败后全量重规划，缺少递归分解能力，ADaPT的递归分解带来+12%的显著提升。</li>\n<li><strong>后续/关联工作</strong>：ADaPT发表于2023年11月，其按需规划思想影响了后续探索Agent自适应策略的工作。ADaPT在WebActions上的成功也推动了Web Agent从简单检索向复杂交互规划发展。</li>\n</ul>",
      "quiz": {
        "q": "ADaPT 中 Monitor 的作用是什么？",
        "options": [
          "负责执行所有底层工具调用",
          "判断 Agent 是否卡住，并在必要时触发递归分解与规划",
          "把自然语言计划翻译成 PDDL",
          "对每一步动作做 constrained decoding"
        ],
        "answer": 1,
        "explain": "ADaPT 不是每步都分解任务，而是先用 Monitor 判断当前 reactive 执行是否卡住，只有必要时才切到 decomposition-and-planning。"
      }
    },
    {
      "id": "llm_compiler",
      "num": 11,
      "name": "LLMCompiler",
      "fullName": "并行函数调用编译器 (LLMCompiler)",
      "year": "2023.12",
      "org": "UC Berkeley",
      "parent": "rewoo",
      "paperUrl": "https://arxiv.org/abs/2312.04511",
      "projectUrl": "",
      "category": "decomposition",
      "motivation": "将工具调用编译成并行执行图",
      "summary": "LLMCompiler 借鉴经典编译器原理，通过将 LLM 的多函数调用规划为有向无环依赖图（DAG）并并行执行，解决了传统 ReAct 模式串行推理-行动导致的高延迟、高成本和误差累积问题，实现最高 3.7× 加速和 ~9% 准确率提升。",
      "keyPoints": [
        "三组件架构：Function Calling Planner（规划器）制定调用计划与依赖关系，Task Fetching Unit（任务分发器）管理依赖图的状态与调度，Executor（执行器）并行执行无依赖冲突的任务",
        "依赖图（DAG）自动推导：Planner 一次生成调用计划，标注工具间的 <code>$var</code> 符号变量依赖，形成并行执行拓扑",
        "Task Fetching Unit 实现非阻塞调度：每当一个任务完成、变量被填充，立即释放所有依赖该变量的后续任务，类似操作系统的动态任务调度",
        "支持开源与闭源 LLM，无需额外微调，Planner 依赖 LLM 原生推理能力，通过精心设计的提示模板生成结构化输出",
        "与 ReAct 相比，在 HotpotQA、Movie Recommendation、ParallelQA 等场景下：延迟降低最高 3.7×，成本节省最高 6.7×，准确率提升最高 ~9%",
        "开源代码与基准：https://github.com/SqueezeAILab/LLMCompiler"
      ],
      "detail": "<h5>1. 动机与背景</h5>\n<p>传统 ReAct 模式（Reasoning + Acting）将 LLM 的函数调用组织为顺序链：规划一步 → 执行一步 → 观察结果 → 再规划。这种串行模式的问题有三：(1) <strong>高延迟</strong>——每次推理和工具调用串行等待；(2) <strong>高成本</strong>——每步都需调用 LLM 生成完整推理链（包含下一次的工具调用说明）；(3) <strong>误差累积</strong>——前一步的错误可能通过推理链传播，且冗长的上下文稀释注意力。</p>\n<p>LLMCompiler 的核心洞察是：<strong>多函数调用场景中的大多数独立工具调用天然可并行</strong>，正如经典编译器通过数据流分析发掘指令级并行性。LLMCompiler 将 LLM 的函数调用计划“编译”为依赖图，由 Task Fetching Unit 按拓扑顺序非阻塞地分发任务，Executor 并行落地。</p>\n<h5>2. 核心架构与流程</h5>\n<p><img alt=\"LLMCompiler 架构对比图\" src=\"https://raw.githubusercontent.com/SqueezeAILab/LLMCompiler/main/figs/thumbnail.png\" />\n<em>图：LLMCompiler（右）与 ReAct（左）的运行时对比。LLMCompiler 中 Planner 一次性生成任务依赖图，独立任务并行执行。</em></p>\n<p>LLMCompiler 由三个核心单元协同工作：</p>\n<p><strong>① Function Calling Planner（函数调用规划器）</strong></p>\n<p>输入用户查询和可用工具定义，Planner 一次性生成包含以下信息的结构化调用计划：</p>\n<ul>\n<li>任务列表：分解后的子任务，每个子任务对应一次工具调用，参数可引用前置任务的输出（用 <code>$task_id</code> 语法）</li>\n<li>依赖关系：显式标注每个任务的输入依赖，构成 DAG</li>\n<li>最终合并器（Joiner）：在所有任务完成后，由 LLM 合成最终答案</li>\n</ul>\n<div class=\"key-point\">💡 关键：Planner <strong>只调用一次 LLM</strong>，生成整张 DAG，而非如 ReAct 逐轮调用。Prompt 模板指导 LLM 输出严格遵循 JSON/结构化 schema，包含 <code>task_id</code>、<code>function_name</code>、<code>arguments</code>、<code>depends_on</code> 等字段。</div>\n<p><strong>② Task Fetching Unit（任务分发单元）</strong></p>\n<p>该组件是调度的核心引擎，持续追踪每项任务的状态（等待/就绪/执行中/完成）：</p>\n<ul>\n<li>初始化时扫描任务列表，将无未满足依赖的任务标记为 <code>ready</code></li>\n<li>每当 Executor 返回一个任务结果，Fetching Unit 遍历依赖图，将结果中的变量值替换到所有下游任务的参数中，解除依赖</li>\n<li>一旦某任务的 <code>depends_on</code> 全部满足，立即将其放入就绪队列</li>\n</ul>\n<div class=\"warn-box\">⚠️ 注意：Task Fetching Unit 完全在 LLM 外部运行（传统代码逻辑），不消耗 LLM token。它只做符号级别的变量替换（<code>$1.title</code> → <code>\"Inception\"</code>），零推理开销。</div>\n<p><strong>③ Executor（执行器）</strong></p>\n<p>从就绪队列中取出任务，并发调用对应的工具函数。由于同一批次内的任务无依赖，它们可以被线程池/异步并行执行。完成后将结果回传给 Fetching Unit。</p>\n<h5>3. 算法伪代码</h5>\n<pre><code class=\"language-python\"># LLMCompiler 核心执行流程\ndef llm_compiler(query, tools):\n    # 第1步：Planner 生成依赖图 DAG\n    plan = planner(query, tools)\n    # plan = {&quot;tasks&quot;: [...], &quot;joiner&quot;: {...}}\n\n    # 初始化\n    task_states = {}       # 任务状态表\n    variable_store = {}    # 变量值存储\n    ready_queue = deque()  # 就绪队列\n\n    # 第2步：扫描初始无依赖任务\n    for task in plan.tasks:\n        task_states[task.id] = &quot;pending&quot;\n        if not task.depends_on:\n            ready_queue.append(task)\n\n    # 第3步：调度循环\n    while ready_queue or any(t.state in [&quot;pending&quot;, &quot;running&quot;] for t in plan.tasks):\n        # 并行执行所有就绪任务\n        batch = [ready_queue.popleft() for _ in range(len(ready_queue))]\n        results = parallel_execute(batch)\n\n        # 回传结果，更新变量表\n        for task_id, result in results.items():\n            variable_store[f&quot;${task_id}&quot;] = result\n            task_states[task_id] = &quot;completed&quot;\n\n        # 解除下游依赖，扫描新就绪任务\n        for task in plan.tasks:\n            if task_states[task.id] == &quot;pending&quot;:\n                if all(dep in variable_store for dep in task.depends_on):\n                    # 替换符号变量为实际值\n                    task.args = substitute(task.args, variable_store)\n                    ready_queue.append(task)\n                    task_states[task.id] = &quot;running&quot;\n\n    # 第4步：Joiner 合成最终输出\n    return joiner(query, variable_store, plan.joiner)\n</code></pre>\n<h5>4. 与传统方法的关键区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th>ReAct</th>\n<th>LLMCompiler</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>规划方式</td>\n<td>串行，每步规划下一个动作</td>\n<td>一次性编译全图</td>\n</tr>\n<tr>\n<td>LLM 调用次数</td>\n<td>N 次（N = 工具调用步数）</td>\n<td>Planner 1 次 + Joiner 1 次</td>\n</tr>\n<tr>\n<td>执行模式</td>\n<td>串行</td>\n<td>最大并行度</td>\n</tr>\n<tr>\n<td>调度逻辑</td>\n<td>LLM 隐式推理</td>\n<td>Task Fetching Unit 显式状态机</td>\n</tr>\n<tr>\n<td>依赖性分析</td>\n<td>利用 LLM 推理自然语言</td>\n<td>结构化 <code>depends_on</code> 字段</td>\n</tr>\n<tr>\n<td>token 消耗</td>\n<td>高（每步含历史）</td>\n<td>低（一次规划轻量化）</td>\n</tr>\n</tbody>\n</table></div>\n<h5>5. 关键实验结果</h5>\n<p>在 HotpotQA（多跳问答）、Movie Recommendation（电影推荐）和 ParallelQA（并行问答）等基准上：</p>\n<ul>\n<li><strong>延迟</strong>：LLMCompiler 相比 ReAct 加速最高 <strong>3.7×</strong>（由于并行消除了工具的串行等待）</li>\n<li><strong>成本</strong>：token 消耗节省最高 <strong>6.7×</strong>（消灭了 ReAct 中多轮 LLM 推理的成本）</li>\n<li><strong>准确率</strong>：最高提升 <strong>~9%</strong>（并行执行减少了中间错误传播和长上下文的注意力分散）</li>\n</ul>\n<div class=\"key-point\">💡 关键洞察：LLMCompiler 的性能增益直接与任务图的可并行度（max DAG width）成正比——工具调用之间独立性越强，加速比越高。</div>",
      "quiz": {
        "q": "LLMCompiler 中 Task Fetching Unit 的核心作用是什么？",
        "options": [
          "使用 LLM 推理分析工具调用的语义依赖关系",
          "管理 DAG 依赖图的状态，在任务完成后解除下游依赖并调度就绪任务",
          "直接执行工具调用并将结果返回给用户",
          "定期对 Planner 生成的计划进行再优化，调整并行策略"
        ],
        "answer": 1,
        "explain": "Task Fetching Unit 是纯代码逻辑的调度器，负责状态跟踪和符号变量替换，不消耗 LLM token。当一项任务完成并填充变量后，它扫描下游任务、解除依赖、将新就绪任务送入执行队列。"
      }
    },
    {
      "id": "devils_advocate",
      "num": 12,
      "name": "Devil's Advocate",
      "fullName": "预判式反思 (Devil's Advocate)",
      "year": "2024.05",
      "org": "UPenn/Google DeepMind",
      "parent": "reflexion",
      "paperUrl": "https://arxiv.org/abs/2405.16334",
      "projectUrl": "",
      "category": "closed_loop",
      "motivation": "行动前预判失败并准备补救分支",
      "summary": "Devil's Advocate 提出了**内省式规划（Introspective Planning）**，在 LLM Agent 执行计划前引入\"预判反思\"自我质疑机制，用三层梯度化的内省干预（预判→回溯→复盘）实现一致性-适应性动态平衡，在 WebArena 上以零样本 23.5% 成功率超越已有零样本方法 3.5 个百分点，同时将计划修订次数减少 45%。",
      "keyPoints": [
        "<strong>三层内省机制（核心创新）</strong>：预判反思（Anticipatory Reflection，动作前自我反问并准备补救分支）、行动后对齐+回溯（Post-action Alignment &amp; Backtracking，用 Stack 式深度优先搜索穷尽可能）、计划复盘（Plan Revision，前两层穷尽后重规划）",
        "<strong>Devil's Advocate 视角</strong>：让 LLM 在每次生成动作后主动质疑自身决策（\"what if this fails?\"），预先生成 R 个替代动作压入 Stack，模拟人类\"预先考虑最坏情况\"的思维模式",
        "<strong>一致性优先于适应性</strong>：核心设计哲学——尽最大努力执行当前计划，仅在穷尽 Stack 所有可能后才触发昂贵的计划修改，避免\"稍遇困难就改计划\"导致的迷失",
        "<strong>Stack 式轻量回溯</strong>：用 Stack 数据结构实现深度优先探索，代价远低于树搜索（LATS），兼顾探索广度与计算开销",
        "<strong>6 个 LLM 组件协同</strong>：计划生成 G_plan、动作生成 G_action、动作描述 G_describe、完成判定 G_completed、对齐校验 G_align、补救生成 G_remedy，全部 zero-shot prompt 实现",
        "<strong>WebArena 实验验证</strong>：812 任务 × 5 网站场景 × 3 类任务，仅文本观测（accessibility tree），零样本整体成功率 23.5%，各网站均有正向提升",
        "<strong>消融实验</strong>：三层内省缺一不可——移除预判、回溯或复盘任一层均导致成功率显著下降"
      ],
      "detail": "<h5>1. 核心框架图与示意图</h5>\n<p><strong>整体框架图 — Algorithm 1: Introspective Agent</strong></p>\n<p><img alt=\"Algorithm 1 内省式Agent伪代码\" src=\"https://ar5iv.labs.arxiv.org/html/2405.16334/assets/x1.png\" /></p>\n<p><em>图：Algorithm 1 — Introspective Agent 完整伪代码，展示三层内省如何嵌套在计划执行循环中</em></p>\n<p><strong>任务规划示例 — 5 步子任务分解</strong></p>\n<p><img alt=\"Figure 1 任务规划示例\" src=\"https://ar5iv.labs.arxiv.org/html/2405.16334/assets/example.png\" /></p>\n<p><em>图：Figure 1 — GPT-4 为 WebArena 任务生成的 5 步子任务计划示例</em></p>\n<p><strong>回溯场景示意 — Stack 式决策树</strong></p>\n<p><img alt=\"Figure 3 Stack回溯场景\" src=\"https://ar5iv.labs.arxiv.org/html/2405.16334/assets/example.png\" /></p>\n<p><em>图：Fig 3 — Agent 面对 3 个\"View Order\"按钮时，选择一个点击并压入另两个为替代，失败后回溯尝试</em></p>\n<p><strong>预判反思实例 — Devil's Advocate 工作流</strong></p>\n<p><img alt=\"Figure 4 预判反思决策流程\" src=\"https://ar5iv.labs.arxiv.org/html/2405.16334/assets/example.png\" /></p>\n<p><em>图：Fig 4 — 典型预判反思流程：Agent 自问\"What if the picture frame is not in order #179?\"后生成替代方案</em></p>\n<p><strong>实验结果对比</strong></p>\n<p><img alt=\"Figure 5 实验结果\" src=\"https://ar5iv.labs.arxiv.org/html/2405.16334/assets/result.png\" /></p>\n<p><em>图：Figure 5 — AR 与其他方法的 WebArena 5 网站成功率对比，AR 在所有网站均有正增益</em></p>\n<h5>2. 算法伪代码</h5>\n<pre><code>Algorithm 1: Introspective Agent\n\nInput: Task T, initial state S₀\nOutput: Action sequence achieving T\n\n1: H ← []                      // history\n2: while C_T = 0 do            // task not completed\n3:     P = (τ₁,...,τₙ) ~ G_plan(T, S₀, H)\n4:     for each τ in P do\n5:         while not G_completed(τ) do\n6:             aₜ ~ G_action(τ, Sₜ, H)\n7:             // 【第一层】预判反思：生成R个补救动作压入Stack\n8:             for r = 1 to R do\n9:                 aₜ⁽ʳ⁾ ~ G_remedy(τ, Sₜ, aₜ)\n10:                Stack.push((Sₜ, aₜ⁽ʳ⁾))\n11:            end for\n12:            Sₜ₊₁ = env.step(aₜ)\n13:            âₜ ~ G_describe(Sₜ, aₜ, Sₜ₊₁)\n14:            H.append(âₜ)\n15:            // 【第二层】行动后对齐校验\n16:            C_τ ~ G_align(Sₜ, aₜ, Sₜ₊₁, τ)\n17:            if C_τ = 0 then\n18:                (Sₜ', a_alt) ← Stack.pop()   // 回溯至先前状态\n19:                Sₜ = Sₜ'\n20:                aₜ = a_alt\n21:                goto Line 12                  // 尝试替代方案\n22:            end if\n23:        end while\n24:    end for\n25:    C_T ~ G_completed(T, Sₜ, H)               // 整体任务判定\n26:    // 【第三层】若未完成且Stack已空，下一轮while顶部触发重规划\n27: end while\n</code></pre>\n<div class=\"key-point\">💡 关键：三层内省在嵌套循环中自然分层——Line 7-11 为预判（动作前），Line 15-22 为回溯（动作后），Line 2-3 为复盘（计划级）。计算开销逐层递增：预判仅需额外 R 次 LLM 推理，回溯涉及状态恢复的 IO 操作，复盘需要重新调用昂贵的 G_plan。</div>\n<h5>3. 动机与背景</h5>\n<p>传统 LLM Agent 在执行复杂任务时面临<strong>一致性（Consistency）与适应性（Adaptability）的两难困境</strong>：</p>\n<ul>\n<li><strong>一致性过强</strong>（如 Plan + Act w/o reflection）：机械执行初始计划，缺乏纠错能力，面对环境变化或初始计划偏差时无法调整，最终失败</li>\n<li><strong>适应性过强</strong>（如 LATS 树搜索）：频繁修改计划、探索过多分支，导致决策效率低下，甚至\"迷失\"在搜索空间中</li>\n</ul>\n<p>更本质的问题在于，既有方法都在\"事后\"纠错——等到动作执行失败了再补救。Devil's Advocate 的核心洞察是：<strong>应该在做之前就想好退路</strong>。这正是人类专家解决问题的典型模式——事先预判可能的失败点并准备 Plan B，而非被动应对。</p>\n<h5>4. 核心机制深度拆解</h5>\n<p><strong>第一层：预判反思（Anticipatory Reflection）— Devil's Advocate</strong></p>\n<p>这是本文最鲜明的创新。在动作生成 <span class=\"kb-math kb-math-inline\">a_t \\sim G_{\\text{action}}(\\tau, S_t, H)</span> 之后、环境执行之前，Agent 对自身的决策发起内部质疑。具体机制：</p>\n<ol>\n<li>Agent 生成 <span class=\"kb-math kb-math-inline\">R</span> 个自反问题（\"what if this action fails because ...?\"），模拟潜在的失败场景</li>\n<li>针对每个失败场景，调用 <span class=\"kb-math kb-math-inline\">G_{\\text{remedy}}(\\tau, S_t, a_t)</span> 生成一个替代补救动作 <span class=\"kb-math kb-math-inline\">a_t^{(r)}</span></li>\n<li>将当前状态 <span class=\"kb-math kb-math-inline\">S_t</span> 与替代动作 <span class=\"kb-math kb-math-inline\">a_t^{(r)}</span> 压入 Stack</li>\n</ol>\n<p>这相当于<strong>用一个小的算力代价（R 次 prompt）预购了\"保险\"</strong>——如果第一个动作成功，Stack 中的替代方案不曾被使用，算力浪费极小；但如果失败，则立即有准备好的补救方案可回溯执行，避免了\"动作失败→重新思考→生成新动作\"的长延迟链路。</p>\n<p><strong>第二层：行动后对齐与回溯（Post-action Alignment &amp; Backtracking）</strong></p>\n<p>动作执行后，调用 <span class=\"kb-math kb-math-inline\">G_{\\text{align}}(S_t, a_t, S_{t+1}, \\tau)</span> 判断：</p>\n<ul>\n<li>动作结果是否朝着子任务目标 <span class=\"kb-math kb-math-inline\">\\tau</span> 前进？</li>\n<li>是否产生了有意义的进展？</li>\n</ul>\n<p>对齐判定 <span class=\"kb-math kb-math-inline\">C_\\tau \\in \\{0, 1\\}</span>。若 <span class=\"kb-math kb-math-inline\">C_\\tau = 1</span>，继续正常执行。若 <span class=\"kb-math kb-math-inline\">C_\\tau = 0</span>：</p>\n<ol>\n<li>从 Stack 弹出先前压入的替代方案 <span class=\"kb-math kb-math-inline\">(S_t&#x27;, a_{\\text{alt}})</span></li>\n<li>环境状态回退到 <span class=\"kb-math kb-math-inline\">S_t&#x27;</span>（通过 <code>go_back</code> 操作）</li>\n<li>执行替代动作 <span class=\"kb-math kb-math-inline\">a_{\\text{alt}}</span></li>\n<li>若替代动作也失败且 Stack 未空，继续 pop 尝试</li>\n</ol>\n<p>这实现了一种<strong>轻量级深度优先搜索</strong>——不给子任务预设搜索树结构，而是让 Agent 在线生成\"分支\"，用 Stack 管理回溯。与 LATS 的树搜索相比，Stack 回溯免去了树节点的显式管理和价值评估，实现更简单，开销更低。</p>\n<div class=\"warn-box\">⚠️ 注意：Stack 中只存当前动作级别的替代方案，过期自动弹出，不会无限增长。这意味着回溯始终在\"当前决策点的局部邻域\"内搜索，避免全局搜索的算力爆炸。</div>\n<p><strong>第三层：计划复盘（Plan Revision）</strong></p>\n<p>仅当前两层内省全部穷尽（Stack 为空且整体任务判定 <span class=\"kb-math kb-math-inline\">C_T = 0</span>）时才触发。</p>\n<p>基于完整历史 <span class=\"kb-math kb-math-inline\">H</span> 重新调用 <span class=\"kb-math kb-math-inline\">G_{\\text{plan}}</span> 生成新计划 <span class=\"kb-math kb-math-inline\">P_{\\text{new}}</span>。这是最昂贵的内省操作，因此被设计为最后手段。实验数据显示 AR 的计划修订次数（0.64）远低于 Plan+Act（2.03），验证了\"穷尽可能再改计划\"策略的有效性。</p>\n<p><strong>六个 LLM 组件的具体职责</strong></p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>组件</th>\n<th>职责</th>\n<th>关键设计</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><span class=\"kb-math kb-math-inline\">G_{\\text{plan}}</span></td>\n<td>将任务 T 分解为子任务序列 P</td>\n<td>基于历史 H 自适应调整，并非一次性规划</td>\n</tr>\n<tr>\n<td><span class=\"kb-math kb-math-inline\">G_{\\text{action}}</span></td>\n<td>在当前子任务 τ 下生成下一步动作</td>\n<td>接受当前状态和完整历史，确保上下文一致</td>\n</tr>\n<tr>\n<td><span class=\"kb-math kb-math-inline\">G_{\\text{describe}}</span></td>\n<td>将 <span class=\"kb-math kb-math-inline\">(S_t, a_t, S_{t+1})</span> 转化为自然语言描述 â_t</td>\n<td>过滤无关细节，保留关键信息供后续推理</td>\n</tr>\n<tr>\n<td><span class=\"kb-math kb-math-inline\">G_{\\text{align}}</span></td>\n<td>判断动作结果是否对齐子任务目标</td>\n<td>二元分类（0/1），实现简单而高效的对齐校验</td>\n</tr>\n<tr>\n<td><span class=\"kb-math kb-math-inline\">G_{\\text{remedy}}</span></td>\n<td>生成替代补救动作</td>\n<td>被 Devil's Advocate 触发，生成 R 个候选</td>\n</tr>\n<tr>\n<td><span class=\"kb-math kb-math-inline\">G_{\\text{completed}}</span></td>\n<td>判定子任务 τ 或整体任务 T 是否完成</td>\n<td>用于早停（early stopping），避免冗余动作</td>\n</tr>\n</tbody>\n</table></div>\n<p>全部组件均通过 <strong>zero-shot prompting</strong> 实现，无需微调或 few-shot 示例，展现了 LLM 本身的内省能力被结构化的 prompt 框架所激活。</p>\n<h5>5. 与传统方法的区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th>Plan+Act (w/o refl.)</th>\n<th>Plan+Act (w/ refl.)</th>\n<th>LATS</th>\n<th><strong>AR (Ours)</strong></th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>纠错时机</td>\n<td>无</td>\n<td>事后（post-hoc）</td>\n<td>搜索中</td>\n<td><strong>事前预判+事后对齐</strong></td>\n</tr>\n<tr>\n<td>探索方式</td>\n<td>线性</td>\n<td>线性+反思</td>\n<td>树搜索</td>\n<td><strong>Stack 式 DFS</strong></td>\n</tr>\n<tr>\n<td>计划修改策略</td>\n<td>频繁修改</td>\n<td>反思后修改</td>\n<td>树扩展</td>\n<td><strong>穷尽可能才修改</strong></td>\n</tr>\n<tr>\n<td>计算开销</td>\n<td>低</td>\n<td>中</td>\n<td>高</td>\n<td><strong>中（梯度化）</strong></td>\n</tr>\n<tr>\n<td>计划修订次数</td>\n<td>2.03</td>\n<td>—</td>\n<td>1.16</td>\n<td><strong>0.64</strong></td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 关键：AR 并非单纯增加计算量换取性能，而是通过结构化的内省分层设计实现<strong>算力使用的效率提升</strong>——预判最便宜、回溯次之、复盘最昂贵，Agent 总是在尝试更昂贵的操作之前耗尽更便宜的选项。</div>\n<h5>6. 关键公式</h5>\n<p><strong>对齐判定</strong>（式 6）：</p>\n<div class=\"kb-math kb-math-display\">C_\\tau \\sim G_{\\text{align}}(S_t, a_t, S_{t+1}, \\tau)</div>\n<p><strong>整体任务完成判定</strong>（式 7）：</p>\n<div class=\"kb-math kb-math-display\">C_T \\sim G_{\\text{completed}}(T, S_{t+1}, H_t)</div>\n<p><strong>补救动作生成</strong>（Algorithm 1 Line 16）：</p>\n<div class=\"kb-math kb-math-display\">a_t^{(r)} \\sim G_{\\text{remedy}}(\\tau, S_t, a_t), \\quad r = 1, \\dots, R</div>\n<p>这些公式看似简单，核心价值在于<strong>结构化组织</strong>——将内省行为拆解为可组合的独立组件，每个组件职责单一、可独立优化。</p>\n<h5>7. 错误分析</h5>\n<p>论文对方法的局限进行了坦诚分析：</p>\n<p><strong>错误类型 1：Agent 未能从失败中充分学习</strong>\n- 案例（Fig 6）：Agent 写退款消息时，第一次计划漏了购买日期，修改后的计划补上了日期，但仍在多个输入框中重复打字，未抓住\"先确认表单格式\"的根本问题\n- 根源：<span class=\"kb-math kb-math-inline\">G_{\\text{plan}}</span> 基于历史 H 的修订存在<strong>惯性</strong>——只修补了表面症状（遗漏信息），未诊断根因（不理解表单结构）</p>\n<p><strong>错误类型 2：顺序规划对特定任务的低效</strong>\n- 需要并行对比多个商品信息时，线性执行子任务效率远低于分叉搜索\n- 这是顺序规划范式的内在局限，非本方法独有</p>\n<h5>8. 局限性</h5>\n<ol>\n<li>零样本成功率 23.5%，绝对水平仍有大幅提升空间</li>\n<li>仅用文本观测（accessibility tree），未利用视觉信息，可能在需要空间推理的任务上受限</li>\n<li>Agent 对失败经验的汲取不完整，计划修正存在表面化倾向</li>\n<li>顺序规划天然不适于需并行探索的任务（如多候选项对比）</li>\n<li>依赖 <code>go_back</code> 操作的可靠性——若环境不支持可靠的状态回退，Stack 回溯机制失效</li>\n</ol>",
      "quiz": {
        "q": "Devil's Advocate 三层内省机制中，哪一层的计算开销最高？",
        "options": [
          "预判反思（Anticipatory Reflection）—— 生成 R 个替代动作",
          "行动后对齐与回溯（Post-action Alignment）—— 状态恢复+尝试替代方案",
          "计划复盘（Plan Revision）—— 基于完整历史重新调用 G_plan 生成新计划",
          "动作描述（Describe）—— 将状态变化转化为自然语言"
        ],
        "answer": 2,
        "explain": "计划复盘需要基于完整历史 H 重新调用 G_plan 分解任务，是三层中最昂贵的操作。设计中将其置于最内层循环之外，仅在 Stack 为空且任务仍未完成时才触发，体现了算力分层使用的设计哲学。"
      }
    },
    {
      "id": "wkm",
      "num": 13,
      "name": "WKM",
      "fullName": "世界知识模型 (World Knowledge Model)",
      "year": "2024.05",
      "org": "Zhejiang University",
      "parent": "rap",
      "paperUrl": "https://arxiv.org/abs/2405.14205",
      "projectUrl": "",
      "category": "search",
      "motivation": "用全局先验和局部状态知识导规划",
      "summary": "WKM 提出了一个**参数化的世界知识模型**，从专家轨迹和采样轨迹中自合成任务知识，为 LLM Agent 提供全局先验知识（指导整体规划）和局部动态状态知识（辅助每步动作选择），从而有效缓解 LLM Agent 在复杂交互任务中的\"无脑试错\"和\"幻觉动作\"问题。",
      "keyPoints": [
        "<strong>Prior Task Knowledge</strong>：任务级的全局先验知识，在任务开始前注入 Agent，引导高层规划方向。",
        "<strong>Dynamic State Knowledge</strong>：实例级的动态状态知识，在执行过程中实时更新，辅助低层动作选择。",
        "实例级任务知识比任务级知识具有更好的<strong>跨任务泛化能力</strong>；",
        "<strong>弱 WKM 可以引导强 Agent 模型</strong>进行更优规划（知识质量比模型规模更关键）；",
        "统一 WKM 训练（多任务联合训练）展示出进一步提升的潜力。"
      ],
      "detail": "<h5>1. 动机与背景</h5>\n<p>传统 LLM Agent（如 ReAct、Reflexion、RAP）直接使用 LLM 作为规划器，在 Web 导航、具身交互等复杂环境中面临两个固有问题：</p>\n<ul>\n<li><strong>全局规划盲目</strong>：Agent 没有任务开始前的先验世界知识，只能在每一步通过 prompt 中拼接的历史观察来猜测下一步做什么，如同\"蒙着眼睛走迷宫\"。</li>\n<li><strong>局部动作幻觉</strong>：由于缺乏对真实物理状态的动态建模，Agent 在局部决策时容易生成不可执行的动作（如点击不存在的按钮、输入无效的命令），即产生 hallucinatory actions。</li>\n</ul>\n<p>WKM 的灵感来源于认知科学中的\"心智世界模型\"理论——人类在执行任务前会在脑中构建一个对环境的粗略理解（prior），并在执行过程中不断更新这一理解（dynamic）。论文将这一机制落地为可训练的参数化模型。</p>\n<h5>2. 核心框架</h5>\n<p><img alt=\"WKM 框架示意图\" src=\"https://raw.githubusercontent.com/zjunlp/WKM/main/model_pic.png\" />\n<em>图：WKM 整体架构——Prior Task Knowledge 注入全局规划，Dynamic State Knowledge 辅助局部动作选择</em></p>\n<p>WKM 包含两个关键阶段：</p>\n<p><strong>阶段一：知识自合成 (Knowledge Self-Synthesis)</strong></p>\n<ol>\n<li>收集<strong>专家轨迹</strong>（成功执行的任务轨迹）和<strong>采样轨迹</strong>（Agent 自行探索生成的多样本轨迹）。</li>\n<li>将轨迹输入 LLM，引导其提炼出两种结构化的任务知识：</li>\n<li><strong>Task Knowledge <span class=\"kb-math kb-math-inline\">K_{task}</span></strong>：总结该类型任务的通用目标、约束和子任务分解策略。</li>\n<li><strong>State Knowledge <span class=\"kb-math kb-math-inline\">K_{state}</span></strong>：总结在不同状态下的决策经验（什么状态下应该采取什么动作）。</li>\n<li>合成的知识以自然语言形式存储，形成 WKM 的知识库。</li>\n</ol>\n<p><strong>阶段二：知识引导规划 (Knowledge-Guided Planning)</strong></p>\n<ol>\n<li><strong>全局规划阶段</strong>：在执行开始时，根据任务描述检索最相关的 Prior Task Knowledge <span class=\"kb-math kb-math-inline\">K_{task}</span>，将其拼入 Agent 的系统 prompt 或初始上下文，为 Agent 提供\"任务蓝图\"。</li>\n<li><strong>局部执行阶段</strong>：在每一步动作前，根据当前观察状态检索相关的 Dynamic State Knowledge <span class=\"kb-math kb-math-inline\">K_{state}</span>，辅助 Agent 判断当前应该采取的最优动作。</li>\n<li>Agent 模型本身不变，WKM 以 <strong>plug-and-play</strong> 的方式提供知识增强。</li>\n</ol>\n<h5>3. 训练与推理</h5>\n<pre><code class=\"language-python\"># WKM 知识引导规划伪代码\ndef wkm_guided_planning(task, wkm, agent_model):\n    # Step 1: 检索全局先验知识\n    prior_knowledge = wkm.retrieve_task_knowledge(task)\n    context = prior_knowledge  # 注入 Agent 上下文\n\n    trajectory = []\n    for step in range(max_steps):\n        # Step 2: 获取当前观察\n        observation = env.get_observation()\n\n        # Step 3: 检索动态状态知识\n        state_knowledge = wkm.retrieve_state_knowledge(observation)\n        context += state_knowledge\n\n        # Step 4: Agent 根据增强上下文生成动作\n        action = agent_model.generate(context, observation)\n        trajectory.append((observation, action))\n\n        # Step 5: 执行动作，获取反馈\n        result = env.step(action)\n        if result.is_terminal:\n            break\n\n    return trajectory\n</code></pre>\n<ul>\n<li><strong>知识合成训练</strong>：利用 (task, expert_trajectory) 对，通过监督微调训练 WKM 生成高质量的知识摘要。同时也利用采样轨迹进行对比学习，让 WKM 学会区分好决策和坏决策。</li>\n<li><strong>推理时</strong>：WKM 冻结，仅作为知识检索器工作。检索基于语义相似度匹配当前任务/状态与知识库中的条目。</li>\n<li><strong>损失函数</strong>：知识合成阶段使用标准的 cross-entropy loss 优化知识文本生成；可选地加入 contrastive loss 增强知识区分度。</li>\n</ul>\n<h5>4. 实验与结果</h5>\n<p>论文在三个复杂真实世界模拟数据集上进行了验证：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>数据集</th>\n<th>领域</th>\n<th>特点</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><strong>WebArena</strong></td>\n<td>Web 导航</td>\n<td>模拟真实网站交互，需要理解网页结构和动态内容</td>\n</tr>\n<tr>\n<td><strong>ALFWorld</strong></td>\n<td>具身家务</td>\n<td>文本化的室内交互，如\"把苹果放进冰箱\"</td>\n</tr>\n<tr>\n<td><strong>ScienceWorld</strong></td>\n<td>科学推理</td>\n<td>需要多步科学实验操作和逻辑推理</td>\n</tr>\n</tbody>\n</table></div>\n<p>实验使用三种开源 LLM 作为 Agent 基座模型：Mistral-7B、Gemma-7B 和 Llama-3-8B，对比了多种强基线方法（ReAct、Reflexion、RAP 等）。</p>\n<p><strong>核心实验结果</strong>：\n- WKM 在所有三个数据集上均<strong>显著优于</strong>所有基线方法，任务成功率平均提升 10-15 个百分点。\n- 消融实验表明：去掉 Prior Task Knowledge 或 Dynamic State Knowledge 均会导致性能明显下降，两者<strong>互补且缺一不可</strong>。\n- 实例级知识（instance-level，从具体轨迹中提取）比任务级知识（task-level，宏观总结）具有更好的泛化性，能有效迁移到未见过的任务变体。\n- \"弱 WKM 引导强 Agent\"现象：用一个 7B 模型训练的 WKM，可以为 70B 的 Agent 模型提供有效规划指导，说明<strong>知识质量比模型规模更关键</strong>。\n- 多任务统一训练的 WKM 展现出正向的迁移学习效应，表明 WKM 有潜力发展为通用的世界知识底座。</p>\n<h5>5. 与传统方法的区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th>ReAct / Reflexion</th>\n<th>RAP (推理-行动规划)</th>\n<th><strong>WKM</strong></th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>知识来源</td>\n<td>仅当前轨迹上下文</td>\n<td>搜索树 + 世界模型</td>\n<td><strong>自合成的显式参数化知识</strong></td>\n</tr>\n<tr>\n<td>全局先验</td>\n<td>无</td>\n<td>隐式（在搜索中）</td>\n<td><strong>显式 Prior Task Knowledge</strong></td>\n</tr>\n<tr>\n<td>局部动态</td>\n<td>纯反应式</td>\n<td>基于模拟预测</td>\n<td><strong>检索式 Dynamic State Knowledge</strong></td>\n</tr>\n<tr>\n<td>泛化能力</td>\n<td>差</td>\n<td>中等</td>\n<td><strong>强（实例级知识跨任务迁移）</strong></td>\n</tr>\n<tr>\n<td>训练开销</td>\n<td>无</td>\n<td>需要在线搜索</td>\n<td><strong>离线合成 + 即插即用</strong></td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 关键创新：WKM 首次将\"世界知识\"从 Agent 推理的隐式副产品提升为<strong>独立的可训练模块</strong>，实现了知识的显式化、可迁移和可复用。</p>\n<p>⚠️ 局限：目前 WKM 的知识合成依赖于专家轨迹的可获取性；在完全无专家示范的全新环境中，知识质量可能下降。此外，WKM 的知识以自然语言形式存储，检索效率在知识库极大时可能成为瓶颈。</div>",
      "quiz": {
        "q": "WKM 中的 Prior Task Knowledge 和 Dynamic State Knowledge 分别用于解决 Agent Planning 中的什么问题？",
        "options": [
          "Prior 解决全局试错问题，Dynamic 解决局部幻觉问题",
          "Prior 用于训练 Agent 模型，Dynamic 用于推理加速",
          "Prior 用于检索历史轨迹，Dynamic 用于生成新动作",
          "两者都是用来替换 Agent 模型的参数"
        ],
        "answer": 0,
        "explain": "Prior Task Knowledge 在任务开始前提供全局先验，避免 Agent 盲目试错；Dynamic State Knowledge 在执行中根据实时状态辅助决策，减少幻觉动作。两者互补，分别从全局和局部层面增强 Agent 对世界的理解。"
      }
    },
    {
      "id": "system_1_x",
      "num": 14,
      "name": "System-1.x",
      "fullName": "快慢混合规划器 (System-1.x)",
      "year": "2024.07",
      "org": "UNC Chapel Hill",
      "parent": "rap",
      "paperUrl": "https://arxiv.org/abs/2407.14414",
      "projectUrl": "",
      "category": "search",
      "motivation": "在直出规划与显式搜索间自适应切换",
      "summary": "System-1.x 提出了一个可控的混合 LLM 规划框架，通过 hybridization factor \\(x\\) 在快速直觉的 System-1 规划器与缓慢搜索的 System-2 规划器之间进行插值，仅需搜索轨迹作为微调监督，在迷宫导航和积木世界等经典规划任务上实现了优于纯 LLM 规划器和符号 A* 算法的性能。",
      "keyPoints": [
        "提出<strong>三级组件架构</strong>：Controller（分解子目标并分配规划器）、System-1 Planner（直接生成动作序列）和 System-2 Planner（先搜索再生成计划），三者均在同一个基础 LLM 上微调。",
        "引入<strong>混合因子 <span class=\"kb-math kb-math-inline\">x \\in [0,1]</span></strong>，控制搜索在总规划中的比例：<span class=\"kb-math kb-math-inline\">x=0</span> 时等价于纯 System-1，<span class=\"kb-math kb-math-inline\">x=1</span> 时等价于纯 System-2。",
        "Controller 利用难度函数 <span class=\"kb-math kb-math-inline\">h(s_0, s_g)</span> 对子目标排序，将<strong>简单子目标</strong>分配给 System-1，<strong>困难子目标</strong>分配给 System-2，实现混合规划。",
        "仅需<strong>搜索轨迹</strong>（search traces）作为监督信号，无需额外的标注或奖励模型。",
        "在 <strong>Maze Navigation 和 Blocksworld</strong> 两个经典规划任务上评估，给定相同的探索预算，System-1.x 的规划准确率显著优于纯 System-1、纯 System-2 以及符号 A* 规划器。",
        "展示<strong>可控性</strong>（调节 <span class=\"kb-math kb-math-inline\">x</span> 可改变搜索量—性能权衡）、<strong>灵活性</strong>（支持神经-符号混合变体，如 System-1 为神经、System-2 为符号 A<em>）以及</em><em>泛化性</em><em>（对 BFS、DFS、A</em> 等不同搜索算法的训练数据均鲁棒）。"
      ],
      "detail": "<p><img alt=\"System-1.x 核心对比示意图\" src=\"https://ar5iv.labs.arxiv.org/html/2407.14414/assets/x1.png\" /><br />\n<em>图：System-1 Planner、System-2 Planner 与 System-1.x 混合规划器的对比。System-1 直接生成计划，快速但易出错；System-2 先搜索再输出，准确但缓慢；System-1.x 根据子目标难度在两者间动态切换，兼顾速度与精度。</em></p>\n<h5>动机与背景</h5>\n<p>传统的 LLM 规划器（如直接生成答案的 System-1）缺乏显式的搜索、回溯和从错误中学习的能力，导致在长序列规划任务上表现不佳，尤其是面对分布外（OOD）问题时。而引入搜索的 System-2 LLM 规划器虽然准确率更高，但会消耗大量 token（搜索所有中间状态），效率低下。System-1.x 旨在将两者结合，让简单子任务用 System-1 快速完成，困难子任务用 System-2 谨慎搜索，从而在准确率和效率之间取得可控的平衡。</p>\n<h5>核心机制：Controller + 双规划器架构</h5>\n<p>System-1.x 由三个微调后的 LLM 组件构成：\n1. <strong>System-1 Planner</strong>：输入起始状态 <span class=\"kb-math kb-math-inline\">s_0</span> 和目标状态 <span class=\"kb-math kb-math-inline\">s_g</span>，直接生成动作序列 <span class=\"kb-math kb-math-inline\">\\mathcal{P} = (a_1, \\dots, a_n)</span>，不进行任何中间探索。它探索的状态数仅等于计划长度 <span class=\"kb-math kb-math-inline\">n</span>。\n2. <strong>System-2 Planner</strong>：输入 <span class=\"kb-math kb-math-inline\">s_0, s_g</span>，先生成搜索轨迹（包括所有访问过的状态、动作及其有效性），再从中提取最终计划。探索状态数远大于计划长度，但准确率更高。\n3. <strong>Controller</strong>：接收用户设定的混合因子 <span class=\"kb-math kb-math-inline\">x</span> 和难度函数 <span class=\"kb-math kb-math-inline\">h</span>，将原始规划问题分解为三个子目标：前段 System-1 子计划、中段 System-2 子计划、后段 System-1 子计划。中段的长度占原计划长度的 <span class=\"kb-math kb-math-inline\">x</span> 倍，且选择使总难度最低的分界点。</p>\n<p>训练数据的生成由 Algorithm 1 描述：</p>\n<pre><code class=\"language-python\"># Algorithm 1: Training Data Generation for System-1.x Controller\nInput: System-1 data D_Sys1 = {(s0, sg, plan)}, hybridization factor x, hardness h\nOutput: Controller training data D_c\n\nsorted_data = sort(D_Sys1, key=lambda d: h(d.s0, d.sg))  # 按难度升序\nD_c = {}\nfor i, (s0, sg, plan) in enumerate(sorted_data):\n    if i &lt; (1 - x) * N:       # 最简单的 (1-x)% 直接用 System-1\n        y = [(s0, sg), &quot;Sys1&quot;]\n    else:                     # 剩余 x% 分解为三部分\n        j, k = argmin_{u,v} [h(s0, s_u) - h(s_u, s_v) + h(s_v, sg)]\n                 s.t. |v - u| = x * len(plan)\n        y = [(s0, s_j), &quot;Sys1&quot;] + [(s_j, s_k), &quot;Sys2&quot;] + [(s_k, sg), &quot;Sys1&quot;]\n    D_c[(s0, sg)] = y\nreturn D_c\n\nController 的训练是一个 sequence-to-sequence 任务：输入起始状态、目标状态和 <span class=\"kb-math kb-math-inline\">x</span>，输出子目标列表及各子目标对应的规划器类型。推理时，Controller 产生子目标序列，分别调用 System-1 或 System-2 生成子计划，最后拼接成完整计划。\n</code></pre>\n<div class=\"key-point\">💡 关键：混合因子 <span class=\"kb-math kb-math-inline\">x</span> 直接决定了多少比例的规划使用搜索模式。较大的 <span class=\"kb-math kb-math-inline\">x</span> 意味着更多搜索，更高的准确率，但也带来更高的 token 成本。用户可根据实际需求在速度与精度之间平滑调节。</div>\n<h5>训练流程</h5>\n<ol>\n<li>用标准规划数据集训练一个 System-1 Planner（直接生成计划）。</li>\n<li>使用符号搜索算法（如 A*、BFS、DFS）为每个规划问题生成搜索轨迹，用这些轨迹训练 System-2 Planner。</li>\n<li>基于已训练的 System-1 和 System-2 的行为，按 Algorithm 1 构造 Controller 的训练数据（包含不同 <span class=\"kb-math kb-math-inline\">x</span> 值），微调 Controller。</li>\n<li>注意：System-1、System-2 和 Controller 均在同一个基础 LLM（如 LLaMA-3.1-8B-Instruct）上微调，但参数独立存储，推理时按需加载。</li>\n</ol>\n<h5>与传统方法的区别</h5>\n<ul>\n<li><strong>vs. 纯 System-1</strong>：纯 System-1 不进行搜索，OOD 泛化差；System-1.x 可引入搜索提高鲁棒性。</li>\n<li><strong>vs. 纯 System-2</strong>：纯 System-2 对所有问题均执行全量搜索，token 消耗巨大；System-1.x 只对困难子目标搜索，节省计算。</li>\n<li><strong>vs. 符号 A</strong>*：符号规划器依赖完美环境模型，无法泛化到非符号环境；System-1.x 的 System-2 是神经网络实现的搜索，可在语言空间中“学习”搜索，同时 System-1.x 还支持神经-符号混合变体，兼具两者优势。</li>\n<li><strong>vs. 简单集成</strong>：简单地让 LLM 先回答、错误再搜索是硬性分叉，缺乏平滑可控性；System-1.x 通过 <span class=\"kb-math kb-math-inline\">x</span> 因子实现软性混合，并端到端训练 Controller 以优化子目标分解。</li>\n</ul>\n<h5>实验支撑</h5>\n<p>在 Maze Navigation 任务上，给定固定的总探索状态数预算（SE budget），System-1.x 在所有预算水平下均超过 System-1、System-2 和符号 A<em>。尤其在低预算下，System-1.x 的优势更明显，因为它能将有限搜索集中在困难子目标上。在 Blocksworld 任务上，System-1.x 同样取得了最高的计划准确率。进一步分析表明，随着 <span class=\"kb-math kb-math-inline\">x</span> 增加，准确率单调上升、探索状态数单调增多，验证了 <span class=\"kb-math kb-math-inline\">x</span> 的可控性。混合神经 System-1 与符号 A</em> 作为 System-2 的变体同样有效，证明框架的灵活性。使用不同搜索算法（BFS、DFS、A*）生成的训练数据时，System-1.x 的性能保持稳定，表明对底层搜索算法选择鲁棒。</p>",
      "quiz": {
        "q": "在 System-1.x 框架中，混合因子 x 的作用是什么？",
        "options": [
          "决定 Controller 使用哪个基础 LLM 进行微调",
          "控制 Controller 分配给 System-2 处理的规划子目标比例",
          "设置 System-2 搜索时的最大探索步数",
          "调整 System-1 和 System-2 输出计划时的温度参数"
        ],
        "answer": 1,
        "explain": "混合因子 x 决定总规划中由 System-2（搜索模式）处理的子目标比例，从而控制搜索开销与准确率的权衡。"
      }
    },
    {
      "id": "plan_and_act",
      "num": 15,
      "name": "Plan-and-Act",
      "fullName": "计划并行动 (Plan-and-Act)",
      "year": "2025.03",
      "org": "UC Berkeley",
      "parent": "adapt",
      "paperUrl": "https://arxiv.org/abs/2503.09572",
      "projectUrl": "",
      "category": "decomposition",
      "motivation": "显式拆分Planner与Executor两层",
      "summary": "Plan-and-Act 将长程网页智能体显式拆成 Planner 和 Executor 两层，并用三阶段合成数据管线专门训练规划能力，再配合执行期动态重规划，在 WebArena-Lite 上做到 57.58% 成功率、在文本版 WebVoyager 上做到 81.36%。",
      "keyPoints": [
        "明确拆分高层 Planner 与底层 Executor，避免单模型同时承担“定策略”和“点按钮”两类负担。",
        "提出三阶段合成数据流程：轨迹生成、轨迹到接地计划的反标注、计划扩增，用来规模化制造 planner supervision。",
        "Planner 生成结构化高层步骤，Executor 只负责把当前步骤翻译成环境动作。",
        "执行受阻时触发 dynamic replanning，Planner 基于已完成步骤、当前状态和失败反馈重写剩余计划。",
        "论文同时报告 WebArena-Lite 与 text-only WebVoyager 结果，证明分层规划不仅改善长程网页导航，也提升跨环境泛化。",
        "官方代码仓库中给出的最新结果是 WebArena-Lite 57.58%、WebVoyager 81.36%，高于早期草稿版本中的数值。"
      ],
      "detail": "<p><img alt=\"Plan-and-Act 框架图\" src=\"https://raw.githubusercontent.com/SqueezeAILab/plan-and-act/main/Plan-And-Act.jpg\" />\n<em>图：Plan-and-Act 的核心工作流。Planner 先输出高层计划，Executor 逐步执行；若观察到阻塞，再把当前状态回传给 Planner 重规划。</em></p>\n<pre><code class=\"language-python\"># Plan-and-Act 的核心推理循环\nplan = planner.make_plan(user_query)\ncompleted = []\n\nwhile not task_done():\n    current_step = plan.next_incomplete_step()\n    action = executor.act(step=current_step, state=env_state())\n    obs = env.step(action)\n\n    if executor.is_blocked(obs):\n        plan = planner.replan(\n            query=user_query,\n            completed_steps=completed,\n            current_state=env_state(),\n            feedback=obs,\n        )\n        continue\n\n    if current_step_finished(obs):\n        completed.append(current_step)\n</code></pre>\n<p>Plan-and-Act 的出发点很直接：现有网页 Agent 往往让同一个 LLM 一边理解用户目标、一边维护全局计划、一边处理具体 DOM/元素操作。这会把“长期策略一致性”和“短期界面反应”混在一个上下文里，任务一长，模型就容易出现计划漂移、步骤遗忘和局部试错过多的问题。论文的核心判断是，这不是单纯 prompt 写得不够好，而是职责没有分离。</p>\n<p>因此系统被拆成两个角色。Planner 只回答“接下来应该先做哪几个高层步骤”，输出的是结构化、接地但不含具体点击坐标的计划；Executor 只回答“为了完成当前这一步，现在在页面上该执行什么动作”。这样的分工把 long-horizon reasoning 和 environment-specific control 解耦了。Planner 不需要被 HTML 噪声淹没，Executor 也不用背负全局目标维护。</p>\n<p>真正让这篇论文成立的是训练数据问题的解决。作者提出三阶段合成管线：第一阶段先生成成功动作轨迹；第二阶段把成功轨迹反标注成高层计划，使每段动作都对应到“为什么要这么做”的步骤；第三阶段再对已有计划做扩增，补足更丰富的长程规划形态。也就是说，这篇工作的重点不只是“分两层”，而是“专门造 Planner 的监督数据”，让高层计划成为可训练对象，而不是继续把规划能力寄托在通用指令微调的副产物上。</p>\n<p>推理时的 dynamic replanning 也很关键。Executor 一旦发现元素找不到、页面状态与计划假设不一致，或者当前步骤无法推进，就把失败反馈、当前网页状态和已完成步骤回传给 Planner。Planner 不是从零重来，而是基于当前进度修订剩余计划。这一点使它和纯 open-loop plan-and-execute 方法区分开，也让它能在真实网页这种高噪声、易偏离的环境里稳定工作。</p>\n<p>与 ReAct 相比，Plan-and-Act 不是把思考和操作交错到每一步，而是先显式产出步骤级意图，再让执行层消费这些意图；与 ADaPT 相比，它不是“卡住了再递归分解子任务”，而是默认就维护一份独立的高层计划表示。论文因此把“规划”从 agent prompt engineering 里的隐变量，提升成了一个可单独训练、单独评测、单独重写的模块。</p>\n<div class=\"key-point\">💡 关键：这篇工作的真正增益来源，不只是双模型架构本身，而是“把 planner supervision 数据集系统化制造出来”。</div>",
      "quiz": {
        "q": "Plan-and-Act 中 dynamic replanning 的直接触发条件是什么？",
        "options": [
          "每执行一个动作后都固定重规划一次",
          "Executor 遇到阻塞或观察与原计划假设不一致时，把反馈回传给 Planner",
          "Planner 发现 token 长度过长时自动压缩计划",
          "用户修改目标后，Executor 自己改写后续步骤"
        ],
        "answer": 1,
        "explain": "Plan-and-Act 的重规划由执行期失败或状态偏移触发，Executor 将当前状态和失败反馈交给 Planner，由 Planner 修订剩余高层计划。"
      }
    },
    {
      "id": "preflect",
      "num": 16,
      "name": "PreFlect",
      "fullName": "前瞻反思 (PreFlect)",
      "year": "2026.02",
      "org": "Penn State",
      "parent": "devils_advocate",
      "paperUrl": "https://arxiv.org/abs/2602.07187",
      "projectUrl": "",
      "category": "closed_loop",
      "motivation": "执行前批判计划并触发动态重规划",
      "summary": "PreFlect 提出前瞻性反思（Prospective Reflection）机制，在 Agent 执行计划**之前**利用从历史轨迹中蒸馏的 Planning Errors 对计划进行批判与修正，将反思范式从「失败后补救」转变为「执行前预见」，并辅以动态重规划机制应对执行阶段的意外偏差，在 GAIA 和 SimpleQA 基准上显著超越 Reflexion、Self-Refine 等事后反思方法。",
      "keyPoints": [
        "提出 <strong>Prospective Reflection（前瞻性反思）</strong>：将反思从执行后移至规划阶段，在执行前对计划进行审查和修正",
        "设计 <strong>Planning Errors（规划错误）离线蒸馏流程</strong>：通过对比混合结果轨迹（成功+失败），利用 LLM 诊断并聚合出 3 种领域无关的核心错误类型",
        "三种 Planning Errors：<strong>insufficient constraint verification</strong>（约束验证不足）、<strong>ineffective tool selection</strong>（无效工具选择）、<strong>shallow content verification</strong>（浅层内容验证）",
        "引入 <strong>Dynamic Re-planning（动态重规划）</strong>：执行中持续监控轨迹可行性，遇阻时触发重规划并再次执行前瞻性反思",
        "基于 Smolagents 框架构建，在 GAIA 上达 49.70%（超越 Reflexion 基线），SimpleQA 正确率达 79%",
        "Planning Errors 具备跨架构<strong>迁移性</strong>，蒸馏出的错误模式可泛化至不同 Agent 架构"
      ],
      "detail": "<h5>核心架构</h5>\n<p><img alt=\"PreFlect 架构图\" src=\"https://ar5iv.labs.arxiv.org/html/2602.07187/assets/x2.png\" />\n<em>图：PreFlect 架构总览——上半部分为标准 Agent 工作流，下半部分融合前瞻性反思（粉色框）和动态重规划（右下）的统一闭环系统</em></p>\n<p><img alt=\"前瞻 vs 回顾对比\" src=\"https://ar5iv.labs.arxiv.org/html/2602.07187/assets/x1.png\" />\n<em>图：回顾性反思（左）仅在失败后触发纠正；前瞻性反思（右）在执行前预判风险，主动规避障碍</em></p>\n<h5>动机与背景</h5>\n<p>传统自我反思机制（Reflexion、Self-Refine 等）本质上是<strong>回顾性的</strong>（retrospective）：Agent 执行动作，观察失败，然后才尝试恢复。这种方式存在三个致命缺陷：</p>\n<ol>\n<li><strong>不可逆后果</strong>：某些错误一旦发生便无法挽回（如误删重要文件），事后反思无能为力</li>\n<li><strong>轨迹噪声</strong>：失败尝试和修复记录同时存入记忆，造成上下文干扰，影响后续决策稳定性</li>\n<li><strong>计算开销</strong>：反复试错循环导致显著的 token 消耗和推理延迟</li>\n</ol>\n<p>PreFlect 的洞察是：<strong>规划阶段是主动控制的关键窗口</strong>——此时 Agent 已确定策略但尚未执行，正是实施干预的最佳时机。</p>\n<h5>Planning Errors 蒸馏流程</h5>\n<div class=\"key-point\">💡 关键：Planning Errors 是前瞻性反思能够准确预判风险的<strong>经验锚点</strong>。没有这些结构化先验，盲目的事前批判往往会引入幻觉和额外风险。</div>\n<p>Planning Errors 的构建遵循三阶段离线蒸馏流程：</p>\n<p><strong>Stage 1 — 轨迹收集（Trajectory Collection）</strong>：\n- 在多样化任务上采样 3 条轨迹，筛选出<strong>混合结果</strong>（mixed outcomes）的案例\n- 混合结果指同一任务上 Agent 既有成功也有失败，这种对比凸显了有效与无效策略的关键差异\n- 用于构建 Planning Errors 的数据<strong>不与任何评测基准重叠</strong>，避免过拟合</p>\n<p><strong>Stage 2 — 诊断（Diagnosis）</strong>：\n- 给定混合轨迹，LLM 进行对比诊断分析\n- 识别失败轨迹中源于<strong>规划缺陷</strong>的关键错误，并分析成功轨迹如何规避这些陷阱\n- 每个诊断结果产出：错误类型、描述、影响、支持证据</p>\n<p><strong>Stage 3 — 聚合（Aggregation）</strong>：\n- LLM 驱动聚合器迭代比较每个新诊断条目与已有错误集\n- 决定：新建错误类别 / 合并进已有类别 / 丢弃为冗余\n- 经过人工精炼去除过于狭窄或任务相关的类别，最终得到 3 种核心错误类型：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>错误类型</th>\n<th>描述</th>\n<th>典型场景</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><strong>insufficient constraint verification</strong></td>\n<td>计划找到候选答案但未严格验证所有约束条件</td>\n<td>识别演员时确认了名字但未验证年龄/国籍等附加条件</td>\n</tr>\n<tr>\n<td><strong>ineffective tool selection</strong></td>\n<td>选择了不适合当前任务的工具</td>\n<td>用通用搜索处理需要专用API查询的任务</td>\n</tr>\n<tr>\n<td><strong>shallow content verification</strong></td>\n<td>对检索内容仅做表面检查，未深度理解</td>\n<td>仅看标题匹配就采纳结果，忽略内容细节</td>\n</tr>\n</tbody>\n</table></div>\n<h5>前瞻性反思与修正</h5>\n<pre><code>Reflection &amp; Revision 伪代码：\n\nfunction ProspectiveReflection(plan, planning_errors, env_info):\n    # 1. 信息收集\n    history_summary = summarize(agent.trajectory)\n    tool_analysis = analyze_tools(env_info.available_tools)\n    current_state = concat(history_summary, tool_analysis)\n\n    # 2. 错误识别：以 Planning Errors 为参考先验\n    detected_errors = []\n    for error_type in planning_errors:\n        similarity = check_semantic_match(plan, error_type)\n        if similarity &gt; threshold:\n            detected_errors.append({\n                &quot;type&quot;: error_type.name,\n                &quot;description&quot;: error_type.description,\n                &quot;examples&quot;: error_type.contrastive_examples\n            })\n\n    # 3. 计划修正\n    if detected_errors:\n        revised_plan = LLM.refine(\n            original_plan=plan,\n            errors=detected_errors,\n            success_patterns=planning_errors.success_examples,\n            instruction=&quot;避坑，采纳成功路径&quot;\n        )\n        return revised_plan\n    return plan\n</code></pre>\n<p>修正过程的关键在于 Planning Errors 中包含的<strong>对比样例</strong>（contrastive examples）：正面样例展示如何规避该错误，负面样例展示如何被误导至失败。Agent 将当前状态与这些样例匹配，找到通向成功的最优路径。</p>\n<div class=\"warn-box\">⚠️ 注意：前瞻性反思并非空泛的\"再想想\"，而是以<strong>经验锚点</strong>（Planning Errors）为条件的结构化批判。反射器首先充分理解当前任务状态、可用工具及其历史表现，然后逐条对照已知错误模式进行诊断，避免了无依据的幻觉式批判。</div>\n<h5>动态重规划（Dynamic Re-planning）</h5>\n<p>即使 Planning Errors 提供了可靠先验，纯执行前反思仍可能存在<strong>盲点</strong>——许多执行时约束在规划阶段无法预知（如工具输出不可用、外部信息缺失）。</p>\n<p>动态重规划机制的核心设计：</p>\n<ol>\n<li><strong>连续监控</strong>：执行过程中 Agent 持续评估当前轨迹是否仍然可行</li>\n<li><strong>触发条件</strong>：当进度停滞或可行性条件被违反时，Agent 显式推理\"为什么现有计划不再有效\"</li>\n<li><strong>增量更新</strong>：重规划<strong>不回退或丢弃已有轨迹</strong>，而是在执行历史的基础上<strong>追加新的规划+前瞻性反思阶段</strong></li>\n<li><strong>闭环保证</strong>：重规划生成的任何新计划，都<strong>再次经过前瞻性反思验证</strong>后才进入执行</li>\n</ol>\n<pre><code>动态重规划伪代码：\n\nwhile not task_complete:\n    # 标准 think-act-observe 循环\n    thought = agent.think(current_state, plan)\n    action = agent.act(thought)\n    observation = env.step(action)\n\n    # 可行性检查\n    if is_stalled(current_state) or violates_constraints(observation):\n        # 推理失败原因\n        reason = agent.analyze_why_ineffective(current_plan, trajectory)\n        # 触发重规划（包含前瞻性反思）\n        new_plan = ProspectiveReflection(\n            plan=agent.replan(trajectory, reason),\n            planning_errors=planning_errors,\n            env_info=current_env\n        )\n        plan = new_plan\n\n    current_state = update_state(observation)\n</code></pre>\n<h5>与传统方法的区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th>传统反思（Reflexion/Self-Refine）</th>\n<th>PreFlect</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><strong>反思时机</strong></td>\n<td>执行后，失败已发生</td>\n<td>执行前，计划生成后</td>\n</tr>\n<tr>\n<td><strong>风险性质</strong></td>\n<td>反应式纠正，不可逆错误无法挽回</td>\n<td>主动预防，在行动前规避风险</td>\n</tr>\n<tr>\n<td><strong>指导信号</strong></td>\n<td>轨迹级口头反馈</td>\n<td>蒸馏的 Planning Errors 结构先验</td>\n</tr>\n<tr>\n<td><strong>错误预防</strong></td>\n<td>依赖试错学习</td>\n<td>基于历史模式的经验匹配</td>\n</tr>\n<tr>\n<td><strong>执行适应性</strong></td>\n<td>固定规划周期</td>\n<td>动态重规划 + 持续前瞻验证</td>\n</tr>\n</tbody>\n</table></div>\n<h5>与 RLHF 中反思机制的关系</h5>\n<p>PreFlect 的前瞻性反思理念与 RLHF 中的策略约束有深层相似性：正如 PPO 通过裁剪目标函数在<strong>训练时</strong>约束策略更新幅度以避免灾难性遗忘，PreFlect 通过 Planning Errors 在<strong>推理时</strong>约束计划质量以避免不可逆错误。两者都体现了\"预防优于修复\"的设计哲学——在代价高昂之前施加约束。</p>",
      "quiz": {
        "q": "PreFlect 中 Planning Errors 的核心作用是什么？",
        "options": [
          "在执行后分析失败原因，生成口头反馈",
          "提取成功轨迹的最优动作序列，直接复用于新任务",
          "从历史轨迹中蒸馏结构化的错误/成功模式，为前瞻性反思提供经验锚点",
          "自动选择最优工具组合，替代 Agent 的工具选择模块"
        ],
        "answer": 2,
        "explain": "Planning Errors 是通过离线蒸馏从混合结果轨迹中提取的结构化错误模式（含对比样例），为执行前的计划批判提供有依据的参考，避免空泛的幻觉式反思。"
      }
    },
    {
      "id": "lwm_planner",
      "num": 17,
      "name": "LWM-Planner",
      "fullName": "事实增强前瞻规划 (LWM-Planner)",
      "year": "2025.06",
      "org": "University of Cambridge",
      "parent": "lats",
      "paperUrl": "https://arxiv.org/abs/2506.09171",
      "projectUrl": "",
      "category": "search",
      "motivation": "用原子事实支撑前瞻搜索与估值",
      "summary": "LWM-Planner 通过从历史轨迹中提取并验证原子事实，把这些事实注入动作提议、单步世界模型模拟和价值估计，让 lookahead search 不再只靠 LLM 自己“想象未来”，而是被经验事实锚定。",
      "keyPoints": [
        "论文标题是 <em>Fact-Augmented Lookahead Planning for LLM Agents</em>，其中提出的具体方法名就是 <code>LWM-Planner</code>。",
        "每轮 episode 后抽取 task-critical atomic facts，并用 predictive-consistency filter 过滤噪声事实。",
        "事实集合同时作用于三个环节：动作候选生成、single-step latent world-model simulation、state-value estimation。",
        "推理期采用 recursive, depth-limited lookahead，不更新参数，纯粹靠 test-time search + in-context facts 提升表现。",
        "论文给出抽象层解释：事实可降低状态混叠误差 <span class=\"kb-math kb-math-inline\">\\epsilon_{\\mathrm{sim}}</span>，fact-conditioned simulation 可降低单步模型误差 <span class=\"kb-math kb-math-inline\">\\delta_{\\mathrm{model}}</span>。",
        "在 text FrozenLake、CrafterMini 和 ALFWorld 上，LWM-Planner 相比 ReAct、Reflexion 和纯搜索基线都提升了累计回报。"
      ],
      "detail": "<p><img alt=\"LWM-Planner 框架图\" src=\"https://arxiv.org/html/2506.09171v2/figs/updated_main.png\" />\n<em>图：LWM-Planner 从当前观察和累计 Atomic Facts 出发，执行受事实约束的 lookahead planning，并用 latent world model 与 value estimation 共同选择动作。</em></p>\n<pre><code class=\"language-python\"># LWM-Planner 的测试时规划流程\nfacts = []\n\nfor episode in episodes:\n    facts = extract_atomic_facts(episode.trajectory)\n    facts = predictive_consistency_filter(facts)\n\nstate = current_observation()\nfor t in range(horizon):\n    actions = propose_actions(state, facts)\n    rollouts = []\n    for action in actions:\n        next_latent = latent_world_model(state, action, facts)\n        value = value_estimator(next_latent, facts)\n        rollouts.append((action, next_latent, value))\n    action = select_by_depth_limited_lookahead(rollouts)\n    state = env.step(action)\n</code></pre>\n<p>LWM-Planner 要解决的问题，是 search-based agent 在长程、部分可观测环境里的一个根本缺陷：即使引入了 lookahead，很多方法依然只是让 LLM 在上下文里虚构几步未来，然后再给这些“想象出来的轨迹”打分。这样做的问题是，一旦模型的前瞻轨迹脱离真实环境约束，后续价值估计就会建立在错误前提上，搜索反而会把幻觉放大。</p>\n<p>这篇论文的办法不是去训练一个更大的世界模型，而是先把 agent 在历史轨迹里已经见过、并且对任务有约束力的事实提炼出来。作者把这些信息表述成 atomic facts，例如某个位置存在 hole、某类资源必须先收集、某些状态转移会带来特定结果。然后用 predictive-consistency filter 筛掉不稳定或彼此矛盾的候选事实，只留下足够可靠、可在推理期直接拼接进上下文的事实集。</p>\n<p>这些事实不是只在一个点上起作用，而是同时进入三个关键子模块。第一，它们约束动作提议，减少明显违背环境经验的候选动作；第二，它们进入单步 latent world-model simulation，让模型在想象下一步后果时不至于完全脱离事实；第三，它们参与 value estimation，让 frontier state 的估值不再只由语言模型主观打分决定。于是 lookahead search 的每一层都被同一组 compact facts 约束，而不是只在搜索末端做一次验证。</p>\n<p>论文还给了一个很有代表性的解释框架：如果把部分可观测环境里的错误看成状态混叠和单步模拟误差，那么 atomic facts 的作用类似于减少这两种误差的代理量。作者没有声称严格定理，但这个解释足够说明为什么“经验事实 + 轻量搜索”会比“纯搜索堆算力”更稳。它也解释了为什么这篇工作强调 online improvement without parameter updates: 增益来自 test-time memory grounding，而不是重新训练 agent。</p>\n<p>和 LATS 之类方法相比，LWM-Planner 没有否定树搜索，而是给树搜索补上了事实锚点；和 Reflexion 相比，它不是主要在失败后写自然语言反思，而是在行动前的 lookahead 阶段就让未来轨迹更贴近真实环境。这使它在 search 分支上更像“grounded lookahead”而不是“free-form deliberation”。</p>\n<div class=\"key-point\">💡 关键：LWM-Planner 的新意不在“再加一个记忆库”，而在于把 compact facts 直接接入 lookahead 的动作、模拟、估值三个接口。</div>",
      "quiz": {
        "q": "LWM-Planner 中 atomic facts 的主要作用是什么？",
        "options": [
          "替代环境执行器，直接生成最终答案",
          "仅在 episode 结束后做误差分析，不参与当前搜索",
          "同时约束动作提议、单步模拟和价值估计，让 lookahead 更接地",
          "把 ReAct 的轨迹压缩成更短的 prompt"
        ],
        "answer": 2,
        "explain": "LWM-Planner 的事实集会进入 action proposal、latent world-model simulation 和 state-value estimation，因此它不是事后注释，而是直接改变当前搜索质量。"
      }
    },
    {
      "id": "tape",
      "num": 18,
      "name": "TAPE",
      "fullName": "工具引导自适应规划与约束执行 (TAPE)",
      "year": "2026.02",
      "org": "University of Wisconsin-Madison",
      "parent": "plan_and_act",
      "paperUrl": "https://arxiv.org/abs/2602.19633",
      "projectUrl": "",
      "category": "closed_loop",
      "motivation": "求解器选可行路径并约束解码执行",
      "summary": "TAPE 把工具调用规划改写成受约束的可行路径搜索问题，再在生成动作时施加 constrained decoding，保证 LLM 实际输出的调用序列不偏离求解器选出的计划，从而显著降低多工具链路里的级联错误。",
      "keyPoints": [
        "框架分三段：Plan Graph Construction、Planning Solver、Constrained Execution。",
        "先从 LM 给出的多条候选推理路径中抽取工具依赖，构造成带类型和前置约束的 plan graph。",
        "再由求解器在图上筛选满足约束的可行执行路径，而不是直接相信 LLM 原始规划文本。",
        "最后在动作生成阶段做 constrained decoding，屏蔽与选定计划冲突的 token 或调用。",
        "目标场景是多工具、强约束函数调用；论文在 BFCL V3 上给出 53.7% 准确率，相比 ReAct 的 42.8% 有明显提升。",
        "核心思想不是“让 LLM 更会计划”，而是把可靠性关键部分外包给显式约束求解与执行约束。"
      ],
      "detail": "<p><img alt=\"TAPE 框架图\" src=\"https://ar5iv.labs.arxiv.org/html/2602.19633/assets/x1.png\" />\n<em>图：TAPE 先构建 plan graph，再由 planning solver 选择可行路径，最后用 constrained execution 约束实际解码。</em></p>\n<pre><code class=\"language-python\"># TAPE 的三阶段执行流程\npaths = lm.sample_reasoning_paths(query, tool_specs)\nplan_graph = build_plan_graph(paths, tool_specs)\nfeasible_plan = planning_solver(plan_graph)\n\nfor step in feasible_plan:\n    action = constrained_decode(\n        model=lm,\n        allowed_schema=step.schema,\n        allowed_tools=step.tools,\n        allowed_dependencies=step.dependencies,\n    )\n    obs = execute(action)\n    if violates_runtime_constraints(obs):\n        feasible_plan = planning_solver(update_graph(plan_graph, obs))\n</code></pre>\n<p>TAPE 的问题设定非常工程化：在复杂工具调用任务里，LLM 往往不是完全不会推理，而是经常在“哪一步该先调哪个工具、参数是否满足类型约束、某个结果是否必须先由前一步产出”这些地方犯错。一旦前面一步调用顺序错了，后面即使语言描述看起来合理，也会因为依赖没满足而整体失败。论文因此把重点从“提升推理自然度”转向“保证执行可行性”。</p>\n<p>第一步是 plan graph construction。模型可以给出多条候选 reasoning path，但这些路径本身不直接执行，而是被解析成图结构：节点表示待执行的工具调用或中间变量，边表示输入输出依赖、参数类型约束和先后顺序。这样做的意义在于，原本埋在自然语言里的隐式依赖被显式抽取出来，后续就可以交给传统求解器处理。</p>\n<p>第二步是 planning solver。求解器的任务不是生成语言，而是在图里找出满足约束的 feasible path。它会综合考虑工具的输入输出兼容性、依赖是否已满足、以及整体路径是否能完成目标。这一步相当于把“规划正确性”从 LLM 的软约束，提升成一个可以被验证的硬约束过程。也正因如此，TAPE 不是简单的 plan-and-execute，而是 solver-in-the-loop 的 planning。</p>\n<p>第三步是 constrained execution，也是这篇论文最关键的一环。很多方法即使拿到了高质量计划，最后仍可能在 token 级别偏航，生成了计划外工具名、错误参数或不合法结构。TAPE 在解码时显式限制可生成的动作空间，只允许与当前计划节点兼容的工具和参数形式出现。于是“计划对了但执行走歪”的问题被压住了，规划和执行之间的缝隙被补上。</p>\n<p>与 ReAct 相比，TAPE 并不是把 thought/action 循环做得更长，而是把其中最脆弱的部分形式化；与 Plan-and-Act 相比，TAPE 更强调“计划可行性”和“执行不越轨”，适合工具链依赖和 schema 约束都很强的函数调用场景。它代表的是 agent 里一个很清楚的方向：在工具使用问题上，可靠性往往来自 constraint-aware orchestration，而不是更自由的语言推理。</p>\n<div class=\"key-point\">💡 关键：TAPE 的收益来自两次约束注入, 一次在求解阶段筛可行计划，一次在解码阶段防止执行偏航。</div>",
      "quiz": {
        "q": "TAPE 中 constrained execution 的直接目的是什么？",
        "options": [
          "提高 world model 的模拟精度",
          "把多个候选计划合并成一棵搜索树",
          "限制生成动作只能落在已求得的可行计划允许范围内",
          "让 LLM 自动学习新的工具 schema"
        ],
        "answer": 2,
        "explain": "TAPE 不只求可行计划，还在执行时约束解码，让模型不能随意生成计划外工具或参数，从而减少级联错误。"
      }
    }
  ],
  "categories": {
    "foundation": {
      "label": "早期规划原型",
      "color": "#0F766E"
    },
    "reactive": {
      "label": "交错式Agent循环",
      "color": "#2563EB"
    },
    "search": {
      "label": "搜索与世界模型",
      "color": "#7C3AED"
    },
    "decomposition": {
      "label": "分层规划-执行",
      "color": "#EA580C"
    },
    "closed_loop": {
      "label": "反思与重规划闭环",
      "color": "#DC2626"
    }
  },
  "projectUrls": {}
};
