/**
 * probability_model-data.js — 由 pipeline/build.py 于 2026-05-20 17:34:46 自动生成。
 * 源文件：content/ml/probability_model.md
 * ⚠️  请勿手动修改；如需更新，修改源文档后重新编译。
 */
window.PAGE_CONFIG = {
  "meta": {
    "domain": "ml",
    "topic_id": "probability_model",
    "topic_name": "概率模型技术演进",
    "page_title": "概率模型技术演进",
    "page_subtitle": "2026-05-20 版",
    "page_desc": "从经典概率图模型到现代深度生成模型的演进脉络，涵盖贝叶斯网络、隐马尔可夫、变分推断等核心方法",
    "page_icon": "🎲",
    "hero_pills": [
      "🏷️ Bayesian · Graphical Models · Variational Inference"
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
        "id": "gmm",
        "x": 100,
        "y": 100,
        "category": "foundation"
      },
      {
        "id": "mcmc",
        "x": 250,
        "y": 250,
        "category": "foundation"
      },
      {
        "id": "hmm",
        "x": 300,
        "y": 400,
        "category": "foundation"
      },
      {
        "id": "em",
        "x": 400,
        "y": 100,
        "category": "foundation"
      },
      {
        "id": "mrf",
        "x": 450,
        "y": 250,
        "category": "core"
      },
      {
        "id": "bn",
        "x": 500,
        "y": 100,
        "category": "foundation"
      },
      {
        "id": "vi",
        "x": 650,
        "y": 250,
        "category": "core"
      },
      {
        "id": "crf",
        "x": 700,
        "y": 400,
        "category": "core"
      },
      {
        "id": "vae",
        "x": 850,
        "y": 250,
        "category": "core"
      },
      {
        "id": "score_matching",
        "x": 1000,
        "y": 250,
        "category": "specialized"
      },
      {
        "id": "ddpm",
        "x": 1100,
        "y": 250,
        "category": "specialized"
      },
      {
        "id": "flow_matching",
        "x": 1250,
        "y": 250,
        "category": "specialized"
      },
      {
        "id": "brain_vi",
        "x": 1350,
        "y": 150,
        "category": "specialized"
      },
      {
        "id": "bnn_scale",
        "x": 1350,
        "y": 100,
        "category": "specialized"
      }
    ],
    "edges": [
      {
        "from": "gmm",
        "to": "em",
        "label": "参数估计"
      },
      {
        "from": "em",
        "to": "vi",
        "label": "优化视角"
      },
      {
        "from": "vi",
        "to": "vae",
        "label": "深度化"
      },
      {
        "from": "vi",
        "to": "score_matching",
        "label": "分数估计"
      },
      {
        "from": "score_matching",
        "to": "ddpm",
        "label": "扩散过程"
      },
      {
        "from": "ddpm",
        "to": "flow_matching",
        "label": "确定轨迹"
      },
      {
        "from": "hmm",
        "to": "crf",
        "label": "判别式"
      },
      {
        "from": "mcmc",
        "to": "mrf",
        "label": "Gibbs采样"
      },
      {
        "from": "vi",
        "to": "brain_vi",
        "label": "类脑化"
      },
      {
        "from": "bn",
        "to": "bnn_scale",
        "label": "深度扩展"
      }
    ],
    "milestones": [
      "bn",
      "vae",
      "ddpm"
    ]
  },
  "algos": [
    {
      "id": "gmm",
      "num": 1,
      "name": "GMM",
      "fullName": "高斯混合模型 (Gaussian Mixture Model)",
      "year": "1894",
      "org": "Karl Pearson",
      "parent": "—",
      "paperUrl": "https://royalsocietypublishing.org/doi/10.1098/rsta.1894.0003",
      "projectUrl": "",
      "category": "foundation",
      "motivation": "多分布组合建模复杂数据分布",
      "summary": "Karl Pearson 提出用**有限个高斯分布的加权混合**来拟合复杂的非对称频率分布，并首创**矩估计法 (Method of Moments)** 求解混合参数，奠定了混合模型 (Mixture Model) 与聚类分析的数学基础。",
      "keyPoints": [
        "<strong>混合分布建模</strong>：首次将观测到的非对称/多峰频率曲线形式化为两个正态分布的加权叠加 \\(p(x) = \\pi_1 \\mathcal{N}(x;\\mu_1,\\sigma_1^2) + \\pi_2 \\mathcal{N}(x;\\mu_2,\\sigma_2^2)\\)",
        "<strong>矩估计法 (Method of Moments)</strong>：通过匹配混合分布的前 5 阶矩与样本矩，将参数估计问题转化为代数方程组求解",
        "<strong>九次多项式求解</strong>：5 个矩方程消元后归结为一个关于分量均值差的九次 (nonic) 多项式方程，Pearson 通过数值方法求根",
        "<strong>实证应用</strong>：对 W.F.R. Weldon 收集的 1000 只那不勒斯岸蟹 (<em>Carcinus moenas</em>) 额宽/体长比数据进行拟合，验证了两个亚种的假说",
        "<strong>5 个自由参数</strong>：两个分量的均值 \\(\\mu_1, \\mu_2\\)、标准差 \\(\\sigma_1, \\sigma_2\\) 以及混合权重 \\(\\pi_1\\)（\\(\\pi_2 = 1 - \\pi_1\\)）"
      ],
      "detail": "<h5>示意图</h5>\n<p><img alt=\"高斯混合模型示意图\" src=\"https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Gaussian_mixture_example.svg/800px-Gaussian_mixture_example.svg.png\" />\n<em>图：高斯混合模型 (GMM) 示意——黑色曲线为观测到的总分布，彩色曲线为各高斯分量，GMM 将复杂分布分解为多个简单高斯分布的加权和。</em></p>\n<h5>算法伪代码（矩估计法）</h5>\n<pre><code>输入: 观测样本 x₁, x₂, ..., xₙ\n输出: 参数 (π₁, μ₁, σ₁, μ₂, σ₂)\n\n1. 计算样本的前 5 阶中心矩:\n     m₁ = 均值\n     μ₂ = 二阶中心矩 (方差)\n     μ₃ = 三阶中心矩 (偏度相关)\n     μ₄ = 四阶中心矩 (峰度相关)\n     μ₅ = 五阶中心矩\n\n2. 建立矩方程组:\n     将混合分布的理论矩表达为 (π₁, μ₁, σ₁, μ₂, σ₂) 的函数\n     令理论矩 = 样本矩，得到 5 个方程\n\n3. 消元化简:\n     通过代数消元，将 5 个方程归约为\n     关于 d = μ₁ - μ₂ 的一个九次多项式方程\n\n4. 数值求解九次方程:\n     找到实数根 d*\n\n5. 回代求解:\n     由 d* 反推 π₁, μ₁, σ₁, μ₂, σ₂\n</code></pre>\n<h5>动机与背景</h5>\n<p>19 世纪末，生物统计学家 W.F.R. Weldon 在研究那不勒斯海湾岸蟹时发现，蟹的额宽与体长之比的频率分布呈现明显的<strong>不对称性 (asymmetry)</strong>，甚至隐约呈现双峰。Weldon 猜测这可能反映了该物种正在经历<strong>自然选择分化</strong>，即种群中存在两个不同的亚群体。然而，当时缺乏严格的数学工具来验证\"一个分布是否可以分解为两个子分布\"这一假说。</p>\n<p>Karl Pearson 在 1894 年的论文中正式提出了这一数学框架：<strong>如果一个观测分布可以被表示为两个（或多个）正态分布的加权叠加，那么我们可以通过样本矩来唯一确定各分量的参数。</strong> 这是统计学史上首次对<strong>混合分布 (mixture distribution)</strong> 进行系统化的数学处理。</p>\n<h5>核心机制：矩估计法</h5>\n<p>Pearson 的核心思想是利用<strong>矩 (moments)</strong> 建立方程组。对于两个正态分布的混合：</p>\n<p>$$\np(x) = \\pi_1 \\mathcal{N}(x;\\mu_1,\\sigma_1^2) + \\pi_2 \\mathcal{N}(x;\\mu_2,\\sigma_2^2)\n$$</p>\n<p>其中 \\(\\pi_1 + \\pi_2 = 1\\)，共有 <strong>5 个独立参数</strong>：\\(\\mu_1, \\sigma_1, \\mu_2, \\sigma_2, \\pi_1\\)。</p>\n<p>混合分布的第 \\(r\\) 阶中心矩可以用这 5 个参数的解析表达式写出。Pearson 利用前 5 阶矩建立了 5 个方程：</p>\n<p>$$\n\\mu_r^{(\\text{sample})} = \\mu_r^{(\\text{theory})}(\\pi_1, \\mu_1, \\sigma_1, \\mu_2, \\sigma_2), \\quad r = 1, 2, 3, 4, 5\n$$</p>\n<div class=\"key-point\">💡 <strong>关键直觉</strong>：正态分布完全由均值和方差决定，因此两个正态分布的混合有 5 个自由度。恰好需要 5 个独立方程（即 5 阶矩）来唯一确定所有参数。</div>\n<h5>九次多项式方程</h5>\n<p>Pearson 通过精巧的代数消元，将 5 个矩方程化简为一个关于两个分量均值之差 \\(d = \\mu_1 - \\mu_2\\) 的<strong>九次多项式方程 (nonic equation)</strong>：</p>\n<p>$$\na_9 d^9 + a_8 d^8 + \\cdots + a_1 d + a_0 = 0\n$$</p>\n<p>其中系数 \\(a_0, \\ldots, a_9\\) 完全由样本矩 \\(\\mu_2, \\mu_3, \\mu_4, \\mu_5\\) 决定。Pearson 在没有计算机的条件下，通过<strong>逐次逼近法</strong>手工求解了这个九次方程的实数根，工作量极为惊人。</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：九次方程可能有多个实数根，每个根对应一组不同的参数解。Pearson 需要根据物理意义（如权重 \\(\\pi_1 \\in (0,1)\\)、标准差为正等约束）筛选合理解。</div>\n<h5>实证结果：岸蟹数据</h5>\n<p>Pearson 将方法应用于 Weldon 的 1000 只岸蟹数据，成功将频率分布分解为两个正态分量：</p>\n<ul>\n<li><strong>分量 1</strong>：约占 41.45% 的个体，均值较小（额宽/体长比偏低）</li>\n<li><strong>分量 2</strong>：约占 58.55% 的个体，均值较大</li>\n</ul>\n<p>拟合结果与观测数据高度吻合，有力支持了 Weldon 关于种群分化的假说。这一结果不仅验证了方法的有效性，也为<strong>达尔文进化论</strong>提供了定量统计证据。</p>\n<h5>与现代方法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>Pearson 矩估计法 (1894)</th>\n<th>EM 算法 (1977)</th>\n<th>变分推断</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>估计原理</td>\n<td>矩匹配</td>\n<td>最大似然 (MLE)</td>\n<td>变分下界最大化</td>\n</tr>\n<tr>\n<td>分量数限制</td>\n<td>实际仅适用于 2 个分量</td>\n<td>任意 K 个分量</td>\n<td>任意 K 个分量</td>\n</tr>\n<tr>\n<td>计算方式</td>\n<td>解高次多项式</td>\n<td>迭代 E-step / M-step</td>\n<td>迭代优化</td>\n</tr>\n<tr>\n<td>数值稳定性</td>\n<td>高阶矩对噪声敏感</td>\n<td>较稳定，可能陷入局部最优</td>\n<td>较稳定</td>\n</tr>\n<tr>\n<td>统计效率</td>\n<td>非最优（矩估计不如 MLE 高效）</td>\n<td>渐近最优</td>\n<td>近似</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 <strong>历史意义</strong>：Pearson 的工作虽然在计算上被 EM 算法取代，但其核心思想——<strong>用简单分布的混合来建模复杂分布</strong>——成为了现代统计学和机器学习中<strong>混合模型、聚类分析、密度估计</strong>的理论基石。GMM 至今仍是最常用的概率聚类模型之一，广泛应用于语音识别、图像分割、异常检测等领域。</div>\n<h5>现代 GMM 的标准形式</h5>\n<p>在现代机器学习中，GMM 被推广为 \\(K\\) 个分量的混合，通常使用 <strong>EM 算法</strong> 进行参数估计：</p>\n<p>$$\np(\\mathbf{x}) = \\sum_{k=1}^{K} \\pi_k \\mathcal{N}(\\mathbf{x}; \\boldsymbol{\\mu}_k, \\boldsymbol{\\Sigma}_k)\n$$</p>\n<p><strong>E-step</strong>（期望步）：计算每个数据点属于各分量的后验概率（责任度）：</p>\n<p>$$\n\\gamma_{nk} = \\frac{\\pi_k \\mathcal{N}(\\mathbf{x}_n; \\boldsymbol{\\mu}_k, \\boldsymbol{\\Sigma}_k)}{\\sum_{j=1}^{K} \\pi_j \\mathcal{N}(\\mathbf{x}_n; \\boldsymbol{\\mu}_j, \\boldsymbol{\\Sigma}_j)}\n$$</p>\n<p><strong>M-step</strong>（最大化步）：利用责任度更新参数：</p>\n<p>$$\n\\boldsymbol{\\mu}_k^{\\text{new}} = \\frac{\\sum_n \\gamma_{nk} \\mathbf{x}_n}{\\sum_n \\gamma_{nk}}, \\quad \\boldsymbol{\\Sigma}_k^{\\text{new}} = \\frac{\\sum_n \\gamma_{nk} (\\mathbf{x}_n - \\boldsymbol{\\mu}_k^{\\text{new}})(\\mathbf{x}_n - \\boldsymbol{\\mu}_k^{\\text{new}})^\\top}{\\sum_n \\gamma_{nk}}, \\quad \\pi_k^{\\text{new}} = \\frac{\\sum_n \\gamma_{nk}}{N}\n$$</p>\n<p>这一迭代过程保证对数似然单调不减，直至收敛到局部最优。</p>",
      "quiz": {
        "q": "Karl Pearson 在 1894 年原始论文中使用什么方法估计高斯混合模型的参数？",
        "options": [
          "最大似然估计 (MLE) 与 EM 算法",
          "矩估计法 (Method of Moments)，通过匹配样本矩与理论矩",
          "贝叶斯推断与 MCMC 采样",
          "梯度下降优化对数似然函数"
        ],
        "answer": 1,
        "explain": "Pearson 通过匹配混合分布的前 5 阶理论矩与样本矩，建立方程组并求解九次多项式，这就是矩估计法。EM 算法直到 1977 年才被提出。"
      }
    },
    {
      "id": "mcmc",
      "num": 2,
      "name": "MCMC",
      "fullName": "马尔可夫链蒙特卡洛 (Markov Chain Monte Carlo)",
      "year": "1953",
      "org": "Los Alamos",
      "parent": "—",
      "paperUrl": "https://pubs.aip.org/jcp/article/21/6/1087/201161",
      "projectUrl": "",
      "category": "foundation",
      "motivation": "高维空间高效随机采样",
      "summary": "Metropolis 等人提出了一种基于马尔可夫链的蒙特卡洛采样方法，通过构造满足细致平衡条件的接受-拒绝准则，使得采样链收敛到目标玻尔兹曼分布，从而在高维空间中高效计算统计力学系统的状态方程，奠定了现代 MCMC 方法的理论基础。",
      "keyPoints": [
        "<strong>Metropolis 接受准则</strong>：对能量降低的移动无条件接受；对能量升高的移动以概率 \\(\\exp(-\\Delta E / k_BT)\\) 接受，确保满足细致平衡（detailed balance）",
        "<strong>马尔可夫链构造</strong>：通过\"提议→接受/拒绝\"的迭代机制构建遍历的马尔可夫链，其平稳分布即为目标分布 \\(\\pi(\\mathbf{x}) \\propto \\exp(-E(\\mathbf{x})/k_BT)\\)",
        "<strong>蒙特卡洛积分</strong>：将高维积分（配分函数、热力学量期望）转化为对马尔可夫链样本的算术平均，避免了对全空间的网格求和",
        "<strong>硬盘/硬球系统验证</strong>：在 MANIAC I 计算机上对 224 个二维硬盘粒子系统进行模拟，计算了不同密度下的状态方程 \\(pV/Nk_BT\\)",
        "<strong>周期性边界条件</strong>：采用周期性边界消除有限尺寸效应，使小系统模拟近似无穷大系统",
        "<strong>对称提议分布</strong>：提议步采用均匀随机位移，保证提议概率对称 \\(q(\\mathbf{x}'|\\mathbf{x}) = q(\\mathbf{x}|\\mathbf{x}')\\)，简化了接受概率的计算"
      ],
      "detail": "<p><img alt=\"Metropolis 算法采样示意图\" src=\"https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Metropolis_hastings_algorithm.svg/800px-Metropolis_hastings_algorithm.svg.png\" />\n<em>图：Metropolis-Hastings 算法在二维目标分布上的采样轨迹示意。蓝色点为接受的样本，红色点为拒绝的提议，采样链逐步覆盖高概率区域。</em></p>\n<pre><code class=\"language-python\"># Metropolis 算法伪代码（原始论文核心逻辑）\nimport numpy as np\n\ndef metropolis(energy_func, x_init, n_steps, step_size, temperature):\n    &quot;&quot;&quot;\n    energy_func: 能量函数 E(x)\n    x_init:      初始构型 (N个粒子的坐标)\n    n_steps:     总迭代步数\n    step_size:   最大位移量 δ\n    temperature: 温度 T (k_B=1)\n    &quot;&quot;&quot;\n    x = x_init.copy()\n    samples = [x.copy()]\n    E_current = energy_func(x)\n\n    for step in range(n_steps):\n        # 1. 随机选择一个粒子 i\n        i = np.random.randint(len(x))\n\n        # 2. 提议新位置：均匀随机位移\n        dx = np.random.uniform(-step_size, step_size, size=x[i].shape)\n        x_new = x.copy()\n        x_new[i] = x[i] + dx\n\n        # 3. 计算能量变化\n        E_new = energy_func(x_new)\n        delta_E = E_new - E_current\n\n        # 4. Metropolis 接受准则\n        if delta_E &lt;= 0:\n            # 能量降低 → 无条件接受\n            x = x_new\n            E_current = E_new\n        else:\n            # 能量升高 → 以概率 exp(-ΔE/T) 接受\n            if np.random.random() &lt; np.exp(-delta_E / temperature):\n                x = x_new\n                E_current = E_new\n            # 否则拒绝，保持原构型\n\n        samples.append(x.copy())\n\n    return samples\n</code></pre>\n<h5>动机与背景</h5>\n<p>1953 年，统计力学面临的核心计算难题是：对于 \\(N\\) 个粒子组成的系统，其热力学性质（如压强、内能）需要对 \\(2N\\) 维（二维情形）或 \\(3N\\) 维（三维情形）的构型空间进行积分。以配分函数为例：</p>\n<p>$$Z = \\int \\exp\\left(-\\frac{E(\\mathbf{r}_1, \\ldots, \\mathbf{r}_N)}{k_B T}\\right) d\\mathbf{r}_1 \\cdots d\\mathbf{r}_N$$</p>\n<p>传统的数值积分方法（如梯形法、Simpson 法）在高维空间中因\"维度灾难\"而完全失效——网格点数随维度指数增长。简单的蒙特卡洛方法（即在全空间均匀随机采样）虽然收敛速率与维度无关，但在高维空间中绝大多数随机点落在低概率区域，导致方差极大、效率极低。Metropolis 等人的关键洞察是：<strong>不需要对全空间均匀采样，而应集中采样高概率区域</strong>——这就是\"重要性采样\"（importance sampling）的思想。</p>\n<h5>核心机制：Metropolis 接受准则</h5>\n<p>论文的核心创新在于设计了一种巧妙的接受-拒绝机制，使得采样链的平稳分布恰好是目标玻尔兹曼分布。具体而言：</p>\n<p><strong>提议步骤</strong>：从当前构型 \\(\\mathbf{X}\\) 出发，随机选取一个粒子 \\(i\\)，对其坐标施加均匀随机位移：</p>\n<p>$$x_i' = x_i + \\xi_1 \\cdot \\delta, \\quad y_i' = y_i + \\xi_2 \\cdot \\delta$$</p>\n<p>其中 \\(\\xi_1, \\xi_2 \\sim \\text{Uniform}(-1, 1)\\)，\\(\\delta\\) 为最大位移步长。</p>\n<p><strong>接受准则</strong>：计算能量变化 \\(\\Delta E = E(\\mathbf{X}') - E(\\mathbf{X})\\)，然后：</p>\n<p>$$P_{\\text{accept}} = \\min\\left(1, \\, \\exp\\left(-\\frac{\\Delta E}{k_B T}\\right)\\right)$$</p>\n<p>即：\n- 若 \\(\\Delta E \\leq 0\\)（能量降低或不变），无条件接受新构型\n- 若 \\(\\Delta E > 0\\)（能量升高），生成均匀随机数 \\(u \\sim \\text{Uniform}(0,1)\\)，当 \\(u < \\exp(-\\Delta E / k_BT)\\) 时接受，否则拒绝</p>\n<div class=\"key-point\">💡 <strong>关键直觉</strong>：这个准则的精妙之处在于，它允许系统\"上坡\"（接受能量更高的状态），但上坡的概率随能量差指数衰减。这使得采样链不会困在局部能量极小值中，而能够探索整个构型空间，最终按玻尔兹曼权重 \\(\\propto \\exp(-E/k_BT)\\) 访问各状态。</div>\n<h5>理论保证：细致平衡与遍历性</h5>\n<p>Metropolis 算法之所以能收敛到目标分布，依赖两个关键数学性质：</p>\n<p><strong>细致平衡条件（Detailed Balance）</strong>：对任意两个构型 \\(\\mathbf{X}\\) 和 \\(\\mathbf{X}'\\)，转移概率满足：</p>\n<p>$$\\pi(\\mathbf{X}) \\cdot T(\\mathbf{X} \\to \\mathbf{X}') = \\pi(\\mathbf{X}') \\cdot T(\\mathbf{X}' \\to \\mathbf{X})$$</p>\n<p>其中 \\(\\pi(\\mathbf{X}) \\propto \\exp(-E(\\mathbf{X})/k_BT)\\) 是目标分布，\\(T(\\mathbf{X} \\to \\mathbf{X}') = q(\\mathbf{X}'|\\mathbf{X}) \\cdot \\alpha(\\mathbf{X}, \\mathbf{X}')\\) 是从 \\(\\mathbf{X}\\) 转移到 \\(\\mathbf{X}'\\) 的总概率（提议概率 × 接受概率）。由于提议分布对称 \\(q(\\mathbf{X}'|\\mathbf{X}) = q(\\mathbf{X}|\\mathbf{X}')\\)，可以验证 Metropolis 准则恰好满足此条件。</p>\n<p><strong>遍历性（Ergodicity）</strong>：由于提议步可以到达构型空间中任意位置（经过足够多步），马尔可夫链是不可约且非周期的，因此存在唯一的平稳分布，且链从任意初始状态出发都会收敛到该分布。</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：细致平衡是充分条件而非必要条件。满足细致平衡保证 \\(\\pi\\) 是平稳分布，但更弱的\"全局平衡\"条件也足够。Metropolis 选择细致平衡是因为它更容易构造和验证。</div>\n<h5>实验验证：硬盘系统的状态方程</h5>\n<p>论文在 Los Alamos 的 MANIAC I 计算机上对二维硬盘系统进行了验证。硬盘系统的能量函数极为简单：</p>\n<p>$$E(\\mathbf{r}_1, \\ldots, \\mathbf{r}_N) = \\begin{cases} 0 & \\text{若所有粒子间距} > d \\\\ +\\infty & \\text{若存在粒子重叠} \\end{cases}$$</p>\n<p>其中 \\(d\\) 为硬盘直径。在此势能下，接受准则简化为：若提议的新位置不导致粒子重叠则接受，否则拒绝（因为 \\(\\exp(-\\infty) = 0\\)）。</p>\n<p>论文使用 224 个粒子、周期性边界条件，在不同面积分数（\\(V/V_0\\)，其中 \\(V_0\\) 为密堆积体积）下运行模拟，计算了约化压强 \\(pV/Nk_BT\\)。结果与已知的维里展开低阶项吻合良好，并首次给出了高密度区域的状态方程数据，为后续液-固相变的研究提供了关键参考。</p>\n<h5>与传统方法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>维度依赖</th>\n<th>采样效率</th>\n<th>适用场景</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>网格积分</td>\n<td>\\(O(M^d)\\) 指数爆炸</td>\n<td>低维精确</td>\n<td>\\(d \\leq 3\\)</td>\n</tr>\n<tr>\n<td>简单蒙特卡洛</td>\n<td>\\(O(1/\\sqrt{N})\\) 与维度无关</td>\n<td>高维低概率区浪费严重</td>\n<td>低维或均匀分布</td>\n</tr>\n<tr>\n<td><strong>Metropolis MCMC</strong></td>\n<td>\\(O(1/\\sqrt{N})\\) 与维度无关</td>\n<td><strong>集中采样高概率区</strong></td>\n<td><strong>任意高维、复杂分布</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p>Metropolis 方法的革命性在于：它将\"均匀采样后加权\"转变为\"按目标分布直接采样\"，使得每个样本都携带等量信息，极大提升了统计效率。</p>\n<div class=\"key-point\">💡 <strong>历史影响</strong>：1953 年的 Metropolis 算法后来被 Hastings（1970）推广为 Metropolis-Hastings 算法（允许非对称提议分布），并衍生出 Gibbs 采样（Geman &amp; Geman, 1984）、Hamiltonian Monte Carlo（Duane et al., 1987）等一系列方法，成为贝叶斯统计、机器学习、计算物理的基石工具。该论文被《Computing in Science &amp; Engineering》评为 20 世纪十大算法之一。</div>",
      "quiz": {
        "q": "在 Metropolis 算法中，当提议的新构型能量高于当前构型时，算法如何处理？",
        "options": [
          "直接拒绝该提议，保持当前构型不变",
          "以概率 exp(-ΔE/kT) 接受该提议，否则保持当前构型",
          "将步长减半后重新提议",
          "以概率 ΔE/kT 接受该提议"
        ],
        "answer": 1,
        "explain": "Metropolis 准则的核心是：能量升高时以 exp(-ΔE/kT) 的概率接受，这保证了细致平衡条件，使采样链能跳出局部极小值并收敛到玻尔兹曼分布。"
      }
    },
    {
      "id": "hmm",
      "num": 3,
      "name": "HMM",
      "fullName": "隐马尔可夫模型 (Hidden Markov Model)",
      "year": "1970",
      "org": "IDA",
      "parent": "—",
      "paperUrl": "https://projecteuclid.org/journals/annals-of-mathematical-statistics/volume-41/issue-1/A-Maximization-Technique-Occurring-in-the-Statistical-Analysis-of-Probabilistic/10.1214/aoms/1177697196.full",
      "projectUrl": "",
      "category": "foundation",
      "motivation": "隐状态序列统计推断建模",
      "summary": "Baum 等人提出了针对马尔可夫链概率函数（即隐马尔可夫模型）的参数极大似然估计方法——Baum-Welch 算法（前向-后向算法），通过\"增长变换\"（growth transformation）证明了迭代重估公式单调递增似然函数，奠定了 HMM 在语音识别、自然语言处理等序列建模领域的数学基础。",
      "keyPoints": [
        "<strong>隐马尔可夫模型形式化定义</strong>：将观测序列建模为隐状态马尔可夫链的概率函数，隐状态不可直接观测，仅通过发射概率生成可观测符号",
        "<strong>三大核心参数</strong>：初始状态分布 \\(\\pi\\)、状态转移概率矩阵 \\(A\\)、观测发射概率矩阵 \\(B\\)，统一记为模型 \\(\\lambda = (A, B, \\pi)\\)",
        "<strong>前向算法（Forward Algorithm）</strong>：递推计算观测序列的似然 \\(P(O|\\lambda)\\)，时间复杂度从暴力枚举的 \\(O(N^T)\\) 降至 \\(O(N^2 T)\\)",
        "<strong>后向算法（Backward Algorithm）</strong>：从序列末端反向递推，与前向变量配合计算隐状态后验概率",
        "<strong>Baum-Welch 重估公式</strong>：利用前向-后向变量构造参数更新公式，属于 EM 算法的特例（早于 Dempster 1977 年正式提出 EM 框架）",
        "<strong>增长变换（Growth Transformation）</strong>：论文的核心数学贡献，证明了重估公式每次迭代都单调不减似然函数值",
        "<strong>HMM 三大经典问题</strong>的基础：评估问题（前向算法）、解码问题（Viterbi 算法）、学习问题（Baum-Welch 算法）"
      ],
      "detail": "<h5>模型框架示意</h5>\n<p><img alt=\"HMM 模型结构示意图\" src=\"https://upload.wikimedia.org/wikipedia/commons/8/8a/HiddenMarkovModel.svg\" />\n<em>图：隐马尔可夫模型的基本结构。上层 \\(X\\) 为隐状态序列（满足马尔可夫性），下层 \\(Y\\) 为观测序列，箭头表示概率依赖关系。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># Baum-Welch 算法（前向-后向算法）伪代码\ndef baum_welch(observations, N, M, max_iter):\n    &quot;&quot;&quot;\n    observations: 观测序列 O = (o_1, o_2, ..., o_T)\n    N: 隐状态数量\n    M: 观测符号数量\n    &quot;&quot;&quot;\n    # 1. 随机初始化参数 λ = (A, B, π)\n    A = random_stochastic_matrix(N, N)   # 状态转移矩阵\n    B = random_stochastic_matrix(N, M)   # 发射概率矩阵\n    pi = random_stochastic_vector(N)     # 初始状态分布\n\n    for iteration in range(max_iter):\n        # === E-Step: 前向-后向计算 ===\n        # 前向变量 α_t(i) = P(o_1,...,o_t, q_t=s_i | λ)\n        alpha = forward(observations, A, B, pi)\n        # 后向变量 β_t(i) = P(o_{t+1},...,o_T | q_t=s_i, λ)\n        beta = backward(observations, A, B)\n\n        # 计算 ξ_t(i,j) = P(q_t=s_i, q_{t+1}=s_j | O, λ)\n        xi = compute_xi(alpha, beta, A, B, observations)\n        # 计算 γ_t(i) = P(q_t=s_i | O, λ) = Σ_j ξ_t(i,j)\n        gamma = compute_gamma(xi)\n\n        # === M-Step: 参数重估 ===\n        pi_new = gamma[0]                          # π̂_i = γ_1(i)\n        A_new = sum(xi, t) / sum(gamma[:-1], t)    # â_ij = Σ_t ξ_t(i,j) / Σ_t γ_t(i)\n        B_new = sum(gamma[where o_t=v_k]) / sum(gamma)  # b̂_j(k) = Σ_{t:o_t=v_k} γ_t(j) / Σ_t γ_t(j)\n\n        A, B, pi = A_new, B_new, pi_new\n\n    return A, B, pi\n</code></pre>\n<h5>动机与背景</h5>\n<p>1960 年代，序列数据的统计建模面临一个核心困难：<strong>观测数据背后的生成机制（状态）往往不可直接观测</strong>。例如在语音识别中，我们只能听到声学信号（观测），而产生这些信号的音素序列（状态）是隐藏的。传统的马尔可夫链模型假设状态可直接观测，无法处理这种\"隐含状态\"的场景。</p>\n<p>Baum 及其在 IDA（Institute for Defense Analyses）的同事们从 1966 年开始发表一系列论文，逐步构建了隐马尔可夫模型的数学理论。1970 年的这篇论文是该系列的集大成之作，首次给出了完整的参数估计算法及其收敛性证明。</p>\n<h5>核心机制：前向-后向算法</h5>\n<p>HMM 的参数学习问题可以表述为：给定观测序列 \\(O = (o_1, o_2, \\ldots, o_T)\\)，求使似然函数 \\(P(O|\\lambda)\\) 最大的模型参数 \\(\\lambda = (A, B, \\pi)\\)。</p>\n<p><strong>前向变量</strong>定义为：</p>\n<p>$$\\alpha_t(i) = P(o_1, o_2, \\ldots, o_t, q_t = s_i \\mid \\lambda)$$</p>\n<p>递推关系为：</p>\n<p>$$\\alpha_1(i) = \\pi_i \\cdot b_i(o_1)$$</p>\n<p>$$\\alpha_{t+1}(j) = \\left[\\sum_{i=1}^{N} \\alpha_t(i) \\cdot a_{ij}\\right] \\cdot b_j(o_{t+1})$$</p>\n<p>其中 \\(a_{ij}\\) 是从状态 \\(s_i\\) 转移到 \\(s_j\\) 的概率，\\(b_j(o_t)\\) 是在状态 \\(s_j\\) 下观测到 \\(o_t\\) 的发射概率。最终似然为：</p>\n<p>$$P(O|\\lambda) = \\sum_{i=1}^{N} \\alpha_T(i)$$</p>\n<div class=\"key-point\">💡 <strong>关键直觉</strong>：前向算法的本质是动态规划——将对所有可能隐状态路径的穷举求和，分解为逐时间步的局部求和，将指数级复杂度降为多项式级。</div>\n<p><strong>后向变量</strong>定义为：</p>\n<p>$$\\beta_t(i) = P(o_{t+1}, o_{t+2}, \\ldots, o_T \\mid q_t = s_i, \\lambda)$$</p>\n<p>递推关系为：</p>\n<p>$$\\beta_T(i) = 1$$</p>\n<p>$$\\beta_t(i) = \\sum_{j=1}^{N} a_{ij} \\cdot b_j(o_{t+1}) \\cdot \\beta_{t+1}(j)$$</p>\n<h5>核心机制：Baum-Welch 重估公式</h5>\n<p>结合前向和后向变量，定义两个关键后验概率：</p>\n<p><strong>状态占据概率</strong> \\(\\gamma_t(i)\\)——在时刻 \\(t\\) 处于状态 \\(s_i\\) 的后验概率：</p>\n<p>$$\\gamma_t(i) = P(q_t = s_i \\mid O, \\lambda) = \\frac{\\alpha_t(i) \\cdot \\beta_t(i)}{P(O|\\lambda)}$$</p>\n<p><strong>状态转移概率</strong> \\(\\xi_t(i,j)\\)——在时刻 \\(t\\) 从状态 \\(s_i\\) 转移到 \\(s_j\\) 的后验概率：</p>\n<p>$$\\xi_t(i,j) = P(q_t = s_i, q_{t+1} = s_j \\mid O, \\lambda) = \\frac{\\alpha_t(i) \\cdot a_{ij} \\cdot b_j(o_{t+1}) \\cdot \\beta_{t+1}(j)}{P(O|\\lambda)}$$</p>\n<p>由此得到<strong>参数重估公式</strong>：</p>\n<p>$$\\hat{\\pi}_i = \\gamma_1(i)$$</p>\n<p>$$\\hat{a}_{ij} = \\frac{\\sum_{t=1}^{T-1} \\xi_t(i,j)}{\\sum_{t=1}^{T-1} \\gamma_t(i)}$$</p>\n<p>$$\\hat{b}_j(k) = \\frac{\\sum_{t=1, o_t=v_k}^{T} \\gamma_t(j)}{\\sum_{t=1}^{T} \\gamma_t(j)}$$</p>\n<div class=\"key-point\">💡 <strong>关键直觉</strong>：重估公式的含义非常直观——新的转移概率 \\(\\hat{a}_{ij}\\) 等于\"从 \\(s_i\\) 转移到 \\(s_j\\) 的期望次数\"除以\"处于 \\(s_i\\) 的期望总次数\"，本质上是用后验期望的频率来估计概率。</div>\n<h5>增长变换与收敛性证明</h5>\n<p>论文最核心的数学贡献是<strong>增长变换（Growth Transformation）</strong>的概念与证明。Baum 等人证明了一个一般性定理：</p>\n<div class=\"warn-box\">⚠️ <strong>核心定理</strong>：设 \\(P(O|\\lambda)\\) 为观测序列在模型 \\(\\lambda\\) 下的似然函数，令 \\(\\bar{\\lambda}\\) 为按上述重估公式更新后的参数，则 \\(P(O|\\bar{\\lambda}) \\geq P(O|\\lambda)\\)，等号成立当且仅当 \\(\\bar{\\lambda} = \\lambda\\)（已达到不动点）。</div>\n<p>这一结论意味着 Baum-Welch 算法每次迭代都保证似然函数单调不减，从而保证收敛到局部极大值。这一证明技巧后来被 Dempster、Laird 和 Rubin（1977）推广为 EM 算法的一般性框架。</p>\n<h5>与传统方法的区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>传统马尔可夫链</th>\n<th>隐马尔可夫模型 (HMM)</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>状态可观测性</td>\n<td>状态直接可观测</td>\n<td>状态隐藏，仅观测到发射符号</td>\n</tr>\n<tr>\n<td>参数估计</td>\n<td>直接频率计数</td>\n<td>需要 Baum-Welch 迭代估计</td>\n</tr>\n<tr>\n<td>计算复杂度</td>\n<td>\\(O(T)\\)</td>\n<td>\\(O(N^2 T)\\) 每次迭代</td>\n</tr>\n<tr>\n<td>表达能力</td>\n<td>仅建模状态转移</td>\n<td>同时建模状态转移与观测生成</td>\n</tr>\n<tr>\n<td>应用场景</td>\n<td>天气预测等简单序列</td>\n<td>语音识别、NLP、生物序列分析</td>\n</tr>\n</tbody>\n</table></div>\n<p>与直接极大似然估计（MLE）相比，Baum-Welch 的优势在于：（1）不需要知道隐状态的真实标注；（2）通过 E-M 交替优化绕过了含隐变量的似然函数难以直接优化的问题；（3）每步迭代有理论保证的单调性。</p>\n<h5>HMM 的三大经典问题</h5>\n<p>虽然本文主要解决学习问题，但 HMM 框架衍生出三大经典问题，构成了完整的理论体系：</p>\n<ol>\n<li><strong>评估问题（Evaluation）</strong>：给定模型 \\(\\lambda\\) 和观测序列 \\(O\\)，计算 \\(P(O|\\lambda)\\) → <strong>前向算法</strong></li>\n<li><strong>解码问题（Decoding）</strong>：给定模型 \\(\\lambda\\) 和观测序列 \\(O\\)，找到最可能的隐状态序列 → <strong>Viterbi 算法</strong>（1967）</li>\n<li><strong>学习问题（Learning）</strong>：给定观测序列 \\(O\\)，找到最优模型参数 \\(\\lambda^*\\) → <strong>Baum-Welch 算法</strong>（本文）</li>\n</ol>",
      "quiz": {
        "q": "Baum-Welch 算法中，前向变量 α_t(i) 的物理含义是什么？",
        "options": [
          "在时刻 t 处于状态 s_i 的先验概率",
          "观测到前 t 个符号且时刻 t 处于状态 s_i 的联合概率",
          "给定完整观测序列后时刻 t 处于状态 s_i 的后验概率",
          "从状态 s_i 出发观测到后续所有符号的概率"
        ],
        "answer": 1,
        "explain": "前向变量 α_t(i) = P(o_1,...,o_t, q_t=s_i | λ)，即观测到前 t 个符号且当前处于状态 s_i 的联合概率。选项 2（后验概率）对应的是 γ_t(i)，选项 3（后续概率）对应的是后向变量 β_t(i)。"
      }
    },
    {
      "id": "em",
      "num": 4,
      "name": "EM",
      "fullName": "期望最大化算法 (Expectation-Maximization)",
      "year": "1977",
      "org": "Harvard",
      "parent": "gmm",
      "paperUrl": "https://academic.oup.com/jrsssb/article/39/1/1/7033013",
      "projectUrl": "",
      "category": "foundation",
      "motivation": "隐变量下迭代极大化似然",
      "summary": "EM 算法提出了一种在含隐变量（或不完全数据）的概率模型中迭代求解最大似然估计（MLE）的通用框架，通过交替执行**期望步（E-step）**和**最大化步（M-step）**，保证似然函数单调不减地收敛到驻点，成为混合模型、缺失数据处理、隐马尔可夫模型等众多领域的基石算法。",
      "keyPoints": [
        "<strong>不完全数据框架</strong>：将观测数据 \\(\\mathbf{x}\\) 视为完全数据 \\((\\mathbf{x}, \\mathbf{z})\\) 的边际化结果，\\(\\mathbf{z}\\) 为隐变量或缺失数据，统一处理多种\"不完全\"场景",
        "<strong>E-step</strong>：在当前参数 \\(\\boldsymbol{\\theta}^{(t)}\\) 下，计算完全数据对数似然关于隐变量后验的条件期望 \\(Q(\\boldsymbol{\\theta}|\\boldsymbol{\\theta}^{(t)})\\)",
        "<strong>M-step</strong>：最大化 \\(Q\\) 函数以更新参数 \\(\\boldsymbol{\\theta}^{(t+1)} = \\arg\\max_{\\boldsymbol{\\theta}} Q(\\boldsymbol{\\theta}|\\boldsymbol{\\theta}^{(t)})\\)",
        "<strong>似然单调性</strong>：严格证明每次迭代后观测数据对数似然不减，即 \\(\\ell(\\boldsymbol{\\theta}^{(t+1)}) \\geq \\ell(\\boldsymbol{\\theta}^{(t)})\\)",
        "<strong>收敛性分析</strong>：证明在正则条件下 EM 收敛到似然函数的驻点（局部极大值或鞍点）",
        "<strong>收敛速率</strong>：线性收敛，速率由缺失信息比例决定——缺失信息越多，收敛越慢",
        "<strong>广义 EM（GEM）</strong>：M-step 不要求全局最大化，只需使 \\(Q\\) 函数增大即可保证收敛",
        "<strong>广泛应用</strong>：混合分布估计、删失/截断数据、分组数据、因子分析、隐马尔可夫模型等"
      ],
      "detail": "<h5>核心框架示意图</h5>\n<p><img alt=\"EM 算法在高斯混合模型上的迭代过程\" src=\"https://upload.wikimedia.org/wikipedia/commons/6/69/EM_Clustering_of_Old_Faithful_data.gif\" />\n<em>图 1：EM 算法在 Old Faithful 间歇泉数据上拟合二元高斯混合模型的迭代过程。E-step 根据当前高斯参数计算每个数据点的隐变量后验（软分配），M-step 根据软分配重新估计高斯参数，交替迭代直至收敛。</em></p>\n<p><img alt=\"scikit-learn GMM 聚类结果示意\" src=\"https://scikit-learn.org/stable/_images/sphx_glr_plot_gmm_001.png\" />\n<em>图 2：EM 迭代过程中似然函数单调上升的示意。每次 E-step 构造一个紧贴当前参数点的下界函数（Q 函数），M-step 最大化该下界，从而\"抬升\"似然值。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># EM 算法通用框架\n# 输入: 观测数据 X, 初始参数 θ⁰, 收敛阈值 ε\n\nθ = θ⁰\nwhile not converged:\n    # ===== E-step =====\n    # 计算 Q 函数: 完全数据对数似然在隐变量后验下的期望\n    # Q(θ|θ_old) = E_{Z|X,θ_old}[log p(X, Z | θ)]\n    Q = compute_Q(X, θ)\n\n    # ===== M-step =====\n    # 最大化 Q 函数更新参数\n    θ_new = argmax_θ Q(θ | θ_old)\n\n    # 收敛检查\n    if |ℓ(θ_new) - ℓ(θ)| &lt; ε:\n        converged = True\n    θ = θ_new\n\nreturn θ\n\n# ===== 高斯混合模型 (GMM) 的 EM 具体实例 =====\n# K 个高斯分量, 参数: π_k (混合权重), μ_k (均值), Σ_k (协方差)\n\nθ = initialize(K)\nwhile not converged:\n    # E-step: 计算每个数据点属于各分量的后验概率 (责任值)\n    for n in range(N):\n        for k in range(K):\n            γ(z_nk) = π_k * N(x_n | μ_k, Σ_k) / Σ_j π_j * N(x_n | μ_j, Σ_j)\n\n    # M-step: 用责任值加权更新参数\n    for k in range(K):\n        N_k = Σ_n γ(z_nk)                          # 有效样本数\n        μ_k = (1/N_k) * Σ_n γ(z_nk) * x_n          # 加权均值\n        Σ_k = (1/N_k) * Σ_n γ(z_nk) * (x_n-μ_k)(x_n-μ_k)ᵀ  # 加权协方差\n        π_k = N_k / N                               # 混合权重\n</code></pre>\n<h5>动机与背景</h5>\n<p><strong>核心问题</strong>：在含隐变量或不完全数据的统计模型中，如何高效地求解最大似然估计？</p>\n<p>在许多实际统计问题中，观测数据是\"不完全\"的——可能存在缺失值、删失（censoring）、截断（truncation），或者模型本身包含不可观测的隐变量。此时，观测数据的对数似然函数：</p>\n<p>$$\\ell(\\boldsymbol{\\theta}) = \\log p(\\mathbf{x}|\\boldsymbol{\\theta}) = \\log \\int p(\\mathbf{x}, \\mathbf{z}|\\boldsymbol{\\theta}) \\, d\\mathbf{z}$$</p>\n<p>由于对隐变量 \\(\\mathbf{z}\\) 的积分（或求和），通常没有解析解，直接优化非常困难。传统的 Newton-Raphson 等数值优化方法虽然可用，但需要计算复杂的 Hessian 矩阵，且不保证每步迭代都使似然增大。</p>\n<p>在 1977 年之前，E-step 和 M-step 的思想已在特定问题中被独立使用（如混合模型的迭代估计），但缺乏统一的理论框架。Dempster、Laird 和 Rubin 的贡献在于：<strong>将这些分散的方法统一为一个通用算法框架，并严格证明了其收敛性质</strong>。</p>\n<h5>核心机制：Q 函数与 EM 迭代</h5>\n<p>EM 算法的核心思想是：<strong>不直接优化难以处理的观测似然 \\(\\ell(\\boldsymbol{\\theta})\\)，而是反复构造并优化一个更容易处理的替代目标函数——Q 函数</strong>。</p>\n<p><strong>定义 Q 函数</strong>：</p>\n<p>$$Q(\\boldsymbol{\\theta}|\\boldsymbol{\\theta}^{(t)}) = \\mathbb{E}_{\\mathbf{z}|\\mathbf{x}, \\boldsymbol{\\theta}^{(t)}} \\left[ \\log p(\\mathbf{x}, \\mathbf{z}|\\boldsymbol{\\theta}) \\right] = \\int p(\\mathbf{z}|\\mathbf{x}, \\boldsymbol{\\theta}^{(t)}) \\log p(\\mathbf{x}, \\mathbf{z}|\\boldsymbol{\\theta}) \\, d\\mathbf{z}$$</p>\n<p>其中 \\(p(\\mathbf{z}|\\mathbf{x}, \\boldsymbol{\\theta}^{(t)})\\) 是在当前参数估计 \\(\\boldsymbol{\\theta}^{(t)}\\) 下隐变量的后验分布。</p>\n<div class=\"key-point\">💡 <strong>关键直觉</strong>：完全数据 \\((\\mathbf{x}, \\mathbf{z})\\) 的对数似然 \\(\\log p(\\mathbf{x}, \\mathbf{z}|\\boldsymbol{\\theta})\\) 通常具有良好的形式（例如在指数族中有闭式解），比边际似然 \\(\\log p(\\mathbf{x}|\\boldsymbol{\\theta})\\) 容易优化得多。Q 函数通过对隐变量取期望，将\"缺失\"的信息用其后验期望\"填补\"，从而将不完全数据问题转化为（加权的）完全数据问题。</div>\n<h5>核心机制：似然单调性证明</h5>\n<p>EM 算法最重要的理论保证是<strong>每次迭代后观测数据似然不减</strong>。证明的关键在于以下分解：</p>\n<p>$$\\log p(\\mathbf{x}|\\boldsymbol{\\theta}) = Q(\\boldsymbol{\\theta}|\\boldsymbol{\\theta}^{(t)}) - H(\\boldsymbol{\\theta}|\\boldsymbol{\\theta}^{(t)})$$</p>\n<p>其中：</p>\n<p>$$H(\\boldsymbol{\\theta}|\\boldsymbol{\\theta}^{(t)}) = \\mathbb{E}_{\\mathbf{z}|\\mathbf{x}, \\boldsymbol{\\theta}^{(t)}} \\left[ \\log p(\\mathbf{z}|\\mathbf{x}, \\boldsymbol{\\theta}) \\right]$$</p>\n<p>由 Gibbs 不等式（或 Jensen 不等式），对任意 \\(\\boldsymbol{\\theta}\\) 有：</p>\n<p>$$H(\\boldsymbol{\\theta}|\\boldsymbol{\\theta}^{(t)}) \\leq H(\\boldsymbol{\\theta}^{(t)}|\\boldsymbol{\\theta}^{(t)})$$</p>\n<p>因此，如果 M-step 保证 \\(Q(\\boldsymbol{\\theta}^{(t+1)}|\\boldsymbol{\\theta}^{(t)}) \\geq Q(\\boldsymbol{\\theta}^{(t)}|\\boldsymbol{\\theta}^{(t)})\\)，则：</p>\n<p>$$\\ell(\\boldsymbol{\\theta}^{(t+1)}) \\geq \\ell(\\boldsymbol{\\theta}^{(t)})$$</p>\n<div class=\"key-point\">💡 <strong>关键直觉</strong>：EM 的每次迭代相当于在当前参数处构造观测似然的一个<strong>紧下界</strong>（Q 函数减去一个常数），然后最大化这个下界。由于下界在当前点与似然相切，最大化下界必然\"抬升\"似然值。这与后来的变分推断（如 VAE 中的 ELBO）在思想上一脉相承。</div>\n<h5>收敛速率与缺失信息原理</h5>\n<p>论文中深入分析了 EM 的收敛速率。在参数真值 \\(\\boldsymbol{\\theta}^*\\) 附近，EM 的迭代映射 \\(M\\) 的 Jacobian 矩阵为：</p>\n<p>$$\\mathbf{J} = \\mathbf{I}_{\\text{obs}}^{-1}(\\boldsymbol{\\theta}^*) \\cdot \\mathbf{I}_{\\text{mis}}(\\boldsymbol{\\theta}^*)$$</p>\n<p>其中 \\(\\mathbf{I}_{\\text{obs}}\\) 是观测数据的 Fisher 信息矩阵，\\(\\mathbf{I}_{\\text{mis}}\\) 是缺失数据的 Fisher 信息矩阵。它们满足：</p>\n<p>$$\\mathbf{I}_{\\text{obs}} = \\mathbf{I}_{\\text{com}} - \\mathbf{I}_{\\text{mis}}$$</p>\n<p>其中 \\(\\mathbf{I}_{\\text{com}}\\) 是完全数据的 Fisher 信息矩阵。</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：EM 的收敛速率是<strong>线性</strong>的（不像 Newton 法的二次收敛），且速率由<strong>缺失信息比例</strong> \\(\\mathbf{I}_{\\text{mis}} / \\mathbf{I}_{\\text{com}}\\) 决定。当缺失信息占比大时（如高维混合模型中分量高度重叠），EM 收敛会非常缓慢。这也是后续加速 EM 变体（如 ECME、PX-EM、Aitken 加速）的动机。</div>\n<h5>广义 EM（GEM）与变体</h5>\n<p>论文指出 M-step 不必求全局最大值，只要满足：</p>\n<p>$$Q(\\boldsymbol{\\theta}^{(t+1)}|\\boldsymbol{\\theta}^{(t)}) \\geq Q(\\boldsymbol{\\theta}^{(t)}|\\boldsymbol{\\theta}^{(t)})$$</p>\n<p>即可保证似然单调性。这一放松产生了<strong>广义 EM（GEM）</strong>算法，极大地扩展了 EM 的适用范围——在 M-step 无法求解析解时，只需沿梯度方向走一步即可。</p>\n<h5>与传统方法的区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th style=\"text-align: center;\">是否保证似然单调增</th>\n<th style=\"text-align: center;\">是否需要 Hessian</th>\n<th style=\"text-align: center;\">适用于隐变量模型</th>\n<th>收敛速率</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Newton-Raphson</td>\n<td style=\"text-align: center;\">❌</td>\n<td style=\"text-align: center;\">✅ 需要</td>\n<td style=\"text-align: center;\">需手动边际化</td>\n<td>二次</td>\n</tr>\n<tr>\n<td>梯度上升</td>\n<td style=\"text-align: center;\">❌</td>\n<td style=\"text-align: center;\">❌</td>\n<td style=\"text-align: center;\">需手动边际化</td>\n<td>线性</td>\n</tr>\n<tr>\n<td>坐标上升</td>\n<td style=\"text-align: center;\">✅</td>\n<td style=\"text-align: center;\">❌</td>\n<td style=\"text-align: center;\">受限</td>\n<td>线性</td>\n</tr>\n<tr>\n<td><strong>EM</strong></td>\n<td style=\"text-align: center;\"><strong>✅</strong></td>\n<td style=\"text-align: center;\"><strong>❌</strong></td>\n<td style=\"text-align: center;\"><strong>✅ 天然适配</strong></td>\n<td><strong>线性</strong></td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：EM 只保证收敛到<strong>局部极大值或鞍点</strong>，不保证全局最优。实践中通常需要多次随机初始化并选择似然最高的解。此外，EM 不直接提供参数估计的标准误（需要额外计算观测信息矩阵或使用 Louis 公式）。</div>",
      "quiz": {
        "q": "EM 算法中 E-step 的核心操作是什么？",
        "options": [
          "直接对观测数据对数似然求梯度",
          "计算完全数据对数似然在隐变量后验分布下的条件期望（Q 函数）",
          "对隐变量进行硬分配（取最大后验估计）",
          "用蒙特卡洛采样近似边际似然"
        ],
        "answer": 1,
        "explain": "E-step 计算 Q(θ|θ^(t)) = E_{z|x,θ^(t)}[log p(x,z|θ)]，即在当前参数下对完全数据对数似然关于隐变量后验取期望，将不完全数据问题转化为加权的完全数据问题。"
      }
    },
    {
      "id": "mrf",
      "num": 5,
      "name": "MRF",
      "fullName": "马尔可夫随机场 (Markov Random Field)",
      "year": "1984",
      "org": "Brown Univ.",
      "parent": "mcmc",
      "paperUrl": "https://ieeexplore.ieee.org/abstract/document/4767596/",
      "projectUrl": "",
      "category": "core",
      "motivation": "无向图建模空间相关性",
      "summary": "Geman 与 Geman 提出将马尔可夫随机场（MRF）作为图像的先验模型，利用 Hammersley-Clifford 定理建立 MRF 与 Gibbs 分布的等价关系，并引入 Gibbs 采样和模拟退火算法实现贝叶斯图像复原中的后验采样与 MAP 估计，奠定了空间统计建模与随机优化在计算机视觉中的理论基础。",
      "keyPoints": [
        "<strong>马尔可夫随机场先验</strong>：将图像像素建模为无向图上的随机场，像素值仅依赖于其邻域（局部马尔可夫性），自然编码空间相关性与局部平滑约束",
        "<strong>Hammersley-Clifford 定理</strong>：证明满足正性条件的随机场是 MRF 当且仅当其联合分布为 Gibbs 分布 \\(P(\\mathbf{x}) = Z^{-1}\\exp(-U(\\mathbf{x})/T)\\)，其中能量函数 \\(U(\\mathbf{x})\\) 可分解为团势函数之和",
        "<strong>Gibbs 采样器</strong>：提出逐像素条件采样的迭代算法，证明其生成的马尔可夫链收敛到联合 Gibbs 分布，为高维 MRF 提供了可行的采样方案",
        "<strong>模拟退火（Simulated Annealing）</strong>：将温度参数 \\(T\\) 按对数调度 \\(T_n = c/\\log(1+n)\\) 逐步降低，证明在此调度下 Gibbs 采样器以概率 1 收敛到全局能量最小值（MAP 估计）",
        "<strong>贝叶斯图像复原框架</strong>：将退化观测建模为似然 \\(P(\\mathbf{y}|\\mathbf{x})\\)，MRF 作为先验 \\(P(\\mathbf{x})\\)，通过后验 \\(P(\\mathbf{x}|\\mathbf{y}) \\propto P(\\mathbf{y}|\\mathbf{x})P(\\mathbf{x})\\) 进行复原",
        "<strong>线过程（Line Process）</strong>：引入二值边缘变量显式建模不连续性（边缘），使 MRF 先验能同时编码区域平滑性与边界保持"
      ],
      "detail": "<p><img alt=\"MRF 图模型与邻域系统示意\" src=\"https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Markov_random_field_example.png/400px-Markov_random_field_example.png\" />\n<em>图：马尔可夫随机场的图结构示意。每个节点表示一个像素随机变量，边连接相邻像素，体现局部马尔可夫性：给定邻域后，中心像素条件独立于所有其他像素。</em></p>\n<pre><code class=\"language-python\"># Gibbs 采样器 + 模拟退火用于 MRF 图像复原（论文核心算法）\nimport numpy as np\n\ndef gibbs_sampler_annealing(y, beta, sigma, n_iter, T_schedule):\n    &quot;&quot;&quot;\n    y:          观测退化图像 (H x W)\n    beta:       MRF 先验中邻域交互强度\n    sigma:      观测噪声标准差\n    n_iter:     总迭代次数\n    T_schedule: 温度调度函数 T(n)\n    &quot;&quot;&quot;\n    H, W = y.shape\n    # 初始化为观测图像\n    x = y.copy()\n    labels = np.unique(y)  # 离散标签集合\n\n    for n in range(1, n_iter + 1):\n        T = T_schedule(n)  # 当前温度，如 T(n) = c / log(1+n)\n\n        # 逐像素 Gibbs 采样（随机扫描或光栅扫描）\n        for i in range(H):\n            for j in range(W):\n                # 计算每个可能标签的条件能量\n                energies = []\n                for label in labels:\n                    # 似然能量（数据项）\n                    E_data = (y[i, j] - label) ** 2 / (2 * sigma ** 2)\n\n                    # 先验能量（MRF 团势：Ising/Potts 模型）\n                    E_prior = 0\n                    for di, dj in [(-1,0),(1,0),(0,-1),(0,1)]:\n                        ni, nj = i + di, j + dj\n                        if 0 &lt;= ni &lt; H and 0 &lt;= nj &lt; W:\n                            E_prior += beta * (1 if x[ni, nj] != label else 0)\n\n                    energies.append(E_data + E_prior)\n\n                # Gibbs 条件分布\n                energies = np.array(energies)\n                probs = np.exp(-energies / T)\n                probs /= probs.sum()\n\n                # 按条件分布采样\n                x[i, j] = np.random.choice(labels, p=probs)\n\n    return x  # 退火后近似 MAP 估计\n</code></pre>\n<h5>动机与背景</h5>\n<p>1984 年之前，图像处理领域主要依赖确定性方法（如线性滤波、边缘检测算子），缺乏统一的概率建模框架来处理噪声去除、纹理分析和图像分割等问题。核心困难在于：图像具有强烈的<strong>空间相关性</strong>——相邻像素倾向于取相似值（平滑区域），但又存在突变（边缘）。如何用概率模型同时编码这两种特性？</p>\n<p>传统的独立像素假设（每个像素独立同分布）完全忽略空间结构；而直接指定高维联合分布 \\(P(x_1, x_2, \\ldots, x_N)\\)（\\(N\\) 为像素总数，通常 \\(>10^5\\)）在参数化和计算上都不可行。Geman 与 Geman 的关键洞察是：<strong>利用无向图模型（MRF）通过局部交互隐式定义全局联合分布</strong>，使得模型既能捕获空间相关性，又在参数和计算上可控。</p>\n<h5>核心机制一：MRF 与 Gibbs 分布的等价性</h5>\n<p>论文的理论基石是 <strong>Hammersley-Clifford 定理</strong>。设 \\(S = \\{1, 2, \\ldots, N\\}\\) 为像素集合（图的节点），\\(\\partial_i\\) 为像素 \\(i\\) 的邻域。随机场 \\(\\mathbf{X} = (X_1, \\ldots, X_N)\\) 称为关于邻域系统 \\(\\{\\partial_i\\}\\) 的 MRF，若满足：</p>\n<p>$$P(X_i = x_i \\mid X_j = x_j, \\, j \\neq i) = P(X_i = x_i \\mid X_j = x_j, \\, j \\in \\partial_i)$$</p>\n<p>即给定邻域后，中心像素条件独立于所有非邻域像素。Hammersley-Clifford 定理指出，若 \\(P(\\mathbf{x}) > 0\\) 对所有构型成立（正性条件），则 \\(\\mathbf{X}\\) 是 MRF 当且仅当其联合分布为 Gibbs 分布：</p>\n<p>$$P(\\mathbf{x}) = \\frac{1}{Z} \\exp\\left(-\\frac{U(\\mathbf{x})}{T}\\right), \\quad Z = \\sum_{\\mathbf{x}} \\exp\\left(-\\frac{U(\\mathbf{x})}{T}\\right)$$</p>\n<p>其中能量函数 \\(U(\\mathbf{x})\\) 可唯一分解为<strong>团势函数</strong>之和：</p>\n<p>$$U(\\mathbf{x}) = \\sum_{c \\in \\mathcal{C}} V_c(\\mathbf{x})$$</p>\n<p>\\(\\mathcal{C}\\) 是图中所有团（clique，即完全子图）的集合，\\(V_c\\) 仅依赖于团 \\(c\\) 中节点的取值。</p>\n<div class=\"key-point\">💡 <strong>关键直觉</strong>：这个定理将\"局部条件独立性\"（MRF 定义，直观但难以直接计算）与\"全局 Gibbs 分布\"（参数化形式，可通过能量函数设计）等价起来。建模者只需设计局部的团势函数，就自动获得了一个满足空间马尔可夫性的全局概率模型。</div>\n<h5>核心机制二：Gibbs 采样器</h5>\n<p>即使有了 Gibbs 分布的显式形式，直接计算后验期望或 MAP 估计仍然不可行，因为配分函数 \\(Z\\) 涉及对所有可能构型（指数多个）的求和。论文提出 <strong>Gibbs 采样器</strong>（也称热浴算法）作为解决方案：</p>\n<p><strong>算法</strong>：在每一步中，随机选取一个像素 \\(i\\)，根据其<strong>完全条件分布</strong>重新采样：</p>\n<p>$$P(X_i = x_i \\mid \\mathbf{X}_{\\setminus i} = \\mathbf{x}_{\\setminus i}) = \\frac{\\exp(-U_i(x_i) / T)}{\\sum_{x_i'} \\exp(-U_i(x_i') / T)}$$</p>\n<p>其中 \\(U_i(x_i)\\) 仅涉及包含像素 \\(i\\) 的团的势函数之和（因此只依赖邻域值）。</p>\n<p>论文证明了：在温度 \\(T\\) 固定时，Gibbs 采样器生成的马尔可夫链满足细致平衡条件，且是遍历的，因此从任意初始状态出发都收敛到目标 Gibbs 分布 \\(P(\\mathbf{x})\\)。这使得通过长时间运行采样器并收集样本，可以近似计算任意后验统计量（如条件均值、边缘概率等）。</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：Gibbs 采样器是 MCMC 方法的一个特例——它等价于 Metropolis-Hastings 算法中接受率恒为 1 的情形（因为提议分布就是完全条件分布）。论文正是在 Metropolis 算法（1953）的基础上，针对 MRF 的条件独立结构设计了更高效的采样方案。</div>\n<h5>核心机制三：模拟退火与 MAP 估计</h5>\n<p>对于图像复原，通常需要找到后验概率最大的构型（MAP 估计），即最小化后验能量。这是一个组合优化问题（NP-hard），传统的贪心方法（如 ICM，Iterated Conditional Modes）容易陷入局部极小值。</p>\n<p>论文将物理学中的<strong>模拟退火</strong>思想与 Gibbs 采样结合：在采样过程中逐步降低温度 \\(T\\)。高温时分布接近均匀（广泛探索），低温时分布集中在能量最低的状态（精细优化）。关键理论结果是：</p>\n<p>$$\\text{若温度调度满足 } T_n \\geq \\frac{c}{\\log(1+n)}, \\text{ 其中 } c \\geq \\Delta^* \\text{（最大能量壁垒）}$$</p>\n<p>则 Gibbs 采样器以概率 1 收敛到全局能量最小值集合。这是论文最重要的理论贡献之一——它为随机优化提供了严格的收敛保证。</p>\n<p>$$\\lim_{n \\to \\infty} P(\\mathbf{X}^{(n)} \\in \\arg\\min U(\\mathbf{x})) = 1$$</p>\n<h5>贝叶斯图像复原框架</h5>\n<p>论文将上述工具整合为完整的贝叶斯复原框架：</p>\n<ol>\n<li><strong>先验模型</strong>：图像 \\(\\mathbf{x}\\) 服从 MRF/Gibbs 分布，能量函数编码平滑性（如 Ising 模型的 \\(V_c(x_i, x_j) = \\beta \\cdot \\mathbf{1}[x_i \\neq x_j]\\)）和边缘保持（通过线过程）</li>\n<li><strong>似然模型</strong>：观测 \\(\\mathbf{y}\\) 由真实图像经退化（模糊+噪声）得到，\\(P(\\mathbf{y}|\\mathbf{x}) \\propto \\exp(-\\|\\mathbf{y} - H\\mathbf{x}\\|^2 / 2\\sigma^2)\\)</li>\n<li><strong>后验推断</strong>：后验 \\(P(\\mathbf{x}|\\mathbf{y}) \\propto P(\\mathbf{y}|\\mathbf{x})P(\\mathbf{x})\\) 仍为 Gibbs 分布，能量为 \\(U_{\\text{posterior}} = U_{\\text{data}} + U_{\\text{prior}}\\)</li>\n<li><strong>求解</strong>：用 Gibbs 采样 + 模拟退火找到 MAP 估计</li>\n</ol>\n<div class=\"key-point\">💡 <strong>历史影响</strong>：这篇论文开创了将概率图模型用于计算机视觉的范式，直接催生了条件随机场（CRF, Lafferty 2001）、图割优化（Boykov 2001）等后续工作。MRF 模型至今仍是图像分割、立体匹配、纹理合成等任务的核心建模工具。Gibbs 采样则成为贝叶斯统计中最广泛使用的 MCMC 方法之一。</div>\n<h5>与传统方法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>空间建模</th>\n<th>不确定性量化</th>\n<th>全局最优保证</th>\n<th>适用场景</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>线性滤波（维纳滤波）</td>\n<td>平稳假设，全局频域</td>\n<td>无</td>\n<td>线性最优</td>\n<td>平稳退化、高斯噪声</td>\n</tr>\n<tr>\n<td>边缘检测 + 区域生长</td>\n<td>启发式局部规则</td>\n<td>无</td>\n<td>无</td>\n<td>简单场景</td>\n</tr>\n<tr>\n<td><strong>MRF + Gibbs 采样</strong></td>\n<td><strong>局部马尔可夫性，灵活团势</strong></td>\n<td><strong>完整后验分布</strong></td>\n<td><strong>模拟退火保证</strong></td>\n<td><strong>复杂纹理、非平稳、多类分割</strong></td>\n</tr>\n</tbody>\n</table></div>",
      "quiz": {
        "q": "Hammersley-Clifford 定理建立了什么等价关系？",
        "options": [
          "有向图模型与无向图模型之间的等价",
          "满足正性条件的马尔可夫随机场与 Gibbs 分布之间的等价",
          "Gibbs 采样与 Metropolis-Hastings 算法之间的等价",
          "模拟退火与梯度下降之间的等价"
        ],
        "answer": 1,
        "explain": "Hammersley-Clifford 定理证明：在正性条件下，随机场满足关于邻域系统的局部马尔可夫性（MRF）当且仅当其联合分布为 Gibbs 分布（能量可分解为团势函数之和），这是 MRF 建模的理论基石。"
      }
    },
    {
      "id": "bn",
      "num": 6,
      "name": "BN",
      "fullName": "贝叶斯网络 (Bayesian Network)",
      "year": "1988",
      "org": "UCLA",
      "parent": "—",
      "paperUrl": "http://bayes.cs.ucla.edu/jp_home.html",
      "projectUrl": "",
      "category": "foundation",
      "motivation": "有向图表达因果依赖关系",
      "summary": "Pearl 提出贝叶斯网络（Bayesian Network），用有向无环图（DAG）编码随机变量间的条件独立关系，并给出基于消息传递的高效精确推断算法（信念传播），将联合概率分布的表示与推理从指数级复杂度降至可处理规模，奠定了概率图模型与因果推断的理论基础。",
      "keyPoints": [
        "<strong>有向无环图（DAG）表示</strong>：每个节点代表一个随机变量，有向边表示直接概率依赖（因果影响），缺失的边编码条件独立性假设",
        "<strong>联合分布分解</strong>：利用链式法则与条件独立性，将联合概率分解为局部条件概率表（CPT）的乘积：\\(P(X_1, \\ldots, X_n) = \\prod_{i=1}^{n} P(X_i \\mid \\text{Parents}(X_i))\\)",
        "<strong>d-分离准则（d-separation）</strong>：图结构上的路径阻断判定法则，可直接从 DAG 拓扑读出任意变量集间的条件独立关系",
        "<strong>信念传播算法（Belief Propagation）</strong>：在树结构贝叶斯网上的精确推断算法，通过节点间传递 \\(\\lambda\\) 消息（自底向上的似然证据）和 \\(\\pi\\) 消息（自顶向下的先验信息）实现高效后验计算",
        "<strong>马尔可夫毯（Markov Blanket）</strong>：一个节点的父节点、子节点及子节点的其他父节点构成其马尔可夫毯，给定马尔可夫毯后该节点与网络中其余所有节点条件独立",
        "<strong>因果语义</strong>：DAG 的有向边天然承载因果方向信息，为后续因果推断（do-calculus）奠定图结构基础"
      ],
      "detail": "<h5>模型框架示意</h5>\n<p><img alt=\"贝叶斯网络结构示意图\" src=\"https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/SimpleBayesNet.svg/400px-SimpleBayesNet.svg.png\" />\n<em>图：一个简单贝叶斯网络示例。有向边表示变量间的直接概率依赖关系，联合分布可分解为各节点给定其父节点的条件概率之积。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># Pearl 信念传播算法（树结构精确推断）伪代码\ndef belief_propagation(bn_tree, evidence):\n    &quot;&quot;&quot;\n    bn_tree: 树结构贝叶斯网络（节点含 CPT）\n    evidence: 观测证据 {node: observed_value}\n    返回: 每个节点的后验概率 P(X_i | evidence)\n    &quot;&quot;&quot;\n    # 1. 初始化消息\n    for node in bn_tree.nodes:\n        node.lambda_val = uniform()       # λ(x): 来自子节点的似然消息\n        node.pi_val = uniform()           # π(x): 来自父节点的先验消息\n        if node in evidence:\n            node.lambda_val = indicator(evidence[node])  # 证据节点: δ 函数\n\n    # 2. 自底向上传递 λ 消息（叶→根）\n    for node in reverse_topological_order(bn_tree):\n        if node.is_leaf and node not in evidence:\n            node.lambda_val = ones()      # 非证据叶节点: 全 1\n        else:\n            # λ(x_i) = ∏_child λ_child→i(x_i)\n            node.lambda_val = product(\n                lambda_message(child, node) for child in node.children\n            )\n        # 向父节点发送 λ 消息\n        if node.parent:\n            # λ_node→parent(x_parent) = Σ_{x_node} P(x_node|x_parent) · λ(x_node)\n            msg = sum_over(node.cpt * node.lambda_val, axis=node)\n            send_lambda(node, node.parent, msg)\n\n    # 3. 自顶向下传递 π 消息（根→叶）\n    for node in topological_order(bn_tree):\n        if node.is_root:\n            node.pi_val = node.prior      # 根节点: 先验分布\n        else:\n            # π(x_i) = Σ_{x_parent} P(x_i|x_parent) · π_parent→i(x_parent)\n            node.pi_val = sum_over(node.cpt * pi_message(node.parent, node))\n        # 向子节点发送 π 消息\n        for child in node.children:\n            # π_node→child(x_node) = π(x_node) · ∏_{other_child} λ_{other→node}(x_node)\n            msg = node.pi_val * product(\n                lambda_message(c, node) for c in node.children if c != child\n            )\n            send_pi(node, child, msg)\n\n    # 4. 计算后验: BEL(x_i) = α · λ(x_i) · π(x_i)\n    for node in bn_tree.nodes:\n        node.belief = normalize(node.lambda_val * node.pi_val)\n\n    return {node: node.belief for node in bn_tree.nodes}\n</code></pre>\n<h5>动机与背景</h5>\n<p>20 世纪 80 年代，人工智能领域的知识表示与推理面临严峻挑战。基于规则的专家系统（如 MYCIN）在处理不确定性时依赖确定性因子（certainty factor）等临时性方法，缺乏严格的概率论基础，导致推理结果不一致且难以维护。另一方面，直接使用完整的联合概率分布进行推理在计算上是不可行的——\\(n\\) 个二值变量的联合分布需要 \\(2^n - 1\\) 个独立参数，存储和计算都呈指数增长。</p>\n<p>Judea Pearl 在 UCLA 的研究团队提出了一个优雅的解决方案：<strong>利用有向无环图（DAG）显式编码变量间的条件独立关系</strong>，从而将高维联合分布分解为低维局部条件分布的乘积。这一思想的核心洞察是——现实世界中的变量之间通常只存在稀疏的直接依赖关系，大量变量在给定少数中间变量后是条件独立的。通过图结构捕获这种稀疏性，可以将指数级的参数空间压缩到线性级别。</p>\n<p>Pearl 的 1988 年专著《Probabilistic Reasoning in Intelligent Systems: Networks of Plausible Inference》系统地建立了贝叶斯网络的理论框架，包括图结构的语义定义、条件独立性的图判定准则（d-分离）、以及高效的推断算法（信念传播）。这部著作不仅统一了此前分散的概率推理方法，更开创了概率图模型这一全新研究领域。</p>\n<h5>核心机制：联合分布的图分解</h5>\n<p>贝叶斯网络的数学基础建立在<strong>条件独立性</strong>与<strong>链式法则</strong>的结合之上。对于任意联合分布，链式法则给出：</p>\n<p>$$P(X_1, X_2, \\ldots, X_n) = \\prod_{i=1}^{n} P(X_i \\mid X_1, \\ldots, X_{i-1})$$</p>\n<p>在一般情况下，每个条件概率 \\(P(X_i \\mid X_1, \\ldots, X_{i-1})\\) 可能依赖于所有前序变量。贝叶斯网络的关键假设是：<strong>每个变量在给定其父节点后，与所有非后代节点条件独立</strong>，即：</p>\n<p>$$P(X_i \\mid X_1, \\ldots, X_{i-1}) = P(X_i \\mid \\text{Parents}(X_i))$$</p>\n<p>这一局部马尔可夫性质使得联合分布可以紧凑地分解为：</p>\n<p>$$P(X_1, X_2, \\ldots, X_n) = \\prod_{i=1}^{n} P(X_i \\mid \\text{Parents}(X_i))$$</p>\n<div class=\"key-point\">💡 <strong>关键直觉</strong>：贝叶斯网络的图分解本质上是一种\"知识压缩\"——通过显式声明哪些变量之间<strong>没有</strong>直接依赖，将联合分布的参数量从指数级降至与网络边数成正比的线性级。例如，一个包含 100 个二值变量、每个变量最多 3 个父节点的贝叶斯网络，仅需约 \\(100 \\times 2^3 = 800\\) 个参数，而完整联合分布需要 \\(2^{100} - 1 \\approx 10^{30}\\) 个参数。</div>\n<h5>核心机制：d-分离准则</h5>\n<p>Pearl 提出的 <strong>d-分离（d-separation）</strong> 准则是贝叶斯网络理论中最优雅的贡献之一。它提供了一种纯图论方法，仅通过检查 DAG 的拓扑结构即可判定任意两组变量在给定第三组变量时是否条件独立。</p>\n<p>d-分离的判定基于三种基本连接模式：</p>\n<ol>\n<li><strong>链式连接（Chain）</strong>：\\(A \\to B \\to C\\)。给定 \\(B\\) 后，\\(A\\) 与 \\(C\\) 条件独立（信息流被阻断）</li>\n<li><strong>分叉连接（Fork）</strong>：\\(A \\gets B \\to C\\)。给定 \\(B\\) 后，\\(A\\) 与 \\(C\\) 条件独立（共同原因被观测）</li>\n<li><strong>对撞连接（Collider / V-structure）</strong>：\\(A \\to B \\gets C\\)。<strong>未</strong>给定 \\(B\\)（及其后代）时，\\(A\\) 与 \\(C\\) 独立；给定 \\(B\\) 后反而变得<strong>不独立</strong>（\"解释消除\"效应）</li>\n</ol>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：对撞结构（V-structure）的行为与前两种恰好相反——观测对撞节点会<strong>打开</strong>原本阻断的路径。这是贝叶斯网络中最反直觉但也最重要的现象，它使得条件独立关系不能简单地通过\"观测越多越独立\"来推断。</div>\n<p>形式化定义：给定变量集 \\(Z\\)，若从 \\(X\\) 到 \\(Y\\) 的所有路径都被 \\(Z\\) d-分离（即每条路径上至少存在一个被阻断的节点），则 \\(X \\perp\\!\\!\\!\\perp Y \\mid Z\\)。</p>\n<h5>核心机制：信念传播算法</h5>\n<p>Pearl 提出的信念传播（Belief Propagation）算法是贝叶斯网络上的高效精确推断方法。对于<strong>树结构</strong>（多叉树/多连通树）的贝叶斯网络，该算法通过两轮消息传递即可计算所有节点的后验概率。</p>\n<p>算法的核心思想是将全局推断分解为局部计算。每个节点维护两个量：</p>\n<ul>\n<li><strong>\\(\\pi\\) 值</strong>（因果支持）：来自父节点方向的先验信息，\\(\\pi(x_i) = P(x_i \\mid \\text{上方证据})\\)</li>\n<li><strong>\\(\\lambda\\) 值</strong>（诊断支持）：来自子节点方向的似然信息，\\(\\lambda(x_i) = P(\\text{下方证据} \\mid x_i)\\)</li>\n</ul>\n<p>节点的后验概率（信念）由两者的乘积归一化得到：</p>\n<p>$$\\text{BEL}(x_i) = P(x_i \\mid \\text{所有证据}) = \\alpha \\cdot \\pi(x_i) \\cdot \\lambda(x_i)$$</p>\n<p>其中 \\(\\alpha\\) 为归一化常数。</p>\n<div class=\"key-point\">💡 <strong>关键直觉</strong>：信念传播的精妙之处在于将贝叶斯定理的\"先验 × 似然 ∝ 后验\"这一全局运算，分解为沿图结构的局部消息传递。每个节点只需与其邻居通信，无需了解整个网络的结构，这使得算法天然适合分布式计算。</div>\n<p>对于一般的 DAG（含环或多连通结构），精确推断是 NP-hard 的。后续发展出多种近似方法：\n- <strong>联合树算法（Junction Tree）</strong>：将一般 DAG 转化为团树后进行精确推断\n- <strong>环路信念传播（Loopy BP）</strong>：在含环图上直接运行信念传播，虽无收敛保证但实践中常有效\n- <strong>变分推断</strong>与<strong>蒙特卡洛采样</strong>：适用于大规模网络的近似推断</p>\n<h5>与传统方法的区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>规则系统（专家系统）</th>\n<th>完整联合分布</th>\n<th>贝叶斯网络 (BN)</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>不确定性处理</td>\n<td>确定性因子（ad hoc）</td>\n<td>精确概率论</td>\n<td>精确概率论</td>\n</tr>\n<tr>\n<td>参数规模</td>\n<td>规则数量</td>\n<td>\\(O(2^n)\\) 指数级</td>\n<td>\\(O(n \\cdot 2^k)\\)，\\(k\\) 为最大父节点数</td>\n</tr>\n<tr>\n<td>推理一致性</td>\n<td>可能不一致</td>\n<td>保证一致</td>\n<td>保证一致</td>\n</tr>\n<tr>\n<td>可解释性</td>\n<td>规则链</td>\n<td>无结构</td>\n<td>DAG 可视化因果关系</td>\n</tr>\n<tr>\n<td>推理效率</td>\n<td>依赖规则匹配</td>\n<td>不可行</td>\n<td>树结构 \\(O(n)\\)，一般 NP-hard</td>\n</tr>\n<tr>\n<td>因果语义</td>\n<td>无</td>\n<td>无</td>\n<td>有向边表达因果方向</td>\n</tr>\n</tbody>\n</table></div>\n<p>与同时期的<strong>马尔可夫随机场（MRF）</strong>相比，贝叶斯网络的独特优势在于：（1）有向边天然表达因果方向，而 MRF 的无向边只表达相关性；（2）参数化更直观——条件概率表（CPT）直接对应专家知识或数据统计；（3）d-分离准则比 MRF 的全局马尔可夫性更精细，能捕获对撞结构带来的条件依赖。</p>",
      "quiz": {
        "q": "在贝叶斯网络的对撞结构 A → C ← B 中，以下哪个说法是正确的？",
        "options": [
          "A 和 B 始终独立，无论是否观测 C",
          "给定 C 后，A 和 B 变为条件独立",
          "未观测 C 时 A 和 B 边际独立，观测 C 后 A 和 B 变为条件相关",
          "A 和 B 始终相关，无论是否观测 C"
        ],
        "answer": 2,
        "explain": "对撞结构（V-structure）的特殊性质：未观测对撞节点 C 时，A 和 B 边际独立；一旦观测 C（或其后代），路径被'打开'，A 和 B 变为条件相关。这与链式和分叉结构的行为恰好相反。"
      }
    },
    {
      "id": "vi",
      "num": 7,
      "name": "VI",
      "fullName": "变分推断 (Variational Inference)",
      "year": "1999",
      "org": "UC Berkeley",
      "parent": "em",
      "paperUrl": "https://www.jmlr.org/papers/volume3/blei03a/blei03a.pdf",
      "projectUrl": "",
      "category": "core",
      "motivation": "将推断问题转化为优化问题",
      "summary": "变分推断通过引入一族可调参数的简单分布来近似复杂的后验分布，将贝叶斯推断中的积分难题转化为优化问题（最大化证据下界 ELBO），使得大规模概率模型的学习和推断成为可能。",
      "keyPoints": [
        "<strong>核心思想</strong>：用参数化的变分分布 \\(q(\\mathbf{z}|\\boldsymbol{\\lambda})\\) 近似难以计算的真实后验 \\(p(\\mathbf{z}|\\mathbf{x})\\)，通过最小化两者的 KL 散度完成推断",
        "<strong>证据下界 (ELBO)</strong>：将对数边际似然分解为 ELBO + KL 散度，最大化 ELBO 等价于最小化 KL 散度",
        "<strong>平均场近似 (Mean-Field Approximation)</strong>：假设变分分布完全因子化，即 \\(q(\\mathbf{z}) = \\prod_i q_i(z_i)\\)，大幅简化优化过程",
        "<strong>坐标上升变分推断 (CAVI)</strong>：交替更新各因子的变分参数，每步有闭式解，保证 ELBO 单调递增",
        "<strong>变分 EM 算法</strong>：将变分推断嵌入 EM 框架，E 步更新变分参数，M 步更新模型参数",
        "<strong>以 LDA 为典型应用</strong>：论文以隐含狄利克雷分配 (LDA) 为载体，系统展示了变分推断在复杂图模型中的完整流程"
      ],
      "detail": "<p><img alt=\"LDA 图模型（板记法）\" src=\"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Latent_Dirichlet_allocation_model.png/500px-Latent_Dirichlet_allocation_model.png\" />\n<em>图：LDA 的概率图模型（板记法）。外层板表示 M 篇文档，内层板表示文档中的 N 个词。α 控制文档-主题分布 θ，β 为主题-词分布矩阵，z 为词的主题分配，w 为观测词。</em></p>\n<pre><code class=\"language-python\"># 变分推断核心算法伪代码（以 LDA 为例）\n# === 变分 EM 算法 ===\ndef variational_EM(corpus, K, V):\n    &quot;&quot;&quot;\n    corpus: 文档集合, K: 主题数, V: 词汇表大小\n    &quot;&quot;&quot;\n    # 初始化模型参数\n    alpha = random_init(K)          # Dirichlet 先验参数\n    beta = random_init(K, V)        # 主题-词分布 (K × V)\n\n    while not converged:\n        # === E-step: 对每篇文档做变分推断 ===\n        for d in corpus:\n            gamma_d = alpha + N_d / K       # 初始化变分 Dirichlet 参数\n            phi_d = np.ones((N_d, K)) / K   # 初始化变分多项式参数\n\n            while not converged_local:\n                for n in range(N_d):        # 对文档中每个词\n                    for i in range(K):      # 对每个主题\n                        # 更新 φ (公式 6)\n                        phi_d[n,i] = beta[i, w_dn] * exp(\n                            digamma(gamma_d[i]) - digamma(sum(gamma_d))\n                        )\n                    phi_d[n] /= sum(phi_d[n])  # 归一化\n\n                # 更新 γ (公式 7)\n                gamma_d = alpha + sum(phi_d, axis=0)\n\n        # === M-step: 更新模型参数 ===\n        for i in range(K):\n            for j in range(V):\n                beta[i,j] = sum_d sum_n phi_d[n,i] * I(w_dn == j)\n            beta[i] /= sum(beta[i])         # 归一化\n\n        # 更新 alpha（牛顿法，见论文附录 A）\n        alpha = newton_update(alpha, {gamma_d})\n\n    return alpha, beta\n</code></pre>\n<h5>动机与背景</h5>\n<p>在贝叶斯概率模型中，核心任务是计算隐变量的后验分布：</p>\n<p>$$p(\\boldsymbol{\\theta}, \\mathbf{z} | \\mathbf{w}, \\boldsymbol{\\alpha}, \\boldsymbol{\\beta}) = \\frac{p(\\boldsymbol{\\theta}, \\mathbf{z}, \\mathbf{w} | \\boldsymbol{\\alpha}, \\boldsymbol{\\beta})}{p(\\mathbf{w} | \\boldsymbol{\\alpha}, \\boldsymbol{\\beta})}$$</p>\n<p>其中分母——<strong>边际似然（evidence）</strong>——需要对所有隐变量求积分/求和：</p>\n<p>$$p(\\mathbf{w} | \\boldsymbol{\\alpha}, \\boldsymbol{\\beta}) = \\int p(\\boldsymbol{\\theta} | \\boldsymbol{\\alpha}) \\left( \\prod_{n=1}^{N} \\sum_{z_n} p(z_n | \\boldsymbol{\\theta}) p(w_n | z_n, \\boldsymbol{\\beta}) \\right) d\\boldsymbol{\\theta}$$</p>\n<p>对于 LDA 等复杂模型，由于 \\(\\boldsymbol{\\theta}\\) 和 \\(\\mathbf{z}\\) 之间的耦合（coupling），这个积分是<strong>难以处理的（intractable）</strong>。传统的精确推断方法（如消息传递）在此类模型上计算复杂度呈指数增长。</p>\n<div class=\"key-point\">💡 <strong>关键直觉</strong>：既然精确计算后验不可行，我们不如找一个\"足够好\"的近似分布来替代它。变分推断正是将这个<strong>推断问题转化为优化问题</strong>。</div>\n<h5>核心机制：ELBO 与 KL 散度</h5>\n<p>变分推断的核心是引入一个参数化的<strong>变分分布</strong> \\(q(\\boldsymbol{\\theta}, \\mathbf{z} | \\boldsymbol{\\gamma}, \\boldsymbol{\\phi})\\) 来近似真实后验。通过 Jensen 不等式，可以将对数边际似然分解为：</p>\n<p>$$\\log p(\\mathbf{w} | \\boldsymbol{\\alpha}, \\boldsymbol{\\beta}) = \\mathcal{L}(\\boldsymbol{\\gamma}, \\boldsymbol{\\phi}; \\boldsymbol{\\alpha}, \\boldsymbol{\\beta}) + D_{\\text{KL}}\\big(q(\\boldsymbol{\\theta}, \\mathbf{z} | \\boldsymbol{\\gamma}, \\boldsymbol{\\phi}) \\| p(\\boldsymbol{\\theta}, \\mathbf{z} | \\mathbf{w}, \\boldsymbol{\\alpha}, \\boldsymbol{\\beta})\\big)$$</p>\n<p>其中 <strong>ELBO（Evidence Lower Bound，证据下界）</strong> 定义为：</p>\n<p>$$\\mathcal{L}(\\boldsymbol{\\gamma}, \\boldsymbol{\\phi}; \\boldsymbol{\\alpha}, \\boldsymbol{\\beta}) = \\mathbb{E}_q[\\log p(\\boldsymbol{\\theta}, \\mathbf{z}, \\mathbf{w} | \\boldsymbol{\\alpha}, \\boldsymbol{\\beta})] - \\mathbb{E}_q[\\log q(\\boldsymbol{\\theta}, \\mathbf{z})]$$</p>\n<p>由于 KL 散度始终非负（\\(D_{\\text{KL}} \\geq 0\\)），ELBO 构成对数边际似然的<strong>下界</strong>。又因为左边 \\(\\log p(\\mathbf{w}|\\boldsymbol{\\alpha},\\boldsymbol{\\beta})\\) 对变分参数是常数，<strong>最大化 ELBO 等价于最小化 KL 散度</strong>，即让 \\(q\\) 尽可能接近真实后验 \\(p\\)。</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：变分推断最小化的是 \\(D_{\\text{KL}}(q \\| p)\\)（前向 KL），而非 \\(D_{\\text{KL}}(p \\| q)\\)（反向 KL）。前向 KL 倾向于让 \\(q\\) 覆盖 \\(p\\) 的所有模式（mode-covering），但在平均场近似下实际表现为 mode-seeking。</div>\n<h5>平均场近似与坐标上升</h5>\n<p>为使优化可行，论文采用<strong>平均场近似（Mean-Field Approximation）</strong>，假设变分分布完全因子化：</p>\n<p>$$q(\\boldsymbol{\\theta}, \\mathbf{z} | \\boldsymbol{\\gamma}, \\boldsymbol{\\phi}) = q(\\boldsymbol{\\theta} | \\boldsymbol{\\gamma}) \\prod_{n=1}^{N} q(z_n | \\boldsymbol{\\phi}_n)$$</p>\n<p>其中：\n- \\(q(\\boldsymbol{\\theta} | \\boldsymbol{\\gamma})\\) 是参数为 \\(\\boldsymbol{\\gamma}\\) 的 Dirichlet 分布\n- \\(q(z_n | \\boldsymbol{\\phi}_n)\\) 是参数为 \\(\\boldsymbol{\\phi}_n\\) 的多项式分布</p>\n<p>这一假设<strong>切断了 θ 和 z 之间的依赖关系</strong>，使得原本耦合的推断问题分解为独立的子问题。</p>\n<p>通过对 ELBO 关于各变分参数求导并令其为零，得到<strong>坐标上升更新公式</strong>：</p>\n<p><strong>φ 的更新（公式 6）</strong>：</p>\n<p>$$\\phi_{ni} \\propto \\beta_{i,w_n} \\exp\\big(\\Psi(\\gamma_i) - \\Psi(\\textstyle\\sum_{j=1}^{k} \\gamma_j)\\big)$$</p>\n<p>其中 \\(\\Psi(\\cdot)\\) 是 digamma 函数（Γ 函数对数导数）。直觉上，词 \\(w_n\\) 被分配到主题 \\(i\\) 的概率取决于两个因素：(1) 该主题生成这个词的概率 \\(\\beta_{i,w_n}\\)；(2) 文档中该主题的预期比例（通过 digamma 函数反映）。</p>\n<p><strong>γ 的更新（公式 7）</strong>：</p>\n<p>$$\\gamma_i = \\alpha_i + \\sum_{n=1}^{N} \\phi_{ni}$$</p>\n<p>直觉上，文档的主题分布参数 = 先验 + 文档中各词对该主题的软分配之和。</p>\n<p>这两个更新公式交替迭代直至收敛，每步都保证 ELBO 单调不减，因此算法一定收敛到局部最优。</p>\n<h5>变分 EM：从推断到学习</h5>\n<p>单篇文档的变分推断只更新变分参数 \\((\\boldsymbol{\\gamma}, \\boldsymbol{\\phi})\\)。要学习整个语料库的模型参数 \\((\\boldsymbol{\\alpha}, \\boldsymbol{\\beta})\\)，论文将变分推断嵌入 <strong>EM 框架</strong>：</p>\n<ol>\n<li><strong>E 步</strong>：对每篇文档 \\(d\\)，固定 \\((\\boldsymbol{\\alpha}, \\boldsymbol{\\beta})\\)，运行变分推断得到最优的 \\((\\boldsymbol{\\gamma}_d^*, \\boldsymbol{\\phi}_d^*)\\)</li>\n<li><strong>M 步</strong>：固定所有文档的变分参数，最大化 ELBO 关于 \\((\\boldsymbol{\\alpha}, \\boldsymbol{\\beta})\\) 的部分</li>\n</ol>\n<p>M 步中 β 的更新为：</p>\n<p>$$\\beta_{ij} \\propto \\sum_{d=1}^{M} \\sum_{n=1}^{N_d} \\phi_{d,n,i} \\cdot \\mathbb{1}(w_{d,n} = j)$$</p>\n<p>α 的更新没有闭式解，需要使用牛顿-拉夫森法（Newton-Raphson），利用 Dirichlet 分布的 Hessian 矩阵特殊结构实现高效计算。</p>\n<h5>与 EM 算法和 MCMC 的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>EM 算法</th>\n<th>变分推断 (VI)</th>\n<th>MCMC</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>后验表示</td>\n<td>点估计</td>\n<td>参数化分布</td>\n<td>样本集合</td>\n</tr>\n<tr>\n<td>适用范围</td>\n<td>共轭/简单模型</td>\n<td>广泛</td>\n<td>理论上任意</td>\n</tr>\n<tr>\n<td>计算效率</td>\n<td>快</td>\n<td>较快</td>\n<td>慢</td>\n</tr>\n<tr>\n<td>精确性</td>\n<td>仅点估计</td>\n<td>近似（有偏）</td>\n<td>渐近精确</td>\n</tr>\n<tr>\n<td>收敛判断</td>\n<td>似然单调</td>\n<td>ELBO 单调</td>\n<td>困难</td>\n</tr>\n<tr>\n<td>可扩展性</td>\n<td>好</td>\n<td>好</td>\n<td>差</td>\n</tr>\n</tbody>\n</table></div>\n<p>变分推断可以看作 EM 的推广：当变分分布退化为点分布时，变分推断退化为 EM 算法。相比 MCMC 方法（如 Gibbs 采样），变分推断牺牲了渐近精确性，但换来了更快的收敛速度和更好的可扩展性，特别适合大规模数据集。</p>\n<div class=\"key-point\">💡 <strong>关键洞察</strong>：变分推断的核心贡献在于提供了一个<strong>通用框架</strong>，将任意概率模型的推断问题统一转化为优化问题。这一思想后来深刻影响了 VAE（变分自编码器）、变分 RNN 等深度生成模型的发展。</div>",
      "quiz": {
        "q": "在变分推断中，最大化 ELBO 等价于什么操作？",
        "options": [
          "最大化模型参数的先验概率",
          "最小化变分分布与真实后验之间的 KL 散度",
          "最大化观测数据的似然函数",
          "最小化训练数据的重构误差"
        ],
        "answer": 1,
        "explain": "由于 log p(w) = ELBO + KL(q||p)，且 log p(w) 对变分参数为常数，因此最大化 ELBO 等价于最小化 KL(q||p)，即让变分分布尽可能接近真实后验。"
      }
    },
    {
      "id": "crf",
      "num": 8,
      "name": "CRF",
      "fullName": "条件随机场 (Conditional Random Field)",
      "year": "2001",
      "org": "CMU",
      "parent": "hmm",
      "paperUrl": "https://repository.upenn.edu/handle/20.500.14332/6188",
      "projectUrl": "",
      "category": "core",
      "motivation": "判别式建模克服标签偏置",
      "summary": "Lafferty 等人提出了条件随机场（CRF），一种基于无向图模型的判别式序列标注框架，通过对整个标签序列进行全局归一化来建模条件概率 $p(\\mathbf{y}|\\mathbf{x})$，从根本上解决了 MEMM 等局部归一化模型的**标签偏置问题（Label Bias Problem）**，并在保持凸优化目标的同时支持任意观测特征依赖，成为序列标注任务的里程碑方法。",
      "keyPoints": [
        "<strong>标签偏置问题的诊断与解决</strong>：MEMM 等有向判别模型在每个状态进行局部归一化，导致低熵状态（出边少的状态）几乎忽略观测信息，CRF 通过全局归一化彻底消除此缺陷",
        "<strong>条件随机场的形式化定义</strong>：给定图 $G=(V,E)$，当 $Y$ 在以 $X$ 为条件时满足关于 $G$ 的马尔可夫性，则 $(X,Y)$ 构成条件随机场",
        "<strong>链式 CRF 的参数化形式</strong>：$p_\\theta(\\mathbf{y}|\\mathbf{x}) \\propto \\exp\\left(\\sum_{e,k} \\lambda_k f_k(e, \\mathbf{y}|<em v_k=\"v,k\">e, \\mathbf{x}) + \\sum</em>)\\right)$，其中 $f_k$ 为边特征，$g_k$ 为顶点特征} \\mu_k g_k(v, \\mathbf{y}|_v, \\mathbf{x",
        "<strong>矩阵形式与高效推断</strong>：定义转移矩阵 $M_i(y',y|\\mathbf{x})$，配分函数 $Z(\\mathbf{x})$ 为矩阵连乘的 (start, stop) 元素，前向-后向算法实现 $O(|\\mathcal{Y}|^2 n)$ 复杂度的精确推断",
        "<strong>凸优化目标与 IIS 参数估计</strong>：对数似然函数关于参数 $\\theta$ 是凸函数，采用改进的迭代缩放算法（Algorithm S / Algorithm T）保证全局收敛",
        "<strong>判别式 vs 生成式的统一视角</strong>：CRF 可包含 HMM 作为特例（定义状态对特征和状态-观测特征），但允许任意观测依赖，无需建模 $p(\\mathbf{x})$"
      ],
      "detail": "<h5>模型框架对比示意</h5>\n<pre><code>HMM (生成式)          MEMM (判别式-局部)       CRF (判别式-全局)\n\n  Y₁ → Y₂ → Y₃        Y₁ → Y₂ → Y₃          Y₁ — Y₂ — Y₃\n  ↓    ↓    ↓          ↑    ↑    ↑            |    |    |\n  X₁   X₂   X₃        X₁   X₂   X₃          X₁   X₂   X₃\n\n 有向图,联合建模       有向图,局部归一化        无向图,全局归一化\n p(x,y)=∏p(yᵢ|yᵢ₋₁)  p(y|x)=∏p(yᵢ|yᵢ₋₁,x)  p(y|x)=exp(Σλf)/Z(x)\n        ·p(xᵢ|yᵢ)    ↑ 标签偏置！             ✓ 无标签偏置\n</code></pre>\n<p><em>图：三种序列模型的图结构对比。HMM 是生成式有向图模型；MEMM 是判别式有向图模型但受标签偏置困扰；CRF 是判别式无向图模型，通过全局归一化避免标签偏置。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># CRF 前向-后向推断 + IIS 参数估计伪代码\ndef crf_train(data, features_f, features_g, max_iter):\n    &quot;&quot;&quot;\n    data: 训练集 {(x⁽ⁱ⁾, y⁽ⁱ⁾)}\n    features_f: 边特征函数列表 fk(e, y|e, x)\n    features_g: 顶点特征函数列表 gk(v, y|v, x)\n    &quot;&quot;&quot;\n    # 1. 初始化参数\n    lambda_k = zeros(len(features_f))  # 边特征权重\n    mu_k = zeros(len(features_g))      # 顶点特征权重\n\n    for iteration in range(max_iter):\n        for x, y in data:\n            n = len(x)\n            # === 构造转移矩阵 ===\n            # Mi(y', y | x) = exp(Σk λk·fk(ei, y'→y, x) + Σk μk·gk(vi, y, x))\n            M = [build_transition_matrix(i, x, lambda_k, mu_k) for i in range(n+2)]\n\n            # === 前向算法 ===\n            # α₀(start) = 1, α₀(others) = 0\n            # αᵢ = αᵢ₋₁ · Mᵢ(x)    (向量-矩阵乘法)\n            alpha = forward(M)\n\n            # === 后向算法 ===\n            # βₙ₊₁(stop) = 1, βₙ₊₁(others) = 0\n            # βᵢᵀ = Mᵢ₊₁(x) · βᵢ₊₁\n            beta = backward(M)\n\n            # === 计算配分函数 ===\n            # Z(x) = (M₁·M₂·...·Mₙ₊₁)[start, stop] = Σy' αₙ₊₁(y')\n            Z_x = compute_partition(alpha)\n\n            # === 计算特征期望 ===\n            # E_model[fk] = Σᵢ Σy',y αᵢ₋₁(y')·Mᵢ(y',y|x)·βᵢ(y) / Z(x)\n            E_model_f = compute_edge_expectations(alpha, beta, M, Z_x)\n            E_model_g = compute_vertex_expectations(alpha, beta, M, Z_x)\n\n        # === IIS 参数更新 ===\n        # δλk = (1/S) · log(E_empirical[fk] / E_model[fk])\n        # 或求解多项式方程 (Algorithm T)\n        lambda_k += delta_lambda\n        mu_k += delta_mu\n\n    return lambda_k, mu_k\n\ndef crf_viterbi_decode(x, lambda_k, mu_k):\n    &quot;&quot;&quot;Viterbi 解码：寻找最优标签序列 y* = argmax_y p(y|x)&quot;&quot;&quot;\n    n = len(x)\n    # δᵢ(y) = max_{y₁...yᵢ₋₁} Σ scores\n    # 与 HMM Viterbi 相同结构，但用 log-linear 分数替代概率\n    for i in range(1, n+1):\n        for y in label_set:\n            delta[i][y] = max_{y'} (delta[i-1][y'] + Λᵢ(y', y | x))\n            psi[i][y] = argmax_{y'} (delta[i-1][y'] + Λᵢ(y', y | x))\n    # 回溯\n    y_star = backtrack(delta, psi)\n    return y_star\n</code></pre>\n<h5>动机与背景：标签偏置问题</h5>\n<p>序列标注是 NLP 中的核心任务，包括词性标注、命名实体识别、信息抽取等。在 CRF 提出之前，主流方法包括生成式的 HMM 和判别式的 MEMM（最大熵马尔可夫模型）。HMM 建模联合概率 $p(\\mathbf{x}, \\mathbf{y})$，受限于观测独立性假设，无法利用丰富的重叠特征；MEMM 虽然是判别式模型，允许任意特征，但存在一个根本性缺陷——<strong>标签偏置问题（Label Bias Problem）</strong>。</p>\n<p>标签偏置的本质在于 MEMM 的<strong>局部归一化</strong>机制。在 MEMM 中，每个状态的转移概率 $p(y_i | y_{i-1}, \\mathbf{x})$ 在该状态的所有出边上归一化为 1。这意味着无论观测 $\\mathbf{x}$ 如何，每个状态都必须将全部概率质量分配给其出边。当某个状态只有少量出边时（低熵状态），该状态几乎无法根据观测来区分不同的后继状态——概率质量被\"强制\"传递，观测信息被忽略。论文用一个区分 \"rib\" 和 \"rob\" 的简单有限状态模型生动地展示了这一问题：即使观测序列明确是 \"r i b\"，由于中间状态只有一条出边，两条路径的概率几乎相等。</p>\n<h5>核心机制：全局归一化的条件随机场</h5>\n<p>CRF 的核心创新在于采用<strong>无向图模型</strong>并进行<strong>全局归一化</strong>。对于链式结构的 CRF，条件概率定义为：</p>\n<p>$$p_\\theta(\\mathbf{y}|\\mathbf{x}) = \\frac{1}{Z(\\mathbf{x})} \\exp\\left(\\sum_{i,k} \\lambda_k f_k(e_i, \\mathbf{y}|_{e_i}, \\mathbf{x}) + \\sum_{i,k} \\mu_k g_k(v_i, \\mathbf{y}|_{v_i}, \\mathbf{x})\\right)$$</p>\n<p>其中 $Z(\\mathbf{x}) = \\sum_{\\mathbf{y}} \\exp(\\cdots)$ 是依赖于整个观测序列的全局配分函数。与 MEMM 的关键区别在于：\n- <strong>MEMM</strong>：$p(\\mathbf{y}|\\mathbf{x}) = \\prod_i p(y_i | y_{i-1}, \\mathbf{x})$，每个因子独立归一化 → 局部归一化\n- <strong>CRF</strong>：$p(\\mathbf{y}|\\mathbf{x}) = \\frac{1}{Z(\\mathbf{x})} \\prod_i \\Psi_i(y_{i-1}, y_i, \\mathbf{x})$，势函数 $\\Psi_i$ 无需归一化，仅在全局除以 $Z(\\mathbf{x})$ → 全局归一化</p>\n<p>全局归一化使得每条转移边可以根据观测自由地\"放大\"或\"衰减\"其分数，不受局部概率守恒的约束。这正是解决标签偏置的关键：低熵状态的转移不再被迫忽略观测，而是可以通过特征权重灵活调整。</p>\n<h5>高效推断：矩阵形式与前向-后向算法</h5>\n<p>论文的一个重要技术贡献是将链式 CRF 的推断统一为矩阵运算。对于观测序列 $\\mathbf{x}$ 的每个位置 $i$，定义 $|\\mathcal{Y}| \\times |\\mathcal{Y}|$ 的转移矩阵：</p>\n<p>$$M_i(y', y | \\mathbf{x}) = \\exp\\left(\\Lambda_i(y', y | \\mathbf{x})\\right)$$</p>\n<p>其中 $\\Lambda_i$ 汇总了位置 $i$ 处所有边特征和顶点特征的加权和。配分函数可以表示为矩阵连乘：</p>\n<p>$$Z_\\theta(\\mathbf{x}) = \\left(M_1(\\mathbf{x}) \\cdot M_2(\\mathbf{x}) \\cdots M_{n+1}(\\mathbf{x})\\right)_{\\text{start, stop}}$$</p>\n<p>前向向量 $\\boldsymbol{\\alpha}_i$ 和后向向量 $\\boldsymbol{\\beta}_i$ 的递推关系为：</p>\n<p>$$\\boldsymbol{\\alpha}_i = \\boldsymbol{\\alpha}_{i-1} \\cdot M_i(\\mathbf{x}), \\quad \\boldsymbol{\\beta}_i^\\top = M_{i+1}(\\mathbf{x}) \\cdot \\boldsymbol{\\beta}_{i+1}$$</p>\n<p>这与 HMM 的前向-后向算法结构完全对应，但关键区别在于：CRF 的转移矩阵 $M_i$ 直接从观测 $\\mathbf{x}$ 和参数 $\\theta$ 计算得到，无需枚举所有可能的观测序列（因为是判别式模型）。推断复杂度为 $O(|\\mathcal{Y}|^2 \\cdot n)$，与 HMM 相同。</p>\n<h5>参数估计：迭代缩放与凸优化</h5>\n<p>CRF 的对数似然目标函数：</p>\n<p>$$\\mathcal{O}(\\theta) = \\sum_{i=1}^{N} \\log p_\\theta(\\mathbf{y}^{(i)} | \\mathbf{x}^{(i)})$$</p>\n<p>是关于参数 $\\theta$ 的<strong>凸函数</strong>（继承自最大熵模型的性质），这保证了任何局部最优都是全局最优。论文提出了两种基于改进迭代缩放（IIS）的算法：</p>\n<ol>\n<li>\n<p><strong>Algorithm S（松弛特征法）</strong>：引入一个\"松弛特征\" $s(\\mathbf{x}, \\mathbf{y}) = S - \\sum_{i,k} f_k - \\sum_{i,k} g_k$，使得总特征计数恒为常数 $S$，从而简化更新公式为 $\\delta\\lambda_k = \\frac{1}{S} \\log \\frac{\\tilde{E}[f_k]}{E_\\theta[f_k]}$。缺点是 $S$ 可能很大（与最长序列成正比），导致收敛缓慢。</p>\n</li>\n<li>\n<p><strong>Algorithm T（分段追踪法）</strong>：按特征总数 $T(\\mathbf{x})$ 分组累积期望，通过求解多项式方程 $\\sum_t a_{k,t} \\beta_k^t = \\tilde{E}[f_k]$ 来获得更新量，收敛速度更快。</p>\n</li>\n</ol>\n<p>两种算法的单次迭代复杂度与 HMM 的 Baum-Welch 算法相当。</p>",
      "quiz": {
        "q": "",
        "options": [],
        "answer": 0,
        "explain": ""
      }
    },
    {
      "id": "vae",
      "num": 9,
      "name": "VAE",
      "fullName": "变分自编码器 (Variational Autoencoder)",
      "year": "2013",
      "org": "Univ. Amsterdam",
      "parent": "vi",
      "paperUrl": "https://arxiv.org/abs/1312.6114",
      "projectUrl": "",
      "category": "core",
      "motivation": "深度学习与变分推断端到端结合",
      "summary": "VAE 提出了一种基于变分推断的自编码器框架，通过**重参数化技巧 (Reparameterization Trick)** 使含连续潜变量的生成模型可以端到端地用随机梯度下降高效训练，解决了传统变分推断在大规模数据和复杂后验分布下不可扩展的问题。",
      "keyPoints": [
        "<strong>变分下界 (ELBO)</strong>：将不可计算的边际似然 \\(\\log p_\\theta(\\mathbf{x})\\) 转化为可优化的证据下界，分解为重构项和 KL 正则项",
        "<strong>重参数化技巧</strong>：将随机采样从计算图中分离，令 \\(\\mathbf{z} = \\boldsymbol{\\mu} + \\boldsymbol{\\sigma} \\odot \\boldsymbol{\\epsilon}\\)（其中 \\(\\boldsymbol{\\epsilon} \\sim \\mathcal{N}(0, I)\\)），使梯度可以通过采样操作反向传播",
        "<strong>编码器-解码器架构</strong>：编码器 \\(q_\\phi(\\mathbf{z}|\\mathbf{x})\\) 近似不可解的真实后验，解码器 \\(p_\\theta(\\mathbf{x}|\\mathbf{z})\\) 从潜变量生成数据",
        "<strong>SGVB 估计器</strong>：提出随机梯度变分贝叶斯 (Stochastic Gradient Variational Bayes) 估计器，支持小批量随机优化",
        "<strong>AEVB 算法</strong>：Auto-Encoding Variational Bayes 算法，将推断网络与生成网络联合训练，实现摊销推断 (Amortized Inference)",
        "<strong>KL 散度解析计算</strong>：当先验和近似后验均为高斯分布时，KL 项可解析计算，仅需对重构项采样估计"
      ],
      "detail": "<h5>核心框架图</h5>\n<p><img alt=\"VAE 概率图模型\" src=\"https://ar5iv.labs.arxiv.org/html/1312.6114v2/assets/x1.png\" /></p>\n<p><em>图：左侧为生成模型的有向图模型 \\(p_\\theta(\\mathbf{z}) p_\\theta(\\mathbf{x}|\\mathbf{z})\\)；右侧虚线表示变分近似后验 \\(q_\\phi(\\mathbf{z}|\\mathbf{x})\\)（即编码器/识别模型），用于近似不可解的真实后验 \\(p_\\theta(\\mathbf{z}|\\mathbf{x})\\)。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># Auto-Encoding Variational Bayes (AEVB) 算法\n# 输入: 数据集 X, 编码器参数 φ, 解码器参数 θ\n\n初始化 θ, φ\nwhile θ, φ 未收敛:\n    X_M ← 从数据集 X 中随机采样小批量（M 个样本）\n    ε ← 从先验 p(ε) = N(0, I) 中采样\n\n    # 编码器前向传播: x → (μ, σ)\n    μ, log_σ² = encoder_φ(x)        # 输出潜变量的均值和对数方差\n\n    # 重参数化技巧: 将随机性转移到 ε\n    z = μ + σ ⊙ ε                    # σ = exp(0.5 * log_σ²)\n\n    # 解码器前向传播: z → x̂\n    x̂ = decoder_θ(z)\n\n    # 计算 ELBO（使用 SGVB 估计器 B）\n    KL = -0.5 * Σ_j (1 + log(σ_j²) - μ_j² - σ_j²)   # 解析 KL 散度\n    recon = E[log p_θ(x|z)]                              # 重构损失（采样估计）\n    L = -KL + recon                                       # ELBO\n\n    # 梯度更新\n    g = ∇_{θ,φ} L                    # 对 ELBO 求梯度\n    θ, φ ← 用 SGD 或 Adam 更新 (θ, φ)\n\nreturn θ, φ\n</code></pre>\n<h5>动机与背景</h5>\n<p>在概率生成模型中，我们假设观测数据 \\(\\mathbf{x}\\) 由某个潜变量 \\(\\mathbf{z}\\) 生成。完整的生成过程为：先从先验 \\(p_\\theta(\\mathbf{z})\\) 中采样潜变量，再通过条件分布 \\(p_\\theta(\\mathbf{x}|\\mathbf{z})\\) 生成观测数据。然而，训练这类模型面临两大核心困难：</p>\n<ol>\n<li><strong>边际似然不可解</strong>：计算 \\(p_\\theta(\\mathbf{x}) = \\int p_\\theta(\\mathbf{z}) p_\\theta(\\mathbf{x}|\\mathbf{z}) d\\mathbf{z}\\) 需要对潜变量空间积分，当 \\(p_\\theta(\\mathbf{x}|\\mathbf{z})\\) 由神经网络参数化时，该积分通常无法解析计算。</li>\n<li><strong>真实后验不可解</strong>：\\(p_\\theta(\\mathbf{z}|\\mathbf{x}) = p_\\theta(\\mathbf{x}|\\mathbf{z})p_\\theta(\\mathbf{z})/p_\\theta(\\mathbf{x})\\) 同样不可解，传统的 EM 算法和均值场变分推断要么需要特定的共轭先验假设，要么无法扩展到大规模数据集。</li>\n</ol>\n<p>传统的变分推断方法（如均值场方法）虽然可以绕过后验不可解的问题，但它们通常需要针对每个数据点单独优化变分参数，计算代价极高，且难以利用 SGD 进行高效优化。</p>\n<h5>核心机制：变分下界 (ELBO)</h5>\n<p>VAE 的核心思想是引入一个<strong>推断模型</strong>（编码器）\\(q_\\phi(\\mathbf{z}|\\mathbf{x})\\) 来近似不可解的真实后验 \\(p_\\theta(\\mathbf{z}|\\mathbf{x})\\)。通过变分推断，可以推导出边际对数似然的下界：</p>\n<p>$$\\log p_\\theta(\\mathbf{x}^{(i)}) \\geq \\mathcal{L}(\\theta, \\phi; \\mathbf{x}^{(i)}) = -D_{KL}(q_\\phi(\\mathbf{z}|\\mathbf{x}^{(i)}) \\| p_\\theta(\\mathbf{z})) + \\mathbb{E}_{q_\\phi(\\mathbf{z}|\\mathbf{x}^{(i)})}[\\log p_\\theta(\\mathbf{x}^{(i)}|\\mathbf{z})]$$</p>\n<p>这个下界（ELBO）由两部分组成：</p>\n<ul>\n<li><strong>KL 散度项</strong> \\(-D_{KL}(q_\\phi(\\mathbf{z}|\\mathbf{x}) \\| p_\\theta(\\mathbf{z}))\\)：作为正则化项，鼓励近似后验 \\(q_\\phi\\) 接近先验 \\(p_\\theta(\\mathbf{z})\\)。当先验和近似后验均为高斯分布时，该项可解析计算。</li>\n<li><strong>重构项</strong> \\(\\mathbb{E}_{q_\\phi}[\\log p_\\theta(\\mathbf{x}|\\mathbf{z})]\\)：期望的对数似然，衡量从潜变量重构原始数据的能力，可理解为负重构误差。</li>\n</ul>\n<div class=\"key-point\">💡 <strong>关键直觉</strong>：ELBO 的优化同时实现了两个目标——让编码器学会提取有意义的潜变量表示（通过重构项），同时保持潜变量空间的结构化（通过 KL 项使其接近先验分布），这正是 VAE 能够生成新样本的关键。</div>\n<h5>核心机制：重参数化技巧</h5>\n<p>直接对 ELBO 中的期望项求梯度面临一个根本问题：\\(\\mathbf{z}\\) 是从 \\(q_\\phi(\\mathbf{z}|\\mathbf{x})\\) 中<strong>随机采样</strong>得到的，采样操作不可微分，梯度无法通过采样节点反向传播到编码器参数 \\(\\phi\\)。</p>\n<p><strong>重参数化技巧</strong>巧妙地解决了这个问题。其核心思想是将随机变量 \\(\\mathbf{z}\\) 表示为一个确定性函数加上外部噪声：</p>\n<p>$$\\mathbf{z} = g_\\phi(\\boldsymbol{\\epsilon}, \\mathbf{x}) = \\boldsymbol{\\mu}_\\phi(\\mathbf{x}) + \\boldsymbol{\\sigma}_\\phi(\\mathbf{x}) \\odot \\boldsymbol{\\epsilon}, \\quad \\boldsymbol{\\epsilon} \\sim \\mathcal{N}(\\mathbf{0}, \\mathbf{I})$$</p>\n<p>其中 \\(\\boldsymbol{\\mu}_\\phi(\\mathbf{x})\\) 和 \\(\\boldsymbol{\\sigma}_\\phi(\\mathbf{x})\\) 是编码器网络的输出，\\(\\odot\\) 表示逐元素乘法。这样，随机性被转移到了与参数无关的辅助变量 \\(\\boldsymbol{\\epsilon}\\) 上，而 \\(\\mathbf{z}\\) 关于 \\(\\phi\\) 的梯度可以正常计算：</p>\n<p>$$\\mathbb{E}_{q_\\phi(\\mathbf{z}|\\mathbf{x})}[f(\\mathbf{z})] = \\mathbb{E}_{p(\\boldsymbol{\\epsilon})}[f(g_\\phi(\\boldsymbol{\\epsilon}, \\mathbf{x}))]$$</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：重参数化技巧要求 \\(q_\\phi(\\mathbf{z}|\\mathbf{x})\\) 的采样过程可以用确定性变换 + 固定噪声源来表示。这对高斯分布自然成立，但不适用于所有分布族（如离散分布需要 Gumbel-Softmax 等替代方案）。</div>\n<h5>训练与推理流程</h5>\n<p><strong>训练阶段</strong>：\n1. 从数据集中采样小批量 \\(\\mathbf{X}^M = \\{\\mathbf{x}^{(i)}\\}_{i=1}^M\\)\n2. 对每个样本，编码器输出 \\(\\boldsymbol{\\mu}^{(i)}, \\log \\boldsymbol{\\sigma}^{2(i)}\\)\n3. 采样 \\(\\boldsymbol{\\epsilon}^{(i)} \\sim \\mathcal{N}(0, I)\\)，通过重参数化得到 \\(\\mathbf{z}^{(i)}\\)\n4. 解码器计算 \\(p_\\theta(\\mathbf{x}^{(i)}|\\mathbf{z}^{(i)})\\)\n5. 计算小批量 ELBO 估计：\\(\\widetilde{\\mathcal{L}}^M = \\frac{N}{M}\\sum_{i=1}^M \\widetilde{\\mathcal{L}}(\\theta,\\phi;\\mathbf{x}^{(i)})\\)\n6. 通过反向传播同时更新 \\(\\theta\\) 和 \\(\\phi\\)</p>\n<p><strong>生成（推理）阶段</strong>：\n1. 从先验 \\(p(\\mathbf{z}) = \\mathcal{N}(0, I)\\) 中采样 \\(\\mathbf{z}\\)\n2. 通过解码器 \\(p_\\theta(\\mathbf{x}|\\mathbf{z})\\) 生成新样本</p>\n<p>论文指出，在实践中 \\(L=1\\)（每个数据点仅采样一个 \\(\\mathbf{z}\\)）在小批量足够大（如 \\(M=100\\)）时就能工作良好。</p>\n<h5>高斯情形的具体形式</h5>\n<p>当选择高斯先验 \\(p_\\theta(\\mathbf{z}) = \\mathcal{N}(0, I)\\) 和高斯近似后验 \\(q_\\phi(\\mathbf{z}|\\mathbf{x}) = \\mathcal{N}(\\boldsymbol{\\mu}, \\text{diag}(\\boldsymbol{\\sigma}^2))\\) 时，KL 散度有解析形式：</p>\n<p>$$D_{KL}(q_\\phi(\\mathbf{z}|\\mathbf{x}) \\| p(\\mathbf{z})) = -\\frac{1}{2}\\sum_{j=1}^{J}(1 + \\log \\sigma_j^2 - \\mu_j^2 - \\sigma_j^2)$$</p>\n<p>其中 \\(J\\) 是潜变量维度。解码器的输出分布可以是：\n- <strong>连续数据</strong>：高斯分布 \\(p_\\theta(\\mathbf{x}|\\mathbf{z}) = \\mathcal{N}(\\mathbf{x}; \\boldsymbol{\\mu}'_\\theta(\\mathbf{z}), \\sigma'^2 I)\\)，重构损失为 MSE\n- <strong>二值数据</strong>：伯努利分布 \\(p_\\theta(\\mathbf{x}|\\mathbf{z}) = \\text{Bernoulli}(\\mathbf{x}; \\mathbf{p}_\\theta(\\mathbf{z}))\\)，重构损失为交叉熵</p>\n<h5>与传统方法的区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>传统变分推断 (Mean-Field VI)</th>\n<th>VAE (AEVB)</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>变分参数</td>\n<td>每个数据点独立优化</td>\n<td>编码器网络摊销推断，参数共享</td>\n</tr>\n<tr>\n<td>优化方式</td>\n<td>坐标上升，需解析更新公式</td>\n<td>SGD + 反向传播，端到端训练</td>\n</tr>\n<tr>\n<td>可扩展性</td>\n<td>难以处理大规模数据</td>\n<td>支持小批量训练，线性扩展</td>\n</tr>\n<tr>\n<td>模型灵活性</td>\n<td>受限于共轭先验</td>\n<td>解码器可以是任意神经网络</td>\n</tr>\n<tr>\n<td>推断速度</td>\n<td>测试时需迭代优化</td>\n<td>编码器单次前向传播即可</td>\n</tr>\n</tbody>\n</table></div>\n<p>与同期的 Wake-Sleep 算法相比，VAE 优化的是同一个目标函数（ELBO）的梯度，而 Wake-Sleep 的 wake 阶段和 sleep 阶段优化不同的目标，可能导致不一致。</p>\n<div class=\"key-point\">💡 <strong>核心创新总结</strong>：VAE 的根本贡献在于将<strong>变分推断</strong>与<strong>深度学习</strong>通过重参数化技巧无缝连接，开创了\"用神经网络做推断\"的范式，为后续的条件 VAE、β-VAE、VQ-VAE 等大量工作奠定了基础。</div>",
      "quiz": {
        "q": "VAE 中重参数化技巧的核心作用是什么？",
        "options": [
          "降低模型参数量，加速训练",
          "将采样操作的随机性转移到与参数无关的噪声变量上，使梯度可以反向传播",
          "使先验分布更接近真实数据分布",
          "替代 KL 散度的解析计算，用蒙特卡洛估计代替"
        ],
        "answer": 1,
        "explain": "重参数化技巧将 z = μ + σ⊙ε 中的随机性转移到 ε ~ N(0,I)，使 z 关于编码器参数 φ 的梯度可以正常计算，从而实现端到端的反向传播训练。"
      }
    },
    {
      "id": "score_matching",
      "num": 10,
      "name": "Score Matching",
      "fullName": "分数匹配 (Score Matching)",
      "year": "2019",
      "org": "Stanford",
      "parent": "vi",
      "paperUrl": "https://neurips.cc/virtual/2019/poster/6392",
      "projectUrl": "",
      "category": "specialized",
      "motivation": "估计数据分布的梯度场",
      "summary": "NCSN 提出用**得分匹配（Score Matching）**训练神经网络估计数据分布的梯度场 \\(\\nabla_{\\mathbf{x}}\\log p(\\mathbf{x})\\)，并引入**多尺度高斯噪声扰动**与**退火 Langevin 动力学**解决低维流形、低密度区域和多模态混合三大难题，开创了基于得分的生成模型范式。",
      "keyPoints": [
        "<strong>Score 函数</strong>：定义 \\(\\nabla_{\\mathbf{x}}\\log p(\\mathbf{x})\\) 为数据分布的得分，不依赖归一化常数，可直接用于 Langevin 采样",
        "<strong>Score Matching 目标</strong>：通过 Fisher 散度 \\(\\frac{1}{2}\\mathbb{E}_{p_{\\text{data}}}\\left[\\|\\mathbf{s}_\\theta(\\mathbf{x}) - \\nabla_{\\mathbf{x}}\\log p_{\\text{data}}(\\mathbf{x})\\|^2\\right]\\) 训练得分网络，等价形式避免对真实得分的依赖",
        "<strong>Denoising Score Matching</strong>：用加噪数据的条件得分 \\(\\nabla_{\\tilde{\\mathbf{x}}}\\log q_\\sigma(\\tilde{\\mathbf{x}}|\\mathbf{x})\\) 替代真实得分，避免计算 Jacobian 迹",
        "<strong>Sliced Score Matching</strong>：通过随机向量投影将 Jacobian 迹降为方向导数，计算复杂度从 \\(O(D)\\) 降到 \\(O(1)\\) 次前向传播",
        "<strong>三大挑战</strong>：流形假说导致得分未定义、低密度区域得分估计不准、多模态分布 Langevin 采样混合困难",
        "<strong>多尺度噪声扰动</strong>：使用 \\(L\\) 个几何递减的噪声级别 \\(\\{\\sigma_i\\}_{i=1}^L\\)，大噪声填充低密度区域，小噪声保留数据细节",
        "<strong>NCSN 架构</strong>：条件得分网络 \\(\\mathbf{s}_\\theta(\\mathbf{x}, \\sigma)\\)，基于 U-Net + 空洞卷积 + 条件实例归一化",
        "<strong>退火 Langevin 动力学（Algorithm 1）</strong>：从大噪声到小噪声逐级采样，步长 \\(\\alpha_i = \\epsilon \\cdot \\sigma_i^2 / \\sigma_L^2\\) 自适应缩放",
        "<strong>加权训练目标</strong>：\\(\\lambda(\\sigma) = \\sigma^2\\) 使不同噪声级别的损失量级一致"
      ],
      "detail": "<p><img alt=\"得分场估计示意（Figure 2）\" src=\"https://ar5iv.labs.arxiv.org/html/1907.05600v4/assets/figures/score_estimation.png\" />\n<em>图（论文 Figure 2）：左为真实得分场 ∇log p(x)，右为得分网络估计值 s_θ(x)。低密度区域（两个高斯模态之间）的得分估计不准确，这是朴素方法的核心缺陷。</em></p>\n<pre><code class=\"language-python\"># Algorithm 1: Annealed Langevin Dynamics (退火 Langevin 动力学)\n# 输入: 训练好的 NCSN s_θ(x, σ), 噪声序列 {σ_i}, 步长 ε, 每级步数 T\nimport torch\n\ndef annealed_langevin_dynamics(score_net, sigmas, epsilon, T, x_shape):\n    &quot;&quot;&quot;\n    sigmas: [σ_1, σ_2, ..., σ_L], 从大到小的几何序列\n    epsilon: 基础步长\n    T: 每个噪声级别的 Langevin 步数\n    &quot;&quot;&quot;\n    # 从均匀噪声初始化\n    x = torch.rand(x_shape)\n\n    for i, sigma_i in enumerate(sigmas):\n        # 自适应步长: α_i = ε * σ_i² / σ_L²\n        alpha_i = epsilon * (sigma_i ** 2) / (sigmas[-1] ** 2)\n\n        for t in range(T):\n            z = torch.randn_like(x)  # z_t ~ N(0, I)\n            # Langevin 更新: x ← x + (α/2) * s_θ(x, σ_i) + √α * z\n            score = score_net(x, sigma_i)\n            x = x + (alpha_i / 2) * score + torch.sqrt(alpha_i) * z\n\n    return x\n</code></pre>\n<p><strong>动机与背景：为什么需要得分函数？</strong></p>\n<p>传统生成模型（如 VAE、GAN、Flow）要么需要对数据分布做参数化假设并计算归一化常数，要么需要对抗训练。本文提出了一条全新路径：不直接建模概率密度 \\(p(\\mathbf{x})\\)，而是建模其<strong>梯度场</strong>（得分函数）\\(\\nabla_{\\mathbf{x}}\\log p(\\mathbf{x})\\)。得分函数的核心优势在于它<strong>不依赖归一化常数</strong>——对于 \\(p(\\mathbf{x}) = \\frac{e^{-f(\\mathbf{x})}}{Z}\\)，其得分 \\(\\nabla_{\\mathbf{x}}\\log p(\\mathbf{x}) = -\\nabla_{\\mathbf{x}} f(\\mathbf{x})\\) 与 \\(Z\\) 无关。这使得得分网络 \\(\\mathbf{s}_\\theta(\\mathbf{x})\\) 可以是任意神经网络，无需满足归一化约束。</p>\n<div class=\"key-point\">💡 <strong>关键直觉</strong>：得分函数描述的是\"数据密度增长最快的方向\"。在数据点附近，得分指向数据密集区域；远离数据时，得分指向最近的数据簇。</div>\n<p><strong>得分匹配的三种形式</strong></p>\n<p>原始的<strong>显式得分匹配</strong>（Eq. 1）目标为：</p>\n<p>$$J(\\theta) = \\frac{1}{2}\\mathbb{E}_{p_{\\text{data}}}\\left[\\|\\mathbf{s}_\\theta(\\mathbf{x}) - \\nabla_{\\mathbf{x}}\\log p_{\\text{data}}(\\mathbf{x})\\|_2^2\\right]$$</p>\n<p>由于真实得分 \\(\\nabla_{\\mathbf{x}}\\log p_{\\text{data}}\\) 未知，Hyvärinen (2005) 证明上式等价于（省略常数项）：</p>\n<p>$$J(\\theta) = \\mathbb{E}_{p_{\\text{data}}}\\left[\\text{tr}(\\nabla_{\\mathbf{x}}\\mathbf{s}_\\theta(\\mathbf{x})) + \\frac{1}{2}\\|\\mathbf{s}_\\theta(\\mathbf{x})\\|_2^2\\right]$$</p>\n<p>其中 \\(\\text{tr}(\\nabla_{\\mathbf{x}}\\mathbf{s}_\\theta)\\) 是 Jacobian 矩阵的迹，计算代价为 \\(O(D)\\) 次反向传播，对高维数据不可行。</p>\n<p><strong>Denoising Score Matching</strong>（Vincent, 2011）巧妙地绕过了 Jacobian 计算：给数据加噪 \\(\\tilde{\\mathbf{x}} = \\mathbf{x} + \\sigma\\boldsymbol{\\epsilon}\\)，则条件得分有解析形式 \\(\\nabla_{\\tilde{\\mathbf{x}}}\\log q_\\sigma(\\tilde{\\mathbf{x}}|\\mathbf{x}) = -(\\tilde{\\mathbf{x}} - \\mathbf{x})/\\sigma^2\\)，训练目标变为：</p>\n<p>$$\\ell(\\theta; \\sigma) = \\frac{1}{2}\\mathbb{E}_{p_{\\text{data}}(\\mathbf{x})}\\mathbb{E}_{\\tilde{\\mathbf{x}}\\sim\\mathcal{N}(\\mathbf{x}, \\sigma^2 I)}\\left[\\left\\|\\mathbf{s}_\\theta(\\tilde{\\mathbf{x}}, \\sigma) + \\frac{\\tilde{\\mathbf{x}} - \\mathbf{x}}{\\sigma^2}\\right\\|_2^2\\right]$$</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：Denoising score matching 实质上是让网络学习\"去噪方向\"——预测从加噪样本指向原始样本的归一化向量。这与后来的 DDPM 中预测噪声 \\(\\boldsymbol{\\epsilon}\\) 本质等价：\\(\\mathbf{s}_\\theta \\approx -\\boldsymbol{\\epsilon}/\\sigma\\)。</div>\n<p><strong>Sliced Score Matching</strong>（本文另一贡献）用随机投影近似 Jacobian 迹：</p>\n<p>$$J_{\\text{sliced}}(\\theta) = \\mathbb{E}_{p_\\mathbf{v}}\\mathbb{E}_{p_{\\text{data}}}\\left[\\mathbf{v}^\\top\\nabla_{\\mathbf{x}}\\mathbf{s}_\\theta(\\mathbf{x})\\mathbf{v} + \\frac{1}{2}(\\mathbf{v}^\\top\\mathbf{s}_\\theta(\\mathbf{x}))^2\\right]$$</p>\n<p>其中 \\(\\mathbf{v}\\) 为随机投影向量（如 Rademacher 分布），只需 \\(O(1)\\) 次反向传播。</p>\n<p><strong>三大挑战与多尺度噪声解决方案</strong></p>\n<p>作者深入分析了朴素得分匹配 + Langevin 采样面临的三个根本困难：</p>\n<ol>\n<li>\n<p><strong>流形假说</strong>：真实数据（如图像）集中在高维空间的低维流形上，流形外的得分未定义。加入高斯噪声后，扰动分布 \\(q_\\sigma(\\mathbf{x})\\) 的支撑集覆盖全空间，得分处处有定义。</p>\n</li>\n<li>\n<p><strong>低密度区域</strong>：数据稀疏区域缺乏训练样本，得分估计不准确。大噪声 \\(\\sigma_1\\) 将数据\"扩散\"到更广区域，为低密度区域提供训练信号。</p>\n</li>\n<li>\n<p><strong>多模态混合</strong>：Langevin 动力学在模态间的低密度\"山谷\"中移动极慢。类比模拟退火，先在高温（大噪声）下自由移动以跨越模态，再逐步降温（小噪声）精细化。</p>\n</li>\n</ol>\n<p>统一训练目标将所有噪声级别的损失加权求和：</p>\n<p>$$\\mathcal{L}(\\theta; \\{\\sigma_i\\}_{i=1}^L) = \\frac{1}{L}\\sum_{i=1}^{L}\\lambda(\\sigma_i)\\ell(\\theta; \\sigma_i)$$</p>\n<p>其中 \\(\\lambda(\\sigma_i) = \\sigma_i^2\\) 确保各级损失量级一致（因为 \\(\\|\\nabla_{\\mathbf{x}}\\log q_\\sigma\\| \\propto 1/\\sigma\\)，乘以 \\(\\sigma^2\\) 后损失量级与 \\(\\sigma\\) 无关）。</p>\n<p><strong>NCSN 网络架构</strong></p>\n<p>条件得分网络 \\(\\mathbf{s}_\\theta(\\mathbf{x}, \\sigma)\\) 的输出与输入图像同尺寸（逐像素得分向量），因此借鉴了语义分割的成功架构：<strong>U-Net</strong> 提供多尺度特征融合，<strong>空洞卷积（dilated convolution）</strong>扩大感受野而不损失分辨率，<strong>条件实例归一化（conditional instance normalization）</strong>将噪声级别 \\(\\sigma_i\\) 作为条件信息注入网络各层。</p>\n<p><strong>与后续工作的联系</strong></p>\n<p>本文是 Score-based Generative Models 的奠基之作。后续的 DDPM（Ho et al., 2020）从离散扩散过程角度推导出几乎相同的训练目标；Song et al. (2021) 的 Score SDE 将离散噪声级别推广为连续随机微分方程，统一了 SMLD 和 DDPM 两条技术路线。</p>",
      "quiz": {
        "q": "在 NCSN 的训练目标中，权重系数 λ(σ) = σ² 的设计目的是什么？",
        "options": [
          "使大噪声级别获得更大的梯度，加速收敛",
          "使不同噪声级别的加权损失 λ(σ)ℓ(θ;σ) 量级一致",
          "补偿小噪声级别样本数量不足的问题",
          "确保得分网络输出的范数与噪声级别成正比"
        ],
        "answer": 1,
        "explain": "由于 ∇log q_σ 的量级约为 O(1/σ)，ℓ(θ;σ) ∝ 1/σ²，乘以 λ(σ)=σ² 后各级损失量级一致，避免某些噪声级别主导训练。"
      }
    },
    {
      "id": "ddpm",
      "num": 11,
      "name": "DDPM",
      "fullName": "去噪扩散概率模型 (Denoising Diffusion)",
      "year": "2020",
      "org": "UC Berkeley",
      "parent": "score_matching",
      "paperUrl": "https://proceedings.neurips.cc/paper/2020/hash/4c5bcfec8584af0d967f1ab10179ca4b-Abstract.html",
      "projectUrl": "",
      "category": "specialized",
      "motivation": "迭代去噪生成高质量样本",
      "summary": "DDPM 提出了一种基于马尔可夫链的去噪扩散概率模型，通过将神经网络参数化为噪声预测器（\\(\\boldsymbol{\\epsilon}\\)-prediction）并使用简化训练目标，在无条件图像生成任务上取得了当时最优的 FID 分数，奠定了现代扩散模型的基础框架。",
      "keyPoints": [
        "<strong>前向扩散过程</strong>：通过 \\(T=1000\\) 步的高斯噪声逐步破坏数据，噪声调度 \\(\\beta_t\\) 从 \\(10^{-4}\\) 线性增长到 \\(0.02\\)",
        "<strong>反向去噪过程</strong>：学习一个参数化的高斯转移核 \\(p_\\theta(\\mathbf{x}_{t-1}|\\mathbf{x}_t)\\)，从纯噪声逐步恢复数据",
        "<strong>\\(\\boldsymbol{\\epsilon}\\)-prediction 参数化</strong>：将均值预测重新参数化为噪声预测 \\(\\boldsymbol{\\epsilon}_\\theta(\\mathbf{x}_t, t)\\)，等价于去噪得分匹配（Denoising Score Matching）",
        "<strong>简化训练目标 \\(L_{\\text{simple}}\\)</strong>：去除变分下界中的加权系数，直接最小化 \\(\\|\\boldsymbol{\\epsilon} - \\boldsymbol{\\epsilon}_\\theta(\\mathbf{x}_t, t)\\|^2\\)，显著提升样本质量",
        "<strong>网络架构</strong>：基于 U-Net 的骨干网络，使用 Group Normalization、Transformer 正弦位置编码和 \\(16 \\times 16\\) 分辨率的自注意力",
        "<strong>无条件 CIFAR10 上 FID=3.17</strong>，超越当时所有 GAN 以外的生成模型；LSUN 256×256 上也展示了高质量样本",
        "<strong>与得分匹配/朗之万动力学的等价性</strong>：DDPM 的采样过程等价于带噪声的朗之万动力学，训练目标等价于多尺度去噪得分匹配"
      ],
      "detail": "<p><img alt=\"DDPM 前向与反向过程示意图\" src=\"https://ar5iv.labs.arxiv.org/html/2006.11239v4/assets/x1.png\" />\n<em>图：DDPM 的有向图模型。前向过程 \\(q\\) 逐步向数据添加高斯噪声，反向过程 \\(p_\\theta\\) 学习逐步去噪恢复数据。</em></p>\n<h5>算法伪代码</h5>\n<p><strong>Algorithm 1: Training（训练）</strong></p>\n<pre><code class=\"language-python\"># DDPM 训练过程\nrepeat:\n    x_0 ~ q(x_0)                          # 从数据分布采样\n    t ~ Uniform({1, ..., T})               # 随机采样时间步\n    ε ~ N(0, I)                            # 采样标准高斯噪声\n    # 对以下目标做梯度下降:\n    loss = ||ε - ε_θ(√ᾱ_t · x_0 + √(1-ᾱ_t) · ε, t)||²\nuntil converged\n</code></pre>\n<p><strong>Algorithm 2: Sampling（采样）</strong></p>\n<pre><code class=\"language-python\"># DDPM 采样过程\nx_T ~ N(0, I)                             # 从标准高斯采样\nfor t = T, ..., 1:\n    z ~ N(0, I) if t &gt; 1, else z = 0\n    x_{t-1} = (1/√α_t) * (x_t - (1-α_t)/√(1-ᾱ_t) · ε_θ(x_t, t)) + σ_t · z\nreturn x_0\n</code></pre>\n<h5>动机与背景</h5>\n<p>生成模型的核心目标是学习数据分布 \\(p(\\mathbf{x})\\) 并从中采样。在 DDPM 之前，GAN 在图像生成质量上占据主导地位，但存在模式崩塌和训练不稳定等问题。变分自编码器（VAE）虽然训练稳定，但生成质量受限于后验近似的精度。基于能量的模型和自回归模型也各有局限。</p>\n<p>扩散概率模型（Diffusion Probabilistic Models）最早由 Sohl-Dickstein 等人在 2015 年提出，其核心思想是：<strong>定义一个逐步向数据添加噪声的前向过程，然后学习其反向过程来生成数据</strong>。然而，原始工作的生成质量远不及 GAN。DDPM 的关键贡献在于：通过精心设计的参数化方式和简化的训练目标，首次证明扩散模型能够生成与 GAN 媲美甚至超越的高质量样本。</p>\n<h5>核心机制详解</h5>\n<p><strong>1. 前向扩散过程（Forward Process）</strong></p>\n<p>前向过程定义为一个固定的马尔可夫链，逐步向数据 \\(\\mathbf{x}_0\\) 添加高斯噪声：</p>\n<p>$$q(\\mathbf{x}_t | \\mathbf{x}_{t-1}) = \\mathcal{N}(\\mathbf{x}_t; \\sqrt{1-\\beta_t}\\,\\mathbf{x}_{t-1},\\; \\beta_t \\mathbf{I})$$</p>\n<p>其中 \\(\\beta_1, \\beta_2, \\ldots, \\beta_T\\) 是预定义的噪声调度（variance schedule）。DDPM 使用从 \\(\\beta_1 = 10^{-4}\\) 到 \\(\\beta_T = 0.02\\) 的线性调度，\\(T = 1000\\)。</p>\n<div class=\"key-point\">💡 <strong>关键性质</strong>：利用 \\(\\alpha_t = 1 - \\beta_t\\) 和 \\(\\bar{\\alpha}_t = \\prod_{s=1}^{t} \\alpha_s\\)，可以直接从 \\(\\mathbf{x}_0\\) 一步采样任意时间步 \\(t\\) 的噪声样本，无需逐步执行：</div>\n<p>$$q(\\mathbf{x}_t | \\mathbf{x}_0) = \\mathcal{N}(\\mathbf{x}_t; \\sqrt{\\bar{\\alpha}_t}\\,\\mathbf{x}_0,\\; (1-\\bar{\\alpha}_t)\\mathbf{I})$$</p>\n<p>等价地：\\(\\mathbf{x}_t = \\sqrt{\\bar{\\alpha}_t}\\,\\mathbf{x}_0 + \\sqrt{1-\\bar{\\alpha}_t}\\,\\boldsymbol{\\epsilon}\\)，其中 \\(\\boldsymbol{\\epsilon} \\sim \\mathcal{N}(\\mathbf{0}, \\mathbf{I})\\)。这使得训练时可以高效地随机采样时间步。</p>\n<p><strong>2. 反向去噪过程（Reverse Process）</strong></p>\n<p>反向过程同样定义为马尔可夫链，从高斯噪声 \\(\\mathbf{x}_T \\sim \\mathcal{N}(\\mathbf{0}, \\mathbf{I})\\) 出发，逐步去噪：</p>\n<p>$$p_\\theta(\\mathbf{x}_{t-1} | \\mathbf{x}_t) = \\mathcal{N}(\\mathbf{x}_{t-1};\\; \\boldsymbol{\\mu}_\\theta(\\mathbf{x}_t, t),\\; \\sigma_t^2 \\mathbf{I})$$</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：DDPM 将方差 \\(\\sigma_t^2\\) 固定为 \\(\\beta_t\\) 或 \\(\\tilde{\\beta}_t = \\frac{1-\\bar{\\alpha}_{t-1}}{1-\\bar{\\alpha}_t}\\beta_t\\)（两者实验效果相近），仅学习均值 \\(\\boldsymbol{\\mu}_\\theta\\)。</div>\n<p><strong>3. \\(\\boldsymbol{\\epsilon}\\)-prediction 参数化（核心创新）</strong></p>\n<p>传统做法是直接预测后验均值 \\(\\tilde{\\boldsymbol{\\mu}}_t\\)。DDPM 的关键洞察是：将均值参数化为噪声预测。</p>\n<p>前向过程的后验均值为：</p>\n<p>$$\\tilde{\\boldsymbol{\\mu}}_t(\\mathbf{x}_t, \\mathbf{x}_0) = \\frac{\\sqrt{\\bar{\\alpha}_{t-1}}\\,\\beta_t}{1-\\bar{\\alpha}_t}\\mathbf{x}_0 + \\frac{\\sqrt{\\alpha_t}(1-\\bar{\\alpha}_{t-1})}{1-\\bar{\\alpha}_t}\\mathbf{x}_t$$</p>\n<p>将 \\(\\mathbf{x}_0 = \\frac{1}{\\sqrt{\\bar{\\alpha}_t}}(\\mathbf{x}_t - \\sqrt{1-\\bar{\\alpha}_t}\\,\\boldsymbol{\\epsilon})\\) 代入，得到：</p>\n<p>$$\\boldsymbol{\\mu}_\\theta(\\mathbf{x}_t, t) = \\frac{1}{\\sqrt{\\alpha_t}}\\left(\\mathbf{x}_t - \\frac{1-\\alpha_t}{\\sqrt{1-\\bar{\\alpha}_t}}\\,\\boldsymbol{\\epsilon}_\\theta(\\mathbf{x}_t, t)\\right)$$</p>\n<div class=\"key-point\">💡 <strong>直觉</strong>：网络不再直接预测去噪后的均值，而是预测\"当前样本中混入了多少噪声\"。这等价于学习数据分布在不同噪声尺度下的得分函数（score function）\\(\\nabla_{\\mathbf{x}} \\log q(\\mathbf{x}_t)\\)。</div>\n<p><strong>4. 简化训练目标 \\(L_{\\text{simple}}\\)</strong></p>\n<p>标准变分下界（VLB）可以分解为：</p>\n<p>$$L = \\underbrace{D_{\\text{KL}}(q(\\mathbf{x}_T|\\mathbf{x}_0) \\| p(\\mathbf{x}_T))}_{L_T} + \\sum_{t=2}^{T} \\underbrace{D_{\\text{KL}}(q(\\mathbf{x}_{t-1}|\\mathbf{x}_t, \\mathbf{x}_0) \\| p_\\theta(\\mathbf{x}_{t-1}|\\mathbf{x}_t))}_{L_{t-1}} - \\underbrace{\\log p_\\theta(\\mathbf{x}_0|\\mathbf{x}_1)}_{L_0}$$</p>\n<p>其中 \\(L_T\\) 为常数（前向过程固定），\\(L_{t-1}\\) 是两个高斯分布的 KL 散度，可以解析计算。使用 \\(\\boldsymbol{\\epsilon}\\)-prediction 参数化后，\\(L_{t-1}\\) 正比于：</p>\n<p>$$L_{t-1} \\propto \\frac{1}{2\\sigma_t^2} \\cdot \\frac{(1-\\alpha_t)^2}{(1-\\bar{\\alpha}_t)\\alpha_t} \\left\\|\\boldsymbol{\\epsilon} - \\boldsymbol{\\epsilon}_\\theta(\\mathbf{x}_t, t)\\right\\|^2$$</p>\n<p>DDPM 发现，<strong>去除前面的加权系数</strong>，使用简化目标效果更好：</p>\n<p>$$L_{\\text{simple}} = \\mathbb{E}_{t, \\mathbf{x}_0, \\boldsymbol{\\epsilon}}\\left[\\left\\|\\boldsymbol{\\epsilon} - \\boldsymbol{\\epsilon}_\\theta\\!\\left(\\sqrt{\\bar{\\alpha}_t}\\,\\mathbf{x}_0 + \\sqrt{1-\\bar{\\alpha}_t}\\,\\boldsymbol{\\epsilon},\\; t\\right)\\right\\|^2\\right]$$</p>\n<div class=\"key-point\">💡 <strong>为什么简化目标更好？</strong> 加权 VLB 中，小 \\(t\\)（低噪声）的权重很大，大 \\(t\\)（高噪声）的权重很小。去除权重后，大 \\(t\\) 时间步获得更多训练信号，这相当于在高噪声区域进行更多的\"粗粒度\"去噪训练，有助于生成全局结构更合理的样本。虽然 \\(L_{\\text{simple}}\\) 不再是严格的变分下界，但它显著提升了样本质量（FID 从 13.51 降至 3.17）。</div>\n<p><strong>5. 与去噪得分匹配和朗之万动力学的联系</strong></p>\n<p>DDPM 的训练目标 \\(L_{\\text{simple}}\\) 等价于多尺度去噪得分匹配（Denoising Score Matching）。具体而言：</p>\n<p>$$\\boldsymbol{\\epsilon}_\\theta(\\mathbf{x}_t, t) \\approx -\\sqrt{1-\\bar{\\alpha}_t}\\,\\nabla_{\\mathbf{x}_t} \\log q(\\mathbf{x}_t)$$</p>\n<p>即噪声预测网络学习的是（缩放后的）数据在噪声扰动下的得分函数。DDPM 的采样过程则类似于带退火的朗之万动力学（Annealed Langevin Dynamics），这与 Song &amp; Ermon (2019) 的 NCSN 方法形成了理论统一。</p>\n<p><strong>6. 网络架构</strong></p>\n<p>DDPM 使用基于 PixelCNN++ 的 U-Net 架构：\n- <strong>骨干</strong>：类似 PixelCNN++ 的 U-Net，带跳跃连接\n- <strong>归一化</strong>：全局使用 Group Normalization\n- <strong>时间步编码</strong>：采用 Transformer 的正弦位置编码，通过 MLP 投影后加入各残差块\n- <strong>自注意力</strong>：在 \\(16 \\times 16\\) 特征图分辨率处使用自注意力层\n- <strong>参数共享</strong>：所有时间步共享同一套网络参数，时间步信息通过条件输入提供</p>\n<h5>与传统方法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>GAN</th>\n<th>VAE</th>\n<th>DDPM</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>训练稳定性</td>\n<td>差（模式崩塌）</td>\n<td>好</td>\n<td>好</td>\n</tr>\n<tr>\n<td>样本质量</td>\n<td>高</td>\n<td>中等</td>\n<td>高（FID=3.17）</td>\n</tr>\n<tr>\n<td>似然估计</td>\n<td>无</td>\n<td>有（ELBO）</td>\n<td>有（≤3.75 bpd）</td>\n</tr>\n<tr>\n<td>采样速度</td>\n<td>快（单次前向）</td>\n<td>快（单次前向）</td>\n<td>慢（T=1000 步）</td>\n</tr>\n<tr>\n<td>模式覆盖</td>\n<td>差</td>\n<td>好</td>\n<td>好</td>\n</tr>\n</tbody>\n</table></div>\n<p>DDPM 首次证明扩散模型在样本质量上可以与 GAN 竞争，同时保持训练稳定性和良好的模式覆盖。其主要代价是采样速度慢（需要 1000 步迭代去噪），这催生了后续 DDIM、DPM-Solver 等加速采样方法。</p>",
      "quiz": {
        "q": "DDPM 中简化训练目标 L_simple 相比标准变分下界 L 的关键区别是什么？",
        "options": [
          "L_simple 使用了 L2 损失而非 KL 散度",
          "L_simple 去除了不同时间步 t 的加权系数，对所有时间步均匀加权",
          "L_simple 预测原始图像 x_0 而非噪声 ε",
          "L_simple 增加了对抗损失项以提升样本质量"
        ],
        "answer": 1,
        "explain": "L_simple 的核心改动是去除了 VLB 中各时间步的加权系数（该系数使小 t 权重大、大 t 权重小），改为对所有时间步均匀加权，从而让模型在高噪声时间步获得更多训练信号，显著提升了样本质量。"
      }
    },
    {
      "id": "flow_matching",
      "num": 12,
      "name": "Flow Matching",
      "fullName": "流匹配 (Flow Matching)",
      "year": "2024",
      "org": "Meta AI",
      "parent": "ddpm",
      "paperUrl": "https://arxiv.org/abs/2210.02747",
      "projectUrl": "",
      "category": "specialized",
      "motivation": "直线轨迹大幅提升采样效率",
      "summary": "Flow Matching 提出了一种无需模拟ODE的连续归一化流（CNF）训练框架，通过条件概率路径构造将不可计算的边际向量场回归问题转化为可计算的条件向量场回归，并引入最优传输（OT）条件路径实现更直的采样轨迹和更高效的生成。",
      "keyPoints": [
        "<strong>无模拟训练框架</strong>：Flow Matching 目标函数直接回归向量场，无需像传统 CNF 训练那样通过 ODE 求解器前向/反向传播，训练效率大幅提升",
        "<strong>条件流匹配（CFM）</strong>：通过条件概率路径 \\(p_t(x|x_1)\\) 和条件向量场 \\(u_t(x|x_1)\\) 构造边际量，证明 CFM 与 FM 梯度等价（Theorem 2），使目标函数可计算",
        "<strong>高斯条件概率路径</strong>：统一框架覆盖扩散模型（VE/VP SDE）和最优传输路径，条件向量场有闭式解（Theorem 3）",
        "<strong>最优传输（OT）路径</strong>：\\(\\mu_t(x) = tx_1, \\sigma_t(x) = 1-(1-\\sigma_{\\min})t\\)，产生直线轨迹和恒定速度的流，采样 NFE 降低约 40%",
        "<strong>统一视角</strong>：揭示扩散模型本质上是 Flow Matching 的特例，FM 框架为设计新的概率路径提供了更大灵活性",
        "<strong>实验验证</strong>：在 CIFAR-10、ImageNet 32/64/128 上取得与扩散模型可比或更优的 NLL 和 FID，同时训练收敛更快、采样更高效"
      ],
      "detail": "<p><img alt=\"Flow Matching 概念示意图\" src=\"https://ar5iv.labs.arxiv.org/html/2210.02747v2/assets/x1.png\" />\n<em>图：Flow Matching 通过条件概率路径构造，将噪声分布映射到数据分布。OT 路径（右）产生比扩散路径（左）更直的轨迹，采样效率更高。</em></p>\n<h5>动机与背景</h5>\n<p>连续归一化流（CNF）是一类强大的生成模型，通过时间连续的 ODE 定义从噪声到数据的变换。然而传统 CNF 训练面临两大瓶颈：</p>\n<ol>\n<li><strong>训练需要模拟 ODE</strong>：无论是最大似然训练还是 FFJORD 方法，都需要在训练过程中求解 ODE，计算代价高昂</li>\n<li><strong>扩散模型的间接性</strong>：虽然扩散模型（Score Matching）提供了无模拟训练方案，但其概率路径由随机微分方程（SDE）隐式定义，限制了路径设计的灵活性</li>\n</ol>\n<p>Flow Matching 的核心洞察是：<strong>可以直接指定概率路径 \\(p_t\\) 和生成它的向量场 \\(u_t\\)，然后用简单的回归损失训练神经网络去拟合这个向量场</strong>。</p>\n<h5>核心机制</h5>\n<p><strong>1. Flow Matching 目标函数</strong></p>\n<p>给定一个时间依赖的概率密度路径 \\(p_t\\)（从 \\(p_0 = \\mathcal{N}(0,I)\\) 到 \\(p_1 \\approx q\\)）及其生成向量场 \\(u_t\\)，FM 目标为：</p>\n<p>$$\\mathcal{L}_{FM}(\\theta) = \\mathbb{E}_{t \\sim \\mathcal{U}[0,1], x \\sim p_t(x)} \\|v_t(x) - u_t(x)\\|^2$$</p>\n<p>其中 \\(v_t\\) 是参数化的神经网络向量场。这个目标直观清晰：让网络输出逼近真实向量场。</p>\n<div class=\"warn-box\">⚠️ 注意：FM 目标虽然简洁，但 \\(p_t(x)\\) 和 \\(u_t(x)\\) 通常不可计算——它们涉及对所有数据点的积分。</div>\n<p><strong>2. 条件概率路径与条件流匹配</strong></p>\n<p>为解决不可计算问题，论文引入<strong>条件概率路径</strong> \\(p_t(x|x_1)\\)，即以单个数据点 \\(x_1\\) 为条件的路径。边际概率路径通过混合获得：</p>\n<p>$$p_t(x) = \\int p_t(x|x_1) q(x_1) dx_1$$</p>\n<p>类似地，边际向量场为：</p>\n<p>$$u_t(x) = \\int \\frac{p_t(x|x_1)}{p_t(x)} u_t(x|x_1) q(x_1) dx_1$$</p>\n<div class=\"key-point\">💡 关键：<strong>Theorem 1</strong> 证明了如果条件向量场 \\(u_t(x|x_1)\\) 生成条件概率路径 \\(p_t(x|x_1)\\)，那么边际向量场 \\(u_t(x)\\) 生成边际概率路径 \\(p_t(x)\\)。</div>\n<p><strong>条件流匹配（CFM）目标</strong>定义为：</p>\n<p>$$\\mathcal{L}_{CFM}(\\theta) = \\mathbb{E}_{t, q(x_1), p_t(x|x_1)} \\|v_t(x) - u_t(x|x_1)\\|^2$$</p>\n<div class=\"key-point\">💡 关键：<strong>Theorem 2</strong> 证明 \\(\\nabla_\\theta \\mathcal{L}_{CFM} = \\nabla_\\theta \\mathcal{L}_{FM}\\)，即两个目标的梯度完全相同。这意味着优化 CFM 等价于优化 FM，而 CFM 中的所有量都是可计算的！</div>\n<p><strong>3. 高斯条件概率路径</strong></p>\n<p>论文聚焦于高斯形式的条件路径：</p>\n<p>$$p_t(x|x_1) = \\mathcal{N}(x \\mid \\mu_t(x_1), \\sigma_t(x_1)^2 I)$$</p>\n<p>对应的仿射条件流为：</p>\n<p>$$\\psi_t(x) = \\sigma_t(x_1) x + \\mu_t(x_1)$$</p>\n<p><strong>Theorem 3</strong> 给出条件向量场的闭式解：</p>\n<p>$$u_t(x|x_1) = \\frac{\\sigma_t'(x_1)}{\\sigma_t(x_1)}(x - \\mu_t(x_1)) + \\mu_t'(x_1)$$</p>\n<p>这个公式是整个框架的计算核心——通过选择不同的 \\(\\mu_t, \\sigma_t\\)，可以得到不同的概率路径。</p>\n<p><strong>4. 扩散路径 vs 最优传输路径</strong></p>\n<p>论文展示了两类重要的路径选择：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>路径类型</th>\n<th>\\(\\mu_t(x_1)\\)</th>\n<th>\\(\\sigma_t(x_1)\\)</th>\n<th>特点</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>VP (方差保持)</td>\n<td>\\(e^{-\\frac{1}{4}t^2(\\beta_1-\\beta_0)-\\frac{1}{2}t\\beta_0} x_1\\)</td>\n<td>复杂表达式</td>\n<td>等价于 VP-SDE 扩散模型</td>\n</tr>\n<tr>\n<td>VE (方差爆炸)</td>\n<td>\\(x_1\\)</td>\n<td>\\(\\sigma_{\\min}(\\sigma_{\\max}/\\sigma_{\\min})^t\\)</td>\n<td>等价于 VE-SDE 扩散模型</td>\n</tr>\n<tr>\n<td><strong>OT (最优传输)</strong></td>\n<td>\\(tx_1\\)</td>\n<td>\\(1-(1-\\sigma_{\\min})t\\)</td>\n<td><strong>直线轨迹，恒定速度</strong></td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 关键：OT 路径的条件流 \\(\\psi_t(x_0) = (1-(1-\\sigma_{\\min})t)x_0 + tx_1\\) 是从 \\(x_0\\) 到 \\(x_1\\) 的线性插值，产生最简单的直线轨迹。</div>\n<p><strong>5. OT 路径的条件向量场与训练损失</strong></p>\n<p>OT 路径的条件向量场为：</p>\n<p>$$u_t(x|x_1) = \\frac{x_1 - (1-\\sigma_{\\min})x}{1-(1-\\sigma_{\\min})t}$$</p>\n<p>最终的 CFM 训练损失（实际使用）：</p>\n<p>$$\\mathcal{L}_{CFM}(\\theta) = \\mathbb{E}_{t, q(x_1), p(x_0)} \\|v_t(\\psi_t(x_0)) - (x_1 - (1-\\sigma_{\\min})x_0)\\|^2$$</p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># Flow Matching with OT Path - Training\nsigma_min = 1e-5  # 小常数\n\nfor x1 in dataloader:  # x1 ~ q(x1), 数据样本\n    x0 = torch.randn_like(x1)  # x0 ~ N(0, I), 噪声样本\n    t = torch.rand(x1.shape[0])  # t ~ U[0,1]\n\n    # 构造条件流：线性插值\n    psi_t = (1 - (1 - sigma_min) * t) * x0 + t * x1\n\n    # 目标向量场（OT条件VF的简化形式）\n    target = x1 - (1 - sigma_min) * x0\n\n    # 回归损失\n    loss = ||v_theta(t, psi_t) - target||^2\n    loss.backward()\n    optimizer.step()\n\n# Sampling (推理)\nx = torch.randn(batch_size, *shape)  # x0 ~ N(0, I)\n# 用 ODE 求解器从 t=0 积分到 t=1\nx = ode_solve(v_theta, x, t_span=[0, 1])  # 自适应步长求解器\n</code></pre>\n<h5>与扩散模型的关系</h5>\n<p>Flow Matching 框架揭示了与扩散模型的深层联系：</p>\n<ol>\n<li><strong>扩散模型是 FM 的特例</strong>：选择 VP 或 VE 的 \\(\\mu_t, \\sigma_t\\) 参数化，FM 的条件向量场恰好对应 Score Matching 的得分函数（相差一个已知的缩放因子）</li>\n<li><strong>FM 更通用</strong>：FM 不依赖 SDE 构造，可以直接指定任意满足边界条件的概率路径</li>\n<li><strong>OT 路径无扩散对应</strong>：OT 路径产生的直线轨迹在扩散模型框架中没有自然对应，这是 FM 框架独有的优势</li>\n</ol>\n<h5>实验结果</h5>\n<p><strong>密度建模与样本质量（ImageNet 32/64/128）</strong></p>\n<p>使用相同的 U-Net 架构（Dhariwal &amp; Nichol, 2021），在相同超参数下对比不同训练方法：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th style=\"text-align: center;\">CIFAR-10 NLL↓</th>\n<th style=\"text-align: center;\">CIFAR-10 FID↓</th>\n<th style=\"text-align: center;\">CIFAR-10 NFE↓</th>\n<th style=\"text-align: center;\">ImgNet32 NLL↓</th>\n<th style=\"text-align: center;\">ImgNet32 FID↓</th>\n<th style=\"text-align: center;\">ImgNet32 NFE↓</th>\n<th style=\"text-align: center;\">ImgNet64 NLL↓</th>\n<th style=\"text-align: center;\">ImgNet64 FID↓</th>\n<th style=\"text-align: center;\">ImgNet64 NFE↓</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>DDPM</td>\n<td style=\"text-align: center;\">3.14</td>\n<td style=\"text-align: center;\">9.21</td>\n<td style=\"text-align: center;\">200</td>\n<td style=\"text-align: center;\">3.59</td>\n<td style=\"text-align: center;\">7.76</td>\n<td style=\"text-align: center;\">210</td>\n<td style=\"text-align: center;\">3.39</td>\n<td style=\"text-align: center;\">18.40</td>\n<td style=\"text-align: center;\">210</td>\n</tr>\n<tr>\n<td>Score Matching</td>\n<td style=\"text-align: center;\">3.16</td>\n<td style=\"text-align: center;\">19.94</td>\n<td style=\"text-align: center;\">242</td>\n<td style=\"text-align: center;\">3.56</td>\n<td style=\"text-align: center;\">5.68</td>\n<td style=\"text-align: center;\">178</td>\n<td style=\"text-align: center;\">3.40</td>\n<td style=\"text-align: center;\">19.74</td>\n<td style=\"text-align: center;\">441</td>\n</tr>\n<tr>\n<td>ScoreFlow</td>\n<td style=\"text-align: center;\">3.09</td>\n<td style=\"text-align: center;\">20.78</td>\n<td style=\"text-align: center;\">428</td>\n<td style=\"text-align: center;\">3.55</td>\n<td style=\"text-align: center;\">14.14</td>\n<td style=\"text-align: center;\">195</td>\n<td style=\"text-align: center;\">3.36</td>\n<td style=\"text-align: center;\">24.95</td>\n<td style=\"text-align: center;\">601</td>\n</tr>\n<tr>\n<td><strong>FM w/ Diffusion</strong></td>\n<td style=\"text-align: center;\">3.10</td>\n<td style=\"text-align: center;\">8.06</td>\n<td style=\"text-align: center;\">183</td>\n<td style=\"text-align: center;\">3.54</td>\n<td style=\"text-align: center;\">6.37</td>\n<td style=\"text-align: center;\">193</td>\n<td style=\"text-align: center;\">3.33</td>\n<td style=\"text-align: center;\">16.88</td>\n<td style=\"text-align: center;\">187</td>\n</tr>\n<tr>\n<td><strong>FM w/ OT</strong></td>\n<td style=\"text-align: center;\"><strong>2.99</strong></td>\n<td style=\"text-align: center;\"><strong>6.35</strong></td>\n<td style=\"text-align: center;\"><strong>142</strong></td>\n<td style=\"text-align: center;\"><strong>3.53</strong></td>\n<td style=\"text-align: center;\"><strong>5.02</strong></td>\n<td style=\"text-align: center;\"><strong>122</strong></td>\n<td style=\"text-align: center;\"><strong>3.31</strong></td>\n<td style=\"text-align: center;\"><strong>14.45</strong></td>\n<td style=\"text-align: center;\"><strong>138</strong></td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 关键发现：FM-OT 在所有数据集上<strong>同时</strong>取得最优的 NLL、FID 和最低的 NFE。特别是 NFE 降低约 30-40%，意味着采样速度显著提升。</div>\n<p><strong>ImageNet 128×128</strong>：FM-OT 取得 NLL=2.90, FID=20.9，在无条件生成模型中达到 SOTA。</p>\n<p><strong>超分辨率（64→256）</strong>：FM-OT 取得 FID=3.4, IS=200.8，显著优于 SR3（FID=5.2, IS=180.1）。</p>\n<p><strong>训练效率</strong>：FM-OT 收敛速度远快于基线方法。ImageNet-128 训练仅需 500k 迭代（batch=1.5k），而 Dhariwal &amp; Nichol (2021) 需要 4.36M 迭代（batch=256），图像吞吐量减少 33%。</p>\n<p><strong>采样效率</strong>：在固定步数 ODE 求解器下，FM-OT 仅需约 60% 的 NFE 即可达到与扩散模型相同的数值误差阈值，且在极低 NFE 下仍能保持合理的 FID。</p>",
      "quiz": {
        "q": "Flow Matching 中条件流匹配（CFM）目标函数相比原始 FM 目标函数的关键优势是什么？",
        "options": [
          "CFM 的损失值更小，收敛更快",
          "CFM 中所有期望项均可计算，而 FM 中的边际概率路径和向量场不可计算",
          "CFM 不需要神经网络参数化向量场",
          "CFM 可以直接优化似然函数而无需回归"
        ],
        "answer": 1,
        "explain": "FM 目标需要从边际分布 p_t(x) 采样并计算边际向量场 u_t(x)，这涉及对所有数据点的积分，不可计算。CFM 将期望转化为对条件分布 p_t(x|x_1) 的采样和条件向量场 u_t(x|x_1) 的计算，两者都有闭式解。Theorem 2 保证两者梯度等价。"
      }
    },
    {
      "id": "brain_vi",
      "num": 13,
      "name": "Brain-like VI",
      "fullName": "类脑变分推断 (Brain-like VI)",
      "year": "2026",
      "org": "UC Irvine",
      "parent": "vi",
      "paperUrl": "https://proceedings.neurips.cc/paper_files/paper/2025/hash/efa0939caa8a906fd0a61a9c60e46e8b-Abstract-Conference.html",
      "projectUrl": "",
      "category": "specialized",
      "motivation": "脉冲神经网络实现生物推断",
      "summary": "iP-VAE 通过对变分自由能施加自然梯度下降、在线更新和迭代精炼三条约束（FOND框架），从第一性原理推导出膜电位动力学方程，其中自然涌现前馈驱动、循环解释消除和除法归一化等经典神经回路计算，在重建-稀疏性权衡上优于摊销VAE且参数量减少25倍。",
      "keyPoints": [
        "FOND框架将变分推断设计空间分为\"灵活选择\"（分布族、参数化）和\"固定处方\"（自然梯度、在线、迭代），后者唯一确定推断动力学",
        "选择Poisson后验/先验 + 高斯似然 + 线性解码器，Fisher预条件化使指数因子精确对消，得到线性膜电位动力学",
        "核心方程 \\(\\dot{u} \\propto \\Phi^T x - \\Phi^T\\Phi z - \\beta(u - u_0)\\)：三项分别为前馈驱动、循环抑制、稳态泄漏",
        "在线设置下KL泄漏项消失（单步更新极限），循环权重矩阵 \\(W = \\Phi^T\\Phi\\) 自然产生除法归一化",
        "脉冲 \\(z \\sim \\text{Pois}(e^u)\\) 为整数值，神经元通过离散脉冲而非连续膜电位通信，比标准预测编码更符合生物学",
        "iP-VAE学习V1-like Gabor滤波器，达到最优重建-稀疏性Pareto前沿（R²=0.83, 77%零值）",
        "统一预测编码（PC）、稀疏编码（LCA）、摊销VAE为同一框架下的不同实例化"
      ],
      "detail": "<p><img alt=\"iP-VAE推断动力学与模型架构\" src=\"https://arxiv.org/html/2410.19315v2/extracted/19954040/figs/fig1_model_overview.png\" /></p>\n<p><em>图：iP-VAE的推断过程。膜电位u通过自然梯度下降在自由能景观中演化，经指数非线性产生发放率r=exp(u)，再Poisson采样得到整数脉冲z。迭代过程中预测误差(x−Φz)驱动u更新直至收敛到吸引子。</em></p>\n<p><img alt=\"FOND框架模型统一树\" src=\"https://arxiv.org/html/2410.19315v2/extracted/19954040/figs/fig2_model_tree.png\" /></p>\n<p><em>图：FOND框架下的模型统一树。从自由能最小化出发，通过不同分布选择和推断方式可推导出PC、LCA、标准VAE和iP-VAE等模型。</em></p>\n<pre><code class=\"language-python\"># iP-VAE 推断与学习算法伪代码\n# ================================================\n# 输入: 数据流 {x_t}, 字典 Φ ∈ R^{M×K}, 训练步数 T_train\n# 输出: 学习后的字典 Φ, 脉冲表示 z\n\ndef ipvae_inference_online(x, Phi, u_prev, T_steps):\n    &quot;&quot;&quot;单帧在线迭代推断 (eq.7)&quot;&quot;&quot;\n    u = u_prev.clone()  # 上一时刻后验作为当前先验\n    drive = Phi.T @ x   # 前馈驱动 (仅计算一次)\n    W = Phi.T @ Phi      # 循环权重矩阵\n\n    for t in range(T_steps):\n        rate = torch.exp(u)          # 发放率 r = exp(u)\n        z = torch.poisson(rate)      # 整数脉冲 z ~ Pois(r)\n        u = u + drive - W @ z        # 在线更新 (KL项消失)\n        # 等价于: u += Φᵀ(x - Φz)   即预测误差驱动\n    return z, u\n\ndef ipvae_train(dataloader, Phi, K=512, T_train=16, beta=1.0, lr=1e-3):\n    &quot;&quot;&quot;iP-VAE训练: 通过时间反向传播更新字典&quot;&quot;&quot;\n    optimizer = Adam([Phi], lr=lr)\n    u_running = torch.zeros(K)\n\n    for x_batch in dataloader:\n        loss_accum = 0\n        u = u_running.clone()\n        u0 = u.clone()\n\n        for t in range(T_train):\n            rate = torch.exp(u)\n            z = poisson_reparameterize(rate)  # 可微Poisson采样\n            recon_loss = 0.5 * ((x_batch - Phi @ z) ** 2).sum()\n            kl_loss = beta * (rate * (u - u0) - (rate - torch.exp(u0))).sum()\n            loss_accum += recon_loss + kl_loss\n            with torch.no_grad():\n                u = u + Phi.T @ x_batch - Phi.T @ Phi @ z - beta * (u - u0)\n\n        optimizer.zero_grad()\n        loss_accum.backward()  # 梯度累积跨T_train步 (类似BPTT)\n        optimizer.step()\n        u_running = u.detach()\n\n    return Phi\n</code></pre>\n<p><strong>动机与背景：从感知即推断到神经动力学。</strong> 大脑如何从嘈杂的感官输入中推断外部世界的隐含状态？贝叶斯脑假说认为感知就是变分推断——大脑维护一个关于世界的内部模型，并通过最小化变分自由能来更新信念。然而，现有的变分推断实现（如摊销VAE使用前馈编码器一次性输出后验参数）缺乏生物学合理性：真实神经元通过循环连接和迭代动力学逐步精炼表征。本文的核心问题是：能否从变分推断的第一性原理出发，推导出与真实神经回路一致的推断动力学？</p>\n<p><strong>核心机制：FOND框架的三条处方与Fisher对消。</strong> FOND框架的关键创新在于将推断算法的设计分解为两个正交维度。\"灵活选择\"包括后验/先验分布族（Poisson、Gaussian等）和参数化方式（自然参数、均值参数等），这些决定了模型的表达能力。\"固定处方\"则包含三条不可违背的约束：(1) <strong>自然梯度</strong>——在Fisher信息度量下进行最速下降，保证参数更新与分布流形的几何结构一致；(2) <strong>在线</strong>——当前后验成为下一时刻先验，捕捉时间连续性；(3) <strong>迭代</strong>——允许多步精炼而非一次性推断。对于iP-VAE，选择Poisson后验 \\(q(z|x) = \\prod_i \\text{Pois}(z_i; e^{u_i})\\) 后，自由能梯度为 \\(\\nabla_u F = e^u \\odot [-\\Phi^T(x-\\Phi z) + \\beta(u-u_0)]\\)，其中 \\(e^u\\) 来自链式法则。而Poisson分布在对数速率参数化下的Fisher矩阵恰好是 \\(G(u) = \\text{diag}(e^u)\\)。自然梯度 \\(G^{-1}\\nabla_u F\\) 中两个 \\(e^u\\) 精确对消，得到线性动力学——这个\"Fisher对消\"是整个推导最优美的数学结果。</p>\n<p><strong>在线推断与除法归一化的涌现。</strong> 在线设置下（\\(u_0 \\leftarrow u\\)），单步更新极限使KL项 \\(\\beta(u-u_0) \\to 0\\) 消失，得到极简更新规则 \\(u_{t+1} = u_t + \\Phi^T x - \\Phi^T\\Phi z_t\\)。将此从膜电位空间变换到发放率空间 \\(r = e^u\\)，得到乘性更新：</p>\n<p>$$r_{t+1,i} = r_{t,i} \\cdot \\frac{\\exp(\\Phi^T x)_i}{\\exp(W_{ii} z_{t,i}) \\cdot \\prod_{j \\neq i} \\exp(W_{ij} z_{t,j})}$$</p>\n<p>分母呈现经典的<strong>除法归一化</strong>（divisive normalization）形式——大脑皮层中最普遍的计算原语。对角项 \\(W_{ii} = \\|\\Phi_{\\cdot i}\\|^2\\) 提供自抑制（防止过度激活），非对角项 \\(W_{ij} = \\Phi_{\\cdot i}^T \\Phi_{\\cdot j}\\) 基于调谐相似性提供侧抑制（重叠感受野的神经元相互竞争）。这种竞争机制同时实现了稀疏化和稳定化，无需额外的正则化设计。</p>\n<p><strong>与传统方法的关键区别。</strong> 与标准预测编码（PC）相比，iP-VAE的循环交互通过离散脉冲z而非连续膜电位u进行，更符合真实神经元的通信方式。与摊销VAE相比，iP-VAE无需训练编码器网络（参数量减少25倍），且通过权重复用（同一字典Φ用于所有迭代步）实现\"随机深度\"——测试时可运行任意多步以提升精度。与LCA稀疏编码相比，iP-VAE引入了概率采样（脉冲的随机性），使其成为真正的生成模型，可计算似然和进行后验采样。</p>\n<div class=\"key-point\">💡 关键：Fisher预条件化不仅是数学技巧，它使得推断动力学从非线性（含\\(e^u\\)）变为线性，这正是为什么真实神经元的膜电位动力学可以用线性微分方程近似描述的理论基础。</div>",
      "quiz": {
        "q": "iP-VAE中自然梯度下降的核心作用是什么？",
        "options": [
          "加速训练收敛，减少所需迭代步数",
          "对消Poisson参数化中的指数因子，使膜电位动力学变为线性",
          "引入除法归一化机制，实现神经元间侧抑制",
          "消除KL散度项，简化在线更新规则"
        ],
        "answer": 1,
        "explain": "Poisson分布在对数速率参数化下的Fisher矩阵G(u)=diag(exp(u))，与梯度中的exp(u)因子精确对消，将非线性动力学简化为线性膜电位更新方程eq(6)。"
      }
    },
    {
      "id": "bnn_scale",
      "num": 14,
      "name": "Large-scale BNN",
      "fullName": "大规模贝叶斯神经网络 (Large-scale BNN)",
      "year": "2026",
      "org": "KAIST",
      "parent": "bn",
      "paperUrl": "https://arxiv.org/abs/2602.05873",
      "projectUrl": "",
      "category": "specialized",
      "motivation": "深度网络不确定性精确量化",
      "summary": "提出近端得分匹配变分推断（Proximal Score-Matching VI）方法，通过将得分匹配损失与近端正则项结合，解决了传统得分匹配VI无法处理含噪mini-batch得分函数的根本瓶颈，首次将基于得分的变分推断扩展到ViT-L-32、ResNet-101等大规模贝叶斯神经网络。",
      "keyPoints": [
        "<strong>近端得分匹配目标</strong>：公式(7)将得分匹配损失与欧氏近端惩罚项结合，允许使用含噪的mini-batch后验得分函数，突破了原始得分匹配VI要求精确全数据集得分的限制",
        "<strong>无需重参数化采样</strong>：梯度估计器(公式9)仅需从旧分布 \\(q_{\\phi_{\\text{old}}}\\) 采样，避免了ADVI等方法中对重参数化技巧的依赖，天然支持离散变量和复杂变分族",
        "<strong>欧氏范数近端惩罚</strong>：用 \\(\\|\\phi - \\phi_{\\text{old}}\\|^2\\) 替代原始理论中的 \\(\\text{Cov}(q)\\) 加权范数，大幅降低计算复杂度，使方法可扩展到数百万参数",
        "<strong>线性退火调度</strong>：近端权重 \\(\\alpha_t = t/T\\) 从弱到强线性增长，早期允许大步探索、后期收紧稳定收敛",
        "<strong>支持高斯与Normalizing Flow变分族</strong>：高斯族支持均值场和低秩协方差；NF族通过可逆变换建模复杂多模态后验",
        "<strong>大规模实验验证</strong>：首次在ViT-L-32（~307M参数）和ResNet-101上进行BNN推断，覆盖图像分类（Oxford-Pets、Flowers-102、Food-101、Stanford Cars）和时序预测（Koopa模型）"
      ],
      "detail": "<h5>动机与背景</h5>\n<p>贝叶斯神经网络（BNN）通过对网络权重建模后验分布来量化预测不确定性，但其核心挑战在于后验推断的计算可扩展性。变分推断（VI）是主流近似方法，传统上通过最大化证据下界（ELBO）实现：</p>\n<p>$$\\mathcal{L}(\\phi) = \\mathbb{E}_{q_\\phi(\\theta)}\\left[\\log p(\\mathcal{D}|\\theta)\\right] - \\text{KL}(q_\\phi \\| p(\\theta))$$</p>\n<p>然而，ELBO优化存在两个根本问题：\n1. <strong>重参数化依赖</strong>：ADVI等方法需要通过重参数化技巧（reparameterization trick）将采样操作转化为确定性变换以计算梯度，这限制了变分族的选择（必须支持重参数化）\n2. <strong>KL散度计算</strong>：对于复杂变分族（如Normalizing Flow），KL散度往往没有解析形式</p>\n<p><strong>得分匹配VI</strong>（Score-Matching VI）提供了一种替代路径：不优化ELBO，而是直接最小化变分分布与后验分布在得分函数（对数密度梯度）空间的Fisher散度：</p>\n<p>$$\\min_\\phi \\mathbb{E}_{q_\\phi(\\theta)}\\left[\\left\\|\\nabla_\\theta \\log q_\\phi(\\theta) - \\nabla_\\theta \\log p(\\theta|\\mathcal{D})\\right\\|^2\\right]$$</p>\n<p>其优势在于：后验得分 \\(\\nabla_\\theta \\log p(\\theta|\\mathcal{D})\\) 不含归一化常数（因为对 \\(\\theta\\) 求导时常数消失），且无需重参数化采样。但<strong>致命缺陷</strong>是：该目标要求<strong>精确的全数据集后验得分</strong>，而实际训练中只能获得基于mini-batch的含噪估计。直接使用含噪得分会导致优化目标出现<strong>不可消除的偏差项</strong>，使得最终收敛到错误的分布。</p>\n<div class=\"warn-box\">⚠️ 注意：含噪得分的偏差来源于Fisher散度中的平方项——噪声的期望平方不等于期望的平方，即 \\(\\mathbb{E}[\\|\\epsilon\\|^2] \\neq \\|\\mathbb{E}[\\epsilon]\\|^2\\)。这是一个根本性的统计问题，不能通过简单增大batch size解决。</div>\n<h5>核心机制：近端得分匹配</h5>\n<p>本文的核心创新是引入<strong>近端算子</strong>（proximal operator）思想来解决含噪得分问题。在第 \\(t\\) 步迭代中，优化以下目标：</p>\n<p>$$\\mathcal{L}_t(\\phi) = \\mathbb{E}_{q_{\\phi_{\\text{old}}}(\\theta)}\\left[\\left\\|\\nabla_\\theta \\log q_\\phi(\\theta) - s_{\\text{noisy}}(\\theta)\\right\\|^2\\right] + \\frac{\\alpha_t}{2}\\|\\phi - \\phi_{\\text{old}}\\|^2 \\quad \\text{...(7)}$$</p>\n<p>其中：\n- \\(s_{\\text{noisy}}(\\theta) = \\nabla_\\theta \\log p(\\theta) + \\frac{N}{|\\mathcal{B}|}\\sum_{n \\in \\mathcal{B}} \\nabla_\\theta \\log p(y_n|x_n, \\theta)\\) 是基于mini-batch \\(\\mathcal{B}\\) 的含噪后验得分\n- \\(\\phi_{\\text{old}}\\) 是上一步的变分参数\n- \\(\\alpha_t > 0\\) 是近端惩罚权重\n- 期望在<strong>旧分布</strong> \\(q_{\\phi_{\\text{old}}}\\) 下计算（而非当前分布）</p>\n<div class=\"key-point\">💡 关键直觉：近端惩罚项 \\(\\frac{\\alpha_t}{2}\\|\\phi - \\phi_{\\text{old}}\\|^2\\) 起到\"锚定\"作用——即使当前mini-batch的得分估计有噪声偏差，参数也不会偏离上一步太远。随着迭代推进，噪声的影响被逐步平均掉，类似于随机近端点算法在凸优化中的收敛保证。</div>\n<p><strong>关键设计选择</strong>：</p>\n<ol>\n<li>\n<p><strong>欧氏范数替代协方差范数</strong>：原始理论（Barp et al., 2018）建议使用 \\(\\|\\phi - \\phi_{\\text{old}}\\|_{\\text{Cov}(q)}^2\\) 作为近端惩罚，但计算协方差矩阵的代价为 \\(O(d^2)\\)（\\(d\\) 为参数维度），对大规模BNN不可行。本文证明使用简单的欧氏范数 \\(\\|\\phi - \\phi_{\\text{old}}\\|^2\\) 同样有效，将计算复杂度降至 \\(O(d)\\)。</p>\n</li>\n<li>\n<p><strong>线性退火调度</strong>：设 \\(\\alpha_t = t/T\\)（\\(T\\) 为总迭代步数），早期 \\(\\alpha_t\\) 小，允许参数大幅更新以快速探索；后期 \\(\\alpha_t\\) 大，收紧约束以稳定收敛。</p>\n</li>\n<li>\n<p><strong>旧分布采样</strong>：期望在 \\(q_{\\phi_{\\text{old}}}\\) 下计算而非 \\(q_\\phi\\)，这意味着采样操作与当前参数 \\(\\phi\\) 无关，因此<strong>无需重参数化技巧</strong>即可计算梯度。</p>\n</li>\n</ol>\n<h5>无偏梯度估计器</h5>\n<p>对目标函数(7)关于 \\(\\phi\\) 求梯度，得到：</p>\n<p>$$\\nabla_\\phi \\mathcal{L}_t = \\mathbb{E}_{q_{\\phi_{\\text{old}}}}\\left[2\\left(\\nabla_\\theta \\log q_\\phi(\\theta) - s_{\\text{noisy}}(\\theta)\\right) \\cdot \\nabla_\\phi \\nabla_\\theta \\log q_\\phi(\\theta)\\right] + \\alpha_t(\\phi - \\phi_{\\text{old}}) \\quad \\text{...(9)}$$</p>\n<div class=\"key-point\">💡 关键：由于采样分布 \\(q_{\\phi_{\\text{old}}}\\) 不依赖于 \\(\\phi\\)，梯度算子可以直接移入期望内部（无需处理分布对参数的依赖），这使得梯度估计是<strong>无偏的</strong>。这是相对于标准得分匹配VI的根本优势。</div>\n<p>实际计算中，通过从 \\(q_{\\phi_{\\text{old}}}\\) 抽取 \\(S\\) 个样本进行蒙特卡洛近似：</p>\n<p>$$\\nabla_\\phi \\mathcal{L}_t \\approx \\frac{2}{S}\\sum_{s=1}^{S}\\left(\\nabla_\\theta \\log q_\\phi(\\theta^{(s)}) - s_{\\text{noisy}}(\\theta^{(s)})\\right) \\cdot \\nabla_\\phi \\nabla_\\theta \\log q_\\phi(\\theta^{(s)}) + \\alpha_t(\\phi - \\phi_{\\text{old}})$$</p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># Algorithm 1: Proximal Score-Matching VI for BNN\n# 输入: 数据集 D, 先验 p(θ), 总迭代步数 T, 采样数 S, 学习率 η\n\n初始化变分参数 φ (例如: μ=0, log_σ=0 for Gaussian)\nfor t = 1 to T:\n    φ_old = φ.detach()          # 冻结旧参数\n    α_t = t / T                  # 线性退火权重\n\n    # 从旧分布采样\n    θ_samples = sample(q_{φ_old}, S)   # S个样本, 无需重参数化\n\n    # 计算mini-batch含噪后验得分\n    B = random_minibatch(D)\n    s_noisy = ∇_θ log p(θ) + (N/|B|) * Σ_{n∈B} ∇_θ log p(y_n|x_n, θ)\n\n    # 计算得分匹配损失 + 近端惩罚\n    score_q = ∇_θ log q_φ(θ_samples)    # 变分得分\n    L_match = mean(||score_q - s_noisy||²)\n    L_prox = (α_t / 2) * ||φ - φ_old||²\n    L_total = L_match + L_prox\n\n    # 梯度更新\n    φ = φ - η * ∇_φ L_total\n</code></pre>\n<h5>变分族设计</h5>\n<p><strong>高斯变分族</strong>：对于 \\(q_\\phi(\\theta) = \\mathcal{N}(\\theta; \\mu, \\Sigma)\\)，变分得分有解析形式：</p>\n<p>$$\\nabla_\\theta \\log q_\\phi(\\theta) = -\\Sigma^{-1}(\\theta - \\mu)$$</p>\n<p>支持两种协方差参数化：\n- <strong>均值场</strong>（Mean-Field）：\\(\\Sigma = \\text{diag}(\\sigma_1^2, \\ldots, \\sigma_d^2)\\)，参数量 \\(O(d)\\)\n- <strong>低秩</strong>（Low-Rank）：\\(\\Sigma = DD^\\top + \\text{diag}(\\sigma^2)\\)，其中 \\(D \\in \\mathbb{R}^{d \\times r}\\)，参数量 \\(O(dr)\\)</p>\n<p>对于均值场情况，\\(\\nabla_\\phi \\nabla_\\theta \\log q_\\phi(\\theta)\\) 的计算非常高效：\n- 对 \\(\\mu\\)：\\(\\nabla_\\mu \\nabla_\\theta \\log q = -\\text{diag}(1/\\sigma^2)\\)\n- 对 \\(\\log\\sigma\\)：\\(\\nabla_{\\log\\sigma} \\nabla_\\theta \\log q = \\text{diag}(2(\\theta-\\mu)/\\sigma^2)\\)</p>\n<p><strong>Normalizing Flow变分族</strong>：通过可逆变换 \\(\\theta = f_\\psi(\\epsilon)\\)（\\(\\epsilon \\sim \\mathcal{N}(0,I)\\)）建模复杂后验。变分得分通过链式法则计算：</p>\n<p>$$\\nabla_\\theta \\log q(\\theta) = -J_f^{-\\top}\\epsilon - \\nabla_\\theta \\log|\\det J_f|$$</p>\n<p>其中 \\(J_f = \\partial f / \\partial \\epsilon\\) 是Jacobian矩阵。本文采用RealNVP架构实现高效的Jacobian计算。</p>\n<h5>与传统方法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>ADVI (ELBO)</th>\n<th>GSM (得分匹配)</th>\n<th>本文方法</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>含噪mini-batch得分</td>\n<td>✅ (天然支持)</td>\n<td>❌ (产生偏差)</td>\n<td>✅ (近端修正)</td>\n</tr>\n<tr>\n<td>需要重参数化</td>\n<td>✅</td>\n<td>❌</td>\n<td>❌</td>\n</tr>\n<tr>\n<td>支持NF变分族</td>\n<td>需计算KL</td>\n<td>✅</td>\n<td>✅</td>\n</tr>\n<tr>\n<td>大规模BNN</td>\n<td>✅</td>\n<td>❌ (需全数据)</td>\n<td>✅</td>\n</tr>\n<tr>\n<td>不确定性估计质量</td>\n<td>一般</td>\n<td>理论更优</td>\n<td>理论更优</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 关键优势：本文方法同时继承了得分匹配VI的理论优势（无需重参数化、支持复杂变分族）和ELBO方法的实用性（支持mini-batch训练），是两者的\"最佳结合\"。</div>\n<h5>实验结果概览</h5>\n<p><strong>大规模图像分类</strong>：在Oxford-Pets、Flowers-102、Food-101、Stanford Cars四个数据集上，使用预训练ViT-L-32和ResNet-101作为骨干网络进行BNN微调：</p>\n<ul>\n<li><strong>ViT-L-32</strong>（~307M参数）：本文方法在所有数据集上均达到或超过ADVI和GSM的分类精度，同时提供更好的不确定性校准（ECE指标）</li>\n<li><strong>ResNet-101</strong>：类似趋势，本文方法在精度和校准上均表现优异</li>\n<li>与确定性微调（MAP估计）相比，BNN方法在校准误差上有显著改善</li>\n</ul>\n<p><strong>时序预测</strong>：在exchange_rate和weather数据集上使用Koopa模型，本文方法在MSE和MAE指标上优于ADVI和GSM基线。</p>\n<p><strong>Normalizing Flow实验</strong>：在合成高斯和高斯混合模型（GMM）目标分布上，NF变分族版本能准确捕获多模态后验结构，显著优于高斯变分族。</p>\n<p><strong>计算效率</strong>：与ADVI相比，本文方法每步计算开销略高（约1.2-1.5倍），但收敛速度相当；与需要全数据集的GSM相比，本文方法在大数据集上具有数量级的速度优势。</p>",
      "quiz": {
        "q": "近端得分匹配VI中，为什么从旧分布q_{φ_old}而非当前分布q_φ采样？",
        "options": [
          "旧分布的采样质量更高",
          "从旧分布采样使得梯度估计无需重参数化技巧，且保证无偏性",
          "当前分布尚未收敛，采样不稳定",
          "为了减少每步的计算开销"
        ],
        "answer": 1,
        "explain": "由于采样分布q_{φ_old}不依赖当前参数φ，梯度算子可直接移入期望内部，无需处理分布对参数的依赖（即无需重参数化），从而得到无偏的梯度估计器。"
      }
    }
  ],
  "categories": {
    "foundation": {
      "label": "奠基理论",
      "color": "#22a06b"
    },
    "core": {
      "label": "核心框架",
      "color": "#5b63d3"
    },
    "specialized": {
      "label": "前沿进展",
      "color": "#e8820c"
    }
  },
  "projectUrls": {}
};
