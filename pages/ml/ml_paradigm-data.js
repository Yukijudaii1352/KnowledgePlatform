/**
 * ml_paradigm-data.js — 由 pipeline/build.py 于 2026-05-13 14:56:48 自动生成。
 * 源文件：content/ml/ml_paradigm.md
 * ⚠️  请勿手动修改；如需更新，修改源文档后重新编译。
 */
window.PAGE_CONFIG = {
  "meta": {
    "domain": "ml",
    "topic_id": "ml_paradigm",
    "topic_name": "ml_paradigm",
    "page_title": "机器学习范式",
    "page_subtitle": "2026-05-13 版",
    "page_desc": "涵盖监督、无监督、半监督、自监督、强化学习五大核心范式的演化历程与前沿进展",
    "page_icon": "🧠",
    "hero_pills": [
      "监督学习",
      "无监督学习",
      "半监督学习",
      "自监督学习",
      "强化学习"
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
        "id": "kmeans",
        "x": 0,
        "y": 35,
        "category": "foundation"
      },
      {
        "id": "backprop",
        "x": 15,
        "y": 20,
        "category": "foundation"
      },
      {
        "id": "svm",
        "x": 25,
        "y": 20,
        "category": "core"
      },
      {
        "id": "pseudo_label",
        "x": 40,
        "y": 50,
        "category": "foundation"
      },
      {
        "id": "vae",
        "x": 42,
        "y": 35,
        "category": "core"
      },
      {
        "id": "dqn",
        "x": 45,
        "y": 80,
        "category": "core"
      },
      {
        "id": "ppo",
        "x": 52,
        "y": 80,
        "category": "core"
      },
      {
        "id": "bert",
        "x": 60,
        "y": 65,
        "category": "core"
      },
      {
        "id": "simclr",
        "x": 65,
        "y": 65,
        "category": "core"
      },
      {
        "id": "fixmatch",
        "x": 68,
        "y": 50,
        "category": "core"
      },
      {
        "id": "mae",
        "x": 75,
        "y": 65,
        "category": "frontier"
      },
      {
        "id": "ijepa",
        "x": 85,
        "y": 65,
        "category": "frontier"
      },
      {
        "id": "dpo",
        "x": 87,
        "y": 80,
        "category": "frontier"
      },
      {
        "id": "dinov3",
        "x": 95,
        "y": 65,
        "category": "frontier"
      },
      {
        "id": "grpo",
        "x": 100,
        "y": 80,
        "category": "frontier"
      }
    ],
    "edges": [
      {
        "from": "pseudo_label",
        "to": "fixmatch",
        "label": "一致性正则"
      },
      {
        "from": "bert",
        "to": "mae",
        "label": "视觉迁移"
      },
      {
        "from": "mae",
        "to": "ijepa",
        "label": "联合嵌入"
      },
      {
        "from": "ijepa",
        "to": "dinov3",
        "label": "规模扩展"
      },
      {
        "from": "dqn",
        "to": "ppo",
        "label": "策略梯度"
      },
      {
        "from": "ppo",
        "to": "dpo",
        "label": "偏好对齐"
      },
      {
        "from": "dpo",
        "to": "grpo",
        "label": "群体优化"
      },
      {
        "from": "simclr",
        "to": "mae",
        "label": "掩码学习"
      },
      {
        "from": "backprop",
        "to": "bert",
        "label": "深度学习"
      },
      {
        "from": "vae",
        "to": "simclr",
        "label": "表示学习"
      }
    ],
    "milestones": [
      "backprop",
      "bert",
      "ppo",
      "grpo"
    ]
  },
  "algos": [
    {
      "id": "backprop",
      "num": 1,
      "name": "反向传播",
      "fullName": "Backpropagation",
      "year": "1986",
      "org": "UCSD/CMU",
      "parent": "—",
      "paperUrl": "https://www.nature.com/articles/323533a0",
      "projectUrl": "",
      "category": "foundation",
      "motivation": "误差反向传播实现多层网络训练",
      "summary": "Rumelhart、Hinton 与 Williams 提出了反向传播（Backpropagation）学习算法，通过链式法则将输出层误差逐层反向传播至隐藏层以计算梯度，首次实现了对多层神经网络的有效训练，使隐藏单元能够自动学习到有意义的内部表征，突破了感知机只能处理线性可分问题的根本局限。",
      "keyPoints": [
        "<strong>广义 Delta 规则</strong>：将单层感知机的 Delta 规则推广到多层网络，利用链式法则逐层计算误差梯度",
        "<strong>隐藏层表征学习</strong>：隐藏单元在训练过程中自动发现输入数据的内部特征表示，无需人工设计",
        "<strong>可微激活函数</strong>：采用 sigmoid（logistic）等连续可微非线性函数替代阶跃函数，使梯度可沿网络反向流动",
        "<strong>梯度下降优化</strong>：通过最小化输出层均方误差（MSE），沿负梯度方向迭代更新所有层的权重",
        "<strong>前向传播 + 反向传播</strong>：两阶段计算——前向计算各层激活值，反向传播误差信号并计算权重梯度",
        "<strong>XOR 问题求解</strong>：成功训练两层网络解决 XOR 等线性不可分问题，直接回应了 Minsky &amp; Papert 对感知机的批评",
        "<strong>分布式表征实验</strong>：在家族关系推理、对称性检测等任务上展示了隐藏单元学习到的分布式编码"
      ],
      "detail": "<p><img alt=\"反向传播算法示意图\" src=\"https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Backpropagation-network.svg/400px-Backpropagation-network.svg.png\" />\n<em>图：多层前馈神经网络中反向传播的信息流示意。前向传播（蓝色箭头）计算各层激活值，反向传播（红色箭头）将误差信号从输出层逐层回传至隐藏层，用于计算各权重的梯度。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># Backpropagation 算法伪代码\ndef backpropagation(network, X, Y, learning_rate, max_epochs):\n    initialize_weights_randomly(network)\n\n    for epoch in range(max_epochs):\n        for (x, y) in zip(X, Y):\n            # ===== 前向传播 =====\n            a[0] = x  # 输入层激活值\n            for l in range(1, L+1):  # 逐层计算\n                z[l] = W[l] @ a[l-1] + b[l]       # 线性组合\n                a[l] = sigmoid(z[l])                # 非线性激活\n\n            # ===== 计算输出层误差 =====\n            delta[L] = (a[L] - y) * sigmoid_derivative(z[L])\n\n            # ===== 反向传播误差 =====\n            for l in range(L-1, 0, -1):  # 从倒数第二层到第一层\n                delta[l] = (W[l+1].T @ delta[l+1]) * sigmoid_derivative(z[l])\n\n            # ===== 更新权重 =====\n            for l in range(1, L+1):\n                W[l] -= learning_rate * delta[l] @ a[l-1].T\n                b[l] -= learning_rate * delta[l]\n\n    return network\n</code></pre>\n<h5>动机与背景</h5>\n<p>20 世纪 60 年代，Rosenblatt 提出的感知机（Perceptron）展示了单层神经网络的学习能力，其收敛定理保证了对线性可分问题的求解。然而，1969 年 Minsky 与 Papert 在《Perceptrons》一书中严格证明了单层感知机无法解决 XOR 等线性不可分问题，并指出多层网络虽然理论上可以克服这一限制，但<strong>缺乏有效的训练算法</strong>。这一论断导致神经网络研究进入了长达十余年的低谷期（\"AI 寒冬\"的重要诱因之一）。</p>\n<p>问题的核心在于：对于多层网络中的隐藏层，由于没有直接的\"期望输出\"作为监督信号，无法直接应用感知机的 Delta 规则来计算隐藏层权重的更新量。换言之，<strong>信用分配问题（Credit Assignment Problem）</strong>——如何将输出层的误差合理地归因到各隐藏层的各个权重——是多层网络训练的根本障碍。</p>\n<div class=\"key-point\">💡 关键：反向传播的核心洞察是：虽然隐藏层没有直接的目标输出，但通过<strong>链式法则（Chain Rule）</strong>，可以将损失函数对输出层的梯度逐层向后传递，精确计算损失函数对网络中<strong>每一个权重</strong>的偏导数，从而实现端到端的梯度下降训练。</div>\n<h5>核心机制：前向传播与反向传播</h5>\n<p><strong>网络结构</strong></p>\n<p>论文考虑的是标准的多层前馈网络（Feedforward Network）。设网络共有 \\(L\\) 层（不计输入层），第 \\(l\\) 层有 \\(n_l\\) 个单元。每个单元 \\(j\\) 在第 \\(l\\) 层的计算过程为：</p>\n<p>$$z_j^{(l)} = \\sum_{i} w_{ji}^{(l)} \\, a_i^{(l-1)} + b_j^{(l)}$$</p>\n<p>$$a_j^{(l)} = f\\!\\left(z_j^{(l)}\\right)$$</p>\n<p>其中 \\(w_{ji}^{(l)}\\) 是第 \\(l\\) 层单元 \\(j\\) 与第 \\(l-1\\) 层单元 \\(i\\) 之间的连接权重，\\(b_j^{(l)}\\) 是偏置，\\(f(\\cdot)\\) 是激活函数。</p>\n<p><strong>Sigmoid 激活函数</strong></p>\n<p>论文采用 logistic sigmoid 函数作为激活函数：</p>\n<p>$$f(z) = \\sigma(z) = \\frac{1}{1 + e^{-z}}$$</p>\n<p>其关键性质是导数可以用自身表示：</p>\n<p>$$\\sigma'(z) = \\sigma(z)\\,(1 - \\sigma(z))$$</p>\n<p>这一性质使得反向传播中的梯度计算极为高效——无需额外存储中间导数值，直接利用前向传播已经计算好的激活值即可。</p>\n<div class=\"warn-box\">⚠️ 注意：选择连续可微的激活函数是反向传播能够工作的前提条件。早期感知机使用的阶跃函数（Heaviside）在阈值处不可微，梯度为零或未定义，无法进行基于梯度的优化。</div>\n<p><strong>损失函数</strong></p>\n<p>对于单个训练样本 \\((x, y)\\)，损失函数定义为输出层的均方误差：</p>\n<p>$$E = \\frac{1}{2} \\sum_{j=1}^{n_L} \\left(y_j - a_j^{(L)}\\right)^2$$</p>\n<p>总损失为所有训练样本损失之和。目标是通过调整网络中所有权重 \\(\\{w_{ji}^{(l)}\\}\\) 来最小化 \\(E\\)。</p>\n<p><strong>反向传播的梯度推导</strong></p>\n<p>反向传播的核心是计算 \\(\\frac{\\partial E}{\\partial w_{ji}^{(l)}}\\)。通过链式法则，定义第 \\(l\\) 层单元 \\(j\\) 的<strong>误差信号</strong>（或称\"灵敏度\"）：</p>\n<p>$$\\delta_j^{(l)} = \\frac{\\partial E}{\\partial z_j^{(l)}}$$</p>\n<p>对于<strong>输出层</strong>（\\(l = L\\)）：</p>\n<p>$$\\delta_j^{(L)} = \\frac{\\partial E}{\\partial a_j^{(L)}} \\cdot f'\\!\\left(z_j^{(L)}\\right) = \\left(a_j^{(L)} - y_j\\right) \\cdot \\sigma'\\!\\left(z_j^{(L)}\\right)$$</p>\n<p>对于<strong>隐藏层</strong>（\\(l < L\\)），通过链式法则将后一层的误差信号反向传播：</p>\n<p>$$\\delta_j^{(l)} = f'\\!\\left(z_j^{(l)}\\right) \\sum_{k} w_{kj}^{(l+1)} \\, \\delta_k^{(l+1)}$$</p>\n<p>这就是\"反向传播\"名称的由来——第 \\(l\\) 层的误差信号 \\(\\delta_j^{(l)}\\) 是由第 \\(l+1\\) 层的误差信号 \\(\\delta_k^{(l+1)}\\) 经权重 \\(w_{kj}^{(l+1)}\\) 加权求和后，再乘以当前层激活函数的导数得到的。</p>\n<p>最终，权重的梯度为：</p>\n<p>$$\\frac{\\partial E}{\\partial w_{ji}^{(l)}} = \\delta_j^{(l)} \\cdot a_i^{(l-1)}$$</p>\n<p>权重更新规则（梯度下降）：</p>\n<p>$$\\Delta w_{ji}^{(l)} = -\\eta \\, \\frac{\\partial E}{\\partial w_{ji}^{(l)}} = -\\eta \\, \\delta_j^{(l)} \\, a_i^{(l-1)}$$</p>\n<p>其中 \\(\\eta\\) 为学习率。</p>\n<div class=\"key-point\">💡 关键：反向传播的计算复杂度与前向传播相同，均为 \\(O(W)\\)（\\(W\\) 为网络总权重数）。这意味着计算所有权重的梯度只需要一次前向传播加一次反向传播，而非对每个权重单独进行有限差分近似（那将需要 \\(O(W^2)\\) 的计算量）。</div>\n<h5>隐藏层表征的自动发现</h5>\n<p>论文最具影响力的贡献之一是展示了隐藏单元能够<strong>自动学习有意义的内部表征</strong>。在训练过程中，隐藏层的激活模式自发组织为对输入特征的分布式编码（Distributed Representation），而非由人工预先设计。</p>\n<p><strong>XOR 问题</strong>：论文展示了一个包含 2 个输入单元、2 个隐藏单元和 1 个输出单元的网络，经反向传播训练后成功学会了 XOR 函数。隐藏单元学到的表征将原本线性不可分的四个输入模式映射到了一个线性可分的新空间。</p>\n<p><strong>家族关系任务</strong>：论文设计了一个更复杂的实验——给定\"A 是 B 的父亲\"这样的关系三元组，训练网络预测关系。隐藏单元自动学习到了人物的国籍、辈分、性别等语义特征的分布式编码，尽管这些特征从未被显式提供。</p>\n<p><strong>对称性检测</strong>：网络被训练判断二进制输入模式是否关于中心对称。隐藏单元学会了将对称位置的输入进行配对比较。</p>\n<h5>与此前方法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>感知机 (Rosenblatt, 1962)</th>\n<th>反向传播 (Rumelhart et al., 1986)</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>网络层数</td>\n<td>单层（输入→输出）</td>\n<td>任意多层（含隐藏层）</td>\n</tr>\n<tr>\n<td>激活函数</td>\n<td>阶跃函数（不可微）</td>\n<td>Sigmoid（连续可微）</td>\n</tr>\n<tr>\n<td>学习规则</td>\n<td>Delta 规则</td>\n<td>广义 Delta 规则（链式法则）</td>\n</tr>\n<tr>\n<td>可解问题</td>\n<td>仅线性可分</td>\n<td>任意复杂决策边界（理论上）</td>\n</tr>\n<tr>\n<td>特征表示</td>\n<td>人工设计</td>\n<td>自动学习（隐藏层表征）</td>\n</tr>\n<tr>\n<td>信用分配</td>\n<td>不需要（单层）</td>\n<td>通过误差反向传播解决</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 关键：反向传播不仅是一个训练算法，更是一种<strong>自动特征学习</strong>的范式——它证明了多层网络可以通过端到端的梯度优化自动发现数据中的层次化特征表示，这一思想直接奠定了现代深度学习的理论基础。</div>\n<h5>历史注记与后续影响</h5>\n<p>反向传播的思想并非 1986 年首次出现。1970 年 Linnainmaa 提出了自动微分的反向模式，1974 年 Werbos 在博士论文中将其应用于神经网络，1985 年 Le Cun 也独立提出了类似方法。然而，Rumelhart、Hinton 与 Williams 的 1986 年 Nature 论文通过清晰的阐述和令人信服的实验（尤其是隐藏层表征学习的演示），使反向传播被广泛接受，直接推动了神经网络研究的复兴（\"连接主义\"浪潮）。</p>\n<p>反向传播至今仍是训练神经网络的核心算法。现代深度学习框架（PyTorch、TensorFlow）中的自动微分（Autograd）机制本质上是反向传播的工程化实现，结合了计算图、动态/静态图编译等优化技术，但核心的链式法则梯度传播原理与 1986 年论文完全一致。</p>",
      "quiz": {
        "q": "反向传播算法能够训练多层网络的关键前提条件是什么？",
        "options": [
          "使用足够多的隐藏层单元",
          "采用连续可微的激活函数，使梯度可以通过链式法则逐层传播",
          "使用交叉熵损失函数替代均方误差",
          "训练数据必须是线性可分的"
        ],
        "answer": 1,
        "explain": "反向传播依赖链式法则计算各层梯度，这要求激活函数连续可微。早期感知机使用不可微的阶跃函数，导致梯度无法回传，是多层网络无法训练的根本原因。论文采用 sigmoid 函数解决了这一问题。"
      }
    },
    {
      "id": "svm",
      "num": 2,
      "name": "SVM",
      "fullName": "Support Vector Machine",
      "year": "1995",
      "org": "AT&T Bell Labs",
      "parent": "—",
      "paperUrl": "https://link.springer.com/article/10.1007/BF00994018",
      "projectUrl": "",
      "category": "core",
      "motivation": "核函数与最大间隔分类理论",
      "summary": "SVM 提出了基于最大间隔（maximum margin）原理的分类方法，通过引入软间隔（soft margin）处理不可分数据，并利用核技巧（kernel trick）将线性分类器隐式映射到高维特征空间实现非线性决策面，在手写数字识别等任务上超越了当时的神经网络方法。",
      "keyPoints": [
        "<strong>最大间隔超平面</strong>：在所有能正确分类训练数据的超平面中，选择使两类之间几何间隔最大的唯一最优超平面",
        "<strong>支持向量</strong>：仅位于间隔边界上的少量训练样本（支持向量）决定最优超平面，其余样本不影响决策面",
        "<strong>对偶问题与二次规划</strong>：通过 Lagrange 对偶将原始约束优化转化为仅依赖样本内积的二次规划（QP）问题",
        "<strong>软间隔分类器</strong>：引入松弛变量 \\(\\xi_i\\) 和惩罚参数 \\(C\\)，允许部分样本违反间隔约束，平衡间隔最大化与误分类最小化",
        "<strong>核技巧（Kernel Trick）</strong>：利用满足 Mercer 条件的核函数 \\(K(\\mathbf{u}, \\mathbf{v})\\) 替代内积，隐式在高维空间构造非线性决策面，无需显式计算特征映射",
        "<strong>多种核函数</strong>：支持多项式核 \\(K(\\mathbf{u},\\mathbf{v})=({\\mathbf{u} \\cdot \\mathbf{v}}+1)^d\\)、径向基函数（RBF）核等，通过更换核函数即可实现不同类型的决策面",
        "<strong>VC 维与结构风险最小化</strong>：最大间隔原则等价于控制假设空间的 VC 维，天然实现了结构风险最小化（SRM），有效防止过拟合",
        "<strong>实验验证</strong>：在 USPS 手写数字数据集上，4 阶多项式核 SVM 达到 4.3% 错误率，优于当时最优的 5 层神经网络（5.1%）"
      ],
      "detail": "<p><img alt=\"SVM 最大间隔分类示意图\" src=\"https://upload.wikimedia.org/wikipedia/commons/7/72/SVM_margin.png\" />\n<em>图：SVM 最大间隔分类器示意。实线为最优超平面，虚线为间隔边界，间隔边界上的样本即为支持向量（用圆圈标出）。SVM 的目标是最大化两条虚线之间的距离（margin）。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># SVM 训练与预测伪代码（对偶形式 + 核函数）\ndef svm_train(X, y, C, kernel_fn):\n    &quot;&quot;&quot;\n    X: 训练样本 (n × d)\n    y: 标签 ∈ {-1, +1} (n,)\n    C: 软间隔惩罚参数\n    kernel_fn: 核函数 K(u, v)\n    &quot;&quot;&quot;\n    n = len(X)\n\n    # Step 1: 构造核矩阵\n    D = [[y[i] * y[j] * kernel_fn(X[i], X[j]) for j in range(n)] for i in range(n)]\n\n    # Step 2: 求解对偶二次规划问题\n    #   maximize  W(α) = Σα_i - (1/2) Σ α_i α_j y_i y_j K(x_i, x_j)\n    #   subject to: 0 ≤ α_i ≤ C,  Σ α_i y_i = 0\n    alpha = solve_qp(D, y, C)\n\n    # Step 3: 提取支持向量 (α_i &gt; 0)\n    support_vectors = [(X[i], y[i], alpha[i]) for i in range(n) if alpha[i] &gt; 0]\n\n    # Step 4: 计算偏置 b（利用 0 &lt; α_i &lt; C 的支持向量）\n    b = compute_bias(support_vectors, kernel_fn)\n\n    return support_vectors, b\n\ndef svm_predict(x, support_vectors, b, kernel_fn):\n    # 决策函数: f(x) = Σ y_i α_i K(x, x_i) + b\n    score = sum(y_i * alpha_i * kernel_fn(x, x_i) for x_i, y_i, alpha_i in support_vectors)\n    return sign(score + b)\n</code></pre>\n<h5>动机与背景</h5>\n<p>传统的感知机（Perceptron）算法虽然能找到一个将两类数据分开的超平面，但这样的超平面并不唯一——存在无穷多个可行解，且不同解的泛化能力差异巨大。Vapnik 和 Chervonenkis 的统计学习理论指出，分类器的泛化误差不仅取决于训练误差，还取决于假设空间的复杂度（VC 维）。一个自然的问题是：<strong>能否找到一个具有最优泛化保证的超平面？</strong></p>\n<p>论文的核心洞察是：在所有正确分类训练数据的超平面中，<strong>几何间隔最大的超平面具有最小的 VC 维</strong>，从而拥有最优的泛化能力上界。这就是\"最大间隔\"原则的理论基础。此外，现实数据往往线性不可分，论文进一步提出了两个关键扩展：（1）软间隔允许部分误分类以换取更大的间隔；（2）核技巧将输入空间非线性映射到高维特征空间，使得原本不可分的数据在新空间中变得线性可分。</p>\n<h5>核心机制：最优超平面与对偶问题</h5>\n<p>给定训练集 \\(\\{(\\mathbf{x}_i, y_i)\\}_{i=1}^{\\ell}\\)，其中 \\(y_i \\in \\{-1, +1\\}\\)，超平面 \\(\\mathbf{w} \\cdot \\mathbf{x} + b = 0\\) 将两类分开。最优超平面的构造等价于以下约束优化问题：</p>\n<p>$$\n\\min_{\\mathbf{w}, b} \\frac{1}{2} \\|\\mathbf{w}\\|^2 \\quad \\text{s.t.} \\quad y_i(\\mathbf{w} \\cdot \\mathbf{x}_i + b) \\geq 1, \\quad i = 1, \\ldots, \\ell\n$$</p>\n<p>约束条件要求所有样本到超平面的函数间隔至少为 1，而目标函数最小化 \\(\\|\\mathbf{w}\\|^2\\) 等价于最大化几何间隔 \\(\\rho = \\frac{2}{\\|\\mathbf{w}\\|}\\)。通过引入 Lagrange 乘子 \\(\\alpha_i \\geq 0\\)，可以将原始问题转化为对偶问题：</p>\n<p>$$\n\\max_{\\boldsymbol{\\alpha}} W(\\boldsymbol{\\alpha}) = \\sum_{i=1}^{\\ell} \\alpha_i - \\frac{1}{2} \\sum_{i,j=1}^{\\ell} \\alpha_i \\alpha_j y_i y_j (\\mathbf{x}_i \\cdot \\mathbf{x}_j)\n$$</p>\n<p>$$\n\\text{s.t.} \\quad \\alpha_i \\geq 0, \\quad \\sum_{i=1}^{\\ell} \\alpha_i y_i = 0\n$$</p>\n<p>对偶问题的关键优势在于：（1）约束更简单（非负约束 + 一个等式约束）；（2）目标函数仅依赖样本之间的<strong>内积</strong> \\(\\mathbf{x}_i \\cdot \\mathbf{x}_j\\)，这为后续的核技巧奠定了基础。在最优解中，只有满足 \\(y_i(\\mathbf{w} \\cdot \\mathbf{x}_i + b) = 1\\) 的样本对应 \\(\\alpha_i > 0\\)，这些样本就是<strong>支持向量</strong>。最优权重向量可表示为支持向量的线性组合：\\(\\mathbf{w}_0 = \\sum_{i=1}^{\\ell} \\alpha_i y_i \\mathbf{x}_i\\)。</p>\n<div class=\"key-point\">💡 <strong>关键直觉</strong>：最优超平面完全由少数支持向量决定，与训练集大小无关。这意味着 SVM 天然具有稀疏性，预测时只需计算新样本与支持向量的内积。</div>\n<h5>软间隔分类器</h5>\n<p>当训练数据线性不可分时，不存在满足所有约束的超平面。论文引入松弛变量 \\(\\xi_i \\geq 0\\) 放松约束，并通过惩罚参数 \\(C\\) 控制误分类代价：</p>\n<p>$$\n\\min_{\\mathbf{w}, b, \\boldsymbol{\\xi}} \\frac{1}{2} \\|\\mathbf{w}\\|^2 + C \\sum_{i=1}^{\\ell} \\xi_i \\quad \\text{s.t.} \\quad y_i(\\mathbf{w} \\cdot \\mathbf{x}_i + b) \\geq 1 - \\xi_i, \\quad \\xi_i \\geq 0\n$$</p>\n<p>当 \\(\\xi_i = 0\\) 时样本被正确分类且在间隔外；\\(0 < \\xi_i < 1\\) 时样本在间隔内但仍被正确分类；\\(\\xi_i \\geq 1\\) 时样本被误分类。参数 \\(C\\) 控制间隔最大化与误分类惩罚之间的权衡：\\(C\\) 越大越倾向于零训练误差（硬间隔），\\(C\\) 越小越倾向于更大间隔（容忍更多误分类）。</p>\n<p>对偶形式中，软间隔仅在约束上增加了上界：\\(0 \\leq \\alpha_i \\leq C\\)，其余形式与硬间隔完全一致。论文还讨论了使用 \\(F(u) = u^2\\) 的二次惩罚变体，此时对偶目标函数增加一个正则项 \\(\\frac{\\alpha_{\\max}}{C}\\)，保证解的唯一性。</p>\n<h5>核技巧与非线性扩展</h5>\n<p>SVM 最深刻的创新在于<strong>核技巧</strong>。设 \\(\\phi: \\mathbb{R}^n \\to \\mathbb{R}^N\\) 是将输入映射到高维特征空间的变换，则在特征空间中构造线性分类器等价于在输入空间中构造非线性分类器。由于对偶问题和决策函数都只依赖内积 \\(\\phi(\\mathbf{x}_i) \\cdot \\phi(\\mathbf{x}_j)\\)，只要存在核函数 \\(K(\\mathbf{u}, \\mathbf{v}) = \\phi(\\mathbf{u}) \\cdot \\phi(\\mathbf{v})\\) 可以直接计算，就无需显式构造 \\(\\phi\\)。</p>\n<p>根据 <strong>Mercer 定理</strong>，任何满足正定条件的对称函数都可以作为合法的核函数：</p>\n<p>$$\n\\iint K(\\mathbf{u}, \\mathbf{v}) g(\\mathbf{u}) g(\\mathbf{v}) \\, d\\mathbf{u} \\, d\\mathbf{v} \\geq 0, \\quad \\forall g \\in L^2\n$$</p>\n<p>论文中使用的核函数包括：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>核函数</th>\n<th>表达式</th>\n<th>对应特征空间</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>多项式核</td>\n<td>\\(K(\\mathbf{u},\\mathbf{v}) = (\\mathbf{u} \\cdot \\mathbf{v} + 1)^d\\)</td>\n<td>\\(d\\) 阶多项式的所有单项式</td>\n</tr>\n<tr>\n<td>RBF 核</td>\n<td>\\(K(\\mathbf{u},\\mathbf{v}) = \\exp\\left(-\\frac{\\|\\mathbf{u}-\\mathbf{v}\\|^2}{2\\sigma^2}\\right)\\)</td>\n<td>无穷维 Hilbert 空间</td>\n</tr>\n</tbody>\n</table></div>\n<p>决策函数变为：</p>\n<p>$$\nf(\\mathbf{x}) = \\text{sign}\\left(\\sum_{i=1}^{\\ell} y_i \\alpha_i K(\\mathbf{x}, \\mathbf{x}_i) + b\\right)\n$$</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：核技巧的计算复杂度与特征空间维度 \\(N\\) 无关，仅与训练样本数 \\(\\ell\\) 相关。例如 7 阶多项式核对应 \\(\\sim 10^{16}\\) 维特征空间，但核函数计算仅需 \\(O(n)\\) 时间（\\(n\\) 为输入维度）。</div>\n<h5>与传统方法的对比</h5>\n<p>论文在 USPS 手写数字数据集（7300 训练 / 2000 测试，16×16 像素）上进行了系统实验。使用多项式核 \\(d=1\\) 到 \\(d=7\\)，结果显示：线性 SVM 错误率 12.0%，2 阶多项式降至 4.7%，4 阶以上稳定在 ~4.3%，最优为 6 阶的 4.2%。作为对比，当时最优的 5 层特殊架构神经网络（LeNet1）错误率为 5.1%，标准两层神经网络为 6.6%，决策树（CART/C4.5）为 16-17%。</p>\n<p>值得注意的是，随着多项式阶数从 3 增加到 7，特征空间维度从 \\(10^6\\) 增长到 \\(10^{16}\\)，但支持向量数量仅从 148 增加到 190（增长 28%），且测试错误率几乎不变。这有力地验证了 SVM 通过最大间隔原则控制 VC 维、抵抗过拟合的理论预测——即使在极高维特征空间中，SVM 的泛化能力仍由支持向量数量（而非特征维度）决定。</p>",
      "quiz": {
        "q": "SVM 中核技巧（Kernel Trick）的本质作用是什么？",
        "options": [
          "降低训练数据的维度以加速计算",
          "通过核函数隐式计算高维特征空间中的内积，避免显式构造特征映射",
          "将非凸优化问题转化为凸优化问题",
          "自动选择最优的惩罚参数 C"
        ],
        "answer": 1,
        "explain": "核技巧利用满足 Mercer 条件的核函数 K(u,v) = φ(u)·φ(v) 直接计算高维特征空间中的内积，无需显式计算映射 φ，从而以输入空间的计算代价实现高维（甚至无穷维）特征空间中的线性分类。"
      }
    },
    {
      "id": "kmeans",
      "num": 3,
      "name": "K-means",
      "fullName": "K-means Clustering",
      "year": "1967",
      "org": "Bell Labs",
      "parent": "—",
      "paperUrl": "-",
      "projectUrl": "",
      "category": "foundation",
      "motivation": "迭代优化最小化簇内方差",
      "summary": "K-means 提出了一种基于迭代优化的聚类方法，通过交替执行\"分配样本到最近质心\"和\"更新质心为簇均值\"两步，最小化簇内平方误差和（Within-Cluster Sum of Squares），成为无监督学习中最经典、应用最广泛的聚类算法。",
      "keyPoints": [
        "<strong>迭代两步法</strong>：交替执行 Assignment（分配）和 Update（更新）两步直至收敛",
        "<strong>目标函数</strong>：最小化簇内平方误差和（WCSS / Inertia），即所有样本到其所属质心的欧氏距离平方之和",
        "<strong>Lloyd 算法</strong>：1957 年由 Stuart Lloyd 在 Bell Labs 提出的标准迭代求解过程（1982 年正式发表）",
        "<strong>MacQueen 命名</strong>：1967 年 James MacQueen 正式提出 \"K-means\" 术语，并给出在线更新变体",
        "<strong>收敛保证</strong>：每次迭代目标函数单调不增，有限步内必收敛至局部最优",
        "<strong>初始化敏感</strong>：结果强依赖初始质心选择，催生了 K-means++、多次随机重启等改进策略",
        "<strong>时间复杂度</strong>：单次迭代 \\(O(nKd)\\)，其中 \\(n\\) 为样本数、\\(K\\) 为簇数、\\(d\\) 为特征维度",
        "<strong>适用假设</strong>：隐含假设簇为凸形、各向同性（球状），且各簇大小相近"
      ],
      "detail": "<p><img alt=\"K-means 迭代过程示意图\" src=\"https://upload.wikimedia.org/wikipedia/commons/e/ea/K-means_convergence.gif\" />\n<em>图：K-means 算法在二维数据上的迭代收敛过程。不同颜色表示不同簇的分配结果，\"×\"标记为质心位置，随迭代逐步稳定。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># K-means (Lloyd's Algorithm) 伪代码\ndef kmeans(X, K, max_iter=100):\n    # Step 0: 随机初始化 K 个质心\n    centroids = random_select(X, K)\n\n    for t in range(max_iter):\n        # Step 1: Assignment — 将每个样本分配到最近的质心\n        clusters = {}\n        for x_i in X:\n            k_star = argmin_k ||x_i - centroids[k]||^2\n            clusters[k_star].append(x_i)\n\n        # Step 2: Update — 重新计算每个簇的质心\n        new_centroids = []\n        for k in range(K):\n            new_centroids[k] = mean(clusters[k])\n\n        # Step 3: 收敛判断\n        if centroids == new_centroids:\n            break\n        centroids = new_centroids\n\n    return centroids, clusters\n</code></pre>\n<h5>动机与背景</h5>\n<p>在无监督学习场景中，核心任务之一是将 \\(n\\) 个数据点划分为 \\(K\\) 个互不相交的组（簇），使得组内样本尽可能相似、组间样本尽可能不同。这一问题在信号处理（矢量量化）、数据压缩、模式识别等领域有广泛需求。</p>\n<p>最优划分问题本身是 NP-hard 的——穷举所有可能的划分方案数量随 \\(n\\) 和 \\(K\\) 指数增长（Stirling 数第二类）。因此，需要一种高效的近似算法。1957 年，Bell Labs 的 Stuart Lloyd 在脉冲编码调制（PCM）的量化问题中提出了迭代交替优化的思路：固定量化边界更新量化点，固定量化点更新边界。这一思想被推广为通用的聚类算法，即 K-means 的标准求解过程（Lloyd's Algorithm）。1967 年，MacQueen 在伯克利研讨会上正式引入 \"K-means\" 这一术语，并提出了一种在线（逐样本）更新质心的变体。</p>\n<div class=\"key-point\">💡 关键：K-means 的本质是用<strong>坐标下降 / 交替优化</strong>的策略，将一个 NP-hard 的组合优化问题转化为两个交替求解的凸子问题，从而在多项式时间内获得局部最优解。</div>\n<h5>核心机制：目标函数与两步迭代</h5>\n<p><strong>目标函数（WCSS）</strong></p>\n<p>K-means 的优化目标是最小化簇内平方误差和（Within-Cluster Sum of Squares）：</p>\n<p>$$J = \\sum_{k=1}^{K} \\sum_{x_i \\in C_k} \\|x_i - \\mu_k\\|^2$$</p>\n<p>其中 \\(C_k\\) 表示第 \\(k\\) 个簇的样本集合，\\(\\mu_k = \\frac{1}{|C_k|}\\sum_{x_i \\in C_k} x_i\\) 是第 \\(k\\) 个簇的质心（均值向量）。</p>\n<p>这个目标函数同时关于<strong>分配方案</strong> \\(\\{C_k\\}\\) 和<strong>质心位置</strong> \\(\\{\\mu_k\\}\\) 进行优化，是一个混合离散-连续优化问题。K-means 通过将其拆分为两个子问题交替求解：</p>\n<p><strong>Step 1 — Assignment（E-step 类比）</strong></p>\n<p>固定质心 \\(\\{\\mu_k\\}\\)，对每个样本 \\(x_i\\) 求解最优分配：</p>\n<p>$$c_i = \\arg\\min_{k \\in \\{1, \\ldots, K\\}} \\|x_i - \\mu_k\\|^2$$</p>\n<p>即将每个样本分配到距离最近的质心所在簇。这一步的几何解释是：以各质心为中心构建 <strong>Voronoi 划分</strong>，每个样本归属于其所在 Voronoi 区域对应的簇。</p>\n<p><strong>Step 2 — Update（M-step 类比）</strong></p>\n<p>固定分配方案 \\(\\{C_k\\}\\)，对每个簇求解最优质心：</p>\n<p>$$\\mu_k = \\frac{1}{|C_k|} \\sum_{x_i \\in C_k} x_i$$</p>\n<p>对 \\(\\mu_k\\) 求导令其为零即可得到：簇内样本的算术均值是使簇内平方误差最小的唯一最优解。这也是 \"K-<strong>means</strong>\" 名称的由来。</p>\n<div class=\"key-point\">💡 关键：每一步都在另一个变量固定时求解当前变量的全局最优，因此目标函数 \\(J\\) 在每次迭代中<strong>单调不增</strong>。又因为有限样本的划分方案数有限，算法必在有限步内收敛。</div>\n<h5>收敛性与局部最优</h5>\n<p>K-means 的收敛性可以严格证明：</p>\n<ol>\n<li><strong>单调性</strong>：Assignment 步不增加 \\(J\\)（每个样本选最近质心），Update 步不增加 \\(J\\)（均值最小化平方误差）</li>\n<li><strong>有限性</strong>：\\(n\\) 个样本分成 \\(K\\) 组的方案数有限（至多 \\(K^n\\) 种）</li>\n<li><strong>结论</strong>：算法必在有限步内终止于一个不动点</li>\n</ol>\n<p>然而，K-means <strong>不保证收敛到全局最优</strong>。目标函数 \\(J\\) 是非凸的，存在大量局部极小值。最终结果高度依赖初始质心的选择。</p>\n<p><strong>实践中的应对策略：</strong></p>\n<ul>\n<li><strong>多次随机重启</strong>：运行多次取 \\(J\\) 最小的结果（scikit-learn 默认 <code>n_init=10</code>）</li>\n<li><strong>K-means++ 初始化</strong>（Arthur &amp; Vassilvitskii, 2007）：按照与已选质心距离的平方成正比的概率依次选取初始质心，保证 \\(O(\\log K)\\) 的近似比</li>\n<li><strong>Mini-batch K-means</strong>：每次迭代仅使用一个小批量样本更新质心，适用于大规模数据</li>\n</ul>\n<h5>与 EM 算法的关系</h5>\n<p>K-means 可以视为<strong>高斯混合模型（GMM）在特殊假设下的极限情形</strong>：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>K-means</th>\n<th>GMM (EM)</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>分配方式</td>\n<td>硬分配（0/1）</td>\n<td>软分配（概率）</td>\n</tr>\n<tr>\n<td>簇形状</td>\n<td>球状（各向同性）</td>\n<td>任意椭球</td>\n</tr>\n<tr>\n<td>协方差假设</td>\n<td>\\(\\sigma^2 I\\)，\\(\\sigma \\to 0\\)</td>\n<td>每簇独立协方差矩阵</td>\n</tr>\n<tr>\n<td>目标函数</td>\n<td>WCSS</td>\n<td>对数似然</td>\n</tr>\n<tr>\n<td>更新规则</td>\n<td>算术均值</td>\n<td>加权均值</td>\n</tr>\n</tbody>\n</table></div>\n<p>当 GMM 中所有分量共享相同的球形协方差 \\(\\Sigma_k = \\sigma^2 I\\)，且令 \\(\\sigma \\to 0\\) 时，EM 算法的软分配退化为硬分配，恢复为 K-means。因此，K-means 本质上隐含了<strong>各簇为等方差球形高斯分布</strong>的假设。</p>\n<div class=\"warn-box\">⚠️ 注意：当数据中的簇呈现非球形（如条带状、环形）、大小差异显著或密度不均匀时，K-means 的表现会显著下降。此时应考虑 DBSCAN、谱聚类、GMM 等替代方法。</div>\n<h5>超参数 K 的选择</h5>\n<p>K-means 需要预先指定簇数 \\(K\\)，常用的选择方法包括：</p>\n<ul>\n<li><strong>肘部法则（Elbow Method）</strong>：绘制 \\(J\\) 随 \\(K\\) 的变化曲线，选取\"肘部\"拐点处的 \\(K\\)</li>\n<li><strong>轮廓系数（Silhouette Score）</strong>：衡量样本与自身簇的紧密度 vs. 与最近邻簇的分离度，取使平均轮廓系数最大的 \\(K\\)</li>\n<li><strong>Gap Statistic</strong>：比较实际数据的 \\(J\\) 与均匀分布参考数据的 \\(J\\) 之差</li>\n<li><strong>信息准则</strong>：BIC / AIC（在 GMM 框架下）</li>\n</ul>\n<h5>计算复杂度与可扩展性</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>操作</th>\n<th>复杂度</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>单次迭代</td>\n<td>\\(O(nKd)\\)</td>\n</tr>\n<tr>\n<td>总体（\\(T\\) 次迭代）</td>\n<td>\\(O(TnKd)\\)</td>\n</tr>\n<tr>\n<td>K-means++ 初始化</td>\n<td>\\(O(nKd)\\)</td>\n</tr>\n<tr>\n<td>Mini-batch 单次迭代</td>\n<td>\\(O(bKd)\\)，\\(b\\) 为批量大小</td>\n</tr>\n</tbody>\n</table></div>\n<p>K-means 的线性时间复杂度使其能够轻松处理百万级样本。结合 KD-tree 或 Ball-tree 加速最近质心搜索，可进一步提升效率。在分布式环境下，Assignment 步天然可并行，使 K-means 成为 MapReduce 等框架中最早被实现的机器学习算法之一。</p>\n<h5>经典变体与扩展</h5>\n<ul>\n<li><strong>K-medoids (PAM)</strong>：使用实际样本点而非均值作为簇中心，对离群点更鲁棒</li>\n<li><strong>K-means++</strong>：改进初始化策略，理论保证近似比 \\(O(\\log K)\\)</li>\n<li><strong>Mini-batch K-means</strong>：随机采样小批量更新，适用于大规模在线场景</li>\n<li><strong>Bisecting K-means</strong>：层次化二分策略，自顶向下递归二分最大簇</li>\n<li><strong>Kernel K-means</strong>：通过核函数映射到高维空间，处理非线性可分的簇结构</li>\n<li><strong>Fuzzy C-means</strong>：引入模糊隶属度，允许样本以不同概率属于多个簇</li>\n</ul>",
      "quiz": {
        "q": "K-means 算法在每次迭代中目标函数 J 的变化特性是什么？",
        "options": [
          "J 严格单调递减，直到收敛到全局最优",
          "J 单调不增，最终收敛到局部最优（不动点）",
          "J 可能先增后减，最终收敛到全局最优",
          "J 的变化不确定，取决于数据分布"
        ],
        "answer": 1,
        "explain": "Assignment 和 Update 两步各自不增加 J，因此 J 单调不增；但由于目标函数非凸，算法只保证收敛到局部最优而非全局最优。"
      }
    },
    {
      "id": "vae",
      "num": 4,
      "name": "VAE",
      "fullName": "Variational Autoencoder",
      "year": "2014",
      "org": "U Amsterdam",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/1312.6114",
      "projectUrl": "",
      "category": "core",
      "motivation": "变分推断框架的生成模型",
      "summary": "VAE 提出了一种基于变分推断的深度生成模型框架，通过**重参数化技巧（Reparameterization Trick）**使得含连续隐变量的有向概率模型可以用随机梯度下降端到端训练，同时联合优化生成模型参数 \\(\\boldsymbol{\\theta}\\) 和识别模型（编码器）参数 \\(\\boldsymbol{\\phi}\\)，奠定了现代深度生成模型的基础。",
      "keyPoints": [
        "<strong>变分下界（ELBO）</strong>：将不可解的边际似然 \\(\\log p_{\\boldsymbol{\\theta}}(\\mathbf{x})\\) 转化为可优化的证据下界（Evidence Lower Bound），作为训练目标",
        "<strong>重参数化技巧</strong>：将随机采样 \\(\\mathbf{z} \\sim q_{\\boldsymbol{\\phi}}(\\mathbf{z}|\\mathbf{x})\\) 改写为确定性变换 \\(\\mathbf{z} = \\boldsymbol{\\mu} + \\boldsymbol{\\sigma} \\odot \\boldsymbol{\\epsilon}\\)，\\(\\boldsymbol{\\epsilon} \\sim \\mathcal{N}(0, I)\\)，使梯度可以通过采样操作反向传播",
        "<strong>编码器-解码器架构</strong>：编码器 \\(q_{\\boldsymbol{\\phi}}(\\mathbf{z}|\\mathbf{x})\\) 近似不可解的后验分布，解码器 \\(p_{\\boldsymbol{\\theta}}(\\mathbf{x}|\\mathbf{z})\\) 从隐变量生成数据",
        "<strong>SGVB 估计器</strong>：Stochastic Gradient Variational Bayes 估计器，通过蒙特卡洛采样对 ELBO 进行无偏估计",
        "<strong>AEVB 算法</strong>：Auto-Encoding Variational Bayes 算法，将摊销推断（amortized inference）与 SGVB 结合，避免逐样本迭代推断",
        "<strong>KL 散度正则项可解析计算</strong>：当先验和后验均为高斯分布时，KL 散度项有闭式解，无需蒙特卡洛估计",
        "<strong>实验验证</strong>：在 MNIST 和 Frey Face 数据集上验证了模型的生成能力和隐空间表征质量"
      ],
      "detail": "<h5>核心框架示意图</h5>\n<p><img alt=\"VAE 概率图模型\" src=\"https://ar5iv.labs.arxiv.org/html/1312.6114/assets/x1.png\" />\n<em>图 1：VAE 的有向概率图模型。实线表示生成模型 \\(p_{\\boldsymbol{\\theta}}(\\mathbf{z})p_{\\boldsymbol{\\theta}}(\\mathbf{x}|\\mathbf{z})\\)，虚线表示变分近似 \\(q_{\\boldsymbol{\\phi}}(\\mathbf{z}|\\mathbf{x})\\) 对不可解后验 \\(p_{\\boldsymbol{\\theta}}(\\mathbf{z}|\\mathbf{x})\\) 的逼近。变分参数 \\(\\boldsymbol{\\phi}\\) 与生成模型参数 \\(\\boldsymbol{\\theta}\\) 联合学习。</em></p>\n<p><img alt=\"重参数化技巧示意\" src=\"https://ar5iv.labs.arxiv.org/html/1312.6114/assets/x2.png\" />\n<em>图 2：重参数化技巧的计算图对比。左图为普通采样（梯度无法回传），右图为重参数化后的计算图（梯度可通过确定性路径反向传播）。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># AEVB (Auto-Encoding Variational Bayes) 算法\n# 输入: 数据集 X, 编码器网络 encoder_φ, 解码器网络 decoder_θ\n\ninitialize θ, φ randomly\nwhile not converged:\n    X_M = sample_minibatch(X, M)          # 采样 mini-batch\n    for x in X_M:\n        # 编码: 得到后验近似的参数\n        μ, log_σ² = encoder_φ(x)\n\n        # 重参数化采样\n        ε ~ N(0, I)\n        z = μ + σ ⊙ ε                     # σ = exp(0.5 * log_σ²)\n\n        # 解码: 计算重构\n        x_recon = decoder_θ(z)\n\n    # 计算 ELBO 损失 (取负作为最小化目标)\n    L = -E[log p_θ(x|z)]                  # 重构损失\n        + D_KL(q_φ(z|x) || p(z))          # KL 正则项\n\n    g = ∇_{θ,φ} L                         # 计算梯度\n    θ, φ = update(θ, φ, g)                # SGD / Adam 更新\n\nreturn θ, φ\n</code></pre>\n<h5>动机与背景</h5>\n<p><strong>核心问题</strong>：在含连续隐变量的有向概率模型中，如何高效地进行后验推断和参数学习？</p>\n<p>传统变分贝叶斯（VB）方法依赖<strong>均场近似（mean-field approximation）</strong>，要求变分下界中的期望有解析解，这在一般情况下是不可能的。而 MCMC 方法虽然理论上可行，但计算代价过高，无法扩展到大规模数据集。</p>\n<p>VAE 的核心洞察是：通过引入一个<strong>参数化的推断网络</strong>（编码器）来摊销推断成本，并利用<strong>重参数化技巧</strong>使得整个系统可以用标准的随机梯度下降进行端到端优化。</p>\n<h5>核心机制：ELBO 推导</h5>\n<p>对于数据点 \\(\\mathbf{x}\\)，其边际对数似然可以分解为：</p>\n<p>$$\\log p_{\\boldsymbol{\\theta}}(\\mathbf{x}) = D_{KL}(q_{\\boldsymbol{\\phi}}(\\mathbf{z}|\\mathbf{x}) \\| p_{\\boldsymbol{\\theta}}(\\mathbf{z}|\\mathbf{x})) + \\mathcal{L}(\\boldsymbol{\\theta}, \\boldsymbol{\\phi}; \\mathbf{x})$$</p>\n<p>其中第一项是变分后验与真实后验之间的 KL 散度（非负），第二项即为<strong>证据下界（ELBO）</strong>：</p>\n<p>$$\\mathcal{L}(\\boldsymbol{\\theta}, \\boldsymbol{\\phi}; \\mathbf{x}) = \\mathbb{E}_{q_{\\boldsymbol{\\phi}}(\\mathbf{z}|\\mathbf{x})}[\\log p_{\\boldsymbol{\\theta}}(\\mathbf{x}|\\mathbf{z})] - D_{KL}(q_{\\boldsymbol{\\phi}}(\\mathbf{z}|\\mathbf{x}) \\| p_{\\boldsymbol{\\theta}}(\\mathbf{z}))$$</p>\n<div class=\"key-point\">💡 <strong>关键直觉</strong>：ELBO 由两部分组成——第一项是<strong>重构项</strong>，鼓励解码器从隐变量准确还原输入；第二项是 <strong>KL 正则项</strong>，约束编码器输出的后验分布接近先验 \\(p(\\mathbf{z}) = \\mathcal{N}(0, I)\\)，防止隐空间退化并确保生成时可以从先验采样。</div>\n<p>由于 KL 散度非负，ELBO 是边际似然的下界：\\(\\mathcal{L} \\leq \\log p_{\\boldsymbol{\\theta}}(\\mathbf{x})\\)。最大化 ELBO 等价于同时最大化似然并最小化变分后验与真实后验的差距。</p>\n<h5>核心机制：重参数化技巧</h5>\n<p>ELBO 中的期望 \\(\\mathbb{E}_{q_{\\boldsymbol{\\phi}}(\\mathbf{z}|\\mathbf{x})}[\\cdot]\\) 需要对 \\(\\mathbf{z}\\) 采样来估计，但直接从 \\(q_{\\boldsymbol{\\phi}}\\) 采样会导致梯度无法对 \\(\\boldsymbol{\\phi}\\) 反向传播（采样操作不可微）。</p>\n<p><strong>重参数化技巧</strong>的核心思想是将随机变量 \\(\\mathbf{z}\\) 表示为一个关于辅助噪声变量 \\(\\boldsymbol{\\epsilon}\\) 的确定性函数：</p>\n<p>$$\\mathbf{z} = g_{\\boldsymbol{\\phi}}(\\boldsymbol{\\epsilon}, \\mathbf{x}) = \\boldsymbol{\\mu}_{\\boldsymbol{\\phi}}(\\mathbf{x}) + \\boldsymbol{\\sigma}_{\\boldsymbol{\\phi}}(\\mathbf{x}) \\odot \\boldsymbol{\\epsilon}, \\quad \\boldsymbol{\\epsilon} \\sim \\mathcal{N}(0, \\mathbf{I})$$</p>\n<p>这样，期望从对 \\(q_{\\boldsymbol{\\phi}}\\) 的积分变为对 \\(p(\\boldsymbol{\\epsilon})\\) 的积分：</p>\n<p>$$\\mathbb{E}_{q_{\\boldsymbol{\\phi}}(\\mathbf{z}|\\mathbf{x})}[f(\\mathbf{z})] = \\mathbb{E}_{p(\\boldsymbol{\\epsilon})}[f(g_{\\boldsymbol{\\phi}}(\\boldsymbol{\\epsilon}, \\mathbf{x}))]$$</p>\n<div class=\"key-point\">💡 <strong>关键直觉</strong>：随机性被\"外包\"给了与参数无关的噪声 \\(\\boldsymbol{\\epsilon}\\)，而 \\(\\mathbf{z}\\) 关于 \\(\\boldsymbol{\\phi}\\) 的依赖变成了确定性的、可微的，从而可以用标准反向传播计算梯度。</div>\n<h5>高斯情形下的 KL 散度闭式解</h5>\n<p>当编码器输出高斯分布 \\(q_{\\boldsymbol{\\phi}}(\\mathbf{z}|\\mathbf{x}) = \\mathcal{N}(\\boldsymbol{\\mu}, \\text{diag}(\\boldsymbol{\\sigma}^2))\\)，先验为标准正态 \\(p(\\mathbf{z}) = \\mathcal{N}(0, \\mathbf{I})\\) 时，KL 散度有解析解：</p>\n<p>$$D_{KL}(q_{\\boldsymbol{\\phi}}(\\mathbf{z}|\\mathbf{x}) \\| p(\\mathbf{z})) = -\\frac{1}{2} \\sum_{j=1}^{J} \\left(1 + \\log \\sigma_j^2 - \\mu_j^2 - \\sigma_j^2\\right)$$</p>\n<p>其中 \\(J\\) 是隐变量维度。这避免了对 KL 项的蒙特卡洛估计，降低了方差。</p>\n<h5>训练与推理流程</h5>\n<p><strong>训练阶段</strong>：\n1. 输入 \\(\\mathbf{x}\\)，编码器输出 \\(\\boldsymbol{\\mu}, \\log \\boldsymbol{\\sigma}^2\\)\n2. 采样 \\(\\boldsymbol{\\epsilon} \\sim \\mathcal{N}(0, \\mathbf{I})\\)，计算 \\(\\mathbf{z} = \\boldsymbol{\\mu} + \\boldsymbol{\\sigma} \\odot \\boldsymbol{\\epsilon}\\)\n3. 解码器从 \\(\\mathbf{z}\\) 重构 \\(\\hat{\\mathbf{x}}\\)\n4. 计算损失 = 重构损失 + KL 散度，反向传播更新 \\(\\boldsymbol{\\theta}, \\boldsymbol{\\phi}\\)</p>\n<p><strong>生成（推理）阶段</strong>：\n1. 从先验采样 \\(\\mathbf{z} \\sim \\mathcal{N}(0, \\mathbf{I})\\)\n2. 通过解码器生成 \\(\\mathbf{x} = p_{\\boldsymbol{\\theta}}(\\mathbf{x}|\\mathbf{z})\\)</p>\n<h5>与传统方法的区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>推断方式</th>\n<th>可扩展性</th>\n<th>端到端训练</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>均场变分推断</td>\n<td>需要解析期望</td>\n<td>受限于共轭性</td>\n<td>❌</td>\n</tr>\n<tr>\n<td>MCMC</td>\n<td>迭代采样</td>\n<td>计算代价高</td>\n<td>❌</td>\n</tr>\n<tr>\n<td>Wake-Sleep</td>\n<td>两阶段交替</td>\n<td>中等</td>\n<td>部分</td>\n</tr>\n<tr>\n<td><strong>VAE (AEVB)</strong></td>\n<td><strong>摊销推断 + 重参数化</strong></td>\n<td><strong>可扩展到大数据</strong></td>\n<td><strong>✅</strong></td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：VAE 的 ELBO 目标存在一个已知问题——<strong>后验坍缩（posterior collapse）</strong>，即编码器可能退化为先验，隐变量不携带有用信息。这在后续工作（如 β-VAE、δ-VAE）中被广泛研究。</div>",
      "quiz": {
        "q": "VAE 中重参数化技巧的核心作用是什么？",
        "options": [
          "将离散隐变量转化为连续隐变量",
          "将采样操作的随机性与可学习参数解耦，使梯度可以反向传播",
          "减少隐变量的维度以降低计算复杂度",
          "使先验分布从高斯变为更灵活的分布族"
        ],
        "answer": 1,
        "explain": "重参数化技巧将 z = μ + σ⊙ε，把随机性转移到与参数无关的噪声 ε 上，使得 z 关于编码器参数 φ 的梯度可以通过确定性路径反向传播。"
      }
    },
    {
      "id": "pseudo_label",
      "num": 5,
      "name": "Pseudo-labeling",
      "fullName": "Pseudo-labeling",
      "year": "2013",
      "org": "NYU",
      "parent": "—",
      "paperUrl": "-",
      "projectUrl": "",
      "category": "foundation",
      "motivation": "高置信度预测作为伪标签",
      "summary": "Pseudo-Label 提出将神经网络对无标签数据的**最高置信度预测类别**直接作为伪标签，与有标签数据联合训练，以一种极其简洁的方式实现半监督学习，并从理论上证明该方法等价于**熵正则化（Entropy Regularization）**，鼓励决策边界穿过数据低密度区域。",
      "keyPoints": [
        "<strong>伪标签定义</strong>：取模型对无标签样本预测概率最大的类别作为\"硬\"伪标签 \\(\\hat{y}_i = \\arg\\max_c f_c(x_i; \\theta)\\)",
        "<strong>联合损失函数</strong>：有标签数据的交叉熵损失 + 加权的无标签数据伪标签交叉熵损失，权重 \\(\\alpha(t)\\) 随训练进程递增",
        "<strong>熵最小化等价性</strong>：使用伪标签训练等价于最小化无标签数据上的条件熵 \\(H(Y|X)\\)，与低密度分离假设（Low-Density Separation）一致",
        "<strong>课程式权重调度</strong>：无监督损失权重 \\(\\alpha(t)\\) 从 0 逐渐增大，避免训练初期不可靠伪标签干扰模型",
        "<strong>去噪自编码器预训练</strong>：利用 Denoising Autoencoder 进行逐层无监督预训练，提供更好的初始化",
        "<strong>Dropout 正则化</strong>：微调阶段使用 Dropout 防止过拟合，与伪标签机制协同提升泛化能力",
        "<strong>实验验证</strong>：在 MNIST 数据集上，使用仅 100–3000 个有标签样本 + 60000 个无标签样本，显著超越纯监督基线"
      ],
      "detail": "<h5>核心框架示意图</h5>\n<p>由于本文发表于 ICML 2013 Workshop（非 arxiv 托管），无公开可访问的原始图片直链。以下用文本示意描述论文核心框架：</p>\n<pre><code>┌─────────────────────────────────────────────────────┐\n│              Pseudo-Label 训练框架                     │\n│                                                       │\n│  有标签数据 (x_i, y_i)          无标签数据 x_j         │\n│         │                            │                │\n│         ▼                            ▼                │\n│   ┌──────────────────────────────────────┐           │\n│   │        共享神经网络 f(·; θ)           │           │\n│   └──────────────────────────────────────┘           │\n│         │                            │                │\n│         ▼                            ▼                │\n│   softmax 输出                  softmax 输出          │\n│   p(y|x_i; θ)                  p(y|x_j; θ)          │\n│         │                            │                │\n│         ▼                            ▼                │\n│   交叉熵损失 L_s              伪标签: ŷ_j = argmax p  │\n│   (与真实标签 y_i)             交叉熵损失 L_u          │\n│         │                     (与伪标签 ŷ_j)          │\n│         │                            │                │\n│         ▼                            ▼                │\n│              L = L_s + α(t) · L_u                     │\n│                      │                                │\n│                      ▼                                │\n│               反向传播更新 θ                            │\n└─────────────────────────────────────────────────────┘\n</code></pre>\n<p><em>图：Pseudo-Label 训练框架。有标签数据使用真实标签计算监督损失，无标签数据使用模型自身的最高置信度预测作为伪标签计算无监督损失，两者加权求和后联合优化网络参数。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># Pseudo-Label 半监督训练算法\n# 输入: 有标签数据集 D_L = {(x_i, y_i)}, 无标签数据集 D_U = {x_j}\n# 输入: 网络 f(·; θ), 最大无监督权重 α_f, 预热轮数 T1, T2\n\n# 第一阶段: 去噪自编码器逐层预训练\nfor each layer l in network:\n    pretrain_denoising_autoencoder(layer_l, D_L ∪ D_U)\n\n# 第二阶段: 带 Pseudo-Label 的微调\ninitialize θ from pretrained weights\nfor epoch t in range(num_epochs):\n    # 计算当前无监督损失权重 (课程式调度)\n    if t &lt; T1:\n        α = 0\n    elif t &lt; T2:\n        α = α_f * (t - T1) / (T2 - T1)\n    else:\n        α = α_f\n\n    for (x_labeled, y_true), x_unlabeled in zip(D_L, D_U):\n        # 前向传播\n        p_l = softmax(f(x_labeled; θ))    # 有标签样本预测\n        p_u = softmax(f(x_unlabeled; θ))  # 无标签样本预测\n\n        # 生成伪标签 (硬标签, 取 argmax)\n        ŷ = argmax(p_u)\n\n        # 计算联合损失\n        L_s = CrossEntropy(p_l, y_true)    # 监督损失\n        L_u = CrossEntropy(p_u, ŷ)         # 伪标签损失\n        L = L_s + α * L_u                  # 总损失\n\n        # 反向传播 (使用 Dropout)\n        backward(L)\n        update(θ)\n\nreturn θ\n</code></pre>\n<h5>动机与背景</h5>\n<p><strong>核心问题</strong>：在深度神经网络训练中，如何利用大量无标签数据来提升模型性能，尤其是在有标签数据极度稀缺的场景下？</p>\n<p>2013 年前后，深度学习在监督学习领域取得了突破性进展，但其成功严重依赖大规模标注数据。在实际应用中，标注数据的获取成本高昂，而无标签数据则相对廉价且丰富。传统的半监督学习方法（如 Transductive SVM、图方法）在浅层模型上已有成熟研究，但如何将半监督学习与深度神经网络有效结合仍是开放问题。</p>\n<p>此前的工作主要通过<strong>无监督预训练</strong>（如 Stacked Denoising Autoencoders、DBN）来利用无标签数据学习好的特征表示，但预训练和微调是分离的两个阶段，无标签数据在微调阶段未被直接利用。</p>\n<p>Dong-Hyun Lee 提出的 Pseudo-Label 方法的核心洞察是：<strong>可以在训练过程中直接将网络对无标签数据的高置信度预测当作\"真实标签\"来使用</strong>，从而在微调阶段也能持续利用无标签数据。这一思想极其简洁，几乎不增加任何实现复杂度，却能带来显著的性能提升。</p>\n<h5>核心机制：伪标签与联合损失</h5>\n<p>Pseudo-Label 方法的核心是构造一个同时利用有标签和无标签数据的联合损失函数。</p>\n<p>对于有标签数据集 \\(\\mathcal{D}_L = \\{(x_i, y_i)\\}_{i=1}^{n}\\) 和无标签数据集 \\(\\mathcal{D}_U = \\{x_j\\}_{j=1}^{n'}\\)，总损失定义为：</p>\n<p>$$L = \\frac{1}{n} \\sum_{i=1}^{n} \\sum_{c=1}^{C} y_i^c \\log f_c(x_i; \\theta) + \\alpha(t) \\cdot \\frac{1}{n'} \\sum_{j=1}^{n'} \\sum_{c=1}^{C} \\hat{y}_j^c \\log f_c(x_j; \\theta)$$</p>\n<p>其中：\n- \\(C\\) 是类别数，\\(f_c(x; \\theta)\\) 是 softmax 输出的第 \\(c\\) 类概率\n- \\(y_i^c\\) 是有标签样本的 one-hot 真实标签\n- \\(\\hat{y}_j^c\\) 是无标签样本的<strong>伪标签</strong>，定义为 one-hot 向量：</p>\n<p>$$\\hat{y}_j^c = \\begin{cases} 1 & \\text{if } c = \\arg\\max_{c'} f_{c'}(x_j; \\theta) \\\\ 0 & \\text{otherwise} \\end{cases}$$</p>\n<ul>\n<li>\\(\\alpha(t)\\) 是随训练轮次 \\(t\\) 变化的无监督损失权重</li>\n</ul>\n<div class=\"key-point\">💡 <strong>关键直觉</strong>：伪标签本质上是一种\"自训练（Self-Training）\"策略——模型用自己的预测来教自己。当模型对某个无标签样本的预测置信度很高时，这个预测很可能是正确的，因此可以当作额外的训练信号。即使部分伪标签是错误的，只要正确的伪标签占多数，网络仍然能从中受益。</div>\n<h5>核心机制：熵正则化等价性</h5>\n<p>论文的一个重要理论贡献是证明了 Pseudo-Label 方法等价于<strong>熵正则化（Entropy Regularization）</strong>。</p>\n<p>无标签数据上的伪标签交叉熵损失可以改写为：</p>\n<p>$$L_u = -\\frac{1}{n'} \\sum_{j=1}^{n'} \\sum_{c=1}^{C} \\hat{y}_j^c \\log f_c(x_j; \\theta)$$</p>\n<p>由于 \\(\\hat{y}_j\\) 是 one-hot 向量（取 argmax），这等价于：</p>\n<p>$$L_u = -\\frac{1}{n'} \\sum_{j=1}^{n'} \\log \\max_c f_c(x_j; \\theta) = -\\frac{1}{n'} \\sum_{j=1}^{n'} \\max_c \\log f_c(x_j; \\theta)$$</p>\n<p>最小化此项会鼓励模型对无标签数据产生<strong>低熵（高置信度）</strong>的预测分布。这与显式最小化条件熵的效果一致：</p>\n<p>$$H(Y|X) = -\\mathbb{E}_{x} \\left[ \\sum_{c=1}^{C} p(y=c|x) \\log p(y=c|x) \\right]$$</p>\n<div class=\"key-point\">💡 <strong>关键直觉</strong>：熵最小化背后的假设是<strong>低密度分离假设（Low-Density Separation Assumption）</strong>——类别的决策边界应该穿过数据分布的低密度区域。最小化无标签数据上的预测熵，等价于迫使模型对每个无标签样本给出更确定的分类，从而将决策边界推离数据密集区域。这是半监督学习中<strong>聚类假设（Cluster Assumption）</strong>的直接体现。</div>\n<h5>核心机制：课程式权重调度</h5>\n<p>伪标签的质量高度依赖于当前模型的预测能力。在训练初期，模型尚未充分学习，其预测不可靠，此时大量使用伪标签会引入噪声甚至导致训练崩溃。因此，论文提出了一种<strong>课程式（Curriculum-like）权重调度策略</strong>：</p>\n<p>$$\\alpha(t) = \\begin{cases} 0 & \\text{if } t < T_1 \\\\ \\frac{\\alpha_f \\cdot (t - T_1)}{T_2 - T_1} & \\text{if } T_1 \\leq t < T_2 \\\\ \\alpha_f & \\text{if } t \\geq T_2 \\end{cases}$$</p>\n<p>其中 \\(T_1\\) 是预热期（仅使用有标签数据训练），\\(T_2\\) 是权重达到最大值 \\(\\alpha_f\\) 的时刻。</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：\\(\\alpha(t)\\) 的选择对最终性能影响很大。如果 \\(\\alpha_f\\) 过大，错误伪标签的噪声会主导训练；如果过小，无标签数据的利用不充分。论文中通过实验调优，在 MNIST 上使用 \\(\\alpha_f = 3\\)，\\(T_1 = 100\\)，\\(T_2 = 600\\)。</div>\n<h5>训练流程</h5>\n<p>论文采用两阶段训练流程：</p>\n<p><strong>第一阶段——去噪自编码器预训练</strong>：\n1. 使用全部数据（有标签 + 无标签，忽略标签）逐层训练 Denoising Autoencoder\n2. 每层学习到的权重作为对应网络层的初始化\n3. 这一步利用无标签数据学习通用的特征表示</p>\n<p><strong>第二阶段——Pseudo-Label 微调</strong>：\n1. 用预训练权重初始化网络\n2. 在每个 mini-batch 中，同时采样有标签和无标签数据\n3. 前向传播计算所有样本的 softmax 输出\n4. 对无标签样本取 argmax 生成伪标签\n5. 计算联合损失 \\(L = L_s + \\alpha(t) \\cdot L_u\\)\n6. 使用带 Dropout 的 SGD 进行反向传播和参数更新</p>\n<h5>与传统方法的区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>核心思想</th>\n<th>无标签数据利用方式</th>\n<th>实现复杂度</th>\n<th>与深度学习兼容性</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Transductive SVM</td>\n<td>最大间隔 + 低密度分离</td>\n<td>优化决策边界位置</td>\n<td>高（需解凸优化）</td>\n<td>❌ 不适用</td>\n</tr>\n<tr>\n<td>图半监督方法</td>\n<td>标签传播</td>\n<td>构建相似度图传播标签</td>\n<td>中（需构图）</td>\n<td>❌ 不易扩展</td>\n</tr>\n<tr>\n<td>去噪自编码器预训练</td>\n<td>无监督特征学习</td>\n<td>仅用于预训练阶段</td>\n<td>低</td>\n<td>✅ 但微调时未用</td>\n</tr>\n<tr>\n<td><strong>Pseudo-Label</strong></td>\n<td><strong>自训练 + 熵正则化</strong></td>\n<td><strong>微调阶段持续利用</strong></td>\n<td><strong>极低</strong></td>\n<td><strong>✅ 原生兼容</strong></td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 <strong>关键优势</strong>：Pseudo-Label 的最大优势在于其<strong>极简性</strong>——不需要修改网络架构，不需要额外的模型组件，只需在标准训练循环中加入几行代码即可实现。这使得它可以与任何深度学习架构和训练技巧（如 Dropout、Batch Normalization 等）无缝结合。这一思想后来深刻影响了 FixMatch、MixMatch、UDA 等现代半监督学习方法。</div>",
      "quiz": {
        "q": "Pseudo-Label 方法在理论上等价于以下哪种正则化技术？",
        "options": [
          "L2 权重衰减正则化",
          "条件熵最小化（Entropy Regularization）",
          "Dropout 随机失活正则化",
          "数据增强正则化"
        ],
        "answer": 1,
        "explain": "论文证明，使用 argmax 伪标签对无标签数据计算交叉熵损失，等价于最小化模型在无标签数据上的条件熵 H(Y|X)，鼓励决策边界穿过低密度区域，符合半监督学习的低密度分离假设。"
      }
    },
    {
      "id": "fixmatch",
      "num": 6,
      "name": "FixMatch",
      "fullName": "FixMatch",
      "year": "2020",
      "org": "Google",
      "parent": "pseudo_label",
      "paperUrl": "https://proceedings.neurips.cc/paper/2020/hash/06964dce9addb1c5cb5d6e3d9838f733-Abstract.html",
      "projectUrl": "",
      "category": "core",
      "motivation": "弱增强伪标签+强增强一致性",
      "summary": "FixMatch 将伪标签（Pseudo-Labeling）与一致性正则化（Consistency Regularization）两大半监督学习技术极简地统一：对弱增强的无标签图像生成高置信度伪标签，再要求模型对同一图像的强增强版本预测出相同标签，以极简的设计在多个基准上取得了当时的最优性能。",
      "keyPoints": [
        "<strong>两大经典技术的极简融合</strong>：将伪标签（硬标签 + 置信度阈值过滤）与一致性正则化（弱增强 vs 强增强）合二为一",
        "<strong>弱-强增强分离</strong>：弱增强（随机翻转 + 平移）用于生成可靠的伪标签，强增强（RandAugment / CTAugment + Cutout）用于一致性训练",
        "<strong>置信度阈值过滤</strong>：仅当模型对弱增强图像的最大类别概率 \\(\\geq \\tau\\)（默认 0.95）时才保留伪标签，自然形成课程学习效果",
        "<strong>无需损失权重退火</strong>：不同于 UDA / ReMixMatch 需要逐步增大无标签损失权重，阈值机制本身在训练早期自动过滤大部分样本",
        "<strong>统一超参数</strong>：在 CIFAR-10/100、SVHN、STL-10 上使用完全相同的超参数集（\\(\\lambda_u=1, \\eta=0.03, \\tau=0.95, \\mu=7, B=64\\)）",
        "<strong>极端低标签性能</strong>：CIFAR-10 仅用 40 个标签（每类 4 个）即达到 88.61% 准确率；仅用 10 个标签（每类 1 个）可达约 78% 准确率",
        "<strong>网络与优化</strong>：使用 WideResNet + SGD（带动量）+ 余弦学习率衰减 + 权重衰减 + EMA 参数"
      ],
      "detail": "<p><img alt=\"FixMatch 核心流程图\" src=\"https://raw.githubusercontent.com/google-research/fixmatch/master/media/FixMatch%20diagram.png\" />\n<em>图：FixMatch 流程示意。对无标签图像进行弱增强后送入模型获取预测（红框），当最大类别概率超过阈值（虚线）时将预测转为 one-hot 伪标签；同时对同一图像进行强增强后送入模型获取预测，通过交叉熵损失使强增强预测匹配伪标签。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># FixMatch 核心算法伪代码\n# 输入: 标签数据 X = {(x_b, p_b)}, 无标签数据 U = {u_b}\n# 超参数: τ (置信度阈值), λ_u (无标签损失权重), µ (无标签/标签批次比)\n\nfor each training step:\n    # ===== 有监督损失 =====\n    for x_b, p_b in labeled_batch(B):\n        x_weak = weak_augment(x_b)           # 随机翻转 + 平移\n        ℓ_s = CrossEntropy(p_b, model(x_weak))\n\n    # ===== 无监督损失 =====\n    for u_b in unlabeled_batch(µ * B):\n        # 步骤 1: 用弱增强生成伪标签\n        q_b = model(weak_augment(u_b))        # 模型对弱增强的预测\n        q_hat = one_hot(argmax(q_b))          # 转为硬伪标签\n\n        # 步骤 2: 置信度过滤\n        mask_b = 1 if max(q_b) &gt;= τ else 0    # 仅保留高置信度\n\n        # 步骤 3: 用强增强计算一致性损失\n        p_strong = model(strong_augment(u_b))  # 模型对强增强的预测\n        ℓ_u += mask_b * CrossEntropy(q_hat, p_strong)\n\n    # ===== 总损失 =====\n    loss = ℓ_s + λ_u * ℓ_u\n    optimizer.step(loss)\n</code></pre>\n<h5>动机与背景</h5>\n<p>半监督学习（SSL）旨在利用大量无标签数据提升模型性能，缓解标注数据稀缺的问题。在 FixMatch 之前，SSL 领域的两大主流技术路线分别是：</p>\n<ol>\n<li>\n<p><strong>伪标签（Pseudo-Labeling / Self-Training）</strong>：用模型自身的预测作为无标签数据的\"硬\"标签进行训练，通常配合置信度阈值过滤低质量预测。其本质是一种熵最小化，鼓励模型在无标签数据上产生高置信度（低熵）预测。</p>\n</li>\n<li>\n<p><strong>一致性正则化（Consistency Regularization）</strong>：基于\"模型对同一输入的不同扰动应产生相似预测\"的假设，通过最小化不同扰动版本之间预测的差异来利用无标签数据。代表方法包括 Π-Model、Mean Teacher、UDA 等。</p>\n</li>\n</ol>\n<p>在 FixMatch 之前，最先进的方法如 MixMatch、UDA 和 ReMixMatch 虽然取得了优异性能，但引入了越来越多的复杂组件：温度锐化（sharpening）、分布对齐（Distribution Alignment）、MixUp 数据混合、自监督旋转损失、训练信号退火（Training Signal Annealing）等。这些组件增加了超参数数量和调参难度。</p>\n<div class=\"key-point\">💡 关键：FixMatch 的核心洞察是——将伪标签和一致性正则化通过<strong>弱-强增强分离</strong>自然地统一起来：弱增强保证伪标签的质量（因为扰动小，预测更可靠），强增强提供足够的扰动使一致性约束具有实际意义（迫使模型学习对强变换不变的特征）。这一设计使得许多额外组件变得不必要。</div>\n<h5>核心机制：弱-强增强 + 置信度伪标签</h5>\n<p><strong>损失函数设计</strong></p>\n<p>FixMatch 的总损失由有监督损失 \\(\\ell_s\\) 和无监督损失 \\(\\ell_u\\) 两部分组成：</p>\n<p>$$\\mathcal{L} = \\ell_s + \\lambda_u \\, \\ell_u$$</p>\n<p><strong>有监督损失</strong>是标准的交叉熵损失，作用于弱增强的标签数据：</p>\n<p>$$\\ell_s = \\frac{1}{B} \\sum_{b=1}^{B} \\mathrm{H}\\!\\left(p_b,\\; p_m\\!\\left(y \\mid \\alpha(x_b)\\right)\\right)$$</p>\n<p>其中 \\(\\alpha(\\cdot)\\) 为弱增强，\\(p_b\\) 为 one-hot 真实标签，\\(B\\) 为标签批次大小。</p>\n<p><strong>无监督损失</strong>是 FixMatch 的核心，结合了伪标签和一致性正则化：</p>\n<p>$$\\ell_u = \\frac{1}{\\mu B} \\sum_{b=1}^{\\mu B} \\mathbb{1}\\!\\left(\\max(q_b) \\geq \\tau\\right) \\cdot \\mathrm{H}\\!\\left(\\hat{q}_b,\\; p_m\\!\\left(y \\mid \\mathcal{A}(u_b)\\right)\\right)$$</p>\n<p>其中：\n- \\(q_b = p_m(y \\mid \\alpha(u_b))\\) 是模型对<strong>弱增强</strong>无标签图像的预测分布\n- \\(\\hat{q}_b = \\text{argmax}(q_b)\\) 是将预测转为 one-hot 的<strong>硬伪标签</strong>\n- \\(\\mathcal{A}(\\cdot)\\) 为<strong>强增强</strong>\n- \\(\\tau\\) 为置信度阈值（默认 0.95）\n- \\(\\mu\\) 为无标签与标签批次大小的比值（默认 7）</p>\n<div class=\"warn-box\">⚠️ 注意：与标准伪标签方法（eq. 2）的关键区别在于——伪标签基于<strong>弱增强</strong>图像生成，而损失作用于<strong>强增强</strong>图像的预测。这引入了一致性正则化的效果，是 FixMatch 成功的关键。</div>\n<p><strong>弱增强与强增强</strong></p>\n<ul>\n<li>\n<p><strong>弱增强 \\(\\alpha(\\cdot)\\)</strong>：仅包含随机水平翻转（50% 概率，SVHN 除外）和随机平移（上下左右最多 12.5%）。这种轻微扰动保证了模型预测的可靠性，从而生成高质量伪标签。</p>\n</li>\n<li>\n<p><strong>强增强 \\(\\mathcal{A}(\\cdot)\\)</strong>：使用 RandAugment 或 CTAugment（均基于 AutoAugment 的变换库），随后叠加 Cutout。RandAugment 从预定义范围随机采样所有变换的强度；CTAugment 在线学习各变换的合适强度。这些强增强会产生严重失真的图像，迫使模型学习语义不变的特征。</p>\n</li>\n</ul>\n<p><strong>置信度阈值的课程学习效应</strong></p>\n<p>训练初期，模型预测不确定，大部分无标签样本的 \\(\\max(q_b) < \\tau\\)，因此无监督损失的有效样本很少。随着训练推进，模型逐渐变得自信，越来越多样本通过阈值过滤。这自然形成了一种<strong>课程学习（Curriculum Learning）</strong>效果——从简单（高置信度）样本逐步过渡到困难样本——无需像 UDA 或 MixMatch 那样显式设计损失权重的退火策略。</p>\n<h5>训练与优化细节</h5>\n<p>FixMatch 在所有数据集（除 ImageNet 外）上使用<strong>完全相同的超参数</strong>：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>超参数</th>\n<th>符号</th>\n<th>值</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>无标签损失权重</td>\n<td>\\(\\lambda_u\\)</td>\n<td>1</td>\n</tr>\n<tr>\n<td>学习率</td>\n<td>\\(\\eta\\)</td>\n<td>0.03</td>\n</tr>\n<tr>\n<td>SGD 动量</td>\n<td>\\(\\beta\\)</td>\n<td>0.9</td>\n</tr>\n<tr>\n<td>置信度阈值</td>\n<td>\\(\\tau\\)</td>\n<td>0.95</td>\n</tr>\n<tr>\n<td>无标签批次倍数</td>\n<td>\\(\\mu\\)</td>\n<td>7</td>\n</tr>\n<tr>\n<td>标签批次大小</td>\n<td>\\(B\\)</td>\n<td>64</td>\n</tr>\n<tr>\n<td>总训练步数</td>\n<td>\\(K\\)</td>\n<td>\\(2^{20}\\)</td>\n</tr>\n</tbody>\n</table></div>\n<p>其他关键设计选择：\n- <strong>优化器</strong>：SGD + 动量（优于 Adam）\n- <strong>学习率调度</strong>：余弦衰减 \\(\\eta \\cos\\!\\left(\\frac{7\\pi k}{16K}\\right)\\)\n- <strong>正则化</strong>：权重衰减（weight decay）\n- <strong>参数平均</strong>：使用模型参数的指数移动平均（EMA）报告最终性能\n- <strong>网络架构</strong>：WideResNet-28-2（CIFAR-10/SVHN，1.5M 参数）、WRN-28-8（CIFAR-100）、WRN-37-2（STL-10）、ResNet-50（ImageNet）</p>\n<h5>与先前方法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>伪标签增强</th>\n<th>预测增强</th>\n<th>标签后处理</th>\n<th>额外组件</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Π-Model</td>\n<td>弱</td>\n<td>弱</td>\n<td>无</td>\n<td>—</td>\n</tr>\n<tr>\n<td>Mean Teacher</td>\n<td>弱</td>\n<td>弱</td>\n<td>无</td>\n<td>EMA 教师</td>\n</tr>\n<tr>\n<td>UDA</td>\n<td>弱</td>\n<td>强</td>\n<td>锐化</td>\n<td>训练信号退火</td>\n</tr>\n<tr>\n<td>MixMatch</td>\n<td>弱</td>\n<td>弱</td>\n<td>锐化</td>\n<td>MixUp、多次增强平均</td>\n</tr>\n<tr>\n<td>ReMixMatch</td>\n<td>弱</td>\n<td>强</td>\n<td>锐化</td>\n<td>分布对齐、旋转损失、MixUp</td>\n</tr>\n<tr>\n<td><strong>FixMatch</strong></td>\n<td><strong>弱</strong></td>\n<td><strong>强</strong></td>\n<td><strong>伪标签</strong></td>\n<td><strong>无</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p>FixMatch 可以被视为 UDA 和 ReMixMatch 的大幅简化版本：移除了锐化（sharpening）、训练信号退火、分布对齐、自监督旋转损失等组件，仅保留弱-强增强一致性和置信度阈值伪标签这两个核心要素。尽管如此，FixMatch 在 CIFAR-10（250 标签：5.07% 错误率 vs ReMixMatch 5.44%）、SVHN（250 标签：2.48% vs 2.92%）等基准上均取得了更优或可比的性能。</p>\n<div class=\"key-point\">💡 关键：FixMatch 的成功表明，在半监督学习中，<strong>数据增强的质量</strong>（弱-强分离策略）和<strong>伪标签的过滤机制</strong>（高置信度阈值）是最关键的因素，而许多复杂的附加组件并非必要。</div>",
      "quiz": {
        "q": "FixMatch 中伪标签是基于哪种增强方式的模型预测生成的？",
        "options": [
          "强增强（如 RandAugment + Cutout）",
          "弱增强（如随机翻转 + 平移）",
          "无增强的原始图像",
          "弱增强和强增强预测的平均"
        ],
        "answer": 1,
        "explain": "FixMatch 使用弱增强图像的模型预测生成伪标签（保证预测可靠性），然后将该伪标签作为强增强图像预测的训练目标，从而实现一致性正则化。"
      }
    },
    {
      "id": "bert",
      "num": 7,
      "name": "BERT",
      "fullName": "Bidirectional Encoder Representations from Transformers",
      "year": "2019",
      "org": "Google",
      "parent": "—",
      "paperUrl": "https://aclanthology.org/N19-1423/",
      "projectUrl": "",
      "category": "core",
      "motivation": "掩码语言模型实现双向理解",
      "summary": "BERT 提出了基于掩码语言模型（MLM）和下一句预测（NSP）的双向 Transformer 预训练方法，首次实现了在所有层同时利用左右上下文的深度双向语言表示，在 11 项 NLP 任务上刷新了当时的最优结果。",
      "keyPoints": [
        "<strong>双向 Transformer 编码器架构</strong>：BASE（L=12, H=768, A=12, 110M 参数）和 LARGE（L=24, H=1024, A=16, 340M 参数）两种规格",
        "<strong>掩码语言模型（MLM）</strong>：随机遮蔽 15% 的输入 token（80% 替换为 <code>[MASK]</code>、10% 替换为随机词、10% 保持不变），通过预测被遮蔽的词实现真正的双向预训练",
        "<strong>下一句预测（NSP）</strong>：二分类任务判断两个句子是否连续，增强模型对句间关系的理解",
        "<strong>统一的输入表示</strong>：Token Embedding + Segment Embedding + Position Embedding 三者相加，使用 WordPiece 分词（30K 词表）",
        "<strong>预训练-微调范式</strong>：预训练阶段在大规模无标注语料（BooksCorpus 800M + Wikipedia 2500M 词）上学习通用表示，微调阶段仅需添加一个输出层即可适配各类下游任务",
        "<strong>广泛的任务适配能力</strong>：通过不同的输入格式和输出层设计，统一处理分类、序列标注、阅读理解等多种任务类型",
        "<strong>Feature-based 用法</strong>：提取预训练模型的隐藏层特征（拼接最后 4 层效果最佳），可作为固定特征用于下游模型"
      ],
      "detail": "<p><img alt=\"BERT 预训练与微调总览\" src=\"https://ar5iv.labs.arxiv.org/html/1810.04805/assets/x1.png\" />\n<em>图 1：BERT 的预训练与微调框架。预训练阶段通过 MLM 和 NSP 两个任务联合训练，微调阶段针对不同下游任务使用相同的预训练模型，仅调整输入输出格式。</em></p>\n<p><img alt=\"BERT 输入表示\" src=\"https://ar5iv.labs.arxiv.org/html/1810.04805/assets/x2.png\" />\n<em>图 2：BERT 的输入表示。每个 token 的输入嵌入由 Token Embedding、Segment Embedding 和 Position Embedding 三者相加得到。</em></p>\n<pre><code class=\"language-python\"># BERT 预训练伪代码\n# 阶段一：构造训练样本\nfor document in corpus:\n    for (sent_A, sent_B) in sample_sentence_pairs(document):\n        # 50% 概率 B 是 A 的真实下一句，50% 概率随机采样\n        label_NSP = &quot;IsNext&quot; if is_real_next(sent_A, sent_B) else &quot;NotNext&quot;\n        tokens = [&quot;[CLS]&quot;] + tokenize(sent_A) + [&quot;[SEP]&quot;] + tokenize(sent_B) + [&quot;[SEP]&quot;]\n\n        # MLM：随机选择 15% 的 token 进行遮蔽\n        masked_positions = random_select(tokens, ratio=0.15)\n        for pos in masked_positions:\n            r = random()\n            if r &lt; 0.8:\n                tokens[pos] = &quot;[MASK]&quot;       # 80% 替换为 [MASK]\n            elif r &lt; 0.9:\n                tokens[pos] = random_token()  # 10% 替换为随机词\n            # else: 10% 保持不变\n\n        yield tokens, masked_positions, original_tokens, label_NSP\n\n# 阶段二：模型前向与损失计算\nfor batch in dataloader:\n    # 输入嵌入 = Token Emb + Segment Emb + Position Emb\n    H = TransformerEncoder(input_embeddings)  # [batch, seq_len, hidden]\n\n    # MLM 损失：对被遮蔽位置预测原始 token\n    mlm_logits = MLMHead(H[masked_positions])  # 线性层 + GELU + LayerNorm + 投影\n    L_MLM = CrossEntropy(mlm_logits, original_tokens)\n\n    # NSP 损失：使用 [CLS] 的表示进行二分类\n    cls_repr = H[:, 0, :]  # [CLS] 对应的隐藏状态\n    L_NSP = CrossEntropy(NSPHead(cls_repr), nsp_labels)\n\n    # 总损失\n    loss = L_MLM + L_NSP\n    loss.backward()\n    optimizer.step()\n</code></pre>\n<p><strong>动机与背景：为什么需要双向预训练？</strong></p>\n<p>在 BERT 之前，语言模型预训练主要有两种范式：一是以 ELMo 为代表的特征提取方法，它分别训练前向和后向 LSTM 后拼接，但两个方向的模型是独立训练的，无法在每一层同时利用双向上下文；二是以 OpenAI GPT 为代表的微调方法，它使用单向（从左到右）Transformer 解码器，虽然可以端到端微调，但受限于自回归目标函数，每个 token 只能看到其左侧的上下文。BERT 的核心洞察在于：<strong>许多 NLP 任务（如问答、自然语言推理）本质上需要对整个句子的双向理解</strong>，而非单向的序列生成。然而，标准的双向语言模型在训练时会产生\"信息泄露\"问题——每个词可以间接\"看到自己\"。BERT 通过掩码语言模型（MLM）巧妙地解决了这一矛盾：随机遮蔽输入中的部分 token，让模型根据双向上下文预测被遮蔽的词，从而在不泄露信息的前提下实现真正的深度双向预训练。</p>\n<p><strong>核心机制：MLM 的遮蔽策略与 NSP 任务设计</strong></p>\n<p>MLM 的遮蔽策略经过精心设计以缓解预训练与微调之间的不匹配问题。如果所有被选中的 token 都替换为 <code>[MASK]</code>，那么微调时模型将永远不会看到 <code>[MASK]</code> 标记，导致分布偏移。因此 BERT 采用了 80/10/10 的混合策略：80% 替换为 <code>[MASK]</code>（提供主要的训练信号），10% 替换为随机词（迫使模型不能简单依赖输入是否为 <code>[MASK]</code> 来判断是否需要预测），10% 保持不变（使表示偏向实际观察到的词）。由于随机替换仅占所有 token 的 1.5%（15% × 10%），对模型的语言理解能力几乎没有损害。MLM 的损失函数为标准的交叉熵：</p>\n<p>$$\\mathcal{L}_{\\text{MLM}} = -\\sum_{i \\in \\mathcal{M}} \\log P(x_i \\mid \\mathbf{x}_{\\backslash \\mathcal{M}})$$</p>\n<p>其中 \\(\\mathcal{M}\\) 为被遮蔽位置的集合，\\(\\mathbf{x}_{\\backslash \\mathcal{M}}\\) 为遮蔽后的输入序列。NSP 任务则利用 <code>[CLS]</code> 位置的隐藏状态 \\(\\mathbf{C}\\) 进行二分类，损失为 \\(\\mathcal{L}_{\\text{NSP}} = -\\log P(\\text{IsNext} \\mid \\mathbf{C})\\)。预训练的总损失为两者之和。消融实验表明，去除 NSP 任务后，QNLI 准确率下降 3.5 个百分点，MNLI 下降 0.5 个百分点，SQuAD F1 下降 0.6 个百分点，证实了 NSP 对句间关系建模的重要性。</p>\n<p><strong>微调流程：统一架构适配多种任务</strong></p>\n<p>BERT 的微调设计极为简洁。对于不同类型的下游任务，只需调整输入格式和输出层：（1）<strong>句对分类</strong>（如 MNLI、QQP）：输入为 <code>[CLS] 句子A [SEP] 句子B [SEP]</code>，取 <code>[CLS]</code> 的表示 \\(\\mathbf{C} \\in \\mathbb{R}^H\\) 通过分类层 \\(P = \\text{softmax}(\\mathbf{C} W^T)\\) 预测标签，其中 \\(W \\in \\mathbb{R}^{K \\times H}\\)；（2）<strong>单句分类</strong>（如 SST-2）：输入为 <code>[CLS] 句子 [SEP]</code>，同样使用 \\(\\mathbf{C}\\) 分类；（3）<strong>阅读理解</strong>（如 SQuAD）：输入为 <code>[CLS] 问题 [SEP] 段落 [SEP]</code>，引入起始向量 \\(\\mathbf{S}\\) 和结束向量 \\(\\mathbf{E}\\)，答案起始位置的概率为 \\(P_i^{\\text{start}} = \\frac{e^{\\mathbf{S} \\cdot \\mathbf{T}_i}}{\\sum_j e^{\\mathbf{S} \\cdot \\mathbf{T}_j}}\\)，结束位置类似；（4）<strong>序列标注</strong>（如 NER）：对每个 token 的表示 \\(\\mathbf{T}_i\\) 进行分类。微调时所有参数端到端更新，典型超参数为：batch size 16/32，学习率 2e-5/3e-5/5e-5，训练 2-4 个 epoch，dropout 0.1。</p>\n<p><strong>预训练配置与计算资源</strong></p>\n<p>预训练数据为 BooksCorpus（800M 词）和英文 Wikipedia（2,500M 词，仅文本），合计约 33 亿词。训练使用 batch size 256（128K tokens/batch），共 1M 步（约 40 个 epoch）。优化器为 Adam（lr=1e-4, \\(\\beta_1=0.9\\), \\(\\beta_2=0.999\\)），L2 权重衰减 0.01，前 10K 步线性 warmup 后线性衰减。为加速训练，90% 的步数使用序列长度 128，最后 10% 使用序列长度 512 以学习长距离位置编码。BERT_BASE 在 4 个 Cloud TPU（16 芯片）上训练 4 天，BERT_LARGE 在 16 个 Cloud TPU（64 芯片）上训练 4 天。</p>\n<p><strong>与 GPT 和 ELMo 的关键对比</strong></p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th>BERT</th>\n<th>OpenAI GPT</th>\n<th>ELMo</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>架构</td>\n<td>双向 Transformer 编码器</td>\n<td>单向 Transformer 解码器</td>\n<td>双向 LSTM（独立训练）</td>\n</tr>\n<tr>\n<td>预训练目标</td>\n<td>MLM + NSP</td>\n<td>从左到右语言模型</td>\n<td>从左到右 + 从右到左语言模型</td>\n</tr>\n<tr>\n<td>双向性</td>\n<td>每层联合双向</td>\n<td>仅左向</td>\n<td>拼接两个单向（浅层融合）</td>\n</tr>\n<tr>\n<td>下游适配</td>\n<td>微调所有参数</td>\n<td>微调所有参数</td>\n<td>特征提取（冻结参数）</td>\n</tr>\n<tr>\n<td>特殊标记</td>\n<td><code>[CLS]</code>/<code>[SEP]</code> 在预训练时引入</td>\n<td><code>[CLS]</code>/<code>[SEP]</code> 仅在微调时引入</td>\n<td>无</td>\n</tr>\n<tr>\n<td>训练数据</td>\n<td>3.3B 词</td>\n<td>800M 词</td>\n<td>1B 词</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 <strong>关键洞察</strong>：消融实验显示，将 BERT 退化为从左到右模型（LTR &amp; No NSP）后，MRPC 准确率从 86.7% 暴跌至 77.5%，SQuAD F1 从 88.5% 降至 77.8%，即使在其上添加 BiLSTM 也仅恢复到 84.9%，远不及预训练双向模型。这证明了<strong>深度双向预训练</strong>（而非浅层拼接）是 BERT 成功的核心因素。</p>\n<p>💡 <strong>模型规模效应</strong>：BERT 首次证明了即使在极小的数据集（如 MRPC 仅 3,600 条样本）上，更大的预训练模型也能带来持续的性能提升，打破了此前\"大模型需要大数据\"的认知。从 3 层到 24 层，MNLI 准确率从 77.9% 稳步提升至 86.6%。</div>",
      "quiz": {
        "q": "BERT 在 MLM 预训练中对被选中的 15% token 采用的遮蔽策略是什么？",
        "options": [
          "100% 替换为 [MASK]",
          "80% 替换为 [MASK]，10% 替换为随机词，10% 保持不变",
          "50% 替换为 [MASK]，50% 保持不变",
          "90% 替换为 [MASK]，10% 替换为随机词"
        ],
        "answer": 1,
        "explain": "BERT 采用 80/10/10 的混合遮蔽策略：80% 替换为 [MASK] 提供训练信号，10% 替换为随机词防止模型仅依赖 [MASK] 标记，10% 保持不变使表示偏向真实词。这种设计缓解了预训练与微调之间 [MASK] 标记不存在的分布偏移问题。"
      }
    },
    {
      "id": "simclr",
      "num": 8,
      "name": "SimCLR",
      "fullName": "Simple Contrastive Learning of Representations",
      "year": "2020",
      "org": "Google",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2002.05709",
      "projectUrl": "",
      "category": "core",
      "motivation": "对比学习框架强调大批量训练",
      "summary": "SimCLR 的核心目标是：对比学习框架强调大批量训练。",
      "keyPoints": [
        "核心动机：对比学习框架强调大批量训练",
        "代表机构：Google"
      ],
      "detail": "<p>对比学习框架强调大批量训练</p>"
    },
    {
      "id": "mae",
      "num": 9,
      "name": "MAE",
      "fullName": "Masked Autoencoder",
      "year": "2022",
      "org": "Meta",
      "parent": "bert",
      "paperUrl": "https://openaccess.thecvf.com/content/CVPR2022/html/He_Masked_Autoencoders_Are_Scalable_Vision_Learners_CVPR_2022_paper.html",
      "projectUrl": "",
      "category": "frontier",
      "motivation": "通过重建像素学习视觉特征",
      "summary": "MAE 提出了一种非对称编码器-解码器架构的掩码自编码器，通过随机遮蔽 75% 的图像 patch 并重建缺失像素来学习视觉表征，将 BERT 式自监督预训练成功迁移到计算机视觉领域，在 ImageNet-1K 上以 vanilla ViT-Huge 达到 87.8% 的最优精度。",
      "keyPoints": [
        "<strong>非对称编码器-解码器架构</strong>：编码器仅处理可见 patch（约 25%），解码器轻量化（计算量不到编码器的 10%），大幅降低预训练计算开销",
        "<strong>高遮蔽比率（75%）</strong>：远高于 NLP 中 BERT 的 15%，消除图像冗余信息，迫使模型学习高层语义而非局部插值",
        "<strong>像素级重建目标</strong>：直接预测被遮蔽 patch 的像素值，使用 MSE 损失，仅在遮蔽区域计算损失，无需额外的 tokenizer（如 dVAE）",
        "<strong>高效实现</strong>：通过 shuffle/unshuffle 操作避免稀疏运算，编码器仅处理 25% token，训练速度比 BEiT 快 3.5 倍以上",
        "<strong>强大的可扩展性</strong>：模型从 ViT-Base 到 ViT-Huge 持续提升，ViT-H 在 ImageNet-1K 达到 87.8%，超越所有仅用 IN1K 数据的方法",
        "<strong>优秀的迁移能力</strong>：在目标检测（COCO）、语义分割（ADE20K）等下游任务上均取得显著提升"
      ],
      "detail": "<h5>核心架构示意图</h5>\n<p><img alt=\"MAE 架构示意图\" src=\"https://ar5iv.labs.arxiv.org/html/2111.06377/assets/x1.png\" />\n<em>图：MAE 预训练架构。输入图像被随机遮蔽 75% 的 patch，编码器仅处理可见 patch，解码器接收编码后的可见 patch 与 mask token 的完整序列并重建原始图像像素。预训练完成后丢弃解码器，仅用编码器进行下游识别任务。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># MAE 预训练伪代码\ndef mae_pretrain(image, mask_ratio=0.75):\n    # 1. Patch Embedding\n    patches = patchify(image)                    # [N, patch_size^2 * 3]\n    tokens = linear_proj(patches) + pos_embed    # [N, D]\n\n    # 2. Random Masking (shuffle-based)\n    shuffled_indices = random_permutation(N)\n    num_visible = int(N * (1 - mask_ratio))      # e.g., 25% of 196 = 49\n    visible_tokens = tokens[shuffled_indices[:num_visible]]   # [49, D]\n\n    # 3. Encoder (only visible tokens)\n    encoded = encoder(visible_tokens)            # [49, D] — 标准 ViT\n\n    # 4. Decoder (full set)\n    mask_tokens = repeat(learnable_mask_token, N - num_visible)\n    full_tokens = concat(encoded, mask_tokens)   # [196, D_dec]\n    full_tokens = unshuffle(full_tokens) + decoder_pos_embed\n    decoded = decoder(full_tokens)               # [196, patch_size^2 * 3]\n\n    # 5. Loss (only on masked patches)\n    loss = MSE(decoded[masked_indices], patches[masked_indices])\n    return loss\n</code></pre>\n<h5>动机与背景</h5>\n<p>BERT 在 NLP 领域通过掩码语言建模（Masked Language Modeling）取得了巨大成功，自然引发了一个问题：<strong>能否将同样的自监督范式迁移到计算机视觉？</strong> 然而，视觉与语言之间存在三个关键差异：</p>\n<ol>\n<li><strong>架构差异</strong>：CNN 难以自然地引入 mask token 和位置编码等\"指示符\"，直到 Vision Transformer（ViT）的出现才消除了这一障碍。</li>\n<li><strong>信息密度差异</strong>：语言是高度语义化、信息密集的，而图像具有大量空间冗余——相邻像素高度相关。因此，在视觉中需要远高于 NLP 的遮蔽比率（75% vs. 15%）才能构造有意义的预测任务。</li>\n<li><strong>解码器角色差异</strong>：在 NLP 中，解码器只需预测离散的词 token（语义丰富）；而在视觉中，解码器需要重建像素（语义层次较低），编码器与解码器的语义抽象层级存在显著差距。</li>\n</ol>\n<div class=\"key-point\">💡 关键：正是这三个差异的深刻理解，驱动了 MAE 中非对称架构和高遮蔽比率两个核心设计决策。</div>\n<h5>核心机制详解</h5>\n<p><strong>1. 随机遮蔽策略（Random Masking）</strong></p>\n<p>MAE 将输入图像划分为不重叠的 patch（遵循 ViT 的 \\(16 \\times 16\\) 划分），然后以均匀分布无放回地随机采样，遮蔽其中 75% 的 patch。</p>\n<p>高遮蔽比率的设计意图是：\n- <strong>消除冗余</strong>：图像中相邻 patch 高度相关，低遮蔽比率下模型可以通过简单插值完成重建，无法学到高层语义\n- <strong>避免中心偏差</strong>：均匀随机采样确保遮蔽分布无空间偏置\n- <strong>提升效率</strong>：仅 25% 的 token 进入编码器，大幅减少计算量</p>\n<p><strong>2. 非对称编码器-解码器（Asymmetric Encoder-Decoder）</strong></p>\n<p>这是 MAE 最核心的架构创新：</p>\n<ul>\n<li>\n<p><strong>编码器</strong>：标准 ViT，但<strong>仅处理可见的 25% patch token</strong>。遮蔽的 patch 被完全移除（而非用 mask token 替代），这意味着编码器的计算量仅为全量的 \\(\\sim\\)25%。编码器可以是任意大容量模型（ViT-Base/Large/Huge）。</p>\n</li>\n<li>\n<p><strong>解码器</strong>：轻量级 Transformer，接收编码后的可见 token 与共享的可学习 mask token 拼接而成的完整序列。解码器的宽度和深度远小于编码器（默认配置下计算量不到编码器的 10%）。解码器仅在预训练阶段使用，下游任务中被丢弃。</p>\n</li>\n</ul>\n<div class=\"warn-box\">⚠️ 注意：编码器不使用 mask token 是 MAE 效率的关键。如果将 mask token 也送入编码器（如 BEiT），编码器需要处理全部 196 个 token，计算量增加约 3.7 倍。论文实验验证了这一设计使训练加速 3× 以上且不损失精度。</div>\n<p><strong>3. 重建目标与损失函数</strong></p>\n<p>MAE 的重建目标是被遮蔽 patch 的<strong>原始像素值</strong>。损失函数为均方误差（MSE）：</p>\n<p>$$\\mathcal{L} = \\frac{1}{|\\mathcal{M}|} \\sum_{i \\in \\mathcal{M}} \\| \\hat{x}_i - x_i \\|^2$$</p>\n<p>其中 \\(\\mathcal{M}\\) 为被遮蔽 patch 的索引集合，\\(\\hat{x}_i\\) 为解码器对第 \\(i\\) 个 patch 的像素预测，\\(x_i\\) 为原始像素值。</p>\n<p>论文还研究了一种变体：对每个 patch 的像素值进行归一化（减均值除标准差）后作为重建目标，发现这种 <strong>per-patch normalization</strong> 能进一步提升表征质量。</p>\n<div class=\"key-point\">💡 关键：与 BEiT 需要先训练一个 dVAE tokenizer 将图像转为离散 token 不同，MAE 直接重建像素，方案更简洁，且实验表明像素重建在 MAE 框架下反而优于 token 预测。</div>\n<p><strong>4. 高效实现（Shuffle-based）</strong></p>\n<p>MAE 的实现巧妙地避免了稀疏运算：</p>\n<ol>\n<li>对所有 patch token 进行随机 shuffle</li>\n<li>取前 25% 作为可见 token 送入编码器</li>\n<li>编码后，将 mask token 追加到编码输出后</li>\n<li>对完整序列执行 unshuffle（逆置换）恢复原始位置顺序</li>\n<li>加上位置编码后送入解码器</li>\n</ol>\n<p>这一过程仅需标准的索引操作，无需任何稀疏矩阵运算，额外开销可忽略不计。</p>\n<h5>与传统方法的区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>MAE</th>\n<th>BEiT</th>\n<th>iGPT</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>重建目标</td>\n<td>像素值</td>\n<td>离散视觉 token（dVAE）</td>\n<td>像素值（低分辨率）</td>\n</tr>\n<tr>\n<td>是否需要额外 tokenizer</td>\n<td>❌</td>\n<td>✅（dVAE 预训练）</td>\n<td>❌</td>\n</tr>\n<tr>\n<td>编码器输入</td>\n<td>仅可见 patch（25%）</td>\n<td>全部 patch（含 mask token）</td>\n<td>全部像素</td>\n</tr>\n<tr>\n<td>遮蔽比率</td>\n<td>75%</td>\n<td>40%</td>\n<td>—</td>\n</tr>\n<tr>\n<td>训练效率</td>\n<td>高（3.5× faster than BEiT）</td>\n<td>较低</td>\n<td>极低（像素级自回归）</td>\n</tr>\n<tr>\n<td>ViT-H ImageNet-1K</td>\n<td><strong>87.8%</strong></td>\n<td>86.3%*</td>\n<td>—</td>\n</tr>\n</tbody>\n</table></div>\n<p>MAE 的核心优势在于<strong>简洁性与可扩展性</strong>：无需额外预训练步骤，架构设计使得大模型训练高效可行，且随模型规模增大持续获得收益。</p>",
      "quiz": {
        "q": "MAE 为什么采用 75% 的高遮蔽比率，而非 BERT 中常用的 15%？",
        "options": [
          "为了减少训练数据量，节省存储空间",
          "因为图像具有高空间冗余，低遮蔽比率下模型可通过局部插值完成重建，无法学到高层语义",
          "为了与 BEiT 的遮蔽比率保持一致",
          "因为 ViT 的注意力机制要求输入序列尽可能短"
        ],
        "answer": 1,
        "explain": "图像的空间冗余远高于文本，相邻 patch 高度相关。若遮蔽比率过低，模型仅需简单插值即可重建，无法被迫学习高层语义特征。75% 的高遮蔽比率消除了这种捷径，构造了有意义的自监督任务。"
      }
    },
    {
      "id": "ijepa",
      "num": 10,
      "name": "I-JEPA",
      "fullName": "Image Joint-Embedding Predictive Architecture",
      "year": "2023",
      "org": "Meta",
      "parent": "mae",
      "paperUrl": "https://openaccess.thecvf.com/content/CVPR2023/html/Assran_Self-Supervised_Learning_From_Images_With_a_Joint-Embedding_Predictive_Architecture_CVPR_2023_paper.html",
      "projectUrl": "",
      "category": "frontier",
      "motivation": "联合嵌入预测架构非生成式学习",
      "summary": "I-JEPA 提出了一种联合嵌入预测架构，通过在**表示空间**（而非像素空间）预测被掩码图像块的语义表示，结合精心设计的 multi-block masking 策略，在不使用任何手工数据增强的前提下学习到高质量的语义图像表示，同时保留了局部细节特征。",
      "keyPoints": [
        "<strong>JEPA 范式</strong>：区别于联合嵌入架构（JEA，如对比学习）和生成式架构（如 MAE），提出第三条路线——在抽象表示空间进行预测，避免像素级重建的冗余和手工增强的先验偏置",
        "<strong>三组件架构</strong>：Context Encoder（ViT）编码可见上下文 → Predictor（窄 ViT）以位置 mask token 为条件预测目标表示 → Target Encoder（EMA 更新）提供预测目标",
        "<strong>Multi-block masking 策略</strong>：采样 4 个较小 target block（scale 0.15–0.2）+ 1 个较大 context block（scale 0.85–1.0），上下文与目标无重叠，迫使模型学习语义级预测",
        "<strong>无需手工数据增强</strong>：不依赖随机裁剪、颜色抖动等视图增强，避免引入任务特定偏置，具有更好的通用性和跨模态迁移潜力",
        "<strong>高效可扩展</strong>：ViT-H/14 在 16 块 A100 上仅需 72 小时即可完成预训练；比 MAE 收敛快约 5 倍，比 iBOT 计算开销显著更低"
      ],
      "detail": "<h5>动机与背景</h5>\n<p>自监督视觉表示学习主要有两大范式：</p>\n<ol>\n<li><strong>不变性方法</strong>（Invariance-based）：如 DINO、iBOT、SimCLR，通过手工数据增强构造同一图像的多个视图，训练编码器产生相似嵌入。这类方法能学到高语义表示，但引入了<strong>强先验偏置</strong>——例如颜色抖动使模型对颜色不变，这对需要颜色信息的下游任务（如深度估计）是有害的。</li>\n<li><strong>生成式方法</strong>（Generative）：如 MAE、BEiT，通过掩码并重建像素/token 来学习表示。这类方法先验知识需求少，但由于在<strong>像素空间</strong>重建，模型被迫建模大量低级细节（纹理、精确边缘），导致学到的表示语义层次较低，线性探测性能不佳。</li>\n</ol>\n<div class=\"key-point\">💡 <strong>关键洞察</strong>：I-JEPA 的核心思想来自 Yann LeCun 提出的 JEPA 框架——预测应发生在<strong>抽象表示空间</strong>，而非输入空间。这样 target encoder 可以自主学习滤除不相关的像素级细节，使预测目标天然具有更高的语义抽象度。</div>\n<h5>架构总览</h5>\n<p><img alt=\"I-JEPA 方法示意图\" src=\"https://ar5iv.labs.arxiv.org/html/2301.08243/assets/x5.png\" />\n<em>图：I-JEPA 方法总览。Context encoder 编码可见 patch，Predictor 以位置 mask token 为条件预测 target block 的表示，Target encoder（EMA）提供预测目标。</em></p>\n<p>I-JEPA 包含三个核心组件：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>组件</th>\n<th>架构</th>\n<th>作用</th>\n<th>更新方式</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><strong>Context Encoder</strong> \\(f_\\theta\\)</td>\n<td>ViT（完整宽度）</td>\n<td>编码可见的 context patch 序列</td>\n<td>梯度反传</td>\n</tr>\n<tr>\n<td><strong>Predictor</strong> \\(g_\\phi\\)</td>\n<td>窄 ViT（宽度远小于 encoder）</td>\n<td>以 context 表示 + 位置 mask token 为输入，预测 target 位置的表示</td>\n<td>梯度反传</td>\n</tr>\n<tr>\n<td><strong>Target Encoder</strong> \\(\\bar{f}_\\theta\\)</td>\n<td>与 Context Encoder 同架构</td>\n<td>编码 target patch 序列，提供预测目标</td>\n<td><strong>EMA</strong>（指数移动平均）</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"warn-box\">⚠️ <strong>关键设计</strong>：Predictor 使用的是<strong>窄 ViT</strong>（hidden dimension 远小于 encoder），这是为了防止 predictor 过于强大而导致 context encoder 不需要学习有意义的表示（即防止表示坍塌的一种隐式约束）。</div>\n<h5>三大架构范式对比</h5>\n<p><img alt=\"联合嵌入架构\" src=\"https://ar5iv.labs.arxiv.org/html/2301.08243/assets/x2.png\" />\n<em>图 (a)：联合嵌入架构（JEA）——直接比较两个视图的嵌入相似度</em></p>\n<p><img alt=\"生成式架构\" src=\"https://ar5iv.labs.arxiv.org/html/2301.08243/assets/x3.png\" />\n<em>图 (b)：生成式架构——在像素/token 空间重建输入</em></p>\n<p><img alt=\"JEPA 架构\" src=\"https://ar5iv.labs.arxiv.org/html/2301.08243/assets/x4.png\" />\n<em>图 (c)：JEPA 架构——在表示空间预测目标嵌入</em></p>\n<p>三者的核心区别在于：\n- <strong>JEA</strong>：需要手工增强构造视图对，通过对比/聚类等方式防止坍塌，学到的表示对增强操作不变\n- <strong>生成式</strong>：在输入空间重建，无需增强但被迫建模低级细节\n- <strong>JEPA</strong>：在表示空间预测，target encoder 自动学习抽象掉不相关细节，无需增强也能学到语义表示</p>\n<h5>Multi-block Masking 策略</h5>\n<p><img alt=\"Masking 策略\" src=\"https://ar5iv.labs.arxiv.org/html/2301.08243/assets/x6.png\" />\n<em>图：Multi-block masking 策略示意。左：采样多个 target block；右：context block 为 target 的补集。</em></p>\n<p>masking 策略是 I-JEPA 的另一核心设计，直接决定了表示的语义层次：</p>\n<p><strong>采样过程</strong>：\n1. 采样 <strong>4 个 target block</strong>：scale ∈ (0.15, 0.2)，aspect ratio ∈ (0.75, 1.5)\n2. 采样 <strong>1 个 context block</strong>：scale ∈ (0.85, 1.0)，aspect ratio = 1\n3. 从 context block 中<strong>移除</strong>与任何 target block 重叠的 patch\n4. Context encoder 仅处理剩余的 context patch</p>\n<div class=\"key-point\">💡 <strong>为什么 multi-block 有效？</strong> 关键在于两点：(a) target block 的 scale 足够大（语义级），使预测任务需要高层理解；(b) context 是空间分散的（移除了 target 区域），迫使模型利用远距离语义信息进行预测，而非简单的局部外推。</div>\n<p><strong>Ablation 验证</strong>（ViT-B/16, 300 epochs, 1% ImageNet linear probe）：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>Masking 策略</th>\n<th>Target 数量</th>\n<th>Context 比例</th>\n<th>Top-1</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><strong>multi-block</strong>（本文）</td>\n<td>4</td>\n<td>0.25</td>\n<td><strong>54.2</strong></td>\n</tr>\n<tr>\n<td>rasterized（四象限）</td>\n<td>3</td>\n<td>0.25</td>\n<td>15.5</td>\n</tr>\n<tr>\n<td>block（单大块）</td>\n<td>1</td>\n<td>0.40</td>\n<td>20.2</td>\n</tr>\n<tr>\n<td>random（随机 patch）</td>\n<td>1</td>\n<td>0.40</td>\n<td>17.6</td>\n</tr>\n</tbody>\n</table></div>\n<p>Multi-block 策略以巨大优势胜出，验证了\"多个语义级 target + 空间分散 context\"的设计合理性。</p>\n<h5>损失函数</h5>\n<p>I-JEPA 使用简单的 <strong>L2 损失</strong>在表示空间计算预测误差：</p>\n<p>$$\\mathcal{L} = \\frac{1}{|\\mathcal{B}|} \\sum_{x \\in \\mathcal{B}} \\sum_{i=1}^{M} \\left\\| s_{\\bar{\\theta}}(x, B_i^y) - g_\\phi\\left(s_\\theta(x, B^x),\\, \\text{pos}(B_i^y)\\right) \\right\\|_2^2$$</p>\n<p>其中：\n- \\(s_\\theta(x, B^x)\\)：context encoder 对可见 patch 集合 \\(B^x\\) 的输出\n- \\(s_{\\bar{\\theta}}(x, B_i^y)\\)：target encoder 对第 \\(i\\) 个 target block \\(B_i^y\\) 的输出\n- \\(g_\\phi(\\cdot, \\text{pos}(B_i^y))\\)：predictor 以 context 表示和目标位置编码为输入的预测\n- \\(M=4\\)：target block 数量</p>\n<p><strong>Target encoder 的 EMA 更新</strong>：</p>\n<p>$$\\bar{\\theta} \\leftarrow \\alpha \\cdot \\bar{\\theta} + (1 - \\alpha) \\cdot \\theta$$</p>\n<p>EMA 系数 \\(\\alpha\\) 从 0.996 线性增加到 1.0，确保 target encoder 缓慢演化，提供稳定的预测目标。</p>\n<div class=\"warn-box\">⚠️ <strong>表示空间 vs 像素空间的关键对比</strong>：当将损失改为在像素空间计算时（即 target 为原始像素而非 encoder 输出），ViT-L/16 在 1% ImageNet 线性探测上从 <strong>66.9%</strong> 暴跌至 <strong>40.7%</strong>，充分证明了表示空间预测的核心价值。</div>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># I-JEPA 训练伪代码\nfor images in dataloader:\n    # 1. Multi-block masking\n    target_blocks = sample_target_blocks(N=4, scale=(0.15, 0.2), ar=(0.75, 1.5))\n    context_block = sample_context_block(scale=(0.85, 1.0))\n    context_patches = remove_overlap(context_block, target_blocks)\n\n    # 2. Target encoder (no gradient)\n    with torch.no_grad():\n        target_reps = [target_encoder(images, block) for block in target_blocks]\n\n    # 3. Context encoder + Predictor\n    context_rep = context_encoder(images, context_patches)  # ViT forward\n    pred_reps = [predictor(context_rep, pos_tokens(block)) for block in target_blocks]\n\n    # 4. L2 loss in representation space\n    loss = sum(F.mse_loss(pred, target) for pred, target in zip(pred_reps, target_reps))\n\n    # 5. Update context encoder &amp; predictor via gradient\n    loss.backward()\n    optimizer.step()\n\n    # 6. EMA update target encoder\n    ema_update(target_encoder, context_encoder, momentum=alpha)\n    alpha = linear_schedule(alpha, start=0.996, end=1.0)\n</code></pre>\n<h5>效率与可扩展性</h5>\n<p>I-JEPA 的计算效率优势来自两个方面：</p>\n<ol>\n<li><strong>收敛速度快</strong>：虽然 target encoder 的前向传播引入约 7% 的额外开销（相比 MAE），但 I-JEPA 仅需约 <strong>1/5 的训练 epoch</strong> 即可达到相同性能，整体计算量大幅节省</li>\n<li><strong>无需多视图处理</strong>：不变性方法（如 iBOT）需要对每张图像生成多个增强视图并分别前向传播，而 I-JEPA 仅处理一张图像的不同 patch 子集</li>\n</ol>\n<p>具体数据：\n- ViT-H/14 + I-JEPA：<strong>16 × A100, &lt;72 小时</strong>\n- ViT-H/14 + I-JEPA 的总 GPU 时间 <strong>&lt; ViT-S/16 + iBOT</strong>（即 I-JEPA 的巨型模型比 iBOT 的小模型还省算力）\n- 相比 MAE，I-JEPA 在 1% ImageNet 半监督评估中达到相同性能所需 GPU 小时约为 <strong>1/5</strong></p>\n<h5>主要实验结果</h5>\n<p><strong>ImageNet 线性探测与半监督</strong>（1% labels）：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>架构</th>\n<th>增强</th>\n<th>Linear Top-1</th>\n<th>1% Semi Top-1</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>MAE</td>\n<td>ViT-H/14</td>\n<td>✗</td>\n<td>77.3</td>\n<td>66.2</td>\n</tr>\n<tr>\n<td>data2vec</td>\n<td>ViT-L/16</td>\n<td>✗</td>\n<td>81.6</td>\n<td>—</td>\n</tr>\n<tr>\n<td><strong>I-JEPA</strong></td>\n<td><strong>ViT-H/14</strong></td>\n<td><strong>✗</strong></td>\n<td><strong>87.5</strong></td>\n<td><strong>72.3</strong></td>\n</tr>\n<tr>\n<td>DINO</td>\n<td>ViT-B/8</td>\n<td>✓</td>\n<td>84.9</td>\n<td>—</td>\n</tr>\n<tr>\n<td>iBOT</td>\n<td>ViT-L/16</td>\n<td>✓</td>\n<td>88.3</td>\n<td>—</td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>低级任务（线性探测）</strong>：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>Clevr/Count</th>\n<th>Clevr/Dist</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>DINO</td>\n<td>86.6</td>\n<td>53.4</td>\n</tr>\n<tr>\n<td>iBOT</td>\n<td>85.7</td>\n<td>62.8</td>\n</tr>\n<tr>\n<td><strong>I-JEPA</strong></td>\n<td><strong>86.7</strong></td>\n<td><strong>72.4</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p>I-JEPA 在深度预测任务上大幅超越不变性方法（72.4 vs 62.8），证明其在保留局部空间信息方面的优势——这正是不变性方法因过度增强而丢失的信息。</p>",
      "quiz": {
        "q": "I-JEPA 相比 MAE 的核心区别是什么？",
        "options": [
          "使用更大的 ViT 模型架构",
          "在表示空间而非像素空间进行掩码预测",
          "使用了更多的手工数据增强策略",
          "采用了对比学习的损失函数"
        ],
        "answer": 1,
        "explain": "I-JEPA 的核心创新在于将预测目标从像素空间转移到由 target encoder 产生的抽象表示空间，使模型无需重建低级细节即可学习语义特征。ablation 显示像素空间预测性能从 66.9% 暴跌至 40.7%。"
      }
    },
    {
      "id": "dinov3",
      "num": 11,
      "name": "DINOv3",
      "fullName": "Self-Distillation with No Labels v3",
      "year": "2026",
      "org": "Meta",
      "parent": "ijepa",
      "paperUrl": "https://arxiv.org/abs/2603.00160",
      "projectUrl": "",
      "category": "frontier",
      "motivation": "Gram锚定损失解决长尾分布",
      "summary": "DINOv3 的核心目标是：Gram锚定损失解决长尾分布。",
      "keyPoints": [
        "核心动机：Gram锚定损失解决长尾分布",
        "演化来源：继承或改进自 ijepa",
        "代表机构：Meta"
      ],
      "detail": "<p>Gram锚定损失解决长尾分布</p>"
    },
    {
      "id": "dqn",
      "num": 12,
      "name": "DQN",
      "fullName": "Deep Q-Network",
      "year": "2015",
      "org": "DeepMind",
      "parent": "—",
      "paperUrl": "https://www.nature.com/articles/nature14236",
      "projectUrl": "",
      "category": "core",
      "motivation": "深度Q网络实现人类水平游戏",
      "summary": "DQN 的核心目标是：深度Q网络实现人类水平游戏。",
      "keyPoints": [
        "核心动机：深度Q网络实现人类水平游戏",
        "代表机构：DeepMind"
      ],
      "detail": "<p>深度Q网络实现人类水平游戏</p>"
    },
    {
      "id": "ppo",
      "num": 13,
      "name": "PPO",
      "fullName": "Proximal Policy Optimization",
      "year": "2017",
      "org": "OpenAI",
      "parent": "dqn",
      "paperUrl": "https://arxiv.org/abs/1707.06347",
      "projectUrl": "",
      "category": "core",
      "motivation": "裁剪目标函数约束策略更新",
      "summary": "PPO 的核心目标是：裁剪目标函数约束策略更新。",
      "keyPoints": [
        "核心动机：裁剪目标函数约束策略更新",
        "演化来源：继承或改进自 dqn",
        "代表机构：OpenAI"
      ],
      "detail": "<p>裁剪目标函数约束策略更新</p>"
    },
    {
      "id": "dpo",
      "num": 14,
      "name": "DPO",
      "fullName": "Direct Preference Optimization",
      "year": "2023",
      "org": "Stanford",
      "parent": "ppo",
      "paperUrl": "https://arxiv.org/abs/2305.18290",
      "projectUrl": "",
      "category": "frontier",
      "motivation": "无需奖励模型的偏好对齐",
      "summary": "DPO 的核心目标是：无需奖励模型的偏好对齐。",
      "keyPoints": [
        "核心动机：无需奖励模型的偏好对齐",
        "演化来源：继承或改进自 ppo",
        "代表机构：Stanford"
      ],
      "detail": "<p>无需奖励模型的偏好对齐</p>"
    },
    {
      "id": "grpo",
      "num": 15,
      "name": "GRPO",
      "fullName": "Group Relative Policy Optimization",
      "year": "2026",
      "org": "DeepSeek",
      "parent": "dpo",
      "paperUrl": "https://arxiv.org/abs/2603.06623",
      "projectUrl": "",
      "category": "frontier",
      "motivation": "组内相对奖励提升训练稳定性",
      "summary": "GRPO 提出了一种无需价值模型（Critic-free）的策略优化方法，通过对同一问题采样一组输出并利用组内相对奖励归一化来估计优势函数，在大幅降低训练资源开销的同时实现了与 PPO 相当甚至更优的数学推理性能。",
      "keyPoints": [
        "<strong>去除 Value Model</strong>：不再需要与 Policy Model 同等规模的价值网络，显著降低显存和计算开销",
        "<strong>组内采样与相对排名</strong>：对每个问题采样 \\(G\\) 个输出，利用组内奖励的均值和标准差进行归一化，替代 GAE 优势估计",
        "<strong>PPO-style 裁剪目标函数</strong>：保留 PPO 的 clip 机制约束策略更新幅度，确保训练稳定性",
        "<strong>序列级 KL 散度正则化</strong>：将 KL 惩罚从 token 级移至序列级，直接加入损失函数而非嵌入奖励",
        "<strong>支持 Outcome 与 Process 两种监督模式</strong>：Outcome Supervision 在输出末尾给出单一奖励，Process Supervision 在每个推理步骤末尾给出奖励",
        "<strong>迭代式 RL 训练</strong>：采用在线迭代策略，每轮更新参考模型并持续训练奖励模型，防止奖励 hacking",
        "<strong>在 DeepSeekMath 7B 上验证</strong>：数学推理基准（GSM8K、MATH、CMATH 等）上超越同规模甚至更大模型"
      ],
      "detail": "<h5>核心示意图</h5>\n<p><img alt=\"PPO 与 GRPO 对比示意图\" src=\"https://ar5iv.labs.arxiv.org/html/2402.03300v2/assets/x4.png\" />\n<em>图：PPO 需要额外的 Value Model 通过 GAE 估计优势函数；GRPO 去除 Value Model，直接从组内采样的多个输出的相对奖励中估计优势，大幅减少训练资源。</em></p>\n<h5>算法伪代码</h5>\n<pre><code>Algorithm: GRPO (Group Relative Policy Optimization)\n────────────────────────────────────────────────────\nInput: 奖励模型 r_φ, 任务提示集 D, 超参数 ε, β, μ\n\n1. 初始化策略模型 π_θ ← π_θ_init\n2. for iteration = 1, ..., I do\n3.     更新参考模型 π_ref ← π_θ\n4.     for step = 1, ..., M do\n5.         采样 batch D_b ⊂ D\n6.         更新旧策略 π_θ_old ← π_θ\n7.         对每个问题 q ∈ D_b，采样 G 个输出:\n              {o_1, ..., o_G} ~ π_θ_old(·|q)\n8.         计算每个输出的奖励: {r_1, ..., r_G} = r_φ(q, o_i)\n9.         组内归一化: Â_i = (r_i - mean(r)) / std(r)\n10.        for GRPO iteration = 1, ..., μ do\n11.            最大化 GRPO 目标函数更新 π_θ\n12.        更新奖励模型 r_φ (replay mechanism)\n13. Output: π_θ\n</code></pre>\n<h5>动机与背景</h5>\n<p><strong>PPO 在 LLM 场景下的痛点：</strong> 标准 PPO 算法在 RLHF 中需要维护四个模型——Policy Model、Value Model、Reward Model 和 Reference Model。其中 Value Model 通常与 Policy Model 同等规模，这带来了巨大的显存和计算负担。更关键的是，在 LLM 场景下，奖励模型通常只在最后一个 token 处给出奖励分数，这使得训练一个在每个 token 位置都准确的 Value Model 变得困难且低效。</p>\n<div class=\"key-point\">💡 <strong>关键洞察</strong>：既然 LLM 的奖励通常是序列级别的（只在输出末尾给出），那么是否可以完全绕过 token 级别的价值估计，直接利用多个完整输出之间的相对比较来估计优势？</div>\n<h5>核心机制：从 PPO 到 GRPO</h5>\n<p><strong>PPO 的目标函数</strong>回顾：</p>\n<p>$$\\mathcal{J}_{\\text{PPO}}(\\theta) = \\mathbb{E}\\left[\\frac{1}{|o|}\\sum_{t=1}^{|o|}\\min\\left(\\frac{\\pi_\\theta(o_t|q,o_{<t})}{\\pi_{\\theta_{\\text{old}}}(o_t|q,o_{<t})}A_t,\\;\\text{clip}\\left(\\frac{\\pi_\\theta(o_t|q,o_{<t})}{\\pi_{\\theta_{\\text{old}}}(o_t|q,o_{<t})}, 1-\\varepsilon, 1+\\varepsilon\\right)A_t\\right)\\right]$$</p>\n<p>其中优势 \\(A_t\\) 通过 GAE（Generalized Advantage Estimation）基于 Value Model \\(V_\\psi\\) 计算。</p>\n<p><strong>GRPO 的核心改进</strong>在于用组内相对奖励替代 GAE：</p>\n<p>$$\\mathcal{J}_{\\text{GRPO}}(\\theta) = \\mathbb{E}\\left[\\frac{1}{G}\\sum_{i=1}^{G}\\frac{1}{|o_i|}\\sum_{t=1}^{|o_i|}\\min\\left(\\frac{\\pi_\\theta(o_{i,t}|q,o_{i,<t})}{\\pi_{\\theta_{\\text{old}}}(o_{i,t}|q,o_{i,<t})}\\hat{A}_{i,t},\\;\\text{clip}\\left(\\frac{\\pi_\\theta(o_{i,t}|q,o_{i,<t})}{\\pi_{\\theta_{\\text{old}}}(o_{i,t}|q,o_{i,<t})}, 1-\\varepsilon, 1+\\varepsilon\\right)\\hat{A}_{i,t}\\right) - \\beta\\;\\mathbb{D}_{\\text{KL}}\\left(\\pi_\\theta \\| \\pi_{\\text{ref}}\\right)\\right]$$</p>\n<p>其中 KL 散度项为序列级别的估计：</p>\n<p>$$\\mathbb{D}_{\\text{KL}}\\left(\\pi_\\theta \\| \\pi_{\\text{ref}}\\right) = \\frac{\\pi_{\\text{ref}}(o_{i,t}|q,o_{i,<t})}{\\pi_\\theta(o_{i,t}|q,o_{i,<t})} - \\log\\frac{\\pi_{\\text{ref}}(o_{i,t}|q,o_{i,<t})}{\\pi_\\theta(o_{i,t}|q,o_{i,<t})} - 1$$</p>\n<h5>优势函数的组内归一化</h5>\n<p>这是 GRPO 最核心的设计。对于每个问题 \\(q\\)，从旧策略 \\(\\pi_{\\theta_{\\text{old}}}\\) 中采样 \\(G\\) 个输出 \\(\\{o_1, o_2, \\cdots, o_G\\}\\)，然后由奖励模型打分得到 \\(\\mathbf{r} = \\{r_1, r_2, \\cdots, r_G\\}\\)。</p>\n<p><strong>Outcome Supervision</strong> 模式下，每个输出的所有 token 共享同一个归一化后的优势值：</p>\n<p>$$\\hat{A}_{i,t} = \\tilde{r}_i = \\frac{r_i - \\text{mean}(\\mathbf{r})}{\\text{std}(\\mathbf{r})}$$</p>\n<div class=\"key-point\">💡 <strong>直觉理解</strong>：这本质上是一种\"相对评分\"——不关心绝对奖励值的高低，只关心同一组内谁比谁好。如果一个输出的奖励高于组内平均，它获得正优势（被鼓励）；低于平均则获得负优势（被抑制）。标准差归一化确保了优势值的尺度稳定。</div>\n<p><strong>Process Supervision</strong> 模式下，过程奖励模型对每个推理步骤末尾给出奖励，归一化在所有步骤的奖励上进行：</p>\n<p>$$\\tilde{r}_i^{\\text{index}(j)} = \\frac{r_i^{\\text{index}(j)} - \\text{mean}(\\mathbf{R})}{\\text{std}(\\mathbf{R})}$$</p>\n<p>每个 token 的优势值设为其所在推理步骤末尾的归一化奖励。</p>\n<h5>KL 散度约束的设计变化</h5>\n<p>与 PPO 不同，GRPO 将 KL 散度惩罚从嵌入奖励中移出，直接作为损失函数的正则项。PPO 中 KL 惩罚是 token 级别地加入奖励信号：</p>\n<p>$$r_t = r_\\varphi(q, o_{\\leq t}) - \\beta \\log\\frac{\\pi_\\theta(o_t|q,o_{<t})}{\\pi_{\\text{ref}}(o_t|q,o_{<t})}$$</p>\n<p>而 GRPO 采用序列级 KL 散度，直接减去 \\(\\beta \\cdot \\mathbb{D}_{\\text{KL}}\\)。这种设计更加简洁，且避免了 KL 惩罚对优势估计的干扰。</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：GRPO 使用的 KL 散度采用了非对称形式 \\(\\frac{p}{q} - \\log\\frac{p}{q} - 1\\)，这是 KL 散度的一种无偏估计，相比直接用 \\(\\log\\frac{p}{q}\\) 具有更好的数值稳定性。</div>\n<h5>迭代式训练与奖励模型更新</h5>\n<p>GRPO 采用迭代式在线 RL 训练策略：</p>\n<ol>\n<li><strong>外循环</strong>（Iteration）：每轮开始时将当前策略模型同步为参考模型 \\(\\pi_{\\text{ref}} \\leftarrow \\pi_\\theta\\)</li>\n<li><strong>内循环</strong>（Step）：在每个 step 中，采样 batch → 生成 G 个输出 → 计算奖励 → 多次 GRPO 更新</li>\n<li><strong>奖励模型持续训练</strong>：通过 replay 机制持续更新奖励模型，防止策略模型\"欺骗\"固定的奖励模型（reward hacking）</li>\n</ol>\n<h5>与传统方法的关键区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>PPO</th>\n<th>GRPO</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Value Model</td>\n<td>需要（与 Policy 同规模）</td>\n<td><strong>不需要</strong></td>\n</tr>\n<tr>\n<td>优势估计</td>\n<td>GAE（基于 Value Model）</td>\n<td><strong>组内相对奖励归一化</strong></td>\n</tr>\n<tr>\n<td>KL 惩罚位置</td>\n<td>嵌入 token 级奖励</td>\n<td><strong>序列级损失正则项</strong></td>\n</tr>\n<tr>\n<td>采样策略</td>\n<td>每个问题 1 个输出</td>\n<td><strong>每个问题 G 个输出</strong></td>\n</tr>\n<tr>\n<td>训练资源</td>\n<td>4 个模型同时加载</td>\n<td><strong>3 个模型（省去 Value Model）</strong></td>\n</tr>\n<tr>\n<td>奖励模型</td>\n<td>固定</td>\n<td><strong>可迭代更新</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p>GRPO 的设计哲学是：<strong>利用同一问题的多个输出之间的相对比较来替代绝对的价值估计</strong>，这在 LLM 的序列级奖励场景下既自然又高效。</p>",
      "quiz": {
        "q": "GRPO 相比 PPO 最核心的改进是什么？",
        "options": [
          "使用更大的学习率加速收敛",
          "去除 Value Model，通过组内采样输出的相对奖励归一化来估计优势函数",
          "引入更复杂的奖励模型提升奖励精度",
          "将策略梯度替换为进化策略以避免梯度消失"
        ],
        "answer": 1,
        "explain": "GRPO 的核心创新是去除 Value Model，对每个问题采样 G 个输出，利用组内奖励的均值和标准差归一化作为优势估计，大幅降低训练资源同时保持性能。"
      }
    }
  ],
  "categories": {
    "foundation": {
      "label": "奠基性算法",
      "color": "#4A90D9"
    },
    "core": {
      "label": "核心范式算法",
      "color": "#50C878"
    },
    "frontier": {
      "label": "前沿进展(2023-2026)",
      "color": "#FF6B6B"
    }
  },
  "projectUrls": {}
};
