/**
 * sci_base-data.js — 由 pipeline/build.py 于 2026-05-20 17:34:36 自动生成。
 * 源文件：content/ai4sci/sci_base.md
 * ⚠️  请勿手动修改；如需更新，修改源文档后重新编译。
 */
window.PAGE_CONFIG = {
  "meta": {
    "domain": "ai4sci",
    "topic_id": "sci_base",
    "topic_name": "科学基础模型",
    "page_title": "科学基础模型算法总结",
    "page_subtitle": "2026-05-20 版",
    "page_desc": "涵盖蛋白质结构预测、材料发现、气象预报、分子建模、科学大模型等领域，展示从单任务专用模型到跨学科统一架构的技术演进",
    "page_icon": "🔬",
    "hero_pills": [
      "🏷️ AI4Sci · Foundation Models · Cross-disciplinary"
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
        "id": "transformer",
        "x": 2017,
        "y": 0,
        "category": "neural_operator"
      },
      {
        "id": "schnet",
        "x": 2018,
        "y": 0,
        "category": "neural_operator"
      },
      {
        "id": "fno",
        "x": 2020,
        "y": 0,
        "category": "neural_operator"
      },
      {
        "id": "dimenet",
        "x": 2020.5,
        "y": 0,
        "category": "neural_operator"
      },
      {
        "id": "deeponet",
        "x": 2021,
        "y": 0,
        "category": "neural_operator"
      },
      {
        "id": "egnn",
        "x": 2021.5,
        "y": 0,
        "category": "neural_operator"
      },
      {
        "id": "alphafold2",
        "x": 2021,
        "y": 1,
        "category": "protein_structure"
      },
      {
        "id": "rosettafold",
        "x": 2021.5,
        "y": 1,
        "category": "protein_structure"
      },
      {
        "id": "esm2",
        "x": 2022,
        "y": 1,
        "category": "protein_structure"
      },
      {
        "id": "rfdiffusion",
        "x": 2023,
        "y": 1,
        "category": "protein_structure"
      },
      {
        "id": "alphafold3",
        "x": 2024,
        "y": 1,
        "category": "protein_structure"
      },
      {
        "id": "esm3",
        "x": 2024.5,
        "y": 1,
        "category": "protein_structure"
      },
      {
        "id": "fourcastnet",
        "x": 2022,
        "y": 2,
        "category": "materials_weather"
      },
      {
        "id": "m3gnet",
        "x": 2022.5,
        "y": 2,
        "category": "materials_weather"
      },
      {
        "id": "gnome",
        "x": 2023,
        "y": 2,
        "category": "materials_weather"
      },
      {
        "id": "panguweather",
        "x": 2023.3,
        "y": 2,
        "category": "materials_weather"
      },
      {
        "id": "graphcast",
        "x": 2023.6,
        "y": 2,
        "category": "materials_weather"
      },
      {
        "id": "mattergen",
        "x": 2025,
        "y": 2,
        "category": "materials_weather"
      },
      {
        "id": "mpnn",
        "x": 2017.5,
        "y": 3,
        "category": "molecular"
      },
      {
        "id": "jtvae",
        "x": 2018,
        "y": 3,
        "category": "molecular"
      },
      {
        "id": "chemberta",
        "x": 2020,
        "y": 3,
        "category": "molecular"
      },
      {
        "id": "unimap",
        "x": 2024,
        "y": 3,
        "category": "molecular"
      },
      {
        "id": "galactica",
        "x": 2022,
        "y": 4,
        "category": "science_llm"
      },
      {
        "id": "sciglm",
        "x": 2024,
        "y": 4,
        "category": "science_llm"
      },
      {
        "id": "scidfm",
        "x": 2024.5,
        "y": 4,
        "category": "science_llm"
      },
      {
        "id": "aion1",
        "x": 2025,
        "y": 5,
        "category": "unified_foundation"
      },
      {
        "id": "walrus",
        "x": 2025.3,
        "y": 5,
        "category": "unified_foundation"
      },
      {
        "id": "auroragpt",
        "x": 2026,
        "y": 5,
        "category": "unified_foundation"
      },
      {
        "id": "scienceone100",
        "x": 2026.3,
        "y": 5,
        "category": "unified_foundation"
      },
      {
        "id": "prithvi",
        "x": 2026.6,
        "y": 5,
        "category": "unified_foundation"
      },
      {
        "id": "darwin7b",
        "x": 2026.9,
        "y": 5,
        "category": "unified_foundation"
      }
    ],
    "edges": [
      {
        "from": "schnet",
        "to": "dimenet",
        "label": "融入键角"
      },
      {
        "from": "alphafold2",
        "to": "alphafold3",
        "label": "引入扩散"
      },
      {
        "from": "rosettafold",
        "to": "rfdiffusion",
        "label": "扩散设计"
      },
      {
        "from": "esm2",
        "to": "esm3",
        "label": "协同生成"
      },
      {
        "from": "transformer",
        "to": "alphafold2",
        "label": "注意力机制"
      },
      {
        "from": "transformer",
        "to": "panguweather",
        "label": "3D架构"
      },
      {
        "from": "transformer",
        "to": "galactica",
        "label": "语言建模"
      },
      {
        "from": "fno",
        "to": "fourcastnet",
        "label": "傅里叶算子"
      },
      {
        "from": "mpnn",
        "to": "gnome",
        "label": "GNN材料"
      },
      {
        "from": "mpnn",
        "to": "graphcast",
        "label": "GNN气象"
      },
      {
        "from": "schnet",
        "to": "esm2",
        "label": "几何建模"
      },
      {
        "from": "galactica",
        "to": "sciglm",
        "label": "科学推理"
      },
      {
        "from": "alphafold3",
        "to": "auroragpt",
        "label": "多模态融合"
      },
      {
        "from": "gnome",
        "to": "mattergen",
        "label": "生成式设计"
      },
      {
        "from": "esm3",
        "to": "darwin7b",
        "label": "生物组学"
      },
      {
        "from": "graphcast",
        "to": "prithvi",
        "label": "地学应用"
      }
    ],
    "milestones": [
      "alphafold2",
      "gnome",
      "alphafold3"
    ]
  },
  "algos": [
    {
      "id": "transformer",
      "num": 1,
      "name": "Transformer",
      "fullName": "Transformer (Transformer)",
      "year": "2017",
      "org": "Google",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/1706.03762",
      "projectUrl": "",
      "category": "neural_operator",
      "motivation": "自注意力机制奠定科学大模型基础",
      "summary": "Transformer 提出了完全基于自注意力机制的 Encoder-Decoder 架构，彻底摒弃了循环和卷积结构，在机器翻译任务上取得了 SOTA 结果，同时大幅提升了训练并行性，成为后续所有大语言模型和科学基础模型的核心架构基石。",
      "keyPoints": [
        "<strong>纯注意力架构</strong>：首次证明仅靠注意力机制（无 RNN/CNN）即可在序列转录任务中达到最优性能",
        "<strong>Scaled Dot-Product Attention</strong>：通过 \\(\\sqrt{d_k}\\) 缩放因子解决高维点积导致的梯度消失问题",
        "<strong>Multi-Head Attention</strong>：将注意力拆分为 \\(h\\) 个并行头，让模型同时关注不同子空间的信息",
        "<strong>三种注意力用法</strong>：Encoder 自注意力、Decoder 掩码自注意力、Encoder-Decoder 交叉注意力",
        "<strong>位置编码</strong>：使用正弦/余弦函数注入序列位置信息，替代 RNN 的隐式位置建模",
        "<strong>残差连接 + 层归一化</strong>：每个子层采用 \\(\\text{LayerNorm}(x + \\text{Sublayer}(x))\\) 稳定深层训练",
        "<strong>Position-wise FFN</strong>：两层全连接网络（含 ReLU）为每个位置独立提供非线性变换能力",
        "<strong>WMT 2014 翻译 SOTA</strong>：EN-DE 达到 28.4 BLEU，EN-FR 达到 41.0 BLEU，训练成本仅为此前最优模型的一小部分"
      ],
      "detail": "<h5>架构总览</h5>\n<p><img alt=\"Transformer 模型架构\" src=\"https://ar5iv.labs.arxiv.org/html/1706.03762/assets/Figures/ModalNet-21.png\" />\n<em>图：Transformer 模型架构。左侧为 Encoder，右侧为 Decoder。</em></p>\n<p>Transformer 采用经典的 Encoder-Decoder 结构，但内部完全由注意力层和前馈网络构成：</p>\n<ul>\n<li><strong>Encoder</strong>：由 \\(N=6\\) 个相同层堆叠而成，每层包含两个子层——Multi-Head Self-Attention 和 Position-wise FFN，每个子层外包裹残差连接和层归一化。</li>\n<li><strong>Decoder</strong>：同样 \\(N=6\\) 层，每层在 Encoder 的两个子层基础上增加了一个 Encoder-Decoder Cross-Attention 子层。Decoder 的自注意力层使用掩码（mask）防止位置 \\(i\\) 关注到未来位置 \\(i+1, i+2, \\ldots\\)，确保自回归生成的合法性。</li>\n</ul>\n<div class=\"key-point\">💡 <strong>关键设计</strong>：所有子层的输出维度统一为 \\(d_{\\text{model}} = 512\\)，这使得残差连接可以直接相加，无需额外投影。</div>\n<h5>核心机制：Scaled Dot-Product Attention</h5>\n<p><img alt=\"注意力机制示意图\" src=\"https://ar5iv.labs.arxiv.org/html/1706.03762/assets/Figures/ModalNet-19.png\" />\n<em>图：Scaled Dot-Product Attention 计算流程</em></p>\n<p>注意力函数将 Query、Key、Value 三组向量映射为输出：</p>\n<p>$$\\text{Attention}(Q, K, V) = \\text{softmax}\\!\\left(\\frac{QK^T}{\\sqrt{d_k}}\\right) V$$</p>\n<p><strong>为什么需要缩放？</strong> 当 \\(d_k\\) 较大时，点积 \\(QK^T\\) 的方差为 \\(d_k\\)，导致 softmax 进入梯度极小的饱和区。除以 \\(\\sqrt{d_k}\\) 将方差归一化为 1，保持梯度流通畅。这是论文相比加性注意力（Additive Attention）选择点积注意力的关键改进。</p>\n<pre><code class=\"language-python\"># Scaled Dot-Product Attention 伪代码\ndef scaled_dot_product_attention(Q, K, V, mask=None):\n    d_k = Q.shape[-1]\n    scores = Q @ K.transpose(-2, -1) / math.sqrt(d_k)  # (batch, seq_q, seq_k)\n    if mask is not None:\n        scores = scores.masked_fill(mask == 0, -1e9)\n    attn_weights = softmax(scores, dim=-1)\n    attn_weights = dropout(attn_weights)\n    return attn_weights @ V  # (batch, seq_q, d_v)\n</code></pre>\n<h5>Multi-Head Attention</h5>\n<p><img alt=\"Multi-Head Attention\" src=\"https://ar5iv.labs.arxiv.org/html/1706.03762/assets/Figures/ModalNet-20.png\" />\n<em>图：Multi-Head Attention 将 Q、K、V 分别线性投影到多个子空间后并行计算注意力</em></p>\n<p>单个注意力头只能学习一种关注模式。Multi-Head Attention 将 \\(d_{\\text{model}}\\) 维的 Q、K、V 分别通过 \\(h\\) 组不同的线性投影映射到 \\(d_k = d_v = d_{\\text{model}}/h = 64\\) 维子空间，并行计算注意力后拼接：</p>\n<p>$$\\text{MultiHead}(Q, K, V) = \\text{Concat}(\\text{head}_1, \\ldots, \\text{head}_h) W^O$$</p>\n<p>$$\\text{where } \\text{head}_i = \\text{Attention}(QW_i^Q, KW_i^K, VW_i^V)$$</p>\n<p>其中 \\(W_i^Q \\in \\mathbb{R}^{d_{\\text{model}} \\times d_k}\\)，\\(W_i^K \\in \\mathbb{R}^{d_{\\text{model}} \\times d_k}\\)，\\(W_i^V \\in \\mathbb{R}^{d_{\\text{model}} \\times d_v}\\)，\\(W^O \\in \\mathbb{R}^{hd_v \\times d_{\\text{model}}}\\)。</p>\n<p>论文使用 \\(h=8\\) 个头，每个头的维度 \\(d_k = d_v = 64\\)，总计算量与单头全维度注意力相当，但表达能力更强。</p>\n<div class=\"key-point\">💡 <strong>直觉理解</strong>：不同的注意力头可以分别学习语法依赖、语义相似性、位置关系等不同类型的关联模式，类似于 CNN 中多个卷积核捕捉不同特征。</div>\n<pre><code class=\"language-python\"># Multi-Head Attention 伪代码\ndef multi_head_attention(Q, K, V, h=8):\n    d_model = Q.shape[-1]\n    d_k = d_model // h\n    heads = []\n    for i in range(h):\n        Q_i = Q @ W_Q[i]  # (batch, seq, d_k)\n        K_i = K @ W_K[i]\n        V_i = V @ W_V[i]\n        head_i = scaled_dot_product_attention(Q_i, K_i, V_i)\n        heads.append(head_i)\n    concat = torch.cat(heads, dim=-1)  # (batch, seq, d_model)\n    return concat @ W_O\n</code></pre>\n<h5>三种注意力的应用场景</h5>\n<p>Transformer 中注意力机制被用于三个不同位置，Q、K、V 的来源各不相同：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>位置</th>\n<th>Q 来源</th>\n<th>K、V 来源</th>\n<th>作用</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Encoder Self-Attention</td>\n<td>Encoder 当前层输入</td>\n<td>Encoder 当前层输入</td>\n<td>每个位置关注输入序列所有位置</td>\n</tr>\n<tr>\n<td>Decoder Masked Self-Attention</td>\n<td>Decoder 当前层输入</td>\n<td>Decoder 当前层输入（带掩码）</td>\n<td>每个位置仅关注已生成的位置</td>\n</tr>\n<tr>\n<td>Encoder-Decoder Cross-Attention</td>\n<td>Decoder 当前层输入</td>\n<td>Encoder 最终输出</td>\n<td>Decoder 关注输入序列信息</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：Decoder 自注意力中的掩码（mask）将未来位置的注意力权重设为 \\(-\\infty\\)（softmax 后为 0），这是保证自回归生成因果性的关键。</div>\n<h5>Position-wise Feed-Forward Network</h5>\n<p>每个注意力子层之后紧跟一个两层全连接前馈网络，对每个位置独立且相同地应用：</p>\n<p>$$\\text{FFN}(x) = \\max(0,\\; xW_1 + b_1)\\, W_2 + b_2$$</p>\n<p>内层维度 \\(d_{ff} = 2048\\)，外层维度 \\(d_{\\text{model}} = 512\\)。这等价于两个 kernel size 为 1 的卷积。FFN 为模型提供了逐位置的非线性变换能力，弥补了注意力层本身线性加权求和的不足。</p>\n<h5>位置编码（Positional Encoding）</h5>\n<p>由于 Transformer 不含循环或卷积结构，无法隐式感知序列顺序。论文使用正弦/余弦函数生成位置编码，直接加到输入嵌入上：</p>\n<p>$$PE_{(pos, 2i)} = \\sin\\!\\left(\\frac{pos}{10000^{2i/d_{\\text{model}}}}\\right)$$</p>\n<p>$$PE_{(pos, 2i+1)} = \\cos\\!\\left(\\frac{pos}{10000^{2i/d_{\\text{model}}}}\\right)$$</p>\n<p>其中 \\(pos\\) 为位置索引，\\(i\\) 为维度索引。选择正弦函数的原因是：对于任意固定偏移 \\(k\\)，\\(PE_{pos+k}\\) 可以表示为 \\(PE_{pos}\\) 的线性函数，使模型能够轻松学习相对位置关系。实验表明，学习式位置编码与正弦编码效果几乎相同，但正弦编码可以外推到训练时未见过的更长序列。</p>\n<h5>自注意力 vs RNN vs CNN 的复杂度对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>层类型</th>\n<th>每层复杂度</th>\n<th>顺序操作数</th>\n<th>最大路径长度</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Self-Attention</td>\n<td>\\(O(n^2 \\cdot d)\\)</td>\n<td>\\(O(1)\\)</td>\n<td>\\(O(1)\\)</td>\n</tr>\n<tr>\n<td>Recurrent</td>\n<td>\\(O(n \\cdot d^2)\\)</td>\n<td>\\(O(n)\\)</td>\n<td>\\(O(n)\\)</td>\n</tr>\n<tr>\n<td>Convolution</td>\n<td>\\(O(k \\cdot n \\cdot d^2)\\)</td>\n<td>\\(O(1)\\)</td>\n<td>\\(O(\\log_k(n))\\)</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 <strong>关键优势</strong>：自注意力的最大路径长度为 \\(O(1)\\)（任意两个位置直接连接），远优于 RNN 的 \\(O(n)\\)，这使得长距离依赖的学习更加容易。同时，自注意力的所有位置可并行计算（顺序操作 \\(O(1)\\)），而 RNN 必须逐步展开。当序列长度 \\(n < d\\) 时（实际中常见），自注意力的计算量也更小。</div>\n<h5>训练配置</h5>\n<ul>\n<li><strong>数据集</strong>：WMT 2014 EN-DE（450 万句对）和 EN-FR（3600 万句对）</li>\n<li><strong>优化器</strong>：Adam（\\(\\beta_1=0.9, \\beta_2=0.98, \\epsilon=10^{-9}\\)）</li>\n<li><strong>学习率调度</strong>：Warmup + 逆平方根衰减</li>\n</ul>\n<p>$$lr = d_{\\text{model}}^{-0.5} \\cdot \\min(step^{-0.5},\\; step \\cdot warmup\\_steps^{-1.5})$$</p>\n<p>前 4000 步线性预热，之后按步数的逆平方根衰减。</p>\n<ul>\n<li><strong>正则化</strong>：Residual Dropout（\\(P_{drop}=0.1\\)）应用于每个子层输出和嵌入+位置编码之和；Label Smoothing（\\(\\epsilon_{ls}=0.1\\)）牺牲困惑度但提升 BLEU 和准确率</li>\n<li><strong>硬件</strong>：8 块 NVIDIA P100 GPU，base 模型训练 12 小时（10 万步），big 模型训练 3.5 天（30 万步）</li>\n</ul>",
      "quiz": {
        "q": "Transformer 中 Scaled Dot-Product Attention 除以 √d_k 的主要原因是什么？",
        "options": [
          "减少模型参数量，降低计算复杂度",
          "防止点积值过大导致 softmax 梯度消失",
          "使注意力权重之和严格等于 1",
          "对齐 Query 和 Key 的维度"
        ],
        "answer": 1,
        "explain": "当 d_k 较大时，点积的方差为 d_k，导致 softmax 输入值过大进入饱和区，梯度趋近于零。除以 √d_k 将方差归一化为 1，保持梯度有效流动。"
      }
    },
    {
      "id": "mpnn",
      "num": 2,
      "name": "MPNN",
      "fullName": "消息传递神经网络 (Message Passing Neural Network)",
      "year": "2017",
      "org": "Google",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/1704.01212",
      "projectUrl": "",
      "category": "molecular",
      "motivation": "统一框架处理图结构分子表征学习",
      "summary": "MPNN 的核心目标是：统一框架处理图结构分子表征学习。",
      "keyPoints": [
        "核心动机：统一框架处理图结构分子表征学习",
        "代表机构：Google"
      ],
      "detail": "<p>统一框架处理图结构分子表征学习</p>"
    },
    {
      "id": "schnet",
      "num": 3,
      "name": "SchNet",
      "fullName": "SchNet (SchNet)",
      "year": "2018",
      "org": "TU Berlin",
      "parent": "—",
      "paperUrl": "https://aip.scitation.org/doi/10.1063/1.5019779",
      "projectUrl": "",
      "category": "neural_operator",
      "motivation": "连续卷积滤波器实现分子3D建模",
      "summary": "SchNet 的核心目标是：连续卷积滤波器实现分子3D建模。",
      "keyPoints": [
        "核心动机：连续卷积滤波器实现分子3D建模",
        "代表机构：TU Berlin"
      ],
      "detail": "<p>连续卷积滤波器实现分子3D建模</p>"
    },
    {
      "id": "jtvae",
      "num": 4,
      "name": "JT-VAE",
      "fullName": "联结树变分自编码器 (Junction Tree VAE)",
      "year": "2018",
      "org": "MIT",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/1802.04364",
      "projectUrl": "",
      "category": "molecular",
      "motivation": "基于分子子结构的可解释生成模型",
      "summary": "JT-VAE 的核心目标是：基于分子子结构的可解释生成模型。",
      "keyPoints": [
        "核心动机：基于分子子结构的可解释生成模型",
        "代表机构：MIT"
      ],
      "detail": "<p>基于分子子结构的可解释生成模型</p>"
    },
    {
      "id": "fno",
      "num": 5,
      "name": "FNO",
      "fullName": "傅里叶神经算子 (Fourier Neural Operator)",
      "year": "2020",
      "org": "Caltech/NVIDIA",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2010.08895",
      "projectUrl": "",
      "category": "neural_operator",
      "motivation": "傅里叶空间学习PDE算子映射",
      "summary": "FNO 的核心目标是：傅里叶空间学习PDE算子映射。",
      "keyPoints": [
        "核心动机：傅里叶空间学习PDE算子映射",
        "代表机构：Caltech/NVIDIA"
      ],
      "detail": "<p>傅里叶空间学习PDE算子映射</p>"
    },
    {
      "id": "dimenet",
      "num": 6,
      "name": "DimeNet",
      "fullName": "定向消息传递网络 (Directional Message Passing NN)",
      "year": "2020",
      "org": "TU Munich",
      "parent": "schnet",
      "paperUrl": "https://arxiv.org/abs/2003.03123",
      "projectUrl": "",
      "category": "neural_operator",
      "motivation": "定向消息传递融入键角信息",
      "summary": "DimeNet 的核心目标是：定向消息传递融入键角信息。",
      "keyPoints": [
        "核心动机：定向消息传递融入键角信息",
        "演化来源：继承或改进自 schnet",
        "代表机构：TU Munich"
      ],
      "detail": "<p>定向消息传递融入键角信息</p>"
    },
    {
      "id": "chemberta",
      "num": 7,
      "name": "ChemBERTa",
      "fullName": "ChemBERTa (ChemBERTa)",
      "year": "2020",
      "org": "DeepChem",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2010.09885",
      "projectUrl": "",
      "category": "molecular",
      "motivation": "BERT架构化学分子SMILES预训练",
      "summary": "ChemBERTa 的核心目标是：BERT架构化学分子SMILES预训练。",
      "keyPoints": [
        "核心动机：BERT架构化学分子SMILES预训练",
        "代表机构：DeepChem"
      ],
      "detail": "<p>BERT架构化学分子SMILES预训练</p>"
    },
    {
      "id": "alphafold2",
      "num": 8,
      "name": "AlphaFold 2",
      "fullName": "AlphaFold 2 (AlphaFold 2)",
      "year": "2021",
      "org": "DeepMind",
      "parent": "—",
      "paperUrl": "https://www.nature.com/articles/s41586-021-03819-2",
      "projectUrl": "",
      "category": "protein_structure",
      "motivation": "Evoformer架构基本解决蛋白质折叠",
      "summary": "AlphaFold 2 的核心目标是：Evoformer架构基本解决蛋白质折叠。",
      "keyPoints": [
        "核心动机：Evoformer架构基本解决蛋白质折叠",
        "代表机构：DeepMind"
      ],
      "detail": "<p>Evoformer架构基本解决蛋白质折叠</p>"
    },
    {
      "id": "rosettafold",
      "num": 9,
      "name": "RoseTTAFold",
      "fullName": "RoseTTAFold (RoseTTAFold)",
      "year": "2021",
      "org": "Baker Lab/UW",
      "parent": "—",
      "paperUrl": "https://www.science.org/doi/10.1126/science.abj8754",
      "projectUrl": "",
      "category": "protein_structure",
      "motivation": "三轨网络同时处理序列距离坐标",
      "summary": "RoseTTAFold 的核心目标是：三轨网络同时处理序列距离坐标。",
      "keyPoints": [
        "核心动机：三轨网络同时处理序列距离坐标",
        "代表机构：Baker Lab/UW"
      ],
      "detail": "<p>三轨网络同时处理序列距离坐标</p>"
    },
    {
      "id": "deeponet",
      "num": 10,
      "name": "DeepONet",
      "fullName": "深度算子网络 (Deep Operator Network)",
      "year": "2021",
      "org": "Brown University",
      "parent": "—",
      "paperUrl": "https://www.nature.com/articles/s42256-021-00302-5",
      "projectUrl": "",
      "category": "neural_operator",
      "motivation": "Branch-Trunk双网络通用算子学习",
      "summary": "DeepONet 的核心目标是：Branch-Trunk双网络通用算子学习。",
      "keyPoints": [
        "核心动机：Branch-Trunk双网络通用算子学习",
        "代表机构：Brown University"
      ],
      "detail": "<p>Branch-Trunk双网络通用算子学习</p>"
    },
    {
      "id": "egnn",
      "num": 11,
      "name": "EGNN",
      "fullName": "E(n)等变图神经网络 (E(n) Equivariant GNN)",
      "year": "2021",
      "org": "UvA",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2102.09844",
      "projectUrl": "",
      "category": "neural_operator",
      "motivation": "E(n)等变性保证旋转平移不变",
      "summary": "EGNN 的核心目标是：E(n)等变性保证旋转平移不变。",
      "keyPoints": [
        "核心动机：E(n)等变性保证旋转平移不变",
        "代表机构：UvA"
      ],
      "detail": "<p>E(n)等变性保证旋转平移不变</p>"
    },
    {
      "id": "esm2",
      "num": 12,
      "name": "ESM-2",
      "fullName": "进化尺度建模2 (Evolutionary Scale Modeling 2)",
      "year": "2022",
      "org": "Meta AI",
      "parent": "—",
      "paperUrl": "https://www.science.org/doi/10.1126/science.ade2574",
      "projectUrl": "",
      "category": "protein_structure",
      "motivation": "150亿参数蛋白质语言模型无需MSA",
      "summary": "ESM-2 的核心目标是：150亿参数蛋白质语言模型无需MSA。",
      "keyPoints": [
        "核心动机：150亿参数蛋白质语言模型无需MSA",
        "代表机构：Meta AI"
      ],
      "detail": "<p>150亿参数蛋白质语言模型无需MSA</p>"
    },
    {
      "id": "fourcastnet",
      "num": 13,
      "name": "FourCastNet",
      "fullName": "傅里叶预报网络 (Fourier ForeCasting Neural Network)",
      "year": "2022",
      "org": "NVIDIA",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2202.11214",
      "projectUrl": "",
      "category": "materials_weather",
      "motivation": "傅里叶神经算子+ViT实现快速气象预报",
      "summary": "FourCastNet 的核心目标是：傅里叶神经算子+ViT实现快速气象预报。",
      "keyPoints": [
        "核心动机：傅里叶神经算子+ViT实现快速气象预报",
        "代表机构：NVIDIA"
      ],
      "detail": "<p>傅里叶神经算子+ViT实现快速气象预报</p>"
    },
    {
      "id": "m3gnet",
      "num": 14,
      "name": "M3GNet",
      "fullName": "材料三体图网络 (Materials 3-body Graph Network)",
      "year": "2022",
      "org": "UC San Diego",
      "parent": "—",
      "paperUrl": "https://www.nature.com/articles/s43588-022-00349-3",
      "projectUrl": "",
      "category": "materials_weather",
      "motivation": "三体相互作用GNN材料建模",
      "summary": "M3GNet 的核心目标是：三体相互作用GNN材料建模。",
      "keyPoints": [
        "核心动机：三体相互作用GNN材料建模",
        "代表机构：UC San Diego"
      ],
      "detail": "<p>三体相互作用GNN材料建模</p>"
    },
    {
      "id": "galactica",
      "num": 15,
      "name": "Galactica",
      "fullName": "Galactica (Galactica)",
      "year": "2022",
      "org": "Meta AI",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2211.09085",
      "projectUrl": "",
      "category": "science_llm",
      "motivation": "120B参数科学专用分词LaTeX/SMILES",
      "summary": "Galactica 的核心目标是：120B参数科学专用分词LaTeX/SMILES。",
      "keyPoints": [
        "核心动机：120B参数科学专用分词LaTeX/SMILES",
        "代表机构：Meta AI"
      ],
      "detail": "<p>120B参数科学专用分词LaTeX/SMILES</p>"
    },
    {
      "id": "gnome",
      "num": 16,
      "name": "GNoME",
      "fullName": "材料探索图网络 (Graph Networks for Materials Exploration)",
      "year": "2023",
      "org": "DeepMind",
      "parent": "—",
      "paperUrl": "https://www.nature.com/articles/s41586-023-06735-9",
      "projectUrl": "",
      "category": "materials_weather",
      "motivation": "GNN预测220万新晶体等效800年知识",
      "summary": "GNoME 的核心目标是：GNN预测220万新晶体等效800年知识。",
      "keyPoints": [
        "核心动机：GNN预测220万新晶体等效800年知识",
        "代表机构：DeepMind"
      ],
      "detail": "<p>GNN预测220万新晶体等效800年知识</p>"
    },
    {
      "id": "panguweather",
      "num": 17,
      "name": "Pangu-Weather",
      "fullName": "盘古气象 (Pangu-Weather)",
      "year": "2023",
      "org": "Huawei Cloud",
      "parent": "—",
      "paperUrl": "https://www.nature.com/articles/s41586-023-06185-3",
      "projectUrl": "",
      "category": "materials_weather",
      "motivation": "3D Transformer首超传统数值预报精度",
      "summary": "Pangu-Weather 的核心目标是：3D Transformer首超传统数值预报精度。",
      "keyPoints": [
        "核心动机：3D Transformer首超传统数值预报精度",
        "代表机构：Huawei Cloud"
      ],
      "detail": "<p>3D Transformer首超传统数值预报精度</p>"
    },
    {
      "id": "graphcast",
      "num": 18,
      "name": "GraphCast",
      "fullName": "GraphCast (GraphCast)",
      "year": "2023",
      "org": "DeepMind",
      "parent": "—",
      "paperUrl": "https://www.science.org/doi/10.1126/science.adi2336",
      "projectUrl": "",
      "category": "materials_weather",
      "motivation": "GNN球形网格建模大气动力学",
      "summary": "GraphCast 的核心目标是：GNN球形网格建模大气动力学。",
      "keyPoints": [
        "核心动机：GNN球形网格建模大气动力学",
        "代表机构：DeepMind"
      ],
      "detail": "<p>GNN球形网格建模大气动力学</p>"
    },
    {
      "id": "rfdiffusion",
      "num": 19,
      "name": "RFdiffusion",
      "fullName": "RoseTTAFold扩散 (RoseTTAFold Diffusion)",
      "year": "2023",
      "org": "Baker Lab/UW",
      "parent": "rosettafold",
      "paperUrl": "https://www.nature.com/articles/s41586-023-06415-8",
      "projectUrl": "",
      "category": "protein_structure",
      "motivation": "扩散模型从噪声生成全新蛋白质",
      "summary": "RFdiffusion 的核心目标是：扩散模型从噪声生成全新蛋白质。",
      "keyPoints": [
        "核心动机：扩散模型从噪声生成全新蛋白质",
        "演化来源：继承或改进自 rosettafold",
        "代表机构：Baker Lab/UW"
      ],
      "detail": "<p>扩散模型从噪声生成全新蛋白质</p>"
    },
    {
      "id": "alphafold3",
      "num": 20,
      "name": "AlphaFold 3",
      "fullName": "AlphaFold 3 (AlphaFold 3)",
      "year": "2024",
      "org": "DeepMind/Isomorphic",
      "parent": "alphafold2",
      "paperUrl": "https://www.nature.com/articles/s41586-024-07487-w",
      "projectUrl": "",
      "category": "protein_structure",
      "motivation": "扩散模块预测全生物分子相互作用",
      "summary": "AlphaFold 3 的核心目标是：扩散模块预测全生物分子相互作用。",
      "keyPoints": [
        "核心动机：扩散模块预测全生物分子相互作用",
        "演化来源：继承或改进自 alphafold2",
        "代表机构：DeepMind/Isomorphic"
      ],
      "detail": "<p>扩散模块预测全生物分子相互作用</p>"
    },
    {
      "id": "esm3",
      "num": 21,
      "name": "ESM3",
      "fullName": "进化尺度建模3 (Evolutionary Scale Modeling 3)",
      "year": "2024",
      "org": "EvolutionaryScale",
      "parent": "esm2",
      "paperUrl": "https://www.evolutionaryscale.ai/blog/esm3-release",
      "projectUrl": "",
      "category": "protein_structure",
      "motivation": "98B参数序列-结构-功能协同生成",
      "summary": "ESM3 的核心目标是：98B参数序列-结构-功能协同生成。",
      "keyPoints": [
        "核心动机：98B参数序列-结构-功能协同生成",
        "演化来源：继承或改进自 esm2",
        "代表机构：EvolutionaryScale"
      ],
      "detail": "<p>98B参数序列-结构-功能协同生成</p>"
    },
    {
      "id": "sciglm",
      "num": 22,
      "name": "SciGLM",
      "fullName": "科学GLM (Scientific GLM)",
      "year": "2024",
      "org": "清华大学/智谱AI",
      "parent": "—",
      "paperUrl": "https://proceedings.neurips.cc/paper_files/paper/2024/hash/02ee6b7295f720407b56c457b34c54d5-Abstract-Datasets_and_Benchmarks_Track.html",
      "projectUrl": "",
      "category": "science_llm",
      "motivation": "自反思指令标注大学水平科学推理",
      "summary": "SciGLM 的核心目标是：自反思指令标注大学水平科学推理。",
      "keyPoints": [
        "核心动机：自反思指令标注大学水平科学推理",
        "代表机构：清华大学/智谱AI"
      ],
      "detail": "<p>自反思指令标注大学水平科学推理</p>"
    },
    {
      "id": "scidfm",
      "num": 23,
      "name": "SciDFM",
      "fullName": "科学领域基础模型 (Scientific Domain Foundation Model)",
      "year": "2024",
      "org": "复旦大学",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2401.12356",
      "projectUrl": "",
      "category": "science_llm",
      "motivation": "MoE架构科学大模型多领域专家",
      "summary": "SciDFM 的核心目标是：MoE架构科学大模型多领域专家。",
      "keyPoints": [
        "核心动机：MoE架构科学大模型多领域专家",
        "代表机构：复旦大学"
      ],
      "detail": "<p>MoE架构科学大模型多领域专家</p>"
    },
    {
      "id": "unimap",
      "num": 24,
      "name": "UniMAP",
      "fullName": "统一分子预训练 (Unified Molecular Pre-training)",
      "year": "2024",
      "org": "Tsinghua University",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2402.13163",
      "projectUrl": "",
      "category": "molecular",
      "motivation": "多模态融合SMILES序列与分子图",
      "summary": "UniMAP 的核心目标是：多模态融合SMILES序列与分子图。",
      "keyPoints": [
        "核心动机：多模态融合SMILES序列与分子图",
        "代表机构：Tsinghua University"
      ],
      "detail": "<p>多模态融合SMILES序列与分子图</p>"
    },
    {
      "id": "aion1",
      "num": 25,
      "name": "AION-1",
      "fullName": "AION-1 (AION-1)",
      "year": "2025",
      "org": "Polymathic AI",
      "parent": "—",
      "paperUrl": "https://polymathic-ai.org/news/aion-1",
      "projectUrl": "",
      "category": "unified_foundation",
      "motivation": "十亿参数多模态天文学基础模型",
      "summary": "AION-1 的核心目标是：十亿参数多模态天文学基础模型。",
      "keyPoints": [
        "核心动机：十亿参数多模态天文学基础模型",
        "代表机构：Polymathic AI"
      ],
      "detail": "<p>十亿参数多模态天文学基础模型</p>"
    },
    {
      "id": "walrus",
      "num": 26,
      "name": "Walrus",
      "fullName": "Walrus (Walrus)",
      "year": "2025",
      "org": "Polymathic AI",
      "parent": "—",
      "paperUrl": "https://polymathic-ai.org/news/walrus",
      "projectUrl": "",
      "category": "unified_foundation",
      "motivation": "连续介质动力学跨领域物理迁移",
      "summary": "Walrus 的核心目标是：连续介质动力学跨领域物理迁移。",
      "keyPoints": [
        "核心动机：连续介质动力学跨领域物理迁移",
        "代表机构：Polymathic AI"
      ],
      "detail": "<p>连续介质动力学跨领域物理迁移</p>"
    },
    {
      "id": "mattergen",
      "num": 27,
      "name": "MatterGen",
      "fullName": "MatterGen (MatterGen)",
      "year": "2025",
      "org": "Microsoft Research",
      "parent": "—",
      "paperUrl": "https://www.microsoft.com/en-us/research/blog/mattergen-a-generative-model-for-inorganic-materials-design/",
      "projectUrl": "",
      "category": "materials_weather",
      "motivation": "扩散生成满足属性约束的晶体",
      "summary": "MatterGen 的核心目标是：扩散生成满足属性约束的晶体。",
      "keyPoints": [
        "核心动机：扩散生成满足属性约束的晶体",
        "代表机构：Microsoft Research"
      ],
      "detail": "<p>扩散生成满足属性约束的晶体</p>"
    },
    {
      "id": "auroragpt",
      "num": 28,
      "name": "AuroraGPT",
      "fullName": "AuroraGPT (AuroraGPT)",
      "year": "2026",
      "org": "Argonne National Lab",
      "parent": "—",
      "paperUrl": "https://www.anl.gov/aurora-gpt",
      "projectUrl": "",
      "category": "unified_foundation",
      "motivation": "2T参数整合20T+科学Token多模态",
      "summary": "AuroraGPT 的核心目标是：2T参数整合20T+科学Token多模态。",
      "keyPoints": [
        "核心动机：2T参数整合20T+科学Token多模态",
        "代表机构：Argonne National Lab"
      ],
      "detail": "<p>2T参数整合20T+科学Token多模态</p>"
    },
    {
      "id": "scienceone100",
      "num": 29,
      "name": "ScienceOne 100",
      "fullName": "科学一号 (ScienceOne 100)",
      "year": "2026",
      "org": "中国科学院",
      "parent": "—",
      "paperUrl": "https://dig.watch/resources/scienceone-100",
      "projectUrl": "",
      "category": "unified_foundation",
      "motivation": "跨数学物理生物统一模型100+场景",
      "summary": "ScienceOne（磐石）是中国科学院构建的\"AI+科学\"操作系统级平台，通过异构混合专家（MoE）基座模型、多模态科学推理模型和深度研究智能体三大核心组件，覆盖数学、物理、化学、天文、地球科学、生物六大基础学科的100+科学场景，实现了从科学数据理解、知识推理到工具编排的全链路科研智能化。",
      "keyPoints": [
        "<strong>平台级架构</strong>：ScienceOne 不是单一模型，而是包含 S1-Base（科学基座）、S1-VL（多模态推理）、S1-Omni（全模态）、S1-DeepResearch（深度研究智能体）四大模型族的统一科学操作系统",
        "<strong>异构 MoE 路由</strong>：S1-Base 采用异构混合专家架构，可自动将用户查询路由至通用大语言模型或领域专用模型（波谱、场、蛋白质、生物序列等）",
        "<strong>六学科覆盖</strong>：系统性学习数学、物理、化学、天文学、地球科学、生物学的核心理论与专业知识",
        "<strong>1.7 亿篇科学论文训练</strong>：S1-Base 基于 1.7 亿篇科学论文预训练，并通过百万级高质量科学推理数据进行指令微调",
        "<strong>课程式强化学习</strong>：采用高中→本科→研究生分阶段课程学习策略，逐步提升学科能力",
        "<strong>四阶段渐进式后训练</strong>（S1-VL）：科学推理 SFT → 图像思维冷启动 SFT → 科学推理 RL（SAPO）→ 图像思维 RL（SAPO）",
        "<strong>Thinking-with-Images 范式</strong>：S1-VL 在推理过程中主动调用 Python 代码执行图像操作（裁剪、缩放、增强、标注），实现多轮迭代视觉推理",
        "<strong>六维质量过滤框架</strong>：对推理轨迹进行多维度质量评估与过滤，配合自适应数据路由策略",
        "<strong>深度研究智能体</strong>：S1-DeepResearch 支持 128K 上下文窗口、150+ 轮连续工具调用、9 种内置工具",
        "<strong>多尺度参数</strong>：S1-Base 提供 8B / 32B / 671B 三种规模；S1-VL 为 32B；S1-DeepResearch 为 8B / 32B",
        "<strong>13 个基准评测 SOTA</strong>：S1-VL-32B 在 HRBench-4K/8K、MME-RealWorld 等 5 个图像操作推理基准上全部第一，科学推理基准上超越同等及更大规模模型"
      ],
      "detail": "<h5>平台总体架构</h5>\n<p>ScienceOne（磐石）是中国科学院依托科学基础大模型研发的\"人工智能+科学\"操作系统。与单一模型不同，ScienceOne 采用<strong>模块化平台架构</strong>，面向跨领域前沿科学发现与技术创新的共性需求，提供四大核心能力：</p>\n<ol>\n<li><strong>多模态科学数据专业理解</strong>：处理科学图表、显微图像、遥感影像、天文观测数据等</li>\n<li><strong>科学文献萃取融合</strong>：从海量论文中提取、整合知识</li>\n<li><strong>科学知识表征推理</strong>：基于学科知识体系进行逻辑推理</li>\n<li><strong>科学工具编排规划</strong>：自动调用计算工具完成复杂科研任务</li>\n</ol>\n<p>平台包含以下核心模型族：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>模型族</th>\n<th>功能定位</th>\n<th>参数规模</th>\n<th>基座模型</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>S1-Base</td>\n<td>科学基座语言模型</td>\n<td>8B / 32B / 671B</td>\n<td>Qwen3-8B / Qwen3-32B / DeepSeek-V3</td>\n</tr>\n<tr>\n<td>S1-VL</td>\n<td>科学多模态推理</td>\n<td>32B</td>\n<td>Qwen3-VL-32B-Thinking</td>\n</tr>\n<tr>\n<td>S1-Omni</td>\n<td>全模态科学模型</td>\n<td>29B</td>\n<td>—</td>\n</tr>\n<tr>\n<td>S1-DeepResearch</td>\n<td>深度研究智能体</td>\n<td>8B / 32B</td>\n<td>Qwen3-32B</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 <strong>关键</strong>：ScienceOne 的\"100\"指覆盖 100+ 科学应用场景，而非单一模型参数量，体现了其作为科学操作系统的广度定位。</div>\n<h5>S1-Base：异构 MoE 科学基座模型</h5>\n<p>S1-Base 是整个平台的基础层，其核心创新在于<strong>异构混合专家（Heterogeneous MoE）架构</strong>：</p>\n<pre><code>用户查询 → 路由器（Router）\n              ├─→ 通用科学 LLM（数学/物理/化学推理）\n              ├─→ 波谱模型（光谱、波形分析）\n              ├─→ 场模型（电磁场、引力场模拟）\n              ├─→ 蛋白质模型（结构预测、功能注释）\n              └─→ 生物序列模型（基因组、转录组分析）\n</code></pre>\n<p><strong>训练流程</strong>分为三个层次：</p>\n<ol>\n<li>\n<p><strong>大规模科学预训练</strong>：基于 1.7 亿篇科学论文进行继续预训练，使模型系统性地学习六大基础学科（数学、物理、化学、天文学、地球科学、生物学）的核心理论、定律和专业知识</p>\n</li>\n<li>\n<p><strong>科学指令微调</strong>：使用百万级高质量科学推理数据进行指令微调，提升模型在科学问答、推导、分析等任务上的表现</p>\n</li>\n<li>\n<p><strong>多学科复合强化学习 + 课程学习</strong>：</p>\n</li>\n<li>采用<strong>课程学习策略</strong>，按高中→本科→研究生难度梯度逐步提升</li>\n<li>通过多学科复合奖励函数进行强化学习，确保各学科能力均衡发展</li>\n</ol>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：S1-Base-671B 基于 DeepSeek-V3 架构，本身即为 MoE 模型（激活参数远小于总参数），这使得 671B 规模在推理时具有较高的计算效率。</div>\n<h5>S1-VL：科学多模态推理模型（Thinking-with-Images）</h5>\n<p>S1-VL 是 ScienceOne 平台的多模态核心，其技术报告已发表于 arXiv（2604.21409）。该模型原生支持两种互补的推理范式：</p>\n<p><strong>范式一：Scientific Reasoning（科学推理）</strong></p>\n<p>基于结构化思维链（Chain-of-Thought）的多模态科学推理，适用于复杂多步骤问题的分析与求解。</p>\n<p><strong>范式二：Thinking-with-Images（图像思维）</strong></p>\n<p>这是 S1-VL 最具创新性的设计。模型在推理过程中可以<strong>主动生成并执行 Python 代码</strong>来操作图像：</p>\n<pre><code class=\"language-python\"># S1-VL Thinking-with-Images 推理流程伪代码\ndef thinking_with_images(query, image):\n    context = [image]\n    reasoning = &quot;&quot;\n\n    for turn in range(max_turns):\n        # 模型生成推理文本 + 可选的代码操作\n        response = model.generate(query, context, reasoning)\n\n        if response.has_code():\n            # 在沙箱环境中执行图像操作代码\n            code = response.extract_code()\n            # 支持操作：裁剪、缩放、增强、边界框标注、关键点标记\n            result_image = sandbox.execute(code, context[-1])\n            context.append(result_image)  # 中间视觉结果加入上下文\n\n        reasoning += response.text\n\n        if response.is_final():\n            return reasoning\n</code></pre>\n<div class=\"key-point\">💡 <strong>关键</strong>：Thinking-with-Images 特别适用于高分辨率科学图表解读、显微图像理解、遥感影像分析和几何辅助推理等场景——这些场景中，模型需要\"放大\"或\"标注\"图像的特定区域才能准确推理。</div>\n<p><strong>四阶段渐进式后训练流程</strong>：</p>\n<p>$$\\text{Stage 1: SFT}_{\\text{sci}} \\rightarrow \\text{Stage 2: SFT}_{\\text{TwI}} \\rightarrow \\text{Stage 3: RL}_{\\text{sci}} \\rightarrow \\text{Stage 4: RL}_{\\text{TwI}}$$</p>\n<ul>\n<li><strong>Stage 1 — 科学推理 SFT</strong>：使用跨学科（数学、物理、化学、天文、地球科学、生物）大规模多模态指令数据进行混合训练，增强科学视觉理解与逻辑推理能力</li>\n<li><strong>Stage 2 — 图像思维冷启动 SFT</strong>：引入 Thinking-with-Images 范式，联合高质量科学推理课程学习数据与图像思维数据进行训练，使模型获得通过代码执行图像操作的能力</li>\n<li><strong>Stage 3 — 科学推理 RL</strong>：基于 <strong>SAPO 算法</strong>（Self-Aligned Policy Optimization）和多任务科学奖励函数，对高难度科学多模态推理样本进行强化学习，突破 SFT 阶段的性能天花板</li>\n<li><strong>Stage 4 — 图像思维 RL</strong>：基于 SAPO 算法和<strong>四维复合奖励函数</strong>，进一步优化模型的图像操作调用时机与质量，实现稳定高效的多轮视觉推理</li>\n</ul>\n<p><strong>六维质量过滤框架与自适应数据路由</strong>：</p>\n<p>为解决现有数据集中冗余、无效和错误视觉操作的问题，S1-VL 提出：</p>\n<ol>\n<li><strong>六维质量过滤框架</strong>：对推理轨迹从六个维度进行质量评估与过滤</li>\n<li><strong>多阶段过滤管线</strong>：逐步筛选高质量训练样本</li>\n<li><strong>自适应数据路由策略</strong>：将视觉信息增益低的样本转换为纯推理模式数据，使模型学会判断\"何时真正需要图像操作\"</li>\n</ol>\n<h5>S1-DeepResearch：长程深度研究智能体</h5>\n<p>S1-DeepResearch 是面向科研场景的端到端智能体模型，具备五大核心能力：</p>\n<ol>\n<li><strong>长链复杂推理</strong>：支持跨文档检索、证据聚合、状态记忆和策略迭代</li>\n<li><strong>深度研究指令遵循</strong>：解析多约束指令，构建\"任务定义→机制→工具执行→结果呈现\"的全链路理解</li>\n<li><strong>深度研究报告撰写</strong>：生成可论证、可引用的报告式输出</li>\n<li><strong>文件理解与生成</strong>：覆盖 PDF、表格、网页等多模态输入输出</li>\n<li><strong>技能调用</strong>：将文献检索、数据分析、实验设计、计算建模等组织为可调用模块</li>\n</ol>\n<p>技术特性：\n- <strong>128K 上下文窗口</strong>：单次会话可容纳超长证据链\n- <strong>150+ 轮连续工具调用</strong>：支持多阶段任务的持续规划、执行和自我修正\n- <strong>9 种原生内置工具</strong>：搜索、网页浏览、代码执行等</p>\n<p>在 20 个智能体能力基准上，S1-DeepResearch-32B 全面超越基座模型 Qwen3-32B，整体性能接近 GPT 5.2、Claude 4.6、GLM-5 等闭源旗舰模型。</p>\n<h5>数据集与基准</h5>\n<p>ScienceOne 团队同步开源了多个高质量数据集：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>数据集</th>\n<th>规模</th>\n<th>用途</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>S1-MMAlign</td>\n<td>2110 万样本</td>\n<td>多模态对齐训练</td>\n</tr>\n<tr>\n<td>S1-DeepResearch-15k</td>\n<td>1.5 万条</td>\n<td>智能体训练轨迹</td>\n</tr>\n<tr>\n<td>PhysLogic</td>\n<td>—</td>\n<td>物理逻辑推理评测</td>\n</tr>\n<tr>\n<td>HiSciBench</td>\n<td>—</td>\n<td>高阶科学能力基准</td>\n</tr>\n</tbody>\n</table></div>\n<h5>与传统方法的区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th>传统科学 AI 模型</th>\n<th>ScienceOne</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>覆盖范围</td>\n<td>单一学科/任务</td>\n<td>六大学科 100+ 场景</td>\n</tr>\n<tr>\n<td>架构设计</td>\n<td>单一模型</td>\n<td>异构 MoE + 模型族平台</td>\n</tr>\n<tr>\n<td>推理方式</td>\n<td>纯文本 CoT</td>\n<td>CoT + Thinking-with-Images</td>\n</tr>\n<tr>\n<td>图像理解</td>\n<td>被动接收</td>\n<td>主动操作（裁剪/缩放/标注）</td>\n</tr>\n<tr>\n<td>研究能力</td>\n<td>单步问答</td>\n<td>150+ 轮长程深度研究</td>\n</tr>\n<tr>\n<td>训练数据</td>\n<td>通用语料</td>\n<td>1.7 亿篇科学论文 + 课程学习</td>\n</tr>\n</tbody>\n</table></div>",
      "quiz": {
        "q": "S1-VL 模型的 Thinking-with-Images 范式的核心创新是什么？",
        "options": [
          "使用更大的视觉编码器提升图像分辨率",
          "在推理过程中主动生成并执行代码来操作图像，获取中间视觉结果后继续推理",
          "将图像转换为文本描述后进行纯文本推理",
          "使用多个视觉编码器分别处理不同类型的科学图像"
        ],
        "answer": 1,
        "explain": "Thinking-with-Images 的核心在于模型在推理过程中可以主动调用 Python 代码执行图像操作（裁剪、缩放、增强、标注等），在沙箱环境中获取中间视觉结果，然后以多轮迭代方式继续推理，而非被动地一次性处理输入图像。"
      }
    },
    {
      "id": "prithvi",
      "num": 30,
      "name": "Prithvi",
      "fullName": "Prithvi地学基础模型 (Prithvi Geospatial FM)",
      "year": "2026",
      "org": "NASA/IBM",
      "parent": "—",
      "paperUrl": "https://www.nasa.gov/news-release/nasa-ibm-geospatial-ai-foundation-model-deployed-in-orbit/",
      "projectUrl": "",
      "category": "unified_foundation",
      "motivation": "首个在轨部署地学基础模型ISS实时",
      "summary": "Prithvi 的核心目标是：首个在轨部署地学基础模型ISS实时。",
      "keyPoints": [
        "核心动机：首个在轨部署地学基础模型ISS实时",
        "代表机构：NASA/IBM"
      ],
      "detail": "<p>首个在轨部署地学基础模型ISS实时</p>"
    },
    {
      "id": "darwin7b",
      "num": 31,
      "name": "Darwin-7B",
      "fullName": "Darwin-7B (Darwin-7B)",
      "year": "2026",
      "org": "ICLR 2026",
      "parent": "—",
      "paperUrl": "https://fm-science.github.io/",
      "projectUrl": "",
      "category": "unified_foundation",
      "motivation": "肠道微生物组多组学基础模型",
      "summary": "Darwin-7B 的核心目标是：肠道微生物组多组学基础模型。",
      "keyPoints": [
        "核心动机：肠道微生物组多组学基础模型",
        "代表机构：ICLR 2026"
      ],
      "detail": "<p>肠道微生物组多组学基础模型</p>"
    }
  ],
  "categories": {
    "neural_operator": {
      "label": "神经算子与基础架构",
      "color": "#607D8B"
    },
    "protein_structure": {
      "label": "蛋白质结构预测",
      "color": "#4CAF50"
    },
    "materials_weather": {
      "label": "材料科学与气象预测",
      "color": "#2196F3"
    },
    "molecular": {
      "label": "分子建模与药物发现",
      "color": "#9C27B0"
    },
    "science_llm": {
      "label": "科学大语言模型",
      "color": "#FF9800"
    },
    "unified_foundation": {
      "label": "统一科学基础模型",
      "color": "#E91E63"
    }
  },
  "projectUrls": {}
};
