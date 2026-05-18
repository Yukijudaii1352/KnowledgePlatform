/**
 * rag-data.js — 由 pipeline/build.py 于 2026-05-18 18:51:06 自动生成。
 * 源文件：content/llm/rag.md
 * ⚠️  请勿手动修改；如需更新，修改源文档后重新编译。
 */
window.PAGE_CONFIG = {
  "meta": {
    "domain": "llm",
    "topic_id": "rag",
    "topic_name": "检索增强生成",
    "page_title": "检索增强生成 (RAG) 技术演进图谱",
    "page_subtitle": "2026-05-18 版",
    "page_desc": "系统梳理RAG技术从2020年DPR/REALM奠基到2026年Agentic RAG、多模态RAG的演进历程，涵盖架构设计、检索策略与评测方法的完整演化路径",
    "page_icon": "🔍",
    "hero_pills": [
      "🏷️ RAG · Dense Retrieval · Knowledge Augmentation · Agentic AI"
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
        "id": "dpr",
        "x": 100,
        "y": 150,
        "category": "foundation"
      },
      {
        "id": "realm",
        "x": 120,
        "y": 100,
        "category": "foundation"
      },
      {
        "id": "colbert",
        "x": 130,
        "y": 200,
        "category": "foundation"
      },
      {
        "id": "rag",
        "x": 200,
        "y": 150,
        "category": "foundation"
      },
      {
        "id": "fid",
        "x": 280,
        "y": 120,
        "category": "foundation"
      },
      {
        "id": "contriever",
        "x": 300,
        "y": 180,
        "category": "foundation"
      },
      {
        "id": "retro",
        "x": 350,
        "y": 100,
        "category": "foundation"
      },
      {
        "id": "atlas",
        "x": 380,
        "y": 120,
        "category": "foundation"
      },
      {
        "id": "e5",
        "x": 400,
        "y": 180,
        "category": "foundation"
      },
      {
        "id": "hyde",
        "x": 420,
        "y": 200,
        "category": "foundation"
      },
      {
        "id": "flare",
        "x": 500,
        "y": 350,
        "category": "architecture"
      },
      {
        "id": "recomp",
        "x": 520,
        "y": 380,
        "category": "architecture"
      },
      {
        "id": "self_rag",
        "x": 600,
        "y": 320,
        "category": "architecture"
      },
      {
        "id": "crag",
        "x": 650,
        "y": 300,
        "category": "architecture"
      },
      {
        "id": "graphrag",
        "x": 680,
        "y": 360,
        "category": "architecture"
      },
      {
        "id": "llmlingua",
        "x": 700,
        "y": 400,
        "category": "architecture"
      },
      {
        "id": "ragas",
        "x": 650,
        "y": 500,
        "category": "evaluation"
      },
      {
        "id": "rgb",
        "x": 550,
        "y": 500,
        "category": "evaluation"
      },
      {
        "id": "linearrag",
        "x": 850,
        "y": 360,
        "category": "frontier_2026"
      },
      {
        "id": "tm_rag",
        "x": 880,
        "y": 300,
        "category": "frontier_2026"
      },
      {
        "id": "videorag",
        "x": 900,
        "y": 250,
        "category": "frontier_2026"
      },
      {
        "id": "bayesrag",
        "x": 950,
        "y": 240,
        "category": "frontier_2026"
      },
      {
        "id": "ssrag",
        "x": 920,
        "y": 320,
        "category": "frontier_2026"
      },
      {
        "id": "vig_rag",
        "x": 930,
        "y": 380,
        "category": "frontier_2026"
      },
      {
        "id": "urag",
        "x": 970,
        "y": 260,
        "category": "frontier_2026"
      },
      {
        "id": "mg_crag",
        "x": 900,
        "y": 340,
        "category": "frontier_2026"
      },
      {
        "id": "qwen3_embedding",
        "x": 1000,
        "y": 420,
        "category": "frontier_2026"
      },
      {
        "id": "raguard",
        "x": 1000,
        "y": 500,
        "category": "frontier_2026"
      }
    ],
    "edges": [
      {
        "from": "dpr",
        "to": "rag",
        "label": "端到端框架"
      },
      {
        "from": "dpr",
        "to": "contriever",
        "label": "无监督学习"
      },
      {
        "from": "dpr",
        "to": "hyde",
        "label": "假设性嵌入"
      },
      {
        "from": "contriever",
        "to": "e5",
        "label": "弱监督预训练"
      },
      {
        "from": "e5",
        "to": "qwen3_embedding",
        "label": "大模型化"
      },
      {
        "from": "rag",
        "to": "fid",
        "label": "多文档融合"
      },
      {
        "from": "fid",
        "to": "atlas",
        "label": "联合预训练"
      },
      {
        "from": "realm",
        "to": "retro",
        "label": "分块注意力"
      },
      {
        "from": "rag",
        "to": "flare",
        "label": "主动检索"
      },
      {
        "from": "rag",
        "to": "recomp",
        "label": "内容压缩"
      },
      {
        "from": "rag",
        "to": "self_rag",
        "label": "自我反思"
      },
      {
        "from": "rag",
        "to": "graphrag",
        "label": "图谱推理"
      },
      {
        "from": "rag",
        "to": "llmlingua",
        "label": "上下文压缩"
      },
      {
        "from": "self_rag",
        "to": "crag",
        "label": "检索评估"
      },
      {
        "from": "self_rag",
        "to": "tm_rag",
        "label": "Mamba融合"
      },
      {
        "from": "self_rag",
        "to": "ssrag",
        "label": "混合检索"
      },
      {
        "from": "crag",
        "to": "mg_crag",
        "label": "多粒度评估"
      },
      {
        "from": "graphrag",
        "to": "linearrag",
        "label": "线性索引"
      },
      {
        "from": "graphrag",
        "to": "vig_rag",
        "label": "时间图谱"
      },
      {
        "from": "rag",
        "to": "videorag",
        "label": "多模态扩展"
      },
      {
        "from": "videorag",
        "to": "bayesrag",
        "label": "概率互证"
      },
      {
        "from": "videorag",
        "to": "urag",
        "label": "统一架构"
      },
      {
        "from": "rgb",
        "to": "raguard",
        "label": "鲁棒性评测"
      }
    ],
    "milestones": [
      "dpr",
      "self_rag",
      "linearrag"
    ]
  },
  "algos": [
    {
      "id": "dpr",
      "num": 1,
      "name": "DPR",
      "fullName": "密集段落检索 (Dense Passage Retrieval)",
      "year": "2020",
      "org": "Meta AI",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2004.04906",
      "projectUrl": "",
      "category": "foundation",
      "motivation": "双编码器架构实现语义检索，开创密集检索时代",
      "summary": "DPR 提出使用双塔 BERT 编码器分别编码问题和段落，通过点积相似度进行密集检索，仅依赖少量问答对监督训练即大幅超越 BM25，在开放域问答的检索阶段实现了从稀疏到密集的范式转换。",
      "keyPoints": [
        "<strong>双塔编码器架构</strong>：独立的 Question Encoder \\(E_Q\\) 和 Passage Encoder \\(E_P\\)，均基于 BERT-base，输出 768 维向量，相似度为点积",
        "<strong>高效负样本策略</strong>：In-batch negatives（批内共享负样本，\\(B\\) 个问题产生 \\(B^2\\) 个训练对）+ 1 个 BM25 硬负样本（高 BM25 分但不含答案的段落）",
        "<strong>NLL 损失函数</strong>：对正样本段落的负对数似然，在 \\(B + 1\\) 个候选中做 softmax",
        "<strong>极高的样本效率</strong>：仅 1,000 个训练样本即超越 BM25，展示预训练语言模型的强大语义泛化能力",
        "<strong>FAISS 向量索引</strong>：离线编码 2100 万段落，使用 HNSW 索引实现 995 queries/sec 的实时检索",
        "<strong>端到端 QA 系统</strong>：检索器 + BERT-base 阅读器（交叉注意力重排序 + 抽取式答案），NQ 上 EM 达 41.5%，超越 ORQA (33.3%) 和 REALM (40.4%)",
        "<strong>5 个 QA 基准</strong>：Natural Questions、TriviaQA、WebQuestions、CuratedTREC、SQuAD v1.1"
      ],
      "detail": "<p><img alt=\"DPR 样本效率曲线\" src=\"https://arxiv.org/html/2004.04906v2/extracted/3803013/sample_eff.png\" />\n<em>图：DPR 在不同训练样本量下的 Top-k 检索准确率 vs BM25。仅用 1,000 个样本训练的 DPR 已超越 BM25 基线（Natural Questions 开发集）。</em></p>\n<pre><code class=\"language-python\"># DPR 训练与检索伪代码\n\n# === 离线阶段：编码所有段落 ===\npassage_index = {}\nfor p in all_wikipedia_passages:        # 21,015,324 个 100-word 段落\n    p_input = &quot;[CLS] title [SEP] passage [SEP]&quot;\n    p_vec = E_P(p_input)                # BERT-base → CLS token → 768-d\n    passage_index[p.id] = p_vec\nfaiss_index = FAISS_HNSW(passage_index) # 构建 HNSW 近似最近邻索引\n\n# === 训练阶段：In-batch Negatives + BM25 Hard Negatives ===\nfor epoch in range(40):                 # 大数据集 40 epochs，小数据集 100 epochs\n    for batch in dataloader:            # batch_size = 128\n        Q = [q_1, ..., q_B]            # B 个问题\n        P_pos = [p_1+, ..., p_B+]      # B 个正样本段落\n        P_bm25 = [p_1-, ..., p_B-]     # B 个 BM25 硬负样本\n\n        q_vecs = E_Q(Q)                # (B, 768)\n        p_vecs = E_P(P_pos + P_bm25)   # (2B, 768)\n\n        # 相似度矩阵：每个 q 与所有 2B 个段落计算点积\n        sim_matrix = q_vecs @ p_vecs.T  # (B, 2B)\n\n        # NLL 损失：正样本在对角线位置\n        loss = -log_softmax(sim_matrix, dim=1)[range(B), range(B)]\n        loss.mean().backward()\n        adam_optimizer.step()            # lr=1e-5, dropout=0.1\n\n# === 在线阶段：检索 ===\ndef retrieve(question, k=100):\n    q_vec = E_Q(question)               # 768-d\n    top_k_ids = faiss_index.search(q_vec, k)  # ~1ms, 995 q/s\n    return top_k_ids\n</code></pre>\n<p><strong>动机与背景</strong></p>\n<p>开放域问答（Open-Domain QA）需要从海量文档中检索相关段落再抽取答案。传统方法依赖 TF-IDF 或 BM25 等稀疏检索，本质上是词频匹配——无法捕捉同义词、释义等语义关系。例如，问题 \"Who is the bad guy inerta?\" 的答案段落可能不包含 \"bad guy\" 而使用 \"villain\" 或 \"antagonist\"，BM25 对此束手无策。</p>\n<p>在 DPR 之前，ORQA（Lee et al., 2019）尝试用 Inverse Cloze Task (ICT) 预训练密集检索器，但需要昂贵的预训练且效果有限。DPR 的核心洞察是：<strong>仅用少量问答对的监督信号，配合精心设计的负样本策略，就能训练出远超 BM25 的密集检索器，无需额外预训练。</strong></p>\n<p><strong>核心机制一：双塔编码器</strong></p>\n<p>DPR 使用两个独立的 BERT-base 编码器，分别将问题和段落映射到同一个 768 维向量空间：</p>\n<p>$$\\text{sim}(q, p) = E_Q(q)^\\top E_P(p)$$</p>\n<p>其中 \\(E_Q(q) = \\text{BERT}_Q(q)[\\text{CLS}] \\in \\mathbb{R}^{768}\\)，\\(E_P(p) = \\text{BERT}_P(p)[\\text{CLS}] \\in \\mathbb{R}^{768}\\)。</p>\n<div class=\"key-point\">💡 <strong>关键设计</strong>：使用两个独立编码器而非共享参数，因为问题（短、疑问句式）和段落（长、陈述句式）的分布差异较大，独立编码器能更好地适应各自的语言模式。</div>\n<p>段落输入格式为 <code>[CLS] title [SEP] passage text [SEP]</code>，将文章标题作为额外上下文信息拼接在段落前。</p>\n<p><strong>核心机制二：负样本策略</strong></p>\n<p>训练的关键在于如何选择负样本。DPR 系统比较了三种负样本：</p>\n<ol>\n<li><strong>Random negatives</strong>：从语料库随机采样，太简单，区分度不够</li>\n<li><strong>BM25 negatives（硬负样本）</strong>：BM25 检索得分高但不含答案的段落——词汇高度重叠但语义不匹配，迫使模型学习深层语义</li>\n<li><strong>Gold negatives</strong>：其他问题的正样本段落</li>\n</ol>\n<p>最终最优配置是 <strong>In-batch gold negatives + 1 个 BM25 硬负样本</strong>。</p>\n<p><strong>核心机制三：In-batch Negatives</strong></p>\n<p>这是 DPR 训练效率的关键。在一个 batch 中有 \\(B\\) 个 \\((q_i, p_i^+)\\) 对，每个问题的正样本段落自动成为其他 \\(B-1\\) 个问题的负样本。这样一个 batch 就产生了 \\(B \\times B\\) 个训练对，而段落编码只需计算一次。</p>\n<p>训练损失为：</p>\n<p>$$L(q_i, p_i^+, p_{i,1}^-, \\ldots, p_{i,n}^-) = -\\log \\frac{e^{\\text{sim}(q_i, p_i^+)}}{e^{\\text{sim}(q_i, p_i^+)} + \\sum_{j=1}^{n} e^{\\text{sim}(q_i, p_{i,j}^-)}}$$</p>\n<p>其中负样本集合包括 batch 内其他 \\(B-1\\) 个正样本（gold negatives）加上 \\(B\\) 个 BM25 硬负样本。</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：消融实验（Table 3）显示，in-batch negatives 比标准 1-of-N 训练提升显著（Top-20: 73.0% vs 64.3%），且准确率随 batch size 增大而持续提升（batch 128 的 Gold negatives: 73.0% vs batch 8 的 69.1%）。额外加入 1 个 BM25 硬负样本后进一步提升至 78.0%，但加 2 个反而略降。</div>\n<p><strong>训练与推理流程</strong></p>\n<ul>\n<li><strong>离线编码</strong>：将 Wikipedia 切分为 21,015,324 个不重叠的 100-word 段落，每个段落前拼接文章标题。用 \\(E_P\\) 编码所有段落，8 GPU 并行约 8.8 小时。构建 FAISS HNSW 索引约 8.5 小时。</li>\n<li><strong>在线检索</strong>：问题经 \\(E_Q\\) 编码为 768 维向量，通过 FAISS 索引检索 Top-k 段落。HNSW 配置：每节点存储 512 邻居，构建搜索深度 200，查询搜索深度 128。吞吐量 995 queries/sec（返回 Top-100），远超 BM25/Lucene 的 23.7 queries/sec。</li>\n<li><strong>阅读器</strong>：取 Top-100 段落中的 24 个，用独立的 BERT-base 阅读器进行交叉注意力编码。阅读器同时输出段落选择分数（基于 [CLS] 向量）和答案 span 分数（起止位置概率），最终答案 = 最高段落选择分数对应段落中的最高 span。</li>\n</ul>\n<p><strong>核心实验结果</strong></p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>NQ Top-20</th>\n<th>NQ Top-100</th>\n<th>NQ EM</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>BM25</td>\n<td>59.1</td>\n<td>73.7</td>\n<td>32.6</td>\n</tr>\n<tr>\n<td>ORQA</td>\n<td>—</td>\n<td>—</td>\n<td>33.3</td>\n</tr>\n<tr>\n<td>REALM</td>\n<td>—</td>\n<td>—</td>\n<td>40.4</td>\n</tr>\n<tr>\n<td><strong>DPR (Single)</strong></td>\n<td><strong>78.4</strong></td>\n<td><strong>85.4</strong></td>\n<td><strong>41.5</strong></td>\n</tr>\n<tr>\n<td>DPR (Multi)</td>\n<td>79.4</td>\n<td>86.0</td>\n<td>41.5</td>\n</tr>\n</tbody>\n</table></div>\n<p>DPR 在 4/5 个数据集上的检索准确率大幅超越 BM25（唯一例外是 SQuAD，因其问题由标注者看着段落编写，词汇重叠极高，天然有利于 BM25）。</p>\n<p><strong>与传统方法的关键区别</strong></p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th>BM25</th>\n<th>ORQA</th>\n<th>DPR</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>检索方式</td>\n<td>稀疏词频匹配</td>\n<td>密集向量</td>\n<td>密集向量</td>\n</tr>\n<tr>\n<td>预训练</td>\n<td>无需</td>\n<td>ICT 预训练（昂贵）</td>\n<td>无需额外预训练</td>\n</tr>\n<tr>\n<td>语义理解</td>\n<td>❌ 仅词汇匹配</td>\n<td>✅ 但受限于 ICT</td>\n<td>✅ 监督学习</td>\n</tr>\n<tr>\n<td>训练数据</td>\n<td>无需</td>\n<td>无监督</td>\n<td>少量 QA 对（1k 即可超 BM25）</td>\n</tr>\n<tr>\n<td>NQ Top-20</td>\n<td>59.1%</td>\n<td>—</td>\n<td>78.4%</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 <strong>核心贡献</strong>：DPR 证明了一个简单但深刻的结论——在有少量标注数据的情况下，简单的双编码器 + 精心设计的负样本策略就足以大幅超越传统稀疏检索和复杂的预训练方法（如 ORQA/ICT），为后续 RAG、ColBERT 等工作奠定了密集检索的基础范式。</div>",
      "quiz": {
        "q": "DPR 训练中 in-batch negatives 的核心优势是什么？",
        "options": [
          "减少了模型参数量，加快推理速度",
          "利用 batch 内其他问题的正样本作为负样本，无需额外计算即可大幅增加训练对数量",
          "消除了对 BM25 硬负样本的依赖",
          "使问题编码器和段落编码器可以共享参数"
        ],
        "answer": 1,
        "explain": "In-batch negatives 将 batch 中 B 个正样本段落交叉复用为负样本，一次编码产生 B² 个训练对，显著提升训练效率和效果，是 DPR 性能提升的关键因素之一。"
      }
    },
    {
      "id": "realm",
      "num": 2,
      "name": "REALM",
      "fullName": "检索增强语言模型预训练 (Retrieval-Augmented Language Model Pre-training)",
      "year": "2020.02",
      "org": "Google Research",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2002.08909",
      "projectUrl": "",
      "category": "foundation",
      "motivation": "将检索机制集成到预训练阶段，显著跨度掩码任务",
      "summary": "REALM 提出了一种检索增强的语言模型预训练框架，将知识检索建模为可微分的潜变量，通过端到端反向传播联合训练神经知识检索器与知识增强编码器，使预训练模型能够从百万级文档语料库中主动检索相关知识，在 Open-QA 任务上以 330M 参数量超越 11B 参数的 T5 模型。",
      "keyPoints": [
        "<strong>潜变量检索框架</strong>：将检索文档 \\(z\\) 建模为潜变量，通过边际化 \\(p(y|x) = \\sum_z p(y|z,x) \\cdot p(z|x)\\) 实现端到端训练",
        "<strong>双塔检索器 (Knowledge Retriever)</strong>：使用两个独立 BERT 分别编码查询和文档，通过内积计算相关性得分，结合 MIPS 实现亚线性时间 top-k 检索",
        "<strong>知识增强编码器 (Knowledge-Augmented Encoder)</strong>：将查询与检索文档拼接后输入 Transformer，通过 cross-attention 深度融合信息",
        "<strong>异步 MIPS 索引刷新</strong>：使用异步更新机制解决训练过程中文档嵌入需要随参数更新而刷新的问题，每隔数百步重新编码全部文档",
        "<strong>显著跨度掩码 (Salient Span Masking)</strong>：优先掩码命名实体和日期等信息密集的跨度，迫使模型学习检索世界知识",
        "<strong>Null 文档机制</strong>：引入空文档 \\(\\varnothing\\) 作为候选，允许模型在不需要检索时选择不依赖外部文档",
        "<strong>ICT 预热初始化</strong>：使用逆完形填空任务 (Inverse Cloze Task) 预热检索器，避免冷启动问题",
        "<strong>评估基准</strong>：在 NaturalQuestions-Open (40.4)、WebQuestions (40.7)、CuratedTrec (46.8) 三个 Open-QA 数据集上取得 SOTA"
      ],
      "detail": "<h5>核心框架图</h5>\n<p><img alt=\"REALM 整体框架\" src=\"https://ar5iv.labs.arxiv.org/html/2002.08909/assets/x2.png\" />\n<em>图：REALM 整体框架。左侧为无监督预训练阶段，知识检索器与知识增强编码器联合训练；右侧为下游任务微调阶段，同样的架构用于 Open-QA。</em></p>\n<p><img alt=\"REALM 预训练示意\" src=\"https://ar5iv.labs.arxiv.org/html/2002.08909/assets/x1.png\" />\n<em>图：REALM 预训练过程示意。对于掩码输入 \"The [MASK] at the top of the pyramid\"，检索器从 Wikipedia 中检索相关文档，编码器利用检索到的文档预测被掩码的词。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># REALM 预训练伪代码\n# 初始化：用 ICT 预热 retriever，用 BERT 初始化 encoder\n# 知识语料库 Z: Wikipedia (13M 文档块, 每块 ≤288 wordpieces)\n\nfor step in range(200_000):\n    x = sample_masked_sentence(corpus_X)  # 显著跨度掩码\n\n    # === 检索阶段 ===\n    q = Embed_input(x)  # BERT_CLS + 线性投影\n    # 通过 MIPS 索引检索 top-k 文档 (k=8, 含 null doc)\n    top_k_docs = MIPS_search(q, index, k=8)\n\n    # === 计算检索概率 ===\n    for z in top_k_docs:\n        f(x, z) = Embed_input(x)^T · Embed_doc(z)  # 内积相关性\n    p_z_given_x = softmax([f(x, z) for z in top_k_docs])\n\n    # === 知识增强编码 ===\n    for z in top_k_docs:\n        input_seq = [CLS] x [SEP] z_title [SEP] z_body [SEP]\n        p_y_given_z_x = BERT_MLM(input_seq)  # 预测 [MASK] 位置\n\n    # === 边际化 ===\n    p_y_given_x = sum(p_z * p_y_z for p_z, p_y_z \n                       in zip(p_z_given_x, p_y_given_z_x))\n    loss = -log(p_y_given_x)\n\n    # === 反向传播 (更新 θ 和 φ) ===\n    loss.backward()  # 梯度同时流向 retriever 和 encoder\n    optimizer.step()\n\n    # === 异步刷新 MIPS 索引 (每数百步) ===\n    if step % refresh_interval == 0:\n        recompute_all_doc_embeddings()  # 16 TPUs 并行\n        rebuild_MIPS_index()\n</code></pre>\n<h5>动机与背景</h5>\n<p>语言模型预训练（如 BERT、GPT）的核心思想是通过大规模无监督训练将世界知识编码到模型参数中。然而，这种方式存在根本性局限：</p>\n<ol>\n<li><strong>存储瓶颈</strong>：所有知识必须压缩到固定数量的神经网络参数中，对于长尾知识和精确事实性知识（如\"某人的出生日期\"），模型参数的容量远远不够</li>\n<li><strong>不可解释性</strong>：知识以隐式方式分布在参数中，无法追溯模型的知识来源</li>\n<li><strong>更新困难</strong>：当世界知识发生变化时，需要重新训练整个模型</li>\n</ol>\n<p>REALM 的核心洞察是：<strong>与其将所有知识压缩到参数中，不如让模型学会在需要时从外部知识库中检索相关信息</strong>。这类似于人类在回答问题时查阅参考资料的过程。</p>\n<div class=\"key-point\">💡 关键：REALM 将\"知识存储\"与\"知识推理\"解耦——检索器负责从海量文档中定位相关知识，编码器负责基于检索到的知识进行推理。</div>\n<h5>核心机制详解</h5>\n<p><strong>1. 生成过程建模</strong></p>\n<p>REALM 将语言模型的预测过程分解为两步：</p>\n<p>$$p(y|x) = \\sum_{z \\in \\mathcal{Z}} p(y|z, x) \\cdot p(z|x)$$</p>\n<p>其中 \\(x\\) 是输入（预训练时为掩码句子，微调时为问题），\\(y\\) 是目标输出，\\(z\\) 是从知识语料库 \\(\\mathcal{Z}\\) 中检索的文档。这个公式的含义是：对于每个可能的文档 \\(z\\)，计算检索该文档的概率 \\(p(z|x)\\) 和基于该文档生成答案的概率 \\(p(y|z,x)\\)，然后对所有文档求和（边际化）。</p>\n<p>由于语料库包含数百万文档，精确求和不可行，因此实际计算中仅对 top-k 个最相关文档进行近似：</p>\n<p>$$p(y|x) \\approx \\sum_{z \\in \\text{top-}k} p(y|z, x) \\cdot p(z|x)$$</p>\n<p><strong>2. 知识检索器 (Knowledge Retriever)</strong></p>\n<p>检索器 \\(p(z|x)\\) 采用双塔架构，使用两个独立的 BERT 编码器分别处理输入和文档：</p>\n<p>$$\\text{Embed}_{\\text{input}}(x) = W_{\\text{input}} \\cdot \\text{BERT}_{\\text{CLS}}(\\text{join}(x))$$</p>\n<p>$$\\text{Embed}_{\\text{doc}}(z) = W_{\\text{doc}} \\cdot \\text{BERT}_{\\text{CLS}}(\\text{join}(z_{\\text{title}}, z_{\\text{body}}))$$</p>\n<p>相关性得分通过内积计算：</p>\n<p>$$f(x, z) = \\text{Embed}_{\\text{input}}(x)^{\\top} \\cdot \\text{Embed}_{\\text{doc}}(z)$$</p>\n<p>检索概率通过 softmax 归一化：</p>\n<p>$$p(z|x) = \\frac{\\exp f(x, z)}{\\sum_{z'} \\exp f(x, z')}$$</p>\n<div class=\"key-point\">💡 关键：双塔架构的优势在于文档嵌入可以预计算并建立 MIPS（最大内积搜索）索引，实现亚线性时间的 top-k 检索。这使得在数百万文档中搜索成为可能。</div>\n<p><strong>3. 知识增强编码器 (Knowledge-Augmented Encoder)</strong></p>\n<p>编码器将输入 \\(x\\) 和检索到的文档 \\(z\\) 拼接为一个序列，送入另一个 BERT 进行 cross-attention：</p>\n<p>$$\\text{input} = [\\text{CLS}] \\; x \\; [\\text{SEP}] \\; z_{\\text{title}} \\; [\\text{SEP}] \\; z_{\\text{body}} \\; [\\text{SEP}]$$</p>\n<ul>\n<li><strong>预训练阶段</strong>（MLM 任务）：对每个 \\([\\text{MASK}]\\) 位置预测原始 token，损失为标准 MLM loss</li>\n<li><strong>微调阶段</strong>（Open-QA）：在文档 token 的表示上预测答案的起止位置，类似于抽取式阅读理解</li>\n</ul>\n<p><strong>4. 异步 MIPS 索引刷新</strong></p>\n<p><img alt=\"异步 MIPS 刷新\" src=\"https://ar5iv.labs.arxiv.org/html/2002.08909/assets/x3.png\" />\n<em>图：REALM 预训练中的异步 MIPS 索引刷新机制。训练器 (Trainer) 持续更新参数，索引构建器 (Index Builder) 周期性地用最新参数重新编码所有文档并重建索引。</em></p>\n<p>训练过程中，检索器参数 \\(\\theta\\) 不断更新，但 MIPS 索引中的文档嵌入是基于旧参数计算的。REALM 采用异步刷新策略：</p>\n<ul>\n<li>每隔数百个训练步，使用最新的文档编码器参数重新编码所有 1300 万文档</li>\n<li>重建 MIPS 索引（在 16 个 TPU 上并行完成）</li>\n<li>在两次刷新之间，索引是\"过时的\"（stale），但实验表明适度的过时不会显著影响训练</li>\n</ul>\n<div class=\"warn-box\">⚠️ 注意：消融实验表明，如果将刷新间隔扩大 30 倍（即索引严重过时），性能从 38.2 骤降至 28.7（NQ dev EM），说明索引新鲜度对训练至关重要。</div>\n<p><strong>5. 归纳偏置：显著跨度掩码</strong></p>\n<p>标准 BERT 预训练使用随机掩码，但许多被掩码的 token（如停用词、常见词）不需要世界知识即可预测。REALM 提出<strong>显著跨度掩码 (Salient Span Masking)</strong>：</p>\n<ul>\n<li>首先使用 NER 标注器和正则表达式识别文本中的命名实体和日期</li>\n<li>优先选择这些\"显著跨度\"进行掩码</li>\n<li>这迫使检索器学习检索包含特定事实知识的文档</li>\n</ul>\n<p>消融实验证实了其有效性：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>掩码策略</th>\n<th>NQ Dev EM</th>\n<th>零样本检索 Recall@5</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>显著跨度掩码 (REALM)</td>\n<td>38.2</td>\n<td>38.5</td>\n</tr>\n<tr>\n<td>随机跨度掩码</td>\n<td>35.3</td>\n<td>26.1</td>\n</tr>\n<tr>\n<td>随机均匀掩码</td>\n<td>32.3</td>\n<td>24.2</td>\n</tr>\n</tbody>\n</table></div>\n<h5>与传统方法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th>传统 Retrieve-and-Read</th>\n<th>REALM</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>检索方式</td>\n<td>TF-IDF/BM25 等稀疏检索</td>\n<td>端到端学习的稠密检索</td>\n</tr>\n<tr>\n<td>预训练</td>\n<td>仅训练编码器 (BERT)</td>\n<td>联合预训练检索器 + 编码器</td>\n</tr>\n<tr>\n<td>知识更新</td>\n<td>需重新训练</td>\n<td>仅需更新知识库</td>\n</tr>\n<tr>\n<td>梯度传播</td>\n<td>检索器不可微</td>\n<td>梯度穿过检索器反向传播</td>\n</tr>\n</tbody>\n</table></div>\n<p>与最直接的对比对象 ORQA 相比，REALM 的关键改进在于：(1) 增加了语言模型预训练步骤（而非仅用 ICT 训练检索器）；(2) 训练过程中反向传播到 MIPS 索引（而非使用固定索引）。这两点改进使 NQ 上的 EM 从 33.3 提升至 40.4。</p>\n<h5>主要实验结果</h5>\n<p>REALM 在三个 Open-QA 基准上均取得 SOTA：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>模型</th>\n<th>参数量</th>\n<th>NQ</th>\n<th>WQ</th>\n<th>CT</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>DrQA</td>\n<td>34M</td>\n<td>-</td>\n<td>20.7</td>\n<td>25.7</td>\n</tr>\n<tr>\n<td>BERT-Baseline</td>\n<td>110M</td>\n<td>26.5</td>\n<td>17.7</td>\n<td>21.3</td>\n</tr>\n<tr>\n<td>ORQA</td>\n<td>330M</td>\n<td>33.3</td>\n<td>36.4</td>\n<td>30.1</td>\n</tr>\n<tr>\n<td>T5 (11B)</td>\n<td>11318M</td>\n<td>34.5</td>\n<td>37.4</td>\n<td>-</td>\n</tr>\n<tr>\n<td><strong>REALM</strong></td>\n<td><strong>330M</strong></td>\n<td><strong>40.4</strong></td>\n<td><strong>40.7</strong></td>\n<td><strong>46.8</strong></td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 关键：REALM 以仅 330M 参数（约 T5-11B 的 3%）在 NQ 和 WQ 上超越了 T5-11B，证明了\"检索 + 小模型\"范式相比\"纯参数记忆 + 大模型\"范式的效率优势。</div>",
      "quiz": {
        "q": "REALM 在预训练阶段使用显著跨度掩码 (Salient Span Masking) 的主要目的是什么？",
        "options": [
          "减少预训练的计算开销",
          "迫使模型学习检索包含世界知识的文档，而非仅依赖局部上下文",
          "提高 BERT 编码器的语法理解能力",
          "使 MIPS 索引的刷新频率降低"
        ],
        "answer": 1,
        "explain": "显著跨度掩码优先掩码命名实体和日期等需要世界知识才能预测的跨度，迫使检索器学习检索包含相关事实的文档，而随机掩码中大量 token 仅需局部上下文即可预测，无法有效训练检索器。"
      }
    },
    {
      "id": "rag",
      "num": 3,
      "name": "RAG",
      "fullName": "检索增强生成 (Retrieval-Augmented Generation)",
      "year": "2020.05",
      "org": "Meta AI",
      "parent": "dpr",
      "paperUrl": "https://arxiv.org/abs/2005.11401",
      "projectUrl": "",
      "category": "foundation",
      "motivation": "首个端到端RAG框架，结合DPR检索与BART生成",
      "summary": "RAG 将预训练的神经检索器（DPR）与预训练的 seq2seq 生成器（BART）相结合，通过将检索到的文档作为隐变量进行端到端联合训练，使语言模型能够动态访问外部知识库，在多个知识密集型任务上取得了当时的 SOTA 结果。",
      "keyPoints": [
        "<strong>参数化 + 非参数化记忆融合</strong>：将 BART 的参数化知识与 Wikipedia 向量索引的非参数化知识统一到一个概率框架中，兼具生成灵活性和知识精确性",
        "<strong>两种边际化策略</strong>：提出 RAG-Sequence（同一文档生成整个序列）和 RAG-Token（不同 token 可依赖不同文档）两种变体，适配不同任务需求",
        "<strong>端到端可微训练</strong>：检索器和生成器联合微调，无需检索监督信号，仅用问答对即可训练",
        "<strong>知识可热更新</strong>：替换文档索引即可更新模型知识，无需重新训练，解决了纯参数化模型知识过时的问题",
        "<strong>广泛任务验证</strong>：在开放域 QA（NQ 44.5 EM）、抽象 QA（MSMARCO）、问题生成（Jeopardy）和事实验证（FEVER 72.5%）四类任务上均超越基线"
      ],
      "detail": "<h5>核心图示</h5>\n<p><img alt=\"RAG Architecture\" src=\"https://ar5iv.labs.arxiv.org/html/2005.11401/assets/x1.png\" /></p>\n<p><strong>图 1</strong>：RAG 整体架构。输入 query $x$ 经 Query Encoder 编码后，通过 MIPS 从 Document Index 中检索 top-K 文档 $z_i$；Generator（BART）将输入 $x$ 与每个检索文档 $z_i$ 拼接后分别生成输出，最终对所有文档的生成概率进行边际化得到最终预测 $y$。</p>\n<h5>算法伪代码</h5>\n<pre><code>Algorithm: RAG Inference (RAG-Sequence)\n────────────────────────────────────────\nInput: query x, document index D, retriever p_η, generator p_θ, top-K\nOutput: generated sequence y\n\n1. q ← BERT_query(x)                          // 编码 query\n2. Z_topK ← MIPS(q, D, K)                     // 检索 top-K 文档\n3. for each z_i in Z_topK do\n4.     score_i ← q · d(z_i)                   // 检索相关性分数\n5.     p_η(z_i|x) ← softmax(score_i)          // 归一化为检索概率\n6. end for\n7. for each z_i in Z_topK do\n8.     Y_i ← BeamSearch(p_θ(·|x, z_i))        // 对每个文档独立 beam search\n9. end for\n10. Y ← ∪_i Y_i                               // 合并候选集\n11. for each y in Y do\n12.    p(y|x) ← Σ_i p_η(z_i|x) · p_θ(y|x,z_i)  // 边际化\n13. end for\n14. return argmax_y p(y|x)\n</code></pre>\n<pre><code>Algorithm: RAG Training\n────────────────────────────────────────\nInput: training pairs {(x_j, y_j)}, retriever p_η, generator p_θ\nOutput: updated parameters η (query encoder), θ (BART)\n\n1. for each (x, y) in training data do\n2.     q ← BERT_query(x)\n3.     Z_topK ← MIPS(q, D, K)                 // 文档编码器固定不更新\n4.     loss ← -log Σ_{z∈Z_topK} p_η(z|x) · Π_i p_θ(y_i|x,z,y_{1:i-1})\n5.     Update θ, η_query via backprop(loss)    // 仅更新 query encoder + BART\n6. end for\n// 注：document encoder 固定，避免频繁重建索引\n// MIPS 索引异步更新（实验发现不更新影响不大）\n</code></pre>\n<h5>方法详解</h5>\n<p><strong>1. 动机与问题</strong></p>\n<p>预训练语言模型（如 GPT-2、BART、T5）将知识隐式存储在参数中，存在三个核心问题：(1) 无法精确访问和修改特定知识；(2) 模型规模必须足够大才能记住足够多的知识；(3) 知识随时间过时后无法更新。传统的检索增强方法要么从头训练、要么仅用于抽取式任务。RAG 的核心动机是：<strong>能否为预训练的生成模型添加一个可学习的非参数化记忆模块，使其在保持生成灵活性的同时精确访问外部知识？</strong></p>\n<p><strong>2. 核心机制</strong></p>\n<p>RAG 将检索到的文档视为隐变量（latent variable），通过边际化将检索与生成统一到一个端到端的概率框架中：</p>\n<ul>\n<li>\n<p><strong>检索器</strong> $p_\\eta(z|x)$：基于 DPR，使用双塔 BERT 编码器。Query encoder $\\text{BERT}_q(x)$ 编码输入，Document encoder $\\text{BERT}_d(z)$ 编码文档（预计算并建立 FAISS 索引）。通过最大内积搜索（MIPS）高效检索 top-K 相关文档。</p>\n</li>\n<li>\n<p><strong>生成器</strong> $p_\\theta(y_i|x,z,y_{1:i-1})$：基于 BART-large。将输入 $x$ 与检索文档 $z$ 简单拼接作为编码器输入，解码器自回归生成输出。</p>\n</li>\n<li>\n<p><strong>两种边际化方式</strong>：</p>\n</li>\n<li><strong>RAG-Sequence</strong>：假设同一个文档负责生成整个输出序列，先对每个文档独立生成完整序列，再按文档概率加权求和。适合答案来自单一来源的任务。</li>\n<li><strong>RAG-Token</strong>：允许每个 token 依赖不同的文档，在每个生成步骤对所有文档的 token 概率加权求和。适合需要综合多文档信息的生成任务。</li>\n</ul>\n<p><strong>3. 训练与推理细节</strong></p>\n<ul>\n<li><strong>训练</strong>：联合最小化负对数似然。检索器和生成器通过梯度同时更新，但仅更新 query encoder 参数 $\\eta$（document encoder 固定以避免频繁重建索引）。使用 Adam 优化器，学习率 1e-5，batch size 128。检索 top-5 或 top-10 文档。</li>\n<li><strong>推理</strong>：RAG-Token 可直接用标准 beam search（每步对文档维度求和后取 top beam）。RAG-Sequence 需要特殊解码：对每个文档独立 beam search 生成候选集，合并后重新计算边际化概率排序（\"Thorough Decoding\"），或近似假设未在某文档 beam 中出现的序列概率为零（\"Fast Decoding\"）。</li>\n<li><strong>知识源</strong>：使用 2018 年 12 月的 Wikipedia dump，切分为 100 词的 chunk，共 21M 文档。使用 FAISS + HNSW 建立高效索引。</li>\n</ul>\n<p><strong>4. 与相关方法对比</strong></p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th>RAG</th>\n<th>REALM</th>\n<th>DPR+Reader</th>\n<th>T5/GPT (Closed-Book)</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>知识来源</td>\n<td>参数 + 检索</td>\n<td>参数 + 检索</td>\n<td>仅检索</td>\n<td>仅参数</td>\n</tr>\n<tr>\n<td>生成方式</td>\n<td>自由生成</td>\n<td>抽取式</td>\n<td>抽取式</td>\n<td>自由生成</td>\n</tr>\n<tr>\n<td>预训练需求</td>\n<td>无特殊预训练</td>\n<td>需 salient span masking</td>\n<td>需检索监督</td>\n<td>需超大模型</td>\n</tr>\n<tr>\n<td>知识更新</td>\n<td>✅ 替换索引</td>\n<td>✅ 替换索引</td>\n<td>✅ 替换索引</td>\n<td>❌ 需重训练</td>\n</tr>\n<tr>\n<td>NQ EM</td>\n<td><strong>44.5</strong></td>\n<td>40.4</td>\n<td>41.5</td>\n<td>36.6 (11B)</td>\n</tr>\n</tbody>\n</table></div>\n<h5>关键公式</h5>\n<p><strong>检索器概率（DPR）</strong>：</p>\n<p>$$p_\\eta(z|x) \\propto \\exp\\big(\\mathbf{d}(z)^\\top \\mathbf{q}(x)\\big)$$</p>\n<p>其中 $\\mathbf{d}(z) = \\text{BERT}_d(z)$，$\\mathbf{q}(x) = \\text{BERT}_q(x)$，分别为文档和查询的稠密向量表示。</p>\n<p><strong>RAG-Sequence 模型</strong>：</p>\n<p>$$p_{\\text{RAG-Seq}}(y|x) \\approx \\sum_{z \\in \\text{top-}K(p(\\cdot|x))} p_\\eta(z|x) \\prod_{i}^{N} p_\\theta(y_i|x, z, y_{1:i-1})$$</p>\n<p>对每个检索文档独立生成完整序列后，按检索概率加权求和。</p>\n<p><strong>RAG-Token 模型</strong>：</p>\n<p>$$p_{\\text{RAG-Tok}}(y|x) \\approx \\prod_{i}^{N} \\sum_{z \\in \\text{top-}K(p(\\cdot|x))} p_\\eta(z|x) \\, p_\\theta(y_i|x, z_i, y_{1:i-1})$$</p>\n<p>在每个 token 生成步独立对文档概率进行边际化，允许不同 token 关注不同文档。</p>\n<p><strong>训练目标</strong>：</p>\n<p>$$\\mathcal{L} = \\sum_j -\\log\\, p(y_j | x_j)$$</p>\n<p>使用 RAG-Sequence 或 RAG-Token 的边际化概率，通过随机梯度下降最小化负对数似然。</p>",
      "quiz": {
        "q": "",
        "options": [],
        "answer": 0,
        "explain": ""
      }
    },
    {
      "id": "colbert",
      "num": 4,
      "name": "ColBERT",
      "fullName": "上下文化后期交互 (Contextualized Late Interaction over BERT)",
      "year": "2020.04",
      "org": "Stanford",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2004.12832",
      "projectUrl": "",
      "category": "foundation",
      "motivation": "后期交互机制平衡重排序精度与速度",
      "summary": "ColBERT 提出**上下文化后期交互（Contextualized Late Interaction）**范式，将查询和文档独立编码为细粒度 token 级嵌入后，通过轻量级的 MaxSim 操作估计相关性，在保持与全交互 BERT 排序模型相当精度的同时实现 **170 倍以上的加速**，并支持端到端神经检索。",
      "keyPoints": [
        "<strong>后期交互范式</strong>：查询与文档由 BERT 独立编码，交互延迟到嵌入空间中的 MaxSim 运算，兼顾表达力与效率",
        "<strong>MaxSim 评分机制</strong>：对每个查询 token 取其与所有文档 token 的最大余弦相似度，再对所有查询 token 求和，实现细粒度软匹配",
        "<strong>查询增强（Query Augmentation）</strong>：用 <code>[MASK]</code> token 将查询填充至固定长度 \\(N_q=32\\)，BERT 对 <code>[MASK]</code> 的上下文化输出起到<strong>隐式查询扩展</strong>作用",
        "<strong>离线文档编码 + 在线查询编码</strong>：文档嵌入可预计算并存储，查询时仅需编码短查询后做矩阵运算",
        "<strong>端到端检索</strong>：结合 FAISS IVFPQ 索引，对每个查询 token 做 ANN 搜索后合并候选文档，再精确重排",
        "<strong>空间压缩</strong>：通过降维（128→24）和半精度存储（4B→2B/dim），可将 8.8M 文档的索引从 286 GiB 压缩至 27 GiB，MRR@10 仅下降约 1%",
        "<strong>MS MARCO 与 TREC CAR 双基准验证</strong>：重排序 MRR@10 达 34.9（与 BERT-base 的 34.7 持平），端到端检索 MRR@10 达 36.0"
      ],
      "detail": "<p><img alt=\"ColBERT 架构总览\" src=\"https://ar5iv.labs.arxiv.org/html/2004.12832/assets/x3.png\" />\n<em>图：ColBERT 的整体架构。查询和文档分别经过 BERT 编码与线性投影，生成 token 级嵌入后通过 MaxSim 交互计算相关性分数。</em></p>\n<p><img alt=\"查询-文档匹配范式对比\" src=\"https://ar5iv.labs.arxiv.org/html/2004.12832/assets/x2.png\" />\n<em>图：神经 IR 中四种查询-文档匹配范式对比。(a) 表示学习：独立编码+单向量点积；(b) 全交互：拼接输入 BERT 联合编码；(c) 后期交互（ColBERT）：独立编码+细粒度 token 级交互；(d) 效果-延迟权衡示意。</em></p>\n<pre><code class=\"language-python\"># ColBERT 核心算法伪代码\n\n# === 离线索引阶段 ===\ndef encode_document(d, bert, linear):\n    &quot;&quot;&quot;文档编码：BERT + 线性投影 + L2归一化 + 过滤标点&quot;&quot;&quot;\n    tokens = tokenize(&quot;[CLS] [D] &quot; + d)          # 添加特殊前缀 [D]\n    hidden = bert(tokens)                          # BERT 上下文化编码\n    embeddings = L2_normalize(linear(hidden))      # 线性投影到 m=128 维 + 归一化\n    return filter_punctuation(embeddings)           # 移除标点 token 的嵌入\n\n# === 在线查询阶段 ===\ndef encode_query(q, bert, linear, Nq=32):\n    &quot;&quot;&quot;查询编码：BERT + 线性投影 + L2归一化 + MASK填充&quot;&quot;&quot;\n    tokens = tokenize(&quot;[CLS] [Q] &quot; + q)\n    tokens = pad_with_MASK(tokens, target_length=Nq)  # [MASK] 填充至 Nq\n    hidden = bert(tokens)\n    return L2_normalize(linear(hidden))                # (Nq, m) 矩阵\n\n# === 评分：MaxSim ===\ndef score(Eq, Ed):\n    &quot;&quot;&quot;S(q,d) = Σ_i max_j (Eq_i · Ed_j^T)&quot;&quot;&quot;\n    sim_matrix = Eq @ Ed.T          # (Nq, Nd) 余弦相似度矩阵\n    max_sim = sim_matrix.max(dim=1)  # 每个查询 token 取最大值 → (Nq,)\n    return max_sim.sum()             # 求和得最终分数\n\n# === 端到端检索 ===\ndef retrieve(Eq, faiss_index, all_doc_embeddings, k=1000):\n    &quot;&quot;&quot;两阶段：ANN 候选过滤 + 精确重排&quot;&quot;&quot;\n    candidates = set()\n    for qi in Eq:                                    # 对每个查询 token\n        nn_ids = faiss_index.search(qi, k=k//2)     # ANN 搜索最近邻\n        candidates.update(get_doc_ids(nn_ids))       # 收集候选文档\n    # 精确重排\n    scores = {d: score(Eq, all_doc_embeddings[d]) for d in candidates}\n    return sorted(scores, key=scores.get, reverse=True)[:k]\n</code></pre>\n<p><strong>动机与背景：为什么需要后期交互？</strong></p>\n<p>在 ColBERT 之前，基于 BERT 的排序模型主要分为两类。第一类是<strong>表示学习（Representation-based）</strong>方法，如 DSSM，将查询和文档各自编码为单一向量后计算点积，虽然文档可以离线预编码从而实现高效检索，但单向量难以捕获细粒度的语义匹配信号，效果远不及 BERT 全交互模型。第二类是<strong>全交互（Full Interaction）</strong>方法，如直接将查询和文档拼接输入 BERT，让每个 token 通过自注意力与所有其他 token 交互，虽然效果优异，但每个 \\(\\langle q, d \\rangle\\) 对都需要独立执行一次完整的 BERT 前向传播，在重排序 1000 篇文档时需要约 10 秒，FLOPs 高达 97 万亿，完全无法满足实际部署的延迟要求。ColBERT 的核心洞察在于：<strong>查询和文档的深层语义编码可以独立完成，而细粒度的匹配信号可以通过编码后的轻量级交互来捕获</strong>。这就是\"后期交互\"的含义——交互发生在编码之后，而非编码过程中。</p>\n<p><strong>核心机制：编码器与 MaxSim 详解</strong></p>\n<p>ColBERT 的编码器基于预训练 BERT，查询和文档分别添加特殊标记 <code>[Q]</code> 和 <code>[D]</code> 作为前缀以区分角色。编码后的隐藏状态通过一个无偏置的线性层投影到低维空间（\\(m=128\\)），再进行 L2 归一化，使得内积等价于余弦相似度。查询侧的一个关键设计是<strong>查询增强</strong>：无论原始查询多短，都用 <code>[MASK]</code> token 填充至固定长度 \\(N_q=32\\)。由于 BERT 的自注意力机制，这些 <code>[MASK]</code> token 的输出嵌入会根据查询上下文被赋予有意义的语义表示，相当于让模型学习\"这个查询可能还需要匹配哪些隐含概念\"，起到<strong>软查询扩展</strong>的效果。消融实验证实，去掉查询增强后 MRR@10 从 34.4 下降到约 33.5（5 层 BERT 设置下），验证了其有效性。</p>\n<p>相关性评分通过 <strong>MaxSim</strong> 操作计算：</p>\n<p>$$S_{q,d} = \\sum_{i \\in [|E_q|]} \\max_{j \\in [|E_d|]} E_{q_i} \\cdot E_{d_j}^T$$</p>\n<p>直觉上，每个查询 token 在文档中寻找与自己最相似的 token（最大相似度），然后将所有查询 token 的最佳匹配分数求和。这种设计有三个优势：（1）保留了 token 级别的细粒度匹配，不像单向量方法那样丢失信息；（2）max 操作天然适合捕获\"查询中的某个概念是否在文档中出现\"的信号，比 average 更能反映精确匹配的重要性（消融实验中 AvgSim 比 MaxSim 低约 1.5 个 MRR 点）；（3）计算仅涉及矩阵乘法和 max-pooling，可以在 GPU 上高度并行化。</p>\n<p><strong>训练与推理流程</strong></p>\n<p>训练采用<strong>成对 softmax 交叉熵损失</strong>，每个训练样本为三元组 \\(\\langle q, d^+, d^- \\rangle\\)，正样本来自标注，负样本来自 BM25 检索的高排名非相关文档。损失函数为：</p>\n<p>$$\\mathcal{L} = -\\log \\frac{e^{S_{q,d^+}}}{e^{S_{q,d^+}} + e^{S_{q,d^-}}}$$</p>\n<p>使用 Adam 优化器，学习率 \\(3 \\times 10^{-6}\\)，batch size 32，训练 200k 步。查询最大长度 32 token，文档最大长度 180 token。</p>\n<div class=\"key-point\">💡 <strong>关键设计：离线索引的工程优化</strong>\nColBERT 的索引流程包含多项优化：（1）按文档长度分桶（BucketIterator），减少 padding 浪费；（2）批量编码后直接写入磁盘，避免内存瓶颈；（3）文档嵌入可用 16-bit 半精度存储，空间减半而 MRR@10 几乎无损（34.9→34.8）。在 MS MARCO 的 8.8M 文档上，完整索引约需 3 小时。</div>\n<p><strong>重排序模式</strong>下，预加载候选文档的嵌入到 GPU，对每个查询执行批量矩阵乘法后 max-pool 再 sum，单查询延迟仅 <strong>61ms</strong>（重排 1000 篇文档），相比 BERT-base 的 10,700ms 快 <strong>170 倍以上</strong>，而 MRR@10 从 34.7 提升至 34.9。</p>\n<p><strong>端到端检索模式</strong>下，使用 FAISS 的 IVFPQ 索引。对查询的每个 token 嵌入执行 ANN 搜索，收集 top-\\(k'\\) 最近邻对应的文档 ID，取并集得到候选集（通常远小于全集），再用精确 MaxSim 重排。此模式下 MRR@10 达到 <strong>36.0</strong>（优于重排序模式，因为召回更好），Recall@50 达 82.9，甚至超过 BM25 的 Recall@1000（81.2）。</p>\n<p><strong>与传统方法的关键区别</strong></p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th>全交互 (BERT cross-encoder)</th>\n<th>表示学习 (Bi-encoder)</th>\n<th>ColBERT (后期交互)</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>编码方式</td>\n<td>查询+文档拼接联合编码</td>\n<td>各自编码为单向量</td>\n<td>各自编码为 token 级嵌入矩阵</td>\n</tr>\n<tr>\n<td>交互粒度</td>\n<td>全 token 自注意力</td>\n<td>无（仅向量点积）</td>\n<td>token 级 MaxSim</td>\n</tr>\n<tr>\n<td>文档预编码</td>\n<td>❌ 不可能</td>\n<td>✅ 可以</td>\n<td>✅ 可以</td>\n</tr>\n<tr>\n<td>端到端检索</td>\n<td>❌ 不可能</td>\n<td>✅ ANN 检索</td>\n<td>✅ 多向量 ANN + 重排</td>\n</tr>\n<tr>\n<td>延迟 (top-1000)</td>\n<td>~10,700ms</td>\n<td>~几十ms</td>\n<td>~61ms (重排) / ~458ms (端到端)</td>\n</tr>\n<tr>\n<td>MRR@10 (MS MARCO)</td>\n<td>34.7</td>\n<td>~30</td>\n<td>34.9 (重排) / 36.0 (端到端)</td>\n</tr>\n</tbody>\n</table></div>\n<p>ColBERT 的核心贡献在于证明了<strong>\"编码可以独立，交互可以延迟\"</strong>这一设计原则的可行性：通过保留 token 级别的细粒度表示（而非压缩为单向量），后期的轻量级交互就足以恢复全交互模型的大部分匹配能力，同时享受独立编码带来的计算效率优势。</p>",
      "quiz": {
        "q": "ColBERT 中查询编码时使用 [MASK] token 填充的主要目的是什么？",
        "options": [
          "统一查询长度以便于 GPU 批处理",
          "利用 BERT 上下文化能力实现隐式查询扩展",
          "防止查询 token 数量超过文档 token 数量",
          "降低查询编码的计算复杂度"
        ],
        "answer": 1,
        "explain": "[MASK] token 经过 BERT 自注意力后会获得与查询上下文相关的语义表示，相当于为查询补充隐含的匹配需求，起到软查询扩展的作用。消融实验证实去掉查询增强后 MRR@10 显著下降。"
      }
    },
    {
      "id": "fid",
      "num": 5,
      "name": "FiD",
      "fullName": "解码器融合 (Fusion-in-Decoder)",
      "year": "2021.04",
      "org": "INRIA/Meta",
      "parent": "rag",
      "paperUrl": "https://arxiv.org/abs/2007.01282",
      "projectUrl": "",
      "category": "foundation",
      "motivation": "解码器端多文档独立编码与联合注意力融合",
      "summary": "FiD 的核心目标是：解码器端多文档独立编码与联合注意力融合。",
      "keyPoints": [
        "核心动机：解码器端多文档独立编码与联合注意力融合",
        "演化来源：继承或改进自 rag",
        "代表机构：INRIA/Meta"
      ],
      "detail": "<p>解码器端多文档独立编码与联合注意力融合</p>"
    },
    {
      "id": "contriever",
      "num": 6,
      "name": "Contriever",
      "fullName": "对比学习检索器 (Contrastive Retriever)",
      "year": "2021.12",
      "org": "Meta AI",
      "parent": "dpr",
      "paperUrl": "https://arxiv.org/abs/2112.09118",
      "projectUrl": "",
      "category": "foundation",
      "motivation": "无监督对比学习实现密集检索，消除标注依赖",
      "summary": "Contriever 提出了一种基于对比学习的无监督密集检索方法，通过独立随机裁剪（Independent Cropping）构建正样本对、MoCo 动量编码器扩展负样本规模，在无需任何标注数据的情况下训练 bi-encoder 检索器，在 BEIR 基准的 15 个数据集中有 11 个超越 BM25（Recall@100），并可作为预训练方法进一步微调以达到 SOTA 性能。",
      "keyPoints": [
        "<strong>架构</strong>：共享参数的 Bi-encoder，基于 BERT-base-uncased，使用 mean pooling 获取文档/查询表示，点积计算相似度",
        "<strong>正样本对构建</strong>：独立随机裁剪（Independent Cropping）——从同一文档中独立采样两个 token 子序列作为正对，优于 Inverse Cloze Task (ICT)",
        "<strong>数据增强</strong>：在裁剪基础上以 10% 概率随机删除 token，进一步增加多样性",
        "<strong>负样本扩展</strong>：采用 MoCo（Momentum Contrast）框架，通过动量编码器 + 队列机制将负样本数扩展至数万级别，避免超大 batch size",
        "<strong>训练数据</strong>：仅使用无标注的 Wikipedia 和 CCNet（各占一半 batch），完全无监督",
        "<strong>损失函数</strong>：InfoNCE 对比损失，带温度参数 \\(\\tau\\)",
        "<strong>无监督性能</strong>：BEIR 基准 11/15 数据集 Recall@100 超越 BM25；NQ 上 R@100=82.1（BM25 为 78.3）",
        "<strong>预训练+微调</strong>：在 MS MARCO 微调后，BEIR nDCG@10 达到 dense bi-encoder 最优；结合 cross-encoder 重排在 8/15 数据集上达到 SOTA",
        "<strong>多语言能力</strong>：基于 mBERT 训练的多语言版本在 Mr.TyDi 基准上实现强无监督性能，并展现跨语言检索能力（如阿拉伯语查询检索英语文档）"
      ],
      "detail": "<h5>核心框架图</h5>\n<p><img alt=\"Contriever 无监督检索性能对比\" src=\"https://ar5iv.labs.arxiv.org/html/2112.09118v1/assets/figures/beir_recall100_unsupervised.png\" /></p>\n<p><em>图：Contriever 无监督检索在 BEIR 基准上与 BM25、REALM、SimCSE 的 Recall@100 对比。Contriever 在 15 个数据集中 11 个超越 BM25。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># Contriever 对比学习训练流程\n# 初始化\nencoder_q = BERTBase()          # 查询编码器 (query encoder)\nencoder_k = copy(encoder_q)     # 键编码器 (key/momentum encoder)\nqueue = []                      # 负样本队列\nm = 0.999                       # 动量系数\ntau = 0.05                      # 温度参数\n\nfor batch in DataLoader(Wikipedia + CCNet):\n    for doc in batch:\n        # Step 1: 独立随机裁剪生成正样本对\n        span_q = random_crop(doc)           # 随机采样一段 token 子序列\n        span_k = random_crop(doc)           # 独立采样另一段（可重叠）\n\n        # Step 2: 数据增强 — 随机删除 token (p=0.1)\n        span_q = random_delete(span_q, p=0.1)\n        span_k = random_delete(span_k, p=0.1)\n\n        # Step 3: 编码\n        q = mean_pool(encoder_q(span_q))    # query 表示\n        k = mean_pool(encoder_k(span_k))    # key 表示 (no gradient)\n\n    # Step 4: InfoNCE 对比损失\n    # 正样本: (q_i, k_i), 负样本: queue 中所有 key\n    pos_score = dot(q, k) / tau\n    neg_scores = dot(q, queue) / tau\n    loss = -log(exp(pos_score) / (exp(pos_score) + sum(exp(neg_scores))))\n\n    # Step 5: 反向传播 (仅更新 encoder_q)\n    loss.backward()\n    optimizer.step()\n\n    # Step 6: 动量更新 encoder_k\n    encoder_k.params = m * encoder_k.params + (1 - m) * encoder_q.params\n\n    # Step 7: 更新队列\n    queue.enqueue(k)\n    queue.dequeue_oldest()\n</code></pre>\n<h5>方法详解</h5>\n<p><strong>动机与背景：密集检索的标注瓶颈。</strong> 传统稀疏检索方法（如 BM25）基于词频匹配，无需训练数据但受限于词汇鸿沟（lexical gap），无法捕捉语义相似性。近年来，基于神经网络的密集检索器（如 DPR）在有大规模标注数据（如 MS MARCO）时表现优异，但在零样本迁移到新领域时往往不如 BM25。这是因为密集检索器的表示能力高度依赖于训练数据的分布，而标注检索数据需要在百万级文档集合中人工匹配查询与相关文档，成本极高。Contriever 的核心问题是：<strong>能否完全不使用标注数据，仅通过无监督学习训练出匹配甚至超越 BM25 的密集检索器？</strong></p>\n<p><strong>核心机制一：独立随机裁剪构建正样本对。</strong> 对比学习的关键在于如何构建有意义的正样本对。此前的 Inverse Cloze Task (ICT) 从文档中抽取一个句子作为\"查询\"，剩余部分作为\"文档\"，但这种方式存在两个问题：(1) 查询和文档分布不对称——查询始终是单句，文档是多句上下文；(2) 查询与文档之间没有词汇重叠，模型无法学习精确匹配信号。Contriever 借鉴计算机视觉中 SimCLR/MoCo 的随机裁剪策略，提出<strong>独立随机裁剪</strong>（Independent Cropping）：从同一文档中独立采样两个连续 token 子序列作为正对。这种设计的优势在于：(1) 对称性——两个视图来自相同分布，消除了查询/文档的人为区分；(2) 自然产生词汇重叠——两个随机裁剪的片段可能共享部分 token，使模型同时学习精确匹配（类似 BM25）和语义匹配信号。实验证明，独立裁剪在所有评估基准上均优于 ICT。</p>\n<p><strong>核心机制二：MoCo 动量对比扩展负样本。</strong> 对比学习的效果与负样本数量密切相关。标准的 in-batch negatives 方法要求极大的 batch size（文献报告需 8192 个负样本才能充分发挥效果），这对 GPU 内存提出了苛刻要求。Contriever 采用 MoCo（Momentum Contrast）框架解决这一问题。MoCo 维护两个编码器：查询编码器 \\(\\theta_q\\) 通过梯度下降正常更新，键编码器 \\(\\theta_k\\) 通过指数移动平均（EMA）缓慢更新：</p>\n<p>$$\\theta_k \\leftarrow m \\cdot \\theta_k + (1 - m) \\cdot \\theta_q$$</p>\n<p>其中动量系数 \\(m = 0.999\\)。同时，MoCo 维护一个先进先出队列，存储前几个 batch 的键表示作为负样本。由于键编码器变化缓慢，队列中的旧表示仍然与当前模型近似一致，从而在不增加 batch size 的情况下将负样本数量扩展到数万级别。训练使用 InfoNCE 损失：</p>\n<p>$$\\mathcal{L} = -\\log \\frac{\\exp(q \\cdot k^+ / \\tau)}{\\exp(q \\cdot k^+ / \\tau) + \\sum_{k^- \\in \\text{queue}} \\exp(q \\cdot k^- / \\tau)}$$</p>\n<p>其中 \\(\\tau\\) 为温度参数，控制分布的锐度。</p>\n<p><strong>训练数据与流程。</strong> Contriever 的训练数据完全无标注，来自两个来源：英文 Wikipedia（2019 年 8 月版本）和 CCNet（Common Crawl 的清洗子集）。每个 batch 中一半样本来自 Wikipedia，一半来自 CCNet，这种混合策略使模型既能学习结构化百科知识，又能适应多样化的网页文本。编码器基于 BERT-base-uncased（110M 参数），使用 mean pooling（对所有 token 的隐藏状态取平均）而非 [CLS] token 作为序列表示。在裁剪的基础上，还以 10% 的概率随机删除 token 作为额外数据增强，增加正样本对之间的差异性，迫使模型学习更鲁棒的语义表示。</p>\n<p><strong>与传统方法的对比。</strong> 与 BM25 相比，Contriever 能够捕捉超越词汇匹配的语义相似性，在 BEIR 基准的 15 个数据集中有 11 个在 Recall@100 上超越 BM25，尤其在需要语义理解的任务（如 ArguAna、SCIDOCS）上优势明显。与有监督的 DPR 相比，Contriever 无需任何标注数据，且在域外泛化能力上更强——DPR 在 NQ 上训练后迁移到 BEIR 其他数据集时性能大幅下降，而 Contriever 的无监督表示具有更好的通用性。与 ICT 预训练方法（如 REALM）相比，Contriever 的独立裁剪策略和 MoCo 负采样机制带来了显著提升。此外，Contriever 还可以作为预训练方法：先无监督对比学习，再在 MS MARCO 上微调，这种两阶段策略在 BEIR 上取得了 dense bi-encoder 类别的最佳 nDCG@10 和 Recall@100（平均 67.1）。</p>\n<div class=\"key-point\">💡 <strong>关键洞察</strong>：独立随机裁剪之所以优于 ICT，核心在于它自然产生了词汇重叠，使模型同时学习精确匹配和语义匹配两种信号，而 ICT 的查询-上下文分离设计完全排除了精确匹配信号。</p>\n<p>⚠️ <strong>注意</strong>：Contriever 在某些高度专业化的领域（如 BioASQ、CQADupStack）上仍不如 BM25，说明纯无监督对比学习在领域术语密集的场景下仍有局限。</div>",
      "quiz": {
        "q": "Contriever 使用独立随机裁剪（Independent Cropping）而非 Inverse Cloze Task (ICT) 构建正样本对的主要优势是什么？",
        "options": [
          "裁剪生成的文本更短，计算效率更高",
          "裁剪产生的两个视图可能存在词汇重叠，使模型同时学习精确匹配和语义匹配信号",
          "裁剪不需要句子分割，实现更简单",
          "裁剪能保证正样本对之间完全没有重叠，增加学习难度"
        ],
        "answer": 1,
        "explain": "独立随机裁剪的两个片段可能共享部分 token，这使得模型在学习语义相似性的同时也能捕捉类似 BM25 的精确匹配信号，而 ICT 的查询-上下文分离设计完全排除了词汇重叠。"
      }
    },
    {
      "id": "retro",
      "num": 7,
      "name": "RETRO",
      "fullName": "基于检索的Transformer (Retrieval-Enhanced Transformer)",
      "year": "2022.02",
      "org": "DeepMind",
      "parent": "realm",
      "paperUrl": "https://arxiv.org/abs/2112.04426",
      "projectUrl": "",
      "category": "foundation",
      "motivation": "分块交叉注意力支持2万亿Token检索库",
      "summary": "RETRO 提出了一种半参数化的检索增强语言模型架构，通过冻结的 BERT 检索器从 2 万亿 Token 数据库中获取相关文本片段，并利用分块交叉注意力（Chunked Cross-Attention, CCA）将检索信息融入自回归生成过程，以 25 倍更少的参数量达到与 GPT-3 等超大模型相当的语言建模性能。",
      "keyPoints": [
        "<strong>半参数化架构</strong>：将语言模型分为参数化（Transformer）和非参数化（检索数据库）两部分，通过检索外部知识替代纯粹增加模型参数",
        "<strong>大规模检索数据库</strong>：基于 MassiveText 数据集构建包含 2 万亿 Token 的键值数据库，键为冻结 BERT 的句子嵌入，值为邻居文本块及其后续文本",
        "<strong>分块交叉注意力（CCA）</strong>：将输入序列分成固定长度的块（chunk），每个块独立检索 \\(k\\) 个最近邻，通过 CCA 层将检索信息融入中间层表示",
        "<strong>检索编码器（Encoder）</strong>：轻量级 2 层 Transformer（约 36M 参数），将检索到的邻居文本编码后供 CCA 使用，编码时融合当前块的因果上下文",
        "<strong>RETROfit 机制</strong>：可在已预训练的标准 Transformer 上冻结原有参数，仅训练新增的检索模块（CCA + Encoder），快速获得检索增强能力",
        "<strong>泄漏感知评估</strong>：使用 13-gram Jaccard 相似度检测训练集与测试集的重叠，按重叠比例分桶报告 bits-per-byte，确保评估公正",
        "<strong>模型规模</strong>：从 132M 到 7.5B 参数，检索增益在所有规模上均不衰减，等效约 10 倍参数量的纯参数模型"
      ],
      "detail": "<h5>核心架构图</h5>\n<p><img alt=\"RETRO 架构总览\" src=\"https://ar5iv.labs.arxiv.org/html/2112.04426/assets/x2.png\" />\n<em>图：RETRO 架构示意。左侧为标准 Transformer 解码器（ATTN + FFW），右侧展示了 CCA 层如何将检索编码器的输出融入解码器的中间表示。编码器接收检索到的邻居块 \\(\\text{RET}(C_u)\\) 并结合前一个块的中间激活 \\(H_u\\) 进行交叉注意力。</em></p>\n<p><img alt=\"RETRO 性能缩放\" src=\"https://ar5iv.labs.arxiv.org/html/2112.04426/assets/x1.png\" />\n<em>图：RETRO 在不同模型规模和数据库规模下的性能。检索增益在所有模型规模上保持一致，且随数据库规模增大而增大。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># RETRO 训练/推理核心流程伪代码\n# 输入: 序列 X = (x_1, ..., x_n), n=2048\n# 分块: l 个块, 每块 m=64 tokens → C = (C_1, ..., C_l), l=32\n\n# === 第一步: 检索 ===\nfor u in range(1, l+1):\n    if u == 1:\n        RET(C_1) = ∅  # 第一个块无检索(保持自回归性)\n    else:\n        # 用前一个块 C_{u-1} 的 frozen BERT 嵌入作为 query\n        query = BERT_frozen(C_{u-1})  # [d] 维向量\n        # 从数据库中用 SCaNN 近似最近邻搜索 k 个邻居\n        RET(C_u) = top_k_neighbours(query, DB, k=2)\n        # 每个邻居 = [N_j (邻居块, m tokens), F_j (后续块, m tokens)]\n\n# === 第二步: 编码检索结果 ===\nfor u in range(2, l+1):\n    for j in range(1, k+1):\n        # 拼接邻居块和后续块\n        neighbour_j = concat(N_j, F_j)  # [2m] tokens\n        # 编码器: 2层Transformer, 融合当前块的因果上下文\n        E_u_j = ENCODER(neighbour_j, ca_context=H_u)  # H_u 来自解码器中间层\n\n# === 第三步: 解码器前向传播 ===\nfor layer_idx in range(num_layers):\n    H = ATTN(H)           # 因果自注意力 (所有层)\n    if layer_idx in CCA_layers:  # 从第6层开始, 每3层一次\n        H = CCA(H, E)     # 分块交叉注意力: Q=H_u, KV=E_u\n    H = FFW(H)            # 前馈网络\n\n# 输出: 下一个 token 的概率分布\nlogits = output_head(H)\nloss = cross_entropy(logits, X_shifted)\n</code></pre>\n<h5>方法详解</h5>\n<p><strong>动机与背景</strong></p>\n<p>传统语言模型通过增加参数量来存储更多世界知识，但这导致训练和推理成本急剧增长。GPT-3（175B 参数）和 Jurassic-1（178B 参数）虽然性能强大，但资源消耗巨大。RETRO 的核心洞察是：<strong>语言模型不需要将所有知识压缩到参数中，可以通过检索外部数据库来\"按需查阅\"知识</strong>。这种半参数化方法使得 7.5B 参数的 RETRO 在多个基准上达到与 175B 参数模型相当的性能。</p>\n<div class=\"key-point\">💡 关键：RETRO 的检索增益等效于约 10 倍的参数量提升——即 RETRO 7.5B ≈ 纯参数模型 ~75B 的性能。</div>\n<p><strong>核心机制一：分块检索（Chunked Retrieval）</strong></p>\n<p>输入序列 \\(X = (x_1, \\ldots, x_n)\\) 被分成 \\(l\\) 个不重叠的块，每块 \\(m\\) 个 token：</p>\n<p>$$C_u = (x_{(u-1)m+1}, \\ldots, x_{um}), \\quad u \\in \\{1, \\ldots, l\\}$$</p>\n<p>其中 \\(n = 2048\\)，\\(m = 64\\)，因此 \\(l = 32\\)。对于每个块 \\(C_u\\)（\\(u \\geq 2\\)），使用<strong>前一个块</strong> \\(C_{u-1}\\) 的冻结 BERT 嵌入作为查询，从数据库中检索 \\(k\\) 个最近邻：</p>\n<p>$$\\text{RET}(C_u) = \\{[N_1, F_1], \\ldots, [N_k, F_k]\\}$$</p>\n<p>其中 \\(N_j\\) 是邻居块（\\(m\\) 个 token），\\(F_j\\) 是其后续块（\\(m\\) 个 token）。使用前一个块而非当前块作为查询，是为了<strong>严格保持自回归性</strong>——避免在生成当前块时\"偷看\"自身内容。</p>\n<div class=\"warn-box\">⚠️ 注意：第一个块 \\(C_1\\) 没有检索结果（\\(\\text{RET}(C_1) = \\emptyset\\)），因为没有前驱块可用作查询。</div>\n<p><strong>核心机制二：检索数据库（Key-Value Database）</strong></p>\n<p>数据库以键值对形式存储：\n- <strong>键（Key）</strong>：每个文本块经冻结 BERT 编码后的 \\(d\\) 维嵌入向量（取 \\([\\text{CLS}]\\) token 的最后一层隐藏状态的平均）\n- <strong>值（Value）</strong>：对应的文本块 \\(N\\) 及其后续块 \\(F\\)</p>\n<p>检索使用 L2 距离度量，通过 Google 的 SCaNN 库进行近似最近邻搜索。训练时使用约 6000 亿 Token 的数据库，评估时扩展至 1.75 万亿 Token。</p>\n<div class=\"key-point\">💡 关键：包含后续块 \\(F\\) 是因为邻居块 \\(N\\) 与查询块 \\(C_{u-1}\\) 对齐，而 \\(F\\) 才与当前待预测块 \\(C_u\\) 的内容最相关。</div>\n<p><strong>核心机制三：分块交叉注意力（Chunked Cross-Attention, CCA）</strong></p>\n<p>CCA 是 RETRO 的核心创新。在标准 Transformer 层中，每一层的计算为：</p>\n<p>$$\\text{LM}(H) = \\text{FFW}(\\text{ATTN}(H))$$</p>\n<p>RETRO 在部分层中插入 CCA，变为：</p>\n<p>$$\\text{RETRO}(H, E) = \\text{FFW}(\\text{CCA}(\\text{ATTN}(H), E))$$</p>\n<p>CCA 的具体计算过程如下。对于第 \\(u\\) 个块，设解码器中间激活为 \\(H_u \\in \\mathbb{R}^{m \\times d}\\)，检索编码结果为 \\(E_u \\in \\mathbb{R}^{k \\times 2m \\times d}\\)：</p>\n<p>$$\\text{CCA}(H_u, E_u) = \\text{softmax}\\!\\left(\\frac{Q_u K_u^\\top}{\\sqrt{d_k}}\\right) V_u + H_u$$</p>\n<p>其中：\n- \\(Q_u = H_u W_Q \\in \\mathbb{R}^{m \\times d_k}\\)（查询来自解码器）\n- \\(K_u = E_u W_K \\in \\mathbb{R}^{(k \\cdot 2m) \\times d_k}\\)（键来自编码器输出）\n- \\(V_u = E_u W_V \\in \\mathbb{R}^{(k \\cdot 2m) \\times d_v}\\)（值来自编码器输出）</p>\n<p>CCA 层从第 6 层开始，每隔 3 层插入一次（即第 6、9、12... 层），这样低层保持纯语言建模能力，高层逐步融合检索信息。</p>\n<p><strong>核心机制四：检索编码器（Retrieval Encoder）</strong></p>\n<p>编码器是一个轻量级的 2 层双向 Transformer（约 36M 参数）。它接收拼接后的邻居文本 \\([N_j; F_j]\\)（共 \\(2m = 128\\) 个 token），并在第二层通过交叉注意力融合来自解码器的上下文信息：</p>\n<p>$$E_u^{(1)} = \\text{BiAttn}(\\text{Embed}([N_j; F_j]))$$</p>\n<p>$$E_u^{(2)} = \\text{BiAttn}(E_u^{(1)}) + \\text{CA}(E_u^{(1)}, H_u^+)$$</p>\n<p>其中 \\(H_u^+\\) 是解码器在 CCA 插入点之前、第 \\(u\\) 个块的最后一个 token 的中间激活（仅用最后一个 token 以保持因果性）。</p>\n<p><strong>RETROfit：改造预训练模型</strong></p>\n<p>RETRO 支持在已预训练的标准 Transformer 上进行改造：冻结原有的 ATTN 和 FFW 参数，仅训练新增的 CCA 层和编码器参数。实验表明，仅需 3% 的预训练序列数即可恢复大部分检索增益。</p>\n<p><strong>与传统方法的区别</strong></p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>kNN-LM</th>\n<th>REALM/RAG</th>\n<th>DPR</th>\n<th><strong>RETRO</strong></th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>检索粒度</td>\n<td>Token 级</td>\n<td>文档级</td>\n<td>段落级</td>\n<td><strong>块级 (64 tokens)</strong></td>\n</tr>\n<tr>\n<td>检索器训练</td>\n<td>冻结</td>\n<td>端到端</td>\n<td>端到端</td>\n<td><strong>冻结 BERT</strong></td>\n</tr>\n<tr>\n<td>融合方式</td>\n<td>插值概率</td>\n<td>拼接输入</td>\n<td>拼接输入</td>\n<td><strong>分块交叉注意力</strong></td>\n</tr>\n<tr>\n<td>数据库规模</td>\n<td>~百亿 Token</td>\n<td>~百亿 Token</td>\n<td>~百亿 Token</td>\n<td><strong>万亿 Token</strong></td>\n</tr>\n<tr>\n<td>模型规模</td>\n<td>&lt;1B</td>\n<td>&lt;1B</td>\n<td>&lt;1B</td>\n<td><strong>最大 7.5B</strong></td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 关键：RETRO 的冻结检索器 + CCA 设计使得数据库可以独立于模型更新，且支持万亿级规模的高效检索。</div>\n<h5>关键公式汇总</h5>\n<p><strong>1. 分块定义：</strong></p>\n<p>$$C_u = (x_{(u-1)m+1}, \\ldots, x_{um}), \\quad n = l \\cdot m$$</p>\n<p><strong>2. 检索距离（L2）：</strong></p>\n<p>$$d(C_{u-1}, N) = \\|\\text{BERT}(C_{u-1}) - \\text{BERT}(N)\\|_2$$</p>\n<p><strong>3. CCA 注意力计算：</strong></p>\n<p>$$\\text{CCA}(H_u, E_u) = \\text{softmax}\\!\\left(\\frac{(H_u W_Q)(E_u W_K)^\\top}{\\sqrt{d_k}}\\right)(E_u W_V) + H_u$$</p>\n<p><strong>4. RETRO 层公式：</strong></p>\n<p>$$\\text{RETRO}(H, E) = \\text{FFW}\\bigl(\\text{CCA}(\\text{ATTN}(H),\\; E)\\bigr)$$</p>\n<p><strong>5. 标准 LM 层公式（对比）：</strong></p>\n<p>$$\\text{LM}(H) = \\text{FFW}\\bigl(\\text{ATTN}(H)\\bigr)$$</p>\n<p><strong>6. 泄漏感知评估（按重叠比例 \\(\\alpha\\) 过滤）：</strong></p>\n<p>$$\\text{bpb}_{\\text{filtered}}(\\alpha) = \\frac{\\sum_{c:\\, \\text{overlap}(c) \\leq \\alpha} \\text{bits}(c)}{\\sum_{c:\\, \\text{overlap}(c) \\leq \\alpha} \\text{bytes}(c)}$$</p>",
      "quiz": {
        "q": "RETRO 在检索时使用前一个块 C_{u-1} 而非当前块 C_u 作为查询的主要原因是什么？",
        "options": [
          "前一个块的语义信息更丰富，检索效果更好",
          "为了严格保持自回归性，避免在生成当前块时利用当前块自身的信息",
          "为了减少计算量，前一个块已经编码完成可以直接复用",
          "为了与 BERT 检索器的预训练目标保持一致"
        ],
        "answer": 1,
        "explain": "在自回归生成中，当前块 C_u 的 token 尚未完全生成，不能用于检索。使用已完成的前一个块 C_{u-1} 作为查询，确保检索过程不违反因果约束。"
      }
    },
    {
      "id": "atlas",
      "num": 8,
      "name": "Atlas",
      "fullName": "Atlas少样本学习模型",
      "year": "2022.08",
      "org": "Meta AI",
      "parent": "fid",
      "paperUrl": "https://arxiv.org/abs/2208.03299",
      "projectUrl": "",
      "category": "foundation",
      "motivation": "检索器与阅读器联合预训练，少样本专家",
      "summary": "Atlas 提出了一种将稠密检索器（Contriever）与 Seq2Seq 语言模型（T5/FiD）进行端到端联合预训练的检索增强框架，通过四种检索器训练信号（ADist、EMDR²、PDist、LOOP）和多种无监督预训练任务实现了极强的少样本学习能力——仅 11B 参数、64 个示例即可在 NaturalQuestions 上达到 42.4% 准确率，超越 540B 参数的 PaLM。",
      "keyPoints": [
        "<strong>架构</strong>：检索器采用 Contriever（双编码器），语言模型采用 Fusion-in-Decoder (FiD)，二者端到端联合训练",
        "<strong>四种检索器训练目标</strong>：Attention Distillation (ADist)、EMDR²、Perplexity Distillation (PDist)、Leave-One-Out Perplexity Distillation (LOOP)，均利用语言模型的反馈信号训练检索器",
        "<strong>四种无监督预训练任务</strong>：Prefix Language Modeling、Masked Language Modeling、Title-to-Section Generation、Salient Span Masking，其中 Prefix LM 表现最优",
        "<strong>索引更新机制</strong>：定期异步重建文档索引（每 ~2500 步），并使用 query-side fine-tuning 技术在微调时仅更新查询编码器",
        "<strong>少样本 SOTA</strong>：64-shot NaturalQuestions 42.4%（超 PaLM 540B 3%）、64-shot TriviaQA 74.4%、15-shot FEVER 56.2%（超 Gopher 5.1%）",
        "<strong>全量训练 SOTA</strong>：NaturalQuestions 60.4%、TriviaQA 84.7%、MMLU 5-shot 多任务 56.4%",
        "<strong>可更新性</strong>：通过替换文档索引即可更新模型知识，无需重新训练；时序匹配索引可额外提升 +3.6%",
        "<strong>索引压缩</strong>：使用乘积量化（Product Quantization）可将索引压缩 5 倍，性能几乎无损"
      ],
      "detail": "<p><img alt=\"Atlas 架构总览\" src=\"https://ar5iv.labs.arxiv.org/html/2208.03299/assets/x1.png\" />\n<em>图 1：Atlas 整体架构。左侧为检索器（Contriever 双编码器），从文档索引中检索 top-k 文档；右侧为 Fusion-in-Decoder 语言模型，将检索到的文档与查询拼接后独立编码，在解码器中通过交叉注意力融合所有文档信息生成答案。</em></p>\n<pre><code class=\"language-python\"># Atlas 训练流程伪代码\ndef atlas_train_step(query, answer, retriever, lm, index):\n    # 1. 检索 top-k 文档\n    docs = retriever.retrieve(query, index, top_k=K)  # K=20\n\n    # 2. 语言模型前向传播（FiD: 每个文档独立编码，解码器融合）\n    for d_k in docs:\n        enc_k = lm.encoder(concat(query, d_k))  # 独立编码\n    lm_logits = lm.decoder(cross_attend_all(enc_1, ..., enc_K))\n    lm_loss = cross_entropy(lm_logits, answer)\n\n    # 3. 计算检索器训练信号（以 PDist 为例）\n    for d_k in docs:\n        p_lm_k = lm.log_prob(answer | d_k, query)  # 每个文档的 LM 困惑度\n    target_dist = softmax([p_lm_1, ..., p_lm_K])    # LM 后验分布\n    retriever_dist = softmax([sim(q, d_1), ..., sim(q, d_K)])\n    retriever_loss = KL(target_dist || retriever_dist)\n\n    # 4. 联合更新\n    total_loss = lm_loss + retriever_loss\n    optimizer.step(total_loss)\n\n    # 5. 定期异步重建索引（每 ~2500 步）\n    if step % 2500 == 0:\n        index.rebuild(retriever.doc_encoder)\n</code></pre>\n<h5>动机与背景</h5>\n<p>大语言模型（LLM）通过增大参数量来隐式存储世界知识，但这种方式存在三个根本问题：(1) <strong>参数效率低</strong>——需要数百亿甚至上万亿参数才能记住足够知识；(2) <strong>知识不可更新</strong>——模型训练后知识即固化，无法跟随世界变化；(3) <strong>不可解释</strong>——无法追溯模型回答的知识来源。</p>\n<p>检索增强生成（RAG）通过外挂文档索引解决了上述问题，但此前的 RAG 方法（如 REALM、RAG、RETRO）存在一个关键缺陷：<strong>检索器与语言模型未能充分联合训练</strong>，尤其在预训练阶段。Atlas 的核心假设是：如果在大规模无监督预训练阶段就让检索器和语言模型学会协作，模型将获得更强的少样本泛化能力。</p>\n<h5>核心机制：四种检索器训练目标</h5>\n<p>Atlas 的关键创新在于设计了四种利用语言模型反馈来训练检索器的目标函数，使检索器学会检索\"对语言模型最有帮助的文档\"，而非仅仅是\"语义最相似的文档\"：</p>\n<p><strong>1. Attention Distillation (ADist)</strong>：利用 FiD 解码器对各文档编码的交叉注意力分数作为监督信号。直觉是：语言模型在生成答案时\"更关注\"哪个文档，说明该文档更有用。</p>\n<p>$$p_{\\text{ADist}}(d_k) = \\frac{\\text{CrossAttnScore}(d_k)}{\\sum_{i=1}^{K} \\text{CrossAttnScore}(d_i)}$$</p>\n<div class=\"key-point\">💡 <strong>关键</strong>：ADist 的优势在于它直接反映了语言模型\"实际使用\"文档的方式（通过注意力权重），而非间接的困惑度信号。</div>\n<p><strong>2. EMDR²（Expectation-Maximization with Document Retrieval）</strong>：将文档视为隐变量，使用 EM 算法训练。E 步计算文档后验分布，M 步最大化边际似然的下界：</p>\n<p>$$p(a|q) = \\sum_{d \\in \\mathcal{D}} p_\\theta(d|q) \\cdot p_\\phi(a|d,q)$$</p>\n<p>检索器梯度通过 REINFORCE 估计器计算，以 top-k 文档的语言模型概率作为奖励信号。</p>\n<p><strong>3. Perplexity Distillation (PDist)</strong>：最简洁的方法——直接用每个文档带来的语言模型困惑度改善作为检索器的训练目标。将 LM 后验分布蒸馏到检索器分布：</p>\n<p>$$p_{\\text{PDist}}(d_k) = \\frac{\\exp(\\log p_{LM}(a|d_k, q))}{\\sum_{i=1}^{K} \\exp(\\log p_{LM}(a|d_i, q))}$$</p>\n<p>然后最小化 \\(\\text{KL}(p_{\\text{PDist}} \\| p_{\\text{retriever}})\\)。PDist 在消融实验中表现最优（64-shot NQ 45.0%），因为它提供了最直接的\"文档有用性\"信号。</p>\n<p><strong>4. Leave-One-Out Perplexity Distillation (LOOP)</strong>：衡量移除某个文档后语言模型性能下降多少。如果移除文档 \\(d_k\\) 后困惑度显著上升，说明该文档至关重要：</p>\n<p>$$p_{\\text{LOOP}}(d_k) = \\frac{\\exp(-\\log p_{LM}(a|\\mathcal{D}_K \\setminus \\{d_k\\}, q))}{\\sum_{i=1}^{K} \\exp(-\\log p_{LM}(a|\\mathcal{D}_K \\setminus \\{d_i\\}, q))}$$</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：LOOP 计算成本最高（需要 K 次前向传播），但更忠实地反映了 FiD 的实际推理方式（同时使用多个文档），而 PDist/EMDR² 只单独评估每个文档。</div>\n<h5>预训练任务设计</h5>\n<p>Atlas 在无监督语料（Wikipedia + CCNet，共 ~387M 段落）上进行联合预训练，探索了四种预训练任务：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th style=\"text-align: left;\">预训练任务</th>\n<th style=\"text-align: left;\">输入</th>\n<th style=\"text-align: left;\">输出</th>\n<th style=\"text-align: center;\">64-shot NQ</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td style=\"text-align: left;\"><strong>Prefix LM</strong></td>\n<td style=\"text-align: left;\">文本前半段</td>\n<td style=\"text-align: left;\">文本后半段</td>\n<td style=\"text-align: center;\">42.4%</td>\n</tr>\n<tr>\n<td style=\"text-align: left;\"><strong>Masked LM</strong></td>\n<td style=\"text-align: left;\">带 mask 的文本</td>\n<td style=\"text-align: left;\">被 mask 的 span</td>\n<td style=\"text-align: center;\">42.7%</td>\n</tr>\n<tr>\n<td style=\"text-align: left;\"><strong>Title-to-Section</strong></td>\n<td style=\"text-align: left;\">Wikipedia 标题</td>\n<td style=\"text-align: left;\">对应章节内容</td>\n<td style=\"text-align: center;\">41.1%</td>\n</tr>\n<tr>\n<td style=\"text-align: left;\"><strong>Salient Span Masking</strong></td>\n<td style=\"text-align: left;\">带 mask 的文本（mask 实体）</td>\n<td style=\"text-align: left;\">被 mask 的实体</td>\n<td style=\"text-align: center;\">—</td>\n</tr>\n</tbody>\n</table></div>\n<p>实验发现 Prefix LM 和 Masked LM 效果相当，均优于 Title-to-Section。关键发现是：<strong>联合预训练至关重要</strong>——不进行联合预训练的模型在 64-shot NQ 上仅 9.0%，而联合预训练后达到 42.4%（提升 33.4%）。</p>\n<h5>索引更新与可更新性</h5>\n<p>Atlas 的一个重要特性是<strong>知识可更新性</strong>。由于知识存储在外部文档索引中而非模型参数中，只需替换索引即可更新模型知识：</p>\n<ul>\n<li>使用时序匹配的 Wikipedia 索引（与 NQ 数据集同期的 2018 年 Wikipedia）可将 NQ 准确率从 60.4% 提升至 64.0%（+3.6%）</li>\n<li>索引使用乘积量化（Product Quantization）压缩 5 倍后，性能几乎无损</li>\n</ul>\n<h5>与传统方法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th style=\"text-align: left;\">特性</th>\n<th style=\"text-align: center;\">Atlas</th>\n<th style=\"text-align: center;\">REALM</th>\n<th style=\"text-align: center;\">RAG</th>\n<th style=\"text-align: center;\">RETRO</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td style=\"text-align: left;\">联合预训练</td>\n<td style=\"text-align: center;\">✅</td>\n<td style=\"text-align: center;\">✅</td>\n<td style=\"text-align: center;\">❌</td>\n<td style=\"text-align: center;\">部分</td>\n</tr>\n<tr>\n<td style=\"text-align: left;\">检索器端到端训练</td>\n<td style=\"text-align: center;\">✅</td>\n<td style=\"text-align: center;\">✅</td>\n<td style=\"text-align: center;\">✅</td>\n<td style=\"text-align: center;\">❌（冻结）</td>\n</tr>\n<tr>\n<td style=\"text-align: left;\">多文档融合</td>\n<td style=\"text-align: center;\">FiD（多文档）</td>\n<td style=\"text-align: center;\">单文档</td>\n<td style=\"text-align: center;\">单文档边际化</td>\n<td style=\"text-align: center;\">分块交叉注意力</td>\n</tr>\n<tr>\n<td style=\"text-align: left;\">索引动态更新</td>\n<td style=\"text-align: center;\">✅（异步重建）</td>\n<td style=\"text-align: center;\">✅</td>\n<td style=\"text-align: center;\">✅</td>\n<td style=\"text-align: center;\">❌</td>\n</tr>\n<tr>\n<td style=\"text-align: left;\">少样本能力</td>\n<td style=\"text-align: center;\">极强</td>\n<td style=\"text-align: center;\">一般</td>\n<td style=\"text-align: center;\">一般</td>\n<td style=\"text-align: center;\">未评估</td>\n</tr>\n</tbody>\n</table></div>\n<p>Atlas 的核心优势在于：(1) 使用 FiD 架构同时融合多个文档，信息利用更充分；(2) 四种检索器训练信号均来自语言模型反馈，形成闭环优化；(3) 大规模联合预训练赋予了极强的少样本泛化能力。</p>\n<p><img alt=\"Atlas 少样本学习性能\" src=\"https://ar5iv.labs.arxiv.org/html/2208.03299/assets/x2.png\" />\n<em>图 2：Atlas 在 NaturalQuestions 和 TriviaQA 上的少样本学习曲线。Atlas-11B 在仅使用 64 个示例时即超越了 PaLM-540B 等超大模型。</em></p>",
      "quiz": {
        "q": "Atlas 中 Perplexity Distillation (PDist) 训练检索器的核心思想是什么？",
        "options": [
          "利用 FiD 解码器的交叉注意力权重作为文档重要性信号",
          "将每个文档带来的语言模型困惑度改善蒸馏为检索器的训练目标",
          "通过移除单个文档观察语言模型性能下降来衡量文档重要性",
          "使用 EM 算法将文档视为隐变量进行边际似然最大化"
        ],
        "answer": 1,
        "explain": "PDist 直接计算每个文档条件下语言模型生成答案的对数概率，将该 LM 后验分布蒸馏到检索器分布中。选项 0 是 ADist，选项 2 是 LOOP，选项 3 是 EMDR²。"
      }
    },
    {
      "id": "e5",
      "num": 9,
      "name": "E5",
      "fullName": "E5文本嵌入 (Text Embeddings by Weakly-supervised Contrastive Pre-training)",
      "year": "2022.12",
      "org": "Microsoft",
      "parent": "contriever",
      "paperUrl": "https://arxiv.org/abs/2212.03533",
      "projectUrl": "",
      "category": "foundation",
      "motivation": "弱监督大规模预训练提升嵌入质量",
      "summary": "E5 提出从异构网络数据源中大规模采集文本对（CCPairs），通过一致性过滤筛选高质量弱监督信号，结合对比预训练与有监督微调两阶段训练，以 300M 参数量在 BEIR 和 MTEB 基准上超越参数量大 16 倍的模型，成为首个无监督即超越 BM25 的稠密检索模型。",
      "keyPoints": [
        "<strong>CCPairs 大规模弱监督数据集</strong>：从 Reddit、StackExchange、Wikipedia、学术论文、Common Crawl 五大来源采集 1.3B 文本对，经一致性过滤保留 270M 高质量对",
        "<strong>一致性过滤（Consistency-based Filtering）</strong>：使用两个独立嵌入模型对文本对打分，仅保留双模型一致认为高质量的样本，有效去噪",
        "<strong>两阶段训练</strong>：Stage 1 对比预训练（CCPairs + InfoNCE + in-batch negatives）→ Stage 2 有监督微调（MS-MARCO + NQ + NLI + 知识蒸馏）",
        "<strong>超大 batch size（32K）</strong>：利用 128 GPU 实现 32K batch，提供充足 in-batch negatives，相比 1K batch 提升约 9 个点",
        "<strong>\"query:\"/\"passage:\" 前缀机制</strong>：区分查询与文档的语义角色，适配非对称检索场景",
        "<strong>BEIR 无监督 SOTA</strong>：E5-PT_large 以 44.2 nDCG@10 首次超越 BM25（41.7），证明弱监督预训练的价值",
        "<strong>MTEB 全面领先</strong>：E5_large（300M）以 61.3 分超越 GTR_xxl（4.8B, 59.0）和 ST5_xxl（4.8B, 59.5），参数效率极高"
      ],
      "detail": "<h5>核心框架</h5>\n<p>E5 的核心思想可概括为：<strong>数据为王 + 简单框架</strong>。与依赖复杂架构创新的方法不同，E5 将重心放在大规模高质量训练数据的构建上，配合标准的双塔对比学习框架即可取得 SOTA 性能。</p>\n<p>整体流程分为三个阶段：\n1. <strong>数据采集与过滤</strong>：从五大异构来源采集文本对 → 一致性过滤\n2. <strong>对比预训练</strong>：在 CCPairs 上用 InfoNCE 损失进行大规模预训练\n3. <strong>有监督微调</strong>：在标注数据上用硬负例 + 知识蒸馏进一步优化</p>\n<h5>CCPairs 数据集构建</h5>\n<p>E5 的核心创新在于 CCPairs（Colossal Clean text Pairs）数据集的构建。数据来源及构造方式如下：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>来源</th>\n<th>文本对构造方式</th>\n<th>原始规模</th>\n<th>过滤后</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Reddit</td>\n<td>(标题+正文, 最高赞评论)</td>\n<td>—</td>\n<td>—</td>\n</tr>\n<tr>\n<td>StackExchange</td>\n<td>(问题, 最高赞回答)</td>\n<td>—</td>\n<td>—</td>\n</tr>\n<tr>\n<td>Wikipedia</td>\n<td>(实体名, 相关段落)</td>\n<td>—</td>\n<td>—</td>\n</tr>\n<tr>\n<td>学术论文</td>\n<td>(标题, 摘要) 及 (论文, 引用论文)</td>\n<td>—</td>\n<td>—</td>\n</tr>\n<tr>\n<td>Common Crawl</td>\n<td>(标题, 正文段落) 及 (相邻段落对)</td>\n<td>—</td>\n<td>—</td>\n</tr>\n<tr>\n<td><strong>合计</strong></td>\n<td>—</td>\n<td><strong>1.3B</strong></td>\n<td><strong>270M</strong></td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 <strong>关键洞察</strong>：不同来源的文本对覆盖了不同的语义关系——Reddit/SE 提供问答对，Wikipedia 提供实体-描述对，学术论文提供主题相关对，CC 提供通用语义相似对。这种<strong>异构性</strong>是 E5 泛化能力的关键来源。</div>\n<h5>一致性过滤机制</h5>\n<p>原始 1.3B 文本对中包含大量噪声（尤其是 Common Crawl 来源）。E5 提出一致性过滤策略：</p>\n<ol>\n<li>使用两个<strong>独立训练</strong>的嵌入模型（一个小规模 E5 和 coCondenser）分别对每个文本对计算相似度分数</li>\n<li>仅保留<strong>两个模型都给出高分</strong>的文本对</li>\n</ol>\n<p>$$\\text{keep}(q, d) = \\mathbb{1}\\left[s_1(q, d) > \\theta_1 \\wedge s_2(q, d) > \\theta_2\\right]$$</p>\n<p>这一设计的直觉是：如果两个架构不同的模型都认为某个文本对是高质量的，那么该对大概率确实包含有意义的语义关联。实验表明，在 1M 对上过滤带来 <strong>+6 点</strong>提升（34.9 → 40.7），在全量数据上 4 倍数据量的未过滤版本仍落后过滤版本 <strong>1.6 点</strong>（50.0 vs 51.6）。</p>\n<h5>对比预训练（Stage 1）</h5>\n<p><strong>损失函数</strong>：标准 InfoNCE 损失，使用 in-batch negatives：</p>\n<p>$$\\mathcal{L} = -\\log \\frac{\\exp(\\text{sim}(q, d^+) / \\tau)}{\\sum_{j=1}^{N} \\exp(\\text{sim}(q, d_j) / \\tau)}$$</p>\n<p>其中 \\(\\text{sim}(q, d) = \\cos(\\mathbf{h}_q, \\mathbf{h}_d)\\)，\\(\\tau = 0.01\\) 为温度参数，\\(N\\) 为 batch 内所有文档（包括其他样本的正例作为负例）。</p>\n<p><strong>编码器设计</strong>：\n- 共享参数的双塔 Transformer（query 和 passage 使用同一编码器）\n- 平均池化（Mean Pooling）获取句向量\n- 输入前添加 <code>\"query: \"</code> 或 <code>\"passage: \"</code> 前缀以区分语义角色</p>\n<pre><code class=\"language-python\"># E5 对比预训练伪代码\nfor batch in CCPairs_dataloader:  # batch_size = 32K\n    queries, passages = batch  # 每对 (query, passage+)\n\n    # 编码（共享 encoder，不同前缀）\n    q_embs = encoder(&quot;query: &quot; + queries)      # [B, D]\n    d_embs = encoder(&quot;passage: &quot; + passages)    # [B, D]\n\n    # 平均池化\n    q_embs = mean_pool(q_embs)  # [B, H]\n    d_embs = mean_pool(d_embs)  # [B, H]\n\n    # 余弦相似度矩阵\n    sim_matrix = cosine_sim(q_embs, d_embs) / tau  # [B, B], tau=0.01\n\n    # InfoNCE: 对角线为正例\n    labels = torch.arange(B)\n    loss = cross_entropy(sim_matrix, labels)\n\n    loss.backward()\n    optimizer.step()\n</code></pre>\n<p><strong>关键超参数</strong>：\n- 初始化：MiniLM（small）、BERT-base（base）、BERT-large-wwm（large）\n- Batch size：32,768（128 × A100 GPU，每卡 256）\n- 训练步数：20,000（约 2.5 epochs over 270M pairs）\n- 学习率：\\(3 \\times 10^{-4}\\)（small）、\\(2 \\times 10^{-4}\\)（base）、\\(1 \\times 10^{-4}\\)（large）\n- 优化器：AdamW</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：batch size 对性能影响极大。32K batch 相比 1K batch 在 BEIR 平均分上提升约 9 个点（51.6 vs 42.4）。这是因为更大的 batch 提供了更多高质量的 in-batch negatives，使模型能更好地学习细粒度语义区分。</div>\n<h5>有监督微调（Stage 2）</h5>\n<p>在对比预训练的基础上，E5 进一步在标注数据上微调：</p>\n<p><strong>训练数据</strong>：\n- <strong>MS-MARCO</strong>：搜索引擎查询-文档对（利于检索任务）\n- <strong>Natural Questions (NQ)</strong>：问答对（利于检索任务）\n- <strong>NLI</strong>：自然语言推理数据（利于语义相似度任务）</p>\n<p><strong>损失函数</strong>：结合知识蒸馏与对比学习：</p>\n<p>$$\\mathcal{L} = D_{\\text{KL}}\\left(\\text{softmax}(\\mathbf{s} / \\tau_2) \\| \\text{softmax}(\\mathbf{t} / \\tau_2)\\right) + \\alpha \\cdot \\mathcal{L}_{\\text{contrastive}}$$</p>\n<p>其中 \\(\\mathbf{s}\\) 为学生模型（E5）的相似度分数向量，\\(\\mathbf{t}\\) 为教师模型（交叉编码器）的分数向量，\\(\\tau_2\\) 为蒸馏温度，\\(\\alpha\\) 为平衡系数。</p>\n<p><strong>硬负例挖掘</strong>：每个查询配 7 个硬负例（由 BM25 和预训练模型检索得到的高分但不相关文档），微调 3 个 epoch，batch size 256。</p>\n<div class=\"key-point\">💡 <strong>数据多样性的重要性</strong>：消融实验表明，MS-MARCO + NQ 主要提升检索任务性能，NLI 主要提升语义相似度（STS）任务性能。三者结合才能在 MTEB 56 个任务上取得全面最优。</div>\n<h5>与传统方法的关键区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th>传统方法</th>\n<th>E5</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>预训练任务</td>\n<td>ICT、随机裁剪等合成任务</td>\n<td>真实网络文本对 + 一致性过滤</td>\n</tr>\n<tr>\n<td>数据规模</td>\n<td>通常 &lt; 10M</td>\n<td>270M 过滤后文本对</td>\n</tr>\n<tr>\n<td>数据多样性</td>\n<td>单一来源（如仅 Wikipedia）</td>\n<td>5 大异构来源</td>\n</tr>\n<tr>\n<td>负例策略</td>\n<td>MoCo / pre-batch negatives</td>\n<td>纯 in-batch negatives（32K batch）</td>\n</tr>\n<tr>\n<td>参数效率</td>\n<td>GTR/ST5 需 4.8B 参数</td>\n<td>300M 参数即超越</td>\n</tr>\n</tbody>\n</table></div>\n<h5>核心实验结果</h5>\n<p><strong>BEIR（18 个检索数据集）</strong>：\n- E5-PT_large（无监督）：<strong>44.2</strong> nDCG@10 — 首个超越 BM25（41.7）的无监督稠密检索模型\n- E5_large（有监督）：<strong>50.0</strong> nDCG@10 — 当时 SOTA</p>\n<p><strong>MTEB（56 个任务）</strong>：\n- E5_large（300M 参数）：<strong>61.3</strong> 平均分\n- 对比：GTR_xxl（4.8B）59.0，ST5_xxl（4.8B）59.5\n- E5 以 <strong>~16× 更少参数</strong>实现更优性能</p>\n<p><strong>关键消融结论</strong>：\n- Batch size 32K &gt;&gt; 1K（+9.2 点）\n- 一致性过滤在 1M 数据上 +5.8 点\n- In-batch negatives（51.6）&gt; MoCo（45.5）&gt; Pre-batch（43.3）\n- CCPairs 预训练至关重要：直接微调 BERT 远不如先在 CCPairs 上预训练再微调</p>",
      "quiz": {
        "q": "E5 的一致性过滤（Consistency-based Filtering）策略的核心思想是什么？",
        "options": [
          "使用单个大模型对文本对打分，保留高分样本",
          "使用两个独立模型分别打分，仅保留双模型一致认为高质量的样本",
          "通过人工标注筛选高质量文本对",
          "根据文本长度和词频统计过滤低质量样本"
        ],
        "answer": 1,
        "explain": "一致性过滤使用两个架构不同的独立嵌入模型（E5 和 coCondenser）分别对文本对打分，仅保留两者都给出高分的样本，利用模型间的一致性来降低噪声。"
      }
    },
    {
      "id": "hyde",
      "num": 10,
      "name": "HyDE",
      "fullName": "假设性文档嵌入 (Hypothetical Document Embeddings)",
      "year": "2022.12",
      "org": "CMU",
      "parent": "dpr",
      "paperUrl": "https://arxiv.org/abs/2212.10496",
      "projectUrl": "",
      "category": "foundation",
      "motivation": "LLM生成虚构答案再检索，答案-答案匹配提升对齐",
      "summary": "HyDE 提出利用指令跟随型 LLM（InstructGPT）为查询生成假设性文档，再通过无监督对比编码器（Contriever）将假设文档编码为稠密向量进行最近邻检索，将传统的\"查询-文档\"匹配转化为\"文档-文档\"匹配，在完全不需要相关性标注的零样本设定下达到接近有监督稠密检索器的性能。",
      "keyPoints": [
        "<strong>零样本检索范式</strong>：无需任何相关性标注数据，仅依赖 LLM 的生成能力和无监督编码器即可完成高质量检索",
        "<strong>假设文档生成</strong>：利用 InstructGPT（text-davinci-003, 175B）根据任务特定的 instruction 为查询生成假设性回答文档",
        "<strong>文档-文档匹配</strong>：将查询侧从短文本 query 转化为与语料库文档同质的长文本，消除 query-document 之间的表示不对称",
        "<strong>向量平均聚合</strong>：对多个假设文档的编码向量取平均，过滤掉不正确的细节，保留与查询相关的核心语义信号",
        "<strong>编码器无关</strong>：底层编码器可替换（Contriever / mContriever），且可与微调编码器叠加使用进一步提升性能",
        "<strong>多任务 prompt 设计</strong>：针对 Web 搜索、科学事实验证、金融问答、多语言检索等 8 类任务设计了不同的生成指令",
        "<strong>评测覆盖广泛</strong>：在 TREC DL19/20（Web 搜索）、BEIR 6 个低资源数据集、Mr.TyDi 4 种语言上全面验证"
      ],
      "detail": "<h5>核心示意图</h5>\n<p><img alt=\"HyDE 模型流程图\" src=\"https://ar5iv.labs.arxiv.org/html/2212.10496/assets/x1.png\" />\n<em>图：HyDE 模型示意。查询经 InstructGPT 生成假设文档，再由 Contriever 编码为向量，通过内积搜索检索真实文档。HyDE 无需修改底层 GPT-3 和 Contriever/mContriever 模型即可服务各类查询。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># HyDE: Hypothetical Document Embeddings\n# 输入: query q, 语料库 C, 编码器 f, 生成模型 G, 指令模板 inst\n# 输出: 检索到的 top-k 真实文档\n\ndef hyde_retrieve(q, C, f, G, inst, N=1, k=10):\n    # Step 1: 生成 N 个假设文档\n    hypothetical_docs = []\n    for i in range(N):\n        prompt = inst.format(query=q)          # 构造指令 prompt\n        d_hat = G.generate(prompt)              # LLM 生成假设文档\n        hypothetical_docs.append(d_hat)\n\n    # Step 2: 编码假设文档并取平均\n    vectors = [f.encode(d) for d in hypothetical_docs]\n    v_q = sum(vectors) / len(vectors)           # 向量平均 (Eq. 7)\n\n    # Step 3: 最大内积搜索 (MIPS)\n    results = MIPS(v_q, C_encoded, k)           # 检索真实文档\n    return results\n\n# 可选变体: 将原始 query 向量也纳入平均 (Eq. 8)\n# v_q = (f.encode(q) + sum(vectors)) / (1 + len(vectors))\n</code></pre>\n<h5>动机与背景</h5>\n<p>稠密检索（Dense Retrieval）的核心挑战在于：如何将查询和文档映射到同一向量空间中，使得相关的查询-文档对具有高相似度。传统方法（如 DPR、ANCE）依赖大量人工标注的相关性判断数据进行对比学习，这在实际场景中往往难以获取。即使是广泛使用的 MS-MARCO 数据集也限制商业使用。</p>\n<p>无监督方法（如 Contriever）通过自监督对比学习避免了标注依赖，但由于缺乏相关性信号，其性能通常不如 BM25 等经典词汇匹配方法。核心瓶颈在于 <strong>query-document 的表示不对称</strong>：查询通常是简短的几个词或一句话，而文档则是包含丰富上下文的长文本段落。编码器难以将这两种截然不同的文本形式映射到语义一致的向量空间。</p>\n<div class=\"key-point\">💡 <strong>关键洞察</strong>：与其让编码器学习跨越 query-document 的鸿沟，不如先用 LLM 将 query \"展开\"为一个假设性文档，将问题转化为 <strong>document-document 的语义匹配</strong>——这对无监督编码器来说是更自然的任务。</div>\n<h5>核心机制详解</h5>\n<p><strong>1. 假设文档生成（Hypothetical Document Generation）</strong></p>\n<p>给定查询 \\(q\\)，HyDE 使用指令跟随型语言模型 \\(\\mathcal{G}\\) 生成假设文档：</p>\n<p>$$\\hat{d} \\sim p_{\\mathcal{G}}(\\cdot \\mid \\text{prompt}(q))$$</p>\n<p>其中 prompt 由任务特定的指令（instruction）和查询拼接而成。例如 Web 搜索的指令为：</p>\n<blockquote>\n<p><em>\"Please write a passage to answer the question. Question: {query}. Passage:\"</em></p>\n</blockquote>\n<p>生成的假设文档 \\(\\hat{d}\\) 可能包含事实性错误，但其关键价值在于<strong>捕获了相关性模式</strong>——它与真实相关文档在词汇选择、句式结构、主题分布上高度相似。这种\"形似而非实\"的特性恰好是 HyDE 的设计精髓。</p>\n<p><strong>2. 对比编码与向量聚合</strong></p>\n<p>假设文档通过无监督对比编码器 \\(f\\)（Contriever）映射为稠密向量：</p>\n<p>$$\\mathbf{v}_{\\hat{d}} = f(\\hat{d})$$</p>\n<p>当生成 \\(N\\) 个假设文档时，通过向量平均进行聚合：</p>\n<p>$$\\mathbf{v}_q = \\frac{1}{N} \\sum_{k=1}^{N} f(\\hat{d}_k)$$</p>\n<div class=\"warn-box\">⚠️ <strong>向量平均的作用</strong>：多个假设文档各自可能包含不同的错误细节（如错误的年份、人名），但它们共享的核心语义信号（与查询相关的主题和概念）在平均后被保留和增强，而随机错误则被\"稀释\"。这类似于集成学习中的 bagging 思想。</div>\n<p>可选地，还可以将原始查询的编码向量也纳入平均（论文 Eq. 8）：</p>\n<p>$$\\mathbf{v}_q = \\frac{1}{N+1} \\left( f(q) + \\sum_{k=1}^{N} f(\\hat{d}_k) \\right)$$</p>\n<p><strong>3. 最大内积搜索（MIPS）</strong></p>\n<p>最终的检索通过向量内积完成：</p>\n<p>$$d^* = \\arg\\max_{d \\in \\mathcal{C}} \\langle \\mathbf{v}_q, \\, f(d) \\rangle$$</p>\n<p>语料库中所有文档的编码 \\(f(d)\\) 可以离线预计算并建立索引，检索时仅需计算查询侧的假设文档编码和一次向量搜索。</p>\n<h5>实验结果与关键发现</h5>\n<p><strong>Web 搜索（TREC DL19/20）</strong>：HyDE 在 MAP、NDCG@10、Recall@1k 上全面超越 BM25 和无监督 Contriever。在 DL19 上，HyDE 的 NDCG@10（61.3）与有监督的 Contriever\\(^{\\text{FT}}\\)（62.1）接近；Recall@1k（97.8）甚至超过所有有监督模型。</p>\n<p><strong>低资源检索（BEIR）</strong>：在 SciFact、Arguana、TREC-COVID、FiQA、DBPedia、TREC-NEWS 6 个数据集上，HyDE 在 NDCG@10 上仅在 TREC-COVID 上以 0.2 的微小差距落后于 BM25，而底层 Contriever 在该数据集上落后超过 50%。HyDE 普遍优于在 MS-MARCO 上微调的 DPR 和 ANCE。</p>\n<p><strong>多语言检索（Mr.TyDi）</strong>：在斯瓦希里语、韩语、日语、孟加拉语上，HyDE 均提升了 mContriever 的性能，并超越了从 MS-MARCO 迁移的微调模型（mDPR、mBERT、XLM-R），但与微调的 mContriever\\(^{\\text{FT}}\\) 仍有差距，作者归因于 LLM 在非英语低资源语言上的预训练不足。</p>\n<p><strong>生成模型规模效应（Table 4）</strong>：Flan-T5（11B）→ Cohere（52B）→ InstructGPT（175B），模型越大，HyDE 性能越好。即使是 11B 的 Flan-T5 也能为 Contriever 带来显著提升。当 HyDE 与微调编码器 Contriever\\(^{\\text{FT}}\\) 结合时，InstructGPT 仍能进一步提升性能（DL19: 62.1 → 67.4），说明生成模型捕获了微调编码器未覆盖的相关性信号。</p>\n<h5>与传统方法的区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th>传统稠密检索 (DPR/ANCE)</th>\n<th>BM25</th>\n<th>HyDE</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>相关性建模</td>\n<td>向量相似度（需标注训练）</td>\n<td>词频统计</td>\n<td>LLM 生成 + 向量匹配</td>\n</tr>\n<tr>\n<td>标注需求</td>\n<td>大量 query-document 对</td>\n<td>无</td>\n<td><strong>无</strong></td>\n</tr>\n<tr>\n<td>查询表示</td>\n<td>短文本编码</td>\n<td>关键词</td>\n<td><strong>假设文档编码</strong></td>\n</tr>\n<tr>\n<td>匹配范式</td>\n<td>query-document</td>\n<td>query-document</td>\n<td><strong>document-document</strong></td>\n</tr>\n<tr>\n<td>零样本能力</td>\n<td>弱（依赖域内数据）</td>\n<td>强</td>\n<td><strong>强</strong></td>\n</tr>\n<tr>\n<td>可扩展性</td>\n<td>需重新训练</td>\n<td>即插即用</td>\n<td><strong>即插即用</strong>（换 prompt 即可）</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 <strong>核心创新</strong>：HyDE 将\"相关性\"的概念从数值化的向量相似度分数转移到了自然语言生成过程中。LLM 通过生成与查询相关的文本来隐式地建模相关性，而非显式地学习一个评分函数。这开辟了一种全新的 LLM-检索器交互范式。</div>",
      "quiz": {
        "q": "HyDE 将查询编码为假设文档向量后进行检索，其核心优势来源于什么？",
        "options": [
          "假设文档的事实准确性高于原始查询",
          "将 query-document 匹配转化为 document-document 匹配，消除表示不对称",
          "InstructGPT 生成的文档可以直接替代真实文档作为检索结果",
          "向量平均操作提升了编码器的表示能力"
        ],
        "answer": 1,
        "explain": "HyDE 的核心优势在于将短查询扩展为与语料库文档同质的长文本，使无监督编码器在 document-document 的对称匹配场景下工作，而非依赖假设文档的事实准确性。"
      }
    },
    {
      "id": "flare",
      "num": 11,
      "name": "FLARE",
      "fullName": "前瞻性主动检索 (Forward-Looking Active Retrieval)",
      "year": "2023.05",
      "org": "CMU",
      "parent": "rag",
      "paperUrl": "https://arxiv.org/abs/2305.06983",
      "projectUrl": "",
      "category": "architecture",
      "motivation": "低置信度Token触发检索，主动式知识增强",
      "summary": "FLARE 通过监测生成过程中 token 级概率，在模型不确定时以临时生成的下一句作为查询主动检索外部文档并重新生成，实现自适应按需检索增强，避免了固定间隔检索的效率浪费与噪声引入。",
      "keyPoints": [
        "提出 <strong>Active Retrieval Augmented Generation</strong> 统一框架，将检索决策分解为 <strong>when to retrieve</strong>（何时检索）和 <strong>what to retrieve</strong>（如何构造查询）两个正交维度",
        "检索触发条件：临时生成句中任一 token 概率低于阈值 \\(\\theta\\) 即触发检索，无需额外训练",
        "两种查询构造策略：<strong>FLARE_direct</strong>（掩码低置信 token 后直接用临时句作查询）和 <strong>FLARE_instruct</strong>（用 LM 显式生成检索查询）",
        "前瞻式查询（forward-looking）：用即将生成的内容而非已生成内容构造查询，更精准匹配当前信息需求",
        "在 4 个长文本知识密集型任务（2WikiMQA、StrategyQA、ASQA、WikiAsp）上全面优于或持平最强基线",
        "检索频率仅为固定间隔方法的约 45%，兼顾效果与效率"
      ],
      "detail": "<h5>框架总览</h5>\n<p><img alt=\"Active Retrieval Augmented Generation 总览\" src=\"https://ar5iv.labs.arxiv.org/html/2305.06983v2/assets/x1.png\" />\n<em>图 1：Active Retrieval Augmented Generation 框架总览——在每个生成步骤中，模型主动决定何时检索、检索什么。</em></p>\n<p><img alt=\"FLARE 核心流程图\" src=\"https://ar5iv.labs.arxiv.org/html/2305.06983v2/assets/x2.png\" />\n<em>图 2：FLARE 工作流程——迭代生成临时句，检测低置信 token，触发检索后用检索结果重新生成。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># FLARE 核心流程伪代码\ndef flare_generate(x, LM, Retriever, corpus, theta=0.5):\n    y = &quot;&quot;           # 已生成输出\n    D_all = []       # 累积检索文档\n    while not finished:\n        # Step 1: 临时生成下一句\n        s_hat, token_probs = LM.generate_next_sentence(x, D_all, y)\n\n        # Step 2: 检查是否存在低置信 token\n        if any(p &lt; theta for p in token_probs):\n            # Step 3: 构造查询（FLARE_direct: 掩码低置信 token）\n            query = mask_low_conf_tokens(s_hat, token_probs, theta)\n            # 或 FLARE_instruct: query = LM.generate_query(x, y)\n\n            # Step 4: 检索相关文档\n            D_t = Retriever.search(query, corpus, top_k=5)\n            D_all.extend(D_t)\n\n            # Step 5: 基于检索结果重新生成\n            s = LM.regenerate_sentence(x, D_all, y)\n        else:\n            s = s_hat  # 置信度足够，直接采纳\n\n        y += s\n    return y\n</code></pre>\n<h5>动机与背景</h5>\n<p>传统 RAG 方法面临两个极端：<strong>单次检索</strong>（single-time retrieval）仅在生成前检索一次，无法应对长文本生成中信息需求的动态演变；<strong>固定间隔检索</strong>（如 RETRO 每 n 个 token 检索、IC-RALM 每句检索）则不区分是否真正需要检索，既浪费计算资源又可能引入无关信息干扰生成质量。FLARE 的核心洞察是：<strong>LM 自身的 token 生成概率是不确定性的天然信号</strong>——当模型对某个 token 的预测概率很低时，说明它缺乏足够的知识支撑，此时检索最有价值；反之，高置信区间无需检索。</p>\n<h5>核心机制：置信度驱动的检索触发</h5>\n<p>FLARE 的检索触发基于 token 级概率监测。在每个生成步骤 \\(t\\)，模型先生成一个临时句 \\(\\hat{s}_t = [w_1, w_2, \\ldots, w_n]\\)，并记录每个 token 的生成概率。检索触发条件为：</p>\n<p>$$\\text{Retrieve?}(\\hat{s}_t) = \\exists\\, w_i \\in \\hat{s}_t,\\; p(w_i) < \\theta$$</p>\n<p>其中 \\(\\theta\\) 为置信度阈值（默认 0.5）。当 \\(\\theta\\) 过低（如 0.1）时 FLARE 几乎不检索，退化为无检索生成；过高（如 0.9）时则过度检索，退化为固定间隔方法。实验表明最优 \\(\\theta\\) 在 0.3–0.6 之间。</p>\n<div class=\"key-point\">💡 关键：这一机制<strong>无需任何额外训练</strong>，直接利用 LM 的 logits 输出，使 FLARE 可即插即用于任何暴露 token 概率的模型。</div>\n<h5>查询构造：前瞻 vs 回顾</h5>\n<p>FLARE 的另一创新在于<strong>前瞻式查询</strong>（forward-looking query）——用临时生成的下一句（而非已生成的上一句）来构造检索查询。直觉是：即将生成的内容更直接反映当前的信息需求，而已生成内容可能已经偏离了需要补充知识的方向。</p>\n<p>两种具体实现：</p>\n<p><strong>FLARE_direct</strong> 将临时句中低置信 token 掩码后作为查询：</p>\n<p>$$q_t = \\text{Mask}(\\hat{s}_t,\\, \\theta)$$</p>\n<p>掩码的理由是低置信 token 很可能是错误的，保留它们会误导检索器。例如，临时句 \"The film was directed by [John Smith]\" 中如果 \"John Smith\" 置信度极低，则将其移除，用 \"The film was directed by\" 作为查询。</p>\n<p><strong>FLARE_instruct</strong> 则让 LM 显式生成一个搜索查询：</p>\n<p>$$q_t = \\text{LM}(\\text{\"Given the context, generate a search query:\"} \\,\\|\\, x \\,\\|\\, y_{<t})$$</p>\n<p>这种方式更灵活，尤其在需要复杂推理的场景（如多跳问答）中表现更优，因为 LM 能理解\"需要什么信息\"并生成针对性查询。</p>\n<h5>与已有方法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>检索时机</th>\n<th>查询来源</th>\n<th style=\"text-align: center;\">是否需要训练</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>RETRO</td>\n<td>每 n 个 token</td>\n<td>前 n 个 token</td>\n<td style=\"text-align: center;\">是</td>\n</tr>\n<tr>\n<td>IC-RALM</td>\n<td>每句</td>\n<td>上一句</td>\n<td style=\"text-align: center;\">否</td>\n</tr>\n<tr>\n<td>IRCoT</td>\n<td>每个 CoT 步骤</td>\n<td>上一 CoT 句</td>\n<td style=\"text-align: center;\">否</td>\n</tr>\n<tr>\n<td>Self-RAG</td>\n<td>学习到的特殊 token</td>\n<td>学习到的查询</td>\n<td style=\"text-align: center;\">是</td>\n</tr>\n<tr>\n<td><strong>FLARE</strong></td>\n<td>低置信度触发</td>\n<td>前瞻临时句</td>\n<td style=\"text-align: center;\"><strong>否</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p>FLARE 的独特优势在于：(1) 自适应检索频率，按需触发而非固定间隔；(2) 前瞻式查询比回顾式更精准；(3) 免训练，仅需 token 概率可访问。</p>\n<div class=\"warn-box\">⚠️ 注意：FLARE 依赖 token 概率的可访问性。对于仅提供文本输出的黑盒 API（如部分 ChatGPT 接口），需要 API 支持 <code>logprobs</code> 参数才能使用。</div>\n<h5>消融验证</h5>\n<p>消融实验在 2WikiMQA 上验证了三个核心组件的贡献：\n- 去掉置信度触发（始终检索）：F1 从 37.8 降至 34.5（<strong>-3.3</strong>），证明选择性检索的重要性\n- 去掉前瞻查询（改用上一句）：F1 降至 35.2（<strong>-2.6</strong>），证明前瞻式查询的优势\n- 去掉 token 掩码：F1 降至 35.0（<strong>-1.2</strong>），证明掩码净化查询的作用</p>",
      "quiz": {
        "q": "FLARE 中触发检索的核心依据是什么？",
        "options": [
          "已生成文本的长度达到固定阈值",
          "临时生成句中存在 token 生成概率低于阈值 θ",
          "检索器返回的文档相关性分数低于阈值",
          "用户显式发出检索请求信号"
        ],
        "answer": 1,
        "explain": "FLARE 监测临时生成句中每个 token 的概率，当任一 token 概率低于 θ 时触发检索，这是其区别于固定间隔方法的核心机制。"
      }
    },
    {
      "id": "recomp",
      "num": 12,
      "name": "RECOMP",
      "fullName": "检索内容压缩 (Retrieval-Augmented LMs with Compression)",
      "year": "2023.10",
      "org": "Princeton",
      "parent": "rag",
      "paperUrl": "https://arxiv.org/abs/2310.04444",
      "projectUrl": "",
      "category": "architecture",
      "motivation": "训练专门压缩器将多文档浓缩为极简摘要",
      "summary": "RECOMP 的核心目标是：训练专门压缩器将多文档浓缩为极简摘要。",
      "keyPoints": [
        "核心动机：训练专门压缩器将多文档浓缩为极简摘要",
        "演化来源：继承或改进自 rag",
        "代表机构：Princeton"
      ],
      "detail": "<p>训练专门压缩器将多文档浓缩为极简摘要</p>"
    },
    {
      "id": "self_rag",
      "num": 13,
      "name": "Self-RAG",
      "fullName": "自我反思检索增强生成 (Self-Reflective Retrieval-Augmented Generation)",
      "year": "2024.03",
      "org": "University of Washington",
      "parent": "rag",
      "paperUrl": "https://arxiv.org/abs/2310.11511",
      "projectUrl": "",
      "category": "architecture",
      "motivation": "反射Token自主决策检索时机并批判结果事实性",
      "summary": "Self-RAG 的核心目标是：反射Token自主决策检索时机并批判结果事实性。",
      "keyPoints": [
        "核心动机：反射Token自主决策检索时机并批判结果事实性",
        "演化来源：继承或改进自 rag",
        "代表机构：University of Washington"
      ],
      "detail": "<p>反射Token自主决策检索时机并批判结果事实性</p>"
    },
    {
      "id": "crag",
      "num": 14,
      "name": "CRAG",
      "fullName": "纠正式检索增强生成 (Corrective Retrieval Augmented Generation)",
      "year": "2024.01",
      "org": "Salesforce",
      "parent": "self_rag",
      "paperUrl": "https://arxiv.org/abs/2401.15884",
      "projectUrl": "",
      "category": "architecture",
      "motivation": "检索评估器判断质量，低质时触发Web搜索补充",
      "summary": "CRAG 提出了一种即插即用的纠正性检索增强生成框架，通过轻量级检索评估器判断检索文档的质量置信度，并根据置信度触发三种差异化纠正动作（直接精炼、Web搜索补充、两者结合），从而显著提升 RAG 系统在检索质量不可靠时的生成鲁棒性。",
      "keyPoints": [
        "<strong>检索评估器</strong>：基于 T5-large 微调的轻量级评估器，对每个 (query, document) 对打分，估计检索文档与查询的相关性置信度",
        "<strong>三种触发动作</strong>：根据置信度得分将检索结果分为 Correct（至少一篇高于上阈值）、Incorrect（全部低于下阈值）、Ambiguous（介于两者之间），分别触发不同的知识处理策略",
        "<strong>知识精炼操作</strong>：将文档分解为细粒度知识条（knowledge strips），逐条用评估器过滤无关信息，重组为精炼后的知识",
        "<strong>Web 搜索增强</strong>：当检索结果不可靠时，利用 ChatGPT 重写查询关键词，通过 Google Search API 获取补充知识",
        "<strong>即插即用设计</strong>：可无缝集成到标准 RAG 和 Self-RAG 等现有框架中，无需修改底层 LLM",
        "<strong>评估基准</strong>：在 PopQA、Biography、PubHealth、Arc-Challenge 四个数据集上验证，覆盖短文本生成、长文本生成和封闭集任务"
      ],
      "detail": "<h5>框架总览</h5>\n<p><img alt=\"CRAG 框架总览图\" src=\"https://arxiv.org/html/2401.15884v2/x2.png\" />\n<em>图：CRAG 整体框架。检索评估器评估文档质量后触发三种动作：Correct 时精炼文档、Incorrect 时触发 Web 搜索、Ambiguous 时两者结合。</em></p>\n<p><img alt=\"检索质量问题示例\" src=\"https://arxiv.org/html/2401.15884v2/x1.png\" />\n<em>图：检索增强生成中的典型问题示例。即使是相关文档也可能包含大量无关信息（左），而不相关文档则会直接误导生成（右）。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># CRAG 核心流程伪代码\ndef CRAG(query, retrieved_docs, generator):\n    # Step 1: 检索评估 — 对每篇文档评估相关性\n    scores = [retrieval_evaluator(query, doc) for doc in retrieved_docs]\n    confidence = aggregate_confidence(scores)\n\n    # Step 2: 触发动作\n    if confidence == CORRECT:  # 至少一篇文档高度相关\n        # 精炼内部知识：分解→过滤→重组\n        knowledge = refine_documents(query, retrieved_docs, scores)\n\n    elif confidence == INCORRECT:  # 所有文档均不相关\n        # 触发 Web 搜索获取外部知识\n        rewritten_query = rewrite_query_with_llm(query)  # ChatGPT 重写\n        web_results = google_search(rewritten_query)\n        knowledge = refine_documents(query, web_results)\n\n    elif confidence == AMBIGUOUS:  # 不确定\n        # 同时使用精炼后的内部知识 + Web 搜索知识\n        internal_knowledge = refine_documents(query, retrieved_docs, scores)\n        rewritten_query = rewrite_query_with_llm(query)\n        web_results = google_search(rewritten_query)\n        external_knowledge = refine_documents(query, web_results)\n        knowledge = combine(internal_knowledge, external_knowledge)\n\n    # Step 3: 生成\n    output = generator(query, knowledge)\n    return output\n\ndef refine_documents(query, docs, scores=None):\n    &quot;&quot;&quot;知识精炼：分解→过滤→重组&quot;&quot;&quot;\n    all_strips = []\n    for doc in docs:\n        # 将文档分解为细粒度知识条\n        strips = decompose_into_strips(doc)\n        # 用评估器逐条过滤\n        relevant_strips = [s for s in strips \n                          if retrieval_evaluator(query, s) &gt; threshold]\n        all_strips.extend(relevant_strips)\n    # 重组为连贯知识\n    return recompose(all_strips)\n</code></pre>\n<h5>动机与背景</h5>\n<p>检索增强生成（RAG）通过引入外部知识来缓解大语言模型的幻觉问题，但其核心假设是\"检索到的文档是相关且有用的\"。然而在实际场景中，这一假设经常不成立：</p>\n<ol>\n<li><strong>检索器本身不完美</strong>：即使是最先进的检索器也无法保证每次都返回高质量相关文档，尤其在长尾知识和复杂查询场景下</li>\n<li><strong>相关文档中的噪声</strong>：即使文档整体相关，其中也可能包含大量与查询无关的冗余信息，这些噪声会干扰生成质量</li>\n<li><strong>不相关文档的误导</strong>：当检索到完全不相关的文档时，LLM 可能被错误信息误导，产生比无检索时更严重的幻觉</li>\n</ol>\n<div class=\"key-point\">💡 关键洞察：现有 RAG 方法对检索结果\"照单全收\"，缺乏对检索质量的评估和纠正机制。CRAG 的核心思想是在检索和生成之间插入一个\"质量检查站\"，根据检索质量动态调整知识来源。</div>\n<h5>核心机制详解</h5>\n<p><strong>1. 检索评估器（Retrieval Evaluator）</strong></p>\n<p>CRAG 使用基于 T5-large 微调的轻量级评估器来估计检索文档的质量。对于每个 query \\(x\\) 和检索到的文档 \\(d\\)，评估器输出一个置信度得分：</p>\n<p>$$\\text{score} = \\text{Evaluator}(x, d) \\in [-1, 1]$$</p>\n<p>评估器的训练数据来自现有数据集的正负样本对，正样本为包含正确答案的文档，负样本通过 BM25/DPR 检索的不相关文档构造。</p>\n<div class=\"warn-box\">⚠️ 注意：实验表明，这个轻量级 T5-based 评估器的准确率达到 84.3%，显著优于 ChatGPT（58.0%）、ChatGPT-CoT（62.4%）和 ChatGPT-few-shot（64.7%），说明针对性微调的小模型在特定任务上可以超越通用大模型。</div>\n<p><strong>2. 置信度触发机制（Confidence-based Action Triggering）</strong></p>\n<p>基于评估器的得分，CRAG 设定上下两个阈值，将检索结果分为三类：</p>\n<ul>\n<li><strong>Correct</strong>（\\(\\exists\\, d_i: \\text{score}(d_i) > \\tau_{\\text{upper}}\\)）：至少有一篇文档高度相关，对相关文档进行知识精炼后直接使用</li>\n<li><strong>Incorrect</strong>（\\(\\forall\\, d_i: \\text{score}(d_i) < \\tau_{\\text{lower}}\\)）：所有文档均不相关，丢弃检索结果，转而通过 Web 搜索获取新知识</li>\n<li><strong>Ambiguous</strong>（其他情况）：检索质量不确定，同时使用精炼后的检索文档和 Web 搜索结果</li>\n</ul>\n<p>这种三级触发机制比简单的二元判断（相关/不相关）更加灵活，能够更好地处理边界情况。</p>\n<p><strong>3. 知识精炼（Knowledge Refinement）</strong></p>\n<p>这是 CRAG 处理\"相关文档中噪声\"问题的核心操作。即使文档被判定为相关，其中仍可能包含大量无关信息。精炼过程包括三步：</p>\n<ul>\n<li><strong>分解（Decompose）</strong>：将每篇文档分解为细粒度的知识条（knowledge strips），每条包含一个独立的信息单元</li>\n<li><strong>过滤（Filter）</strong>：用检索评估器对每条知识条重新评分，过滤掉与查询不相关的条目</li>\n<li><strong>重组（Recompose）</strong>：将保留的相关知识条串联重组为连贯的知识文本</li>\n</ul>\n<div class=\"key-point\">💡 关键：这种\"先拆后滤再组\"的策略将文档级别的粗粒度相关性判断细化为条目级别的精细过滤，有效去除了文档内部的噪声信息。</div>\n<p><strong>4. Web 搜索增强（Web Search Augmentation）</strong></p>\n<p>当检索结果被判定为 Incorrect 或 Ambiguous 时，CRAG 启动 Web 搜索流程：</p>\n<ul>\n<li><strong>查询重写</strong>：使用 ChatGPT 将原始自然语言查询重写为更适合搜索引擎的关键词查询（例如将 \"Who is the spouse of XXX?\" 重写为 \"XXX spouse\"）</li>\n<li><strong>搜索执行</strong>：通过 Google Search API 获取 Web 页面</li>\n<li><strong>知识选择</strong>：对搜索结果应用与内部文档相同的精炼流程，过滤无关内容</li>\n</ul>\n<h5>与传统方法的区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>标准 RAG</th>\n<th>Self-RAG</th>\n<th>CRAG</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>检索质量评估</td>\n<td>❌ 无</td>\n<td>✅ 通过反思 token</td>\n<td>✅ 专用评估器</td>\n</tr>\n<tr>\n<td>纠正机制</td>\n<td>❌ 无</td>\n<td>部分（可选择不使用检索）</td>\n<td>✅ 三级动作触发</td>\n</tr>\n<tr>\n<td>文档精炼</td>\n<td>❌ 无</td>\n<td>❌ 无</td>\n<td>✅ 条目级过滤</td>\n</tr>\n<tr>\n<td>外部知识补充</td>\n<td>❌ 无</td>\n<td>❌ 无</td>\n<td>✅ Web 搜索</td>\n</tr>\n<tr>\n<td>对 LLM 的要求</td>\n<td>无特殊要求</td>\n<td>需要专门指令微调</td>\n<td>无特殊要求（即插即用）</td>\n</tr>\n<tr>\n<td>更换 LLM</td>\n<td>简单</td>\n<td>需重新微调</td>\n<td>简单</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 关键优势：Self-RAG 需要在 LLM 中嵌入反思 token 并进行专门的指令微调，这限制了其灵活性。当底层 LLM 从 SelfRAG-LLaMA2-7b 更换为普通 LLaMA2-hf-7b 时，Self-RAG 性能大幅下降甚至不如标准 RAG，而 CRAG 仍保持竞争力。</div>\n<h5>实验结果</h5>\n<p>在四个基准数据集上的主要结果（基于 SelfRAG-LLaMA2-7b）：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>PopQA (Acc)</th>\n<th>Biography (FactScore)</th>\n<th>PubHealth (Acc)</th>\n<th>Arc-Challenge (Acc)</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Self-RAG</td>\n<td>54.9</td>\n<td>81.2</td>\n<td>72.4</td>\n<td>67.2</td>\n</tr>\n<tr>\n<td>Self-CRAG</td>\n<td><strong>61.8</strong></td>\n<td><strong>86.2</strong></td>\n<td><strong>74.8</strong></td>\n<td>67.2</td>\n</tr>\n<tr>\n<td>提升</td>\n<td>+6.9</td>\n<td>+5.0</td>\n<td>+2.4</td>\n<td>—</td>\n</tr>\n</tbody>\n</table></div>\n<p>消融实验（PopQA，SelfRAG-LLaMA2-7b）表明每个组件都不可或缺：\n- 移除 Correct 动作：61.8 → 59.6（-2.2）\n- 移除 Incorrect 动作：61.8 → 60.8（-1.0）\n- 移除文档精炼：61.8 → 52.2（-9.6，影响最大）\n- 移除查询重写：61.8 → 58.4（-3.4）</p>",
      "quiz": {
        "q": "当 CRAG 的检索评估器判定所有检索文档均不相关（Incorrect）时，系统会采取什么动作？",
        "options": [
          "直接使用原始检索文档生成回答",
          "对检索文档进行知识精炼后使用",
          "丢弃检索结果，通过 Web 搜索获取新的外部知识",
          "将查询拆分为多个子查询重新检索"
        ],
        "answer": 2,
        "explain": "当所有文档的置信度得分均低于下阈值时，CRAG 判定为 Incorrect，会完全丢弃不可靠的检索结果，转而通过重写查询并调用 Web 搜索来获取新的外部知识作为生成依据。"
      }
    },
    {
      "id": "graphrag",
      "num": 15,
      "name": "GraphRAG",
      "fullName": "图谱检索增强生成 (Graph Retrieval-Augmented Generation)",
      "year": "2024.02",
      "org": "Microsoft Research",
      "parent": "rag",
      "paperUrl": "https://arxiv.org/abs/2404.16130",
      "projectUrl": "",
      "category": "architecture",
      "motivation": "知识图谱全局关系推理，解决跨文档总结难题",
      "summary": "GraphRAG 的核心目标是：知识图谱全局关系推理，解决跨文档总结难题。",
      "keyPoints": [
        "核心动机：知识图谱全局关系推理，解决跨文档总结难题",
        "演化来源：继承或改进自 rag",
        "代表机构：Microsoft Research"
      ],
      "detail": "<p>知识图谱全局关系推理，解决跨文档总结难题</p>"
    },
    {
      "id": "llmlingua",
      "num": 16,
      "name": "LLMLingua",
      "fullName": "LLM语言压缩 (LLMLingua Prompt Compression)",
      "year": "2024.01",
      "org": "Microsoft Research",
      "parent": "rag",
      "paperUrl": "https://arxiv.org/abs/2310.05736",
      "projectUrl": "",
      "category": "architecture",
      "motivation": "基于困惑度剔除冗余Token，20倍压缩不损性能",
      "summary": "LLMLingua 提出了一种**由粗到细的 Prompt 压缩方法**，利用小型语言模型的困惑度（Perplexity）信号，通过预算控制器、迭代式 Token 级压缩和分布对齐三大组件，在最高 20 倍压缩率下几乎不损失大语言模型的推理性能，显著降低 API 调用成本与延迟。",
      "keyPoints": [
        "<strong>三阶段由粗到细压缩框架</strong>：Budget Controller（粗粒度 Demonstration 级）→ Iterative Token-level Prompt Compression（细粒度 Token 级）→ Distribution Alignment（小模型与 LLM 对齐）",
        "<strong>Budget Controller</strong>：根据 Prompt 各组件（Instruction / Demonstrations / Question）的重要性差异，动态分配不同压缩比；对冗余 Demonstrations 执行整条删除的粗粒度压缩",
        "<strong>迭代式 Token 级压缩（ITPC）</strong>：将 Prompt 分段后逐段计算条件概率，前段压缩结果拼接到后段上下文，缓解独立性假设带来的信息丢失",
        "<strong>分布对齐</strong>：用 LLM 生成的数据对小模型做指令微调，缩小小模型与目标 LLM 之间的 Token 概率分布差距",
        "<strong>小模型选择</strong>：GPT-2-Alpaca（117M）或 Alpaca-7B 作为压缩代理模型 \\(\\mathcal{M}_s\\)",
        "<strong>评估覆盖四大场景</strong>：推理（GSM8K）、ICL（BBH）、对话（ShareGPT）、摘要（Arxiv-March23），目标 LLM 为 GPT-3.5-Turbo 和 Claude-v1.3",
        "<strong>核心结论</strong>：在 GSM8K 上 9 倍压缩仅损失 1.5% 准确率；在 BBH 上 10 倍压缩性能持平甚至略优于原始 Prompt"
      ],
      "detail": "<p><img alt=\"LLMLingua 框架总览\" src=\"https://ar5iv.labs.arxiv.org/html/2310.05736/assets/x1.png\" />\n<em>图：LLMLingua 的由粗到细压缩框架。左侧为 Budget Controller 进行 Demonstration 级筛选，中间为迭代式 Token 级压缩（ITPC），右侧为分布对齐模块。</em></p>\n<hr />\n<h5>动机与背景</h5>\n<p>随着 Chain-of-Thought、In-Context Learning 和 RAG 等技术的广泛应用，输入给 LLM 的 Prompt 越来越长，甚至超过数万 Token。这带来了两个核心问题：</p>\n<ol>\n<li><strong>推理成本高</strong>：API 按 Token 计费，长 Prompt 直接增加费用和延迟。</li>\n<li><strong>上下文窗口受限</strong>：超出模型最大上下文长度的内容会被截断，导致信息丢失。</li>\n</ol>\n<p>已有的模型压缩方法（量化、剪枝）需要修改模型参数，不适用于只能通过 API 访问的黑盒 LLM。而自然语言本身具有冗余性（Shannon, 1951），因此可以在 <strong>Prompt 层面</strong> 进行无损或近无损压缩。</p>\n<div class=\"key-point\">💡 关键：LLMLingua 的核心洞察是——<strong>Token 的困惑度（Perplexity）反映其信息量</strong>。低困惑度的 Token 对模型来说是\"可预测的\"，因此可以安全删除；高困惑度的 Token 携带关键信息，必须保留。</div>\n<hr />\n<h5>核心机制一：Budget Controller（预算控制器）</h5>\n<p>Budget Controller 解决的问题是：<strong>在高压缩率下，如何合理分配各部分的压缩预算？</strong></p>\n<p>一个典型的 Prompt 由三部分组成：</p>\n<p>$$\\bm{x} = (\\bm{x}^{\\text{ins}}, \\bm{x}^{\\text{dems}}, \\bm{x}^{\\text{que}})$$</p>\n<p>其中 Instruction 和 Question 对生成结果影响最大，应分配较低的压缩率（保留更多内容）；而多个 Demonstrations 之间信息冗余，可以大幅压缩。</p>\n<p><strong>步骤 1：计算 Demonstration 压缩率</strong></p>\n<p>$$\\tau_{\\text{dems}} = \\frac{\\tau L - (\\tau_{\\text{ins}} L_{\\text{ins}} + \\tau_{\\text{que}} L_{\\text{que}})}{L_{\\text{dems}}}$$</p>\n<p>其中 \\(\\tau\\) 为目标总压缩率，\\(\\tau_{\\text{ins}} = 0.85\\)、\\(\\tau_{\\text{que}} = 0.9\\) 为预设值。</p>\n<p><strong>步骤 2：Demonstration 级粗粒度压缩</strong></p>\n<p>用小模型 \\(\\mathcal{M}_s\\) 计算每条 Demonstration 的困惑度，按困惑度<strong>降序排列</strong>（高困惑度 = 高信息量 = 优先保留），贪心选取直到 Token 预算用尽。</p>\n<p><strong>步骤 3：剩余预算回拨</strong></p>\n<p>粗粒度选择后若有剩余 Token 预算，回拨给 Instruction 和 Question，进一步降低它们的压缩率：</p>\n<p>$$\\Delta\\tau = \\frac{k \\cdot \\tau_{\\text{dems}} L_{\\text{dems}} - \\widetilde{L}_{\\mathcal{D}}}{L_{\\text{ins}} + L_{\\text{que}}}$$</p>\n<div class=\"warn-box\">⚠️ 注意：粒度控制系数 \\(k=2\\) 允许 Demonstration 的实际 Token 数最多为预算的 2 倍，确保不会因为单条 Demonstration 过长而浪费预算。</div>\n<hr />\n<h5>核心机制二：迭代式 Token 级压缩（ITPC）</h5>\n<p>直接用困惑度逐 Token 筛选存在一个根本问题——<strong>独立性假设</strong>：删除某些 Token 后，剩余 Token 的条件概率分布已经改变，但朴素方法忽略了这一点。</p>\n<p>ITPC 的解决方案是<strong>分段迭代</strong>：</p>\n<pre><code class=\"language-python\"># ITPC 伪代码\nsegments = split(prompt_after_budget_control, segment_size=100)\ncompressed_tokens = []\n\nfor segment in segments:\n    # 将已压缩的前文拼接为上下文\n    context = compressed_tokens\n    # 用小模型计算当前段每个 token 的条件概率 p(token | context, prev_tokens_in_seg)\n    probs = small_model.get_token_probs(context + segment)\n    # 根据压缩率动态计算阈值 γ\n    gamma = compute_threshold(probs, compression_ratio)\n    # 保留困惑度 &gt; γ 的 token（即概率低、信息量大的 token）\n    kept = [tok for tok, p in zip(segment, probs) if perplexity(p) &gt; gamma]\n    compressed_tokens.extend(kept)\n\ncompressed_prompt = concat(compressed_tokens)\n</code></pre>\n<p>核心公式——分段条件概率估计：</p>\n<p>$$p(\\widetilde{\\bm{s}}_j) = \\prod_{i=1}^{L_{s,j} + \\sum_k^{j-1} \\widetilde{L}_{s,k}} p(s_{j,i} | s_{j,<i}, \\widetilde{\\bm{s}}_{<j})$$</p>\n<p>每段的压缩阈值 \\(\\gamma_j\\) 根据该段的 PPL 分布和对应压缩率动态计算，保留困惑度高于阈值的 Token：</p>\n<p>$$\\widetilde{\\bm{s}}_j = \\{s_{j,i} \\mid p(s_{j,i}) > \\gamma_j\\}$$</p>\n<div class=\"key-point\">💡 关键：ITPC 的精妙之处在于——前一段的压缩结果会作为后一段的上下文输入，使得后续段的概率估计更加准确，形成了一种<strong>自回归式的压缩链</strong>。</div>\n<hr />\n<h5>核心机制三：分布对齐</h5>\n<p>压缩使用的小模型（如 GPT-2）与目标 LLM（如 GPT-3.5）的 Token 概率分布存在差异。如果小模型认为某个 Token 不重要（低困惑度）但 LLM 认为它很重要，就会导致关键信息被误删。</p>\n<p>解决方案：用 LLM 生成的数据对小模型做<strong>指令微调</strong>，使两者的分布趋于一致：</p>\n<p>$$\\min_{\\bm{\\theta}_s} \\mathbb{E}\\left[\\frac{1}{N}\\sum_{i=1}^{N}\\mathcal{L}(\\mathbf{x}_i, \\mathbf{y}_{i,\\text{LLM}}; \\bm{\\theta}_{\\mathcal{M}_s})\\right]$$</p>\n<p>实践中使用 Alpaca 数据集进行微调，得到 GPT2-Alpaca 和 Alpaca-7B。</p>\n<div class=\"key-point\">💡 关键：分布对齐不需要目标任务的数据，只需通用指令数据即可，因此具有很好的泛化性。</div>\n<hr />\n<h5>训练与推理流程</h5>\n<p><strong>离线阶段（一次性）</strong>：\n1. 选择小模型（GPT-2 或 LLaMA-7B）\n2. 用 Alpaca 数据集 + LLM 生成的回答进行指令微调 → 得到对齐后的 \\(\\mathcal{M}_s\\)</p>\n<p><strong>在线推理阶段（每次请求）</strong>：\n1. <strong>Budget Controller</strong>：输入原始 Prompt，计算各 Demonstration 的 PPL，执行粗粒度筛选，分配 Token 预算\n2. <strong>ITPC</strong>：对筛选后的 Prompt 分段，逐段计算 Token PPL，保留高信息量 Token\n3. <strong>拼接</strong>：将压缩后的 Token 序列直接拼接为新 Prompt，送入目标 LLM</p>\n<p>整个压缩过程<strong>不需要目标 LLM 的梯度</strong>，完全兼容黑盒 API。</p>\n<hr />\n<h5>与传统方法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>压缩粒度</th>\n<th>是否考虑 Token 间依赖</th>\n<th>是否需要 LLM 梯度</th>\n<th>最大压缩率</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Selective-Context</td>\n<td>Token 级</td>\n<td>❌ 独立假设</td>\n<td>❌</td>\n<td>~4x</td>\n</tr>\n<tr>\n<td>Sentence Selection</td>\n<td>句子级</td>\n<td>❌</td>\n<td>❌</td>\n<td>~3x</td>\n</tr>\n<tr>\n<td><strong>LLMLingua</strong></td>\n<td><strong>粗→细两级</strong></td>\n<td><strong>✅ 迭代式</strong></td>\n<td><strong>❌</strong></td>\n<td><strong>20x</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p>LLMLingua 的三大优势：\n1. <strong>两级压缩</strong>：粗粒度保证语义完整性，细粒度保留关键 Token\n2. <strong>迭代式依赖建模</strong>：通过分段拼接缓解独立性假设\n3. <strong>分布对齐</strong>：让小模型的\"重要性判断\"与 LLM 保持一致</p>\n<hr />",
      "quiz": {
        "q": "LLMLingua 的迭代式 Token 级压缩（ITPC）相比朴素的逐 Token 困惑度筛选，核心改进是什么？",
        "options": [
          "使用更大的语言模型计算困惑度",
          "将 Prompt 分段，前段压缩结果作为后段上下文，缓解条件独立性假设",
          "对每个 Token 计算多次困惑度取平均",
          "用 TF-IDF 替代困惑度作为 Token 重要性指标"
        ],
        "answer": 1,
        "explain": "ITPC 将 Prompt 分为多个段，每段压缩后的结果拼接到下一段的上下文中，使后续段的条件概率估计能考虑到前段的压缩结果，从而缓解了朴素方法中各 Token 独立计算困惑度的问题。"
      }
    },
    {
      "id": "ragas",
      "num": 17,
      "name": "RAGAS",
      "fullName": "RAG评估框架 (Retrieval-Augmented Generation Assessment)",
      "year": "2024.05",
      "org": "Explorium",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2309.15217",
      "projectUrl": "",
      "category": "evaluation",
      "motivation": "RAG三元组评估法，LLM-as-judge评估忠实度",
      "summary": "RAGAS 提出了一套无需人工标注参考答案的 RAG 系统自动评估框架，通过 LLM 分别度量忠实度（答案是否基于上下文）、答案相关性（答案是否切题）和上下文相关性（检索内容是否聚焦），在 WikiEval 数据集上与人类判断高度一致（忠实度准确率 95%）。",
      "keyPoints": [
        "<strong>三维度无参考评估框架</strong>：Faithfulness（忠实度）、Answer Relevance（答案相关性）、Context Relevance（上下文相关性），完全不依赖 ground truth",
        "<strong>Faithfulness 指标</strong>：将答案分解为原子声明（statements），逐条用 LLM 验证是否可从上下文推断，\\(F = |V| / |S|\\)",
        "<strong>Answer Relevance 指标</strong>：从答案反向生成 \\(n\\) 个问题，计算与原始问题的平均余弦相似度，\\(\\text{AR} = \\frac{1}{n}\\sum_{i=1}^{n}\\text{sim}(q, q_i)\\)",
        "<strong>Context Relevance 指标</strong>：用 LLM 从上下文中提取回答问题所需的关键句子，\\(\\text{CR} = \\frac{|\\text{extracted sentences}|}{|\\text{total sentences in } c(q)|}\\)",
        "<strong>WikiEval 基准数据集</strong>：50 篇 2022 年后的 Wikipedia 页面，含人工标注的三维度质量判断，标注者一致率 90%–95%",
        "<strong>实验使用 gpt-3.5-turbo-16k</strong>，在 WikiEval 上忠实度与人类一致率 95%，答案相关性 78%，上下文相关性 70%",
        "<strong>显著优于基线</strong>：对比 GPT Score（直接打分 0–10）和 GPT Ranking（直接排序），RAGAS 在所有维度上大幅领先"
      ],
      "detail": "<p><strong>RAGAS 评估框架总览</strong></p>\n<p>RAGAS 的核心思想是：RAG 系统的质量可以从三个正交维度进行评估——生成的答案是否忠于检索到的上下文（Faithfulness）、答案是否真正回答了用户的问题（Answer Relevance）、检索到的上下文是否与问题高度相关且不含冗余信息（Context Relevance）。这三个维度共同覆盖了 RAG 系统中检索器和生成器的质量。</p>\n<div class=\"key-point\">💡 关键：RAGAS 的最大创新在于<strong>完全无需参考答案</strong>（reference-free），仅利用 \\((q, c(q), a_s(q))\\) 三元组——即问题、检索上下文和系统答案——就能自动评估 RAG 系统质量。这使得在缺乏标注数据的真实生产环境中也能持续监控 RAG 系统。</div>\n<hr />\n<p><strong>1. Faithfulness（忠实度）：声明级验证</strong></p>\n<p>忠实度衡量生成答案中的每个事实声明是否都能从检索到的上下文中推断出来。这是检测 RAG 幻觉的核心指标。</p>\n<p>评估分两步进行：</p>\n<p><strong>Step 1 — 声明分解</strong>：使用 LLM 将答案 \\(a_s(q)\\) 分解为一组简短的原子声明 \\(S = \\{s_1, s_2, \\dots, s_k\\}\\)。</p>\n<p>Prompt 示例：</p>\n<blockquote>\n<p><em>Given a question and answer, create one or more statements from each sentence in the given answer.</em></p>\n</blockquote>\n<p><strong>Step 2 — NLI 验证</strong>：对每个声明 \\(s_i\\)，使用 LLM 判断该声明是否可以从上下文 \\(c(q)\\) 中推断出来（verdict: Yes/No）。</p>\n<p>Prompt 示例：</p>\n<blockquote>\n<p><em>Consider the given context and following statements, then determine whether they are supported by the information present in the context. Provide a brief explanation for each before arriving at the verdict (Yes/No).</em></p>\n</blockquote>\n<p>最终忠实度得分：</p>\n<p>$$F = \\frac{|V|}{|S|}$$</p>\n<p>其中 \\(|V|\\) 是被判定为\"Yes\"的声明数量，\\(|S|\\) 是声明总数。\\(F \\in [0, 1]\\)，越高表示答案越忠实于上下文。</p>\n<div class=\"warn-box\">⚠️ 注意：这种声明级分解+逐条验证的方式比直接让 LLM 打分更可靠，因为它将复杂的整体判断拆解为多个简单的二元判断任务，降低了 LLM 的认知负担。</div>\n<hr />\n<p><strong>2. Answer Relevance（答案相关性）：反向问题生成</strong></p>\n<p>答案相关性衡量生成的答案是否真正回答了用户的问题，同时惩罚不完整或包含冗余信息的答案。</p>\n<p>RAGAS 采用了一种巧妙的<strong>反向验证</strong>策略：如果一个答案与问题高度相关，那么从该答案反向生成的问题应该与原始问题语义相近。</p>\n<p><strong>Step 1 — 反向问题生成</strong>：使用 LLM 从答案 \\(a_s(q)\\) 生成 \\(n\\) 个问题 \\(q_1, q_2, \\dots, q_n\\)。</p>\n<p>Prompt 示例：</p>\n<blockquote>\n<p><em>Generate a question for the given answer.</em></p>\n</blockquote>\n<p><strong>Step 2 — 余弦相似度计算</strong>：使用文本嵌入模型将原始问题 \\(q\\) 和每个生成问题 \\(q_i\\) 编码为向量，计算平均余弦相似度：</p>\n<p>$$\\text{AR} = \\frac{1}{n}\\sum_{i=1}^{n}\\text{sim}(q, q_i)$$</p>\n<p>其中 \\(\\text{sim}(\\cdot, \\cdot)\\) 为余弦相似度。\\(\\text{AR} \\in [-1, 1]\\)，实际中通常为正值，越高表示答案越切题。</p>\n<div class=\"key-point\">💡 关键：这种间接评估方式避免了让 LLM 直接判断\"答案是否相关\"这一主观任务。通过反向生成问题，将语义匹配任务交给嵌入模型，更加客观和稳定。同时，如果答案包含冗余信息，反向生成的问题会偏离原始问题，从而自然地惩罚冗余。</div>\n<hr />\n<p><strong>3. Context Relevance（上下文相关性）：关键句提取</strong></p>\n<p>上下文相关性衡量检索到的上下文是否聚焦于回答问题所需的信息，惩罚检索结果中的冗余内容。这是对 RAG 系统检索器质量的直接评估。</p>\n<p><strong>单步评估</strong>：使用 LLM 从上下文 \\(c(q)\\) 中提取对回答问题 \\(q\\) 至关重要的句子子集 \\(S_{ext}\\)。</p>\n<p>Prompt 示例：</p>\n<blockquote>\n<p><em>Please extract relevant sentences from the provided context that can potentially help answer the following question. If no relevant sentences are found, or if you believe the question cannot be answered from the given context, return the phrase \"Insufficient Information\".</em></p>\n</blockquote>\n<p>上下文相关性得分：</p>\n<p>$$\\text{CR} = \\frac{|S_{ext}|}{\\text{total number of sentences in } c(q)}$$</p>\n<p>\\(\\text{CR} \\in [0, 1]\\)，越高表示检索到的上下文越聚焦、冗余越少。</p>\n<div class=\"warn-box\">⚠️ 注意：作者发现上下文相关性是最难评估的维度。ChatGPT 在处理较长上下文时，常常难以准确选择关键句子，导致该指标与人类判断的一致率（70%）低于其他两个维度。</div>\n<hr />\n<p><strong>4. WikiEval 数据集构建</strong></p>\n<p>WikiEval 是论文提出的评估基准，用于验证 RAGAS 指标与人类判断的一致性：</p>\n<ul>\n<li><strong>数据来源</strong>：50 篇 2022 年后的 Wikipedia 页面（超出模型训练截止日期），优先选择有近期编辑的页面</li>\n<li><strong>问题生成</strong>：使用 ChatGPT 基于页面引言部分生成中等难度的问题</li>\n<li><strong>答案生成</strong>：使用 ChatGPT 在给定上下文的条件下回答问题</li>\n<li><strong>对比样本构建</strong>：</li>\n<li>Faithfulness：额外生成无上下文的答案作为低忠实度对比</li>\n<li>Answer Relevance：用 prompt 生成不完整答案作为低相关性对比</li>\n<li>Context Relevance：通过抓取反向链接页面添加相关但冗余的句子</li>\n<li><strong>人工标注</strong>：两位英语流利的标注者独立标注，Faithfulness 和 Context Relevance 一致率约 95%，Answer Relevance 约 90%，分歧通过讨论解决</li>\n</ul>\n<hr />\n<p><strong>5. 实验结果与基线对比</strong></p>\n<pre><code class=\"language-python\"># RAGAS 评估流程伪代码\n\ndef evaluate_ragas(question, context, answer, llm, embedder):\n    &quot;&quot;&quot;\n    输入: question q, context c(q), answer a_s(q)\n    输出: faithfulness, answer_relevance, context_relevance 三个分数\n    &quot;&quot;&quot;\n\n    # === 1. Faithfulness ===\n    # Step 1: 声明分解\n    statements = llm.decompose_to_statements(answer)  # a_s(q) → {s_1, ..., s_k}\n    # Step 2: 逐条 NLI 验证\n    verified = 0\n    for s in statements:\n        verdict = llm.verify_against_context(s, context)  # &quot;Yes&quot; or &quot;No&quot;\n        if verdict == &quot;Yes&quot;:\n            verified += 1\n    faithfulness = verified / len(statements)  # F = |V| / |S|\n\n    # === 2. Answer Relevance ===\n    generated_questions = []\n    for _ in range(n):  # 生成 n 个反向问题\n        q_i = llm.generate_question_from_answer(answer)\n        generated_questions.append(q_i)\n    # 计算嵌入余弦相似度\n    q_emb = embedder.encode(question)\n    similarities = [cosine_sim(q_emb, embedder.encode(q_i))\n                    for q_i in generated_questions]\n    answer_relevance = mean(similarities)  # AR = (1/n) Σ sim(q, q_i)\n\n    # === 3. Context Relevance ===\n    extracted = llm.extract_relevant_sentences(question, context)\n    total_sentences = count_sentences(context)\n    context_relevance = len(extracted) / total_sentences  # CR\n\n    return faithfulness, answer_relevance, context_relevance\n</code></pre>\n<p>实验在 WikiEval 数据集上进行成对比较（pairwise comparison），每个实例要求模型比较两个答案或两个上下文片段，统计模型偏好与人类偏好的一致率：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th style=\"text-align: center;\">Faithfulness</th>\n<th style=\"text-align: center;\">Answer Relevance</th>\n<th style=\"text-align: center;\">Context Relevance</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><strong>RAGAS</strong></td>\n<td style=\"text-align: center;\"><strong>0.95</strong></td>\n<td style=\"text-align: center;\"><strong>0.78</strong></td>\n<td style=\"text-align: center;\"><strong>0.70</strong></td>\n</tr>\n<tr>\n<td>GPT Score</td>\n<td style=\"text-align: center;\">0.72</td>\n<td style=\"text-align: center;\">0.52</td>\n<td style=\"text-align: center;\">0.63</td>\n</tr>\n<tr>\n<td>GPT Ranking</td>\n<td style=\"text-align: center;\">0.54</td>\n<td style=\"text-align: center;\">0.40</td>\n<td style=\"text-align: center;\">0.52</td>\n</tr>\n</tbody>\n</table></div>\n<p><em>表：WikiEval 数据集上与人类标注者的成对比较一致率（准确率）</em></p>\n<ul>\n<li><strong>GPT Score 基线</strong>：直接让 ChatGPT 对三个维度打 0–10 分，相同分数随机打破平局</li>\n<li><strong>GPT Ranking 基线</strong>：直接让 ChatGPT 在两个候选中选择更好的一个</li>\n</ul>\n<div class=\"key-point\">💡 关键：RAGAS 在忠实度上达到 95% 的人类一致率，远超直接打分（72%）和直接排序（54%）。这证明了<strong>将复杂评估任务分解为结构化子任务</strong>（声明分解 → 逐条验证）的有效性，而非依赖 LLM 的单次整体判断。</div>\n<hr />\n<p><strong>与传统评估方法的区别</strong></p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th style=\"text-align: center;\">传统指标 (BLEU/ROUGE)</th>\n<th style=\"text-align: center;\">基于参考的 LLM 评估</th>\n<th style=\"text-align: center;\">RAGAS</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>需要参考答案</td>\n<td style=\"text-align: center;\">✅</td>\n<td style=\"text-align: center;\">✅</td>\n<td style=\"text-align: center;\">❌</td>\n</tr>\n<tr>\n<td>评估语义忠实度</td>\n<td style=\"text-align: center;\">❌</td>\n<td style=\"text-align: center;\">部分</td>\n<td style=\"text-align: center;\">✅</td>\n</tr>\n<tr>\n<td>评估检索质量</td>\n<td style=\"text-align: center;\">❌</td>\n<td style=\"text-align: center;\">❌</td>\n<td style=\"text-align: center;\">✅</td>\n</tr>\n<tr>\n<td>可用于生产监控</td>\n<td style=\"text-align: center;\">受限</td>\n<td style=\"text-align: center;\">受限</td>\n<td style=\"text-align: center;\">✅</td>\n</tr>\n<tr>\n<td>与人类判断一致性</td>\n<td style=\"text-align: center;\">低</td>\n<td style=\"text-align: center;\">中</td>\n<td style=\"text-align: center;\">高</td>\n</tr>\n</tbody>\n</table></div>\n<p>RAGAS 的核心优势在于：(1) 无需标注数据即可评估，适合快速迭代和生产环境监控；(2) 通过结构化分解将评估任务简化，提高 LLM 评估的可靠性；(3) 三个维度分别覆盖生成器和检索器，提供全面的系统诊断能力。</p>",
      "quiz": {
        "q": "RAGAS 的 Faithfulness 指标为什么要先将答案分解为原子声明再逐条验证，而不是直接让 LLM 判断整个答案是否忠实？",
        "options": [
          "为了减少 LLM 的 API 调用次数，降低评估成本",
          "将复杂的整体判断拆解为多个简单的二元判断，降低 LLM 的认知负担，提高评估准确性",
          "因为 LLM 无法理解完整的答案文本，只能处理短句",
          "为了生成更多的训练数据用于微调评估模型"
        ],
        "answer": 1,
        "explain": "声明级分解将'整个答案是否忠实'这一复杂判断拆解为多个'单条声明是否可从上下文推断'的简单二元任务，实验表明这种结构化方法（95%一致率）远优于直接让 LLM 整体打分（72%）。"
      }
    },
    {
      "id": "rgb",
      "num": 18,
      "name": "RGB",
      "fullName": "RGB基准 (Retrieval-Augmented Generation Benchmark)",
      "year": "2023.09",
      "org": "Tsinghua",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2309.01431",
      "projectUrl": "",
      "category": "evaluation",
      "motivation": "诊断噪声鲁棒性与拒绝回答无解问题能力",
      "summary": "RGB 提出了一个检索增强生成基准，从噪声鲁棒性、负面拒绝、信息整合和反事实鲁棒性四个维度系统评估 LLM 利用外部检索文档的能力，揭示了当前 LLM 在 RAG 场景下的关键不足。",
      "keyPoints": [
        "定义 RAG 的 4 项核心能力：噪声鲁棒性（Noise Robustness）、负面拒绝（Negative Rejection）、信息整合（Information Integration）、反事实鲁棒性（Counterfactual Robustness）",
        "基于最新新闻文章构建 QA 实例，减少 LLM 内部知识带来的评估偏差",
        "使用搜索引擎（Google API）+ 稠密检索模型获取真实外部文档，模拟真实 RAG 场景",
        "共 600 个基础问题 + 200 个信息整合问题 + 200 个反事实鲁棒性问题，中英文各半",
        "评估 6 个主流 LLM：ChatGPT、ChatGLM-6B、ChatGLM2-6B、Vicuna-7B、Qwen-7B-Chat、BELLE-7B-2M",
        "4 种评估指标：准确率（Accuracy）、拒绝率（Rejection Rate）、错误检测率（Error Detection Rate）、错误纠正率（Error Correction Rate）",
        "关键发现：噪声比例超过 80% 时准确率显著下降；负面拒绝率最高仅 45%；信息整合无噪声时准确率最高仅 67%；LLM 极易被反事实文档误导"
      ],
      "detail": "<p><img alt=\"RGB 数据构建流程\" src=\"https://arxiv.org/html/2309.01431v2/x2.png\" />\n<em>图：RGB 数据构建流程，包括 QA 实例生成、搜索引擎检索和四个测试集的构建过程</em></p>\n<h5>评估流程伪代码</h5>\n<pre><code class=\"language-python\"># RGB 评估流程伪代码\ndef evaluate_rgb(model, testbed, noise_ratio):\n    for question, answer, documents in testbed:\n        # 1. 根据噪声比例采样文档\n        pos_docs = sample_positive(documents)\n        neg_docs = sample_negative(documents, ratio=noise_ratio)\n        context = pos_docs + neg_docs  # 共 5 篇文档\n\n        # 2. 构建 prompt（系统指令 + 文档 + 问题）\n        prompt = build_instruction(context, question)\n\n        # 3. 模型生成回答\n        response = model.generate(prompt)\n\n        # 4. 根据测试集类型评估\n        if testbed_type == &quot;noise_robustness&quot;:\n            score = exact_match(response, answer)  # 准确率\n        elif testbed_type == &quot;negative_rejection&quot;:\n            score = check_rejection(response)  # 拒绝率\n        elif testbed_type == &quot;information_integration&quot;:\n            score = exact_match(response, answer)  # 准确率\n        elif testbed_type == &quot;counterfactual&quot;:\n            score = check_error_detection(response)  # 错误检测率\n    return aggregate(scores)\n</code></pre>\n<h5>动机与背景</h5>\n<p>检索增强生成（RAG）是解决 LLM 幻觉和知识过时问题的关键技术路线——通过检索外部文档为 LLM 提供额外知识，使其生成更准确可靠的回答。然而，现实中的 RAG 面临三大挑战：</p>\n<ol>\n<li><strong>检索噪声</strong>：检索器并不完美，返回的文档中包含大量与问题相关但不含答案的噪声文档</li>\n<li><strong>生成不可靠</strong>：LLM 的生成行为不可预测，无法保证其会利用文档中的有用信息</li>\n<li><strong>虚假信息干扰</strong>：互联网上存在大量错误信息，LLM 容易被误导</li>\n</ol>\n<p>在 RGB 之前，缺乏一个系统性的基准来评估 LLM 在这些挑战下的表现。现有的 QA 基准（如 Natural Questions、TriviaQA）主要关注检索器性能，而非 LLM 利用检索文档的能力。RGB 填补了这一空白。</p>\n<h5>四项核心能力的定义与测试集构建</h5>\n<p><strong>噪声鲁棒性（Noise Robustness）</strong>：评估 LLM 在包含噪声文档时能否正确提取答案。测试集通过按不同比例（0%、20%、40%、60%、80%）采样负面文档来控制噪声水平。每个问题提供 5 篇外部文档。</p>\n<p><strong>负面拒绝（Negative Rejection）</strong>：评估当所有提供的文档都不包含答案时，LLM 能否拒绝回答而非编造答案。测试集中所有 5 篇文档均为负面文档（与问题相关但不含答案）。通过指令要求模型在信息不足时输出特定拒绝语句。</p>\n<p><strong>信息整合（Information Integration）</strong>：评估 LLM 能否从多篇文档中整合信息来回答复杂问题。通过扩展或改写基础问题使其答案涉及多个方面，例如将\"谁是 2023 年超级碗 MVP？\"改写为\"谁是 2022 和 2023 年超级碗的 MVP？\"，答案分散在不同文档中。</p>\n<p><strong>反事实鲁棒性（Counterfactual Robustness）</strong>：评估 LLM 能否识别外部文档中的事实错误。与前三项不同，此测试集基于 LLM 的内部知识构建——先确认 LLM 已知某知识，再提供包含篡改答案的文档，测试 LLM 是否会被误导。通过指令提醒模型检索信息可能存在风险。</p>\n<h5>数据构建方法</h5>\n<p>数据构建分三步：</p>\n<ol>\n<li>\n<p><strong>QA 实例生成</strong>：收集最新新闻文章，使用 ChatGPT 为每篇文章生成事件、问题和答案。使用最新新闻是为了减少 LLM 内部知识带来的评估偏差。生成后人工校验答案并过滤难以通过搜索引擎检索的数据。</p>\n</li>\n<li>\n<p><strong>搜索引擎检索</strong>：对每个问题使用 Google API 获取 10 个相关网页及摘要片段，同时将网页内容切分为最大 300 token 的文本块，使用稠密检索模型（中文用 m3e-base，英文用 all-mpnet-base-v2）选取 Top-30 匹配文本块。根据是否包含答案将文档分为正面文档和负面文档。</p>\n</li>\n<li>\n<p><strong>测试集构建</strong>：基于上述语料，按四项能力的需求分别构建测试集，调整噪声比例、文档组成和问题复杂度。</p>\n</li>\n</ol>\n<h5>评估指标设计</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>能力</th>\n<th>指标</th>\n<th>计算方式</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>噪声鲁棒性</td>\n<td>准确率（Accuracy）</td>\n<td>生成文本是否精确匹配答案</td>\n</tr>\n<tr>\n<td>信息整合</td>\n<td>准确率（Accuracy）</td>\n<td>生成文本是否精确匹配答案</td>\n</tr>\n<tr>\n<td>负面拒绝</td>\n<td>拒绝率（Rejection Rate）</td>\n<td>是否输出指定拒绝语句</td>\n</tr>\n<tr>\n<td>反事实鲁棒性</td>\n<td>错误检测率 + 错误纠正率</td>\n<td>是否识别错误 + 是否给出正确答案</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 关键：由于 LLM 常不严格遵循指令，对于拒绝率和错误检测率，除精确匹配外还使用 ChatGPT 进行辅助评估（Rej* 和 ED*），以更全面地捕捉模型的拒绝/检测行为。</div>\n<h5>核心实验结果与分析</h5>\n<p><strong>噪声鲁棒性</strong>：RAG 能有效提升 LLM 回答质量，但噪声比例超过 80% 时准确率显著下降。ChatGPT 从 96.33%（无噪声）降至 76.00%（80% 噪声），ChatGLM2-6B 从 91.33% 降至 57.33%。错误分析揭示三类典型错误：\n- <strong>长距离信息</strong>：问题信息与答案信息在文档中距离较远时，LLM 难以正确关联\n- <strong>证据不确定性</strong>：互联网上的推测性信息会误导 LLM，即使正确答案存在于文档中\n- <strong>概念混淆</strong>：文档中相似但不同的概念（如\"汽车收入\" vs \"总收入\"）导致 LLM 混淆</p>\n<p><strong>负面拒绝</strong>：这是 LLM 最薄弱的环节。英文最高拒绝率仅 45%（ChatGPT），中文最高仅 43.33%。精确匹配拒绝率更低（英文最高 31%，中文最高 8.67%），说明 LLM 难以严格遵循指令格式。LLM 极易被相关但无答案的文档误导而生成错误回答。</p>\n<p><strong>信息整合</strong>：即使无噪声，最高准确率仅达 60%（英文，Vicuna）和 67%（中文，Qwen）。加入噪声后性能下降更为显著——噪声比例 0.4 时即出现显著下降，而简单问题在 0.8 时才显著下降。错误分析发现三类特有错误：\n- <strong>合并错误</strong>（28%）：将两个子问题的答案合并为一个\n- <strong>忽略错误</strong>（28%）：只回答一个子问题而忽略另一个\n- <strong>错位错误</strong>（6%）：将一个子问题的文档错误地对应到另一个子问题</p>\n<p><strong>反事实鲁棒性</strong>：LLM 极难识别文档中的事实错误。ChatGPT 在有反事实文档时，中文准确率从 91% 骤降至 17%，英文从 89% 降至 9%。错误检测率极低（精确匹配最高仅 8%），即使 LLM 本身拥有正确知识，也会被检索到的错误文档覆盖。</p>\n<div class=\"warn-box\">⚠️ 注意：反事实鲁棒性的评估仅限于通过指令提醒模型注意潜在风险的场景。在实际应用中，若无此提醒，LLM 对虚假信息的抵抗力可能更弱。</div>\n<h5>与已有工作的区别</h5>\n<p>RGB 与此前的 RAG 评估工作有本质区别：</p>\n<ul>\n<li><strong>vs. 传统 QA 基准</strong>（Natural Questions、TriviaQA）：传统基准关注检索器性能，RGB 关注 LLM 利用检索文档的能力</li>\n<li><strong>vs. LLM 通用基准</strong>（MMLU、C-Eval）：通用基准评估 LLM 内部知识，RGB 评估 LLM 处理外部知识的能力</li>\n<li><strong>vs. 同期 RAG 评估</strong>（RAGAS、ARES）：RGB 更系统地定义了四项独立能力维度，且使用最新新闻减少知识泄露偏差</li>\n<li><strong>创新点</strong>：首次将 RAG 能力分解为四个可独立评估的维度，并提供了详细的错误分类分析</li>\n</ul>",
      "quiz": {
        "q": "在 RGB 基准的负面拒绝测试中，所有提供给 LLM 的文档具有什么特点？",
        "options": [
          "文档完全与问题无关",
          "文档与问题相关但不包含答案信息",
          "文档包含正确答案但被篡改",
          "文档来自不同语言"
        ],
        "answer": 1,
        "explain": "负面拒绝测试集中所有文档均为负面文档（negative documents），即与问题相关但不包含答案信息，用于评估 LLM 能否在无有用信息时拒绝回答而非编造答案。"
      }
    },
    {
      "id": "linearrag",
      "num": 19,
      "name": "LinearRAG",
      "fullName": "线性图谱检索增强 (Linear Graph Retrieval-Augmented Generation)",
      "year": "2026.01",
      "org": "Tsinghua/Alibaba",
      "parent": "graphrag",
      "paperUrl": "https://arxiv.org/abs/2412.14833",
      "projectUrl": "",
      "category": "frontier_2026",
      "motivation": "三图层级结构使索引成本线性增长，避开关系抽取",
      "summary": "LinearRAG 的核心目标是：三图层级结构使索引成本线性增长，避开关系抽取。",
      "keyPoints": [
        "核心动机：三图层级结构使索引成本线性增长，避开关系抽取",
        "演化来源：继承或改进自 graphrag",
        "代表机构：Tsinghua/Alibaba"
      ],
      "detail": "<p>三图层级结构使索引成本线性增长，避开关系抽取</p>"
    },
    {
      "id": "tm_rag",
      "num": 20,
      "name": "TM-RAG",
      "fullName": "Transformer-Mamba混合RAG (Transformer-Mamba RAG)",
      "year": "2026.02",
      "org": "King Saud University",
      "parent": "self_rag",
      "paperUrl": "https://link.springer.com/article/10.1007/s44443-026-00723-5",
      "projectUrl": "",
      "category": "frontier_2026",
      "motivation": "Mamba处理长程依赖，Transformer精细聚合证据",
      "summary": "TM-RAG 的核心目标是：Mamba处理长程依赖，Transformer精细聚合证据。",
      "keyPoints": [
        "核心动机：Mamba处理长程依赖，Transformer精细聚合证据",
        "演化来源：继承或改进自 self_rag",
        "代表机构：King Saud University"
      ],
      "detail": "<p>Mamba处理长程依赖，Transformer精细聚合证据</p>"
    },
    {
      "id": "videorag",
      "num": 21,
      "name": "VideoRAG",
      "fullName": "视频检索增强生成 (Video Retrieval-Augmented Generation)",
      "year": "2026.03",
      "org": "Zhejiang University",
      "parent": "rag",
      "paperUrl": "https://arxiv.org/abs/2501.09885",
      "projectUrl": "",
      "category": "frontier_2026",
      "motivation": "极长视频多模态编码器实现小时级上下文检索",
      "summary": "VideoRAG 的核心目标是：极长视频多模态编码器实现小时级上下文检索。",
      "keyPoints": [
        "核心动机：极长视频多模态编码器实现小时级上下文检索",
        "演化来源：继承或改进自 rag",
        "代表机构：Zhejiang University"
      ],
      "detail": "<p>极长视频多模态编码器实现小时级上下文检索</p>"
    },
    {
      "id": "bayesrag",
      "num": 22,
      "name": "BayesRAG",
      "fullName": "贝叶斯多模态RAG (Bayesian Multimodal RAG)",
      "year": "2026.01",
      "org": "KAIST",
      "parent": "videorag",
      "paperUrl": "https://arxiv.org/abs/2601.07329",
      "projectUrl": "",
      "category": "frontier_2026",
      "motivation": "概率性证据互证机制解决多模态保真度融合",
      "summary": "BayesRAG 的核心目标是：概率性证据互证机制解决多模态保真度融合。",
      "keyPoints": [
        "核心动机：概率性证据互证机制解决多模态保真度融合",
        "演化来源：继承或改进自 videorag",
        "代表机构：KAIST"
      ],
      "detail": "<p>概率性证据互证机制解决多模态保真度融合</p>"
    },
    {
      "id": "ssrag",
      "num": 23,
      "name": "SSRAG",
      "fullName": "结构化语义RAG (Structured-Semantic RAG)",
      "year": "2026.01",
      "org": "IBM Research",
      "parent": "self_rag",
      "paperUrl": "https://arxiv.org/abs/2601.12658",
      "projectUrl": "",
      "category": "frontier_2026",
      "motivation": "混合检索与智能路由解决语义漂移问题",
      "summary": "SSRAG 的核心目标是：混合检索与智能路由解决语义漂移问题。",
      "keyPoints": [
        "核心动机：混合检索与智能路由解决语义漂移问题",
        "演化来源：继承或改进自 self_rag",
        "代表机构：IBM Research"
      ],
      "detail": "<p>混合检索与智能路由解决语义漂移问题</p>"
    },
    {
      "id": "vig_rag",
      "num": 24,
      "name": "ViG-RAG",
      "fullName": "视频图谱RAG (Video Graph RAG)",
      "year": "2026.02",
      "org": "Seoul National University",
      "parent": "graphrag",
      "paperUrl": "https://ojs.aaai.org/index.php/AAAI/article/view/30471",
      "projectUrl": "",
      "category": "frontier_2026",
      "motivation": "概率时间知识图谱实现视频片段语义时间混合推理",
      "summary": "ViG-RAG 的核心目标是：概率时间知识图谱实现视频片段语义时间混合推理。",
      "keyPoints": [
        "核心动机：概率时间知识图谱实现视频片段语义时间混合推理",
        "演化来源：继承或改进自 graphrag",
        "代表机构：Seoul National University"
      ],
      "detail": "<p>概率时间知识图谱实现视频片段语义时间混合推理</p>"
    },
    {
      "id": "urag",
      "num": 25,
      "name": "URaG",
      "fullName": "统一检索生成 (Unified Retrieval and Generation)",
      "year": "2026.02",
      "org": "Fudan University",
      "parent": "videorag",
      "paperUrl": "https://ojs.aaai.org/index.php/AAAI/article/view/39729",
      "projectUrl": "",
      "category": "frontier_2026",
      "motivation": "多模态长文档统一架构，检索生成端到端优化",
      "summary": "URaG 的核心目标是：多模态长文档统一架构，检索生成端到端优化。",
      "keyPoints": [
        "核心动机：多模态长文档统一架构，检索生成端到端优化",
        "演化来源：继承或改进自 videorag",
        "代表机构：Fudan University"
      ],
      "detail": "<p>多模态长文档统一架构，检索生成端到端优化</p>"
    },
    {
      "id": "mg_crag",
      "num": 26,
      "name": "MG-CRAG",
      "fullName": "多粒度纠正式RAG (Multi-Granular Corrective RAG)",
      "year": "2026.03",
      "org": "Peking University",
      "parent": "crag",
      "paperUrl": "https://link.springer.com/article/10.1007/s10115-026-02778-2",
      "projectUrl": "",
      "category": "frontier_2026",
      "motivation": "多粒度检索评估器融合，弱监督微调改进CRAG",
      "summary": "MG-CRAG 在 CRAG 框架基础上引入双层多粒度检索评估机制——段落级评估器（PLRE）先筛选相关文档，句子级评估器（SLRE）再对文档内部句子进行细粒度过滤——两个评估器均通过\"T5-GTR 编码 + Autoencoder 聚类伪标签 + ResNet 残差分类头\"的弱监督流水线训练，仅需约 180 条人工标注即可完成，在 ARC-Challenge 和 PopQA 基准上取得了与 CRAG 可比甚至更优的性能。",
      "keyPoints": [
        "<strong>双层多粒度评估</strong>：段落级评估器（PLRE）对整篇检索文档评分，句子级评估器（SLRE）将文档拆分为句子后逐句评分，两级联动实现从粗到细的检索质量过滤",
        "<strong>弱监督训练流水线</strong>：仅需约 180 条人工标注样本，通过 T5-GTR 编码 → Autoencoder 降维聚类 → KMeans 伪标签生成 → ResNet 分类头训练的四步流水线，避免了 CRAG 依赖大规模标注数据微调 T5-large 的开销",
        "<strong>三分类决策</strong>：评估器将检索结果分为 HIGH（高度相关）、AMBIGUOUS（不确定）、LOW（不相关）三类，对应不同的知识处理策略",
        "<strong>三种过滤机制</strong>：strict（仅保留 HIGH 文档中的 HIGH 句子）、moderate（保留非 LOW 句子）、lenient（合并 AMBIGUOUS 文档的句子），适应不同精度-召回权衡需求",
        "<strong>ResNet 残差分类头</strong>：9 个残差块（768→2048→…→3），使用 LeakyReLU 和 Dropout，替代 CRAG 中的 T5 全量微调，参数量和训练成本大幅降低",
        "<strong>LangGraph 工作流</strong>：基于 LangGraph 构建 retrieve → grade_documents → (web_search | generate) → END 的有向图推理流程"
      ],
      "detail": "<h5>框架总览</h5>\n<pre><code>┌─────────────────────────────────────────────────────────────────┐\n│                     MG-CRAG 推理流程                             │\n│                                                                 │\n│  Query ──→ Contriever 检索 Top-K 文档                           │\n│              │                                                  │\n│              ▼                                                  │\n│  ┌─────────────────────────┐                                    │\n│  │  PLRE (段落级评估器)      │  对每篇文档: T5-GTR编码 → ResNet  │\n│  │  → HIGH / AMBIGUOUS / LOW │  → 三分类                        │\n│  └─────────┬───────────────┘                                    │\n│            │                                                    │\n│     ┌──────┼──────────┐                                         │\n│     │      │          │                                         │\n│   HIGH   AMBIG      LOW                                         │\n│     │      │          │                                         │\n│     ▼      ▼          ✗ (丢弃)                                  │\n│  ┌─────────────────────────┐                                    │\n│  │  SLRE (句子级评估器)      │  拆分为句子 → 逐句 T5-GTR → ResNet │\n│  │  → HIGH / AMBIGUOUS / LOW │  → 三分类过滤                     │\n│  └─────────┬───────────────┘                                    │\n│            │                                                    │\n│            ▼                                                    │\n│  ┌─────────────────────────┐                                    │\n│  │  Reranking              │  multi-qa-mpnet-base-cos-v1        │\n│  │  → 余弦相似度排序 Top-3   │                                   │\n│  └─────────┬───────────────┘                                    │\n│            │                                                    │\n│     ┌──────┴──────┐                                             │\n│     │             │                                             │\n│  high_strips&gt;0  high_strips=0                                   │\n│     │             │                                             │\n│     ▼             ▼                                             │\n│  生成回答       Web搜索补充                                      │\n│  (≤10条时也     → 生成回答                                       │\n│   补充Web搜索)                                                   │\n└─────────────────────────────────────────────────────────────────┘\n</code></pre>\n<h5>弱监督训练流水线</h5>\n<p>MG-CRAG 的核心创新在于其弱监督训练流水线，仅需极少量人工标注即可训练出有效的检索评估器：</p>\n<pre><code>Step 0: 文本编码\n  &quot;qnli question: {q} sentence: {doc}&quot; → T5-GTR-large → 768维嵌入向量\n\nStep 1: 聚类伪标签生成\n  768维嵌入 → Autoencoder(768→2048→1024→256→9) 降维\n           → KMeans(k=3) 聚类\n           → 利用180条标注样本映射聚类标签到 {HIGH, AMBIGUOUS, LOW}\n           → 生成全量伪标签\n\nStep 2: ResNet 分类头训练\n  768维嵌入 → ResNet(9残差块, 768→2048→...→3)\n           → 50 epochs, batch=10, Adam lr=0.001\n           → 在伪标签上训练三分类\n\nStep 3: VLLM 推理\n  LangGraph 工作流 + 训练好的 PLRE/SLRE 评估器 → 端到端问答\n</code></pre>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># MG-CRAG 核心推理流程\ndef mg_crag(query, retriever, plre, slre, reranker, generator, mechanism=&quot;moderate&quot;):\n    # Step 1: 检索\n    documents = retriever.retrieve(query, top_k=10)\n\n    # Step 2: 段落级评估 (PLRE)\n    high_docs, ambig_docs, low_docs = [], [], []\n    for doc in documents:\n        embedding = t5_gtr_encode(f&quot;qnli question: {query} sentence: {doc}&quot;)\n        label = plre.classify(embedding)  # ResNet → {HIGH, AMBIGUOUS, LOW}\n        if label == HIGH:\n            high_docs.append(doc)\n        elif label == AMBIGUOUS:\n            ambig_docs.append(doc)\n        # LOW 文档直接丢弃\n\n    # Step 3: 句子级评估 (SLRE) — 对通过 PLRE 的文档拆句后逐句评估\n    high_strips, medium_strips = [], []\n    relevant_docs = high_docs + ambig_docs\n    for doc in relevant_docs:\n        sentences = split_into_sentences(doc)\n        for sent in sentences:\n            embedding = t5_gtr_encode(f&quot;qnli question: {query} sentence: {sent}&quot;)\n            label = slre.classify(embedding)\n            if label == HIGH:\n                high_strips.append(sent)\n            elif label == AMBIGUOUS:\n                medium_strips.append(sent)\n\n    # Step 4: 根据 mechanism 策略过滤\n    if mechanism == &quot;strict&quot;:\n        # 仅保留 HIGH 文档中的 HIGH 句子\n        strips = [s for s in high_strips if s from high_docs]\n    elif mechanism == &quot;moderate&quot;:\n        # 保留所有 HIGH + AMBIGUOUS 句子\n        strips = high_strips + medium_strips\n    elif mechanism == &quot;lenient&quot;:\n        # 将 AMBIGUOUS 文档的句子也合并到 high_strips\n        strips = high_strips + medium_strips  # 更宽松的合并策略\n\n    # Step 5: 重排序 — 按与 query 的余弦相似度排序\n    strips = reranker.sort_by_similarity(query, strips)[:3]  # Top-3\n\n    # Step 6: 决策 — 是否需要 Web 搜索补充\n    if len(strips) &gt; 0:\n        web_search = &quot;Yes&quot; if len(strips) &lt;= 10 else &quot;No&quot;\n        return generator.generate(query, strips, web_search)\n    else:\n        # 无高质量片段，使用 medium 片段 + Web 搜索\n        fallback = reranker.sort_by_similarity(query, medium_strips)[:3]\n        return generator.generate(query, fallback, web_search=&quot;Yes&quot;)\n</code></pre>\n<pre><code class=\"language-python\"># 弱监督伪标签生成流程\ndef generate_pseudo_labels(labeled_data, unlabeled_data):\n    &quot;&quot;&quot;\n    labeled_data: (~180条) [(query, doc, label), ...]  label ∈ {0:LOW, 1:AMBIGUOUS, 2:HIGH}\n    unlabeled_data: (大量) [(query, doc), ...]\n    &quot;&quot;&quot;\n    # Step 0: 编码\n    all_texts = [f&quot;qnli question: {q} sentence: {d}&quot; for q, d, _ in labeled_data]\n    all_texts += [f&quot;qnli question: {q} sentence: {d}&quot; for q, d in unlabeled_data]\n    embeddings = t5_gtr_large.encode(all_texts)  # → [N, 768]\n\n    # Step 1: Autoencoder 降维\n    autoencoder = Autoencoder(input_dim=768)  # encoder: 768→2048→1024→256→9\n    # 双重损失训练: 重建损失 + 分类损失(仅对标注样本)\n    train_autoencoder(autoencoder, embeddings, labeled_labels)\n    reduced = autoencoder.encoder(embeddings)  # → [N, 9]\n\n    # Step 2: KMeans 聚类\n    kmeans = KMeans(n_clusters=3, max_iter=2000).fit(reduced)\n    cluster_labels = kmeans.labels_\n\n    # Step 3: 标签映射 — 利用标注样本将聚类ID映射到语义标签\n    label_mapping = map_clusters_to_labels(\n        cluster_labels[:len(labeled_data)],\n        true_labels=[l for _, _, l in labeled_data]\n    )\n    pseudo_labels = [label_mapping[c] for c in cluster_labels]\n    return pseudo_labels\n</code></pre>\n<h5>核心组件详解</h5>\n<p><strong>1. T5-GTR 编码器（Sentence Encoder）</strong></p>\n<p>MG-CRAG 使用 <code>sentence-transformers/gtr-t5-large</code> 作为文本编码器，将 query-document 对编码为 768 维向量。输入格式采用 QNLI（Question Natural Language Inference）模板：</p>\n<pre><code>&quot;qnli question: {query} sentence: {document}&quot;\n</code></pre>\n<div class=\"key-point\">💡 关键设计：使用 QNLI 格式而非简单拼接，是因为 T5-GTR 在预训练时已经学习了问题-文本对的语义关系，QNLI 格式能更好地激活这种能力。</div>\n<p><strong>2. ResNet 残差分类头</strong></p>\n<p>替代 CRAG 中对 T5-large 全量微调的方案，MG-CRAG 冻结 T5-GTR 编码器，仅训练一个轻量级残差网络分类头：</p>\n<pre><code>输入: 768维\n  → Linear(768, 2048) + LeakyReLU(0.01) + Dropout(0.2)\n  → [残差块 × 9]: 2048→1024→512→256→128→64→32→16→8\n      每个残差块: Linear + LeakyReLU + Dropout + 残差连接(通过投影对齐维度)\n  → Linear(8, 3) + Softmax\n输出: 3类概率 [P(LOW), P(AMBIGUOUS), P(HIGH)]\n</code></pre>\n<div class=\"warn-box\">⚠️ 注意：每个残差块中维度递减（如 2048→1024），因此残差连接需要通过额外的线性投影层将 shortcut 的维度对齐到输出维度，而非标准 ResNet 中的恒等映射。</div>\n<p><strong>3. Autoencoder 聚类伪标签</strong></p>\n<p>这是 MG-CRAG 弱监督训练的核心创新。Autoencoder 同时承担降维和分类两个任务：</p>\n<ul>\n<li><strong>编码器</strong>：768 → 2048 → 1024 → 256 → 9（每层 BatchNorm + ReLU）</li>\n<li><strong>解码器</strong>：9 → 256 → 1024 → 2048 → 768（对称结构）</li>\n<li><strong>分类层</strong>：9 → 3 + Softmax（从瓶颈层直接分类）</li>\n<li><strong>双重损失</strong>：重建损失（MSE，全量数据）+ 分类损失（CrossEntropy，仅标注数据）</li>\n</ul>\n<p>训练完成后，Autoencoder 的编码器将 768 维嵌入压缩到 9 维，在此低维空间上运行 KMeans(k=3) 聚类，再利用 180 条标注样本将聚类 ID 映射到语义标签 {LOW, AMBIGUOUS, HIGH}。</p>\n<div class=\"key-point\">💡 关键洞察：Autoencoder 的双重损失设计使其在降维时同时保留了分类相关的判别信息，使得后续 KMeans 聚类能产生更有意义的伪标签。这比单纯的无监督聚类或单纯的半监督学习都更有效。</div>\n<p><strong>4. 三种过滤机制（Mechanism）</strong></p>\n<p>MG-CRAG 提供三种不同严格程度的过滤策略，适应不同场景需求：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>机制</th>\n<th>PLRE 通过条件</th>\n<th>SLRE 保留条件</th>\n<th>特点</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><strong>strict</strong></td>\n<td>仅 HIGH 文档</td>\n<td>仅 HIGH 句子</td>\n<td>高精度、低召回</td>\n</tr>\n<tr>\n<td><strong>moderate</strong></td>\n<td>HIGH + AMBIGUOUS</td>\n<td>HIGH + AMBIGUOUS 句子</td>\n<td>平衡</td>\n</tr>\n<tr>\n<td><strong>lenient</strong></td>\n<td>HIGH + AMBIGUOUS</td>\n<td>合并 AMBIGUOUS 文档句子到 high_strips</td>\n<td>高召回、低精度</td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>5. Reranking 与决策</strong></p>\n<p>通过 PLRE + SLRE 双层过滤后的句子片段，使用 <code>multi-qa-mpnet-base-cos-v1</code> 模型计算与原始 query 的余弦相似度进行重排序，取 Top-3 作为最终上下文。</p>\n<p>决策逻辑：\n- 若存在高质量片段（high_strips &gt; 0）：使用 Top-3 片段生成回答；若片段数 ≤ 10 则额外触发 Web 搜索补充\n- 若无高质量片段：使用 medium 片段的 Top-3 + 强制触发 Web 搜索</p>\n<h5>与 CRAG 的关键区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>CRAG</th>\n<th>MG-CRAG</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>评估粒度</td>\n<td>单层（文档级）</td>\n<td>双层（段落级 PLRE + 句子级 SLRE）</td>\n</tr>\n<tr>\n<td>评估器架构</td>\n<td>T5-large 全量微调</td>\n<td>T5-GTR 冻结 + ResNet 分类头</td>\n</tr>\n<tr>\n<td>训练数据需求</td>\n<td>大规模标注数据</td>\n<td>~180 条标注 + 弱监督伪标签</td>\n</tr>\n<tr>\n<td>分类类别</td>\n<td>Correct / Incorrect / Ambiguous</td>\n<td>HIGH / AMBIGUOUS / LOW（语义等价）</td>\n</tr>\n<tr>\n<td>知识精炼</td>\n<td>文档 → strips → 评估器逐条过滤</td>\n<td>文档 → PLRE 过滤 → 句子 → SLRE 过滤</td>\n</tr>\n<tr>\n<td>过滤灵活性</td>\n<td>单一策略</td>\n<td>三种机制（strict/moderate/lenient）</td>\n</tr>\n<tr>\n<td>重排序</td>\n<td>无显式重排序</td>\n<td>multi-qa-mpnet 余弦相似度排序</td>\n</tr>\n<tr>\n<td>推理框架</td>\n<td>自定义流程</td>\n<td>LangGraph 有向图</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 核心优势：MG-CRAG 的弱监督方案将标注成本从数千条降低到约 180 条，同时通过双层评估实现了比 CRAG 更精细的检索质量控制。ResNet 分类头的参数量远小于 T5-large 全量微调，训练效率显著提升。</div>\n<h5>实验结果</h5>\n<p>在 CRAG 基准数据集上的主要结果（基于 VLLM 推理）：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>ARC-Challenge (Acc)</th>\n<th>PopQA (Acc)</th>\n<th>PubHealth (Acc)</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Standard RAG</td>\n<td>—</td>\n<td>—</td>\n<td>—</td>\n</tr>\n<tr>\n<td>CRAG</td>\n<td>—</td>\n<td>54.9</td>\n<td>72.4</td>\n</tr>\n<tr>\n<td><strong>MG-CRAG</strong></td>\n<td><strong>68.85</strong></td>\n<td><strong>59.89</strong></td>\n<td>可比</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"warn-box\">⚠️ 注意：由于论文全文在 Springer 付费墙后，上述部分数值来自代码仓库中的实验配置和 README 描述。MG-CRAG 在 PopQA 上达到 59.89%，在 ARC-Challenge 上达到 68.85%，同时显著降低了对 Web 搜索的依赖频率。</div>\n<p>硬件环境：NVIDIA L4 GPU（22GB 显存），使用 VLLM 进行高效推理。</p>\n<h5>LangGraph 工作流</h5>\n<pre><code class=\"language-python\"># MG-CRAG 的 LangGraph 有向图定义\nfrom langgraph.graph import END, StateGraph\n\nworkflow = StateGraph(GraphState)\n\n# 添加节点\nworkflow.add_node(&quot;retrieve&quot;, retrieve)           # Contriever 检索\nworkflow.add_node(&quot;grade_documents&quot;, grade_documents)  # PLRE + SLRE 双层评估\nworkflow.add_node(&quot;generate&quot;, generate)            # VLLM 生成\nworkflow.add_node(&quot;web_search&quot;, web_search_node)   # Web 搜索补充\n\n# 定义边\nworkflow.set_entry_point(&quot;retrieve&quot;)\nworkflow.add_edge(&quot;retrieve&quot;, &quot;grade_documents&quot;)\nworkflow.add_conditional_edges(\n    &quot;grade_documents&quot;,\n    decide_to_generate,  # 根据 high_strips 数量决定\n    {\n        &quot;web_search&quot;: &quot;web_search&quot;,   # 无高质量片段 → Web 搜索\n        &quot;generate&quot;: &quot;generate&quot;,        # 有高质量片段 → 直接生成\n    }\n)\nworkflow.add_edge(&quot;web_search&quot;, &quot;generate&quot;)\nworkflow.add_edge(&quot;generate&quot;, END)\n</code></pre>",
      "quiz": {
        "q": "MG-CRAG 的弱监督训练流水线中，Autoencoder 的双重损失包含哪两部分？",
        "options": [
          "对比损失 + 分类损失",
          "重建损失 + 分类损失",
          "三元组损失 + 重建损失",
          "KL 散度损失 + 交叉熵损失"
        ],
        "answer": 1,
        "explain": "Autoencoder 同时优化两个目标：(1) 重建损失（MSE），确保编码器-解码器能还原原始 768 维嵌入，保留信息完整性；(2) 分类损失（CrossEntropy），仅对约 180 条标注样本计算，引导瓶颈层学习判别性表示。这种双重损失设计使降维后的 9 维空间既保留了数据结构，又具备分类判别能力，从而让后续 KMeans 聚类产生更有意义的伪标签。"
      }
    },
    {
      "id": "qwen3_embedding",
      "num": 27,
      "name": "Qwen3-Embedding",
      "fullName": "Qwen3嵌入模型 (Qwen3 Text Embedding)",
      "year": "2026.04",
      "org": "Alibaba",
      "parent": "e5",
      "paperUrl": "https://qwenlm.github.io/blog/qwen3-embedding/",
      "projectUrl": "",
      "category": "frontier_2026",
      "motivation": "8B参数MTEB 70.6，支持32K上下文多语言检索",
      "summary": "Qwen3-Embedding 的核心目标是：8B参数MTEB 70.6，支持32K上下文多语言检索。",
      "keyPoints": [
        "核心动机：8B参数MTEB 70.6，支持32K上下文多语言检索",
        "演化来源：继承或改进自 e5",
        "代表机构：Alibaba"
      ],
      "detail": "<p>8B参数MTEB 70.6，支持32K上下文多语言检索</p>"
    },
    {
      "id": "raguard",
      "num": 28,
      "name": "RAGUARD",
      "fullName": "RAG鲁棒性评测基准 (RAG Robustness Benchmark)",
      "year": "2026.05",
      "org": "Stanford/Google",
      "parent": "rgb",
      "paperUrl": "https://arxiv.org/abs/2410.20992",
      "projectUrl": "",
      "category": "frontier_2026",
      "motivation": "首个误导性检索鲁棒性基准，测试冲突信息判断力",
      "summary": "RAGUARD 的核心目标是：首个误导性检索鲁棒性基准，测试冲突信息判断力。",
      "keyPoints": [
        "核心动机：首个误导性检索鲁棒性基准，测试冲突信息判断力",
        "演化来源：继承或改进自 rgb",
        "代表机构：Stanford/Google"
      ],
      "detail": "<p>首个误导性检索鲁棒性基准，测试冲突信息判断力</p>"
    }
  ],
  "categories": {
    "foundation": {
      "label": "奠基算法",
      "color": "#22a06b"
    },
    "architecture": {
      "label": "架构改进",
      "color": "#5b63d3"
    },
    "evaluation": {
      "label": "评测体系",
      "color": "#e8820c"
    },
    "frontier_2026": {
      "label": "2026前沿",
      "color": "#d32f2f"
    }
  },
  "projectUrls": {}
};
