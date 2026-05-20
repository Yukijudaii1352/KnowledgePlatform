/**
 * trustworthy_learning-data.js — 由 pipeline/build.py 于 2026-05-20 17:14:14 自动生成。
 * 源文件：content/ml/trustworthy_learning.md
 * ⚠️  请勿手动修改；如需更新，修改源文档后重新编译。
 */
window.PAGE_CONFIG = {
  "meta": {
    "domain": "ml",
    "topic_id": "trustworthy_learning",
    "topic_name": "可信机器学习技术演进图谱",
    "page_title": "可信机器学习技术演进图谱",
    "page_subtitle": "2026-05-20 版",
    "page_desc": "涵盖鲁棒性、公平性、可解释性与隐私保护四大维度的经典算法与2026年最新进展",
    "page_icon": "🛡️",
    "hero_pills": [
      "🏷️ Robustness · Fairness · Interpretability · Privacy"
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
        "id": "fgsm",
        "x": 0,
        "y": 0,
        "category": "robustness"
      },
      {
        "id": "pgd",
        "x": 0,
        "y": 0,
        "category": "robustness"
      },
      {
        "id": "trades",
        "x": 0,
        "y": 0,
        "category": "robustness"
      },
      {
        "id": "rs",
        "x": 0,
        "y": 0,
        "category": "robustness"
      },
      {
        "id": "autoattack",
        "x": 0,
        "y": 0,
        "category": "robustness"
      },
      {
        "id": "et3",
        "x": 0,
        "y": 0,
        "category": "robustness"
      },
      {
        "id": "lfr",
        "x": 0,
        "y": 0,
        "category": "fairness"
      },
      {
        "id": "vfae",
        "x": 0,
        "y": 0,
        "category": "fairness"
      },
      {
        "id": "eqopp",
        "x": 0,
        "y": 0,
        "category": "fairness"
      },
      {
        "id": "arl",
        "x": 0,
        "y": 0,
        "category": "fairness"
      },
      {
        "id": "silencer",
        "x": 0,
        "y": 0,
        "category": "fairness"
      },
      {
        "id": "lime",
        "x": 0,
        "y": 0,
        "category": "interpretability"
      },
      {
        "id": "shap",
        "x": 0,
        "y": 0,
        "category": "interpretability"
      },
      {
        "id": "gradcam",
        "x": 0,
        "y": 0,
        "category": "interpretability"
      },
      {
        "id": "cbm",
        "x": 0,
        "y": 0,
        "category": "interpretability"
      },
      {
        "id": "sae",
        "x": 0,
        "y": 0,
        "category": "interpretability"
      },
      {
        "id": "protosure",
        "x": 0,
        "y": 0,
        "category": "interpretability"
      },
      {
        "id": "dp_sgd",
        "x": 0,
        "y": 0,
        "category": "privacy"
      },
      {
        "id": "fedavg",
        "x": 0,
        "y": 0,
        "category": "privacy"
      },
      {
        "id": "pate",
        "x": 0,
        "y": 0,
        "category": "privacy"
      },
      {
        "id": "diffushield",
        "x": 0,
        "y": 0,
        "category": "privacy"
      },
      {
        "id": "fedfm",
        "x": 0,
        "y": 0,
        "category": "privacy"
      }
    ],
    "edges": [
      {
        "from": "fgsm",
        "to": "pgd",
        "label": "多步迭代"
      },
      {
        "from": "pgd",
        "to": "trades",
        "label": "权衡优化"
      },
      {
        "from": "pgd",
        "to": "autoattack",
        "label": "标准化评估"
      },
      {
        "from": "autoattack",
        "to": "et3",
        "label": "测试时防御"
      },
      {
        "from": "lfr",
        "to": "vfae",
        "label": "变分解耦"
      },
      {
        "from": "lfr",
        "to": "eqopp",
        "label": "统计准则"
      },
      {
        "from": "eqopp",
        "to": "arl",
        "label": "无监督公平"
      },
      {
        "from": "arl",
        "to": "silencer",
        "label": "LLM对齐"
      },
      {
        "from": "lime",
        "to": "shap",
        "label": "统一归因"
      },
      {
        "from": "lime",
        "to": "cbm",
        "label": "概念嵌入"
      },
      {
        "from": "cbm",
        "to": "sae",
        "label": "机械解释"
      },
      {
        "from": "cbm",
        "to": "protosure",
        "label": "原型蒸馏"
      },
      {
        "from": "dp_sgd",
        "to": "fedavg",
        "label": "分布式隐私"
      },
      {
        "from": "dp_sgd",
        "to": "pate",
        "label": "知识迁移"
      },
      {
        "from": "fedavg",
        "to": "diffushield",
        "label": "隐私合成"
      },
      {
        "from": "fedavg",
        "to": "fedfm",
        "label": "大模型协作"
      }
    ],
    "milestones": [
      "pgd",
      "shap",
      "fedavg"
    ]
  },
  "algos": [
    {
      "id": "fgsm",
      "num": 1,
      "name": "FGSM",
      "fullName": "快速梯度符号法 (Fast Gradient Sign Method)",
      "year": "2015",
      "org": "Google",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/1412.6572",
      "projectUrl": "",
      "category": "robustness",
      "motivation": "首次揭示梯度方向单步扰动即可欺骗模型",
      "summary": "FGSM 基于\"神经网络的线性特性是对抗脆弱性的根本原因\"这一洞察，提出沿损失函数梯度符号方向施加单步 \\(\\epsilon\\)-幅度扰动即可高效生成对抗样本，并据此设计了对抗训练正则化方法提升模型鲁棒性。",
      "keyPoints": [
        "<strong>线性假说</strong>：高维空间中，即使每维扰动极小（\\(\\|\\eta\\|_\\infty < \\epsilon\\)），线性模型的激活变化可达 \\(\\epsilon \\cdot m \\cdot n\\)，随维度线性增长",
        "<strong>FGSM 攻击公式</strong>：\\(\\eta = \\epsilon \\cdot \\text{sign}(\\nabla_x J(\\theta, x, y))\\)，单步、闭式、仅需一次反向传播",
        "<strong>对抗训练目标</strong>：\\(\\tilde{J} = \\alpha J(\\theta, x, y) + (1-\\alpha) J(\\theta, x + \\epsilon \\cdot \\text{sign}(\\nabla_x J))\\)，持续用当前模型生成对抗样本进行数据增强",
        "<strong>跨模型迁移性</strong>：不同架构、不同训练集的模型对同一对抗样本均易受骗，支持线性假说的普适性",
        "<strong>实验验证</strong>：MNIST 上 \\(\\epsilon=0.25\\) 使 softmax 分类器错误率达 99.9%；对抗训练将 maxout 网络测试误差从 0.94% 降至 0.78%",
        "<strong>与非线性防御对比</strong>：通用正则化（Dropout、预训练）无法有效防御对抗样本，RBF 网络等非线性模型族可抵抗但难以训练"
      ],
      "detail": "<p><img alt=\"FGSM 对抗样本示例（Panda → Gibbon）\" src=\"https://ar5iv.labs.arxiv.org/html/1412.6572/assets/panda_577.png\" />\n<em>图：对 GoogLeNet 施加 FGSM 扰动（ε=0.007），\"panda\"（57.7% 置信度）被误分类为\"gibbon\"（99.3% 置信度），扰动对人眼不可见。</em></p>\n<pre><code class=\"language-python\"># FGSM 攻击伪代码\nimport torch\n\ndef fgsm_attack(model, x, y, epsilon, loss_fn):\n    &quot;&quot;&quot;\n    model: 目标分类器\n    x: 原始输入 (requires_grad=True)\n    y: 真实标签\n    epsilon: 扰动幅度上界\n    &quot;&quot;&quot;\n    x.requires_grad = True\n    output = model(x)\n    loss = loss_fn(output, y)\n    loss.backward()\n\n    # 核心：取梯度符号方向，乘以 epsilon\n    perturbation = epsilon * x.grad.sign()\n    x_adv = x + perturbation\n    x_adv = torch.clamp(x_adv, 0, 1)  # 保持有效像素范围\n    return x_adv\n</code></pre>\n<h5>动机与背景</h5>\n<p>Szegedy et al. (2014) 首次发现神经网络存在对抗样本现象——对输入施加人眼不可察觉的微小扰动即可使模型高置信度误分类。早期解释将此归因于深度网络的\"极端非线性\"和\"过拟合\"。Goodfellow et al. 在本文中推翻了这一假说，提出了更为简洁有力的<strong>线性假说</strong>：正是神经网络中大量线性组件（ReLU、LSTM、maxout 等分段线性激活）的累积效应导致了对抗脆弱性。</p>\n<h5>核心机制：线性假说与 FGSM 推导</h5>\n<p>考虑权重向量 \\(\\mathbf{w}\\) 与对抗输入 \\(\\tilde{x} = x + \\eta\\) 的点积：</p>\n<p>$$\\mathbf{w}^\\top \\tilde{x} = \\mathbf{w}^\\top x + \\mathbf{w}^\\top \\eta$$</p>\n<p>在 \\(\\|\\eta\\|_\\infty \\leq \\epsilon\\) 约束下，为最大化 \\(\\mathbf{w}^\\top \\eta\\)，最优解为 \\(\\eta = \\epsilon \\cdot \\text{sign}(\\mathbf{w})\\)。此时激活增量为 \\(\\epsilon \\cdot m \\cdot n\\)（\\(m\\) 为权重均值绝对值，\\(n\\) 为输入维度）。</p>\n<div class=\"key-point\">💡 <strong>关键直觉</strong>：扰动的 \\(L_\\infty\\) 范数不随维度增长，但其对输出的影响随维度<strong>线性增长</strong>。这就是为什么在高维图像空间（如 MNIST 的 784 维、ImageNet 的 150528 维）中，极微小的逐像素扰动就能产生巨大的输出偏移。</div>\n<p>将此思想推广到非线性神经网络：对损失函数 \\(J(\\theta, x, y)\\) 在当前参数 \\(\\theta\\) 处做一阶泰勒展开，最大化损失的最优 \\(L_\\infty\\) 扰动即为：</p>\n<p>$$\\eta = \\epsilon \\cdot \\text{sign}\\left(\\nabla_x J(\\theta, x, y)\\right)$$</p>\n<p>这就是 <strong>Fast Gradient Sign Method (FGSM)</strong>。其计算仅需一次前向传播 + 一次反向传播，复杂度与训练一步相当。</p>\n<h5>对抗训练：从攻击到防御</h5>\n<p>基于 FGSM 的高效性，作者提出将对抗样本纳入训练过程。修改后的目标函数为：</p>\n<p>$$\\tilde{J}(\\theta, x, y) = \\alpha \\cdot J(\\theta, x, y) + (1 - \\alpha) \\cdot J\\left(\\theta, x + \\epsilon \\cdot \\text{sign}(\\nabla_x J(\\theta, x, y)), y\\right)$$</p>\n<p>其中 \\(\\alpha = 0.5\\)。这一方法的关键优势在于：\n1. <strong>在线生成</strong>：每步训练时用当前模型参数实时生成对抗样本，避免使用过时的攻击\n2. <strong>计算高效</strong>：仅增加一次前向+反向传播的开销\n3. <strong>正则化效果</strong>：等价于对模型施加局部 Lipschitz 约束，鼓励损失函数在输入邻域内平滑</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：作者发现对抗训练需要更大容量的模型（1600 units/layer vs 原始 240），且应使用<strong>对抗验证集误差</strong>而非标准验证集误差进行早停。</div>\n<h5>与传统方法的区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方面</th>\n<th>传统解释</th>\n<th>FGSM 论文观点</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>对抗脆弱性根因</td>\n<td>非线性 + 过拟合</td>\n<td>线性特性在高维空间的累积</td>\n</tr>\n<tr>\n<td>攻击方法</td>\n<td>L-BFGS 优化（Szegedy 2014），计算昂贵</td>\n<td>单步梯度符号，闭式解</td>\n</tr>\n<tr>\n<td>防御策略</td>\n<td>Dropout、权重衰减等通用正则</td>\n<td>对抗训练（直接在扰动样本上优化）</td>\n</tr>\n<tr>\n<td>迁移性解释</td>\n<td>无</td>\n<td>不同模型学到相似的线性函数，梯度方向一致</td>\n</tr>\n</tbody>\n</table></div>\n<h5>实验关键发现</h5>\n<ul>\n<li><strong>攻击效果</strong>：MNIST 上 \\(\\epsilon=0.25\\)，softmax 错误率 99.9%，maxout 错误率 89.4%；CIFAR-10 上 \\(\\epsilon=0.1\\)，卷积 maxout 错误率 87.15%</li>\n<li><strong>对抗训练收益</strong>：MNIST 测试误差从 0.94% → 0.78%（当时 permutation-invariant MNIST SOTA）</li>\n<li><strong>鲁棒性提升</strong>：对抗训练后模型在 FGSM 攻击下错误率从 89.4% 降至 17.9%</li>\n<li><strong>RBF 网络</strong>：天然抵抗 FGSM（因其高度非线性），但在干净数据上精度较低（1.6% vs 0.78%）</li>\n</ul>",
      "quiz": {
        "q": "FGSM 论文认为神经网络易受对抗攻击的根本原因是什么？",
        "options": [
          "模型参数过多导致严重过拟合",
          "深度网络的高度非线性使输出对微小输入变化极度敏感",
          "高维空间中线性行为的累积效应使微小扰动产生巨大输出偏移",
          "训练数据不足导致决策边界不稳定"
        ],
        "answer": 2,
        "explain": "论文核心论点是线性假说：在 n 维空间中，L∞ 约束下的最优扰动通过 sign(w) 使激活增量达 ε·m·n，随维度线性增长，这是对抗脆弱性的根源。"
      }
    },
    {
      "id": "pgd",
      "num": 2,
      "name": "PGD",
      "fullName": "投影梯度下降攻击 (Projected Gradient Descent)",
      "year": "2018",
      "org": "MIT",
      "parent": "fgsm",
      "paperUrl": "https://arxiv.org/abs/1706.06083",
      "projectUrl": "",
      "category": "robustness",
      "motivation": "多步迭代优化使对抗训练成为标准防御范式",
      "summary": "PGD 的核心目标是：多步迭代优化使对抗训练成为标准防御范式。",
      "keyPoints": [
        "核心动机：多步迭代优化使对抗训练成为标准防御范式",
        "演化来源：继承或改进自 fgsm",
        "代表机构：MIT"
      ],
      "detail": "<p>多步迭代优化使对抗训练成为标准防御范式</p>"
    },
    {
      "id": "trades",
      "num": 3,
      "name": "TRADES",
      "fullName": "鲁棒性权衡优化 (Theoretically Principled Trade-off)",
      "year": "2019",
      "org": "CMU/PKU",
      "parent": "pgd",
      "paperUrl": "https://arxiv.org/abs/1901.08573",
      "projectUrl": "",
      "category": "robustness",
      "motivation": "用KL散度权衡清洁准确率与对抗鲁棒性",
      "summary": "TRADES 的核心目标是：用KL散度权衡清洁准确率与对抗鲁棒性。",
      "keyPoints": [
        "核心动机：用KL散度权衡清洁准确率与对抗鲁棒性",
        "演化来源：继承或改进自 pgd",
        "代表机构：CMU/PKU"
      ],
      "detail": "<p>用KL散度权衡清洁准确率与对抗鲁棒性</p>"
    },
    {
      "id": "rs",
      "num": 4,
      "name": "RS",
      "fullName": "随机平滑 (Randomized Smoothing)",
      "year": "2019",
      "org": "CMU",
      "parent": "—",
      "paperUrl": "https://proceedings.mlr.press/v97/cohen19c.html",
      "projectUrl": "",
      "category": "robustness",
      "motivation": "首个可认证L2范数鲁棒性的防御方法",
      "summary": "Randomized Smoothing 证明了对任意基分类器施加各向同性高斯噪声后取多数投票所得的平滑分类器，在 \\(\\ell_2\\) 范数下具有紧的可认证鲁棒半径 \\(R = \\sigma \\Phi^{-1}(\\underline{p_A})\\)，首次在 ImageNet 规模上实现了可证明的对抗鲁棒性。",
      "keyPoints": [
        "<strong>平滑分类器定义</strong>：\\(g(x) = \\arg\\max_c \\mathbb{P}(f(x+\\varepsilon)=c)\\)，其中 \\(\\varepsilon \\sim \\mathcal{N}(0, \\sigma^2 I)\\)",
        "<strong>紧的 \\(\\ell_2\\) 认证半径</strong>：\\(R = \\sigma \\Phi^{-1}(\\underline{p_A})\\)（二分类）；一般情况 \\(R = \\frac{\\sigma}{2}[\\Phi^{-1}(\\underline{p_A}) - \\Phi^{-1}(\\overline{p_B})]\\)",
        "<strong>证明技术</strong>：利用 Neyman-Pearson 引理构造最坏情况分类器，证明认证半径的紧性",
        "<strong>Monte Carlo 认证算法</strong>：通过采样 + Clopper-Pearson 置信区间估计 \\(\\underline{p_A}\\)，给出概率性正确的认证",
        "<strong>训练方法</strong>：高斯数据增强（训练时对输入加 \\(\\mathcal{N}(0, \\sigma^2 I)\\) 噪声）",
        "<strong>ImageNet 规模验证</strong>：在 \\(\\ell_2 < 0.5\\) 扰动下达到 49% certified top-1 accuracy"
      ],
      "detail": "<h5>核心示意图</h5>\n<p><img alt=\"Randomized Smoothing 示意图\" src=\"https://ar5iv.labs.arxiv.org/html/1902.02918/assets/figures/illustration.png\" />\n<em>图：左侧为基分类器 f 的决策区域（不同颜色），虚线为高斯分布 \\(\\mathcal{N}(x, \\sigma^2 I)\\) 的等高线；右侧为 \\(f(\\mathcal{N}(x, \\sigma^2 I))\\) 的类别概率分布，\\(\\underline{p_A}\\) 为 top class 的概率下界，\\(\\overline{p_B}\\) 为 runner-up class 的概率上界。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># Algorithm 1: Predict &amp; Certify\n\ndef Predict(f, sigma, x, n, alpha):\n    &quot;&quot;&quot;评估平滑分类器 g(x)&quot;&quot;&quot;\n    counts = SampleUnderNoise(f, x, n, sigma)\n    c_A, c_B = top_two_classes(counts)\n    n_A, n_B = counts[c_A], counts[c_B]\n    if BinomPValue(n_A, n_A + n_B, 0.5) &lt;= alpha:\n        return c_A\n    else:\n        return ABSTAIN\n\ndef Certify(f, sigma, x, n0, n, alpha):\n    &quot;&quot;&quot;认证平滑分类器在 x 处的鲁棒半径&quot;&quot;&quot;\n    # Step 1: 用少量样本确定 top class\n    counts0 = SampleUnderNoise(f, x, n0, sigma)\n    c_A = argmax(counts0)\n\n    # Step 2: 用大量样本估计 p_A 的下界\n    counts = SampleUnderNoise(f, x, n, sigma)\n    p_A_lower = LowerConfBound(counts[c_A], n, 1 - alpha)  # Clopper-Pearson\n\n    if p_A_lower &gt; 0.5:\n        radius = sigma * Phi_inv(p_A_lower)\n        return c_A, radius\n    else:\n        return ABSTAIN, 0.0\n</code></pre>\n<h5>动机与背景</h5>\n<p>对抗样本问题是深度学习安全性的核心挑战：微小的输入扰动可导致分类器产生错误预测。<strong>可证明防御（certified defense）</strong> 旨在为分类器提供数学上的鲁棒性保证——即在给定扰动范围内，分类结果不会改变。</p>\n<p>此前的可证明防御方法（如基于 SDP 松弛、区间传播、线性松弛等）虽然在小规模数据集上可行，但由于需要分析网络的具体结构，<strong>无法扩展到 ImageNet 等大规模任务</strong>。Randomized Smoothing 的核心优势在于：它是 <strong>模型无关的（model-agnostic）</strong>——无需知道基分类器 \\(f\\) 的内部结构，只需能够查询其输出即可。</p>\n<h5>核心机制：平滑分类器与认证半径</h5>\n<p><strong>定义</strong>：给定基分类器 \\(f: \\mathbb{R}^d \\to \\mathcal{Y}\\) 和噪声标准差 \\(\\sigma\\)，平滑分类器定义为：</p>\n<p>$$g(x) = \\arg\\max_{c \\in \\mathcal{Y}} \\mathbb{P}_{\\varepsilon \\sim \\mathcal{N}(0, \\sigma^2 I)}[f(x + \\varepsilon) = c]$$</p>\n<p>直觉上，\\(g(x)\\) 返回的是在 \\(x\\) 的高斯邻域内 \\(f\\) 最频繁预测的类别。</p>\n<p><strong>Theorem 1（核心定理）</strong>：设 \\(c_A = g(x)\\)，且：</p>\n<p>$$p_A = \\mathbb{P}(f(x+\\varepsilon) = c_A) \\geq \\underline{p_A} > \\overline{p_B} \\geq \\max_{c \\neq c_A} \\mathbb{P}(f(x+\\varepsilon) = c)$$</p>\n<p>则对所有满足 \\(\\|\\delta\\|_2 < R\\) 的扰动 \\(\\delta\\)，有 \\(g(x+\\delta) = c_A\\)，其中：</p>\n<p>$$R = \\frac{\\sigma}{2}\\left[\\Phi^{-1}(\\underline{p_A}) - \\Phi^{-1}(\\overline{p_B})\\right]$$</p>\n<p>在二分类情况下（\\(\\overline{p_B} = 1 - \\underline{p_A}\\)），简化为：</p>\n<p>$$R = \\sigma \\Phi^{-1}(\\underline{p_A})$$</p>\n<div class=\"key-point\">💡 <strong>关键直觉</strong>：\\(\\sigma\\) 越大，认证半径越大，但基分类器在噪声下的准确率越低——存在 accuracy-robustness trade-off。</div>\n<h5>证明思路：Neyman-Pearson 引理</h5>\n<p>证明的核心思想是寻找\"最坏情况\"基分类器。固定扰动 \\(\\delta\\)，问题变为：</p>\n<blockquote>\n<p>在所有满足 \\(\\mathbb{P}(f(x+\\varepsilon)=c_A) \\geq \\underline{p_A}\\) 的分类器 \\(f\\) 中，哪一个使得 \\(\\mathbb{P}(f(x+\\delta+\\varepsilon)=c_A)\\) 最小？</p>\n</blockquote>\n<p>由 <strong>Neyman-Pearson 引理</strong>，最坏情况分类器 \\(f^*\\) 是一个线性分类器，其决策边界垂直于扰动方向 \\(\\delta\\)：</p>\n<p>$$f^*(x') = \\begin{cases} c_A & \\text{if } \\delta^T(x'-x) \\leq \\sigma\\|\\delta\\|_2 \\Phi^{-1}(\\underline{p_A}) \\\\ c_B & \\text{otherwise} \\end{cases}$$</p>\n<p>该最坏情况分类器将 \\(\\mathcal{N}(x+\\delta, \\sigma^2 I)\\) 分类为 \\(c_A\\) 的概率为：</p>\n<p>$$\\Phi\\left(\\Phi^{-1}(\\underline{p_A}) - \\frac{\\|\\delta\\|_2}{\\sigma}\\right)$$</p>\n<p>要保证此概率 \\(> 1/2\\)，解得 \\(\\|\\delta\\|_2 < \\sigma \\Phi^{-1}(\\underline{p_A})\\)。</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：该认证半径是<strong>紧的（tight）</strong>——存在满足约束的分类器恰好在半径边界处失效，因此无法进一步改进。</div>\n<h5>统计认证：Monte Carlo 估计</h5>\n<p>实际中 \\(p_A\\) 未知，需通过采样估计。Certify 算法的流程：</p>\n<ol>\n<li><strong>采样</strong>：抽取 \\(n\\) 个高斯噪声样本 \\(\\varepsilon_i \\sim \\mathcal{N}(0, \\sigma^2 I)\\)，统计 \\(f(x+\\varepsilon_i) = c_A\\) 的次数 \\(n_A\\)</li>\n<li><strong>置信下界</strong>：用 Clopper-Pearson 方法计算 \\(p_A\\) 的 \\((1-\\alpha)\\) 单侧置信下界 \\(\\underline{p_A}\\)</li>\n<li><strong>计算半径</strong>：\\(R = \\sigma \\Phi^{-1}(\\underline{p_A})\\)</li>\n</ol>\n<div class=\"key-point\">💡 <strong>概率保证</strong>：以至少 \\(1-\\alpha\\) 的概率，返回的半径是正确的（即在该半径内分类确实不变）。</div>\n<h5>训练方法</h5>\n<p>论文发现最有效的训练方法是简单的<strong>高斯数据增强</strong>：</p>\n<p>$$\\min_\\theta \\mathbb{E}_{(x,y)\\sim\\mathcal{D}} \\mathbb{E}_{\\varepsilon \\sim \\mathcal{N}(0, \\sigma^2 I)} [\\ell(f_\\theta(x + \\varepsilon), y)]$$</p>\n<p>即在标准训练中，每个 mini-batch 的输入都加上与认证时相同方差的高斯噪声。这比对抗训练简单得多，且在 ImageNet 上可行。</p>\n<h5>与先前工作的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>认证范数</th>\n<th>可扩展性</th>\n<th>认证紧性</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>SDP 松弛</td>\n<td>\\(\\ell_\\infty\\)</td>\n<td>小网络</td>\n<td>松</td>\n</tr>\n<tr>\n<td>区间传播 (IBP)</td>\n<td>\\(\\ell_\\infty\\)</td>\n<td>中等</td>\n<td>松</td>\n</tr>\n<tr>\n<td>Lecuyer et al. (PixelDP)</td>\n<td>\\(\\ell_2\\)</td>\n<td>ImageNet</td>\n<td>松（Rényi 散度）</td>\n</tr>\n<tr>\n<td>Li et al.</td>\n<td>\\(\\ell_2\\)</td>\n<td>ImageNet</td>\n<td>松（信息论）</td>\n</tr>\n<tr>\n<td><strong>本文 (Cohen et al.)</strong></td>\n<td>\\(\\ell_2\\)</td>\n<td><strong>ImageNet</strong></td>\n<td><strong>紧</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p>本文的关键改进：Lecuyer et al. 和 Li et al. 也使用了随机平滑框架，但它们的认证半径是松的（基于 Rényi 散度或互信息的界）。本文通过 Neyman-Pearson 引理直接推导出紧的认证半径，在相同条件下给出更大的认证区域。</p>",
      "quiz": {
        "q": "Randomized Smoothing 中，增大噪声标准差 σ 会产生什么效果？",
        "options": [
          "认证半径增大，且基分类器准确率不受影响",
          "认证半径增大，但基分类器在噪声下的准确率降低",
          "认证半径减小，但基分类器准确率提升",
          "认证半径和准确率都不受影响，仅影响采样次数"
        ],
        "answer": 1,
        "explain": "R = σΦ⁻¹(p_A)，σ 增大使半径公式中的系数增大，但同时噪声更强导致 p_A 降低，存在 accuracy-robustness trade-off。"
      }
    },
    {
      "id": "autoattack",
      "num": 5,
      "name": "AutoAttack",
      "fullName": "自动攻击评估 (AutoAttack)",
      "year": "2020",
      "org": "Tübingen",
      "parent": "pgd",
      "paperUrl": "https://proceedings.mlr.press/v119/croce20b.html",
      "projectUrl": "",
      "category": "robustness",
      "motivation": "集成无参数攻击成为鲁棒性评估行业标准",
      "summary": "AutoAttack 提出了一个完全无参数的对抗攻击集成框架，通过组合自适应步长 PGD（APGD）、尺度不变的 DLR 损失函数、FAB 攻击和 Square Attack 四种互补攻击，实现了对对抗鲁棒性的可靠且自动化评估，在 100+ 篇防御论文的模型上几乎全部降低了其声称的鲁棒精度。",
      "keyPoints": [
        "<strong>APGD（Auto-PGD）</strong>：自适应步长 PGD 攻击，基于检查点机制动态调整步长，无需手动调参",
        "<strong>DLR 损失函数</strong>：Difference of Logit Ratio，尺度和平移不变的替代损失，解决 CE loss 在接近决策边界时梯度消失问题",
        "<strong>四攻击集成</strong>：APGD-CE（无目标）→ APGD-T-DLR（有目标）→ FAB-T（有目标最小扰动）→ Square Attack（无梯度黑盒），逐步筛选未攻破样本",
        "<strong>完全无参数</strong>：所有超参数在所有数据集、模型、范数下固定不变，无需针对特定防御调优",
        "<strong>有目标攻击优于无目标</strong>：实验证明有目标版本在几乎所有情况下更强",
        "<strong>大规模评估</strong>：测试 50+ 模型来自 35+ 篇论文，除一篇外全部降低了报告的鲁棒精度，部分降幅超过 10%"
      ],
      "detail": "<p><img alt=\"AutoAttack 步长调度与攻击对比\" src=\"https://ar5iv.labs.arxiv.org/html/2003.01690/assets/x1.png\" />\n<em>图：APGD 的自适应步长调度机制——在检查点处根据优化进展动态减半步长，相比固定步长策略更有效地探索对抗空间</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># AutoAttack 整体流程\ndef AutoAttack(model, x, y, epsilon, norm='Linf'):\n    # 初始化：所有测试样本\n    remaining = set(range(len(x)))\n\n    # 第1步：APGD-CE（无目标，CE损失）\n    adv = APGD(model, x[remaining], y[remaining], loss='CE', targeted=False)\n    remaining -= successfully_attacked(adv)\n\n    # 第2步：APGD-T-DLR（有目标，DLR损失，9个目标类）\n    adv = APGD(model, x[remaining], y[remaining], loss='DLR', targeted=True, n_target=9)\n    remaining -= successfully_attacked(adv)\n\n    # 第3步：FAB-T（有目标，最小扰动攻击）\n    adv = FAB(model, x[remaining], y[remaining], targeted=True, n_target=9)\n    remaining -= successfully_attacked(adv)\n\n    # 第4步：Square Attack（黑盒，5000次查询）\n    adv = SquareAttack(model, x[remaining], y[remaining], queries=5000)\n    remaining -= successfully_attacked(adv)\n\n    robust_accuracy = len(remaining) / len(x)\n    return robust_accuracy\n\n# APGD 核心算法\ndef APGD(model, x, y, loss, targeted, N_iter=100):\n    eta = 2 * epsilon  # 初始步长\n    x_adv = x + uniform(-epsilon, epsilon)  # 随机初始化\n    x_best = x_adv\n    f_best = loss(model(x_adv), y)\n\n    # 检查点序列: w_0=0, w_1=0.22, w_{j+1}=w_j+max(w_j-w_{j-1}-0.03, 0.06)\n    checkpoints = compute_checkpoints(N_iter)\n\n    for i in range(1, N_iter):\n        # 带动量的梯度步\n        grad = compute_gradient(loss, model, x_adv, y)\n        z = x_adv + eta * sign(grad)  # 梯度步\n        x_adv = x_adv + alpha * (z - x_adv) + (1-alpha) * (x_adv - x_prev)  # 动量, α=0.75\n        x_adv = project(x_adv, x, epsilon)  # 投影回 ε-球\n\n        # 更新最优\n        if loss(model(x_adv), y) &gt; f_best:\n            x_best = x_adv; f_best = loss(model(x_adv), y)\n\n        # 检查点处判断是否减半步长\n        if i in checkpoints:\n            condition1 = (improving_steps / interval) &lt; rho  # ρ=0.75\n            condition2 = (f_best == f_best_at_last_checkpoint) and (no_halving_since_last)\n            if condition1 or condition2:\n                eta = eta / 2\n                x_adv = x_best  # 从最优点重启\n\n    return x_best\n</code></pre>\n<h5>动机与背景</h5>\n<p>对抗鲁棒性评估的核心挑战在于：<strong>防御方法的鲁棒精度高度依赖于攻击的强度</strong>。现有评估存在两个系统性问题：</p>\n<ol>\n<li><strong>参数敏感性</strong>：标准 PGD 攻击的步长 \\(\\eta\\) 需要针对每个模型仔细调优。步长过大导致振荡，过小导致收敛缓慢，而大多数论文仅使用固定步长（如 \\(\\eta = \\epsilon/4\\)）。</li>\n<li><strong>损失函数局限性</strong>：交叉熵损失在样本已被正确分类且置信度高时梯度有效，但在接近决策边界时梯度趋于零，导致攻击停滞。</li>\n<li><strong>单一攻击不足</strong>：不同攻击方法对不同防御机制的有效性差异巨大，单一攻击无法可靠评估所有防御。</li>\n</ol>\n<div class=\"warn-box\">⚠️ 注意：论文发现许多声称具有高鲁棒性的防御方法，实际上只是因为评估攻击不够强而被高估，部分方法的实际鲁棒精度比报告值低 30% 以上。</div>\n<h5>核心机制一：APGD 自适应步长</h5>\n<p>APGD 的核心创新是<strong>基于优化进展自动调整步长</strong>，无需预设步长衰减策略。</p>\n<p><strong>步长初始化</strong>：设初始步长为 \\(\\eta^{(0)} = 2\\epsilon\\)（即扰动预算的两倍），这是一个故意设置的较大值，确保初期能快速探索。</p>\n<p><strong>动量更新</strong>：每步更新融合梯度方向和动量：</p>\n<p>$$x^{(k+1)} = \\Pi_{S}(x^{(k)} + \\eta^{(k)} \\cdot \\text{sign}(\\nabla f(x^{(k)})))$$</p>\n<p>实际实现中加入动量项（\\(\\alpha = 0.75\\)）：</p>\n<p>$$z^{(k+1)} = \\Pi_S\\left(x^{(k)} + \\eta^{(k)} \\cdot \\text{sign}(\\nabla f(x^{(k)}))\\right)$$\n$$x^{(k+1)} = \\Pi_S\\left(x^{(k)} + \\alpha(z^{(k+1)} - x^{(k)}) + (1-\\alpha)(x^{(k)} - x^{(k-1)})\\right)$$</p>\n<p><strong>检查点调度</strong>：在预定义的检查点 \\(w_j\\) 处评估优化进展。检查点序列为：</p>\n<p>$$w_0 = 0, \\quad w_1 = 0.22, \\quad w_{j+1} = w_j + \\max(w_j - w_{j-1} - 0.03, \\; 0.06)$$</p>\n<p>在每个检查点，若满足以下任一条件则将步长减半：\n1. 从上一检查点到当前，损失函数改善的步数占比 &lt; \\(\\rho = 0.75\\)\n2. 损失函数最优值未改善，且自上一检查点以来步长未被减半</p>\n<div class=\"key-point\">💡 关键：条件 1 检测\"步长过大导致振荡\"（改善比例低说明很多步在做无用功）；条件 2 检测\"步长过小导致停滞\"（无改善但也没减过步长，说明需要更精细搜索）。减半后从当前最优点重启，避免在次优区域浪费迭代。</div>\n<h5>核心机制二：DLR 损失函数</h5>\n<p>交叉熵损失 \\(f_{CE}(x) = -\\log p_y(x)\\) 的问题在于它依赖于 softmax 输出的绝对尺度。当 logits 被缩放时，梯度方向不变但大小改变，且在决策边界附近梯度消失。</p>\n<p>DLR（Difference of Logit Ratio）损失定义为：</p>\n<p>$$f_{DLR}(x) = -\\frac{z_y - \\max_{i \\neq y} z_i}{z_{\\pi_1} - z_{\\pi_3}}$$</p>\n<p>其中 \\(z_y\\) 是真实类别的 logit，\\(\\pi\\) 是 logits 的降序排列，\\(z_{\\pi_1}\\) 是最大 logit，\\(z_{\\pi_3}\\) 是第三大 logit。</p>\n<p><strong>设计直觉</strong>：\n- <strong>分子</strong> \\(z_y - \\max_{i \\neq y} z_i\\)：衡量正确类别与最强竞争类别的差距（攻击目标是使其为负）\n- <strong>分母</strong> \\(z_{\\pi_1} - z_{\\pi_3}\\)：提供尺度归一化，使损失对 logits 的线性变换不变</p>\n<div class=\"key-point\">💡 关键：DLR 损失是<strong>尺度不变和平移不变</strong>的——对 logits 做 \\(z \\to az + b\\) 变换不改变 DLR 值。这使得攻击对不同模型架构（可能输出不同量级的 logits）具有一致的行为。</div>\n<p><strong>有目标版本</strong>：</p>\n<p>$$f_{T-DLR}(x) = -\\frac{z_y - z_t}{z_{\\pi_1} - z_{\\pi_3}}$$</p>\n<p>其中 \\(t\\) 是指定的目标类别。有目标攻击依次尝试按模型预测概率排序的前 9 个非真实类别作为目标。</p>\n<h5>核心机制三：攻击集成策略</h5>\n<p>AutoAttack 的四个组件提供<strong>互补的攻击能力</strong>：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>攻击</th>\n<th>类型</th>\n<th>特点</th>\n<th>作用</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>APGD-CE</td>\n<td>白盒/无目标</td>\n<td>自适应步长 + CE损失</td>\n<td>快速筛选易攻破样本</td>\n</tr>\n<tr>\n<td>APGD-T-DLR</td>\n<td>白盒/有目标</td>\n<td>自适应步长 + DLR损失</td>\n<td>攻破梯度遮蔽防御</td>\n</tr>\n<tr>\n<td>FAB-T</td>\n<td>白盒/有目标</td>\n<td>最小化扰动范数</td>\n<td>找到更紧的对抗样本</td>\n</tr>\n<tr>\n<td>Square Attack</td>\n<td>黑盒/无目标</td>\n<td>随机搜索，无梯度</td>\n<td>攻破梯度遮蔽/混淆梯度</td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>顺序执行逻辑</strong>：每个攻击只处理前序攻击未攻破的样本，逐步缩小\"幸存\"样本集。这既节省计算又确保多样性覆盖。</p>\n<p><strong>为什么需要黑盒攻击</strong>：某些防御（如随机化防御、梯度遮蔽）会使白盒攻击的梯度信息不可靠。Square Attack 完全不依赖梯度，仅通过模型输出分数进行随机搜索，能有效绕过这类防御。</p>\n<h5>实验关键发现</h5>\n<p>论文在 CIFAR-10、CIFAR-100、MNIST、ImageNet 上测试了 50+ 个防御模型：</p>\n<ul>\n<li><strong>全面降低鲁棒精度</strong>：除 1 篇论文外，AutoAttack 在所有模型上的攻击效果均优于原论文报告的最强攻击</li>\n<li><strong>典型案例</strong>：</li>\n<li>Kim &amp; Wang (2020)：报告鲁棒精度远高于实际，APGD-T-DLR 将其从 ~48% 降至 ~36%（\\(l_\\infty\\), \\(\\epsilon=8/255\\)）</li>\n<li>Grathwohl et al. (2020) JEM：报告 47.6% 鲁棒精度，AutoAttack 降至 9.92%（降幅 37.7%）</li>\n<li><strong>有目标攻击一致更强</strong>：在几乎所有模型上，APGD-T-DLR 优于 APGD-DLR（无目标），差距最大达 12.48%</li>\n</ul>\n<h5>与传统方法的区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>标准 PGD</th>\n<th>AutoAttack</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>步长</td>\n<td>固定，需手动调</td>\n<td>自适应，自动调整</td>\n</tr>\n<tr>\n<td>损失函数</td>\n<td>CE 或 CW</td>\n<td>CE + DLR（互补）</td>\n</tr>\n<tr>\n<td>攻击模式</td>\n<td>通常仅无目标</td>\n<td>无目标 + 有目标</td>\n</tr>\n<tr>\n<td>梯度依赖</td>\n<td>完全依赖</td>\n<td>白盒 + 黑盒互补</td>\n</tr>\n<tr>\n<td>参数调优</td>\n<td>每个模型需调</td>\n<td>完全固定</td>\n</tr>\n<tr>\n<td>评估可靠性</td>\n<td>可能高估防御</td>\n<td>接近真实下界</td>\n</tr>\n</tbody>\n</table></div>",
      "quiz": {
        "q": "AutoAttack 中 APGD 在检查点处减半步长的条件是什么？",
        "options": [
          "当损失函数值连续下降时",
          "当改善步数占比低于阈值 ρ，或最优值未改善且步长未被减半过",
          "每隔固定迭代次数自动减半",
          "当梯度范数小于预设阈值时"
        ],
        "answer": 1,
        "explain": "APGD 在检查点处检查两个条件：(1) 改善步数比例 < ρ=0.75（说明振荡），或 (2) 最优值未改善且自上次检查点以来未减半（说明停滞）。满足任一条件则减半步长并从最优点重启。"
      }
    },
    {
      "id": "et3",
      "num": 6,
      "name": "ET3",
      "fullName": "能量引导测试时防御 (Energy-guided Test-Time Defense)",
      "year": "2026",
      "org": "arXiv",
      "parent": "autoattack",
      "paperUrl": "https://arxiv.org/abs/2603.26984",
      "projectUrl": "",
      "category": "robustness",
      "motivation": "无需重训练即可提升VLM对抗鲁棒性",
      "summary": "ET3 提出了一种基于能量最小化的轻量级测试时变换防御方法，通过在推理阶段对输入图像施加梯度下降来降低分类器的能量函数值，无需任何额外训练即可显著提升 CLIP 零样本分类和大型视觉语言模型（LVLMs）的对抗鲁棒性。",
      "keyPoints": [
        "提出 Energy-Guided Test-Time Transformation (ET3)：一种 training-free 的测试时防御，通过最小化输入样本的能量函数来增强对抗鲁棒性",
        "能量函数定义为分类器输出 logits 的负 LogSumExp，将判别式分类器重新解释为能量模型（EBM）",
        "防御机制：在 \\(\\ell_2\\) 球约束内，通过多步梯度下降迭代最小化能量，将对抗样本拉回正确分类区域",
        "扩展至 CLIP 零样本分类：使用 ImageNet-21K 代理标签计算图像-文本相似度作为 logits，进而计算能量",
        "扩展至 LVLMs（如 LLaVA）：仅对 CLIP 视觉编码器的输入进行能量优化，优化后的图像直接传递给 VLM，无需接触 VLM 本身",
        "理论保证：在局部线性假设和能量梯度比率条件下，证明 ET3 变换可使正确类别的 logit 超过错误类别",
        "超参数极简：仅需步长 \\(\\alpha\\)、步数 \\(T=2\\) 和防御半径 \\(\\epsilon\\)，在 14 个数据集上平均提升鲁棒精度 +8 个百分点",
        "在 defense-aware 自适应攻击下仍保持显著增益（平均 +7 个百分点）"
      ],
      "detail": "<p><img alt=\"ET3 框架示意图\" src=\"https://arxiv.org/html/2603.26984v2/x2.png\" />\n<em>图：ET3 防御框架。①对输入图像 x 添加小扰动 z（通过最小化相对于 ImageNet-21K 代理类别的能量优化得到），实现鲁棒零样本分类；②优化后的图像直接传递给 VLM，利用视觉编码器的内部表示提升 VLM 鲁棒性，VLM 本身不参与优化。</em></p>\n<pre><code class=\"language-python\"># ET3 防御伪代码\ndef ET3_defense(x, f_theta, epsilon, alpha, T, labels):\n    &quot;&quot;&quot;\n    x: 输入图像 (可能含对抗扰动)\n    f_theta: 预训练分类器/CLIP视觉编码器\n    epsilon: 防御半径 (ℓ2 约束)\n    alpha: 步长\n    T: 迭代步数 (默认 T=2)\n    labels: 代理标签集 (如 ImageNet-21K)\n    &quot;&quot;&quot;\n    x_tilde = x.clone()\n    for t in range(T):\n        # 计算 logits (分类器输出或 CLIP 图文相似度)\n        logits = f_theta(x_tilde, labels)  # shape: [K]\n        # 计算能量: E(x) = -log(sum_k exp(logits_k))\n        energy = -torch.logsumexp(logits, dim=-1)\n        # 梯度下降最小化能量\n        grad = torch.autograd.grad(energy, x_tilde)[0]\n        x_tilde = x_tilde - alpha * grad\n        # 投影回 ℓ2 球 B_epsilon(x)\n        delta = x_tilde - x\n        delta = delta * min(1, epsilon / delta.norm(2))\n        x_tilde = x + delta\n    return x_tilde  # 防御后的图像\n</code></pre>\n<p><strong>动机与背景</strong></p>\n<p>大型视觉语言模型（LVLMs）如 LLaVA、Qwen-VL 等虽然在多模态推理上表现出色，但其视觉编码器（通常基于 CLIP）极易受到对抗扰动攻击。传统防御方法主要依赖对抗训练（AT），但 AT 需要昂贵的重训练，且在面对未见过的攻击时泛化能力有限。测试时防御（如对抗净化、随机平滑）虽然无需重训练，但往往依赖额外的生成模型或带来巨大的推理开销。</p>\n<div class=\"key-point\">💡 关键：ET3 的核心洞察是——标准 softmax 分类器本身可以被视为能量模型（EBM），其 logits 直接定义了能量景观。对抗攻击将样本推向高能量区域（低置信度），而 ET3 通过梯度下降将样本拉回低能量区域（高置信度），无需任何辅助模型。</div>\n<p><strong>核心机制：能量定义与优化</strong></p>\n<p>给定 K 类分类器 \\(f_\\theta: \\mathbb{R}^d \\to \\mathbb{R}^K\\)，ET3 将能量定义为输出 logits 的负 LogSumExp：</p>\n<p>$$E(\\mathbf{x}) = -\\log\\left(\\sum_{k=1}^{K} \\exp\\left(f_\\theta(\\mathbf{x})_k\\right)\\right)$$</p>\n<p>这一定义来源于 EBM 理论：能量越低，表明模型对该输入的\"感知置信度\"越高。对抗扰动会增大能量（降低置信度），而 ET3 通过以下迭代将能量最小化：</p>\n<p>$$\\mathbf{x}^{(t)} = \\Pi_{\\mathcal{B}_\\epsilon(\\mathbf{x})}\\left(\\mathbf{x}^{(t-1)} - \\alpha \\nabla_{\\mathbf{x}} E\\left(\\mathbf{x}^{(t-1)}\\right)\\right)$$</p>\n<p>其中 \\(\\Pi_{\\mathcal{B}_\\epsilon(\\mathbf{x})}(\\cdot)\\) 为到 \\(\\ell_2\\) 球的投影，确保防御扰动不超过预算 \\(\\epsilon\\)。</p>\n<div class=\"warn-box\">⚠️ 注意：ET3 的防御方向与对抗攻击方向本质相反——攻击是最大化损失（增大能量），防御是最小化能量。但 ET3 并非简单的\"反向攻击\"，因为它优化的是 LogSumExp（所有类别的综合能量），而非针对特定类别的损失。</div>\n<p><strong>能量梯度的直觉解释</strong></p>\n<p>能量对输入的梯度可以展开为：</p>\n<p>$$\\nabla_{\\mathbf{x}} E(\\mathbf{x}) = -\\text{softmax}(f_\\theta(\\mathbf{x}))^\\top \\nabla_{\\mathbf{x}} f_\\theta(\\mathbf{x}) = -\\sum_{k=1}^{K} e_k \\mathbf{g}_k$$</p>\n<p>其中 \\(e_k = \\text{softmax}(f_\\theta(\\mathbf{x}))_k\\) 是第 k 类的 softmax 概率，\\(\\mathbf{g}_k = \\nabla_{\\mathbf{x}} f_\\theta(\\mathbf{x})_k\\) 是第 k 类 logit 对输入的梯度。这意味着 ET3 的更新方向是所有类别梯度的概率加权和——高置信度类别的梯度贡献更大，自然地引导图像向正确分类方向移动。</p>\n<p><strong>扩展至 CLIP 和 VLMs</strong></p>\n<p>对于 CLIP 零样本分类，logits 定义为图像嵌入与文本嵌入的余弦相似度。ET3 使用 ImageNet-21K 的约 21,000 个类别名称作为代理标签集来计算能量，而非仅使用目标任务的少量类别。这种\"宽泛标签集\"策略使得能量景观更加平滑，防御效果更好。</p>\n<p>对于 LVLMs（如 LLaVA），ET3 仅优化 CLIP 视觉编码器的输入图像，优化后的图像直接传递给完整的 VLM 管线。由于 VLM 不参与梯度计算，ET3 的计算开销极低（仅需 2 步 CLIP 前向/反向传播）。</p>\n<p><strong>理论保证</strong></p>\n<p>论文证明了在以下两个条件下，单步 ET3 变换可保证正确分类：</p>\n<ol>\n<li><strong>局部线性</strong>：分类器在防御邻域 \\(\\mathcal{B}_\\epsilon(\\mathbf{x})\\) 内近似线性</li>\n<li><strong>梯度比率条件</strong>：正确类别的能量梯度范数显著大于错误类别，即 \\(C\\|e_{\\hat{y}_t}\\mathbf{g}_{\\hat{y}_t}\\| < \\|e_{y_t}\\mathbf{g}_{y_t}\\|\\)</li>\n</ol>\n<div class=\"key-point\">💡 关键：对抗训练隐式地诱导了更平滑的能量景观和更大的局部线性半径，这正是 ET3 在鲁棒模型（TeCoA、FARE）上效果更好的理论解释。</div>\n<p><strong>与传统方法的区别</strong></p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th style=\"text-align: center;\">需要额外模型</th>\n<th style=\"text-align: center;\">需要重训练</th>\n<th style=\"text-align: center;\">计算开销</th>\n<th style=\"text-align: center;\">可扩展至 VLM</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>对抗训练 (AT)</td>\n<td style=\"text-align: center;\">✗</td>\n<td style=\"text-align: center;\">✓</td>\n<td style=\"text-align: center;\">高（训练时）</td>\n<td style=\"text-align: center;\">困难</td>\n</tr>\n<tr>\n<td>对抗净化 (Diffusion)</td>\n<td style=\"text-align: center;\">✓</td>\n<td style=\"text-align: center;\">✓</td>\n<td style=\"text-align: center;\">极高</td>\n<td style=\"text-align: center;\">困难</td>\n</tr>\n<tr>\n<td>随机平滑 (RS)</td>\n<td style=\"text-align: center;\">✗</td>\n<td style=\"text-align: center;\">✗</td>\n<td style=\"text-align: center;\">高（多次采样）</td>\n<td style=\"text-align: center;\">可行</td>\n</tr>\n<tr>\n<td>TPT/R-TPT</td>\n<td style=\"text-align: center;\">✗</td>\n<td style=\"text-align: center;\">部分</td>\n<td style=\"text-align: center;\">中（prompt tuning）</td>\n<td style=\"text-align: center;\">有限</td>\n</tr>\n<tr>\n<td><strong>ET3</strong></td>\n<td style=\"text-align: center;\"><strong>✗</strong></td>\n<td style=\"text-align: center;\"><strong>✗</strong></td>\n<td style=\"text-align: center;\"><strong>极低（2步梯度）</strong></td>\n<td style=\"text-align: center;\"><strong>✓</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p>ET3 在 14 个零样本分类基准上平均提升鲁棒精度 +8~+11 个百分点，在 LLaVA 图像描述和 VQA 任务上平均提升 +12~+16 个 CIDEr/准确率点（defense-unaware），在自适应攻击下仍保持 +7 个百分点的增益。</p>",
      "quiz": {
        "q": "ET3 防御中能量函数 E(x) 的定义是什么？",
        "options": [
          "交叉熵损失函数的负值",
          "输出 logits 的负 LogSumExp",
          "输入图像像素值的 L2 范数",
          "softmax 概率的熵"
        ],
        "answer": 1,
        "explain": "ET3 将能量定义为 E(x) = -log(Σ_k exp(f_θ(x)_k))，即 logits 的负 LogSumExp，源自将判别式分类器重新解释为能量模型的理论框架。"
      }
    },
    {
      "id": "lfr",
      "num": 7,
      "name": "LFR",
      "fullName": "公平表示学习 (Learning Fair Representations)",
      "year": "2013",
      "org": "Toronto",
      "parent": "—",
      "paperUrl": "https://proceedings.mlr.press/v28/zemel13.html",
      "projectUrl": "",
      "category": "fairness",
      "motivation": "首创通过中间表示空间消除敏感属性",
      "summary": "LFR 提出将个体数据映射到一组可学习原型（prototypes）的概率分布上，通过联合优化统计平等约束、重构误差和分类损失，学习一种\"去敏感化\"的中间表示，使得该表示既保留有用信息又抹除受保护属性信息，从而让任意下游分类器在此表示上自动实现公平决策。",
      "keyPoints": [
        "<strong>原型映射机制</strong>：将每个个体通过 softmax 概率映射到 K 个可学习原型上，形成中间表示向量 \\(\\{M_{n,k}\\}_{k=1}^K\\)",
        "<strong>三项联合目标函数</strong>：\\(L = A_z \\cdot L_z + A_x \\cdot L_x + A_y \\cdot L_y\\)，分别对应公平性、信息保留和分类准确性",
        "<strong>统计平等约束（\\(L_z\\)）</strong>：强制受保护组与非受保护组在每个原型上的平均映射概率相等",
        "<strong>重构损失（\\(L_x\\)）</strong>：确保中间表示保留除受保护属性外的尽可能多的信息",
        "<strong>分类损失（\\(L_y\\)）</strong>：通过原型到标签的线性映射保证预测准确性",
        "<strong>可学习距离度量</strong>：为每个特征维度引入权重 \\(\\alpha_i\\)，且受保护组/非受保护组使用不同权重 \\(\\alpha^+, \\alpha^-\\)",
        "<strong>可组合性</strong>：学到的表示可作为黑盒接口，任何分类器在此表示上均自动公平",
        "<strong>实验数据集</strong>：German Credit、Heritage Health Prize、Communities and Crime"
      ],
      "detail": "<pre><code class=\"language-python\"># LFR 核心算法伪代码\nimport numpy as np\n\ndef lfr_objective(X, S, Y, V, W, alpha_plus, alpha_minus, Az, Ax, Ay):\n    &quot;&quot;&quot;\n    X: 输入数据 (N, D)\n    S: 受保护属性 (N,), 0/1\n    Y: 标签 (N,)\n    V: 原型位置 (K, D)\n    W: 原型分类权重 (K,), 值在[0,1]\n    alpha_plus, alpha_minus: 特征权重 (D,)\n    &quot;&quot;&quot;\n    N, D = X.shape\n    K = V.shape[0]\n\n    # Step 1: 计算映射概率 M_{n,k}\n    M = np.zeros((N, K))\n    for n in range(N):\n        alpha = alpha_plus if S[n] == 1 else alpha_minus\n        for k in range(K):\n            dist = np.sum(alpha * (X[n] - V[k])**2)\n            M[n, k] = np.exp(-dist)\n        M[n] /= M[n].sum()  # softmax 归一化\n\n    # Step 2: 统计平等损失 Lz\n    M_plus = M[S == 1].mean(axis=0)   # 受保护组平均映射\n    M_minus = M[S == 0].mean(axis=0)  # 非受保护组平均映射\n    Lz = np.abs(M_plus - M_minus).sum()\n\n    # Step 3: 重构损失 Lx\n    X_hat = M @ V  # 重构: x_hat_n = sum_k M_{n,k} * v_k\n    Lx = np.sum((X - X_hat)**2)\n\n    # Step 4: 分类损失 Ly (交叉熵)\n    Y_hat = M @ W  # 预测: y_hat_n = sum_k M_{n,k} * w_k\n    Y_hat = np.clip(Y_hat, 1e-7, 1-1e-7)\n    Ly = -np.sum(Y * np.log(Y_hat) + (1-Y) * np.log(1-Y_hat))\n\n    # 总损失\n    L = Az * Lz + Ax * Lx + Ay * Ly\n    return L\n</code></pre>\n<h5>动机与背景</h5>\n<p>传统公平分类方法主要分为两类：<strong>数据篡改策略</strong>（修改训练标签使正标签在两组中比例相等）和<strong>正则化策略</strong>（在分类目标中加入歧视度惩罚项）。这些方法存在根本局限：</p>\n<ol>\n<li>数据篡改方法是临时性的（ad hoc），无法保证对新数据的泛化；</li>\n<li>正则化方法与特定分类器绑定，无法组合使用；</li>\n<li>两者都未考虑<strong>个体公平</strong>——即相似个体应获得相似待遇。</li>\n</ol>\n<p>Dwork et al. (2011) 首次提出通过中间表示实现公平的框架，但其假设距离度量已知且不可学习，也无法泛化到新数据。LFR 正是为解决这些问题而提出。</p>\n<h5>核心机制详解</h5>\n<p><strong>1. 原型映射（Prototype Mapping）</strong></p>\n<p>LFR 定义 K 个原型 \\(\\{v_k\\}_{k=1}^K\\)，每个原型是与输入同维度的向量。个体 \\(x_n\\) 到原型 \\(v_k\\) 的映射概率通过带权距离的 softmax 计算：</p>\n<p>$$M_{n,k} = P(Z=k|x_n) = \\frac{\\exp(-d(x_n, v_k))}{\\sum_{j=1}^K \\exp(-d(x_n, v_j))}$$</p>\n<p>其中距离函数为加权欧氏距离：</p>\n<p>$$d(x_n, v_k) = \\sum_{i=1}^D \\alpha_i (x_{ni} - v_{ki})^2$$</p>\n<div class=\"key-point\">💡 关键：向量 \\(\\{M_{n,k}\\}_{k=1}^K\\) 即为个体 \\(x_n\\) 的\"公平表示\"——它是一个 K 维概率分布，编码了个体信息但抹除了受保护属性。</div>\n<p><strong>2. 统计平等约束（Statistical Parity）</strong></p>\n<p>公平性通过强制两组在原型空间中的分布相同来实现：</p>\n<p>$$L_z = \\sum_{k=1}^K |M_k^+ - M_k^-|$$</p>\n<p>其中 \\(M_k^+ = \\frac{1}{|X_0^+|}\\sum_{n \\in X_0^+} M_{n,k}\\) 是受保护组映射到原型 k 的平均概率。</p>\n<div class=\"warn-box\">⚠️ 注意：当 \\(L_z \\to 0\\) 时，可以证明 \\(Z\\) 与 \\(S\\) 之间的互信息趋近于零，即表示中不包含关于受保护属性的信息。</div>\n<p><strong>3. 重构损失（Information Preservation）</strong></p>\n<p>为确保表示不丢失有用信息，LFR 要求从原型表示能重构原始输入：</p>\n<p>$$L_x = \\sum_{n=1}^N \\|x_n - \\hat{x}_n\\|^2, \\quad \\hat{x}_n = \\sum_{k=1}^K M_{n,k} \\cdot v_k$$</p>\n<p>这使得模型类似于一个带公平约束的自编码器，原型充当\"码本\"角色。</p>\n<p><strong>4. 分类损失（Classification Accuracy）</strong></p>\n<p>每个原型学习一个分类概率 \\(w_k \\in [0,1]\\)，个体的预测通过边际化获得：</p>\n<p>$$\\hat{y}_n = \\sum_{k=1}^K M_{n,k} \\cdot w_k$$</p>\n<p>分类损失为标准交叉熵（公式 10）。</p>\n<div class=\"key-point\">💡 关键性质：当统计平等约束满足时，由于 \\(\\hat{y}_n\\) 是 \\(M_n\\) 和 \\(w\\) 的线性函数，可以证明两组的平均预测概率自动相等，即分类决策也满足公平性。</div>\n<p><strong>5. 分组距离度量学习</strong></p>\n<p>LFR 为受保护组和非受保护组分别学习特征权重 \\(\\alpha^+\\) 和 \\(\\alpha^-\\)，这解决了 Dwork et al. 提出的\"反转问题\"（inversion problem）——不同群体中不同特征可能具有不同的预测意义。</p>\n<h5>训练与推理流程</h5>\n<p><strong>训练阶段</strong>：使用 L-BFGS 或梯度下降联合优化所有参数 \\(\\{v_k, w_k, \\alpha^+, \\alpha^-\\}\\)，最小化总目标 \\(L = A_z L_z + A_x L_x + A_y L_y\\)。超参数 \\(A_z, A_x, A_y\\) 控制三个目标之间的权衡。</p>\n<p><strong>推理阶段</strong>：对新个体 \\(x_{new}\\)，先计算其到各原型的映射概率 \\(M_{new}\\)，然后：\n- 公平表示：直接使用 \\(M_{new}\\) 作为特征输入任意下游分类器；\n- 直接预测：\\(\\hat{y}_{new} = \\sum_k M_{new,k} \\cdot w_k\\)。</p>\n<h5>与传统方法的区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>数据篡改方法</th>\n<th>正则化方法</th>\n<th>LFR</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>可泛化到新数据</td>\n<td>✗</td>\n<td>✓</td>\n<td>✓</td>\n</tr>\n<tr>\n<td>与分类器解耦</td>\n<td>✗</td>\n<td>✗</td>\n<td>✓</td>\n</tr>\n<tr>\n<td>个体公平</td>\n<td>✗</td>\n<td>✗</td>\n<td>✓（相似输入→相似表示）</td>\n</tr>\n<tr>\n<td>学习距离度量</td>\n<td>—</td>\n<td>—</td>\n<td>✓</td>\n</tr>\n<tr>\n<td>群体公平</td>\n<td>✓</td>\n<td>✓</td>\n<td>✓</td>\n</tr>\n</tbody>\n</table></div>\n<p>LFR 的核心优势在于<strong>可组合性</strong>：一旦学到公平表示，任何下游分类器都可以在此表示上训练，无需额外公平约束，实现了\"公平即服务\"的理念。</p>",
      "quiz": {
        "q": "LFR 模型中，统计平等约束 Lz 的直接优化目标是什么？",
        "options": [
          "最小化受保护组与非受保护组的分类准确率差异",
          "最小化两组在每个原型上的平均映射概率之差的绝对值之和",
          "最大化中间表示与受保护属性之间的互信息",
          "最小化两组输入数据的特征分布差异"
        ],
        "answer": 1,
        "explain": "Lz = Σk |M+k - M-k|，直接最小化两组在每个原型上平均映射概率的差异，间接使表示与受保护属性的互信息趋零。"
      }
    },
    {
      "id": "vfae",
      "num": 8,
      "name": "VFAE",
      "fullName": "变分公平自编码器 (Variational Fair Autoencoder)",
      "year": "2015",
      "org": "Amsterdam",
      "parent": "lfr",
      "paperUrl": "https://arxiv.org/abs/1511.00830",
      "projectUrl": "",
      "category": "fairness",
      "motivation": "用变分推断学习与敏感变量解耦的表示",
      "summary": "VFAE 提出了一种基于半监督变分自编码器的公平表示学习方法，通过在先验分布中强制敏感变量 \\(s\\) 与隐变量 \\(z\\) 的统计独立性，并辅以 Maximum Mean Discrepancy (MMD) 正则化匹配不同敏感组的后验分布，在有效去除敏感信息的同时保留对目标标签的预测能力。",
      "keyPoints": [
        "<strong>VAE 框架下的公平表示学习</strong>：将公平性问题建模为学习对敏感变量 \\(s\\) 不变的隐表示 \\(z_1\\)，基于变分自编码器实现端到端训练",
        "<strong>分解先验 (Factorized Prior)</strong>：设计先验 \\(p(z_1, s) = p(z_1)p(s)\\) 强制隐变量与敏感属性的先验独立性",
        "<strong>半监督两层隐变量架构</strong>：引入标签 \\(y\\) 和辅助隐变量 \\(z_2\\)，生成模型为 \\(y, z_2 \\to z_1 \\to x\\)，利用未标注数据提升表示质量",
        "<strong>MMD 正则化</strong>：对不同敏感组的边际后验 \\(q(z_1|s=0)\\) 和 \\(q(z_1|s=1)\\) 施加 MMD 惩罚，防止信息通过标签相关性\"泄露\"到后验中",
        "<strong>Random Fourier Features 加速</strong>：使用随机厨房水槽方法将 MMD 计算从 \\(O(M^2)\\) 降至 \\(O(MD)\\)，其中 \\(D=500\\) 为随机特征维度",
        "<strong>联合训练策略</strong>：当 \\(y\\) 与 \\(s\\) 相关时，联合训练分类器和生成模型（而非分开训练）避免退化表示",
        "<strong>多任务验证</strong>：在公平分类（German/Adult/Health）、域适应（Amazon Reviews）和不变表示学习（Extended Yale B）三类任务上验证有效性"
      ],
      "detail": "<p><img alt=\"VFAE 模型架构图\" src=\"https://arxiv.org/html/1511.00830v2/extracted/figures/model.png\" />\n<em>图：VFAE 的生成模型（左）与推断模型（右）。生成过程：\\(y, z_2 \\to z_1 \\to x\\)，其中 \\(s\\) 仅在解码器中作为输入，先验中与 \\(z_1\\) 独立。推断过程：\\(x, s \\to z_1 \\to y \\to z_2\\)。</em></p>\n<pre><code class=\"language-python\"># VFAE 训练伪代码\n# 输入: 标注数据 (x_l, s_l, y_l), 未标注数据 (x_u, s_u)\n# 超参: alpha (分类权重), beta (MMD 权重)\n\nfor epoch in range(num_epochs):\n    for (x_l, s_l, y_l), (x_u, s_u) in minibatches:\n        # === 标注数据 ELBO (L_s) ===\n        z1_l = encoder_z1(x_l, s_l)          # q(z1|x,s)\n        y_pred = classifier(z1_l)             # q(y|z1)\n        z2_l = encoder_z2(z1_l, y_l)          # q(z2|z1,y)\n        x_recon_l = decoder(z1_l, s_l)        # p(x|z1,s)\n\n        L_s = recon_loss(x_l, x_recon_l) \n              - KL(q(z1|x,s) || p(z1|z2,y)) \n              - KL(q(z2|z1,y) || p(z2))\n\n        # === 未标注数据 ELBO (L_u) ===\n        z1_u = encoder_z1(x_u, s_u)\n        y_marginal = classifier(z1_u)         # q(y|z1) 枚举所有 y\n        # 对所有可能的 y 值求期望\n        L_u = sum_y q(y|z1) * [recon + KL terms for each y]\n\n        # === MMD 正则化 ===\n        z1_all = concat(z1_l, z1_u)\n        s_all = concat(s_l, s_u)\n        z1_s0 = z1_all[s_all == 0]\n        z1_s1 = z1_all[s_all == 1]\n        mmd = compute_mmd_rff(z1_s0, z1_s1, D=500)\n\n        # === 总损失 ===\n        loss = -(L_s + L_u) + alpha * cross_entropy(y_pred, y_l) + beta * mmd\n        optimizer.step(loss)\n</code></pre>\n<p><strong>动机与背景</strong></p>\n<p>在机器学习的公平性研究中，核心挑战是：如何学习一个数据表示，使其不包含关于敏感属性（如性别、种族、年龄）的信息，同时仍然保留足够的信息用于下游预测任务？先前工作 LFR (Zemel et al., 2013) 提出了基于聚类的方法，但其局限在于：(1) 聚类表示无法利用分布式表示的表达能力；(2) 仅匹配一阶矩（均值），无法保证高阶矩的一致性，信息仍可能通过方差等高阶统计量泄露。</p>\n<p>VFAE 的核心洞察是：变分自编码器的概率框架天然适合建模\"不变性\"约束——通过设计先验分布的因子化结构，可以在概率意义上强制独立性。</p>\n<p><strong>核心机制一：分解先验实现先验独立</strong></p>\n<p>VFAE 的生成模型设计为：</p>\n<p>$$p(\\mathbf{x}, \\mathbf{z}_1, \\mathbf{z}_2, \\mathbf{y}, \\mathbf{s}) = p(\\mathbf{s})p(\\mathbf{y})p(\\mathbf{z}_2)p_\\theta(\\mathbf{z}_1|\\mathbf{z}_2, \\mathbf{y})p_\\theta(\\mathbf{x}|\\mathbf{z}_1, \\mathbf{s})$$</p>\n<p>关键设计：先验中 \\(\\mathbf{z}_1\\) 仅依赖于 \\(\\mathbf{z}_2\\) 和 \\(\\mathbf{y}\\)，与 \\(\\mathbf{s}\\) 完全独立。而解码器 \\(p_\\theta(\\mathbf{x}|\\mathbf{z}_1, \\mathbf{s})\\) 接收 \\(\\mathbf{s}\\) 作为输入，这意味着 \\(\\mathbf{s}\\) 对 \\(\\mathbf{x}\\) 的影响完全通过解码器的直接路径解释，\\(\\mathbf{z}_1\\) 无需编码任何关于 \\(\\mathbf{s}\\) 的信息。</p>\n<div class=\"key-point\">💡 关键：将 \\(\\mathbf{s}\\) 同时输入编码器和解码器，使得模型有一条\"捷径\"来解释 \\(\\mathbf{s}\\) 对 \\(\\mathbf{x}\\) 的影响，从而减轻 \\(\\mathbf{z}_1\\) 编码 \\(\\mathbf{s}\\) 信息的压力。</div>\n<p><strong>核心机制二：半监督两层隐变量结构</strong></p>\n<p>为了在去除敏感信息的同时保留标签预测能力，VFAE 采用半监督 VAE 架构：</p>\n<ul>\n<li><strong>推断网络</strong>分解为三部分：</li>\n<li>\\(q_\\phi(\\mathbf{z}_1|\\mathbf{x}, \\mathbf{s})\\)：从输入编码不变表示</li>\n<li>\\(q_\\phi(\\mathbf{y}|\\mathbf{z}_1)\\)：从不变表示预测标签（即分类器）</li>\n<li>\n<p>\\(q_\\phi(\\mathbf{z}_2|\\mathbf{z}_1, \\mathbf{y})\\)：捕获给定 \\(\\mathbf{z}_1\\) 和 \\(\\mathbf{y}\\) 后的残余变异</p>\n</li>\n<li>\n<p><strong>标注数据的 ELBO</strong>：</p>\n</li>\n</ul>\n<p>$$\\mathcal{L}_s = \\mathbb{E}_{q(\\mathbf{z}_1|\\mathbf{x},\\mathbf{s})q(\\mathbf{z}_2|\\mathbf{z}_1,\\mathbf{y})}[\\log p_\\theta(\\mathbf{x}|\\mathbf{z}_1, \\mathbf{s})] - \\text{KL}[q(\\mathbf{z}_1|\\mathbf{x},\\mathbf{s}) \\| p_\\theta(\\mathbf{z}_1|\\mathbf{z}_2, \\mathbf{y})] - \\text{KL}[q(\\mathbf{z}_2|\\mathbf{z}_1,\\mathbf{y}) \\| p(\\mathbf{z}_2)]$$</p>\n<ul>\n<li><strong>未标注数据的 ELBO</strong>：将 \\(\\mathbf{y}\\) 视为缺失变量，对所有可能的 \\(\\mathbf{y}\\) 值求期望：</li>\n</ul>\n<p>$$\\mathcal{L}_u = \\sum_y q_\\phi(\\mathbf{y}=y|\\mathbf{z}_1) \\cdot \\mathcal{L}_s(\\mathbf{x}, \\mathbf{s}, y)$$</p>\n<ul>\n<li><strong>联合训练目标</strong>（Eq. 5）：</li>\n</ul>\n<p>$$\\mathcal{F}_{\\text{VAE}} = \\mathcal{L}_s + \\mathcal{L}_u + \\alpha \\cdot \\log q_\\phi(\\mathbf{y}|\\mathbf{z}_1)$$</p>\n<div class=\"warn-box\">⚠️ 注意：当 \\(\\mathbf{y}\\) 与 \\(\\mathbf{s}\\) 高度相关时（如在公平分类场景中），必须联合训练分类器和生成模型。若分开训练（如 Kingma et al. 2014），分类器可能学到依赖 \\(\\mathbf{s}\\) 的特征，导致表示退化。</div>\n<p><strong>核心机制三：MMD 正则化防止后验信息泄露</strong></p>\n<p>尽管先验独立性提供了归纳偏置，但近似后验 \\(q_\\phi(\\mathbf{z}_1|\\mathbf{s})\\) 仍可能因 \\(\\mathbf{y}\\) 与 \\(\\mathbf{s}\\) 的相关性而保留敏感信息。VFAE 引入 MMD 惩罚直接约束后验：</p>\n<p>$$\\mathcal{F}_{\\text{VFAE}} = \\mathcal{F}_{\\text{VAE}} - \\beta \\cdot \\ell_{\\text{MMD}}(\\mathbf{Z}_{1_{s=0}}, \\mathbf{Z}_{1_{s=1}})$$</p>\n<p>其中 MMD 度量两个分布之间的距离：</p>\n<p>$$\\ell_{\\text{MMD}}(\\mathbf{X}, \\mathbf{X}') = \\frac{1}{N_0^2}\\sum_{n,m}k(\\mathbf{x}_n, \\mathbf{x}_m) + \\frac{1}{N_1^2}\\sum_{n,m}k(\\mathbf{x}'_n, \\mathbf{x}'_m) - \\frac{2}{N_0 N_1}\\sum_{n,m}k(\\mathbf{x}_n, \\mathbf{x}'_m)$$</p>\n<p>使用高斯核 \\(k(x, x') = e^{-\\gamma\\|x-x'\\|^2}\\) 时，MMD 为零当且仅当两个分布完全相同。</p>\n<p><strong>高效计算：Random Fourier Features</strong></p>\n<p>为避免 \\(O(M^2)\\) 的 Gram 矩阵计算，VFAE 使用随机傅里叶特征近似核函数：</p>\n<p>$$\\psi_{\\mathbf{W}}(\\mathbf{x}) = \\sqrt{\\frac{2}{D}} \\cos\\left(\\sqrt{\\frac{2}{\\gamma}} \\mathbf{x}\\mathbf{W} + \\mathbf{b}\\right)$$</p>\n<p>其中 \\(\\mathbf{W} \\in \\mathbb{R}^{K \\times D}\\) 为标准高斯随机矩阵，\\(\\mathbf{b}\\) 为 \\([0, 2\\pi]\\) 均匀随机向量。这将 MMD 计算降至 \\(O(MD)\\) 复杂度，实验中取 \\(D=500\\)。</p>\n<p><strong>与 LFR 的关键区别</strong></p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方面</th>\n<th>LFR (Zemel et al., 2013)</th>\n<th>VFAE</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>表示类型</td>\n<td>聚类（局部表示）</td>\n<td>连续隐变量（分布式表示）</td>\n</tr>\n<tr>\n<td>不变性约束</td>\n<td>匹配一阶矩（聚类比例）</td>\n<td>先验独立 + MMD（匹配所有矩）</td>\n</tr>\n<tr>\n<td>训练方式</td>\n<td>优化组合目标</td>\n<td>变分推断 + ELBO</td>\n</tr>\n<tr>\n<td>半监督</td>\n<td>不支持</td>\n<td>天然支持未标注数据</td>\n</tr>\n<tr>\n<td>生成能力</td>\n<td>无</td>\n<td>可生成新样本</td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>实验验证</strong></p>\n<p>在三个公平分类数据集上（Adult: 45,222 样本；German: 1,000 样本；Health: 147,473 样本），VFAE 相比 LFR 和普通 VAE：\n- 更有效地去除敏感信息（通过 Random Forest 和 Logistic Regression 预测 \\(\\mathbf{s}\\) 的准确率更接近随机水平）\n- MMD 惩罚显著降低了歧视度量（discrimination metric）\n- 在域适应（Amazon Reviews 12 个跨域任务）和不变表示学习（Extended Yale B，准确率 84.6% vs 基线 82%）上同样有效</p>",
      "quiz": {
        "q": "VFAE 中引入 MMD 正则化的主要原因是什么？",
        "options": [
          "加速模型训练收敛",
          "当标签 y 与敏感变量 s 相关时，防止敏感信息通过后验分布泄露到隐表示中",
          "替代 KL 散度项以获得更紧的变分下界",
          "使隐变量 z1 的维度自动选择"
        ],
        "answer": 1,
        "explain": "尽管先验独立性提供了归纳偏置，但当 y 与 s 相关时，近似后验 q(z1|s) 仍可能保留 s 的信息。MMD 直接约束不同敏感组的后验分布相匹配，堵住这一泄露通道。"
      }
    },
    {
      "id": "eqopp",
      "num": 9,
      "name": "EqOpp",
      "fullName": "机会均等 (Equality of Opportunity)",
      "year": "2016",
      "org": "Google/UT Austin",
      "parent": "lfr",
      "paperUrl": "https://proceedings.neurips.cc/paper/2016/hash/6a9659feb1216f14f7384ba499518b38-Abstract.html",
      "projectUrl": "",
      "category": "fairness",
      "motivation": "提出针对正类别的均等机会公平准则",
      "summary": "EqOpp 的核心目标是：提出针对正类别的均等机会公平准则。",
      "keyPoints": [
        "核心动机：提出针对正类别的均等机会公平准则",
        "演化来源：继承或改进自 lfr",
        "代表机构：Google/UT Austin"
      ],
      "detail": "<p>提出针对正类别的均等机会公平准则</p>"
    },
    {
      "id": "arl",
      "num": 10,
      "name": "ARL",
      "fullName": "对抗重加权学习 (Adversarially Reweighted Learning)",
      "year": "2020",
      "org": "Google",
      "parent": "eqopp",
      "paperUrl": "https://proceedings.neurips.cc/paper/2020/hash/07fc15c9d169ee48573edd749d25945d-Abstract.html",
      "projectUrl": "",
      "category": "fairness",
      "motivation": "无人口统计标签下自动识别受损群体",
      "summary": "ARL 提出了一种对抗重加权学习框架，通过训练一个对抗网络自动识别模型表现最差的\"计算可辨识\"子群并对其样本上调权重，在**无需访问受保护人口统计特征**的条件下实现了 Rawlsian Max-Min 公平性，显著优于分布鲁棒优化（DRO）等基线方法。",
      "keyPoints": [
        "<strong>问题设定</strong>：无人口统计标签的公平学习（Fairness without Demographics）——训练和推理时均无受保护群体标签 \\(S\\)",
        "<strong>公平目标</strong>：Rawlsian Max-Min 公平性 \\(h^* = \\arg\\max_h \\min_s U_{D_s}(h)\\)，最大化最差子群的效用",
        "<strong>核心假设</strong>：受保护群体 \\(S\\) 与可观测特征 \\(X\\) 和标签 \\(Y\\) 存在相关性，使得高损失区域\"计算可辨识\"",
        "<strong>对抗框架</strong>：Learner \\(h_\\theta\\) 与 Adversary \\(f_\\phi\\) 构成 minimax 博弈，Adversary 输出样本权重 \\(\\lambda_\\phi(x_i, y_i) \\in [0,1]\\)",
        "<strong>与 DRO 的关键区别</strong>：DRO 关注任意最坏情况分布（易过拟合噪声/离群点），ARL 仅关注由 Adversary 网络\"计算可辨识\"的子群",
        "<strong>实验验证</strong>：在 Adult、LSAC、COMPAS 三个数据集上，ARL 在 AUC(min) 和 AUC(minority) 上均优于 ERM、DRO 和 IPW 基线",
        "<strong>额外发现</strong>：ARL 不仅提升最差子群性能，还同时提升了整体 AUC（约 1pp），打破了公平-效用权衡的传统假设"
      ],
      "detail": "<pre><code>┌─────────────────────────────────────────────────────────┐\n│                    ARL 框架示意图                          │\n│                                                         │\n│   训练数据 (X, Y)                                        │\n│        │                                                │\n│        ├──────────────────┐                             │\n│        ▼                  ▼                             │\n│  ┌──────────┐      ┌──────────────┐                    │\n│  │ Adversary │      │   Learner    │                    │\n│  │  f_φ(X,Y) │      │   h_θ(X)     │                    │\n│  │  →[0,1]   │      │   →预测 Ŷ    │                    │\n│  └─────┬─────┘      └──────┬───────┘                    │\n│        │ λ_φ(样本权重)       │ ℓ(Ŷ,Y)(逐样本损失)        │\n│        └────────┬───────────┘                           │\n│                 ▼                                       │\n│     加权损失 = Σ λ_φ(xi,yi) · ℓ(h_θ(xi), yi)           │\n│                 │                                       │\n│        ┌────────┴────────┐                              │\n│        ▼                 ▼                              │\n│  Learner: min_θ     Adversary: max_φ                    │\n│  (减小加权损失)      (增大加权损失)                        │\n└─────────────────────────────────────────────────────────┘\n</code></pre>\n<p><em>图：ARL 对抗重加权框架——Adversary 网络 f_φ 根据 (X, Y) 为每个样本生成权重 λ，Learner h_θ 在加权损失上最小化，形成 minimax 博弈</em></p>\n<pre><code class=\"language-python\"># ARL 对抗重加权学习 伪代码\n# 输入: 训练数据 D = {(x_i, y_i)}, 学习率 η_θ, η_φ\n# Learner h_θ: 主分类器\n# Adversary f_φ: 权重生成网络, f_φ(x,y) → [0,1]\n\nfor epoch in range(num_epochs):\n    for batch (X, Y) in D:\n        # Step 1: Adversary 生成样本权重\n        raw_weights = f_phi(X, Y)  # sigmoid输出 ∈ [0,1]\n        lambda_weights = raw_weights / sum(raw_weights)  # 归一化为分布\n\n        # Step 2: 计算加权损失\n        losses = cross_entropy(h_theta(X), Y)  # 逐样本损失\n        weighted_loss = sum(lambda_weights * losses)\n\n        # Step 3: 更新 Learner (最小化加权损失)\n        theta = theta - eta_theta * grad(weighted_loss, theta)\n\n        # Step 4: 更新 Adversary (最大化加权损失)\n        phi = phi + eta_phi * grad(weighted_loss, phi)\n</code></pre>\n<h5>动机与背景</h5>\n<p>现实中的机器学习公平性面临一个核心矛盾：<strong>大多数公平性方法需要受保护群体标签（如种族、性别），但出于隐私法规和数据收集限制，这些标签往往不可用</strong>。例如，欧盟 GDPR 严格限制了敏感属性的收集，美国多个州也禁止在信贷决策中使用种族信息。</p>\n<p>在此约束下，先前工作主要采用分布鲁棒优化（DRO）方法，试图优化任意最坏情况分布下的性能。然而，DRO 存在根本性缺陷：</p>\n<div class=\"warn-box\">⚠️ 注意：DRO 优化的是<strong>任意</strong>最坏情况分布，这意味着它可能将大量优化资源花费在噪声离群点上，而非真正的受保护子群。当数据存在标签噪声时，DRO 的性能会显著退化。</div>\n<p>ARL 的核心洞察是：与其优化任意最坏情况，不如聚焦于<strong>计算可辨识</strong>（computationally-identifiable）的高损失区域——即那些可以被一个函数类从输入特征和标签中识别出来的子群。</p>\n<h5>核心机制：对抗重加权</h5>\n<p><strong>1. 计算可辨识性假设</strong></p>\n<p>ARL 的理论基础建立在以下假设上：未观测的受保护群体 \\(S\\) 与可观测特征 \\(X\\) 和标签 \\(Y\\) 之间存在统计相关性。形式化地：</p>\n<p>$$P(S | X, Y) \\neq P(S)$$</p>\n<p>这意味着即使不直接观测 \\(S\\)，也可以通过 \\((X, Y)\\) 的模式间接识别出受保护子群的高损失区域。</p>\n<p><strong>2. Minimax 优化目标</strong></p>\n<p>ARL 将公平学习形式化为一个 minimax 博弈：</p>\n<p>$$J(\\theta, \\phi) = \\min_\\theta \\max_\\phi \\sum_{i=1}^{n} \\lambda_\\phi(x_i, y_i) \\cdot \\ell(h_\\theta(x_i), y_i)$$</p>\n<p>其中：\n- \\(h_\\theta\\)：主分类器（Learner），参数为 \\(\\theta\\)\n- \\(f_\\phi\\)：对抗网络（Adversary），参数为 \\(\\phi\\)，输出 \\(f_\\phi(x_i, y_i) \\in [0,1]\\)\n- \\(\\lambda_\\phi(x_i, y_i) = \\frac{f_\\phi(x_i, y_i)}{\\sum_j f_\\phi(x_j, y_j)}\\)：归一化后的样本权重</p>\n<div class=\"key-point\">💡 关键：Adversary 的作用是找到当前 Learner 表现最差的\"计算可辨识\"区域，并通过上调这些区域样本的权重来迫使 Learner 改善对它们的预测。</div>\n<p><strong>3. Adversary 的设计</strong></p>\n<p>Adversary 网络 \\(f_\\phi\\) 接受 \\((X, Y)\\) 作为输入，输出经 sigmoid 激活的标量权重。论文发现：</p>\n<ul>\n<li><strong>线性 Adversary</strong>（即逻辑回归）在小数据集上效果最佳，因为其容量有限，不会过拟合到单个噪声样本</li>\n<li>非线性 Adversary 在某些设置下可能过拟合，行为退化为类似 DRO 的逐样本上调</li>\n<li>Adversary 同时接收特征 \\(X\\) 和标签 \\(Y\\) 作为输入，这使其能够识别特定 \\((X, Y)\\) 组合下的系统性错误模式</li>\n</ul>\n<p><strong>4. 与 DRO 的形式化对比</strong></p>\n<p>DRO 的目标可以写为：</p>\n<p>$$\\min_\\theta \\max_{\\lambda \\in \\Delta_n} \\sum_{i=1}^{n} \\lambda_i \\cdot \\ell(h_\\theta(x_i), y_i)$$</p>\n<p>其中 \\(\\Delta_n\\) 是 \\(n\\) 维单纯形上的所有分布。关键区别在于：\n- DRO 中 \\(\\lambda\\) 是自由优化变量，可以将所有权重集中在单个最高损失样本上\n- ARL 中 \\(\\lambda_\\phi\\) 受限于 Adversary 网络 \\(f_\\phi\\) 的函数类，只能识别<strong>系统性</strong>的高损失模式</p>\n<p>$$\\text{DRO}: \\lambda^* = \\arg\\max_{\\lambda \\in \\Delta_n} \\quad \\text{vs} \\quad \\text{ARL}: \\lambda^*_\\phi = \\frac{f_\\phi^*(\\cdot)}{\\sum f_\\phi^*(\\cdot)}, \\; f_\\phi \\in \\mathcal{F}$$</p>\n<h5>训练与优化流程</h5>\n<p>ARL 采用交替优化策略：</p>\n<ol>\n<li><strong>固定 Adversary，更新 Learner</strong>：在当前权重分布下最小化加权损失</li>\n<li><strong>固定 Learner，更新 Adversary</strong>：找到使加权损失最大的权重分配</li>\n</ol>\n<p>实践中的关键细节：\n- Learner 和 Adversary 使用不同的学习率（Adversary 通常更小）\n- 权重归一化确保 \\(\\sum \\lambda_i = 1\\)，形成有效的概率分布\n- 训练使用标准 SGD/Adam，无需特殊优化器</p>\n<h5>实验结果与分析</h5>\n<p>在三个标准公平性基准数据集上的结果：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>数据集</th>\n<th>方法</th>\n<th>AUC(avg)</th>\n<th>AUC(min)</th>\n<th>AUC(minority)</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Adult</td>\n<td>ERM</td>\n<td>0.906</td>\n<td>0.870</td>\n<td>0.877</td>\n</tr>\n<tr>\n<td>Adult</td>\n<td>DRO</td>\n<td>0.901</td>\n<td>0.871</td>\n<td>0.892</td>\n</tr>\n<tr>\n<td>Adult</td>\n<td><strong>ARL</strong></td>\n<td><strong>0.907</strong></td>\n<td><strong>0.881</strong></td>\n<td><strong>0.942</strong></td>\n</tr>\n<tr>\n<td>LSAC</td>\n<td>ERM</td>\n<td>0.814</td>\n<td>0.789</td>\n<td>0.793</td>\n</tr>\n<tr>\n<td>LSAC</td>\n<td>DRO</td>\n<td>0.817</td>\n<td>0.795</td>\n<td>0.797</td>\n</tr>\n<tr>\n<td>LSAC</td>\n<td><strong>ARL</strong></td>\n<td><strong>0.823</strong></td>\n<td><strong>0.798</strong></td>\n<td><strong>0.832</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p>关键发现：\n- ARL 在 Adult 数据集上将少数群体 AUC 提升了 <strong>+6.5pp</strong>（0.877→0.942）\n- ARL 同时提升了整体 AUC，打破公平-效用权衡假设\n- 在 COMPAS 数据集上 ARL 无显著提升，原因是该数据集的受保护群体不满足\"计算可辨识性\"条件，且标签噪声严重\n- ARL 优于 IPW（逆概率加权），即使后者拥有完整的群体标签信息</p>\n<div class=\"key-point\">💡 关键：ARL 学到的权重具有可解释性——被误分类的样本被上调权重，且 ARL 自动学会了处理类别不平衡问题（对少数类整体赋予更高权重）。</div>\n<h5>鲁棒性分析</h5>\n<p>论文通过合成实验验证了 ARL 对不同类型偏差的鲁棒性：\n- <strong>表征偏差</strong>（Representation Bias）：少数群体在训练数据中比例不足——ARL 表现稳健\n- <strong>标签偏差</strong>（Label Bias）：少数群体标签被系统性翻转——ARL 对中等程度标签噪声鲁棒，但极端噪声下性能下降\n- <strong>计算可辨识性验证</strong>：通过训练分类器预测群体标签，验证了 Adult/LSAC 中群体可辨识（AUC&gt;0.8），而 COMPAS 中不可辨识（AUC≈0.5）</p>",
      "quiz": {
        "q": "ARL 相比 DRO 的核心优势是什么？",
        "options": [
          "ARL 使用更复杂的神经网络架构，因此拟合能力更强",
          "ARL 通过 Adversary 网络限制了权重分配的函数类，避免过拟合到噪声离群点",
          "ARL 需要访问受保护群体标签，因此信息更充分",
          "ARL 采用了更先进的优化算法，收敛速度更快"
        ],
        "answer": 1,
        "explain": "DRO 允许权重在整个单纯形上自由优化，可能将权重集中在单个噪声样本上；ARL 的权重受限于 Adversary 网络的函数类，只能识别系统性的高损失模式（计算可辨识子群），从而避免过拟合离群点。"
      }
    },
    {
      "id": "silencer",
      "num": 11,
      "name": "Silencer",
      "fullName": "自偏见消除器 (Self-Bias Mitigation)",
      "year": "2026",
      "org": "NeurIPS",
      "parent": "arl",
      "paperUrl": "https://proceedings.neurips.cc/paper_files/paper/2025/hash/bc24200f4ed9a5bbf821c0ad18e605da-Abstract-Conference.html",
      "projectUrl": "",
      "category": "fairness",
      "motivation": "抑制LLM作为评估基准生成器时的自偏见",
      "summary": "Silencer 的核心目标是：抑制LLM作为评估基准生成器时的自偏见。",
      "keyPoints": [
        "核心动机：抑制LLM作为评估基准生成器时的自偏见",
        "演化来源：继承或改进自 arl",
        "代表机构：NeurIPS"
      ],
      "detail": "<p>抑制LLM作为评估基准生成器时的自偏见</p>"
    },
    {
      "id": "lime",
      "num": 12,
      "name": "LIME",
      "fullName": "局部可解释模型无关解释 (Local Interpretable Model-agnostic Explanations)",
      "year": "2016",
      "org": "UW",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/1602.04938",
      "projectUrl": "",
      "category": "interpretability",
      "motivation": "通过局部线性近似解释任意黑盒模型",
      "summary": "LIME 提出了一种模型无关的局部可解释方法，通过在待解释样本邻域内采样并拟合可解释的线性模型来近似任意黑盒模型的局部决策边界，同时提出 SP-LIME 方法选择全局代表性解释集合，使用户能够理解和信任模型预测。",
      "keyPoints": [
        "模型无关（Model-agnostic）：适用于任何分类器，将模型视为黑盒，仅需访问预测函数",
        "局部忠实性（Local Fidelity）：不追求全局近似，而是在单个样本邻域内用简单可解释模型忠实近似复杂模型行为",
        "可解释表示（Interpretable Representations）：将原始特征映射为人类可理解的二值向量（如词是否存在、超像素是否激活）",
        "扰动采样 + 加权拟合：围绕目标样本生成扰动样本，按距离加权，拟合稀疏线性模型",
        "SP-LIME（Submodular Pick）：利用子模函数优化选取全局代表性解释子集，帮助用户全面理解模型行为",
        "支持文本、图像、表格等多种数据类型的解释"
      ],
      "detail": "<p><img alt=\"LIME 核心思想示意图\" src=\"https://ar5iv.labs.arxiv.org/html/1602.04938/assets/x3.png\" />\n<em>图：LIME 解释文本分类器预测的示例。高亮词为对预测贡献最大的特征。</em></p>\n<p><img alt=\"LIME 局部近似直觉\" src=\"https://ar5iv.labs.arxiv.org/html/1602.04938/assets/x1.png\" />\n<em>图：LIME 的核心直觉。粗红色十字为待解释实例，蓝色/粉色背景为黑盒模型的真实决策边界，虚线为 LIME 学到的局部线性解释。采样点大小表示与待解释实例的相似度权重。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># LIME 核心算法 (Algorithm 1)\ndef LIME_explain(instance x, classifier f, num_samples N, kernel_width σ):\n    # 1. 生成可解释表示\n    x' = to_interpretable(x)  # 如文本→词袋二值向量，图像→超像素二值向量\n\n    # 2. 邻域采样\n    Z = []\n    for i in range(N):\n        z'_i = perturb(x')           # 随机关闭部分可解释特征\n        z_i = to_original(z'_i)       # 映射回原始空间\n        weight_i = exp_kernel(x', z'_i, σ)  # 计算距离权重 π_x(z)\n        label_i = f(z_i)             # 获取黑盒模型预测\n        Z.append((z'_i, label_i, weight_i))\n\n    # 3. 拟合加权稀疏线性模型\n    g = weighted_lasso(Z, K)  # K为最大特征数\n    return g  # 返回可解释模型（各特征的权重即为解释）\n</code></pre>\n<h5>动机与背景</h5>\n<p>机器学习模型在实际部署中面临\"信任\"问题：即使模型在测试集上表现优异，用户仍然需要理解<strong>为什么</strong>模型做出某个预测，才能决定是否信任并采纳该预测。传统方法要么只适用于特定模型（如决策树本身可解释），要么试图全局近似复杂模型（往往不够忠实）。LIME 的核心洞察是：<strong>即使全局行为极其复杂的模型，在单个样本的局部邻域内也可以用简单的线性模型忠实近似</strong>。</p>\n<h5>核心机制：局部可解释近似</h5>\n<p>LIME 的目标函数定义为：</p>\n<p>$$\\xi(x) = \\arg\\min_{g \\in G} \\; \\mathcal{L}(f, g, \\pi_x) + \\Omega(g)$$</p>\n<p>其中：\n- \\(f\\) 是待解释的黑盒模型\n- \\(G\\) 是可解释模型族（如线性模型、决策树）\n- \\(\\pi_x(z)\\) 是以 \\(x\\) 为中心的邻域核函数，定义样本权重\n- \\(\\mathcal{L}(f, g, \\pi_x)\\) 度量 \\(g\\) 在 \\(\\pi_x\\) 定义的局部邻域内对 \\(f\\) 的近似忠实度\n- \\(\\Omega(g)\\) 是模型复杂度惩罚（确保解释足够简洁）</p>\n<div class=\"key-point\">💡 关键：LIME 不要求 \\(g\\) 全局忠实于 \\(f\\)，只要求在 \\(x\\) 的局部邻域内忠实。这使得即使 \\(f\\) 极其复杂，\\(g\\) 仍然可以是简单的线性模型。</div>\n<p>具体地，当 \\(G\\) 为线性模型时，局部加权损失为：</p>\n<p>$$\\mathcal{L}(f, g, \\pi_x) = \\sum_{z, z' \\in \\mathcal{Z}} \\pi_x(z) \\left( f(z) - g(z') \\right)^2$$</p>\n<p>其中 \\(\\pi_x(z) = \\exp\\left(-D(x, z)^2 / \\sigma^2\\right)\\) 为指数核函数，\\(D\\) 为距离度量（文本用余弦距离，图像用 L2 距离）。</p>\n<h5>可解释表示与扰动策略</h5>\n<p>LIME 引入<strong>可解释表示</strong>（interpretable representation）\\(x' \\in \\{0, 1\\}^{d'}\\)，将原始高维特征映射为人类可理解的二值向量：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>数据类型</th>\n<th>原始表示</th>\n<th>可解释表示</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>文本</td>\n<td>词嵌入/TF-IDF</td>\n<td>词是否出现（二值向量）</td>\n</tr>\n<tr>\n<td>图像</td>\n<td>像素矩阵</td>\n<td>超像素是否激活（二值向量）</td>\n</tr>\n<tr>\n<td>表格</td>\n<td>连续/离散特征</td>\n<td>特征是否在原始值附近（离散化）</td>\n</tr>\n</tbody>\n</table></div>\n<p>扰动采样通过随机将可解释表示中的部分维度置零实现，然后映射回原始空间（如文本中移除对应词，图像中将对应超像素置灰）。</p>\n<h5>SP-LIME：全局代表性解释选择</h5>\n<p>单个 LIME 解释只能解释一个预测。为帮助用户全面理解模型行为，SP-LIME 提出选择 \\(B\\) 个最具代表性的样本及其解释：</p>\n<p>$$\\text{Pick}(W, I) = \\arg\\max_{V, |V| \\leq B} \\sum_{j=1}^{d'} \\mathbb{1}\\left[\\exists\\, i \\in V : W_{ij} > 0\\right]$$</p>\n<p>其中 \\(W_{ij} = |w_{g_{i,j}}|\\) 为第 \\(i\\) 个样本解释中第 \\(j\\) 个特征的重要性权重绝对值。</p>\n<div class=\"warn-box\">⚠️ 注意：该优化问题是 NP-hard 的（加权集合覆盖问题），但由于目标函数是子模的（submodular）且单调非递减，贪心算法可保证 \\((1 - 1/e)\\) 近似比。</div>\n<h5>与传统方法的区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>模型依赖</th>\n<th>解释范围</th>\n<th>可解释性</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>梯度/显著性图</td>\n<td>需可微模型</td>\n<td>局部</td>\n<td>像素级，难理解</td>\n</tr>\n<tr>\n<td>决策树代理</td>\n<td>模型无关</td>\n<td>全局</td>\n<td>全局近似不忠实</td>\n</tr>\n<tr>\n<td>SHAP（后续工作）</td>\n<td>模型无关</td>\n<td>局部</td>\n<td>基于博弈论</td>\n</tr>\n<tr>\n<td><strong>LIME</strong></td>\n<td><strong>模型无关</strong></td>\n<td><strong>局部</strong></td>\n<td><strong>人类可理解的稀疏特征</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p>LIME 的核心优势在于：(1) 完全模型无关，只需黑盒预测接口；(2) 使用人类可理解的可解释表示而非原始特征；(3) 通过局部忠实性在简洁性和准确性之间取得平衡。</p>\n<h5>实验验证</h5>\n<p>论文在文本分类（20 Newsgroups）和图像分类（ImageNet + Google Inception）上验证了 LIME 的有效性：\n- <strong>信任单个预测</strong>：用户通过 LIME 解释能识别出模型利用了虚假相关（如通过邮件头而非内容分类）\n- <strong>模型选择</strong>：非专家用户借助 LIME 解释能选出真正泛化更好的模型，优于仅看准确率\n- <strong>特征工程</strong>：用户通过 SP-LIME 识别出数据集中的噪声特征，移除后模型性能提升</p>",
      "quiz": {
        "q": "LIME 中邻域核函数 π_x(z) 的作用是什么？",
        "options": [
          "控制可解释模型的复杂度上限",
          "决定采样点对局部线性模型拟合的权重，距离越近权重越大",
          "用于计算黑盒模型的梯度信息",
          "选择全局代表性样本子集"
        ],
        "answer": 1,
        "explain": "π_x(z) = exp(-D(x,z)²/σ²) 是指数核函数，使得距离待解释样本 x 越近的扰动样本在拟合局部线性模型时获得越大的权重，从而保证解释的局部忠实性。"
      }
    },
    {
      "id": "shap",
      "num": 13,
      "name": "SHAP",
      "fullName": "博弈论特征归因 (SHapley Additive exPlanations)",
      "year": "2017",
      "org": "UW",
      "parent": "lime",
      "paperUrl": "https://proceedings.neurips.cc/paper/2017/hash/8a20a862115ef7d44bc9700354440003-Abstract.html",
      "projectUrl": "",
      "category": "interpretability",
      "motivation": "基于Shapley值提供统一的特征贡献解释",
      "summary": "SHAP 提出\"加性特征归因方法\"统一框架，证明 Shapley 值是唯一同时满足局部准确性、缺失性和一致性三条公理的解，并给出 Kernel SHAP（模型无关）和 Deep SHAP（深度网络专用）等高效近似算法，为任意黑盒模型的单样本预测提供具有博弈论保证的特征重要性解释。",
      "keyPoints": [
        "定义\"加性特征归因方法\"类（Definition 1）：解释模型 \\(g(z') = \\phi_0 + \\sum_{i=1}^{M} \\phi_i z'_i\\)，统一 LIME、DeepLIFT、LRP、Shapley regression values、Shapley sampling values、QII 六种方法",
        "唯一性定理（Theorem 1）：在加性特征归因框架下，同时满足 Local Accuracy、Missingness、Consistency 三条性质的解唯一，即 Shapley 值",
        "SHAP 值定义：\\(\\phi_i = \\sum_{S \\subseteq F \\setminus \\{i\\}} \\frac{|S|!(M-|S|-1)!}{M!} [f_x(S \\cup \\{i\\}) - f_x(S)]\\)，其中 \\(f_x(S) = E[f(x) | x_S]\\)",
        "Kernel SHAP（Theorem 2）：证明 LIME 框架在特定核函数 \\(\\pi_{x'}(z') = \\frac{M-1}{\\binom{M}{|z'|}|z'|(M-|z'|)}\\)、平方损失、零正则化下恢复精确 Shapley 值",
        "Deep SHAP：利用 DeepLIFT 反向传播规则递归组合各层 SHAP 值，实现深度网络的高效近似归因",
        "模型特定方法：Linear SHAP（\\(\\phi_i = w_i(x_i - E[x_i])\\)）、Max SHAP（\\(O(M^2)\\) 复杂度）、Low-Order SHAP（低阶交互近似）"
      ],
      "detail": "<p><img alt=\"SHAP 核心框架：Shapley 核权重与 Deep SHAP 组合规则\" src=\"https://ar5iv.labs.arxiv.org/html/1705.07874/assets/x2.png\" />\n<em>图：(A) Shapley 核权重按联盟大小对称分布，与启发式核显著不同；(B) Deep SHAP 利用网络组合结构递归反向传播 SHAP 值</em></p>\n<p><strong>算法伪代码 — Kernel SHAP 估计流程：</strong></p>\n<pre><code class=\"language-python\"># Kernel SHAP: 通过加权线性回归估计 SHAP 值\ndef kernel_shap(f, x, M, num_samples):\n    &quot;&quot;&quot;\n    f: 原始模型\n    x: 待解释样本\n    M: 特征数量\n    num_samples: 采样联盟数\n    &quot;&quot;&quot;\n    phi_0 = E[f(x)]  # 基线值（模型在训练集上的期望输出）\n\n    # 1. 采样二值向量 z' ∈ {0,1}^M（排除全0和全1）\n    Z = sample_coalitions(M, num_samples)\n\n    # 2. 对每个 z'，构造映射样本 h_x(z') 并计算模型输出\n    y = []\n    weights = []\n    for z_prime in Z:\n        x_masked = map_to_original(z_prime, x)  # 缺失特征用条件期望填充\n        y.append(f(x_masked))\n        # Shapley 核权重\n        s = sum(z_prime)\n        w = (M - 1) / (comb(M, s) * s * (M - s))\n        weights.append(w)\n\n    # 3. 加权最小二乘回归求解 φ\n    # min_φ Σ_z' π(z') [f(h_x(z')) - (φ_0 + Σ φ_i z'_i)]²\n    phi = weighted_linear_regression(Z, y, weights)\n\n    return phi  # φ_1, ..., φ_M 即为各特征的 SHAP 值\n</code></pre>\n<h5>动机与背景</h5>\n<p>随着机器学习模型复杂度不断提升（深度网络、集成方法等），模型预测的可解释性成为关键需求。2017 年前已有多种解释方法被独立提出——LIME 通过局部线性近似解释、DeepLIFT/LRP 通过反向传播归因、Shapley regression values 通过博弈论分配——但这些方法之间缺乏统一的理论联系，用户难以判断何种方法更优、各方法的理论保证是什么。</p>\n<p>SHAP 的核心动机是：<strong>能否找到一个统一框架，将这些方法纳入同一类别，并从公理化角度确定最优解？</strong></p>\n<h5>加性特征归因方法的统一框架</h5>\n<p>SHAP 首先定义了\"加性特征归因方法\"（Additive Feature Attribution Methods）：</p>\n<p>$$g(z') = \\phi_0 + \\sum_{i=1}^{M} \\phi_i z'_i, \\quad z' \\in \\{0,1\\}^M$$</p>\n<p>其中 \\(z'\\) 是简化输入空间中的二值向量，\\(z'_i = 1\\) 表示第 \\(i\\) 个特征\"存在\"，\\(\\phi_i \\in \\mathbb{R}\\) 是第 \\(i\\) 个特征的归因值。论文证明 LIME、DeepLIFT、LRP、Shapley regression values、Shapley sampling values 和 QII 都属于此类。</p>\n<div class=\"key-point\">💡 关键：这一统一视角揭示了看似不同的方法实际上都在求解同一形式的线性解释模型，区别仅在于如何确定 \\(\\phi_i\\) 的值。</div>\n<h5>三条公理与唯一性定理</h5>\n<p>论文提出三条期望性质：</p>\n<ol>\n<li>\n<p><strong>Local Accuracy（局部准确性）</strong>：解释模型在原始输入处的输出等于原模型输出：\n$$f(x) = g(x') = \\phi_0 + \\sum_{i=1}^{M} \\phi_i$$</p>\n</li>\n<li>\n<p><strong>Missingness（缺失性）</strong>：缺失的特征不应有归因值：\n$$x'_i = 0 \\Rightarrow \\phi_i = 0$$</p>\n</li>\n<li>\n<p><strong>Consistency（一致性）</strong>：若某特征在新模型中的边际贡献不低于旧模型，则其归因值不应降低：\n$$f'_x(S \\cup \\{i\\}) - f'_x(S) \\geq f_x(S \\cup \\{i\\}) - f_x(S), \\forall S \\subseteq F \\setminus \\{i\\} \\Rightarrow \\phi_i(f', x) \\geq \\phi_i(f, x)$$</p>\n</li>\n</ol>\n<p><strong>Theorem 1</strong> 证明：在加性特征归因方法类中，同时满足以上三条性质的解唯一，即 Shapley 值：</p>\n<p>$$\\phi_i(f, x) = \\sum_{S \\subseteq F \\setminus \\{i\\}} \\frac{|S|!(M - |S| - 1)!}{M!} \\left[ f_x(S \\cup \\{i\\}) - f_x(S) \\right]$$</p>\n<p>其中 \\(f_x(S) = E[f(x) | x_S]\\) 表示给定特征子集 \\(S\\) 的值后模型输出的条件期望。</p>\n<div class=\"warn-box\">⚠️ 注意：精确计算 SHAP 值需要遍历所有 \\(2^M\\) 个特征子集，复杂度为 \\(O(2^M)\\)，因此实际应用中必须使用近似方法。</div>\n<h5>Kernel SHAP：将 LIME 与 Shapley 值统一</h5>\n<p>Kernel SHAP 是论文最重要的算法贡献之一。它证明（Theorem 2）：当 LIME 的三个自由参数取特定值时，其解恰好等于 Shapley 值：</p>\n<ul>\n<li><strong>损失函数</strong>：平方损失 \\(L(f, g, \\pi_{x'}) = \\sum_{z'} \\pi_{x'}(z') [f(h_x(z')) - g(z')]^2\\)</li>\n<li><strong>核函数</strong>：Shapley 核 \\(\\pi_{x'}(z') = \\frac{(M-1)}{\\binom{M}{|z'|} \\cdot |z'| \\cdot (M - |z'|)}\\)</li>\n<li><strong>正则化</strong>：\\(\\Omega = 0\\)</li>\n</ul>\n<p>Shapley 核的直觉是：<strong>越接近全空或全满的联盟（\\(|z'|\\) 接近 0 或 \\(M\\)）权重越大</strong>，因为这些联盟提供了关于单个特征边际贡献最清晰的信息。这与 LIME 原始使用的指数核或余弦核形成鲜明对比。</p>\n<p>在实践中，Kernel SHAP 通过采样联盟子集并求解加权最小二乘问题来近似 SHAP 值，既保留了 LIME 的模型无关性，又获得了 Shapley 值的理论保证。</p>\n<h5>Deep SHAP：深度网络的组合近似</h5>\n<p>对于深度神经网络，Kernel SHAP 的采样效率不够高。Deep SHAP 利用网络的层次组合结构，将整体 SHAP 值分解为各组件 SHAP 值的递归组合：</p>\n<p>$$m_{x_j f_3} = \\frac{\\phi_i(f_3, x)}{x_j - E[x_j]}$$</p>\n<p>$$m_{y_i f_3} = \\sum_{j=1}^{2} m_{y_i f_j} \\cdot m_{x_j f_3} \\quad \\text{(链式法则)}$$</p>\n<p>$$\\phi_i(f_3, y) \\approx m_{y_i f_3} \\cdot (y_i - E[y_i]) \\quad \\text{(线性近似)}$$</p>\n<p>Deep SHAP 的核心思想是：\n1. 对网络中每个简单组件（线性层、激活函数、max pooling）解析计算局部 SHAP 值\n2. 利用 DeepLIFT 风格的反向传播规则将各层的乘子（multiplier）递归组合\n3. 最终得到输入特征对输出的 SHAP 值近似</p>\n<div class=\"key-point\">💡 关键：与原始 DeepLIFT 不同，Deep SHAP 不需要启发式选择线性化规则，而是从各组件的 Shapley 值推导出有效的线性化方式。例如对 max 函数，Deep SHAP 的归因优于 DeepLIFT 的启发式规则。</div>\n<h5>与传统方法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>理论保证</th>\n<th>模型依赖</th>\n<th>计算复杂度</th>\n<th>统一框架</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>LIME</td>\n<td>无公理保证</td>\n<td>模型无关</td>\n<td>中等</td>\n<td>✗</td>\n</tr>\n<tr>\n<td>DeepLIFT</td>\n<td>满足 Local Accuracy + Missingness</td>\n<td>深度网络</td>\n<td>快</td>\n<td>✗</td>\n</tr>\n<tr>\n<td>Shapley regression</td>\n<td>满足全部三条</td>\n<td>模型无关</td>\n<td>\\(O(2^M)\\)</td>\n<td>✗</td>\n</tr>\n<tr>\n<td><strong>Kernel SHAP</strong></td>\n<td><strong>满足全部三条</strong></td>\n<td><strong>模型无关</strong></td>\n<td><strong>可控采样</strong></td>\n<td><strong>✓</strong></td>\n</tr>\n<tr>\n<td><strong>Deep SHAP</strong></td>\n<td><strong>近似满足三条</strong></td>\n<td><strong>深度网络</strong></td>\n<td><strong>快（反向传播）</strong></td>\n<td><strong>✓</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p>实验表明：(1) Kernel SHAP 在保持理论保证的同时，计算效率优于经典 Shapley sampling；(2) Deep SHAP 在 MNIST 数字识别任务上的归因质量优于原始 DeepLIFT，通过遮蔽实验验证了更好的 Shapley 近似带来更准确的特征重要性排序。</p>",
      "quiz": {
        "q": "SHAP 框架中 Theorem 1 证明 Shapley 值是唯一解所依赖的三条性质是什么？",
        "options": [
          "Local Accuracy、Missingness、Linearity",
          "Local Accuracy、Missingness、Consistency",
          "Completeness、Symmetry、Consistency",
          "Efficiency、Dummy、Additivity"
        ],
        "answer": 1,
        "explain": "Theorem 1 证明在加性特征归因方法类中，同时满足 Local Accuracy（解释模型在原输入处等于原模型输出）、Missingness（缺失特征归因为零）和 Consistency（边际贡献不减则归因不减）三条性质的唯一解是 Shapley 值。选项 C/D 是经典 Shapley 值的博弈论公理，但论文重新表述为更适合机器学习场景的三条等价性质。"
      }
    },
    {
      "id": "gradcam",
      "num": 14,
      "name": "Grad-CAM",
      "fullName": "梯度加权类激活映射 (Gradient-weighted Class Activation Mapping)",
      "year": "2017",
      "org": "Georgia Tech",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/1610.02391",
      "projectUrl": "",
      "category": "interpretability",
      "motivation": "可视化CNN关注的图像区域实现视觉解释",
      "summary": "Grad-CAM 通过对最后一个卷积层的特征图梯度进行全局平均池化得到类别重要性权重，生成类别判别性热力图，将 CAM 推广到任意 CNN 架构（无需修改网络结构或重新训练），实现对分类、描述生成、VQA 等多种任务的视觉解释。",
      "keyPoints": [
        "<strong>通用可视化方法</strong>：适用于任意含卷积层的 CNN（VGG、ResNet、captioning、VQA 模型），无需架构修改或重训练",
        "<strong>核心公式</strong>：对目标类别得分关于最后卷积层特征图的梯度做全局平均池化，得到通道重要性权重 \\(\\alpha_k^c\\)",
        "<strong>类别判别性热力图</strong>：\\(L_{\\text{Grad-CAM}}^c = \\text{ReLU}(\\sum_k \\alpha_k^c A^k)\\)，ReLU 保留正影响区域",
        "<strong>Guided Grad-CAM</strong>：将 Grad-CAM 上采样后与 Guided Backpropagation 逐元素相乘，兼具高分辨率和类别判别性",
        "<strong>严格推广 CAM</strong>：证明当网络使用 GAP+softmax 结构时，Grad-CAM 权重与 CAM 权重等价（相差常数因子）",
        "<strong>弱监督定位</strong>：在 ILSVRC-15 弱监督定位任务上超越 CAM 等先前方法",
        "<strong>人类信任评估</strong>：通过 AMT 人类实验验证 Grad-CAM 帮助用户辨别更可靠的模型",
        "<strong>忠实性验证</strong>：与遮挡图的秩相关系数达 0.261，高于 Guided Backpropagation (0.168) 和 CAM (0.208)"
      ],
      "detail": "<p><img alt=\"Grad-CAM 框架总览\" src=\"https://ar5iv.labs.arxiv.org/html/1610.02391v4/assets/x2.png\" />\n<em>图：Grad-CAM 方法概览。对任意 CNN 模型，计算目标类别得分对最后卷积层的梯度，经全局平均池化得到权重，加权求和后通过 ReLU 生成类别判别性热力图。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># Grad-CAM 核心计算流程\ndef grad_cam(model, image, target_class):\n    # 1. 前向传播，获取最后卷积层特征图 A^k 和目标类别得分 y^c\n    features = model.forward_to_last_conv(image)  # A^k, shape: [K, u, v]\n    score = model.forward_from_conv(features)      # y^c (target class score)\n\n    # 2. 反向传播，计算梯度 ∂y^c/∂A^k\n    score[target_class].backward()\n    gradients = features.grad  # shape: [K, u, v]\n\n    # 3. 全局平均池化梯度，得到通道重要性权重\n    alpha = gradients.mean(dim=(1, 2))  # α_k^c = (1/Z) Σ_i Σ_j ∂y^c/∂A_{ij}^k\n\n    # 4. 加权组合特征图 + ReLU\n    cam = ReLU(sum(alpha[k] * features[k] for k in range(K)))\n\n    # 5. 上采样到输入图像尺寸\n    cam = upsample(cam, size=image.shape)\n    return cam\n\n# Guided Grad-CAM = pointwise_multiply(Guided_Backprop, upsample(Grad-CAM))\n</code></pre>\n<h5>动机与背景</h5>\n<p>深度 CNN 在图像分类、目标检测等任务上取得了突破性进展，但其\"黑箱\"特性使得模型决策难以解释。此前的可视化方法存在两类缺陷：</p>\n<ol>\n<li><strong>像素级梯度方法</strong>（Guided Backpropagation、Deconvolution）：生成高分辨率可视化，但<strong>缺乏类别判别性</strong>——对不同类别生成几乎相同的可视化结果。</li>\n<li><strong>CAM (Class Activation Mapping)</strong>：具有类别判别性，但<strong>要求特定网络结构</strong>（全局平均池化直接接 softmax），不适用于含全连接层的 VGG、多模态 VQA 模型等。</li>\n</ol>\n<p>Grad-CAM 的核心动机是：<strong>设计一种通用的、类别判别性的可视化方法，适用于任意基于 CNN 的模型架构，无需修改网络或重新训练。</strong></p>\n<h5>核心机制</h5>\n<p><strong>Step 1：计算神经元重要性权重</strong></p>\n<p>对于目标类别 \\(c\\)，首先计算类别得分 \\(y^c\\)（softmax 之前的 logit）对最后卷积层第 \\(k\\) 个特征图 \\(A^k\\) 中每个空间位置 \\((i,j)\\) 的梯度，然后进行全局平均池化：</p>\n<p>$$\\alpha_k^c = \\frac{1}{Z}\\sum_i\\sum_j \\frac{\\partial y^c}{\\partial A_{ij}^k}$$</p>\n<p>其中 \\(Z = u \\times v\\) 是特征图的空间像素数。直觉上，\\(\\alpha_k^c\\) 衡量了第 \\(k\\) 个特征图对类别 \\(c\\) 预测的整体重要性——梯度越大，该特征图对目标类别的贡献越大。</p>\n<div class=\"key-point\">💡 关键：这里使用全局平均池化而非全局最大池化，实验表明前者效果更好，因为它捕获了特征图对类别得分的整体贡献而非仅关注最强响应。</div>\n<p><strong>Step 2：生成类别判别性定位图</strong></p>\n<p>将重要性权重与对应特征图进行加权线性组合，再通过 ReLU 激活：</p>\n<p>$$L_{\\text{Grad-CAM}}^c = \\text{ReLU}\\left(\\sum_k \\alpha_k^c A^k\\right)$$</p>\n<p>ReLU 的作用是仅保留对目标类别有<strong>正向影响</strong>的区域（即增加这些像素强度会提升 \\(y^c\\)），负值区域通常属于图像中的其他类别。结果是一个与最后卷积层特征图同尺寸的粗粒度热力图（如 VGG 的 14×14）。</p>\n<p><strong>Step 3：Guided Grad-CAM（高分辨率类别判别性可视化）</strong></p>\n<p>为了同时获得高分辨率和类别判别性，将 Grad-CAM 热力图上采样到输入图像分辨率后，与 Guided Backpropagation 的结果逐元素相乘：</p>\n<p>$$L_{\\text{Guided Grad-CAM}}^c = L_{\\text{Guided BP}} \\odot \\text{Upsample}(L_{\\text{Grad-CAM}}^c)$$</p>\n<p>这样既保留了 Guided Backpropagation 的细粒度像素级细节，又通过 Grad-CAM 的空间掩码实现了类别选择性。</p>\n<h5>Grad-CAM 严格推广 CAM 的证明</h5>\n<p>论文严格证明了 Grad-CAM 是 CAM 的推广。对于 CAM 要求的 GAP+线性分类器结构：</p>\n<p>$$Y^c = \\sum_k w_k^c \\cdot F^k, \\quad F^k = \\frac{1}{Z}\\sum_i\\sum_j A_{ij}^k$$</p>\n<p>通过链式法则可得 \\(w_k^c = \\sum_i\\sum_j \\frac{\\partial Y^c}{\\partial A_{ij}^k}\\)，这与 Grad-CAM 的 \\(\\alpha_k^c\\) 仅差一个常数因子 \\(1/Z\\)（在可视化归一化时被消除）。因此 Grad-CAM 在 CAM 适用的架构上等价于 CAM，同时还能推广到任意复杂的 CNN 架构。</p>\n<h5>与传统方法的区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th style=\"text-align: center;\">类别判别性</th>\n<th style=\"text-align: center;\">高分辨率</th>\n<th style=\"text-align: center;\">通用架构</th>\n<th style=\"text-align: center;\">无需重训练</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Guided Backpropagation</td>\n<td style=\"text-align: center;\">✗</td>\n<td style=\"text-align: center;\">✓</td>\n<td style=\"text-align: center;\">✓</td>\n<td style=\"text-align: center;\">✓</td>\n</tr>\n<tr>\n<td>Deconvolution</td>\n<td style=\"text-align: center;\">✗</td>\n<td style=\"text-align: center;\">✓</td>\n<td style=\"text-align: center;\">✓</td>\n<td style=\"text-align: center;\">✓</td>\n</tr>\n<tr>\n<td>CAM</td>\n<td style=\"text-align: center;\">✓</td>\n<td style=\"text-align: center;\">✗</td>\n<td style=\"text-align: center;\">✗ (需GAP+softmax)</td>\n<td style=\"text-align: center;\">✗ (需修改架构)</td>\n</tr>\n<tr>\n<td><strong>Grad-CAM</strong></td>\n<td style=\"text-align: center;\">✓</td>\n<td style=\"text-align: center;\">✗ (粗粒度)</td>\n<td style=\"text-align: center;\">✓</td>\n<td style=\"text-align: center;\">✓</td>\n</tr>\n<tr>\n<td><strong>Guided Grad-CAM</strong></td>\n<td style=\"text-align: center;\">✓</td>\n<td style=\"text-align: center;\">✓</td>\n<td style=\"text-align: center;\">✓</td>\n<td style=\"text-align: center;\">✓</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"warn-box\">⚠️ 注意：Grad-CAM 本身生成的是粗粒度热力图（与最后卷积层特征图同尺寸），需要通过与 Guided Backpropagation 结合才能获得高分辨率的类别判别性可视化。</div>\n<h5>实验验证</h5>\n<ol>\n<li><strong>弱监督定位</strong>：在 ILSVRC-15 验证集上，Grad-CAM (VGG-16) 的定位错误率为 56.51%，优于 CAM 需要修改架构后的结果。</li>\n<li><strong>人类信任实验</strong>：AMT 实验中，Guided Grad-CAM 使人类能以 61.23% 的准确率区分不同类别的可视化（vs Guided BP 的 44.44%），并能识别更可靠的模型（VGG-16 vs AlexNet 的可靠性评分 +1.27 vs +1.00）。</li>\n<li><strong>忠实性</strong>：与遮挡图的秩相关系数为 0.261，显著优于 Guided Backpropagation (0.168) 和 CAM (0.208)。</li>\n<li><strong>对抗鲁棒性</strong>：Grad-CAM 能揭示对抗样本中网络关注区域的变化，帮助理解对抗攻击机制。</li>\n<li><strong>数据集偏差识别</strong>：通过 Grad-CAM 发现模型利用背景等虚假相关进行预测，指导数据集去偏。</li>\n</ol>",
      "quiz": {
        "q": "Grad-CAM 相比 CAM 的核心优势是什么？",
        "options": [
          "生成更高分辨率的可视化热力图",
          "适用于任意 CNN 架构，无需修改网络结构或重新训练",
          "计算速度更快，不需要反向传播",
          "不需要选择目标类别即可生成可视化"
        ],
        "answer": 1,
        "explain": "CAM 要求网络必须使用 GAP+softmax 结构，而 Grad-CAM 通过梯度的全局平均池化获得等价权重，可应用于任意含卷积层的 CNN 架构，无需架构修改或重训练。"
      }
    },
    {
      "id": "cbm",
      "num": 15,
      "name": "CBM",
      "fullName": "概念瓶颈模型 (Concept Bottleneck Models)",
      "year": "2020",
      "org": "Stanford",
      "parent": "lime",
      "paperUrl": "https://proceedings.mlr.press/v119/koh20a.html",
      "projectUrl": "",
      "category": "interpretability",
      "motivation": "嵌入人类概念层实现可干预的透明预测",
      "summary": "CBM 提出在神经网络中间层强制对齐人类可理解的高层概念（如\"骨刺\"、\"翅膀颜色\"），使模型预测完全通过概念瓶颈层传递，从而实现可解释性和测试时人工干预纠错，在保持任务精度的同时支持人机协作。",
      "keyPoints": [
        "<strong>概念瓶颈架构</strong>：模型分为 \\(g: x \\to \\hat{c}\\)（输入→概念）和 \\(f: \\hat{c} \\to \\hat{y}\\)（概念→目标）两阶段，预测完全通过概念层传递",
        "<strong>四种训练策略</strong>：Independent（独立训练 f 和 g）、Sequential（先训 g 再训 f）、Joint（联合优化加权损失）、Standard（忽略概念的端到端基线）",
        "<strong>测试时概念干预</strong>：领域专家可在推理时修正错误概念预测，显著提升任务精度（如 OAI 上干预 2 个概念即可将 RMSE 从 &gt;0.4 降至 ≈0.3）",
        "<strong>概念精度优于事后探测</strong>：瓶颈模型的概念精度显著高于对标准模型做线性探测（CUB 上 F1: 0.92 vs 0.77）",
        "<strong>鲁棒性优势</strong>：当概念与虚假相关（如背景）解耦时，瓶颈模型对分布偏移更鲁棒",
        "<strong>两个应用场景</strong>：膝关节骨关节炎 X 光分级（OAI, k=10 概念）和细粒度鸟类识别（CUB, k=112 概念, 200 类）"
      ],
      "detail": "<p><img alt=\"CBM 概念瓶颈模型架构示意图\" src=\"https://proceedings.mlr.press/v119/koh20a/koh20a-Figure1-1.png\" />\n<em>图：概念瓶颈模型在两个任务上的示意。上方为骨关节炎 X 光分级（输入→临床概念→KLG 等级），下方为鸟类识别（输入→视觉属性→物种）。</em></p>\n<h5>动机与背景</h5>\n<p>深度学习模型虽然在医学影像、细粒度识别等任务上表现优异，但其\"黑箱\"特性严重限制了在高风险场景中的部署。现有可解释性方法（如 TCAV、Network Dissection）主要做<strong>事后分析</strong>——从已训练好的模型中探测概念，但这种方式：\n1. 概念精度较低（线性探测难以准确恢复概念）\n2. 无法支持干预（即使找到与概念相关的神经元组合，也不清楚如何修改激活来改变单一概念的预测）</p>\n<p>CBM 的核心洞察是：如果任务本身就是通过一组标准概念来定义的（如\"骨关节炎由骨刺、关节间隙变窄等标志判定\"），那么直接将这些概念作为模型的中间表示，既能保证可解释性，又能支持人工干预。</p>\n<h5>模型形式化</h5>\n<p>给定输入 \\(x \\in \\mathbb{R}^d\\)，目标 \\(y \\in \\mathbb{R}\\)，概念向量 \\(c \\in \\mathbb{R}^k\\)，CBM 定义为：</p>\n<p>$$\\hat{y} = f(g(x)), \\quad \\text{其中} \\quad \\hat{c} = g(x) \\in \\mathbb{R}^k$$</p>\n<p>模型的预测完全通过概念瓶颈 \\(\\hat{c}\\) 传递。训练时同时优化概念损失和任务损失。</p>\n<p><strong>四种训练变体的损失函数：</strong></p>\n<ol>\n<li><strong>Independent</strong>：分别独立优化\n$$\\hat{g} = \\arg\\min_g \\sum_{i,j} L_{C_j}(g_j(x^{(i)}); c_j^{(i)}), \\quad \\hat{f} = \\arg\\min_f \\sum_i L_Y(f(c^{(i)}); y^{(i)})$$</li>\n</ol>\n<div class=\"key-point\">💡 关键：Independent 的 \\(f\\) 在训练时使用<strong>真实概念</strong> \\(c\\)，但测试时使用<strong>预测概念</strong> \\(\\hat{c}\\)，存在 train-test mismatch。</div>\n<ol>\n<li>\n<p><strong>Sequential</strong>：先训练 \\(\\hat{g}\\)，再用 \\(\\hat{g}(x)\\) 的输出训练 \\(\\hat{f}\\)，消除了 mismatch。</p>\n</li>\n<li>\n<p><strong>Joint</strong>：联合优化加权目标\n$$\\hat{f}, \\hat{g} = \\arg\\min_{f,g} \\sum_i \\left[ L_Y(f(g(x^{(i)})); y^{(i)}) + \\lambda \\sum_j L_{C_j}(g_j(x^{(i)}); c_j^{(i)}) \\right]$$</p>\n</li>\n</ol>\n<div class=\"warn-box\">⚠️ 注意：\\(\\lambda\\) 控制概念精度与任务精度的权衡。\\(\\lambda \\to 0\\) 退化为 Standard 模型，\\(\\lambda \\to \\infty\\) 等价于 Sequential。</div>\n<ol>\n<li><strong>Standard</strong>：忽略概念，直接端到端优化 \\(L_Y\\)。</li>\n</ol>\n<h5>实现方式</h5>\n<p>将标准深度网络（如 Inception-v3）的某一层调整为 \\(k\\) 个神经元，使其与概念数量匹配。对于分类任务，\\(g(x)\\) 输出概念 logits \\(\\hat{\\ell} \\in \\mathbb{R}^k\\)，通过 sigmoid 转为概率：\\(P(\\hat{c}_j = 1) = \\sigma(\\hat{\\ell}_j)\\)。</p>\n<pre><code class=\"language-python\"># CBM 概念瓶颈模型伪代码\nclass ConceptBottleneckModel:\n    def __init__(self, backbone, n_concepts, n_classes):\n        self.g = nn.Sequential(backbone, nn.Linear(hidden_dim, n_concepts))  # x → c\n        self.f = nn.Linear(n_concepts, n_classes)  # c → y\n\n    def forward(self, x):\n        c_hat = self.g(x)           # 概念预测（logits）\n        y_hat = self.f(c_hat)       # 任务预测\n        return y_hat, c_hat\n\n    def intervene(self, x, concept_idx, true_value):\n        &quot;&quot;&quot;测试时干预：将指定概念替换为真实值&quot;&quot;&quot;\n        c_hat = self.g(x)\n        c_hat[concept_idx] = true_value  # 人工修正\n        y_hat = self.f(c_hat)\n        return y_hat\n\n# Joint 训练\nfor x, y, c in dataloader:\n    y_hat, c_hat = model(x)\n    loss = L_Y(y_hat, y) + lambda_ * sum(L_Cj(c_hat_j, c_j) for j in range(k))\n    loss.backward()\n    optimizer.step()\n</code></pre>\n<h5>测试时概念干预</h5>\n<p>CBM 的核心优势在于支持<strong>测试时干预</strong>（test-time intervention）：领域专家可以检查模型的概念预测，修正错误的概念，观察最终预测如何变化。</p>\n<p>干预机制：\n- <strong>OAI 任务</strong>：直接将预测概念 \\(\\hat{c}_j\\) 替换为真实值 \\(c_j\\)（概念为连续有序变量）\n- <strong>CUB 任务</strong>：按概念组（如\"翅膀颜色\"包含 15 个二值属性）进行干预，使用 CDF 匹配将二值概念组转换为单一有序值</p>\n<p>实验结果表明：\n- OAI 上干预仅 2 个概念（共 10 个），RMSE 从 &gt;0.4 降至 ≈0.3\n- CUB 上干预约 8 个概念组（共 28 组），错误率从 ≈0.24 降至 ≈0.05\n- Independent 模型在所有概念被替换时表现最好（因为 \\(f\\) 直接在真实概念上训练）\n- 概念精度与干预效果高度相关：概念精度越高，干预收益越大</p>\n<div class=\"key-point\">💡 关键：干预使得\"单个放射科医生 + CBM\"可能超越\"单独的放射科医生\"或\"单独的模型\"，实现真正的人机协作。</div>\n<h5>与事后解释方法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>CBM（概念瓶颈）</th>\n<th>Post-hoc 探测（如 TCAV）</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>概念精度</td>\n<td>高（OAI: r=0.84, CUB: F1=0.92）</td>\n<td>低（OAI: r=0.72, CUB: F1=0.77）</td>\n</tr>\n<tr>\n<td>支持干预</td>\n<td>✅ 直接修改瓶颈层</td>\n<td>❌ 无法清晰修改激活</td>\n</tr>\n<tr>\n<td>训练要求</td>\n<td>需要概念标注</td>\n<td>仅需训练后的探测数据</td>\n</tr>\n<tr>\n<td>任务精度</td>\n<td>略有损失（Joint 接近 Standard）</td>\n<td>不影响原模型</td>\n</tr>\n</tbody>\n</table></div>\n<h5>鲁棒性实验</h5>\n<p>在构造的 CUB 背景偏移实验中（训练时每个鸟类物种与特定背景绑定，测试时打乱），Standard 模型严重依赖虚假背景特征导致性能崩溃，而 CBM 由于概念（如翅膀颜色）在多个物种间共享、跨越多种背景，因此对背景偏移更鲁棒。</p>",
      "quiz": {
        "q": "在 CBM 的 Independent 训练策略中，c→y 模型 f 在训练时使用什么作为输入？",
        "options": [
          "模型 g 对训练集的概念预测 ĉ = g(x)",
          "真实概念标注 c",
          "联合优化得到的概念 logits",
          "经过 sigmoid 归一化的概念概率"
        ],
        "answer": 1,
        "explain": "Independent 策略中 f 独立训练，直接使用真实概念 c 作为输入，而非 g 的预测。这导致测试时存在 train-test mismatch，因为测试时 f 接收的是 g(x) 的预测而非真实值。"
      }
    },
    {
      "id": "sae",
      "num": 16,
      "name": "SAE",
      "fullName": "稀疏自编码器解释 (Sparse Autoencoder Interpretability)",
      "year": "2026",
      "org": "Anthropic",
      "parent": "cbm",
      "paperUrl": "https://arxiv.org/abs/2602.11180",
      "projectUrl": "",
      "category": "interpretability",
      "motivation": "分解Transformer隐层定位特定功能电路",
      "summary": "本文系统综述了机制可解释性（Mechanistic Interpretability）在大语言模型对齐中的应用，重点阐述了稀疏自编码器（SAE）如何通过 L1 稀疏约束训练过完备字典，将神经网络的多义性（polysemantic）激活分解为单义性（monosemantic）可解释特征，从而解决叠加（superposition）问题并支撑电路发现与模型对齐。",
      "keyPoints": [
        "<strong>核心问题</strong>：Transformer 隐层神经元存在多义性（polysemanticity），单个神经元同时编码多个不相关概念，阻碍可解释性分析",
        "<strong>SAE 方法</strong>：训练带 L1 正则化的自编码器，学习过完备（overcomplete）特征字典，将 \\(d\\)-维激活映射到 \\(m \\gg d\\) 维稀疏表示",
        "<strong>稀疏字典学习</strong>：SAE 本质是稀疏字典学习，编码器产生稀疏激活码，解码器字典列重建原始激活",
        "<strong>解决叠加问题</strong>：网络在有限维度中编码远超维度数的特征（superposition），SAE 通过过完备基将叠加特征\"解纠缠\"",
        "<strong>单义特征发现</strong>：SAE 学到的特征对应可解释概念（如特定实体、语法结构、情感极性），支持因果干预分析",
        "<strong>电路发现支撑</strong>：SAE 特征作为电路分析的基本单元，配合激活修补（activation patching）定位功能电路",
        "<strong>关键挑战</strong>：训练 frontier 模型的 SAE 需巨大算力；特征数随模型规模组合增长；重建保真度与稀疏性存在权衡"
      ],
      "detail": "<p><img alt=\"SAE 评估框架\" src=\"https://ar5iv.labs.arxiv.org/html/2406.04093/assets/x1.png\" />\n<em>图：稀疏自编码器（SAE）的评估与扩展框架。SAE 将 d 维模型激活编码为 m 维稀疏表示（m &gt;&gt; d），通过 L1 约束确保仅少量特征激活，解码器字典重建原始激活。（来源：Gao et al., 2024, Scaling and Evaluating Sparse Autoencoders）</em></p>\n<pre><code class=\"language-python\"># SAE 训练伪代码\nimport torch\nimport torch.nn as nn\n\nclass SparseAutoencoder(nn.Module):\n    def __init__(self, d_model, n_features, l1_coeff=1e-3):\n        super().__init__()\n        # 编码器: d_model -&gt; n_features (过完备, n_features &gt;&gt; d_model)\n        self.encoder = nn.Linear(d_model, n_features)\n        # 解码器: n_features -&gt; d_model (字典矩阵)\n        self.decoder = nn.Linear(n_features, d_model, bias=False)\n        self.l1_coeff = l1_coeff\n\n    def forward(self, x):\n        # x: 模型隐层激活 [batch, d_model]\n        # 编码 + ReLU 产生稀疏特征激活\n        z = torch.relu(self.encoder(x))  # [batch, n_features], 稀疏\n        # 解码重建原始激活\n        x_hat = self.decoder(z)  # [batch, d_model]\n        return x_hat, z\n\n    def loss(self, x):\n        x_hat, z = self.forward(x)\n        # 重建损失: 保真度\n        recon_loss = (x - x_hat).pow(2).mean()\n        # L1 稀疏损失: 鼓励特征稀疏激活\n        sparsity_loss = self.l1_coeff * z.abs().mean()\n        return recon_loss + sparsity_loss\n\n# 训练流程\n# 1. 收集模型某层的激活 (如 residual stream)\n# 2. 训练 SAE 最小化 recon_loss + λ * L1(z)\n# 3. 分析学到的特征: 哪些输入最大化激活特定特征?\n# 4. 验证单义性: 每个特征是否对应单一可解释概念?\n</code></pre>\n<p><strong>动机与背景</strong></p>\n<p>大语言模型的内部表示存在<strong>叠加现象（superposition）</strong>：模型在 \\(d\\) 维空间中编码远超 \\(d\\) 个概念。这导致单个神经元同时响应多个不相关的语义概念（多义性），使得直接分析单个神经元无法获得可解释的理解。例如，一个神经元可能同时对\"法律术语\"、\"数学符号\"和\"特定人名\"产生高激活。</p>\n<p>传统方法（如探针分类器 probing）只能验证特定假设的存在性，无法发现未知特征；而直接分析注意力权重忽略了 MLP 层中的丰富计算。SAE 提供了一种<strong>无监督</strong>的方式来发现模型内部的可解释特征基。</p>\n<p><strong>核心机制</strong></p>\n<p>SAE 的核心思想是<strong>稀疏字典学习</strong>。给定模型某层的激活向量 \\(\\mathbf{x} \\in \\mathbb{R}^d\\)，SAE 学习：</p>\n<p>$$\\mathbf{z} = \\text{ReLU}(W_e \\mathbf{x} + \\mathbf{b}_e) \\in \\mathbb{R}^m, \\quad m \\gg d$$</p>\n<p>$$\\hat{\\mathbf{x}} = W_d \\mathbf{z} + \\mathbf{b}_d$$</p>\n<p>训练目标为：</p>\n<p>$$\\mathcal{L} = \\|\\mathbf{x} - \\hat{\\mathbf{x}}\\|_2^2 + \\lambda \\|\\mathbf{z}\\|_1$$</p>\n<p>其中：\n- <strong>重建项</strong> \\(\\|\\mathbf{x} - \\hat{\\mathbf{x}}\\|_2^2\\) 确保 SAE 保留原始激活的信息\n- <strong>L1 稀疏项</strong> \\(\\lambda \\|\\mathbf{z}\\|_1\\) 鼓励每次仅少量特征被激活（稀疏性）\n- <strong>过完备性</strong> \\(m \\gg d\\) 提供足够的\"槽位\"来分离叠加的特征</p>\n<div class=\"key-point\">💡 关键直觉：如果网络用 512 维空间编码了 10000 个概念（通过叠加），SAE 用 65536 维的过完备基来\"展开\"这些概念，使每个基向量对应一个可解释特征。L1 约束确保任意输入仅激活少量特征，避免退化为恒等映射。</div>\n<p><strong>解码器字典的几何解释</strong></p>\n<p>解码器权重矩阵 \\(W_d \\in \\mathbb{R}^{d \\times m}\\) 的每一列 \\(\\mathbf{d}_i\\) 是一个\"特征方向\"（feature direction）。当特征 \\(i\\) 被激活（\\(z_i > 0\\)），它向残差流中添加 \\(z_i \\cdot \\mathbf{d}_i\\)。这些方向构成了模型表示空间中的可解释基。</p>\n<p><strong>与电路发现的结合</strong></p>\n<p>SAE 发现的特征可作为电路分析的基本单元：\n1. <strong>特征识别</strong>：SAE 将激活分解为可解释特征（如\"法语文本\"、\"代码缩进\"、\"情感正面\"）\n2. <strong>因果验证</strong>：通过激活修补（activation patching）验证特征的因果作用——将特征激活设为零或放大，观察模型输出变化\n3. <strong>电路追踪</strong>：追踪特征之间的信息流动，发现功能电路（如\"间接宾语识别电路\"）</p>\n<p><strong>扩展性挑战与缓解方案</strong></p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>挑战</th>\n<th>描述</th>\n<th>缓解方向</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>计算成本</td>\n<td>训练 frontier 模型的 SAE 需要与预训练相当的算力</td>\n<td>分层训练、知识蒸馏</td>\n</tr>\n<tr>\n<td>特征爆炸</td>\n<td>特征数随模型规模组合增长</td>\n<td>拓扑感知 SAE、层次化字典</td>\n</tr>\n<tr>\n<td>保真度权衡</td>\n<td>L1 系数 λ 过大损失信息，过小特征不稀疏</td>\n<td>自适应 λ 调度、Pareto 优化</td>\n</tr>\n<tr>\n<td>特征交互</td>\n<td>SAE 假设特征线性叠加，忽略非线性交互</td>\n<td>高阶 SAE、条件字典学习</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"warn-box\">⚠️ 注意：SAE 的一个根本假设是<strong>线性表示假设</strong>——概念以线性方向编码在激活空间中。若模型使用非线性编码（如环形表示编码周期性概念），标准 SAE 可能无法正确分解。</div>\n<p><strong>与传统方法的对比</strong></p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>监督需求</th>\n<th>发现能力</th>\n<th>因果性</th>\n<th>可扩展性</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>探针分类器 (Probing)</td>\n<td>需标注数据</td>\n<td>仅验证假设</td>\n<td>弱</td>\n<td>高</td>\n</tr>\n<tr>\n<td>注意力可视化</td>\n<td>无</td>\n<td>有限</td>\n<td>无</td>\n<td>高</td>\n</tr>\n<tr>\n<td>激活修补 (Patching)</td>\n<td>无</td>\n<td>中等</td>\n<td>强</td>\n<td>中</td>\n</tr>\n<tr>\n<td><strong>SAE</strong></td>\n<td><strong>无</strong></td>\n<td><strong>强（无监督发现）</strong></td>\n<td><strong>配合 patching 强</strong></td>\n<td><strong>中低</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p>SAE 的独特优势在于能<strong>无监督地发现未知特征</strong>，而非仅验证研究者预设的假设。这使其成为\"打开黑箱\"的核心工具。</p>",
      "quiz": {
        "q": "稀疏自编码器（SAE）使用过完备字典（m >> d）的主要目的是什么？",
        "options": [
          "减少模型的参数量以提高推理效率",
          "提供足够维度来分离叠加在低维空间中的多个概念",
          "增加重建损失以提升训练稳定性",
          "使编码器输出更加稠密以保留更多信息"
        ],
        "answer": 1,
        "explain": "过完备字典提供了远超原始维度的'槽位'，使得叠加在 d 维空间中的大量概念可以被分离到各自独立的维度上，每个维度对应一个可解释特征。"
      }
    },
    {
      "id": "protosure",
      "num": 17,
      "name": "ProtoSurE",
      "fullName": "原型解释框架 (Prototype-based Surrogate Explanations)",
      "year": "2026",
      "org": "AAAI",
      "parent": "cbm",
      "paperUrl": "https://ojs.aaai.org/index.php/AAAI/article/view/39892",
      "projectUrl": "",
      "category": "interpretability",
      "motivation": "将LLM行为蒸馏为语义原型实现稳定解释",
      "summary": "ProtoSurE 提出了一种基于原型网络的代理解释器，通过将黑盒 LLM 的行为蒸馏为句子-原型匹配的可解释模型，在忠实性和人类可理解性之间实现了最优平衡，仅需 128 个样本即可逼近最优性能。",
      "keyPoints": [
        "<strong>代理模型范式</strong>：训练轻量可解释模型模拟黑盒 LLM 的输入-输出行为，而非直接解释 LLM 内部机制",
        "<strong>句子级粒度解释</strong>：将输入文本分割为句子，提供句子级别的重要性归因，比 token 级更符合人类阅读习惯",
        "<strong>原型匹配机制</strong>：每个类别维护 K 个可学习原型向量，通过句子与原型的余弦相似度进行分类决策",
        "<strong>Token 归因增强编码</strong>：利用目标 LLM 的 token 级注意力/梯度归因分数加权句子嵌入，提升对 LLM 推理的对齐",
        "<strong>注意力聚合</strong>：通过可学习注意力机制将多句子表示聚合为文档级表示",
        "<strong>高数据效率</strong>：仅需 128–256 个训练样本即可达到接近最优的准确率和忠实性",
        "<strong>广泛适用性</strong>：支持开源 (Llama-3.1-8B, Llama-3.2-3B, Qwen2.5-7B) 和闭源 (GPT-4o-mini) LLM",
        "<strong>7 项忠实性指标全面领先</strong>：在 Comprehensiveness、Sufficiency、DFF、DFS、Deletion、Insertion 等指标上超越 SHAP、IG、Occlusion、DeepLift 等基线"
      ],
      "detail": "<h5>问题动机与背景</h5>\n<p>现有 LLM 解释方法存在三大缺陷：</p>\n<ol>\n<li><strong>后验归因方法</strong>（SHAP、LIME、Integrated Gradients）：需要大量前向传播（SHAP 对 n 个特征需 \\(2^n\\) 次查询），计算代价高昂；且仅提供 token 级分数，缺乏语义可理解性</li>\n<li><strong>自解释方法</strong>（Chain-of-Thought、Self-Explanation）：依赖 LLM 自身生成解释，研究表明这些解释往往不忠实于模型实际推理过程</li>\n<li><strong>注意力可视化</strong>：注意力权重与特征重要性之间的关系尚有争议，不能直接作为可靠解释</li>\n</ol>\n<p>ProtoSurE 的核心思路是：训练一个<strong>可解释的代理模型</strong>来模拟 LLM 行为，该代理模型本身的决策过程就是透明的——通过\"这个句子像哪个原型\"来做出预测。</p>\n<h5>模型架构总览</h5>\n<p><img alt=\"ProtoSurE 架构示意图\" src=\"https://ojs.aaai.org/index.php/AAAI/article/view/33451\" />\n<em>图：ProtoSurE 框架包含三个核心步骤：(1) 句子分割与 Token 归因加权编码；(2) 注意力聚合为文档表示；(3) 原型匹配与分类预测。每个原型代表一个语义概念（如\"清洁度\"、\"服务质量\"），解释通过句子-原型相似度自然产生。</em></p>\n<h5>核心技术细节</h5>\n<p><strong>Step 1: 句子分割与 Token 归因增强编码</strong></p>\n<p>输入文本 \\(x\\) 被分割为句子序列 \\(\\{s_1, s_2, ..., s_n\\}\\)。每个句子通过预训练句子编码器（如 all-mpnet-base-v2）获得基础嵌入。</p>\n<p>关键创新在于<strong>Token 归因加权</strong>：从目标 LLM 提取 token 级归因分数 \\(a_t\\)（通过注意力或梯度方法），对句子内 token 嵌入进行加权聚合：</p>\n<p>$$e_i = \\text{Encoder}(s_i, \\{a_t\\}_{t \\in s_i})$$</p>\n<p>这使得句子表示更加对齐目标 LLM 的关注模式。实验表明该设计平均提升 0.6-0.8% 准确率。</p>\n<p><strong>Step 2: 注意力聚合</strong></p>\n<p>多个句子嵌入通过可学习注意力机制聚合为文档级表示：</p>\n<p>$$\\alpha_i = \\frac{\\exp(w^\\top e_i)}{\\sum_{j=1}^n \\exp(w^\\top e_j)}$$</p>\n<p>$$d = \\sum_{i=1}^n \\alpha_i \\cdot e_i$$</p>\n<p>其中 \\(w\\) 为可学习注意力向量。注意力权重 \\(\\alpha_i\\) 直接反映了每个句子对最终预测的贡献程度，是句子级解释的核心来源。</p>\n<p><strong>Step 3: 原型匹配与分类</strong></p>\n<p>每个类别 \\(c\\) 维护 \\(K\\) 个可学习原型向量 \\(\\{p_1^c, p_2^c, ..., p_K^c\\}\\)。分类通过计算文档表示与各类原型的相似度完成：</p>\n<p>$$\\text{sim}(d, p_k^c) = \\frac{d \\cdot p_k^c}{\\|d\\| \\cdot \\|p_k^c\\|}$$</p>\n<p>最终预测为：</p>\n<p>$$\\hat{y} = \\arg\\max_c \\sum_{k=1}^K w_k^c \\cdot \\text{sim}(d, p_k^c)$$</p>\n<p>其中 \\(w_k^c\\) 为各原型的类别权重。原型通过 K-means 初始化后在训练中持续更新。</p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># ProtoSurE 训练与推理流程\ndef protosure_train(texts, llm_predictions, encoder, K, num_classes):\n    # 初始化：K-means 聚类初始化原型\n    prototypes = kmeans_init(encoder, texts, K * num_classes)\n\n    for epoch in range(num_epochs):\n        for text, y_llm in zip(texts, llm_predictions):\n            # Step 1: 句子分割与编码\n            sentences = sent_tokenize(text)\n            token_attrs = get_llm_attribution(text)  # 从目标LLM获取token归因\n            embeddings = [encoder(s, token_attrs[s]) for s in sentences]\n\n            # Step 2: 注意力聚合\n            attn_weights = softmax(W @ embeddings)\n            doc_repr = sum(attn_weights * embeddings)\n\n            # Step 3: 原型匹配\n            similarities = cosine_sim(doc_repr, prototypes)\n            logits = class_weights @ similarities\n            pred = argmax(logits)\n\n            # 损失：交叉熵 + 多样性正则\n            loss = CE(logits, y_llm) + lam * diversity_loss(prototypes)\n            loss.backward()\n            optimizer.step()  # 更新编码器、注意力、原型、权重\n\ndef protosure_explain(text, model):\n    sentences = sent_tokenize(text)\n    embeddings = model.encode(sentences)\n    attn_weights = model.attention(embeddings)  # 句子重要性\n\n    # 解释 = 每个句子的注意力权重 + 最匹配的原型语义标签\n    for s, w, emb in zip(sentences, attn_weights, embeddings):\n        proto_match = most_similar_prototype(emb)\n        print(f&quot;Sentence: {s}&quot;)\n        print(f&quot;  Importance: {w:.3f}, Matches Prototype: {proto_match.label}&quot;)\n</code></pre>\n<h5>训练目标与损失函数</h5>\n<p>ProtoSurE 的训练目标是最小化代理模型与目标 LLM 预测之间的交叉熵损失，同时加入原型多样性正则化：</p>\n<p>$$\\mathcal{L} = \\mathcal{L}_{CE}(\\hat{y}, y_{LLM}) + \\lambda \\mathcal{L}_{div}$$</p>\n<p>其中多样性损失确保同类原型之间保持足够差异，避免退化为相同表示。</p>\n<div class=\"key-point\">💡 <strong>关键设计思想</strong>：ProtoSurE 的解释不是事后附加的，而是模型决策过程本身——\"模型认为这个句子像'清洁度'原型（相似度 0.92），所以判定为正面评价\"。这种 case-based reasoning 天然具有可解释性。</div>\n<h5>忠实性评估体系</h5>\n<p>论文采用 7 项互补的忠实性指标：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>指标</th>\n<th>含义</th>\n<th>方向</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Comprehensiveness</td>\n<td>移除重要特征后预测变化幅度</td>\n<td>↑</td>\n</tr>\n<tr>\n<td>Sufficiency</td>\n<td>仅保留重要特征时预测保持程度</td>\n<td>↓</td>\n</tr>\n<tr>\n<td>DFF (Decision Flip Fraction)</td>\n<td>移除最重要句子后决策翻转比例</td>\n<td>↓</td>\n</tr>\n<tr>\n<td>DFS (Decision Flip with Sentence)</td>\n<td>仅用最重要句子能复现决策的比例</td>\n<td>↑</td>\n</tr>\n<tr>\n<td>Deletion</td>\n<td>按重要性递减删除时排序相关性</td>\n<td>↑</td>\n</tr>\n<tr>\n<td>Insertion</td>\n<td>按重要性递增添加时排序相关性</td>\n<td>↑</td>\n</tr>\n</tbody>\n</table></div>\n<h5>与现有方法的关键区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th>SHAP/LIME</th>\n<th>注意力方法</th>\n<th>自解释</th>\n<th>ProtoSurE</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>粒度</td>\n<td>Token</td>\n<td>Token</td>\n<td>自由文本</td>\n<td>句子</td>\n</tr>\n<tr>\n<td>计算代价</td>\n<td>\\(O(2^n)\\) 查询</td>\n<td>单次前向</td>\n<td>单次生成</td>\n<td>单次前向</td>\n</tr>\n<tr>\n<td>忠实性</td>\n<td>中等</td>\n<td>有争议</td>\n<td>不忠实</td>\n<td>高</td>\n</tr>\n<tr>\n<td>可理解性</td>\n<td>低（数值分数）</td>\n<td>低</td>\n<td>高但不可靠</td>\n<td>高且可靠</td>\n</tr>\n<tr>\n<td>需要模型内部访问</td>\n<td>否/是</td>\n<td>是</td>\n<td>否</td>\n<td>否</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：ProtoSurE 作为代理模型，其忠实性上限取决于代理模型对目标 LLM 的模拟精度。实验显示平均准确率达 89.6%，意味着约 10% 的情况下解释可能偏离 LLM 的真实推理。</div>\n<h5>实验亮点</h5>\n<ul>\n<li><strong>数据效率</strong>：Hotel 数据集上 Llama-3.1-8B 仅用 128 样本即达 96.5% 准确率（最优 1024 样本为 98.4%）</li>\n<li><strong>原型数量鲁棒</strong>：K=3~10 范围内性能稳定，K=5 通常为最优</li>\n<li><strong>编码器无关</strong>：all-mpnet-base-v2、BGE-M3、E5-large 等编码器性能差异仅 0.007 个百分点</li>\n<li><strong>可训练原型优于固定原型</strong>：更新策略平均提升 1.0-1.2% 准确率</li>\n<li><strong>Token 归因增强</strong>：集成 LLM 归因分数平均提升 0.6-0.8% 准确率</li>\n<li><strong>GPT-4o-mini 扩展</strong>：在闭源模型上同样全面超越 SHAP、Occlusion、SELF-EXP 基线</li>\n</ul>",
      "quiz": {
        "q": "ProtoSurE 相比传统 SHAP 方法的核心优势是什么？",
        "options": [
          "使用更大的预训练模型作为编码器",
          "通过原型匹配提供句子级语义解释，同时避免指数级查询开销",
          "直接访问 LLM 内部注意力权重进行解释",
          "利用 Chain-of-Thought 让 LLM 自己生成解释"
        ],
        "answer": 1,
        "explain": "ProtoSurE 训练代理模型一次后仅需单次前向传播即可生成解释，避免了 SHAP 的 O(2^n) 查询开销；同时通过原型匹配提供语义层面的句子级解释（如'该句匹配清洁度原型'），比 SHAP 的数值分数更具人类可理解性。"
      }
    },
    {
      "id": "dp_sgd",
      "num": 18,
      "name": "DP-SGD",
      "fullName": "差分隐私随机梯度下降 (Differential Privacy SGD)",
      "year": "2016",
      "org": "Google",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/1607.00133",
      "projectUrl": "",
      "category": "privacy",
      "motivation": "梯度裁剪加噪提供严谨的隐私数学保证",
      "summary": "DP-SGD 通过对每样本梯度进行 L2 范数裁剪并添加校准高斯噪声实现训练过程的 \\((\\varepsilon, \\delta)\\)-差分隐私保证，同时引入 Moments Accountant 实现比强组合定理紧约一个数量级的隐私损失追踪，在 MNIST 上以 \\((\\varepsilon=2, \\delta=10^{-5})\\)-DP 达到 95% 准确率。",
      "keyPoints": [
        "提出 DP-SGD 算法：每步对每样本梯度做 L2 裁剪（阈值 \\(C\\)）→ 求和 → 加高斯噪声 \\(\\mathcal{N}(0, \\sigma^2 C^2 I)\\) → 除以批大小 → 梯度下降",
        "引入 Moments Accountant：通过追踪隐私损失随机变量的对数矩生成函数，实现比强组合定理紧 \\(\\sqrt{\\log(T/\\delta)}\\) 因子的隐私分析",
        "利用 Poisson 子采样的隐私放大效应：每条记录独立以概率 \\(q = L/N\\) 被选中",
        "差分隐私 PCA：对协方差矩阵加噪后取主方向，用于降维预处理",
        "TensorFlow 实现：per-example gradient 算子 + Sanitizer（裁剪加噪）+ PrivacyAccountant（隐私追踪）",
        "超参数洞察：最优批大小约 \\(\\sqrt{N}\\)；裁剪阈值取梯度范数中位数；网络增大不降低准确率"
      ],
      "detail": "<p><img alt=\"DP-SGD Algorithm\" src=\"https://arxiv.org/html/1607.00133v1/extracted/figures/algorithm1.png\" />\n<em>图：DP-SGD 算法流程——对每样本梯度裁剪后加噪聚合</em></p>\n<div class=\"warn-box\">⚠️ 注意：若上图不可访问，核心流程见下方伪代码。</div>\n<pre><code class=\"language-python\"># Algorithm 1: Differentially Private SGD (DP-SGD)\n# 输入: 数据集 {x_1,...,x_N}, 损失函数 L(θ), 学习率 η_t\n#       噪声尺度 σ, 裁剪阈值 C, 批大小 L\n\nfor t in range(T):\n    # 1. Poisson子采样: 每条记录独立以概率 q=L/N 被选中\n    L_t = poisson_sample(dataset, q=L/N)\n\n    # 2. 计算每样本梯度\n    for x_i in L_t:\n        g_i = compute_gradient(θ_t, x_i)\n\n    # 3. 梯度裁剪 (L2范数)\n    for x_i in L_t:\n        g_i_clipped = g_i / max(1, ||g_i||_2 / C)\n\n    # 4. 加噪聚合\n    g_noisy = (1/L) * (sum(g_i_clipped) + N(0, σ²C²I))\n\n    # 5. 参数更新\n    θ_{t+1} = θ_t - η_t * g_noisy\n</code></pre>\n<h5>动机与背景</h5>\n<p>深度学习模型在训练过程中可能记忆训练数据的敏感信息。模型反演攻击（Fredrikson et al., 2015）已证明可以从训练好的模型中恢复训练数据。差分隐私（Dwork et al., 2006）提供了形式化的隐私保证，但此前的 DP 方法主要针对凸优化问题（如 output perturbation、objective perturbation），无法直接应用于深度学习的非凸优化。</p>\n<p>已有工作的不足：\n- Shokri &amp; Shmatikov (2015)：分布式训练中按单个参数计算隐私损失，总隐私预算达数千级别\n- 强组合定理：对 \\(T\\) 步迭代的隐私损失估计过于宽松（\\(O(\\sqrt{T \\log(1/\\delta)} \\cdot \\varepsilon_0)\\)）\n- 凸 ERM 方法（Wu et al.）：MNIST 仅达 83% 准确率</p>\n<h5>核心机制：梯度裁剪 + 高斯噪声</h5>\n<p><strong>梯度裁剪</strong>确保单样本梯度的 L2 灵敏度有界：</p>\n<p>$$\\bar{\\mathbf{g}}_t(x_i) = \\mathbf{g}_t(x_i) / \\max\\left(1, \\frac{\\|\\mathbf{g}_t(x_i)\\|_2}{C}\\right)$$</p>\n<div class=\"key-point\">💡 关键：裁剪后 \\(\\|\\bar{\\mathbf{g}}_t(x_i)\\|_2 \\leq C\\)，因此聚合梯度对任意单样本的 L2 灵敏度至多为 \\(C\\)。</div>\n<p><strong>高斯机制</strong>：对灵敏度为 \\(C\\) 的查询添加 \\(\\mathcal{N}(0, \\sigma^2 C^2 I)\\) 噪声，满足 \\((\\varepsilon, \\delta)\\)-DP（当 \\(\\sigma\\) 足够大时）。</p>\n<p><strong>加噪聚合</strong>：</p>\n<p>$$\\tilde{\\mathbf{g}}_t = \\frac{1}{L}\\left(\\sum_{i \\in L_t} \\bar{\\mathbf{g}}_t(x_i) + \\mathcal{N}(0, \\sigma^2 C^2 \\mathbf{I})\\right)$$</p>\n<h5>核心机制：Moments Accountant</h5>\n<p>传统的强组合定理对 \\(T\\) 次 \\((\\varepsilon_0, \\delta_0)\\)-DP 机制的组合给出：</p>\n<p>$$(\\varepsilon_0 \\sqrt{2T \\ln(1/\\delta')} + T\\varepsilon_0(e^{\\varepsilon_0}-1),\\; T\\delta_0 + \\delta')$$</p>\n<p>Moments Accountant 通过追踪隐私损失的<strong>对数矩生成函数</strong>获得更紧的界：</p>\n<p>$$\\alpha_{\\mathcal{M}}(\\lambda) = \\max_{d, d'} \\log \\mathbb{E}_{o \\sim \\mathcal{M}(d)}\\left[\\exp\\left(\\lambda \\cdot \\log \\frac{\\Pr[\\mathcal{M}(d)=o]}{\\Pr[\\mathcal{M}(d')=o]}\\right)\\right]$$</p>\n<p><strong>关键性质</strong>：\n1. <strong>可组合性</strong>：\\(\\alpha_{\\mathcal{M}_{1:T}}(\\lambda) \\leq \\sum_{t=1}^T \\alpha_{\\mathcal{M}_t}(\\lambda)\\)\n2. <strong>尾界转换</strong>：\\(\\delta = \\min_\\lambda \\exp(\\alpha(\\lambda) - \\lambda\\varepsilon)\\)</p>\n<p>对于采样率 \\(q\\) 的子采样高斯机制：</p>\n<p>$$\\alpha(\\lambda) \\leq \\frac{q^2 \\lambda(\\lambda+1)}{(1-q)\\sigma^2} + O(q^3/\\sigma^3)$$</p>\n<div class=\"key-point\">💡 关键：Moments Accountant 比强组合定理省去 \\(\\sqrt{\\log(T/\\delta)}\\) 因子。实测 \\(T=10000\\) 时，\\(\\varepsilon\\) 从 9.34 降至 1.26（改善 7.4×）。</div>\n<p><strong>主定理</strong>：存在常数 \\(c_1, c_2\\)，Algorithm 1 在 \\(T\\) 步后满足 \\((\\varepsilon, \\delta)\\)-DP，只要：</p>\n<p>$$\\sigma \\geq c_2 \\frac{q\\sqrt{T \\log(1/\\delta)}}{\\varepsilon}$$</p>\n<h5>训练流程与实现</h5>\n<ol>\n<li><strong>差分隐私 PCA 预处理</strong>：将输入归一化为单位向量，对 \\(A^T A\\) 加高斯噪声后取主方向投影（如 MNIST 784→60 维）</li>\n<li><strong>DP-SGD 训练</strong>：在投影空间中训练全连接网络</li>\n<li><strong>隐私预算分配</strong>：PCA 和 SGD 各消耗部分 \\((\\varepsilon, \\delta)\\) 预算，通过组合定理合并</li>\n<li><strong>TensorFlow 实现</strong>：利用 Goodfellow (2015) 的 per-example gradient 技巧高效计算每样本梯度</li>\n</ol>\n<h5>实验结果</h5>\n<p><strong>MNIST</strong>（模型：60维PCA → 1000隐藏单元ReLU → Softmax；非隐私基线 98.3%）：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>\\((\\varepsilon, \\delta)\\)</th>\n<th>噪声 \\((\\sigma, \\sigma_p)\\)</th>\n<th>测试准确率</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>(0.5, 10⁻⁵)</td>\n<td>(8, 16)</td>\n<td>90%</td>\n</tr>\n<tr>\n<td>(2, 10⁻⁵)</td>\n<td>(4, 7)</td>\n<td>95%</td>\n</tr>\n<tr>\n<td>(8, 10⁻⁵)</td>\n<td>(2, 4)</td>\n<td>97%</td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>CIFAR-10</strong>（预训练卷积层 + DP全连接层；非隐私基线 ~80%）：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>\\((\\varepsilon, \\delta)\\)</th>\n<th>测试准确率</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>(2, 10⁻⁵)</td>\n<td>67%</td>\n</tr>\n<tr>\n<td>(4, 10⁻⁵)</td>\n<td>70%</td>\n</tr>\n<tr>\n<td>(8, 10⁻⁵)</td>\n<td>73%</td>\n</tr>\n</tbody>\n</table></div>\n<h5>与传统方法的区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>适用范围</th>\n<th>MNIST准确率</th>\n<th>隐私保证</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Output Perturbation</td>\n<td>凸优化</td>\n<td>~83%</td>\n<td>严格DP</td>\n</tr>\n<tr>\n<td>Shokri &amp; Shmatikov</td>\n<td>分布式DL</td>\n<td>未报告</td>\n<td>ε~数千</td>\n</tr>\n<tr>\n<td><strong>DP-SGD (本文)</strong></td>\n<td><strong>通用DL</strong></td>\n<td><strong>95%@ε=2</strong></td>\n<td><strong>严格DP</strong></td>\n</tr>\n</tbody>\n</table></div>",
      "quiz": {
        "q": "DP-SGD 中对每样本梯度进行 L2 范数裁剪的主要目的是什么？",
        "options": [
          "加速模型收敛",
          "限制单样本对聚合梯度的影响，确保灵敏度有界",
          "防止梯度爆炸导致训练不稳定",
          "减少高斯噪声的方差"
        ],
        "answer": 1,
        "explain": "裁剪确保任意单样本梯度的 L2 范数不超过 C，从而使聚合梯度的 L2 灵敏度有界（≤C），这是高斯机制提供差分隐私保证的前提条件。"
      }
    },
    {
      "id": "fedavg",
      "num": 19,
      "name": "FedAvg",
      "fullName": "联邦平均 (Federated Averaging)",
      "year": "2017",
      "org": "Google",
      "parent": "dp_sgd",
      "paperUrl": "https://proceedings.mlr.press/v54/mcmahan17a.html",
      "projectUrl": "",
      "category": "privacy",
      "motivation": "数据不动模型动实现分布式协作学习",
      "summary": "FedAvg 提出了联邦学习范式下的通信高效优化算法，通过让客户端执行多轮本地 SGD 后再聚合模型参数，相比朴素联邦 SGD 将通信轮次降低 10-100 倍，同时对非独立同分布（Non-IID）和不平衡数据保持鲁棒性。",
      "keyPoints": [
        "提出联邦学习（Federated Learning）问题设定：数据分散在大量移动设备上，不可集中存储，具有 Non-IID、不平衡、大规模、通信受限四大特征",
        "核心算法 FedAvg：客户端执行多个本地 epoch（E）的 SGD 训练，服务器按数据量加权平均聚合模型",
        "三个关键超参数：客户端采样比例 \\(C\\)、本地训练轮数 \\(E\\)、本地 mini-batch 大小 \\(B\\)",
        "FedSGD 作为特殊情况：\\(B = \\infty, E = 1\\) 等价于分布式梯度下降",
        "共享初始化（Shared Initialization）是模型平均有效的关键前提",
        "在 MNIST（2NN/CNN）、Shakespeare（LSTM）、CIFAR-10（CNN）及大规模社交网络语言模型上验证有效性",
        "相比 FedSGD 实现 10-100× 通信效率提升，在 CIFAR-10 上相比标准 SGD 实现 50-64× 加速"
      ],
      "detail": "<p><img alt=\"FedAvg 框架示意图\" src=\"https://production-media.paperswithcode.com/methods/fedavg.png\" />\n<em>图：FedAvg 联邦学习框架——服务器协调多个客户端进行本地训练与全局聚合</em></p>\n<pre><code class=\"language-python\"># FedAvg 算法伪代码 (Algorithm 1)\n# === 服务器端 ===\ndef server_execute():\n    w = initialize_global_model()\n    for each_round t = 1, 2, ...:\n        m = max(C * K, 1)  # C: 客户端采样比例, K: 总客户端数\n        S_t = random_sample(m, clients)  # 随机选取 m 个客户端\n        for each client k in S_t (in parallel):\n            w_k = client_update(k, w)\n        # 加权平均聚合\n        w = sum(n_k / n * w_k for k in S_t)  # n_k: 客户端k数据量, n: 总数据量\n\n# === 客户端 k ===\ndef client_update(k, w):\n    B_k = split(P_k, batch_size=B)  # 将本地数据分为大小为B的batch\n    for epoch in range(E):           # 本地训练E个epoch\n        for batch b in B_k:\n            w = w - η * gradient(loss(w, b))  # 本地SGD更新\n    return w\n</code></pre>\n<p><strong>动机与背景</strong></p>\n<p>传统分布式机器学习假设数据可集中存储在数据中心，通过数据并行加速训练。然而现实中，大量有价值的训练数据产生于用户移动设备（手机、平板），出于隐私保护、法规合规和通信成本考虑，这些数据不应也不能上传至中心服务器。FedAvg 提出的联邦学习范式直接在数据产生的设备上进行模型训练，仅传输模型更新，从根本上解决了数据隐私与分布式学习的矛盾。</p>\n<p>联邦学习面临的核心挑战包括：\n1. <strong>Non-IID 数据</strong>：每个用户的本地数据反映其个人使用习惯，不代表全局分布\n2. <strong>不平衡性</strong>：不同用户产生的数据量差异巨大\n3. <strong>大规模参与者</strong>：客户端数量远超每个客户端的数据量\n4. <strong>通信瓶颈</strong>：上行带宽有限（通常 1MB/s 或更低），通信成本远高于计算成本</p>\n<p><strong>核心机制</strong></p>\n<p>FedAvg 的核心思想是<strong>增加本地计算量来换取通信效率</strong>。具体而言，算法通过两个维度增加本地计算：</p>\n<ol>\n<li><strong>增大本地 epoch 数 \\(E\\)</strong>：每个客户端在本地数据上训练多个完整 epoch，而非仅计算一次梯度</li>\n<li><strong>减小 mini-batch 大小 \\(B\\)</strong>：更小的 batch 意味着每个 epoch 内更多的梯度更新步骤</li>\n</ol>\n<p>服务器端的聚合采用加权平均：</p>\n<p>$$w_{t+1} = \\sum_{k=1}^{K} \\frac{n_k}{n} w_{t+1}^k$$</p>\n<p>其中 \\(n_k\\) 为客户端 \\(k\\) 的本地数据量，\\(n = \\sum_k n_k\\) 为参与聚合的总数据量。这一加权方式等价于对全局损失函数的无偏估计：</p>\n<p>$$f(w) = \\sum_{k=1}^{K} \\frac{n_k}{n} F_k(w), \\quad F_k(w) = \\frac{1}{n_k} \\sum_{i \\in \\mathcal{P}_k} f_i(w)$$</p>\n<div class=\"key-point\">💡 关键：当 \\(B = \\infty\\)（即使用全部本地数据作为一个 batch）且 \\(E = 1\\) 时，FedAvg 退化为 FedSGD——每个客户端仅计算一次全量梯度，服务器聚合后等价于集中式 SGD 的一步更新。</div>\n<p><strong>为什么模型平均有效？</strong></p>\n<p>论文通过实验（Figure 1）揭示了一个关键洞察：<strong>共享初始化使得模型平均有效</strong>。从相同初始点出发的两个模型，即使在不同数据子集上训练，其参数空间中的路径足够接近，使得简单的参数平均能产生有意义的模型。这与随机初始化的模型平均形成鲜明对比——后者由于参数置换对称性（permutation symmetry），平均后的模型性能极差。</p>\n<div class=\"warn-box\">⚠️ 注意：当本地训练轮数 \\(E\\) 过大时，各客户端模型可能偏离过远（client drift），导致聚合后模型质量下降甚至发散。论文建议在实践中适当衰减本地计算量。</div>\n<p><strong>训练流程与通信模式</strong></p>\n<p>每一轮通信的流程为：\n1. 服务器选取 \\(\\lceil C \\cdot K \\rceil\\) 个客户端（\\(C\\) 为采样比例）\n2. 服务器将当前全局模型 \\(w_t\\) 下发给选中的客户端\n3. 各客户端并行执行本地 SGD 训练（\\(E\\) 个 epoch，batch 大小为 \\(B\\)）\n4. 客户端将更新后的模型 \\(w_{t+1}^k\\) 上传至服务器\n5. 服务器执行加权平均得到新的全局模型 \\(w_{t+1}\\)</p>\n<p>每轮的通信量为 \\(O(|w|)\\)（模型参数量），与本地计算量 \\(E \\cdot \\lceil n_k / B \\rceil\\) 无关，因此增加本地计算不增加通信开销。</p>\n<p><strong>与传统方法的区别</strong></p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>本地计算</th>\n<th>通信轮次</th>\n<th>数据假设</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>并行 SGD (同步)</td>\n<td>1 次梯度计算</td>\n<td>每步通信</td>\n<td>IID 划分</td>\n</tr>\n<tr>\n<td>FedSGD</td>\n<td>1 次全量梯度</td>\n<td>每步通信</td>\n<td>允许 Non-IID</td>\n</tr>\n<tr>\n<td><strong>FedAvg</strong></td>\n<td><strong>E 个 epoch</strong></td>\n<td><strong>大幅减少</strong></td>\n<td><strong>允许 Non-IID</strong></td>\n</tr>\n<tr>\n<td>ADMM/DANE</td>\n<td>求解子问题</td>\n<td>较少</td>\n<td>凸优化假设</td>\n</tr>\n</tbody>\n</table></div>\n<p>FedAvg 的关键优势在于：(1) 无需凸性假设，直接适用于深度网络；(2) 实现极其简单，仅需标准 SGD 加参数平均；(3) 通信效率提升显著且稳定。</p>\n<p><strong>实验验证</strong></p>\n<p>在 CIFAR-10 上，FedAvg（\\(C=0.1, E=5, B=50\\)）仅需 2000 轮通信即达到 85% 测试精度，而标准 SGD 需要 197,500 次 mini-batch 更新，FedSGD 在相同精度目标下也需要数倍于 FedAvg 的通信轮次。在大规模社交网络下一词预测任务（50 万+客户端）上，FedAvg 同样展现出优于 FedSGD 的收敛速度和最终精度。</p>",
      "quiz": {
        "q": "FedAvg 相比 FedSGD 实现通信效率提升的核心机制是什么？",
        "options": [
          "使用更高效的梯度压缩算法减少每轮传输数据量",
          "增加客户端本地训练轮数(E>1)，减少达到目标精度所需的通信轮次",
          "采用异步通信模式避免等待慢客户端",
          "使用动量优化器加速服务器端模型聚合"
        ],
        "answer": 1,
        "explain": "FedAvg 的核心创新是让客户端执行多个本地 epoch（E>1）的 SGD 训练后再通信，用增加本地计算换取通信轮次的大幅减少，而每轮传输的数据量（完整模型参数）并未改变。"
      }
    },
    {
      "id": "pate",
      "num": 20,
      "name": "PATE",
      "fullName": "教师集成隐私聚合 (Private Aggregation of Teacher Ensembles)",
      "year": "2017",
      "org": "Google/Penn",
      "parent": "dp_sgd",
      "paperUrl": "https://arxiv.org/abs/1610.05755",
      "projectUrl": "",
      "category": "privacy",
      "motivation": "通过教师投票噪声保护训练数据成员隐私",
      "summary": "PATE 提出了一种基于教师集成噪声投票的隐私保护知识迁移框架，通过将敏感数据分散训练多个教师模型并以差分隐私方式聚合其预测来训练学生模型，结合半监督学习大幅减少隐私预算消耗，实现了当时最优的隐私-效用权衡。",
      "keyPoints": [
        "提出 PATE 框架：将敏感数据划分为不相交子集，分别训练 n 个教师模型，以黑盒方式聚合知识",
        "噪声聚合机制：对教师投票计数添加 Laplace 噪声后取 argmax，实现差分隐私的标签输出",
        "半监督学生训练（PATE-G）：利用 GAN 进行半监督学习，仅需少量教师标签即可训练高精度学生",
        "改进的隐私分析：应用 moments accountant 技术实现数据依赖的紧致隐私界",
        "模型无关性：对教师和学生的模型架构、损失函数、优化算法无任何限制，适用于任意深度学习模型",
        "实验结果：MNIST 达到 \\((2.04, 10^{-5})\\)-DP / 98.00% 准确率；SVHN 达到 \\((8.19, 10^{-6})\\)-DP / 90.66% 准确率"
      ],
      "detail": "<p><img alt=\"PATE 框架示意图\" src=\"https://ar5iv.labs.arxiv.org/html/1610.05755v4/assets/figures/pate_framework.png\" />\n<em>图：PATE 框架概览——教师在隐私数据上独立训练，通过噪声聚合为学生提供标签</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># PATE 训练流程伪代码\n# Phase 1: 教师训练\npartition D_sensitive into D_1, D_2, ..., D_n  # n个不相交子集\nfor i in range(n):\n    teacher_i = train_model(D_i)  # 独立训练每个教师\n\n# Phase 2: 噪声聚合标注\ndef noisy_aggregate(x, teachers, gamma):\n    &quot;&quot;&quot;对输入x进行隐私保护的标签聚合&quot;&quot;&quot;\n    votes = [teacher_i.predict(x) for teacher_i in teachers]\n    n_j = count_votes_per_class(votes)  # n_j(x): 投票给类别j的教师数\n    noisy_counts = [n_j[c] + Laplace(1/gamma) for c in classes]\n    return argmax(noisy_counts)\n\n# Phase 3: 学生半监督训练 (PATE-G)\nD_public = unlabeled_public_data()\nD_labeled = {(x, noisy_aggregate(x, teachers, gamma)) \n             for x in subset(D_public, k)}  # 仅标注k个样本\nstudent = semi_supervised_GAN_train(D_labeled, D_public)\n</code></pre>\n<h5>动机与背景</h5>\n<p>机器学习模型会隐式记忆训练数据，攻击者可通过模型反演（model inversion）等手段恢复敏感训练样本。传统差分隐私方法（如 DP-SGD）需要对训练过程进行侵入式修改（裁剪梯度、添加噪声），且隐私界往往较松。Hamm et al. (2016) 提出了教师-学生知识迁移的隐私保护思路，但仅适用于凸损失的逻辑回归。PATE 的核心动机是：<strong>设计一种模型无关的隐私保护学习框架，使得隐私保证不依赖于具体的学习算法</strong>。</p>\n<h5>核心机制</h5>\n<p><strong>1. 教师集成与数据划分</strong></p>\n<p>将包含 \\(N\\) 条记录的敏感数据集 \\(D\\) 随机划分为 \\(n\\) 个不相交子集 \\(D_1, D_2, \\ldots, D_n\\)，每个子集独立训练一个教师模型 \\(T_i\\)。由于每个教师仅接触 \\(N/n\\) 条数据，单个训练样本对最终输出的影响被天然稀释。</p>\n<p><strong>2. 噪声聚合机制（Noisy Aggregation）</strong></p>\n<p>对于输入 \\(x\\)，定义聚合预测为：</p>\n<p>$$f(x) = \\arg\\max_j \\left\\{ n_j(x) + \\text{Lap}\\left(\\frac{1}{\\gamma}\\right) \\right\\}$$</p>\n<p>其中 \\(n_j(x) = |\\{i : T_i(x) = j\\}|\\) 是投票给类别 \\(j\\) 的教师数量，\\(\\text{Lap}(1/\\gamma)\\) 是尺度为 \\(1/\\gamma\\) 的 Laplace 噪声。</p>\n<div class=\"key-point\">💡 关键：每次聚合查询的隐私代价为 \\(\\varepsilon = \\gamma\\)（因为单个训练样本最多影响一个教师的投票，使得投票计数的全局敏感度为 1）。</div>\n<p><strong>3. 半监督学生训练（PATE-G）</strong></p>\n<p>为最小化隐私预算消耗，PATE 利用 Salimans et al. (2016) 的半监督 GAN 方法训练学生：\n- 学生拥有大量公开无标签数据（MNIST: 9,000 样本；SVHN: 10,000 样本）\n- 仅对其中少量样本（MNIST: 100；SVHN: 500-1,000）通过噪声聚合获取标签\n- GAN 的判别器同时作为分类器，利用无标签数据学习数据分布，大幅减少对教师标签的依赖</p>\n<p><strong>4. Moments Accountant 隐私分析</strong></p>\n<p>传统组合定理对多次查询的隐私损失给出线性累加的松弛界。PATE 采用 Abadi et al. (2016) 的 moments accountant 技术，通过追踪隐私损失随机变量的对数矩生成函数获得更紧致的界：</p>\n<p>$$\\varepsilon = \\min_\\lambda \\frac{1}{\\lambda} \\sum_{t=1}^{T} \\alpha_t(\\lambda) + \\frac{\\log(1/\\delta)}{\\lambda}$$</p>\n<p>其中 \\(\\alpha_t(\\lambda)\\) 是第 \\(t\\) 次查询的 \\(\\lambda\\)-阶矩界。</p>\n<div class=\"key-point\">💡 关键：当教师高度一致（投票集中于某一类别）时，噪声几乎不改变输出，隐私损失极小。这种<strong>数据依赖的隐私分析</strong>使得实际隐私界远紧于最坏情况分析。</div>\n<h5>与传统方法的区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>PATE</th>\n<th>DP-SGD (Abadi et al. 2016)</th>\n<th>Hamm et al. 2016</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>模型限制</td>\n<td>无（黑盒）</td>\n<td>需修改优化器</td>\n<td>仅凸损失</td>\n</tr>\n<tr>\n<td>隐私机制</td>\n<td>输出扰动（投票噪声）</td>\n<td>梯度扰动</td>\n<td>输出扰动</td>\n</tr>\n<tr>\n<td>适用架构</td>\n<td>任意DNN</td>\n<td>任意DNN</td>\n<td>逻辑回归</td>\n</tr>\n<tr>\n<td>MNIST 结果</td>\n<td>(2.04, 10⁻⁵) / 98%</td>\n<td>(8, 10⁻⁵) / 97%</td>\n<td>—</td>\n</tr>\n</tbody>\n</table></div>\n<p>PATE 的核心优势在于：(1) 完全黑盒，不需要了解模型内部结构；(2) 隐私保证来自聚合机制而非训练过程，因此对任何学习算法通用；(3) 通过半监督学习大幅减少查询次数，从而降低总隐私预算。</p>\n<h5>实验配置</h5>\n<ul>\n<li><strong>MNIST</strong>：250 个教师，每个教师训练集约 240 样本；学生使用 9,000 公开样本 + 100 个噪声标签；Laplace 尺度 20（per-query ε=0.05）</li>\n<li><strong>SVHN</strong>：250 个教师；学生使用 10,000 公开样本 + 500-1,000 个噪声标签</li>\n<li>教师模型：标准 CNN；学生模型：半监督 GAN（improved-GAN）</li>\n</ul>",
      "quiz": {
        "q": "PATE 框架中，噪声聚合机制的全局敏感度为 1 的原因是什么？",
        "options": [
          "因为 Laplace 噪声的方差为 1",
          "因为每条训练数据最多影响一个教师的投票，改变一个投票计数最多变化 1",
          "因为教师模型的输出概率之和为 1",
          "因为学生模型只查询一次教师集成"
        ],
        "answer": 1,
        "explain": "敏感数据被划分为不相交子集，每条数据仅属于一个教师的训练集，因此添加或移除一条数据最多改变一个教师的预测，使得投票计数向量的 L1 敏感度为 1。"
      }
    },
    {
      "id": "diffushield",
      "num": 21,
      "name": "DiffuShield",
      "fullName": "扩散隐私合成 (Diffusion-based Privacy Shield)",
      "year": "2026",
      "org": "Information Fusion",
      "parent": "fedavg",
      "paperUrl": "https://www.sciencedirect.com/science/article/pii/S156625352500524X",
      "projectUrl": "",
      "category": "privacy",
      "motivation": "生成可配置隐私的合成人脸数据",
      "summary": "DiffuShield 的核心目标是：生成可配置隐私的合成人脸数据。",
      "keyPoints": [
        "核心动机：生成可配置隐私的合成人脸数据",
        "演化来源：继承或改进自 fedavg",
        "代表机构：Information Fusion"
      ],
      "detail": "<p>生成可配置隐私的合成人脸数据</p>"
    },
    {
      "id": "fedfm",
      "num": 22,
      "name": "FedFM",
      "fullName": "联邦基础模型 (Federated Foundation Models)",
      "year": "2026",
      "org": "IEEE",
      "parent": "fedavg",
      "paperUrl": "https://ieeexplore.ieee.org/abstract/document/10930890/",
      "projectUrl": "",
      "category": "privacy",
      "motivation": "联邦学习成为获取私域数据训练大模型关键路径",
      "summary": "FedFM 的核心目标是：联邦学习成为获取私域数据训练大模型关键路径。",
      "keyPoints": [
        "核心动机：联邦学习成为获取私域数据训练大模型关键路径",
        "演化来源：继承或改进自 fedavg",
        "代表机构：IEEE"
      ],
      "detail": "<p>联邦学习成为获取私域数据训练大模型关键路径</p>"
    }
  ],
  "categories": {
    "robustness": {
      "label": "鲁棒性优化",
      "color": "#e8820c"
    },
    "fairness": {
      "label": "公平性学习",
      "color": "#9b59b6"
    },
    "interpretability": {
      "label": "可解释性",
      "color": "#27ae60"
    },
    "privacy": {
      "label": "隐私保护",
      "color": "#3498db"
    }
  },
  "projectUrls": {}
};
