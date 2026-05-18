/**
 * llm_pretraining-data.js — 由 pipeline/build.py 于 2026-05-18 18:51:05 自动生成。
 * 源文件：content/llm/llm_pretraining.md
 * ⚠️  请勿手动修改；如需更新，修改源文档后重新编译。
 */
window.PAGE_CONFIG = {
  "meta": {
    "domain": "llm",
    "topic_id": "llm_pretraining",
    "topic_name": "LLM预训练",
    "page_title": "LLM预训练算法总结",
    "page_subtitle": "2026-05-18 版",
    "page_desc": "系统梳理从Scaling Laws理论奠基、数据工程精炼到分布式训练优化的大语言模型预训练技术演进脉络",
    "page_icon": "⚡",
    "hero_pills": [
      "Scaling Laws · 数据工程 · 训练稳定性 · 分布式训练"
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
  "latest_overview": [
    {
      "title": "待定",
      "body_html": "<p>待定。</p>"
    }
  ],
  "graph": {
    "nodes": [
      {
        "id": "kaplan_scaling",
        "x": 100,
        "y": 100,
        "category": "scaling"
      },
      {
        "id": "chinchilla_law",
        "x": 250,
        "y": 100,
        "category": "scaling"
      },
      {
        "id": "mup",
        "x": 260,
        "y": 150,
        "category": "scaling"
      },
      {
        "id": "data_constrained_scaling",
        "x": 350,
        "y": 100,
        "category": "scaling"
      },
      {
        "id": "t2_scaling",
        "x": 550,
        "y": 80,
        "category": "scaling"
      },
      {
        "id": "u_mup",
        "x": 500,
        "y": 150,
        "category": "scaling"
      },
      {
        "id": "rl_scaling",
        "x": 550,
        "y": 120,
        "category": "scaling"
      },
      {
        "id": "c4",
        "x": 100,
        "y": 250,
        "category": "data"
      },
      {
        "id": "the_pile",
        "x": 180,
        "y": 250,
        "category": "data"
      },
      {
        "id": "minhash_dedup",
        "x": 240,
        "y": 220,
        "category": "data"
      },
      {
        "id": "suffix_array_dedup",
        "x": 240,
        "y": 280,
        "category": "data"
      },
      {
        "id": "refinedweb",
        "x": 350,
        "y": 250,
        "category": "data"
      },
      {
        "id": "dolma",
        "x": 420,
        "y": 250,
        "category": "data"
      },
      {
        "id": "doremi",
        "x": 350,
        "y": 300,
        "category": "data"
      },
      {
        "id": "fineweb",
        "x": 420,
        "y": 220,
        "category": "data"
      },
      {
        "id": "common_corpus",
        "x": 550,
        "y": 250,
        "category": "data"
      },
      {
        "id": "essential_web",
        "x": 550,
        "y": 220,
        "category": "data"
      },
      {
        "id": "fed_dedup",
        "x": 550,
        "y": 280,
        "category": "data"
      },
      {
        "id": "lshbloom",
        "x": 600,
        "y": 280,
        "category": "data"
      },
      {
        "id": "data_mixing_agent",
        "x": 550,
        "y": 320,
        "category": "data"
      },
      {
        "id": "mixed_precision",
        "x": 50,
        "y": 400,
        "category": "training"
      },
      {
        "id": "flash_attention",
        "x": 240,
        "y": 400,
        "category": "training"
      },
      {
        "id": "flash_attention_2",
        "x": 350,
        "y": 400,
        "category": "training"
      },
      {
        "id": "wesar",
        "x": 500,
        "y": 450,
        "category": "training"
      },
      {
        "id": "muon",
        "x": 480,
        "y": 400,
        "category": "training"
      },
      {
        "id": "flash_attention_4",
        "x": 550,
        "y": 400,
        "category": "training"
      },
      {
        "id": "snip_quartet",
        "x": 550,
        "y": 440,
        "category": "training"
      },
      {
        "id": "longrope2",
        "x": 500,
        "y": 360,
        "category": "training"
      },
      {
        "id": "gpipe",
        "x": 80,
        "y": 550,
        "category": "distributed"
      },
      {
        "id": "megatron_lm",
        "x": 80,
        "y": 590,
        "category": "distributed"
      },
      {
        "id": "zero",
        "x": 100,
        "y": 570,
        "category": "distributed"
      },
      {
        "id": "fsdp",
        "x": 350,
        "y": 570,
        "category": "distributed"
      },
      {
        "id": "distflashattn",
        "x": 550,
        "y": 550,
        "category": "distributed"
      }
    ],
    "edges": [
      {
        "from": "kaplan_scaling",
        "to": "chinchilla_law",
        "label": "修正缩放比例"
      },
      {
        "from": "chinchilla_law",
        "to": "data_constrained_scaling",
        "label": "数据受限"
      },
      {
        "from": "chinchilla_law",
        "to": "t2_scaling",
        "label": "推理优化"
      },
      {
        "from": "mup",
        "to": "u_mup",
        "label": "单位缩放"
      },
      {
        "from": "kaplan_scaling",
        "to": "rl_scaling",
        "label": "RL扩展"
      },
      {
        "from": "c4",
        "to": "the_pile",
        "label": "多样性增强"
      },
      {
        "from": "c4",
        "to": "refinedweb",
        "label": "MDR方法"
      },
      {
        "from": "minhash_dedup",
        "to": "suffix_array_dedup",
        "label": "子串去重"
      },
      {
        "from": "refinedweb",
        "to": "fineweb",
        "label": "质量提升"
      },
      {
        "from": "the_pile",
        "to": "dolma",
        "label": "透明开源"
      },
      {
        "from": "fineweb",
        "to": "essential_web",
        "label": "分类标签"
      },
      {
        "from": "dolma",
        "to": "common_corpus",
        "label": "合规化"
      },
      {
        "from": "minhash_dedup",
        "to": "fed_dedup",
        "label": "GPU加速"
      },
      {
        "from": "fed_dedup",
        "to": "lshbloom",
        "label": "空间优化"
      },
      {
        "from": "doremi",
        "to": "data_mixing_agent",
        "label": "RL动态"
      },
      {
        "from": "flash_attention",
        "to": "flash_attention_2",
        "label": "并行优化"
      },
      {
        "from": "flash_attention_2",
        "to": "flash_attention_4",
        "label": "硬件适配"
      },
      {
        "from": "mixed_precision",
        "to": "snip_quartet",
        "label": "FP4训练"
      },
      {
        "from": "zero",
        "to": "fsdp",
        "label": "PyTorch原生"
      },
      {
        "from": "flash_attention_2",
        "to": "distflashattn",
        "label": "分布式扩展"
      }
    ],
    "milestones": [
      "kaplan_scaling",
      "chinchilla_law",
      "flash_attention"
    ]
  },
  "algos": [
    {
      "id": "kaplan_scaling",
      "num": 1,
      "name": "OpenAI Scaling Laws",
      "fullName": "OpenAI规模定律 (Scaling Laws for Neural Language Models)",
      "year": "2020",
      "org": "OpenAI",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2001.08361",
      "projectUrl": "",
      "category": "scaling",
      "motivation": "幂律公式揭示模型性能与N/D/C关系",
      "summary": "OpenAI Scaling Laws 的核心目标是：幂律公式揭示模型性能与N/D/C关系。",
      "keyPoints": [
        "核心动机：幂律公式揭示模型性能与N/D/C关系",
        "代表机构：OpenAI"
      ],
      "detail": "<p>幂律公式揭示模型性能与N/D/C关系</p>"
    },
    {
      "id": "chinchilla_law",
      "num": 2,
      "name": "Chinchilla Laws",
      "fullName": "计算最优训练法则 (Training Compute-Optimal Large Language Models)",
      "year": "2022.03",
      "org": "DeepMind",
      "parent": "kaplan_scaling",
      "paperUrl": "https://arxiv.org/abs/2203.15556",
      "projectUrl": "",
      "category": "scaling",
      "motivation": "提出20:1数据参数比的计算最优原则",
      "summary": "Chinchilla Laws 的核心目标是：提出20:1数据参数比的计算最优原则。",
      "keyPoints": [
        "核心动机：提出20:1数据参数比的计算最优原则",
        "演化来源：继承或改进自 kaplan_scaling",
        "代表机构：DeepMind"
      ],
      "detail": "<p>提出20:1数据参数比的计算最优原则</p>"
    },
    {
      "id": "mup",
      "num": 3,
      "name": "μP/μTransfer",
      "fullName": "最大更新参数化 (Maximal Update Parameterization)",
      "year": "2022.03",
      "org": "Microsoft Research",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2203.03466",
      "projectUrl": "",
      "category": "scaling",
      "motivation": "实现超参数跨规模零次迁移",
      "summary": "μP（Maximal Update Parameterization）通过重新设计神经网络各层参数的初始化方差与学习率随宽度的缩放规则，使得最优超参数在不同模型规模间保持稳定，从而实现 **μTransfer**——在小模型上调优超参数后零次迁移到大模型，无需对大模型进行任何额外调参。",
      "keyPoints": [
        "<strong>abc-参数化框架</strong>：将参数化抽象为三元组 (a=参数乘子缩放, b=初始化方差缩放, c=学习率缩放)，SP 和 μP 都是其特例；论文证明 μP 是唯一允许超参数跨宽度零次迁移的 abc-参数化",
        "<strong>三类权重差异化缩放</strong>：将网络参数分为输入权重（含偏置）、隐藏权重、输出权重三类，分别制定不同的初始化方差和学习率缩放规则（Table 3）",
        "<strong>注意力缩放修正</strong>：Transformer 中注意力 logit 使用 \\(q^\\top k / d\\) 而非标准的 \\(q^\\top k / \\sqrt{d}\\)，确保训练中注意力分数随宽度稳定",
        "<strong>μTransfer 流程</strong>：三步法——(1) 用 μP 参数化目标模型，(2) 在小版本模型上调优超参数，(3) 将超参数直接复制到大模型",
        "<strong>可迁移超参数范围</strong>：学习率、动量、Adam beta、LR schedule、初始化方差、参数乘子等均可迁移；宽度、深度、batch size 等作为迁移维度",
        "<strong>Coord Check 诊断工具</strong>：通过检查各层激活值随宽度变化的稳定性，验证 μP 实现的正确性",
        "<strong>大规模验证</strong>：从 13M 参数迁移超参数超越 BERT-large (350M) 发布结果；从 40M 参数迁移超参数超越 GPT-3 6.7B 发布结果，调参成本仅为预训练的 7%"
      ],
      "detail": "<h5>动机：标准参数化的缺陷</h5>\n<p>在标准参数化（Standard Parameterization, SP）下，不同宽度的模型具有不同的最优学习率——随着模型变宽，最优学习率会发生漂移。这意味着在小模型上调好的超参数无法直接用于大模型，而大模型的超参数搜索代价极其昂贵。更严重的是，SP 下宽模型的训练激活值会在训练过程中发散（blow up），本质原因是各层的有效学习率不平衡。</p>\n<p><img alt=\"μTransfer 核心对比：SP vs μP 下学习率-损失曲线\" src=\"https://ar5iv.labs.arxiv.org/html/2203.03466/assets/x1.png\" />\n<em>图 1：不同宽度 Transformer 在 Adam 下的训练损失 vs 学习率。左图（SP）：不同宽度的最优学习率不一致，宽模型不一定优于窄模型；右图（μP）：最优学习率跨宽度稳定，宽模型始终更优。</em></p>\n<p><img alt=\"μTransfer 流程示意\" src=\"https://ar5iv.labs.arxiv.org/html/2203.03466/assets/x2.png\" />\n<em>图 2：μTransfer 流程——在小模型上进行超参数搜索，找到最优超参数后直接迁移到大模型。</em></p>\n<h5>μP 参数化规则</h5>\n<p>μP 的核心思想是：确保每一层在训练过程中的<strong>更新幅度</strong>（对激活值的影响）与宽度无关。具体地，对于一个宽度为 \\(n\\) 的网络，μP 将参数分为三类并分别制定缩放规则：</p>\n<p><strong>Table 3 核心规则（Adam 优化器）：</strong></p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th></th>\n<th>输入权重 &amp; 偏置</th>\n<th>输出权重</th>\n<th>隐藏权重</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><strong>初始化方差</strong></td>\n<td>\\(1/\\text{fan\\_in}\\)</td>\n<td>\\(1/\\text{fan\\_in}^2\\)（SP: \\(1/\\text{fan\\_in}\\)）</td>\n<td>\\(1/\\text{fan\\_in}\\)</td>\n</tr>\n<tr>\n<td><strong>Adam 学习率</strong></td>\n<td>\\(1\\)</td>\n<td>\\(1/\\text{fan\\_in}\\)（SP: \\(1\\)）</td>\n<td>\\(1/\\text{fan\\_in}\\)（SP: \\(1\\)）</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 <strong>关键直觉</strong>：在 SP 下，隐藏层和输出层的学习率相对于宽度过大，导致宽模型训练时激活值爆炸。μP 通过对输出权重和隐藏权重的学习率乘以 \\(1/\\text{fan\\_in}\\) 来补偿，确保参数更新对激活值的影响与宽度无关。</div>\n<p>对于一个简单的两隐藏层 MLP（宽度 \\(n\\)），μP 的基本形式为：</p>\n<p>$$W^1 \\sim \\mathcal{N}(0, 1/d_{in}), \\quad W^2 \\sim \\mathcal{N}(0, 1/n), \\quad W^3 \\sim \\mathcal{N}(0, 1/n^2)$$</p>\n<p>SGD 学习率分别为：</p>\n<p>$$\\eta_{W^1} = \\eta_{b^1} = \\eta_{b^2} = \\eta \\cdot n, \\quad \\eta_{W^2} = \\eta, \\quad \\eta_{W^3} = \\eta \\cdot n^{-1}$$</p>\n<h5>Transformer 特殊处理：注意力缩放</h5>\n<p>标准 Transformer 中注意力分数计算为 \\(q^\\top k / \\sqrt{d}\\)，其中 \\(d\\) 是 head 维度。这一缩放基于初始化时 \\(q\\) 和 \\(k\\) 不相关的假设（中心极限定理）。然而在训练过程中，\\(q\\) 和 \\(k\\) 会变得相关，此时 \\(q^\\top k\\) 实际上按 \\(d\\)（而非 \\(\\sqrt{d}\\)）的量级增长（大数定律）。因此 μP 要求：</p>\n<p>$$\\text{Attention}(Q, K, V) = \\text{softmax}\\left(\\frac{QK^\\top}{d}\\right)V$$</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：这里使用 \\(1/d\\) 而非 \\(1/\\sqrt{d}\\)，这是 μP 在 Transformer 上的关键修改，确保注意力 logit 在训练过程中不随宽度发散。</div>\n<h5>μTransfer 算法</h5>\n<pre><code class=\"language-python\"># Algorithm 1: μTransfer — 通过小模型调优大模型超参数\n# 输入：目标大模型架构 M_target\n\n# Step 1: 用 μP 参数化目标模型\nmodel_target = apply_muP(M_target)  # 修改初始化方差和学习率缩放\n\n# Step 2: 构建小版本模型并调优\nmodel_small = shrink(M_target, width=small_width)  # 缩小宽度（和/或深度）\nmodel_small = apply_muP(model_small)\nbest_hps = hyperparameter_search(model_small)  # 在小模型上搜索最优 HP\n# 可调参数：学习率、LR schedule、初始化方差、正则化等\n\n# Step 3: 零次迁移\nmodel_target.set_hyperparameters(best_hps)  # 直接复制，无需修改\ntrain(model_target)  # 以迁移的超参数训练大模型\n</code></pre>\n<h5>abc-参数化理论框架</h5>\n<p>论文将参数化形式化为 <strong>abc-参数化</strong>：对于每个参数张量，定义三个缩放指数：\n- <strong>a</strong>（参数乘子）：前向传播中参数的缩放因子\n- <strong>b</strong>（初始化）：初始化标准差随宽度的缩放\n- <strong>c</strong>（学习率）：学习率随宽度的缩放</p>\n<p>SP 和 μP 都是 abc-参数化的特例。论文的核心理论结果是：<strong>μP 是唯一允许超参数零次迁移的 abc-参数化</strong>。直觉上，只有当每层的\"特征学习\"强度（即参数更新对激活值的影响）与宽度无关时，最优超参数才能跨宽度保持稳定。SP 下隐藏层实际上退化为\"核regime\"（kernel regime），即特征几乎不更新，而 μP 确保了\"最大化\"的特征学习。</p>\n<div class=\"key-point\">💡 <strong>核心洞察</strong>：μP 不仅仅是让最优学习率可迁移——它还确保了宽模型能充分进行特征学习（而非退化为核方法），因此 μP 模型在最优超参数下通常<strong>优于</strong> SP 模型即使后者也经过了学习率调优。</div>\n<h5>Coord Check：实现正确性验证</h5>\n<p>论文提出了 <strong>Coord Check</strong>（坐标检查）作为验证 μP 实现正确性的诊断工具。其原理是：在 μP 下，各层激活值的坐标均值应在训练初期保持与宽度无关的稳定性。具体做法是：</p>\n<ol>\n<li>用不同宽度（如 64, 128, 256, ...）初始化模型</li>\n<li>训练若干步，记录每层激活值的坐标均值</li>\n<li>如果各宽度的曲线重合，说明 μP 实现正确；如果发散，说明存在缩放错误</li>\n</ol>\n<h5>与标准参数化的关键区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>标准参数化 (SP)</th>\n<th>μP</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>最优 LR 随宽度</td>\n<td>漂移</td>\n<td>稳定</td>\n</tr>\n<tr>\n<td>宽模型特征学习</td>\n<td>退化（核 regime）</td>\n<td>最大化</td>\n</tr>\n<tr>\n<td>输出层初始化</td>\n<td>\\(1/\\text{fan\\_in}\\)</td>\n<td>\\(1/\\text{fan\\_in}^2\\)</td>\n</tr>\n<tr>\n<td>隐藏层 Adam LR</td>\n<td>固定</td>\n<td>\\(\\propto 1/\\text{fan\\_in}\\)</td>\n</tr>\n<tr>\n<td>注意力缩放</td>\n<td>\\(1/\\sqrt{d}\\)</td>\n<td>\\(1/d\\)</td>\n</tr>\n<tr>\n<td>超参数迁移</td>\n<td>不可靠</td>\n<td>零次迁移</td>\n</tr>\n</tbody>\n</table></div>",
      "quiz": {
        "q": "在 μP 中，Transformer 的注意力 logit 缩放因子应使用什么？",
        "options": [
          "1/√d，与标准 Transformer 相同",
          "1/d，因为训练中 query 和 key 相关导致内积按 d 量级增长",
          "1/d²，为了进一步抑制注意力分数的方差",
          "不需要缩放，μP 的学习率调整已经补偿了这一点"
        ],
        "answer": 1,
        "explain": "训练过程中 q 和 k 变得相关，q⊤k 按 d（而非 √d）量级增长（大数定律而非中心极限定理），因此需要除以 d 而非 √d 来保持注意力 logit 的稳定性。"
      }
    },
    {
      "id": "data_constrained_scaling",
      "num": 4,
      "name": "数据受限规模定律",
      "fullName": "数据受限规模定律 (Scaling Data-Constrained Language Models)",
      "year": "2023.05",
      "org": "HuggingFace",
      "parent": "chinchilla_law",
      "paperUrl": "https://arxiv.org/abs/2305.16264",
      "projectUrl": "",
      "category": "scaling",
      "motivation": "揭示数据重复训练的衰减幂律",
      "summary": "数据受限规模定律 的核心目标是：揭示数据重复训练的衰减幂律。",
      "keyPoints": [
        "核心动机：揭示数据重复训练的衰减幂律",
        "演化来源：继承或改进自 chinchilla_law",
        "代表机构：HuggingFace"
      ],
      "detail": "<p>揭示数据重复训练的衰减幂律</p>"
    },
    {
      "id": "t2_scaling",
      "num": 5,
      "name": "T²缩放定律",
      "fullName": "T²缩放定律 (Train-to-Test Scaling Laws)",
      "year": "2026",
      "org": "多机构",
      "parent": "chinchilla_law",
      "paperUrl": "https://www.machinelearningplus.com/llm/llm-scaling-laws/",
      "projectUrl": "",
      "category": "scaling",
      "motivation": "推理最优的过度训练策略",
      "summary": "T²缩放定律 的核心目标是：推理最优的过度训练策略。",
      "keyPoints": [
        "核心动机：推理最优的过度训练策略",
        "演化来源：继承或改进自 chinchilla_law",
        "代表机构：多机构"
      ],
      "detail": "<p>推理最优的过度训练策略</p>"
    },
    {
      "id": "u_mup",
      "num": 6,
      "name": "u-μP",
      "fullName": "单位缩放μP (Unit-Scaled Maximal Update Parametrization)",
      "year": "2025.11",
      "org": "OPT-ML",
      "parent": "mup",
      "paperUrl": "https://opt-ml.org/papers/2024/paper_26.pdf",
      "projectUrl": "",
      "category": "scaling",
      "motivation": "单位缩放支持FP8稳定训练",
      "summary": "u-μP 将 Unit Scaling 技术融入 μP（Maximal Update Parametrization）框架，通过 abc-对称性消除初始化缩放超参、移除 base-shape 依赖、重新设计 α 缩放因子体系，使得超参数搜索可在极小代理模型上以近乎独立的一维扫描高效完成，并原生支持 FP8 低精度训练，在 7B 规模 LLM 上验证了从小模型到大模型的超参迁移有效性。",
      "keyPoints": [
        "<strong>abc-参数化统一框架</strong>：将权重矩阵的前向缩放 \\(a_W\\)、初始化缩放 \\(b_W\\)、学习率缩放 \\(c_W\\) 纳入统一的 abc-参数化体系，揭示三者之间存在 abc-对称性（可在保持训练动态不变的前提下重新分配缩放）",
        "<strong>消除 \\(\\sigma_W\\) 超参</strong>：利用 abc-对称性将初始化标准差固定为 1（unit init），从而减少一个需要调优的超参维度",
        "<strong>移除 base-shape 依赖</strong>：标准 μP 需要指定一个\"基础模型宽度\"来定义缩放基准，u-μP 通过将缩放因子直接嵌入前向传播（Unit Scaling 风格）完全消除此依赖",
        "<strong>重新定义 α 缩放因子</strong>：将 α 与操作（而非权重）关联，定义 6 个独立的 α 超参：\\(\\alpha_{\\text{ffn-act}}\\)、\\(\\alpha_{\\text{attn-softmax}}\\)、\\(\\alpha_{\\text{out}}\\)、\\(\\alpha_{\\text{res}}\\)、\\(\\alpha_{\\text{res-attn-ratio}}\\)、\\(\\alpha_{\\text{loss-softmax}}\\)",
        "<strong>新的 Embedding 学习率规则</strong>：提出 \\(c_{\\text{emb}} = 1/\\sqrt{d_{\\text{model}}}\\) 的 embedding 层学习率缩放，修正了标准 μP 中 embedding 学习率不随宽度缩放的问题",
        "<strong>独立超参搜索策略</strong>：证明 u-μP 下超参近乎独立，可先扫描学习率（9 次运行），再对其他 α 参数进行独立一维扫描，总搜索成本极低",
        "<strong>原生 FP8 支持</strong>：约 70% 矩阵乘法可直接转为 FP8，仅需保留少数关键张量（注意力 dense 投影、最终 FFN 层、decoder head）为高精度",
        "<strong>大规模验证</strong>：在 1B/3B/7B 参数的 Llama 风格模型上（SlimPajama 300B tokens）验证了超参迁移和 FP8 训练的有效性"
      ],
      "detail": "<h5>核心框架示意</h5>\n<p><img alt=\"u-μP 主要实验结果\" src=\"https://ar5iv.labs.arxiv.org/html/2407.17465v3/assets/x1.png\" />\n<em>图 1：u-μP 的三大核心优势——(a) 高效超参搜索：仅需 9 次 LR 扫描即可接近完整网格搜索效果；(b) 超参从小模型到大模型的可靠迁移；(c) FP8 低精度训练的原生支持</em></p>\n<h5>abc-参数化与对称性</h5>\n<p>u-μP 的理论基础是 <strong>abc-参数化</strong>。对于一个权重矩阵 \\(W\\)，其在前向传播中的实际作用可以表示为：</p>\n<p>$$y = a_W \\cdot (x \\cdot W)$$</p>\n<p>其中 \\(W\\) 的初始化为 \\(W_{ij} \\sim \\mathcal{N}(0, b_W^2)\\)，学习率为 \\(\\eta \\cdot c_W\\)。这三个缩放因子 \\((a_W, b_W, c_W)\\) 完全决定了该层的训练动态。</p>\n<div class=\"key-point\">💡 <strong>关键洞察——abc-对称性</strong>：对于任意正实数 \\(\\lambda\\)，变换 \\(a_W \\to \\lambda \\cdot a_W\\)，\\(b_W \\to b_W / \\lambda\\)，\\(c_W \\to c_W / \\lambda\\) 不改变训练动态。这意味着我们可以自由地在三个缩放因子之间\"搬运\"尺度。</div>\n<p>利用这一对称性，u-μP 做出了一个关键选择：<strong>固定 \\(b_W = 1\\)</strong>（即所有权重以标准正态分布初始化）。这不仅消除了初始化标准差这个超参，还使得权重天然处于 FP8 的有效表示范围内。</p>\n<h5>u-μP 缩放规则</h5>\n<p>基于 abc-对称性和 Unit Scaling 原则，u-μP 为 Transformer 的不同层定义了如下缩放规则：</p>\n<pre><code>┌─────────────────────────────────────────────────────────────┐\n│                    u-μP 缩放规则 (Table 2)                    │\n├──────────┬──────────────┬────────┬──────────────────────────┤\n│  层类型   │  前向缩放 aW  │ 初始化 bW │  学习率缩放 cW            │\n├──────────┼──────────────┼────────┼──────────────────────────┤\n│ Hidden   │ 1/√fan_in    │   1    │  η / √fan_in             │\n│ Input    │ 1            │   1    │  η / √fan_out  (新规则!)  │\n│ Output   │ 1/fan_in     │   1    │  η / √depth              │\n├──────────┴──────────────┴────────┴──────────────────────────┤\n│ 残差连接缩放：1/√depth                                       │\n└─────────────────────────────────────────────────────────────┘\n</code></pre>\n<p>对应的伪代码实现：</p>\n<pre><code class=\"language-python\"># u-μP Transformer 前向传播伪代码\ndef u_mup_transformer(x, layers, params):\n    &quot;&quot;&quot;\n    x: input token ids [batch, seq_len]\n    layers: list of transformer blocks\n    params: {W_emb, W_head, W_q, W_k, W_v, W_o, W_up, W_gate, W_down}\n    &quot;&quot;&quot;\n    depth = len(layers)\n    d_model = params.W_emb.shape[1]\n\n    # === Input Embedding (Input 层规则) ===\n    # aW=1, bW=1, cW=η/√fan_out=η/√d_model\n    h = x @ params.W_emb  # W_emb ~ N(0,1), LR = η/√d_model\n\n    for l in range(depth):\n        residual = h\n\n        # === RMSNorm (非参数化版本，对μP迁移至关重要) ===\n        h_norm = rms_norm(h)  # 无可学习的 γ 参数\n\n        # === Attention (Hidden 层规则) ===\n        # aW=1/√d_model, bW=1, cW=η/√d_model\n        Q = (1/sqrt(d_model)) * (h_norm @ params.W_q[l])\n        K = (1/sqrt(d_model)) * (h_norm @ params.W_k[l])\n        V = (1/sqrt(d_model)) * (h_norm @ params.W_v[l])\n\n        # Scaled dot-product attention\n        # α_attn_softmax 控制 softmax 温度\n        attn_logits = Q @ K.T  # 已经被 1/√d 缩放过\n        attn_logits = attn_logits * alpha_attn_softmax\n        attn_weights = softmax(attn_logits)\n        attn_out = attn_weights @ V\n\n        # Output projection (Hidden 层规则)\n        attn_out = (1/sqrt(d_model)) * (attn_out @ params.W_o[l])\n\n        # === 残差连接 ===\n        # 缩放因子 1/√depth，α_res 和 α_res_attn_ratio 控制比例\n        h = residual + (1/sqrt(depth)) * alpha_res * attn_out\n\n        # === FFN (SwiGLU, Hidden 层规则) ===\n        residual = h\n        h_norm = rms_norm(h)\n\n        gate = (1/sqrt(d_model)) * (h_norm @ params.W_gate[l])\n        up   = (1/sqrt(d_model)) * (h_norm @ params.W_up[l])\n        # α_ffn_act 控制激活函数缩放\n        ffn_out = silu(gate * alpha_ffn_act) * up\n        ffn_out = (1/sqrt(d_ffn)) * (ffn_out @ params.W_down[l])\n\n        h = residual + (1/sqrt(depth)) * alpha_res * ffn_out\n\n    # === Output Head (Output 层规则) ===\n    # aW=1/fan_in=1/d_model, bW=1, cW=η/√depth\n    h_norm = rms_norm(h)\n    logits = (1/d_model) * (h_norm @ params.W_head)\n    logits = logits * alpha_out\n\n    # α_loss_softmax 控制 loss softmax 温度\n    loss = cross_entropy(logits * alpha_loss_softmax, targets)\n    return loss\n</code></pre>\n<h5>动机与背景：μP 的实际困境</h5>\n<p>μP（Maximal Update Parametrization）由 Yang et al. (2022) 提出，其核心承诺是：<strong>在小模型上搜索到的最优超参数可以直接迁移到大模型</strong>。然而在实际应用中，μP 面临四个严重问题：</p>\n<p><strong>问题 1：Llama 风格模型的迁移失败。</strong> 标准 μP 假设使用 LayerNorm，但现代 LLM（如 Llama）使用 RMSNorm 且带有可学习的缩放参数 \\(\\gamma\\)。论文发现，<strong>参数化的 norm 层会破坏 μP 的超参迁移性</strong>。解决方案是使用非参数化的 RMSNorm（去掉 \\(\\gamma\\)），并配合独立的 weight decay 设置。</p>\n<p><strong>问题 2：超参搜索空间不清晰。</strong> μP 引入了多个 α 缩放因子，但未明确哪些需要调优、哪些可以固定，且超参之间存在复杂的相互依赖关系。</p>\n<p><strong>问题 3：base-shape 的困扰。</strong> μP 需要指定一个\"基础模型\"的形状作为缩放参考点，这增加了使用复杂度且引入了额外的隐式超参。</p>\n<p><strong>问题 4：FP8 兼容性差。</strong> 标准 μP 的初始化标准差 \\(\\sigma_W\\) 随宽度缩放（如 \\(1/\\sqrt{d}\\)），在大模型中会变得极小，超出 FP8 的有效表示范围。</p>\n<h5>核心机制详解</h5>\n<p><strong>1. Unit Init 与 FP8 兼容性</strong></p>\n<p>通过 abc-对称性将 \\(b_W\\) 固定为 1，所有权重初始化为标准正态分布。这意味着权重值集中在 \\([-3, 3]\\) 范围内，完美适配 FP8 E4M3 格式（范围 \\([-448, 448]\\)）。相比之下，标准 μP 中 7B 模型的 hidden 层初始化标准差约为 \\(1/\\sqrt{4096} \\approx 0.0156\\)，大量权重值会落入 FP8 的低精度区域。</p>\n<p><strong>2. 新的 Embedding 学习率规则</strong></p>\n<p>标准 μP 中 embedding 层的学习率缩放为 \\(c_{\\text{emb}} = 1\\)（不随宽度变化），这导致 embedding 更新幅度随宽度增大而增大。u-μP 通过分析发现，正确的缩放应为：</p>\n<p>$$c_{\\text{emb}} = \\frac{1}{\\sqrt{d_{\\text{model}}}}$$</p>\n<p>这确保了 embedding 层的更新幅度在不同宽度下保持一致。论文通过实验验证，这一修正显著改善了学习率从小模型到大模型的迁移效果。</p>\n<p><img alt=\"Embedding 学习率规则对比\" src=\"https://ar5iv.labs.arxiv.org/html/2407.17465v3/assets/x3.png\" />\n<em>图 3：不同 embedding 学习率规则下的 LR 迁移对比。u-μP 的新规则（右）相比标准 μP（左）实现了更一致的最优 LR 迁移</em></p>\n<p><strong>3. α 超参的重新设计</strong></p>\n<p>u-μP 将 α 缩放因子从\"与权重关联\"改为\"与操作关联\"，定义了 6 个语义清晰的 α 参数：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>α 参数</th>\n<th>作用位置</th>\n<th>物理含义</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>\\(\\alpha_{\\text{ffn-act}}\\)</td>\n<td>FFN 激活函数前</td>\n<td>控制 SwiGLU 激活的输入幅度</td>\n</tr>\n<tr>\n<td>\\(\\alpha_{\\text{attn-softmax}}\\)</td>\n<td>注意力 softmax 前</td>\n<td>控制注意力分布的锐度（温度）</td>\n</tr>\n<tr>\n<td>\\(\\alpha_{\\text{out}}\\)</td>\n<td>输出 logits</td>\n<td>控制 logits 的整体幅度</td>\n</tr>\n<tr>\n<td>\\(\\alpha_{\\text{res}}\\)</td>\n<td>残差连接</td>\n<td>控制残差分支的相对贡献</td>\n</tr>\n<tr>\n<td>\\(\\alpha_{\\text{res-attn-ratio}}\\)</td>\n<td>attention vs FFN 残差</td>\n<td>控制 attention 和 FFN 残差的相对比例</td>\n</tr>\n<tr>\n<td>\\(\\alpha_{\\text{loss-softmax}}\\)</td>\n<td>loss 计算的 softmax</td>\n<td>控制交叉熵 loss 的 softmax 温度</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 <strong>关键发现——超参独立性</strong>：在 u-μP 框架下，这些 α 参数与学习率之间近乎独立。这意味着可以先固定默认 α 值扫描最优 LR，然后独立地对每个 α 进行一维扫描，而不需要昂贵的联合网格搜索。</div>\n<p><strong>4. 独立超参搜索流程</strong></p>\n<p>论文提出了一个高效的两阶段搜索策略：</p>\n<ul>\n<li><strong>阶段 1</strong>：在小代理模型上，固定所有 α 为默认值，仅扫描学习率 η（约 9 个值）</li>\n<li><strong>阶段 2</strong>：固定最优 η，对每个 α 参数独立进行一维扫描（每个约 5 个值）</li>\n</ul>\n<p>由于各 α 参数独立，阶段 2 的所有扫描可以<strong>并行执行</strong>。总搜索成本仅为 \\(9 + 6 \\times 5 = 39\\) 次小模型训练，远低于联合网格搜索的 \\(9 \\times 5^6 = 140625\\) 次。</p>\n<p>论文通过实验量化了超参独立性：μP 的超参迁移误差（transfer error）约为 0.03，而 u-μP 仅为 0.005，降低了 6 倍。</p>\n<p><img alt=\"超参迁移误差对比\" src=\"https://ar5iv.labs.arxiv.org/html/2407.17465v3/assets/x4.png\" />\n<em>图 4：μP vs u-μP 的超参迁移误差。u-μP 在各超参维度上的迁移误差显著更低</em></p>\n<p><strong>5. FP8 训练策略</strong></p>\n<p>u-μP 的 unit init 天然适配 FP8，但并非所有张量都适合低精度。论文通过逐层分析 per-tensor RMS，识别出三类需要保持高精度的关键张量：</p>\n<ol>\n<li><strong>注意力 dense 投影</strong>（\\(W_o\\) 的输出）：因为注意力权重经 softmax 后分布极不均匀</li>\n<li><strong>最终 FFN 层</strong>（最后一个 transformer block 的 FFN）：对输出影响最大</li>\n<li><strong>Decoder head</strong>（\\(W_{\\text{head}}\\)）：直接影响 logits 精度</li>\n</ol>\n<p>保留这些张量为 BF16/FP16 后，约 70% 的矩阵乘法仍可在 FP8 下执行，实现了精度与效率的良好平衡。</p>\n<h5>与标准 μP 的关键区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>标准 μP</th>\n<th>u-μP</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>初始化</td>\n<td>\\(\\sigma_W\\) 随宽度缩放</td>\n<td>固定 \\(b_W = 1\\)（unit init）</td>\n</tr>\n<tr>\n<td>Base shape</td>\n<td>需要指定基础模型宽度</td>\n<td>完全不需要</td>\n</tr>\n<tr>\n<td>Embedding LR</td>\n<td>\\(c_{\\text{emb}} = 1\\)</td>\n<td>\\(c_{\\text{emb}} = 1/\\sqrt{d_{\\text{model}}}\\)</td>\n</tr>\n<tr>\n<td>α 定义</td>\n<td>与权重关联</td>\n<td>与操作关联（6 个独立 α）</td>\n</tr>\n<tr>\n<td>HP 搜索</td>\n<td>联合网格搜索</td>\n<td>先 LR 后独立 α 扫描</td>\n</tr>\n<tr>\n<td>Norm 层</td>\n<td>支持参数化 LayerNorm</td>\n<td>要求非参数化 RMSNorm</td>\n</tr>\n<tr>\n<td>FP8 支持</td>\n<td>困难（小 \\(\\sigma_W\\)）</td>\n<td>原生支持（unit init）</td>\n</tr>\n<tr>\n<td>Weight decay</td>\n<td>与 LR 耦合</td>\n<td>独立设置</td>\n</tr>\n</tbody>\n</table></div>\n<h5>大规模实验验证</h5>\n<p>论文在 SlimPajama 数据集（300B tokens）上训练了 1B、3B、7B 参数的 Llama 风格模型：</p>\n<ul>\n<li><strong>HP 迁移有效性</strong>：从 width=2048 的代理模型搜索到的超参，直接应用于 7B 模型（width=4096），性能与在 7B 上直接搜索的结果相当</li>\n<li><strong>FP8 训练</strong>：u-μP FP8 模型在 7B 规模上的 benchmark 性能与标准参数化 BF16 模型相当，验证 loss 差距极小</li>\n<li><strong>LR 迁移跨维度泛化</strong>：最优 LR 不仅跨宽度迁移，还跨训练步数、batch size、深度等维度迁移</li>\n</ul>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：u-μP 要求使用非参数化的 RMSNorm（去掉可学习的 \\(\\gamma\\)），以及独立于学习率的 weight decay 设置。这两个条件是超参迁移成功的必要前提。</div>",
      "quiz": {
        "q": "u-μP 通过什么机制将所有权重的初始化标准差固定为 1？",
        "options": [
          "通过引入额外的归一化层来约束权重分布",
          "利用 abc-对称性将初始化缩放转移到前向传播的缩放因子中",
          "在训练过程中动态调整权重的标准差",
          "使用特殊的正交初始化方法替代高斯初始化"
        ],
        "answer": 1,
        "explain": "abc-对称性表明 (aW, bW, cW) 可以在保持训练动态不变的前提下重新分配缩放。u-μP 利用这一性质，将 bW 固定为 1，同时相应调整 aW（前向缩放）和 cW（学习率缩放），从而实现 unit init 而不改变模型行为。"
      }
    },
    {
      "id": "rl_scaling",
      "num": 7,
      "name": "RL Scaling Laws",
      "fullName": "强化学习规模定律 (RL Scaling Laws)",
      "year": "2026",
      "org": "多机构",
      "parent": "kaplan_scaling",
      "paperUrl": "https://www.machinelearningplus.com/llm/llm-scaling-laws/",
      "projectUrl": "",
      "category": "scaling",
      "motivation": "强化学习阶段能力-计算量预测",
      "summary": "RL Scaling Laws 的核心目标是：强化学习阶段能力-计算量预测。",
      "keyPoints": [
        "核心动机：强化学习阶段能力-计算量预测",
        "演化来源：继承或改进自 kaplan_scaling",
        "代表机构：多机构"
      ],
      "detail": "<p>强化学习阶段能力-计算量预测</p>"
    },
    {
      "id": "c4",
      "num": 8,
      "name": "C4",
      "fullName": "C4数据集 (Colossal Clean Crawled Corpus)",
      "year": "2020",
      "org": "Google",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/1910.10683",
      "projectUrl": "",
      "category": "data",
      "motivation": "T5基石数据集启发式规则清洗",
      "summary": "C4 的核心目标是：T5基石数据集启发式规则清洗。",
      "keyPoints": [
        "核心动机：T5基石数据集启发式规则清洗",
        "代表机构：Google"
      ],
      "detail": "<p>T5基石数据集启发式规则清洗</p>"
    },
    {
      "id": "the_pile",
      "num": 9,
      "name": "The Pile",
      "fullName": "The Pile数据集 (The Pile: An 800GB Dataset)",
      "year": "2021",
      "org": "EleutherAI",
      "parent": "c4",
      "paperUrl": "https://arxiv.org/abs/2101.00027",
      "projectUrl": "",
      "category": "data",
      "motivation": "825GB多源数据集强调多样性",
      "summary": "The Pile 的核心目标是：825GB多源数据集强调多样性。",
      "keyPoints": [
        "核心动机：825GB多源数据集强调多样性",
        "演化来源：继承或改进自 c4",
        "代表机构：EleutherAI"
      ],
      "detail": "<p>825GB多源数据集强调多样性</p>"
    },
    {
      "id": "minhash_dedup",
      "num": 10,
      "name": "MinHash LSH",
      "fullName": "MinHash局部敏感哈希去重 (MinHash LSH Deduplication)",
      "year": "2022",
      "org": "学术界",
      "parent": "—",
      "paperUrl": "https://aclanthology.org/2022.acl-long.577/",
      "projectUrl": "",
      "category": "data",
      "motivation": "局部敏感哈希实现文档级去重",
      "summary": "MinHash LSH 的核心目标是：局部敏感哈希实现文档级去重。",
      "keyPoints": [
        "核心动机：局部敏感哈希实现文档级去重",
        "代表机构：学术界"
      ],
      "detail": "<p>局部敏感哈希实现文档级去重</p>"
    },
    {
      "id": "suffix_array_dedup",
      "num": 11,
      "name": "Suffix Array去重",
      "fullName": "后缀数组去重 (Suffix Array Deduplication)",
      "year": "2022",
      "org": "Google",
      "parent": "minhash_dedup",
      "paperUrl": "https://aclanthology.org/2022.acl-long.577/",
      "projectUrl": "",
      "category": "data",
      "motivation": "后缀数组子串去重防重复生成",
      "summary": "Suffix Array去重 的核心目标是：后缀数组子串去重防重复生成。",
      "keyPoints": [
        "核心动机：后缀数组子串去重防重复生成",
        "演化来源：继承或改进自 minhash_dedup",
        "代表机构：Google"
      ],
      "detail": "<p>后缀数组子串去重防重复生成</p>"
    },
    {
      "id": "refinedweb",
      "num": 12,
      "name": "RefinedWeb",
      "fullName": "RefinedWeb数据集 (RefinedWeb Dataset)",
      "year": "2023",
      "org": "TII",
      "parent": "c4",
      "paperUrl": "https://arxiv.org/abs/2306.01116",
      "projectUrl": "",
      "category": "data",
      "motivation": "5T纯网页数据MDR方法论",
      "summary": "RefinedWeb 的核心目标是：5T纯网页数据MDR方法论。",
      "keyPoints": [
        "核心动机：5T纯网页数据MDR方法论",
        "演化来源：继承或改进自 c4",
        "代表机构：TII"
      ],
      "detail": "<p>5T纯网页数据MDR方法论</p>"
    },
    {
      "id": "dolma",
      "num": 13,
      "name": "Dolma",
      "fullName": "Dolma数据集 (Dolma: An Open Corpus)",
      "year": "2024",
      "org": "AI2",
      "parent": "the_pile",
      "paperUrl": "https://aclanthology.org/2024.acl-long.840/",
      "projectUrl": "",
      "category": "data",
      "motivation": "3T全透明开源支持OLMo研究",
      "summary": "Dolma 构建了一个包含 3 万亿 token 的英文预训练语料库，融合 Web、代码、学术论文、书籍、社交媒体和百科等 7 类数据源，并开源了完整的数据处理工具链（语言过滤、质量过滤、内容过滤、去重），通过系统性消融实验验证了各处理步骤的有效性，为开放语言模型 OLMo 的训练提供了可复现的数据基础。",
      "keyPoints": [
        "<strong>7 大数据源、3T tokens</strong>：Common Crawl（2281B）、The Stack（411B）、C4（198B）、Reddit（89B）、PeS2o（70B）、Project Gutenberg（6B）、Wikipedia+Wikibooks（4.3B）",
        "<strong>四阶段处理 Pipeline</strong>：语言过滤（fastText）→ 质量过滤（Gopher+C4 启发式规则）→ 内容过滤（Jigsaw 毒性分类器 + PII 正则）→ 去重（URL/文档/段落级 Bloom filter）",
        "<strong>Web 数据处理</strong>：基于 CCNet 处理 25 个 Common Crawl 快照（2020-05 至 2023-06），过滤掉 84.2% 的原始内容",
        "<strong>质量过滤策略</strong>：拒绝 CCNet 的模型打分，采用 Gopher All + C4 NoPunc 启发式规则组合，消融实验证明其优于单独使用任一规则集",
        "<strong>毒性过滤</strong>：使用 Jigsaw 毒性分类器对 hate/NSFW 内容进行阈值过滤，提供高/低两档阈值选择",
        "<strong>去重机制</strong>：URL 精确去重 + 基于 Bloom filter 的段落级去重，Web 数据去重率达 61.7%",
        "<strong>基准去污染</strong>：段落匹配方式移除与 Paloma 评测集重叠的文档，实验证明不会降低模型性能",
        "<strong>混合策略实验</strong>：代码数据（5%~15%）显著提升推理任务表现；多源混合比例通过 1B 模型消融实验确定",
        "<strong>完全开源</strong>：数据集（HuggingFace）+ 数据处理工具链（GitHub）+ 处理文档全部公开"
      ],
      "detail": "<p><img alt=\"Dolma 数据处理 Pipeline 总览\" src=\"https://ar5iv.labs.arxiv.org/html/2402.00159/assets/x1.png\" />\n<em>图：Dolma 数据处理 Pipeline 总览——每个数据源经过语言过滤、质量过滤、内容过滤和去重四个阶段</em></p>\n<pre><code class=\"language-python\"># Dolma Web 数据处理 Pipeline 伪代码\ndef dolma_web_pipeline(common_crawl_snapshots):\n    &quot;&quot;&quot;处理 25 个 Common Crawl 快照 (2020-05 ~ 2023-06)&quot;&quot;&quot;\n    documents = []\n    for snapshot in common_crawl_snapshots:\n        # Step 1: 语言过滤 (CCNet + fastText)\n        docs = ccnet_extract(snapshot)\n        docs = [d for d in docs if fasttext_en_score(d) &gt;= 0.5]  # 移除 61.7%\n\n        # Step 2: 质量过滤 (Gopher All + C4 NoPunc)\n        docs = gopher_filter(docs)       # 移除 15.23% UTF-8 字符\n        docs = c4_nopunc_filter(docs)     # 移除无标点段落, 22.73% 字符\n        docs = remove_repeated_ngrams(docs, max_len=100)  # 移除重复 n-gram\n\n        # Step 3: 内容过滤\n        docs = jigsaw_toxicity_filter(docs, hate_threshold, nsfw_threshold)\n        docs = pii_mask_or_remove(docs, regex_patterns=['email', 'ip', 'phone'])\n\n        # Step 4: 去重\n        docs = url_dedup(docs)                        # URL 精确去重\n        docs = bloom_filter_paragraph_dedup(docs)      # 段落级 Bloom filter\n        docs = bloom_filter_document_dedup(docs)       # 文档级去重\n\n        documents.extend(docs)\n\n    # Step 5: 基准去污染\n    documents = decontaminate(documents, benchmark='paloma',\n                               method='paragraph_match', min_tokens=13)\n    return documents  # 175.1 TB → 27.7 TB (CCNet) → 最终 ~9 TB\n</code></pre>\n<p><strong>动机与背景：为什么需要 Dolma？</strong></p>\n<p>当前最强大的语言模型（如 GPT-4、PaLM）几乎不公开其训练数据的任何信息，即使是开源模型（如 LLaMA）也很少释放完整的训练语料或可复现的构建方案。这导致了一个根本性的研究瓶颈：研究者无法系统地研究训练数据如何影响模型能力和局限性。Dolma 的核心动机是打破这一信息壁垒——不仅提供一个 3T token 规模的高质量英文语料库，更重要的是开源整个数据处理工具链和详细的构建文档，使得任何研究者都能复现、修改和改进数据处理流程。Dolma 的设计遵循三个原则：(1) 语料规模需达到 2-3T tokens 以支持大规模训练实验；(2) 数据来源需多样化以覆盖不同领域知识；(3) 整个流程必须完全透明和可复现。</p>\n<p><strong>核心机制：四阶段处理 Pipeline 详解</strong></p>\n<p>Dolma 的数据处理 Pipeline 由四个串行阶段组成，每个阶段都经过了严格的消融实验验证：</p>\n<p><strong>（1）语言过滤</strong>：使用 CCNet 框架集成的 fastText 语言识别模型，对每个文档计算英文概率分数，保留分数 \\(\\geq 0.5\\) 的文档。仅此一步就过滤掉了 61.7% 的 Web 页面。CCNet 还会在每个快照内按分片分组，移除高频重复段落（主要是导航栏和页头），此步骤移除了约 70% 的段落。整个 CCNet 阶段将 Common Crawl 从 175.1 TB 压缩至 27.7 TB，过滤率达 84.2%。</p>\n<p><strong>（2）质量过滤</strong>：这是 Dolma 最具特色的设计决策之一。CCNet 原生提供基于 KenLM 困惑度的质量分桶（高/中/低），但 Dolma 团队经过人工检查发现这种模型打分方式并不可靠——它倾向于保留\"类维基百科\"的文本而过度过滤其他有价值的内容。因此，Dolma 选择了纯启发式规则组合：Gopher All（来自 DeepMind 的 Gopher 论文，包含文档长度、符号比例、重复行比例等规则）+ C4 NoPunc（来自 T5 的 C4 数据集，仅保留\"移除不以标点结尾的段落\"这一条规则）。消融实验（Figure 2）表明，这一组合在困惑度和下游任务（HellaSwag）上均优于单独使用任一规则集。此外，团队还发现即使经过 Gopher+C4 过滤，仍存在大量重复 n-gram（如连续 100 个 '-' 出现超过 6000 万次），因此额外实现了移除超过 100 个 UTF-8 字符的重复序列的规则。</p>\n<p><strong>（3）内容过滤</strong>：包含毒性过滤和 PII（个人身份信息）处理两部分。毒性过滤使用 Jigsaw Toxic Comments 分类器对每个文档的 hate、NSFW 等维度进行打分，提供高阈值（保守，移除约 5-7% 内容）和低阈值（激进，移除约 29-35% 内容）两种选择。消融实验（Figure 3）显示低阈值在语言建模和下游任务上表现更好，但移除的内容更多。PII 处理采用正则表达式检测邮箱、IP 地址和电话号码，默认策略是将检测到的 PII 替换为特殊标记（如 <code>{{EMAIL}}</code>），而非直接删除整个文档。实验（Figure 4）表明 PII 过滤策略对模型性能几乎没有影响。</p>\n<p><strong>（4）去重</strong>：采用多层级去重策略。URL 去重在同一快照内移除相同 URL 的重复文档；段落级去重使用 Bloom filter 在所有快照间识别重复段落；文档级去重同样基于 Bloom filter。去重是移除数据量最大的步骤，Web 数据的去重率达到 61.7%。</p>\n<div class=\"key-point\">💡 关键：Dolma 明确拒绝了基于模型的质量过滤（如 KenLM 困惑度打分），转而采用可解释的启发式规则组合。这一设计选择的核心理由是：模型打分会引入隐式偏见，偏好\"类维基百科\"文本，而启发式规则更加透明、可控、可复现。</div>\n<p><strong>混合策略与代码数据的作用</strong></p>\n<p>Dolma 作为多源数据集，训练时需要确定各源的混合比例。团队通过 1B 参数模型在 150B tokens 上的消融实验探索了两个关键问题：</p>\n<p><em>代码数据的比例</em>：通过对比 0%、5%、15% 代码混合比例的模型，发现代码数据显著提升推理任务表现（Table 4）。在 bAbI 任务上，0% 代码的模型完全失败（0.0），而 15% 代码的模型达到 10.1；在 WebNLG 上从 16.8 提升至 22.0。更有趣的是，在 GSM8K 数学推理任务上，所有模型在标准设置下都失败了，但当使用 Program-Aided Language（PAL）方式——即让模型生成 Python 代码来解题时，预训练含代码的模型显著优于纯文本模型（14.7 vs 11.8）。</p>\n<p><em>多源混合比例</em>：团队实验了多种混合配置（Table 5），发现排除代码会增加代码数据集上的困惑度，而上采样学术论文和维基百科则降低了 S2ORC 上的困惑度。最终 Dolma 不强制规定单一混合策略，而是提供灵活的混合工具，让研究者根据需求自行调整。</p>\n<div class=\"warn-box\">⚠️ 注意：Dolma 的基准去污染实验（Table 3）表明，段落匹配方式移除与 Paloma 评测集重叠的文档后，模型在困惑度和下游任务上均无一致性性能下降，验证了去污染策略的安全性。</div>",
      "quiz": {
        "q": "Dolma 在质量过滤阶段为什么拒绝使用 CCNet 原生的 KenLM 困惑度打分？",
        "options": [
          "KenLM 模型计算开销太大，无法处理 3T 规模的数据",
          "KenLM 打分偏好类维基百科文本，引入隐式偏见，且与启发式规则相关性低",
          "KenLM 只支持英文，无法处理多语言数据",
          "KenLM 的过滤效果不如直接使用 GPT-2 困惑度打分"
        ],
        "answer": 1,
        "explain": "论文明确指出 CCNet 的 KenLM 质量分桶与 Gopher+C4 启发式规则的相关性极低（过滤后文档在高/中/低桶的分布几乎不变），且基于模型的过滤会引入偏向维基百科风格文本的隐式偏见，因此选择了更透明可控的启发式规则组合。"
      }
    },
    {
      "id": "doremi",
      "num": 14,
      "name": "DoReMi",
      "fullName": "DoReMi数据配比优化 (DoReMi: Optimizing Data Mixtures)",
      "year": "2023",
      "org": "Stanford",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2305.10429",
      "projectUrl": "",
      "category": "data",
      "motivation": "极小极大优化自动确定数据配比",
      "summary": "DoReMi 的核心目标是：极小极大优化自动确定数据配比。",
      "keyPoints": [
        "核心动机：极小极大优化自动确定数据配比",
        "代表机构：Stanford"
      ],
      "detail": "<p>极小极大优化自动确定数据配比</p>"
    },
    {
      "id": "fineweb",
      "num": 15,
      "name": "FineWeb",
      "fullName": "FineWeb数据集 (FineWeb Dataset)",
      "year": "2024",
      "org": "HuggingFace",
      "parent": "refinedweb",
      "paperUrl": "https://huggingface.co/datasets/HuggingFaceFW/fineweb",
      "projectUrl": "",
      "category": "data",
      "motivation": "15T最高质量开源网页语料",
      "summary": "FineWeb 的核心目标是：15T最高质量开源网页语料。",
      "keyPoints": [
        "核心动机：15T最高质量开源网页语料",
        "演化来源：继承或改进自 refinedweb",
        "代表机构：HuggingFace"
      ],
      "detail": "<p>15T最高质量开源网页语料</p>"
    },
    {
      "id": "common_corpus",
      "num": 16,
      "name": "Common Corpus",
      "fullName": "Common Corpus数据集 (Common Corpus Dataset)",
      "year": "2026",
      "org": "ICLR社区",
      "parent": "dolma",
      "paperUrl": "https://openreview.net/forum?id=Submission25369",
      "projectUrl": "",
      "category": "data",
      "motivation": "2T完全合规多语言数据集",
      "summary": "Common Corpus 的核心目标是：2T完全合规多语言数据集。",
      "keyPoints": [
        "核心动机：2T完全合规多语言数据集",
        "演化来源：继承或改进自 dolma",
        "代表机构：ICLR社区"
      ],
      "detail": "<p>2T完全合规多语言数据集</p>"
    },
    {
      "id": "essential_web",
      "num": 17,
      "name": "Essential-Web",
      "fullName": "Essential-Web数据集 (Essential-Web Dataset)",
      "year": "2026",
      "org": "学术界",
      "parent": "fineweb",
      "paperUrl": "https://arxiv.org/abs/2501.02404",
      "projectUrl": "",
      "category": "data",
      "motivation": "24T带12类文档分类标签",
      "summary": "Essential-Web 的核心目标是：24T带12类文档分类标签。",
      "keyPoints": [
        "核心动机：24T带12类文档分类标签",
        "演化来源：继承或改进自 fineweb",
        "代表机构：学术界"
      ],
      "detail": "<p>24T带12类文档分类标签</p>"
    },
    {
      "id": "fed_dedup",
      "num": 18,
      "name": "FED框架",
      "fullName": "FED去重框架 (Fast and Efficient Dataset Deduplication)",
      "year": "2026",
      "org": "学术界",
      "parent": "minhash_dedup",
      "paperUrl": "https://arxiv.org/abs/2501.02404",
      "projectUrl": "",
      "category": "data",
      "motivation": "GPU加速MinHash快107倍",
      "summary": "FED框架 的核心目标是：GPU加速MinHash快107倍。",
      "keyPoints": [
        "核心动机：GPU加速MinHash快107倍",
        "演化来源：继承或改进自 minhash_dedup",
        "代表机构：学术界"
      ],
      "detail": "<p>GPU加速MinHash快107倍</p>"
    },
    {
      "id": "lshbloom",
      "num": 19,
      "name": "LSHBloom",
      "fullName": "LSHBloom去重 (LSHBloom Deduplication)",
      "year": "2026",
      "org": "学术界",
      "parent": "fed_dedup",
      "paperUrl": "https://arxiv.org/abs/2501.02404",
      "projectUrl": "",
      "category": "data",
      "motivation": "Bloom Filter节省18倍空间",
      "summary": "LSHBloom 的核心目标是：Bloom Filter节省18倍空间。",
      "keyPoints": [
        "核心动机：Bloom Filter节省18倍空间",
        "演化来源：继承或改进自 fed_dedup",
        "代表机构：学术界"
      ],
      "detail": "<p>Bloom Filter节省18倍空间</p>"
    },
    {
      "id": "data_mixing_agent",
      "num": 20,
      "name": "Data Mixing Agent",
      "fullName": "数据混合代理 (Data Mixing Agent)",
      "year": "2026",
      "org": "学术界",
      "parent": "doremi",
      "paperUrl": "https://arxiv.org/abs/2604.16380",
      "projectUrl": "",
      "category": "data",
      "motivation": "强化学习动态数据加权",
      "summary": "Data Mixing Agent 的核心目标是：强化学习动态数据加权。",
      "keyPoints": [
        "核心动机：强化学习动态数据加权",
        "演化来源：继承或改进自 doremi",
        "代表机构：学术界"
      ],
      "detail": "<p>强化学习动态数据加权</p>"
    },
    {
      "id": "mixed_precision",
      "num": 21,
      "name": "混合精度训练",
      "fullName": "混合精度训练 (Mixed Precision Training)",
      "year": "2018",
      "org": "NVIDIA",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/1710.03740",
      "projectUrl": "",
      "category": "training",
      "motivation": "FP16计算FP32存储Loss Scaling",
      "summary": "混合精度训练 的核心目标是：FP16计算FP32存储Loss Scaling。",
      "keyPoints": [
        "核心动机：FP16计算FP32存储Loss Scaling",
        "代表机构：NVIDIA"
      ],
      "detail": "<p>FP16计算FP32存储Loss Scaling</p>"
    },
    {
      "id": "flash_attention",
      "num": 22,
      "name": "FlashAttention",
      "fullName": "FlashAttention (FlashAttention: Fast and Memory-Efficient)",
      "year": "2022",
      "org": "Stanford",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2205.14135",
      "projectUrl": "",
      "category": "training",
      "motivation": "IO感知算法SRAM内完成Attention",
      "summary": "FlashAttention 的核心目标是：IO感知算法SRAM内完成Attention。",
      "keyPoints": [
        "核心动机：IO感知算法SRAM内完成Attention",
        "代表机构：Stanford"
      ],
      "detail": "<p>IO感知算法SRAM内完成Attention</p>"
    },
    {
      "id": "flash_attention_2",
      "num": 23,
      "name": "FlashAttention-2",
      "fullName": "FlashAttention-2 (FlashAttention-2: Faster Attention)",
      "year": "2023",
      "org": "Stanford",
      "parent": "flash_attention",
      "paperUrl": "https://arxiv.org/abs/2307.08691",
      "projectUrl": "",
      "category": "training",
      "motivation": "优化并行度提升2倍速度",
      "summary": "FlashAttention-2 的核心目标是：优化并行度提升2倍速度。",
      "keyPoints": [
        "核心动机：优化并行度提升2倍速度",
        "演化来源：继承或改进自 flash_attention",
        "代表机构：Stanford"
      ],
      "detail": "<p>优化并行度提升2倍速度</p>"
    },
    {
      "id": "wesar",
      "num": 24,
      "name": "WeSaR",
      "fullName": "WeSaR (Weight Scaling as Reparameterization)",
      "year": "2025.10",
      "org": "学术界",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2410.16682",
      "projectUrl": "",
      "category": "training",
      "motivation": "可学习门控抑制梯度爆炸",
      "summary": "WeSaR 的核心目标是：可学习门控抑制梯度爆炸。",
      "keyPoints": [
        "核心动机：可学习门控抑制梯度爆炸",
        "代表机构：学术界"
      ],
      "detail": "<p>可学习门控抑制梯度爆炸</p>"
    },
    {
      "id": "muon",
      "num": 25,
      "name": "Muon优化器",
      "fullName": "Muon优化器 (MomentUm Orthogonalized by Newton-Schulz)",
      "year": "2025.02",
      "org": "学术界",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2502.16982",
      "projectUrl": "",
      "category": "training",
      "motivation": "梯度正交化节省50%计算步骤",
      "summary": "Muon 通过 Newton-Schulz 迭代对梯度动量进行正交化，实现谱范数下的最速下降方向，并引入 weight decay 与 update RMS 匹配机制使其可扩展至大规模 LLM 训练，仅需约 **50% 的训练 FLOPs** 即可达到 AdamW 同等性能。",
      "keyPoints": [
        "<strong>谱范数最速下降</strong>：Muon 将梯度动量矩阵正交化（取其最近正交矩阵），等价于在谱范数约束下的最速下降方向，比 AdamW 的逐元素缩放更高效利用矩阵结构",
        "<strong>Newton-Schulz 迭代</strong>：使用 5 次多项式迭代 \\(X_{k+1} = a X_k + b X_k^3 + c X_k^5\\) 近似矩阵极分解，完全由矩阵乘法组成，GPU 友好且无需 SVD",
        "<strong>Weight Decay 稳定训练</strong>：原始 Muon 无 weight decay 导致权重范数膨胀、训练不稳定；引入 \\(\\lambda = 0.1\\) 的 weight decay 解决此问题",
        "<strong>Update RMS 匹配</strong>：通过 \\(\\text{lr} \\times \\sqrt{\\max(m, n)/n} \\times 0.2\\) 的缩放因子，使 Muon 的 update RMS 与 AdamW 对齐，可直接复用 AdamW 的超参数",
        "<strong>分布式 ZeRO-1 实现</strong>：每个 GPU 仅存储部分参数的动量，通过 all-gather 拼接后执行 Newton-Schulz 迭代，内存开销仅为 AdamW 的约 50%",
        "<strong>混合策略</strong>：2D 权重矩阵使用 Muon，1D 参数（bias、LayerNorm、embedding）仍使用 AdamW",
        "<strong>Scaling Law 验证</strong>：在 1.5B 到 16B 参数规模上验证，Muon 的 scaling law 曲线始终优于 AdamW，仅需约 52% FLOPs 匹配同等损失",
        "<strong>Moonlight 模型</strong>：基于 Muon 训练的 3B/16B MoE 模型（5.7T tokens），在多项基准上超越同规模竞品"
      ],
      "detail": "<h5>核心框架图</h5>\n<p><img alt=\"Muon vs AdamW Scaling Law\" src=\"https://ar5iv.labs.arxiv.org/html/2502.16982/assets/x1.png\" />\n<em>图 1(a)：Muon 与 AdamW 在不同 FLOPs 预算下的验证损失对比。Muon 在所有计算预算下均优于 AdamW，且差距随规模增大而保持。</em></p>\n<p><img alt=\"Moonlight MMLU 对比\" src=\"https://ar5iv.labs.arxiv.org/html/2502.16982/assets/x2.png\" />\n<em>图 1(b)：Moonlight（Muon 训练）与其他同规模模型在 MMLU 上的对比，展示了 Muon 在下游任务上的优势。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># Muon 优化器核心算法（含 weight decay 和 update RMS 匹配）\n# 输入: 参数 θ, 学习率 η, 动量系数 μ, weight decay λ, NS迭代次数 k=5\n# NS多项式系数: a=3.4445, b=-4.7750, c=2.0315\n\ndef muon_step(θ, grad, momentum_buffer, η, μ=0.95, λ=0.1):\n    # 1. 更新动量（Nesterov 风格）\n    buf = μ * momentum_buffer + grad\n    grad_with_nesterov = grad + μ * buf\n\n    # 2. Newton-Schulz 迭代正交化（仅对 2D 权重矩阵）\n    G = grad_with_nesterov  # shape: (m, n)\n    # 初始缩放使谱范数约为 1\n    G = G / (G.norm() + 1e-7)\n\n    # 5 次 NS 迭代\n    for _ in range(5):\n        A = G @ G.T                    # (m, m)\n        G = 3.4445 * G - 4.7750 * (A @ G) + 2.0315 * (A @ A @ G)\n\n    # 3. Update RMS 匹配缩放\n    m, n = θ.shape\n    scale = 0.2 * sqrt(max(m, n) / n)\n\n    # 4. 参数更新（含 weight decay）\n    θ = θ - η * (scale * G + λ * θ)\n\n    return θ, buf\n</code></pre>\n<pre><code class=\"language-python\"># 分布式 Muon（ZeRO-1 风格）\n# 每个 GPU rank 仅存储 1/world_size 的动量\n\ndef distributed_muon_step(θ_full, grad_full, local_momentum, rank, world_size):\n    # 每个 rank 只处理自己负责的参数分片\n    chunk_size = len(θ_full) // world_size\n    local_grad = grad_full[rank * chunk_size : (rank+1) * chunk_size]\n\n    # 本地更新动量\n    local_momentum = μ * local_momentum + local_grad\n    local_nesterov = local_grad + μ * local_momentum\n\n    # All-gather 拼接完整动量矩阵\n    full_nesterov = all_gather(local_nesterov)  # 通信\n\n    # 在完整矩阵上执行 Newton-Schulz 迭代\n    G = newton_schulz_orthogonalize(full_nesterov, k=5)\n\n    # 取回本地分片进行参数更新\n    local_update = G[rank * chunk_size : (rank+1) * chunk_size]\n    θ_local = θ_local - η * (scale * local_update + λ * θ_local)\n</code></pre>\n<h5>动机与背景</h5>\n<p><strong>AdamW 的局限性</strong>：AdamW 通过逐元素的二阶矩估计来缩放梯度，本质上是在 \\(\\ell_\\infty\\) 范数约束下的最速下降。这种逐元素操作忽略了权重矩阵的矩阵结构，无法利用梯度矩阵的奇异值分布信息。</p>\n<p><strong>Muon 的核心洞察</strong>：对于权重矩阵 \\(W \\in \\mathbb{R}^{m \\times n}\\)，更自然的约束应该是谱范数（最大奇异值）。在谱范数约束下的最速下降方向恰好是梯度矩阵的<strong>正交极因子</strong>（orthogonal polar factor），即将梯度 SVD 分解 \\(G = U \\Sigma V^T\\) 后取 \\(UV^T\\)。</p>\n<div class=\"key-point\">💡 <strong>关键直觉</strong>：正交化后的更新方向 \\(UV^T\\) 保留了梯度的方向信息但移除了奇异值的不均匀缩放，使得所有方向上的更新幅度一致，避免了某些方向更新过大或过小的问题。</div>\n<h5>Newton-Schulz 迭代的数学原理</h5>\n<p>直接计算 SVD 代价高昂且不适合 GPU 并行。Muon 使用 <strong>Newton-Schulz 迭代</strong> 来近似极分解：</p>\n<p>$$X_{k+1} = a X_k + b X_k (X_k^T X_k) + c X_k (X_k^T X_k)^2$$</p>\n<p>其中 \\(a = 3.4445, b = -4.7750, c = 2.0315\\)，这些系数经过优化以最大化收敛速度。</p>\n<p><strong>为什么只需 5 次迭代？</strong> 初始矩阵经过谱范数归一化后，其奇异值已经在 \\([0, 1]\\) 范围内。5 次迭代足以将所有奇异值映射到接近 1（即正交化），因为每次迭代都是一个 5 阶多项式映射 \\(\\sigma \\mapsto (a + b\\sigma^2 + c\\sigma^4) \\cdot \\sigma\\)，在 \\([0, 1]\\) 上快速收敛到恒等函数。</p>\n<p><strong>计算复杂度</strong>：每次迭代仅涉及矩阵乘法，5 次迭代共需约 15 次矩阵乘法。对于 \\(m \\times n\\) 矩阵，总 FLOPs 约为 \\(O(15 \\cdot m \\cdot n \\cdot \\min(m,n))\\)，远小于前向/反向传播的计算量。</p>\n<h5>Weight Decay 的必要性</h5>\n<p><img alt=\"Weight Decay 消融实验\" src=\"https://ar5iv.labs.arxiv.org/html/2502.16982/assets/x3.png\" />\n<em>图 2：AdamW（绿色）、无 weight decay 的 Muon（红色）、有 weight decay 的 Muon（蓝色）的验证损失曲线。无 weight decay 的 Muon 在训练后期出现损失上升。</em></p>\n<p>原始 Muon 没有 weight decay，导致两个问题：</p>\n<ol>\n<li><strong>权重范数膨胀</strong>：正交化更新的范数恒定（不随权重大小调整），缺乏隐式正则化效果</li>\n<li><strong>训练不稳定</strong>：在大规模训练中（&gt;100B tokens），权重范数持续增长最终导致训练崩溃</li>\n</ol>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：AdamW 的逐元素归一化天然具有一定的权重范数控制效果（大权重对应大梯度时更新比例较小），而 Muon 的正交化更新不具备此性质，因此显式 weight decay 是必需的。</div>\n<p>论文实验表明 \\(\\lambda = 0.1\\) 在所有规模上都表现良好，无需针对模型大小调整。</p>\n<h5>Update RMS 匹配机制</h5>\n<p>这是使 Muon 可扩展的关键工程创新。核心问题是：<strong>如何让 Muon 直接复用 AdamW 经过大量调参得到的学习率？</strong></p>\n<p><strong>观察</strong>：AdamW 的 update RMS（参数更新的均方根）约为 \\(\\text{lr} \\times 0.2\\)（因为 Adam 的二阶矩归一化使 update 幅度约为 1，再乘以 lr）。</p>\n<p><strong>Muon 的 update RMS 推导</strong>：正交化后的矩阵 \\(G \\in \\mathbb{R}^{m \\times n}\\) 满足 \\(\\|G\\|_F^2 = \\min(m, n)\\)（正交矩阵的 Frobenius 范数等于其秩），因此：</p>\n<p>$$\\text{RMS}(G) = \\sqrt{\\frac{\\|G\\|_F^2}{m \\cdot n}} = \\sqrt{\\frac{\\min(m, n)}{m \\cdot n}} = \\frac{1}{\\sqrt{\\max(m, n)}}$$</p>\n<p>为了匹配 AdamW 的 update RMS \\(\\approx \\text{lr} \\times 0.2\\)，Muon 的缩放因子设为：</p>\n<p>$$\\text{scale} = 0.2 \\times \\sqrt{\\frac{\\max(m, n)}{n}}$$</p>\n<div class=\"key-point\">💡 <strong>关键</strong>：这个匹配使得 Muon 可以直接使用 AdamW 的学习率、warmup 策略和 decay schedule，大幅降低了超参数搜索成本。实验验证（Table 1）显示匹配后的 update RMS 在 \\(10^{-4}\\) 量级上与 AdamW 一致。</div>\n<h5>分布式实现与内存优化</h5>\n<p>Muon 采用类似 ZeRO-1 的分布式策略：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>组件</th>\n<th>AdamW</th>\n<th>Muon</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>优化器状态</td>\n<td>动量 + 二阶矩 = <strong>2份</strong></td>\n<td>仅动量 = <strong>1份</strong></td>\n</tr>\n<tr>\n<td>分布式策略</td>\n<td>每 GPU 存全部状态</td>\n<td>每 GPU 存 1/N 动量</td>\n</tr>\n<tr>\n<td>通信</td>\n<td>梯度 all-reduce</td>\n<td>动量 all-gather</td>\n</tr>\n<tr>\n<td>内存占用</td>\n<td>2× 参数量</td>\n<td>~0.5× 参数量（分片后）</td>\n</tr>\n</tbody>\n</table></div>\n<p>Newton-Schulz 迭代需要完整的动量矩阵，因此在迭代前需要 all-gather 操作。但由于 Muon 只需存储一份动量（而非 AdamW 的动量+二阶矩两份），分片后的总内存开销反而更低。</p>\n<h5>Scaling Law 分析</h5>\n<p><img alt=\"Scaling Law 拟合曲线\" src=\"https://ar5iv.labs.arxiv.org/html/2502.16982/assets/x4.png\" />\n<em>图 3：Muon 和 AdamW 的 Scaling Law 拟合曲线。Muon 在所有 FLOPs 预算下均低于 AdamW。</em></p>\n<p>论文在 1.5B–16B 参数规模上进行了系统的 scaling law 实验，使用 Chinchilla 风格的拟合：</p>\n<p>$$L(C) = A \\cdot C^{-\\alpha} + L_\\infty$$</p>\n<p>拟合结果：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>优化器</th>\n<th>\\(A\\)</th>\n<th>\\(\\alpha\\)</th>\n<th>\\(L_\\infty\\)</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Muon</td>\n<td>2.506</td>\n<td>0.052</td>\n<td>2.839</td>\n</tr>\n<tr>\n<td>AdamW</td>\n<td>2.608</td>\n<td>0.054</td>\n<td>2.857</td>\n</tr>\n</tbody>\n</table></div>\n<p>关键发现：<strong>Muon 仅需约 52% 的 FLOPs 即可达到 AdamW 相同的验证损失</strong>。两者的 \\(\\alpha\\)（缩放指数）接近，说明 Muon 的优势是一个近似恒定的乘法因子，而非改变缩放规律本身。</p>\n<h5>SVD 熵分析</h5>\n<p><img alt=\"SVD 熵分析\" src=\"https://ar5iv.labs.arxiv.org/html/2502.16982/assets/x5.png\" />\n<em>图 4：不同训练阶段权重矩阵的 SVD 熵。Muon 训练的模型具有更高的 SVD 熵，说明奇异值分布更均匀。</em></p>\n<p>论文通过 SVD 熵（对归一化奇异值计算信息熵）分析了 Muon 与 AdamW 训练的权重矩阵差异：</p>\n<p>$$H = -\\sum_i \\hat{\\sigma}_i \\log \\hat{\\sigma}_i, \\quad \\hat{\\sigma}_i = \\frac{\\sigma_i}{\\sum_j \\sigma_j}$$</p>\n<p>Muon 训练的模型在所有层类型（attention QKV、output projection、FFN）上都具有更高的 SVD 熵，意味着：\n- 权重矩阵的奇异值分布更均匀\n- 模型利用了更多的方向来编码信息\n- 有效秩更高，表示能力更强</p>\n<div class=\"key-point\">💡 <strong>关键直觉</strong>：Muon 的正交化更新天然倾向于均匀化奇异值——因为更新方向 \\(UV^T\\) 的所有奇异值都是 1，不会像 AdamW 那样因梯度奇异值不均匀而导致某些方向被过度更新。</div>\n<h5>Moonlight 模型实验结果</h5>\n<p>Moonlight 是基于 Muon 训练的 3B 激活 / 16B 总参数的 MoE 模型，在 5.7T tokens 上训练。</p>\n<p><strong>与 AdamW 基线对比（1.2T tokens）</strong>：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>基准</th>\n<th>Moonlight (Muon)</th>\n<th>Moonlight-A (AdamW)</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>MMLU</td>\n<td>59.1</td>\n<td>55.5</td>\n</tr>\n<tr>\n<td>MATH-500</td>\n<td>30.0</td>\n<td>22.8</td>\n</tr>\n<tr>\n<td>HumanEval</td>\n<td>53.7</td>\n<td>48.8</td>\n</tr>\n<tr>\n<td>MBPP</td>\n<td>56.3</td>\n<td>54.3</td>\n</tr>\n<tr>\n<td>GSM8K</td>\n<td>60.0</td>\n<td>50.0</td>\n</tr>\n</tbody>\n</table></div>\n<p>Muon 在所有基准上均优于 AdamW，尤其在数学（MATH +7.2）和代码（HumanEval +4.9）任务上优势显著。</p>\n<p><strong>与同规模开源模型对比（5.7T tokens）</strong>：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>基准</th>\n<th>Moonlight</th>\n<th>Llama-3.2-3B (9T)</th>\n<th>Qwen2.5-3B (18T)</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>MMLU</td>\n<td>62.6</td>\n<td>63.4</td>\n<td>65.6</td>\n</tr>\n<tr>\n<td>MATH-500</td>\n<td>42.4</td>\n<td>44.4</td>\n<td>42.4</td>\n</tr>\n<tr>\n<td>HumanEval</td>\n<td>68.3</td>\n<td>36.0</td>\n<td>42.7</td>\n</tr>\n<tr>\n<td>GSM8K</td>\n<td>71.7</td>\n<td>54.4</td>\n<td>79.2</td>\n</tr>\n</tbody>\n</table></div>\n<p>Moonlight 仅用 5.7T tokens 即在 HumanEval 上大幅超越使用 9T/18T tokens 训练的竞品，在 MATH 上与 Qwen2.5-3B 持平，展示了 Muon 的数据效率优势。</p>\n<h5>与 AdamW 的本质区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th>AdamW</th>\n<th>Muon</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>更新方向</td>\n<td>逐元素梯度/二阶矩</td>\n<td>梯度动量的正交极因子</td>\n</tr>\n<tr>\n<td>范数约束</td>\n<td>\\(\\ell_\\infty\\) 最速下降</td>\n<td>谱范数最速下降</td>\n</tr>\n<tr>\n<td>矩阵结构利用</td>\n<td>❌ 忽略</td>\n<td>✅ 利用奇异值结构</td>\n</tr>\n<tr>\n<td>优化器状态</td>\n<td>2 份（\\(m_t, v_t\\)）</td>\n<td>1 份（\\(m_t\\)）</td>\n</tr>\n<tr>\n<td>适用参数</td>\n<td>所有参数</td>\n<td>仅 2D 权重矩阵</td>\n</tr>\n<tr>\n<td>Weight decay</td>\n<td>解耦式</td>\n<td>同样解耦式（\\(\\lambda=0.1\\)）</td>\n</tr>\n</tbody>\n</table></div>",
      "quiz": {
        "q": "Muon 优化器使用 Newton-Schulz 迭代的主要目的是什么？",
        "options": [
          "计算梯度矩阵的逆，实现二阶优化",
          "近似梯度动量矩阵的极分解，获取正交化更新方向",
          "对梯度进行低秩近似以减少通信量",
          "估计梯度的二阶矩以实现自适应学习率"
        ],
        "answer": 1,
        "explain": "Newton-Schulz 迭代用于近似矩阵极分解 G = U Σ V^T → UV^T，将梯度动量正交化为最近正交矩阵，实现谱范数下的最速下降方向。"
      }
    },
    {
      "id": "flash_attention_4",
      "num": 26,
      "name": "FlashAttention-4",
      "fullName": "FlashAttention-4 (FlashAttention-4 for Blackwell)",
      "year": "2026.03",
      "org": "Together AI",
      "parent": "flash_attention_2",
      "paperUrl": "https://tridao.me/blog/2026/flash-attention-4/",
      "projectUrl": "",
      "category": "training",
      "motivation": "Blackwell架构71%硬件利用率",
      "summary": "FlashAttention-4 的核心目标是：Blackwell架构71%硬件利用率。",
      "keyPoints": [
        "核心动机：Blackwell架构71%硬件利用率",
        "演化来源：继承或改进自 flash_attention_2",
        "代表机构：Together AI"
      ],
      "detail": "<p>Blackwell架构71%硬件利用率</p>"
    },
    {
      "id": "snip_quartet",
      "num": 27,
      "name": "SNIP/Quartet",
      "fullName": "SNIP/Quartet (Native FP4 Training)",
      "year": "2026",
      "org": "NeurIPS",
      "parent": "mixed_precision",
      "paperUrl": "https://arxiv.org/abs/2410.20574",
      "projectUrl": "",
      "category": "training",
      "motivation": "原生FP4训练层级动态量化",
      "summary": "SNIP/Quartet 的核心目标是：原生FP4训练层级动态量化。",
      "keyPoints": [
        "核心动机：原生FP4训练层级动态量化",
        "演化来源：继承或改进自 mixed_precision",
        "代表机构：NeurIPS"
      ],
      "detail": "<p>原生FP4训练层级动态量化</p>"
    },
    {
      "id": "longrope2",
      "num": 28,
      "name": "LongRoPE2",
      "fullName": "LongRoPE2 (Near-Lossless LLM Context Window Scaling)",
      "year": "2025.12",
      "org": "Microsoft",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2502.05011",
      "projectUrl": "",
      "category": "training",
      "motivation": "进化搜索扩展至200万上下文",
      "summary": "LongRoPE2 的核心目标是：进化搜索扩展至200万上下文。",
      "keyPoints": [
        "核心动机：进化搜索扩展至200万上下文",
        "代表机构：Microsoft"
      ],
      "detail": "<p>进化搜索扩展至200万上下文</p>"
    },
    {
      "id": "gpipe",
      "num": 29,
      "name": "GPipe",
      "fullName": "GPipe (GPipe: Easy Scaling with Micro-Batch Pipeline)",
      "year": "2019",
      "org": "Google",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/1811.06965",
      "projectUrl": "",
      "category": "distributed",
      "motivation": "流水线并行微批次切分",
      "summary": "GPipe 的核心目标是：流水线并行微批次切分。",
      "keyPoints": [
        "核心动机：流水线并行微批次切分",
        "代表机构：Google"
      ],
      "detail": "<p>流水线并行微批次切分</p>"
    },
    {
      "id": "megatron_lm",
      "num": 30,
      "name": "Megatron-LM",
      "fullName": "Megatron-LM (Megatron-LM: Training Multi-Billion Parameter)",
      "year": "2019",
      "org": "NVIDIA",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/1909.08053",
      "projectUrl": "",
      "category": "distributed",
      "motivation": "张量并行Transformer层内切分",
      "summary": "Megatron-LM 的核心目标是：张量并行Transformer层内切分。",
      "keyPoints": [
        "核心动机：张量并行Transformer层内切分",
        "代表机构：NVIDIA"
      ],
      "detail": "<p>张量并行Transformer层内切分</p>"
    },
    {
      "id": "zero",
      "num": 31,
      "name": "ZeRO",
      "fullName": "ZeRO (ZeRO: Memory Optimizations Toward Training Trillion)",
      "year": "2020",
      "org": "Microsoft",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/1910.02054",
      "projectUrl": "",
      "category": "distributed",
      "motivation": "优化器/梯度/参数分片存储",
      "summary": "ZeRO 的核心目标是：优化器/梯度/参数分片存储。",
      "keyPoints": [
        "核心动机：优化器/梯度/参数分片存储",
        "代表机构：Microsoft"
      ],
      "detail": "<p>优化器/梯度/参数分片存储</p>"
    },
    {
      "id": "fsdp",
      "num": 32,
      "name": "FSDP",
      "fullName": "FSDP (Fully Sharded Data Parallel)",
      "year": "2023",
      "org": "Meta",
      "parent": "zero",
      "paperUrl": "https://arxiv.org/abs/2304.11277",
      "projectUrl": "",
      "category": "distributed",
      "motivation": "PyTorch原生完全分片数据并行",
      "summary": "FSDP 的核心目标是：PyTorch原生完全分片数据并行。",
      "keyPoints": [
        "核心动机：PyTorch原生完全分片数据并行",
        "演化来源：继承或改进自 zero",
        "代表机构：Meta"
      ],
      "detail": "<p>PyTorch原生完全分片数据并行</p>"
    },
    {
      "id": "distflashattn",
      "num": 33,
      "name": "DISTFLASHATTN",
      "fullName": "DISTFLASHATTN (Distributed Memory-efficient Attention)",
      "year": "2026",
      "org": "学术界",
      "parent": "flash_attention_2",
      "paperUrl": "https://arxiv.org/abs/2310.03294",
      "projectUrl": "",
      "category": "distributed",
      "motivation": "Token级负载均衡百万上下文",
      "summary": "DISTFLASHATTN 的核心目标是：Token级负载均衡百万上下文。",
      "keyPoints": [
        "核心动机：Token级负载均衡百万上下文",
        "演化来源：继承或改进自 flash_attention_2",
        "代表机构：学术界"
      ],
      "detail": "<p>Token级负载均衡百万上下文</p>"
    }
  ],
  "categories": {
    "scaling": {
      "label": "规模法则",
      "color": "#22a06b"
    },
    "data": {
      "label": "数据工程",
      "color": "#5b63d3"
    },
    "training": {
      "label": "训练优化",
      "color": "#e97f33"
    },
    "distributed": {
      "label": "分布式系统",
      "color": "#8b5cf6"
    }
  },
  "projectUrls": {}
};
