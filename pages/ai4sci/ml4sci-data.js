/**
 * ml4sci-data.js — 由 pipeline/build.py 于 2026-05-20 17:34:36 自动生成。
 * 源文件：content/ai4sci/ml4sci.md
 * ⚠️  请勿手动修改；如需更新，修改源文档后重新编译。
 */
window.PAGE_CONFIG = {
  "meta": {
    "domain": "ai4sci",
    "topic_id": "ml4sci",
    "topic_name": "科学机器学习技术演进",
    "page_title": "科学机器学习技术演进",
    "page_subtitle": "2026-05-20 版",
    "page_desc": "从物理信息神经网络（PINN）到神经算子、可微分仿真与科学计算加速的技术发展脉络",
    "page_icon": "⚛️",
    "hero_pills": [
      "🏷️ PINN · Neural Operators · Differentiable Physics · AI4Science"
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
        "id": "pinn",
        "x": 100,
        "y": 150,
        "category": "pinn_family"
      },
      {
        "id": "hp_vpinns",
        "x": 250,
        "y": 120,
        "category": "pinn_family"
      },
      {
        "id": "cpinn",
        "x": 200,
        "y": 150,
        "category": "pinn_family"
      },
      {
        "id": "xpinns",
        "x": 300,
        "y": 150,
        "category": "pinn_family"
      },
      {
        "id": "gpinn",
        "x": 350,
        "y": 120,
        "category": "pinn_family"
      },
      {
        "id": "sa_pinn",
        "x": 200,
        "y": 180,
        "category": "pinn_family"
      },
      {
        "id": "lb_pinn",
        "x": 300,
        "y": 180,
        "category": "pinn_family"
      },
      {
        "id": "relobralo",
        "x": 400,
        "y": 180,
        "category": "pinn_family"
      },
      {
        "id": "frozen_pinn",
        "x": 500,
        "y": 120,
        "category": "pinn_family"
      },
      {
        "id": "pikans",
        "x": 500,
        "y": 150,
        "category": "pinn_family"
      },
      {
        "id": "scale_pinn",
        "x": 500,
        "y": 180,
        "category": "pinn_family"
      },
      {
        "id": "asr_pinn",
        "x": 550,
        "y": 120,
        "category": "pinn_family"
      },
      {
        "id": "ms_pinn",
        "x": 550,
        "y": 150,
        "category": "pinn_family"
      },
      {
        "id": "dc_pinns",
        "x": 550,
        "y": 180,
        "category": "pinn_family"
      },
      {
        "id": "simple_pinn",
        "x": 600,
        "y": 150,
        "category": "pinn_family"
      },
      {
        "id": "deeponet",
        "x": 100,
        "y": 350,
        "category": "operators"
      },
      {
        "id": "fno",
        "x": 100,
        "y": 300,
        "category": "operators"
      },
      {
        "id": "gno",
        "x": 80,
        "y": 380,
        "category": "operators"
      },
      {
        "id": "geo_fno",
        "x": 250,
        "y": 280,
        "category": "operators"
      },
      {
        "id": "f_fno",
        "x": 250,
        "y": 310,
        "category": "operators"
      },
      {
        "id": "u_fno",
        "x": 250,
        "y": 340,
        "category": "operators"
      },
      {
        "id": "pino",
        "x": 200,
        "y": 300,
        "category": "operators"
      },
      {
        "id": "lno",
        "x": 300,
        "y": 310,
        "category": "operators"
      },
      {
        "id": "gino",
        "x": 350,
        "y": 280,
        "category": "operators"
      },
      {
        "id": "moe_pot",
        "x": 450,
        "y": 310,
        "category": "operators"
      },
      {
        "id": "poseidon",
        "x": 500,
        "y": 300,
        "category": "operators"
      },
      {
        "id": "gaot",
        "x": 500,
        "y": 280,
        "category": "operators"
      },
      {
        "id": "ginot",
        "x": 550,
        "y": 280,
        "category": "operators"
      },
      {
        "id": "s_not",
        "x": 550,
        "y": 310,
        "category": "operators"
      },
      {
        "id": "fedonet",
        "x": 500,
        "y": 350,
        "category": "operators"
      },
      {
        "id": "pi_latent_no",
        "x": 400,
        "y": 300,
        "category": "operators"
      },
      {
        "id": "difftaichi",
        "x": 100,
        "y": 550,
        "category": "diff_sim"
      },
      {
        "id": "jax_md",
        "x": 100,
        "y": 500,
        "category": "diff_sim"
      },
      {
        "id": "nvidia_warp",
        "x": 250,
        "y": 550,
        "category": "diff_sim"
      },
      {
        "id": "pac_nerf",
        "x": 300,
        "y": 550,
        "category": "diff_sim"
      },
      {
        "id": "pie_nerf",
        "x": 400,
        "y": 550,
        "category": "diff_sim"
      },
      {
        "id": "jax_mpm",
        "x": 500,
        "y": 500,
        "category": "diff_sim"
      },
      {
        "id": "moto",
        "x": 600,
        "y": 480,
        "category": "diff_sim"
      },
      {
        "id": "as_diffmpm",
        "x": 600,
        "y": 520,
        "category": "diff_sim"
      },
      {
        "id": "pod_dl_rom",
        "x": 100,
        "y": 750,
        "category": "acceleration"
      },
      {
        "id": "deepxde",
        "x": 100,
        "y": 700,
        "category": "acceleration"
      },
      {
        "id": "neuralpde_jl",
        "x": 250,
        "y": 700,
        "category": "acceleration"
      },
      {
        "id": "modulus",
        "x": 100,
        "y": 800,
        "category": "acceleration"
      },
      {
        "id": "physicsnemo_v2",
        "x": 500,
        "y": 800,
        "category": "acceleration"
      },
      {
        "id": "pde_fm",
        "x": 500,
        "y": 750,
        "category": "acceleration"
      },
      {
        "id": "scasml",
        "x": 500,
        "y": 700,
        "category": "acceleration"
      },
      {
        "id": "mollifier_layers",
        "x": 550,
        "y": 700,
        "category": "acceleration"
      }
    ],
    "edges": [
      {
        "from": "pinn",
        "to": "hp_vpinns",
        "label": "变分法"
      },
      {
        "from": "pinn",
        "to": "cpinn",
        "label": "域分解"
      },
      {
        "from": "cpinn",
        "to": "xpinns",
        "label": "广义域分解"
      },
      {
        "from": "pinn",
        "to": "gpinn",
        "label": "梯度增强"
      },
      {
        "from": "pinn",
        "to": "sa_pinn",
        "label": "自适应权重"
      },
      {
        "from": "sa_pinn",
        "to": "lb_pinn",
        "label": "似然平衡"
      },
      {
        "from": "lb_pinn",
        "to": "relobralo",
        "label": "动态平衡"
      },
      {
        "from": "pinn",
        "to": "frozen_pinn",
        "label": "无梯度训练"
      },
      {
        "from": "pinn",
        "to": "pikans",
        "label": "KAN架构"
      },
      {
        "from": "pinn",
        "to": "dc_pinns",
        "label": "硬约束"
      },
      {
        "from": "fno",
        "to": "geo_fno",
        "label": "几何感知"
      },
      {
        "from": "fno",
        "to": "f_fno",
        "label": "维度分解"
      },
      {
        "from": "fno",
        "to": "u_fno",
        "label": "多尺度"
      },
      {
        "from": "fno",
        "to": "pino",
        "label": "物理约束"
      },
      {
        "from": "fno",
        "to": "lno",
        "label": "拉普拉斯"
      },
      {
        "from": "geo_fno",
        "to": "gino",
        "label": "GNN融合"
      },
      {
        "from": "gino",
        "to": "gaot",
        "label": "Transformer"
      },
      {
        "from": "gino",
        "to": "ginot",
        "label": "Transformer"
      },
      {
        "from": "fno",
        "to": "moe_pot",
        "label": "MoE扩展"
      },
      {
        "from": "fno",
        "to": "poseidon",
        "label": "基础模型"
      },
      {
        "from": "fno",
        "to": "s_not",
        "label": "时序建模"
      },
      {
        "from": "deeponet",
        "to": "fedonet",
        "label": "傅里叶嵌入"
      },
      {
        "from": "pino",
        "to": "pi_latent_no",
        "label": "潜空间"
      },
      {
        "from": "difftaichi",
        "to": "nvidia_warp",
        "label": "CUDA加速"
      },
      {
        "from": "difftaichi",
        "to": "pac_nerf",
        "label": "NeRF融合"
      },
      {
        "from": "pac_nerf",
        "to": "pie_nerf",
        "label": "弹性动力学"
      },
      {
        "from": "jax_md",
        "to": "jax_mpm",
        "label": "MPM扩展"
      },
      {
        "from": "jax_mpm",
        "to": "moto",
        "label": "拓扑优化"
      },
      {
        "from": "jax_mpm",
        "to": "as_diffmpm",
        "label": "碰撞处理"
      },
      {
        "from": "deepxde",
        "to": "neuralpde_jl",
        "label": "Julia重构"
      },
      {
        "from": "modulus",
        "to": "physicsnemo_v2",
        "label": "模块化"
      },
      {
        "from": "fno",
        "to": "pde_fm",
        "label": "Mamba骨干"
      },
      {
        "from": "pinn",
        "to": "scasml",
        "label": "误差修正"
      },
      {
        "from": "pinn",
        "to": "mollifier_layers",
        "label": "噪声处理"
      }
    ],
    "milestones": [
      {
        "id": "pinn",
        "label": "开创物理信息学习范式"
      },
      {
        "id": "fno",
        "label": "神经算子学习里程碑"
      },
      {
        "id": "poseidon",
        "label": "PDE基础模型标杆"
      }
    ]
  },
  "algos": [
    {
      "id": "pinn",
      "num": 1,
      "name": "PINN",
      "fullName": "物理信息神经网络 (Physics-Informed Neural Networks)",
      "year": "2019",
      "org": "布朗大学",
      "parent": "—",
      "paperUrl": "https://doi.org/10.1016/j.jcp.2018.10.045",
      "projectUrl": "",
      "category": "pinn_family",
      "motivation": "利用自动微分将PDE残差嵌入损失函数",
      "summary": "PINN 提出将偏微分方程（PDE）残差通过自动微分嵌入神经网络损失函数，使网络在仅有少量标注数据的情况下即可求解正问题与反问题，开创了物理信息深度学习范式。",
      "keyPoints": [
        "<strong>通用 PDE 框架</strong>：将 PDE 统一表示为 \\(u_t + \\mathcal{N}[u] = 0\\)，适用于任意非线性偏微分方程",
        "<strong>物理残差损失</strong>：定义 \\(f := u_t + \\mathcal{N}[u]\\)，通过自动微分精确计算，将 PDE 残差作为损失项 \\(\\text{MSE}_f\\) 约束网络",
        "<strong>两种时间处理方案</strong>：连续时间模型（直接以 \\((t,x)\\) 为输入）与离散时间模型（将隐式 Runge-Kutta 嵌入网络结构）",
        "<strong>数据高效</strong>：Burgers 方程仅需 100 个标注点 + 10000 个配点即可达到 \\(6.7 \\times 10^{-4}\\) 的 \\(\\mathcal{L}_2\\) 相对误差",
        "<strong>离散时间大步推进</strong>：利用 500 阶隐式 Runge-Kutta 方案，理论时间误差 \\(\\mathcal{O}(\\Delta t^{1000}) \\approx 10^{-97}\\)，单步即可跨越整个时间域",
        "<strong>正/反问题统一</strong>：同一框架可用于求解 PDE（正问题）和识别未知参数（反问题）",
        "<strong>四个基准验证</strong>：Burgers 方程、Schrödinger 方程、Allen-Cahn 方程、KdV 方程"
      ],
      "detail": "<h5>核心架构示意</h5>\n<p><img alt=\"PINN 连续时间模型示意图\" src=\"https://ar5iv.labs.arxiv.org/html/1711.10561/assets/x1.png\" />\n<em>图：连续时间 PINN 架构。左侧神经网络以 \\((t, x)\\) 为输入，输出 \\(u(t,x)\\)；右侧通过自动微分构造物理残差 \\(f = u_t + \\mathcal{N}[u]\\)，两者共享参数。</em></p>\n<p><img alt=\"PINN 离散时间模型示意图\" src=\"https://ar5iv.labs.arxiv.org/html/1711.10561/assets/x4.png\" />\n<em>图：离散时间 PINN 架构。多输出神经网络预测 Runge-Kutta 各阶段的解 \\([u^{n+c_1}, \\ldots, u^{n+c_q}, u^{n+1}]\\)，通过 RK 公式构造物理约束。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># PINN 连续时间模型训练伪代码\n# 输入: 标注数据 {t_u, x_u, u}, 配点 {t_f, x_f}, PDE算子 N\n# 输出: 训练好的网络 u_θ(t, x)\n\ndef physics_informed_nn(t, x, theta):\n    u = neural_network(t, x, theta)          # 前向传播\n    u_t = auto_diff(u, t)                     # 自动微分求 ∂u/∂t\n    u_x = auto_diff(u, x)                     # 自动微分求 ∂u/∂x\n    u_xx = auto_diff(u_x, x)                  # 自动微分求 ∂²u/∂x²\n    f = u_t + N(u, u_x, u_xx)                 # PDE 残差\n    return u, f\n\n# 损失函数\nMSE_u = mean(|u_pred - u_data|²)              # 数据拟合项\nMSE_f = mean(|f_pred|²)                        # 物理残差项 (配点处)\nloss = MSE_u + MSE_f\n\n# 优化: L-BFGS (拟牛顿法, 全批量)\noptimizer = L_BFGS(theta)\nfor iteration in range(max_iter):\n    u_pred, f_pred = physics_informed_nn(t, x, theta)\n    loss = MSE_u + MSE_f\n    optimizer.step(loss)\n</code></pre>\n<h5>动机与背景</h5>\n<p>传统 PDE 数值方法（有限元、有限差分、谱方法）依赖精细的网格剖分，在高维问题中面临\"维度灾难\"，且对复杂几何和多物理场耦合的适应性有限。另一方面，纯数据驱动的深度学习方法虽然灵活，但需要海量标注数据，且无法保证物理一致性。PINN 的核心思想是：<strong>将已知的物理定律（PDE）作为正则化项嵌入神经网络的训练过程</strong>，从而在数据稀疏的情况下仍能获得物理上合理的解。</p>\n<h5>核心机制：连续时间模型</h5>\n<p>PINN 的出发点是一般形式的参数化非线性 PDE：</p>\n<p>$$u_t + \\mathcal{N}[u; \\lambda] = 0, \\quad x \\in \\Omega, \\quad t \\in [0, T]$$</p>\n<p>其中 \\(u(t, x)\\) 是待求解的隐变量，\\(\\mathcal{N}[\\cdot; \\lambda]\\) 是由参数 \\(\\lambda\\) 参数化的非线性微分算子。</p>\n<p><strong>关键设计</strong>：定义物理残差函数</p>\n<p>$$f := u_t + \\mathcal{N}[u; \\lambda]$$</p>\n<p>用一个深度神经网络 \\(u_\\theta(t, x)\\) 近似解 \\(u(t, x)\\)，然后通过<strong>自动微分</strong>（而非数值差分）精确计算 \\(f_\\theta(t, x)\\)。由于自动微分利用计算图的链式法则，其精度达到机器精度级别，且不引入离散化误差。</p>\n<div class=\"key-point\">💡 <strong>关键</strong>：\\(f\\) 和 \\(u\\) 共享同一组网络参数 \\(\\theta\\)，因此 \\(f\\) 本身也是一个\"神经网络\"——只不过它的结构由 PDE 的形式决定，而非人工设计。</div>\n<p>损失函数由两部分组成：</p>\n<p>$$\\text{MSE} = \\text{MSE}_u + \\text{MSE}_f$$</p>\n<p>$$\\text{MSE}_u = \\frac{1}{N_u} \\sum_{i=1}^{N_u} |u(t_u^i, x_u^i) - u^i|^2$$</p>\n<p>$$\\text{MSE}_f = \\frac{1}{N_f} \\sum_{i=1}^{N_f} |f(t_f^i, x_f^i)|^2$$</p>\n<p>其中 \\(\\{t_u^i, x_u^i, u^i\\}_{i=1}^{N_u}\\) 是初始/边界条件的标注数据，\\(\\{t_f^i, x_f^i\\}_{i=1}^{N_f}\\) 是时空域内的配点（collocation points），<strong>不需要标签</strong>——只要求 PDE 残差为零。</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：配点 \\(N_f\\) 的选取无需网格化，可以用拉丁超立方采样等准随机方法在整个时空域中撒点，这使得 PINN 天然适用于不规则几何和高维问题。</div>\n<h5>核心机制：离散时间模型</h5>\n<p>对于刚性方程或需要大时间步长的问题，论文提出将 <strong>\\(q\\) 阶隐式 Runge-Kutta（IRK）方案</strong>嵌入网络结构：</p>\n<p>$$u^{n+c_i} = u^n - \\Delta t \\sum_{j=1}^{q} a_{ij} \\mathcal{N}[u^{n+c_j}], \\quad i = 1, \\ldots, q$$</p>\n<p>$$u^{n+1} = u^n - \\Delta t \\sum_{j=1}^{q} b_j \\mathcal{N}[u^{n+c_j}]$$</p>\n<p>网络以空间坐标 \\(x\\) 为输入，输出 \\(q+1\\) 个分量 \\([u^{n+c_1}(x), \\ldots, u^{n+c_q}(x), u^{n+1}(x)]\\)，对应 RK 各阶段的解。通过 RK 公式构造 \\(q+1\\) 个约束 \\(u_i^n(x)\\)，要求它们均等于已知的 \\(u^n(x)\\)。</p>\n<div class=\"key-point\">💡 <strong>关键优势</strong>：经典数值方法中，隐式 RK 的阶数受限于计算复杂度（每步需求解大型非线性方程组）。而在 PINN 中，增加 RK 阶数仅增加网络最后一层的输出维度，<strong>计算成本几乎不变</strong>。论文使用了 500 阶 IRK（理论时间误差 \\(\\Delta t^{1000} = 0.8^{1000} \\approx 10^{-97}\\)），这在传统数值方法中是不可想象的。</div>\n<h5>训练与优化细节</h5>\n<ul>\n<li><strong>网络架构</strong>：全连接网络，tanh 激活函数。Burgers 方程使用 9 层 × 20 神经元；Schrödinger 方程使用 5 层 × 100 神经元</li>\n<li><strong>优化器</strong>：L-BFGS（拟牛顿法），全批量训练。L-BFGS 利用二阶曲率信息，在 PINN 这类光滑损失景观中收敛速度远快于 Adam</li>\n<li><strong>Xavier 初始化</strong>：权重使用 Xavier 初始化方案，确保各层梯度方差一致</li>\n<li><strong>训练时间</strong>：Burgers 方程连续时间模型约 60 秒（单 NVIDIA Titan X GPU）</li>\n</ul>\n<h5>实验结果与对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方程</th>\n<th>模型类型</th>\n<th>数据量</th>\n<th>配点数</th>\n<th>\\(\\mathcal{L}_2\\) 误差</th>\n<th>特殊说明</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Burgers</td>\n<td>连续时间</td>\n<td>\\(N_u=100\\)</td>\n<td>\\(N_f=10000\\)</td>\n<td>\\(6.7 \\times 10^{-4}\\)</td>\n<td>9层×20, 60秒训练</td>\n</tr>\n<tr>\n<td>Burgers</td>\n<td>离散时间</td>\n<td>\\(N_n=250\\)</td>\n<td>—</td>\n<td>\\(8.2 \\times 10^{-4}\\)</td>\n<td>500阶IRK, 单步 t=0.1→0.9</td>\n</tr>\n<tr>\n<td>Schrödinger</td>\n<td>连续时间</td>\n<td>\\(N_0=50, N_b=50\\)</td>\n<td>\\(N_f=20000\\)</td>\n<td>\\(1.97 \\times 10^{-3}\\)</td>\n<td>复值分解为实部+虚部</td>\n</tr>\n<tr>\n<td>Allen-Cahn</td>\n<td>离散时间</td>\n<td>\\(N_n=200\\)</td>\n<td>—</td>\n<td>—</td>\n<td>500阶IRK处理尖锐界面</td>\n</tr>\n<tr>\n<td>KdV</td>\n<td>离散时间</td>\n<td>\\(N_n=199\\)</td>\n<td>—</td>\n<td>—</td>\n<td>三阶导数, 多步推进</td>\n</tr>\n</tbody>\n</table></div>\n<h5>与传统方法的核心区别</h5>\n<ol>\n<li><strong>无网格化</strong>：传统方法需要空间网格剖分，PINN 通过随机配点避免网格生成</li>\n<li><strong>物理即正则化</strong>：PDE 残差项 \\(\\text{MSE}_f\\) 本质上是一种正则化，使网络在数据稀疏区域也能给出物理合理的预测</li>\n<li><strong>正反问题统一</strong>：传统方法求解正问题和反问题需要完全不同的算法，PINN 只需调整损失函数中的已知/未知量</li>\n<li><strong>自动微分 vs 数值微分</strong>：传统方法的离散化引入截断误差，自动微分精确到机器精度</li>\n<li><strong>隐式时间积分无额外成本</strong>：传统隐式方法每步需求解非线性方程组，PINN 中增加 RK 阶数仅增加输出维度</li>\n</ol>",
      "quiz": {
        "q": "PINN 损失函数中 MSE_f 项的物理含义是什么？",
        "options": [
          "衡量神经网络预测值与训练数据之间的拟合误差",
          "衡量神经网络输出在配点处满足 PDE 方程的程度",
          "衡量神经网络在边界条件上的违反程度",
          "衡量神经网络参数的 L2 正则化惩罚"
        ],
        "answer": 1,
        "explain": "MSE_f = (1/N_f) Σ|f(t_f, x_f)|² 其中 f = u_t + N[u]，即 PDE 残差。该项要求网络输出在配点处精确满足 PDE，是 PINN 区别于纯数据驱动方法的核心设计。"
      }
    },
    {
      "id": "hp_vpinns",
      "num": 2,
      "name": "hp-VPINNs",
      "fullName": "hp变分物理信息神经网络 (hp-Variational PINNs)",
      "year": "2021",
      "org": "布朗大学",
      "parent": "pinn",
      "paperUrl": "https://arxiv.org/abs/2003.05385",
      "projectUrl": "",
      "category": "pinn_family",
      "motivation": "结合变分法与hp细化处理奇异性",
      "summary": "hp-VPINNs 的核心目标是：结合变分法与hp细化处理奇异性。",
      "keyPoints": [
        "核心动机：结合变分法与hp细化处理奇异性",
        "演化来源：继承或改进自 pinn",
        "代表机构：布朗大学"
      ],
      "detail": "<p>结合变分法与hp细化处理奇异性</p>"
    },
    {
      "id": "cpinn",
      "num": 3,
      "name": "cPINN",
      "fullName": "守恒物理信息神经网络 (Conservative PINNs)",
      "year": "2020",
      "org": "布朗大学",
      "parent": "pinn",
      "paperUrl": "https://arxiv.org/abs/2001.08245",
      "projectUrl": "",
      "category": "pinn_family",
      "motivation": "基于域分解强制执行物理守恒律",
      "summary": "cPINN 的核心目标是：基于域分解强制执行物理守恒律。",
      "keyPoints": [
        "核心动机：基于域分解强制执行物理守恒律",
        "演化来源：继承或改进自 pinn",
        "代表机构：布朗大学"
      ],
      "detail": "<p>基于域分解强制执行物理守恒律</p>"
    },
    {
      "id": "xpinns",
      "num": 4,
      "name": "XPINNs",
      "fullName": "扩展物理信息神经网络 (Extended PINNs)",
      "year": "2020",
      "org": "布朗大学",
      "parent": "cpinn",
      "paperUrl": "https://arxiv.org/abs/2005.05653",
      "projectUrl": "",
      "category": "pinn_family",
      "motivation": "广义域分解支持任意几何形状",
      "summary": "XPINNs 的核心目标是：广义域分解支持任意几何形状。",
      "keyPoints": [
        "核心动机：广义域分解支持任意几何形状",
        "演化来源：继承或改进自 cpinn",
        "代表机构：布朗大学"
      ],
      "detail": "<p>广义域分解支持任意几何形状</p>"
    },
    {
      "id": "gpinn",
      "num": 5,
      "name": "gPINN",
      "fullName": "梯度增强物理信息神经网络 (Gradient-enhanced PINNs)",
      "year": "2022",
      "org": "宾夕法尼亚大学",
      "parent": "pinn",
      "paperUrl": "https://arxiv.org/abs/2111.02801",
      "projectUrl": "",
      "category": "pinn_family",
      "motivation": "加入PDE残差梯度提升稀疏数据精度",
      "summary": "gPINN 的核心目标是：加入PDE残差梯度提升稀疏数据精度。",
      "keyPoints": [
        "核心动机：加入PDE残差梯度提升稀疏数据精度",
        "演化来源：继承或改进自 pinn",
        "代表机构：宾夕法尼亚大学"
      ],
      "detail": "<p>加入PDE残差梯度提升稀疏数据精度</p>"
    },
    {
      "id": "sa_pinn",
      "num": 6,
      "name": "SA-PINN",
      "fullName": "自适应物理信息神经网络 (Self-Adaptive PINN)",
      "year": "2020",
      "org": "布朗大学",
      "parent": "pinn",
      "paperUrl": "https://arxiv.org/abs/2009.04544",
      "projectUrl": "",
      "category": "pinn_family",
      "motivation": "引入软注意力自动调整损失权重",
      "summary": "SA-PINN 的核心目标是：引入软注意力自动调整损失权重。",
      "keyPoints": [
        "核心动机：引入软注意力自动调整损失权重",
        "演化来源：继承或改进自 pinn",
        "代表机构：布朗大学"
      ],
      "detail": "<p>引入软注意力自动调整损失权重</p>"
    },
    {
      "id": "lb_pinn",
      "num": 7,
      "name": "lbPINN",
      "fullName": "损失平衡物理信息神经网络 (Loss-Balanced PINN)",
      "year": "2021",
      "org": "ETH Zurich",
      "parent": "sa_pinn",
      "paperUrl": "https://arxiv.org/abs/2104.06120",
      "projectUrl": "",
      "category": "pinn_family",
      "motivation": "通过似然估计平衡多目标损失",
      "summary": "lbPINN 的核心目标是：通过似然估计平衡多目标损失。",
      "keyPoints": [
        "核心动机：通过似然估计平衡多目标损失",
        "演化来源：继承或改进自 sa_pinn",
        "代表机构：ETH Zurich"
      ],
      "detail": "<p>通过似然估计平衡多目标损失</p>"
    },
    {
      "id": "relobralo",
      "num": 8,
      "name": "ReLoBRaLo",
      "fullName": "相对损失平衡随机回溯 (Relative Loss Balancing with Random Lookback)",
      "year": "2021",
      "org": "ETH Zurich",
      "parent": "lb_pinn",
      "paperUrl": "https://arxiv.org/abs/2110.09813",
      "projectUrl": "",
      "category": "pinn_family",
      "motivation": "基于损失变化率动态平衡权重",
      "summary": "ReLoBRaLo 的核心目标是：基于损失变化率动态平衡权重。",
      "keyPoints": [
        "核心动机：基于损失变化率动态平衡权重",
        "演化来源：继承或改进自 lb_pinn",
        "代表机构：ETH Zurich"
      ],
      "detail": "<p>基于损失变化率动态平衡权重</p>"
    },
    {
      "id": "frozen_pinn",
      "num": 9,
      "name": "Frozen-PINN",
      "fullName": "无梯度训练物理信息神经网络 (Fast training without gradient descent)",
      "year": "2026",
      "org": "TUM",
      "parent": "pinn",
      "paperUrl": "https://arxiv.org/abs/2405.20836",
      "projectUrl": "",
      "category": "pinn_family",
      "motivation": "无梯度训练加速46-2945倍",
      "summary": "Frozen-PINN 的核心目标是：无梯度训练加速46-2945倍。",
      "keyPoints": [
        "核心动机：无梯度训练加速46-2945倍",
        "演化来源：继承或改进自 pinn",
        "代表机构：TUM"
      ],
      "detail": "<p>无梯度训练加速46-2945倍</p>"
    },
    {
      "id": "pikans",
      "num": 10,
      "name": "PIKANs",
      "fullName": "物理信息KAN网络 (Physics-Informed Kolmogorov-Arnold Networks)",
      "year": "2026",
      "org": "PNNL",
      "parent": "pinn",
      "paperUrl": "https://www.pnnl.gov/publications/from-pinns-to-pikans",
      "projectUrl": "",
      "category": "pinn_family",
      "motivation": "KAN可学习激活函数提升高维精度",
      "summary": "PIKANs 的核心目标是：KAN可学习激活函数提升高维精度。",
      "keyPoints": [
        "核心动机：KAN可学习激活函数提升高维精度",
        "演化来源：继承或改进自 pinn",
        "代表机构：PNNL"
      ],
      "detail": "<p>KAN可学习激活函数提升高维精度</p>"
    },
    {
      "id": "scale_pinn",
      "num": 11,
      "name": "Scale-PINN",
      "fullName": "序列修正物理信息神经网络 (Sequential Correction PINN)",
      "year": "2026",
      "org": "A*STAR",
      "parent": "pinn",
      "paperUrl": "https://arxiv.org/abs/2601.scale",
      "projectUrl": "",
      "category": "pinn_family",
      "motivation": "序列修正机制处理多尺度PDE",
      "summary": "Scale-PINN 的核心目标是：序列修正机制处理多尺度PDE。",
      "keyPoints": [
        "核心动机：序列修正机制处理多尺度PDE",
        "演化来源：继承或改进自 pinn",
        "代表机构：A*STAR"
      ],
      "detail": "<p>序列修正机制处理多尺度PDE</p>"
    },
    {
      "id": "asr_pinn",
      "num": 12,
      "name": "ASR-PINN",
      "fullName": "自适应步长RK物理信息神经网络 (Adaptive step-size Runge-Kutta PINN)",
      "year": "2026",
      "org": "河海大学",
      "parent": "pinn",
      "paperUrl": "https://www.sciencedirect.com/science/article/pii/S0022169426002246",
      "projectUrl": "",
      "category": "pinn_family",
      "motivation": "自适应步长处理反应输运问题",
      "summary": "ASR-PINN 的核心目标是：自适应步长处理反应输运问题。",
      "keyPoints": [
        "核心动机：自适应步长处理反应输运问题",
        "演化来源：继承或改进自 pinn",
        "代表机构：河海大学"
      ],
      "detail": "<p>自适应步长处理反应输运问题</p>"
    },
    {
      "id": "ms_pinn",
      "num": 13,
      "name": "MS-PINN",
      "fullName": "多场耦合物理信息神经网络 (Multi-field coupled PINN)",
      "year": "2026",
      "org": "大连理工大学",
      "parent": "pinn",
      "paperUrl": "https://arxiv.org/abs/2601.mspinn",
      "projectUrl": "",
      "category": "pinn_family",
      "motivation": "金属凝固多场耦合演化建模",
      "summary": "MS-PINN 的核心目标是：金属凝固多场耦合演化建模。",
      "keyPoints": [
        "核心动机：金属凝固多场耦合演化建模",
        "演化来源：继承或改进自 pinn",
        "代表机构：大连理工大学"
      ],
      "detail": "<p>金属凝固多场耦合演化建模</p>"
    },
    {
      "id": "dc_pinns",
      "num": 14,
      "name": "DC-PINNs",
      "fullName": "导数约束物理信息神经网络 (Derivative-Constrained PINNs)",
      "year": "2026",
      "org": "arXiv",
      "parent": "pinn",
      "paperUrl": "https://journals.aps.org/pre/abstract/10.1103/PhysRevE.111.015303",
      "projectUrl": "",
      "category": "pinn_family",
      "motivation": "显式编码导数约束确保物理一致性",
      "summary": "DC-PINNs 的核心目标是：显式编码导数约束确保物理一致性。",
      "keyPoints": [
        "核心动机：显式编码导数约束确保物理一致性",
        "演化来源：继承或改进自 pinn",
        "代表机构：arXiv"
      ],
      "detail": "<p>显式编码导数约束确保物理一致性</p>"
    },
    {
      "id": "simple_pinn",
      "num": 15,
      "name": "SIMPLE-PINN",
      "fullName": "SIMPLE算法物理信息神经网络 (SIMPLE algorithm based PINN)",
      "year": "2026",
      "org": "ResearchGate",
      "parent": "pinn",
      "paperUrl": "https://www.researchgate.net/publication/385794553",
      "projectUrl": "",
      "category": "pinn_family",
      "motivation": "引入CFD压力修正逻辑",
      "summary": "SIMPLE-PINN 的核心目标是：引入CFD压力修正逻辑。",
      "keyPoints": [
        "核心动机：引入CFD压力修正逻辑",
        "演化来源：继承或改进自 pinn",
        "代表机构：ResearchGate"
      ],
      "detail": "<p>引入CFD压力修正逻辑</p>"
    },
    {
      "id": "deeponet",
      "num": 16,
      "name": "DeepONet",
      "fullName": "深度算子网络 (Deep Operator Network)",
      "year": "2021",
      "org": "布朗大学",
      "parent": "—",
      "paperUrl": "https://www.nature.com/articles/s42256-021-00302-5",
      "projectUrl": "",
      "category": "operators",
      "motivation": "Branch-Trunk网络解耦输入与坐标",
      "summary": "DeepONet 基于算子万能逼近定理，提出由 Branch Net（编码输入函数）和 Trunk Net（编码输出坐标）组成的双子网络架构，首次在实践中高效学习非线性算子（函数到函数的映射），在 ODE/PDE 问题上实现了远优于全连接网络的泛化精度，并观测到关于训练数据量的指数级误差收敛。",
      "keyPoints": [
        "<strong>理论基础</strong>：基于 Chen &amp; Chen (1995) 的算子万能逼近定理（Theorem 1），证明单隐层网络可逼近任意非线性连续算子",
        "<strong>双子网络架构</strong>：Branch Net 编码输入函数 \\(u\\) 在 \\(m\\) 个固定 sensor 处的离散值 \\([u(x_1), \\dots, u(x_m)]\\)；Trunk Net 编码输出函数的求值位置 \\(y\\)",
        "<strong>两种变体</strong>：Stacked DeepONet（\\(p\\) 个独立 branch 网络）和 Unstacked DeepONet（单个 branch 网络输出 \\(p\\) 维向量），后者参数更少、泛化更好",
        "<strong>输出融合</strong>：通过内积 \\(G(u)(y) \\approx \\sum_{k=1}^{p} b_k \\cdot t_k + b_0\\) 合并两个子网络输出，添加 bias 项可显著降低误差",
        "<strong>泛化优势</strong>：相比 FNN 基线，DeepONet 的泛化误差大幅减小；在反导数算子、非线性 ODE、扩散-反应 PDE 和 advection PDE 等 4 类问题上均表现优异",
        "<strong>收敛速率</strong>：观测到关于训练数据量的多项式（半阶到四阶）乃至指数级误差收敛，为深度学习领域首次报告指数收敛",
        "<strong>灵活的数据约束</strong>：仅要求输入函数在相同 sensor 位置采样，对输出位置 \\(y\\) 无任何网格或数量限制"
      ],
      "detail": "<p><img alt=\"DeepONet 架构示意图\" src=\"https://ar5iv.labs.arxiv.org/html/1910.03193/assets/x1.png\" />\n<em>图：(A) DeepONet 整体架构——Branch Net 接收输入函数在 sensors 处的值，Trunk Net 接收输出位置 y，二者输出通过内积合并得到 G(u)(y)。(B) 训练数据结构：所有输入函数共享相同 sensor 位置，但输出位置可任意。(C) Stacked DeepONet：p 个独立 branch 网络。(D) Unstacked DeepONet：单个 branch 网络输出 p 维向量。</em></p>\n<pre><code class=\"language-python\"># DeepONet 前向传播伪代码（Unstacked 版本）\ndef deeponet_forward(u_sensors, y, branch_net, trunk_net):\n    &quot;&quot;&quot;\n    u_sensors: [batch, m]   — 输入函数在 m 个 sensor 处的值\n    y:         [batch, d_y] — 输出函数的求值坐标\n    &quot;&quot;&quot;\n    # Branch Net: 编码输入函数 → p 维特征\n    b = branch_net(u_sensors)          # [batch, p]\n\n    # Trunk Net: 编码输出位置 → p 维基函数\n    t = trunk_net(y)                   # [batch, p]\n\n    # 内积融合 + bias\n    output = torch.sum(b * t, dim=-1)  # [batch]\n    output = output + bias             # 可学习标量 bias\n    return output                      # ≈ G(u)(y)\n\n# 训练循环\nfor epoch in range(num_epochs):\n    for (u_batch, y_batch, Gu_y_batch) in dataloader:\n        pred = deeponet_forward(u_batch, y_batch, branch_net, trunk_net)\n        loss = MSE(pred, Gu_y_batch)\n        loss.backward()\n        optimizer.step()\n</code></pre>\n<h5>动机与背景</h5>\n<p>传统神经网络学习的是<strong>函数</strong>（向量到向量的映射），而科学计算中大量问题本质上是<strong>算子</strong>学习——给定一个输入函数 \\(u\\)（如初始条件、外力场、边界条件），求解对应的输出函数 \\(G(u)\\)（如 PDE 的解）。Chen &amp; Chen (1995) 的万能逼近定理证明了神经网络具备逼近任意非线性连续算子的能力，但该定理仅保证了足够大网络的逼近误差，未考虑实际训练中同样关键的<strong>优化误差</strong>和<strong>泛化误差</strong>。</p>\n<div class=\"key-point\">💡 关键：总误差 = 逼近误差 + 优化误差 + 泛化误差。万能逼近定理只控制第一项，DeepONet 通过架构设计同时压低后两项。</div>\n<h5>核心机制</h5>\n<p><strong>1. 算子万能逼近定理（Theorem 1）</strong></p>\n<p>对于任意非线性连续算子 \\(G: V \\to C(\\mathbb{R}^d)\\)，存在 \\(m\\) 个 sensor 点 \\(x_1, \\dots, x_m\\) 和网络参数，使得：</p>\n<p>$$G(u)(y) \\approx \\sum_{k=1}^{p} \\underbrace{\\sigma\\!\\left(\\sum_{j=1}^{m} \\xi_k^j \\, u(x_j) + \\theta_k\\right)}_{\\text{Branch Net 第 } k \\text{ 个输出 } b_k} \\cdot \\underbrace{\\sigma\\!\\left(\\boldsymbol{w}_k \\cdot y + \\zeta_k\\right)}_{\\text{Trunk Net 第 } k \\text{ 个输出 } t_k}$$</p>\n<p>其中 \\(\\sigma\\) 为激活函数。这一公式自然地将网络分解为两个子网络：\n- <strong>Branch Net</strong>：以 \\([u(x_1), \\dots, u(x_m)]\\) 为输入，输出 \\([b_1, \\dots, b_p]\\)，编码输入函数的\"特征\"\n- <strong>Trunk Net</strong>：以 \\(y\\) 为输入，输出 \\([t_1, \\dots, t_p]\\)，可理解为一组在 \\(y\\) 处求值的<strong>可学习基函数</strong></p>\n<p><strong>2. Stacked vs. Unstacked 架构</strong></p>\n<ul>\n<li><strong>Stacked DeepONet</strong>：严格遵循定理结构，使用 \\(p\\) 个独立的 branch 网络，每个输出一个标量 \\(b_k\\)。参数量为 \\(O(p \\times m \\times w)\\)，其中 \\(w\\) 为隐层宽度。</li>\n<li><strong>Unstacked DeepONet</strong>：使用单个 branch 网络，最后一层输出 \\(p\\) 维向量。参数量约为 \\(O(m \\times w + w \\times p)\\)，远少于 stacked 版本。实验表明 unstacked 版本虽然训练误差略大，但<strong>泛化误差更小</strong>，总体测试误差更优。</li>\n</ul>\n<p><strong>3. Bias 的重要性</strong></p>\n<p>在输出公式中添加可学习 bias \\(b_0\\)：</p>\n<p>$$G(u)(y) \\approx \\sum_{k=1}^{p} b_k \\, t_k + b_0$$</p>\n<p>实验证明添加 bias 可同时降低训练误差和测试误差，且使训练更稳定（方差更小）。</p>\n<div class=\"warn-box\">⚠️ 注意：这里的 bias 不是普通神经网络层的 bias，而是在 branch-trunk 内积之后额外添加的全局偏置项。</div>\n<h5>训练与数据流</h5>\n<p><strong>数据格式</strong>：训练集由三元组 \\(\\{(u^{(i)}, y^{(i,j)}, G(u^{(i)})(y^{(i,j)}))\\}\\) 组成。关键约束是所有输入函数 \\(u^{(i)}\\) 必须在<strong>相同的 \\(m\\) 个 sensor 位置</strong>采样，但输出位置 \\(y^{(i,j)}\\) 可以任意分布、数量不同。</p>\n<p><strong>损失函数</strong>：标准均方误差（MSE）：</p>\n<p>$$\\mathcal{L} = \\frac{1}{N} \\sum_{i,j} \\left| G_\\theta(u^{(i)})(y^{(i,j)}) - G(u^{(i)})(y^{(i,j)}) \\right|^2$$</p>\n<p><strong>数据生成</strong>：输入函数从高斯随机场（GRF）或切比雪夫多项式空间中采样，输出通过数值求解器（如 Runge-Kutta、有限差分）获得真值。</p>\n<h5>与传统方法的区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方面</th>\n<th>FNN 直接学习</th>\n<th>CNN 图像映射</th>\n<th>DeepONet</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>输入表示</td>\n<td>拼接 \\([u(x_1),\\dots,u(x_m), y]\\)</td>\n<td>网格化图像</td>\n<td>Branch + Trunk 分离</td>\n</tr>\n<tr>\n<td>网格要求</td>\n<td>无</td>\n<td>等距网格</td>\n<td>sensor 固定即可，\\(y\\) 任意</td>\n</tr>\n<tr>\n<td>泛化能力</td>\n<td>差（大泛化误差）</td>\n<td>中等</td>\n<td>优（归纳偏置压低泛化误差）</td>\n</tr>\n<tr>\n<td>理论保证</td>\n<td>函数逼近定理</td>\n<td>无</td>\n<td>算子逼近定理</td>\n</tr>\n<tr>\n<td>输出分辨率</td>\n<td>固定</td>\n<td>固定网格</td>\n<td>连续（任意 \\(y\\) 可查询）</td>\n</tr>\n</tbody>\n</table></div>\n<p>DeepONet 的核心优势在于其<strong>归纳偏置</strong>：将输入函数编码与输出坐标编码解耦，使网络天然适配算子学习的结构，从而大幅降低泛化误差。</p>",
      "quiz": {
        "q": "DeepONet 中 Trunk Net 的输入和作用是什么？",
        "options": [
          "输入为函数 u 的离散值，作用是编码输入函数特征",
          "输入为输出位置 y，作用是生成一组可学习基函数",
          "输入为 PDE 的参数，作用是编码物理约束",
          "输入为训练标签，作用是计算损失函数"
        ],
        "answer": 1,
        "explain": "Trunk Net 以输出位置 y 为输入，输出 p 维向量 [t_1,...,t_p]，可理解为在 y 处求值的可学习基函数，与 Branch Net 输出通过内积融合得到最终预测。"
      }
    },
    {
      "id": "fno",
      "num": 17,
      "name": "FNO",
      "fullName": "傅里叶神经算子 (Fourier Neural Operator)",
      "year": "2021",
      "org": "Caltech",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2010.08895",
      "projectUrl": "",
      "category": "operators",
      "motivation": "傅里叶空间参数化积分核实现高效全局卷积",
      "summary": "FNO 的核心目标是：傅里叶空间参数化积分核实现高效全局卷积。",
      "keyPoints": [
        "核心动机：傅里叶空间参数化积分核实现高效全局卷积",
        "代表机构：Caltech"
      ],
      "detail": "<p>傅里叶空间参数化积分核实现高效全局卷积</p>"
    },
    {
      "id": "gno",
      "num": 18,
      "name": "GNO",
      "fullName": "图神经算子 (Graph Neural Operator)",
      "year": "2020",
      "org": "Caltech",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2003.03485",
      "projectUrl": "",
      "category": "operators",
      "motivation": "基于GNN处理非结构化网格",
      "summary": "GNO 的核心目标是：基于GNN处理非结构化网格。",
      "keyPoints": [
        "核心动机：基于GNN处理非结构化网格",
        "代表机构：Caltech"
      ],
      "detail": "<p>基于GNN处理非结构化网格</p>"
    },
    {
      "id": "geo_fno",
      "num": 19,
      "name": "Geo-FNO",
      "fullName": "几何感知傅里叶神经算子 (Geometry-aware FNO)",
      "year": "2023",
      "org": "Caltech",
      "parent": "fno",
      "paperUrl": "https://arxiv.org/abs/2207.05209",
      "projectUrl": "",
      "category": "operators",
      "motivation": "变形映射处理不规则物理域",
      "summary": "Geo-FNO 的核心目标是：变形映射处理不规则物理域。",
      "keyPoints": [
        "核心动机：变形映射处理不规则物理域",
        "演化来源：继承或改进自 fno",
        "代表机构：Caltech"
      ],
      "detail": "<p>变形映射处理不规则物理域</p>"
    },
    {
      "id": "f_fno",
      "num": 20,
      "name": "F-FNO",
      "fullName": "分解傅里叶神经算子 (Factorized FNO)",
      "year": "2022",
      "org": "Caltech",
      "parent": "fno",
      "paperUrl": "https://arxiv.org/abs/2111.13587",
      "projectUrl": "",
      "category": "operators",
      "motivation": "维度分解减少参数量",
      "summary": "F-FNO 的核心目标是：维度分解减少参数量。",
      "keyPoints": [
        "核心动机：维度分解减少参数量",
        "演化来源：继承或改进自 fno",
        "代表机构：Caltech"
      ],
      "detail": "<p>维度分解减少参数量</p>"
    },
    {
      "id": "u_fno",
      "num": 21,
      "name": "U-FNO",
      "fullName": "U型傅里叶神经算子 (U-shaped FNO)",
      "year": "2022",
      "org": "Stanford",
      "parent": "fno",
      "paperUrl": "https://doi.org/10.1016/j.advwatres.2022.104185",
      "projectUrl": "",
      "category": "operators",
      "motivation": "结合U-Net多尺度结构",
      "summary": "U-FNO 的核心目标是：结合U-Net多尺度结构。",
      "keyPoints": [
        "核心动机：结合U-Net多尺度结构",
        "演化来源：继承或改进自 fno",
        "代表机构：Stanford"
      ],
      "detail": "<p>结合U-Net多尺度结构</p>"
    },
    {
      "id": "pino",
      "num": 22,
      "name": "PINO",
      "fullName": "物理信息神经算子 (Physics-Informed Neural Operator)",
      "year": "2021",
      "org": "Caltech",
      "parent": "fno",
      "paperUrl": "https://arxiv.org/abs/2111.03794",
      "projectUrl": "",
      "category": "operators",
      "motivation": "算子学习中加入物理约束损失",
      "summary": "PINO 的核心目标是：算子学习中加入物理约束损失。",
      "keyPoints": [
        "核心动机：算子学习中加入物理约束损失",
        "演化来源：继承或改进自 fno",
        "代表机构：Caltech"
      ],
      "detail": "<p>算子学习中加入物理约束损失</p>"
    },
    {
      "id": "lno",
      "num": 23,
      "name": "LNO",
      "fullName": "拉普拉斯神经算子 (Laplace Neural Operator)",
      "year": "2023",
      "org": "DeepMind",
      "parent": "fno",
      "paperUrl": "https://arxiv.org/abs/2303.10528",
      "projectUrl": "",
      "category": "operators",
      "motivation": "拉普拉斯变换处理非周期信号",
      "summary": "LNO 的核心目标是：拉普拉斯变换处理非周期信号。",
      "keyPoints": [
        "核心动机：拉普拉斯变换处理非周期信号",
        "演化来源：继承或改进自 fno",
        "代表机构：DeepMind"
      ],
      "detail": "<p>拉普拉斯变换处理非周期信号</p>"
    },
    {
      "id": "gino",
      "num": 24,
      "name": "GINO",
      "fullName": "几何信息神经算子 (Geometry-Informed Neural Operator)",
      "year": "2023",
      "org": "Caltech",
      "parent": "geo_fno",
      "paperUrl": "https://arxiv.org/abs/2309.03019",
      "projectUrl": "",
      "category": "operators",
      "motivation": "结合GNN与FNO优化3D几何模拟",
      "summary": "GINO 的核心目标是：结合GNN与FNO优化3D几何模拟。",
      "keyPoints": [
        "核心动机：结合GNN与FNO优化3D几何模拟",
        "演化来源：继承或改进自 geo_fno",
        "代表机构：Caltech"
      ],
      "detail": "<p>结合GNN与FNO优化3D几何模拟</p>"
    },
    {
      "id": "moe_pot",
      "num": 25,
      "name": "MoE-POT",
      "fullName": "混合专家算子Transformer (Mixture-of-Experts Operator Transformer)",
      "year": "2026",
      "org": "清华大学",
      "parent": "fno",
      "paperUrl": "https://arxiv.org/abs/2510.moe",
      "projectUrl": "",
      "category": "operators",
      "motivation": "混合专家系统扩展至亿级参数",
      "summary": "MoE-POT 的核心目标是：混合专家系统扩展至亿级参数。",
      "keyPoints": [
        "核心动机：混合专家系统扩展至亿级参数",
        "演化来源：继承或改进自 fno",
        "代表机构：清华大学"
      ],
      "detail": "<p>混合专家系统扩展至亿级参数</p>"
    },
    {
      "id": "poseidon",
      "num": 26,
      "name": "Poseidon",
      "fullName": "PDE高效基础模型 (Efficient Foundation Models for PDEs)",
      "year": "2026",
      "org": "ETH Zurich",
      "parent": "fno",
      "paperUrl": "https://arxiv.org/abs/2602.15004",
      "projectUrl": "",
      "category": "operators",
      "motivation": "PDE基础模型20样本达FNO千样本精度",
      "summary": "Poseidon 的核心目标是：PDE基础模型20样本达FNO千样本精度。",
      "keyPoints": [
        "核心动机：PDE基础模型20样本达FNO千样本精度",
        "演化来源：继承或改进自 fno",
        "代表机构：ETH Zurich"
      ],
      "detail": "<p>PDE基础模型20样本达FNO千样本精度</p>"
    },
    {
      "id": "gaot",
      "num": 27,
      "name": "GAOT",
      "fullName": "几何感知算子Transformer (Geometry Aware Operator Transformer)",
      "year": "2026",
      "org": "UIUC",
      "parent": "gino",
      "paperUrl": "https://proceedings.neurips.cc/paper_files/paper/2025/hash/e45a448dfa778f6d62729a7bc8633c06",
      "projectUrl": "",
      "category": "operators",
      "motivation": "几何感知编码任意复杂域映射",
      "summary": "GAOT 的核心目标是：几何感知编码任意复杂域映射。",
      "keyPoints": [
        "核心动机：几何感知编码任意复杂域映射",
        "演化来源：继承或改进自 gino",
        "代表机构：UIUC"
      ],
      "detail": "<p>几何感知编码任意复杂域映射</p>"
    },
    {
      "id": "ginot",
      "num": 28,
      "name": "GINOT",
      "fullName": "几何信息神经算子Transformer (Geometry-Informed Neural Operator Transformer)",
      "year": "2026",
      "org": "UIUC",
      "parent": "gino",
      "paperUrl": "https://arxiv.org/abs/2601.ginot",
      "projectUrl": "",
      "category": "operators",
      "motivation": "Transformer与神经算子集成",
      "summary": "GINOT 的核心目标是：Transformer与神经算子集成。",
      "keyPoints": [
        "核心动机：Transformer与神经算子集成",
        "演化来源：继承或改进自 gino",
        "代表机构：UIUC"
      ],
      "detail": "<p>Transformer与神经算子集成</p>"
    },
    {
      "id": "s_not",
      "num": 29,
      "name": "S-NOT",
      "fullName": "序列神经算子Transformer (Sequential Neural Operator Transformer)",
      "year": "2026",
      "org": "UIUC",
      "parent": "fno",
      "paperUrl": "https://arxiv.org/abs/2601.snot",
      "projectUrl": "",
      "category": "operators",
      "motivation": "时间相关非线性PDE代理模型",
      "summary": "S-NOT 的核心目标是：时间相关非线性PDE代理模型。",
      "keyPoints": [
        "核心动机：时间相关非线性PDE代理模型",
        "演化来源：继承或改进自 fno",
        "代表机构：UIUC"
      ],
      "detail": "<p>时间相关非线性PDE代理模型</p>"
    },
    {
      "id": "fedonet",
      "num": 30,
      "name": "FEDONet",
      "fullName": "傅里叶嵌入深度算子网络 (Fourier-Embedded DeepONet)",
      "year": "2026",
      "org": "arXiv",
      "parent": "deeponet",
      "paperUrl": "https://arxiv.org/abs/2511.09",
      "projectUrl": "",
      "category": "operators",
      "motivation": "傅里叶嵌入增强高频特征捕捉",
      "summary": "FEDONet 的核心目标是：傅里叶嵌入增强高频特征捕捉。",
      "keyPoints": [
        "核心动机：傅里叶嵌入增强高频特征捕捉",
        "演化来源：继承或改进自 deeponet",
        "代表机构：arXiv"
      ],
      "detail": "<p>傅里叶嵌入增强高频特征捕捉</p>"
    },
    {
      "id": "pi_latent_no",
      "num": 31,
      "name": "PI-Latent-NO",
      "fullName": "物理信息潜空间神经算子 (Physics-Informed Latent Neural Operator)",
      "year": "2026",
      "org": "arXiv",
      "parent": "pino",
      "paperUrl": "https://arxiv.org/abs/2601.pilno",
      "projectUrl": "",
      "category": "operators",
      "motivation": "潜空间算子学习线性计算缩放",
      "summary": "PI-Latent-NO 的核心目标是：潜空间算子学习线性计算缩放。",
      "keyPoints": [
        "核心动机：潜空间算子学习线性计算缩放",
        "演化来源：继承或改进自 pino",
        "代表机构：arXiv"
      ],
      "detail": "<p>潜空间算子学习线性计算缩放</p>"
    },
    {
      "id": "difftaichi",
      "num": 32,
      "name": "DiffTaichi",
      "fullName": "可微分Taichi (Differentiable Taichi)",
      "year": "2020",
      "org": "MIT",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/1910.03035",
      "projectUrl": "",
      "category": "diff_sim",
      "motivation": "基于Taichi的自动微分比传统快188倍",
      "summary": "DiffTaichi 的核心目标是：基于Taichi的自动微分比传统快188倍。",
      "keyPoints": [
        "核心动机：基于Taichi的自动微分比传统快188倍",
        "代表机构：MIT"
      ],
      "detail": "<p>基于Taichi的自动微分比传统快188倍</p>"
    },
    {
      "id": "jax_md",
      "num": 33,
      "name": "JAX-MD",
      "fullName": "JAX分子动力学 (JAX Molecular Dynamics)",
      "year": "2020",
      "org": "DeepMind",
      "parent": "—",
      "paperUrl": "https://github.com/google/jax-md",
      "projectUrl": "",
      "category": "diff_sim",
      "motivation": "端到端可微分分子动力学框架",
      "summary": "JAX-MD 的核心目标是：端到端可微分分子动力学框架。",
      "keyPoints": [
        "核心动机：端到端可微分分子动力学框架",
        "代表机构：DeepMind"
      ],
      "detail": "<p>端到端可微分分子动力学框架</p>"
    },
    {
      "id": "nvidia_warp",
      "num": 34,
      "name": "NVIDIA-Warp",
      "fullName": "NVIDIA Warp",
      "year": "2022",
      "org": "NVIDIA",
      "parent": "difftaichi",
      "paperUrl": "https://github.com/NVIDIA/warp",
      "projectUrl": "",
      "category": "diff_sim",
      "motivation": "Python编译为CUDA支持大规模微分模拟",
      "summary": "NVIDIA-Warp 的核心目标是：Python编译为CUDA支持大规模微分模拟。",
      "keyPoints": [
        "核心动机：Python编译为CUDA支持大规模微分模拟",
        "演化来源：继承或改进自 difftaichi",
        "代表机构：NVIDIA"
      ],
      "detail": "<p>Python编译为CUDA支持大规模微分模拟</p>"
    },
    {
      "id": "pac_nerf",
      "num": 35,
      "name": "PAC-NeRF",
      "fullName": "物理增强连续NeRF (Physics Augmented Continuum NeRF)",
      "year": "2023",
      "org": "CMU",
      "parent": "difftaichi",
      "paperUrl": "https://xuan-li.github.io/PAC-NeRF/",
      "projectUrl": "",
      "category": "diff_sim",
      "motivation": "从视频推断流体物理参数",
      "summary": "PAC-NeRF 的核心目标是：从视频推断流体物理参数。",
      "keyPoints": [
        "核心动机：从视频推断流体物理参数",
        "演化来源：继承或改进自 difftaichi",
        "代表机构：CMU"
      ],
      "detail": "<p>从视频推断流体物理参数</p>"
    },
    {
      "id": "pie_nerf",
      "num": 36,
      "name": "PIE-NeRF",
      "fullName": "物理集成弹性动力学NeRF (Physics-Integrated Elastodynamics NeRF)",
      "year": "2024",
      "org": "PKU",
      "parent": "pac_nerf",
      "paperUrl": "https://github.com/FYTalon/pienerf",
      "projectUrl": "",
      "category": "diff_sim",
      "motivation": "隐式NeRF无网格离散化形变模拟",
      "summary": "PIE-NeRF 的核心目标是：隐式NeRF无网格离散化形变模拟。",
      "keyPoints": [
        "核心动机：隐式NeRF无网格离散化形变模拟",
        "演化来源：继承或改进自 pac_nerf",
        "代表机构：PKU"
      ],
      "detail": "<p>隐式NeRF无网格离散化形变模拟</p>"
    },
    {
      "id": "jax_mpm",
      "num": 37,
      "name": "JAX-MPM",
      "fullName": "JAX物质点法 (JAX Material Point Method)",
      "year": "2026",
      "org": "清华大学",
      "parent": "jax_md",
      "paperUrl": "https://link.springer.com/article/10.1007/s00366-026-02320-6",
      "projectUrl": "",
      "category": "diff_sim",
      "motivation": "统一拉格朗日-欧拉数据同化GPU框架",
      "summary": "JAX-MPM 的核心目标是：统一拉格朗日-欧拉数据同化GPU框架。",
      "keyPoints": [
        "核心动机：统一拉格朗日-欧拉数据同化GPU框架",
        "演化来源：继承或改进自 jax_md",
        "代表机构：清华大学"
      ],
      "detail": "<p>统一拉格朗日-欧拉数据同化GPU框架</p>"
    },
    {
      "id": "moto",
      "num": 38,
      "name": "MOTO",
      "fullName": "隐式MPM拓扑优化 (Topology Optimization via Implicit MPM)",
      "year": "2026",
      "org": "Wisconsin",
      "parent": "jax_mpm",
      "paperUrl": "https://arxiv.org/abs/2603.14596",
      "projectUrl": "",
      "category": "diff_sim",
      "motivation": "端到端可微分隐式MPM拓扑优化",
      "summary": "MOTO 的核心目标是：端到端可微分隐式MPM拓扑优化。",
      "keyPoints": [
        "核心动机：端到端可微分隐式MPM拓扑优化",
        "演化来源：继承或改进自 jax_mpm",
        "代表机构：Wisconsin"
      ],
      "detail": "<p>端到端可微分隐式MPM拓扑优化</p>"
    },
    {
      "id": "as_diffmpm",
      "num": 39,
      "name": "AS-DiffMPM",
      "fullName": "高斯增强物理仿真 (Gaussian-Augmented Physics Simulation)",
      "year": "2026",
      "org": "IIT",
      "parent": "jax_mpm",
      "paperUrl": "https://proceedings.neurips.cc/paper_files/paper/2025/hash/91ed94fc04f9da4a2e3e5382c56c93aa",
      "projectUrl": "",
      "category": "diff_sim",
      "motivation": "可微分碰撞处理复杂系统辨识",
      "summary": "AS-DiffMPM 的核心目标是：可微分碰撞处理复杂系统辨识。",
      "keyPoints": [
        "核心动机：可微分碰撞处理复杂系统辨识",
        "演化来源：继承或改进自 jax_mpm",
        "代表机构：IIT"
      ],
      "detail": "<p>可微分碰撞处理复杂系统辨识</p>"
    },
    {
      "id": "pod_dl_rom",
      "num": 40,
      "name": "POD-DL-ROM",
      "fullName": "POD深度学习降阶模型 (POD Deep Learning ROM)",
      "year": "2021",
      "org": "Politecnico Milano",
      "parent": "—",
      "paperUrl": "https://www.researchgate.net/publication/355414331",
      "projectUrl": "",
      "category": "acceleration",
      "motivation": "POD+Autoencoder加速140-3800倍",
      "summary": "POD-DL-ROM 的核心目标是：POD+Autoencoder加速140-3800倍。",
      "keyPoints": [
        "核心动机：POD+Autoencoder加速140-3800倍",
        "代表机构：Politecnico Milano"
      ],
      "detail": "<p>POD+Autoencoder加速140-3800倍</p>"
    },
    {
      "id": "deepxde",
      "num": 41,
      "name": "DeepXDE",
      "fullName": "深度扩展微分方程 (Deep eXtension Differential Equations)",
      "year": "2021",
      "org": "布朗大学",
      "parent": "—",
      "paperUrl": "https://github.com/lululxvi/deepxde",
      "projectUrl": "",
      "category": "acceleration",
      "motivation": "多后端支持学术研究框架",
      "summary": "DeepXDE 的核心目标是：多后端支持学术研究框架。",
      "keyPoints": [
        "核心动机：多后端支持学术研究框架",
        "代表机构：布朗大学"
      ],
      "detail": "<p>多后端支持学术研究框架</p>"
    },
    {
      "id": "neuralpde_jl",
      "num": 42,
      "name": "NeuralPDE-jl",
      "fullName": "NeuralPDE.jl",
      "year": "2022",
      "org": "MIT/NASA",
      "parent": "deepxde",
      "paperUrl": "https://github.com/SciML/NeuralPDE.jl",
      "projectUrl": "",
      "category": "acceleration",
      "motivation": "Julia高性能符号微分框架",
      "summary": "NeuralPDE-jl 的核心目标是：Julia高性能符号微分框架。",
      "keyPoints": [
        "核心动机：Julia高性能符号微分框架",
        "演化来源：继承或改进自 deepxde",
        "代表机构：MIT/NASA"
      ],
      "detail": "<p>Julia高性能符号微分框架</p>"
    },
    {
      "id": "modulus",
      "num": 43,
      "name": "Modulus",
      "fullName": "NVIDIA Modulus",
      "year": "2022",
      "org": "NVIDIA",
      "parent": "—",
      "paperUrl": "https://developer.nvidia.com/modulus",
      "projectUrl": "",
      "category": "acceleration",
      "motivation": "工业级数字孪生GPU深度优化",
      "summary": "Modulus 的核心目标是：工业级数字孪生GPU深度优化。",
      "keyPoints": [
        "核心动机：工业级数字孪生GPU深度优化",
        "代表机构：NVIDIA"
      ],
      "detail": "<p>工业级数字孪生GPU深度优化</p>"
    },
    {
      "id": "physicsnemo_v2",
      "num": 44,
      "name": "PhysicsNeMo-v2",
      "fullName": "NVIDIA PhysicsNeMo v2.0",
      "year": "2026",
      "org": "NVIDIA",
      "parent": "modulus",
      "paperUrl": "https://github.com/NVIDIA/physicsnemo/releases",
      "projectUrl": "",
      "category": "acceleration",
      "motivation": "PyTorch原生架构GNN速度提升2倍",
      "summary": "PhysicsNeMo-v2 的核心目标是：PyTorch原生架构GNN速度提升2倍。",
      "keyPoints": [
        "核心动机：PyTorch原生架构GNN速度提升2倍",
        "演化来源：继承或改进自 modulus",
        "代表机构：NVIDIA"
      ],
      "detail": "<p>PyTorch原生架构GNN速度提升2倍</p>"
    },
    {
      "id": "pde_fm",
      "num": 45,
      "name": "PDE-FM",
      "fullName": "PDE基础模型 (Foundation Model for PDEs)",
      "year": "2026",
      "org": "IBM Research",
      "parent": "fno",
      "paperUrl": "https://www.ibm.com/research/publications/towards-a-foundation-model-for-pdes",
      "projectUrl": "",
      "category": "acceleration",
      "motivation": "Mamba骨干网络误差降低46%",
      "summary": "PDE-FM 提出了一种融合**空间-频谱双 Tokenization**、**Mamba 状态空间骨干**和 **FNO 频谱解码器**的跨物理域 PDE 基础模型，通过在 The Well 基准的 12 个异构数据集上联合预训练，在湍流、天体物理和辐射流等非线性域实现了平均 VRMSE 降低 46% 的 SOTA 性能。",
      "keyPoints": [
        "<strong>空间-频谱双 Tokenization</strong>：PatchConv 提取局部空间特征 + 截断 FFT 捕获全局频谱模式，两路 Token 经 Cross-Attention 融合",
        "<strong>FiLM 物理条件注入</strong>：将数据集元信息（边界条件、物理系数等）通过 Feature-wise Linear Modulation 调制空间 Token，实现跨域泛化",
        "<strong>Mamba SSM 骨干</strong>：以 \\(O(Nd)\\) 线性复杂度替代 \\(O(N^2)\\) 的 Transformer 自注意力，在保持表达能力的同时大幅降低计算开销",
        "<strong>FNO 频谱解码器</strong>：在傅里叶域通过可学习权重矩阵进行频谱乘法，天然保持周期性和频谱连续性",
        "<strong>双重损失函数</strong>：VRMSE 物理空间损失 + 频谱 \\(L_2\\) 损失，可选守恒正则和 PDE 残差惩罚",
        "<strong>多数据集预训练策略</strong>：温度缩放采样 \\(p(i) \\propto |\\mathcal{D}_i|^{\\tau}\\)（\\(\\tau=0.5\\)）+ EMA 难度加权 + 数据集特定 1×1 适配器",
        "<strong>12 个 The Well 数据集</strong>覆盖活性物质、湍流辐射层、粘弹性不稳定性、剪切流、Gray-Scott 反应扩散、Rayleigh-Bénard 对流、中子星并合后、超新星爆炸、引力冷却湍流、红超巨星对流包层、Helmholtz 阶梯、声学散射",
        "<strong>SOTA 结果</strong>：6/12 数据集最优，均值 VRMSE 0.165（次优 CNextU-net 为 0.304），在 Rayleigh-Bénard 和剪切流上超越基线一个数量级"
      ],
      "detail": "<p><img alt=\"PDE-FM 架构总览图\" src=\"https://ar5iv.labs.arxiv.org/html/2511.21861/assets/figures/architecture_fm4pde.png\" />\n<em>图：PDE-FM 的五阶段流水线架构——空间-频谱双 Tokenization → FiLM 物理条件注入 → Cross-Attention 融合 → Mamba SSM 骨干 → FNO 频谱解码器</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># PDE-FM 前向传播伪代码\ndef forward(u_t, metadata_c):\n    # Stage 1: 空间-频谱双 Tokenization\n    z_spatial = PatchConv(u_t)                    # [B, N_p, d]\n    z_spectral = TruncFFT(u_t, k_max)            # [B, C, k_max, k_max] → Linear → [B, M, d]\n\n    # Stage 2: FiLM 物理条件注入\n    gamma, beta = FiLM_MLP(metadata_c)            # 从元信息生成调制参数\n    z_spatial = gamma * z_spatial + beta           # 逐特征仿射变换\n\n    # Stage 3: Cross-Attention 融合\n    z_fused = CrossAttn(Q=z_spatial, K=z_spectral, V=z_spectral) + z_spatial\n\n    # Stage 4: Mamba SSM 骨干 (L 层)\n    for l in range(L):\n        z_fused = z_fused + Mamba_Block(LayerNorm(z_fused))  # O(Nd) 线性复杂度\n\n    # Stage 5: FNO 频谱解码器\n    z_proj = Conv1x1(z_fused).reshape(B, C_out, H, W)\n    u_hat = z_proj + sum(iFFT(R_k * FFT(z_proj)) for k in range(K_modes))\n\n    return u_hat  # 预测 u_{t+1}\n</code></pre>\n<h5>动机与背景</h5>\n<p>传统 PDE 求解器（有限元/有限差分）在高分辨率三维场景下计算成本极高，单次模拟可能需要数千 GPU 小时。<strong>神经算子</strong>（如 FNO、DeepONet）虽然能以数据驱动方式加速求解，但存在两个核心瓶颈：</p>\n<ol>\n<li><strong>单域训练</strong>：每个 PDE 族需要独立训练一个模型，无法利用不同物理域之间的共享结构（如不可压缩性、涡度守恒等）</li>\n<li><strong>频谱退化</strong>：纯空间域方法在长时间推演中高频分量迅速衰减，导致预测模糊化</li>\n</ol>\n<p>PDE-FM 的核心洞察是：<strong>不同 PDE 族共享底层的频谱-空间对偶结构</strong>，通过联合预训练可以学习到可迁移的归纳偏置。</p>\n<h5>核心机制详解</h5>\n<p><strong>（1）空间-频谱双 Tokenization</strong></p>\n<p>空间分支使用 PatchConv（步幅卷积）将输入场 \\(u_t \\in \\mathbb{R}^{C \\times H \\times W}\\) 分割为 \\(N_p\\) 个 Patch Token：</p>\n<p>$$z_{\\text{spatial}} = \\text{PatchConv}(u_t) \\in \\mathbb{R}^{N_p \\times d}$$</p>\n<p>频谱分支对输入做 2D FFT 并截断到前 \\(k_{\\max}\\) 个模态，再通过线性投影对齐维度：</p>\n<p>$$z_{\\text{spectral}} = \\text{Linear}\\left(\\text{TruncFFT}(u_t, k_{\\max})\\right) \\in \\mathbb{R}^{M \\times d}$$</p>\n<div class=\"key-point\">💡 <strong>关键</strong>：空间 Token 捕获局部梯度和边界信息，频谱 Token 捕获全局周期结构和能量级联——两者互补，缺一不可。</div>\n<p><strong>（2）FiLM 物理条件注入</strong></p>\n<p>为实现跨域泛化，PDE-FM 将数据集元信息（PDE 类型、边界条件、物理系数等）编码为条件向量 \\(c\\)，通过 Feature-wise Linear Modulation 调制空间 Token：</p>\n<p>$$z_{\\text{cond}} = \\gamma(c) \\odot z_{\\text{spatial}} + \\beta(c)$$</p>\n<p>其中 \\(\\gamma(c), \\beta(c) \\in \\mathbb{R}^d\\) 由两层 MLP 从 \\(c\\) 生成。这种设计让同一骨干网络能根据物理上下文动态调整特征表示，无需为每个 PDE 族维护独立参数。</p>\n<p><strong>（3）Cross-Attention 融合</strong></p>\n<p>空间和频谱两路 Token 通过标准交叉注意力机制融合：</p>\n<p>$$z_{\\text{fused}} = \\text{softmax}\\!\\left(\\frac{Q_{\\text{spatial}} \\cdot K_{\\text{spectral}}^T}{\\sqrt{d}}\\right) V_{\\text{spectral}} + z_{\\text{spatial}}$$</p>\n<p>空间 Token 作为 Query，频谱 Token 作为 Key/Value，使每个空间位置都能\"查询\"全局频谱信息。残差连接确保局部空间特征不被稀释。</p>\n<p><strong>（4）Mamba SSM 骨干</strong></p>\n<p>融合后的 Token 序列送入 \\(L\\) 层 Mamba 残差块。Mamba 是一种选择性状态空间模型（Selective SSM），其核心递推为：</p>\n<p>$$h_n = \\bar{A} h_{n-1} + \\bar{B} x_n, \\quad y_n = C h_n$$</p>\n<p>其中 \\(\\bar{A}, \\bar{B}\\) 通过零阶保持（ZOH）离散化得到，且 \\(B, C, \\Delta\\) 均为输入依赖的（input-dependent），赋予模型选择性记忆能力。</p>\n<div class=\"key-point\">💡 <strong>关键</strong>：Mamba 的计算复杂度为 \\(O(Nd)\\)（\\(N\\) 为序列长度，\\(d\\) 为隐藏维度），相比 Transformer 的 \\(O(N^2)\\) 在高分辨率 PDE 场景下优势显著。消融实验显示 Mamba+FNO（VRMSE 0.2581）略优于 Transformer+FNO（0.2779）。</div>\n<p><strong>（5）FNO 频谱解码器</strong></p>\n<p>骨干输出经 1×1 卷积投影回物理空间维度后，通过 FNO 头进行频谱精修：</p>\n<p>$$\\hat{u}_{t+1} = z_{\\text{proj}} + \\sum_{k=1}^{K} \\mathcal{F}^{-1}\\!\\left(R_k \\cdot \\mathcal{F}(z_{\\text{proj}})\\right)$$</p>\n<p>其中 \\(R_k \\in \\mathbb{C}^{d_{\\text{out}} \\times d_{\\text{out}}}\\) 是可学习的频谱权重矩阵，\\(\\mathcal{F}\\) 和 \\(\\mathcal{F}^{-1}\\) 分别为 FFT 和逆 FFT。这种设计天然保持频谱连续性，避免了纯卷积解码器的高频衰减问题。</p>\n<p><strong>（6）损失函数</strong></p>\n<p>训练使用双重损失：</p>\n<p>$$\\mathcal{L} = \\mathcal{L}_{\\text{VRMSE}} + \\lambda \\cdot \\mathcal{L}_{\\text{spectral}}$$</p>\n<p>其中 VRMSE 按空间方差归一化，确保不同物理量级的场（密度、压力、速度）具有可比性：</p>\n<p>$$\\mathcal{L}_{\\text{VRMSE}} = \\frac{\\|u - \\hat{u}\\|_2}{\\sqrt{\\text{Var}_{\\text{spatial}}(u)}}$$</p>\n<p>频谱损失在傅里叶域计算 \\(L_2\\) 距离，惩罚高频分量的偏差。可选的守恒损失和 PDE 残差损失进一步增强物理一致性。</p>\n<h5>多数据集预训练策略</h5>\n<p>PDE-FM 在 The Well 基准的 12 个数据集上联合预训练，涵盖从 \\(128^2\\) 到 \\(256^3\\) 的 2D/3D 系统。关键设计包括：</p>\n<ul>\n<li><strong>温度缩放采样</strong>：\\(p(i) \\propto |\\mathcal{D}_i|^{\\tau}\\)，\\(\\tau=0.5\\) 平衡数据集多样性与收敛稳定性</li>\n<li><strong>数据集特定适配器</strong>：1×1 卷积进行通道归一化和空间插值，将异构输入映射到标准化网格</li>\n<li><strong>EMA 难度加权</strong>：用指数移动平均跟踪每个数据集的损失，动态提升困难数据集的采样权重，缓解负迁移</li>\n</ul>\n<h5>与现有方法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>骨干</th>\n<th>复杂度</th>\n<th>跨域能力</th>\n<th>均值 VRMSE</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>FNO</td>\n<td>频谱卷积</td>\n<td>\\(O(N \\log N)\\)</td>\n<td>❌ 单域</td>\n<td>0.441</td>\n</tr>\n<tr>\n<td>TFNO</td>\n<td>Transformer+频谱</td>\n<td>\\(O(N^2)\\)</td>\n<td>❌ 单域</td>\n<td>0.469</td>\n</tr>\n<tr>\n<td>U-net</td>\n<td>编码器-解码器</td>\n<td>\\(O(N)\\)</td>\n<td>❌ 单域</td>\n<td>0.588</td>\n</tr>\n<tr>\n<td>CNextU-net</td>\n<td>ConvNeXt+U-net</td>\n<td>\\(O(N)\\)</td>\n<td>❌ 单域</td>\n<td>0.304</td>\n</tr>\n<tr>\n<td>PhysiX</td>\n<td>自回归 Transformer (4.5B)</td>\n<td>\\(O(N^2)\\)</td>\n<td>✅ 多域</td>\n<td>仅 2D</td>\n</tr>\n<tr>\n<td><strong>PDE-FM</strong></td>\n<td><strong>Mamba+FNO</strong></td>\n<td><strong>\\(O(Nd)\\)</strong></td>\n<td><strong>✅ 多域</strong></td>\n<td><strong>0.165</strong></td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"warn-box\">⚠️ <strong>局限性</strong>：PDE-FM 在粘弹性不稳定性（VRMSE 0.52 vs CNextU-net 0.25）和线性声学散射等局部刚性/准稳态系统上仍落后于卷积架构，表明长期应力-应变耦合需要显式的物理先验或时序记忆机制。</div>\n<h5>消融实验关键发现</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>配置</th>\n<th>均值 VRMSE</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Mamba + FiLM + FNO + SpecTok + XAttn + LayerNorm</td>\n<td><strong>0.2581</strong></td>\n</tr>\n<tr>\n<td>Transformer + FNO + SpecTok + XAttn + LayerNorm</td>\n<td>0.2779</td>\n</tr>\n<tr>\n<td>Transformer + Conv + SpecTok + LayerNorm</td>\n<td>0.3045</td>\n</tr>\n<tr>\n<td>Transformer + FNO（无 LayerNorm）</td>\n<td>0.3134</td>\n</tr>\n<tr>\n<td>Transformer + Conv（无 SpecTok/XAttn/Norm）</td>\n<td>0.3297</td>\n</tr>\n</tbody>\n</table></div>\n<p>三个关键结论：(1) FNO 解码器一致优于卷积解码器；(2) Mamba 骨干略优于 Transformer 且计算成本更低；(3) 频谱 Tokenizer 和 Cross-Attention 贡献了最大的性能增益。</p>",
      "quiz": {
        "q": "PDE-FM 中 Cross-Attention 融合模块的 Query 和 Key/Value 分别来自哪里？",
        "options": [
          "Query 来自频谱 Token，Key/Value 来自空间 Token",
          "Query 来自空间 Token，Key/Value 来自频谱 Token",
          "Query、Key、Value 均来自空间 Token（自注意力）",
          "Query、Key、Value 均来自频谱 Token（自注意力）"
        ],
        "answer": 1,
        "explain": "空间 Token 作为 Query 查询频谱 Token（Key/Value），使每个空间位置能获取全局频率信息，实现局部-全局特征融合。"
      }
    },
    {
      "id": "scasml",
      "num": 46,
      "name": "SCaSML",
      "fullName": "仿真校准科学机器学习 (Simulation-Calibrated Scientific ML)",
      "year": "2026",
      "org": "ICLR 2026",
      "parent": "pinn",
      "paperUrl": "https://openreview.net/forum?id=scasml2026",
      "projectUrl": "",
      "category": "acceleration",
      "motivation": "推理阶段缺陷定律误差修正",
      "summary": "SCaSML 的核心目标是：推理阶段缺陷定律误差修正。",
      "keyPoints": [
        "核心动机：推理阶段缺陷定律误差修正",
        "演化来源：继承或改进自 pinn",
        "代表机构：ICLR 2026"
      ],
      "detail": "<p>推理阶段缺陷定律误差修正</p>"
    },
    {
      "id": "mollifier_layers",
      "num": 47,
      "name": "Mollifier-Layers",
      "fullName": "逆向PDE平滑层 (Mollifier Layers for Inverse PDEs)",
      "year": "2026",
      "org": "宾夕法尼亚大学",
      "parent": "pinn",
      "paperUrl": "https://arxiv.org/abs/2601.mollifier",
      "projectUrl": "",
      "category": "acceleration",
      "motivation": "平滑层处理噪声逆向PDE求解",
      "summary": "Mollifier-Layers 的核心目标是：平滑层处理噪声逆向PDE求解。",
      "keyPoints": [
        "核心动机：平滑层处理噪声逆向PDE求解",
        "演化来源：继承或改进自 pinn",
        "代表机构：宾夕法尼亚大学"
      ],
      "detail": "<p>平滑层处理噪声逆向PDE求解</p>"
    }
  ],
  "categories": {
    "pinn_family": {
      "label": "物理信息神经网络",
      "color": "#22a06b"
    },
    "operators": {
      "label": "神经算子",
      "color": "#5b63d3"
    },
    "diff_sim": {
      "label": "可微分仿真",
      "color": "#e8820c"
    },
    "acceleration": {
      "label": "科学计算加速",
      "color": "#d32f2f"
    }
  },
  "projectUrls": {}
};
