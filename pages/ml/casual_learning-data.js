/**
 * casual_learning-data.js — 由 pipeline/build.py 于 2026-05-20 17:49:47 自动生成。
 * 源文件：content/ml/casual_learning.md
 * ⚠️  请勿手动修改；如需更新，修改源文档后重新编译。
 */
window.PAGE_CONFIG = {
  "meta": {
    "domain": "ml",
    "topic_id": "casual_learning",
    "topic_name": "因果学习与不确定性建模",
    "page_title": "因果学习与不确定性建模",
    "page_subtitle": "2026-05-20 版",
    "page_desc": "涵盖因果推断、反事实学习、不确定性量化与可靠预测的核心算法与前沿进展",
    "page_icon": "🔗",
    "hero_pills": [
      "因果推断",
      "反事实学习",
      "不确定性量化",
      "可靠预测"
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
        "id": "pc",
        "x": 100,
        "y": 100,
        "category": "causal_inference"
      },
      {
        "id": "psm",
        "x": 100,
        "y": 300,
        "category": "causal_inference"
      },
      {
        "id": "scm",
        "x": 200,
        "y": 200,
        "category": "causal_inference"
      },
      {
        "id": "ges",
        "x": 300,
        "y": 100,
        "category": "causal_inference"
      },
      {
        "id": "bbb",
        "x": 300,
        "y": 500,
        "category": "uncertainty"
      },
      {
        "id": "conformal_prediction",
        "x": 300,
        "y": 600,
        "category": "uncertainty"
      },
      {
        "id": "mc_dropout",
        "x": 400,
        "y": 500,
        "category": "uncertainty"
      },
      {
        "id": "counterfactual_explanation",
        "x": 400,
        "y": 350,
        "category": "counterfactual"
      },
      {
        "id": "counterfactual_fairness",
        "x": 400,
        "y": 250,
        "category": "counterfactual"
      },
      {
        "id": "temperature_scaling",
        "x": 400,
        "y": 650,
        "category": "uncertainty"
      },
      {
        "id": "deep_ensembles",
        "x": 500,
        "y": 500,
        "category": "uncertainty"
      },
      {
        "id": "notears",
        "x": 500,
        "y": 200,
        "category": "causal_inference"
      },
      {
        "id": "irm",
        "x": 500,
        "y": 300,
        "category": "robust_prediction"
      },
      {
        "id": "less_greedy_ges",
        "x": 600,
        "y": 100,
        "category": "causal_inference"
      },
      {
        "id": "cape",
        "x": 600,
        "y": 50,
        "category": "causal_inference"
      },
      {
        "id": "causal_llm",
        "x": 650,
        "y": 200,
        "category": "causal_inference"
      },
      {
        "id": "geometry_cp",
        "x": 650,
        "y": 600,
        "category": "uncertainty"
      },
      {
        "id": "pfn_ges",
        "x": 750,
        "y": 100,
        "category": "causal_inference"
      }
    ],
    "edges": [
      {
        "from": "scm",
        "to": "notears",
        "label": "连续优化"
      },
      {
        "from": "scm",
        "to": "irm",
        "label": "因果不变性"
      },
      {
        "from": "scm",
        "to": "counterfactual_fairness",
        "label": "公平性定义"
      },
      {
        "from": "scm",
        "to": "causal_llm",
        "label": "LLM融合"
      },
      {
        "from": "pc",
        "to": "ges",
        "label": "评分搜索"
      },
      {
        "from": "ges",
        "to": "less_greedy_ges",
        "label": "非贪婪"
      },
      {
        "from": "less_greedy_ges",
        "to": "pfn_ges",
        "label": "PFN加速"
      },
      {
        "from": "bbb",
        "to": "mc_dropout",
        "label": "简化采样"
      },
      {
        "from": "mc_dropout",
        "to": "deep_ensembles",
        "label": "多模型"
      },
      {
        "from": "conformal_prediction",
        "to": "geometry_cp",
        "label": "流形扩展"
      }
    ],
    "milestones": [
      "scm",
      "notears",
      "conformal_prediction"
    ]
  },
  "algos": [
    {
      "id": "scm",
      "num": 1,
      "name": "SCM",
      "fullName": "结构因果模型 (Structural Causal Model)",
      "year": "2000",
      "org": "加州大学洛杉矶分校",
      "parent": "—",
      "paperUrl": "https://ftp.cs.ucla.edu/pub/stat_ser/r391.pdf",
      "projectUrl": "",
      "category": "causal_inference",
      "motivation": "提出do-calculus理论，定义因果干预",
      "summary": "SCM 的核心目标是：提出do-calculus理论，定义因果干预。",
      "keyPoints": [
        "核心动机：提出do-calculus理论，定义因果干预",
        "代表机构：加州大学洛杉矶分校"
      ],
      "detail": "<p>提出do-calculus理论，定义因果干预</p>"
    },
    {
      "id": "pc",
      "num": 2,
      "name": "PC",
      "fullName": "PC算法 (PC Algorithm)",
      "year": "1993",
      "org": "卡内基梅隆大学",
      "parent": "—",
      "paperUrl": "https://philpapers.org/rec/SPICPA",
      "projectUrl": "",
      "category": "causal_inference",
      "motivation": "基于条件独立性检验的约束发现算法",
      "summary": "PC 算法通过条件独立性检验逐步删边并识别碰撞结构（collider），从观测数据中恢复因果有向无环图（DAG）的等价类，是约束型因果发现方法的奠基算法。相比 SGS 算法，PC 仅在当前骨架的邻居集合中搜索条件集，将稀疏图上的复杂度从指数级降为多项式级。",
      "keyPoints": [
        "<strong>约束型因果发现</strong>：利用条件独立性关系作为约束条件，从数据中恢复因果图结构",
        "<strong>三阶段流程</strong>：骨架发现（边删除） → 碰撞结构识别（v-structure） → 边方向传播",
        "<strong>邻居搜索优化</strong>：PC 算法仅在当前骨架的邻居集中搜索分离集，相比 SGS 的全集搜索大幅降低复杂度",
        "<strong>核心假设</strong>：因果马尔可夫性（Causal Markov Property）+ 忠实性（Faithfulness）+ 因果充分性（Causal Sufficiency）",
        "<strong>一致性保证</strong>：当条件独立性检验一致时，PC 算法以概率收敛到真实因果图",
        "<strong>等价类输出</strong>：输出完成的部分有向无环图（CPDAG），表示马尔可夫等价类中所有兼容的 DAG",
        "<strong>命名来源</strong>：Peter Spirtes 和 Clark Glymour 的首字母缩写（Peter-Clark）"
      ],
      "detail": "<h5>核心框架示意</h5>\n<pre><code>观测数据 → 条件独立性检验 → 骨架发现 → 碰撞识别 → 方向传播 → CPDAG\n     ↓              ↓              ↓           ↓           ↓\n  样本矩阵    统计检验(偏相关/   删除独立边    X→Z←Y     Meek规则\n              χ²/核方法)        保留依赖边    模式识别    递归定向\n</code></pre>\n<p><em>图：PC 算法的完整流程。从完全无向图出发，通过条件独立性检验逐步精炼，最终输出因果图的等价类表示（CPDAG）。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># PC Algorithm 伪代码\ndef PC_algorithm(V, CI_test, alpha):\n    &quot;&quot;&quot;\n    V: 变量集合 {X1, X2, ..., Xp}\n    CI_test: 条件独立性检验函数\n    alpha: 显著性水平\n    &quot;&quot;&quot;\n    # === 阶段1: 骨架发现 (Skeleton Discovery) ===\n    G = complete_undirected_graph(V)  # 从完全图开始\n    sep_set = {}  # 记录分离集\n    d = 0  # 条件集大小，从0开始递增\n\n    while d &lt;= max_degree(G):\n        for each edge (X, Y) in G:\n            # 关键优化：仅在X的邻居中搜索（排除Y）\n            neighbors = adj(G, X) \\ {Y}\n            for each subset S ⊆ neighbors, |S| = d:\n                if CI_test(X, Y | S) &gt; alpha:  # X ⊥ Y | S\n                    remove_edge(G, X, Y)\n                    sep_set[(X,Y)] = S\n                    break\n        d += 1\n\n    # === 阶段2: 碰撞结构识别 (V-structure Orientation) ===\n    for each triple (X, Z, Y) where X-Z-Y and X,Y not adjacent:\n        if Z not in sep_set[(X,Y)]:\n            orient as X → Z ← Y  # Z是碰撞节点\n\n    # === 阶段3: 方向传播 (Orientation Propagation, Meek Rules) ===\n    repeat until no change:\n        # Rule 1: X → Z - Y 且 X,Y不相邻 → Z → Y\n        # Rule 2: X → Z → Y 且 X - Y → X → Y\n        # Rule 3: X - Z → Y, X - W → Y, Z,W不相邻 → X → Y\n        apply_meek_rules(G)\n\n    return G  # CPDAG\n</code></pre>\n<h5>动机与背景</h5>\n<p><strong>核心问题</strong>：给定一组变量的观测数据（非实验数据），能否仅从统计关联中恢复变量间的因果关系？</p>\n<p>传统方法的局限：\n- <strong>随机对照实验</strong>（RCT）是因果推断的金标准，但在许多场景中不可行（伦理、成本、时间）\n- <strong>相关性≠因果性</strong>：仅凭相关矩阵无法区分 \\(X \\to Y\\)、\\(Y \\to X\\) 和 \\(X \\leftarrow Z \\to Y\\)\n- <strong>贝叶斯方法</strong>（如 K2 算法）需要已知变量排序，且计算代价高</p>\n<p>PC 算法的突破在于：利用<strong>忠实性假设</strong>，将因果图结构与条件独立性关系建立双射，从而可以通过统计检验反推因果结构。</p>\n<h5>核心理论基础</h5>\n<p><strong>1. 因果马尔可夫性 (Causal Markov Property)</strong></p>\n<p>在因果 DAG \\(G\\) 中，每个变量在给定其父节点后，与所有非后代变量条件独立：</p>\n<p>$$X \\perp\\!\\!\\!\\perp \\text{NonDesc}(X) \\mid \\text{Pa}(X)$$</p>\n<p>这意味着因果图编码了一组条件独立性约束。</p>\n<p><strong>2. d-分离 (d-separation)</strong></p>\n<p>d-分离是判断图中条件独立性的图论准则。路径 \\(X \\to \\cdots \\to Y\\) 被条件集 \\(S\\) 阻断，当且仅当路径上存在：\n- <strong>链/叉</strong>节点 \\(Z\\)（\\(X \\to Z \\to Y\\) 或 \\(X \\leftarrow Z \\to Y\\)）且 \\(Z \\in S\\)\n- <strong>碰撞</strong>节点 \\(Z\\)（\\(X \\to Z \\leftarrow Y\\)）且 \\(Z \\notin S\\) 且 \\(Z\\) 的后代均不在 \\(S\\) 中</p>\n<p>$$X \\perp\\!\\!\\!\\perp_G Y \\mid S \\iff \\text{所有} X\\text{-}Y \\text{路径被} S \\text{d-分离}$$</p>\n<p><strong>3. 忠实性 (Faithfulness)</strong></p>\n<p>分布 \\(P\\) 对图 \\(G\\) 忠实，意味着 \\(P\\) 中的条件独立性<strong>恰好</strong>是 \\(G\\) 中 d-分离所蕴含的那些——不多也不少：</p>\n<p>$$X \\perp\\!\\!\\!\\perp_P Y \\mid S \\iff X \\perp\\!\\!\\!\\perp_G Y \\mid S$$</p>\n<div class=\"key-point\">💡 关键：忠实性排除了\"巧合性\"的独立——即参数恰好取特殊值导致的非结构性独立。这使得我们可以从独立性关系唯一地反推图结构。</div>\n<p><strong>4. 碰撞结构的可辨识性</strong></p>\n<p>考虑三变量模式 \\(X - Z - Y\\)（X 和 Y 不直接相连）：\n- <strong>链</strong> \\(X \\to Z \\to Y\\)：\\(X \\perp\\!\\!\\!\\perp Y \\mid Z\\)（条件于 Z 后独立）\n- <strong>叉</strong> \\(X \\leftarrow Z \\to Y\\)：\\(X \\perp\\!\\!\\!\\perp Y \\mid Z\\)（条件于 Z 后独立）\n- <strong>碰撞</strong> \\(X \\to Z \\leftarrow Y\\)：\\(X \\perp\\!\\!\\!\\perp Y\\) 但 \\(X \\not\\!\\perp\\!\\!\\!\\perp Y \\mid Z\\)（条件于 Z 后<strong>反而依赖</strong>）</p>\n<div class=\"warn-box\">⚠️ 注意：碰撞结构（v-structure）是唯一可以从观测数据中区分方向的三变量模式。链和叉产生相同的独立性模式，因此属于同一马尔可夫等价类。</div>\n<h5>PC 与 SGS 的关键区别</h5>\n<p>SGS 算法（Spirtes-Glymour-Scheines）是 PC 的前身，两者的骨架发现结果相同，但搜索策略不同：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>SGS</th>\n<th>PC</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>条件集搜索范围</td>\n<td>所有其他变量的子集</td>\n<td>仅当前邻居的子集</td>\n</tr>\n<tr>\n<td>最坏复杂度</td>\n<td>\\(O(2^p)\\)</td>\n<td>\\(O(p^{d+2})\\)，\\(d\\) 为最大度</td>\n</tr>\n<tr>\n<td>稀疏图性能</td>\n<td>指数级</td>\n<td>多项式级</td>\n</tr>\n<tr>\n<td>正确性</td>\n<td>一致</td>\n<td>一致（等价于SGS）</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 关键：PC 算法的核心洞察是——如果 \\(X \\perp\\!\\!\\!\\perp Y \\mid S\\) 对某个集合 \\(S\\) 成立，那么必然存在一个仅包含 \\(X\\) 或 \\(Y\\) 的邻居的子集 \\(S'\\) 也使得 \\(X \\perp\\!\\!\\!\\perp Y \\mid S'\\) 成立。这一性质保证了仅搜索邻居集的充分性。</div>\n<h5>条件独立性检验的实现</h5>\n<p>PC 算法是模块化的——核心逻辑与具体的条件独立性检验方法解耦：</p>\n<p><strong>高斯线性情况</strong>：检验偏相关系数是否为零</p>\n<p>$$\\rho_{XY \\cdot S} = 0 \\iff X \\perp\\!\\!\\!\\perp Y \\mid S$$</p>\n<p>使用 Fisher z-变换构造检验统计量：</p>\n<p>$$z = \\frac{1}{2} \\sqrt{n - |S| - 3} \\cdot \\ln\\frac{1 + \\hat{\\rho}_{XY \\cdot S}}{1 - \\hat{\\rho}_{XY \\cdot S}} \\sim N(0,1) \\text{ under } H_0$$</p>\n<p><strong>离散情况</strong>：使用 \\(\\chi^2\\) 检验或 G-检验</p>\n<p><strong>非参数情况</strong>：核方法（KCIT）、互信息估计等</p>\n<h5>Meek 方向传播规则</h5>\n<p>在碰撞结构确定后，以下规则递归应用以确定更多边的方向：</p>\n<ul>\n<li><strong>Rule 1</strong>：若 \\(X \\to Y - Z\\) 且 \\(X, Z\\) 不相邻，则 \\(Y \\to Z\\)（避免产生新碰撞）</li>\n<li><strong>Rule 2</strong>：若 \\(X \\to Y \\to Z\\) 且 \\(X - Z\\)，则 \\(X \\to Z\\)（避免产生环）</li>\n<li><strong>Rule 3</strong>：若存在 \\(X - Y \\to Z\\) 和 \\(X - W \\to Z\\)，且 \\(Y, W\\) 不相邻，则 \\(X \\to Z\\)</li>\n</ul>\n<p>这些规则保证：(1) 不引入新的碰撞结构；(2) 不引入有向环；(3) 结果是唯一的 CPDAG。</p>\n<h5>一致性与局限性</h5>\n<p><strong>一致性定理</strong>：若条件独立性检验是一致的（即随样本量趋于无穷，检验功效趋于1），则：</p>\n<p>$$\\lim_{n \\to \\infty} \\Pr(\\hat{G}_n \\neq G) = 0$$</p>\n<p><strong>重要局限</strong>：\n1. <strong>无均匀一致性</strong>（Robins et al., 2003）：不存在对所有分布均匀收敛的因果发现方法——对手可以让依赖性任意弱\n2. <strong>因果充分性假设</strong>：若存在未观测的混杂变量，PC 算法可能产生错误结果（此时需使用 FCI 算法）\n3. <strong>忠实性假设</strong>：在参数空间中测度为零的集合上可能违反，但实践中可能出现近似违反\n4. <strong>检验顺序敏感性</strong>：有限样本下，不同的边检验顺序可能导致不同结果（稳定版 PC-stable 解决此问题）</p>",
      "quiz": {
        "q": "在PC算法中，碰撞结构(v-structure) X→Z←Y 的识别依据是什么？",
        "options": [
          "X和Y在给定Z后条件独立",
          "X和Y边缘独立，但在给定Z后条件依赖",
          "X和Y在给定Z后条件依赖，且Z不在X-Y的分离集中",
          "X和Y之间存在直接边"
        ],
        "answer": 2,
        "explain": "碰撞结构的识别需要两个条件：(1) X-Z-Y形成无向路径且X,Y不直接相邻；(2) 中间节点Z不在使X⊥Y的分离集中。这等价于条件于Z后X和Y变得依赖（explaining away效应），即选项C所述。"
      }
    },
    {
      "id": "ges",
      "num": 3,
      "name": "GES",
      "fullName": "贪婪等价搜索 (Greedy Equivalence Search)",
      "year": "2002",
      "org": "微软研究院",
      "parent": "pc",
      "paperUrl": "https://www.jmlr.org/papers/volume3/chickering02b/chickering02b.pdf",
      "projectUrl": "",
      "category": "causal_inference",
      "motivation": "在等价类空间贪婪搜索，优化BIC得分",
      "summary": "GES 提出了一种在 DAG 等价类（CPDAG）空间上进行两阶段贪婪搜索的因果结构学习算法，通过证明 Meek 猜想建立了等价类空间的连通性，并利用可分解评分准则（如 BIC）的局部一致性，证明了算法在大样本极限下能够正确识别生成模型的因果结构。",
      "keyPoints": [
        "<strong>搜索空间</strong>：在 DAG 等价类空间（而非单个 DAG 空间）上搜索，用完全偏向图（CPDAG / Completed PDAG）表示等价类状态",
        "<strong>两阶段贪婪搜索</strong>：Phase I（前向）从空图开始逐步加边，Phase II（后向）逐步删边，每步选择使评分增加最多的操作",
        "<strong>核心算子</strong>：Insert(X, Y, T) 在 CPDAG 上插入有向边 X→Y 并定向相关无向边；Delete(X, Y, H) 删除边并调整方向",
        "<strong>Meek 猜想证明</strong>：证明了若 DAG H 是 DAG G 的独立映射，则存在有限序列的覆盖边反转和单边添加操作将 G 变换为 H",
        "<strong>大样本一致性</strong>：在数据由 DAG-perfect 分布生成且评分准则局部一致的条件下，GES 渐近收敛到真实等价类",
        "<strong>评分准则</strong>：使用可分解（decomposable）且等价（score-equivalent）的评分准则，如 BIC / BDeu，支持局部评分缓存加速",
        "<strong>算子有效性条件</strong>：Insert 要求 \\(NA_{Y,X} \\cup T\\) 为团且 Y 到 X 的每条半有向路径经过 \\(NA_{Y,X} \\cup T\\) 中的节点；Delete 要求 \\(NA_{Y,X} \\setminus H\\) 为团"
      ],
      "detail": "<h5>背景与动机</h5>\n<p>因果结构学习（Causal Structure Learning）旨在从观测数据中恢复变量间的因果关系，通常表示为有向无环图（DAG）。基于评分的方法通过定义评分函数（如 BIC、BDeu）对候选 DAG 结构打分，搜索最优结构。然而，DAG 空间存在两个核心挑战：</p>\n<ol>\n<li><strong>等价类问题</strong>：多个 DAG 可能编码完全相同的条件独立关系（即属于同一 Markov 等价类），在观测数据下不可区分。在单个 DAG 空间（D-space）搜索会导致大量冗余。</li>\n<li><strong>搜索空间爆炸</strong>：n 个变量的 DAG 数量超指数增长（8 个变量就有超过 7000 亿个 DAG），即使贪婪搜索也面临巨大的邻域评估开销。</li>\n</ol>\n<p>此前的方法包括：\n- <strong>D-space 搜索</strong>：直接在 DAG 空间上搜索（Heckerman et al., 1995），使用加边、删边、翻转边操作，但无法保证找到全局最优\n- <strong>E-space 搜索</strong>：在等价类空间搜索（Chickering, 1996），但缺乏理论最优性保证\n- <strong>约束方法（PC 算法）</strong>：通过条件独立性检验构建骨架和 v-结构，但对检验错误敏感</p>\n<p>GES 的核心动机是：<strong>能否设计一种在等价类空间上的贪婪搜索算法，使其在大样本极限下保证找到真实因果结构？</strong></p>\n<h5>关键概念</h5>\n<p><strong>DAG 等价类与 CPDAG</strong>：两个 DAG 属于同一等价类，当且仅当它们具有相同的骨架（skeleton）和相同的 v-结构（v-structures）集合。每个等价类可以用一个完全偏向图（Completed PDAG, CPDAG）唯一表示：\n- 有向边 \\(X \\to Y\\)：表示该边在等价类中所有 DAG 中方向一致\n- 无向边 \\(X - Y\\)：表示该边在不同 DAG 中可以有不同方向</p>\n<p><strong>覆盖边（Covered Edge）</strong>：DAG 中的边 \\(X \\to Y\\) 是覆盖的，当且仅当 \\(Pa(Y) = Pa(X) \\cup \\{X\\}\\)。覆盖边可以安全反转而不改变等价类。</p>\n<p><strong>可分解评分准则</strong>：评分函数 \\(S(G, D)\\) 可以分解为各节点的局部评分之和：</p>\n<p>$$S(G, D) = \\sum_{i=1}^{n} s(X_i, Pa_G(X_i), D)$$</p>\n<p>这使得每次操作只需重新计算受影响节点的局部评分，大幅降低计算开销。</p>\n<p><strong>局部一致性（Local Consistency）</strong>：设 \\(G'\\) 是在 \\(G\\) 中添加边 \\(X_i \\to X_j\\) 得到的 DAG，则在大样本极限下：\n1. 若 \\(X_j \\not\\perp\\!\\!\\!\\perp_p X_i \\mid Pa_G(X_j)\\)，则 \\(S(G', D) > S(G, D)\\)（添加消除了一个不成立的独立约束）\n2. 若 \\(X_j \\perp\\!\\!\\!\\perp_p X_i \\mid Pa_G(X_j)\\)，则 \\(S(G', D) < S(G, D)\\)（添加引入了冗余参数）</p>\n<h5>Meek 猜想与等价类空间连通性</h5>\n<p>GES 的理论基础建立在 <strong>Meek 猜想</strong>（1997）的证明之上：</p>\n<blockquote>\n<p><strong>定理 4（Meek 猜想）</strong>：设 DAG H 是 DAG G 的独立映射（即 G 蕴含的每个独立关系 H 也蕴含），则存在一个有限操作序列，包含覆盖边反转和单边添加，将 G 变换为 H，且序列中每一步都保持 DAG 性质和独立映射关系。</p>\n</blockquote>\n<p>这个定理保证了等价类空间在 Insert 操作下的连通性：从任何等价类出发，都可以通过一系列单边添加（加上必要的覆盖边反转）到达包含真实分布的等价类。</p>\n<p>证明的核心算法 <strong>Apply-Edge-Operation</strong> 的工作流程：\n1. 找到同时是 G 和 H 中汇节点（sink）的节点 Y\n2. 若 Y 在 G 中无子节点但在 H 中有额外父节点，直接添加边\n3. 否则，找到 Y 的后代 D，通过覆盖边反转将 Y→D 路径上的边逐步反转，使 D 成为 Y 的父节点\n4. 重复直到 G = H</p>\n<h5>GES 算法伪代码</h5>\n<pre><code>算法: GES (Greedy Equivalence Search)\n输入: 数据集 D, 可分解评分准则 S\n输出: 等价类 E（以 CPDAG 表示）\n\n# Phase I: 前向搜索（加边）\nE ← 空图对应的等价类\nrepeat:\n    对 E 的 CPDAG 中每对非邻接节点 (X, Y):\n        对 Y 的邻居中不与 X 邻接的子集 T:\n            若 Insert(X, Y, T) 有效（NA_{Y,X} ∪ T 为团 且 半有向路径条件满足）:\n                计算 ΔScore = s(Y, Pa_new(Y)) - s(Y, Pa_old(Y))\n                              + Σ_{Z∈T} [s(Z, Pa_new(Z)) - s(Z, Pa_old(Z))]\n    选择使 ΔScore 最大且 &gt; 0 的操作执行\nuntil 无操作能增加评分\n\n# Phase II: 后向搜索（删边）\nrepeat:\n    对 E 的 CPDAG 中每对邻接节点 (X, Y):\n        对 NA_{Y,X} 的子集 H:\n            若 Delete(X, Y, H) 有效（NA_{Y,X} \\ H 为团）:\n                计算 ΔScore（类似上述）\n    选择使 ΔScore 最大且 &gt; 0 的操作执行\nuntil 无操作能增加评分\n\nreturn E\n</code></pre>\n<h5>Insert 与 Delete 算子详解</h5>\n<p><strong>Insert(X, Y, T) 算子</strong>：\n- <strong>前提</strong>：X 和 Y 在 CPDAG 中不邻接\n- <strong>参数</strong>：T 是 Y 的邻居中不与 X 邻接的节点子集\n- <strong>操作</strong>：(1) 插入有向边 X→Y；(2) 将 T 中每个节点与 Y 之间的无向边定向为 T→Y\n- <strong>有效性条件</strong>：\n  - \\(NA_{Y,X} \\cup T\\) 构成团（clique）\n  - 从 Y 到 X 的每条半有向路径（semi-directed path）都经过 \\(NA_{Y,X} \\cup T\\) 中的某个节点</p>\n<div class=\"key-point\">💡 <strong>关键直觉</strong>：Insert 操作本质上是在等价类层面添加一条边。T 的选择决定了哪些原本无向的边需要被定向（因为新加的边可能引入新的 v-结构）。有效性条件确保操作后的图仍然是合法的 CPDAG。</div>\n<p><strong>Delete(X, Y, H) 算子</strong>：\n- <strong>前提</strong>：X 和 Y 在 CPDAG 中邻接（有向或无向边）\n- <strong>参数</strong>：H 是 \\(NA_{Y,X}\\) 的子集（保留为邻居的节点）\n- <strong>操作</strong>：(1) 删除 X 和 Y 之间的边；(2) 将 \\(NA_{Y,X} \\setminus H\\) 中每个节点与 Y 之间的无向边定向\n- <strong>有效性条件</strong>：\\(NA_{Y,X} \\setminus H\\) 构成团</p>\n<h5>评分增量的高效计算</h5>\n<p>由于评分准则的可分解性，每次 Insert 或 Delete 操作只影响少数节点的局部评分。具体地：</p>\n<p>对于 Insert(X, Y, T)，评分变化为：</p>\n<p>$$\\Delta S = s(Y, Pa_{new}(Y)) - s(Y, Pa_{old}(Y))$$</p>\n<p>其中 \\(Pa_{new}(Y) = Pa_{old}(Y) \\cup \\{X\\} \\cup T\\)。类似地，T 中节点的父节点集也会改变。</p>\n<p>GES 实现中缓存每个节点的局部评分，使得评估单个操作的时间复杂度仅依赖于受影响节点的父节点集大小，而非整个网络。</p>\n<h5>大样本最优性证明思路</h5>\n<p>GES 的最优性证明分两步：</p>\n<p><strong>Phase I 正确性（Lemma 9）</strong>：在大样本极限下，Phase I 结束时的等价类 E 包含（contain）真实分布 p。即 E 中的 DAG 蕴含的所有独立关系在 p 中都成立。</p>\n<p>证明利用了 DAG-perfect 分布满足的合成公理（composition axiom）的逆否命题：若 X 不独立于集合 <strong>Y</strong> 给定 <strong>Z</strong>，则存在 Y∈<strong>Y</strong> 使得 X 不独立于 Y 给定 <strong>Z</strong>。这保证了只要存在缺失的依赖关系，总能找到一个 Insert 操作来增加评分。</p>\n<p><strong>Phase II 正确性（Theorem 12）</strong>：Phase II 结束时的等价类是真实分布的完美映射（perfect map）。</p>\n<p>证明利用 Theorem 4（Meek 猜想）：如果 Phase II 的结果不是完美映射，则存在某个 Delete 操作可以增加评分（因为存在冗余的依赖关系），与局部最大值矛盾。</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：大样本一致性要求数据由 DAG-perfect 分布生成（即存在一个 DAG 完美表示该分布的所有独立关系）。若真实分布不是 DAG-perfect（如存在隐变量导致的非忠实性），GES 不保证找到正确结构。</div>\n<h5>与传统方法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>D-space 搜索</th>\n<th>E-space 搜索</th>\n<th>PC 算法</th>\n<th><strong>GES</strong></th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>搜索空间</td>\n<td>单个 DAG</td>\n<td>等价类</td>\n<td>—</td>\n<td>等价类</td>\n</tr>\n<tr>\n<td>方法类型</td>\n<td>基于评分</td>\n<td>基于评分</td>\n<td>基于约束</td>\n<td>基于评分</td>\n</tr>\n<tr>\n<td>大样本一致性</td>\n<td>✗</td>\n<td>✗</td>\n<td>✓</td>\n<td><strong>✓</strong></td>\n</tr>\n<tr>\n<td>操作</td>\n<td>加/删/翻转边</td>\n<td>等价类操作</td>\n<td>条件独立检验</td>\n<td>Insert/Delete</td>\n</tr>\n<tr>\n<td>评分等价性</td>\n<td>不保证</td>\n<td>保证</td>\n<td>—</td>\n<td><strong>保证</strong></td>\n</tr>\n<tr>\n<td>冗余搜索</td>\n<td>多（同一等价类多次访问）</td>\n<td>少</td>\n<td>—</td>\n<td><strong>少</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p>GES 相比 D-space 搜索的核心优势：\n1. <strong>避免冗余</strong>：等价类空间远小于 DAG 空间\n2. <strong>理论保证</strong>：大样本下保证找到真实结构\n3. <strong>评分等价性</strong>：同一等价类中的 DAG 评分相同，不会在等价 DAG 间无意义跳转</p>\n<h5>实验验证</h5>\n<p><strong>合成数据实验</strong>：基于 13 变量的 MediaMetrix 数据集结构生成 100 个金标准网络，在 500-10000 样本量范围内比较 GES、D-space 和 E-space 搜索。结果显示 GES 在识别真实等价类方面显著优于其他两种方法，且随样本量增加优势更明显。</p>\n<p><strong>真实数据实验</strong>：在 6 个数据集上评估（MSWeb/292变量、Nielsen、EachMovie、MediaMetrix/13变量、HouseVotes/16变量、Mushroom/22变量），使用 BDeu 评分和 70/30 训练/测试划分。GES 在大多数数据集上取得了与 D-space 和 E-space 搜索相当或更优的测试集对数似然，同时搜索效率更高。</p>",
      "quiz": {
        "q": "GES 算法 Phase I（前向搜索）结束时，关于当前等价类 E 与真实分布 p 的关系，以下哪项在大样本极限下成立？",
        "options": [
          "E 是 p 的完美映射（perfect map）",
          "E 包含 p（即 E 中 DAG 蕴含的所有独立关系在 p 中成立）",
          "E 与 p 的真实等价类完全相同",
          "E 中的 DAG 边数等于真实 DAG 的边数"
        ],
        "answer": 1,
        "explain": "Phase I 结束时 E 包含（contain）真实分布，即 E 可能有多余的边但不会缺少必要的依赖关系。完美映射需要等到 Phase II 删除冗余边后才能达到。"
      }
    },
    {
      "id": "notears",
      "num": 4,
      "name": "NOTEARS",
      "fullName": "NOTEARS (DAGs with NO TEARS)",
      "year": "2018",
      "org": "卡内基梅隆大学",
      "parent": "scm",
      "paperUrl": "https://arxiv.org/abs/1803.01422",
      "projectUrl": "",
      "category": "causal_inference",
      "motivation": "将DAG约束转化为连续可微函数",
      "summary": "NOTEARS 提出了一种全新的连续优化方法来学习有向无环图（DAG）结构：通过矩阵指数的迹函数 \\(h(W) = \\text{tr}(e^{W \\circ W}) - d\\) 将组合式的无环约束转化为光滑等式约束，从而将传统的 NP-hard 组合搜索问题转化为标准的连续约束优化问题，可直接使用 L-BFGS 等数值优化器求解。",
      "keyPoints": [
        "<strong>无环性的连续刻画</strong>：提出 \\(h(W) = \\text{tr}(e^{W \\circ W}) - d = 0\\) 作为 DAG 的充要条件，将离散的无环约束转化为光滑可微的等式约束",
        "<strong>连续优化框架</strong>：将结构学习从组合搜索空间转移到实数矩阵空间 \\(\\mathbb{R}^{d \\times d}\\)，使用增广拉格朗日方法（Augmented Lagrangian）求解",
        "<strong>评分函数</strong>：采用最小二乘损失 \\(F(W) = \\frac{1}{2n}\\|X - XW\\|_F^2\\) 作为评分函数，支持 \\(\\ell_1\\) 正则化实现稀疏性",
        "<strong>矩阵指数与闭合游走</strong>：利用矩阵幂的迹与图中闭合游走数量的关系，通过矩阵指数重新加权实现数值稳定的无环性判定",
        "<strong>极简实现</strong>：整个算法仅需约 50 行 Python 代码，无需图模型领域知识",
        "<strong>无结构假设</strong>：不要求图具有有界树宽或有界入度等结构限制，适用于一般 DAG",
        "<strong>实验验证</strong>：在 ER 和 SF 随机图上，多种噪声模型下（Gaussian、Exponential、Gumbel），SHD 指标显著优于 FGS（GES 的快速实现）"
      ],
      "detail": "<h5>问题背景与动机</h5>\n<p>从观测数据中学习有向无环图（DAG）的结构是机器学习和因果推断中的核心问题。DAG（也称贝叶斯网络）广泛应用于生物学、遗传学和因果推断等领域。然而，DAG 结构学习是一个 NP-hard 问题，其核心困难在于：</p>\n<ol>\n<li><strong>搜索空间超指数增长</strong>：\\(d\\) 个节点的 DAG 数量随 \\(d\\) 超指数增长（例如 5 个节点有 29281 个 DAG）</li>\n<li><strong>无环约束的组合性</strong>：传统方法必须在离散的 DAG 空间中搜索，依赖各种局部启发式策略（如贪心搜索、爬山法）来强制满足无环性</li>\n</ol>\n<p>传统的基于评分的方法（如 GES、Hill-Climbing）在离散空间中进行贪心搜索，面临局部最优和可扩展性问题。基于约束的方法（如 PC 算法）通过条件独立性检验推断图结构，但对检验误差敏感。NOTEARS 的核心动机是：<strong>能否将离散的无环约束转化为连续可微的约束，从而利用成熟的连续优化工具？</strong></p>\n<h5>核心示意图</h5>\n<p><img alt=\"NOTEARS 结构学习示例\" src=\"https://ar5iv.labs.arxiv.org/html/1803.01422v6/assets/x1.png\" />\n<em>图：NOTEARS 在 ER-2 随机图上的结构学习结果。(a) 真实图结构；(b) n=1000 样本时的估计结果，权重矩阵与真实值高度一致。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># NOTEARS 算法核心流程\n# 输入: 数据矩阵 X ∈ R^{n×d}, 初始 W_0, α_0, 进度率 c, 容差 ε, 阈值 ω\n# 输出: 估计的 DAG 邻接矩阵 W_hat\n\ndef notears(X, lambda1=0.1, max_iter=100, h_tol=1e-8, w_threshold=0.3):\n    d = X.shape[1]\n    W = np.zeros((d, d))          # 初始化权重矩阵\n    alpha = 0.0                    # 拉格朗日乘子\n    rho = 1.0                      # 惩罚参数\n\n    for t in range(max_iter):\n        # Step (a): 求解原始子问题 — 最小化增广拉格朗日函数\n        # L^ρ(W, α) = F(W) + (ρ/2)|h(W)|² + α·h(W)\n        W_new = minimize(augmented_lagrangian, W, args=(X, alpha, rho))\n\n        # 确保 h(W) 充分下降: h(W_new) &lt; c * h(W_old)\n        while h(W_new) &gt;= c * h(W):\n            rho *= 10              # 增大惩罚参数\n            W_new = minimize(augmented_lagrangian, W, args=(X, alpha, rho))\n\n        # Step (b): 对偶上升 — 更新拉格朗日乘子\n        alpha = alpha + rho * h(W_new)\n\n        # Step (c): 收敛判断\n        W = W_new\n        if h(W) &lt; h_tol:\n            break\n\n    # Step 3: 阈值化 — 去除小权重边\n    W_hat = W * (np.abs(W) &gt; w_threshold)\n    return W_hat\n\ndef h(W):\n    &quot;&quot;&quot;无环性约束: h(W) = tr(e^{W∘W}) - d&quot;&quot;&quot;\n    return np.trace(scipy.linalg.expm(W * W)) - W.shape[0]\n\ndef F(W, X):\n    &quot;&quot;&quot;最小二乘评分函数&quot;&quot;&quot;\n    n = X.shape[0]\n    R = X - X @ W\n    return 0.5 / n * np.sum(R ** 2)\n</code></pre>\n<h5>方法细节深入解析</h5>\n<p><strong>1. 无环性的连续刻画 — 从离散到连续的关键突破</strong></p>\n<p>NOTEARS 的核心贡献是发现了一个光滑函数 \\(h: \\mathbb{R}^{d \\times d} \\to \\mathbb{R}\\)，其零水平集恰好对应所有 DAG。推导过程分两步：</p>\n<p><strong>第一步：二值邻接矩阵的情形。</strong> 对于二值矩阵 \\(B \\in \\{0,1\\}^{d \\times d}\\)，矩阵幂 \\(B^k\\) 的迹 \\(\\text{tr}(B^k)\\) 恰好等于图中长度为 \\(k\\) 的闭合游走数量。因此，图无环当且仅当所有长度的闭合游走数为零：</p>\n<p>$$\\text{tr}(B^k) = 0, \\quad \\forall k = 1, 2, \\ldots, d$$</p>\n<p>利用矩阵指数的定义 \\(e^B = \\sum_{k=0}^{\\infty} \\frac{B^k}{k!}\\)，可以将上述无穷多个条件压缩为一个等式：</p>\n<p>$$h(B) = \\text{tr}(e^B) - d = 0$$</p>\n<div class=\"key-point\">💡 <strong>直觉</strong>：矩阵指数 \\(e^B\\) 对各阶闭合游走数按 \\(1/k!\\) 重新加权求和。如果图中没有环，则所有 \\(\\text{tr}(B^k) = 0\\)（\\(k \\geq 1\\)），因此 \\(\\text{tr}(e^B) = \\text{tr}(I) = d\\)，即 \\(h(B) = 0\\)。反之，任何环都会使 \\(h(B) > 0\\)。</div>\n<p><strong>第二步：扩展到实值加权矩阵。</strong> 上述刻画对二值矩阵成立，但对含负权重的实值矩阵 \\(W\\) 不直接适用（负权重可能导致闭合游走贡献相消）。解决方案是使用 Hadamard 积 \\(W \\circ W\\)（逐元素平方），确保所有权重非负：</p>\n<p>$$h(W) = \\text{tr}(e^{W \\circ W}) - d = 0$$</p>\n<div class=\"warn-box\">⚠️ <strong>关键性质</strong>：\\(h(W) \\geq 0\\) 对所有 \\(W\\) 成立，且 \\(h(W) = 0\\) 当且仅当 \\(W\\) 对应的图是 DAG。这意味着 DAG 集合恰好是 \\(h\\) 的全局最小值点集。</div>\n<p>其梯度具有简洁的解析形式：</p>\n<p>$$\\nabla h(W) = (e^{W \\circ W})^T \\circ 2W$$</p>\n<p>计算复杂度为 \\(O(d^3)\\)，与矩阵指数运算相同，可利用成熟的数值库（如 <code>scipy.linalg.expm</code>）高效计算。</p>\n<p><strong>2. 评分函数与优化目标</strong></p>\n<p>对于线性结构方程模型（SEM）\\(X = W^T X + z\\)，其中 \\(z\\) 是噪声向量，NOTEARS 采用最小二乘评分函数：</p>\n<p>$$F(W) = \\frac{1}{2n} \\|X - XW\\|_F^2$$</p>\n<p>加入 \\(\\ell_1\\) 正则化以促进稀疏性后，完整的等式约束优化问题（ECP）为：</p>\n<p>$$\\min_{W \\in \\mathbb{R}^{d \\times d}} \\frac{1}{2n} \\|X - XW\\|_F^2 + \\lambda \\|W\\|_1 \\quad \\text{subject to} \\quad h(W) = 0$$</p>\n<div class=\"key-point\">💡 <strong>与无向图模型的类比</strong>：无向图的结构学习可通过 log-det 规划（凸优化）高效求解，这一连续化思路催生了 Graphical Lasso 等一系列突破。NOTEARS 将类似的连续化思想引入有向图，但由于无环约束的非凸性，问题本质上是非凸的。</div>\n<p><strong>3. 增广拉格朗日求解框架</strong></p>\n<p>NOTEARS 使用增广拉格朗日方法将等式约束问题转化为一系列无约束子问题。增广拉格朗日函数定义为：</p>\n<p>$$L^{\\rho}(W, \\alpha) = F(W) + \\frac{\\rho}{2} |h(W)|^2 + \\alpha \\cdot h(W)$$</p>\n<p>其中 \\(\\alpha\\) 是拉格朗日乘子，\\(\\rho > 0\\) 是二次惩罚参数。算法交替执行：</p>\n<ul>\n<li><strong>原始最小化</strong>：固定 \\(\\alpha\\)，用 L-BFGS 求解 \\(\\min_W L^{\\rho}(W, \\alpha)\\)</li>\n<li><strong>对偶上升</strong>：更新 \\(\\alpha \\leftarrow \\alpha + \\rho \\cdot h(W)\\)</li>\n<li><strong>进度控制</strong>：要求每步 \\(h(W_{t+1}) < c \\cdot h(W_t)\\)，若不满足则增大 \\(\\rho\\)</li>\n</ul>\n<p>增广拉格朗日方法的优势在于：不需要将惩罚参数 \\(\\rho\\) 推到无穷大即可获得约束问题的良好近似解。实验中通常只需不到 10 步外层迭代即可收敛。</p>\n<p><strong>4. 与传统方法的关键区别</strong></p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>传统方法（GES/PC）</th>\n<th>NOTEARS</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>搜索空间</td>\n<td>离散 DAG 空间</td>\n<td>连续实数矩阵空间 \\(\\mathbb{R}^{d \\times d}\\)</td>\n</tr>\n<tr>\n<td>无环约束</td>\n<td>局部启发式检查</td>\n<td>全局光滑等式约束 \\(h(W)=0\\)</td>\n</tr>\n<tr>\n<td>优化方法</td>\n<td>贪心搜索/条件独立检验</td>\n<td>L-BFGS + 增广拉格朗日</td>\n</tr>\n<tr>\n<td>结构假设</td>\n<td>部分方法需有界树宽/入度</td>\n<td>无需任何结构假设</td>\n</tr>\n<tr>\n<td>输出</td>\n<td>CPDAG（等价类）</td>\n<td>加权邻接矩阵（含权重）</td>\n</tr>\n<tr>\n<td>实现复杂度</td>\n<td>需要图搜索专用代码</td>\n<td>~50 行 Python，调用标准优化库</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 <strong>核心优势</strong>：NOTEARS 将 DAG 学习从\"图搜索问题\"转变为\"数值优化问题\"，使得整个机器学习和数值优化社区的工具和理论都可以直接应用。</div>",
      "quiz": {
        "q": "NOTEARS 中无环性约束 h(W) = tr(e^{W∘W}) - d = 0 的核心原理是什么？",
        "options": [
          "矩阵指数的特征值之和等于节点数当且仅当图无环",
          "矩阵幂的迹计数闭合游走数，矩阵指数将各阶游走按 1/k! 加权求和，无环时恰好等于 d",
          "Hadamard 积使得负权重变为正权重，从而消除所有环",
          "矩阵指数的行列式为零当且仅当图中存在环"
        ],
        "answer": 1,
        "explain": "tr(B^k) 等于图中长度为 k 的闭合游走数。矩阵指数 e^B = Σ B^k/k! 将各阶闭合游走按 1/k! 加权求和。无环图中所有 tr(B^k)=0 (k≥1)，故 tr(e^B)=tr(I)=d，即 h=0。Hadamard 积 W∘W 是为了处理负权重，使论证对实值矩阵成立。"
      }
    },
    {
      "id": "psm",
      "num": 5,
      "name": "PSM",
      "fullName": "倾向得分匹配 (Propensity Score Matching)",
      "year": "1983",
      "org": "哈佛大学",
      "parent": "—",
      "paperUrl": "https://academic.oup.com/biomet/article/70/1/41/240877",
      "projectUrl": "",
      "category": "causal_inference",
      "motivation": "通过估计处理概率进行样本匹配",
      "summary": "Rosenbaum 与 Rubin 提出倾向得分（propensity score）的概念，证明在观察性研究中可以通过对单一标量——处理分配概率——进行条件化来消除混杂偏差，从而将高维协变量匹配问题降维为一维匹配问题，奠定了因果推断中观察性研究的方法论基础。",
      "keyPoints": [
        "定义倾向得分 \\(e(x) = \\Pr(Z=1 \\mid X=x)\\)：给定观测协变量 \\(X\\) 时个体接受处理的条件概率",
        "<strong>平衡性定理（Theorem 1）</strong>：条件于倾向得分后，处理分配 \\(Z\\) 与协变量 \\(X\\) 独立，即 \\(X \\perp Z \\mid e(X)\\)",
        "<strong>强可忽略性传递（Theorem 2）</strong>：若处理分配在给定 \\(X\\) 下是强可忽略的，则在给定任何平衡得分 \\(b(X)\\) 下也是强可忽略的",
        "倾向得分是<strong>最粗的平衡得分</strong>（coarsest balancing score），实现最大程度降维",
        "三种实操方法：子分类（subclassification）、匹配（matching）、协方差调整（covariance adjustment）",
        "适用于观察性研究中处理效应的无偏估计，前提是满足\"无未观测混杂\"假设"
      ],
      "detail": "<h5>概念框架图</h5>\n<pre><code>┌─────────────────────────────────────────────────────────────────┐\n│                    观测数据 (X, Z, Y)                           │\n│         X: 协变量   Z: 处理指示   Y: 结局变量                    │\n└──────────────────────┬──────────────────────────────────────────┘\n                       │\n              Step 1: 估计倾向得分\n              e(x) = Pr(Z=1|X=x)\n              (Logistic 回归等)\n                       │\n                       ▼\n┌──────────────────────────────────────────────────────────────────┐\n│  处理组 (Z=1)              │           对照组 (Z=0)              │\n│  ● e=0.82                  │           ○ e=0.15                 │\n│  ● e=0.65  ←──── 匹配 ────→  ○ e=0.63                          │\n│  ● e=0.45  ←──── 匹配 ────→  ○ e=0.47                          │\n│  ● e=0.31  ←──── 匹配 ────→  ○ e=0.29                          │\n│  ● e=0.12                  │           ○ e=0.78                 │\n└──────────────────────────────────────────────────────────────────┘\n              Step 2: 倾向得分匹配\n              (最近邻 / 卡尺约束)\n                       │\n                       ▼\n              Step 3: 在匹配样本上\n              估计 ATT = E[Y₁-Y₀|Z=1]\n</code></pre>\n<p><em>图：倾向得分匹配的基本流程——通过估计倾向得分将处理组与对照组中得分相近的个体进行配对，消除协变量分布差异。未匹配的极端个体（如 e=0.82 在对照组无近邻）被丢弃。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># 倾向得分匹配 (PSM) 核心流程\n# 输入: 观测数据 (X, Z, Y)，X为协变量，Z为处理指示，Y为结局\n\n# Step 1: 估计倾向得分\nmodel = LogisticRegression()\nmodel.fit(X, Z)\ne_hat = model.predict_proba(X)[:, 1]  # e(x) = Pr(Z=1|X=x)\n\n# Step 2: 基于倾向得分进行匹配\nmatched_pairs = []\nfor i in treated_indices:\n    # 在对照组中找到倾向得分最接近的个体\n    distances = |e_hat[i] - e_hat[control_indices]|\n    j = control_indices[argmin(distances)]\n    if distances[j] &lt; caliper:  # 卡尺约束\n        matched_pairs.append((i, j))\n\n# Step 3: 在匹配样本上估计处理效应\nATT = mean(Y[treated_matched]) - mean(Y[control_matched])\n</code></pre>\n<h5>动机与背景</h5>\n<p>在观察性研究（observational study）中，研究者无法像随机对照试验那样随机分配处理。处理组与对照组在基线协变量上往往存在系统性差异（选择偏差），直接比较两组结局会产生混杂偏差。</p>\n<p>传统方法试图通过<strong>精确匹配</strong>（exact matching）来消除混杂：对每个处理组个体，找到所有协变量完全相同的对照组个体。然而，当协变量维度 \\(p\\) 较高时，精确匹配面临\"维度灾难\"——几乎不可能找到所有协变量都匹配的配对。</p>\n<div class=\"key-point\">💡 关键：倾向得分将 \\(p\\) 维匹配问题压缩为 1 维匹配问题，这是该方法的核心价值。</div>\n<h5>核心机制</h5>\n<p><strong>1. 倾向得分的定义与性质</strong></p>\n<p>倾向得分定义为：</p>\n<p>$$e(x) = \\Pr(Z = 1 \\mid X = x)$$</p>\n<p>其中 \\(Z \\in \\{0, 1\\}\\) 为处理指示变量，\\(X\\) 为观测到的协变量向量。</p>\n<p><strong>2. 平衡性定理（Balancing Property）</strong></p>\n<p>论文的核心定理（Theorem 1）证明：</p>\n<p>$$X \\perp Z \\mid e(X)$$</p>\n<p>即条件于倾向得分后，协变量 \\(X\\) 的分布在处理组和对照组之间相同。直觉上，倾向得分相同的个体，尽管具体协变量值可能不同，但其\"接受处理的倾向\"相同，因此可以视为在处理分配机制上\"等价\"。</p>\n<div class=\"warn-box\">⚠️ 注意：平衡性仅保证观测到的协变量被平衡，未观测的混杂因素不在此保证范围内。</div>\n<p><strong>3. 强可忽略性（Strong Ignorability）</strong></p>\n<p>论文定义处理分配在给定 \\(X\\) 下是强可忽略的，需满足两个条件：</p>\n<p>$$\\text{(a) } (Y(1), Y(0)) \\perp Z \\mid X \\quad \\text{（无未观测混杂）}$$</p>\n<p>$$\\text{(b) } 0 < \\Pr(Z=1 \\mid X=x) < 1 \\quad \\text{（正值性/重叠条件）}$$</p>\n<p>其中 \\(Y(1)\\) 和 \\(Y(0)\\) 分别为处理和对照下的潜在结局（potential outcomes）。</p>\n<p><strong>4. 核心推论（Theorem 2 &amp; 3）</strong></p>\n<p>若处理分配在给定 \\(X\\) 下强可忽略，则：</p>\n<p>$$\\text{(a) } (Y(1), Y(0)) \\perp Z \\mid e(X)$$</p>\n<p>$$\\text{(b) } E[Y(1) - Y(0)] = E\\{E[Y \\mid Z=1, e(X)] - E[Y \\mid Z=0, e(X)]\\}$$</p>\n<p>这意味着可以通过条件于倾向得分来无偏估计平均处理效应（ATE）。</p>\n<h5>三种实操方法</h5>\n<p><strong>子分类（Subclassification）</strong>：将倾向得分范围分为若干层（通常 5 层即可消除约 90% 的偏差），在每层内分别估计处理效应，再加权平均。</p>\n<p><strong>匹配（Matching）</strong>：为每个处理组个体在对照组中找到倾向得分最接近的个体（最近邻匹配），可设置卡尺（caliper）限制最大匹配距离。</p>\n<p><strong>协方差调整（Covariance Adjustment）</strong>：将倾向得分作为回归模型中的协变量进行调整。</p>\n<h5>与传统方法的区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>维度</th>\n<th>适用性</th>\n<th>局限</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>精确匹配</td>\n<td>需匹配所有 \\(p\\) 维协变量</td>\n<td>低维场景</td>\n<td>维度灾难</td>\n</tr>\n<tr>\n<td>回归调整</td>\n<td>需正确指定结局模型</td>\n<td>模型正确时有效</td>\n<td>模型误设风险</td>\n</tr>\n<tr>\n<td><strong>倾向得分匹配</strong></td>\n<td>仅需匹配 1 维得分</td>\n<td>高维协变量</td>\n<td>需正确指定倾向得分模型</td>\n</tr>\n<tr>\n<td>分层随机化</td>\n<td>需预先定义层</td>\n<td>实验设计阶段</td>\n<td>观察性研究不适用</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 关键：PSM 的设计阶段（匹配）与分析阶段（效应估计）分离，研究者可以在不查看结局数据的情况下完成匹配，减少了\"数据窥探\"偏差。</div>\n<h5>理论贡献的深远影响</h5>\n<p>Rosenbaum 和 Rubin 的这篇论文建立了观察性研究因果推断的理论基础：</p>\n<ol>\n<li><strong>降维定理</strong>使得高维协变量调整变得可行</li>\n<li><strong>平衡得分</strong>的概念统一了多种偏差消除方法</li>\n<li>为后续的逆概率加权（IPW）、双重稳健估计（DR）等方法奠定了理论基础</li>\n<li>截至目前被引用超过 25,000 次，是统计学和因果推断领域最具影响力的论文之一</li>\n</ol>",
      "quiz": {
        "q": "倾向得分的平衡性定理（Balancing Property）的核心含义是什么？",
        "options": [
          "条件于倾向得分后，处理效应为零",
          "条件于倾向得分后，协变量分布在处理组和对照组之间相同",
          "倾向得分越高的个体，处理效果越好",
          "倾向得分可以完全消除所有混杂偏差，包括未观测混杂"
        ],
        "answer": 1,
        "explain": "平衡性定理证明 X ⊥ Z | e(X)，即在倾向得分相同的子群中，协变量的分布不再因处理分配而异，从而消除了观测协变量导致的选择偏差。"
      }
    },
    {
      "id": "cape",
      "num": 6,
      "name": "CAPE",
      "fullName": "因果诱导位置编码 (Causality-Induced Positional Encoding)",
      "year": "2025.12",
      "org": "纽约大学",
      "parent": "—",
      "paperUrl": "https://proceedings.neurips.cc/paper_files/paper/2025/hash/e16657b9f07021c5554bf9661f18dfcc-Abstract-Conference.html",
      "projectUrl": "",
      "category": "causal_inference",
      "motivation": "为Transformer引入因果拓扑编码",
      "summary": "CAPE 提出了一种三步式因果感知位置编码框架：先从观测数据中学习因果DAG结构，再将因果关系嵌入双曲空间以编码因果强度与特异性，最后转换为旋转位置编码注入Transformer注意力机制，解决了非序列因果特征缺乏有效位置编码的问题。",
      "keyPoints": [
        "<strong>三步框架</strong>：Step I 因果结构学习（DAG发现）→ Step II 双曲空间嵌入（Poincaré球）→ Step III 旋转位置编码（RoPE形式）",
        "<strong>因果结构学习</strong>：基于NOTEARS的连续优化方法，通过DAG约束 \\(h(\\mathbf{A}) = \\text{tr}(e^{\\mathbf{A} \\circ \\mathbf{A}}) - M = 0\\) 从数据中发现因果图",
        "<strong>双曲嵌入的两个关键性质</strong>：因果强度（causal strength）∝ 双曲距离的倒数；因果特异性（causal specificity）∝ 到原点的距离",
        "<strong>对比学习 + PageRank正则化</strong>：在双曲流形上通过RSGD优化，拉近因果相关节点、推远无关节点，同时用PageRank约束通用性节点靠近原点",
        "<strong>旋转编码注入</strong>：将Poincaré球嵌入转化为旋转矩阵形式，兼容线性自注意力",
        "<strong>理论保证</strong>：证明了因果距离衰减注意力、因果通用性衰减注意力、以及对位置扰动的鲁棒性三大性质",
        "<strong>多组学验证</strong>：在转录组学（scRNA-seq）、表观基因组学、蛋白质组学数据上验证，基因扰动预测MSE平均降低11.1%"
      ],
      "detail": "<p><img alt=\"CAPE 框架总览\" src=\"https://arxiv.org/abs/2410.16197\" />\n<em>图：CAPE 三步框架示意 — (a) 从观测数据学习因果DAG；(b) 在双曲空间中嵌入因果结构；(c) 转换为旋转位置编码注入Transformer。（来源：论文 Figure 1）</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># CAPE 核心流程伪代码\n# === Step I: 因果结构学习 ===\n# 输入: 观测数据 X ∈ R^{N×M}, 特征集 V = {v1,...,vM}\nA = initialize_adjacency(M)  # 邻接矩阵\nfor iteration in range(max_iter):\n    # 最小化结构方程残差 + DAG约束\n    loss_structure = sum(||x_j - f_j(x_pa(j))||^2 for j in V)\n    loss_dag = tr(exp(A ⊙ A)) - M  # NOTEARS DAG约束 h(A)=0\n    loss = loss_structure + lambda_dag * loss_dag + lambda_sparse * ||A||_1\n    A = augmented_lagrangian_step(A, loss)\n\n# === Step II: 双曲空间嵌入 ===\n# 在 Hyperboloid H^d 上优化位置编码\nP = initialize_on_hyperboloid(M, d)  # {p_v1,...,p_vM} ∈ H^d\nfor iteration in range(max_iter):\n    # 对比学习: 拉近因果相关对, 推远无关对\n    L_con = contrastive_loss(P, A, k_hop=2)\n    # PageRank正则: 通用节点靠近原点\n    pi = compute_pagerank(A)\n    L_reg = sum(pi[j] * d_hyperbolic(P[j], origin) for j in V)\n    L_H = L_con + lambda_g * L_reg\n    # Riemannian SGD 更新\n    P = rsgd_update(P, L_H, learning_rate=eta)\n\n# 映射到 Poincaré 球: H^d → B^d\nE = diffeomorphism_to_poincare(P)  # {e_v1,...,e_vM} ∈ B^d\n\n# === Step III: 旋转位置编码 ===\n# 将 Poincaré 球嵌入转为旋转矩阵\nfor each feature pair (vm, vn):\n    R_q = rotation_matrix(e_vm)  # 查询旋转\n    R_k = rotation_matrix(e_vn)  # 键旋转\n    q_vm = R_q @ W_q @ embedding(vm)\n    k_vn = R_k @ W_k @ embedding(vn)\n    attention(vm, vn) = softmax(q_vm^T @ k_vn / sqrt(d))\n</code></pre>\n<h5>动机与背景</h5>\n<p>传统Transformer的位置编码（如正弦编码、RoPE）假设输入token具有天然的序列顺序（如文本中的词序、图像中的像素位置）。然而，在许多科学和医学领域（如基因组学、蛋白质组学），特征（如基因、蛋白质）之间<strong>没有固有的序列顺序</strong>，但存在复杂的<strong>因果关系</strong>。例如，转录因子调控下游基因表达，形成有向无环图（DAG）结构。</p>\n<p>现有方法要么忽略位置编码（丢失结构信息），要么使用随机/可训练的位置编码（无法捕获因果语义），导致Transformer在这类数据上的表现受限。CAPE的核心洞察是：<strong>因果关系本身就是一种\"位置\"信息</strong>——它定义了特征之间的相对关系和层次结构。</p>\n<h5>核心机制详解</h5>\n<p><strong>Step I：因果结构学习（Causal Structure Learning）</strong></p>\n<p>CAPE采用基于NOTEARS框架的连续优化方法从观测数据中发现因果DAG。核心思想是将离散的DAG搜索问题转化为连续优化问题：</p>\n<p>$$\\min_{\\mathbf{A}} \\sum_{j=1}^{M} \\mathcal{L}(v_j, \\mathbf{A}_{\\cdot j}) + \\lambda_s \\|\\mathbf{A}\\|_1 \\quad \\text{s.t.} \\quad h(\\mathbf{A}) = 0$$</p>\n<p>其中DAG约束 \\(h(\\mathbf{A}) = \\text{tr}(e^{\\mathbf{A} \\circ \\mathbf{A}}) - M\\) 确保学到的图无环。结构方程模型 \\(v_j = f_j(\\mathbf{A}_{\\cdot j} \\circ \\mathbf{v}_{\\setminus j}) + \\epsilon_j\\) 允许非线性因果关系，\\(f_j\\) 由MLP参数化。通过增广拉格朗日方法求解此约束优化问题。</p>\n<div class=\"key-point\">💡 关键：DAG约束的巧妙之处在于 \\(\\text{tr}(e^{\\mathbf{A} \\circ \\mathbf{A}}) = \\sum_{k=0}^{\\infty} \\text{tr}((\\mathbf{A} \\circ \\mathbf{A})^k)/k!\\)，当且仅当图无环时等于 \\(M\\)（因为无环图的邻接矩阵幂次迹为零）。</div>\n<p><strong>Step II：双曲空间嵌入</strong></p>\n<p>学到因果DAG后，CAPE将其嵌入双曲空间（具体为Hyperboloid模型 \\(\\mathbb{H}^d\\)）。选择双曲空间的原因是：</p>\n<ol>\n<li><strong>树状结构的天然表示</strong>：双曲空间可视为离散树的连续类比，DAG的层次结构自然适配</li>\n<li><strong>指数增长的容量</strong>：双曲空间的体积随半径指数增长，能高效表示宽泛的层次关系</li>\n</ol>\n<p>嵌入需满足两个关键性质：</p>\n<ul>\n<li><strong>因果强度</strong>：\\(\\sigma(v_m, v_n) \\propto 1/d_l(p_{v_m}, p_{v_n})\\) — 因果关系越强的特征对，双曲距离越近</li>\n<li><strong>因果特异性</strong>：\\(\\ell(v_m) \\propto d_l(p_{v_m}, p_o)\\) — 越特异（影响范围小）的特征离原点越远</li>\n</ul>\n<p>通过对比学习损失 \\(\\mathcal{L}_{\\text{con}}\\) 实现因果强度编码，通过PageRank正则化 \\(\\Omega\\) 实现因果特异性编码：</p>\n<p>$$\\mathcal{L}_H = \\frac{1}{M}\\sum_{j=1}^{M} \\mathcal{L}_{\\text{con}}(p_{v_j}) + \\lambda_g \\Omega(p_{v_j})$$</p>\n<p>其中 \\(\\Omega(p_{v_m}) = \\pi_{v_m} \\cdot d_l(p_{v_m}, p_o)\\)，\\(\\pi_{v_m}\\) 是PageRank值（因果通用性越高的节点PageRank越大），迫使通用节点靠近原点。</p>\n<div class=\"warn-box\">⚠️ 注意：优化在黎曼流形上进行（RSGD），需要将欧几里得梯度转换为黎曼梯度，再通过指数映射投影回流形。</div>\n<p><strong>Step III：旋转位置编码</strong></p>\n<p>优化后的Hyperboloid嵌入通过微分同胚映射到Poincaré球 \\(\\mathbb{B}^d\\)，然后转换为旋转形式。对于查询和键：</p>\n<p>$$q^i_{v_m} = I_q(v^i_m, e_{v_m}), \\quad k^i_{v_n} = I_k(v^i_n, e_{v_n})$$</p>\n<p>注入函数 \\(I_q, I_k\\) 将Poincaré球坐标转化为旋转角度，使得注意力分数的内积自然编码了位置差异：</p>\n<p>$$\\langle q^i_{v_m}, k^i_{v_n} \\rangle = \\mathcal{A}(v^i_m, v^i_n, \\gamma(e_{v_m}, e_{v_n}))$$</p>\n<p>其中 \\(\\gamma(e_{v_m}, e_{v_n})\\) 是由两个位置编码的差异决定的旋转角度函数。</p>\n<h5>理论性质</h5>\n<p>论文证明了三个重要理论保证：</p>\n<ol>\n<li><strong>因果距离衰减</strong>（Prop. 4.1）：注意力分数 \\(\\mathcal{A}\\) 被上下界 \\(\\mathcal{A}^+, \\mathcal{A}^-\\) 约束，随因果距离 \\(d_p(e_{v_m}, e_{v_n}) \\to +\\infty\\) 两界收敛，注意力变化范围缩小</li>\n<li><strong>因果通用性衰减</strong>（Prop. 4.2）：因果通用性 \\(\\psi_{v_m} \\to 1\\) 时，上界单调递减、下界单调递增，注意力趋于均匀分布</li>\n<li><strong>鲁棒性</strong>（Prop. 4.3）：对位置编码的高斯扰动，注意力分数保持可区分性、无偏性和渐近收敛性</li>\n</ol>\n<h5>与传统方法的区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>适用场景</th>\n<th>编码内容</th>\n<th>因果感知</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>正弦位置编码</td>\n<td>序列数据</td>\n<td>绝对位置</td>\n<td>❌</td>\n</tr>\n<tr>\n<td>RoPE</td>\n<td>序列数据</td>\n<td>相对位置</td>\n<td>❌</td>\n</tr>\n<tr>\n<td>可训练相对编码</td>\n<td>非序列数据</td>\n<td>学习到的相对关系</td>\n<td>❌</td>\n</tr>\n<tr>\n<td><strong>CAPE</strong></td>\n<td><strong>非序列因果数据</strong></td>\n<td><strong>因果强度+特异性</strong></td>\n<td><strong>✅</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p>CAPE的独特优势在于：(1) 不依赖预定义的特征顺序；(2) 编码了因果语义而非任意位置；(3) 旋转形式兼容线性注意力；(4) 具有理论保证的注意力行为。</p>",
      "quiz": {
        "q": "CAPE 在双曲空间嵌入中，PageRank正则化项的主要作用是什么？",
        "options": [
          "加速对比学习的收敛速度",
          "确保因果通用性高的节点（如根节点）嵌入靠近原点，编码因果特异性",
          "防止所有节点嵌入坍缩到同一点",
          "约束嵌入向量的范数不超过1"
        ],
        "answer": 1,
        "explain": "PageRank值大的节点（出度多、因果影响广泛的通用节点）被正则化项更强地惩罚其到原点的距离，迫使它们靠近原点，从而编码因果特异性——通用节点近原点，特异节点远离原点。"
      }
    },
    {
      "id": "less_greedy_ges",
      "num": 7,
      "name": "Less Greedy GES",
      "fullName": "非贪婪等价搜索 (Less Greedy GES)",
      "year": "2025.12",
      "org": "哥伦比亚大学",
      "parent": "ges",
      "paperUrl": "https://proceedings.neurips.cc/paper_files/paper/2025/hash/b26dfe705b549365ccbdbfdec74b1117-Abstract-Conference.html",
      "projectUrl": "",
      "category": "causal_inference",
      "motivation": "非贪婪搜索克服局部最优",
      "summary": "Less Greedy GES 的核心目标是：非贪婪搜索克服局部最优。",
      "keyPoints": [
        "核心动机：非贪婪搜索克服局部最优",
        "演化来源：继承或改进自 ges",
        "代表机构：哥伦比亚大学"
      ],
      "detail": "<p>非贪婪搜索克服局部最优</p>"
    },
    {
      "id": "pfn_ges",
      "num": 8,
      "name": "PFN-GES",
      "fullName": "先验拟合网络GES (PFN-GES)",
      "year": "2026.07",
      "org": "华沙大学",
      "parent": "less_greedy_ges",
      "paperUrl": "https://icml.cc/virtual/2026/papers.html",
      "projectUrl": "",
      "category": "causal_inference",
      "motivation": "利用PFN加速得分搜索",
      "summary": "PFN-GES 的核心目标是：利用PFN加速得分搜索。",
      "keyPoints": [
        "核心动机：利用PFN加速得分搜索",
        "演化来源：继承或改进自 less_greedy_ges",
        "代表机构：华沙大学"
      ],
      "detail": "<p>利用PFN加速得分搜索</p>"
    },
    {
      "id": "causal_llm",
      "num": 9,
      "name": "Causal-LLM",
      "fullName": "因果大语言模型框架 (Causal-LLM Framework)",
      "year": "2026.05",
      "org": "亚马逊",
      "parent": "scm",
      "paperUrl": "https://dl.acm.org/doi/abs/10.1145/3801228.3801315",
      "projectUrl": "",
      "category": "causal_inference",
      "motivation": "自动化因果发现与LLM结合",
      "summary": "Causal-LLM 提出了一种将约束型因果发现算法与大语言模型（LLM）相结合的混合框架，用于自动化企业预算差异的根因诊断与可解释推理，在真实制造业数据上实现了 0.87 的 top-1 根因识别准确率，并将分析时间从数小时缩短至 10 秒以内。",
      "keyPoints": [
        "提出混合架构：约束型因果推断（Constraint-based Causal Inference）构建财务因果图 + LLM 驱动的上下文推理生成可解释诊断",
        "构建领域专用的金融因果知识图谱（Financial Causal Knowledge Graph, FCKG），桥接统计相关性与真实因果关系",
        "三阶段流水线：因果图构建 → 根因定位 → LLM 解释生成",
        "在 240 个标注差异案例（24 个月真实企业数据）上评估，top-1 准确率 0.87（95% CI: [0.82, 0.91]）",
        "显著优于传统统计方法（0.68）、纯 LLM 方法（0.76）和独立因果方法（0.72）",
        "可解释性评分 0.92（评估者间一致性 ICC=0.84），调查时间从 2–4 小时降至 &lt;10 秒"
      ],
      "detail": "<h5>框架总览</h5>\n<p>Causal-LLM 的核心架构由三个协同模块组成：</p>\n<pre><code>┌─────────────────────────────────────────────────────────────────┐\n│                    Causal-LLM Framework                         │\n├─────────────────────────────────────────────────────────────────┤\n│                                                                 │\n│  ┌──────────────┐    ┌──────────────────┐    ┌──────────────┐  │\n│  │  Module 1:   │    │   Module 2:      │    │  Module 3:   │  │\n│  │  Causal      │───▶│   Root Cause     │───▶│  LLM-based   │  │\n│  │  Discovery   │    │   Localization   │    │  Reasoning   │  │\n│  │  Engine      │    │                  │    │  &amp; Explain   │  │\n│  └──────┬───────┘    └────────┬─────────┘    └──────────────┘  │\n│         │                     │                                 │\n│         ▼                     ▼                                 │\n│  ┌──────────────┐    ┌──────────────────┐                      │\n│  │  Financial   │    │  Domain-Specific │                      │\n│  │  Causal      │◀──▶│  FCKG (Knowledge │                      │\n│  │  Graph (DAG) │    │  Graph)          │                      │\n│  └──────────────┘    └──────────────────┘                      │\n│                                                                 │\n└─────────────────────────────────────────────────────────────────┘\n\n输入: ERP 系统中的预算差异数据 (Budget vs. Actual)\n输出: 根因诊断 + 自然语言解释报告\n</code></pre>\n<p><em>图：Causal-LLM 框架三模块协同架构示意</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># Causal-LLM 根因诊断流程伪代码\ndef causal_llm_diagnose(variance_data, fckg, llm):\n    &quot;&quot;&quot;\n    variance_data: ERP系统导出的预算差异数据 (时间序列)\n    fckg: 金融因果知识图谱 (Financial Causal Knowledge Graph)\n    llm: 大语言模型 (用于推理和解释生成)\n    &quot;&quot;&quot;\n    # Phase 1: 因果图构建 (Constraint-based Causal Discovery)\n    skeleton = estimate_skeleton(variance_data, alpha=0.05)  # 条件独立性检验\n    dag = orient_edges(skeleton, fckg)  # 结合领域知识定向边\n    causal_graph = prune_with_domain_constraints(dag, fckg)\n\n    # Phase 2: 根因定位 (Root Cause Localization)\n    anomaly_nodes = detect_anomalous_variables(variance_data)\n    candidate_causes = trace_causal_paths(causal_graph, anomaly_nodes)\n    ranked_causes = score_candidates(\n        candidate_causes, \n        method=&quot;intervention_effect&quot;,  # 估计干预效应\n        data=variance_data\n    )\n\n    # Phase 3: LLM 推理与解释生成\n    context = build_prompt(\n        ranked_causes=ranked_causes[:top_k],\n        causal_graph=causal_graph,\n        domain_knowledge=fckg.get_relevant_context(ranked_causes),\n        variance_summary=summarize_variance(variance_data)\n    )\n    explanation = llm.generate(\n        prompt=context,\n        task=&quot;root_cause_explanation&quot;,\n        constraints=[&quot;actionable&quot;, &quot;human_interpretable&quot;]\n    )\n\n    return ranked_causes[0], explanation\n</code></pre>\n<h5>动机与背景</h5>\n<p>传统企业资源规划（ERP）系统在预算管理中擅长量化差异（如实际支出与预算的偏差百分比），但无法回答<strong>\"为什么会产生这个差异\"</strong>这一关键问题。财务分析师通常需要 2–4 小时的人工调查来追溯根因，涉及跨部门数据关联、历史趋势分析和领域经验判断。</p>\n<p>现有自动化方法的局限：\n- <strong>纯统计方法</strong>（相关分析、回归）：只能发现关联，无法区分因果，准确率仅 0.68\n- <strong>纯 LLM 方法</strong>（直接提问 GPT 等）：缺乏结构化因果推理能力，容易产生幻觉，准确率 0.76\n- <strong>独立因果方法</strong>（PC/FCI 算法）：缺乏领域知识约束，在高维财务数据中产生大量伪因果边，准确率 0.72</p>\n<div class=\"key-point\">💡 关键洞察：单独使用因果发现或 LLM 都不足以解决问题——因果发现提供结构但缺乏语义理解，LLM 提供语义但缺乏因果结构。Causal-LLM 的核心贡献在于将两者有机融合。</div>\n<h5>核心机制详解</h5>\n<p><strong>1. 约束型因果发现引擎</strong></p>\n<p>框架采用改进的 PC（Peter-Clark）算法进行因果图构建。标准 PC 算法通过条件独立性检验逐步消除变量间的非因果边：</p>\n<p>$$\nX \\perp\\!\\!\\!\\perp Y \\mid \\mathbf{Z} \\implies \\text{删除边 } X - Y\n$$</p>\n<p>其中条件独立性通过偏相关检验或互信息估计判定，显著性水平 \\(\\alpha = 0.05\\)。</p>\n<p>Causal-LLM 的改进在于引入 FCKG 作为先验约束：\n- <strong>白名单边</strong>：FCKG 中已确认的因果关系（如\"原材料价格 → 生产成本\"）不参与删除检验\n- <strong>黑名单边</strong>：违反领域常识的边（如\"利润 → 收入\"）直接禁止\n- <strong>方向约束</strong>：利用财务时序逻辑（预算编制在前，执行在后）辅助边定向</p>\n<p>$$\n\\text{Score}(G) = \\underbrace{\\sum_{(i,j) \\in E} \\log P(X_i \\not\\perp X_j \\mid \\mathbf{Pa}_j)}_{\\text{数据拟合项}} + \\underbrace{\\lambda \\sum_{(i,j) \\in E} \\mathbb{1}[(i,j) \\in \\text{FCKG}]}_{\\text{领域知识奖励}}\n$$</p>\n<p><strong>2. 金融因果知识图谱（FCKG）</strong></p>\n<p>FCKG 是一个领域专用的有向知识图谱，编码了财务变量间的因果语义：\n- <strong>节点</strong>：财务指标（收入、成本、利润率、产能利用率等）\n- <strong>边</strong>：因果关系及其强度、方向、时滞\n- <strong>属性</strong>：行业特定的因果模式（如制造业中\"设备故障 → 产能下降 → 交付延迟 → 收入减少\"）</p>\n<p>FCKG 由领域专家构建并持续更新，作为因果发现的先验知识和 LLM 推理的上下文锚点。</p>\n<p><strong>3. LLM 驱动的上下文推理</strong></p>\n<p>在根因定位完成后，LLM 负责：\n- 将结构化因果路径转化为自然语言解释\n- 结合 FCKG 中的领域上下文丰富解释内容\n- 生成可操作的改进建议</p>\n<p>Prompt 构建策略采用结构化模板：</p>\n<p>$$\n\\text{Prompt} = [\\text{SystemRole}] \\oplus [\\text{CausalPath}] \\oplus [\\text{FCKG\\_Context}] \\oplus [\\text{VarianceData}] \\oplus [\\text{Task}]\n$$</p>\n<div class=\"warn-box\">⚠️ 注意：LLM 不直接参与因果发现过程，避免了 LLM 幻觉对因果结构的污染。LLM 仅在因果图已确定后，负责\"解释\"和\"推理\"环节。</div>\n<h5>与传统方法的区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th>传统统计</th>\n<th>纯 LLM</th>\n<th>独立因果</th>\n<th><strong>Causal-LLM</strong></th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>因果识别</td>\n<td>✗ (仅相关)</td>\n<td>部分 (隐式)</td>\n<td>✓</td>\n<td>✓ (领域增强)</td>\n</tr>\n<tr>\n<td>可解释性</td>\n<td>低</td>\n<td>高但不可靠</td>\n<td>中</td>\n<td><strong>高且可靠</strong></td>\n</tr>\n<tr>\n<td>领域适配</td>\n<td>需手动</td>\n<td>通用但浅</td>\n<td>需手动</td>\n<td><strong>FCKG 自动</strong></td>\n</tr>\n<tr>\n<td>Top-1 准确率</td>\n<td>0.68</td>\n<td>0.76</td>\n<td>0.72</td>\n<td><strong>0.87</strong></td>\n</tr>\n<tr>\n<td>处理时间</td>\n<td>分钟级</td>\n<td>秒级</td>\n<td>分钟级</td>\n<td><strong>&lt;10 秒</strong></td>\n</tr>\n</tbody>\n</table></div>\n<h5>实验验证</h5>\n<p>评估在一家制造业企业的 24 个月真实数据上进行，包含 240 个由高级财务分析师标注的预算差异案例。主要发现：</p>\n<ul>\n<li><strong>准确率</strong>：Causal-LLM 的 top-1 根因识别准确率为 0.87（95% CI: [0.82, 0.91]），相比最强基线（纯 LLM, 0.76）提升 14.5%</li>\n<li><strong>可解释性</strong>：由 5 位高级分析师评估，平均可解释性评分 0.92/1.0，评估者间一致性 ICC=0.84（优秀水平）</li>\n<li><strong>效率</strong>：单案例处理时间 &lt;10 秒，相比人工调查（均值 3.2 小时）提升约 1150 倍</li>\n<li><strong>消融实验</strong>：去除 FCKG 后准确率降至 0.79，去除 LLM 解释模块后可解释性降至 0.61，验证了各模块的必要性</li>\n</ul>",
      "quiz": {
        "q": "Causal-LLM 框架中，LLM 的核心作用是什么？",
        "options": [
          "直接执行因果发现算法，构建因果图",
          "替代传统统计方法进行条件独立性检验",
          "在因果图确定后，将结构化因果路径转化为可解释的自然语言诊断",
          "训练金融因果知识图谱（FCKG）中的节点嵌入"
        ],
        "answer": 2,
        "explain": "Causal-LLM 中 LLM 不参与因果发现过程（避免幻觉污染），而是在约束型因果算法构建好因果图并定位根因后，负责生成人类可理解的解释和可操作建议。"
      }
    },
    {
      "id": "counterfactual_explanation",
      "num": 10,
      "name": "CFE",
      "fullName": "反事实解释 (Counterfactual Explanations)",
      "year": "2017",
      "org": "牛津大学",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/1711.00399",
      "projectUrl": "",
      "category": "counterfactual",
      "motivation": "寻找最小特征扰动改变模型决策",
      "summary": "本文提出\"反事实解释\"（Counterfactual Explanations）方法，通过求解使模型输出翻转的最小输入扰动来解释黑箱自动化决策，无需打开模型内部结构，同时论证了该方法在GDPR法律框架下的合规优势。",
      "keyPoints": [
        "<strong>问题动机</strong>：GDPR要求对自动化决策提供解释，但打开\"黑箱\"面临四大障碍：法律约束力不明确、适用范围有限、技术复杂性高、商业秘密保护需求",
        "<strong>核心思想</strong>：反事实解释不解释模型\"如何工作\"，而是回答\"输入需要怎样改变才能得到不同结果\"——即寻找离原始输入最近的、能改变模型决策的替代输入",
        "<strong>优化方法</strong>：将反事实生成形式化为约束优化问题，固定模型权重，最小化输入变化量同时约束输出达到目标值",
        "<strong>距离度量</strong>：采用L1范数加权逆中位数绝对偏差（MAD），既保证稀疏性（少量特征变化）又考虑特征尺度",
        "<strong>三大用途</strong>：(1) 帮助理解决策原因；(2) 提供质疑不利决策的依据；(3) 指导未来如何改变以获得期望结果",
        "<strong>无需模型访问</strong>：仅需查询模型输入输出（黑箱访问），不需要梯度或内部结构信息（实践中用梯度加速优化）",
        "<strong>法律贡献</strong>：论证反事实解释可满足GDPR透明度要求，同时保护商业秘密，避免博弈风险"
      ],
      "detail": "<p><strong>图示（概念图）：</strong></p>\n<p><img alt=\"Counterfactual Explanation Concept\" src=\"https://raw.githubusercontent.com/interpretml/DiCE/main/docs/_static/dice_overview.png\" /></p>\n<blockquote>\n<p>注：上图为DiCE项目的反事实解释概念图（基于本文方法的后续实现），展示了从原始输入到反事实输入的最小变化路径。</p>\n</blockquote>\n<hr />\n<p><strong>算法伪代码：</strong></p>\n<pre><code class=\"language-text\">Algorithm: Counterfactual Explanation Generation\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\nInput: \n  - 训练好的模型 f_w（权重 w 固定）\n  - 原始数据点 x_i 及其决策 f_w(x_i)\n  - 期望的目标输出 y'\n  - 距离函数 d(·,·)\n  - 随机初始化次数 N\n\nOutput: 反事实解释 x*\n\n1. 计算训练集每个特征 k 的 MAD_k\n2. FOR j = 1 to N:\n3.   随机初始化 x'_j\n4.   设置 λ = λ_init\n5.   REPEAT:\n6.     用 ADAM 优化器求解:\n7.       x'_j ← argmin_{x'} [λ·(f_w(x') - y')² + d(x_i, x')]\n8.     IF |f_w(x'_j) - y'| &lt; ε:\n9.       BREAK\n10.    ELSE:\n11.      λ ← λ · step_size  // 增大 λ 强制满足输出约束\n12.   END REPEAT\n13.   对离散特征进行 clamping（如 race ∈ {0, 1}）\n14. END FOR\n15. x* ← argmin_{j} [λ·(f_w(x'_j) - y')² + d(x_i, x'_j)]\n16. RETURN x* 及对应的特征变化说明\n</code></pre>\n<hr />\n<p><strong>方法详细解释：</strong></p>\n<p><strong>1. 问题形式化与优化目标</strong></p>\n<p>Wachter等人将反事实解释生成问题形式化为一个优化问题。给定一个已训练的分类器或回归器 $f_w$（权重 $w$ 通过标准训练过程确定），对于一个收到不利决策的数据点 $x_i$，我们希望找到一个反事实点 $x'$，使得模型对 $x'$ 的预测为期望的目标 $y'$，同时 $x'$ 尽可能接近原始点 $x_i$。这被形式化为：</p>\n<p>$$x^* = \\arg\\min_{x'} \\max_{\\lambda} \\left[ \\lambda \\cdot (f_w(x') - y')^2 + d(x_i, x') \\right]$$</p>\n<p>其中第一项 $\\lambda \\cdot (f_w(x') - y')^2$ 惩罚反事实点偏离目标输出的程度，第二项 $d(x_i, x')$ 惩罚反事实点偏离原始输入的程度。超参数 $\\lambda$ 通过外层最大化来平衡两个目标：实践中采用迭代策略，逐步增大 $\\lambda$ 直到找到满足输出约束的足够近的解。这种\"先求解再调参\"的策略避免了直接求解带约束优化的困难。</p>\n<p><strong>2. 距离函数设计</strong></p>\n<p>距离函数的选择对反事实解释的质量至关重要。作者提出使用 L1 范数加权逆中位数绝对偏差（MAD）：</p>\n<p>$$d(x_i, x') = \\sum_{k=1}^{p} \\frac{|x_{i,k} - x'_k|}{MAD_k}$$</p>\n<p>其中：</p>\n<p>$$MAD_k = \\text{median}_{j \\in P}\\left(|x_{j,k} - \\text{median}_{l \\in P}(x_{l,k})|\\right)$$</p>\n<p>这一设计有两个关键优势：(1) <strong>稀疏性</strong>——L1范数天然倾向于产生稀疏解，即大部分特征保持不变，只有少数关键特征发生变化，这使得反事实解释更易于人类理解和执行；(2) <strong>尺度不变性</strong>——MAD归一化使得不同量纲的特征具有可比性，同时比标准差更鲁棒于异常值。如果某个特征在数据集中变化剧烈（MAD大），则允许反事实在该特征上有较大偏移而不产生过高代价。</p>\n<p>作者通过LSAT数据集实验对比了不同距离函数的效果：未加权的L2距离会产生所有特征都微小变化的解（难以解释），而L1/MAD加权距离则产生仅改变1-2个特征的简洁解释。</p>\n<p><strong>3. 实验验证与离散特征处理</strong></p>\n<p>论文在两个数据集上验证了方法：(1) <strong>LSAT数据集</strong>——预测法学院学生一年级平均成绩，输入包括种族、本科GPA和入学考试分数，使用3层全连接神经网络（2个20神经元隐藏层，共941个权重）；(2) <strong>Pima糖尿病数据集</strong>——预测糖尿病诊断，输入包括8个医学指标。</p>\n<p>对于离散特征（如种族只能取0或1），直接优化可能产生无意义的小数值。作者采用\"clamping\"策略：将离散特征固定为其可能的取值，分别求解，然后比较哪个解的总距离最小。这确保了反事实解释的可行性和可解释性。</p>\n<p>实验还揭示了模型中的偏见：对于\"黑人\"学生，反事实经常建议\"如果你是白人\"就能获得更好预测——这本身就是一种有价值的公平性审计工具。</p>\n<p><strong>4. 与对抗样本的区别及\"无条件\"反事实的概念</strong></p>\n<p>虽然反事实解释在技术上类似于对抗样本（adversarial examples），但两者目的截然不同：对抗样本旨在欺骗模型（通常是不可感知的扰动），而反事实解释旨在为用户提供可操作的建议。更重要的是，本文提出的是\"无条件反事实\"（unconditional counterfactuals）——它不假设特征之间的因果关系，仅描述\"如果输入是X'，输出就会是Y'\"，而不声称\"改变X会导致Y改变\"。这种区分使得方法可以在不了解数据生成过程因果结构的情况下安全使用，同时避免了对用户的误导。</p>",
      "quiz": {
        "q": "",
        "options": [],
        "answer": 0,
        "explain": ""
      }
    },
    {
      "id": "counterfactual_fairness",
      "num": 11,
      "name": "CF-Fairness",
      "fullName": "反事实公平性 (Counterfactual Fairness)",
      "year": "2017",
      "org": "伦敦大学学院",
      "parent": "scm",
      "paperUrl": "https://arxiv.org/abs/1703.06856",
      "projectUrl": "",
      "category": "counterfactual",
      "motivation": "改变敏感属性时预测保持不变",
      "summary": "CF-Fairness 的核心目标是：改变敏感属性时预测保持不变。",
      "keyPoints": [
        "核心动机：改变敏感属性时预测保持不变",
        "演化来源：继承或改进自 scm",
        "代表机构：伦敦大学学院"
      ],
      "detail": "<p>改变敏感属性时预测保持不变</p>"
    },
    {
      "id": "bbb",
      "num": 12,
      "name": "BBB",
      "fullName": "权重不确定性反向传播 (Bayes by Backprop)",
      "year": "2015",
      "org": "DeepMind",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/1505.05424",
      "projectUrl": "",
      "category": "uncertainty",
      "motivation": "将神经网络权重表示为概率分布",
      "summary": "Bayes by Backprop 提出了一种可扩展的变分推断算法，通过重参数化技巧（reparameterization trick）学习神经网络权重的后验概率分布（而非点估计），实现了正则化、模型压缩和不确定性量化的统一框架。",
      "keyPoints": [
        "将神经网络权重建模为概率分布（对角高斯），通过最小化变分自由能进行训练",
        "重参数化技巧：\\(w = \\mu + \\log(1+\\exp(\\rho)) \\circ \\epsilon\\)，\\(\\epsilon \\sim \\mathcal{N}(0, I)\\)，使梯度可通过标准反向传播计算",
        "损失函数分解为复杂度代价（KL散度）和数据似然代价：\\(\\mathcal{F}(\\mathcal{D}, \\theta) = \\text{KL}[q(w|\\theta) \\| P(w)] - \\mathbb{E}_{q}[\\log P(\\mathcal{D}|w)]\\)",
        "Scale Mixture 先验：\\(P(w) = \\pi \\mathcal{N}(0, \\sigma_1^2) + (1-\\pi)\\mathcal{N}(0, \\sigma_2^2)\\)，鼓励权重稀疏分布",
        "Minibatch KL 重加权策略：\\(\\pi_i = \\frac{2^{M-i}}{2^M - 1}\\)，使训练早期更受先验约束",
        "信噪比剪枝：利用 \\(|\\mu_i|/\\sigma_i\\) 排序权重，移除95%权重后性能几乎不降",
        "Thompson Sampling 应用：从后验采样权重实现探索-利用平衡，适用于上下文赌博机问题"
      ],
      "detail": "<p><img alt=\"Bayes by Backprop 框架示意\" src=\"https://arxiv.org/html/1505.05424v1/extracted/figures/fig1.png\" />\n<em>图：Bayes by Backprop 通过学习权重分布参数 \\(\\theta = (\\mu, \\rho)\\) 替代传统点估计，每次前向传播从分布中采样权重</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># Bayes by Backprop 核心算法\n# 输入: 变分参数 θ = (μ, ρ), 训练数据 D\n\ndef bayes_by_backprop(D, θ, num_samples=1):\n    &quot;&quot;&quot;\n    θ = (μ, ρ) 为变分后验参数\n    σ = log(1 + exp(ρ))  # softplus 确保正值\n    &quot;&quot;&quot;\n    f_total = 0\n    for _ in range(num_samples):\n        # 1. 采样噪声\n        ε ~ N(0, I)\n        # 2. 重参数化得到权重样本\n        w = μ + log(1 + exp(ρ)) ⊙ ε\n        # 3. 计算变分自由能\n        f = log q(w|θ) - log P(w) - log P(D|w)\n        #     复杂度代价        数据似然代价\n        f_total += f\n\n    f_total /= num_samples\n\n    # 4. 计算梯度（通过标准反向传播）\n    Δμ = ∂f/∂w + ∂f/∂μ           # = ∂f/∂w · 1 + ∂(log q)/∂μ\n    Δρ = ∂f/∂w · ε/(1+exp(-ρ)) + ∂f/∂ρ  # 链式法则\n\n    # 5. 更新参数\n    μ ← μ - α · Δμ\n    ρ ← ρ - α · Δρ\n</code></pre>\n<h5>动机与背景</h5>\n<p>传统神经网络训练通过最大似然估计（MLE）或最大后验估计（MAP）获得权重的<strong>点估计</strong>。这种方法存在三个根本缺陷：</p>\n<ol>\n<li><strong>过拟合</strong>：点估计容易过度拟合训练数据，尤其在数据稀少区域</li>\n<li><strong>无法量化不确定性</strong>：模型无法表达\"我不确定\"，在分布外区域仍给出高置信度预测</li>\n<li><strong>探索不足</strong>：在强化学习/决策场景中，点估计无法自然实现探索</li>\n</ol>\n<p>贝叶斯方法通过维护权重的完整后验分布 \\(P(w|\\mathcal{D})\\) 来解决这些问题。然而，精确贝叶斯推断在神经网络中是不可计算的（后验无解析形式），因此需要近似方法。</p>\n<h5>核心机制：变分推断框架</h5>\n<p><strong>变分自由能目标</strong></p>\n<p>Bayes by Backprop 的核心思想是用一个参数化的简单分布 \\(q(w|\\theta)\\) 来近似真实后验 \\(P(w|\\mathcal{D})\\)。优化目标为最小化变分自由能（即 ELBO 的负数）：</p>\n<p>$$\\mathcal{F}(\\mathcal{D}, \\theta) = \\text{KL}[q(w|\\theta) \\| P(w)] - \\mathbb{E}_{q(w|\\theta)}[\\log P(\\mathcal{D}|w)]$$</p>\n<p>其中：\n- <strong>复杂度代价</strong> \\(\\text{KL}[q(w|\\theta) \\| P(w)]\\)：衡量学到的后验与先验的偏离程度，起正则化作用\n- <strong>数据似然代价</strong> \\(-\\mathbb{E}_{q}[\\log P(\\mathcal{D}|w)]\\)：衡量模型对数据的拟合能力</p>\n<div class=\"key-point\">💡 关键直觉：这个目标自动平衡了\"拟合数据\"和\"保持简单\"——正是奥卡姆剃刀原则的数学化表达。</div>\n<p><strong>重参数化技巧</strong></p>\n<p>直接对 \\(\\theta\\) 求 \\(\\mathbb{E}_{q(w|\\theta)}[f(w, \\theta)]\\) 的梯度是困难的，因为期望的分布本身依赖于 \\(\\theta\\)。重参数化技巧将随机性从参数中分离：</p>\n<p>$$w = t(\\theta, \\epsilon) = \\mu + \\log(1 + \\exp(\\rho)) \\circ \\epsilon, \\quad \\epsilon \\sim \\mathcal{N}(0, I)$$</p>\n<p>这样梯度变为：</p>\n<p>$$\\frac{\\partial}{\\partial \\theta} \\mathbb{E}_{q(w|\\theta)}[f(w, \\theta)] = \\mathbb{E}_{\\mathcal{N}(\\epsilon|0,I)}\\left[\\frac{\\partial f(w, \\theta)}{\\partial w}\\frac{\\partial w}{\\partial \\theta} + \\frac{\\partial f(w, \\theta)}{\\partial \\theta}\\right]$$</p>\n<div class=\"warn-box\">⚠️ 注意：使用 \\(\\sigma = \\log(1 + \\exp(\\rho))\\)（softplus函数）而非直接参数化 \\(\\sigma\\)，是为了确保标准差始终为正，同时避免 \\(\\exp\\) 的数值溢出问题。</div>\n<p><strong>Scale Mixture 先验</strong></p>\n<p>论文提出使用两个高斯分布的混合作为先验：</p>\n<p>$$P(w) = \\pi \\mathcal{N}(w|0, \\sigma_1^2) + (1-\\pi)\\mathcal{N}(w|0, \\sigma_2^2)$$</p>\n<p>其中 \\(\\sigma_1\\) 较大（如 \\(\\exp(-1)\\) 到 \\(\\exp(0)\\)），\\(\\sigma_2\\) 很小（如 \\(\\exp(-6)\\) 到 \\(\\exp(-8)\\)）。这种设计类似于 spike-and-slab 先验：\n- 宽高斯允许重要权重取较大值\n- 窄高斯将不重要权重压向零附近</p>\n<p>这比单一高斯先验更灵活，能学到更稀疏的网络结构。</p>\n<p><strong>Minibatch KL 重加权</strong></p>\n<p>在使用 minibatch 训练时，KL 项需要合理分配到各个 batch。论文提出非均匀加权：</p>\n<p>$$\\pi_i = \\frac{2^{M-i}}{2^M - 1}, \\quad i = 1, \\ldots, M$$</p>\n<p>其中 \\(M\\) 是总 batch 数，\\(i\\) 是当前 batch 索引。这使得训练初期 KL 权重更大（更受先验约束），后期更多关注数据拟合。</p>\n<div class=\"key-point\">💡 直觉：类似于\"先学规则，再学例外\"——早期让先验引导网络结构，后期让数据精调细节。</div>\n<h5>训练与推理流程</h5>\n<p><strong>训练阶段</strong>：\n1. 对每个 minibatch，从 \\(\\mathcal{N}(0, I)\\) 采样 \\(\\epsilon\\)\n2. 通过重参数化计算权重 \\(w = \\mu + \\text{softplus}(\\rho) \\circ \\epsilon\\)\n3. 前向传播计算损失（复杂度代价 + 数据似然代价）\n4. 反向传播计算 \\(\\nabla_\\mu\\) 和 \\(\\nabla_\\rho\\) 的梯度\n5. 更新 \\(\\mu\\) 和 \\(\\rho\\)</p>\n<p><strong>推理阶段</strong>：\n- 可以采样多组权重进行贝叶斯模型平均\n- 或直接使用均值权重 \\(\\mu\\) 作为点预测\n- 不确定性通过多次采样的预测方差估计</p>\n<h5>与传统方法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>权重表示</th>\n<th>正则化</th>\n<th>不确定性</th>\n<th>探索能力</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>SGD (MLE)</td>\n<td>点估计</td>\n<td>无</td>\n<td>无</td>\n<td>无</td>\n</tr>\n<tr>\n<td>L2 正则化 (MAP)</td>\n<td>点估计</td>\n<td>高斯先验</td>\n<td>无</td>\n<td>无</td>\n</tr>\n<tr>\n<td>Dropout</td>\n<td>点估计+随机掩码</td>\n<td>隐式</td>\n<td>近似</td>\n<td>有限</td>\n</tr>\n<tr>\n<td><strong>Bayes by Backprop</strong></td>\n<td><strong>概率分布</strong></td>\n<td><strong>KL散度</strong></td>\n<td><strong>显式</strong></td>\n<td><strong>Thompson采样</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p>关键优势：\n1. <strong>vs Dropout</strong>：BBB 显式学习每个权重的不确定性，而 dropout 只是二值掩码的近似\n2. <strong>vs 变分 Dropout (Graves 2011)</strong>：BBB 使用更好的梯度估计器（重参数化 vs REINFORCE），方差更低\n3. <strong>vs 集成方法</strong>：BBB 是隐式无限集成（对所有可能权重配置积分），且可通过信噪比剪枝压缩</p>\n<h5>实验亮点</h5>\n<p><strong>MNIST 分类</strong>：两层 1200 ReLU 单元网络，BBB 达到 <strong>1.32%</strong> 测试错误率，优于 dropout 的 1.34%。</p>\n<p><strong>权重剪枝</strong>：按信噪比 \\(|\\mu|/\\sigma\\) 排序后移除 95% 的权重（从 2.4M 降至 120K），错误率仅从 1.24% 升至 1.29%，展示了极强的压缩能力。</p>\n<p><strong>回归不确定性</strong>：在无数据区域，BBB 的置信区间自然发散，而标准网络错误地给出零方差预测。</p>\n<p><strong>Thompson Sampling</strong>：在蘑菇分类赌博机任务中，BBB 通过从后验采样权重实现探索，累积遗憾显著低于 \\(\\epsilon\\)-greedy 和 UCB 等基线方法。</p>",
      "quiz": {
        "q": "Bayes by Backprop 中使用重参数化技巧的主要目的是什么？",
        "options": [
          "减少模型参数量，提高推理速度",
          "将随机性与可学习参数分离，使梯度可通过反向传播计算",
          "确保权重分布始终为高斯分布",
          "避免 KL 散度的计算"
        ],
        "answer": 1,
        "explain": "重参数化将 w = μ + σ⊙ε 中的随机性转移到固定分布 ε~N(0,I)，使得损失对 μ 和 ρ 的梯度可以通过标准反向传播获得无偏估计。"
      }
    },
    {
      "id": "mc_dropout",
      "num": 13,
      "name": "MC Dropout",
      "fullName": "蒙特卡洛Dropout (Monte Carlo Dropout)",
      "year": "2016",
      "org": "剑桥大学",
      "parent": "bbb",
      "paperUrl": "https://arxiv.org/abs/1506.02142",
      "projectUrl": "",
      "category": "uncertainty",
      "motivation": "测试期开启Dropout等价贝叶斯近似",
      "summary": "MC Dropout 证明了在深度神经网络中使用 Dropout 训练等价于深度高斯过程的近似变分推断，从而只需在测试时保持 Dropout 并执行多次随机前向传播即可获得模型的预测不确定性估计。",
      "keyPoints": [
        "<strong>理论等价性</strong>：证明 Dropout 训练目标函数等价于最小化变分分布 $q(\\boldsymbol{\\omega})$ 与深度高斯过程后验 $p(\\boldsymbol{\\omega}|\\mathbf{X},\\mathbf{Y})$ 之间的 KL 散度",
        "<strong>变分分布设计</strong>：每层权重矩阵 $\\mathbf{W}_i = \\mathbf{M}_i \\cdot \\text{diag}(\\mathbf{z}_i)$，其中 $\\mathbf{z}_i \\sim \\text{Bernoulli}(p_i)$ 为随机 Dropout 掩码",
        "<strong>MC 采样估计不确定性</strong>：测试时执行 $T$ 次带 Dropout 的前向传播，用样本均值和方差近似预测分布的前两阶矩",
        "<strong>预测方差分解</strong>：总不确定性 = 模型不确定性（认知不确定性）+ 固有噪声（偶然不确定性），其中 $\\tau^{-1}$ 为数据噪声精度",
        "<strong>零额外成本</strong>：无需修改已有 Dropout 网络结构或重新训练，仅需在推理时保持 Dropout 开启",
        "<strong>广泛适用性</strong>：适用于任意深度网络架构（全连接、CNN 等），支持回归与分类任务的不确定性量化",
        "<strong>实验验证</strong>：在 CO₂ 浓度回归外推、MNIST 分类、强化学习探索等任务上验证了不确定性估计的有效性"
      ],
      "detail": "<p><img alt=\"MC Dropout 不确定性估计示意图\" src=\"https://ar5iv.labs.arxiv.org/html/1506.02142/assets/figs/exp1/co2_standard_dropout_relu.png\" />\n<em>图：标准 Dropout（权重平均）在 CO₂ 数据集上的预测。红色为观测数据，蓝色为预测均值±两倍标准差。MC Dropout 能提供更合理的不确定性估计。</em></p>\n<h5>动机与背景</h5>\n<p>深度学习模型在实际部署中面临一个关键问题：<strong>模型无法表达\"我不确定\"</strong>。传统神经网络只输出点估计，无法区分高置信度预测和低置信度预测。这在安全关键领域（自动驾驶、医疗诊断）中尤为危险。</p>\n<p>贝叶斯方法可以自然地量化不确定性，但传统贝叶斯神经网络（BNN）面临以下困难：\n1. 后验分布 $p(\\boldsymbol{\\omega}|\\mathbf{X},\\mathbf{Y})$ 无法解析求解\n2. 变分推断方法计算代价高，需要额外的变分参数\n3. 难以扩展到现代大规模深度网络</p>\n<p>Gal &amp; Ghahramani 的核心洞察是：<strong>Dropout 本身就是一种变分推断</strong>，无需额外工作即可获得不确定性。</p>\n<h5>核心理论推导</h5>\n<p><strong>Step 1: 定义变分分布</strong></p>\n<p>对于 $L$ 层神经网络，定义每层权重的变分分布：</p>\n<p>$$\\mathbf{W}_i = \\mathbf{M}_i \\cdot \\text{diag}([\\mathbf{z}_{i,j}]_{j=1}^{K_i}), \\quad \\mathbf{z}_{i,j} \\sim \\text{Bernoulli}(p_i)$$</p>\n<p>其中 $\\mathbf{M}<em i_j=\"i,j\">i$ 是待优化的变分参数（即网络权重），$\\mathbf{z}</em>$ 是 Bernoulli 随机变量，$p_i$ 是保留概率。这正是 Dropout 的数学表达。</p>\n<p><strong>Step 2: 变分目标函数</strong></p>\n<p>最小化 KL 散度等价于最大化证据下界（ELBO）：</p>\n<p>$$\\mathcal{L}_{\\text{VI}} = -\\int q(\\boldsymbol{\\omega}) \\log p(\\mathbf{Y}|\\mathbf{X}, \\boldsymbol{\\omega}) \\, d\\boldsymbol{\\omega} + \\text{KL}(q(\\boldsymbol{\\omega}) \\| p(\\boldsymbol{\\omega}))$$</p>\n<p>对第一项用单样本 Monte Carlo 估计，对 KL 项进行近似，得到：</p>\n<p>$$\\hat{\\mathcal{L}}_{\\text{VI}} \\propto \\frac{1}{N} \\sum_{n=1}^{N} E(\\mathbf{y}_n, \\hat{\\mathbf{y}}_n) + \\sum_{i=1}^{L} \\left( \\frac{p_i l^2}{2} \\|\\mathbf{M}_i\\|_2^2 + \\frac{l^2}{2} \\|\\mathbf{m}_i\\|_2^2 \\right)$$</p>\n<div class=\"key-point\">💡 <strong>关键洞察</strong>：上式与带 L2 正则化的 Dropout 训练目标函数形式完全相同！其中 $l$ 为先验长度尺度，$E$ 为损失函数（回归用 MSE，分类用交叉熵）。</div>\n<p><strong>Step 3: 预测不确定性的获取</strong></p>\n<p>训练完成后，近似预测分布为：</p>\n<p>$$q(\\mathbf{y}^*|\\mathbf{x}^*) = \\int p(\\mathbf{y}^*|\\mathbf{x}^*, \\boldsymbol{\\omega}) \\, q(\\boldsymbol{\\omega}) \\, d\\boldsymbol{\\omega}$$</p>\n<p>通过 $T$ 次随机前向传播进行矩匹配估计：</p>\n<p><strong>预测均值</strong>：\n$$\\mathbb{E}_{q(\\mathbf{y}^*|\\mathbf{x}^*)}[\\mathbf{y}^*] \\approx \\frac{1}{T} \\sum_{t=1}^{T} \\hat{\\mathbf{y}}^*(\\mathbf{x}^*, \\mathbf{W}_1^t, \\ldots, \\mathbf{W}_L^t)$$</p>\n<p><strong>预测方差</strong>：\n$$\\text{Var}_{q(\\mathbf{y}^*|\\mathbf{x}^*)}(\\mathbf{y}^*) \\approx \\tau^{-1}\\mathbf{I}_D + \\frac{1}{T}\\sum_{t=1}^{T} \\hat{\\mathbf{y}}^{*T} \\hat{\\mathbf{y}}^* - \\mathbb{E}[\\mathbf{y}^*]^T \\mathbb{E}[\\mathbf{y}^*]$$</p>\n<p>其中 $\\tau = \\frac{l^2 p}{2N\\lambda}$，$\\lambda$ 为权重衰减系数，$p$ 为 Dropout 保留概率。</p>\n<div class=\"warn-box\">⚠️ 注意：$\\tau^{-1}$ 项对应数据固有噪声（偶然不确定性），后两项之差对应模型不确定性（认知不确定性）。</div>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># MC Dropout 不确定性估计\ndef mc_dropout_predict(model, x, T=100, dropout_rate=0.5):\n    &quot;&quot;&quot;\n    model: 已用 Dropout 训练好的神经网络\n    x: 测试输入\n    T: Monte Carlo 采样次数\n    &quot;&quot;&quot;\n    model.train()  # 保持 Dropout 激活（关键！）\n\n    predictions = []\n    for t in range(T):\n        # 每次前向传播使用不同的随机 Dropout 掩码\n        y_hat = model(x)  # Dropout 随机丢弃不同神经元\n        predictions.append(y_hat)\n\n    predictions = stack(predictions)  # shape: [T, batch, output_dim]\n\n    # 预测均值\n    predictive_mean = predictions.mean(dim=0)\n\n    # 预测方差（模型不确定性）\n    predictive_variance = predictions.var(dim=0)\n\n    # 总不确定性 = 模型不确定性 + 数据噪声 (tau^{-1})\n    # tau = l^2 * p / (2 * N * weight_decay)\n\n    return predictive_mean, predictive_variance\n</code></pre>\n<h5>与传统方法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>额外参数</th>\n<th>训练成本</th>\n<th>推理成本</th>\n<th>适用架构</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>精确贝叶斯推断</td>\n<td>无</td>\n<td>不可行</td>\n<td>不可行</td>\n<td>小型网络</td>\n</tr>\n<tr>\n<td>变分贝叶斯 (Bayes by Backprop)</td>\n<td>2×</td>\n<td>2×</td>\n<td>1×</td>\n<td>全连接</td>\n</tr>\n<tr>\n<td>深度集成 (Deep Ensembles)</td>\n<td>M×</td>\n<td>M×</td>\n<td>M×</td>\n<td>任意</td>\n</tr>\n<tr>\n<td><strong>MC Dropout</strong></td>\n<td><strong>0</strong></td>\n<td><strong>0</strong></td>\n<td><strong>T×前向</strong></td>\n<td><strong>任意</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p>MC Dropout 的核心优势在于：\n1. <strong>零额外训练成本</strong>：利用已有 Dropout 训练即可\n2. <strong>零额外参数</strong>：不需要学习额外的方差参数\n3. <strong>实现极简</strong>：只需在推理时保持 <code>model.train()</code> 模式\n4. <strong>理论保证</strong>：有严格的变分推断理论支撑</p>\n<h5>实验验证</h5>\n<p>论文在三个场景验证了 MC Dropout 的有效性：</p>\n<ol>\n<li><strong>回归外推</strong>（CO₂ 浓度预测）：MC Dropout 在数据稀疏区域给出更大的不确定性，而标准 Dropout 权重平均无法表达不确定性</li>\n<li><strong>分类任务</strong>（MNIST）：对旋转/模糊的数字，MC Dropout 输出高不确定性，可用于拒绝不可靠预测</li>\n<li><strong>强化学习探索</strong>：利用不确定性指导 Thompson 采样，实现更高效的探索-利用平衡</li>\n</ol>\n<p>在回归基准测试中，MC Dropout 在预测对数似然和 RMSE 指标上均达到或超过当时的最优方法。</p>",
      "quiz": {
        "q": "MC Dropout 在测试时获取不确定性估计的关键操作是什么？",
        "options": [
          "关闭 Dropout 并使用权重缩放",
          "保持 Dropout 开启，执行多次随机前向传播并计算预测方差",
          "在每层添加额外的方差输出头",
          "使用贝叶斯优化调整 Dropout 概率"
        ],
        "answer": 1,
        "explain": "MC Dropout 的核心是在测试时保持 Dropout 激活，通过 T 次随机前向传播采样近似预测分布，用样本方差估计模型不确定性。这与标准做法（测试时关闭 Dropout）恰好相反。"
      }
    },
    {
      "id": "deep_ensembles",
      "num": 14,
      "name": "Deep Ensembles",
      "fullName": "深度集成 (Deep Ensembles)",
      "year": "2017",
      "org": "DeepMind",
      "parent": "mc_dropout",
      "paperUrl": "https://arxiv.org/abs/1612.01474",
      "projectUrl": "",
      "category": "uncertainty",
      "motivation": "训练多模型聚合预测方差",
      "summary": "Deep Ensembles 提出了一种非贝叶斯的预测不确定性估计方法：通过训练 M 个随机初始化的神经网络（各自输出均值和方差），并将集成预测视为均匀加权的高斯混合模型，结合对抗训练平滑预测分布，在回归和分类任务上实现了优于 MC-Dropout 等近似贝叶斯方法的不确定性估计质量。",
      "keyPoints": [
        "三步简单配方：(1) 使用 proper scoring rule（NLL）作为训练准则；(2) 对抗训练平滑预测分布；(3) 训练 M 个独立网络组成集成",
        "回归网络输出两个值：预测均值 \\(\\mu_\\theta(\\mathbf{x})\\) 和预测方差 \\(\\sigma^2_\\theta(\\mathbf{x})\\)，通过最小化负对数似然（NLL）联合优化",
        "集成预测为均匀加权高斯混合模型，最终方差同时捕获<strong>随机不确定性</strong>（各模型预测方差的均值）和<strong>认知不确定性</strong>（各模型预测均值的方差）",
        "对抗训练使用 FGSM 生成对抗样本，平滑训练数据 ε-邻域内的预测分布",
        "随机初始化 + 随机数据打乱即可产生足够多样性，无需 bagging（bootstrap 反而损害性能）",
        "推荐默认参数：M=5 个网络，ε=输入范围的 1%",
        "在回归、分类、OOD 检测、ImageNet 规模任务上均优于或匹配 MC-Dropout"
      ],
      "detail": "<p><img alt=\"Deep Ensembles 方法示意图\" src=\"https://arxiv.org/html/1612.01474v3/extracted/figures/ensemble_diagram.png\" />\n<em>图：Deep Ensembles 训练与预测流程示意——M 个独立网络各自输出预测分布，集成后得到混合分布</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># Deep Ensembles 训练与预测伪代码 (Algorithm 1)\nM = 5  # 集成网络数量\nepsilon = 0.01 * input_range  # 对抗扰动幅度\n\n# === 训练阶段 ===\nfor m in range(M):\n    theta_m = random_init()  # 随机初始化参数\n    for epoch in range(num_epochs):\n        for x_batch, y_batch in shuffle(dataset):\n            # 计算原始损失\n            loss_orig = NLL(theta_m, x_batch, y_batch)\n            # 生成对抗样本 (FGSM)\n            x_adv = x_batch + epsilon * sign(grad(loss_orig, x_batch))\n            # 对抗训练损失\n            loss_adv = NLL(theta_m, x_adv, y_batch)\n            # 联合优化\n            optimize(theta_m, loss_orig + loss_adv)\n\n# === 预测阶段（回归） ===\ndef predict(x):\n    mu_list, sigma2_list = [], []\n    for m in range(M):\n        mu_m, sigma2_m = network_m(x)  # 每个网络输出均值和方差\n        mu_list.append(mu_m)\n        sigma2_list.append(sigma2_m)\n    # 混合分布的均值和方差\n    mu_star = mean(mu_list)\n    sigma2_star = mean([s + m**2 for s, m in zip(sigma2_list, mu_list)]) - mu_star**2\n    return mu_star, sigma2_star\n</code></pre>\n<h5>动机与背景</h5>\n<p>深度学习模型通常只输出点估计，缺乏对预测不确定性的量化。在安全关键应用（自动驾驶、医疗诊断）中，模型需要\"知道自己不知道什么\"。传统的不确定性估计方法主要依赖贝叶斯神经网络（BNN），但 BNN 面临以下困难：</p>\n<ol>\n<li><strong>计算开销大</strong>：精确后验推断不可行，变分推断（VI）需要额外参数和复杂实现</li>\n<li><strong>先验选择困难</strong>：权重空间的先验难以解释，对结果影响大</li>\n<li><strong>扩展性差</strong>：MCMC 方法难以应用于大规模网络</li>\n</ol>\n<p>MC-Dropout 虽然简化了实现，但其理论基础（作为变分推断的近似）存在争议，且性能受限于 dropout 率的选择。</p>\n<p>Deep Ensembles 提出了一种<strong>非贝叶斯</strong>替代方案：利用神经网络损失函数的多模态性质，通过不同随机初始化训练多个网络，自然地探索参数空间中的不同模式，从而捕获模型不确定性。</p>\n<h5>核心机制一：Proper Scoring Rule 训练</h5>\n<p>论文的第一个关键洞察是：训练准则本身应当鼓励校准的不确定性估计。<strong>Proper scoring rule</strong> 是满足以下性质的评分函数：当且仅当预测分布等于真实分布时，期望得分最大化。</p>\n<p>对于回归问题，网络输出预测均值 \\(\\mu_\\theta(\\mathbf{x})\\) 和方差 \\(\\sigma^2_\\theta(\\mathbf{x})\\)（通过 softplus 保证正性），训练目标为最小化负对数似然：</p>\n<p>$$-\\log p_\\theta(y_n|\\mathbf{x}_n) = \\frac{\\log \\sigma^2_\\theta(\\mathbf{x})}{2} + \\frac{(y - \\mu_\\theta(\\mathbf{x}))^2}{2\\sigma^2_\\theta(\\mathbf{x})} + \\text{constant}$$</p>\n<div class=\"key-point\">💡 关键：与传统 MSE 不同，NLL 损失让网络<strong>自适应地学习每个输入的预测方差</strong>。当模型对某个预测不确定时，它可以增大 \\(\\sigma^2\\) 来降低惩罚——但 \\(\\log \\sigma^2\\) 项又防止方差无限增大。这形成了一个自然的校准机制。</div>\n<p>对于分类问题，softmax 交叉熵损失本身就是 proper scoring rule（由 Gibbs 不等式保证）。</p>\n<h5>核心机制二：对抗训练平滑预测分布</h5>\n<p>论文的第二个创新是将对抗训练重新解释为<strong>预测分布平滑</strong>的手段。使用 FGSM（Fast Gradient Sign Method）生成对抗样本：</p>\n<p>$$\\mathbf{x}' = \\mathbf{x} + \\epsilon \\cdot \\text{sign}(\\nabla_\\mathbf{x} \\ell(\\theta, \\mathbf{x}, y))$$</p>\n<p>训练时同时最小化原始样本和对抗样本上的损失：</p>\n<p>$$\\mathcal{L} = \\ell(\\theta_m, \\mathbf{x}, y) + \\ell(\\theta_m, \\mathbf{x}', y)$$</p>\n<div class=\"key-point\">💡 关键：对抗训练的直觉是——它迫使网络在训练样本的 ε-邻域内保持平滑的预测分布。理想情况下应沿所有 \\(2^D\\) 个方向平滑，但计算上不可行；FGSM 选择损失增长最快的方向，是最高效的平滑策略。</div>\n<h5>核心机制三：集成组合</h5>\n<p>M 个独立训练的网络组成均匀加权混合模型：</p>\n<p>$$p(y|\\mathbf{x}) = \\frac{1}{M}\\sum_{m=1}^{M} p_{\\theta_m}(y|\\mathbf{x})$$</p>\n<p>对于回归任务，每个网络输出高斯分布 \\(\\mathcal{N}(\\mu_{\\theta_m}(\\mathbf{x}), \\sigma^2_{\\theta_m}(\\mathbf{x}))\\)，集成预测近似为单个高斯分布：</p>\n<p>$$\\mu_*(\\mathbf{x}) = \\frac{1}{M}\\sum_m \\mu_{\\theta_m}(\\mathbf{x})$$</p>\n<p>$$\\sigma^2_*(\\mathbf{x}) = \\frac{1}{M}\\sum_m \\left(\\sigma^2_{\\theta_m}(\\mathbf{x}) + \\mu^2_{\\theta_m}(\\mathbf{x})\\right) - \\mu^2_*(\\mathbf{x})$$</p>\n<div class=\"warn-box\">⚠️ 注意：最终方差 \\(\\sigma^2_*\\) 可以分解为两部分：\n- <strong>随机不确定性（Aleatoric）</strong>：\\(\\frac{1}{M}\\sum_m \\sigma^2_{\\theta_m}(\\mathbf{x})\\)，即各网络预测方差的均值，反映数据本身的噪声\n- <strong>认知不确定性（Epistemic）</strong>：\\(\\frac{1}{M}\\sum_m \\mu^2_{\\theta_m}(\\mathbf{x}) - \\mu^2_*(\\mathbf{x})\\)，即各网络预测均值的方差，反映模型对预测的分歧</div>\n<p>这种分解使得 Deep Ensembles 能够区分\"数据本身就有噪声\"和\"模型不确定该怎么预测\"两种不同类型的不确定性。</p>\n<h5>与传统方法的区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>MC-Dropout</th>\n<th>变分推断 (VI)</th>\n<th>Deep Ensembles</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>理论基础</td>\n<td>近似变分推断</td>\n<td>贝叶斯推断</td>\n<td>非贝叶斯（频率学派）</td>\n</tr>\n<tr>\n<td>实现复杂度</td>\n<td>低</td>\n<td>高</td>\n<td>低</td>\n</tr>\n<tr>\n<td>额外参数</td>\n<td>无</td>\n<td>2×</td>\n<td>M× 模型</td>\n</tr>\n<tr>\n<td>并行性</td>\n<td>差（顺序采样）</td>\n<td>差</td>\n<td>优（完全并行）</td>\n</tr>\n<tr>\n<td>超参数</td>\n<td>dropout 率</td>\n<td>先验、变分族</td>\n<td>M, ε</td>\n</tr>\n<tr>\n<td>多模态探索</td>\n<td>单模态附近</td>\n<td>单模态附近</td>\n<td>多模态</td>\n</tr>\n</tbody>\n</table></div>\n<p>Deep Ensembles 的核心优势在于：(1) 实现极其简单，只需对标准训练流程做最小修改；(2) 天然适合分布式计算；(3) 通过不同随机初始化自然探索损失函数的多个局部最优，比单模态近似方法更好地捕获模型不确定性。</p>",
      "quiz": {
        "q": "Deep Ensembles 中集成预测方差公式 σ²*(x) = M⁻¹Σ(σ²_θm + μ²_θm) - μ²* 的物理含义是什么？",
        "options": [
          "仅捕获数据噪声（随机不确定性）",
          "仅捕获模型分歧（认知不确定性）",
          "同时捕获随机不确定性（各网络方差均值）和认知不确定性（各网络均值的方差）",
          "是各网络方差的简单平均"
        ],
        "answer": 2,
        "explain": "方差公式展开后包含两项：M⁻¹Σσ²_θm 对应随机不确定性（数据噪声），M⁻¹Σμ²_θm - μ²* 对应认知不确定性（模型间预测均值的分歧），两者之和即为总预测不确定性。"
      }
    },
    {
      "id": "temperature_scaling",
      "num": 15,
      "name": "Temp Scaling",
      "fullName": "温度缩放 (Temperature Scaling)",
      "year": "2017",
      "org": "康奈尔大学",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/1706.04599",
      "projectUrl": "",
      "category": "uncertainty",
      "motivation": "单一温度参数校准Softmax输出",
      "summary": "现代神经网络的预测置信度严重偏高（过度自信），本文提出 **Temperature Scaling**——仅用一个标量温度参数 \\(T\\) 对 logits 进行缩放后再 softmax，即可在不改变分类准确率的前提下，将模型输出概率校准至与真实正确率一致，是目前最简单有效的后处理校准方法。",
      "keyPoints": [
        "<strong>问题发现</strong>：现代深度网络（ResNet、DenseNet 等）相比早期模型（LeNet 等）校准性能显著退化，预测置信度远高于实际准确率",
        "<strong>校准度量</strong>：采用 Expected Calibration Error (ECE) 和 reliability diagram 量化评估模型校准程度",
        "<strong>miscalibration 归因</strong>：模型容量增大（深度/宽度）、Batch Normalization、权重衰减不足是导致过度自信的关键因素；NLL 在训练后期过拟合是直接原因",
        "<strong>Temperature Scaling 方法</strong>：在已训练模型的 logits 上除以标量 \\(T\\)，再通过 softmax 得到校准后的概率；\\(T\\) 在验证集上最小化 NLL 求解",
        "<strong>关键性质</strong>：Temperature Scaling 不改变 softmax 的 argmax，因此<strong>不影响模型分类准确率</strong>，仅调整置信度分布",
        "<strong>方法对比</strong>：对比了 Histogram Binning、Isotonic Regression、Bayesian Binning into Quantiles (BBQ)、Platt Scaling、Matrix Scaling、Vector Scaling 等方法，Temperature Scaling 在绝大多数设置下 ECE 最低"
      ],
      "detail": "<h5>示意图</h5>\n<p><img alt=\"校准对比：LeNet vs ResNet\" src=\"https://ar5iv.labs.arxiv.org/html/1706.04599/assets/x1.png\" />\n<em>图 1：5 层 LeNet（左）与 110 层 ResNet（右）在 CIFAR-100 上的置信度直方图（上）和可靠性图（下）。LeNet 的置信度分布较均匀且接近对角线（校准良好），而 ResNet 的置信度集中在高置信区间且严重偏离对角线（过度自信）。</em></p>\n<p><img alt=\"Miscalibration 影响因素\" src=\"https://ar5iv.labs.arxiv.org/html/1706.04599/assets/x3.png\" />\n<em>图 2：网络深度（最左）、宽度（中左）、Batch Normalization（中右）、权重衰减（最右）对 ECE 和测试误差的影响。增加深度/宽度、使用 BN 均降低测试误差但恶化校准；权重衰减不足同样导致 ECE 升高。</em></p>\n<p><img alt=\"校准前后对比\" src=\"https://ar5iv.labs.arxiv.org/html/1706.04599/assets/x5.png\" />\n<em>图 4：CIFAR-100 上校准前（最左）与各方法校准后的可靠性图。Temperature Scaling（最右）将预测概率拉回对角线，ECE 从 14.80% 降至 1.60%。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># Temperature Scaling 校准流程\n# 输入：已训练模型 f(x)，验证集 D_val = {(x_i, y_i)}\n\n# Step 1: 提取 logits\nlogits = [f(x_i) for x_i in D_val]  # z_i ∈ R^K\n\n# Step 2: 在验证集上优化温度参数 T\nT = nn.Parameter(torch.ones(1) * 1.5)  # 初始化 T &gt; 0\noptimizer = optim.LBFGS([T], lr=0.01)\n\nfor _ in range(max_iter):\n    def closure():\n        scaled_logits = logits / T          # 温度缩放\n        loss = cross_entropy(scaled_logits, labels)  # NLL 损失\n        loss.backward()\n        return loss\n    optimizer.step(closure)\n\n# Step 3: 推理时使用校准后的概率\ndef calibrated_predict(x):\n    z = f(x)                    # 原始 logits\n    q = softmax(z / T)          # 校准后概率\n    confidence = max(q)         # 校准后置信度\n    prediction = argmax(q)      # 预测类别（与 argmax(z) 相同）\n    return prediction, confidence\n</code></pre>\n<h5>方法细节</h5>\n<p><strong>动机与背景：为什么需要校准？</strong></p>\n<p>在安全关键应用（自动驾驶、医疗诊断）中，模型不仅需要给出正确预测，还需要对预测的不确定性给出可靠估计。理想情况下，当模型声称\"90% 的置信度\"时，其预测应确实有 90% 的概率是正确的。这一性质称为<strong>完美校准（perfect calibration）</strong>，形式化定义为：</p>\n<p>$$\\mathbb{P}(\\hat{Y} = Y \\mid \\hat{p} = p) = p, \\quad \\forall p \\in [0, 1]$$</p>\n<p>其中 \\(\\hat{p}\\) 是模型输出的置信度（softmax 最大值），\\(\\hat{Y}\\) 是预测类别。然而，作者发现现代深度网络严重违反这一性质——它们系统性地<strong>过度自信</strong>：即使预测错误，输出的置信度仍然很高。</p>\n<div class=\"key-point\">💡 关键：早期的浅层网络（如 LeNet）校准性能反而较好，miscalibration 是随着网络变深变大而出现的\"现代病\"。</div>\n<p><strong>Miscalibration 的根源分析</strong></p>\n<p>论文通过控制变量实验揭示了四个关键因素：</p>\n<ol>\n<li>\n<p><strong>模型容量（深度与宽度）</strong>：增加网络层数或每层通道数可以降低分类错误率，但 ECE 同步恶化。更大的模型有更强的拟合能力，容易在训练集上将 NLL 压到极低，导致输出概率趋向 0/1 极端值。</p>\n</li>\n<li>\n<p><strong>Batch Normalization</strong>：BN 显著提升准确率，但也加剧了过度自信。这可能与 BN 改变了损失曲面的几何结构有关，使优化更容易到达 NLL 极低的区域。</p>\n</li>\n<li>\n<p><strong>权重衰减（Weight Decay）</strong>：减小权重衰减系数会降低测试误差，但大幅恶化校准。正则化不足使模型更容易过拟合训练集的 NLL。</p>\n</li>\n<li>\n<p><strong>NLL 过拟合</strong>：这是最直接的原因。作者观察到，在训练后期测试误差已经收敛，但测试 NLL 持续上升（过拟合），这意味着模型在提升准确率的同时，输出概率的质量在下降。</p>\n</li>\n</ol>\n<div class=\"warn-box\">⚠️ 注意：NLL 过拟合不等于分类过拟合。模型的测试准确率可能仍在改善，但概率估计的质量已经恶化——这是一种\"隐性过拟合\"。</div>\n<p><strong>校准度量：Expected Calibration Error (ECE)</strong></p>\n<p>由于完美校准的定义涉及连续概率值，实际中通过分箱近似来计算。将预测样本按置信度分入 \\(M\\) 个等宽区间 \\(B_1, \\ldots, B_M\\)，ECE 定义为：</p>\n<p>$$\\text{ECE} = \\sum_{m=1}^{M} \\frac{|B_m|}{n} \\left| \\text{acc}(B_m) - \\text{conf}(B_m) \\right|$$</p>\n<p>其中 \\(\\text{acc}(B_m)\\) 是第 \\(m\\) 个 bin 中样本的实际准确率，\\(\\text{conf}(B_m)\\) 是该 bin 中样本的平均置信度。ECE 越低，校准越好。对应的可视化工具是 <strong>reliability diagram</strong>：横轴为置信度区间，纵轴为实际准确率，完美校准对应对角线。</p>\n<p><strong>Temperature Scaling 的核心机制</strong></p>\n<p>Temperature Scaling 是 Platt Scaling 的极简特例。对于 \\(K\\) 分类问题，给定模型输出的 logit 向量 \\(\\mathbf{z}_i \\in \\mathbb{R}^K\\)，校准后的置信度为：</p>\n<p>$$\\hat{q}_i = \\max_k \\, \\sigma_{\\text{SM}}\\left(\\frac{\\mathbf{z}_i}{T}\\right)_k$$</p>\n<p>其中 \\(\\sigma_{\\text{SM}}\\) 是 softmax 函数，\\(T > 0\\) 是温度参数。\\(T\\) 通过在验证集上最小化负对数似然（NLL）求解：</p>\n<p>$$T^* = \\arg\\min_T \\, -\\sum_{i=1}^{n} \\log \\sigma_{\\text{SM}}\\left(\\frac{\\mathbf{z}_i}{T}\\right)_{y_i}$$</p>\n<p>这是一个关于单一标量 \\(T\\) 的凸优化问题，可以用 LBFGS 等方法高效求解。</p>\n<div class=\"key-point\">💡 关键：当 \\(T > 1\\) 时，softmax 输出被\"软化\"（概率分布更均匀，置信度降低）；当 \\(T < 1\\) 时，分布被\"锐化\"（置信度升高）。由于现代网络普遍过度自信，最优 \\(T\\) 通常大于 1。</div>\n<p><strong>为什么 Temperature Scaling 不改变准确率？</strong></p>\n<p>因为对所有 logit 除以同一个正数 \\(T\\) 不改变它们的大小排序：</p>\n<p>$$\\arg\\max_k \\, \\sigma_{\\text{SM}}\\left(\\frac{\\mathbf{z}_i}{T}\\right)_k = \\arg\\max_k \\, z_{i,k}$$</p>\n<p>这意味着模型的 top-1 预测类别完全不变，Temperature Scaling 只是重新分配了各类别的概率值，使其更好地反映真实的不确定性。</p>\n<p><strong>与其他校准方法的对比</strong></p>\n<p>论文系统对比了以下方法：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>类型</th>\n<th>参数量</th>\n<th>是否改变准确率</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Histogram Binning</td>\n<td>非参数</td>\n<td>\\(M\\) 个 bin 边界</td>\n<td>是</td>\n</tr>\n<tr>\n<td>Isotonic Regression</td>\n<td>非参数</td>\n<td>单调映射</td>\n<td>是</td>\n</tr>\n<tr>\n<td>BBQ</td>\n<td>非参数</td>\n<td>贝叶斯 bin 组合</td>\n<td>是</td>\n</tr>\n<tr>\n<td>Platt Scaling</td>\n<td>参数化</td>\n<td>\\(2K\\) (Matrix) / \\(2K\\) (Vector)</td>\n<td>可能</td>\n</tr>\n<tr>\n<td><strong>Temperature Scaling</strong></td>\n<td><strong>参数化</strong></td>\n<td><strong>1</strong></td>\n<td><strong>否</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p>Platt Scaling 的一般形式为 \\(\\hat{q}_i = \\sigma_{\\text{SM}}(\\mathbf{W}\\mathbf{z}_i + \\mathbf{b})\\)，其中 Matrix Scaling 使 \\(\\mathbf{W}\\) 为对角矩阵（\\(K\\) 个参数），Vector Scaling 使 \\(\\mathbf{W} = \\text{diag}(\\mathbf{w})\\)（\\(K\\) 个参数加偏置）。Temperature Scaling 是其最简形式：\\(\\mathbf{W} = \\frac{1}{T}\\mathbf{I}\\)，\\(\\mathbf{b} = \\mathbf{0}\\)，仅 1 个参数。</p>\n<p>实验表明，在 CIFAR-10/100、ImageNet、SVHN 以及 Birds、Cars 等细粒度数据集上，Temperature Scaling 的 ECE 始终最低或接近最低，且由于参数极少，几乎不存在过拟合验证集的风险。</p>",
      "quiz": {
        "q": "Temperature Scaling 为什么不会改变模型的分类准确率？",
        "options": [
          "因为温度参数 T 总是等于 1",
          "因为它只调整 softmax 之前的 bias 项",
          "因为对所有 logits 除以同一正数 T 不改变 argmax 的结果",
          "因为它在训练阶段就已经融入了模型参数"
        ],
        "answer": 2,
        "explain": "Temperature Scaling 对 logit 向量的每个分量除以相同的正数 T，这是一个保序变换，不改变各分量的大小排序，因此 softmax 的 argmax（即预测类别）保持不变。"
      }
    },
    {
      "id": "conformal_prediction",
      "num": 16,
      "name": "CP",
      "fullName": "共形预测 (Conformal Prediction)",
      "year": "2005",
      "org": "伦敦大学皇家霍洛威学院",
      "parent": "—",
      "paperUrl": "https://www.jmlr.org/papers/volume9/shafer08a/shafer08a.pdf",
      "projectUrl": "",
      "category": "uncertainty",
      "motivation": "提供有限样本覆盖保证的预测区间",
      "summary": "Conformal Prediction 利用非一致性度量（nonconformity measure）和可交换性假设，为任意机器学习模型的预测构造具有精确有限样本覆盖率保证的预测区域，无需对数据分布做参数化假设。",
      "keyPoints": [
        "基于<strong>可交换性（exchangeability）</strong>假设，比 i.i.d. 更弱，保证有限样本有效性",
        "核心机制：<strong>非一致性度量（nonconformity measure）</strong> \\\\(A(B, z)\\\\) 量化样本相对于数据集的\"异常程度\"",
        "通过 <strong>p 值排名</strong> 构造预测区域：\\\\(\\Gamma_\\varepsilon = \\{z : p_z > \\varepsilon\\}\\\\)",
        "<strong>有效性定理</strong>：对任意可交换序列，\\\\(\\Pr\\{z_n \\notin \\Gamma_\\varepsilon\\} \\leq \\varepsilon\\\\)",
        "可包装任意底层算法（最近邻、SVM、线性回归、神经网络等）为保形预测器",
        "<strong>最优性</strong>：在满足不变性、有效性、嵌套性三个条件的所有预测器中，保形预测器产生最小预测区域",
        "分类问题输出标签子集，回归问题输出预测区间",
        "关键概念：<strong>置信度（confidence）</strong> = \\\\(1-\\varepsilon\\\\)，<strong>可信度（credibility）</strong> = 最大使 \\\\(\\Gamma_\\varepsilon = \\emptyset\\\\) 的 \\\\(\\varepsilon\\\\)"
      ],
      "detail": "<h5>核心框架示意</h5>\n<p>Conformal Prediction 的核心思想可以概括为以下流程：</p>\n<pre><code>训练数据 {z₁,...,zₙ₋₁} + 候选新样本 zₙ\n         ↓\n计算所有样本的非一致性分数 αᵢ = A({z₁,...,zₙ}\\{zᵢ}, zᵢ)\n         ↓\n计算 p 值: p_z = #{i: αᵢ ≥ αₙ} / n\n         ↓\n构造预测区域: Γε = {z : p_z &gt; ε}\n         ↓\n输出具有 (1-ε) 覆盖率保证的预测区域\n</code></pre>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># Conformal Prediction Algorithm (Transductive)\ndef conformal_predict(z_train, x_new, A, epsilon, Y_space):\n    &quot;&quot;&quot;\n    z_train: 训练样本 [(x1,y1), ..., (x_{n-1}, y_{n-1})]\n    x_new: 新对象的特征\n    A: 非一致性度量函数 A(bag, example) -&gt; score\n    epsilon: 显著性水平\n    Y_space: 标签空间（分类为有限集，回归为实数区间网格）\n    &quot;&quot;&quot;\n    prediction_region = []\n\n    for y in Y_space:\n        # Step 1: 假设新样本标签为 y\n        z_n = (x_new, y)\n        bag = z_train + [z_n]  # 所有 n 个样本\n\n        # Step 2: 计算所有非一致性分数\n        alphas = []\n        for i in range(len(bag)):\n            bag_without_i = bag[:i] + bag[i+1:]  # 去掉第 i 个\n            alpha_i = A(bag_without_i, bag[i])\n            alphas.append(alpha_i)\n\n        # Step 3: 计算 p 值\n        alpha_n = alphas[-1]  # 新样本的分数\n        p_y = sum(1 for a in alphas if a &gt;= alpha_n) / len(bag)\n\n        # Step 4: 判断是否纳入预测区域\n        if p_y &gt; epsilon:\n            prediction_region.append(y)\n\n    return prediction_region\n</code></pre>\n<h5>动机与背景</h5>\n<p>传统统计预测区间（如 Fisher 的正态预测区间）依赖强分布假设（独立性 + 正态性）。当这些假设不成立时，覆盖率保证失效。Conformal Prediction 的核心动机是：</p>\n<div class=\"key-point\">💡 <strong>关键洞察</strong>：能否在仅假设数据可交换（而非 i.i.d. 或正态）的条件下，为任意预测算法提供有限样本的覆盖率保证？</div>\n<p><strong>可交换性</strong>是比 i.i.d. 更弱的假设：随机变量序列 \\\\(z_1, \\ldots, z_n\\\\) 是可交换的，当且仅当对任意排列 \\\\(\\pi\\\\)，\\\\((z_{\\pi(1)}, \\ldots, z_{\\pi(n)})\\\\) 与 \\\\((z_1, \\ldots, z_n)\\\\) 同分布。i.i.d. 序列必然可交换，但可交换序列不必独立。</p>\n<h5>核心机制详解</h5>\n<p><strong>1. 非一致性度量 (Nonconformity Measure)</strong></p>\n<p>非一致性度量 \\\\(A(B, z)\\\\) 是一个函数，输入为一个样本袋 \\\\(B\\\\) 和一个样本 \\\\(z\\\\)，输出一个实数，衡量 \\\\(z\\\\) 相对于 \\\\(B\\\\) 的\"不一致程度\"。常见选择包括：</p>\n<ul>\n<li><strong>最近邻距离</strong>：\\\\(A(B, z) = \\min_{z' \\in B} d(z, z')\\\\)</li>\n<li><strong>残差</strong>（回归）：\\\\(A(B, (x,y)) = |y - \\hat{f}_B(x)|\\\\)，其中 \\\\(\\hat{f}_B\\\\) 是基于 \\\\(B\\\\) 训练的模型</li>\n<li><strong>到类均值距离</strong>（分类）：\\\\(A(B, (x,y)) = |\\bar{x}_{B,y} - x|\\\\)</li>\n<li><strong>SVM 分离带</strong>：基于支持向量机分离超平面的位置给出分数</li>\n</ul>\n<div class=\"warn-box\">⚠️ 注意：非一致性度量的选择决定了预测区域的<strong>效率</strong>（大小），但不影响<strong>有效性</strong>（覆盖率保证）。任何非一致性度量都能保证覆盖率。</div>\n<p><strong>2. p 值计算与有效性保证</strong></p>\n<p>给定 \\\\(n\\\\) 个样本（包括假设的新样本），计算非一致性分数 \\\\(\\alpha_1, \\ldots, \\alpha_n\\\\)，新样本的 p 值为：</p>\n<p>$$p_y = \\frac{\\#\\{i = 1, \\ldots, n \\mid \\alpha_i \\geq \\alpha_n\\}}{n}$$</p>\n<p><strong>有效性定理</strong>：若 \\\\(z_1, \\ldots, z_n\\\\) 可交换，则对任意 \\\\(\\varepsilon \\in (0,1)\\\\)：</p>\n<p>$$\\Pr\\{p_{y_n} \\leq \\varepsilon\\} \\leq \\varepsilon$$</p>\n<p>等价地：</p>\n<p>$$\\Pr\\{z_n \\in \\Gamma_\\varepsilon(z_1, \\ldots, z_{n-1})\\} \\geq 1 - \\varepsilon$$</p>\n<p><strong>证明直觉</strong>：可交换性意味着 \\\\((\\alpha_1, \\ldots, \\alpha_n)\\\\) 也是可交换的。因此 \\\\(\\alpha_n\\\\) 在所有分数中排名最高的概率至多为 \\\\(1/n\\\\)，排名在前 \\\\(k\\\\) 的概率至多为 \\\\(k/n\\\\)。当 \\\\(p_y \\leq \\varepsilon\\\\) 时，意味着 \\\\(\\alpha_n\\\\) 的排名在前 \\\\(\\lfloor n\\varepsilon \\rfloor\\\\) 位，概率不超过 \\\\(\\varepsilon\\\\)。</p>\n<p><strong>3. 预测区域的构造</strong></p>\n<ul>\n<li><strong>分类问题</strong>：对标签空间 \\\\(\\mathcal{Y}\\\\) 中的每个标签 \\\\(y\\\\) 计算 \\\\(p_y\\\\)，预测区域为 \\\\(\\Gamma_\\varepsilon = \\{y : p_y > \\varepsilon\\}\\\\)</li>\n<li><strong>回归问题</strong>：对实数轴上的候选值计算 \\\\(p_y\\\\)，预测区域通常为一个区间</li>\n</ul>\n<p>对于分类，自然的报告方式是：\n- <strong>置信度</strong>：最大的 \\\\(1-\\varepsilon\\\\) 使得 \\\\(\\Gamma_\\varepsilon\\\\) 为单一标签\n- <strong>可信度</strong>：最大的 \\\\(\\varepsilon\\\\) 使得 \\\\(\\Gamma_\\varepsilon = \\emptyset\\\\)（低可信度表示新样本对该方法来说是异常的）</p>\n<p><strong>4. 最优性定理</strong></p>\n<p>设 \\\\(\\gamma\\\\) 是满足以下三个条件的任意区域预测器：\n1. <strong>不变性</strong>：预测不依赖训练样本的排列顺序\n2. <strong>有效性</strong>：\\\\(\\Pr\\{z_n \\in \\gamma_\\varepsilon\\} \\geq 1-\\varepsilon\\\\) 对所有可交换分布成立\n3. <strong>嵌套性</strong>：\\\\(\\varepsilon_1 \\geq \\varepsilon_2 \\Rightarrow \\gamma_{\\varepsilon_1} \\subseteq \\gamma_{\\varepsilon_2}\\\\)</p>\n<p>则存在非一致性度量 \\\\(A\\\\) 使得保形预测器 \\\\(\\gamma^A\\\\) 满足 \\\\(\\gamma^A_\\varepsilon(B) \\subseteq \\gamma_\\varepsilon(B)\\\\) 对所有 \\\\(B\\\\) 和 \\\\(\\varepsilon\\\\) 成立。</p>\n<div class=\"key-point\">💡 <strong>直觉</strong>：保形预测器在满足有效性的所有预测器中产生最紧的预测区域——它是最优的。</div>\n<h5>与传统方法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>Fisher 预测区间</th>\n<th>Conformal Prediction</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>分布假设</td>\n<td>正态 + 独立</td>\n<td>仅可交换性</td>\n</tr>\n<tr>\n<td>有效性</td>\n<td>渐近/精确（需假设成立）</td>\n<td>有限样本精确</td>\n</tr>\n<tr>\n<td>适用模型</td>\n<td>线性模型</td>\n<td>任意模型</td>\n</tr>\n<tr>\n<td>计算代价</td>\n<td>低</td>\n<td>较高（需遍历标签空间）</td>\n</tr>\n<tr>\n<td>预测区域形状</td>\n<td>固定（区间）</td>\n<td>自适应（可为任意集合）</td>\n</tr>\n</tbody>\n</table></div>\n<h5>实际应用示例</h5>\n<p>论文通过 Edgar Anderson 的鸢尾花数据集展示了三种非一致性度量的效果：</p>\n<ol>\n<li><strong>最近邻</strong>：\\\\(A(B,(x,y)) = \\min_{(x',y') \\in B, y'=y} |x-x'|\\\\)</li>\n<li>\n<p>96% 置信度预测 versicolor，可信度 32%</p>\n</li>\n<li>\n<p><strong>到类均值距离</strong>：\\\\(A(B,(x,y)) = |\\bar{x}_{B,y} - x|\\\\)</p>\n</li>\n<li>\n<p>96% 置信度预测 versicolor，可信度仅 8%</p>\n</li>\n<li>\n<p><strong>SVM 分离带</strong>：基于最优分离区间的位置</p>\n</li>\n<li>92% 置信度预测 versicolor，可信度 100%</li>\n</ol>\n<p>三种方法的有效性保证相同，但效率（预测区域大小）和可信度不同，体现了非一致性度量选择的重要性。</p>",
      "quiz": {
        "q": "Conformal Prediction 的有效性保证依赖于以下哪个假设？",
        "options": [
          "数据服从正态分布",
          "数据是独立同分布的",
          "数据序列是可交换的",
          "模型的预测误差有界"
        ],
        "answer": 2,
        "explain": "Conformal Prediction 的覆盖率保证仅需要数据序列的可交换性（exchangeability），这比 i.i.d. 更弱的假设。可交换性保证了非一致性分数的对称性，从而使 p 值均匀分布。"
      }
    },
    {
      "id": "geometry_cp",
      "num": 17,
      "name": "Geometry CP",
      "fullName": "几何感知共形预测 (Geometry-Aware Conformal Prediction)",
      "year": "2026.02",
      "org": "斯坦福大学",
      "parent": "conformal_prediction",
      "paperUrl": "https://arxiv.org/abs/2602.16015",
      "projectUrl": "",
      "category": "uncertainty",
      "motivation": "解决黎曼流形上的校准失效问题",
      "summary": "提出自适应测地保形预测（Adaptive Geodesic Conformal Prediction），通过测地距离非一致性分数与交叉验证局部难度估计器的结合，在黎曼流形上生成分布无关、面积自适应的球面帽预测区域，显著改善条件覆盖均匀性与最坏情况覆盖率。",
      "keyPoints": [
        "<strong>三种非一致性分数对比</strong>：Naive Coordinate（坐标空间 \\(L^\\infty\\)）、Standard Geodesic（测地距离 \\(d_{\\text{geo}}\\)）、Adaptive Geodesic（\\(d_{\\text{geo}}/\\hat\\sigma\\)）",
        "<strong>测地距离分数</strong>：利用流形内蕴距离替代欧氏残差，消除坐标图畸变导致的面积浪费",
        "<strong>局部难度估计器 \\(\\hat\\sigma(x)\\)</strong>：通过 5-fold 交叉验证在训练集上训练 KNN 回归器，预测测地残差大小",
        "<strong>预测区域形式</strong>：以 \\(\\hat{y}(x)\\) 为中心、半径 \\(\\hat{q} \\cdot \\hat\\sigma(x)\\) 的测地球（球面帽），半径随局部难度自适应缩放",
        "<strong>分割保形框架</strong>：Train/Calibration/Test 三分，保证有限样本边际覆盖 \\(\\geq 1-\\alpha\\)",
        "<strong>实验验证</strong>：合成 \\(S^2\\) 球面（vMF 分布，50× 异质性）+ IGRF-14 地磁场真实数据",
        "<strong>关键结果</strong>：条件覆盖标准差降低 19%（合成）/71%（IGRF-14），最坏情况覆盖率提升 3–17 个百分点"
      ],
      "detail": "<h5>框架总览</h5>\n<p><img alt=\"Adaptive Geodesic CP 框架示意\" src=\"https://arxiv.org/html/2602.16015v1/x1.png\" />\n<em>图：三种预测区域对比。左：Naive Coordinate 在坐标空间构建 \\(L^\\infty\\) 矩形再投影（极点处面积膨胀）；中：Standard Geodesic 产生固定半径球面帽；右：Adaptive Geodesic 根据局部难度调整帽的半径。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># Algorithm 1: Adaptive Geodesic Conformal Prediction on Manifolds\n# Input: D_train, D_cal, x_new, manifold M, significance α\n\n# Step 1: Train base predictor\ny_hat = KNN_regressor(k=20).fit(D_train)  # extrinsic mean → project to M\n\n# Step 2: Train difficulty estimator via 5-fold CV\nfor fold in 5_fold_split(D_train):\n    residuals_fold = [d_geo(y_hat_fold(x_i), y_i) for (x_i, y_i) in held_out]\nsigma_hat = KNN_regressor(k=20).fit(X_train, residuals_all_folds)\n\n# Step 3: Compute nonconformity scores on calibration set\nscores = [d_geo(y_hat(x_i), y_i) / sigma_hat(x_i) for (x_i, y_i) in D_cal]\n\n# Step 4: Compute conformal quantile\nq_hat = quantile(scores, level=ceil((1-α)(|D_cal|+1)) / |D_cal|)\n\n# Step 5: Construct prediction region for new point\nC(x_new) = {y ∈ M : d_geo(y_hat(x_new), y) ≤ q_hat * sigma_hat(x_new)}\n# This is a geodesic ball (spherical cap on S²) with adaptive radius\n</code></pre>\n<h5>动机与背景</h5>\n<p>传统保形预测（Conformal Prediction）假设数据位于欧氏空间，使用 \\(L^p\\) 范数构建预测区间/区域。当响应变量天然位于黎曼流形（如球面 \\(S^2\\) 上的方向数据、地磁场向量、旋转矩阵等）时，直接在坐标空间操作会引入两个问题：</p>\n<ol>\n<li><strong>坐标图畸变</strong>：球坐标 \\((\\theta, \\phi)\\) 中的 \\(L^\\infty\\) 矩形投影到球面后，在极点附近面积急剧膨胀，导致不必要的覆盖浪费（实验中 Naive 方法面积多出 26%）。</li>\n<li><strong>条件覆盖不均匀</strong>：固定阈值的非一致性分数无法适应预测难度的空间异质性，导致\"容易\"区域过度覆盖而\"困难\"区域欠覆盖。</li>\n</ol>\n<div class=\"key-point\">💡 关键洞察：测地距离是流形上唯一与坐标选择无关的度量，用它作为非一致性分数可以保证预测区域面积的位置无关性。</div>\n<h5>核心机制详解</h5>\n<p><strong>1. 测地距离非一致性分数</strong></p>\n<p>在球面 \\(S^2\\) 上，两点 \\(p, q\\) 的测地距离为：</p>\n<p>$$d_{\\text{geo}}(p, q) = \\arccos(\\langle p, q \\rangle)$$</p>\n<p>标准测地分数定义为：</p>\n<p>$$s(x, y) = d_{\\text{geo}}(\\hat{y}(x), y)$$</p>\n<p>产生的预测区域是以 \\(\\hat{y}(x)\\) 为中心、半径 \\(\\hat{q}\\) 的测地球（球面帽）：</p>\n<p>$$C(x) = \\{y \\in S^2 : d_{\\text{geo}}(\\hat{y}(x), y) \\leq \\hat{q}\\}$$</p>\n<p>球面帽面积为 \\(A = 2\\pi(1 - \\cos\\hat{q})\\)，仅依赖半径 \\(\\hat{q}\\)，与中心位置无关——这正是测地分数消除坐标畸变的几何原因。</p>\n<p><strong>2. 局部难度估计器</strong></p>\n<p>为实现条件覆盖自适应，引入难度函数 \\(\\hat\\sigma: \\mathcal{X} \\to \\mathbb{R}_{>0}\\)，将分数归一化：</p>\n<p>$$s_{\\text{adaptive}}(x, y) = \\frac{d_{\\text{geo}}(\\hat{y}(x), y)}{\\hat\\sigma(x)}$$</p>\n<p>\\(\\hat\\sigma(x)\\) 的训练采用 5-fold 交叉验证策略：\n- 将训练集分为 5 折\n- 每折用其余 4 折训练临时预测器，计算该折样本的测地残差\n- 以所有折的 \\((x_i, \\text{residual}_i)\\) 对训练 KNN 回归器</p>\n<div class=\"warn-box\">⚠️ 注意：\\(\\hat\\sigma\\) 必须仅在训练集上估计（通过 CV），不能使用校准集数据，否则会破坏交换性假设导致覆盖保证失效。</div>\n<p>归一化后的预测区域半径变为 \\(\\hat{q} \\cdot \\hat\\sigma(x)\\)：难度高的区域（\\(\\hat\\sigma\\) 大）获得更大的帽，难度低的区域获得更小的帽，从而均衡条件覆盖。</p>\n<p><strong>3. 覆盖保证</strong></p>\n<p>在交换性假设下，分割保形预测保证：</p>\n<p>$$\\Pr[Y_{n+1} \\in C(X_{n+1})] \\geq 1 - \\alpha$$</p>\n<p>该保证对任意基础预测器 \\(\\hat{y}\\) 和难度估计器 \\(\\hat\\sigma\\) 均成立（有限样本、分布无关）。自适应分数不改变边际覆盖保证，但通过均衡化显著改善条件覆盖。</p>\n<p><strong>4. 与坐标方法的对比</strong></p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th style=\"text-align: center;\">Naive Coordinate</th>\n<th style=\"text-align: center;\">Standard Geodesic</th>\n<th style=\"text-align: center;\">Adaptive Geodesic</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>分数函数</td>\n<td style=\"text-align: center;\">\\(\\|y - \\hat{y}\\|_\\infty\\) (坐标)</td>\n<td style=\"text-align: center;\">\\(d_{\\text{geo}}(\\hat{y}, y)\\)</td>\n<td style=\"text-align: center;\">\\(d_{\\text{geo}}(\\hat{y}, y)/\\hat\\sigma(x)\\)</td>\n</tr>\n<tr>\n<td>区域形状</td>\n<td style=\"text-align: center;\">坐标矩形→不规则球面块</td>\n<td style=\"text-align: center;\">固定半径球面帽</td>\n<td style=\"text-align: center;\">变半径球面帽</td>\n</tr>\n<tr>\n<td>面积一致性</td>\n<td style=\"text-align: center;\">✗（极点膨胀）</td>\n<td style=\"text-align: center;\">✓</td>\n<td style=\"text-align: center;\">✓（且自适应）</td>\n</tr>\n<tr>\n<td>条件覆盖</td>\n<td style=\"text-align: center;\">最差</td>\n<td style=\"text-align: center;\">中等</td>\n<td style=\"text-align: center;\">最优</td>\n</tr>\n</tbody>\n</table></div>\n<h5>实验结果</h5>\n<p><strong>Case 1: 合成球面数据</strong>（\\(n=1200\\), vMF 分布 \\(\\kappa \\in [3, 150]\\), 50× 异质性, 300 trials, \\(\\alpha=0.10\\)）</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th style=\"text-align: center;\">平均面积 (sr)</th>\n<th style=\"text-align: center;\">条件覆盖 Std</th>\n<th style=\"text-align: center;\">最坏 Bin 覆盖</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Adaptive Geodesic</td>\n<td style=\"text-align: center;\"><strong>1.865</strong></td>\n<td style=\"text-align: center;\"><strong>0.042</strong></td>\n<td style=\"text-align: center;\"><strong>0.839</strong></td>\n</tr>\n<tr>\n<td>Standard Geodesic</td>\n<td style=\"text-align: center;\">1.885</td>\n<td style=\"text-align: center;\">0.052</td>\n<td style=\"text-align: center;\">0.814</td>\n</tr>\n<tr>\n<td>Naive Coordinate</td>\n<td style=\"text-align: center;\">2.376</td>\n<td style=\"text-align: center;\">0.067</td>\n<td style=\"text-align: center;\">0.784</td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>Case 2: IGRF-14 地磁场预测</strong>（\\(n=3000\\), 100 trials, \\(r(\\hat\\sigma, \\text{residual})=0.516\\)）</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th style=\"text-align: center;\">平均面积 (sr)</th>\n<th style=\"text-align: center;\">条件覆盖 Std</th>\n<th style=\"text-align: center;\">最坏 Bin 覆盖</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Adaptive Geodesic</td>\n<td style=\"text-align: center;\"><strong>0.038</strong></td>\n<td style=\"text-align: center;\"><strong>0.031</strong></td>\n<td style=\"text-align: center;\"><strong>0.855</strong></td>\n</tr>\n<tr>\n<td>Standard Geodesic</td>\n<td style=\"text-align: center;\">0.039</td>\n<td style=\"text-align: center;\">0.107</td>\n<td style=\"text-align: center;\">0.689</td>\n</tr>\n<tr>\n<td>Naive Coordinate</td>\n<td style=\"text-align: center;\">0.046</td>\n<td style=\"text-align: center;\">0.060</td>\n<td style=\"text-align: center;\">0.805</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 关键发现：在 IGRF-14 数据上，自适应方法将条件覆盖标准差从 0.107 降至 0.031（降低 71%），最坏情况覆盖从 0.689 提升至 0.855（提升 16.6 个百分点）。Wilcoxon 检验 \\(p < 4 \\times 10^{-18}\\)。</div>\n<h5>局限性与未来方向</h5>\n<ul>\n<li><strong>交换性假设</strong>：要求校准数据与测试数据可交换，时间序列等非平稳场景需扩展至非交换保形预测</li>\n<li><strong>各向同性约束</strong>：当前仅生成球面帽（各向同性），无法捕捉方向依赖的预测误差结构</li>\n<li><strong>流形限制</strong>：仅在 \\(S^2\\) 上验证，推广到一般黎曼流形需要高效的测地距离计算</li>\n<li><strong>难度估计器质量</strong>：当 \\(r(\\hat\\sigma, \\text{residual}) < 0.15\\) 时，建议退化为 Standard Geodesic</li>\n</ul>",
      "quiz": {
        "q": "Adaptive Geodesic CP 中，局部难度估计器 σ̂(x) 的训练为什么必须使用交叉验证而非直接在训练集上计算残差？",
        "options": [
          "为了减少计算开销",
          "为了避免过拟合导致 σ̂ 低估真实残差，从而使校准分数分布失真",
          "为了满足保形预测的交换性假设",
          "为了使 σ̂ 能够泛化到校准集以外的数据"
        ],
        "answer": 1,
        "explain": "如果直接用训练集残差训练 σ̂，由于预测器对训练数据过拟合，残差会被系统性低估，导致 σ̂ 偏小，进而使归一化后的校准分数偏大、预测区域过大。5-fold CV 产生的 out-of-fold 残差更接近真实泛化误差。"
      }
    },
    {
      "id": "irm",
      "num": 18,
      "name": "IRM",
      "fullName": "不变风险最小化 (Invariant Risk Minimization)",
      "year": "2019",
      "org": "Facebook AI Research",
      "parent": "scm",
      "paperUrl": "https://arxiv.org/abs/1907.02893",
      "projectUrl": "",
      "category": "robust_prediction",
      "motivation": "学习跨环境稳定的特征表示",
      "summary": "IRM 的核心目标是：学习跨环境稳定的特征表示。",
      "keyPoints": [
        "核心动机：学习跨环境稳定的特征表示",
        "演化来源：继承或改进自 scm",
        "代表机构：Facebook AI Research"
      ],
      "detail": "<p>学习跨环境稳定的特征表示</p>"
    }
  ],
  "categories": {
    "causal_inference": {
      "label": "因果推断",
      "color": "#3B82F6"
    },
    "counterfactual": {
      "label": "反事实学习",
      "color": "#8B5CF6"
    },
    "uncertainty": {
      "label": "不确定性量化",
      "color": "#10B981"
    },
    "robust_prediction": {
      "label": "可靠预测",
      "color": "#F59E0B"
    }
  },
  "projectUrls": {}
};
