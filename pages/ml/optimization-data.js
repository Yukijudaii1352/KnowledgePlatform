/**
 * optimization-data.js — 由 pipeline/build.py 于 2026-05-26 10:35:21 自动生成。
 * 源文件：content/ml/optimization.md
 * ⚠️  请勿手动修改；如需更新，修改源文档后重新编译。
 */
window.PAGE_CONFIG = {
  "meta": {
    "domain": "ml",
    "topic_id": "optimization",
    "topic_name": "优化理论",
    "page_title": "优化理论 算法总结",
    "page_subtitle": "2026-05-26 版",
    "page_desc": "从1847年梯度下降法到2026年Muon矩阵优化器，系统梳理凸优化、非凸优化、随机梯度方法与收敛性分析的技术演化。",
    "page_icon": "📐",
    "hero_pills": [
      "🏷️ 凸优化 · 非凸优化 · 随机梯度 · 收敛性分析"
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
        "id": "newton",
        "x": 60,
        "y": 80,
        "category": "convex"
      },
      {
        "id": "gd",
        "x": 100,
        "y": 80,
        "category": "convex"
      },
      {
        "id": "sgd",
        "x": 160,
        "y": 200,
        "category": "stochastic"
      },
      {
        "id": "frank_wolfe",
        "x": 180,
        "y": 440,
        "category": "accelerated"
      },
      {
        "id": "admm",
        "x": 240,
        "y": 80,
        "category": "convex"
      },
      {
        "id": "lbfgs",
        "x": 280,
        "y": 440,
        "category": "accelerated"
      },
      {
        "id": "nag",
        "x": 320,
        "y": 440,
        "category": "accelerated"
      },
      {
        "id": "mirror_descent",
        "x": 330,
        "y": 540,
        "category": "accelerated"
      },
      {
        "id": "interior_point",
        "x": 360,
        "y": 80,
        "category": "convex"
      },
      {
        "id": "natural_gradient",
        "x": 420,
        "y": 440,
        "category": "accelerated"
      },
      {
        "id": "fista",
        "x": 480,
        "y": 80,
        "category": "convex"
      },
      {
        "id": "adagrad",
        "x": 520,
        "y": 320,
        "category": "adaptive"
      },
      {
        "id": "rmsprop",
        "x": 560,
        "y": 320,
        "category": "adaptive"
      },
      {
        "id": "svrg",
        "x": 580,
        "y": 200,
        "category": "stochastic"
      },
      {
        "id": "adam",
        "x": 620,
        "y": 320,
        "category": "adaptive"
      },
      {
        "id": "saga",
        "x": 640,
        "y": 200,
        "category": "stochastic"
      },
      {
        "id": "amsgrad",
        "x": 700,
        "y": 320,
        "category": "adaptive"
      },
      {
        "id": "muon",
        "x": 780,
        "y": 560,
        "category": "frontier"
      },
      {
        "id": "graal",
        "x": 850,
        "y": 440,
        "category": "frontier"
      },
      {
        "id": "alias",
        "x": 860,
        "y": 320,
        "category": "frontier"
      }
    ],
    "edges": [
      {
        "from": "gd",
        "to": "sgd",
        "label": "随机采样近似"
      },
      {
        "from": "gd",
        "to": "nag",
        "label": "展望式动量加速"
      },
      {
        "from": "gd",
        "to": "adagrad",
        "label": "参数自适应"
      },
      {
        "from": "gd",
        "to": "mirror_descent",
        "label": "非欧几何推广"
      },
      {
        "from": "newton",
        "to": "lbfgs",
        "label": "有限内存近似"
      },
      {
        "from": "newton",
        "to": "natural_gradient",
        "label": "信息几何度量"
      },
      {
        "from": "nag",
        "to": "fista",
        "label": "近端算子加速"
      },
      {
        "from": "nag",
        "to": "graal",
        "label": "无参数自适应"
      },
      {
        "from": "sgd",
        "to": "svrg",
        "label": "方差缩减修正"
      },
      {
        "from": "svrg",
        "to": "saga",
        "label": "无偏+近端"
      },
      {
        "from": "sgd",
        "to": "adagrad",
        "label": "累积梯度"
      },
      {
        "from": "adagrad",
        "to": "rmsprop",
        "label": "指数衰减均值"
      },
      {
        "from": "rmsprop",
        "to": "adam",
        "label": "融合一二阶矩"
      },
      {
        "from": "adam",
        "to": "amsgrad",
        "label": "修复收敛漏洞"
      },
      {
        "from": "adam",
        "to": "alias",
        "label": "符号化无参数"
      },
      {
        "from": "natural_gradient",
        "to": "muon",
        "label": "正交化动量"
      }
    ],
    "milestones": [
      "sgd",
      "adam",
      "muon"
    ]
  },
  "algos": [
    {
      "id": "gd",
      "num": 1,
      "name": "GD",
      "fullName": "梯度下降法 (Gradient Descent)",
      "year": "1847",
      "org": "Cauchy",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/1609.04747",
      "projectUrl": "",
      "category": "convex",
      "motivation": "沿负梯度方向迭代搜索，一阶优化鼻祖",
      "summary": "梯度下降法通过沿目标函数负梯度方向迭代更新参数，以最小化损失函数，是几乎所有现代优化算法的基石。其三大变体——批量梯度下降（Batch GD）、随机梯度下降（SGD）和小批量梯度下降（Mini-batch GD）——在计算效率与收敛稳定性之间提供了不同的权衡方案。",
      "keyPoints": [
        "<strong>基本更新规则</strong>：参数沿目标函数梯度的反方向以学习率 <span class=\"kb-math kb-math-inline\">\\eta</span> 步长迭代更新：<span class=\"kb-math kb-math-inline\">\\theta \\leftarrow \\theta - \\eta \\nabla_\\theta J(\\theta)</span>",
        "<strong>三大变体</strong>：Batch GD（全量数据计算梯度）、SGD（单样本计算梯度）、Mini-batch GD（小批量数据计算梯度）",
        "<strong>收敛保证</strong>：凸函数上 Batch GD 保证收敛到全局最优；非凸函数上收敛到局部最优",
        "<strong>SGD 的噪声特性</strong>：高方差更新带来的随机性有助于跳出局部最优，但也导致收敛过程中的剧烈震荡",
        "<strong>四大核心挑战</strong>：学习率选择困难、所有参数共享同一学习率、学习率调度需预定义、鞍点逃逸困难",
        "<strong>后续改进方向</strong>：动量（Momentum）、自适应学习率（Adagrad/RMSprop/Adam）、Nesterov 加速梯度等均在 GD 基础上发展而来"
      ],
      "detail": "<p><img alt=\"各优化器在损失曲面等高线上的轨迹对比\" src=\"https://ar5iv.labs.arxiv.org/html/1609.04747/assets/images/contours_evaluation_optimizers_final_frame.png\" />\n<em>图 1：不同优化算法在损失函数等高线上的收敛轨迹对比。SGD（无动量）收敛路径曲折且缓慢，而自适应方法（Adagrad、RMSprop、Adam）能更快抵达最优点。</em></p>\n<p><img alt=\"各优化器在鞍点处的行为\" src=\"https://ar5iv.labs.arxiv.org/html/1609.04747/assets/images/saddle_point_evaluation_optimizers_frame.png\" />\n<em>图 2：不同优化算法在鞍点处的逃逸行为。SGD 在鞍点附近几乎停滞，而自适应学习率方法能迅速沿负曲率方向逃逸。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># === Batch Gradient Descent ===\nfor epoch in range(nb_epochs):\n    gradient = evaluate_gradient(loss_function, full_dataset, params)\n    params = params - learning_rate * gradient\n\n# === Stochastic Gradient Descent (SGD) ===\nfor epoch in range(nb_epochs):\n    np.random.shuffle(data)\n    for sample in data:\n        gradient = evaluate_gradient(loss_function, sample, params)\n        params = params - learning_rate * gradient\n\n# === Mini-batch Gradient Descent ===\nfor epoch in range(nb_epochs):\n    np.random.shuffle(data)\n    for batch in get_batches(data, batch_size=64):\n        gradient = evaluate_gradient(loss_function, batch, params)\n        params = params - learning_rate * gradient\n</code></pre>\n<h5>动机与背景</h5>\n<p>梯度下降法的思想最早由 Cauchy 于 1847 年提出：对于一个可微的目标函数 <span class=\"kb-math kb-math-inline\">J(\\theta)</span>，其在某点处下降最快的方向就是该点负梯度方向 <span class=\"kb-math kb-math-inline\">-\\nabla_\\theta J(\\theta)</span>。这一简洁而深刻的数学直觉构成了几乎所有一阶优化方法的理论基础。</p>\n<p>在深度学习时代，梯度下降法成为训练神经网络的标准范式。然而，原始的批量梯度下降在面对大规模数据集时存在严重的计算瓶颈——每次参数更新都需要遍历整个训练集来计算梯度，这在数据量达到百万甚至十亿级别时几乎不可行。</p>\n<h5>核心机制：三大变体</h5>\n<p><strong>1. 批量梯度下降 (Batch GD)</strong></p>\n<p>对整个训练集计算梯度后进行一次参数更新：</p>\n<div class=\"kb-math kb-math-display\">\\theta = \\theta - \\eta \\cdot \\nabla_\\theta J(\\theta)</div>\n<div class=\"key-point\">💡 <strong>关键</strong>：Batch GD 在凸优化问题上保证收敛到全局最优，在非凸问题上收敛到局部最优。但其计算代价与数据集大小成正比，且无法进行在线学习。</div>\n<p><strong>2. 随机梯度下降 (SGD)</strong></p>\n<p>对每个训练样本 <span class=\"kb-math kb-math-inline\">(x^{(i)}, y^{(i)})</span> 单独计算梯度并更新参数：</p>\n<div class=\"kb-math kb-math-display\">\\theta = \\theta - \\eta \\cdot \\nabla_\\theta J(\\theta; x^{(i)}; y^{(i)})</div>\n<p>SGD 的核心特征是<strong>高方差更新</strong>：由于每次仅基于单个样本估计梯度，更新方向存在显著噪声。这种噪声是一把双刃剑：</p>\n<ul>\n<li><strong>优势</strong>：随机波动使优化轨迹能够跳出浅层局部最优，探索更广阔的参数空间</li>\n<li><strong>劣势</strong>：即使接近最优解，仍会持续震荡，难以精确收敛</li>\n</ul>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：理论上，当学习率按特定调度（如 <span class=\"kb-math kb-math-inline\">\\eta_t \\propto 1/t</span>）逐步衰减时，SGD 的收敛行为与 Batch GD 等价。</div>\n<p><strong>3. 小批量梯度下降 (Mini-batch GD)</strong></p>\n<p>对大小为 <span class=\"kb-math kb-math-inline\">n</span> 的小批量数据计算梯度：</p>\n<div class=\"kb-math kb-math-display\">\\theta = \\theta - \\eta \\cdot \\nabla_\\theta J(\\theta; x^{(i:i+n)}; y^{(i:i+n)})</div>\n<p>Mini-batch GD 结合了前两者的优势：\n- 相比 SGD，<strong>降低了参数更新的方差</strong>，使收敛过程更稳定\n- 相比 Batch GD，<strong>充分利用了矩阵运算的并行加速</strong>，现代 GPU/TPU 对批量矩阵运算有极高的吞吐率\n- 常用批量大小为 50–256，这也是深度学习实践中最常用的训练方式</p>\n<div class=\"key-point\">💡 <strong>关键</strong>：在实际使用中，\"SGD\" 一词通常指代 Mini-batch GD，而非严格意义上的单样本随机梯度下降。</div>\n<h5>梯度下降面临的核心挑战</h5>\n<p>论文系统总结了原始梯度下降法的四大核心挑战，这些挑战也正是后续所有改进算法的出发点：</p>\n<p><strong>挑战 1：学习率选择困难</strong>\n- 学习率 <span class=\"kb-math kb-math-inline\">\\eta</span> 过小 → 收敛极慢，训练时间不可接受\n- 学习率 <span class=\"kb-math kb-math-inline\">\\eta</span> 过大 → 损失函数在最优值附近震荡甚至发散</p>\n<p><strong>挑战 2：学习率调度的局限性</strong>\n- 预定义的退火策略（如阶梯衰减、指数衰减）无法自适应地根据数据特征调整，需要大量人工调参</p>\n<p><strong>挑战 3：所有参数共享同一学习率</strong>\n- 对于稀疏数据，高频特征和低频特征的梯度量级差异巨大。理想情况下，低频特征应使用更大的学习率以加速学习，但标准 GD 无法做到这一点</p>\n<p><strong>挑战 4：鞍点问题</strong>\n- 在高维非凸优化中，鞍点（某些维度上升、某些维度下降的点）远比局部最优更常见。鞍点周围梯度接近零，SGD 在此几乎停滞不前</p>\n<h5>与后续方法的关系</h5>\n<p>梯度下降法的这些挑战直接催生了一系列改进算法：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>挑战</th>\n<th>改进方法</th>\n<th>核心思路</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>收敛震荡</td>\n<td>Momentum</td>\n<td>引入动量项 <span class=\"kb-math kb-math-inline\">v_t = \\gamma v_{t-1} + \\eta \\nabla_\\theta J(\\theta)</span>，累积历史梯度方向</td>\n</tr>\n<tr>\n<td>前瞻性不足</td>\n<td>Nesterov AG</td>\n<td>在动量方向上\"先走一步\"再计算梯度，提供预见性修正</td>\n</tr>\n<tr>\n<td>统一学习率</td>\n<td>Adagrad</td>\n<td>为每个参数维护独立的累积梯度平方和，自动缩放学习率</td>\n</tr>\n<tr>\n<td>学习率单调递减</td>\n<td>RMSprop / Adadelta</td>\n<td>使用梯度平方的指数移动平均替代累积和，避免学习率趋于零</td>\n</tr>\n<tr>\n<td>综合优化</td>\n<td>Adam</td>\n<td>结合一阶矩（动量）与二阶矩（自适应学习率），并加入偏差修正</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 <strong>关键</strong>：所有这些方法的参数更新核心仍然是 <span class=\"kb-math kb-math-inline\">\\theta \\leftarrow \\theta - \\Delta\\theta</span>，区别仅在于 <span class=\"kb-math kb-math-inline\">\\Delta\\theta</span> 的计算方式。梯度下降法提供了这一统一框架。</div>",
      "quiz": {
        "q": "以下关于梯度下降三大变体的描述，哪一项是正确的？",
        "options": [
          "Batch GD 每次仅使用一个样本计算梯度，因此速度最快",
          "SGD 的高方差更新只有负面影响，会严重阻碍收敛",
          "Mini-batch GD 通过对小批量数据计算梯度，在收敛稳定性和计算效率之间取得平衡",
          "三种变体在凸优化问题上的收敛速度完全相同"
        ],
        "answer": 2,
        "explain": "Mini-batch GD 结合了 Batch GD 的低方差和 SGD 的高效率，通过小批量梯度估计在稳定性与速度之间取得最佳平衡，是深度学习实践中最常用的训练方式。"
      }
    },
    {
      "id": "newton",
      "num": 2,
      "name": "Newton's Method",
      "fullName": "牛顿法 (Newton's Method)",
      "year": "1740",
      "org": "Newton/Simpson",
      "parent": "—",
      "paperUrl": "https://en.wikipedia.org/wiki/Newton%27s_method_in_optimization",
      "projectUrl": "",
      "category": "convex",
      "motivation": "利用Hessian矩阵实现局部二次收敛",
      "summary": "牛顿法通过构造目标函数的二阶泰勒近似并求解其极值点来迭代更新参数，利用 Hessian 矩阵的曲率信息实现局部二次收敛速度，是所有二阶优化方法的理论基石。",
      "keyPoints": [
        "二阶优化方法：利用梯度（一阶）和 Hessian 矩阵（二阶）信息确定搜索方向",
        "迭代公式：<span class=\"kb-math kb-math-inline\">x_{k+1} = x_k - [H(x_k)]^{-1} \\nabla f(x_k)</span>，其中 <span class=\"kb-math kb-math-inline\">H</span> 为 Hessian 矩阵",
        "局部二次收敛：在最优解附近满足条件时，误差以平方速度衰减",
        "几何直觉：每步用二次曲面拟合目标函数，直接跳到该曲面的极值点",
        "对二次函数精确求解：若目标函数恰好是二次函数，一步即可到达最优解",
        "核心限制：需要 Hessian 正定且可逆；计算/存储 Hessian 代价为 <span class=\"kb-math kb-math-inline\">O(d^2)</span> 空间和 <span class=\"kb-math kb-math-inline\">O(d^3)</span> 求逆时间",
        "衍生方法：拟牛顿法（BFGS/L-BFGS）、Gauss-Newton、Levenberg-Marquardt、信赖域方法"
      ],
      "detail": "<p><img alt=\"牛顿法与梯度下降对比示意图\" src=\"https://upload.wikimedia.org/wikipedia/commons/d/da/Newton_optimization_vs_grad_descent.svg\" />\n<em>图：梯度下降（绿色）与牛顿法（红色）的优化路径对比。牛顿法利用曲率信息，以更直接的路径趋近最优解。</em></p>\n<pre><code class=\"language-python\"># Newton's Method 优化伪代码\nimport numpy as np\n\ndef newton_method(f, grad_f, hessian_f, x0, tol=1e-8, max_iter=100):\n    &quot;&quot;&quot;\n    f: 目标函数\n    grad_f: 梯度函数 ∇f(x) → R^d\n    hessian_f: Hessian函数 H(x) → R^{d×d}\n    x0: 初始点\n    &quot;&quot;&quot;\n    x = x0\n    for k in range(max_iter):\n        g = grad_f(x)           # 计算梯度\n        H = hessian_f(x)        # 计算Hessian矩阵\n\n        # 求解牛顿方程: H @ delta_x = -g\n        delta_x = np.linalg.solve(H, -g)  # 牛顿方向\n\n        x = x + delta_x         # 更新参数\n\n        if np.linalg.norm(g) &lt; tol:\n            break\n    return x\n</code></pre>\n<p><strong>动机与背景</strong></p>\n<p>在优化问题中，一阶方法（如梯度下降）仅利用目标函数的梯度信息来确定下降方向。梯度下降的更新公式为 <span class=\"kb-math kb-math-inline\">x_{k+1} = x_k - \\alpha \\nabla f(x_k)</span>，其中步长 <span class=\"kb-math kb-math-inline\">\\alpha</span> 需要精心调节。一阶方法的根本缺陷在于：它忽略了目标函数的<strong>曲率信息</strong>——在曲率大的方向上步长应该小，曲率小的方向上步长可以大。这导致梯度下降在病态问题（条件数大）上收敛极慢，呈现\"之字形\"震荡。</p>\n<p>牛顿法的核心动机是：<strong>利用二阶导数（Hessian矩阵）提供的曲率信息，自适应地调整每个方向上的步长</strong>，从而实现远超一阶方法的收敛速度。</p>\n<p><strong>核心机制：二阶泰勒展开与迭代求解</strong></p>\n<p>牛顿法的推导基于目标函数 <span class=\"kb-math kb-math-inline\">f(x)</span> 在当前迭代点 <span class=\"kb-math kb-math-inline\">x_k</span> 处的二阶泰勒展开：</p>\n<div class=\"kb-math kb-math-display\">f(x_k + \\Delta x) \\approx f(x_k) + \\nabla f(x_k)^\\top \\Delta x + \\frac{1}{2} \\Delta x^\\top H(x_k) \\Delta x</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">H(x_k) = \\nabla^2 f(x_k)</span> 是 Hessian 矩阵。为了最小化这个二次近似，对 <span class=\"kb-math kb-math-inline\">\\Delta x</span> 求导并令其为零：</p>\n<div class=\"kb-math kb-math-display\">\\nabla f(x_k) + H(x_k) \\Delta x = 0</div>\n<p>求解得到<strong>牛顿方向</strong>：</p>\n<div class=\"kb-math kb-math-display\">\\Delta x = -[H(x_k)]^{-1} \\nabla f(x_k)</div>\n<p>因此牛顿法的迭代公式为：</p>\n<div class=\"kb-math kb-math-display\">x_{k+1} = x_k - [H(x_k)]^{-1} \\nabla f(x_k)</div>\n<div class=\"key-point\">💡 关键直觉：牛顿法相当于在每一步用一个二次曲面（抛物面）去拟合目标函数，然后直接跳到该二次曲面的极值点。如果目标函数本身就是二次的，牛顿法一步到位。</div>\n<p><strong>收敛性分析</strong></p>\n<p>在满足以下条件时，牛顿法具有<strong>局部二次收敛</strong>性质：\n1. <span class=\"kb-math kb-math-inline\">f</span> 二阶连续可微\n2. Hessian 在最优解 <span class=\"kb-math kb-math-inline\">x^*</span> 处正定\n3. Hessian 满足 Lipschitz 连续条件</p>\n<p>此时存在 <span class=\"kb-math kb-math-inline\">x^*</span> 的邻域，使得从该邻域内任意初始点出发，迭代满足：</p>\n<div class=\"kb-math kb-math-display\">\\|x_{k+1} - x^*\\| \\leq C \\|x_k - x^*\\|^2</div>\n<p>这意味着有效数字位数每步翻倍。例如，若当前误差为 <span class=\"kb-math kb-math-inline\">10^{-4}</span>，下一步误差约为 <span class=\"kb-math kb-math-inline\">10^{-8}</span>，再下一步约为 <span class=\"kb-math kb-math-inline\">10^{-16}</span>。</p>\n<div class=\"warn-box\">⚠️ 注意：二次收敛仅在局部成立。远离最优解时，牛顿法可能发散、震荡或收敛到鞍点。实际使用中通常结合<strong>线搜索</strong>（line search）或<strong>信赖域</strong>（trust region）策略来保证全局收敛性。</div>\n<p><strong>一维情形的特殊形式</strong></p>\n<p>对于一元函数 <span class=\"kb-math kb-math-inline\">f: \\mathbb{R} \\to \\mathbb{R}</span>，Hessian 退化为二阶导数标量 <span class=\"kb-math kb-math-inline\">f&#x27;&#x27;(x)</span>，迭代公式简化为：</p>\n<div class=\"kb-math kb-math-display\">x_{k+1} = x_k - \\frac{f&#x27;(x_k)}{f&#x27;&#x27;(x_k)}</div>\n<p>这本质上是对导数 <span class=\"kb-math kb-math-inline\">f&#x27;(x)</span> 应用牛顿求根法，寻找 <span class=\"kb-math kb-math-inline\">f&#x27;(x) = 0</span> 的解（即驻点）。</p>\n<p><strong>与梯度下降的本质区别</strong></p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>梯度下降</th>\n<th>牛顿法</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>使用信息</td>\n<td>一阶（梯度）</td>\n<td>二阶（梯度 + Hessian）</td>\n</tr>\n<tr>\n<td>收敛速度</td>\n<td>线性收敛</td>\n<td>二次收敛（局部）</td>\n</tr>\n<tr>\n<td>步长选择</td>\n<td>需手动设定学习率 <span class=\"kb-math kb-math-inline\">\\alpha</span></td>\n<td>自适应（由 Hessian 决定）</td>\n</tr>\n<tr>\n<td>每步计算量</td>\n<td><span class=\"kb-math kb-math-inline\">O(d)</span></td>\n<td><span class=\"kb-math kb-math-inline\">O(d^3)</span>（求解线性系统）</td>\n</tr>\n<tr>\n<td>存储需求</td>\n<td><span class=\"kb-math kb-math-inline\">O(d)</span></td>\n<td><span class=\"kb-math kb-math-inline\">O(d^2)</span>（存储 Hessian）</td>\n</tr>\n<tr>\n<td>对条件数敏感性</td>\n<td>高（收敛率 <span class=\"kb-math kb-math-inline\">\\propto \\kappa</span>）</td>\n<td>低（仿射不变）</td>\n</tr>\n</tbody>\n</table></div>\n<p>牛顿法的一个重要性质是<strong>仿射不变性</strong>：对变量做线性变换 <span class=\"kb-math kb-math-inline\">x = Ay</span> 后，牛顿法在新坐标下的迭代轨迹与原坐标完全等价，而梯度下降则会因坐标变换而改变行为。</p>\n<p><strong>实际应用中的关键问题与改进</strong></p>\n<ol>\n<li><strong>Hessian 非正定</strong>：当 Hessian 不正定时，牛顿方向可能不是下降方向，甚至指向鞍点。解决方案包括：</li>\n<li>修正 Hessian：添加正则项 <span class=\"kb-math kb-math-inline\">H + \\mu I</span>（类似 Levenberg-Marquardt）</li>\n<li>对角化后将负特征值取绝对值或设为正数 <span class=\"kb-math kb-math-inline\">\\epsilon</span></li>\n<li>\n<p>使用信赖域方法约束步长</p>\n</li>\n<li>\n<p><strong>计算代价过高</strong>：对于 <span class=\"kb-math kb-math-inline\">d</span> 维问题，精确计算和求逆 Hessian 需要 <span class=\"kb-math kb-math-inline\">O(d^2)</span> 存储和 <span class=\"kb-math kb-math-inline\">O(d^3)</span> 计算。改进方案：</p>\n</li>\n<li><strong>拟牛顿法</strong>（Quasi-Newton）：用梯度差分近似 Hessian 或其逆（BFGS、L-BFGS）</li>\n<li><strong>截断牛顿法</strong>：用共轭梯度法近似求解牛顿方程，无需显式构造 Hessian</li>\n<li>\n<p><strong>Hessian-free 方法</strong>：仅需 Hessian-向量积 <span class=\"kb-math kb-math-inline\">Hv</span>，可通过自动微分高效计算</p>\n</li>\n<li>\n<p><strong>全局收敛保障</strong>：</p>\n</li>\n<li><strong>带回溯线搜索的牛顿法</strong>：沿牛顿方向做 Armijo 线搜索</li>\n<li><strong>信赖域牛顿法</strong>：在信赖域半径内求解约束二次子问题</li>\n</ol>",
      "quiz": {
        "q": "牛顿法相比梯度下降的核心优势来源于什么？",
        "options": [
          "使用更小的学习率避免震荡",
          "利用Hessian矩阵的曲率信息自适应调整各方向步长",
          "通过动量项加速收敛",
          "使用随机采样减少计算量"
        ],
        "answer": 1,
        "explain": "牛顿法的核心优势在于利用二阶导数（Hessian矩阵）提供的曲率信息，在曲率大的方向取小步、曲率小的方向取大步，从而实现自适应的最优步长选择和局部二次收敛。"
      }
    },
    {
      "id": "interior_point",
      "num": 3,
      "name": "Interior Point",
      "fullName": "内点法 (Interior Point Method)",
      "year": "1984",
      "org": "AT&T Bell Labs",
      "parent": "—",
      "paperUrl": "https://en.wikipedia.org/wiki/Karmarkar%27s_algorithm",
      "projectUrl": "",
      "category": "convex",
      "motivation": "首个多项式时间线性规划算法",
      "summary": "内点法通过在可行域内部沿中心路径（Central Path）迭代逼近最优解，利用障碍函数将约束融入目标函数，以多项式时间复杂度求解线性规划及一般凸优化问题，彻底改变了数学规划的理论格局与实践范式。",
      "keyPoints": [
        "<strong>核心思想</strong>：不同于单纯形法沿多面体顶点搜索，内点法从可行域严格内部出发，沿中心路径逐步逼近最优解",
        "<strong>障碍函数</strong>：通过对数障碍函数 <span class=\"kb-math kb-math-inline\">\\phi(x) = -\\sum_{i} \\ln(s_i)</span> 将不等式约束隐式编码进目标函数，使约束边界产生无穷大\"势垒\"",
        "<strong>中心路径</strong>：参数化曲线 <span class=\"kb-math kb-math-inline\">\\{x(\\mu) : \\mu &gt; 0\\}</span>，当障碍参数 <span class=\"kb-math kb-math-inline\">\\mu \\to 0</span> 时收敛至原问题最优解",
        "<strong>多项式复杂度</strong>：Karmarkar 原始算法复杂度为 <span class=\"kb-math kb-math-inline\">O(n^{3.5} L)</span>，现代原始-对偶方法达到 <span class=\"kb-math kb-math-inline\">O(n^3 \\sqrt{n} \\log(1/\\epsilon))</span>",
        "<strong>牛顿步</strong>：每次迭代求解一个线性方程组（KKT 系统），本质上是在障碍目标函数上做牛顿法",
        "<strong>历史意义</strong>：1984 年 Karmarkar 在 AT&amp;T Bell Labs 提出，是继 Khachiyan 椭球法（1979）后第二个多项式时间 LP 算法，但首个在实践中能与单纯形法竞争的多项式算法"
      ],
      "detail": "<p><img alt=\"单纯形法与内点法搜索路径对比及中心路径示意\" src=\"./interior_point_illustration.png\" />\n<em>图 1：左图展示单纯形法（沿多面体顶点跳转，红色）与内点法（穿越可行域内部，绿色）的搜索路径对比；右图展示中心路径随障碍参数 μ→0 逐步收敛到最优解 x</em> 的过程。*</p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># === 原始-对偶内点法 (Primal-Dual Interior Point Method) ===\n# 求解标准形式线性规划: min c^T x, s.t. Ax = b, x &gt;= 0\n\nimport numpy as np\n\ndef interior_point_lp(A, b, c, tol=1e-8, max_iter=100):\n    &quot;&quot;&quot;\n    原始-对偶内点法求解线性规划\n    min c^T x  s.t. Ax = b, x &gt;= 0\n    &quot;&quot;&quot;\n    m, n = A.shape\n    # 初始化：严格可行内点\n    x = np.ones(n)          # 原始变量 x &gt; 0\n    lam = np.zeros(m)       # 对偶变量 (等式约束乘子)\n    s = np.ones(n)          # 松弛变量 s &gt; 0 (对偶松弛)\n\n    for k in range(max_iter):\n        # 计算互补间隙 (duality gap)\n        mu = np.dot(x, s) / n\n        if mu &lt; tol:\n            break\n\n        # 中心化参数 (centering parameter)\n        sigma = 0.3  # 典型取值 0.1 ~ 0.5\n\n        # 构造 KKT 系统的右端项 (残差)\n        r_b = A @ x - b                    # 原始可行性残差\n        r_c = A.T @ lam + s - c            # 对偶可行性残差\n        r_xs = x * s - sigma * mu          # 互补松弛残差\n\n        # 求解牛顿方程组 (正规方程形式)\n        # [0   A^T  I ] [dx  ]   [-r_c ]\n        # [A   0    0 ] [dlam] = [-r_b ]\n        # [S   0    X ] [ds  ]   [-r_xs]\n        X_inv_S = s / x  # 对角矩阵 X^{-1}S 的对角元素\n\n        # 消元得到正规方程: (A * diag(x/s) * A^T) dlam = rhs\n        D = x / s\n        M = A @ np.diag(D) @ A.T\n        rhs = -r_b - A @ np.diag(D) @ (r_c - r_xs / x)\n        dlam = np.linalg.solve(M, rhs)\n\n        # 回代求 ds, dx\n        ds = -r_c - A.T @ dlam\n        dx = -(r_xs + x * ds) / s\n\n        # 步长选择 (保证 x + alpha*dx &gt; 0, s + alpha*ds &gt; 0)\n        alpha_p = min(1.0, 0.99 * min(-x[dx &lt; 0] / dx[dx &lt; 0], default=1.0))\n        alpha_d = min(1.0, 0.99 * min(-s[ds &lt; 0] / ds[ds &lt; 0], default=1.0))\n\n        # 更新\n        x += alpha_p * dx\n        lam += alpha_d * dlam\n        s += alpha_d * ds\n\n    return x, lam, s\n</code></pre>\n<h5>动机与背景</h5>\n<p><strong>线性规划的求解历史</strong></p>\n<p>线性规划（Linear Programming, LP）是运筹学与优化理论的核心问题：</p>\n<div class=\"kb-math kb-math-display\">\\min_{x} c^T x \\quad \\text{s.t.} \\quad Ax = b, \\; x \\geq 0</div>\n<p>1947 年 Dantzig 提出的<strong>单纯形法</strong>（Simplex Method）在实践中表现优异，但其最坏情况复杂度为指数级——Klee-Minty 构造的反例表明，单纯形法可能需要遍历指数多个顶点。这引发了一个基本理论问题：<strong>线性规划是否属于 P 类问题？</strong></p>\n<p>1979 年，Khachiyan 提出<strong>椭球法</strong>（Ellipsoid Method），首次证明 LP 可在多项式时间内求解，复杂度为 <span class=\"kb-math kb-math-inline\">O(n^4 L)</span>。然而椭球法实际运行极慢，无法与单纯形法竞争。</p>\n<p><strong>Karmarkar 的突破（1984）</strong></p>\n<p>1984 年，AT&amp;T Bell Labs 的 Narendra Karmarkar 发表了划时代论文 <em>\"A New Polynomial-Time Algorithm for Linear Programming\"</em>，提出了一种全新的多项式时间算法，其复杂度为 <span class=\"kb-math kb-math-inline\">O(n^{3.5} L)</span>，且在实践中能与单纯形法媲美甚至超越。这一成果引发了优化领域的革命。</p>\n<p>Karmarkar 算法的核心洞察是：<strong>不在可行多面体的顶点之间跳转，而是穿越可行域的内部</strong>。通过射影变换将当前点映射为可行域的\"中心\"，然后在变换空间中沿最速下降方向移动，再映射回原空间。</p>\n<h5>核心机制</h5>\n<p><strong>1. 对数障碍函数与障碍问题</strong></p>\n<p>内点法的现代形式基于<strong>障碍方法</strong>（Barrier Method）。对于带不等式约束的优化问题：</p>\n<div class=\"kb-math kb-math-display\">\\min_{x} f(x) \\quad \\text{s.t.} \\quad g_i(x) \\leq 0, \\; i = 1, \\ldots, m</div>\n<p>构造对数障碍函数：</p>\n<div class=\"kb-math kb-math-display\">B(x, \\mu) = f(x) - \\mu \\sum_{i=1}^{m} \\ln(-g_i(x))</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\mu &gt; 0</span> 是障碍参数。当 <span class=\"kb-math kb-math-inline\">x</span> 接近约束边界（<span class=\"kb-math kb-math-inline\">g_i(x) \\to 0</span>）时，<span class=\"kb-math kb-math-inline\">-\\ln(-g_i(x)) \\to +\\infty</span>，形成\"无穷势垒\"，阻止迭代点离开可行域内部。</p>\n<div class=\"key-point\">💡 <strong>关键</strong>：对数障碍函数是<strong>自协调函数</strong>（self-concordant function），这一性质保证了牛顿法在其上具有二次收敛速率，且步长选择不依赖于未知的 Lipschitz 常数。</div>\n<p><strong>2. 中心路径 (Central Path)</strong></p>\n<p>对于线性规划的标准形式，中心路径定义为一族参数化的最优解：</p>\n<div class=\"kb-math kb-math-display\">x(\\mu) = \\arg\\min_{Ax=b, x&gt;0} \\left\\{ c^T x - \\mu \\sum_{i=1}^{n} \\ln x_i \\right\\}</div>\n<p>中心路径上的点满足修正的 KKT 条件：</p>\n<div class=\"kb-math kb-math-display\">Ax = b, \\quad A^T \\lambda + s = c, \\quad x_i s_i = \\mu \\quad \\forall i</div>\n<p>当 <span class=\"kb-math kb-math-inline\">\\mu \\to 0</span> 时，<span class=\"kb-math kb-math-inline\">x(\\mu)</span> 收敛到原始 LP 的最优解。内点法的本质就是<strong>沿中心路径追踪</strong>：逐步减小 <span class=\"kb-math kb-math-inline\">\\mu</span>，用牛顿法求解每个 <span class=\"kb-math kb-math-inline\">\\mu</span> 对应的修正 KKT 系统。</p>\n<p><strong>3. 原始-对偶方法 (Primal-Dual Method)</strong></p>\n<p>现代内点法的主流形式是原始-对偶方法，同时更新原始变量 <span class=\"kb-math kb-math-inline\">x</span>、对偶变量 <span class=\"kb-math kb-math-inline\">\\lambda</span> 和松弛变量 <span class=\"kb-math kb-math-inline\">s</span>。每次迭代求解如下牛顿方程组：</p>\n<div class=\"kb-math kb-math-display\">\\begin{bmatrix} 0 &amp; A^T &amp; I \\\\ A &amp; 0 &amp; 0 \\\\ S &amp; 0 &amp; X \\end{bmatrix} \\begin{bmatrix} \\Delta x \\\\ \\Delta \\lambda \\\\ \\Delta s \\end{bmatrix} = \\begin{bmatrix} c - A^T\\lambda - s \\\\ b - Ax \\\\ \\sigma\\mu e - XSe \\end{bmatrix}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">X = \\text{diag}(x)</span>，<span class=\"kb-math kb-math-inline\">S = \\text{diag}(s)</span>，<span class=\"kb-math kb-math-inline\">\\sigma \\in (0,1)</span> 是中心化参数。</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：每次迭代的计算瓶颈是求解 <span class=\"kb-math kb-math-inline\">m \\times m</span> 的正规方程组 <span class=\"kb-math kb-math-inline\">(ADA^T)\\Delta\\lambda = \\text{rhs}</span>，其中 <span class=\"kb-math kb-math-inline\">D = XS^{-1}</span>。对于稀疏问题，可利用 Cholesky 分解高效求解。</div>\n<p><strong>4. 收敛性分析</strong></p>\n<p>内点法的迭代次数与问题规模的关系：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>迭代次数</th>\n<th>每次迭代代价</th>\n<th>总复杂度</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Karmarkar 原始 (1984)</td>\n<td><span class=\"kb-math kb-math-inline\">O(n \\log(1/\\epsilon))</span></td>\n<td><span class=\"kb-math kb-math-inline\">O(n^{2.5})</span></td>\n<td><span class=\"kb-math kb-math-inline\">O(n^{3.5} L)</span></td>\n</tr>\n<tr>\n<td>路径跟踪法</td>\n<td><span class=\"kb-math kb-math-inline\">O(\\sqrt{n} \\log(1/\\epsilon))</span></td>\n<td><span class=\"kb-math kb-math-inline\">O(n^3)</span></td>\n<td><span class=\"kb-math kb-math-inline\">O(n^{3.5} L)</span></td>\n</tr>\n<tr>\n<td>原始-对偶法</td>\n<td><span class=\"kb-math kb-math-inline\">O(\\sqrt{n} \\log(1/\\epsilon))</span></td>\n<td><span class=\"kb-math kb-math-inline\">O(n^3)</span></td>\n<td><span class=\"kb-math kb-math-inline\">O(n^{3.5} L)</span></td>\n</tr>\n<tr>\n<td>预测-校正法 (Mehrotra)</td>\n<td>实践中 20-80 次</td>\n<td><span class=\"kb-math kb-math-inline\">O(n^3)</span></td>\n<td>实践最优</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 <strong>关键</strong>：内点法的迭代次数几乎与问题规模无关（通常 20-80 次），这与单纯形法形成鲜明对比——单纯形法的迭代次数在最坏情况下可达指数级，但平均情况下约为 <span class=\"kb-math kb-math-inline\">O(m)</span> 到 <span class=\"kb-math kb-math-inline\">O(3m)</span>。</div>\n<p><strong>5. Karmarkar 原始算法的几何直觉</strong></p>\n<p>Karmarkar 算法的核心步骤：</p>\n<ol>\n<li><strong>射影变换</strong>：将当前内点 <span class=\"kb-math kb-math-inline\">x_k</span> 映射为标准单纯形的中心（重心），使得在变换空间中各方向\"等距\"于约束边界</li>\n<li><strong>最速下降</strong>：在变换空间中，沿目标函数的投影梯度方向移动一步（投影到等式约束的零空间上）</li>\n<li><strong>逆变换</strong>：将新点映射回原空间，得到 <span class=\"kb-math kb-math-inline\">x_{k+1}</span></li>\n<li><strong>势函数递减</strong>：证明每步使势函数 <span class=\"kb-math kb-math-inline\">\\Phi(x) = n \\ln(c^T x - c^T x^*) - \\sum \\ln x_i</span> 至少减少一个常数</li>\n</ol>\n<p>这一过程保证了 <span class=\"kb-math kb-math-inline\">O(n \\log n)</span> 次迭代后达到 <span class=\"kb-math kb-math-inline\">\\epsilon</span>-最优。</p>\n<h5>与其他方法的关系</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>搜索区域</th>\n<th>复杂度类</th>\n<th>实践性能</th>\n<th>适用范围</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>单纯形法 (1947)</td>\n<td>多面体顶点</td>\n<td>指数（最坏）</td>\n<td>极快（平均）</td>\n<td>LP</td>\n</tr>\n<tr>\n<td>椭球法 (1979)</td>\n<td>椭球体积缩减</td>\n<td>多项式</td>\n<td>极慢</td>\n<td>凸优化（理论）</td>\n</tr>\n<tr>\n<td><strong>内点法 (1984)</strong></td>\n<td><strong>可行域内部</strong></td>\n<td><strong>多项式</strong></td>\n<td><strong>快</strong></td>\n<td><strong>LP/QP/SDP/凸优化</strong></td>\n</tr>\n<tr>\n<td>ADMM</td>\n<td>分裂-对偶</td>\n<td>—</td>\n<td>中等精度快</td>\n<td>大规模分布式</td>\n</tr>\n</tbody>\n</table></div>\n<p>内点法的影响远超线性规划：</p>\n<ul>\n<li><strong>二次规划 (QP)</strong>：直接推广，求解 SVM 等问题</li>\n<li><strong>半定规划 (SDP)</strong>：内点法是求解 SDP 的主流方法</li>\n<li><strong>二阶锥规划 (SOCP)</strong>：广泛应用于信号处理、金融优化</li>\n<li><strong>一般凸优化</strong>：Boyd &amp; Vandenberghe 的经典教材将内点法作为凸优化的通用求解框架</li>\n</ul>\n<h5>实践中的关键技术</h5>\n<p><strong>Mehrotra 预测-校正法</strong>：实际求解器（如 CPLEX、Gurobi、MOSEK）中最常用的内点法变体。每次迭代分两步：\n1. <strong>预测步</strong>（仿射缩放）：设 <span class=\"kb-math kb-math-inline\">\\sigma = 0</span>，求解纯牛顿方向\n2. <strong>校正步</strong>（中心化）：根据预测步的结果自适应选择 <span class=\"kb-math kb-math-inline\">\\sigma</span>，修正搜索方向</p>\n<p>这一技巧使得实际迭代次数通常仅需 20-50 次，与问题规模几乎无关。</p>",
      "quiz": {
        "q": "以下关于内点法的描述，哪一项是正确的？",
        "options": [
          "内点法沿可行多面体的顶点搜索最优解，与单纯形法的搜索策略相同",
          "内点法的迭代次数通常随问题规模线性增长，大规模问题需要数千次迭代",
          "内点法通过对数障碍函数将约束隐式编码进目标函数，沿中心路径从可行域内部逼近最优解",
          "Karmarkar 算法是第一个证明线性规划属于 P 类问题的算法"
        ],
        "answer": 2,
        "explain": "内点法的核心特征是利用对数障碍函数在可行域内部构造中心路径，通过逐步减小障碍参数使迭代点沿中心路径收敛到最优解。选项A错误（内点法在内部搜索，不走顶点）；选项B错误（迭代次数通常仅20-80次，几乎与规模无关）；选项D错误（第一个证明LP∈P的是Khachiyan的椭球法，1979年）。"
      }
    },
    {
      "id": "fista",
      "num": 4,
      "name": "FISTA",
      "fullName": "快速迭代收缩阈值算法 (FISTA)",
      "year": "2009",
      "org": "Technion",
      "parent": "nag",
      "paperUrl": "https://epubs.siam.org/doi/10.1137/080716542",
      "projectUrl": "",
      "category": "convex",
      "motivation": "Nesterov动量加速近端梯度至O(1/k²)",
      "summary": "FISTA 将 Nesterov 加速梯度技术引入近端梯度框架（ISTA），在不增加每步计算代价的前提下，将复合凸优化问题的收敛速率从 \\(O(1/k)\\) 提升至 \\(O(1/k^2)\\)，达到一阶方法的最优理论复杂度。",
      "keyPoints": [
        "<strong>问题框架</strong>：求解复合凸优化 <span class=\"kb-math kb-math-inline\">\\min_x F(x) = f(x) + g(x)</span>，其中 <span class=\"kb-math kb-math-inline\">f</span> 光滑凸、<span class=\"kb-math kb-math-inline\">g</span> 凸但可能不光滑（如 <span class=\"kb-math kb-math-inline\">\\ell_1</span> 范数）",
        "<strong>基础算法 ISTA</strong>：迭代收缩阈值算法，即近端梯度法，收敛速率为 <span class=\"kb-math kb-math-inline\">O(1/k)</span>",
        "<strong>Nesterov 动量加速</strong>：通过特定的外推步（momentum step）构造辅助序列，将收敛速率加速至 <span class=\"kb-math kb-math-inline\">O(1/k^2)</span>",
        "<strong>步长序列</strong>：引入序列 <span class=\"kb-math kb-math-inline\">t_k = \\frac{1 + \\sqrt{1 + 4t_{k-1}^2}}{2}</span>，控制外推步长",
        "<strong>最优复杂度</strong>：<span class=\"kb-math kb-math-inline\">O(1/k^2)</span> 是一阶方法在光滑凸优化中的理论下界（Nesterov 1983），FISTA 达到此最优",
        "<strong>广泛适用</strong>：适用于 LASSO、压缩感知、图像去模糊、矩阵补全等大量线性逆问题",
        "<strong>计算开销不变</strong>：相比 ISTA，每步仅多一次向量加减运算，几乎无额外代价"
      ],
      "detail": "<p><img alt=\"ISTA 与 FISTA 收敛速率对比\" src=\"fista_convergence.png\" />\n<em>图：ISTA（蓝色，<span class=\"kb-math kb-math-inline\">O(1/k)</span>）与 FISTA（红色，<span class=\"kb-math kb-math-inline\">O(1/k^2)</span>）的目标函数值上界随迭代次数的衰减对比。FISTA 在相同迭代次数下能获得显著更高的精度。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># FISTA - Fast Iterative Shrinkage-Thresholding Algorithm\n# 输入: f(x) 光滑凸函数, g(x) 非光滑凸函数, L = Lipschitz常数\n# 目标: min F(x) = f(x) + g(x)\n\ndef FISTA(grad_f, prox_g, x0, L, max_iter):\n    x = x0\n    y = x0\n    t = 1.0\n\n    for k in range(1, max_iter + 1):\n        x_new = prox_g(y - (1/L) * grad_f(y), 1/L)  # 近端梯度步\n        t_new = (1 + sqrt(1 + 4 * t**2)) / 2         # 更新步长参数\n        y = x_new + ((t - 1) / t_new) * (x_new - x)  # 外推步（动量）\n        x = x_new\n        t = t_new\n\n    return x\n</code></pre>\n<h5>动机与背景</h5>\n<p>许多信号处理和机器学习问题可以建模为复合凸优化问题：</p>\n<div class=\"kb-math kb-math-display\">\\min_{x \\in \\mathbb{R}^n} F(x) = f(x) + g(x)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">f(x)</span> 是具有 Lipschitz 连续梯度的光滑凸函数（如最小二乘项 <span class=\"kb-math kb-math-inline\">\\frac{1}{2}\\|Ax - b\\|^2</span>），<span class=\"kb-math kb-math-inline\">g(x)</span> 是凸但可能不可微的正则项（如 <span class=\"kb-math kb-math-inline\">\\ell_1</span> 范数 <span class=\"kb-math kb-math-inline\">\\lambda\\|x\\|_1</span> 促进稀疏性）。</p>\n<p>传统的近端梯度法（ISTA）通过交替执行梯度下降步和近端算子来求解此问题，但其收敛速率仅为 <span class=\"kb-math kb-math-inline\">O(1/k)</span>——即经过 <span class=\"kb-math kb-math-inline\">k</span> 次迭代后，<span class=\"kb-math kb-math-inline\">F(x_k) - F(x^*) \\leq O(L\\|x_0 - x^*\\|^2 / k)</span>。对于高精度需求的应用场景，这一速率往往不够快。</p>\n<div class=\"key-point\">💡 <strong>关键</strong>：Nesterov 在 1983 年证明了一阶方法在光滑凸优化中的最优复杂度下界为 <span class=\"kb-math kb-math-inline\">O(1/k^2)</span>，并给出了达到此下界的加速梯度法。Beck 和 Teboulle 的贡献在于将这一加速思想优雅地推广到<strong>非光滑复合优化</strong>框架中。</div>\n<h5>核心机制：从 ISTA 到 FISTA</h5>\n<p><strong>1. ISTA（近端梯度法）</strong></p>\n<p>ISTA 的每步迭代为：</p>\n<div class=\"kb-math kb-math-display\">x_{k} = \\text{prox}_{t_k g}\\left(x_{k-1} - t_k \\nabla f(x_{k-1})\\right)</div>\n<p>其中近端算子定义为：</p>\n<div class=\"kb-math kb-math-display\">\\text{prox}_{\\lambda g}(v) = \\arg\\min_x \\left\\{ g(x) + \\frac{1}{2\\lambda}\\|x - v\\|^2 \\right\\}</div>\n<p>对于 <span class=\"kb-math kb-math-inline\">g(x) = \\lambda\\|x\\|_1</span>（LASSO 问题），近端算子即为软阈值算子：</p>\n<div class=\"kb-math kb-math-display\">\\text{prox}_{\\lambda\\|\\cdot\\|_1}(v)_i = \\text{sign}(v_i) \\cdot \\max(|v_i| - \\lambda, 0)</div>\n<p>ISTA 的收敛速率为：</p>\n<div class=\"kb-math kb-math-display\">F(x_k) - F(x^*) \\leq \\frac{L\\|x_0 - x^*\\|^2}{2k}</div>\n<p><strong>2. FISTA 的加速机制</strong></p>\n<p>FISTA 的核心创新在于引入一个<strong>辅助点序列</strong> <span class=\"kb-math kb-math-inline\">\\{y_k\\}</span>，在执行近端梯度步之前先进行外推：</p>\n<div class=\"kb-math kb-math-display\">y_k = x_{k-1} + \\frac{t_{k-1} - 1}{t_k}(x_{k-1} - x_{k-2})</div>\n<div class=\"kb-math kb-math-display\">x_k = \\text{prox}_{(1/L) g}\\left(y_k - \\frac{1}{L}\\nabla f(y_k)\\right)</div>\n<p>其中步长参数 <span class=\"kb-math kb-math-inline\">t_k</span> 满足递推关系：</p>\n<div class=\"kb-math kb-math-display\">t_k = \\frac{1 + \\sqrt{1 + 4t_{k-1}^2}}{2}, \\quad t_1 = 1</div>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：外推系数 <span class=\"kb-math kb-math-inline\">\\frac{t_{k-1} - 1}{t_k}</span> 随迭代逐渐趋近于 1（但始终小于 1），这意味着动量效应逐步增强。当 <span class=\"kb-math kb-math-inline\">k</span> 较大时，<span class=\"kb-math kb-math-inline\">t_k \\approx k/2</span>，外推系数约为 <span class=\"kb-math kb-math-inline\">\\frac{k-2}{k+1}</span>，与 Nesterov 原始加速梯度法的系数一致。</div>\n<p><strong>3. 收敛速率证明的核心思想</strong></p>\n<p>FISTA 的收敛保证为：</p>\n<div class=\"kb-math kb-math-display\">F(x_k) - F(x^*) \\leq \\frac{2L\\|x_0 - x^*\\|^2}{(k+1)^2}</div>\n<p>证明的关键在于构造一个 Lyapunov 函数（能量函数）：</p>\n<div class=\"kb-math kb-math-display\">E_k = t_k^2 \\left(F(x_k) - F(x^*)\\right) + \\frac{L}{2}\\|v_k - x^*\\|^2</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">v_k</span> 是一个辅助变量。通过证明 <span class=\"kb-math kb-math-inline\">E_k</span> 单调不增（<span class=\"kb-math kb-math-inline\">E_k \\leq E_{k-1}</span>），结合 <span class=\"kb-math kb-math-inline\">t_k \\geq (k+1)/2</span> 的增长速率，即可得到 <span class=\"kb-math kb-math-inline\">O(1/k^2)</span> 的收敛界。</p>\n<h5>步长参数 <span class=\"kb-math kb-math-inline\">t_k</span> 的直觉理解</h5>\n<p>步长序列 <span class=\"kb-math kb-math-inline\">t_k</span> 的设计是 FISTA 的精髓所在。其递推关系 <span class=\"kb-math kb-math-inline\">t_k^2 - t_k \\leq t_{k-1}^2</span> 保证了：</p>\n<ol>\n<li><strong>能量守恒</strong>：每步迭代中，\"动能\"（外推带来的惯性）和\"势能\"（目标函数值）之间的转换是受控的</li>\n<li><strong>渐进加速</strong>：<span class=\"kb-math kb-math-inline\">t_k</span> 以 <span class=\"kb-math kb-math-inline\">O(k)</span> 速率增长，使得外推步长逐渐增大，算法越来越\"大胆\"</li>\n<li><strong>稳定性</strong>：外推系数始终小于 1，避免过度外推导致发散</li>\n</ol>\n<div class=\"key-point\">💡 <strong>关键</strong>：FISTA 的加速本质上是一种\"惯性效应\"——利用前两步的位移信息预测下一步的方向，类似于物理中的动量。这与 Nesterov 加速梯度法（NAG）的思想一脉相承，但 FISTA 将其推广到了近端算子框架。</div>\n<h5>与 ISTA 及其他方法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>ISTA（近端梯度）</th>\n<th>FISTA（加速近端梯度）</th>\n<th>Nesterov AG</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>适用问题</td>\n<td><span class=\"kb-math kb-math-inline\">f + g</span>，<span class=\"kb-math kb-math-inline\">g</span> 非光滑</td>\n<td><span class=\"kb-math kb-math-inline\">f + g</span>，<span class=\"kb-math kb-math-inline\">g</span> 非光滑</td>\n<td>仅光滑 <span class=\"kb-math kb-math-inline\">f</span></td>\n</tr>\n<tr>\n<td>收敛速率</td>\n<td><span class=\"kb-math kb-math-inline\">O(1/k)</span></td>\n<td><span class=\"kb-math kb-math-inline\">O(1/k^2)</span></td>\n<td><span class=\"kb-math kb-math-inline\">O(1/k^2)</span></td>\n</tr>\n<tr>\n<td>每步计算</td>\n<td>1次梯度 + 1次prox</td>\n<td>1次梯度 + 1次prox + 向量运算</td>\n<td>1次梯度 + 向量运算</td>\n</tr>\n<tr>\n<td>是否最优</td>\n<td>否</td>\n<td>是（一阶最优）</td>\n<td>是（一阶最优）</td>\n</tr>\n<tr>\n<td>单调性</td>\n<td>目标值单调下降</td>\n<td>目标值<strong>非单调</strong></td>\n<td>目标值非单调</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：FISTA 的目标函数值序列 <span class=\"kb-math kb-math-inline\">\\{F(x_k)\\}</span> 不一定单调递减，这是加速方法的固有特征。后续工作（如 MFISTA，Beck &amp; Teboulle 2009b）通过额外的投影步恢复了单调性，但代价是每步多一次近端算子计算。</div>\n<h5>实际应用：LASSO 与压缩感知</h5>\n<p>FISTA 最经典的应用场景是 LASSO 问题：</p>\n<div class=\"kb-math kb-math-display\">\\min_x \\frac{1}{2}\\|Ax - b\\|_2^2 + \\lambda\\|x\\|_1</div>\n<p>此时 <span class=\"kb-math kb-math-inline\">f(x) = \\frac{1}{2}\\|Ax - b\\|_2^2</span>，<span class=\"kb-math kb-math-inline\">\\nabla f(x) = A^T(Ax - b)</span>，Lipschitz 常数 <span class=\"kb-math kb-math-inline\">L = \\|A^TA\\|</span>（最大特征值），近端算子为软阈值。FISTA 在压缩感知、图像去模糊、信号恢复等领域取得了广泛应用，成为稀疏优化的标准求解器之一。</p>",
      "quiz": {
        "q": "FISTA 相比 ISTA 的核心改进是什么？",
        "options": [
          "使用更精确的线搜索确定步长",
          "引入外推步（动量），在近端梯度步之前对当前点进行外推",
          "使用二阶信息（Hessian）加速收敛",
          "通过自适应学习率为每个参数分配不同步长"
        ],
        "answer": 1,
        "explain": "FISTA 的核心创新是在每步近端梯度计算前，利用前两步迭代点的差值进行外推（动量步），从而将收敛速率从 O(1/k) 加速至 O(1/k²)，而无需任何二阶信息。"
      }
    },
    {
      "id": "admm",
      "num": 5,
      "name": "ADMM",
      "fullName": "交替方向乘子法 (ADMM)",
      "year": "1975",
      "org": "INRIA",
      "parent": "—",
      "paperUrl": "https://web.stanford.edu/~boyd/papers/pdf/admm_distr_stats.pdf",
      "projectUrl": "",
      "category": "convex",
      "motivation": "分裂大问题为子问题，天然支持分布式",
      "summary": "ADMM 将增广拉格朗日法与对偶分解相结合，通过交替优化分裂变量实现大规模凸优化问题的可分解求解，天然支持分布式/并行计算，是现代大规模机器学习与信号处理中的核心优化框架。",
      "keyPoints": [
        "标准问题形式：<span class=\"kb-math kb-math-inline\">\\min f(x) + g(z) \\;\\text{s.t.}\\; Ax + Bz = c</span>，将目标拆分为两个可独立处理的部分",
        "三步迭代：x-update → z-update → 对偶变量 y-update，每步仅需求解一个子问题",
        "Scaled Form 简化：引入缩放对偶变量 <span class=\"kb-math kb-math-inline\">u = (1/\\rho)y</span>，将线性项与二次项合并，简化实现",
        "收敛性保证：仅需 <span class=\"kb-math kb-math-inline\">f, g</span> 为闭凸 proper 函数、增广拉格朗日有鞍点即可保证收敛",
        "停止准则：基于原始残差 <span class=\"kb-math kb-math-inline\">r^k = Ax^{k} + Bz^{k} - c</span> 和对偶残差 <span class=\"kb-math kb-math-inline\">s^k = \\rho A^T B(z^k - z^{k-1})</span>",
        "Consensus ADMM：将全局变量共识问题分布到 N 个处理器，每个处理器仅处理局部目标函数",
        "支持正则化共识：中心节点可附加 <span class=\"kb-math kb-math-inline\">g(z)</span>（如 <span class=\"kb-math kb-math-inline\">\\ell_1</span> 正则），实现分布式稀疏优化",
        "罚参数 <span class=\"kb-math kb-math-inline\">\\rho</span> 选择与自适应调整策略影响收敛速度"
      ],
      "detail": "<h5>示意图</h5>\n<p><img alt=\"ADMM 迭代示意\" src=\"https://stanford.edu/~boyd/papers/admm/admm_iter.png\" />\n<em>图：ADMM 将原问题通过变量分裂转化为交替优化两个子问题，并通过对偶变量更新协调一致性。</em></p>\n<div class=\"key-point\">💡 注：由于原论文为纯数学推导型综述，无单一架构图。上述示意图为概念性描述，核心逻辑见下方算法伪代码。</div>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># ADMM 标准迭代 (Scaled Form)\n# 问题: min f(x) + g(z)  s.t. Ax + Bz = c\n# 参数: rho &gt; 0 (罚参数), eps_pri, eps_dual (停止阈值)\n\nu = zeros(m)  # 缩放对偶变量初始化\nx, z = initialize()\n\nfor k in range(max_iter):\n    # Step 1: x-update (最小化关于x的增广拉格朗日)\n    x = argmin_x { f(x) + (rho/2) * ||Ax + Bz - c + u||_2^2 }\n\n    # Step 2: z-update (最小化关于z的增广拉格朗日)\n    z = argmin_z { g(z) + (rho/2) * ||Ax + Bz - c + u||_2^2 }\n\n    # Step 3: 对偶变量更新\n    u = u + (Ax + Bz - c)\n\n    # 停止准则检查\n    r = Ax + Bz - c                    # 原始残差\n    s = rho * A.T @ B @ (z - z_prev)   # 对偶残差\n    if norm(r) &lt; eps_pri and norm(s) &lt; eps_dual:\n        break\n</code></pre>\n<pre><code class=\"language-python\"># Consensus ADMM (分布式版本)\n# 问题: min sum_{i=1}^N f_i(x)\n# 分布到 N 个处理器\n\nx_local = [zeros(n) for _ in range(N)]  # 局部变量\ny = [zeros(n) for _ in range(N)]         # 对偶变量\n\nfor k in range(max_iter):\n    # 并行: 各处理器独立求解局部子问题\n    for i in range(N):  # 可并行\n        x_local[i] = argmin_xi { f_i(xi) + y[i].T @ (xi - x_bar) \n                                  + (rho/2) * ||xi - x_bar||^2 }\n\n    # 中心节点: 计算全局平均\n    x_bar = mean(x_local)\n\n    # 并行: 更新对偶变量\n    for i in range(N):  # 可并行\n        y[i] = y[i] + rho * (x_local[i] - x_bar)\n</code></pre>\n<h5>动机与背景</h5>\n<p>大规模优化问题在机器学习、统计学习和信号处理中无处不在。传统方法面临两大困境：</p>\n<ol>\n<li><strong>对偶分解法</strong>（Dual Decomposition）虽然能将问题分解为独立子问题实现并行，但收敛条件严格（要求 <span class=\"kb-math kb-math-inline\">f</span> 严格凸），且收敛速度慢；</li>\n<li><strong>增广拉格朗日法</strong>（Method of Multipliers）通过添加二次罚项 <span class=\"kb-math kb-math-inline\">(\\rho/2)\\|Ax+Bz-c\\|^2</span> 改善收敛性，但破坏了问题的可分解结构。</li>\n</ol>\n<p>ADMM 巧妙地融合了两者优势：保留增广拉格朗日的二次罚项以获得良好收敛性，同时通过<strong>交替优化</strong>（而非联合优化）恢复可分解性。</p>\n<h5>核心机制详解</h5>\n<p><strong>标准形式与增广拉格朗日：</strong></p>\n<p>ADMM 处理的标准问题为：</p>\n<div class=\"kb-math kb-math-display\">\\min_{x,z} \\; f(x) + g(z) \\quad \\text{s.t.} \\quad Ax + Bz = c</div>\n<p>其增广拉格朗日函数为：</p>\n<div class=\"kb-math kb-math-display\">L_\\rho(x, z, y) = f(x) + g(z) + y^T(Ax + Bz - c) + \\frac{\\rho}{2}\\|Ax + Bz - c\\|_2^2</div>\n<p>与标准增广拉格朗日法对 <span class=\"kb-math kb-math-inline\">(x,z)</span> 联合最小化不同，ADMM <strong>交替</strong>对 <span class=\"kb-math kb-math-inline\">x</span> 和 <span class=\"kb-math kb-math-inline\">z</span> 分别最小化：</p>\n<div class=\"kb-math kb-math-display\">x^{k+1} := \\arg\\min_x \\left[ f(x) + \\frac{\\rho}{2}\\left\\|Ax + Bz^k - c + u^k\\right\\|_2^2 \\right]</div>\n<div class=\"kb-math kb-math-display\">z^{k+1} := \\arg\\min_z \\left[ g(z) + \\frac{\\rho}{2}\\left\\|Ax^{k+1} + Bz - c + u^k\\right\\|_2^2 \\right]</div>\n<div class=\"kb-math kb-math-display\">u^{k+1} := u^k + Ax^{k+1} + Bz^{k+1} - c</div>\n<div class=\"key-point\">💡 关键：Scaled Form 通过令 <span class=\"kb-math kb-math-inline\">u = (1/\\rho)y</span> 将线性项 <span class=\"kb-math kb-math-inline\">y^T(\\cdot)</span> 吸收进二次项，使得每步更新仅涉及一个二次正则化的近端算子（proximal operator）。</div>\n<p><strong>收敛性条件：</strong></p>\n<p>ADMM 的收敛性在以下温和条件下成立：\n- <span class=\"kb-math kb-math-inline\">f</span> 和 <span class=\"kb-math kb-math-inline\">g</span> 为闭的、proper 的凸函数\n- 增广拉格朗日 <span class=\"kb-math kb-math-inline\">L_0</span> 存在鞍点</p>\n<p>在此条件下：\n1. 原始残差 <span class=\"kb-math kb-math-inline\">r^k \\to 0</span>（可行性）\n2. 对偶残差 <span class=\"kb-math kb-math-inline\">s^k \\to 0</span>（最优性）<br />\n3. 目标函数值 <span class=\"kb-math kb-math-inline\">f(x^k) + g(z^k) \\to p^*</span>（最优值）</p>\n<div class=\"warn-box\">⚠️ 注意：ADMM 不要求 <span class=\"kb-math kb-math-inline\">f</span> 或 <span class=\"kb-math kb-math-inline\">g</span> 可微，也不要求严格凸，这使其适用于含 <span class=\"kb-math kb-math-inline\">\\ell_1</span> 范数等非光滑正则项的问题。</div>\n<p><strong>停止准则设计：</strong></p>\n<p>实际使用中，通过原始残差和对偶残差的范数判断收敛：</p>\n<div class=\"kb-math kb-math-display\">\\|r^k\\|_2 \\leq \\epsilon^{\\text{pri}}, \\quad \\|s^k\\|_2 \\leq \\epsilon^{\\text{dual}}</div>\n<p>其中容差采用绝对+相对混合策略：</p>\n<div class=\"kb-math kb-math-display\">\\epsilon^{\\text{pri}} = \\sqrt{p}\\,\\epsilon^{\\text{abs}} + \\epsilon^{\\text{rel}} \\max\\{\\|Ax^k\\|, \\|Bz^k\\|, \\|c\\|\\}</div>\n<div class=\"kb-math kb-math-display\">\\epsilon^{\\text{dual}} = \\sqrt{n}\\,\\epsilon^{\\text{abs}} + \\epsilon^{\\text{rel}} \\|A^T y^k\\|</div>\n<h5>分布式共识优化</h5>\n<p>ADMM 最强大的应用之一是<strong>分布式共识优化</strong>。考虑目标函数可分解为 N 个局部项：</p>\n<div class=\"kb-math kb-math-display\">\\min_x \\sum_{i=1}^N f_i(x)</div>\n<p>通过引入局部变量 <span class=\"kb-math kb-math-inline\">x_i</span> 和全局共识变量 <span class=\"kb-math kb-math-inline\">z</span>，重写为：</p>\n<div class=\"kb-math kb-math-display\">\\min \\sum_{i=1}^N f_i(x_i) \\quad \\text{s.t.} \\quad x_i = z, \\; i=1,\\ldots,N</div>\n<p>ADMM 迭代简化为：\n- <strong>各处理器并行</strong>：求解 <span class=\"kb-math kb-math-inline\">x_i^{k+1} = \\arg\\min_{x_i}\\{f_i(x_i) + (y_i^k)^T(x_i - \\bar{x}^k) + (\\rho/2)\\|x_i - \\bar{x}^k\\|^2\\}</span>\n- <strong>中心节点聚合</strong>：<span class=\"kb-math kb-math-inline\">z^{k+1} = \\bar{x}^{k+1}</span>（简单平均）\n- <strong>对偶更新</strong>：<span class=\"kb-math kb-math-inline\">y_i^{k+1} = y_i^k + \\rho(x_i^{k+1} - \\bar{x}^{k+1})</span></p>\n<div class=\"key-point\">💡 关键：对偶变量 <span class=\"kb-math kb-math-inline\">y_i</span> 的平均值在第一次迭代后恒为零，因此 <span class=\"kb-math kb-math-inline\">z^{k+1}</span> 就是局部变量的简单平均。通信开销仅为每轮广播一次全局平均值。</div>\n<p><strong>带正则化的共识：</strong> 当中心节点附加正则项 <span class=\"kb-math kb-math-inline\">g(z)</span>（如 <span class=\"kb-math kb-math-inline\">\\lambda\\|z\\|_1</span>）时，z-update 变为近端算子：</p>\n<div class=\"kb-math kb-math-display\">z^{k+1} = \\text{prox}_{g/N\\rho}\\left(\\bar{x}^{k+1} + (1/\\rho)\\bar{y}^k\\right)</div>\n<p>对于 <span class=\"kb-math kb-math-inline\">\\ell_1</span> 正则，这就是软阈值操作 <span class=\"kb-math kb-math-inline\">S_{\\lambda/N\\rho}(\\cdot)</span>。</p>\n<h5>与传统方法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>可分解性</th>\n<th>收敛性</th>\n<th>适用范围</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>梯度下降</td>\n<td>❌ 不可分解</td>\n<td>需光滑+凸</td>\n<td>光滑问题</td>\n</tr>\n<tr>\n<td>对偶分解</td>\n<td>✅ 完全并行</td>\n<td>需严格凸，慢</td>\n<td>严格凸问题</td>\n</tr>\n<tr>\n<td>增广拉格朗日</td>\n<td>❌ 联合优化</td>\n<td>快，条件温和</td>\n<td>一般凸问题</td>\n</tr>\n<tr>\n<td><strong>ADMM</strong></td>\n<td>✅ 交替分解</td>\n<td>快，条件温和</td>\n<td><strong>一般凸+非光滑</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p>ADMM 的独特优势在于：以极温和的条件（闭凸 proper）获得可靠收敛，同时保持完全的可分解/可并行结构。</p>\n<h5>罚参数选择</h5>\n<p>罚参数 <span class=\"kb-math kb-math-inline\">\\rho</span> 的选择对收敛速度有显著影响：\n- <span class=\"kb-math kb-math-inline\">\\rho</span> 过大：原始残差收敛快但对偶残差慢\n- <span class=\"kb-math kb-math-inline\">\\rho</span> 过小：对偶残差收敛快但原始残差慢</p>\n<p>自适应策略（Varying Penalty）：</p>\n<div class=\"kb-math kb-math-display\">\\rho^{k+1} = \\begin{cases} \\tau\\rho^k &amp; \\text{if } \\|r^k\\| &gt; \\mu\\|s^k\\| \\\\ \\rho^k/\\tau &amp; \\text{if } \\|s^k\\| &gt; \\mu\\|r^k\\| \\\\ \\rho^k &amp; \\text{otherwise} \\end{cases}</div>\n<p>典型参数：<span class=\"kb-math kb-math-inline\">\\mu = 10, \\tau = 2</span>。</p>",
      "quiz": {
        "q": "ADMM 相比标准增广拉格朗日法的核心改进是什么？",
        "options": [
          "使用更大的罚参数 ρ 加速收敛",
          "对 x 和 z 交替最小化而非联合最小化，恢复可分解性",
          "去掉了二次罚项以简化计算",
          "要求目标函数必须光滑可微"
        ],
        "answer": 1,
        "explain": "ADMM 保留增广拉格朗日的二次罚项保证收敛，但将联合最小化改为交替最小化，使得每步子问题可独立求解，从而恢复了对偶分解的可分解/可并行特性。"
      }
    },
    {
      "id": "sgd",
      "num": 6,
      "name": "SGD",
      "fullName": "随机梯度下降 (Stochastic Gradient Descent)",
      "year": "1951",
      "org": "Columbia Univ.",
      "parent": "gd",
      "paperUrl": "https://projecteuclid.org/journals/annals-of-mathematical-statistics/volume-22/issue-3/A-Stochastic-Approximation-Method/10.1214/aoms/1177729586.full",
      "projectUrl": "",
      "category": "stochastic",
      "motivation": "单样本梯度近似全梯度，大规模优化奠基",
      "summary": "Robbins 与 Monro 提出了随机近似方法（Stochastic Approximation），证明了在仅能获得含噪声观测的条件下，通过递减步长的迭代更新序列可以收敛到目标值，奠定了随机梯度下降（SGD）的理论基础，使得大规模数据上的在线优化成为可能。",
      "keyPoints": [
        "<strong>随机近似框架</strong>：提出求解 <span class=\"kb-math kb-math-inline\">M(\\theta) = \\alpha</span> 的迭代方法，其中 <span class=\"kb-math kb-math-inline\">M(x) = E[Y|x]</span> 为未知回归函数，仅可通过含噪声的观测 <span class=\"kb-math kb-math-inline\">Y_n</span> 获取信息",
        "<strong>核心更新规则</strong>：<span class=\"kb-math kb-math-inline\">x_{n+1} = x_n - a_n (Y_n - \\alpha)</span>，用单次含噪观测替代精确函数值进行迭代",
        "<strong>步长条件（Robbins-Monro 条件）</strong>：要求 <span class=\"kb-math kb-math-inline\">\\sum_{n=1}^{\\infty} a_n = \\infty</span> 且 <span class=\"kb-math kb-math-inline\">\\sum_{n=1}^{\\infty} a_n^2 &lt; \\infty</span>，保证既能到达任意远的目标又能抑制噪声累积",
        "<strong>收敛性证明</strong>：在单调性条件 <span class=\"kb-math kb-math-inline\">M(\\theta)</span> 严格递增（或递减）和有界性条件下，证明 <span class=\"kb-math kb-math-inline\">x_n \\to \\theta</span>（均方收敛）",
        "<strong>优化应用</strong>：令 <span class=\"kb-math kb-math-inline\">M(\\theta) = f&#x27;(\\theta)</span>、<span class=\"kb-math kb-math-inline\">\\alpha = 0</span>，即得到随机梯度下降——用单样本梯度替代全梯度来寻找极值点",
        "<strong>计算复杂度革命</strong>：将每步更新从 <span class=\"kb-math kb-math-inline\">O(N)</span>（遍历全部 <span class=\"kb-math kb-math-inline\">N</span> 个样本）降低到 <span class=\"kb-math kb-math-inline\">O(1)</span>（仅需一个样本），使在线学习和大规模优化成为可能"
      ],
      "detail": "<p><img alt=\"SGD 与 Batch GD 在损失曲面上的收敛轨迹对比\" src=\"https://ar5iv.labs.arxiv.org/html/1609.04747/assets/images/contours_evaluation_optimizers_final_frame.png\" />\n<em>图 1：SGD 的收敛轨迹（蓝色）相比 Batch GD 呈现明显的随机波动特性。噪声使其路径曲折，但也赋予了跳出局部最优的能力。（图源：Ruder, 2016 优化综述）</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># === Robbins-Monro 随机近似法 ===\n# 目标：求解 M(theta) = alpha，其中 M(x) = E[Y|x]\n# 仅能观测到含噪声的 Y_n（给定 x_n 时的随机响应）\n\ntheta = theta_0  # 初始估计\nfor n in range(1, max_iter + 1):\n    a_n = c / n  # 步长序列，满足 Σa_n=∞, Σa_n²&lt;∞\n    Y_n = observe(theta)  # 在 theta 处获得含噪观测，E[Y_n|theta] = M(theta)\n    theta = theta - a_n * (Y_n - alpha)  # 核心更新\n\n# === 应用于优化（SGD）===\n# 目标：min f(theta)，即求 f'(theta) = 0\n# 令 M(theta) = f'(theta), alpha = 0\n# Y_n = g(theta, xi_n) 为随机梯度，E[g] = f'(theta)\n\ntheta = theta_0\nfor n in range(1, max_iter + 1):\n    a_n = eta / n  # 学习率衰减\n    xi_n = sample_data()  # 随机抽取一个样本\n    g_n = compute_gradient(theta, xi_n)  # 单样本梯度（f'(theta) 的无偏估计）\n    theta = theta - a_n * g_n  # SGD 更新\n</code></pre>\n<h5>动机与背景</h5>\n<p>1951 年之前，求解方程 <span class=\"kb-math kb-math-inline\">M(\\theta) = \\alpha</span> 的标准方法要求精确知道函数 <span class=\"kb-math kb-math-inline\">M</span> 的解析形式，或能够在每个点 <span class=\"kb-math kb-math-inline\">x</span> 处进行大量重复实验以精确估计 <span class=\"kb-math kb-math-inline\">M(x)</span>。Robbins 和 Monro 提出了一个革命性的问题：</p>\n<div class=\"key-point\">💡 <strong>关键问题</strong>：如果我们在每个点只能获得一次含噪声的观测 <span class=\"kb-math kb-math-inline\">Y</span>（满足 <span class=\"kb-math kb-math-inline\">E[Y|x] = M(x)</span>），是否仍然能够找到方程的根？</div>\n<p>这一问题的肯定回答开创了<strong>随机近似</strong>（Stochastic Approximation）这一全新领域，并直接催生了随机梯度下降方法。</p>\n<p>在优化语境下，传统梯度下降要求计算精确梯度 <span class=\"kb-math kb-math-inline\">\\nabla f(\\theta) = \\frac{1}{N}\\sum_{i=1}^N \\nabla f_i(\\theta)</span>，当数据集规模 <span class=\"kb-math kb-math-inline\">N</span> 极大时计算代价不可接受。SGD 的核心洞察是：<strong>单个样本的梯度 <span class=\"kb-math kb-math-inline\">\\nabla f_i(\\theta)</span> 是全梯度的无偏估计</strong>，因此可以用它来替代全梯度进行参数更新。</p>\n<h5>核心机制：Robbins-Monro 定理</h5>\n<p><strong>问题设定</strong></p>\n<p>设 <span class=\"kb-math kb-math-inline\">M(x)</span> 为定义在实数上的回归函数，满足：\n- <span class=\"kb-math kb-math-inline\">M(\\theta) = \\alpha</span>（<span class=\"kb-math kb-math-inline\">\\theta</span> 是我们要找的根）\n- 在每个 <span class=\"kb-math kb-math-inline\">x</span> 处，我们只能观测到随机变量 <span class=\"kb-math kb-math-inline\">Y</span>，满足 <span class=\"kb-math kb-math-inline\">E[Y|x] = M(x)</span></p>\n<p><strong>更新规则</strong></p>\n<div class=\"kb-math kb-math-display\">x_{n+1} = x_n - a_n (Y_n - \\alpha)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">Y_n</span> 是在 <span class=\"kb-math kb-math-inline\">x = x_n</span> 处的一次观测。</p>\n<p><strong>收敛条件</strong></p>\n<p>Robbins-Monro 定理要求以下条件同时成立：</p>\n<ol>\n<li>\n<p><strong>单调性</strong>：<span class=\"kb-math kb-math-inline\">M(x)</span> 在 <span class=\"kb-math kb-math-inline\">\\theta</span> 附近严格单调递增（即 <span class=\"kb-math kb-math-inline\">x &lt; \\theta \\Rightarrow M(x) &lt; \\alpha</span>，<span class=\"kb-math kb-math-inline\">x &gt; \\theta \\Rightarrow M(x) &gt; \\alpha</span>）</p>\n</li>\n<li>\n<p><strong>步长条件</strong>：\n<div class=\"kb-math kb-math-display\">\\sum_{n=1}^{\\infty} a_n = \\infty, \\quad \\sum_{n=1}^{\\infty} a_n^2 &lt; \\infty</div></p>\n</li>\n<li>\n<p><strong>有界方差</strong>：存在常数 <span class=\"kb-math kb-math-inline\">C</span>，使得 <span class=\"kb-math kb-math-inline\">E[(Y_n - M(x_n))^2] \\leq C</span> 对所有 <span class=\"kb-math kb-math-inline\">n</span> 成立</p>\n</li>\n</ol>\n<div class=\"key-point\">💡 <strong>步长条件的直觉解释</strong>：\n- <span class=\"kb-math kb-math-inline\">\\sum a_n = \\infty</span> 保证步长总和足够大，使得迭代序列能够从任意初始点到达目标 <span class=\"kb-math kb-math-inline\">\\theta</span>（\"走得够远\"）\n- <span class=\"kb-math kb-math-inline\">\\sum a_n^2 &lt; \\infty</span> 保证步长衰减足够快，使得噪声的累积效应趋于零（\"噪声可控\"）\n- 典型选择：<span class=\"kb-math kb-math-inline\">a_n = c/n</span>，满足 <span class=\"kb-math kb-math-inline\">\\sum 1/n = \\infty</span> 且 <span class=\"kb-math kb-math-inline\">\\sum 1/n^2 = \\pi^2/6 &lt; \\infty</span></div>\n<p><strong>收敛结论</strong></p>\n<p>在上述条件下：\n<div class=\"kb-math kb-math-display\">x_n \\xrightarrow{L^2} \\theta, \\quad \\text{即} \\quad E[(x_n - \\theta)^2] \\to 0 \\text{ as } n \\to \\infty</div></p>\n<h5>从随机近似到 SGD</h5>\n<p>将 Robbins-Monro 框架应用于优化问题 <span class=\"kb-math kb-math-inline\">\\min_\\theta f(\\theta)</span>：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>Robbins-Monro 框架</th>\n<th>SGD 优化对应</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>回归函数 <span class=\"kb-math kb-math-inline\">M(x)</span></td>\n<td>梯度函数 <span class=\"kb-math kb-math-inline\">f&#x27;(\\theta)</span></td>\n</tr>\n<tr>\n<td>目标值 <span class=\"kb-math kb-math-inline\">\\alpha</span></td>\n<td>0（极值点梯度为零）</td>\n</tr>\n<tr>\n<td>含噪观测 <span class=\"kb-math kb-math-inline\">Y_n</span></td>\n<td>单样本梯度 <span class=\"kb-math kb-math-inline\">g(\\theta_n, \\xi_n)</span></td>\n</tr>\n<tr>\n<td>更新 <span class=\"kb-math kb-math-inline\">x_{n+1} = x_n - a_n(Y_n - \\alpha)</span></td>\n<td>更新 <span class=\"kb-math kb-math-inline\">\\theta_{n+1} = \\theta_n - a_n \\cdot g(\\theta_n, \\xi_n)</span></td>\n</tr>\n<tr>\n<td>单调性条件</td>\n<td>凸性条件（<span class=\"kb-math kb-math-inline\">f&#x27;&#x27;</span> &gt; 0）</td>\n</tr>\n</tbody>\n</table></div>\n<p>SGD 的更新公式为：</p>\n<div class=\"kb-math kb-math-display\">\\theta_{n+1} = \\theta_n - \\eta_n \\cdot \\nabla f(\\theta_n; \\xi_n)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\nabla f(\\theta_n; \\xi_n)</span> 是基于随机样本 <span class=\"kb-math kb-math-inline\">\\xi_n</span> 计算的梯度，满足：</p>\n<div class=\"kb-math kb-math-display\">E[\\nabla f(\\theta; \\xi)] = \\nabla f(\\theta) = \\frac{1}{N}\\sum_{i=1}^N \\nabla f_i(\\theta)</div>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：原始 Robbins-Monro 定理要求步长递减（<span class=\"kb-math kb-math-inline\">a_n \\to 0</span>），但现代深度学习实践中常使用固定学习率配合学习率调度器。固定学习率的 SGD 不保证收敛到精确最优解，而是收敛到最优解附近的一个邻域，邻域大小与学习率成正比。</div>\n<h5>与全梯度下降的核心区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>Batch GD</th>\n<th>SGD (Robbins-Monro)</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>每步计算量</td>\n<td><span class=\"kb-math kb-math-inline\">O(N)</span>，遍历全部数据</td>\n<td><span class=\"kb-math kb-math-inline\">O(1)</span>，仅需一个样本</td>\n</tr>\n<tr>\n<td>梯度估计</td>\n<td>精确梯度 <span class=\"kb-math kb-math-inline\">\\nabla f(\\theta)</span></td>\n<td>含噪估计 <span class=\"kb-math kb-math-inline\">g(\\theta, \\xi)</span></td>\n</tr>\n<tr>\n<td>更新方差</td>\n<td>0</td>\n<td><span class=\"kb-math kb-math-inline\">\\sigma^2 &gt; 0</span>（梯度噪声）</td>\n</tr>\n<tr>\n<td>收敛轨迹</td>\n<td>平滑单调下降</td>\n<td>随机波动，整体趋势下降</td>\n</tr>\n<tr>\n<td>收敛速率（凸）</td>\n<td><span class=\"kb-math kb-math-inline\">O(1/T)</span></td>\n<td><span class=\"kb-math kb-math-inline\">O(1/\\sqrt{T})</span></td>\n</tr>\n<tr>\n<td>逃逸局部最优</td>\n<td>困难（确定性轨迹）</td>\n<td>噪声提供隐式正则化</td>\n</tr>\n<tr>\n<td>适用规模</td>\n<td>小数据集</td>\n<td>任意规模，支持在线学习</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 <strong>关键洞察</strong>：SGD 的\"劣势\"（梯度噪声）在深度学习中反而成为优势——噪声提供了隐式正则化效果，帮助模型找到更平坦的极小值（flat minima），这些极小值通常具有更好的泛化性能。</div>\n<h5>历史影响与后续发展</h5>\n<p>Robbins-Monro 1951 年的工作是随机优化领域的开山之作：</p>\n<ul>\n<li><strong>1952 年</strong>：Kiefer-Wolfowitz 将随机近似扩展到梯度未知的情况（有限差分估计）</li>\n<li><strong>1958 年</strong>：Rosenblatt 的感知机学习算法本质上是 SGD 的特例</li>\n<li><strong>1960s-80s</strong>：SGD 成为自适应信号处理（LMS 算法）的核心</li>\n<li><strong>1986 年</strong>：Rumelhart 等人将 SGD 与反向传播结合，开启神经网络训练时代</li>\n<li><strong>2010s 至今</strong>：Mini-batch SGD 及其变体（Momentum、Adam 等）成为深度学习的标准优化器</li>\n</ul>",
      "quiz": {
        "q": "Robbins-Monro 随机近似法对步长序列 {a_n} 的要求是什么？",
        "options": [
          "a_n 必须为常数，即固定学习率",
          "Σa_n < ∞ 且 Σa_n² < ∞，保证总步长有限",
          "Σa_n = ∞ 且 Σa_n² < ∞，保证可达性与噪声抑制",
          "a_n 必须单调递增，以加速收敛"
        ],
        "answer": 2,
        "explain": "Σa_n = ∞ 确保迭代序列能从任意初始点到达目标（可达性），Σa_n² < ∞ 确保噪声累积效应趋于零（噪声抑制）。典型选择如 a_n = c/n 同时满足两个条件。"
      }
    },
    {
      "id": "svrg",
      "num": 7,
      "name": "SVRG",
      "fullName": "随机方差缩减梯度 (SVRG)",
      "year": "2013",
      "org": "Microsoft Research",
      "parent": "sgd",
      "paperUrl": "http://papers.nips.cc/paper/4937-accelerating-stochastic-gradient-descent-using-predictive-variance-reduction",
      "projectUrl": "",
      "category": "stochastic",
      "motivation": "周期性全梯度快照修正，消除方差",
      "summary": "SVRG 提出了一种利用控制变量（control variate）技术的随机梯度方法，通过周期性计算全梯度作为基准来修正每步随机梯度的方差，在强凸条件下实现线性收敛速率，且无需像 SAG/SDCA 那样存储所有样本梯度。",
      "keyPoints": [
        "核心思想：利用控制变量技术将随机梯度的方差从 <span class=\"kb-math kb-math-inline\">O(1)</span> 降低到随迭代逐步趋近于零",
        "双循环结构：外循环计算全梯度快照 <span class=\"kb-math kb-math-inline\">\\tilde{\\mu} = \\frac{1}{n}\\sum_{i=1}^n \\nabla f_i(\\tilde{x})</span>，内循环执行方差缩减的随机更新",
        "修正梯度公式：<span class=\"kb-math kb-math-inline\">v_t = \\nabla f_{i_t}(x_t) - \\nabla f_{i_t}(\\tilde{x}) + \\tilde{\\mu}</span>，保证无偏且方差随收敛自动缩小",
        "收敛性：对 <span class=\"kb-math kb-math-inline\">L</span>-光滑且 <span class=\"kb-math kb-math-inline\">\\mu</span>-强凸函数，以线性速率收敛，总梯度计算复杂度为 <span class=\"kb-math kb-math-inline\">O((n + \\kappa)\\log(1/\\epsilon))</span>，其中 <span class=\"kb-math kb-math-inline\">\\kappa = L/\\mu</span> 为条件数",
        "内存高效：仅需 <span class=\"kb-math kb-math-inline\">O(d)</span> 额外存储（存一份全梯度快照），不需要像 SAG 那样存储 <span class=\"kb-math kb-math-inline\">O(nd)</span> 的历史梯度",
        "支持非强凸情形：通过混合正则化技巧 <span class=\"kb-math kb-math-inline\">f(x) + \\frac{\\lambda}{2}\\|x\\|^2</span> 可扩展到一般凸问题"
      ],
      "detail": "<h5>核心算法示意</h5>\n<p>SVRG 的核心结构为\"快照 + 修正\"的双循环设计：</p>\n<pre><code>┌─────────────────────────────────────────────────────┐\n│  外循环 (epoch s = 1, 2, ...)                        │\n│  ┌─────────────────────────────────────────────────┐│\n│  │ 1. 计算全梯度快照: μ̃ = (1/n)Σ∇f_i(x̃)         ││\n│  │ 2. 设置快照点: x̃ = x_prev                      ││\n│  │                                                  ││\n│  │  内循环 (t = 1, ..., m)                          ││\n│  │  ┌───────────────────────────────────────────┐  ││\n│  │  │ • 随机采样 i_t ∈ {1,...,n}                │  ││\n│  │  │ • 计算修正梯度:                            │  ││\n│  │  │   v_t = ∇f_{i_t}(x_t) - ∇f_{i_t}(x̃) + μ̃│  ││\n│  │  │ • 更新: x_{t+1} = x_t - η·v_t            │  ││\n│  │  └───────────────────────────────────────────┘  ││\n│  │                                                  ││\n│  │ 3. 输出: x̃ = x_m (或随机选取)                  ││\n│  └─────────────────────────────────────────────────┘│\n└─────────────────────────────────────────────────────┘\n</code></pre>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># SVRG 算法 (Option I: 取最后一个迭代点)\ndef SVRG(f, data, x_init, learning_rate, m, S):\n    &quot;&quot;&quot;\n    f: 目标函数 f(x) = (1/n) Σ f_i(x)\n    data: n 个样本\n    x_init: 初始点\n    learning_rate: 步长 η\n    m: 内循环步数 (通常取 m = O(n))\n    S: 外循环轮数\n    &quot;&quot;&quot;\n    x_tilde = x_init\n\n    for s in range(S):  # 外循环\n        # Step 1: 计算全梯度快照\n        mu_tilde = (1/n) * sum(grad_f_i(x_tilde) for i in range(n))\n\n        x = x_tilde  # 内循环起点\n\n        for t in range(m):  # 内循环\n            # Step 2: 随机采样\n            i_t = random.randint(0, n-1)\n\n            # Step 3: 方差缩减梯度估计\n            v_t = grad_f_i_t(x) - grad_f_i_t(x_tilde) + mu_tilde\n\n            # Step 4: 参数更新\n            x = x - learning_rate * v_t\n\n        # Step 5: 更新快照点\n        x_tilde = x  # Option I\n        # x_tilde = random_choice(x_1, ..., x_m)  # Option II\n\n    return x_tilde\n</code></pre>\n<h5>动机与背景</h5>\n<p><strong>传统 SGD 的根本问题：方差不消失。</strong> 对于有限和优化问题：</p>\n<div class=\"kb-math kb-math-display\">f(x) = \\frac{1}{n}\\sum_{i=1}^n f_i(x)</div>\n<p>标准 SGD 每步使用单个样本梯度 <span class=\"kb-math kb-math-inline\">\\nabla f_i(x)</span> 作为全梯度 <span class=\"kb-math kb-math-inline\">\\nabla f(x)</span> 的无偏估计。虽然期望正确，但其方差：</p>\n<div class=\"kb-math kb-math-display\">\\text{Var}[\\nabla f_i(x)] = \\mathbb{E}\\|\\nabla f_i(x) - \\nabla f(x)\\|^2</div>\n<p>即使在最优解 <span class=\"kb-math kb-math-inline\">x^*</span> 处也不为零（因为各 <span class=\"kb-math kb-math-inline\">\\nabla f_i(x^*)</span> 通常不全为零）。这导致 SGD 必须使用递减步长才能收敛，最终收敛速率仅为次线性的 <span class=\"kb-math kb-math-inline\">O(1/T)</span>。</p>\n<p><strong>已有方法的局限：</strong>\n- <strong>SAG (Stochastic Average Gradient)</strong>：通过维护所有 <span class=\"kb-math kb-math-inline\">n</span> 个样本梯度的历史记录实现方差缩减，但需要 <span class=\"kb-math kb-math-inline\">O(nd)</span> 内存\n- <strong>SDCA (Stochastic Dual Coordinate Ascent)</strong>：利用对偶结构，但仅适用于特定问题形式\n- <strong>Full GD</strong>：每步计算 <span class=\"kb-math kb-math-inline\">O(n)</span> 个梯度，计算代价过高</p>\n<div class=\"key-point\">💡 关键洞察：SVRG 的核心思想来自蒙特卡洛方法中的<strong>控制变量</strong>（control variate）技术——如果我们有一个与目标量高度相关的已知量，就可以用它来减小估计方差。</div>\n<h5>核心机制：控制变量方差缩减</h5>\n<p>SVRG 的梯度估计器设计为：</p>\n<div class=\"kb-math kb-math-display\">v_t = \\nabla f_{i_t}(x_t) - \\nabla f_{i_t}(\\tilde{x}) + \\tilde{\\mu}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\tilde{x}</span> 是快照点，<span class=\"kb-math kb-math-inline\">\\tilde{\\mu} = \\nabla f(\\tilde{x}) = \\frac{1}{n}\\sum_{i=1}^n \\nabla f_i(\\tilde{x})</span> 是在快照点处的精确全梯度。</p>\n<p><strong>无偏性验证：</strong></p>\n<div class=\"kb-math kb-math-display\">\\mathbb{E}_{i_t}[v_t] = \\nabla f(x_t) - \\nabla f(\\tilde{x}) + \\tilde{\\mu} = \\nabla f(x_t)</div>\n<p><strong>方差分析：</strong> 关键在于 <span class=\"kb-math kb-math-inline\">v_t</span> 的方差会随着 <span class=\"kb-math kb-math-inline\">x_t</span> 接近 <span class=\"kb-math kb-math-inline\">\\tilde{x}</span> 而自动缩小：</p>\n<div class=\"kb-math kb-math-display\">\\mathbb{E}\\|v_t - \\nabla f(x_t)\\|^2 = \\mathbb{E}\\|\\nabla f_{i_t}(x_t) - \\nabla f_{i_t}(\\tilde{x}) - (\\nabla f(x_t) - \\nabla f(\\tilde{x}))\\|^2</div>\n<p>利用 Lipschitz 连续梯度条件 <span class=\"kb-math kb-math-inline\">\\|\\nabla f_i(x) - \\nabla f_i(y)\\| \\leq L\\|x-y\\|</span>，可以证明：</p>\n<div class=\"kb-math kb-math-display\">\\mathbb{E}\\|v_t - \\nabla f(x_t)\\|^2 \\leq 4L[f(x_t) - f(x^*) + f(\\tilde{x}) - f(x^*)]</div>\n<div class=\"warn-box\">⚠️ 注意：当 <span class=\"kb-math kb-math-inline\">x_t \\to x^*</span> 且 <span class=\"kb-math kb-math-inline\">\\tilde{x} \\to x^*</span> 时，方差趋近于零！这是 SVRG 能够使用固定步长并实现线性收敛的根本原因。</div>\n<h5>收敛性分析</h5>\n<p><strong>定理（强凸情形）：</strong> 假设每个 <span class=\"kb-math kb-math-inline\">f_i</span> 是 <span class=\"kb-math kb-math-inline\">L</span>-光滑的，<span class=\"kb-math kb-math-inline\">f</span> 是 <span class=\"kb-math kb-math-inline\">\\mu</span>-强凸的。取步长 <span class=\"kb-math kb-math-inline\">\\eta &lt; \\frac{1}{2L}</span>，内循环长度 <span class=\"kb-math kb-math-inline\">m</span> 足够大使得：</p>\n<div class=\"kb-math kb-math-display\">\\alpha = \\frac{1}{\\mu \\eta (1-2L\\eta)m} + \\frac{2L\\eta}{1-2L\\eta} &lt; 1</div>\n<p>则 SVRG 以几何速率收敛：</p>\n<div class=\"kb-math kb-math-display\">\\mathbb{E}[f(\\tilde{x}_s) - f(x^*)] \\leq \\alpha^s [f(\\tilde{x}_0) - f(x^*)]</div>\n<p><strong>最优参数选择：</strong> 取 <span class=\"kb-math kb-math-inline\">\\eta = O(1/L)</span>，<span class=\"kb-math kb-math-inline\">m = O(\\kappa)</span>（其中 <span class=\"kb-math kb-math-inline\">\\kappa = L/\\mu</span>），则每个外循环的计算量为 <span class=\"kb-math kb-math-inline\">O(n + \\kappa)</span> 次梯度计算，达到 <span class=\"kb-math kb-math-inline\">\\epsilon</span> 精度的总复杂度为：</p>\n<div class=\"kb-math kb-math-display\">O\\left((n + \\kappa)\\log\\frac{1}{\\epsilon}\\right)</div>\n<p><strong>与其他方法的复杂度对比：</strong></p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>梯度计算复杂度</th>\n<th>额外内存</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>GD</td>\n<td><span class=\"kb-math kb-math-inline\">O(n\\kappa\\log(1/\\epsilon))</span></td>\n<td><span class=\"kb-math kb-math-inline\">O(d)</span></td>\n</tr>\n<tr>\n<td>SGD</td>\n<td><span class=\"kb-math kb-math-inline\">O(1/(\\mu\\epsilon))</span></td>\n<td><span class=\"kb-math kb-math-inline\">O(d)</span></td>\n</tr>\n<tr>\n<td>SAG</td>\n<td><span class=\"kb-math kb-math-inline\">O((n+\\kappa)\\log(1/\\epsilon))</span></td>\n<td><span class=\"kb-math kb-math-inline\">O(nd)</span></td>\n</tr>\n<tr>\n<td><strong>SVRG</strong></td>\n<td><span class=\"kb-math kb-math-inline\">O((n+\\kappa)\\log(1/\\epsilon))</span></td>\n<td><span class=\"kb-math kb-math-inline\">O(d)</span></td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 关键优势：SVRG 达到了与 SAG 相同的最优梯度复杂度，但内存开销仅为 <span class=\"kb-math kb-math-inline\">O(d)</span> 而非 <span class=\"kb-math kb-math-inline\">O(nd)</span>，对大规模问题（<span class=\"kb-math kb-math-inline\">n</span> 很大）极为重要。</div>\n<h5>与传统方法的关键区别</h5>\n<ol>\n<li>\n<p><strong>vs. SGD</strong>：SGD 的方差恒定不变，必须用递减步长 <span class=\"kb-math kb-math-inline\">\\eta_t \\to 0</span> 才能收敛，导致次线性速率。SVRG 通过控制变量使方差自动缩减，可用固定步长实现线性收敛。</p>\n</li>\n<li>\n<p><strong>vs. SAG</strong>：SAG 维护一个 <span class=\"kb-math kb-math-inline\">n \\times d</span> 的梯度表来跟踪每个样本的历史梯度，内存需求 <span class=\"kb-math kb-math-inline\">O(nd)</span>。SVRG 仅需周期性计算一次全梯度（额外存储 <span class=\"kb-math kb-math-inline\">O(d)</span>），以少量额外计算换取巨大的内存节省。</p>\n</li>\n<li>\n<p><strong>vs. Full GD</strong>：全梯度下降每步需 <span class=\"kb-math kb-math-inline\">O(n)</span> 计算，总复杂度 <span class=\"kb-math kb-math-inline\">O(n\\kappa\\log(1/\\epsilon))</span>。当 <span class=\"kb-math kb-math-inline\">\\kappa \\ll n</span> 时，SVRG 显著更快。</p>\n</li>\n<li>\n<p><strong>Option I vs. Option II</strong>：</p>\n</li>\n<li>Option I（取最后一个迭代点）：实践中通常更好</li>\n<li>Option II（随机选取内循环中的一个点）：理论分析更简洁，可用于非强凸情形</li>\n</ol>\n<h5>实际考量</h5>\n<ul>\n<li><strong>内循环长度 <span class=\"kb-math kb-math-inline\">m</span> 的选择</strong>：论文建议 <span class=\"kb-math kb-math-inline\">m = 2n</span> 或 <span class=\"kb-math kb-math-inline\">m = 5n</span>，实验表明对具体选择不太敏感</li>\n<li><strong>步长选择</strong>：理论要求 <span class=\"kb-math kb-math-inline\">\\eta &lt; 1/(2L)</span>，实践中 <span class=\"kb-math kb-math-inline\">\\eta = 1/L</span> 通常可行</li>\n<li><strong>mini-batch 扩展</strong>：可以在内循环中使用 mini-batch 进一步降低方差，但单样本版本已经足够高效</li>\n<li><strong>非强凸扩展</strong>：对一般凸问题，可添加微小正则化 <span class=\"kb-math kb-math-inline\">\\frac{\\lambda}{2}\\|x\\|^2</span> 使其变为强凸，收敛速率为 <span class=\"kb-math kb-math-inline\">O(1/T)</span></li>\n</ul>",
      "quiz": {
        "q": "SVRG 相比 SAG 的主要优势是什么？",
        "options": [
          "收敛速率更快（指数级 vs 线性）",
          "不需要计算全梯度",
          "额外内存需求从 O(nd) 降低到 O(d)",
          "适用于非凸优化问题"
        ],
        "answer": 2,
        "explain": "SVRG 和 SAG 具有相同的 O((n+κ)log(1/ε)) 梯度复杂度，但 SAG 需要存储所有 n 个样本的历史梯度（O(nd) 内存），而 SVRG 仅需存储一份全梯度快照（O(d) 内存），这在大规模问题中是决定性优势。"
      }
    },
    {
      "id": "saga",
      "num": 8,
      "name": "SAGA",
      "fullName": "快速增量梯度法 (SAGA)",
      "year": "2014",
      "org": "INRIA",
      "parent": "svrg",
      "paperUrl": "https://arxiv.org/abs/1407.0202",
      "projectUrl": "",
      "category": "stochastic",
      "motivation": "无偏梯度估计，支持近端算子",
      "summary": "SAGA 的核心目标是：无偏梯度估计，支持近端算子。",
      "keyPoints": [
        "核心动机：无偏梯度估计，支持近端算子",
        "演化来源：继承或改进自 svrg",
        "代表机构：INRIA"
      ],
      "detail": "<p>无偏梯度估计，支持近端算子</p>"
    },
    {
      "id": "adagrad",
      "num": 9,
      "name": "AdaGrad",
      "fullName": "自适应梯度法 (Adaptive Gradient)",
      "year": "2011",
      "org": "UC Berkeley",
      "parent": "sgd",
      "paperUrl": "https://www.jmlr.org/papers/volume12/duchi11a/duchi11a.pdf",
      "projectUrl": "",
      "category": "adaptive",
      "motivation": "按参数累积梯度平方自适应调节学习率",
      "summary": "AdaGrad 提出了基于历史梯度二阶矩自适应调整每个参数学习率的在线优化方法，解决了标准梯度下降中所有参数共享同一学习率导致稀疏特征学习不充分的问题，为后续 RMSProp、Adam 等自适应优化器奠定了理论基础。",
      "keyPoints": [
        "提出对角自适应学习率：每个参数的学习率与其历史梯度的 ℓ₂ 范数成反比，即 <span class=\"kb-math kb-math-inline\">\\eta / \\sqrt{\\sum_{\\tau=1}^{t} g_{\\tau,i}^2}</span>",
        "提出全矩阵版本：利用完整的梯度外积矩阵 <span class=\"kb-math kb-math-inline\">G_t = \\sum_{\\tau=1}^t g_\\tau g_\\tau^\\top</span> 的平方根进行更新",
        "理论保证：Regret bound 为 <span class=\"kb-math kb-math-inline\">O\\left(\\max_i \\|x^*_i\\| \\cdot \\sum_{i=1}^d \\|g_{1:T,i}\\|_2\\right)</span>，在稀疏梯度场景下远优于 <span class=\"kb-math kb-math-inline\">O(\\sqrt{T})</span>",
        "支持复合正则化：统一框架处理 ℓ₁ 正则化（稀疏）、ℓ₁-ball 投影、ℓ₂ 正则化等约束",
        "无需手动调节学习率衰减策略：步长自动适应数据几何结构",
        "实验验证：在文本分类（RCV1）和大规模图像排序（ImageNet）任务上显著优于非自适应方法"
      ],
      "detail": "<p><img alt=\"AdaGrad 算法框架\" src=\"https://ar5iv.labs.arxiv.org/html/1101.3618v3/assets/figure1.png\" />\n<em>图：AdaGrad 自适应学习率更新框架（论文 Figure 1，对角版本伪代码）。核心思想：用累积梯度平方和的平方根归一化每个参数的步长。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># AdaGrad 对角版本 (Diagonal AdaGrad)\n# 输入: 学习率 η, 初始点 x_1, 小常数 δ\nimport numpy as np\n\ndef adagrad(gradients, eta=0.01, delta=1e-8):\n    &quot;&quot;&quot;\n    gradients: T x d 的梯度序列\n    &quot;&quot;&quot;\n    T, d = gradients.shape\n    x = np.zeros(d)\n    G_diag = np.zeros(d)  # 累积梯度平方和\n\n    for t in range(T):\n        g = gradients[t]  # 第 t 步的(子)梯度\n        G_diag += g ** 2   # 累积各维度梯度平方\n\n        # 自适应学习率更新\n        adjusted_lr = eta / (delta + np.sqrt(G_diag))\n        x = x - adjusted_lr * g\n\n        # 如有约束集 X，需投影: x = project(x, X)\n\n    return x\n</code></pre>\n<h5>动机与背景</h5>\n<p>在线凸优化和随机优化中，标准的（子）梯度下降方法对所有参数使用统一的学习率 <span class=\"kb-math kb-math-inline\">\\eta / \\sqrt{t}</span>。这在以下场景中存在严重缺陷：</p>\n<ol>\n<li><strong>稀疏特征问题</strong>：在自然语言处理等任务中，特征空间极高维（如百万级 bigram 特征），大部分特征极少出现。统一学习率导致稀有但有信息量的特征更新不充分。</li>\n<li><strong>几何结构忽略</strong>：标准方法使用欧氏距离度量，忽略了数据的内在几何结构。不同方向上的曲率差异巨大时，统一步长效率低下。</li>\n<li><strong>学习率调参困难</strong>：实践中需要精心选择学习率衰减策略，对不同问题需要反复调参。</li>\n</ol>\n<div class=\"key-point\">💡 关键直觉：如果某个参数的历史梯度一直很大（频繁更新），说明该方向信息充足，应减小步长精细调整；如果历史梯度很小（稀少更新），说明该方向信息稀缺，应保持较大步长快速学习。</div>\n<h5>核心机制</h5>\n<p><strong>1. 自适应矩阵的构造</strong></p>\n<p>AdaGrad 的核心思想是将 Bregman 散度（正则化项）中的距离度量从固定的欧氏距离替换为数据驱动的自适应度量。具体地，定义累积梯度外积矩阵：</p>\n<div class=\"kb-math kb-math-display\">G_t = \\sum_{\\tau=1}^{t} g_\\tau g_\\tau^\\top</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">g_\\tau \\in \\mathbb{R}^d</span> 是第 <span class=\"kb-math kb-math-inline\">\\tau</span> 步的梯度向量。</p>\n<p><strong>全矩阵版本</strong>的更新规则为：</p>\n<div class=\"kb-math kb-math-display\">x_{t+1} = \\Pi_X^{G_t^{1/2}} \\left( x_t - \\eta \\, G_t^{-1/2} g_t \\right)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\Pi_X^{A}(y) = \\arg\\min_{x \\in X} (x-y)^\\top A (x-y)</span> 是在矩阵 <span class=\"kb-math kb-math-inline\">A</span> 定义的 Mahalanobis 距离下的投影。</p>\n<p><strong>对角版本</strong>（实际使用最广泛）简化为逐坐标操作：</p>\n<div class=\"kb-math kb-math-display\">x_{t+1,i} = \\Pi_{X,i} \\left( x_{t,i} - \\frac{\\eta}{\\delta + \\sqrt{\\sum_{\\tau=1}^{t} g_{\\tau,i}^2}} \\cdot g_{t,i} \\right)</div>\n<p>定义 <span class=\"kb-math kb-math-inline\">s_{t,i} = \\|g_{1:t,i}\\|_2 = \\sqrt{\\sum_{\\tau=1}^t g_{\\tau,i}^2}</span>，则每个参数 <span class=\"kb-math kb-math-inline\">i</span> 的有效学习率为 <span class=\"kb-math kb-math-inline\">\\eta / (\\delta + s_{t,i})</span>。</p>\n<div class=\"warn-box\">⚠️ 注意：对角版本的计算复杂度为 <span class=\"kb-math kb-math-inline\">O(d)</span>，与标准 SGD 相同；全矩阵版本需要 <span class=\"kb-math kb-math-inline\">O(d^3)</span> 的矩阵平方根运算，仅适用于低维问题。</div>\n<p><strong>2. 理论保证（Regret Bound）</strong></p>\n<p>论文的核心理论结果（Theorem 5 &amp; Corollary 6）给出了对角版本的 regret 上界：</p>\n<div class=\"kb-math kb-math-display\">\\text{Regret}_T \\leq 2 \\sum_{i=1}^{d} \\|x_{1:T,i}^* - x_{1:T,i}\\|_\\infty \\cdot \\|g_{1:T,i}\\|_2</div>\n<p>在简化假设 <span class=\"kb-math kb-math-inline\">\\|x^*\\|_\\infty \\leq D_\\infty</span> 下：</p>\n<div class=\"kb-math kb-math-display\">\\text{Regret}_T \\leq 2 D_\\infty \\sum_{i=1}^{d} \\|g_{1:T,i}\\|_2</div>\n<p><strong>为什么这比标准 bound 好？</strong> 标准在线梯度下降的 regret 为 <span class=\"kb-math kb-math-inline\">O(D \\cdot G \\cdot \\sqrt{T})</span>，其中 <span class=\"kb-math kb-math-inline\">G = \\max_t \\|g_t\\|_2</span>。而 AdaGrad 的 bound 依赖于各坐标梯度的实际范数之和。当梯度稀疏时（大部分坐标的 <span class=\"kb-math kb-math-inline\">\\|g_{1:T,i}\\|_2</span> 很小），AdaGrad 的 bound 可以远小于 <span class=\"kb-math kb-math-inline\">O(\\sqrt{T})</span>。</p>\n<p>具体地，如果每步梯度最多有 <span class=\"kb-math kb-math-inline\">s</span> 个非零坐标（<span class=\"kb-math kb-math-inline\">s \\ll d</span>），则：</p>\n<div class=\"kb-math kb-math-display\">\\sum_{i=1}^d \\|g_{1:T,i}\\|_2 \\leq \\sqrt{s} \\cdot \\sqrt{T} \\cdot \\max_t \\|g_t\\|_\\infty</div>\n<p>相比标准 bound 的 <span class=\"kb-math kb-math-inline\">\\sqrt{d} \\cdot \\sqrt{T}</span> 因子，改进了 <span class=\"kb-math kb-math-inline\">\\sqrt{d/s}</span> 倍。</p>\n<p><strong>3. 全矩阵版本的 Regret Bound</strong></p>\n<p>对于全矩阵版本（Corollary 11）：</p>\n<div class=\"kb-math kb-math-display\">\\text{Regret}_T \\leq 2D_2 \\cdot \\text{tr}(G_T^{1/2})</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">D_2 = \\max_{x \\in X} \\|x\\|_2</span>。由于 <span class=\"kb-math kb-math-inline\">\\text{tr}(G_T^{1/2}) \\leq \\sqrt{d \\cdot \\text{tr}(G_T)}</span>，当梯度集中在少数方向时（低秩结构），全矩阵版本可以进一步利用这种结构。</p>\n<h5>与 ℓ₁ 正则化的结合</h5>\n<p>AdaGrad 自然支持复合目标函数 <span class=\"kb-math kb-math-inline\">\\min_x \\sum_t f_t(x) + \\phi(x)</span>，其中 <span class=\"kb-math kb-math-inline\">\\phi(x) = \\lambda \\|x\\|_1</span> 用于诱导稀疏性。</p>\n<p><strong>Primal-Dual 子梯度更新</strong>（结合 Regularized Dual Averaging）：</p>\n<div class=\"kb-math kb-math-display\">x_{t+1,i} = \\text{sign}(-\\bar{g}_{t,i}) \\cdot \\frac{\\eta t}{H_{t,ii}} \\left[ |\\bar{g}_{t,i}| - \\lambda \\right]_+</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\bar{g}_t = \\frac{1}{t}\\sum_{\\tau=1}^t g_\\tau</span> 是平均梯度，<span class=\"kb-math kb-math-inline\">H_{t,ii} = \\delta + \\|g_{1:t,i}\\|_2</span>。</p>\n<p><strong>Mirror-Descent 更新</strong>（结合 FOBOS 风格的近端步）：</p>\n<div class=\"kb-math kb-math-display\">x_{t+1,i} = \\text{sign}\\left(x_{t,i} - \\frac{\\eta}{H_{t,ii}} g_{t,i}\\right) \\left[ \\left|x_{t,i} - \\frac{\\eta}{H_{t,ii}} g_{t,i}\\right| - \\frac{\\lambda \\eta}{H_{t,ii}} \\right]_+</div>\n<div class=\"key-point\">💡 关键优势：当梯度稀疏时，可以进行\"惰性更新\"（lazy evaluation）。如果坐标 <span class=\"kb-math kb-math-inline\">i</span> 从时刻 <span class=\"kb-math kb-math-inline\">t_0</span> 到 <span class=\"kb-math kb-math-inline\">t</span> 的梯度都为零，可以在需要时一次性计算更新，大幅提升计算效率。</div>\n<h5>与传统方法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>学习率</th>\n<th>Regret Bound</th>\n<th>稀疏适应性</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>SGD</td>\n<td><span class=\"kb-math kb-math-inline\">\\eta/\\sqrt{t}</span> (全局)</td>\n<td><span class=\"kb-math kb-math-inline\">O(D \\cdot G \\cdot \\sqrt{T})</span></td>\n<td>无</td>\n</tr>\n<tr>\n<td>AdaGrad (对角)</td>\n<td><span class=\"kb-math kb-math-inline\">\\eta/\\sqrt{\\sum g_{\\tau,i}^2}</span> (逐参数)</td>\n<td><span class=\"kb-math kb-math-inline\">O(D_\\infty \\sum_i \\|g_{1:T,i}\\|_2)</span></td>\n<td>强</td>\n</tr>\n<tr>\n<td>AdaGrad (全矩阵)</td>\n<td><span class=\"kb-math kb-math-inline\">\\eta \\cdot G_t^{-1/2}</span> (全矩阵)</td>\n<td><span class=\"kb-math kb-math-inline\">O(D_2 \\cdot \\text{tr}(G_T^{1/2}))</span></td>\n<td>最强</td>\n</tr>\n</tbody>\n</table></div>\n<h5>实验验证</h5>\n<p>论文在两个大规模任务上验证了 AdaGrad 的有效性：</p>\n<ol>\n<li>\n<p><strong>Reuters RCV1 文本分类</strong>：200 万维稀疏 bigram 特征，4 个二分类任务。AdaGrad-RDA 和 AdaGrad-FOBOS 在所有任务上均优于标准 RDA、FOBOS、Passive-Aggressive 和 AROW，同时通过 ℓ₁ 正则化保持了高度稀疏性（仅 ~27% 非零权重）。</p>\n</li>\n<li>\n<p><strong>ImageNet 大规模图像排序</strong>：15,000 个类别的排序任务，约 200 万张图片。AdaGrad-RDA 在平均精度（0.6022）上显著优于 PA（0.5581）和标准 RDA（0.5042），同时保持了 72.67% 的稀疏度。</p>\n</li>\n</ol>",
      "quiz": {
        "q": "AdaGrad 对角版本中，参数 i 的有效学习率与什么成反比？",
        "options": [
          "当前步梯度的绝对值 |g_{t,i}|",
          "历史梯度平方和的平方根 sqrt(sum g_{τ,i}^2)",
          "时间步 t 的平方根 sqrt(t)",
          "参数当前值的绝对值 |x_{t,i}|"
        ],
        "answer": 1,
        "explain": "AdaGrad 的核心机制是用历史梯度的二阶矩（各步梯度平方的累积和）的平方根作为分母来缩放学习率，使得频繁更新的参数学习率自动减小，稀疏更新的参数保持较大学习率。"
      }
    },
    {
      "id": "rmsprop",
      "num": 10,
      "name": "RMSProp",
      "fullName": "均方根传播 (RMSProp)",
      "year": "2012",
      "org": "Univ. of Toronto",
      "parent": "adagrad",
      "paperUrl": "https://d2l.ai/chapter_optimization/rmsprop.html",
      "projectUrl": "",
      "category": "adaptive",
      "motivation": "指数衰减移动平均解决学习率消失",
      "summary": "RMSProp 通过对梯度平方使用指数衰减移动平均（而非 Adagrad 的累积求和）来归一化学习率，解决了 Adagrad 在非凸优化中学习率单调递减至零的问题，使其适用于深度学习训练。",
      "keyPoints": [
        "将 Adagrad 的梯度平方累积和替换为<strong>指数加权移动平均</strong>，避免学习率无限衰减",
        "引入衰减系数 <span class=\"kb-math kb-math-inline\">\\gamma</span>（典型值 0.9）控制历史信息的半衰期，约为 <span class=\"kb-math kb-math-inline\">1/(1-\\gamma)</span> 步",
        "<strong>解耦</strong>了学习率调度与坐标自适应缩放：全局学习率 <span class=\"kb-math kb-math-inline\">\\eta</span> 独立可控",
        "保留了 Adagrad 的坐标级自适应性（coordinate-wise adaptivity）作为预条件器",
        "是 Adam、Adadelta 等后续自适应优化器的直接前驱"
      ],
      "detail": "<h5>核心示意图</h5>\n<p><img alt=\"RMSProp 指数衰减权重分布\" src=\"https://d2l.ai/_images/output_rmsprop_251805_3_0.svg\" />\n<em>图：不同 <span class=\"kb-math kb-math-inline\">\\gamma</span> 值下，指数移动平均对历史梯度的权重分配。<span class=\"kb-math kb-math-inline\">\\gamma</span> 越大，记忆越长。</em></p>\n<p><img alt=\"RMSProp 优化轨迹\" src=\"https://d2l.ai/_images/output_rmsprop_251805_6_1.svg\" />\n<em>图：RMSProp 在二次函数 <span class=\"kb-math kb-math-inline\">f(x_1, x_2) = 0.1x_1^2 + 2x_2^2</span> 上的优化轨迹，相比 Adagrad 后期不会停滞。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># RMSProp 核心更新规则\n# 输入: 学习率 η, 衰减系数 γ, 稳定常数 ε, 初始参数 x_0\n# 初始化: s_0 = 0\n\nfor t in range(1, T+1):\n    g_t = compute_gradient(x_{t-1})          # 计算当前梯度\n    s_t = γ * s_{t-1} + (1 - γ) * g_t ** 2  # 指数移动平均更新二阶矩估计\n    x_t = x_{t-1} - η / sqrt(s_t + ε) * g_t # 自适应学习率参数更新\n</code></pre>\n<h5>动机与背景</h5>\n<p>Adagrad 通过累积所有历史梯度的平方和 <span class=\"kb-math kb-math-inline\">\\mathbf{s}_t = \\mathbf{s}_{t-1} + \\mathbf{g}_t^2</span> 来自适应调整每个参数的学习率。这在凸优化（如稀疏特征的线性模型）中效果良好，但存在一个根本缺陷：<strong>状态变量 <span class=\"kb-math kb-math-inline\">\\mathbf{s}_t</span> 单调递增，导致有效学习率以 <span class=\"kb-math kb-math-inline\">\\mathcal{O}(t^{-1/2})</span> 的速率衰减至零</strong>。对于深度学习中的非凸问题，训练后期模型可能尚未收敛，学习率就已经过小而无法继续有效更新。</p>\n<p>一种朴素的修复方案是使用 <span class=\"kb-math kb-math-inline\">\\mathbf{s}_t / t</span> 进行归一化，但这意味着算法\"记住\"了完整的历史轨迹，收敛到合理行为需要很长时间。</p>\n<h5>核心机制：指数衰减移动平均</h5>\n<p>RMSProp 的核心创新是引入<strong>泄漏平均（leaky average）</strong>机制，与动量法中的做法类似：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{s}_t \\leftarrow \\gamma \\mathbf{s}_{t-1} + (1 - \\gamma) \\mathbf{g}_t^2</div>\n<div class=\"kb-math kb-math-display\">\\mathbf{x}_t \\leftarrow \\mathbf{x}_{t-1} - \\frac{\\eta}{\\sqrt{\\mathbf{s}_t + \\epsilon}} \\odot \\mathbf{g}_t</div>\n<p>其中：\n- <span class=\"kb-math kb-math-inline\">\\gamma \\in (0, 1)</span> 为衰减系数，控制历史信息的遗忘速度\n- <span class=\"kb-math kb-math-inline\">\\eta</span> 为全局学习率，独立于自适应缩放\n- <span class=\"kb-math kb-math-inline\">\\epsilon</span>（典型值 <span class=\"kb-math kb-math-inline\">10^{-6}</span>）防止除零</p>\n<div class=\"key-point\">💡 <strong>关键直觉</strong>：展开递推可得 <span class=\"kb-math kb-math-inline\">\\mathbf{s}_t = (1-\\gamma)\\sum_{i=0}^{t} \\gamma^{t-i} \\mathbf{g}_i^2</span>，即近期梯度权重大、远期梯度权重指数衰减。权重总和归一化为 1，有效窗口长度约为 <span class=\"kb-math kb-math-inline\">1/(1-\\gamma)</span>。当 <span class=\"kb-math kb-math-inline\">\\gamma=0.9</span> 时，相当于对最近约 10 步梯度取加权平均。</div>\n<h5>与 Adagrad 的关键区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>Adagrad</th>\n<th>RMSProp</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>二阶矩估计</td>\n<td>累积求和（无界增长）</td>\n<td>指数移动平均（有界）</td>\n</tr>\n<tr>\n<td>有效学习率</td>\n<td>单调递减 → 0</td>\n<td>可随梯度变化波动</td>\n</tr>\n<tr>\n<td>适用场景</td>\n<td>凸优化、稀疏特征</td>\n<td>非凸优化、深度学习</td>\n</tr>\n<tr>\n<td>历史记忆</td>\n<td>完整轨迹</td>\n<td>近期窗口（<span class=\"kb-math kb-math-inline\">\\sim 1/(1-\\gamma)</span> 步）</td>\n</tr>\n<tr>\n<td>学习率调度</td>\n<td>与自适应耦合</td>\n<td>解耦，<span class=\"kb-math kb-math-inline\">\\eta</span> 独立可调</td>\n</tr>\n</tbody>\n</table></div>\n<h5>训练流程与超参数设置</h5>\n<p>典型超参数配置：\n- 学习率 <span class=\"kb-math kb-math-inline\">\\eta = 0.01</span>\n- 衰减系数 <span class=\"kb-math kb-math-inline\">\\gamma = 0.9</span>（聚合最近约 10 步梯度信息）\n- 稳定常数 <span class=\"kb-math kb-math-inline\">\\epsilon = 10^{-6}</span></p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：当 <span class=\"kb-math kb-math-inline\">\\gamma = 1</span> 时，RMSProp 退化为 Adagrad（无遗忘）；当 <span class=\"kb-math kb-math-inline\">\\gamma = 0</span> 时，仅使用当前步梯度，失去平滑效果。实践中 <span class=\"kb-math kb-math-inline\">\\gamma \\in [0.9, 0.99]</span> 效果最佳。</div>\n<h5>历史地位与影响</h5>\n<p>RMSProp 由 Geoffrey Hinton 在 2012 年 Coursera 课程 \"Neural Networks for Machine Learning\" 第 6e 讲中提出（未正式发表论文），但因其简洁有效而被广泛采用。它直接启发了：\n- <strong>Adadelta</strong>（2012）：用参数更新的 RMS 替代全局学习率\n- <strong>Adam</strong>（2014）：结合 RMSProp 的二阶矩估计与动量的一阶矩估计，并加入偏差校正</p>",
      "quiz": {
        "q": "RMSProp 相比 Adagrad 的核心改进是什么？",
        "options": [
          "引入动量项加速收敛",
          "用梯度平方的指数移动平均替代累积和，防止学习率衰减至零",
          "对学习率施加 L2 正则化",
          "使用二阶导数（Hessian）信息进行预条件"
        ],
        "answer": 1,
        "explain": "RMSProp 将 Adagrad 中无界增长的梯度平方累积和替换为指数衰减移动平均，使得有效学习率不会单调递减至零，从而适用于深度学习中的非凸优化。"
      }
    },
    {
      "id": "adam",
      "num": 11,
      "name": "Adam",
      "fullName": "自适应矩估计 (Adam)",
      "year": "2014",
      "org": "Univ. of Toronto",
      "parent": "rmsprop",
      "paperUrl": "https://arxiv.org/abs/1412.6980",
      "projectUrl": "",
      "category": "adaptive",
      "motivation": "融合一阶矩与二阶矩估计加偏差修正",
      "summary": "Adam 通过同时维护梯度的指数移动平均（一阶矩）和梯度平方的指数移动平均（二阶矩），并对两者进行偏差修正，实现了对每个参数自适应调整学习率的高效优化算法，兼具 Momentum 的加速效果和 RMSProp 的自适应性。",
      "keyPoints": [
        "<strong>自适应学习率</strong>：结合一阶矩估计（类似 Momentum）和二阶矩估计（类似 RMSProp/AdaGrad），对每个参数独立调整有效学习率",
        "<strong>偏差修正</strong>：通过除以 $(1-\\beta_1^t)$ 和 $(1-\\beta_2^t)$ 修正零初始化带来的估计偏差，尤其在训练初期和 $\\beta$ 接近 1 时至关重要",
        "<strong>计算高效</strong>：时间和空间复杂度均为 $O(d)$（$d$ 为参数维度），仅需一阶梯度信息，适合大规模高维问题",
        "<strong>理论保证</strong>：在凸优化设定下证明了 $O(\\sqrt{T})$ 的 regret bound，与在线学习最优界匹配",
        "<strong>默认超参鲁棒</strong>：推荐 $\\alpha=0.001, \\beta_1=0.9, \\beta_2=0.999, \\epsilon=10^{-8}$，在多数深度学习任务中无需大量调参",
        "<strong>AdaMax 变体</strong>：将 $L^2$ 范数推广到 $L^\\infty$ 范数，得到更稳定的变体，无需偏差修正二阶矩"
      ],
      "detail": "<p><img alt=\"Adam算法与偏差修正效果\" src=\"https://ar5iv.labs.arxiv.org/html/1412.6980/assets/adam_fig4.png\" /></p>\n<p><strong>算法伪代码 (Algorithm 1: Adam)</strong></p>\n<pre><code>输入: α (步长, 默认0.001), β₁ (一阶矩衰减率, 默认0.9), β₂ (二阶矩衰减率, 默认0.999), ε (数值稳定项, 默认1e-8)\n输入: f(θ) 随机目标函数, θ₀ 初始参数\n\nm₀ ← 0  (初始化一阶矩向量)\nv₀ ← 0  (初始化二阶矩向量)\nt ← 0   (初始化时间步)\n\nwhile θ_t 未收敛 do:\n    t ← t + 1\n    g_t ← ∇_θ f_t(θ_{t-1})          # 计算梯度\n    m_t ← β₁ · m_{t-1} + (1-β₁) · g_t    # 更新一阶矩估计(均值)\n    v_t ← β₂ · v_{t-1} + (1-β₂) · g_t²   # 更新二阶矩估计(未中心化方差)\n    m̂_t ← m_t / (1 - β₁ᵗ)           # 偏差修正一阶矩\n    v̂_t ← v_t / (1 - β₂ᵗ)           # 偏差修正二阶矩\n    θ_t ← θ_{t-1} - α · m̂_t / (√v̂_t + ε)  # 参数更新\nend while\nreturn θ_t\n</code></pre>\n<p><strong>1. 动机与核心思想</strong></p>\n<p>Adam（Adaptive Moment Estimation）的设计动机源于两个经典方法的互补优势：SGD with Momentum 通过累积历史梯度方向加速收敛，而 AdaGrad/RMSProp 通过梯度平方的累积实现参数级别的自适应学习率。Adam 将两者统一到一个框架中：$m_t$ 追踪梯度的一阶矩（均值方向），$v_t$ 追踪梯度的二阶原始矩（尺度信息）。最终更新量 $\\alpha \\cdot \\hat{m}_t / \\sqrt{\\hat{v}_t}$ 的信噪比（SNR）近似为 $|\\mathbb{E}[g]| / \\sqrt{\\text{Var}[g]}$，当梯度方向一致时 SNR 大、步长大；当梯度噪声大时 SNR 小、步长自动缩小，实现了天然的自适应步长控制。</p>\n<p><strong>2. 偏差修正的必要性</strong></p>\n<p>由于 $m_0 = v_0 = 0$，在训练初期指数移动平均值会系统性地偏向零。具体地，$\\mathbb{E}[m_t] = \\mathbb{E}[g_t] \\cdot (1-\\beta_1^t) + \\zeta$（其中 $\\zeta$ 为高阶小量），因此 $m_t/(1-\\beta_1^t)$ 才是 $\\mathbb{E}[g_t]$ 的无偏估计。对于 $\\beta_2=0.999$，在 $t=1$ 时未修正的 $v_t$ 仅为真实二阶矩的 0.1%，会导致初期学习率爆炸性增大。论文实验（Figure 4）验证了当 $\\beta_2$ 接近 1 时，去除偏差修正会导致训练不稳定，而 Adam 在所有超参设置下均优于或等于无修正版本（即 RMSProp with momentum）。</p>\n<p><strong>3. 收敛性分析</strong></p>\n<p>在在线凸优化框架下，作者证明 Adam 的 regret bound 为 $O(\\sqrt{T})$：</p>\n<div class=\"kb-math kb-math-display\">R(T) = \\sum_{t=1}^{T} [f_t(\\theta_t) - f_t(\\theta^*)] \\leq \\frac{d}{2\\alpha(1-\\beta_1)} \\max_i \\|\\theta_{1:T,i}\\|_2 + \\frac{\\alpha(1+\\beta_1)\\sqrt{T}}{(1-\\beta_1)\\sqrt{1-\\beta_2}(1-\\gamma)^2} \\sum_{i=1}^{d} \\|g_{1:T,i}\\|_2</div>\n<p>该界与 AdaGrad 的最优界同阶，但 Adam 额外享有动量带来的实际加速。关键假设包括：有界梯度 $|g_t|<em>\\infty \\leq G</em>\\infty$、有界参数域 $|\\theta_n - \\theta_m|_2 \\leq D$，以及 $\\beta_1^2/\\sqrt{\\beta_2} &lt; 1$（默认参数满足：$0.81/\\sqrt{0.999} \\approx 0.81$）。</p>\n<p><strong>4. AdaMax 与 L∞ 范数变体</strong></p>\n<p>将二阶矩的 $L^2$ 范数推广到 $L^p$ 范数：$v_t = \\beta_2^p v_{t-1} + (1-\\beta_2^p)|g_t|^p$。当 $p \\to \\infty$ 时，更新规则退化为 $u_t = \\max(\\beta_2 \\cdot u_{t-1}, |g_t|)$，即指数加权的历史梯度绝对值最大值。AdaMax 的优势在于：(1) $u_t$ 不需要偏差修正（因为 max 操作不受零初始化影响）；(2) 数值更稳定；(3) 在某些任务上表现优于 Adam。推荐默认参数为 $\\alpha=0.002, \\beta_1=0.9, \\beta_2=0.999$。</p>\n<p><strong>5. 与相关方法的关系</strong></p>\n<ul>\n<li>去除偏差修正 → RMSProp with momentum（Tieleman &amp; Hinton, 2012）</li>\n<li>令 $\\beta_1=0$ → 类似 RMSProp（仅自适应学习率，无动量）</li>\n<li>令 $\\beta_2=0$，$v_t$ 累积不衰减 → 类似 AdaGrad（Duchi et al., 2011）</li>\n<li>有效步长 $\\alpha_t = \\alpha \\cdot \\sqrt{1-\\beta_2^t}/(1-\\beta_1^t)$ 有界于 $[\\alpha(1-\\beta_1)/\\sqrt{1-\\beta_2},\\ \\alpha/\\sqrt{1-\\beta_2}]$，提供了隐式的学习率退火</li>\n</ul>",
      "quiz": {
        "q": "",
        "options": [],
        "answer": 0,
        "explain": ""
      }
    },
    {
      "id": "amsgrad",
      "num": 12,
      "name": "AMSGrad",
      "fullName": "AMSGrad",
      "year": "2018",
      "org": "Google/CMU",
      "parent": "adam",
      "paperUrl": "https://arxiv.org/abs/1904.09237",
      "projectUrl": "",
      "category": "adaptive",
      "motivation": "维护二阶矩最大值修复Adam收敛漏洞",
      "summary": "AMSGrad 通过维护二阶矩估计的历史最大值（而非直接使用当前指数移动平均）来归一化梯度，修复了 Adam 在特定凸优化问题中因学习率非单调递减而导致的收敛失败问题，提供了理论上有保证的收敛性。",
      "keyPoints": [
        "<strong>Adam 收敛缺陷的理论证明</strong>：构造了一个简单的一维凸优化反例，证明 Adam 的 regret 不趋于零，即 <span class=\"kb-math kb-math-inline\">R_T/T \\nrightarrow 0</span>",
        "<strong>根因分析</strong>：Adam 的指数移动平均导致关键量 <span class=\"kb-math kb-math-inline\">\\Gamma_t = \\frac{\\sqrt{V_{t+1}}}{\\alpha_{t+1}} - \\frac{\\sqrt{V_t}}{\\alpha_t}</span> 可能为负，即学习率可能非单调递增，违反收敛所需的正定性条件",
        "<strong>核心修复机制</strong>：引入 <span class=\"kb-math kb-math-inline\">\\hat{v}_t = \\max(\\hat{v}_{t-1}, v_t)</span>，维护二阶矩的逐元素历史最大值，确保有效学习率单调不增",
        "<strong>保持 Adam 的计算效率</strong>：时间和空间复杂度与 Adam 相同，仅多维护一个 <span class=\"kb-math kb-math-inline\">\\hat{v}</span> 向量",
        "<strong>理论收敛保证</strong>：在凸设置下证明了 <span class=\"kb-math kb-math-inline\">O(\\sqrt{T})</span> 的 regret bound，条件为 <span class=\"kb-math kb-math-inline\">\\gamma = \\beta_1/\\sqrt{\\beta_2} &lt; 1</span>",
        "<strong>\"长期记忆\"设计哲学</strong>：指出自适应方法需要对历史梯度保持长期记忆才能保证收敛，而非仅依赖近期窗口"
      ],
      "detail": "<p><img alt=\"AMSGrad 算法伪代码\" src=\"https://ar5iv.labs.arxiv.org/html/1904.09237/assets/x1.png\" />\n<em>图：论文中 Adam 与 AMSGrad 在反例函数上的收敛行为对比</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># AMSGrad 算法\n# 输入: x_1, 学习率 {α_t}, 动量参数 {β_1t}, β_2\n# 初始化: m_0 = 0, v_0 = 0, v_hat_0 = 0\n\nfor t in range(1, T+1):\n    g_t = ∇f_t(x_t)                          # 计算梯度\n    m_t = β_1t * m_{t-1} + (1 - β_1t) * g_t  # 一阶矩估计（动量）\n    v_t = β_2 * v_{t-1} + (1 - β_2) * g_t**2 # 二阶矩估计\n    v_hat_t = max(v_hat_{t-1}, v_t)           # ★ 关键：取历史最大值\n    x_{t+1} = Π_F(x_t - α_t * m_t / sqrt(v_hat_t))  # 参数更新\n</code></pre>\n<h5>动机与背景：Adam 为何会发散？</h5>\n<p>Adam 及 RMSprop 等自适应学习率方法使用指数移动平均（EMA）来估计梯度的二阶矩：</p>\n<div class=\"kb-math kb-math-display\">v_t = \\beta_2 v_{t-1} + (1 - \\beta_2) g_t^2</div>\n<p>这种设计的初衷是让算法只关注近期梯度信息，避免 Adagrad 中学习率因累积所有历史梯度而过快衰减的问题。然而，EMA 引入了一个致命缺陷：<strong>学习率可能在某些步骤突然增大</strong>。</p>\n<p>具体而言，收敛分析依赖于以下关键量为正半定：</p>\n<div class=\"kb-math kb-math-display\">\\Gamma_{t+1} = \\frac{\\sqrt{V_{t+1}}}{\\alpha_{t+1}} - \\frac{\\sqrt{V_t}}{\\alpha_t}</div>\n<p>对于 SGD 和 Adagrad，<span class=\"kb-math kb-math-inline\">\\Gamma_t \\succeq 0</span> 天然成立（学习率单调不增）。但对于 Adam，当某一步梯度较小时，<span class=\"kb-math kb-math-inline\">v_t</span> 会因 EMA 衰减而减小，导致 <span class=\"kb-math kb-math-inline\">\\Gamma_t</span> 为负——即学习率反而增大了。</p>\n<h5>Adam 的反例构造</h5>\n<p>论文构造了一个精巧的一维凸优化问题，定义域 <span class=\"kb-math kb-math-inline\">\\mathcal{F} = [-1, 1]</span>：</p>\n<div class=\"kb-math kb-math-display\">f_t(x) = \\begin{cases} Cx, &amp; \\text{若 } t \\bmod 3 = 1 \\\\ -x, &amp; \\text{其他} \\end{cases}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">C &gt; 2</span>。最优解显然是 <span class=\"kb-math kb-math-inline\">x^* = -1</span>（因为总梯度 <span class=\"kb-math kb-math-inline\">C - 2 &gt; 0</span>）。</p>\n<p>设 <span class=\"kb-math kb-math-inline\">\\beta_1 = 0</span>，<span class=\"kb-math kb-math-inline\">\\beta_2 = 1/(1 + C^2)</span>。直觉上：\n1. 每 3 步中有 1 步观察到大梯度 <span class=\"kb-math kb-math-inline\">C</span>（方向正确，推向 <span class=\"kb-math kb-math-inline\">-1</span>）\n2. 另外 2 步观察到梯度 <span class=\"kb-math kb-math-inline\">-1</span>（方向错误，推向 <span class=\"kb-math kb-math-inline\">+1</span>）\n3. 大梯度 <span class=\"kb-math kb-math-inline\">C</span> 本应主导更新方向，但由于 <span class=\"kb-math kb-math-inline\">\\beta_2</span> 的选择，<span class=\"kb-math kb-math-inline\">v_t</span> 在大梯度出现时也很大（约 <span class=\"kb-math kb-math-inline\">C^2</span>），将其归一化后更新幅度仅约为 1\n4. 而小梯度 <span class=\"kb-math kb-math-inline\">-1</span> 出现时 <span class=\"kb-math kb-math-inline\">v_t</span> 已衰减，归一化后的更新幅度反而更大</p>\n<div class=\"warn-box\">⚠️ 关键洞察：Adam 的 EMA 机制使得\"信息量大的稀疏梯度\"被过度压缩，而\"噪声性的频繁梯度\"被放大，最终导致算法收敛到错误方向。</div>\n<p><strong>Theorem 1</strong> 形式化证明了在此设置下 Adam 的平均 regret <span class=\"kb-math kb-math-inline\">R_T/T \\nrightarrow 0</span>，即算法不收敛。</p>\n<h5>AMSGrad 的修复机制</h5>\n<p>AMSGrad 的核心修改只有一行：</p>\n<div class=\"kb-math kb-math-display\">\\hat{v}_t = \\max(\\hat{v}_{t-1}, v_t)</div>\n<p>用 <span class=\"kb-math kb-math-inline\">\\hat{v}_t</span> 替代 <span class=\"kb-math kb-math-inline\">v_t</span> 进行归一化。这一简单修改带来了关键性质：</p>\n<ol>\n<li><strong>学习率单调不增</strong>：由于 <span class=\"kb-math kb-math-inline\">\\hat{v}_t \\geq \\hat{v}_{t-1}</span>，有效学习率 <span class=\"kb-math kb-math-inline\">\\alpha_t / \\sqrt{\\hat{v}_t}</span> 单调不增，确保 <span class=\"kb-math kb-math-inline\">\\Gamma_t \\succeq 0</span></li>\n<li><strong>保留自适应性</strong>：不同坐标仍然有不同的学习率，保持了 Adam 的核心优势</li>\n<li><strong>介于 Adam 和 Adagrad 之间</strong>：当梯度稳定时，<span class=\"kb-math kb-math-inline\">\\hat{v}_t \\approx v_t</span>，行为接近 Adam；当梯度波动大时，<span class=\"kb-math kb-math-inline\">\\hat{v}_t</span> 趋向累积最大值，行为更接近 Adagrad</li>\n</ol>\n<h5>收敛性保证</h5>\n<p><strong>Theorem 4</strong> 证明了 AMSGrad 在凸设置下的 regret bound：</p>\n<div class=\"kb-math kb-math-display\">R_T \\leq \\frac{D_\\infty^2 \\sqrt{T}}{\\alpha(1-\\beta_1)} \\sum_{i=1}^d \\hat{v}_{T,i}^{1/2} + \\frac{\\alpha\\sqrt{1+\\log T}}{(1-\\beta_1)^2(1-\\gamma)\\sqrt{1-\\beta_2}} \\sum_{i=1}^d \\|g_{1:T,i}\\|_2</div>\n<p>其中要求 <span class=\"kb-math kb-math-inline\">\\gamma = \\beta_1/\\sqrt{\\beta_2} &lt; 1</span>。该 bound 具有数据依赖性，在稀疏梯度场景下可显著优于 SGD 的 <span class=\"kb-math kb-math-inline\">O(\\sqrt{dT})</span> bound。</p>\n<div class=\"key-point\">💡 关键：AMSGrad 的收敛保证不依赖于学习率递减调度（<span class=\"kb-math kb-math-inline\">\\alpha_t = \\alpha/\\sqrt{t}</span> 即可），而 Adam 即使使用递减学习率也无法在上述反例中收敛。</div>\n<h5>与 Adam 的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>Adam</th>\n<th>AMSGrad</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>二阶矩估计</td>\n<td><span class=\"kb-math kb-math-inline\">v_t = \\beta_2 v_{t-1} + (1-\\beta_2)g_t^2</span></td>\n<td>同左 + <span class=\"kb-math kb-math-inline\">\\hat{v}_t = \\max(\\hat{v}_{t-1}, v_t)</span></td>\n</tr>\n<tr>\n<td>归一化分母</td>\n<td><span class=\"kb-math kb-math-inline\">\\sqrt{v_t}</span></td>\n<td><span class=\"kb-math kb-math-inline\">\\sqrt{\\hat{v}_t}</span></td>\n</tr>\n<tr>\n<td>学习率单调性</td>\n<td>非单调（可增可减）</td>\n<td>单调不增</td>\n</tr>\n<tr>\n<td>理论收敛保证</td>\n<td>❌ 存在反例</td>\n<td>✅ <span class=\"kb-math kb-math-inline\">O(\\sqrt{T})</span> regret</td>\n</tr>\n<tr>\n<td>额外存储</td>\n<td>无</td>\n<td>一个 <span class=\"kb-math kb-math-inline\">\\hat{v}</span> 向量</td>\n</tr>\n<tr>\n<td>实际表现</td>\n<td>通常更快收敛</td>\n<td>某些任务更稳定</td>\n</tr>\n</tbody>\n</table></div>",
      "quiz": {
        "q": "AMSGrad 相比 Adam 的核心修改是什么？",
        "options": [
          "使用更小的学习率 α",
          "将一阶矩估计替换为梯度累积和",
          "维护二阶矩估计的历史最大值用于归一化",
          "增加 bias correction 步骤"
        ],
        "answer": 2,
        "explain": "AMSGrad 的唯一核心修改是 v̂_t = max(v̂_{t-1}, v_t)，即用二阶矩的历史最大值替代当前值进行归一化，确保学习率单调不增，从而修复 Adam 的收敛缺陷。"
      }
    },
    {
      "id": "nag",
      "num": 13,
      "name": "NAG",
      "fullName": "Nesterov加速梯度 (Nesterov Accelerated Gradient)",
      "year": "1983",
      "org": "USSR Academy",
      "parent": "gd",
      "paperUrl": "https://hengshuaiyao.github.io/papers/nesterov83.pdf",
      "projectUrl": "",
      "category": "accelerated",
      "motivation": "展望式动量达到一阶方法理论下界O(1/k²)",
      "summary": "Nesterov 提出了一种非松弛型（non-relaxational）凸优化方法，通过在\"展望点\"（lookahead point）而非当前点计算梯度并结合特殊的动量序列，将一阶方法的收敛速率从 \\(O(1/k)\\) 加速至 \\(O(1/k^2)\\)，达到了凸光滑优化一阶方法的理论最优下界。",
      "keyPoints": [
        "<strong>非松弛序列构造</strong>：最小化序列 <span class=\"kb-math kb-math-inline\">\\{x_k\\}</span> 不要求函数值单调下降，从而减少每步计算量",
        "<strong>展望式梯度计算</strong>：在外推点 <span class=\"kb-math kb-math-inline\">y_k</span> 而非当前最优点 <span class=\"kb-math kb-math-inline\">x_k</span> 处计算梯度，实现\"先看再走\"",
        "<strong>最优收敛速率</strong>：<span class=\"kb-math kb-math-inline\">f(x_k) - f^* \\leq O(1/k^2)</span>，匹配 Nemirovsky-Yudin 一阶方法理论下界",
        "<strong>动量参数序列</strong>：通过递推 <span class=\"kb-math kb-math-inline\">a_{k+1} = (1 + \\sqrt{1 + 4a_k^2})/2</span> 自动确定动量系数",
        "<strong>自适应步长策略</strong>：采用回溯线搜索确定步长 <span class=\"kb-math kb-math-inline\">\\alpha_k</span>，无需预知 Lipschitz 常数 <span class=\"kb-math kb-math-inline\">L</span>",
        "<strong>强凸扩展</strong>：对强凸函数引入重启策略，达到线性收敛速率的理论最优"
      ],
      "detail": "<p><img alt=\"NAG 与 GD/Momentum 对比示意图\" src=\"https://distill.pub/2017/momentum/thumbnail.jpg\" />\n<em>图：NAG 的核心思想——在展望点计算梯度（图源：Distill \"Why Momentum Really Works\"）。标准动量法在当前点计算梯度后加动量，而 NAG 先沿动量方向\"展望\"，再在展望点计算梯度进行修正。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># Nesterov Accelerated Gradient (NAG) - 已知 L 的简化版本\ndef nag(f, grad_f, y0, L, max_iter):\n    &quot;&quot;&quot;\n    f: 目标函数 (凸, 梯度 L-Lipschitz)\n    grad_f: 梯度函数\n    y0: 初始点\n    L: 梯度 Lipschitz 常数\n    max_iter: 最大迭代次数\n    &quot;&quot;&quot;\n    x_prev = y0\n    x_curr = y0\n    a_prev = 1.0\n\n    for k in range(max_iter):\n        # 1. 计算动量参数\n        a_curr = (1 + math.sqrt(1 + 4 * a_prev**2)) / 2\n\n        # 2. 构造展望点 (lookahead / extrapolation)\n        beta_k = (a_prev - 1) / a_curr\n        y_k = x_curr + beta_k * (x_curr - x_prev)\n\n        # 3. 在展望点做梯度下降\n        x_next = y_k - (1/L) * grad_f(y_k)\n\n        # 4. 更新\n        x_prev = x_curr\n        x_curr = x_next\n        a_prev = a_curr\n\n    return x_curr\n</code></pre>\n<h5>动机与背景</h5>\n<p>在 1983 年之前，求解光滑凸优化问题 <span class=\"kb-math kb-math-inline\">\\min_{x \\in E} f(x)</span> 的一阶方法（仅使用梯度信息）主要有两类：</p>\n<ol>\n<li><strong>梯度下降法 (GD)</strong>：<span class=\"kb-math kb-math-inline\">x_{k+1} = x_k - \\alpha \\nabla f(x_k)</span>，收敛速率为 <span class=\"kb-math kb-math-inline\">O(1/k)</span></li>\n<li><strong>重球法 (Heavy Ball, Polyak 1964)</strong>：加入动量项 <span class=\"kb-math kb-math-inline\">x_{k+1} = x_k - \\alpha \\nabla f(x_k) + \\beta(x_k - x_{k-1})</span>，在二次函数上可加速，但对一般凸函数无理论保证</li>\n</ol>\n<p>Nemirovsky 和 Yudin (1979) 证明了一阶方法在 <span class=\"kb-math kb-math-inline\">L</span>-光滑凸函数类上的收敛速率下界为 <span class=\"kb-math kb-math-inline\">\\Omega(1/k^2)</span>，即不存在一阶方法能比 <span class=\"kb-math kb-math-inline\">O(1/k^2)</span> 更快。然而在 Nesterov 之前，没有任何方法能达到这个下界。</p>\n<div class=\"key-point\">💡 <strong>关键洞察</strong>：传统方法要求函数值单调下降（松弛性），这限制了每步的\"冒险\"程度。Nesterov 放弃了单调性要求，允许序列在某些步\"变差\"，换取整体更快的收敛。</div>\n<h5>核心机制详解</h5>\n<p><strong>1. 展望点（Extrapolation Point）的构造</strong></p>\n<p>NAG 的核心创新在于引入辅助序列 <span class=\"kb-math kb-math-inline\">\\{y_k\\}</span>：</p>\n<div class=\"kb-math kb-math-display\">y_{k+1} = x_k + \\frac{a_k - 1}{a_{k+1}} (x_k - x_{k-1})</div>\n<p>这里 <span class=\"kb-math kb-math-inline\">\\frac{a_k - 1}{a_{k+1}}</span> 是动量系数（约趋近于 <span class=\"kb-math kb-math-inline\">\\frac{k-1}{k+2}</span>）。展望点 <span class=\"kb-math kb-math-inline\">y_k</span> 是当前点 <span class=\"kb-math kb-math-inline\">x_k</span> 沿上一步方向的外推，相当于\"预测\"下一步可能到达的位置。</p>\n<p><strong>2. 动量参数序列的递推</strong></p>\n<p>参数 <span class=\"kb-math kb-math-inline\">a_k</span> 通过以下递推确定：</p>\n<div class=\"kb-math kb-math-display\">a_{k+1} = \\frac{1 + \\sqrt{1 + 4a_k^2}}{2}, \\quad a_0 = 1</div>\n<p>这保证了 <span class=\"kb-math kb-math-inline\">a_k \\geq 1 + k/2</span>，从而动量系数 <span class=\"kb-math kb-math-inline\">\\beta_k = (a_k - 1)/a_{k+1}</span> 从 0 逐渐增大趋近于 1。这个特定的递推关系是收敛证明的关键——它使得 Lyapunov 函数能够逐步递减。</p>\n<p><strong>3. 梯度步与更新</strong></p>\n<p>在展望点 <span class=\"kb-math kb-math-inline\">y_k</span> 处执行标准梯度步：</p>\n<div class=\"kb-math kb-math-display\">x_{k+1} = y_k - \\alpha_k \\nabla f(y_k)</div>\n<p>当 <span class=\"kb-math kb-math-inline\">L</span> 已知时取 <span class=\"kb-math kb-math-inline\">\\alpha_k = 1/L</span>；未知时通过回溯线搜索找到满足以下条件的最小 <span class=\"kb-math kb-math-inline\">i \\geq 0</span>：</p>\n<div class=\"kb-math kb-math-display\">f(y_k - 2^{-i}\\alpha_{k-1} \\nabla f(y_k)) \\leq f(y_k) - 0.5 \\cdot 2^{-i}\\alpha_{k-1} \\|\\nabla f(y_k)\\|^2</div>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：线搜索从上一步的步长 <span class=\"kb-math kb-math-inline\">\\alpha_{k-1}</span> 开始（而非从 1 开始），这保证了总的额外函数求值次数仅为 <span class=\"kb-math kb-math-inline\">O(\\log L)</span>。</div>\n<p><strong>4. 收敛性定理</strong></p>\n<p><strong>定理 1</strong>（Nesterov, 1983）：设 <span class=\"kb-math kb-math-inline\">f(x)</span> 为凸函数且 <span class=\"kb-math kb-math-inline\">\\nabla f</span> 满足 <span class=\"kb-math kb-math-inline\">L</span>-Lipschitz 条件，<span class=\"kb-math kb-math-inline\">X^*</span> 为最优解集非空。则方法 (3)-(5) 生成的序列满足：</p>\n<div class=\"kb-math kb-math-display\">f(x_k) - f^* \\leq \\frac{4L\\|y_0 - x^*\\|^2}{(k+2)^2}</div>\n<ul>\n<li>达到 <span class=\"kb-math kb-math-inline\">\\varepsilon</span> 精度所需梯度计算次数：<span class=\"kb-math kb-math-inline\">N_G = \\lceil\\sqrt{4L\\|y_0 - x^*\\|^2 / \\varepsilon}\\rceil</span></li>\n<li>额外的函数求值次数：<span class=\"kb-math kb-math-inline\">N_F = 2N_G + \\lfloor\\log_2(2L\\alpha_{-1})\\rfloor + 1</span></li>\n</ul>\n<p><strong>证明核心思路</strong>：构造 Lyapunov 函数 <span class=\"kb-math kb-math-inline\">V_k = 2a_k a_{k-1}(f(x_k) - f^*) + \\|p_k - x^*\\|^2</span>（其中 <span class=\"kb-math kb-math-inline\">p_k</span> 为辅助点），证明 <span class=\"kb-math kb-math-inline\">V_{k+1} \\leq V_k</span>，再利用 <span class=\"kb-math kb-math-inline\">a_k \\geq 1 + k/2</span> 得到最终估计。</p>\n<h5>与传统方法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>收敛速率</th>\n<th>单调性</th>\n<th>梯度计算点</th>\n<th>理论最优</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>梯度下降 (GD)</td>\n<td><span class=\"kb-math kb-math-inline\">O(1/k)</span></td>\n<td>✅ 单调</td>\n<td>当前点 <span class=\"kb-math kb-math-inline\">x_k</span></td>\n<td>❌</td>\n</tr>\n<tr>\n<td>重球法 (Heavy Ball)</td>\n<td>无一般凸保证</td>\n<td>❌</td>\n<td>当前点 <span class=\"kb-math kb-math-inline\">x_k</span></td>\n<td>❌</td>\n</tr>\n<tr>\n<td><strong>NAG</strong></td>\n<td><span class=\"kb-math kb-math-inline\">O(1/k^2)</span></td>\n<td>❌ 非单调</td>\n<td><strong>展望点</strong> <span class=\"kb-math kb-math-inline\">y_k</span></td>\n<td>✅</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 <strong>直觉理解</strong>：想象一个球在山谷中滚动。GD 每步只看脚下的坡度；Heavy Ball 加了惯性但仍看脚下；NAG 则\"先滑行一段再看坡度\"——如果发现滑过头了，梯度会自动修正方向。这种\"先行动后修正\"的策略比\"先观察后行动\"更高效。</div>\n<h5>强凸情形的重启策略</h5>\n<p>对于强凸函数（<span class=\"kb-math kb-math-inline\">f(x) - f^* \\geq \\frac{m}{2}\\|x - x^*\\|^2</span>），Nesterov 提出每 <span class=\"kb-math kb-math-inline\">\\lceil 4\\sqrt{L/m}\\rceil - 1</span> 次迭代后重启算法。每次重启后残差减半，从而达到线性收敛速率：</p>\n<div class=\"kb-math kb-math-display\">f(x_N) - f^* \\leq \\varepsilon \\quad \\Rightarrow \\quad N = O\\left(\\sqrt{\\frac{L}{m}} \\log \\frac{1}{\\varepsilon}\\right)</div>\n<p>这同样匹配强凸函数类的一阶方法下界（条件数 <span class=\"kb-math kb-math-inline\">\\kappa = L/m</span> 的平方根依赖）。</p>",
      "quiz": {
        "q": "NAG 相比标准梯度下降的核心区别是什么？",
        "options": [
          "使用二阶导数（Hessian）信息加速收敛",
          "在外推展望点而非当前点计算梯度，并允许函数值非单调下降",
          "通过增大学习率来加速收敛",
          "使用随机梯度代替全梯度以降低计算量"
        ],
        "answer": 1,
        "explain": "NAG 的两个关键创新：(1) 在展望点 y_k 而非当前点 x_k 计算梯度；(2) 放弃函数值单调下降的要求。这两点共同使其达到 O(1/k²) 的最优收敛速率，而非 GD 的 O(1/k)。"
      }
    },
    {
      "id": "lbfgs",
      "num": 14,
      "name": "L-BFGS",
      "fullName": "有限内存BFGS (Limited-memory BFGS)",
      "year": "1980",
      "org": "Northwestern Univ.",
      "parent": "newton",
      "paperUrl": "https://www.ams.org/journals/mcom/1980-35-151/S0025-5718-1980-0572855-7/",
      "projectUrl": "",
      "category": "accelerated",
      "motivation": "仅存近m步向量近似Hessian逆，省内存",
      "summary": "L-BFGS 提出了一种仅保留最近 \\(m\\) 步梯度差和位移向量来隐式近似 Hessian 逆矩阵的方法，将标准 BFGS 的 \\(O(n^2)\\) 存储降至 \\(O(mn)\\)，使拟牛顿法可扩展到大规模优化问题。",
      "keyPoints": [
        "<strong>有限内存策略</strong>：仅存储最近 <span class=\"kb-math kb-math-inline\">m</span> 对向量 <span class=\"kb-math kb-math-inline\">\\{s_k, y_k\\}</span>，丢弃最旧信息并替换为最新信息，持续更新近似矩阵",
        "<strong>乘积形式 BFGS 更新</strong>：将 BFGS 公式改写为乘积形式 <span class=\"kb-math kb-math-inline\">H_{k+1} = V_k^T H_k V_k + \\rho_k s_k s_k^T</span>，使\"丢弃旧更新\"等价于令 <span class=\"kb-math kb-math-inline\">V=I, \\rho ss^T=0</span>",
        "<strong>两类算法</strong>：SQN（拟牛顿方向搜索）和 SCG（预条件共轭梯度），均保持二次终止性",
        "<strong>正定性保证</strong>：只要 <span class=\"kb-math kb-math-inline\">y_k^T s_k &gt; 0</span>（通过充分精确的线搜索保证），生成的矩阵始终正定",
        "<strong>拟牛顿方程满足</strong>：在过去 <span class=\"kb-math kb-math-inline\">m</span> 个方向上满足 <span class=\"kb-math kb-math-inline\">H_k y_j = s_j</span>（对严格凸二次函数）",
        "<strong>存储需求</strong>：仅需 <span class=\"kb-math kb-math-inline\">2m+1</span> 个 <span class=\"kb-math kb-math-inline\">n</span> 维向量（对比标准 BFGS 的 <span class=\"kb-math kb-math-inline\">n(n+1)/2</span> 个标量）",
        "<strong>数值实验</strong>：性能随 <span class=\"kb-math kb-math-inline\">m</span> 增大持续改善，<span class=\"kb-math kb-math-inline\">m=3\\sim7</span> 即可获得显著加速"
      ],
      "detail": "<p><img alt=\"L-BFGS 两循环递归示意图\" src=\"https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/L-BFGS_two-loop_recursion.svg/600px-L-BFGS_two-loop_recursion.svg.png\" />\n<em>图：L-BFGS 两循环递归（two-loop recursion）计算搜索方向的流程示意。该递归利用存储的 m 对 <span class=\"kb-math kb-math-inline\">\\{s_i, y_i\\}</span> 向量隐式计算 <span class=\"kb-math kb-math-inline\">H_k g_k</span>，无需显式构造矩阵。</em></p>\n<p><strong>算法伪代码：L-BFGS 两循环递归</strong></p>\n<pre><code class=\"language-python\"># L-BFGS Two-Loop Recursion\n# 输入: 当前梯度 g_k, 存储的 m 对 {s_i, y_i}, 初始 Hessian 逆近似 H0\n# 输出: 搜索方向 d_k = -H_k * g_k\n\ndef lbfgs_direction(g_k, S, Y, H0_diag):\n    &quot;&quot;&quot;\n    S = [s_{k-m}, ..., s_{k-1}]  # 位移向量\n    Y = [y_{k-m}, ..., y_{k-1}]  # 梯度差向量\n    &quot;&quot;&quot;\n    m = len(S)\n    q = g_k.copy()\n    alpha = [0.0] * m\n    rho = [1.0 / (Y[i].dot(S[i])) for i in range(m)]\n\n    # 第一循环：从最新到最旧\n    for i in range(m-1, -1, -1):\n        alpha[i] = rho[i] * S[i].dot(q)\n        q = q - alpha[i] * Y[i]\n\n    # 初始 Hessian 逆近似（通常取标量矩阵）\n    r = H0_diag * q  # H0 * q\n\n    # 第二循环：从最旧到最新\n    for i in range(m):\n        beta = rho[i] * Y[i].dot(r)\n        r = r + (alpha[i] - beta) * S[i]\n\n    return -r  # 搜索方向\n</code></pre>\n<p><strong>L-BFGS 主循环伪代码：</strong></p>\n<pre><code class=\"language-python\"># L-BFGS 优化主循环\ndef lbfgs_optimize(f, grad_f, x0, m=5, max_iter=1000, tol=1e-6):\n    x = x0\n    S, Y = [], []  # 存储最近 m 对向量\n\n    for k in range(max_iter):\n        g = grad_f(x)\n        if norm(g) &lt; tol:\n            break\n\n        # 计算搜索方向\n        H0 = (S[-1].dot(Y[-1]) / Y[-1].dot(Y[-1])) if S else 1.0\n        d = lbfgs_direction(g, S, Y, H0)\n\n        # 线搜索确定步长\n        alpha = line_search(f, grad_f, x, d)  # Wolfe 条件\n\n        # 更新\n        s = alpha * d\n        x_new = x + s\n        y = grad_f(x_new) - g\n\n        # 存储并维护窗口大小 m\n        if y.dot(s) &gt; 0:  # 曲率条件\n            if len(S) &gt;= m:\n                S.pop(0); Y.pop(0)  # 丢弃最旧\n            S.append(s); Y.append(y)\n\n        x = x_new\n    return x\n</code></pre>\n<p><strong>动机与背景</strong></p>\n<p>标准 BFGS 方法是最高效的拟牛顿优化算法之一，通过迭代构建 Hessian 逆矩阵的近似 <span class=\"kb-math kb-math-inline\">H_k</span>，实现超线性收敛。然而，存储完整的 <span class=\"kb-math kb-math-inline\">n \\times n</span> 对称矩阵需要 <span class=\"kb-math kb-math-inline\">O(n^2)</span> 空间，对于大规模问题（<span class=\"kb-math kb-math-inline\">n</span> 达数万甚至数百万）完全不可行。1980 年之前，解决大规模问题的替代方案主要有：</p>\n<ol>\n<li><strong>稀疏拟牛顿法</strong>（Toint, Shanno）：利用 Hessian 的稀疏结构，但需要预知稀疏模式</li>\n<li><strong>共轭梯度法（CG）</strong>：仅需 3-4 个向量存储，但收敛较慢</li>\n<li><strong>重启型方法</strong>（Buckley, Nazareth）：积累若干步后丢弃全部信息重启，信息利用不连续</li>\n</ol>\n<p>Nocedal 的核心洞察是：<strong>能否在有限存储下持续更新拟牛顿矩阵，而非周期性丢弃？</strong></p>\n<p><strong>核心机制：乘积形式与滚动窗口</strong></p>\n<p>标准 BFGS 更新有两种等价形式：</p>\n<p><strong>加法形式（Sum-Form）：</strong></p>\n<div class=\"kb-math kb-math-display\">H_{k+1} = H_k + U(s_k, y_k, H_k)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">U</span> 是秩-2 修正项：</p>\n<div class=\"kb-math kb-math-display\">U(s,y,H) = \\frac{(s^Ty + y^THy)(ss^T)}{(s^Ty)^2} - \\frac{Hys^T + sy^TH}{s^Ty}</div>\n<p><strong>乘积形式（Product-Form）：</strong></p>\n<div class=\"kb-math kb-math-display\">H_{k+1} = V_k^T H_k V_k + \\rho_k s_k s_k^T</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\rho_k = \\frac{1}{y_k^T s_k}</span>，<span class=\"kb-math kb-math-inline\">V_k = I - \\rho_k y_k s_k^T</span>。</p>\n<div class=\"key-point\">💡 关键：乘积形式的优势在于，\"丢弃一次更新\"等价于简单地令 <span class=\"kb-math kb-math-inline\">V_i = I</span> 且 <span class=\"kb-math kb-math-inline\">\\rho_i s_i s_i^T = 0</span>，不会影响后续更新的独立性。而加法形式中各更新项相互耦合，无法独立丢弃。</div>\n<p>利用乘积形式，经过 <span class=\"kb-math kb-math-inline\">k+1</span> 步（<span class=\"kb-math kb-math-inline\">k+1 &gt; m</span>）后的矩阵为：</p>\n<div class=\"kb-math kb-math-display\">H_{k+1} = V_k^T \\cdots V_{k-m+1}^T H_0 V_{k-m+1} \\cdots V_k + V_k^T \\cdots V_{k-m+2}^T \\rho_{k-m+1} s_{k-m+1} s_{k-m+1}^T V_{k-m+2} \\cdots V_k + \\cdots + \\rho_k s_k s_k^T</div>\n<p>这意味着只需存储 <span class=\"kb-math kb-math-inline\">\\{s_i, y_i\\}_{i=k-m+1}^{k}</span> 共 <span class=\"kb-math kb-math-inline\">2m</span> 个向量加上对角初始矩阵 <span class=\"kb-math kb-math-inline\">H_0</span>，即可完整重构当前近似矩阵。</p>\n<p><strong>两类使用方式</strong></p>\n<p>论文提出两种利用有限内存 BFGS 矩阵的迭代格式：</p>\n<ol>\n<li><strong>SQN（Special Quasi-Newton）</strong>：直接用 <span class=\"kb-math kb-math-inline\">d_k = -H_k g_k</span> 作为搜索方向</li>\n<li><strong>SCG（Special Conjugate Gradient）</strong>：将 <span class=\"kb-math kb-math-inline\">H_k</span> 作为预条件子用于共轭梯度迭代：<span class=\"kb-math kb-math-inline\">d_k = -H_k g_k + \\beta_k d_{k-1}</span></li>\n</ol>\n<p>两者均保持<strong>二次终止性</strong>：对严格凸二次函数配合精确线搜索，最多 <span class=\"kb-math kb-math-inline\">n</span> 步收敛到精确解。</p>\n<p><strong>与标准 BFGS 的关键区别</strong></p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>标准 BFGS</th>\n<th>L-BFGS</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>存储</td>\n<td><span class=\"kb-math kb-math-inline\">O(n^2)</span></td>\n<td><span class=\"kb-math kb-math-inline\">O(mn)</span></td>\n</tr>\n<tr>\n<td>每步计算</td>\n<td><span class=\"kb-math kb-math-inline\">O(n^2)</span>（矩阵-向量乘）</td>\n<td><span class=\"kb-math kb-math-inline\">O(mn)</span>（两循环递归）</td>\n</tr>\n<tr>\n<td>信息保留</td>\n<td>全部历史</td>\n<td>最近 <span class=\"kb-math kb-math-inline\">m</span> 步</td>\n</tr>\n<tr>\n<td>收敛速度</td>\n<td>超线性</td>\n<td>依赖 <span class=\"kb-math kb-math-inline\">m</span>，<span class=\"kb-math kb-math-inline\">m</span> 越大越接近超线性</td>\n</tr>\n<tr>\n<td>适用规模</td>\n<td><span class=\"kb-math kb-math-inline\">n &lt; 10^3</span></td>\n<td><span class=\"kb-math kb-math-inline\">n</span> 可达 <span class=\"kb-math kb-math-inline\">10^6</span> 以上</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"warn-box\">⚠️ 注意：当 <span class=\"kb-math kb-math-inline\">m=1</span> 时，L-BFGS 退化为 Shanno 的\"无记忆 BFGS\"（memoryless BFGS），本质上等价于带缩放的共轭梯度法。实践中 <span class=\"kb-math kb-math-inline\">m</span> 通常取 3~20，<span class=\"kb-math kb-math-inline\">m=5\\sim10</span> 是常见默认值。</div>\n<p><strong>初始矩阵选择</strong></p>\n<p>论文使用对角正定矩阵 <span class=\"kb-math kb-math-inline\">H_0</span> 作为初始近似。后续实践中，常见的自适应选择为：</p>\n<div class=\"kb-math kb-math-display\">H_0^{(k)} = \\frac{s_{k-1}^T y_{k-1}}{y_{k-1}^T y_{k-1}} I</div>\n<p>这一缩放使初始近似沿最近梯度方向具有正确的曲率量级。</p>\n<p><strong>数值实验结论</strong></p>\n<p>论文在 Extended Rosenbrock、Penalty I、Penalty II、Trigonometric 等标准测试函数上进行实验，结论包括：\n- SQN 在 <span class=\"kb-math kb-math-inline\">m \\geq 3</span> 时显著优于标准共轭梯度和 Shanno 方法\n- SCG 对小 <span class=\"kb-math kb-math-inline\">m</span> 值表现良好\n- 性能随 <span class=\"kb-math kb-math-inline\">m</span> 增大<strong>持续改善</strong>，极少出现退化情况</p>",
      "quiz": {
        "q": "L-BFGS 相比标准 BFGS 的核心改进是什么？",
        "options": [
          "使用更精确的线搜索策略提高收敛速度",
          "仅存储最近 m 步的向量对来隐式近似 Hessian 逆，将存储从 O(n²) 降至 O(mn)",
          "通过稀疏矩阵分解减少 Hessian 的存储需求",
          "用共轭梯度法替代拟牛顿更新以节省计算量"
        ],
        "answer": 1,
        "explain": "L-BFGS 的核心创新是利用 BFGS 的乘积形式，仅保留最近 m 对 {s_k, y_k} 向量隐式表示 Hessian 逆近似，存储从 O(n²) 降至 O(mn)，同时保持正定性和二次终止性。"
      }
    },
    {
      "id": "mirror_descent",
      "num": 15,
      "name": "Mirror Descent",
      "fullName": "镜像下降 (Mirror Descent)",
      "year": "1983",
      "org": "USSR Academy",
      "parent": "gd",
      "paperUrl": "https://en.wikipedia.org/wiki/Mirror_descent",
      "projectUrl": "",
      "category": "accelerated",
      "motivation": "Bregman散度替代欧氏距离适配非欧几何",
      "summary": "镜像下降（Mirror Descent）通过将梯度更新中的欧氏距离替换为 Bregman 散度，使优化算法能够自适应地匹配问题的内在几何结构，从而在单纯形、概率分布空间等非欧几何约束集上获得维度无关的最优收敛速率，是在线学习与凸优化领域的基础性框架算法。",
      "keyPoints": [
        "<strong>核心思想</strong>：用 Bregman 散度 <span class=\"kb-math kb-math-inline\">D_h(x \\| y)</span> 替代梯度下降中的欧氏距离 <span class=\"kb-math kb-math-inline\">\\|x - y\\|^2</span> 作为邻近项，适配非欧几何",
        "<strong>镜像映射</strong>：通过距离生成函数 <span class=\"kb-math kb-math-inline\">h</span> 的梯度 <span class=\"kb-math kb-math-inline\">\\nabla h</span> 将原始空间映射到对偶空间，在对偶空间中执行梯度步，再映射回原始空间",
        "<strong>统一框架</strong>：当 <span class=\"kb-math kb-math-inline\">h(x) = \\frac{1}{2}\\|x\\|_2^2</span> 时退化为标准梯度下降；当 <span class=\"kb-math kb-math-inline\">h(x) = \\sum_i x_i \\log x_i</span>（负熵）时退化为指数梯度/乘法权重更新",
        "<strong>维度无关收敛</strong>：在概率单纯形上使用 KL 散度时，收敛速率为 <span class=\"kb-math kb-math-inline\">O(\\sqrt{\\log n / T})</span>，仅对维度 <span class=\"kb-math kb-math-inline\">n</span> 取对数依赖",
        "<strong>强凸性要求</strong>：距离生成函数 <span class=\"kb-math kb-math-inline\">h</span> 需相对于给定范数 <span class=\"kb-math kb-math-inline\">\\|\\cdot\\|</span> 满足 <span class=\"kb-math kb-math-inline\">\\alpha</span>-强凸性，以保证算法稳定性",
        "<strong>广泛影响</strong>：奠定了在线凸优化（Online Mirror Descent）、自然梯度、信息几何优化等方向的理论基础"
      ],
      "detail": "<p><img alt=\"Mirror Descent 几何示意图\" src=\"https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Mirror_descent_illustration.svg/800px-Mirror_descent_illustration.svg.png\" />\n<em>图：Mirror Descent 的几何直觉——通过镜像映射 <span class=\"kb-math kb-math-inline\">\\nabla h</span> 将原始空间点映射到对偶空间，在对偶空间执行线性梯度步后，再通过逆映射 <span class=\"kb-math kb-math-inline\">(\\nabla h)^{-1}</span> 返回原始空间，最后通过 Bregman 投影回到可行域。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># Mirror Descent 算法\n# 输入: 凸函数 f, 可行域 K, 距离生成函数 h, 学习率序列 {η_t}\n# 输出: 近似最优解\n\ndef mirror_descent(f, K, h, grad_h, grad_h_inv, eta, T, x0):\n    &quot;&quot;&quot;\n    f: 目标函数\n    K: 凸可行域\n    h: 距离生成函数 (α-强凸)\n    grad_h: h 的梯度 (镜像映射)\n    grad_h_inv: 镜像映射的逆\n    eta: 学习率序列\n    T: 迭代次数\n    x0: 初始点 ∈ K\n    &quot;&quot;&quot;\n    x = x0\n    for t in range(T):\n        # Step 1: 映射到对偶空间\n        theta = grad_h(x)\n\n        # Step 2: 在对偶空间执行梯度步\n        g = grad_f(x)  # 计算目标函数梯度\n        theta_new = theta - eta[t] * g\n\n        # Step 3: 映射回原始空间\n        x_tilde = grad_h_inv(theta_new)\n\n        # Step 4: Bregman 投影回可行域\n        x = bregman_projection(x_tilde, K, h)\n\n    return x\n\ndef bregman_projection(y, K, h):\n    &quot;&quot;&quot;Bregman 投影: argmin_{x ∈ K} D_h(x || y)&quot;&quot;&quot;\n    # D_h(x||y) = h(x) - h(y) - ⟨∇h(y), x - y⟩\n    return argmin(lambda x: D_h(x, y), constraint=K)\n</code></pre>\n<h5>动机与背景</h5>\n<p>标准梯度下降的更新规则可以等价地写为一个邻近点问题：</p>\n<div class=\"kb-math kb-math-display\">x_{t+1} = \\arg\\min_{x} \\left\\{ \\langle \\nabla f(x_t), x - x_t \\rangle + \\frac{1}{2\\eta_t} \\|x - x_t\\|_2^2 \\right\\}</div>\n<p>这里的邻近项 <span class=\"kb-math kb-math-inline\">\\|x - x_t\\|_2^2</span> 使用的是欧氏距离，它隐含地假设参数空间是\"平坦\"的。然而，在许多实际优化问题中，可行域具有非欧几何结构：</p>\n<ul>\n<li><strong>概率单纯形</strong> <span class=\"kb-math kb-math-inline\">\\Delta_n = \\{x \\geq 0 : \\sum_i x_i = 1\\}</span>：在组合优化、在线学习中频繁出现</li>\n<li><strong>正定矩阵锥</strong>：在协方差估计、量子信息中出现</li>\n<li><strong>核范数球</strong>：在矩阵补全中出现</li>\n</ul>\n<p>在这些场景下，欧氏距离无法有效刻画点之间的\"真实距离\"。例如，在概率单纯形上，欧氏投影的计算复杂度为 <span class=\"kb-math kb-math-inline\">O(n \\log n)</span>，且收敛速率为 <span class=\"kb-math kb-math-inline\">O(\\sqrt{n/T})</span>，显式依赖维度 <span class=\"kb-math kb-math-inline\">n</span>。</p>\n<div class=\"key-point\">💡 <strong>关键洞察</strong>：Nemirovsky 和 Yudin (1983) 提出，将欧氏距离替换为与问题几何匹配的 Bregman 散度，可以显著改善算法在特定几何结构上的收敛性能。</div>\n<h5>核心机制：Bregman 散度与镜像映射</h5>\n<p><strong>Bregman 散度的定义：</strong></p>\n<p>给定严格凸且可微的函数 <span class=\"kb-math kb-math-inline\">h: \\mathbb{R}^n \\to \\mathbb{R}</span>，其诱导的 Bregman 散度定义为：</p>\n<div class=\"kb-math kb-math-display\">D_h(x \\| y) = h(x) - h(y) - \\langle \\nabla h(y), x - y \\rangle</div>\n<p>几何上，<span class=\"kb-math kb-math-inline\">D_h(x \\| y)</span> 度量了 <span class=\"kb-math kb-math-inline\">h</span> 在点 <span class=\"kb-math kb-math-inline\">y</span> 处的切平面与 <span class=\"kb-math kb-math-inline\">h(x)</span> 之间的\"间隙\"。当 <span class=\"kb-math kb-math-inline\">h(x) = \\frac{1}{2}\\|x\\|_2^2</span> 时，<span class=\"kb-math kb-math-inline\">D_h(x \\| y) = \\frac{1}{2}\\|x - y\\|_2^2</span>，退化为欧氏距离的平方。</p>\n<p><strong>Mirror Descent 的更新规则：</strong></p>\n<p>将标准梯度下降中的欧氏邻近项替换为 Bregman 散度：</p>\n<div class=\"kb-math kb-math-display\">x_{t+1} = \\arg\\min_{x \\in K} \\left\\{ \\langle \\nabla f(x_t), x - x_t \\rangle + \\frac{1}{\\eta_t} D_h(x \\| x_t) \\right\\}</div>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：这里要求 <span class=\"kb-math kb-math-inline\">h</span> 是 <span class=\"kb-math kb-math-inline\">\\alpha</span>-强凸的（相对于某个范数 <span class=\"kb-math kb-math-inline\">\\|\\cdot\\|</span>），即 <span class=\"kb-math kb-math-inline\">D_h(x \\| y) \\geq \\frac{\\alpha}{2}\\|x - y\\|^2</span>，这保证了更新的稳定性。</div>\n<p><strong>四步迭代过程的几何解释：</strong></p>\n<ol>\n<li><strong>原始→对偶（Mirror Map）</strong>：<span class=\"kb-math kb-math-inline\">\\theta_t = \\nabla h(x_t)</span>，将原始空间中的点通过镜像映射送到对偶空间</li>\n<li><strong>对偶空间梯度步</strong>：<span class=\"kb-math kb-math-inline\">\\theta_{t+1} = \\theta_t - \\eta_t \\nabla f(x_t)</span>，在对偶空间中执行标准的线性更新</li>\n<li><strong>对偶→原始（逆映射）</strong>：<span class=\"kb-math kb-math-inline\">x&#x27;_{t+1} = (\\nabla h)^{-1}(\\theta_{t+1})</span>，通过逆镜像映射返回原始空间</li>\n<li><strong>Bregman 投影</strong>：<span class=\"kb-math kb-math-inline\">x_{t+1} = \\arg\\min_{x \\in K} D_h(x \\| x&#x27;_{t+1})</span>，将点投影回可行域</li>\n</ol>\n<div class=\"key-point\">💡 <strong>直觉</strong>：镜像映射 <span class=\"kb-math kb-math-inline\">\\nabla h</span> 起到了\"坐标变换\"的作用——它将原始空间中可能弯曲的几何结构\"展平\"到对偶空间，使得在对偶空间中的线性操作对应于原始空间中适应几何的非线性操作。</div>\n<h5>关键特例与收敛分析</h5>\n<p><strong>特例 1：欧氏设定（标准梯度下降）</strong></p>\n<p>取 <span class=\"kb-math kb-math-inline\">h(x) = \\frac{1}{2}\\|x\\|_2^2</span>，则 <span class=\"kb-math kb-math-inline\">\\nabla h(x) = x</span>（恒等映射），<span class=\"kb-math kb-math-inline\">D_h(x \\| y) = \\frac{1}{2}\\|x - y\\|_2^2</span>。Mirror Descent 退化为带投影的梯度下降（Projected Gradient Descent）。</p>\n<p><strong>特例 2：负熵设定（指数梯度/乘法权重）</strong></p>\n<p>取 <span class=\"kb-math kb-math-inline\">h(x) = \\sum_{i=1}^n x_i \\log x_i</span>（负熵），可行域为概率单纯形 <span class=\"kb-math kb-math-inline\">\\Delta_n</span>。此时：\n- Bregman 散度 = KL 散度：<span class=\"kb-math kb-math-inline\">D_h(x \\| y) = \\text{KL}(x \\| y) = \\sum_i x_i \\log(x_i / y_i)</span>\n- 镜像映射：<span class=\"kb-math kb-math-inline\">[\\nabla h(x)]_i = \\log x_i + 1</span>\n- 更新规则简化为乘法权重更新：<span class=\"kb-math kb-math-inline\">x_{t+1,i} \\propto x_{t,i} \\cdot \\exp(-\\eta_t [\\nabla f(x_t)]_i)</span></p>\n<p><strong>收敛速率对比：</strong></p>\n<p>对于 Lipschitz 连续的凸函数 <span class=\"kb-math kb-math-inline\">f</span>（<span class=\"kb-math kb-math-inline\">\\|\\nabla f\\|_* \\leq G</span>），经过 <span class=\"kb-math kb-math-inline\">T</span> 步迭代后：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>设定</th>\n<th>距离生成函数</th>\n<th>可行域直径</th>\n<th>收敛速率</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>欧氏</td>\n<td><span class=\"kb-math kb-math-inline\">\\frac{1}{2}\\|x\\|_2^2</span></td>\n<td><span class=\"kb-math kb-math-inline\">O(\\sqrt{n})</span></td>\n<td><span class=\"kb-math kb-math-inline\">O(G\\sqrt{n/T})</span></td>\n</tr>\n<tr>\n<td>熵</td>\n<td><span class=\"kb-math kb-math-inline\">\\sum x_i \\log x_i</span></td>\n<td><span class=\"kb-math kb-math-inline\">O(\\log n)</span></td>\n<td><span class=\"kb-math kb-math-inline\">O(G\\sqrt{\\log n / T})</span></td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 <strong>关键优势</strong>：在概率单纯形上，使用负熵作为距离生成函数，收敛速率从 <span class=\"kb-math kb-math-inline\">O(\\sqrt{n/T})</span> 改善为 <span class=\"kb-math kb-math-inline\">O(\\sqrt{\\log n / T})</span>，实现了指数级的维度依赖改善！</div>\n<h5>与相关方法的联系</h5>\n<ul>\n<li><strong>自然梯度（Natural Gradient）</strong>：当 <span class=\"kb-math kb-math-inline\">h</span> 的 Hessian 等于 Fisher 信息矩阵时，Mirror Descent 等价于自然梯度下降</li>\n<li><strong>黎曼梯度下降</strong>：Mirror Descent 可视为在由 <span class=\"kb-math kb-math-inline\">h</span> 的 Hessian 诱导的黎曼度量下的梯度下降</li>\n<li><strong>在线镜像下降（Online Mirror Descent, OMD）</strong>：将 Mirror Descent 推广到在线凸优化设定，是分析 regret bound 的核心工具</li>\n<li><strong>对偶平均（Dual Averaging）</strong>：Nesterov (2009) 提出的变体，在对偶空间中累积梯度而非逐步更新，具有更好的稀疏性</li>\n</ul>\n<h5>实际应用场景</h5>\n<ol>\n<li><strong>在线学习与博弈论</strong>：Hedge 算法（专家问题）本质上是使用负熵的 Mirror Descent</li>\n<li><strong>组合优化</strong>：在排列、匹配等组合结构上的 Frank-Wolfe 型算法</li>\n<li><strong>分布式优化</strong>：利用问题局部几何结构加速通信</li>\n<li><strong>强化学习</strong>：策略优化中的自然策略梯度可视为 Mirror Descent 的特例</li>\n</ol>",
      "quiz": {
        "q": "在概率单纯形上，Mirror Descent 使用负熵作为距离生成函数相比标准投影梯度下降的主要优势是什么？",
        "options": [
          "计算复杂度从 O(n²) 降低到 O(n)",
          "收敛速率对维度的依赖从 O(√n) 改善为 O(√(log n))",
          "不再需要计算目标函数的梯度",
          "可以处理非凸目标函数"
        ],
        "answer": 1,
        "explain": "负熵诱导的 KL 散度使得单纯形的'有效直径'从 O(√n) 缩小为 O(√(log n))，从而将收敛速率中的维度依赖从多项式改善为对数级别。"
      }
    },
    {
      "id": "frank_wolfe",
      "num": 16,
      "name": "Frank-Wolfe",
      "fullName": "条件梯度法 (Frank-Wolfe)",
      "year": "1956",
      "org": "Princeton",
      "parent": "—",
      "paperUrl": "https://onlinelibrary.wiley.com/doi/abs/10.1002/nav.3800030109",
      "projectUrl": "",
      "category": "accelerated",
      "motivation": "线性子问题替代投影，投影无关优化",
      "summary": "Frank-Wolfe 算法（又称条件梯度法）通过在每一步迭代中求解一个线性子问题来替代传统投影操作，实现了对复杂约束集上凸优化问题的高效求解，是投影无关（projection-free）优化方法的奠基之作。",
      "keyPoints": [
        "<strong>投影无关设计</strong>：用线性最小化预言机（Linear Minimization Oracle, LMO）替代欧式投影，避免了对复杂约束集投影的高计算代价",
        "<strong>线性子问题</strong>：每步仅需求解 <span class=\"kb-math kb-math-inline\">\\min_{s \\in \\mathcal{C}} \\langle s, \\nabla f(x_t) \\rangle</span>，对许多结构化约束集（核范数球、流多面体、矩阵体等）有高效闭式解",
        "<strong>天然可行性</strong>：迭代点始终为可行点的凸组合，保证全程满足约束",
        "<strong>稀疏解特性</strong>：当约束集为多面体时，迭代解可表示为顶点的稀疏凸组合，天然产生结构化稀疏解",
        "<strong>对偶间隙证书</strong>：Frank-Wolfe 间隙 <span class=\"kb-math kb-math-inline\">g_t = \\langle \\nabla f(x_t), x_t - s_t \\rangle</span> 提供可计算的次优性上界，可作为停止准则",
        "<strong>收敛速率</strong>：对光滑凸函数达到 <span class=\"kb-math kb-math-inline\">O(1/t)</span> 的次线性收敛速率，与投影梯度法相当",
        "<strong>原始应用场景</strong>：最初为二次规划（Quadratic Programming）设计，后推广至一般凸优化"
      ],
      "detail": "<p><img alt=\"Frank-Wolfe 算法几何示意图\" src=\"https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Frank-Wolfe_algorithm_illustration.svg/400px-Frank-Wolfe_algorithm_illustration.svg.png\" />\n<em>图：Frank-Wolfe 算法的几何直觉。在当前点 <span class=\"kb-math kb-math-inline\">x_t</span> 处线性化目标函数，在约束集 <span class=\"kb-math kb-math-inline\">\\mathcal{C}</span> 上求解线性最小化得到顶点 <span class=\"kb-math kb-math-inline\">s_t</span>，然后沿 <span class=\"kb-math kb-math-inline\">s_t - x_t</span> 方向移动。迭代点始终保持在约束集内部。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># Frank-Wolfe (Conditional Gradient) Algorithm\n# 输入: 凸可微目标 f, 紧凸约束集 C, 初始点 x_0 ∈ C\n# 输出: 近似最优解 x_T\n\ndef frank_wolfe(f, grad_f, lmo, x0, T):\n    &quot;&quot;&quot;\n    f: 目标函数\n    grad_f: 梯度函数\n    lmo: 线性最小化预言机, lmo(d) = argmin_{s in C} &lt;s, d&gt;\n    x0: 初始可行点\n    T: 迭代次数\n    &quot;&quot;&quot;\n    x = x0\n    for t in range(T):\n        # Step 1: 计算当前梯度\n        g = grad_f(x)\n\n        # Step 2: 求解线性子问题 (调用 LMO)\n        s = lmo(g)  # s_t = argmin_{s in C} &lt;s, grad_f(x_t)&gt;\n\n        # Step 3: 计算 Frank-Wolfe 间隙 (可选, 用作停止准则)\n        fw_gap = g @ (x - s)\n        if fw_gap &lt; tolerance:\n            break\n\n        # Step 4: 选择步长\n        gamma = 2.0 / (t + 2)  # 经典步长: γ_t = 2/(t+2)\n        # 或使用线搜索: gamma = argmin_{γ∈[0,1]} f(x + γ(s - x))\n\n        # Step 5: 凸组合更新\n        x = x + gamma * (s - x)  # 等价于 x = (1-γ)x + γs\n\n    return x\n</code></pre>\n<h5>动机与背景</h5>\n<p>1956 年，Marguerite Frank 和 Philip Wolfe 在普林斯顿大学研究二次规划问题时，面临一个核心难题：对于线性约束下的二次目标函数最小化问题</p>\n<div class=\"kb-math kb-math-display\">\\min_{x \\in \\mathcal{C}} \\frac{1}{2} x^\\top Q x + c^\\top x, \\quad \\mathcal{C} = \\{x : Ax \\leq b, x \\geq 0\\}</div>\n<p>传统方法（如梯度投影法）需要在每一步将更新后的点投影回约束集 <span class=\"kb-math kb-math-inline\">\\mathcal{C}</span>。然而，对于多面体约束集，投影操作本身就是一个二次规划问题，计算代价与原问题相当，形成了\"用 QP 解 QP\"的循环困境。</p>\n<p>Frank 和 Wolfe 的关键洞察是：<strong>既然投影困难，何不用一个更简单的子问题来替代？</strong> 他们观察到，在当前点处对目标函数做一阶 Taylor 展开后，最小化这个线性近似在多面体上的问题就是一个<strong>线性规划（LP）</strong>——而 LP 在当时已有成熟的单纯形法可以高效求解。</p>\n<div class=\"key-point\">💡 <strong>关键</strong>：Frank-Wolfe 的核心思想是\"以线性子问题的廉价求解替代投影的昂贵计算\"，这一思想在约束集结构复杂但线性优化容易的场景中具有决定性优势。</div>\n<h5>核心机制：线性化与凸组合</h5>\n<p><strong>问题设定</strong></p>\n<p>考虑约束凸优化问题：</p>\n<div class=\"kb-math kb-math-display\">\\min_{x \\in \\mathcal{C}} f(x)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">f</span> 是凸且 <span class=\"kb-math kb-math-inline\">L</span>-光滑的（即 <span class=\"kb-math kb-math-inline\">\\nabla f</span> 是 <span class=\"kb-math kb-math-inline\">L</span>-Lipschitz 连续的），<span class=\"kb-math kb-math-inline\">\\mathcal{C}</span> 是紧凸集。</p>\n<p><strong>Step 1: 线性化目标函数</strong></p>\n<p>在当前迭代点 <span class=\"kb-math kb-math-inline\">x_t</span> 处，将 <span class=\"kb-math kb-math-inline\">f</span> 用一阶 Taylor 展开近似：</p>\n<div class=\"kb-math kb-math-display\">f(x) \\approx f(x_t) + \\langle \\nabla f(x_t), x - x_t \\rangle</div>\n<p>忽略常数项，最小化线性近似等价于求解：</p>\n<div class=\"kb-math kb-math-display\">s_t = \\arg\\min_{s \\in \\mathcal{C}} \\langle \\nabla f(x_t), s \\rangle</div>\n<p>这就是<strong>线性最小化预言机（LMO）</strong>。对于不同的约束集，LMO 有不同的高效实现：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>约束集 <span class=\"kb-math kb-math-inline\">\\mathcal{C}</span></th>\n<th>LMO 求解方式</th>\n<th>复杂度</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>单纯形 <span class=\"kb-math kb-math-inline\">\\Delta_n</span></td>\n<td>选梯度最小分量的标准基向量</td>\n<td><span class=\"kb-math kb-math-inline\">O(n)</span></td>\n</tr>\n<tr>\n<td><span class=\"kb-math kb-math-inline\">\\ell_1</span> 球</td>\n<td>选绝对值最大梯度分量的符号向量</td>\n<td><span class=\"kb-math kb-math-inline\">O(n)</span></td>\n</tr>\n<tr>\n<td>核范数球</td>\n<td>计算梯度矩阵的最大奇异向量对</td>\n<td><span class=\"kb-math kb-math-inline\">O(mn \\min(m,n))</span> 或更快</td>\n</tr>\n<tr>\n<td>多面体</td>\n<td>线性规划（单纯形法）</td>\n<td>多项式时间</td>\n</tr>\n<tr>\n<td>流多面体</td>\n<td>最短路径算法</td>\n<td><span class=\"kb-math kb-math-inline\">O(V + E)</span></td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>Step 2: 凸组合更新</strong></p>\n<p>得到 LMO 解 <span class=\"kb-math kb-math-inline\">s_t</span> 后，新迭代点通过凸组合生成：</p>\n<div class=\"kb-math kb-math-display\">x_{t+1} = (1 - \\gamma_t) x_t + \\gamma_t s_t</div>\n<p>其中步长 <span class=\"kb-math kb-math-inline\">\\gamma_t \\in [0, 1]</span>。由于 <span class=\"kb-math kb-math-inline\">x_t \\in \\mathcal{C}</span> 且 <span class=\"kb-math kb-math-inline\">s_t \\in \\mathcal{C}</span>，凸组合保证 <span class=\"kb-math kb-math-inline\">x_{t+1} \\in \\mathcal{C}</span>——<strong>无需任何投影操作</strong>。</p>\n<div class=\"key-point\">💡 <strong>关键</strong>：凸组合更新是 Frank-Wolfe 保持可行性的根本机制。这与投影梯度法\"先走出约束集再投影回来\"的策略形成鲜明对比。</div>\n<p><strong>Step 3: 步长选择</strong></p>\n<p>经典步长策略为：</p>\n<div class=\"kb-math kb-math-display\">\\gamma_t = \\frac{2}{t + 2}, \\quad t = 0, 1, 2, \\ldots</div>\n<p>这一递减步长保证了 <span class=\"kb-math kb-math-inline\">O(1/t)</span> 的收敛速率。也可使用精确线搜索：</p>\n<div class=\"kb-math kb-math-display\">\\gamma_t = \\arg\\min_{\\gamma \\in [0,1]} f(x_t + \\gamma(s_t - x_t))</div>\n<p>线搜索通常能加速实际收敛，但增加了每步的计算量。</p>\n<h5>收敛性分析</h5>\n<p><strong>定理（Frank-Wolfe 收敛速率）</strong>：设 <span class=\"kb-math kb-math-inline\">f</span> 是凸且 <span class=\"kb-math kb-math-inline\">L</span>-光滑的，<span class=\"kb-math kb-math-inline\">\\mathcal{C}</span> 是紧凸集，直径为 <span class=\"kb-math kb-math-inline\">D = \\max_{x,y \\in \\mathcal{C}} \\|x - y\\|</span>。使用步长 <span class=\"kb-math kb-math-inline\">\\gamma_t = 2/(t+2)</span>，Frank-Wolfe 算法满足：</p>\n<div class=\"kb-math kb-math-display\">f(x_t) - f(x^*) \\leq \\frac{2LD^2}{t + 2}</div>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：<span class=\"kb-math kb-math-inline\">O(1/t)</span> 的收敛速率是次线性的，慢于投影梯度法在强凸函数上的线性收敛。这是 Frank-Wolfe 为\"投影无关\"付出的代价。然而在许多实际场景中，LMO 的低计算代价使得 Frank-Wolfe 的<strong>每单位时间进展</strong>反而更快。</div>\n<p><strong>Frank-Wolfe 对偶间隙</strong></p>\n<p>定义 Frank-Wolfe 间隙：</p>\n<div class=\"kb-math kb-math-display\">g_t = \\max_{s \\in \\mathcal{C}} \\langle \\nabla f(x_t), x_t - s \\rangle = \\langle \\nabla f(x_t), x_t - s_t \\rangle</div>\n<p>由凸性可知 <span class=\"kb-math kb-math-inline\">g_t \\geq f(x_t) - f(x^*)</span>，因此 <span class=\"kb-math kb-math-inline\">g_t</span> 是次优性的可计算上界，可直接用作停止准则——这是 Frank-Wolfe 相比投影梯度法的一个实用优势。</p>\n<h5>稀疏性与结构化解</h5>\n<p>Frank-Wolfe 算法的一个独特优势是其迭代解的<strong>稀疏表示</strong>。由于每步更新都是当前点与约束集顶点的凸组合：</p>\n<div class=\"kb-math kb-math-display\">x_t = \\sum_{i=0}^{t} \\alpha_i s_i, \\quad \\alpha_i \\geq 0, \\sum_i \\alpha_i = 1</div>\n<p>当 <span class=\"kb-math kb-math-inline\">\\mathcal{C}</span> 是多面体时，<span class=\"kb-math kb-math-inline\">s_i</span> 都是顶点。因此经过 <span class=\"kb-math kb-math-inline\">t</span> 步迭代后，<span class=\"kb-math kb-math-inline\">x_t</span> 最多是 <span class=\"kb-math kb-math-inline\">t+1</span> 个顶点的凸组合。这种稀疏结构在以下场景中极为有用：</p>\n<ul>\n<li><strong>稀疏学习</strong>：<span class=\"kb-math kb-math-inline\">\\ell_1</span> 约束下自动产生稀疏解</li>\n<li><strong>低秩矩阵恢复</strong>：核范数约束下产生低秩解</li>\n<li><strong>组合优化松弛</strong>：解自然接近整数顶点</li>\n</ul>\n<h5>与投影梯度法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>Frank-Wolfe</th>\n<th>投影梯度下降</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>每步子问题</td>\n<td>线性最小化（LMO）</td>\n<td>欧式投影</td>\n</tr>\n<tr>\n<td>可行性保持</td>\n<td>天然保持（凸组合）</td>\n<td>需显式投影</td>\n</tr>\n<tr>\n<td>解的结构</td>\n<td>稀疏（顶点组合）</td>\n<td>一般无结构保证</td>\n</tr>\n<tr>\n<td>收敛速率（凸）</td>\n<td><span class=\"kb-math kb-math-inline\">O(1/t)</span></td>\n<td><span class=\"kb-math kb-math-inline\">O(1/t)</span></td>\n</tr>\n<tr>\n<td>收敛速率（强凸）</td>\n<td><span class=\"kb-math kb-math-inline\">O(1/t)</span></td>\n<td><span class=\"kb-math kb-math-inline\">O(\\rho^t)</span> 线性</td>\n</tr>\n<tr>\n<td>适用场景</td>\n<td>投影昂贵、LMO 廉价</td>\n<td>投影廉价（如 <span class=\"kb-math kb-math-inline\">\\ell_2</span> 球）</td>\n</tr>\n<tr>\n<td>次优性证书</td>\n<td>FW 间隙（免费获得）</td>\n<td>需额外计算</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 <strong>关键</strong>：Frank-Wolfe 的优势在约束集结构复杂时最为显著。当投影操作本身就很廉价（如投影到 <span class=\"kb-math kb-math-inline\">\\ell_2</span> 球只需归一化）时，投影梯度法通常更优。</div>\n<h5>现代发展与变体</h5>\n<p>Frank-Wolfe 算法在 2013 年由 Jaggi 重新引入机器学习社区后焕发新生，催生了大量变体：</p>\n<ul>\n<li><strong>Away-step Frank-Wolfe</strong>：通过\"远离步\"加速收敛，强凸情况下可达线性收敛</li>\n<li><strong>Pairwise Frank-Wolfe</strong>：在活跃顶点间重新分配权重，进一步改善收敛</li>\n<li><strong>Stochastic Frank-Wolfe</strong>：使用随机梯度估计，适用于大规模机器学习</li>\n<li><strong>Block-coordinate Frank-Wolfe</strong>：分块更新，适用于结构化高维问题</li>\n</ul>",
      "quiz": {
        "q": "Frank-Wolfe 算法相比投影梯度下降法的核心优势是什么？",
        "options": [
          "在强凸函数上具有更快的线性收敛速率",
          "每步仅需求解线性子问题，避免了对复杂约束集的投影计算",
          "不需要计算目标函数的梯度",
          "能保证找到非凸问题的全局最优解"
        ],
        "answer": 1,
        "explain": "Frank-Wolfe 的核心创新是用线性最小化预言机（LMO）替代投影操作。对于核范数球、流多面体等复杂约束集，投影代价极高而线性优化高效，此时 FW 具有决定性优势。"
      }
    },
    {
      "id": "natural_gradient",
      "num": 17,
      "name": "Natural Gradient",
      "fullName": "自然梯度 (Natural Gradient)",
      "year": "1998",
      "org": "RIKEN",
      "parent": "newton",
      "paperUrl": "https://doi.org/10.1162/089976698300017746",
      "projectUrl": "",
      "category": "accelerated",
      "motivation": "Fisher信息矩阵度量参数空间黎曼几何",
      "summary": "自然梯度方法利用 Fisher 信息矩阵作为参数空间的黎曼度量，将普通梯度转化为参数流形上的最速下降方向，实现了参数化不变的高效学习，是连接信息几何与神经网络优化的奠基性工作。",
      "keyPoints": [
        "核心洞察：神经网络的参数空间不是欧氏空间，而是具有黎曼几何结构的统计流形",
        "Fisher 信息矩阵 <span class=\"kb-math kb-math-inline\">G(\\theta)</span> 定义了参数空间的自然度量（对应 KL 散度的局部二阶近似）",
        "自然梯度公式：<span class=\"kb-math kb-math-inline\">\\tilde{\\nabla} L(\\theta) = G(\\theta)^{-1} \\nabla L(\\theta)</span>",
        "参数化不变性：自然梯度的更新方向不随参数的重新参数化而改变",
        "渐近有效性：自然梯度下降在在线学习中达到 Cramér-Rao 下界，即 Fisher 有效",
        "与牛顿法的关系：当损失函数为负对数似然时，Fisher 信息矩阵是 Hessian 的期望，自然梯度近似于 Gauss-Newton 方法",
        "应用验证：盲源分离（BSS）和多层感知器训练中展示显著加速效果"
      ],
      "detail": "<p><img alt=\"Fisher信息矩阵与参数空间几何示意\" src=\"https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Fisher_information_metric.svg/400px-Fisher_information_metric.svg.png\" />\n<em>图：在统计流形上，Fisher 信息矩阵定义了局部度量。欧氏距离（虚线）与 KL 散度诱导的测地距离（实线）在弯曲空间中显著不同，自然梯度沿后者的最速下降方向更新。</em></p>\n<pre><code class=\"language-python\"># Natural Gradient Descent 伪代码\nimport numpy as np\n\ndef natural_gradient_descent(loss_fn, grad_fn, fisher_fn, theta0, lr=0.1, max_iter=1000):\n    &quot;&quot;&quot;\n    loss_fn: 损失函数 L(θ)\n    grad_fn: 普通梯度 ∇L(θ) → R^d\n    fisher_fn: Fisher信息矩阵 G(θ) → R^{d×d}\n    theta0: 初始参数\n    lr: 学习率\n    &quot;&quot;&quot;\n    theta = theta0\n    for t in range(max_iter):\n        g = grad_fn(theta)              # 计算欧氏梯度\n        G = fisher_fn(theta)            # 计算Fisher信息矩阵\n\n        # 求解自然梯度: G @ nat_grad = g\n        nat_grad = np.linalg.solve(G, g)  # 自然梯度 = G^{-1} g\n\n        theta = theta - lr * nat_grad    # 沿自然梯度方向更新\n    return theta\n\n# Fisher信息矩阵的经验估计（常用方法）\ndef empirical_fisher(model, data, theta):\n    &quot;&quot;&quot;用采样梯度的外积估计Fisher矩阵&quot;&quot;&quot;\n    grads = []\n    for x in data:\n        g = compute_grad_log_likelihood(model, x, theta)\n        grads.append(g)\n    grads = np.array(grads)  # (N, d)\n    G = grads.T @ grads / len(data)  # E[∇logp · (∇logp)^T]\n    return G + 1e-4 * np.eye(len(theta))  # 正则化保证正定\n</code></pre>\n<p><strong>动机与背景</strong></p>\n<p>在传统的梯度下降中，参数更新方向为 <span class=\"kb-math kb-math-inline\">-\\alpha \\nabla L(\\theta)</span>，这隐含假设参数空间是欧氏空间——即参数的微小变化 <span class=\"kb-math kb-math-inline\">d\\theta</span> 对应的\"距离\"由欧氏范数 <span class=\"kb-math kb-math-inline\">\\|d\\theta\\|^2 = d\\theta^\\top d\\theta</span> 度量。然而，对于概率模型（包括神经网络），参数空间具有本质的<strong>弯曲结构</strong>：</p>\n<ul>\n<li>参数的不同分量对模型输出的影响程度不同</li>\n<li>同样大小的参数变化 <span class=\"kb-math kb-math-inline\">\\|d\\theta\\|</span>，在参数空间的不同位置可能导致截然不同的分布变化</li>\n<li>模型的重新参数化（如将 <span class=\"kb-math kb-math-inline\">\\sigma</span> 换为 <span class=\"kb-math kb-math-inline\">\\log\\sigma</span>）会改变普通梯度的方向</li>\n</ul>\n<p>Amari 在 1998 年的这篇开创性论文中指出：参数空间的正确度量应由 <strong>Fisher 信息矩阵</strong>给出，它刻画了参数微小变化引起的概率分布变化的\"真实距离\"。</p>\n<p><strong>核心机制：从欧氏梯度到自然梯度</strong></p>\n<p>设统计模型的参数化概率分布为 <span class=\"kb-math kb-math-inline\">p(x|\\theta)</span>，Fisher 信息矩阵定义为：</p>\n<div class=\"kb-math kb-math-display\">G(\\theta) = \\mathbb{E}_{x \\sim p(x|\\theta)} \\left[ \\nabla_\\theta \\log p(x|\\theta) \\cdot \\nabla_\\theta \\log p(x|\\theta)^\\top \\right]</div>\n<p>等价地：</p>\n<div class=\"kb-math kb-math-display\">G(\\theta) = -\\mathbb{E}_{x \\sim p(x|\\theta)} \\left[ \\nabla^2_\\theta \\log p(x|\\theta) \\right]</div>\n<p>Fisher 信息矩阵的关键性质是：它恰好等于 KL 散度在 <span class=\"kb-math kb-math-inline\">\\theta</span> 处的 Hessian：</p>\n<div class=\"kb-math kb-math-display\">D_{KL}(p_\\theta \\| p_{\\theta + d\\theta}) \\approx \\frac{1}{2} d\\theta^\\top G(\\theta) \\, d\\theta</div>\n<p>这意味着 <span class=\"kb-math kb-math-inline\">G(\\theta)</span> 定义了参数空间上的<strong>黎曼度量</strong>，使得参数空间成为一个黎曼流形（统计流形）。</p>\n<p>在此度量下，<strong>最速下降方向</strong>不再是普通梯度 <span class=\"kb-math kb-math-inline\">\\nabla L</span>，而是自然梯度：</p>\n<div class=\"kb-math kb-math-display\">\\tilde{\\nabla} L(\\theta) = G(\\theta)^{-1} \\nabla L(\\theta)</div>\n<p>推导过程：在黎曼流形上，最速下降方向是在约束 <span class=\"kb-math kb-math-inline\">d\\theta^\\top G(\\theta) \\, d\\theta = \\epsilon^2</span> 下使 <span class=\"kb-math kb-math-inline\">dL = \\nabla L^\\top d\\theta</span> 最小的方向。通过 Lagrange 乘子法可得上式。</p>\n<div class=\"key-point\">💡 关键直觉：普通梯度告诉你\"在欧氏空间中哪个方向下降最快\"，而自然梯度告诉你\"在保持模型输出分布变化量恒定的约束下，哪个方向下降最快\"。后者才是学习的真正目标——我们关心的是模型行为的变化，而非参数数值的变化。</div>\n<p><strong>参数化不变性</strong></p>\n<p>自然梯度的一个核心优势是<strong>参数化不变性</strong>（reparameterization invariance）。设 <span class=\"kb-math kb-math-inline\">\\theta = f(\\phi)</span> 是一个可逆的参数变换，则：</p>\n<ul>\n<li>普通梯度在新参数下变为 <span class=\"kb-math kb-math-inline\">\\nabla_\\phi L = J^\\top \\nabla_\\theta L</span>（其中 <span class=\"kb-math kb-math-inline\">J = \\partial\\theta/\\partial\\phi</span>），方向会改变</li>\n<li>自然梯度在新参数下保持等价：<span class=\"kb-math kb-math-inline\">G_\\phi^{-1} \\nabla_\\phi L</span> 对应的更新与原参数空间中 <span class=\"kb-math kb-math-inline\">G_\\theta^{-1} \\nabla_\\theta L</span> 的更新产生相同的模型变化</li>\n</ul>\n<p>这意味着自然梯度的学习效率不依赖于参数的具体表示方式，而普通梯度下降的性能则强烈依赖参数化选择。</p>\n<p><strong>渐近有效性与 Cramér-Rao 界</strong></p>\n<p>Amari 证明了自然梯度在在线学习（online learning）设置中具有<strong>渐近有效性</strong>：当样本量趋于无穷时，自然梯度估计的参数协方差矩阵达到 Cramér-Rao 下界 <span class=\"kb-math kb-math-inline\">G(\\theta^*)^{-1}/n</span>。这是统计估计理论中的最优性——没有任何无偏估计器能比这更精确。</p>\n<p>相比之下，普通梯度下降的渐近协方差通常大于 Cramér-Rao 界，除非 Fisher 信息矩阵恰好是单位矩阵的倍数。</p>\n<p><strong>与牛顿法和 Gauss-Newton 的关系</strong></p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>普通梯度下降</th>\n<th>牛顿法</th>\n<th>自然梯度</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>使用的矩阵</td>\n<td><span class=\"kb-math kb-math-inline\">I</span>（单位矩阵）</td>\n<td><span class=\"kb-math kb-math-inline\">H = \\nabla^2 L</span>（Hessian）</td>\n<td><span class=\"kb-math kb-math-inline\">G = \\mathbb{E}[\\nabla\\log p \\cdot \\nabla\\log p^\\top]</span>（Fisher）</td>\n</tr>\n<tr>\n<td>几何解释</td>\n<td>欧氏最速下降</td>\n<td>二阶泰勒近似极值</td>\n<td>黎曼最速下降</td>\n</tr>\n<tr>\n<td>正定性</td>\n<td>总是正定</td>\n<td>不保证正定</td>\n<td>总是半正定</td>\n</tr>\n<tr>\n<td>计算代价</td>\n<td><span class=\"kb-math kb-math-inline\">O(d)</span></td>\n<td><span class=\"kb-math kb-math-inline\">O(d^3)</span></td>\n<td><span class=\"kb-math kb-math-inline\">O(d^3)</span>（或近似）</td>\n</tr>\n<tr>\n<td>参数化不变</td>\n<td>❌</td>\n<td>✅</td>\n<td>✅</td>\n</tr>\n</tbody>\n</table></div>\n<p>当损失函数为负对数似然 <span class=\"kb-math kb-math-inline\">L(\\theta) = -\\frac{1}{n}\\sum_i \\log p(x_i|\\theta)</span> 时：\n- Hessian 的期望恰好等于 Fisher 信息矩阵：<span class=\"kb-math kb-math-inline\">\\mathbb{E}[H] = G</span>\n- 因此自然梯度可视为 Gauss-Newton 方法的推广\n- 但 Fisher 矩阵始终半正定（作为外积的期望），而 Hessian 可能不定</p>\n<div class=\"warn-box\">⚠️ 注意：自然梯度与牛顿法的关键区别在于——Fisher 矩阵是<strong>与数据无关的期望量</strong>（仅依赖模型和当前参数），而 Hessian 依赖于具体的损失函数值。这使得 Fisher 矩阵更稳定，且始终保证正半定性。</div>\n<p><strong>实际计算与近似方法</strong></p>\n<p>精确计算和求逆 <span class=\"kb-math kb-math-inline\">d \\times d</span> 的 Fisher 矩阵需要 <span class=\"kb-math kb-math-inline\">O(d^2)</span> 存储和 <span class=\"kb-math kb-math-inline\">O(d^3)</span> 计算，对于现代深度网络不可行。论文之后的发展提出了多种近似：</p>\n<ol>\n<li><strong>对角近似</strong>：仅保留 Fisher 矩阵的对角元素，退化为自适应学习率（类似 AdaGrad 的思想）</li>\n<li><strong>块对角近似</strong>：按层分块计算 Fisher 矩阵（如 KFAC 方法）</li>\n<li><strong>低秩近似</strong>：用少量采样梯度的外积近似 Fisher 矩阵</li>\n<li><strong>共轭梯度求解</strong>：不显式构造 Fisher 矩阵，通过 Fisher-向量积迭代求解</li>\n</ol>\n<p><strong>在盲源分离中的应用</strong></p>\n<p>论文的一个重要贡献是将自然梯度应用于<strong>盲源分离</strong>（Blind Source Separation, BSS）。在 BSS 中，分离矩阵 <span class=\"kb-math kb-math-inline\">W</span> 的参数空间是 Lie 群 <span class=\"kb-math kb-math-inline\">GL(n)</span>，其自然度量导出的更新规则为：</p>\n<div class=\"kb-math kb-math-display\">\\Delta W \\propto \\left[ I - \\varphi(y)y^\\top \\right] W</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">y = Wx</span> 是分离后的信号，<span class=\"kb-math kb-math-inline\">\\varphi</span> 是非线性函数。这个乘法更新规则（右乘 <span class=\"kb-math kb-math-inline\">W</span>）正是自然梯度的体现，它比加法更新 <span class=\"kb-math kb-math-inline\">\\Delta W \\propto \\left[ I - \\varphi(y)y^\\top \\right]</span> 收敛快得多，且具有等变性。</p>\n<p><strong>后续影响</strong></p>\n<p>自然梯度的思想深刻影响了后续优化算法的发展：\n- <strong>TRPO/PPO</strong>：信赖域策略优化中的 KL 散度约束本质上是自然梯度的信赖域版本\n- <strong>KFAC</strong>：Kronecker 分解近似 Fisher 矩阵，使自然梯度在深度网络中可行\n- <strong>Adam/AdaGrad</strong>：对角 Fisher 近似的简化版本\n- <strong>弹性权重巩固（EWC）</strong>：用 Fisher 信息矩阵度量参数重要性，防止灾难性遗忘</p>",
      "quiz": {
        "q": "自然梯度相比普通梯度的核心区别是什么？",
        "options": [
          "使用动量加速收敛",
          "用Fisher信息矩阵度量参数空间的黎曼几何结构，获得参数化不变的最速下降方向",
          "通过二阶泰勒展开直接求解极值点",
          "使用随机采样降低梯度方差"
        ],
        "answer": 1,
        "explain": "自然梯度的核心创新在于认识到参数空间是黎曼流形而非欧氏空间，用Fisher信息矩阵作为度量张量，将普通梯度变换为流形上的最速下降方向，从而获得参数化不变性和渐近有效性。"
      }
    },
    {
      "id": "muon",
      "num": 18,
      "name": "Muon",
      "fullName": "矩阵正交化动量优化器 (Muon)",
      "year": "2025",
      "org": "Moonshot AI",
      "parent": "natural_gradient",
      "paperUrl": "https://arxiv.org/abs/2502.16982",
      "projectUrl": "",
      "category": "frontier",
      "motivation": "Newton-Schulz正交化动量，半数算力达同等性能",
      "summary": "Muon 将梯度动量通过 Newton-Schulz 迭代正交化后作为更新方向，实现矩阵参数的谱范数（Schatten-∞）最速下降；论文进一步提出 weight decay 与 per-parameter update RMS scaling 两项关键改进，使 Muon 首次成功扩展到 16B 参数 MoE 模型（Moonlight），在相同性能下仅需 AdamW 约 52% 的训练计算量。",
      "keyPoints": [
        "<strong>Newton-Schulz 正交化</strong>：对梯度动量矩阵执行 5 步 Newton-Schulz 迭代，近似计算矩阵极分解（polar decomposition）的正交因子，作为更新方向",
        "<strong>Weight Decay</strong>：为 Muon 引入解耦 weight decay（类似 AdamW），解决大规模训练中权重发散问题",
        "<strong>Per-Parameter Update RMS Scaling</strong>：通过乘以 <span class=\"kb-math kb-math-inline\">0.2 \\cdot \\sqrt{\\max(A, B)}</span> 使 Muon 各参数的 update RMS 与 AdamW 匹配，消除矩阵维度不对称带来的更新幅度差异",
        "<strong>分布式 Muon（Distributed Muon）</strong>：采用 ZeRO-1 风格分片 + DP all-gather 全矩阵，在保持通信效率的同时完成全矩阵 Newton-Schulz 迭代",
        "<strong>Scaling Law 验证</strong>：在 399M–1.5B 模型上拟合 scaling law，证明 Muon 仅需 ~52% FLOPs 即可匹配 AdamW 的 compute-optimal 性能",
        "<strong>Moonlight 模型</strong>：3B 激活 / 16B 总参数的 DeepSeek-V3-Small 架构 MoE 模型，使用 5.7T tokens 训练，在多项基准上超越同规模 AdamW 基线"
      ],
      "detail": "<p><img alt=\"Muon Scaling Law\" src=\"https://arxiv.org/html/2502.16982v1/x1.png\" />\n<em>图：Muon 与 AdamW 的 Scaling Law 对比。Muon 仅需约 52% 的训练 FLOPs 即可达到 AdamW 同等验证损失。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># Muon Optimizer (Scalable Version)\n# 输入: 参数 W (shape A×B), 学习率 η, 动量系数 μ=0.95, weight decay λ\n# Newton-Schulz 系数: a=3.4445, b=-4.7750, c=2.0315\n\ndef muon_step(W, grad, momentum_buffer, η, μ=0.95, λ=0.1):\n    # 1. 更新动量\n    momentum_buffer = μ * momentum_buffer + grad  # EMA of gradients\n    G = momentum_buffer\n\n    # 2. Newton-Schulz 正交化 (5 iterations)\n    # 先对 G 做谱范数归一化\n    G = G / spectral_norm(G)\n    X = G\n    for _ in range(5):\n        X = a * X + b * (X @ X.T) @ X + c * (X @ X.T @ X @ X.T) @ X\n    O = X  # 正交化后的更新方向\n\n    # 3. Per-parameter scaling + weight decay\n    scale = 0.2 * sqrt(max(A, B))\n    W = W - η * (scale * O + λ * W)\n\n    return W, momentum_buffer\n</code></pre>\n<h5>动机与背景</h5>\n<p>传统 AdamW 优化器对每个参数元素独立地进行自适应学习率调整，本质上是逐元素的 <span class=\"kb-math kb-math-inline\">\\ell_\\infty</span> 最速下降。然而对于矩阵形状的权重参数（如 Transformer 中的线性层），更自然的优化视角是在<strong>矩阵空间</strong>中进行最速下降。</p>\n<p>Muon（<strong>Mu</strong>-<strong>O</strong>rthogonalized <strong>N</strong>esterov）的核心思想是：在 Schatten-∞ 范数（即谱范数）约束下做最速下降，其最优更新方向恰好是梯度矩阵的<strong>正交因子</strong>（polar decomposition 中的酉矩阵部分）。这等价于对梯度做矩阵符号函数（matrix sign function）运算。</p>\n<div class=\"key-point\">💡 关键：AdamW 是逐元素的 <span class=\"kb-math kb-math-inline\">\\ell_\\infty</span> steepest descent，Muon 是矩阵级别的 Schatten-∞ steepest descent。两者是同一思想在不同范数下的推广。</div>\n<h5>核心机制：Newton-Schulz 正交化</h5>\n<p>给定动量矩阵 <span class=\"kb-math kb-math-inline\">\\mathbf{G} \\in \\mathbb{R}^{A \\times B}</span>，Muon 通过以下步骤计算正交化更新：</p>\n<p><strong>Step 1: 动量累积</strong></p>\n<div class=\"kb-math kb-math-display\">\\mathbf{G}_t = \\mu \\cdot \\mathbf{G}_{t-1} + \\nabla_{\\mathbf{W}} \\mathcal{L}(\\mathbf{W}_{t-1})</div>\n<p><strong>Step 2: 谱范数归一化</strong></p>\n<div class=\"kb-math kb-math-display\">\\mathbf{X}_0 = \\mathbf{G}_t / \\|\\mathbf{G}_t\\|_2</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\|\\cdot\\|_2</span> 为谱范数（最大奇异值）。</p>\n<p><strong>Step 3: Newton-Schulz 迭代（5 步）</strong></p>\n<div class=\"kb-math kb-math-display\">\\mathbf{X}_{k+1} = a \\mathbf{X}_k + b (\\mathbf{X}_k \\mathbf{X}_k^\\top) \\mathbf{X}_k + c (\\mathbf{X}_k \\mathbf{X}_k^\\top)^2 \\mathbf{X}_k</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">a = 3.4445,\\ b = -4.7750,\\ c = 2.0315</span>。经过 5 次迭代后 <span class=\"kb-math kb-math-inline\">\\mathbf{X}_5 \\approx \\mathbf{O}_t</span>，即 <span class=\"kb-math kb-math-inline\">\\mathbf{G}_t</span> 极分解的正交因子。</p>\n<div class=\"warn-box\">⚠️ 注意：Newton-Schulz 迭代要求输入矩阵的谱范数严格小于 1 才能收敛，因此 Step 2 的归一化是必要的。系数 <span class=\"kb-math kb-math-inline\">(a, b, c)</span> 经过优化使得在 5 步内即可达到足够精度。</div>\n<p><strong>Step 4: 参数更新</strong></p>\n<div class=\"kb-math kb-math-display\">\\mathbf{W}_t = \\mathbf{W}_{t-1} - \\eta_t \\left( 0.2 \\cdot \\mathbf{O}_t \\cdot \\sqrt{\\max(A, B)} + \\lambda \\mathbf{W}_{t-1} \\right)</div>\n<h5>Per-Parameter Update RMS Scaling 的设计动机</h5>\n<p>原始 Muon 的正交化输出 <span class=\"kb-math kb-math-inline\">\\mathbf{O}_t</span> 满足 <span class=\"kb-math kb-math-inline\">\\text{RMS}(\\mathbf{O}_t) = 1/\\sqrt{\\min(A,B)}</span>，这意味着不同形状矩阵的 update RMS 不一致。例如对于 <span class=\"kb-math kb-math-inline\">[H, 4H]</span> 的 MLP 权重和 <span class=\"kb-math kb-math-inline\">[H, H]</span> 的 attention 权重，前者的 update RMS 会偏小。</p>\n<p>论文提出两种修正方案并最终选择 <strong>Adjusted LR</strong> 方法：将更新乘以 <span class=\"kb-math kb-math-inline\">\\sqrt{\\max(A,B)}</span>，使得所有参数的 update RMS 统一为 <span class=\"kb-math kb-math-inline\">\\sqrt{\\max(A,B)/\\min(A,B)} / \\sqrt{\\min(A,B)} = 1/\\sqrt{\\min(A,B)} \\cdot \\sqrt{\\max(A,B)}</span>。再乘以常数 0.2 使其与 AdamW 的典型 update RMS 匹配。</p>\n<p>这一设计使得 Muon 可以<strong>直接复用 AdamW 的最优超参数</strong>（学习率、batch size 等），大幅降低调参成本。</p>\n<h5>分布式 Muon 实现</h5>\n<p>Newton-Schulz 迭代需要对<strong>完整矩阵</strong>进行运算（涉及 <span class=\"kb-math kb-math-inline\">\\mathbf{X}\\mathbf{X}^\\top</span> 等全矩阵乘法），这与 ZeRO 的参数分片策略冲突。论文提出的解决方案：</p>\n<ol>\n<li><strong>ZeRO-1 分片</strong>：每个 DP rank 只存储部分参数的优化器状态（动量 buffer）</li>\n<li><strong>All-Gather 全矩阵</strong>：在执行 NS 迭代前，通过 all-gather 收集完整的动量矩阵</li>\n<li><strong>本地 NS 迭代</strong>：每个 rank 独立执行相同的 NS 迭代（确定性运算，结果一致）</li>\n<li><strong>切片更新</strong>：NS 迭代后，每个 rank 只保留自己负责的参数切片进行更新</li>\n</ol>\n<div class=\"key-point\">💡 关键：NS 迭代的通信开销与 ZeRO-1 的参数 all-gather 重叠，不引入额外通信瓶颈。</div>\n<h5>与 AdamW 的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th>AdamW</th>\n<th>Muon</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>更新方向</td>\n<td>逐元素自适应（一阶+二阶矩）</td>\n<td>矩阵正交化（极分解）</td>\n</tr>\n<tr>\n<td>范数约束</td>\n<td><span class=\"kb-math kb-math-inline\">\\ell_\\infty</span> steepest descent</td>\n<td>Schatten-∞ steepest descent</td>\n</tr>\n<tr>\n<td>优化器状态</td>\n<td>2× 参数量（m, v）</td>\n<td>1× 参数量（仅动量）</td>\n</tr>\n<tr>\n<td>计算开销</td>\n<td>逐元素运算</td>\n<td>矩阵乘法（NS 迭代）</td>\n</tr>\n<tr>\n<td>适用参数</td>\n<td>所有参数</td>\n<td>仅 ≥2D 矩阵参数（embedding/head 仍用 AdamW）</td>\n</tr>\n<tr>\n<td>计算效率</td>\n<td>基线</td>\n<td>~2× (52% FLOPs 达同等性能)</td>\n</tr>\n</tbody>\n</table></div>\n<h5>Scaling Law 结果</h5>\n<p>论文在 399M 到 1.5B 参数的 Llama 架构模型上拟合 scaling law：</p>\n<div class=\"kb-math kb-math-display\">\\text{Muon: } L = 2.506 \\times C^{-0.052}</div>\n<div class=\"kb-math kb-math-display\">\\text{AdamW: } L = 2.608 \\times C^{-0.054}</div>\n<p>Muon 的曲线在各计算预算下均低于 AdamW，且在相同 loss 目标下仅需约 52% 的 FLOPs。</p>",
      "quiz": {
        "q": "Muon 优化器中 Newton-Schulz 迭代的主要作用是什么？",
        "options": [
          "计算梯度的二阶矩估计，实现自适应学习率",
          "近似计算梯度动量矩阵的极分解正交因子，作为最速下降方向",
          "对梯度进行低秩近似，减少通信开销",
          "实现梯度裁剪，防止梯度爆炸"
        ],
        "answer": 1,
        "explain": "Newton-Schulz 迭代用于近似矩阵极分解（polar decomposition），提取动量矩阵的正交因子，该正交因子是 Schatten-∞ 范数下的最速下降方向。"
      }
    },
    {
      "id": "graal",
      "num": 19,
      "name": "GRAAL",
      "fullName": "最优自适应梯度法 (GRAAL)",
      "year": "2026",
      "org": "Yandex Research",
      "parent": "nag",
      "paperUrl": "https://arxiv.org/abs/2502.04153",
      "projectUrl": "",
      "category": "frontier",
      "motivation": "首个加速无参数梯度法，自适应局部曲率",
      "summary": "GRAAL 的核心目标是：首个加速无参数梯度法，自适应局部曲率。",
      "keyPoints": [
        "核心动机：首个加速无参数梯度法，自适应局部曲率",
        "演化来源：继承或改进自 nag",
        "代表机构：Yandex Research"
      ],
      "detail": "<p>首个加速无参数梯度法，自适应局部曲率</p>"
    },
    {
      "id": "alias",
      "num": 20,
      "name": "ALIAS",
      "fullName": "无参数符号随机梯度 (ALIAS)",
      "year": "2026",
      "org": "Yandex Research",
      "parent": "adam",
      "paperUrl": "https://arxiv.org/abs/2502.12989",
      "projectUrl": "",
      "category": "frontier",
      "motivation": "Sign-SGD无参数化，匹配精调AdamW",
      "summary": "ALIAS 的核心目标是：Sign-SGD无参数化，匹配精调AdamW。",
      "keyPoints": [
        "核心动机：Sign-SGD无参数化，匹配精调AdamW",
        "演化来源：继承或改进自 adam",
        "代表机构：Yandex Research"
      ],
      "detail": "<p>Sign-SGD无参数化，匹配精调AdamW</p>"
    }
  ],
  "categories": {
    "convex": {
      "label": "凸优化基础",
      "color": "#22a06b"
    },
    "stochastic": {
      "label": "随机梯度方法",
      "color": "#5b63d3"
    },
    "adaptive": {
      "label": "自适应优化器",
      "color": "#e8820c"
    },
    "accelerated": {
      "label": "加速与几何方法",
      "color": "#0065ff"
    },
    "frontier": {
      "label": "2026前沿",
      "color": "#d32d9a"
    }
  },
  "projectUrls": {}
};
