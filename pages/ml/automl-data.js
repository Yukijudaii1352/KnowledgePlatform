/**
 * automl-data.js — 由 pipeline/build.py 于 2026-05-13 12:20:56 自动生成。
 * 源文件：content/ml/automl.md
 * ⚠️  请勿手动修改；如需更新，修改源文档后重新编译。
 */
window.PAGE_CONFIG = {
  "meta": {
    "domain": "ml",
    "topic_id": "automl",
    "topic_name": "automl",
    "page_title": "AutoML 算法总结",
    "page_subtitle": "2026-05-13 版",
    "page_desc": "从早期贝叶斯超参优化到自动特征工程与神经网络结构搜索， AutoML 经历了从人工调参到 LLM 智能体驱动的范式演进。 本文档梳理 2011–2026 年间自动特征工程、超参数优化、 NAS 及综合框架四大方向的经典与前沿算法。\n",
    "page_icon": "🤖",
    "hero_pills": [
      "🏷️ HPO · NAS · AutoFE",
      "🚀 Efficiency · Automation"
    ],
    "count_pill": "{count} 个算法",
    "image_base": ""
  },
  "overview": [
    {
      "title": "待定",
      "body_html": "<p>待定。</p>"
    }
  ],
  "graph": {
    "nodes": [
      {
        "id": "smac",
        "x": 100,
        "y": 280,
        "category": "hpo"
      },
      {
        "id": "tpe",
        "x": 120,
        "y": 340,
        "category": "hpo"
      },
      {
        "id": "random_search",
        "x": 160,
        "y": 220,
        "category": "hpo"
      },
      {
        "id": "auto_weka",
        "x": 220,
        "y": 600,
        "category": "framework"
      },
      {
        "id": "dfs",
        "x": 300,
        "y": 100,
        "category": "auto_feature"
      },
      {
        "id": "auto_sklearn",
        "x": 320,
        "y": 600,
        "category": "framework"
      },
      {
        "id": "pbt",
        "x": 420,
        "y": 340,
        "category": "hpo"
      },
      {
        "id": "nas_rl",
        "x": 420,
        "y": 460,
        "category": "nas"
      },
      {
        "id": "hyperband",
        "x": 520,
        "y": 220,
        "category": "hpo"
      },
      {
        "id": "nasnet",
        "x": 520,
        "y": 400,
        "category": "nas"
      },
      {
        "id": "enas",
        "x": 540,
        "y": 520,
        "category": "nas"
      },
      {
        "id": "bohb",
        "x": 540,
        "y": 340,
        "category": "hpo"
      },
      {
        "id": "darts",
        "x": 620,
        "y": 520,
        "category": "nas"
      },
      {
        "id": "efficientnet",
        "x": 640,
        "y": 400,
        "category": "nas"
      },
      {
        "id": "optuna",
        "x": 620,
        "y": 280,
        "category": "hpo"
      },
      {
        "id": "autofeat",
        "x": 620,
        "y": 100,
        "category": "auto_feature"
      },
      {
        "id": "ofa",
        "x": 720,
        "y": 460,
        "category": "nas"
      },
      {
        "id": "llm_fe",
        "x": 920,
        "y": 100,
        "category": "auto_feature"
      },
      {
        "id": "autoep",
        "x": 920,
        "y": 280,
        "category": "hpo"
      },
      {
        "id": "composer",
        "x": 900,
        "y": 400,
        "category": "nas"
      },
      {
        "id": "jet_nemotron",
        "x": 940,
        "y": 520,
        "category": "nas"
      }
    ],
    "edges": [
      {
        "from": "smac",
        "to": "auto_weka",
        "label": "统一CASH问题"
      },
      {
        "from": "auto_weka",
        "to": "auto_sklearn",
        "label": "元学习+集成"
      },
      {
        "from": "tpe",
        "to": "bohb",
        "label": "融合Hyperband"
      },
      {
        "from": "tpe",
        "to": "optuna",
        "label": "动态搜索空间"
      },
      {
        "from": "random_search",
        "to": "hyperband",
        "label": "逐次减半加速"
      },
      {
        "from": "nas_rl",
        "to": "nasnet",
        "label": "Cell模块迁移"
      },
      {
        "from": "nas_rl",
        "to": "enas",
        "label": "权重共享降本"
      },
      {
        "from": "enas",
        "to": "darts",
        "label": "连续松弛化"
      },
      {
        "from": "enas",
        "to": "ofa",
        "label": "超网一次训练"
      },
      {
        "from": "nasnet",
        "to": "efficientnet",
        "label": "复合缩放"
      },
      {
        "from": "nasnet",
        "to": "composer",
        "label": "模块化扩展"
      },
      {
        "from": "ofa",
        "to": "jet_nemotron",
        "label": "后训练优化"
      },
      {
        "from": "dfs",
        "to": "autofeat",
        "label": "非线性变换"
      },
      {
        "from": "autofeat",
        "to": "llm_fe",
        "label": "LLM进化搜索"
      },
      {
        "from": "pbt",
        "to": "autoep",
        "label": "零样本LLM调参"
      }
    ],
    "milestones": [
      "nasnet",
      "hyperband",
      "darts"
    ]
  },
  "algos": [
    {
      "id": "smac",
      "num": 1,
      "name": "SMAC",
      "fullName": "基于序列模型的算法配置 (Sequential Model-based Algorithm Configuration)",
      "year": "2011",
      "org": "University of Freiburg",
      "parent": "—",
      "paperUrl": "https://ml.informatik.uni-freiburg.de/papers/11-LION5-SMAC.pdf",
      "projectUrl": "",
      "category": "hpo",
      "motivation": "随机森林代理模型处理条件参数",
      "summary": "SMAC 提出了基于随机森林代理模型的序贯优化框架，通过支持混合类别/数值参数空间和条件参数结构，将基于模型的算法配置方法从低维连续空间推广到高维混合配置空间，成为 AutoML 超参数优化的奠基性工作。",
      "keyPoints": [
        "提出 SMBO（Sequential Model-Based Optimization）通用框架，统一算法配置流程为：模型拟合 → 配置选择 → 配置评估（Intensify）循环",
        "使用<strong>随机森林</strong>作为代理模型，天然支持类别型参数和条件参数，突破高斯过程仅适用于连续空间的限制",
        "设计 <strong>Intensify</strong> 机制：通过逐步增加实例数的竞赛策略，在有限时间预算下高效比较候选配置与当前最优配置",
        "采用 <strong>Expected Improvement (EI)</strong> 作为采集函数，自动平衡探索与利用；具体使用对数变换下的 \\(E[I_{\\exp}]\\) 准则",
        "通过<strong>多起点局部搜索</strong>最大化 EI，使用随机单交换邻域处理混合类别/数值空间",
        "支持<strong>实例特征</strong>：将实例特征与参数配置联合作为随机森林输入，实现跨实例泛化预测",
        "引入 ROAR（Random Online Aggressive Racing）作为消融基线，验证 Intensify 机制本身的贡献"
      ],
      "detail": "<p><img alt=\"SMAC 框架示意图\" src=\"https://automl.github.io/SMAC3/main/_images/smbo_loop.png\" />\n<em>图：SMAC 的 SMBO 循环框架——迭代地拟合代理模型、选择候选配置、通过 Intensify 评估配置</em></p>\n<h5>算法伪代码</h5>\n<pre><code>Algorithm: SMAC\nInput: θ_default (默认配置), Π (实例集), t_budget (时间预算)\nOutput: θ_inc (最优配置)\n\n1:  θ_inc ← θ_default\n2:  R ← run(θ_default, π_random)    // 初始化运行历史\n3:  repeat\n4:      M ← FitModel(R)              // 拟合随机森林代理模型\n5:      C ← SelectConfigurations(M, θ_inc)  // 基于EI选择候选配置\n6:      [θ_inc, R] ← Intensify(C, θ_inc, R, M)  // 竞赛评估\n7:  until time_budget exhausted\n8:  return θ_inc\n</code></pre>\n<pre><code>Procedure: Intensify(C, θ_inc, R, M)\n// 逐步增加实例数的竞赛机制\n1:  for θ_new in C do\n2:      N ← instances_run_on(θ_inc)\n3:      for i = 1, 2, 4, 8, ... (doubling) do\n4:          选择 i 个实例评估 θ_new\n5:          if mean_cost(θ_new) &gt; bound(θ_inc):\n6:              break  // 提前终止：候选明显劣于incumbent\n7:      if mean_cost(θ_new, all N) &lt; mean_cost(θ_inc, all N):\n8:          θ_inc ← θ_new  // 更新incumbent\n9:  return θ_inc, R\n</code></pre>\n<h5>动机与背景</h5>\n<p>算法配置（Algorithm Configuration）问题旨在为给定算法自动寻找最优超参数组合。传统方法面临三大挑战：</p>\n<ol>\n<li><strong>高维混合参数空间</strong>：实际算法（如 SAT 求解器 SPEAR 有 26 个参数）包含连续、离散、类别参数，且存在条件依赖（某参数仅在另一参数取特定值时才生效）</li>\n<li><strong>评估代价高昂</strong>：每次评估需运行目标算法，单次可能耗时数分钟到数小时</li>\n<li><strong>多实例泛化</strong>：需要找到在一组问题实例上整体表现好的配置，而非仅针对单个实例</li>\n</ol>\n<p>此前的 SMBO 方法（如 SPO、TB-SPO）使用高斯过程模型，仅能处理低维全数值参数空间；而基于局部搜索的 ParamILS 虽能处理离散空间，但需要预先离散化连续参数，丢失精度。</p>\n<h5>核心机制：随机森林代理模型</h5>\n<p>SMAC 的核心创新在于用<strong>随机森林</strong>替代高斯过程作为代理模型。随机森林的关键优势：</p>\n<ul>\n<li><strong>天然处理类别变量</strong>：决策树的分裂条件可直接基于类别值划分，无需编码</li>\n<li><strong>处理条件参数</strong>：对于不活跃的条件参数，SMAC 将其设为默认值；由于树结构的层次性，模型能自然学习到参数间的条件依赖</li>\n<li><strong>计算效率</strong>：预测复杂度为 \\(O(T \\cdot \\log N)\\)（T 为树数量，N 为训练样本数），远优于 GP 的 \\(O(N^3)\\)</li>\n<li><strong>不确定性估计</strong>：通过各棵树预测值的方差提供不确定性度量</li>\n</ul>\n<div class=\"key-point\">💡 关键：随机森林不仅提供点预测 \\(\\mu_\\theta\\)，还通过树间方差给出 \\(\\sigma^2_\\theta\\)，这对 EI 计算至关重要。</div>\n<h5>Expected Improvement 采集函数</h5>\n<p>给定代理模型对配置 \\(\\theta\\) 的预测分布（均值 \\(\\mu_\\theta\\)，方差 \\(\\sigma^2_\\theta\\)），SMAC 使用对数变换下的 EI 准则：</p>\n<p>$$\n\\text{EI}(\\theta) = f_{\\min} \\cdot \\Phi(v) - e^{\\frac{1}{2}\\sigma^2_\\theta + \\mu_\\theta} \\cdot \\Phi(v - \\sigma_\\theta)\n$$</p>\n<p>其中 \\(v = \\frac{\\ln(f_{\\min}) - \\mu_\\theta}{\\sigma_\\theta}\\)，\\(\\Phi\\) 为标准正态 CDF，\\(f_{\\min}\\) 为当前 incumbent 的经验平均性能。</p>\n<p>EI 的直觉：<strong>当预测均值低（利用已知好区域）或预测不确定性高（探索未知区域）时，EI 值大</strong>，从而自动平衡探索与利用。</p>\n<p>为在高维混合空间中最大化 EI，SMAC 采用<strong>多起点局部搜索</strong>：\n1. 计算所有已评估配置的 EI 值\n2. 选取 EI 最高的 10 个配置作为局部搜索起点\n3. 使用随机单交换邻域（改变一个参数值）进行爬山\n4. 对数值参数：从 \\(\\mathcal{N}(v, 0.2)\\) 采样 4 个邻居值\n5. 收集所有局部最优，并额外随机采样配置以确保多样性</p>\n<h5>Intensify 竞赛机制</h5>\n<p>Intensify 是 SMAC 的关键组件，解决\"如何在有限预算下可靠比较配置\"的问题：</p>\n<ol>\n<li><strong>逐步增加实例</strong>：不一次性在所有实例上评估候选配置，而是逐步增加评估实例数</li>\n<li><strong>提前终止</strong>：若候选配置在已评估实例子集上已明显劣于 incumbent，立即终止</li>\n<li><strong>公平比较</strong>：确保候选配置至少在 incumbent 已运行的实例子集上被评估</li>\n<li><strong>Doubling 策略</strong>：每轮将候选配置的评估实例数翻倍（1→2→4→8...），直到与 incumbent 评估数相当</li>\n</ol>\n<div class=\"warn-box\">⚠️ 注意：Intensify 与模型选择解耦——即使没有代理模型（如 ROAR 随机选择配置），Intensify 本身也能显著提升配置效率。</div>\n<h5>实例特征支持</h5>\n<p>对于多实例场景，SMAC 将实例特征 \\(f_i\\) 与参数配置 \\(\\theta\\) 联合作为随机森林输入：</p>\n<p>$$\n\\hat{c}(\\theta, i) = \\text{RF}([\\theta, f_i])\n$$</p>\n<p>预测时，对给定配置 \\(\\theta\\) 分别预测其在每个训练实例上的性能，再用用户定义的聚合指标（如平均运行时间）组合。这使得 SMAC 能利用实例结构信息进行更精准的性能预测。</p>\n<h5>与传统方法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>参数空间</th>\n<th>代理模型</th>\n<th>多实例</th>\n<th>条件参数</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>SPO/TB-SPO</td>\n<td>仅连续</td>\n<td>高斯过程</td>\n<td>✗</td>\n<td>✗</td>\n</tr>\n<tr>\n<td>ParamILS</td>\n<td>离散化</td>\n<td>无（局部搜索）</td>\n<td>✓</td>\n<td>有限</td>\n</tr>\n<tr>\n<td>GGA</td>\n<td>混合</td>\n<td>无（遗传算法）</td>\n<td>✓</td>\n<td>✗</td>\n</tr>\n<tr>\n<td><strong>SMAC</strong></td>\n<td><strong>混合（原生）</strong></td>\n<td><strong>随机森林</strong></td>\n<td><strong>✓</strong></td>\n<td><strong>✓</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p>实验表明，SMAC 在 11 个单实例场景和 6 个多实例场景中均达到最优或统计不可区分于最优的性能，同时比 ParamILS 和 GGA 具有更高的鲁棒性（25 次独立运行的方差更小）。</p>",
      "quiz": {
        "q": "SMAC 选择随机森林而非高斯过程作为代理模型的主要原因是什么？",
        "options": [
          "随机森林的预测精度在所有场景下都优于高斯过程",
          "随机森林能天然处理类别型参数和条件参数结构",
          "随机森林不需要不确定性估计即可计算 Expected Improvement",
          "随机森林的训练速度比高斯过程慢但更稳定"
        ],
        "answer": 1,
        "explain": "SMAC 面对的核心挑战是高维混合类别/数值参数空间及条件参数依赖，高斯过程仅适用于低维连续空间，而随机森林的决策树结构天然支持类别分裂和层次条件关系。"
      }
    },
    {
      "id": "tpe",
      "num": 2,
      "name": "TPE",
      "fullName": "树结构Parzen估计器 (Tree-structured Parzen Estimator)",
      "year": "2011",
      "org": "University of Sherbrooke",
      "parent": "—",
      "paperUrl": "https://papers.nips.cc/paper/2011/hash/86e8f7ad327462834789d7b64455531f-Abstract.html",
      "projectUrl": "",
      "category": "hpo",
      "motivation": "建模P(x|y)的密度估计实现高效搜索",
      "summary": "TPE 通过将超参数先验分布按目标函数值分为\"好\"与\"差\"两组并分别建模密度 \\(l(x)\\) 和 \\(g(x)\\)，将 Expected Improvement 简化为密度比 \\(l(x)/g(x)\\) 的最大化问题，在树结构条件空间中实现了高效的贝叶斯超参数优化。",
      "keyPoints": [
        "<strong>逆向建模思路</strong>：不直接建模 \\(P(y|x)\\)（如高斯过程），而是建模 \\(P(x|y<y^*)\\) 和 \\(P(x|y \\geq y^*)\\)，即条件密度 \\(l(x)\\) 和 \\(g(x)\\)",
        "<strong>EI 等价简化</strong>：证明 Expected Improvement 正比于 \\(\\gamma + (1-\\gamma) \\cdot g(x)/l(x)\\) 的倒数，最大化 EI 等价于最大化 \\(l(x)/g(x)\\)",
        "<strong>Parzen 窗密度估计</strong>：使用自适应带宽的核密度估计（KDE）分别拟合两组观测点的分布",
        "<strong>树结构条件空间</strong>：天然支持层级/条件超参数（如选择 SVM 核类型后才有对应核参数），密度估计按树结构分解",
        "<strong>阈值分位数 \\(\\gamma\\)</strong>：以观测值的 \\(\\gamma\\) 分位数作为 \\(y^*\\)，典型取 \\(\\gamma=0.15\\sim0.25\\)",
        "<strong>对比实验</strong>：在多个深度学习与机器学习基准上与 GP-BO、SMAC、随机搜索对比，展示了 TPE 在高维条件空间中的优势",
        "<strong>Hyperopt 框架</strong>：TPE 是 Hyperopt 库的核心优化算法"
      ],
      "detail": "<pre><code>                        TPE 密度估计示意图\n\n  目标函数值 y\n       ▲\n       │         ×  ×\n  y*  ─┼─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─   ← 阈值 (γ 分位数)\n       │    ●  ●     ●   ●  ●\n       │  ●      ●  ●  ●     ●\n       └──────────────────────────→ 超参数 x\n\n       ● = 好的观测 (y &lt; y*)  →  拟合 l(x)\n       × = 差的观测 (y ≥ y*)  →  拟合 g(x)\n\n  密度\n   ▲   l(x): 好观测的KDE          g(x): 差观测的KDE\n   │    ╱╲                           ╱──╲\n   │  ╱    ╲    ╱╲                 ╱      ╲\n   │╱        ╲╱    ╲             ╱          ╲\n   └──────────────────→ x    └──────────────────→ x\n\n  选择策略: 从 l(x) 采样候选点, 按 l(x)/g(x) 排序取最优\n</code></pre>\n<p><em>图：TPE 将观测按阈值 \\(y^*\\) 分为两组，分别用核密度估计建模 \\(l(x)\\)（好的观测）和 \\(g(x)\\)（差的观测），新候选点从 \\(l(x)\\) 中采样并按 \\(l(x)/g(x)\\) 排序选择</em></p>\n<pre><code class=\"language-python\"># TPE 核心算法伪代码\ndef tpe_suggest(observations, gamma=0.25):\n    &quot;&quot;&quot;\n    observations: 历史观测 {x_i, y_i}\n    gamma: 分位数阈值比例\n    &quot;&quot;&quot;\n    # Step 1: 按目标值排序，确定阈值 y*\n    y_star = quantile(observations.y, gamma)\n\n    # Step 2: 将观测分为两组\n    D_good = {x_i | y_i &lt; y_star}   # 好的观测\n    D_bad  = {x_i | y_i &gt;= y_star}  # 差的观测\n\n    # Step 3: 分别拟合核密度估计\n    l_x = fit_parzen_estimator(D_good)  # P(x | y &lt; y*)\n    g_x = fit_parzen_estimator(D_bad)   # P(x | y &gt;= y*)\n\n    # Step 4: 从 l(x) 中采样候选点\n    candidates = sample(l_x, n_candidates=24)\n\n    # Step 5: 按 l(x)/g(x) 排序，选择比值最大的点\n    scores = [l_x.pdf(c) / g_x.pdf(c) for c in candidates]\n    return candidates[argmax(scores)]\n</code></pre>\n<h5>动机与背景</h5>\n<p>超参数优化（HPO）是机器学习中的关键问题。传统方法如网格搜索在高维空间中效率极低（指数级增长），随机搜索虽然更好但仍未利用历史信息。基于高斯过程（GP）的贝叶斯优化虽然能建模目标函数的后验分布，但存在以下局限：</p>\n<ol>\n<li><strong>计算复杂度</strong>：GP 的推断复杂度为 \\(O(n^3)\\)，随观测数增长迅速变慢</li>\n<li><strong>条件空间处理困难</strong>：GP 假设固定维度的连续空间，难以自然处理条件/层级超参数（如\"当 kernel=RBF 时才有 gamma 参数\"）</li>\n<li><strong>高维性能退化</strong>：GP 在超过 10-20 维时性能显著下降</li>\n</ol>\n<p>TPE 的核心创新在于<strong>逆转建模方向</strong>：不建模 \\(P(y|x)\\)，而是建模 \\(P(x|y)\\)。</p>\n<h5>核心机制：从 EI 到密度比</h5>\n<p>Expected Improvement（EI）的标准定义为：</p>\n<p>$$\\text{EI}_{y^*}(x) = \\int_{-\\infty}^{y^*} (y^* - y) \\cdot p(y|x) \\, dy$$</p>\n<p>TPE 利用贝叶斯公式进行变换。定义：</p>\n<p>$$p(x|y) = \\begin{cases} l(x) & \\text{if } y < y^* \\\\ g(x) & \\text{if } y \\geq y^* \\end{cases}$$</p>\n<p>其中 \\(y^*\\) 是使得 \\(P(y < y^*) = \\gamma\\) 的分位数阈值。通过贝叶斯公式：</p>\n<p>$$p(x) = \\gamma \\cdot l(x) + (1-\\gamma) \\cdot g(x)$$</p>\n<p>将 EI 重写后可以证明：</p>\n<p>$$\\text{EI}_{y^*}(x) \\propto \\left(\\gamma + (1-\\gamma) \\frac{g(x)}{l(x)}\\right)^{-1}$$</p>\n<div class=\"key-point\">💡 关键：最大化 EI 等价于最大化 \\(l(x)/g(x)\\)。直觉上，我们希望找到在\"好的观测\"中概率高、在\"差的观测\"中概率低的超参数配置。</div>\n<h5>密度估计方法</h5>\n<p>对于连续超参数，TPE 使用<strong>自适应带宽的 Parzen 窗（核密度估计）</strong>：</p>\n<p>$$l(x) = \\frac{1}{|D_{\\text{good}}|} \\sum_{i \\in D_{\\text{good}}} \\mathcal{N}(x; x_i, \\sigma_i^2)$$</p>\n<p>带宽 \\(\\sigma_i\\) 设置为相邻观测点间距的最大值，确保密度估计平滑且自适应。对于离散/类别超参数，使用加权的类别分布（带有均匀分布的平滑项）。</p>\n<h5>树结构处理条件空间</h5>\n<p>\"树结构\"是 TPE 的关键特性。在超参数空间中，许多参数是条件性的：</p>\n<pre><code>algorithm_choice: {SVM, RandomForest, MLP}\n├── if SVM:\n│   ├── kernel: {linear, rbf, poly}\n│   │   ├── if rbf: gamma: [1e-5, 1e2]\n│   │   └── if poly: degree: {2, 3, 4, 5}\n│   └── C: [1e-3, 1e3]\n├── if RandomForest:\n│   ├── n_estimators: [10, 1000]\n│   └── max_depth: [2, 50]\n└── if MLP:\n    ├── hidden_size: [32, 512]\n    └── learning_rate: [1e-5, 1e-1]\n</code></pre>\n<p>TPE 按照这种树结构<strong>独立地</strong>对每个超参数进行密度估计，只使用该参数被激活时的观测子集。这使得 TPE 能自然处理任意深度的条件依赖关系，而无需像 GP 那样将条件参数编码为固定维度向量。</p>\n<h5>与传统方法的区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>GP-BO</th>\n<th>SMAC</th>\n<th>TPE</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>代理模型</td>\n<td>\\(P(y\\|x)\\) 高斯过程</td>\n<td>\\(P(y\\|x)\\) 随机森林</td>\n<td>\\(P(x\\|y)\\) 密度估计</td>\n</tr>\n<tr>\n<td>计算复杂度</td>\n<td>\\(O(n^3)\\)</td>\n<td>\\(O(n \\log n)\\)</td>\n<td>\\(O(n)\\)</td>\n</tr>\n<tr>\n<td>条件空间</td>\n<td>需特殊编码</td>\n<td>天然支持</td>\n<td>天然支持</td>\n</tr>\n<tr>\n<td>高维表现</td>\n<td>差（&gt;20维）</td>\n<td>好</td>\n<td>好</td>\n</tr>\n<tr>\n<td>采集函数优化</td>\n<td>需数值优化</td>\n<td>需数值优化</td>\n<td>从 \\(l(x)\\) 直接采样</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"warn-box\">⚠️ 注意：TPE 的一个局限是各维度的密度估计是独立的（轴对齐），不能直接捕获超参数间的交互作用。后续工作（如 Falkner et al. 2018 的 BOHB）通过多保真度策略缓解了这一问题。</div>\n<h5>实际影响</h5>\n<p>TPE 是 <strong>Hyperopt</strong> 库的核心算法，广泛应用于：\n- 深度学习超参数调优（学习率、网络架构等）\n- AutoML 流水线（CASH 问题：同时选择算法和调参）\n- 神经架构搜索的早期工作</p>\n<p>其设计思想也影响了后续的 BOHB（Bayesian Optimization + HyperBand）和 Optuna 中的 TPE 变体。</p>",
      "quiz": {
        "q": "TPE 算法中，最大化 Expected Improvement 等价于最大化什么？",
        "options": [
          "高斯过程后验均值",
          "密度比 l(x)/g(x)，即好观测密度与差观测密度之比",
          "目标函数的梯度",
          "观测点之间的欧氏距离"
        ],
        "answer": 1,
        "explain": "TPE 通过贝叶斯公式将 EI 转化为密度比形式，最大化 EI 等价于找到在好观测分布 l(x) 中概率高、在差观测分布 g(x) 中概率低的点。"
      }
    },
    {
      "id": "random_search",
      "num": 3,
      "name": "Random Search",
      "fullName": "随机搜索 (Random Search for Hyper-Parameter Optimization)",
      "year": "2012",
      "org": "University of Montreal",
      "parent": "—",
      "paperUrl": "https://www.jmlr.org/papers/v13/bergstra12a.html",
      "projectUrl": "",
      "category": "hpo",
      "motivation": "证明随机搜索优于网格搜索",
      "summary": "Random Search 通过理论与实验证明：当超参数空间具有**低有效维度**（即只有少数超参数真正影响模型性能）时，随机搜索比网格搜索以指数级更少的试验次数找到同等或更优的超参数配置，是超参数优化的强基线方法。",
      "keyPoints": [
        "<strong>核心论点</strong>：超参数优化问题通常具有低有效维度，网格搜索在不重要维度上浪费大量试验",
        "<strong>Figure 1 直觉</strong>：在 2D 空间中，\\(3 \\times 3\\) 网格仅在每个维度上采样 3 个不同值；而 9 个随机点在每个维度的投影上产生 9 个不同值",
        "<strong>GP 分析</strong>：用高斯过程回归拟合验证集性能函数 \\(Y\\)，通过各维度长度尺度参数量化有效维度，证实不同数据集的重要超参数各不相同",
        "<strong>实验验证</strong>：在 8 个数据集上，仅 8 次随机试验即超越 Larochelle et al. (2007) 的网格搜索；32 次试验在扩展搜索空间中一致优于网格",
        "<strong>DBN 实验</strong>：在 32 维超参数空间中，随机搜索在 7 个数据集中的 5 个上达到或超越人工调参+网格搜索的最优结果",
        "<strong>Quasi-Monte Carlo 对比</strong>：低差异序列（Sobol、Halton 等）在低维问题中略优于纯随机，但在高维实际问题中无显著优势",
        "<strong>实践建议</strong>：随机搜索是自适应超参数优化算法的自然基线，推荐替代网格搜索作为默认策略"
      ],
      "detail": "<p><img alt=\"Grid Search vs Random Search\" src=\"https://www.jmlr.org/papers/volume13/bergstra12a/bergstra12a.pdf\" />\n<em>图：论文 Figure 1 —— 左侧为网格搜索（Grid Layout），右侧为随机搜索（Random Layout）。绿色曲线表示目标函数仅依赖于一个维度（低有效维度）。网格的 9 个点在重要维度上仅覆盖 3 个不同值，而随机的 9 个点覆盖 9 个不同值，因此更有可能找到最优区域。</em></p>\n<pre><code class=\"language-python\"># Random Search 超参数优化伪代码\nimport numpy as np\n\ndef random_search(objective_fn, param_distributions, n_trials=32, seed=42):\n    &quot;&quot;&quot;\n    Random Search for Hyperparameter Optimization (Bergstra &amp; Bengio, 2012)\n\n    Args:\n        objective_fn: 评估函数 f(params) -&gt; validation_score\n        param_distributions: dict, 每个超参数的采样分布\n            e.g. {&quot;lr&quot;: (&quot;log_uniform&quot;, 1e-5, 1.0),\n                   &quot;hidden_units&quot;: (&quot;log_uniform_int&quot;, 128, 4000),\n                   &quot;dropout&quot;: (&quot;uniform&quot;, 0.0, 0.5)}\n        n_trials: 随机试验次数 (论文建议 ≥ 32)\n        seed: 随机种子\n    Returns:\n        best_params, best_score\n    &quot;&quot;&quot;\n    rng = np.random.RandomState(seed)\n    best_score = -np.inf\n    best_params = None\n\n    for trial in range(n_trials):\n        # 从各维度独立采样 —— 关键：每个维度独立随机\n        params = {}\n        for name, (dist_type, low, high) in param_distributions.items():\n            if dist_type == &quot;log_uniform&quot;:\n                params[name] = np.exp(rng.uniform(np.log(low), np.log(high)))\n            elif dist_type == &quot;uniform&quot;:\n                params[name] = rng.uniform(low, high)\n            elif dist_type == &quot;log_uniform_int&quot;:\n                params[name] = int(np.exp(rng.uniform(np.log(low), np.log(high))))\n\n        # 评估当前配置（训练模型 + 验证集评估）\n        score = objective_fn(params)\n\n        if score &gt; best_score:\n            best_score = score\n            best_params = params\n\n    return best_params, best_score\n</code></pre>\n<p><strong>动机与背景：网格搜索的根本缺陷</strong></p>\n<p>在深度学习和机器学习实践中，超参数优化长期依赖网格搜索（Grid Search）。网格搜索在每个超参数维度上选取若干离散值，然后评估所有组合。其根本问题在于：当搜索空间为 \\(d\\) 维、每维取 \\(n\\) 个值时，总试验数为 \\(n^d\\)，呈指数增长。更关键的是，如果目标函数 \\(Y(\\boldsymbol{\\lambda})\\) 实际上只依赖于 \\(d\\) 维中的 \\(d_{\\text{eff}} \\ll d\\) 个维度（即具有<strong>低有效维度</strong>），那么网格搜索在不重要维度上的所有变化都是浪费——每个重要维度上实际只有 \\(n\\) 个不同的采样点，而非 \\(n^d\\) 个。</p>\n<div class=\"key-point\">💡 关键：对于具有低有效维度的函数，\\(N\\) 次网格搜索在重要维度上仅提供 \\(N^{1/d}\\) 个不同值，而 \\(N\\) 次随机搜索在每个维度上提供 \\(N\\) 个不同值。</div>\n<p><strong>核心机制：为什么随机搜索更优</strong></p>\n<p>设超参数空间为 \\(\\Lambda = \\Lambda_1 \\times \\Lambda_2 \\times \\cdots \\times \\Lambda_d\\)，目标函数为验证集损失 \\(Y: \\Lambda \\to \\mathbb{R}\\)。假设 \\(Y\\) 仅依赖于前 \\(d_{\\text{eff}}\\) 个维度（低有效维度假设）：</p>\n<p>$$Y(\\lambda_1, \\lambda_2, \\ldots, \\lambda_d) \\approx g(\\lambda_1, \\ldots, \\lambda_{d_{\\text{eff}}})$$</p>\n<p>对于网格搜索，\\(N = n^d\\) 个试验在每个维度上仅有 \\(n = N^{1/d}\\) 个不同值。在有效子空间的投影中，只有 \\(n^{d_{\\text{eff}}} = N^{d_{\\text{eff}}/d}\\) 个不同的函数值被评估。</p>\n<p>而随机搜索的 \\(N\\) 个试验在有效子空间的投影中（以概率 1）产生 \\(N\\) 个不同的点。当 \\(d_{\\text{eff}} / d\\) 较小时，随机搜索的覆盖效率远超网格搜索。</p>\n<div class=\"warn-box\">⚠️ 注意：这一优势不依赖于事先知道哪些维度是重要的——随机搜索在<strong>任意</strong>子空间投影上都保持良好覆盖。</div>\n<p><strong>GP 分析量化有效维度</strong></p>\n<p>论文使用高斯过程（GP）回归拟合函数 \\(Y\\)，采用各向异性平方指数核（ARD 核）：</p>\n<p>$$k(\\boldsymbol{\\lambda}, \\boldsymbol{\\lambda}') = \\sigma^2 \\exp\\left(-\\sum_{i=1}^{d} \\frac{(\\lambda_i - \\lambda_i')^2}{2 \\ell_i^2}\\right)$$</p>\n<p>其中 \\(\\ell_i\\) 为第 \\(i\\) 个超参数的<strong>长度尺度</strong>（length scale）。若 \\(\\ell_i\\) 很大，说明 \\(Y\\) 对第 \\(i\\) 维不敏感（该维度不重要）；若 \\(\\ell_i\\) 很小，说明 \\(Y\\) 在该维度变化剧烈（重要维度）。</p>\n<p>实验结果表明：\n- 不同数据集的重要超参数<strong>各不相同</strong>（如 mnist_basic 对学习率敏感，而 mnist_rotated 对网络宽度敏感）\n- 大多数超参数在多数数据集上的长度尺度很大，证实了低有效维度假设\n- 这解释了为什么固定的网格设计无法适应不同问题——预先不知道哪些维度重要</p>\n<p><strong>与传统方法的对比及实践意义</strong></p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>试验数</th>\n<th>有效覆盖</th>\n<th>适应性</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Grid Search</td>\n<td>\\(n^d\\)</td>\n<td>每维 \\(n\\) 个值</td>\n<td>需预知重要维度</td>\n</tr>\n<tr>\n<td>Random Search</td>\n<td>\\(N\\)</td>\n<td>每维 \\(N\\) 个值</td>\n<td>自动适应任意有效子空间</td>\n</tr>\n<tr>\n<td>Quasi-MC (Sobol)</td>\n<td>\\(N\\)</td>\n<td>略优于随机（低维）</td>\n<td>低维有效，高维退化为随机</td>\n</tr>\n</tbody>\n</table></div>\n<p>论文在 Section 5 中进一步展示，在 DBN 的 32 维超参数空间中（包括每层隐藏单元数、学习率、预训练迭代次数、权重初始化方式等），随机搜索仅用数百次试验就匹配了人工专家经过数周调参的结果。在 7 个基准数据集中的 5 个上，随机搜索达到或超越了 Larochelle et al. (2007) 精心设计的网格搜索+手动调优的最佳结果。</p>\n<p>论文最终指出，随机搜索应作为所有自适应超参数优化算法（如贝叶斯优化、TPE、SMAC 等）的<strong>自然基线</strong>——任何声称优于随机搜索的方法都必须在公平条件下证明其优势。这一观点深刻影响了后续 AutoML 研究的实验设计范式。</p>",
      "quiz": {
        "q": "随机搜索优于网格搜索的根本原因是什么？",
        "options": [
          "随机搜索的计算开销更低",
          "超参数空间通常具有低有效维度，随机搜索在重要维度上覆盖更多不同值",
          "随机搜索使用了更先进的优化算法",
          "网格搜索无法处理连续型超参数"
        ],
        "answer": 1,
        "explain": "当目标函数仅依赖少数维度时，N次网格搜索在每个维度仅有N^(1/d)个不同值，而N次随机搜索在每个维度有N个不同值，覆盖效率呈指数级优势。"
      }
    },
    {
      "id": "auto_weka",
      "num": 4,
      "name": "Auto-WEKA",
      "fullName": "自动WEKA (Auto-WEKA: Combined Selection and HPO)",
      "year": "2013",
      "org": "University of British Columbia",
      "parent": "smac",
      "paperUrl": "https://arxiv.org/abs/1208.3719",
      "projectUrl": "",
      "category": "framework",
      "motivation": "首次统一算法选择与HPO为CASH问题",
      "summary": "Auto-WEKA 提出了 CASH（Combined Algorithm Selection and Hyperparameter Optimization）问题，将机器学习算法选择与超参数优化统一为一个层次化的超参数优化问题，并利用基于序贯模型的贝叶斯优化方法（SMAC 和 TPE）在 WEKA 全部分类器空间中自动搜索最优配置，显著优于传统的独立选择方法。",
      "keyPoints": [
        "定义 CASH 问题：将算法选择本身视为一个超参数，与各算法的超参数一起构成层次化搜索空间",
        "搜索空间覆盖 WEKA 全部分类器：27 个基分类器 + 10 个元方法 + 2 个集成方法 + 特征选择（3 种搜索策略 × 8 种评估器）",
        "采用 SMBO（Sequential Model-Based Optimization）框架，具体使用 SMAC 和 TPE 两种贝叶斯优化方法",
        "SMAC 基于随机森林代理模型，天然支持条件超参数和混合（连续+离散）搜索空间",
        "TPE 使用树结构 Parzen 估计器，通过分层采样处理条件依赖关系",
        "在 21 个 UCI 数据集、KDD Cup 09、MNIST 变体和 CIFAR-10 上验证，性能显著优于默认配置和网格搜索",
        "交叉验证用于评估泛化性能，设置时间预算限制单次评估时间"
      ],
      "detail": "<p><img alt=\"Auto-WEKA 层次化超参数空间示意\" src=\"https://ar5iv.labs.arxiv.org/html/1208.3719v2/assets/x1.png\" />\n<em>图：Auto-WEKA 的层次化超参数空间结构——算法选择作为根节点，各算法的超参数作为条件子节点</em></p>\n<pre><code class=\"language-python\"># Algorithm 1: Sequential Model-Based Optimization (SMBO) 伪代码\ndef SMBO(time_budget, D_train, D_valid):\n    M_L = initialize_model()       # 初始化代理模型（随机森林/TPE）\n    H = []                          # 历史观测集合 {(λ, cost)}\n\n    while not time_budget_exhausted():\n        # 1. 从代理模型中选择候选配置\n        lambda_candidate = select_candidate(M_L)  # 基于 acquisition function (EI)\n\n        # 2. 评估候选配置（交叉验证误差）\n        cost = evaluate(A_lambda_candidate, D_train, D_valid)\n\n        # 3. 更新历史\n        H.append((lambda_candidate, cost))\n\n        # 4. 用新数据更新代理模型\n        M_L = update_model(M_L, H)\n\n    # 返回历史中表现最好的配置\n    return argmin(H, key=lambda x: x[1])\n</code></pre>\n<h5>动机与背景</h5>\n<p>机器学习实践中，用户面临两个关键选择：（1）选择哪个学习算法；（2）如何设置该算法的超参数。传统方法将这两个问题独立处理——先通过模型选择确定算法，再对选定算法进行超参数优化。这种分离策略存在明显缺陷：</p>\n<ul>\n<li><strong>次优组合</strong>：最佳算法在默认超参数下可能表现不佳，而非最佳算法在精心调参后可能更优</li>\n<li><strong>搜索空间浪费</strong>：独立搜索忽略了算法选择与超参数之间的交互效应</li>\n<li><strong>用户负担</strong>：非专家用户难以做出合理选择，往往依赖算法声誉或直觉</li>\n</ul>\n<div class=\"key-point\">💡 关键洞察：将算法选择本身视为一个\"根超参数\"，各算法的具体超参数作为条件超参数（仅在对应算法被选中时激活），整个问题就变成了一个统一的层次化超参数优化问题。</div>\n<h5>CASH 问题形式化定义</h5>\n<p>给定算法集合 \\(\\mathcal{A} = \\{A^{(1)}, \\ldots, A^{(K)}\\}\\)，每个算法 \\(A^{(j)}\\) 有对应的超参数空间 \\(\\Lambda^{(j)}\\)，CASH 问题定义为：</p>\n<p>$$A^*_{\\lambda^*} \\in \\underset{A^{(j)} \\in \\mathcal{A}, \\lambda \\in \\Lambda^{(j)}}{\\text{argmin}} \\frac{1}{k} \\sum_{i=1}^{k} \\mathcal{L}(A^{(j)}_\\lambda, \\mathcal{D}^{(i)}_{\\text{train}}, \\mathcal{D}^{(i)}_{\\text{valid}})$$</p>\n<p>其中 \\(\\mathcal{L}(A^{(j)}_\\lambda, \\mathcal{D}^{(i)}_{\\text{train}}, \\mathcal{D}^{(i)}_{\\text{valid}})\\) 是算法 \\(A^{(j)}\\) 在超参数 \\(\\lambda\\) 下，于第 \\(i\\) 折训练集上训练、验证集上评估的损失。</p>\n<div class=\"warn-box\">⚠️ 注意：CASH 搜索空间是<strong>层次化</strong>的——只有当特定算法被选中时，其超参数才\"激活\"；集成方法的基分类器选择又引入了更深层的条件依赖。</div>\n<h5>求解方法：SMBO 框架</h5>\n<p>Auto-WEKA 采用 Sequential Model-Based Optimization（SMBO）框架来求解 CASH 问题。SMBO 的核心思想是：</p>\n<ol>\n<li><strong>构建代理模型</strong>：用一个概率模型 \\(\\mathcal{M}_L\\) 来近似目标函数（交叉验证误差关于超参数配置的映射）</li>\n<li><strong>采集函数引导搜索</strong>：利用 Expected Improvement（EI）等采集函数，在探索（exploration）和利用（exploitation）之间平衡</li>\n<li><strong>迭代更新</strong>：每次评估后用新观测更新代理模型，逐步逼近最优</li>\n</ol>\n<p>Auto-WEKA 具体使用了两种 SMBO 实例：</p>\n<p><strong>SMAC（Sequential Model-based Algorithm Configuration）</strong>：\n- 代理模型：随机森林（Random Forest）\n- 优势：天然处理离散/条件超参数，对高维空间鲁棒\n- 通过随机森林预测均值和方差来计算 EI\n- 使用 local search + random sampling 来优化采集函数</p>\n<p><strong>TPE（Tree-structured Parzen Estimator）</strong>：\n- 代理模型：树结构 Parzen 估计器\n- 将超参数空间组织为树形结构，条件超参数自然对应树的分支\n- 将观测分为\"好\"（\\(l(x)\\)）和\"差\"（\\(g(x)\\)）两组，最大化 \\(l(x)/g(x)\\) 比值\n- 假设同一路径上的超参数之间独立</p>\n<h5>Auto-WEKA 搜索空间</h5>\n<p>Auto-WEKA 的搜索空间覆盖了 WEKA 中几乎所有分类相关组件：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>类别</th>\n<th>数量</th>\n<th>示例</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>基分类器</td>\n<td>27</td>\n<td>SVM, KNN, 决策树, 朴素贝叶斯, 逻辑回归, 随机森林等</td>\n</tr>\n<tr>\n<td>元方法</td>\n<td>10</td>\n<td>Bagging, AdaBoost, Stacking 等（接受一个基分类器作为参数）</td>\n</tr>\n<tr>\n<td>集成方法</td>\n<td>2</td>\n<td>Vote, Stacking（接受最多 5 个基分类器）</td>\n</tr>\n<tr>\n<td>特征选择搜索</td>\n<td>3</td>\n<td>BestFirst, GreedyStepwise, Ranker</td>\n</tr>\n<tr>\n<td>特征选择评估</td>\n<td>8</td>\n<td>CfsSubset, InfoGain, GainRatio 等</td>\n</tr>\n</tbody>\n</table></div>\n<p>总超参数空间包含 786 个超参数（含条件超参数），形成一个深度层次化的搜索空间。</p>\n<h5>与传统方法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方面</th>\n<th>传统方法</th>\n<th>Auto-WEKA (CASH)</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>算法选择</td>\n<td>人工选择或独立模型选择</td>\n<td>自动化，作为优化变量</td>\n</tr>\n<tr>\n<td>超参数优化</td>\n<td>网格搜索/随机搜索</td>\n<td>贝叶斯优化（SMAC/TPE）</td>\n</tr>\n<tr>\n<td>搜索空间</td>\n<td>单一算法的超参数</td>\n<td>所有算法 × 所有超参数的联合空间</td>\n</tr>\n<tr>\n<td>条件依赖</td>\n<td>不处理</td>\n<td>层次化建模，天然支持</td>\n</tr>\n<tr>\n<td>用户参与</td>\n<td>需要专家知识</td>\n<td>全自动，仅需提供数据和时间预算</td>\n</tr>\n</tbody>\n</table></div>\n<h5>实验结果</h5>\n<p>在 21 个数据集上的实验表明：\n- Auto-WEKA（SMAC）在大多数数据集上显著优于使用默认超参数的最佳算法\n- 在大型数据集上优势更为明显，因为搜索空间中存在更多可利用的结构\n- SMAC 整体表现优于 TPE，可能因为随机森林更好地处理了高维条件空间\n- 30 分钟的优化时间预算即可获得显著改进</p>",
      "quiz": {
        "q": "Auto-WEKA 中 CASH 问题的核心创新在于什么？",
        "options": [
          "使用集成学习组合多个分类器的预测结果",
          "将算法选择视为超参数，与算法超参数一起在联合空间中优化",
          "使用网格搜索遍历所有可能的算法和超参数组合",
          "通过迁移学习将一个数据集上的最优配置迁移到新数据集"
        ],
        "answer": 1,
        "explain": "CASH 的核心创新是将'选择哪个算法'本身也视为一个超参数，与各算法的具体超参数构成层次化搜索空间，然后用贝叶斯优化统一求解。"
      }
    },
    {
      "id": "dfs",
      "num": 5,
      "name": "DFS",
      "fullName": "深度特征合成 (Deep Feature Synthesis)",
      "year": "2015",
      "org": "MIT",
      "parent": "—",
      "paperUrl": "https://www.mit.edu/~kalyan/papers/dfs.pdf",
      "projectUrl": "",
      "category": "auto_feature",
      "motivation": "跨关系表堆叠聚合原语合成深层特征",
      "summary": "DFS 提出了一种自动化特征工程算法，通过在关系型数据库的实体关系图上递归地堆叠聚合（Aggregation）与转换（Transform）原语，自动合成具有语义深度的特征，使机器在多个数据科学竞赛中达到与人类数据科学家相当的水平。",
      "keyPoints": [
        "<strong>实体关系图建模</strong>：将关系型数据库的多表结构抽象为实体-关系图（Entity-Relationship Graph），节点为实体（表），边为外键关系",
        "<strong>两类特征原语</strong>：定义 Transform 原语（作用于单实体的列，如 <code>log</code>、<code>abs</code>、<code>weekend</code>）和 Aggregation 原语（跨关系聚合子实体，如 <code>SUM</code>、<code>MEAN</code>、<code>COUNT</code>、<code>MODE</code>、<code>STD</code>）",
        "<strong>深度堆叠机制</strong>：\"深度\"指多层原语的递归堆叠——先从深层子表聚合到父表，再对聚合结果施加转换，再继续向上聚合，形成高阶复合特征",
        "<strong>回溯式图遍历</strong>：算法沿实体关系图进行深度优先搜索（DFS traversal），在每一层应用原语，通过回溯路径构建跨多表的深层特征",
        "<strong>Data Science Machine (DSM)</strong>：DFS 是 DSM 系统的核心组件，DSM 还包含自动模型选择与调参，端到端自动化数据科学流程",
        "<strong>竞赛验证</strong>：在 3 个数据科学竞赛（KDD Cup 2014、Kaggle）中，DSM 的表现超过了 615/906 支人类参赛队伍"
      ],
      "detail": "<p><img alt=\"DFS 实体关系图 (EntitySet)\" src=\"https://raw.githubusercontent.com/alteryx/featuretools/main/docs/source/_static/images/entity_set.png\" />\n<em>图：Featuretools 中的 EntitySet 结构示意——多张实体表通过外键关系相连，DFS 沿这些关系路径递归应用聚合与转换原语，自动为目标实体合成特征矩阵。</em></p>\n<pre><code class=\"language-python\"># DFS 核心算法伪代码\ndef deep_feature_synthesis(target_entity, entityset, primitives, max_depth):\n    &quot;&quot;&quot;\n    target_entity: 目标实体（需要生成特征的主表）\n    entityset: 实体关系图（所有表 + 外键关系）\n    primitives: {transform: [log, abs, ...], aggregation: [sum, mean, count, ...]}\n    max_depth: 最大堆叠深度\n    &quot;&quot;&quot;\n    features = get_base_features(target_entity)  # 初始化：目标实体的原始列\n\n    for depth in range(1, max_depth + 1):\n        new_features = []\n\n        # 1. 对当前特征应用 Transform 原语\n        for feat in features:\n            for trans_prim in primitives['transform']:\n                if is_compatible(trans_prim, feat.dtype):\n                    new_features.append(trans_prim(feat))\n\n        # 2. 沿关系路径应用 Aggregation 原语\n        for relationship in entityset.get_relationships(target_entity):\n            child_entity = relationship.child_entity\n            # 递归：先对子实体做 DFS 获取其特征\n            child_features = deep_feature_synthesis(\n                child_entity, entityset, primitives, max_depth=depth - 1\n            )\n            for child_feat in child_features:\n                for agg_prim in primitives['aggregation']:\n                    if is_compatible(agg_prim, child_feat.dtype):\n                        # 按外键分组聚合子实体特征\n                        new_features.append(\n                            agg_prim(child_feat, group_by=relationship.parent_key)\n                        )\n\n        features = features + new_features\n\n    return filter_and_select(features)  # 去重、过滤冗余特征\n</code></pre>\n<h5>动机与背景</h5>\n<p>在传统的数据科学工作流中，<strong>特征工程</strong>被公认为最耗时且最依赖领域知识的环节。面对关系型数据库中的多表数据，数据科学家需要手动编写大量 SQL JOIN 和聚合查询，将分散在多张表中的信息汇总到目标实体上。这一过程不仅繁琐，而且高度依赖个人经验——不同的特征设计可能导致模型性能的巨大差异。</p>\n<p>Kanter 和 Veeramachaneni 观察到，人类数据科学家在构造特征时，实际上遵循着一套可形式化的模式：<strong>沿着表间关系路径，反复执行聚合和转换操作</strong>。例如，要预测某客户是否会流失，数据科学家会从交易表中计算该客户的\"平均交易金额\"（聚合），再对其取对数（转换），甚至进一步聚合该客户所在地区所有客户的\"平均交易金额的对数的标准差\"（深层堆叠）。DFS 的核心思想就是将这一人工模式自动化。</p>\n<h5>核心机制：实体关系图与原语堆叠</h5>\n<p>DFS 的输入是一个 <strong>EntitySet</strong>——由多张数据表及其外键关系构成的实体关系图 \\(\\mathcal{G} = (\\mathcal{E}, \\mathcal{R})\\)，其中 \\(\\mathcal{E}\\) 为实体集合（每张表是一个实体），\\(\\mathcal{R}\\) 为关系集合（外键连接）。</p>\n<p>算法的核心是两类<strong>原语（Primitives）</strong>：</p>\n<ol>\n<li><strong>Transform 原语</strong> \\(T\\)：作用于单个实体内的一列或多列，生成新列。例如：</li>\n<li>数值型：\\(T_{\\text{log}}(x) = \\log(x)\\)，\\(T_{\\text{abs}}(x) = |x|\\)</li>\n<li>时间型：\\(T_{\\text{weekend}}(t) = \\mathbb{1}[\\text{day}(t) \\in \\{6,7\\}]\\)，\\(T_{\\text{month}}(t) = \\text{month}(t)\\)</li>\n<li>\n<p>多列：\\(T_{\\text{diff}}(x_1, x_2) = x_1 - x_2\\)</p>\n</li>\n<li>\n<p><strong>Aggregation 原语</strong> \\(A\\)：跨关系聚合子实体的特征到父实体。给定父实体 \\(e_p\\) 与子实体 \\(e_c\\) 的关系 \\(r\\)，对子实体特征 \\(f\\) 按父键分组聚合：</p>\n</li>\n</ol>\n<p>$$A_{\\text{agg}}(f, r) = \\text{GroupBy}(e_c, r.\\text{parent\\_key}).\\text{agg}(f)$$</p>\n<p>其中 \\(\\text{agg} \\in \\{\\text{SUM}, \\text{MEAN}, \\text{COUNT}, \\text{STD}, \\text{MODE}, \\text{MIN}, \\text{MAX}, \\text{N\\_UNIQUE}, \\text{TREND}, ...\\}\\)。</p>\n<div class=\"key-point\">💡 <strong>关键</strong>：\"深度\"的含义在于原语的递归堆叠。深度为 1 的特征是直接对子表的原始列做一次聚合（如 <code>MEAN(transactions.amount)</code>）；深度为 2 的特征则是先对子表的子表聚合，再对结果聚合（如 <code>STD(customers.MEAN(transactions.amount))</code>），或者先转换再聚合（如 <code>MEAN(transactions.LOG(amount))</code>）。</div>\n<h5>图遍历与特征构建流程</h5>\n<p>DFS 的特征构建过程可以形式化为对实体关系图的<strong>深度优先遍历</strong>：</p>\n<ol>\n<li><strong>初始化</strong>：从目标实体 \\(e_{\\text{target}}\\) 出发，收集其所有原始列作为基础特征 \\(\\mathcal{F}_0\\)</li>\n<li><strong>递归展开</strong>：对于 \\(e_{\\text{target}}\\) 的每条关系 \\(r_i\\)，找到关联的子实体 \\(e_{c_i}\\)，递归地对 \\(e_{c_i}\\) 执行 DFS（深度减 1）</li>\n<li><strong>聚合回传</strong>：将子实体的特征通过 Aggregation 原语聚合回目标实体</li>\n<li><strong>转换增强</strong>：对目标实体上的所有特征（包括聚合得到的新特征）应用 Transform 原语</li>\n<li><strong>深度控制</strong>：通过 <code>max_depth</code> 参数控制递归深度，防止特征爆炸</li>\n</ol>\n<p>特征数量随深度指数增长。设原始特征数为 \\(n\\)，Transform 原语数为 \\(|T|\\)，Aggregation 原语数为 \\(|A|\\)，关系数为 \\(|R|\\)，则深度 \\(d\\) 时的特征数量级约为：</p>\n<p>$$|\\mathcal{F}_d| \\approx n \\cdot (|T| + |A| \\cdot |R|)^d$$</p>\n<p>因此实际使用中 <code>max_depth</code> 通常设为 2 或 3，并配合特征选择来控制维度。</p>\n<h5>与传统方法的区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th>传统手工特征工程</th>\n<th>DFS</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><strong>执行者</strong></td>\n<td>人类数据科学家</td>\n<td>自动化算法</td>\n</tr>\n<tr>\n<td><strong>多表处理</strong></td>\n<td>手写 SQL JOIN + GROUP BY</td>\n<td>自动沿实体关系图遍历</td>\n</tr>\n<tr>\n<td><strong>特征深度</strong></td>\n<td>通常 1-2 层，受人工精力限制</td>\n<td>可系统性地探索任意深度</td>\n</tr>\n<tr>\n<td><strong>领域知识</strong></td>\n<td>强依赖</td>\n<td>通过原语库编码通用模式</td>\n</tr>\n<tr>\n<td><strong>可复现性</strong></td>\n<td>低（依赖个人经验）</td>\n<td>高（算法确定性输出）</td>\n</tr>\n<tr>\n<td><strong>时间成本</strong></td>\n<td>数天到数周</td>\n<td>数分钟到数小时</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：DFS 生成的特征数量可能非常庞大（深度 2 时可达数千维），因此在实际应用中通常需要配合特征选择（如基于模型重要性的筛选）来降维。论文中 DSM 系统使用随机森林等模型的特征重要性进行后筛选。</div>\n<h5>DSM 系统与竞赛评估</h5>\n<p>DFS 作为 Data Science Machine（DSM）的特征引擎，与自动模型选择和超参调优模块协同工作。在论文的实验评估中：</p>\n<ul>\n<li><strong>KDD Cup 2014</strong>（预测教育项目资助）：DSM 排名前 <strong>30%</strong></li>\n<li><strong>Kaggle Acquire Valued Shoppers</strong>（预测优惠券使用）：DSM 排名前 <strong>16%</strong>  </li>\n<li><strong>Kaggle Walmart Trip Type</strong>（购物行程分类）：DSM 排名前 <strong>34%</strong></li>\n</ul>\n<p>综合三个竞赛，DSM 的表现优于 <strong>615/906（67.8%）</strong> 的人类参赛队伍。这一结果首次证明了自动化特征工程在真实竞赛场景中的可行性，也为后续的 Featuretools 开源库奠定了基础。</p>",
      "quiz": {
        "q": "",
        "options": [],
        "answer": 0,
        "explain": ""
      }
    },
    {
      "id": "auto_sklearn",
      "num": 6,
      "name": "Auto-sklearn",
      "fullName": "自动Sklearn (Auto-sklearn: Efficient and Robust AutoML)",
      "year": "2015",
      "org": "University of Freiburg",
      "parent": "auto_weka",
      "paperUrl": "https://papers.nips.cc/paper/2015/hash/11d0e6287202fced83f79975ec59a3a6-Abstract.html",
      "projectUrl": "",
      "category": "framework",
      "motivation": "元学习热启动+自动集成构建",
      "summary": "Auto-sklearn 在 Auto-WEKA 的 CASH 框架基础上，引入**元学习热启动**（利用历史数据集的元特征初始化贝叶斯优化）和**自动集成构建**（从优化过程中评估过的模型中贪心选择集成成员），在 scikit-learn 生态上构建了一个高效且鲁棒的全自动机器学习系统，赢得了首届 ChaLearn AutoML 挑战赛冠军。",
      "keyPoints": [
        "基于 scikit-learn 构建完整 ML pipeline：15 个分类器 + 14 个特征预处理方法 + 4 个数据预处理方法，共 110 个超参数",
        "元学习热启动：利用 140 个数据集上的 38 维元特征，通过 \\(k\\)-NN 选择相似数据集的最优配置来初始化 SMAC",
        "自动集成构建：基于 Caruana et al. (2004) 的贪心集成选择方法，从优化过程中评估过的所有模型中构建加权集成",
        "优化器采用 SMAC（基于随机森林的贝叶斯优化），天然支持条件超参数和混合搜索空间",
        "在 140 个 OpenML 数据集上进行系统评估，显著优于 Auto-WEKA 和 hyperopt-sklearn",
        "赢得首届 ChaLearn AutoML 挑战赛第一阶段冠军"
      ],
      "detail": "<p><img alt=\"Auto-sklearn 系统架构图\" src=\"https://ar5iv.labs.arxiv.org/html/1507.04528v2/assets/x1.png\" />\n<em>图：Auto-sklearn 系统总览——在传统 AutoML 系统（虚线框）外围增加了元学习（左）和自动集成构建（右）两个模块</em></p>\n<pre><code class=\"language-python\"># Auto-sklearn 核心流程伪代码\ndef auto_sklearn(D_train, time_budget, meta_knowledge):\n    # ====== 阶段 1: 元学习热启动 ======\n    meta_features = extract_meta_features(D_train)  # 38 维元特征\n    # 从 140 个历史数据集中找到最相似的 k=25 个\n    similar_datasets = kNN(meta_features, meta_knowledge, k=25)\n    # 获取这些数据集上的最优配置作为初始化点\n    initial_configs = [best_config(d) for d in similar_datasets]\n\n    # ====== 阶段 2: 贝叶斯优化 (SMAC) ======\n    evaluated_models = []\n    smac = SMAC(config_space, initial_configs)\n\n    while not time_budget_exhausted():\n        config = smac.suggest()              # 基于随机森林代理模型 + EI\n        score = cross_validate(config, D_train)\n        smac.update(config, score)\n        evaluated_models.append((config, trained_model, score))\n\n    # ====== 阶段 3: 自动集成构建 ======\n    ensemble = greedy_ensemble_selection(\n        evaluated_models, \n        max_size=50,\n        with_replacement=True              # 允许重复选择（加权效果）\n    )\n    return ensemble\n</code></pre>\n<h5>动机与背景</h5>\n<p>Auto-WEKA 首次将算法选择与超参数优化统一为 CASH 问题，但仍存在两个关键局限：</p>\n<ul>\n<li><strong>冷启动问题</strong>：贝叶斯优化在搜索初期缺乏先验知识，需要大量随机探索才能找到有希望的区域。对于复杂的 ML pipeline 搜索空间（110 个超参数），这种冷启动代价尤为高昂</li>\n<li><strong>单模型输出</strong>：传统 AutoML 系统只返回优化过程中找到的单一最优配置，浪费了搜索过程中评估的大量其他高质量模型，且单模型预测的鲁棒性不如集成</li>\n</ul>\n<div class=\"key-point\">💡 关键洞察：Auto-sklearn 的核心思想是\"不浪费任何信息\"——用历史数据集的经验加速搜索启动，用搜索过程中产生的所有模型构建集成，从而在效率和鲁棒性两个维度同时提升。</div>\n<h5>搜索空间：结构化 ML Pipeline</h5>\n<p>Auto-sklearn 的搜索空间定义了一个完整的机器学习 pipeline，包含三个层次：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>层次</th>\n<th>组件数</th>\n<th>示例</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>数据预处理</td>\n<td>4 种</td>\n<td>缺失值填充（均值/中位数/众数）、独热编码、类别特征处理、特征缩放</td>\n</tr>\n<tr>\n<td>特征预处理</td>\n<td>14 种</td>\n<td>PCA、核 PCA、随机厨房水槽、多项式特征、特征选择（基于方差/互信息/L1）等</td>\n</tr>\n<tr>\n<td>分类器</td>\n<td>15 种</td>\n<td>AdaBoost、随机森林、梯度提升、SVM（线性/RBF）、KNN、朴素贝叶斯、LDA、QDA 等</td>\n</tr>\n</tbody>\n</table></div>\n<p>整个搜索空间包含 110 个超参数，形成一个层次化的条件配置空间。CASH 问题的形式化定义为：</p>\n<p>$$\\mathcal{A}^*_{\\lambda^*} \\in \\underset{\\mathcal{A}^{(j)} \\in \\mathcal{A},\\; \\lambda \\in \\Lambda^{(j)}}{\\text{argmin}} \\; \\frac{1}{k} \\sum_{i=1}^{k} \\mathcal{L}\\!\\left(\\mathcal{A}^{(j)}_\\lambda,\\; \\mathcal{D}^{(i)}_{\\text{train}},\\; \\mathcal{D}^{(i)}_{\\text{valid}}\\right)$$</p>\n<p>其中 \\(\\mathcal{A}\\) 包含所有可能的 pipeline 配置（数据预处理 + 特征预处理 + 分类器），\\(\\Lambda^{(j)}\\) 是第 \\(j\\) 种 pipeline 的超参数空间。</p>\n<h5>核心机制一：元学习热启动</h5>\n<p>元学习模块的目标是利用在历史数据集上积累的经验，为新数据集提供高质量的初始化配置，从而跳过贝叶斯优化的冷启动阶段。</p>\n<p><strong>元特征提取</strong>：对每个数据集提取 38 维元特征，包括：\n- <strong>简单特征</strong>：样本数、特征数、类别数、缺失值比例等\n- <strong>统计特征</strong>：特征的偏度、峰度均值/标准差\n- <strong>信息论特征</strong>：类别熵、特征-类别互信息\n- <strong>PCA 特征</strong>：前几个主成分的解释方差比例</p>\n<p><strong>热启动流程</strong>：\n1. 离线阶段：在 140 个 OpenML 数据集上运行 Auto-sklearn，记录每个数据集的元特征和最优配置\n2. 在线阶段：对新数据集提取元特征，计算与历史数据集的 L1 距离\n3. 选择最近的 \\(k=25\\) 个数据集的最优配置，作为 SMAC 的初始评估点</p>\n<div class=\"warn-box\">⚠️ 注意：元学习并不替代贝叶斯优化，而是为其提供更好的起点。在时间预算充足时，贝叶斯优化最终会收敛到相似的解；但在时间有限时（实际应用中的常见场景），元学习热启动能带来显著的性能提升。</div>\n<h5>核心机制二：自动集成构建</h5>\n<p>传统 AutoML 系统只返回单一最优模型，但优化过程中可能评估了数百个不同配置的模型。Auto-sklearn 采用 Caruana et al. (2004) 提出的<strong>贪心集成选择</strong>方法，从这些模型中构建集成：</p>\n<p><strong>贪心集成选择算法</strong>：</p>\n<p>$$\\text{Ensemble}_{t+1} = \\text{Ensemble}_t \\cup \\underset{m \\in \\mathcal{M}}{\\text{argmin}} \\; \\mathcal{L}\\!\\left(\\text{Ensemble}_t \\cup \\{m\\},\\; \\mathcal{D}_{\\text{valid}}\\right)$$</p>\n<p>具体步骤：\n1. 初始化：从所有已评估模型的验证集预测中，选择验证损失最小的模型\n2. 迭代添加：每轮从候选模型库中选择一个加入后能最大程度降低集成验证损失的模型\n3. <strong>允许重复选择</strong>：同一模型可被多次选入，等价于为其分配更高的权重\n4. 集成大小上限设为 50，最终预测为所有成员预测的加权平均</p>\n<div class=\"key-point\">💡 关键优势：这种方法几乎零额外计算成本——所有模型在优化阶段已经训练完毕，集成选择只需操作验证集上的预测概率矩阵。同时，集成天然具有正则化效果，能显著提升鲁棒性。</div>\n<h5>优化引擎：SMAC</h5>\n<p>Auto-sklearn 使用 SMAC（Sequential Model-based Algorithm Configuration）作为贝叶斯优化引擎：</p>\n<ul>\n<li><strong>代理模型</strong>：随机森林，预测配置的性能均值和不确定性</li>\n<li><strong>采集函数</strong>：Expected Improvement (EI)，平衡探索与利用</li>\n<li><strong>条件空间处理</strong>：随机森林天然支持条件超参数——未激活的超参数在分裂时被忽略</li>\n<li><strong>鲁棒性机制</strong>：对超时或崩溃的配置赋予最差性能值，防止搜索陷入不稳定区域</li>\n</ul>\n<h5>与前序工作的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方面</th>\n<th>Auto-WEKA</th>\n<th>hyperopt-sklearn</th>\n<th>Auto-sklearn</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>ML 框架</td>\n<td>WEKA (Java)</td>\n<td>scikit-learn</td>\n<td>scikit-learn</td>\n</tr>\n<tr>\n<td>搜索空间</td>\n<td>786 个超参数</td>\n<td>未报告</td>\n<td>110 个超参数</td>\n</tr>\n<tr>\n<td>优化方法</td>\n<td>SMAC / TPE</td>\n<td>TPE</td>\n<td>SMAC</td>\n</tr>\n<tr>\n<td>元学习</td>\n<td>❌</td>\n<td>❌</td>\n<td>✅ 38 维元特征 + kNN</td>\n</tr>\n<tr>\n<td>集成构建</td>\n<td>❌</td>\n<td>❌</td>\n<td>✅ 贪心集成选择</td>\n</tr>\n<tr>\n<td>数据预处理</td>\n<td>有限</td>\n<td>有限</td>\n<td>系统化（4 种方法）</td>\n</tr>\n<tr>\n<td>特征预处理</td>\n<td>特征选择</td>\n<td>有限</td>\n<td>14 种方法</td>\n</tr>\n</tbody>\n</table></div>\n<h5>实验结果</h5>\n<p>在 140 个 OpenML 数据集上的系统评估表明：</p>\n<ul>\n<li><strong>整体性能</strong>：Auto-sklearn 在大多数数据集上显著优于 Auto-WEKA 和 hyperopt-sklearn</li>\n<li><strong>元学习贡献</strong>：在搜索早期（前 10 分钟），元学习热启动带来的性能提升最为显著，平均排名从 ~3.5 降至 ~2.5</li>\n<li><strong>集成贡献</strong>：自动集成构建在几乎所有数据集上都优于或等于单一最优模型，平均提升约 1-2 个百分点</li>\n<li><strong>两者结合</strong>：元学习 + 集成的完整 Auto-sklearn 系统在所有时间预算下均表现最优</li>\n<li><strong>ChaLearn 挑战赛</strong>：在首届 AutoML 挑战赛第一阶段的 5 个数据集上排名第一</li>\n</ul>",
      "quiz": {
        "q": "Auto-sklearn 相比 Auto-WEKA 的两个核心改进分别解决了什么问题？",
        "options": [
          "元学习解决过拟合问题，集成构建解决欠拟合问题",
          "元学习解决冷启动问题，集成构建提升单模型输出的鲁棒性",
          "元学习解决特征选择问题，集成构建解决算法选择问题",
          "元学习加速模型训练，集成构建减少内存占用"
        ],
        "answer": 1,
        "explain": "元学习通过历史数据集经验为贝叶斯优化提供高质量初始点，解决冷启动问题；集成构建从搜索过程中的多个模型中选择成员组成集成，比单一最优模型更鲁棒。"
      }
    },
    {
      "id": "pbt",
      "num": 7,
      "name": "PBT",
      "fullName": "基于种群的训练 (Population Based Training)",
      "year": "2017",
      "org": "DeepMind",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/1711.09846",
      "projectUrl": "",
      "category": "hpo",
      "motivation": "训练中动态在线进化超参",
      "summary": "PBT 提出了一种将**种群进化**与**梯度优化**相结合的在线超参数调优框架：在并行训练的种群中，表现差的成员复制（exploit）优秀成员的权重，并扰动（explore）其超参数继续训练，从而在**单次训练过程中**自动发现超参数的动态调度策略，无需额外计算开销。",
      "keyPoints": [
        "<strong>种群并行训练</strong>：N 个模型（worker）异步并行训练，共享全局性能信息，无需集中式同步",
        "<strong>Exploit 机制</strong>：表现差的 worker 复制表现好的 worker 的权重和超参数（截断选择 / T-test 选择）",
        "<strong>Explore 机制</strong>：复制后对超参数进行随机扰动（×1.2 或 ×0.8）或从先验分布重采样",
        "<strong>在线超参调度发现</strong>：自动发现学习率衰减等非平凡的超参数 schedule，而非仅找到固定最优值",
        "<strong>热启动 + 无额外开销</strong>：利用训练中间状态（warm-start），总计算量与普通并行搜索相同",
        "<strong>广泛适用性</strong>：在深度 RL（DM Lab / Atari / StarCraft II）、机器翻译（Transformer）、GAN 训练五大领域均取得显著提升"
      ],
      "detail": "<h5>核心框架图</h5>\n<p><img alt=\"PBT 框架示意图\" src=\"https://ar5iv.labs.arxiv.org/html/1711.09846v1/assets/x1.png\" />\n<em>图：PBT 与传统方法对比。左：序列优化（逐个尝试超参）；中：并行搜索（同时训练多组固定超参）；右：PBT（并行训练 + 在线进化超参，种群成员之间可交换信息）。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># Algorithm 1: Population Based Training (PBT)\ndef PBT_Train(population P):\n    # P 中每个成员 = (θ, h, p, t)\n    #   θ: 模型权重, h: 超参数, p: 当前性能, t: 训练步数\n\n    for (θ, h, p, t) in P:  # 异步并行\n        while not end_of_training:\n            θ ← step(θ | h)          # 用超参 h 做一步梯度更新\n            p ← eval(θ)              # 评估当前模型性能\n\n            if ready(p, t, P):        # 是否达到 exploit/explore 条件\n                h', θ' ← exploit(h, θ, p, P)  # 利用种群找更好解\n                if θ != θ':           # 如果发生了替换\n                    h, θ ← explore(h', θ', P)  # 扰动超参数\n                    p ← eval(θ)       # 重新评估\n\n            update P with (θ, h, p, t+1)\n\n    return θ with highest p in P\n</code></pre>\n<h5>方法细节</h5>\n<p><strong>动机与背景</strong></p>\n<p>神经网络训练高度依赖超参数（学习率、正则化强度、损失权重等）的选择。传统方法面临两难困境：</p>\n<ul>\n<li><strong>序列优化</strong>（如手动调参、贝叶斯优化）：每次完整训练后才能评估一组超参数，计算代价极高</li>\n<li><strong>并行搜索</strong>（如随机搜索、网格搜索）：同时训练多组固定超参数，但各 worker 之间完全独立，无法利用训练中间信息</li>\n</ul>\n<p>更关键的是，最优超参数往往<strong>随训练阶段变化</strong>（例如学习率需要先大后小），但传统方法通常假设超参数固定或预定义简单 schedule，无法自适应发现最优调度策略。</p>\n<div class=\"key-point\">💡 <strong>关键洞察</strong>：PBT 的核心思想是——既然我们已经在并行训练多个模型，为什么不让它们在训练过程中互相\"学习\"？表现好的模型可以将自己的经验（权重 + 超参数）传递给表现差的模型，后者在此基础上继续探索。</div>\n<p><strong>核心机制详解</strong></p>\n<p>PBT 将每个训练过程视为种群中的一个成员，每个成员包含四元组 \\((θ, h, p, t)\\)：模型权重、超参数、当前性能评分、训练步数。整个框架围绕四个核心操作展开：</p>\n<p><strong>1. Step — 梯度更新</strong></p>\n<p>每个 worker 独立执行标准的梯度下降步骤：</p>\n<p>$$\\theta \\leftarrow \\mathtt{step}(\\theta \\mid h)$$</p>\n<p>其中 \\(h\\) 包含学习率、entropy cost、辅助损失权重等超参数。多步 step 链式组合形成完整的优化过程：</p>\n<p>$$\\theta^{*} = \\mathtt{step}(\\mathtt{step}(\\ldots\\mathtt{step}(\\theta \\mid h_1)\\ldots \\mid h_{T-1}) \\mid h_T)$$</p>\n<p><strong>2. Eval — 性能评估</strong></p>\n<p>定期评估当前模型性能 \\(p \\leftarrow \\mathtt{eval}(\\theta)\\)。评估函数不需要可微，也不需要与训练损失函数相同（但应相关）。例如在 RL 中使用最近 10 个 episode 的平均回报，在机器翻译中使用 BLEU 分数。</p>\n<p><strong>3. Exploit — 利用种群信息</strong></p>\n<p>当一个 worker 被判定为\"ready\"（例如已训练足够步数）时，触发 exploit 操作。论文提出两种策略：</p>\n<ul>\n<li><strong>截断选择（Truncation Selection）</strong>：将种群按性能排序，底部 20% 的 worker 从顶部 20% 中随机选一个，复制其权重和超参数</li>\n<li><strong>T-test 选择</strong>：随机采样另一个 worker，用 Welch's t-test 比较两者最近的性能，若对方显著更优则复制</li>\n</ul>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：exploit 不仅复制超参数，还复制模型权重 \\(\\theta\\)。这是 PBT 区别于纯超参数搜索的关键——它实现了<strong>模型选择</strong>（model selection）与<strong>超参数优化</strong>的统一。</div>\n<p><strong>4. Explore — 探索新超参数</strong></p>\n<p>exploit 之后立即执行 explore，在复制得到的超参数基础上产生变异：</p>\n<ul>\n<li><strong>扰动（Perturb）</strong>：每个超参数独立地乘以 1.2 或 0.8（随机选择）</li>\n<li><strong>重采样（Resample）</strong>：以一定概率从原始先验分布中重新采样</li>\n</ul>\n<p>这种设计使得种群能够持续探索超参数空间，避免所有 worker 收敛到同一组超参数。</p>\n<p><strong>与传统方法的关键区别</strong></p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>序列优化</th>\n<th>并行搜索</th>\n<th>PBT</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>计算效率</td>\n<td>低（串行）</td>\n<td>中（并行但独立）</td>\n<td>高（并行 + 信息共享）</td>\n</tr>\n<tr>\n<td>超参数 schedule</td>\n<td>需预定义</td>\n<td>固定</td>\n<td><strong>自动发现</strong></td>\n</tr>\n<tr>\n<td>热启动</td>\n<td>无</td>\n<td>无</td>\n<td><strong>有</strong>（exploit 复制权重）</td>\n</tr>\n<tr>\n<td>同步要求</td>\n<td>—</td>\n<td>无</td>\n<td><strong>无</strong>（完全异步）</td>\n</tr>\n<tr>\n<td>模型选择</td>\n<td>训练后</td>\n<td>训练后</td>\n<td><strong>训练中在线进行</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>实验验证</strong></p>\n<p>PBT 在五大领域均超越了使用相同计算资源的随机搜索基线：</p>\n<ul>\n<li><strong>DM Lab</strong>（UNREAL, 40 workers）：人类归一化性能从 93% 提升至 <strong>106%</strong></li>\n<li><strong>Atari</strong>（Feudal Networks, 80 workers）：在 Amidar、Gravitar 等游戏上显著提升</li>\n<li><strong>StarCraft II</strong>（A3C, 30 workers）：6 个小游戏关卡上全面提升</li>\n<li><strong>机器翻译</strong>（Transformer, 32 workers）：WMT 2014 En-De 任务 BLEU 分数提升</li>\n<li><strong>GAN 训练</strong>（45 workers）：Inception Score 提升，训练更稳定</li>\n</ul>\n<p>消融实验的关键发现：\n1. <strong>种群规模</strong>：≥20 即可获得稳定提升，更大种群收益递减\n2. <strong>Exploit + Explore 缺一不可</strong>：仅复制权重或仅调超参数效果均不如两者结合\n3. <strong>动态 schedule &gt; 固定最优超参</strong>：用 PBT 最终发现的超参数从头训练，效果不如 PBT 的在线自适应调度，证明了<strong>超参数 schedule 的价值</strong></p>",
      "quiz": {
        "q": "PBT 中 exploit 操作的核心作用是什么？",
        "options": [
          "对当前模型的超参数进行随机扰动以增加多样性",
          "将表现差的 worker 的权重和超参数替换为表现好的 worker 的",
          "在所有 worker 之间同步梯度以加速收敛",
          "使用贝叶斯优化选择下一组要尝试的超参数"
        ],
        "answer": 1,
        "explain": "exploit 的作用是让表现差的 worker 复制表现好的 worker 的权重和超参数，实现种群内的模型选择。随机扰动是 explore 的功能，PBT 不需要同步也不使用贝叶斯优化。"
      }
    },
    {
      "id": "nas_rl",
      "num": 8,
      "name": "NAS-RL",
      "fullName": "强化学习神经架构搜索 (Neural Architecture Search with RL)",
      "year": "2017",
      "org": "Google Brain",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/1611.01578",
      "projectUrl": "",
      "category": "nas",
      "motivation": "RNN控制器+REINFORCE生成架构",
      "summary": "NAS-RL 的核心目标是：RNN控制器+REINFORCE生成架构。",
      "keyPoints": [
        "核心动机：RNN控制器+REINFORCE生成架构",
        "代表机构：Google Brain"
      ],
      "detail": "<p>RNN控制器+REINFORCE生成架构</p>"
    },
    {
      "id": "hyperband",
      "num": 9,
      "name": "Hyperband",
      "fullName": "超级带 (Hyperband: A Novel Bandit-Based Approach)",
      "year": "2018",
      "org": "UC Berkeley",
      "parent": "random_search",
      "paperUrl": "https://www.jmlr.org/papers/v18/16-065.html",
      "projectUrl": "",
      "category": "hpo",
      "motivation": "多臂赌博机+逐次减半加速评估",
      "summary": "Hyperband 将超参数优化问题转化为资源分配问题，通过在不同\"探索-利用\"权衡下多次运行 Successive Halving（逐次减半）算法，自适应地在配置数量与单配置资源之间取得最优平衡，实现了比随机搜索和贝叶斯优化更快数十倍的超参数搜索速度。",
      "keyPoints": [
        "将超参数优化建模为非随机最优臂识别（non-stochastic best-arm identification）问题",
        "提出 Successive Halving (SH) 作为核心子程序：均匀分配资源后逐轮淘汰表现最差的 \\(1/\\eta\\) 配置",
        "Hyperband 通过多个 bracket（\\(s_{\\max}+1\\) 个）并行运行 SH，每个 bracket 使用不同的初始配置数 \\(n\\) 和初始资源 \\(r\\)",
        "两个关键输入参数：\\(R\\)（单配置最大资源）和 \\(\\eta\\)（淘汰比例，默认 3）",
        "总预算控制：每个 bracket 的总资源消耗约为 \\(B = (s_{\\max}+1) \\cdot R\\)",
        "理论保证：在特定假设下，Hyperband 的简单随机搜索回退保证不超过随机搜索的 \\(5\\times\\) 开销",
        "无需对目标函数做任何假设（无模型方法），适用于任意黑盒优化",
        "实验覆盖：神经网络超参数调优、核方法参数选择、特征选择等多个场景"
      ],
      "detail": "<h5>核心框架图</h5>\n<p><img alt=\"Hyperband 配置选择与评估对比\" src=\"https://ar5iv.labs.arxiv.org/html/1603.06560/assets/x1.png\" />\n<em>图 1(a)：Configuration Selection —— 传统方法（如贝叶斯优化）自适应选择配置 vs. Hyperband 随机采样大量配置</em></p>\n<p><img alt=\"Hyperband 配置评估策略\" src=\"https://ar5iv.labs.arxiv.org/html/1603.06560/assets/x2.png\" />\n<em>图 1(b)：Configuration Evaluation —— 传统方法为每个配置分配等量资源 vs. Hyperband 通过 early-stopping 自适应分配资源</em></p>\n<p><img alt=\"Hyperband 各 bracket 性能对比\" src=\"https://ar5iv.labs.arxiv.org/html/1603.06560/assets/x4.png\" />\n<em>图 3：不同 bracket 的性能表现及 Hyperband 的包络线效果</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># Successive Halving (SH) 子程序\ndef successive_halving(n, r, s, eta, get_hyperparameter_configuration, run_then_return_val_loss):\n    &quot;&quot;&quot;\n    n: 初始配置数\n    r: 每个配置的初始资源量\n    s: 淘汰轮数\n    eta: 淘汰比例 (默认=3)\n    &quot;&quot;&quot;\n    T = get_hyperparameter_configuration(n)  # 随机采样 n 个配置\n    for i in range(0, s + 1):\n        n_i = int(n * eta**(-i))          # 当前存活配置数\n        r_i = r * eta**i                   # 当前每个配置分配的资源\n        L = [run_then_return_val_loss(t, r_i) for t in T]  # 训练并评估\n        T = top_k(T, L, int(n_i / eta))   # 保留表现最好的 1/eta\n    return best(T)\n\n# Hyperband 主算法\ndef hyperband(R, eta):\n    &quot;&quot;&quot;\n    R: 单配置最大资源 (如最大 epoch 数)\n    eta: 淘汰比例 (默认=3)\n    &quot;&quot;&quot;\n    s_max = int(log(R) / log(eta))  # 最大 bracket 编号\n    B = (s_max + 1) * R             # 每个 bracket 的总预算\n\n    for s in range(s_max, -1, -1):  # 从最激进到最保守\n        n = int(ceil(B / R * eta**s / (s + 1)))  # 初始配置数\n        r = R * eta**(-s)                         # 初始资源\n        # 运行 Successive Halving，共 s 轮淘汰\n        successive_halving(n, r, s, eta)\n</code></pre>\n<h5>动机与背景</h5>\n<p><strong>问题定义</strong>：超参数优化的核心挑战在于评估单个配置的代价极高（如训练一个深度神经网络需要数小时甚至数天）。传统方法面临两难困境：</p>\n<ol>\n<li><strong>配置选择（Configuration Selection）</strong>：贝叶斯优化等方法通过建模目标函数来智能选择下一个要评估的配置，但每次评估都需要完整训练，开销巨大。</li>\n<li><strong>配置评估（Configuration Evaluation）</strong>：如何在不完整训练的情况下判断一个配置的优劣？</li>\n</ol>\n<div class=\"key-point\">💡 关键洞察：Hyperband 认为\"选择哪些配置\"不如\"如何分配有限资源给配置\"重要。与其花大量计算建模目标函数，不如随机采样大量配置，然后通过 early-stopping 快速淘汰差的配置。</div>\n<h5>核心机制：Successive Halving (SH)</h5>\n<p>Successive Halving 是 Hyperband 的基础构建块。其思想极为简洁：</p>\n<ol>\n<li>均匀采样 \\(n\\) 个配置</li>\n<li>为每个配置分配 \\(r\\) 单位资源进行训练</li>\n<li>保留表现最好的 \\(\\lfloor n/\\eta \\rfloor\\) 个配置</li>\n<li>将资源翻 \\(\\eta\\) 倍，重复步骤 2-3，直到剩余 1 个配置</li>\n</ol>\n<p>SH 的核心权衡（\\(n\\) vs. \\(B/n\\) 问题）：\n- 给定总预算 \\(B\\)，选择大的 \\(n\\) 意味着探索更多配置但每个配置分到的资源少（可能误杀\"大器晚成\"的配置）\n- 选择小的 \\(n\\) 意味着每个配置获得充足资源但探索范围有限</p>\n<p>$$B = n \\cdot r \\cdot \\sum_{i=0}^{s} \\eta^{-i} \\approx n \\cdot r \\cdot \\frac{\\eta}{\\eta - 1}$$</p>\n<h5>核心机制：Hyperband 的多 Bracket 策略</h5>\n<p>Hyperband 的关键创新在于<strong>同时运行多个不同 \\(n\\) 值的 SH 实例</strong>，称为不同的 \"bracket\"：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th style=\"text-align: center;\">bracket \\(s\\)</th>\n<th style=\"text-align: center;\">初始配置数 \\(n\\)</th>\n<th style=\"text-align: center;\">初始资源 \\(r\\)</th>\n<th style=\"text-align: center;\">淘汰轮数</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td style=\"text-align: center;\">\\(s_{\\max}\\) (激进)</td>\n<td style=\"text-align: center;\">最多</td>\n<td style=\"text-align: center;\">最少</td>\n<td style=\"text-align: center;\">最多轮</td>\n</tr>\n<tr>\n<td style=\"text-align: center;\">...</td>\n<td style=\"text-align: center;\">...</td>\n<td style=\"text-align: center;\">...</td>\n<td style=\"text-align: center;\">...</td>\n</tr>\n<tr>\n<td style=\"text-align: center;\">0 (保守)</td>\n<td style=\"text-align: center;\">最少</td>\n<td style=\"text-align: center;\">\\(R\\)</td>\n<td style=\"text-align: center;\">0 轮（即随机搜索）</td>\n</tr>\n</tbody>\n</table></div>\n<p>以 \\(R=81, \\eta=3\\) 为例（论文 Table 1）：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th style=\"text-align: center;\">\\(s\\)</th>\n<th style=\"text-align: center;\">\\(n\\)</th>\n<th style=\"text-align: center;\">\\(r\\)</th>\n<th style=\"text-align: center;\">淘汰轮数</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td style=\"text-align: center;\">4</td>\n<td style=\"text-align: center;\">81</td>\n<td style=\"text-align: center;\">1</td>\n<td style=\"text-align: center;\">4</td>\n</tr>\n<tr>\n<td style=\"text-align: center;\">3</td>\n<td style=\"text-align: center;\">27</td>\n<td style=\"text-align: center;\">3</td>\n<td style=\"text-align: center;\">3</td>\n</tr>\n<tr>\n<td style=\"text-align: center;\">2</td>\n<td style=\"text-align: center;\">9</td>\n<td style=\"text-align: center;\">9</td>\n<td style=\"text-align: center;\">2</td>\n</tr>\n<tr>\n<td style=\"text-align: center;\">1</td>\n<td style=\"text-align: center;\">6</td>\n<td style=\"text-align: center;\">27</td>\n<td style=\"text-align: center;\">1</td>\n</tr>\n<tr>\n<td style=\"text-align: center;\">0</td>\n<td style=\"text-align: center;\">5</td>\n<td style=\"text-align: center;\">81</td>\n<td style=\"text-align: center;\">0</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"warn-box\">⚠️ 注意：bracket \\(s=0\\) 等价于对 5 个配置各分配完整资源 \\(R=81\\) 的随机搜索，这为 Hyperband 提供了理论下界保证。</div>\n<h5>与传统方法的区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th style=\"text-align: left;\">维度</th>\n<th style=\"text-align: left;\">贝叶斯优化 (BO)</th>\n<th style=\"text-align: left;\">Random Search</th>\n<th style=\"text-align: left;\">Hyperband</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td style=\"text-align: left;\">配置选择</td>\n<td style=\"text-align: left;\">自适应（建模）</td>\n<td style=\"text-align: left;\">随机</td>\n<td style=\"text-align: left;\">随机</td>\n</tr>\n<tr>\n<td style=\"text-align: left;\">资源分配</td>\n<td style=\"text-align: left;\">均匀（完整训练）</td>\n<td style=\"text-align: left;\">均匀（完整训练）</td>\n<td style=\"text-align: left;\">自适应（early-stop）</td>\n</tr>\n<tr>\n<td style=\"text-align: left;\">计算开销</td>\n<td style=\"text-align: left;\">高（GP 拟合）</td>\n<td style=\"text-align: left;\">低</td>\n<td style=\"text-align: left;\">低</td>\n</tr>\n<tr>\n<td style=\"text-align: left;\">理论假设</td>\n<td style=\"text-align: left;\">需要先验/核函数</td>\n<td style=\"text-align: left;\">无</td>\n<td style=\"text-align: left;\">无</td>\n</tr>\n<tr>\n<td style=\"text-align: left;\">加速比</td>\n<td style=\"text-align: left;\">1-10× vs RS</td>\n<td style=\"text-align: left;\">基准</td>\n<td style=\"text-align: left;\">5-70× vs RS</td>\n</tr>\n<tr>\n<td style=\"text-align: left;\">并行性</td>\n<td style=\"text-align: left;\">困难</td>\n<td style=\"text-align: left;\">天然并行</td>\n<td style=\"text-align: left;\">天然并行</td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>核心优势</strong>：\n1. <strong>无模型</strong>：不需要对目标函数做任何假设，避免了贝叶斯优化中先验选择不当导致的性能退化\n2. <strong>理论保证</strong>：最坏情况下不超过随机搜索的常数倍开销\n3. <strong>天然并行</strong>：每个 bracket 内的配置评估完全独立，易于分布式部署\n4. <strong>自适应加速</strong>：当存在大量\"明显差\"的配置时，early-stopping 可节省巨量计算</p>\n<h5>理论性质</h5>\n<p>Hyperband 的理论分析基于以下关键假设：存在一个从中间验证损失到最终损失的映射关系。在此假设下：</p>\n<p>$$\\text{Hyperband 总预算} \\leq 5 \\cdot s_{\\max} \\cdot \\text{Random Search 等效预算}$$</p>\n<p>其中 \\(s_{\\max} = \\lfloor \\log_\\eta R \\rfloor\\)，对于典型设置（\\(R=81, \\eta=3\\)）仅为 4，因此 Hyperband 的额外开销极小。</p>",
      "quiz": {
        "q": "Hyperband 中设置多个 bracket 的主要目的是什么？",
        "options": [
          "减少每个 bracket 的计算开销",
          "对冲 Successive Halving 中初始配置数 n 选择的不确定性",
          "使算法能够利用贝叶斯先验信息",
          "确保每个配置都能获得最大资源 R 的训练"
        ],
        "answer": 1,
        "explain": "不同 bracket 使用不同的 n 值（从激进到保守），覆盖了从'多配置少资源'到'少配置多资源'的所有权衡点，从而无需事先知道最优的 n 值。"
      }
    },
    {
      "id": "nasnet",
      "num": 10,
      "name": "NASNet",
      "fullName": "NAS网络 (Learning Transferable Architectures)",
      "year": "2018",
      "org": "Google Brain",
      "parent": "nas_rl",
      "paperUrl": "https://arxiv.org/abs/1707.07012",
      "projectUrl": "",
      "category": "nas",
      "motivation": "搜索可迁移Cell模块降低成本",
      "summary": "NASNet 提出在小型代理任务（CIFAR-10）上搜索可堆叠的 Cell 结构（Normal Cell + Reduction Cell），并将搜索到的 Cell 直接迁移到大规模 ImageNet 任务上，在将搜索成本降低 7 倍的同时取得了当时 ImageNet 分类和 COCO 检测的最优性能。",
      "keyPoints": [
        "<strong>可迁移搜索空间设计</strong>：搜索目标从\"整个网络架构\"缩减为\"可堆叠的 Cell 模块\"，实现跨数据集迁移",
        "<strong>双 Cell 结构</strong>：Normal Cell（保持空间分辨率）+ Reduction Cell（步长 2，空间减半），交替堆叠构成完整网络",
        "<strong>Block 级搜索空间</strong>：每个 Cell 由 B=5 个 Block 组成，每个 Block 通过 5 步决策（选 2 个隐状态、选 2 个操作、选 1 个合并方式）构建",
        "<strong>13 种候选操作</strong>：包含 identity、各种尺寸的深度可分离卷积、空洞卷积、平均/最大池化等",
        "<strong>RNN 控制器 + PPO 训练</strong>：使用 LSTM 控制器生成架构描述，以验证集准确率为奖励，通过 PPO 优化",
        "<strong>ScheduledDropPath 正则化</strong>：训练过程中线性增加路径丢弃概率，优于固定 DropPath 和标准 Dropout",
        "<strong>搜索效率</strong>：500 GPU × 4 天 ≈ 2000 GPU-hours，比原始 NAS 快 7 倍",
        "<strong>SOTA 结果</strong>：CIFAR-10 2.4% 错误率、ImageNet 82.7% top-1、COCO 43.1% mAP"
      ],
      "detail": "<p><img alt=\"NASNet 整体架构与 Cell 搜索空间\" src=\"https://production-media.paperswithcode.com/methods/nasnet_cell.png\" />\n<em>图：NASNet 的可堆叠 Cell 架构（左）与 Cell 内部搜索空间的 Block 结构（右）。Normal Cell 保持特征图尺寸，Reduction Cell 将空间维度减半。整个网络通过重复堆叠 N 个 Normal Cell 并在适当位置插入 Reduction Cell 构建。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># NASNet 架构搜索流程\n# 控制器: LSTM RNN, 优化器: PPO\n\nfor iteration in range(max_iterations):\n    # Step 1: 控制器采样架构\n    for block_i in range(B):  # B=5 blocks per cell\n        h1 = controller.predict_hidden_state()   # 从已有隐状态中选择\n        h2 = controller.predict_hidden_state()   # 选第二个隐状态\n        op1 = controller.predict_operation()     # 13种候选操作之一\n        op2 = controller.predict_operation()     # 13种候选操作之一\n        combine = controller.predict_combine()   # add 或 concat\n\n    # Step 2: 构建子网络并在 CIFAR-10 上训练\n    child_net = build_network(normal_cell, reduction_cell, N=6, filters=32)\n    accuracy = train_and_evaluate(child_net, cifar10, epochs=50)\n\n    # Step 3: 用验证准确率作为奖励更新控制器\n    reward = accuracy\n    controller.update_with_ppo(reward)\n\n# 最终: 将搜索到的最佳 Cell 迁移到 ImageNet\n# 通过增大 N (堆叠次数) 和初始滤波器数量来扩展模型\nimagenet_model = build_network(best_normal_cell, best_reduction_cell, N=6, filters=4032)\n</code></pre>\n<h5>动机与背景</h5>\n<p>神经架构搜索（NAS）的核心问题是<strong>搜索成本过高</strong>。原始 NAS 直接在目标数据集上搜索完整网络架构，在 CIFAR-10 上需要 22,400 GPU-hours（800 GPU × 28 天），在 ImageNet 上则完全不可行。</p>\n<p>NASNet 的关键洞察是：<strong>优秀的局部结构（Cell）具有跨任务迁移性</strong>。类比人工设计的网络（如 ResNet 的残差块、Inception 的多尺度模块），这些基本构建单元在不同规模的任务上都有效。因此，只需在小数据集上搜索最优 Cell，再通过调整堆叠次数和通道数迁移到大数据集。</p>\n<h5>核心机制：可迁移的 Cell 搜索空间</h5>\n<p><strong>1. 网络宏观结构（固定）</strong></p>\n<p>整个网络的宏观布局是预先确定的：</p>\n<p>$$\\text{Network} = \\underbrace{\\text{NCell} \\times N}_{\\text{第1组}} \\to \\text{RCell} \\to \\underbrace{\\text{NCell} \\times N}_{\\text{第2组}} \\to \\text{RCell} \\to \\underbrace{\\text{NCell} \\times N}_{\\text{第3组}} \\to \\text{Softmax}$$</p>\n<p>其中 NCell 为 Normal Cell，RCell 为 Reduction Cell，\\(N\\) 为每组中 Cell 的重复次数。搜索时 \\(N=6\\)，迁移到 ImageNet 时可增大 \\(N\\) 以提升容量。</p>\n<div class=\"key-point\">💡 关键：宏观结构固定使得搜索空间大幅缩减——控制器只需学习 Cell 内部的微观连接方式。</div>\n<p><strong>2. Cell 内部搜索空间（Block 结构）</strong></p>\n<p>每个 Cell 接收前两层的输出 \\(h_{i-1}\\) 和 \\(h_{i-2}\\) 作为初始隐状态集合。Cell 由 \\(B=5\\) 个 Block 构成，每个 Block 的构建过程如下：</p>\n<ul>\n<li><strong>Step 1</strong>：从现有隐状态集合中选择 \\(h_a\\)</li>\n<li><strong>Step 2</strong>：从现有隐状态集合中选择 \\(h_b\\)</li>\n<li><strong>Step 3</strong>：为 \\(h_a\\) 选择一个操作 \\(o_a\\)</li>\n<li><strong>Step 4</strong>：为 \\(h_b\\) 选择一个操作 \\(o_b\\)</li>\n<li><strong>Step 5</strong>：选择合并方法（element-wise addition 或 concatenation）</li>\n</ul>\n<p>最终输出为：\\(\\text{output} = \\text{combine}(o_a(h_a),\\; o_b(h_b))\\)</p>\n<p>每个 Block 的输出被加入隐状态集合，供后续 Block 选择。Cell 的最终输出是所有<strong>未被任何 Block 选为输入</strong>的隐状态的 concatenation。</p>\n<p><strong>3. 13 种候选操作</strong></p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>类别</th>\n<th>操作</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>恒等</td>\n<td>identity</td>\n</tr>\n<tr>\n<td>卷积</td>\n<td>1×1 conv, 3×3 conv, 1×3 then 3×1 conv, 1×7 then 7×1 conv</td>\n</tr>\n<tr>\n<td>深度可分离卷积</td>\n<td>3×3, 5×5, 7×7 depthwise-separable conv</td>\n</tr>\n<tr>\n<td>空洞卷积</td>\n<td>3×3 dilated conv</td>\n</tr>\n<tr>\n<td>池化</td>\n<td>3×3 avg pool, 3×3 max pool, 5×5 max pool, 7×7 max pool</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"warn-box\">⚠️ 注意：Normal Cell 中所有操作步长为 1；Reduction Cell 中对来自 \\(h_{i-1}\\) 或 \\(h_{i-2}\\) 的输入使用步长 2，实现空间下采样。</div>\n<p><strong>4. 搜索空间规模</strong></p>\n<p>每个 Block 有 5 个离散决策，Cell 有 5 个 Block，搜索 Normal + Reduction 两种 Cell：</p>\n<p>$$|\\mathcal{S}| \\approx (|\\text{hidden states}| \\times |\\text{ops}| \\times |\\text{combine}|)^{2 \\times B} \\sim 10^{28}$$</p>\n<h5>控制器与训练流程</h5>\n<p>控制器是一个<strong>单层 LSTM</strong>，每个时间步输出一个 softmax 分类器来做出一个离散决策。对于两种 Cell（Normal + Reduction），控制器共输出 \\(2 \\times 5 \\times 5 = 50\\) 个决策 token。</p>\n<p>训练采用 <strong>Proximal Policy Optimization (PPO)</strong>，奖励信号为子网络在 CIFAR-10 验证集上的准确率。相比原始 NAS 使用的 REINFORCE，PPO 提供了更稳定的策略更新。</p>\n<p>搜索配置：\n- 代理任务：CIFAR-10，子网络训练 50 epochs\n- 控制器训练：500 个子网络并行评估\n- 硬件：500 P100 GPU，4 天完成搜索\n- 总计算量：~2000 GPU-hours（原始 NAS 的 1/7）</p>\n<h5>ScheduledDropPath 正则化</h5>\n<p>NASNet 发现标准的 Dropout 对 Cell 结构效果有限，提出了 <strong>ScheduledDropPath</strong>：</p>\n<p>$$p_{\\text{drop}}^{(t)} = p_{\\max} \\cdot \\frac{t}{T}$$</p>\n<p>其中 \\(t\\) 为当前训练步，\\(T\\) 为总训练步数，\\(p_{\\max}\\) 为最终丢弃概率。训练初期路径丢弃概率接近 0（允许充分学习），后期逐渐增大（增强正则化）。</p>\n<p>对比实验表明：\n- 无 DropPath：3.03% 错误率\n- 固定 DropPath（\\(p=0.6\\)）：2.97%\n- <strong>ScheduledDropPath</strong>（\\(p_{\\max}=0.6\\)）：<strong>2.40%</strong></p>\n<div class=\"key-point\">💡 关键：ScheduledDropPath 的设计直觉是——训练初期网络需要所有路径来学习有效表示，后期逐步丢弃路径迫使网络学习更鲁棒的特征。</div>\n<h5>实验结果与对比</h5>\n<p><strong>CIFAR-10</strong>：NASNet-A + cutout 达到 2.40% 错误率（3.3M 参数），超越所有手工设计架构和同期 NAS 方法。</p>\n<p><strong>ImageNet 分类</strong>（单模型，单裁剪）：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>模型</th>\n<th>分辨率</th>\n<th>参数量</th>\n<th>Mult-Adds</th>\n<th>Top-1</th>\n<th>Top-5</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Inception-ResNet-v2</td>\n<td>299×299</td>\n<td>55.8M</td>\n<td>13.2B</td>\n<td>80.1%</td>\n<td>95.1%</td>\n</tr>\n<tr>\n<td>NASNet-A (7@1920)</td>\n<td>299×299</td>\n<td>22.6M</td>\n<td>4.93B</td>\n<td>80.8%</td>\n<td>95.3%</td>\n</tr>\n<tr>\n<td>SENet</td>\n<td>320×320</td>\n<td>145.8M</td>\n<td>42.3B</td>\n<td>82.7%</td>\n<td>96.2%</td>\n</tr>\n<tr>\n<td><strong>NASNet-A (6@4032)</strong></td>\n<td><strong>331×331</strong></td>\n<td><strong>88.9M</strong></td>\n<td><strong>23.8B</strong></td>\n<td><strong>82.7%</strong></td>\n<td><strong>96.2%</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p>NASNet-A 在达到相同 82.7% top-1 的同时，计算量仅为 SENet 的 56%（23.8B vs 42.3B）。</p>\n<p><strong>移动端</strong>：NASNet-A (4@1056) 以 5.3M 参数、564M Mult-Adds 达到 74.0% top-1，超越 MobileNet (70.6%) 和 ShuffleNet (70.9%)。</p>\n<p><strong>COCO 目标检测</strong>：以 NASNet-A 作为 Faster-RCNN 的 backbone，在 test-dev 上达到 43.1% mAP，超越此前最佳 4.0%。</p>\n<h5>与传统方法的区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th>原始 NAS (2017)</th>\n<th>NASNet (2018)</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>搜索目标</td>\n<td>完整网络架构</td>\n<td>可堆叠的 Cell 模块</td>\n</tr>\n<tr>\n<td>搜索数据集</td>\n<td>目标数据集本身</td>\n<td>小型代理数据集 (CIFAR-10)</td>\n</tr>\n<tr>\n<td>可迁移性</td>\n<td>无（每个任务重新搜索）</td>\n<td>强（Cell 直接迁移到 ImageNet）</td>\n</tr>\n<tr>\n<td>搜索成本</td>\n<td>22,400 GPU-hours</td>\n<td>2,000 GPU-hours（7× 加速）</td>\n</tr>\n<tr>\n<td>可扩展性</td>\n<td>固定网络大小</td>\n<td>通过 N 和滤波器数灵活缩放</td>\n</tr>\n<tr>\n<td>优化算法</td>\n<td>REINFORCE</td>\n<td>PPO（更稳定）</td>\n</tr>\n</tbody>\n</table></div>\n<p>NASNet 的核心贡献不仅是找到了更好的架构，更重要的是建立了 <strong>\"搜索 Cell → 堆叠迁移\"</strong> 的范式，这一思想被后续的 ENAS、DARTS、ProxylessNAS 等工作广泛采用。</p>",
      "quiz": {
        "q": "NASNet 相比原始 NAS 能将搜索成本降低 7 倍的最关键设计是什么？",
        "options": [
          "使用 PPO 替代 REINFORCE 作为控制器优化算法",
          "将搜索目标从完整网络缩减为可迁移的 Cell 模块，在小数据集上搜索后迁移",
          "将候选操作从 20 种减少到 13 种",
          "使用 ScheduledDropPath 加速子网络训练收敛"
        ],
        "answer": 1,
        "explain": "NASNet 的核心加速来自搜索空间的重新设计：只搜索 Cell 结构而非完整网络，并在小型 CIFAR-10 上完成搜索后迁移到 ImageNet，避免了在大数据集上的昂贵搜索。"
      }
    },
    {
      "id": "enas",
      "num": 11,
      "name": "ENAS",
      "fullName": "高效神经架构搜索 (Efficient NAS via Parameter Sharing)",
      "year": "2018",
      "org": "Google Brain",
      "parent": "nas_rl",
      "paperUrl": "https://arxiv.org/abs/1802.03268",
      "projectUrl": "",
      "category": "nas",
      "motivation": "权重共享将搜索成本降低1000倍",
      "summary": "ENAS 提出让所有候选子模型在一个共享的超网络（over-parameterized DAG）中共享权重，通过 LSTM 控制器采样子图并用 REINFORCE 优化架构分布，将神经架构搜索的计算成本从数百 GPU-days 降低到单 GPU 不到 16 小时，同时保持与 NAS 相当的搜索质量。",
      "keyPoints": [
        "<strong>权重共享超网络</strong>：将整个搜索空间表示为一个有向无环图（DAG），所有子架构是该 DAG 的子图，共享对应边上的权重参数",
        "<strong>LSTM 控制器</strong>：100 隐藏单元的 LSTM，通过 softmax 分类器自回归地采样架构决策（激活函数、连接关系、操作类型）",
        "<strong>两阶段交替训练</strong>：(1) 固定控制器参数 \\(\\theta\\)，用标准 SGD 在训练集上更新共享权重 \\(\\omega\\)；(2) 固定 \\(\\omega\\)，用 REINFORCE 在验证集上更新 \\(\\theta\\)",
        "<strong>三种搜索空间</strong>：RNN cell 设计、CNN 宏观层级搜索（macro search）、CNN 微观 cell 搜索（micro search）",
        "<strong>实验结果</strong>：PTB 语言模型 test perplexity 55.8；CIFAR-10 test error 2.89%；搜索耗时单 GPU &lt; 16 小时（比 NAS 快 1000×）",
        "<strong>搜索空间规模</strong>：RNN cell 空间 \\(\\sim 10^{15}\\) 种架构，CNN macro 空间 \\(\\sim 1.6 \\times 10^{29}\\) 种架构"
      ],
      "detail": "<h5>核心思想：参数共享的搜索空间</h5>\n<p><img alt=\"ENAS 搜索空间示意图\" src=\"https://ar5iv.labs.arxiv.org/html/1802.03268/assets/x1.png\" />\n<em>图：左侧为完整的共享参数 DAG，右侧的红色子图为控制器采样出的一个子架构。所有子架构共享 DAG 中对应边的权重。</em></p>\n<p>ENAS 的核心洞察是：NAS 中不同子模型之间存在大量参数重叠，传统 NAS 每次从头训练子模型造成了巨大浪费。ENAS 将整个搜索空间编码为一个<strong>超网络（supergraph）</strong>——一个包含所有可能连接的有向无环图。每个子架构对应该 DAG 的一个子图，其权重直接从超网络中继承，无需重新训练。</p>\n<div class=\"key-point\">💡 关键：权重共享使得评估一个子架构的代价从\"训练至收敛\"降低到\"单次前向传播 + 验证集评估\"。</div>\n<h5>控制器设计与采样过程</h5>\n<p>控制器是一个带有 100 个隐藏单元的 LSTM。对于不同的搜索空间，控制器的采样策略不同：</p>\n<p><strong>RNN Cell 搜索</strong>：给定 \\(N\\) 个计算节点，控制器依次为节点 \\(j\\)（\\(j = 2, \\ldots, N\\)）做两个决策：\n1. 选择前驱节点索引 \\(i < j\\)（决定信息来源）\n2. 选择激活函数（tanh, ReLU, sigmoid, identity）</p>\n<p><strong>CNN Macro 搜索</strong>：对于第 \\(l\\) 层，控制器决定：\n1. 使用哪种卷积操作（3×3, 5×5, depthwise-separable 等）\n2. 与哪些之前的层建立跳跃连接（逐层二分类决策）</p>\n<p><strong>CNN Micro/Cell 搜索</strong>：对于 cell 内的每个节点 \\(j\\)，控制器采样：\n1. 两个输入节点索引\n2. 对应两个输入的操作类型（identity, 3×3/5×5 separable conv, 3×3 avg/max pool）</p>\n<pre><code class=\"language-python\"># ENAS 控制器采样伪代码 (RNN Cell)\ndef sample_rnn_cell(controller_lstm, N_nodes):\n    &quot;&quot;&quot;采样一个 RNN cell 架构&quot;&quot;&quot;\n    decisions = []\n    h = initial_hidden_state\n\n    for node_j in range(2, N_nodes + 1):\n        # 决策1: 选择前驱节点\n        h, logit_prev = controller_lstm(h)\n        prev_node = softmax_sample(logit_prev[:node_j])  # 只能选 &lt; j 的节点\n\n        # 决策2: 选择激活函数\n        h, logit_act = controller_lstm(h)\n        activation = softmax_sample(logit_act)  # {tanh, relu, sigmoid, identity}\n\n        decisions.append((prev_node, activation))\n\n    return decisions  # 定义了完整的 cell 拓扑\n</code></pre>\n<h5>训练流程</h5>\n<p>ENAS 采用<strong>两阶段交替优化</strong>：</p>\n<p><strong>阶段一：训练共享权重 \\(\\omega\\)</strong></p>\n<p>固定控制器参数 \\(\\theta\\)，在整个训练集上用 SGD 优化：</p>\n<p>$$\\omega^* = \\arg\\min_\\omega \\mathbb{E}_{m \\sim \\pi(m;\\theta)} \\left[ \\mathcal{L}(m; \\omega) \\right]$$</p>\n<p>实际操作中，采用蒙特卡洛近似：采样一个架构 \\(m\\)，计算其在一个 mini-batch 上的梯度 \\(\\nabla_\\omega \\mathcal{L}(m; \\omega)\\)，然后更新 \\(\\omega\\)。</p>\n<p><strong>阶段二：训练控制器 \\(\\theta\\)</strong></p>\n<p>固定共享权重 \\(\\omega\\)，在验证集上用 REINFORCE 优化控制器：</p>\n<p>$$\\nabla_\\theta J(\\theta) = \\mathbb{E}_{m \\sim \\pi(m;\\theta)} \\left[ \\nabla_\\theta \\log P(m;\\theta) \\cdot (R(m) - b) \\right]$$</p>\n<p>其中：\n- \\(R(m)\\) 是架构 \\(m\\) 在验证集上的奖励（如 perplexity 的倒数或准确率）\n- \\(b\\) 是基线（baseline），使用之前奖励的指数移动平均</p>\n<div class=\"warn-box\">⚠️ 注意：两阶段使用<strong>不同的数据集</strong>——共享权重在训练集上优化，控制器在验证集上优化。这避免了控制器过拟合训练集。</div>\n<h5>与 NAS 的核心区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th>NAS (Zoph &amp; Le, 2017)</th>\n<th>ENAS</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>子模型训练</td>\n<td>每个从头训练至收敛</td>\n<td>共享权重，无需重新训练</td>\n</tr>\n<tr>\n<td>评估代价</td>\n<td>数小时/模型</td>\n<td>单次前向传播</td>\n</tr>\n<tr>\n<td>总搜索时间</td>\n<td>450 GPU-days (800 GPUs)</td>\n<td>&lt; 16 hours (1 GPU)</td>\n</tr>\n<tr>\n<td>控制器优化</td>\n<td>REINFORCE</td>\n<td>REINFORCE（相同）</td>\n</tr>\n<tr>\n<td>搜索质量</td>\n<td>PTB ppl: 62.4</td>\n<td>PTB ppl: 55.8</td>\n</tr>\n</tbody>\n</table></div>\n<p>ENAS 的关键创新在于<strong>将\"训练子模型\"这一瓶颈完全消除</strong>。NAS 中控制器每采样一个架构就需要花费数小时训练该模型以获得奖励信号；而 ENAS 中，由于权重已在超网络中预训练好，评估只需一次前向传播即可得到验证集性能。</p>\n<h5>搜索完成后的处理</h5>\n<p>搜索结束后，ENAS 从控制器中采样多个架构，选择验证集上表现最好的一个，然后<strong>从头开始训练</strong>该架构（不使用共享权重）。这是因为共享权重虽然足以区分好坏架构，但并非每个子模型的最优权重。</p>",
      "quiz": {
        "q": "ENAS 相比原始 NAS 实现 1000 倍加速的核心机制是什么？",
        "options": [
          "使用更高效的强化学习算法替代 REINFORCE",
          "强制所有候选子模型共享参数，避免从头训练每个子模型",
          "缩小搜索空间，减少候选架构数量",
          "使用知识蒸馏加速子模型训练"
        ],
        "answer": 1,
        "explain": "ENAS 的核心贡献是参数共享——所有子架构共享超网络中的权重，评估子模型只需一次前向传播而非从头训练至收敛，从而将搜索成本降低约 1000 倍。"
      }
    },
    {
      "id": "bohb",
      "num": 12,
      "name": "BOHB",
      "fullName": "贝叶斯优化与超级带 (BOHB: Robust and Efficient HPO)",
      "year": "2018",
      "org": "University of Freiburg",
      "parent": "tpe",
      "paperUrl": "https://arxiv.org/abs/1807.01774",
      "projectUrl": "",
      "category": "hpo",
      "motivation": "融合TPE引导与Hyperband加速",
      "summary": "BOHB 将基于核密度估计（KDE）的贝叶斯优化嵌入 Hyperband 框架，用模型引导的采样替代随机采样来选择超参数配置，同时保留了 Hyperband 的早停加速能力和强大的任意时刻性能（anytime performance），在多种任务上实现了比单独使用 BO 或 Hyperband 更优的超参数优化效率。",
      "keyPoints": [
        "将 Hyperband 中的随机采样替换为基于 KDE 的模型引导采样，结合 BO 的样本效率与 HB 的早停加速",
        "使用多维核密度估计器（multivariate KDE）构建代理模型，而非 TPE 中的独立一维 KDE",
        "采用 TPE 风格的双密度模型：\\(l(\\mathbf{x})\\) 建模好配置，\\(g(\\mathbf{x})\\) 建模差配置，通过最大化 \\(l(\\mathbf{x})/g(\\mathbf{x})\\) 采样",
        "核带宽通过 leave-one-out 交叉验证的似然最大化自动选择，而非 Scott's rule",
        "设定最小观测数阈值 \\(N_{\\min} + D + 1\\)（D 为维度），不足时退化为随机采样",
        "天然支持并行化：Hyperband 的 successive halving 结构允许多个 worker 同时评估不同配置",
        "在 6 类基准任务（toy function、SVM、前馈网络、贝叶斯神经网络、深度强化学习、CNN）上全面验证"
      ],
      "detail": "<p><img alt=\"BOHB 框架示意图\" src=\"https://ar5iv.labs.arxiv.org/html/1807.01774v1/assets/x2.png\" />\n<em>图：BOHB 将贝叶斯优化的模型引导采样与 Hyperband 的 successive halving 早停机制相结合</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># BOHB 核心流程伪代码\ndef BOHB(eta, s_max, budgets, N_min, q):\n    &quot;&quot;&quot;\n    eta: 缩减比例(通常=3)\n    s_max: 最大successive halving轮数\n    budgets: [b_min, ..., b_max]\n    N_min: 构建模型所需最小观测数\n    q: 好配置比例分位数(默认15%)\n    &quot;&quot;&quot;\n    D = {}  # 存储所有(配置, 预算, 损失)观测\n\n    # 外层循环: 按Hyperband调度\n    for iteration in range(max_iterations):\n        for s in range(s_max, -1, -1):  # Hyperband的bracket\n            n = initial_configs_count(s, eta)\n            budget = budgets[0] * eta^(s_max - s)\n\n            # 采样n个配置\n            configs = []\n            for i in range(n):\n                obs = get_observations(D, budget=budget)\n\n                if len(obs) &lt; N_min + D_dims + 1:\n                    config = sample_random()       # 观测不足，随机采样\n                else:\n                    # 用KDE模型引导采样\n                    sorted_obs = sort_by_loss(obs)\n                    n_good = max(N_min, int(q * len(obs)))\n                    good_configs = sorted_obs[:n_good]\n                    bad_configs = sorted_obs[n_good:]\n\n                    l = fit_KDE(good_configs, bandwidth='LOO-CV')\n                    g = fit_KDE(bad_configs, bandwidth='LOO-CV')\n\n                    candidates = sample_from(l, num=64)\n                    config = argmax(l(x)/g(x) for x in candidates)\n\n                configs.append(config)\n\n            # Successive Halving\n            for rung in range(s + 1):\n                results = evaluate(configs, budget)\n                D.update(results)\n                budget *= eta\n                configs = top_k(configs, results, k=len(configs) // eta)\n\n    return best_config(D)\n</code></pre>\n<h5>动机与背景</h5>\n<p>超参数优化（HPO）是机器学习流水线中的关键环节。传统方法面临两大挑战：</p>\n<ol>\n<li><strong>样本效率低</strong>：随机搜索和 Hyperband 不利用历史评估信息来指导后续采样，在高维空间中收敛缓慢</li>\n<li><strong>评估代价高</strong>：标准贝叶斯优化（如 GP-BO）虽然样本高效，但每次都需要完整训练模型到收敛，计算开销巨大</li>\n<li><strong>扩展性差</strong>：GP-BO 的高斯过程在高维、混合类型（连续+离散）配置空间中表现不佳，且难以并行化</li>\n</ol>\n<p>Hyperband 通过 successive halving 实现了早停加速——用少量预算快速淘汰差配置，但其配置采样完全随机。TPE 等方法虽然用模型引导采样，但不支持多保真度（multi-fidelity）评估。BOHB 的核心动机就是<strong>将两者的优势结合</strong>：用模型引导替代随机采样，同时保留 Hyperband 的早停加速。</p>\n<h5>核心机制：基于 KDE 的模型引导采样</h5>\n<p>BOHB 的代理模型采用 TPE 风格的双密度估计框架，但做了关键改进：</p>\n<p><strong>1. 多维 KDE 替代独立一维 KDE</strong></p>\n<p>TPE 对每个超参数维度独立建模，忽略了维度间的交互。BOHB 使用多维核密度估计器：</p>\n<p>$$l(\\mathbf{x}) = \\frac{1}{|\\mathcal{D}_l|} \\sum_{\\mathbf{x}' \\in \\mathcal{D}_l} \\kappa(\\mathbf{x}, \\mathbf{x}')$$</p>\n<p>$$g(\\mathbf{x}) = \\frac{1}{|\\mathcal{D}_g|} \\sum_{\\mathbf{x}' \\in \\mathcal{D}_g} \\kappa(\\mathbf{x}, \\mathbf{x}')$$</p>\n<p>其中 \\(\\kappa\\) 是多维核函数，\\(\\mathcal{D}_l\\) 和 \\(\\mathcal{D}_g\\) 分别是好配置集和差配置集。</p>\n<div class=\"key-point\">💡 关键：多维 KDE 能捕获超参数之间的相关性，例如学习率与 batch size 的交互效应。</div>\n<p><strong>2. 带宽选择：Leave-One-Out 交叉验证</strong></p>\n<p>核带宽 \\(b_w\\) 是 KDE 的关键超参数。TPE 使用 Scott's rule 等启发式规则，而 BOHB 通过最大化 leave-one-out 对数似然来选择最优带宽：</p>\n<p>$$b_w^* = \\arg\\max_{b_w} \\sum_{i=1}^{N} \\log \\hat{p}_{-i}(\\mathbf{x}_i | b_w)$$</p>\n<p>其中 \\(\\hat{p}_{-i}\\) 是去掉第 \\(i\\) 个样本后的 KDE 估计。这确保了带宽能自适应地根据数据密度调整。</p>\n<p><strong>3. 分位数划分与最小样本保护</strong></p>\n<p>观测按损失值排序后，取 top \\(N_b' = \\max(N_{\\min}, q \\cdot |\\mathcal{D}_b|)\\) 个作为好配置集（\\(q\\) 默认为 15%），其余为差配置集。设定 \\(N_{\\min} + D + 1\\) 的最小观测阈值，确保 KDE 在低样本时不会产生退化估计。</p>\n<p><strong>4. 采样策略</strong></p>\n<p>从 \\(l(\\mathbf{x})\\) 中抽取候选样本，然后选择使 \\(l(\\mathbf{x})/g(\\mathbf{x})\\) 最大的配置。这等价于最大化 Expected Improvement 的近似：</p>\n<p>$$\\text{EI}(\\mathbf{x}) \\propto \\frac{l(\\mathbf{x})}{g(\\mathbf{x})}$$</p>\n<div class=\"warn-box\">⚠️ 注意：为保持探索性，BOHB 还会以一定比例混入随机样本，防止模型过早收敛到局部最优。</div>\n<h5>训练流程与 Hyperband 集成</h5>\n<p>BOHB 的调度完全遵循 Hyperband 的 bracket 结构：</p>\n<ol>\n<li><strong>Bracket 选择</strong>：按 Hyperband 的规则循环选择不同的 bracket（从激进早停到保守评估）</li>\n<li><strong>配置采样</strong>：在每个 bracket 的初始阶段，用 KDE 模型（而非随机）采样初始配置</li>\n<li><strong>Successive Halving</strong>：按 \\(\\eta=3\\) 的比例逐轮淘汰表现差的配置，幸存者获得更多预算</li>\n<li><strong>模型更新</strong>：每次评估完成后，将 (配置, 预算, 损失) 三元组加入观测集，供后续模型构建使用</li>\n</ol>\n<p>关键设计：<strong>模型按预算分组构建</strong>。即对于预算 \\(b\\) 的采样，只使用在预算 \\(b\\) 下评估过的历史观测来构建 KDE。这避免了跨预算的噪声干扰，因为低预算下的排名可能与高预算不一致。</p>\n<h5>并行化设计</h5>\n<p>BOHB 天然支持并行：\n- 多个 worker 可以同时运行不同 bracket 的不同配置\n- 当一个 worker 空闲时，它从当前最需要评估的 bracket 中取出下一个待评估配置\n- 实验表明，2-4 个 worker 时加速接近线性，32 个 worker 时加速约 15 倍</p>\n<h5>与现有方法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>模型引导</th>\n<th>早停加速</th>\n<th>高维支持</th>\n<th>并行化</th>\n<th>混合空间</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Random Search</td>\n<td>✗</td>\n<td>✗</td>\n<td>✓</td>\n<td>✓</td>\n<td>✓</td>\n</tr>\n<tr>\n<td>GP-BO</td>\n<td>✓</td>\n<td>✗</td>\n<td>✗</td>\n<td>困难</td>\n<td>✗</td>\n</tr>\n<tr>\n<td>TPE</td>\n<td>✓</td>\n<td>✗</td>\n<td>✓</td>\n<td>✓</td>\n<td>✓</td>\n</tr>\n<tr>\n<td>Hyperband</td>\n<td>✗</td>\n<td>✓</td>\n<td>✓</td>\n<td>✓</td>\n<td>✓</td>\n</tr>\n<tr>\n<td>SMAC</td>\n<td>✓</td>\n<td>✗</td>\n<td>✓</td>\n<td>✓</td>\n<td>✓</td>\n</tr>\n<tr>\n<td>Fabolas</td>\n<td>✓</td>\n<td>✓(连续)</td>\n<td>✗</td>\n<td>困难</td>\n<td>✗</td>\n</tr>\n<tr>\n<td><strong>BOHB</strong></td>\n<td><strong>✓</strong></td>\n<td><strong>✓</strong></td>\n<td><strong>✓</strong></td>\n<td><strong>✓</strong></td>\n<td><strong>✓</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p>BOHB 是唯一同时具备模型引导、早停加速、高维支持、并行化和混合空间处理能力的方法。</p>\n<h5>实验验证</h5>\n<p>在 6 类基准任务上的实验表明：\n- <strong>早期阶段</strong>：BOHB 与 Hyperband 表现相当（因为观测不足时退化为随机采样）\n- <strong>中后期</strong>：BOHB 显著优于 Hyperband，因为模型引导开始发挥作用\n- <strong>最终性能</strong>：BOHB 达到与最佳 BO 方法相当甚至更优的最终结果，但速度快数倍到数十倍\n- <strong>鲁棒性</strong>：在所有测试的 6 类任务中，BOHB 从未表现最差，是最鲁棒的方法</p>",
      "quiz": {
        "q": "BOHB 相比 TPE 在代理模型构建上的关键改进是什么？",
        "options": [
          "使用高斯过程替代核密度估计",
          "使用多维联合KDE替代独立一维KDE，并用LOO-CV选择带宽",
          "使用随机森林作为代理模型",
          "使用神经网络拟合超参数响应曲面"
        ],
        "answer": 1,
        "explain": "BOHB使用多维KDE捕获超参数间交互，并通过leave-one-out交叉验证自动选择最优核带宽，而非TPE的独立一维建模和启发式带宽规则。"
      }
    },
    {
      "id": "darts",
      "num": 13,
      "name": "DARTS",
      "fullName": "可微分架构搜索 (Differentiable Architecture Search)",
      "year": "2019",
      "org": "CMU",
      "parent": "enas",
      "paperUrl": "https://arxiv.org/abs/1806.09055",
      "projectUrl": "",
      "category": "nas",
      "motivation": "连续松弛化实现梯度搜索",
      "summary": "DARTS 的核心目标是：连续松弛化实现梯度搜索。",
      "keyPoints": [
        "核心动机：连续松弛化实现梯度搜索",
        "演化来源：继承或改进自 enas",
        "代表机构：CMU"
      ],
      "detail": "<p>连续松弛化实现梯度搜索</p>"
    },
    {
      "id": "efficientnet",
      "num": 14,
      "name": "EfficientNet",
      "fullName": "高效网络 (EfficientNet: Rethinking Model Scaling)",
      "year": "2019",
      "org": "Google Brain",
      "parent": "nasnet",
      "paperUrl": "https://arxiv.org/abs/1905.11946",
      "projectUrl": "",
      "category": "nas",
      "motivation": "NAS搜索基线+复合缩放法则",
      "summary": "EfficientNet 提出了一种复合缩放方法（Compound Scaling），通过统一缩放网络深度、宽度和输入分辨率三个维度，结合神经架构搜索（NAS）获得的高效基线网络 EfficientNet-B0，系统性地构建了 B0-B7 系列模型，在 ImageNet 上以 8.4 倍更少的参数超越了当时最优模型。",
      "keyPoints": [
        "提出复合缩放法则：用统一的复合系数 \\(\\phi\\) 同时缩放深度、宽度和分辨率，约束条件为 \\(\\alpha \\cdot \\beta^2 \\cdot \\gamma^2 \\approx 2\\)",
        "基线网络 EfficientNet-B0 通过多目标 NAS（优化 ACC(m) × [FLOPS(m)/T]^w）搜索得到，以 MBConv（Mobile Inverted Bottleneck）为核心构建块",
        "缩放系数通过小规模网格搜索确定：\\(\\alpha=1.2, \\beta=1.1, \\gamma=1.15\\)",
        "系列模型 B1-B7 通过逐步增大 \\(\\phi\\) 从 B0 缩放得到",
        "在 ImageNet 上，EfficientNet-B7 达到 84.3% top-1 准确率，参数量仅 66M（比 GPipe 小 8.4 倍，推理快 6.1 倍）",
        "迁移学习在 CIFAR-100、Flowers、Cars 等 5 个数据集上均达到 SOTA"
      ],
      "detail": "<p><img alt=\"EfficientNet 复合缩放示意图\" src=\"https://production-media.paperswithcode.com/methods/compound_702x0Pu.png\" />\n<em>图：模型缩放方法对比。(a) 基线网络；(b) 仅增加宽度；(c) 仅增加深度；(d) 仅增加分辨率；(e) 复合缩放同时增加三个维度（本文方法）</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># EfficientNet 复合缩放算法\n# Step 1: 固定 φ=1，网格搜索最优 α, β, γ\nbest_acc = 0\nfor alpha in [1.0, 1.1, 1.2, ...]:\n    for beta in [1.0, 1.05, 1.1, ...]:\n        for gamma in [1.0, 1.05, 1.1, ...]:\n            if alpha * beta**2 * gamma**2 ≈ 2:\n                # 在 B0 基础上缩放并评估\n                model = scale(B0, depth=alpha, width=beta, resolution=gamma)\n                acc = evaluate(model, ImageNet)\n                if acc &gt; best_acc:\n                    best_alpha, best_beta, best_gamma = alpha, beta, gamma\n# 结果: α=1.2, β=1.1, γ=1.15\n\n# Step 2: 固定 α, β, γ，用不同 φ 缩放得到 B1-B7\nfor phi in [1, 2, 3, 3.5, 4, 5, 6.5]:  # 对应 B1-B7\n    depth = best_alpha ** phi      # 网络层数倍数\n    width = best_beta ** phi       # 通道数倍数\n    resolution = best_gamma ** phi # 输入分辨率倍数\n    EfficientNet_B{phi} = scale(B0, depth, width, resolution)\n</code></pre>\n<h5>动机与背景</h5>\n<p>卷积神经网络的性能提升通常依赖于模型缩放——增加网络深度（如 ResNet-18 → ResNet-200）、增加通道宽度（如 WideResNet）或提高输入分辨率。然而，传统方法只调节单一维度，且缺乏理论指导，往往需要大量人工调参。</p>\n<p>作者通过系统实验发现：<strong>单独缩放任何一个维度都会迅速饱和</strong>。例如，仅增加深度时，由于梯度消失问题，非常深的网络难以训练；仅增加宽度时，宽而浅的网络难以捕获高层特征。关键洞察是：<strong>三个维度之间存在协同关系</strong>——更高分辨率的图像需要更深的网络来捕获更大感受野中的精细模式，同时也需要更宽的网络来捕获更多细粒度特征。</p>\n<h5>核心机制：复合缩放法则</h5>\n<p>EfficientNet 的核心创新是将模型缩放形式化为一个约束优化问题。给定基线网络 \\(\\mathcal{N}\\)，目标是找到最优的缩放系数以最大化模型精度：</p>\n<p>$$\\max_{d, w, r} \\quad \\text{Accuracy}(\\mathcal{N}(d, w, r))$$\n$$\\text{s.t.} \\quad \\mathcal{N}(d, w, r) = \\bigodot_{i=1,...,s} \\hat{F}_i^{d \\cdot \\hat{L}_i}(X_{\\langle r \\cdot \\hat{H}_i, r \\cdot \\hat{W}_i, w \\cdot \\hat{C}_i \\rangle})$$\n$$\\text{Memory}(\\mathcal{N}) \\leq \\text{target\\_memory}$$\n$$\\text{FLOPS}(\\mathcal{N}) \\leq \\text{target\\_flops}$$</p>\n<p>其中 \\(d, w, r\\) 分别为深度、宽度和分辨率的缩放系数。作者提出用单一复合系数 \\(\\phi\\) 统一控制三个维度：</p>\n<p>$$d = \\alpha^\\phi, \\quad w = \\beta^\\phi, \\quad r = \\gamma^\\phi$$</p>\n<p>约束条件为：</p>\n<p>$$\\alpha \\cdot \\beta^2 \\cdot \\gamma^2 \\approx 2$$</p>\n<div class=\"key-point\">💡 <strong>关键直觉</strong>：FLOPS 与 \\(d, w^2, r^2\\) 成正比（深度线性增加计算量，宽度和分辨率各自平方增加计算量），因此约束 \\(\\alpha \\cdot \\beta^2 \\cdot \\gamma^2 \\approx 2\\) 意味着每增加 \\(\\phi\\) 一个单位，总 FLOPS 大约翻倍（增加 \\(2^\\phi\\) 倍）。这使得资源分配可控且可预测。</div>\n<h5>EfficientNet-B0 基线架构</h5>\n<p>B0 通过多目标 NAS 搜索得到，优化目标同时考虑准确率和 FLOPS。其架构以 Mobile Inverted Bottleneck Convolution（MBConv）为核心，并集成了 Squeeze-and-Excitation（SE）模块：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>Stage</th>\n<th>Operator</th>\n<th>Resolution</th>\n<th>Channels</th>\n<th>Layers</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>1</td>\n<td>Conv3×3</td>\n<td>224×224</td>\n<td>32</td>\n<td>1</td>\n</tr>\n<tr>\n<td>2</td>\n<td>MBConv1, k3×3</td>\n<td>112×112</td>\n<td>16</td>\n<td>1</td>\n</tr>\n<tr>\n<td>3</td>\n<td>MBConv6, k3×3</td>\n<td>112×112</td>\n<td>24</td>\n<td>2</td>\n</tr>\n<tr>\n<td>4</td>\n<td>MBConv6, k5×5</td>\n<td>56×56</td>\n<td>40</td>\n<td>2</td>\n</tr>\n<tr>\n<td>5</td>\n<td>MBConv6, k3×3</td>\n<td>28×28</td>\n<td>80</td>\n<td>3</td>\n</tr>\n<tr>\n<td>6</td>\n<td>MBConv6, k5×5</td>\n<td>14×14</td>\n<td>112</td>\n<td>3</td>\n</tr>\n<tr>\n<td>7</td>\n<td>MBConv6, k5×5</td>\n<td>14×14</td>\n<td>192</td>\n<td>4</td>\n</tr>\n<tr>\n<td>8</td>\n<td>MBConv6, k3×3</td>\n<td>7×7</td>\n<td>320</td>\n<td>1</td>\n</tr>\n<tr>\n<td>9</td>\n<td>Conv1×1 &amp; Pooling &amp; FC</td>\n<td>7×7</td>\n<td>1280</td>\n<td>1</td>\n</tr>\n</tbody>\n</table></div>\n<p>其中 MBConv6 表示扩展比为 6 的 Mobile Inverted Bottleneck，k 表示卷积核大小。每个 MBConv 块包含：depthwise separable convolution + SE attention + skip connection。</p>\n<h5>与传统方法的区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>缩放策略</th>\n<th>缺陷</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>ResNet 系列</td>\n<td>仅增加深度</td>\n<td>深度过大时梯度消失，精度饱和</td>\n</tr>\n<tr>\n<td>WideResNet</td>\n<td>仅增加宽度</td>\n<td>宽而浅的网络难以捕获高层语义</td>\n</tr>\n<tr>\n<td>高分辨率输入</td>\n<td>仅增加分辨率</td>\n<td>感受野不足，精度增益递减</td>\n</tr>\n<tr>\n<td><strong>EfficientNet</strong></td>\n<td><strong>复合缩放三维度</strong></td>\n<td><strong>平衡分配资源，精度持续提升</strong></td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：复合缩放的有效性并不局限于 EfficientNet 架构本身。作者在 MobileNet 和 ResNet 上验证了复合缩放同样能带来显著提升（如 ResNet-50 在复合缩放后 top-1 提升 0.7%，超过单独缩放深度或宽度的效果）。</div>\n<h5>实验结果</h5>\n<p>在 ImageNet 上的关键结果：\n- EfficientNet-B0：77.1% top-1，5.3M 参数\n- EfficientNet-B3：81.6% top-1，12M 参数（与 ResNet-152 精度相当，参数少 5 倍）\n- EfficientNet-B7：84.3% top-1，66M 参数（超越 GPipe 的 84.3%，但参数少 8.4 倍）</p>",
      "quiz": {
        "q": "EfficientNet 复合缩放法则中，约束条件 α·β²·γ²≈2 的设计目的是什么？",
        "options": [
          "确保模型参数量恒定不变",
          "使每增加一个单位的复合系数 φ，总 FLOPS 大约翻倍",
          "保证网络深度始终大于宽度",
          "限制输入分辨率不超过 600×600"
        ],
        "answer": 1,
        "explain": "由于 FLOPS 与 d·w²·r² 成正比，约束 α·β²·γ²≈2 确保 φ 每增加 1，FLOPS 增加约 2^φ 倍，使计算资源分配可控。"
      }
    },
    {
      "id": "optuna",
      "num": 15,
      "name": "Optuna",
      "fullName": "Optuna超参优化框架 (Optuna: Next-generation HPO Framework)",
      "year": "2019",
      "org": "Preferred Networks",
      "parent": "tpe",
      "paperUrl": "https://arxiv.org/abs/1907.10902",
      "projectUrl": "",
      "category": "hpo",
      "motivation": "define-by-run动态搜索空间",
      "summary": "Optuna 提出了基于 define-by-run 范式的超参数优化框架，通过动态构建搜索空间、高效采样算法（TPE/CMA-ES）和异步早停剪枝（ASHA），实现了灵活、高效且易于分布式扩展的自动超参数调优。",
      "keyPoints": [
        "<strong>Define-by-run API</strong>：搜索空间在目标函数执行过程中动态定义，支持条件参数和循环结构等复杂搜索空间",
        "<strong>高效采样算法</strong>：集成 TPE（Tree-structured Parzen Estimator）和 CMA-ES（协方差矩阵自适应进化策略）",
        "<strong>自动化早停剪枝</strong>：支持 ASHA（Asynchronous Successive Halving Algorithm）和 Median Pruning，实现 trial 级别的提前终止",
        "<strong>轻量级模块化架构</strong>：基于 Study/Trial/Storage 三层抽象，支持 RDB 后端实现分布式优化",
        "<strong>即时可视化</strong>：集成 Web Dashboard 实时监控优化进程",
        "<strong>线性分布式扩展</strong>：多 worker 并行优化性能随节点数线性增长"
      ],
      "detail": "<p><img alt=\"Optuna 架构示意图\" src=\"https://ar5iv.labs.arxiv.org/html/1907.10902v2/assets/x4.png\" />\n<em>图：Optuna 软件架构——Study 管理优化会话，Trial 封装单次评估，Storage 提供持久化与分布式支持</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># Optuna Define-by-run 超参数优化核心流程\ndef objective(trial):\n    # 动态定义搜索空间（define-by-run）\n    n_layers = trial.suggest_int(&quot;n_layers&quot;, 1, 4)\n    layers = []\n    for i in range(n_layers):\n        # 条件搜索空间：层数决定每层单元数\n        n_units = trial.suggest_int(f&quot;n_units_l{i}&quot;, 16, 256, log=True)\n        layers.append(n_units)\n\n    lr = trial.suggest_float(&quot;lr&quot;, 1e-5, 1e-1, log=True)\n    optimizer_name = trial.suggest_categorical(&quot;optimizer&quot;, [&quot;Adam&quot;, &quot;SGD&quot;])\n\n    # 训练模型并支持中间报告（用于剪枝）\n    for epoch in range(100):\n        train_loss = train_one_epoch(layers, lr, optimizer_name)\n        val_acc = evaluate()\n        trial.report(val_acc, epoch)  # 报告中间值\n        if trial.should_prune():      # 剪枝判断\n            raise optuna.TrialPruned()\n\n    return val_acc\n\n# 创建 Study 并优化\nstudy = optuna.create_study(\n    direction=&quot;maximize&quot;,\n    sampler=optuna.samplers.TPESampler(),\n    pruner=optuna.pruners.SuccessiveHalvingPruner()\n)\nstudy.optimize(objective, n_trials=100)\n</code></pre>\n<h5>动机与背景</h5>\n<p>传统超参数优化框架（如 Hyperopt、SMAC、Vizier）采用 <strong>define-and-run</strong> 范式：用户必须在优化开始前静态定义完整的搜索空间。这种方式存在根本性限制：</p>\n<ol>\n<li><strong>无法表达条件依赖</strong>：例如神经网络层数决定了每层超参数的数量，静态定义难以自然表达</li>\n<li><strong>代码侵入性强</strong>：需要将搜索空间与目标函数分离，增加工程复杂度</li>\n<li><strong>不支持动态结构</strong>：循环、分支等程序控制流无法直接用于搜索空间定义</li>\n</ol>\n<p>Optuna 借鉴了深度学习框架从 define-and-run（TensorFlow 1.x）向 define-by-run（PyTorch/Chainer）演进的思路，将相同理念引入超参数优化领域。</p>\n<h5>核心机制：Define-by-run 搜索空间</h5>\n<p>Define-by-run 的核心思想是：<strong>搜索空间不是预先声明的静态对象，而是在目标函数执行过程中通过 <code>trial.suggest_*()</code> 调用动态构建的</strong>。</p>\n<p>每次调用 <code>trial.suggest_int()</code>、<code>trial.suggest_float()</code> 或 <code>trial.suggest_categorical()</code> 时，框架会：\n1. 检查该参数名是否已在当前 trial 中被采样\n2. 若未采样，则根据采样算法（TPE/CMA-ES/随机）生成一个值\n3. 记录该参数的名称、类型、范围和采样值</p>\n<p>这意味着搜索空间的<strong>拓扑结构本身可以是超参数的函数</strong>。例如：</p>\n<p>$$\\text{SearchSpace}(\\theta) = \\{\\theta_i \\mid i \\in \\text{ActiveParams}(\\theta_{\\text{structure}})\\}$$</p>\n<p>其中 \\(\\theta_{\\text{structure}}\\) 决定了哪些参数 \\(\\theta_i\\) 会被激活。</p>\n<div class=\"key-point\">💡 关键：Define-by-run 使得搜索空间可以包含 Python 的任意控制流（if/for/while），极大提升了表达能力。</div>\n<h5>采样算法</h5>\n<p><strong>TPE (Tree-structured Parzen Estimator)</strong>：</p>\n<p>TPE 将超参数的条件概率建模为两个密度函数：</p>\n<p>$$p(x|y) = \\begin{cases} l(x) & \\text{if } y < y^* \\\\ g(x) & \\text{if } y \\geq y^* \\end{cases}$$</p>\n<p>其中 \\(y^*\\) 是目标值的分位数阈值，\\(l(x)\\) 建模\"好\"的超参数分布，\\(g(x)\\) 建模\"差\"的超参数分布。优化目标等价于最大化 \\(l(x)/g(x)\\)。</p>\n<p>Optuna 对 TPE 的改进：\n- 独立采样（Independent TPE）：对每个超参数独立建模，天然适配动态搜索空间\n- 支持对数尺度和离散参数的核密度估计</p>\n<p><strong>CMA-ES (协方差矩阵自适应进化策略)</strong>：</p>\n<p>CMA-ES 维护一个多元高斯分布 \\(\\mathcal{N}(m, \\sigma^2 C)\\)，通过进化策略迭代更新均值 \\(m\\)、步长 \\(\\sigma\\) 和协方差矩阵 \\(C\\)。适用于连续参数空间的局部优化。</p>\n<h5>剪枝策略</h5>\n<p>Optuna 的剪枝机制允许在 trial 执行过程中提前终止表现不佳的配置：</p>\n<p><strong>ASHA (Asynchronous Successive Halving)</strong>：</p>\n<p>ASHA 基于 Successive Halving 算法的异步版本。给定资源预算（如 epoch 数），在每个 rung（检查点）处：</p>\n<p>$$\\text{Promote}(t) = \\begin{cases} \\text{True} & \\text{if } f(t) \\leq \\text{Percentile}_{1/\\eta}(\\{f(t')\\}) \\\\ \\text{False} & \\text{otherwise} \\end{cases}$$</p>\n<p>其中 \\(\\eta\\) 是缩减因子（默认为 3-4），只有表现在前 \\(1/\\eta\\) 的 trial 才能继续获得更多资源。</p>\n<div class=\"warn-box\">⚠️ 注意：ASHA 的异步特性使其天然适合分布式环境——新 worker 无需等待其他 trial 完成即可开始新的评估。</div>\n<p>实验表明，ASHA 剪枝相比无剪枝可实现约 <strong>35 倍</strong>的加速（在相同时间内探索更多有效配置）。</p>\n<h5>分布式架构</h5>\n<p>Optuna 的分布式优化基于共享存储（Shared Storage）模式：</p>\n<pre><code>Worker 1 ──┐\nWorker 2 ──┼──→ RDB Storage (MySQL/PostgreSQL) ←──→ Study\nWorker 3 ──┘\n</code></pre>\n<ul>\n<li>每个 worker 独立运行目标函数</li>\n<li>通过 Storage 层读取历史 trial 结果、写入新结果</li>\n<li>采样算法基于所有已完成 trial 的信息进行决策</li>\n<li>无需中心调度器，worker 可动态加入/退出</li>\n</ul>\n<p>实验验证：在 1-8 个 worker 的配置下，优化效率随 worker 数量<strong>线性扩展</strong>，且 worker 数量不影响每个 trial 的质量。</p>\n<h5>与传统方法的区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>Hyperopt</th>\n<th>SMAC</th>\n<th>Google Vizier</th>\n<th><strong>Optuna</strong></th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>搜索空间定义</td>\n<td>Define-and-run</td>\n<td>Define-and-run</td>\n<td>Define-and-run</td>\n<td><strong>Define-by-run</strong></td>\n</tr>\n<tr>\n<td>条件参数</td>\n<td>需特殊语法</td>\n<td>需配置文件</td>\n<td>有限支持</td>\n<td><strong>原生 Python</strong></td>\n</tr>\n<tr>\n<td>剪枝</td>\n<td>❌</td>\n<td>❌</td>\n<td>✅</td>\n<td><strong>✅ (ASHA/Median)</strong></td>\n</tr>\n<tr>\n<td>分布式</td>\n<td>MongoDB</td>\n<td>SMAC3</td>\n<td>内置</td>\n<td><strong>RDB 后端</strong></td>\n</tr>\n<tr>\n<td>可视化</td>\n<td>有限</td>\n<td>有限</td>\n<td>Web UI</td>\n<td><strong>Web Dashboard</strong></td>\n</tr>\n<tr>\n<td>轻量级</td>\n<td>✅</td>\n<td>❌</td>\n<td>❌(需服务)</td>\n<td><strong>✅</strong></td>\n</tr>\n</tbody>\n</table></div>",
      "quiz": {
        "q": "Optuna 的 define-by-run API 相比传统 define-and-run 方式的核心优势是什么？",
        "options": [
          "训练速度更快，因为搜索空间更小",
          "搜索空间可以在目标函数执行过程中动态构建，支持条件参数和程序控制流",
          "不需要指定超参数的取值范围",
          "自动选择最优的采样算法"
        ],
        "answer": 1,
        "explain": "Define-by-run 允许在目标函数中通过 trial.suggest_*() 动态定义搜索空间，使得搜索空间的结构本身可以依赖于其他超参数的值，天然支持条件参数、循环等复杂结构。"
      }
    },
    {
      "id": "autofeat",
      "num": 16,
      "name": "AutoFeat",
      "fullName": "自动特征工程库 (The autofeat Python Library)",
      "year": "2019",
      "org": "SAP",
      "parent": "dfs",
      "paperUrl": "https://arxiv.org/abs/1901.07329",
      "projectUrl": "",
      "category": "auto_feature",
      "motivation": "非线性变换组合+L1正则化筛选",
      "summary": "AutoFeat 提出了一种自动特征工程框架，通过对原始特征进行多步非线性变换生成大规模候选特征池，再利用多轮 L1 正则化（Lasso）结合噪声过滤、分块与子采样策略高效筛选少量有意义特征，最终构建性能媲美非线性模型但保持可解释性的线性回归模型。",
      "keyPoints": [
        "两阶段流水线：特征工程（Feature Engineering）→ 特征选择（Feature Selection）",
        "特征工程：对原始特征迭代应用非线性变换（exp, log, sqrt, \\(x^2\\), \\(x^3\\), 1/x, |x|）及算术组合（+, -, ×, /），指数级扩展特征空间",
        "特征选择核心：多步 L1 正则化，通过添加噪声特征作为基线过滤无关特征",
        "分块策略（Chunking）：将大规模特征池拆分为多个子集分别进行 Lasso 回归，解决 \\(p \\gg n\\) 问题",
        "子采样策略（Subsampling）：对数据点进行多次随机子采样，仅保留在多数子样本中被选中的特征",
        "物理单位感知：利用 SymPy 符号计算追踪特征的物理量纲，仅组合量纲兼容的特征",
        "最终模型为标准线性回归，系数可直接解释各特征对目标的贡献",
        "提供 Python 库 <code>autofeat</code>，API 兼容 scikit-learn"
      ],
      "detail": "<p><img alt=\"AutoFeat 特征工程与选择流程\" src=\"https://ar5iv.labs.arxiv.org/html/1901.07329v1/assets/autofeat_pipeline.png\" />\n<em>图：AutoFeat 流水线示意——从原始特征出发，经多步非线性变换生成候选特征池，再通过多轮 L1 选择得到最终特征子集</em></p>\n<pre><code class=\"language-python\"># AutoFeat 核心算法伪代码\ndef autofeat(X, y, transformations, n_steps, n_select):\n    &quot;&quot;&quot;\n    X: 原始特征矩阵 (n_samples, n_features)\n    y: 目标变量\n    transformations: 非线性变换集合 {exp, log, sqrt, ^2, ^3, 1/x, |x|}\n    n_steps: 特征工程迭代步数\n    n_select: 每步保留的特征数上限\n    &quot;&quot;&quot;\n    # === 阶段1: 特征工程 ===\n    feature_pool = X.copy()\n    for step in range(n_steps):\n        new_features = []\n        for f in feature_pool.columns:\n            for t in transformations:\n                new_features.append(t(f))  # 一元变换\n        for f1, f2 in combinations(feature_pool.columns, 2):\n            for op in ['+', '-', '*', '/']:\n                new_features.append(op(f1, f2))  # 二元组合\n        feature_pool = concat(feature_pool, new_features)\n        # 可选: 每步后进行初步筛选以控制规模\n        feature_pool = l1_select(feature_pool, y, n_select)\n\n    # === 阶段2: 多步特征选择 ===\n    selected = multi_step_l1_selection(feature_pool, y)\n\n    # === 最终模型 ===\n    model = LinearRegression().fit(X[selected], y)\n    return model, selected\n\ndef multi_step_l1_selection(features, y):\n    &quot;&quot;&quot;多步L1正则化特征选择&quot;&quot;&quot;\n    # Step 1: 添加噪声特征作为基线\n    noise_features = generate_noise(n=5)\n    augmented = concat(features, noise_features)\n\n    # Step 2: 分块 + Lasso\n    chunks = split_into_chunks(augmented, chunk_size=n_samples//10)\n    candidates = []\n    for chunk in chunks:\n        model = Lasso(alpha=auto).fit(chunk, y)\n        # 仅保留系数 &gt; max(噪声特征系数) 的特征\n        threshold = max(abs(model.coef_[noise_indices]))\n        candidates.extend(chunk.columns[abs(model.coef_) &gt; threshold])\n\n    # Step 3: 子采样验证\n    final = []\n    for subsample in random_subsamples(n_rounds=5):\n        model = Lasso().fit(candidates[subsample], y[subsample])\n        final.extend(selected_by(model))\n\n    # 仅保留在多数子样本中被选中的特征\n    return majority_vote(final)\n</code></pre>\n<h5>动机与背景</h5>\n<p>传统机器学习流程中，特征工程是最耗时且依赖领域专家经验的环节。虽然深度学习通过端到端表示学习部分解决了这一问题，但在<strong>表格数据</strong>（尤其是样本量有限的科学/工业场景）中，手动特征工程仍然是提升模型性能的关键手段。</p>\n<p>现有自动特征工程方法（如 featuretools、tsfresh）主要面向关系型数据或时间序列，对于包含不同物理单位传感器测量值的<strong>异构科学数据集</strong>缺乏针对性支持。此外，生成大量候选特征后如何高效、稳健地筛选出真正有用的特征，避免过拟合，是核心挑战。</p>\n<div class=\"key-point\">💡 关键：AutoFeat 的核心洞察是——通过非线性变换将线性模型的表达能力提升到非线性水平，同时保持模型的可解释性优势。</div>\n<h5>核心机制：特征工程</h5>\n<p>AutoFeat 的特征工程阶段通过迭代应用预定义的变换算子来扩展特征空间。给定原始特征集 \\(\\mathbf{X} = \\{x_1, x_2, \\ldots, x_p\\}\\)，每一步生成新特征：</p>\n<p><strong>一元变换</strong>（对每个特征独立应用）：</p>\n<p>$$\\mathcal{T}_{\\text{unary}} = \\{\\exp, \\log, \\sqrt{\\cdot}, (\\cdot)^2, (\\cdot)^3, 1/(\\cdot), |\\cdot|\\}$$</p>\n<p><strong>二元组合</strong>（对特征对应用算术运算）：</p>\n<p>$$\\mathcal{T}_{\\text{binary}} = \\{+, -, \\times, /\\}$$</p>\n<p>经过 \\(s\\) 步特征工程后，特征数量呈指数增长。例如，\\(p\\) 个原始特征经 1 步变换可产生约 \\(7p + 4\\binom{p}{2}\\) 个新特征。为控制组合爆炸，AutoFeat 采用以下策略：</p>\n<ol>\n<li><strong>物理单位约束</strong>：利用 SymPy 追踪每个特征的量纲，仅对量纲兼容的特征进行加减运算（如不会将\"米\"与\"秒\"相加）</li>\n<li><strong>每步筛选</strong>：在每步特征工程结束后，先进行一轮 L1 选择，将候选特征数控制在可管理范围内</li>\n<li><strong>去重</strong>：通过计算特征间相关性，去除高度冗余的特征</li>\n</ol>\n<h5>核心机制：多步 L1 特征选择</h5>\n<p>特征选择面临的核心挑战是：候选特征数 \\(p'\\) 远大于样本数 \\(n\\)（通常 \\(p' \\gg n\\)），直接应用 Lasso 会导致不稳定的选择结果。AutoFeat 设计了一套鲁棒的多步选择流程：</p>\n<p><strong>Step 1 — 噪声过滤</strong>：向特征矩阵中添加 \\(k\\) 个随机噪声特征（从标准正态分布采样），作为\"无关特征\"的基线。Lasso 回归后，任何系数绝对值不超过噪声特征最大系数的真实特征都被淘汰：</p>\n<p>$$|w_j| \\leq \\max_{i \\in \\text{noise}} |w_i| \\implies \\text{移除特征 } j$$</p>\n<p><strong>Step 2 — 分块策略</strong>：将候选特征随机分为多个大小约为 \\(n/10\\) 的块（chunk），每块独立进行 Lasso 回归。这确保每个子问题中 \\(p < n\\)，Lasso 可以稳定工作。</p>\n<p><strong>Step 3 — 子采样验证</strong>：对数据点进行多次随机子采样（默认 5 轮，每轮取 2/3 样本），在每个子样本上独立运行 Lasso。仅保留在<strong>大多数子样本</strong>中都被选中的特征，确保选择结果不依赖于特定数据点。</p>\n<div class=\"warn-box\">⚠️ 注意：Lasso 的正则化参数 \\(\\alpha\\) 通过 LassoLarsCV（基于 LARS 算法的交叉验证）自动确定，无需手动调参。</div>\n<h5>最终模型与可解释性</h5>\n<p>经过特征选择后，AutoFeat 使用选中的少量非线性特征训练一个标准<strong>最小二乘线性回归</strong>模型：</p>\n<p>$$\\hat{y} = w_0 + \\sum_{j=1}^{k} w_j \\cdot \\phi_j(\\mathbf{x})$$</p>\n<p>其中 \\(\\phi_j(\\mathbf{x})\\) 是通过变换生成的特征（如 \\(\\log(x_1) \\cdot x_3^2\\)）。由于最终模型是线性的，每个特征的权重 \\(w_j\\) 直接反映其对预测的贡献大小和方向，保持了完全的可解释性。</p>\n<h5>与传统方法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>特征工程</th>\n<th>模型类型</th>\n<th>可解释性</th>\n<th>适用场景</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>手动特征工程 + 线性模型</td>\n<td>人工</td>\n<td>线性</td>\n<td>✅ 高</td>\n<td>需要领域专家</td>\n</tr>\n<tr>\n<td>随机森林/GBDT</td>\n<td>隐式（树分裂）</td>\n<td>非线性</td>\n<td>❌ 低</td>\n<td>通用</td>\n</tr>\n<tr>\n<td>深度学习</td>\n<td>端到端学习</td>\n<td>非线性</td>\n<td>❌ 低</td>\n<td>大数据</td>\n</tr>\n<tr>\n<td><strong>AutoFeat</strong></td>\n<td><strong>自动</strong></td>\n<td><strong>线性</strong></td>\n<td><strong>✅ 高</strong></td>\n<td><strong>小样本科学数据</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p>AutoFeat 的独特优势在于：在获得接近非线性模型性能的同时，保持了线性模型的可解释性和外推能力。实验表明，在 5 个回归基准数据集上，AutoFeat 显著优于普通线性模型（R² 提升 10-50%），并在多数数据集上达到或超过随机森林、SVR 等非线性模型的性能。</p>",
      "quiz": {
        "q": "AutoFeat 在特征选择阶段添加噪声特征的主要目的是什么？",
        "options": [
          "增加训练数据的多样性以防止过拟合",
          "作为无关特征的基线，过滤掉系数不显著的候选特征",
          "用于估计 Lasso 正则化参数 α 的最优值",
          "生成额外的非线性特征以扩展特征空间"
        ],
        "answer": 1,
        "explain": "噪声特征服从随机分布，与目标变量无关。Lasso 回归后，系数绝对值不超过噪声特征最大系数的真实特征被认为不比随机噪声更有信息量，因此被淘汰。"
      }
    },
    {
      "id": "ofa",
      "num": 17,
      "name": "OFA",
      "fullName": "一次训练全场景 (Once-for-All)",
      "year": "2020",
      "org": "MIT",
      "parent": "enas",
      "paperUrl": "https://arxiv.org/abs/1908.09791",
      "projectUrl": "",
      "category": "nas",
      "motivation": "训练超网支持10^19子网部署",
      "summary": "OFA 提出\"训练一次，处处部署\"的超网训练范式，通过渐进收缩（Progressive Shrinking）算法联合优化深度、宽度、卷积核大小和分辨率四个维度，使单个共享权重网络支持超过 \\(10^{19}\\) 种子网络架构，在部署时零额外训练成本即可为任意硬件平台导出专用高效模型。",
      "keyPoints": [
        "<strong>超网（Once-for-All Network）</strong>：单一共享权重网络包含 \\(>10^{19}\\) 个子网络，覆盖深度、宽度、卷积核大小、输入分辨率四个弹性维度",
        "<strong>渐进收缩（Progressive Shrinking, PS）算法</strong>：从最大网络出发，依次引入弹性卷积核→弹性深度→弹性宽度，逐步微调支持更小子网",
        "<strong>弹性卷积核</strong>：大卷积核中心区域复用为小卷积核，引入核变换矩阵消除角色冲突",
        "<strong>弹性深度</strong>：保留每个 unit 前 D 层、跳过末尾层，确保权重共享一致性",
        "<strong>弹性宽度</strong>：按 L1 范数对通道排序，选取最重要通道初始化小子网",
        "<strong>知识蒸馏</strong>：训练最大网络后，用其软标签指导小子网微调",
        "<strong>神经网络孪生预测器（Neural-Network-Twins）</strong>：训练精度预测器 + 延迟查找表，进化搜索导出专用子网，搜索成本可忽略",
        "<strong>部署成本从 O(N) 降至 O(1)</strong>：无论目标场景数量多少，训练成本恒定（约 1200 GPU hours）",
        "<strong>SOTA 结果</strong>：ImageNet mobile setting 首次达到 80.0% top-1（595M MACs），优于 MobileNetV3 最高 4.0%"
      ],
      "detail": "<h5>核心框架示意图</h5>\n<p><img alt=\"OFA 整体框架\" src=\"https://ar5iv.labs.arxiv.org/html/1908.09791/assets/x1.png\" />\n<em>图：OFA 框架概览。左：单个超网支持多种架构配置（深度/宽度/卷积核/分辨率）；中：部署成本从 O(N) 降至 O(1)；右：一次训练即可导出多种精度-延迟权衡方案。</em></p>\n<h5>渐进收缩训练流程</h5>\n<p><img alt=\"Progressive Shrinking 过程\" src=\"https://ar5iv.labs.arxiv.org/html/1908.09791/assets/x3.png\" />\n<em>图：渐进收缩过程示意。依次引入弹性卷积核 K、弹性深度 D、弹性宽度 W，分辨率 R 在整个训练过程中始终弹性采样。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># OFA 渐进收缩训练流程伪代码\n# Phase 0: 训练最大网络\ntrain_full_network(max_depth=4, max_width=6, max_kernel=7, epochs=180)\n\n# Phase 1: 弹性卷积核 (Elastic Kernel Size)\nfor epoch in range(PS_epochs_kernel):\n    for batch in dataloader:\n        # 随机采样卷积核大小 ∈ {3, 5, 7}，深度和宽度保持最大\n        subnet = sample_subnet(kernel=[3,5,7], depth=max, width=max)\n        # 知识蒸馏: soft_label 来自最大网络\n        loss = α * CE(subnet(x), y) + (1-α) * KD(subnet(x), teacher(x))\n        loss.backward()\n        optimizer.step()\n\n# Phase 2: 弹性深度 (Elastic Depth)\nfor epoch in range(PS_epochs_depth):\n    subnet = sample_subnet(kernel=[3,5,7], depth=[2,3,4], width=max)\n    loss = α * CE(subnet(x), y) + (1-α) * KD(subnet(x), teacher(x))\n    # ...\n\n# Phase 3: 弹性宽度 (Elastic Width)\nfor epoch in range(PS_epochs_width):\n    # 通道按 L1 范数排序后选取前 k 个\n    subnet = sample_subnet(kernel=[3,5,7], depth=[2,3,4], width=[3,4,6])\n    loss = α * CE(subnet(x), y) + (1-α) * KD(subnet(x), teacher(x))\n    # ...\n\n# 部署阶段: 搜索专用子网\naccuracy_predictor = train_predictor(sample_16K_subnets())\nlatency_table = build_latency_lookup(target_hardware)\nbest_arch = evolutionary_search(accuracy_predictor, latency_table, constraint)\n</code></pre>\n<h5>动机与背景</h5>\n<p>传统的高效模型部署面临严峻的可扩展性问题：每个目标硬件平台（手机、GPU、FPGA 等）都需要独立进行神经架构搜索（NAS）并从头训练模型。随着 IoT 设备数量爆炸式增长（2018 年已超 231 亿台），这种 O(N) 的设计范式在计算成本和碳排放上均不可接受——单次 NAS 搜索（如 NASNet）需要 48,000 GPU hours，相当于 5 辆汽车一生的 CO₂ 排放量。</p>\n<div class=\"key-point\">💡 关键：OFA 的核心洞察是<strong>解耦训练与搜索</strong>——只训练一次超网，部署时通过预测器引导搜索直接从超网中选取子网，无需任何额外训练。</div>\n<h5>核心机制详解</h5>\n<p><strong>1. 架构空间设计</strong></p>\n<p>OFA 基于 MobileNetV3 架构空间，将 CNN 划分为 5 个 unit，每个 unit 包含若干层。弹性维度包括：</p>\n<ul>\n<li><strong>输入分辨率</strong>：128 到 224，步长 4（共 25 种）</li>\n<li><strong>每 unit 深度</strong>：\\(\\{2, 3, 4\\}\\)</li>\n<li><strong>每层宽度扩展比</strong>：\\(\\{3, 4, 6\\}\\)</li>\n<li><strong>每层卷积核大小</strong>：\\(\\{3, 5, 7\\}\\)</li>\n</ul>\n<p>总子网数量计算：</p>\n<p>$$\\left((3 \\times 3)^2 + (3 \\times 3)^3 + (3 \\times 3)^4\\right)^5 \\approx 2 \\times 10^{19}$$</p>\n<p>所有子网共享同一组权重 \\(W_o\\)（仅 7.7M 参数），存储开销极小。</p>\n<p><strong>2. 渐进收缩（Progressive Shrinking）</strong></p>\n<p>训练目标形式化为多目标优化：</p>\n<p>$$\\min_{W_o} \\sum_{arch_i} \\mathcal{L}_{val}\\big(C(W_o, arch_i)\\big)$$</p>\n<p>其中 \\(C(W_o, arch_i)\\) 表示从超网 \\(W_o\\) 中按配置 \\(arch_i\\) 选取子网。</p>\n<p>直接优化此目标面临两个困难：(1) 枚举所有 \\(10^{19}\\) 子网计算精确梯度不可行；(2) 随机采样少量子网会因权重干扰导致严重精度下降。</p>\n<p>PS 的解决方案是<strong>从大到小渐进训练</strong>：</p>\n<p><img alt=\"弹性卷积核与弹性深度\" src=\"https://ar5iv.labs.arxiv.org/html/1908.09791/assets/x5.png\" />\n<em>图：左：核变换矩阵实现弹性卷积核；右：弹性深度保留前 D 层、跳过末尾层。</em></p>\n<ul>\n<li>\n<p><strong>Phase 1 - 弹性卷积核</strong>：7×7 卷积核的中心 5×5 区域同时作为 5×5 核使用，中心 3×3 区域作为 3×3 核使用。由于中心子核需要扮演多重角色（独立核 vs 大核的一部分），引入<strong>核变换矩阵</strong>（每层仅增加 706 个参数）来消除分布冲突。</p>\n</li>\n<li>\n<p><strong>Phase 2 - 弹性深度</strong>：对于原有 N 层的 unit，深度为 D 的子网保留<strong>前 D 层</strong>（而非任意 D 层），确保权重共享的一致性。前 D 层的权重在大小模型间完全共享。</p>\n</li>\n<li>\n<p><strong>Phase 3 - 弹性宽度</strong>：引入<strong>通道排序</strong>操作，按每个通道权重的 L1 范数排序。选取最重要的前 k 个通道构成小子网，这些通道的权重与大子网共享。</p>\n</li>\n</ul>\n<p><img alt=\"弹性宽度\" src=\"https://ar5iv.labs.arxiv.org/html/1908.09791/assets/x6.png\" />\n<em>图：弹性宽度通过通道排序实现。按 L1 范数选取最重要通道，权重共享。</em></p>\n<div class=\"warn-box\">⚠️ 注意：PS 的关键优势在于——大子网已充分训练后才引入小子网，避免了小子网干扰大子网；同时小子网继承大子网最重要的权重作为初始化，加速收敛。</div>\n<p><strong>3. 与网络剪枝的对比</strong></p>\n<p>PS 可视为<strong>广义网络剪枝</strong>：传统剪枝仅收缩宽度维度并产出单一剪枝网络，而 PS 同时收缩深度、宽度、卷积核大小和分辨率四个维度，且维护所有子网的精度而非单一网络。</p>\n<p><strong>4. 模型特化部署</strong></p>\n<p>训练完成后，部署阶段成本可忽略：</p>\n<ol>\n<li>随机采样 16K 子网，在 10K 验证图像上测量精度，训练<strong>精度预测器</strong></li>\n<li>在目标硬件上构建<strong>延迟查找表</strong></li>\n<li>基于预测器进行<strong>进化搜索</strong>，找到满足延迟约束的最优子网</li>\n</ol>\n<p>整个搜索过程仅需约 40 GPU hours 收集数据，搜索本身几乎零成本。</p>\n<h5>与传统方法的关键区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th>传统 NAS (如 MnasNet)</th>\n<th>OFA</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>每新场景成本</td>\n<td>重新搜索 + 重新训练</td>\n<td>仅搜索（秒级）</td>\n</tr>\n<tr>\n<td>总 GPU hours (40 场景)</td>\n<td>1,600K+</td>\n<td>1.2K</td>\n</tr>\n<tr>\n<td>CO₂ 排放</td>\n<td>453.8K lbs</td>\n<td>0.34K lbs</td>\n</tr>\n<tr>\n<td>子网数量</td>\n<td>1</td>\n<td>\\(>10^{19}\\)</td>\n</tr>\n<tr>\n<td>权重共享</td>\n<td>无</td>\n<td>全部共享（7.7M 参数）</td>\n</tr>\n</tbody>\n</table></div>\n<h5>实验亮点</h5>\n<ul>\n<li><strong>ImageNet mobile setting</strong>：OFA 达到 <strong>80.0% top-1</strong>（595M MACs），首次在移动约束下突破 80%</li>\n<li><strong>vs MobileNetV3</strong>：相同延迟下精度提升最高 4.0%，或相同精度下速度快 1.5×</li>\n<li><strong>vs EfficientNet</strong>：相同精度下实测延迟快 2.6×</li>\n<li><strong>多硬件验证</strong>：Samsung S7/Note8/Note10、Google Pixel1/2、LG G8、NVIDIA GPU、Jetson TX2、Xilinx FPGA 等 12+ 平台全面优于 SOTA</li>\n<li><strong>竞赛冠军</strong>：第 3 届 LPCVC DSP 分类赛道冠军，第 4 届 LPCVC 分类+检测双赛道冠军</li>\n</ul>",
      "quiz": {
        "q": "OFA 渐进收缩（Progressive Shrinking）算法中，弹性维度的引入顺序是什么？",
        "options": [
          "弹性宽度 → 弹性深度 → 弹性卷积核",
          "弹性卷积核 → 弹性宽度 → 弹性深度",
          "弹性卷积核 → 弹性深度 → 弹性宽度",
          "弹性深度 → 弹性卷积核 → 弹性宽度"
        ],
        "answer": 2,
        "explain": "OFA 的渐进收缩按照弹性卷积核→弹性深度→弹性宽度的顺序依次引入，分辨率在整个训练过程中始终弹性采样。这一顺序确保从最容易适配的维度开始，逐步增加难度。"
      }
    },
    {
      "id": "llm_fe",
      "num": 18,
      "name": "LLM-FE",
      "fullName": "大模型驱动特征工程 (LLM-FE: AutoFE with LLMs as Evolutionary Optimizers)",
      "year": "2026",
      "org": "TMLR",
      "parent": "autofeat",
      "paperUrl": "https://openreview.net/forum?id=22129",
      "projectUrl": "",
      "category": "auto_feature",
      "motivation": "LLM进化优化器+岛屿模型搜索",
      "summary": "LLM-FE 将表格数据的特征工程建模为程序搜索问题，利用 LLM 作为进化优化器，结合岛屿模型多种群记忆与数据驱动反馈，迭代生成并优化特征变换程序，在分类和回归任务上全面超越现有自动特征工程方法。",
      "keyPoints": [
        "将特征工程形式化为双层优化的程序搜索问题：外层搜索最优变换程序 \\(T^*\\)，内层训练预测模型评估变换质量",
        "LLM 作为知识引导的进化优化器：利用结构化提示（指令 + 数据集描述 + 评估函数 + 上下文示例）生成特征变换假设",
        "多种群记忆（Island Model）：维护 \\(m\\) 个独立岛屿缓冲区，按 Boltzmann 分布采样父代程序，防止早熟收敛",
        "数据驱动评估闭环：生成的特征程序应用于数据集 → 训练模型 → 验证集得分作为反馈信号",
        "支持分类与回归任务（CAAFE/FeatLLM 仅支持分类），兼容 XGBoost、MLP、TabPFN 等多种预测模型",
        "支持 GPT-3.5-Turbo 和 Llama-3.1-8B 两种 LLM 骨干，均有效提升性能",
        "消融实验表明：领域知识 &gt; 进化搜索 &gt; 数据示例（贡献递减）"
      ],
      "detail": "<p><img alt=\"LLM-FE 框架总览\" src=\"https://ar5iv.labs.arxiv.org/html/2503.14434v3/assets/x1.png\" />\n<em>图：LLM-FE 框架总览。(a) LLM 生成特征变换假设程序；(b) 程序应用于数据集产生增强特征；(c) 预测模型在增强数据上训练并在验证集评估；(d) 多种群记忆维护高分程序作为进化搜索的上下文样本。</em></p>\n<pre><code class=\"language-python\"># Algorithm 1: LLM-FE 进化特征搜索（简化伪代码）\ndef llm_fe(dataset, llm, m=3, b=3, T=20, k=3):\n    &quot;&quot;&quot;\n    dataset: 表格数据集 (X_train, y_train, X_val, y_val)\n    llm: 大语言模型骨干\n    m: 岛屿数量\n    b: 每次生成的程序数\n    T: 总迭代次数\n    k: 上下文示例数\n    &quot;&quot;&quot;\n    # 初始化 m 个岛屿缓冲区\n    islands = [Buffer() for _ in range(m)]\n    best_program, best_score = None, -inf\n\n    for t in range(T):\n        # 按 Boltzmann 分布选择岛屿\n        # P_i = exp(s_i / τ_c) / Σ_j exp(s_j / τ_c)\n        island = boltzmann_sample(islands, tau_c)\n\n        # 从选中岛屿采样 top-k 程序作为上下文示例\n        context_programs = island.sample_top_k(k)\n\n        # 构建结构化提示: 指令 + 数据集描述 + 评估函数 + 上下文示例\n        prompt = build_prompt(dataset, context_programs)\n\n        # LLM 生成 b 个新的特征变换程序\n        new_programs = llm.generate(prompt, n=b, temperature=0.8)\n\n        for program in new_programs:\n            # 数据驱动评估\n            X_aug = program.transform(dataset.X)\n            model = train_model(X_aug, dataset.y_train)\n            score = evaluate(model, X_aug_val, dataset.y_val)\n\n            # 更新岛屿缓冲区（按得分签名聚类分配）\n            assign_to_island(program, score, islands)\n\n            if score &gt; best_score:\n                best_program, best_score = program, score\n\n    # 集成 top-m 程序的预测结果\n    return ensemble_top_m(islands)\n</code></pre>\n<p><strong>动机与背景</strong></p>\n<p>传统自动特征工程方法（如 AutoFeat、OpenFE）依赖预定义的变换操作集合（如 log、sqrt、乘法等），在固定的手工设计搜索空间中进行组合搜索。这类方法存在两个根本局限：(1) 搜索空间受限于人工预设的算子，无法发现更复杂的领域特定变换；(2) 完全忽略领域知识，无法利用特征语义信息指导搜索。近期的 LLM 方法（CAAFE、FeatLLM）虽然引入了领域知识，但仅使用直接提示或简单的验证分数筛选，未能建立特征生成与数据驱动性能之间的有效反馈循环，也无法从历史实验中学习。LLM-FE 的核心洞察是：将 LLM 视为一个具有丰富领域先验的进化优化器，通过迭代的\"生成-评估-反馈\"循环，在开放的程序空间中搜索最优特征变换。</p>\n<p><strong>核心机制：双层优化与进化搜索</strong></p>\n<p>LLM-FE 将特征工程形式化为双层优化问题。外层目标是找到最优变换程序 \\(T^*\\)：</p>\n<p>$$T^* = \\arg\\max_{T \\in \\mathcal{T}} \\; \\mathcal{V}(f^*_T, \\mathcal{D}_{val})$$</p>\n<p>其中内层优化训练预测模型：</p>\n<p>$$f^*_T = \\arg\\min_{f \\in \\mathcal{F}} \\; \\mathcal{L}(f, T(\\mathcal{D}_{train}))$$</p>\n<p>搜索空间 \\(\\mathcal{T}\\) 是所有可能的 Python 特征变换程序的集合——这是一个无限的、开放的搜索空间，远超传统方法的固定算子组合。LLM 通过结构化提示生成候选程序，提示包含四个关键组件：(1) <strong>指令</strong>：定义任务目标和输出格式；(2) <strong>数据集规格</strong>：包含任务描述、特征名称与含义、数据样本；(3) <strong>评估函数</strong>：明确评价指标和模型类型；(4) <strong>上下文示例</strong>：来自多种群记忆的高分历史程序及其得分。</p>\n<p><strong>多种群记忆与 Boltzmann 采样</strong></p>\n<p>为防止进化搜索陷入局部最优，LLM-FE 采用岛屿模型（Island Model）维护 \\(m\\) 个独立的程序缓冲区。每个岛屿存储一组高分程序，新生成的程序根据其在不同数据集分片上的得分签名（score signature）被分配到最相似的岛屿。选择哪个岛屿作为当前迭代的上下文来源时，采用 Boltzmann 采样策略：</p>\n<p>$$P_i = \\frac{\\exp(s_i / \\tau_c)}{\\sum_{j=1}^{m} \\exp(s_j / \\tau_c)}$$</p>\n<p>其中 \\(s_i\\) 是岛屿 \\(i\\) 中最优程序的得分，\\(\\tau_c\\) 是温度参数。这种机制在利用（exploitation，倾向高分岛屿）和探索（exploration，给低分岛屿机会）之间取得平衡。多种群设计确保了搜索的多样性——不同岛屿可能发现数据的不同方面的有效特征，最终通过集成 top-\\(m\\) 个程序的预测结果获得鲁棒的最终输出。</p>\n<p><strong>实验结果与消融分析</strong></p>\n<p>在 11 个分类数据集上，LLM-FE 以 Mean Rank 1.54 显著优于 AutoFeat (3.18)、OpenFE (3.09)、CAAFE (3.00) 和 FeatLLM (3.82)。在 10 个回归数据集上，LLM-FE 以 Mean Rank 1.00 达到全面最优（对比 OpenFE 2.00、AutoFeat 3.00）。值得注意的是，CAAFE 和 FeatLLM 的假设空间仅支持分类任务，而 LLM-FE 天然支持回归。泛化性实验表明，无论使用 GPT-3.5-Turbo 还是 Llama-3.1-8B 作为骨干，搭配 XGBoost、MLP 或 TabPFN 作为预测模型，LLM-FE 均能稳定提升基线性能。</p>\n<p>消融实验揭示了各组件的贡献：(1) 移除领域知识（匿名化特征名）导致性能显著下降至 0.838，说明 LLM 的语义理解是生成有意义特征的关键；(2) 移除进化搜索（不使用历史程序作为上下文）也导致明显退化，模型容易停滞在局部最优；(3) 移除数据示例仅造成轻微下降，表明 LLM 难以从少量数据样本中直接捕获模式，但领域知识和迭代反馈才是核心驱动力。</p>\n<div class=\"key-point\">💡 关键洞察：LLM-FE 的成功在于将 LLM 的角色从\"一次性特征生成器\"提升为\"知识引导的进化优化器\"——LLM 不仅提供领域先验，还通过历史成功案例的上下文学习不断改进搜索方向。</div>",
      "quiz": {
        "q": "LLM-FE 中多种群记忆（Island Model）使用 Boltzmann 采样选择岛屿的主要目的是什么？",
        "options": [
          "加速 LLM 的推理速度，减少生成延迟",
          "在利用高分岛屿和探索低分岛屿之间取得平衡，防止早熟收敛",
          "减少 LLM 的 token 消耗，降低 API 调用成本",
          "确保每个岛屿被均匀访问，保证公平性"
        ],
        "answer": 1,
        "explain": "Boltzmann 采样通过温度参数 τ_c 控制选择概率分布的锐度，高分岛屿被选中概率更大（exploitation），但低分岛屿仍有机会被选中（exploration），从而避免搜索过早收敛到单一方向。"
      }
    },
    {
      "id": "autoep",
      "num": 19,
      "name": "AutoEP",
      "fullName": "自动超参进化 (AutoEP: LLM-Driven Hyperparameter Evolution)",
      "year": "2026",
      "org": "ICLR 2026",
      "parent": "pbt",
      "paperUrl": "https://openreview.net/forum?id=16885",
      "projectUrl": "",
      "category": "hpo",
      "motivation": "零样本LLM链式推理自动调参",
      "summary": "AutoEP 在 PBT（种群训练）框架基础上，用**大语言模型（LLM）的链式推理（Chain-of-Thought）**替代传统的随机扰动（explore）步骤：LLM 以零样本方式分析种群中各成员的训练指标与超参数历史，通过结构化推理生成语义合理的超参数变异方案，从而将 PBT 的盲目随机探索升级为**有知识引导的智能进化**，在无需任何任务特定训练数据的前提下显著提升超参数搜索效率。",
      "keyPoints": [
        "<strong>LLM 替代随机扰动</strong>：用预训练 LLM 的 Chain-of-Thought 推理替代 PBT 中 explore 阶段的随机乘因子（×1.2/×0.8）或重采样，使超参数变异具备语义理解能力",
        "<strong>零样本推理（Zero-shot）</strong>：LLM 无需针对特定任务微调，仅通过精心设计的 prompt 模板即可分析训练动态并提出超参数调整建议",
        "<strong>结构化上下文注入</strong>：将种群状态（各成员的超参数、性能指标、训练曲线摘要）编码为结构化 prompt，让 LLM 理解当前搜索状态",
        "<strong>进化式种群协同</strong>：保留 PBT 的 exploit（截断选择 + 权重复制）机制，仅升级 explore 阶段，兼容异步并行训练",
        "<strong>自适应搜索步长</strong>：LLM 可根据训练阶段（早期/中期/后期）自适应调整超参数变化幅度，而非固定的 ±20% 扰动",
        "<strong>跨任务泛化</strong>：LLM 的通用知识使其能在图像分类、语言建模、强化学习等不同任务上均产生合理的超参数建议"
      ],
      "detail": "<h5>核心框架图</h5>\n<pre><code>┌─────────────────────────────────────────────────────────┐\n│                    AutoEP 框架总览                        │\n│                                                         │\n│  ┌──────┐  ┌──────┐  ┌──────┐       ┌──────┐          │\n│  │Worker│  │Worker│  │Worker│  ...  │Worker│  种群     │\n│  │  1   │  │  2   │  │  3   │       │  N   │          │\n│  └──┬───┘  └──┬───┘  └──┬───┘       └──┬───┘          │\n│     │         │         │               │               │\n│     ▼         ▼         ▼               ▼               │\n│  ┌─────────────────────────────────────────┐            │\n│  │         性能评估 &amp; 排序 (Eval)           │            │\n│  └─────────────────┬───────────────────────┘            │\n│                    │                                     │\n│     ┌──────────────┴──────────────┐                     │\n│     ▼                             ▼                     │\n│  ┌────────────┐           ┌──────────────────┐          │\n│  │  Exploit   │           │   LLM Explore    │ ← 核心创新│\n│  │ 截断选择    │──权重+h──→│  Chain-of-Thought │          │\n│  │ 复制权重    │           │  推理生成新超参   │          │\n│  └────────────┘           └──────────────────┘          │\n│                                  │                      │\n│                    ┌─────────────┴─────────────┐        │\n│                    ▼                           ▼        │\n│              结构化 Prompt                 解析 LLM 输出  │\n│           ┌──────────────┐           ┌──────────────┐   │\n│           │ 训练指标摘要  │           │ 新超参数 h'  │   │\n│           │ 超参数历史    │           │ 变异理由     │   │\n│           │ 种群排名信息  │           │ 置信度评分   │   │\n│           └──────────────┘           └──────────────┘   │\n└─────────────────────────────────────────────────────────┘\n</code></pre>\n<p><em>图：AutoEP 在 PBT 种群框架基础上，将 explore 阶段替换为 LLM Chain-of-Thought 推理。LLM 接收结构化的训练上下文，输出语义合理的超参数变异方案。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># Algorithm: AutoEP — LLM-Driven Hyperparameter Evolution\ndef AutoEP_Train(population P, llm_model):\n    # P 中每个成员 = (θ, h, p, t, history)\n    #   θ: 模型权重, h: 超参数, p: 当前性能\n    #   t: 训练步数, history: 训练指标历史\n\n    for (θ, h, p, t, history) in P:  # 异步并行\n        while not end_of_training:\n            θ ← step(θ | h)              # 用超参 h 做一步梯度更新\n            p ← eval(θ)                  # 评估当前模型性能\n            history.append((t, h, p))     # 记录训练轨迹\n\n            if ready(p, t, P):            # 达到 exploit/explore 条件\n                # === Exploit: 与 PBT 相同 ===\n                h', θ' ← exploit(h, θ, p, P)  # 截断选择 + 复制权重\n\n                if θ != θ':               # 如果发生了替换\n                    # === Explore: LLM 替代随机扰动 ===\n                    context ← build_prompt(h', p, history, P)\n                    response ← llm_model.generate(context)  # CoT 推理\n                    h_new ← parse_hyperparams(response)      # 解析输出\n                    h_new ← validate_and_clip(h_new)          # 安全校验\n\n                    θ, h ← θ', h_new\n                    p ← eval(θ)\n\n            update P with (θ, h, p, t+1, history)\n\n    return θ with highest p in P\n\ndef build_prompt(h, p, history, P):\n    &quot;&quot;&quot;构造结构化 prompt 供 LLM 推理&quot;&quot;&quot;\n    prompt = f&quot;&quot;&quot;\n    You are an expert ML hyperparameter tuner.\n\n    ## Current State\n    - Hyperparameters: {format_dict(h)}\n    - Current performance: {p:.4f}\n    - Training step: {history[-1][0]}\n\n    ## Training History (recent 10 steps)\n    {format_history(history[-10:])}\n\n    ## Population Statistics\n    - Best performance: {max(m.p for m in P):.4f}\n    - Median performance: {median(m.p for m in P):.4f}\n    - Best member's hyperparams: {format_dict(best_member(P).h)}\n\n    ## Task\n    Analyze the training dynamics and suggest improved hyperparameters.\n    Think step by step:\n    1. Is the learning rate too high/low for this training stage?\n    2. Is regularization appropriate given the train/val gap?\n    3. What adjustments would most likely improve performance?\n\n    Output your suggested hyperparameters as JSON.\n    &quot;&quot;&quot;\n    return prompt\n</code></pre>\n<h5>方法细节</h5>\n<p><strong>动机与背景</strong></p>\n<p>PBT（Population Based Training）成功地将种群进化与梯度优化相结合，实现了在线超参数调度的自动发现。然而，PBT 的 explore 阶段依赖<strong>随机扰动</strong>（每个超参数独立地乘以 1.2 或 0.8，或从先验分布重采样），这种盲目探索存在明显局限：</p>\n<ul>\n<li><strong>无语义理解</strong>：随机扰动不理解超参数之间的关联（如学习率与 batch size 的耦合关系），也不理解训练阶段对超参数的不同需求</li>\n<li><strong>固定步长</strong>：±20% 的扰动幅度在训练早期可能太小（需要大范围探索），在训练后期可能太大（需要精细微调）</li>\n<li><strong>无历史利用</strong>：每次扰动独立于之前的尝试，无法从失败的探索中学习</li>\n</ul>\n<p>与此同时，大语言模型（LLM）展现出了强大的零样本推理能力。OPRO（Yang et al., 2024）证明 LLM 可以作为优化器，通过分析历史评估结果提出更好的解；FunSearch（Romera-Paredes et al., 2024）展示了 LLM 与进化搜索结合可以发现数学新知识。这些工作启发了一个自然的问题：<strong>能否用 LLM 的推理能力替代 PBT 中的随机扰动，实现有知识引导的超参数进化？</strong></p>\n<div class=\"key-point\">💡 <strong>关键洞察</strong>：AutoEP 的核心思想是——LLM 在预训练过程中已经\"阅读\"了大量关于机器学习训练技巧的论文和代码，因此它天然具备关于超参数调优的丰富知识。通过将训练状态编码为结构化 prompt，LLM 可以像一个经验丰富的研究员一样，分析训练动态并给出有理有据的超参数调整建议。</div>\n<p><strong>核心机制详解</strong></p>\n<p>AutoEP 保留了 PBT 的种群框架和 exploit 机制，核心创新集中在 explore 阶段的三个组件：</p>\n<p><strong>1. 结构化上下文构建（Context Builder）</strong></p>\n<p>为了让 LLM 有效推理，AutoEP 将种群的训练状态编码为结构化 prompt，包含四类信息：</p>\n<ul>\n<li><strong>当前超参数</strong>：被 exploit 后复制得到的超参数值（学习率、权重衰减、dropout 等）</li>\n<li><strong>训练轨迹摘要</strong>：最近 K 步的性能变化趋势（上升/下降/震荡）、训练损失与验证损失的差距（过拟合指标）</li>\n<li><strong>种群统计</strong>：最优/中位/最差成员的性能及其超参数配置，帮助 LLM 理解当前搜索空间的分布</li>\n<li><strong>任务描述</strong>：模型架构类型、数据集规模等元信息（可选）</li>\n</ul>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：prompt 的设计需要平衡信息量与 token 开销。过多的历史信息会增加推理成本且可能引入噪声，过少则无法支撑有效推理。AutoEP 采用<strong>滑动窗口 + 统计摘要</strong>的策略，将原始训练日志压缩为紧凑的结构化表示。</div>\n<p><strong>2. Chain-of-Thought 推理引擎（CoT Reasoning）</strong></p>\n<p>AutoEP 要求 LLM 在输出超参数之前，先进行显式的分步推理：</p>\n<ul>\n<li><strong>Step 1 — 诊断训练状态</strong>：判断当前是否过拟合/欠拟合、学习率是否合适、训练是否已进入平台期</li>\n<li><strong>Step 2 — 分析种群信息</strong>：比较当前成员与最优成员的超参数差异，识别可能的改进方向</li>\n<li><strong>Step 3 — 提出调整方案</strong>：基于诊断结果，给出具体的超参数修改值及理由</li>\n</ul>\n<p>这种 CoT 机制不仅提升了超参数建议的质量，还提供了<strong>可解释性</strong>——研究者可以阅读 LLM 的推理过程，理解为什么做出特定调整。</p>\n<p><strong>3. 输出解析与安全校验（Parser &amp; Validator）</strong></p>\n<p>LLM 的输出经过两层处理：\n- <strong>JSON 解析器</strong>：从 LLM 的自然语言输出中提取结构化的超参数值\n- <strong>安全校验器</strong>：确保输出值在合法范围内（如学习率 &gt; 0），对异常值进行裁剪（clip），并在 LLM 输出解析失败时回退到 PBT 的随机扰动作为兜底策略</p>\n<p><strong>与 PBT 的关键区别</strong></p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>PBT</th>\n<th>AutoEP</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Explore 策略</td>\n<td>随机扰动（×1.2/×0.8）或重采样</td>\n<td><strong>LLM Chain-of-Thought 推理</strong></td>\n</tr>\n<tr>\n<td>语义理解</td>\n<td>无</td>\n<td><strong>有</strong>（理解超参数含义与关联）</td>\n</tr>\n<tr>\n<td>步长自适应</td>\n<td>固定 ±20%</td>\n<td><strong>动态</strong>（LLM 根据训练阶段调整）</td>\n</tr>\n<tr>\n<td>历史利用</td>\n<td>无</td>\n<td><strong>有</strong>（prompt 包含训练轨迹）</td>\n</tr>\n<tr>\n<td>可解释性</td>\n<td>无</td>\n<td><strong>有</strong>（CoT 推理链可审查）</td>\n</tr>\n<tr>\n<td>额外开销</td>\n<td>无</td>\n<td>LLM 推理延迟（每次 explore ~1-3s）</td>\n</tr>\n<tr>\n<td>零样本泛化</td>\n<td>需手动设计扰动分布</td>\n<td><strong>跨任务通用</strong>（同一 prompt 模板）</td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>实验验证</strong></p>\n<p>AutoEP 在多个基准任务上与 PBT 及其他超参数优化方法进行对比：</p>\n<ul>\n<li><strong>图像分类</strong>（ResNet/ViT on ImageNet）：相比 PBT 的随机扰动，AutoEP 在相同种群规模下收敛速度提升约 <strong>30-40%</strong>，最终精度提升 0.3-0.5%</li>\n<li><strong>语言建模</strong>（Transformer on WikiText-103）：AutoEP 自动发现了先大后小的学习率 schedule 与逐步增加 dropout 的策略，困惑度（PPL）优于 PBT 约 1.5 点</li>\n<li><strong>强化学习</strong>（PPO on Atari）：在 Atari 游戏上，AutoEP 的种群多样性更高，避免了 PBT 中常见的种群坍缩（所有成员收敛到相同超参数）问题</li>\n</ul>\n<p>消融实验的关键发现：\n1. <strong>CoT vs 直接输出</strong>：要求 LLM 先推理再输出超参数，比直接输出超参数效果提升约 15%\n2. <strong>上下文信息量</strong>：包含种群统计信息比仅包含当前成员信息效果更好，但超过 10 步历史后收益递减\n3. <strong>LLM 规模效应</strong>：更大的 LLM（如 GPT-4 级别）比小模型（如 7B）产生更好的超参数建议，但 70B 级别模型已接近饱和\n4. <strong>回退机制必要性</strong>：约 5-8% 的情况下 LLM 输出解析失败，回退到随机扰动的兜底策略对系统鲁棒性至关重要</p>",
      "quiz": {
        "q": "AutoEP 相比 PBT 的核心创新是什么？",
        "options": [
          "用贝叶斯优化替代种群进化框架",
          "用 LLM 的 Chain-of-Thought 推理替代 explore 阶段的随机扰动",
          "取消 exploit 机制，完全依赖 LLM 生成超参数",
          "用强化学习训练一个超参数控制器"
        ],
        "answer": 1,
        "explain": "AutoEP 的核心创新是用 LLM 的 Chain-of-Thought 推理替代 PBT 中 explore 阶段的随机扰动（×1.2/×0.8），使超参数变异具备语义理解能力。AutoEP 保留了 PBT 的种群框架和 exploit 机制，仅升级了 explore 策略。它不使用贝叶斯优化，也不取消 exploit，更不需要训练额外的控制器。"
      }
    },
    {
      "id": "composer",
      "num": 20,
      "name": "Composer",
      "fullName": "混合架构搜索 (Composer: Hybrid Neural Architecture Search)",
      "year": "2026",
      "org": "ICLR 2026",
      "parent": "nasnet",
      "paperUrl": "https://openreview.net/forum?id=13934",
      "projectUrl": "",
      "category": "nas",
      "motivation": "模块化混合搜索+堆叠拉伸至8B",
      "summary": "Composer 提出了一种模块化混合架构搜索框架，在异构算子库（Attention、SSM、Conv、MLP 等）中搜索最优层级组合模式，并通过\"堆叠-拉伸\"缩放策略将搜索到的小型代理架构无损扩展至 8B 参数规模，在语言建模任务上以更低计算成本超越纯 Transformer 架构。",
      "keyPoints": [
        "<strong>异构算子搜索空间</strong>：定义包含 Multi-Head Attention、Grouped-Query Attention、Mamba-2 SSM、Gated Conv1D、SwiGLU MLP、Linear Attention 共 6 类算子的模块化搜索空间",
        "<strong>组合模式搜索（Composition Pattern Search）</strong>：以\"段（Segment）\"为单位搜索算子排列，每段包含 \\(K\\) 层，搜索最优的算子类型分配",
        "<strong>双阶段搜索策略</strong>：Stage-1 在 150M 代理模型上用进化搜索确定组合模式，Stage-2 通过超网络权重共享微调算子内部超参数",
        "<strong>堆叠-拉伸缩放法则（Stack-and-Stretch）</strong>：将搜索到的段模式重复堆叠增加深度，同时按幂律拉伸隐藏维度，从 150M 无损扩展至 8B",
        "<strong>缩放一致性定理</strong>：证明在特定初始化条件下，堆叠-拉伸保持各层梯度范数比例不变，保证训练稳定性",
        "<strong>多目标帕累托搜索</strong>：同时优化困惑度（PPL）、推理吞吐量（tokens/s）和峰值显存，输出帕累托前沿架构族",
        "<strong>搜索效率</strong>：仅需 256 GPU-hours 完成全部搜索（含 Stage-1 + Stage-2），约为同规模随机搜索的 1/40",
        "<strong>SOTA 结果</strong>：Composer-8B 在 C4/Pile 上以 6.8/7.2 PPL 超越同参数量 Llama 架构（7.3/7.8），推理吞吐量提升 1.7×"
      ],
      "detail": "<p><img alt=\"Composer 混合架构搜索框架\" src=\"https://production-media.paperswithcode.com/methods/composer_framework.png\" />\n<em>图：Composer 框架总览。左侧为异构算子库，中间为组合模式搜索过程（进化算法在代理模型上评估不同算子排列），右侧为堆叠-拉伸缩放策略将最优模式扩展至目标规模。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># Composer: 混合架构搜索流程\n# Stage 1: 组合模式搜索 (Evolutionary Search)\n\noperator_library = [MultiHeadAttn, GQA, Mamba2, GatedConv1D, SwiGLU, LinearAttn]\nsegment_length = K  # 每段包含 K 层 (e.g., K=4)\n\n# 初始化种群: 随机生成 P 个组合模式\npopulation = [random_composition(segment_length, operator_library) for _ in range(P)]\n\nfor generation in range(G):\n    # 评估每个候选架构 (150M proxy model, 训练 2B tokens)\n    fitness = []\n    for pattern in population:\n        model = build_proxy_model(pattern, hidden_dim=768, num_segments=6)\n        ppl = train_and_eval(model, data=&quot;C4_subset&quot;, tokens=2e9)\n        throughput = measure_throughput(model, batch_size=32, seq_len=2048)\n        fitness.append(pareto_score(ppl, throughput))\n\n    # 选择 + 交叉 + 变异\n    parents = tournament_select(population, fitness, top_k=P//4)\n    offspring = crossover(parents) + mutate(parents, prob=0.1)\n    population = elitism_merge(population, offspring, fitness)\n\nbest_pattern = pareto_front(population, fitness)[0]  # e.g., [Attn, Mamba2, Mamba2, GatedConv1D]\n\n# Stage 2: 堆叠-拉伸缩放至目标规模\ndef scale_to_target(pattern, target_params=8e9):\n    # 堆叠: 重复段模式直到达到目标深度\n    num_segments = compute_depth(target_params, pattern)  # e.g., 16 segments → 64 layers\n    # 拉伸: 按幂律扩展隐藏维度\n    hidden_dim = compute_width(target_params, num_segments)  # e.g., 4096\n    return build_model(pattern, hidden_dim, num_segments)\n\nfinal_model = scale_to_target(best_pattern, target_params=8e9)\n# 全量预训练 final_model on 2T tokens\n</code></pre>\n<h5>动机与背景</h5>\n<p>近年来，大语言模型（LLM）领域出现了一个重要趋势：<strong>纯 Transformer 架构并非所有场景的最优选择</strong>。Mamba、RWKV、Hyena 等亚二次复杂度模型在长序列建模上展现出优势，而实践中 Jamba、Zamba 等工作表明，混合架构（交替使用 Attention 和 SSM 层）往往能兼顾两者优点。</p>\n<p>然而，混合架构的设计面临两个核心挑战：</p>\n<ol>\n<li><strong>组合爆炸</strong>：假设有 6 种算子、64 层网络，可能的排列组合为 \\(6^{64} \\approx 10^{50}\\)，远超人工试错能力</li>\n<li><strong>缩放不确定性</strong>：在小规模验证的最优组合，放大后是否仍然最优？不同算子的缩放行为（scaling law）可能不同</li>\n</ol>\n<p>Composer 的核心洞察继承自 NASNet 的\"搜索-迁移\"范式：<strong>在小型代理模型上搜索最优的算子组合模式（而非完整架构），再通过理论保证的缩放法则扩展至目标规模</strong>。</p>\n<h5>核心机制：模块化组合搜索空间</h5>\n<p><strong>1. 异构算子库</strong></p>\n<p>Composer 定义了 6 种标准化算子模块，每种算子统一为相同的输入输出接口 \\(\\mathbf{x} \\in \\mathbb{R}^{B \\times L \\times D} \\to \\mathbf{y} \\in \\mathbb{R}^{B \\times L \\times D}\\)：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>算子</th>\n<th>复杂度</th>\n<th>特点</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Multi-Head Attention (MHA)</td>\n<td>\\(O(L^2 D)\\)</td>\n<td>全局依赖，KV cache 线性增长</td>\n</tr>\n<tr>\n<td>Grouped-Query Attention (GQA)</td>\n<td>\\(O(L^2 D)\\)</td>\n<td>减少 KV heads，推理更高效</td>\n</tr>\n<tr>\n<td>Mamba-2 SSM</td>\n<td>\\(O(LD)\\)</td>\n<td>线性复杂度，硬件友好的选择性扫描</td>\n</tr>\n<tr>\n<td>Gated Conv1D</td>\n<td>\\(O(LDk)\\)</td>\n<td>局部感受野，极低延迟</td>\n</tr>\n<tr>\n<td>SwiGLU MLP</td>\n<td>\\(O(LD_{\\text{ff}})\\)</td>\n<td>纯前馈，无序列交互</td>\n</tr>\n<tr>\n<td>Linear Attention</td>\n<td>\\(O(LD^2)\\)</td>\n<td>线性复杂度的全局注意力近似</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 关键：所有算子共享相同的 Pre-RMSNorm + Residual 包装结构，使得任意算子可在任意位置即插即用，搜索空间完全正交。</div>\n<p><strong>2. 段级组合模式（Segment-Level Composition）</strong></p>\n<p>与 NASNet 搜索 Cell 内部连接不同，Composer 搜索的是<strong>层级算子类型分配</strong>。网络被划分为等长的\"段\"，每段包含 \\(K\\) 层：</p>\n<p>$$\\text{Segment}(k_1, k_2, \\ldots, k_K) \\quad \\text{where } k_i \\in \\{\\text{MHA, GQA, Mamba2, Conv1D, SwiGLU, LinAttn}\\}$$</p>\n<p>整个网络由 \\(S\\) 个相同段重复堆叠构成：</p>\n<p>$$\\text{Network} = \\text{Embed} \\to \\underbrace{\\text{Seg} \\to \\text{Seg} \\to \\cdots \\to \\text{Seg}}_{S \\text{ 次}} \\to \\text{LM-Head}$$</p>\n<div class=\"warn-box\">⚠️ 注意：段内的算子排列顺序是搜索目标，但所有段共享相同模式——这是实现可缩放堆叠的关键约束。</div>\n<p><strong>3. 搜索空间规模分析</strong></p>\n<p>对于段长 \\(K=4\\)，6 种算子的排列数为：</p>\n<p>$$|\\mathcal{S}| = 6^K = 6^4 = 1296$$</p>\n<p>这比 NASNet 的 \\(10^{28}\\) 小得多，但每个候选需要实际训练评估，因此采用进化搜索而非穷举。加入算子内部超参数（如 attention head 数、SSM state 维度）后，有效搜索空间约为 \\(10^5\\)。</p>\n<h5>堆叠-拉伸缩放法则（Stack-and-Stretch）</h5>\n<p>这是 Composer 最核心的理论贡献。给定代理模型的最优段模式 \\(\\mathcal{P}^*\\)，如何将 150M 模型扩展至 8B？</p>\n<p><strong>堆叠（Stack）</strong>：增加段重复次数 \\(S\\)</p>\n<p>$$S_{\\text{target}} = S_{\\text{proxy}} \\cdot \\alpha_d, \\quad \\alpha_d = \\left(\\frac{N_{\\text{target}}}{N_{\\text{proxy}}}\\right)^{r_d}$$</p>\n<p><strong>拉伸（Stretch）</strong>：增加隐藏维度 \\(D\\)</p>\n<p>$$D_{\\text{target}} = D_{\\text{proxy}} \\cdot \\alpha_w, \\quad \\alpha_w = \\left(\\frac{N_{\\text{target}}}{N_{\\text{proxy}}}\\right)^{r_w}$$</p>\n<p>其中 \\(r_d + 2r_w \\approx 1\\)（因为参数量 \\(N \\propto S \\cdot D^2\\)），论文通过网格搜索确定最优比例为 \\(r_d = 0.4, r_w = 0.3\\)。</p>\n<p><strong>缩放一致性定理</strong>：</p>\n<p>$$\\text{若 } \\frac{\\|\\nabla_{\\ell} \\mathcal{L}\\|}{\\|\\nabla_{\\ell'} \\mathcal{L}\\|} = c_{\\ell,\\ell'} \\text{ 在 proxy 模型中成立，则在 Stack-and-Stretch 后仍成立}$$</p>\n<p>条件是使用 μP（Maximal Update Parameterization）初始化，并对不同算子类型使用各自的学习率乘子。这保证了小模型上的最优组合在放大后仍然是最优的。</p>\n<div class=\"key-point\">💡 关键：缩放一致性是 Composer 能够在 150M 上搜索、8B 上部署的理论基石。没有这一保证，代理模型的搜索结果可能在大规模上失效。</div>\n<h5>多目标进化搜索</h5>\n<p>Composer 使用 NSGA-II 风格的多目标进化算法，同时优化三个指标：</p>\n<ol>\n<li><strong>困惑度（PPL）</strong>：在 C4 验证集上评估语言建模质量</li>\n<li><strong>推理吞吐量</strong>：在 A100 GPU 上测量 tokens/s（batch=1, seq=2048）</li>\n<li><strong>峰值显存</strong>：推理时的 GPU 内存占用</li>\n</ol>\n<p>适应度函数为帕累托支配关系，最终输出一组帕累托前沿架构，用户可根据部署约束选择。</p>\n<p>搜索超参数：\n- 种群大小：\\(P = 128\\)\n- 进化代数：\\(G = 50\\)\n- 代理模型：150M 参数，训练 2B tokens（约 4 GPU-hours/个体）\n- 总搜索预算：128 × 4 × 50 / 并行度 ≈ 256 GPU-hours</p>\n<h5>实验结果与对比</h5>\n<p><strong>语言建模（8B 规模，2T tokens 训练）</strong>：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>模型</th>\n<th>架构类型</th>\n<th>参数量</th>\n<th>C4 PPL</th>\n<th>Pile PPL</th>\n<th>吞吐量 (tok/s)</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Llama-2</td>\n<td>纯 Transformer (GQA)</td>\n<td>7B</td>\n<td>7.3</td>\n<td>7.8</td>\n<td>4,200</td>\n</tr>\n<tr>\n<td>Mamba-2</td>\n<td>纯 SSM</td>\n<td>7.8B</td>\n<td>7.5</td>\n<td>7.9</td>\n<td>6,800</td>\n</tr>\n<tr>\n<td>Jamba</td>\n<td>手工混合 (Attn+Mamba)</td>\n<td>7.4B</td>\n<td>7.1</td>\n<td>7.5</td>\n<td>5,100</td>\n</tr>\n<tr>\n<td><strong>Composer-8B</strong></td>\n<td><strong>搜索混合</strong></td>\n<td><strong>8.0B</strong></td>\n<td><strong>6.8</strong></td>\n<td><strong>7.2</strong></td>\n<td><strong>7,100</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>搜索发现的最优模式</strong>（段长 K=4）：</p>\n<p>$$\\mathcal{P}^* = [\\text{GQA},\\; \\text{Mamba2},\\; \\text{Mamba2},\\; \\text{GatedConv1D}]$$</p>\n<p>即每 4 层中仅 1 层使用注意力机制，其余使用亚二次复杂度算子。这一比例（25% Attention）显著低于手工设计的混合架构（通常 50%），但在搜索验证中被证明是 PPL-吞吐量帕累托最优的。</p>\n<h5>与传统方法的区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th>NASNet (2018)</th>\n<th>DARTS (2019)</th>\n<th>Composer (2026)</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>搜索目标</td>\n<td>CNN Cell 内部连接</td>\n<td>CNN Cell 内部连接</td>\n<td>LLM 层级算子类型分配</td>\n</tr>\n<tr>\n<td>算子类型</td>\n<td>同构（卷积/池化）</td>\n<td>同构（卷积/池化）</td>\n<td>异构（Attn/SSM/Conv/MLP）</td>\n</tr>\n<tr>\n<td>搜索方法</td>\n<td>RL (PPO)</td>\n<td>梯度松弛</td>\n<td>多目标进化 (NSGA-II)</td>\n</tr>\n<tr>\n<td>缩放策略</td>\n<td>增加 N 和滤波器数</td>\n<td>增加 N 和滤波器数</td>\n<td>堆叠-拉伸 + μP + 缩放一致性定理</td>\n</tr>\n<tr>\n<td>目标规模</td>\n<td>~100M (ImageNet)</td>\n<td>~10M (CIFAR)</td>\n<td><strong>8B (LLM)</strong></td>\n</tr>\n<tr>\n<td>搜索成本</td>\n<td>2000 GPU-hours</td>\n<td>1 GPU-day</td>\n<td>256 GPU-hours</td>\n</tr>\n<tr>\n<td>多目标</td>\n<td>否</td>\n<td>否</td>\n<td>是（PPL + 吞吐 + 显存）</td>\n</tr>\n</tbody>\n</table></div>\n<p>Composer 的核心贡献在于将 NAS 的\"搜索-迁移\"范式从 CV 领域的同构算子搜索，推广到 LLM 领域的<strong>异构算子组合搜索</strong>，并通过缩放一致性定理解决了\"小模型搜索结果能否迁移到大模型\"这一关键问题。</p>",
      "quiz": {
        "q": "Composer 能够将 150M 代理模型的搜索结果可靠迁移到 8B 规模的关键理论保证是什么？",
        "options": [
          "使用 NSGA-II 多目标进化算法确保帕累托最优性",
          "所有算子共享 Pre-RMSNorm + Residual 包装结构",
          "堆叠-拉伸缩放法则在 μP 初始化下保持各层梯度范数比例不变（缩放一致性定理）",
          "段内算子排列顺序在所有段中保持一致"
        ],
        "answer": 2,
        "explain": "缩放一致性定理证明在 μP 初始化条件下，Stack-and-Stretch 操作保持各层梯度范数比例不变，确保小模型上的最优组合在放大后仍然最优，这是跨规模迁移的理论基石。"
      }
    },
    {
      "id": "jet_nemotron",
      "num": 21,
      "name": "Jet-Nemotron",
      "fullName": "后训练NAS (Jet-Nemotron: Post Neural Architecture Search)",
      "year": "2026",
      "org": "NVIDIA",
      "parent": "ofa",
      "paperUrl": "https://arxiv.org/abs/2508.15884v1",
      "projectUrl": "",
      "category": "nas",
      "motivation": "冻结权重后训练结构优化加速53x",
      "summary": "Jet-Nemotron 提出 PostNAS（后训练神经架构搜索）方法，通过四步系统化流程将预训练的全注意力 Transformer 转换为高效的混合注意力架构，在保持甚至超越原模型精度的同时实现高达 53× 的推理吞吐提升。",
      "keyPoints": [
        "提出 PostNAS 框架：后训练阶段对已有模型进行架构搜索，无需从头预训练",
        "四步搜索流程：全注意力层放置 → 线性注意力变体选择 → JetBlock 设计 → 硬件感知滑动窗口搜索",
        "JetBlock 设计：线性注意力 + 动态卷积（DyConv），用输入依赖的卷积核补偿线性注意力的局部建模缺陷",
        "关键发现：KV cache 大小是决定解码吞吐的主导因素，而非 FLOPs",
        "两阶段训练：第一阶段冻结 MLP 用蒸馏损失训练 50B tokens，第二阶段全模型训练 350B tokens",
        "模型家族：Jet-Nemotron-2B（基于 Qwen2.5-1.5B）和 Jet-Nemotron-4B（基于 Qwen2.5-3B）",
        "性能：Jet-Nemotron-2B 相比 Llama-3.2-3B 实现 53× 吞吐提升，相比 Qwen3-1.7B 实现 47× 吞吐提升，精度更优"
      ],
      "detail": "<p><img alt=\"Jet-Nemotron PostNAS 框架总览\" src=\"https://arxiv.org/html/2508.15884v1/x1.png\" />\n<em>图：PostNAS 四步搜索流程示意。从预训练的全注意力模型出发，逐步确定全注意力层位置、线性注意力变体、注意力块设计和滑动窗口层配置。</em></p>\n<pre><code class=\"language-python\"># PostNAS 四步搜索伪代码\ndef PostNAS(pretrained_model):\n    # Step 1: 确定保留全注意力的层（用检索任务评估）\n    full_attn_layers = search_full_attention_placement(\n        model=pretrained_model,\n        task=&quot;retrieval&quot;,  # NIAH/RULER\n        metric=&quot;accuracy&quot;\n    )\n\n    # Step 2: 选择最佳线性注意力变体（用困惑度评估）\n    linear_attn_type = select_linear_attention(\n        candidates=[&quot;HGRN2&quot;, &quot;GLA&quot;, &quot;DeltaNet&quot;, &quot;Mamba2&quot;, ...],\n        metric=&quot;perplexity&quot;,\n        data=&quot;pretraining_corpus&quot;\n    )\n\n    # Step 3: 设计 JetBlock（线性注意力 + 动态卷积）\n    jet_block = JetBlock(\n        linear_attention=linear_attn_type,\n        dynamic_conv=DyConv(kernel_size=searched)\n    )\n\n    # Step 4: 硬件感知搜索滑动窗口注意力层\n    swa_layers = hardware_aware_search(\n        model=model,\n        task=&quot;MMLU&quot;,\n        constraint=&quot;maximize_throughput&quot;\n    )\n\n    # 组装最终混合架构\n    hybrid_model = assemble(full_attn_layers, jet_block, swa_layers)\n\n    # 两阶段训练\n    stage1_train(hybrid_model, tokens=50B, freeze_mlp=True, loss=&quot;distillation&quot;)\n    stage2_train(hybrid_model, tokens=350B, freeze_mlp=False)\n\n    return hybrid_model\n</code></pre>\n<h5>动机与背景</h5>\n<p>大语言模型（LLM）的推理效率受限于标准 Transformer 中 softmax 注意力的 \\(O(n^2)\\) 复杂度和线性增长的 KV cache。虽然线性注意力、状态空间模型等替代方案已被提出，但它们通常需要从头预训练，且在关键能力（如长距离检索）上存在明显不足。</p>\n<div class=\"key-point\">💡 关键洞察：<strong>KV cache 大小是推理吞吐的决定性瓶颈</strong>，而非计算 FLOPs。即使模型参数量更大，只要 KV cache 足够小，解码吞吐就能大幅提升。</div>\n<p>PostNAS 的核心思路是：<strong>不从头训练，而是将已有的高质量全注意力模型\"改造\"为混合架构</strong>，通过系统化的搜索确定最优的层级配置，再用少量训练恢复精度。</p>\n<h5>Step 1：全注意力层放置</h5>\n<p>并非所有注意力层都可以被替换。论文发现，某些层对长距离信息检索至关重要。搜索策略如下：</p>\n<ol>\n<li>使用 Needle-in-a-Haystack（NIAH）和 RULER 等检索任务作为评估标准</li>\n<li>逐层测试：将某一层替换为线性注意力后，观察检索精度下降程度</li>\n<li>保留那些替换后精度显著下降的层作为全注意力层</li>\n</ol>\n<p>对于 Jet-Nemotron-2B（基于 Qwen2.5-1.5B 的 28 层），最终保留第 15 和第 20 层为全注意力层。对于 Jet-Nemotron-4B（基于 Qwen2.5-3B 的 36 层），保留第 18、21、33 层。</p>\n<h5>Step 2：线性注意力变体选择</h5>\n<p>在确定哪些层需要替换后，需要选择最优的线性注意力变体。论文比较了多种候选方案：</p>\n<ul>\n<li><strong>HGRN2</strong>：基于门控线性循环的模型</li>\n<li><strong>GLA</strong>（Gated Linear Attention）：门控线性注意力</li>\n<li><strong>DeltaNet</strong>：基于增量规则的线性注意力</li>\n<li><strong>Mamba2</strong>：结构化状态空间模型</li>\n</ul>\n<p>评估方法是将所有可替换层统一替换为某一变体，然后在预训练语料上测量困惑度（perplexity）。实验发现 <strong>DeltaNet</strong> 在困惑度指标上表现最优，因此被选为 JetBlock 的线性注意力组件。</p>\n<h5>Step 3：JetBlock 设计——线性注意力 + 动态卷积</h5>\n<p>JetBlock 是本文的核心架构创新。其设计动机来自对线性注意力局限性的分析：</p>\n<p>$$\\text{LinearAttn}(Q, K, V) = \\frac{\\phi(Q) \\cdot (\\phi(K)^T V)}{\\phi(Q) \\cdot \\phi(K)^T \\mathbf{1}}$$</p>\n<p>线性注意力通过将 softmax 替换为特征映射 \\(\\phi\\) 来实现线性复杂度，但这导致其<strong>局部建模能力不足</strong>——softmax 注意力天然具有的局部聚焦特性（近距离 token 获得更高权重）在线性注意力中丢失。</p>\n<div class=\"warn-box\">⚠️ 注意：线性注意力的固定大小状态无法精确保留所有历史信息，尤其是近距离的局部模式。</div>\n<p>为此，JetBlock 引入<strong>动态卷积（DyConv）</strong>来补偿局部建模能力：</p>\n<p>$$\\text{JetBlock}(X) = \\text{LinearAttn}(X) + \\text{DyConv}(X)$$</p>\n<p>动态卷积的核心是<strong>输入依赖的卷积核</strong>：</p>\n<p>$$\\text{DyConv}(X)_t = \\sum_{k=0}^{K-1} w_k(X_t) \\cdot X_{t-k}$$</p>\n<p>其中卷积核权重 \\(w_k(X_t)\\) 由当前输入动态生成（通过一个小型线性层），而非固定参数。这使得模型能够根据上下文自适应地聚焦局部信息。</p>\n<h5>Step 4：硬件感知滑动窗口注意力搜索</h5>\n<p>论文发现，某些任务（如 MMLU 等多选题）主要依赖 softmax 操作的模式匹配特性来将知识路由到选项。完全移除 softmax 会导致这类任务精度下降。</p>\n<p>解决方案是引入<strong>滑动窗口注意力（SWA）</strong>层——它保留了 softmax 的模式匹配能力，但窗口大小有限（如 4096 tokens），因此 KV cache 增长受限，不会显著影响吞吐。</p>\n<p>搜索策略：\n1. 以 MMLU 精度为目标，逐步添加 SWA 层\n2. 同时监控吞吐影响，确保添加的 SWA 层不会过度降低推理速度\n3. 最终 Jet-Nemotron-2B 使用 2 个 SWA 层，Jet-Nemotron-4B 使用 7 个 SWA 层</p>\n<h5>训练流程</h5>\n<p>训练分为两个阶段：</p>\n<p><strong>第一阶段（蒸馏，50B tokens）：</strong>\n- 冻结所有 MLP 层参数（保留原模型知识）\n- 仅训练新引入的线性注意力和动态卷积参数\n- 使用蒸馏损失，以原始全注意力模型为教师\n- 数据：Nemotron-CC + Redstone-QA</p>\n<p><strong>第二阶段（全模型训练，350B tokens）：</strong>\n- 解冻所有参数进行端到端训练\n- 加入更多高质量数学和代码数据\n- 总训练量仅为原始预训练的约 2%（Qwen2.5-1.5B 预训练用了 18T tokens）</p>\n<h5>与传统方法的区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th>传统混合模型</th>\n<th>PostNAS (Jet-Nemotron)</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>训练起点</td>\n<td>从头预训练</td>\n<td>复用已有预训练模型</td>\n</tr>\n<tr>\n<td>架构设计</td>\n<td>人工设计或简单规则</td>\n<td>系统化四步搜索</td>\n</tr>\n<tr>\n<td>搜索代价</td>\n<td>需要完整预训练验证</td>\n<td>仅需少量 token 评估</td>\n</tr>\n<tr>\n<td>训练成本</td>\n<td>数万亿 tokens</td>\n<td>400B tokens（~2%）</td>\n</tr>\n<tr>\n<td>吞吐优化</td>\n<td>关注 FLOPs</td>\n<td>关注 KV cache 大小</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 关键优势：PostNAS 将架构搜索与预训练解耦，使得任何高质量的全注意力模型都可以被高效地转换为混合架构，大幅降低了开发高效 LLM 的成本。</div>",
      "quiz": {
        "q": "Jet-Nemotron 中 JetBlock 引入动态卷积（DyConv）的主要目的是什么？",
        "options": [
          "减少模型参数量以提升推理速度",
          "补偿线性注意力在局部模式建模上的不足",
          "替代 MLP 层以降低计算复杂度",
          "增强模型在长距离检索任务上的能力"
        ],
        "answer": 1,
        "explain": "线性注意力用固定大小状态替代了 KV cache，丢失了 softmax 注意力天然的局部聚焦特性。动态卷积通过输入依赖的卷积核显式建模局部依赖，补偿了这一缺陷。"
      }
    }
  ],
  "categories": {
    "auto_feature": {
      "label": "自动特征工程",
      "color": "#43A047"
    },
    "hpo": {
      "label": "超参数优化",
      "color": "#1E88E5"
    },
    "nas": {
      "label": "神经网络结构搜索",
      "color": "#E53935"
    },
    "framework": {
      "label": "综合框架",
      "color": "#8E24AA"
    }
  },
  "projectUrls": {}
};
