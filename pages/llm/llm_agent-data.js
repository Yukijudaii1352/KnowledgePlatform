/**
 * llm_agent-data.js — 由 pipeline/build.py 于 2026-05-26 10:35:19 自动生成。
 * 源文件：content/llm/llm_agent.md
 * ⚠️  请勿手动修改；如需更新，修改源文档后重新编译。
 */
window.PAGE_CONFIG = {
  "meta": {
    "domain": "llm",
    "topic_id": "llm_agent",
    "topic_name": "LLM Agent",
    "page_title": "LLM Agent",
    "page_subtitle": "2026-05-26 版",
    "page_desc": "大语言模型智能体研究从工具调用、自主规划到多智能体协作的技术演进与前沿突破",
    "page_icon": "🤖",
    "hero_pills": [
      "工具使用",
      "规划推理",
      "多智能体",
      "Agent基准",
      "2026前沿"
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
        "id": "toolformer",
        "x": 200,
        "y": 50,
        "category": "tool_use"
      },
      {
        "id": "art",
        "x": 250,
        "y": 20,
        "category": "tool_use"
      },
      {
        "id": "hugginggpt",
        "x": 250,
        "y": 80,
        "category": "tool_use"
      },
      {
        "id": "api_bank",
        "x": 200,
        "y": 110,
        "category": "tool_use"
      },
      {
        "id": "gorilla",
        "x": 300,
        "y": 50,
        "category": "tool_use"
      },
      {
        "id": "toolllm",
        "x": 350,
        "y": 50,
        "category": "tool_use"
      },
      {
        "id": "llm_compiler",
        "x": 400,
        "y": 20,
        "category": "tool_use"
      },
      {
        "id": "toolace",
        "x": 450,
        "y": 80,
        "category": "tool_use"
      },
      {
        "id": "cot",
        "x": 100,
        "y": 200,
        "category": "planning"
      },
      {
        "id": "self_consistency",
        "x": 150,
        "y": 170,
        "category": "planning"
      },
      {
        "id": "react",
        "x": 150,
        "y": 230,
        "category": "planning"
      },
      {
        "id": "plan_and_solve",
        "x": 200,
        "y": 170,
        "category": "planning"
      },
      {
        "id": "tot",
        "x": 200,
        "y": 200,
        "category": "planning"
      },
      {
        "id": "reflexion",
        "x": 250,
        "y": 230,
        "category": "planning"
      },
      {
        "id": "lats",
        "x": 300,
        "y": 200,
        "category": "planning"
      },
      {
        "id": "retroformer",
        "x": 350,
        "y": 230,
        "category": "planning"
      },
      {
        "id": "camel",
        "x": 200,
        "y": 320,
        "category": "multi_agent"
      },
      {
        "id": "babyagi",
        "x": 200,
        "y": 380,
        "category": "multi_agent"
      },
      {
        "id": "chatdev",
        "x": 250,
        "y": 320,
        "category": "multi_agent"
      },
      {
        "id": "autogen",
        "x": 300,
        "y": 350,
        "category": "multi_agent"
      },
      {
        "id": "metagpt",
        "x": 350,
        "y": 320,
        "category": "multi_agent"
      },
      {
        "id": "agentverse",
        "x": 350,
        "y": 380,
        "category": "multi_agent"
      },
      {
        "id": "openagents",
        "x": 400,
        "y": 350,
        "category": "multi_agent"
      },
      {
        "id": "api_bank_bench",
        "x": 200,
        "y": 450,
        "category": "benchmark"
      },
      {
        "id": "agentbench",
        "x": 300,
        "y": 450,
        "category": "benchmark"
      },
      {
        "id": "webarena",
        "x": 350,
        "y": 420,
        "category": "benchmark"
      },
      {
        "id": "gaia",
        "x": 350,
        "y": 450,
        "category": "benchmark"
      },
      {
        "id": "swe_bench",
        "x": 350,
        "y": 480,
        "category": "benchmark"
      },
      {
        "id": "hi_cot",
        "x": 500,
        "y": 170,
        "category": "frontier_2026"
      },
      {
        "id": "gaia2",
        "x": 500,
        "y": 450,
        "category": "frontier_2026"
      },
      {
        "id": "agentic_reasoning",
        "x": 500,
        "y": 230,
        "category": "frontier_2026"
      },
      {
        "id": "embocoach_bench",
        "x": 500,
        "y": 480,
        "category": "frontier_2026"
      },
      {
        "id": "causal_cot",
        "x": 500,
        "y": 200,
        "category": "frontier_2026"
      },
      {
        "id": "reasonflux_prm",
        "x": 500,
        "y": 260,
        "category": "frontier_2026"
      },
      {
        "id": "solagent",
        "x": 500,
        "y": 320,
        "category": "frontier_2026"
      }
    ],
    "edges": [
      {
        "from": "toolformer",
        "to": "art",
        "label": "自动化示例"
      },
      {
        "from": "toolformer",
        "to": "hugginggpt",
        "label": "专家模型调度"
      },
      {
        "from": "toolformer",
        "to": "gorilla",
        "label": "检索增强微调"
      },
      {
        "from": "gorilla",
        "to": "toolllm",
        "label": "万级API扩展"
      },
      {
        "from": "toolllm",
        "to": "llm_compiler",
        "label": "并行调用优化"
      },
      {
        "from": "toolllm",
        "to": "toolace",
        "label": "数据合成增强"
      },
      {
        "from": "cot",
        "to": "self_consistency",
        "label": "多路采样投票"
      },
      {
        "from": "cot",
        "to": "react",
        "label": "引入行动循环"
      },
      {
        "from": "cot",
        "to": "plan_and_solve",
        "label": "显式规划分离"
      },
      {
        "from": "cot",
        "to": "tot",
        "label": "树结构搜索"
      },
      {
        "from": "react",
        "to": "reflexion",
        "label": "语言反馈强化"
      },
      {
        "from": "tot",
        "to": "lats",
        "label": "MCTS框架整合"
      },
      {
        "from": "reflexion",
        "to": "retroformer",
        "label": "策略梯度优化"
      },
      {
        "from": "camel",
        "to": "chatdev",
        "label": "软件开发场景"
      },
      {
        "from": "camel",
        "to": "autogen",
        "label": "框架通用化"
      },
      {
        "from": "camel",
        "to": "agentverse",
        "label": "群体行为模拟"
      },
      {
        "from": "chatdev",
        "to": "metagpt",
        "label": "SOP流程注入"
      },
      {
        "from": "autogen",
        "to": "openagents",
        "label": "开放平台扩展"
      },
      {
        "from": "api_bank_bench",
        "to": "agentbench",
        "label": "多环境扩展"
      },
      {
        "from": "agentbench",
        "to": "webarena",
        "label": "网页交互聚焦"
      },
      {
        "from": "agentbench",
        "to": "gaia",
        "label": "现实任务覆盖"
      },
      {
        "from": "agentbench",
        "to": "swe_bench",
        "label": "软件工程聚焦"
      },
      {
        "from": "cot",
        "to": "hi_cot",
        "label": "分层架构扩展"
      },
      {
        "from": "cot",
        "to": "causal_cot",
        "label": "因果机制引入"
      },
      {
        "from": "gaia",
        "to": "gaia2",
        "label": "动态异步升级"
      },
      {
        "from": "react",
        "to": "agentic_reasoning",
        "label": "元推理统一"
      },
      {
        "from": "agentbench",
        "to": "embocoach_bench",
        "label": "具身场景扩展"
      },
      {
        "from": "retroformer",
        "to": "reasonflux_prm",
        "label": "过程奖励建模"
      },
      {
        "from": "chatdev",
        "to": "solagent",
        "label": "智能合约场景"
      }
    ],
    "milestones": [
      "cot",
      "react",
      "metagpt"
    ]
  },
  "algos": [
    {
      "id": "toolformer",
      "num": 1,
      "name": "Toolformer",
      "fullName": "工具学习者 (Toolformer)",
      "year": "2023",
      "org": "Meta AI",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2302.04761",
      "projectUrl": "",
      "category": "tool_use",
      "motivation": "自监督学习使模型自主学会调用工具",
      "summary": "Toolformer 提出了一种自监督方法，让语言模型通过自我标注和过滤 API 调用来自主学会何时、如何调用外部工具（计算器、搜索引擎、问答系统等），无需大量人工标注即可显著提升模型在算术、事实查询等任务上的零样本能力。",
      "keyPoints": [
        "<strong>自监督工具学习流水线</strong>：利用 LM 的上下文学习能力自动标注 API 调用，再通过损失函数过滤无用调用，最终在增强数据集上微调",
        "<strong>5 种外部工具</strong>：问答系统（Atlas）、维基百科搜索（BM25）、计算器、日历、机器翻译（NLLB 600M）",
        "<strong>基于损失的过滤机制</strong>：比较\"有 API 调用+结果\"与\"无调用/无结果\"的加权交叉熵损失差，仅保留确实降低困惑度的调用",
        "<strong>基础模型</strong>：GPT-J 6.7B，训练数据为 CCNet 子集",
        "<strong>推理机制</strong>：解码时遇到 <code>→</code> 特殊标记即中断，调用对应 API 获取结果后继续生成",
        "<strong>零样本性能</strong>：6.7B 参数的 Toolformer 在多项任务上超越 175B 参数的 GPT-3"
      ],
      "detail": "<p><img alt=\"Toolformer 工具调用示例总览\" src=\"https://ar5iv.labs.arxiv.org/html/2302.04761/assets/x1.png\" />\n<em>图 1：Toolformer 学会在文本生成过程中自主插入各种 API 调用（计算器、问答、搜索、翻译、日历），每个调用以 <code>[API_name(input) → result]</code> 格式嵌入文本流中。</em></p>\n<h5>动机与背景</h5>\n<p>大语言模型虽然在语言理解和生成方面表现出色，但在一些看似简单的任务上仍存在根本性缺陷：无法精确进行数学运算、无法获取最新的事实信息、缺乏时间感知能力。已有的工具增强方法（如 WebGPT、LaMDA）要么依赖大量人工标注，要么将工具使用限定在特定任务上，缺乏通用性。</p>\n<p>Toolformer 的核心目标是：<strong>以自监督方式让模型自主决定何时、如何调用哪种工具</strong>，且不丧失其通用语言建模能力。</p>\n<h5>核心方法：三步自监督流水线</h5>\n<p><img alt=\"Toolformer 数据增强三步流程\" src=\"https://ar5iv.labs.arxiv.org/html/2302.04761/assets/x2.png\" />\n<em>图 2：Toolformer 的数据增强流程——(1) 利用上下文学习采样候选 API 调用；(2) 执行 API 获取结果；(3) 基于损失过滤，仅保留有用的调用。</em></p>\n<p>整个方法分为三个阶段：</p>\n<p><strong>阶段一：采样候选 API 调用</strong></p>\n<p>对于数据集 <span class=\"kb-math kb-math-inline\">\\mathcal{C}</span> 中的每段文本 <span class=\"kb-math kb-math-inline\">\\mathbf{x} = x_1, \\ldots, x_n</span>，为每种 API 编写少量示范提示（few-shot prompt），引导模型 <span class=\"kb-math kb-math-inline\">M</span> 在文本中标注潜在的 API 调用位置。具体地，对每个位置 <span class=\"kb-math kb-math-inline\">i</span>，计算模型在该位置生成 <code>&lt;API&gt;</code> 标记的概率：</p>\n<div class=\"kb-math kb-math-display\">p_i = p_M(\\texttt{&lt;API&gt;} \\mid P(\\mathbf{x}), x_{1:i-1})</div>\n<p>设定采样阈值 <span class=\"kb-math kb-math-inline\">\\tau_s</span>，保留概率超过阈值的位置集合 <span class=\"kb-math kb-math-inline\">I = \\{i \\mid p_i &gt; \\tau_s\\}</span>（最多保留 top-<span class=\"kb-math kb-math-inline\">k</span> 个）。对每个位置，以 <code>[P(x), x_1, ..., x_{i-1}, &lt;API&gt;]</code> 为前缀，采样最多 <span class=\"kb-math kb-math-inline\">m</span> 个候选 API 调用。</p>\n<p><strong>阶段二：执行 API 调用</strong></p>\n<p>对所有采样到的候选 API 调用执行实际调用，获取文本形式的返回结果 <span class=\"kb-math kb-math-inline\">r_i</span>。不同工具的执行方式各异——可以是调用另一个神经网络、执行 Python 脚本或进行检索。</p>\n<p><strong>阶段三：基于损失的过滤</strong></p>\n<p>这是方法的核心创新。定义加权交叉熵损失：</p>\n<div class=\"kb-math kb-math-display\">L_i(\\mathbf{z}) = -\\sum_{j=i}^{n} w_{j-i} \\cdot \\log p_M(x_j \\mid \\mathbf{z}, x_{1:j-1})</div>\n<p>然后比较两个损失值：</p>\n<div class=\"kb-math kb-math-display\">L_i^{+} = L_i(\\text{e}(c_i, r_i))</div>\n<div class=\"kb-math kb-math-display\">L_i^{-} = \\min\\left(L_i(\\varepsilon),\\; L_i(\\text{e}(c_i, \\varepsilon))\\right)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">L_i^{+}</span> 是将完整 API 调用（含返回结果）作为前缀时的损失，<span class=\"kb-math kb-math-inline\">L_i^{-}</span> 是不做调用或仅做调用但不含结果时的最小损失。</p>\n<div class=\"key-point\">💡 <strong>关键直觉</strong>：如果同时提供 API 的输入和输出能让模型更好地预测后续 token（即 <span class=\"kb-math kb-math-inline\">L_i^{-} - L_i^{+} \\geq \\tau_f</span>），则该调用是\"有用的\"，予以保留；否则丢弃。</div>\n<p>设定过滤阈值 <span class=\"kb-math kb-math-inline\">\\tau_f</span>，仅保留满足条件的 API 调用。</p>\n<h5>模型微调与推理</h5>\n<pre><code class=\"language-python\"># Toolformer 训练与推理伪代码\n# === 训练阶段 ===\nfor text x in dataset C:\n    # Step 1: 采样候选 API 调用位置\n    for position i in range(len(x)):\n        p_i = LM.prob(&quot;&lt;API&gt;&quot; | prompt(x), x[:i])\n        if p_i &gt; tau_s:\n            candidates = LM.sample_api_calls(prefix=x[:i], num=m)\n\n            # Step 2: 执行 API\n            for c in candidates:\n                r = execute_api(c)\n\n                # Step 3: 过滤\n                L_plus = weighted_loss(x[i:], prefix=api_call_with_result(c, r))\n                L_minus = min(\n                    weighted_loss(x[i:], prefix=empty),\n                    weighted_loss(x[i:], prefix=api_call_no_result(c))\n                )\n                if L_minus - L_plus &gt;= tau_f:\n                    insert_api_call(x, position=i, call=c, result=r)\n\n# 在增强数据集 C* 上用标准语言建模目标微调 M\n\n# === 推理阶段 ===\nwhile generating:\n    token = LM.decode_next()\n    if token == &quot;→&quot;:  # 模型期望 API 返回结果\n        api_response = call_api(current_api_call)\n        insert(api_response + &quot;&lt;/API&gt;&quot;)\n        continue_decoding()\n</code></pre>\n<p><strong>微调</strong>：将过滤后的 API 调用插入原始文本对应位置，构造增强数据集 <span class=\"kb-math kb-math-inline\">\\mathcal{C}^*</span>。关键设计是 <span class=\"kb-math kb-math-inline\">\\mathcal{C}^*</span> 包含与原始数据集 <span class=\"kb-math kb-math-inline\">\\mathcal{C}</span> 完全相同的文本内容（仅多了 API 调用标注），因此微调不会损害模型的通用语言建模能力。</p>\n<p><strong>推理</strong>：正常解码直到模型生成 <code>→</code> 标记（表示它期望获得 API 返回结果），此时中断解码、调用对应 API、将返回结果和 <code>&lt;/API&gt;</code> 标记插入，然后继续解码。</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：训练时 API 调用结果作为前缀而非插入文本中间，因为未微调的模型不习惯中间插入的 API 格式，这会破坏文本连贯性并损害困惑度。</div>\n<h5>API 调用的文本表示</h5>\n<p>每个 API 调用表示为元组 <span class=\"kb-math kb-math-inline\">c = (a_c, i_c)</span>，其中 <span class=\"kb-math kb-math-inline\">a_c</span> 是 API 名称，<span class=\"kb-math kb-math-inline\">i_c</span> 是输入。线性化格式为：</p>\n<ul>\n<li>不含结果：<code>&lt;API&gt; a_c(i_c) &lt;/API&gt;</code></li>\n<li>含结果：<code>&lt;API&gt; a_c(i_c) → r &lt;/API&gt;</code></li>\n</ul>\n<p>实际实现中使用 <code>[</code>、<code>]</code>、<code>-&gt;</code> 代替特殊标记，无需修改词表。</p>\n<h5>五种工具详解</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>工具</th>\n<th>实现</th>\n<th>输入示例</th>\n<th>输出示例</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>问答系统</td>\n<td>Atlas（检索增强 LM，基于 Natural Questions 微调）</td>\n<td>\"Where was the Knights of Columbus founded?\"</td>\n<td>\"New Haven, Connecticut\"</td>\n</tr>\n<tr>\n<td>维基百科搜索</td>\n<td>BM25 检索器（KILT 维基百科索引）</td>\n<td>\"Fishing Reel Types\"</td>\n<td>相关维基百科片段</td>\n</tr>\n<tr>\n<td>计算器</td>\n<td>四则运算，结果保留两位小数</td>\n<td>\"27 + 4 * 2\"</td>\n<td>\"35\"</td>\n</tr>\n<tr>\n<td>日历</td>\n<td>返回当前日期，无需输入</td>\n<td>ε（空）</td>\n<td>\"Today is Monday, January 30, 2023.\"</td>\n</tr>\n<tr>\n<td>机器翻译</td>\n<td>NLLB 600M（200 种语言→英语，fastText 自动检测源语言）</td>\n<td>\"sûreté nucléaire\"</td>\n<td>\"nuclear safety\"</td>\n</tr>\n</tbody>\n</table></div>\n<h5>与传统方法的区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th>传统工具增强方法</th>\n<th>Toolformer</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>监督信号</td>\n<td>大量人工标注（WebGPT、LaMDA）</td>\n<td>自监督，仅需少量 few-shot 示范</td>\n</tr>\n<tr>\n<td>工具使用范围</td>\n<td>绑定特定任务</td>\n<td>通用，模型自主决定何时/如何/用哪个工具</td>\n</tr>\n<tr>\n<td>通用性保持</td>\n<td>可能损害语言建模能力</td>\n<td>增强数据集保留原始文本，不损害通用性</td>\n</tr>\n<tr>\n<td>训练成本</td>\n<td>需要人类反馈或强化学习</td>\n<td>仅需标准语言建模微调</td>\n</tr>\n<tr>\n<td>模型规模</td>\n<td>通常需要超大模型</td>\n<td>6.7B 即可超越 175B GPT-3</td>\n</tr>\n</tbody>\n</table></div>",
      "quiz": {
        "q": "Toolformer 过滤 API 调用的核心标准是什么？",
        "options": [
          "API 调用的执行时间是否低于阈值",
          "API 返回结果的文本长度是否超过最小值",
          "插入 API 调用及其结果后，模型预测后续 token 的损失是否显著降低",
          "人工标注者判断该 API 调用是否有帮助"
        ],
        "answer": 2,
        "explain": "Toolformer 通过比较 L_i^- - L_i^+ ≥ τ_f 来判断：如果提供 API 调用及其返回结果能显著降低模型预测后续 token 的加权交叉熵损失（相比不调用或调用但无结果），则保留该调用。这是一种完全自监督的过滤机制。"
      }
    },
    {
      "id": "art",
      "num": 2,
      "name": "ART",
      "fullName": "自动推理与工具使用 (Automatic Reasoning and Tool-use)",
      "year": "2023",
      "org": "华盛顿大学/AI2",
      "parent": "toolformer",
      "paperUrl": "https://arxiv.org/abs/2303.09014",
      "projectUrl": "",
      "category": "tool_use",
      "motivation": "自动选择多步推理示例与工具调用",
      "summary": "ART 的核心目标是：自动选择多步推理示例与工具调用。",
      "keyPoints": [
        "核心动机：自动选择多步推理示例与工具调用",
        "演化来源：继承或改进自 toolformer",
        "代表机构：华盛顿大学/AI2"
      ],
      "detail": "<p>自动选择多步推理示例与工具调用</p>"
    },
    {
      "id": "hugginggpt",
      "num": 3,
      "name": "HuggingGPT",
      "fullName": "HuggingFace任务调度器 (HuggingGPT)",
      "year": "2023",
      "org": "微软亚洲研究院",
      "parent": "toolformer",
      "paperUrl": "https://proceedings.neurips.cc/paper_files/paper/2023/hash/77c33e6a367922d003ff102ffb92b658-Abstract-Conference.html",
      "projectUrl": "",
      "category": "tool_use",
      "motivation": "LLM作为控制器调度专家模型",
      "summary": "HuggingGPT 的核心目标是：LLM作为控制器调度专家模型。",
      "keyPoints": [
        "核心动机：LLM作为控制器调度专家模型",
        "演化来源：继承或改进自 toolformer",
        "代表机构：微软亚洲研究院"
      ],
      "detail": "<p>LLM作为控制器调度专家模型</p>"
    },
    {
      "id": "api_bank",
      "num": 4,
      "name": "API-Bank",
      "fullName": "API工具基准 (API-Bank)",
      "year": "2023",
      "org": "中科院/阿里巴巴",
      "parent": "—",
      "paperUrl": "https://aclanthology.org/2023.emnlp-main.187/",
      "projectUrl": "",
      "category": "tool_use",
      "motivation": "首个系统性工具增强LLM基准",
      "summary": "API-Bank 的核心目标是：首个系统性工具增强LLM基准。",
      "keyPoints": [
        "核心动机：首个系统性工具增强LLM基准",
        "代表机构：中科院/阿里巴巴"
      ],
      "detail": "<p>首个系统性工具增强LLM基准</p>"
    },
    {
      "id": "gorilla",
      "num": 5,
      "name": "Gorilla",
      "fullName": "大规模API连接器 (Gorilla)",
      "year": "2024",
      "org": "UC Berkeley",
      "parent": "toolformer",
      "paperUrl": "https://proceedings.neurips.cc/paper_files/paper/2024/hash/e4c61f578ff07830f5c37378dd3ecb0d-Abstract-Conference.html",
      "projectUrl": "",
      "category": "tool_use",
      "motivation": "检索增强微调连接大规模API",
      "summary": "Gorilla 通过在自动生成的 {指令, API} 数据集上对 LLaMA-7B 进行检索增强微调（Retriever-Aware Training），使 LLM 能够从 1,600+ 个机器学习 API 中准确选择并生成正确的 API 调用，同时显著降低幻觉率，并能适应 API 文档的实时变更。",
      "keyPoints": [
        "<strong>APIBench 基准数据集</strong>：收集 Torch Hub（94 个）、HuggingFace（925 个）、TensorFlow Hub（696 个）共 1,645 个真实 ML API，并利用 GPT-4 自指令（Self-Instruct）为每个 API 生成 10 条指令-API 配对，共 16,450 个训练样本",
        "<strong>检索增强微调（Retriever-Aware Training）</strong>：在训练时将检索到的 API 文档拼接到用户指令后，使模型学会解析文档来回答问题，推理时同样拼接最新检索文档",
        "<strong>AST 子树匹配评估</strong>：提出基于抽象语法树（AST）的评估方法，将 API 调用解析为树结构后进行子树匹配，避免传统字符串匹配的误判",
        "<strong>幻觉检测机制</strong>：通过 AST 解析检测模型是否编造不存在的 API（虚假 API 端点、错误参数等），量化幻觉率",
        "<strong>约束感知 API 选择</strong>：支持用户指定参数量、精度等约束条件，模型在满足约束的前提下选择最合适的 API",
        "<strong>适应 API 文档变更</strong>：检索增强训练使 Gorilla 能在推理时适应 API 文档的更新（如模型升级、仓库迁移），无需重新训练"
      ],
      "detail": "<h5>系统架构总览</h5>\n<p><img alt=\"Gorilla 系统架构图\" src=\"https://ar5iv.labs.arxiv.org/html/2305.15334/assets/x3.png\" />\n<em>图：Gorilla 系统的训练与推理流程。左侧为基于 Self-Instruct 的数据集构建，中间为 LLaMA-7B 微调，右侧为推理时可选的检索增强模式。</em></p>\n<p>Gorilla 的整体流程分为三个阶段：</p>\n<ol>\n<li><strong>数据集构建</strong>：从三大 ML 模型仓库爬取 API 文档（JSON 格式），利用 GPT-4 为每个 API 生成多条自然语言指令</li>\n<li><strong>模型训练</strong>：将指令-API 对转换为用户-代理对话格式，对 LLaMA-7B 进行指令微调</li>\n<li><strong>推理</strong>：用户输入自然语言需求，Gorilla 输出可执行的 API 调用；可选地通过 BM25 或 GPT-Index 检索器获取最新 API 文档</li>\n</ol>\n<h5>核心评估方法：AST 子树匹配</h5>\n<p><img alt=\"AST 子树匹配\" src=\"https://ar5iv.labs.arxiv.org/html/2305.15334/assets/x4.png\" />\n<em>图：AST 子树匹配评估方法示意。将 API 调用解析为语法树，通过子树匹配判断功能等价性。</em></p>\n<pre><code class=\"language-python\"># AST 子树匹配评估伪代码\ndef ast_eval(predicted_api_call, ground_truth_api_call):\n    # Step 1: 将 API 调用解析为 AST\n    pred_tree = parse_to_ast(predicted_api_call)\n    truth_tree = parse_to_ast(ground_truth_api_call)\n\n    # Step 2: 提取 API 名称节点（域名 + 函数名）\n    pred_api_name = extract_api_name(pred_tree)    # e.g., &quot;torch.hub.load('repo', 'model')&quot;\n    truth_api_name = extract_api_name(truth_tree)\n\n    # Step 3: 检查幻觉 —— API 名称是否存在于已知 API 数据库\n    if pred_api_name not in known_api_database:\n        return &quot;hallucination&quot;\n\n    # Step 4: 子树匹配 —— 检查关键参数是否正确\n    if is_subtree(pred_tree, truth_tree):\n        return &quot;correct&quot;\n    else:\n        return &quot;error&quot;\n</code></pre>\n<div class=\"key-point\">💡 <strong>关键</strong>：传统的字符串精确匹配（如 BLEU、ROUGE）无法处理 API 调用中参数顺序不同但功能等价的情况。AST 子树匹配通过将代码解析为树结构，只要预测的 API 调用在语法树层面是 ground truth 的子树（即包含所有必要的功能性参数），即判定为正确。这允许模型省略可选参数或使用不同的参数顺序。</div>\n<h5>检索增强训练机制</h5>\n<p>Gorilla 的核心创新在于<strong>检索增强训练（Retriever-Aware Training）</strong>，其工作原理如下：</p>\n<p><strong>训练阶段</strong>：在每条训练样本的用户指令后追加检索到的 API 文档：</p>\n<div class=\"kb-math kb-math-display\">\\text{Input} = \\text{[User Instruction]} + \\text{&quot;Use this API documentation for reference: &quot;} + \\text{[API\\_doc\\_JSON]}</div>\n<p>通过这种方式，模型学会了两个关键能力：(a) 理解用户的功能性需求，(b) 从提供的文档中提取正确的 API 调用信息。</p>\n<p><strong>推理阶段</strong>：支持两种模式：\n- <strong>Zero-shot 模式</strong>：直接将用户自然语言指令输入 Gorilla，模型基于训练时记忆的 API 知识生成调用\n- <strong>检索增强模式</strong>：先通过检索器（BM25 或 GPT-Index）从 API 数据库中检索最相关的文档，拼接后输入模型</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：论文发现检索增强并不总是提升性能。在某些情况下（如 BM25 检索 HuggingFace API），检索到的噪声文档反而会降低准确率。这说明检索器的质量对最终效果至关重要。</div>\n<h5>实验结果与关键发现</h5>\n<p><img alt=\"准确率 vs 幻觉率\" src=\"https://ar5iv.labs.arxiv.org/html/2305.15334/assets/x2.png\" />\n<em>图：各模型在不同设置下的准确率与幻觉率对比。理想位置为右下角（高准确率、低幻觉率）。</em></p>\n<p><strong>主要实验结果</strong>（Table 1 核心数据）：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>模型</th>\n<th style=\"text-align: center;\">Torch Hub 准确率</th>\n<th style=\"text-align: center;\">HuggingFace 准确率</th>\n<th style=\"text-align: center;\">TF Hub 准确率</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>GPT-3.5 (0-shot)</td>\n<td style=\"text-align: center;\">82.39%</td>\n<td style=\"text-align: center;\">30.34%</td>\n<td style=\"text-align: center;\">57.30%</td>\n</tr>\n<tr>\n<td>GPT-4 (0-shot)</td>\n<td style=\"text-align: center;\">82.39%</td>\n<td style=\"text-align: center;\">48.28%</td>\n<td style=\"text-align: center;\">77.53%</td>\n</tr>\n<tr>\n<td>Gorilla (0-shot)</td>\n<td style=\"text-align: center;\"><strong>83.79%</strong></td>\n<td style=\"text-align: center;\"><strong>60.34%</strong></td>\n<td style=\"text-align: center;\"><strong>83.15%</strong></td>\n</tr>\n<tr>\n<td>Claude (0-shot)</td>\n<td style=\"text-align: center;\">31.69%</td>\n<td style=\"text-align: center;\">16.55%</td>\n<td style=\"text-align: center;\">42.13%</td>\n</tr>\n<tr>\n<td>LLaMA (0-shot)</td>\n<td style=\"text-align: center;\">0%</td>\n<td style=\"text-align: center;\">0%</td>\n<td style=\"text-align: center;\">0%</td>\n</tr>\n</tbody>\n</table></div>\n<p>关键发现：</p>\n<ol>\n<li>\n<p><strong>Gorilla 在 zero-shot 设置下全面超越 GPT-4</strong>：尽管仅有 7B 参数，Gorilla 在三个 API 数据集上均优于 GPT-4，尤其在 HuggingFace（60.34% vs 48.28%）和 TF Hub（83.15% vs 77.53%）上优势显著</p>\n</li>\n<li>\n<p><strong>幻觉率显著降低</strong>：Gorilla 的幻觉率（编造不存在的 API）远低于基线模型。GPT-3.5 在 HuggingFace 上的幻觉率高达 62.07%，而 Gorilla 仅为 35.17%</p>\n</li>\n<li>\n<p><strong>检索增强的双刃剑效应</strong>：Oracle 检索器（提供完美文档）能大幅提升所有模型的性能，但实际检索器（BM25/GPT-Index）的效果因数据集而异。在 Torch Hub 上 GPT-Index 检索将 Gorilla 准确率提升至 90.14%，但在 HuggingFace 上 BM25 检索反而导致性能下降</p>\n</li>\n</ol>\n<h5>适应 API 文档变更</h5>\n<p><img alt=\"API 文档变更适应\" src=\"https://ar5iv.labs.arxiv.org/html/2305.15334/assets/x6.png\" />\n<em>图：Gorilla 通过检索增强训练适应 API 文档的实时变更，包括模型升级（ResNet-50→ResNet-101）和仓库迁移。</em></p>\n<p>检索增强训练赋予 Gorilla 一个独特优势：<strong>无需重新训练即可适应 API 变更</strong>。当 API 文档更新时（如模型版本升级、仓库地址迁移），只需更新检索数据库中的文档，Gorilla 在推理时即可自动使用最新信息生成正确的 API 调用。这对于快速迭代的 ML 生态系统尤为重要。</p>\n<h5>与传统方法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th style=\"text-align: center;\">传统 LLM (GPT-4)</th>\n<th style=\"text-align: center;\">Toolformer</th>\n<th style=\"text-align: center;\">Gorilla</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>API 知识来源</td>\n<td style=\"text-align: center;\">预训练语料（静态）</td>\n<td style=\"text-align: center;\">少量手工定义的工具</td>\n<td style=\"text-align: center;\">1,600+ 真实 API + 检索增强</td>\n</tr>\n<tr>\n<td>文档更新适应</td>\n<td style=\"text-align: center;\">需重新训练</td>\n<td style=\"text-align: center;\">不支持</td>\n<td style=\"text-align: center;\">检索器实时更新</td>\n</tr>\n<tr>\n<td>幻觉控制</td>\n<td style=\"text-align: center;\">无专门机制</td>\n<td style=\"text-align: center;\">N/A</td>\n<td style=\"text-align: center;\">AST 验证 + 检索增强</td>\n</tr>\n<tr>\n<td>约束感知</td>\n<td style=\"text-align: center;\">有限</td>\n<td style=\"text-align: center;\">不支持</td>\n<td style=\"text-align: center;\">支持参数量/精度等约束</td>\n</tr>\n<tr>\n<td>评估方法</td>\n<td style=\"text-align: center;\">字符串匹配</td>\n<td style=\"text-align: center;\">执行结果</td>\n<td style=\"text-align: center;\">AST 子树匹配</td>\n</tr>\n</tbody>\n</table></div>",
      "quiz": {
        "q": "Gorilla 的检索增强训练（Retriever-Aware Training）在推理时的主要优势是什么？",
        "options": [
          "提升模型的推理速度",
          "使模型能够适应 API 文档的实时变更，无需重新训练",
          "减少模型的参数量以降低部署成本",
          "消除模型对检索器的依赖，实现完全零样本推理"
        ],
        "answer": 1,
        "explain": "检索增强训练使 Gorilla 学会从拼接的文档中提取 API 信息，因此推理时只需更新检索数据库中的文档即可适应 API 变更，无需重新微调模型。"
      }
    },
    {
      "id": "toolllm",
      "num": 6,
      "name": "ToolLLM",
      "fullName": "工具大模型 (ToolLLM)",
      "year": "2024",
      "org": "清华大学",
      "parent": "gorilla",
      "paperUrl": "https://proceedings.iclr.cc/paper_files/paper/2024/hash/28e50ee5b72e90b50e7196fde8ea260e-Abstract-Conference.html",
      "projectUrl": "",
      "category": "tool_use",
      "motivation": "DFSDT推理策略支持万级API泛化",
      "summary": "ToolLLM 的核心目标是：DFSDT推理策略支持万级API泛化。",
      "keyPoints": [
        "核心动机：DFSDT推理策略支持万级API泛化",
        "演化来源：继承或改进自 gorilla",
        "代表机构：清华大学"
      ],
      "detail": "<p>DFSDT推理策略支持万级API泛化</p>"
    },
    {
      "id": "llm_compiler",
      "num": 7,
      "name": "LLM Compiler",
      "fullName": "LLM编译器 (LLM Compiler)",
      "year": "2024",
      "org": "Meta AI",
      "parent": "toolllm",
      "paperUrl": "https://openreview.net/forum?id=uQ2FUoFjnF",
      "projectUrl": "",
      "category": "tool_use",
      "motivation": "并行函数调用架构降低多工具延迟",
      "summary": "LLM Compiler 的核心目标是：并行函数调用架构降低多工具延迟。",
      "keyPoints": [
        "核心动机：并行函数调用架构降低多工具延迟",
        "演化来源：继承或改进自 toolllm",
        "代表机构：Meta AI"
      ],
      "detail": "<p>并行函数调用架构降低多工具延迟</p>"
    },
    {
      "id": "toolace",
      "num": 8,
      "name": "ToolACE",
      "fullName": "工具调用王牌 (ToolACE)",
      "year": "2025",
      "org": "浙江大学",
      "parent": "toolllm",
      "paperUrl": "https://proceedings.iclr.cc/paper_files/paper/2025/hash/663865ea167425c6c562cb0b6bcf76c7-Abstract-Conference.html",
      "projectUrl": "",
      "category": "tool_use",
      "motivation": "自动化数据合成提升函数调用准确率",
      "summary": "ToolACE 的核心目标是：自动化数据合成提升函数调用准确率。",
      "keyPoints": [
        "核心动机：自动化数据合成提升函数调用准确率",
        "演化来源：继承或改进自 toolllm",
        "代表机构：浙江大学"
      ],
      "detail": "<p>自动化数据合成提升函数调用准确率</p>"
    },
    {
      "id": "cot",
      "num": 9,
      "name": "CoT",
      "fullName": "思维链 (Chain-of-Thought)",
      "year": "2022",
      "org": "Google",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2201.11903",
      "projectUrl": "",
      "category": "planning",
      "motivation": "激发中间推理步骤提升复杂推理",
      "summary": "CoT 的核心目标是：激发中间推理步骤提升复杂推理。",
      "keyPoints": [
        "核心动机：激发中间推理步骤提升复杂推理",
        "代表机构：Google"
      ],
      "detail": "<p>激发中间推理步骤提升复杂推理</p>"
    },
    {
      "id": "self_consistency",
      "num": 10,
      "name": "Self-Consistency",
      "fullName": "自一致性 (Self-Consistency)",
      "year": "2022",
      "org": "Google",
      "parent": "cot",
      "paperUrl": "https://arxiv.org/abs/2203.11171",
      "projectUrl": "",
      "category": "planning",
      "motivation": "多路采样投票选出一致答案",
      "summary": "Self-Consistency 提出了一种\"采样—边际化\"解码策略，通过对大语言模型的 Chain-of-Thought 推理进行多路采样并以多数投票选出最一致的答案，无需额外训练即可大幅提升复杂推理任务的准确率。",
      "keyPoints": [
        "<strong>替换贪心解码</strong>：用多路采样（temperature / top-k / nucleus sampling）替代 CoT 中的贪心解码，生成多条多样化推理路径",
        "<strong>多数投票聚合</strong>：对采样得到的多条推理路径的最终答案执行多数投票（majority vote），选出出现次数最多的答案",
        "<strong>加权投票变体</strong>：可选地用模型输出概率 <span class=\"kb-math kb-math-inline\">P(\\mathbf{r}_i, \\mathbf{a}_i \\mid \\text{prompt}, \\text{question})</span> 对每条路径加权后再聚合",
        "<strong>完全无监督</strong>：不需要额外训练、微调、验证器或人工标注，直接在预训练模型上即插即用",
        "<strong>\"自集成\"思想</strong>：区别于传统多模型集成，Self-Consistency 在单一模型上通过采样实现多样性",
        "<strong>广泛的基准验证</strong>：在 GSM8K（+17.9%）、SVAMP（+11.0%）、AQuA（+12.2%）、StrategyQA（+6.4%）、ARC-challenge（+3.9%）等基准上取得显著提升",
        "<strong>跨模型泛化</strong>：在 UL2-20B、GPT-3-175B、LaMDA-137B、PaLM-540B 四种不同规模模型上均有效",
        "<strong>对采样策略和不完美 prompt 鲁棒</strong>：不同采样参数和含有错误的 prompt 下均能稳定提升性能"
      ],
      "detail": "<h5>核心示意图</h5>\n<p><img alt=\"Self-Consistency 方法示意图\" src=\"https://ar5iv.labs.arxiv.org/html/2203.11171v1/assets/x1.png\" />\n<em>图：Self-Consistency 方法的三步流程——(1) 使用 CoT 提示语言模型；(2) 从解码器中采样生成多条多样化推理路径；(3) 边际化推理路径，通过多数投票选出最一致的答案。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># Self-Consistency 伪代码\ndef self_consistency(model, prompt, question, num_samples=40, temperature=0.5):\n    &quot;&quot;&quot;\n    输入: 语言模型 model, CoT 提示 prompt, 问题 question\n    输出: 最一致的答案\n    &quot;&quot;&quot;\n    answers = []\n    for i in range(num_samples):\n        # Step 1 &amp; 2: 采样一条推理路径 + 答案\n        reasoning_path, answer = model.sample(\n            prompt + question, temperature=temperature\n        )\n        answers.append(answer)\n\n    # Step 3: 多数投票 — 边际化推理路径，选出最一致答案\n    answer_counts = Counter(answers)\n    best_answer = answer_counts.most_common(1)[0][0]\n    return best_answer\n</code></pre>\n<h5>动机与背景</h5>\n<p>Chain-of-Thought (CoT) 提示通过让语言模型生成中间推理步骤，显著提升了多步推理任务的表现。然而，CoT 默认使用<strong>贪心解码</strong>（greedy decoding），即每一步只选择概率最高的 token。这种策略存在两个关键缺陷：</p>\n<ol>\n<li><strong>局部最优</strong>：贪心解码容易陷入次优的推理路径，一旦某一步出错就无法纠正；</li>\n<li><strong>缺乏多样性</strong>：同一个问题只产生一条推理路径，无法利用\"殊途同归\"的直觉——即正确答案往往可以通过多种不同的推理方式得出。</li>\n</ol>\n<p>Self-Consistency 的核心洞察来自人类认知：<strong>如果多条不同的思考路径都指向同一个答案，我们对该答案的信心就会更高</strong>。这一直觉在心理学中被称为\"双过程理论\"（Stanovich &amp; West, 2000），即深思熟虑的问题通常存在多种合理的推理方式。</p>\n<h5>核心机制：采样—边际化</h5>\n<p>Self-Consistency 的方法可以形式化为一个潜变量模型。给定提示（prompt）和问题（question），模型生成一组 <span class=\"kb-math kb-math-inline\">m</span> 条输出 <span class=\"kb-math kb-math-inline\">(\\mathbf{r}_i, \\mathbf{a}_i)</span>，其中 <span class=\"kb-math kb-math-inline\">\\mathbf{r}_i</span> 是推理路径（latent variable），<span class=\"kb-math kb-math-inline\">\\mathbf{a}_i</span> 是最终答案。</p>\n<p><strong>多数投票（Majority Vote）</strong>——最简单也最有效的聚合方式：</p>\n<div class=\"kb-math kb-math-display\">\\hat{a} = \\operatorname*{arg\\,max}_{a} \\sum_{i=1}^{m} \\mathbb{1}(\\mathbf{a}_i = a)</div>\n<p>即选择在 <span class=\"kb-math kb-math-inline\">m</span> 条采样路径中出现次数最多的答案。这等价于将推理路径 <span class=\"kb-math kb-math-inline\">\\mathbf{r}_i</span> 边际化（marginalize out），只关注最终答案的一致性。</p>\n<p><strong>加权投票变体</strong>——可以进一步利用模型的输出概率进行加权：</p>\n<div class=\"kb-math kb-math-display\">\\hat{a} = \\operatorname*{arg\\,max}_{a} \\sum_{i=1}^{m} \\mathbb{1}(\\mathbf{a}_i = a) \\cdot P(\\mathbf{r}_i, \\mathbf{a}_i \\mid \\text{prompt}, \\text{question})</div>\n<p>其中条件概率可以通过长度归一化计算：</p>\n<div class=\"kb-math kb-math-display\">P(\\mathbf{r}_i, \\mathbf{a}_i \\mid \\text{prompt}, \\text{question}) = \\exp\\left(\\frac{1}{K}\\sum_{k=1}^{K} \\log P(t_k \\mid \\text{prompt}, \\text{question}, t_1, \\ldots, t_{k-1})\\right)</div>\n<div class=\"key-point\">💡 <strong>关键发现</strong>：论文实验表明，简单的无权重多数投票（unweighted majority vote）在大多数任务上已经与加权投票表现相当甚至更好，因此推荐使用最简单的多数投票策略。</div>\n<h5>采样策略与路径数量</h5>\n<p>Self-Consistency 兼容多种采样策略：</p>\n<ul>\n<li><strong>Temperature Sampling</strong>：通过调节温度参数 <span class=\"kb-math kb-math-inline\">T</span> 控制输出多样性（论文中 <span class=\"kb-math kb-math-inline\">T=0.5</span> 效果较优）</li>\n<li><strong>Top-k Sampling</strong>：只从概率最高的 <span class=\"kb-math kb-math-inline\">k</span> 个 token 中采样（论文中 <span class=\"kb-math kb-math-inline\">k=40</span>）</li>\n<li><strong>Nucleus Sampling</strong>：从累积概率达到 <span class=\"kb-math kb-math-inline\">p</span> 的最小 token 集合中采样（论文中 <span class=\"kb-math kb-math-inline\">p=0.95</span>）</li>\n</ul>\n<p>论文通过实验验证了<strong>采样路径数量</strong>的影响：从 1 条增加到 40 条，性能持续提升。例如在 GSM8K 上，PaLM-540B 从 CoT 的 56.5% 提升到 Self-Consistency（40 路径）的 74.4%。</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：Self-Consistency 的计算开销与采样路径数量成正比。在实际应用中需要在性能提升和推理成本之间权衡。</div>\n<h5>与传统方法的区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th style=\"text-align: center;\">是否需要额外训练</th>\n<th style=\"text-align: center;\">是否需要多个模型</th>\n<th>核心思想</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Greedy CoT</td>\n<td style=\"text-align: center;\">❌</td>\n<td style=\"text-align: center;\">❌</td>\n<td>单路径贪心解码</td>\n</tr>\n<tr>\n<td>Sample-and-Rank</td>\n<td style=\"text-align: center;\">❌</td>\n<td style=\"text-align: center;\">❌</td>\n<td>采样后按模型概率排序选最优</td>\n</tr>\n<tr>\n<td>Verifier (Cobbe et al.)</td>\n<td style=\"text-align: center;\">✅</td>\n<td style=\"text-align: center;\">✅</td>\n<td>训练额外验证器打分</td>\n</tr>\n<tr>\n<td>模型集成</td>\n<td style=\"text-align: center;\">✅</td>\n<td style=\"text-align: center;\">✅</td>\n<td>多模型输出聚合</td>\n</tr>\n<tr>\n<td><strong>Self-Consistency</strong></td>\n<td style=\"text-align: center;\"><strong>❌</strong></td>\n<td style=\"text-align: center;\"><strong>❌</strong></td>\n<td><strong>单模型多路采样 + 多数投票</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p>Self-Consistency 的核心优势在于：<strong>零额外成本</strong>（无需训练、无需标注、无需辅助模型），仅通过改变解码策略就能获得类似集成学习的效果，本质上是一种\"自集成\"（self-ensemble）方法。</p>",
      "quiz": {
        "q": "Self-Consistency 方法在聚合多条推理路径的答案时，默认采用什么策略？",
        "options": [
          "选择模型输出概率最高的那条推理路径的答案",
          "对所有推理路径的答案取多数投票（majority vote）",
          "训练一个额外的验证器对每条路径打分",
          "使用 beam search 选择全局最优路径"
        ],
        "answer": 1,
        "explain": "Self-Consistency 的核心是将推理路径作为潜变量边际化，通过多数投票选出出现次数最多的答案，无需额外训练或模型。"
      }
    },
    {
      "id": "react",
      "num": 11,
      "name": "ReAct",
      "fullName": "推理与行动协同 (ReAct)",
      "year": "2022",
      "org": "Google/普林斯顿",
      "parent": "cot",
      "paperUrl": "https://arxiv.org/abs/2210.03629",
      "projectUrl": "",
      "category": "planning",
      "motivation": "交替执行推理与行动支持动态环境",
      "summary": "ReAct 的核心目标是：交替执行推理与行动支持动态环境。",
      "keyPoints": [
        "核心动机：交替执行推理与行动支持动态环境",
        "演化来源：继承或改进自 cot",
        "代表机构：Google/普林斯顿"
      ],
      "detail": "<p>交替执行推理与行动支持动态环境</p>"
    },
    {
      "id": "plan_and_solve",
      "num": 12,
      "name": "Plan-and-Solve",
      "fullName": "计划求解 (Plan-and-Solve)",
      "year": "2023",
      "org": "新加坡国立大学",
      "parent": "cot",
      "paperUrl": "https://aclanthology.org/2023.acl-long.147/",
      "projectUrl": "",
      "category": "planning",
      "motivation": "先制定计划再逐步执行",
      "summary": "Plan-and-Solve (PS) Prompting 提出用\"先制定计划、再逐步执行\"的提示策略替换 Zero-shot-CoT 的\"Let's think step by step\"，并通过附加细粒度指令（提取变量、关注计算）形成 PS+ 变体，在零样本设置下显著减少推理步骤遗漏和计算错误，性能媲美甚至超越少样本 CoT 方法。",
      "keyPoints": [
        "<strong>两阶段零样本提示框架</strong>：Step 1 生成包含计划与推理过程的文本，Step 2 提取最终答案",
        "<strong>PS 提示</strong>：将触发句从\"Let's think step by step\"替换为\"Let's first understand the problem and devise a plan to solve the problem. Then, let's carry out the plan and solve the problem step by step\"",
        "<strong>PS+ 提示</strong>：在 PS 基础上增加三条细粒度指令——\"extract relevant variables and their corresponding numerals\"、\"calculate intermediate results\"、\"pay attention to calculation and commonsense\"",
        "<strong>三类错误分析</strong>：系统识别 Zero-shot-CoT 的三大缺陷——计算错误 (7%)、推理步骤遗漏 (12%)、语义误解 (27%)",
        "<strong>广泛评测</strong>：覆盖 10 个数据集、3 类推理问题（算术推理、常识推理、符号推理），使用 GPT-3 (text-davinci-003) 作为骨干模型",
        "<strong>核心结果</strong>：PS+ 零样本在算术推理平均准确率 76.7%，超越 Zero-shot-CoT (70.4%) 和 Zero-shot-PoT (73.5%)，接近 8-shot Manual-CoT (77.6%)",
        "<strong>与自一致性 (Self-Consistency) 兼容</strong>：PS+ + SC 在 GSM8K 达 73.7%，SVAMP 达 84.4%"
      ],
      "detail": "<h5>问题背景与动机</h5>\n<p>Zero-shot-CoT 通过在提示末尾附加\"Let's think step by step\"来引导 LLM 生成推理链，虽然简单有效，但作者对 GSM8K 数据集上 100 个错误样本的分析揭示了三类系统性缺陷：</p>\n<p><img alt=\"Zero-shot-CoT 错误分析\" src=\"https://ar5iv.labs.arxiv.org/html/2305.04091/assets/x1.png\" />\n<em>图 1：Zero-shot-CoT 在 GSM8K 上的错误类型分布——计算错误 7%、步骤遗漏 12%、语义误解 27%</em></p>\n<p>其中，<strong>步骤遗漏错误</strong>（Missing-Step Error）是 PS 方法的主要攻克目标：当问题涉及多个推理步骤时，LLM 容易跳过中间步骤直接给出答案。作者认为，这是因为\"Let's think step by step\"缺乏对任务分解的显式引导。</p>\n<h5>核心方法：Plan-and-Solve Prompting</h5>\n<p><img alt=\"PS 与 Zero-shot-CoT 对比\" src=\"https://ar5iv.labs.arxiv.org/html/2305.04091/assets/x2.png\" />\n<em>图 2：(a) Zero-shot-CoT 与 (b) Plan-and-Solve 提示的输入输出对比</em></p>\n<p>PS Prompting 的核心思想极为简洁——将提示模板从：</p>\n<blockquote>\n<p>Q: [问题]. A: Let's think step by step.</p>\n</blockquote>\n<p>替换为：</p>\n<blockquote>\n<p>Q: [问题]. A: Let's first understand the problem and <strong>devise a plan</strong> to solve the problem. Then, let's <strong>carry out the plan</strong> and solve the problem step by step.</p>\n</blockquote>\n<p>这一改动引导 LLM 先将复杂问题分解为子任务（计划阶段），再按计划逐步执行（求解阶段），从而减少步骤遗漏。</p>\n<h5>PS+ 提示：细粒度指令增强</h5>\n<p><img alt=\"PS 与 PS+ 对比\" src=\"https://ar5iv.labs.arxiv.org/html/2305.04091/assets/x3.png\" />\n<em>图 3：(a) PS Prompting 与 (b) PS+ Prompting 的对比——PS+ 通过附加指令显著提升推理质量</em></p>\n<p>PS+ 在 PS 的基础上添加了三条关键指令：</p>\n<ol>\n<li><strong>\"extract relevant variables and their corresponding numerals\"</strong>——强制 LLM 提取问题中的关键变量和数值，避免遗漏重要信息</li>\n<li><strong>\"calculate intermediate results\"</strong>——要求 LLM 显式计算中间结果，而非跳步推理</li>\n<li><strong>\"pay attention to calculation and commonsense\"</strong>——提醒 LLM 注意计算准确性和常识一致性</li>\n</ol>\n<p>完整的 PS+ 提示模板为：</p>\n<pre><code class=\"language-text\">Q: [问题]. A: Let's first understand the problem, extract relevant variables\nand their corresponding numerals, and make a plan. Then, let's carry out\nthe plan, calculate intermediate variables (pay attention to correct\nnumerical calculation and commonsense), solve the problem step by step,\nand show the answer.\n</code></pre>\n<h5>两步推理流程伪代码</h5>\n<pre><code class=\"language-python\"># Plan-and-Solve (PS+) 两步推理流程\ndef plan_and_solve_plus(question, llm):\n    # Step 1: 推理生成\n    prompt_step1 = f&quot;Q: {question}. A: Let's first understand the problem, &quot;\n                   f&quot;extract relevant variables and their corresponding numerals, &quot;\n                   f&quot;and make a plan. Then, let's carry out the plan, &quot;\n                   f&quot;calculate intermediate variables (pay attention to correct &quot;\n                   f&quot;numerical calculation and commonsense), solve the problem &quot;\n                   f&quot;step by step, and show the answer.&quot;\n    reasoning_text = llm.generate(prompt_step1, temperature=0)  # 贪心解码\n\n    # Step 2: 答案提取\n    prompt_step2 = prompt_step1 + reasoning_text + \\\n                   &quot;\\nTherefore, the answer (arabic numerals) is&quot;\n    answer = llm.generate(prompt_step2, temperature=0)\n    return answer\n</code></pre>\n<div class=\"key-point\">💡 <strong>关键设计</strong>：与 Zero-shot-CoT 完全一致的两步框架（生成 + 提取），仅修改 Step 1 的触发句，无需任何示例、无需额外模型或工具，实现即插即用。</div>\n<h5>实验结果与分析</h5>\n<p><strong>算术推理（6 个数据集）</strong>：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>MultiArith</th>\n<th>GSM8K</th>\n<th>AddSub</th>\n<th>AQuA</th>\n<th>SingleEq</th>\n<th>SVAMP</th>\n<th>平均</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Zero-shot-CoT</td>\n<td>83.8</td>\n<td>56.4</td>\n<td>85.3</td>\n<td>38.9</td>\n<td>88.1</td>\n<td>69.9</td>\n<td>70.4</td>\n</tr>\n<tr>\n<td>Zero-shot-PoT</td>\n<td>92.2</td>\n<td>57.0</td>\n<td>85.1</td>\n<td>43.9</td>\n<td>91.7</td>\n<td>70.8</td>\n<td>73.5</td>\n</tr>\n<tr>\n<td><strong>Zero-shot-PS</strong></td>\n<td>87.2</td>\n<td>58.2</td>\n<td>88.1</td>\n<td>42.5</td>\n<td>89.2</td>\n<td>72.0</td>\n<td>72.9</td>\n</tr>\n<tr>\n<td><strong>Zero-shot-PS+</strong></td>\n<td><strong>91.8</strong></td>\n<td><strong>59.3</strong></td>\n<td><strong>92.2</strong></td>\n<td><strong>46.0</strong></td>\n<td><strong>94.7</strong></td>\n<td><strong>75.7</strong></td>\n<td><strong>76.7</strong></td>\n</tr>\n<tr>\n<td>8-shot Manual-CoT</td>\n<td>93.6</td>\n<td>58.4</td>\n<td>91.6</td>\n<td>48.4</td>\n<td>93.5</td>\n<td>80.3</td>\n<td>77.6</td>\n</tr>\n</tbody>\n</table></div>\n<p>PS+ 在所有算术数据集上均大幅超越 Zero-shot-CoT（平均 +6.3%），在 5/6 个数据集上超越 Zero-shot-PoT，且与 8-shot Manual-CoT 仅差 0.9%。</p>\n<p><strong>常识推理</strong>：PS+ 在 CommonsenseQA 上达 71.9%（vs CoT 65.2%），StrategyQA 上达 65.4%（vs CoT 63.8%）。</p>\n<p><strong>符号推理</strong>：PS+ 在 Last Letter 上达 75.2%，甚至超越 8-shot Manual-CoT（70.6%）。</p>\n<h5>错误类型消融分析</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>计算错误</th>\n<th>步骤遗漏</th>\n<th>语义误解</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Zero-shot-CoT</td>\n<td>7%</td>\n<td>12%</td>\n<td>27%</td>\n</tr>\n<tr>\n<td>Zero-shot-PS</td>\n<td>7%</td>\n<td>10%</td>\n<td>26%</td>\n</tr>\n<tr>\n<td>Zero-shot-PS+</td>\n<td><strong>5%</strong></td>\n<td><strong>7%</strong></td>\n<td>27%</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"warn-box\">⚠️ <strong>局限性</strong>：PS+ 有效减少了计算错误（7%→5%）和步骤遗漏（12%→7%），但对语义误解错误（27%）几乎无改善——这类错误源于 LLM 自身的理解能力上限，难以仅通过提示工程解决。</div>\n<h5>提示设计的关键发现</h5>\n<p>作者通过 6 种不同触发句的对比实验（Table 5）揭示了重要规律：</p>\n<ul>\n<li>单独使用\"extract variables\"指令（Prompt 3）反而导致性能下降（GSM8K: 50.5% vs 56.4%），因为缺少计划制定的引导</li>\n<li><strong>\"devise a plan + carry out the plan\"是性能提升的核心驱动力</strong>（Prompt 5: GSM8K 58.2%）</li>\n<li>在计划框架上叠加细粒度指令才能获得最佳效果（Prompt 6/PS+: GSM8K 59.3%）</li>\n</ul>\n<p>相关性分析进一步证实：生成文本中包含变量定义和推理计划与计算错误、步骤遗漏呈<strong>负相关</strong>，验证了 PS+ 的设计直觉。</p>\n<h5>与传统方法的核心区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th>Zero-shot-CoT</th>\n<th>Plan-and-Solve (PS+)</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>触发策略</td>\n<td>单一指令\"think step by step\"</td>\n<td>结构化指令：计划→提取变量→执行→计算</td>\n</tr>\n<tr>\n<td>任务分解</td>\n<td>隐式依赖 LLM 自发分解</td>\n<td>显式要求 LLM 先制定计划</td>\n</tr>\n<tr>\n<td>计算引导</td>\n<td>无</td>\n<td>明确要求提取数值、计算中间结果</td>\n</tr>\n<tr>\n<td>示例需求</td>\n<td>零样本</td>\n<td>零样本（无需人工示例）</td>\n</tr>\n<tr>\n<td>额外工具</td>\n<td>无</td>\n<td>无（纯提示方法）</td>\n</tr>\n</tbody>\n</table></div>",
      "quiz": {
        "q": "Plan-and-Solve Prompting 相比 Zero-shot-CoT 最核心的改进是什么？",
        "options": [
          "使用更大的语言模型来提升推理能力",
          "在提示中加入少量人工标注的推理示例",
          "将触发句替换为先制定计划再逐步执行的结构化指令",
          "引入外部 Python 解释器执行计算"
        ],
        "answer": 2,
        "explain": "PS Prompting 的核心创新是将'Let's think step by step'替换为包含'devise a plan'和'carry out the plan'的结构化触发句，引导 LLM 先分解任务再逐步求解，无需示例或外部工具。"
      }
    },
    {
      "id": "tot",
      "num": 13,
      "name": "ToT",
      "fullName": "思维树 (Tree of Thoughts)",
      "year": "2023",
      "org": "普林斯顿/Google DeepMind",
      "parent": "cot",
      "paperUrl": "https://proceedings.neurips.cc/paper/2023/hash/271db9922b8d1f4dd7aaef84ed5ac703-Abstract.html",
      "projectUrl": "",
      "category": "planning",
      "motivation": "树结构推理支持搜索与回溯",
      "summary": "ToT 的核心目标是：树结构推理支持搜索与回溯。",
      "keyPoints": [
        "核心动机：树结构推理支持搜索与回溯",
        "演化来源：继承或改进自 cot",
        "代表机构：普林斯顿/Google DeepMind"
      ],
      "detail": "<p>树结构推理支持搜索与回溯</p>"
    },
    {
      "id": "reflexion",
      "num": 14,
      "name": "Reflexion",
      "fullName": "反思机制 (Reflexion)",
      "year": "2023",
      "org": "Northeastern大学",
      "parent": "react",
      "paperUrl": "https://proceedings.neurips.cc/paper_files/paper/2023/hash/1b44b878bb782e6954cd888628510e90-Abstract-Conference.html",
      "projectUrl": "",
      "category": "planning",
      "motivation": "语言反馈实现自我反思与纠错",
      "summary": "Reflexion 的核心目标是：语言反馈实现自我反思与纠错。",
      "keyPoints": [
        "核心动机：语言反馈实现自我反思与纠错",
        "演化来源：继承或改进自 react",
        "代表机构：Northeastern大学"
      ],
      "detail": "<p>语言反馈实现自我反思与纠错</p>"
    },
    {
      "id": "lats",
      "num": 15,
      "name": "LATS",
      "fullName": "语言智能体树搜索 (LATS)",
      "year": "2023",
      "org": "UIUC",
      "parent": "tot",
      "paperUrl": "https://arxiv.org/abs/2310.04406",
      "projectUrl": "",
      "category": "planning",
      "motivation": "统一推理行动于蒙特卡洛树搜索",
      "summary": "LATS 的核心目标是：统一推理行动于蒙特卡洛树搜索。",
      "keyPoints": [
        "核心动机：统一推理行动于蒙特卡洛树搜索",
        "演化来源：继承或改进自 tot",
        "代表机构：UIUC"
      ],
      "detail": "<p>统一推理行动于蒙特卡洛树搜索</p>"
    },
    {
      "id": "retroformer",
      "num": 16,
      "name": "Retroformer",
      "fullName": "回顾式智能体 (Retroformer)",
      "year": "2024",
      "org": "Salesforce",
      "parent": "reflexion",
      "paperUrl": "https://proceedings.iclr.cc/paper_files/paper/2024/hash/29f421fbdcc82aeb349d784d3aaccdb3-Abstract-Conference.html",
      "projectUrl": "",
      "category": "planning",
      "motivation": "策略梯度优化反思模块加速学习",
      "summary": "Retroformer 的核心目标是：策略梯度优化反思模块加速学习。",
      "keyPoints": [
        "核心动机：策略梯度优化反思模块加速学习",
        "演化来源：继承或改进自 reflexion",
        "代表机构：Salesforce"
      ],
      "detail": "<p>策略梯度优化反思模块加速学习</p>"
    },
    {
      "id": "camel",
      "num": 17,
      "name": "CAMEL",
      "fullName": "交流式智能体 (CAMEL)",
      "year": "2023",
      "org": "KAUST",
      "parent": "—",
      "paperUrl": "https://proceedings.neurips.cc/paper/2023/hash/a3621ee907def47c1b952ade25c67698-Abstract-Conference.html",
      "projectUrl": "",
      "category": "multi_agent",
      "motivation": "角色扮演框架实现自主协作",
      "summary": "CAMEL 的核心目标是：角色扮演框架实现自主协作。",
      "keyPoints": [
        "核心动机：角色扮演框架实现自主协作",
        "代表机构：KAUST"
      ],
      "detail": "<p>角色扮演框架实现自主协作</p>"
    },
    {
      "id": "babyagi",
      "num": 18,
      "name": "BabyAGI",
      "fullName": "任务驱动智能体 (BabyAGI)",
      "year": "2023",
      "org": "Yohei Nakajima",
      "parent": "—",
      "paperUrl": "https://yoheinakajima.com/task-driven-autonomous-agent/",
      "projectUrl": "",
      "category": "multi_agent",
      "motivation": "任务生成与优先级排序自主循环",
      "summary": "BabyAGI 的核心目标是：任务生成与优先级排序自主循环。",
      "keyPoints": [
        "核心动机：任务生成与优先级排序自主循环",
        "代表机构：Yohei Nakajima"
      ],
      "detail": "<p>任务生成与优先级排序自主循环</p>"
    },
    {
      "id": "chatdev",
      "num": 19,
      "name": "ChatDev",
      "fullName": "聊天驱动开发 (ChatDev)",
      "year": "2023",
      "org": "清华大学",
      "parent": "camel",
      "paperUrl": "https://arxiv.org/abs/2307.07924",
      "projectUrl": "",
      "category": "multi_agent",
      "motivation": "多Agent模拟软件公司开发流程",
      "summary": "ChatDev 的核心目标是：多Agent模拟软件公司开发流程。",
      "keyPoints": [
        "核心动机：多Agent模拟软件公司开发流程",
        "演化来源：继承或改进自 camel",
        "代表机构：清华大学"
      ],
      "detail": "<p>多Agent模拟软件公司开发流程</p>"
    },
    {
      "id": "autogen",
      "num": 20,
      "name": "AutoGen",
      "fullName": "自动生成智能体 (AutoGen)",
      "year": "2024",
      "org": "微软",
      "parent": "camel",
      "paperUrl": "https://openreview.net/forum?id=BAakY1hNKS",
      "projectUrl": "",
      "category": "multi_agent",
      "motivation": "可定制可对话的多Agent工作流框架",
      "summary": "AutoGen 的核心目标是：可定制可对话的多Agent工作流框架。",
      "keyPoints": [
        "核心动机：可定制可对话的多Agent工作流框架",
        "演化来源：继承或改进自 camel",
        "代表机构：微软"
      ],
      "detail": "<p>可定制可对话的多Agent工作流框架</p>"
    },
    {
      "id": "metagpt",
      "num": 21,
      "name": "MetaGPT",
      "fullName": "元编程智能体 (MetaGPT)",
      "year": "2024",
      "org": "深度赋智",
      "parent": "chatdev",
      "paperUrl": "https://openreview.net/forum?id=uS04ESuElM",
      "projectUrl": "",
      "category": "multi_agent",
      "motivation": "SOP注入多Agent协作流程",
      "summary": "MetaGPT 的核心目标是：SOP注入多Agent协作流程。",
      "keyPoints": [
        "核心动机：SOP注入多Agent协作流程",
        "演化来源：继承或改进自 chatdev",
        "代表机构：深度赋智"
      ],
      "detail": "<p>SOP注入多Agent协作流程</p>"
    },
    {
      "id": "agentverse",
      "num": 22,
      "name": "AgentVerse",
      "fullName": "智能体宇宙 (AgentVerse)",
      "year": "2024",
      "org": "清华大学",
      "parent": "camel",
      "paperUrl": "https://proceedings.iclr.cc/paper_files/paper/2024/hash/578e65cdee35d00c708d4c64bce32971-Abstract-Conference.html",
      "projectUrl": "",
      "category": "multi_agent",
      "motivation": "模拟群体涌现行为与动态调整",
      "summary": "AgentVerse 的核心目标是：模拟群体涌现行为与动态调整。",
      "keyPoints": [
        "核心动机：模拟群体涌现行为与动态调整",
        "演化来源：继承或改进自 camel",
        "代表机构：清华大学"
      ],
      "detail": "<p>模拟群体涌现行为与动态调整</p>"
    },
    {
      "id": "openagents",
      "num": 23,
      "name": "OpenAgents",
      "fullName": "开放智能体平台 (OpenAgents)",
      "year": "2024",
      "org": "香港大学",
      "parent": "autogen",
      "paperUrl": "https://arxiv.org/abs/2310.10634",
      "projectUrl": "",
      "category": "multi_agent",
      "motivation": "面向真实世界的开放Agent平台",
      "summary": "OpenAgents 的核心目标是：面向真实世界的开放Agent平台。",
      "keyPoints": [
        "核心动机：面向真实世界的开放Agent平台",
        "演化来源：继承或改进自 autogen",
        "代表机构：香港大学"
      ],
      "detail": "<p>面向真实世界的开放Agent平台</p>"
    },
    {
      "id": "api_bank_bench",
      "num": 24,
      "name": "API-Bank",
      "fullName": "API工具基准 (API-Bank)",
      "year": "2023",
      "org": "中科院/阿里巴巴",
      "parent": "—",
      "paperUrl": "https://aclanthology.org/2023.emnlp-main.187/",
      "projectUrl": "",
      "category": "benchmark",
      "motivation": "首个系统性工具增强LLM基准",
      "summary": "API-Bank 的核心目标是：首个系统性工具增强LLM基准。",
      "keyPoints": [
        "核心动机：首个系统性工具增强LLM基准",
        "代表机构：中科院/阿里巴巴"
      ],
      "detail": "<p>首个系统性工具增强LLM基准</p>"
    },
    {
      "id": "agentbench",
      "num": 25,
      "name": "AgentBench",
      "fullName": "智能体基准 (AgentBench)",
      "year": "2024",
      "org": "清华大学",
      "parent": "api_bank_bench",
      "paperUrl": "https://proceedings.iclr.cc/paper_files/paper/2024/hash/e9df36b21ff4ee211a8b71ee8b7e9f57-Abstract-Conference.html",
      "projectUrl": "",
      "category": "benchmark",
      "motivation": "涵盖8个交互环境的综合评测",
      "summary": "AgentBench 的核心目标是：涵盖8个交互环境的综合评测。",
      "keyPoints": [
        "核心动机：涵盖8个交互环境的综合评测",
        "演化来源：继承或改进自 api_bank_bench",
        "代表机构：清华大学"
      ],
      "detail": "<p>涵盖8个交互环境的综合评测</p>"
    },
    {
      "id": "webarena",
      "num": 26,
      "name": "WebArena",
      "fullName": "网页竞技场 (WebArena)",
      "year": "2024",
      "org": "CMU",
      "parent": "agentbench",
      "paperUrl": "https://proceedings.iclr.cc/paper_files/paper/2024/hash/4410c0711e9154a7a2d26f9b3816d1ef-Abstract-Conference.html",
      "projectUrl": "",
      "category": "benchmark",
      "motivation": "真实网站端到端任务执行评测",
      "summary": "WebArena 的核心目标是：真实网站端到端任务执行评测。",
      "keyPoints": [
        "核心动机：真实网站端到端任务执行评测",
        "演化来源：继承或改进自 agentbench",
        "代表机构：CMU"
      ],
      "detail": "<p>真实网站端到端任务执行评测</p>"
    },
    {
      "id": "gaia",
      "num": 27,
      "name": "GAIA",
      "fullName": "通用AI助手评测 (GAIA)",
      "year": "2024",
      "org": "Meta/HuggingFace",
      "parent": "agentbench",
      "paperUrl": "https://proceedings.iclr.cc/paper_files/paper/2024/hash/25ae35b5b1738d80f1f03a8713e405ec-Abstract-Conference.html",
      "projectUrl": "",
      "category": "benchmark",
      "motivation": "现实世界复杂任务评测",
      "summary": "GAIA 的核心目标是：现实世界复杂任务评测。",
      "keyPoints": [
        "核心动机：现实世界复杂任务评测",
        "演化来源：继承或改进自 agentbench",
        "代表机构：Meta/HuggingFace"
      ],
      "detail": "<p>现实世界复杂任务评测</p>"
    },
    {
      "id": "swe_bench",
      "num": 28,
      "name": "SWE-bench",
      "fullName": "软件工程基准 (SWE-bench)",
      "year": "2024",
      "org": "普林斯顿",
      "parent": "agentbench",
      "paperUrl": "https://arxiv.org/abs/2310.06770",
      "projectUrl": "",
      "category": "benchmark",
      "motivation": "真实GitHub Issue解决能力评测",
      "summary": "SWE-bench 提出了一个基于真实 GitHub issue 和 pull request 的软件工程基准测试，包含来自 12 个主流 Python 仓库的 2,294 个任务实例，用于评估语言模型在真实代码库中定位并修复 bug 的能力，揭示了当前最强模型（Claude 2）仅能解决 4.80% 的问题，凸显了实际软件工程任务的巨大挑战。",
      "keyPoints": [
        "<strong>真实世界基准</strong>：从 12 个高星 Python 开源仓库（Django、scikit-learn、sympy、Flask 等）中收集 2,294 个经过严格筛选的 issue-PR 对，每个任务都有可执行的单元测试验证",
        "<strong>三阶段自动化构建流水线</strong>：Repo Selection → Attribute-based Filtering → Execution-based Filtering，确保每个任务实例具备可复现的测试环境和明确的 fail-to-pass 测试用例",
        "<strong>任务定义</strong>：给定 issue 描述文本和对应代码库快照，模型需生成一个能通过所有相关测试的代码补丁（patch）",
        "<strong>评估框架</strong>：基于 fail-to-pass（修复目标测试）和 pass-to-pass（不破坏已有功能）两类测试的执行结果进行自动化评判",
        "<strong>SWE-Llama 微调模型</strong>：基于 CodeLlama（7B/13B）使用 LoRA 在 19,000 个来自 37 个非重叠仓库的 issue-PR 对上微调，显著优于基础模型",
        "<strong>多种检索策略</strong>：BM25 和 Oracle 两种上下文检索方式，探索不同信息量对模型性能的影响",
        "<strong>关键发现</strong>：所有模型在该基准上表现极差，最佳结果为 Claude 2 在 Oracle 检索下的 4.80%，说明真实软件工程问题远超当前 LLM 能力"
      ],
      "detail": "<p><img alt=\"SWE-bench 总览示意图\" src=\"https://ar5iv.labs.arxiv.org/html/2310.06770/assets/x1.png\" />\n<em>图：SWE-bench 构建与评估流程总览。左侧展示从 GitHub 仓库中自动化收集和筛选任务实例的三阶段流水线，右侧展示模型接收 issue 文本和代码上下文后生成补丁并通过测试验证的评估流程。</em></p>\n<h5>动机与背景</h5>\n<p>现有代码生成基准（如 HumanEval、MBPP、APPS）主要评估模型在<strong>独立函数级别</strong>的代码生成能力，任务通常是根据自然语言描述从零编写一个短函数。然而，真实的软件工程工作远不止于此——开发者需要在<strong>大规模代码库</strong>中理解跨文件依赖关系、定位 bug 根因、设计符合项目风格的修复方案，并确保修改不会引入新的回归问题。SWE-bench 正是为了填补这一评估空白而设计的。</p>\n<p>与传统基准不同，SWE-bench 的每个任务都来自<strong>真实的开源项目</strong>，issue 描述由真实用户撰写（可能包含 bug 报告、功能请求、代码片段、错误堆栈等），解决方案涉及对一个或多个文件的修改。这使得 SWE-bench 能够评估模型在以下方面的综合能力：代码理解、bug 定位、跨文件编辑、测试意识以及对项目规范的遵循。</p>\n<h5>三阶段构建流水线</h5>\n<p>SWE-bench 的数据收集采用了一个精心设计的三阶段自动化流水线：</p>\n<p><strong>Stage I — 仓库选择（Repo Selection）</strong>：从 GitHub 上筛选使用广泛、维护活跃、测试覆盖良好的 Python 仓库。最终选定 12 个仓库，涵盖 Web 框架（Django、Flask）、科学计算（scikit-learn、sympy、matplotlib）、开发工具（pylint、pytest）等多个领域。</p>\n<p><strong>Stage II — 属性过滤（Attribute-based Filtering）</strong>：对每个仓库中的 pull request 进行初步筛选，要求：(1) PR 必须关联至少一个 issue；(2) PR 必须修改至少一个测试文件（确保有可验证的测试）；(3) PR 已被合并到主分支。这一步将候选数量从数万缩减到数千。</p>\n<p><strong>Stage III — 执行过滤（Execution-based Filtering）</strong>：这是最关键的一步。对每个候选 PR，系统会：\n1. 检出 PR 合并前的代码库版本（base commit）\n2. 应用 PR 中的测试文件修改（但不应用源代码修改）\n3. 运行测试套件，识别出<strong>fail-to-pass 测试</strong>（在 base commit 上失败、在合并后通过的测试）和 <strong>pass-to-pass 测试</strong>（始终通过的测试）\n4. 仅保留至少有一个 fail-to-pass 测试的实例</p>\n<p>这种执行级验证确保了每个任务实例都有明确的\"正确性标准\"——模型生成的补丁必须让 fail-to-pass 测试通过，同时不破坏 pass-to-pass 测试。</p>\n<p><img alt=\"SWE-bench 数据分布\" src=\"https://ar5iv.labs.arxiv.org/html/2310.06770/assets/x2.png\" />\n<em>图：SWE-bench 任务实例的统计分布，包括 issue 描述长度、代码库规模、需要编辑的文件/函数/行数等维度。</em></p>\n<h5>任务形式化与评估机制</h5>\n<p>SWE-bench 的任务被形式化定义为：给定一个 issue 文本描述 <span class=\"kb-math kb-math-inline\">I</span> 和代码库快照 <span class=\"kb-math kb-math-inline\">C</span>（对应 base commit），模型需要生成一个补丁 <span class=\"kb-math kb-math-inline\">P</span>，使得将 <span class=\"kb-math kb-math-inline\">P</span> 应用到 <span class=\"kb-math kb-math-inline\">C</span> 后，所有 fail-to-pass 测试通过且所有 pass-to-pass 测试保持通过。</p>\n<p>评估指标为 <strong>% Resolved</strong>，即成功解决的任务实例占总数的百分比。一个任务被视为\"解决\"当且仅当：</p>\n<div class=\"kb-math kb-math-display\">\\text{Resolved}(P) = \\mathbb{1}\\left[\\text{F2P}(C \\oplus P) = \\text{PASS} \\wedge \\text{P2P}(C \\oplus P) = \\text{PASS}\\right]</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\text{F2P}</span> 和 <span class=\"kb-math kb-math-inline\">\\text{P2P}</span> 分别表示 fail-to-pass 和 pass-to-pass 测试集的执行结果。</p>\n<p>论文探索了两种上下文检索策略来为模型提供相关代码：\n- <strong>BM25 检索</strong>：使用 issue 文本作为查询，对代码库中的文件/函数进行 BM25 检索，选取最相关的代码片段\n- <strong>Oracle 检索</strong>：直接提供 gold patch 中涉及的文件内容（上界参考）</p>\n<p>同时探索了两种输出格式：\n- <strong>Patch 格式</strong>：模型直接生成 unified diff 格式的补丁\n- <strong>Full File 格式</strong>：模型输出完整的修改后文件</p>\n<pre><code class=\"language-python\"># SWE-bench 评估流程伪代码\ndef evaluate_instance(model, issue_text, codebase, tests):\n    # Step 1: 检索相关代码上下文\n    context = retrieve_context(issue_text, codebase)  # BM25 or Oracle\n\n    # Step 2: 构造 prompt（issue + context）\n    prompt = format_prompt(issue_text, context)\n\n    # Step 3: 模型生成补丁\n    patch = model.generate(prompt)\n\n    # Step 4: 应用补丁到代码库\n    patched_codebase = apply_patch(codebase, patch)\n\n    # Step 5: 运行测试验证\n    f2p_result = run_tests(patched_codebase, tests['fail_to_pass'])\n    p2p_result = run_tests(patched_codebase, tests['pass_to_pass'])\n\n    return f2p_result == PASS and p2p_result == PASS\n</code></pre>\n<h5>SWE-Llama 微调策略</h5>\n<p>为了建立更强的基线，作者基于 CodeLlama（7B 和 13B）使用 LoRA 进行了微调，得到 SWE-Llama 系列模型。训练数据来自 37 个与 SWE-bench 测试集<strong>无重叠</strong>的 Python 仓库，共收集约 19,000 个 issue-PR 对。</p>\n<p>微调采用标准的指令跟随格式：输入为 issue 描述 + 检索到的代码上下文，输出为对应的 gold patch。使用 LoRA（rank=64, alpha=16）在 4 个 A100 GPU 上训练 2 个 epoch。</p>\n<div class=\"key-point\">💡 关键：SWE-Llama 13B 在 BM25 检索下达到 1.00% 的解决率，虽然绝对值不高，但相比基础 CodeLlama 13B 的 0.70% 有显著提升，证明了领域微调的价值。</div>\n<h5>实验结果与关键发现</h5>\n<p>论文对多个模型进行了系统评估，核心结果如下：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>模型</th>\n<th>BM25 检索 (% Resolved)</th>\n<th>Oracle 检索 (% Resolved)</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Claude 2</td>\n<td>1.96%</td>\n<td><strong>4.80%</strong></td>\n</tr>\n<tr>\n<td>GPT-4</td>\n<td>0.17%</td>\n<td>1.74%</td>\n</tr>\n<tr>\n<td>ChatGPT-3.5</td>\n<td>0.52%</td>\n<td>0.70%</td>\n</tr>\n<tr>\n<td>SWE-Llama 13B</td>\n<td>1.00%</td>\n<td>3.00%</td>\n</tr>\n<tr>\n<td>SWE-Llama 7B</td>\n<td>0.70%</td>\n<td>2.22%</td>\n</tr>\n<tr>\n<td>CodeLlama 13B</td>\n<td>0.70%</td>\n<td>1.22%</td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>关键发现</strong>：</p>\n<ol>\n<li>\n<p><strong>整体表现极差</strong>：即使是最强的 Claude 2 在 Oracle 检索（已知需要修改哪些文件）下也仅解决 4.80% 的问题，说明真实软件工程任务对当前 LLM 构成巨大挑战。</p>\n</li>\n<li>\n<p><strong>上下文检索至关重要</strong>：Oracle 检索相比 BM25 检索带来显著提升（Claude 2: 1.96% → 4.80%），表明<strong>定位正确的代码文件</strong>本身就是一个核心难点。</p>\n</li>\n<li>\n<p><strong>Patch 格式优于 Full File 格式</strong>：直接生成 diff 补丁比输出完整文件效果更好，因为后者需要模型精确复制大量未修改的代码。</p>\n</li>\n<li>\n<p><strong>难度与上下文长度正相关</strong>：需要更多代码上下文的任务（涉及更多文件、更长函数）解决率更低，模型倾向于只解决需要少量局部修改的简单问题。</p>\n</li>\n<li>\n<p><strong>模型生成的补丁偏简单</strong>：成功解决的任务通常只涉及 1 个文件、少量行的修改，而 SWE-bench 中许多任务需要跨文件的复杂编辑。</p>\n</li>\n</ol>\n<div class=\"warn-box\">⚠️ 注意：SWE-bench 的难度不仅来自代码生成本身，更来自于<strong>理解模糊的 issue 描述</strong>、<strong>在大型代码库中定位问题</strong>、以及<strong>生成符合项目规范的完整修复方案</strong>这一综合挑战。</div>",
      "quiz": {
        "q": "SWE-bench 评估流程中，一个任务实例被判定为'已解决'的条件是什么？",
        "options": [
          "模型生成的补丁能够成功应用到代码库上",
          "模型生成的补丁使 fail-to-pass 测试通过，且 pass-to-pass 测试保持通过",
          "模型生成的补丁与 gold patch 完全一致",
          "模型生成的补丁通过了代码审查（code review）"
        ],
        "answer": 1,
        "explain": "SWE-bench 采用执行级评估，要求补丁同时满足两个条件：让原本失败的测试通过（fail-to-pass），且不破坏原本通过的测试（pass-to-pass），而非要求与标准答案完全匹配。"
      }
    },
    {
      "id": "hi_cot",
      "num": 29,
      "name": "Hi-CoT",
      "fullName": "分层思维链 (Hierarchical CoT)",
      "year": "2026",
      "org": "arXiv",
      "parent": "cot",
      "paperUrl": "https://arxiv.org/abs/2604.00130",
      "projectUrl": "",
      "category": "frontier_2026",
      "motivation": "分层架构解决超长任务上下文丢失",
      "summary": "Hi-CoT 的核心目标是：分层架构解决超长任务上下文丢失。",
      "keyPoints": [
        "核心动机：分层架构解决超长任务上下文丢失",
        "演化来源：继承或改进自 cot",
        "代表机构：arXiv"
      ],
      "detail": "<p>分层架构解决超长任务上下文丢失</p>"
    },
    {
      "id": "gaia2",
      "num": 30,
      "name": "Gaia2",
      "fullName": "动态异步基准 (Gaia2)",
      "year": "2026",
      "org": "arXiv",
      "parent": "gaia",
      "paperUrl": "https://arxiv.org/abs/2602.11964",
      "projectUrl": "",
      "category": "frontier_2026",
      "motivation": "动态异步环境评测Agent鲁棒性",
      "summary": "Gaia2 提出了 ARE（Agent Runtime Environment）研究平台和 Gaia2 基准，通过异步动态模拟环境、7 大能力维度（Execution、Search、Ambiguity、Adaptability、Time、Noise、Agent2Agent）和基于状态变更的验证器，系统评估前沿 LLM Agent 在真实场景中的鲁棒性与协作能力，揭示了当前最强模型（GPT-5 达 42.1% pass@1）仍远未解决的 Agent 挑战。",
      "keyPoints": [
        "<strong>ARE 平台</strong>：提出 5 大核心抽象——Apps（有状态 API）、Environments（应用集合+时间管理）、Events（全量日志化的依赖图）、Notifications（可配置的可观测层）、Scenarios（初始状态+事件 DAG+验证方法），支持异步时间推进",
        "<strong>Mobile 环境</strong>：实例化 12 个消费级应用（Messages、Chats、Emails、Calendar、Contacts、Shopping、Cabs、Files 等），101 个工具，每个 Universe 包含 400K–800K tokens 的结构化/非结构化内容",
        "<strong>7 大能力维度</strong>：5 个核心能力（Execution、Search、Ambiguity、Adaptability、Time）+ 2 个环境增强（Noise 注入工具异常/垃圾事件、Agent2Agent 多智能体协作）",
        "<strong>ARE Verifier</strong>：基于写操作状态变更的目标导向验证器，区分 read/write 操作，支持一致性、因果性、时序性、完整性四维评估，在 450 条标注轨迹上达 0.98 agreement 和 0.99 precision",
        "<strong>基准规模</strong>：Gaia2 包含 877 个场景（完整版）和 247 个场景（mini 版），每个场景运行 3 次以控制方差",
        "<strong>实证发现</strong>：GPT-5 (high) 以 42.1% pass@1 领先，Claude-4-Sonnet 34.8%；Time 和 Noise 维度最具挑战性；Agent2Agent 协作对弱模型帮助更大，异构团队（强主+弱执行）可有效平衡计算-质量权衡",
        "<strong>兼容性验证</strong>：ARE 可忠实复现 τ-bench、τ²-bench、GAIA、BFCL-v3、VendingBench 等现有基准"
      ],
      "detail": "<h5>核心架构图</h5>\n<p><img alt=\"Gaia2 ARE 框架总览\" src=\"https://arxiv.org/html/2503.20776v2/x2.png\" />\n<em>图：ARE 平台架构。左侧为 Environment（包含多个 Apps、Time Manager 和 Rules），中间为 Events 依赖图和 Notifications 层，右侧为 Agent 与 User Interface 的交互。Scenarios 定义初始状态、事件 DAG 和验证方法。</em></p>\n<p><img alt=\"Gaia2 能力维度与评估结果\" src=\"https://arxiv.org/html/2503.20776v2/x5.png\" />\n<em>图：各模型在 Gaia2 七大能力维度上的雷达图表现。GPT-5 (high) 在多数维度领先，但 Time 维度仅 Gemini-2.5-Pro 和 Claude-4-Sonnet 有显著得分。</em></p>\n<h5>算法/系统伪代码</h5>\n<pre><code class=\"language-python\"># ARE 场景执行与验证流程伪代码\nclass AREScenario:\n    def __init__(self, universe, event_dag, oracle_writes):\n        self.env = MobileEnvironment(universe)  # 12 apps, 101 tools\n        self.event_dag = event_dag              # 事件依赖图 (DAG)\n        self.oracle_writes = oracle_writes      # 预期写操作序列\n        self.time_manager = TimeManager()       # 异步时间管理\n\n    def run(self, agent, max_steps=200):\n        self.env.initialize()                   # 加载 universe 状态\n        self.event_dag.schedule_events()        # 按 DAG 调度事件\n\n        for step in range(max_steps):\n            # 1. 环境异步推进：模型生成消耗模拟时间\n            elapsed = agent.generation_time\n            self.time_manager.advance(elapsed)\n            triggered_events = self.event_dag.check_triggers(self.time_manager.now)\n\n            # 2. 通知层：根据策略推送事件到 Agent 上下文\n            notifications = self.notification_policy.filter(triggered_events)\n            agent.context.append(notifications)\n\n            # 3. Agent 执行 ReAct 循环\n            action = agent.reason_and_act(self.env.available_tools)\n            result = self.env.execute(action)   # read 或 write 操作\n\n            # 4. 在线验证（可选）\n            if self.verifier.check_online(action, result):\n                break  # 验证完成\n\n        return self.verifier.evaluate(self.env.write_log, self.oracle_writes)\n\nclass AREVerifier:\n    def evaluate(self, actual_writes, oracle_writes):\n        scores = {}\n        # (i) 一致性：工具名/参数精确匹配 + LLM rubric 灵活匹配\n        scores['consistency'] = self.check_consistency(actual_writes, oracle_writes)\n        # (ii) 因果性：写操作必须遵循依赖 DAG 顺序\n        scores['causality'] = self.check_dag_order(actual_writes, oracle_writes)\n        # (iii) 时序性：操作在容忍窗口内完成\n        scores['timing'] = self.check_timing_windows(actual_writes, oracle_writes)\n        # (iv) 完整性：所有 oracle 写操作均被匹配\n        scores['completeness'] = self.check_completeness(actual_writes, oracle_writes)\n        return all(scores.values())\n</code></pre>\n<h5>方法深入解读</h5>\n<p><strong>动机与背景：为什么需要 Gaia2？</strong></p>\n<p>现有 Agent 基准（如 GAIA、AppWorld、τ-bench）存在三个根本局限：(1) <strong>静态环境</strong>——任务在固定快照上执行，无法评估 Agent 对动态事件的响应能力；(2) <strong>同步执行</strong>——Agent 的推理时间不影响环境状态，无法测试时间感知能力；(3) <strong>能力维度单一</strong>——多数基准仅评估工具调用或信息检索，缺乏对歧义处理、适应性、噪声鲁棒性和多 Agent 协作的系统评估。Gaia2 通过 ARE 平台的异步架构和 7 大能力维度，填补了这些空白。</p>\n<div class=\"key-point\">💡 关键：ARE 的异步时间机制是核心创新——模型生成直接消耗模拟时间，如果 Agent 响应慢，环境时钟仍在推进，外部事件可能在推理过程中发生。这使得\"时间感知\"和\"响应性\"成为可评估的维度。</div>\n<p><strong>ARE 五大抽象的设计逻辑</strong></p>\n<p>ARE 的设计围绕\"解耦 Agent 与环境\"展开：</p>\n<ol>\n<li>\n<p><strong>Apps</strong>：有状态 API，每个 App 暴露的工具被类型化为 read 或 write。这一区分至关重要——验证器只检查 write 操作（状态变更），Agent 可以自由执行任意数量的 read 操作进行探索，不会被惩罚。这避免了\"过度约束探索策略\"的问题。</p>\n</li>\n<li>\n<p><strong>Events 与依赖图</strong>：所有发生的事情（工具调用、状态变更、定时更新）都被建模为 Events，组织为 DAG。事件可以按绝对时间戳调度，也可以相对于其他事件调度。这使得复杂的多步骤场景（如\"收到邮件后 30 分钟提醒用户\"）可以自然表达。</p>\n</li>\n<li>\n<p><strong>Notifications</strong>：可配置的可观测层，策略决定哪些事件被推送到 Agent 上下文。这使得研究者可以控制 Agent 的信息获取方式——从完全可观测到部分可观测——从而研究主动性和反应性行为。</p>\n</li>\n</ol>\n<div class=\"kb-math kb-math-display\">\\text{Notification Policy: } \\mathcal{N}(e) = \\begin{cases} \\text{push to context} &amp; \\text{if } \\text{priority}(e) \\geq \\theta \\\\ \\text{filter} &amp; \\text{otherwise} \\end{cases}</div>\n<p><strong>七大能力维度的设计哲学</strong></p>\n<p>论文将能力分为 5 个核心维度和 2 个环境增强：</p>\n<ul>\n<li><strong>Execution</strong>（执行）：基础工具调用和多步骤操作链，如\"创建日历事件并发送邀请\"</li>\n<li><strong>Search</strong>（搜索）：跨应用信息检索和聚合，如\"找出所有与 Alice 的未读消息中提到的日期\"</li>\n<li><strong>Ambiguity</strong>（歧义）：用户请求不完整或模糊时，Agent 需要主动澄清而非猜测执行</li>\n<li><strong>Adaptability</strong>（适应性）：环境在任务执行过程中发生变化（如联系人更新、日程冲突），Agent 需要动态调整计划</li>\n<li><strong>Time</strong>（时间）：需要在特定时间点执行操作或响应定时事件，直接依赖 ARE 的异步时间机制</li>\n</ul>\n<div class=\"warn-box\">⚠️ 注意：论文明确指出这些维度不是严格正交的——任何自然任务都具有内在的组合性（如 Time 任务通常也需要 Search 和 Execution）。作者有意避免引入人工的\"组合\"分割，因为早期实验表明强行组合 3+ 能力会产生不自然的任务。</div>\n<p>环境增强维度不需要新的标注：\n- <strong>Noise</strong>：注入工具异常（随机执行失败、签名变更）和无关环境事件（垃圾邮件），测试鲁棒性\n- <strong>Agent2Agent</strong>：将部分 App 替换为\"App-Agent\"，主 Agent 失去对这些 App 工具的直接访问，必须通过消息传递与 App-Agent 协调完成任务</p>\n<p><strong>验证器的四维评估机制</strong></p>\n<p>ARE Verifier 是论文的重要技术贡献。与传统的最终答案匹配或 LLM 裁判不同，它是<strong>目标导向</strong>而非<strong>路径最优</strong>的：</p>\n<div class=\"kb-math kb-math-display\">\\text{Score} = \\mathbb{1}[\\text{Consistency} \\wedge \\text{Causality} \\wedge \\text{Timing} \\wedge \\text{Completeness}]</div>\n<ul>\n<li><strong>一致性</strong>：刚性字段（ID）用精确匹配，灵活字段（文本内容）用 LLM rubric，并加入反作弊检查</li>\n<li><strong>因果性</strong>：写操作必须尊重依赖 DAG（父操作先于子操作）</li>\n<li><strong>时序性</strong>：通过容忍窗口强制执行</li>\n<li><strong>完整性</strong>：所有 oracle 写操作必须被匹配</li>\n</ul>\n<p>在 450 条人工标注轨迹上，ARE Verifier 达到 0.98 agreement 和 0.99 precision，远超纯 LLM 裁判（0.72 agreement、0.53 precision）。</p>\n<p><strong>核心实验发现</strong></p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>模型</th>\n<th>Overall</th>\n<th>Execution</th>\n<th>Search</th>\n<th>Ambiguity</th>\n<th>Adaptability</th>\n<th>Time</th>\n<th>Noise</th>\n<th>A2A</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>GPT-5 (high)</td>\n<td><strong>42.1</strong></td>\n<td>65.4</td>\n<td>72.7</td>\n<td>40.8</td>\n<td>43.1</td>\n<td>6.5</td>\n<td><strong>35.4</strong></td>\n<td>30.8</td>\n</tr>\n<tr>\n<td>Claude-4-Sonnet Thinking</td>\n<td>37.8</td>\n<td>62.1</td>\n<td>60.6</td>\n<td>27.3</td>\n<td>42.1</td>\n<td>8.5</td>\n<td>31.2</td>\n<td>32.5</td>\n</tr>\n<tr>\n<td>Claude-4-Sonnet</td>\n<td>34.8</td>\n<td>57.9</td>\n<td>59.8</td>\n<td>24.2</td>\n<td>38.1</td>\n<td>8.1</td>\n<td>27.7</td>\n<td>27.9</td>\n</tr>\n<tr>\n<td>Gemini-2.5-Pro</td>\n<td>25.8</td>\n<td>39.2</td>\n<td>57.7</td>\n<td>18.1</td>\n<td>17.5</td>\n<td>7.3</td>\n<td>20.4</td>\n<td>20.4</td>\n</tr>\n<tr>\n<td>Kimi-K2</td>\n<td>20.1</td>\n<td>34.2</td>\n<td>36.0</td>\n<td>8.3</td>\n<td>24.0</td>\n<td>0.8</td>\n<td>18.8</td>\n<td>18.3</td>\n</tr>\n</tbody>\n</table></div>\n<p>关键发现：\n1. <strong>Execution 和 Search 最容易</strong>，与现有基准饱和趋势一致\n2. <strong>Time 维度最具区分度</strong>：仅 Gemini-2.5-Pro 和 Claude-4-Sonnet 有显著得分，反映其效率-延迟优势\n3. <strong>Agent2Agent 对弱模型帮助更大</strong>：Llama 4 Maverick 在 A2A 设置下 pass@k 随协作比例提升，但 Claude-4-Sonnet 无显著改善\n4. <strong>异构团队有效</strong>：Claude 主 Agent + Llama App-Agent（18.3%）优于全 Llama 团队（8.5%），强执行者（Claude App-Agent）可提升弱主 Agent 的表现（16.2%）</p>\n<div class=\"key-point\">💡 关键：Agent2Agent 的协作可类比为强化学习中的 Options 框架（Sutton et al., 1999）——主 Agent 向 App-Agent 发出的子目标相当于时间扩展动作。只有当分解收益超过协调成本时，多 Agent 协作才有效。</div>",
      "quiz": {
        "q": "ARE Verifier 在评估 Agent 轨迹时，以下哪种操作会被计入目标完成度？",
        "options": [
          "Agent 执行的所有工具调用（包括 read 和 write）",
          "仅 Agent 执行的 write 操作（状态变更）",
          "Agent 的最终文本回答",
          "Agent 执行的 read 操作数量"
        ],
        "answer": 1,
        "explain": "ARE Verifier 区分 read 和 write 操作，仅检查 write 操作（状态变更）是否匹配 oracle 序列，Agent 可自由执行任意 read 操作进行探索而不受惩罚。"
      }
    },
    {
      "id": "agentic_reasoning",
      "num": 31,
      "name": "Agentic Reasoning",
      "fullName": "智能体推理 (Agentic Reasoning)",
      "year": "2026",
      "org": "arXiv",
      "parent": "react",
      "paperUrl": "https://arxiv.org/abs/2601.12538",
      "projectUrl": "",
      "category": "frontier_2026",
      "motivation": "感知规划验证统一组织原则",
      "summary": "Agentic Reasoning 的核心目标是：感知规划验证统一组织原则。",
      "keyPoints": [
        "核心动机：感知规划验证统一组织原则",
        "演化来源：继承或改进自 react",
        "代表机构：arXiv"
      ],
      "detail": "<p>感知规划验证统一组织原则</p>"
    },
    {
      "id": "embocoach_bench",
      "num": 32,
      "name": "EmboCoach-Bench",
      "fullName": "具身教练基准 (EmboCoach-Bench)",
      "year": "2026",
      "org": "arXiv",
      "parent": "agentbench",
      "paperUrl": "https://arxiv.org/abs/2601.21570",
      "projectUrl": "",
      "category": "frontier_2026",
      "motivation": "首个具身机器人开发Agent基准",
      "summary": "EmboCoach-Bench 的核心目标是：首个具身机器人开发Agent基准。",
      "keyPoints": [
        "核心动机：首个具身机器人开发Agent基准",
        "演化来源：继承或改进自 agentbench",
        "代表机构：arXiv"
      ],
      "detail": "<p>首个具身机器人开发Agent基准</p>"
    },
    {
      "id": "causal_cot",
      "num": 33,
      "name": "Causal CoT",
      "fullName": "因果思维链 (Causal CoT)",
      "year": "2026",
      "org": "NeurIPS",
      "parent": "cot",
      "paperUrl": "https://proceedings.neurips.cc/paper_files/paper/2025/hash/b7870bd43b2d133a1ed95582ae5d82a4-Abstract-Conference.html",
      "projectUrl": "",
      "category": "frontier_2026",
      "motivation": "因果充分性与必要性改进推理",
      "summary": "Causal CoT 将因果推断中的充分必要性概率（PNS）引入思维链推理，通过双层优化算法（链级充分性筛选 + 节点级必要性剪枝）自动移除冗余推理步骤，在大幅减少 token 消耗的同时保持甚至提升推理准确率。",
      "keyPoints": [
        "将 CoT 推理形式化为结构因果模型（SCM），每个推理步骤作为因果图中的节点",
        "定义三个因果度量：充分性概率 PS（推理链能否导出正确答案）、必要性概率 PN（移除某步骤是否导致答案错误）、充分必要性概率 PNS（综合衡量）",
        "提出双层优化算法（Algorithm 1）：外层通过 PS 筛选充分的推理链，内层通过 PN 逐步剪枝非必要步骤",
        "PNS 估计通过 rollout 机制实现，支持三种策略：Direct（直接续写）、Prompt-Based（提示引导）、External（外部强模型）",
        "设定阈值 <span class=\"kb-math kb-math-inline\">\\alpha</span> 对 PNS 进行剪枝决策，低于阈值的步骤被移除",
        "优化后的 CoT 可通过 ICL（上下文学习）和 SFT（监督微调）两种方式增强 LLM 推理能力",
        "在 GSM-8k、MATH-500、AIME 2025、CommonsenseQA 四个基准上验证，覆盖 Qwen、DeepSeek、Llama 等多个模型家族"
      ],
      "detail": "<p><img alt=\"Causal CoT 框架总览\" src=\"../assets/causal_cot_p1_img6.jpeg\" />\n<em>图：Causal CoT 框架示意。左侧展示 CoT 推理的结构因果模型（SCM），右侧展示基于 PNS 的双层优化流程——先通过 PS 筛选充分推理链，再通过 PN 逐步剪枝冗余节点。</em></p>\n<p><strong>算法伪代码（Algorithm 1: PNS-based CoT Optimization）</strong></p>\n<pre><code class=\"language-python\"># 输入: 问题 q, 候选推理链集合 {S^(1),...,S^(m)}, rollout 次数 k, 阈值 α\n# 输出: 优化后的推理链 S*\n\n# === 外层: 链级充分性筛选 (PS) ===\nfor each candidate chain S^(i) in {S^(1),...,S^(m)}:\n    # 计算 PS: 该链能否导出正确答案\n    PS(S^(i)) = P(A_{do(S^(i))} = y | A ≠ y)\n    # 通过 k 次 rollout 估计 PS\n    ps_score = mean([verify(rollout(q, S^(i))) for _ in range(k)])\n\n# 选择 PS 最高的链\nS* = argmax PS(S^(i))\n\n# === 内层: 节点级必要性剪枝 (PN) ===\nfor each step s_t in S*:\n    # 计算 PN: 移除该步骤后答案是否改变\n    # 构造干预链 S*\\{s_t}\n    pn_scores = []\n    for j in range(k):\n        S_intervened = remove_step(S*, s_t)\n        result = rollout(q, S_intervened)\n        pn_scores.append(1 - verify(result))\n\n    PN(s_t) = mean(pn_scores)\n\n    # PNS 估计 (Eq.5)\n    PNS(s_t) = 1 - (1/k) * sum(verify(rollout(q, S*\\{s_t})))\n\n    if PNS(s_t) &lt; α:  # 低于阈值，该步骤非必要\n        S* = S* \\ {s_t}  # 剪枝\n\nreturn S*\n</code></pre>\n<p><strong>动机与背景</strong></p>\n<p>当前 LLM 的思维链（CoT）推理面临两个根本性挑战：</p>\n<ol>\n<li><strong>充分性问题</strong>：生成的推理步骤是否完整覆盖了得出最终结论所需的全部逻辑？缺失关键步骤会导致推理不完整。</li>\n<li><strong>必要性问题</strong>：推理链中是否存在对最终答案无实质贡献的冗余步骤？特别是在 DeepSeek-R1 等推理模型中，常出现大量自我验证、重复计算等冗余内容，显著增加推理开销。</li>\n</ol>\n<p>传统方法要么通过启发式规则压缩推理（如 Chain-of-Draft 仅保留关键短语），要么通过简单的长度约束，但这些方法缺乏理论基础，无法区分哪些步骤真正对答案有因果贡献。</p>\n<div class=\"key-point\">💡 <strong>关键洞察</strong>：本文将\"一个推理步骤是否重要\"转化为因果推断问题——通过反事实干预（移除或替换步骤）观察答案是否改变，从而量化每个步骤的因果贡献。</div>\n<p><strong>核心机制：因果充分必要性（PNS）框架</strong></p>\n<p>论文将 CoT 推理形式化为结构因果模型（SCM）<span class=\"kb-math kb-math-inline\">\\mathcal{M} = \\langle U, V, F \\rangle</span>，其中：\n- <span class=\"kb-math kb-math-inline\">U</span>：外生变量（问题输入 <span class=\"kb-math kb-math-inline\">q</span>）\n- <span class=\"kb-math kb-math-inline\">V</span>：内生变量（推理步骤 <span class=\"kb-math kb-math-inline\">s_1, s_2, \\ldots, s_n</span> 和最终答案 <span class=\"kb-math kb-math-inline\">A</span>）\n- <span class=\"kb-math kb-math-inline\">F</span>：结构方程（LLM 的生成过程）</p>\n<p>在此框架下定义三个核心因果度量：</p>\n<p><strong>定义 1 — 充分性概率 PS（Probability of Sufficiency）</strong>：</p>\n<div class=\"kb-math kb-math-display\">PS(S) = P(A_{do(S)} = y \\mid A \\neq y)</div>\n<p>衡量推理链 <span class=\"kb-math kb-math-inline\">S</span> 是否足以将错误答案纠正为正确答案。直觉上，如果在\"原本答案错误\"的条件下，施加推理链 <span class=\"kb-math kb-math-inline\">S</span> 后答案变为正确，则该链具有充分性。</p>\n<p><strong>定义 2 — 必要性概率 PN（Probability of Necessity）</strong>：</p>\n<div class=\"kb-math kb-math-display\">PN(s_t) = P(A_{do(\\bar{s}_t)} \\neq y \\mid A = y)</div>\n<p>衡量单个步骤 <span class=\"kb-math kb-math-inline\">s_t</span> 对正确答案的必要程度。如果移除步骤 <span class=\"kb-math kb-math-inline\">s_t</span>（用替代内容 <span class=\"kb-math kb-math-inline\">\\bar{s}_t</span> 干预）后答案不再正确，则该步骤是必要的。</p>\n<p><strong>定义 3 — 充分必要性概率 PNS（Probability of Necessity and Sufficiency）</strong>：</p>\n<div class=\"kb-math kb-math-display\">PNS(S) = P(A_S = y, A_{S&#x27;} \\neq y)</div>\n<p>联合衡量推理链既充分又必要的概率。PNS 同时满足：使用该链时答案正确（充分），不使用时答案错误（必要）。</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：PNS 不是 PS 和 PN 的简单乘积。根据因果推断理论，PNS 满足不等式 <span class=\"kb-math kb-math-inline\">\\max(0, PS + PN - 1) \\leq PNS \\leq \\min(PS, PN)</span>，需要通过联合干预来估计。</div>\n<p><strong>PNS 的实际估计方法</strong></p>\n<p>由于精确计算 PNS 需要遍历所有可能的干预，论文提出基于 rollout 的近似估计（Eq. 5）：</p>\n<div class=\"kb-math kb-math-display\">\\widehat{PNS}(S) = 1 - \\frac{1}{k} \\sum_{i=1}^{k} V(S^{(i)})</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">V(S^{(i)})</span> 是第 <span class=\"kb-math kb-math-inline\">i</span> 次 rollout 的验证结果（正确为 1，错误为 0），<span class=\"kb-math kb-math-inline\">k</span> 为 rollout 次数。</p>\n<p>三种 rollout 策略提供不同的干预方式：\n- <strong>Direct</strong>：直接让 LLM 从干预点续写，计算成本最低\n- <strong>Prompt-Based</strong>：通过提示词引导 LLM 基于剩余步骤重新推理\n- <strong>External</strong>：使用外部更强模型（如 QwQ-32B 或 DeepSeek-R1）进行 rollout，效果最好但成本更高</p>\n<p><strong>双层优化流程</strong></p>\n<p>Algorithm 1 的核心设计是将优化分为两层：</p>\n<ol>\n<li>\n<p><strong>外层（链级）</strong>：对多条候选推理链计算 PS，选择充分性最高的链作为基础。这确保了起点是一条\"能导出正确答案\"的推理链。</p>\n</li>\n<li>\n<p><strong>内层（节点级）</strong>：对选中链的每个步骤计算 PN/PNS，将 PNS 低于阈值 <span class=\"kb-math kb-math-inline\">\\alpha</span> 的步骤剪枝。这确保了保留的每个步骤都对最终答案有不可替代的因果贡献。</p>\n</li>\n</ol>\n<p><strong>与传统方法的区别</strong></p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>核心思路</th>\n<th>局限性</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Chain-of-Draft (CoD)</td>\n<td>仅保留关键短语</td>\n<td>过度压缩导致复杂任务精度大幅下降（MATH-500 仅 55.6%）</td>\n</tr>\n<tr>\n<td>Reduction</td>\n<td>快捷结论式推理</td>\n<td>跳过中间逻辑，难以处理多步推理</td>\n</tr>\n<tr>\n<td>Fast-Solve</td>\n<td>简洁但完整的推理</td>\n<td>缺乏理论指导，压缩程度有限</td>\n</tr>\n<tr>\n<td><strong>Causal CoT（本文）</strong></td>\n<td>基于因果 PNS 量化每步贡献</td>\n<td>有理论保证，精准剪枝冗余步骤，保持推理完整性</td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>实验验证</strong></p>\n<p>在 GSM-8k、MATH-500、AIME 2025、CommonsenseQA 四个基准上的实验表明：</p>\n<ul>\n<li><strong>RQ1（PNS 优化效果）</strong>：PNS 优化后，token 长度平均减少 50-70%，步骤数减少 40-60%，同时准确率保持或提升。例如 DeepSeek-R1 在 CommonsenseQA 上从 83.0% 提升至 85.3%，token 从 191 减至 69.8。</li>\n<li><strong>RQ2-ICL</strong>：使用优化后 CoT 作为 few-shot 示例，Ours-ICL 在 DeepSeek-V3 上将 GSM-8k 准确率从 97.6% 提升至 99.9%，同时 token 减少 67%。</li>\n<li><strong>RQ2-SFT</strong>：在仅 1,229 条 PNS 筛选的 CoT 数据上微调小模型，DeepSeek-R1-Distill-Qwen-1.5B 在 CommonsenseQA 上从 37.6% 提升至 47.2%，推理步骤减半。</li>\n<li><strong>人工评估</strong>：50 条优化后 CoT 中，84% 被判定为既充分又必要（S&amp;N），仅 6% 不充分。</li>\n</ul>",
      "quiz": {
        "q": "在 Causal CoT 框架中，PNS（充分必要性概率）的核心作用是什么？",
        "options": [
          "衡量推理链的总长度是否合理",
          "量化每个推理步骤对最终答案的因果贡献，指导冗余步骤剪枝",
          "评估 LLM 生成推理链的速度",
          "计算不同模型之间的推理能力差异"
        ],
        "answer": 1,
        "explain": "PNS 通过反事实干预量化每个步骤的因果贡献——如果移除该步骤后答案改变（必要）且保留时答案正确（充分），则该步骤具有高 PNS 值，应当保留；否则可被剪枝。"
      }
    },
    {
      "id": "reasonflux_prm",
      "num": 34,
      "name": "ReasonFlux-PRM",
      "fullName": "推理流过程奖励 (ReasonFlux-PRM)",
      "year": "2026",
      "org": "NeurIPS",
      "parent": "retroformer",
      "paperUrl": "https://proceedings.neurips.cc/paper_files/paper/2025/hash/26618fb384d3873b8ef6ab292a69095b-Abstract-Conference.html",
      "projectUrl": "",
      "category": "frontier_2026",
      "motivation": "轨迹感知长链推理过程奖励模型",
      "summary": "ReasonFlux-PRM 的核心目标是：轨迹感知长链推理过程奖励模型。",
      "keyPoints": [
        "核心动机：轨迹感知长链推理过程奖励模型",
        "演化来源：继承或改进自 retroformer",
        "代表机构：NeurIPS"
      ],
      "detail": "<p>轨迹感知长链推理过程奖励模型</p>"
    },
    {
      "id": "solagent",
      "num": 35,
      "name": "SolAgent",
      "fullName": "Solidity代码智能体 (SolAgent)",
      "year": "2026",
      "org": "arXiv",
      "parent": "chatdev",
      "paperUrl": "https://arxiv.org/abs/2601.23009",
      "projectUrl": "",
      "category": "frontier_2026",
      "motivation": "多Agent架构生成智能合约代码",
      "summary": "SolAgent 提出了一种工具增强的多 Agent 框架，通过 **Coding Agent + Refining Agent** 的双角色协作与 **Forge 编译器（正确性）+ Slither 静态分析器（安全性）** 的双循环迭代精炼机制，自动生成高质量 Solidity 智能合约代码，在自建基准 SolEval+ 上实现 64.39% 的 Pass@1，并将安全漏洞相比人工基线降低 39.77%。",
      "keyPoints": [
        "<strong>双 Agent 架构</strong>：Coding Agent 负责初始代码生成，Refining Agent 基于工具反馈迭代修复，两者通过共享消息历史协作",
        "<strong>双循环精炼机制</strong>：内循环使用 Forge 编译器检测编译错误与测试失败（功能正确性），外循环使用 Slither 静态分析器检测安全漏洞",
        "<strong>文件系统工具集成</strong>：Agent 可通过 <code>list_directory</code>、<code>read_file</code> 等工具探索项目结构、读取依赖文件，实现上下文感知的代码生成",
        "<strong>动态停止策略</strong>：三种终止条件——成功（编译+测试全通过）、停滞检测（连续 <span class=\"kb-math kb-math-inline\">N=2</span> 轮无改进）、振荡检测（代码相似度 <span class=\"kb-math kb-math-inline\">\\tau=0.9</span>），最大 50 轮",
        "<strong>工作流蒸馏（Workflow Distillation）</strong>：将高质量 Agent 交互轨迹蒸馏到 Qwen3-8B，使用全参数微调（lr=2e-5, 3 epochs, 8×Ascend 910B2）",
        "<strong>双源训练数据</strong>：full-context 轨迹（tracker）+ compressed-context 轨迹（mix），配合前向/后向截断策略",
        "<strong>SolEval+ 基准</strong>：81 个 Solidity 文件、1188 个测试用例，源自真实开源项目，覆盖 DeFi、NFT、治理等场景",
        "<strong>基线对比</strong>：超越 GPT-5.1、Claude-Sonnet-4.5、Copilot、DeepCode、MetaGPT、Qwen-Agent 等 SOTA 方法"
      ],
      "detail": "<h5>核心框架图</h5>\n<p><img alt=\"SolAgent 整体框架\" src=\"https://ar5iv.labs.arxiv.org/html/2601.23009/assets/x1.png\" />\n<em>图 1：SolAgent 框架总览。左侧为 Coding Agent 生成初始代码，右侧为 Refining Agent 通过 Forge（内循环）和 Slither（外循环）迭代精炼，底部展示文件系统工具的上下文支持。</em></p>\n<p><img alt=\"双循环精炼流程\" src=\"https://ar5iv.labs.arxiv.org/html/2601.23009/assets/x2.png\" />\n<em>图 2：双循环精炼机制的详细流程，展示内循环（编译+测试）与外循环（安全分析）的交互关系。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># SolAgent 双循环精炼核心流程\ndef solagent_generate(task_spec, project_context):\n    # Phase 1: Coding Agent 生成初始代码\n    code = coding_agent.generate(task_spec, project_context)\n\n    # Phase 2: Refining Agent 迭代精炼\n    for round in range(MAX_ROUNDS):  # MAX_ROUNDS = 50\n        # 内循环: Forge 编译器反馈\n        compile_result = forge.compile(code)\n        if not compile_result.success:\n            code = refining_agent.fix(code, compile_result.errors)\n            continue\n\n        test_result = forge.test(code)\n        if not test_result.all_passed:\n            code = refining_agent.fix(code, test_result.failures)\n            # 停滞检测: 连续 N=2 轮无改进则跳出内循环\n            if stagnation_detected(N=2):\n                break\n            # 振荡检测: 代码相似度 &gt; τ=0.9 则终止\n            if oscillation_detected(tau=0.9):\n                break\n            continue\n\n        # 外循环: Slither 安全分析\n        vulns = slither.analyze(code)\n        if vulns:\n            code = refining_agent.fix_security(code, vulns)\n            continue\n\n        return code  # 成功: 编译通过 + 测试通过 + 无漏洞\n\n    return best_code  # 返回历史最优版本\n</code></pre>\n<h5>动机与背景</h5>\n<p>智能合约是区块链生态的核心基础设施，一旦部署便不可更改，因此对代码的<strong>功能正确性</strong>和<strong>安全性</strong>有极高要求。2024 年因智能合约漏洞导致的经济损失超过 23 亿美元。然而，现有 LLM 在 Solidity 代码生成上面临三大挑战：</p>\n<ol>\n<li><strong>编译失败率高</strong>：vanilla LLM 的编译通过率仅 30%-45%，远低于实际可用标准</li>\n<li><strong>安全漏洞频发</strong>：单次生成无法保证代码免受重入攻击、整数溢出等常见漏洞</li>\n<li><strong>上下文缺失</strong>：智能合约通常依赖复杂的项目结构（接口、库、继承关系），单文件生成缺乏依赖信息</li>\n</ol>\n<p>现有的 Agent 框架（如 MetaGPT、Qwen-Agent）虽然引入了多步推理，但缺乏针对智能合约领域的专用工具链集成，无法有效利用编译器和安全分析器的反馈信号。</p>\n<h5>核心机制详解</h5>\n<p><strong>1. 双 Agent 角色分工</strong></p>\n<p>SolAgent 采用两个专门化的 Agent：</p>\n<ul>\n<li><strong>Coding Agent</strong>：接收任务规范（自然语言描述 + 函数签名 + 依赖信息），生成初始 Solidity 代码。该 Agent 配备文件系统工具，可主动探索项目结构以获取必要的上下文信息。</li>\n<li><strong>Refining Agent</strong>：接收 Coding Agent 的输出及工具反馈（编译错误、测试失败、安全漏洞报告），迭代修复代码。两个 Agent 共享消息历史，确保修复过程的连贯性。</li>\n</ul>\n<div class=\"key-point\">💡 <strong>关键设计</strong>：与 ChatDev 等框架中 Agent 间的\"对话式\"协作不同，SolAgent 的两个 Agent 通过<strong>工具反馈信号</strong>驱动协作，形成\"生成-检测-修复\"的闭环。</div>\n<p><strong>2. 双循环精炼机制</strong></p>\n<p>这是 SolAgent 的核心创新，将迭代精炼分为两个嵌套循环：</p>\n<ul>\n<li>\n<p><strong>内循环（Forge Compiler Loop）</strong>：使用 Foundry 的 Forge 工具链进行编译和测试。每轮将编译错误信息或测试失败的详细日志反馈给 Refining Agent。消融实验表明，移除 Forge 反馈后 Pass@1 从 64.39% 骤降至 26.18%（Claude-Sonnet-4.5），证明这是最关键的组件。</p>\n</li>\n<li>\n<p><strong>外循环（Slither Security Loop）</strong>：当内循环达到功能正确性后，使用 Slither 静态分析器扫描安全漏洞。检测到的漏洞（如重入攻击、未检查的外部调用等）被反馈给 Refining Agent 进行安全加固。在 Min-Vuln 轮次分析中，Slither 反馈使漏洞减少 23%-35%。</p>\n</li>\n</ul>\n<p><strong>3. 动态停止策略</strong></p>\n<p>为避免无效的反复修改，SolAgent 设计了三种智能终止条件：</p>\n<div class=\"kb-math kb-math-display\">\\text{Stop} = \\begin{cases} \\text{Success} &amp; \\text{if compile} \\land \\text{all\\_tests\\_pass} \\\\ \\text{Stagnation} &amp; \\text{if } \\Delta\\text{pass\\_rate} = 0 \\text{ for } N=2 \\text{ consecutive rounds} \\\\ \\text{Oscillation} &amp; \\text{if } \\text{sim}(code_t, code_{t-k}) &gt; \\tau = 0.9 \\end{cases}</div>\n<p>其中代码相似度使用字符级别的比较。最大迭代轮数设为 50 轮，实际平均约 5-6 轮即可收敛。</p>\n<p><strong>4. 文件系统工具</strong></p>\n<p>Agent 被赋予以下工具能力：\n- <code>list_directory(path)</code>：列出项目目录结构\n- <code>read_file(path)</code>：读取依赖文件内容（接口定义、基类实现等）</p>\n<p>这使 Agent 能够自主发现并解析项目依赖关系，而非依赖人工提供的上下文。消融实验显示，移除工具后 GPT-5.1 的 Pass@1 从 54.71% 降至 31.73%。</p>\n<p><strong>5. 工作流蒸馏</strong></p>\n<p>SolAgent 提出将成功的 Agent 交互轨迹蒸馏到小模型中：</p>\n<ul>\n<li><strong>数据构造</strong>：从 SolAgent 运行轨迹中提取两类数据——(1) tracker 数据保留完整上下文（包含工具调用和反馈），(2) mix 数据压缩上下文（仅保留关键决策点）</li>\n<li><strong>截断策略</strong>：v1 保留前 4K tokens（学习推理过程），v2 保留后 4K tokens（学习最终代码输出）</li>\n<li><strong>训练配置</strong>：Qwen3-8B 全参数微调，学习率 2e-5，3 个 epoch，8×Ascend 910B2 NPU</li>\n<li><strong>部署</strong>：使用 vLLM 部署，启用 YaRN RoPE scaling 支持 128K 上下文窗口</li>\n</ul>\n<p>蒸馏后的 8B 模型（SolAgent-tracker-v2）编译率从 5.88% 提升至 17.65%，Pass@1 从 0.33% 提升至 1.31%，达到了 4 倍大小的 Qwen3-32B 的同等水平。</p>\n<h5>与传统方法的区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th>Vanilla LLM</th>\n<th>通用 Agent (MetaGPT等)</th>\n<th>SolAgent</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>编译率</td>\n<td>30%-45%</td>\n<td>28%-46%</td>\n<td><strong>90%-95%</strong></td>\n</tr>\n<tr>\n<td>安全检测</td>\n<td>无</td>\n<td>无</td>\n<td>Slither 集成</td>\n</tr>\n<tr>\n<td>依赖解析</td>\n<td>无</td>\n<td>有限</td>\n<td>文件系统工具</td>\n</tr>\n<tr>\n<td>迭代精炼</td>\n<td>无</td>\n<td>通用反馈</td>\n<td><strong>领域专用双循环</strong></td>\n</tr>\n<tr>\n<td>停止策略</td>\n<td>单次</td>\n<td>固定轮数</td>\n<td><strong>动态停止</strong></td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：SolAgent 的 gas 效率在部分场景下略逊于基线（均值比率 1.0-2.4），这是因为双循环精炼优先保证正确性和安全性，而非 gas 优化。但修剪均值（Trim5%）接近 1.0，表明大多数情况下 gas 效率合理。</div>\n<h5>实验结果摘要</h5>\n<p><strong>功能正确性（RQ-1）</strong>：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>模型</th>\n<th>编译率</th>\n<th>Pass@1</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Vanilla LLM</td>\n<td>Claude-Sonnet-4.5</td>\n<td>39.51%</td>\n<td>25.59%</td>\n</tr>\n<tr>\n<td>Qwen-Agent</td>\n<td>Claude-Sonnet-4.5</td>\n<td>45.68%</td>\n<td>28.37%</td>\n</tr>\n<tr>\n<td><strong>SolAgent</strong></td>\n<td><strong>Claude-Sonnet-4.5</strong></td>\n<td><strong>95.06%</strong></td>\n<td><strong>64.39%</strong></td>\n</tr>\n<tr>\n<td><strong>SolAgent</strong></td>\n<td><strong>GPT-5-Mini</strong></td>\n<td><strong>90.12%</strong></td>\n<td><strong>56.65%</strong></td>\n</tr>\n<tr>\n<td><strong>SolAgent</strong></td>\n<td><strong>GPT-5.1</strong></td>\n<td><strong>91.36%</strong></td>\n<td><strong>54.71%</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>安全性</strong>：SolAgent 生成的代码漏洞数相比人工基线减少 39.77%（Claude-Sonnet-4.5），相比 vanilla LLM 减少更为显著。</p>\n<p><strong>消融实验（RQ-2）</strong>：\n- 移除 Forge 反馈：Pass@1 降幅 38%+（最关键组件）\n- 移除 Slither 反馈：Min-Vuln 轮漏洞增加 23%-35%\n- 移除文件工具：Pass@1 降幅 7%-23%</p>",
      "quiz": {
        "q": "SolAgent 的双循环精炼机制中，哪个组件对功能正确性（Pass@1）的影响最大？",
        "options": [
          "Slither 静态安全分析器反馈",
          "Forge 编译器与测试反馈",
          "文件系统工具（依赖解析）",
          "动态停止策略（停滞与振荡检测）"
        ],
        "answer": 1,
        "explain": "消融实验表明，移除 Forge 反馈后 Pass@1 从 64.39% 骤降至 26.18%（降幅超 38%），是对功能正确性影响最大的单一组件。Forge 提供的编译错误和测试失败信息是迭代修复的核心驱动信号。"
      }
    }
  ],
  "categories": {
    "tool_use": {
      "label": "工具使用",
      "color": "#10B981"
    },
    "planning": {
      "label": "规划与推理",
      "color": "#3B82F6"
    },
    "multi_agent": {
      "label": "多智能体协作",
      "color": "#8B5CF6"
    },
    "benchmark": {
      "label": "Agent基准",
      "color": "#F59E0B"
    },
    "frontier_2026": {
      "label": "2026前沿",
      "color": "#EF4444"
    }
  },
  "projectUrls": {}
};
