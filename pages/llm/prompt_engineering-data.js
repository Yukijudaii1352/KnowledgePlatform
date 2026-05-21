/**
 * prompt_engineering-data.js — 由 pipeline/build.py 于 2026-05-21 11:23:26 自动生成。
 * 源文件：content/llm/prompt_engineering.md
 * ⚠️  请勿手动修改；如需更新，修改源文档后重新编译。
 */
window.PAGE_CONFIG = {
  "meta": {
    "domain": "llm",
    "topic_id": "prompt_engineering",
    "topic_name": "提示词工程",
    "page_title": "提示词工程 算法总结",
    "page_subtitle": "2026-05-21 版",
    "page_desc": "系统性梳理从基础Prompt设计到思维链(CoT)、自动化提示优化及2026年最新前沿技术的演进脉络。",
    "page_icon": "✍️",
    "hero_pills": [
      "Prompt设计 · 思维链 · 提示优化"
    ],
    "count_pill": "{count} 个算法",
    "image_base": "",
    "overview_from_doc": true,
    "latest_overview_from_doc": true
  },
  "overview": [
    {
      "title": "待补充：阶段性领域总结",
      "body_html": "<p>请补充一篇纵观一段时间以来的总结性文档，建议使用 <code>!INCLUDE_RAW path/to/article.md</code> 引入人工筛选后的 Markdown。</p>"
    }
  ],
  "latest_overview": [
    {
      "title": "待补充：最近一个月最新动向",
      "body_html": "<p>请补充最近一个月该领域最新动向的综述文档，建议使用 <code>!INCLUDE_RAW path/to/article.md</code> 引入人工筛选后的 Markdown。</p>"
    }
  ],
  "graph": {
    "nodes": [
      {
        "id": "few_shot",
        "x": 100,
        "y": 100,
        "category": "basic"
      },
      {
        "id": "zero_shot",
        "x": 100,
        "y": 150,
        "category": "basic"
      },
      {
        "id": "icl",
        "x": 200,
        "y": 100,
        "category": "basic"
      },
      {
        "id": "cot",
        "x": 250,
        "y": 200,
        "category": "reasoning"
      },
      {
        "id": "self_consistency",
        "x": 300,
        "y": 240,
        "category": "reasoning"
      },
      {
        "id": "zero_shot_cot",
        "x": 350,
        "y": 180,
        "category": "reasoning"
      },
      {
        "id": "least_to_most",
        "x": 350,
        "y": 220,
        "category": "reasoning"
      },
      {
        "id": "react",
        "x": 380,
        "y": 260,
        "category": "reasoning"
      },
      {
        "id": "tot",
        "x": 450,
        "y": 200,
        "category": "reasoning"
      },
      {
        "id": "pal",
        "x": 450,
        "y": 240,
        "category": "reasoning"
      },
      {
        "id": "universal_sc",
        "x": 480,
        "y": 280,
        "category": "reasoning"
      },
      {
        "id": "got",
        "x": 550,
        "y": 200,
        "category": "reasoning"
      },
      {
        "id": "self_refine",
        "x": 350,
        "y": 300,
        "category": "optimization"
      },
      {
        "id": "reflexion",
        "x": 400,
        "y": 300,
        "category": "optimization"
      },
      {
        "id": "ape",
        "x": 450,
        "y": 340,
        "category": "optimization"
      },
      {
        "id": "promptbreeder",
        "x": 500,
        "y": 360,
        "category": "optimization"
      },
      {
        "id": "opro",
        "x": 550,
        "y": 340,
        "category": "optimization"
      },
      {
        "id": "causal_cot",
        "x": 650,
        "y": 380,
        "category": "frontier_2026"
      },
      {
        "id": "ncots",
        "x": 650,
        "y": 420,
        "category": "frontier_2026"
      },
      {
        "id": "long_cot",
        "x": 650,
        "y": 460,
        "category": "frontier_2026"
      },
      {
        "id": "grace",
        "x": 700,
        "y": 400,
        "category": "frontier_2026"
      },
      {
        "id": "uniapo",
        "x": 720,
        "y": 440,
        "category": "frontier_2026"
      },
      {
        "id": "promptmix",
        "x": 750,
        "y": 380,
        "category": "frontier_2026"
      },
      {
        "id": "vcp",
        "x": 800,
        "y": 380,
        "category": "frontier_2026"
      }
    ],
    "edges": [
      {
        "from": "few_shot",
        "to": "icl",
        "label": "示例优化"
      },
      {
        "from": "few_shot",
        "to": "cot",
        "label": "引入推理步骤"
      },
      {
        "from": "cot",
        "to": "self_consistency",
        "label": "多路径投票"
      },
      {
        "from": "cot",
        "to": "zero_shot_cot",
        "label": "零样本激发"
      },
      {
        "from": "cot",
        "to": "least_to_most",
        "label": "问题分解"
      },
      {
        "from": "cot",
        "to": "react",
        "label": "行动协同"
      },
      {
        "from": "cot",
        "to": "tot",
        "label": "树状搜索"
      },
      {
        "from": "cot",
        "to": "pal",
        "label": "代码执行"
      },
      {
        "from": "self_consistency",
        "to": "universal_sc",
        "label": "开放任务"
      },
      {
        "from": "tot",
        "to": "got",
        "label": "图状建模"
      },
      {
        "from": "self_refine",
        "to": "reflexion",
        "label": "语言反馈"
      },
      {
        "from": "ape",
        "to": "promptbreeder",
        "label": "进化算法"
      },
      {
        "from": "ape",
        "to": "opro",
        "label": "迭代优化"
      },
      {
        "from": "cot",
        "to": "causal_cot",
        "label": "因果推理"
      },
      {
        "from": "tot",
        "to": "ncots",
        "label": "神经搜索"
      },
      {
        "from": "cot",
        "to": "long_cot",
        "label": "长链缩放"
      },
      {
        "from": "opro",
        "to": "grace",
        "label": "门控压缩"
      },
      {
        "from": "opro",
        "to": "uniapo",
        "label": "多模态"
      },
      {
        "from": "promptmix",
        "to": "vcp",
        "label": "视觉条件"
      }
    ],
    "milestones": [
      "few_shot",
      "cot",
      "opro"
    ]
  },
  "algos": [
    {
      "id": "few_shot",
      "num": 1,
      "name": "Few-shot",
      "fullName": "少样本提示 (Few-shot Prompting)",
      "year": "2020",
      "org": "OpenAI",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2005.14165",
      "projectUrl": "",
      "category": "basic",
      "motivation": "通过少量示例激发模型上下文学习能力",
      "summary": "Few-shot 的核心目标是：通过少量示例激发模型上下文学习能力。",
      "keyPoints": [
        "核心动机：通过少量示例激发模型上下文学习能力",
        "代表机构：OpenAI"
      ],
      "detail": "<p>通过少量示例激发模型上下文学习能力</p>"
    },
    {
      "id": "zero_shot",
      "num": 2,
      "name": "Zero-shot",
      "fullName": "零样本提示 (Zero-shot Prompting)",
      "year": "2020",
      "org": "OpenAI",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2005.14165",
      "projectUrl": "",
      "category": "basic",
      "motivation": "仅凭指令完成任务，无需示例",
      "summary": "Zero-shot 的核心目标是：仅凭指令完成任务，无需示例。",
      "keyPoints": [
        "核心动机：仅凭指令完成任务，无需示例",
        "代表机构：OpenAI"
      ],
      "detail": "<p>仅凭指令完成任务，无需示例</p>"
    },
    {
      "id": "icl",
      "num": 3,
      "name": "ICL",
      "fullName": "上下文学习 (In-Context Learning)",
      "year": "2021",
      "org": "Google/Stanford",
      "parent": "few_shot",
      "paperUrl": "https://arxiv.org/abs/2110.04541",
      "projectUrl": "",
      "category": "basic",
      "motivation": "研究示例选择与顺序对性能的影响",
      "summary": "ICL 的核心目标是：研究示例选择与顺序对性能的影响。",
      "keyPoints": [
        "核心动机：研究示例选择与顺序对性能的影响",
        "演化来源：继承或改进自 few_shot",
        "代表机构：Google/Stanford"
      ],
      "detail": "<p>研究示例选择与顺序对性能的影响</p>"
    },
    {
      "id": "cot",
      "num": 4,
      "name": "CoT",
      "fullName": "思维链 (Chain-of-Thought)",
      "year": "2022.01",
      "org": "Google",
      "parent": "few_shot",
      "paperUrl": "https://proceedings.neurips.cc/paper/2022/hash/9d5609613524ecf4f15af0f7b31abca4-Abstract-Conference.html",
      "projectUrl": "",
      "category": "reasoning",
      "motivation": "通过中间推理步骤提升复杂推理能力",
      "summary": "CoT 的核心目标是：通过中间推理步骤提升复杂推理能力。",
      "keyPoints": [
        "核心动机：通过中间推理步骤提升复杂推理能力",
        "演化来源：继承或改进自 few_shot",
        "代表机构：Google"
      ],
      "detail": "<p>通过中间推理步骤提升复杂推理能力</p>"
    },
    {
      "id": "self_consistency",
      "num": 5,
      "name": "Self-Consistency",
      "fullName": "自洽性 (Self-Consistency)",
      "year": "2022.03",
      "org": "Google",
      "parent": "cot",
      "paperUrl": "https://arxiv.org/abs/2203.11171",
      "projectUrl": "",
      "category": "reasoning",
      "motivation": "多路径采样投票提升推理鲁棒性",
      "summary": "Self-Consistency 的核心目标是：多路径采样投票提升推理鲁棒性。",
      "keyPoints": [
        "核心动机：多路径采样投票提升推理鲁棒性",
        "演化来源：继承或改进自 cot",
        "代表机构：Google"
      ],
      "detail": "<p>多路径采样投票提升推理鲁棒性</p>"
    },
    {
      "id": "zero_shot_cot",
      "num": 6,
      "name": "Zero-shot CoT",
      "fullName": "零样本思维链 (Zero-shot CoT)",
      "year": "2022.05",
      "org": "东京大学/Google",
      "parent": "cot",
      "paperUrl": "https://proceedings.neurips.cc/paper_files/paper/2022/hash/8bb0d291acd4acf06ef112099c16f326-Abstract-Conference.html",
      "projectUrl": "",
      "category": "reasoning",
      "motivation": "\"Let's think step by step\"激发推理",
      "summary": "Zero-shot CoT 的核心目标是：\"Let's think step by step\"激发推理。",
      "keyPoints": [
        "核心动机：\"Let's think step by step\"激发推理",
        "演化来源：继承或改进自 cot",
        "代表机构：东京大学/Google"
      ],
      "detail": "<p>\"Let's think step by step\"激发推理</p>"
    },
    {
      "id": "least_to_most",
      "num": 7,
      "name": "Least-to-Most",
      "fullName": "由易到难提示 (Least-to-Most Prompting)",
      "year": "2022.05",
      "org": "Google",
      "parent": "cot",
      "paperUrl": "https://arxiv.org/abs/2205.10625",
      "projectUrl": "",
      "category": "reasoning",
      "motivation": "将复杂问题分解为子问题逐步求解",
      "summary": "Least-to-Most 的核心目标是：将复杂问题分解为子问题逐步求解。",
      "keyPoints": [
        "核心动机：将复杂问题分解为子问题逐步求解",
        "演化来源：继承或改进自 cot",
        "代表机构：Google"
      ],
      "detail": "<p>将复杂问题分解为子问题逐步求解</p>"
    },
    {
      "id": "react",
      "num": 8,
      "name": "ReAct",
      "fullName": "推理行动协同 (ReAct)",
      "year": "2022.10",
      "org": "Google/Princeton",
      "parent": "cot",
      "paperUrl": "https://arxiv.org/abs/2210.03629",
      "projectUrl": "",
      "category": "reasoning",
      "motivation": "协同推理与行动调用外部工具",
      "summary": "ReAct 的核心目标是：协同推理与行动调用外部工具。",
      "keyPoints": [
        "核心动机：协同推理与行动调用外部工具",
        "演化来源：继承或改进自 cot",
        "代表机构：Google/Princeton"
      ],
      "detail": "<p>协同推理与行动调用外部工具</p>"
    },
    {
      "id": "tot",
      "num": 9,
      "name": "ToT",
      "fullName": "思维树 (Tree of Thoughts)",
      "year": "2023",
      "org": "Princeton/Google",
      "parent": "cot",
      "paperUrl": "https://proceedings.neurips.cc/paper/2023/hash/271db9922b8d1f4dd7aaef84ed5ac703-Abstract.html",
      "projectUrl": "",
      "category": "reasoning",
      "motivation": "引入搜索算法探索与回溯思维路径",
      "summary": "ToT 的核心目标是：引入搜索算法探索与回溯思维路径。",
      "keyPoints": [
        "核心动机：引入搜索算法探索与回溯思维路径",
        "演化来源：继承或改进自 cot",
        "代表机构：Princeton/Google"
      ],
      "detail": "<p>引入搜索算法探索与回溯思维路径</p>"
    },
    {
      "id": "pal",
      "num": 10,
      "name": "PAL",
      "fullName": "程序辅助语言模型 (PAL)",
      "year": "2023",
      "org": "CMU",
      "parent": "cot",
      "paperUrl": "https://proceedings.mlr.press/v202/gao23f.html",
      "projectUrl": "",
      "category": "reasoning",
      "motivation": "将推理转为可执行代码保证准确性",
      "summary": "PAL 的核心目标是：将推理转为可执行代码保证准确性。",
      "keyPoints": [
        "核心动机：将推理转为可执行代码保证准确性",
        "演化来源：继承或改进自 cot",
        "代表机构：CMU"
      ],
      "detail": "<p>将推理转为可执行代码保证准确性</p>"
    },
    {
      "id": "universal_sc",
      "num": 11,
      "name": "Universal SC",
      "fullName": "通用自洽性 (Universal Self-Consistency)",
      "year": "2023.11",
      "org": "Google",
      "parent": "self_consistency",
      "paperUrl": "https://arxiv.org/abs/2311.17311",
      "projectUrl": "",
      "category": "reasoning",
      "motivation": "扩展自洽性至开放式任务",
      "summary": "Universal SC 的核心目标是：扩展自洽性至开放式任务。",
      "keyPoints": [
        "核心动机：扩展自洽性至开放式任务",
        "演化来源：继承或改进自 self_consistency",
        "代表机构：Google"
      ],
      "detail": "<p>扩展自洽性至开放式任务</p>"
    },
    {
      "id": "got",
      "num": 12,
      "name": "GoT",
      "fullName": "思维图 (Graph of Thoughts)",
      "year": "2024",
      "org": "ETH Zurich",
      "parent": "tot",
      "paperUrl": "https://ojs.aaai.org/index.php/AAAI/article/view/29720",
      "projectUrl": "",
      "category": "reasoning",
      "motivation": "将思维建模为有向图支持聚合循环",
      "summary": "GoT 的核心目标是：将思维建模为有向图支持聚合循环。",
      "keyPoints": [
        "核心动机：将思维建模为有向图支持聚合循环",
        "演化来源：继承或改进自 tot",
        "代表机构：ETH Zurich"
      ],
      "detail": "<p>将思维建模为有向图支持聚合循环</p>"
    },
    {
      "id": "self_refine",
      "num": 13,
      "name": "Self-Refine",
      "fullName": "自我精炼 (Self-Refine)",
      "year": "2023.03",
      "org": "CMU/Allen AI",
      "parent": "—",
      "paperUrl": "https://proceedings.neurips.cc/paper_files/paper/2023/hash/91edff07232fb1b55a505a9e9f6c0ff3-Abstract-Conference.html",
      "projectUrl": "",
      "category": "optimization",
      "motivation": "通过自我反馈迭代改进输出质量",
      "summary": "Self-Refine 的核心目标是：通过自我反馈迭代改进输出质量。",
      "keyPoints": [
        "核心动机：通过自我反馈迭代改进输出质量",
        "代表机构：CMU/Allen AI"
      ],
      "detail": "<p>通过自我反馈迭代改进输出质量</p>"
    },
    {
      "id": "reflexion",
      "num": 14,
      "name": "Reflexion",
      "fullName": "反思学习 (Reflexion)",
      "year": "2023.03",
      "org": "MIT/Northeastern",
      "parent": "self_refine",
      "paperUrl": "https://proceedings.neurips.cc/paper_files/paper/2023/hash/1b44b878bb782e6954cd888628510e90-Abstract-Conference.html",
      "projectUrl": "",
      "category": "optimization",
      "motivation": "语言反馈实现无梯度闭环学习",
      "summary": "Reflexion 的核心目标是：语言反馈实现无梯度闭环学习。",
      "keyPoints": [
        "核心动机：语言反馈实现无梯度闭环学习",
        "演化来源：继承或改进自 self_refine",
        "代表机构：MIT/Northeastern"
      ],
      "detail": "<p>语言反馈实现无梯度闭环学习</p>"
    },
    {
      "id": "ape",
      "num": 15,
      "name": "APE",
      "fullName": "自动提示工程师 (Automatic Prompt Engineer)",
      "year": "2023",
      "org": "多伦多大学",
      "parent": "—",
      "paperUrl": "https://openreview.net/forum?id=92gvk82DE-",
      "projectUrl": "",
      "category": "optimization",
      "motivation": "利用LLM自动生成筛选最优指令",
      "summary": "APE 的核心目标是：利用LLM自动生成筛选最优指令。",
      "keyPoints": [
        "核心动机：利用LLM自动生成筛选最优指令",
        "代表机构：多伦多大学"
      ],
      "detail": "<p>利用LLM自动生成筛选最优指令</p>"
    },
    {
      "id": "promptbreeder",
      "num": 16,
      "name": "PromptBreeder",
      "fullName": "提示词繁殖 (PromptBreeder)",
      "year": "2023.09",
      "org": "DeepMind",
      "parent": "ape",
      "paperUrl": "https://arxiv.org/abs/2309.16797",
      "projectUrl": "",
      "category": "optimization",
      "motivation": "进化算法实现提示词自我演化",
      "summary": "PromptBreeder 的核心目标是：进化算法实现提示词自我演化。",
      "keyPoints": [
        "核心动机：进化算法实现提示词自我演化",
        "演化来源：继承或改进自 ape",
        "代表机构：DeepMind"
      ],
      "detail": "<p>进化算法实现提示词自我演化</p>"
    },
    {
      "id": "opro",
      "num": 17,
      "name": "OPRO",
      "fullName": "提示优化 (OPRO)",
      "year": "2024",
      "org": "Google DeepMind",
      "parent": "ape",
      "paperUrl": "https://proceedings.iclr.cc/paper_files/paper/2024/hash/3339f19c5fcee3ad74502947a32be9e6-Abstract-Conference.html",
      "projectUrl": "",
      "category": "optimization",
      "motivation": "LLM作为优化器迭代提升提示词",
      "summary": "OPRO 的核心目标是：LLM作为优化器迭代提升提示词。",
      "keyPoints": [
        "核心动机：LLM作为优化器迭代提升提示词",
        "演化来源：继承或改进自 ape",
        "代表机构：Google DeepMind"
      ],
      "detail": "<p>LLM作为优化器迭代提升提示词</p>"
    },
    {
      "id": "causal_cot",
      "num": 18,
      "name": "Causal-CoT",
      "fullName": "因果思维链 (Causal CoT)",
      "year": "2026.01",
      "org": "NeurIPS",
      "parent": "cot",
      "paperUrl": "https://proceedings.neurips.cc/paper_files/paper/2025/hash/b7870bd43b2d133a1ed95582ae5d82a4-Abstract-Conference.html",
      "projectUrl": "",
      "category": "frontier_2026",
      "motivation": "因果分析消除幻觉提升逻辑严密性",
      "summary": "Causal-CoT 的核心目标是：因果分析消除幻觉提升逻辑严密性。",
      "keyPoints": [
        "核心动机：因果分析消除幻觉提升逻辑严密性",
        "演化来源：继承或改进自 cot",
        "代表机构：NeurIPS"
      ],
      "detail": "<p>因果分析消除幻觉提升逻辑严密性</p>"
    },
    {
      "id": "ncots",
      "num": 19,
      "name": "NCoTS",
      "fullName": "神经思维链搜索 (Neural CoT Search)",
      "year": "2026.01",
      "org": "arXiv",
      "parent": "tot",
      "paperUrl": "https://arxiv.org/abs/2601.11340",
      "projectUrl": "",
      "category": "frontier_2026",
      "motivation": "搜索最优推理路径减少冗余提升准确率",
      "summary": "NCoTS 将大语言模型的推理过程重新建模为**最优思维策略的动态搜索问题**，在每个推理决策点通过双因子启发式函数（路径潜力 + 推理进度）评估候选推理算子，实现了准确率提升 3.5% 同时生成长度缩减 22% 的帕累托改进。",
      "keyPoints": [
        "<strong>推理路径规划瓶颈</strong>：揭示当前大推理模型（LRM）缺乏前瞻性，在关键决策点无法战略性地选择推理方向，导致陷入冗余的次优路径",
        "<strong>推理算子（Reasoning Operators）</strong>：定义思维 token 集合 \\(O = \\{\\text{Wait}, \\text{So}, \\text{Then}, \\ldots\\}\\) 作为推理方向的控制信号，不同算子一致性地触发不同思维模式",
        "<strong>四阶段搜索框架</strong>：暂停生成（Pause）→ 前瞻模拟（Lookahead）→ 启发式评估（Heuristic）→ 概率选择（Selection）",
        "<strong>双因子启发式函数</strong>：路径潜力估计器 \\(\\mathcal{H}_{\\text{pot}}\\)（通过 KL 散度从教师模型策略蒸馏）+ 进度估计器 \\(\\mathcal{H}_{\\text{prog}}\\)（MSE 回归预测推理完成比例）",
        "<strong>复合评分</strong>：\\(S(o) = \\mathcal{H}_{\\text{pot}}(h_t, o) + \\lambda \\cdot \\mathcal{H}_{\\text{prog}}(h'_{t,o})\\)，加法组合兼顾正确性与效率",
        "<strong>极低开销</strong>：仅增加 0.0017% 参数量，仅在约 3% 的 token 位置（步骤分隔符处）激活搜索",
        "<strong>与现有方法兼容</strong>：可与 AdaptThink 等推理效率方法叠加使用，效果进一步提升"
      ],
      "detail": "<h5>核心框架图</h5>\n<p><img alt=\"NCoTS 框架总览\" src=\"https://ar5iv.labs.arxiv.org/html/2601.11340/assets/x2.png\" />\n<em>图：NCoTS 框架总览。(a) 路径潜力估计器通过策略蒸馏从教师模型获取高层规划能力；(b) 进度估计器预测推理完成比例；(c) 四阶段搜索流程在每个决策点评估候选算子并选择最优方向。</em></p>\n<p><img alt=\"推理动机与路径规划重要性\" src=\"https://ar5iv.labs.arxiv.org/html/2601.11340/assets/x1.png\" />\n<em>图：(a) 传统 CoT 的规划瓶颈——模型在关键分叉点缺乏前瞻；(b) 来自强教师模型的稀疏引导 token 仅占总输出约 3%，却带来平均 6.2% 的准确率提升，证实路径规划是核心瓶颈。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># NCoTS 核心搜索流程伪代码\ndef ncots_generate(model, prompt, operators, H_pot, H_prog, λ, τ):\n    &quot;&quot;&quot;\n    model:     基础推理模型 (如 DeepSeek-R1-Distill-Qwen-7B)\n    operators: 推理算子集合 O = {&quot;Wait&quot;, &quot;So&quot;, &quot;Then&quot;, ...}\n    H_pot:     路径潜力估计器 (KL散度策略蒸馏训练)\n    H_prog:    进度估计器 (MSE回归训练)\n    λ:         进度权重超参数\n    τ:         softmax温度参数\n    &quot;&quot;&quot;\n    tokens = []\n    while not is_finished(tokens):\n        next_token = model.generate_next(prompt + tokens)\n        tokens.append(next_token)\n\n        if next_token == STEP_DELIMITER:  # 检测到 &quot;\\n\\n&quot; 步骤分隔符\n            # ── Phase 1: Pause Generation ──\n            # 暂停标准自回归生成\n\n            # ── Phase 2: Lookahead Simulation ──\n            scores = {}\n            h_t = model.get_hidden_state(tokens)\n            for o in operators:\n                # 将算子 o 追加到 KV cache，获取前瞻隐藏状态\n                h_prime = model.forward_one_token(tokens + [o])\n\n                # ── Phase 3: Heuristic Evaluation ──\n                pot  = H_pot(h_t, o)        # 路径潜力 (正确概率)\n                prog = H_prog(h_prime)      # 进度估计 (完成比例)\n                scores[o] = pot + λ * prog  # 加法复合评分\n\n            # ── Phase 4: Probabilistic Selection ──\n            probs = softmax([scores[o] / τ for o in operators])\n            best_op = sample(operators, probs)\n            tokens.append(best_op)\n\n    return tokens\n</code></pre>\n<h5>动机与背景</h5>\n<p>当前的大推理模型（如 DeepSeek-R1、QwQ）通过链式思维（CoT）在数学、逻辑和编程任务上取得了显著进展。然而，这些模型在生成推理步骤时是<strong>逐步顺序生成的，缺乏对整体推理路径的前瞻规划</strong>。这导致模型经常陷入次优的推理路径，产生大量冗余的反思和重复步骤。</p>\n<div class=\"key-point\">💡 关键发现：论文通过实验揭示，来自强教师模型（如 DeepSeek-R1）的稀疏引导 token 仅占总输出的约 3%，却能带来平均 6.2% 的准确率提升。这证明<strong>推理模型的核心瓶颈不在于计算能力，而在于路径规划能力</strong>。</div>\n<h5>推理解空间的量化表征</h5>\n<p>论文首先对推理解空间进行了系统的量化分析。通过在每个决策点随机采样不同的推理算子，生成大量不同的推理路径，并绘制\"平均长度 vs 平均准确率\"的密度热力图：</p>\n<p><img alt=\"推理解空间可视化\" src=\"https://ar5iv.labs.arxiv.org/html/2601.11340/assets/x3.png\" />\n<em>图：推理解空间的密度热力图。原始模型输出（Original）左上方区域的存在证实了\"更准确且更简洁\"的优越路径确实存在。</em></p>\n<p>这一分析揭示了四个关键洞察：\n1. <strong>优越路径存在</strong>：确实存在同时比标准输出更准确、更简洁的推理路径\n2. <strong>路径稀疏性</strong>：这些优越路径在解空间中是稀疏的，随机搜索难以高效找到\n3. <strong>准确率-长度负相关</strong>：更简洁的路径往往更准确，冗余步骤反而降低性能\n4. <strong>搜索的必要性</strong>：需要有引导的搜索策略而非随机探索</p>\n<h5>核心机制：四阶段搜索框架</h5>\n<p>NCoTS 的核心思想是在推理过程的每个<strong>决策点</strong>（即步骤分隔符 <code>\\n\\n</code> 出现的位置）进行主动的路径搜索：</p>\n<p><strong>阶段 1：暂停生成（Pause Generation）</strong></p>\n<p>标准生成过程在检测到步骤分隔符时立即暂停。步骤分隔符是推理步骤之间的自然边界（通常为 <code>\\n\\n</code>），代表模型即将选择下一个推理方向的关键时刻。</p>\n<p><strong>阶段 2：前瞻模拟（Lookahead Simulation）</strong></p>\n<p>在决策点，系统枚举所有候选推理算子 \\(O = \\{o_1, o_2, \\ldots, o_K\\}\\)。每个算子对应一个\"思维 token\"，如 \"Wait\"（触发反思）、\"So\"（推进推导）、\"Then\"（引入新步骤）等。对每个候选算子 \\(o\\)，将其追加到当前 KV cache 中执行一步前向传播，获取前瞻隐藏状态：</p>\n<p>$$\\mathbf{h}'_{t,o} = \\mathcal{M}\\big([x, y_{<t}, o]\\big), \\quad \\forall o \\in O$$</p>\n<div class=\"key-point\">💡 关键：论文发现推理算子与后续思维模式之间存在强对应关系——\"Wait\" 一致性地引导反思步骤，\"Then\" 触发顺序推进，\"Alternatively\" 引入替代方案。这种对应关系使得仅通过一步前瞻即可有效预测后续推理方向。</div>\n<p><img alt=\"算子与思维模式的对应关系\" src=\"https://ar5iv.labs.arxiv.org/html/2601.11340/assets/x4.png\" />\n<em>图：Sankey 图展示推理算子（思维 token）与后续思维模式的强对应关系。</em></p>\n<p><strong>阶段 3：启发式评估（Heuristic Evaluation）</strong></p>\n<p>对每个候选算子，使用<strong>双因子启发式函数</strong>进行评分：</p>\n<p><strong>因子 1：路径潜力估计器 \\(\\mathcal{H}_{\\text{pot}}\\)</strong></p>\n<p>评估选择某个算子后最终得到正确答案的概率。实现为一个线性投影层，将当前隐藏状态映射为算子集合上的 logits。训练方式为<strong>策略蒸馏</strong>：以强教师模型（如 DeepSeek-R1）在算子集合上的概率分布 \\(P_T\\) 为目标，最小化 KL 散度：</p>\n<p>$$\\mathcal{L}_{\\text{pot}} = \\mathbb{E}_{h_t \\sim \\mathcal{D}} \\left[ D_{\\text{KL}} \\Big( P_T(h_t) \\;\\big\\|\\; \\mathcal{H}_{\\text{pot}}(h_t) \\Big) \\right]$$</p>\n<p>这一设计将教师模型的战略规划能力迁移到搜索过程中，充当\"正确性指南针\"。</p>\n<p><strong>因子 2：进度估计器 \\(\\mathcal{H}_{\\text{prog}}\\)</strong></p>\n<p>预测当前推理的完成比例，用于<strong>惩罚冗余路径、奖励高效路径</strong>。实现为一个线性回归头，将隐藏状态映射为标量。对于长度为 \\(L\\) 的完整推理路径中第 \\(k\\) 个 token，训练标签为归一化进度 \\(l_k = k / L\\)，使用均方误差损失：</p>\n<p>$$\\mathcal{L}_{\\text{prog}} = \\mathbb{E}_{(h_k, l_k) \\sim \\mathcal{D}} \\left[ \\left\\| \\mathcal{H}_{\\text{prog}}(h_k) - l_k \\right\\|^2 \\right]$$</p>\n<p>通过最大化估计进度，搜索算法偏好能显著推进推理状态的算子，有效惩罚冗长或循环的步骤。</p>\n<p><img alt=\"进度估计器预测 vs 真实进度\" src=\"https://ar5iv.labs.arxiv.org/html/2601.11340/assets/x5.png\" />\n<em>图：进度估计器的预测值与真实进度的对比。指数平滑后的预测轨迹与真实进度高度吻合。</em></p>\n<div class=\"warn-box\">⚠️ 注意：进度估计器采用 token 级别的密集监督训练，不仅在决策点处有效，在推理路径的任意位置都能提供可靠的进度预测。</div>\n<p><strong>复合评分函数</strong></p>\n<p>两个因子通过<strong>加法</strong>组合为复合评分：</p>\n<p>$$S(o) = \\underbrace{\\mathcal{H}_{\\text{pot}}(h_t, o)}_{\\text{路径潜力}} + \\lambda \\cdot \\underbrace{\\mathcal{H}_{\\text{prog}}(h'_{t,o})}_{\\text{推理进度}}$$</p>\n<p>其中 \\(\\lambda\\) 是控制简洁性偏好的超参数。这一设计确保：\n- 高潜力（更可能正确）的路径获得高分\n- 在潜力相近时，进度更高（更接近完成）的路径被优先选择\n- \\(\\lambda\\) 越大，模型越倾向于选择简洁的推理路径</p>\n<p><strong>阶段 4：概率选择（Probabilistic Selection）</strong></p>\n<p>为保持多样性并避免局部最优，将评分转化为概率分布后采样：</p>\n<p>$$P_{\\text{search}}(o | h_t) = \\frac{\\exp(S(o) / \\tau)}{\\sum_{o' \\in O} \\exp(S(o') / \\tau)}$$</p>\n<p>最终算子通过 \\(o^* \\sim P_{\\text{search}}\\) 采样选出。温度参数 \\(\\tau\\) 控制探索-利用平衡。</p>\n<h5>效率度量与实验结果</h5>\n<p>论文提出了效率度量指标 \\(\\eta\\)，同时考虑准确率提升和长度缩减：</p>\n<p>$$\\eta = \\left(\\frac{\\text{Acc}_{\\text{method}}}{\\text{Acc}_{\\text{base}}}\\right)^2 \\cdot \\frac{\\text{Len}_{\\text{base}}}{\\text{Len}_{\\text{method}}}$$</p>\n<p>准确率的权重更高（平方项），体现\"正确性优先\"的设计理念。</p>\n<p><strong>主要实验结果</strong>（基于 DeepSeek-R1-Distill-Qwen 系列）：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>模型规模</th>\n<th>平均准确率提升</th>\n<th>平均长度缩减</th>\n<th>平均 \\(\\eta\\)</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>1.5B</td>\n<td>+4.0%</td>\n<td>-22.3%</td>\n<td>1.595</td>\n</tr>\n<tr>\n<td>7B</td>\n<td>+3.5%</td>\n<td>-22.6%</td>\n<td>1.524</td>\n</tr>\n</tbody>\n</table></div>\n<p>亮点结果：\n- GSM8K (1.5B)：长度缩减超过 <strong>50%</strong>，同时准确率提升 2.4%\n- AMC23 (7B)：准确率大幅提升 <strong>7.5%</strong>，长度缩减 12%\n- 在所有基准上 \\(\\eta\\) 均为最高，显著优于 Budget Forcing、AdaptThink 等基线</p>\n<h5>与传统方法的区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>传统 CoT</th>\n<th>Tree of Thoughts (ToT)</th>\n<th>NCoTS</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>搜索粒度</td>\n<td>无搜索</td>\n<td>完整推理路径级</td>\n<td>步骤级（决策点）</td>\n</tr>\n<tr>\n<td>计算开销</td>\n<td>无额外开销</td>\n<td>多次完整生成</td>\n<td>仅 0.0017% 参数增加</td>\n</tr>\n<tr>\n<td>是否需要外部评估</td>\n<td>否</td>\n<td>需要外部评估器/投票</td>\n<td>内置轻量启发式头</td>\n</tr>\n<tr>\n<td>训练需求</td>\n<td>无</td>\n<td>无（提示工程）</td>\n<td>需蒸馏训练两个小型线性头</td>\n</tr>\n<tr>\n<td>推理效率</td>\n<td>基线</td>\n<td>显著增加（多路并行）</td>\n<td>减少约 22%</td>\n</tr>\n<tr>\n<td>选择策略</td>\n<td>贪心解码</td>\n<td>外部评估排序</td>\n<td>概率采样（softmax + 温度）</td>\n</tr>\n</tbody>\n</table></div>",
      "quiz": {
        "q": "NCoTS 的路径潜力估计器（Path Potential Estimator）的训练目标是什么？",
        "options": [
          "最小化预测进度与真实进度之间的均方误差",
          "最小化学生模型与教师模型在算子分布上的 KL 散度",
          "最大化推理路径最终得到正确答案的奖励信号",
          "最小化新旧策略概率比的裁剪目标函数"
        ],
        "answer": 1,
        "explain": "路径潜力估计器通过策略蒸馏训练，以强教师模型在推理算子集合上的概率分布为目标，最小化 KL 散度将教师的战略规划能力迁移到搜索过程中。"
      }
    },
    {
      "id": "long_cot",
      "num": 20,
      "name": "Long-CoT",
      "fullName": "长思维链缩放 (Long-CoT Scaling)",
      "year": "2026.01",
      "org": "NeurIPS",
      "parent": "cot",
      "paperUrl": "https://proceedings.neurips.cc/paper_files/paper/2025/hash/f3b336ac87912786ef2d72238058cb4f-Abstract-Conference.html",
      "projectUrl": "",
      "category": "frontier_2026",
      "motivation": "长推理链在复杂任务中指数级增益",
      "summary": "Long-CoT 的核心目标是：长推理链在复杂任务中指数级增益。",
      "keyPoints": [
        "核心动机：长推理链在复杂任务中指数级增益",
        "演化来源：继承或改进自 cot",
        "代表机构：NeurIPS"
      ],
      "detail": "<p>长推理链在复杂任务中指数级增益</p>"
    },
    {
      "id": "grace",
      "num": 21,
      "name": "GRACE",
      "fullName": "门控精炼压缩 (GRACE)",
      "year": "2026.01",
      "org": "NeurIPS",
      "parent": "opro",
      "paperUrl": "https://proceedings.neurips.cc/paper_files/paper/2025/hash/7f9a44cb707ede42a659ad85d940dd55-Abstract-Conference.html",
      "projectUrl": "",
      "category": "frontier_2026",
      "motivation": "门控机制精炼指令压缩冗余信息",
      "summary": "GRACE 的核心目标是：门控机制精炼指令压缩冗余信息。",
      "keyPoints": [
        "核心动机：门控机制精炼指令压缩冗余信息",
        "演化来源：继承或改进自 opro",
        "代表机构：NeurIPS"
      ],
      "detail": "<p>门控机制精炼指令压缩冗余信息</p>"
    },
    {
      "id": "uniapo",
      "num": 22,
      "name": "UniAPO",
      "fullName": "统一多模态提示优化 (UniAPO)",
      "year": "2026.02",
      "org": "AAAI",
      "parent": "opro",
      "paperUrl": "https://ojs.aaai.org/index.php/AAAI/article/view/40151",
      "projectUrl": "",
      "category": "frontier_2026",
      "motivation": "首个多模态自动提示优化方法",
      "summary": "UniAPO 的核心目标是：首个多模态自动提示优化方法。",
      "keyPoints": [
        "核心动机：首个多模态自动提示优化方法",
        "演化来源：继承或改进自 opro",
        "代表机构：AAAI"
      ],
      "detail": "<p>首个多模态自动提示优化方法</p>"
    },
    {
      "id": "promptmix",
      "num": 23,
      "name": "PromptMix",
      "fullName": "提示混合增强 (PromptMix)",
      "year": "2026.03",
      "org": "Information Fusion",
      "parent": "—",
      "paperUrl": "https://www.sciencedirect.com/science/article/pii/S1566253526000655",
      "projectUrl": "",
      "category": "frontier_2026",
      "motivation": "语义提示与多模态混合增强泛化能力",
      "summary": "PromptMix 的核心目标是：语义提示与多模态混合增强泛化能力。",
      "keyPoints": [
        "核心动机：语义提示与多模态混合增强泛化能力",
        "代表机构：Information Fusion"
      ],
      "detail": "<p>语义提示与多模态混合增强泛化能力</p>"
    },
    {
      "id": "vcp",
      "num": 24,
      "name": "VCP",
      "fullName": "视觉条件提示 (Visual Conditional Prompts)",
      "year": "2026.04",
      "org": "Expert Systems",
      "parent": "promptmix",
      "paperUrl": "https://www.sciencedirect.com/science/article/pii/S0957417426009905",
      "projectUrl": "",
      "category": "frontier_2026",
      "motivation": "视觉引导条件提示实现图文深度对齐",
      "summary": "VCP 的核心目标是：视觉引导条件提示实现图文深度对齐。",
      "keyPoints": [
        "核心动机：视觉引导条件提示实现图文深度对齐",
        "演化来源：继承或改进自 promptmix",
        "代表机构：Expert Systems"
      ],
      "detail": "<p>视觉引导条件提示实现图文深度对齐</p>"
    }
  ],
  "categories": {
    "basic": {
      "label": "基础提示技术",
      "color": "#4A90E2"
    },
    "reasoning": {
      "label": "推理增强技术",
      "color": "#50E3C2"
    },
    "optimization": {
      "label": "自动化与提示优化",
      "color": "#F5A623"
    },
    "frontier_2026": {
      "label": "2026年前沿进展",
      "color": "#D0021B"
    }
  },
  "projectUrls": {}
};
