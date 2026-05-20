/**
 * ai4chem-data.js — 由 pipeline/build.py 于 2026-05-20 17:49:38 自动生成。
 * 源文件：content/ai4sci/ai4chem.md
 * ⚠️  请勿手动修改；如需更新，修改源文档后重新编译。
 */
window.PAGE_CONFIG = {
  "meta": {
    "domain": "ai4sci",
    "topic_id": "ai4chem",
    "topic_name": "化学AI 技术演进图谱",
    "page_title": "化学AI 技术演进图谱",
    "page_subtitle": "2026-05-20 版",
    "page_desc": "从分子表示学习到反应预测、逆合成分析、催化剂设计与分子生成，AI正在重塑化学研究范式。本图谱涵盖2017-2026年化学AI领域的经典算法与前沿突破，展现从数据驱动到物理感知、从辅助工具到AI科学家的演化历程。",
    "page_icon": "🧪",
    "hero_pills": [
      "🏷️ AI4Chemistry · Reaction Prediction · Retrosynthesis · Catalyst Discovery · Molecular Generation"
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
        "id": "mpnn",
        "x": 50,
        "y": 150,
        "category": "representation"
      },
      {
        "id": "schnet",
        "x": 100,
        "y": 120,
        "category": "representation"
      },
      {
        "id": "grover",
        "x": 200,
        "y": 180,
        "category": "representation"
      },
      {
        "id": "dimenet",
        "x": 250,
        "y": 120,
        "category": "representation"
      },
      {
        "id": "gemnet",
        "x": 350,
        "y": 120,
        "category": "representation"
      },
      {
        "id": "unimol",
        "x": 500,
        "y": 140,
        "category": "representation"
      },
      {
        "id": "mist",
        "x": 700,
        "y": 130,
        "category": "representation"
      },
      {
        "id": "mattersim_mt",
        "x": 720,
        "y": 170,
        "category": "representation"
      },
      {
        "id": "chemmlm",
        "x": 680,
        "y": 200,
        "category": "representation"
      },
      {
        "id": "molecular_transformer",
        "x": 100,
        "y": 280,
        "category": "reaction"
      },
      {
        "id": "flower",
        "x": 600,
        "y": 270,
        "category": "reaction"
      },
      {
        "id": "reactome",
        "x": 700,
        "y": 300,
        "category": "reaction"
      },
      {
        "id": "3n_mcts",
        "x": 100,
        "y": 400,
        "category": "retrosynthesis"
      },
      {
        "id": "aizynthfinder",
        "x": 250,
        "y": 380,
        "category": "retrosynthesis"
      },
      {
        "id": "localretro",
        "x": 350,
        "y": 420,
        "category": "retrosynthesis"
      },
      {
        "id": "graphretro",
        "x": 350,
        "y": 360,
        "category": "retrosynthesis"
      },
      {
        "id": "synthegy",
        "x": 650,
        "y": 380,
        "category": "retrosynthesis"
      },
      {
        "id": "mosaic",
        "x": 700,
        "y": 420,
        "category": "retrosynthesis"
      },
      {
        "id": "jt_vae",
        "x": 100,
        "y": 530,
        "category": "generation"
      },
      {
        "id": "reinvent4",
        "x": 450,
        "y": 550,
        "category": "generation"
      },
      {
        "id": "geodiff",
        "x": 300,
        "y": 510,
        "category": "generation"
      },
      {
        "id": "edm",
        "x": 400,
        "y": 500,
        "category": "generation"
      },
      {
        "id": "cocograph",
        "x": 650,
        "y": 500,
        "category": "generation"
      },
      {
        "id": "propmolflow",
        "x": 680,
        "y": 540,
        "category": "generation"
      },
      {
        "id": "trajcast",
        "x": 720,
        "y": 480,
        "category": "generation"
      },
      {
        "id": "oc20",
        "x": 250,
        "y": 640,
        "category": "catalyst"
      },
      {
        "id": "gemnet_oc",
        "x": 350,
        "y": 630,
        "category": "catalyst"
      },
      {
        "id": "equiformerv2",
        "x": 500,
        "y": 620,
        "category": "catalyst"
      },
      {
        "id": "equiformerv3",
        "x": 700,
        "y": 610,
        "category": "catalyst"
      },
      {
        "id": "digcat",
        "x": 650,
        "y": 660,
        "category": "catalyst"
      },
      {
        "id": "moleculenet",
        "x": 100,
        "y": 730,
        "category": "property"
      },
      {
        "id": "attentivefp",
        "x": 250,
        "y": 720,
        "category": "property"
      },
      {
        "id": "admetpred",
        "x": 700,
        "y": 730,
        "category": "property"
      }
    ],
    "edges": [
      {
        "from": "mpnn",
        "to": "schnet",
        "label": "连续滤波"
      },
      {
        "from": "mpnn",
        "to": "grover",
        "label": "预训练"
      },
      {
        "from": "schnet",
        "to": "dimenet",
        "label": "加入角度"
      },
      {
        "from": "dimenet",
        "to": "gemnet",
        "label": "二面角"
      },
      {
        "from": "gemnet",
        "to": "unimol",
        "label": "3D预训练"
      },
      {
        "from": "unimol",
        "to": "mist",
        "label": "基础模型"
      },
      {
        "from": "unimol",
        "to": "mattersim_mt",
        "label": "材料模拟"
      },
      {
        "from": "grover",
        "to": "chemmlm",
        "label": "多模态"
      },
      {
        "from": "molecular_transformer",
        "to": "flower",
        "label": "物理约束"
      },
      {
        "from": "molecular_transformer",
        "to": "reactome",
        "label": "药用数据"
      },
      {
        "from": "3n_mcts",
        "to": "aizynthfinder",
        "label": "工业化"
      },
      {
        "from": "3n_mcts",
        "to": "localretro",
        "label": "局部预测"
      },
      {
        "from": "3n_mcts",
        "to": "graphretro",
        "label": "半模板"
      },
      {
        "from": "aizynthfinder",
        "to": "synthegy",
        "label": "LLM引导"
      },
      {
        "from": "aizynthfinder",
        "to": "mosaic",
        "label": "实验方案"
      },
      {
        "from": "jt_vae",
        "to": "reinvent4",
        "label": "强化学习"
      },
      {
        "from": "jt_vae",
        "to": "geodiff",
        "label": "扩散模型"
      },
      {
        "from": "geodiff",
        "to": "edm",
        "label": "等变性"
      },
      {
        "from": "edm",
        "to": "cocograph",
        "label": "约束协作"
      },
      {
        "from": "edm",
        "to": "propmolflow",
        "label": "物理启发"
      },
      {
        "from": "edm",
        "to": "trajcast",
        "label": "无力MD"
      },
      {
        "from": "oc20",
        "to": "gemnet_oc",
        "label": "几何GNN"
      },
      {
        "from": "gemnet_oc",
        "to": "equiformerv2",
        "label": "等变注意力"
      },
      {
        "from": "equiformerv2",
        "to": "equiformerv3",
        "label": "效率优化"
      },
      {
        "from": "oc20",
        "to": "digcat",
        "label": "AI智能体"
      },
      {
        "from": "moleculenet",
        "to": "attentivefp",
        "label": "注意力"
      },
      {
        "from": "attentivefp",
        "to": "admetpred",
        "label": "高通量"
      }
    ],
    "milestones": [
      "3n_mcts",
      "oc20",
      "mist"
    ]
  },
  "algos": [
    {
      "id": "mpnn",
      "num": 1,
      "name": "MPNN",
      "fullName": "消息传递神经网络 (Message Passing Neural Networks)",
      "year": "2017",
      "org": "Google Research",
      "parent": "—",
      "paperUrl": "https://proceedings.mlr.press/v70/gilmer17a.html",
      "projectUrl": "",
      "category": "representation",
      "motivation": "统一图神经网络框架，在QM9达到化学精度",
      "summary": "MPNN 的核心目标是：统一图神经网络框架，在QM9达到化学精度。",
      "keyPoints": [
        "核心动机：统一图神经网络框架，在QM9达到化学精度",
        "代表机构：Google Research"
      ],
      "detail": "<p>统一图神经网络框架，在QM9达到化学精度</p>"
    },
    {
      "id": "schnet",
      "num": 2,
      "name": "SchNet",
      "fullName": "连续滤波卷积网络 (SchNet)",
      "year": "2017",
      "org": "TU Berlin",
      "parent": "mpnn",
      "paperUrl": "https://arxiv.org/abs/1706.08566",
      "projectUrl": "",
      "category": "representation",
      "motivation": "引入连续滤波器处理原子间距离信息",
      "summary": "SchNet 的核心目标是：引入连续滤波器处理原子间距离信息。",
      "keyPoints": [
        "核心动机：引入连续滤波器处理原子间距离信息",
        "演化来源：继承或改进自 mpnn",
        "代表机构：TU Berlin"
      ],
      "detail": "<p>引入连续滤波器处理原子间距离信息</p>"
    },
    {
      "id": "grover",
      "num": 3,
      "name": "GROVER",
      "fullName": "图表示预训练模型 (GROVER)",
      "year": "2020",
      "org": "腾讯AI Lab",
      "parent": "mpnn",
      "paperUrl": "https://arxiv.org/abs/2007.02835",
      "projectUrl": "",
      "category": "representation",
      "motivation": "集成GNN与Transformer的1亿参数自监督模型",
      "summary": "GROVER 提出了 GTransformer（将动态消息传递网络 dyMPN 与 Transformer 多头注意力深度融合）作为骨干网络，在 1000 万无标注分子上通过节点级上下文属性预测、边级上下文属性预测和图级功能基团预测三层自监督任务进行预训练，在 11 个分子性质预测基准上全面超越此前 SOTA，平均相对提升 6.1%。",
      "keyPoints": [
        "<strong>GTransformer 架构</strong>：将 dyMPN（动态消息传递网络，每层随机化跳数 \\(K_l\\)）作为 Transformer 中 Q/K/V 的生成器，替代传统线性投影，使注意力机制天然感知图拓扑结构",
        "<strong>双视图设计</strong>：节点级 GTransformer 和边级 GTransformer 并行处理，分别以节点和边为中心聚合信息，最终通过 readout 融合两个视图的表示",
        "<strong>动态消息传递 (dyMPN)</strong>：每一层随机采样消息传递跳数 \\(K_l \\sim \\text{Uniform}[1, K]\\)，起到类似 DropOut 的正则化效果，提升泛化能力",
        "<strong>长程残差连接</strong>：跨 GTransformer 层的残差连接缓解深层 GNN 的过平滑问题",
        "<strong>三级自监督预训练任务</strong>：",
        "节点级/边级：上下文属性预测（Contextual Property Prediction）——提取 k-hop 子图中 (节点类型, 边类型) 对的统计分布作为上下文属性标签",
        "图级：功能基团预测（Graph-level Motif Prediction）——多标签分类预测 85 种 RDKit 提取的官能团",
        "<strong>大规模预训练</strong>：GROVER_base（~48M 参数）和 GROVER_large（~100M 参数），在 ZINC15 + ChEMBL 共约 1000 万分子上预训练，使用 250 块 V100 GPU",
        "<strong>11 个基准全面 SOTA</strong>：6 个分类任务（ROC-AUC）和 5 个回归任务（RMSE）上均取得最优或接近最优结果，分类平均提升 2.2%，回归平均提升 10.8%"
      ],
      "detail": "<h5>整体架构</h5>\n<p><img alt=\"GROVER 完整架构图\" src=\"https://ar5iv.labs.arxiv.org/html/2007.02835/assets/x8.png\" />\n<em>图：GROVER 完整架构。左侧为节点级 GTransformer，右侧为边级 GTransformer，两个视图并行处理后通过 readout 层融合。每个 GTransformer 层内部由 dyMPN + 多头注意力 + 前馈网络组成。</em></p>\n<p>GROVER 的核心思想是：<strong>将 GNN 的消息传递机制嵌入 Transformer 架构内部</strong>，而非简单地将两者串联。具体来说，传统 Transformer 中通过线性变换生成 Q、K、V，而 GTransformer 用 dyMPN（动态消息传递网络）替代这些线性变换，使得每个注意力头的查询/键/值都携带了局部图拓扑信息。</p>\n<p><img alt=\"GTransformer 单层结构\" src=\"https://ar5iv.labs.arxiv.org/html/2007.02835/assets/x1.png\" />\n<em>图：GTransformer 单层结构。dyMPN 替代线性投影生成 Q、K、V，随后进入标准多头注意力和前馈网络。</em></p>\n<h5>GTransformer 与 dyMPN 核心机制</h5>\n<p><strong>动态消息传递网络 (dyMPN)</strong> 是 GROVER 的关键创新之一。在标准 MPNN 中，消息传递的跳数（depth）在所有层中固定。dyMPN 在每一层 \\(l\\) 中随机采样跳数：</p>\n<p>$$K_l \\sim \\text{Uniform}[1, K]$$</p>\n<p>其中 \\(K\\) 是预设的最大跳数。这种随机化机制有两个好处：(1) 每次前向传播看到不同大小的感受野，起到数据增强和正则化的效果；(2) 避免固定深度带来的过平滑问题。</p>\n<p>对于节点 \\(v\\) 在第 \\(l\\) 层的消息传递，dyMPN 执行 \\(K_l\\) 步迭代：</p>\n<p>$$m_v^{(t)} = \\sum_{u \\in \\mathcal{N}(v)} M_t(h_v^{(t-1)}, h_u^{(t-1)}, e_{uv}), \\quad t = 1, \\ldots, K_l$$</p>\n<p>$$h_v^{(t)} = U_t(h_v^{(t-1)}, m_v^{(t)})$$</p>\n<p>其中 \\(M_t\\) 为消息函数，\\(U_t\\) 为更新函数，\\(e_{uv}\\) 为边特征。最终 \\(h_v^{(K_l)}\\) 作为该层的输出。</p>\n<p><strong>GTransformer 层</strong> 的完整计算流程为：</p>\n<p>$$Q = \\text{dyMPN}_Q(H^{(l-1)}), \\quad K = \\text{dyMPN}_K(H^{(l-1)}), \\quad V = \\text{dyMPN}_V(H^{(l-1)})$$</p>\n<p>$$\\text{Attn}(Q, K, V) = \\text{softmax}\\left(\\frac{QK^T}{\\sqrt{d_k}}\\right)V$$</p>\n<p>$$H^{(l)} = \\text{FFN}(\\text{Attn}(Q, K, V)) + H^{(l-1)}$$</p>\n<div class=\"key-point\">💡 <strong>关键直觉</strong>：传统 Transformer 的注意力权重仅基于特征相似度，而 GTransformer 的注意力权重隐式编码了图拓扑距离——因为 Q 和 K 本身就是通过消息传递在局部子图上聚合得到的。这使得注意力机制能够同时捕获<strong>局部化学键连接模式</strong>和<strong>全局分子结构关系</strong>。</div>\n<p><strong>双视图并行处理</strong>：GROVER 同时运行两个 GTransformer——一个以节点（原子）为中心，一个以边（化学键）为中心。两者共享相同的架构但参数独立，最终通过 readout 函数（如均值池化 + 拼接）融合两个视图的表示，生成分子级别的嵌入向量。</p>\n<h5>自监督预训练任务</h5>\n<p><img alt=\"自监督任务示意图\" src=\"https://ar5iv.labs.arxiv.org/html/2007.02835/assets/x2.png\" />\n<em>图：GROVER 的自监督预训练任务。左：上下文属性预测（节点/边级）；右：功能基团预测（图级）。</em></p>\n<p>GROVER 设计了三个层级的自监督任务，覆盖从局部到全局的分子信息：</p>\n<p><strong>1. 上下文属性预测 (Contextual Property Prediction)</strong></p>\n<p><img alt=\"上下文属性提取\" src=\"https://ar5iv.labs.arxiv.org/html/2007.02835/assets/x3.png\" />\n<em>图：上下文属性的提取过程。对目标节点提取 k-hop 子图，统计子图中 (节点类型, 边类型) 对的出现频次，形成上下文属性字符串。</em></p>\n<p>对于每个节点 \\(v\\)，提取其 \\(k\\)-hop 邻域子图 \\(\\mathcal{G}_k(v)\\)，统计子图中所有 (原子类型, 键类型) 对的出现次数，将这些计数排序后拼接成一个字符串，作为该节点的<strong>上下文属性标签</strong>。例如，一个碳原子的 1-hop 邻域中有 2 个 C-单键、1 个 N-双键，则其上下文属性为 <code>\"C-single:2,N-double:1\"</code>。</p>\n<p>训练时，随机遮蔽 15% 的节点/边标签，让模型预测被遮蔽位置的上下文属性类别（多分类任务）。实验中 \\(k=1\\)，共提取出 2518 种节点上下文属性和 2686 种边上下文属性。</p>\n<div class=\"warn-box\">⚠️ <strong>与 BERT 的类比</strong>：上下文属性预测类似于 BERT 的 Masked Language Model，但不是简单地预测原子类型，而是预测<strong>原子在其化学环境中的角色</strong>——这编码了更丰富的局部化学信息。</div>\n<p><strong>2. 功能基团预测 (Graph-level Motif Prediction)</strong></p>\n<p>在图级别，使用 RDKit 工具包提取每个分子中存在的 85 种官能团（如羟基 -OH、羧基 -COOH、苯环等），构建多标签分类任务。模型需要从分子图的全局表示中预测哪些官能团存在。</p>\n<p>这一任务迫使模型学习<strong>全局化学结构模式</strong>，与局部的上下文属性预测形成互补。</p>\n<pre><code class=\"language-python\"># GROVER 预训练伪代码\nfor batch in unlabeled_molecules:\n    # 1. 双视图编码\n    node_repr = NodeGTransformer(batch.graph)   # 节点视图\n    edge_repr = EdgeGTransformer(batch.graph)   # 边视图\n    graph_repr = Readout(node_repr, edge_repr)  # 图级表示\n\n    # 2. 节点级上下文属性预测 (随机遮蔽 15%)\n    masked_nodes = random_mask(batch.nodes, ratio=0.15)\n    loss_node_ctx = CrossEntropy(\n        predict(node_repr[masked_nodes]),\n        contextual_property_labels[masked_nodes]  # 2518 类\n    )\n\n    # 3. 边级上下文属性预测 (随机遮蔽 15%)\n    masked_edges = random_mask(batch.edges, ratio=0.15)\n    loss_edge_ctx = CrossEntropy(\n        predict(edge_repr[masked_edges]),\n        contextual_property_labels[masked_edges]  # 2686 类\n    )\n\n    # 4. 图级功能基团预测\n    loss_motif = BCELoss(\n        predict(graph_repr),\n        functional_group_labels  # 85 维多标签\n    )\n\n    # 5. 联合优化\n    loss = loss_node_ctx + loss_edge_ctx + loss_motif\n    optimizer.step(loss)\n</code></pre>\n<h5>与传统方法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>传统 GNN (MPNN/GIN)</th>\n<th>Hu et al. (2020) 预训练</th>\n<th><strong>GROVER</strong></th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>骨干网络</td>\n<td>固定深度消息传递</td>\n<td>GIN + 线性层</td>\n<td>GTransformer (dyMPN + 注意力)</td>\n</tr>\n<tr>\n<td>预训练数据</td>\n<td>无</td>\n<td>~2M 分子</td>\n<td><strong>~10M 分子</strong></td>\n</tr>\n<tr>\n<td>预训练任务</td>\n<td>无</td>\n<td>节点/边属性预测 + 图属性预测</td>\n<td><strong>上下文属性预测 + 功能基团预测</strong></td>\n</tr>\n<tr>\n<td>参数规模</td>\n<td>~1-5M</td>\n<td>~2-5M</td>\n<td><strong>48M-100M</strong></td>\n</tr>\n<tr>\n<td>注意力机制</td>\n<td>无/简单 GAT</td>\n<td>无</td>\n<td><strong>拓扑感知多头注意力</strong></td>\n</tr>\n<tr>\n<td>正则化</td>\n<td>Dropout</td>\n<td>Dropout</td>\n<td><strong>dyMPN 随机跳数 + Dropout</strong></td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 <strong>核心区别</strong>：Hu et al. (2020) 的预训练任务直接预测原子/键的化学属性（如原子序数、键类型），这些信息在输入特征中已经存在，模型可能学到\"捷径\"。GROVER 的上下文属性预测要求模型理解<strong>原子在化学环境中的角色</strong>，是一种更高层次的语义信息，迫使模型学习更有意义的表示。</div>\n<h5>实验结果</h5>\n<p>GROVER 在 MoleculeNet 基准的 11 个数据集上进行了评估，使用 scaffold split（基于分子骨架的划分，更接近真实应用场景）：</p>\n<p><strong>分类任务 (ROC-AUC ↑)</strong>：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>数据集</th>\n<th>DMPNN</th>\n<th>Hu et al.</th>\n<th>GROVER_base</th>\n<th><strong>GROVER_large</strong></th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>BBBP</td>\n<td>0.919</td>\n<td>0.915</td>\n<td>0.936</td>\n<td><strong>0.940</strong></td>\n</tr>\n<tr>\n<td>SIDER</td>\n<td>0.632</td>\n<td>0.614</td>\n<td>0.656</td>\n<td><strong>0.658</strong></td>\n</tr>\n<tr>\n<td>ClinTox</td>\n<td>0.897</td>\n<td>0.762</td>\n<td>0.925</td>\n<td><strong>0.944</strong></td>\n</tr>\n<tr>\n<td>BACE</td>\n<td>0.852</td>\n<td>0.851</td>\n<td>0.878</td>\n<td><strong>0.894</strong></td>\n</tr>\n<tr>\n<td>Tox21</td>\n<td>0.826</td>\n<td>0.811</td>\n<td>0.819</td>\n<td><strong>0.831</strong></td>\n</tr>\n<tr>\n<td>ToxCast</td>\n<td>0.718</td>\n<td>0.714</td>\n<td>0.723</td>\n<td><strong>0.737</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>回归任务 (RMSE ↓)</strong>：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>数据集</th>\n<th>DMPNN</th>\n<th>AttentiveFP</th>\n<th>GROVER_base</th>\n<th><strong>GROVER_large</strong></th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>FreeSolv</td>\n<td>2.177</td>\n<td>2.030</td>\n<td>1.592</td>\n<td><strong>1.544</strong></td>\n</tr>\n<tr>\n<td>ESOL</td>\n<td>0.980</td>\n<td>0.853</td>\n<td>0.888</td>\n<td><strong>0.831</strong></td>\n</tr>\n<tr>\n<td>Lipo</td>\n<td>0.653</td>\n<td>0.650</td>\n<td>0.563</td>\n<td><strong>0.560</strong></td>\n</tr>\n<tr>\n<td>QM7</td>\n<td>105.8</td>\n<td>126.7</td>\n<td><strong>72.5</strong></td>\n<td>72.6</td>\n</tr>\n<tr>\n<td>QM8</td>\n<td>0.0143</td>\n<td>0.0282</td>\n<td>0.0172</td>\n<td><strong>0.0125</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p>GROVER_large 在全部 11 个数据集上取得最优结果，整体相对提升 6.1%（分类 2.2%，回归 10.8%）。尤其在小数据集 FreeSolv（仅 642 个标注分子）上取得了 23.9% 的相对提升，验证了预训练对低资源场景的显著增益。</p>\n<p><strong>消融实验关键发现</strong>：\n- <strong>预训练 vs 无预训练</strong>：自监督预训练带来平均 +3.8% AUC 提升，小数据集（SIDER、ClinTox、BACE）提升更大\n- <strong>GTransformer vs GIN/MPNN 骨干</strong>：在相同参数量（~38M）下，GTransformer 的训练和验证损失均优于 GIN 和 MPNN\n- <strong>dyMPN 的作用</strong>：移除 dyMPN（固定跳数）后训练损失略优但验证损失变差，说明 dyMPN 的随机化机制提升了泛化能力\n- <strong>GTransformer vs 简单拼接</strong>：将 GTransformer 替换为原始 Transformer（即 GNN 输出直接送入标准 Transformer）效果最差，说明<strong>不能简单地将 GNN 和 Transformer 串联</strong>，必须深度融合</p>",
      "quiz": {
        "q": "GROVER 中 GTransformer 与标准 Transformer 的核心区别是什么？",
        "options": [
          "GTransformer 使用更多的注意力头数",
          "GTransformer 用动态消息传递网络 (dyMPN) 替代线性投影来生成 Q、K、V",
          "GTransformer 移除了前馈网络层以减少参数",
          "GTransformer 使用图卷积网络替代了 softmax 注意力计算"
        ],
        "answer": 1,
        "explain": "GTransformer 的核心创新是用 dyMPN 替代标准 Transformer 中生成 Q/K/V 的线性投影层，使注意力机制天然感知图拓扑结构，而非简单地将 GNN 和 Transformer 串联。"
      }
    },
    {
      "id": "dimenet",
      "num": 4,
      "name": "DimeNet",
      "fullName": "方向性消息传递网络 (DimeNet)",
      "year": "2020",
      "org": "TU Munich",
      "parent": "schnet",
      "paperUrl": "https://arxiv.org/abs/2003.03123",
      "projectUrl": "",
      "category": "representation",
      "motivation": "加入角度信息提升3D构象区分度",
      "summary": "DimeNet 通过在消息传递中引入原子间键角的方向信息，并使用球面 Fourier-Bessel 基函数联合表示距离和角度，使 GNN 首次能够区分仅靠距离无法区分的分子构型，在 QM9 基准上平均误差降低 31%。",
      "keyPoints": [
        "<strong>方向消息传递</strong>：消息定义在原子对（边）上而非节点上，聚合时引入键角 \\(\\alpha_{(kj,ji)}\\)，直接建模力场中的键角弯曲项",
        "<strong>球面 Fourier-Bessel 2D 基</strong>：从薛定谔方程推导正交基函数，联合表示距离 \\(d_{kj}\\) 和角度 \\(\\alpha_{(kj,ji)}\\)，提供物理归纳偏置",
        "<strong>径向 Bessel 基</strong>：仅 16 个基函数（SchNet 用 300 个高斯），参数效率提升 20 倍且性能更优",
        "<strong>连续可微设计</strong>：Swish 激活 + 包络函数（三重零点截断），支持通过反向传播预测原子力",
        "<strong>QM9 SOTA</strong>：12 个量子化学目标中 11 个达到最优，平均标准化 MAE 降低 31%",
        "<strong>MD17 分子动力学</strong>：1000 样本下大幅超越 SchNet，与手工特征的 sGDML 持平",
        "<strong>消融验证</strong>：去掉角度信息误差 +26%，退化为节点嵌入误差 +68%，Bessel 基替换高斯基误差 -10%"
      ],
      "detail": "<h5>核心架构示意</h5>\n<p><img alt=\"DimeNet Architecture\" src=\"https://raw.githubusercontent.com/gasteigerjo/dimenet/master/2dfilter_crop.png\" />\n<em>图：DimeNet 架构总览——Embedding Block 生成初始消息嵌入，多个 Interaction Block 通过方向消息传递迭代更新，每层输出经 Output Block 汇聚为最终预测。</em></p>\n<pre><code>┌─────────────────────────────────────────────────────────────┐\n│                      DimeNet 架构                            │\n│                                                              │\n│  原子类型 z, 坐标 x                                          │\n│    │                                                         │\n│    ▼  计算: d_ji → e_RBF ;  d_kj, α_(kj,ji) → a_SBF        │\n│  ┌────────────┐                                              │\n│  │ Embedding   │ m_ji^(1) = σ([h_j ∥ h_i ∥ e_RBF] W + b)   │\n│  └─────┬──────┘                                              │\n│        │                                                     │\n│        ▼  ×T 层                                              │\n│  ┌────────────┐  m_ji^(l+1) = f_update(m_ji^(l),            │\n│  │ Interaction │       Σ_{k∈N_j\\i} f_int(m_kj, e_RBF, a_SBF))│\n│  └─────┬──────┘                                              │\n│        │  每层 → Output Block                                │\n│        ▼                                                     │\n│  ┌────────────┐  t_i^(l) = MLP(Σ_j (e_RBF ⊙ W)·m_ji)      │\n│  │  Output     │  t = Σ_i Σ_l t_i^(l)                       │\n│  └────────────┘                                              │\n└─────────────────────────────────────────────────────────────┘\n</code></pre>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># DimeNet 前向传播核心逻辑\ndef DimeNet_forward(atom_types, positions, cutoff=5.0):\n    # 1. 构建邻居图 &amp; 计算几何特征\n    edges = {(j,i) for all pairs where ||x_j - x_i|| &lt; cutoff}\n    d_ji = ||x_j - x_i||                          # 原子间距离\n    alpha_kji = angle(x_k, x_j, x_i)              # 三体键角\n\n    # 2. 基函数表示 (Sec.5)\n    e_RBF = envelope(d_ji) * sqrt(2/c) * sin(n*π*d_ji/c) / d_ji   # Eq.7, n=1..16\n    a_SBF = envelope(d_kj) * j_l(z_ln/c * d_kj) * Y_l^0(alpha)   # Eq.6, 2D基\n\n    # 3. Embedding Block (Eq.9)\n    h_i = learnable_embedding[atom_types[i]]       # F维原子嵌入\n    m_ji = swish(concat(h_j, h_i, e_RBF) @ W + b) # 初始消息嵌入\n\n    # 4. 累积输出\n    t = output_block(m_ji, e_RBF)\n\n    # 5. T个 Interaction Block (Eq.4)\n    for l in range(T):\n        for each (j, i) in edges:\n            # 交互: 利用角度+距离的2D表示\n            x_kj = W_bilinear @ a_SBF              # 双线性变换\n            inter = sum_k( (m_kj @ W) * x_kj )     # 聚合邻居消息\n            # 更新: 残差块\n            m_ji = residual(m_ji + inter)\n            m_ji = m_ji * (e_RBF @ W_rbf)          # 径向调制\n        t += output_block(m_ji, e_RBF)\n\n    return sum_over_atoms(t)                        # 分子级预测\n</code></pre>\n<h5>动机与背景：为什么距离不够？</h5>\n<p>传统分子 GNN（如 SchNet、PhysNet）仅使用原子间距离 \\(d_{ji} = \\|x_j - x_i\\|\\) 作为几何信息。论文从两个互补视角论证了这一局限性。<strong>物理视角</strong>：经典分子力场包含键伸缩项 \\(E_{\\text{bond}}(d)\\)（仅依赖距离）和键角弯曲项 \\(E_{\\text{angle}}(\\alpha)\\)（依赖角度），仅用距离的模型只能建模前者，无法捕获后者。<strong>图论视角</strong>：仅使用距离的 GNN 等价于 1-WL 图同构测试，存在理论上无法区分的分子对——论文给出精妙反例：正六边形与两个等边三角形具有完全相同的距离多重集 \\(\\{d, d, d, d, d, d, \\sqrt{3}d, \\sqrt{3}d, \\sqrt{3}d, 2d, ...\\}\\)，但化学性质截然不同。</p>\n<h5>核心机制：方向消息传递</h5>\n<p>DimeNet 的关键创新是将消息定义在<strong>原子对</strong>（有向边）\\((j, i)\\) 上，而非原子（节点）上。更新消息 \\(m_{ji}\\) 时，聚合所有从邻居 \\(k\\) 到 \\(j\\) 的入射消息 \\(m_{kj}\\)，并利用三体键角 \\(\\alpha_{(kj,ji)} = \\angle x_k x_j x_i\\)：</p>\n<p>$$m_{ji}^{(l+1)} = f_{\\text{update}}\\Big(m_{ji}^{(l)},\\; \\sum_{k \\in \\mathcal{N}_j \\setminus \\{i\\}} f_{\\text{int}}(m_{kj}^{(l)},\\; e_{\\text{RBF}}^{(ji)},\\; a_{\\text{SBF}}^{(kj,ji)})\\Big)$$</p>\n<p>这一设计的三重优势：(1) 消息嵌入自然与方向关联，\\(m_{ji}\\) 对应从 \\(j\\) 到 \\(i\\) 的方向；(2) 键角 \\(\\alpha_{(kj,ji)}\\) 是旋转不变量，保证模型对全局旋转不变；(3) 消息嵌入等价于原子对嵌入，对应更高阶的 WL 测试，理论表达能力更强。</p>\n<div class=\"key-point\">💡 <strong>关键直觉</strong>：与等变 CNN 在固定全局方向上应用滤波器不同，DimeNet 在每个邻居的<strong>局部方向</strong>上应用相同的学习滤波器，因此对全局旋转保持等变性，同时保留了邻居间的相对方向信息。</div>\n<h5>物理启发的基表示：从薛定谔方程到 Fourier-Bessel</h5>\n<p>这是论文最优雅的部分。作者从量子力学第一性原理出发构建基函数：</p>\n<ol>\n<li>DFT 计算的目标是电子密度 \\(\\langle\\Psi|\\Psi\\rangle\\)，波函数 \\(\\Psi\\) 满足薛定谔方程</li>\n<li>在截断距离 \\(c\\) 内设 \\(V=0\\)，外部 \\(V=\\infty\\)，简化为 Helmholtz 方程 \\((\\nabla^2 + k^2)\\Psi = 0\\)</li>\n<li>极坐标分离变量得到球面 Bessel 函数 \\(j_l\\) 和球面谐波 \\(Y_l^m\\) 的乘积</li>\n</ol>\n<p>取 \\(m=0\\) 得到仅依赖 \\(d\\) 和 \\(\\alpha\\) 的 2D 球面 Fourier-Bessel 基：</p>\n<p>$$\\tilde{a}_{\\text{SBF},ln}(d, \\alpha) = \\sqrt{\\frac{2}{c^3 j_{l+1}^2(z_{ln})}} \\; j_l\\!\\left(\\frac{z_{ln}}{c}d\\right) Y_l^0(\\alpha)$$</p>\n<p>径向基取 \\(l=m=0\\)，利用 \\(j_0(x) = \\sin(x)/x\\)：</p>\n<p>$$\\tilde{e}_{\\text{RBF},n}(d) = \\sqrt{\\frac{2}{c}} \\; \\frac{\\sin(n\\pi d / c)}{d}$$</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：这些基函数的最高频率被 \\(N_{\\text{SHB}}\\) 和 \\(N_{\\text{RBF}}\\) 自然限制，提供了有效的正则化——仅 16 个径向基函数即可替代 SchNet 的 300 个高斯基函数（参数效率提升 20 倍）。</div>\n<h5>连续可微性与力预测</h5>\n<p>DimeNet 需要二阶连续可微以通过反向传播预测原子力（\\(\\mathbf{F}_i = -\\nabla_{x_i} E\\)）。三处关键设计：(a) Swish 激活函数 \\(\\sigma(x) = x \\cdot \\text{sigmoid}(x)\\) 替代 ReLU；(b) 包络函数 \\(u(d)\\) 在截断距离 \\(c\\) 处有三重零点，确保基函数及其一、二阶导数在截断处连续归零；(c) 仅使用原子类型和坐标，不依赖辅助数据。这些设计使 DimeNet 既能预测分子性质，又能用于分子动力学模拟，且预测的力天然满足能量守恒。</p>\n<h5>实验亮点</h5>\n<p>在 QM9 基准（~130k 分子）上，DimeNet 在 12 个量子化学性质中 11 个达到 SOTA，平均标准化 MAE 比第二名（PhysNet）降低 31%。在 MD17 分子动力学基准（仅 1000 训练样本）上，大幅超越 SchNet 并与手工特征的 sGDML 持平。消融实验清晰量化了各组件贡献：Bessel 基替换高斯基降低 10% 误差；去掉角度信息误差增加 26%；退化为节点嵌入误差增加 68%。学到的 2D 滤波器在苯环特征角度（120°）和 C-C 键距离（1.39Å）处被激活，证实模型确实学会了利用方向信息。</p>",
      "quiz": {
        "q": "DimeNet 相比 SchNet 等传统分子 GNN 的核心创新是什么？",
        "options": [
          "使用 Transformer 注意力机制替代消息传递",
          "在消息传递中引入原子间键角信息，将消息定义在原子对而非原子上",
          "使用更大的截断距离以包含更多邻居原子",
          "引入预训练策略提升小数据集性能"
        ],
        "answer": 1,
        "explain": "DimeNet 的核心创新是方向消息传递——将消息定义在原子对（边）上并在聚合时利用键角 α_(kj,ji)，使模型能区分仅靠距离无法区分的分子构型。"
      }
    },
    {
      "id": "gemnet",
      "num": 5,
      "name": "GemNet",
      "fullName": "几何消息传递网络 (GemNet)",
      "year": "2021",
      "org": "TU Munich",
      "parent": "dimenet",
      "paperUrl": "https://arxiv.org/abs/2106.08903",
      "projectUrl": "",
      "category": "representation",
      "motivation": "引入二面角和两步消息传递，成为3D图通用近似器",
      "summary": "GemNet 的核心目标是：引入二面角和两步消息传递，成为3D图通用近似器。",
      "keyPoints": [
        "核心动机：引入二面角和两步消息传递，成为3D图通用近似器",
        "演化来源：继承或改进自 dimenet",
        "代表机构：TU Munich"
      ],
      "detail": "<p>引入二面角和两步消息传递，成为3D图通用近似器</p>"
    },
    {
      "id": "unimol",
      "num": 6,
      "name": "Uni-Mol",
      "fullName": "通用分子表示框架 (Uni-Mol)",
      "year": "2023",
      "org": "DP Technology",
      "parent": "gemnet",
      "paperUrl": "https://arxiv.org/abs/2302.12600",
      "projectUrl": "",
      "category": "representation",
      "motivation": "3D空间位置预训练，统一性质预测与对接任务",
      "summary": "Uni-Mol 提出了首个通用的 3D 分子预训练框架，通过高效的 SE(3)-invariant Transformer 骨干网络在 2.09 亿分子构象和 300 万蛋白口袋数据上进行预训练，利用 3D 坐标去噪和掩码原子预测两个自监督任务学习 3D 空间表示，在分子性质预测（14/15 SOTA）、蛋白-配体对接和构象生成等下游任务上全面超越现有方法。",
      "keyPoints": [
        "<strong>双模型预训练架构</strong>：分子模型（209M 构象预训练）和口袋模型（3M 蛋白口袋预训练）共享同一 SE(3) Transformer 骨干",
        "<strong>高效 SE(3) Transformer 骨干</strong>：基于 Pre-LayerNorm Transformer，引入原子表示（atom representation）和对表示（pair representation）双通道，通过不变性空间位置编码（Euclidean 距离 + Gaussian 核）编码 3D 信息",
        "<strong>双向通信机制</strong>：atom-to-pair（QK 乘积更新 pair 表示）和 pair-to-atom（pair 表示作为注意力偏置），实现原子级与对级表示的信息交互",
        "<strong>两个预训练任务</strong>：3D 坐标去噪恢复（coordinate denoising）+ 15% 掩码原子类型预测（masked atom prediction）",
        "<strong>3D 坐标直接输入/输出</strong>：首个能直接以 3D 坐标作为输入和输出的分子预训练框架，支持构象生成和对接等 3D 空间任务",
        "<strong>多任务微调策略</strong>：分子性质预测（CLS token + MLP）、构象生成（迭代坐标优化）、对接（双模型联合 + 距离矩阵打分）",
        "<strong>MoleculeNet 14/15 SOTA</strong>；CASF-2016 对接 Top-1 成功率 91.2%；RMSD ≤ 2Å 占比 80.35%（较最佳基线提升 22.58%）"
      ],
      "detail": "<p><img alt=\"Uni-Mol 框架总览\" src=\"https://raw.githubusercontent.com/deepmodeling/Uni-Mol/main/unimol/figure/overview.png\" />\n<em>图：Uni-Mol 预训练与微调框架示意。上方为预训练阶段（分子模型 + 口袋模型），下方为多种下游任务微调。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># Uni-Mol 骨干网络前向传播伪代码\ndef unimol_forward(atom_types, coordinates, n_layers):\n    # 初始化\n    x = Embedding(atom_types)                          # atom repr: [N, d]\n    d_ij = pairwise_euclidean(coordinates)             # [N, N]\n    q = gaussian_kernel(d_ij, pair_types)              # pair repr: [N, N, H]\n\n    for l in range(n_layers):\n        # === Self-Attention with pair-to-atom communication ===\n        Q, K, V = linear_qkv(LayerNorm(x))            # [N, H, d/H]\n        attn_logits = Q @ K.T / sqrt(d) + q           # pair repr as bias\n        attn_weights = softmax(attn_logits)\n        x = x + attn_weights @ V                      # update atom repr\n\n        # === Atom-to-pair communication ===\n        q = q + concat_heads(Q @ K.T / sqrt(d))       # QK product → pair repr\n\n        # === FFN ===\n        x = x + FFN(LayerNorm(x))\n\n    return x, q  # atom representations, pair representations\n\n# 预训练任务\ndef pretrain_step(atom_types, coordinates):\n    # 1. 掩码原子预测：随机掩码 15% 原子\n    masked_types, mask_indices = random_mask(atom_types, ratio=0.15)\n\n    # 2. 坐标去噪：对坐标添加均匀噪声\n    noisy_coords = coordinates + uniform_noise(-1, 1)\n\n    # 前向传播\n    x, q = unimol_forward(masked_types, noisy_coords, N)\n\n    # 损失计算\n    L_atom = CrossEntropy(atom_head(x[mask_indices]), atom_types[mask_indices])\n    L_coord = SmoothL1(coord_head(x, q), coordinates)  # 恢复原始坐标\n    L_dist = SmoothL1(dist_head(q), pairwise_dist(coordinates))  # 恢复原子对距离\n    return L_atom + L_coord + L_dist\n</code></pre>\n<h5>动机与背景</h5>\n<p>分子表示学习（MRL）在药物设计中至关重要，但现有方法存在根本性局限：<strong>大多数方法将分子视为 1D 序列（SMILES）或 2D 拓扑图，无法充分利用决定分子性质的 3D 空间信息</strong>。虽然部分工作（如 GraphMVP、GEM）尝试引入 3D 信息，但它们仅将 3D 作为辅助监督信号，无法直接以 3D 坐标作为输入/输出，因此无法处理构象生成、对接等真正的 3D 空间任务。Uni-Mol 的核心动机是构建一个<strong>纯 3D 的通用分子预训练框架</strong>，让 3D 坐标既是输入也是输出。</p>\n<h5>核心机制：SE(3)-Invariant Transformer</h5>\n<p>Uni-Mol 选择 Transformer 而非 GNN 作为骨干，原因在于 Transformer 的全连接注意力能捕获<strong>长程原子间交互</strong>，而 GNN 受限于局部连接图。但标准 Transformer 无法处理 3D 空间数据，因此 Uni-Mol 引入了以下关键修改：</p>\n<p><strong>1. 不变性空间位置编码（Invariant Spatial Positional Encoding）</strong></p>\n<p>给定原子坐标 \\(\\mathbf{r}_i, \\mathbf{r}_j\\)，计算欧氏距离：</p>\n<p>$$d_{ij} = \\|\\mathbf{r}_i - \\mathbf{r}_j\\|_2$$</p>\n<p>然后通过对类型感知的 Gaussian 核将标量距离映射为向量表示：</p>\n<p>$$\\phi_k(d_{ij}) = \\exp\\left(-\\beta_k (d_{ij} - \\mu_k)^2\\right), \\quad k = 1, \\ldots, K$$</p>\n<p>其中 \\(\\mu_k\\) 和 \\(\\beta_k\\) 是可学习参数。这种编码对全局旋转和平移不变（SE(3)-invariant），因为仅依赖原子对距离。</p>\n<p><strong>2. 双通道表示与双向通信</strong></p>\n<p>Uni-Mol 维护两种表示：\n- <strong>原子表示</strong> \\(\\mathbf{x}_i \\in \\mathbb{R}^d\\)：由原子类型嵌入初始化\n- <strong>对表示</strong> \\(\\mathbf{q}_{ij} \\in \\mathbb{R}^H\\)：由空间位置编码初始化</p>\n<p>两者通过双向通信机制交互：</p>\n<p><strong>Pair-to-Atom</strong>（对表示作为注意力偏置）：</p>\n<p>$$\\text{Attention}(\\mathbf{Q}_i^{l,h}, \\mathbf{K}_j^{l,h}, \\mathbf{V}_j^{l,h}) = \\text{softmax}\\left(\\frac{\\mathbf{Q}_i^{l,h} (\\mathbf{K}_j^{l,h})^T}{\\sqrt{d}} + q_{ij}^{l-1,h}\\right) \\mathbf{V}_j^{l,h}$$</p>\n<div class=\"key-point\">💡 <strong>关键直觉</strong>：对表示 \\(q_{ij}\\) 编码了原子 \\(i, j\\) 之间的空间距离信息，将其加到注意力 logits 上，使得空间上更近的原子对获得更高的注意力权重，从而让模型\"感知\"3D 结构。</div>\n<p><strong>Atom-to-Pair</strong>（QK 乘积更新对表示）：</p>\n<p>$$\\mathbf{q}_{ij}^{l+1} = \\mathbf{q}_{ij}^l + \\left\\{\\frac{\\mathbf{Q}_i^{l,h} (\\mathbf{K}_j^{l,h})^T}{\\sqrt{d}} \\;\\middle|\\; h \\in [1, H]\\right\\}$$</p>\n<div class=\"key-point\">💡 <strong>关键直觉</strong>：注意力的 QK 乘积反映了原子间的语义相关性，将其反馈到对表示中，使得对表示不仅包含几何距离信息，还融合了化学语义信息。</div>\n<p><strong>3. 坐标预测头（SE(3)-Equivariant Output）</strong></p>\n<p>虽然内部表示是 SE(3)-invariant 的，但 Uni-Mol 通过巧妙的坐标预测头实现了 SE(3)-equivariant 的坐标输出：</p>\n<p>$$\\Delta \\mathbf{r}_i = \\frac{1}{N} \\sum_{j \\neq i} f(\\mathbf{q}_{ij}) \\cdot \\frac{\\mathbf{r}_i - \\mathbf{r}_j}{\\|\\mathbf{r}_i - \\mathbf{r}_j\\| + \\epsilon}$$</p>\n<p>其中 \\(f(\\cdot)\\) 是从对表示到标量的映射。方向向量 \\(\\frac{\\mathbf{r}_i - \\mathbf{r}_j}{\\|\\mathbf{r}_i - \\mathbf{r}_j\\|}\\) 提供等变性，而 \\(f(\\mathbf{q}_{ij})\\) 提供不变的标量权重。</p>\n<h5>预训练策略</h5>\n<p>Uni-Mol 使用两个互补的预训练任务：</p>\n<p><strong>任务 1：3D 坐标去噪恢复（Coordinate Denoising）</strong></p>\n<p>对输入坐标添加均匀噪声 \\(\\boldsymbol{\\delta} \\sim U(-1, 1)\\)，模型需恢复原始坐标。损失包含两部分：</p>\n<p>$$\\mathcal{L}_{\\text{coord}} = \\frac{1}{N}\\sum_i \\text{SmoothL1}(\\hat{\\mathbf{r}}_i, \\mathbf{r}_i) + \\frac{1}{N^2}\\sum_{i,j} \\text{SmoothL1}(\\hat{d}_{ij}, d_{ij})$$</p>\n<p>第一项直接监督坐标恢复，第二项监督原子对距离恢复，两者共同约束 3D 结构重建。</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：坐标去噪任务的设计灵感来自去噪自编码器（Denoising Autoencoder），但应用在 3D 空间中——这迫使模型学习原子间的空间关系和化学键约束，而不仅仅是记忆坐标值。</div>\n<p><strong>任务 2：掩码原子预测（Masked Atom Prediction）</strong></p>\n<p>随机掩码 15% 的原子类型（替换为特殊 [MASK] token），模型预测被掩码原子的类型。这类似于 BERT 的 MLM 任务，但在 3D 上下文中进行：</p>\n<p>$$\\mathcal{L}_{\\text{atom}} = -\\frac{1}{|\\mathcal{M}|}\\sum_{i \\in \\mathcal{M}} \\log P(\\text{type}_i | \\mathbf{x}_i)$$</p>\n<h5>微调策略</h5>\n<p>Uni-Mol 针对不同下游任务设计了专门的微调策略：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>任务类型</th>\n<th>微调方式</th>\n<th>关键设计</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>分子性质预测</td>\n<td>CLS token + MLP</td>\n<td>初始构象由 RDKit 生成，无需实验3D数据</td>\n</tr>\n<tr>\n<td>构象生成</td>\n<td>迭代坐标优化</td>\n<td>从 RDKit 初始构象出发，多轮前向传播逐步优化坐标</td>\n</tr>\n<tr>\n<td>蛋白-配体对接</td>\n<td>双模型联合</td>\n<td>分子模型 + 口袋模型分别编码，学习距离矩阵打分函数</td>\n</tr>\n<tr>\n<td>口袋性质预测</td>\n<td>口袋模型 + MLP</td>\n<td>利用口袋预训练模型的表示</td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>对接任务的特殊设计</strong>：将分子模型和口袋模型的对表示拼接，学习一个预测蛋白-配体原子对距离的打分函数。然后通过优化配体坐标使预测距离与实际距离匹配，实现对接姿态预测。</p>\n<h5>预训练数据规模</h5>\n<ul>\n<li><strong>分子数据</strong>：从 2.09 亿个分子构象中预训练（来自 19M 分子，每个分子最多 11 个构象，由 RDKit ETKDG + MMFF94 力场生成）</li>\n<li><strong>口袋数据</strong>：从 AlphaFold2 预测结构中提取 300 万候选蛋白口袋（使用 fpocket 工具检测）</li>\n<li><strong>模型规模</strong>：~48M 参数（分子模型），15 层 Transformer，隐藏维度 512，注意力头 64</li>\n</ul>\n<h5>与传统方法的区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>1D/2D MRL (SMILES-BERT, MolCLR)</th>\n<th>3D-辅助 MRL (GraphMVP, GEM)</th>\n<th><strong>Uni-Mol</strong></th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>3D 信息使用</td>\n<td>❌ 无</td>\n<td>⚠️ 仅作辅助监督</td>\n<td>✅ 直接输入/输出</td>\n</tr>\n<tr>\n<td>构象生成</td>\n<td>❌ 不支持</td>\n<td>❌ 不支持</td>\n<td>✅ 迭代优化</td>\n</tr>\n<tr>\n<td>对接任务</td>\n<td>❌ 不支持</td>\n<td>❌ 不支持</td>\n<td>✅ 双模型联合</td>\n</tr>\n<tr>\n<td>预训练数据</td>\n<td>2D 图/SMILES</td>\n<td>2D+3D 对比</td>\n<td>纯 3D 构象</td>\n</tr>\n<tr>\n<td>位置编码</td>\n<td>序列/图位置</td>\n<td>键角/键长</td>\n<td>欧氏距离 Gaussian 核</td>\n</tr>\n</tbody>\n</table></div>",
      "quiz": {
        "q": "Uni-Mol 中 pair representation 的初始化方式和更新机制分别是什么？",
        "options": [
          "由原子类型嵌入初始化，通过 FFN 更新",
          "由欧氏距离 Gaussian 核初始化，通过注意力 QK 乘积更新",
          "由键角和键长初始化，通过消息传递更新",
          "由随机初始化，通过对比学习更新"
        ],
        "answer": 1,
        "explain": "Pair representation 由原子对欧氏距离经 Gaussian 核编码初始化（SE(3)-invariant），在每层通过 atom-to-pair 通信（即注意力的 QK 乘积）进行更新，融合几何与语义信息。"
      }
    },
    {
      "id": "mist",
      "num": 7,
      "name": "MIST",
      "fullName": "分子交互结构Tokenizer (MIST)",
      "year": "2026.04",
      "org": "密歇根大学",
      "parent": "unimol",
      "paperUrl": "https://midas.umich.edu/events/aiir-symposium-2026/",
      "projectUrl": "",
      "category": "representation",
      "motivation": "18亿参数基础模型，捕获核、电子与几何信息",
      "summary": "MIST 的核心目标是：18亿参数基础模型，捕获核、电子与几何信息。",
      "keyPoints": [
        "核心动机：18亿参数基础模型，捕获核、电子与几何信息",
        "演化来源：继承或改进自 unimol",
        "代表机构：密歇根大学"
      ],
      "detail": "<p>18亿参数基础模型，捕获核、电子与几何信息</p>"
    },
    {
      "id": "mattersim_mt",
      "num": 8,
      "name": "MatterSim-MT",
      "fullName": "多任务材料模拟基础模型 (MatterSim-MT)",
      "year": "2026.05",
      "org": "微软亚洲研究院",
      "parent": "unimol",
      "paperUrl": "https://www.microsoft.com/en-us/research/publication/mattersim-mt-a-multi-task-foundation-model-for-in-silico-materials-characterization/",
      "projectUrl": "",
      "category": "representation",
      "motivation": "3500万DFT数据预训练，支持极端温压环境模拟",
      "summary": "MatterSim-MT 的核心目标是：3500万DFT数据预训练，支持极端温压环境模拟。",
      "keyPoints": [
        "核心动机：3500万DFT数据预训练，支持极端温压环境模拟",
        "演化来源：继承或改进自 unimol",
        "代表机构：微软亚洲研究院"
      ],
      "detail": "<p>3500万DFT数据预训练，支持极端温压环境模拟</p>"
    },
    {
      "id": "chemmlm",
      "num": 9,
      "name": "ChemMLLM",
      "fullName": "化学多模态大语言模型 (ChemMLLM)",
      "year": "2026.01",
      "org": "上海人工智能实验室",
      "parent": "grover",
      "paperUrl": "https://arxiv.org/abs/2412.04112",
      "projectUrl": "",
      "category": "representation",
      "motivation": "统一处理文本、SMILES和分子图像的多模态架构",
      "summary": "ChemMLLM 的核心目标是：统一处理文本、SMILES和分子图像的多模态架构。",
      "keyPoints": [
        "核心动机：统一处理文本、SMILES和分子图像的多模态架构",
        "演化来源：继承或改进自 grover",
        "代表机构：上海人工智能实验室"
      ],
      "detail": "<p>统一处理文本、SMILES和分子图像的多模态架构</p>"
    },
    {
      "id": "molecular_transformer",
      "num": 10,
      "name": "Molecular Transformer",
      "fullName": "分子Transformer (Molecular Transformer)",
      "year": "2018",
      "org": "IBM Research / ETH Zurich",
      "parent": "—",
      "paperUrl": "https://pubs.acs.org/doi/10.1021/acscentsci.9b00576",
      "projectUrl": "",
      "category": "reaction",
      "motivation": "将反应预测类比为机器翻译，Top-1准确率超90%",
      "summary": "Molecular Transformer 的核心目标是：将反应预测类比为机器翻译，Top-1准确率超90%。",
      "keyPoints": [
        "核心动机：将反应预测类比为机器翻译，Top-1准确率超90%",
        "代表机构：IBM Research / ETH Zurich"
      ],
      "detail": "<p>将反应预测类比为机器翻译，Top-1准确率超90%</p>"
    },
    {
      "id": "flower",
      "num": 11,
      "name": "FlowER",
      "fullName": "电子再分配流匹配模型 (FlowER)",
      "year": "2025.09",
      "org": "MIT",
      "parent": "molecular_transformer",
      "paperUrl": "https://news.mit.edu/2025/system-developed-mit-realistic-predictions-chemical-reactions-0903",
      "projectUrl": "",
      "category": "reaction",
      "motivation": "引入质量守恒和电子守恒约束，防止化学幻觉",
      "summary": "FlowER 的核心目标是：引入质量守恒和电子守恒约束，防止化学幻觉。",
      "keyPoints": [
        "核心动机：引入质量守恒和电子守恒约束，防止化学幻觉",
        "演化来源：继承或改进自 molecular_transformer",
        "代表机构：MIT"
      ],
      "detail": "<p>引入质量守恒和电子守恒约束，防止化学幻觉</p>"
    },
    {
      "id": "reactome",
      "num": 12,
      "name": "Reactome",
      "fullName": "药用反应数据集与预测模型 (Reactome)",
      "year": "2026.04",
      "org": "剑桥大学 / Pfizer",
      "parent": "molecular_transformer",
      "paperUrl": "https://www.earth.com/news/ai-predicts-how-molecules-react-in-the-lab-drug-discovery/",
      "projectUrl": "",
      "category": "reaction",
      "motivation": "3.9万药用反应数据集，预测实验室真实反应性",
      "summary": "Reactome 的核心目标是：3.9万药用反应数据集，预测实验室真实反应性。",
      "keyPoints": [
        "核心动机：3.9万药用反应数据集，预测实验室真实反应性",
        "演化来源：继承或改进自 molecular_transformer",
        "代表机构：剑桥大学 / Pfizer"
      ],
      "detail": "<p>3.9万药用反应数据集，预测实验室真实反应性</p>"
    },
    {
      "id": "3n_mcts",
      "num": 13,
      "name": "3N-MCTS",
      "fullName": "三网络蒙特卡洛树搜索 (3N-MCTS)",
      "year": "2018",
      "org": "University of Münster",
      "parent": "—",
      "paperUrl": "https://www.nature.com/articles/nature25978",
      "projectUrl": "",
      "category": "retrosynthesis",
      "motivation": "结合MCTS与三神经网络，解决组合爆炸问题",
      "summary": "3N-MCTS 的核心目标是：结合MCTS与三神经网络，解决组合爆炸问题。",
      "keyPoints": [
        "核心动机：结合MCTS与三神经网络，解决组合爆炸问题",
        "代表机构：University of Münster"
      ],
      "detail": "<p>结合MCTS与三神经网络，解决组合爆炸问题</p>"
    },
    {
      "id": "aizynthfinder",
      "num": 14,
      "name": "AiZynthFinder",
      "fullName": "AI逆合成规划工具 (AiZynthFinder)",
      "year": "2020",
      "org": "AstraZeneca",
      "parent": "3n_mcts",
      "paperUrl": "https://jcheminf.biomedcentral.com/articles/10.1186/s13321-020-00472-1",
      "projectUrl": "",
      "category": "retrosynthesis",
      "motivation": "神经网络引导MCTS，工业级多步合成规划",
      "summary": "AiZynthFinder 的核心目标是：神经网络引导MCTS，工业级多步合成规划。",
      "keyPoints": [
        "核心动机：神经网络引导MCTS，工业级多步合成规划",
        "演化来源：继承或改进自 3n_mcts",
        "代表机构：AstraZeneca"
      ],
      "detail": "<p>神经网络引导MCTS，工业级多步合成规划</p>"
    },
    {
      "id": "localretro",
      "num": 15,
      "name": "LocalRetro",
      "fullName": "局部反应中心预测 (LocalRetro)",
      "year": "2021",
      "org": "MIT",
      "parent": "3n_mcts",
      "paperUrl": "https://pubs.acs.org/doi/10.1021/jacsau.1c00173",
      "projectUrl": "",
      "category": "retrosynthesis",
      "motivation": "预测局部反应中心简化搜索空间",
      "summary": "LocalRetro 的核心目标是：预测局部反应中心简化搜索空间。",
      "keyPoints": [
        "核心动机：预测局部反应中心简化搜索空间",
        "演化来源：继承或改进自 3n_mcts",
        "代表机构：MIT"
      ],
      "detail": "<p>预测局部反应中心简化搜索空间</p>"
    },
    {
      "id": "graphretro",
      "num": 16,
      "name": "GraphRetro",
      "fullName": "图半模板逆合成 (GraphRetro)",
      "year": "2021",
      "org": "Tsinghua University",
      "parent": "3n_mcts",
      "paperUrl": "https://arxiv.org/abs/2006.15426",
      "projectUrl": "",
      "category": "retrosynthesis",
      "motivation": "先预测合子再补全，提升复杂分子预测精度",
      "summary": "GraphRetro 的核心目标是：先预测合子再补全，提升复杂分子预测精度。",
      "keyPoints": [
        "核心动机：先预测合子再补全，提升复杂分子预测精度",
        "演化来源：继承或改进自 3n_mcts",
        "代表机构：Tsinghua University"
      ],
      "detail": "<p>先预测合子再补全，提升复杂分子预测精度</p>"
    },
    {
      "id": "synthegy",
      "num": 17,
      "name": "Synthegy",
      "fullName": "自然语言引导逆合成 (Synthegy)",
      "year": "2026.05",
      "org": "EPFL",
      "parent": "aizynthfinder",
      "paperUrl": "https://www.sciencedaily.com/releases/2026/05/260506133400.htm",
      "projectUrl": "",
      "category": "retrosynthesis",
      "motivation": "LLM驱动自然语言战略引导，专家一致性71.2%",
      "summary": "Synthegy 的核心目标是：LLM驱动自然语言战略引导，专家一致性71.2%。",
      "keyPoints": [
        "核心动机：LLM驱动自然语言战略引导，专家一致性71.2%",
        "演化来源：继承或改进自 aizynthfinder",
        "代表机构：EPFL"
      ],
      "detail": "<p>LLM驱动自然语言战略引导，专家一致性71.2%</p>"
    },
    {
      "id": "mosaic",
      "num": 18,
      "name": "MOSAIC",
      "fullName": "自动实验方案生成平台 (MOSAIC)",
      "year": "2026.01",
      "org": "Yale / Boehringer Ingelheim",
      "parent": "aizynthfinder",
      "paperUrl": "https://news.yale.edu/2026/01/19/new-recipes-accelerating-chemistry-discoveries-dash-ai",
      "projectUrl": "",
      "category": "retrosynthesis",
      "motivation": "导航百万反应协议，生成可操作实验室规程",
      "summary": "MOSAIC 的核心目标是：导航百万反应协议，生成可操作实验室规程。",
      "keyPoints": [
        "核心动机：导航百万反应协议，生成可操作实验室规程",
        "演化来源：继承或改进自 aizynthfinder",
        "代表机构：Yale / Boehringer Ingelheim"
      ],
      "detail": "<p>导航百万反应协议，生成可操作实验室规程</p>"
    },
    {
      "id": "jt_vae",
      "num": 19,
      "name": "JT-VAE",
      "fullName": "连接树变分自编码器 (JT-VAE)",
      "year": "2018",
      "org": "MIT",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/1802.04364",
      "projectUrl": "",
      "category": "generation",
      "motivation": "先生成子结构再组装，实现100%化学合法性",
      "summary": "JT-VAE 的核心目标是：先生成子结构再组装，实现100%化学合法性。",
      "keyPoints": [
        "核心动机：先生成子结构再组装，实现100%化学合法性",
        "代表机构：MIT"
      ],
      "detail": "<p>先生成子结构再组装，实现100%化学合法性</p>"
    },
    {
      "id": "reinvent4",
      "num": 20,
      "name": "REINVENT 4",
      "fullName": "强化学习分子设计 (REINVENT 4)",
      "year": "2024",
      "org": "AstraZeneca",
      "parent": "jt_vae",
      "paperUrl": "https://link.springer.com/article/10.1186/s13321-024-00812-5",
      "projectUrl": "",
      "category": "generation",
      "motivation": "集成Transformer和课程学习的多目标优化",
      "summary": "REINVENT 4 的核心目标是：集成Transformer和课程学习的多目标优化。",
      "keyPoints": [
        "核心动机：集成Transformer和课程学习的多目标优化",
        "演化来源：继承或改进自 jt_vae",
        "代表机构：AstraZeneca"
      ],
      "detail": "<p>集成Transformer和课程学习的多目标优化</p>"
    },
    {
      "id": "geodiff",
      "num": 21,
      "name": "GeoDiff",
      "fullName": "几何扩散模型 (GeoDiff)",
      "year": "2022",
      "org": "Stanford University",
      "parent": "jt_vae",
      "paperUrl": "https://arxiv.org/abs/2203.02923",
      "projectUrl": "",
      "category": "generation",
      "motivation": "首个3D构象生成扩散模型",
      "summary": "GeoDiff 的核心目标是：首个3D构象生成扩散模型。",
      "keyPoints": [
        "核心动机：首个3D构象生成扩散模型",
        "演化来源：继承或改进自 jt_vae",
        "代表机构：Stanford University"
      ],
      "detail": "<p>首个3D构象生成扩散模型</p>"
    },
    {
      "id": "edm",
      "num": 22,
      "name": "EDM",
      "fullName": "等变扩散模型 (EDM)",
      "year": "2022",
      "org": "University of Amsterdam",
      "parent": "geodiff",
      "paperUrl": "https://arxiv.org/abs/2203.17003",
      "projectUrl": "",
      "category": "generation",
      "motivation": "原子类型与3D坐标联合等变生成",
      "summary": "EDM 的核心目标是：原子类型与3D坐标联合等变生成。",
      "keyPoints": [
        "核心动机：原子类型与3D坐标联合等变生成",
        "演化来源：继承或改进自 geodiff",
        "代表机构：University of Amsterdam"
      ],
      "detail": "<p>原子类型与3D坐标联合等变生成</p>"
    },
    {
      "id": "cocograph",
      "num": 23,
      "name": "CoCoGraph",
      "fullName": "约束协作图扩散 (CoCoGraph)",
      "year": "2026.05",
      "org": "Universitat Rovira i Virgili",
      "parent": "edm",
      "paperUrl": "https://www.thebrighterside.news/post/new-ai-tool-can-generate-millions-of-new-molecules",
      "projectUrl": "",
      "category": "generation",
      "motivation": "学习硬性规则，生成820万高真实感新分子",
      "summary": "CoCoGraph 的核心目标是：学习硬性规则，生成820万高真实感新分子。",
      "keyPoints": [
        "核心动机：学习硬性规则，生成820万高真实感新分子",
        "演化来源：继承或改进自 edm",
        "代表机构：Universitat Rovira i Virgili"
      ],
      "detail": "<p>学习硬性规则，生成820万高真实感新分子</p>"
    },
    {
      "id": "propmolflow",
      "num": 24,
      "name": "PropMolFlow",
      "fullName": "物理启发多尺度流模型 (PropMolFlow)",
      "year": "2026.04",
      "org": "MIT",
      "parent": "edm",
      "paperUrl": "https://www.earth.com/news/ai-predicts-how-molecules-react-in-the-lab-drug-discovery/",
      "projectUrl": "",
      "category": "generation",
      "motivation": "10倍速度提升，符合DFT物理约束",
      "summary": "PropMolFlow 的核心目标是：10倍速度提升，符合DFT物理约束。",
      "keyPoints": [
        "核心动机：10倍速度提升，符合DFT物理约束",
        "演化来源：继承或改进自 edm",
        "代表机构：MIT"
      ],
      "detail": "<p>10倍速度提升，符合DFT物理约束</p>"
    },
    {
      "id": "trajcast",
      "num": 25,
      "name": "TrajCast",
      "fullName": "无力分子动力学 (TrajCast)",
      "year": "2026.03",
      "org": "University of Cambridge",
      "parent": "edm",
      "paperUrl": "https://www.nature.com/articles/s42256-026-00000-0",
      "projectUrl": "",
      "category": "generation",
      "motivation": "等变MPNN自回归预测，无需计算原子力",
      "summary": "TrajCast 的核心目标是：等变MPNN自回归预测，无需计算原子力。",
      "keyPoints": [
        "核心动机：等变MPNN自回归预测，无需计算原子力",
        "演化来源：继承或改进自 edm",
        "代表机构：University of Cambridge"
      ],
      "detail": "<p>等变MPNN自回归预测，无需计算原子力</p>"
    },
    {
      "id": "oc20",
      "num": 26,
      "name": "OC20",
      "fullName": "开放催化剂项目 (Open Catalyst 2020)",
      "year": "2020",
      "org": "Meta AI / CMU",
      "parent": "—",
      "paperUrl": "https://ai.meta.com/blog/open-catalyst-project-accelerating-renewable-energy-storage-with-ai/",
      "projectUrl": "",
      "category": "catalyst",
      "motivation": "128万弛豫+2.65亿DFT点，催化剂AI基石",
      "summary": "OC20 的核心目标是：128万弛豫+2.65亿DFT点，催化剂AI基石。",
      "keyPoints": [
        "核心动机：128万弛豫+2.65亿DFT点，催化剂AI基石",
        "代表机构：Meta AI / CMU"
      ],
      "detail": "<p>128万弛豫+2.65亿DFT点，催化剂AI基石</p>"
    },
    {
      "id": "gemnet_oc",
      "num": 27,
      "name": "GemNet-OC",
      "fullName": "催化剂优化GemNet (GemNet-OC)",
      "year": "2021",
      "org": "TU Munich / Meta AI",
      "parent": "oc20",
      "paperUrl": "https://arxiv.org/abs/2106.08903",
      "projectUrl": "",
      "category": "catalyst",
      "motivation": "OC20数据集上的高效几何GNN",
      "summary": "GemNet-OC 在 GemNet 基础上提出邻居图构建、简化球谐基函数、可控四元组交互和多层级交互层级（原子-边-四元组）等改进，使其在 OC20 所有任务上达到 SOTA，同时训练速度提升 10 倍；并通过系统性数据集分析揭示了小数据集与大数据集上模型选择的显著差异。",
      "keyPoints": [
        "<strong>基于 GemNet 的几何消息传递</strong>：同时维护原子嵌入 \\(h_a\\) 和有向边嵌入 \\(m_{ca}\\)，利用距离、角度和二面角的完整几何信息进行消息传递",
        "<strong>邻居图替代距离截断</strong>：用固定数量的最近邻（\\(k_{\\text{emb}}=30\\)）替代固定距离截断，解决大化学多样性下图过稀/过密问题，吞吐量提升 3 倍",
        "<strong>简化基函数</strong>：将球谐函数解耦为 Legendre 多项式外积 \\(P_l(\\cos\\phi) P_m(\\cos\\theta)\\)，吞吐量提升 29%",
        "<strong>可控四元组交互</strong>：将四元组邻居数 \\(k_{\\text{qint}}\\) 降至 8（远小于 \\(k_{\\text{emb}}=30\\)），开销从 330% 降至 31%",
        "<strong>多层级交互层级</strong>：引入原子-原子（AA）、原子-边（AE）、边-原子（EA）消息传递，AA 交互可使用 12 Å 长程截断",
        "<strong>架构改进</strong>：交互块输出嵌入拼接后经 MLP 预测、每个交互块增加原子嵌入 MLP、能量输出块中注入原子嵌入",
        "<strong>OC-2M 代理数据集</strong>：识别出 200 万样本子集 OC-2M，其模型趋势与完整 OC20（1.34 亿样本）高度相关",
        "<strong>全面 SOTA</strong>：GemNet-OC-Large 在 S2EF、IS2RS、IS2RE 三大任务上均超越此前最优模型 16%"
      ],
      "detail": "<p><img alt=\"GemNet-OC 架构示意图\" src=\"https://arxiv.org/html/2204.02782v2/x1.png\" />\n<em>图：GemNet-OC 架构总览。橙色部分为相对于原始 GemNet 的改进。左侧为整体模型流程，中间为交互块内部结构，右侧为不同类型消息传递（AA/AE/EA/EE/Q-MP）的细节。</em></p>\n<h5>动机与背景</h5>\n<p>分子动力学模拟需要精确预测原子系统的能量 \\(E\\) 和力 \\(\\mathbf{F}\\)。图神经网络（GNN）已成为主流方法，但面对 OC20 这样包含 1.34 亿样本、涵盖 56 种元素的大规模催化剂数据集时，此前的模型存在两大瓶颈：</p>\n<ol>\n<li><strong>计算效率</strong>：GemNet 的四元组交互（二面角）复杂度为 \\(O(N k_{\\text{qint}} k_{\\text{emb}}^2)\\)，在大系统中极其昂贵</li>\n<li><strong>图构建策略</strong>：固定距离截断（5-6 Å）在化学多样性大的数据集中会导致部分系统图断裂、部分系统图过密</li>\n</ol>\n<p>GemNet-OC 系统性地解决了这些问题，同时研究了数据集规模和多样性对模型设计选择的影响。</p>\n<h5>核心机制详解</h5>\n<p><strong>1. 邻居图替代距离截断</strong></p>\n<p>传统 GNN 通过距离截断 \\(c_{\\text{int}}\\) 构建图，并使用包络函数保证力的二次连续可微性：</p>\n<p>$$e_{\\text{env}}(x) = \\begin{cases} 1 - (p+1)(p+2)/2 \\cdot x^p + p(p+2) \\cdot x^{p+1} - p(p+1)/2 \\cdot x^{p+2} & x \\leq 1 \\\\ 0 & x > 1 \\end{cases}$$</p>\n<p>GemNet-OC 改为使用固定数量的最近邻 \\(k_{\\text{emb}}\\) 构建图。虽然这在理论上破坏了力的可微性（当两个原子距离排序发生切换时），但实验表明这在实践中不构成问题。这一改变带来三个优势：\n- 吞吐量提升 3 倍\n- 计算和内存需求可控\n- 邻域大小一致，避免图断裂</p>\n<p><strong>2. 简化基函数</strong></p>\n<p>原始 GemNet 使用球 Bessel 函数和球谐函数表示几何信息，径向阶 \\(l\\) 与角度阶耦合，需计算 \\(O(N k_{\\text{qint}} k_{\\text{emb}}^2)\\) 个基函数。GemNet-OC 做了两步简化：</p>\n<ul>\n<li><strong>解耦径向基</strong>：使用高斯函数或零阶 Bessel 函数，独立于球谐函数</li>\n<li><strong>简化角度基</strong>：用零阶球谐函数的外积替代完整球谐函数，简化为 Legendre 多项式：</li>\n</ul>\n<p>$$Y_0^{(l)}(\\phi_{cab}) \\cdot Y_0^{(m)}(\\theta_{cabd}) = P_l(\\cos\\phi_{cab}) \\cdot P_m(\\cos\\theta_{cabd})$$</p>\n<p>这只需要边方向的归一化内积，无需显式计算角度，吞吐量提升 29% 且不损失精度。</p>\n<p><strong>3. 可控四元组交互</strong></p>\n<p>四元组交互利用二面角 \\(\\theta_{cabd}\\) 捕获四体相互作用，但复杂度为 \\(O(N k_{\\text{qint}} k_{\\text{emb}}^2)\\)。关键观察是：<strong>四元组交互主要对最近邻有效</strong>，随距离增大收益迅速递减。因此 GemNet-OC 将 \\(k_{\\text{qint}}\\) 设为 8，远小于 \\(k_{\\text{emb}}=30\\)，将四元组交互开销从 330% 降至仅 31%。</p>\n<p><strong>4. 多层级交互层级</strong></p>\n<p>低 \\(k_{\\text{qint}}\\) 自然引入了交互层级：短程四元组交互（昂贵但精确）+ 中程边-边交互（较便宜）。GemNet-OC 进一步扩展为完整的多层级体系：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>交互类型</th>\n<th>输入→输出</th>\n<th>几何信息</th>\n<th>截断/邻居数</th>\n<th>复杂度</th>\n<th>额外开销</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Q-MP（四元组）</td>\n<td>边→边</td>\n<td>距离+角度+二面角</td>\n<td>\\(k_{\\text{qint}}=8\\)</td>\n<td>\\(O(Nk_{\\text{qint}}k_{\\text{emb}}^2)\\)</td>\n<td>31%</td>\n</tr>\n<tr>\n<td>EE-MP（边-边）</td>\n<td>边→边</td>\n<td>距离+角度</td>\n<td>\\(k_{\\text{emb}}=30\\)</td>\n<td>\\(O(Nk_{\\text{emb}}^2)\\)</td>\n<td>基础</td>\n</tr>\n<tr>\n<td>AA-MP（原子-原子）</td>\n<td>原子→原子</td>\n<td>仅距离</td>\n<td>12 Å 无限制</td>\n<td>\\(O(Nk_{\\text{emb}})\\)</td>\n<td>~10%</td>\n</tr>\n<tr>\n<td>AE-MP（原子-边）</td>\n<td>原子→边</td>\n<td>距离+角度</td>\n<td>\\(k_{\\text{emb}}=30\\)</td>\n<td>\\(O(Nk_{\\text{emb}}^2)\\)</td>\n<td>~10%</td>\n</tr>\n<tr>\n<td>EA-MP（边-原子）</td>\n<td>边→原子</td>\n<td>距离+角度</td>\n<td>\\(k_{\\text{emb}}=30\\)</td>\n<td>\\(O(Nk_{\\text{emb}}^2)\\)</td>\n<td>~10%</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 <strong>关键</strong>：AA-MP 由于仅使用距离信息，复杂度极低，可以使用 12 Å 的长程截断，有效捕获远程相互作用。</div>\n<p><strong>5. 架构改进</strong></p>\n<p>三项改进总计增加不到 2% 的计算开销：</p>\n<ul>\n<li><strong>嵌入拼接输出</strong>：各交互块输出嵌入而非直接预测，拼接后经 MLP 生成最终预测，允许模型更好地组合不同层级的信息</li>\n<li><strong>原子嵌入 MLP</strong>：每个交互块中增加可学习 MLP 更新原子嵌入，配合新引入的 AA/AE/EA 交互</li>\n<li><strong>能量输出注入</strong>：在每个能量输出块中加入原子嵌入，创建从原子嵌入到能量预测的直接路径</li>\n</ul>\n<h5>消息传递核心伪代码</h5>\n<pre><code class=\"language-python\"># GemNet-OC 单个交互块伪代码\ndef interaction_block(h_a, m_ca, graph):\n    # 1. 四元组消息传递 (Q-MP) - 短程精细交互\n    for (c,a,b,d) in quadruplet_neighbors(graph, k_qint=8):\n        e_cabd = SBF(x_ca, phi_cab, theta_cabd)  # 球面基函数\n        m_ca += W_q @ (m_db * e_cabd)             # 二面角加权消息\n\n    # 2. 边-边消息传递 (EE-MP) - 中程三体交互\n    for (c,a,b) in triplet_neighbors(graph, k_emb=30):\n        e_cab = CBF(x_ca, phi_cab)                # 圆柱基函数\n        m_ca += W_ee @ (m_ba * e_cab)\n\n    # 3. 原子-原子消息传递 (AA-MP) - 长程两体交互\n    for (a,b) in atom_neighbors(graph, cutoff=12.0):\n        e_ab = RBF(x_ab)                          # 径向基函数\n        h_a += W_aa @ (h_b * e_ab)\n\n    # 4. 原子-边 / 边-原子消息传递\n    m_ca += AE_MP(h_a, graph)   # 原子嵌入 → 边嵌入\n    h_a  += EA_MP(m_ca, graph)  # 边嵌入 → 原子嵌入\n\n    # 5. 原子嵌入 MLP 更新\n    h_a = h_a + MLP(h_a)\n\n    return h_a, m_ca\n</code></pre>\n<h5>数据集效应分析</h5>\n<p>论文的重要贡献之一是系统性研究了数据集属性对模型选择的影响。通过构建 6 个 OC20 子集，分别隔离 4 种数据集属性的效应：</p>\n<ol>\n<li><strong>化学多样性</strong>：窄数据集（如 MD17）上有效的组件在宽数据集上可能无效甚至有害</li>\n<li><strong>领域偏移</strong>：OOD 测试集上的表现可能与 ID 测试集上的趋势不一致</li>\n<li><strong>训练集大小</strong>：某些组件只在大训练集上才能发挥优势</li>\n<li><strong>系统大小</strong>：大系统中计算效率成为关键约束</li>\n</ol>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：论文发现模型组件在不同数据集上可能产生截然相反的效果。例如，四元组交互在小分子数据集 MD17 上提升显著，但在 OC20 的某些子集上收益有限。这表明在小基准上的模型开发结论不能直接迁移到大规模数据集。</div>\n<h5>实验结果</h5>\n<p>GemNet-OC 在 OC20 所有三个任务上均达到 SOTA：</p>\n<ul>\n<li><strong>S2EF</strong>（结构→能量和力）：Force MAE 在 OC20 全量训练集上达到 19.4 meV/Å，GemNet-OC-Large 进一步降至 ~16%</li>\n<li><strong>IS2RS</strong>（初始结构→弛豫结构）：ADwT 和 AFbT 指标均大幅领先</li>\n<li><strong>IS2RE</strong>（初始结构→弛豫能量）：能量 MAE 显著优于此前模型</li>\n<li><strong>训练效率</strong>：在 OC-2M 子集上训练的 GemNet-OC 已超越此前在完整 OC20 上训练的所有 pre-GemNet 模型</li>\n</ul>",
      "quiz": {
        "q": "GemNet-OC 将四元组交互的邻居数 k_qint 设为 8（远小于嵌入邻居数 k_emb=30），其主要依据是什么？",
        "options": [
          "四元组交互的计算复杂度与 k_qint 无关",
          "四元组交互主要对最近邻有效，随距离增大收益迅速递减",
          "OC20 数据集中大多数原子只有 8 个邻居",
          "减少 k_qint 可以提升模型在小分子数据集上的精度"
        ],
        "answer": 1,
        "explain": "论文观察到四元组交互（二面角信息）主要对最近邻原子有益，增大 k_qint 后收益迅速趋于平缓，因此用低 k_qint=8 即可获得大部分收益，同时将计算开销从 330% 降至 31%。"
      }
    },
    {
      "id": "equiformerv2",
      "num": 28,
      "name": "EquiformerV2",
      "fullName": "等变Transformer V2 (EquiformerV2)",
      "year": "2023",
      "org": "Atomic Architects",
      "parent": "gemnet_oc",
      "paperUrl": "https://arxiv.org/abs/2306.12059",
      "projectUrl": "",
      "category": "catalyst",
      "motivation": "SE(3)等变图注意力，OC20 SOTA性能",
      "summary": "EquiformerV2 的核心目标是：SE(3)等变图注意力，OC20 SOTA性能。",
      "keyPoints": [
        "核心动机：SE(3)等变图注意力，OC20 SOTA性能",
        "演化来源：继承或改进自 gemnet_oc",
        "代表机构：Atomic Architects"
      ],
      "detail": "<p>SE(3)等变图注意力，OC20 SOTA性能</p>"
    },
    {
      "id": "equiformerv3",
      "num": 29,
      "name": "EquiformerV3",
      "fullName": "等变Transformer V3 (EquiformerV3)",
      "year": "2026.04",
      "org": "Atomic Architects",
      "parent": "equiformerv2",
      "paperUrl": "https://arxiv.org/abs/2604.09130",
      "projectUrl": "",
      "category": "catalyst",
      "motivation": "5.9倍训练效率提升，SwiGLU-S²激活函数",
      "summary": "EquiformerV3 的核心目标是：5.9倍训练效率提升，SwiGLU-S²激活函数。",
      "keyPoints": [
        "核心动机：5.9倍训练效率提升，SwiGLU-S²激活函数",
        "演化来源：继承或改进自 equiformerv2",
        "代表机构：Atomic Architects"
      ],
      "detail": "<p>5.9倍训练效率提升，SwiGLU-S²激活函数</p>"
    },
    {
      "id": "digcat",
      "num": 30,
      "name": "DigCat",
      "fullName": "数字催化AI智能体 (DigCat)",
      "year": "2026.02",
      "org": "东北大学",
      "parent": "oc20",
      "paperUrl": "https://www.miragenews.com/ai-identifies-key-characteristic-for-sustainable-fuel-catalysts/",
      "projectUrl": "",
      "category": "catalyst",
      "motivation": "发现CO₂电还原铜基单原子合金设计原则",
      "summary": "DigCat 的核心目标是：发现CO₂电还原铜基单原子合金设计原则。",
      "keyPoints": [
        "核心动机：发现CO₂电还原铜基单原子合金设计原则",
        "演化来源：继承或改进自 oc20",
        "代表机构：东北大学"
      ],
      "detail": "<p>发现CO₂电还原铜基单原子合金设计原则</p>"
    },
    {
      "id": "moleculenet",
      "num": 31,
      "name": "MoleculeNet",
      "fullName": "分子性质预测基准 (MoleculeNet)",
      "year": "2018",
      "org": "Stanford University",
      "parent": "—",
      "paperUrl": "https://pubs.rsc.org/en/content/articlelanding/2018/sc/c7sc02664a",
      "projectUrl": "",
      "category": "property",
      "motivation": "化学AI的ImageNet，多维度标准数据集",
      "summary": "MoleculeNet 的核心目标是：化学AI的ImageNet，多维度标准数据集。",
      "keyPoints": [
        "核心动机：化学AI的ImageNet，多维度标准数据集",
        "代表机构：Stanford University"
      ],
      "detail": "<p>化学AI的ImageNet，多维度标准数据集</p>"
    },
    {
      "id": "attentivefp",
      "num": 32,
      "name": "AttentiveFP",
      "fullName": "注意力指纹网络 (AttentiveFP)",
      "year": "2020",
      "org": "Tencent AI Lab",
      "parent": "moleculenet",
      "paperUrl": "https://pubs.acs.org/doi/10.1021/acs.jmedchem.9b00959",
      "projectUrl": "",
      "category": "property",
      "motivation": "双层注意力机制提升ADMET预测可解释性",
      "summary": "AttentiveFP 的核心目标是：双层注意力机制提升ADMET预测可解释性。",
      "keyPoints": [
        "核心动机：双层注意力机制提升ADMET预测可解释性",
        "演化来源：继承或改进自 moleculenet",
        "代表机构：Tencent AI Lab"
      ],
      "detail": "<p>双层注意力机制提升ADMET预测可解释性</p>"
    },
    {
      "id": "admetpred",
      "num": 33,
      "name": "ADMETPred",
      "fullName": "高通量ADMET预测平台 (ADMETPred)",
      "year": "2026.03",
      "org": "中国科学院",
      "parent": "attentivefp",
      "paperUrl": "https://link.springer.com/article/10.1007/s11427-025-3166-8",
      "projectUrl": "",
      "category": "property",
      "motivation": "集成多模型与可解释子结构识别",
      "summary": "ADMETPred 的核心目标是：集成多模型与可解释子结构识别。",
      "keyPoints": [
        "核心动机：集成多模型与可解释子结构识别",
        "演化来源：继承或改进自 attentivefp",
        "代表机构：中国科学院"
      ],
      "detail": "<p>集成多模型与可解释子结构识别</p>"
    }
  ],
  "categories": {
    "representation": {
      "label": "分子表示学习",
      "color": "#3B82F6"
    },
    "reaction": {
      "label": "反应预测",
      "color": "#10B981"
    },
    "retrosynthesis": {
      "label": "逆合成分析",
      "color": "#F59E0B"
    },
    "generation": {
      "label": "分子生成",
      "color": "#8B5CF6"
    },
    "catalyst": {
      "label": "催化剂设计",
      "color": "#EF4444"
    },
    "property": {
      "label": "性质预测",
      "color": "#EC4899"
    }
  },
  "projectUrls": {}
};
