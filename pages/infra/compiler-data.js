/**
 * compiler-data.js — 由 pipeline/build.py 于 2026-05-20 17:49:44 自动生成。
 * 源文件：content/infra/compiler.md
 * ⚠️  请勿手动修改；如需更新，修改源文档后重新编译。
 */
window.PAGE_CONFIG = {
  "meta": {
    "domain": "infra",
    "topic_id": "compiler",
    "topic_name": "AI编译器",
    "page_title": "AI编译器技术演进总结",
    "page_subtitle": "2026-05-20 版",
    "page_desc": "系统梳理从 XLA、TVM 到 MLIR、Triton 的 AI 编译器发展历程与核心技术突破，覆盖经典奠基工作与2026年最新进展。",
    "page_icon": "⚙️",
    "hero_pills": [
      "🏷️ Deep Learning Compiler · Graph Optimization · Kernel Synthesis · LLM-Driven Compilation"
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
        "id": "llvm",
        "x": 50,
        "y": 380,
        "category": "infrastructure"
      },
      {
        "id": "relay",
        "x": 490,
        "y": 380,
        "category": "infrastructure"
      },
      {
        "id": "mlir",
        "x": 560,
        "y": 330,
        "category": "infrastructure"
      },
      {
        "id": "iree",
        "x": 640,
        "y": 430,
        "category": "infrastructure"
      },
      {
        "id": "torch_dynamo",
        "x": 660,
        "y": 330,
        "category": "infrastructure"
      },
      {
        "id": "mojo",
        "x": 730,
        "y": 380,
        "category": "infrastructure"
      },
      {
        "id": "byteir",
        "x": 730,
        "y": 430,
        "category": "infrastructure"
      },
      {
        "id": "openxla",
        "x": 730,
        "y": 330,
        "category": "infrastructure"
      },
      {
        "id": "relax",
        "x": 870,
        "y": 380,
        "category": "infrastructure"
      },
      {
        "id": "wave",
        "x": 980,
        "y": 330,
        "category": "infrastructure"
      },
      {
        "id": "approx_mlir",
        "x": 980,
        "y": 430,
        "category": "infrastructure"
      },
      {
        "id": "xla",
        "x": 230,
        "y": 80,
        "category": "graph_compilers"
      },
      {
        "id": "glow",
        "x": 310,
        "y": 130,
        "category": "graph_compilers"
      },
      {
        "id": "ngraph",
        "x": 310,
        "y": 30,
        "category": "graph_compilers"
      },
      {
        "id": "jax",
        "x": 390,
        "y": 80,
        "category": "graph_compilers"
      },
      {
        "id": "flexflow",
        "x": 470,
        "y": 130,
        "category": "graph_compilers"
      },
      {
        "id": "alpa",
        "x": 660,
        "y": 80,
        "category": "graph_compilers"
      },
      {
        "id": "deep_compile",
        "x": 980,
        "y": 80,
        "category": "graph_compilers"
      },
      {
        "id": "halide",
        "x": 130,
        "y": 230,
        "category": "tensor_ir"
      },
      {
        "id": "tvm",
        "x": 310,
        "y": 230,
        "category": "tensor_ir"
      },
      {
        "id": "autotvm",
        "x": 390,
        "y": 180,
        "category": "tensor_ir"
      },
      {
        "id": "tc",
        "x": 310,
        "y": 280,
        "category": "tensor_ir"
      },
      {
        "id": "triton",
        "x": 470,
        "y": 230,
        "category": "tensor_ir"
      },
      {
        "id": "tiramisu",
        "x": 470,
        "y": 280,
        "category": "tensor_ir"
      },
      {
        "id": "ansor",
        "x": 560,
        "y": 180,
        "category": "tensor_ir"
      },
      {
        "id": "meta_schedule",
        "x": 660,
        "y": 230,
        "category": "tensor_ir"
      },
      {
        "id": "trinity",
        "x": 980,
        "y": 180,
        "category": "tensor_ir"
      },
      {
        "id": "redfuser",
        "x": 980,
        "y": 230,
        "category": "tensor_ir"
      },
      {
        "id": "nautilus",
        "x": 1060,
        "y": 180,
        "category": "tensor_ir"
      },
      {
        "id": "linear_layouts",
        "x": 1060,
        "y": 230,
        "category": "tensor_ir"
      },
      {
        "id": "event_tensor",
        "x": 1060,
        "y": 280,
        "category": "tensor_ir"
      },
      {
        "id": "triton_distributed",
        "x": 1140,
        "y": 230,
        "category": "tensor_ir"
      },
      {
        "id": "hexcute",
        "x": 1140,
        "y": 280,
        "category": "tensor_ir"
      },
      {
        "id": "tensorrt",
        "x": 170,
        "y": 530,
        "category": "hardware_specific"
      },
      {
        "id": "akg",
        "x": 640,
        "y": 530,
        "category": "hardware_specific"
      },
      {
        "id": "flash_attention",
        "x": 660,
        "y": 580,
        "category": "hardware_specific"
      },
      {
        "id": "bladedisc",
        "x": 730,
        "y": 530,
        "category": "hardware_specific"
      },
      {
        "id": "flashlight",
        "x": 980,
        "y": 530,
        "category": "hardware_specific"
      },
      {
        "id": "flash_attention_4",
        "x": 980,
        "y": 580,
        "category": "hardware_specific"
      },
      {
        "id": "hexagon_mlir",
        "x": 1060,
        "y": 530,
        "category": "hardware_specific"
      },
      {
        "id": "flex_linear_attn",
        "x": 1060,
        "y": 580,
        "category": "hardware_specific"
      },
      {
        "id": "quantix",
        "x": 1140,
        "y": 530,
        "category": "hardware_specific"
      },
      {
        "id": "magellan",
        "x": 980,
        "y": 680,
        "category": "llm_driven"
      },
      {
        "id": "cutegen",
        "x": 1060,
        "y": 680,
        "category": "llm_driven"
      },
      {
        "id": "autokernel",
        "x": 1140,
        "y": 680,
        "category": "llm_driven"
      },
      {
        "id": "acclaim",
        "x": 1140,
        "y": 730,
        "category": "llm_driven"
      }
    ],
    "edges": [
      {
        "from": "llvm",
        "to": "mlir",
        "label": "元框架升级"
      },
      {
        "from": "mlir",
        "to": "iree",
        "label": "端到端部署"
      },
      {
        "from": "mlir",
        "to": "byteir",
        "label": "业务定制"
      },
      {
        "from": "mlir",
        "to": "bladedisc",
        "label": "动态形状"
      },
      {
        "from": "mlir",
        "to": "mojo",
        "label": "语言融合"
      },
      {
        "from": "mlir",
        "to": "approx_mlir",
        "label": "精度感知"
      },
      {
        "from": "mlir",
        "to": "hexagon_mlir",
        "label": "NPU适配"
      },
      {
        "from": "mojo",
        "to": "wave",
        "label": "DSL扩展"
      },
      {
        "from": "xla",
        "to": "openxla",
        "label": "开放标准"
      },
      {
        "from": "openxla",
        "to": "magellan",
        "label": "LLM进化"
      },
      {
        "from": "tvm",
        "to": "relay",
        "label": "图IR升级"
      },
      {
        "from": "relay",
        "to": "relax",
        "label": "动态形状"
      },
      {
        "from": "torch_dynamo",
        "to": "deep_compile",
        "label": "分布式扩展"
      },
      {
        "from": "xla",
        "to": "jax",
        "label": "函数变换"
      },
      {
        "from": "xla",
        "to": "alpa",
        "label": "并行搜索"
      },
      {
        "from": "halide",
        "to": "tvm",
        "label": "调度继承"
      },
      {
        "from": "halide",
        "to": "tc",
        "label": "数学描述"
      },
      {
        "from": "tvm",
        "to": "autotvm",
        "label": "ML调优"
      },
      {
        "from": "tvm",
        "to": "redfuser",
        "label": "融合扩展"
      },
      {
        "from": "autotvm",
        "to": "ansor",
        "label": "无模板化"
      },
      {
        "from": "ansor",
        "to": "meta_schedule",
        "label": "概率统一"
      },
      {
        "from": "ansor",
        "to": "trinity",
        "label": "等价饱和"
      },
      {
        "from": "ansor",
        "to": "nautilus",
        "label": "端到端调度"
      },
      {
        "from": "triton",
        "to": "linear_layouts",
        "label": "布局形式化"
      },
      {
        "from": "triton",
        "to": "event_tensor",
        "label": "动态抽象"
      },
      {
        "from": "triton",
        "to": "triton_distributed",
        "label": "分布式扩展"
      },
      {
        "from": "triton",
        "to": "cutegen",
        "label": "LLM生成"
      },
      {
        "from": "triton",
        "to": "autokernel",
        "label": "Agent优化"
      },
      {
        "from": "triton",
        "to": "hexcute",
        "label": "布局合成"
      },
      {
        "from": "tiramisu",
        "to": "akg",
        "label": "NPU适配"
      },
      {
        "from": "flash_attention",
        "to": "flashlight",
        "label": "编译扩展"
      },
      {
        "from": "flash_attention",
        "to": "flash_attention_4",
        "label": "流水线协同"
      },
      {
        "from": "flash_attention",
        "to": "flex_linear_attn",
        "label": "线性统一"
      },
      {
        "from": "tensorrt",
        "to": "quantix",
        "label": "量化加速"
      },
      {
        "from": "cutegen",
        "to": "autokernel",
        "label": "迭代优化"
      }
    ],
    "milestones": [
      "halide",
      "tvm",
      "mlir"
    ]
  },
  "algos": [
    {
      "id": "llvm",
      "num": 1,
      "name": "LLVM",
      "fullName": "底层虚拟机编译框架 (Low Level Virtual Machine)",
      "year": "2004",
      "org": "UIUC",
      "parent": "—",
      "paperUrl": "https://ieeexplore.ieee.org/abstract/document/1281665/",
      "projectUrl": "",
      "category": "infrastructure",
      "motivation": "提供硬件无关IR，实现编译器组件高度解耦复用",
      "summary": "LLVM 的核心目标是：提供硬件无关IR，实现编译器组件高度解耦复用。",
      "keyPoints": [
        "核心动机：提供硬件无关IR，实现编译器组件高度解耦复用",
        "代表机构：UIUC"
      ],
      "detail": "<p>提供硬件无关IR，实现编译器组件高度解耦复用</p>"
    },
    {
      "id": "halide",
      "num": 2,
      "name": "Halide",
      "fullName": "计算调度分离图像编译语言 (Halide)",
      "year": "2013",
      "org": "MIT/Google",
      "parent": "—",
      "paperUrl": "https://dl.acm.org/doi/abs/10.1145/2499370.2462176",
      "projectUrl": "",
      "category": "tensor_ir",
      "motivation": "首创计算与调度分离范式，解决并行性与局部性权衡",
      "summary": "Halide 的核心目标是：首创计算与调度分离范式，解决并行性与局部性权衡。",
      "keyPoints": [
        "核心动机：首创计算与调度分离范式，解决并行性与局部性权衡",
        "代表机构：MIT/Google"
      ],
      "detail": "<p>首创计算与调度分离范式，解决并行性与局部性权衡</p>"
    },
    {
      "id": "tensorrt",
      "num": 3,
      "name": "TensorRT",
      "fullName": "NVIDIA深度学习推理优化引擎 (TensorRT)",
      "year": "2015",
      "org": "NVIDIA",
      "parent": "—",
      "paperUrl": "https://developer.nvidia.com/tensorrt",
      "projectUrl": "",
      "category": "hardware_specific",
      "motivation": "量化校准与算子融合深度集成，实现GPU极致推理性能",
      "summary": "TensorRT 的核心目标是：量化校准与算子融合深度集成，实现GPU极致推理性能。",
      "keyPoints": [
        "核心动机：量化校准与算子融合深度集成，实现GPU极致推理性能",
        "代表机构：NVIDIA"
      ],
      "detail": "<p>量化校准与算子融合深度集成，实现GPU极致推理性能</p>"
    },
    {
      "id": "xla",
      "num": 4,
      "name": "XLA",
      "fullName": "加速线性代数编译器 (Accelerated Linear Algebra)",
      "year": "2017",
      "org": "Google",
      "parent": "—",
      "paperUrl": "https://openxla.org/xla",
      "projectUrl": "",
      "category": "graph_compilers",
      "motivation": "通过HLO IR实现跨算子全局内存优化，解决内存墙问题",
      "summary": "XLA 的核心目标是：通过HLO IR实现跨算子全局内存优化，解决内存墙问题。",
      "keyPoints": [
        "核心动机：通过HLO IR实现跨算子全局内存优化，解决内存墙问题",
        "代表机构：Google"
      ],
      "detail": "<p>通过HLO IR实现跨算子全局内存优化，解决内存墙问题</p>"
    },
    {
      "id": "tvm",
      "num": 5,
      "name": "TVM",
      "fullName": "端到端深度学习自动优化编译框架 (Tensor Virtual Machine)",
      "year": "2018",
      "org": "UW",
      "parent": "halide",
      "paperUrl": "https://www.usenix.org/conference/osdi18/presentation/chen",
      "projectUrl": "",
      "category": "tensor_ir",
      "motivation": "将编译优化转化为搜索问题，ML自动调优替代手工算子",
      "summary": "TVM 的核心目标是：将编译优化转化为搜索问题，ML自动调优替代手工算子。",
      "keyPoints": [
        "核心动机：将编译优化转化为搜索问题，ML自动调优替代手工算子",
        "演化来源：继承或改进自 halide",
        "代表机构：UW"
      ],
      "detail": "<p>将编译优化转化为搜索问题，ML自动调优替代手工算子</p>"
    },
    {
      "id": "autotvm",
      "num": 6,
      "name": "AutoTVM",
      "fullName": "基于模板的张量程序自动调优 (AutoTVM)",
      "year": "2018",
      "org": "UW",
      "parent": "tvm",
      "paperUrl": "https://proceedings.neurips.cc/paper/2018/hash/8b5700012be65c9da25f49408d959ca0-Abstract.html",
      "projectUrl": "",
      "category": "tensor_ir",
      "motivation": "用ML代价模型替代硬件测量，加速模板参数空间搜索",
      "summary": "AutoTVM 提出了一种基于机器学习的张量程序自动优化框架，使用统计代价模型（梯度提升树或 TreeGRU）替代黑盒搜索或手工代价模型来指导调度参数空间探索，并通过可迁移的不变特征表示实现跨工作负载/跨硬件的迁移学习，在 GPU、ARM CPU、ARM GPU 等多种后端上无需外部算子库即可生成超越 cuDNN/TFLite 等专用库的高性能代码。",
      "keyPoints": [
        "<strong>问题建模</strong>：将张量算子优化形式化为 \\(\\min_{s \\in \\mathcal{S}_e} f(g(e, s))\\)，其中 \\(e\\) 为计算表达式，\\(s\\) 为调度配置，\\(g\\) 为代码生成器，\\(f\\) 为硬件执行代价；搜索空间可达数十亿量级",
        "<strong>统计代价模型</strong>：提出两种代价模型——(1) 基于 XGBoost 的梯度提升树（GBT），使用手工设计的循环特征；(2) 基于 TreeGRU 的神经网络模型，直接在低层循环 AST 上学习表示",
        "<strong>排序目标函数</strong>：采用 pairwise rank loss 而非回归损失训练代价模型，绕过绝对代价值建模的困难，只需预测配置间的相对优劣",
        "<strong>探索策略</strong>：使用模拟退火（Simulated Annealing）在调度空间中采样候选配置，结合 ε-greedy 策略和子模函数多样性目标选择批量评估点",
        "<strong>迁移学习</strong>：设计跨工作负载/跨算子类型的可迁移不变表示——GBT 使用 Context Relation Features，TreeGRU 使用 Context Encoded Embedding；全局模型 + 局部模型组合实现 2×–10× 的搜索加速",
        "<strong>端到端评估</strong>：在 NVIDIA TITAN X、ARM Cortex-A53、ARM Mali-T860 三种硬件上，对 ResNet、MobileNet、LSTM、DQN、DCGAN 等工作负载实现 1.2×–3.8× 的端到端加速"
      ],
      "detail": "<h5>4.1 核心框架图</h5>\n<p><img alt=\"AutoTVM 框架总览\" src=\"https://ar5iv.labs.arxiv.org/html/1805.08166/assets/img/overview.png\" />\n<em>图 1：AutoTVM 整体框架。左侧为调度空间定义，中间为统计代价模型 + 探索模块的迭代优化循环，右侧为在真实硬件上的评估反馈。</em></p>\n<p><img alt=\"代价模型架构\" src=\"https://ar5iv.labs.arxiv.org/html/1805.08166/assets/img/model.png\" />\n<em>图 2：两种代价模型架构。(a) GBT 模型使用手工提取的循环特征向量；(b) TreeGRU 模型直接在低层循环 AST 上递归编码。</em></p>\n<p><img alt=\"迁移学习表示\" src=\"https://ar5iv.labs.arxiv.org/html/1805.08166/assets/img/transfer.png\" />\n<em>图 3：不同特征表示的迁移能力对比。配置空间特征仅在域内有效，AST 特征可跨同类算子迁移，Context Relation Features 可跨算子类型迁移。</em></p>\n<h5>4.2 算法伪代码</h5>\n<pre><code class=\"language-python\"># AutoTVM 迭代优化主循环\ndef autotvm_optimize(expression e, schedule_space S_e, hardware H):\n    D = []  # 历史数据集 {(x_i, c_i)}\n    f_hat = initialize_cost_model()  # 统计代价模型\n\n    for iteration in range(T):\n        # Step 1: 探索 — 模拟退火采样候选配置\n        candidates = []\n        for i in range(n_parallel):\n            s_init = random_sample(S_e)\n            s_best = simulated_annealing(\n                s_init, S_e, \n                objective=f_hat,  # 用代价模型评估\n                temperature_schedule=exponential_decay\n            )\n            candidates.append(s_best)\n\n        # Step 2: 多样性感知批量选择\n        batch = greedy_submodular_select(\n            candidates, f_hat, \n            diversity_weight=lambda_,\n            batch_size=B\n        )\n\n        # Step 3: 在真实硬件上评估\n        for s in batch:\n            x = lower_to_ast(g(e, s))  # 生成低层循环 AST\n            c = measure_on_hardware(x, H)  # 真实执行代价\n            D.append((x, c))\n\n        # Step 4: 更新代价模型\n        f_hat.fit(D, objective=&quot;rank_loss&quot;)\n\n    return best_config(D)\n</code></pre>\n<pre><code class=\"language-python\"># 迁移学习：全局模型 + 局部模型\ndef transfer_optimize(expression e, S_e, H, D_source):\n    # 用源域数据训练全局模型（使用不变表示）\n    f_global = train_model(D_source, representation=&quot;invariant&quot;)\n    f_local = initialize_cost_model()\n\n    for iteration in range(T):\n        # 组合预测\n        f_hat = lambda x: f_global(x) + f_local(x)\n\n        # 同上迭代优化流程...\n        batch = explore_and_select(S_e, f_hat)\n        D_local = evaluate_on_hardware(batch, H)\n        f_local.fit(D_local, objective=&quot;rank_loss&quot;)\n\n    return best_config(D_local)\n</code></pre>\n<h5>4.3 方法细节</h5>\n<p><strong>动机与背景：为什么需要学习优化张量程序？</strong></p>\n<p>深度学习系统的性能高度依赖底层张量算子（如卷积、矩阵乘法）的实现效率。传统方法依赖两条路径：一是使用硬件厂商提供的手工优化库（如 cuDNN、MKL），但这些库覆盖的算子有限，无法支持新兴的融合算子和非标准数据布局；二是使用基于多面体模型（Polyhedral）的自动优化，但其手工代价模型难以精确捕捉现代硬件的复杂行为（缓存层次、流水线、线程调度等）。AutoTVM 的核心洞察是：可以将张量程序优化视为一个统计学习问题——通过在真实硬件上收集少量样本来训练代价模型，用学到的模型指导搜索，从而在庞大的调度参数空间中高效找到高性能配置。</p>\n<p><strong>统计代价模型的设计</strong></p>\n<p>AutoTVM 提出了两种互补的代价模型。第一种是基于 XGBoost 的梯度提升树（GBT）模型：对于每个调度配置 \\(s\\)，首先通过代码生成器 \\(g(e,s)\\) 产生低层循环程序，然后从循环嵌套结构中提取特征向量——包括循环的内存访问模式、循环长度、并行度、向量化宽度、展开因子等。这些特征被组织为一个上下文矩阵 \\(Z \\in \\mathbb{R}^{n \\times d}\\)，其中 \\(n\\) 为循环层数，\\(d\\) 为每层的特征维度。GBT 模型直接在展平的特征向量上进行训练。第二种是基于 TreeGRU 的神经网络模型：它将低层循环 AST 视为一棵树，使用 Tree-structured GRU 自底向上递归编码每个节点，最终在根节点获得整个程序的表示向量。TreeGRU 的优势在于无需手工设计特征，可以自动学习程序结构中的关键模式。</p>\n<p>两种模型的训练目标都采用 pairwise rank loss 而非传统的回归损失。具体而言，给定一对样本 \\((x_i, x_j)\\) 及其真实代价 \\(c_i < c_j\\)，排序损失要求模型预测 \\(\\hat{f}(x_i) < \\hat{f}(x_j)\\)。这一设计的动机在于：绝对执行时间受硬件状态波动影响较大，而相对排序更加稳定；优化过程只需要找到最优配置，不需要精确预测绝对代价值。</p>\n<p><strong>探索与利用的平衡</strong></p>\n<p>在调度空间的探索中，AutoTVM 使用模拟退火（SA）作为核心搜索算法。SA 从随机初始配置出发，在每一步随机扰动当前配置（如改变某个 tile 大小或展开因子），根据代价模型的预测值决定是否接受新配置。温度参数随迭代逐步降低，使搜索从全局探索逐渐收敛到局部精化。为了进一步提高搜索效率，AutoTVM 引入了两个机制：(1) ε-greedy 策略——以概率 ε 随机选择候选而非选择模型预测最优的，防止过早陷入局部最优；(2) 子模函数多样性目标——在选择批量评估点时，不仅考虑模型预测的质量，还通过子模函数 \\(L(S) = \\sum_{s \\in S} \\hat{f}(s) + \\lambda \\cdot \\text{diversity}(S)\\) 鼓励选择彼此差异较大的配置，以最大化每批评估的信息增益。</p>\n<p><strong>迁移学习：跨工作负载的知识复用</strong></p>\n<p>AutoTVM 的一个关键创新是迁移学习机制。在实际部署中，编译器需要优化大量不同的算子（不同输入形状、不同算子类型），如果每个算子都从零开始搜索，代价极高。AutoTVM 的核心观察是：调度配置 \\(s\\)（如 tile 大小）在不同工作负载间不具有可比性（因为最优 tile 大小取决于输入尺寸），但低层循环 AST 表示 \\(x = g(e,s)\\) 具有跨工作负载的不变性——无论输入形状如何变化，好的循环结构模式（如良好的内存局部性、充分的并行度）是通用的。</p>\n<p>对于 GBT 模型，AutoTVM 设计了 <strong>Context Relation Features</strong>：将上下文矩阵 \\(Z\\) 视为一组点的集合，通过 log2 间隔的阈值 \\(\\beta_t\\) 提取跨特征的关系：</p>\n<p>$$R_t^{(ij)} = \\max_{k: Z_{kj} < \\beta_t} Z_{ki}$$</p>\n<p>这种表示捕捉了\"当某个特征低于某阈值时，另一个特征的最大值\"这样的关系模式，对输入形状变化具有鲁棒性。对于 TreeGRU 模型，AutoTVM 设计了 <strong>Context Encoded TreeGRU</strong>：将循环节点中的标识符嵌入替换为上下文向量（包含循环长度、访问步长等信息），使模型能够泛化到训练时未见过的循环配置。</p>\n<p>迁移学习的最终预测采用全局模型与局部模型的加法组合：</p>\n<p>$$\\hat{f}(x) = \\hat{f}^{(\\text{global})}(x) + \\hat{f}^{(\\text{local})}(x)$$</p>\n<p>全局模型在源域数据 \\(\\mathcal{D}'\\) 上使用不变表示训练，提供有效的初始预测；局部模型在目标域的少量样本上在线更新，逐步修正全局模型的偏差。实验表明，这种迁移机制可以将搜索速度提升 2×–10×。</p>\n<p><strong>端到端系统集成</strong></p>\n<p>AutoTVM 被集成到 TVM 编译器栈中，实现了从高层计算图到低层硬件代码的全自动优化。与依赖外部库的传统方案不同，AutoTVM 直接生成优化代码，这使得算子融合等图级优化成为可能——传统方案中，如果某个融合算子在库中没有对应实现，就无法进行融合。在 NVIDIA TITAN X 上，AutoTVM 生成的单算子性能与 cuDNN v7 持平甚至更优；在 ARM Cortex-A53 上超越 TFLite；在 ARM Mali GPU 上超越 ARM Compute Library。端到端评估中，AutoTVM 在 ResNet、MobileNet、LSTM、DQN、DCGAN 等工作负载上实现了 1.2×–3.8× 的加速。</p>\n<h5>4.4 核心公式</h5>\n<p><strong>优化目标</strong>：</p>\n<p>$$s^* = \\arg\\min_{s \\in \\mathcal{S}_e} f(g(e, s))$$</p>\n<p>其中 \\(\\mathcal{S}_e\\) 为表达式 \\(e\\) 的调度空间，\\(g\\) 为代码生成器，\\(f\\) 为真实硬件执行代价。</p>\n<p><strong>排序损失函数</strong>（用于训练代价模型）：</p>\n<p>$$\\mathcal{L}_{\\text{rank}} = \\sum_{(i,j): c_i < c_j} \\max\\left(0, \\hat{f}(x_i) - \\hat{f}(x_j) + \\gamma\\right)$$</p>\n<div class=\"key-point\">💡 <strong>关键</strong>：排序损失只要求模型正确预测配置间的相对优劣，不需要精确预测绝对执行时间，对硬件噪声更鲁棒。</div>\n<p><strong>多样性感知批量选择</strong>：</p>\n<p>$$L(S) = \\sum_{s \\in S} \\hat{f}(s) + \\lambda \\sum_{s \\in S} \\min_{s' \\in S, s' \\neq s} d(s, s')$$</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：\\(\\lambda\\) 控制质量与多样性的权衡。实验表明多样性选择在大多数工作负载上无显著负面影响，但在部分工作负载（如 C6）上有正向收益。</div>\n<p><strong>迁移学习组合预测</strong>：</p>\n<p>$$\\hat{f}(x) = \\hat{f}^{(\\text{global})}(x) + \\hat{f}^{(\\text{local})}(x)$$</p>\n<p><strong>Context Relation Features</strong>（GBT 迁移表示）：</p>\n<p>$$R_t^{(ij)} = \\max_{k: Z_{kj} < \\beta_t} Z_{ki}$$</p>\n<p>其中 \\(\\beta_t\\) 为 log2 间隔的阈值序列，\\(Z \\in \\mathbb{R}^{n \\times d}\\) 为循环上下文矩阵。</p>",
      "quiz": {
        "q": "AutoTVM 使用排序损失（rank loss）而非回归损失训练代价模型的主要原因是什么？",
        "options": [
          "排序损失的计算速度更快，可以加速模型训练",
          "回归损失需要归一化处理，实现更复杂",
          "优化只需找到最优配置的相对排序，且排序对硬件测量噪声更鲁棒",
          "排序损失可以直接优化端到端推理延迟"
        ],
        "answer": 2,
        "explain": "AutoTVM 的目标是找到最优调度配置，只需要代价模型正确预测配置间的相对优劣即可，不需要精确的绝对代价值。排序目标绕过了绝对代价建模的困难，对硬件状态波动导致的测量噪声更加鲁棒。"
      }
    },
    {
      "id": "glow",
      "num": 7,
      "name": "Glow",
      "fullName": "图下降神经网络编译器 (Graph Lowering Compiler)",
      "year": "2018",
      "org": "Meta",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/1805.00907",
      "projectUrl": "",
      "category": "graph_compilers",
      "motivation": "两级IR渐进下降结合静态内存规划，提升推理内存效率",
      "summary": "Glow 的核心目标是：两级IR渐进下降结合静态内存规划，提升推理内存效率。",
      "keyPoints": [
        "核心动机：两级IR渐进下降结合静态内存规划，提升推理内存效率",
        "代表机构：Meta"
      ],
      "detail": "<p>两级IR渐进下降结合静态内存规划，提升推理内存效率</p>"
    },
    {
      "id": "ngraph",
      "num": 8,
      "name": "nGraph",
      "fullName": "Intel深度学习统一编译器 (Intel nGraph)",
      "year": "2018",
      "org": "Intel",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/1801.08058",
      "projectUrl": "",
      "category": "graph_compilers",
      "motivation": "框架无关统一IR，解决Intel异构硬件多框架适配问题",
      "summary": "nGraph 的核心目标是：框架无关统一IR，解决Intel异构硬件多框架适配问题。",
      "keyPoints": [
        "核心动机：框架无关统一IR，解决Intel异构硬件多框架适配问题",
        "代表机构：Intel"
      ],
      "detail": "<p>框架无关统一IR，解决Intel异构硬件多框架适配问题</p>"
    },
    {
      "id": "tc",
      "num": 9,
      "name": "TC",
      "fullName": "框架无关高性能张量抽象 (Tensor Comprehensions)",
      "year": "2018",
      "org": "Meta/FAIR",
      "parent": "halide",
      "paperUrl": "https://arxiv.org/abs/1802.04730",
      "projectUrl": "",
      "category": "tensor_ir",
      "motivation": "数学符号描述张量运算，多面体编译自动生成CUDA代码",
      "summary": "Tensor Comprehensions 提出了一种基于 Einstein 记法的张量计算 DSL，结合多面体编译（Polyhedral Compilation）和遗传算法自动调优，能够从高层数学描述自动生成高性能 GPU 内核，在分组卷积等算子上达到 NVIDIA 库 4 倍加速，并已集成到 Caffe2 和 PyTorch 框架中。",
      "keyPoints": [
        "<strong>TC 语言</strong>：基于 Einstein 记法的高层 DSL，支持隐式循环索引推断、自动归约（<code>+=!</code>/<code>min=!</code>/<code>max=!</code>）和 Range Inference（从输入张量形状自动推导输出形状）",
        "<strong>多面体 JIT 编译</strong>：将 TC 转换为 Static Control Part (SCoP) 表示，利用 ISL 库进行仿射变换调度，基于 PPCG 框架自动映射到 CUDA 线程/块层次",
        "<strong>遗传算法自动调优</strong>：种群大小 100、25 代进化，约 6 小时完成一轮搜索；调优参数包括 tile 大小、循环融合策略、共享内存使用比例等",
        "<strong>编译缓存系统</strong>：以 (TC定义, 输入形状, 目标架构) 为键缓存最优 CUDA/PTX 代码，支持 Protocol Buffer 序列化持久化",
        "<strong>框架集成</strong>：通过 ATen 异步张量库集成 Caffe2（生产）和 PyTorch（研究），提供 Python/C++ 双接口",
        "<strong>实验验证</strong>：在 Tesla M40 (Maxwell) 和 P100 (Pascal) 上，分组卷积达 4× 加速，批量矩阵乘 3.6× 加速，生产 LUT 模型 3× 加速"
      ],
      "detail": "<h5>系统架构总览</h5>\n<p><img alt=\"TC 系统架构图\" src=\"https://ar5iv.labs.arxiv.org/html/1802.04730/assets/x1.png\" />\n<em>图：Tensor Comprehensions 端到端编译流程——从高层 TC 语言定义经多面体分析、调度优化、GPU 映射到 CUDA 代码生成</em></p>\n<p>TC 的整体流程分为四个阶段：\n1. <strong>前端解析</strong>：将 TC 语言描述解析为 Halide IR 中间表示\n2. <strong>多面体分析与调度</strong>：转换为 SCoP，利用 ISL 进行依赖分析和仿射变换调度\n3. <strong>GPU 映射</strong>：基于 PPCG 将调度后的循环映射到 CUDA 的 block/thread 层次，插入共享内存 promotion\n4. <strong>代码生成与自动调优</strong>：生成 CUDA 代码，通过 NVRTC 即时编译，遗传算法搜索最优参数组合</p>\n<h5>TC 语言与算法伪代码</h5>\n<p>TC 语言采用类 Einstein 记法，以矩阵乘法为例：</p>\n<pre><code class=\"language-python\"># TC 语言定义：转置矩阵乘法\ndef tmm(float(M, K) A, float(N, K) B) -&gt; (C) {\n    C(m, n) +=! A(m, kk) * B(n, kk)   # +=! 表示先初始化为0再累加归约\n}\n\n# TC 语言定义：分组卷积\ndef gconv(float(N, G, F, C, W, H) I, float(G, F, C, KW, KH) W1) -&gt; (O) {\n    O(n, g, f, w, h) +=! I(n, g, r_c, w + r_kw, h + r_kh) * W1(g, f, r_c, r_kw, r_kh)\n}\n</code></pre>\n<div class=\"key-point\">💡 <strong>关键设计</strong>：以 <code>r_</code> 前缀标记的索引（如 <code>r_c</code>, <code>r_kw</code>）为归约维度，编译器自动推断其范围；<code>+=!</code> 语义确保输出张量先清零再累加，避免数据竞争。</div>\n<h5>多面体编译核心机制</h5>\n<p><strong>动机与背景</strong>：传统深度学习框架依赖手写 CUDA 算子库（如 cuDNN、cuBLAS），每个新算子都需要专家级 GPU 编程。研究者设计新网络层时面临\"性能鸿沟\"——高层数学描述与底层高性能实现之间缺乏自动化桥梁。Halide 虽然分离了算法与调度，但仍需用户手动编写调度策略；XLA 依赖固定的算子融合规则，灵活性不足。</p>\n<p><strong>多面体模型（Polyhedral Model）</strong>：TC 将张量计算转换为 Static Control Part (SCoP)——一种仅包含仿射循环边界和仿射数组访问的程序片段。在此表示下：</p>\n<p>$$S = \\{(i_1, \\ldots, i_n) \\in \\mathbb{Z}^n \\mid A \\cdot \\mathbf{i} + \\mathbf{b} \\geq 0\\}$$</p>\n<p>每个语句实例对应整数格点集合中的一个点，依赖关系可精确表示为仿射关系。ISL（Integer Set Library）提供了高效的整数集合运算，支持：\n- <strong>依赖分析</strong>：精确计算读写依赖（RAW/WAR/WAW）\n- <strong>调度变换</strong>：通过仿射变换矩阵重新排列循环执行顺序，实现 tiling、fusion、interchange 等优化\n- <strong>参数化</strong>：支持符号参数（如 batch size），允许运行时特化</p>\n<p><strong>GPU 映射策略</strong>：基于 PPCG（Polyhedral Parallel Code Generator）框架，将调度后的循环层次映射到 CUDA 的三级并行层次：</p>\n<p>$$\\text{Loop Nest} \\xrightarrow{\\text{outer bands}} \\text{CUDA Blocks} \\xrightarrow{\\text{inner bands}} \\text{CUDA Threads}$$</p>\n<p>映射过程自动处理：\n- <strong>Tiling</strong>：将循环分块以匹配 GPU 的 warp/SM 结构\n- <strong>共享内存 Promotion</strong>：将频繁访问的数据从全局内存提升到共享内存，插入必要的同步屏障（<code>__syncthreads</code>）\n- <strong>寄存器 Promotion</strong>：将线程私有数据提升到寄存器（论文指出此功能尚未完全实现，是性能瓶颈之一）</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：论文坦承在大规模矩阵乘法上 TC 仍比 cuBLAS 慢 3-4 倍，主要原因是缺少寄存器级 tiling 和高级数据搬运优化（如 Scott Gray 文档中的 FU operand reuse 技巧）。</div>\n<h5>遗传算法自动调优</h5>\n<p>自动调优器搜索的参数空间包括：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>参数类别</th>\n<th>具体参数</th>\n<th>说明</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Tiling</td>\n<td>各维度 tile 大小</td>\n<td>影响数据局部性和并行粒度</td>\n</tr>\n<tr>\n<td>Fusion</td>\n<td>循环融合策略</td>\n<td>Max/Min fusion 策略选择</td>\n</tr>\n<tr>\n<td>Memory</td>\n<td>共享内存使用比例</td>\n<td>平衡 occupancy 和数据复用</td>\n</tr>\n<tr>\n<td>Mapping</td>\n<td>block/thread 维度分配</td>\n<td>匹配硬件拓扑</td>\n</tr>\n<tr>\n<td>Unrolling</td>\n<td>展开因子</td>\n<td>减少循环开销</td>\n</tr>\n</tbody>\n</table></div>\n<p>搜索流程：\n1. 初始化种群（100 个随机参数组合）\n2. 每代评估所有个体的实际 GPU 执行时间\n3. 选择 → 交叉 → 变异 → 生成下一代\n4. 25 代后选取最优个体\n5. 结果序列化到编译缓存</p>\n<div class=\"key-point\">💡 <strong>关键</strong>：自动调优的瓶颈不在 GPU 执行，而在 NVRTC 编译——NVRTC v8.0 内部持有全局锁，只能串行编译内核。</div>\n<h5>实验结果与分析</h5>\n<p>在 Tesla P100 (Pascal) 上的关键结果（中位数，单位 μs）：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>算子</th>\n<th>Caffe2/cuDNN</th>\n<th>TC (autotuned)</th>\n<th>加速比</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>分组卷积 (32,32,16,16,14,14)</td>\n<td>1,343</td>\n<td>321</td>\n<td><strong>4.2×</strong></td>\n</tr>\n<tr>\n<td>分组卷积 (32,32,4,4,56,56)</td>\n<td>4,106</td>\n<td>481</td>\n<td><strong>8.5×</strong></td>\n</tr>\n<tr>\n<td>批量矩阵乘 (500,72,26,26)</td>\n<td>192</td>\n<td>53</td>\n<td><strong>3.6×</strong></td>\n</tr>\n<tr>\n<td>生产 LUT-1</td>\n<td>64</td>\n<td>22</td>\n<td><strong>2.9×</strong></td>\n</tr>\n<tr>\n<td>生产 LUT-2</td>\n<td>125</td>\n<td>30</td>\n<td><strong>4.2×</strong></td>\n</tr>\n<tr>\n<td>MLP3 融合层</td>\n<td>131</td>\n<td>46</td>\n<td><strong>2.8×</strong></td>\n</tr>\n<tr>\n<td>大矩阵乘 (128,4096,16384)</td>\n<td>2,431</td>\n<td>8,177</td>\n<td>0.3× (慢)</td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>关键发现</strong>：\n1. <strong>分组卷积优势显著</strong>：cuDNN 对分组卷积的实现未充分优化，TC 的多面体编译能自动发现更好的数据局部性和并行策略\n2. <strong>算子融合收益</strong>：TC 可将多个小算子融合为单个内核（如 MLP 中的矩阵乘+偏置+激活），减少内核启动开销和中间数据搬运\n3. <strong>大矩阵乘的差距</strong>：cuBLAS 经过数十年手工优化，利用了寄存器级 tiling、warp shuffle 等底层技巧，TC 的多面体框架尚未覆盖这些优化\n4. <strong>生产模型验证</strong>：在 Facebook 生产环境的 LUT（Look-Up Table）模型上验证了实际可用性</p>\n<h5>与传统方法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>TC</th>\n<th>Halide</th>\n<th>XLA</th>\n<th>手写 CUDA</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>算法描述</td>\n<td>Einstein 记法</td>\n<td>函数式 + 手动调度</td>\n<td>计算图</td>\n<td>底层代码</td>\n</tr>\n<tr>\n<td>调度自动化</td>\n<td>多面体自动 + 自动调优</td>\n<td>需手写调度</td>\n<td>固定规则</td>\n<td>完全手动</td>\n</tr>\n<tr>\n<td>新算子支持</td>\n<td>改 TC 定义即可</td>\n<td>需写新调度</td>\n<td>需注册算子</td>\n<td>重写 CUDA</td>\n</tr>\n<tr>\n<td>GPU 映射</td>\n<td>PPCG 自动</td>\n<td>手动指定</td>\n<td>模板化</td>\n<td>手动</td>\n</tr>\n<tr>\n<td>峰值性能</td>\n<td>中高（缺寄存器优化）</td>\n<td>中高</td>\n<td>中</td>\n<td>最高</td>\n</tr>\n<tr>\n<td>开发效率</td>\n<td>高</td>\n<td>中</td>\n<td>中高</td>\n<td>低</td>\n</tr>\n</tbody>\n</table></div>",
      "quiz": {
        "q": "Tensor Comprehensions 中 `+=!` 操作符的语义是什么？",
        "options": [
          "原子加操作，保证多线程安全",
          "先将输出张量初始化为零，再进行累加归约",
          "就地累加，不初始化输出张量",
          "并行归约，使用树形规约算法"
        ],
        "answer": 1,
        "explain": "+=! 中的 ! 表示先将输出初始化为加法单位元（零），再进行累加。这与 += 不同，后者假设输出已有值并在其上累加。"
      }
    },
    {
      "id": "jax",
      "num": 10,
      "name": "JAX",
      "fullName": "可组合函数变换加速框架 (JAX)",
      "year": "2018",
      "org": "Google",
      "parent": "xla",
      "paperUrl": "https://github.com/google/jax",
      "projectUrl": "",
      "category": "graph_compilers",
      "motivation": "函数式变换统一自动微分与JIT编译，极简接口极致性能",
      "summary": "JAX 的核心目标是：函数式变换统一自动微分与JIT编译，极简接口极致性能。",
      "keyPoints": [
        "核心动机：函数式变换统一自动微分与JIT编译，极简接口极致性能",
        "演化来源：继承或改进自 xla",
        "代表机构：Google"
      ],
      "detail": "<p>函数式变换统一自动微分与JIT编译，极简接口极致性能</p>"
    },
    {
      "id": "flexflow",
      "num": 11,
      "name": "FlexFlow",
      "fullName": "自动并行化深度学习编译器 (FlexFlow)",
      "year": "2019",
      "org": "Stanford",
      "parent": "—",
      "paperUrl": "https://proceedings.mlsys.org/paper_files/paper/2019/hash/b422680f3db0986ddd7f8f126baaf0fa-Abstract.html",
      "projectUrl": "",
      "category": "graph_compilers",
      "motivation": "SOAP空间统一并行维度搜索，超越数据与模型并行二元对立",
      "summary": "FlexFlow 提出 SOAP（Sample-Operation-Attribute-Parameter）四维并行搜索空间，将数据并行、模型并行和流水线并行统一到一个框架中，并通过执行模拟器（Execution Simulator）+ MCMC 搜索算法自动发现高效的逐算子并行策略，在多种 DNN 上实现了 1.3–3.3× 的训练加速。",
      "keyPoints": [
        "<strong>SOAP 四维搜索空间</strong>：将并行化配置分解为 Sample（批次维度）、Operation（算子间并行）、Attribute（非批次数据维度，如通道/空间）、Parameter（参数复制 vs 切分）四个正交维度",
        "<strong>逐算子粒度的并行策略</strong>：每个算子独立选择并行配置，而非全图统一使用数据并行或模型并行",
        "<strong>执行模拟器</strong>：将算子图 + 设备拓扑 + 并行策略映射为任务图（计算任务 + 通信任务），通过 FIFO 调度模拟预测执行时间，比真实执行快约 1000×",
        "<strong>Delta 模拟算法</strong>：MCMC 每步仅改变一个算子配置，增量更新任务图而非从头模拟，额外加速 2.2–6.9×",
        "<strong>MCMC 优化器</strong>：使用 Metropolis-Hastings 采样搜索策略空间，以 \\(p(\\mathcal{S}) \\propto \\exp(-\\beta \\cdot \\text{cost}(\\mathcal{S}))\\) 为目标分布，兼顾贪心搜索与跳出局部最优",
        "<strong>Legion 分布式运行时</strong>：基于 Legion 实现支持任意维度组合切分的分布式执行引擎",
        "<strong>评估覆盖 CNN + RNN</strong>：在 AlexNet、Inception-v3、ResNet-101、RNNTC、RNNLM、NMT 六个模型上验证，对比数据并行、专家策略、REINFORCE、OptCNN 均有显著提升"
      ],
      "detail": "<h5>1. 问题动机与背景</h5>\n<p>现有深度学习系统的并行化策略存在两个根本局限：</p>\n<ol>\n<li><strong>并行维度受限</strong>：数据并行仅切分批次维度，模型并行仅切分参数维度，无法利用其他维度（如通道、空间维度）的并行机会</li>\n<li><strong>粒度过粗</strong>：整个模型使用同一种并行策略，无法为不同特征的算子（计算密集 vs 通信密集）选择最优配置</li>\n</ol>\n<p>FlexFlow 的核心洞察是：<strong>最优并行策略应该是逐算子、多维度的</strong>——不同算子可能适合不同的并行方式，且每个算子可以同时在多个维度上切分。</p>\n<h5>2. SOAP 搜索空间</h5>\n<p><img alt=\"FlexFlow SOAP 搜索空间示意图\" src=\"https://arxiv.org/html/1807.05358v6/extracted/figures/parallelism.png\" />\n<em>图：SOAP 四维并行空间统一了数据并行（Sample 维度）、模型并行（Operation + Attribute 维度）和流水线并行（Operation 维度）</em></p>\n<p>对于算子图 \\(\\mathcal{G} = (\\mathcal{O}, \\mathcal{E})\\)（\\(\\mathcal{O}\\) 为算子集合，\\(\\mathcal{E}\\) 为依赖边），并行策略 \\(\\mathcal{S}\\) 为每个算子 \\(o_i\\) 指定一个并行配置 \\(c_i\\)：</p>\n<p>$$\\mathcal{S} = \\{c_1, c_2, \\ldots, c_{|\\mathcal{O}|}\\}$$</p>\n<p>每个配置 \\(c_i\\) 定义了在各可并行维度上的切分度（degree of parallelism）。以矩阵乘法 \\(Y = X \\times W\\) 为例，可并行维度包括：\n- <strong>Sample 维度</strong>：切分批次维度，每个设备处理不同的样本子集\n- <strong>Attribute 维度</strong>：切分输出通道等非批次维度\n- <strong>Parameter 维度</strong>：决定权重是复制（replicate）还是切分（partition）</p>\n<p>各维度切分度的乘积等于分配的设备数：</p>\n<p>$$\\prod_{d \\in \\text{dims}(o_i)} \\text{degree}(c_i, d) = |\\text{devices}(c_i)|$$</p>\n<div class=\"key-point\">💡 <strong>关键</strong>：SOAP 空间的指数级大小（\\(\\prod_{i} |C_i|\\)，其中 \\(|C_i|\\) 为算子 \\(o_i\\) 的可选配置数）使得穷举不可行，这正是需要高效搜索算法的原因。</div>\n<h5>3. 执行模拟器</h5>\n<p>执行模拟器是 FlexFlow 的核心组件，它将并行策略的评估从真实硬件执行（分钟级）转化为模拟预测（毫秒级）。</p>\n<p><strong>任务图构建</strong>：给定算子图 \\(\\mathcal{G}\\)、设备拓扑 \\(\\mathcal{D}\\)、并行策略 \\(\\mathcal{S}\\)，模拟器构建任务图 \\(\\mathcal{T} = (\\mathcal{T}_N, \\mathcal{T}_E)\\)：</p>\n<ul>\n<li><strong>计算任务</strong>：每个算子 \\(o_i\\) 根据配置 \\(c_i\\) 被拆分为 \\(|c_i|\\) 个计算任务，每个任务在一个设备上执行</li>\n<li><strong>通信任务</strong>：当两个有依赖关系的任务被分配到不同设备时，插入通信任务</li>\n</ul>\n<p><strong>四个关键假设</strong>：\n- <strong>A1</strong>（可预测的任务执行时间）：同一算子的相同大小子任务执行时间一致，通过 profiling 获取\n- <strong>A2</strong>（带宽模型）：通信时间 = \\(s / b\\)，其中 \\(s\\) 为数据大小，\\(b\\) 为带宽\n- <strong>A3</strong>（FIFO 调度）：同一设备上的任务按就绪时间先进先出执行\n- <strong>A4</strong>（可忽略的运行时开销）：任务调度等运行时开销相比计算和通信可忽略</p>\n<p><strong>Full Simulation 算法</strong>（Dijkstra 变体）：</p>\n<pre><code class=\"language-python\"># Algorithm 1: Full Simulation\ndef full_simulate(G, D, S):\n    T = build_task_graph(G, D, S)\n    ready_queue = PriorityQueue(key=lambda t: t.ready_time)\n\n    for t in T.nodes:\n        t.state = NOT_READY\n        if t.has_no_predecessors():\n            t.state = READY\n            ready_queue.enqueue(t)\n\n    while not ready_queue.empty():\n        t = ready_queue.dequeue()\n        d = t.device\n        t.state = COMPLETE\n        t.start_time = max(t.ready_time, d.last_task.end_time)\n        t.end_time = t.start_time + t.exe_time\n        d.last_task = t\n\n        for n in t.successors():\n            n.ready_time = max(n.ready_time, t.end_time)\n            if all(p.state == COMPLETE for p in n.predecessors()):\n                n.state = READY\n                ready_queue.enqueue(n)\n\n    return max(t.end_time for t in T.nodes)\n</code></pre>\n<h5>4. Delta 模拟算法</h5>\n<p>MCMC 搜索每步仅修改一个算子的配置，因此大部分执行时间线不变。Delta 模拟算法利用这一特性，仅重新模拟受影响的任务：</p>\n<pre><code class=\"language-python\"># Algorithm 2: Delta Simulation\ndef delta_simulate(T, G, D, old_config, new_config):\n    T, changed_tasks = update_task_graph(T, G, D, old_config, new_config)\n    update_queue = PriorityQueue(key=lambda t: t.ready_time)\n    update_queue.enqueue_all(changed_tasks)\n\n    while not update_queue.empty():\n        t = update_queue.dequeue()\n        t.start_time = max(t.ready_time, t.prev_task_on_device.end_time)\n        t.end_time = t.start_time + t.exe_time\n\n        for n in t.successors():\n            if update_task(n):  # readyTime or startTime changed\n                update_queue.push(n)\n        if update_task(t.next_task_on_device):\n            update_queue.push(t.next_task_on_device)\n\n    return max(t.end_time for t in T.nodes)\n</code></pre>\n<div class=\"key-point\">💡 <strong>关键</strong>：Delta 模拟类似 Bellman-Ford 的增量松弛——只传播变化，不重建整个时间线。在 64 GPU 场景下可额外加速 3.0–6.9×。</div>\n<h5>5. MCMC 搜索优化器</h5>\n<p>FlexFlow 将并行策略优化转化为代价最小化问题。由于搜索空间是 NP-hard（可归约到最小 makespan 问题），采用 MCMC 采样启发式搜索：</p>\n<p><strong>概率分布定义</strong>：</p>\n<p>$$p(\\mathcal{S}) \\propto \\exp\\big(-\\beta \\cdot \\text{cost}(\\mathcal{S})\\big)$$</p>\n<p><strong>Metropolis-Hastings 接受准则</strong>：</p>\n<p>$$\\alpha(\\mathcal{S} \\to \\mathcal{S}^*) = \\min\\Big(1, \\exp\\big(\\beta \\cdot (\\text{cost}(\\mathcal{S}) - \\text{cost}(\\mathcal{S}^*))\\big)\\Big)$$</p>\n<p><strong>提案生成</strong>：随机选择一个算子，将其并行配置替换为随机配置。该提案分布满足对称性 \\(q(\\mathcal{S}|\\mathcal{S}^*) = q(\\mathcal{S}^*|\\mathcal{S})\\)。</p>\n<p><strong>搜索流程</strong>：\n1. 以数据并行和随机策略作为初始候选\n2. 对每个初始策略，迭代提案直到：(a) 时间预算耗尽，或 (b) 半个搜索时间内无法改进最优策略\n3. 返回搜索过程中发现的最优策略</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：MCMC 的关键优势在于——当新策略更优时必定接受，当新策略更差时仍有概率接受（概率随代价差增大而指数衰减），从而能跳出局部最优。</div>\n<h5>6. 与现有方法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>数据并行</th>\n<th>模型并行</th>\n<th>REINFORCE</th>\n<th>OptCNN</th>\n<th><strong>FlexFlow</strong></th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>搜索空间</td>\n<td>仅 Sample</td>\n<td>仅 Operation</td>\n<td>Operation (设备放置)</td>\n<td>Sample + Attribute</td>\n<td><strong>SOAP 全维度</strong></td>\n</tr>\n<tr>\n<td>搜索粒度</td>\n<td>全图统一</td>\n<td>全图统一</td>\n<td>逐算子</td>\n<td>逐算子</td>\n<td><strong>逐算子</strong></td>\n</tr>\n<tr>\n<td>搜索方法</td>\n<td>无需搜索</td>\n<td>手动设计</td>\n<td>强化学习</td>\n<td>动态规划</td>\n<td><strong>MCMC + 模拟器</strong></td>\n</tr>\n<tr>\n<td>支持非线性图</td>\n<td>✓</td>\n<td>✓</td>\n<td>✓</td>\n<td>✗</td>\n<td><strong>✓</strong></td>\n</tr>\n<tr>\n<td>搜索时间</td>\n<td>—</td>\n<td>—</td>\n<td>12–27 小时</td>\n<td>秒级</td>\n<td><strong>分钟级</strong></td>\n</tr>\n<tr>\n<td>硬件需求</td>\n<td>—</td>\n<td>—</td>\n<td>160 节点</td>\n<td>1 节点</td>\n<td><strong>1 节点</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>关键实验结果</strong>：\n- 对比数据并行和专家策略：<strong>1.3–3.3× 加速</strong>\n- 对比 REINFORCE：<strong>3.4–3.8× 加速</strong>，搜索时间从 12–27 小时降至 14–40 秒\n- 对比 OptCNN（非线性图）：<strong>1.2–1.6× 加速</strong>\n- 模拟器精度：预测时间与实际执行时间误差在 30% 以内，且保持策略间的相对排序\n- Inception-v3 端到端训练：比 TensorFlow 减少 38% 训练时间</p>\n<h5>7. 发现的策略洞察</h5>\n<p>FlexFlow 自动发现的最优策略揭示了几个重要洞察：</p>\n<ol>\n<li><strong>关键路径上用 intra-op 并行</strong>：Inception-v3 中，关键路径上的算子使用 intra-operation 并行（切分 Sample/Attribute），非关键路径的分支使用 inter-operation 并行，减少 75% 参数同步开销</li>\n<li><strong>参数多计算少的层减少设备数</strong>：NMT 的 embedding 层仅在少量设备上执行，减少参数同步</li>\n<li><strong>参数多计算重的层用通道切分</strong>：NMT 的 softmax 层按通道维度切分，每个设备只需部分参数，兼顾负载均衡和通信效率</li>\n<li><strong>感知设备拓扑</strong>：在非对称 GPU 连接（如 K80 集群）中，策略倾向于将相关算子放在有直连的 GPU 上</li>\n</ol>",
      "quiz": {
        "q": "FlexFlow 的 SOAP 搜索空间中，Attribute 维度对应的是什么？",
        "options": [
          "训练样本的批次维度切分（即数据并行）",
          "不同算子分配到不同设备（即流水线并行）",
          "非批次的数据维度切分（如通道、空间维度等）",
          "模型参数的复制或切分方式"
        ],
        "answer": 2,
        "explain": "Attribute 维度指的是张量中除批次维度外的其他数据维度（如卷积的通道维度、空间维度），切分这些维度可以实现传统数据并行和模型并行之外的并行方式。Sample 对应选项0，Operation 对应选项1，Parameter 对应选项3。"
      }
    },
    {
      "id": "triton",
      "num": 12,
      "name": "Triton",
      "fullName": "分块神经网络计算中间语言与编译器 (Triton)",
      "year": "2019",
      "org": "OpenAI",
      "parent": "—",
      "paperUrl": "https://dl.acm.org/doi/abs/10.1145/3315508.3329973",
      "projectUrl": "",
      "category": "tensor_ir",
      "motivation": "Tile抽象屏蔽GPU细节，非专家也能写出高性能内核",
      "summary": "Triton 的核心目标是：Tile抽象屏蔽GPU细节，非专家也能写出高性能内核。",
      "keyPoints": [
        "核心动机：Tile抽象屏蔽GPU细节，非专家也能写出高性能内核",
        "代表机构：OpenAI"
      ],
      "detail": "<p>Tile抽象屏蔽GPU细节，非专家也能写出高性能内核</p>"
    },
    {
      "id": "tiramisu",
      "num": 13,
      "name": "Tiramisu",
      "fullName": "多面体深度学习编译器 (Tiramisu)",
      "year": "2019",
      "org": "MIT",
      "parent": "—",
      "paperUrl": "https://ieeexplore.ieee.org/abstract/document/8661197/",
      "projectUrl": "",
      "category": "tensor_ir",
      "motivation": "四层多面体表示自动推导依赖，数学严谨保证变换正确性",
      "summary": "Tiramisu 的核心目标是：四层多面体表示自动推导依赖，数学严谨保证变换正确性。",
      "keyPoints": [
        "核心动机：四层多面体表示自动推导依赖，数学严谨保证变换正确性",
        "代表机构：MIT"
      ],
      "detail": "<p>四层多面体表示自动推导依赖，数学严谨保证变换正确性</p>"
    },
    {
      "id": "relay",
      "num": 14,
      "name": "Relay",
      "fullName": "深度学习高层函数式图IR (Relay)",
      "year": "2019",
      "org": "UW/Apache",
      "parent": "tvm",
      "paperUrl": "https://arxiv.org/abs/1904.08368",
      "projectUrl": "",
      "category": "infrastructure",
      "motivation": "函数式静态类型图IR，支持复杂图优化与类型推断",
      "summary": "Relay 提出了一种基于函数式编程的静态类型中间表示（IR），将深度学习计算图扩展为支持一等函数、递归控制流和代数数据类型的完整语言，在保持与传统框架持平或更优性能的同时，实现了对复杂模型（如 TreeLSTM）的表达、可组合优化 Pass 的设计，以及从 GPU 到 FPGA 加速器的跨硬件可移植代码生成。",
      "keyPoints": [
        "<strong>函数式 IR 设计</strong>：在计算图基础上引入 let 绑定（显式共享与作用域）、一等函数（高阶抽象与递归）、if 条件分支、代数数据类型 ADT（list/tree 等复杂结构），形成类 OCaml/SML 的严格函数式语言",
        "<strong>类型系统与推断</strong>：Tensor 类型携带形状信息；引入 Type Relation 机制处理算子间复杂形状约束（如广播语义）；基于 Hindley-Milner 的类型推断 + 约束求解器自动推导全图类型与形状",
        "<strong>算子融合</strong>：基于后支配树（post-dominator tree）识别可融合子图，提取为 primitive 函数后由 TVM 生成硬件特定的融合代码，支持非线性（菱形）数据流融合",
        "<strong>通用量化框架</strong>：三步流程 Annotate → Calibrate → Realize，通过程序重写规则将 FP32 模型转为 INT8/INT16，支持用户自定义量化策略与舍入方式",
        "<strong>可组合优化 Pass</strong>：融合、常量折叠、算子布局变换、公共子表达式消除等 Pass 可自由组合，效果因模型和硬件而异",
        "<strong>跨硬件可移植性</strong>：同一 IR 可编译到 CPU（x86/ARM）、GPU（NVIDIA）、FPGA 加速器，无需修改模型代码",
        "<strong>评估覆盖广泛</strong>：视觉（ResNet/MobileNet/VGG）+ NLP（CharRNN/TreeLSTM/GRU/LSTM），在推理性能上匹配或超越 TensorFlow、PyTorch、MxNet"
      ],
      "detail": "<p><img alt=\"Relay IR 语法定义\" src=\"https://arxiv.org/html/1904.08368v1/extracted/figures/relay_grammar.png\" />\n<em>图：Relay 的核心语法定义，包括表达式（let/if/fn/match）、类型（Tensor/Function/ADT）和声明（类型定义与全局函数）。来源：论文 Figure 1</em></p>\n<pre><code class=\"language-python\"># Relay 算子融合伪代码\ndef fuse_ops(relay_expr):\n    # Step 1: Extraction — 构建数据流 DAG 并计算后支配树\n    dag = build_dataflow_dag(relay_expr)\n    post_dom_tree = compute_post_dominator(dag)\n\n    # 按后支配关系将算子分组为等价类\n    groups = {}\n    for node in dag.nodes:\n        dominator = post_dom_tree.immediate_dominator(node)\n        groups.setdefault(dominator, []).append(node)\n\n    # Step 2: 为每个融合组构建 primitive 函数\n    fused_funcs = []\n    for dom, members in groups.items():\n        body = build_fused_expr(members)\n        free_vars = collect_free_variables(body)\n        fn = Function(params=free_vars, body=body, is_primitive=True)\n        fused_funcs.append(fn)\n\n    # Step 3: Lowering — TVM 生成硬件特定代码\n    for fn in fused_funcs:\n        tvm_compute = collect_tvm_exprs(fn)        # 收集各算子的 TVM 计算描述\n        fused_compute = combine(tvm_compute)         # 合并为聚合表达式\n        schedule = select_master_schedule(fn)        # 选择主调度模板\n        compiled_fn = tvm.build(fused_compute, schedule, target)\n    return replace_with_compiled(relay_expr, fused_funcs)\n</code></pre>\n<p><strong>动机与背景：计算图 IR 的三重困境</strong></p>\n<p>传统深度学习框架（TensorFlow、PyTorch、MxNet）的核心抽象是计算图——一个由算子节点和张量边组成的有向无环图。这种表示在早期 CNN 时代足够使用，但随着模型复杂度的爆炸式增长，计算图暴露出三个根本性缺陷：（1）<strong>表达力不足</strong>——缺乏词法作用域、一等函数和递归，无法自然表达 TreeLSTM、动态路由等依赖数据的控制流，框架不得不引入 <code>tf.while_loop</code>、<code>tf.cond</code> 等临时构造，这些构造对后续优化不透明；（2）<strong>优化不可组合</strong>——没有类型系统和作用域信息，活跃性分析、常量传播等经典编译优化难以精确实施，各优化 Pass 之间存在隐式耦合；（3）<strong>可移植性差</strong>——图级优化与底层代码生成紧密绑定，新增硬件后端需要大量重复工作。Relay 的核心洞察是：函数式编程语言的设计原则（不可变绑定、静态类型、高阶函数、模式匹配）恰好能系统性地解决这三个问题。</p>\n<p><strong>核心机制：从计算图到函数式语言的四步扩展</strong></p>\n<p>Relay 在计算图之上逐步引入四个语言特性，每一步都解决一个具体问题：</p>\n<ol>\n<li>\n<p><strong>Let 绑定</strong>：<code>let x = e1 in e2</code> 引入词法作用域和显式共享。计算图中节点的多次引用是隐式的（通过边），这导致 TensorFlow 需要插入虚拟控制边来强制副作用顺序。Let 绑定使共享和求值顺序都变得显式，为活跃性分析和内存规划提供了精确的程序结构信息。</p>\n</li>\n<li>\n<p><strong>一等函数与递归</strong>：<code>fn(x, y) { body }</code> 加上命名递归。计算图本质上是一个从多输入到多输出的单一计算，缺乏函数抽象。一等函数使 Relay 能将 <code>tf.while_loop</code> 自然表达为尾递归函数（如论文 Figure 2 所示），将 <code>tf.cond</code> 表达为 if-else，极大简化了前端导入器的实现。</p>\n</li>\n<li>\n<p><strong>代数数据类型（ADT）</strong>：通过类型声明和模式匹配支持 list、tree 等递归数据结构。这使得 TreeLSTM 等在树结构上递归的模型可以直接在 IR 中表达，而非退化为固定展开的图。</p>\n</li>\n<li>\n<p><strong>类型系统</strong>：Relay 的类型系统是整个优化框架的基石。Tensor 类型 <code>Tensor[shape, dtype]</code> 携带静态形状信息，用于指导内存分配、循环优化和硬件张量化。对于算子间复杂的形状关系（如 <code>broadcast_add</code> 的输出形状依赖两个输入的广播规则），Relay 引入了 <strong>Type Relation</strong> 机制：每个算子注册一个用元语言实现的关系函数，类型检查器在每个调用点实例化并求解这些关系。整个推断过程基于 Hindley-Milner 算法扩展：先遍历 AST 生成类型变量和关系约束，再通过二部图依赖求解器迭代求解，最后标注每个子表达式的类型。</p>\n</li>\n</ol>\n<p><strong>优化流程：融合、量化与可组合 Pass</strong></p>\n<p>Relay 的优化体系围绕两个旗舰优化展开：</p>\n<ul>\n<li>\n<p><strong>算子融合</strong>是性能提升的最大来源（GPU 上尤为显著）。Relay 的融合算法优于传统方法的关键在于：（a）基于后支配树而非简单的线性链匹配，能处理菱形数据流（一个输入被多条并行链消费后再合并）；（b）融合后由 TVM 重新调度，可进行循环内联、自动调优等进一步优化；（c）对任意新增算子自动生效，因为所有算子都有 TVM 计算描述。实验显示，融合在 GPU 上为 ResNet-18 带来约 2× 加速。</p>\n</li>\n<li>\n<p><strong>通用量化框架</strong>采用三步编译器重写：Annotate 阶段在每个算子输入/输出插入模拟量化节点 <code>simQ</code>；Calibrate 阶段在真实数据上运行模型以确定 scale 和 range 参数；Realize 阶段将 <code>simQ</code> 展开为实际的 cast/shift/clip 操作，随后这些逐元素操作可被融合进原始算子，生成全新的量化算子。这种设计的优势在于量化策略完全由重写规则定义，用户可自由选择 signed/unsigned、floor/ceiling/stochastic rounding 等方案。在 Raspberry Pi 3 上，INT8/INT16 量化将 MobileNet 推理时间降低约 2×，精度损失仅 ~4%。</p>\n</li>\n<li>\n<p><strong>可组合 Pass</strong>：实验（Figure 5）显示，逐步叠加融合 → 常量折叠 → 布局变换 → CSE 四个 Pass 可持续提升性能，但最优组合因模型和硬件而异——CPU 上布局变换最有效（改善缓存局部性），GPU 上融合最有效（减少 kernel launch 开销）。VGG-16 因主要由不可融合的背靠背卷积组成，对融合不敏感；而 ResNet/MobileNet 因残差连接中的逐元素加法而大幅受益。</p>\n</li>\n</ul>\n<p><strong>与传统方法的对比</strong></p>\n<p>与 XLA、Glow、nGraph 等图编译器相比，Relay 的核心差异在于 IR 层面的表达力——这些系统使用受限的计算图 IR，无法表达递归控制流和高阶函数。与 TorchScript 相比，Relay 是静态类型的纯函数式 IR，可进行全程序静态分析，而 TorchScript 需要适应 Python 的动态语义，只能通过 profiling JIT 识别稳定 trace 后再交给底层编译器。与 MLIR 相比，MLIR 是构建 IR 方言的共享基础设施，而 Relay 是一个完整的端到端深度学习编译解决方案。Relay 的设计洞察可以指导 MLIR 方言的开发。</p>\n<div class=\"key-point\">💡 <strong>关键洞察</strong>：Relay 证明了\"零成本抽象\"在深度学习编译器中是可行的——增加 IR 表达力（函数、控制流、ADT）不会损害已有模型的性能（Stroustrup 原则：\"你不用的东西，你不需要为之付出代价\"），同时为复杂模型带来了显著的优化机会。</div>",
      "quiz": {
        "q": "Relay 的算子融合算法使用什么数据结构来识别可融合的子图？",
        "options": [
          "拓扑排序后的线性扫描",
          "后支配树（Post-Dominator Tree）",
          "最小生成树（Minimum Spanning Tree）",
          "强连通分量（Strongly Connected Components）"
        ],
        "answer": 1,
        "explain": "Relay 构建数据流 DAG 的后支配树，按直接后支配关系将算子分组为等价类，这使得它能融合菱形等非线性数据流模式，而非仅限于线性链。"
      }
    },
    {
      "id": "ansor",
      "num": 15,
      "name": "Ansor",
      "fullName": "无模板高性能张量程序自动生成 (Ansor)",
      "year": "2020",
      "org": "UC Berkeley",
      "parent": "autotvm",
      "paperUrl": "https://www.usenix.org/conference/osdi20/presentation/zheng",
      "projectUrl": "",
      "category": "tensor_ir",
      "motivation": "无需专家模板自动构建搜索空间，覆盖更广优化可能性",
      "summary": "Ansor 的核心目标是：无需专家模板自动构建搜索空间，覆盖更广优化可能性。",
      "keyPoints": [
        "核心动机：无需专家模板自动构建搜索空间，覆盖更广优化可能性",
        "演化来源：继承或改进自 autotvm",
        "代表机构：UC Berkeley"
      ],
      "detail": "<p>无需专家模板自动构建搜索空间，覆盖更广优化可能性</p>"
    },
    {
      "id": "mlir",
      "num": 16,
      "name": "MLIR",
      "fullName": "多层中间表示编译基础设施 (Multi-Level Intermediate Representation)",
      "year": "2020",
      "org": "Google",
      "parent": "llvm",
      "paperUrl": "https://ieeexplore.ieee.org/abstract/document/9370308/",
      "projectUrl": "",
      "category": "infrastructure",
      "motivation": "Dialect元框架解决IR碎片化，实现优化Pass高度复用",
      "summary": "MLIR 的核心目标是：Dialect元框架解决IR碎片化，实现优化Pass高度复用。",
      "keyPoints": [
        "核心动机：Dialect元框架解决IR碎片化，实现优化Pass高度复用",
        "演化来源：继承或改进自 llvm",
        "代表机构：Google"
      ],
      "detail": "<p>Dialect元框架解决IR碎片化，实现优化Pass高度复用</p>"
    },
    {
      "id": "akg",
      "num": 17,
      "name": "AKG",
      "fullName": "昇腾NPU自动算子生成器 (Automatic Kernel Generator)",
      "year": "2021",
      "org": "Huawei",
      "parent": "tiramisu",
      "paperUrl": "https://dl.acm.org/doi/10.1145/3453483.3454106",
      "projectUrl": "",
      "category": "hardware_specific",
      "motivation": "多面体技术适配NPU，自动协同异构调度",
      "summary": "AKG 的核心目标是：多面体技术适配NPU，自动协同异构调度。",
      "keyPoints": [
        "核心动机：多面体技术适配NPU，自动协同异构调度",
        "演化来源：继承或改进自 tiramisu",
        "代表机构：Huawei"
      ],
      "detail": "<p>多面体技术适配NPU，自动协同异构调度</p>"
    },
    {
      "id": "iree",
      "num": 18,
      "name": "IREE",
      "fullName": "中间表示执行环境 (Intermediate Representation Execution Environment)",
      "year": "2021",
      "org": "Google",
      "parent": "mlir",
      "paperUrl": "https://arxiv.org/abs/2205.14479",
      "projectUrl": "",
      "category": "infrastructure",
      "motivation": "基于MLIR实现云端到嵌入式全场景ML部署",
      "summary": "IREE 的核心目标是：基于MLIR实现云端到嵌入式全场景ML部署。",
      "keyPoints": [
        "核心动机：基于MLIR实现云端到嵌入式全场景ML部署",
        "演化来源：继承或改进自 mlir",
        "代表机构：Google"
      ],
      "detail": "<p>基于MLIR实现云端到嵌入式全场景ML部署</p>"
    },
    {
      "id": "meta_schedule",
      "num": 19,
      "name": "MetaSchedule",
      "fullName": "概率化张量程序调度框架 (MetaSchedule)",
      "year": "2022",
      "org": "CMU/OctoML",
      "parent": "ansor",
      "paperUrl": "https://proceedings.neurips.cc/paper_files/paper/2022/hash/e894eafae43e68b4c8dfdacf742bcbf3-Abstract-Conference.html",
      "projectUrl": "",
      "category": "tensor_ir",
      "motivation": "概率程序统一调度搜索空间，泛化模板与无模板调优",
      "summary": "MetaSchedule 的核心目标是：概率程序统一调度搜索空间，泛化模板与无模板调优。",
      "keyPoints": [
        "核心动机：概率程序统一调度搜索空间，泛化模板与无模板调优",
        "演化来源：继承或改进自 ansor",
        "代表机构：CMU/OctoML"
      ],
      "detail": "<p>概率程序统一调度搜索空间，泛化模板与无模板调优</p>"
    },
    {
      "id": "flash_attention",
      "num": 20,
      "name": "FlashAttention",
      "fullName": "IO感知精确注意力计算 (FlashAttention)",
      "year": "2022",
      "org": "Stanford",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2205.14135",
      "projectUrl": "",
      "category": "hardware_specific",
      "motivation": "IO感知分块计算精确注意力，突破显存带宽瓶颈",
      "summary": "FlashAttention 的核心目标是：IO感知分块计算精确注意力，突破显存带宽瓶颈。",
      "keyPoints": [
        "核心动机：IO感知分块计算精确注意力，突破显存带宽瓶颈",
        "代表机构：Stanford"
      ],
      "detail": "<p>IO感知分块计算精确注意力，突破显存带宽瓶颈</p>"
    },
    {
      "id": "alpa",
      "num": 21,
      "name": "Alpa",
      "fullName": "自动层间层内并行分布式编译器 (Alpa)",
      "year": "2022",
      "org": "UC Berkeley",
      "parent": "xla",
      "paperUrl": "https://www.usenix.org/conference/osdi22/presentation/zheng-lianmin",
      "projectUrl": "",
      "category": "graph_compilers",
      "motivation": "两级分层优化统一层间与层内并行，自动搜索最优分布式策略",
      "summary": "Alpa 的核心目标是：两级分层优化统一层间与层内并行，自动搜索最优分布式策略。",
      "keyPoints": [
        "核心动机：两级分层优化统一层间与层内并行，自动搜索最优分布式策略",
        "演化来源：继承或改进自 xla",
        "代表机构：UC Berkeley"
      ],
      "detail": "<p>两级分层优化统一层间与层内并行，自动搜索最优分布式策略</p>"
    },
    {
      "id": "torch_dynamo",
      "num": 22,
      "name": "TorchDynamo",
      "fullName": "PyTorch动态字节码编译器 (TorchDynamo + TorchInductor)",
      "year": "2022",
      "org": "Meta",
      "parent": "—",
      "paperUrl": "https://dl.acm.org/doi/abs/10.1145/3620665.3640366",
      "projectUrl": "",
      "category": "infrastructure",
      "motivation": "Python字节码变换实现零侵入动态图编译加速",
      "summary": "TorchDynamo 的核心目标是：Python字节码变换实现零侵入动态图编译加速。",
      "keyPoints": [
        "核心动机：Python字节码变换实现零侵入动态图编译加速",
        "代表机构：Meta"
      ],
      "detail": "<p>Python字节码变换实现零侵入动态图编译加速</p>"
    },
    {
      "id": "bladedisc",
      "num": 23,
      "name": "BladeDISC",
      "fullName": "动态形状机器学习编译优化器 (BladeDISC)",
      "year": "2023",
      "org": "Alibaba",
      "parent": "mlir",
      "paperUrl": "https://dl.acm.org/doi/abs/10.1145/3617327",
      "projectUrl": "",
      "category": "hardware_specific",
      "motivation": "符号形状传播实现动态形状下算子融合，消除频繁重编译",
      "summary": "BladeDISC 的核心目标是：符号形状传播实现动态形状下算子融合，消除频繁重编译。",
      "keyPoints": [
        "核心动机：符号形状传播实现动态形状下算子融合，消除频繁重编译",
        "演化来源：继承或改进自 mlir",
        "代表机构：Alibaba"
      ],
      "detail": "<p>符号形状传播实现动态形状下算子融合，消除频繁重编译</p>"
    },
    {
      "id": "mojo",
      "num": 24,
      "name": "Mojo",
      "fullName": "AI原生系统编程语言 (Mojo)",
      "year": "2023",
      "org": "Modular",
      "parent": "mlir",
      "paperUrl": "https://www.modular.com/mojo",
      "projectUrl": "",
      "category": "infrastructure",
      "motivation": "Python超集语法提供MLIR原生系统级AI编程能力",
      "summary": "Mojo 的核心目标是：Python超集语法提供MLIR原生系统级AI编程能力。",
      "keyPoints": [
        "核心动机：Python超集语法提供MLIR原生系统级AI编程能力",
        "演化来源：继承或改进自 mlir",
        "代表机构：Modular"
      ],
      "detail": "<p>Python超集语法提供MLIR原生系统级AI编程能力</p>"
    },
    {
      "id": "byteir",
      "num": 25,
      "name": "ByteIR",
      "fullName": "字节跳动端到端AI编译器 (ByteIR)",
      "year": "2023",
      "org": "ByteDance",
      "parent": "mlir",
      "paperUrl": "https://github.com/bytedance/byteir",
      "projectUrl": "",
      "category": "infrastructure",
      "motivation": "linalg-ext扩展覆盖复杂AI计算模式",
      "summary": "ByteIR 的核心目标是：linalg-ext扩展覆盖复杂AI计算模式。",
      "keyPoints": [
        "核心动机：linalg-ext扩展覆盖复杂AI计算模式",
        "演化来源：继承或改进自 mlir",
        "代表机构：ByteDance"
      ],
      "detail": "<p>linalg-ext扩展覆盖复杂AI计算模式</p>"
    },
    {
      "id": "openxla",
      "num": 26,
      "name": "OpenXLA",
      "fullName": "开放跨框架XLA编译生态 (OpenXLA)",
      "year": "2023",
      "org": "Google",
      "parent": "xla",
      "paperUrl": "https://github.com/openxla/xla",
      "projectUrl": "",
      "category": "infrastructure",
      "motivation": "StableHLO解耦XLA为跨框架行业标准编译后端",
      "summary": "OpenXLA 的核心目标是：StableHLO解耦XLA为跨框架行业标准编译后端。",
      "keyPoints": [
        "核心动机：StableHLO解耦XLA为跨框架行业标准编译后端",
        "演化来源：继承或改进自 xla",
        "代表机构：Google"
      ],
      "detail": "<p>StableHLO解耦XLA为跨框架行业标准编译后端</p>"
    },
    {
      "id": "relax",
      "num": 27,
      "name": "Relax",
      "fullName": "动态机器学习端到端可组合抽象 (Relax)",
      "year": "2025",
      "org": "Apache TVM",
      "parent": "relay",
      "paperUrl": "https://dl.acm.org/doi/abs/10.1145/3676641.3716249",
      "projectUrl": "",
      "category": "infrastructure",
      "motivation": "符号形状作为一等公民，完美适配LLM动态推理需求",
      "summary": "Relax 的核心目标是：符号形状作为一等公民，完美适配LLM动态推理需求。",
      "keyPoints": [
        "核心动机：符号形状作为一等公民，完美适配LLM动态推理需求",
        "演化来源：继承或改进自 relay",
        "代表机构：Apache TVM"
      ],
      "detail": "<p>符号形状作为一等公民，完美适配LLM动态推理需求</p>"
    },
    {
      "id": "trinity",
      "num": 28,
      "name": "Trinity",
      "fullName": "Tile级等价饱和三维张量程序优化器 (Trinity)",
      "year": "2026",
      "org": "KAIST/FuriosaAI",
      "parent": "ansor",
      "paperUrl": "https://ina.kaist.ac.kr/publications",
      "projectUrl": "",
      "category": "tensor_ir",
      "motivation": "Tile级等价饱和联合优化代数、内存与计算编排",
      "summary": "Trinity 的核心目标是：Tile级等价饱和联合优化代数、内存与计算编排。",
      "keyPoints": [
        "核心动机：Tile级等价饱和联合优化代数、内存与计算编排",
        "演化来源：继承或改进自 ansor",
        "代表机构：KAIST/FuriosaAI"
      ],
      "detail": "<p>Tile级等价饱和联合优化代数、内存与计算编排</p>"
    },
    {
      "id": "redfuser",
      "num": 29,
      "name": "RedFuser",
      "fullName": "级联归约算子自动融合框架 (RedFuser)",
      "year": "2026",
      "org": "Alibaba Cloud",
      "parent": "tvm",
      "paperUrl": "https://arxiv.org/abs/2603.10026",
      "projectUrl": "",
      "category": "tensor_ir",
      "motivation": "增量计算突破缓存限制，自动融合级联归约算子",
      "summary": "RedFuser 的核心目标是：增量计算突破缓存限制，自动融合级联归约算子。",
      "keyPoints": [
        "核心动机：增量计算突破缓存限制，自动融合级联归约算子",
        "演化来源：继承或改进自 tvm",
        "代表机构：Alibaba Cloud"
      ],
      "detail": "<p>增量计算突破缓存限制，自动融合级联归约算子</p>"
    },
    {
      "id": "nautilus",
      "num": 30,
      "name": "Nautilus",
      "fullName": "端到端自动调度张量编译器 (Nautilus)",
      "year": "2026",
      "org": "UIUC",
      "parent": "ansor",
      "paperUrl": "https://arxiv.org/abs/2604.14825",
      "projectUrl": "",
      "category": "tensor_ir",
      "motivation": "端到端自动调度生成FlashAttn级内核",
      "summary": "Nautilus 提出了一种三层 IR 逐级降低的全自动张量编译器架构，通过自动调度器（支持高级算子融合与滚动更新优化）和代数表达式重写，从数学规范自动生成匹敌甚至超越 FlashAttention-3 的高性能 GPU 注意力内核，在 NVIDIA GH200 上实现 1.22× 加速（对比 FlashAttn-2），在 RTX 5090 上实现 1.42× 加速（对比 PyTorch SDPA）。",
      "keyPoints": [
        "<strong>三层 IR 逐级降低架构</strong>：Scalar IR → VR-tile IR（新提出）→ MA-tile IR，实现从标量数学表达到 SIMD 瓦片代码的渐进式编译",
        "<strong>Block Graph 表示</strong>：融合数据依赖图与 AST 的混合图结构，精确追踪计算语句间的依赖关系，支撑调度决策",
        "<strong>自动调度器（Auto-Scheduler）</strong>：支持双层分块（bi-level tiling）、经典融合与滚动更新融合（rolling update，源自 Neptune）、数据局部化（共享内存/寄存器 + 重物化）、正则化等优化",
        "<strong>VR-tile IR 上的代数表达式重写</strong>：支持循环不变量外提（constant hoisting）、<code>exp → exp2</code> 转换、跨迭代除法-乘法消除等代数优化",
        "<strong>多后端自适应</strong>：同时支持 Triton、Tawa、TileLang 三种瓦片编译后端，自动选择最优后端",
        "<strong>自动调优器（Auto-Tuner）</strong>：基于 TVM MetaSchedule 的进化搜索 + 学习代价模型，每个配置仅需 256 次测量",
        "<strong>覆盖 5 个主流模型</strong>：ViT 1.2B、Llama2 7B、Qwen2 7B、Qwen3 8B、GLM-4 9B，支持 FP16/FP8 精度",
        "<strong>数值稳定性</strong>：与 FlashAttention（Tri-Dao）和 FlexAttention 数值误差相当（RMS 绝对误差 ~4.96×10⁻⁵）"
      ],
      "detail": "<h5>系统架构总览</h5>\n<p><img alt=\"Nautilus 系统架构图\" src=\"https://arxiv.org/html/2604.14825v1/x1.png\" />\n<em>图：Nautilus 编译流程——从 TVM TE 数学规范出发，经过 Block Graph 构建、自动调度、三层 IR 逐级降低，最终生成多后端 GPU 内核</em></p>\n<p>Nautilus 的输入是 TVM Tensor Expression (TE) 格式的数学规范，描述注意力算子的纯代数语义（如 softmax、矩阵乘法的组合）。编译器首先构建 <strong>Block Graph</strong>，然后由 <strong>自动调度器</strong> 在 Block Graph 上搜索最优调度策略，接着通过 <strong>三层 IR 逐级降低</strong> 生成最终的 GPU 内核代码。</p>\n<h5>Block Graph：混合依赖-AST 图</h5>\n<p>Block Graph 是 Nautilus 的核心中间表示之一，它将传统的数据依赖图与抽象语法树（AST）结合为统一结构：</p>\n<ul>\n<li><strong>节点</strong>：每个节点代表一个计算语句（compute statement），对应一个张量的定义</li>\n<li><strong>边</strong>：既表示数据依赖关系（哪个张量被哪个计算消费），也保留 AST 的层次结构信息</li>\n<li><strong>作用</strong>：为自动调度器提供精确的依赖分析基础，支持融合决策和分块策略</li>\n</ul>\n<h5>自动调度器（Auto-Scheduler）</h5>\n<p>自动调度器是 Nautilus 的核心创新之一，包含四个关键调度原语：</p>\n<p><strong>1. 双层分块（Bi-level Tiling）</strong></p>\n<p>将计算空间划分为两级瓦片：外层瓦片映射到 GPU 的线程块（thread block），内层瓦片映射到 warp 级别。分块大小是可调参数，由自动调优器搜索。</p>\n<pre><code class=\"language-python\"># 双层分块伪代码\nfor block_tile in outer_tiles:        # 映射到 GPU thread blocks\n    for warp_tile in inner_tiles:      # 映射到 warps\n        compute(block_tile, warp_tile)\n</code></pre>\n<p><strong>2. 算子融合（Operator Fusion）</strong></p>\n<p>支持两种融合策略：\n- <strong>经典融合</strong>：将多个算子合并到同一个内核中执行，减少全局内存读写\n- <strong>滚动更新融合（Rolling Update）</strong>：源自 Neptune 的高级融合策略，允许在线（online）计算模式——在注意力计算中，softmax 的归一化因子随着 KV 序列的迭代逐步更新，而非等待所有数据就绪后一次性计算</p>\n<div class=\"key-point\">💡 关键：滚动更新融合是 Nautilus 能自动发现 FlashAttention 风格内核的核心机制。FlashAttention 的核心思想正是通过在线 softmax 避免将完整的注意力矩阵写入全局内存。</div>\n<p><strong>3. 数据局部化（Data Localization）</strong></p>\n<p>将频繁访问的数据从全局内存提升到更快的存储层次：\n- <strong>共享内存（Shared Memory）</strong>：线程块内共享的片上缓存\n- <strong>寄存器（Registers）</strong>：每个线程私有的最快存储\n- <strong>重物化（Rematerialization）</strong>：当寄存器/共享内存不足时，选择重新计算而非缓存某些中间结果</p>\n<p><strong>4. 正则化（Regularization）</strong></p>\n<p>确保生成的调度方案符合下游瓦片后端（Triton/Tawa/TileLang）的约束条件，例如瓦片大小必须是 2 的幂、warp 数量限制等。</p>\n<h5>三层 IR 逐级降低</h5>\n<p>Nautilus 的编译管线通过三层 IR 实现从高层数学语义到底层 GPU 代码的渐进式转换：</p>\n<p><strong>Scalar IR（标量 IR）</strong></p>\n<p>最高层表示，直接对应数学公式。每个元素独立计算，没有瓦片或并行化的概念：</p>\n<pre><code class=\"language-python\"># Scalar IR 示例：注意力计算\nfor i in range(N):\n    for j in range(N):\n        S[i][j] = sum(Q[i][k] * K[j][k] for k in range(d))\n    m[i] = max(S[i][j] for j in range(N))\n    for j in range(N):\n        P[i][j] = exp(S[i][j] - m[i])\n    l[i] = sum(P[i][j] for j in range(N))\n    for j in range(d):\n        O[i][j] = sum(P[i][k] * V[k][j] for k in range(N)) / l[i]\n</code></pre>\n<p><strong>VR-tile IR（虚拟寄存器瓦片 IR）——核心创新</strong></p>\n<p>Nautilus 新提出的中间表示，类似于编译器中的 <code>mem2reg</code> 变换。关键特性：\n- 引入 <strong>for-loop 表达式</strong>：将循环体内的计算表示为带有归约语义的表达式\n- 支持 <strong>代数表达式重写</strong>：在瓦片级别应用代数优化规则\n- 作为 Scalar IR 和 MA-tile IR 之间的桥梁</p>\n<p>VR-tile IR 上的表达式重写规则包括：</p>\n<p>$$\\text{exp}(x) \\rightarrow \\text{exp2}(x \\cdot \\log_2 e)$$</p>\n<p>$$\\frac{a}{b} \\cdot b \\rightarrow a \\quad \\text{（跨迭代除法-乘法消除）}$$</p>\n<p>$$\\text{loop-invariant hoisting: } \\forall i.\\, f(c) \\rightarrow c' = f(c);\\, \\forall i.\\, c'$$</p>\n<div class=\"key-point\">💡 关键：VR-tile IR 的设计使得 Nautilus 能在瓦片级别执行传统编译器在标量级别才能做的代数优化，这是其超越手写内核的关键能力之一。</div>\n<p><strong>MA-tile IR（内存感知瓦片 IR）</strong></p>\n<p>最低层表示，直接对应 SIMD 瓦片操作。MA-tile IR 是 Triton、Tawa、TileLang 等瓦片语言的超集：\n- 显式表示共享内存和寄存器的数据放置\n- 包含流水线（pipelining）和异步拷贝等硬件特性\n- 可直接翻译为任一后端的代码</p>\n<h5>多后端代码生成</h5>\n<p>Nautilus 支持三种瓦片编译后端，并自动选择性能最优的：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>后端</th>\n<th>特点</th>\n<th>适用场景</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><strong>Triton</strong></td>\n<td>OpenAI 开发，生态成熟</td>\n<td>通用场景</td>\n</tr>\n<tr>\n<td><strong>Tawa</strong></td>\n<td>支持 Hopper/Blackwell TMA 指令</td>\n<td>长序列、新硬件</td>\n</tr>\n<tr>\n<td><strong>TileLang</strong></td>\n<td>基于 TVM，灵活性高</td>\n<td>短序列、小 batch</td>\n</tr>\n</tbody>\n</table></div>\n<p>自动调优器会为每种后端分别搜索最优参数，最终选择延迟最低的方案。</p>\n<h5>自动调优器（Auto-Tuner）</h5>\n<p>基于 TVM MetaSchedule 框架的进化搜索策略：\n- <strong>搜索空间</strong>：瓦片大小、warp 数量、流水线级数、后端选择等\n- <strong>代价模型</strong>：学习型代价模型预筛选候选方案\n- <strong>测量</strong>：每个配置编译并实际运行 256 次取中位数\n- <strong>时间开销</strong>：自动调度搜索通常 &lt; 1 分钟（得益于激进剪枝），自动调优 &lt; 10 分钟</p>\n<h5>实验评估</h5>\n<p><strong>硬件平台</strong>：NVIDIA GH200（Hopper 架构）和 NVIDIA RTX 5090（Blackwell 架构）</p>\n<p><strong>端到端模型性能（FP16 注意力层延迟）</strong>：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>平台</th>\n<th>对比 FlashAttn-2</th>\n<th>对比 PyTorch SDPA</th>\n<th>对比 FlexAttn</th>\n<th>对比 Tawa</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>GH200 FP16</td>\n<td><strong>1.22×</strong></td>\n<td><strong>1.23×</strong></td>\n<td><strong>1.13×</strong></td>\n<td><strong>1.05×</strong></td>\n</tr>\n<tr>\n<td>GH200 FP8</td>\n<td>—</td>\n<td>—</td>\n<td><strong>1.16×</strong></td>\n<td><strong>1.20×</strong></td>\n</tr>\n<tr>\n<td>RTX 5090 FP16</td>\n<td><strong>1.26×</strong></td>\n<td><strong>1.42×</strong></td>\n<td><strong>1.16×</strong></td>\n<td><strong>1.01×</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>关键发现</strong>：\n- ViT 模型获益最大（GH200 上对 SDPA 加速达 1.54×），因为 ViT 的注意力配置（少层、少头、小隐藏维度）不被基线系统充分优化\n- FP8 精度下优势更大，因为 Nautilus 能自动调整流水线级数（1-4 级）适配不同序列长度\n- 在 RTX 5090 长序列场景下，滚动更新优化提供了显著加速</p>\n<p><strong>消融实验</strong>（Global Attention, seq_len=256, GH200）：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>配置</th>\n<th>延迟 (μs)</th>\n<th>相对完整系统</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Nautilus 完整系统</td>\n<td><strong>7.43</strong></td>\n<td>1.00×</td>\n</tr>\n<tr>\n<td>去除自动调优</td>\n<td>9.09</td>\n<td>0.82×</td>\n</tr>\n<tr>\n<td>去除自动调优 + 表达式重写</td>\n<td>9.45</td>\n<td>0.79×</td>\n</tr>\n<tr>\n<td>去除自动调度</td>\n<td>10.93</td>\n<td>0.68×</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"warn-box\">⚠️ 注意：自动调度器贡献了最大的性能提升（去除后延迟增加 47%），表明高层调度决策比底层参数调优更为关键。</div>\n<p><strong>数值稳定性</strong>（使用 Qwen2.5 真实输入，FP64 参考实现）：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>平均 RMS 绝对误差</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Nautilus</td>\n<td>4.96×10⁻⁵</td>\n</tr>\n<tr>\n<td>Tri-Dao Attention</td>\n<td>4.90×10⁻⁵</td>\n</tr>\n<tr>\n<td>FlexAttention</td>\n<td>5.02×10⁻⁵</td>\n</tr>\n</tbody>\n</table></div>\n<p>Nautilus 的数值误差与手写库相当，验证了其代数重写的正确性。</p>\n<h5>与相关工作的对比</h5>\n<ul>\n<li><strong>vs. Neptune</strong>：Neptune 受限于 Triton 后端的代码生成质量（在 Hopper/Blackwell 上仅达 Tawa/TileLang 的 0.5-0.8×），Nautilus 通过多后端支持克服了这一瓶颈</li>\n<li><strong>vs. Mirage</strong>：Mirage 是超优化器，搜索可能产生语义不等价的变换（需概率正确性检验），Nautilus 保证变换的正确性</li>\n<li><strong>vs. Flashlight</strong>：Flashlight 绑定 PyTorch TorchInductor + Triton，优化有限；Nautilus 提供完整的三层优化管线</li>\n<li><strong>vs. 手写库（cuDNN, FlashInfer）</strong>：Nautilus 在大多数配置下匹配或超越手写库性能</li>\n</ul>",
      "quiz": {
        "q": "Nautilus 的 VR-tile IR 在编译管线中的核心作用是什么？",
        "options": [
          "直接生成 GPU PTX 汇编代码",
          "作为标量 IR 和瓦片 IR 之间的桥梁，支持瓦片级别的代数表达式重写",
          "管理 GPU 共享内存的分配和释放",
          "实现多 GPU 之间的通信调度"
        ],
        "answer": 1,
        "explain": "VR-tile IR 是 Nautilus 新提出的中间表示，位于 Scalar IR 和 MA-tile IR 之间，其核心创新在于引入 for-loop 表达式，使得代数优化规则（如常量外提、exp→exp2 转换、跨迭代除法消除）能在瓦片级别执行。"
      }
    },
    {
      "id": "linear_layouts",
      "num": 31,
      "name": "Linear Layouts",
      "fullName": "F2域线性映射张量布局编译 (Linear Layouts)",
      "year": "2026",
      "org": "NVIDIA",
      "parent": "triton",
      "paperUrl": "https://arxiv.org/abs/2505.23819",
      "projectUrl": "",
      "category": "tensor_ir",
      "motivation": "F2域线性映射建模布局，自动推导布局转换消除组合爆炸",
      "summary": "Linear Layouts 的核心目标是：F2域线性映射建模布局，自动推导布局转换消除组合爆炸。",
      "keyPoints": [
        "核心动机：F2域线性映射建模布局，自动推导布局转换消除组合爆炸",
        "演化来源：继承或改进自 triton",
        "代表机构：NVIDIA"
      ],
      "detail": "<p>F2域线性映射建模布局，自动推导布局转换消除组合爆炸</p>"
    },
    {
      "id": "event_tensor",
      "num": 32,
      "name": "Event Tensor",
      "fullName": "动态Megakernel编译统一抽象 (Event Tensor)",
      "year": "2026",
      "org": "ByteDance",
      "parent": "triton",
      "paperUrl": "https://arxiv.org/abs/2604.13327",
      "projectUrl": "",
      "category": "tensor_ir",
      "motivation": "符号变量统一动态Megakernel抽象",
      "summary": "Event Tensor 提出了一种将**事件（任务完成信号）组织为多维张量**的编译器 IR 抽象，使编译器能够以统一方式表达 tile 级细粒度依赖、符号化动态形状和数据依赖的动态性，从而将整个 LLM 推理子图编译为单个持久化 Megakernel，消除 kernel launch 开销并实现跨算子流水线化。",
      "keyPoints": [
        "<strong>Event Tensor 抽象</strong>：将事件（任务完成信号）组织为多维数组，作为编译器 IR 中的一等公民，以张量形式紧凑表达 tile 间的细粒度生产者-消费者依赖关系",
        "<strong>三大动态性支持</strong>：(1) 细粒度 tile 级依赖打破全局同步屏障；(2) 符号化形状支持避免按形状重编译；(3) 数据依赖动态性（如 MoE 路由）通过运行时事件更新与任务触发实现",
        "<strong>双调度策略</strong>：静态调度（预计算 SM 任务队列 + notify/wait 信号量）适用于可预测负载；动态调度（GPU 上轻量级 push/pop 任务调度器）适用于数据依赖的不规则负载",
        "<strong>ETC 编译器</strong>：基于 Apache TVM 实现的端到端编译流水线，将 Event Tensor 图变换为持久化 Megakernel，Event Tensor 降级为整数张量 + 硬件原子操作",
        "<strong>评估覆盖</strong>：GEMM+ReduceScatter/AllGather+GEMM 通信融合（最高 1.40x 加速）、MoE 层（最高 1.23x 加速）、端到端 LLM serving（Qwen3-30B-A3B 低 batch 下 1.48x/1.20x 优于 vLLM/SGLang）、warmup 时间从 583s/123s 降至 35s"
      ],
      "detail": "<p><img alt=\"Event Tensor 总览\" src=\"https://arxiv.org/html/2604.13327v1/x2.png\" />\n<em>图：Event Tensor 概览。(a) 细粒度依赖：生产者 tile 完成后通过 Event Tensor 通知消费者 tile；(b) 符号化形状动态性：Event Tensor 维度可为符号变量；(c) 数据依赖动态性：运行时根据 MoE 路由结果更新 Event Tensor 并触发任务。</em></p>\n<pre><code class=\"language-python\"># Algorithm 1: Static Scheduling Transformation in ETC (简化伪代码)\ndef static_scheduling_transform(mod, G):\n    &quot;&quot;&quot;\n    输入: mod — 包含 tile 级数据流图 G（带 Event Tensor 依赖）的模块\n    输出: 融合后的静态调度 megakernel\n    &quot;&quot;&quot;\n    mod_updated = mod.copy()\n    static_schedule = generate_static_schedule(G)       # 预计算每个 SM 的任务队列\n    fused_kernel = new_persistent_kernel()\n    fused_kernel.add_buffer(static_schedule)             # 将调度表嵌入全局内存\n\n    for task_grid in G:\n        fused_kernel.add_dispatch_logic(task_grid)       # 分派逻辑\n        for event in task_grid.in_edges:\n            fused_kernel.add_wait_logic(event)           # wait(): 自旋等待计数器归零\n        fused_kernel.add_tile_logic(task_grid)           # 实际 tile 计算\n        for event in task_grid.out_edges:\n            fused_kernel.add_notify_logic(event)         # notify(): 原子递减计数器\n\n    mod_updated.replace(G, fused_kernel)\n    return mod_updated\n\n# Algorithm 2: Dynamic Scheduling Transformation (简化伪代码)\ndef dynamic_scheduling_transform(mod, G):\n    mod_updated = mod.copy()\n    fused_kernel = new_persistent_kernel()\n    scheduler = GPUScheduler()                           # GPU 上的轻量级任务队列\n    fused_kernel.add_pop_logic(scheduler.f_pop_tasks)    # SM 空闲时 pop 就绪任务\n\n    for task_grid in G:\n        fused_kernel.add_dispatch_logic(task_grid)\n        fused_kernel.add_tile_logic(task_grid)\n        for event in task_grid.out_edges:\n            # 任务完成 → 原子递减 → 计数器归零时 push 消费者任务\n            fused_kernel.add_complete_on_logic(event, scheduler.f_push_tasks)\n\n    mod_updated.replace(G, fused_kernel)\n    return mod_updated\n</code></pre>\n<p><strong>动机与背景：GPU Kernel Launch 开销与粗粒度同步的瓶颈。</strong> 现代 LLM 推理（尤其是低 batch 解码阶段）中，单个 kernel 的计算时间可能仅有几十微秒，而每次 kernel launch 的开销为 5–10μs，这意味着 launch 开销可占总时间的显著比例。传统方案中，CUDA Graph 可以减少 launch 开销，但要求静态输入形状，无法处理 MoE 等数据依赖的动态工作负载。已有的 Megakernel 方案（如 MPK、TKMega）仅支持单 batch 密集模型推理，缺乏对动态形状和数据依赖动态性的系统化编译器支持。Event Tensor 的核心洞察是：<strong>将事件抽象为张量</strong>，使得编译器可以用统一的张量操作语义来表达、分析和变换 tile 间的细粒度依赖关系，从而将多个算子融合为单个持久化 Megakernel。</p>\n<p><strong>核心机制：Event Tensor 的三大能力。</strong> Event Tensor \\(E \\in \\mathbb{Z}^{d_1 \\times d_2 \\times \\cdots \\times d_n}\\) 是一个多维整数数组，其中每个元素 \\(E[i_1, i_2, \\ldots, i_n]\\) 是一个事件计数器，初始值等于其生产者任务的数量。生产者 tile 完成后调用 <code>notify()</code> 对计数器执行原子递减；消费者 tile 在执行前调用 <code>wait()</code> 自旋等待计数器归零。这一机制的关键优势在于：</p>\n<ol>\n<li>\n<p><strong>细粒度依赖</strong>：传统方案中，算子 A 和算子 B 之间存在全局同步屏障——B 必须等待 A 的所有 tile 完成。Event Tensor 将依赖粒度细化到 tile 级别：若 GEMM 的输出被按行分块，则 Reduce-Scatter 的第 \\(j\\) 个 tile 只需等待 GEMM 中产出第 \\(j\\) 行块的那些 tile 完成即可开始执行，实现了<strong>跨算子流水线化</strong>。形式化地，对于 GEMM（M 方向分 \\(m\\) 块，K 方向分 \\(k\\) 块）+ Reduce-Scatter 的融合，Event Tensor 形状为 \\(E \\in \\mathbb{Z}^{m}\\)，每个 \\(E[j]\\) 的初始计数为 \\(k\\)（即 GEMM 沿 K 维的分块数），当所有 \\(k\\) 个 GEMM tile 完成对第 \\(j\\) 行的累加后，\\(E[j]\\) 归零，RS 的第 \\(j\\) 个 tile 即可执行。</p>\n</li>\n<li>\n<p><strong>符号化形状动态性</strong>：Event Tensor 的维度可以是符号变量（如 \\(E \\in \\mathbb{Z}^{s}\\)，其中 \\(s\\) 在编译时未知）。编译器生成的代码中，notify/wait 的索引计算保留符号表达式，运行时绑定具体值即可，无需按形状重编译。对于静态调度，编译器采样一组代表性形状预计算调度表，未见形状复用下一个更大采样值的执行队列。</p>\n</li>\n<li>\n<p><strong>数据依赖动态性</strong>：MoE 中 token 到 expert 的路由在运行时才确定。ETC 引入 <code>topk</code> 和 <code>exp_indptr</code> 等运行时值来动态更新 Event Tensor 的内容和触发条件。例如，MoE 第一阶段 GroupGEMM 完成后，根据实际路由结果动态设置第二阶段 GroupGEMM 的 Event Tensor 计数器，实现了<strong>运行时自适应的依赖图</strong>。</p>\n</li>\n</ol>\n<p><strong>静态 vs 动态调度的权衡与编译流程。</strong> ETC 提供两种调度变换：静态调度将 tile 级任务预分配到每个 SM 的执行队列中（round-robin 策略），依赖通过 notify/wait 信号量处理，适用于通信融合等可预测负载（如 AllGather+GEMM 的环形算法）。动态调度在 GPU 上维护一个集中式任务队列，任务完成后通过原子操作将就绪的消费者任务 push 入队，空闲 SM 通过 pop 获取任务，适用于 MoE 等不规则负载。实验表明（Table 2-3），MoE 负载下动态调度比静态调度快最多 4%，而规则密集负载下静态调度比动态调度快 20%+（动态调度在分布式场景下的远程队列 push 开销显著）。ETC 的端到端编译流程为：计算图 → 图级优化（内存规划等）→ tile 级优化（指令映射、流水线策略）→ 静态/动态调度变换 → 持久化 kernel 代码生成 → 权重预取 pass → 静态调度表物化。最终，Event Tensor 被降级为普通整数张量，notify/wait 被降级为硬件原子操作（<code>atomicSub</code> + spin-wait），运行时状态仅包含整数张量和调度器任务队列，无需传统 task-graph 运行时的图物化开销。</p>\n<p><strong>实验亮点与关键数据。</strong> 在 8×NVIDIA B200 上的评估显示：(1) GEMM+ReduceScatter 和 AllGather+GEMM 融合分别取得最高 1.40x 加速（对比 cuBLAS+NCCL 非融合基线），超越 TP-Async、Triton-Dist 和 cuBLASMp；(2) Qwen3-30B-A3B 的完整 MoE 层在 1024 tokens 下取得 1.23x 加速（对比 Triton/FlashInfer 的多 kernel 方案）；(3) 端到端 serving 中，Qwen3-30B-A3B 在 batch=1 时 TPOT 比 vLLM 快 1.48x、比 SGLang 快 1.20x；(4) 模型 warmup 时间从 SGLang 的 583s、vLLM 的 123s 降至 35s（AOT 编译消除了 JIT/CUDA Graph capture 开销）。这些结果验证了 Event Tensor 抽象在统一处理细粒度依赖、形状动态性和数据依赖动态性方面的有效性。</p>\n<div class=\"key-point\">💡 <strong>关键洞察</strong>：Event Tensor 的核心创新在于将\"事件\"提升为编译器 IR 中的一等张量类型，使得依赖关系可以像数据张量一样被索引、切片和符号化推导。这使得编译器能够自动完成从多 kernel 到单 Megakernel 的融合变换，而无需手工编写复杂的同步逻辑。</p>\n<p>⚠️ <strong>局限性</strong>：动态调度在分布式多 GPU 场景下的远程任务队列 push 开销较大（Table 3 显示动态调度比静态调度慢 15-20%）；编译器生成的 GEMM tile 在某些配置下不如 cuBLAS 优化充分；当前实现的 CPU 端 serving 引擎开销高于 SGLang 的高度优化调度器。</div>",
      "quiz": {
        "q": "Event Tensor 中 notify() 和 wait() 操作的底层实现机制是什么？",
        "options": [
          "notify() 执行原子加操作，wait() 检查计数器是否达到阈值",
          "notify() 执行原子递减操作，wait() 自旋等待计数器归零",
          "notify() 向全局队列 push 消息，wait() 从队列 pop 消息",
          "notify() 触发 CPU 端中断，wait() 阻塞 GPU 线程直到 CPU 响应"
        ],
        "answer": 1,
        "explain": "Event Tensor 被降级为整数张量，每个元素初始化为生产者数量。notify() 通过 atomicSub 递减计数器，wait() 自旋等待计数器归零，全部在 GPU 端通过硬件原子操作完成，无需 CPU 参与。"
      }
    },
    {
      "id": "triton_distributed",
      "num": 33,
      "name": "Triton-Distributed",
      "fullName": "分布式AI系统重叠内核编译器 (Triton-Distributed)",
      "year": "2026",
      "org": "Community",
      "parent": "triton",
      "paperUrl": "https://arxiv.org/abs/2504.19442",
      "projectUrl": "",
      "category": "tensor_ir",
      "motivation": "原生通信-计算重叠优化，64卡44x加速",
      "summary": "Triton-Distributed 将 OpenSHMEM 单边通信原语原生集成到 Triton 编译器中，提出 MPMD 编程模型（对称内存 + 信号交换 + 异步任务），使开发者仅用数百行 Python 代码即可编写计算-通信重叠内核，在 Nvidia/AMD GPU 上覆盖 AllGather、ReduceScatter、AllToAll 等 12 种分布式算子，性能达到或超越 FLUX、DeepEP 等手写 CUDA 实现。",
      "keyPoints": [
        "<strong>首个原生支持通信-计算重叠的编译器</strong>：在 Triton 编译栈中集成分布式通信能力，覆盖 13 项重叠优化技术（对比 FLUX 缺 4 项、NCCL 缺 7 项）",
        "<strong>MPMD 编程模型</strong>：基于三个核心概念——对称内存（Symmetric Memory）、信号交换（Signal Exchange）、异步任务（Async-Tasks），将通信与计算统一在 Python 级 DSL 中",
        "<strong>OpenSHMEM 单边通信标准</strong>：采用 <code>put/get/signal_set/signal_wait</code> 等 PGAS 原语，避免传统 MPI 双边通信的同步开销",
        "<strong>拓扑感知 Tile Swizzle</strong>：针对 Nvidia NVSwitch 和 AMD 全网格拓扑设计不同的 tile 调度策略，最大化互联带宽利用率",
        "<strong>低延迟协议（LL Protocol）</strong>：利用 <code>multimem_st</code> 广播指令和 8 字节原子 store/load 实现 \\(\\mu s\\) 级 AllGather，适用于推理场景",
        "<strong>跨平台支持</strong>：同一编程模型同时支持 Nvidia H800 和 AMD MI308X GPU，编译栈通过 bitcode 库适配不同后端",
        "<strong>12 种优化内核</strong>：涵盖 AG+GEMM、GEMM+RS、AG+MoE、MoE+RS、FlashDecode+AG、AllToAll 的节点内/跨节点变体，最高达 44.97× 加速（vs NCCL/RCCL）"
      ],
      "detail": "<h5>1. 问题背景与动机</h5>\n<p>在大规模分布式 AI 训练和推理中，计算（GEMM、Attention 等）与通信（AllGather、ReduceScatter、AllToAll）的重叠是提升端到端性能的关键。然而，现有方案存在以下问题：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方案</th>\n<th>问题</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>PyTorch + NCCL</td>\n<td>计算与通信完全串行，无重叠</td>\n</tr>\n<tr>\n<td>FLUX (手写 CUDA)</td>\n<td>高性能但代码量巨大、难以维护、仅支持 Nvidia</td>\n</tr>\n<tr>\n<td>DeepEP</td>\n<td>数千行 CUDA 实现 AllToAll，极难移植</td>\n</tr>\n<tr>\n<td>TileLink</td>\n<td>编译器方案但不支持跨节点通信</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 <strong>核心洞察</strong>：通信-计算重叠需要在<strong>编译器层面</strong>原生支持，而非在应用层手动拼接。Triton-Distributed 是首个将分布式通信作为一等公民集成到 tile-level 编译器中的系统。</div>\n<h5>2. 系统架构与编译栈</h5>\n<p><img alt=\"Triton-Distributed 编译栈\" src=\"https://arxiv.org/html/2504.19442v1/x2.png\" />\n<em>图：Triton-Distributed 编译流程——从 Python DSL 到多后端 GPU 代码</em></p>\n<p>编译流程分为四层：</p>\n<ol>\n<li><strong>Python DSL 层</strong>：用户使用 <code>@triton.jit</code> 装饰器编写内核，调用 <code>tl.extra.cuda.experimental_device_tensormap_create2d</code> 等通信原语</li>\n<li><strong>Triton IR 层</strong>：通信原语被 lower 为 Triton IR 中的 <code>ExternElementwiseOp</code></li>\n<li><strong>LLVM IR 层</strong>：通信原语通过链接预编译的 <strong>bitcode 库</strong>（包含 NVSHMEM/ROC_SHMEM 实现）转化为设备特定的 LLVM IR</li>\n<li><strong>后端代码生成</strong>：LLVM IR 编译为 PTX（Nvidia）或 AMDGCN（AMD）</li>\n</ol>\n<div class=\"warn-box\">⚠️ <strong>关键设计</strong>：通信原语不在 Triton IR 层做特殊处理，而是通过 bitcode 库在 LLVM IR 层链接，这使得添加新原语只需扩展 bitcode 库，无需修改编译器前端。</div>\n<h5>3. MPMD 编程模型的三个核心概念</h5>\n<pre><code class=\"language-python\"># === 核心概念 1: 对称内存 (Symmetric Memory) ===\n# 所有 rank 分配相同虚拟地址的共享内存区域\nT = symm_alloc(size)          # 每个 rank 分配对称内存\nremote_ptr = remote_ptr(T, r) # 获取 rank r 上 T 的远程指针\n# 可直接读写远程 rank 的内存，无需对端参与\n\n# === 核心概念 2: 信号交换 (Signal Exchange) ===\nS = symm_alloc(signal_size)   # 信号也存储在对称内存中\nset_signal(S + rank)          # 设置本地信号（通知数据就绪）\nwait_signal(S + r)            # 等待远程 rank 的信号\n# 信号机制实现生产者-消费者同步\n\n# === 核心概念 3: 异步任务 (Async-Tasks) ===\n# 不同 threadblock 映射到不同角色\nif BLOCK_ID &lt; num_comm_blocks:\n    # 通信任务：负责数据搬运\n    comm_task(...)\nelse:\n    # 计算任务：负责 GEMM 等计算\n    compute_task(...)\n# 通信和计算在硬件上空间并行执行\n</code></pre>\n<div class=\"key-point\">💡 <strong>MPMD vs SPMD</strong>：传统 Triton 采用 SPMD（所有 threadblock 执行相同程序），Triton-Distributed 采用 MPMD（不同 threadblock 可执行不同程序），这是实现通信-计算重叠的关键——通信 threadblock 和计算 threadblock 可以并行工作。</div>\n<h5>4. 通信原语体系</h5>\n<p>Triton-Distributed 的通信原语分为两类：</p>\n<p><strong>OpenSHMEM 标准原语</strong>（可移植）：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>原语</th>\n<th>功能</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>shmem_put</code> / <code>shmem_get</code></td>\n<td>单边远程写/读</td>\n</tr>\n<tr>\n<td><code>shmem_signal_set</code> / <code>shmem_signal_wait</code></td>\n<td>信号设置/等待</td>\n</tr>\n<tr>\n<td><code>shmem_barrier_all</code></td>\n<td>全局屏障同步</td>\n</tr>\n<tr>\n<td><code>shmem_fence</code></td>\n<td>内存栅栏</td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>非标准原语</strong>（平台特定，高性能）：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>原语</th>\n<th>功能</th>\n<th>用途</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>consume_token</code></td>\n<td>无副作用的数据依赖</td>\n<td>建立编译器可见的依赖链</td>\n</tr>\n<tr>\n<td><code>notify</code></td>\n<td>轻量级通知</td>\n<td>替代重量级 barrier</td>\n</tr>\n<tr>\n<td><code>multimem_st</code></td>\n<td>NVLink 广播写</td>\n<td>1.5μs 内广播到节点内所有 rank</td>\n</tr>\n<tr>\n<td><code>atomic_add</code></td>\n<td>远程原子加</td>\n<td>ReduceScatter 中的远程归约</td>\n</tr>\n</tbody>\n</table></div>\n<h5>5. AllGather 的 Push 与 Pull 模式</h5>\n<pre><code class=\"language-python\"># ===== Push 模式 AllGather (Algorithm 1) =====\n# 每个 rank 主动将本地数据推送到所有其他 rank\ndef allgather_push(T, S, L, RANK, WORLD_SIZE):\n    # 1. 将本地数据 L 复制到对称内存 T 的对应位置\n    T[RANK * L.size : (RANK+1) * L.size] = L\n    set_signal(S[RANK])           # 通知本地数据就绪\n    barrier_all()                  # 确保所有 rank 可见\n\n    # 2. 将本地数据推送到每个远程 rank\n    for r in range(WORLD_SIZE):\n        if r != RANK:\n            remote_buf = remote_ptr(T, r) + RANK * L.size\n            remote_buf[:] = L              # 单边写入远程内存\n            set_signal(S[r] + RANK)        # 通知远程 rank\n\n# ===== Pull 模式 AllGather (Algorithm 2) =====\n# 每个 rank 主动从所有其他 rank 拉取数据\ndef allgather_pull(T, S, L, RANK, WORLD_SIZE):\n    T[RANK * L.size : (RANK+1) * L.size] = L\n    set_signal(S[RANK])\n    barrier_all()\n\n    for r in range(WORLD_SIZE):\n        if r != RANK:\n            remote_buf = remote_ptr(T, r) + r * L.size\n            local_dst = T + r * L.size\n            local_dst[:] = remote_buf[:]   # 从远程拉取\n            set_signal(S[r])\n</code></pre>\n<div class=\"key-point\">💡 <strong>Push vs Pull 权衡</strong>：Push 模式省去同步开销但数据到达顺序不可控；Pull 模式需要 barrier 确保远程数据就绪但可精确控制读取顺序。实际选择取决于下游计算是否需要特定数据顺序。</div>\n<h5>6. 低延迟 AllGather（推理场景）</h5>\n<p>推理场景中消息尺寸小，传播延迟是主要瓶颈。论文提出两项关键优化：</p>\n<p><strong>Multimem 广播</strong>：利用 Nvidia PTX 的 <code>multimem_st</code> 指令，一次写操作即可将数据广播到节点内所有 rank，耗时约 1.5μs（vs 循环 P2P 最差 1.5μs × 多跳）。</p>\n<p><strong>LL（Low-Latency）协议</strong>：利用 GPU 8 字节 store/load 的跨 rank 原子性，将数据和标志位打包在 8 字节中一起发送：</p>\n<p>$$\\text{LL\\_packet} = [\\underbrace{\\text{data}}_{\\text{4 bytes}} \\| \\underbrace{\\text{flag}}_{\\text{4 bytes}}]$$</p>\n<p>接收端通过自旋锁检查 flag 是否等于期望值来判断数据是否到达，避免了额外的信号操作开销。</p>\n<div class=\"warn-box\">⚠️ <strong>LL 协议的代价</strong>：消息大小翻倍（因为 flag 占一半空间），因此仅适用于小消息场景。大消息仍使用标准 OpenSHMEM 原语。</div>\n<h5>7. 拓扑感知 Tile Swizzle 策略</h5>\n<p>Tile Swizzle 是控制 threadblock 到 tile 坐标映射顺序的优化，直接影响通信-计算重叠效率。</p>\n<p><strong>Nvidia H800（NVSwitch 拓扑）</strong>：任意两个 GPU 间带宽均为 200 GB/s，因此每步只需从一个 rank 拉取数据即可达到峰值带宽。Swizzle 策略为：每个 rank 从不同起始位置开始计算，逐步轮转拉取下一个 rank 的数据。</p>\n<p><strong>AMD MI308X（全网格拓扑）</strong>：每条链路仅 50 GB/s，需要同时从所有 7 个 rank 拉取数据才能达到聚合带宽 350 GB/s。Swizzle 策略为：将每个 chunk 进一步切分为 sub-chunk，每步同时从所有 rank 拉取一组 sub-chunk。</p>\n<pre><code>Nvidia Swizzle (4 ranks):\n  Step 1: Rank0→本地, Rank1→从Rank0拉, Rank2→从Rank1拉, Rank3→从Rank2拉\n  Step 2: Rank0→从Rank3拉, Rank1→本地, Rank2→从Rank0拉, Rank3→从Rank1拉\n  ...（轮转）\n\nAMD Swizzle (4 ranks, 从 Rank0 视角):\n  Step 1: 同时从 Rank1/2/3 拉取 sub-chunk_0\n  Step 2: 同时从 Rank1/2/3 拉取 sub-chunk_1\n  ...（并行拉取）\n</code></pre>\n<h5>8. 跨节点 GEMM+ReduceScatter 重叠</h5>\n<p>跨节点 GEMM+RS 是最复杂的重叠场景，分解为三个流水线阶段：</p>\n<p>$$\\text{GEMM+RS}_{\\text{inter}} = \\underbrace{\\text{GEMM}}_{\\text{Stage 1}} \\rightarrow \\underbrace{\\text{Intra-Scatter}}_{\\text{Stage 2}} \\rightarrow \\underbrace{\\text{Inter-Reduce}}_{\\text{Stage 3}}$$</p>\n<ol>\n<li><strong>Stage 1 (GEMM)</strong>：计算产生 tile 级输出</li>\n<li><strong>Stage 2 (Intra-node Scatter)</strong>：通过 NVLink 将 tile 数据分发到节点内其他 rank（每个 rank 执行 7 次远程写 + 1 次本地拷贝，重复 2 次对应 2 个节点）</li>\n<li><strong>Stage 3 (Inter-node Reduce)</strong>：通过 IB 网络进行跨节点归约</li>\n</ol>\n<p>Swizzle 设计的关键是将 Stage 2 的本地拷贝步骤放在末尾，使得远程传输可以与计算最大程度重叠。</p>\n<h5>9. 性能评估</h5>\n<p>在 H800 和 MI308X GPU 集群上的关键性能数据：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>内核</th>\n<th>硬件</th>\n<th>对比基线</th>\n<th>加速比</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>AG+GEMM-inter</td>\n<td>16×H800</td>\n<td>PyTorch+NCCL</td>\n<td>1.33×</td>\n</tr>\n<tr>\n<td>GEMM+RS-inter</td>\n<td>16×H800</td>\n<td>PyTorch+NCCL</td>\n<td>1.42×</td>\n</tr>\n<tr>\n<td>AG+MoE-inter</td>\n<td>16×H800</td>\n<td>PyTorch+NCCL</td>\n<td><strong>26.50×</strong></td>\n</tr>\n<tr>\n<td>MoE+RS-inter</td>\n<td>16×H800</td>\n<td>PyTorch+NCCL</td>\n<td>5.16×</td>\n</tr>\n<tr>\n<td>AllToAll Dispatch</td>\n<td>8-64×H800</td>\n<td>DeepEP</td>\n<td>1.18×</td>\n</tr>\n<tr>\n<td>AllToAll Combine</td>\n<td>8-64×H800</td>\n<td>DeepEP</td>\n<td>1.44×</td>\n</tr>\n<tr>\n<td>AG+GEMM-intra</td>\n<td>8×MI308X</td>\n<td>PyTorch+RCCL</td>\n<td>1.09×</td>\n</tr>\n<tr>\n<td>GEMM+RS-intra</td>\n<td>8×MI308X</td>\n<td>PyTorch+RCCL</td>\n<td>1.16×</td>\n</tr>\n<tr>\n<td>Low-latency AG (PCIe)</td>\n<td>8×L20</td>\n<td>NCCL</td>\n<td><strong>3.11×</strong></td>\n</tr>\n<tr>\n<td>Low-latency AG (PCIe)</td>\n<td>16×L20</td>\n<td>NVSHMEM-64bit</td>\n<td>1.31×</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 <strong>开发效率对比</strong>：AllToAll 内核仅用数百行 Python 代码实现，而 DeepEP 需要数千行 CUDA 代码，且 Triton-Distributed 版本性能持平甚至更优。</div>\n<h5>10. 与现有方案的重叠能力对比</h5>\n<p>论文定义了 13 项重叠优化技术，各方案覆盖情况：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>优化技术</th>\n<th style=\"text-align: center;\">Triton-Distributed</th>\n<th style=\"text-align: center;\">FLUX</th>\n<th style=\"text-align: center;\">NCCL</th>\n<th style=\"text-align: center;\">TileLink</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Intra-node Swizzle</td>\n<td style=\"text-align: center;\">✅</td>\n<td style=\"text-align: center;\">✅</td>\n<td style=\"text-align: center;\">❌</td>\n<td style=\"text-align: center;\">✅</td>\n</tr>\n<tr>\n<td>Inter-node Swizzle</td>\n<td style=\"text-align: center;\">✅</td>\n<td style=\"text-align: center;\">✅</td>\n<td style=\"text-align: center;\">❌</td>\n<td style=\"text-align: center;\">❌</td>\n</tr>\n<tr>\n<td>NUMA Swizzle</td>\n<td style=\"text-align: center;\">✅</td>\n<td style=\"text-align: center;\">❌</td>\n<td style=\"text-align: center;\">❌</td>\n<td style=\"text-align: center;\">❌</td>\n</tr>\n<tr>\n<td>Copy Engine</td>\n<td style=\"text-align: center;\">✅</td>\n<td style=\"text-align: center;\">✅</td>\n<td style=\"text-align: center;\">✅</td>\n<td style=\"text-align: center;\">✅</td>\n</tr>\n<tr>\n<td>High-BW Link</td>\n<td style=\"text-align: center;\">✅</td>\n<td style=\"text-align: center;\">✅</td>\n<td style=\"text-align: center;\">✅</td>\n<td style=\"text-align: center;\">✅</td>\n</tr>\n<tr>\n<td>Network Comm</td>\n<td style=\"text-align: center;\">✅</td>\n<td style=\"text-align: center;\">✅</td>\n<td style=\"text-align: center;\">✅</td>\n<td style=\"text-align: center;\">❌</td>\n</tr>\n<tr>\n<td>PCIe Comm</td>\n<td style=\"text-align: center;\">✅</td>\n<td style=\"text-align: center;\">❌</td>\n<td style=\"text-align: center;\">✅</td>\n<td style=\"text-align: center;\">❌</td>\n</tr>\n<tr>\n<td>OpenSHMEM</td>\n<td style=\"text-align: center;\">✅</td>\n<td style=\"text-align: center;\">❌</td>\n<td style=\"text-align: center;\">❌</td>\n<td style=\"text-align: center;\">❌</td>\n</tr>\n<tr>\n<td>Low-latency Protocol</td>\n<td style=\"text-align: center;\">✅</td>\n<td style=\"text-align: center;\">❌</td>\n<td style=\"text-align: center;\">❌</td>\n<td style=\"text-align: center;\">❌</td>\n</tr>\n<tr>\n<td>Multimem</td>\n<td style=\"text-align: center;\">✅</td>\n<td style=\"text-align: center;\">✅</td>\n<td style=\"text-align: center;\">❌</td>\n<td style=\"text-align: center;\">❌</td>\n</tr>\n<tr>\n<td>Fusion</td>\n<td style=\"text-align: center;\">✅</td>\n<td style=\"text-align: center;\">✅</td>\n<td style=\"text-align: center;\">❌</td>\n<td style=\"text-align: center;\">✅</td>\n</tr>\n<tr>\n<td>CodeGen</td>\n<td style=\"text-align: center;\">✅</td>\n<td style=\"text-align: center;\">❌</td>\n<td style=\"text-align: center;\">❌</td>\n<td style=\"text-align: center;\">✅</td>\n</tr>\n<tr>\n<td>Nvidia + AMD</td>\n<td style=\"text-align: center;\">✅</td>\n<td style=\"text-align: center;\">❌</td>\n<td style=\"text-align: center;\">❌</td>\n<td style=\"text-align: center;\">❌</td>\n</tr>\n<tr>\n<td><strong>覆盖数</strong></td>\n<td style=\"text-align: center;\"><strong>13/13</strong></td>\n<td style=\"text-align: center;\"><strong>9/13</strong></td>\n<td style=\"text-align: center;\"><strong>6/13</strong></td>\n<td style=\"text-align: center;\"><strong>6/13</strong></td>\n</tr>\n</tbody>\n</table></div>",
      "quiz": {
        "q": "Triton-Distributed 在 AMD MI308X GPU 上的 AllGather GEMM Swizzle 策略与 Nvidia H800 的关键区别是什么？",
        "options": [
          "AMD 使用 Push 模式而 Nvidia 使用 Pull 模式",
          "AMD 每步只从一个 rank 拉取数据以避免链路冲突",
          "AMD 每步同时从所有 rank 拉取 sub-chunk 以充分利用聚合带宽",
          "AMD 不需要 Swizzle 优化因为全网格拓扑天然均衡"
        ],
        "answer": 2,
        "explain": "AMD MI308X 采用全网格拓扑，每条链路仅 50 GB/s，需同时利用所有 7 条链路（聚合 350 GB/s）才能达到峰值带宽，因此每步需从所有 rank 并行拉取 sub-chunk；而 Nvidia H800 通过 NVSwitch 任意两卡间即可达 200 GB/s 峰值，每步只需从一个 rank 拉取即可。"
      }
    },
    {
      "id": "flashlight",
      "num": 34,
      "name": "Flashlight",
      "fullName": "PyTorch编译器注意力扩展 (Flashlight)",
      "year": "2026",
      "org": "Meta",
      "parent": "flash_attention",
      "paperUrl": "https://arxiv.org/abs/2511.03230",
      "projectUrl": "",
      "category": "hardware_specific",
      "motivation": "PyTorch编译器扩展支持多样注意力变体高效编译",
      "summary": "Flashlight 的核心目标是：PyTorch编译器扩展支持多样注意力变体高效编译。",
      "keyPoints": [
        "核心动机：PyTorch编译器扩展支持多样注意力变体高效编译",
        "演化来源：继承或改进自 flash_attention",
        "代表机构：Meta"
      ],
      "detail": "<p>PyTorch编译器扩展支持多样注意力变体高效编译</p>"
    },
    {
      "id": "flash_attention_4",
      "num": 35,
      "name": "FlashAttention-4",
      "fullName": "算法与Kernel流水线协同设计注意力 (FlashAttention-4)",
      "year": "2026",
      "org": "Tri Dao Lab",
      "parent": "flash_attention",
      "paperUrl": "https://arxiv.org/abs/2603.05451",
      "projectUrl": "",
      "category": "hardware_specific",
      "motivation": "算法与Kernel流水线协同设计，适配非对称硬件扩展",
      "summary": "FlashAttention-4 的核心目标是：算法与Kernel流水线协同设计，适配非对称硬件扩展。",
      "keyPoints": [
        "核心动机：算法与Kernel流水线协同设计，适配非对称硬件扩展",
        "演化来源：继承或改进自 flash_attention",
        "代表机构：Tri Dao Lab"
      ],
      "detail": "<p>算法与Kernel流水线协同设计，适配非对称硬件扩展</p>"
    },
    {
      "id": "wave",
      "num": 36,
      "name": "Wave",
      "fullName": "符号化Python DSL编译器 (Wave)",
      "year": "2026",
      "org": "Modular",
      "parent": "mojo",
      "paperUrl": "https://mlsys.org/Conferences/2026/AcceptedPapers",
      "projectUrl": "",
      "category": "infrastructure",
      "motivation": "符号化Python DSL统一AI硬件编程与编译优化",
      "summary": "Wave 的核心目标是：符号化Python DSL统一AI硬件编程与编译优化。",
      "keyPoints": [
        "核心动机：符号化Python DSL统一AI硬件编程与编译优化",
        "演化来源：继承或改进自 mojo",
        "代表机构：Modular"
      ],
      "detail": "<p>符号化Python DSL统一AI硬件编程与编译优化</p>"
    },
    {
      "id": "approx_mlir",
      "num": 37,
      "name": "ApproxMLIR",
      "fullName": "精度感知复合ML系统编译器 (ApproxMLIR)",
      "year": "2026",
      "org": "UIUC",
      "parent": "mlir",
      "paperUrl": "https://mlsys.org/Conferences/2026/Abstract/1742",
      "projectUrl": "",
      "category": "infrastructure",
      "motivation": "approx方言自动平衡精度与速度，优化复合ML系统",
      "summary": "ApproxMLIR 的核心目标是：approx方言自动平衡精度与速度，优化复合ML系统。",
      "keyPoints": [
        "核心动机：approx方言自动平衡精度与速度，优化复合ML系统",
        "演化来源：继承或改进自 mlir",
        "代表机构：UIUC"
      ],
      "detail": "<p>approx方言自动平衡精度与速度，优化复合ML系统</p>"
    },
    {
      "id": "hexagon_mlir",
      "num": 38,
      "name": "Hexagon-MLIR",
      "fullName": "Qualcomm NPU开源编译栈 (Hexagon-MLIR)",
      "year": "2026",
      "org": "Qualcomm",
      "parent": "mlir",
      "paperUrl": "https://arxiv.org/abs/2602.19762",
      "projectUrl": "",
      "category": "hardware_specific",
      "motivation": "Triton到Hexagon NPU直接编译路径",
      "summary": "Hexagon-MLIR 的核心目标是：Triton到Hexagon NPU直接编译路径。",
      "keyPoints": [
        "核心动机：Triton到Hexagon NPU直接编译路径",
        "演化来源：继承或改进自 mlir",
        "代表机构：Qualcomm"
      ],
      "detail": "<p>Triton到Hexagon NPU直接编译路径</p>"
    },
    {
      "id": "magellan",
      "num": 39,
      "name": "Magellan",
      "fullName": "AlphaEvolve驱动自主编译优化发现 (Magellan)",
      "year": "2026",
      "org": "Google DeepMind",
      "parent": "openxla",
      "paperUrl": "https://arxiv.org/abs/2601.21096",
      "projectUrl": "",
      "category": "llm_driven",
      "motivation": "LLM Agent自主进化编译优化启发式",
      "summary": "Magellan 的核心目标是：LLM Agent自主进化编译优化启发式。",
      "keyPoints": [
        "核心动机：LLM Agent自主进化编译优化启发式",
        "演化来源：继承或改进自 openxla",
        "代表机构：Google DeepMind"
      ],
      "detail": "<p>LLM Agent自主进化编译优化启发式</p>"
    },
    {
      "id": "cutegen",
      "num": 40,
      "name": "CuTeGen",
      "fullName": "LLM智能体GPU Kernel生成框架 (CuTeGen)",
      "year": "2026",
      "org": "Community",
      "parent": "triton",
      "paperUrl": "https://arxiv.org/abs/2604.01489",
      "projectUrl": "",
      "category": "llm_driven",
      "motivation": "LLM Agent自动生成CuTe GPU Kernel",
      "summary": "CuTeGen 提出了一个基于 LLM Agent 的三阶段工作流（正确性测试→调试→优化），利用 NVIDIA CuTe 抽象层作为结构化中间表示来约束生成空间，自动生成和优化高性能 GPU CUDA Kernel，在多个基准任务上达到甚至超越 PyTorch 原生实现的性能。",
      "keyPoints": [
        "<strong>三阶段 Agentic 工作流</strong>：Correctness Testing → Debugging → Optimization，逐步从正确性保证过渡到性能优化",
        "<strong>CuTe 抽象层作为中间表示</strong>：利用 NVIDIA CUTLASS 库的 CuTe（CuTe Tensor）抽象，将 GPU 硬件层级（Thread/Warp/CTA/Cluster）映射为结构化的 Layout 和 Tensor 操作，约束 LLM 的生成空间",
        "<strong>Patch-based 修复策略</strong>：调试阶段不重新生成完整代码，而是基于编译/运行错误信息生成局部补丁（patch），保留已有正确逻辑",
        "<strong>Delayed Profiling 机制</strong>：将性能分析推迟到优化搜索树的较深层级（depth=11），避免过早 profiling 导致陷入局部最优",
        "<strong>Tree-structured 优化搜索</strong>：优化阶段采用树搜索结构，每个节点代表一次优化尝试，支持回溯和多路径探索",
        "<strong>实验基准</strong>：KernelBench Level-1（GEMM 变体 + 激活函数），RTX 4090 上评测",
        "<strong>关键结果</strong>：Square GEMM 达到 PyTorch 1.16x 加速，Diagonal MatMul 达 17.66x，Softsign 激活函数达 3.45x"
      ],
      "detail": "<p><img alt=\"CuTeGen 框架总览图\" src=\"https://ar5iv.labs.arxiv.org/html/2604.01489/assets/x1.png\" />\n<em>图 1：CuTeGen 的三阶段 Agentic 工作流示意图，展示从初始生成到调试修复再到性能优化的完整流程</em></p>\n<p><img alt=\"CuTe 层级抽象示意图\" src=\"https://ar5iv.labs.arxiv.org/html/2604.01489/assets/figures/cute_diag.png\" />\n<em>图 2：CuTe 的层级化 Tensor 抽象，展示 Thread → Warp → CTA → Cluster 的硬件映射关系</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># CuTeGen 三阶段工作流伪代码\ndef cutegen_pipeline(task_spec, reference_impl):\n    # Stage 1: Initial Generation + Correctness Testing\n    kernel_code = llm_generate(task_spec, cute_docs, reference_impl)\n\n    # Stage 2: Debugging Loop (patch-based repair)\n    for attempt in range(max_debug_attempts):\n        compile_result = compile(kernel_code)\n        if compile_result.has_error:\n            patch = llm_generate_patch(kernel_code, compile_result.error)\n            kernel_code = apply_patch(kernel_code, patch)\n            continue\n        run_result = run_and_validate(kernel_code, reference_impl)\n        if run_result.correct:\n            break\n        patch = llm_generate_patch(kernel_code, run_result.error)\n        kernel_code = apply_patch(kernel_code, patch)\n\n    # Stage 3: Optimization (tree search with delayed profiling)\n    opt_tree = Tree(root=kernel_code)\n    for depth in range(max_depth):\n        for node in opt_tree.leaf_nodes():\n            optimized = llm_optimize(node.code, cute_docs)\n            optimized = debug_loop(optimized)  # 确保优化后仍正确\n            child = opt_tree.add_child(node, optimized)\n            if depth &gt;= delay_threshold:  # Delayed Profiling\n                child.perf = profile(optimized)\n    return opt_tree.best_node()\n</code></pre>\n<h5>动机与背景</h5>\n<p>GPU Kernel 编程是高性能计算的核心，但 CUDA 编程的复杂性（线程层级管理、共享内存分配、内存合并访问、Tensor Core 利用等）使得即使是经验丰富的工程师也需要大量时间进行手动调优。近年来，LLM 在代码生成领域取得了显著进展，但在 GPU Kernel 生成方面面临独特挑战：</p>\n<ol>\n<li><strong>搜索空间爆炸</strong>：CUDA 编程涉及 tile 大小、线程块配置、内存层级选择等大量超参数组合</li>\n<li><strong>正确性验证困难</strong>：GPU 并行程序的 bug 往往是非确定性的（race condition、bank conflict 等）</li>\n<li><strong>性能优化非线性</strong>：微小的参数变化可能导致性能的剧烈波动，传统的贪心搜索容易陷入局部最优</li>\n</ol>\n<p>现有方法如直接使用 LLM 生成原始 CUDA 代码，由于缺乏结构化约束，生成的代码往往存在大量低级错误。KernelBench 基准测试显示，即使是最先进的 LLM，在 GPU Kernel 生成任务上的成功率也很低。</p>\n<div class=\"key-point\">💡 <strong>关键洞察</strong>：CuTeGen 的核心创新在于引入 CuTe 作为\"结构化中间表示\"——它不是让 LLM 直接生成底层 CUDA 代码，而是让 LLM 在 CuTe 的抽象层级上进行推理和生成，从而将无限的底层优化空间压缩为有限的、语义明确的抽象操作组合。</div>\n<h5>核心机制详解</h5>\n<p><strong>1. CuTe 抽象层的作用</strong></p>\n<p>CuTe（CuTe Tensor）是 NVIDIA CUTLASS 库提供的 C++ 模板抽象层，它将 GPU 硬件的层级结构（Thread → Warp → Thread Block/CTA → Cluster）映射为统一的 Layout 和 Tensor 操作接口。CuTe 的核心概念包括：</p>\n<ul>\n<li><strong>Layout</strong>：描述数据在内存中的排列方式，由 <code>Shape</code> 和 <code>Stride</code> 组成。例如 <code>Layout&lt;Shape&lt;_4, _8&gt;, Stride&lt;_8, _1&gt;&gt;</code> 表示一个 4×8 的行主序矩阵</li>\n<li><strong>Tensor</strong>：将 Layout 绑定到具体的内存指针，支持全局内存（GMEM）、共享内存（SMEM）和寄存器文件（RMEM）</li>\n<li><strong>Tiled Copy / Tiled MMA</strong>：封装了硬件特定的数据搬运和计算原语（如 <code>cp.async</code>、WMMA 指令）</li>\n</ul>\n<p>CuTe 的优势在于它提供了<strong>硬件感知但硬件无关</strong>的编程接口——开发者（或 LLM）只需指定高层的 tile 分解策略和数据流模式，CuTe 会自动处理底层的线程映射、内存对齐和指令选择。</p>\n<p><strong>2. 三阶段工作流</strong></p>\n<p><strong>阶段一：正确性测试（Correctness Testing）</strong></p>\n<p>LLM 接收任务描述（PyTorch 参考实现）和 CuTe 文档作为上下文，生成初始的 CuTe Kernel 代码。生成的代码会经过编译测试和数值正确性验证（与 PyTorch 参考实现的输出进行比较，使用 <code>torch.allclose</code> 检查）。</p>\n<p><strong>阶段二：调试修复（Debugging）</strong></p>\n<p>当代码存在编译错误或数值错误时，进入调试循环。关键设计是 <strong>patch-based 修复</strong>而非完整代码重新生成：</p>\n<p>$$\\text{code}_{t+1} = \\text{apply\\_patch}(\\text{code}_t, \\text{LLM}(\\text{code}_t, \\text{error}_t))$$</p>\n<p>这种设计的优势在于：\n- 保留了已有代码中正确的部分，避免\"推倒重来\"导致的信息丢失\n- 错误信息（编译器报错、运行时错误、数值偏差）为 LLM 提供了精确的修复方向\n- 减少了 token 消耗，提高了调试效率</p>\n<p><strong>阶段三：优化搜索（Optimization with Delayed Profiling）</strong></p>\n<p>优化阶段采用树搜索结构。从正确的基础 Kernel 出发，LLM 在每个节点生成优化变体（如更改 tile 大小、添加双缓冲、使用 Tensor Core 等）。每个优化变体都需要通过正确性验证（回到阶段二的调试循环）。</p>\n<p><strong>Delayed Profiling</strong> 是优化阶段的关键创新：</p>\n<p>$$\\text{profile}(node) = \\begin{cases} \\text{skip} & \\text{if } \\text{depth}(node) < D_{\\text{delay}} \\\\ \\text{measure\\_time}(node) & \\text{if } \\text{depth}(node) \\geq D_{\\text{delay}} \\end{cases}$$</p>\n<p>其中 \\(D_{\\text{delay}}\\) 是延迟阈值（实验中设为 11）。这样做的原因是：\n- 早期优化步骤（如基础 tiling、内存层级选择）对最终性能的影响是<strong>非单调的</strong>\n- 过早进行 profiling 会导致 Agent 过度关注当前步骤的性能数字，而忽略了需要多步组合才能显现效果的优化策略（如双缓冲 + Tensor Core + 异步拷贝的组合）\n- Delayed profiling 允许 Agent 先完成一系列结构性优化，再通过 profiling 进行精细调参</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：消融实验表明，early profiling（depth=1）的性能显著低于 delayed profiling（depth=11），验证了过早 profiling 确实会导致优化陷入局部最优。</div>\n<p><strong>3. Case Study：Square GEMM 优化过程</strong></p>\n<p>论文详细展示了 CuTeGen 对 Square GEMM（\\(C = A \\times B\\)，\\(A, B \\in \\mathbb{R}^{1024 \\times 1024}\\)）的优化过程，最终达到 PyTorch 的 1.16x 加速。关键优化步骤包括：</p>\n<ol>\n<li><strong>层级化 Tiling</strong>：</li>\n<li>CTA 级别：128×128 tile</li>\n<li>Warp 级别：64×32 tile</li>\n<li>\n<p>指令级别：16×16×16 WMMA（Warp Matrix Multiply-Accumulate）</p>\n</li>\n<li>\n<p><strong>双缓冲共享内存（Double-Buffered SMEM）</strong>：</p>\n</li>\n<li>分配两组共享内存缓冲区，一组用于当前计算，另一组预取下一个 tile</li>\n<li>\n<p>通过流水线化隐藏全局内存访问延迟</p>\n</li>\n<li>\n<p><strong>内联 PTX 异步拷贝</strong>：</p>\n</li>\n<li>使用 <code>cp.async</code> 指令实现全局内存到共享内存的异步数据传输</li>\n<li>\n<p>通过 <code>cp.async.commit_group</code> 和 <code>cp.async.wait_group</code> 管理异步操作的同步</p>\n</li>\n<li>\n<p><strong>Skew Padding</strong>：</p>\n</li>\n<li>在共享内存中添加 padding 以消除 bank conflict</li>\n<li>例如将 128×16 的 tile 存储为 128×(16+padding) 的布局</li>\n</ol>\n<h5>实验结果</h5>\n<p>在 RTX 4090 上的 KernelBench Level-1 基准测试结果（相对于 PyTorch 的加速比）：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>任务类别</th>\n<th>具体任务</th>\n<th>加速比</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>GEMM</td>\n<td>Square GEMM (1024×1024)</td>\n<td>1.16x</td>\n</tr>\n<tr>\n<td>GEMM</td>\n<td>Rectangular MatMul</td>\n<td>1.07x</td>\n</tr>\n<tr>\n<td>GEMM</td>\n<td>Batched MatMul</td>\n<td>0.85x</td>\n</tr>\n<tr>\n<td>GEMM</td>\n<td>Transposed MatMul</td>\n<td>1.05x</td>\n</tr>\n<tr>\n<td>GEMM</td>\n<td>Diagonal MatMul</td>\n<td><strong>17.66x</strong></td>\n</tr>\n<tr>\n<td>激活函数</td>\n<td>Swish</td>\n<td>2.45x</td>\n</tr>\n<tr>\n<td>激活函数</td>\n<td>Softsign</td>\n<td><strong>3.45x</strong></td>\n</tr>\n<tr>\n<td>激活函数</td>\n<td>Softplus</td>\n<td>1.83x</td>\n</tr>\n<tr>\n<td>激活函数</td>\n<td>GELU</td>\n<td>1.02x</td>\n</tr>\n<tr>\n<td>激活函数</td>\n<td>HardSigmoid</td>\n<td>1.25x</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 <strong>关键发现</strong>：Diagonal MatMul 的 17.66x 加速来自于 CuTeGen 识别出对角矩阵的稀疏结构，生成了专门的稀疏 Kernel 而非通用 GEMM。这展示了 LLM Agent 在算法层面的优化能力，而非仅仅是底层代码调优。</div>",
      "quiz": {
        "q": "CuTeGen 中 Delayed Profiling 机制的主要目的是什么？",
        "options": [
          "减少 GPU profiling 的计算开销",
          "避免过早性能评估导致优化搜索陷入局部最优",
          "确保每次优化都能提升性能",
          "加速优化搜索树的遍历速度"
        ],
        "answer": 1,
        "explain": "Delayed Profiling 将性能测量推迟到搜索树较深层级，因为早期的结构性优化（如 tiling、双缓冲）需要多步组合才能显现效果，过早 profiling 会误导 Agent 放弃有潜力的优化路径。"
      }
    },
    {
      "id": "autokernel",
      "num": 41,
      "name": "AutoKernel",
      "fullName": "自主GPU Kernel迭代优化智能体 (AutoKernel)",
      "year": "2026",
      "org": "Community",
      "parent": "triton",
      "paperUrl": "https://arxiv.org/abs/2603.21331",
      "projectUrl": "",
      "category": "llm_driven",
      "motivation": "Agent闭环迭代优化GPU Kernel性能",
      "summary": "AutoKernel 的核心目标是：Agent闭环迭代优化GPU Kernel性能。",
      "keyPoints": [
        "核心动机：Agent闭环迭代优化GPU Kernel性能",
        "演化来源：继承或改进自 triton",
        "代表机构：Community"
      ],
      "detail": "<p>Agent闭环迭代优化GPU Kernel性能</p>"
    },
    {
      "id": "acclaim",
      "num": 42,
      "name": "ACCLAIM",
      "fullName": "编译器-LLM协作代码优化系统 (ACCLAIM)",
      "year": "2026",
      "org": "Community",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2604.04238",
      "projectUrl": "",
      "category": "llm_driven",
      "motivation": "源码-IR-汇编三层LLM协作，系统化编译优化决策",
      "summary": "ACCLAIM 的核心目标是：源码-IR-汇编三层LLM协作，系统化编译优化决策。",
      "keyPoints": [
        "核心动机：源码-IR-汇编三层LLM协作，系统化编译优化决策",
        "代表机构：Community"
      ],
      "detail": "<p>源码-IR-汇编三层LLM协作，系统化编译优化决策</p>"
    },
    {
      "id": "deep_compile",
      "num": 43,
      "name": "DeepCompile",
      "fullName": "编译器驱动分布式训练优化系统 (DeepCompile)",
      "year": "2026",
      "org": "Microsoft/UVA",
      "parent": "torch_dynamo",
      "paperUrl": "https://arxiv.org/abs/2504.09983",
      "projectUrl": "",
      "category": "graph_compilers",
      "motivation": "编译器驱动主动预取与自适应offloading优化分布式训练",
      "summary": "DeepCompile 的核心目标是：编译器驱动主动预取与自适应offloading优化分布式训练。",
      "keyPoints": [
        "核心动机：编译器驱动主动预取与自适应offloading优化分布式训练",
        "演化来源：继承或改进自 torch_dynamo",
        "代表机构：Microsoft/UVA"
      ],
      "detail": "<p>编译器驱动主动预取与自适应offloading优化分布式训练</p>"
    },
    {
      "id": "flex_linear_attn",
      "num": 44,
      "name": "FlexLinearAttention",
      "fullName": "线性注意力统一抽象编译框架 (FlexLinearAttention)",
      "year": "2026",
      "org": "Community",
      "parent": "flash_attention",
      "paperUrl": "https://openreview.net/forum?id=N4jJQvQSiN",
      "projectUrl": "",
      "category": "hardware_specific",
      "motivation": "统一抽象将线性注意力变体编译为可扩展高效内核",
      "summary": "FlexLinearAttention 的核心目标是：统一抽象将线性注意力变体编译为可扩展高效内核。",
      "keyPoints": [
        "核心动机：统一抽象将线性注意力变体编译为可扩展高效内核",
        "演化来源：继承或改进自 flash_attention",
        "代表机构：Community"
      ],
      "detail": "<p>统一抽象将线性注意力变体编译为可扩展高效内核</p>"
    },
    {
      "id": "quantix",
      "num": 45,
      "name": "Quantix",
      "fullName": "非均匀量化LLM推理加速编译器 (Quantix)",
      "year": "2026",
      "org": "Community",
      "parent": "tensorrt",
      "paperUrl": "https://dl.acm.org/doi/abs/10.1145/3774934.3786423",
      "projectUrl": "",
      "category": "hardware_specific",
      "motivation": "3-bit非均匀量化编译优化，大幅提升LLM推理吞吐",
      "summary": "Quantix 针对基于聚类的非均匀量化（clustering-based non-uniform quantization）将 LLM 权重压缩至 3 bit 后在 GPU 上推理吞吐严重下降的问题，提出了两项核心优化：(1) 硬件对齐的位重排方案（hardware-aligned bit shuffling），使 3-bit 数据在 GPU 内存层次中实现高效对齐访问；(2) 融合反量化-乘法流水线（fused dequantization-multiplication pipeline），将反量化操作映射到 CUDA Core、矩阵乘法映射到 Tensor Core 并行执行，消除传统方案中反量化的串行开销。在 NVIDIA L40 GPU 上，Quantix 实现了相对 FP16 cuBLAS 4.82× 的内核级加速，以及相对现有最优量化推理方案 11.46× 的端到端加速。",
      "keyPoints": [
        "<strong>问题定义</strong>：基于聚类的非均匀量化（如 k-means 量化）可将 LLM 权重压缩至 3 bit 并保持较高精度，但推理时需要查表反量化（codebook lookup），导致严重的计算开销和 GPU 利用率低下，实际推理速度甚至慢于 FP16 基线",
        "<strong>3-bit 对齐难题</strong>：3 bit 不是 2 的幂次，无法自然对齐到 GPU 的 8/16/32/128-bit 内存访问粒度，朴素的位打包（bit packing）方案导致大量跨字（cross-word）访问和位移操作，严重制约内存带宽利用率",
        "<strong>硬件对齐位重排</strong>：Quantix 设计了一种位重排方案，将 3-bit 量化索引重新组织排列，使得每次 32-bit 或 128-bit 内存加载都能获取完整的量化值集合，消除跨字边界访问，最大化内存事务效率",
        "<strong>融合反量化-乘法流水线</strong>：传统方案先将所有量化权重反量化为 FP16 再执行 GEMM，Quantix 将反量化（codebook lookup + 位提取）映射到 CUDA Core，将矩阵乘法映射到 Tensor Core，两者通过共享内存（shared memory）在流水线中并行执行，隐藏反量化延迟",
        "<strong>双核协同架构</strong>：在同一 SM（Streaming Multiprocessor）内，部分 warp 负责 CUDA Core 上的反量化工作，部分 warp 负责 Tensor Core 上的矩阵乘累加（MMA），通过 warp 级流水线调度实现计算资源的充分利用",
        "<strong>性能结果</strong>：在 NVIDIA L40 GPU 上，内核级加速 4.82×（vs FP16 cuBLAS），端到端加速 11.46×（vs 现有最优非均匀量化方案），同时保持非均匀量化的精度优势"
      ],
      "detail": "<h5>4.1 核心架构概览</h5>\n<pre><code>┌─────────────────────────────────────────────────────────┐\n│                    Quantix 推理框架                       │\n├─────────────────────────────────────────────────────────┤\n│                                                         │\n│  ┌──────────────┐    ┌──────────────┐    ┌───────────┐  │\n│  │  3-bit 量化   │    │  Bit Shuffle │    │ Codebook  │  │\n│  │  权重存储     │───▶│  重排引擎     │───▶│  查表反量化│  │\n│  │  (Global Mem) │    │  (对齐加载)   │    │ (CUDA Core)│  │\n│  └──────────────┘    └──────────────┘    └─────┬─────┘  │\n│                                                │        │\n│                                          Shared Memory  │\n│                                                │        │\n│  ┌──────────────┐    ┌──────────────┐    ┌─────▼─────┐  │\n│  │  FP16 激活值  │───▶│  激活值加载   │───▶│ Tensor Core│  │\n│  │  (Global Mem) │    │  (对齐加载)   │    │  MMA 计算  │  │\n│  └──────────────┘    └──────────────┘    └───────────┘  │\n│                                                         │\n│         CUDA Core 反量化 ∥ Tensor Core GEMM             │\n│              (Warp-level Pipeline)                       │\n└─────────────────────────────────────────────────────────┘\n</code></pre>\n<p><em>图 1：Quantix 整体架构。3-bit 量化权重经过位重排后对齐加载，CUDA Core 执行 codebook 查表反量化，Tensor Core 并行执行矩阵乘累加，两者通过共享内存和 warp 级流水线协同工作。</em></p>\n<h5>4.2 算法伪代码</h5>\n<pre><code class=\"language-python\"># Quantix 融合反量化-矩阵乘内核（概念性伪代码）\ndef quantix_fused_gemm_kernel(\n    Q_packed,      # 3-bit 量化权重（位重排后），shape: [K, N/pack_factor]\n    codebook,      # 非均匀量化码本，shape: [num_groups, 2^3]\n    A,             # FP16 激活值，shape: [M, K]\n    C,             # 输出矩阵，shape: [M, N]\n):\n    # === 阶段 1：位重排加载（Hardware-Aligned Bit Shuffling）===\n    # 每个 warp 加载 128-bit 对齐的量化权重块\n    # 位重排保证每次加载获取完整的 3-bit 索引集合\n    packed_data = aligned_load_128bit(Q_packed, block_offset)\n\n    # === 阶段 2：CUDA Core 反量化（与 Tensor Core MMA 流水线并行）===\n    for tile_k in range(0, K, TILE_K):\n        # --- CUDA Core Warps: 反量化 ---\n        # 从 packed_data 中提取 3-bit 索引（无跨字访问）\n        indices = extract_3bit_indices(packed_data, tile_k)  # 位操作\n\n        # Codebook 查表：index → FP16 反量化值\n        W_dequant = codebook_lookup(codebook, indices)  # shape: [TILE_K, TILE_N]\n\n        # 写入共享内存供 Tensor Core 使用\n        shared_mem.store(W_dequant, smem_offset)\n        __syncthreads()\n\n        # --- Tensor Core Warps: 矩阵乘累加 ---\n        # 从共享内存加载反量化权重片段\n        W_frag = load_matrix_fragment(shared_mem, smem_offset)\n        A_frag = load_matrix_fragment(A, tile_k)\n\n        # Tensor Core MMA: C += A_frag @ W_frag\n        C_accum = mma_sync(A_frag, W_frag, C_accum)\n\n    # 写回结果\n    store_output(C, C_accum, block_offset)\n</code></pre>\n<pre><code class=\"language-python\"># 硬件对齐位重排方案（离线预处理）\ndef hardware_aligned_bit_shuffle(weights_3bit, group_size=128):\n    &quot;&quot;&quot;\n    将 3-bit 量化索引重排为硬件对齐的打包格式。\n\n    问题：10 个 3-bit 值 = 30 bits，无法填满 32-bit 字\n          朴素打包导致值跨越字边界\n\n    解决：重排索引顺序，使每个 32-bit 字内的值完整且对齐\n    &quot;&quot;&quot;\n    N = len(weights_3bit)\n    # 32 个 3-bit 值 = 96 bits = 3 个 32-bit 字（最小公倍数）\n    PACK_UNIT = 32  # 每个打包单元处理 32 个 3-bit 值\n\n    packed = []\n    for i in range(0, N, PACK_UNIT):\n        chunk = weights_3bit[i:i+PACK_UNIT]  # 32 个 3-bit 索引\n\n        # 位重排：将 32 个 3-bit 值的各位分离\n        # bit[2]: 高位平面, bit[1]: 中位平面, bit[0]: 低位平面\n        plane_2 = pack_bit_plane(chunk, bit_pos=2)  # 32 bits → 1 个 uint32\n        plane_1 = pack_bit_plane(chunk, bit_pos=1)  # 32 bits → 1 个 uint32\n        plane_0 = pack_bit_plane(chunk, bit_pos=0)  # 32 bits → 1 个 uint32\n\n        # 3 个 uint32 完美对齐，无跨字访问\n        packed.extend([plane_2, plane_1, plane_0])\n\n    return packed\n</code></pre>\n<h5>4.3 方法细节</h5>\n<p><strong>动机与背景：非均匀量化的精度-速度困境</strong></p>\n<p>大语言模型（LLM）的推理部署面临巨大的内存和计算挑战。量化是最主要的压缩手段之一，将权重从 FP16（16 bit）压缩至更低位宽。现有量化方法分为两大类：</p>\n<ol>\n<li>\n<p><strong>均匀量化</strong>（Uniform Quantization）：量化级别等间距分布，反量化仅需简单的缩放和偏移操作（\\(w = s \\cdot q + z\\)），计算开销极低。代表方法包括 GPTQ、AWQ、QuIP 等，通常在 4-bit 下工作良好，但在 3-bit 及以下精度显著下降。</p>\n</li>\n<li>\n<p><strong>非均匀量化</strong>（Non-uniform Quantization）：使用聚类算法（如 k-means）找到最优量化级别，级别间距不等，能更好地匹配权重的实际分布。代表方法包括 SqueezeLLM、AQLM、NormalFloat 等。非均匀量化在 3-bit 下仍能保持较高精度，但反量化需要查表操作（codebook lookup），计算开销远大于均匀量化。</p>\n</li>\n</ol>\n<p>Quantix 的核心观察是：非均匀量化在 3-bit 下的精度优势是显著的（相比均匀量化可降低 1-3 个困惑度点），但现有 GPU 实现的反量化开销完全抵消了内存带宽节省，导致实际推理速度甚至慢于 FP16 基线。这一性能瓶颈有两个根本原因：</p>\n<p><strong>原因一：3-bit 的内存对齐问题。</strong> GPU 的内存系统以 32-bit（4 字节）或 128-bit（16 字节）为最小访问粒度。4-bit 量化值可以自然地 2 个一组打包到 1 个字节中，8 个一组打包到 1 个 32-bit 字中。但 3-bit 值无法整除这些粒度：10 个 3-bit 值占 30 bits，11 个占 33 bits，都无法填满 32-bit 字。朴素的连续打包方案会导致某些 3-bit 值跨越 32-bit 字边界，提取时需要加载两个字并进行复杂的位移和掩码操作，严重降低内存带宽利用率。</p>\n<p><strong>原因二：反量化的串行开销。</strong> 传统实现采用两阶段方案：先将所有量化权重反量化为 FP16，再调用 cuBLAS 执行矩阵乘法。反量化阶段涉及大量的位操作（位提取）和查表操作（codebook lookup），这些操作在 GPU 上的计算密度低、内存访问模式不规则，无法充分利用 GPU 的计算资源。更关键的是，反量化和矩阵乘法是串行执行的，无法重叠计算。</p>\n<p><strong>硬件对齐位重排（Hardware-Aligned Bit Shuffling）</strong></p>\n<p>Quantix 的第一个核心创新是位重排方案。其核心思想是：不按照权重矩阵的自然顺序连续打包 3-bit 值，而是重新组织排列顺序，使得每次内存加载都能获取完整的、不跨字的量化值集合。</p>\n<p>具体方法是采用<strong>位平面分离</strong>（bit-plane decomposition）策略。对于一组 32 个 3-bit 量化索引（共 96 bits = 3 个 32-bit 字），将每个索引的第 0 位、第 1 位、第 2 位分别收集到三个独立的 32-bit 字中：</p>\n<p>$$\\text{plane}_b[j] = \\text{index}[j].\\text{bit}[b], \\quad b \\in \\{0, 1, 2\\}, \\quad j \\in \\{0, \\ldots, 31\\}$$</p>\n<p>这样，3 个 32-bit 字完美存储 32 个 3-bit 值，每次 128-bit 加载（4 个 32-bit 字）可以获取 \\(\\lfloor 4/3 \\rfloor \\times 32 = 32\\) 个完整的量化索引（加上 1 个字的冗余或用于下一组）。更重要的是，从位平面恢复原始 3-bit 索引只需要简单的位与（AND）和位移（SHIFT）操作，无需处理跨字边界的情况。</p>\n<p>这种位重排是一个<strong>离线预处理</strong>步骤，在模型加载时一次性完成，不影响推理时的在线性能。重排后的数据布局与 GPU 的内存访问模式完美对齐，使得量化权重的加载效率接近理论带宽上限。</p>\n<p><strong>融合反量化-乘法流水线（Fused Dequantization-Multiplication Pipeline）</strong></p>\n<p>Quantix 的第二个核心创新是将反量化和矩阵乘法融合到同一个 CUDA 内核中，并利用 CUDA Core 和 Tensor Core 的异构计算能力实现流水线并行。</p>\n<p>现代 NVIDIA GPU（如 L40、A100、H100）同时具备两种计算单元：\n- <strong>CUDA Core</strong>：通用标量/向量计算单元，擅长位操作、条件分支、查表等不规则计算\n- <strong>Tensor Core</strong>：专用矩阵乘累加单元，执行 \\(D = A \\times B + C\\) 的小矩阵运算（如 16×16×16），吞吐量远超 CUDA Core</p>\n<p>Quantix 的关键洞察是：反量化操作（位提取 + codebook 查表）本质上是 CUDA Core 擅长的不规则计算，而矩阵乘法是 Tensor Core 擅长的规则计算。在传统的两阶段方案中，这两种计算单元无法同时工作——反量化阶段 Tensor Core 空闲，矩阵乘阶段 CUDA Core 空闲。</p>\n<p>Quantix 设计了一个 warp 级流水线，在同一个 SM 内：\n1. <strong>Producer warps</strong>（生产者）：使用 CUDA Core 执行位提取和 codebook 查表，将反量化后的 FP16 权重写入共享内存\n2. <strong>Consumer warps</strong>（消费者）：使用 Tensor Core 从共享内存读取反量化权重，与激活值执行矩阵乘累加</p>\n<p>通过双缓冲（double buffering）技术，当 consumer warps 处理第 \\(k\\) 个 tile 时，producer warps 同时准备第 \\(k+1\\) 个 tile 的反量化数据，实现计算的完全重叠：</p>\n<p>$$\\text{Pipeline Stage } k: \\quad \\underbrace{\\text{Dequant}(W_{k+1})}_{\\text{CUDA Core}} \\parallel \\underbrace{\\text{MMA}(A_k, W_k)}_{\\text{Tensor Core}}$$</p>\n<p><strong>Codebook 查表优化</strong></p>\n<p>非均匀量化的反量化核心是 codebook 查表：给定 3-bit 索引 \\(q \\in \\{0, 1, \\ldots, 7\\}\\)，从码本中取出对应的 FP16 值 \\(c[q]\\)。由于码本只有 8 个条目（\\(2^3 = 8\\)），Quantix 将码本加载到寄存器或共享内存中，利用 GPU 的快速本地存储实现零延迟查表。对于分组量化（group quantization），每个组有独立的码本，Quantix 将当前处理组的码本预加载到寄存器文件中，避免反复访问全局内存。</p>\n<p><strong>Warp 调度与资源分配</strong></p>\n<p>在 SM 内部，Quantix 需要精心平衡 producer warps 和 consumer warps 的数量比例。如果 producer warps 过多，Tensor Core 利用率不足；如果过少，反量化成为瓶颈。最优比例取决于反量化的计算强度和 Tensor Core 的吞吐量。由于 3-bit 非均匀量化的反量化涉及位操作和查表两步，其计算强度高于均匀量化的简单缩放，因此需要相对更多的 producer warps。</p>\n<h5>4.4 核心公式</h5>\n<p><strong>非均匀量化（聚类量化）</strong>：</p>\n<p>$$q^* = \\arg\\min_{q \\in \\{0,\\ldots,2^b-1\\}} |w - c[q]|$$</p>\n<p>其中 \\(w\\) 为原始 FP16 权重，\\(c[\\cdot]\\) 为通过 k-means 聚类得到的码本，\\(b=3\\) 为量化位宽。</p>\n<div class=\"key-point\">💡 <strong>关键</strong>：非均匀量化的码本条目 \\(c[q]\\) 间距不等，能更好地匹配权重分布的密度，在 3-bit 下比均匀量化保持更高精度。</div>\n<p><strong>反量化（Codebook Lookup）</strong>：</p>\n<p>$$\\hat{w} = c[q], \\quad q = \\text{extract\\_3bit}(\\text{packed\\_data}, \\text{offset})$$</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：与均匀量化的 \\(\\hat{w} = s \\cdot q + z\\)（仅需一次乘加）不同，非均匀量化需要查表操作，这是推理开销的主要来源。</div>\n<p><strong>位平面分离（Bit-Plane Decomposition）</strong>：</p>\n<p>$$\\text{plane}_b = \\bigoplus_{j=0}^{31} \\left(\\text{index}[j].\\text{bit}[b] \\ll j\\right), \\quad b \\in \\{0, 1, 2\\}$$</p>\n<p>32 个 3-bit 索引 → 3 个 32-bit 字，完美对齐，无跨字访问。</p>\n<p><strong>融合流水线吞吐模型</strong>：</p>\n<p>$$T_{\\text{fused}} = \\max\\left(T_{\\text{dequant}}^{\\text{CUDA Core}},\\ T_{\\text{MMA}}^{\\text{Tensor Core}},\\ T_{\\text{mem}}\\right)$$</p>\n<div class=\"key-point\">💡 <strong>关键</strong>：融合流水线的总时间由三者中的最慢者决定（而非串行相加），这是加速的根本来源。理想情况下，反量化时间被 Tensor Core 计算完全隐藏。</div>\n<p><strong>加速比分析</strong>：</p>\n<p>$$\\text{Speedup}_{\\text{kernel}} = \\frac{T_{\\text{FP16-cuBLAS}}}{T_{\\text{Quantix}}} = 4.82\\times$$</p>\n<p>$$\\text{Speedup}_{\\text{e2e}} = \\frac{T_{\\text{SOTA-quantized}}}{T_{\\text{Quantix}}} = 11.46\\times$$</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：11.46× 的端到端加速不仅来自内核优化，还包括 3-bit 压缩带来的内存带宽节省（权重传输量仅为 FP16 的 3/16 ≈ 18.75%），这在 LLM 推理的 memory-bound 场景中尤为重要。</div>",
      "quiz": {
        "q": "Quantix 采用位平面分离（bit-plane decomposition）而非朴素连续打包来存储 3-bit 量化值的主要原因是什么？",
        "options": [
          "位平面分离可以减少量化误差，提高模型精度",
          "位平面分离使压缩率从 3-bit 进一步降低到 2-bit",
          "3-bit 值无法整除 32-bit 字边界，位平面分离消除了跨字访问，实现硬件对齐的高效内存加载",
          "位平面分离是 Tensor Core 的硬件要求，不支持其他数据格式"
        ],
        "answer": 2,
        "explain": "3-bit 不是 2 的幂次，朴素连续打包会导致某些 3-bit 值跨越 32-bit 字边界，提取时需要加载两个字并进行复杂位操作。位平面分离将 32 个 3-bit 值的各位分别收集到 3 个独立的 32-bit 字中，每个字内的位完整对齐，消除了跨字访问，使 GPU 内存加载效率接近理论带宽上限。"
      }
    },
    {
      "id": "hexcute",
      "num": 46,
      "name": "Hexcute",
      "fullName": "GPU程序自动布局合成编译框架 (Hexcute)",
      "year": "2026",
      "org": "Community",
      "parent": "triton",
      "paperUrl": "https://ieeexplore.ieee.org/abstract/document/11395194/",
      "projectUrl": "",
      "category": "tensor_ir",
      "motivation": "自动合成GPU程序布局，消除手工布局设计负担",
      "summary": "Hexcute 是一个 GPU 编译器框架，通过将**张量布局合成**形式化为**约束规划问题**并使用**类型推断算法**自动求解，在保持对数据流和流水线显式控制的同时，自动化了 GPU 程序中最繁琐的布局设计过程，在 GEMM/Attention/MoE 等算子上达到与手写库（cuBLAS、FlashAttention）匹配的性能，同时大幅减少代码量。\n\n---",
      "keyPoints": [
        "核心动机：自动合成GPU程序布局，消除手工布局设计负担",
        "演化来源：继承或改进自 triton",
        "代表机构：Community"
      ],
      "detail": "<h5>1. 问题背景与动机</h5>\n<p>GPU 上深度学习算子的性能高度依赖于<strong>张量布局（tensor layout）</strong>——即数据如何在线程间并行化以及在内存层次（全局内存 → 共享内存 → 寄存器）中排列的映射函数。</p>\n<p>现有方案的局限：</p>\n<pre><code>┌─────────────────────────────────────────────────────────────────┐\n│                    GPU 编程框架光谱                               │\n│                                                                 │\n│  低层框架 (CUTLASS/Hidet)          高层语言 (Triton)              │\n│  ┌──────────────────────┐         ┌──────────────────────┐      │\n│  │ ✅ 表达力强            │         │ ✅ 编程简单            │      │\n│  │ ✅ 显式控制布局/数据流  │         │ ❌ 启发式不可泛化      │      │\n│  │ ❌ 手动指定布局繁琐    │         │ ❌ 复杂算子性能差      │      │\n│  │ ❌ 代码量大            │         │ ❌ 隐式布局不可控      │      │\n│  └──────────────────────┘         └──────────────────────┘      │\n│                                                                 │\n│                    ↓ Hexcute 的定位 ↓                            │\n│            ┌──────────────────────────────┐                     │\n│            │ ✅ 自动化布局合成              │                     │\n│            │ ✅ 显式数据流 + 流水线控制     │                     │\n│            │ ✅ 代码量少 + 性能匹配手写库   │                     │\n│            └──────────────────────────────┘                     │\n└─────────────────────────────────────────────────────────────────┘\n</code></pre>\n<h5>2. 布局代数（Layout Algebra）</h5>\n<p>Hexcute 继承并扩展了 CuTe（CUTLASS 3.5）的布局抽象。核心概念是 <strong>TensorLayout</strong>，由 <code>(shape, stride)</code> 对定义：</p>\n<pre><code>TensorLayout = (Shape, Stride)\n\n示例: 一个 4×8 的行主序布局\n  shape  = (4, 8)\n  stride = (8, 1)\n\n映射函数: index(i, j) = i × 8 + j × 1\n</code></pre>\n<p>布局通过<strong>函数组合（functional composition）</strong>构建复杂映射：</p>\n<pre><code>组合布局 (ComposedLayout):\n  L_composed = L_outer ∘ L_inner\n\n  其中:\n  - L_inner: 逻辑坐标 → 中间坐标\n  - L_outer: 中间坐标 → 物理地址\n\n布局类型层次:\n  LayoutBase\n  ├── TensorLayout(shape, stride)     # 基础仿射布局\n  ├── ComposedLayout(outer, inner)    # 函数组合\n  ├── SwizzleLayout(base, swizzle)    # 异或交织 (bank conflict 消除)\n  ├── ConcatLayout                    # 拼接\n  ├── PermuteLayout                   # 置换\n  └── ReshapeLayout                   # 重塑\n</code></pre>\n<p><strong>Swizzle</strong> 是一种关键的布局变换，通过对地址进行位级异或操作来消除共享内存的 bank conflict：</p>\n<pre><code>Swizzle(B, M, S):\n  addr' = addr XOR ((addr &gt;&gt; B) &amp; M) &lt;&lt; S\n\n  B: 基础位偏移\n  M: 掩码\n  S: 移位量\n</code></pre>\n<h5>3. 布局合成算法（Layout Synthesis）</h5>\n<p>Hexcute 的核心创新是将布局合成形式化为<strong>约束规划问题</strong>：</p>\n<pre><code>输入:\n  - 计算图 (dataflow graph)\n  - 硬件约束 (GPU 架构参数)\n  - 用户指定的数据流和流水线策略\n\n约束:\n  C1: 内存对齐约束 (向量化加载/存储)\n  C2: Tensor Core 指令布局约束 (MMA 操作数布局)\n  C3: 共享内存 bank conflict 约束 (Swizzle)\n  C4: 寄存器分配约束\n  C5: 布局兼容性约束 (相邻操作间布局一致)\n\n目标:\n  找到满足所有约束的布局赋值 {L_i} 使得性能最优\n</code></pre>\n<p>求解算法采用<strong>类型推断驱动的深度优先搜索</strong>：</p>\n<pre><code class=\"language-python\"># 伪代码: Hexcute 布局合成算法\ndef layout_synthesis(program_graph, hw_constraints):\n    &quot;&quot;&quot;\n    类型推断驱动的布局合成\n\n    将每个张量的布局视为&quot;类型&quot;，\n    通过类型推断规则传播约束，\n    用深度优先搜索探索可行解空间\n    &quot;&quot;&quot;\n    # Step 1: 初始化 — 从已知布局开始\n    # (如 Tensor Core MMA 指令的固定操作数布局)\n    known_layouts = extract_fixed_layouts(program_graph)\n\n    # Step 2: 类型推断 — 前向/后向传播布局约束\n    for node in topological_order(program_graph):\n        if node.layout is UNKNOWN:\n            # 根据输入/输出的已知布局推断\n            node.layout = infer_layout(\n                node.op_type,\n                node.inputs,\n                hw_constraints\n            )\n\n    # Step 3: 约束求解 — 深度优先搜索\n    def dfs_solve(unresolved_nodes):\n        if not unresolved_nodes:\n            return current_assignment  # 所有布局已确定\n\n        node = select_next(unresolved_nodes)  # 选择下一个节点\n\n        for candidate_layout in enumerate_candidates(node):\n            if satisfies_constraints(candidate_layout, node):\n                assign(node, candidate_layout)\n                propagate_constraints(node)  # 传播到邻居\n\n                result = dfs_solve(remaining(unresolved_nodes))\n                if result is not None:\n                    return result\n\n                backtrack(node)  # 回溯\n\n        return None  # 无解\n\n    # Step 4: 指令选择 — 根据布局选择最优指令\n    select_instructions(program_graph)\n\n    return program_graph\n</code></pre>\n<h5>4. 系统架构</h5>\n<pre><code>┌─────────────────────────────────────────────────────────────┐\n│                     Hexcute 编译流程                         │\n│                                                             │\n│  用户程序 (Python DSL)                                       │\n│  ┌───────────────────────────────────────────┐              │\n│  │ • 显式指定: 数据流 (dataflow)              │              │\n│  │ • 显式指定: 流水线策略 (pipelining)         │              │\n│  │ • 自动化:   布局 (layout) ← Hexcute 合成   │              │\n│  └─────────────────┬─────────────────────────┘              │\n│                    ↓                                        │\n│  ┌─────────────────────────────────────────┐                │\n│  │         布局合成引擎 (Layout Synthesizer) │                │\n│  │  ┌──────────┐  ┌──────────┐  ┌────────┐ │                │\n│  │  │约束提取   │→│类型推断   │→│DFS求解  │ │                │\n│  │  │Constraint │  │Type      │  │Search  │ │                │\n│  │  │Extraction │  │Inference │  │        │ │                │\n│  │  └──────────┘  └──────────┘  └────────┘ │                │\n│  └─────────────────┬───────────────────────┘                │\n│                    ↓                                        │\n│  ┌─────────────────────────────────────────┐                │\n│  │         指令选择 + 代码生成               │                │\n│  │  • MMA 指令映射                          │                │\n│  │  • 内存操作 (LDG/STS/LDS) 生成           │                │\n│  │  • Swizzle 模式选择                      │                │\n│  │  • 寄存器分配                            │                │\n│  └─────────────────┬───────────────────────┘                │\n│                    ↓                                        │\n│           CUDA PTX / SASS 代码                              │\n└─────────────────────────────────────────────────────────────┘\n</code></pre>\n<h5>5. 关键设计决策</h5>\n<p><strong>为什么自动化布局而非数据流/流水线？</strong></p>\n<p>GPU 程序的三大关键维度：\n- <strong>数据流（Dataflow）</strong>：决定计算顺序和数据复用模式（如 GEMM 的分块策略）\n- <strong>流水线（Pipelining）</strong>：决定计算与内存访问的重叠方式（如双缓冲、多级流水线）\n- <strong>布局（Layout）</strong>：决定数据在内存层次中的排列方式</p>\n<p>Hexcute 的关键洞察：\n1. <strong>数据流和流水线</strong>对算法语义有直接影响，不同选择对应不同的算法变体，适合由程序员显式控制\n2. <strong>布局</strong>更像是\"实现细节\"，给定数据流和流水线后，最优布局可以通过约束求解自动确定\n3. 这种分离使得程序员只需关注高层算法设计，而将底层硬件适配交给编译器</p>\n<p><strong>布局约束的来源：</strong></p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>约束来源</th>\n<th>约束类型</th>\n<th>示例</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Tensor Core MMA</td>\n<td>操作数布局固定</td>\n<td>HMMA.16816 要求特定的线程-数据映射</td>\n</tr>\n<tr>\n<td>全局内存加载</td>\n<td>对齐 + 合并访问</td>\n<td>128-bit 向量化加载需要地址对齐</td>\n</tr>\n<tr>\n<td>共享内存</td>\n<td>Bank conflict 消除</td>\n<td>需要 Swizzle 模式</td>\n</tr>\n<tr>\n<td>寄存器文件</td>\n<td>容量限制</td>\n<td>每线程最大寄存器数</td>\n</tr>\n<tr>\n<td>操作间传递</td>\n<td>布局兼容性</td>\n<td>生产者输出布局 = 消费者输入布局</td>\n</tr>\n</tbody>\n</table></div>\n<h5>6. 实验评估</h5>\n<p><strong>基准测试平台：</strong> NVIDIA GPU（推测为 H100/A100）</p>\n<p><strong>GEMM 性能：</strong>\n- 与 cuBLAS 匹配（FP16、FP8 精度）\n- 代码量比 CUTLASS 减少 1.27×-7.94×</p>\n<p><strong>Attention 性能：</strong>\n- 与 FlashAttention 匹配\n- 支持多种 Attention 变体</p>\n<p><strong>混合类型 MoE（Mixture-of-Experts）：</strong>\n- 比 Triton 平均加速 6.46×\n- 这是 Hexcute 优势最明显的场景，因为 MoE 的不规则数据流使 Triton 的启发式方法失效</p>\n<p><strong>端到端 vLLM 推理：</strong></p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>模型</th>\n<th>加速比</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>DeepSeek-R1-AWQ</td>\n<td>2.60×</td>\n</tr>\n<tr>\n<td>Mamba-based model</td>\n<td>2.04×</td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>代码量对比（vs CUTLASS）：</strong></p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>算子</th>\n<th>代码减少倍数</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>最小</td>\n<td>1.27×</td>\n</tr>\n<tr>\n<td>最大</td>\n<td>7.94×</td>\n</tr>\n</tbody>\n</table></div>\n<h5>7. 与相关工作的对比</h5>\n<pre><code>                    编程负担\n                    高 ↑\n                      │  CUTLASS/CuTe\n                      │  (手动布局+数据流+流水线)\n                      │\n                      │      Hexcute ★\n                      │      (手动数据流+流水线, 自动布局)\n                      │\n                      │          Triton\n                      │          (全自动, 但复杂算子性能差)\n                    低 ↓\n                      ←─────────────────────→\n                     低     性能/灵活性      高\n</code></pre>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>框架</th>\n<th>布局</th>\n<th>数据流</th>\n<th>流水线</th>\n<th>复杂算子支持</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>CUTLASS/CuTe</td>\n<td>手动</td>\n<td>手动</td>\n<td>手动</td>\n<td>✅ 优秀</td>\n</tr>\n<tr>\n<td>Triton</td>\n<td>自动(启发式)</td>\n<td>自动(启发式)</td>\n<td>自动(启发式)</td>\n<td>❌ 受限</td>\n</tr>\n<tr>\n<td><strong>Hexcute</strong></td>\n<td><strong>自动(约束求解)</strong></td>\n<td>手动</td>\n<td>手动</td>\n<td><strong>✅ 优秀</strong></td>\n</tr>\n</tbody>\n</table></div>\n<hr />",
      "quiz": {
        "q": "",
        "options": [],
        "answer": 0,
        "explain": ""
      }
    }
  ],
  "categories": {
    "graph_compilers": {
      "label": "图级编译器",
      "color": "#2563eb"
    },
    "tensor_ir": {
      "label": "张量算子编译器",
      "color": "#16a34a"
    },
    "infrastructure": {
      "label": "编译基础设施",
      "color": "#9333ea"
    },
    "hardware_specific": {
      "label": "硬件特化优化",
      "color": "#ea580c"
    },
    "llm_driven": {
      "label": "LLM驱动编译",
      "color": "#db2777"
    }
  },
  "projectUrls": {}
};
