/**
 * ai4physics-data.js — 由 pipeline/build.py 于 2026-06-11 15:11:24 自动生成。
 * 源文件：content/ai4sci/ai4physics.md
 * ⚠️  请勿手动修改；如需更新，修改源文档后重新编译。
 */
window.PAGE_CONFIG = {
  "meta": {
    "domain": "ai4sci",
    "topic_id": "ai4physics",
    "topic_name": "物理学AI",
    "page_title": "物理学AI 算法总结",
    "page_subtitle": "2026-06-11 版",
    "page_desc": "从PINN到神经算子，从流体仿真到物理定律发现，涵盖2016-2026年物理学AI核心算法演化",
    "page_icon": "⚛️",
    "hero_pills": [
      "🏷️ PINN · Neural Operators · AI4Sci",
      "🔬 PDE求解 · 流体仿真 · 物理发现"
    ],
    "count_pill": "{count} 个算法",
    "image_base": "../../content/ai4sci/ai4physics/assets/",
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
        "id": "sindy",
        "x": 0.0,
        "y": 70,
        "category": "physics_discovery"
      },
      {
        "id": "nqs",
        "x": 10.0,
        "y": 110,
        "category": "quantum_particle"
      },
      {
        "id": "pde_net",
        "x": 20.0,
        "y": 10,
        "category": "pde_solving"
      },
      {
        "id": "neural_ode",
        "x": 20.0,
        "y": 90,
        "category": "physics_constrained"
      },
      {
        "id": "pinn",
        "x": 30.0,
        "y": 10,
        "category": "pde_solving"
      },
      {
        "id": "hnn",
        "x": 30.0,
        "y": 90,
        "category": "physics_constrained"
      },
      {
        "id": "xpinns",
        "x": 40.0,
        "y": 10,
        "category": "pde_solving"
      },
      {
        "id": "gns",
        "x": 40.0,
        "y": 30,
        "category": "fluid_simulation"
      },
      {
        "id": "meshgraphnets",
        "x": 40.0,
        "y": 30,
        "category": "fluid_simulation"
      },
      {
        "id": "jax_md",
        "x": 40.0,
        "y": 30,
        "category": "fluid_simulation"
      },
      {
        "id": "difftaichi",
        "x": 40.0,
        "y": 30,
        "category": "fluid_simulation"
      },
      {
        "id": "phiflow",
        "x": 40.0,
        "y": 30,
        "category": "fluid_simulation"
      },
      {
        "id": "ai_feynman",
        "x": 40.0,
        "y": 70,
        "category": "physics_discovery"
      },
      {
        "id": "ude",
        "x": 40.0,
        "y": 70,
        "category": "physics_discovery"
      },
      {
        "id": "lnn",
        "x": 40.0,
        "y": 90,
        "category": "physics_constrained"
      },
      {
        "id": "sympnets",
        "x": 40.0,
        "y": 90,
        "category": "physics_constrained"
      },
      {
        "id": "particlenet",
        "x": 40.0,
        "y": 110,
        "category": "quantum_particle"
      },
      {
        "id": "hp_vpinns",
        "x": 50.0,
        "y": 10,
        "category": "pde_solving"
      },
      {
        "id": "fno",
        "x": 50.0,
        "y": 10,
        "category": "pde_solving"
      },
      {
        "id": "deeponet",
        "x": 50.0,
        "y": 10,
        "category": "pde_solving"
      },
      {
        "id": "brax",
        "x": 50.0,
        "y": 30,
        "category": "fluid_simulation"
      },
      {
        "id": "canns",
        "x": 50.0,
        "y": 50,
        "category": "solid_mechanics"
      },
      {
        "id": "tanns",
        "x": 50.0,
        "y": 50,
        "category": "solid_mechanics"
      },
      {
        "id": "egnn",
        "x": 50.0,
        "y": 90,
        "category": "physics_constrained"
      },
      {
        "id": "noether_nets",
        "x": 50.0,
        "y": 90,
        "category": "physics_constrained"
      },
      {
        "id": "gpinn",
        "x": 60.0,
        "y": 10,
        "category": "pde_solving"
      },
      {
        "id": "causal_pinn",
        "x": 60.0,
        "y": 10,
        "category": "pde_solving"
      },
      {
        "id": "pi_deeponet",
        "x": 60.0,
        "y": 10,
        "category": "pde_solving"
      },
      {
        "id": "geo_fno",
        "x": 70.0,
        "y": 10,
        "category": "pde_solving"
      },
      {
        "id": "uno",
        "x": 70.0,
        "y": 10,
        "category": "pde_solving"
      },
      {
        "id": "pysr",
        "x": 70.0,
        "y": 70,
        "category": "physics_discovery"
      },
      {
        "id": "poseidon",
        "x": 80.0,
        "y": 10,
        "category": "pde_solving"
      },
      {
        "id": "walrus",
        "x": 100.0,
        "y": 10,
        "category": "pde_solving"
      },
      {
        "id": "transolver3",
        "x": 100.0,
        "y": 10,
        "category": "pde_solving"
      },
      {
        "id": "pf_pino",
        "x": 100.0,
        "y": 10,
        "category": "pde_solving"
      },
      {
        "id": "pikan",
        "x": 100.0,
        "y": 10,
        "category": "pde_solving"
      },
      {
        "id": "fedonet",
        "x": 100.0,
        "y": 10,
        "category": "pde_solving"
      },
      {
        "id": "fano",
        "x": 100.0,
        "y": 30,
        "category": "fluid_simulation"
      },
      {
        "id": "physicsnemo",
        "x": 100.0,
        "y": 30,
        "category": "fluid_simulation"
      },
      {
        "id": "simple_pinn",
        "x": 100.0,
        "y": 30,
        "category": "fluid_simulation"
      },
      {
        "id": "fe_pinns",
        "x": 100.0,
        "y": 50,
        "category": "solid_mechanics"
      },
      {
        "id": "aion1",
        "x": 100.0,
        "y": 90,
        "category": "physics_constrained"
      },
      {
        "id": "momentum_gnn",
        "x": 100.0,
        "y": 90,
        "category": "physics_constrained"
      }
    ],
    "edges": [
      {
        "from": "pinn",
        "to": "xpinns",
        "label": "域分解"
      },
      {
        "from": "gns",
        "to": "meshgraphnets",
        "label": "网格扩展"
      },
      {
        "from": "neural_ode",
        "to": "ude",
        "label": "混合建模"
      },
      {
        "from": "hnn",
        "to": "lnn",
        "label": "拉格朗日"
      },
      {
        "from": "hnn",
        "to": "sympnets",
        "label": "辛对称"
      },
      {
        "from": "pinn",
        "to": "hp_vpinns",
        "label": "变分细化"
      },
      {
        "from": "jax_md",
        "to": "brax",
        "label": "刚体引擎"
      },
      {
        "from": "pinn",
        "to": "gpinn",
        "label": "梯度增强"
      },
      {
        "from": "pinn",
        "to": "causal_pinn",
        "label": "因果加权"
      },
      {
        "from": "deeponet",
        "to": "pi_deeponet",
        "label": "物理嵌入"
      },
      {
        "from": "fno",
        "to": "geo_fno",
        "label": "几何自适应"
      },
      {
        "from": "fno",
        "to": "uno",
        "label": "多尺度"
      },
      {
        "from": "fno",
        "to": "poseidon",
        "label": "基础模型"
      },
      {
        "from": "poseidon",
        "to": "walrus",
        "label": "规模化扩展"
      },
      {
        "from": "fno",
        "to": "transolver3",
        "label": "大规模网格"
      },
      {
        "from": "fno",
        "to": "pf_pino",
        "label": "相场约束"
      },
      {
        "from": "pinn",
        "to": "pikan",
        "label": "架构演进"
      },
      {
        "from": "deeponet",
        "to": "fedonet",
        "label": "谱特征嵌入"
      },
      {
        "from": "fno",
        "to": "fano",
        "label": "平流增强"
      },
      {
        "from": "pinn",
        "to": "simple_pinn",
        "label": "算法融合"
      },
      {
        "from": "canns",
        "to": "fe_pinns",
        "label": "有限元集成"
      },
      {
        "from": "egnn",
        "to": "momentum_gnn",
        "label": "守恒律硬约束"
      }
    ],
    "milestones": [
      {
        "id": "neural_ode",
        "label": "连续深度模型奠基"
      },
      {
        "id": "pinn",
        "label": "物理信息嵌入范式"
      },
      {
        "id": "fno",
        "label": "算子学习突破"
      },
      {
        "id": "walrus",
        "label": "物理大模型时代"
      }
    ]
  },
  "algos": [
    {
      "id": "sindy",
      "num": 1,
      "name": "SINDy",
      "fullName": "稀疏识别动力学 (Sparse Identification of Nonlinear Dynamics)",
      "year": "2016",
      "org": "华盛顿大学",
      "parent": "—",
      "paperUrl": "https://www.pnas.org/doi/10.1073/pnas.1517384113",
      "projectUrl": "",
      "category": "physics_discovery",
      "motivation": "稀疏回归识别非线性控制方程",
      "summary": "SINDy 的核心目标是：稀疏回归识别非线性控制方程。",
      "keyPoints": [
        "核心动机：稀疏回归识别非线性控制方程",
        "代表机构：华盛顿大学"
      ],
      "detail": "<p>稀疏回归识别非线性控制方程</p>"
    },
    {
      "id": "nqs",
      "num": 2,
      "name": "NQS",
      "fullName": "神经量子态 (Neural Quantum States)",
      "year": "2017",
      "org": "ETH Zurich",
      "parent": "—",
      "paperUrl": "https://www.science.org/doi/10.1126/science.aag2302",
      "projectUrl": "",
      "category": "quantum_particle",
      "motivation": "RBM表示波函数解决多体问题",
      "summary": "NQS 的核心目标是：RBM表示波函数解决多体问题。",
      "keyPoints": [
        "核心动机：RBM表示波函数解决多体问题",
        "代表机构：ETH Zurich"
      ],
      "detail": "<p>RBM表示波函数解决多体问题</p>"
    },
    {
      "id": "pde_net",
      "num": 3,
      "name": "PDE-Net",
      "fullName": "偏微分方程网络 (PDE-Net)",
      "year": "2018",
      "org": "北京大学",
      "parent": "—",
      "paperUrl": "http://proceedings.mlr.press/v80/long18a.html",
      "projectUrl": "",
      "category": "pde_solving",
      "motivation": "卷积矩约束模拟微分算子",
      "summary": "PDE-Net 的核心目标是：卷积矩约束模拟微分算子。",
      "keyPoints": [
        "核心动机：卷积矩约束模拟微分算子",
        "代表机构：北京大学"
      ],
      "detail": "<p>卷积矩约束模拟微分算子</p>"
    },
    {
      "id": "neural_ode",
      "num": 4,
      "name": "Neural ODE",
      "fullName": "神经常微分方程 (Neural Ordinary Differential Equations)",
      "year": "2018",
      "org": "多伦多大学",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/1806.07366",
      "projectUrl": "",
      "category": "physics_constrained",
      "motivation": "网络层视为连续时间演化",
      "summary": "Neural ODE 的核心目标是：网络层视为连续时间演化。",
      "keyPoints": [
        "核心动机：网络层视为连续时间演化",
        "代表机构：多伦多大学"
      ],
      "detail": "<p>网络层视为连续时间演化</p>"
    },
    {
      "id": "pinn",
      "num": 5,
      "name": "PINN",
      "fullName": "物理信息神经网络 (Physics-Informed Neural Networks)",
      "year": "2019",
      "org": "布朗大学",
      "parent": "—",
      "paperUrl": "https://doi.org/10.1016/j.jcp.2018.10.045",
      "projectUrl": "",
      "category": "pde_solving",
      "motivation": "将PDE残差嵌入Loss实现无网格求解",
      "summary": "PINN 的核心目标是：将PDE残差嵌入Loss实现无网格求解。",
      "keyPoints": [
        "核心动机：将PDE残差嵌入Loss实现无网格求解",
        "代表机构：布朗大学"
      ],
      "detail": "<p>将PDE残差嵌入Loss实现无网格求解</p>"
    },
    {
      "id": "hnn",
      "num": 6,
      "name": "HNN",
      "fullName": "哈密顿神经网络 (Hamiltonian Neural Networks)",
      "year": "2019",
      "org": "Google",
      "parent": "—",
      "paperUrl": "https://proceedings.neurips.cc/paper/2019/hash/26cd8ecadce0d4efd6cc8a8725cbd1f8-Abstract.html",
      "projectUrl": "",
      "category": "physics_constrained",
      "motivation": "学习哈密顿量确保能量守恒",
      "summary": "HNN 提出用神经网络直接参数化物理系统的哈密顿量 \\(H_\\theta(\\mathbf{q}, \\mathbf{p})\\)，并通过自动微分强制输出满足哈密顿正则方程（辛结构），从而在不显式编码能量守恒规则的前提下，让网络自动学会保持系统总能量——在弹簧、单摆、两体问题乃至像素级观测等任务上，能量守恒精度比普通基线网络高出数个数量级。",
      "keyPoints": [
        "<strong>核心思想</strong>：不直接拟合 <span class=\"kb-math kb-math-inline\">\\dot{\\mathbf{q}}, \\dot{\\mathbf{p}}</span>，而是让 NN 输出标量哈密顿量 <span class=\"kb-math kb-math-inline\">H_\\theta</span>，再通过辛梯度 <span class=\"kb-math kb-math-inline\">(\\partial H/\\partial \\mathbf{p},\\; -\\partial H/\\partial \\mathbf{q})</span> 得到动力学，结构性地保证能量守恒",
        "<strong>损失函数</strong>：直接监督哈密顿方程的左右两侧之差（Eq 3），无需能量标签",
        "<strong>5 个实验任务</strong>：理想弹簧（Task 1）、理想单摆（Task 2）、真实单摆视频数据（Task 3）、两体引力问题（Task 4）、像素级单摆（Task 5）",
        "<strong>像素扩展</strong>：Autoencoder + HNN 联合训练，辅助损失（Eq 7）使潜空间的后半部分 <span class=\"kb-math kb-math-inline\">\\mathbf{z_p}</span> 近似 <span class=\"kb-math kb-math-inline\">\\mathbf{z_q}</span> 的时间导数，从而满足正则坐标条件",
        "<strong>定量结果</strong>：在所有任务上，HNN 的能量 MSE 比基线低 1–3 个数量级（Table 1），而训练/测试损失与基线相当",
        "<strong>网络架构</strong>：极简 MLP（3 层全连接，200 隐藏单元，tanh 激活），训练使用 Adam（lr = 1e-3）"
      ],
      "detail": "<h5>核心架构示意图</h5>\n<p><img alt=\"HNN 核心思想对比图\" src=\"https://ar5iv.labs.arxiv.org/html/1906.01563/assets/x1.png\" />\n<em>图 1：左侧为基线方法——直接用 NN 拟合状态导数 <span class=\"kb-math kb-math-inline\">(\\dot{q}, \\dot{p})</span>；右侧为 HNN——NN 输出标量 <span class=\"kb-math kb-math-inline\">H_\\theta</span>，再通过辛梯度（自动微分）得到动力学。HNN 的相空间轨迹保持在等能量面上（右下角），而基线轨迹逐渐偏离（左下角）。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># HNN 训练与推理伪代码\nimport torch\nimport torch.autograd as autograd\n\n# === 模型定义 ===\nclass HNN(torch.nn.Module):\n    def __init__(self, input_dim, hidden_dim=200):\n        super().__init__()\n        self.net = torch.nn.Sequential(\n            torch.nn.Linear(input_dim, hidden_dim),  # (q,p) → hidden\n            torch.nn.Tanh(),\n            torch.nn.Linear(hidden_dim, hidden_dim),\n            torch.nn.Tanh(),\n            torch.nn.Linear(hidden_dim, 1)            # → 标量 H\n        )\n\n    def forward(self, q, p):\n        x = torch.cat([q, p], dim=-1)\n        return self.net(x)  # 输出标量哈密顿量\n\n    def time_derivative(self, q, p):\n        &quot;&quot;&quot;通过辛梯度计算 dq/dt, dp/dt&quot;&quot;&quot;\n        q.requires_grad_(True)\n        p.requires_grad_(True)\n        H = self.forward(q, p)\n        dH_dq = autograd.grad(H.sum(), q, create_graph=True)[0]\n        dH_dp = autograd.grad(H.sum(), p, create_graph=True)[0]\n        dq_dt = dH_dp       # Hamilton 方程: dq/dt = ∂H/∂p\n        dp_dt = -dH_dq      # Hamilton 方程: dp/dt = -∂H/∂q\n        return dq_dt, dp_dt\n\n# === 训练循环 ===\nmodel = HNN(input_dim=2)  # 1D 系统: q, p 各 1 维\noptimizer = torch.optim.Adam(model.parameters(), lr=1e-3)\n\nfor step in range(2000):\n    # 从数据中采样 (q, p, dq/dt_true, dp/dt_true)\n    q, p, dq_true, dp_true = sample_batch(data, batch_size=200)\n    dq_pred, dp_pred = model.time_derivative(q, p)\n    # 损失: 预测导数 vs 真实导数 (Eq 3)\n    loss = ((dq_pred - dq_true)**2 + (dp_pred - dp_true)**2).mean()\n    optimizer.zero_grad()\n    loss.backward()\n    optimizer.step()\n\n# === 推理: 用 RK4 积分生成轨迹 ===\ndef rk4_step(model, q, p, dt):\n    def f(q, p):\n        return model.time_derivative(q, p)\n    k1q, k1p = f(q, p)\n    k2q, k2p = f(q + dt/2*k1q, p + dt/2*k1p)\n    k3q, k3p = f(q + dt/2*k2q, p + dt/2*k2p)\n    k4q, k4p = f(q + dt*k3q, p + dt*k3p)\n    q_new = q + dt/6 * (k1q + 2*k2q + 2*k3q + k4q)\n    p_new = p + dt/6 * (k1p + 2*k2p + 2*k3p + k4p)\n    return q_new, p_new\n</code></pre>\n<h5>动机与背景</h5>\n<p>物理系统的动力学建模是科学计算的核心任务。传统的神经网络方法（如 Neural ODE）直接用网络拟合状态的时间导数 <span class=\"kb-math kb-math-inline\">\\dot{\\mathbf{x}} = f_\\theta(\\mathbf{x})</span>，虽然灵活，但<strong>完全忽略了物理系统的守恒律</strong>。对于保守力学系统，总能量 <span class=\"kb-math kb-math-inline\">H(\\mathbf{q}, \\mathbf{p})</span> 是一个运动常数——沿真实轨迹恒定不变。普通 NN 无法保证这一点，导致长时间积分时能量漂移、轨迹发散。</p>\n<div class=\"key-point\">💡 <strong>关键洞察</strong>：哈密顿力学提供了一个天然的归纳偏置——只要动力学由某个标量函数 <span class=\"kb-math kb-math-inline\">H</span> 的辛梯度给出，能量就自动守恒。HNN 的核心贡献就是将这一结构性约束嵌入神经网络。</div>\n<h5>哈密顿力学基础</h5>\n<p>对于一个具有广义坐标 <span class=\"kb-math kb-math-inline\">\\mathbf{q}</span> 和共轭动量 <span class=\"kb-math kb-math-inline\">\\mathbf{p}</span> 的力学系统，哈密顿量 <span class=\"kb-math kb-math-inline\">H(\\mathbf{q}, \\mathbf{p})</span> 是系统的总能量。<strong>哈密顿正则方程</strong>给出了系统的时间演化：</p>\n<div class=\"kb-math kb-math-display\">\\frac{d\\mathbf{q}}{dt} = \\frac{\\partial H}{\\partial \\mathbf{p}}, \\qquad \\frac{d\\mathbf{p}}{dt} = -\\frac{\\partial H}{\\partial \\mathbf{q}} \\tag{1}</div>\n<p>这组方程具有<strong>辛结构</strong>（symplectic structure），可以紧凑地写为：</p>\n<div class=\"kb-math kb-math-display\">\\frac{d}{dt}\\begin{pmatrix} \\mathbf{q} \\\\ \\mathbf{p} \\end{pmatrix} = \\begin{pmatrix} 0 &amp; I \\\\ -I &amp; 0 \\end{pmatrix} \\nabla_{(\\mathbf{q},\\mathbf{p})} H \\tag{2}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">J = \\begin{pmatrix} 0 &amp; I \\\\ -I &amp; 0 \\end{pmatrix}</span> 是辛矩阵。辛结构的直接推论是：</p>\n<div class=\"kb-math kb-math-display\">\\frac{dH}{dt} = \\nabla H \\cdot \\dot{\\mathbf{x}} = \\nabla H \\cdot J \\nabla H = 0</div>\n<p>即 <strong><span class=\"kb-math kb-math-inline\">H</span> 沿轨迹恒为常数</strong>——能量自动守恒，无需额外约束。</p>\n<h5>HNN 的核心机制</h5>\n<p>HNN 的设计极为优雅：</p>\n<ol>\n<li>\n<p><strong>参数化哈密顿量</strong>：用一个神经网络 <span class=\"kb-math kb-math-inline\">H_\\theta: \\mathbb{R}^{2n} \\to \\mathbb{R}</span> 将相空间坐标 <span class=\"kb-math kb-math-inline\">(\\mathbf{q}, \\mathbf{p})</span> 映射为标量。网络不直接预测动力学，而是预测一个\"能量景观\"。</p>\n</li>\n<li>\n<p><strong>辛梯度提取动力学</strong>：利用自动微分计算 <span class=\"kb-math kb-math-inline\">\\partial H_\\theta / \\partial \\mathbf{p}</span> 和 <span class=\"kb-math kb-math-inline\">\\partial H_\\theta / \\partial \\mathbf{q}</span>，再通过哈密顿方程得到 <span class=\"kb-math kb-math-inline\">\\dot{\\mathbf{q}}</span> 和 <span class=\"kb-math kb-math-inline\">\\dot{\\mathbf{p}}</span>。这一步是 HNN 的灵魂——它将物理结构硬编码进了计算图。</p>\n</li>\n<li>\n<p><strong>损失函数（Eq 3）</strong>：</p>\n</li>\n</ol>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{HNN}} = \\left\\| \\frac{\\partial H_\\theta}{\\partial \\mathbf{p}} - \\frac{d\\mathbf{q}}{dt} \\right\\|^2 + \\left\\| \\frac{\\partial H_\\theta}{\\partial \\mathbf{q}} + \\frac{d\\mathbf{p}}{dt} \\right\\|^2 \\tag{3}</div>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：训练数据只需要状态-导数对 <span class=\"kb-math kb-math-inline\">(\\mathbf{q}, \\mathbf{p}, \\dot{\\mathbf{q}}, \\dot{\\mathbf{p}})</span>，<strong>不需要能量标签</strong>。能量守恒是结构的自然结果，而非显式监督的目标。</div>\n<h5>从坐标到像素：Autoencoder + HNN</h5>\n<p>论文最具创新性的实验是 <strong>Task 5: Pixel Pendulum</strong>——直接从 28×28 灰度图像序列中学习哈密顿动力学。</p>\n<p><img alt=\"像素摆实验结果\" src=\"https://ar5iv.labs.arxiv.org/html/1906.01563/assets/x4.png\" />\n<em>图 4：像素摆实验。HNN 在潜空间中保持能量守恒，预测轨迹数百帧后仍接近真实值；基线模型迅速衰减到低能态。</em></p>\n<p>方法设计：\n- <strong>输入</strong>：连续两帧 28×28 图像拼接（batch × 28 × 28 × 2），双帧使速度可观测\n- <strong>Autoencoder</strong>：4 层全连接（200 隐藏单元，ReLU + 残差连接），潜空间维度为 2（<span class=\"kb-math kb-math-inline\">\\mathbf{z} = (\\mathbf{z_q}, \\mathbf{z_p})</span>）\n- <strong>HNN</strong>：在潜空间上运行，架构与坐标实验相同\n- <strong>辅助损失（Eq 7）</strong>：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{CC} = \\left\\| \\mathbf{z}^t_{\\mathbf{p}} - (\\mathbf{z}^t_{\\mathbf{q}} - \\mathbf{z}^{t+1}_{\\mathbf{q}}) \\right\\|_2 \\tag{7}</div>\n<p>该损失鼓励 <span class=\"kb-math kb-math-inline\">\\mathbf{z_p}</span> 近似 <span class=\"kb-math kb-math-inline\">\\dot{\\mathbf{z}}_{\\mathbf{q}}</span>（有限差分），使潜空间具有正则坐标 <span class=\"kb-math kb-math-inline\">(\\mathbf{q}, \\mathbf{p})</span> 的性质——这是哈密顿力学成立的前提条件。</p>\n<p>总损失 = HNN 损失 + 自编码器重建损失（L2 像素损失）+ 辅助正则坐标损失。</p>\n<h5>实验结果与对比</h5>\n<p>论文在 5 个任务上对比了 HNN 与基线（直接拟合导数的同架构 NN）：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>任务</th>\n<th>基线能量 MSE (×10³)</th>\n<th>HNN 能量 MSE (×10³)</th>\n<th>提升倍数</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>理想弹簧</td>\n<td>170 ± 20</td>\n<td><strong>0.38 ± 0.1</strong></td>\n<td>~450×</td>\n</tr>\n<tr>\n<td>理想单摆</td>\n<td>42 ± 10</td>\n<td><strong>25 ± 5</strong></td>\n<td>~1.7×</td>\n</tr>\n<tr>\n<td>真实单摆</td>\n<td>390 ± 7</td>\n<td><strong>14 ± 5</strong></td>\n<td>~28×</td>\n</tr>\n<tr>\n<td>两体问题</td>\n<td>—</td>\n<td>—</td>\n<td>约 10×</td>\n</tr>\n<tr>\n<td>像素单摆</td>\n<td>—</td>\n<td>—</td>\n<td>数量级提升</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 <strong>关键发现</strong>：HNN 与基线的训练/测试损失相当（两者拟合能力相似），但 HNN 在<strong>能量守恒</strong>指标上以压倒性优势胜出。这说明辛结构归纳偏置的价值不在于更好的拟合，而在于更好的<strong>泛化和长期稳定性</strong>。</div>\n<h5>与传统方法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>传统 NN (Neural ODE)</th>\n<th>HNN</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>输出</td>\n<td>直接预测 <span class=\"kb-math kb-math-inline\">\\dot{\\mathbf{q}}, \\dot{\\mathbf{p}}</span></td>\n<td>预测标量 <span class=\"kb-math kb-math-inline\">H_\\theta</span>，辛梯度得动力学</td>\n</tr>\n<tr>\n<td>能量守恒</td>\n<td>无保证，长期漂移</td>\n<td>结构性保证（精确到数值积分误差）</td>\n</tr>\n<tr>\n<td>物理先验</td>\n<td>无</td>\n<td>哈密顿辛结构</td>\n</tr>\n<tr>\n<td>训练数据</td>\n<td>状态-导数对</td>\n<td>同样是状态-导数对（无需能量标签）</td>\n</tr>\n<tr>\n<td>长期积分</td>\n<td>轨迹迅速发散</td>\n<td>轨迹长期稳定</td>\n</tr>\n<tr>\n<td>局限</td>\n<td>灵活但不稳定</td>\n<td>要求系统为保守系统（无耗散）</td>\n</tr>\n</tbody>\n</table></div>\n<h5>讨论与局限</h5>\n<ul>\n<li><strong>正则坐标要求</strong>：HNN 假设输入为正则坐标 <span class=\"kb-math kb-math-inline\">(\\mathbf{q}, \\mathbf{p})</span>，对于像素等非正则输入需要额外的 Autoencoder 和辅助损失来学习正则表示</li>\n<li><strong>保守系统假设</strong>：HNN 天然不能处理耗散系统（如有摩擦的系统），后续工作如 Dissipative HNN 对此进行了扩展</li>\n<li><strong>数值积分误差</strong>：虽然 HNN 结构上保证 <span class=\"kb-math kb-math-inline\">dH/dt = 0</span>，但实际使用 RK4 等非辛积分器时仍有微小能量漂移；使用辛积分器（如 Leapfrog）可进一步改善</li>\n<li><strong>可扩展性</strong>：论文在两体和三体问题上展示了扩展性，但更高维系统的效果有待验证</li>\n</ul>",
      "quiz": {
        "q": "HNN 相比直接拟合时间导数的基线网络，其核心优势来源于什么？",
        "options": [
          "使用了更深的网络架构和更多的训练数据",
          "网络输出标量哈密顿量并通过辛梯度得到动力学，结构性地保证能量守恒",
          "在损失函数中显式加入了能量守恒的惩罚项",
          "使用了辛积分器（如 Leapfrog）替代 Runge-Kutta 进行时间积分"
        ],
        "answer": 1,
        "explain": "HNN 的核心创新在于让 NN 输出标量 H 而非直接输出导数，再通过自动微分计算辛梯度得到动力学。由于辛结构的数学性质（dH/dt = ∇H · J∇H = 0），能量守恒是结构的自然结果，无需显式惩罚项或特殊积分器。"
      }
    },
    {
      "id": "xpinns",
      "num": 7,
      "name": "XPINNs",
      "fullName": "扩展PINN (Extended Physics-Informed Neural Networks)",
      "year": "2020",
      "org": "布朗大学",
      "parent": "pinn",
      "paperUrl": "https://doi.org/10.4208/cicp.OA-2020-0164",
      "projectUrl": "",
      "category": "pde_solving",
      "motivation": "域分解策略支持复杂几何并行化",
      "summary": "XPINNs 的核心目标是：域分解策略支持复杂几何并行化。",
      "keyPoints": [
        "核心动机：域分解策略支持复杂几何并行化",
        "演化来源：继承或改进自 pinn",
        "代表机构：布朗大学"
      ],
      "detail": "<p>域分解策略支持复杂几何并行化</p>"
    },
    {
      "id": "gns",
      "num": 8,
      "name": "GNS",
      "fullName": "图网络模拟器 (Graph Network Simulators)",
      "year": "2020",
      "org": "DeepMind",
      "parent": "—",
      "paperUrl": "https://proceedings.mlr.press/v119/sanchez-gonzalez20a.html",
      "projectUrl": "",
      "category": "fluid_simulation",
      "motivation": "粒子图网络模拟流体与材料交互",
      "summary": "GNS 的核心目标是：粒子图网络模拟流体与材料交互。",
      "keyPoints": [
        "核心动机：粒子图网络模拟流体与材料交互",
        "代表机构：DeepMind"
      ],
      "detail": "<p>粒子图网络模拟流体与材料交互</p>"
    },
    {
      "id": "meshgraphnets",
      "num": 9,
      "name": "MeshGraphNets",
      "fullName": "网格图网络 (Mesh Graph Networks)",
      "year": "2020",
      "org": "DeepMind",
      "parent": "gns",
      "paperUrl": "https://arxiv.org/abs/2010.03409",
      "projectUrl": "",
      "category": "fluid_simulation",
      "motivation": "针对欧拉网格的非结构化图网络",
      "summary": "MeshGraphNets 的核心目标是：针对欧拉网格的非结构化图网络。",
      "keyPoints": [
        "核心动机：针对欧拉网格的非结构化图网络",
        "演化来源：继承或改进自 gns",
        "代表机构：DeepMind"
      ],
      "detail": "<p>针对欧拉网格的非结构化图网络</p>"
    },
    {
      "id": "jax_md",
      "num": 10,
      "name": "JAX MD",
      "fullName": "JAX分子动力学 (JAX Molecular Dynamics)",
      "year": "2020",
      "org": "Google",
      "parent": "—",
      "paperUrl": "https://proceedings.neurips.cc/paper/2020/hash/83d3d4b6c9579515e1679aca8cbc8033-Abstract.html",
      "projectUrl": "",
      "category": "fluid_simulation",
      "motivation": "端到端可微分分子动力学引擎",
      "summary": "JAX MD 的核心目标是：端到端可微分分子动力学引擎。",
      "keyPoints": [
        "核心动机：端到端可微分分子动力学引擎",
        "代表机构：Google"
      ],
      "detail": "<p>端到端可微分分子动力学引擎</p>"
    },
    {
      "id": "difftaichi",
      "num": 11,
      "name": "DiffTaichi",
      "fullName": "可微分太极 (Differentiable Taichi)",
      "year": "2020",
      "org": "MIT",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/1910.00935",
      "projectUrl": "",
      "category": "fluid_simulation",
      "motivation": "命令式可微分编程支持流体控制",
      "summary": "DiffTaichi 的核心目标是：命令式可微分编程支持流体控制。",
      "keyPoints": [
        "核心动机：命令式可微分编程支持流体控制",
        "代表机构：MIT"
      ],
      "detail": "<p>命令式可微分编程支持流体控制</p>"
    },
    {
      "id": "phiflow",
      "num": 12,
      "name": "PhiFlow",
      "fullName": "流体物理库 (PhiFlow)",
      "year": "2020",
      "org": "慕尼黑工大",
      "parent": "—",
      "paperUrl": "https://github.com/tum-pbs/PhiFlow",
      "projectUrl": "",
      "category": "fluid_simulation",
      "motivation": "开源可微分流体仿真库",
      "summary": "PhiFlow 的核心目标是：开源可微分流体仿真库。",
      "keyPoints": [
        "核心动机：开源可微分流体仿真库",
        "代表机构：慕尼黑工大"
      ],
      "detail": "<p>开源可微分流体仿真库</p>"
    },
    {
      "id": "ai_feynman",
      "num": 13,
      "name": "AI Feynman",
      "fullName": "AI费曼 (AI Feynman)",
      "year": "2020",
      "org": "MIT",
      "parent": "—",
      "paperUrl": "https://www.science.org/doi/abs/10.1126/sciadv.aay2631",
      "projectUrl": "",
      "category": "physics_discovery",
      "motivation": "物理对称性与递归分解发现公式",
      "summary": "AI Feynman 的核心目标是：物理对称性与递归分解发现公式。",
      "keyPoints": [
        "核心动机：物理对称性与递归分解发现公式",
        "代表机构：MIT"
      ],
      "detail": "<p>物理对称性与递归分解发现公式</p>"
    },
    {
      "id": "ude",
      "num": 14,
      "name": "UDE",
      "fullName": "通用微分方程 (Universal Differential Equations)",
      "year": "2020",
      "org": "Christopher Rackauckas",
      "parent": "neural_ode",
      "paperUrl": "https://arxiv.org/abs/2001.04385",
      "projectUrl": "",
      "category": "physics_discovery",
      "motivation": "NN作为微分方程未知项补全物理",
      "summary": "UDE 的核心目标是：NN作为微分方程未知项补全物理。",
      "keyPoints": [
        "核心动机：NN作为微分方程未知项补全物理",
        "演化来源：继承或改进自 neural_ode",
        "代表机构：Christopher Rackauckas"
      ],
      "detail": "<p>NN作为微分方程未知项补全物理</p>"
    },
    {
      "id": "lnn",
      "num": 15,
      "name": "LNN",
      "fullName": "拉格朗日神经网络 (Lagrangian Neural Networks)",
      "year": "2020",
      "org": "DeepMind",
      "parent": "hnn",
      "paperUrl": "https://arxiv.org/abs/2003.04630",
      "projectUrl": "",
      "category": "physics_constrained",
      "motivation": "学习拉格朗日量处理约束动力学",
      "summary": "LNN 的核心目标是：学习拉格朗日量处理约束动力学。",
      "keyPoints": [
        "核心动机：学习拉格朗日量处理约束动力学",
        "演化来源：继承或改进自 hnn",
        "代表机构：DeepMind"
      ],
      "detail": "<p>学习拉格朗日量处理约束动力学</p>"
    },
    {
      "id": "sympnets",
      "num": 16,
      "name": "SympNets",
      "fullName": "辛神经网络 (Symplectic Neural Networks)",
      "year": "2020",
      "org": "Pengzhan Jin",
      "parent": "hnn",
      "paperUrl": "https://doi.org/10.1016/j.neunet.2020.08.028",
      "projectUrl": "",
      "category": "physics_constrained",
      "motivation": "本质满足辛对称消除数值耗散",
      "summary": "SympNets 的核心目标是：本质满足辛对称消除数值耗散。",
      "keyPoints": [
        "核心动机：本质满足辛对称消除数值耗散",
        "演化来源：继承或改进自 hnn",
        "代表机构：Pengzhan Jin"
      ],
      "detail": "<p>本质满足辛对称消除数值耗散</p>"
    },
    {
      "id": "particlenet",
      "num": 17,
      "name": "ParticleNet",
      "fullName": "粒子网络 (ParticleNet)",
      "year": "2020",
      "org": "Huilin Qu",
      "parent": "—",
      "paperUrl": "https://doi.org/10.1103/PhysRevD.101.056019",
      "projectUrl": "",
      "category": "quantum_particle",
      "motivation": "粒子云动态图卷积提升喷注鉴别",
      "summary": "ParticleNet 的核心目标是：粒子云动态图卷积提升喷注鉴别。",
      "keyPoints": [
        "核心动机：粒子云动态图卷积提升喷注鉴别",
        "代表机构：Huilin Qu"
      ],
      "detail": "<p>粒子云动态图卷积提升喷注鉴别</p>"
    },
    {
      "id": "hp_vpinns",
      "num": 18,
      "name": "hp-VPINNs",
      "fullName": "变分PINN (hp-Variational PINNs)",
      "year": "2021",
      "org": "布朗大学",
      "parent": "pinn",
      "paperUrl": "https://doi.org/10.1016/j.cma.2020.113533",
      "projectUrl": "",
      "category": "pde_solving",
      "motivation": "变分形式与hp细化优化精度",
      "summary": "hp-VPINNs 的核心目标是：变分形式与hp细化优化精度。",
      "keyPoints": [
        "核心动机：变分形式与hp细化优化精度",
        "演化来源：继承或改进自 pinn",
        "代表机构：布朗大学"
      ],
      "detail": "<p>变分形式与hp细化优化精度</p>"
    },
    {
      "id": "fno",
      "num": 19,
      "name": "FNO",
      "fullName": "傅里叶神经算子 (Fourier Neural Operator)",
      "year": "2021",
      "org": "Caltech",
      "parent": "—",
      "paperUrl": "https://openreview.net/forum?id=c8P9fhUhn9",
      "projectUrl": "",
      "category": "pde_solving",
      "motivation": "频率域积分运算实现分辨率无关",
      "summary": "FNO 的核心目标是：频率域积分运算实现分辨率无关。",
      "keyPoints": [
        "核心动机：频率域积分运算实现分辨率无关",
        "代表机构：Caltech"
      ],
      "detail": "<p>频率域积分运算实现分辨率无关</p>"
    },
    {
      "id": "deeponet",
      "num": 20,
      "name": "DeepONet",
      "fullName": "深度算子网络 (Deep Operator Network)",
      "year": "2021",
      "org": "宾大",
      "parent": "—",
      "paperUrl": "https://www.nature.com/articles/s42256-021-00302-5",
      "projectUrl": "",
      "category": "pde_solving",
      "motivation": "双分支架构学习函数空间映射",
      "summary": "DeepONet 的核心目标是：双分支架构学习函数空间映射。",
      "keyPoints": [
        "核心动机：双分支架构学习函数空间映射",
        "代表机构：宾大"
      ],
      "detail": "<p>双分支架构学习函数空间映射</p>"
    },
    {
      "id": "brax",
      "num": 21,
      "name": "Brax",
      "fullName": "JAX刚体引擎 (Brax)",
      "year": "2021",
      "org": "Google",
      "parent": "jax_md",
      "paperUrl": "https://github.com/google/brax",
      "projectUrl": "",
      "category": "fluid_simulation",
      "motivation": "高性能刚体动力学引擎",
      "summary": "Brax 的核心目标是：高性能刚体动力学引擎。",
      "keyPoints": [
        "核心动机：高性能刚体动力学引擎",
        "演化来源：继承或改进自 jax_md",
        "代表机构：Google"
      ],
      "detail": "<p>高性能刚体动力学引擎</p>"
    },
    {
      "id": "canns",
      "num": 22,
      "name": "CANNs",
      "fullName": "本构神经网络 (Constitutive Artificial Neural Networks)",
      "year": "2021",
      "org": "ETH Zurich",
      "parent": "—",
      "paperUrl": "https://doi.org/10.1016/j.jcp.2020.109841",
      "projectUrl": "",
      "category": "solid_mechanics",
      "motivation": "应变能密度嵌入确保本构稳定",
      "summary": "CANNs 的核心目标是：应变能密度嵌入确保本构稳定。",
      "keyPoints": [
        "核心动机：应变能密度嵌入确保本构稳定",
        "代表机构：ETH Zurich"
      ],
      "detail": "<p>应变能密度嵌入确保本构稳定</p>"
    },
    {
      "id": "tanns",
      "num": 23,
      "name": "TANNs",
      "fullName": "热力学神经网络 (Thermodynamics-based ANNs)",
      "year": "2021",
      "org": "希腊国立理工",
      "parent": "—",
      "paperUrl": "https://doi.org/10.1016/j.jmps.2020.104277",
      "projectUrl": "",
      "category": "solid_mechanics",
      "motivation": "强制热力学定律模拟粘塑性",
      "summary": "TANNs 的核心目标是：强制热力学定律模拟粘塑性。",
      "keyPoints": [
        "核心动机：强制热力学定律模拟粘塑性",
        "代表机构：希腊国立理工"
      ],
      "detail": "<p>强制热力学定律模拟粘塑性</p>"
    },
    {
      "id": "egnn",
      "num": 24,
      "name": "EGNN",
      "fullName": "等变图神经网络 (Equivariant Graph Neural Networks)",
      "year": "2021",
      "org": "阿姆斯特丹大学",
      "parent": "—",
      "paperUrl": "https://proceedings.mlr.press/v139/satorras21a.html",
      "projectUrl": "",
      "category": "physics_constrained",
      "motivation": "旋转平移反射等变保证物理一致",
      "summary": "EGNN 的核心目标是：旋转平移反射等变保证物理一致。",
      "keyPoints": [
        "核心动机：旋转平移反射等变保证物理一致",
        "代表机构：阿姆斯特丹大学"
      ],
      "detail": "<p>旋转平移反射等变保证物理一致</p>"
    },
    {
      "id": "noether_nets",
      "num": 25,
      "name": "Noether Networks",
      "fullName": "诺特网络 (Noether Networks)",
      "year": "2021",
      "org": "MIT",
      "parent": "—",
      "paperUrl": "https://proceedings.neurips.cc/paper/2021/hash/8e296a067a37563370ded05f5a3bf83e-Abstract.html",
      "projectUrl": "",
      "category": "physics_constrained",
      "motivation": "基于诺特定理自动发现守恒量",
      "summary": "Noether Networks 的核心目标是：基于诺特定理自动发现守恒量。",
      "keyPoints": [
        "核心动机：基于诺特定理自动发现守恒量",
        "代表机构：MIT"
      ],
      "detail": "<p>基于诺特定理自动发现守恒量</p>"
    },
    {
      "id": "gpinn",
      "num": 26,
      "name": "gPINN",
      "fullName": "梯度增强PINN (Gradient-enhanced PINN)",
      "year": "2022",
      "org": "宾大",
      "parent": "pinn",
      "paperUrl": "https://doi.org/10.1016/j.cma.2022.114823",
      "projectUrl": "",
      "category": "pde_solving",
      "motivation": "引入残差梯度项提升陡峭解精度",
      "summary": "gPINN 的核心目标是：引入残差梯度项提升陡峭解精度。",
      "keyPoints": [
        "核心动机：引入残差梯度项提升陡峭解精度",
        "演化来源：继承或改进自 pinn",
        "代表机构：宾大"
      ],
      "detail": "<p>引入残差梯度项提升陡峭解精度</p>"
    },
    {
      "id": "causal_pinn",
      "num": 27,
      "name": "Causal PINN",
      "fullName": "因果PINN (Causal Physics-Informed Neural Networks)",
      "year": "2022",
      "org": "宾大",
      "parent": "pinn",
      "paperUrl": "https://arxiv.org/abs/2203.07404",
      "projectUrl": "",
      "category": "pde_solving",
      "motivation": "时间因果律加权解决长时程收敛",
      "summary": "Causal PINN 的核心目标是：时间因果律加权解决长时程收敛。",
      "keyPoints": [
        "核心动机：时间因果律加权解决长时程收敛",
        "演化来源：继承或改进自 pinn",
        "代表机构：宾大"
      ],
      "detail": "<p>时间因果律加权解决长时程收敛</p>"
    },
    {
      "id": "pi_deeponet",
      "num": 28,
      "name": "PI-DeepONet",
      "fullName": "物理信息DeepONet (Physics-Informed DeepONet)",
      "year": "2022",
      "org": "布朗大学",
      "parent": "deeponet",
      "paperUrl": "https://link.springer.com/book/10.1007/978-3-031-36644-4",
      "projectUrl": "",
      "category": "pde_solving",
      "motivation": "物理信息嵌入算子网络",
      "summary": "PI-DeepONet 的核心目标是：物理信息嵌入算子网络。",
      "keyPoints": [
        "核心动机：物理信息嵌入算子网络",
        "演化来源：继承或改进自 deeponet",
        "代表机构：布朗大学"
      ],
      "detail": "<p>物理信息嵌入算子网络</p>"
    },
    {
      "id": "geo_fno",
      "num": 29,
      "name": "Geo-FNO",
      "fullName": "几何傅里叶算子 (Geometry-Adaptive FNO)",
      "year": "2023",
      "org": "Caltech",
      "parent": "fno",
      "paperUrl": "https://jmlr.org/papers/v24/23-0064.html",
      "projectUrl": "",
      "category": "pde_solving",
      "motivation": "可学习坐标变换支持非规则几何",
      "summary": "Geo-FNO 通过学习一个可微的坐标变换将不规则物理域映射到规则计算域，使得 FFT 可以在计算域上高效执行，从而将 FNO 扩展到任意几何形状和非均匀网格上的 PDE 求解，比数值求解器快 \\(10^5\\) 倍，比直接插值方法精度提升约 2 倍。",
      "keyPoints": [
        "<strong>可学习坐标变换</strong>：学习微分同胚映射 <span class=\"kb-math kb-math-inline\">\\phi^{-1}: D_a \\to D_c</span>，将不规则物理域 <span class=\"kb-math kb-math-inline\">D_a</span> 映射到单位环面 <span class=\"kb-math kb-math-inline\">D_c = [0,1]^d</span>",
        "<strong>几何傅里叶变换</strong>：在计算域上定义正向/逆向几何傅里叶变换 <span class=\"kb-math kb-math-inline\">\\mathcal{F}_a, \\mathcal{F}_a^{-1}</span>，仅需 <span class=\"kb-math kb-math-inline\">\\phi^{-1}</span> 即可完成双向变换",
        "<strong>结构化网格特例</strong>：当输入为结构化网格时，索引直接提供规范坐标映射，Geo-FNO 退化为标准 FNO",
        "<strong>Fourier 延拓</strong>：对拓扑不规则域（如含孔洞），先嵌入到更大的规则域再做变换，训练时仅在原域计算损失",
        "<strong>变形网络设计</strong>：采用残差连接 <span class=\"kb-math kb-math-inline\">\\xi = f(x,a) + x</span>（初始化为恒等映射）+ 正弦特征提升表达力",
        "<strong>多场景验证</strong>：弹性力学（点云输入）、塑性锻造、跨声速翼型流动、弯管流动四类 PDE 问题",
        "<strong>逆向设计能力</strong>：训练后可端到端优化几何参数（如翼型形状），实现气动逆设计"
      ],
      "detail": "<h5>核心架构示意图</h5>\n<p><img alt=\"Geo-FNO 架构图\" src=\"https://ar5iv.labs.arxiv.org/html/2207.05209/assets/x1.png\" />\n<em>图：Geo-FNO 架构。(a) 标准 FNO 在规则域上操作；(b) Geo-FNO 通过坐标变换 <span class=\"kb-math kb-math-inline\">\\phi_a</span> 将不规则物理域映射到规则计算域，在计算域上执行 FFT，再映射回物理域。</em></p>\n<p><img alt=\"实验场景\" src=\"https://ar5iv.labs.arxiv.org/html/2207.05209/assets/x2.png\" />\n<em>图：弹性力学（含孔洞的单元胞）和塑性锻造问题示例。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># Geo-FNO 前向传播伪代码\ndef geo_fno_forward(x_phys, a, phi_inv_net, fno_layers, P, Q):\n    &quot;&quot;&quot;\n    x_phys: 物理域网格点坐标 [N, d]\n    a:      输入函数值（如几何参数、边界条件）[N, d_a]\n    phi_inv_net: 变形网络 φ^{-1}\n    &quot;&quot;&quot;\n    # Step 1: 坐标变换 — 物理域 → 计算域\n    xi = phi_inv_net(x_phys, a)  # ξ = f(x, a) + x (残差连接)\n    # xi 现在是 [0,1]^d 上的均匀网格\n\n    # Step 2: 提升通道维度\n    v = P(a)  # [N, d_a] → [N, d_v]\n\n    # Step 3: L 层 Fourier 卷积（在计算域上）\n    for l in range(L):\n        # 几何傅里叶变换（首层用 F_a，中间层用标准 FFT）\n        v_hat = FFT(v)                    # 在均匀计算网格上做 FFT\n        v_hat = R_l @ v_hat               # 频域线性变换（截断高频）\n        v_freq = IFFT(v_hat)              # 逆 FFT\n        v_local = W_l @ v + b_l           # 局部线性变换\n        v = activation(v_freq + v_local)  # 残差 + 激活\n\n    # Step 4: 投影到输出空间\n    u = Q(v)  # [N, d_v] → [N, d_u]\n\n    # Step 5: 逆变换回物理域（通过 ξ → x 对应关系）\n    return u  # 物理域上的解\n</code></pre>\n<h5>方法详解</h5>\n<p><strong>1. 动机与背景：FNO 的几何局限</strong></p>\n<p>标准 Fourier Neural Operator (FNO) 通过在频域进行全局卷积来学习 PDE 的解算子，其核心优势在于利用 FFT 实现 <span class=\"kb-math kb-math-inline\">O(N \\log N)</span> 的高效计算。然而，FFT 要求输入数据定义在<strong>均匀网格</strong>和<strong>规则域</strong>（如矩形/环面）上，这严重限制了 FNO 在实际工程问题中的应用——真实 PDE 问题通常涉及复杂几何（翼型、含孔洞结构等）和非均匀自适应网格。</p>\n<p>现有的解决方案包括：(1) 将不规则域插值到规则网格再用 FNO，但插值引入额外误差；(2) 使用图神经网络（GNO）处理任意网格，但失去了频域全局卷积的效率优势。Geo-FNO 的核心洞察是：<strong>与其改变算子，不如改变坐标系</strong>。</p>\n<div class=\"key-point\">💡 <strong>关键直觉</strong>：如果我们能找到一个光滑的坐标变换，把不规则的物理域\"拉直\"成规则的计算域，就可以在计算域上直接用 FFT，同时保持与物理域的精确对应关系。</div>\n<p><strong>2. 核心机制：可微坐标变换</strong></p>\n<p>Geo-FNO 的数学基础是微分同胚映射。定义坐标变换：</p>\n<div class=\"kb-math kb-math-display\">\\phi_a: D^c \\to D_a, \\quad \\xi \\mapsto x</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">D^c = [0,1]^d</span> 是单位环面（计算域），<span class=\"kb-math kb-math-inline\">D_a</span> 是物理域。该映射将计算域上的均匀网格 <span class=\"kb-math kb-math-inline\">\\mathcal{T}^c</span> 推前（pushforward）为物理域上的自适应网格：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{T}_a \\coloneqq \\phi_a(\\mathcal{T}^c), \\quad \\psi_a(x) \\coloneqq \\psi^c \\circ \\phi_a^{-1}(x)</div>\n<p>对于物理域上的函数 <span class=\"kb-math kb-math-inline\">v(x)</span>，通过拉回（pullback）变换到计算域：</p>\n<div class=\"kb-math kb-math-display\">v^c(\\xi) \\coloneqq v(\\phi_a(\\xi))</div>\n<p><strong>3. 几何傅里叶变换</strong></p>\n<p>基于坐标变换，定义正向几何傅里叶变换：</p>\n<div class=\"kb-math kb-math-display\">(\\mathcal{F}_a v)(k) = \\int_{D^c} v^c(\\xi) e^{-2i\\pi \\langle \\xi, k \\rangle} d\\xi \\approx \\frac{1}{|\\mathcal{T}^i|} \\sum_{x \\in \\mathcal{T}^i} m(x) v(x) e^{-2i\\pi \\langle \\phi^{-1}(x), k \\rangle}</div>\n<p>逆变换为：</p>\n<div class=\"kb-math kb-math-display\">(\\mathcal{F}_a^{-1} \\hat{v})(x) = \\sum_k \\hat{v}(k) e^{2i\\pi \\langle \\phi^{-1}(x), k \\rangle}</div>\n<div class=\"warn-box\">⚠️ <strong>重要性质</strong>：正向和逆向变换都只需要 <span class=\"kb-math kb-math-inline\">\\phi^{-1}</span>（物理域→计算域方向），无需显式计算 <span class=\"kb-math kb-math-inline\">\\phi</span>，这大大简化了实现。</div>\n<p>当 <span class=\"kb-math kb-math-inline\">\\phi^{-1}</span> 将输入网格映射为均匀网格时，权重 <span class=\"kb-math kb-math-inline\">m(x) = 1</span>，几何傅里叶变换退化为标准 FFT。</p>\n<p><strong>4. 变形网络的设计</strong></p>\n<p>变形网络 <span class=\"kb-math kb-math-inline\">\\phi_\\theta^{-1}</span> 将物理坐标和几何参数映射到计算坐标：</p>\n<div class=\"kb-math kb-math-display\">\\phi_\\theta^{-1}: (x_1, x_2, a) \\mapsto (\\xi_1, \\xi_2)</div>\n<p>关键设计选择：\n- <strong>残差连接</strong>：<span class=\"kb-math kb-math-inline\">\\xi = f(x, a) + x</span>，使 <span class=\"kb-math kb-math-inline\">\\phi^{-1}</span> 初始化为恒等映射，训练更稳定\n- <strong>正弦位置编码</strong>：使用 <span class=\"kb-math kb-math-inline\">\\sin(2^i x)</span> 特征提升网络对高频几何细节的表达能力\n- <strong>端到端训练</strong>：变形网络与 FNO 主体联合优化，损失函数为相对 L2 误差</p>\n<p><strong>5. 两种使用场景</strong></p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>场景</th>\n<th>坐标映射方式</th>\n<th>是否需要学习</th>\n<th>示例</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>结构化网格</td>\n<td>索引归一化：<span class=\"kb-math kb-math-inline\">\\phi^{-1}: \\mathcal{T}^i[i_1,...,i_d] \\mapsto (i_1/s_1,...,i_d/s_d)</span></td>\n<td>否</td>\n<td>翼型、管道</td>\n</tr>\n<tr>\n<td>点云/非结构网格</td>\n<td>神经网络参数化</td>\n<td>是</td>\n<td>弹性力学</td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>6. Fourier 延拓处理拓扑不规则域</strong></p>\n<p>当物理域拓扑不规则（如含孔洞，不同胚于圆盘或环面）时，不存在到 <span class=\"kb-math kb-math-inline\">D^c</span> 的微分同胚。此时 Geo-FNO 先将域嵌入更大的规则域 <span class=\"kb-math kb-math-inline\">D_a \\hookrightarrow \\bar{D}_a</span>（如将含孔方形补全为完整方形），在 <span class=\"kb-math kb-math-inline\">\\bar{D}_a</span> 上做变换。训练时仅在原域 <span class=\"kb-math kb-math-inline\">D_a</span> 上计算损失，网络隐式学习延拓。</p>\n<p><strong>7. 实验结果</strong></p>\n<p>在弹性力学（点云输入）基准上，Geo-FNO 显著优于其他方法：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>模型</th>\n<th>测试误差</th>\n<th>训练时间/epoch</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><strong>Geo-FNO (learned)</strong></td>\n<td><strong>2.29%</strong></td>\n<td>1s</td>\n</tr>\n<tr>\n<td>Geo-FNO (O-mesh)</td>\n<td>3.63%</td>\n<td>0.5s</td>\n</tr>\n<tr>\n<td>FNO + 插值</td>\n<td>5.08%</td>\n<td>0.5s</td>\n</tr>\n<tr>\n<td>UNet + 插值</td>\n<td>5.31%</td>\n<td>0.9s</td>\n</tr>\n<tr>\n<td>DeepONet</td>\n<td>9.65%</td>\n<td>45s</td>\n</tr>\n<tr>\n<td>GNO</td>\n<td>12.60%</td>\n<td>32s</td>\n</tr>\n</tbody>\n</table></div>\n<p>在翼型和管道流动（结构化网格）上，Geo-FNO 同样优于插值方法（翼型测试误差 1.38% vs FNO+插值 4.21%）。推理速度约 0.01 秒/样本，比数值求解器快 <span class=\"kb-math kb-math-inline\">10^5</span> 倍。</p>\n<div class=\"key-point\">💡 <strong>关键发现</strong>：学习到的变形比手工设计的启发式变形（R-mesh、O-mesh）更优，说明端到端学习坐标变换的有效性。训练后的 Geo-FNO 还可直接用于逆向设计——通过反向传播优化翼型形状参数以最小化阻力、最大化升力。</div>",
      "quiz": {
        "q": "Geo-FNO 中几何傅里叶变换的正向和逆向变换分别需要哪个方向的坐标映射？",
        "options": [
          "正向需要 φ（计算域→物理域），逆向需要 φ^{-1}（物理域→计算域）",
          "正向和逆向都只需要 φ^{-1}（物理域→计算域）",
          "正向和逆向都只需要 φ（计算域→物理域）",
          "正向需要 φ^{-1}，逆向需要 φ，因此必须显式计算两个方向的映射"
        ],
        "answer": 1,
        "explain": "论文的一个关键设计是正向变换 F_a 用 φ^{-1} 将输入函数拉回计算域，逆向变换 F_a^{-1} 用 φ^{-1} 将查询点映射到计算域以评估傅里叶基，因此只需定义 φ^{-1} 一个方向的映射。"
      }
    },
    {
      "id": "uno",
      "num": 30,
      "name": "U-NO",
      "fullName": "U形神经算子 (U-shaped Neural Operator)",
      "year": "2023",
      "org": "布朗大学",
      "parent": "fno",
      "paperUrl": "https://www.nature.com/articles/s41467-024-49411-w",
      "projectUrl": "",
      "category": "pde_solving",
      "motivation": "多尺度结构捕捉全局与局部特征",
      "summary": "U-NO 的核心目标是：多尺度结构捕捉全局与局部特征。",
      "keyPoints": [
        "核心动机：多尺度结构捕捉全局与局部特征",
        "演化来源：继承或改进自 fno",
        "代表机构：布朗大学"
      ],
      "detail": "<p>多尺度结构捕捉全局与局部特征</p>"
    },
    {
      "id": "pysr",
      "num": 31,
      "name": "PySR",
      "fullName": "Python符号回归 (PySR)",
      "year": "2023",
      "org": "Miles Cranmer",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2305.01582",
      "projectUrl": "",
      "category": "physics_discovery",
      "motivation": "进化算法提取物理表达式",
      "summary": "PySR 的核心目标是：进化算法提取物理表达式。",
      "keyPoints": [
        "核心动机：进化算法提取物理表达式",
        "代表机构：Miles Cranmer"
      ],
      "detail": "<p>进化算法提取物理表达式</p>"
    },
    {
      "id": "poseidon",
      "num": 32,
      "name": "Poseidon",
      "fullName": "PDE基础模型 (Poseidon)",
      "year": "2024",
      "org": "ETH Zurich",
      "parent": "fno",
      "paperUrl": "https://arxiv.org/abs/2405.19101",
      "projectUrl": "",
      "category": "pde_solving",
      "motivation": "首个大规模PDE基础模型",
      "summary": "Poseidon 的核心目标是：首个大规模PDE基础模型。",
      "keyPoints": [
        "核心动机：首个大规模PDE基础模型",
        "演化来源：继承或改进自 fno",
        "代表机构：ETH Zurich"
      ],
      "detail": "<p>首个大规模PDE基础模型</p>"
    },
    {
      "id": "walrus",
      "num": 33,
      "name": "Walrus",
      "fullName": "海象基础模型 (Walrus)",
      "year": "2026",
      "org": "Polymathic AI",
      "parent": "poseidon",
      "paperUrl": "https://www.simonsfoundation.org/2025/12/09/polymathic-ai-announces-walrus-and-aion-1-foundation-models-for-science/",
      "projectUrl": "",
      "category": "pde_solving",
      "motivation": "15TB数据训练跨领域物理基础模型",
      "summary": "Walrus 的核心目标是：15TB数据训练跨领域物理基础模型。",
      "keyPoints": [
        "核心动机：15TB数据训练跨领域物理基础模型",
        "演化来源：继承或改进自 poseidon",
        "代表机构：Polymathic AI"
      ],
      "detail": "<p>15TB数据训练跨领域物理基础模型</p>"
    },
    {
      "id": "transolver3",
      "num": 34,
      "name": "Transolver-3",
      "fullName": "超大规模求解器 (Transolver-3)",
      "year": "2026",
      "org": "清华大学/NVIDIA",
      "parent": "fno",
      "paperUrl": "https://arxiv.org/abs/2602.02414",
      "projectUrl": "",
      "category": "pde_solving",
      "motivation": "几何切片技术支持1.6亿单元网格",
      "summary": "Transolver-3 的核心目标是：几何切片技术支持1.6亿单元网格。",
      "keyPoints": [
        "核心动机：几何切片技术支持1.6亿单元网格",
        "演化来源：继承或改进自 fno",
        "代表机构：清华大学/NVIDIA"
      ],
      "detail": "<p>几何切片技术支持1.6亿单元网格</p>"
    },
    {
      "id": "pf_pino",
      "num": 35,
      "name": "PF-PINO",
      "fullName": "相场物理神经算子 (Phase-Field PINO)",
      "year": "2026",
      "org": "arXiv",
      "parent": "fno",
      "paperUrl": "https://arxiv.org/abs/2603.09693",
      "projectUrl": "",
      "category": "pde_solving",
      "motivation": "相场方程残差提升长期稳定性",
      "summary": "PF-PINO 的核心目标是：相场方程残差提升长期稳定性。",
      "keyPoints": [
        "核心动机：相场方程残差提升长期稳定性",
        "演化来源：继承或改进自 fno",
        "代表机构：arXiv"
      ],
      "detail": "<p>相场方程残差提升长期稳定性</p>"
    },
    {
      "id": "pikan",
      "num": 36,
      "name": "PIKAN",
      "fullName": "KAN物理信息网络 (Physics-Informed KAN)",
      "year": "2026",
      "org": "ResearchGate",
      "parent": "pinn",
      "paperUrl": "https://www.researchgate.net/publication/384994434",
      "projectUrl": "",
      "category": "pde_solving",
      "motivation": "KAN替代MLP增强高维处理能力",
      "summary": "PIKAN 的核心目标是：KAN替代MLP增强高维处理能力。",
      "keyPoints": [
        "核心动机：KAN替代MLP增强高维处理能力",
        "演化来源：继承或改进自 pinn",
        "代表机构：ResearchGate"
      ],
      "detail": "<p>KAN替代MLP增强高维处理能力</p>"
    },
    {
      "id": "fedonet",
      "num": 37,
      "name": "FEDONet",
      "fullName": "傅里叶嵌入DeepONet (Fourier-embedded DeepONet)",
      "year": "2026",
      "org": "JCP",
      "parent": "deeponet",
      "paperUrl": "https://www.sciencedirect.com/science/article/pii/S0021999126002846",
      "projectUrl": "",
      "category": "pde_solving",
      "motivation": "嵌入傅里叶特征实现谱精度学习",
      "summary": "FEDONet 的核心目标是：嵌入傅里叶特征实现谱精度学习。",
      "keyPoints": [
        "核心动机：嵌入傅里叶特征实现谱精度学习",
        "演化来源：继承或改进自 deeponet",
        "代表机构：JCP"
      ],
      "detail": "<p>嵌入傅里叶特征实现谱精度学习</p>"
    },
    {
      "id": "fano",
      "num": 38,
      "name": "FANO",
      "fullName": "傅里叶平流算子 (Fourier Advection Neural Operator)",
      "year": "2026",
      "org": "IEEE",
      "parent": "fno",
      "paperUrl": "https://ieeexplore.ieee.org/abstract/document/11358915/",
      "projectUrl": "",
      "category": "fluid_simulation",
      "motivation": "傅里叶平流机制用于天气预报",
      "summary": "FANO 将描述大气输运的平流方程（advection equation）嵌入傅里叶神经算子（FNO）框架，利用 Fourier 谱方法在频域仅需一次 FFT/IFFT 即可高效求解平流过程，并通过守恒量、梯度和散度三类物理约束增强模型的物理一致性，在天气预报任务上超越传统 NWP 模型并媲美最先进的深度学习方法。",
      "keyPoints": [
        "<strong>核心架构</strong>：基于 FNO 框架，将平流方程的求解嵌入 Fourier 层，形成 Fourier Advection Layer",
        "<strong>频域平流求解</strong>：利用 Fourier 谱方法将平流方程 <span class=\"kb-math kb-math-inline\">\\partial u / \\partial t + \\mathbf{v} \\cdot \\nabla u = 0</span> 转化为频域的逐点乘法，仅需单次 FFT + IFFT",
        "<strong>速度场学习</strong>：通过神经网络学习大气速度向量场 <span class=\"kb-math kb-math-inline\">\\mathbf{v}(x,t)</span>，驱动频域平流算子",
        "<strong>三类物理约束</strong>：守恒量约束（conserved quantities）、梯度约束（gradient constraints）、散度约束（divergence constraints）",
        "<strong>数据集</strong>：基于 ERA5 再分析数据，涵盖多个大气变量（含海表温度 SST 等）",
        "<strong>输入序列</strong>：支持可变长度输入序列（input sequence length），捕获时间演化信息",
        "<strong>性能</strong>：超越传统 NWP 模型（如 IFS），与 Pangu-Weather、FourCastNet、GraphCast 等 SOTA 深度学习模型性能相当",
        "<strong>效率</strong>：保持 FNO 的计算效率优势，频域操作为 <span class=\"kb-math kb-math-inline\">O(N \\log N)</span> 复杂度"
      ],
      "detail": "<h5>模型架构总览</h5>\n<p><img alt=\"FANO 架构示意图\" src=\"assets/fano_architecture.png\" />\n<em>图：FANO 模型架构示意。输入大气状态经 Lifting 层映射到高维空间，在 Fourier 域通过 Spectral Advection 算子（基于学习的速度场）进行平流求解，叠加物理约束后经 Projection 层输出预测结果。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># FANO 前向传播伪代码\ndef FANO_forward(x_t, num_layers=N):\n    &quot;&quot;&quot;\n    x_t: 输入大气状态张量 [B, C, H, W]，包含温度、风速、气压等变量\n    &quot;&quot;&quot;\n    # Step 1: Lifting — 将输入映射到高维隐空间\n    h = P(x_t)                          # h: [B, d_model, H, W]\n\n    # Step 2: N 层 Fourier Advection Block\n    for l in range(num_layers):\n        # 2a. 学习速度场 v(x, t)\n        v = VelocityNet_l(h)             # v: [B, 2, H, W] (2D velocity field)\n\n        # 2b. FFT 变换到频域\n        h_hat = FFT2(h)                  # h_hat: [B, d_model, K1, K2] (complex)\n\n        # 2c. 频域平流算子 — 核心创新\n        # 对于波数 k = (k1, k2)，平流方程的谱解为:\n        #   h_hat_new[k] = h_hat[k] * exp(-i * (v · k) * Δt)\n        # 等价于频域的逐点复数乘法\n        phase_shift = compute_advection_phase(v, k_grid, dt)\n        h_hat = h_hat * phase_shift      # point-wise multiplication\n\n        # 2d. IFFT 回到物理域\n        h_new = IFFT2(h_hat)             # h_new: [B, d_model, H, W]\n\n        # 2e. 残差连接 + 非线性激活\n        h = activation(h_new + h)\n\n    # Step 3: Projection — 映射回物理变量空间\n    x_pred = Q(h)                        # x_pred: [B, C, H, W]\n\n    # Step 4: 物理约束损失\n    L_conserve = conservation_loss(x_t, x_pred)   # 守恒量约束\n    L_gradient = gradient_loss(x_pred)              # 梯度平滑约束\n    L_diverge  = divergence_loss(x_pred)            # 散度约束\n    L_total = L_data + λ1*L_conserve + λ2*L_gradient + λ3*L_diverge\n\n    return x_pred, L_total\n</code></pre>\n<h5>动机与背景</h5>\n<p>天气预报是关系国计民生的核心科学问题。传统数值天气预报（NWP）模型通过求解描述大气运动的偏微分方程组（如 Navier-Stokes 方程、热力学方程等）来预测未来天气状态，代表性系统包括 ECMWF 的 IFS（Integrated Forecasting System）。然而，NWP 模型的计算成本极高——全球 0.25° 分辨率的 10 天预报通常需要数千 CPU 核心运行数小时。</p>\n<p>近年来，深度学习方法在天气预报领域取得了突破性进展：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>模型</th>\n<th>机构</th>\n<th>年份</th>\n<th>核心方法</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>FourCastNet</td>\n<td>NVIDIA</td>\n<td>2022</td>\n<td>AFNO (Adaptive Fourier Neural Operator)</td>\n</tr>\n<tr>\n<td>Pangu-Weather</td>\n<td>华为</td>\n<td>2023</td>\n<td>3D Earth-Specific Transformer</td>\n</tr>\n<tr>\n<td>GraphCast</td>\n<td>DeepMind</td>\n<td>2023</td>\n<td>Graph Neural Network on mesh</td>\n</tr>\n<tr>\n<td>FengWu</td>\n<td>上海 AI Lab</td>\n<td>2023</td>\n<td>Multi-modal Transformer</td>\n</tr>\n<tr>\n<td>GenCast</td>\n<td>DeepMind</td>\n<td>2024</td>\n<td>Diffusion model for ensemble</td>\n</tr>\n</tbody>\n</table></div>\n<p>这些模型虽然在推理速度上比 NWP 快数个数量级（秒级 vs 小时级），但普遍存在一个关键缺陷：<strong>缺乏显式的物理约束</strong>。它们本质上是纯数据驱动的黑盒模型，不保证预测结果满足基本的物理定律（如质量守恒、能量守恒），这限制了其在实际业务中的可靠性和可解释性。</p>\n<p>FANO 的核心动机正是弥合这一鸿沟：<strong>如何在保持深度学习计算效率的同时，将物理方程的约束显式嵌入模型架构？</strong></p>\n<h5>核心机制：频域平流求解</h5>\n<p><strong>平流方程</strong>是大气动力学中最基本的 PDE 之一，描述了物理量（如温度、湿度、污染物浓度）被风场输运的过程：</p>\n<div class=\"kb-math kb-math-display\">\\frac{\\partial u}{\\partial t} + \\mathbf{v} \\cdot \\nabla u = 0</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">u(x, y, t)</span> 是被输运的标量场，<span class=\"kb-math kb-math-inline\">\\mathbf{v} = (v_x, v_y)</span> 是速度（风）场。</p>\n<p>FANO 的关键洞察在于：<strong>平流方程在 Fourier 域有优雅的解析解</strong>。对上式做空间 Fourier 变换：</p>\n<div class=\"kb-math kb-math-display\">\\frac{\\partial \\hat{u}_{\\mathbf{k}}}{\\partial t} + i(\\mathbf{v} \\cdot \\mathbf{k}) \\hat{u}_{\\mathbf{k}} = 0</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\hat{u}_{\\mathbf{k}}</span> 是波数 <span class=\"kb-math kb-math-inline\">\\mathbf{k} = (k_x, k_y)</span> 处的 Fourier 系数。对于局部常速度场，其解为：</p>\n<div class=\"kb-math kb-math-display\">\\hat{u}_{\\mathbf{k}}(t + \\Delta t) = \\hat{u}_{\\mathbf{k}}(t) \\cdot \\exp\\left(-i (\\mathbf{v} \\cdot \\mathbf{k}) \\Delta t\\right)</div>\n<div class=\"key-point\">💡 <strong>关键洞察</strong>：平流方程在频域退化为<strong>逐点复数乘法</strong>（point-wise multiplication），这与 FNO 中 Fourier 层的操作形式天然一致！标准 FNO 的 Fourier 层执行 <span class=\"kb-math kb-math-inline\">\\hat{u}_{\\mathbf{k}}&#x27; = R_{\\mathbf{k}} \\cdot \\hat{u}_{\\mathbf{k}}</span>，其中 <span class=\"kb-math kb-math-inline\">R_{\\mathbf{k}}</span> 是可学习的复数权重矩阵。FANO 将 <span class=\"kb-math kb-math-inline\">R_{\\mathbf{k}}</span> 替换为物理驱动的相位旋转因子 <span class=\"kb-math kb-math-inline\">\\exp(-i(\\mathbf{v} \\cdot \\mathbf{k})\\Delta t)</span>，从而将 FNO 的频域操作赋予了明确的物理含义。</div>\n<p>这种设计的计算优势显著：整个平流求解过程仅需<strong>一次 FFT + 频域逐点乘法 + 一次 IFFT</strong>，时间复杂度为 <span class=\"kb-math kb-math-inline\">O(N \\log N)</span>，与标准 FNO 相同，远低于有限差分法的迭代求解。</p>\n<h5>速度场学习</h5>\n<p>与传统 NWP 中速度场由风速观测直接给出不同，FANO 通过一个子网络 <span class=\"kb-math kb-math-inline\">\\text{VelocityNet}(\\cdot)</span> 从当前大气状态中<strong>学习</strong>速度向量场 <span class=\"kb-math kb-math-inline\">\\mathbf{v}(x, y, t)</span>。这使得模型能够：</p>\n<ol>\n<li><strong>自适应捕获有效输运速度</strong>：学到的速度场不仅包含显式风速，还可能编码其他隐式输运机制（如波动传播、对流参数化效应）</li>\n<li><strong>处理多尺度动力学</strong>：不同 Fourier Advection Layer 可以学习不同尺度的速度场，分别捕获大尺度环流和中小尺度扰动</li>\n</ol>\n<h5>物理约束体系</h5>\n<p>FANO 嵌入三类物理约束作为正则化损失：</p>\n<p><strong>1. 守恒量约束（Conservation Loss）</strong></p>\n<p>大气中的总质量、总能量等物理量在封闭系统中应守恒。FANO 通过约束预测场的全局积分来近似实现：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{conserve}} = \\left\\| \\int_{\\Omega} x_{t+\\Delta t} \\, d\\Omega - \\int_{\\Omega} x_t \\, d\\Omega \\right\\|^2</div>\n<p>在离散网格上，这等价于约束预测场与输入场的全局均值一致，对应 Fourier 系数的零频分量 <span class=\"kb-math kb-math-inline\">\\hat{u}_{\\mathbf{0}}</span> 不变。</p>\n<p><strong>2. 梯度约束（Gradient Loss）</strong></p>\n<p>确保预测场的空间梯度合理，避免出现非物理的剧烈跳变：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{gradient}} = \\left\\| \\nabla x_{t+\\Delta t} \\right\\|_{\\text{reg}}</div>\n<p>这有助于保持天气场的空间平滑性，抑制 Gibbs 现象等频域方法的常见伪影。</p>\n<p><strong>3. 散度约束（Divergence Loss）</strong></p>\n<p>对于近似不可压缩的大气流动，速度场应满足连续性方程的约束：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{diverge}} = \\left\\| \\nabla \\cdot \\mathbf{v} \\right\\|^2</div>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：散度约束施加在学习到的速度场上而非预测的大气状态上，确保平流输运过程本身的物理合理性。</div>\n<p>总损失函数为：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L} = \\mathcal{L}_{\\text{data}} + \\lambda_1 \\mathcal{L}_{\\text{conserve}} + \\lambda_2 \\mathcal{L}_{\\text{gradient}} + \\lambda_3 \\mathcal{L}_{\\text{diverge}}</div>\n<h5>与传统方法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>传统 NWP (IFS)</th>\n<th>标准 FNO</th>\n<th>FANO</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>物理方程</td>\n<td>完整 PDE 组</td>\n<td>无显式物理</td>\n<td>平流方程</td>\n</tr>\n<tr>\n<td>求解方式</td>\n<td>有限差分/谱方法迭代</td>\n<td>数据驱动学习</td>\n<td>Fourier 谱方法 (解析)</td>\n</tr>\n<tr>\n<td>计算复杂度</td>\n<td>极高 (小时级)</td>\n<td>低 (秒级)</td>\n<td>低 (秒级)</td>\n</tr>\n<tr>\n<td>物理约束</td>\n<td>内建</td>\n<td>无</td>\n<td>守恒+梯度+散度</td>\n</tr>\n<tr>\n<td>频域操作含义</td>\n<td>—</td>\n<td>可学习滤波器</td>\n<td>物理驱动相位旋转</td>\n</tr>\n<tr>\n<td>可解释性</td>\n<td>高</td>\n<td>低</td>\n<td>中-高</td>\n</tr>\n</tbody>\n</table></div>\n<p>FANO 相比标准 FNO 的核心改进在于：将 Fourier 层中的<strong>任意可学习复数权重</strong>替换为<strong>物理驱动的平流算子</strong>，使频域操作具有明确的物理含义（相位旋转 = 空间平移 = 大气输运），同时通过物理约束损失进一步增强预测的物理一致性。</p>\n<h5>实验设置与结果</h5>\n<p>论文基于 ERA5 再分析数据集进行实验，该数据集由 ECMWF 提供，覆盖全球 0.25° 分辨率的多层大气变量。实验涵盖多个关键气象变量的预测，包括：\n- 位势高度（Geopotential, Z500）\n- 温度（Temperature, T850）\n- 海表温度（Sea Surface Temperature, SST）\n- 风速分量（U/V wind components）</p>\n<p>实验结果表明：\n1. <strong>超越传统 NWP</strong>：在多个变量和预报时效上，FANO 的 RMSE/ACC 指标优于 IFS 等传统模型\n2. <strong>媲美 SOTA DL</strong>：与 Pangu-Weather、FourCastNet 等最先进深度学习模型性能相当\n3. <strong>物理一致性更强</strong>：物理约束有效减少了非物理预测（如质量不守恒、梯度异常）\n4. <strong>计算高效</strong>：保持了 FNO 框架的推理速度优势</p>",
      "quiz": {
        "q": "FANO 将平流方程嵌入 FNO 框架的关键在于，平流方程在 Fourier 域的解具有什么特殊形式？",
        "options": [
          "卷积运算，需要多次迭代求解",
          "逐点复数乘法（相位旋转），可一步求解",
          "矩阵求逆运算，需要特征值分解",
          "非线性激活函数变换，需要反向传播"
        ],
        "answer": 1,
        "explain": "平流方程在 Fourier 域的解为 û_k(t+Δt) = û_k(t)·exp(-i(v·k)Δt)，即逐点复数乘法（相位旋转），这与 FNO 的 Fourier 层操作形式天然一致，仅需单次 FFT+IFFT 即可完成。"
      }
    },
    {
      "id": "physicsnemo",
      "num": 39,
      "name": "PhysicsNeMo",
      "fullName": "物理AI框架 (PhysicsNeMo)",
      "year": "2026",
      "org": "NVIDIA",
      "parent": "—",
      "paperUrl": "https://www.nvidia.com/en-us/ai-data-science/physics-nemo/",
      "projectUrl": "",
      "category": "fluid_simulation",
      "motivation": "开源物理AI产业化仿真框架",
      "summary": "PhysicsNeMo 的核心目标是：开源物理AI产业化仿真框架。",
      "keyPoints": [
        "核心动机：开源物理AI产业化仿真框架",
        "代表机构：NVIDIA"
      ],
      "detail": "<p>开源物理AI产业化仿真框架</p>"
    },
    {
      "id": "simple_pinn",
      "num": 40,
      "name": "SIMPLE-PINN",
      "fullName": "SIMPLE算法PINN (SIMPLE-PINN)",
      "year": "2026",
      "org": "arXiv",
      "parent": "pinn",
      "paperUrl": "https://arxiv.org/abs/2603.24013",
      "projectUrl": "",
      "category": "fluid_simulation",
      "motivation": "SIMPLE算法与PINN融合求解NS方程",
      "summary": "SIMPLE-PINN 的核心目标是：SIMPLE算法与PINN融合求解NS方程。",
      "keyPoints": [
        "核心动机：SIMPLE算法与PINN融合求解NS方程",
        "演化来源：继承或改进自 pinn",
        "代表机构：arXiv"
      ],
      "detail": "<p>SIMPLE算法与PINN融合求解NS方程</p>"
    },
    {
      "id": "fe_pinns",
      "num": 41,
      "name": "FE-PINNs",
      "fullName": "有限元PINN (Finite-Element-based PINNs)",
      "year": "2026",
      "org": "APL Machine Learning",
      "parent": "canns",
      "paperUrl": "https://pubs.aip.org/aip/aml/article/4/1/016106/3379950",
      "projectUrl": "",
      "category": "solid_mechanics",
      "motivation": "有限元基函数实现网格无关建模",
      "summary": "FE-PINNs 的核心目标是：有限元基函数实现网格无关建模。",
      "keyPoints": [
        "核心动机：有限元基函数实现网格无关建模",
        "演化来源：继承或改进自 canns",
        "代表机构：APL Machine Learning"
      ],
      "detail": "<p>有限元基函数实现网格无关建模</p>"
    },
    {
      "id": "aion1",
      "num": 42,
      "name": "AION-1",
      "fullName": "天文基础模型 (AION-1)",
      "year": "2026",
      "org": "Flatiron Institute",
      "parent": "—",
      "paperUrl": "https://www.simonsfoundation.org/2025/12/09/polymathic-ai-announces-walrus-and-aion-1-foundation-models-for-science/",
      "projectUrl": "",
      "category": "physics_constrained",
      "motivation": "31亿参数统一39种观测模态",
      "summary": "AION-1 的核心目标是：31亿参数统一39种观测模态。",
      "keyPoints": [
        "核心动机：31亿参数统一39种观测模态",
        "代表机构：Flatiron Institute"
      ],
      "detail": "<p>31亿参数统一39种观测模态</p>"
    },
    {
      "id": "momentum_gnn",
      "num": 43,
      "name": "Momentum-GNN",
      "fullName": "动量守恒图网络 (Momentum-conserving GNN)",
      "year": "2026",
      "org": "Nature Communications",
      "parent": "egnn",
      "paperUrl": "https://www.nature.com/articles/s41467-025-67802-5",
      "projectUrl": "",
      "category": "physics_constrained",
      "motivation": "严格线性角动量守恒防止能量漂移",
      "summary": "DYNAMI-CAL GraphNet 提出了一种物理约束的等变图神经网络，通过在边局部参考系中解码反对称力与力矩（\\(\\vec{F}_{ij}=-\\vec{F}_{ji}\\), \\(\\vec{A}_{ij}=-\\vec{A}_{ji}\\)），从架构层面严格保证线性动量和角动量守恒，解决了现有等变 GNN（如 EGNN、GMN）因消息不对称导致的动量漂移问题，并在颗粒碰撞、N 体动力学、人体运动、蛋白质分子动力学等六类任务上展现了卓越的长程稳定性与外推能力。",
      "keyPoints": [
        "<strong>边局部参考系</strong>：为每条边 <span class=\"kb-math kb-math-inline\">ij</span> 构建三个正交基向量 <span class=\"kb-math kb-math-inline\">\\vec{a}_{ij}, \\vec{b}_{ij}, \\vec{c}_{ij}</span>，满足 SO(3) 等变、T(3) 不变、节点交换反对称",
        "<strong>反对称力解码</strong>：力 <span class=\"kb-math kb-math-inline\">\\vec{F}_{ij} = \\sum_k \\psi_{e_f}(\\boldsymbol{\\epsilon}&#x27;_{ij})[k] \\cdot \\text{basis}_k</span>，由于基向量反对称，自动满足牛顿第三定律 <span class=\"kb-math kb-math-inline\">\\vec{F}_{ij} = -\\vec{F}_{ji}</span>，严格保守线性动量",
        "<strong>反对称力矩解码</strong>：角动量交互向量 <span class=\"kb-math kb-math-inline\">\\vec{A}_{ij} = -\\vec{A}_{ji}</span>，通过分离轨道分量得到自旋力矩，严格保守总角动量（轨道 + 自旋）",
        "<strong>时空消息传递</strong>：边嵌入通过 skip 连接跨时间步传递记忆，结合隐式 Euler 积分实现时空一致性",
        "<strong>Ghost 节点边界建模</strong>：通过反射生成 ghost 节点处理无网格边界，无需重新训练即可适配不同几何形状",
        "<strong>六类基准验证</strong>：颗粒 6-DoF 碰撞、动量守恒测试、旋转 hopper 外推（60→2073 球、平面→曲面）、约束 N 体、人体运动预测、蛋白质分子动力学"
      ],
      "detail": "<h5>核心架构示意图</h5>\n<div class=\"img-wrap\"><img src=\"https://media.springernature.com/full/springer-static/image/art%3A10.1038%2Fs41467-025-67802-5/MediaObjects/41467_2025_67802_Fig1_HTML.png\" alt=\"DYNAMI-CAL GraphNet 架构总览\" loading=\"lazy\"><p class=\"img-caption\">▲ DYNAMI-CAL GraphNet 架构总览</p></div>\n<p><em>图：DYNAMI-CAL GraphNet 的完整流程——从图构建、边局部参考系、反对称力/力矩解码到节点状态更新。核心创新在于边消息的物理约束设计，确保牛顿第三定律在架构层面被严格满足。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># DYNAMI-CAL GraphNet 单步前向传播\ndef forward(graph_t, edge_memory_prev):\n    # === 1. 编码 ===\n    h_i = φ_node(node_features_i)          # 节点标量嵌入\n\n    # === 2. 边局部参考系构建 ===\n    for edge (i, j) in graph:\n        d_ij = r_j - r_i                    # 位移向量\n        v_ij = v_j - v_i                    # 相对速度\n        a_ij = d_ij / ||d_ij||              # 第一基向量（沿连线）\n        c_ij = d_ij × v_ij                  # 第三基向量（叉积）\n        c_ij = c_ij / ||c_ij||\n        b_ij = c_ij × a_ij                  # 第二基向量（右手系）\n        # 关键性质: a_ij = -a_ji, b_ij = -b_ji, c_ij = -c_ji\n\n    # === 3. 边嵌入 + 时空消息传递 ===\n    for edge (i, j):\n        inv_features = [||d_ij||, d_ij·v_ij, ...]  # 不变量特征\n        ε_ij = φ_edge(h_i, h_j, inv_features)\n        ε_ij = ε_ij + skip_connection(edge_memory_prev[i,j])  # 时间记忆\n        ε'_ij = MLP_interaction(ε_ij)       # 交互嵌入\n\n    # === 4. 反对称力解码（线性动量守恒）===\n    for edge (i, j):\n        coeffs_f = ψ_ef(ε'_ij)              # 3个标量系数\n        F_ij = coeffs_f[0]*a_ij + coeffs_f[1]*b_ij + coeffs_f[2]*c_ij\n        # 自动满足 F_ij = -F_ji（因基向量反对称）\n\n    # === 5. 反对称力矩解码（角动量守恒）===\n    for edge (i, j):\n        coeffs_a = ψ_ea(ε'_ij)              # 3个标量系数\n        A_ij = coeffs_a[0]*a_ij + coeffs_a[1]*b_ij + coeffs_a[2]*c_ij\n        # A_ij = -A_ji（总角动量交互反对称）\n\n        # 对称参考点\n        w_i, w_j = ψ_n1(h_i), ψ_n1(h_j)\n        r0_ij = (w_i * r_i + w_j * r_j) / (w_i + w_j)  # r0_ij = r0_ji\n\n        # 分离自旋力矩\n        λ_ij = ψ_el(ε'_ij)                  # 稳定性标量\n        M_ij = A_ij - (r_j - r0_ij) × F_ij * λ_ij  # I_j·Δω_j\n\n    # === 6. 聚合 + 节点更新 ===\n    for node i:\n        ΔF_total = Σ_j F_ij                 # 合力\n        ΔM_total = Σ_j M_ij                 # 合力矩\n        Δv_i = ψ_n2(h_i) * ΔF_total         # 1/m_i · ΣF\n        Δω_i = ψ_n3(h_i) * ΔM_total         # 1/I_i · ΣM\n        Δv_ext = ψ_n4(h_i)                  # 外力（如重力）\n\n        v_new = v_i + Δv_i + Δv_ext\n        ω_new = ω_i + Δω_i\n        x_new = x_i + (v_i + v_new)/2 * Δt  # 梯形积分\n\n    return graph_t+1, edge_memory_current\n</code></pre>\n<h5>方法深入解析</h5>\n<p><strong>1. 动机与背景：等变 GNN 的动量漂移问题</strong></p>\n<p>现有等变 GNN（如 EGNN、GMN、ClofNet）虽然保证了 SE(3) 等变性，但<strong>不保证动量守恒</strong>。根本原因在于：这些模型的边消息 <span class=\"kb-math kb-math-inline\">m_{ij} \\neq m_{ji}</span>（或虽然力等变但不反对称），导致节点 <span class=\"kb-math kb-math-inline\">i</span> 对 <span class=\"kb-math kb-math-inline\">j</span> 施加的\"力\"与 <span class=\"kb-math kb-math-inline\">j</span> 对 <span class=\"kb-math kb-math-inline\">i</span> 的\"力\"不满足牛顿第三定律。在长程自回归推理中，这种微小的不对称性会累积，造成系统总动量漂移，最终导致物理不一致甚至轨迹发散。</p>\n<div class=\"key-point\">💡 <strong>关键洞察</strong>：等变性（输出随输入旋转而旋转）≠ 守恒性（系统总量不变）。DYNAMI-CAL GraphNet 的核心贡献是<strong>在保持等变性的同时，从架构层面强制守恒</strong>。</div>\n<p><strong>2. 核心机制一：边局部参考系</strong></p>\n<p>对每条边 <span class=\"kb-math kb-math-inline\">ij</span>，利用位移向量 <span class=\"kb-math kb-math-inline\">\\vec{d}_{ij} = \\vec{r}_j - \\vec{r}_i</span> 和相对速度 <span class=\"kb-math kb-math-inline\">\\vec{v}_{ij} = \\vec{v}_j - \\vec{v}_i</span> 构建正交基：</p>\n<div class=\"kb-math kb-math-display\">\\vec{a}_{ij} = \\frac{\\vec{d}_{ij}}{\\|\\vec{d}_{ij}\\|}, \\quad \\vec{c}_{ij} = \\frac{\\vec{d}_{ij} \\times \\vec{v}_{ij}}{\\|\\vec{d}_{ij} \\times \\vec{v}_{ij}\\|}, \\quad \\vec{b}_{ij} = \\vec{c}_{ij} \\times \\vec{a}_{ij}</div>\n<p>这组基向量具有三个关键性质：\n- <strong>SO(3) 等变</strong>：全局旋转 <span class=\"kb-math kb-math-inline\">R</span> 作用时，<span class=\"kb-math kb-math-inline\">\\vec{a}_{ij} \\to R\\vec{a}_{ij}</span>\n- <strong>T(3) 不变</strong>：平移不改变相对位移和相对速度\n- <strong>节点交换反对称</strong>：<span class=\"kb-math kb-math-inline\">\\vec{a}_{ij} = -\\vec{a}_{ji}</span>，<span class=\"kb-math kb-math-inline\">\\vec{b}_{ij} = -\\vec{b}_{ji}</span>，<span class=\"kb-math kb-math-inline\">\\vec{c}_{ij} = -\\vec{c}_{ji}</span></p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：反对称性是守恒的关键——当 <span class=\"kb-math kb-math-inline\">\\vec{d}_{ij}</span> 变为 <span class=\"kb-math kb-math-inline\">\\vec{d}_{ji} = -\\vec{d}_{ij}</span> 时，叉积 <span class=\"kb-math kb-math-inline\">\\vec{d}_{ji} \\times \\vec{v}_{ji} = (-\\vec{d}_{ij}) \\times (-\\vec{v}_{ij}) = \\vec{d}_{ij} \\times \\vec{v}_{ij}</span>，但归一化后 <span class=\"kb-math kb-math-inline\">\\vec{a}_{ji} = -\\vec{a}_{ij}</span>，进而 <span class=\"kb-math kb-math-inline\">\\vec{b}_{ji} = \\vec{c}_{ji} \\times \\vec{a}_{ji} = (-\\vec{c}_{ij}) \\times (-\\vec{a}_{ij}) = ... = -\\vec{b}_{ij}</span>。</div>\n<p><strong>3. 核心机制二：反对称力与线性动量守恒</strong></p>\n<p>力通过不变标量系数调制反对称基向量来解码：</p>\n<div class=\"kb-math kb-math-display\">\\vec{F}_{ij} = \\psi_{e_f}(\\boldsymbol{\\epsilon}&#x27;_{ij})[0] \\cdot \\vec{a}_{ij} + \\psi_{e_f}(\\boldsymbol{\\epsilon}&#x27;_{ij})[1] \\cdot \\vec{b}_{ij} + \\psi_{e_f}(\\boldsymbol{\\epsilon}&#x27;_{ij})[2] \\cdot \\vec{c}_{ij}</div>\n<p>由于边嵌入 <span class=\"kb-math kb-math-inline\">\\boldsymbol{\\epsilon}&#x27;_{ij}</span> 仅依赖不变量（距离、内积等），对称边 <span class=\"kb-math kb-math-inline\">ij</span> 和 <span class=\"kb-math kb-math-inline\">ji</span> 产生相同的标量系数，但基向量反号，因此：</p>\n<div class=\"kb-math kb-math-display\">\\vec{F}_{ij} = -\\vec{F}_{ji} \\quad \\Longrightarrow \\quad \\sum_{i} \\Delta \\vec{p}_i = \\sum_{i} \\sum_{j \\in \\mathcal{N}(i)} \\vec{F}_{ij} = 0</div>\n<p>这就是牛顿第三定律的架构级实现，<strong>无需任何正则化或后处理</strong>即可严格保证线性动量守恒。</p>\n<p><strong>4. 核心机制三：角动量守恒的力矩解码</strong></p>\n<p>角动量守恒更为复杂，因为总角动量 = 轨道角动量 + 自旋角动量。论文定义边 <span class=\"kb-math kb-math-inline\">ij</span> 的总角动量交互向量：</p>\n<div class=\"kb-math kb-math-display\">\\vec{A}_{ij} = I_i(\\vec{\\omega}_i^{t+\\Delta t} - \\vec{\\omega}_i^t) + (\\vec{r}_i - \\vec{r}_0) \\times m_i(\\vec{v}_i^{t+\\Delta t} - \\vec{v}_i^t)</div>\n<p>同样通过反对称基向量解码，确保 <span class=\"kb-math kb-math-inline\">\\vec{A}_{ij} = -\\vec{A}_{ji}</span>。然后通过对称参考点 <span class=\"kb-math kb-math-inline\">\\vec{r}_{0_{ij}}</span> 分离自旋分量：</p>\n<div class=\"kb-math kb-math-display\">I_j \\cdot \\Delta\\vec{\\omega}_j = \\vec{A}_{ij} - (\\vec{r}_j - \\vec{r}_{0_{ij}}) \\times \\vec{F}_{ij} \\cdot \\lambda_{ij}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\vec{r}_{0_{ij}} = \\frac{\\psi_{n1}(h_i) \\cdot \\vec{r}_i + \\psi_{n1}(h_j) \\cdot \\vec{r}_j}{\\psi_{n1}(h_i) + \\psi_{n1}(h_j)}</span> 在节点交换下保持不变（<span class=\"kb-math kb-math-inline\">\\vec{r}_{0_{ij}} = \\vec{r}_{0_{ji}}</span>），<span class=\"kb-math kb-math-inline\">\\lambda_{ij}</span> 是稳定性标量，防止微小噪声力产生不合理的大力矩。</p>\n<p><strong>5. 时空消息传递与边记忆</strong></p>\n<p>传统 GNN 每步独立处理图，丢失了时间连贯性。DYNAMI-CAL GraphNet 通过 <strong>skip 连接</strong>将上一时间步的边嵌入传递到当前步：</p>\n<div class=\"kb-math kb-math-display\">\\boldsymbol{\\epsilon}_{ij}^{(t)} = \\phi_{\\text{edge}}(\\text{features}_{ij}^{(t)}) + W_{\\text{skip}} \\cdot \\boldsymbol{\\epsilon}_{ij}^{(t-1)}</div>\n<p>这使得模型能够捕捉碰撞前后的时间相关性，类似于 RNN 的隐状态但作用在边上。配合隐式 Euler 积分（使用更新后的速度计算位移），提高了数值稳定性。</p>\n<p><strong>6. Ghost 节点：无网格边界处理</strong></p>\n<p>对于边界（如墙壁），论文提出将每个靠近边界的粒子关于边界面反射，生成 ghost 节点。Ghost 节点继承边界属性（如零速度、边界标识符），与原始粒子之间建立边连接。这种方法：\n- 无需显式编码边界几何\n- 可推广到任意形状（平面、曲面）\n- 训练时用平面墙，测试时可直接迁移到旋转圆柱 hopper</p>\n<p><strong>7. 与 EGNN/GMN 的关键区别</strong></p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>EGNN</th>\n<th>GMN</th>\n<th>DYNAMI-CAL GraphNet</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>等变性</td>\n<td>E(n)</td>\n<td>E(n)</td>\n<td>SE(3)</td>\n</tr>\n<tr>\n<td>消息对称性</td>\n<td><span class=\"kb-math kb-math-inline\">m_{ij} \\neq m_{ji}</span></td>\n<td><span class=\"kb-math kb-math-inline\">m_{ij} \\neq m_{ji}</span></td>\n<td><span class=\"kb-math kb-math-inline\">\\vec{F}_{ij} = -\\vec{F}_{ji}</span></td>\n</tr>\n<tr>\n<td>线性动量守恒</td>\n<td>✗</td>\n<td>✗</td>\n<td>✓（严格）</td>\n</tr>\n<tr>\n<td>角动量守恒</td>\n<td>✗</td>\n<td>✗</td>\n<td>✓（严格）</td>\n</tr>\n<tr>\n<td>旋转动力学</td>\n<td>不支持</td>\n<td>不支持</td>\n<td>6-DoF（平动+转动）</td>\n</tr>\n<tr>\n<td>时间记忆</td>\n<td>无</td>\n<td>无</td>\n<td>边 skip 连接</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 <strong>为什么 EGNN 不守恒？</strong> EGNN 的位置更新 <span class=\"kb-math kb-math-inline\">\\vec{x}_i&#x27; = \\vec{x}_i + \\sum_j (\\vec{x}_i - \\vec{x}_j) \\phi(m_{ij})</span> 中，<span class=\"kb-math kb-math-inline\">\\phi(m_{ij})</span> 是标量但 <span class=\"kb-math kb-math-inline\">m_{ij} \\neq m_{ji}</span>（因为消息聚合依赖节点特征），所以 <span class=\"kb-math kb-math-inline\">i</span> 对 <span class=\"kb-math kb-math-inline\">j</span> 的\"推力\"与 <span class=\"kb-math kb-math-inline\">j</span> 对 <span class=\"kb-math kb-math-inline\">i</span> 的不等，总动量不守恒。</div>\n<p><strong>8. 实验亮点</strong></p>\n<ul>\n<li><strong>旋转 hopper 外推</strong>：仅用 60 球 + 平面墙训练，成功预测 2073 球 + 旋转曲面墙的 16000 步演化，GNS 在早期即发散</li>\n<li><strong>动量守恒验证</strong>：两球斜碰实验中，DYNAMI-CAL GraphNet 精确保守所有分量的线性和角动量，GNS 和 EGNN 均出现明显漂移</li>\n<li><strong>蛋白质 MD</strong>：在 NPT 系综（300K, 1 bar）条件下准确预测蛋白质构象动力学</li>\n</ul>",
      "quiz": {
        "q": "DYNAMI-CAL GraphNet 如何从架构层面保证牛顿第三定律 F_ij = -F_ji？",
        "options": [
          "在损失函数中添加 ||F_ij + F_ji||² 正则化项",
          "使用节点交换反对称的边局部基向量，乘以对称的标量系数来解码力",
          "对每条边的消息取平均值 (m_ij + m_ji)/2 作为对称消息",
          "在后处理阶段将力投影到反对称子空间"
        ],
        "answer": 1,
        "explain": "DYNAMI-CAL GraphNet 构建的边局部参考系基向量满足 a_ij=-a_ji, b_ij=-b_ji, c_ij=-c_ji，而标量系数由不变量嵌入产生（ij 和 ji 相同），因此力 F_ij = Σ coeff_k · basis_k 自动满足 F_ij = -F_ji，无需正则化或后处理。"
      }
    }
  ],
  "categories": {
    "pde_solving": {
      "label": "偏微分方程求解",
      "color": "#3B82F6"
    },
    "fluid_simulation": {
      "label": "流体仿真",
      "color": "#10B981"
    },
    "solid_mechanics": {
      "label": "固体力学",
      "color": "#F59E0B"
    },
    "physics_discovery": {
      "label": "理论物理发现",
      "color": "#8B5CF6"
    },
    "physics_constrained": {
      "label": "物理约束学习",
      "color": "#EC4899"
    },
    "quantum_particle": {
      "label": "量子与粒子物理",
      "color": "#6366F1"
    }
  },
  "projectUrls": {}
};
