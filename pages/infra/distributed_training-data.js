/**
 * distributed_training-data.js — 由 pipeline/build.py 于 2026-05-20 16:45:40 自动生成。
 * 源文件：content/infra/distributed_training.md
 * ⚠️  请勿手动修改；如需更新，修改源文档后重新编译。
 */
window.PAGE_CONFIG = {
  "meta": {
    "domain": "infra",
    "topic_id": "distributed_training",
    "topic_name": "distributed_training",
    "page_title": "distributed_training",
    "page_subtitle": "2026-05-20 版",
    "page_desc": "",
    "page_icon": "📘",
    "hero_pills": [],
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
        "id": "hogwild",
        "x": 0,
        "y": 0,
        "category": "dp"
      },
      {
        "id": "parameter_server",
        "x": 300,
        "y": 0,
        "category": "dp"
      },
      {
        "id": "easgd",
        "x": 400,
        "y": 0,
        "category": "dp"
      },
      {
        "id": "horovod",
        "x": 700,
        "y": 0,
        "category": "dp"
      },
      {
        "id": "zero",
        "x": 900,
        "y": 0,
        "category": "dp"
      },
      {
        "id": "fsdp",
        "x": 1200,
        "y": 0,
        "category": "dp"
      },
      {
        "id": "megatron_tp",
        "x": 800,
        "y": 150,
        "category": "tp"
      },
      {
        "id": "tesseract",
        "x": 1100,
        "y": 150,
        "category": "tp"
      },
      {
        "id": "sequence_parallel",
        "x": 1200,
        "y": 150,
        "category": "tp"
      },
      {
        "id": "ulysses",
        "x": 1200,
        "y": 150,
        "category": "tp"
      },
      {
        "id": "lightseq",
        "x": 1200,
        "y": 150,
        "category": "tp"
      },
      {
        "id": "loogtrain",
        "x": 1300,
        "y": 150,
        "category": "tp"
      },
      {
        "id": "activation_recompute",
        "x": 1200,
        "y": 150,
        "category": "tp"
      },
      {
        "id": "dynamic_cp",
        "x": 1500,
        "y": 150,
        "category": "tp"
      },
      {
        "id": "gpipe",
        "x": 800,
        "y": 300,
        "category": "pp"
      },
      {
        "id": "pipedream",
        "x": 800,
        "y": 300,
        "category": "pp"
      },
      {
        "id": "interleaved_pp",
        "x": 1000,
        "y": 300,
        "category": "pp"
      },
      {
        "id": "zero_bubble",
        "x": 1300,
        "y": 300,
        "category": "pp"
      },
      {
        "id": "mist",
        "x": 1400,
        "y": 300,
        "category": "pp"
      },
      {
        "id": "dgc",
        "x": 700,
        "y": 450,
        "category": "comm"
      },
      {
        "id": "gradient_sparsification",
        "x": 700,
        "y": 450,
        "category": "comm"
      },
      {
        "id": "scalecom",
        "x": 900,
        "y": 450,
        "category": "comm"
      },
      {
        "id": "8bit_optimizer",
        "x": 1000,
        "y": 450,
        "category": "comm"
      },
      {
        "id": "coconet",
        "x": 1100,
        "y": 450,
        "category": "comm"
      },
      {
        "id": "zero_pp",
        "x": 1300,
        "y": 450,
        "category": "comm"
      },
      {
        "id": "centauri",
        "x": 1300,
        "y": 450,
        "category": "comm"
      },
      {
        "id": "fp8_allgather",
        "x": 1500,
        "y": 450,
        "category": "comm"
      },
      {
        "id": "gshard",
        "x": 900,
        "y": 600,
        "category": "hybrid"
      },
      {
        "id": "switch_transformer",
        "x": 1100,
        "y": 600,
        "category": "hybrid"
      },
      {
        "id": "deepspeed_moe",
        "x": 1100,
        "y": 600,
        "category": "hybrid"
      },
      {
        "id": "tutel",
        "x": 1200,
        "y": 600,
        "category": "hybrid"
      },
      {
        "id": "colossal_ai",
        "x": 1200,
        "y": 600,
        "category": "hybrid"
      },
      {
        "id": "galvatron",
        "x": 1100,
        "y": 600,
        "category": "hybrid"
      },
      {
        "id": "moe_folding",
        "x": 1400,
        "y": 600,
        "category": "hybrid"
      },
      {
        "id": "x_moe",
        "x": 1400,
        "y": 600,
        "category": "hybrid"
      },
      {
        "id": "fsmoe",
        "x": 1400,
        "y": 600,
        "category": "hybrid"
      },
      {
        "id": "megascale_moe",
        "x": 1500,
        "y": 600,
        "category": "hybrid"
      },
      {
        "id": "sub_moe",
        "x": 1500,
        "y": 600,
        "category": "hybrid"
      },
      {
        "id": "layer_dist_opt",
        "x": 1500,
        "y": 600,
        "category": "hybrid"
      }
    ],
    "edges": [
      {
        "from": "parameter_server",
        "to": "easgd",
        "label": "改进同步效率"
      },
      {
        "from": "parameter_server",
        "to": "horovod",
        "label": "优化带宽"
      },
      {
        "from": "horovod",
        "to": "zero",
        "label": "消除冗余"
      },
      {
        "from": "zero",
        "to": "fsdp",
        "label": "工业化实现"
      },
      {
        "from": "megatron_tp",
        "to": "tesseract",
        "label": "2D切分"
      },
      {
        "from": "megatron_tp",
        "to": "sequence_parallel",
        "label": "序列切分"
      },
      {
        "from": "sequence_parallel",
        "to": "ulysses",
        "label": "长序列支持"
      },
      {
        "from": "sequence_parallel",
        "to": "lightseq",
        "label": "轻量化"
      },
      {
        "from": "ulysses",
        "to": "loogtrain",
        "label": "2D注意力"
      },
      {
        "from": "sequence_parallel",
        "to": "activation_recompute",
        "label": "减少开销"
      },
      {
        "from": "loogtrain",
        "to": "dynamic_cp",
        "label": "动态调整"
      },
      {
        "from": "gpipe",
        "to": "pipedream",
        "label": "优化显存"
      },
      {
        "from": "pipedream",
        "to": "interleaved_pp",
        "label": "减小气泡"
      },
      {
        "from": "interleaved_pp",
        "to": "zero_bubble",
        "label": "零气泡"
      },
      {
        "from": "zero_bubble",
        "to": "mist",
        "label": "协同优化"
      },
      {
        "from": "dgc",
        "to": "gradient_sparsification",
        "label": "理论证明"
      },
      {
        "from": "gradient_sparsification",
        "to": "scalecom",
        "label": "可扩展"
      },
      {
        "from": "zero",
        "to": "zero_pp",
        "label": "通信优化"
      },
      {
        "from": "coconet",
        "to": "centauri",
        "label": "细粒度重叠"
      },
      {
        "from": "zero_pp",
        "to": "fp8_allgather",
        "label": "FP8量化"
      },
      {
        "from": "gshard",
        "to": "switch_transformer",
        "label": "Top-1路由"
      },
      {
        "from": "gshard",
        "to": "deepspeed_moe",
        "label": "金字塔结构"
      },
      {
        "from": "deepspeed_moe",
        "to": "tutel",
        "label": "All-to-All优化"
      },
      {
        "from": "switch_transformer",
        "to": "moe_folding",
        "label": "并行折叠"
      },
      {
        "from": "switch_transformer",
        "to": "x_moe",
        "label": "HPC扩展"
      },
      {
        "from": "tutel",
        "to": "fsmoe",
        "label": "灵活配置"
      },
      {
        "from": "moe_folding",
        "to": "megascale_moe",
        "label": "生产级"
      },
      {
        "from": "switch_transformer",
        "to": "sub_moe",
        "label": "专家压缩"
      },
      {
        "from": "fsdp",
        "to": "layer_dist_opt",
        "label": "高阶优化器"
      }
    ],
    "milestones": [
      "zero",
      "megatron_tp",
      "megascale_moe"
    ]
  },
  "algos": [
    {
      "id": "hogwild",
      "num": 1,
      "name": "HOGWILD!",
      "fullName": "无锁异步SGD (HOGWILD!)",
      "year": "2011",
      "org": "Univ. of Wisconsin",
      "parent": "—",
      "paperUrl": "https://proceedings.neurips.cc/paper/2011/hash/218a0a56d9938398fa2fdad06f4dd334-Abstract.html",
      "projectUrl": "",
      "category": "dp",
      "motivation": "无锁异步更新允许Worker直接覆盖全局参数",
      "summary": "HOGWILD! 提出在共享内存多核系统上**完全无锁**地并行执行 SGD，利用优化问题的稀疏可分结构证明处理器间写冲突概率极低，从而在理论和实验上均实现了近线性加速比，比所有加锁方案快一个数量级。",
      "keyPoints": [
        "<strong>稀疏可分代价函数</strong>：目标函数形如 \\(f(x) = \\sum_{e \\in E} f_e(x_e)\\)，每个子函数 \\(f_e\\) 仅依赖决策变量的一小部分 \\(x_e\\)",
        "<strong>无锁共享内存协议</strong>：多个处理器同时读写共享向量 \\(x\\)，仅要求单个分量的写操作是原子的（硬件天然支持）",
        "<strong>稀疏性度量</strong>：定义 \\(\\Omega\\)（节点最大度）、\\(\\rho\\)（边对重叠率）、\\(\\Delta\\)（最大边重叠分数）三个量刻画冲突概率",
        "<strong>收敛保证（Proposition 4.1）</strong>：在 L-Lipschitz 梯度 + c-强凸条件下，当梯度延迟 \\(\\tau = o(n^{1/4})\\) 时，收敛速率与串行 SGD 相同，实现近线性加速",
        "<strong>实验验证</strong>：在稀疏 SVM、矩阵补全、图割三类任务上，HOGWILD! 均以数量级优势超越加锁方案"
      ],
      "detail": "<p><img alt=\"HOGWILD! 稀疏结构示意图\" src=\"https://ar5iv.labs.arxiv.org/html/1106.5730v2/assets/fig1.png\" />\n<em>图：代价函数诱导的超图结构。(a) 稀疏 SVM 中每个样本对应一条超边；(b) 矩阵补全中行列构成二部图；(c) 图割问题直接对应原图。稀疏性意味着超边之间重叠极少。</em></p>\n<pre><code class=\"language-python\"># HOGWILD! Algorithm 1 — 每个处理器独立执行的无锁更新\n# 共享: 决策变量 x (n维向量, 存于共享内存)\n# 输入: 步长 γ, 子函数集合 {f_e}_{e∈E}\n\ndef hogwild_worker(x_shared, gamma, E):\n    &quot;&quot;&quot;单个处理器的执行循环（无锁）&quot;&quot;&quot;\n    while not converged:\n        # Step 1: 均匀随机采样一条超边\n        e = sample_uniform(E)\n\n        # Step 2: 读取当前 x 的相关分量（可能是过时的）\n        x_e = read_components(x_shared, e)  # 无锁读\n\n        # Step 3: 计算该子函数的（子）梯度\n        G_e = compute_subgradient(f_e, x_e)\n\n        # Step 4: 原子更新每个涉及的分量\n        for v in e:\n            # 硬件保证单分量写入是原子的\n            x_shared[v] -= gamma * G_e[v]  # 无锁写\n</code></pre>\n<p><strong>动机与背景</strong></p>\n<p>传统并行 SGD 方案（如基于 MapReduce 的 AllReduce 同步、参数服务器加锁）在多核共享内存场景下面临严重的同步开销。多核系统的共享内存带宽可达 12GB/s、延迟仅数十纳秒，但锁竞争会将这一优势完全抵消。HOGWILD! 的核心洞察是：<strong>如果优化问题本身是稀疏的，那么多个处理器同时写同一分量的概率极低，无锁并行几乎不会引入额外误差。</strong></p>\n<p><strong>稀疏可分结构的形式化</strong></p>\n<p>将目标函数建模为超图 \\(\\mathcal{H} = (V, E)\\)：\n- 节点集 \\(V = \\{1, \\ldots, n\\}\\) 对应决策变量的各分量\n- 超边集 \\(E\\) 中每条边 \\(e\\) 对应一个子函数 \\(f_e\\)，仅涉及节点子集 \\(e \\subseteq V\\)</p>\n<p>定义三个稀疏性度量：</p>\n<p>$$\\Omega = \\max_v |\\\\{e \\in E : v \\in e\\\\}| / |E|$$</p>\n<p>$$\\rho = \\max_e |e| / n$$</p>\n<p>$$\\Delta = \\max_{e_1 \\neq e_2} |e_1 \\cap e_2| / |e_1|$$</p>\n<div class=\"key-point\">💡 关键：\\(\\Omega\\) 衡量单个变量被多少子函数共享（冲突频率），\\(\\rho\\) 衡量单次更新涉及的变量比例，\\(\\Delta\\) 衡量两次更新的重叠程度。三者越小，无锁并行越安全。</div>\n<p><strong>异步更新的数学建模</strong></p>\n<p>在异步执行中，处理器 j 使用的梯度基于一个<strong>过时</strong>的状态 \\(x_{k(j)}\\)，其中 \\(j - k(j) \\leq \\tau\\)（\\(\\tau\\) 为最大延迟，正比于处理器数量）。更新规则为：</p>\n<p>$$x_{j+1} = x_j - \\gamma \\cdot |e| \\cdot \\mathcal{P}_v^T G_e(x_{k(j)})$$</p>\n<p>其中 \\(\\mathcal{P}_v\\) 是到分量 \\(v\\) 的投影算子，\\(|e|\\) 是缩放因子（对应 with-replacement 采样的无偏修正）。</p>\n<p><strong>收敛性分析（Proposition 4.1）</strong></p>\n<p>在以下假设下：\n1. 每个 \\(f_e\\) 凸，\\(f\\) 强凸（模 \\(c\\)）\n2. \\(\\nabla f\\) 为 L-Lipschitz 连续\n3. 子梯度有界：\\(\\|G_e(x_e)\\|_2 \\leq M\\)\n4. 梯度延迟 \\(\\tau\\) 有界</p>\n<p>选择步长：</p>\n<p>$$\\gamma = \\frac{\\vartheta \\epsilon c}{2LM^2 \\Omega(1 + 6\\rho\\tau + 4\\tau^2 \\Omega \\Delta^{1/2})}$$</p>\n<p>则经过以下步数后 \\(\\mathbb{E}[f(x_k) - f_\\star] \\leq \\epsilon\\)：</p>\n<p>$$k \\geq \\frac{2LM^2 \\Omega(1 + 6\\tau\\rho + 6\\tau^2 \\Omega \\Delta^{1/2}) \\log(LD_0/\\epsilon)}{c^2 \\vartheta \\epsilon}$$</p>\n<div class=\"key-point\">💡 关键：当 \\(\\tau = 0\\)（串行），退化为标准 SGD 的 \\(O(\\frac{1}{\\epsilon}\\log\\frac{1}{\\epsilon})\\) 线性收敛速率。当 \\(\\tau = o(n^{1/4})\\) 且 \\(\\rho, \\Delta = o(1/n)\\)（典型稀疏问题），额外代价可忽略 → <strong>近线性加速</strong>。</div>\n<p><strong>与传统方法的对比</strong></p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>同步机制</th>\n<th>通信开销</th>\n<th>适用场景</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>AllReduce SGD</td>\n<td>全局同步</td>\n<td>高</td>\n<td>密集模型/集群</td>\n</tr>\n<tr>\n<td>参数服务器 (加锁)</td>\n<td>读写锁</td>\n<td>中</td>\n<td>通用</td>\n</tr>\n<tr>\n<td><strong>HOGWILD!</strong></td>\n<td><strong>无锁</strong></td>\n<td><strong>零</strong></td>\n<td>稀疏问题/共享内存</td>\n</tr>\n<tr>\n<td>Downpour SGD</td>\n<td>异步+锁</td>\n<td>中</td>\n<td>集群</td>\n</tr>\n</tbody>\n</table></div>\n<p>HOGWILD! 的优势在于：(1) 零同步开销；(2) 实现极其简单（仅需原子加）；(3) 在稀疏问题上理论保证最优。局限性在于要求问题具备稀疏结构，且仅适用于共享内存（单机多核）场景。</p>\n<p><strong>实验结果</strong></p>\n<p>在三个典型稀疏学习任务上验证：\n- <strong>稀疏 SVM</strong>（RCV1 数据集，78万维特征，平均每样本仅涉及 0.16% 特征）：10 核加速比约 9.5x\n- <strong>矩阵补全</strong>（Netflix 数据集，48万用户×18万电影，仅 1% 条目已知）：10 核加速比约 9.2x<br />\n- <strong>图割</strong>（DBLife 数据集）：10 核加速比约 8.8x</p>\n<p>所有任务中，HOGWILD! 均以 5-10 倍速度优势超越对应的加锁版本（Round-Robin 锁、全局互斥锁等）。</p>",
      "quiz": {
        "q": "HOGWILD! 能够在无锁条件下保证收敛的关键前提是什么？",
        "options": [
          "处理器数量必须是偶数",
          "优化问题具有稀疏可分结构，使得并发写冲突概率极低",
          "必须使用递减步长 γ_k = 1/k",
          "所有处理器必须使用相同的随机种子"
        ],
        "answer": 1,
        "explain": "HOGWILD! 的理论保证依赖于稀疏性度量 (Ω, ρ, Δ) 足够小，确保不同处理器同时修改同一变量的概率可忽略，从而无锁并行不会显著影响收敛。"
      }
    },
    {
      "id": "parameter_server",
      "num": 2,
      "name": "Parameter Server",
      "fullName": "参数服务器 (Parameter Server)",
      "year": "2014",
      "org": "CMU/Google",
      "parent": "—",
      "paperUrl": "https://proceedings.neurips.cc/paper_files/paper/2014/hash/935ad074f32d1e8f085a143449894cdc-Abstract.html",
      "projectUrl": "",
      "category": "dp",
      "motivation": "Server-Worker架构支持异步/同步梯度聚合",
      "summary": "Parameter Server 通过引入灵活的异步一致性模型和用户自定义过滤器两大松弛策略，大幅降低分布式机器学习中的通信开销，并提出延迟块近端梯度法（Delayed Block Proximal Gradient）在非凸非光滑问题上给出收敛保证，实现了在 636TB 数据、1000 台机器上的近线性加速。",
      "keyPoints": [
        "<strong>参数服务器架构</strong>：Server 节点维护全局共享参数，Worker 节点并行计算梯度并通过 push/pull 接口通信",
        "<strong>两大通信松弛策略</strong>：(1) 异步任务依赖的灵活一致性模型（Sequential / Eventual / Bounded Delay）；(2) 用户自定义过滤器（如 KKT filter）",
        "<strong>延迟块近端梯度法 (DBPG)</strong>：针对非凸非光滑复合优化问题，在有界延迟 \\(\\tau\\) 下证明收敛到临界点",
        "<strong>KKT 过滤器</strong>：仅传输可能改变最优活跃集的参数，对稀疏模型可过滤 98%+ 的无效通信",
        "<strong>Key Caching + Compression</strong>：利用参数键的时间局部性缓存 key 列表，结合 Snappy 压缩降低带宽",
        "<strong>实验规模</strong>：ℓ₁ 正则化逻辑回归在 636TB 广告点击数据上训练，1000 台机器实现 800× 加速",
        "<strong>极简接口</strong>：用户仅需约 300 行代码即可实现完整算法，对比同类系统需 10,000+ 行"
      ],
      "detail": "<h5>系统架构示意</h5>\n<pre><code>┌─────────────────────────────────────────────────────┐\n│                   Server Group                       │\n│  ┌─────────┐  ┌─────────┐  ┌─────────┐            │\n│  │Server 1 │  │Server 2 │  │Server 3 │  ...       │\n│  │(keys    │  │(keys    │  │(keys    │            │\n│  │ 1..k/3) │  │k/3..2k/3│  │2k/3..k) │            │\n│  └────┬────┘  └────┬────┘  └────┬────┘            │\n└───────┼─────────────┼─────────────┼────────────────┘\n        │  push/pull  │             │\n┌───────┼─────────────┼─────────────┼────────────────┐\n│  ┌────┴────┐  ┌────┴────┐  ┌────┴────┐            │\n│  │Worker 1 │  │Worker 2 │  │Worker 3 │  ...       │\n│  │(data    │  │(data    │  │(data    │            │\n│  │ shard 1)│  │ shard 2)│  │ shard 3)│            │\n│  └─────────┘  └─────────┘  └─────────┘            │\n│                   Worker Group                       │\n└─────────────────────────────────────────────────────┘\n</code></pre>\n<p><em>图：Parameter Server 架构。Server 按 key range 分片存储全局参数，Worker 持有数据分片并通过 push/pull 与 Server 交互。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># Delayed Block Proximal Gradient (DBPG) - Worker 端\ndef worker_task(worker_id, data_shard, server):\n    while not converged:\n        # 1. Pull: 从 Server 拉取当前参数（可能有延迟 τ）\n        w = server.pull(keys, deps=task_dependencies)\n\n        # 2. Compute: 在本地数据上计算梯度\n        grad = compute_gradient(data_shard, w)\n\n        # 3. Filter: 应用用户自定义过滤器（如 KKT filter）\n        filtered_grad = kkt_filter(grad, w)\n\n        # 4. Push: 将过滤后的梯度推送到 Server\n        server.push(filtered_keys, filtered_grad)\n\n# Server 端聚合\ndef server_update(key, received_grads):\n    # 聚合梯度并执行近端算子\n    g = aggregate(received_grads)\n    # 近端梯度更新（处理 ℓ₁ 正则化等非光滑项）\n    w[key] = prox_operator(w[key] - η * g, λ)\n</code></pre>\n<h5>动机与背景</h5>\n<p>分布式机器学习的核心瓶颈在于<strong>通信开销</strong>。当数据规模达到数百 TB、参数维度达到数十亿时，Worker 与 Server 之间的参数同步成为性能瓶颈。传统 BSP（Bulk Synchronous Parallel）模式要求所有 Worker 完成当前迭代后才能进入下一轮，导致：</p>\n<ol>\n<li><strong>同步屏障</strong>（Barrier）使得最慢的 Worker 决定整体速度</li>\n<li><strong>全量通信</strong>每轮传输所有参数，即使大部分参数变化极小</li>\n<li><strong>网络带宽</strong>成为扩展性的硬约束</li>\n</ol>\n<div class=\"key-point\">💡 关键：本文的核心洞察是——大多数分布式 ML 算法并不需要完全同步的参数视图，适度的\"陈旧性\"（staleness）不会破坏收敛性，反而能大幅提升吞吐量。</div>\n<h5>核心机制一：灵活一致性模型</h5>\n<p>论文提出三种一致性模型，通过任务间的依赖关系（dependency）控制：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>一致性模型</th>\n<th>描述</th>\n<th>延迟</th>\n<th>适用场景</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Sequential</td>\n<td>所有任务串行执行</td>\n<td>0</td>\n<td>调试、精确验证</td>\n</tr>\n<tr>\n<td>Eventual</td>\n<td>无任何依赖约束</td>\n<td>无界</td>\n<td>对陈旧性不敏感的算法</td>\n</tr>\n<tr>\n<td>Bounded Delay</td>\n<td>新任务需等待 \\(\\tau\\) 轮前的任务完成</td>\n<td>≤ \\(\\tau\\)</td>\n<td>大多数实际场景</td>\n</tr>\n</tbody>\n</table></div>\n<p>Bounded Delay 模型的形式化定义：</p>\n<p>$$\\text{task } t \\text{ 开始前，所有 task } t' \\leq t - \\tau \\text{ 必须已完成}$$</p>\n<p>这意味着 Worker 看到的参数最多落后 \\(\\tau\\) 个迭代，在实践中 \\(\\tau\\) 通常设为 Worker 数量的一小部分。</p>\n<h5>核心机制二：用户自定义过滤器</h5>\n<p>过滤器在 push/pull 操作时决定哪些 (key, value) 对需要实际传输。论文重点介绍了 <strong>KKT Filter</strong>：</p>\n<p>对于 ℓ₁ 正则化问题 \\(\\min_w f(w) + \\lambda \\|w\\|_1\\)，KKT 最优性条件为：</p>\n<p>$$|[\\nabla f(w)]_i| \\leq \\lambda \\implies w_i^* = 0$$</p>\n<p>即如果某个参数的梯度绝对值小于正则化系数 \\(\\lambda\\)，则该参数在最优解处为零，无需传输。KKT Filter 的工作原理：</p>\n<ol>\n<li>Worker 计算局部梯度后，检查每个参数是否满足 KKT 条件</li>\n<li>仅传输<strong>违反</strong> KKT 条件的参数（即活跃集中的参数）</li>\n<li>对于高度稀疏的模型（如广告 CTR 预估），可过滤掉 <strong>98% 以上</strong>的参数通信</li>\n</ol>\n<div class=\"warn-box\">⚠️ 注意：KKT Filter 不是近似——它利用的是精确的最优性条件，因此不会影响最终收敛精度，只是跳过了\"确定为零\"的参数更新。</div>\n<h5>核心机制三：延迟块近端梯度法 (DBPG) 的收敛分析</h5>\n<p>论文考虑如下非凸非光滑复合优化问题：</p>\n<p>$$\\min_{w \\in \\mathbb{R}^p} F(w) = f(w) + h(w)$$</p>\n<p>其中 \\(f\\) 是光滑（可能非凸）函数，\\(h\\) 是非光滑凸正则化项（如 \\(\\|w\\|_1\\)）。</p>\n<p><strong>关键假设：</strong>\n- \\(\\nabla f\\) 是 Lipschitz 连续的，常数为 \\(L\\)\n- 延迟有界：\\(\\tau_{\\max} \\leq \\tau\\)\n- 块坐标更新：每次仅更新参数的一个子集（block）</p>\n<p><strong>收敛定理（Theorem 1）：</strong> 设学习率 \\(\\eta = \\frac{c}{L(\\tau+1)}\\)（其中 \\(c < 1\\)），则经过 \\(T\\) 次迭代后：</p>\n<p>$$\\frac{1}{T} \\sum_{t=1}^{T} \\mathbb{E}\\left[\\left\\| G_\\eta(w^t) \\right\\|^2\\right] \\leq \\frac{2L(\\tau+1)(F(w^0) - F^*)}{cT}$$</p>\n<p>其中 \\(G_\\eta(w) = \\frac{1}{\\eta}(w - \\text{prox}_{\\eta h}(w - \\eta \\nabla f(w)))\\) 是广义梯度映射。</p>\n<div class=\"key-point\">💡 关键：收敛速率为 \\(O\\left(\\frac{\\tau+1}{T}\\right)\\)，说明延迟 \\(\\tau\\) 仅线性减慢收敛，而并行带来的吞吐量提升通常远超此代价。当 Worker 数 \\(P\\) 满足 \\(P \\leq O(\\sqrt{T})\\) 时，可实现近线性加速。</div>\n<h5>通信优化：Key Caching 与压缩</h5>\n<p>除了算法层面的过滤，系统层面还采用：</p>\n<ol>\n<li><strong>Key Caching</strong>：Worker 与 Server 之间缓存已传输的 key 列表。若连续两次 push 的 key 集合相同（时间局部性），则第二次仅传 value，节省 key 传输开销</li>\n<li><strong>Value 压缩</strong>：使用 Snappy 对 value 向量进行压缩，对稀疏梯度效果显著</li>\n<li><strong>Range Push/Pull</strong>：支持按 key 范围批量操作，减少 RPC 次数</li>\n</ol>\n<h5>与传统方法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>MapReduce/AllReduce</th>\n<th>第一代 PS</th>\n<th>本文 (第三代 PS)</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>同步模型</td>\n<td>严格 BSP</td>\n<td>简单异步</td>\n<td>灵活一致性（3种）</td>\n</tr>\n<tr>\n<td>通信过滤</td>\n<td>无</td>\n<td>无</td>\n<td>KKT Filter 等</td>\n</tr>\n<tr>\n<td>收敛保证</td>\n<td>同步保证</td>\n<td>无理论</td>\n<td>DBPG 定理</td>\n</tr>\n<tr>\n<td>容错</td>\n<td>重启任务</td>\n<td>检查点</td>\n<td>向量时钟+复制</td>\n</tr>\n<tr>\n<td>编程复杂度</td>\n<td>高</td>\n<td>中</td>\n<td>低（~300行）</td>\n</tr>\n</tbody>\n</table></div>\n<h5>实验结果</h5>\n<p>在 636TB 广告点击预测数据集上（1000 台机器，每台 16 核 + 192GB 内存）：</p>\n<ul>\n<li><strong>稀疏逻辑回归</strong>（170 亿参数）：Bounded Delay (\\(\\tau=8\\)) 相比 Sequential 获得 <strong>800×</strong> 加速</li>\n<li><strong>KKT Filter 效果</strong>：过滤 98.4% 的参数通信，几乎不影响收敛精度</li>\n<li><strong>Key Caching</strong>：减少 40-50% 的网络传输量</li>\n<li><strong>对比 Vowpal Wabbit</strong>：PS 框架在相同精度下快 10× 以上</li>\n</ul>",
      "quiz": {
        "q": "Parameter Server 中 KKT Filter 的核心原理是什么？",
        "options": [
          "随机丢弃一定比例的梯度以减少通信量",
          "利用 ℓ₁ 正则化的最优性条件，仅传输可能非零的参数梯度",
          "对梯度进行 Top-K 稀疏化，只保留最大的 K 个分量",
          "通过量化将 32 位浮点梯度压缩为 1 位信号"
        ],
        "answer": 1,
        "explain": "KKT Filter 利用 ℓ₁ 正则化的 KKT 条件：若 |∇f(w)_i| ≤ λ，则 w_i* = 0，该参数无需传输。这是精确的最优性条件而非近似。"
      }
    },
    {
      "id": "easgd",
      "num": 3,
      "name": "EASGD",
      "fullName": "弹性平均SGD (Elastic Averaging SGD)",
      "year": "2015",
      "org": "NYU/Facebook",
      "parent": "parameter_server",
      "paperUrl": "https://arxiv.org/abs/1412.6651",
      "projectUrl": "",
      "category": "dp",
      "motivation": "弹性中心变量平衡本地探索与全局同步",
      "summary": "EASGD 提出以弹性力（elastic force）连接各 worker 的本地参数与全局中心参数，通过可调弹性强度 \\(\\rho\\) 在探索（exploration）与利用（exploitation）之间取得平衡，解决了传统分布式 SGD 方法（如 DOWNPOUR）中梯度过时和通信频率敏感的问题，在深度学习分布式训练中实现更好的泛化性能。",
      "keyPoints": [
        "<strong>弹性力机制</strong>：通过二次惩罚项 \\(\\frac{\\rho}{2}\\|x^i - \\tilde{x}\\|^2\\) 将 worker 参数 \\(x^i\\) 与中心参数 \\(\\tilde{x}\\) 弹性耦合",
        "<strong>探索-利用权衡</strong>：小 \\(\\rho\\) 允许 worker 更自由地探索参数空间，大 \\(\\rho\\) 强制更紧密同步",
        "<strong>异步通信</strong>：worker 独立计算梯度，每隔 \\(\\tau\\) 步与 master 通信一次，通信频率可大幅降低",
        "<strong>动量变体 EAMSGD</strong>：结合 Nesterov 动量加速收敛",
        "<strong>稳定性优于 ADMM</strong>：理论分析证明 EASGD 在更大的学习率和动量范围内保持稳定",
        "<strong>实验验证</strong>：CIFAR-10（7层CNN，p=4/8/16）和 ImageNet（11层CNN，p=4/8），p=16 时达到 11.1x 加速比",
        "<strong>对通信周期 \\(\\tau\\) 鲁棒</strong>：即使 \\(\\tau\\) 较大（如 20），EAMSGD 仍优于 DOWNPOUR 和 ADMM"
      ],
      "detail": "<h5>核心框架示意</h5>\n<p><img alt=\"EASGD 稳定性分析图\" src=\"https://ar5iv.labs.arxiv.org/html/1412.6651/assets/x1.png\" />\n<em>图：EASGD 与 ADMM 在不同学习率 \\(\\eta\\) 和动量 \\(\\delta\\) 下的稳定性对比。EASGD（蓝色）的稳定区域显著大于 ADMM（红色），表明 EASGD 对超参数更鲁棒。</em></p>\n<p><img alt=\"CIFAR-10 实验结果\" src=\"https://ar5iv.labs.arxiv.org/html/1412.6651/assets/x3.png\" />\n<em>图：CIFAR-10 上不同方法的训练/测试损失和测试误差随时间变化曲线（p=4 workers）。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># EASGD 异步并行算法 (Algorithm 1)\n# Master 进程:\nx_center = initialize_parameters()\n\n# 每个 Worker i (并行执行):\nx_local_i = x_center.copy()\nt = 0\nwhile not converged:\n    # 1. 本地 SGD 更新\n    g = compute_gradient(x_local_i, minibatch)\n    x_local_i = x_local_i - eta * g\n    t += 1\n\n    # 2. 每隔 τ 步与 master 通信\n    if t % tau == 0:\n        # Worker 端弹性更新\n        x_local_i = x_local_i - alpha * (x_local_i - x_center)\n        # Master 端弹性更新  \n        x_center = x_center + alpha * (x_local_i - x_center)\n\n# EAMSGD (Algorithm 2) - 带动量变体:\n# Worker 端额外维护动量变量 v_i\nv_i = 0\nwhile not converged:\n    g = compute_gradient(x_local_i, minibatch)\n    v_i = delta * v_i - eta * g  # 动量更新\n    x_local_i = x_local_i + v_i - alpha * (x_local_i - x_center)  # 弹性+动量\n    if t % tau == 0:\n        x_center = x_center + alpha * (x_local_i - x_center)\n</code></pre>\n<h5>动机与背景</h5>\n<p>分布式深度学习训练面临两大核心挑战：</p>\n<ol>\n<li><strong>通信开销</strong>：传统同步 SGD（如 AllReduce）要求每步都同步梯度，通信成为瓶颈</li>\n<li><strong>梯度过时（staleness）</strong>：异步方法（如 DOWNPOUR）中 worker 使用过时参数计算梯度，导致训练不稳定</li>\n</ol>\n<p>DOWNPOUR SGD 采用参数服务器架构，worker 异步推送梯度并拉取参数，但其本质是对中心变量做梯度下降，当通信延迟增大时性能急剧下降。EASGD 从根本上重新设计了 worker 与 master 的交互方式。</p>\n<h5>核心机制：弹性平均</h5>\n<p>EASGD 的核心思想源自以下优化目标：</p>\n<p>$$F(x^1, \\ldots, x^p, \\tilde{x}) = \\sum_{i=1}^{p} f(x^i) + \\frac{\\rho}{2} \\sum_{i=1}^{p} \\|x^i - \\tilde{x}\\|^2$$</p>\n<p>其中 \\(f(x^i)\\) 是第 \\(i\\) 个 worker 的本地损失函数，\\(\\tilde{x}\\) 是中心变量，\\(\\rho\\) 是弹性强度（penalty）。</p>\n<div class=\"key-point\">💡 <strong>关键直觉</strong>：弹性力像\"橡皮筋\"一样连接每个 worker 和中心——worker 可以自由探索局部参数空间，但不会偏离中心太远。\\(\\rho\\) 越小，\"橡皮筋\"越松，探索空间越大。</div>\n<p>对该目标分别对 \\(x^i\\) 和 \\(\\tilde{x}\\) 求梯度，得到更新规则：</p>\n<p><strong>Worker 更新</strong>（结合 SGD）：\n$$x_{t+1}^i = x_t^i - \\eta \\left( \\tilde{g}_t^i + \\rho(x_t^i - \\tilde{x}_t) \\right)$$</p>\n<p><strong>Master 更新</strong>（对中心变量取梯度为零）：\n$$\\tilde{x}_{t+1} = \\frac{1}{p} \\sum_{i=1}^{p} x_{t+1}^i$$</p>\n<p>但在异步实现中，master 无法同时获取所有 worker 参数。因此实际采用<strong>移动平均</strong>更新：</p>\n<p>$$\\tilde{x}_{t+1} = (1 - \\beta) \\tilde{x}_t + \\beta x_{t+1}^i, \\quad \\beta = p \\cdot \\alpha$$</p>\n<p>其中 \\(\\alpha = \\eta \\rho\\) 是弹性更新步长。设 \\(\\beta = p\\alpha\\) 保证了弹性力的对称性——从 worker 角度施加的总力等于 center 接收的总力。</p>\n<h5>通信周期 \\(\\tau\\) 的作用</h5>\n<p>在异步 EASGD 中，worker 并非每步都与 master 通信，而是每隔 \\(\\tau\\) 步通信一次。这带来两个效果：</p>\n<ol>\n<li><strong>降低通信开销</strong>：\\(\\tau\\) 越大，通信频率越低，计算/通信比越高</li>\n<li><strong>增强探索</strong>：worker 在两次通信之间可以自由地沿本地梯度方向走 \\(\\tau\\) 步，探索更多局部结构</li>\n</ol>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：\\(\\tau\\) 过大会导致 worker 偏离过远，但实验表明 EASGD/EAMSGD 对 \\(\\tau\\) 的鲁棒性远优于 DOWNPOUR。在 \\(\\tau=20\\) 时 EAMSGD 仍能获得优异的测试误差。</div>\n<h5>与 ADMM 的对比</h5>\n<p>ADMM（交替方向乘子法）的分布式更新为：</p>\n<p>$$x_{t+1}^i = x_t^i - \\eta \\left( \\tilde{g}_t^i + \\rho(x_t^i - \\tilde{x}_t) + \\lambda_t^i \\right)$$</p>\n<p>其中 \\(\\lambda^i\\) 是对偶变量（拉格朗日乘子），在每次通信时更新：\\(\\lambda_{t+1}^i = \\lambda_t^i + \\rho(x_{t+1}^i - \\tilde{x}_{t+1})\\)。</p>\n<p>EASGD 去掉了对偶变量 \\(\\lambda^i\\)，这看似\"弱化\"了约束，但实际带来了关键优势：</p>\n<ul>\n<li><strong>更大的稳定区域</strong>：线性稳定性分析表明，EASGD 在学习率 \\(\\eta\\) 和动量 \\(\\delta\\) 的更大范围内保持稳定</li>\n<li><strong>更好的探索能力</strong>：没有对偶变量的累积惩罚，worker 可以更自由地探索</li>\n<li><strong>实验验证</strong>：EASGD 在测试误差上始终优于 ADMM</li>\n</ul>\n<h5>与 DOWNPOUR 的本质区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>DOWNPOUR SGD</th>\n<th>EASGD</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>更新目标</td>\n<td>中心变量直接接收梯度</td>\n<td>中心变量通过弹性平均更新</td>\n</tr>\n<tr>\n<td>Worker 角色</td>\n<td>计算梯度后推送给 master</td>\n<td>维护独立参数，定期与 center 对齐</td>\n</tr>\n<tr>\n<td>通信内容</td>\n<td>梯度 \\(\\Delta x\\)</td>\n<td>参数差 \\(x^i - \\tilde{x}\\)</td>\n</tr>\n<tr>\n<td>探索能力</td>\n<td>受限（worker 参数被频繁覆盖）</td>\n<td>强（worker 保持独立参数轨迹）</td>\n</tr>\n<tr>\n<td>\\(\\tau\\) 敏感性</td>\n<td>高（大 \\(\\tau\\) 性能急剧下降）</td>\n<td>低（大 \\(\\tau\\) 仍保持良好性能）</td>\n</tr>\n</tbody>\n</table></div>\n<h5>实验结果要点</h5>\n<p><strong>CIFAR-10</strong>（7层CNN，p=4/8/16 GPU）：\n- EAMSGD 在所有通信周期 \\(\\tau \\in \\{1, 5, 10, 20\\}\\) 下均优于 DOWNPOUR 和 ADMM\n- \\(\\tau=10\\) 时 EAMSGD 达到最佳测试误差，优于 \\(\\tau=1\\)（说明适度减少通信反而有利于泛化）\n- p=16 时实现 11.1x 加速比（相对于单 GPU 基线）</p>\n<p><strong>ImageNet</strong>（11层CNN，p=4/8 GPU）：\n- EAMSGD 在大规模数据集上同样表现最优\n- 验证了方法的可扩展性</p>",
      "quiz": {
        "q": "EASGD 中弹性强度参数 ρ 减小时，对训练过程的影响是什么？",
        "options": [
          "Worker 参数被强制与中心参数保持一致，减少探索",
          "Worker 可以更自由地探索参数空间，但可能偏离中心更远",
          "通信频率自动增加以补偿弹性减弱",
          "Master 的更新步长 β 增大，中心参数变化更剧烈"
        ],
        "answer": 1,
        "explain": "ρ 控制弹性力强度，ρ 减小意味着 worker 受到的向中心拉回的力更弱，因此可以更自由地探索局部参数空间，这是 EASGD 实现 exploration-exploitation 权衡的核心机制。"
      }
    },
    {
      "id": "horovod",
      "num": 4,
      "name": "Horovod",
      "fullName": "环形AllReduce (Horovod)",
      "year": "2018",
      "org": "Uber",
      "parent": "parameter_server",
      "paperUrl": "https://arxiv.org/abs/1802.05799",
      "projectUrl": "",
      "category": "dp",
      "motivation": "Ring-AllReduce优化带宽利用率",
      "summary": "Horovod 提出了基于 Ring-AllReduce 的分布式深度学习训练框架，用带宽最优的环形通信替代参数服务器架构，同时将用户代码改动降至 4 行，解决了标准分布式 TensorFlow 扩展效率低、使用复杂的双重问题。",
      "keyPoints": [
        "<strong>Ring-AllReduce 替代 Parameter Server</strong>：采用 Patarasuk &amp; Yuan (2009) 提出的带宽最优环形归约算法，消除参数服务器瓶颈",
        "<strong>极简 API 设计</strong>：仅需 4 处代码修改（<code>hvd.init()</code>、GPU 绑定、<code>DistributedOptimizer</code> 包装、<code>BroadcastGlobalVariablesHook</code>）即可将单卡程序分布式化",
        "<strong>基于 NCCL 的高性能通信</strong>：用 NVIDIA NCCL 2 替换 Baidu 原始实现，支持跨机 ring-allreduce 并获得硬件级优化",
        "<strong>Tensor Fusion 优化</strong>：将多个小张量融合到 64MB 缓冲区后再执行 allreduce，在 TCP 网络上对多层模型提升高达 65%",
        "<strong>Horovod Timeline 调试工具</strong>：兼容 Chrome <code>about:tracing</code> 的分布式训练可视化分析器",
        "<strong>MPI 启动范式</strong>：通过 <code>mpirun</code> 统一启动所有 worker，无需手动配置集群拓扑",
        "<strong>128 GPU 扩展效率 88%</strong>：相比标准分布式 TensorFlow 约 50% 的效率，提升近一倍"
      ],
      "detail": "<h5>核心架构示意</h5>\n<p><img alt=\"Parameter Server 模型\" src=\"https://ar5iv.labs.arxiv.org/html/1802.05799/assets/image8.png\" />\n<em>图 1：Parameter Server 架构——worker 与 PS 之间形成 all-to-all 通信模式，PS 数量难以调优</em></p>\n<p><img alt=\"Ring-AllReduce 算法\" src=\"https://ar5iv.labs.arxiv.org/html/1802.05799/assets/image4-2.png\" />\n<em>图 2：Ring-AllReduce 算法——每个节点仅与相邻两个节点通信，经过 2(N-1) 轮即可完成全局梯度平均</em></p>\n<p><img alt=\"数据并行训练范式\" src=\"https://ar5iv.labs.arxiv.org/html/1802.05799/assets/image2-1.png\" />\n<em>图 3：数据并行训练范式——每个节点独立计算梯度，通过 AllReduce 同步后更新模型</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># Ring-AllReduce 核心流程（N 个节点，每个节点持有长度为 L 的梯度向量）\n# 将梯度向量分为 N 个 chunk\n\n# 阶段 1: Scatter-Reduce（N-1 轮）\nfor step in range(N - 1):\n    send chunk[(rank - step) % N]     → 右邻居 (rank+1) % N\n    recv chunk[(rank - step - 1) % N] ← 左邻居 (rank-1) % N\n    # 将接收到的 chunk 累加到本地对应位置\n\n# 阶段 2: All-Gather（N-1 轮）\nfor step in range(N - 1):\n    send chunk[(rank - step + 1) % N] → 右邻居 (rank+1) % N\n    recv chunk[(rank - step) % N]     ← 左邻居 (rank-1) % N\n    # 用接收到的完整 chunk 替换本地对应位置\n\n# 结果：所有节点持有完全相同的全局平均梯度\n</code></pre>\n<pre><code class=\"language-python\"># Horovod 用户侧使用伪代码\nimport horovod.tensorflow as hvd\n\nhvd.init()                                          # 1. 初始化\nconfig.gpu_options.visible_device_list = str(hvd.local_rank())  # 2. GPU 绑定\nopt = hvd.DistributedOptimizer(opt)                 # 3. 包装优化器\nhooks = [hvd.BroadcastGlobalVariablesHook(0)]       # 4. 广播初始参数\n\n# 启动命令：mpirun -np 16 -H s1:4,s2:4,s3:4,s4:4 python train.py\n</code></pre>\n<h5>动机与背景</h5>\n<p>标准分布式 TensorFlow 采用 <strong>Parameter Server (PS)</strong> 架构进行梯度同步。在该架构中，worker 节点计算梯度后发送给 PS 节点进行聚合，再由 PS 将更新后的参数分发回各 worker。这一方案存在两个核心缺陷：</p>\n<ol>\n<li>\n<p><strong>通信瓶颈难以调优</strong>：单个 PS 容易成为网络/计算瓶颈；多个 PS 则形成 all-to-all 通信模式，可能饱和网络互联。Uber 实测在 128 GPU 上标准分布式 TensorFlow 损失了约 50% 的计算资源。</p>\n</li>\n<li>\n<p><strong>使用复杂度极高</strong>：用户需要理解 <code>tf.Server()</code>、<code>tf.ClusterSpec()</code>、<code>tf.train.SyncReplicasOptimizer()</code>、<code>tf.train.replicas_device_setter()</code> 等大量概念，手动配置 worker/PS 角色、服务发现、设备放置等，学习曲线陡峭且容易引入难以诊断的 bug。</p>\n</li>\n</ol>\n<div class=\"key-point\">💡 关键：Facebook 2017 年在 256 GPU 上 1 小时训练 ResNet-50 的里程碑（Goyal et al., 2017）证明了大规模数据并行训练的巨大潜力，直接激发了 Uber 对高效分布式方案的探索。</div>\n<h5>Ring-AllReduce 核心机制</h5>\n<p>Ring-AllReduce 的核心思想是将 \\(N\\) 个节点组织成逻辑环，通过 <strong>Scatter-Reduce</strong> 和 <strong>All-Gather</strong> 两个阶段完成全局梯度聚合：</p>\n<p><strong>阶段一：Scatter-Reduce</strong>。将每个节点的梯度向量均分为 \\(N\\) 个 chunk。经过 \\(N-1\\) 轮通信，每轮每个节点向右邻居发送一个 chunk 并从左邻居接收一个 chunk，接收后执行累加。\\(N-1\\) 轮结束后，每个节点恰好持有一个 chunk 的全局归约结果。</p>\n<p><strong>阶段二：All-Gather</strong>。再经过 \\(N-1\\) 轮通信，每轮每个节点将自己持有的完整 chunk 传递给右邻居，同时从左邻居接收。最终所有节点都拥有完整的全局归约结果。</p>\n<p>整个过程的通信量分析如下：</p>\n<p>$$\\text{每个节点发送总量} = 2 \\cdot \\frac{N-1}{N} \\cdot D$$</p>\n<p>其中 \\(D\\) 为梯度向量总大小。当 \\(N\\) 较大时，每个节点的通信量趋近于 \\(2D\\)，<strong>与节点数 \\(N\\) 无关</strong>。</p>\n<div class=\"key-point\">💡 关键：Patarasuk &amp; Yuan (2009) 证明 Ring-AllReduce 是<strong>带宽最优</strong>的——当数据量足够大时，它能完全利用可用网络带宽。相比之下，PS 架构的通信量随 worker 数线性增长，带宽利用率随规模下降。</div>\n<h5>Horovod 的工程实现</h5>\n<p>Horovod 在 Baidu 2017 年发布的 TensorFlow ring-allreduce 原型基础上进行了四项关键改进：</p>\n<ol>\n<li>\n<p><strong>独立 Python 包</strong>：将实现从 TensorFlow fork 中解耦为独立的 <code>pip install</code> 包，安装时间从约 1 小时缩短到几分钟，且兼容不同 TensorFlow 版本。</p>\n</li>\n<li>\n<p><strong>NCCL 后端替换</strong>：用 NVIDIA NCCL 2 替换原始 ring-allreduce 实现。NCCL 提供了针对 GPU 拓扑高度优化的集合通信原语，NCCL 2 还支持跨机通信。</p>\n</li>\n<li>\n<p><strong>多 GPU 服务器支持</strong>：原始实现仅支持每节点单 GPU，Horovod 扩展为支持单服务器多 GPU 场景。</p>\n</li>\n<li>\n<p><strong>Broadcast 操作</strong>：新增 <code>BroadcastGlobalVariablesHook</code> 确保所有 worker 从 rank 0 获得一致的初始化参数，消除随机初始化不一致问题。</p>\n</li>\n</ol>\n<h5>Tensor Fusion 优化</h5>\n<p>在分析 ResNet-101 等深层模型的 Horovod Timeline 时，作者发现大量小张量的 allreduce 操作效率很低——Ring-AllReduce 的带宽最优性依赖于数据量足够大。为此提出 <strong>Tensor Fusion</strong> 策略：</p>\n<ol>\n<li>收集当前就绪的同类型小张量</li>\n<li>将它们拷贝到一个 <strong>64MB 融合缓冲区</strong></li>\n<li>对融合缓冲区执行一次 allreduce</li>\n<li>将结果拷贝回各个输出张量</li>\n</ol>\n<div class=\"warn-box\">⚠️ 注意：Tensor Fusion 在 TCP 网络上对多层模型（如 ResNet-101）可带来高达 <strong>65%</strong> 的性能提升，因为它将大量小消息合并为少量大消息，显著降低了通信启动开销（latency-bound → bandwidth-bound）。</div>\n<h5>与 Parameter Server 的关键对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th>Parameter Server</th>\n<th>Horovod (Ring-AllReduce)</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>通信拓扑</td>\n<td>星型（all-to-all）</td>\n<td>环形（仅相邻通信）</td>\n</tr>\n<tr>\n<td>带宽利用率</td>\n<td>随节点数下降</td>\n<td>带宽最优，与节点数无关</td>\n</tr>\n<tr>\n<td>瓶颈风险</td>\n<td>PS 节点成为瓶颈</td>\n<td>无中心节点，负载均衡</td>\n</tr>\n<tr>\n<td>配置复杂度</td>\n<td>需配置 PS/worker 角色、比例</td>\n<td>仅需 <code>mpirun</code> 指定节点</td>\n</tr>\n<tr>\n<td>代码改动量</td>\n<td>大量重构（ClusterSpec, Server 等）</td>\n<td>4 行代码修改</td>\n</tr>\n<tr>\n<td>128 GPU 效率</td>\n<td>~50%</td>\n<td>~88%</td>\n</tr>\n</tbody>\n</table></div>\n<h5>性能评估</h5>\n<p><img alt=\"Horovod vs 标准分布式 TF 性能对比\" src=\"https://ar5iv.labs.arxiv.org/html/1802.05799/assets/image6-1024x440.png\" />\n<em>图 4：Horovod 与标准分布式 TensorFlow 在 25GbE TCP 网络上的扩展性对比（Inception V3 &amp; ResNet-101）</em></p>\n<p><img alt=\"TCP vs RDMA 性能对比\" src=\"https://ar5iv.labs.arxiv.org/html/1802.05799/assets/image7-1024x440.png\" />\n<em>图 5：Horovod 在 TCP 与 RDMA 网络上的性能对比（Inception V3, ResNet-101, VGG-16）</em></p>\n<p>在 128 NVIDIA Pascal GPU 上的基准测试表明：\n- Horovod 在 Inception V3 和 ResNet-101 上均达到 <strong>88% 扩展效率</strong>，而标准分布式 TensorFlow 仅约 50%\n- RDMA 网络对 Inception V3/ResNet-101 仅带来 3-4% 的额外提升（已接近计算瓶颈）\n- VGG-16 因参数量大（全连接层）且层数少，通信成为关键路径，RDMA 带来 <strong>30%</strong> 显著提升，扩展效率超过 90%</p>",
      "quiz": {
        "q": "Ring-AllReduce 相比 Parameter Server 的核心优势是什么？",
        "options": [
          "减少了模型参数量，降低显存占用",
          "每个节点的通信量与节点总数无关，带宽利用率最优",
          "不需要梯度同步，采用异步更新策略",
          "仅支持单机多卡，避免了网络通信开销"
        ],
        "answer": 1,
        "explain": "Ring-AllReduce 中每个节点的通信总量为 2·(N-1)/N·D ≈ 2D，与节点数 N 无关，是带宽最优的集合通信算法；而 PS 架构中 PS 节点的通信量随 worker 数线性增长。"
      }
    },
    {
      "id": "zero",
      "num": 5,
      "name": "ZeRO",
      "fullName": "零冗余优化器 (ZeRO)",
      "year": "2020",
      "org": "Microsoft",
      "parent": "horovod",
      "paperUrl": "https://arxiv.org/abs/1910.02054",
      "projectUrl": "",
      "category": "dp",
      "motivation": "消除数据并行内存冗余分阶段切分状态",
      "summary": "ZeRO 通过将优化器状态、梯度和参数在数据并行进程间进行分区（而非复制），分三阶段逐步消除内存冗余，在保持数据并行通信效率的同时实现了模型并行级别的内存效率，使得仅用数据并行即可训练万亿参数模型。",
      "keyPoints": [
        "<strong>内存分析</strong>：混合精度 Adam 训练中每参数占用 \\(16\\Psi\\) 字节（2Ψ fp16 参数 + 2Ψ fp16 梯度 + 12Ψ 优化器状态含 fp32 参数/动量/方差副本）",
        "<strong>ZeRO-DP 三阶段</strong>：Stage 1 切分优化器状态（\\(P_{os}\\)）→ 4x 省存；Stage 2 加切分梯度（\\(P_{os+g}\\)）→ 8x 省存；Stage 3 加切分参数（\\(P_{os+g+p}\\)）→ \\(N_d\\)x 省存",
        "<strong>通信量不变/极低开销</strong>：Stage 1+2 通信量与标准 DP 相同（\\(2\\Psi\\)）；Stage 3 仅增加 50%（\\(3\\Psi\\)）",
        "<strong>ZeRO-R 残余内存优化</strong>：激活分区（\\(P_a\\)）按 MP 度切分激活检查点；常量大小临时缓冲区；内存碎片整理",
        "<strong>ZeRO-100B 实现</strong>：Stage 1+2 + ZeRO-R，400 GPU 上高效训练 100B 参数模型，达 15 PFlops（38 TFlops/GPU）",
        "<strong>线性扩展</strong>：模型状态内存随 DP 度线性下降，理论上 1024 GPU 可支持万亿参数"
      ],
      "detail": "<h5>核心示意图</h5>\n<p><img alt=\"ZeRO-DP 内存节省示意\" src=\"https://ar5iv.labs.arxiv.org/html/1910.02054/assets/x1.png\" />\n<em>图：ZeRO-DP 三阶段优化对 7.5B 参数模型内存占用的影响。基线 DP 需要 120GB，Stage 1 降至 31.4GB，Stage 1+2 降至 16.6GB，Stage 1+2+3 降至 1.9GB（Nd=64）。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># ZeRO-DP Stage 1+2 训练流程伪代码\n# 假设 Nd 个数据并行进程，每个进程负责 1/Nd 的参数分区\n\ndef zero_dp_train_step(model, data, rank, world_size):\n    # 每个进程持有完整 fp16 参数（Stage 1+2）\n    # 但只持有 1/Nd 的优化器状态和梯度\n\n    # Forward pass（所有进程用完整参数）\n    loss = model.forward(data)\n\n    # Backward pass\n    loss.backward()  # 计算本地梯度\n\n    # Stage 2: Reduce-Scatter 梯度\n    # 每个进程只保留自己负责分区的归约梯度\n    for partition_id in range(world_size):\n        if partition_id == rank:\n            # 归约收集本分区梯度（reduce 到本进程）\n            reduce(gradients[partition_id], dst=rank)\n        else:\n            # 发送梯度给负责的进程后释放内存\n            reduce(gradients[partition_id], dst=partition_id)\n            free(gradients[partition_id])\n\n    # 只更新本进程负责的 1/Nd 参数分区\n    optimizer.step(params[rank], grads[rank])  # 用本地优化器状态\n\n    # All-Gather 更新后的参数\n    all_gather(params)  # 收集所有分区的更新参数\n</code></pre>\n<pre><code class=\"language-python\"># ZeRO-DP Stage 3 训练流程伪代码（额外切分参数）\ndef zero_dp_stage3_train_step(model, data, rank, world_size):\n    # 每个进程只持有 1/Nd 的参数、梯度和优化器状态\n\n    # Forward pass: 流水线式 All-Gather 参数\n    for layer in model.layers:\n        # 收集该层完整参数（从负责的进程广播）\n        full_params = all_gather(layer.params)\n        output = layer.forward(input, full_params)\n        del full_params  # 用完即弃，不保留\n        input = output\n\n    # Backward pass: 反向再次 All-Gather\n    for layer in reversed(model.layers):\n        full_params = all_gather(layer.params)\n        grad = layer.backward(full_params)\n        del full_params\n        # Reduce-Scatter 梯度到负责进程\n        reduce_scatter(grad)\n\n    # 更新本地 1/Nd 分区\n    optimizer.step(local_params, local_grads)\n</code></pre>\n<h5>深入解释</h5>\n<p><strong>动机与背景</strong></p>\n<p>大模型训练面临严峻的内存墙问题。以混合精度 Adam 训练为例，一个 \\(\\Psi\\) 参数的模型需要：</p>\n<p>$$\\text{总内存} = \\underbrace{2\\Psi}_{\\text{fp16 参数}} + \\underbrace{2\\Psi}_{\\text{fp16 梯度}} + \\underbrace{4\\Psi + 4\\Psi + 4\\Psi}_{\\text{fp32 参数副本 + 动量 + 方差}} = 16\\Psi \\text{ bytes}$$</p>\n<p>对于 GPT-2（1.5B 参数），这意味着至少 24GB 内存仅用于模型状态。传统数据并行（DP）在每个 GPU 上完整复制所有 \\(16\\Psi\\) 字节，造成巨大冗余。而模型并行（MP）虽然切分了模型状态，但通信开销大、计算粒度低、扩展性差。</p>\n<div class=\"key-point\">💡 关键洞察：DP 的内存冗余来自于每个进程都存储完整的模型状态，但实际上每个进程在每一步只需要更新 \\(1/N_d\\) 的参数。</div>\n<p><strong>ZeRO-DP 核心机制</strong></p>\n<p>ZeRO-DP 的核心思想是：<strong>保留 DP 的高计算效率和低通信量，同时通过分区（partition）而非复制（replicate）来消除内存冗余。</strong></p>\n<p><strong>Stage 1（\\(P_{os}\\)）— 优化器状态分区：</strong></p>\n<p>将优化器状态（fp32 参数副本 + 动量 + 方差，共 \\(12\\Psi\\) 字节）均分到 \\(N_d\\) 个进程。每个进程只维护 \\(1/N_d\\) 的优化器状态，只更新对应的参数分区。更新后通过 All-Gather 同步完整参数。</p>\n<p>$$\\text{Stage 1 内存} = 4\\Psi + \\frac{12\\Psi}{N_d} \\xrightarrow{N_d \\to \\infty} 4\\Psi \\quad (\\text{4x 节省})$$</p>\n<p><strong>Stage 2（\\(P_{os+g}\\)）— 梯度分区：</strong></p>\n<p>既然每个进程只更新 \\(1/N_d\\) 的参数，那它也只需要对应分区的归约梯度。因此将标准 All-Reduce 替换为 Reduce-Scatter：每个梯度只归约到负责该分区的进程，归约后立即释放其余梯度内存。</p>\n<p>$$\\text{Stage 2 内存} = 2\\Psi + \\frac{14\\Psi}{N_d} \\xrightarrow{N_d \\to \\infty} 2\\Psi \\quad (\\text{8x 节省})$$</p>\n<p><strong>Stage 3（\\(P_{os+g+p}\\)）— 参数分区：</strong></p>\n<p>进一步地，每个进程只存储 \\(1/N_d\\) 的模型参数。前向/反向传播时，通过流水线式 All-Gather 按需获取完整层参数，用完即弃。</p>\n<p>$$\\text{Stage 3 内存} = \\frac{16\\Psi}{N_d} \\quad (N_d\\text{x 线性节省})$$</p>\n<div class=\"warn-box\">⚠️ 注意：Stage 3 的通信量从 \\(2\\Psi\\) 增加到 \\(3\\Psi\\)（前向 All-Gather \\(\\Psi\\) + 反向 All-Gather \\(\\Psi\\) + 梯度 Reduce-Scatter \\(\\Psi\\)），即 1.5 倍开销，但换来了线性内存缩减。</div>\n<p><strong>通信量分析</strong></p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方案</th>\n<th>通信量</th>\n<th>内存节省</th>\n<th>通信原语</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>标准 DP (All-Reduce)</td>\n<td>\\(2\\Psi\\)</td>\n<td>1x</td>\n<td>Reduce-Scatter + All-Gather</td>\n</tr>\n<tr>\n<td>ZeRO Stage 1+2</td>\n<td>\\(2\\Psi\\)</td>\n<td>8x</td>\n<td>Reduce-Scatter + All-Gather</td>\n</tr>\n<tr>\n<td>ZeRO Stage 3</td>\n<td>\\(3\\Psi\\)</td>\n<td>\\(N_d\\)x</td>\n<td>2×All-Gather + Reduce-Scatter</td>\n</tr>\n</tbody>\n</table></div>\n<p>标准 All-Reduce 本质上就是 Reduce-Scatter + All-Gather，通信量为 \\(2\\Psi\\)。ZeRO Stage 1+2 将 All-Reduce 拆解为：先 Reduce-Scatter 梯度（\\(\\Psi\\)），再 All-Gather 更新后的参数（\\(\\Psi\\)），总量完全相同。</p>\n<p><strong>ZeRO-R 残余内存优化</strong></p>\n<p>除模型状态外，训练还消耗大量内存用于：</p>\n<ol>\n<li><strong>激活内存</strong>（\\(P_a\\)）：MP 中激活被复制到所有 MP 进程。ZeRO 将激活检查点按 MP 度分区，需要时通过 All-Gather 重建。对于 100B 模型（MP=16），激活从 33GB 降至约 2GB。</li>\n<li><strong>临时缓冲区</strong>（\\(C_B\\)）：All-Reduce 等操作的临时缓冲区随模型增大而膨胀。ZeRO 使用固定大小缓冲区。</li>\n<li><strong>内存碎片</strong>（\\(M_D\\)）：短生命周期（激活）和长生命周期（梯度）对象交错分配导致碎片。ZeRO 将长生命周期对象预分配到连续内存块。</li>\n</ol>\n<p><strong>与传统方法的对比</strong></p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th>标准 DP</th>\n<th>模型并行 (MP)</th>\n<th>ZeRO-DP</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>内存效率</td>\n<td>差（全复制）</td>\n<td>好（切分）</td>\n<td>好（切分）</td>\n</tr>\n<tr>\n<td>计算粒度</td>\n<td>高</td>\n<td>低（切分计算）</td>\n<td>高</td>\n</tr>\n<tr>\n<td>通信量</td>\n<td>\\(2\\Psi\\)</td>\n<td>随模型/硬件变化</td>\n<td>\\(2\\Psi\\) ~ \\(3\\Psi\\)</td>\n</tr>\n<tr>\n<td>扩展性</td>\n<td>好</td>\n<td>差（跨节点）</td>\n<td>好</td>\n</tr>\n<tr>\n<td>易用性</td>\n<td>高（无需改模型）</td>\n<td>低（需重构）</td>\n<td>高（无需改模型）</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 关键：ZeRO 证明了\"内存效率\"和\"通信效率\"并非不可兼得——通过巧妙利用模型状态的时序特性（不是所有状态在所有时刻都需要），可以在几乎不增加通信的前提下大幅降低内存。</div>",
      "quiz": {
        "q": "ZeRO-DP Stage 2 (Pos+g) 相比标准数据并行，通信量变化如何？",
        "options": [
          "通信量减少为原来的 1/Nd",
          "通信量保持不变，仍为 2Ψ",
          "通信量增加 50%，变为 3Ψ",
          "通信量翻倍，变为 4Ψ"
        ],
        "answer": 1,
        "explain": "Stage 1+2 将 All-Reduce 拆解为 Reduce-Scatter（Ψ）+ All-Gather（Ψ）= 2Ψ，与标准 DP 的 All-Reduce 通信量完全相同，但内存节省 8 倍。"
      }
    },
    {
      "id": "fsdp",
      "num": 6,
      "name": "PyTorch FSDP",
      "fullName": "全切分数据并行 (Fully Sharded Data Parallel)",
      "year": "2023",
      "org": "Meta",
      "parent": "zero",
      "paperUrl": "https://arxiv.org/abs/2304.11277",
      "projectUrl": "",
      "category": "dp",
      "motivation": "工业级全切分数据并行支持超大规模参数",
      "summary": "FSDP 是 PyTorch 原生实现的 ZeRO-3 风格全分片数据并行方案，通过 FlatParameter 抽象、灵活分片策略、通信-计算重叠及内存管理优化，实现了大模型训练的近线性扩展性（GPT-175B 在 512 A100 上达 60% MFU）。",
      "keyPoints": [
        "<strong>FlatParameter 设计</strong>：将 FSDP 单元内所有参数 flatten-concat 为单一连续张量，再按 rank 数均匀分片（chunk），使 AllGather/ReduceScatter 操作高效且均匀",
        "<strong>三种分片策略</strong>：通过分片因子 F 统一表达 Full Sharding(F=W)、Hybrid Sharding(1&lt;F&lt;W)、No Sharding(F=1)，Hybrid Sharding 利用网络拓扑局部性降低跨主机流量",
        "<strong>通信-计算重叠</strong>：使用独立 CUDA stream 发起 AllGather 绕过虚假依赖，配合 backward prefetching 实现 ~18% 加速",
        "<strong>内存管理 Rate Limiter</strong>：限制最多 2 个 inflight AllGather，防止 caching allocator 过度分配触发 cudaMalloc retry（T5-11B 上最高 5x 加速）",
        "<strong>混合精度协同设计</strong>：本地保留 full precision 分片，动态分配 low precision 未分片参数，实际降低峰值内存"
      ],
      "detail": "<p><img alt=\"FSDP 架构示意图\" src=\"https://arxiv.org/html/2304.11277v2/x1.png\" />\n<em>图：FSDP 训练流程——每个 rank 仅持有参数分片，通过 AllGather 获取完整参数用于计算，ReduceScatter 规约梯度</em></p>\n<h5>FSDP 算法总体流程</h5>\n<pre><code class=\"language-python\"># FSDP 核心训练循环伪代码\nclass FSDPUnit:\n    def __init__(self, params, world_size, rank):\n        # Flatten-concat all params into single contiguous tensor\n        flat = torch.cat([p.detach().reshape(-1) for p in params])\n        # Pad and chunk across ranks\n        padded = pad_to_divisible(flat, world_size)\n        self.local_shard = padded.chunk(world_size)[rank]  # size = Ψ/W\n\n    def forward(self, x):\n        # 1. AllGather: collect full FlatParameter from all ranks\n        full_param = all_gather(self.local_shard)  # size = Ψ\n        # 2. Reshape views back to original parameter shapes\n        restore_param_views(full_param)\n        # 3. Compute forward\n        output = self.module(x)\n        # 4. (Optional) Reshard: free non-local shards\n        if reshard_after_forward:\n            free(full_param)\n        return output\n\n    def backward(self, grad_output):\n        # 1. AllGather (if resharded after forward)\n        full_param = all_gather(self.local_shard)\n        # 2. Compute backward, get full gradient\n        full_grad = compute_grad(grad_output, full_param)\n        # 3. ReduceScatter: reduce + shard gradient\n        self.grad_shard = reduce_scatter(full_grad)  # size = Ψ/W\n        # 4. Free non-local shards\n        free(full_param)\n</code></pre>\n<h5>动机与背景</h5>\n<p>传统 DDP（DistributedDataParallel）在每个 rank 上复制完整模型，通过 AllReduce 同步梯度。当模型规模增长到数十亿参数时，单 GPU 无法容纳完整的参数 + 梯度 + 优化器状态（Adam 需要 16× 参数量的内存用于 fp32）。</p>\n<p>ZeRO（Zero Redundancy Optimizer）提出将参数、梯度、优化器状态分片到不同 rank，按需通过通信重建。FSDP 是 PyTorch 对 ZeRO-3 的原生实现，但在设计上有本质区别：</p>\n<div class=\"key-point\">💡 <strong>关键区别</strong>：ZeRO 使用 per-parameter 分片 + Broadcast/Gather，可能导致不均匀负载；FSDP 使用 FlatParameter（flatten-concat 后均匀 chunk），保证通信均匀且与框架内部深度集成。</div>\n<h5>FlatParameter 构造与内存分析</h5>\n<p>对于 N 个 FSDP unit（参数量分别为 \\(\\psi_1, ..., \\psi_N\\)），分片因子 F：</p>\n<p>$$\\text{常驻内存} = \\frac{K_{full}}{F}\\sum_{i=1}^{N}\\psi_i$$</p>\n<p>$$\\text{峰值临时内存} = K_{low} \\cdot \\max_{i=1}^{N}\\psi_i$$</p>\n<p>$$\\text{总峰值} = \\frac{K_{full}}{F}\\sum_{i=1}^{N}\\psi_i + K_{low} \\cdot \\max_{i=1}^{N}\\psi_i$$</p>\n<p>其中 \\(K_{full}\\) 为 full precision 每参数字节数（如 fp32=4），\\(K_{low}\\) 为 low precision 字节数（如 bf16=2）。</p>\n<div class=\"warn-box\">⚠️ <strong>权衡</strong>：更细粒度的 FSDP unit 划分 → 更小的 max(ψ_i) → 更低峰值内存，但更多通信次数。</div>\n<h5>Hybrid Sharding 通信量分析</h5>\n<p>对于 W 个 GPU、每主机 G 个 GPU、模型大小 M：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>策略</th>\n<th>分片因子 F</th>\n<th>跨主机流量/GPU</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Full Replication (DDP)</td>\n<td>1</td>\n<td>\\(2M\\frac{W-1}{W}\\)</td>\n</tr>\n<tr>\n<td><strong>Hybrid Sharding</strong></td>\n<td>W/G</td>\n<td>\\(2M\\frac{W-1}{GW}\\)</td>\n</tr>\n<tr>\n<td>Full Sharding</td>\n<td>W</td>\n<td>\\(3M\\frac{W-1}{W}\\)</td>\n</tr>\n</tbody>\n</table></div>\n<p>Hybrid Sharding 将梯度规约分解为：先在分片组（同主机内）执行 ReduceScatter，再在复制组（跨主机）执行 AllReduce。AllGather/ReduceScatter 限制在高带宽的主机内网络，仅 AllReduce 跨主机。</p>\n<h5>通信-计算重叠机制</h5>\n<p><strong>问题</strong>：ProcessGroupNCCL 在发起 collective 前会同步 current stream → 如果在 default stream 发起 AllGather，必须等前序计算完成。</p>\n<p><strong>解决方案</strong>：使用独立 CUDA stream 发起 AllGather，绕过对 default stream 的虚假依赖：</p>\n<pre><code>Default Stream: [Compute_i] ─────────── [Compute_{i+1}] ──────────\nAllGather Stream:    [AG_{i+1}] ─────────────── [AG_{i+2}] ──────\n                     ↑ 不等待 Compute_i          ↑ sync point\n</code></pre>\n<p><strong>Backward Prefetching</strong>（~18% 加速）：改变通信顺序，先发下一个 AllGather 再做当前 ReduceScatter：</p>\n<p>$$\\text{Without: } [Bwd_i] \\to [RS_i] \\to [AG_{i+1}] \\to [Bwd_{i+1}]$$\n$$\\text{With: } [Bwd_i] \\to [AG_{i+1}] \\to [RS_i] \\to [Bwd_{i+1}]$$</p>\n<p>AG 和 RS 在同一 NCCL stream 中顺序执行但可与计算重叠，且 AG 完成后 backward 可立即开始。</p>\n<h5>Rate Limiter 内存管理</h5>\n<p>快速 CPU 线程会不断发起 AllGather 分配 GPU 内存，而 GPU 执行滞后导致 caching allocator 无法重用已完成的 block → 触发 cudaMalloc retry（blocking cudaFree 序列）。</p>\n<p>Rate Limiter 限制最多 2 个 inflight AllGather（当前执行 + 下一个预取），通过阻塞 CPU 线程实现。判断是否需要启用的指标：<code>torch.cuda.memory_stats()['num_alloc_retries']</code>。</p>\n<h5>大模型初始化 - Deferred Initialization</h5>\n<pre><code class=\"language-python\"># 传统方式: 需要完整模型内存 → OOM\nmodel = GPT175B()  # 需要 ~700GB (fp32 params + optimizer)\n\n# FSDP Deferred Init: meta device + record-replay\nwith torch.device(&quot;meta&quot;):       # 零内存，仅记录 tensor metadata\n    model = GPT175B()\nfsdp_model = FSDP(model)         # 仅物化本 rank 的 1/W 分片\n</code></pre>\n<h5>实验关键结果</h5>\n<ul>\n<li><strong>GPT-175B</strong>：128→512 A100 线性扩展，达 173-186 TFLOPS/GPU（55-60% MFU）</li>\n<li><strong>T5-11B</strong>：8→512 GPU 仅 7% 性能回退；DDP 在 &gt;2.28B 模型 OOM</li>\n<li><strong>Backward prefetching</strong>：GPT-175B 上 ~18% 加速，跨集群规模一致</li>\n<li><strong>Rate limiter</strong>：T5-11B 上最高 5x 加速（存在 cudaMalloc retry 时）</li>\n</ul>\n<h5>已知限制</h5>\n<ol>\n<li><strong>数学等价性</strong>：Optimizer step 在分片参数上执行，FlatParameter 分片不尊重原始参数边界 → 依赖参数整体值的优化器（如 vector norm）会产生不等价结果</li>\n<li><strong>共享参数</strong>：共享参数必须属于最低公共祖先 FSDP unit，否则 reshard 后无法访问</li>\n</ol>",
      "quiz": {
        "q": "FSDP 的 Backward Prefetching 优化为什么能带来约 18% 的加速？",
        "options": [
          "它减少了 AllGather 通信的数据量",
          "它将下一个 FSDP unit 的 AllGather 提前到当前 ReduceScatter 之前发起，使两者可重叠执行",
          "它跳过了 ReduceScatter 操作直接使用 AllReduce",
          "它将 forward pass 和 backward pass 的通信合并为一次"
        ],
        "answer": 1,
        "explain": "Backward Prefetching 改变通信顺序：先发起下一个 unit 的 AllGather，再执行当前 unit 的 ReduceScatter。由于两者在同一 NCCL stream 中顺序执行但可与计算重叠，避免了连续两次通信暴露在关键路径上。"
      }
    },
    {
      "id": "megatron_tp",
      "num": 7,
      "name": "Megatron-LM 1D TP",
      "fullName": "一维张量并行 (Megatron-LM 1D Tensor Parallel)",
      "year": "2019",
      "org": "NVIDIA",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/1909.08053",
      "projectUrl": "",
      "category": "tp",
      "motivation": "列并行MLP+行并行Attention每层仅2次通信",
      "summary": "Megatron-LM 提出了一种简洁高效的层内张量并行方案，通过对 MLP 层采用列并行-行并行的 GEMM 切分策略、对 Self-Attention 层按注意力头分配到不同 GPU，使每个 Transformer 层仅需 2 次 All-Reduce 通信（前向 + 反向各 2 次），在 512 GPU 上实现 76% 的扩展效率。",
      "keyPoints": [
        "<strong>列并行 MLP</strong>：第一个 GEMM 按列切分权重矩阵，GeLU 可独立并行执行；第二个 GEMM 按行切分，输出通过 All-Reduce 聚合",
        "<strong>行并行 Self-Attention</strong>：Q/K/V 投影按列切分（每个注意力头分配到一个 GPU），输出投影按行切分",
        "<strong>f / g 共轭算子</strong>：\\(f\\) 前向恒等 + 反向 All-Reduce；\\(g\\) 前向 All-Reduce + 反向恒等，仅需几行 PyTorch 代码实现",
        "<strong>每层 4 次通信</strong>：前向 2 次 All-Reduce（MLP + Attention 各 1 次）+ 反向 2 次 All-Reduce",
        "<strong>跨层无额外同步</strong>：LayerNorm、Dropout、残差连接在各 GPU 上冗余计算，避免广播开销",
        "<strong>并行交叉熵</strong>：将 logits 按词表维度切分，仅通信标量 loss，大幅减少输出层通信量",
        "<strong>与流水线并行正交</strong>：可与 GPipe 等流水线方案组合使用",
        "<strong>扩展性验证</strong>：8.3B 参数模型在 512 GPU 上达到 15.1 PetaFLOPs，76% 弱扩展效率"
      ],
      "detail": "<h5>核心架构示意图</h5>\n<p><img alt=\"Transformer 模型并行切分示意图\" src=\"https://ar5iv.labs.arxiv.org/html/1909.08053/assets/mlp_mp_2.png\" />\n<em>图：Megatron-LM 张量并行方案。(a) MLP 块的列并行 + 行并行切分；(b) Self-Attention 块按注意力头切分。f 和 g 为共轭通信算子。</em></p>\n<p><img alt=\"通信操作示意图\" src=\"https://ar5iv.labs.arxiv.org/html/1909.08053/assets/passesmp_2.png\" />\n<em>图：一个 Transformer 层中的通信操作。前向传播和反向传播各有 2 次 All-Reduce，共 4 次通信操作。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># Megatron-LM 1D Tensor Parallel - MLP Block\n# 假设有 p 个 GPU，权重矩阵 A ∈ R^{h×4h}, B ∈ R^{4h×h}\n\n# === 前向传播 ===\n# 输入 X 在所有 GPU 上相同（通过 f 算子：前向恒等）\nX_local = f(X)  # identity in forward\n\n# 第一个 GEMM：列并行（A 按列切分为 A_1, A_2, ..., A_p）\nY_i = GeLU(X @ A_i)  # 每个 GPU 独立计算，无需通信\n\n# 第二个 GEMM：行并行（B 按行切分为 B_1, B_2, ..., B_p）\nZ_i = Y_i @ B_i  # 每个 GPU 本地计算\n\n# 输出聚合（通过 g 算子：前向 All-Reduce）\nZ = g(Z_i)  # all-reduce in forward: Z = sum(Z_i)\n\n# === f/g 算子实现 ===\nclass f(torch.autograd.Function):\n    @staticmethod\n    def forward(ctx, x):\n        return x  # identity\n    @staticmethod\n    def backward(ctx, grad):\n        return all_reduce(grad)  # all-reduce gradients\n\nclass g(torch.autograd.Function):\n    @staticmethod\n    def forward(ctx, x):\n        return all_reduce(x)  # all-reduce outputs\n    @staticmethod\n    def backward(ctx, grad):\n        return grad  # identity\n</code></pre>\n<h5>动机与背景</h5>\n<p>2019 年，随着 GPT-2、BERT 等预训练语言模型规模快速增长，单 GPU 显存已无法容纳数十亿参数的模型。传统的数据并行仅能解决计算瓶颈，无法突破单卡显存限制。已有的模型并行方案如 GPipe（流水线并行）和 Mesh-TensorFlow（通用张量切分）要么引入流水线气泡降低效率，要么需要自定义编译器和框架重写，部署门槛极高。</p>\n<p>Megatron-LM 的核心动机是：<strong>利用 Transformer 结构的天然可分性，设计一种仅需插入少量通信原语即可在原生 PyTorch 中实现的层内张量并行方案</strong>，无需编译器支持，且与流水线并行正交可组合。</p>\n<h5>核心机制：MLP 块的张量并行</h5>\n<p>MLP 块包含两个连续的线性变换，中间夹一个 GeLU 非线性激活：</p>\n<p>$$Y = \\text{GeLU}(XA), \\quad Z = \\text{Dropout}(YB)$$</p>\n<p>其中 \\(A \\in \\mathbb{R}^{h \\times 4h}\\)，\\(B \\in \\mathbb{R}^{4h \\times h}\\)。</p>\n<p><strong>关键洞察</strong>：如果按行切分 \\(A\\)（即 \\(X = [X_1, X_2]\\)，\\(A = [A_1; A_2]\\)），则需要先对 \\(X_1 A_1 + X_2 A_2\\) 求和后才能应用 GeLU（因为 GeLU 是非线性函数，不满足可加性）。这会引入一次额外的同步点。</p>\n<p><strong>Megatron 的选择</strong>：按列切分 \\(A = [A_1, A_2, \\ldots, A_p]\\)，此时：</p>\n<p>$$[Y_1, Y_2, \\ldots, Y_p] = [\\text{GeLU}(XA_1), \\text{GeLU}(XA_2), \\ldots, \\text{GeLU}(XA_p)]$$</p>\n<p>每个 GPU 可以<strong>独立</strong>计算自己的 GeLU，无需同步。随后第二个 GEMM 的权重 \\(B\\) 按行切分为 \\(B_1, B_2, \\ldots, B_p\\)，每个 GPU 计算 \\(Z_i = Y_i B_i\\)，最终通过一次 All-Reduce 得到完整输出 \\(Z = \\sum_i Z_i\\)。</p>\n<div class=\"key-point\">💡 关键：列并行第一层 + 行并行第二层的配对设计，使得两层 GEMM 之间无需通信，整个 MLP 块前向仅需 1 次 All-Reduce。</div>\n<h5>核心机制：Self-Attention 块的张量并行</h5>\n<p>多头注意力天然具有并行结构——各注意力头之间相互独立。Megatron 利用这一特性：</p>\n<ol>\n<li><strong>Q/K/V 投影</strong>：按列切分（column-parallel），每个 GPU 负责若干注意力头对应的投影矩阵</li>\n<li><strong>注意力计算</strong>：每个 GPU 独立计算自己负责的注意力头，无需跨 GPU 通信</li>\n<li><strong>输出投影</strong>：按行切分（row-parallel），每个 GPU 的局部结果通过 All-Reduce 聚合</li>\n</ol>\n<p>这样 Self-Attention 块同样仅需 1 次 All-Reduce（前向），与 MLP 块结构完全对称。</p>\n<h5>f / g 共轭算子设计</h5>\n<p>Megatron 引入了两个互为共轭的通信算子，优雅地将通信嵌入自动微分图：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>算子</th>\n<th>前向</th>\n<th>反向</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>\\(f\\)</td>\n<td>恒等（identity）</td>\n<td>All-Reduce</td>\n</tr>\n<tr>\n<td>\\(g\\)</td>\n<td>All-Reduce</td>\n<td>恒等（identity）</td>\n</tr>\n</tbody>\n</table></div>\n<ul>\n<li>\\(f\\) 放在并行区域的<strong>入口</strong>：前向时直接传入输入（各 GPU 持有相同副本），反向时对梯度做 All-Reduce 确保各 GPU 获得完整梯度</li>\n<li>\\(g\\) 放在并行区域的<strong>出口</strong>：前向时对各 GPU 的局部输出做 All-Reduce 得到完整结果，反向时梯度直接回传</li>\n</ul>\n<div class=\"warn-box\">⚠️ 注意：f 和 g 的组合确保了数学等价性——无论并行度如何，计算结果与单 GPU 完全一致。</div>\n<h5>通信量分析</h5>\n<p>对于一个 Transformer 层（hidden size = \\(h\\)，序列长度 = \\(s\\)，batch size = \\(b\\)）：</p>\n<ul>\n<li>每次 All-Reduce 通信量：\\(O(bsh)\\)（激活张量大小）</li>\n<li>每层前向：2 次 All-Reduce（MLP 出口 + Attention 出口）</li>\n<li>每层反向：2 次 All-Reduce（MLP 入口梯度 + Attention 入口梯度）</li>\n<li><strong>总计每层 4 次 All-Reduce</strong></li>\n</ul>\n<p>相比之下，LayerNorm、Dropout、残差连接等操作在各 GPU 上冗余执行（参数量极小），避免了额外通信。</p>\n<h5>并行交叉熵优化</h5>\n<p>输出层的 logits 维度为 \\(b \\times s \\times V\\)（\\(V\\) 为词表大小，通常 &gt; 30000），直接 All-Gather 通信量巨大。Megatron 将词表维度按列切分到各 GPU，每个 GPU 计算局部 softmax 后仅通信标量 loss（维度 \\(b \\times s\\)），通信量从 \\(O(bsV)\\) 降低到 \\(O(bs)\\)。</p>\n<h5>与传统方法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>并行粒度</th>\n<th>通信模式</th>\n<th>是否需要编译器</th>\n<th>气泡开销</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>数据并行</td>\n<td>样本级</td>\n<td>All-Reduce 梯度</td>\n<td>否</td>\n<td>无</td>\n</tr>\n<tr>\n<td>GPipe 流水线并行</td>\n<td>层级</td>\n<td>点对点</td>\n<td>否</td>\n<td>有（pipeline bubble）</td>\n</tr>\n<tr>\n<td>Mesh-TensorFlow</td>\n<td>任意张量维度</td>\n<td>自动推导</td>\n<td>是（XLA）</td>\n<td>无</td>\n</tr>\n<tr>\n<td><strong>Megatron 1D TP</strong></td>\n<td><strong>层内张量</strong></td>\n<td><strong>All-Reduce</strong></td>\n<td><strong>否（原生 PyTorch）</strong></td>\n<td><strong>无</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p>Megatron 的优势在于：实现极简（仅需几行通信代码）、无气泡、与流水线并行正交可组合、无需编译器支持。其局限是 All-Reduce 通信量随并行度线性增长，适合节点内高带宽互联（如 NVLink），跨节点扩展性受限（通常 TP 度 ≤ 8）。</p>",
      "quiz": {
        "q": "Megatron-LM 对 MLP 第一个 GEMM 采用列并行而非行并行的核心原因是什么？",
        "options": [
          "列并行可以减少参数量",
          "列并行允许 GeLU 在各 GPU 上独立计算，避免非线性前的同步",
          "列并行的通信带宽需求更低",
          "列并行可以支持更大的 batch size"
        ],
        "answer": 1,
        "explain": "GeLU 是非线性函数，行并行切分需要先 All-Reduce 求和再应用 GeLU（多一次同步），而列并行使各 GPU 输出独立，GeLU 可直接本地执行。"
      }
    },
    {
      "id": "tesseract",
      "num": 8,
      "name": "Tesseract 2D TP",
      "fullName": "二维张量并行 (Tesseract 2D Tensor Parallel)",
      "year": "2022",
      "org": "NUS",
      "parent": "megatron_tp",
      "paperUrl": "https://arxiv.org/abs/2105.14500",
      "projectUrl": "",
      "category": "tp",
      "motivation": "沿隐藏维度双向切分降低激活值冗余",
      "summary": "Tesseract 提出了一种 3D 张量并行方法，在 2D SUMMA 矩阵乘法的基础上引入 depth 维度复制，将 \\(p = dq^2\\) 个处理器排列为 \\([q, q, d]\\) 的三维结构，在不引入任何近似的前提下将通信量降低 \\(d\\) 倍，相比 Megatron-LM（1D）和 Optimus（2D）在 64 GPU 上分别实现 3.37× 和 1.71× 的吞吐提升。",
      "keyPoints": [
        "<strong>3D 处理器排列</strong>：将 \\(p = dq^2\\) 个 GPU 组织为 \\([q, q, d]\\) 三维网格，其中 \\(q \\times q\\) 为 2D 平面，\\(d\\) 为 depth 维度",
        "<strong>基于 2.5D SUMMA 的矩阵乘法</strong>：在 depth 维度上复制输入矩阵，每层独立执行 2D SUMMA 的子集计算，最终通过 reduce-scatter 合并结果",
        "<strong>通信量优化</strong>：单次矩阵乘法通信量从 2D 的 \\(O(n^2/q)\\) 降至 \\(O(n^2/(dq))\\)，减少 \\(d\\) 倍",
        "<strong>Transformer 完整适配</strong>：对 Feed Forward 层和 Multi-Head Attention 层分别设计了并行切分方案，包括 LayerNorm 的分布式计算",
        "<strong>无精度损失</strong>：不引入任何近似，训练精度与单 GPU 完全一致（在 ViT + ImageNet-100 上验证）",
        "<strong>可与 Pipeline/Data Parallelism 组合</strong>：Tesseract 作为张量并行组件，可与流水线并行和数据并行正交组合"
      ],
      "detail": "<h5>核心架构图</h5>\n<p><img alt=\"Tesseract 3D 处理器排列\" src=\"https://ar5iv.labs.arxiv.org/html/2105.14500/assets/x3.png\" />\n<em>图：\\(p = dq^2\\) 个处理器的 Tesseract 排列，形状为 \\([q, q, d]\\)。每个 depth 层包含 \\(q \\times q\\) 个处理器，共 \\(d\\) 层。</em></p>\n<p><img alt=\"Feed Forward 并行化\" src=\"https://ar5iv.labs.arxiv.org/html/2105.14500/assets/x7.png\" />\n<em>图：Tesseract 对 Transformer Feed Forward 层的并行化方案</em></p>\n<p><img alt=\"Multi-Head Attention 并行化\" src=\"https://ar5iv.labs.arxiv.org/html/2105.14500/assets/x8.png\" />\n<em>图：Tesseract 对 Multi-Head Attention 层的并行化方案</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># Tesseract 3D 并行矩阵乘法 C = A × B\n# 处理器排列: [q, q, d], 总处理器数 p = d * q^2\n# 每个处理器坐标: (i, j, k), i,j ∈ [0,q), k ∈ [0,d)\n\ndef tesseract_matmul(A, B, q, d):\n    &quot;&quot;&quot;\n    A: [n, n] 输入矩阵\n    B: [n, n] 参数矩阵\n    每个处理器持有:\n      A_local: [n/q, n/(dq)] — A 的子块\n      B_local: [n/(dq), n/q] — B 的子块\n    &quot;&quot;&quot;\n    # Step 1: 初始化 — 将 A 按行列切分到 q×q 网格,\n    #          depth 维度上进一步切分列(A)或行(B)\n    # 处理器(i,j,k) 持有 A[i, j*d+k] 和 B[j*d+k, i]\n\n    C_local = zeros(n/q, n/q)\n\n    # Step 2: 2D SUMMA 风格迭代 (共 q 步,而非 dq 步)\n    for t in range(q):\n        # 在行方向广播 A 的列块\n        A_col = broadcast_row(A_local, source_col=t)  # 沿行通信\n\n        # 在列方向广播 B 的行块\n        B_row = broadcast_col(B_local, source_row=t)  # 沿列通信\n\n        # 本地矩阵乘法累加\n        C_local += A_col @ B_row\n\n    # Step 3: 沿 depth 维度 reduce-scatter 合并部分和\n    C_final = reduce_scatter_depth(C_local)\n\n    return C_final  # 每个处理器持有 C 的 [n/q, n/q] 子块\n</code></pre>\n<h5>方法详解</h5>\n<p><strong>动机与背景</strong></p>\n<p>随着大规模语言模型（如 GPT-3、BERT）参数量急剧增长，单 GPU 内存已无法容纳完整模型。张量并行（Tensor Parallelism）通过将模型参数和激活值切分到多个 GPU 上来解决这一问题。然而，现有方法存在明显瓶颈：</p>\n<ul>\n<li><strong>1D 并行（Megatron-LM）</strong>：将参数矩阵按列或行切分到 \\(p\\) 个 GPU，每次矩阵乘法需要一次 all-reduce 通信，通信量为 \\(O(n^2/p)\\) 但通信带宽利用率低</li>\n<li><strong>2D 并行（Optimus/SUMMA）</strong>：将 \\(p\\) 个 GPU 排列为 \\(\\sqrt{p} \\times \\sqrt{p}\\) 网格，使用 SUMMA 算法，通信量为 \\(O(n^2/\\sqrt{p})\\)，但仍受限于 2D 网格的通信开销</li>\n</ul>\n<p>Tesseract 的核心洞察是：可以通过引入第三个维度（depth）来进一步降低通信量。这一思想源自高性能计算领域的 2.5D 矩阵乘法算法（Solomonik &amp; Demmel, 2011），Tesseract 将其适配到深度学习的张量并行场景。</p>\n<p><strong>核心机制：3D 处理器排列与矩阵切分</strong></p>\n<p>Tesseract 将 \\(p = dq^2\\) 个处理器排列为三维网格 \\([q, q, d]\\)，其中：\n- \\(q\\)：2D 平面的维度（行和列方向各 \\(q\\) 个处理器）\n- \\(d\\)：depth 维度（复制层数）</p>\n<p>对于矩阵乘法 \\(C = A \\times B\\)，其中 \\(A \\in \\mathbb{R}^{n \\times n}\\)，\\(B \\in \\mathbb{R}^{n \\times n}\\)：</p>\n<p>矩阵 \\(A\\) 被切分为 \\(q \\times (dq)\\) 个子块，每个子块大小为 \\([n/q, n/(dq)]\\)：</p>\n<p>$$A_{i,(j \\cdot d + k)} \\in \\mathbb{R}^{n/q \\times n/(dq)}, \\quad i \\in [0,q),\\ j \\in [0,q),\\ k \\in [0,d)$$</p>\n<p>矩阵 \\(B\\) 被切分为 \\((dq) \\times q\\) 个子块，每个子块大小为 \\([n/(dq), n/q]\\)：</p>\n<p>$$B_{(j \\cdot d + k), i} \\in \\mathbb{R}^{n/(dq) \\times n/q}, \\quad i \\in [0,q),\\ j \\in [0,q),\\ k \\in [0,d)$$</p>\n<div class=\"key-point\">💡 关键：depth 维度的引入使得每个处理器持有的子块更小（列/行方向多切了 \\(d\\) 倍），从而每步通信的数据量减少 \\(d\\) 倍。</div>\n<p><strong>通信流程</strong></p>\n<p>Tesseract 的前向传播包含三种通信操作：</p>\n<ol>\n<li><strong>行方向广播（Broadcast along row）</strong>：在 SUMMA 的每一步中，将 \\(A\\) 的列块沿行方向广播，通信量为 \\(n^2/(dq^2)\\)</li>\n<li><strong>列方向广播（Broadcast along column）</strong>：将 \\(B\\) 的行块沿列方向广播，通信量为 \\(n^2/(dq^2)\\)</li>\n<li><strong>Depth 方向 reduce-scatter</strong>：将各 depth 层的部分积合并，通信量为 \\(n^2/q^2 \\cdot (d-1)/d\\)</li>\n</ol>\n<p>总通信量分析：</p>\n<p>$$W_{forward} = 2q \\cdot \\frac{n^2}{dq^2} + \\frac{n^2}{q^2} \\cdot \\frac{d-1}{d} = \\frac{2n^2}{dq} + \\frac{n^2(d-1)}{dq^2}$$</p>\n<p>当 \\(d > 1\\) 时，相比 2D SUMMA 的通信量 \\(2n^2/q\\)，Tesseract 将主要通信项降低了 \\(d\\) 倍。</p>\n<p><strong>Transformer 层的适配</strong></p>\n<p>对于 Transformer 的 Feed Forward 层（输入 \\([b, s, h]\\)，参数 \\([h, 4h]\\) 和 \\([4h, h]\\)）：\n- 输入切分为 \\([b/(dq), s, h/q]\\)\n- 第一层参数切分为 \\([h/q, 4h/q]\\)\n- 第二层参数切分为 \\([4h/q, h/q]\\)\n- 输出形状仍为 \\([b/(dq), s, h/q]\\)</p>\n<p>对于 Multi-Head Attention 层：\n- QKV 投影参数切分为 \\([h/q, 3h/q]\\)\n- 每个处理器处理 \\(n/q\\) 个注意力头\n- 注意力计算完全本地化（无跨位置通信）\n- 输出投影参数切分为 \\([h/q, h/q]\\)</p>\n<p><strong>LayerNorm 的分布式计算</strong></p>\n<p>LayerNorm 需要计算全局均值和方差。由于隐藏维度 \\(h\\) 被切分到 \\(q\\) 个处理器上，需要：</p>\n<p>$$E[X] = \\frac{\\Sigma X_i}{n}, \\quad Var[X] = E[X^2] - E[X]^2$$</p>\n<p>Tesseract 通过在行方向执行 all-reduce 来聚合局部统计量，然后各处理器独立完成归一化计算。</p>\n<p><strong>与传统方法的对比</strong></p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>处理器排列</th>\n<th>通信量（前向）</th>\n<th>内存/GPU</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Megatron-LM (1D)</td>\n<td>\\([p]\\)</td>\n<td>\\(O(n^2)\\)</td>\n<td>\\(O(n^2/p)\\)</td>\n</tr>\n<tr>\n<td>Optimus (2D)</td>\n<td>\\([q, q]\\)</td>\n<td>\\(O(n^2/q)\\)</td>\n<td>\\(O(n^2/q^2)\\)</td>\n</tr>\n<tr>\n<td><strong>Tesseract (3D)</strong></td>\n<td>\\([q, q, d]\\)</td>\n<td>\\(O(n^2/(dq))\\)</td>\n<td>\\(O(n^2/(dq^2))\\)</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"warn-box\">⚠️ 注意：Tesseract 的 depth 维度需要额外复制输入数据，因此存在内存-通信的 trade-off。当 \\(d\\) 增大时，通信减少但每层的输入需要在 depth 维度上分发。</div>\n<p><strong>实验结果</strong></p>\n<p>在 64 GPU 的强扩展实验中，Tesseract \\([4,4,4]\\) 相比 Megatron-LM 实现 1.37× 加速，相比 Optimus 实现 1.53× 加速。在弱扩展实验中，Tesseract 达到 Megatron-LM 的 3.37× 吞吐量和 4.02× 推理速度。同时，在 Vision Transformer 训练中验证了 Tesseract 不影响模型精度。</p>",
      "quiz": {
        "q": "Tesseract 相比 2D SUMMA 并行降低通信量的核心机制是什么？",
        "options": [
          "使用更高效的通信原语（如 NCCL Ring AllReduce）",
          "引入 depth 维度复制输入矩阵，使每步广播的子块更小",
          "通过梯度压缩减少传输数据量",
          "将通信与计算完全重叠隐藏延迟"
        ],
        "answer": 1,
        "explain": "Tesseract 在 2D 网格基础上增加 depth 维度，将矩阵列/行方向多切 d 份分配到不同 depth 层，使得 SUMMA 每步广播的数据量从 n²/q² 降至 n²/(dq²)，总通信量减少约 d 倍。"
      }
    },
    {
      "id": "sequence_parallel",
      "num": 9,
      "name": "Sequence Parallelism",
      "fullName": "序列并行 (Sequence Parallelism)",
      "year": "2023",
      "org": "NUS/Colossal-AI",
      "parent": "megatron_tp",
      "paperUrl": "https://aclanthology.org/2023.acl-long.134/",
      "projectUrl": "",
      "category": "tp",
      "motivation": "沿序列维度切分LayerNorm和Dropout激活值",
      "summary": "Sequence Parallelism 的核心目标是：沿序列维度切分LayerNorm和Dropout激活值。",
      "keyPoints": [
        "核心动机：沿序列维度切分LayerNorm和Dropout激活值",
        "演化来源：继承或改进自 megatron_tp",
        "代表机构：NUS/Colossal-AI"
      ],
      "detail": "<p>沿序列维度切分LayerNorm和Dropout激活值</p>"
    },
    {
      "id": "ulysses",
      "num": 10,
      "name": "DeepSpeed Ulysses",
      "fullName": "序列并行Ulysses (DeepSpeed Ulysses)",
      "year": "2023",
      "org": "Microsoft",
      "parent": "sequence_parallel",
      "paperUrl": "https://arxiv.org/abs/2309.14509",
      "projectUrl": "",
      "category": "tp",
      "motivation": "All-to-All序列通信支持极长序列",
      "summary": "DeepSpeed-Ulysses 提出了一种基于序列维度分区的序列并行方法，通过 all-to-all 集合通信在注意力计算前后转换分区维度（序列↔注意力头），实现了通信量与序列长度无关的 \\(O(N/P)\\) 高效通信，结合 ZeRO-3 内存优化支持百万级 token 长序列 Transformer 训练。",
      "keyPoints": [
        "<strong>序列维度分区</strong>：将输入序列沿 token 维度均匀切分到 P 个 GPU，每个 GPU 处理 \\(N/P\\) 个 token",
        "<strong>All-to-All 通信转换</strong>：在 QKV 线性投影后执行 all-to-all，将分区从\"序列切分\"转为\"注意力头切分\"，使每个 GPU 拥有完整序列的部分头",
        "<strong>注意力机制无关性</strong>：支持任意注意力实现（dense、sparse、FlashAttention），因为 all-to-all 后每个 GPU 上的注意力计算是完整的标准注意力",
        "<strong>通信复杂度优势</strong>：总通信量 \\(O(N/P)\\)，与序列长度无关；对比 Megatron-LM 的 \\(O(N)\\) all-gather 通信",
        "<strong>与 ZeRO-3 深度集成</strong>：模型状态（参数、梯度、优化器）通过 ZeRO-3 跨数据并行组分区，实现内存与通信的联合优化",
        "<strong>可组合并行</strong>：可与张量并行（TP）、流水线并行（PP）、数据并行（DP）正交组合",
        "<strong>实验验证</strong>：7B/30B 模型上持续优于 Megatron-LM，支持 4x 更长序列，dense/sparse 注意力均有效"
      ],
      "detail": "<h5>核心架构图</h5>\n<p><img alt=\"DeepSpeed-Ulysses 序列并行设计\" src=\"https://ar5iv.labs.arxiv.org/html/2309.14509/assets/figs/mha_v1.png\" />\n<em>图：DeepSpeed-Ulysses 核心设计。输入序列按 token 维度分区到 P 个 GPU，经 QKV 投影后通过 all-to-all 转换为按注意力头分区，执行完整注意力后再 all-to-all 回到序列分区。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># DeepSpeed-Ulysses 序列并行核心流程\n# 假设 P 个 GPU，序列长度 N，注意力头数 h\n\n# Step 1: 输入分区 - 每个 GPU i 持有 input[i*(N/P) : (i+1)*(N/P)]\nlocal_input = partition_sequence(input, rank, world_size)  # shape: [N/P, d]\n\n# Step 2: 本地 QKV 线性投影\nQ_local = W_q @ local_input  # shape: [N/P, h*d_h]\nK_local = W_k @ local_input  # shape: [N/P, h*d_h]\nV_local = W_v @ local_input  # shape: [N/P, h*d_h]\n\n# Step 3: All-to-All 通信 (序列分区 → 头分区)\n# 每个 GPU 从持有 [N/P, h] 变为持有 [N, h/P]\nQ_heads = all_to_all(Q_local)  # shape: [N, (h/P)*d_h]\nK_heads = all_to_all(K_local)  # shape: [N, (h/P)*d_h]\nV_heads = all_to_all(V_local)  # shape: [N, (h/P)*d_h]\n\n# Step 4: 本地注意力计算 (完整序列, 部分头) - 支持任意attention实现\nattn_output = attention(Q_heads, K_heads, V_heads)  # FlashAttention/Sparse/Dense\n\n# Step 5: All-to-All 通信 (头分区 → 序列分区)\noutput_local = all_to_all(attn_output)  # shape: [N/P, h*d_h]\n\n# Step 6: 输出投影 + 后续 FFN (仍在序列分区下)\noutput = W_o @ output_local\n</code></pre>\n<h5>动机与背景</h5>\n<p>长序列训练是大语言模型的核心需求——从文档理解、代码生成到科学计算，序列长度从 2K 扩展到 100K+ tokens。然而，自注意力机制的 \\(O(N^2)\\) 计算和内存复杂度使得单 GPU 无法容纳长序列。</p>\n<p>现有序列并行方案存在明显缺陷：</p>\n<ol>\n<li><strong>Megatron-LM 序列并行</strong>：仅并行化 LayerNorm 和 Dropout（非注意力核心），使用 all-gather + reduce-scatter 通信，总通信量为 \\(O(N)\\)，与序列长度线性相关</li>\n<li><strong>Ring Attention (Li et al. 2022)</strong>：通过环形传递 KV 块实现序列并行，但需要特定的注意力内核实现，不支持通用注意力机制</li>\n</ol>\n<div class=\"key-point\">💡 关键洞察：注意力计算在头维度上天然独立——不同注意力头之间无数据依赖。因此可以将\"序列切分\"转换为\"头切分\"，让每个 GPU 独立计算部分头的完整注意力。</div>\n<h5>核心机制：All-to-All 通信设计</h5>\n<p>DeepSpeed-Ulysses 的核心创新在于利用 <strong>all-to-all 集合通信</strong> 实现分区维度的高效转换：</p>\n<p><strong>前向传播中的两次 all-to-all：</strong></p>\n<ol>\n<li><strong>注意力前 all-to-all</strong>：将 QKV 张量从 \\([N/P, h \\cdot d_h]\\)（序列分区）重组为 \\([N, (h/P) \\cdot d_h]\\)（头分区）</li>\n<li><strong>注意力后 all-to-all</strong>：将注意力输出从 \\([N, (h/P) \\cdot d_h]\\)（头分区）重组回 \\([N/P, h \\cdot d_h]\\)（序列分区）</li>\n</ol>\n<p><strong>通信量分析：</strong></p>\n<p>每次 all-to-all 中，每个 GPU 发送和接收的数据量为：</p>\n<p>$$M_{a2a} = \\frac{N}{P} \\cdot h \\cdot d_h \\cdot (P-1)/P \\approx \\frac{N \\cdot h \\cdot d_h}{P} = \\frac{N \\cdot d}{P}$$</p>\n<p>其中 \\(d = h \\cdot d_h\\) 为隐藏维度。注意通信量与 \\(N/P\\)（每 GPU 的本地序列长度）成正比，<strong>与总序列长度 N 无关</strong>（当 P 随 N 线性增长时）。</p>\n<p>对比 Megatron-LM 的 all-gather 通信量为 \\(O(N)\\)，DeepSpeed-Ulysses 在长序列场景下通信效率显著更优。</p>\n<h5>注意力机制无关性</h5>\n<p>由于 all-to-all 后每个 GPU 持有<strong>完整序列</strong>的部分注意力头，本地注意力计算与标准单 GPU 注意力完全相同。这意味着：</p>\n<ul>\n<li>✅ 直接支持 FlashAttention-2（高效 dense attention）</li>\n<li>✅ 直接支持 Sparse Attention（block-sparse 等）</li>\n<li>✅ 未来新的注意力变体无需修改并行逻辑</li>\n</ul>\n<div class=\"warn-box\">⚠️ 注意：序列并行度 P 必须整除注意力头数 h，即 \\(h \\mod P = 0\\)。这是唯一的约束条件。</div>\n<h5>与 ZeRO-3 的集成</h5>\n<p>DeepSpeed-Ulysses 与 ZeRO-3 内存优化深度集成，形成二维并行：</p>\n<ul>\n<li><strong>序列并行组</strong>（SP group, P 个 GPU）：负责序列维度的分区和 all-to-all 通信</li>\n<li><strong>数据并行组</strong>（DP group, D 个 GPU）：负责 ZeRO-3 的模型状态分区（参数、梯度、优化器状态）</li>\n</ul>\n<p>总 GPU 数 = P × D。ZeRO-3 将模型参数分片到 D 个 GPU，每个 GPU 仅存储 \\(1/D\\) 的参数，通过 all-gather 在前向/反向时临时聚合。这使得：</p>\n<p>$$\\text{Memory per GPU} \\propto \\frac{\\text{Model States}}{D} + \\frac{\\text{Activations}(N/P)}{1}$$</p>\n<p>序列并行减少激活内存（与 \\(N/P\\) 相关），ZeRO-3 减少模型状态内存，两者正交互补。</p>\n<h5>与传统方法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>DeepSpeed-Ulysses</th>\n<th>Megatron-LM SP</th>\n<th>Ring Attention</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>并行维度</td>\n<td>序列→头→序列</td>\n<td>LayerNorm/Dropout</td>\n<td>序列（环形KV传递）</td>\n</tr>\n<tr>\n<td>通信原语</td>\n<td>All-to-All</td>\n<td>All-Gather + Reduce-Scatter</td>\n<td>P2P Send/Recv</td>\n</tr>\n<tr>\n<td>通信量</td>\n<td>\\(O(N/P)\\)</td>\n<td>\\(O(N)\\)</td>\n<td>\\(O(N/P)\\) per step × P steps</td>\n</tr>\n<tr>\n<td>注意力支持</td>\n<td>任意</td>\n<td>需绑定特定实现</td>\n<td>需定制内核</td>\n</tr>\n<tr>\n<td>内存优化</td>\n<td>ZeRO-3 集成</td>\n<td>张量并行绑定</td>\n<td>独立</td>\n</tr>\n<tr>\n<td>可扩展性</td>\n<td>P ≤ h</td>\n<td>受限于 TP 度</td>\n<td>理论无限</td>\n</tr>\n</tbody>\n</table></div>\n<h5>实验结果</h5>\n<p>在 A100 GPU 集群上的评估显示：</p>\n<ul>\n<li><strong>7B 模型 (32 GPU)</strong>：DeepSpeed-Ulysses 在所有可比序列长度上吞吐量超过 Megatron-LM，且支持更长序列</li>\n<li><strong>30B 模型 (64 GPU)</strong>：类似趋势，DeepSpeed-Ulysses 支持 4x 更长序列</li>\n<li><strong>强扩展性</strong>：固定 131K 序列长度，64→256 GPU 时执行时间近线性下降</li>\n<li><strong>弱扩展性</strong>：GPU 数与序列长度同比增长时，保持 &gt;135 TFLOPs/GPU（接近峰值性能）</li>\n<li><strong>收敛验证</strong>：1.3B 模型 32K 序列长度下，与 Megatron-LM 收敛曲线完全一致</li>\n</ul>",
      "quiz": {
        "q": "DeepSpeed-Ulysses 在注意力计算前后使用 all-to-all 通信的核心目的是什么？",
        "options": [
          "将模型参数分布到不同 GPU 以减少内存占用",
          "将分区维度从序列切分转换为注意力头切分，使每个 GPU 可独立计算完整序列的部分头",
          "实现梯度的跨 GPU 同步以保证训练一致性",
          "将 KV cache 分布存储以支持更长的推理序列"
        ],
        "answer": 1,
        "explain": "All-to-all 的作用是转换张量的分区维度：从按序列切分（每 GPU 持有部分 token 的所有头）变为按头切分（每 GPU 持有所有 token 的部分头），从而让每个 GPU 可以对完整序列执行标准注意力计算。"
      }
    },
    {
      "id": "lightseq",
      "num": 11,
      "name": "LightSeq",
      "fullName": "轻量序列并行 (LightSeq)",
      "year": "2023",
      "org": "UC Berkeley",
      "parent": "sequence_parallel",
      "paperUrl": "https://arxiv.org/abs/2310.03294",
      "projectUrl": "",
      "category": "tp",
      "motivation": "序列级别分布式Attention计算",
      "summary": "LightSeq 提出了基于序列级并行的分布式注意力机制 DistAttn，结合负载均衡策略和重计算感知检查点技术，将长序列训练的通信量降低 4.7 倍，实现了百万级 token 序列的高效分布式训练。",
      "keyPoints": [
        "提出 DistAttn（Distributed Attention）：沿序列维度分区注意力计算，支持任意注意力机制（causal/non-causal/多种 mask）",
        "通信量仅为 \\(3Nd\\)（N=序列长度，d=隐藏维度），相比 Ring Attention 的 \\(14Nd\\) 降低 4.7 倍",
        "负载均衡策略：针对 causal attention 的三角形计算不均衡问题，通过 token 重排实现均匀分配",
        "重计算感知检查点（Rematerialization-aware Checkpointing）：利用通信与计算重叠隐藏通信开销",
        "在 Megatron-LM 基础上实现，支持与 tensor/pipeline/data parallelism 正交组合",
        "在 32 个 A100 GPU 上相比 Megatron-LM 实现最高 2.01 倍加速，支持序列长度达 2M tokens"
      ],
      "detail": "<p><img alt=\"LightSeq DistAttn 示意图\" src=\"https://arxiv.org/html/2310.03294v2/extracted/5909850/figures/distattn.png\" />\n<em>图：DistAttn 分布式注意力机制示意，展示序列分区后的 Q、K、V 通信与计算流程</em></p>\n<pre><code class=\"language-python\"># DistAttn 核心伪代码\n# 输入：本地 Q_local, K_local, V_local（序列已按 N/P 分区到 P 个 GPU）\n\n# 步骤 1: All-to-All 通信收集完整 K, V\nK_full = all_gather(K_local)  # 收集所有 GPU 的 K 分片\nV_full = all_gather(V_local)  # 收集所有 GPU 的 V 分片\n\n# 步骤 2: 本地计算注意力（仅对本地 Q 分片）\nO_local = FlashAttention(Q_local, K_full, V_full)\n\n# 步骤 3: 输出无需额外通信，直接用于后续 FFN\n# 总通信量：forward 2Nd (gather K,V) + backward Nd (scatter dQ) = 3Nd\n</code></pre>\n<p><strong>动机与背景</strong></p>\n<p>随着大语言模型对长上下文能力的需求急剧增长（如 100K+ token 的文档理解、代码生成），传统的 tensor parallelism 和 data parallelism 面临严重瓶颈：</p>\n<ol>\n<li><strong>内存瓶颈</strong>：注意力机制的内存复杂度为 \\(O(N^2)\\)，即使使用 FlashAttention 降至 \\(O(N)\\)，单 GPU 仍无法容纳超长序列的激活值</li>\n<li><strong>通信瓶颈</strong>：Ring Attention 虽然支持序列并行，但需要在环形拓扑中逐步传递 KV 块，通信量高达 \\(14Nd\\)</li>\n<li><strong>负载不均</strong>：Causal attention 的下三角 mask 导致不同位置的 token 计算量差异巨大</li>\n</ol>\n<div class=\"key-point\">💡 关键：LightSeq 的核心洞察是——在序列并行中，Q 不需要通信（每个 GPU 只计算自己的 Q 对应的输出），只需收集完整的 K 和 V。</div>\n<p><strong>核心机制：DistAttn</strong></p>\n<p>DistAttn 的设计基于以下关键观察：对于注意力计算 \\(O = \\text{softmax}(QK^T/\\sqrt{d})V\\)，输出 \\(O\\) 的第 \\(i\\) 行仅依赖 \\(Q\\) 的第 \\(i\\) 行和完整的 \\(K, V\\)。因此：</p>\n<p>$$O_i = \\text{softmax}\\left(\\frac{Q_i K^T}{\\sqrt{d}}\\right) V$$</p>\n<p>这意味着可以将序列均匀分到 \\(P\\) 个 GPU，每个 GPU 持有 \\(Q_{\\text{local}}\\)（\\(N/P\\) 个 token），但需要访问完整的 \\(K\\) 和 \\(V\\)。</p>\n<p><strong>前向传播通信分析：</strong>\n- 每个 GPU 需要 gather 完整 K 和 V：通信量 = \\(2 \\times N \\times d = 2Nd\\)\n- 输出 \\(O_{\\text{local}}\\) 无需通信</p>\n<p><strong>反向传播通信分析：</strong>\n- \\(dK\\) 和 \\(dV\\) 通过 reduce-scatter 聚合：已包含在 forward 的 all-gather 对偶操作中\n- \\(dQ\\) 仅需本地梯度，额外通信量 = \\(Nd\\)</p>\n<p><strong>总通信量</strong> = \\(3Nd\\)，而 Ring Attention 需要 \\(14Nd\\)（包含 2P-1 步的 KV 传递）。</p>\n<div class=\"warn-box\">⚠️ 注意：这里的通信量分析假设使用 all-gather/reduce-scatter 原语，在 NVLink 互联的 GPU 集群上可实现接近带宽上限的效率。</div>\n<p><strong>负载均衡策略</strong></p>\n<p>对于 causal attention，第 \\(i\\) 个 token 只关注前 \\(i\\) 个 token，导致计算量呈三角形分布。如果简单按顺序分区，第一个 GPU 的计算量远小于最后一个 GPU。</p>\n<p>LightSeq 的解决方案：<strong>交错分配（Interleaved Assignment）</strong></p>\n<p>将 token 按如下方式分配到 \\(P\\) 个 GPU：\n- GPU 0: tokens \\(\\{0, 2P-1, 2P, 4P-1, ...\\}\\)\n- GPU 1: tokens \\(\\{1, 2P-2, 2P+1, 4P-2, ...\\}\\)\n- 一般地，将序列折叠后交替分配，使每个 GPU 同时获得\"轻\"token（序列前部）和\"重\"token（序列后部）</p>\n<p>这确保了每个 GPU 的 FLOPs 近似相等，负载差异从 \\(O(N/P)\\) 降至 \\(O(1)\\)。</p>\n<p><strong>重计算感知检查点（Rematerialization-aware Checkpointing）</strong></p>\n<p>传统激活检查点在反向传播时重新计算前向激活，但在分布式设置中，重计算需要重新执行通信操作。LightSeq 的创新在于：</p>\n<ol>\n<li><strong>选择性保存</strong>：保存通信获取的 K、V（而非本地计算的中间结果），避免反向时重复通信</li>\n<li><strong>通信-计算重叠</strong>：在重计算本地注意力的同时，异步预取下一层所需的 K、V</li>\n<li><strong>内存-通信权衡</strong>：通过保存 \\(O(N \\cdot d / P)\\) 的额外内存，完全消除反向传播中的通信等待</li>\n</ol>\n<p>$$\\text{Memory overhead} = \\frac{2Nd}{P} \\quad \\text{(保存 K, V 的本地分片)}$$</p>\n<p><strong>与传统方法的对比</strong></p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>通信量</th>\n<th>负载均衡</th>\n<th>适用注意力类型</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Megatron-SP</td>\n<td>\\(4Nd\\) (all-reduce)</td>\n<td>均衡</td>\n<td>所有类型</td>\n</tr>\n<tr>\n<td>Ring Attention</td>\n<td>\\(14Nd\\)</td>\n<td>不均衡(causal)</td>\n<td>所有类型</td>\n</tr>\n<tr>\n<td>DeepSpeed-Ulysses</td>\n<td>\\(4Nd\\) (all-to-all)</td>\n<td>均衡</td>\n<td>所有类型</td>\n</tr>\n<tr>\n<td><strong>LightSeq (DistAttn)</strong></td>\n<td><strong>\\(3Nd\\)</strong></td>\n<td><strong>均衡(含优化)</strong></td>\n<td><strong>所有类型</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p>LightSeq 相比 DeepSpeed-Ulysses 进一步减少 25% 通信量，因为 Ulysses 需要在输出端执行额外的 all-to-all 将结果重新分配回 head 维度，而 DistAttn 的输出天然保持序列分区无需额外通信。</p>\n<p><strong>实验验证</strong></p>\n<p>在 32 个 A100 80GB GPU（4 节点，NVLink + InfiniBand）上的实验表明：\n- 序列长度 64K-2M tokens，模型参数 1.3B-7B\n- 相比 Megatron-LM：在 7B 模型、512K 序列上实现 2.01x 加速\n- 相比 DeepSpeed-Ulysses：在多数配置下实现 1.24x-1.54x 加速\n- 通信时间占比从 Ring Attention 的 60%+ 降至 LightSeq 的 20% 以下</p>",
      "quiz": {
        "q": "LightSeq 的 DistAttn 相比 Ring Attention 通信量降低的关键原因是什么？",
        "options": [
          "使用了更高效的压缩算法减少传输数据量",
          "Q 不需要通信，只需 gather K 和 V，避免了环形逐步传递的冗余",
          "通过量化将 KV 精度降低从而减少通信量",
          "利用稀疏注意力跳过部分 token 的通信"
        ],
        "answer": 1,
        "explain": "DistAttn 的核心洞察是输出 O_i 只依赖本地 Q_i 和完整 K、V，因此 Q 无需通信，只需一次 all-gather 收集 K 和 V（通信量 3Nd），而 Ring Attention 需要在环中逐步传递完整 KV 块（14Nd）。"
      }
    },
    {
      "id": "loogtrain",
      "num": 12,
      "name": "LoongTrain",
      "fullName": "上下文并行 (Context Parallelism)",
      "year": "2024",
      "org": "ByteDance",
      "parent": "ulysses",
      "paperUrl": "https://arxiv.org/abs/2406.18485",
      "projectUrl": "",
      "category": "tp",
      "motivation": "2D-Attention机制Head-Context双重并行",
      "summary": "LoongTrain 提出 2D-Attention 机制，将序列并行组织为 Head Parallelism × Context Parallelism 的二维网格，结合 Double-Ring-Attention 通信优化，突破了 Head Parallelism 受限于注意力头数的可扩展性瓶颈，同时解决了 Context Parallelism 的 P2P 通信效率低下问题，实现长序列 LLM 训练性能最高 2.88× 的提升。",
      "keyPoints": [
        "<strong>2D-Attention 机制</strong>：将 \\(d_{sp}\\) 个 GPU 组织为 \\(d_{hp} \\times d_{cp}\\) 二维网格，HP 维度用 SeqAlltoAll 按注意力头分发，CP 维度用 Ring-Attention 按序列分块",
        "<strong>KV Replication for GQA</strong>：当 KV 头数 \\(H_{kv} < d_{hp}\\) 时，复制 KV 张量使 HP 维度可扩展至 \\(H\\)（总头数），解除 GQA 场景下 HP 的头数限制",
        "<strong>Double-Ring-Attention</strong>：将 CP 组内 GPU 划分为多个内环（inner ring），内环间形成外环（outer ring），充分利用所有跨节点 NIC 带宽，实现通信与计算的高效重叠",
        "<strong>设备放置策略</strong>：Head-First（HP 组优先同节点）和 Context-First（CP 组优先同节点）两种策略，根据配置选择最优通信拓扑",
        "<strong>Hybrid ZeRO</strong>：跨 DP × SP 维度应用 ZeRO 优化器状态分片，采用 AMSP 灵活分片策略平衡显存与通信",
        "<strong>Selective Checkpoint++</strong>：白名单机制保留注意力块激活值避免重计算，同时通过延迟释放 QKV 张量降低峰值显存"
      ],
      "detail": "<p><img alt=\"2D-Attention 总体框架\" src=\"https://ar5iv.labs.arxiv.org/html/2406.18485/assets/x6.png\" />\n<em>图：2D-Attention 将 GPU 组织为 HP × CP 二维网格。HP 维度通过 SeqAlltoAll 按头维度分发 QKV，CP 维度通过 Double-Ring-Attention 按序列维度分块计算。</em></p>\n<h5>动机与背景</h5>\n<p>长序列 LLM 训练（序列长度达 128K-1M tokens）面临两大挑战：</p>\n<ol>\n<li>\n<p><strong>Head Parallelism (HP) 可扩展性受限</strong>：Ulysses (DeepSpeed-Ulysses) 通过 AlltoAll 将 QKV 按注意力头维度分发到不同 GPU，但并行度上限为注意力头数 \\(H\\)。对于 GQA 模型（如 LLaMA-2 70B 仅 8 个 KV 头），HP 并行度极其有限。</p>\n</li>\n<li>\n<p><strong>Context Parallelism (CP) 通信效率低</strong>：Ring-Attention 使用 P2P 通信在环形拓扑中传递 KV 块，但存在两个问题：(a) 节点内 P2P 仅使用 NVLink 的一个通道，带宽利用率低；(b) 跨节点 P2P 仅使用一对 NIC，无法利用多 NIC 带宽。实验显示在 64 GPU、128K 序列长度的 GQA 场景下，Ring-Attention 通信时间是计算时间的 1.8 倍。</p>\n</li>\n</ol>\n<h5>2D-Attention 核心算法</h5>\n<pre><code class=\"language-python\"># Algorithm 1: 2D-Attention (Forward)\n# Input: Q, K, V with shape (H, S/d_sp, D/H) per GPU\n# d_sp = d_hp × d_cp\n\n# Step 1: SeqAlltoAll — 按头维度重分布\n# 通信模式: AlltoAll within HP group\nQ = SeqAlltoAll(Q, scatter_dim=head, gather_dim=seq)  \nK = SeqAlltoAll(K, scatter_dim=head, gather_dim=seq)\nV = SeqAlltoAll(V, scatter_dim=head, gather_dim=seq)\n# After: shape (H/d_hp, S/d_cp, D/H) per GPU\n\n# Step 2: Double-Ring-Attention within CP group\nout = DoubleRingAttention(Q, K, V, d_cp, w=inner_ring_size)\n\n# Step 3: SeqAlltoAll — 恢复原始分布\nout = SeqAlltoAll(out, scatter_dim=seq, gather_dim=head)\n# After: shape (H, S/d_sp, D/H) per GPU\n</code></pre>\n<p><img alt=\"Double-Ring-Attention 示意图\" src=\"https://ar5iv.labs.arxiv.org/html/2406.18485/assets/x9.png\" />\n<em>图：Double-Ring-Attention 示例。\\(d_{cp}=8\\)，内环大小为 4，外环大小为 2。内环使用节点内 NVLink P2P，外环使用跨节点多 NIC P2P。</em></p>\n<pre><code class=\"language-python\"># Algorithm 2: Double-Ring-Attention\n# Input: Q, K, V, d_cp, w (inner ring size)\n# Outer ring has d_cp/w steps, inner ring has w steps\n\nfor outer_step in range(d_cp // w):\n    # Async P2P: send KV to next outer rank, recv from prev outer rank\n    P2P.async_send(KV, next_outer_rank)\n    KV_hat = P2P.async_recv(previous_outer_rank)\n\n    for inner_step in range(w):\n        # Async P2P within inner ring\n        P2P.async_send(KV, next_inner_rank)\n        KV_prime = P2P.async_recv(previous_inner_rank)\n\n        # Compute attention block\n        block_out, block_lse = FlashAttention(Q, K, V)\n        out, lse = online_softmax_update(out, lse, block_out, block_lse)\n\n        # Synchronize inner ring P2P\n        P2P.synchronize(inner_ring)\n        K, V = KV_prime  # Update for next inner step\n\n    # Synchronize outer ring P2P\n    P2P.synchronize(outer_ring)\n    K, V = KV_hat  # Update for next outer step\n</code></pre>\n<h5>核心机制详解</h5>\n<p><strong>1. 2D-Attention 的计算-通信分析</strong></p>\n<p>每个 micro-step 的前向计算时间为：</p>\n<p>$$T_{comp}^{fwd} = \\alpha \\frac{S^2 D}{d_{cp} \\cdot d_{sp}}$$</p>\n<p>其中 \\(\\alpha\\) 为计算常数。总共有 \\(d_{cp}\\) 个 micro-step（\\(w\\) 个内环步 × \\(d_{cp}/w\\) 个外环步），总计算时间为 \\(d_{cp} \\times T_{comp}^{fwd}\\)。</p>\n<p>KV 块大小为：</p>\n<p>$$Size(kv) = \\frac{\\max(H_{kv}, d_{hp})}{H} \\times \\frac{4SD}{d_{sp}}$$</p>\n<div class=\"key-point\">💡 关键：通过增大 \\(d_{hp}\\) 减小 \\(d_{cp}\\)，可以减少 Ring-Attention 的 P2P 步数，从而降低通信暴露时间。同时 SeqAlltoAll 是集合通信，带宽利用率远高于 P2P。</div>\n<p><strong>2. Double-Ring-Attention 的通信优化</strong></p>\n<p>传统 Ring-Attention 在跨节点场景下，每个 GPU 每步只与一个邻居通信，仅使用一对 NIC。Double-Ring 的核心思想：</p>\n<ul>\n<li><strong>内环</strong>（intra-node）：同节点 GPU 组成环，利用 NVLink 高带宽（600 GB/s bidirectional per GPU on DGX-A100）</li>\n<li><strong>外环</strong>（inter-node）：内环之间形成外环，外环通信时所有 GPU 同时发送，充分利用节点所有 NIC（400 GB/s per node on DGX-A100）</li>\n<li><strong>重叠</strong>：外环 P2P 与内环计算重叠——当内环执行 \\(w\\) 步计算时，外环异步传输下一轮所需的 KV 块</li>\n</ul>\n<div class=\"warn-box\">⚠️ 注意：内环大小 \\(w\\) 的选择需要权衡——\\(w\\) 越大，外环通信越容易被隐藏，但内环步数增多可能导致内环 P2P 成为瓶颈。最优 \\(w\\) 通常等于节点内 GPU 数（如 8）。</div>\n<p><strong>3. KV Replication 突破 GQA 限制</strong></p>\n<p>在 GQA 中 \\(H_{kv} \\ll H\\)（如 LLaMA-2 70B: \\(H=64, H_{kv}=8\\)）。若 \\(d_{hp} > H_{kv}\\)，SeqAlltoAll 后某些 GPU 将没有 KV 头可处理。解决方案：</p>\n<p>$$\\text{KV Replicated Shape} = (d_{hp}, S/d_{cp}, D/H) \\quad \\text{when } d_{hp} > H_{kv}$$</p>\n<p>在 SeqAlltoAll 之前将 KV 张量复制 \\(d_{hp}/H_{kv}\\) 份，使每个 GPU 在 AlltoAll 后都能获得完整的 KV 数据。虽然增加了通信量，但换取了更大的 HP 并行度，减少了 CP 维度的 P2P 步数。</p>\n<p><strong>4. 设备放置策略</strong></p>\n<p><img alt=\"设备放置对比\" src=\"https://ar5iv.labs.arxiv.org/html/2406.18485/assets/x11.png\" />\n<em>图：Context-First vs Head-First 设备放置。不同颜色代表不同注意力头。</em></p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>策略</th>\n<th>SeqAlltoAll 通信</th>\n<th>P2P 通信</th>\n<th>适用场景</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Head-First</td>\n<td>节点内 NVLink（高效）</td>\n<td>跨节点（需 Double-Ring）</td>\n<td>\\(d_{hp}\\) 较大时</td>\n</tr>\n<tr>\n<td>Context-First</td>\n<td>跨节点（需数据重排）</td>\n<td>节点内 NVLink（高效）</td>\n<td>\\(d_{cp}\\) 较大时</td>\n</tr>\n</tbody>\n</table></div>\n<p>Context-First 放置需要在数据加载器中添加后处理函数，在每个 batch 开始时调整输入张量位置，避免运行时数据搬移。</p>\n<p><strong>5. 系统级优化</strong></p>\n<ul>\n<li><strong>Hybrid ZeRO</strong>：跨 \\(d_{dp} \\times d_{sp}\\) 维度分片优化器状态和梯度，采用 AMSP 的 Full-Replica/Full-Sharding/Partial-Sharding 三种策略，Norm 和 Linear 模块可独立选择分片粒度</li>\n<li><strong>Selective Checkpoint++</strong>：保留注意力块的输出激活值（避免 \\(O(S^2)\\) 的注意力重计算），仅对 FFN 等模块做 checkpoint。通过延迟释放策略，在反向传播时按需保留 QKV 张量，峰值显存仅需 \\(2SD/d_{sp}\\)（FP16）</li>\n</ul>\n<h5>实验结果</h5>\n<p>在 32 GPU（4 节点 DGX-A100）上训练 LLaMA-7B 模型，序列长度 128K-1M：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>配置</th>\n<th>GQA 128K TGS</th>\n<th>GQA 1M MFU</th>\n<th>对比 DS-Ulysses</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>DS-Ulysses (HP32)</td>\n<td>629.9</td>\n<td>0.365</td>\n<td>baseline</td>\n</tr>\n<tr>\n<td>Megatron-CP (CP32)</td>\n<td>706.2</td>\n<td>OOM</td>\n<td>—</td>\n</tr>\n<tr>\n<td>LoongTrain HP8/CP4</td>\n<td><strong>838.1</strong></td>\n<td><strong>0.448</strong></td>\n<td><strong>1.33×/1.23×</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p>最优配置 HP8/CP4 在 GQA 128K 场景下达到 838.1 TGS（tokens/GPU/s），MFU 0.448，相比 DS-Ulysses 提升 1.33×。在 MHA 1M 场景下，LoongTrain 相比 DS-Ulysses 提升最高达 2.88×。</p>",
      "quiz": {
        "q": "LoongTrain 的 Double-Ring-Attention 相比传统 Ring-Attention 的核心优势是什么？",
        "options": [
          "减少了注意力计算的 FLOPs",
          "通过内外双环结构充分利用多 NIC 带宽，实现跨节点通信与计算重叠",
          "消除了 P2P 通信，完全使用 AllReduce",
          "将注意力计算从 O(S²) 降低到 O(S log S)"
        ],
        "answer": 1,
        "explain": "Double-Ring 将 GPU 分为内环（节点内 NVLink）和外环（跨节点多 NIC），外环通信与内环计算重叠，充分利用所有网络资源，而非像传统 Ring 每步仅用一对 NIC。"
      }
    },
    {
      "id": "activation_recompute",
      "num": 13,
      "name": "Selective Recomputation",
      "fullName": "选择性激活重计算 (Selective Activation Recomputation)",
      "year": "2023",
      "org": "NVIDIA",
      "parent": "sequence_parallel",
      "paperUrl": "https://arxiv.org/abs/2205.05198",
      "projectUrl": "",
      "category": "tp",
      "motivation": "选择性重计算+序列并行减少30-40%开销",
      "summary": "Selective Recomputation 的核心目标是：选择性重计算+序列并行减少30-40%开销。",
      "keyPoints": [
        "核心动机：选择性重计算+序列并行减少30-40%开销",
        "演化来源：继承或改进自 sequence_parallel",
        "代表机构：NVIDIA"
      ],
      "detail": "<p>选择性重计算+序列并行减少30-40%开销</p>"
    },
    {
      "id": "dynamic_cp",
      "num": 14,
      "name": "Dynamic Context Parallelism",
      "fullName": "动态上下文并行 (Dynamic Context Parallelism)",
      "year": "2026",
      "org": "NVIDIA",
      "parent": "loogtrain",
      "paperUrl": "https://github.com/NVIDIA/Megatron-LM",
      "projectUrl": "",
      "category": "tp",
      "motivation": "自适应调整并行尺寸实现变长序列1.48x加速",
      "summary": "Dynamic Context Parallelism 的核心目标是：自适应调整并行尺寸实现变长序列1.48x加速。",
      "keyPoints": [
        "核心动机：自适应调整并行尺寸实现变长序列1.48x加速",
        "演化来源：继承或改进自 loogtrain",
        "代表机构：NVIDIA"
      ],
      "detail": "<p>自适应调整并行尺寸实现变长序列1.48x加速</p>"
    },
    {
      "id": "gpipe",
      "num": 15,
      "name": "GPipe",
      "fullName": "微批次流水线 (GPipe)",
      "year": "2019",
      "org": "Google",
      "parent": "—",
      "paperUrl": "https://proceedings.neurips.cc/paper/2019/hash/093f65e080a295f8076b1c5722a46aa2-Abstract.html",
      "projectUrl": "",
      "category": "pp",
      "motivation": "微批次流水线+重计算支持巨型网络",
      "summary": "GPipe 提出了一种基于微批次拆分的同步流水线并行算法，结合激活重计算（re-materialization）技术，使任意可表示为层序列的深度网络能够在多加速器间近线性扩展模型规模，同时保持训练一致性和高硬件利用率。",
      "keyPoints": [
        "<strong>流水线并行</strong>：将网络按层顺序切分为 K 个分区，每个分区放置在一个独立加速器上",
        "<strong>微批次拆分</strong>：将 mini-batch 拆分为 M 个 micro-batch，在各分区间流水线式执行，减少 bubble 空闲时间",
        "<strong>同步梯度更新</strong>：所有 micro-batch 的梯度在 mini-batch 结束时累积并同步应用，保证训练一致性（等价于单卡训练）",
        "<strong>激活重计算（Re-materialization）</strong>：前向传播仅保留分区边界激活，反向时重新计算中间激活，将峰值显存从 \\(O(N)\\) 降至 \\(O(N/K + L/K \\cdot N/M)\\)",
        "<strong>Bubble 开销分析</strong>：空闲时间比例为 \\(O((K-1)/(M+K-1))\\)，当 \\(M \\geq 4K\\) 时可忽略不计",
        "<strong>通信开销极低</strong>：仅在分区边界传输激活张量，无需 AllReduce，适用于无高速互联的场景",
        "<strong>规模验证</strong>：AmoebaNet 扩展至 18 亿参数（8 GPU），Transformer 扩展至 839 亿参数（128 TPU），ImageNet top-1 达 84.4%，102 语言多语言翻译任务达 SOTA"
      ],
      "detail": "<p><img alt=\"GPipe 流水线并行示意图\" src=\"https://ar5iv.labs.arxiv.org/html/1811.06965/assets/x1.png\" />\n<em>图：GPipe 将网络分为 K 个分区并将 mini-batch 拆分为 M 个 micro-batch 进行流水线执行。上方为朴素模型并行（大量 bubble），下方为 GPipe 流水线并行（bubble 大幅减少）。</em></p>\n<pre><code class=\"language-python\"># GPipe 核心算法伪代码\ndef gpipe_forward_backward(model_partitions, mini_batch, M):\n    &quot;&quot;&quot;\n    model_partitions: K 个分区 [p_0, p_1, ..., p_{K-1}]\n    mini_batch: 输入数据\n    M: micro-batch 数量\n    &quot;&quot;&quot;\n    K = len(model_partitions)\n    micro_batches = split(mini_batch, M)  # 拆分为 M 个 micro-batch\n\n    # === 前向传播（流水线） ===\n    # 每个分区仅保留边界输入激活，丢弃中间激活\n    for m in range(M):\n        for k in range(K):\n            # 分区 k 对第 m 个 micro-batch 执行前向\n            # 输出传递给分区 k+1\n            output[k][m] = forward(model_partitions[k], input[k][m])\n            input[k+1][m] = output[k][m]  # 跨设备传输\n\n    # === 反向传播（流水线，逆序） ===\n    for m in range(M):\n        for k in reversed(range(K)):\n            # Re-materialization: 从保存的边界激活重新前向计算\n            recompute_activations(model_partitions[k], input[k][m])\n            # 计算梯度并累积\n            grad[k][m] = backward(model_partitions[k], loss[m])\n            accumulated_grad[k] += grad[k][m]\n\n    # === 同步更新 ===\n    for k in range(K):\n        update_weights(model_partitions[k], accumulated_grad[k] / M)\n</code></pre>\n<h5>动机与背景</h5>\n<p>近年来深度学习的突破性进展很大程度上依赖于模型规模的增长——从 BERT 的 3.4 亿参数到 GPT-2 的 15 亿参数。然而，单个加速器的内存容量严重限制了可训练模型的大小。传统的数据并行仅能加速训练吞吐量，无法解决单模型过大无法放入单卡的问题。</p>\n<p>已有的模型并行方案存在明显缺陷：\n- <strong>朴素模型并行</strong>：将不同层放在不同设备上，但同一时刻只有一个设备在计算，硬件利用率极低\n- <strong>Mesh-TensorFlow (SPMD)</strong>：将单个矩阵乘法拆分到多设备，但引入大量 AllReduce 通信，且仅适用于特定架构（如 Transformer），对卷积网络不友好\n- <strong>PipeDream</strong>：使用异步流水线，引入权重版本不一致（weight staleness）问题，需要维护多份参数副本，反而限制了模型规模</p>\n<p>GPipe 的设计目标是：<strong>在保持训练语义完全等价于单卡训练的前提下，实现近线性的模型规模扩展和高硬件利用率</strong>。</p>\n<h5>核心机制：微批次流水线并行</h5>\n<p>GPipe 的核心创新在于将流水线并行与微批次拆分相结合：</p>\n<p><strong>1. 模型分区</strong></p>\n<p>网络被建模为 L 层的序列：</p>\n<p>$$f = f_L \\circ f_{L-1} \\circ \\cdots \\circ f_1$$</p>\n<p>将连续的层分为 K 个分区 \\(p_0, p_1, \\ldots, p_{K-1}\\)，第 k 个分区放在第 k 个加速器上。分区策略的目标是使各分区的计算量（FLOPs 估计）尽可能均衡。</p>\n<p><strong>2. 微批次拆分与流水线调度</strong></p>\n<p>将大小为 N 的 mini-batch 均匀拆分为 M 个大小为 \\(N/M\\) 的 micro-batch。在前向阶段，各 micro-batch 依次注入流水线；当第 1 个 micro-batch 到达分区 \\(p_1\\) 时，分区 \\(p_0\\) 可以开始处理第 2 个 micro-batch，形成流水线并行。</p>\n<div class=\"key-point\">💡 关键：不同 micro-batch 之间<strong>没有数据依赖</strong>（因为梯度是独立计算后累积的），因此可以完美流水线化。</div>\n<p><strong>3. 同步梯度累积</strong></p>\n<p>所有 M 个 micro-batch 的梯度在各分区本地累积，在整个 mini-batch 处理完毕后执行一次统一的参数更新：</p>\n<p>$$\\theta_{t+1} = \\theta_t - \\eta \\cdot \\frac{1}{M} \\sum_{m=1}^{M} \\nabla_\\theta \\mathcal{L}(f(x_m; \\theta_t))$$</p>\n<p>这保证了训练语义与使用完整 mini-batch 的单卡训练<strong>完全一致</strong>，不存在异步更新带来的收敛问题。</p>\n<div class=\"warn-box\">⚠️ 注意：与 PipeDream 的关键区别在于，GPipe 使用同步更新，不存在 weight staleness，因此无需维护多版本参数。</div>\n<h5>显存优化：激活重计算</h5>\n<p>在标准反向传播中，需要保存所有层的前向激活以计算梯度，显存需求为 \\(O(N \\cdot L)\\)。GPipe 采用 re-materialization 策略：</p>\n<ul>\n<li>前向传播时，每个分区<strong>仅保存边界处的输入激活</strong>（即从上一分区接收的张量）</li>\n<li>反向传播时，从保存的边界激活<strong>重新执行前向计算</strong>以恢复中间激活</li>\n<li>这将每个分区的峰值激活显存从 \\(O(N \\cdot L/K)\\) 降至 \\(O(N/M \\cdot L/K)\\)</li>\n</ul>\n<p>总峰值显存为：</p>\n<p>$$\\text{Memory} = O\\left(\\frac{N}{M} \\cdot \\frac{L}{K}\\right) + O(N)$$</p>\n<p>其中第一项是单个 micro-batch 在单个分区内的激活，第二项是跨分区边界需要保存的所有 micro-batch 的边界激活。</p>\n<h5>Bubble 开销分析</h5>\n<p>流水线中不可避免存在\"气泡\"（bubble）——某些加速器在等待上游数据时处于空闲状态。GPipe 的 bubble 时间比例为：</p>\n<p>$$\\text{Bubble fraction} = \\frac{(K-1)}{M + K - 1}$$</p>\n<p>当 \\(M = 4K\\) 时，bubble 仅占 \\(\\frac{K-1}{5K-1} < 20\\%\\)；当 \\(M \\gg K\\) 时趋近于 0。实验证实 \\(M \\geq 4K\\) 时性能损失可忽略。</p>\n<h5>通信特性</h5>\n<p>GPipe 的跨设备通信<strong>仅发生在分区边界</strong>，每个 micro-batch 仅需传输一次边界激活张量（前向）和一次梯度张量（反向）。这与 SPMD 方法中每层都需要 AllReduce 形成鲜明对比。实验表明，即使在没有 NVLink 的 PCIe 连接 GPU 上，GPipe 仍能实现近线性加速（8 GPU 达 3.3× 加速）。</p>\n<h5>实验验证</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>场景</th>\n<th>配置</th>\n<th>模型规模</th>\n<th>关键结果</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>AmoebaNet</td>\n<td>8× GPU (8GB)</td>\n<td>1.8B 参数</td>\n<td>相比单卡扩展 25×</td>\n</tr>\n<tr>\n<td>Transformer</td>\n<td>128× TPUv3 (16GB)</td>\n<td>83.9B 参数</td>\n<td>相比单卡扩展 298×</td>\n</tr>\n<tr>\n<td>ImageNet</td>\n<td>4 分区, 557M AmoebaNet-B</td>\n<td>—</td>\n<td>84.4% top-1 (SOTA)</td>\n</tr>\n<tr>\n<td>多语言翻译</td>\n<td>16 分区, 6B Transformer</td>\n<td>102 语言</td>\n<td>全面超越双语基线</td>\n</tr>\n</tbody>\n</table></div>\n<p>训练效率方面，Transformer 在 \\(M=32, K=8\\) 时达到 6.3× 加速（理论上限 8×），接近线性扩展。</p>\n<h5>与其他方法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>GPipe</th>\n<th>Mesh-TF (SPMD)</th>\n<th>PipeDream</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>通信开销</td>\n<td>极低（仅边界）</td>\n<td>高（每层 AllReduce）</td>\n<td>中等</td>\n</tr>\n<tr>\n<td>训练一致性</td>\n<td>完全同步</td>\n<td>完全同步</td>\n<td>异步（weight stale）</td>\n</tr>\n<tr>\n<td>架构限制</td>\n<td>任意序列网络</td>\n<td>特定架构</td>\n<td>任意</td>\n</tr>\n<tr>\n<td>显存效率</td>\n<td>高（重计算）</td>\n<td>中</td>\n<td>低（多版本参数）</td>\n</tr>\n<tr>\n<td>互联要求</td>\n<td>无特殊要求</td>\n<td>需高速互联</td>\n<td>无特殊要求</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 关键：GPipe 的核心优势在于<strong>通用性</strong>（支持任意可表示为层序列的网络）和<strong>训练一致性</strong>（同步更新保证收敛行为不变），代价是重计算带来约 25% 的额外计算开销。</div>\n<h5>局限性</h5>\n<ul>\n<li>要求单层能放入单个加速器的显存</li>\n<li>对 BatchNorm 等需要跨 batch 统计的层需要特殊处理（训练时使用 micro-batch 统计，评估时累积 mini-batch 统计）</li>\n<li>分区负载均衡对非均匀架构（如 AmoebaNet）较难优化</li>\n</ul>",
      "quiz": {
        "q": "GPipe 中将 mini-batch 拆分为 M 个 micro-batch 的主要目的是什么？",
        "options": [
          "减少每个 micro-batch 的计算量以加速单步训练",
          "通过流水线并行减少加速器空闲时间（bubble），提高硬件利用率",
          "实现异步梯度更新以提升收敛速度",
          "减少跨设备通信的数据量"
        ],
        "answer": 1,
        "explain": "微批次拆分使多个分区能同时处理不同的 micro-batch，形成流水线并行，将 bubble 比例从接近 100%（朴素模型并行）降至 O((K-1)/(M+K-1))，M 越大硬件利用率越高。"
      }
    },
    {
      "id": "pipedream",
      "num": 16,
      "name": "PipeDream",
      "fullName": "1F1B流水线 (PipeDream)",
      "year": "2019",
      "org": "Microsoft/CMU",
      "parent": "gpipe",
      "paperUrl": "https://dl.acm.org/doi/abs/10.1145/3341301.3359646",
      "projectUrl": "",
      "category": "pp",
      "motivation": "1F1B调度策略减少显存驻留",
      "summary": "PipeDream 提出了 **1F1B（one-forward-one-backward）流水线并行调度**方案，结合自动层分区算法、Weight Stashing 和 Vertical Sync 机制，在保证模型收敛性的前提下将流水线并行、数据并行与模型并行有机融合，相比传统 BSP 数据并行训练实现了高达 **5.3×** 的端到端加速。",
      "keyPoints": [
        "<strong>流水线并行（Pipeline Parallelism）</strong>：将 DNN 层划分为多个 stage，每个 stage 映射到不同 GPU，多个 minibatch 在流水线中交叠执行",
        "<strong>1F1B 调度策略</strong>：启动阶段注入 \\(N\\) 个 minibatch 填充流水线，稳态阶段每个 stage 严格交替执行一次 forward 和一次 backward，最大化 GPU 利用率",
        "<strong>自动分区算法</strong>：基于动态规划（DP），利用单机 profiling 数据自动将层划分为 stage，同时确定每个 stage 的数据并行副本数，最小化最慢 stage 的执行时间",
        "<strong>Weight Stashing</strong>：每个 stage 维护多个权重版本，确保同一 minibatch 的 forward 和 backward 在同一 stage 内使用相同版本的权重",
        "<strong>Vertical Sync</strong>：跨 stage 一致性保证——每个 minibatch 在所有 stage 的 forward 传播中使用同一版本的权重",
        "<strong>通信量大幅减少</strong>：仅需传输 stage 边界处的 activation/gradient（而非全部参数），VGG16 上通信减少 <strong>&gt;90%</strong>",
        "<strong>计算与通信重叠</strong>：activation 和 gradient 的跨 stage 传输与下一个 minibatch 的计算并行执行"
      ],
      "detail": "<p><img alt=\"PipeDream 流水线并行示意图\" src=\"https://arxiv.org/html/1806.03377v5/extracted/figures/timeline_1f1b.png\" />\n<em>图：1F1B 流水线调度时间线——数字表示 minibatch ID，蓝色为 forward，绿色为 backward。启动阶段逐步注入 minibatch，稳态阶段各 stage 交替执行 F/B。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># PipeDream 1F1B 调度伪代码\n# 假设 pipeline 有 N 个 stage, stage_id 从 0 (input) 到 N-1 (output)\n\ndef pipedream_1f1b(stage_id, num_stages):\n    num_outstanding = num_stages  # startup 阶段注入的 minibatch 数\n\n    # === Startup Phase ===\n    # 每个 stage 根据自身位置执行不同数量的 forward\n    for i in range(num_stages - stage_id):\n        activations = forward(next_minibatch())\n        send_activations_to_next_stage(activations)\n        stash_weights(version=current_version)  # Weight Stashing\n\n    # === Steady State: 严格交替 1F1B ===\n    while not converged:\n        # Backward pass (使用 stashed weights)\n        gradients = backward(received_gradients, stashed_weights[oldest_version])\n        send_gradients_to_prev_stage(gradients)\n        update_weights(gradients)\n\n        # Forward pass\n        activations = forward(next_minibatch())\n        send_activations_to_next_stage(activations)\n        stash_weights(version=current_version)\n</code></pre>\n<h5>动机与背景</h5>\n<p>传统分布式 DNN 训练主要依赖<strong>数据并行（Data Parallelism）</strong>：每个 worker 持有完整模型副本，处理不同数据分片，训练后同步梯度。这种方式的核心瓶颈在于<strong>通信开销</strong>——每轮迭代需要在所有 worker 间同步全部模型参数。对于 VGG16（550MB 参数）这样的大模型，在 25Gbps 以太网上，通信时间可能远超计算时间，导致 GPU 严重空闲。</p>\n<p>传统<strong>模型并行（Model Parallelism）</strong>将不同层分配到不同 GPU，但由于 DNN 的前向-反向双向依赖，同一时刻只有一个 GPU 在工作，其余 GPU 全部空闲，硬件利用率极低。</p>\n<div class=\"key-point\">💡 <strong>关键洞察</strong>：PipeDream 的核心思想是将多个 minibatch 注入模型并行的流水线中，让不同 GPU 同时处理不同 minibatch 的不同阶段，从而同时解决数据并行的通信瓶颈和模型并行的低利用率问题。</div>\n<h5>核心机制一：自动分区算法</h5>\n<p>PipeDream 的分区问题可形式化为：给定 \\(N\\) 层的 DNN 和 \\(M\\) 台机器，找到最优的层到 stage 的映射以及每个 stage 的副本数，使得流水线吞吐量最大化（即最慢 stage 的执行时间最小化）。</p>\n<p><strong>Profiling 阶段</strong>：在单机上运行 1000 个 minibatch，记录每层的三个关键指标：\n- \\(T_l\\)：第 \\(l\\) 层的前向+反向计算时间\n- \\(a_l\\)：第 \\(l\\) 层输出 activation 的大小（也是反向传播时 gradient 的大小）\n- \\(w_l\\)：第 \\(l\\) 层的参数量</p>\n<p><strong>动态规划求解</strong>：定义 \\(A(j, m)\\) 为将前 \\(j\\) 层最优分配到 \\(m\\) 台机器上时，最慢 stage 的执行时间。递推关系为：</p>\n<p>$$A(j, m) = \\min_{1 \\le i \\le j} \\left[ \\max\\left( A(i-1, m-m'), \\frac{\\sum_{l=i}^{j} T_l}{m'} + \\frac{C_{i-1}}{m'} \\right) \\right]$$</p>\n<p>其中 \\(m'\\) 是当前 stage 的副本数（用于数据并行），\\(C_{i-1}\\) 是 stage 边界处的通信开销。当某个 stage 被分配 \\(m'\\) 个副本时，该 stage 内部采用数据并行，计算时间和通信时间均除以 \\(m'\\)。</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：该算法的时间复杂度为 \\(O(N^2 \\cdot M)\\)，对于数百层的现代 DNN 和数十台机器，可在秒级完成求解。</div>\n<h5>核心机制二：1F1B 调度</h5>\n<p>1F1B 调度分为两个阶段：</p>\n<ol>\n<li>\n<p><strong>Startup Phase（启动阶段）</strong>：input stage 连续注入多个 minibatch 的 forward pass。对于 \\(N\\) 个 stage 的流水线，stage \\(k\\)（从 0 开始编号）在启动阶段执行 \\(N - k\\) 次 forward pass。这确保了流水线被充分填满。</p>\n</li>\n<li>\n<p><strong>Steady State（稳态阶段）</strong>：每个 stage 严格交替执行一次 forward 和一次 backward。这种调度保证了：</p>\n</li>\n<li>每个 stage 在任意时刻都有工作可做（高 GPU 利用率）</li>\n<li>同时处于 in-flight 状态的 minibatch 数量恒定（内存可控）</li>\n<li>流水线中最多有 \\(N\\) 个未完成的 minibatch（\\(N\\) 为 stage 数）</li>\n</ol>\n<p>与 GPipe 的\"全 forward 再全 backward\"方案相比，1F1B 的关键优势在于<strong>内存效率</strong>：GPipe 需要缓存所有 micro-batch 的 activation 直到 backward 完成，而 1F1B 中每个 stage 最多只需缓存 \\(N\\) 个 minibatch 的 activation。</p>\n<h5>核心机制三：Weight Stashing 与 Vertical Sync</h5>\n<p>流水线并行引入了<strong>权重版本不一致</strong>问题：当 minibatch \\(b\\) 在 stage 1 执行 forward 时使用权重 \\(w^{(t)}\\)，但当它回到 stage 1 执行 backward 时，权重可能已被更新为 \\(w^{(t+k)}\\)。这种不一致会导致梯度计算错误，影响收敛。</p>\n<p><strong>Weight Stashing</strong> 解决了 stage 内的一致性：每个 stage 为每个 in-flight minibatch 保存一份权重快照。当 minibatch \\(b\\) 在某 stage 执行 forward 时，使用的权重版本被保存；当该 minibatch 回到同一 stage 执行 backward 时，使用保存的同一版本权重计算梯度。</p>\n<p>$$\\text{Forward: } \\hat{y}_b^{(k)} = f_k(x_b^{(k)}; w_k^{(t)}) \\quad \\Rightarrow \\quad \\text{stash } w_k^{(t)}$$\n$$\\text{Backward: } g_b^{(k)} = \\nabla_{w_k^{(t)}} \\mathcal{L}(\\hat{y}_b, y_b) \\quad \\text{using stashed } w_k^{(t)}$$</p>\n<p><strong>Vertical Sync</strong> 进一步保证跨 stage 的一致性：确保 minibatch \\(b\\) 在所有 stage 的 forward pass 中使用的是同一\"逻辑版本\"的权重。具体实现是在每个 activation 消息中附带权重版本号，接收 stage 据此选择对应版本的权重。</p>\n<div class=\"key-point\">💡 <strong>关键</strong>：Weight Stashing 的额外内存开销为 \\(O(N)\\) 份权重副本（\\(N\\) 为 stage 数），这在实践中是可接受的，因为 stage 数通常较少（4-16）。论文证明了使用 Weight Stashing 后，PipeDream 的权重更新等价于在一个有界陈旧性（bounded staleness）条件下的异步 SGD，可以保证收敛。</div>\n<h5>与传统方法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>数据并行 (BSP)</th>\n<th>模型并行</th>\n<th>PipeDream (1F1B)</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>通信量</td>\n<td>全部参数</td>\n<td>stage 边界 activation</td>\n<td>stage 边界 activation</td>\n</tr>\n<tr>\n<td>GPU 利用率</td>\n<td>受通信阻塞</td>\n<td>极低（串行）</td>\n<td>高（流水线重叠）</td>\n</tr>\n<tr>\n<td>内存</td>\n<td>每 GPU 存全部参数</td>\n<td>每 GPU 存部分参数</td>\n<td>部分参数 + weight stash</td>\n</tr>\n<tr>\n<td>收敛性</td>\n<td>等价单机</td>\n<td>等价单机</td>\n<td>有界陈旧性，实验验证收敛</td>\n</tr>\n<tr>\n<td>扩展性</td>\n<td>受限于通信带宽</td>\n<td>受限于 stage 数</td>\n<td>可混合 DP+PP</td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>实验结果</strong>（Table 1 摘要）：\n- <strong>VGG16</strong>（8 GPU, 25Gbps 网络）：PipeDream 比 BSP 快 <strong>3.0×</strong>，通信减少 <strong>95%</strong>\n- <strong>VGG16</strong>（8 GPU, 10Gbps 网络）：PipeDream 比 BSP 快 <strong>5.3×</strong>（低带宽场景优势更大）\n- <strong>S2VT</strong>（4 GPU）：PipeDream 比 BSP 快 <strong>3.0×</strong>，通信减少 <strong>95%</strong>\n- 所有配置均达到与 BSP 相同的最终精度</p>",
      "quiz": {
        "q": "PipeDream 中 Weight Stashing 机制的主要目的是什么？",
        "options": [
          "减少流水线中 in-flight minibatch 的数量以节省内存",
          "确保同一 minibatch 在同一 stage 的 forward 和 backward 使用相同版本的权重",
          "加速 stage 之间 activation 的通信传输",
          "自动决定每个 stage 应分配多少层"
        ],
        "answer": 1,
        "explain": "Weight Stashing 为每个 in-flight minibatch 保存其 forward 时使用的权重版本，使得 backward 时能使用同一版本权重计算梯度，避免因流水线异步导致的权重不一致问题。"
      }
    },
    {
      "id": "interleaved_pp",
      "num": 17,
      "name": "Interleaved PP",
      "fullName": "交错流水并行 (Interleaved Pipeline Parallel)",
      "year": "2021",
      "org": "NVIDIA",
      "parent": "pipedream",
      "paperUrl": "https://arxiv.org/abs/2104.04473",
      "projectUrl": "",
      "category": "pp",
      "motivation": "交错层分配减小气泡占比",
      "summary": "Interleaved 1F1B 将每个设备分配 \\(v\\) 个非连续的模型块（model chunks），使流水线气泡从 \\(\\frac{p-1}{m}\\) 缩小到 \\(\\frac{p-1}{m \\cdot v}\\)，以额外 \\(v\\) 倍点对点通信为代价显著提升大规模语言模型训练的设备利用率。",
      "keyPoints": [
        "<strong>虚拟阶段划分</strong>：将模型的 \\(L\\) 层均匀分为 \\(v \\times p\\) 个虚拟阶段，每个设备承载 \\(v\\) 个非连续的 model chunks",
        "<strong>气泡时间缩减</strong>：流水线气泡比例从 \\(\\frac{p-1}{m}\\) 降至 \\(\\frac{1}{v} \\cdot \\frac{p-1}{m}\\)，即缩小 \\(v\\) 倍",
        "<strong>通信代价</strong>：点对点（P2P）通信量增加 \\(v\\) 倍，但可利用节点内 NVLink 高带宽隐藏",
        "<strong>微批次约束</strong>：微批次数量 \\(m\\) 必须是流水线并行度 \\(p\\) 的整数倍",
        "<strong>内存不变</strong>：稳态阶段仍保持 1F1B 的内存特性，峰值激活内存与 default schedule 相同",
        "<strong>与 PTD-P 结合</strong>：配合 Tensor 并行（节点内）+ Data 并行（节点间）实现千卡高效扩展"
      ],
      "detail": "<h5>核心示意图</h5>\n<p><img alt=\"Interleaved 1F1B Pipeline Schedule\" src=\"https://ar5iv.labs.arxiv.org/html/2104.04473/assets/x4.png\" />\n<em>图：上方为 Default 1F1B Schedule，下方为 Interleaved 1F1B Schedule。每个设备被分配多个 model chunks（用不同颜色深浅表示），微批次在虚拟阶段间交替执行，warmup 和 cooldown 阶段更短，气泡更小。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># Interleaved 1F1B Pipeline Schedule\n# p: pipeline parallel size, v: num model chunks per device\n# m: num microbatches (must be divisible by p)\n# Device i holds model chunks: [i, i+p, i+2p, ..., i+(v-1)*p]\n\ndef interleaved_1f1b(device_id, microbatches, model_chunks):\n    p = pipeline_size\n    v = len(model_chunks)  # number of chunks per device\n    m = len(microbatches)\n\n    # === Warmup Phase ===\n    # Execute forward passes to fill the pipeline\n    # Number of warmup microbatches is smaller than default\n    num_warmup = (p - 1) * v  # across all virtual stages on this device\n    for i in range(num_warmup):\n        chunk_id = i % v  # rotate through model chunks\n        micro_id = i // v\n        forward(model_chunks[chunk_id], microbatches[micro_id])\n\n    # === Steady State (1F1B) ===\n    # Alternate one forward and one backward per microbatch\n    for i in range(m - num_warmup):\n        # Backward for an earlier microbatch\n        chunk_id_b = schedule_backward(i)\n        backward(model_chunks[chunk_id_b], ...)\n        # Forward for the next microbatch\n        chunk_id_f = schedule_forward(i)\n        forward(model_chunks[chunk_id_f], microbatches[...])\n\n    # === Cooldown Phase ===\n    # Drain remaining backward passes\n    for i in range(num_warmup):\n        chunk_id = schedule_cooldown(i)\n        backward(model_chunks[chunk_id], ...)\n</code></pre>\n<h5>方法细节</h5>\n<p><strong>动机与背景</strong></p>\n<p>在大规模语言模型（如 GPT-3 175B）训练中，单设备无法容纳完整模型，流水线并行（Pipeline Parallelism）是必要的分布式策略。传统的 GPipe 方法将所有前向传播执行完毕后再执行反向传播，导致巨大的激活内存开销。PipeDream 提出的 1F1B（One Forward One Backward）调度通过交替执行前向和反向来限制内存，但仍存在不可避免的流水线气泡：</p>\n<p>$$\n\\text{Bubble fraction (default)} = \\frac{t_{pb}}{t_{id}} = \\frac{p - 1}{m}\n$$</p>\n<p>其中 \\(p\\) 为流水线并行度，\\(m\\) 为微批次数量，\\(t_{pb}\\) 为气泡时间，\\(t_{id}\\) 为理想执行时间。当 \\(p\\) 较大时（如 \\(p=64\\)），即使 \\(m\\) 很大，气泡仍然显著。</p>\n<div class=\"key-point\">💡 关键：气泡的根本原因是流水线的\"填充\"和\"排空\"阶段——第一个微批次必须经过所有阶段后，最后一个阶段才能开始反向传播。</div>\n<p><strong>核心机制：虚拟阶段与交错调度</strong></p>\n<p>Interleaved 1F1B 的核心思想是：<strong>将每个设备分配多个非连续的模型层（model chunks）</strong>，从而创建更多但更小的虚拟流水线阶段。</p>\n<p>具体地，假设模型有 \\(L\\) 层，流水线并行度为 \\(p\\)，每个设备持有 \\(v\\) 个 model chunks：\n- 总虚拟阶段数 = \\(v \\times p\\)\n- 每个 chunk 包含 \\(\\frac{L}{v \\times p}\\) 层\n- 设备 \\(i\\) 持有阶段：\\(i,\\ i+p,\\ i+2p,\\ \\ldots,\\ i+(v-1)p\\)</p>\n<p>例如，当 \\(p=4, v=2\\) 时：\n- Device 0 持有 Stage 0 和 Stage 4\n- Device 1 持有 Stage 1 和 Stage 5\n- Device 2 持有 Stage 2 和 Stage 6\n- Device 3 持有 Stage 3 和 Stage 7</p>\n<p>微批次按照虚拟阶段顺序 0→1→2→...→7 流动，但由于设备 0 同时持有 Stage 0 和 Stage 4，它会在处理完 Stage 0 的前向后，等待数据回到自己时再处理 Stage 4 的前向。这种交错使得流水线的\"深度\"在逻辑上不变，但每个阶段的计算量变为原来的 \\(\\frac{1}{v}\\)，因此填充和排空时间也缩短为原来的 \\(\\frac{1}{v}\\)：</p>\n<p>$$\n\\text{Bubble fraction (interleaved)} = \\frac{1}{v} \\cdot \\frac{p-1}{m}\n$$</p>\n<div class=\"warn-box\">⚠️ 注意：这里的关键约束是微批次数量 \\(m\\) 必须是 \\(p\\) 的整数倍，以确保调度的均匀性。</div>\n<p><strong>通信开销分析</strong></p>\n<p>交错调度的代价是通信量增加。在 default schedule 中，每个微批次在相邻设备间传递一次激活张量（前向）和一次梯度张量（反向），共 \\(2 \\times (p-1)\\) 次点对点通信。在 interleaved schedule 中，由于虚拟阶段数变为 \\(v \\times p\\)，通信次数变为 \\(2 \\times v \\times (p-1)\\)，即增加 \\(v\\) 倍。</p>\n<p>然而，论文指出这一额外通信可以通过以下方式缓解：\n1. <strong>节点内高带宽互联</strong>：将 Tensor 并行放在节点内（NVLink），Pipeline 并行跨节点，利用 DGX A100 的 8 块 InfiniBand 网卡\n2. <strong>通信-计算重叠</strong>：点对点通信可与其他设备上的计算并行执行\n3. <strong>散射/聚集优化</strong>：将多个小消息合并为大消息传输</p>\n<p><strong>与传统方法的对比</strong></p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>GPipe</th>\n<th>Default 1F1B</th>\n<th>Interleaved 1F1B</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>气泡比例</td>\n<td>\\(\\frac{p-1}{m}\\)</td>\n<td>\\(\\frac{p-1}{m}\\)</td>\n<td>\\(\\frac{p-1}{m \\cdot v}\\)</td>\n</tr>\n<tr>\n<td>激活内存</td>\n<td>\\(O(m)\\)</td>\n<td>\\(O(p)\\)</td>\n<td>\\(O(p)\\)</td>\n</tr>\n<tr>\n<td>通信量</td>\n<td>基准</td>\n<td>基准</td>\n<td>\\(v\\) 倍</td>\n</tr>\n<tr>\n<td>微批次约束</td>\n<td>无</td>\n<td>无</td>\n<td>\\(m \\mod p = 0\\)</td>\n</tr>\n<tr>\n<td>每设备层数</td>\n<td>连续 \\(\\frac{L}{p}\\) 层</td>\n<td>连续 \\(\\frac{L}{p}\\) 层</td>\n<td>\\(v\\) 个非连续块，每块 \\(\\frac{L}{vp}\\) 层</td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>实际部署策略（PTD-P）</strong></p>\n<p>论文提出 PTD-P（Pipeline, Tensor, Data Parallelism）组合策略：\n- <strong>Tensor 并行</strong>（\\(t\\)）：节点内，利用 NVLink 高带宽（600 GB/s on A100）\n- <strong>Pipeline 并行</strong>（\\(p\\)）：跨节点，使用 Interleaved 1F1B，通信量相对较小\n- <strong>Data 并行</strong>（\\(d\\)）：跨节点，梯度 all-reduce 可与计算重叠</p>\n<p>总 GPU 数 \\(n = p \\times t \\times d\\)。实验表明在 3072 块 A100 GPU 上训练 1T 参数模型可达 52% 峰值 FLOPS 利用率。</p>",
      "quiz": {
        "q": "在 Interleaved 1F1B 中，若流水线并行度 p=8，每设备持有 v=2 个 model chunks，微批次数 m=16，则流水线气泡占比约为多少？",
        "options": [
          "43.75%",
          "21.88%",
          "10.94%",
          "3.13%"
        ],
        "answer": 1,
        "explain": "气泡比例 = (p-1)/(m·v) = (8-1)/(16×2) = 7/32 ≈ 21.88%。选项 A 是未使用 interleaved 时的结果 (p-1)/m = 7/16；选项 C 和 D 分别对应 v=4 和 v=16 的情况。"
      }
    },
    {
      "id": "zero_bubble",
      "num": 18,
      "name": "Zero Bubble PP",
      "fullName": "零气泡流水线 (Zero Bubble Pipeline)",
      "year": "2024",
      "org": "Huawei/PKU",
      "parent": "interleaved_pp",
      "paperUrl": "https://arxiv.org/abs/2401.10241",
      "projectUrl": "",
      "category": "pp",
      "motivation": "任务拆分填补气泡实现理论零空闲",
      "summary": "Zero Bubble PP 将反向传播拆分为输入梯度计算(B)和参数梯度计算(W)两个阶段，利用 W 对后续微批次无数据依赖的特性将其灵活调度以填充流水线气泡，并设计自动调度算法（启发式+ILP）在给定内存约束下搜索最优调度方案，在 GPT-3 类模型上实现了相比 1F1B 高达 23%（同等内存）和 31%（2倍内存）的吞吐提升。",
      "keyPoints": [
        "<strong>核心洞察</strong>：反向传播可拆分为 B（计算输入梯度，有跨阶段依赖）和 W（计算参数梯度，无跨阶段依赖），W 可自由调度填充气泡",
        "<strong>ZB-H1 手工调度</strong>：与 1F1B 相同峰值内存（\\(p \\cdot M_B\\)），气泡从 \\((p-1)T_F\\) 降至 \\((p-1)(T_F - T_W)/3\\)",
        "<strong>ZB-H2 手工调度</strong>：峰值内存 \\((2p-1)M_B\\)，理论零气泡（当 \\(T_F = T_B = T_W\\)）",
        "<strong>ZB-V 调度</strong>：V 形模型分块策略，在 1F1B 同等内存下实现接近零气泡",
        "<strong>自动调度算法</strong>：启发式 + ILP 联合优化，输入 \\(T_F, T_B, T_W, T_{\\text{comm}}\\) 和内存限制，自动搜索最优调度",
        "<strong>Optimizer 同步绕过</strong>：用 post-validation 策略替代传统 all-reduce 同步（梯度裁剪/NaN检查），保持零气泡可行性",
        "<strong>实验验证</strong>：1.5B-28.3B 模型，ZB-1p（同内存）提升 9%-23%，ZB-2p（2倍内存）提升 15%-31%，气泡率降至 &lt;1%"
      ],
      "detail": "<h5>核心示意图</h5>\n<p><img alt=\"Zero Bubble Pipeline Schedules\" src=\"https://ar5iv.labs.arxiv.org/html/2401.10241/assets/x3.png\" />\n<em>图：上方为 ZB-H1 调度（同 1F1B 内存，气泡减至 1/3），下方为 ZB-H2 调度（零气泡，内存翻倍）。绿色=Forward(F)，蓝色=Backward-input(B)，红色=Backward-weight(W)。</em></p>\n<p><img alt=\"1F1B Baseline\" src=\"https://ar5iv.labs.arxiv.org/html/2401.10241/assets/x2.png\" />\n<em>图：传统 1F1B 调度基线，存在 \\((p-1)\\) 个 forward 时间的气泡。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># Zero Bubble 启发式调度算法核心逻辑\ndef zero_bubble_schedule(p, m, T_F, T_B, T_W, T_comm, M_limit):\n    &quot;&quot;&quot;\n    p: pipeline stages, m: microbatches\n    T_F/T_B/T_W: forward/backward-input/backward-weight time\n    T_comm: communication time, M_limit: activation memory limit\n    &quot;&quot;&quot;\n    # Phase 1: Warm-up - 在内存限制内尽可能多调度 F\n    for stage_i in range(p):\n        schedule_F_passes_until(memory_limit_or_first_B_ready)\n\n    # Phase 2: Steady state - 1F-1B 交替，W 填充气泡\n    while F_and_B_remaining:\n        schedule_one_F()\n        schedule_one_B()\n        if bubble_gap &gt;= T_W:\n            schedule_one_W()  # 用 W 填充气泡\n        if memory_limit_hit:\n            schedule_W_to_free_memory()\n\n    # Phase 3: Cool-down - 调度剩余 W\n    schedule_all_remaining_W()\n\n    # 可选：用 ILP 进一步优化\n    return optimize_with_ILP(initial_schedule)\n</code></pre>\n<h5>方法详解</h5>\n<p><strong>1. 动机与背景</strong></p>\n<p>流水线并行（Pipeline Parallelism）是大模型训练的关键并行策略之一。传统的 1F1B（One Forward One Backward）调度中，每个流水线阶段在稳态时交替执行一个 forward 和一个 backward，但在 warm-up 和 cool-down 阶段存在不可避免的\"气泡\"（idle time）。对于 \\(p\\) 个流水线阶段和 \\(m\\) 个微批次，1F1B 的气泡比例为：</p>\n<p>$$\\text{Bubble ratio} = \\frac{(p-1) \\cdot T_F}{m \\cdot (T_F + T_B + T_W)}$$</p>\n<p>当 \\(m\\) 不够大时（如 \\(m = 3p\\)），气泡率可达 20%-30%，严重影响训练效率。</p>\n<p><strong>2. 核心机制：B-W 拆分</strong></p>\n<p>论文的关键洞察在于反向传播的计算可以被拆分为两个独立的部分：</p>\n<ul>\n<li><strong>B（Backward-Input）</strong>：计算输入的梯度 \\(\\frac{\\partial L}{\\partial x}\\)，用于传递给上一层（跨阶段依赖）</li>\n<li><strong>W（Backward-Weight）</strong>：计算参数的梯度 \\(\\frac{\\partial L}{\\partial W}\\)，仅用于本地参数更新（无跨阶段依赖）</li>\n</ul>\n<div class=\"key-point\">💡 <strong>关键洞察</strong>：W 的执行时机不影响其他阶段的计算，因此可以被延迟调度到任何气泡位置，只要在 optimizer step 之前完成即可。</div>\n<p>对于 Transformer 中的 MLP 层 \\(Y = \\text{GeLU}(XA) \\cdot B\\)：\n- Forward: 计算并保存激活值\n- B: 利用保存的激活值计算 \\(\\frac{\\partial L}{\\partial X}\\)（需要传给上一层）\n- W: 利用保存的激活值计算 \\(\\frac{\\partial L}{\\partial A}\\) 和 \\(\\frac{\\partial L}{\\partial B}\\)（仅本地使用）</p>\n<p><strong>3. 手工调度方案</strong></p>\n<p><strong>ZB-H1</strong>（同内存方案）：\n- 峰值激活内存：\\(p \\cdot M_B\\)（与 1F1B 相同）\n- 稳态模式：1F-1B-1W\n- 气泡大小：\\(\\frac{(p-1)(T_B + T_W - T_F)}{3}\\)（当 \\(T_F \\approx T_B \\approx T_W\\) 时接近零）</p>\n<p><strong>ZB-H2</strong>（零气泡方案）：\n- 峰值激活内存：\\((2p-1) \\cdot M_B\\)\n- 稳态模式：先 warm-up 更多 F，再 1F-1B 交替，W 全部延迟到末尾\n- 当 \\(T_F = T_B = T_W\\) 时理论零气泡</p>\n<p><strong>4. 自动调度算法</strong></p>\n<p>手工调度假设 \\(T_F = T_B = T_W\\) 且忽略通信时间，实际中这些假设不成立。自动调度算法解决：</p>\n<ul>\n<li><strong>启发式算法</strong>：贪心策略，warm-up 阶段尽量多 F，稳态 1F-1B-1W，用 W 填充所有可用气泡</li>\n<li><strong>ILP 精确求解</strong>：将调度问题建模为整数线性规划，用求解器找全局最优</li>\n<li><strong>组合策略</strong>：启发式解作为 ILP 初始解，进一步优化</li>\n</ul>\n<p><strong>5. Optimizer 同步绕过</strong></p>\n<p>传统 PP 在 optimizer step 需要跨阶段 all-reduce（梯度裁剪的全局范数、混合精度的 NaN/INF 检查），这会破坏流水线的平行四边形结构。论文提出 <strong>post-validation</strong> 策略：</p>\n<p>$$\\text{Strategy: } \\begin{cases} \\text{先用本地梯度范数裁剪并更新参数} \\\\ \\text{下一轮 forward 前验证上一轮的全局范数} \\\\ \\text{若不一致则回滚并重新计算} \\end{cases}$$</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：实验表明回滚概率极低（&lt;1/1000 iterations），对收敛无影响，且 loss 曲线与标准 1F1B bit-to-bit 一致。</div>\n<p><strong>6. ZB-V：内存高效的零气泡调度</strong></p>\n<p><img alt=\"ZB-2p Schedule Visualization\" src=\"https://ar5iv.labs.arxiv.org/html/2401.10241/assets/x6.png\" />\n<em>图：ZB-2p 自动搜索的调度方案（上）与实际 profiling 执行（下），几乎无气泡。</em></p>\n<p>ZB-2p 虽然气泡率 &lt;1%，但内存翻倍。ZB-V 通过 V 形模型分块解决此问题：\n- 将模型分为 \\(2p\\) 个 chunk，每个 worker 分配 2 个 chunk（一前一后）\n- 例如 4 阶段 16 层：Worker 1 负责 Layer 1-2 和 Layer 15-16\n- 前向和反向都从同一 worker 发起，无需等待最后一个 worker\n- 峰值内存 \\(p \\cdot M_B\\)（与 1F1B 相同），但气泡率接近 ZB-H2</p>\n<p><strong>7. 与传统方法的对比</strong></p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>气泡率 (p=8, m=24)</th>\n<th>峰值内存</th>\n<th>通信开销</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>1F1B</td>\n<td>24.3%</td>\n<td>\\(p \\cdot M_B\\)</td>\n<td>基线</td>\n</tr>\n<tr>\n<td>1F1B-I (Interleaved)</td>\n<td>10.6%</td>\n<td>更高</td>\n<td>\\(p\\times\\) 通信</td>\n</tr>\n<tr>\n<td>ZB-H1 / ZB-1p</td>\n<td>15.9%</td>\n<td>\\(p \\cdot M_B\\)</td>\n<td>基线</td>\n</tr>\n<tr>\n<td>ZB-H2</td>\n<td>10.8%</td>\n<td>\\((2p-1) \\cdot M_B\\)</td>\n<td>基线</td>\n</tr>\n<tr>\n<td>ZB-2p</td>\n<td><strong>0.4%</strong></td>\n<td>\\(2p \\cdot M_B\\)</td>\n<td>基线</td>\n</tr>\n<tr>\n<td>ZB-V</td>\n<td>~7%</td>\n<td>\\(p \\cdot M_B\\)</td>\n<td>2× 通信</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 <strong>核心优势</strong>：ZB 系列方法不增加通信量（不像 Interleaved 1F1B 需要更多跨节点通信），在多节点场景优势更明显。</div>\n<h5>实验结果</h5>\n<p>在 1.5B-28.3B GPT-3 类模型上（8-32 NVIDIA A100 80G GPUs）：\n- <strong>ZB-2p</strong> vs 1F1B：吞吐提升 15%-31%，内存增加约 2x\n- <strong>ZB-1p</strong> vs 1F1B：吞吐提升 9%-23%，内存基本相同\n- <strong>ZB-1p</strong> vs 1F1B-I：多节点场景下 ZB-1p 明显优于 1F1B-I（无额外通信开销）\n- <strong>ZB-V</strong> vs 1F1B：同等内存下吞吐提升 15%-25%\n- 正确性验证：固定随机种子，ZB-1p/ZB-2p 与 1F1B 的 loss 逐 iteration <strong>bit-to-bit 一致</strong></p>",
      "quiz": {
        "q": "Zero Bubble PP 将反向传播拆分为 B 和 W 两部分，W 可以被灵活调度的根本原因是什么？",
        "options": [
          "W 的计算量比 B 小，可以忽略不计",
          "W 只计算参数梯度，不产生需要传递给其他流水线阶段的数据依赖",
          "W 可以与 Forward 计算完全重叠执行",
          "W 不需要使用保存的激活值，因此可以在任意时刻执行"
        ],
        "answer": 1,
        "explain": "W 计算的是参数梯度 ∂L/∂W，仅用于本地 optimizer 更新，不需要传递给上游阶段，因此没有跨阶段数据依赖，可以延迟到任何空闲时段执行。"
      }
    },
    {
      "id": "mist",
      "num": 19,
      "name": "Mist",
      "fullName": "内存并行协同优化 (Mist)",
      "year": "2025",
      "org": "UCSD/Meta",
      "parent": "zero_bubble",
      "paperUrl": "https://dl.acm.org/doi/abs/10.1145/3689031.3717461",
      "projectUrl": "",
      "category": "pp",
      "motivation": "内存-并行协同优化动态解耦优化过程",
      "summary": "Mist 的核心目标是：内存-并行协同优化动态解耦优化过程。",
      "keyPoints": [
        "核心动机：内存-并行协同优化动态解耦优化过程",
        "演化来源：继承或改进自 zero_bubble",
        "代表机构：UCSD/Meta"
      ],
      "detail": "<p>内存-并行协同优化动态解耦优化过程</p>"
    },
    {
      "id": "dgc",
      "num": 20,
      "name": "Deep Gradient Compression",
      "fullName": "深度梯度压缩 (Deep Gradient Compression)",
      "year": "2018",
      "org": "Tsinghua/MIT",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/1712.01887",
      "projectUrl": "",
      "category": "comm",
      "motivation": "动量校正+局部梯度裁剪99.9%压缩率",
      "summary": "Deep Gradient Compression 的核心目标是：动量校正+局部梯度裁剪99.9%压缩率。",
      "keyPoints": [
        "核心动机：动量校正+局部梯度裁剪99.9%压缩率",
        "代表机构：Tsinghua/MIT"
      ],
      "detail": "<p>动量校正+局部梯度裁剪99.9%压缩率</p>"
    },
    {
      "id": "gradient_sparsification",
      "num": 21,
      "name": "Gradient Sparsification",
      "fullName": "梯度稀疏化 (Gradient Sparsification)",
      "year": "2018",
      "org": "CMU",
      "parent": "dgc",
      "paperUrl": "https://arxiv.org/abs/1806.00429",
      "projectUrl": "",
      "category": "comm",
      "motivation": "理论证明TopK稀疏的收敛性",
      "summary": "提出一种基于随机坐标丢弃与放大的梯度稀疏化方法，将最优稀疏化概率的选取形式化为凸优化问题，理论证明最优策略是按梯度分量绝对值成比例采样（\\(\\pi_i = \\min(\\lambda|g_i|, 1)\\)），在保持无偏性的同时最小化通信编码长度。",
      "keyPoints": [
        "<strong>无偏稀疏化机制</strong>：以概率 \\(\\pi_i\\) 保留梯度第 \\(i\\) 个坐标，保留后放大 \\(1/\\pi_i\\) 倍，确保稀疏化梯度的期望等于原始梯度",
        "<strong>凸优化建模</strong>：将最优采样概率的选取形式化为在方差预算约束下最小化期望稀疏度的凸优化问题",
        "<strong>最优解闭式形式</strong>：最优概率 \\(\\pi_i^* = \\min(\\lambda |g_i|, 1)\\)，即按梯度绝对值成比例采样，大分量必保留、小分量按比例随机丢弃",
        "<strong>(\\(\\rho\\), s)-近似稀疏性</strong>：提出近似稀疏性概念，证明期望稀疏度 ≤ \\((1+\\rho)s\\)，方差增加因子仅为 \\((1+\\rho)\\)",
        "<strong>编码长度理论界</strong>：证明通信比特数上界为 \\(s(b + \\log_2 d) + \\min(\\rho s \\cdot \\log_2 d,\\; d) + b\\)",
        "<strong>高效近似算法</strong>：提出 Algorithm 2（闭式精确解）和 Algorithm 3（贪心迭代近似），计算复杂度为 \\(O(d \\log d)\\)",
        "<strong>实验验证</strong>：在凸问题（逻辑回归 + SVRG）和非凸问题（CNN/CIFAR-10）上均验证有效性，稀疏率可达 0.4% 仍收敛"
      ],
      "detail": "<p><img alt=\"Gradient Sparsification 概念示意\" src=\"https://arxiv.org/abs/1710.09854\" />\n<em>图（参见论文 Figure 1-2）：梯度稀疏化的核心思想。左：均匀采样对所有坐标一视同仁；右：最优稀疏化按 \\(|g_i|\\) 成比例采样，大分量必保留、小分量随机丢弃。在相同稀疏度下，最优方案的方差显著低于均匀采样。</em></p>\n<pre><code class=\"language-python\"># Algorithm 1: 同步分布式 SGD + 梯度稀疏化\ndef distributed_sgd_with_sparsification(workers, T, rho):\n    w = initialize_parameters()\n    for t in range(T):\n        sparse_grads = []\n        for worker in workers:\n            g = worker.compute_stochastic_gradient(w)\n            # 最优稀疏化: pi_i = min(lambda * |g_i|, 1)\n            pi = compute_optimal_probability(g, rho)\n            # 随机采样坐标\n            mask = bernoulli_sample(pi)  # mask[i] ~ Bernoulli(pi[i])\n            g_sparse = mask * g / pi     # 放大保持无偏: E[g_sparse] = g\n            sparse_grads.append(g_sparse)\n        # Server 聚合 (仅传输非零坐标)\n        w = w - lr * average(sparse_grads)\n    return w\n\n# Algorithm 2: 最优概率的闭式求解\ndef compute_optimal_probability(g, rho):\n    &quot;&quot;&quot;找到最小的 k 使得 sum_{i&gt;k} |g_i| / (d - k) 满足约束&quot;&quot;&quot;\n    d = len(g)\n    abs_g = sorted(abs(g), reverse=True)  # 降序排列\n    # 找最小 k: |g_{k+1}| &lt;= (1/lambda) = sum_{i&gt;k}|g_i| / (d-k)\n    for k in range(d):\n        threshold = sum(abs_g[k+1:]) / (d - k)  # 即 1/lambda\n        if abs_g[k] &lt;= threshold or k == d - 1:\n            break\n    # pi_i = min(lambda * |g_i|, 1)\n    lam = 1.0 / threshold if threshold &gt; 0 else float('inf')\n    pi = [min(lam * abs(g[i]), 1.0) for i in range(d)]\n    return pi\n</code></pre>\n<p><strong>动机与背景</strong></p>\n<p>在大规模分布式深度学习中，多个 Worker 需要频繁同步梯度信息，通信开销往往成为训练的主要瓶颈。尤其当模型参数维度 \\(d\\) 极高（如数亿参数）时，每轮迭代传输完整的 \\(d\\) 维梯度向量代价巨大。现有方法如梯度量化（QSGD）通过降低每个坐标的比特数来压缩通信，但未减少传输的坐标数量。本文从另一个正交角度出发——<strong>减少传输的坐标数量本身</strong>，即梯度稀疏化。核心挑战在于：如何在大幅减少传输坐标数的同时，保证稀疏化梯度仍是原始梯度的无偏估计，且方差增加可控？</p>\n<p><strong>核心机制：无偏随机稀疏化</strong></p>\n<p>本文提出的稀疏化算子 \\(Q(g)\\) 对梯度向量 \\(g \\in \\mathbb{R}^d\\) 的每个坐标 \\(i\\) 独立操作：以概率 \\(\\pi_i\\) 保留该坐标，保留时将其值放大为 \\(g_i / \\pi_i\\)；以概率 \\(1 - \\pi_i\\) 将其置零。形式化地：</p>\n<p>$$Q(g)_i = \\begin{cases} g_i / \\pi_i & \\text{以概率 } \\pi_i \\\\ 0 & \\text{以概率 } 1 - \\pi_i \\end{cases}$$</p>\n<p>容易验证 \\(\\mathbb{E}[Q(g)_i] = \\pi_i \\cdot g_i/\\pi_i + (1-\\pi_i) \\cdot 0 = g_i\\)，即无偏性成立。稀疏化引入的额外方差为：</p>\n<p>$$\\text{Var}(Q(g)_i) = \\frac{1-\\pi_i}{\\pi_i} g_i^2$$</p>\n<p>总方差为 \\(\\sum_{i=1}^d \\frac{1-\\pi_i}{\\pi_i} g_i^2\\)。显然，\\(\\pi_i\\) 越大方差越小但稀疏度越低，需要在两者间取得最优平衡。</p>\n<p><strong>最优概率的凸优化求解</strong></p>\n<p>作者将最优稀疏化形式化为如下凸优化问题：在给定方差预算 \\(V\\) 的约束下，最小化期望编码长度（即期望非零坐标数）：</p>\n<p>$$\\min_{\\pi \\in [0,1]^d} \\sum_{i=1}^d \\pi_i \\quad \\text{s.t.} \\quad \\sum_{i=1}^d \\frac{1-\\pi_i}{\\pi_i} g_i^2 \\leq V$$</p>\n<p>通过 KKT 条件求解，最优解具有优美的闭式形式：</p>\n<p>$$\\pi_i^* = \\min(\\lambda |g_i|, 1)$$</p>\n<p>其中 \\(\\lambda\\) 是拉格朗日乘子，由约束条件确定。这一结果的直觉非常清晰：<strong>梯度绝对值大的坐标更重要，应以更高概率保留</strong>；当 \\(\\lambda|g_i| \\geq 1\\) 时该坐标必定保留（\\(\\pi_i = 1\\)）。这与简单的均匀随机采样（\\(\\pi_i = k/d\\)）形成鲜明对比——均匀采样对所有坐标一视同仁，忽略了梯度分量的异质性，导致在相同稀疏度下方差更大。</p>\n<div class=\"key-point\">💡 关键直觉：最优稀疏化本质上是一种\"重要性采样\"——按梯度绝对值分配保留概率，使得信息损失最小化。</div>\n<p><strong>(\\(\\rho\\), s)-近似稀疏性与理论保证</strong></p>\n<p>为了分析算法的通信效率，作者引入了 (\\(\\rho\\), s)-近似稀疏性的概念：如果梯度向量 \\(g\\) 最多有 \\(s\\) 个坐标的绝对值超过 \\(\\|g\\|_1 / d\\)（即超过均值），则称 \\(g\\) 是 \\(s\\)-稀疏的。对于 (\\(\\rho\\), s)-近似稀疏的梯度，Algorithm 3 的贪心解保证：</p>\n<ul>\n<li>期望稀疏度（非零坐标数）≤ \\((1+\\rho)s\\)</li>\n<li>方差增加因子 ≤ \\((1+\\rho)\\)（相比不稀疏化的原始 SGD）</li>\n</ul>\n<p>这意味着当梯度本身具有近似稀疏结构时（在深度学习中普遍成立），通信量可以从 \\(O(d)\\) 降低到 \\(O(s)\\)，而收敛速度仅减慢 \\((1+\\rho)\\) 倍。Theorem 4 进一步给出了编码长度的精确上界：</p>\n<p>$$\\text{Coding Length} \\leq s(b + \\log_2 d) + \\min(\\rho s \\cdot \\log_2 d,\\; d) + b$$</p>\n<p>其中 \\(b\\) 是每个非零值的量化比特数。当 \\(\\rho s \\ll d\\) 时，通信量远小于传输完整梯度所需的 \\(d \\cdot b\\) 比特。</p>\n<p><strong>实验验证与关键发现</strong></p>\n<p>在凸优化实验中（\\(\\ell_2\\) 正则化逻辑回归），作者比较了最优稀疏化（GSpar）与均匀采样（Uniform）在相同稀疏度下的表现。结果表明 GSpar 在所有稀疏率下均具有更低的方差和更快的收敛速度，且在 SVRG 方差缩减框架下同样有效。在非凸实验中（3层 CNN/CIFAR-10），即使稀疏率低至 \\(\\rho = 0.004\\)（仅保留 0.4% 的坐标），模型仍能正常收敛，通信量减少超过 250 倍。作者指出神经网络优化对梯度噪声具有天然鲁棒性，适度噪声甚至有助于逃离局部极小值。</p>",
      "quiz": {
        "q": "在 Gradient Sparsification 的最优解中，坐标 i 的保留概率 π_i* 与什么成正比？",
        "options": [
          "梯度坐标的平方 g_i²",
          "梯度坐标的绝对值 |g_i|",
          "梯度坐标的倒数 1/|g_i|",
          "所有坐标的均匀概率 1/d"
        ],
        "answer": 1,
        "explain": "通过 KKT 条件求解凸优化问题，最优保留概率为 π_i* = min(λ|g_i|, 1)，即与梯度绝对值成正比。绝对值越大的坐标越重要，保留概率越高。"
      }
    },
    {
      "id": "scalecom",
      "num": 22,
      "name": "ScaleCom",
      "fullName": "可扩展通信压缩 (ScaleCom)",
      "year": "2020",
      "org": "IBM",
      "parent": "gradient_sparsification",
      "paperUrl": "https://arxiv.org/abs/2004.13334",
      "projectUrl": "",
      "category": "comm",
      "motivation": "可扩展稀疏梯度压缩框架",
      "summary": "ScaleCom提出CLT-k压缩器（循环本地Top-k）和低通滤波器，解决了梯度稀疏压缩在大规模分布式训练中的两大瓶颈——通信量随worker数线性增长（O(n)→O(1)）和大batch下精度退化——实现65-400倍压缩且兼容all-reduce。",
      "keyPoints": [
        "核心动机：可扩展稀疏梯度压缩框架",
        "演化来源：继承或改进自 gradient_sparsification",
        "代表机构：IBM"
      ],
      "detail": "<h5>问题背景：梯度压缩的可扩展性困境</h5>\n<p><img alt=\"ScaleCom Overview\" src=\"https://ar5iv.labs.arxiv.org/html/2104.11125/assets/intro.png\" /></p>\n<p><strong>现有方法的两大问题：</strong></p>\n<ol>\n<li>\n<p><strong>Gradient Build-up（梯度堆积）</strong>：Top-k压缩后每个worker发送k个非零梯度，但索引不同。在gather操作中，合并后的梯度向量非零元素数为O(nk)而非k，导致通信量随worker数n线性增长，无法使用高效的all-reduce。</p>\n</li>\n<li>\n<p><strong>大Batch精度退化</strong>：分布式训练扩大batch size时需线性缩放学习率（linear scaling rule）。大学习率放大了梯度噪声，而error-feedback机制中的本地memory累积了这些噪声，导致worker间memory发散，压缩质量下降。</p>\n</li>\n</ol>\n<h5>核心方法：CLT-k + 低通滤波器</h5>\n<p><strong>算法伪代码（Algorithm 1 - ScaleCom）：</strong></p>\n<pre><code>Input: 学习率η, 压缩率k/d, 低通滤波系数β, worker数n\nInitialize: x⁰ (模型参数), m⁰ᵢ=0 (本地memory)\n\nFor t = 0, 1, 2, ..., T-1:\n  For each worker i in parallel:\n    1. 计算梯度: ∇fᵢ(xᵗ; ξᵗᵢ)\n    2. 累积到memory: pᵗᵢ = mᵗᵢ + ∇fᵢ(xᵗ; ξᵗᵢ)\n\n    3. [CLT-k] 确定leader: leader = t mod n\n       If i == leader:\n         对pᵗᵢ排序，选top-k索引集Iᵗ\n         广播Iᵗ给所有worker\n\n    4. 压缩: gᵗᵢ = Compress(pᵗᵢ, Iᵗ)  // 只保留Iᵗ位置的值\n\n    5. [低通滤波] 更新memory:\n       mᵗ⁺¹ᵢ = (1-β)·mᵗᵢ + β·(pᵗᵢ - gᵗᵢ)\n       // β=1时退化为标准error-feedback\n       // β∈(0.1, 0.3)时有效抑制噪声\n\n    6. All-Reduce: gᵗ = (1/n)·Σᵢ gᵗᵢ  // 索引相同，可直接all-reduce!\n\n    7. 更新参数: xᵗ⁺¹ = xᵗ - η·gᵗ\n</code></pre>\n<p><strong>CLT-k的关键性质——交换律（Commutativity）：</strong></p>\n<p>$$\\text{Compress}\\left(\\frac{1}{n}\\sum_i p_i\\right) = \\frac{1}{n}\\sum_i \\text{Compress}(p_i)$$</p>\n<p>因为所有worker使用相同索引集Iᵗ，压缩操作等价于对固定位置的mask，与求和顺序无关。这使得：\n- 可以先各自压缩再all-reduce（而非先gather再压缩）\n- 通信量恒为k个浮点数，与worker数n无关 → <strong>O(1)复杂度</strong></p>\n<p><strong>低通滤波器的直觉：</strong></p>\n<p>标准error-feedback: <code>m^{t+1} = p^t - g^t</code>（残差全部保留）</p>\n<p>ScaleCom: <code>m^{t+1} = (1-β)·m^t + β·(p^t - g^t)</code>（残差指数衰减）</p>\n<p>当学习率大时，梯度噪声大 → 残差中噪声累积 → worker间memory发散 → CLT-k选出的索引对非leader worker不再最优。低通滤波器通过衰减历史残差，保持worker间memory的相似性。</p>\n<h5>理论保证</h5>\n<p><strong>定理1（收敛率）：</strong> 在标准假设下（L-smooth, σ-bounded variance, ρ-contraction），ScaleCom以O(1/√(nT))速率收敛，与SGD相同，且保持n个worker的线性加速比。</p>\n<p><strong>Hamming距离分析：</strong> 论文证明CLT-k的contraction property——leader的top-k索引与全局最优top-k索引的Hamming距离有界，保证压缩质量。</p>\n<h5>实验结果</h5>\n<p><strong>标准Batch Size（Table 2）：</strong></p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>模型 (数据集)</th>\n<th>#GPU</th>\n<th>Batch</th>\n<th>压缩率</th>\n<th>Baseline</th>\n<th>ScaleCom</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>ResNet34 (CIFAR10)</td>\n<td>4</td>\n<td>128</td>\n<td>92X</td>\n<td>93.78</td>\n<td>93.98</td>\n</tr>\n<tr>\n<td>ResNet18 (ImageNet)</td>\n<td>8</td>\n<td>256</td>\n<td>112X</td>\n<td>70.48</td>\n<td>70.17</td>\n</tr>\n<tr>\n<td>ResNet50 (ImageNet)</td>\n<td>8</td>\n<td>256</td>\n<td>96X</td>\n<td>76.44</td>\n<td>75.99</td>\n</tr>\n<tr>\n<td>MobileNetV2 (ImageNet)</td>\n<td>8</td>\n<td>256</td>\n<td>155X</td>\n<td>71.64</td>\n<td>71.52</td>\n</tr>\n<tr>\n<td>Transformer (WMT14) [BLEU]</td>\n<td>8</td>\n<td>36K</td>\n<td>47-65X</td>\n<td>27.64</td>\n<td>27.27</td>\n</tr>\n<tr>\n<td>LSTM (SWB300) [WER↓]</td>\n<td>4</td>\n<td>128</td>\n<td>400X</td>\n<td>10.4</td>\n<td>10.1</td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>大Batch Size（Table 3，验证可扩展性）：</strong></p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>模型 (数据集)</th>\n<th>#GPU</th>\n<th>Batch</th>\n<th>压缩率</th>\n<th>Baseline</th>\n<th>ScaleCom</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>ResNet18 (ImageNet)</td>\n<td>64</td>\n<td>2048</td>\n<td>112X</td>\n<td>70.29</td>\n<td>69.88</td>\n</tr>\n<tr>\n<td>ResNet50 (ImageNet)</td>\n<td>64</td>\n<td>2048</td>\n<td>96X</td>\n<td>76.47</td>\n<td>75.90</td>\n</tr>\n<tr>\n<td>MobileNetV2 (ImageNet)</td>\n<td>64</td>\n<td>2048</td>\n<td>155X</td>\n<td>71.49</td>\n<td>71.01</td>\n</tr>\n<tr>\n<td>Transformer (WMT14) [BLEU]</td>\n<td>64</td>\n<td>288K</td>\n<td>47-115X</td>\n<td>27.79</td>\n<td>28.03</td>\n</tr>\n<tr>\n<td>LSTM (SWB300) [WER↓]</td>\n<td>12</td>\n<td>1536</td>\n<td>100X</td>\n<td>9.9</td>\n<td>10.0</td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>系统性能（Figure 6）：</strong>\n- 100 TFLOPs/worker: 2X-1.23X端到端加速\n- 300 TFLOPs/worker: 4.1X-1.75X端到端加速\n- 128 workers时通信占比&lt;3%（baseline为56%）\n- 关键特性：性能增益随worker数增加保持恒定（vs. prior top-k线性退化）</p>\n<p><strong>与现有方法对比：</strong></p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>All-Reduce兼容</th>\n<th>O(1)通信</th>\n<th>大Batch支持</th>\n<th>收敛保证</th>\n<th>广泛验证</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>TopK/Random-k</td>\n<td>✗</td>\n<td>✗</td>\n<td>✗</td>\n<td>✓</td>\n<td>✗</td>\n</tr>\n<tr>\n<td>DGC</td>\n<td>✗</td>\n<td>✗</td>\n<td>部分</td>\n<td>✗</td>\n<td>部分</td>\n</tr>\n<tr>\n<td>gTop-k</td>\n<td>✓</td>\n<td>✗(需额外all-reduce)</td>\n<td>✗</td>\n<td>✗</td>\n<td>✗</td>\n</tr>\n<tr>\n<td>PowerSGD</td>\n<td>✓</td>\n<td>✓</td>\n<td>✗</td>\n<td>✓</td>\n<td>✗</td>\n</tr>\n<tr>\n<td><strong>ScaleCom</strong></td>\n<td><strong>✓</strong></td>\n<td><strong>✓</strong></td>\n<td><strong>✓</strong></td>\n<td><strong>✓</strong></td>\n<td><strong>✓</strong></td>\n</tr>\n</tbody>\n</table></div>",
      "quiz": {
        "q": "",
        "options": [],
        "answer": 0,
        "explain": ""
      }
    },
    {
      "id": "8bit_optimizer",
      "num": 23,
      "name": "8-bit Optimizers",
      "fullName": "8比特优化器 (8-bit Optimizers)",
      "year": "2021",
      "org": "Univ. of Washington",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2110.02861",
      "projectUrl": "",
      "category": "comm",
      "motivation": "块量化Adam/AdaGrad减少75%状态内存",
      "summary": "8-bit Optimizers 的核心目标是：块量化Adam/AdaGrad减少75%状态内存。",
      "keyPoints": [
        "核心动机：块量化Adam/AdaGrad减少75%状态内存",
        "代表机构：Univ. of Washington"
      ],
      "detail": "<p>块量化Adam/AdaGrad减少75%状态内存</p>"
    },
    {
      "id": "coconet",
      "num": 24,
      "name": "CoCoNet",
      "fullName": "计算通信协同网络 (CoCoNet)",
      "year": "2022",
      "org": "Microsoft",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2211.02510",
      "projectUrl": "",
      "category": "comm",
      "motivation": "打破计算通信抽象屏障算子融合",
      "summary": "CoCoNet 的核心目标是：打破计算通信抽象屏障算子融合。",
      "keyPoints": [
        "核心动机：打破计算通信抽象屏障算子融合",
        "代表机构：Microsoft"
      ],
      "detail": "<p>打破计算通信抽象屏障算子融合</p>"
    },
    {
      "id": "zero_pp",
      "num": 25,
      "name": "ZeRO++",
      "fullName": "ZeRO增强版 (ZeRO++)",
      "year": "2024",
      "org": "Microsoft",
      "parent": "zero",
      "paperUrl": "https://arxiv.org/abs/2306.10209",
      "projectUrl": "",
      "category": "comm",
      "motivation": "量化权重通信+层次化分区4x通信效率",
      "summary": "ZeRO 通过将优化器状态、梯度和参数在数据并行进程间进行分区（而非复制），分三阶段逐步消除内存冗余，在保持数据并行通信效率的同时实现了模型并行级别的内存效率，使得仅用数据并行即可训练万亿参数模型。",
      "keyPoints": [
        "<strong>内存分析</strong>：混合精度 Adam 训练中每参数占用 \\(16\\Psi\\) 字节（2Ψ fp16 参数 + 2Ψ fp16 梯度 + 12Ψ 优化器状态含 fp32 参数/动量/方差副本）",
        "<strong>ZeRO-DP 三阶段</strong>：Stage 1 切分优化器状态（\\(P_{os}\\)）→ 4x 省存；Stage 2 加切分梯度（\\(P_{os+g}\\)）→ 8x 省存；Stage 3 加切分参数（\\(P_{os+g+p}\\)）→ \\(N_d\\)x 省存",
        "<strong>通信量不变/极低开销</strong>：Stage 1+2 通信量与标准 DP 相同（\\(2\\Psi\\)）；Stage 3 仅增加 50%（\\(3\\Psi\\)）",
        "<strong>ZeRO-R 残余内存优化</strong>：激活分区（\\(P_a\\)）按 MP 度切分激活检查点；常量大小临时缓冲区；内存碎片整理",
        "<strong>ZeRO-100B 实现</strong>：Stage 1+2 + ZeRO-R，400 GPU 上高效训练 100B 参数模型，达 15 PFlops（38 TFlops/GPU）",
        "<strong>线性扩展</strong>：模型状态内存随 DP 度线性下降，理论上 1024 GPU 可支持万亿参数"
      ],
      "detail": "<h5>核心示意图</h5>\n<p><img alt=\"ZeRO-DP 内存节省示意\" src=\"https://ar5iv.labs.arxiv.org/html/1910.02054/assets/x1.png\" />\n<em>图：ZeRO-DP 三阶段优化对 7.5B 参数模型内存占用的影响。基线 DP 需要 120GB，Stage 1 降至 31.4GB，Stage 1+2 降至 16.6GB，Stage 1+2+3 降至 1.9GB（Nd=64）。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># ZeRO-DP Stage 1+2 训练流程伪代码\n# 假设 Nd 个数据并行进程，每个进程负责 1/Nd 的参数分区\n\ndef zero_dp_train_step(model, data, rank, world_size):\n    # 每个进程持有完整 fp16 参数（Stage 1+2）\n    # 但只持有 1/Nd 的优化器状态和梯度\n\n    # Forward pass（所有进程用完整参数）\n    loss = model.forward(data)\n\n    # Backward pass\n    loss.backward()  # 计算本地梯度\n\n    # Stage 2: Reduce-Scatter 梯度\n    # 每个进程只保留自己负责分区的归约梯度\n    for partition_id in range(world_size):\n        if partition_id == rank:\n            # 归约收集本分区梯度（reduce 到本进程）\n            reduce(gradients[partition_id], dst=rank)\n        else:\n            # 发送梯度给负责的进程后释放内存\n            reduce(gradients[partition_id], dst=partition_id)\n            free(gradients[partition_id])\n\n    # 只更新本进程负责的 1/Nd 参数分区\n    optimizer.step(params[rank], grads[rank])  # 用本地优化器状态\n\n    # All-Gather 更新后的参数\n    all_gather(params)  # 收集所有分区的更新参数\n</code></pre>\n<pre><code class=\"language-python\"># ZeRO-DP Stage 3 训练流程伪代码（额外切分参数）\ndef zero_dp_stage3_train_step(model, data, rank, world_size):\n    # 每个进程只持有 1/Nd 的参数、梯度和优化器状态\n\n    # Forward pass: 流水线式 All-Gather 参数\n    for layer in model.layers:\n        # 收集该层完整参数（从负责的进程广播）\n        full_params = all_gather(layer.params)\n        output = layer.forward(input, full_params)\n        del full_params  # 用完即弃，不保留\n        input = output\n\n    # Backward pass: 反向再次 All-Gather\n    for layer in reversed(model.layers):\n        full_params = all_gather(layer.params)\n        grad = layer.backward(full_params)\n        del full_params\n        # Reduce-Scatter 梯度到负责进程\n        reduce_scatter(grad)\n\n    # 更新本地 1/Nd 分区\n    optimizer.step(local_params, local_grads)\n</code></pre>\n<h5>深入解释</h5>\n<p><strong>动机与背景</strong></p>\n<p>大模型训练面临严峻的内存墙问题。以混合精度 Adam 训练为例，一个 \\(\\Psi\\) 参数的模型需要：</p>\n<p>$$\\text{总内存} = \\underbrace{2\\Psi}_{\\text{fp16 参数}} + \\underbrace{2\\Psi}_{\\text{fp16 梯度}} + \\underbrace{4\\Psi + 4\\Psi + 4\\Psi}_{\\text{fp32 参数副本 + 动量 + 方差}} = 16\\Psi \\text{ bytes}$$</p>\n<p>对于 GPT-2（1.5B 参数），这意味着至少 24GB 内存仅用于模型状态。传统数据并行（DP）在每个 GPU 上完整复制所有 \\(16\\Psi\\) 字节，造成巨大冗余。而模型并行（MP）虽然切分了模型状态，但通信开销大、计算粒度低、扩展性差。</p>\n<div class=\"key-point\">💡 关键洞察：DP 的内存冗余来自于每个进程都存储完整的模型状态，但实际上每个进程在每一步只需要更新 \\(1/N_d\\) 的参数。</div>\n<p><strong>ZeRO-DP 核心机制</strong></p>\n<p>ZeRO-DP 的核心思想是：<strong>保留 DP 的高计算效率和低通信量，同时通过分区（partition）而非复制（replicate）来消除内存冗余。</strong></p>\n<p><strong>Stage 1（\\(P_{os}\\)）— 优化器状态分区：</strong></p>\n<p>将优化器状态（fp32 参数副本 + 动量 + 方差，共 \\(12\\Psi\\) 字节）均分到 \\(N_d\\) 个进程。每个进程只维护 \\(1/N_d\\) 的优化器状态，只更新对应的参数分区。更新后通过 All-Gather 同步完整参数。</p>\n<p>$$\\text{Stage 1 内存} = 4\\Psi + \\frac{12\\Psi}{N_d} \\xrightarrow{N_d \\to \\infty} 4\\Psi \\quad (\\text{4x 节省})$$</p>\n<p><strong>Stage 2（\\(P_{os+g}\\)）— 梯度分区：</strong></p>\n<p>既然每个进程只更新 \\(1/N_d\\) 的参数，那它也只需要对应分区的归约梯度。因此将标准 All-Reduce 替换为 Reduce-Scatter：每个梯度只归约到负责该分区的进程，归约后立即释放其余梯度内存。</p>\n<p>$$\\text{Stage 2 内存} = 2\\Psi + \\frac{14\\Psi}{N_d} \\xrightarrow{N_d \\to \\infty} 2\\Psi \\quad (\\text{8x 节省})$$</p>\n<p><strong>Stage 3（\\(P_{os+g+p}\\)）— 参数分区：</strong></p>\n<p>进一步地，每个进程只存储 \\(1/N_d\\) 的模型参数。前向/反向传播时，通过流水线式 All-Gather 按需获取完整层参数，用完即弃。</p>\n<p>$$\\text{Stage 3 内存} = \\frac{16\\Psi}{N_d} \\quad (N_d\\text{x 线性节省})$$</p>\n<div class=\"warn-box\">⚠️ 注意：Stage 3 的通信量从 \\(2\\Psi\\) 增加到 \\(3\\Psi\\)（前向 All-Gather \\(\\Psi\\) + 反向 All-Gather \\(\\Psi\\) + 梯度 Reduce-Scatter \\(\\Psi\\)），即 1.5 倍开销，但换来了线性内存缩减。</div>\n<p><strong>通信量分析</strong></p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方案</th>\n<th>通信量</th>\n<th>内存节省</th>\n<th>通信原语</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>标准 DP (All-Reduce)</td>\n<td>\\(2\\Psi\\)</td>\n<td>1x</td>\n<td>Reduce-Scatter + All-Gather</td>\n</tr>\n<tr>\n<td>ZeRO Stage 1+2</td>\n<td>\\(2\\Psi\\)</td>\n<td>8x</td>\n<td>Reduce-Scatter + All-Gather</td>\n</tr>\n<tr>\n<td>ZeRO Stage 3</td>\n<td>\\(3\\Psi\\)</td>\n<td>\\(N_d\\)x</td>\n<td>2×All-Gather + Reduce-Scatter</td>\n</tr>\n</tbody>\n</table></div>\n<p>标准 All-Reduce 本质上就是 Reduce-Scatter + All-Gather，通信量为 \\(2\\Psi\\)。ZeRO Stage 1+2 将 All-Reduce 拆解为：先 Reduce-Scatter 梯度（\\(\\Psi\\)），再 All-Gather 更新后的参数（\\(\\Psi\\)），总量完全相同。</p>\n<p><strong>ZeRO-R 残余内存优化</strong></p>\n<p>除模型状态外，训练还消耗大量内存用于：</p>\n<ol>\n<li><strong>激活内存</strong>（\\(P_a\\)）：MP 中激活被复制到所有 MP 进程。ZeRO 将激活检查点按 MP 度分区，需要时通过 All-Gather 重建。对于 100B 模型（MP=16），激活从 33GB 降至约 2GB。</li>\n<li><strong>临时缓冲区</strong>（\\(C_B\\)）：All-Reduce 等操作的临时缓冲区随模型增大而膨胀。ZeRO 使用固定大小缓冲区。</li>\n<li><strong>内存碎片</strong>（\\(M_D\\)）：短生命周期（激活）和长生命周期（梯度）对象交错分配导致碎片。ZeRO 将长生命周期对象预分配到连续内存块。</li>\n</ol>\n<p><strong>与传统方法的对比</strong></p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th>标准 DP</th>\n<th>模型并行 (MP)</th>\n<th>ZeRO-DP</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>内存效率</td>\n<td>差（全复制）</td>\n<td>好（切分）</td>\n<td>好（切分）</td>\n</tr>\n<tr>\n<td>计算粒度</td>\n<td>高</td>\n<td>低（切分计算）</td>\n<td>高</td>\n</tr>\n<tr>\n<td>通信量</td>\n<td>\\(2\\Psi\\)</td>\n<td>随模型/硬件变化</td>\n<td>\\(2\\Psi\\) ~ \\(3\\Psi\\)</td>\n</tr>\n<tr>\n<td>扩展性</td>\n<td>好</td>\n<td>差（跨节点）</td>\n<td>好</td>\n</tr>\n<tr>\n<td>易用性</td>\n<td>高（无需改模型）</td>\n<td>低（需重构）</td>\n<td>高（无需改模型）</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 关键：ZeRO 证明了\"内存效率\"和\"通信效率\"并非不可兼得——通过巧妙利用模型状态的时序特性（不是所有状态在所有时刻都需要），可以在几乎不增加通信的前提下大幅降低内存。</div>",
      "quiz": {
        "q": "ZeRO-DP Stage 2 (Pos+g) 相比标准数据并行，通信量变化如何？",
        "options": [
          "通信量减少为原来的 1/Nd",
          "通信量保持不变，仍为 2Ψ",
          "通信量增加 50%，变为 3Ψ",
          "通信量翻倍，变为 4Ψ"
        ],
        "answer": 1,
        "explain": "Stage 1+2 将 All-Reduce 拆解为 Reduce-Scatter（Ψ）+ All-Gather（Ψ）= 2Ψ，与标准 DP 的 All-Reduce 通信量完全相同，但内存节省 8 倍。"
      }
    },
    {
      "id": "centauri",
      "num": 26,
      "name": "Centauri",
      "fullName": "通信分区调度 (Centauri)",
      "year": "2024",
      "org": "SJTU/Alibaba",
      "parent": "coconet",
      "paperUrl": "https://dl.acm.org/doi/abs/10.1145/3620666.3651379",
      "projectUrl": "",
      "category": "comm",
      "motivation": "通信分区调度细粒度计算-通信重叠",
      "summary": "Centauri 的核心目标是：通信分区调度细粒度计算-通信重叠。",
      "keyPoints": [
        "核心动机：通信分区调度细粒度计算-通信重叠",
        "演化来源：继承或改进自 coconet",
        "代表机构：SJTU/Alibaba"
      ],
      "detail": "<p>通信分区调度细粒度计算-通信重叠</p>"
    },
    {
      "id": "fp8_allgather",
      "num": 27,
      "name": "FP8 Parameter AllGather",
      "fullName": "FP8参数聚合 (FP8 Parameter AllGather)",
      "year": "2026",
      "org": "NVIDIA",
      "parent": "zero_pp",
      "paperUrl": "https://github.com/NVIDIA/TransformerEngine",
      "projectUrl": "",
      "category": "comm",
      "motivation": "无损FP8缩放配方降低权重聚合带宽",
      "summary": "FP8 Parameter AllGather 在 FSDP/ZeRO 的参数聚合阶段，将每个 rank 的参数分片先量化为 FP8（1 字节）再执行 AllGather，通信量减半的同时通过精细的缩放配方（delayed scaling / current scaling）保持训练精度无损，是 NVIDIA TransformerEngine 中面向 Hopper/Blackwell GPU 的关键通信优化。",
      "keyPoints": [
        "<strong>通信带宽减半</strong>：将 AllGather 的数据类型从 BF16/FP16（2 字节）降为 FP8（1 字节），每次前向/反向的参数聚合通信量减少 50%",
        "<strong>量化-通信-反量化三阶段流水线</strong>：每个 rank 先将本地参数分片量化为 FP8 + per-tensor scale，AllGather 聚合 FP8 数据，最后反量化回高精度用于计算",
        "<strong>两种缩放配方</strong>：支持 Delayed Scaling（基于历史 amax 窗口预计算 scale）和 Current Scaling（实时扫描当前 tensor 计算 scale），前者延迟低，后者精度高",
        "<strong>Float8Tensor 数据结构</strong>：封装 <code>_data</code>（uint8 存储）、<code>_scale_inv</code>（float32 反缩放因子）、<code>_fp8_dtype</code>（E4M3/E5M2），实现量化张量的透明操作",
        "<strong>FSDP/FSDP2 原生集成</strong>：通过 <code>prepare_te_modules_for_fsdp</code> 一键启用，hook 替换 AllGather 路径，对用户训练代码零侵入",
        "<strong>支持 MXFP8 微缩放</strong>：除 per-tensor scaling 外，还支持 Microscaling FP8（per-block scaling），进一步提升量化精度"
      ],
      "detail": "<p><img alt=\"FP8 AllGather 流程示意图\" src=\"https://raw.githubusercontent.com/NVIDIA/TransformerEngine/main/docs/examples/fp8_primer/FP8_primer_fig1.png\" />\n<em>图：FP8 数据格式——E4M3 用于前向权重/激活，E5M2 用于反向梯度。FP8 AllGather 利用 E4M3 格式在通信阶段压缩参数数据。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># FP8 Parameter AllGather 核心流程\n# 来源：NVIDIA TransformerEngine distributed.py\n\ndef fp8_all_gather(local_shard, quantizer, group):\n    &quot;&quot;&quot;\n    将本地参数分片以 FP8 格式进行 AllGather，通信量减半。\n\n    Args:\n        local_shard: 本地参数分片 (BF16/FP32), shape [shard_size]\n        quantizer: FP8 量化器 (delayed/current scaling)\n        group: 通信组\n    &quot;&quot;&quot;\n    world_size = get_world_size(group)\n\n    # ---- 阶段 1: 量化 (本地计算) ----\n    # 将高精度参数分片量化为 FP8\n    fp8_shard = quantizer.quantize(local_shard)\n    # fp8_shard 包含:\n    #   ._data: uint8 tensor, shape [shard_size]  (1 byte/element)\n    #   ._scale_inv: float32 scalar               (4 bytes total)\n    #   ._fp8_dtype: E4M3 or E5M2\n\n    # ---- 阶段 2: AllGather FP8 数据 (通信) ----\n    # 通信量 = shard_size × 1 byte × world_size (vs 2 bytes for BF16)\n    fp8_data_list = all_gather(fp8_shard._data, group)  # uint8 AllGather\n    fp8_full_data = torch.cat(fp8_data_list, dim=0)\n\n    # 广播 scale (开销可忽略: 仅 4 bytes × world_size)\n    scale_inv = fp8_shard._scale_inv  # per-tensor scale, 共享给所有 rank\n\n    # ---- 阶段 3: 反量化 (本地计算) ----\n    # 将聚合后的 FP8 数据还原为高精度\n    full_param = dequantize(fp8_full_data, scale_inv, fp8_dtype)\n    # full_param: BF16/FP32, shape [shard_size × world_size]\n\n    return full_param\n\n\n# ---- FSDP 集成入口 ----\ndef fsdp_forward_with_fp8_allgather(module, input):\n    &quot;&quot;&quot;FSDP forward hook: 替换默认 AllGather 为 FP8 版本&quot;&quot;&quot;\n    for fsdp_unit in module.fsdp_units:\n        # 原始 FSDP: full_param = all_gather(local_shard)        # BF16, 2x 带宽\n        # FP8 FSDP:  full_param = fp8_all_gather(local_shard, q)  # FP8, 1x 带宽\n        full_param = fp8_all_gather(\n            fsdp_unit.local_shard,\n            fsdp_unit.fp8_quantizer,\n            fsdp_unit.process_group\n        )\n        fsdp_unit.restore_param_views(full_param)\n    return module(input)\n</code></pre>\n<h5>动机与背景</h5>\n<p>在大规模分布式训练中，FSDP（Fully Sharded Data Parallel）/ ZeRO-3 将模型参数分片存储在不同 rank 上，每次前向和反向传播前需要通过 <strong>AllGather</strong> 操作收集完整参数。对于一个 \\(\\Psi\\) 参数的模型，在 \\(W\\) 个 rank 的 FSDP 中：</p>\n<p>$$\\text{每次 AllGather 通信量} = \\Psi \\times b \\times \\frac{W-1}{W}$$</p>\n<p>其中 \\(b\\) 是每个参数的字节数。使用 BF16 时 \\(b=2\\)，使用 FP8 时 \\(b=1\\)，<strong>通信量直接减半</strong>。</p>\n<p>对于 GPT-175B 模型（\\(\\Psi \\approx 175 \\times 10^9\\)），单次 AllGather 在 BF16 下需传输约 350 GB 数据，而 FP8 仅需 175 GB。在训练过程中，前向和反向各需一次 AllGather（若启用 reshard_after_forward），因此每个训练步节省的通信量为：</p>\n<p>$$\\Delta = 2 \\times \\Psi \\times 1 \\times \\frac{W-1}{W} \\approx 2\\Psi \\text{ bytes (大规模集群)}$$</p>\n<div class=\"key-point\">💡 <strong>关键洞察</strong>：AllGather 的通信量与参数量成正比，而 FP8 量化将每个参数从 2 字节压缩到 1 字节。与梯度压缩不同，参数的 AllGather 是<strong>精确重建</strong>（每个 rank 需要完全相同的参数副本），因此量化方案必须保证精度损失可控。</div>\n<h5>核心机制：FP8 量化与缩放配方</h5>\n<p>FP8 有两种格式：<strong>E4M3</strong>（4 位指数 + 3 位尾数，动态范围 ±448）和 <strong>E5M2</strong>（5 位指数 + 2 位尾数，动态范围 ±57344）。参数 AllGather 通常使用 <strong>E4M3</strong> 格式，因为权重需要更高的精度而非更大的动态范围。</p>\n<p>由于 FP8 的表示范围有限，直接量化会导致溢出或下溢。TransformerEngine 通过 <strong>缩放因子（scale）</strong> 将张量值映射到 FP8 可表示范围：</p>\n<p>$$x_{\\text{fp8}} = \\text{cast\\_to\\_fp8}\\left(\\frac{x}{\\text{scale\\_inv}}\\right), \\quad \\text{scale\\_inv} = \\frac{\\text{amax}(|x|)}{\\text{FP8\\_MAX}}$$</p>\n<p>其中 \\(\\text{FP8\\_MAX}\\) 是 FP8 格式的最大可表示值（E4M3 为 448）。</p>\n<p><strong>Delayed Scaling（延迟缩放）</strong>：</p>\n<pre><code class=\"language-python\">class Float8Quantizer:\n    &quot;&quot;&quot;基于历史 amax 窗口的延迟缩放&quot;&quot;&quot;\n    def __init__(self, scale, amax, fp8_dtype):\n        self.scale = scale          # 基于历史 amax 预计算的缩放因子\n        self.amax = amax            # amax 历史窗口\n        self.fp8_dtype = fp8_dtype  # E4M3 or E5M2\n\n    def quantize(self, tensor):\n        # 1. 用预计算的 scale 量化（无需扫描当前 tensor）\n        fp8_data = cast_to_fp8(tensor * self.scale, self.fp8_dtype)\n        # 2. 同时记录当前 tensor 的 amax，用于更新下一步的 scale\n        self.amax.copy_(max(abs(tensor.min()), abs(tensor.max())))\n        return Float8Tensor(data=fp8_data, scale_inv=1/self.scale)\n</code></pre>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：Delayed Scaling 使用<strong>上一步</strong>的 amax 计算 scale，因此存在一步延迟。如果参数分布剧烈变化，可能导致短暂的精度下降。但在实践中，模型权重的分布变化缓慢，延迟缩放几乎无损。</div>\n<p><strong>Current Scaling（当前缩放）</strong>：</p>\n<pre><code class=\"language-python\">class Float8CurrentScalingQuantizer:\n    &quot;&quot;&quot;实时计算 amax 的当前缩放&quot;&quot;&quot;\n    def quantize(self, tensor):\n        # 1. 扫描当前 tensor 计算 amax\n        amax = max(abs(tensor.min()), abs(tensor.max()))\n        # 2. 可选：跨 rank AllReduce amax 确保一致性\n        if self.with_amax_reduction:\n            dist.all_reduce(amax, op=ReduceOp.MAX, group=self.group)\n        # 3. 计算 scale 并量化\n        scale = FP8_MAX / (amax + epsilon)\n        fp8_data = cast_to_fp8(tensor * scale, self.fp8_dtype)\n        return Float8Tensor(data=fp8_data, scale_inv=1/scale)\n</code></pre>\n<p>Current Scaling 精度更高但引入额外的 amax 计算开销。TransformerEngine 默认使用 Delayed Scaling 以获得最佳性能。</p>\n<h5>通信流程详解</h5>\n<p>TransformerEngine 的 <code>_all_gather_fp8</code> 实现了完整的 FP8 AllGather 流程：</p>\n<ol>\n<li><strong>输入检查</strong>：判断输入是否已经是 <code>Float8Tensor</code>。如果是，直接提取 FP8 数据；否则先量化</li>\n<li><strong>FP8 数据 AllGather</strong>：对 <code>uint8</code> 格式的 FP8 数据执行标准 AllGather，通信量为原始的 50%</li>\n<li><strong>Scale 广播</strong>：将 per-tensor 的 <code>scale_inv</code>（仅 4 字节 float32）广播给所有 rank</li>\n<li><strong>构造 Float8Tensor</strong>：将聚合后的 FP8 数据和 scale 封装为 <code>Float8Tensor</code> 返回</li>\n<li><strong>延迟反量化</strong>：<code>Float8Tensor</code> 支持惰性反量化，仅在实际计算需要时才转换回高精度</li>\n</ol>\n<pre><code>Rank 0: [shard_0 BF16] --quantize--&gt; [shard_0 FP8 + scale_0]\nRank 1: [shard_1 BF16] --quantize--&gt; [shard_1 FP8 + scale_1]\nRank 2: [shard_2 BF16] --quantize--&gt; [shard_2 FP8 + scale_2]\nRank 3: [shard_3 BF16] --quantize--&gt; [shard_3 FP8 + scale_3]\n                    |\n                    v  AllGather (FP8 uint8, 通信量减半)\n                    |\nAll Ranks: [shard_0|shard_1|shard_2|shard_3 FP8] + shared scale\n                    |\n                    v  Dequantize (本地计算)\n                    |\nAll Ranks: [full_param BF16] --&gt; 用于前向/反向计算\n</code></pre>\n<h5>与传统方法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>标准 AllGather (BF16)</th>\n<th>FP8 AllGather</th>\n<th>梯度压缩 (如 DGC)</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>通信数据类型</td>\n<td>BF16 (2B)</td>\n<td>FP8 (1B)</td>\n<td>稀疏 FP32</td>\n</tr>\n<tr>\n<td>带宽节省</td>\n<td>基准</td>\n<td><strong>50%</strong></td>\n<td>99%+ (Top-K)</td>\n</tr>\n<tr>\n<td>额外计算</td>\n<td>无</td>\n<td>量化/反量化</td>\n<td>稀疏编码/解码</td>\n</tr>\n<tr>\n<td>精度影响</td>\n<td>无损</td>\n<td><strong>近乎无损</strong>（缩放配方保证）</td>\n<td>有损（需动量校正）</td>\n</tr>\n<tr>\n<td>适用阶段</td>\n<td>参数聚合</td>\n<td>参数聚合</td>\n<td>梯度同步</td>\n</tr>\n<tr>\n<td>硬件要求</td>\n<td>任意</td>\n<td>Hopper+ (FP8 原生支持)</td>\n<td>任意</td>\n</tr>\n<tr>\n<td>实现复杂度</td>\n<td>低</td>\n<td>中（需量化器管理）</td>\n<td>高（需误差反馈）</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 <strong>关键优势</strong>：FP8 AllGather 的核心价值在于<strong>几乎零精度损失的 50% 带宽节省</strong>。与梯度压缩方法不同，参数量化的误差不会在训练过程中累积——每步都从 master weight（高精度）重新量化，因此不需要误差反馈等补偿机制。</div>\n<h5>FSDP 集成机制</h5>\n<p>TransformerEngine 提供 <code>prepare_te_modules_for_fsdp</code> 函数，自动为所有 TE 模块启用 FP8 AllGather：</p>\n<pre><code class=\"language-python\"># 用户代码（零侵入）\nimport transformer_engine.pytorch as te\n\nmodel = build_model()  # 使用 TE 的 Linear/LayerNorm 等模块\nte.prepare_te_modules_for_fsdp(model)  # 一行启用 FP8 AllGather\n\n# 之后正常使用 PyTorch FSDP 包装\nmodel = FSDP(model, ...)\n</code></pre>\n<p>内部实现通过 <code>_fsdp_wrap_all_gather</code> 方法 hook 每个 TE 模块的 AllGather 路径：\n- 检测参数是否已标记为 FP8（<code>primary_weights_in_fp8</code> 标志）\n- 如果是，调用 <code>_all_gather_fp8</code> 替代默认的 BF16 AllGather\n- 支持 PyTorch FSDP1 和 FSDP2 两种接口</p>\n<h5>MXFP8 微缩放扩展</h5>\n<p>除了 per-tensor scaling，TransformerEngine 还支持 <strong>MXFP8（Microscaling FP8）</strong>，即 per-block scaling：</p>\n<p>$$x_{\\text{mxfp8}}[i] = \\text{cast\\_to\\_fp8}\\left(\\frac{x[i]}{\\text{scale}[i // B]}\\right)$$</p>\n<p>其中 \\(B\\) 是 block size（通常为 32）。每 32 个元素共享一个 8-bit scale，额外开销仅为 \\(\\frac{1}{32}\\) = 3.125%，但量化精度显著提升。MXFP8 AllGather 通过 <code>_all_gather_mxfp8</code> 实现，同时聚合数据和 per-block scales。</p>",
      "quiz": {
        "q": "FP8 Parameter AllGather 相比标准 BF16 AllGather，通信量减少了多少？",
        "options": [
          "减少 75%，因为 FP8 只有 BF16 的四分之一大小",
          "减少 50%，因为 FP8 每个元素 1 字节而 BF16 每个元素 2 字节",
          "减少 87.5%，因为 FP8 只有 1 bit 指数",
          "不确定，取决于模型参数的分布"
        ],
        "answer": 1,
        "explain": "FP8 每个参数占 1 字节，BF16 每个参数占 2 字节，因此 AllGather 的通信量精确减半（50%）。per-tensor scale 的额外通信开销（4 字节/tensor）相对于参数量可忽略不计。"
      }
    },
    {
      "id": "gshard",
      "num": 28,
      "name": "GShard",
      "fullName": "MoE自动分片 (GShard)",
      "year": "2020",
      "org": "Google",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2006.16668",
      "projectUrl": "",
      "category": "hybrid",
      "motivation": "MoE层自动分片与负载均衡",
      "summary": "GShard 提出了一套基于 **稀疏门控混合专家（MoE）** 的条件计算方案与 **轻量级 SPMD 自动分片编译器**，仅需在模型代码中添加少量分片注解即可将 Transformer 扩展至 600B 参数，在 2048 块 TPU v3 上以亚线性通信开销完成训练，实现了 100+ 语言多语言翻译的 SOTA 质量。",
      "keyPoints": [
        "<strong>MoE Transformer 架构</strong>：每隔一层将 FFN 替换为 MoE 层（Position-wise），Encoder 和 Decoder 均适用，非 MoE 层参数全设备复制，MoE 层专家参数跨设备分片",
        "<strong>Top-2 Expert Gating</strong>：每个 token 选择 2 个专家，第一专家确定性派发，第二专家按门控权重概率随机派发（Random Routing），兼顾负载均衡与模型质量",
        "<strong>Expert Capacity 机制</strong>：设定每个专家的 buffer 上限 \\(C = 2N / E\\)（capacity factor 可调），溢出 token 通过残差连接直通，防止单专家过载",
        "<strong>辅助负载均衡损失</strong>：\\(l_{aux} = c_e \\cdot \\sum_{i=1}^{E} f_i \\cdot m_i\\)，其中 \\(f_i\\) 为分配到专家 \\(i\\) 的 token 比例，\\(m_i\\) 为门控均值，鼓励均匀分配",
        "<strong>GShard 分片 API</strong>：仅 3 个注解原语 <code>replicate(tensor)</code>、<code>split(tensor, split_dim, num_partitions)</code>、<code>shard(tensor, device_assignment)</code> 即可描述分片策略",
        "<strong>XLA SPMD Partitioner</strong>：编译器自动从用户注解推断全图分片方案，插入 AllReduce / AllToAll 等集合通信，处理 halo exchange 与 padding，无需手写通信代码",
        "<strong>规模验证</strong>：600B 参数 MoE Transformer，2048 TPU v3，4 天处理 1T tokens，100 语言→英语翻译，高资源语言 BLEU 提升 13.5+，低资源语言获益于正向迁移"
      ],
      "detail": "<h5>核心架构图</h5>\n<p><img alt=\"GShard MoE Transformer 架构\" src=\"https://ar5iv.labs.arxiv.org/html/2006.16668/assets/transformer_encoder_moe_extension.png\" />\n<em>图：MoE 层替换标准 Transformer 中每隔一层的 FFN，每个 MoE 层包含 E 个专家（独立的 FFN），由 Gating 网络决定 token 路由。非 MoE 层在所有设备上复制，MoE 专家跨设备均匀分片。</em></p>\n<p><img alt=\"SPMD 分区方式\" src=\"https://ar5iv.labs.arxiv.org/html/2006.16668/assets/x2.png\" />\n<em>图：SPMD 分区——所有设备运行同一程序，通过数据分片实现并行，相比 MPMD（每个设备运行不同子图）具有更好的可扩展性。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># Algorithm 1: Top-2 Gating with Expert Capacity (简化版)\n# 输入: token representations X ∈ R^(N×M), N=tokens, M=model_dim\n# 参数: gate weights W_g ∈ R^(M×E), E=num_experts\n\ndef top2_gating(X, W_g, E, capacity_factor=2.0):\n    N = X.shape[0]\n    C = int(capacity_factor * N / E)  # Expert Capacity\n\n    # Step 1: 计算门控分数\n    gates = softmax(X @ W_g, dim=-1)  # (N, E)\n\n    # Step 2: 选择 Top-1 专家\n    expert1 = argmax(gates, dim=-1)       # (N,)\n    gate1   = gates[range(N), expert1]    # (N,)\n    mask1   = one_hot(expert1, E)         # (N, E)\n\n    # Step 3: 选择 Top-2 专家 (排除 Top-1)\n    gates_masked = gates * (1 - mask1)\n    expert2 = argmax(gates_masked, dim=-1)\n    gate2   = gates[range(N), expert2]\n\n    # Step 4: Random Routing — 第2专家按概率派发\n    mask2 = one_hot(expert2, E) * (random() &lt; gate2).unsqueeze(-1)\n\n    # Step 5: Capacity 约束 — 每个专家最多接收 C 个 token\n    # 通过 cumsum 计算每个专家已接收的 token 数，超过 C 的丢弃\n    position1 = cumsum(mask1, dim=0) * mask1  # 每个token在专家buffer中的位置\n    mask1 = mask1 * (position1 &lt;= C)\n    position2 = cumsum(mask2, dim=0) * mask2\n    mask2 = mask2 * (position2 &lt;= C)\n\n    # Step 6: Combine — 加权合并两个专家的输出\n    # combine_weights = gate1 * mask1_dispatch + gate2 * mask2_dispatch\n\n    # Auxiliary loss: 鼓励负载均衡\n    f = mask1.mean(dim=0)  # 每个专家被选中的 token 比例\n    m = gates.mean(dim=0)  # 每个专家的平均门控值\n    l_aux = E * (f * m).sum()\n\n    return mask1, mask2, gate1, gate2, position1, position2, l_aux\n</code></pre>\n<h5>动机与背景</h5>\n<p><strong>问题</strong>：大规模多语言翻译面临\"容量瓶颈\"——当模型需要同时处理 100+ 语言对时，高资源语言因模型容量不足而质量下降，而简单增大 Dense 模型参数量会导致计算成本与设备数量线性增长。</p>\n<p><strong>传统方法的缺陷</strong>：\n1. <strong>Dense Scaling</strong>：将 Transformer 从 1B 扩展到 100B，每个 token 的计算量同比增长，训练成本不可承受\n2. <strong>MPMD 并行</strong>（如 Mesh-TensorFlow）：不同设备运行不同子程序，需要为每种模型结构手写分区逻辑，编程复杂度高且难以扩展到数千设备\n3. <strong>早期 MoE</strong>（Shazeer et al., 2017）：虽然实现了条件计算，但缺乏高效的分布式实现框架，负载不均衡问题严重</p>\n<div class=\"key-point\">💡 <strong>核心洞察</strong>：通过条件计算（Conditional Computation），模型参数量可以在<strong>不增加每个 token 计算量</strong>的前提下大幅扩展——每个 token 只激活 2 个专家（而非全部 E 个），实现了\"参数量 ×E 但 FLOPs 仅 ×2\"的亚线性扩展。</div>\n<h5>核心机制详解</h5>\n<p><strong>1. MoE 层设计</strong></p>\n<p>GShard 将标准 Transformer 中<strong>每隔一层</strong>的 FFN 替换为 MoE 层。每个 MoE 层包含 \\(E\\) 个专家，每个专家是一个独立的 FFN（结构与原始 FFN 相同）。对于输入 token \\(x_s\\)，MoE 层的输出为：</p>\n<p>$$y_s = \\sum_{i=0}^{E-1} G_i(x_s) \\cdot \\text{FFN}_i(x_s)$$</p>\n<p>其中 \\(G_i(x_s)\\) 是门控函数对专家 \\(i\\) 的权重。由于采用 Top-2 gating，\\(G_i\\) 对于绝大多数专家为 0，只有被选中的 2 个专家有非零权重。</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：只有 MoE 层的专家参数跨设备分片（每个设备持有 \\(E/D\\) 个专家），非 MoE 层（Attention、LayerNorm 等）的参数在所有设备上<strong>完全复制</strong>。这意味着模型的\"稠密部分\"提供跨语言的共享表示，而 MoE 专家提供语言/任务特定的容量。</div>\n<p><strong>2. Top-2 Gating 与 Random Routing</strong></p>\n<p>门控网络是一个简单的线性层 + Softmax：</p>\n<p>$$g(x_s) = \\text{Softmax}(x_s \\cdot W_g)$$</p>\n<p>选择 Top-2 专家后，<strong>第一专家确定性派发</strong>，<strong>第二专家按概率 \\(g_2(x_s)\\) 随机派发</strong>。这一设计的直觉是：</p>\n<ul>\n<li>第一专家捕获 token 的主要特征（高置信度路由）</li>\n<li>第二专家提供补充信息，但并非每个 token 都需要，概率派发减少了专家过载风险</li>\n<li>随机性还起到正则化作用，类似 Dropout</li>\n</ul>\n<p><strong>3. Expert Capacity 与溢出处理</strong></p>\n<p>为保证负载均衡和内存可控，每个专家设定容量上限：</p>\n<p>$$C = \\text{capacity\\_factor} \\times \\frac{N}{E}$$</p>\n<p>其中 \\(N\\) 是当前 group 的 token 数，\\(E\\) 是专家数。默认 capacity_factor = 2.0（因为 Top-2 意味着平均每个专家接收 \\(2N/E\\) 个 token）。超过容量的 token 通过<strong>残差连接</strong>直接传递到下一层，不经过任何专家处理。</p>\n<div class=\"key-point\">💡 <strong>关键设计</strong>：Local Group Dispatching——将一个 batch 中的 token 按位置分成若干 group，每个 group 内独立执行 gating 和 capacity 约束。这确保了 group 级别的负载均衡，同时使得 dispatch/combine 操作可以高效地用 Einsum 实现。</div>\n<p><strong>4. 辅助负载均衡损失</strong></p>\n<p>为避免门控网络将所有 token 路由到少数\"热门\"专家，引入辅助损失：</p>\n<p>$$l_{aux} = c_e \\cdot E \\cdot \\sum_{i=1}^{E} f_i \\cdot m_i$$</p>\n<p>其中：\n- \\(f_i = \\frac{1}{N}\\sum_{s=1}^{N} \\mathbf{1}[\\text{token } s \\text{ dispatched to expert } i]\\)：专家 \\(i\\) 被选中的 token 比例\n- \\(m_i = \\frac{1}{N}\\sum_{s=1}^{N} g_i(x_s)\\)：专家 \\(i\\) 的平均门控值\n- \\(c_e\\)：超参数，控制辅助损失的权重</p>\n<p>该损失的最小值在所有 \\(f_i = m_i = 1/E\\)（完全均匀分配）时取得。使用 \\(f_i \\cdot m_i\\) 的乘积形式而非直接约束 \\(f_i\\) 的方差，是因为 \\(f_i\\) 涉及 argmax 不可微，而 \\(m_i\\) 可微，乘积形式允许梯度通过 \\(m_i\\) 流回门控网络。</p>\n<h5>GShard 自动分片系统</h5>\n<p><strong>5. 分片注解 API</strong></p>\n<p>GShard 的核心编程创新是将分布式并行的复杂性封装为 3 个简单注解：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>API</th>\n<th>语义</th>\n<th>示例</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>replicate(tensor)</code></td>\n<td>张量在所有设备上完整复制</td>\n<td>Attention 权重</td>\n</tr>\n<tr>\n<td><code>split(tensor, dim, D)</code></td>\n<td>沿 <code>dim</code> 维度均匀切分到 <code>D</code> 个设备</td>\n<td>MoE 专家权重沿 expert 维度切分</td>\n</tr>\n<tr>\n<td><code>shard(tensor, assignment)</code></td>\n<td>按自定义映射分配到设备</td>\n<td>特殊布局需求</td>\n</tr>\n</tbody>\n</table></div>\n<p>用户只需在 MoE 层的关键张量上添加注解（约 10 行代码），编译器自动推断整个计算图的分片方案。</p>\n<p><strong>6. XLA SPMD Partitioner</strong></p>\n<p>编译器工作流程：\n1. <strong>注解传播</strong>：从用户标注的张量出发，沿计算图正向/反向传播分片信息\n2. <strong>通信插入</strong>：当操作的输入分片方式与所需不匹配时，自动插入 <code>AllToAll</code>（重分布）、<code>AllReduce</code>（聚合）等集合通信\n3. <strong>Halo Exchange</strong>：对于卷积等需要邻居数据的操作，自动生成 halo 交换逻辑\n4. <strong>Padding 处理</strong>：当张量维度不能被设备数整除时，自动添加 padding</p>\n<div class=\"key-point\">💡 <strong>关键优势</strong>：SPMD 模式下所有设备运行<strong>同一编译后程序</strong>，仅数据不同。相比 MPMD（每个设备编译不同子图），SPMD 的编译时间与设备数无关，且内存占用更可预测。</div>\n<h5>训练流程与性能</h5>\n<p><strong>数据流</strong>：\n1. 输入 batch 的 token 经 Embedding 后进入 Encoder/Decoder\n2. 在 MoE 层，token 经 Gating 网络计算路由，通过 <code>AllToAll</code> 发送到目标专家所在设备\n3. 各设备上的专家独立处理接收到的 token\n4. 处理完成后再通过 <code>AllToAll</code> 将结果发回原设备\n5. 非 MoE 层正常执行（数据并行 + 参数复制）</p>\n<p><strong>性能数据</strong>：\n- 600B MoE Transformer（2048 experts, 36 layers）在 2048 TPU v3 上训练\n- 处理速度：1T tokens / 250k steps / 4 天\n- 高资源语言（100 对）平均 ΔBLEU 提升 <strong>13.5+</strong>（相比双语基线）\n- 相比 Dense T(96L) 模型（约 2.3B 参数），MoE 模型在高资源语言上大幅领先，在低资源语言上通过正向迁移同样获益\n- 通信开销：AllToAll 通信量随专家数增加而增长，但整体训练吞吐仍保持近线性扩展</p>\n<p><strong>Scaling 规律</strong>：\n- 增加专家数主要提升高资源语言质量（缓解容量瓶颈），对低资源语言存在边际递减\n- 增加模型深度对低资源语言更有利（增强正向迁移），因为深层模型的共享参数比例更高\n- 最优配置需要在专家数（容量）和深度（迁移）之间取得平衡</p>\n<h5>与传统方法的区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th>Dense Scaling</th>\n<th>Mesh-TensorFlow (MPMD)</th>\n<th><strong>GShard (SPMD + MoE)</strong></th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>参数扩展</td>\n<td>线性增加 FLOPs</td>\n<td>线性增加 FLOPs</td>\n<td>亚线性（仅激活 Top-2 专家）</td>\n</tr>\n<tr>\n<td>编程模型</td>\n<td>手动模型并行</td>\n<td>手动分区 + 设备映射</td>\n<td><strong>3 个注解 + 编译器自动推断</strong></td>\n</tr>\n<tr>\n<td>编译扩展性</td>\n<td>—</td>\n<td>编译时间 ∝ 设备数</td>\n<td><strong>编译时间与设备数无关</strong></td>\n</tr>\n<tr>\n<td>负载均衡</td>\n<td>不适用</td>\n<td>不适用</td>\n<td>Expert Capacity + Aux Loss</td>\n</tr>\n<tr>\n<td>通信模式</td>\n<td>AllReduce</td>\n<td>手动管理</td>\n<td><strong>编译器自动插入 AllToAll/AllReduce</strong></td>\n</tr>\n<tr>\n<td>验证规模</td>\n<td>~10B</td>\n<td>~10B</td>\n<td><strong>600B（2048 TPU v3）</strong></td>\n</tr>\n</tbody>\n</table></div>",
      "quiz": {
        "q": "GShard 中 MoE 层的 Expert Capacity 机制的主要目的是什么？",
        "options": [
          "增加每个专家能处理的 token 数量以提升模型质量",
          "限制每个专家接收的 token 数上限，防止负载不均和内存溢出",
          "确保每个 token 恰好被两个专家处理",
          "减少 AllToAll 通信中传输的数据量"
        ],
        "answer": 1,
        "explain": "Expert Capacity 设定每个专家的 buffer 上限为 C=2N/E，超出容量的 token 通过残差连接直通。这防止了热门专家过载导致的内存溢出和计算不均衡问题。"
      }
    },
    {
      "id": "switch_transformer",
      "num": 29,
      "name": "Switch Transformer",
      "fullName": "Switch Transformer",
      "year": "2022",
      "org": "Google",
      "parent": "gshard",
      "paperUrl": "http://www.jmlr.org/papers/v23/21-0998.html",
      "projectUrl": "",
      "category": "hybrid",
      "motivation": "简化为Top-1路由万亿参数MoE模型",
      "summary": "Switch Transformer 的核心目标是：简化为Top-1路由万亿参数MoE模型。",
      "keyPoints": [
        "核心动机：简化为Top-1路由万亿参数MoE模型",
        "演化来源：继承或改进自 gshard",
        "代表机构：Google"
      ],
      "detail": "<p>简化为Top-1路由万亿参数MoE模型</p>"
    },
    {
      "id": "deepspeed_moe",
      "num": 30,
      "name": "DeepSpeed-MoE",
      "fullName": "DeepSpeed MoE系统 (DeepSpeed-MoE)",
      "year": "2022",
      "org": "Microsoft",
      "parent": "gshard",
      "paperUrl": "https://arxiv.org/abs/2201.05596",
      "projectUrl": "",
      "category": "hybrid",
      "motivation": "PR-MoE金字塔结构+MoE-Offload",
      "summary": "DeepSpeed-MoE 的核心目标是：PR-MoE金字塔结构+MoE-Offload。",
      "keyPoints": [
        "核心动机：PR-MoE金字塔结构+MoE-Offload",
        "演化来源：继承或改进自 gshard",
        "代表机构：Microsoft"
      ],
      "detail": "<p>PR-MoE金字塔结构+MoE-Offload</p>"
    },
    {
      "id": "tutel",
      "num": 31,
      "name": "Tutel",
      "fullName": "Tutel MoE系统 (Tutel)",
      "year": "2023",
      "org": "Microsoft",
      "parent": "deepspeed_moe",
      "paperUrl": "https://arxiv.org/abs/2206.03382",
      "projectUrl": "",
      "category": "hybrid",
      "motivation": "自适应并行度+All-to-All优化",
      "summary": "Tutel 的核心目标是：自适应并行度+All-to-All优化。",
      "keyPoints": [
        "核心动机：自适应并行度+All-to-All优化",
        "演化来源：继承或改进自 deepspeed_moe",
        "代表机构：Microsoft"
      ],
      "detail": "<p>自适应并行度+All-to-All优化</p>"
    },
    {
      "id": "colossal_ai",
      "num": 32,
      "name": "Colossal-AI",
      "fullName": "巨量AI系统 (Colossal-AI)",
      "year": "2023",
      "org": "NUS",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2110.14883",
      "projectUrl": "",
      "category": "hybrid",
      "motivation": "统一多维并行接口简化混合并行配置",
      "summary": "Colossal-AI 是一个统一的分布式深度学习系统，通过集成多维张量并行(1D/2D/2.5D/3D)、流水线并行、序列并行、增强型 ZeRO 分片与异构 offload，以模块化配置方式让用户仅需少量代码改动即可高效训练超大规模模型。\n\n---",
      "keyPoints": [
        "核心动机：统一多维并行接口简化混合并行配置",
        "代表机构：NUS"
      ],
      "detail": "<h5>系统整体架构</h5>\n<p>Colossal-AI 采用分层模块化设计，用户通过配置字典指定并行策略，系统自动注入加速特性：</p>\n<p><img alt=\"Colossal-AI 系统架构\" src=\"https://ar5iv.labs.arxiv.org/html/2110.14883/assets/x1.png\" /></p>\n<p><strong>图 1</strong>: Colossal-AI 整体架构。底层为并行上下文管理器(Parallel Context)，管理复杂混合并行环境的元信息；中间层提供张量并行模型构建工具和各种加速工具(激活检查点、混合精度)；上层为可扩展的执行引擎和训练器。</p>\n<p>系统的核心设计理念是<strong>配置驱动</strong>：用户只需准备一个配置文件指定并行模式和参数，调用 <code>colossalai.initialize</code> 即可将加速特性注入执行引擎。</p>\n<pre><code class=\"language-python\"># Colossal-AI 使用示例（伪代码）\nimport colossalai\n\n# 配置字典指定并行策略\nconfig = dict(\n    parallel=dict(\n        data=dict(size=8),           # 数据并行度\n        tensor=dict(mode='2d', size=4),  # 2D张量并行\n        pipeline=dict(size=2),       # 流水线并行度\n    ),\n    fp16=dict(mode='AMP_TYPE.TORCH'),  # 混合精度\n    gradient_accumulation=4,\n    zero=dict(level=2),              # ZeRO stage\n)\n\n# 一行初始化，自动注入所有加速特性\nengine, train_dataloader, test_dataloader, _ = colossalai.initialize(\n    model, optimizer, criterion, train_dataloader, test_dataloader, config=config\n)\n\n# 训练循环与普通PyTorch几乎一致\nfor epoch in range(num_epochs):\n    for batch in train_dataloader:\n        output = engine(batch['input'])\n        loss = engine.criterion(output, batch['label'])\n        engine.backward(loss)\n        engine.step()\n</code></pre>\n<hr />\n<h5>多维张量并行 (1D / 2D / 2.5D / 3D)</h5>\n<p>这是 Colossal-AI 最核心的技术贡献。对于矩阵乘法 $Y = WX$（其中 $X \\in \\mathbb{R}^{b \\times s \\times h}$, $W \\in \\mathbb{R}^{h \\times h}$），不同维度的张量并行采用不同的设备拓扑和切分策略：</p>\n<p><strong>1D 张量并行</strong>（Megatron-LM 风格）：</p>\n<p><img alt=\"1D 张量并行\" src=\"https://ar5iv.labs.arxiv.org/html/2110.14883/assets/x2.png\" /></p>\n<p><strong>图 2</strong>: 1D 张量并行。权重矩阵按列或行切分到 $p$ 个 GPU 上。前向传播后需要 All-Reduce 或 All-Gather 聚合结果。所有 $p$ 个 GPU 参与每次集合通信，通信量为 $2(p-1) \\cdot S_X$。</p>\n<p><strong>2D 张量并行</strong>（基于 SUMMA 算法）：</p>\n<p><img alt=\"2D 张量并行\" src=\"https://ar5iv.labs.arxiv.org/html/2110.14883/assets/x3.png\" /></p>\n<p><strong>图 3</strong>: 2D 张量并行。$p$ 个 GPU 排列为 $\\sqrt{p} \\times \\sqrt{p}$ 的网格。输入 $X$ 和权重 $W$ 同时在两个维度上切分。集合通信仅在行或列子组内进行（每次涉及 $\\sqrt{p}$ 个 GPU），通信量为 $3(\\sqrt{p}-1)(S_X + S_W)$。</p>\n<p><strong>2.5D 张量并行</strong>：</p>\n<p><img alt=\"2.5D 张量并行\" src=\"https://ar5iv.labs.arxiv.org/html/2110.14883/assets/x4.png\" /></p>\n<p><strong>图 4</strong>: 2.5D 张量并行。在 2D 基础上增加深度维度 $d$，$p = d \\cdot k^2$ 个 GPU 排列为长方体拓扑。输入 $X$ 额外沿 batch 维度切分 $d$ 份，通信量为 $3(k-1)(S_X/d + S_W)$，通过增加 $d$ 可以用更多 GPU 换取更低通信开销。</p>\n<p><strong>3D 张量并行</strong>：</p>\n<p>$p = l^3$ 个 GPU 排列为 $l \\times l \\times l$ 的立方体拓扑。$X$、$W$、$Y$ 均在三个维度上切分，通信量为 $\\frac{2(l-1)}{l}(S_X + S_W + S_Y)$。</p>\n<p><strong>通信量对比</strong>：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>模式</th>\n<th>通信量</th>\n<th>每次通信参与 GPU 数</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>1D</td>\n<td>$2(p-1) \\cdot S_X$</td>\n<td>$p$</td>\n</tr>\n<tr>\n<td>2D</td>\n<td>$3(\\sqrt{p}-1)(S_X + S_W)$</td>\n<td>$\\sqrt{p}$</td>\n</tr>\n<tr>\n<td>2.5D</td>\n<td>$3(k-1)(S_X/d + S_W)$</td>\n<td>$k$</td>\n</tr>\n<tr>\n<td>3D</td>\n<td>$\\frac{2(l-1)}{l}(S_X + S_W + S_Y)$</td>\n<td>$l$</td>\n</tr>\n</tbody>\n</table></div>\n<p><img alt=\"通信量理论分析\" src=\"https://ar5iv.labs.arxiv.org/html/2110.14883/assets/x5.png\" /></p>\n<p><strong>图 5</strong>: 不同张量并行模式的通信量随 GPU 数量的理论缩放曲线（$h=1024, s=512, b=32$）。高维 TP 的通信量增长显著慢于 1D，因为集合通信仅在设备子组内进行。</p>\n<blockquote>\n<p><strong>核心洞察</strong>：高维张量并行的优势在于将全局集合通信降级为子组通信。1D TP 每次 All-Reduce 涉及所有 $p$ 个 GPU，而 2D TP 仅涉及 $\\sqrt{p}$ 个。这使得高维 TP 在跨节点（带宽受限）场景下优势巨大。</p>\n</blockquote>\n<hr />\n<h5>增强型 ZeRO 分片与异构训练</h5>\n<p>Colossal-AI 重新设计了 ZeRO 的张量分片和 offload 机制，核心改进有两点：</p>\n<p><strong>1. Chunk-based 内存管理 + FP16 空间复用</strong></p>\n<p>借鉴 PatrickStar 的 chunk 管理思想，Colossal-AI 将参数组织为连续内存块(chunk)，实现高效的 GPU↔CPU 数据搬运。关键创新是 <strong>FP16 存储空间复用</strong>：</p>\n<p><img alt=\"内存空间复用\" src=\"https://ar5iv.labs.arxiv.org/html/2110.14883/assets/x6.png\" /></p>\n<p><strong>图 6</strong>: FP16 内存空间复用。前向传播时持有 FP16 参数；反向传播计算梯度后，FP16 参数不再需要，梯度直接写入同一存储空间。这进一步降低了峰值内存，使 CPU 内存可容纳更大模型。</p>\n<pre><code class=\"language-python\"># FP16 内存空间复用伪代码\nclass ChunkMemoryManager:\n    def __init__(self, chunk_size):\n        self.fp16_buffer = allocate(chunk_size)  # 统一FP16缓冲区\n\n    def forward_pass(self, layer):\n        # 前向：buffer存放FP16参数\n        self.fp16_buffer[:] = layer.fp16_params\n        output = layer.forward(self.fp16_buffer)\n        return output\n\n    def backward_pass(self, layer, grad_output):\n        # 反向：参数不再需要，梯度直接写入同一buffer\n        grad_input = layer.backward(grad_output)\n        self.fp16_buffer[:] = layer.fp16_grads  # 复用同一内存！\n        return grad_input\n</code></pre>\n<p><strong>2. 自适应 Hybrid Adam 优化器</strong></p>\n<p>DeepSpeed 的 ZeRO-Offload 将所有 FP32 master weights 静态放置在 CPU 内存中，CPU Adam 更新参数。Colossal-AI 实现了<strong>自适应混合 Adam</strong>：</p>\n<pre><code class=\"language-python\"># 自适应 Hybrid Adam 伪代码\nclass HybridAdamOptimizer:\n    def step(self):\n        gpu_free_memory = get_gpu_free_memory()\n\n        for param_group in self.param_groups:\n            if gpu_free_memory &gt; param_group.fp32_size:\n                # GPU有空间：在GPU上更新（更快）\n                gpu_adam_update(param_group)\n                gpu_free_memory -= param_group.fp32_size\n            else:\n                # GPU空间不足：offload到CPU更新\n                cpu_adam_update(param_group)\n</code></pre>\n<blockquote>\n<p><strong>核心优势</strong>：不再静态地将所有参数 offload 到 CPU，而是动态监控 GPU 可用内存，尽可能多地在 GPU 上完成参数更新，减少 CPU-GPU 通信开销，实现更好的资源利用率。</p>\n</blockquote>\n<hr />\n<h5>序列并行 (Ring Self-Attention)</h5>\n<p>对于超长序列训练，Self-Attention 的激活内存随序列长度二次增长，成为瓶颈。Colossal-AI 集成了 Ring Self-Attention 序列并行：</p>\n<p><img alt=\"Ring Self-Attention\" src=\"https://ar5iv.labs.arxiv.org/html/2110.14883/assets/x7.png\" /></p>\n<p><strong>图 7</strong>: Ring Self-Attention 序列并行。输入序列沿序列维度切分到多个 GPU，每个 GPU 持有一段子序列。通过环形通信(Ring Communication)传递 Key/Value，每个 GPU 逐步计算完整的 attention 输出。</p>\n<pre><code class=\"language-python\"># Ring Self-Attention 伪代码\ndef ring_self_attention(Q_local, K_local, V_local, ring_group):\n    &quot;&quot;&quot;每个GPU持有序列的一个分片&quot;&quot;&quot;\n    num_steps = ring_group.size()\n    K_recv, V_recv = K_local, V_local\n    attn_output = zeros_like(Q_local)\n\n    for step in range(num_steps):\n        # 计算当前K,V分片的attention贡献\n        attn_scores = Q_local @ K_recv.T / sqrt(d_k)\n        attn_output += softmax(attn_scores) @ V_recv\n\n        # 环形传递：发送当前K,V到下一个GPU，接收上一个GPU的K,V\n        K_recv = ring_send_recv(K_recv, ring_group)\n        V_recv = ring_send_recv(V_recv, ring_group)\n\n    return attn_output\n</code></pre>\n<blockquote>\n<p><strong>关键优势</strong>：每个 GPU 的激活内存从 $O(s^2)$ 降为 $O(s^2/p)$（$s$ 为序列长度，$p$ 为并行度），支持线性扩展的超长序列训练。</p>\n</blockquote>\n<hr />\n<h5>流水线并行</h5>\n<p>Colossal-AI 支持两种流水线并行调度策略：</p>\n<ul>\n<li><strong>GPipe</strong>：将 mini-batch 切分为多个 micro-batch，所有 micro-batch 前向完成后再统一反向，简单但有较大的 pipeline bubble。</li>\n<li><strong>PipeDream (1F1B)</strong>：交替执行前向和反向，减少 pipeline bubble 和峰值内存。</li>\n</ul>\n<p>两种策略均通过统一的 <code>PipelineEngine</code> 接口暴露，用户通过配置切换。</p>\n<hr />\n<h5>实验评估</h5>\n<p><strong>实验设置</strong>：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>系统</th>\n<th>配置</th>\n<th>特点</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>System I</td>\n<td>8× A100-80GB, NVLink 全互联</td>\n<td>高带宽基准</td>\n</tr>\n<tr>\n<td>System II</td>\n<td>8× A100-80GB, 部分 NVLink</td>\n<td>模拟实际部署</td>\n</tr>\n<tr>\n<td>System III</td>\n<td>64× A100-40GB, InfiniBand</td>\n<td>大规模集群</td>\n</tr>\n<tr>\n<td>System IV</td>\n<td>64× P100-16GB</td>\n<td>低端硬件兼容性</td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>核心结果</strong>：</p>\n<p><strong>1. 内存效率</strong>（ViT-Base, System I）：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>TP 模式</th>\n<th>每 GPU 内存</th>\n<th>相比 1D 节省</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>1D (4 GPU)</td>\n<td>基准</td>\n<td>-</td>\n</tr>\n<tr>\n<td>2D (4 GPU)</td>\n<td>降低 44%</td>\n<td>44%</td>\n</tr>\n<tr>\n<td>2.5D (8 GPU)</td>\n<td>降低 62%</td>\n<td>62%</td>\n</tr>\n<tr>\n<td>3D (8 GPU)</td>\n<td>降低 74%</td>\n<td>74%</td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>2. 吞吐量</strong>（ViT-H/14, System III, 64 GPU）：</p>\n<p>2D 张量并行比 1D 快 <strong>275.5%</strong>。原因：1D TP 在 64 GPU 上需要跨节点 All-Reduce（所有 64 GPU 参与），而 2D TP 仅在 $\\sqrt{64}=8$ 个 GPU 的子组内通信。</p>\n<p><strong>3. 硬件拓扑适应性</strong>（System II, 部分 NVLink 互联）：</p>\n<p>2D 和 2.5D TP 比 1D 吞吐高约 <strong>40%</strong>。部分互联拓扑下，1D TP 的全局 All-Reduce 受限于最慢链路，而高维 TP 的子组通信可以被调度到高带宽链路上。</p>\n<p><strong>4. 收敛性验证</strong>：</p>\n<p>在 ImageNet 上训练 ViT-Base，Colossal-AI 的 2D TP 与 PyTorch DDP 的收敛曲线完全一致，验证了数值正确性。</p>\n<hr />"
    },
    {
      "id": "galvatron",
      "num": 33,
      "name": "Galvatron",
      "fullName": "自动并行搜索 (Galvatron)",
      "year": "2022",
      "org": "PKU/Alibaba",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2211.13878",
      "projectUrl": "",
      "category": "hybrid",
      "motivation": "自动搜索最优3D并行配置",
      "summary": "Galvatron 的核心目标是：自动搜索最优3D并行配置。",
      "keyPoints": [
        "核心动机：自动搜索最优3D并行配置",
        "代表机构：PKU/Alibaba"
      ],
      "detail": "<p>自动搜索最优3D并行配置</p>"
    },
    {
      "id": "moe_folding",
      "num": 34,
      "name": "MoE Parallel Folding",
      "fullName": "MoE并行折叠 (MoE Parallel Folding)",
      "year": "2025",
      "org": "NVIDIA",
      "parent": "switch_transformer",
      "paperUrl": "https://arxiv.org/abs/2504.14960",
      "projectUrl": "",
      "category": "hybrid",
      "motivation": "异构并行映射专家-数据混合折叠",
      "summary": "MoE Parallel Folding 的核心目标是：异构并行映射专家-数据混合折叠。",
      "keyPoints": [
        "核心动机：异构并行映射专家-数据混合折叠",
        "演化来源：继承或改进自 switch_transformer",
        "代表机构：NVIDIA"
      ],
      "detail": "<p>异构并行映射专家-数据混合折叠</p>"
    },
    {
      "id": "x_moe",
      "num": 35,
      "name": "X-MoE",
      "fullName": "HPC平台MoE (X-MoE)",
      "year": "2025",
      "org": "ANL/ORNL",
      "parent": "switch_transformer",
      "paperUrl": "https://arxiv.org/abs/2504.09446",
      "projectUrl": "",
      "category": "hybrid",
      "motivation": "HPC平台MoE扩展专家专业化架构",
      "summary": "X-MoE 的核心目标是：HPC平台MoE扩展专家专业化架构。",
      "keyPoints": [
        "核心动机：HPC平台MoE扩展专家专业化架构",
        "演化来源：继承或改进自 switch_transformer",
        "代表机构：ANL/ORNL"
      ],
      "detail": "<p>HPC平台MoE扩展专家专业化架构</p>"
    },
    {
      "id": "fsmoe",
      "num": 36,
      "name": "FSMoE",
      "fullName": "灵活可扩展MoE (FSMoE)",
      "year": "2025",
      "org": "CUHK/Huawei",
      "parent": "tutel",
      "paperUrl": "https://arxiv.org/abs/2103.13262",
      "projectUrl": "",
      "category": "hybrid",
      "motivation": "灵活可扩展MoE训练框架",
      "summary": "FSMoE 的核心目标是：灵活可扩展MoE训练框架。",
      "keyPoints": [
        "核心动机：灵活可扩展MoE训练框架",
        "演化来源：继承或改进自 tutel",
        "代表机构：CUHK/Huawei"
      ],
      "detail": "<p>灵活可扩展MoE训练框架</p>"
    },
    {
      "id": "megascale_moe",
      "num": 37,
      "name": "MegaScale-MoE",
      "fullName": "超大规模MoE (MegaScale-MoE)",
      "year": "2026",
      "org": "ByteDance",
      "parent": "moe_folding",
      "paperUrl": "https://dl.acm.org/doi/abs/10.1145/3767295.3769325",
      "projectUrl": "",
      "category": "hybrid",
      "motivation": "生产级MoE训练1440GPU效率提升1.88x",
      "summary": "MegaScale-MoE 的核心目标是：生产级MoE训练1440GPU效率提升1.88x。",
      "keyPoints": [
        "核心动机：生产级MoE训练1440GPU效率提升1.88x",
        "演化来源：继承或改进自 moe_folding",
        "代表机构：ByteDance"
      ],
      "detail": "<p>生产级MoE训练1440GPU效率提升1.88x</p>"
    },
    {
      "id": "sub_moe",
      "num": 38,
      "name": "Sub-MoE",
      "fullName": "子空间MoE压缩 (Sub-MoE)",
      "year": "2026",
      "org": "AAAI 2026",
      "parent": "switch_transformer",
      "paperUrl": "https://ojs.aaai.org/index.php/AAAI/article/view/39464",
      "projectUrl": "",
      "category": "hybrid",
      "motivation": "子空间专家合并压缩缓解显存压力",
      "summary": "Sub-MoE 的核心目标是：子空间专家合并压缩缓解显存压力。",
      "keyPoints": [
        "核心动机：子空间专家合并压缩缓解显存压力",
        "演化来源：继承或改进自 switch_transformer",
        "代表机构：AAAI 2026"
      ],
      "detail": "<p>子空间专家合并压缩缓解显存压力</p>"
    },
    {
      "id": "layer_dist_opt",
      "num": 39,
      "name": "Layer-wise Distributed Optimizer",
      "fullName": "层级分布式优化器 (Layer-wise Distributed Optimizer)",
      "year": "2026",
      "org": "NVIDIA",
      "parent": "fsdp",
      "paperUrl": "https://developer.nvidia.com/blog/get-started-with-emerging-optimizers-for-llm-training/",
      "projectUrl": "",
      "category": "hybrid",
      "motivation": "支持Muon/MOP等需层级梯度的高阶优化器",
      "summary": "Layer-wise Distributed Optimizer 通过将 FSDP 的梯度分片策略从\"按元素切分\"改为\"按层分配\"，使每个 rank 持有完整的层级梯度矩阵，从而在分布式训练中原生支持 Muon、SOAP、MOP 等需要全层梯度信息的高阶优化器，同时保持与 FSDP 相当的内存效率和通信开销。",
      "keyPoints": [
        "<strong>层级梯度归属</strong>：将模型各层的梯度完整分配到不同 rank，而非 FSDP 的跨层均匀切片，确保每个 rank 拥有所负责层的完整梯度矩阵",
        "<strong>ReduceScatter → Reduce 通信模式转换</strong>：将 FSDP backward 中的 ReduceScatter 替换为针对层归属 rank 的 Reduce 操作，使目标 rank 获得完整规约梯度",
        "<strong>支持矩阵级优化器</strong>：原生兼容 Muon（Newton-Schulz 正交化）、SOAP/Shampoo（Kronecker 分解二阶矩）、MOP（动量正交投影）等需要完整权重矩阵结构的优化器",
        "<strong>混合分片策略</strong>：前向/反向阶段仍使用 FSDP 的 AllGather 获取完整参数，仅在优化器步骤改变梯度归属方式，实现\"训练用 FSDP + 优化用层级分配\"的混合架构",
        "<strong>负载均衡分配</strong>：通过贪心或 DP 算法将层按参数量分配到各 rank，使优化器计算和内存负载均匀",
        "<strong>通信-计算重叠</strong>：优化器更新与下一 micro-batch 的前向 AllGather 可流水线重叠"
      ],
      "detail": "<p><img alt=\"Layer-wise Distributed Optimizer 架构对比\" src=\"https://developer-blogs.nvidia.com/wp-content/uploads/2025/04/nvidia_news_logo.png\" />\n<em>图：Layer-wise Distributed Optimizer 与标准 FSDP 的梯度分配对比——左侧为 FSDP 按元素均匀切片，右侧为按层完整分配到不同 rank</em></p>\n<h5>算法核心流程</h5>\n<pre><code class=\"language-python\"># Layer-wise Distributed Optimizer 核心伪代码\nclass LayerDistOptimizer:\n    def __init__(self, model, world_size, rank, optimizer_cls):\n        self.layers = list(model.named_parameters())\n        # 按参数量贪心分配层到各 rank\n        self.layer_assignment = greedy_assign(self.layers, world_size)\n        self.my_layers = [l for l, r in self.layer_assignment.items() if r == rank]\n        # 每个 rank 仅为自己负责的层创建优化器状态\n        my_params = [p for n, p in self.layers if n in self.my_layers]\n        self.optimizer = optimizer_cls(my_params)  # e.g., Muon, SOAP\n\n    def step(self, fsdp_model):\n        for layer_name, param in self.layers:\n            owner_rank = self.layer_assignment[layer_name]\n            # 1. Reduce: 将所有 rank 的该层梯度规约到 owner rank\n            if self.rank == owner_rank:\n                full_grad = torch.zeros_like(param)\n            else:\n                full_grad = None\n            dist.reduce(param.grad, dst=owner_rank, op=dist.ReduceOp.SUM)\n\n        # 2. Owner rank 执行层级优化器更新（需要完整梯度矩阵）\n        if self.my_layers:\n            self.optimizer.step()  # e.g., Muon: G ← Newton-Schulz(G)\n\n        # 3. Broadcast 更新后的参数回所有 rank（或等待下次 AllGather）\n        for layer_name, param in self.layers:\n            owner_rank = self.layer_assignment[layer_name]\n            dist.broadcast(param.data, src=owner_rank)\n</code></pre>\n<h5>动机与背景</h5>\n<p>传统 FSDP/ZeRO-3 将参数和梯度按<strong>元素位置</strong>均匀切片分配到各 rank。在 optimizer step 中，每个 rank 仅对自己持有的梯度分片执行更新。这对 Adam 等<strong>逐元素优化器</strong>完全等价——因为 Adam 的更新规则 \\(m_t = \\beta_1 m_{t-1} + (1-\\beta_1)g_t\\) 和 \\(v_t = \\beta_2 v_{t-1} + (1-\\beta_2)g_t^2\\) 都是逐元素操作，分片不影响数学正确性。</p>\n<p>然而，新一代高阶优化器需要<strong>完整的层级梯度矩阵</strong>来执行全局操作：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>优化器</th>\n<th>所需操作</th>\n<th>为何需要完整层梯度</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><strong>Muon</strong></td>\n<td>Newton-Schulz 迭代求正交矩阵</td>\n<td>\\(X_{k+1} = aX_k + bX_k X_k^T X_k\\) 涉及矩阵乘法</td>\n</tr>\n<tr>\n<td><strong>SOAP/Shampoo</strong></td>\n<td>Kronecker 分解的二阶矩估计</td>\n<td>\\(L_t = \\beta L_{t-1} + (1-\\beta)G_t G_t^T\\) 需要完整 \\(G_t\\)</td>\n</tr>\n<tr>\n<td><strong>MOP</strong></td>\n<td>动量正交投影</td>\n<td>在完整梯度矩阵上做 SVD 或 QR 分解</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 <strong>关键洞察</strong>：FSDP 的 FlatParameter 设计将多层参数 flatten-concat 后切片，一个 rank 持有的分片可能横跨多个层的碎片——这使得任何需要\"完整层\"信息的操作都无法在分片上正确执行。</div>\n<h5>核心机制：从 ReduceScatter 到 Layer-wise Reduce</h5>\n<p>标准 FSDP backward 的通信模式：</p>\n<p>$$\\text{FSDP: } \\nabla L \\xrightarrow{\\text{ReduceScatter}} \\text{每个 rank 获得 } \\frac{1}{W} \\text{ 的梯度分片}$$</p>\n<p>Layer-wise Distributed Optimizer 的通信模式：</p>\n<p>$$\\text{LayerDist: } \\nabla L_{\\ell} \\xrightarrow{\\text{Reduce to owner}(\\ell)} \\text{owner rank 获得层 } \\ell \\text{ 的完整梯度}$$</p>\n<p>通信量对比分析（模型总参数 \\(\\Psi\\)，W 个 rank）：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>阶段</th>\n<th>FSDP</th>\n<th>Layer-wise Dist Opt</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Forward AllGather</td>\n<td>\\(\\Psi \\cdot \\frac{W-1}{W}\\)</td>\n<td>\\(\\Psi \\cdot \\frac{W-1}{W}\\)（相同）</td>\n</tr>\n<tr>\n<td>Backward 梯度通信</td>\n<td>\\(\\Psi \\cdot \\frac{W-1}{W}\\)（ReduceScatter）</td>\n<td>\\(\\Psi \\cdot \\frac{W-1}{W}\\)（Reduce）</td>\n</tr>\n<tr>\n<td>Optimizer → 参数同步</td>\n<td>无（分片更新后 AllGather 在下次 forward）</td>\n<td>\\(\\Psi \\cdot \\frac{W-1}{W}\\)（Broadcast）或合并到下次 AllGather</td>\n</tr>\n<tr>\n<td><strong>总通信量</strong></td>\n<td>\\(3\\Psi \\cdot \\frac{W-1}{W}\\)</td>\n<td>\\(3\\Psi \\cdot \\frac{W-1}{W}\\)</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：总通信量与 FSDP 相同（均为 3Ψ），但通信模式不同。Layer-wise 方案用 Reduce + Broadcast 替代 ReduceScatter + AllGather，在某些网络拓扑下可能有不同的带宽利用率。</div>\n<h5>负载均衡：层分配算法</h5>\n<p>模型各层参数量差异巨大（如 Transformer 的 QKV 投影 vs LayerNorm），需要智能分配：</p>\n<pre><code class=\"language-python\">def greedy_assign(layers, world_size):\n    &quot;&quot;&quot;贪心算法：每次将最大未分配层分配给当前负载最小的 rank&quot;&quot;&quot;\n    # 按参数量降序排列\n    sorted_layers = sorted(layers, key=lambda x: x[1].numel(), reverse=True)\n    rank_loads = [0] * world_size\n    assignment = {}\n    for name, param in sorted_layers:\n        min_rank = rank_loads.index(min(rank_loads))\n        assignment[name] = min_rank\n        rank_loads[min_rank] += param.numel()\n    return assignment\n</code></pre>\n<p>对于 Transformer 模型，典型的分配策略：\n- 大矩阵层（\\(W_Q, W_K, W_V, W_O, W_{up}, W_{gate}, W_{down}\\)）使用 Muon/SOAP\n- 小参数层（LayerNorm、Embedding）使用 Adam（逐元素，无需完整层）</p>\n<p>$$\\text{负载不均衡度} = \\frac{\\max_r \\sum_{\\ell \\in \\mathcal{L}_r} |\\theta_\\ell|}{\\frac{1}{W}\\sum_\\ell |\\theta_\\ell|} - 1$$</p>\n<p>目标是使不均衡度 &lt; 5%。</p>\n<h5>内存分析</h5>\n<p>每个 rank 的优化器状态内存：</p>\n<p>$$M_{\\text{opt}}^{(r)} = \\sum_{\\ell \\in \\mathcal{L}_r} K_{\\text{opt}} \\cdot |\\theta_\\ell|$$</p>\n<p>其中 \\(K_{\\text{opt}}\\) 为优化器每参数状态字节数（Muon: 4 bytes/param for momentum; SOAP: ~12 bytes/param for L, R factors）。</p>\n<p>与 FSDP 对比：\n- FSDP：每个 rank 存储 \\(\\frac{\\Psi}{W}\\) 的优化器状态，但状态是跨层碎片\n- Layer-wise：每个 rank 存储约 \\(\\frac{\\Psi}{W}\\) 的优化器状态（均衡分配后），但状态是完整层</p>\n<div class=\"key-point\">💡 <strong>内存等价性</strong>：在负载均衡良好的情况下，Layer-wise 方案的内存开销与 FSDP 相当，但每个 rank 的状态对应完整的层结构，使高阶优化器可以正确工作。</div>\n<h5>与 FSDP 的集成：混合执行模式</h5>\n<p>实际实现中，Layer-wise Distributed Optimizer 不完全替代 FSDP，而是在 FSDP 框架内修改优化器步骤的通信模式：</p>\n<pre><code>┌─────────────────────────────────────────────────────┐\n│ Forward Pass (标准 FSDP)                             │\n│   AllGather 参数 → 计算 → Reshard                    │\n├─────────────────────────────────────────────────────┤\n│ Backward Pass (修改通信)                             │\n│   AllGather 参数 → 计算梯度 → Reduce to layer owner  │\n├─────────────────────────────────────────────────────┤\n│ Optimizer Step (层级执行)                            │\n│   Owner rank: full-layer optimizer update            │\n│   (Muon/SOAP/MOP on complete gradient matrix)        │\n├─────────────────────────────────────────────────────┤\n│ Parameter Sync                                       │\n│   Broadcast updated params (或延迟到下次 AllGather)   │\n└─────────────────────────────────────────────────────┘\n</code></pre>\n<h5>Muon 优化器在 Layer-wise 框架下的执行</h5>\n<p>Muon 的核心是通过 Newton-Schulz 迭代将梯度矩阵正交化：</p>\n<p>$$G_{\\text{orth}} = \\text{NewtonSchulz}(G) \\approx U V^T \\quad \\text{where } G = U\\Sigma V^T$$</p>\n<p>Newton-Schulz 迭代公式（5 步收敛）：</p>\n<p>$$X_0 = \\frac{G}{\\|G\\|_F}, \\quad X_{k+1} = \\frac{3}{2}X_k - \\frac{1}{2}X_k X_k^T X_k$$</p>\n<p>这要求 \\(G \\in \\mathbb{R}^{m \\times n}\\) 为完整的层梯度矩阵。在 Layer-wise 框架下：</p>\n<pre><code class=\"language-python\">class MuonLayerWise:\n    def step(self):\n        for layer in self.my_layers:\n            G = layer.grad  # 完整层梯度 (m x n)\n            # Newton-Schulz orthogonalization\n            X = G / G.norm()\n            for _ in range(5):\n                X = 1.5 * X - 0.5 * X @ X.T @ X\n            # Momentum update\n            self.momentum[layer] = 0.95 * self.momentum[layer] + X\n            # Apply update with learning rate\n            layer.data -= self.lr * self.momentum[layer]\n</code></pre>\n<h5>通信优化：流水线重叠</h5>\n<p>Layer-wise 方案的一个优势是可以实现细粒度的通信-计算重叠：</p>\n<pre><code>Timeline (4 layers, 2 ranks):\nRank 0 owns: Layer 0, Layer 2\nRank 1 owns: Layer 1, Layer 3\n\nBackward:\n  [Bwd L3] → [Reduce L3→R1] → [Bwd L2] → [Reduce L2→R0] → ...\n\nOptimizer (overlapped):\n  R0: ─────────────────────── [Muon(L0)] ──── [Muon(L2)] ────\n  R1: ─────────── [Muon(L3)] ──── [Muon(L1)] ────────────────\n       ↑ 收到 L3 梯度后立即开始     ↑ 与 R0 的计算并行\n</code></pre>\n<p>各 rank 在收到自己负责的层的完整梯度后即可开始优化器计算，无需等待所有层的 backward 完成。</p>\n<h5>与传统方法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>标准 FSDP</th>\n<th>Layer-wise Dist Opt</th>\n<th>Data Parallel + Full Replication</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>参数内存/rank</td>\n<td>\\(\\Psi/W\\)</td>\n<td>\\(\\Psi/W\\)</td>\n<td>\\(\\Psi\\)</td>\n</tr>\n<tr>\n<td>优化器状态/rank</td>\n<td>\\(\\Psi/W\\)（碎片）</td>\n<td>\\(\\approx\\Psi/W\\)（完整层）</td>\n<td>\\(\\Psi\\)</td>\n</tr>\n<tr>\n<td>支持逐元素优化器</td>\n<td>✅</td>\n<td>✅</td>\n<td>✅</td>\n</tr>\n<tr>\n<td>支持矩阵级优化器</td>\n<td>❌</td>\n<td>✅</td>\n<td>✅</td>\n</tr>\n<tr>\n<td>通信量</td>\n<td>3Ψ</td>\n<td>3Ψ</td>\n<td>2Ψ</td>\n</tr>\n<tr>\n<td>内存效率</td>\n<td>高</td>\n<td>高</td>\n<td>低</td>\n</tr>\n</tbody>\n</table></div>",
      "quiz": {
        "q": "Layer-wise Distributed Optimizer 为什么不能直接使用 FSDP 的 ReduceScatter 来处理梯度？",
        "options": [
          "ReduceScatter 的通信带宽不够高",
          "ReduceScatter 将梯度按元素切片，破坏了层级矩阵结构，使矩阵级优化器无法正确执行",
          "ReduceScatter 不支持混合精度训练",
          "ReduceScatter 只能在同一节点内使用"
        ],
        "answer": 1,
        "explain": "Muon/SOAP 等优化器需要完整的层梯度矩阵来执行矩阵乘法、Newton-Schulz 迭代等操作。ReduceScatter 将梯度按元素位置切片到各 rank，每个 rank 只有矩阵的一部分行/列碎片，无法执行需要完整矩阵的运算。"
      }
    }
  ],
  "categories": {
    "dp": {
      "label": "数据并行 (Data Parallel)",
      "color": "#22a06b"
    },
    "tp": {
      "label": "张量并行 (Tensor Parallel)",
      "color": "#5b63d3"
    },
    "pp": {
      "label": "流水并行 (Pipeline Parallel)",
      "color": "#e8820c"
    },
    "comm": {
      "label": "通信优化 (Comm Optimization)",
      "color": "#d33d44"
    },
    "hybrid": {
      "label": "混合并行/MoE",
      "color": "#8e44ad"
    }
  },
  "projectUrls": {}
};
