/**
 * llm_rl-data.js — 由 pipeline/build.py 于 2026-05-18 18:51:05 自动生成。
 * 源文件：content/llm/llm_rl.md
 * ⚠️  请勿手动修改；如需更新，修改源文档后重新编译。
 */
window.PAGE_CONFIG = {
  "meta": {
    "domain": "llm",
    "topic_id": "llm_rl",
    "topic_name": "LLM强化学习",
    "page_title": "LLM强化学习算法演进",
    "page_subtitle": "2026-05-18 版",
    "page_desc": "从PPO到RLHF、DPO、GRPO再到2026年最新VAPO等算法的完整演化图谱，涵盖策略梯度、偏好优化、在线强化学习三大技术路线",
    "page_icon": "🎯",
    "hero_pills": [
      "🏷️ RLHF · Policy Optimization · Preference Learning · Reasoning RL"
    ],
    "count_pill": "{count} 个算法",
    "image_base": ""
  },
  "overview": [
    {
      "title": "一、从传统策略梯度到 LLM 强化学习",
      "body_html": "<p>LLM 强化学习的底层仍然继承自经典强化学习的三件套：<strong>策略模型、奖励信号、轨迹优化</strong>。不同之处在于，语言模型的“动作”不再是低维连续控制，而是高维离散 token 生成；“状态”也不再是外部环境观测，而是不断增长的上下文序列。因此，传统 RL 中关于策略梯度、优势函数、价值估计和信用分配的问题，在 LLM 场景里都被重新放大了。</p>\n<p>从 <code>REINFORCE → TRPO → PPO</code> 的路线，本质上是在回答同一个问题：<strong>如何在保证训练稳定的前提下，提高策略更新效率</strong>。这条路线后来成为 RLHF 的基础，因为它天然适合把“整段回答得到一个总体奖励”的场景映射成策略优化问题。</p>\n<blockquote>\n<p>参考综述：<a href=\"https://zhuanlan.zhihu.com/p/1967567827276895446\"><em>LLM中的强化学习方法：人人都能看懂的RL理论</em></a></p>\n</blockquote>"
    },
    {
      "title": "二、RLHF 为什么以 PPO 为起点",
      "body_html": "<p>在大模型对齐早期，<code>PPO</code> 之所以成为主流，不只是因为它“经典”，更因为它在工程上平衡了三件事：</p>\n<ul>\n<li><strong>稳定性</strong>：裁剪目标函数限制新旧策略偏移，避免大模型在单步更新中崩掉。</li>\n<li><strong>可控性</strong>：通过 <code>Reference Model + KL</code> 约束，使策略优化不会偏离监督微调模型太远。</li>\n<li><strong>可分工训练</strong>：<code>Policy / Value / Reward / Reference</code> 四类角色清晰，便于在 RLHF 流水线中拆分实现。</li>\n</ul>\n<p>这也解释了为什么 <code>InstructGPT</code> 之后，大量工作都围绕“保留 PPO 的稳定性，但减轻其复杂度和成本”展开。LLM 的训练代价远高于传统 RL，任何多一个模型、多一轮 rollout、多一次反向传播，都会被放大成显著的工程负担。</p>"
    },
    {
      "title": "三、领域主线：简化训练与强化对齐",
      "body_html": "<p>结合这篇综述与当前算法谱系，LLM-RL 基本围绕两条主线展开：</p>\n<ul>\n<li><strong>简化训练链路</strong>：减少 Value Model、减少在线采样成本、减少对昂贵奖励模型的依赖，使算法更适合大模型训练。</li>\n<li><strong>强化对齐效果</strong>：把传统 RL 更精细地适配到语言生成、偏好学习、推理轨迹和长回答优化中，降低 sequence-level 奖励错配带来的方差与偏差。</li>\n</ul>\n<p>在这两条主线下，领域逐渐分化出三大族系：</p>\n<ul>\n<li><strong>经典在线策略优化</strong>：<code>PPO / ReMax / GRPO / DAPO / VAPO</code></li>\n<li><strong>偏好优化</strong>：<code>DPO / IPO / KTO / ORPO / SimPO</code></li>\n<li><strong>推理与鲁棒性增强</strong>：<code>Dr.GRPO / Reinforce++ / OAPL / WDPO / MoDPO</code></li>\n</ul>\n<p>它们共享的目标不是单纯“让回答更像人类喜欢”，而是逐步把优化对象从<strong>静态偏好</strong>推进到<strong>可验证推理质量、长链决策质量与训练稳健性</strong>。</p>"
    },
    {
      "title": "四、从 RLHF 到 Reasoning RL 的演进",
      "body_html": "<p>2024 年之后，领域重心明显从“把模型训得能对齐”转向“把模型训得能稳定推理”。这也是 <code>GRPO</code> 一类方法迅速流行的原因：在数学推理、代码、可验证问答等任务里，奖励往往更接近<strong>结果可检验</strong>而不是<strong>偏好打分</strong>，于是训练目标开始从传统 RLHF 转向 reasoning RL。</p>\n<p>这带来两个直接变化：</p>\n<ul>\n<li>算法更加关注<strong>长回答内部的信用分配</strong>，不再满足于只在整段输出末尾给一个总奖励。</li>\n<li>训练更加关注<strong>低成本扩展性</strong>，因为 reasoning 场景需要更长 rollout、更高采样量和更频繁的在线更新。</li>\n</ul>\n<p>因此，今天看 LLM-RL，不能只把它理解成“PPO + 奖励模型”。它已经演进成一个横跨<strong>偏好学习、在线强化学习、推理优化、鲁棒训练</strong>的完整算法家族。</p>"
    }
  ],
  "latest_overview": [
    {
      "title": "一、范式边界正在从 RLHF 扩展到 Agentic RL",
      "body_html": "<p>最新一波综述最重要的判断是：传统 <code>RLHF / DPO</code> 更适合描述<strong>单轮文本生成的对齐问题</strong>，而越来越多真实系统面对的是<strong>多步交互、部分可观测、带工具与环境反馈的智能体问题</strong>。这意味着底层建模正在从“单步 MDP”转向“长程 POMDP”。</p>\n<p>在这个新范式里，优化对象不再只是“最终回答是否被偏好”，而是<strong>整个交互轨迹的策略质量</strong>：何时规划、何时调用工具、如何利用记忆、如何根据环境反馈自我修正。</p>\n<blockquote>\n<p>参考综述：<a href=\"https://zhuanlan.zhihu.com/p/2032098279991808634\"><em>面向LLM Agent强化学习（Agentic RL）综述</em></a></p>\n</blockquote>"
    },
    {
      "title": "二、强化学习开始直接塑造六类智能体能力",
      "body_html": "<p>这篇新综述把 Agentic RL 的核心能力归纳成六类：<strong>规划、工具使用、记忆、自我改进、推理、感知</strong>。其中最有代表性的变化有三点：</p>\n<ul>\n<li><strong>规划</strong>：RL 不再只优化回答偏好，而是优化多步任务分解、树搜索引导和长期决策鲁棒性。</li>\n<li><strong>工具使用</strong>：RL 开始决定“何时用、用什么、怎么组合、失败后如何恢复”，让工具调用从格式模仿升级为策略选择。</li>\n<li><strong>记忆与自我改进</strong>：记忆写入、检索、压缩、遗忘开始成为可学习策略；反思与自博弈也从一次性提示技巧，走向可参数化、可迭代的持续改进机制。</li>\n</ul>\n<p>这说明“最新进展”已经不只是新 loss function，而是在重新定义 LLM 强化学习的任务边界。</p>"
    },
    {
      "title": "三、PPO / DPO / GRPO 正在从算法本体变成优化壳层",
      "body_html": "<p>从工程视角看，<code>PPO / DPO / GRPO</code> 仍然是主流训练骨架，但它们扮演的角色已经在变化。过去它们更多用于优化<strong>静态文本偏好</strong>；现在它们逐渐成为统一的<strong>策略更新壳层</strong>，上面承载的是更复杂的轨迹数据、过程奖励、工具反馈与环境交互。</p>\n<p>因此，最新工作更关心的往往不是“是否使用 PPO 或 DPO”，而是：</p>\n<ul>\n<li>奖励来自<strong>最终答案、过程监督还是环境回报</strong>；</li>\n<li>rollout 是<strong>单次回答</strong>还是<strong>多步工具链 / 多轮任务轨迹</strong>；</li>\n<li>优化目标是<strong>对齐偏好</strong>还是<strong>提高规划与推理能力</strong>；</li>\n<li>训练过程中如何处理<strong>长程信用分配、环境噪声和数据稀缺</strong>。</li>\n</ul>\n<p>也正因为如此，LLM-RL 与 Agentic RL 的边界正在变得连续，而不是割裂。</p>"
    },
    {
      "title": "四、下一阶段的真正瓶颈",
      "body_html": "<p>相较于早期“能不能把 PPO 跑起来”，当前领域更现实的瓶颈已经变成：</p>\n<ul>\n<li><strong>长程信用分配</strong>：多步轨迹里，最终成功究竟该归因于哪一步决策。</li>\n<li><strong>环境与评测</strong>：很多智能体能力必须放到真实工具链、网页、代码执行或仿真环境里验证，离线 benchmark 不再足够。</li>\n<li><strong>奖励设计与安全性</strong>：长程任务更容易被 reward hacking、捷径策略和不安全探索影响。</li>\n<li><strong>训练成本</strong>：Agentic RL 的 rollout 更长、反馈更慢、状态空间更复杂，直接放大了算力与数据压力。</li>\n</ul>\n<p>因此，LLM 强化学习的“最新进展”并不是对旧算法的简单修补，而是在向<strong>真正面向智能体的强化学习系统</strong>过渡。</p>"
    }
  ],
  "graph": {
    "nodes": [
      {
        "id": "reinforce",
        "x": 50,
        "y": 100,
        "category": "foundation"
      },
      {
        "id": "trpo",
        "x": 200,
        "y": 100,
        "category": "foundation"
      },
      {
        "id": "ppo",
        "x": 350,
        "y": 100,
        "category": "foundation"
      },
      {
        "id": "instructgpt",
        "x": 500,
        "y": 250,
        "category": "rlhf"
      },
      {
        "id": "constitutional_ai",
        "x": 550,
        "y": 320,
        "category": "rlhf"
      },
      {
        "id": "rlaif",
        "x": 650,
        "y": 320,
        "category": "rlhf"
      },
      {
        "id": "dpo",
        "x": 600,
        "y": 400,
        "category": "preference"
      },
      {
        "id": "ipo",
        "x": 700,
        "y": 450,
        "category": "preference"
      },
      {
        "id": "kto",
        "x": 800,
        "y": 400,
        "category": "preference"
      },
      {
        "id": "orpo",
        "x": 850,
        "y": 450,
        "category": "preference"
      },
      {
        "id": "simpo",
        "x": 900,
        "y": 400,
        "category": "preference"
      },
      {
        "id": "remax",
        "x": 700,
        "y": 550,
        "category": "online_rl"
      },
      {
        "id": "spin",
        "x": 750,
        "y": 620,
        "category": "online_rl"
      },
      {
        "id": "grpo",
        "x": 800,
        "y": 550,
        "category": "online_rl"
      },
      {
        "id": "dapo",
        "x": 900,
        "y": 550,
        "category": "online_rl"
      },
      {
        "id": "vapo",
        "x": 950,
        "y": 700,
        "category": "frontier_2026"
      },
      {
        "id": "dr_grpo",
        "x": 1000,
        "y": 700,
        "category": "frontier_2026"
      },
      {
        "id": "reinforce_pp",
        "x": 1050,
        "y": 700,
        "category": "frontier_2026"
      },
      {
        "id": "oapl",
        "x": 1100,
        "y": 700,
        "category": "frontier_2026"
      },
      {
        "id": "wdpo",
        "x": 1050,
        "y": 770,
        "category": "frontier_2026"
      },
      {
        "id": "mod_dpo",
        "x": 1100,
        "y": 770,
        "category": "frontier_2026"
      }
    ],
    "edges": [
      {
        "from": "reinforce",
        "to": "trpo",
        "label": "信任域约束"
      },
      {
        "from": "trpo",
        "to": "ppo",
        "label": "裁剪代理目标"
      },
      {
        "from": "ppo",
        "to": "instructgpt",
        "label": "RLHF范式"
      },
      {
        "from": "ppo",
        "to": "remax",
        "label": "移除Critic"
      },
      {
        "from": "ppo",
        "to": "grpo",
        "label": "组内相对优势"
      },
      {
        "from": "instructgpt",
        "to": "constitutional_ai",
        "label": "自我修订"
      },
      {
        "from": "instructgpt",
        "to": "rlaif",
        "label": "AI反馈替代"
      },
      {
        "from": "instructgpt",
        "to": "dpo",
        "label": "移除奖励模型"
      },
      {
        "from": "instructgpt",
        "to": "spin",
        "label": "自博弈进化"
      },
      {
        "from": "dpo",
        "to": "ipo",
        "label": "正则化增强"
      },
      {
        "from": "dpo",
        "to": "kto",
        "label": "二元信号"
      },
      {
        "from": "dpo",
        "to": "orpo",
        "label": "移除参考模型"
      },
      {
        "from": "dpo",
        "to": "simpo",
        "label": "长度归一化"
      },
      {
        "from": "dpo",
        "to": "wdpo",
        "label": "分布鲁棒性"
      },
      {
        "from": "dpo",
        "to": "mod_dpo",
        "label": "模态解耦"
      },
      {
        "from": "grpo",
        "to": "dapo",
        "label": "解耦裁剪"
      },
      {
        "from": "grpo",
        "to": "vapo",
        "label": "价值预训练"
      },
      {
        "from": "grpo",
        "to": "dr_grpo",
        "label": "偏差修正"
      },
      {
        "from": "grpo",
        "to": "oapl",
        "label": "离线策略"
      },
      {
        "from": "remax",
        "to": "reinforce_pp",
        "label": "全局归一化"
      }
    ],
    "milestones": [
      "ppo",
      "dpo",
      "grpo"
    ]
  },
  "algos": [
    {
      "id": "reinforce",
      "num": 1,
      "name": "REINFORCE",
      "fullName": "策略梯度算法 (REINFORCE)",
      "year": "1992",
      "org": "Northeastern University",
      "parent": "—",
      "paperUrl": "https://link.springer.com/article/10.1007/BF00992696",
      "projectUrl": "",
      "category": "foundation",
      "motivation": "通过轨迹回报直接估计策略梯度",
      "summary": "REINFORCE 的核心目标是：通过轨迹回报直接估计策略梯度。",
      "keyPoints": [
        "核心动机：通过轨迹回报直接估计策略梯度",
        "代表机构：Northeastern University"
      ],
      "detail": "<p>通过轨迹回报直接估计策略梯度</p>"
    },
    {
      "id": "trpo",
      "num": 2,
      "name": "TRPO",
      "fullName": "信任域策略优化 (Trust Region Policy Optimization)",
      "year": "2015",
      "org": "UC Berkeley",
      "parent": "reinforce",
      "paperUrl": "https://arxiv.org/abs/1502.05477",
      "projectUrl": "",
      "category": "foundation",
      "motivation": "KL约束信任域保证单调改进",
      "summary": "TRPO 的核心目标是：KL约束信任域保证单调改进。",
      "keyPoints": [
        "核心动机：KL约束信任域保证单调改进",
        "演化来源：继承或改进自 reinforce",
        "代表机构：UC Berkeley"
      ],
      "detail": "<p>KL约束信任域保证单调改进</p>"
    },
    {
      "id": "ppo",
      "num": 3,
      "name": "PPO",
      "fullName": "近端策略优化 (Proximal Policy Optimization)",
      "year": "2017",
      "org": "OpenAI",
      "parent": "trpo",
      "paperUrl": "https://arxiv.org/abs/1707.06347",
      "projectUrl": "",
      "category": "foundation",
      "motivation": "裁剪目标函数简化TRPO",
      "summary": "PPO 的核心目标是：裁剪目标函数简化TRPO。",
      "keyPoints": [
        "核心动机：裁剪目标函数简化TRPO",
        "演化来源：继承或改进自 trpo",
        "代表机构：OpenAI"
      ],
      "detail": "<p>裁剪目标函数简化TRPO</p>"
    },
    {
      "id": "instructgpt",
      "num": 4,
      "name": "InstructGPT",
      "fullName": "指令遵循GPT (InstructGPT/RLHF)",
      "year": "2022.03",
      "org": "OpenAI",
      "parent": "ppo",
      "paperUrl": "https://arxiv.org/abs/2203.02155",
      "projectUrl": "",
      "category": "rlhf",
      "motivation": "首次大规模验证RLHF对齐有效性",
      "summary": "InstructGPT 的核心目标是：首次大规模验证RLHF对齐有效性。",
      "keyPoints": [
        "核心动机：首次大规模验证RLHF对齐有效性",
        "演化来源：继承或改进自 ppo",
        "代表机构：OpenAI"
      ],
      "detail": "<p>首次大规模验证RLHF对齐有效性</p>"
    },
    {
      "id": "constitutional_ai",
      "num": 5,
      "name": "CAI",
      "fullName": "宪法AI (Constitutional AI)",
      "year": "2022.12",
      "org": "Anthropic",
      "parent": "instructgpt",
      "paperUrl": "https://arxiv.org/abs/2212.08073",
      "projectUrl": "",
      "category": "rlhf",
      "motivation": "基于原则的自我批判与修订",
      "summary": "CAI 的核心目标是：基于原则的自我批判与修订。",
      "keyPoints": [
        "核心动机：基于原则的自我批判与修订",
        "演化来源：继承或改进自 instructgpt",
        "代表机构：Anthropic"
      ],
      "detail": "<p>基于原则的自我批判与修订</p>"
    },
    {
      "id": "rlaif",
      "num": 6,
      "name": "RLAIF",
      "fullName": "AI反馈强化学习 (RL from AI Feedback)",
      "year": "2023.09",
      "org": "Google",
      "parent": "instructgpt",
      "paperUrl": "https://arxiv.org/abs/2309.00267",
      "projectUrl": "",
      "category": "rlhf",
      "motivation": "AI反馈替代昂贵的人工标注",
      "summary": "RLAIF 的核心目标是：AI反馈替代昂贵的人工标注。",
      "keyPoints": [
        "核心动机：AI反馈替代昂贵的人工标注",
        "演化来源：继承或改进自 instructgpt",
        "代表机构：Google"
      ],
      "detail": "<p>AI反馈替代昂贵的人工标注</p>"
    },
    {
      "id": "dpo",
      "num": 7,
      "name": "DPO",
      "fullName": "直接偏好优化 (Direct Preference Optimization)",
      "year": "2023.05",
      "org": "Stanford",
      "parent": "instructgpt",
      "paperUrl": "https://arxiv.org/abs/2305.18290",
      "projectUrl": "",
      "category": "preference",
      "motivation": "无需奖励模型的闭式解对齐",
      "summary": "DPO 的核心目标是：无需奖励模型的闭式解对齐。",
      "keyPoints": [
        "核心动机：无需奖励模型的闭式解对齐",
        "演化来源：继承或改进自 instructgpt",
        "代表机构：Stanford"
      ],
      "detail": "<p>无需奖励模型的闭式解对齐</p>"
    },
    {
      "id": "ipo",
      "num": 8,
      "name": "IPO",
      "fullName": "恒等映射偏好优化 (Identity Preference Optimization)",
      "year": "2023.10",
      "org": "Google DeepMind",
      "parent": "dpo",
      "paperUrl": "https://arxiv.org/abs/2310.12036",
      "projectUrl": "",
      "category": "preference",
      "motivation": "移除BT假设缓解过拟合",
      "summary": "IPO 提出了 ΨPO 通用偏好优化框架，统一了 RLHF 和 DPO，并通过将非线性映射 \\(\\Psi\\) 设为恒等函数（identity），推导出无需 Bradley-Terry 奖励模型假设即可直接从 pairwise 偏好数据学习策略的 IPO 算法，从理论上解决了 DPO 因隐式依赖 BT 假设而导致的过拟合问题。",
      "keyPoints": [
        "<strong>ΨPO 统一框架</strong>：提出通用目标函数 \\(J_{\\Psi PO}(\\pi) = \\mathbb{E}[\\Psi(p^*(y_1 \\succ y_2))] \\cdot \\log \\frac{\\pi(y_1)}{\\pi(y_2)}\\)，通过选择不同的 \\(\\Psi\\) 函数统一 RLHF（\\(\\Psi = \\log\\frac{q}{1-q}\\)）和 IPO（\\(\\Psi = \\text{id}\\)）",
        "<strong>移除 Bradley-Terry 假设</strong>：IPO 直接优化 pairwise 偏好概率，无需将偏好转化为 pointwise 奖励，避免了 BT 模型不成立时的系统性偏差",
        "<strong>DPO 过拟合的理论分析</strong>：证明 DPO 在确定性偏好（\\(p^*=1\\)）下无论正则化强度 \\(\\tau\\) 如何，最优策略均退化为确定性策略，完全忽略参考策略 \\(\\pi_{\\text{ref}}\\)",
        "<strong>IPO 损失函数</strong>：采样版 IPO 损失为简洁的 MSE 回归形式 \\(\\mathbb{E}[(h_\\pi(y_w, y_l) - \\frac{1}{2\\tau})^2]\\)，其中 \\(h_\\pi\\) 为策略与参考策略的对数似然比之差",
        "<strong>唯一全局最优</strong>：Theorem 2 证明在 KL 正则化下 IPO 目标函数存在唯一全局最优策略",
        "<strong>正则化始终生效</strong>：与 DPO 不同，IPO 通过控制对数似然比的 gap 始终将策略正则化向 \\(\\pi_{\\text{ref}}\\)，\\(\\tau\\) 越大正则化越强"
      ],
      "detail": "<p><img alt=\"IPO 与 DPO 学习曲线对比\" src=\"https://arxiv.org/html/2310.12036v1/x2.png\" />\n<em>图：IPO 与 DPO 在三动作 bandit 设定下的学习曲线对比。DPO 将未观测动作概率压至 0（过拟合），而 IPO 通过 \\(\\tau\\) 控制正则化强度，保持对未观测动作的合理概率分配。</em></p>\n<pre><code class=\"language-python\"># Sampled IPO 伪代码 (Algorithm 1)\n# 输入: 偏好数据集 D = {(x, y_w, y_l)}, 参考策略 π_ref, 温度 τ\n\ndef h_pi(y_w, y_l, x, pi, pi_ref):\n    &quot;&quot;&quot;计算策略与参考策略的对数似然比之差&quot;&quot;&quot;\n    return (log(pi(y_w|x)) - log(pi_ref(y_w|x))) - \\\n           (log(pi(y_l|x)) - log(pi_ref(y_l|x)))\n\n# 从 π = π_ref 开始训练\npi = copy(pi_ref)\n\nfor batch in DataLoader(D):\n    x, y_w, y_l = batch\n    # IPO 损失: MSE 回归到 1/(2τ)\n    loss = mean((h_pi(y_w, y_l, x, pi, pi_ref) - 1/(2*tau))**2)\n    optimizer.zero_grad()\n    loss.backward()\n    optimizer.step()\n</code></pre>\n<h5>动机与背景：DPO 的隐含缺陷</h5>\n<p>RLHF 的标准流程分为两步：(1) 基于 Bradley-Terry 模型从偏好数据训练奖励模型；(2) 用 PPO 等 RL 算法优化策略。DPO 将这两步合并为一步，直接从偏好数据优化策略，避免了 RL 训练的不稳定性。然而，DPO 的推导<strong>本质上仍然依赖 Bradley-Terry 假设</strong>——它假设 pairwise 偏好可以分解为 pointwise 奖励的函数：</p>\n<p>$$p^*(y_1 \\succ y_2) = \\sigma(r^*(y_1) - r^*(y_2))$$</p>\n<p>这一假设在现实中常常不成立。人类偏好可能是非传递的（A &gt; B, B &gt; C, 但 C &gt; A），或者无法用单一标量奖励刻画。当 BT 假设不成立时，DPO 会将偏好数据强行拟合到一个不存在的奖励函数上，导致<strong>过拟合到偏好数据的噪声而非真实偏好结构</strong>。</p>\n<div class=\"warn-box\">⚠️ 注意：DPO 的过拟合不仅是经验现象，而是理论上可证明的。论文 Section 4.2 证明：当偏好为确定性（\\(p^*(y_1 \\succ y_2) = 1\\)）时，DPO 的最优策略为 \\(\\pi^*(y_1) = 1, \\pi^*(y_2) = 0\\)，<strong>与正则化强度 \\(\\tau\\) 完全无关</strong>。这意味着 DPO 的 KL 正则化在极端偏好下完全失效。</div>\n<h5>核心机制一：ΨPO 统一框架</h5>\n<p>论文首先提出了一个通用的偏好优化目标，称为 ΨPO：</p>\n<p>$$J_{\\Psi PO}(\\pi, \\pi_{\\text{ref}}) = \\underset{\\substack{y \\sim \\mu \\\\ y' \\sim \\mu}}{\\mathbb{E}} \\left[ \\Psi(p^*(y \\succ y')) \\left( \\log \\frac{\\pi(y)}{\\pi_{\\text{ref}}(y)} - \\log \\frac{\\pi(y')}{\\pi_{\\text{ref}}(y')} \\right) \\right]$$</p>\n<p>其中 \\(\\Psi: [0,1] \\to \\mathbb{R}\\) 是一个非递减映射函数，\\(p^*(y \\succ y')\\) 是真实偏好概率，\\(\\mu\\) 是采样分布。</p>\n<p><strong>关键洞察</strong>：不同的 \\(\\Psi\\) 选择对应不同的算法：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>\\(\\Psi\\) 选择</th>\n<th>对应算法</th>\n<th>含义</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>\\(\\Psi(q) = \\log\\frac{q}{1-q}\\)（logit 函数）</td>\n<td>RLHF / DPO</td>\n<td>将偏好概率映射为 BT 奖励差</td>\n</tr>\n<tr>\n<td>\\(\\Psi(q) = q\\)（恒等函数）</td>\n<td><strong>IPO</strong></td>\n<td>直接使用偏好概率</td>\n</tr>\n</tbody>\n</table></div>\n<p>当 \\(\\Psi\\) 为 logit 函数时，\\(\\Psi(p^*) = \\log\\frac{p^*}{1-p^*}\\)。若 BT 模型成立，则 \\(\\Psi(p^*) = r^*(y) - r^*(y')\\)，ΨPO 退化为标准 RLHF 目标。但当 BT 模型不成立时，logit 映射会放大极端偏好（\\(p^* \\to 0\\) 或 \\(p^* \\to 1\\) 时 logit 趋向 \\(\\pm\\infty\\)），导致过拟合。</p>\n<div class=\"key-point\">💡 关键：IPO 选择 \\(\\Psi = \\text{identity}\\) 的核心原因是<strong>避免 logit 函数在极端偏好处的发散</strong>。恒等映射保持偏好概率的有界性，使正则化始终有效。</div>\n<h5>核心机制二：IPO 目标函数推导</h5>\n<p>将 \\(\\Psi(q) = q\\) 代入 ΨPO 框架，IPO 的目标函数为：</p>\n<p>$$J_{IPO}(\\pi, \\pi_{\\text{ref}}) = \\underset{y, y' \\sim \\mu}{\\mathbb{E}} \\left[ p^*(y \\succ y') \\left( \\log \\frac{\\pi(y)}{\\pi_{\\text{ref}}(y)} - \\log \\frac{\\pi(y')}{\\pi_{\\text{ref}}(y')} \\right) \\right]$$</p>\n<p>加入 KL 正则化后，完整优化问题为：</p>\n<p>$$\\pi^*_{IPO} = \\arg\\max_\\pi \\left\\{ J_{IPO}(\\pi, \\pi_{\\text{ref}}) - \\tau \\cdot \\text{KL}(\\pi \\| \\pi_{\\text{ref}}) \\right\\}$$</p>\n<p><strong>Theorem 1</strong>（最优策略的充要条件）：策略 \\(\\pi^*\\) 是 IPO 的最优策略，当且仅当对所有 \\(y, y'\\)：</p>\n<p>$$\\log \\frac{\\pi^*(y)}{\\pi_{\\text{ref}}(y)} - \\log \\frac{\\pi^*(y')}{\\pi_{\\text{ref}}(y')} = \\frac{1}{\\tau} \\left( p^*(y \\succ_\\mu y') - p^*(y' \\succ_\\mu y) \\right)$$</p>\n<p>其中 \\(p^*(y \\succ_\\mu y') = \\mathbb{E}_{y'' \\sim \\mu}[p^*(y \\succ y'')]\\) 是对采样分布 \\(\\mu\\) 的边际偏好。</p>\n<p>这个条件的直觉是：<strong>最优策略相对于参考策略的对数似然比之差，正比于两个动作的边际偏好差</strong>。正则化参数 \\(\\tau\\) 控制这个比例——\\(\\tau\\) 越小，策略越偏离参考策略以追求偏好；\\(\\tau\\) 越大，策略越接近参考策略。</p>\n<p><strong>Theorem 2</strong>（唯一性）：IPO 的最优策略是唯一的，给出闭式解：</p>\n<p>$$\\pi^*(y) \\propto \\pi_{\\text{ref}}(y) \\cdot \\exp\\left(\\frac{p^*(y \\succ_\\mu \\cdot)}{\\tau}\\right)$$</p>\n<h5>核心机制三：从总体损失到采样损失</h5>\n<p>总体 IPO 损失函数为：</p>\n<p>$$\\mathcal{L}_{IPO}(\\pi) = \\underset{y, y' \\sim \\mu}{\\mathbb{E}} \\left[ \\left( h_\\pi(y, y') - \\frac{p^*(y \\succ_\\mu \\cdot) - p^*(y' \\succ_\\mu \\cdot)}{\\tau} \\right)^2 \\right]$$</p>\n<p>其中 \\(h_\\pi(y, y') = \\log\\frac{\\pi(y)\\pi_{\\text{ref}}(y')}{\\pi(y')\\pi_{\\text{ref}}(y)}\\)。</p>\n<p>然而，边际偏好 \\(p^*(y \\succ_\\mu \\cdot)\\) 在实际中不可直接获取。论文利用偏好对 \\((y_w, y_l)\\) 的对称性，巧妙推导出<strong>采样版损失</strong>：</p>\n<p>$$\\mathcal{L}_{IPO}^{\\text{sampled}}(\\pi) = \\underset{(y_w, y_l) \\sim D}{\\mathbb{E}} \\left[ \\left( h_\\pi(y_w, y_l) - \\frac{1}{2\\tau} \\right)^2 \\right]$$</p>\n<div class=\"key-point\">💡 关键：采样损失的推导利用了 \\(h_\\pi(y_w, y_l) + h_\\pi(y_l, y_w) = 0\\) 的反对称性。将 \\((y_w, y_l)\\) 视为\"偏好标签为 1\"的样本，\\((y_l, y_w)\\) 视为\"偏好标签为 0\"的样本，两项合并后得到目标值 \\(\\frac{1}{2\\tau}\\)。</div>\n<p>这个损失函数的物理含义极为清晰：<strong>IPO 将策略与参考策略的对数似然比之差回归到常数 \\(\\frac{1}{2\\tau}\\)</strong>。这意味着：\n1. 对于每一对 \\((y_w, y_l)\\)，IPO 要求 \\(\\pi\\) 相对于 \\(\\pi_{\\text{ref}}\\) 对 \\(y_w\\) 的偏好程度恰好为 \\(\\frac{1}{2\\tau}\\)\n2. \\(\\tau\\) 越小，要求的偏好 gap 越大，策略越偏离参考策略\n3. \\(\\tau\\) 越大，要求的偏好 gap 越小，策略越接近参考策略</p>\n<h5>与 DPO 的关键区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>DPO</th>\n<th>IPO</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>偏好模型假设</td>\n<td>依赖 Bradley-Terry 模型</td>\n<td>无需 BT 假设，直接使用偏好概率</td>\n</tr>\n<tr>\n<td>损失函数形式</td>\n<td>交叉熵（logistic loss）</td>\n<td>MSE 回归</td>\n</tr>\n<tr>\n<td>正则化行为</td>\n<td>确定性偏好下 \\(\\tau\\) 失效</td>\n<td>\\(\\tau\\) 始终控制策略与 \\(\\pi_{\\text{ref}}\\) 的距离</td>\n</tr>\n<tr>\n<td>极端偏好处理</td>\n<td>logit 发散导致过拟合</td>\n<td>恒等映射保持有界</td>\n</tr>\n<tr>\n<td>目标值</td>\n<td>使 \\(\\sigma(h_\\pi) \\to 1\\)（无上界）</td>\n<td>使 \\(h_\\pi \\to \\frac{1}{2\\tau}\\)（有界目标）</td>\n</tr>\n</tbody>\n</table></div>\n<p>论文通过三个 bandit 实验验证了上述理论分析：</p>\n<ol>\n<li><strong>二动作确定性偏好</strong>（\\(\\mathcal{D}_1\\)）：DPO 收敛到确定性策略 \\(\\pi(y_1)=1\\)，无视 \\(\\tau\\)；IPO 收敛到 \\(\\pi^*(y_1) = \\frac{e^{1/\\tau}}{1+e^{1/\\tau}}\\)，\\(\\tau\\) 有效控制偏好强度</li>\n<li><strong>二动作随机偏好</strong>（\\(\\mathcal{D}_2\\)）：DPO 仍然过拟合到采样偏好；IPO 保持稳定</li>\n<li><strong>三动作部分观测</strong>（\\(\\mathcal{D}_3\\)）：仅观测 \\(y_1 \\succ y_2\\) 和 \\(y_2 \\succ y_3\\)。DPO 将未直接比较的 \\(y_3\\) 概率压至 0；IPO 通过 \\(\\tau\\) 合理分配概率</li>\n</ol>",
      "quiz": {
        "q": "IPO 采样损失函数中，目标回归值 1/(2τ) 的物理含义是什么？",
        "options": [
          "偏好对 (y_w, y_l) 的 Bradley-Terry 奖励差",
          "策略 π 与参考策略 π_ref 的 KL 散度上界",
          "策略相对于参考策略对 y_w 与 y_l 的对数似然比之差的期望目标",
          "偏好数据集中 y_w 被选中的经验概率"
        ],
        "answer": 2,
        "explain": "IPO 损失要求 h_π(y_w, y_l) = log(π(y_w)π_ref(y_l)/(π(y_l)π_ref(y_w))) 回归到 1/(2τ)，即控制策略相对于参考策略对优选与劣选响应的对数似然比之差为固定常数，τ 越小目标值越大，策略越偏离参考策略。"
      }
    },
    {
      "id": "kto",
      "num": 9,
      "name": "KTO",
      "fullName": "前景理论优化 (Kahneman-Tversky Optimization)",
      "year": "2024.02",
      "org": "Stanford",
      "parent": "dpo",
      "paperUrl": "https://arxiv.org/abs/2402.01306",
      "projectUrl": "",
      "category": "preference",
      "motivation": "仅需二元信号无需成对数据",
      "summary": "KTO 的核心目标是：仅需二元信号无需成对数据。",
      "keyPoints": [
        "核心动机：仅需二元信号无需成对数据",
        "演化来源：继承或改进自 dpo",
        "代表机构：Stanford"
      ],
      "detail": "<p>仅需二元信号无需成对数据</p>"
    },
    {
      "id": "orpo",
      "num": 10,
      "name": "ORPO",
      "fullName": "无参考模型偏好优化 (Odds Ratio Preference Optimization)",
      "year": "2024.03",
      "org": "KAIST",
      "parent": "dpo",
      "paperUrl": "https://arxiv.org/abs/2403.07691",
      "projectUrl": "",
      "category": "preference",
      "motivation": "SFT与对齐单阶段整合",
      "summary": "ORPO 的核心目标是：SFT与对齐单阶段整合。",
      "keyPoints": [
        "核心动机：SFT与对齐单阶段整合",
        "演化来源：继承或改进自 dpo",
        "代表机构：KAIST"
      ],
      "detail": "<p>SFT与对齐单阶段整合</p>"
    },
    {
      "id": "simpo",
      "num": 11,
      "name": "SimPO",
      "fullName": "简单偏好优化 (Simple Preference Optimization)",
      "year": "2024.05",
      "org": "Princeton",
      "parent": "dpo",
      "paperUrl": "https://arxiv.org/abs/2405.14734",
      "projectUrl": "",
      "category": "preference",
      "motivation": "长度归一化消除长度偏见",
      "summary": "SimPO 的核心目标是：长度归一化消除长度偏见。",
      "keyPoints": [
        "核心动机：长度归一化消除长度偏见",
        "演化来源：继承或改进自 dpo",
        "代表机构：Princeton"
      ],
      "detail": "<p>长度归一化消除长度偏见</p>"
    },
    {
      "id": "remax",
      "num": 12,
      "name": "ReMax",
      "fullName": "贪心基线强化学习 (REINFORCE with Max Baseline)",
      "year": "2023.10",
      "org": "CUHK / ByteDance",
      "parent": "ppo",
      "paperUrl": "https://arxiv.org/abs/2310.10505",
      "projectUrl": "",
      "category": "online_rl",
      "motivation": "移除Critic节省50%显存",
      "summary": "ReMax 的核心目标是：移除Critic节省50%显存。",
      "keyPoints": [
        "核心动机：移除Critic节省50%显存",
        "演化来源：继承或改进自 ppo",
        "代表机构：CUHK / ByteDance"
      ],
      "detail": "<p>移除Critic节省50%显存</p>"
    },
    {
      "id": "spin",
      "num": 13,
      "name": "SPIN",
      "fullName": "自博弈微调 (Self-Play Fine-Tuning)",
      "year": "2024.01",
      "org": "UCLA",
      "parent": "instructgpt",
      "paperUrl": "https://arxiv.org/abs/2401.01335",
      "projectUrl": "",
      "category": "online_rl",
      "motivation": "新旧模型博弈实现自我进化",
      "summary": "SPIN 的核心目标是：新旧模型博弈实现自我进化。",
      "keyPoints": [
        "核心动机：新旧模型博弈实现自我进化",
        "演化来源：继承或改进自 instructgpt",
        "代表机构：UCLA"
      ],
      "detail": "<p>新旧模型博弈实现自我进化</p>"
    },
    {
      "id": "grpo",
      "num": 14,
      "name": "GRPO",
      "fullName": "组相对策略优化 (Group Relative Policy Optimization)",
      "year": "2024.02",
      "org": "DeepSeek",
      "parent": "ppo",
      "paperUrl": "https://arxiv.org/abs/2402.03300",
      "projectUrl": "",
      "category": "online_rl",
      "motivation": "组内相对优势移除Critic",
      "summary": "GRPO 的核心目标是：组内相对优势移除Critic。",
      "keyPoints": [
        "核心动机：组内相对优势移除Critic",
        "演化来源：继承或改进自 ppo",
        "代表机构：DeepSeek"
      ],
      "detail": "<p>组内相对优势移除Critic</p>"
    },
    {
      "id": "dapo",
      "num": 15,
      "name": "DAPO",
      "fullName": "解耦自适应策略优化 (Decoupled Adaptive Policy Optimization)",
      "year": "2024.03",
      "org": "ByteDance",
      "parent": "grpo",
      "paperUrl": "https://arxiv.org/abs/2503.14476",
      "projectUrl": "",
      "category": "online_rl",
      "motivation": "解耦裁剪缓解熵崩塌",
      "summary": "DAPO 的核心目标是：解耦裁剪缓解熵崩塌。",
      "keyPoints": [
        "核心动机：解耦裁剪缓解熵崩塌",
        "演化来源：继承或改进自 grpo",
        "代表机构：ByteDance"
      ],
      "detail": "<p>解耦裁剪缓解熵崩塌</p>"
    },
    {
      "id": "vapo",
      "num": 16,
      "name": "VAPO",
      "fullName": "价值增强策略优化 (Value-Augmented Policy Optimization)",
      "year": "2025.04",
      "org": "ByteDance / Tsinghua",
      "parent": "grpo",
      "paperUrl": "https://arxiv.org/abs/2504.05118",
      "projectUrl": "",
      "category": "frontier_2026",
      "motivation": "长度自适应GAE解决奖励稀疏",
      "summary": "VAPO 的核心目标是：长度自适应GAE解决奖励稀疏。",
      "keyPoints": [
        "核心动机：长度自适应GAE解决奖励稀疏",
        "演化来源：继承或改进自 grpo",
        "代表机构：ByteDance / Tsinghua"
      ],
      "detail": "<p>长度自适应GAE解决奖励稀疏</p>"
    },
    {
      "id": "dr_grpo",
      "num": 17,
      "name": "Dr.GRPO",
      "fullName": "修正版GRPO (GRPO Done Right)",
      "year": "2026",
      "org": "DeepSeek",
      "parent": "grpo",
      "paperUrl": "https://arxiv.org/abs/2503.20783",
      "projectUrl": "",
      "category": "frontier_2026",
      "motivation": "修正长度与难度偏差",
      "summary": "Dr.GRPO 的核心目标是：修正长度与难度偏差。",
      "keyPoints": [
        "核心动机：修正长度与难度偏差",
        "演化来源：继承或改进自 grpo",
        "代表机构：DeepSeek"
      ],
      "detail": "<p>修正长度与难度偏差</p>"
    },
    {
      "id": "reinforce_pp",
      "num": 18,
      "name": "REINFORCE++",
      "fullName": "增强版REINFORCE (REINFORCE++)",
      "year": "2026",
      "org": "NVIDIA / OpenRLHF",
      "parent": "remax",
      "paperUrl": "https://arxiv.org/abs/2501.03262",
      "projectUrl": "",
      "category": "frontier_2026",
      "motivation": "全局优势归一化大规模训练",
      "summary": "REINFORCE++ 的核心目标是：全局优势归一化大规模训练。",
      "keyPoints": [
        "核心动机：全局优势归一化大规模训练",
        "演化来源：继承或改进自 remax",
        "代表机构：NVIDIA / OpenRLHF"
      ],
      "detail": "<p>全局优势归一化大规模训练</p>"
    },
    {
      "id": "oapl",
      "num": 19,
      "name": "OAPL",
      "fullName": "离线策略滞后学习 (Off-Policy RL with Lagged Inference)",
      "year": "2026.02",
      "org": "MIT",
      "parent": "grpo",
      "paperUrl": "https://arxiv.org/abs/2602.19362",
      "projectUrl": "",
      "category": "frontier_2026",
      "motivation": "滞后推理解决分布式同步瓶颈",
      "summary": "OAPL 的核心目标是：滞后推理解决分布式同步瓶颈。",
      "keyPoints": [
        "核心动机：滞后推理解决分布式同步瓶颈",
        "演化来源：继承或改进自 grpo",
        "代表机构：MIT"
      ],
      "detail": "<p>滞后推理解决分布式同步瓶颈</p>"
    },
    {
      "id": "wdpo",
      "num": 20,
      "name": "WDPO",
      "fullName": "Wasserstein直接偏好优化 (Wasserstein DPO)",
      "year": "2026",
      "org": "Research",
      "parent": "dpo",
      "paperUrl": "https://arxiv.org/abs/2512.03320",
      "projectUrl": "",
      "category": "frontier_2026",
      "motivation": "Wasserstein距离增强鲁棒性",
      "summary": "WDPO 的核心目标是：Wasserstein距离增强鲁棒性。",
      "keyPoints": [
        "核心动机：Wasserstein距离增强鲁棒性",
        "演化来源：继承或改进自 dpo",
        "代表机构：Research"
      ],
      "detail": "<p>Wasserstein距离增强鲁棒性</p>"
    },
    {
      "id": "mod_dpo",
      "num": 21,
      "name": "MoD-DPO",
      "fullName": "模态解耦偏好优化 (Modality Decoupled DPO)",
      "year": "2026",
      "org": "Research",
      "parent": "dpo",
      "paperUrl": "https://arxiv.org/abs/2601.01234",
      "projectUrl": "",
      "category": "frontier_2026",
      "motivation": "跨模态解耦减少幻觉",
      "summary": "MoD-DPO 的核心目标是：跨模态解耦减少幻觉。",
      "keyPoints": [
        "核心动机：跨模态解耦减少幻觉",
        "演化来源：继承或改进自 dpo",
        "代表机构：Research"
      ],
      "detail": "<p>跨模态解耦减少幻觉</p>"
    }
  ],
  "categories": {
    "foundation": {
      "label": "奠基算法",
      "color": "#3B82F6"
    },
    "rlhf": {
      "label": "人类反馈强化学习",
      "color": "#10B981"
    },
    "preference": {
      "label": "偏好优化",
      "color": "#8B5CF6"
    },
    "online_rl": {
      "label": "在线强化学习",
      "color": "#F59E0B"
    },
    "frontier_2026": {
      "label": "2026前沿",
      "color": "#EF4444"
    }
  },
  "projectUrls": {}
};
