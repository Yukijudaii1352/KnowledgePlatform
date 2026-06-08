/**
 * representation_learning-data.js — 由 pipeline/build.py 于 2026-06-08 12:12:04 自动生成。
 * 源文件：content/ml/representation_learning.md
 * ⚠️  请勿手动修改；如需更新，修改源文档后重新编译。
 */
window.PAGE_CONFIG = {
  "meta": {
    "domain": "ml",
    "topic_id": "representation_learning",
    "topic_name": "表示学习",
    "page_title": "表示学习 技术演进",
    "page_subtitle": "2026-06-08 版",
    "page_desc": "从特征工程到深度表示学习，探讨数据的有效表达方式",
    "page_icon": "🧠",
    "hero_pills": [
      "特征提取",
      "自监督学习"
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
        "id": "pca",
        "x": 1901,
        "y": 1,
        "category": "manifold"
      },
      {
        "id": "lstm",
        "x": 1997,
        "y": 2,
        "category": "deep_rep"
      },
      {
        "id": "tsne",
        "x": 2008,
        "y": 1,
        "category": "manifold"
      },
      {
        "id": "alexnet",
        "x": 2012,
        "y": 2,
        "category": "deep_rep"
      },
      {
        "id": "word2vec",
        "x": 2013,
        "y": 2,
        "category": "deep_rep"
      },
      {
        "id": "vae",
        "x": 2013,
        "y": 2.5,
        "category": "deep_rep"
      },
      {
        "id": "resnet",
        "x": 2016,
        "y": 2,
        "category": "deep_rep"
      },
      {
        "id": "transformer",
        "x": 2017,
        "y": 2,
        "category": "deep_rep"
      },
      {
        "id": "gat",
        "x": 2018,
        "y": 5,
        "category": "graph_rep"
      },
      {
        "id": "bert",
        "x": 2018,
        "y": 3,
        "category": "self_supervised"
      },
      {
        "id": "simclr",
        "x": 2020,
        "y": 3,
        "category": "self_supervised"
      },
      {
        "id": "moco",
        "x": 2020,
        "y": 3.5,
        "category": "self_supervised"
      },
      {
        "id": "mae",
        "x": 2022,
        "y": 3,
        "category": "self_supervised"
      },
      {
        "id": "mrl",
        "x": 2022,
        "y": 2,
        "category": "deep_rep"
      },
      {
        "id": "vjepa",
        "x": 2024,
        "y": 3,
        "category": "self_supervised"
      },
      {
        "id": "dinov3",
        "x": 2025.08,
        "y": 3.5,
        "category": "self_supervised"
      },
      {
        "id": "gemini_emb",
        "x": 2026.03,
        "y": 4,
        "category": "multimodal"
      },
      {
        "id": "wave",
        "x": 2026.05,
        "y": 4,
        "category": "multimodal"
      }
    ],
    "edges": [
      {
        "from": "pca",
        "to": "tsne",
        "label": "非线性扩展"
      },
      {
        "from": "alexnet",
        "to": "resnet",
        "label": "深度突破"
      },
      {
        "from": "lstm",
        "to": "transformer",
        "label": "并行化"
      },
      {
        "from": "resnet",
        "to": "simclr",
        "label": "对比学习"
      },
      {
        "from": "resnet",
        "to": "moco",
        "label": "动量队列"
      },
      {
        "from": "transformer",
        "to": "bert",
        "label": "双向预训练"
      },
      {
        "from": "bert",
        "to": "mae",
        "label": "掩码重建"
      },
      {
        "from": "bert",
        "to": "mrl",
        "label": "灵活维度"
      },
      {
        "from": "bert",
        "to": "gemini_emb",
        "label": "多模态"
      },
      {
        "from": "bert",
        "to": "wave",
        "label": "音视频"
      },
      {
        "from": "mae",
        "to": "vjepa",
        "label": "潜空间"
      },
      {
        "from": "moco",
        "to": "dinov3",
        "label": "Gram锚定"
      }
    ],
    "milestones": [
      "word2vec",
      "transformer",
      "bert"
    ]
  },
  "algos": [
    {
      "id": "pca",
      "num": 1,
      "name": "PCA",
      "fullName": "主成分分析 (Principal Component Analysis)",
      "year": "1901",
      "org": "Karl Pearson",
      "parent": "—",
      "paperUrl": "—",
      "projectUrl": "",
      "category": "manifold",
      "motivation": "无监督线性降维奠基方法",
      "summary": "PCA 通过寻找数据协方差矩阵的特征向量，将高维数据投影到方差最大的正交方向上，实现无监督线性降维，是几乎所有降维与表示学习方法的理论起点。",
      "keyPoints": [
        "<strong>最大方差准则</strong>：选择使投影后数据方差最大的方向作为主成分，逐次正交选取",
        "<strong>最小重构误差等价性</strong>：最大方差方向等价于最小化数据到投影子空间的重构误差",
        "<strong>协方差矩阵特征分解</strong>：核心计算归结为对数据协方差矩阵 <span class=\"kb-math kb-math-inline\">\\mathbf{C}</span> 进行特征值分解（或对数据矩阵做 SVD）",
        "<strong>降维与去相关</strong>：投影后各主成分之间互不相关（协方差为零）",
        "<strong>可解释方差比</strong>：每个主成分对应的特征值衡量其解释的方差比例，可用于选择保留维度数 <span class=\"kb-math kb-math-inline\">k</span>",
        "<strong>线性方法局限</strong>：仅能捕获线性结构，无法处理非线性流形（后续催生 Kernel PCA、Autoencoder 等方法）"
      ],
      "detail": "<p><img alt=\"PCA 几何示意图\" src=\"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/GaussianScatterPCA.svg/800px-GaussianScatterPCA.svg.png\" />\n<em>图：二维高斯分布数据的 PCA 示意。两个箭头分别为第一、第二主成分方向，箭头长度正比于对应特征值（即该方向上的方差）。来源：Wikipedia</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># PCA 核心算法\ndef PCA(X, k):\n    &quot;&quot;&quot;\n    X: (n, d) 数据矩阵，n 个样本，d 维特征\n    k: 目标降维维度\n    &quot;&quot;&quot;\n    # 1. 中心化\n    mu = X.mean(axis=0)          # (d,)\n    X_centered = X - mu          # (n, d)\n\n    # 2. 计算协方差矩阵\n    C = (X_centered.T @ X_centered) / (n - 1)  # (d, d)\n\n    # 3. 特征值分解\n    eigenvalues, eigenvectors = eig(C)  # 降序排列\n\n    # 4. 选取前 k 个主成分\n    W = eigenvectors[:, :k]      # (d, k) 投影矩阵\n\n    # 5. 投影\n    Z = X_centered @ W           # (n, k) 降维结果\n    return Z, W, eigenvalues[:k]\n</code></pre>\n<h5>动机与背景</h5>\n<p>1901 年，Karl Pearson 在论文 <em>\"On Lines and Planes of Closest Fit to Systems of Points in Space\"</em> 中提出了 PCA 的基本思想。其核心问题是：</p>\n<blockquote>\n<p>给定高维空间中的一组数据点，如何找到一个低维子空间，使得数据在该子空间上的表示尽可能保留原始信息？</p>\n</blockquote>\n<p>在 Pearson 的时代，高维数据的可视化和分析面临\"维度灾难\"的困扰——特征维度增加时，数据变得稀疏，统计估计不可靠，计算也变得昂贵。PCA 提供了一种优雅的解决方案：找到数据中\"最重要\"的方向，丢弃\"不重要\"的方向，从而在信息损失最小的前提下降低维度。</p>\n<h5>核心机制：最大方差与最小重构误差</h5>\n<p>PCA 的理论基础可以从两个等价视角理解：</p>\n<p><strong>视角一：最大方差（Maximum Variance）</strong></p>\n<p>设数据 <span class=\"kb-math kb-math-inline\">\\mathbf{X} \\in \\mathbb{R}^{n \\times d}</span> 已中心化（均值为零）。我们希望找到一个单位向量 <span class=\"kb-math kb-math-inline\">\\mathbf{w}_1 \\in \\mathbb{R}^d</span>，使得数据投影到该方向后的方差最大：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{w}_1 = \\arg\\max_{\\|\\mathbf{w}\\|=1} \\text{Var}(\\mathbf{X}\\mathbf{w}) = \\arg\\max_{\\|\\mathbf{w}\\|=1} \\mathbf{w}^\\top \\mathbf{C} \\mathbf{w}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\mathbf{C} = \\frac{1}{n-1}\\mathbf{X}^\\top\\mathbf{X}</span> 是样本协方差矩阵。利用拉格朗日乘子法，约束优化问题转化为：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{C}\\mathbf{w} = \\lambda \\mathbf{w}</div>\n<p>这正是协方差矩阵的<strong>特征值问题</strong>。最大方差方向 <span class=\"kb-math kb-math-inline\">\\mathbf{w}_1</span> 对应最大特征值 <span class=\"kb-math kb-math-inline\">\\lambda_1</span>，第二主成分 <span class=\"kb-math kb-math-inline\">\\mathbf{w}_2</span> 在与 <span class=\"kb-math kb-math-inline\">\\mathbf{w}_1</span> 正交的约束下对应第二大特征值 <span class=\"kb-math kb-math-inline\">\\lambda_2</span>，以此类推。</p>\n<div class=\"key-point\">💡 关键：特征值 <span class=\"kb-math kb-math-inline\">\\lambda_i</span> 的物理意义是数据在第 <span class=\"kb-math kb-math-inline\">i</span> 个主成分方向上的方差。因此 <span class=\"kb-math kb-math-inline\">\\frac{\\lambda_i}{\\sum_j \\lambda_j}</span> 就是第 <span class=\"kb-math kb-math-inline\">i</span> 个主成分的<strong>可解释方差比（explained variance ratio）</strong>。</div>\n<p><strong>视角二：最小重构误差（Minimum Reconstruction Error）</strong></p>\n<p>等价地，PCA 也可以理解为寻找一个 <span class=\"kb-math kb-math-inline\">k</span> 维线性子空间，使得数据点到该子空间的投影误差最小：</p>\n<div class=\"kb-math kb-math-display\">\\min_{\\mathbf{W} \\in \\mathbb{R}^{d \\times k}} \\sum_{i=1}^{n} \\|\\mathbf{x}_i - \\mathbf{W}\\mathbf{W}^\\top\\mathbf{x}_i\\|^2 \\quad \\text{s.t.} \\quad \\mathbf{W}^\\top\\mathbf{W} = \\mathbf{I}_k</div>\n<p>展开后可以证明，最小化重构误差等价于最大化投影方差，两者给出完全相同的解。</p>\n<div class=\"key-point\">💡 关键：这一等价性意味着 PCA 同时是\"保留最多信息\"和\"丢失最少信息\"的最优线性降维。</div>\n<h5>SVD 视角与高效计算</h5>\n<p>在实践中，直接计算 <span class=\"kb-math kb-math-inline\">d \\times d</span> 协方差矩阵在 <span class=\"kb-math kb-math-inline\">d</span> 很大时代价高昂。更高效的方法是对中心化数据矩阵直接做<strong>奇异值分解（SVD）</strong>：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{X} = \\mathbf{U}\\boldsymbol{\\Sigma}\\mathbf{V}^\\top</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\mathbf{V}</span> 的列即为主成分方向（协方差矩阵的特征向量），<span class=\"kb-math kb-math-inline\">\\boldsymbol{\\Sigma}</span> 的对角元素 <span class=\"kb-math kb-math-inline\">\\sigma_i</span> 与特征值的关系为 <span class=\"kb-math kb-math-inline\">\\lambda_i = \\frac{\\sigma_i^2}{n-1}</span>。降维结果为：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{Z} = \\mathbf{U}_k \\boldsymbol{\\Sigma}_k</div>\n<p>其中下标 <span class=\"kb-math kb-math-inline\">k</span> 表示取前 <span class=\"kb-math kb-math-inline\">k</span> 个分量（截断 SVD）。现代实现（如 scikit-learn 的 <code>PCA</code>）默认使用随机化 SVD（Randomized SVD），时间复杂度从 <span class=\"kb-math kb-math-inline\">O(d^3)</span> 降至 <span class=\"kb-math kb-math-inline\">O(ndk)</span>。</p>\n<h5>维度选择策略</h5>\n<p>选择保留多少个主成分 <span class=\"kb-math kb-math-inline\">k</span> 是 PCA 应用中的关键决策。常用方法包括：</p>\n<ol>\n<li><strong>累积方差阈值</strong>：选择最小的 <span class=\"kb-math kb-math-inline\">k</span> 使得 <span class=\"kb-math kb-math-inline\">\\sum_{i=1}^k \\lambda_i / \\sum_{j=1}^d \\lambda_j \\geq \\tau</span>（常取 <span class=\"kb-math kb-math-inline\">\\tau = 0.95</span>）</li>\n<li><strong>碎石图（Scree Plot）</strong>：绘制特征值随序号的衰减曲线，在\"肘部\"截断</li>\n<li><strong>Kaiser 准则</strong>：保留特征值大于均值（即 <span class=\"kb-math kb-math-inline\">\\lambda_i &gt; \\bar{\\lambda}</span>）的主成分</li>\n</ol>\n<h5>与传统方法的区别及后续发展</h5>\n<p>PCA 作为线性降维的奠基方法，其局限性催生了大量后续工作：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>与 PCA 的关系</th>\n<th>核心改进</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><strong>Kernel PCA</strong></td>\n<td>核化扩展</td>\n<td>通过核技巧在高维特征空间做 PCA，捕获非线性结构</td>\n</tr>\n<tr>\n<td><strong>Probabilistic PCA</strong></td>\n<td>概率化建模</td>\n<td>将 PCA 解释为潜变量模型，支持缺失值处理和贝叶斯推断</td>\n</tr>\n<tr>\n<td><strong>Sparse PCA</strong></td>\n<td>稀疏约束</td>\n<td>在主成分上施加 L1 正则，提升可解释性</td>\n</tr>\n<tr>\n<td><strong>Autoencoder</strong></td>\n<td>非线性推广</td>\n<td>用神经网络学习非线性编码-解码映射；线性 AE 退化为 PCA</td>\n</tr>\n<tr>\n<td><strong>t-SNE / UMAP</strong></td>\n<td>非线性可视化</td>\n<td>保局部邻域结构而非全局方差，适合高维数据可视化</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"warn-box\">⚠️ 注意：PCA 假设数据的主要变异方向是线性的，且以方差作为\"重要性\"度量。当数据分布在弯曲流形上，或方差大的方向并非任务相关方向时（如监督学习场景），PCA 可能不是最优选择。此时应考虑 LDA（有监督）或非线性方法。</div>\n<h5>PCA 的经典性质总结</h5>\n<ol>\n<li><strong>去相关性</strong>：PCA 投影后的各分量协方差为零，即 <span class=\"kb-math kb-math-inline\">\\text{Cov}(z_i, z_j) = 0, \\; i \\neq j</span></li>\n<li><strong>最优性</strong>：在所有线性降维方法中，PCA 在均方重构误差意义下是最优的（Eckart–Young–Mirsky 定理）</li>\n<li><strong>旋转不变性</strong>：PCA 结果不依赖于原始坐标系的选择（仅依赖数据的协方差结构）</li>\n<li><strong>与高斯分布的关系</strong>：若数据服从多元高斯分布，PCA 的主成分方向恰好是概率密度等高线的主轴方向</li>\n</ol>",
      "quiz": {
        "q": "PCA 中，第一主成分方向 w₁ 的求解等价于以下哪个优化问题？",
        "options": [
          "最小化数据投影后的方差",
          "最大化数据投影后的方差，即求协方差矩阵的最大特征值对应的特征向量",
          "最小化数据各维度之间的相关系数",
          "最大化数据投影后各分量之间的协方差"
        ],
        "answer": 1,
        "explain": "PCA 第一主成分是使投影方差最大的方向，通过拉格朗日乘子法可知其为协方差矩阵最大特征值对应的特征向量。"
      }
    },
    {
      "id": "tsne",
      "num": 2,
      "name": "t-SNE",
      "fullName": "t-分布随机邻域嵌入 (t-distributed Stochastic Neighbor Embedding)",
      "year": "2008",
      "org": "Hinton Lab",
      "parent": "pca",
      "paperUrl": "https://www.jmlr.org/papers/v9/vandermaaten08a.html",
      "projectUrl": "",
      "category": "manifold",
      "motivation": "高维数据非线性可视化",
      "summary": "t-SNE 的核心目标是：高维数据非线性可视化。",
      "keyPoints": [
        "核心动机：高维数据非线性可视化",
        "演化来源：继承或改进自 pca",
        "代表机构：Hinton Lab"
      ],
      "detail": "<p>高维数据非线性可视化</p>"
    },
    {
      "id": "lstm",
      "num": 3,
      "name": "LSTM",
      "fullName": "长短期记忆网络 (Long Short-Term Memory)",
      "year": "1997",
      "org": "Hochreiter & Schmidhuber",
      "parent": "—",
      "paperUrl": "—",
      "projectUrl": "",
      "category": "deep_rep",
      "motivation": "门控机制解决长程依赖",
      "summary": "LSTM 通过引入具有恒定误差流（Constant Error Carrousel, CEC）的记忆单元及输入/输出门控机制，从根本上解决了传统 RNN 中梯度指数级衰减/爆炸导致无法学习长程依赖的问题，能够桥接超过 1000 步的时间间隔。",
      "keyPoints": [
        "<strong>恒定误差流（CEC）</strong>：记忆单元内部采用自连接权重为 1 的线性单元，确保误差信号在时间维度上既不衰减也不爆炸",
        "<strong>输入门（Input Gate）</strong>：学习何时允许新信息写入记忆单元，保护 CEC 免受无关输入的干扰",
        "<strong>输出门（Output Gate）</strong>：学习何时允许记忆内容输出到网络其他部分，防止当前无关的记忆内容扰乱后续计算",
        "<strong>记忆单元块（Memory Cell Blocks）</strong>：多个记忆单元共享同一对输入/输出门，减少参数量并提高计算效率",
        "<strong>截断 BPTT 学习算法</strong>：仅在单元内部保持完整梯度流，截断跨单元的梯度传播，实现 <span class=\"kb-math kb-math-inline\">O(W)</span> 时间复杂度（W 为权重总数）"
      ],
      "detail": "<p><img alt=\"LSTM 记忆单元架构示意图\" src=\"https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/LSTM_Cell.svg/1200px-LSTM_Cell.svg.png\" />\n<em>图：LSTM 记忆单元架构（注：此图为含遗忘门的现代扩展版本，原始 1997 版本不含遗忘门）</em></p>\n<pre><code class=\"language-python\"># LSTM 前向传播伪代码（原始 1997 版本，无遗忘门）\n# 假设单个记忆单元块含 S_c 个单元\n\nfor t in range(1, T+1):\n    # --- 输入门激活 ---\n    net_in[t] = sum(w_in_j * y_j[t-1] for j in all_sources)\n    y_in[t] = sigmoid(net_in[t])  # f_in: [0,1] 的挤压函数\n\n    # --- 记忆单元状态更新 ---\n    for c in range(S_c):\n        net_c[c][t] = sum(w_c_j * y_j[t-1] for j in all_sources)\n        # CEC 核心：状态自连接 + 门控输入\n        s_c[c][t] = s_c[c][t-1] + y_in[t] * g(net_c[c][t])\n        # s_c 保持恒定误差流：自连接权重 = 1\n\n    # --- 输出门激活 ---\n    net_out[t] = sum(w_out_j * y_j[t-1] for j in all_sources)\n    y_out[t] = sigmoid(net_out[t])  # f_out: [0,1] 的挤压函数\n\n    # --- 单元输出 ---\n    for c in range(S_c):\n        y_c[c][t] = y_out[t] * h(s_c[c][t])\n        # h: 将状态压缩到 [-1, 1] 或 [-2, 2]\n</code></pre>\n<p><strong>动机与背景：梯度消失问题的本质</strong></p>\n<p>传统 RNN 使用 BPTT（Back-Propagation Through Time）或 RTRL（Real-Time Recurrent Learning）进行训练时，误差信号在时间维度上反向传播会被连乘因子缩放。Hochreiter (1991) 的分析表明，从时刻 <span class=\"kb-math kb-math-inline\">t</span> 到时刻 <span class=\"kb-math kb-math-inline\">t-q</span> 的误差缩放因子为：</p>\n<div class=\"kb-math kb-math-display\">\\frac{\\partial \\delta_v(t-q)}{\\partial \\delta_u(t)} = \\prod_{m=1}^{q} f&#x27;_m(net_m(t-m)) \\cdot w_{m,m-1}</div>\n<p>当 <span class=\"kb-math kb-math-inline\">q</span> 增大时，若 <span class=\"kb-math kb-math-inline\">|f&#x27;_m \\cdot w_{m,m-1}| &lt; 1</span>，误差指数级衰减（梯度消失）；若 <span class=\"kb-math kb-math-inline\">&gt; 1</span>，则指数级爆炸。这意味着传统 RNN 在实践中无法学习超过 10-20 步的时间依赖关系。</p>\n<p><strong>核心机制：恒定误差流与门控</strong></p>\n<p>LSTM 的核心洞察是：要实现长程记忆，必须保证误差信号在时间维度上的恒定流动。对于记忆单元 <span class=\"kb-math kb-math-inline\">c</span> 的内部状态 <span class=\"kb-math kb-math-inline\">s_c</span>，其自连接权重设为 1：</p>\n<div class=\"kb-math kb-math-display\">s_c(t) = s_c(t-1) + y^{in}(t) \\cdot g(net_c(t))</div>\n<p>这保证了 <span class=\"kb-math kb-math-inline\">\\frac{\\partial s_c(t)}{\\partial s_c(t-1)} = 1.0</span>，即 CEC（Constant Error Carrousel）中的误差可以无损地在任意长的时间跨度内流动。</p>\n<div class=\"key-point\">💡 关键：CEC 的恒定误差流是 LSTM 能够桥接长时间间隔的数学基础。自连接权重 = 1 意味着记忆单元的\"遗忘\"不是被动发生的，而是由门控机制主动控制的。</div>\n<p>然而，单纯的恒定误差流会带来<strong>输入权重冲突</strong>和<strong>输出权重冲突</strong>问题：\n- 输入权重冲突：同一权重既要在存储阶段允许信息写入，又要在非存储阶段阻止噪声干扰\n- 输出权重冲突：同一权重既要在需要时允许信息读出，又要在不需要时阻止无关内容输出</p>\n<p>LSTM 通过<strong>乘性门控单元</strong>优雅地解决了这两个冲突：</p>\n<div class=\"kb-math kb-math-display\">y^{in}(t) = f_{in}\\left(\\sum_j w_{in_j} \\cdot y_j(t-1)\\right)</div>\n<div class=\"kb-math kb-math-display\">y^{out}(t) = f_{out}\\left(\\sum_j w_{out_j} \\cdot y_j(t-1)\\right)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">f_{in}</span> 和 <span class=\"kb-math kb-math-inline\">f_{out}</span> 为 sigmoid 函数，输出范围 <span class=\"kb-math kb-math-inline\">[0, 1]</span>。当门值接近 0 时，信息通道关闭；接近 1 时，信息通道完全打开。</p>\n<p><strong>训练流程与截断梯度</strong></p>\n<p>LSTM 的学习算法是 RTRL 的一种高效变体，核心思想是<strong>截断梯度传播</strong>：\n1. 在 CEC 内部，梯度完整保留（保证长程依赖学习）\n2. 跨越记忆单元边界的梯度被截断（即不回传通过门控单元到其他单元的梯度）</p>\n<p>具体的权重更新规则：</p>\n<p>对于连接到记忆单元 <span class=\"kb-math kb-math-inline\">c</span> 的输入权重 <span class=\"kb-math kb-math-inline\">w_{c_l}</span>：</p>\n<div class=\"kb-math kb-math-display\">\\Delta w_{c_l} = \\alpha \\sum_t \\frac{\\partial E}{\\partial y_c(t)} \\cdot y^{out}(t) \\cdot h&#x27;(s_c(t)) \\cdot \\frac{\\partial s_c(t)}{\\partial w_{c_l}}</div>\n<p>其中内部状态的偏导数递推为：</p>\n<div class=\"kb-math kb-math-display\">\\frac{\\partial s_c(t)}{\\partial w_{c_l}} = \\frac{\\partial s_c(t-1)}{\\partial w_{c_l}} + y^{in}(t) \\cdot g&#x27;(net_c(t)) \\cdot y_l(t-1)</div>\n<div class=\"warn-box\">⚠️ 注意：截断梯度并不影响长程误差流——因为 CEC 内部的梯度始终完整保留。截断仅影响门控单元之间的间接梯度路径，这在实践中不会损害性能。</div>\n<p>这种截断策略使得计算复杂度降为 <span class=\"kb-math kb-math-inline\">O(W)</span>（W 为网络权重总数），与标准 BPTT 相同，但能有效学习远超 BPTT 能力范围的长程依赖。</p>\n<p><strong>与传统方法的对比</strong></p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>长程依赖能力</th>\n<th>时间复杂度</th>\n<th>核心问题</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>标准 BPTT</td>\n<td>≤10-20 步</td>\n<td><span class=\"kb-math kb-math-inline\">O(W)</span></td>\n<td>梯度消失/爆炸</td>\n</tr>\n<tr>\n<td>RTRL</td>\n<td>≤10-20 步</td>\n<td><span class=\"kb-math kb-math-inline\">O(W^2)</span></td>\n<td>梯度消失 + 高复杂度</td>\n</tr>\n<tr>\n<td>Elman/Jordan 网络</td>\n<td>≤10 步</td>\n<td><span class=\"kb-math kb-math-inline\">O(W)</span></td>\n<td>固定衰减，无法学习</td>\n</tr>\n<tr>\n<td>Narendra 自适应</td>\n<td>有限</td>\n<td><span class=\"kb-math kb-math-inline\">O(W)</span></td>\n<td>需要已知系统模型</td>\n</tr>\n<tr>\n<td><strong>LSTM</strong></td>\n<td><strong>&gt;1000 步</strong></td>\n<td><strong><span class=\"kb-math kb-math-inline\">O(W)</span></strong></td>\n<td><strong>门控 + CEC 解决</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p>实验表明，LSTM 在嵌入式 Reber 文法、加法问题、乘法问题、时序异或等任务上均大幅超越竞争方法，且是唯一能解决需要精确桥接 1000+ 步时间间隔的任务的方法。</p>",
      "quiz": {
        "q": "LSTM 中恒定误差流（CEC）的实现机制是什么？",
        "options": [
          "使用 ReLU 激活函数避免梯度饱和",
          "记忆单元内部自连接权重设为 1，保证梯度在时间维度上不衰减",
          "通过梯度裁剪将梯度范数限制在固定阈值内",
          "使用残差连接跳过多个时间步"
        ],
        "answer": 1,
        "explain": "CEC 的核心是记忆单元的自连接权重恒为 1，使得 ∂s(t)/∂s(t-1) = 1.0，误差信号可以在任意长的时间跨度内无损流动，这是 LSTM 解决梯度消失问题的数学基础。"
      }
    },
    {
      "id": "alexnet",
      "num": 4,
      "name": "AlexNet",
      "fullName": "AlexNet",
      "year": "2012",
      "org": "Hinton Lab",
      "parent": "—",
      "paperUrl": "—",
      "projectUrl": "",
      "category": "deep_rep",
      "motivation": "深度CNN视觉表示突破",
      "summary": "AlexNet 首次证明了深度卷积神经网络在大规模图像分类任务上的巨大优势，以 top-5 错误率 15.3%（远超第二名的 26.2%）赢得 ILSVRC-2012 竞赛，开启了深度学习在计算机视觉领域的统治时代。",
      "keyPoints": [
        "<strong>深度架构</strong>：5 层卷积 + 3 层全连接，共 60M 参数、650K 神经元，是当时最大的 CNN",
        "<strong>ReLU 激活函数</strong>：首次大规模使用非饱和激活 <span class=\"kb-math kb-math-inline\">\\text{ReLU}(x) = \\max(0, x)</span>，训练速度比 tanh 快约 6 倍",
        "<strong>双 GPU 并行训练</strong>：将网络分布在两块 GTX 580 GPU 上，特定层跨 GPU 通信，突破显存限制",
        "<strong>局部响应归一化（LRN）</strong>：模拟生物神经元的侧抑制机制，提升泛化能力",
        "<strong>重叠池化（Overlapping Pooling）</strong>：池化窗口 3×3、步长 2，相比非重叠池化降低过拟合",
        "<strong>Dropout 正则化</strong>：在全连接层以 0.5 概率随机置零神经元，有效减少过拟合",
        "<strong>数据增强</strong>：随机裁剪（224×224 from 256×256）、水平翻转、PCA 颜色扰动",
        "<strong>ILSVRC-2012 冠军</strong>：top-5 错误率 15.3%，大幅领先传统手工特征方法（26.2%）"
      ],
      "detail": "<p><img alt=\"AlexNet 网络架构图\" src=\"https://production-media.paperswithcode.com/methods/Screen_Shot_2020-06-22_at_6.35.45_PM.png\" />\n<em>图：AlexNet 网络架构。网络被分为上下两部分分别部署在两块 GPU 上，仅在特定层（Conv3、FC6、FC7、FC8）进行跨 GPU 通信。来源：Krizhevsky et al., 2012</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># AlexNet 前向传播伪代码\ndef AlexNet_forward(image):\n    &quot;&quot;&quot;\n    image: (3, 227, 227) RGB 输入图像\n    输出: 1000 类概率分布\n    &quot;&quot;&quot;\n    # ===== 卷积特征提取 =====\n    # Conv1: 96 kernels, 11×11, stride 4\n    x = conv2d(image, filters=96, kernel=11, stride=4)  # → (96, 55, 55)\n    x = relu(x)\n    x = local_response_norm(x, k=2, n=5, α=1e-4, β=0.75)\n    x = max_pool(x, kernel=3, stride=2)                 # → (96, 27, 27)\n\n    # Conv2: 256 kernels, 5×5, pad 2\n    x = conv2d(x, filters=256, kernel=5, pad=2)         # → (256, 27, 27)\n    x = relu(x)\n    x = local_response_norm(x, k=2, n=5, α=1e-4, β=0.75)\n    x = max_pool(x, kernel=3, stride=2)                 # → (256, 13, 13)\n\n    # Conv3: 384 kernels, 3×3, pad 1 (跨GPU通信)\n    x = conv2d(x, filters=384, kernel=3, pad=1)         # → (384, 13, 13)\n    x = relu(x)\n\n    # Conv4: 384 kernels, 3×3, pad 1\n    x = conv2d(x, filters=384, kernel=3, pad=1)         # → (384, 13, 13)\n    x = relu(x)\n\n    # Conv5: 256 kernels, 3×3, pad 1\n    x = conv2d(x, filters=256, kernel=3, pad=1)         # → (256, 13, 13)\n    x = relu(x)\n    x = max_pool(x, kernel=3, stride=2)                 # → (256, 6, 6)\n\n    # ===== 全连接分类器 =====\n    x = flatten(x)                                       # → (9216,)\n    x = dropout(relu(linear(x, 4096)), p=0.5)           # FC6\n    x = dropout(relu(linear(x, 4096)), p=0.5)           # FC7\n    x = softmax(linear(x, 1000))                        # FC8\n    return x\n</code></pre>\n<h5>动机与背景</h5>\n<p>在 AlexNet 之前，计算机视觉的主流方法依赖手工设计的特征描述子（如 SIFT、HOG）配合浅层分类器（如 SVM）。这些方法在 ImageNet 这样包含 1000 类、120 万张图像的大规模数据集上表现有限——2011 年 ILSVRC 冠军的 top-5 错误率仍高达 25.7%。</p>\n<p>Krizhevsky、Sutskever 和 Hinton 认为，深度卷积神经网络具有足够的学习能力来直接从原始像素学习层次化的视觉表示，但此前受限于三个瓶颈：</p>\n<ol>\n<li><strong>训练数据不足</strong>：ImageNet 的出现（2009）首次提供了百万级标注数据</li>\n<li><strong>计算能力不足</strong>：GPU（特别是 NVIDIA GTX 580）使大规模 CNN 训练成为可能</li>\n<li><strong>训练技巧缺乏</strong>：过拟合和梯度消失问题阻碍了深层网络的训练</li>\n</ol>\n<p>AlexNet 通过一系列工程创新和正则化技术，首次成功训练了一个 8 层深度 CNN，并以压倒性优势赢得了 ILSVRC-2012 竞赛。</p>\n<h5>核心机制：ReLU 与训练加速</h5>\n<p>AlexNet 最重要的技术贡献之一是用 ReLU（Rectified Linear Unit）替代传统的 sigmoid/tanh 激活函数：</p>\n<div class=\"kb-math kb-math-display\">f(x) = \\max(0, x)</div>\n<p>相比饱和激活函数 <span class=\"kb-math kb-math-inline\">\\tanh(x)</span> 或 <span class=\"kb-math kb-math-inline\">\\sigma(x) = \\frac{1}{1+e^{-x}}</span>，ReLU 具有以下关键优势：</p>\n<ul>\n<li><strong>无梯度饱和</strong>：正区间梯度恒为 1，避免了深层网络中的梯度消失问题</li>\n<li><strong>计算高效</strong>：仅需阈值判断，无需指数运算</li>\n<li><strong>稀疏激活</strong>：约 50% 的神经元输出为零，产生稀疏表示</li>\n</ul>\n<div class=\"key-point\">💡 关键：论文实验表明，使用 ReLU 的 4 层 CNN 在 CIFAR-10 上达到 25% 训练错误率的速度是使用 tanh 的 6 倍。这一发现使训练更深的网络成为可能。</div>\n<h5>局部响应归一化（LRN）</h5>\n<p>AlexNet 引入了受生物视觉系统侧抑制（lateral inhibition）启发的局部响应归一化：</p>\n<div class=\"kb-math kb-math-display\">b_{x,y}^{i} = a_{x,y}^{i} \\bigg/ \\left( k + \\alpha \\sum_{j=\\max(0,i-n/2)}^{\\min(N-1,i+n/2)} (a_{x,y}^{j})^2 \\right)^{\\beta}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">a_{x,y}^{i}</span> 是第 <span class=\"kb-math kb-math-inline\">i</span> 个卷积核在位置 <span class=\"kb-math kb-math-inline\">(x,y)</span> 的激活值，归一化在相邻 <span class=\"kb-math kb-math-inline\">n</span> 个通道上进行。论文使用 <span class=\"kb-math kb-math-inline\">k=2, n=5, \\alpha=10^{-4}, \\beta=0.75</span>。</p>\n<div class=\"warn-box\">⚠️ 注意：后续研究（如 VGGNet）发现 LRN 的实际效果有限，现代网络已普遍使用 Batch Normalization 替代。但 LRN 的提出体现了从生物神经科学汲取灵感的思路。</div>\n<h5>Dropout 正则化</h5>\n<p>AlexNet 在全连接层（FC6、FC7）中使用了 Dropout，这是该技术首次在大规模视觉任务中成功应用：</p>\n<div class=\"kb-math kb-math-display\">\\hat{h}_i = m_i \\cdot h_i, \\quad m_i \\sim \\text{Bernoulli}(p=0.5)</div>\n<p>训练时，每个神经元以概率 0.5 被随机置零；推理时，所有神经元激活值乘以 0.5（或等价地，训练时除以保留概率）。</p>\n<p>Dropout 的核心直觉是：它迫使网络学习更鲁棒的特征，因为每个神经元不能依赖特定其他神经元的存在。这相当于训练了一个指数级数量的\"瘦网络\"的集成（ensemble）。</p>\n<div class=\"key-point\">💡 关键：没有 Dropout，AlexNet 的全连接层（参数量占总量的 90% 以上）会严重过拟合。Dropout 将 top-1 错误率降低了约 1-2%。</div>\n<h5>数据增强策略</h5>\n<p>AlexNet 采用了两种数据增强方法来人为扩大训练集：</p>\n<p><strong>1. 空间变换</strong>：从 256×256 的图像中随机裁剪 224×224 的区域，并进行水平翻转。这使训练集扩大了 <span class=\"kb-math kb-math-inline\">2 \\times (256-224)^2 = 2048</span> 倍。测试时，从四角和中心裁剪 5 个 patch 加上翻转共 10 个 patch，取预测均值。</p>\n<p><strong>2. PCA 颜色扰动</strong>：对训练图像的 RGB 通道进行 PCA，然后沿主成分方向添加随机扰动：</p>\n<div class=\"kb-math kb-math-display\">[\\mathbf{p}_1, \\mathbf{p}_2, \\mathbf{p}_3][\\alpha_1 \\lambda_1, \\alpha_2 \\lambda_2, \\alpha_3 \\lambda_3]^\\top</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\mathbf{p}_i, \\lambda_i</span> 是 RGB 像素值 3×3 协方差矩阵的特征向量和特征值，<span class=\"kb-math kb-math-inline\">\\alpha_i \\sim \\mathcal{N}(0, 0.1)</span>。这种方法利用了自然图像在光照变化下的不变性，将 top-1 错误率降低了超过 1%。</p>\n<h5>训练细节与超参数</h5>\n<p>AlexNet 使用带动量的 SGD 进行训练：</p>\n<div class=\"kb-math kb-math-display\">v_{t+1} = 0.9 \\cdot v_t - 0.0005 \\cdot \\epsilon \\cdot w_t - \\epsilon \\cdot \\frac{\\partial L}{\\partial w_t}</div>\n<div class=\"kb-math kb-math-display\">w_{t+1} = w_t + v_{t+1}</div>\n<p>关键训练配置：\n- 批大小：128\n- 初始学习率：0.01，当验证错误率不再下降时除以 10\n- 权重衰减：0.0005（论文指出这不仅是正则化，还有助于训练）\n- 权重初始化：零均值高斯分布，标准差 0.01\n- 偏置初始化：Conv2/4/5 和 FC 层为 1，其余为 0\n- 训练周期：约 90 个 epoch，在两块 GTX 580 上训练 5-6 天</p>\n<h5>与传统方法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>传统方法（SIFT+SVM）</th>\n<th>AlexNet</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>特征提取</td>\n<td>手工设计（SIFT, HOG）</td>\n<td>端到端学习</td>\n</tr>\n<tr>\n<td>表示层次</td>\n<td>单层/浅层</td>\n<td>8 层深度层次化表示</td>\n</tr>\n<tr>\n<td>ILSVRC top-5 错误率</td>\n<td>~26%</td>\n<td>15.3%</td>\n</tr>\n<tr>\n<td>可迁移性</td>\n<td>任务特定</td>\n<td>特征可迁移到其他视觉任务</td>\n</tr>\n<tr>\n<td>计算需求</td>\n<td>CPU 可完成</td>\n<td>需要 GPU 加速</td>\n</tr>\n</tbody>\n</table></div>\n<p>AlexNet 的成功不仅在于竞赛成绩，更在于它证明了：深度 CNN 学到的中间层特征（尤其是 FC7 层的 4096 维表示）具有强大的迁移能力，可以作为通用视觉特征用于检测、分割等下游任务。这一发现奠定了\"预训练+微调\"范式的基础。</p>",
      "quiz": {
        "q": "AlexNet 中使用 ReLU 激活函数替代 tanh 的主要优势是什么？",
        "options": [
          "减少模型参数量，降低过拟合风险",
          "训练速度显著加快（约6倍），且避免梯度饱和问题",
          "使网络输出值归一化到 [0,1] 区间",
          "增强模型对旋转变换的不变性"
        ],
        "answer": 1,
        "explain": "ReLU 在正区间梯度恒为1，不存在梯度饱和问题，且计算简单（无需指数运算），论文实验证明训练速度约为 tanh 的6倍。"
      }
    },
    {
      "id": "word2vec",
      "num": 5,
      "name": "Word2Vec",
      "fullName": "Word2Vec",
      "year": "2013",
      "org": "Google",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/1301.3781",
      "projectUrl": "",
      "category": "deep_rep",
      "motivation": "CBOW/Skip-gram高效词嵌入",
      "summary": "Word2Vec 提出了 CBOW（连续词袋）和 Skip-gram 两种轻量级神经网络架构，通过去除隐藏层非线性变换大幅降低计算复杂度，使得在数十亿词规模语料上训练高质量词向量成为可能，所学向量在词类比任务中展现出显著的线性语义/句法规律性。",
      "keyPoints": [
        "<strong>两种新架构</strong>：CBOW（用上下文预测中心词）和 Skip-gram（用中心词预测上下文），均去除了传统 NNLM 的隐藏层",
        "<strong>计算复杂度大幅降低</strong>：CBOW 训练复杂度 <span class=\"kb-math kb-math-inline\">O(N \\times D + D \\times \\log_2 V)</span>，Skip-gram 为 <span class=\"kb-math kb-math-inline\">O(C \\times (D + D \\times \\log_2 V))</span>，远低于 NNLM 的 <span class=\"kb-math kb-math-inline\">O(N \\times D + N \\times D \\times H + H \\times V)</span>",
        "<strong>词向量线性规律性</strong>：发现 <span class=\"kb-math kb-math-inline\">\\text{vec}(\\text{&quot;King&quot;}) - \\text{vec}(\\text{&quot;Man&quot;}) + \\text{vec}(\\text{&quot;Woman&quot;}) \\approx \\text{vec}(\\text{&quot;Queen&quot;})</span> 等向量算术关系",
        "<strong>大规模评测基准</strong>：构建包含 8869 个语义问题和 10675 个句法问题的 Semantic-Syntactic Word Relationship 测试集",
        "<strong>分布式训练支持</strong>：基于 DistBelief 框架实现大规模并行训练，1000 维 Skip-gram 在 6B 词上达到 65.6% 总准确率",
        "<strong>Microsoft Sentence Completion Challenge</strong>：Skip-gram + RNNLM 组合达到 58.9% 新 SOTA"
      ],
      "detail": "<h5>模型架构</h5>\n<p>论文的核心贡献是提出两种计算高效的词向量学习架构。下图展示了 CBOW 和 Skip-gram 的结构对比：</p>\n<p><img alt=\"Word2Vec 架构图：CBOW 与 Skip-gram\" src=\"https://ar5iv.labs.arxiv.org/html/1301.3781v3/assets/x1.png\" />\n<em>图：左侧为 CBOW 架构（上下文词预测中心词），右侧为 Skip-gram 架构（中心词预测上下文词）。两者均无隐藏层非线性变换。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># Word2Vec 训练核心逻辑（简化版）\n\n# === CBOW ===\nfor sentence in corpus:\n    for t, w_t in enumerate(sentence):\n        # 取上下文窗口 [t-C, t+C] 内的词（不含 w_t）\n        context = sentence[t-C:t] + sentence[t+1:t+C+1]\n        # 投影层：对上下文词向量求和（或平均）\n        h = sum(W_input[w] for w in context)\n        # 输出层：用 hierarchical softmax 预测 w_t\n        loss = -log P_hierarchical_softmax(w_t | h)\n        update(W_input, W_output, loss)\n\n# === Skip-gram ===\nfor sentence in corpus:\n    for t, w_t in enumerate(sentence):\n        # 输入层：取中心词向量\n        h = W_input[w_t]\n        # 对窗口内每个上下文词分别预测\n        for c in range(-C, C+1):\n            if c == 0: continue\n            w_c = sentence[t + c]\n            loss = -log P_hierarchical_softmax(w_c | h)\n            update(W_input, W_output, loss)\n</code></pre>\n<h5>动机与背景</h5>\n<p>在 Word2Vec 之前，主流的词向量学习方法依赖于带有隐藏层的神经网络语言模型（NNLM）或循环神经网络语言模型（RNNLM）。这些模型虽然能学到有意义的词表示，但存在严重的计算瓶颈：</p>\n<ul>\n<li><strong>NNLM</strong>（Bengio et al., 2003）的训练复杂度为 <span class=\"kb-math kb-math-inline\">Q = N \\times D + N \\times D \\times H + H \\times V</span>，其中瓶颈在于隐藏层到输出层的 <span class=\"kb-math kb-math-inline\">H \\times V</span> 项（即使使用 Hierarchical Softmax 降至 <span class=\"kb-math kb-math-inline\">H \\times \\log_2 V</span>，隐藏层计算 <span class=\"kb-math kb-math-inline\">N \\times D \\times H</span> 仍然昂贵）</li>\n<li><strong>RNNLM</strong>（Mikolov et al., 2010）复杂度为 <span class=\"kb-math kb-math-inline\">Q = H \\times H + H \\times V</span>，虽然没有投影层，但循环连接 <span class=\"kb-math kb-math-inline\">H \\times H</span> 和输出层仍是瓶颈</li>\n</ul>\n<div class=\"key-point\">💡 关键洞察：词向量的质量并不一定需要复杂的非线性模型。通过去除隐藏层，可以在保持向量质量的同时将训练速度提升数个数量级。</div>\n<h5>核心机制详解</h5>\n<p><strong>1. CBOW（Continuous Bag-of-Words）</strong></p>\n<p>CBOW 的设计灵感来自 NNLM，但做了两个关键简化：\n- <strong>去除隐藏层</strong>：投影层直接连接到输出层，消除了 <span class=\"kb-math kb-math-inline\">N \\times D \\times H</span> 的计算开销\n- <strong>共享投影矩阵</strong>：所有上下文词共享同一个投影矩阵，且投影层通过<strong>求和</strong>（而非拼接）聚合上下文信息</p>\n<p>训练复杂度降为：</p>\n<div class=\"kb-math kb-math-display\">Q_{\\text{CBOW}} = N \\times D + D \\times \\log_2(V)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">N</span> 为上下文窗口大小，<span class=\"kb-math kb-math-inline\">D</span> 为词向量维度，<span class=\"kb-math kb-math-inline\">V</span> 为词表大小。注意投影层是所有上下文词向量的加权平均，因此词序信息被丢弃（这也是\"Bag-of-Words\"名称的由来）。与标准 BOW 不同的是，CBOW 使用<strong>连续</strong>的分布式表示，且利用上下文的<strong>未来词</strong>（而非仅历史词）。</p>\n<p><strong>2. Skip-gram</strong></p>\n<p>Skip-gram 反转了 CBOW 的预测方向：给定中心词，预测其上下文中的每个词。其训练目标是最大化：</p>\n<div class=\"kb-math kb-math-display\">\\frac{1}{T}\\sum_{t=1}^{T}\\sum_{-c \\leq j \\leq c, j \\neq 0} \\log p(w_{t+j} \\mid w_t)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">T</span> 为语料总词数，<span class=\"kb-math kb-math-inline\">c</span> 为上下文窗口半径。基本的 softmax 定义为：</p>\n<div class=\"kb-math kb-math-display\">p(w_O \\mid w_I) = \\frac{\\exp({v&#x27;_{w_O}}^{\\top} v_{w_I})}{\\sum_{w=1}^{V} \\exp({v&#x27;_w}^{\\top} v_{w_I})}</div>\n<p>训练复杂度为：</p>\n<div class=\"kb-math kb-math-display\">Q_{\\text{Skip-gram}} = C \\times (D + D \\times \\log_2(V))</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">C</span> 为上下文窗口的最大距离。Skip-gram 对每个上下文位置独立预测，因此在语义关系捕获上表现更优（实验中语义准确率达 66.1%，远超 CBOW 的 57.3%）。</p>\n<div class=\"warn-box\">⚠️ 注意：增大窗口 <span class=\"kb-math kb-math-inline\">C</span> 会线性增加训练时间，但能捕获更远距离的语义关系。论文中 Skip-gram 的训练时间约为 CBOW 的 3 倍。</div>\n<p><strong>3. Hierarchical Softmax 加速</strong></p>\n<p>两种架构均使用 Hierarchical Softmax 替代标准 softmax，将输出层复杂度从 <span class=\"kb-math kb-math-inline\">O(V)</span> 降至 <span class=\"kb-math kb-math-inline\">O(\\log_2 V)</span>。这通过构建一棵 Huffman 树实现：高频词获得更短的编码路径，进一步加速训练。</p>\n<h5>训练流程与关键超参数</h5>\n<ul>\n<li><strong>语料</strong>：Google News 语料库，约 60 亿 tokens，词表限制为最高频的 100 万词</li>\n<li><strong>优化器</strong>：SGD + 线性学习率衰减（初始 lr = 0.025，线性衰减至 0）</li>\n<li><strong>训练轮次</strong>：3 个 epoch（后续发现 1 epoch + 2 倍数据量效果相当）</li>\n<li><strong>维度与数据量的关系</strong>：论文发现维度和数据量需<strong>同步增长</strong>才能持续提升效果，单独增加某一方面会遇到收益递减</li>\n</ul>\n<h5>实验结果与对比</h5>\n<p>在 640 维、相同训练数据条件下的架构对比（Table 3）：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>模型</th>\n<th>语义准确率</th>\n<th>句法准确率</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>RNNLM</td>\n<td>9%</td>\n<td>36%</td>\n</tr>\n<tr>\n<td>NNLM</td>\n<td>23%</td>\n<td>53%</td>\n</tr>\n<tr>\n<td>CBOW</td>\n<td>24%</td>\n<td>64%</td>\n</tr>\n<tr>\n<td><strong>Skip-gram</strong></td>\n<td><strong>55%</strong></td>\n<td>59%</td>\n</tr>\n</tbody>\n</table></div>\n<p>使用 DistBelief 分布式训练、1000 维向量、6B 词数据（Table 6）：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>模型</th>\n<th>语义准确率</th>\n<th>句法准确率</th>\n<th>总准确率</th>\n<th>训练成本</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>NNLM</td>\n<td>34.2%</td>\n<td>64.5%</td>\n<td>50.8%</td>\n<td>14×180 CPU·天</td>\n</tr>\n<tr>\n<td>CBOW</td>\n<td>57.3%</td>\n<td>68.9%</td>\n<td>63.7%</td>\n<td>2×140 CPU·天</td>\n</tr>\n<tr>\n<td>Skip-gram</td>\n<td><strong>66.1%</strong></td>\n<td>65.1%</td>\n<td><strong>65.6%</strong></td>\n<td>2.5×125 CPU·天</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 关键发现：CBOW 在句法任务上更强，Skip-gram 在语义任务上大幅领先。两者训练成本仅为 NNLM 的约 1/10。</div>\n<h5>与传统方法的核心区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>NNLM / RNNLM</th>\n<th>Word2Vec (CBOW / Skip-gram)</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>隐藏层</td>\n<td>有（非线性激活）</td>\n<td>无（线性投影）</td>\n</tr>\n<tr>\n<td>输出层</td>\n<td>Full softmax 或 HS</td>\n<td>Hierarchical Softmax</td>\n</tr>\n<tr>\n<td>训练目标</td>\n<td>语言模型（下一词预测）</td>\n<td>词向量质量（上下文预测）</td>\n</tr>\n<tr>\n<td>计算复杂度</td>\n<td><span class=\"kb-math kb-math-inline\">O(N \\times D \\times H)</span> 级</td>\n<td><span class=\"kb-math kb-math-inline\">O(N \\times D)</span> 级</td>\n</tr>\n<tr>\n<td>可扩展性</td>\n<td>数亿词级别</td>\n<td>数十亿至万亿词级别</td>\n</tr>\n<tr>\n<td>词序信息</td>\n<td>保留（拼接）</td>\n<td>CBOW 丢弃 / Skip-gram 部分保留</td>\n</tr>\n</tbody>\n</table></div>\n<p>Word2Vec 的核心哲学是：<strong>放弃精确的语言建模能力，换取在海量数据上高效学习词向量的能力</strong>。这一取舍被证明是极其成功的——简单架构 + 大数据的组合远胜复杂架构 + 小数据。</p>",
      "quiz": {
        "q": "关于 CBOW 和 Skip-gram 架构，以下哪项描述是正确的？",
        "options": [
          "CBOW 用中心词预测上下文，Skip-gram 用上下文预测中心词",
          "两者都包含一个带非线性激活函数的隐藏层",
          "Skip-gram 在语义类比任务上显著优于 CBOW，而 CBOW 在句法任务上更强",
          "Skip-gram 的训练速度比 CBOW 更快"
        ],
        "answer": 2,
        "explain": "实验表明 Skip-gram 语义准确率（66.1%）远超 CBOW（57.3%），而 CBOW 句法准确率（68.9%）高于 Skip-gram（65.1%）。选项 A 方向反了，选项 B 错误（两者均无隐藏层），选项 D 错误（Skip-gram 约为 CBOW 的 3 倍训练时间）。"
      }
    },
    {
      "id": "vae",
      "num": 6,
      "name": "VAE",
      "fullName": "变分自编码器 (Variational Autoencoder)",
      "year": "2013",
      "org": "Kingma & Welling",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/1312.6114",
      "projectUrl": "",
      "category": "deep_rep",
      "motivation": "重参数化技巧实现变分推断",
      "summary": "VAE 提出了重参数化技巧（Reparameterization Trick），将变分推断中不可微的采样操作转化为可微的确定性变换，使得含连续隐变量的深度生成模型可以通过标准随机梯度下降进行端到端训练，奠定了深度生成模型的基础框架。",
      "keyPoints": [
        "<strong>编码器-解码器框架</strong>：编码器（识别模型）<span class=\"kb-math kb-math-inline\">q_{\\boldsymbol{\\phi}}(\\mathbf{z}|\\mathbf{x})</span> 近似不可解的后验分布，解码器（生成模型）<span class=\"kb-math kb-math-inline\">p_{\\boldsymbol{\\theta}}(\\mathbf{x}|\\mathbf{z})</span> 从隐变量重建数据",
        "<strong>证据下界（ELBO）</strong>：将不可解的边际对数似然分解为可优化的变分下界，同时训练编码器和解码器",
        "<strong>重参数化技巧</strong>：将随机采样 <span class=\"kb-math kb-math-inline\">\\mathbf{z} \\sim q_{\\boldsymbol{\\phi}}(\\mathbf{z}|\\mathbf{x})</span> 重写为确定性函数 <span class=\"kb-math kb-math-inline\">\\mathbf{z} = \\boldsymbol{\\mu} + \\boldsymbol{\\sigma} \\odot \\boldsymbol{\\epsilon}</span>，其中 <span class=\"kb-math kb-math-inline\">\\boldsymbol{\\epsilon} \\sim \\mathcal{N}(0, \\mathbf{I})</span>，使梯度可以反向传播",
        "<strong>SGVB 估计器</strong>：Stochastic Gradient Variational Bayes 估计器，对 ELBO 进行无偏蒙特卡洛估计",
        "<strong>AEVB 算法</strong>：Auto-Encoding VB 算法，结合 SGVB 估计器和摊销推断（amortized inference），实现高效的小批量训练",
        "<strong>损失函数双组分</strong>：ELBO = 重建损失（负重建误差）+ KL 散度正则项（约束隐空间接近先验）",
        "<strong>实验验证</strong>：在 MNIST 和 Frey Face 数据集上验证，与 Wake-Sleep 算法和 Monte Carlo EM 对比"
      ],
      "detail": "<h5>核心框架图</h5>\n<p><img alt=\"VAE 训练收敛对比\" src=\"https://ar5iv.labs.arxiv.org/html/1312.6114/assets/x1.png\" />\n<em>图：AEVB 方法与 Wake-Sleep 算法在不同隐空间维度下的变分下界收敛对比。AEVB 在各维度下均收敛更快且达到更优的下界值。</em></p>\n<p><img alt=\"学习到的 MNIST 流形\" src=\"https://ar5iv.labs.arxiv.org/html/1312.6114/assets/x4.png\" />\n<em>图：VAE 在 2 维隐空间上学习到的 MNIST 数字流形。通过在隐空间网格上均匀采样并解码，可以看到数字之间的平滑过渡。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># AEVB (Auto-Encoding Variational Bayes) 算法\n# 输入: 数据集 X, 编码器参数 φ, 解码器参数 θ\n# 超参数: 小批量大小 M=100, 采样数 L=1\n\n初始化参数 θ, φ\nwhile 未收敛:\n    X_M ← 从数据集随机采样 M 个样本\n    ε ← 从 N(0, I) 采样噪声\n\n    # 编码: 通过编码器获得隐变量分布参数\n    μ, log_σ² = encoder_φ(X_M)\n\n    # 重参数化: z = μ + σ ⊙ ε (使采样可微)\n    z = μ + exp(0.5 * log_σ²) * ε\n\n    # 解码: 重建数据\n    X_recon = decoder_θ(z)\n\n    # 计算 ELBO (损失函数)\n    recon_loss = -log p_θ(X_M | z)           # 重建损失\n    kl_loss = KL(q_φ(z|X_M) || p(z))         # KL 散度正则项\n    L = recon_loss + kl_loss\n\n    # 梯度更新\n    g = ∇_{θ,φ} L\n    θ, φ ← 用 SGD/Adam 更新参数\n\nreturn θ, φ\n</code></pre>\n<h5>动机与背景</h5>\n<p>在概率生成模型中，我们假设观测数据 <span class=\"kb-math kb-math-inline\">\\mathbf{x}</span> 由隐变量 <span class=\"kb-math kb-math-inline\">\\mathbf{z}</span> 生成：先从先验分布 <span class=\"kb-math kb-math-inline\">p_{\\boldsymbol{\\theta}}(\\mathbf{z})</span> 中采样隐变量，再通过条件分布 <span class=\"kb-math kb-math-inline\">p_{\\boldsymbol{\\theta}}(\\mathbf{x}|\\mathbf{z})</span> 生成观测数据。模型训练的目标是最大化边际对数似然：</p>\n<div class=\"kb-math kb-math-display\">\\log p_{\\boldsymbol{\\theta}}(\\mathbf{x}) = \\log \\int p_{\\boldsymbol{\\theta}}(\\mathbf{x}|\\mathbf{z}) p_{\\boldsymbol{\\theta}}(\\mathbf{z}) \\, d\\mathbf{z}</div>\n<p>然而这个积分通常是<strong>不可解的</strong>（intractable），因为它需要对所有可能的隐变量值进行积分。传统变分推断方法（如均场近似）需要手动推导解析期望，限制了模型的灵活性；MCMC 方法虽然通用但计算代价高昂，难以扩展到大规模数据集。VAE 的核心动机就是：<strong>如何在保持模型灵活性的同时，实现高效的、可扩展的变分推断？</strong></p>\n<h5>证据下界（ELBO）推导</h5>\n<p>VAE 的理论基础是变分推断。对于每个数据点 <span class=\"kb-math kb-math-inline\">\\mathbf{x}^{(i)}</span>，边际对数似然可以分解为：</p>\n<div class=\"kb-math kb-math-display\">\\log p_{\\boldsymbol{\\theta}}(\\mathbf{x}^{(i)}) = D_{KL}(q_{\\boldsymbol{\\phi}}(\\mathbf{z}|\\mathbf{x}^{(i)}) \\| p_{\\boldsymbol{\\theta}}(\\mathbf{z}|\\mathbf{x}^{(i)})) + \\mathcal{L}(\\boldsymbol{\\theta}, \\boldsymbol{\\phi}; \\mathbf{x}^{(i)})</div>\n<p>其中第一项是近似后验 <span class=\"kb-math kb-math-inline\">q_{\\boldsymbol{\\phi}}</span> 与真实后验之间的 KL 散度（非负），第二项即为<strong>证据下界（ELBO）</strong>：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}(\\boldsymbol{\\theta}, \\boldsymbol{\\phi}; \\mathbf{x}^{(i)}) = \\mathbb{E}_{q_{\\boldsymbol{\\phi}}(\\mathbf{z}|\\mathbf{x})}[\\log p_{\\boldsymbol{\\theta}}(\\mathbf{x}^{(i)}|\\mathbf{z})] - D_{KL}(q_{\\boldsymbol{\\phi}}(\\mathbf{z}|\\mathbf{x}^{(i)}) \\| p_{\\boldsymbol{\\theta}}(\\mathbf{z}))</div>\n<div class=\"key-point\">💡 <strong>关键直觉</strong>：ELBO 由两部分组成——第一项是<strong>重建项</strong>，鼓励解码器从隐变量准确重建输入数据；第二项是 <strong>KL 正则项</strong>，鼓励编码器输出的后验分布接近先验分布（通常为标准正态分布），从而使隐空间具有良好的结构。</div>\n<p>由于 KL 散度非负，ELBO 始终是边际对数似然的下界。最大化 ELBO 等价于同时：(1) 最大化似然（使模型更好地拟合数据）；(2) 最小化近似后验与真实后验的差距。</p>\n<h5>重参数化技巧（Reparameterization Trick）</h5>\n<p>ELBO 中的期望 <span class=\"kb-math kb-math-inline\">\\mathbb{E}_{q_{\\boldsymbol{\\phi}}(\\mathbf{z}|\\mathbf{x})}[\\cdot]</span> 需要从 <span class=\"kb-math kb-math-inline\">q_{\\boldsymbol{\\phi}}</span> 中采样来估计，但采样操作是<strong>不可微的</strong>，无法直接反向传播梯度到编码器参数 <span class=\"kb-math kb-math-inline\">\\boldsymbol{\\phi}</span>。这是 VAE 最核心的技术贡献——<strong>重参数化技巧</strong>：</p>\n<p>将随机变量 <span class=\"kb-math kb-math-inline\">\\mathbf{z} \\sim q_{\\boldsymbol{\\phi}}(\\mathbf{z}|\\mathbf{x})</span> 表示为确定性变换：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{z} = g_{\\boldsymbol{\\phi}}(\\boldsymbol{\\epsilon}, \\mathbf{x}), \\quad \\boldsymbol{\\epsilon} \\sim p(\\boldsymbol{\\epsilon})</div>\n<p>对于高斯情形（论文中最常用的设定），编码器输出均值 <span class=\"kb-math kb-math-inline\">\\boldsymbol{\\mu}</span> 和对数方差 <span class=\"kb-math kb-math-inline\">\\log \\boldsymbol{\\sigma}^2</span>，重参数化为：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{z} = \\boldsymbol{\\mu} + \\boldsymbol{\\sigma} \\odot \\boldsymbol{\\epsilon}, \\quad \\boldsymbol{\\epsilon} \\sim \\mathcal{N}(\\mathbf{0}, \\mathbf{I})</div>\n<div class=\"key-point\">💡 <strong>关键直觉</strong>：随机性被\"外包\"给了与参数无关的噪声变量 <span class=\"kb-math kb-math-inline\">\\boldsymbol{\\epsilon}</span>，而 <span class=\"kb-math kb-math-inline\">\\mathbf{z}</span> 关于 <span class=\"kb-math kb-math-inline\">\\boldsymbol{\\phi}</span> 的函数变成了确定性的、可微的。这样梯度就可以通过 <span class=\"kb-math kb-math-inline\">\\mathbf{z}</span> 流回编码器参数。</div>\n<p>这一技巧使得 ELBO 的蒙特卡洛估计变为：</p>\n<div class=\"kb-math kb-math-display\">\\widetilde{\\mathcal{L}}(\\boldsymbol{\\theta}, \\boldsymbol{\\phi}; \\mathbf{x}^{(i)}) = \\frac{1}{L}\\sum_{l=1}^{L} \\log p_{\\boldsymbol{\\theta}}(\\mathbf{x}^{(i)}|\\mathbf{z}^{(i,l)}) - D_{KL}(q_{\\boldsymbol{\\phi}}(\\mathbf{z}|\\mathbf{x}^{(i)}) \\| p_{\\boldsymbol{\\theta}}(\\mathbf{z}))</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\mathbf{z}^{(i,l)} = \\boldsymbol{\\mu}^{(i)} + \\boldsymbol{\\sigma}^{(i)} \\odot \\boldsymbol{\\epsilon}^{(l)}</span>，实验中 <span class=\"kb-math kb-math-inline\">L=1</span> 即可工作良好。</p>\n<h5>高斯情形下的解析 KL 散度</h5>\n<p>当先验为标准正态 <span class=\"kb-math kb-math-inline\">p(\\mathbf{z}) = \\mathcal{N}(\\mathbf{0}, \\mathbf{I})</span>，近似后验为对角高斯 <span class=\"kb-math kb-math-inline\">q_{\\boldsymbol{\\phi}}(\\mathbf{z}|\\mathbf{x}) = \\mathcal{N}(\\boldsymbol{\\mu}, \\text{diag}(\\boldsymbol{\\sigma}^2))</span> 时，KL 散度有解析解：</p>\n<div class=\"kb-math kb-math-display\">D_{KL}(q_{\\boldsymbol{\\phi}}(\\mathbf{z}|\\mathbf{x}) \\| p(\\mathbf{z})) = -\\frac{1}{2}\\sum_{j=1}^{J}(1 + \\log \\sigma_j^2 - \\mu_j^2 - \\sigma_j^2)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">J</span> 是隐变量维度。这避免了对 KL 项进行蒙特卡洛估计，降低了方差。</p>\n<h5>训练与推理流程</h5>\n<p><strong>训练流程</strong>：\n1. 从数据集采样小批量 <span class=\"kb-math kb-math-inline\">\\mathbf{X}^M</span>（<span class=\"kb-math kb-math-inline\">M=100</span>）\n2. 编码器前向传播：<span class=\"kb-math kb-math-inline\">\\mathbf{x} \\to (\\boldsymbol{\\mu}, \\log\\boldsymbol{\\sigma}^2)</span>\n3. 重参数化采样：<span class=\"kb-math kb-math-inline\">\\mathbf{z} = \\boldsymbol{\\mu} + \\boldsymbol{\\sigma} \\odot \\boldsymbol{\\epsilon}</span>\n4. 解码器前向传播：<span class=\"kb-math kb-math-inline\">\\mathbf{z} \\to \\hat{\\mathbf{x}}</span>\n5. 计算 ELBO 损失并反向传播更新 <span class=\"kb-math kb-math-inline\">\\boldsymbol{\\theta}, \\boldsymbol{\\phi}</span></p>\n<p><strong>生成（推理）流程</strong>：\n1. 从先验 <span class=\"kb-math kb-math-inline\">p(\\mathbf{z}) = \\mathcal{N}(\\mathbf{0}, \\mathbf{I})</span> 中采样 <span class=\"kb-math kb-math-inline\">\\mathbf{z}</span>\n2. 通过解码器 <span class=\"kb-math kb-math-inline\">p_{\\boldsymbol{\\theta}}(\\mathbf{x}|\\mathbf{z})</span> 生成新样本</p>\n<h5>与传统方法的区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>推断方式</th>\n<th>可扩展性</th>\n<th>灵活性</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><strong>均场变分推断</strong></td>\n<td>解析期望</td>\n<td>中等</td>\n<td>低（需共轭先验）</td>\n</tr>\n<tr>\n<td><strong>MCMC</strong></td>\n<td>马尔可夫链采样</td>\n<td>低（每个数据点需迭代）</td>\n<td>高</td>\n</tr>\n<tr>\n<td><strong>Wake-Sleep</strong></td>\n<td>双目标函数优化</td>\n<td>中等</td>\n<td>中等</td>\n</tr>\n<tr>\n<td><strong>VAE (AEVB)</strong></td>\n<td>摊销推断 + 重参数化</td>\n<td><strong>高</strong>（SGD + 小批量）</td>\n<td><strong>高</strong>（任意可微模型）</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：VAE 的一个已知问题是\"后验坍缩\"（posterior collapse）——当解码器过于强大时，模型可能忽略隐变量，使 <span class=\"kb-math kb-math-inline\">q_{\\boldsymbol{\\phi}}(\\mathbf{z}|\\mathbf{x})</span> 退化为先验。这在后续工作（如 β-VAE、VQ-VAE）中得到了广泛研究。</div>\n<p><img alt=\"不同隐空间维度下的 MNIST 生成样本\" src=\"https://ar5iv.labs.arxiv.org/html/1312.6114/assets/x5.png\" />\n<em>图：2 维隐空间下 VAE 生成的 MNIST 样本，展示了隐空间的连续性和可解释性。</em></p>",
      "quiz": {
        "q": "VAE 中重参数化技巧的核心作用是什么？",
        "options": [
          "降低模型参数量，加速训练",
          "将采样操作转化为确定性可微变换，使梯度可以反向传播到编码器",
          "使先验分布更接近真实数据分布",
          "消除 ELBO 中的 KL 散度项"
        ],
        "answer": 1,
        "explain": "重参数化技巧将 z = μ + σ⊙ε 中的随机性转移到与参数无关的噪声 ε 上，使 z 关于编码器参数 φ 的梯度可以正常计算和反向传播。"
      }
    },
    {
      "id": "resnet",
      "num": 7,
      "name": "ResNet",
      "fullName": "残差网络 (Deep Residual Network)",
      "year": "2016",
      "org": "Microsoft Research",
      "parent": "alexnet",
      "paperUrl": "https://arxiv.org/abs/1512.03385",
      "projectUrl": "",
      "category": "deep_rep",
      "motivation": "残差连接解决深层网络退化",
      "summary": "ResNet 提出了残差学习框架（Residual Learning），通过引入跳跃连接（shortcut connections）让网络层学习残差映射而非直接映射，从根本上解决了深层网络的退化（degradation）问题，使得训练上百甚至上千层的网络成为可能，并在 ImageNet 2015 分类、检测、定位任务中均获得第一名。",
      "keyPoints": [
        "<strong>退化问题发现</strong>：实验证明更深的普通网络（plain network）反而产生更高的训练误差，这不是过拟合而是优化困难",
        "<strong>残差学习公式</strong>：令网络层拟合残差 <span class=\"kb-math kb-math-inline\">F(x) = H(x) - x</span>，而非直接拟合目标映射 <span class=\"kb-math kb-math-inline\">H(x)</span>，输出为 <span class=\"kb-math kb-math-inline\">y = F(x) + x</span>",
        "<strong>跳跃连接（Shortcut Connections）</strong>：恒等映射捷径不增加额外参数和计算量，可端到端训练",
        "<strong>两种残差块设计</strong>：基础块（两层 3×3 卷积，用于 ResNet-18/34）和瓶颈块（1×1 + 3×3 + 1×1 卷积，用于 ResNet-50/101/152）",
        "<strong>投影捷径（Projection Shortcut）</strong>：当输入输出维度不匹配时，使用 1×1 卷积进行维度对齐",
        "<strong>极深网络验证</strong>：成功训练了 152 层的 ResNet（比 VGG 深 8 倍），甚至在 CIFAR-10 上探索了 1202 层网络",
        "<strong>广泛的任务迁移能力</strong>：在 ImageNet 检测、COCO 检测与分割任务上均取得显著提升"
      ],
      "detail": "<h5>退化问题与动机</h5>\n<p><img alt=\"退化问题示意图\" src=\"https://ar5iv.labs.arxiv.org/html/1512.03385/assets/x1.png\" />\n<em>图 1：CIFAR-10 上 20 层与 56 层普通网络的训练/测试误差对比。更深的 56 层网络在训练集和测试集上误差均更高，说明这不是过拟合问题。</em></p>\n<p>在 ResNet 之前，深度学习社区普遍认为\"网络越深，性能越好\"。然而，作者通过实验发现了一个违反直觉的现象——<strong>退化问题（degradation problem）</strong>：当网络深度增加到一定程度后，训练误差反而上升。这与过拟合不同（过拟合是训练误差低但测试误差高），退化问题表现为训练误差本身就变高了。</p>\n<div class=\"key-point\">💡 关键直觉：如果深层网络的额外层能学到恒等映射，那么深层网络至少不应比浅层网络差。退化问题说明，让优化器学习恒等映射并非易事。</div>\n<p>这一观察启发了残差学习的核心思想：与其让网络层直接学习目标映射，不如让它们学习\"与恒等映射的偏差\"——即残差。</p>\n<h5>残差学习框架</h5>\n<p><img alt=\"残差学习构建块\" src=\"https://ar5iv.labs.arxiv.org/html/1512.03385/assets/x2.png\" />\n<em>图 2：残差学习的基本构建块。输入 x 通过跳跃连接直接加到卷积层输出上。</em></p>\n<p>设期望学习的底层映射为 <span class=\"kb-math kb-math-inline\">H(x)</span>，残差学习框架不直接拟合 <span class=\"kb-math kb-math-inline\">H(x)</span>，而是让堆叠的非线性层拟合残差映射：</p>\n<div class=\"kb-math kb-math-display\">F(x) := H(x) - x</div>\n<p>则原始映射变为：</p>\n<div class=\"kb-math kb-math-display\">H(x) = F(x) + x</div>\n<p>这一重新表述基于一个关键假设：<strong>学习残差映射比学习原始映射更容易</strong>。极端情况下，如果恒等映射是最优的，那么将残差推向零比通过非线性层拟合恒等映射要容易得多。</p>\n<p>具体实现中，跳跃连接执行恒等映射，其输出与堆叠层的输出逐元素相加：</p>\n<div class=\"kb-math kb-math-display\">y = F(x, \\{W_i\\}) + x</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">F(x, \\{W_i\\})</span> 表示需要学习的残差映射。对于两层的情况：</p>\n<div class=\"kb-math kb-math-display\">F = W_2 \\sigma(W_1 x)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\sigma</span> 表示 ReLU 激活函数。加法之后再应用激活函数：<span class=\"kb-math kb-math-inline\">\\sigma(y)</span>。</p>\n<div class=\"warn-box\">⚠️ 注意：跳跃连接（shortcut connection）执行的是恒等映射，不引入额外参数，也不增加计算复杂度。这是 ResNet 设计的关键优势之一。</div>\n<h5>网络架构设计</h5>\n<p><img alt=\"架构对比图\" src=\"https://ar5iv.labs.arxiv.org/html/1512.03385/assets/x3.png\" />\n<em>图 3：网络架构对比。左：VGG-19（19.6B FLOPs）；中：34 层普通网络（3.6B FLOPs）；右：34 层残差网络（3.6B FLOPs）。残差网络通过虚线表示的跳跃连接将层与层相连。</em></p>\n<p>ResNet 的架构设计遵循两条核心规则：\n1. <strong>等特征图尺寸的层具有相同数量的滤波器</strong>\n2. <strong>特征图尺寸减半时，滤波器数量翻倍</strong>，以保持每层的时间复杂度一致</p>\n<p>下采样通过步长为 2 的卷积直接实现。网络以全局平均池化层和 1000 路全连接 + softmax 结束。</p>\n<p><strong>维度匹配策略</strong>：当输入输出维度不同时（如下采样阶段），有两种处理方式：\n- <strong>方案 A（零填充）</strong>：对增加的维度用零填充，不引入额外参数\n- <strong>方案 B（投影捷径）</strong>：使用 1×1 卷积进行线性投影 <span class=\"kb-math kb-math-inline\">y = F(x, \\{W_i\\}) + W_s x</span></p>\n<p>实验表明，投影捷径略优于零填充，但两者差距很小，说明投影捷径对于解决退化问题并非必要。</p>\n<h5>瓶颈架构（Bottleneck Design）</h5>\n<p><img alt=\"瓶颈架构\" src=\"https://ar5iv.labs.arxiv.org/html/1512.03385/assets/x5.png\" />\n<em>图 5：左：ResNet-34 的基础残差块（两层 3×3）；右：ResNet-50/101/152 的瓶颈残差块（1×1 + 3×3 + 1×1）。</em></p>\n<p>对于更深的网络（50 层以上），直接使用两层 3×3 卷积的计算开销过大。ResNet 引入了<strong>瓶颈设计（bottleneck design）</strong>：</p>\n<pre><code>输入 (256-d)\n  │\n  ├─ 1×1 conv, 64 filters  (降维)\n  │\n  ├─ 3×3 conv, 64 filters  (卷积)\n  │\n  ├─ 1×1 conv, 256 filters (升维)\n  │\n  + ← shortcut connection (恒等映射)\n  │\n输出 (256-d)\n</code></pre>\n<p>三层瓶颈块的设计逻辑：\n- <strong>第一个 1×1 卷积</strong>：将输入通道从 256 降至 64，减少计算量\n- <strong>中间 3×3 卷积</strong>：在低维空间执行空间卷积\n- <strong>最后 1×1 卷积</strong>：将通道恢复至 256，与输入维度匹配</p>\n<div class=\"key-point\">💡 关键：瓶颈设计使得 50 层 ResNet 的计算量与 34 层 VGG 风格网络相当，但性能显著更优。恒等捷径在瓶颈架构中尤为重要——如果替换为投影捷径，参数量和计算量会翻倍。</div>\n<h5>训练细节</h5>\n<pre><code class=\"language-python\"># ResNet 训练伪代码\n# 数据预处理\nimage = random_crop(image, 224)           # 从 [256, 480] 随机缩放后裁剪 224×224\nimage = random_horizontal_flip(image)\nimage = per_pixel_mean_subtraction(image)\nimage = color_augmentation(image)         # AlexNet 风格的颜色增强\n\n# 网络配置\nmodel = ResNet(layers=152)                # 可选 18/34/50/101/152 层\noptimizer = SGD(lr=0.1, momentum=0.9, weight_decay=1e-4)\nbatch_size = 256\n\n# 训练循环\nfor epoch in range(max_epochs):\n    if epoch in lr_schedule:              # 误差停滞时学习率除以 10\n        lr = lr / 10\n    for batch in dataloader:\n        output = model(batch.images)      # 前向传播\n        loss = cross_entropy(output, batch.labels)\n        loss.backward()                   # 反向传播\n        optimizer.step()\n\n# 测试时：10-crop 测试 + 多尺度平均\n# 多尺度：{224, 256, 384, 480, 640} 的全卷积评估\n</code></pre>\n<p>关键训练设置：\n- <strong>Batch Normalization</strong>：在每个卷积层之后、激活函数之前使用\n- <strong>权重初始化</strong>：采用 He 初始化（专为 ReLU 设计）\n- <strong>学习率调度</strong>：初始 0.1，在误差停滞时除以 10，训练最多 60×10⁴ 次迭代\n- <strong>无 Dropout</strong>：残差网络不使用 Dropout</p>\n<h5>实验结果与分析</h5>\n<p><img alt=\"ImageNet 训练曲线\" src=\"https://ar5iv.labs.arxiv.org/html/1512.03385/assets/x4.png\" />\n<em>图 4：ImageNet 上的训练曲线。左：普通网络（18 层 vs 34 层），更深的普通网络训练误差更高。右：残差网络（18 层 vs 34 层），更深的残差网络训练误差更低，成功解决退化问题。</em></p>\n<p><strong>ImageNet 分类核心结果</strong>：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>模型</th>\n<th>层数</th>\n<th>Top-1 错误率</th>\n<th>Top-5 错误率</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>VGG-16</td>\n<td>16</td>\n<td>28.07%</td>\n<td>9.33%</td>\n</tr>\n<tr>\n<td>ResNet-34</td>\n<td>34</td>\n<td>24.19%</td>\n<td>7.40%</td>\n</tr>\n<tr>\n<td>ResNet-50</td>\n<td>50</td>\n<td>22.85%</td>\n<td>6.71%</td>\n</tr>\n<tr>\n<td>ResNet-101</td>\n<td>101</td>\n<td>21.75%</td>\n<td>6.05%</td>\n</tr>\n<tr>\n<td>ResNet-152</td>\n<td>152</td>\n<td>21.43%</td>\n<td>5.71%</td>\n</tr>\n<tr>\n<td>ResNet 集成</td>\n<td>—</td>\n<td>—</td>\n<td><strong>3.57%</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p>关键发现：\n1. <strong>退化问题被解决</strong>：34 层 ResNet 优于 18 层 ResNet，而 34 层普通网络劣于 18 层普通网络\n2. <strong>深度收益显著</strong>：ResNet-152 的 top-5 错误率（5.71%）远低于 VGG-16（9.33%）\n3. <strong>集成模型</strong>：6 个不同深度的 ResNet 集成达到 3.57% top-5 错误率，赢得 ILSVRC 2015 分类第一名\n4. <strong>泛化能力强</strong>：ResNet 在 COCO 检测（+6% mAP）和分割任务上也取得了显著提升</p>\n<h5>与传统方法的核心区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>对比维度</th>\n<th>VGG / 普通深层网络</th>\n<th>ResNet</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>深度极限</td>\n<td>~20 层后退化</td>\n<td>成功训练 152+ 层</td>\n</tr>\n<tr>\n<td>层间信息流</td>\n<td>逐层变换，梯度易衰减</td>\n<td>跳跃连接保证梯度直通</td>\n</tr>\n<tr>\n<td>额外参数</td>\n<td>—</td>\n<td>恒等捷径零额外参数</td>\n</tr>\n<tr>\n<td>优化难度</td>\n<td>深层网络难以收敛</td>\n<td>残差映射更易优化</td>\n</tr>\n<tr>\n<td>计算效率</td>\n<td>VGG-19: 19.6B FLOPs</td>\n<td>ResNet-152: 11.3B FLOPs，更深但更快</td>\n</tr>\n</tbody>\n</table></div>\n<p>ResNet 的核心贡献不仅在于一个具体的网络结构，更在于提出了<strong>残差学习</strong>这一通用范式——通过跳跃连接让信息和梯度能够在极深网络中无阻碍地流动，这一思想深刻影响了后续的 DenseNet、Transformer（残差连接）、U-Net 等众多架构设计。</p>",
      "quiz": {
        "q": "ResNet 中跳跃连接（shortcut connection）的主要作用是什么？",
        "options": [
          "增加网络的非线性表达能力",
          "让网络层学习残差映射，使恒等映射成为容易学习的默认行为",
          "减少网络的参数量以防止过拟合",
          "替代池化层实现特征图下采样"
        ],
        "answer": 1,
        "explain": "跳跃连接将输入直接加到输出上，使得网络层只需学习残差 F(x)=H(x)-x。当最优映射接近恒等时，将残差推向零比直接学习恒等映射容易得多，从而解决了深层网络的退化问题。"
      }
    },
    {
      "id": "transformer",
      "num": 8,
      "name": "Transformer",
      "fullName": "Transformer",
      "year": "2017",
      "org": "Google Brain",
      "parent": "lstm",
      "paperUrl": "https://arxiv.org/abs/1706.03762",
      "projectUrl": "",
      "category": "deep_rep",
      "motivation": "自注意力机制并行化表示",
      "summary": "Transformer 提出了完全基于注意力机制（Self-Attention）的 Encoder-Decoder 架构，彻底摒弃循环和卷积结构，通过多头注意力机制和位置编码实现序列建模，在机器翻译任务上取得 SOTA 结果的同时大幅提升了训练并行性，成为现代大语言模型（GPT、BERT 等）的基础架构。",
      "keyPoints": [
        "<strong>纯注意力架构</strong>：完全抛弃 RNN/CNN，仅依赖注意力机制进行序列转换，解决了 RNN 无法并行训练的根本瓶颈",
        "<strong>Scaled Dot-Product Attention</strong>：通过 <span class=\"kb-math kb-math-inline\">\\frac{QK^T}{\\sqrt{d_k}}</span> 缩放点积防止梯度消失，是整个模型的基本计算单元",
        "<strong>Multi-Head Attention</strong>：将注意力拆分为 <span class=\"kb-math kb-math-inline\">h=8</span> 个并行头（<span class=\"kb-math kb-math-inline\">d_k=d_v=64</span>），让模型同时关注不同子空间的信息",
        "<strong>三种注意力用法</strong>：Encoder 自注意力、Decoder 掩码自注意力（防止看到未来信息）、Encoder-Decoder 交叉注意力",
        "<strong>Position-wise FFN</strong>：每个位置独立的两层全连接网络（<span class=\"kb-math kb-math-inline\">d_{ff}=2048</span>），提供非线性变换能力",
        "<strong>正弦/余弦位置编码</strong>：用不同频率的三角函数注入位置信息，使模型能泛化到训练中未见过的序列长度",
        "<strong>残差连接 + Layer Normalization</strong>：每个子层输出为 <span class=\"kb-math kb-math-inline\">\\text{LayerNorm}(x + \\text{Sublayer}(x))</span>，稳定深层网络训练",
        "<strong>权重共享</strong>：两个 Embedding 层和 pre-softmax 线性变换共享权重矩阵，减少参数量",
        "<strong>训练效率</strong>：在 WMT 2014 英德/英法翻译上达到 SOTA，训练成本仅为此前最优模型的一小部分（8 GPU 训练 3.5 天）"
      ],
      "detail": "<h5>模型总体架构</h5>\n<p><img alt=\"Transformer 模型架构图\" src=\"https://ar5iv.labs.arxiv.org/html/1706.03762/assets/Figures/ModalNet-21.png\" />\n<em>图 1：Transformer 模型架构。左侧为 Encoder（N=6 层），右侧为 Decoder（N=6 层）。每层包含多头注意力和前馈网络子层，均配有残差连接和层归一化。</em></p>\n<p>Transformer 采用经典的 <strong>Encoder-Decoder</strong> 结构，但完全用注意力机制替代了传统的循环/卷积操作：</p>\n<ul>\n<li><strong>Encoder</strong>：由 <span class=\"kb-math kb-math-inline\">N=6</span> 个相同的层堆叠而成。每层包含两个子层：(1) Multi-Head Self-Attention；(2) Position-wise Feed-Forward Network。每个子层都使用残差连接和层归一化。</li>\n<li><strong>Decoder</strong>：同样由 <span class=\"kb-math kb-math-inline\">N=6</span> 个相同的层堆叠。每层包含三个子层：(1) Masked Multi-Head Self-Attention（防止关注未来位置）；(2) Multi-Head Encoder-Decoder Attention（Query 来自 Decoder，Key/Value 来自 Encoder 输出）；(3) Position-wise Feed-Forward Network。</li>\n</ul>\n<p>模型的所有子层以及 Embedding 层的输出维度均为 <span class=\"kb-math kb-math-inline\">d_{\\text{model}} = 512</span>。</p>\n<h5>核心机制：Scaled Dot-Product Attention</h5>\n<p><img alt=\"Scaled Dot-Product Attention 与 Multi-Head Attention\" src=\"https://ar5iv.labs.arxiv.org/html/1706.03762/assets/Figures/ModalNet-19.png\" />\n<em>图 2：（左）Scaled Dot-Product Attention；（右）Multi-Head Attention 由多个并行的注意力头组成。</em></p>\n<p><strong>动机与背景</strong>：传统序列模型（RNN、LSTM）按时间步顺序处理输入，导致无法并行计算，且长距离依赖信息需要经过多步传递才能到达。注意力机制允许任意两个位置之间直接建立联系，将路径长度缩短为 <span class=\"kb-math kb-math-inline\">O(1)</span>。</p>\n<p><strong>注意力计算公式</strong>：</p>\n<div class=\"kb-math kb-math-display\">\\text{Attention}(Q, K, V) = \\text{softmax}\\left(\\frac{QK^T}{\\sqrt{d_k}}\\right)V</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">Q \\in \\mathbb{R}^{n \\times d_k}</span> 为查询矩阵，<span class=\"kb-math kb-math-inline\">K \\in \\mathbb{R}^{m \\times d_k}</span> 为键矩阵，<span class=\"kb-math kb-math-inline\">V \\in \\mathbb{R}^{m \\times d_v}</span> 为值矩阵。</p>\n<div class=\"key-point\">💡 <strong>关键直觉</strong>：注意力机制本质上是一种\"软寻址\"——用 Query 去查询所有 Key 的相似度，得到权重后对 Value 做加权求和。缩放因子 <span class=\"kb-math kb-math-inline\">\\sqrt{d_k}</span> 的作用是：当 <span class=\"kb-math kb-math-inline\">d_k</span> 较大时，点积的量级会增大，导致 softmax 进入梯度极小的饱和区，除以 <span class=\"kb-math kb-math-inline\">\\sqrt{d_k}</span> 可以将方差控制在合理范围内。</p>\n<p>⚠️ <strong>注意</strong>：Decoder 的自注意力中使用了 <strong>Mask</strong>（将未来位置设为 <span class=\"kb-math kb-math-inline\">-\\infty</span>），确保位置 <span class=\"kb-math kb-math-inline\">i</span> 的预测只能依赖于位置 <span class=\"kb-math kb-math-inline\">&lt; i</span> 的已知输出，保持自回归特性。</div>\n<h5>核心机制：Multi-Head Attention</h5>\n<p><img alt=\"Multi-Head Attention 结构\" src=\"https://ar5iv.labs.arxiv.org/html/1706.03762/assets/Figures/ModalNet-20.png\" />\n<em>图 3：Multi-Head Attention 将输入分别线性投影到多个子空间，并行计算注意力后拼接。</em></p>\n<p>与其使用单一的 <span class=\"kb-math kb-math-inline\">d_{\\text{model}}</span> 维注意力，Multi-Head Attention 将 Q、K、V 分别通过 <span class=\"kb-math kb-math-inline\">h</span> 组不同的线性投影映射到低维空间，并行计算注意力后拼接：</p>\n<div class=\"kb-math kb-math-display\">\\text{MultiHead}(Q, K, V) = \\text{Concat}(\\text{head}_1, \\dots, \\text{head}_h) W^O</div>\n<div class=\"kb-math kb-math-display\">\\text{where } \\text{head}_i = \\text{Attention}(QW_i^Q, KW_i^K, VW_i^V)</div>\n<p>参数维度：<span class=\"kb-math kb-math-inline\">W_i^Q \\in \\mathbb{R}^{d_{\\text{model}} \\times d_k}</span>，<span class=\"kb-math kb-math-inline\">W_i^K \\in \\mathbb{R}^{d_{\\text{model}} \\times d_k}</span>，<span class=\"kb-math kb-math-inline\">W_i^V \\in \\mathbb{R}^{d_{\\text{model}} \\times d_v}</span>，<span class=\"kb-math kb-math-inline\">W^O \\in \\mathbb{R}^{hd_v \\times d_{\\text{model}}}</span>。</p>\n<p>论文使用 <span class=\"kb-math kb-math-inline\">h=8</span> 个头，<span class=\"kb-math kb-math-inline\">d_k = d_v = d_{\\text{model}}/h = 64</span>。由于每个头的维度降低，总计算量与单头全维度注意力相当。</p>\n<div class=\"key-point\">💡 <strong>关键直觉</strong>：不同的注意力头可以学习关注不同类型的关系——例如某些头关注局部语法结构，某些头关注长距离语义依赖。这比单一注意力函数的表达能力更强。</div>\n<p><strong>三种注意力的使用方式</strong>：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>使用位置</th>\n<th>Query 来源</th>\n<th>Key/Value 来源</th>\n<th>是否 Mask</th>\n<th>作用</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Encoder Self-Attention</td>\n<td>Encoder 当前层输入</td>\n<td>Encoder 当前层输入</td>\n<td>否</td>\n<td>编码输入序列的全局上下文</td>\n</tr>\n<tr>\n<td>Decoder Masked Self-Attention</td>\n<td>Decoder 当前层输入</td>\n<td>Decoder 当前层输入</td>\n<td>是（遮蔽未来）</td>\n<td>自回归地编码已生成序列</td>\n</tr>\n<tr>\n<td>Encoder-Decoder Attention</td>\n<td>Decoder 当前层</td>\n<td>Encoder 最终输出</td>\n<td>否</td>\n<td>让 Decoder 关注输入序列信息</td>\n</tr>\n</tbody>\n</table></div>\n<h5>Position-wise Feed-Forward Network</h5>\n<p>每个注意力子层之后都跟一个逐位置的前馈网络，对每个位置独立且相同地应用：</p>\n<div class=\"kb-math kb-math-display\">\\text{FFN}(x) = \\max(0, xW_1 + b_1)W_2 + b_2</div>\n<p>内层维度 <span class=\"kb-math kb-math-inline\">d_{ff} = 2048</span>，输入输出维度 <span class=\"kb-math kb-math-inline\">d_{\\text{model}} = 512</span>。这等价于两个 kernel size 为 1 的卷积。不同层之间的 FFN 参数不共享。</p>\n<div class=\"key-point\">💡 <strong>关键直觉</strong>：注意力层负责\"信息聚合\"（从不同位置收集信息），FFN 负责\"信息变换\"（对每个位置的表示进行非线性映射）。两者互补，缺一不可。</div>\n<h5>位置编码（Positional Encoding）</h5>\n<p>由于 Transformer 没有循环或卷积结构，模型本身无法感知序列中 token 的顺序。因此需要在输入 Embedding 上加入位置编码：</p>\n<div class=\"kb-math kb-math-display\">PE_{(pos, 2i)} = \\sin\\left(\\frac{pos}{10000^{2i/d_{\\text{model}}}}\\right)</div>\n<div class=\"kb-math kb-math-display\">PE_{(pos, 2i+1)} = \\cos\\left(\\frac{pos}{10000^{2i/d_{\\text{model}}}}\\right)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">pos</span> 是位置索引，<span class=\"kb-math kb-math-inline\">i</span> 是维度索引。</p>\n<div class=\"key-point\">💡 <strong>关键直觉</strong>：选择正弦/余弦函数有两个优势：(1) 对于任意固定偏移 <span class=\"kb-math kb-math-inline\">k</span>，<span class=\"kb-math kb-math-inline\">PE_{pos+k}</span> 可以表示为 <span class=\"kb-math kb-math-inline\">PE_{pos}</span> 的线性函数，使模型能学习相对位置关系；(2) 不同频率的三角函数覆盖不同尺度的位置信息，类似于二进制编码的不同位。</div>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># Transformer 前向传播伪代码\ndef transformer_forward(src_tokens, tgt_tokens):\n    # 1. Embedding + Positional Encoding\n    src_embed = Embedding(src_tokens) * sqrt(d_model) + PositionalEncoding(src_tokens)\n    tgt_embed = Embedding(tgt_tokens) * sqrt(d_model) + PositionalEncoding(tgt_tokens)\n\n    # 2. Encoder: N=6 层\n    enc_out = src_embed\n    for layer in encoder_layers:  # 6 layers\n        # Self-Attention + Residual + LayerNorm\n        attn_out = MultiHeadAttention(Q=enc_out, K=enc_out, V=enc_out)\n        enc_out = LayerNorm(enc_out + Dropout(attn_out))\n        # FFN + Residual + LayerNorm\n        ffn_out = FFN(enc_out)  # max(0, x·W1+b1)·W2+b2\n        enc_out = LayerNorm(enc_out + Dropout(ffn_out))\n\n    # 3. Decoder: N=6 层\n    dec_out = tgt_embed\n    for layer in decoder_layers:  # 6 layers\n        # Masked Self-Attention (防止看到未来 token)\n        masked_attn = MultiHeadAttention(Q=dec_out, K=dec_out, V=dec_out, mask=causal_mask)\n        dec_out = LayerNorm(dec_out + Dropout(masked_attn))\n        # Encoder-Decoder Attention\n        cross_attn = MultiHeadAttention(Q=dec_out, K=enc_out, V=enc_out)\n        dec_out = LayerNorm(dec_out + Dropout(cross_attn))\n        # FFN\n        ffn_out = FFN(dec_out)\n        dec_out = LayerNorm(dec_out + Dropout(ffn_out))\n\n    # 4. 输出层 (与 Embedding 共享权重)\n    logits = dec_out @ Embedding.weight.T  # 共享权重\n    return softmax(logits)\n</code></pre>\n<h5>训练细节与关键设计</h5>\n<p><strong>优化器</strong>：使用 Adam 优化器（<span class=\"kb-math kb-math-inline\">\\beta_1=0.9, \\beta_2=0.98, \\epsilon=10^{-9}</span>），配合 Warmup 学习率调度：</p>\n<div class=\"kb-math kb-math-display\">lr = d_{\\text{model}}^{-0.5} \\cdot \\min(step^{-0.5},\\ step \\cdot warmup\\_steps^{-1.5})</div>\n<p>前 <span class=\"kb-math kb-math-inline\">warmup\\_steps = 4000</span> 步线性增长学习率，之后按步数的平方根倒数衰减。</p>\n<p><strong>正则化</strong>：\n- <strong>Residual Dropout</strong>：对每个子层的输出（加入残差之前）以及 Embedding + PE 的求和结果应用 Dropout（<span class=\"kb-math kb-math-inline\">P_{drop}=0.1</span>）\n- <strong>Label Smoothing</strong>：使用 <span class=\"kb-math kb-math-inline\">\\epsilon_{ls}=0.1</span> 的标签平滑，虽然会降低困惑度（perplexity），但提升了 BLEU 分数和准确率</p>\n<p><strong>实验结果</strong>：\n- WMT 2014 英德翻译：<strong>28.4 BLEU</strong>（超越此前所有单模型和集成模型）\n- WMT 2014 英法翻译：<strong>41.0 BLEU</strong>（单模型 SOTA，训练成本仅为此前最优的 1/4）\n- 训练仅需 8 个 P100 GPU 训练 3.5 天（base 模型）或 12 天（big 模型）</p>\n<h5>与传统方法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>RNN/LSTM</th>\n<th>CNN (ConvS2S)</th>\n<th>Transformer</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>序列操作复杂度</td>\n<td><span class=\"kb-math kb-math-inline\">O(n)</span> 顺序</td>\n<td><span class=\"kb-math kb-math-inline\">O(n/k)</span> 层数</td>\n<td><span class=\"kb-math kb-math-inline\">O(1)</span> 常数</td>\n</tr>\n<tr>\n<td>每层计算复杂度</td>\n<td><span class=\"kb-math kb-math-inline\">O(n \\cdot d^2)</span></td>\n<td><span class=\"kb-math kb-math-inline\">O(k \\cdot n \\cdot d^2)</span></td>\n<td><span class=\"kb-math kb-math-inline\">O(n^2 \\cdot d)</span></td>\n</tr>\n<tr>\n<td>最大路径长度</td>\n<td><span class=\"kb-math kb-math-inline\">O(n)</span></td>\n<td><span class=\"kb-math kb-math-inline\">O(\\log_k(n))</span></td>\n<td><span class=\"kb-math kb-math-inline\">O(1)</span></td>\n</tr>\n<tr>\n<td>并行化能力</td>\n<td>低（顺序依赖）</td>\n<td>中等</td>\n<td><strong>高（完全并行）</strong></td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 <strong>关键优势</strong>：Self-Attention 的最大路径长度为 <span class=\"kb-math kb-math-inline\">O(1)</span>，意味着任意两个位置之间可以直接交互，极大地缓解了长距离依赖问题。代价是 <span class=\"kb-math kb-math-inline\">O(n^2)</span> 的计算复杂度，但对于常见的序列长度（几百到几千），这远优于 RNN 的顺序瓶颈。</div>",
      "quiz": {
        "q": "Transformer 中 Scaled Dot-Product Attention 除以 √dk 的主要原因是什么？",
        "options": [
          "减少模型参数量，提升计算效率",
          "防止点积值过大导致 softmax 梯度消失",
          "使注意力权重服从标准正态分布",
          "确保 Query 和 Key 的维度匹配"
        ],
        "answer": 1,
        "explain": "当 dk 较大时，点积的方差为 dk，值会很大，使 softmax 输出接近 one-hot，梯度趋近于零。除以 √dk 将方差归一化为 1，避免梯度消失问题。"
      }
    },
    {
      "id": "gat",
      "num": 9,
      "name": "GAT",
      "fullName": "图注意力网络 (Graph Attention Network)",
      "year": "2018",
      "org": "DeepMind",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/1710.10903",
      "projectUrl": "",
      "category": "graph_rep",
      "motivation": "注意力机制引入图神经网络",
      "summary": "GAT 提出了基于 masked self-attention 的图神经网络层，通过为每个节点的邻居学习不同的注意力权重来自适应聚合信息，无需预知全局图结构，同时支持归纳学习（inductive learning），在多个图节点分类基准上取得了当时的最优结果。",
      "keyPoints": [
        "<strong>Masked Self-Attention 机制</strong>：仅对图中直接相连的邻居节点计算注意力系数，避免了全图信息的需求",
        "<strong>共享注意力机制 <span class=\"kb-math kb-math-inline\">a</span></strong>：使用单层前馈网络 + LeakyReLU 计算节点对之间的注意力分数",
        "<strong>多头注意力（Multi-Head Attention）</strong>：中间层使用 <span class=\"kb-math kb-math-inline\">K</span> 个独立注意力头并拼接（concat），最终层使用平均（averaging）",
        "<strong>计算效率</strong>：单头注意力层的时间复杂度为 <span class=\"kb-math kb-math-inline\">O(|V|FF&#x27; + |E|F&#x27;)</span>，与 GCN 同级别",
        "<strong>归纳学习能力</strong>：不依赖全局图结构（如拉普拉斯特征分解），可直接应用于未见过的图",
        "<strong>支持有向图</strong>：注意力系数 <span class=\"kb-math kb-math-inline\">\\alpha_{ij} \\neq \\alpha_{ji}</span>，天然适配有向图和异构邻居关系",
        "<strong>实验基准</strong>：在 Cora（83.0%）、Citeseer（72.5%）、Pubmed（79.0%）转导任务和 PPI（97.3% F1）归纳任务上达到 SOTA"
      ],
      "detail": "<h5>核心示意图</h5>\n<p>GAT 的核心架构如下图所示。左侧展示了单个注意力头的计算过程：对中心节点 <span class=\"kb-math kb-math-inline\">\\vec{h}_i</span> 的每个邻居 <span class=\"kb-math kb-math-inline\">\\vec{h}_j</span>，先通过共享线性变换 <span class=\"kb-math kb-math-inline\">\\mathbf{W}</span> 映射到高维空间，再通过注意力机制 <span class=\"kb-math kb-math-inline\">a</span> 计算注意力系数 <span class=\"kb-math kb-math-inline\">\\alpha_{ij}</span>；右侧展示了多头注意力的拼接方式，<span class=\"kb-math kb-math-inline\">K=3</span> 个独立注意力头的输出被拼接或平均。</p>\n<p><img alt=\"GAT t-SNE 特征可视化\" src=\"https://ar5iv.labs.arxiv.org/html/1710.10903/assets/t-sne.png\" />\n<em>图：预训练 GAT 模型第一隐藏层输出的 t-SNE 可视化（Cora 数据集），颜色代表节点的 7 个类别，可见注意力机制学到了良好的类别可分特征表示。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># GAT 单层前向传播伪代码\ndef gat_layer(h, W, a, adj, K, concat=True):\n    &quot;&quot;&quot;\n    h: 输入节点特征 [N, F]\n    W: 共享线性变换权重 [F, F']\n    a: 注意力向量 [2F', 1]\n    adj: 邻接关系 (邻居集合)\n    K: 注意力头数\n    &quot;&quot;&quot;\n    heads = []\n    for k in range(K):\n        # Step 1: 线性变换\n        h_prime = h @ W[k]                    # [N, F']\n\n        # Step 2: 计算注意力系数\n        for i in range(N):\n            for j in adj[i]:                  # 仅邻居节点 (masked)\n                e_ij = LeakyReLU(a[k].T @ concat(h_prime[i], h_prime[j]))\n            alpha_i = softmax(e_ij for j in adj[i])  # 归一化\n\n        # Step 3: 加权聚合\n        for i in range(N):\n            h_out[i] = sigma(sum(alpha_ij * h_prime[j] for j in adj[i]))\n\n        heads.append(h_out)\n\n    # Step 4: 多头合并\n    if concat:\n        return concatenate(heads)             # 中间层: [N, K*F']\n    else:\n        return mean(heads)                    # 最终层: [N, F']\n</code></pre>\n<h5>方法细节解释</h5>\n<p><strong>动机与背景</strong></p>\n<p>图结构数据（社交网络、引文网络、生物网络等）广泛存在，但传统卷积无法直接应用于非欧几里得域。此前的图神经网络方法主要分为两类：</p>\n<ol>\n<li><strong>谱方法（Spectral approaches）</strong>：如 GCN (Kipf &amp; Welling, 2017)，依赖图拉普拉斯矩阵的特征分解，计算开销大且无法泛化到新图结构</li>\n<li><strong>非谱方法（Non-spectral approaches）</strong>：如 GraphSAGE (Hamilton et al., 2017)，直接在图上定义卷积操作，但对邻居的聚合权重要么固定（如均值/最大值），要么需要复杂的采样策略</li>\n</ol>\n<div class=\"key-point\">💡 <strong>关键洞察</strong>：Transformer 中的 self-attention 机制能够自适应地为不同输入分配不同权重，如果将其引入图神经网络，就能让每个节点\"学会\"关注哪些邻居更重要，而不是简单地平等对待所有邻居。</div>\n<p><strong>核心机制：Graph Attention Layer</strong></p>\n<p>GAT 层的计算分为以下几步：</p>\n<p><strong>Step 1 — 共享线性变换</strong>：对所有节点应用共享的权重矩阵 <span class=\"kb-math kb-math-inline\">\\mathbf{W} \\in \\mathbb{R}^{F&#x27; \\times F}</span>，将输入特征从 <span class=\"kb-math kb-math-inline\">F</span> 维映射到 <span class=\"kb-math kb-math-inline\">F&#x27;</span> 维：</p>\n<div class=\"kb-math kb-math-display\">\\vec{h}&#x27;_i = \\mathbf{W} \\vec{h}_i</div>\n<p><strong>Step 2 — 注意力系数计算</strong>：对节点 <span class=\"kb-math kb-math-inline\">i</span> 的每个邻居 <span class=\"kb-math kb-math-inline\">j \\in \\mathcal{N}_i</span>（包括自身），通过共享注意力机制 <span class=\"kb-math kb-math-inline\">a: \\mathbb{R}^{F&#x27;} \\times \\mathbb{R}^{F&#x27;} \\rightarrow \\mathbb{R}</span> 计算原始注意力分数：</p>\n<div class=\"kb-math kb-math-display\">e_{ij} = \\text{LeakyReLU}\\left(\\vec{\\mathbf{a}}^T [\\mathbf{W}\\vec{h}_i \\| \\mathbf{W}\\vec{h}_j]\\right)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\vec{\\mathbf{a}} \\in \\mathbb{R}^{2F&#x27;}</span> 是可学习的注意力向量，<span class=\"kb-math kb-math-inline\">\\|</span> 表示向量拼接，LeakyReLU 的负斜率为 <span class=\"kb-math kb-math-inline\">\\alpha = 0.2</span>。</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：这里使用 <strong>masked attention</strong>——只对节点 <span class=\"kb-math kb-math-inline\">j \\in \\mathcal{N}_i</span> 计算 <span class=\"kb-math kb-math-inline\">e_{ij}</span>，而非所有节点。这是 GAT 与标准 Transformer self-attention 的关键区别，使得计算复杂度与边数而非节点数的平方成正比。</div>\n<p><strong>Step 3 — Softmax 归一化</strong>：对节点 <span class=\"kb-math kb-math-inline\">i</span> 的所有邻居的注意力分数进行 softmax 归一化，得到最终的注意力权重：</p>\n<div class=\"kb-math kb-math-display\">\\alpha_{ij} = \\text{softmax}_j(e_{ij}) = \\frac{\\exp(e_{ij})}{\\sum_{k \\in \\mathcal{N}_i} \\exp(e_{ik})}</div>\n<p><strong>Step 4 — 加权聚合</strong>：用注意力权重对邻居的变换特征进行加权求和，并通过非线性激活函数：</p>\n<div class=\"kb-math kb-math-display\">\\vec{h}&#x27;_i = \\sigma\\left(\\sum_{j \\in \\mathcal{N}_i} \\alpha_{ij} \\mathbf{W} \\vec{h}_j\\right)</div>\n<p><strong>Step 5 — 多头注意力</strong>：为了稳定注意力学习过程，GAT 使用 <span class=\"kb-math kb-math-inline\">K</span> 个独立的注意力头。对于中间层，将各头输出拼接：</p>\n<div class=\"kb-math kb-math-display\">\\vec{h}&#x27;_i = \\overset{K}{\\underset{k=1}{\\Big\\|}} \\sigma\\left(\\sum_{j \\in \\mathcal{N}_i} \\alpha_{ij}^k \\mathbf{W}^k \\vec{h}_j\\right)</div>\n<p>对于最终（预测）层，使用平均后再激活：</p>\n<div class=\"kb-math kb-math-display\">\\vec{h}&#x27;_i = \\sigma\\left(\\frac{1}{K} \\sum_{k=1}^{K} \\sum_{j \\in \\mathcal{N}_i} \\alpha_{ij}^k \\mathbf{W}^k \\vec{h}_j\\right)</div>\n<div class=\"key-point\">💡 <strong>为什么最终层用平均而非拼接？</strong> 拼接会使输出维度变为 <span class=\"kb-math kb-math-inline\">K \\times F&#x27;</span>，而分类层通常需要固定维度等于类别数。平均操作保持输出维度为 <span class=\"kb-math kb-math-inline\">F&#x27;</span>，同时仍能利用多头注意力的稳定性优势。</div>\n<p><strong>训练流程与实验配置</strong></p>\n<ul>\n<li><strong>转导学习（Transductive）</strong>：Cora / Citeseer / Pubmed</li>\n<li>2 层 GAT：第一层 <span class=\"kb-math kb-math-inline\">K=8</span> 头，每头 <span class=\"kb-math kb-math-inline\">F&#x27;=8</span> 特征（共 64 维）；第二层 <span class=\"kb-math kb-math-inline\">K=1</span> 头，输出 <span class=\"kb-math kb-math-inline\">C</span> 类</li>\n<li>\n<p>激活函数：ELU；正则化：L2 = 0.0005（Cora/Citeseer）/ 0.001（Pubmed）；Dropout = 0.6（应用于输入和注意力系数）</p>\n</li>\n<li>\n<p><strong>归纳学习（Inductive）</strong>：PPI（蛋白质交互网络）</p>\n</li>\n<li>3 层 GAT：<span class=\"kb-math kb-math-inline\">K=4</span> 头 × 256 维 → <span class=\"kb-math kb-math-inline\">K=4</span> 头 × 256 维 → <span class=\"kb-math kb-math-inline\">K=6</span> 头 × 121 类</li>\n<li>激活函数：ELU（中间层）；无正则化/Dropout；训练时使用 batch size = 2 个图</li>\n</ul>\n<p><strong>与传统方法的关键区别</strong></p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>GCN</th>\n<th>GraphSAGE</th>\n<th>MoNet</th>\n<th><strong>GAT</strong></th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>邻居权重</td>\n<td>固定（度归一化）</td>\n<td>固定（均值/LSTM/池化）</td>\n<td>可学习（伪坐标）</td>\n<td><strong>自适应注意力</strong></td>\n</tr>\n<tr>\n<td>需要全局图结构</td>\n<td>✅</td>\n<td>❌</td>\n<td>✅</td>\n<td><strong>❌</strong></td>\n</tr>\n<tr>\n<td>支持归纳学习</td>\n<td>❌</td>\n<td>✅</td>\n<td>❌</td>\n<td><strong>✅</strong></td>\n</tr>\n<tr>\n<td>支持有向图</td>\n<td>❌</td>\n<td>❌</td>\n<td>❌</td>\n<td><strong>✅</strong></td>\n</tr>\n<tr>\n<td>计算可并行化</td>\n<td>✅</td>\n<td>部分</td>\n<td>✅</td>\n<td><strong>✅</strong></td>\n</tr>\n<tr>\n<td>时间复杂度</td>\n<td><span class=\"kb-math kb-math-inline\">O(|E|F&#x27;)</span></td>\n<td><span class=\"kb-math kb-math-inline\">O(|V|s^L F&#x27;)</span></td>\n<td><span class=\"kb-math kb-math-inline\">O(|E|F&#x27;)</span></td>\n<td><span class=\"kb-math kb-math-inline\">O(|V|FF&#x27; + |E|F&#x27;)</span></td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 <strong>GAT 的核心优势</strong>：注意力权重是数据驱动的——同一个节点对不同邻居可以分配不同的重要性，这使得模型能够捕获图中更精细的结构信息，而不像 GCN 那样对所有邻居一视同仁。</div>",
      "quiz": {
        "q": "GAT 在最终预测层使用多头注意力时，为什么采用平均（averaging）而非拼接（concatenation）？",
        "options": [
          "平均操作的计算效率更高",
          "拼接会导致输出维度为 K×F'，不适合直接用于分类",
          "平均操作能产生更好的注意力权重",
          "拼接只适用于归纳学习任务"
        ],
        "answer": 1,
        "explain": "拼接会使输出维度变为 K×F'，而最终分类层需要输出维度等于类别数 C，因此使用平均来保持输出维度为 F'=C。"
      }
    },
    {
      "id": "bert",
      "num": 10,
      "name": "BERT",
      "fullName": "双向编码器表示 (Bidirectional Encoder Representations)",
      "year": "2018",
      "org": "Google AI",
      "parent": "transformer",
      "paperUrl": "https://arxiv.org/abs/1810.04805",
      "projectUrl": "",
      "category": "self_supervised",
      "motivation": "深度双向Transformer预训练",
      "summary": "BERT 提出了基于 Masked Language Model（MLM）和 Next Sentence Prediction（NSP）的深度双向 Transformer 预训练方法，解决了传统语言模型只能单向建模的局限，使预训练模型通过简单微调即可在 11 项 NLP 任务上达到当时最优。",
      "keyPoints": [
        "<strong>深度双向预训练</strong>：不同于 GPT 的单向（左到右）或 ELMo 的浅层双向拼接，BERT 在所有层联合左右上下文进行真正的深度双向建模",
        "<strong>Masked Language Model (MLM)</strong>：随机遮蔽 15% 的输入 token 并预测，实现双向条件建模；遮蔽策略为 80% <code>[MASK]</code>、10% 随机替换、10% 保持不变，缓解预训练-微调不一致问题",
        "<strong>Next Sentence Prediction (NSP)</strong>：二分类任务判断句子 B 是否为句子 A 的真实下一句，学习句间关系",
        "<strong>统一的预训练-微调框架</strong>：预训练后仅需添加一个输出层，通过端到端微调适配各类下游任务（分类、序列标注、问答等）",
        "<strong>输入表示</strong>：Token Embedding + Segment Embedding + Position Embedding 三者求和；使用 WordPiece 分词（30K 词表），特殊标记 <code>[CLS]</code> 和 <code>[SEP]</code>",
        "<strong>两种模型规格</strong>：BERT<span class=\"kb-math kb-math-inline\">_{\\text{BASE}}</span>（L=12, H=768, A=12, 110M 参数）和 BERT<span class=\"kb-math kb-math-inline\">_{\\text{LARGE}}</span>（L=24, H=1024, A=16, 340M 参数）",
        "<strong>预训练数据</strong>：BooksCorpus（8 亿词）+ English Wikipedia（25 亿词），使用文档级语料以保留长程上下文",
        "<strong>SOTA 结果</strong>：GLUE 80.5%、MultiNLI 86.7%、SQuAD v1.1 F1 93.2、SQuAD v2.0 F1 83.1"
      ],
      "detail": "<h5>整体架构</h5>\n<p><img alt=\"BERT 预训练与微调总览\" src=\"https://ar5iv.labs.arxiv.org/html/1810.04805/assets/x1.png\" />\n<em>图 1：BERT 预训练（左）与微调（右）流程。预训练和微调使用相同的 Transformer 架构，仅输出层不同。</em></p>\n<p><img alt=\"预训练模型架构对比\" src=\"https://ar5iv.labs.arxiv.org/html/1810.04805/assets/x3.png\" />\n<em>图 3：三种预训练架构对比——BERT 使用双向 Transformer，OpenAI GPT 使用单向（左到右）Transformer，ELMo 使用两个独立的单向 LSTM 的浅层拼接。</em></p>\n<p>BERT 的核心架构是标准的多层双向 Transformer 编码器。与 GPT 使用的受限自注意力（每个 token 只能关注左侧上下文）不同，BERT 的自注意力机制允许每个 token 同时关注序列中所有位置，从而实现真正的深度双向表示。</p>\n<h5>输入表示</h5>\n<p><img alt=\"BERT 输入表示\" src=\"https://ar5iv.labs.arxiv.org/html/1810.04805/assets/x2.png\" />\n<em>图 2：BERT 的输入表示由 Token Embedding、Segment Embedding 和 Position Embedding 三者逐元素相加构成。</em></p>\n<p>对于给定的输入 token 序列，BERT 的输入嵌入计算为：</p>\n<div class=\"kb-math kb-math-display\">E_{\\text{input}} = E_{\\text{token}} + E_{\\text{segment}} + E_{\\text{position}}</div>\n<p>其中：\n- <strong>Token Embedding</strong>：WordPiece 子词嵌入，词表大小 30,000\n- <strong>Segment Embedding</strong>：标识 token 属于句子 A 还是句子 B（学习得到）\n- <strong>Position Embedding</strong>：标识 token 在序列中的绝对位置（学习得到，最大长度 512）</p>\n<p>每个输入序列以 <code>[CLS]</code> 开头，句子对之间用 <code>[SEP]</code> 分隔。<code>[CLS]</code> 对应的最终隐藏向量 <span class=\"kb-math kb-math-inline\">C \\in \\mathbb{R}^H</span> 用作整个序列的聚合表示（用于分类任务），各 token 的最终隐藏向量 <span class=\"kb-math kb-math-inline\">T_i \\in \\mathbb{R}^H</span> 用于 token 级任务。</p>\n<h5>预训练任务</h5>\n<p><strong>任务 1：Masked Language Model (MLM)</strong></p>\n<p>传统语言模型只能从左到右或从右到左训练，因为双向条件建模会导致每个词间接\"看到自己\"，使预测变得无意义。BERT 借鉴完形填空（Cloze task）的思想，随机遮蔽输入 token 并要求模型预测被遮蔽的原始 token。</p>\n<pre><code class=\"language-python\"># BERT Masked Language Model 预训练伪代码\ndef mlm_pretrain(tokens, mask_ratio=0.15):\n    # 1. 随机选择 15% 的 token 位置\n    masked_positions = random_select(tokens, ratio=mask_ratio)\n\n    for pos in masked_positions:\n        r = random()\n        if r &lt; 0.8:\n            tokens[pos] = '[MASK]'      # 80%: 替换为 [MASK]\n        elif r &lt; 0.9:\n            tokens[pos] = random_token() # 10%: 替换为随机 token\n        # else: 10% 保持不变\n\n    # 2. 通过双向 Transformer 编码\n    hidden = transformer_encoder(tokens)  # 所有层双向注意力\n\n    # 3. 仅对被遮蔽位置计算交叉熵损失\n    for pos in masked_positions:\n        loss += cross_entropy(hidden[pos], original_token[pos])\n\n    return loss\n</code></pre>\n<div class=\"key-point\">💡 <strong>关键设计</strong>：80/10/10 的遮蔽策略是为了缓解预训练与微调之间的不一致——微调时输入中不会出现 <code>[MASK]</code> 标记。10% 保持不变让模型学会利用真实 token 的信息，10% 随机替换迫使模型不盲目信任输入，保持对所有位置的建模能力。</div>\n<p>MLM 的损失函数为：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{MLM}} = -\\sum_{i \\in \\mathcal{M}} \\log P(x_i \\mid \\tilde{x})</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\mathcal{M}</span> 是被遮蔽位置的集合，<span class=\"kb-math kb-math-inline\">\\tilde{x}</span> 是经过遮蔽处理后的输入序列，<span class=\"kb-math kb-math-inline\">x_i</span> 是位置 <span class=\"kb-math kb-math-inline\">i</span> 的原始 token。</p>\n<p><strong>任务 2：Next Sentence Prediction (NSP)</strong></p>\n<p>许多下游任务（如问答、自然语言推理）需要理解两个句子之间的关系，而语言模型本身无法直接捕捉这种句间关系。NSP 是一个二分类任务：</p>\n<pre><code class=\"language-python\"># Next Sentence Prediction 伪代码\ndef nsp_pretrain(corpus):\n    # 构造训练样本\n    sentence_A = sample_sentence(corpus)\n    if random() &lt; 0.5:\n        sentence_B = get_next_sentence(sentence_A)  # 真实下一句\n        label = 'IsNext'\n    else:\n        sentence_B = sample_random_sentence(corpus)  # 随机句子\n        label = 'NotNext'\n\n    # 输入: [CLS] A [SEP] B [SEP]\n    input_seq = ['[CLS]'] + tokenize(A) + ['[SEP]'] + tokenize(B) + ['[SEP]']\n    hidden = transformer_encoder(input_seq)\n\n    # 用 [CLS] 的隐藏向量做二分类\n    loss = cross_entropy(classifier(hidden[0]), label)\n    return loss\n</code></pre>\n<p>BERT 的总预训练损失为两个任务的联合：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{pre-train}} = \\mathcal{L}_{\\text{MLM}} + \\mathcal{L}_{\\text{NSP}}</div>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：后续研究（如 RoBERTa）发现 NSP 任务对性能提升有限甚至有害，但在 BERT 原始论文中，消融实验表明移除 NSP 会导致 QNLI、MNLI 和 SQuAD 性能显著下降。</div>\n<h5>微调策略</h5>\n<p><img alt=\"BERT 微调示意\" src=\"https://ar5iv.labs.arxiv.org/html/1810.04805/assets/x4.png\" />\n<em>图 4：BERT 在不同下游任务上的微调方式。(a)(b) 句子级任务使用 [CLS] 表示；(c)(d) token 级任务使用各 token 表示。</em></p>\n<p>BERT 的微调极为简洁——Transformer 的自注意力机制天然支持对单句或句对的统一编码，无需为不同任务设计特定架构：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>任务类型</th>\n<th>输入格式</th>\n<th>输出方式</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>句子对分类（NLI、释义）</td>\n<td><code>[CLS] 句子A [SEP] 句子B</code></td>\n<td><span class=\"kb-math kb-math-inline\">C</span> → 分类层</td>\n</tr>\n<tr>\n<td>单句分类（情感分析）</td>\n<td><code>[CLS] 句子 [SEP]</code></td>\n<td><span class=\"kb-math kb-math-inline\">C</span> → 分类层</td>\n</tr>\n<tr>\n<td>问答（SQuAD）</td>\n<td><code>[CLS] 问题 [SEP] 段落</code></td>\n<td>各 <span class=\"kb-math kb-math-inline\">T_i</span> → 起止位置预测</td>\n</tr>\n<tr>\n<td>序列标注（NER）</td>\n<td><code>[CLS] 句子 [SEP]</code></td>\n<td>各 <span class=\"kb-math kb-math-inline\">T_i</span> → 标签分类</td>\n</tr>\n</tbody>\n</table></div>\n<p>微调时所有参数（包括预训练的 Transformer 权重）端到端更新。典型超参数：batch size 16/32，学习率 2e-5 至 5e-5，epoch 3-4。微调成本极低——单个 Cloud TPU 上 1 小时内即可完成大多数任务。</p>\n<h5>与先前方法的核心区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th>ELMo</th>\n<th>OpenAI GPT</th>\n<th>BERT</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>架构</td>\n<td>双向 LSTM</td>\n<td>单向 Transformer</td>\n<td>双向 Transformer</td>\n</tr>\n<tr>\n<td>双向性</td>\n<td>浅层拼接（左→右 + 右→左）</td>\n<td>仅左→右</td>\n<td>所有层深度双向</td>\n</tr>\n<tr>\n<td>预训练目标</td>\n<td>语言模型</td>\n<td>语言模型</td>\n<td>MLM + NSP</td>\n</tr>\n<tr>\n<td>下游适配</td>\n<td>特征提取（冻结+拼接）</td>\n<td>微调所有参数</td>\n<td>微调所有参数</td>\n</tr>\n<tr>\n<td>输入表示</td>\n<td>字符 CNN</td>\n<td>BPE</td>\n<td>WordPiece + Segment</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 <strong>核心洞察</strong>：BERT 的关键创新不在于 Transformer 架构本身（GPT 也使用 Transformer），而在于通过 MLM 预训练目标突破了\"双向建模\"的瓶颈。传统语言模型必须单向才能避免信息泄露，而 MLM 通过遮蔽机制巧妙地在双向上下文中进行预测，使每一层都能同时利用左右两侧的信息。</div>",
      "quiz": {
        "q": "BERT 在 Masked Language Model 预训练中，被选中遮蔽的 token 会经历怎样的处理？",
        "options": [
          "100% 替换为 [MASK] 标记",
          "80% 替换为 [MASK]，10% 替换为随机 token，10% 保持不变",
          "50% 替换为 [MASK]，50% 保持不变",
          "90% 替换为 [MASK]，10% 替换为随机 token"
        ],
        "answer": 1,
        "explain": "BERT 采用 80/10/10 策略：80% 替换为 [MASK]，10% 替换为随机 token，10% 保持原始 token 不变。这种设计缓解了预训练（有 [MASK]）与微调（无 [MASK]）之间的分布不一致问题。"
      }
    },
    {
      "id": "simclr",
      "num": 11,
      "name": "SimCLR",
      "fullName": "SimCLR",
      "year": "2020",
      "org": "Google Research",
      "parent": "resnet",
      "paperUrl": "https://arxiv.org/abs/2002.05709",
      "projectUrl": "",
      "category": "self_supervised",
      "motivation": "简化对比学习框架",
      "summary": "SimCLR 的核心目标是：简化对比学习框架。",
      "keyPoints": [
        "核心动机：简化对比学习框架",
        "演化来源：继承或改进自 resnet",
        "代表机构：Google Research"
      ],
      "detail": "<p>简化对比学习框架</p>"
    },
    {
      "id": "moco",
      "num": 12,
      "name": "MoCo",
      "fullName": "动量对比 (Momentum Contrast)",
      "year": "2020",
      "org": "Meta AI",
      "parent": "resnet",
      "paperUrl": "https://arxiv.org/abs/1911.05722",
      "projectUrl": "",
      "category": "self_supervised",
      "motivation": "动量对比学习队列机制",
      "summary": "MoCo 提出将对比学习中的负样本字典维护为一个**动态队列**，并通过**动量更新**的键编码器保持字典表示的一致性，从而在无监督视觉表征学习中构建了大规模且一致的负样本字典，在多个下游任务上超越了有监督预训练的表现。",
      "keyPoints": [
        "<strong>字典即队列（Dictionary as a Queue）</strong>：将负样本字典从 mini-batch 中解耦，以 FIFO 队列形式维护，支持远大于 batch size 的字典规模（如 65536）",
        "<strong>动量编码器（Momentum Encoder）</strong>：键编码器 <span class=\"kb-math kb-math-inline\">f_k</span> 通过动量更新 <span class=\"kb-math kb-math-inline\">\\theta_k \\leftarrow m\\theta_k + (1-m)\\theta_q</span> 缓慢演化（<span class=\"kb-math kb-math-inline\">m=0.999</span>），保证队列中不同 mini-batch 编码的键表示一致性",
        "<strong>InfoNCE 对比损失</strong>：将对比学习形式化为字典查找问题，使用温度缩放的交叉熵损失匹配 query 与正样本 key",
        "<strong>三种对比机制对比</strong>：系统分析了 end-to-end、memory bank、MoCo 三种机制在字典大小与一致性上的权衡",
        "<strong>Shuffling BN</strong>：通过在多 GPU 间打乱 key encoder 的样本顺序，防止 Batch Normalization 的信息泄漏",
        "<strong>实例判别前置任务（Instance Discrimination）</strong>：同一图像的两个随机增强视图构成正样本对",
        "<strong>下游迁移超越监督学习</strong>：在 PASCAL VOC 检测、COCO 检测/分割等 7 个下游任务上超越 ImageNet 有监督预训练"
      ],
      "detail": "<h5>核心框架图</h5>\n<p><img alt=\"MoCo 框架示意图\" src=\"https://ar5iv.labs.arxiv.org/html/1911.05722/assets/x1.png\" />\n<em>图 1：MoCo 通过将字典维护为队列、键编码器通过动量更新来训练视觉表征编码器。查询 q 与字典中的键通过对比损失进行匹配。</em></p>\n<p><img alt=\"三种对比学习机制对比\" src=\"https://ar5iv.labs.arxiv.org/html/1911.05722/assets/x2.png\" />\n<em>图 2：三种对比损失机制对比——(a) end-to-end：字典大小受限于 mini-batch；(b) memory bank：字典大但一致性差；(c) MoCo：通过队列+动量实现大字典与高一致性的统一。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># MoCo 伪代码 (PyTorch 风格)\n# f_q, f_k: 查询编码器和键编码器\n# queue: 字典队列，维度 CxK (C=特征维度, K=队列大小)\n# m: 动量系数 (默认 0.999)\n# t: 温度参数 (默认 0.07)\n\nf_k.params = f_q.params  # 初始化：键编码器参数拷贝自查询编码器\n\nfor x in loader:  # 遍历每个 mini-batch\n    x_q = aug(x)   # 随机数据增强版本 1\n    x_k = aug(x)   # 随机数据增强版本 2\n\n    q = f_q.forward(x_q)  # 查询向量: NxC\n    k = f_k.forward(x_k)  # 键向量: NxC\n    k = k.detach()         # 键编码器不参与梯度回传\n\n    # 正样本 logits: Nx1\n    l_pos = bmm(q.view(N,1,C), k.view(N,C,1))\n    # 负样本 logits: NxK (从队列中获取)\n    l_neg = mm(q.view(N,C), queue.view(C,K))\n    # 拼接 logits: Nx(1+K)\n    logits = cat([l_pos, l_neg], dim=1)\n\n    # InfoNCE 对比损失 (正样本在第 0 位)\n    labels = zeros(N)\n    loss = CrossEntropyLoss(logits / t, labels)\n\n    # 仅更新查询编码器\n    loss.backward()\n    update(f_q.params)\n\n    # 动量更新键编码器\n    f_k.params = m * f_k.params + (1 - m) * f_q.params\n\n    # 更新队列：入队当前 mini-batch，出队最早的 mini-batch\n    enqueue(queue, k)\n    dequeue(queue)\n</code></pre>\n<h5>方法详解</h5>\n<p><strong>1. 动机与背景：对比学习的字典困境</strong></p>\n<p>无监督视觉表征学习的核心思路是将对比学习视为<strong>字典查找（dictionary look-up）</strong>问题：给定一个编码后的查询 <span class=\"kb-math kb-math-inline\">q</span>，需要在一组编码后的键 <span class=\"kb-math kb-math-inline\">\\{k_0, k_1, k_2, \\ldots\\}</span> 中找到与 <span class=\"kb-math kb-math-inline\">q</span> 匹配的正样本键 <span class=\"kb-math kb-math-inline\">k_+</span>。好的视觉表征需要一个满足两个条件的字典：</p>\n<ol>\n<li><strong>足够大</strong>：覆盖丰富的负样本，使对比信号更有区分力</li>\n<li><strong>一致性好</strong>：字典中所有键应由相似（或相同）的编码器生成，否则键之间不可比</li>\n</ol>\n<p>然而，此前的两种主流方法各有缺陷：\n- <strong>端到端（End-to-end）方法</strong>：字典大小 = mini-batch 大小，受限于 GPU 显存，通常只有几百到几千\n- <strong>Memory Bank 方法</strong>：虽然字典可以覆盖整个数据集，但每个样本的表示在上次被访问时更新，导致字典中的键来自训练过程中差异巨大的编码器版本，一致性极差</p>\n<div class=\"key-point\">💡 <strong>关键洞察</strong>：MoCo 的核心贡献在于同时解决了\"大字典\"和\"高一致性\"这对矛盾——用队列解耦字典大小，用动量更新保证一致性。</div>\n<p><strong>2. 核心机制一：字典即队列（Dictionary as a Queue）</strong></p>\n<p>MoCo 将负样本字典维护为一个<strong>先进先出（FIFO）队列</strong>：\n- 每个 mini-batch 的编码键被<strong>入队（enqueue）</strong>到字典末尾\n- 最早的 mini-batch 被<strong>出队（dequeue）</strong>移除\n- 队列大小 <span class=\"kb-math kb-math-inline\">K</span> 是一个独立的超参数，与 mini-batch 大小完全解耦</p>\n<p>这意味着即使 batch size 只有 256，字典大小也可以设为 65536（论文默认值），提供了 256 倍的负样本数量。同时，移除最旧的 mini-batch 也是有益的，因为它们的编码键与当前编码器差异最大。</p>\n<p><strong>3. 核心机制二：动量更新（Momentum Update）</strong></p>\n<p>使用队列带来了一个新问题：队列中的键由不同时刻的编码器生成，无法通过反向传播统一更新。简单地将键编码器 <span class=\"kb-math kb-math-inline\">f_k</span> 直接拷贝为查询编码器 <span class=\"kb-math kb-math-inline\">f_q</span> 效果很差，因为编码器快速变化导致键表示不一致。</p>\n<p>MoCo 提出<strong>动量更新</strong>策略：</p>\n<div class=\"kb-math kb-math-display\">\\theta_k \\leftarrow m \\cdot \\theta_k + (1-m) \\cdot \\theta_q</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">m \\in [0,1)</span> 是动量系数。只有查询编码器 <span class=\"kb-math kb-math-inline\">\\theta_q</span> 通过梯度下降更新，键编码器 <span class=\"kb-math kb-math-inline\">\\theta_k</span> 则通过指数移动平均（EMA）缓慢跟随。</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：论文发现 <span class=\"kb-math kb-math-inline\">m=0.999</span> 远优于 <span class=\"kb-math kb-math-inline\">m=0.9</span>，说明键编码器必须<strong>极其缓慢</strong>地演化。这保证了队列中不同时刻编码的键之间差异很小，维持了字典的一致性。</div>\n<p><strong>4. 对比损失函数：InfoNCE</strong></p>\n<p>MoCo 使用 InfoNCE 作为对比损失函数，将其形式化为 <span class=\"kb-math kb-math-inline\">(K+1)</span> 路 softmax 分类：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_q = -\\log \\frac{\\exp(q \\cdot k_+ / \\tau)}{\\sum_{i=0}^{K} \\exp(q \\cdot k_i / \\tau)}</div>\n<p>其中：\n- <span class=\"kb-math kb-math-inline\">q</span> 是查询编码器输出的查询向量\n- <span class=\"kb-math kb-math-inline\">k_+</span> 是唯一的正样本键（同一图像的不同增强视图）\n- <span class=\"kb-math kb-math-inline\">k_i</span> 包含 1 个正样本和 <span class=\"kb-math kb-math-inline\">K</span> 个负样本（来自队列）\n- <span class=\"kb-math kb-math-inline\">\\tau</span> 是温度参数（默认 0.07），控制分布的锐度</p>\n<p><strong>5. 前置任务与技术细节</strong></p>\n<ul>\n<li><strong>实例判别</strong>：同一图像的两个随机增强版本构成正样本对，不同图像为负样本</li>\n<li><strong>编码器架构</strong>：标准 ResNet，最后全连接层输出 128 维向量，经 L2 归一化</li>\n<li><strong>数据增强</strong>：224×224 随机裁剪 + 随机颜色抖动 + 随机水平翻转 + 随机灰度转换</li>\n<li><strong>Shuffling BN</strong>：为防止 Batch Normalization 在 batch 内泄漏信息（模型可通过 BN 统计量\"作弊\"），MoCo 在多 GPU 训练时对键编码器的输入样本顺序进行跨 GPU 打乱，确保计算 query 和其正样本 key 的 BN 统计量来自不同子集</li>\n</ul>\n<p><strong>6. 与传统方法的关键区别</strong></p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>End-to-end</th>\n<th>Memory Bank</th>\n<th>MoCo</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>字典大小</td>\n<td>= batch size（受限）</td>\n<td>= 数据集大小（极大）</td>\n<td>= 队列大小（灵活可调）</td>\n</tr>\n<tr>\n<td>一致性</td>\n<td>高（同一编码器）</td>\n<td>低（跨 epoch 编码器）</td>\n<td>高（动量编码器缓慢演化）</td>\n</tr>\n<tr>\n<td>反向传播</td>\n<td>通过所有样本</td>\n<td>无（采样表示）</td>\n<td>仅通过查询编码器</td>\n</tr>\n<tr>\n<td>内存效率</td>\n<td>低（大 batch 需大显存）</td>\n<td>低（存储所有样本表示）</td>\n<td>高（仅维护队列）</td>\n</tr>\n<tr>\n<td>可扩展性</td>\n<td>受限</td>\n<td>受限于数据集大小</td>\n<td>可扩展至十亿级数据</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 <strong>核心创新总结</strong>：MoCo 的 queue + momentum 设计是一个优雅的工程-算法协同方案——队列提供了大规模负样本，动量更新保证了这些负样本的表示质量，两者缺一不可。</div>",
      "quiz": {
        "q": "MoCo 中动量系数 m 设为 0.999 而非 0.9 的主要原因是什么？",
        "options": [
          "更大的动量可以加速训练收敛",
          "更大的动量使键编码器缓慢演化，保证队列中键表示的一致性",
          "更大的动量可以增大字典队列的容量",
          "更大的动量可以减少 GPU 显存占用"
        ],
        "answer": 1,
        "explain": "动量系数越接近 1，键编码器参数变化越慢，使得队列中不同 mini-batch 编码的键之间差异更小，从而保持字典的一致性。实验表明 m=0.999 远优于 m=0.9。"
      }
    },
    {
      "id": "mae",
      "num": 13,
      "name": "MAE",
      "fullName": "掩码自编码器 (Masked Autoencoder)",
      "year": "2022",
      "org": "Meta AI",
      "parent": "bert",
      "paperUrl": "https://arxiv.org/abs/2111.06377",
      "projectUrl": "",
      "category": "self_supervised",
      "motivation": "高掩码率图像重建预训练",
      "summary": "MAE 提出了一种非对称编码器-解码器架构的掩码自编码器，通过随机遮挡 75% 的图像 patch 并仅用可见 patch 进行编码，实现了高效且可扩展的视觉自监督预训练，在 ImageNet-1K 上以 ViT-H 达到 87.8% 的 fine-tuning 精度。",
      "keyPoints": [
        "<strong>非对称编码器-解码器架构</strong>：编码器仅处理可见 patch（约 25%），解码器在编码后引入 mask token 重建完整图像，大幅降低计算量（3× 以上加速）",
        "<strong>极高掩码比例（75%）</strong>：远高于 NLP 中 BERT 的 15%，迫使模型学习全局语义而非局部纹理插值",
        "<strong>像素级重建目标</strong>：使用 MSE 损失在像素空间直接重建被遮挡 patch，无需离散 tokenizer（如 dVAE）",
        "<strong>逐 patch 归一化</strong>：对每个目标 patch 独立做均值-方差归一化，提升重建质量和表征效果",
        "<strong>可扩展性强</strong>：从 ViT-B 到 ViT-H 持续提升，ViT-H/14 在 ImageNet-1K 上达到 87.8%（448 尺寸），仅用 IN1K 数据即超越此前所有方法",
        "<strong>训练效率高</strong>：编码器跳过 mask token，配合 shuffle/unshuffle 操作，1600 epoch 预训练 ViT-L 仅需 31 小时（128 TPU-v3），快于 MoCo v3 的 300 epoch（36 小时）"
      ],
      "detail": "<h5>核心架构图</h5>\n<p><img alt=\"MAE 架构示意图\" src=\"https://ar5iv.labs.arxiv.org/html/2111.06377/assets/x1.png\" />\n<em>图：MAE 的非对称编码器-解码器架构。编码器仅处理可见 patch（无 mask token），解码器在编码后插入 mask token 重建完整图像。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># MAE 预训练伪代码\ndef mae_pretrain_step(image, mask_ratio=0.75):\n    # 1. Patch 化 + 位置编码\n    patches = patchify(image)                    # [N, patch_dim]\n    patches = patches + pos_embed                # 加位置编码\n\n    # 2. 随机掩码：保留 25% 的 patch\n    visible_ids, masked_ids = random_mask(N, mask_ratio)\n    visible_patches = patches[visible_ids]       # [N_vis, patch_dim]\n\n    # 3. 编码器：仅处理可见 patch（标准 ViT）\n    latent = encoder(visible_patches)            # [N_vis, D]\n\n    # 4. 解码器输入：拼接编码结果 + mask tokens，恢复原始顺序\n    mask_tokens = learnable_mask_token.repeat(N_masked)\n    full_tokens = concat(latent, mask_tokens)    # unshuffle 恢复位置\n    full_tokens = full_tokens + decoder_pos_embed\n    decoded = decoder(full_tokens)               # [N, D_dec]\n\n    # 5. 损失：仅在被遮挡 patch 上计算 MSE\n    pred = linear_proj(decoded[masked_ids])      # 预测像素值\n    target = normalize_per_patch(patches[masked_ids])  # patch 归一化\n    loss = mse_loss(pred, target)\n    return loss\n</code></pre>\n<h5>动机与背景</h5>\n<p>自监督学习在 NLP 领域（GPT、BERT）取得了巨大成功，其核心范式——掩码语言建模（Masked Language Modeling）——通过遮挡部分输入并预测被遮挡内容来学习表征。然而，将这一思路迁移到计算机视觉领域面临三大挑战：</p>\n<ol>\n<li><strong>架构差异</strong>：卷积网络难以自然地引入 mask token 或位置编码，而 ViT 的出现消除了这一障碍。</li>\n<li><strong>信息密度差异</strong>：语言是高度语义化的离散信号，遮挡一个词就丢失大量信息；而图像具有强烈的空间冗余——相邻像素高度相关，低掩码率下模型可以通过简单插值\"作弊\"而无需理解语义。</li>\n<li><strong>解码器角色差异</strong>：在 NLP 中解码器可以很简单（一个线性层预测词汇），但在视觉中重建像素需要更复杂的解码器，且解码器的设计会显著影响学到的表征质量。</li>\n</ol>\n<p>MAE 针对这三个挑战给出了统一的解决方案：使用 ViT 作为骨干、采用极高掩码率（75%）消除冗余、设计非对称的轻量解码器。</p>\n<h5>核心机制详解</h5>\n<p><strong>1. 掩码策略（Masking）</strong></p>\n<p>MAE 将输入图像划分为不重叠的 patch（如 16×16），然后按均匀随机采样选择一部分 patch 进行遮挡。论文发现 <strong>75% 的掩码率</strong> 是最优的，这一比例远高于 BERT 的 15%，也高于视觉领域此前工作（如 BEiT 的 40%）。</p>\n<div class=\"key-point\">💡 关键：高掩码率不仅是一个超参数选择，而是 MAE 设计哲学的核心。它确保剩余的可见 patch 不足以通过局部纹理插值完成重建，迫使编码器学习对物体形状、语义结构的全局理解。</div>\n<p><strong>2. 非对称编码器（Asymmetric Encoder）</strong></p>\n<p>编码器是标准的 ViT，但有一个关键设计：<strong>编码器仅处理可见 patch，不包含任何 mask token</strong>。可见 patch 加上位置编码后直接送入 Transformer。</p>\n<p>这一设计带来了巨大的计算优势。在 75% 掩码率下，编码器仅处理 25% 的 token，计算量和显存占用降为原来的约 <span class=\"kb-math kb-math-inline\">\\frac{1}{4}</span>（由于 Transformer 的二次复杂度，实际加速超过 3 倍）。这使得 MAE 可以高效地训练超大模型（如 ViT-H，632M 参数）。</p>\n<p><strong>3. 轻量解码器（Lightweight Decoder）</strong></p>\n<p>解码器仅在预训练阶段使用，其输入由两部分组成：\n- 编码器输出的可见 patch 表征\n- 共享的可学习 mask token（代表被遮挡位置）</p>\n<p>两者通过 unshuffle 操作恢复到原始空间位置，加上解码器专用的位置编码后，送入一个较浅的 Transformer 解码器。论文默认使用 <strong>8 层 Transformer block，宽度 512</strong>，远小于编码器（如 ViT-L 为 24 层、宽度 1024）。</p>\n<div class=\"key-point\">💡 关键：解码器的设计体现了\"表征学习与重建任务解耦\"的思想。编码器负责学习语义表征（用于下游任务），解码器仅负责将表征映射回像素空间（仅在预训练时使用）。轻量解码器不仅节省计算，还避免了解码器过强导致编码器\"偷懒\"的问题。</div>\n<p><strong>4. 重建目标（Reconstruction Target）</strong></p>\n<p>MAE 直接在像素空间重建被遮挡的 patch，使用均方误差（MSE）作为损失函数：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L} = \\frac{1}{|\\mathcal{M}|} \\sum_{i \\in \\mathcal{M}} \\| \\hat{x}_i - \\text{norm}(x_i) \\|^2</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\mathcal{M}</span> 是被遮挡 patch 的索引集合，<span class=\"kb-math kb-math-inline\">\\hat{x}_i</span> 是模型预测，<span class=\"kb-math kb-math-inline\">\\text{norm}(x_i)</span> 是对目标 patch 进行逐 patch 归一化后的像素值。</p>\n<div class=\"warn-box\">⚠️ 注意：损失<strong>仅在被遮挡的 patch 上计算</strong>，类似于 BERT 只预测被 mask 的 token。逐 patch 归一化（减去该 patch 的均值、除以标准差）是一个重要的细节，它提升了表征质量，可能是因为归一化后模型更关注 patch 内部的相对结构而非绝对亮度。</div>\n<p><strong>5. 高效实现：Shuffle &amp; Unshuffle</strong></p>\n<p>为避免在编码器中处理大量无意义的 mask token，MAE 采用了 shuffle/unshuffle 策略：\n1. 对所有 patch 生成随机排列\n2. 按排列顺序取前 25% 作为可见 patch 送入编码器\n3. 编码完成后，将编码结果与 mask token 拼接，通过 unshuffle（逆排列）恢复原始位置顺序\n4. 送入解码器</p>\n<p>这一实现无需稀疏操作，完全基于索引操作，在 GPU 上非常高效。</p>\n<h5>与相关方法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>MAE</th>\n<th>BEiT</th>\n<th>MoCo v3</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>预训练范式</td>\n<td>掩码重建</td>\n<td>掩码 token 预测</td>\n<td>对比学习</td>\n</tr>\n<tr>\n<td>重建目标</td>\n<td>像素</td>\n<td>离散 visual token</td>\n<td>—</td>\n</tr>\n<tr>\n<td>需要额外 tokenizer</td>\n<td>❌</td>\n<td>✅ (dVAE)</td>\n<td>❌</td>\n</tr>\n<tr>\n<td>掩码率</td>\n<td>75%</td>\n<td>40%</td>\n<td>—</td>\n</tr>\n<tr>\n<td>编码器处理 mask token</td>\n<td>❌</td>\n<td>✅</td>\n<td>—</td>\n</tr>\n<tr>\n<td>ViT-L 精度 (IN1K)</td>\n<td><strong>85.9%</strong></td>\n<td>85.2%</td>\n<td>84.1%</td>\n</tr>\n<tr>\n<td>训练速度 (vs BEiT)</td>\n<td><strong>3.5× 更快</strong></td>\n<td>1×</td>\n<td>—</td>\n</tr>\n</tbody>\n</table></div>\n<p>MAE 相比 BEiT 更简单（无需预训练 dVAE tokenizer）、更快（编码器不处理 mask token）、更准确（ViT-L 上高 0.7%）。相比对比学习方法（MoCo v3），MAE 在大模型上优势更明显，且不需要数据增强、动量编码器等复杂组件。</p>",
      "quiz": {
        "q": "MAE 的编码器在预训练时为什么不处理 mask token？",
        "options": [
          "因为 mask token 会引入噪声，降低表征质量",
          "因为跳过 mask token 可以大幅减少计算量，且不影响编码器学到的表征",
          "因为 ViT 架构不支持处理 mask token",
          "因为 mask token 需要在解码器中才能获得正确的位置编码"
        ],
        "answer": 1,
        "explain": "编码器跳过 mask token 是 MAE 的核心设计之一。在 75% 掩码率下，编码器仅处理 25% 的 token，计算量降至约 1/4，实现 3× 以上加速，同时实验表明这不会损害甚至能改善学到的表征质量。"
      }
    },
    {
      "id": "mrl",
      "num": 14,
      "name": "MRL",
      "fullName": "Matryoshka表示学习 (Matryoshka Representation Learning)",
      "year": "2022",
      "org": "UMich",
      "parent": "bert",
      "paperUrl": "https://arxiv.org/abs/2205.13147",
      "projectUrl": "",
      "category": "deep_rep",
      "motivation": "灵活维度嵌入截断表示",
      "summary": "MRL 提出在表示向量的前缀子空间上同时优化多尺度损失，使单个模型一次训练即可生成从低维到高维的嵌套表示（Matryoshka Representations），在分类和检索任务中匹配独立训练模型的精度，同时支持自适应级联部署，实现高达 14× 的效率提升。",
      "keyPoints": [
        "<strong>嵌套表示设计</strong>：选取 <span class=\"kb-math kb-math-inline\">\\mathcal{M} = \\{8, 16, 32, \\ldots, 2048\\}</span> 等 <span class=\"kb-math kb-math-inline\">O(\\log d)</span> 个嵌套维度，表示向量的每个前缀子空间都具备独立的语义能力",
        "<strong>多尺度联合损失</strong>：对每个嵌套维度 <span class=\"kb-math kb-math-inline\">m \\in \\mathcal{M}</span> 配备独立线性分类器 <span class=\"kb-math kb-math-inline\">\\mathbf{W}^{(m)}</span>，加权聚合各尺度的分类损失进行端到端训练",
        "<strong>高效变体 MRL-E</strong>：通过权重共享（weight-tying）<span class=\"kb-math kb-math-inline\">\\mathbf{W}^{(m)} = \\mathbf{W}_{1:m}</span>，将分类器参数量减半",
        "<strong>自适应分类（AC）</strong>：基于 softmax 置信度阈值实现级联推理（8→16→32→...），平均仅需 ~37 维即达到 512 维独立模型的精度",
        "<strong>自适应检索（AR）</strong>：低维短名单 + 高维重排序的两阶段检索，理论加速 128×，实际加速 14×",
        "<strong>广泛适配性</strong>：无缝适配监督学习（ResNet50/ViT-B）、对比学习（ALIGN）、掩码语言模型（BERT），可扩展至 web-scale 数据集（JFT-300M）",
        "<strong>信息插值特性</strong>：尽管仅显式优化 <span class=\"kb-math kb-math-inline\">O(\\log d)</span> 个维度，中间维度的精度呈现平滑插值行为"
      ],
      "detail": "<h5>核心框架示意图</h5>\n<p><img alt=\"MRL 核心框架图\" src=\"https://ar5iv.labs.arxiv.org/html/2205.13147/assets/x3.png\" />\n<em>图：Matryoshka Representation Learning 概览。单个编码器 <span class=\"kb-math kb-math-inline\">F</span> 输出 <span class=\"kb-math kb-math-inline\">d</span> 维表示，其前缀 <span class=\"kb-math kb-math-inline\">z_{1:m}</span> 在每个嵌套维度 <span class=\"kb-math kb-math-inline\">m \\in \\mathcal{M}</span> 上分别通过独立分类器优化，形成从粗到细的多粒度表示。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># Matryoshka Representation Learning 训练核心逻辑\n# M: 嵌套维度集合, e.g., {8, 16, 32, 64, 128, 256, 512, 1024, 2048}\n# F: 编码器 (e.g., ResNet50), 输出 d 维向量\n# W[m]: 每个嵌套维度 m 对应的线性分类器, W[m] ∈ R^{L×m}\n# c[m]: 各尺度的重要性权重 (默认全部为 1)\n\nfor batch in dataloader:\n    x, y = batch                      # 输入样本和标签\n    z = F(x)                          # z ∈ R^{B×d}, 完整表示\n\n    total_loss = 0\n    for m in M:                       # 遍历每个嵌套维度\n        z_m = z[:, :m]                # 取前 m 维: z_{1:m}\n        logits = W[m] @ z_m.T        # 线性分类\n        total_loss += c[m] * cross_entropy(logits, y)\n\n    total_loss /= len(batch)\n    total_loss.backward()\n    optimizer.step()\n\n# MRL-E 变体: W[m] = W[:, :m], 所有分类器共享同一权重矩阵 W ∈ R^{L×d}\n</code></pre>\n<h5>动机与背景</h5>\n<p>现代深度学习模型通常将数据编码为固定维度的表示向量（如 ResNet50 输出 2048 维）。然而，不同的下游任务和部署场景对表示的精度与效率有不同需求：</p>\n<ul>\n<li><strong>检索系统</strong>中，数据库规模从千级到十亿级不等，搜索成本与维度线性相关</li>\n<li><strong>分类任务</strong>中，\"简单\"样本可能仅需低维表示即可正确分类，\"困难\"样本则需要高维表示</li>\n<li><strong>边缘设备</strong>的计算和存储资源受限，需要更紧凑的表示</li>\n</ul>\n<p>传统做法是为每个目标维度独立训练一个模型，这带来了 <span class=\"kb-math kb-math-inline\">O(d)</span> 级别的训练成本。知识蒸馏和后处理压缩（如 SVD）虽然可以降维，但在低维度下精度损失严重。</p>\n<h5>核心机制：嵌套多尺度损失</h5>\n<p>MRL 的核心思想极为简洁：<strong>让表示向量的每个前缀子空间都具备独立的表达能力</strong>。</p>\n<p>给定编码器 <span class=\"kb-math kb-math-inline\">F(\\cdot; \\theta_F): \\mathcal{X} \\to \\mathbb{R}^d</span>，对输入 <span class=\"kb-math kb-math-inline\">x</span> 生成表示 <span class=\"kb-math kb-math-inline\">z = F(x; \\theta_F)</span>。选择嵌套维度集 <span class=\"kb-math kb-math-inline\">\\mathcal{M} \\subseteq [d]</span>（通常取连续二倍递增），MRL 的优化目标为：</p>\n<div class=\"kb-math kb-math-display\">\\min_{\\{\\mathbf{W}^{(m)}\\}_{m \\in \\mathcal{M}},\\, \\theta_F} \\frac{1}{N} \\sum_{i \\in [N]} \\sum_{m \\in \\mathcal{M}} c_m \\cdot \\mathcal{L}\\left(\\mathbf{W}^{(m)} \\cdot F(x_i; \\theta_F)_{1:m}\\,;\\, y_i\\right)</div>\n<p>其中：\n- <span class=\"kb-math kb-math-inline\">F(x_i; \\theta_F)_{1:m}</span> 表示取表示向量的前 <span class=\"kb-math kb-math-inline\">m</span> 个维度\n- <span class=\"kb-math kb-math-inline\">\\mathbf{W}^{(m)} \\in \\mathbb{R}^{L \\times m}</span> 是维度 <span class=\"kb-math kb-math-inline\">m</span> 对应的独立线性分类器\n- <span class=\"kb-math kb-math-inline\">c_m \\geq 0</span> 是各尺度的重要性权重（实验中均设为 1）\n- <span class=\"kb-math kb-math-inline\">\\mathcal{L}</span> 是标准的 softmax 交叉熵损失</p>\n<div class=\"key-point\">💡 <strong>关键直觉</strong>：这个损失函数迫使编码器将最重要的信息编码在表示向量的前几个维度中，随着维度增加逐步补充更细粒度的信息——就像俄罗斯套娃一样，每一层都是完整的，但外层包含更多细节。</div>\n<h5>高效变体与框架适配</h5>\n<p><strong>MRL-E（Efficient MRL）</strong>：通过令 <span class=\"kb-math kb-math-inline\">\\mathbf{W}^{(m)} = \\mathbf{W}_{1:m}</span>（即所有分类器共享同一权重矩阵 <span class=\"kb-math kb-math-inline\">\\mathbf{W} \\in \\mathbb{R}^{L \\times d}</span> 的前 <span class=\"kb-math kb-math-inline\">m</span> 列），将分类器参数量减少近一半。实验表明 MRL-E 在 16 维以上仅损失约 1% 精度。</p>\n<p><strong>对比学习适配</strong>：在 ALIGN 等视觉-语言对比学习框架中，MRL 对两个被对比的嵌入分别应用嵌套约束，并在每个嵌套维度上独立进行归一化。</p>\n<p><strong>掩码语言模型适配</strong>：由于 BERT 的输入嵌入矩阵与输出分类器共享权重，MRL 自然退化为 MRL-E 形式。</p>\n<h5>自适应部署</h5>\n<p><img alt=\"自适应分类\" src=\"https://ar5iv.labs.arxiv.org/html/2205.13147/assets/x13.png\" />\n<em>图：自适应分类（AC）通过级联实现 14× 的表示压缩。MRL-AC 仅需平均 ~37 维即达到 512 维独立模型的 76.3% 精度。</em></p>\n<p><strong>自适应分类（AC）</strong>：利用 softmax 概率的置信度阈值决定是否需要更高维表示。对于\"简单\"样本，8 维表示即可给出高置信度预测；\"困难\"样本则逐步升级到更高维度。这种级联机制无需额外的神经网络前向传播，仅需在同一表示向量上截取不同长度的前缀。</p>\n<p><strong>自适应检索（AR）</strong>：两阶段流程——先用低维表示（如 <span class=\"kb-math kb-math-inline\">D_s=16</span>）从数据库中检索 <span class=\"kb-math kb-math-inline\">K=200</span> 个候选，再用高维表示（如 <span class=\"kb-math kb-math-inline\">D_r=2048</span>）重排序。在 ImageNet-1K 上，这种策略理论加速 ~128×，使用 HNSW 索引实际加速 ~14×，且检索精度与全维度单次检索相当。</p>\n<h5>与传统方法的对比优势</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>训练成本</th>\n<th>低维精度</th>\n<th>灵活性</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>独立训练 (FF)</td>\n<td><span class=\"kb-math kb-math-inline\">O(d)</span> 个模型</td>\n<td>基线</td>\n<td>需切换模型</td>\n</tr>\n<tr>\n<td>SVD 后处理</td>\n<td>1 个模型 + 压缩</td>\n<td>低维大幅下降</td>\n<td>需存储投影矩阵</td>\n</tr>\n<tr>\n<td>Slimmable Networks</td>\n<td>1 个模型</td>\n<td>低维大幅下降</td>\n<td>子网络切换</td>\n</tr>\n<tr>\n<td><strong>MRL</strong></td>\n<td><strong>1 个模型</strong></td>\n<td><strong>匹配或超越 FF</strong></td>\n<td><strong>前缀截取即可</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p>MRL 的训练开销仅比标准训练增加约 <span class=\"kb-math kb-math-inline\">O(\\log d)</span> 个线性分类器的计算量（相对于编码器的前向/反向传播可忽略），却获得了覆盖所有维度的多粒度表示能力。</p>",
      "quiz": {
        "q": "MRL 的嵌套维度集 M 通常包含多少个显式优化的维度？",
        "options": [
          "O(d) 个，覆盖所有可能的维度",
          "O(log d) 个，通过连续二倍递增选取",
          "固定 3 个维度：低、中、高",
          "O(√d) 个，均匀采样"
        ],
        "answer": 1,
        "explain": "MRL 选取 O(log d) 个嵌套维度（如 {8,16,32,...,2048}），通过连续二倍递增，仅需训练少量分类器即可使信息在所有维度上平滑插值。"
      }
    },
    {
      "id": "vjepa",
      "num": 15,
      "name": "V-JEPA",
      "fullName": "视频联合嵌入预测架构 (Video Joint-Embedding Predictive Architecture)",
      "year": "2024",
      "org": "Meta AI",
      "parent": "mae",
      "paperUrl": "https://arxiv.org/abs/2402.09379",
      "projectUrl": "",
      "category": "self_supervised",
      "motivation": "潜空间预测视频世界模型",
      "summary": "V-JEPA 提出在潜在特征空间（而非像素空间）中进行视频掩码预测的自监督学习方法，通过预测被遮蔽视频区域的抽象表征来学习通用视觉特征，无需像素级重建、负样本、文本监督或预训练图像编码器。",
      "keyPoints": [
        "<strong>联合嵌入预测架构</strong>：在特征空间而非像素空间进行预测，避免建模不必要的像素级细节",
        "<strong>多块时空掩码策略</strong>：对视频同时遮蔽多个时空区域（短时间范围 + 大空间范围），迫使模型学习高层语义",
        "<strong>三组件架构</strong>：Context Encoder（编码可见 patches）、Target Encoder（EMA 更新，生成预测目标）、Predictor（预测被遮蔽区域的表征）",
        "<strong>无像素解码器</strong>：完全抛弃像素重建目标，仅在表征空间计算 L2 预测损失",
        "<strong>VideoMix2M 数据集</strong>：在约 200 万视频片段上进行纯视频预训练",
        "<strong>冻结骨干评估</strong>：使用 attentive probe 在冻结特征上评估，验证表征的通用性",
        "<strong>视频与图像双任务表现优异</strong>：在 Kinetics-400、Something-Something-v2 等视频任务及 ImageNet 图像任务上均取得强竞争力"
      ],
      "detail": "<p><img alt=\"V-JEPA 架构示意图\" src=\"https://github.com/facebookresearch/jepa/assets/7530871/72df7ef0-2ef5-48bb-be46-27963db91f3d\" />\n<em>图：V-JEPA 预训练框架。左侧为掩码策略，右侧为联合嵌入预测架构。模型在特征空间预测被遮蔽区域的表征，而非重建像素。</em></p>\n<p><img alt=\"V-JEPA 掩码可视化\" src=\"https://github.com/facebookresearch/jepa/assets/7530871/f26b2e96-0227-44e2-b058-37e7bf1e10db\" />\n<em>图：V-JEPA 的多块掩码策略可视化。蓝色区域为可见 patches，灰色区域为被遮蔽的预测目标。</em></p>\n<pre><code class=\"language-python\"># V-JEPA 预训练伪代码\n# 输入: 视频 V, Context Encoder f_θ, Target Encoder f_ξ (EMA), Predictor g_φ\n\nfor video_batch in dataloader:\n    # 1. 将视频分割为时空 patches\n    patches = patchify(video_batch)  # (B, T, H, W) -&gt; (B, N, D)\n\n    # 2. 多块掩码采样：选择多个时空块作为预测目标\n    mask_target, mask_context = multi_block_masking(patches)\n    # mask_target: 多个短时间、大空间范围的块\n    # mask_context: 剩余可见区域\n\n    # 3. Context Encoder 编码可见 patches\n    x_context = patches[mask_context]\n    h_context = f_theta(x_context)  # 编码可见区域\n\n    # 4. Target Encoder (EMA, stop-grad) 编码目标 patches\n    with no_grad():\n        x_target = patches[mask_target]\n        h_target = f_xi(x_target)  # 生成预测目标\n\n    # 5. Predictor 基于可见表征预测被遮蔽区域表征\n    h_pred = g_phi(h_context, mask_positions)\n\n    # 6. 计算 L2 预测损失\n    loss = MSE(h_pred, h_target.detach())\n\n    # 7. 更新 Context Encoder 和 Predictor\n    loss.backward()\n    optimizer.step()\n\n    # 8. EMA 更新 Target Encoder\n    f_xi = momentum * f_xi + (1 - momentum) * f_theta\n</code></pre>\n<h5>动机与背景</h5>\n<p>视频自监督学习的传统方法主要分为两类：</p>\n<ol>\n<li>\n<p><strong>像素重建方法</strong>（如 VideoMAE）：在像素空间重建被遮蔽的视频区域。这类方法需要建模大量低层次的像素细节（如纹理、光照变化），计算开销大且可能迫使模型浪费容量在非语义信息上。</p>\n</li>\n<li>\n<p><strong>对比学习方法</strong>（如 MoCo、DINO）：通过正负样本对比学习不变性表征。这类方法需要精心设计数据增强，且可能丢失对细粒度时空变化的敏感性。</p>\n</li>\n</ol>\n<p>V-JEPA 的核心洞察是：<strong>一个好的视频世界模型应该在抽象的语义空间中进行预测，而非在像素空间</strong>。这一思想源自 Yann LeCun 提出的联合嵌入预测架构（JEPA）框架，V-JEPA 将其扩展到视频领域。</p>\n<div class=\"key-point\">💡 关键：像素空间包含大量与语义无关的信息（如精确纹理、光照），在潜空间预测可以自然地过滤这些噪声，让模型聚焦于高层语义结构。</div>\n<h5>核心机制</h5>\n<p><strong>1. 联合嵌入预测（Joint-Embedding Prediction）</strong></p>\n<p>与 MAE 类方法在像素空间重建不同，V-JEPA 的预测目标是 Target Encoder 输出的特征表征：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L} = \\frac{1}{|\\mathcal{M}|} \\sum_{i \\in \\mathcal{M}} \\| g_\\phi(h_{\\text{context}}, i) - \\text{sg}(f_\\xi(x_i)) \\|_2^2</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\mathcal{M}</span> 为被遮蔽的 patch 索引集合，<span class=\"kb-math kb-math-inline\">g_\\phi</span> 为 Predictor，<span class=\"kb-math kb-math-inline\">f_\\xi</span> 为 Target Encoder（通过 EMA 更新），<span class=\"kb-math kb-math-inline\">\\text{sg}</span> 表示 stop-gradient。</p>\n<p><strong>2. 多块时空掩码策略（Multi-Block Masking）</strong></p>\n<p>V-JEPA 采用精心设计的掩码策略来控制预测任务的难度：</p>\n<ul>\n<li><strong>目标块</strong>：采样多个（通常 4-8 个）时空块，每个块覆盖较短的时间范围（如 2 帧）但较大的空间范围（如图像面积的 15%-20%）</li>\n<li><strong>上下文块</strong>：一个覆盖较长时间范围的大块（如完整视频长度的 70%-90%），但空间上与目标块互补</li>\n</ul>\n<p>这种设计的直觉是：\n- 短时间掩码 → 模型需要理解运动和时间动态\n- 大空间掩码 → 模型需要理解全局语义结构\n- 多块预测 → 增加任务多样性，防止捷径解</p>\n<p><strong>3. EMA Target Encoder</strong></p>\n<p>Target Encoder <span class=\"kb-math kb-math-inline\">f_\\xi</span> 通过指数移动平均（EMA）从 Context Encoder <span class=\"kb-math kb-math-inline\">f_\\theta</span> 更新：</p>\n<div class=\"kb-math kb-math-display\">\\xi \\leftarrow m \\cdot \\xi + (1 - m) \\cdot \\theta</div>\n<p>其中动量系数 <span class=\"kb-math kb-math-inline\">m</span> 通常从 0.996 线性增加到 1.0。EMA 机制提供稳定的预测目标，防止表征坍缩（representation collapse）——即所有输入映射到相同表征的退化解。</p>\n<div class=\"warn-box\">⚠️ 注意：与对比学习不同，V-JEPA 不需要负样本来防止坍缩。EMA + Predictor 的组合本身就足以避免退化解，因为 Predictor 的存在使得 Encoder 不需要将所有信息压缩到不变表征中。</div>\n<p><strong>4. 架构细节</strong></p>\n<ul>\n<li><strong>Encoder</strong>：标准 Vision Transformer (ViT)，支持 ViT-L/16 和 ViT-H/16 配置</li>\n<li><strong>Patch Embedding</strong>：将视频帧分割为 <span class=\"kb-math kb-math-inline\">2 \\times 16 \\times 16</span> 的时空 patches（时间步长 2，空间步长 16）</li>\n<li><strong>Predictor</strong>：轻量级 Transformer（通常 12 层，宽度为 Encoder 的一半），接收可见 patch 表征和目标位置编码作为输入</li>\n<li><strong>位置编码</strong>：使用 3D 正弦位置编码，编码时间和空间位置信息</li>\n</ul>\n<h5>训练与推理流程</h5>\n<p><strong>预训练阶段：</strong>\n1. 从 VideoMix2M 数据集采样视频片段（16 帧，224×224 分辨率）\n2. 应用多块时空掩码，分离上下文和目标区域\n3. Context Encoder 编码可见 patches → 特征序列\n4. Target Encoder（EMA，无梯度）编码目标 patches → 预测目标\n5. Predictor 接收上下文特征 + 目标位置编码 → 预测目标特征\n6. 计算 L2 损失，反向传播更新 Context Encoder 和 Predictor\n7. EMA 更新 Target Encoder</p>\n<p><strong>下游评估（Frozen Evaluation）：</strong>\n1. 冻结预训练的 Encoder 参数\n2. 在 Encoder 输出上训练轻量级 attentive probe（注意力池化 + 线性分类器）\n3. 在目标任务数据集上评估分类准确率</p>\n<h5>与传统方法的区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>VideoMAE (像素重建)</th>\n<th>对比学习 (DINO等)</th>\n<th>V-JEPA (特征预测)</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>预测空间</td>\n<td>像素空间</td>\n<td>—</td>\n<td>潜在特征空间</td>\n</tr>\n<tr>\n<td>需要解码器</td>\n<td>✅ 像素解码器</td>\n<td>❌</td>\n<td>❌</td>\n</tr>\n<tr>\n<td>需要负样本</td>\n<td>❌</td>\n<td>✅</td>\n<td>❌</td>\n</tr>\n<tr>\n<td>需要数据增强</td>\n<td>掩码即增强</td>\n<td>大量增强</td>\n<td>掩码即增强</td>\n</tr>\n<tr>\n<td>建模低层细节</td>\n<td>✅ 必须重建纹理</td>\n<td>❌</td>\n<td>❌ 自动过滤</td>\n</tr>\n<tr>\n<td>时间建模</td>\n<td>隐式</td>\n<td>弱</td>\n<td>显式（时空掩码）</td>\n</tr>\n<tr>\n<td>表征通用性</td>\n<td>需微调</td>\n<td>冻结可用</td>\n<td>冻结可用</td>\n</tr>\n</tbody>\n</table></div>\n<p>V-JEPA 的核心优势在于：在不需要像素重建的情况下，通过特征空间预测自然地学到了既包含空间语义又包含时间动态的通用表征，且这些表征在冻结状态下即可直接用于多种下游任务。</p>",
      "quiz": {
        "q": "V-JEPA 相比 VideoMAE 最本质的区别是什么？",
        "options": [
          "使用了更大的 ViT 模型",
          "在潜在特征空间而非像素空间进行掩码预测",
          "使用了对比学习损失函数",
          "需要文本监督信号辅助训练"
        ],
        "answer": 1,
        "explain": "V-JEPA 的核心创新是将预测目标从像素空间转移到潜在特征空间，通过 Target Encoder 生成抽象表征作为预测目标，避免建模不必要的像素级细节。"
      }
    },
    {
      "id": "dinov3",
      "num": 16,
      "name": "DINOv3",
      "fullName": "DINOv3",
      "year": "2025.08",
      "org": "Meta AI",
      "parent": "moco",
      "paperUrl": "—",
      "projectUrl": "",
      "category": "self_supervised",
      "motivation": "Gram锚定解决密集特征退化",
      "summary": "DINOv3 提出**Gram 矩阵锚定（Gram Anchoring）**机制，在自蒸馏视觉预训练框架中通过约束学生网络的特征通道相关性结构与教师网络保持一致，从根本上解决了 DINOv2 等方法在长程训练和大规模扩展中出现的**密集特征退化（dense feature degradation）**问题，使单一模型同时在全局语义任务和密集预测任务上达到最优。",
      "keyPoints": [
        "<strong>密集特征退化问题</strong>：识别出 DINOv2 在扩展训练中 [CLS] 全局损失主导导致 patch token 空间判别力下降的系统性缺陷",
        "<strong>Gram 矩阵锚定损失</strong>：引入 <span class=\"kb-math kb-math-inline\">\\mathcal{L}_{\\text{Gram}}</span>，约束学生网络中间层特征的 Gram 矩阵（通道相关性矩阵）与教师网络对齐，保持密集特征的结构完整性",
        "<strong>三重损失协同框架</strong>：全局自蒸馏损失（DINO）+ 掩码补丁预测损失（iBOT）+ Gram 锚定损失，三者互补",
        "<strong>多尺度 Gram 计算</strong>：在 ViT 的多个 Transformer 层提取 Gram 矩阵，捕获从低级纹理到高级语义的多层次空间相关性",
        "<strong>自适应锚定权重</strong>：根据训练进度动态调节 Gram 损失权重，早期强约束防止退化，后期松弛允许特征精化",
        "<strong>Student-Teacher 动量蒸馏架构</strong>：继承 MoCo/DINO 的 EMA 动量更新教师网络范式",
        "<strong>统一密集-全局表征</strong>：单一 ViT-g 模型在 ImageNet 分类、ADE20K 语义分割、COCO 检测与 NYUv2 深度估计上均达到 SOTA"
      ],
      "detail": "<h5>核心框架图</h5>\n<pre><code>┌─────────────────────────────────────────────────────────────┐\n│                    DINOv3 训练框架                            │\n│                                                             │\n│  Image x ──┬── [augment] ──→ Student ViT (θ_s)             │\n│             │                    │                          │\n│             │              ┌─────┼─────────┐                │\n│             │              ▼     ▼         ▼                │\n│             │          [CLS]  [patch]  Gram(F_l)            │\n│             │              │     │         │                │\n│             └── [augment + mask] ──→ Teacher ViT (θ_t, EMA) │\n│                                │     │         │            │\n│                            [CLS]  [patch]  Gram(F_l)        │\n│                                │     │         │            │\n│                                ▼     ▼         ▼            │\n│                          L_dino  L_ibot   L_gram            │\n│                                │     │         │            │\n│                                └─────┴─────────┘            │\n│                                       │                     │\n│                                  Total Loss                 │\n│                          L = L_dino + L_ibot + λ·L_gram     │\n└─────────────────────────────────────────────────────────────┘\n</code></pre>\n<p><em>图：DINOv3 训练框架示意。在 DINO 自蒸馏和 iBOT 掩码预测基础上，新增 Gram 锚定损失分支，约束学生与教师的中间层特征通道相关性结构保持一致。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># DINOv3 训练伪代码 (PyTorch 风格)\n# student, teacher: ViT 编码器\n# m: 动量系数 (0.996 → 1.0 cosine schedule)\n# τ_s, τ_t: 学生/教师温度\n# λ(t): Gram 损失自适应权重\n\nteacher.params = student.params  # 初始化\n\nfor x in loader:\n    # === 数据增强 ===\n    views_global = [aug_global(x), aug_global(x)]   # 2 个全局视图 (224×224)\n    views_local = [aug_local(x) for _ in range(8)]   # 8 个局部视图 (96×96)\n    mask = random_block_mask(views_global)            # 块状掩码\n\n    # === 前向传播 ===\n    # 学生：处理所有视图（全局视图带掩码）\n    s_cls, s_patch, s_feats = student(views_global, views_local, mask)\n    # 教师：仅处理全局视图（无掩码）\n    with no_grad():\n        t_cls, t_patch, t_feats = teacher(views_global)\n\n    # === 损失 1: DINO 全局自蒸馏 (CLS token) ===\n    L_dino = 0\n    for s_c in s_cls:\n        for t_c in t_cls:\n            if s_c.view != t_c.view:  # 跨视图蒸馏\n                p_t = softmax(t_c / τ_t).detach()\n                p_s = log_softmax(s_c / τ_s)\n                L_dino += -sum(p_t * p_s)\n\n    # === 损失 2: iBOT 掩码补丁预测 ===\n    L_ibot = 0\n    for masked_s, target_t in zip(s_patch[masked], t_patch[masked]):\n        p_t = softmax(target_t / τ_t).detach()\n        p_s = log_softmax(masked_s / τ_s)\n        L_ibot += -sum(p_t * p_s)\n\n    # === 损失 3: Gram 锚定 (核心创新) ===\n    L_gram = 0\n    for l in gram_layers:  # 多个中间层\n        F_s = s_feats[l]   # 学生第 l 层特征: (B, N, C)\n        F_t = t_feats[l]   # 教师第 l 层特征: (B, N, C)\n\n        # 计算 Gram 矩阵: 通道间相关性\n        G_s = bmm(F_s.transpose(1,2), F_s) / N  # (B, C, C)\n        G_t = bmm(F_t.transpose(1,2), F_t) / N  # (B, C, C)\n\n        # Frobenius 范数约束\n        L_gram += ||G_s - G_t.detach()||_F^2 / C^2\n\n    # === 总损失 ===\n    loss = L_dino + L_ibot + λ(t) * L_gram\n    loss.backward()\n    update(student.params)\n\n    # === 动量更新教师 ===\n    teacher.params = m * teacher.params + (1 - m) * student.params\n</code></pre>\n<h5>方法详解</h5>\n<p><strong>1. 动机与背景：密集特征退化问题</strong></p>\n<p>自监督视觉预训练的目标是学习一组<strong>通用视觉特征</strong>，既能支持图像分类等全局语义任务，也能支持语义分割、目标检测、深度估计等密集预测任务。DINOv2 通过结合 DINO 自蒸馏损失（作用于 [CLS] token）和 iBOT 掩码预测损失（作用于 patch tokens）取得了显著进展，但在实践中暴露出一个系统性问题——<strong>密集特征退化（Dense Feature Degradation）</strong>：</p>\n<ul>\n<li>随着训练推进，[CLS] token 的全局蒸馏损失逐渐主导优化方向</li>\n<li>Patch token 的特征逐渐丧失空间判别力，趋向于编码全局语义而非局部细节</li>\n<li>具体表现为：patch token 之间的余弦相似度异常升高（特征坍缩的前兆），在密集预测任务上的性能先升后降</li>\n</ul>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：这一退化现象在模型规模越大、训练时间越长时越严重。ViT-g 在 DINOv2 框架下训练超过一定 epoch 后，ADE20K 分割 mIoU 反而下降 2-3 个百分点，而 ImageNet 线性分类精度仍在提升——这说明全局与密集目标之间存在根本性的优化冲突。</div>\n<p><strong>2. 核心机制：Gram 矩阵锚定</strong></p>\n<p>DINOv3 的核心洞察是：<strong>密集特征的质量可以通过特征通道之间的相关性结构来衡量和保护</strong>。具体地，对于 ViT 第 <span class=\"kb-math kb-math-inline\">l</span> 层输出的特征图 <span class=\"kb-math kb-math-inline\">F^{(l)} \\in \\mathbb{R}^{N \\times C}</span>（<span class=\"kb-math kb-math-inline\">N</span> 为 patch 数量，<span class=\"kb-math kb-math-inline\">C</span> 为通道维度），其 Gram 矩阵定义为：</p>\n<div class=\"kb-math kb-math-display\">G^{(l)} = \\frac{1}{N} {F^{(l)}}^\\top F^{(l)} \\in \\mathbb{R}^{C \\times C}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">G^{(l)}_{ij} = \\frac{1}{N}\\sum_{s=1}^{N} f_i(s) \\cdot f_j(s)</span> 表示第 <span class=\"kb-math kb-math-inline\">i</span> 和第 <span class=\"kb-math kb-math-inline\">j</span> 个通道在所有空间位置上的相关性。</p>\n<div class=\"key-point\">💡 <strong>关键洞察</strong>：Gram 矩阵编码了特征的\"结构指纹\"——它不关心每个 patch 的具体值，而关心通道之间的协同激活模式。当密集特征退化时，patch token 趋于同质化，Gram 矩阵的秩会下降（通道相关性结构坍缩）。通过锚定教师网络的 Gram 矩阵，可以强制学生网络保持丰富的通道相关性结构，从而间接保护密集特征的空间判别力。</div>\n<p>Gram 锚定损失定义为：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{Gram}} = \\sum_{l \\in \\mathcal{S}} \\frac{1}{C^2} \\left\\| G_s^{(l)} - \\text{sg}\\left(G_t^{(l)}\\right) \\right\\|_F^2</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\mathcal{S}</span> 是选定的中间层集合，<span class=\"kb-math kb-math-inline\">\\text{sg}(\\cdot)</span> 表示停止梯度（stop-gradient），<span class=\"kb-math kb-math-inline\">\\|\\cdot\\|_F</span> 为 Frobenius 范数。</p>\n<p><strong>3. 多尺度 Gram 锚定</strong></p>\n<p>DINOv3 并非仅在最后一层计算 Gram 矩阵，而是在 ViT 的<strong>多个中间层</strong>提取 Gram 约束：</p>\n<ul>\n<li><strong>浅层（Layer 4-8）</strong>：捕获低级纹理和边缘的通道相关性，防止局部细节信息丢失</li>\n<li><strong>中层（Layer 12-16）</strong>：捕获中级语义（部件、区域）的结构关系</li>\n<li><strong>深层（Layer 20-24）</strong>：捕获高级语义的通道交互模式</li>\n</ul>\n<p>这种多尺度设计确保了从底层纹理到高层语义的完整特征层次结构都受到保护。实验表明，仅在单一层施加 Gram 约束效果有限，多尺度组合带来 1.5-2.0 mIoU 的额外提升。</p>\n<p><strong>4. 自适应锚定权重调度</strong></p>\n<p>Gram 损失权重 <span class=\"kb-math kb-math-inline\">\\lambda(t)</span> 并非固定常数，而是随训练进度自适应调节：</p>\n<div class=\"kb-math kb-math-display\">\\lambda(t) = \\lambda_{\\max} \\cdot \\left(1 - \\frac{t}{T}\\right)^\\gamma + \\lambda_{\\min}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">T</span> 为总训练步数，<span class=\"kb-math kb-math-inline\">\\gamma</span> 控制衰减速率。设计直觉：</p>\n<ul>\n<li><strong>训练早期</strong>（<span class=\"kb-math kb-math-inline\">\\lambda</span> 较大）：特征结构尚未稳定，需要强 Gram 约束防止密集特征过早退化</li>\n<li><strong>训练后期</strong>（<span class=\"kb-math kb-math-inline\">\\lambda</span> 较小）：特征结构已稳定，适当松弛约束允许模型在全局语义方向上进一步精化</li>\n</ul>\n<div class=\"key-point\">💡 <strong>关键</strong>：这种\"先紧后松\"的调度策略类似于学习率 warmup 的逆过程——在特征最脆弱的阶段提供最强保护。</div>\n<p><strong>5. 与 DINO/DINOv2 的继承与创新</strong></p>\n<p>DINOv3 的整体框架继承自 DINOv2 的 Student-Teacher 自蒸馏范式：</p>\n<ul>\n<li><strong>教师网络</strong>：通过指数移动平均（EMA）更新，动量系数从 0.996 余弦退火至 1.0</li>\n<li><strong>学生网络</strong>：通过梯度下降优化</li>\n<li><strong>多视图策略</strong>：2 个全局视图（224×224）+ 多个局部视图（96×96）</li>\n<li><strong>掩码策略</strong>：对全局视图施加块状随机掩码（block masking）</li>\n</ul>\n<p>关键区别在于损失函数的组成：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>组件</th>\n<th>DINO</th>\n<th>DINOv2</th>\n<th>DINOv3</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>全局自蒸馏（[CLS]）</td>\n<td>✅</td>\n<td>✅</td>\n<td>✅</td>\n</tr>\n<tr>\n<td>掩码补丁预测（iBOT）</td>\n<td>❌</td>\n<td>✅</td>\n<td>✅</td>\n</tr>\n<tr>\n<td>Gram 锚定</td>\n<td>❌</td>\n<td>❌</td>\n<td>✅</td>\n</tr>\n<tr>\n<td>密集特征保护</td>\n<td>无</td>\n<td>间接（iBOT）</td>\n<td>显式（Gram）</td>\n</tr>\n<tr>\n<td>大规模训练稳定性</td>\n<td>一般</td>\n<td>中等</td>\n<td>强</td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>6. 为什么 Gram 矩阵而非其他正则化？</strong></p>\n<p>DINOv3 论文对比了多种防止密集特征退化的替代方案：</p>\n<ul>\n<li><strong>直接特征蒸馏</strong>（<span class=\"kb-math kb-math-inline\">\\|F_s - F_t\\|^2</span>）：过度约束，限制了学生网络的表达自由度，全局性能下降</li>\n<li><strong>CKA（Centered Kernel Alignment）</strong>：计算开销大，且对特征的线性变换不变性过强</li>\n<li><strong>特征正交性约束</strong>：仅防止通道坍缩，不保护空间结构</li>\n<li><strong>Gram 矩阵</strong>：在约束强度和计算效率之间取得最佳平衡——它保护通道相关性结构（间接保护空间判别力），同时允许特征在正交变换下自由调整</li>\n</ul>\n<p>Gram 矩阵的计算复杂度为 <span class=\"kb-math kb-math-inline\">O(NC^2)</span>，对于 ViT-g（<span class=\"kb-math kb-math-inline\">C=1536</span>，<span class=\"kb-math kb-math-inline\">N=256</span>）仅增加约 3% 的训练开销。</p>\n<p><strong>7. 训练配置与关键超参数</strong></p>\n<ul>\n<li><strong>骨干网络</strong>：ViT-g/14（1.1B 参数）</li>\n<li><strong>训练数据</strong>：LVD-142M（DINOv2 同款策展数据集）</li>\n<li><strong>训练 epoch</strong>：625 epoch（DINOv2 为 500 epoch，得益于 Gram 锚定可以训练更久而不退化）</li>\n<li><strong>Gram 层选择</strong>：<span class=\"kb-math kb-math-inline\">\\mathcal{S} = \\{6, 12, 18, 24, 30, 36\\}</span>（ViT-g 共 40 层，每隔 6 层采样）</li>\n<li><strong><span class=\"kb-math kb-math-inline\">\\lambda_{\\max} = 1.0</span>，<span class=\"kb-math kb-math-inline\">\\lambda_{\\min} = 0.01</span>，<span class=\"kb-math kb-math-inline\">\\gamma = 2.0</span></strong></li>\n<li><strong>动量调度</strong>：<span class=\"kb-math kb-math-inline\">m</span> 从 0.996 余弦退火至 1.0</li>\n</ul>\n<h5>与传统方法的关键区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>DINOv2</th>\n<th>DINOv3</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>密集特征保护</td>\n<td>仅依赖 iBOT（间接）</td>\n<td>Gram 锚定（显式结构约束）</td>\n</tr>\n<tr>\n<td>长程训练稳定性</td>\n<td>&gt;500 epoch 后退化</td>\n<td>625+ epoch 仍持续提升</td>\n</tr>\n<tr>\n<td>全局-密集平衡</td>\n<td>存在优化冲突</td>\n<td>三重损失协同消除冲突</td>\n</tr>\n<tr>\n<td>额外计算开销</td>\n<td>—</td>\n<td>仅增加 ~3%</td>\n</tr>\n<tr>\n<td>ADE20K mIoU (ViT-g)</td>\n<td>49.0</td>\n<td>51.8</td>\n</tr>\n<tr>\n<td>ImageNet 线性探测</td>\n<td>86.5</td>\n<td>87.1</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 <strong>核心创新总结</strong>：DINOv3 的 Gram 锚定是一种优雅的\"结构正则化\"——它不直接约束特征值，而是约束特征之间的关系结构。这种间接约束既足够强以防止密集特征退化，又足够弱以不妨碍全局表征的优化，实现了自监督视觉预训练中全局与密集目标的帕累托最优。</div>",
      "quiz": {
        "q": "DINOv3 中 Gram 锚定损失的核心作用是什么？",
        "options": [
          "加速教师网络的动量更新收敛",
          "约束学生网络特征的通道相关性结构与教师一致，防止密集特征退化",
          "增大负样本队列的有效容量",
          "替代 iBOT 掩码预测损失以简化训练流程"
        ],
        "answer": 1,
        "explain": "Gram 矩阵编码了特征通道之间的相关性结构。通过约束学生网络的 Gram 矩阵与教师网络对齐，DINOv3 显式保护了密集特征的空间判别力，解决了长程训练中全局损失主导导致的 patch token 退化问题。"
      }
    },
    {
      "id": "gemini_emb",
      "num": 17,
      "name": "Gemini Embedding 2",
      "fullName": "Gemini Embedding 2",
      "year": "2026.03",
      "org": "Google",
      "parent": "bert",
      "paperUrl": "—",
      "projectUrl": "",
      "category": "multimodal",
      "motivation": "原生多模态3072维统一空间",
      "summary": "Gemini Embedding 2 基于 Gemini 大模型家族，将文本、图像、音频、视频和文档统一映射到 3072 维共享向量空间，通过指令式任务描述（Instruction-based Task Specification）实现非对称/对称检索的灵活切换，是首个原生支持五种模态的通用嵌入模型。",
      "keyPoints": [
        "<strong>五模态统一嵌入</strong>：文本、图像（JPEG/PNG/GIF/BMP/WebP）、音频（MP3/WAV）、视频（MP4/MOV）、文档（PDF）共享 3072 维向量空间",
        "<strong>8192 token 共享上下文窗口</strong>：所有模态共享同一 token 预算（Audio 25 tok/s, Video 66 tok/frame, Image 258 tok/img, PDF 258 tok/page）",
        "<strong>指令式任务规范</strong>：用自然语言 prompt 替代传统 <code>task_type</code> 枚举，支持 search query/document、QA、fact verification、code retrieval、classification、clustering、similarity 等任务",
        "<strong>Matryoshka 表示学习（MRL）</strong>：支持通过 <code>output_dimensionality</code> 参数降维至任意维度，非默认维度输出已 L2 归一化",
        "<strong>视频多模态融合</strong>：支持可配置 FPS 采样、音轨提取（<code>audio_track_extraction</code>）、时间片段裁剪（<code>start_offset</code>/<code>end_offset</code>），实现视觉+听觉联合嵌入"
      ],
      "detail": "<h5>架构总览</h5>\n<pre><code>┌─────────────────────────────────────────────────────────────────┐\n│                    Gemini Embedding 2 Pipeline                   │\n├─────────────────────────────────────────────────────────────────┤\n│                                                                 │\n│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────┐ │\n│  │  Text   │  │  Image  │  │  Audio  │  │  Video  │  │ PDF │ │\n│  │Tokenizer│  │Tokenizer│  │Tokenizer│  │Tokenizer│  │ OCR │ │\n│  │         │  │258 tok/ │  │25 tok/s │  │66 tok/  │  │258/ │ │\n│  │         │  │  image  │  │         │  │ frame   │  │page │ │\n│  └────┬────┘  └────┬────┘  └────┬────┘  └────┬────┘  └──┬──┘ │\n│       │             │            │             │           │     │\n│       └──────┬──────┴─────┬──────┴──────┬──────┴───────┬──┘     │\n│              │            │             │              │         │\n│              ▼            ▼             ▼              ▼         │\n│  ┌───────────────────────────────────────────────────────────┐  │\n│  │         Shared Token Sequence (max 8192 tokens)           │  │\n│  └───────────────────────────────────┬───────────────────────┘  │\n│                                      │                          │\n│  ┌───────────────────────────────────▼───────────────────────┐  │\n│  │              Instruction Prefix (Task Prompt)              │  │\n│  │  e.g. &quot;Given a search query, retrieve relevant passages&quot;  │  │\n│  └───────────────────────────────────┬───────────────────────┘  │\n│                                      │                          │\n│  ┌───────────────────────────────────▼───────────────────────┐  │\n│  │           Gemini Transformer Backbone (Decoder)            │  │\n│  │              Multi-head Self-Attention + FFN                │  │\n│  └───────────────────────────────────┬───────────────────────┘  │\n│                                      │                          │\n│  ┌───────────────────────────────────▼───────────────────────┐  │\n│  │              Pooling → L2 Normalize                        │  │\n│  │         Output: 3072-d (or MRL truncated to d')           │  │\n│  └───────────────────────────────────────────────────────────┘  │\n│                                                                 │\n└─────────────────────────────────────────────────────────────────┘\n</code></pre>\n<p><em>图：Gemini Embedding 2 多模态嵌入流水线。各模态经专用 tokenizer 编码后拼接为统一 token 序列，前置任务指令后送入 Gemini Transformer 骨干网络，最终经池化和归一化输出固定维度向量。</em></p>\n<h5>核心伪代码</h5>\n<pre><code class=\"language-python\"># Gemini Embedding 2 — 多模态嵌入推理伪代码\ndef gemini_embed(content_parts, instruction=None, output_dim=3072):\n    &quot;&quot;&quot;\n    content_parts: List[Part] — 可混合 text/image/audio/video/pdf\n    instruction: str — 任务描述 (e.g. &quot;Classify the topic of this document&quot;)\n    output_dim: int — 输出维度 (MRL 支持任意 ≤ 3072)\n    &quot;&quot;&quot;\n    tokens = []\n\n    # Step 1: 多模态 Tokenization (共享 8192 token 预算)\n    for part in content_parts:\n        if part.type == &quot;text&quot;:\n            tokens += text_tokenize(part.text)          # BPE tokens\n        elif part.type == &quot;image&quot;:\n            tokens += image_tokenize(part.data)         # 258 tokens/image\n        elif part.type == &quot;audio&quot;:\n            tokens += audio_tokenize(part.data)         # 25 tokens/second\n        elif part.type == &quot;video&quot;:\n            frames = sample_frames(part, fps=part.fps)  # default 1 FPS\n            for frame in frames:\n                tokens += image_tokenize(frame)         # 66 tokens/frame\n                tokens += timestamp_tokens(frame.time)  # 10 tokens/second\n            if part.audio_track_extraction:\n                tokens += audio_tokenize(part.audio)    # 25 tokens/second\n        elif part.type == &quot;pdf&quot;:\n            tokens += ocr_tokenize(part.pages)          # 258 tokens/page\n\n    tokens = tokens[:8192]  # 超出静默截断\n\n    # Step 2: 前置任务指令\n    if instruction:\n        input_seq = tokenize(instruction) + tokens\n    else:\n        input_seq = tokens\n\n    # Step 3: Transformer 前向传播\n    hidden_states = gemini_transformer(input_seq)  # Decoder backbone\n\n    # Step 4: 池化 + Matryoshka 截断 + 归一化\n    embedding = pooling(hidden_states)             # [3072]\n    if output_dim &lt; 3072:\n        embedding = embedding[:output_dim]         # MRL truncation\n    embedding = l2_normalize(embedding)\n\n    return embedding  # unit vector in R^output_dim\n</code></pre>\n<h5>动机与背景</h5>\n<p>传统嵌入模型面临三大局限：</p>\n<ol>\n<li><strong>模态割裂</strong>：文本嵌入（如 text-embedding-005）、图像嵌入（如 CLIP）、音频嵌入各自独立，跨模态检索需要额外对齐层</li>\n<li><strong>任务僵化</strong>：通过 <code>task_type</code> 枚举（如 RETRIEVAL_DOCUMENT、CLUSTERING）指定任务，无法覆盖长尾场景</li>\n<li><strong>维度固定</strong>：输出维度不可调，无法在精度与存储/计算成本间灵活权衡</li>\n</ol>\n<p>Gemini Embedding 2 通过以下设计解决上述问题：</p>\n<h5>核心机制详解</h5>\n<p><strong>1. 统一多模态 Tokenizer 体系</strong></p>\n<p>Gemini Embedding 2 继承 Gemini 大模型的多模态 tokenizer 架构。各模态的 token 消耗率经过精心设计以平衡信息密度：</p>\n<div class=\"kb-math kb-math-display\">\\text{Total Tokens} = \\sum_{m \\in \\text{modalities}} n_m \\cdot r_m \\leq 8192</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">r_m</span> 为各模态的 token 消耗率：\n- 文本：约 1 token/word（BPE）\n- 图像：258 tokens/image（固定，与分辨率无关，模型内部 resize 至 512×512）\n- 音频：25 tokens/second（语音优化）\n- 视频帧：66 tokens/frame\n- PDF 页面：258 tokens/page（含 OCR）</p>\n<div class=\"key-point\">💡 关键：所有模态共享同一 8192 token 上下文窗口，这意味着多模态输入存在 token 竞争——例如一段 81 秒的视频（含音轨）将耗尽全部 token 预算。</div>\n<p><strong>2. 指令式任务规范（Instruction-based Task Specification）</strong></p>\n<p>区别于前代模型的枚举式 <code>task_type</code>，Gemini Embedding 2 使用自然语言指令前缀来定义嵌入的语义行为：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>任务类型</th>\n<th>指令示例</th>\n<th>语义特性</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>搜索查询</td>\n<td>\"Given a web search query, retrieve relevant passages\"</td>\n<td>非对称（query→doc）</td>\n</tr>\n<tr>\n<td>搜索文档</td>\n<td>\"Represent this document for retrieval\"</td>\n<td>非对称（doc 侧）</td>\n</tr>\n<tr>\n<td>QA 问题</td>\n<td>\"Given a question, retrieve passages that answer it\"</td>\n<td>非对称</td>\n</tr>\n<tr>\n<td>事实验证</td>\n<td>\"Verify this claim against evidence documents\"</td>\n<td>非对称</td>\n</tr>\n<tr>\n<td>代码检索</td>\n<td>\"Given a code search query, retrieve relevant code\"</td>\n<td>非对称</td>\n</tr>\n<tr>\n<td>分类</td>\n<td>\"Classify the topic of this text\"</td>\n<td>对称</td>\n</tr>\n<tr>\n<td>聚类</td>\n<td>\"Identify the cluster this text belongs to\"</td>\n<td>对称</td>\n</tr>\n<tr>\n<td>语义相似度</td>\n<td>\"Determine semantic similarity\"</td>\n<td>对称</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"warn-box\">⚠️ 注意：非对称任务中，query 侧和 document 侧必须使用<strong>不同的指令</strong>，否则检索效果显著下降。</div>\n<p><strong>3. Matryoshka 表示学习（MRL）</strong></p>\n<p>模型训练时采用 Matryoshka Representation Learning 策略，在多个维度切片上同时优化对比损失：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{MRL}} = \\sum_{d \\in \\mathcal{D}} \\lambda_d \\cdot \\mathcal{L}_{\\text{contrastive}}(\\mathbf{e}_{1:d}, \\mathbf{e}^+_{1:d}, \\mathbf{e}^-_{1:d})</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\mathcal{D} = \\{128, 256, 512, 768, 1024, 3072\\}</span> 为训练时的维度集合。这使得用户可以在推理时选择任意 <span class=\"kb-math kb-math-inline\">d \\leq 3072</span> 的输出维度，低维嵌入仍保持高质量的语义区分能力。</p>\n<div class=\"key-point\">💡 关键：Gemini Embedding 2 对非默认维度的输出<strong>自动 L2 归一化</strong>（区别于 gemini-embedding-001 需用户手动归一化），确保余弦相似度直接可用。</div>\n<p><strong>4. 视频嵌入的时空融合</strong></p>\n<p>视频嵌入支持三个可配置参数：\n- <code>fps</code>：帧采样率（默认 1 FPS），控制时间分辨率\n- <code>start_offset</code> / <code>end_offset</code>：时间片段裁剪\n- <code>audio_track_extraction</code>：是否提取音轨</p>\n<p>当启用音轨提取时，每秒视频消耗的 token 数为：</p>\n<div class=\"kb-math kb-math-display\">\\text{tokens/sec} = \\text{fps} \\times 66 + 25 + 10 = 101 \\text{ (at 1 FPS)}</div>\n<p>其中 10 tokens/second 用于时间戳编码（格式 \"mm:ss\"，每秒 2 个时间戳）。</p>\n<h5>与传统方法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>text-embedding-005</th>\n<th>CLIP</th>\n<th>multimodalembedding@001</th>\n<th><strong>Gemini Embedding 2</strong></th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>模态</td>\n<td>纯文本</td>\n<td>文本+图像</td>\n<td>文本+图像+视频</td>\n<td>文本+图像+音频+视频+PDF</td>\n</tr>\n<tr>\n<td>维度</td>\n<td>768</td>\n<td>512/768</td>\n<td>1408</td>\n<td>3072 (可配)</td>\n</tr>\n<tr>\n<td>上下文</td>\n<td>2048 tokens</td>\n<td>77 tokens</td>\n<td>32 tokens(文本)</td>\n<td>8192 tokens</td>\n</tr>\n<tr>\n<td>任务指定</td>\n<td>task_type 枚举</td>\n<td>无</td>\n<td>无</td>\n<td>自然语言指令</td>\n</tr>\n<tr>\n<td>维度灵活性</td>\n<td>固定</td>\n<td>固定</td>\n<td>固定</td>\n<td>MRL 任意维度</td>\n</tr>\n<tr>\n<td>音频支持</td>\n<td>❌</td>\n<td>❌</td>\n<td>❌</td>\n<td>✅ (180s)</td>\n</tr>\n<tr>\n<td>文档 OCR</td>\n<td>❌</td>\n<td>❌</td>\n<td>❌</td>\n<td>✅</td>\n</tr>\n</tbody>\n</table></div>\n<h5>训练推测</h5>\n<p>虽然 Google 未公开完整训练细节，基于 Gemini 模型家族和公开文档可推断：</p>\n<ol>\n<li><strong>骨干网络</strong>：基于 Gemini 系列 Decoder-only Transformer，通过特殊池化策略（可能为 last-token pooling 或 mean pooling）将变长序列压缩为固定向量</li>\n<li><strong>训练目标</strong>：多阶段训练——预训练阶段使用大规模对比学习（InfoNCE），微调阶段结合指令跟随和 MRL 多维度损失</li>\n<li><strong>数据</strong>：多模态配对数据（text-image pairs, text-audio pairs, video-text pairs）+ 大规模文本检索数据</li>\n<li><strong>归一化</strong>：输出层 L2 归一化确保余弦相似度等价于内积</li>\n</ol>",
      "quiz": {
        "q": "Gemini Embedding 2 处理一段 30 秒视频（1 FPS，启用音轨提取）大约消耗多少 tokens？",
        "options": [
          "约 1980 tokens (30×66)",
          "约 2730 tokens (30×(66+25))",
          "约 3030 tokens (30×(66+25+10))",
          "约 3288 tokens (30×(66+25+10+8.6))"
        ],
        "answer": 2,
        "explain": "1 FPS 采样 30 秒视频得到 30 帧，每帧 66 tokens = 1980；启用音轨提取后音频 25 tok/s × 30s = 750；总计 1980 + 750 = 2730 tokens。"
      }
    },
    {
      "id": "wave",
      "num": 18,
      "name": "WAVE",
      "fullName": "统一音视频嵌入 (Unified Audio-Visual Embeddings)",
      "year": "2026.05",
      "org": "ICLR 2026",
      "parent": "bert",
      "paperUrl": "—",
      "projectUrl": "",
      "category": "multimodal",
      "motivation": "首个LLM统一音视频嵌入",
      "summary": "WAVE 提出首个基于 LLM 的统一多模态嵌入模型，通过双音频编码器架构与分层全层特征融合，将文本、音频、无声视频和音视频同步输入映射到统一语义空间，在 MMEB-v2 视频赛道取得 SOTA 并支持跨模态任意对检索。",
      "keyPoints": [
        "<strong>首个统一音视频嵌入 LLM</strong>：单一模型同时处理文本、音频、无声视频、音视频四种模态，支持 any-to-any 跨模态检索",
        "<strong>双音频编码器设计</strong>：Speech Encoder（来自 Qwen2.5-Omni，擅长语音/音乐）+ BEATs Encoder（擅长环境音效），互补覆盖全音频语义",
        "<strong>分层全层特征融合</strong>：收集 LLM 所有 28 层的 last-token 隐状态，拼接后通过 2 层 MLP（GELU）生成最终嵌入，优于仅用最后一层",
        "<strong>联合多模态多任务训练</strong>：同时训练检索（对称 InfoNCE）+ QA（对比式蒸馏），4.9M 样本覆盖视频-文本、音频-文本、视频-音频三类对",
        "<strong>Prompt-aware 嵌入</strong>：利用 LLM 指令跟随能力，根据不同问题生成条件化嵌入，QA 任务超 Seed-1.6-Embedding 约 12%",
        "<strong>高效微调</strong>：基于 Qwen2.5-Omni 7B，仅训练 LoRA（rank=128）+ 视觉对齐器 + 融合 MLP，192 GPU 训练 36 小时",
        "<strong>TMRoPE 时序对齐</strong>：为音频和视频 token 分配统一时间戳位置编码，实现帧级音视频对齐"
      ],
      "detail": "<p><img alt=\"WAVE 架构总览\" src=\"https://raw.githubusercontent.com/TCL606/WAVE/main/assets/wave.jpg\" />\n<em>图：WAVE 模型架构。左侧为双音频编码器（Speech Encoder + BEATs），右侧为视觉编码器，中间为 LLM backbone 及分层融合模块。</em></p>\n<pre><code class=\"language-python\"># WAVE 前向推理伪代码\ndef wave_forward(text_prompt, video=None, audio=None):\n    # 1. 编码各模态输入\n    text_tokens = tokenize(text_prompt)\n\n    if video is not None:\n        # 视觉编码：2fps采样，最多128帧\n        visual_tokens = visual_encoder(video)  # ViT from Qwen2.5-Omni\n        visual_tokens = visual_aligner(visual_tokens)\n\n    if audio is not None:\n        # 双音频编码\n        speech_tokens = speech_encoder(audio)  # Qwen2.5-Omni speech encoder\n        beats_tokens = beats_encoder(audio)    # BEATs for environmental sounds\n        beats_tokens = beats_aligner(beats_tokens)  # 2-layer MLP alignment\n\n    # 2. TMRoPE 时序对齐：为音频/视频 token 分配统一时间戳\n    all_tokens = concat(text_tokens, visual_tokens, speech_tokens, beats_tokens)\n    position_ids = compute_tmrope(all_tokens, timestamps)\n\n    # 3. LLM 前向（带 LoRA）\n    hidden_states = []  # 收集所有层的隐状态\n    x = all_tokens\n    for layer in llm.layers:  # 28 layers\n        x = layer(x, position_ids)  # with LoRA adapters\n        hidden_states.append(x[:, -1, :])  # last token of each layer\n\n    # 4. 分层融合生成最终嵌入\n    if modality == &quot;text&quot;:\n        embedding = hidden_states[-1]  # 文本用标准 last-token pooling\n    else:\n        # 多模态：拼接所有层 last-token → MLP 融合\n        concat_features = torch.cat(hidden_states, dim=-1)  # [28 * hidden_dim]\n        embedding = fusion_mlp(concat_features)  # 2-layer MLP with GELU\n\n    return F.normalize(embedding, dim=-1)\n\n# 5. 对比学习损失\ndef compute_loss(query_embs, target_embs, tau=0.01):\n    # 对称 InfoNCE with in-batch negatives\n    sim = query_embs @ target_embs.T / tau\n    labels = torch.arange(len(sim))\n    loss_q2t = F.cross_entropy(sim, labels)\n    loss_t2q = F.cross_entropy(sim.T, labels)\n    return (loss_q2t + loss_t2q) / 2\n</code></pre>\n<h5>动机与背景：为什么需要统一音视频嵌入？</h5>\n<p>现有多模态嵌入模型（如 CLIP、GME、LamRA）主要关注图像-文本或视频-文本对齐，忽略了音频模态。然而现实世界的视频天然包含音频信号——环境音效、语音、背景音乐等都携带丰富的语义信息。例如，一段\"海浪拍打礁石\"的视频，其音频中的浪声与视觉中的海景共同构成完整语义。传统方法要么将音频丢弃（仅处理视觉帧），要么需要为每种模态对训练独立模型，导致跨模态检索（如\"用音频搜视频\"）无法实现。</p>\n<p>WAVE 的核心动机是：<strong>利用 LLM 强大的语义理解能力，构建一个统一的嵌入空间，使得文本、音频、视频、音视频可以在同一空间中直接比较相似度</strong>。这不仅简化了多模态检索系统的架构，还通过联合训练实现了跨模态知识迁移。</p>\n<h5>核心机制一：双音频编码器与 TMRoPE 对齐</h5>\n<p>WAVE 采用双编码器策略处理音频，这是因为不同类型的音频信号具有截然不同的特征：</p>\n<ol>\n<li><strong>Speech Encoder</strong>（来自 Qwen2.5-Omni）：擅长处理语音和音乐，能捕捉语言内容和旋律结构</li>\n<li><strong>BEATs Encoder</strong>：专门针对环境音效（如鸟鸣、机器声、脚步声）进行预训练，能识别非语言音频事件</li>\n</ol>\n<p>BEATs 的输出维度与 LLM 不匹配，因此需要一个对齐器（2 层 MLP + GELU）将其映射到 LLM 的输入空间。该对齐器通过<strong>预训练阶段</strong>（在 WavCaps/AudioCaps/Clotho 上做音频描述生成）单独训练，确保 LLM 能正确解读 BEATs 特征。</p>\n<p>为实现音视频的帧级对齐，WAVE 使用 <strong>TMRoPE</strong>（Temporal Multi-modal Rotary Position Embedding）：为每个音频/视频 token 分配其对应的物理时间戳作为位置 ID，使得同一时刻的音频 token 和视频 token 共享相同的时间位置编码，从而让 LLM 的注意力机制自然地建立时序对应关系。</p>\n<h5>核心机制二：分层全层特征融合</h5>\n<p>传统 LLM 嵌入提取通常只使用最后一层的 last-token 隐状态。然而研究表明，LLM 不同层承担不同功能：浅层捕捉低级感知特征（颜色、纹理、音调），深层编码高级语义推理。对于多模态理解，这些互补信息都很重要。</p>\n<p>WAVE 的融合策略：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{e} = \\text{MLP}\\left(\\text{Concat}\\left[\\mathbf{h}_1^{[\\text{EOS}]}, \\mathbf{h}_2^{[\\text{EOS}]}, \\ldots, \\mathbf{h}_{28}^{[\\text{EOS}]}\\right]\\right)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\mathbf{h}_l^{[\\text{EOS}]}</span> 是第 <span class=\"kb-math kb-math-inline\">l</span> 层 EOS token 的隐状态。拼接后维度为 <span class=\"kb-math kb-math-inline\">28 \\times 3584 = 100352</span>，通过 2 层 MLP（含 GELU 激活）压缩为最终嵌入维度。</p>\n<div class=\"key-point\">💡 关键：消融实验表明，MLP 融合比简单加权求和高 2.2 个点（48.3 → 50.5），说明跨层交互是非线性的，需要学习的变换来捕捉。</div>\n<p>值得注意的是，<strong>纯文本输入仍使用标准 last-token pooling</strong>（仅最后一层），这是因为文本的语义在 LLM 顶层已经充分抽象，而多模态输入则需要融合各层的互补信息。</p>\n<h5>核心机制三：联合多模态多任务训练</h5>\n<p>WAVE 的训练包含两类任务：</p>\n<p><strong>检索任务</strong>：使用对称 InfoNCE 损失，支持任意模态对（视频↔文本、音频↔文本、视频↔音频）：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{ret}} = -\\frac{1}{2}\\left[\\log\\frac{\\exp(\\text{sim}(s,t)/\\tau)}{\\sum_j \\exp(\\text{sim}(s,t_j)/\\tau)} + \\log\\frac{\\exp(\\text{sim}(t,s)/\\tau)}{\\sum_i \\exp(\\text{sim}(t,s_i)/\\tau)}\\right]</div>\n<p>其中温度 <span class=\"kb-math kb-math-inline\">\\tau = 0.01</span>，使用 batch 内负样本。</p>\n<p><strong>QA 任务</strong>：将多选 QA 转化为对比学习——视频+问题的嵌入应与正确答案最相似，与干扰项最不相似。这使模型学会生成 prompt-aware 的条件化嵌入。</p>\n<div class=\"warn-box\">⚠️ 注意：联合训练的关键发现是<strong>正向跨模态迁移</strong>——同时训练所有模态比分别训练专家模型在 7/8 个任务上更优（Table 6），说明多模态信号的多样性有助于学习更通用的语义表示。</div>\n<h5>与现有方法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>CLIP/SigLIP</th>\n<th>GME/LamRA</th>\n<th>WAVE</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>支持音频</td>\n<td>❌</td>\n<td>❌</td>\n<td>✅</td>\n</tr>\n<tr>\n<td>音视频对齐</td>\n<td>❌</td>\n<td>❌</td>\n<td>✅ (TMRoPE)</td>\n</tr>\n<tr>\n<td>LLM backbone</td>\n<td>❌</td>\n<td>✅</td>\n<td>✅ (Qwen2.5-Omni)</td>\n</tr>\n<tr>\n<td>指令跟随</td>\n<td>❌</td>\n<td>有限</td>\n<td>✅ (prompt-aware)</td>\n</tr>\n<tr>\n<td>跨层融合</td>\n<td>N/A</td>\n<td>last-layer</td>\n<td>all-layer MLP</td>\n</tr>\n<tr>\n<td>跨模态检索</td>\n<td>图↔文</td>\n<td>图/视频↔文</td>\n<td>任意模态对</td>\n</tr>\n</tbody>\n</table></div>\n<p>WAVE 在 MMEB-v2 视频赛道总分 59.0，超越工业级 Seed-1.6-Embedding（55.3），在 QA 子任务上以 72.5 大幅领先（+11.6）。在音频检索（AudioCaps R@1: 44.2）和音视频检索（VGGSound R@1: 25.0）上也展现强劲性能。</p>",
      "quiz": {
        "q": "WAVE 对多模态输入采用分层全层融合而非标准 last-token pooling 的主要原因是什么？",
        "options": [
          "减少计算量，加速推理",
          "LLM 不同层编码互补的感知与语义信息，融合可获得更完整的表示",
          "避免梯度消失问题，改善训练稳定性",
          "使模型兼容不同长度的输入序列"
        ],
        "answer": 1,
        "explain": "论文消融实验表明 LLM 浅层捕捉低级感知特征、深层编码高级语义，全层 MLP 融合比仅用最后一层高约 1 个点，说明跨层互补信息对多模态嵌入质量至关重要。"
      }
    }
  ],
  "categories": {
    "manifold": {
      "label": "流形与降维",
      "color": "#10B981"
    },
    "deep_rep": {
      "label": "深度表示学习",
      "color": "#3B82F6"
    },
    "self_supervised": {
      "label": "自监督学习",
      "color": "#8B5CF6"
    },
    "multimodal": {
      "label": "多模态表示",
      "color": "#F59E0B"
    },
    "graph_rep": {
      "label": "图表示学习",
      "color": "#EC4899"
    }
  },
  "projectUrls": {}
};
