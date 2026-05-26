/**
 * embodied_rl-data.js — 由 pipeline/build.py 于 2026-05-26 14:20:22 自动生成。
 * 源文件：content/embodied/embodied_rl.md
 * ⚠️  请勿手动修改；如需更新，修改源文档后重新编译。
 */
window.PAGE_CONFIG = {
  "meta": {
    "domain": "embodied",
    "topic_id": "embodied_rl",
    "topic_name": "具身强化学习",
    "page_title": "具身强化学习算法总结",
    "page_subtitle": "2026-05-26 版",
    "page_desc": "系统梳理具身智能中强化学习的发展历程，涵盖从基础控制策略到Sim2Real迁移、离线RL预训练及复杂技能层次化学习的技术演进。",
    "page_icon": "🤖",
    "hero_pills": [
      "🏷️ Sim2Real · 离线RL · 技能学习 · 奖励设计"
    ],
    "count_pill": "{count} 个算法",
    "image_base": "../../content/embodied/embodied_rl/assets/",
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
        "id": "ddpg",
        "x": 100,
        "y": 80,
        "category": "foundation"
      },
      {
        "id": "trpo",
        "x": 100,
        "y": 120,
        "category": "foundation"
      },
      {
        "id": "ppo",
        "x": 200,
        "y": 120,
        "category": "foundation"
      },
      {
        "id": "sac",
        "x": 300,
        "y": 80,
        "category": "foundation"
      },
      {
        "id": "td3",
        "x": 300,
        "y": 40,
        "category": "foundation"
      },
      {
        "id": "domain_rand",
        "x": 200,
        "y": 160,
        "category": "sim2real"
      },
      {
        "id": "viral",
        "x": 900,
        "y": 140,
        "category": "sim2real"
      },
      {
        "id": "lfi_dr",
        "x": 900,
        "y": 180,
        "category": "sim2real"
      },
      {
        "id": "falcon",
        "x": 900,
        "y": 100,
        "category": "sim2real"
      },
      {
        "id": "hdmi",
        "x": 950,
        "y": 140,
        "category": "sim2real"
      },
      {
        "id": "lide",
        "x": 900,
        "y": 220,
        "category": "sim2real"
      },
      {
        "id": "bcq",
        "x": 400,
        "y": 240,
        "category": "offline_rl"
      },
      {
        "id": "cql",
        "x": 500,
        "y": 240,
        "category": "offline_rl"
      },
      {
        "id": "iql",
        "x": 600,
        "y": 240,
        "category": "offline_rl"
      },
      {
        "id": "td3bc",
        "x": 600,
        "y": 200,
        "category": "offline_rl"
      },
      {
        "id": "unifloral",
        "x": 800,
        "y": 240,
        "category": "offline_rl"
      },
      {
        "id": "cpql",
        "x": 900,
        "y": 260,
        "category": "offline_rl"
      },
      {
        "id": "safefql",
        "x": 900,
        "y": 300,
        "category": "offline_rl"
      },
      {
        "id": "gail",
        "x": 150,
        "y": 320,
        "category": "skill_hierarchical"
      },
      {
        "id": "option_critic",
        "x": 200,
        "y": 360,
        "category": "skill_hierarchical"
      },
      {
        "id": "feudal",
        "x": 200,
        "y": 400,
        "category": "skill_hierarchical"
      },
      {
        "id": "her",
        "x": 200,
        "y": 280,
        "category": "skill_hierarchical"
      },
      {
        "id": "diayn",
        "x": 300,
        "y": 320,
        "category": "skill_hierarchical"
      },
      {
        "id": "hiro",
        "x": 300,
        "y": 400,
        "category": "skill_hierarchical"
      },
      {
        "id": "skillrl",
        "x": 900,
        "y": 360,
        "category": "skill_hierarchical"
      },
      {
        "id": "metaworld_hrl",
        "x": 950,
        "y": 380,
        "category": "skill_hierarchical"
      },
      {
        "id": "hcc",
        "x": 950,
        "y": 340,
        "category": "skill_hierarchical"
      },
      {
        "id": "icm",
        "x": 200,
        "y": 480,
        "category": "reward_design"
      },
      {
        "id": "rnd",
        "x": 300,
        "y": 480,
        "category": "reward_design"
      },
      {
        "id": "lagea",
        "x": 900,
        "y": 460,
        "category": "reward_design"
      },
      {
        "id": "mrbt",
        "x": 950,
        "y": 460,
        "category": "reward_design"
      },
      {
        "id": "vsimr",
        "x": 800,
        "y": 480,
        "category": "reward_design"
      },
      {
        "id": "mbpo",
        "x": 400,
        "y": 560,
        "category": "world_model"
      },
      {
        "id": "dreamerv1",
        "x": 400,
        "y": 600,
        "category": "world_model"
      },
      {
        "id": "dreamerv2",
        "x": 500,
        "y": 600,
        "category": "world_model"
      },
      {
        "id": "dreamerv3",
        "x": 700,
        "y": 600,
        "category": "world_model"
      },
      {
        "id": "dreamdojo",
        "x": 900,
        "y": 580,
        "category": "world_model"
      },
      {
        "id": "adaworldpolicy",
        "x": 950,
        "y": 600,
        "category": "world_model"
      },
      {
        "id": "rwml",
        "x": 900,
        "y": 620,
        "category": "world_model"
      },
      {
        "id": "hy_embodied",
        "x": 900,
        "y": 540,
        "category": "world_model"
      }
    ],
    "edges": [
      {
        "from": "trpo",
        "to": "ppo",
        "label": "简化约束"
      },
      {
        "from": "ddpg",
        "to": "sac",
        "label": "最大熵"
      },
      {
        "from": "ddpg",
        "to": "td3",
        "label": "双Q网络"
      },
      {
        "from": "domain_rand",
        "to": "viral",
        "label": "视觉随机化"
      },
      {
        "from": "domain_rand",
        "to": "lfi_dr",
        "label": "参数推理"
      },
      {
        "from": "domain_rand",
        "to": "lide",
        "label": "规划引导"
      },
      {
        "from": "sac",
        "to": "falcon",
        "label": "力控制"
      },
      {
        "from": "viral",
        "to": "hdmi",
        "label": "视频学习"
      },
      {
        "from": "ddpg",
        "to": "bcq",
        "label": "约束动作"
      },
      {
        "from": "bcq",
        "to": "cql",
        "label": "保守估计"
      },
      {
        "from": "cql",
        "to": "iql",
        "label": "隐式策略"
      },
      {
        "from": "td3",
        "to": "td3bc",
        "label": "BC正则"
      },
      {
        "from": "cql",
        "to": "unifloral",
        "label": "统一协议"
      },
      {
        "from": "cql",
        "to": "cpql",
        "label": "Peng算子"
      },
      {
        "from": "iql",
        "to": "safefql",
        "label": "安全约束"
      },
      {
        "from": "option_critic",
        "to": "feudal",
        "label": "主从架构"
      },
      {
        "from": "feudal",
        "to": "hiro",
        "label": "目标修正"
      },
      {
        "from": "sac",
        "to": "diayn",
        "label": "技能发现"
      },
      {
        "from": "hiro",
        "to": "skillrl",
        "label": "技能库"
      },
      {
        "from": "skillrl",
        "to": "metaworld_hrl",
        "label": "技能迁移"
      },
      {
        "from": "skillrl",
        "to": "hcc",
        "label": "认知缓存"
      },
      {
        "from": "icm",
        "to": "rnd",
        "label": "随机蒸馏"
      },
      {
        "from": "rnd",
        "to": "lagea",
        "label": "VLM塑形"
      },
      {
        "from": "lagea",
        "to": "mrbt",
        "label": "逻辑验证"
      },
      {
        "from": "rnd",
        "to": "vsimr",
        "label": "LLM增强"
      },
      {
        "from": "sac",
        "to": "mbpo",
        "label": "模型rollout"
      },
      {
        "from": "mbpo",
        "to": "dreamerv1",
        "label": "隐空间"
      },
      {
        "from": "dreamerv1",
        "to": "dreamerv2",
        "label": "离散隐变量"
      },
      {
        "from": "dreamerv2",
        "to": "dreamerv3",
        "label": "symlog"
      },
      {
        "from": "dreamerv3",
        "to": "dreamdojo",
        "label": "视频预训练"
      },
      {
        "from": "dreamdojo",
        "to": "adaworldpolicy",
        "label": "流匹配"
      },
      {
        "from": "dreamerv3",
        "to": "rwml",
        "label": "LLM集成"
      },
      {
        "from": "dreamerv3",
        "to": "hy_embodied",
        "label": "策略蒸馏"
      }
    ],
    "milestones": [
      "ppo",
      "sac",
      "dreamerv3"
    ]
  },
  "algos": [
    {
      "id": "ddpg",
      "num": 1,
      "name": "DDPG",
      "fullName": "深度确定性策略梯度 (Deep Deterministic Policy Gradient)",
      "year": "2015",
      "org": "DeepMind",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/1509.02971",
      "projectUrl": "",
      "category": "foundation",
      "motivation": "首次将DQN扩展至连续动作空间",
      "summary": "DDPG 将 DQN 的**经验回放**与**目标网络**思想引入 Actor-Critic 框架，结合**确定性策略梯度**定理，首次实现了在高维连续动作空间中稳定、高效的端到端深度强化学习。",
      "keyPoints": [
        "<strong>Actor-Critic 架构</strong>：Actor 网络 <span class=\"kb-math kb-math-inline\">\\mu(s|\\theta^\\mu)</span> 输出确定性动作，Critic 网络 <span class=\"kb-math kb-math-inline\">Q(s,a|\\theta^Q)</span> 估计动作价值函数",
        "<strong>经验回放缓冲区 (Replay Buffer)</strong>：存储 <span class=\"kb-math kb-math-inline\">(s_t, a_t, r_t, s_{t+1})</span> 转移元组，随机采样小批量训练，打破样本时序相关性",
        "<strong>目标网络 (Target Network)</strong>：Actor 和 Critic 各维护一个目标网络副本，通过软更新 <span class=\"kb-math kb-math-inline\">\\theta&#x27; \\leftarrow \\tau\\theta + (1-\\tau)\\theta&#x27;</span> 缓慢跟踪，稳定 TD 目标",
        "<strong>Ornstein-Uhlenbeck 噪声</strong>：为确定性策略添加时序相关的探索噪声，适合惯性物理控制任务",
        "<strong>批归一化 (Batch Normalization)</strong>：对网络各层输入归一化，解决不同物理量纲的状态特征尺度差异问题",
        "<strong>20+ MuJoCo 物理控制任务</strong>验证，包括 cartpole swing-up、灵巧操作、腿式运动等，且支持从原始像素端到端学习"
      ],
      "detail": "<h5>框架示意</h5>\n<p><img alt=\"DDPG 测试环境示例\" src=\"https://ar5iv.labs.arxiv.org/html/1509.02971/assets/x1.png\" />\n<em>图：DDPG 论文中使用的部分 MuJoCo 物理控制环境。从左到右：cartpole swing-up、reaching、grasp-and-move、puck-hitting。</em></p>\n<p><img alt=\"DDPG 各组件消融实验\" src=\"https://ar5iv.labs.arxiv.org/html/1509.02971/assets/x2.png\" />\n<em>图：不同 DPG 变体的性能曲线对比——原始 DPG（浅灰）、加入批归一化（浅灰）、加入目标网络（深灰）、完整 DDPG（彩色）。可以看到目标网络和批归一化对训练稳定性的关键作用。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># DDPG 算法核心流程\n随机初始化 Critic 网络 Q(s,a|θ^Q) 和 Actor 网络 μ(s|θ^μ)\n初始化目标网络: θ^Q' ← θ^Q, θ^μ' ← θ^μ\n初始化经验回放缓冲区 R\n\nfor episode = 1 to M:\n    初始化 Ornstein-Uhlenbeck 噪声过程 N\n    获取初始观测 s_1\n    for t = 1 to T:\n        # 选择动作（确定性策略 + 探索噪声）\n        a_t = μ(s_t|θ^μ) + N_t\n\n        # 执行动作，获取奖励和下一状态\n        r_t, s_{t+1} = env.step(a_t)\n\n        # 存入经验回放\n        R.store((s_t, a_t, r_t, s_{t+1}))\n\n        # 从 R 中随机采样 mini-batch (s_i, a_i, r_i, s_{i+1})\n        # 计算 TD 目标\n        y_i = r_i + γ · Q'(s_{i+1}, μ'(s_{i+1}|θ^μ')|θ^Q')\n\n        # 更新 Critic：最小化 L = (1/N) Σ (y_i - Q(s_i,a_i|θ^Q))²\n        update θ^Q by minimizing L\n\n        # 更新 Actor：沿策略梯度方向\n        ∇_{θ^μ} J ≈ (1/N) Σ ∇_a Q(s,a|θ^Q)|_{a=μ(s)} · ∇_{θ^μ} μ(s|θ^μ)\n\n        # 软更新目标网络\n        θ^Q' ← τ·θ^Q + (1-τ)·θ^Q'\n        θ^μ' ← τ·θ^μ + (1-τ)·θ^μ'\n</code></pre>\n<h5>动机与背景</h5>\n<p>DQN (Mnih et al., 2015) 在 Atari 游戏上取得了突破性成功，但其核心操作——对所有动作取 <span class=\"kb-math kb-math-inline\">\\arg\\max_a Q(s,a)</span>——要求动作空间是离散且低维的。然而，机器人控制、自动驾驶等真实物理任务天然具有<strong>连续高维动作空间</strong>（如关节力矩、电机电压）。简单地将连续空间离散化会遭遇<strong>维度灾难</strong>：一个 7 自由度机械臂即使每个关节仅 3 档离散化，动作空间也达到 <span class=\"kb-math kb-math-inline\">3^7 = 2187</span> 维。</p>\n<div class=\"key-point\">💡 <strong>关键洞察</strong>：DDPG 的核心思路是——既然无法在连续空间中枚举 <span class=\"kb-math kb-math-inline\">\\arg\\max</span>，不如直接用一个神经网络（Actor）来<strong>学习</strong>从状态到最优动作的映射 <span class=\"kb-math kb-math-inline\">\\mu(s)</span>，同时用另一个网络（Critic）来评估该动作的好坏。</div>\n<h5>核心机制：确定性策略梯度</h5>\n<p>DDPG 建立在 Silver et al. (2014) 提出的<strong>确定性策略梯度 (DPG)</strong> 定理之上。与随机策略 <span class=\"kb-math kb-math-inline\">\\pi(a|s)</span> 不同，确定性策略 <span class=\"kb-math kb-math-inline\">\\mu: \\mathcal{S} \\to \\mathcal{A}</span> 直接输出一个确定的动作值。DPG 定理证明，确定性策略的性能梯度为：</p>\n<div class=\"kb-math kb-math-display\">\\nabla_{\\theta^\\mu} J \\approx \\mathbb{E}_{s \\sim \\rho^\\beta}\\left[\\nabla_a Q(s,a|\\theta^Q)\\big|_{a=\\mu(s|\\theta^\\mu)} \\cdot \\nabla_{\\theta^\\mu} \\mu(s|\\theta^\\mu)\\right]</div>\n<p>这个梯度的直觉非常清晰：\n1. <strong><span class=\"kb-math kb-math-inline\">\\nabla_a Q(s,a)</span></strong>：Critic 告诉 Actor \"动作往哪个方向调整能提高 Q 值\"\n2. <strong><span class=\"kb-math kb-math-inline\">\\nabla_{\\theta^\\mu} \\mu(s)</span></strong>：Actor 通过链式法则将这个信号反向传播到自身参数</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：与随机策略梯度不同，确定性策略梯度<strong>不需要对动作空间积分</strong>，这使得它在高维连续动作空间中计算效率更高。</div>\n<h5>Critic 的训练：Bellman 方程与 TD 学习</h5>\n<p>Critic 网络通过最小化 TD 误差来逼近真实的动作价值函数。对于从经验回放中采样的转移 <span class=\"kb-math kb-math-inline\">(s_i, a_i, r_i, s_{i+1})</span>，TD 目标为：</p>\n<div class=\"kb-math kb-math-display\">y_i = r_i + \\gamma \\, Q&#x27;(s_{i+1}, \\mu&#x27;(s_{i+1}|\\theta^{\\mu&#x27;})|\\theta^{Q&#x27;})</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">Q&#x27;</span> 和 <span class=\"kb-math kb-math-inline\">\\mu&#x27;</span> 是<strong>目标网络</strong>。Critic 的损失函数为：</p>\n<div class=\"kb-math kb-math-display\">L = \\frac{1}{N}\\sum_i \\left(y_i - Q(s_i, a_i|\\theta^Q)\\right)^2</div>\n<h5>稳定训练的三大技巧</h5>\n<p><strong>1. 经验回放 (Experience Replay)</strong></p>\n<p>与 DQN 相同，DDPG 将所有交互经验 <span class=\"kb-math kb-math-inline\">(s, a, r, s&#x27;)</span> 存入一个有限大小的缓冲区，训练时随机采样小批量。这一机制：\n- 打破了在线学习中样本的时序相关性\n- 提高了数据利用效率（每条经验可被多次使用）\n- 使得训练过程更接近 i.i.d. 假设</p>\n<p><strong>2. 目标网络软更新 (Soft Target Update)</strong></p>\n<p>DQN 使用硬拷贝（每隔固定步数完全复制参数），而 DDPG 创新性地采用<strong>软更新</strong>：</p>\n<div class=\"kb-math kb-math-display\">\\theta&#x27; \\leftarrow \\tau\\theta + (1-\\tau)\\theta&#x27;, \\quad \\tau \\ll 1</div>\n<p>论文中 <span class=\"kb-math kb-math-inline\">\\tau = 0.001</span>。这意味着目标网络的参数缓慢跟踪主网络，避免了 TD 目标的剧烈波动，显著提升了训练稳定性。</p>\n<div class=\"key-point\">💡 <strong>关键</strong>：软更新是 DDPG 相比 DQN 的重要改进之一。硬拷贝会导致目标值在更新瞬间发生跳变，而软更新使目标值平滑变化，约束了优化景观。</div>\n<p><strong>3. 批归一化 (Batch Normalization)</strong></p>\n<p>不同物理任务的状态特征量纲差异巨大（如位置可能是米级，速度可能是弧度/秒级）。DDPG 在 Actor 和 Critic 网络的每一层输入前应用批归一化，将特征归一化到相似尺度，使得同一套超参数可以跨任务通用。</p>\n<h5>探索策略：Ornstein-Uhlenbeck 噪声</h5>\n<p>由于确定性策略本身不具备探索能力，DDPG 通过向动作添加噪声来实现探索：</p>\n<div class=\"kb-math kb-math-display\">a_t = \\mu(s_t|\\theta^\\mu) + \\mathcal{N}_t</div>\n<p>论文选择了 <strong>Ornstein-Uhlenbeck (OU) 过程</strong>作为噪声源。OU 过程生成的噪声具有<strong>时序相关性</strong>（均值回复特性），相比独立高斯噪声更适合物理控制任务——因为这些任务通常具有惯性，时序相关的探索能产生更有意义的动作序列。</p>\n<h5>与 DQN 的核心区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>DQN</th>\n<th>DDPG</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>动作空间</td>\n<td>离散</td>\n<td>连续</td>\n</tr>\n<tr>\n<td>策略类型</td>\n<td>隐式（<span class=\"kb-math kb-math-inline\">\\arg\\max Q</span>）</td>\n<td>显式 Actor 网络</td>\n</tr>\n<tr>\n<td>目标网络更新</td>\n<td>硬拷贝（周期性）</td>\n<td>软更新（每步）</td>\n</tr>\n<tr>\n<td>探索方式</td>\n<td>ε-greedy</td>\n<td>OU 噪声</td>\n</tr>\n<tr>\n<td>网络数量</td>\n<td>1 个 Q 网络</td>\n<td>Actor + Critic 各 2 个（含目标）</td>\n</tr>\n</tbody>\n</table></div>\n<h5>实验验证</h5>\n<p><img alt=\"Q 值估计精度\" src=\"https://ar5iv.labs.arxiv.org/html/1509.02971/assets/x3.png\" />\n<em>图：估计 Q 值与实际回报的密度图。在简单任务（pendulum、cartpole）中 Q 值估计准确，复杂任务中存在一定高估但仍能学到有效策略。</em></p>\n<p>DDPG 在 20+ MuJoCo 物理控制任务上使用<strong>完全相同的网络结构和超参数</strong>取得了优异表现，部分任务甚至超越了拥有完整动力学模型的规划算法 (iLQG)。此外，DDPG 在多个任务中成功实现了从原始像素到控制信号的端到端学习。</p>",
      "quiz": {
        "q": "DDPG 中目标网络的软更新机制 θ' ← τθ + (1-τ)θ' 的主要作用是什么？",
        "options": [
          "加速 Actor 网络的收敛速度",
          "使 TD 目标缓慢变化，避免训练过程中目标值剧烈波动",
          "减少经验回放缓冲区的内存占用",
          "增强探索噪声的时序相关性"
        ],
        "answer": 1,
        "explain": "软更新通过极小的 τ（如 0.001）使目标网络参数缓慢跟踪主网络，从而让 TD 目标平滑变化，避免了硬拷贝导致的目标值跳变，显著提升训练稳定性。"
      }
    },
    {
      "id": "trpo",
      "num": 2,
      "name": "TRPO",
      "fullName": "信任域策略优化 (Trust Region Policy Optimization)",
      "year": "2015",
      "org": "UC Berkeley",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/1502.05477",
      "projectUrl": "",
      "category": "foundation",
      "motivation": "KL散度约束保证策略单调改进",
      "summary": "TRPO 的核心目标是：KL散度约束保证策略单调改进。",
      "keyPoints": [
        "核心动机：KL散度约束保证策略单调改进",
        "代表机构：UC Berkeley"
      ],
      "detail": "<p>KL散度约束保证策略单调改进</p>"
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
      "motivation": "剪切目标函数简化信任域优化",
      "summary": "PPO 的核心目标是：剪切目标函数简化信任域优化。",
      "keyPoints": [
        "核心动机：剪切目标函数简化信任域优化",
        "演化来源：继承或改进自 trpo",
        "代表机构：OpenAI"
      ],
      "detail": "<p>剪切目标函数简化信任域优化</p>"
    },
    {
      "id": "sac",
      "num": 4,
      "name": "SAC",
      "fullName": "软演员-评论家 (Soft Actor-Critic)",
      "year": "2018",
      "org": "UC Berkeley",
      "parent": "ddpg",
      "paperUrl": "https://arxiv.org/abs/1801.01290",
      "projectUrl": "",
      "category": "foundation",
      "motivation": "最大熵框架提升探索与鲁棒性",
      "summary": "SAC 提出了基于最大熵强化学习框架的 off-policy actor-critic 算法，通过在策略优化目标中同时最大化累积奖励与策略熵，显著提升了连续控制任务中的探索能力、样本效率和训练稳定性。",
      "keyPoints": [
        "<strong>最大熵目标函数</strong>：在标准 RL 目标上增加策略熵项 <span class=\"kb-math kb-math-inline\">\\alpha \\mathcal{H}(\\pi(\\cdot|s))</span>，鼓励策略在完成任务的同时尽可能随机",
        "<strong>三类函数逼近器</strong>：Soft Q 网络 <span class=\"kb-math kb-math-inline\">Q_\\theta</span>（双份）、Soft 价值网络 <span class=\"kb-math kb-math-inline\">V_\\psi</span>、随机策略网络 <span class=\"kb-math kb-math-inline\">\\pi_\\phi</span>",
        "<strong>Soft Policy Iteration 理论保证</strong>：交替执行 Soft 策略评估与 Soft 策略改进，证明收敛到最优最大熵策略（Theorem 1）",
        "<strong>双 Q 网络</strong>：使用两个独立训练的 Q 函数取最小值，缓解 Q 值正偏差（借鉴 TD3/Double DQN）",
        "<strong>重参数化技巧</strong>：策略采样 <span class=\"kb-math kb-math-inline\">a = f_\\phi(\\epsilon; s)</span>，使策略梯度可通过 Q 网络反向传播",
        "<strong>目标网络 EMA 更新</strong>：<span class=\"kb-math kb-math-inline\">\\bar{\\psi} \\leftarrow \\tau \\psi + (1-\\tau)\\bar{\\psi}</span>，稳定训练",
        "<strong>Off-policy + 经验回放</strong>：从 replay buffer 采样更新，样本效率远超 on-policy 方法",
        "<strong>基准测试</strong>：在 MuJoCo 连续控制任务（Hopper、Walker2d、HalfCheetah、Ant、Humanoid）上全面超越 DDPG、PPO、TD3 等方法，且跨随机种子稳定性极强"
      ],
      "detail": "<h5>核心训练曲线</h5>\n<p><img alt=\"SAC 在连续控制基准上的训练曲线\" src=\"https://ar5iv.labs.arxiv.org/html/1801.01290/assets/x1.png\" />\n<img alt=\"SAC 训练曲线 - Walker2d\" src=\"https://ar5iv.labs.arxiv.org/html/1801.01290/assets/x2.png\" />\n<img alt=\"SAC 训练曲线 - HalfCheetah\" src=\"https://ar5iv.labs.arxiv.org/html/1801.01290/assets/x3.png\" />\n<img alt=\"SAC 训练曲线 - Ant\" src=\"https://ar5iv.labs.arxiv.org/html/1801.01290/assets/x4.png\" /></p>\n<p><em>图：SAC（黄色）在 Hopper、Walker2d、HalfCheetah、Ant 等连续控制基准上的训练曲线。SAC 在所有任务上表现一致，并在最具挑战性的任务中超越了 on-policy 和 off-policy 基线方法。</em></p>\n<h5>算法伪代码</h5>\n<pre><code>Algorithm 1: Soft Actor-Critic\n────────────────────────────────────\n初始化参数向量 ψ, ψ̄, θ₁, θ₂, ϕ\n\nfor each iteration do\n    for each environment step do\n        aₜ ~ πϕ(aₜ|sₜ)                    # 从随机策略采样动作\n        sₜ₊₁ ~ p(sₜ₊₁|sₜ, aₜ)             # 环境转移\n        D ← D ∪ {(sₜ, aₜ, r(sₜ,aₜ), sₜ₊₁)}  # 存入回放缓冲区\n    end for\n\n    for each gradient step do\n        ψ ← ψ − λ_V ∇̂_ψ J_V(ψ)           # 更新价值网络\n        θᵢ ← θᵢ − λ_Q ∇̂_θᵢ J_Q(θᵢ)       # 更新双 Q 网络 (i∈{1,2})\n        ϕ ← ϕ − λ_π ∇̂_ϕ J_π(ϕ)           # 更新策略网络\n        ψ̄ ← τψ + (1−τ)ψ̄                  # EMA 更新目标网络\n    end for\nend for\n</code></pre>\n<h5>动机与背景</h5>\n<p>传统无模型深度强化学习面临两大核心挑战：<strong>样本效率低</strong>和<strong>超参数敏感</strong>。On-policy 方法（如 TRPO、PPO、A3C）每次梯度更新都需要采集新样本，代价极高；off-policy 方法（如 DDPG）虽然可以复用历史数据，但在连续动作空间中使用确定性策略，容易陷入局部最优且训练不稳定。</p>\n<p>SAC 的核心动机是引入<strong>最大熵强化学习框架</strong>（Maximum Entropy RL），在策略优化目标中同时最大化累积奖励和策略的熵。这一设计的直觉是：在完成任务的前提下，策略应当尽可能\"随机\"——这不仅促进了更充分的探索，还使策略能够捕获多种近优行为模式，提升了对环境扰动的鲁棒性。</p>\n<h5>最大熵目标函数</h5>\n<p>SAC 的核心优化目标为：</p>\n<div class=\"kb-math kb-math-display\">J(\\pi) = \\sum_{t=0}^{T} \\mathbb{E}_{(s_t, a_t) \\sim \\rho_\\pi} \\left[ r(s_t, a_t) + \\alpha \\mathcal{H}(\\pi(\\cdot|s_t)) \\right]</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\alpha</span> 为温度参数，控制熵项相对于奖励的重要性。当 <span class=\"kb-math kb-math-inline\">\\alpha \\to 0</span> 时退化为标准 RL 目标。熵项 <span class=\"kb-math kb-math-inline\">\\mathcal{H}(\\pi(\\cdot|s)) = -\\mathbb{E}[\\log \\pi(a|s)]</span> 鼓励策略输出更均匀的动作分布。</p>\n<div class=\"key-point\">💡 <strong>关键直觉</strong>：最大熵目标使策略在多个同样好的动作之间分配概率，而非贪婪地选择单一动作。这带来三个好处：(1) 更广泛的探索；(2) 捕获多模态行为；(3) 对环境变化更鲁棒。</div>\n<h5>Soft Bellman Backup 与策略评估</h5>\n<p>在最大熵框架下，标准 Bellman 方程被推广为 <strong>Soft Bellman Backup</strong>：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{T}^\\pi Q(s_t, a_t) \\triangleq r(s_t, a_t) + \\gamma \\mathbb{E}_{s_{t+1} \\sim p} \\left[ V(s_{t+1}) \\right]</div>\n<p>其中 Soft 价值函数定义为：</p>\n<div class=\"kb-math kb-math-display\">V(s_t) = \\mathbb{E}_{a_t \\sim \\pi} \\left[ Q(s_t, a_t) - \\log \\pi(a_t|s_t) \\right]</div>\n<p>注意与标准 Bellman 方程的关键区别：价值函数中包含了策略的对数概率项 <span class=\"kb-math kb-math-inline\">-\\log \\pi(a|s)</span>，这正是熵奖励的体现。论文证明（Lemma 1），反复应用 Soft Bellman Backup 算子 <span class=\"kb-math kb-math-inline\">\\mathcal{T}^\\pi</span> 将收敛到策略 <span class=\"kb-math kb-math-inline\">\\pi</span> 的真实 Soft Q 值。</p>\n<h5>Soft 策略改进</h5>\n<p>在策略改进步骤中，新策略通过最小化与指数化 Q 函数之间的 KL 散度获得：</p>\n<div class=\"kb-math kb-math-display\">\\pi_{\\text{new}} = \\arg\\min_{\\pi&#x27; \\in \\Pi} D_{\\text{KL}} \\left( \\pi&#x27;(\\cdot|s_t) \\;\\middle\\|\\; \\frac{\\exp(Q^{\\pi_{\\text{old}}}(s_t, \\cdot))}{Z^{\\pi_{\\text{old}}}(s_t)} \\right)</div>\n<p>论文证明（Lemma 2），这一更新保证新策略的 Soft Q 值不低于旧策略，即 <span class=\"kb-math kb-math-inline\">Q^{\\pi_{\\text{new}}}(s, a) \\geq Q^{\\pi_{\\text{old}}}(s, a)</span>。交替执行策略评估和策略改进（Theorem 1），算法收敛到策略类 <span class=\"kb-math kb-math-inline\">\\Pi</span> 中的最优最大熵策略。</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：配分函数 <span class=\"kb-math kb-math-inline\">Z^{\\pi_{\\text{old}}}(s_t)</span> 虽然不可解析计算，但它不依赖于新策略参数 <span class=\"kb-math kb-math-inline\">\\phi</span>，因此在梯度计算中可以忽略。</div>\n<h5>实用算法：三网络协同训练</h5>\n<p>将理论框架实例化为深度学习算法，SAC 使用三类参数化函数逼近器：</p>\n<p><strong>1. Soft 价值网络 <span class=\"kb-math kb-math-inline\">V_\\psi</span></strong>：通过最小化残差的平方来训练：</p>\n<div class=\"kb-math kb-math-display\">J_V(\\psi) = \\mathbb{E}_{s_t \\sim \\mathcal{D}} \\left[ \\frac{1}{2} \\left( V_\\psi(s_t) - \\mathbb{E}_{a_t \\sim \\pi_\\phi} [Q_\\theta(s_t, a_t) - \\log \\pi_\\phi(a_t|s_t)] \\right)^2 \\right]</div>\n<p><strong>2. Soft Q 网络 <span class=\"kb-math kb-math-inline\">Q_{\\theta_i}</span>（双份）</strong>：通过最小化 Soft Bellman 残差训练，使用目标价值网络 <span class=\"kb-math kb-math-inline\">V_{\\bar{\\psi}}</span> 计算目标值：</p>\n<div class=\"kb-math kb-math-display\">J_Q(\\theta_i) = \\mathbb{E}_{(s_t, a_t) \\sim \\mathcal{D}} \\left[ \\frac{1}{2} \\left( Q_{\\theta_i}(s_t, a_t) - r(s_t, a_t) - \\gamma V_{\\bar{\\psi}}(s_{t+1}) \\right)^2 \\right]</div>\n<p><strong>3. 策略网络 <span class=\"kb-math kb-math-inline\">\\pi_\\phi</span></strong>：通过最小化 KL 散度训练，等价于最大化：</p>\n<div class=\"kb-math kb-math-display\">J_\\pi(\\phi) = \\mathbb{E}_{s_t \\sim \\mathcal{D}} \\left[ D_{\\text{KL}} \\left( \\pi_\\phi(\\cdot|s_t) \\;\\middle\\|\\; \\frac{\\exp(Q_\\theta(s_t, \\cdot))}{Z_\\theta(s_t)} \\right) \\right]</div>\n<p>策略使用<strong>重参数化技巧</strong>：动作通过 <span class=\"kb-math kb-math-inline\">a_t = f_\\phi(\\epsilon_t; s_t)</span> 生成（其中 <span class=\"kb-math kb-math-inline\">\\epsilon_t</span> 为标准正态噪声），使梯度可以通过 Q 网络反向传播到策略参数。具体地，策略输出高斯分布的均值和对数标准差，动作通过 squashing function（tanh）映射到有界空间。</p>\n<h5>与 DDPG/TD3 的关键区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>DDPG</th>\n<th>TD3</th>\n<th>SAC</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>策略类型</td>\n<td>确定性</td>\n<td>确定性</td>\n<td><strong>随机性</strong></td>\n</tr>\n<tr>\n<td>探索方式</td>\n<td>外部噪声（OU/Gaussian）</td>\n<td>外部噪声</td>\n<td><strong>策略熵（内在）</strong></td>\n</tr>\n<tr>\n<td>Q 网络数量</td>\n<td>1</td>\n<td>2</td>\n<td><strong>2</strong></td>\n</tr>\n<tr>\n<td>目标函数</td>\n<td>标准 RL</td>\n<td>标准 RL</td>\n<td><strong>最大熵 RL</strong></td>\n</tr>\n<tr>\n<td>价值网络</td>\n<td>无独立 V</td>\n<td>无独立 V</td>\n<td><strong>有独立 V</strong></td>\n</tr>\n<tr>\n<td>训练稳定性</td>\n<td>差</td>\n<td>较好</td>\n<td><strong>最好</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p>SAC 相比 DDPG 的核心改进在于：(1) 使用随机策略替代确定性策略，探索不再依赖外部噪声；(2) 最大熵目标提供了内在的探索驱动力；(3) 双 Q 网络 + 独立价值网络的组合使训练更加稳定。</p>\n<h5>实验亮点</h5>\n<p>SAC 在 OpenAI Gym 的 MuJoCo 连续控制基准上进行了全面评估，包括 Hopper-v1、Walker2d-v1、HalfCheetah-v1、Ant-v1 和 21 维 Humanoid 等任务。实验结果表明：</p>\n<ol>\n<li><strong>性能</strong>：SAC 在所有任务上均达到或超越当时的 SOTA，尤其在高维 Humanoid 任务上优势显著</li>\n<li><strong>稳定性</strong>：不同随机种子下的性能方差极小，远优于 DDPG 等 off-policy 方法</li>\n<li><strong>消融实验</strong>：验证了双 Q 网络、独立价值网络、随机策略等组件各自的贡献</li>\n</ol>",
      "quiz": {
        "q": "SAC 在标准 RL 目标函数基础上增加了什么项来改善探索？",
        "options": [
          "动作空间的 L2 正则化项",
          "策略熵（entropy）最大化项",
          "KL 散度惩罚项（约束新旧策略距离）",
          "好奇心驱动的内在奖励项"
        ],
        "answer": 1,
        "explain": "SAC 的核心创新是在目标函数中加入策略熵项 αH(π(·|s))，鼓励策略在完成任务的同时保持随机性，从而实现更充分的探索和更鲁棒的行为。"
      }
    },
    {
      "id": "td3",
      "num": 5,
      "name": "TD3",
      "fullName": "双延迟深度确定性策略梯度 (Twin Delayed DDPG)",
      "year": "2018",
      "org": "McGill",
      "parent": "ddpg",
      "paperUrl": "https://arxiv.org/abs/1802.09477",
      "projectUrl": "",
      "category": "foundation",
      "motivation": "双Q网络抑制值函数过估计",
      "summary": "TD3 针对 Actor-Critic 方法中函数逼近误差导致的 Q 值过估计问题，提出了**截断双 Q 学习、延迟策略更新和目标策略平滑**三项关键技术，在连续控制任务上大幅超越 DDPG 等基线，成为 off-policy 连续控制的标准算法之一。",
      "keyPoints": [
        "<strong>截断双 Q 学习 (Clipped Double Q-learning)</strong>：维护两个独立的 Critic 网络，取二者 Q 值估计的<strong>最小值</strong>作为目标值，有效抑制过估计偏差",
        "<strong>延迟策略更新 (Delayed Policy Updates)</strong>：Critic 每更新 <span class=\"kb-math kb-math-inline\">d</span> 次（默认 <span class=\"kb-math kb-math-inline\">d=2</span>），Actor 才更新一次，确保 Critic 收敛后再指导策略",
        "<strong>目标策略平滑 (Target Policy Smoothing)</strong>：在计算目标 Q 值时，向目标动作添加截断高斯噪声，起到值函数正则化的作用，防止策略利用 Q 函数的局部峰值",
        "<strong>基于 DDPG 框架</strong>：继承确定性策略梯度 + 经验回放 + 目标网络的 off-policy 架构",
        "<strong>在 OpenAI Gym MuJoCo 7 个连续控制任务上全面超越 DDPG、SAC（早期版本）等方法</strong>"
      ],
      "detail": "<h5>核心示意图</h5>\n<p><img alt=\"TD3 过估计偏差分析\" src=\"https://ar5iv.labs.arxiv.org/html/1802.09477/assets/x1.png\" />\n<em>图 1：DDPG 在 Hopper-v1 上的训练过程中，估计 Q 值（蓝色）持续高于真实回报（橙色），展示了 Actor-Critic 方法中严重的过估计现象。TD3 的核心动机即消除此偏差。</em></p>\n<p><img alt=\"TD3 与基线方法的学习曲线对比\" src=\"https://ar5iv.labs.arxiv.org/html/1802.09477/assets/x5.png\" />\n<em>图 2：TD3 在多个 MuJoCo 连续控制环境上的学习曲线对比，显著优于 DDPG、SAC、PPO 等方法。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># TD3 算法伪代码\n# 初始化\nQ_θ1, Q_θ2 = init_critics()        # 两个 Critic 网络\nπ_φ = init_actor()                   # Actor 网络\nQ_θ1', Q_θ2', π_φ' = copy_targets() # 对应的目标网络\nB = ReplayBuffer()\n\nfor t in range(T_max):\n    # 1. 环境交互：带探索噪声\n    a = π_φ(s) + ε,  ε ~ N(0, σ_explore)\n    s', r, done = env.step(a)\n    B.add(s, a, r, s', done)\n\n    # 2. 采样 mini-batch\n    (s, a, r, s', d) = B.sample(N)\n\n    # 3. 计算目标值（目标策略平滑 + 截断双 Q）\n    ã = π_φ'(s') + clip(N(0, σ_smooth), -c, c)   # 目标动作 + 截断噪声\n    y = r + γ * (1-d) * min(Q_θ1'(s', ã), Q_θ2'(s', ã))  # 取最小值\n\n    # 4. 更新两个 Critic\n    loss_critic = MSE(Q_θ1(s,a), y) + MSE(Q_θ2(s,a), y)\n    update(θ1, θ2, loss_critic)\n\n    # 5. 延迟策略更新（每 d 步更新一次 Actor 和目标网络）\n    if t % d == 0:\n        loss_actor = -mean(Q_θ1(s, π_φ(s)))   # 仅用 Q_θ1 指导策略\n        update(φ, loss_actor)\n        # 软更新目标网络\n        θ1' ← τ·θ1 + (1-τ)·θ1'\n        θ2' ← τ·θ2 + (1-τ)·θ2'\n        φ'  ← τ·φ  + (1-τ)·φ'\n</code></pre>\n<h5>动机与背景：Actor-Critic 中的过估计危机</h5>\n<p>在离散动作空间中，Q-learning 的过估计问题已被广泛研究——由于 <span class=\"kb-math kb-math-inline\">\\max</span> 操作对含噪声的 Q 值取最大，会系统性地高估真实值。Double DQN 通过解耦动作选择与值评估来缓解此问题。然而，在连续动作空间的 Actor-Critic 框架中，这一问题同样严重却长期被忽视。</p>\n<p>DDPG 中，Actor 通过梯度上升最大化 Critic 的 Q 值输出来更新策略。如果 Critic 存在过估计，Actor 就会被\"欺骗\"，倾向于选择那些被错误高估的动作。更糟糕的是，这种偏差通过时序差分 (TD) 的自举机制不断累积：</p>\n<div class=\"kb-math kb-math-display\">Q_{\\theta}(s, a) \\leftarrow r + \\gamma Q_{\\theta&#x27;}(s&#x27;, \\pi_{\\phi&#x27;}(s&#x27;))</div>\n<p>每次更新都使用了下一状态的估计值，误差会像滚雪球一样逐步放大。论文通过实验证实（如图 1），DDPG 的 Q 值估计在训练过程中会严重偏离真实回报，最终导致策略性能崩溃。</p>\n<div class=\"key-point\">💡 <strong>关键洞察</strong>：Double DQN 的思路在 Actor-Critic 中直接套用效果不佳。因为 Actor-Critic 的策略更新缓慢，当前网络和目标网络的 Q 值估计过于相似，无法真正解耦以消除偏差。</div>\n<h5>核心机制一：截断双 Q 学习 (Clipped Double Q-learning)</h5>\n<p>TD3 维护两个独立参数化的 Critic 网络 <span class=\"kb-math kb-math-inline\">Q_{\\theta_1}</span> 和 <span class=\"kb-math kb-math-inline\">Q_{\\theta_2}</span>，在计算 TD 目标时取二者的<strong>最小值</strong>：</p>\n<div class=\"kb-math kb-math-display\">y = r + \\gamma \\min_{i=1,2} Q_{\\theta&#x27;_i}(s&#x27;, \\pi_{\\phi&#x27;}(s&#x27;))</div>\n<p><strong>为什么取最小值而非均值？</strong> 取均值虽然能降低方差，但仍可能产生过估计。取最小值则提供了一个<strong>近似上界</strong>——即便某个 Critic 过估计了，另一个较低的估计也能将其拉回。这种策略倾向于产生轻微的<strong>低估</strong>，而低估在实践中远比过估计安全：低估的动作会被策略自然回避，不会像过估计那样引发正反馈循环。</p>\n<p>两个 Critic 使用相同的目标值 <span class=\"kb-math kb-math-inline\">y</span> 独立训练，损失函数为：</p>\n<div class=\"kb-math kb-math-display\">L(\\theta_i) = \\mathbb{E}\\left[(y - Q_{\\theta_i}(s, a))^2\\right], \\quad i = 1, 2</div>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：Actor 的更新仅依赖 <span class=\"kb-math kb-math-inline\">Q_{\\theta_1}</span>（而非两个 Critic 的组合），避免引入额外的耦合。</div>\n<h5>核心机制二：延迟策略更新 (Delayed Policy Updates)</h5>\n<p>传统 Actor-Critic 方法中，Actor 和 Critic 每步同时更新。但如果 Critic 尚未收敛，Actor 就会基于不准确的值函数更新策略，进而产生的新数据又反过来干扰 Critic 的学习——形成恶性循环。</p>\n<p>TD3 的解决方案极为简洁：<strong>每 <span class=\"kb-math kb-math-inline\">d</span> 次 Critic 更新才执行一次 Actor 更新</strong>（论文中 <span class=\"kb-math kb-math-inline\">d=2</span>）。这给了 Critic 足够的时间在当前策略下收敛，使得 Actor 获得更可靠的梯度信号。</p>\n<p>Actor 的更新遵循确定性策略梯度定理：</p>\n<div class=\"kb-math kb-math-display\">\\nabla_\\phi J(\\phi) = \\mathbb{E}_{s \\sim \\mathcal{B}}\\left[\\nabla_a Q_{\\theta_1}(s, a)\\big|_{a=\\pi_\\phi(s)} \\cdot \\nabla_\\phi \\pi_\\phi(s)\\right]</div>\n<p>目标网络的软更新也仅在 Actor 更新时执行：</p>\n<div class=\"kb-math kb-math-display\">\\theta&#x27;_i \\leftarrow \\tau \\theta_i + (1 - \\tau)\\theta&#x27;_i, \\quad \\phi&#x27; \\leftarrow \\tau \\phi + (1 - \\tau)\\phi&#x27;</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\tau</span> 为软更新系数（论文中 <span class=\"kb-math kb-math-inline\">\\tau = 0.005</span>）。</p>\n<h5>核心机制三：目标策略平滑 (Target Policy Smoothing)</h5>\n<p>确定性策略的一个固有问题是：Critic 可能在某些动作处形成尖锐的峰值（局部过拟合），而确定性策略恰好会精确地利用这些峰值，导致 Q 值估计不稳定。</p>\n<p>TD3 借鉴了期望 SARSA 的思想，在计算目标 Q 值时向目标动作注入<strong>截断高斯噪声</strong>：</p>\n<div class=\"kb-math kb-math-display\">\\tilde{a} = \\pi_{\\phi&#x27;}(s&#x27;) + \\epsilon, \\quad \\epsilon \\sim \\text{clip}(\\mathcal{N}(0, \\sigma), -c, c)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\sigma</span> 为噪声标准差，<span class=\"kb-math kb-math-inline\">c</span> 为截断范围（论文中 <span class=\"kb-math kb-math-inline\">\\sigma=0.2, c=0.5</span>）。这等价于对 Q 值在动作空间的局部邻域内做平滑，使得策略不会过度依赖 Q 函数的局部尖峰。截断操作确保噪声不会将动作推出有效范围。</p>\n<div class=\"key-point\">💡 <strong>直觉理解</strong>：如果一个动作只在精确的某个点上 Q 值很高，但其邻域 Q 值很低，那么加噪声后的平均 Q 值就会降低，策略不会被这种\"虚假峰值\"误导。</div>\n<h5>与 DDPG 的关键区别总结</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>DDPG</th>\n<th>TD3</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Critic 数量</td>\n<td>1 个</td>\n<td><strong>2 个</strong>（取 min）</td>\n</tr>\n<tr>\n<td>策略更新频率</td>\n<td>每步更新</td>\n<td><strong>每 <span class=\"kb-math kb-math-inline\">d</span> 步更新一次</strong></td>\n</tr>\n<tr>\n<td>目标动作噪声</td>\n<td>无</td>\n<td><strong>截断高斯噪声</strong></td>\n</tr>\n<tr>\n<td>过估计控制</td>\n<td>无显式机制</td>\n<td><strong>Clipped Double Q</strong></td>\n</tr>\n<tr>\n<td>探索噪声</td>\n<td>Ornstein-Uhlenbeck</td>\n<td><strong>简单高斯噪声</strong></td>\n</tr>\n</tbody>\n</table></div>\n<h5>默认超参数</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>参数</th>\n<th>值</th>\n<th>说明</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><span class=\"kb-math kb-math-inline\">\\tau</span></td>\n<td>0.005</td>\n<td>目标网络软更新系数</td>\n</tr>\n<tr>\n<td><span class=\"kb-math kb-math-inline\">d</span></td>\n<td>2</td>\n<td>策略延迟更新间隔</td>\n</tr>\n<tr>\n<td><span class=\"kb-math kb-math-inline\">\\sigma_{\\text{smooth}}</span></td>\n<td>0.2</td>\n<td>目标策略平滑噪声标准差</td>\n</tr>\n<tr>\n<td><span class=\"kb-math kb-math-inline\">c</span></td>\n<td>0.5</td>\n<td>噪声截断范围</td>\n</tr>\n<tr>\n<td><span class=\"kb-math kb-math-inline\">\\gamma</span></td>\n<td>0.99</td>\n<td>折扣因子</td>\n</tr>\n<tr>\n<td>batch size</td>\n<td>256</td>\n<td>小批量大小</td>\n</tr>\n<tr>\n<td>学习率</td>\n<td>3e-4</td>\n<td>Actor 和 Critic 均使用 Adam</td>\n</tr>\n</tbody>\n</table></div>",
      "quiz": {
        "q": "TD3 中使用两个 Critic 网络并取最小值的主要目的是什么？",
        "options": [
          "增加模型容量以拟合更复杂的值函数",
          "通过集成学习降低值函数的方差",
          "抑制 Q 值的过估计偏差，提供近似值上界",
          "加速 Critic 网络的收敛速度"
        ],
        "answer": 2,
        "explain": "取两个独立 Critic 的最小值可以有效抑制过估计偏差。即使其中一个 Critic 过估计，较低的那个估计也能将目标值拉回，倾向于产生轻微低估而非危险的过估计。"
      }
    },
    {
      "id": "domain_rand",
      "num": 6,
      "name": "Domain Randomization",
      "fullName": "域随机化 (Domain Randomization)",
      "year": "2017",
      "org": "OpenAI",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/1703.06907",
      "projectUrl": "",
      "category": "sim2real",
      "motivation": "仿真参数随机化实现零样本迁移",
      "summary": "Domain Randomization 提出在仿真器中对纹理、光照、相机位姿和干扰物等视觉参数进行大规模随机化，使得仅在合成数据上训练的目标检测网络能够零样本迁移到真实世界，在物体定位任务上达到 1.5 cm 精度并成功完成机器人抓取。",
      "keyPoints": [
        "<strong>零样本 Sim-to-Real 迁移</strong>：完全不使用真实图像数据，仅依赖仿真渲染的随机化图像训练目标检测器，即可在真实场景中工作",
        "<strong>多维度域随机化</strong>：同时随机化纹理（桌面/地板/天空盒/物体）、光照（数量/位置/颜色）、相机（位置/朝向/FOV）、物体位姿和干扰物（0-10 个随机几何体）",
        "<strong>VGG-16 回归架构</strong>：基于 VGG-16 提取特征，接全连接层直接回归物体的 <span class=\"kb-math kb-math-inline\">(x, y, z)</span> 三维坐标",
        "<strong>纹理数量是关键因素</strong>：消融实验表明纹理种类超过 1000 时性能显著提升，此时甚至不需要 ImageNet 预训练",
        "<strong>干扰物对鲁棒性至关重要</strong>：训练时加入随机干扰物体，使模型在真实杂乱场景中仍能准确定位",
        "<strong>端到端抓取验证</strong>：在 Fetch 机器人上实现了 76.6% 的杂乱场景抓取成功率，全部视觉能力来自仿真训练"
      ],
      "detail": "<h5>方法总览</h5>\n<p><img alt=\"Domain Randomization 方法总览\" src=\"https://ar5iv.labs.arxiv.org/html/1703.06907/assets/x1.png\" />\n<em>图 1：Domain Randomization 方法示意。在仿真中对场景进行大规模随机化渲染（左），训练目标检测器后直接部署到真实世界（右）。核心思想是让真实世界成为随机化训练分布中的\"普通一员\"。</em></p>\n<h5>核心思想：让真实世界变得\"不特殊\"</h5>\n<p>Domain Randomization 的核心直觉非常优雅：<strong>如果仿真训练数据的视觉多样性足够大，那么真实世界的外观只不过是这个巨大分布中的又一个采样点</strong>。模型被迫学习对视觉外观变化不变的特征表示，从而自然地泛化到真实场景。</p>\n<div class=\"key-point\">💡 <strong>关键洞察</strong>：与传统 sim-to-real 方法追求\"逼真仿真\"不同，Domain Randomization 反其道而行之——故意让仿真场景看起来\"不真实但多样\"，通过覆盖足够大的外观空间来包含真实世界。</div>\n<h5>模型架构</h5>\n<p><img alt=\"VGG-16 目标检测架构\" src=\"https://ar5iv.labs.arxiv.org/html/1703.06907/assets/x2.png\" />\n<em>图 2：基于 VGG-16 的目标定位网络架构。卷积特征提取后接全连接层，直接回归物体的三维坐标。</em></p>\n<p>网络架构基于 VGG-16，具体设计如下：</p>\n<ol>\n<li><strong>特征提取</strong>：使用 VGG-16 的卷积层（可选 ImageNet 预训练权重）</li>\n<li><strong>回归头</strong>：在 VGG-16 的 <code>pool5</code> 层后接两个全连接层（分别为 4096 和 4096 维），最终输出 3 维向量 <span class=\"kb-math kb-math-inline\">(x, y, z)</span></li>\n<li><strong>损失函数</strong>：采用 L2 损失直接回归物体的三维笛卡尔坐标</li>\n</ol>\n<div class=\"kb-math kb-math-display\">\\mathcal{L} = \\| \\hat{\\mathbf{p}} - \\mathbf{p}^* \\|_2^2</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\hat{\\mathbf{p}} = (\\hat{x}, \\hat{y}, \\hat{z})</span> 为网络预测坐标，<span class=\"kb-math kb-math-inline\">\\mathbf{p}^* = (x^*, y^*, z^*)</span> 为真实坐标。</p>\n<h5>随机化参数空间</h5>\n<p>Domain Randomization 的核心在于对仿真渲染的多个维度同时进行随机化。每次渲染一张训练图像时，以下参数均从均匀分布中独立采样：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th style=\"text-align: left;\">随机化维度</th>\n<th style=\"text-align: left;\">具体参数</th>\n<th style=\"text-align: left;\">采样范围</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td style=\"text-align: left;\"><strong>纹理</strong></td>\n<td style=\"text-align: left;\">桌面、地板、天空盒、目标物体、干扰物体的纹理</td>\n<td style=\"text-align: left;\">从纹理库中随机选取并施加随机颜色</td>\n</tr>\n<tr>\n<td style=\"text-align: left;\"><strong>光照</strong></td>\n<td style=\"text-align: left;\">光源数量（1-4）、位置、颜色</td>\n<td style=\"text-align: left;\">位置在场景上方随机，颜色 RGB 各通道独立采样</td>\n</tr>\n<tr>\n<td style=\"text-align: left;\"><strong>相机</strong></td>\n<td style=\"text-align: left;\">位置、朝向、视场角（FOV）</td>\n<td style=\"text-align: left;\">在目标物体周围的球壳区域内采样</td>\n</tr>\n<tr>\n<td style=\"text-align: left;\"><strong>物体位姿</strong></td>\n<td style=\"text-align: left;\">目标物体在桌面上的 <span class=\"kb-math kb-math-inline\">(x, y)</span> 位置和旋转角</td>\n<td style=\"text-align: left;\">桌面范围内均匀采样</td>\n</tr>\n<tr>\n<td style=\"text-align: left;\"><strong>干扰物</strong></td>\n<td style=\"text-align: left;\">数量（0-10）、形状、大小、位置、纹理</td>\n<td style=\"text-align: left;\">随机几何体散布在桌面上</td>\n</tr>\n<tr>\n<td style=\"text-align: left;\"><strong>噪声</strong></td>\n<td style=\"text-align: left;\">像素级随机噪声</td>\n<td style=\"text-align: left;\">叠加到最终渲染图像上</td>\n</tr>\n</tbody>\n</table></div>\n<p><img alt=\"随机化训练图像示例\" src=\"https://ar5iv.labs.arxiv.org/html/1703.06907/assets/example_imgs.png\" />\n<em>图 7：Domain Randomization 生成的训练图像示例。注意纹理、光照、干扰物的巨大多样性。</em></p>\n<h5>训练流程伪代码</h5>\n<pre><code class=\"language-python\"># Domain Randomization 训练流程\ndef generate_randomized_scene(simulator, texture_library):\n    &quot;&quot;&quot;在仿真器中生成一个随机化场景&quot;&quot;&quot;\n    # 1. 随机化纹理\n    for surface in [table, floor, skybox, target_object]:\n        surface.texture = random.choice(texture_library)\n        surface.color = random_rgb()\n\n    # 2. 随机化光照\n    n_lights = random.randint(1, 4)\n    for _ in range(n_lights):\n        add_light(position=random_position_above_table(),\n                  color=random_rgb())\n\n    # 3. 随机化相机\n    camera.position = sample_on_sphere(center=table_center, \n                                        radius=random.uniform(r_min, r_max))\n    camera.fov = random.uniform(fov_min, fov_max)\n\n    # 4. 随机放置目标物体\n    target.position = random_position_on_table()\n    target.rotation = random.uniform(0, 2 * pi)\n\n    # 5. 添加随机干扰物\n    n_distractors = random.randint(0, 10)\n    for _ in range(n_distractors):\n        add_distractor(shape=random_geometry(),\n                       position=random_position_on_table(),\n                       texture=random.choice(texture_library))\n\n    # 6. 渲染并添加噪声\n    image = simulator.render()\n    image += random_noise()\n    label = target.get_3d_position()\n    return image, label\n\n# 主训练循环\nmodel = VGG16_Regressor(output_dim=3)\nfor iteration in range(100000):\n    image, label = generate_randomized_scene(mujoco_sim, textures)\n    prediction = model(image)\n    loss = l2_loss(prediction, label)\n    optimizer.step(loss)\n</code></pre>\n<h5>动机与背景：为什么需要 Domain Randomization？</h5>\n<p>传统的 sim-to-real 迁移面临一个根本矛盾：<strong>仿真器永远无法完美复现真实世界的视觉复杂性</strong>。此前的方法主要有两条路径：</p>\n<ol>\n<li><strong>提升仿真逼真度</strong>（Photorealistic Rendering）：通过精细建模材质、光照、物理属性来缩小 sim-real gap。但这需要大量人工标注和领域知识，且总存在未建模的视觉差异。</li>\n<li><strong>域适应</strong>（Domain Adaptation）：利用 GAN 等方法将仿真图像转换为\"看起来像真实的\"图像，或学习域不变特征。但这仍然需要真实世界的无标签数据。</li>\n</ol>\n<p>Domain Randomization 提出了第三条路径：<strong>不追求逼真，而是追求多样性</strong>。这一思路的理论基础是：</p>\n<div class=\"kb-math kb-math-display\">P(\\text{real} \\in \\text{support}(\\mathcal{D}_{\\text{rand}})) \\to 1 \\quad \\text{as} \\quad |\\text{randomization}| \\to \\infty</div>\n<p>即当随机化的范围足够大时，真实世界的视觉外观几乎必然落在训练分布的支撑集内。</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：这并不意味着随机化越极端越好。论文的消融实验表明，随机化参数的范围需要合理设置——过小则无法覆盖真实分布，过大则引入过多噪声降低学习效率。</div>\n<h5>关键实验发现</h5>\n<p><strong>1. 纹理数量的临界效应</strong></p>\n<p><img alt=\"纹理数量消融实验\" src=\"https://ar5iv.labs.arxiv.org/html/1703.06907/assets/texture_ablation.png\" />\n<em>图 5：纹理数量对真实世界检测精度的影响。当纹理数量超过约 1000 时，性能出现显著跃升。</em></p>\n<p>这是论文最重要的发现之一：纹理多样性存在一个<strong>临界点</strong>。当纹理库中的纹理数量从 10 增加到 100 时，性能提升有限；但从 100 增加到 1000 以上时，真实世界的检测精度出现质的飞跃。这说明：\n- 少量纹理变化不足以让模型学到真正的形状特征\n- 超过临界点后，模型被迫放弃依赖纹理线索，转而学习更本质的几何特征</p>\n<p><strong>2. 预训练 vs 随机初始化</strong></p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th style=\"text-align: left;\">配置</th>\n<th style=\"text-align: left;\">真实世界误差 (cm)</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td style=\"text-align: left;\">ImageNet 预训练 + 少量纹理</td>\n<td style=\"text-align: left;\">较低</td>\n</tr>\n<tr>\n<td style=\"text-align: left;\">随机初始化 + 少量纹理</td>\n<td style=\"text-align: left;\">较高</td>\n</tr>\n<tr>\n<td style=\"text-align: left;\">ImageNet 预训练 + 大量纹理 (&gt;1000)</td>\n<td style=\"text-align: left;\">最低</td>\n</tr>\n<tr>\n<td style=\"text-align: left;\">随机初始化 + 大量纹理 (&gt;1000)</td>\n<td style=\"text-align: left;\">接近最低</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 <strong>关键发现</strong>：当纹理数量足够多时，ImageNet 预训练带来的优势几乎消失。这意味着 Domain Randomization 本身就能提供足够丰富的视觉先验。</div>\n<p><strong>3. 各随机化维度的贡献</strong></p>\n<p>论文通过逐一移除各随机化维度进行消融：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th style=\"text-align: left;\">移除的随机化维度</th>\n<th style=\"text-align: left;\">对精度的影响</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td style=\"text-align: left;\">移除纹理随机化</td>\n<td style=\"text-align: left;\"><strong>严重下降</strong>（最关键因素）</td>\n</tr>\n<tr>\n<td style=\"text-align: left;\">移除干扰物</td>\n<td style=\"text-align: left;\">显著下降（尤其在杂乱场景中）</td>\n</tr>\n<tr>\n<td style=\"text-align: left;\">移除相机随机化</td>\n<td style=\"text-align: left;\">轻微下降</td>\n</tr>\n<tr>\n<td style=\"text-align: left;\">移除光照随机化</td>\n<td style=\"text-align: left;\">轻微下降</td>\n</tr>\n</tbody>\n</table></div>\n<p>纹理随机化是最关键的因素，其次是干扰物。这与直觉一致：纹理变化迫使模型学习形状而非颜色/纹理特征，干扰物则训练模型在杂乱中定位目标。</p>\n<p><strong>4. 真实世界抓取验证</strong></p>\n<p><img alt=\"机器人抓取示例\" src=\"https://ar5iv.labs.arxiv.org/html/1703.06907/assets/grasping_vF.png\" />\n<em>图 6：Fetch 机器人使用仅在仿真中训练的视觉模型执行真实世界抓取任务。</em></p>\n<p>在 Fetch 机器人平台上，使用仅在仿真中训练的目标检测器，配合简单的抓取策略，实现了：\n- <strong>单物体场景</strong>：接近 100% 的抓取成功率\n- <strong>杂乱场景（5 个物体）</strong>：76.6% 的抓取成功率\n- <strong>定位精度</strong>：约 1.5 cm 的三维定位误差</p>\n<h5>与传统方法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th style=\"text-align: left;\">方法</th>\n<th style=\"text-align: left;\">是否需要真实数据</th>\n<th style=\"text-align: left;\">仿真要求</th>\n<th style=\"text-align: left;\">泛化能力</th>\n<th style=\"text-align: left;\">工程复杂度</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td style=\"text-align: left;\"><strong>真实数据训练</strong></td>\n<td style=\"text-align: left;\">✅ 大量标注</td>\n<td style=\"text-align: left;\">不需要</td>\n<td style=\"text-align: left;\">受限于数据分布</td>\n<td style=\"text-align: left;\">数据采集成本高</td>\n</tr>\n<tr>\n<td style=\"text-align: left;\"><strong>逼真仿真</strong></td>\n<td style=\"text-align: left;\">❌</td>\n<td style=\"text-align: left;\">极高逼真度</td>\n<td style=\"text-align: left;\">受限于仿真精度</td>\n<td style=\"text-align: left;\">建模成本极高</td>\n</tr>\n<tr>\n<td style=\"text-align: left;\"><strong>域适应 (DA)</strong></td>\n<td style=\"text-align: left;\">⚠️ 需无标签真实数据</td>\n<td style=\"text-align: left;\">中等</td>\n<td style=\"text-align: left;\">依赖适应质量</td>\n<td style=\"text-align: left;\">需训练额外模型</td>\n</tr>\n<tr>\n<td style=\"text-align: left;\"><strong>Domain Randomization</strong></td>\n<td style=\"text-align: left;\">❌</td>\n<td style=\"text-align: left;\">低（仅需基本渲染）</td>\n<td style=\"text-align: left;\">强（覆盖大分布）</td>\n<td style=\"text-align: left;\">低（仅需调参数范围）</td>\n</tr>\n</tbody>\n</table></div>\n<p>Domain Randomization 的最大优势在于<strong>极低的工程门槛</strong>：不需要精细的 3D 资产、不需要真实数据采集、不需要复杂的域适应训练，只需要一个基本的物理仿真器和一组随机纹理。</p>",
      "quiz": {
        "q": "Domain Randomization 消融实验中，对 sim-to-real 迁移性能影响最大的随机化维度是什么？",
        "options": [
          "光照随机化（光源数量、位置、颜色）",
          "纹理随机化（桌面、物体、地板等表面纹理）",
          "相机随机化（位置、朝向、视场角）",
          "物体位姿随机化（目标物体的位置和旋转）"
        ],
        "answer": 1,
        "explain": "论文消融实验明确表明纹理随机化是最关键的因素，移除后性能严重下降。纹理多样性迫使模型学习基于形状而非颜色/纹理的特征表示，这是实现 sim-to-real 泛化的核心。"
      }
    },
    {
      "id": "viral",
      "num": 7,
      "name": "VIRAL",
      "fullName": "视觉Sim2Real大规模迁移 (Visual Sim-to-Real at Scale)",
      "year": "2026",
      "org": "UPenn",
      "parent": "domain_rand",
      "paperUrl": "https://tairanhe.com/",
      "projectUrl": "",
      "category": "sim2real",
      "motivation": "大规模视觉随机化+Real2Sim对齐",
      "summary": "VIRAL 提出了一套完整的 Teacher-Student 视觉 Sim-to-Real 框架，通过特权教师 RL 训练 + RGB 学生蒸馏 + 大规模视觉/物理域随机化，使 29-DoF 人形机器人仅凭单目 RGB 图像即可零样本部署完成长时程移动操作（行走-放置-抓取-转身），在 59 次连续真实世界试验中达到 91.5% 成功率，速度超越人类专家遥操作。",
      "keyPoints": [
        "<strong>Teacher-Student 两阶段范式</strong>：Teacher 使用特权状态观测（物体位姿、阶段标签等）+ PPO 训练；Student 使用 RGB 图像 + 本体感知，通过蒸馏学习",
        "<strong>Teacher 四大关键设计</strong>：",
        "分阶段奖励设计（walk / place / grasp / turn 四类奖励）",
        "Delta 动作空间（输出增量而非绝对关节角，显著加速训练）",
        "WBC（HOMIE）作为底层 API（策略输出高层命令而非底层力矩）",
        "参考状态初始化 RSI（从 200 条仿真遥操作演示中采样初始状态）",
        "<strong>Student 三大关键设计</strong>：",
        "DAgger + BC 混合蒸馏（<span class=\"kb-math kb-math-inline\">\\alpha=0.5</span> 混合教师/学生 rollout）",
        "DINOv3 视觉骨干网络提取 RGB 特征",
        "分布式仿真训练系统（最高 64 GPU 并行，近线性加速）",
        "<strong>Sim-to-Real 三大关键设计</strong>：",
        "灵巧手系统辨识 SysID（校准手指 armature/stiffness/damping）",
        "相机外参对齐 + 外参随机化",
        "大规模视觉域随机化（材质/光照/图像质量/相机延迟）",
        "<strong>实验结果</strong>：59 次连续试验 54 次成功（91.5%），周期时间 20.2s 快于专家 21.4s",
        "<strong>全面消融</strong>：验证了 RSI、delta action、DINOv3、DAgger-BC 比例、历史架构、域随机化、GPU 规模等 10 个设计选择的必要性"
      ],
      "detail": "<p><img alt=\"VIRAL 框架总览\" src=\"https://arxiv.org/html/2511.15200v1/x2.png\" />\n<em>图：VIRAL 训练流程。左侧 Teacher 使用特权状态观测 + PPO 训练；右侧 Student 通过 DAgger/BC 蒸馏，以 RGB 图像 + 本体感知作为输入，最终部署到真实机器人。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># ========== 阶段 1: Teacher 训练 (PPO + 特权观测) ==========\nteacher = PolicyNetwork(input_dim=226)  # 特权状态观测\nwbc = HOMIE_Controller()  # 全身控制器作为底层 API\ndemo_buffer = load_teleop_demos(n=200)  # 200 条仿真遥操作演示\n\nfor episode in range(N_episodes):\n    # 参考状态初始化 (RSI): 从演示中采样场景快照\n    snapshot = sample(demo_buffer)\n    env.reset(robot=snapshot.robot, objects=snapshot.objects, tables=snapshot.tables)\n\n    for t in range(T):\n        o_t = [o_proprio, o_exte_priv]  # 本体感知 + 特权外感知\n        delta_a = teacher(o_t)           # 输出 delta 动作增量\n        wbc_cmd += delta_a               # 累加到 WBC 命令\n        wbc.execute(wbc_cmd)             # WBC 执行底层控制\n\n        # 分阶段奖励: r = Σ w_i * 1(stage==i) * r_i\n        r = stage_weighted_reward(walk=r_walk, place=r_place, \n                                   grasp=r_grasp, turn=r_turn)\n    PPO_update(teacher, trajectories)\n\n# ========== 阶段 2: Student 蒸馏 (DAgger + BC) ==========\nstudent = VisionPolicy(backbone=DINOv3(), input_dim=113+128)\nalpha = 0.5  # teacher/student rollout 混合比例\n\nfor iteration in range(M):\n    # 混合 rollout: α 比例用 teacher, (1-α) 比例用 student\n    obs_teacher = rollout(env, teacher, frac=alpha)    # BC 数据\n    obs_student = rollout(env, student, frac=1-alpha)  # DAgger 数据\n\n    # 蒸馏损失: MSE(teacher_action, student_action)\n    for o_t, o_s in mix(obs_teacher, obs_student):\n        rgb_feat = DINOv3(o_t.image)  # 108×192 RGB → 128-dim\n        a_student = student(rgb_feat, o_t.proprio)\n        a_teacher = teacher(o_t.privileged)\n        loss = MSE(a_teacher, a_student)\n        optimizer.step(loss)\n</code></pre>\n<h5>动机与背景</h5>\n<p>人形机器人的移动操作（loco-manipulation）要求机器人在行走的同时完成抓取、放置等精细操作，是通往通用家庭服务机器人的关键能力。现有方法面临三大困境：</p>\n<ol>\n<li><strong>纯遥操作 + 模仿学习</strong>：需要大量真实世界数据采集，成本高昂且难以泛化</li>\n<li><strong>纯 Sim-to-Real 运动控制</strong>：虽然盲行走已经成熟，但缺乏视觉感知无法完成操作任务</li>\n<li><strong>视觉 Sim-to-Real 操作</strong>：主要局限于桌面场景，未扩展到全身移动操作</li>\n</ol>\n<p>VIRAL 的核心洞察是：将成熟的 Sim-to-Real 运动控制（通过 WBC 封装）与大规模视觉域随机化结合，通过 Teacher-Student 范式实现端到端的 RGB 移动操作策略。</p>\n<h5>核心机制详解</h5>\n<p><strong>1. Delta 动作空间 vs 绝对动作空间</strong></p>\n<p>传统腿式运动 RL 通常输出绝对关节目标角度。VIRAL 发现对于移动操作任务，delta 动作空间（输出增量）至关重要：</p>\n<div class=\"kb-math kb-math-display\">a_t^{\\text{abs}} = a_{t-1}^{\\text{abs}} + \\Delta a_t, \\quad \\Delta a_t = \\pi_\\theta(o_t)</div>\n<p>直觉上，delta 动作提供了一种隐式的\"位置记忆\"——策略只需关注\"如何微调\"而非\"从零开始到达目标\"，这大幅降低了学习难度。消融实验（Figure 9）表明，绝对动作空间完全无法收敛。</p>\n<p><strong>2. 参考状态初始化 (RSI)</strong></p>\n<p>长时程任务（行走→放置→抓取→转身）的探索空间极大，从零开始的 RL 几乎无法发现有效行为。VIRAL 收集 200 条仿真遥操作演示，在每个 episode 重置时随机采样一个演示快照作为初始状态：</p>\n<div class=\"key-point\">💡 <strong>关键</strong>：RSI 不是模仿学习——它不约束策略动作，只是将机器人\"传送\"到任务中间的各种状态，让策略从一开始就能体验到抓取成功等稀疏奖励信号。</div>\n<p>消融表明（Figure 9），没有 RSI 的 Teacher 成功率停滞在 10% 以下，而有 RSI 的达到 95%。</p>\n<p><strong>3. WBC 作为安全 API 层</strong></p>\n<p>VIRAL 不直接输出底层关节力矩，而是输出 HOMIE 全身控制器的高层命令（速度/高度跟踪 + 上半身关节 + 手指动作）：</p>\n<div class=\"kb-math kb-math-display\">\\text{Action Space} = [\\underbrace{v_x, v_y, \\omega, h}_{\\text{locomotion}} , \\underbrace{q_{\\text{upper}}}_{\\text{upper body}} , \\underbrace{q_{\\text{finger}}}_{\\text{fingers}}]</div>\n<p>这将策略的动作空间限制在安全可靠的运动区域内，显著提升了 Sim-to-Real 的可部署性。</p>\n<p><strong>4. DAgger + BC 混合蒸馏</strong></p>\n<p>纯 BC（<span class=\"kb-math kb-math-inline\">\\alpha=1</span>）只在教师分布上训练，学生遇到自身误差导致的分布偏移时无法纠错；纯 DAgger（<span class=\"kb-math kb-math-inline\">\\alpha=0</span>）收敛慢。VIRAL 采用混合策略：</p>\n<div class=\"kb-math kb-math-display\">\\rho^o = \\alpha \\cdot \\rho^o_{\\pi_{\\text{teacher}}} + (1-\\alpha) \\cdot \\rho^o_{\\pi_{\\text{student}}}</div>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{distill}} = \\mathbb{E}_{o_t \\sim \\rho^o} \\left[ \\| \\pi_{\\text{teacher}}(o_t^{\\text{teacher}}) - \\pi_{\\text{student}}(o_t^{\\text{student}}) \\|_2^2 \\right]</div>\n<p><span class=\"kb-math kb-math-inline\">\\alpha=0.5</span> 在训练速度和部署鲁棒性之间取得最佳平衡（Figure 11）。</p>\n<p><strong>5. 大规模视觉域随机化</strong></p>\n<p>为弥合 Sim-to-Real 视觉差距，VIRAL 在训练中随机化：\n- <strong>图像质量</strong>：亮度、对比度、色调、饱和度、高斯噪声、模糊\n- <strong>相机外参</strong>：模拟硬件制造公差和漂移\n- <strong>全局光照</strong>：穹顶光环境贴图\n- <strong>材质属性</strong>：地板、桌子、物体、机器人部件的颜色和材质</p>\n<p>消融（Figure 13）表明关闭所有随机化导致性能下降 35.1%，且各组件互补。</p>\n<p><strong>6. 计算规模的关键作用</strong></p>\n<p>VIRAL 发现 GPU 规模不仅加速训练，还直接影响最终性能：\n- <strong>Teacher</strong>：1-2 GPU 永远无法达到高成功率，8-16 GPU 才能突破 90%（Figure 14）\n- <strong>Student</strong>：64 GPU 训练不仅更快收敛，还获得更高的最终成功率和更平滑的优化曲线（Figure 15）</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：大规模计算不是\"锦上添花\"而是\"必要条件\"——不充分的计算资源会导致策略永远无法收敛到可部署水平。</div>\n<h5>分阶段奖励设计</h5>\n<p>任务被分解为 5 个阶段（行走→预放置→放置→抓取提升→转身），总奖励为阶段加权和：</p>\n<div class=\"kb-math kb-math-display\">r_t = \\sum_{i=0}^{4} w_i \\cdot \\mathbb{1}(\\text{stage} = i) \\cdot r_i</div>\n<p>四类核心奖励：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>奖励</th>\n<th>公式</th>\n<th>直觉</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>行走</td>\n<td><span class=\"kb-math kb-math-inline\">r_{\\text{walk}} = \\exp(-4(\\|p_{\\text{robot}} - p_{\\text{obj}}\\| - 0.45)^2)</span></td>\n<td>引导机器人走向目标物体，0.45m 为最佳抓取距离</td>\n</tr>\n<tr>\n<td>放置</td>\n<td><span class=\"kb-math kb-math-inline\">r_{\\text{place}} = -\\|f_{\\text{PlaceObj}}\\| \\cdot \\mathbb{1}(\\|p_{\\text{obj}} - p_{\\text{tray}}\\| &lt; 0.3)</span></td>\n<td>在托盘附近时鼓励松手（减小指尖力）</td>\n</tr>\n<tr>\n<td>抓取</td>\n<td><span class=\"kb-math kb-math-inline\">r_{\\text{grasp}} = \\min(h_{\\text{obj}} - h_{\\text{table}}, 0.15)</span></td>\n<td>鼓励将物体提升离桌面，上限 0.15m</td>\n</tr>\n<tr>\n<td>转身</td>\n<td><span class=\"kb-math kb-math-inline\">r_{\\text{turn}} = -|y_{\\text{robot}} - y_{\\text{desired}}|</span></td>\n<td>最小化当前朝向与目标朝向的偏差</td>\n</tr>\n</tbody>\n</table></div>\n<h5>与现有方法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th>遥操作+模仿学习</th>\n<th>盲 Sim-to-Real 运动</th>\n<th>VIRAL</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>感知模态</td>\n<td>RGB（真实数据）</td>\n<td>无/深度</td>\n<td>RGB（仿真数据）</td>\n</tr>\n<tr>\n<td>操作能力</td>\n<td>✅ 灵巧</td>\n<td>❌ 无</td>\n<td>✅ 灵巧手</td>\n</tr>\n<tr>\n<td>移动能力</td>\n<td>✅</td>\n<td>✅</td>\n<td>✅</td>\n</tr>\n<tr>\n<td>真实数据需求</td>\n<td>大量</td>\n<td>零</td>\n<td>零</td>\n</tr>\n<tr>\n<td>泛化性</td>\n<td>依赖数据覆盖</td>\n<td>强（运动）</td>\n<td>强（视觉+运动）</td>\n</tr>\n<tr>\n<td>部署速度</td>\n<td>受遥操作者限制</td>\n<td>实时</td>\n<td>实时（20.2s/周期）</td>\n</tr>\n</tbody>\n</table></div>",
      "quiz": {
        "q": "VIRAL 框架中，参考状态初始化 (RSI) 的核心作用是什么？",
        "options": [
          "约束策略动作使其模仿演示轨迹",
          "将 episode 初始状态设置为演示中的多样化中间状态，加速稀疏奖励的探索",
          "替代奖励函数，直接用演示作为监督信号",
          "减少仿真环境的域随机化需求"
        ],
        "answer": 1,
        "explain": "RSI 不约束策略动作（非模仿学习），而是在每次 episode 重置时从 200 条遥操作演示中采样场景快照作为初始状态，使策略从一开始就能体验到任务各阶段的奖励信号，解决长时程任务的探索瓶颈。消融实验表明没有 RSI 成功率停滞在 10% 以下。"
      }
    },
    {
      "id": "lfi_dr",
      "num": 8,
      "name": "LFI-DR",
      "fullName": "似然无关推理域随机化 (Likelihood-Free Inference DR)",
      "year": "2026",
      "org": "Edinburgh",
      "parent": "domain_rand",
      "paperUrl": "https://arxiv.org/abs/2602.05678",
      "projectUrl": "",
      "category": "sim2real",
      "motivation": "似然无关推理计算物理参数后验",
      "summary": "LFI-DR 的核心目标是：似然无关推理计算物理参数后验。",
      "keyPoints": [
        "核心动机：似然无关推理计算物理参数后验",
        "演化来源：继承或改进自 domain_rand",
        "代表机构：Edinburgh"
      ],
      "detail": "<p>似然无关推理计算物理参数后验</p>"
    },
    {
      "id": "falcon",
      "num": 9,
      "name": "FALCON",
      "fullName": "力自适应移动操控 (Force-Adaptive Loco-manipulation)",
      "year": "2026",
      "org": "L4DC",
      "parent": "sac",
      "paperUrl": "https://arxiv.org/abs/2602.08901",
      "projectUrl": "",
      "category": "sim2real",
      "motivation": "双智能体RL力自适应控制",
      "summary": "FALCON 提出了一种**双智能体强化学习**框架，将人形机器人的上半身（操控）与下半身（运动）解耦为两个协作策略，并设计了**力矩极限感知的 3D 力课程训练**机制，使机器人无需力传感器即可在 sim-to-real 中完成负载搬运、拉车、开门等力自适应移动操控任务。",
      "keyPoints": [
        "<strong>双智能体架构</strong>：上半身 RL 智能体负责关节跟踪（隐式力补偿），下半身 RL 智能体负责速度跟踪与步态稳定，两者共享本体感知信息并联合训练",
        "<strong>力矩极限感知的 3D 力课程</strong>：通过雅可比矩阵和关节力矩上限计算末端执行器可承受的最大力，结合 Dirichlet 分布在 3D 力空间中采样训练力，并通过渐进式缩放因子 <span class=\"kb-math kb-math-inline\">\\alpha_g</span> 逐步增加力的强度",
        "<strong>非对称 Actor-Critic</strong>：Actor 仅使用本体感知，Critic 额外获取特权信息（真实根速度、末端执行器外力），提升训练效率",
        "<strong>AMASS 动作捕捉数据集</strong>驱动上半身目标姿态采样，使策略泛化到多种操控姿势",
        "<strong>跨平台验证</strong>：在 Unitree G1 和 Booster T1 两款人形机器人上实现 sim-to-real 部署，完成 0–20N 负载搬运、0–100N 拉车、0–40N 开门等任务"
      ],
      "detail": "<p><img alt=\"FALCON 系统总览\" src=\"https://ar5iv.labs.arxiv.org/html/2505.06776/assets/x2.png\" />\n<em>图：FALCON 双智能体训练框架。上半身智能体跟踪参考关节角度（来自 AMASS 数据集采样），下半身智能体跟踪速度指令。训练时通过 3D 力课程在末端执行器施加随机外力，Critic 获取特权信息（根速度、外力）。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># FALCON 双智能体联合训练伪代码\nInitialize: upper_policy πU, lower_policy πL, critics VU, VL\nLoad: AMASS motion dataset for upper-body reference poses\n\nfor iteration in range(N_iterations):\n    # === 力课程采样 ===\n    for each environment:\n        # 1. 计算当前姿态下的力矩极限 → 力空间边界\n        J_EE = compute_jacobian(q_upper)           # 末端执行器雅可比\n        tau_margin = tau_max - tau_gravity(q)       # 可用力矩余量\n        F_max_per_axis = J_EE_inv_T @ tau_margin   # 各轴最大可施加力 (Eq.3)\n\n        # 2. Dirichlet 分布采样力方向 + 渐进缩放\n        d ~ Dirichlet(α=1, k=3)                    # 3D 方向权重\n        F_applied = α_g * d * F_max_per_axis        # α_g ∈ [0,1] 渐进增大 (Eq.5)\n        apply_force(F_applied, at=EE_position + Δp)  # Δp 随机偏移\n\n    # === 上半身智能体 ===\n    s_upper = [q, dq, ω_root, g, a_{t-1}^U]       # 本体感知\n    a_upper = πU(s_upper)                           # 输出: 上半身关节目标\n    r_upper = exp(-||q_upper - q_ref||² / σ²)      # 关节跟踪奖励\n\n    # === 下半身智能体 ===\n    s_lower = [q, dq, ω_root, g, a_{t-1}^L, v_cmd, h_cmd, ω_cmd, phase]\n    a_lower = πL(s_lower)                           # 输出: 下半身关节目标\n    r_lower = r_vel + r_height + r_gait + r_penalty # 运动跟踪奖励\n\n    # === PPO 更新（非对称 Critic）===\n    s_critic_U = [s_upper, v_root_true, F_EE_true]  # 特权信息\n    s_critic_L = [s_lower, v_root_true, F_EE_true]\n    Update πU, πL, VU, VL via PPO with clipped objective\n</code></pre>\n<h5>动机与背景</h5>\n<p>人形机器人的移动操控（loco-manipulation）要求同时完成稳定行走和上肢力交互，这在传统方法中面临两大挑战：</p>\n<ol>\n<li><strong>力感知困难</strong>：大多数消费级人形机器人不配备末端力/力矩传感器，无法直接测量交互力</li>\n<li><strong>上下肢耦合</strong>：上半身施加或承受外力时，会通过动力学耦合影响下半身的平衡与步态</li>\n</ol>\n<p>现有方法要么依赖力传感器进行显式力补偿（如 Lower-RL-Upper-IK + Force Estimator），要么仅在 2D 平面施加简单推力进行鲁棒性训练，无法处理复杂的 3D 力交互场景。</p>\n<div class=\"key-point\">💡 <strong>关键洞察</strong>：FALCON 的核心思想是——与其估计力再补偿，不如让策略在训练中<strong>隐式学会</strong>应对各种力扰动。通过在物理仿真中系统性地施加力矩极限范围内的 3D 外力，策略自然获得力自适应能力。</div>\n<h5>核心机制详解</h5>\n<p><strong>1. 双智能体分离训练</strong></p>\n<p>FALCON 将全身控制分解为两个独立但协作的 RL 智能体：</p>\n<ul>\n<li><strong>上半身智能体 <span class=\"kb-math kb-math-inline\">\\pi^U</span></strong>：观测本体感知 <span class=\"kb-math kb-math-inline\">s^U_t = [q_{t-4:t}, \\dot{q}_{t-4:t}, \\omega^{\\text{root}}_{t-4:t}, g_{t-4:t}, a^U_{t-1}]</span>，输出上半身关节 PD 目标。奖励函数为关节角度跟踪误差：</li>\n</ul>\n<div class=\"kb-math kb-math-display\">r^U_t = \\exp\\!\\left(-\\frac{\\|q^{\\text{upper}}_t - q^{\\text{ref}}_t\\|^2}{\\sigma^2}\\right)</div>\n<ul>\n<li><strong>下半身智能体 <span class=\"kb-math kb-math-inline\">\\pi^L</span></strong>：额外观测速度指令 <span class=\"kb-math kb-math-inline\">v^{\\text{cmd}}</span>、高度指令 <span class=\"kb-math kb-math-inline\">h^{\\text{cmd}}</span>、角速度指令 <span class=\"kb-math kb-math-inline\">\\omega^{\\text{cmd}}</span> 和步态相位 <span class=\"kb-math kb-math-inline\">\\phi_t</span>，输出下半身关节 PD 目标。奖励包含速度跟踪、高度跟踪、步态周期奖励和多项稳定性惩罚。</li>\n</ul>\n<p>两个智能体<strong>共享完整的本体感知</strong>（全身关节角度、角速度、IMU 数据），使上半身的动作变化能被下半身感知并做出补偿。</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：虽然两个智能体独立输出动作，但它们在同一仿真环境中联合训练，下半身智能体能观测到上半身动作对机器人状态的影响，从而学会动态平衡补偿。</div>\n<p><strong>2. 力矩极限感知的 3D 力课程</strong></p>\n<p>这是 FALCON 最核心的技术创新。训练时在末端执行器上施加随机 3D 外力，但力的大小受限于关节力矩极限：</p>\n<p><strong>Step 1 — 力矩余量计算</strong>：给定当前关节构型 <span class=\"kb-math kb-math-inline\">q</span>，计算重力补偿后的可用力矩余量：</p>\n<div class=\"kb-math kb-math-display\">\\tau_{\\text{margin}} = \\tau_{\\max} - \\tau_{\\text{gravity}}(q)</div>\n<p><strong>Step 2 — 力空间边界映射</strong>：通过末端执行器雅可比矩阵 <span class=\"kb-math kb-math-inline\">J_{EE}</span> 将力矩空间映射到笛卡尔力空间，得到各轴最大可施加力：</p>\n<div class=\"kb-math kb-math-display\">F^{\\max}_{\\text{axis}_i} = \\left|(J^{-T}_{EE} \\cdot \\tau_{\\text{margin}})_i\\right|, \\quad i \\in \\{x, y, z\\}</div>\n<p><strong>Step 3 — Dirichlet 采样 + 渐进缩放</strong>：使用 Dirichlet 分布在 3D 力方向上采样，确保力在各轴间合理分配：</p>\n<div class=\"kb-math kb-math-display\">d \\sim \\text{Dir}(\\alpha \\cdot \\mathbf{1}_3), \\quad F^{\\text{applied}} = \\alpha_g \\cdot d \\odot F^{\\max}_{\\text{axis}}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\alpha_g \\in [0, 1]</span> 是渐进缩放因子，随训练进程从 0 线性增长到 1，实现从无力到满力的课程学习。每个力的施加位置还会在末端执行器表面随机偏移 <span class=\"kb-math kb-math-inline\">\\Delta p</span>，增加力矩扰动的多样性。</p>\n<div class=\"key-point\">💡 <strong>为什么用 Dirichlet 分布？</strong> Dirichlet 分布天然生成归一化的非负权重向量（<span class=\"kb-math kb-math-inline\">\\sum d_i = 1</span>），非常适合在固定总力预算下分配各轴力分量。当 <span class=\"kb-math kb-math-inline\">\\alpha = 1</span> 时为均匀分布，各方向等概率；增大 <span class=\"kb-math kb-math-inline\">\\alpha</span> 可使分布更集中。</div>\n<p><strong>3. 非对称 Actor-Critic</strong></p>\n<p>为了在不依赖力传感器的前提下提升训练效率，FALCON 采用非对称设计：</p>\n<ul>\n<li><strong>Actor</strong>（部署时使用）：仅接收本体感知信息，不需要力传感器</li>\n<li><strong>Critic</strong>（仅训练时使用）：额外接收特权信息——真实根部速度 <span class=\"kb-math kb-math-inline\">v^{\\text{root}}</span> 和末端执行器外力 <span class=\"kb-math kb-math-inline\">F^{EE}</span></li>\n</ul>\n<p>这使得 Critic 能更准确地估计状态价值，指导 Actor 学习更好的策略，而部署时 Actor 完全不依赖特权信息。</p>\n<p><strong>4. 上半身参考姿态采样</strong></p>\n<p>训练时，上半身的目标关节角度从 AMASS 动作捕捉数据集中随机采样。具体流程：\n1. 从 AMASS 数据集中随机选取一个动作片段\n2. 通过逆运动学将 SMPL 人体模型的关节角度映射到机器人关节空间\n3. 仅提取上半身关节角度作为跟踪目标\n4. 每个 episode 随机采样不同的目标姿态</p>\n<p>这种设计使策略能泛化到各种上半身构型，而非仅适用于特定操控姿势。</p>\n<h5>与基线方法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>力处理方式</th>\n<th>上半身控制</th>\n<th>上体跟踪误差</th>\n<th>力自适应</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Vanilla Single-Agent</td>\n<td>无力课程</td>\n<td>RL 联合控制</td>\n<td>基线</td>\n<td>✗</td>\n</tr>\n<tr>\n<td>Lower-RL-Upper-IK</td>\n<td>力估计器+雅可比补偿</td>\n<td>IK+前馈力矩</td>\n<td>较差</td>\n<td>需力传感器</td>\n</tr>\n<tr>\n<td>ExBody2 (2D push)</td>\n<td>仅 2D 水平推力</td>\n<td>RL</td>\n<td>中等</td>\n<td>有限</td>\n</tr>\n<tr>\n<td><strong>FALCON</strong></td>\n<td><strong>3D 力课程+力矩感知</strong></td>\n<td><strong>双智能体 RL</strong></td>\n<td><strong>最优 (↓2×)</strong></td>\n<td><strong>✓ 无需传感器</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p>实验结果表明，FALCON 在上半身跟踪误差上比最佳基线降低约 <strong>2 倍</strong>，同时在 Unitree G1 上实现了 107.9N 的拉车峰值力和 47.3N 的开门峰值力。</p>\n<h5>训练与部署细节</h5>\n<ul>\n<li><strong>仿真器</strong>：MuJoCo，4096 个并行环境</li>\n<li><strong>优化器</strong>：PPO，学习率 <span class=\"kb-math kb-math-inline\">1 \\times 10^{-4}</span>，clip ratio <span class=\"kb-math kb-math-inline\">\\epsilon = 0.2</span></li>\n<li><strong>控制频率</strong>：50 Hz（策略）/ 200 Hz（PD 控制器）</li>\n<li><strong>Domain Randomization</strong>：摩擦系数 <span class=\"kb-math kb-math-inline\">\\mathcal{U}(0.5, 1.25)</span>、连杆质量 <span class=\"kb-math kb-math-inline\">\\mathcal{U}(0.9, 1.2)\\times</span> 默认值、基座质量偏移 <span class=\"kb-math kb-math-inline\">\\mathcal{U}(-1, 3)</span> kg、PD 增益 <span class=\"kb-math kb-math-inline\">\\mathcal{U}(0.9, 1.1)\\times</span> 默认值、控制延迟 <span class=\"kb-math kb-math-inline\">\\mathcal{U}(0, 20)</span> ms</li>\n<li><strong>外部扰动</strong>：每 5 秒施加 1 m/s 的随机推力</li>\n<li><strong>硬件限制</strong>：实际部署中手腕电机容易过热，限制了持续高力矩输出（每臂 ≤2kg 持续负载），但短时高力矩任务（如拉车）不受影响</li>\n</ul>",
      "quiz": {
        "q": "FALCON 的 3D 力课程训练中，使用 Dirichlet 分布的主要目的是什么？",
        "options": [
          "生成均匀分布的力方向向量，确保各轴力分量相等",
          "在固定总力预算下对三维力轴进行归一化的随机分配，增加训练力扰动的多样性",
          "替代高斯分布以避免生成负值力分量",
          "对力矩极限进行概率建模，估计关节失效概率"
        ],
        "answer": 1,
        "explain": "Dirichlet 分布天然输出归一化的非负权重向量 (Σdi=1)，用于将力矩极限映射的最大力在 x/y/z 三轴间随机分配，配合渐进缩放因子 αg 实现从弱到强的力课程训练。"
      }
    },
    {
      "id": "hdmi",
      "num": 10,
      "name": "HDMI",
      "fullName": "人形交互模仿 (HumanoiD iMitation for Interaction)",
      "year": "2026",
      "org": "CVPR",
      "parent": "viral",
      "paperUrl": "https://arxiv.org/abs/2602.12345",
      "projectUrl": "",
      "category": "sim2real",
      "motivation": "互联网视频学习全身交互技能",
      "summary": "HDMI 的核心目标是：互联网视频学习全身交互技能。",
      "keyPoints": [
        "核心动机：互联网视频学习全身交互技能",
        "演化来源：继承或改进自 viral",
        "代表机构：CVPR"
      ],
      "detail": "<p>互联网视频学习全身交互技能</p>"
    },
    {
      "id": "lide",
      "num": 11,
      "name": "LIDE",
      "fullName": "规划引导扩散 (Planning-Guided Diffusion)",
      "year": "2026",
      "org": "MIT",
      "parent": "domain_rand",
      "paperUrl": "https://arxiv.org/abs/2602.15678",
      "projectUrl": "",
      "category": "sim2real",
      "motivation": "规划引导扩散解决双臂接触任务",
      "summary": "LIDE 的核心目标是：规划引导扩散解决双臂接触任务。",
      "keyPoints": [
        "核心动机：规划引导扩散解决双臂接触任务",
        "演化来源：继承或改进自 domain_rand",
        "代表机构：MIT"
      ],
      "detail": "<p>规划引导扩散解决双臂接触任务</p>"
    },
    {
      "id": "bcq",
      "num": 12,
      "name": "BCQ",
      "fullName": "批量约束Q学习 (Batch-Constrained Q-learning)",
      "year": "2019",
      "org": "McGill",
      "parent": "ddpg",
      "paperUrl": "https://arxiv.org/abs/1812.02900",
      "projectUrl": "",
      "category": "offline_rl",
      "motivation": "生成模型约束缓解外推误差",
      "summary": "BCQ 的核心目标是：生成模型约束缓解外推误差。",
      "keyPoints": [
        "核心动机：生成模型约束缓解外推误差",
        "演化来源：继承或改进自 ddpg",
        "代表机构：McGill"
      ],
      "detail": "<p>生成模型约束缓解外推误差</p>"
    },
    {
      "id": "cql",
      "num": 13,
      "name": "CQL",
      "fullName": "保守Q学习 (Conservative Q-Learning)",
      "year": "2020",
      "org": "UC Berkeley",
      "parent": "bcq",
      "paperUrl": "https://arxiv.org/abs/2006.04779",
      "projectUrl": "",
      "category": "offline_rl",
      "motivation": "悲观Q值正则约束分布外动作",
      "summary": "CQL 的核心目标是：悲观Q值正则约束分布外动作。",
      "keyPoints": [
        "核心动机：悲观Q值正则约束分布外动作",
        "演化来源：继承或改进自 bcq",
        "代表机构：UC Berkeley"
      ],
      "detail": "<p>悲观Q值正则约束分布外动作</p>"
    },
    {
      "id": "iql",
      "num": 14,
      "name": "IQL",
      "fullName": "隐式Q学习 (Implicit Q-Learning)",
      "year": "2021",
      "org": "UC Berkeley",
      "parent": "cql",
      "paperUrl": "https://arxiv.org/abs/2110.06169",
      "projectUrl": "",
      "category": "offline_rl",
      "motivation": "分位数回归隐式提取最优策略",
      "summary": "IQL 提出了一种**完全不需要评估数据集外动作**的离线强化学习方法：通过对 Q 值进行 expectile 回归来隐式逼近最优状态值函数，再结合优势加权回归（AWR）提取策略，在 D4RL 基准上取得了 SOTA 性能，尤其在需要\"轨迹拼接\"的 AntMaze 任务上大幅超越先前方法。",
      "keyPoints": [
        "<strong>完全 in-sample 学习</strong>：训练过程中从不查询数据集外动作的 Q 值，从根本上避免了 OOD 动作的值函数外推问题",
        "<strong>Expectile 回归估计 V</strong>：用非对称 L2 损失（expectile loss）对 <span class=\"kb-math kb-math-inline\">V(s)</span> 进行回归，当 <span class=\"kb-math kb-math-inline\">\\tau \\to 1</span> 时逼近 <span class=\"kb-math kb-math-inline\">\\max_a Q(s,a)</span>，实现隐式策略改进",
        "<strong>三网络架构</strong>：V 网络（状态值函数）、Q 网络（动作值函数）、π 网络（策略），外加 Q 的目标网络 <span class=\"kb-math kb-math-inline\">\\hat{\\theta}</span>",
        "<strong>两阶段训练</strong>：第一阶段交替更新 V 和 Q（TD 学习），第二阶段通过 AWR 提取策略",
        "<strong>AWR 策略提取</strong>：以 <span class=\"kb-math kb-math-inline\">\\exp(\\beta \\cdot A(s,a))</span> 为权重的行为克隆，仅使用数据集中的动作",
        "<strong>Clipped Double Q-learning</strong>：使用两个 Q 网络取最小值，抑制过估计",
        "<strong>D4RL SOTA</strong>：在 MuJoCo locomotion 和 AntMaze 任务上均达到当时最优，且支持在线微调"
      ],
      "detail": "<h5>框架示意</h5>\n<p><img alt=\"IQL 方法示意图\" src=\"https://ar5iv.labs.arxiv.org/html/2110.06169/assets/x1.png\" />\n<em>图：IQL 的核心思想——将 Q(s,·) 视为关于动作的随机变量，通过 expectile 回归估计其上分位值作为 V(s)，避免显式查询 OOD 动作</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># Algorithm 1: Implicit Q-Learning (IQL)\n# 初始化: V网络(ψ), Q网络(θ1,θ2), 目标Q网络(θ̂), 策略网络(ϕ)\n\n# ===== 第一阶段: TD 学习 =====\nfor each gradient step:\n    # 从数据集采样 (s, a, r, s')\n    batch = sample(D)\n\n    # 1. 更新 V 网络 (expectile 回归)\n    # L_V(ψ) = E[L_2^τ(Q_θ̂(s,a) - V_ψ(s))]\n    u = min(Q_θ̂1(s,a), Q_θ̂2(s,a)) - V_ψ(s)\n    weight = τ * (u &gt;= 0) + (1 - τ) * (u &lt; 0)  # 非对称权重\n    loss_V = mean(weight * u²)\n    ψ -= λ_V * ∇loss_V\n\n    # 2. 更新 Q 网络 (标准 TD 学习, 用 V 替代 max)\n    # L_Q(θ) = E[(r + γ·V_ψ(s') - Q_θ(s,a))²]\n    target = r + γ * V_ψ(s')\n    loss_Q = mean((target - Q_θ(s,a))²)\n    θ -= λ_Q * ∇loss_Q\n\n    # 3. 更新目标网络 (EMA)\n    θ̂ ← (1 - α)·θ̂ + α·θ\n\n# ===== 第二阶段: 策略提取 (AWR) =====\nfor each gradient step:\n    # L_π(ϕ) = E[exp(β·(Q_θ̂(s,a) - V_ψ(s))) · log π_ϕ(a|s)]\n    advantage = Q_θ̂(s,a) - V_ψ(s)\n    weights = exp(β * advantage)\n    loss_π = -mean(weights * log_π_ϕ(a|s))\n    ϕ -= λ_π * ∇loss_π\n</code></pre>\n<h5>动机与背景</h5>\n<p>离线强化学习面临的核心矛盾是：<strong>策略改进</strong>要求评估当前策略可能选择的动作（这些动作可能不在数据集中），而<strong>分布偏移</strong>意味着对数据集外（OOD）动作的 Q 值估计极不可靠。</p>\n<p>先前方法的解决思路主要有两类：\n1. <strong>约束策略</strong>（如 BCQ、BEAR、CQL）：限制策略不要偏离行为策略太远，但仍需在训练中查询 OOD 动作的 Q 值\n2. <strong>正则化 Q 函数</strong>（如 CQL）：对 OOD 动作的 Q 值施加惩罚，但需要额外采样 OOD 动作</p>\n<div class=\"key-point\">💡 <strong>关键洞察</strong>：IQL 提出了一个根本不同的思路——能否<strong>完全不查询任何 OOD 动作的 Q 值</strong>，仅使用数据集中已有的 (s, a) 对来完成策略改进？</div>\n<h5>核心机制：Expectile 回归实现隐式策略改进</h5>\n<p><strong>问题转化</strong>：标准 Q-learning 的 Bellman 最优方程需要 <span class=\"kb-math kb-math-inline\">\\max_a Q(s,a)</span>，这要求遍历所有动作（包括 OOD 动作）。IQL 的关键在于<strong>不显式计算 max，而是通过 expectile 回归隐式逼近</strong>。</p>\n<p><strong>Expectile 的直觉</strong>：对于随机变量 <span class=\"kb-math kb-math-inline\">X</span>，其 <span class=\"kb-math kb-math-inline\">\\tau</span>-expectile <span class=\"kb-math kb-math-inline\">m_\\tau</span> 满足：</p>\n<div class=\"kb-math kb-math-display\">m_\\tau = \\arg\\min_m \\mathbb{E}[L_2^\\tau(X - m)]</div>\n<p>其中非对称 L2 损失为：</p>\n<div class=\"kb-math kb-math-display\">L_2^\\tau(u) = |\\tau - \\mathbf{1}(u &lt; 0)| \\cdot u^2</div>\n<ul>\n<li>当 <span class=\"kb-math kb-math-inline\">\\tau = 0.5</span> 时，<span class=\"kb-math kb-math-inline\">m_\\tau</span> 就是均值（普通最小二乘）</li>\n<li>当 <span class=\"kb-math kb-math-inline\">\\tau \\to 1</span> 时，<span class=\"kb-math kb-math-inline\">m_\\tau \\to \\max(X)</span>（逼近最大值）</li>\n</ul>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：<span class=\"kb-math kb-math-inline\">\\tau</span> 的选择至关重要。<span class=\"kb-math kb-math-inline\">\\tau</span> 越大，越接近 max 操作，策略改进越激进；但过大的 <span class=\"kb-math kb-math-inline\">\\tau</span> 可能导致对数据集中噪声或异常值过度敏感。实验中通常取 <span class=\"kb-math kb-math-inline\">\\tau \\in [0.7, 0.9]</span>。</div>\n<p><strong>V 网络的 Expectile 回归（Eq. 5）</strong>：</p>\n<div class=\"kb-math kb-math-display\">L_V(\\psi) = \\mathbb{E}_{(s,a) \\sim \\mathcal{D}}\\left[L_2^\\tau\\left(Q_{\\hat{\\theta}}(s,a) - V_\\psi(s)\\right)\\right]</div>\n<p>这里将 <span class=\"kb-math kb-math-inline\">Q(s, \\cdot)</span> 视为关于数据集中动作分布的随机变量，<span class=\"kb-math kb-math-inline\">V_\\psi(s)</span> 通过 expectile 回归学习其上分位值。当 <span class=\"kb-math kb-math-inline\">\\tau</span> 较大时，<span class=\"kb-math kb-math-inline\">V(s)</span> 会偏向数据集中 Q 值较高的动作，从而<strong>隐式地实现了策略改进</strong>——无需显式地对所有动作取 max。</p>\n<p><strong>Q 网络的 TD 更新（Eq. 6）</strong>：</p>\n<div class=\"kb-math kb-math-display\">L_Q(\\theta) = \\mathbb{E}_{(s,a,s&#x27;) \\sim \\mathcal{D}}\\left[\\left(r(s,a) + \\gamma V_\\psi(s&#x27;) - Q_\\theta(s,a)\\right)^2\\right]</div>\n<p>Q 网络使用标准的 MSE TD 损失，但 target 中用 <span class=\"kb-math kb-math-inline\">V_\\psi(s&#x27;)</span> 替代了 <span class=\"kb-math kb-math-inline\">\\max_{a&#x27;} Q(s&#x27;, a&#x27;)</span>。由于 <span class=\"kb-math kb-math-inline\">V</span> 已经通过 expectile 回归隐式逼近了最优值，因此 Q 的更新也隐式地朝着最优 Q 函数收敛。</p>\n<h5>策略提取：优势加权回归（AWR, Eq. 7）</h5>\n<p>值函数训练完成后，通过<strong>优势加权行为克隆</strong>提取策略：</p>\n<div class=\"kb-math kb-math-display\">L_\\pi(\\phi) = \\mathbb{E}_{(s,a) \\sim \\mathcal{D}}\\left[\\exp\\left(\\beta \\cdot (Q_{\\hat{\\theta}}(s,a) - V_\\psi(s))\\right) \\cdot \\log \\pi_\\phi(a|s)\\right]</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\beta \\in [0, \\infty)</span> 是逆温度参数：\n- <strong><span class=\"kb-math kb-math-inline\">\\beta \\to 0</span></strong>：退化为普通行为克隆（均匀加权）\n- <strong><span class=\"kb-math kb-math-inline\">\\beta \\to \\infty</span></strong>：只模仿优势最大的动作</p>\n<div class=\"key-point\">💡 <strong>关键</strong>：AWR 的优势在于它只使用数据集中的 (s, a) 对，权重 <span class=\"kb-math kb-math-inline\">\\exp(\\beta \\cdot A(s,a))</span> 让策略更多地模仿高优势的动作，同时天然地保持在数据分布内。</div>\n<h5>与传统方法的区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>CQL</th>\n<th>BCQ/BEAR</th>\n<th>IQL</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>是否查询 OOD 动作</td>\n<td>✅ 需要采样 OOD 动作计算正则项</td>\n<td>✅ 需要约束策略输出</td>\n<td>❌ <strong>完全不需要</strong></td>\n</tr>\n<tr>\n<td>值函数训练是否依赖策略</td>\n<td>是</td>\n<td>是</td>\n<td><strong>否</strong>（V/Q 训练与策略解耦）</td>\n</tr>\n<tr>\n<td>计算开销</td>\n<td>高（需额外采样）</td>\n<td>中等</td>\n<td><strong>低</strong>（仅多一个 V 网络）</td>\n</tr>\n<tr>\n<td>是否支持在线微调</td>\n<td>困难</td>\n<td>困难</td>\n<td><strong>天然支持</strong>（值函数不依赖策略）</td>\n</tr>\n<tr>\n<td>轨迹拼接能力</td>\n<td>强</td>\n<td>中等</td>\n<td><strong>强</strong>（多步动态规划）</td>\n</tr>\n</tbody>\n</table></div>\n<p>IQL 的一个独特优势是<strong>值函数训练与策略完全解耦</strong>：V 和 Q 的训练不依赖任何显式策略，这使得：\n1. 训练更稳定（无策略-值函数的循环依赖）\n2. 天然支持在线微调（离线训练的值函数可直接用于在线阶段）\n3. 实现极其简单（只需在 SARSA-style TD 更新中修改 V 的损失函数）</p>",
      "quiz": {
        "q": "IQL 中 expectile 回归的超参数 τ 趋近于 1 时，V(s) 的行为最接近以下哪个？",
        "options": [
          "数据集中所有动作 Q 值的均值 E_a[Q(s,a)]",
          "数据集中所有动作 Q 值的最大值 max_a Q(s,a)",
          "行为策略的状态值函数 V^β(s)",
          "数据集中所有动作 Q 值的中位数"
        ],
        "answer": 1,
        "explain": "当 τ→1 时，expectile 回归的非对称损失使得 V(s) 几乎只关注 Q 值最高的动作（对 Q>V 的样本赋予极大权重），从而逼近 max_a Q(s,a)。τ=0.5 时才是均值。"
      }
    },
    {
      "id": "td3bc",
      "num": 15,
      "name": "TD3+BC",
      "fullName": "TD3行为克隆正则 (TD3 with Behavior Cloning)",
      "year": "2021",
      "org": "Google",
      "parent": "td3",
      "paperUrl": "https://arxiv.org/abs/2106.06860",
      "projectUrl": "",
      "category": "offline_rl",
      "motivation": "极简行为克隆正则",
      "summary": "TD3+BC 在 TD3 的策略更新目标中加入行为克隆（BC）正则项，并通过自适应权重 \\(\\lambda = \\alpha / \\frac{1}{N}\\sum|Q(s,a)|\\) 平衡 RL 与模仿信号，仅需数行代码改动即可在 D4RL 基准上达到与 CQL、Fisher-BRC 等复杂 SOTA 方法相当的性能，同时将训练时间缩减至不到一半。",
      "keyPoints": [
        "<strong>极简设计哲学</strong>：仅在 TD3 基础上添加 BC 正则项和状态归一化，无需额外网络架构、预训练生成模型或复杂约束机制",
        "<strong>策略更新公式</strong>：<span class=\"kb-math kb-math-inline\">\\pi = \\arg\\max_\\pi \\; \\mathbb{E}_{(s,a) \\sim \\mathcal{D}} \\left[ \\lambda\\, Q(s, \\pi(s)) - (\\pi(s) - a)^2 \\right]</span>，将 Q 值最大化与行为克隆损失直接相加",
        "<strong>自适应权重归一化</strong>：<span class=\"kb-math kb-math-inline\">\\lambda = \\alpha / \\frac{1}{N}\\sum_{(s_i, a_i)}|Q(s_i, a_i)|</span>，通过 Q 值绝对值均值归一化，使 Q 项和 BC 项量级可比，唯一超参 <span class=\"kb-math kb-math-inline\">\\alpha=2.5</span>",
        "<strong>状态特征归一化</strong>：将状态归一化为均值 0、标准差 1（<span class=\"kb-math kb-math-inline\">\\epsilon=10^{-3}</span> 防除零），提升跨任务稳定性",
        "<strong>D4RL 基准全面评测</strong>：在 Gym MuJoCo 的 random/medium/medium-replay/medium-expert/expert 数据集上全面评估",
        "<strong>计算效率优势</strong>：总训练时间 39 分钟，CQL 需 4h11m，Fisher-BRC 需 2h8m，效率提升超 3 倍",
        "<strong>仅 1 个额外超参数</strong>：<span class=\"kb-math kb-math-inline\">\\alpha=2.5</span> 在所有任务上通用，无需逐任务调参"
      ],
      "detail": "<h5>核心框架示意</h5>\n<p><img alt=\"TD3+BC 与其他离线 RL 方法的实现复杂度对比\" src=\"https://ar5iv.labs.arxiv.org/html/2106.06860/assets/x1.png\" />\n<em>图：Table 1 — 各离线 RL 算法相对于其基础在线算法所需的额外实现改动对比。TD3+BC 仅需添加 BC 损失项和状态归一化，而 CQL、Fisher-BRC 等方法需要大量架构和训练流程修改。</em></p>\n<p><img alt=\"TD3+BC 学习曲线对比\" src=\"https://ar5iv.labs.arxiv.org/html/2106.06860/assets/x5.png\" />\n<em>图：TD3+BC 与 BC、CQL、Fisher-BRC 在 D4RL 数据集上的学习曲线对比。TD3+BC 展现出与 SOTA Fisher-BRC 相似的学习速度和最终性能。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># TD3+BC 核心伪代码\n# 在标准 TD3 基础上仅修改策略更新步骤\n\n# 预处理：计算数据集状态的均值和标准差\nmu_s, sigma_s = dataset.states.mean(), dataset.states.std()\n\nfor step in range(max_steps):\n    # 采样 mini-batch\n    s, a, r, s_next, done = replay_buffer.sample(batch_size)\n\n    # 状态归一化\n    s = (s - mu_s) / (sigma_s + 1e-3)\n    s_next = (s_next - mu_s) / (sigma_s + 1e-3)\n\n    # === Critic 更新（与标准 TD3 完全相同）===\n    with torch.no_grad():\n        a_next = target_actor(s_next) + clipped_noise\n        target_Q = r + gamma * min(target_Q1(s_next, a_next), \n                                     target_Q2(s_next, a_next))\n    critic_loss = MSE(Q1(s, a), target_Q) + MSE(Q2(s, a), target_Q)\n\n    # === Actor 更新（TD3+BC 的核心改动）===\n    if step % policy_delay == 0:\n        pi = actor(s)\n        Q_val = Q1(s, pi)\n        # 自适应权重：归一化 Q 值量级\n        lmbda = alpha / Q_val.abs().mean().detach()\n        # 策略损失 = -λ·Q(s,π(s)) + (π(s)-a)²\n        actor_loss = -lmbda * Q_val.mean() + F.mse_loss(pi, a)\n        actor_optimizer.step(actor_loss)\n</code></pre>\n<h5>动机与背景</h5>\n<p>离线强化学习（Offline RL）旨在从固定的历史数据集中学习策略，无需与环境交互。其核心挑战在于<strong>分布偏移（distribution shift）</strong>：当学习到的策略选择了数据集中未见过的动作时，Q 函数会对这些 OOD（out-of-distribution）动作产生不可靠的高估值，导致策略退化。</p>\n<p>近年来的 SOTA 方法（如 CQL、BRAC、Fisher-BRC）通过各种复杂机制来解决这一问题：CQL 在 Q 函数上添加保守性正则项，BRAC 使用 KL/MMD 散度约束策略，Fisher-BRC 则需要预训练行为策略的生成模型。然而，这些方法引入了大量额外的实现复杂度、超参数和计算开销。</p>\n<div class=\"key-point\">💡 <strong>关键洞察</strong>：作者指出，许多 SOTA 方法的性能提升可能并非来自其复杂的算法创新，而是来自额外的工程细节（如网络架构调整、归一化技巧等）。这启发了一个问题：<strong>能否用最简单的方式达到同样的效果？</strong></div>\n<h5>核心机制详解</h5>\n<p><strong>1. 行为克隆正则化</strong></p>\n<p>TD3+BC 的核心思想极其直观：在标准 TD3 的策略梯度目标中，直接添加一个 MSE 行为克隆损失项：</p>\n<div class=\"kb-math kb-math-display\">\\pi = \\arg\\max_\\pi \\; \\mathbb{E}_{(s,a) \\sim \\mathcal{D}} \\left[ \\lambda\\, Q(s, \\pi(s)) - (\\pi(s) - a)^2 \\right]</div>\n<ul>\n<li>第一项 <span class=\"kb-math kb-math-inline\">\\lambda Q(s, \\pi(s))</span> 是标准的 Q 值最大化目标，驱动策略向高回报方向优化</li>\n<li>第二项 <span class=\"kb-math kb-math-inline\">-(\\pi(s) - a)^2</span> 是行为克隆损失，约束策略输出接近数据集中的实际动作</li>\n</ul>\n<p>这种设计的直觉是：BC 项隐式地将策略约束在数据集的动作分布支撑集内，从而避免 Q 函数对 OOD 动作的错误外推，而 Q 值项则在数据集支撑集内进行策略改进。</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：与显式约束策略分布的方法（如 KL 散度约束）不同，BC 正则项是逐样本的点约束，不需要估计完整的行为策略分布，因此实现极为简单。</div>\n<p><strong>2. 自适应权重 <span class=\"kb-math kb-math-inline\">\\lambda</span> 的设计</strong></p>\n<p>直接将 Q 值和 BC 损失相加面临一个问题：两者的量级可能差异巨大。Q 值的绝对大小取决于奖励尺度和折扣因子，而 BC 损失取决于动作空间的范围。为此，作者设计了自适应归一化权重：</p>\n<div class=\"kb-math kb-math-display\">\\lambda = \\frac{\\alpha}{\\frac{1}{N} \\sum_{(s_i, a_i)} |Q(s_i, a_i)|}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\alpha = 2.5</span> 是唯一的超参数。这个设计确保：\n- Q 值项被归一化到与 BC 项可比的量级\n- <span class=\"kb-math kb-math-inline\">\\alpha</span> 控制 RL 与模仿之间的相对权重\n- 使用 mini-batch 内 Q 值绝对值的均值进行归一化，计算开销几乎为零</p>\n<div class=\"key-point\">💡 <strong>关键</strong>：<span class=\"kb-math kb-math-inline\">\\alpha</span> 的鲁棒性很强——消融实验表明 <span class=\"kb-math kb-math-inline\">\\alpha \\in [2, 3]</span> 范围内性能几乎无差异，仅在极端值（<span class=\"kb-math kb-math-inline\">\\alpha=1</span> 偏向纯模仿，<span class=\"kb-math kb-math-inline\">\\alpha=4</span> 偏向纯 RL）时部分任务性能下降。</div>\n<p><strong>3. 状态特征归一化</strong></p>\n<p>作者对所有状态特征进行标准化处理：</p>\n<div class=\"kb-math kb-math-display\">s = \\frac{s - \\mu_s}{\\sigma_s + \\epsilon}, \\quad \\epsilon = 10^{-3}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\mu_s</span> 和 <span class=\"kb-math kb-math-inline\">\\sigma_s</span> 在整个数据集上预计算。虽然这一改动看似微小，但消融实验表明它在多个任务上提供了稳定的性能提升，尤其是在不同环境的状态特征量级差异较大时。</p>\n<h5>与现有方法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>CQL</th>\n<th>Fisher-BRC</th>\n<th>BRAC</th>\n<th>TD3+BC</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>基础算法</td>\n<td>SAC</td>\n<td>SAC</td>\n<td>SAC</td>\n<td>TD3</td>\n</tr>\n<tr>\n<td>额外网络</td>\n<td>无</td>\n<td>行为策略生成模型</td>\n<td>判别器/值网络</td>\n<td>无</td>\n</tr>\n<tr>\n<td>预训练需求</td>\n<td>否</td>\n<td>是（行为策略）</td>\n<td>否</td>\n<td>否</td>\n</tr>\n<tr>\n<td>额外超参数</td>\n<td>多个</td>\n<td>多个</td>\n<td>多个</td>\n<td>1 个（<span class=\"kb-math kb-math-inline\">\\alpha</span>）</td>\n</tr>\n<tr>\n<td>实现改动量</td>\n<td>大</td>\n<td>大</td>\n<td>中</td>\n<td><strong>极小</strong></td>\n</tr>\n<tr>\n<td>训练时间</td>\n<td>4h 11m</td>\n<td>2h 8m</td>\n<td>—</td>\n<td><strong>39m</strong></td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 <strong>关键发现</strong>：论文还指出了离线 RL 中一个被忽视的问题——<strong>高 episode 方差</strong>。离线训练的策略相比在线训练的策略，在不同 episode 间的性能波动显著更大。这意味着仅报告平均性能可能掩盖了策略的不稳定性。</div>\n<h5>实验结果</h5>\n<p>在 D4RL Gym MuJoCo 基准的 12 个任务上（HalfCheetah/Hopper/Walker2d × random/medium/medium-replay/medium-expert），TD3+BC 在大多数任务上匹配或超越了 CQL 和 Fisher-BRC 的性能。特别值得注意的是：</p>\n<ul>\n<li>在 <strong>medium</strong> 和 <strong>medium-replay</strong> 数据集上，TD3+BC 表现尤为突出</li>\n<li>在 <strong>expert</strong> 数据集上，TD3+BC 不会退化到低于纯 BC 的水平</li>\n<li>在 <strong>random</strong> 数据集上，RL 组件的贡献最为显著（纯 BC 性能很差）</li>\n</ul>\n<h5>消融实验</h5>\n<p>消融研究验证了三个组件的必要性：\n1. <strong>去除 BC 正则项</strong>：性能大幅下降（除 random 数据集外），证实了行为约束的必要性\n2. <strong>去除 TD3（纯 BC）</strong>：在非 expert 数据集上性能显著下降，证实了 RL 优化的价值\n3. <strong>去除状态归一化</strong>：影响最小但仍在多个任务上提供一致的性能提升</p>",
      "quiz": {
        "q": "TD3+BC 中自适应权重 λ 的设计目的是什么？",
        "options": [
          "加速 Q 网络的收敛速度",
          "将 Q 值项归一化到与 BC 损失项可比的量级，平衡 RL 与模仿信号",
          "防止 Q 值对 OOD 动作的过高估计",
          "动态调整学习率以适应不同训练阶段"
        ],
        "answer": 1,
        "explain": "λ = α / mean(|Q|) 通过 Q 值绝对值均值对 Q 项进行归一化，确保策略损失中 RL 项和 BC 项的量级可比，从而使超参数 α 能够稳定地控制两者的相对权重。"
      }
    },
    {
      "id": "unifloral",
      "num": 16,
      "name": "Unifloral",
      "fullName": "统一离线RL协议 (Unified Offline RL Protocol)",
      "year": "2025",
      "org": "NeurIPS",
      "parent": "cql",
      "paperUrl": "https://neurips.cc/virtual/2025/oral/105555",
      "projectUrl": "",
      "category": "offline_rl",
      "motivation": "统一评估协议量化在线调参预算",
      "summary": "Unifloral 的核心目标是：统一评估协议量化在线调参预算。",
      "keyPoints": [
        "核心动机：统一评估协议量化在线调参预算",
        "演化来源：继承或改进自 cql",
        "代表机构：NeurIPS"
      ],
      "detail": "<p>统一评估协议量化在线调参预算</p>"
    },
    {
      "id": "cpql",
      "num": 17,
      "name": "CPQL",
      "fullName": "保守Peng's Q学习 (Conservative Peng's Q-Learning)",
      "year": "2026",
      "org": "ICLR",
      "parent": "cql",
      "paperUrl": "https://openreview.net/forum?id=Ml4AtrrfQT",
      "projectUrl": "",
      "category": "offline_rl",
      "motivation": "Peng's Q算子保守价值估计",
      "summary": "CPQL 的核心目标是：Peng's Q算子保守价值估计。",
      "keyPoints": [
        "核心动机：Peng's Q算子保守价值估计",
        "演化来源：继承或改进自 cql",
        "代表机构：ICLR"
      ],
      "detail": "<p>Peng's Q算子保守价值估计</p>"
    },
    {
      "id": "safefql",
      "num": 18,
      "name": "SafeFQL",
      "fullName": "安全流Q学习 (Safe Flow Q-Learning)",
      "year": "2026",
      "org": "arXiv",
      "parent": "iql",
      "paperUrl": "https://arxiv.org/abs/2603.15136",
      "projectUrl": "",
      "category": "offline_rl",
      "motivation": "可达性流策略扩展安全边界",
      "summary": "SafeFQL 的核心目标是：可达性流策略扩展安全边界。",
      "keyPoints": [
        "核心动机：可达性流策略扩展安全边界",
        "演化来源：继承或改进自 iql",
        "代表机构：arXiv"
      ],
      "detail": "<p>可达性流策略扩展安全边界</p>"
    },
    {
      "id": "gail",
      "num": 19,
      "name": "GAIL",
      "fullName": "生成对抗模仿学习 (Generative Adversarial Imitation Learning)",
      "year": "2016",
      "org": "Stanford",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/1606.03476",
      "projectUrl": "",
      "category": "skill_hierarchical",
      "motivation": "生成对抗框架模仿专家演示",
      "summary": "GAIL 将生成对抗网络 (GAN) 的思想引入模仿学习，提出通过最小化策略与专家的 **占用度量 (occupancy measure)** 之间的 Jensen-Shannon 散度来直接学习策略，绕过了传统逆强化学习中显式恢复奖励函数的中间步骤，在高维连续控制任务上以极少量专家演示实现了接近专家水平的表现。",
      "keyPoints": [
        "<strong>理论基础——占用度量匹配</strong>：证明了 IRL 本质上是寻找一个占用度量与专家匹配的策略，将模仿学习问题转化为分布匹配问题",
        "<strong>GAN 式对抗训练框架</strong>：策略网络 <span class=\"kb-math kb-math-inline\">\\pi_\\theta</span> 作为生成器，判别器网络 <span class=\"kb-math kb-math-inline\">D_w</span> 区分策略与专家的 (state, action) 对，二者交替优化",
        "<strong>新型代价正则化器 <span class=\"kb-math kb-math-inline\">\\psi_{\\text{GA}}</span></strong>：其凸共轭恰好等价于 JS 散度，使得优化目标可以用判别器的分类损失表示",
        "<strong>核心优化目标</strong>：<span class=\"kb-math kb-math-inline\">\\min_\\pi D_{\\text{JS}}(\\rho_\\pi, \\rho_{\\pi_E}) - \\lambda H(\\pi)</span>，其中 <span class=\"kb-math kb-math-inline\">\\lambda H(\\pi)</span> 为因果熵正则项",
        "<strong>TRPO 策略更新</strong>：使用 Trust Region Policy Optimization 进行策略步，防止策略因梯度噪声而剧烈变化",
        "<strong>判别器即代价函数</strong>：<span class=\"kb-math kb-math-inline\">c(s,a) = \\log D_w(s,a)</span> 直接作为策略优化的代价信号，无需显式恢复奖励",
        "<strong>实验验证</strong>：在 9 个 MuJoCo 物理仿真环境上超越 Behavioral Cloning、FEM、GTAL 等基线，尤其在高维 Humanoid 任务上优势显著"
      ],
      "detail": "<h5>核心框架示意</h5>\n<p><img alt=\"GAIL 实验结果：MuJoCo 连续控制任务上的性能对比\" src=\"https://ar5iv.labs.arxiv.org/html/1606.03476/assets/x1.png\" />\n<em>图：GAIL 在多个 MuJoCo 环境上与基线方法的性能对比。横轴为专家演示轨迹数，纵轴为归一化性能。GAIL（红色）在几乎所有任务和数据量设置下均达到或接近专家水平。</em></p>\n<h5>算法伪代码</h5>\n<pre><code>Algorithm 1: Generative Adversarial Imitation Learning (GAIL)\n──────────────────────────────────────────────────────\n输入: 专家轨迹 τ_E ~ π_E, 初始参数 θ_0, w_0\n\nfor i = 0, 1, 2, ... do\n    1. 采样当前策略轨迹: τ_i ~ π_{θ_i}\n\n    2. 更新判别器 (Adam 梯度上升):\n       w_{i+1} ← w_i + α_w · ∇_w [ Ê_{τ_i}[log D_w(s,a)]\n                                    + Ê_{τ_E}[log(1 - D_w(s,a))] ]\n\n    3. 更新策略 (TRPO 步):\n       θ_{i+1} ← TRPO_step(θ_i, cost = log D_{w_{i+1}}(s,a))\n       即: 以 log D_w(s,a) 为代价函数，用 TRPO 减小期望代价\n\nend for\n\n输出: 学到的策略 π_{θ}\n</code></pre>\n<h5>动机与背景</h5>\n<p><strong>传统模仿学习的困境：</strong> 从专家演示中学习策略有两条经典路径：</p>\n<ol>\n<li>\n<p><strong>行为克隆 (Behavioral Cloning)</strong>：将模仿学习视为监督学习，直接拟合 <span class=\"kb-math kb-math-inline\">\\pi(a|s)</span>。简单高效，但受 <strong>分布漂移 (distribution shift)</strong> 问题困扰——策略执行时遇到的状态分布与训练数据不同，误差会随时间步指数累积（复合误差问题）。</p>\n</li>\n<li>\n<p><strong>逆强化学习 (IRL)</strong>：先从专家演示中恢复奖励函数 <span class=\"kb-math kb-math-inline\">r(s,a)</span>，再用 RL 优化策略。理论上更鲁棒，但存在两大瓶颈：(a) 奖励函数恢复本身是一个欠定问题（多个奖励可解释同一行为）；(b) 需要在内循环中反复求解完整的 RL 问题，计算代价极高。</p>\n</li>\n</ol>\n<div class=\"key-point\">💡 <strong>关键洞察</strong>：GAIL 的核心观察是——如果最终目标是获得策略而非奖励函数，那么 IRL 的中间步骤（恢复奖励）是不必要的。可以直接将模仿学习表述为策略的占用度量与专家占用度量之间的分布匹配问题。</div>\n<h5>理论基础：占用度量 (Occupancy Measure)</h5>\n<p>论文的理论贡献建立在<strong>占用度量</strong>这一概念之上。对于策略 <span class=\"kb-math kb-math-inline\">\\pi</span>，其占用度量定义为：</p>\n<div class=\"kb-math kb-math-display\">\\rho_\\pi(s,a) = \\pi(a|s) \\sum_{t=0}^{\\infty} \\gamma^t P(s_t = s | \\pi)</div>\n<p>这是策略在执行过程中访问各 (state, action) 对的折扣频率分布。论文证明了一个关键定理：</p>\n<div class=\"warn-box\">⚠️ <strong>核心定理 (Theorem 2)</strong>：策略与占用度量之间存在一一对应关系 <span class=\"kb-math kb-math-inline\">\\pi \\leftrightarrow \\rho_\\pi</span>。因此，匹配占用度量等价于匹配策略。</div>\n<p>基于此，IRL 的一般形式可以写为：</p>\n<div class=\"kb-math kb-math-display\">\\max_{c \\in \\mathcal{C}} \\left( \\min_\\pi -H(\\pi) + \\mathbb{E}_\\pi[c(s,a)] \\right) - \\mathbb{E}_{\\pi_E}[c(s,a)]</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\mathcal{C}</span> 是代价函数类。通过对偶变换，这等价于：</p>\n<div class=\"kb-math kb-math-display\">\\min_\\pi -H(\\pi) + \\psi^*(\\rho_\\pi - \\rho_{\\pi_E})</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\psi^*</span> 是正则化器 <span class=\"kb-math kb-math-inline\">\\psi</span> 的凸共轭。不同的正则化器 <span class=\"kb-math kb-math-inline\">\\psi</span> 对应不同的 IRL/模仿学习算法。</p>\n<h5>核心创新：<span class=\"kb-math kb-math-inline\">\\psi_{\\text{GA}}</span> 正则化器与 GAN 连接</h5>\n<p>GAIL 的关键创新在于提出了一个新的代价正则化器 <span class=\"kb-math kb-math-inline\">\\psi_{\\text{GA}}</span>：</p>\n<div class=\"kb-math kb-math-display\">\\psi_{\\text{GA}}(c) \\triangleq \\begin{cases} \\mathbb{E}_{\\pi_E}[g(c(s,a))] &amp; \\text{if } c &lt; 0 \\\\ +\\infty &amp; \\text{otherwise} \\end{cases}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">g(x) = -x - \\log(1 - e^x)</span>（当 <span class=\"kb-math kb-math-inline\">x &lt; 0</span> 时）。</p>\n<p>这个看似复杂的正则化器有一个优美的性质——其凸共轭恰好等于 <strong>GAN 的判别器目标</strong>：</p>\n<div class=\"kb-math kb-math-display\">\\psi_{\\text{GA}}^*(\\rho_\\pi - \\rho_{\\pi_E}) = \\max_{D \\in (0,1)^{\\mathcal{S} \\times \\mathcal{A}}} \\mathbb{E}_\\pi[\\log D(s,a)] + \\mathbb{E}_{\\pi_E}[\\log(1 - D(s,a))]</div>\n<p>这正是二分类问题的最优负对数损失，等价于（相差常数）策略与专家占用度量之间的 <strong>Jensen-Shannon 散度</strong>：</p>\n<div class=\"kb-math kb-math-display\">D_{\\text{JS}}(\\rho_\\pi, \\rho_{\\pi_E}) = D_{\\text{KL}}\\left(\\rho_\\pi \\middle\\| \\frac{\\rho_\\pi + \\rho_{\\pi_E}}{2}\\right) + D_{\\text{KL}}\\left(\\rho_{\\pi_E} \\middle\\| \\frac{\\rho_\\pi + \\rho_{\\pi_E}}{2}\\right)</div>\n<div class=\"key-point\">💡 <strong>GAN 类比</strong>：策略 <span class=\"kb-math kb-math-inline\">\\pi</span> 扮演 GAN 中生成器的角色——它生成 (state, action) 轨迹数据；判别器 <span class=\"kb-math kb-math-inline\">D</span> 试图区分策略生成的数据与专家数据。当判别器无法区分二者时，策略就成功模仿了专家。</div>\n<h5>完整优化目标与训练流程</h5>\n<p>将因果熵 <span class=\"kb-math kb-math-inline\">H(\\pi)</span> 作为策略正则项（由 <span class=\"kb-math kb-math-inline\">\\lambda \\geq 0</span> 控制），GAIL 的完整优化目标为：</p>\n<div class=\"kb-math kb-math-display\">\\min_\\pi \\max_D \\ \\mathbb{E}_\\pi[\\log D(s,a)] + \\mathbb{E}_{\\pi_E}[\\log(1 - D(s,a))] - \\lambda H(\\pi)</div>\n<p>训练交替进行两步：</p>\n<p><strong>Step 1 — 判别器更新（Adam 梯度上升）：</strong> 固定策略 <span class=\"kb-math kb-math-inline\">\\pi_{\\theta_i}</span>，用采样的策略轨迹和专家轨迹更新判别器参数 <span class=\"kb-math kb-math-inline\">w</span>，使其更好地区分策略数据与专家数据：</p>\n<div class=\"kb-math kb-math-display\">\\nabla_w \\left[ \\hat{\\mathbb{E}}_{\\tau_i}[\\log D_w(s,a)] + \\hat{\\mathbb{E}}_{\\tau_E}[\\log(1 - D_w(s,a))] \\right]</div>\n<p><strong>Step 2 — 策略更新（TRPO 步）：</strong> 将判别器输出 <span class=\"kb-math kb-math-inline\">\\log D_{w_{i+1}}(s,a)</span> 作为代价函数，使用 TRPO 更新策略参数 <span class=\"kb-math kb-math-inline\">\\theta</span>，使策略向\"更像专家\"的方向移动。TRPO 通过 KL 散度约束确保每步更新幅度可控：</p>\n<div class=\"kb-math kb-math-display\">\\theta_{i+1} = \\arg\\min_\\theta \\ \\mathbb{E}_{\\pi_\\theta}[\\log D_{w_{i+1}}(s,a)] \\quad \\text{s.t.} \\ \\overline{D}_{\\text{KL}}(\\pi_{\\theta_i}, \\pi_\\theta) \\leq \\delta</div>\n<div class=\"warn-box\">⚠️ <strong>TRPO 的必要性</strong>：由于策略梯度估计的高方差，普通梯度下降容易导致策略崩溃。TRPO 的信赖域约束是 GAIL 稳定训练的关键保障。</div>\n<h5>与传统方法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th style=\"text-align: center;\">是否需要恢复奖励</th>\n<th style=\"text-align: center;\">是否需要 RL 内循环</th>\n<th style=\"text-align: center;\">可扩展性</th>\n<th style=\"text-align: center;\">表达能力</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Behavioral Cloning</td>\n<td style=\"text-align: center;\">✗</td>\n<td style=\"text-align: center;\">✗</td>\n<td style=\"text-align: center;\">✓</td>\n<td style=\"text-align: center;\">受分布漂移限制</td>\n</tr>\n<tr>\n<td>MaxEnt IRL</td>\n<td style=\"text-align: center;\">✓</td>\n<td style=\"text-align: center;\">✓</td>\n<td style=\"text-align: center;\">✗（需枚举状态）</td>\n<td style=\"text-align: center;\">受代价函数类限制</td>\n</tr>\n<tr>\n<td>线性 Apprenticeship Learning</td>\n<td style=\"text-align: center;\">✓</td>\n<td style=\"text-align: center;\">✓</td>\n<td style=\"text-align: center;\">✓（用 TRPO）</td>\n<td style=\"text-align: center;\">仅线性代价函数</td>\n</tr>\n<tr>\n<td><strong>GAIL</strong></td>\n<td style=\"text-align: center;\"><strong>✗</strong></td>\n<td style=\"text-align: center;\"><strong>✗</strong></td>\n<td style=\"text-align: center;\"><strong>✓</strong></td>\n<td style=\"text-align: center;\"><strong>任意复杂行为</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p>GAIL 的核心优势在于：\n1. <strong>绕过奖励恢复</strong>：直接优化策略，避免了 IRL 的欠定性问题\n2. <strong>无需 RL 内循环</strong>：判别器梯度步替代了完整的 RL 求解\n3. <strong>表达能力强</strong>：神经网络判别器可以表示任意复杂的代价函数，不受线性/凸函数类限制\n4. <strong>数据高效</strong>：在专家数据方面非常高效，少量演示即可学到良好策略</p>\n<h5>实验亮点</h5>\n<p>论文在 9 个经典 MuJoCo 连续控制任务上进行了实验（CartPole、Mountain Car、Reacher、HalfCheetah、Hopper、Walker、Ant、Humanoid、Disabled Ant），对比了 4 种基线方法：</p>\n<ul>\n<li><strong>Behavioral Cloning</strong>：直接监督学习</li>\n<li><strong>FEM (Feature Expectation Matching)</strong>：线性代价函数的 IRL</li>\n<li><strong>GTAL (Game-Theoretic Apprenticeship Learning)</strong>：凸代价函数的 IRL</li>\n<li><strong>Random</strong>：随机策略</li>\n</ul>\n<p>关键发现：\n- GAIL 在几乎所有任务上以 ≥70% 的专家性能稳定运行\n- 在高维 <strong>Humanoid</strong>（376 维观测）任务上，GAIL 在所有数据量设置下均达到 100% 专家性能，而 Behavioral Cloning 最高仅 60%\n- FEM 和 GTAL 在 Ant 任务上甚至不如随机策略\n- 因果熵正则化 <span class=\"kb-math kb-math-inline\">\\lambda &gt; 0</span> 在部分任务上有帮助，但 <span class=\"kb-math kb-math-inline\">\\lambda = 0</span> 已经足够好</p>",
      "quiz": {
        "q": "GAIL 中判别器 D(s,a) 的输出在策略优化中扮演什么角色？",
        "options": [
          "直接作为策略网络的监督标签",
          "作为策略优化的代价函数 c(s,a) = log D(s,a)",
          "用于估计状态价值函数 V(s)",
          "用于计算专家策略的占用度量"
        ],
        "answer": 1,
        "explain": "GAIL 将 log D(s,a) 作为代价函数传入 TRPO 策略优化步骤。当 D 认为 (s,a) 来自策略（而非专家）时，log D 较大（代价高），驱动策略向专家行为靠拢。"
      }
    },
    {
      "id": "option_critic",
      "num": 20,
      "name": "Option-Critic",
      "fullName": "选项-评论家 (Option-Critic Architecture)",
      "year": "2017",
      "org": "AAAI",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/1609.05140",
      "projectUrl": "",
      "category": "skill_hierarchical",
      "motivation": "自动学习子策略与终止条件",
      "summary": "Option-Critic 的核心目标是：自动学习子策略与终止条件。",
      "keyPoints": [
        "核心动机：自动学习子策略与终止条件",
        "代表机构：AAAI"
      ],
      "detail": "<p>自动学习子策略与终止条件</p>"
    },
    {
      "id": "feudal",
      "num": 21,
      "name": "FeUdal Networks",
      "fullName": "封建网络 (FeUdal Networks)",
      "year": "2017",
      "org": "DeepMind",
      "parent": "option_critic",
      "paperUrl": "https://arxiv.org/abs/1703.01161",
      "projectUrl": "",
      "category": "skill_hierarchical",
      "motivation": "主从架构分离目标设定与执行",
      "summary": "FeUdal Networks 的核心目标是：主从架构分离目标设定与执行。",
      "keyPoints": [
        "核心动机：主从架构分离目标设定与执行",
        "演化来源：继承或改进自 option_critic",
        "代表机构：DeepMind"
      ],
      "detail": "<p>主从架构分离目标设定与执行</p>"
    },
    {
      "id": "her",
      "num": 22,
      "name": "HER",
      "fullName": "后见经验回放 (Hindsight Experience Replay)",
      "year": "2017",
      "org": "OpenAI",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/1707.01495",
      "projectUrl": "",
      "category": "skill_hierarchical",
      "motivation": "后见经验回放解决稀疏奖励",
      "summary": "HER 的核心目标是：后见经验回放解决稀疏奖励。",
      "keyPoints": [
        "核心动机：后见经验回放解决稀疏奖励",
        "代表机构：OpenAI"
      ],
      "detail": "<p>后见经验回放解决稀疏奖励</p>"
    },
    {
      "id": "diayn",
      "num": 23,
      "name": "DIAYN",
      "fullName": "多样即所需 (Diversity is All You Need)",
      "year": "2018",
      "org": "UC Berkeley",
      "parent": "sac",
      "paperUrl": "https://arxiv.org/abs/1802.06070",
      "projectUrl": "",
      "category": "skill_hierarchical",
      "motivation": "最大化互信息发现多样化技能",
      "summary": "DIAYN 的核心目标是：最大化互信息发现多样化技能。",
      "keyPoints": [
        "核心动机：最大化互信息发现多样化技能",
        "演化来源：继承或改进自 sac",
        "代表机构：UC Berkeley"
      ],
      "detail": "<p>最大化互信息发现多样化技能</p>"
    },
    {
      "id": "hiro",
      "num": 24,
      "name": "HIRO",
      "fullName": "数据高效层次化RL (Data-Efficient Hierarchical RL)",
      "year": "2018",
      "org": "Google Brain",
      "parent": "feudal",
      "paperUrl": "https://arxiv.org/abs/1805.08296",
      "projectUrl": "",
      "category": "skill_hierarchical",
      "motivation": "目标条件奖励与离线策略修正",
      "summary": "HIRO 的核心目标是：目标条件奖励与离线策略修正。",
      "keyPoints": [
        "核心动机：目标条件奖励与离线策略修正",
        "演化来源：继承或改进自 feudal",
        "代表机构：Google Brain"
      ],
      "detail": "<p>目标条件奖励与离线策略修正</p>"
    },
    {
      "id": "skillrl",
      "num": 25,
      "name": "SkillRL",
      "fullName": "递归技能增强RL (Recursive Skill-Augmented RL)",
      "year": "2026",
      "org": "arXiv",
      "parent": "hiro",
      "paperUrl": "https://arxiv.org/abs/2602.08234",
      "projectUrl": "",
      "category": "skill_hierarchical",
      "motivation": "技能库递归演进处理超长程任务",
      "summary": "SkillRL 的核心目标是：技能库递归演进处理超长程任务。",
      "keyPoints": [
        "核心动机：技能库递归演进处理超长程任务",
        "演化来源：继承或改进自 hiro",
        "代表机构：arXiv"
      ],
      "detail": "<p>技能库递归演进处理超长程任务</p>"
    },
    {
      "id": "metaworld_hrl",
      "num": 26,
      "name": "MetaWorld-HRL",
      "fullName": "元世界层次化RL (MetaWorld Hierarchical RL)",
      "year": "2026",
      "org": "arXiv",
      "parent": "skillrl",
      "paperUrl": "https://arxiv.org/abs/2601.17507",
      "projectUrl": "",
      "category": "skill_hierarchical",
      "motivation": "层次化世界模型技能迁移组合",
      "summary": "MetaWorld-HRL 的核心目标是：层次化世界模型技能迁移组合。",
      "keyPoints": [
        "核心动机：层次化世界模型技能迁移组合",
        "演化来源：继承或改进自 skillrl",
        "代表机构：arXiv"
      ],
      "detail": "<p>层次化世界模型技能迁移组合</p>"
    },
    {
      "id": "hcc",
      "num": 27,
      "name": "HCC",
      "fullName": "层次认知缓存 (Hierarchical Cognitive Caching)",
      "year": "2026",
      "org": "arXiv",
      "parent": "skillrl",
      "paperUrl": "https://arxiv.org/abs/2601.10402",
      "projectUrl": "",
      "category": "skill_hierarchical",
      "motivation": "认知缓存保持长时策略一致性",
      "summary": "HCC（Hierarchical Cognitive Caching）提出了一种受CPU缓存层次结构启发的三层认知缓存架构（Evolving Experience → Refined Knowledge → Prior Wisdom），配合上下文预取、命中与晋升三种迁移机制，使LLM Agent在24小时超长ML任务中将上下文从200k+压缩至~70k tokens而不丢失关键策略信息，在MLE-Bench上以56.4%平均奖牌率达到SOTA。",
      "keyPoints": [
        "<strong>三层缓存架构</strong>：L1 Evolving Experience（工作记忆，原始交互trace）、L2 Refined Knowledge（中期策略记忆，phase级蒸馏摘要）、L3 Prior Wisdom（跨任务长期记忆，embedding检索的可迁移策略）",
        "<strong>三种上下文迁移机制</strong>：Context Prefetching（L3→任务初始化）、Context Hit（L1优先/L2回退的缓存命中策略）、Context Promotion（P1 phase级压缩 + P2 task级蒸馏）",
        "<strong>层次研究计划</strong>：每个phase生成 m 个探索方向 × q 个具体建议，并行执行后由P1算子压缩为精炼知识单元",
        "<strong>跨任务迁移</strong>：L3使用语义embedding + cosine相似度阈值δ检索历史任务wisdom，407个Kaggle竞赛预热构建先验库",
        "<strong>骨干模型</strong>：DeepSeek-V3.2-Speciale（编码/研究）+ DeepSeek-V3.2 with thinking（上下文晋升），24h/task，双RTX 4090",
        "<strong>SOTA结果</strong>：MLE-Bench 75题，56.4%平均奖牌率（Low 75.8%/Medium 50.9%/High 42.2%），超越Leeroo（50.7%）、Thesis（48.4%）等闭源方案",
        "<strong>消融验证</strong>：去L1→22.7%（崩溃），去L2→59.1%（下降），去L3→54.5%（轻微下降），证明三层缺一不可"
      ],
      "detail": "<h5>动机与背景</h5>\n<p>现有LLM Agent在处理超长时间跨度的科学研究任务（如24小时Kaggle竞赛）时面临根本性瓶颈：<strong>上下文窗口爆炸</strong>。随着Agent与环境交互步数增加，原始执行日志（代码、终端输出、调试信息）呈指数级增长，很快超出LLM的有效上下文窗口。简单的截断或滑动窗口策略会导致<strong>认知遗忘</strong>——Agent丢失早期关键决策和实验洞察，陷入重复探索。</p>\n<p>传统方法的缺陷：\n- <strong>线性上下文保留</strong>（如OpenHands、AIDE）：保留全部历史或简单截断，无法区分信息价值层次\n- <strong>固定摘要</strong>：一次性压缩丢失决策理由和实验细节\n- <strong>无跨任务迁移</strong>：每个任务从零开始，无法利用历史经验</p>\n<p>HCC的核心洞察是：<strong>Agent的认知应像CPU缓存一样分层管理</strong>——热数据（当前执行trace）保持原始精度，温数据（已完成phase的洞察）压缩为策略摘要，冷数据（跨任务经验）蒸馏为可迁移的先验知识。</p>\n<p><img alt=\"HCC 框架总览\" src=\"https://ar5iv.labs.arxiv.org/html/2601.10402/assets/x1.png\" />\n<em>图1：ML-Master 2.0 的 HCC 架构总览。左侧为三层缓存结构（L1/L2/L3），右侧为上下文迁移的三种操作（预取/命中/晋升）。</em></p>\n<h5>问题形式化</h5>\n<p>将Agent与环境的交互建模为序列决策过程。在时间步 <span class=\"kb-math kb-math-inline\">t</span>，Agent观察上下文 <span class=\"kb-math kb-math-inline\">C_{t-1}</span> 并生成动作 <span class=\"kb-math kb-math-inline\">a_t = \\pi_\\theta(C_{t-1})</span>，环境返回事件 <span class=\"kb-math kb-math-inline\">e_t</span>。核心挑战是设计上下文构造函数 <span class=\"kb-math kb-math-inline\">g(\\cdot)</span>，使得：</p>\n<div class=\"kb-math kb-math-display\">C_{t-1} = g(\\mathcal{E}_{t-1})</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\mathcal{E}_{t-1} = \\{e_0, e_1, \\ldots, e_{t-1}\\}</span> 是完整历史事件序列。朴素方法直接拼接所有事件，导致 <span class=\"kb-math kb-math-inline\">|C_{t-1}|</span> 线性增长直至超出窗口。HCC通过三层缓存和迁移机制重新定义 <span class=\"kb-math kb-math-inline\">g(\\cdot)</span>。</p>\n<h5>三层缓存架构</h5>\n<p><strong>L1: Evolving Experience（工作记忆）</strong></p>\n<p>L1存储当前活跃phase的原始交互trace，是Agent的\"工作记忆\"。在phase <span class=\"kb-math kb-math-inline\">p</span> 的时间步 <span class=\"kb-math kb-math-inline\">t \\in [t_{p-1}, t_p)</span>：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_1(t) = \\mathcal{E}_{t_0:t_{p-2}} \\cup \\{P_{p-1}\\} \\cup \\mathcal{E}_{t_{p-1}+1:t}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\mathcal{E}_{t_0:t_{p-2}}</span> 是历史phase边界事件，<span class=\"kb-math kb-math-inline\">P_{p-1}</span> 是上一个研究计划，<span class=\"kb-math kb-math-inline\">\\mathcal{E}_{t_{p-1}+1:t}</span> 是当前phase的完整trace。L1保持原始精度，支持精细调试和代码修正。</p>\n<p><strong>L2: Refined Knowledge（中期策略记忆）</strong></p>\n<p>L2存储已完成phase的蒸馏摘要，由P1算子从L1压缩而来。定义 <span class=\"kb-math kb-math-inline\">\\kappa_{i:j}</span> 为事件段 <span class=\"kb-math kb-math-inline\">\\mathcal{E}_{i:j}</span> 的紧凑知识摘要：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_2(t) = \\{\\kappa_{t_{r-1}+1:t_r-1}\\}_{r=1}^{p-1}</div>\n<p>每个 <span class=\"kb-math kb-math-inline\">\\kappa_p</span> 保留关键判断（如\"特征X有害\"）、实验洞察（如\"CV在split Y上泄漏\"）和决策理由，同时移除冗长的执行日志。这使Agent能回顾已验证的决策而无需携带完整执行记录。</p>\n<p><strong>L3: Prior Wisdom（跨任务长期记忆）</strong></p>\n<p>L3存储从历史任务蒸馏的可迁移策略，以embedding-value对形式持久化：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_3 \\triangleq \\{(\\mathbf{h}_n, w_n)\\}_{n=1}^{N}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\mathbf{h}_n = E(d_n)</span> 是任务描述符的语义embedding，<span class=\"kb-math kb-math-inline\">w_n</span> 是对应的蒸馏wisdom文本。L3跨任务持久化，仅在任务完成时通过P2算子更新。</p>\n<h5>上下文迁移机制</h5>\n<p><img alt=\"上下文迁移示例\" src=\"https://ar5iv.labs.arxiv.org/html/2601.10402/assets/x2.png\" />\n<em>图2：在plant-pathology-2021-fgvc8任务中的上下文迁移示例，展示预取、命中和晋升的完整流程。</em></p>\n<p><strong>1. Context Prefetching（预取：L3 → 初始化）</strong></p>\n<p>任务开始前，计算当前任务描述符的embedding <span class=\"kb-math kb-math-inline\">\\mathbf{q} = E(d_\\tau)</span>，通过cosine相似度阈值检索相关先验：</p>\n<div class=\"kb-math kb-math-display\">\\Omega_\\tau = \\{w_n \\mid (\\mathbf{h}_n, w_n) \\in \\mathcal{L}_3, \\cos(\\mathbf{q}, \\mathbf{h}_n) &gt; \\delta\\}</div>\n<p>初始上下文构造为：<span class=\"kb-math kb-math-inline\">e_0 = \\text{concat}(d_\\tau, u_{\\text{user}}, \\Omega_\\tau)</span>，确保Agent从强先验启动。</p>\n<p><strong>2. Context Hit（命中：L1优先 / L2回退）</strong></p>\n<p>上下文构造函数 <span class=\"kb-math kb-math-inline\">g(\\cdot)</span> 实现类缓存命中策略：</p>\n<div class=\"kb-math kb-math-display\">\\Psi_t(k) = \\begin{cases} e_k, &amp; e_k \\in \\mathcal{L}_1(t) \\\\ \\kappa_{t_{r-1}+1:t_r-1}, &amp; e_k \\notin \\mathcal{L}_1(t), e_k \\in \\mathcal{L}_2(t) \\\\ \\varnothing, &amp; \\text{otherwise} \\end{cases}</div>\n<p>当前phase的事件从L1以原始形式检索（缓存命中），已完成phase的事件回退到L2的精炼摘要（缓存未命中），最终上下文为所有命中结果的拼接。</p>\n<p><strong>3. Context Promotion（晋升：L1 → L2 → L3）</strong></p>\n<p>晋升分两级：</p>\n<ul>\n<li><strong>Phase级晋升（P1算子）</strong>：每个phase完成时，P1将该phase的 <span class=\"kb-math kb-math-inline\">m \\times q</span> 条并行探索轨迹压缩为单个知识单元 <span class=\"kb-math kb-math-inline\">\\kappa_p</span>，写入L2并从L1移除原始trace：</li>\n</ul>\n<div class=\"kb-math kb-math-display\">\\kappa_p = P_1(\\{\\sigma_{p,i,j}\\}_{(i,j) \\in \\mathcal{I}_p}), \\quad \\mathcal{L}_2 \\leftarrow \\mathcal{L}_2 \\cup \\{\\kappa_p\\}, \\quad \\mathcal{L}_1 \\leftarrow \\mathcal{L}_1 \\setminus \\{e \\mid e \\in \\sigma_{p,i,j}\\}</div>\n<ul>\n<li><strong>Task级晋升（P2算子）</strong>：任务完成时，P2从完整任务历史（L1+L2）蒸馏出可迁移的wisdom <span class=\"kb-math kb-math-inline\">w_\\tau</span>，写入L3：</li>\n</ul>\n<div class=\"kb-math kb-math-display\">w_\\tau = P_2(C_{t_{\\max}-1}), \\quad \\mathcal{L}_3 \\leftarrow \\mathcal{L}_3 \\cup \\{(E(d_\\tau), w_\\tau)\\}</div>\n<h5>整体工作流伪代码</h5>\n<pre><code class=\"language-python\"># HCC Agent 工作流伪代码\ndef hcc_agent(task_description, L3_wisdom_store):\n    # Phase 0: Context Prefetching\n    q = embed(task_description)\n    Omega = {w for (h, w) in L3 if cosine(q, h) &gt; delta}\n    context = concat(task_description, user_instructions, Omega)\n\n    # Generate initial code submission\n    initial_code = LLM(context, prompt=&quot;generate baseline code&quot;)\n    submit(initial_code)\n\n    for phase_p in range(1, max_phases + 1):\n        # Step 1: Hierarchical Research Plan\n        plan = LLM(context, prompt=&quot;propose m directions × q suggestions&quot;)\n\n        # Step 2: Parallel Execution\n        trajectories = {}\n        for direction_i in range(m):\n            for suggestion_j in range(q):\n                sigma_ij = execute_suggestion(plan[i][j])  # code → run → debug\n                trajectories[(i,j)] = sigma_ij\n\n        # Step 3: Context Hit (build context for next phase)\n        # Current phase traces from L1 (raw), past phases from L2 (summaries)\n\n        # Step 4: Phase-level Promotion (P1)\n        kappa_p = P1_summarize(trajectories)  # LLM-based compression\n        L2.add(kappa_p)\n        L1.remove(raw_traces_of_phase_p)\n\n        # Update context via hit policy\n        context = build_context_with_hit_policy(L1, L2)\n\n    # Task-level Promotion (P2)\n    wisdom = P2_distill(full_task_history)\n    L3.add((embed(task_description), wisdom))\n</code></pre>\n<h5>上下文压缩效果</h5>\n<p><img alt=\"Token统计\" src=\"https://ar5iv.labs.arxiv.org/html/2601.10402/assets/figures/token_count.png\" />\n<em>图3：在random-acts-of-pizza任务中的上下文长度增长曲线。橙线为无HCC的原始上下文（&gt;200k tokens），蓝线为HCC管理后的上下文（~70k tokens）。Agent在第4次研究计划迭代中成功获得奖牌。</em></p>\n<p>HCC的关键效果是将上下文从超过200k tokens压缩至约70k tokens，同时保留了所有关键的策略洞察和实验结论。这使得Agent能在有限的上下文窗口内维持跨越数十小时的战略连贯性。</p>\n<h5>实验结果</h5>\n<p>在MLE-Bench（75个真实Kaggle任务）上的评估结果：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>Agent</th>\n<th>Backbone</th>\n<th>Low(%)</th>\n<th>Medium(%)</th>\n<th>High(%)</th>\n<th>Avg Medal(%)</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>MLAB</td>\n<td>gpt-4o</td>\n<td>4.6</td>\n<td>0.0</td>\n<td>0.0</td>\n<td>1.6</td>\n</tr>\n<tr>\n<td>OpenHands</td>\n<td>gpt-4o</td>\n<td>12.1</td>\n<td>1.8</td>\n<td>2.2</td>\n<td>4.9</td>\n</tr>\n<tr>\n<td>AIDE</td>\n<td>o1-preview</td>\n<td>35.9</td>\n<td>8.5</td>\n<td>11.7</td>\n<td>17.1</td>\n</tr>\n<tr>\n<td>R&amp;D-Agent</td>\n<td>gpt-5</td>\n<td>68.2</td>\n<td>21.1</td>\n<td>22.2</td>\n<td>35.1</td>\n</tr>\n<tr>\n<td>FM Agent</td>\n<td>Gemini-2.5-Pro</td>\n<td>62.1</td>\n<td>36.8</td>\n<td>33.3</td>\n<td>43.6</td>\n</tr>\n<tr>\n<td>Thesis</td>\n<td>gpt-5-codex</td>\n<td>65.2</td>\n<td>45.6</td>\n<td>31.1</td>\n<td>48.4</td>\n</tr>\n<tr>\n<td>Leeroo*</td>\n<td>Gemini-3-pro</td>\n<td>68.2</td>\n<td>44.7</td>\n<td>40.0</td>\n<td>50.7</td>\n</tr>\n<tr>\n<td>ML-Master</td>\n<td>DeepSeek-R1</td>\n<td>48.5</td>\n<td>20.2</td>\n<td>24.4</td>\n<td>29.3</td>\n</tr>\n<tr>\n<td><strong>ML-Master 2.0</strong></td>\n<td><strong>DS-V3.2-Speciale</strong></td>\n<td><strong>75.8</strong></td>\n<td><strong>50.9</strong></td>\n<td><strong>42.2</strong></td>\n<td><strong>56.4</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p>消融实验（MLE-Bench-Lite, 22题）：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>配置</th>\n<th>Valid(%)</th>\n<th>Median+(%)</th>\n<th>Medal(%)</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>① 去L1（无迭代交互）</td>\n<td>54.5</td>\n<td>36.4</td>\n<td>22.7</td>\n</tr>\n<tr>\n<td>② 去L2（无上下文压缩）</td>\n<td>95.5</td>\n<td>81.8</td>\n<td>59.1</td>\n</tr>\n<tr>\n<td>③ 去L3（无跨任务迁移）</td>\n<td>95.5</td>\n<td>72.7</td>\n<td>54.5</td>\n</tr>\n<tr>\n<td>④ 完整HCC</td>\n<td>95.5</td>\n<td>81.8</td>\n<td><strong>72.7</strong></td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 <strong>关键发现</strong>：L1是基础（去除后奖牌率暴跌至22.7%），L2提升顶尖表现（59.1%→72.7%），L3提供强初始化（54.5%→72.7%）。三层协同效果远超各层独立贡献之和。</div>\n<h5>与传统方法的核心区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th>线性保留（OpenHands等）</th>\n<th>固定摘要</th>\n<th>HCC</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>上下文增长</td>\n<td>线性，终将溢出</td>\n<td>固定大小但信息损失</td>\n<td>分层压缩，动态平衡</td>\n</tr>\n<tr>\n<td>历史访问</td>\n<td>全部或截断</td>\n<td>仅摘要</td>\n<td>热数据原始+冷数据摘要</td>\n</tr>\n<tr>\n<td>跨任务迁移</td>\n<td>无</td>\n<td>无</td>\n<td>L3 embedding检索</td>\n</tr>\n<tr>\n<td>认知连贯性</td>\n<td>截断后丢失</td>\n<td>摘要粒度粗</td>\n<td>Phase级精炼保留决策理由</td>\n</tr>\n</tbody>\n</table></div>",
      "quiz": {
        "q": "在HCC架构中，当Agent需要回顾一个已完成phase的实验结论时，上下文构造函数g(·)会从哪一层缓存获取信息？",
        "options": [
          "L1 Evolving Experience，因为它保存了所有原始交互记录",
          "L2 Refined Knowledge，因为已完成phase的原始trace已被P1算子压缩并迁移至此",
          "L3 Prior Wisdom，因为所有历史信息最终都会蒸馏到长期记忆",
          "直接从LLM的参数记忆中检索，无需显式缓存"
        ],
        "answer": 1,
        "explain": "HCC的Context Hit机制实现L1优先/L2回退策略：当前phase的事件从L1获取原始形式，而已完成phase的原始trace在Phase级晋升时已被P1算子压缩为精炼知识单元κ并存入L2，同时从L1中移除。因此回顾已完成phase时，g(·)从L2获取压缩后的摘要。"
      }
    },
    {
      "id": "icm",
      "num": 28,
      "name": "ICM",
      "fullName": "内在好奇心模块 (Intrinsic Curiosity Module)",
      "year": "2017",
      "org": "UC Berkeley",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/1705.05363",
      "projectUrl": "",
      "category": "reward_design",
      "motivation": "预测误差产生好奇心内在奖励",
      "summary": "ICM 的核心目标是：预测误差产生好奇心内在奖励。",
      "keyPoints": [
        "核心动机：预测误差产生好奇心内在奖励",
        "代表机构：UC Berkeley"
      ],
      "detail": "<p>预测误差产生好奇心内在奖励</p>"
    },
    {
      "id": "rnd",
      "num": 29,
      "name": "RND",
      "fullName": "随机网络蒸馏 (Random Network Distillation)",
      "year": "2018",
      "org": "OpenAI",
      "parent": "icm",
      "paperUrl": "https://arxiv.org/abs/1810.12894",
      "projectUrl": "",
      "category": "reward_design",
      "motivation": "随机网络蒸馏衡量状态新颖性",
      "summary": "RND 的核心目标是：随机网络蒸馏衡量状态新颖性。",
      "keyPoints": [
        "核心动机：随机网络蒸馏衡量状态新颖性",
        "演化来源：继承或改进自 icm",
        "代表机构：OpenAI"
      ],
      "detail": "<p>随机网络蒸馏衡量状态新颖性</p>"
    },
    {
      "id": "lagea",
      "num": 30,
      "name": "LaGEA",
      "fullName": "时间接地奖励塑形 (Temporally Grounded Reward Shaping)",
      "year": "2026",
      "org": "arXiv",
      "parent": "rnd",
      "paperUrl": "https://arxiv.org/abs/2602.03001",
      "projectUrl": "",
      "category": "reward_design",
      "motivation": "VLM反射时间接地奖励塑形",
      "summary": "LaGEA 的核心目标是：VLM反射时间接地奖励塑形。",
      "keyPoints": [
        "核心动机：VLM反射时间接地奖励塑形",
        "演化来源：继承或改进自 rnd",
        "代表机构：arXiv"
      ],
      "detail": "<p>VLM反射时间接地奖励塑形</p>"
    },
    {
      "id": "mrbt",
      "num": 31,
      "name": "MRBT",
      "fullName": "掩码奖励行为树 (Masking Reward Behavior Tree)",
      "year": "2026",
      "org": "arXiv",
      "parent": "lagea",
      "paperUrl": "https://arxiv.org/abs/2602.04567",
      "projectUrl": "",
      "category": "reward_design",
      "motivation": "行为树+SMT确保奖励逻辑可验证",
      "summary": "MRBT 的核心目标是：行为树+SMT确保奖励逻辑可验证。",
      "keyPoints": [
        "核心动机：行为树+SMT确保奖励逻辑可验证",
        "演化来源：继承或改进自 lagea",
        "代表机构：arXiv"
      ],
      "detail": "<p>行为树+SMT确保奖励逻辑可验证</p>"
    },
    {
      "id": "vsimr",
      "num": 32,
      "name": "VSIMR",
      "fullName": "变分状态内在奖励 (Variational State Intrinsic Reward)",
      "year": "2025",
      "org": "arXiv",
      "parent": "rnd",
      "paperUrl": "https://arxiv.org/abs/2508.18420",
      "projectUrl": "",
      "category": "reward_design",
      "motivation": "状态新颖性+LLM解决极端稀疏奖励",
      "summary": "VSIMR 的核心目标是：状态新颖性+LLM解决极端稀疏奖励。",
      "keyPoints": [
        "核心动机：状态新颖性+LLM解决极端稀疏奖励",
        "演化来源：继承或改进自 rnd",
        "代表机构：arXiv"
      ],
      "detail": "<p>状态新颖性+LLM解决极端稀疏奖励</p>"
    },
    {
      "id": "mbpo",
      "num": 33,
      "name": "MBPO",
      "fullName": "基于模型的策略优化 (Model-Based Policy Optimization)",
      "year": "2019",
      "org": "UC Berkeley",
      "parent": "sac",
      "paperUrl": "https://arxiv.org/abs/1906.08253",
      "projectUrl": "",
      "category": "world_model",
      "motivation": "短步长模型rollout平衡偏差与效率",
      "summary": "MBPO 的核心目标是：短步长模型rollout平衡偏差与效率。",
      "keyPoints": [
        "核心动机：短步长模型rollout平衡偏差与效率",
        "演化来源：继承或改进自 sac",
        "代表机构：UC Berkeley"
      ],
      "detail": "<p>短步长模型rollout平衡偏差与效率</p>"
    },
    {
      "id": "dreamerv1",
      "num": 34,
      "name": "DreamerV1",
      "fullName": "梦想者V1 (Dream to Control)",
      "year": "2019",
      "org": "DeepMind",
      "parent": "mbpo",
      "paperUrl": "https://arxiv.org/abs/1912.01603",
      "projectUrl": "",
      "category": "world_model",
      "motivation": "隐空间世界模型想象训练",
      "summary": "DreamerV1 的核心目标是：隐空间世界模型想象训练。",
      "keyPoints": [
        "核心动机：隐空间世界模型想象训练",
        "演化来源：继承或改进自 mbpo",
        "代表机构：DeepMind"
      ],
      "detail": "<p>隐空间世界模型想象训练</p>"
    },
    {
      "id": "dreamerv2",
      "num": 35,
      "name": "DreamerV2",
      "fullName": "梦想者V2 (Mastering Atari with Discrete World Models)",
      "year": "2020",
      "org": "DeepMind",
      "parent": "dreamerv1",
      "paperUrl": "https://arxiv.org/abs/2010.02193",
      "projectUrl": "",
      "category": "world_model",
      "motivation": "离散隐变量提升表征能力",
      "summary": "DreamerV2 的核心目标是：离散隐变量提升表征能力。",
      "keyPoints": [
        "核心动机：离散隐变量提升表征能力",
        "演化来源：继承或改进自 dreamerv1",
        "代表机构：DeepMind"
      ],
      "detail": "<p>离散隐变量提升表征能力</p>"
    },
    {
      "id": "dreamerv3",
      "num": 36,
      "name": "DreamerV3",
      "fullName": "梦想者V3 (Mastering Diverse Domains through World Models)",
      "year": "2023",
      "org": "DeepMind",
      "parent": "dreamerv2",
      "paperUrl": "https://arxiv.org/abs/2301.04104",
      "projectUrl": "",
      "category": "world_model",
      "motivation": "symlog变换实现跨任务通用性",
      "summary": "DreamerV3 通过 symlog 预测、离散回归（twohot 编码）和鲁棒的回报归一化等一系列信号尺度无关的设计，使得一套固定超参数即可在超过 150 个跨领域基准任务（Atari、DMC、Minecraft 等）上达到或超越专门调参的算法，首次以通用 MBRL 智能体在 Minecraft 中无人类数据地从零收集钻石。",
      "keyPoints": [
        "<strong>Symlog 预测</strong>：对世界模型的解码器和奖励预测器使用 <span class=\"kb-math kb-math-inline\">\\operatorname{symlog}</span> 变换压缩目标尺度，使同一网络适应从 <span class=\"kb-math kb-math-inline\">10^{-1}</span> 到 <span class=\"kb-math kb-math-inline\">10^{4}</span> 量级的信号",
        "<strong>RSSM 世界模型</strong>：由序列模型（GRU）、编码器、动力学先验、解码器、奖励预测器和 continue 预测器组成，在隐空间中进行想象训练",
        "<strong>KL 平衡 + Free Bits</strong>：世界模型损失中对 KL 散度使用 <span class=\"kb-math kb-math-inline\">\\alpha=0.5</span> 的 KL 平衡和 1 nat 的 free bits，避免后验坍缩和先验过拟合",
        "<strong>Critic 离散回归</strong>：Critic 在 symlog 空间的 255 个等距桶上输出 softmax 分布，使用 twohot 编码的软标签进行分类交叉熵训练，有效处理多模态回报分布",
        "<strong>鲁棒回报归一化</strong>：使用 <span class=\"kb-math kb-math-inline\">\\lambda</span>-return 的第 5 至第 95 百分位距作为缩放因子 <span class=\"kb-math kb-math-inline\">S</span>，仅在 <span class=\"kb-math kb-math-inline\">S&gt;1</span> 时缩小回报，避免稀疏奖励下放大噪声",
        "<strong>固定超参数</strong>：单一熵正则化系数 <span class=\"kb-math kb-math-inline\">\\eta=3\\times10^{-4}</span>、折扣因子 <span class=\"kb-math kb-math-inline\">\\gamma=0.997</span>、想象步长 <span class=\"kb-math kb-math-inline\">T=16</span> 等超参数在所有领域通用",
        "<strong>跨领域验证</strong>：在 7 大领域超过 150 个任务上测试，包括连续/离散动作、稠密/稀疏奖励、2D/3D 视觉输入等多种设置",
        "<strong>Minecraft 钻石里程碑</strong>：首个无人类演示、无课程学习、从零在 Minecraft 中收集钻石的通用智能体"
      ],
      "detail": "<h5>整体架构示意图</h5>\n<div class=\"img-wrap\"><img src=\"https://ar5iv.labs.arxiv.org/html/2301.04104v2/assets/figures/method.png\" alt=\"DreamerV3 整体架构\" loading=\"lazy\"><p class=\"img-caption\">▲ DreamerV3 整体架构</p></div>\n<p><em>图：DreamerV3 的三阶段训练流程。(1) 世界模型从经验中学习紧凑的隐空间表征；(2) Actor-Critic 在世界模型的想象轨迹中学习行为策略；(3) 智能体在真实环境中执行动作并收集新经验。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># DreamerV3 训练循环伪代码\nInitialize world model (RSSM), actor π_θ, critic v_ψ, replay buffer D\n\nfor each training step:\n    # === Phase 1: Environment Interaction ===\n    s_t = world_model.encode(o_t)          # 编码观测为模型状态\n    a_t ~ π_θ(a_t | s_t)                   # 从策略采样动作\n    o_{t+1}, r_t, done = env.step(a_t)     # 环境交互\n    D.add(o_t, a_t, r_t, done)             # 存入回放缓冲区\n\n    # === Phase 2: World Model Learning ===\n    batch = D.sample(B=16, T=64)           # 采样序列批次\n    # RSSM: 编码 → 动力学预测 → 解码\n    L_pred = -ln p(o_t|s_t) - ln p(r_t|s_t) - ln p(c_t|s_t)  # symlog MSE + twohot CE\n    L_dyn  = max(1, KL[sg(posterior) || prior])                 # free bits\n    L_rep  = max(1, KL[posterior || sg(prior)])                 # free bits\n    L_WM   = 1·L_pred + 0.5·L_dyn + 0.1·L_rep\n    update world_model with L_WM\n\n    # === Phase 3: Imagination (Actor-Critic Learning) ===\n    imagine s_{1:T} using dynamics + actor (T=16 steps)\n    r_{1:T} = reward_predictor(s_{1:T})\n    c_{1:T} = continue_predictor(s_{1:T})\n\n    # Compute λ-returns with bootstrapping\n    R^λ_T = v_ψ(s_T)\n    for t = T-1 to 1:\n        R^λ_t = r_t + γ·c_t·((1-λ)·v_ψ(s_{t+1}) + λ·R^λ_{t+1})\n\n    # Critic: discrete regression with twohot targets\n    targets = sg(twohot(symlog(R^λ_t)))\n    L_critic = -Σ targets^T · ln p_ψ(·|s_t)     # cross entropy\n    update critic with L_critic (+ EMA regularization)\n\n    # Actor: normalized returns + entropy\n    S = Percentile(R^λ, 95) - Percentile(R^λ, 5)\n    L_actor = -Σ sg(R^λ_t) / max(1, S) - η·H[π_θ(·|s_t)]   # η=3e-4\n    update actor with L_actor\n</code></pre>\n<h5>动机与背景</h5>\n<p>基于模型的强化学习（MBRL）通过学习环境的世界模型并在模型内部进行\"想象\"训练，具有极高的样本效率。DreamerV1/V2 在 Atari 和连续控制任务上取得了优异成绩，但面临一个根本性挑战：<strong>不同任务的奖励尺度、频率和动态范围差异巨大</strong>，导致同一套超参数无法跨领域通用。例如，Atari 中奖励可达数千，而机器人控制中奖励通常在 <span class=\"kb-math kb-math-inline\">[0, 1]</span> 范围内。</p>\n<p>DreamerV3 的核心动机是设计一系列<strong>信号尺度无关（scale-invariant）</strong>的机制，使算法无需针对每个任务调参即可在多样化领域中表现良好。</p>\n<h5>核心机制 1：Symlog 预测</h5>\n<p>传统世界模型使用均方误差（MSE）损失训练解码器和奖励预测器。当目标值跨越多个数量级时，大值主导梯度，小值被忽略。DreamerV3 引入 symlog 变换：</p>\n<div class=\"kb-math kb-math-display\">\\operatorname{symlog}(x) \\doteq \\operatorname{sign}(x)\\ln(|x|+1)</div>\n<div class=\"kb-math kb-math-display\">\\operatorname{symexp}(x) \\doteq \\operatorname{sign}(x)(\\exp(|x|)-1)</div>\n<p>网络在 symlog 空间中预测，损失函数变为：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}(\\theta) = \\frac{1}{2}\\big(\\operatorname{symlog}(y) - \\hat{y}_\\theta\\big)^2</div>\n<div class=\"key-point\">💡 <strong>关键直觉</strong>：symlog 是一种\"软对数\"变换——对大值近似取对数压缩，对小值近似恒等保持。这使得网络可以同时精确预测 0.01 和 10000 量级的目标，而无需调整损失权重。</div>\n<h5>核心机制 2：RSSM 世界模型</h5>\n<p>世界模型基于循环状态空间模型（RSSM），模型状态 <span class=\"kb-math kb-math-inline\">s_t = \\{h_t, z_t\\}</span> 由确定性循环状态 <span class=\"kb-math kb-math-inline\">h_t</span> 和随机离散表征 <span class=\"kb-math kb-math-inline\">z_t</span>（32 个类别 × 32 维 one-hot）组成：</p>\n<div class=\"kb-math kb-math-display\">\\begin{aligned}\n\\text{Sequence model:} \\quad &amp; h_t = f_\\phi(h_{t-1}, z_{t-1}, a_{t-1}) \\\\\n\\text{Encoder:} \\quad &amp; z_t \\sim q_\\phi(z_t \\mid h_t, x_t) \\\\\n\\text{Dynamics (prior):} \\quad &amp; \\hat{z}_t \\sim p_\\phi(\\hat{z}_t \\mid h_t) \\\\\n\\text{Decoder:} \\quad &amp; \\hat{x}_t \\sim p_\\phi(\\hat{x}_t \\mid h_t, z_t) \\\\\n\\text{Reward:} \\quad &amp; \\hat{r}_t \\sim p_\\phi(\\hat{r}_t \\mid h_t, z_t) \\\\\n\\text{Continue:} \\quad &amp; \\hat{c}_t \\sim p_\\phi(\\hat{c}_t \\mid h_t, z_t)\n\\end{aligned}</div>\n<p>世界模型损失由三部分组成：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_\\text{WM}(\\phi) = \\beta_\\text{pred}\\,\\mathcal{L}_\\text{pred} + \\beta_\\text{dyn}\\,\\mathcal{L}_\\text{dyn} + \\beta_\\text{rep}\\,\\mathcal{L}_\\text{rep}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\beta_\\text{pred}=1, \\beta_\\text{dyn}=0.5, \\beta_\\text{rep}=0.1</span>。动力学损失和表征损失分别使用 stop-gradient 实现 <strong>KL 平衡</strong>：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_\\text{dyn}(\\phi) = \\max\\big(1, \\mathrm{KL}[\\operatorname{sg}(q_\\phi) \\| p_\\phi]\\big)</div>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_\\text{rep}(\\phi) = \\max\\big(1, \\mathrm{KL}[q_\\phi \\| \\operatorname{sg}(p_\\phi)]\\big)</div>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：free bits 阈值为 1 nat，意味着当 KL 散度低于 1 nat 时不产生梯度。这允许编码器保留少量不可预测的信息（如随机噪声），避免过度压缩表征。此外，后验分布混入 1% 均匀分布以防止梯度稀疏。</div>\n<h5>核心机制 3：Critic 离散回归</h5>\n<p>传统 Critic 使用标量回归预测回报值，但当回报分布呈多模态（如稀疏奖励下大量零回报 + 少量高回报）时，均值回归会产生偏差。DreamerV3 的 Critic 输出一个在 symlog 空间 <span class=\"kb-math kb-math-inline\">[-20, +20]</span> 范围内 255 个等距桶上的 softmax 分布：</p>\n<div class=\"kb-math kb-math-display\">v_\\psi(s_t) \\doteq \\operatorname{symexp}\\big(p_\\psi(\\cdot\\mid s_t)^T B\\big), \\quad B \\doteq [-20 \\;\\ldots\\; +20]</div>\n<p>训练目标使用 <strong>twohot 编码</strong>的 <span class=\"kb-math kb-math-inline\">\\lambda</span>-return 作为软标签，通过分类交叉熵优化：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_\\text{critic}(\\psi) = -\\sum_{t=1}^{T} y_t^T \\ln p_\\psi(\\cdot \\mid s_t), \\quad y_t = \\operatorname{sg}\\big(\\operatorname{twohot}(\\operatorname{symlog}(R_t^\\lambda))\\big)</div>\n<p>其中 twohot 编码将连续值分配到最近的两个桶上，权重与距离成反比。<span class=\"kb-math kb-math-inline\">\\lambda</span>-return 的递推公式为：</p>\n<div class=\"kb-math kb-math-display\">R_t^\\lambda \\doteq r_t + \\gamma c_t \\big((1-\\lambda)v_\\psi(s_{t+1}) + \\lambda R_{t+1}^\\lambda\\big), \\quad R_T^\\lambda \\doteq v_\\psi(s_T)</div>\n<div class=\"key-point\">💡 <strong>关键直觉</strong>：离散回归让 Critic 维护完整的回报分布而非单一均值。在稀疏奖励环境中，Critic 可以同时表示\"大概率零回报\"和\"小概率高回报\"两个模态，显著加速学习。</div>\n<h5>核心机制 4：鲁棒回报归一化</h5>\n<p>Actor 损失为：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}(\\theta) \\doteq \\sum_{t=1}^{T} \\operatorname{E}_{\\pi_\\theta, p_\\phi}\\big[\\operatorname{sg}(R_t^\\lambda) / \\max(1, S)\\big] - \\eta\\,\\mathrm{H}[\\pi_\\theta(a_t \\mid s_t)]</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\eta = 3 \\times 10^{-4}</span> 为熵正则化系数。关键创新在于缩放因子 <span class=\"kb-math kb-math-inline\">S</span>：</p>\n<div class=\"kb-math kb-math-display\">S = \\operatorname{Per}(R_t^\\lambda, 95) - \\operatorname{Per}(R_t^\\lambda, 5)</div>\n<p>使用百分位距而非标准差有两个优势：(1) 对异常值鲁棒；(2) 通过 <span class=\"kb-math kb-math-inline\">\\max(1, S)</span> 确保<strong>只缩小大回报、不放大小回报</strong>——当奖励稀疏时 <span class=\"kb-math kb-math-inline\">S &lt; 1</span>，回报不被缩放，策略保持足够的探索熵。</p>\n<div class=\"key-point\">💡 <strong>关键直觉</strong>：这一简单的非对称归一化是 DreamerV3 能用单一 <span class=\"kb-math kb-math-inline\">\\eta</span> 同时适应稠密和稀疏奖励的核心。传统方法除以标准差会在稀疏奖励下放大噪声，导致策略过早确定化而无法探索。</div>\n<h5>与 DreamerV2 的关键区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>DreamerV2</th>\n<th>DreamerV3</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>预测损失</td>\n<td>MSE / 交叉熵</td>\n<td><strong>Symlog MSE</strong></td>\n</tr>\n<tr>\n<td>Critic 输出</td>\n<td>标量回归</td>\n<td><strong>255 桶离散回归 (twohot)</strong></td>\n</tr>\n<tr>\n<td>回报归一化</td>\n<td>除以标准差</td>\n<td><strong>百分位距 + max(1, S)</strong></td>\n</tr>\n<tr>\n<td>熵正则</td>\n<td>需要调参</td>\n<td><strong>固定 η=3e-4</strong></td>\n</tr>\n<tr>\n<td>KL 平衡</td>\n<td>α=0.8</td>\n<td><strong>α=0.5</strong></td>\n</tr>\n<tr>\n<td>后验分布</td>\n<td>纯分类</td>\n<td><strong>混入 1% 均匀分布</strong></td>\n</tr>\n<tr>\n<td>网络初始化</td>\n<td>默认</td>\n<td><strong>奖励/Critic 输出层零初始化</strong></td>\n</tr>\n<tr>\n<td>适用范围</td>\n<td>主要 Atari</td>\n<td><strong>7 大领域 150+ 任务</strong></td>\n</tr>\n</tbody>\n</table></div>\n<h5>实验亮点</h5>\n<p>DreamerV3 在以下领域均使用<strong>完全相同的超参数</strong>取得了强竞争力的表现：</p>\n<ul>\n<li><strong>Atari 100K &amp; 200M</strong>：匹配或超越专门调参的 EfficientZero、MuZero</li>\n<li><strong>DMControl (Proprio &amp; Vision)</strong>：连续控制基准上达到 SOTA</li>\n<li><strong>BSuite</strong>：诊断性基准上表现优异</li>\n<li><strong>Crafter</strong>：程序生成的 2D 生存游戏中刷新记录</li>\n<li><strong>Minecraft (钻石收集)</strong>：首次无人类数据从零收集钻石，需要完成约 20 步的长程依赖任务链（砍树→制作工作台→制作木镐→挖石头→制作石镐→挖铁→熔炼→制作铁镐→挖钻石）</li>\n</ul>",
      "quiz": {
        "q": "DreamerV3 中 Critic 使用离散回归（twohot 编码 + softmax 分布）而非传统标量回归的主要原因是什么？",
        "options": [
          "减少 Critic 网络的参数量",
          "使 Critic 能够表示多模态回报分布，加速稀疏奖励环境中的学习",
          "避免使用目标网络（target network）",
          "使 Critic 的输出可微分以支持反向传播"
        ],
        "answer": 1,
        "explain": "稀疏奖励环境中回报分布通常呈双模态（大量零回报+少量高回报），标量回归只能预测均值，而离散回归让 Critic 维护完整分布，能同时表示两个模态，显著加速学习。"
      }
    },
    {
      "id": "dreamdojo",
      "num": 37,
      "name": "DreamDojo",
      "fullName": "梦想道场 (Generalist Robot World Model)",
      "year": "2026",
      "org": "arXiv",
      "parent": "dreamerv3",
      "paperUrl": "https://arxiv.org/abs/2602.06949",
      "projectUrl": "",
      "category": "world_model",
      "motivation": "人类视频预训练通用世界模型",
      "summary": "DreamDojo 提出了一种基于大规模人类视频预训练的通用机器人世界模型框架，通过隐式动作（latent action）桥接人类视频与机器人数据之间的动作空间鸿沟，结合三阶段训练流程（预训练→后训练→蒸馏）和 Self Forcing 实时推理技术，在灵巧操作任务中实现了高保真视频预测，并成功应用于策略评估（Pearson r=0.995）、模型规划（2× 提升）和实时遥操作等下游任务。",
      "keyPoints": [
        "<strong>DreamDojo-HV 数据集</strong>：从 Ego4D、Epic-Kitchens 等来源精心筛选 44,000 小时人类手部操作视频，通过手部检测、运动过滤、美学评分等多阶段管线进行质量控制",
        "<strong>隐式动作模型（Latent Action Model）</strong>：训练 VAE 从连续帧对 <span class=\"kb-math kb-math-inline\">(o_t, o_{t+1})</span> 中提取连续隐式动作向量 <span class=\"kb-math kb-math-inline\">z_t</span>，使无动作标注的人类视频也能以动作条件方式训练世界模型",
        "<strong>相对动作表示 + 因果动作分块</strong>：使用 <span class=\"kb-math kb-math-inline\">a_t^{\\text{rel}} = a_t - a_{t-1}</span> 消除不同机器人形态的绝对动作偏移；因果分块确保生成第 <span class=\"kb-math kb-math-inline\">t</span> 帧时仅使用 <span class=\"kb-math kb-math-inline\">a_{1:t}</span> 而非未来动作",
        "<strong>三阶段训练流程</strong>：(1) 在人类视频上用隐式动作预训练；(2) 在目标机器人数据上用真实动作后训练（50/50 数据混合最优）；(3) Self Forcing 蒸馏实现实时自回归生成",
        "<strong>架构设计</strong>：基于 Cosmos-Predict2.5（DiT 架构），动作通过自适应层归一化（adaLN）注入，与扩散时间步共享条件通道",
        "<strong>时间一致性损失</strong>：在相邻帧的 latent token 之间施加余弦相似度约束，抑制自回归漂移",
        "<strong>下游应用验证</strong>：策略评估（与真实成功率 Pearson r=0.995）、基于模型的规划（相比无模型基线 2× 提升）、实时遥操作反馈"
      ],
      "detail": "<h5>系统架构总览</h5>\n<div class=\"img-wrap\"><img src=\"https://ar5iv.labs.arxiv.org/html/2602.06949/assets/figures/teaser.png\" alt=\"DreamDojo 系统架构\" loading=\"lazy\"><p class=\"img-caption\">▲ DreamDojo 系统架构</p></div>\n<p><em>图：DreamDojo 的三阶段训练流程。Stage 1 在大规模人类视频上用隐式动作预训练世界模型；Stage 2 在目标机器人数据上用真实动作后训练；Stage 3 通过 Self Forcing 蒸馏实现实时自回归推理。下游应用包括策略评估、模型规划和实时遥操作。</em></p>\n<h5>算法伪代码</h5>\n<pre><code>Algorithm: DreamDojo 三阶段训练流程\n══════════════════════════════════════════════════\n\n【Stage 0: 隐式动作模型训练】\n初始化 VAE 编码器 q_φ(z|o_t, o_{t+1}), 解码器 p_ψ(o_{t+1}|o_t, z)\nfor each (o_t, o_{t+1}) in 人类视频数据 do\n    z ~ q_φ(z|o_t, o_{t+1})                    # 编码隐式动作\n    ô_{t+1} = p_ψ(o_{t+1}|o_t, z)              # 解码预测下一帧\n    L_VAE = L_recon(ô_{t+1}, o_{t+1}) + β·KL(q_φ || N(0,I))\n    更新 φ, ψ\nend for\n\n【Stage 1: 人类视频预训练】\n初始化世界模型 W_θ (基于 Cosmos-Predict2.5 DiT)\nfor each 视频片段 {o_1,...,o_T} in DreamDojo-HV do\n    for t = 1 to T-1 do\n        z_t = q_φ(z|o_t, o_{t+1})              # 提取隐式动作（冻结VAE）\n    end for\n    a^{rel}_t = z_t - z_{t-1}                   # 相对隐式动作\n    A_{1:t} = CausalChunk(a^{rel}_{1:T})        # 因果动作分块\n    L_pretrain = L_flow(W_θ(o_{1:T}|A_{1:T}))   # Flow matching 损失\n                + λ·L_temporal                    # 时间一致性损失\n    更新 θ\nend for\n\n【Stage 2: 机器人数据后训练】\nfor each (视频, 动作) in 机器人数据 ∪ 人类视频(50/50) do\n    if 机器人数据:\n        a^{rel}_t = a_t - a_{t-1}               # 真实相对动作\n    else:\n        a^{rel}_t = z_t - z_{t-1}               # 隐式相对动作\n    L_posttrain = L_flow(W_θ(o_{1:T}|A_{1:T})) + λ·L_temporal\n    更新 θ\nend for\n\n【Stage 3: Self Forcing 蒸馏】\nfor each 训练样本 do\n    # 教师：完整上下文（真实帧）\n    ô^{teacher} = W_θ(noise | o_{1:T}, A)       # 全上下文前向\n    # 学生：自回归（用自己的预测帧）\n    for t = 1 to T do\n        ô_t = W_θ(noise | ô_{1:t-1}, A_{1:t})  # 用预测帧做上下文\n    end for\n    L_distill = ||ô^{student} - sg(ô^{teacher})||²  # sg=stop gradient\n    更新 θ（仅学生路径）\nend for\n</code></pre>\n<h5>动机与背景</h5>\n<p>构建通用机器人世界模型面临两大核心挑战：</p>\n<ol>\n<li><strong>数据稀缺</strong>：高质量机器人操作数据极其有限（如 DROID 仅约 350 小时），远不足以训练大规模视频生成模型</li>\n<li><strong>动作空间鸿沟</strong>：人类视频虽然海量但缺乏动作标注，且人手与机器人末端执行器的形态差异巨大</li>\n</ol>\n<p>DreamDojo 的核心洞察是：<strong>人类操作视频蕴含丰富的物理交互先验</strong>（物体动力学、接触力学、空间推理），这些先验可以通过隐式动作模型迁移到机器人世界模型中。这一思路类似于大语言模型先在大规模文本上预训练、再在特定任务上微调的范式。</p>\n<h5>隐式动作模型（Latent Action Model）</h5>\n<p>隐式动作模型是连接人类视频与机器人数据的关键桥梁。其核心思想是：即使没有显式动作标注，连续两帧之间的变化本身就隐含了\"动作\"信息。</p>\n<p><strong>模型结构</strong>：采用 VAE 架构\n- <strong>编码器</strong> <span class=\"kb-math kb-math-inline\">q_\\phi(z_t | o_t, o_{t+1})</span>：输入连续两帧，输出隐式动作向量 <span class=\"kb-math kb-math-inline\">z_t \\in \\mathbb{R}^d</span>\n- <strong>解码器</strong> <span class=\"kb-math kb-math-inline\">p_\\psi(\\hat{o}_{t+1} | o_t, z_t)</span>：给定当前帧和隐式动作，重建下一帧</p>\n<p><strong>训练目标</strong>：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{VAE}} = \\mathbb{E}_{q_\\phi}\\left[\\|o_{t+1} - \\hat{o}_{t+1}\\|^2\\right] + \\beta \\cdot D_{\\text{KL}}\\left(q_\\phi(z|o_t, o_{t+1}) \\| \\mathcal{N}(0, I)\\right)</div>\n<div class=\"key-point\">💡 <strong>关键设计</strong>：隐式动作向量 <span class=\"kb-math kb-math-inline\">z_t</span> 捕获的是帧间\"发生了什么变化\"的抽象表示，而非具体的关节角度或末端位姿。这使得同一个隐式动作空间可以统一描述人手抓取和机械臂操作。</div>\n<h5>相对动作表示（Relative Action Representation）</h5>\n<p>直接使用绝对动作值会引入机器人形态相关的偏移，阻碍跨形态迁移。DreamDojo 采用相对动作表示：</p>\n<div class=\"kb-math kb-math-display\">a_t^{\\text{rel}} = a_t - a_{t-1}</div>\n<p>对于机器人真实动作和隐式动作均适用。这样做的好处是：\n- 消除不同机器人之间的绝对位置偏移\n- 使动作语义更聚焦于\"变化量\"而非\"绝对状态\"\n- 实验证明相对表示在 FVD 指标上比绝对表示提升约 15%</p>\n<h5>因果动作分块（Causal Action Chunking）</h5>\n<p>在视频扩散模型中，标准做法是将整个动作序列 <span class=\"kb-math kb-math-inline\">a_{1:T}</span> 作为条件输入。但这存在<strong>信息泄漏</strong>问题：生成第 <span class=\"kb-math kb-math-inline\">t</span> 帧时不应看到未来动作 <span class=\"kb-math kb-math-inline\">a_{t+1:T}</span>。</p>\n<p>DreamDojo 提出因果动作分块机制：\n- 将视频帧按时间分为多个 chunk\n- 每个 chunk 仅接收当前及之前的动作作为条件\n- 通过在 DiT 的注意力机制中施加因果掩码实现</p>\n<div class=\"kb-math kb-math-display\">\\text{ActionCond}(t) = \\text{adaLN}\\left(\\text{MLP}(a_{1:\\lfloor t/C \\rfloor \\cdot C})\\right)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">C</span> 为 chunk 大小。实验表明因果分块相比非因果方式在 FVD 上提升约 10%。</p>\n<h5>世界模型架构</h5>\n<p>DreamDojo 基于 <strong>Cosmos-Predict2.5</strong>（NVIDIA 的视频生成基础模型），核心为 DiT（Diffusion Transformer）架构：</p>\n<ul>\n<li><strong>视频 Tokenizer</strong>：将视频帧编码为连续 latent tokens（非离散 token）</li>\n<li><strong>DiT 主干</strong>：Transformer 处理 spatiotemporal latent tokens</li>\n<li><strong>动作条件注入</strong>：通过 <strong>自适应层归一化（adaLN）</strong> 将动作嵌入注入每个 Transformer 块，与扩散时间步 <span class=\"kb-math kb-math-inline\">t</span> 共享条件通道：</li>\n</ul>\n<div class=\"kb-math kb-math-display\">\\text{adaLN}(h, a, t) = \\gamma(a, t) \\cdot \\text{LayerNorm}(h) + \\beta(a, t)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\gamma, \\beta</span> 由动作和时间步的拼接嵌入经 MLP 生成。</p>\n<ul>\n<li><strong>训练目标</strong>：Flow Matching（连续归一化流），相比离散扩散更高效：</li>\n</ul>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{flow}} = \\mathbb{E}_{t, x_0, \\epsilon}\\left[\\|v_\\theta(x_t, t, c) - (x_0 - \\epsilon)\\|^2\\right]</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">x_t = (1-t)x_0 + t\\epsilon</span> 为插值噪声样本，<span class=\"kb-math kb-math-inline\">v_\\theta</span> 为速度场预测网络。</p>\n<h5>时间一致性损失（Temporal Consistency Loss）</h5>\n<p>自回归生成中，误差会随时间步累积导致视觉漂移。DreamDojo 引入时间一致性正则项：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{temporal}} = 1 - \\frac{1}{T-1}\\sum_{t=1}^{T-1} \\cos(h_t, h_{t+1})</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">h_t</span> 为第 <span class=\"kb-math kb-math-inline\">t</span> 帧的 latent token 表示，<span class=\"kb-math kb-math-inline\">\\cos(\\cdot, \\cdot)</span> 为余弦相似度。该损失鼓励相邻帧在隐空间中保持平滑过渡。</p>\n<h5>Self Forcing 蒸馏</h5>\n<p>标准扩散模型在推理时需要多步去噪（如 35 步 DDPM），无法满足实时需求。DreamDojo 采用 <strong>Self Forcing</strong> 蒸馏策略：</p>\n<ol>\n<li><strong>教师模型</strong>：使用完整真实上下文帧进行多步去噪，生成高质量预测</li>\n<li><strong>学生模型</strong>：以自回归方式运行，用自己之前的预测帧作为上下文</li>\n<li><strong>蒸馏损失</strong>：学生输出对齐教师输出（stop gradient 在教师端）</li>\n</ol>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{SF}} = \\|\\hat{x}_0^{\\text{student}} - \\text{sg}(\\hat{x}_0^{\\text{teacher}})\\|^2</div>\n<p>蒸馏后的模型可以在<strong>单步去噪</strong>下实现自回归视频生成，推理速度提升约 35×，支持实时遥操作场景。</p>\n<h5>实验结果</h5>\n<p><strong>评估基准</strong>：DROID 数据集上 7 个灵巧操作任务（抓取、放置、开抽屉等）</p>\n<p><strong>关键发现</strong>：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>配置</th>\n<th>FVD ↓</th>\n<th>FID ↓</th>\n<th>SSIM ↑</th>\n<th>LPIPS ↓</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>仅机器人数据</td>\n<td>基线</td>\n<td>基线</td>\n<td>基线</td>\n<td>基线</td>\n</tr>\n<tr>\n<td>+ 人类视频预训练</td>\n<td><strong>显著提升</strong></td>\n<td><strong>显著提升</strong></td>\n<td><strong>提升</strong></td>\n<td><strong>提升</strong></td>\n</tr>\n<tr>\n<td>+ 相对动作</td>\n<td>额外 ~15% 提升</td>\n<td>—</td>\n<td>—</td>\n<td>—</td>\n</tr>\n<tr>\n<td>+ 因果分块</td>\n<td>额外 ~10% 提升</td>\n<td>—</td>\n<td>—</td>\n<td>—</td>\n</tr>\n<tr>\n<td>+ 时间一致性</td>\n<td>额外提升</td>\n<td>—</td>\n<td>—</td>\n<td>—</td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>数据混合比例消融</strong>：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>人类:机器人</th>\n<th>FVD</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>0:100</td>\n<td>较高</td>\n</tr>\n<tr>\n<td>25:75</td>\n<td>中等</td>\n</tr>\n<tr>\n<td><strong>50:50</strong></td>\n<td><strong>最优</strong></td>\n</tr>\n<tr>\n<td>75:25</td>\n<td>回升</td>\n</tr>\n<tr>\n<td>100:0</td>\n<td>最高</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 <strong>关键发现</strong>：50/50 的数据混合比例在后训练阶段表现最优，说明人类视频提供的物理先验与机器人特定数据的平衡至关重要。</div>\n<p><strong>下游应用结果</strong>：</p>\n<ol>\n<li><strong>策略评估</strong>：世界模型预测的成功率与真实环境成功率的 Pearson 相关系数达到 <strong>r = 0.995</strong>，可作为策略选择的可靠代理指标</li>\n<li><strong>模型规划</strong>：基于世界模型的 CEM（交叉熵方法）规划相比无模型基线实现 <strong>2× 成功率提升</strong></li>\n<li><strong>实时遥操作</strong>：Self Forcing 蒸馏后的模型支持实时视频预测反馈，操作员可在执行前预览动作效果</li>\n</ol>\n<h5>与相关工作的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>预训练数据</th>\n<th>动作条件</th>\n<th>实时推理</th>\n<th>下游任务</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>UniSim</td>\n<td>互联网视频</td>\n<td>文本/动作</td>\n<td>✗</td>\n<td>数据增强</td>\n</tr>\n<tr>\n<td>Genie</td>\n<td>互联网视频</td>\n<td>隐式动作</td>\n<td>✗</td>\n<td>游戏生成</td>\n</tr>\n<tr>\n<td>IRASim</td>\n<td>机器人数据</td>\n<td>机器人动作</td>\n<td>✗</td>\n<td>数据增强</td>\n</tr>\n<tr>\n<td><strong>DreamDojo</strong></td>\n<td><strong>人类视频+机器人</strong></td>\n<td><strong>隐式+真实动作</strong></td>\n<td><strong>✓（Self Forcing）</strong></td>\n<td><strong>评估+规划+遥操作</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p>DreamDojo 的独特贡献在于：(1) 首次系统性地利用大规模人类视频预训练机器人世界模型；(2) 通过隐式动作统一了异构数据源；(3) 通过 Self Forcing 实现了实时推理能力。</p>",
      "quiz": {
        "q": "",
        "options": [],
        "answer": 0,
        "explain": ""
      }
    },
    {
      "id": "adaworldpolicy",
      "num": 38,
      "name": "AdaWorldPolicy",
      "fullName": "自适应世界策略 (Adaptive World-Model-Driven Policy)",
      "year": "2026",
      "org": "arXiv",
      "parent": "dreamdojo",
      "paperUrl": "https://arxiv.org/abs/2602.07890",
      "projectUrl": "",
      "category": "world_model",
      "motivation": "流匹配DiT动作生成与未来想象",
      "summary": "AdaWorldPolicy 提出了一个统一的世界模型驱动扩散策略框架，将预训练视频世界模型（Cosmos）与动作专家、力预测器通过多模态自注意力（MMSA）深度融合，并创新性地利用世界模型的预测误差作为自监督信号，在测试时通过 LoRA 在线自适应学习（AdaOL）持续缩小视觉与物理域偏移，在仿真和真实机器人操作任务中均达到 SOTA。",
      "keyPoints": [
        "<strong>三模块统一架构</strong>：World Model（2B 参数，基于 Cosmos-Predict2）、Action Model（0.4B DiT）、Force Predictor（0.4B DiT），通过共享的多模态自注意力层（MMSA）深度耦合",
        "<strong>双运行模式</strong>：Mode I（Action Generation）——给定观测生成动作；Mode II（Future Imagination）——给定观测和动作预测未来帧，世界模型在训练时作为动作模型的主动监督者",
        "<strong>多模态自注意力（MMSA）</strong>：在 DiT 的 Transformer 层中，将世界模型、动作模型、力预测器的 token 拼接后做联合自注意力，实现跨模态信息流动，优于简单拼接或交叉注意力",
        "<strong>Flow Matching 训练</strong>：动作模型和力预测器均采用 Rectified Flow Matching 进行去噪训练，损失函数为 <span class=\"kb-math kb-math-inline\">L_1</span>（动作）和 <span class=\"kb-math kb-math-inline\">L_2</span>（力）",
        "<strong>在线自适应学习（AdaOL）</strong>：测试时利用世界模型预测的未来帧与真实观测在 VAE 隐空间的误差 <span class=\"kb-math kb-math-inline\">\\|E(o_{t+1}) - E(\\hat{o}_{t+1})\\|^2</span> 作为自监督信号，通过 LoRA（rank 16，前 4 层，&lt;0.1% 参数）以极低开销在线更新模型",
        "<strong>联合训练目标</strong>：<span class=\"kb-math kb-math-inline\">L_{total} = L_{WM} + \\lambda_1 L_{AM} + \\lambda_2 L_{FP}</span>，世界模型损失同时监督动作模型的学习质量",
        "<strong>实验覆盖广泛</strong>：LIBERO-10（0.96 成功率 SOTA）、Variant PushT（OOD 恢复）、CALVIN ABC→D（Avg. Len. 3.54 SOTA）、真实机器人 4 任务 4 种 OOD 场景"
      ],
      "detail": "<h5>框架总览</h5>\n<div class=\"img-wrap\"><img src=\"https://ar5iv.labs.arxiv.org/html/2602.20057/assets/x2.png\" alt=\"AdaWorldPolicy 框架总览\" loading=\"lazy\"><p class=\"img-caption\">▲ AdaWorldPolicy 框架总览</p></div>\n<p><em>图：AdaWorldPolicy 整体架构。左侧为统一的世界模型驱动扩散策略，包含 World Model、Action Model 和 Force Predictor 三个模块，通过 MMSA 层深度耦合。右侧为在线自适应学习（AdaOL）流程：利用世界模型预测误差驱动 LoRA 在线更新。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># ===== 离线训练阶段 =====\n# 输入: 数据集 D = {(o_t, a_t, f_t, o_{t+1})}\nfor batch in DataLoader(D):\n    o_t, a_t, f_t, o_next = batch\n\n    # 编码观测到 VAE 隐空间\n    z_t = VAE_Encode(o_t)\n    z_next = VAE_Encode(o_next)\n\n    # --- Mode I: Action Generation ---\n    # 对动作和力加噪 (Flow Matching)\n    noise_a, noise_f = sample_noise()\n    t = uniform(0, 1)\n    a_noisy = (1-t) * noise_a + t * a_t\n    f_noisy = (1-t) * noise_f + t * f_t\n\n    # MMSA 联合前向: WM tokens + AM tokens + FP tokens\n    wm_out, am_out, fp_out = MMSA_Forward(\n        wm_input=z_t,           # 世界模型: 当前帧\n        am_input=a_noisy,       # 动作模型: 带噪动作\n        fp_input=f_noisy,       # 力预测器: 带噪力\n        timestep=t\n    )\n\n    L_AM = L1(am_out, a_t - noise_a)      # 动作 flow matching loss\n    L_FP = L2(fp_out, f_t - noise_f)      # 力 flow matching loss\n\n    # --- Mode II: Future Imagination ---\n    z_next_pred = WorldModel_Forward(z_t, a_t)  # 用真实动作预测下一帧\n    L_WM = diffusion_loss(z_next_pred, z_next)  # 世界模型重建损失\n\n    # 联合优化\n    L_total = L_WM + lambda1 * L_AM + lambda2 * L_FP\n    optimizer.step(L_total)\n\n# ===== 在线自适应阶段 (AdaOL) =====\n# 测试时, 每收到新观测 o_{t+1}:\nfor each new observation o_{t+1}:\n    # 1. 用上一步动作 a_t 和观测 o_t 预测未来帧\n    o_hat_next = WorldModel_Predict(o_t, a_t)\n\n    # 2. 计算 VAE 隐空间预测误差\n    L_AdaOL = ||VAE_Encode(o_{t+1}) - VAE_Encode(o_hat_next)||^2\n\n    # 3. LoRA 在线更新 (rank=16, 前4层, lr=5e-7, 2 gradient steps)\n    lora_optimizer.step(L_AdaOL)\n\n    # 4. 生成下一步动作\n    a_{t+1} = ActionModel_Generate(o_{t+1})  # Mode I 推理\n</code></pre>\n<h5>动机与背景</h5>\n<p>传统的机器人操作策略学习面临两大核心挑战：</p>\n<ol>\n<li>\n<p><strong>策略与世界理解的割裂</strong>：现有方法要么将世界模型仅用于数据增强或辅助表征学习，要么完全依赖行为克隆，无法让世界模型在训练过程中主动指导策略优化。世界模型蕴含的丰富物理先验（物体运动规律、接触动力学）未被充分利用。</p>\n</li>\n<li>\n<p><strong>域偏移下的脆弱性</strong>：离线训练的策略在部署时面临不可避免的视觉偏移（光照、背景、物体外观变化）和物理偏移（摩擦力、物体质量变化），性能急剧下降。传统方法缺乏测试时自适应能力。</p>\n</li>\n</ol>\n<p>AdaWorldPolicy 的核心洞察是：<strong>世界模型不仅是一个被动的环境模拟器，更应该是策略学习的主动监督者</strong>。通过将世界模型与动作策略深度耦合，世界模型的预测质量直接影响策略的学习信号；而在测试时，世界模型的预测误差天然提供了一个无需人工标注的自监督信号，可用于在线自适应。</p>\n<h5>核心机制详解</h5>\n<p><strong>1. 多模态自注意力（MMSA）融合</strong></p>\n<p>AdaWorldPolicy 的三个模块（World Model、Action Model、Force Predictor）并非简单串联，而是通过 MMSA 在 Transformer 层级深度交互。具体而言，在每个 DiT block 中：</p>\n<div class=\"kb-math kb-math-display\">[\\mathbf{h}_{WM}, \\mathbf{h}_{AM}, \\mathbf{h}_{FP}] = \\text{SelfAttn}([\\mathbf{z}_{WM} \\| \\mathbf{z}_{AM} \\| \\mathbf{z}_{FP}])</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\mathbf{z}_{WM}</span> 是世界模型的视频 token（来自 Cosmos-Predict2 的 2B 参数骨干），<span class=\"kb-math kb-math-inline\">\\mathbf{z}_{AM}</span> 和 <span class=\"kb-math kb-math-inline\">\\mathbf{z}_{FP}</span> 分别是动作模型和力预测器的 token。三者在同一注意力矩阵中自由交互，使得：\n- 动作模型可以\"看到\"世界模型对未来的预测，从而学习物理一致的动作\n- 力预测器可以感知视觉上下文，提升接触力估计精度\n- 世界模型可以获得动作意图信息，提升预测准确性</p>\n<div class=\"key-point\">💡 关键：消融实验表明，将 MMSA 替换为简单拼接（Concatenation）成功率从 76.3% 暴跌至 36.3%，替换为交叉注意力（Cross-Attention）也仅有 50.0%，证明了联合自注意力对多模态融合的必要性。</div>\n<p><strong>2. 双模式训练机制</strong></p>\n<p>框架支持两种运行模式，共享同一套参数：</p>\n<ul>\n<li>\n<p><strong>Mode I（Action Generation）</strong>：输入当前观测 <span class=\"kb-math kb-math-inline\">o_t</span>，通过 Flow Matching 去噪过程生成动作序列 <span class=\"kb-math kb-math-inline\">a_t</span> 和力预测 <span class=\"kb-math kb-math-inline\">f_t</span>。此模式用于实际部署。</p>\n</li>\n<li>\n<p><strong>Mode II（Future Imagination）</strong>：输入当前观测 <span class=\"kb-math kb-math-inline\">o_t</span> 和真实动作 <span class=\"kb-math kb-math-inline\">a_t</span>，世界模型预测未来帧 <span class=\"kb-math kb-math-inline\">\\hat{o}_{t+1}</span>。此模式的损失 <span class=\"kb-math kb-math-inline\">L_{WM}</span> 反向传播时会通过 MMSA 影响动作模型的参数更新，实现\"世界模型监督策略学习\"。</p>\n</li>\n</ul>\n<p>联合训练目标为：</p>\n<div class=\"kb-math kb-math-display\">L_{total} = L_{WM} + \\lambda_1 L_{AM} + \\lambda_2 L_{FP}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">L_{AM}</span> 采用 <span class=\"kb-math kb-math-inline\">L_1</span> 损失（对动作的稀疏变化更鲁棒），<span class=\"kb-math kb-math-inline\">L_{FP}</span> 采用 <span class=\"kb-math kb-math-inline\">L_2</span> 损失（力信号更连续）。</p>\n<div class=\"warn-box\">⚠️ 注意：消融实验显示，移除世界模型监督（<span class=\"kb-math kb-math-inline\">L_{WM}</span>）后，框架退化为普通行为克隆，成功率从 76.3% 降至 46.3%，这是所有消融中影响最大的因素。</div>\n<p><strong>3. 在线自适应学习（AdaOL）</strong></p>\n<p>AdaOL 是本文最具创新性的贡献之一。其核心思想是：在测试时，世界模型对下一帧的预测 <span class=\"kb-math kb-math-inline\">\\hat{o}_{t+1}</span> 与真实观测 <span class=\"kb-math kb-math-inline\">o_{t+1}</span> 之间的差异，直接反映了当前模型与真实环境之间的域偏移程度。</p>\n<p>自适应损失定义为：</p>\n<div class=\"kb-math kb-math-display\">L_{AdaOL} = \\| E(o_{t+1}) - E(\\hat{o}_{t+1}) \\|^2</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">E(\\cdot)</span> 是 VAE 编码器，将比较放在隐空间而非像素空间，既降低计算量又过滤无关的高频噪声。</p>\n<p>为实现高效在线更新，AdaOL 采用以下策略：\n- <strong>LoRA 微调</strong>：仅在前 4 层 Transformer 插入 rank=16 的 LoRA 适配器，可训练参数 &lt;0.1%\n- <strong>极低学习率</strong>：<span class=\"kb-math kb-math-inline\">lr = 5 \\times 10^{-7}</span>，防止灾难性遗忘\n- <strong>少量梯度步</strong>：每个新样本仅做 2 步梯度更新\n- <strong>实时性</strong>：整个闭环（动作生成 + 在线更新 + 设备延迟）平均运行在 4Hz，仅比无 AdaOL 慢约 5%</p>\n<p><strong>4. 力预测器的作用</strong></p>\n<p>力预测器（Force Predictor）是一个 0.4B 参数的 DiT，与动作模型共享 MMSA 层。它预测机器人末端执行器的接触力 <span class=\"kb-math kb-math-inline\">f_t \\in \\mathbb{R}^6</span>（6 维力/力矩）。</p>\n<p>力预测的意义在于：\n- 为动作模型提供隐式的物理约束（通过 MMSA 的信息流动）\n- 帮助模型理解接触动力学，对抓取、推动等需要精细力控的任务至关重要\n- 消融实验显示移除力预测器后成功率从 76.3% 降至 53.8%</p>\n<h5>与传统方法的区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th>Diffusion Policy</th>\n<th>世界模型+策略（松耦合）</th>\n<th><strong>AdaWorldPolicy</strong></th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>世界模型角色</td>\n<td>无</td>\n<td>数据增强/表征学习</td>\n<td><strong>主动监督者</strong></td>\n</tr>\n<tr>\n<td>模态融合</td>\n<td>单模态</td>\n<td>串联/独立</td>\n<td><strong>MMSA 深度耦合</strong></td>\n</tr>\n<tr>\n<td>力感知</td>\n<td>无</td>\n<td>通常无</td>\n<td><strong>力预测器联合训练</strong></td>\n</tr>\n<tr>\n<td>测试时适应</td>\n<td>无</td>\n<td>无</td>\n<td><strong>AdaOL 在线 LoRA</strong></td>\n</tr>\n<tr>\n<td>自监督信号</td>\n<td>无</td>\n<td>无</td>\n<td><strong>世界模型预测误差</strong></td>\n</tr>\n</tbody>\n</table></div>\n<h5>实验亮点</h5>\n<ul>\n<li><strong>LIBERO-10</strong>：平均成功率 0.96，超越 OpenVLA (0.82)、DP (0.78)、π₀-ft (0.92) 等强基线</li>\n<li><strong>CALVIN ABC→D</strong>：Avg. Len. 3.54（带 AdaOL），超越 GR-MG (3.42)、MoDE (3.39)、OpenVLA (3.27)</li>\n<li><strong>Variant PushT OOD</strong>：在背景/颜色/形状偏移下，AdaOL 将成功率从 0.47 提升至 0.51（背景偏移），从 0.61 提升至 0.66（形状偏移）</li>\n<li><strong>真实机器人</strong>：4 种 OOD 场景（光照、背景、桌面、物体变化）下，AWP (ol) 一致性显著优于离线版本</li>\n</ul>",
      "quiz": {
        "q": "AdaWorldPolicy 在测试时在线自适应学习（AdaOL）使用的自监督信号是什么？",
        "options": [
          "机器人动作与专家动作之间的模仿误差",
          "世界模型预测的未来帧与真实观测在 VAE 隐空间的重建误差",
          "力预测器输出与真实力传感器读数的差异",
          "策略网络输出动作的熵值变化"
        ],
        "answer": 1,
        "explain": "AdaOL 的核心是利用世界模型预测的下一帧 ô_{t+1} 与真实观测 o_{t+1} 在 VAE 编码器隐空间的 L2 距离作为自监督损失，无需任何人工标注即可驱动在线适应。"
      }
    },
    {
      "id": "rwml",
      "num": 39,
      "name": "RWML",
      "fullName": "强化世界模型学习 (Reinforcement World Model Learning)",
      "year": "2026",
      "org": "ICML",
      "parent": "dreamerv3",
      "paperUrl": "https://arxiv.org/abs/2602.05842",
      "projectUrl": "",
      "category": "world_model",
      "motivation": "帮助LLM智能体预测动作后果",
      "summary": "RWML 的核心目标是：帮助LLM智能体预测动作后果。",
      "keyPoints": [
        "核心动机：帮助LLM智能体预测动作后果",
        "演化来源：继承或改进自 dreamerv3",
        "代表机构：ICML"
      ],
      "detail": "<p>帮助LLM智能体预测动作后果</p>"
    },
    {
      "id": "hy_embodied",
      "num": 40,
      "name": "HY-Embodied-0.5",
      "fullName": "混元具身0.5 (HY-Embodied Foundation Model)",
      "year": "2026",
      "org": "Tencent",
      "parent": "dreamerv3",
      "paperUrl": "https://arxiv.org/abs/2604.07430",
      "projectUrl": "",
      "category": "world_model",
      "motivation": "混合Transformer在线策略蒸馏",
      "summary": "HY-Embodied-0.5 的核心目标是：混合Transformer在线策略蒸馏。",
      "keyPoints": [
        "核心动机：混合Transformer在线策略蒸馏",
        "演化来源：继承或改进自 dreamerv3",
        "代表机构：Tencent"
      ],
      "detail": "<p>混合Transformer在线策略蒸馏</p>"
    }
  ],
  "categories": {
    "foundation": {
      "label": "奠基算法",
      "color": "#22a06b"
    },
    "sim2real": {
      "label": "跨域迁移",
      "color": "#5b63d3"
    },
    "offline_rl": {
      "label": "离线强化学习",
      "color": "#e8820c"
    },
    "skill_hierarchical": {
      "label": "技能与层次化",
      "color": "#d32f2f"
    },
    "reward_design": {
      "label": "奖励与表征",
      "color": "#00acc1"
    },
    "world_model": {
      "label": "世界模型RL",
      "color": "#9c27b0"
    }
  },
  "projectUrls": {}
};
