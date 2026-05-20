/**
 * mm_retrieval-data.js — 由 pipeline/build.py 于 2026-05-20 16:56:35 自动生成。
 * 源文件：content/mm/mm_retrieval.md
 * ⚠️  请勿手动修改；如需更新，修改源文档后重新编译。
 */
window.PAGE_CONFIG = {
  "meta": {
    "domain": "multimodal",
    "topic_id": "mm_retrieval",
    "topic_name": "多模态检索",
    "page_title": "多模态检索算法总结",
    "page_subtitle": "2026-05-20 版",
    "page_desc": "从早期跨模态对齐到现代大规模预训练及高效向量检索的发展脉络，涵盖图文检索、向量数据库与ANN检索等核心技术方向。",
    "page_icon": "🔍",
    "hero_pills": [
      "跨模态对齐",
      "图文检索",
      "向量数据库",
      "ANN检索"
    ],
    "count_pill": "{count} 个算法",
    "image_base": "../../content/mm/mm_retrieval/assets/",
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
        "id": "vse_pp",
        "x": 2018,
        "y": 1,
        "category": "foundation"
      },
      {
        "id": "scan",
        "x": 2018,
        "y": 1.5,
        "category": "foundation"
      },
      {
        "id": "oscar",
        "x": 2020,
        "y": 1.5,
        "category": "foundation"
      },
      {
        "id": "vilt",
        "x": 2021,
        "y": 1.5,
        "category": "foundation"
      },
      {
        "id": "clip",
        "x": 2021,
        "y": 2.5,
        "category": "dual_encoder"
      },
      {
        "id": "align",
        "x": 2021,
        "y": 2,
        "category": "dual_encoder"
      },
      {
        "id": "siglip",
        "x": 2023,
        "y": 2,
        "category": "dual_encoder"
      },
      {
        "id": "blip",
        "x": 2022,
        "y": 3,
        "category": "fusion_model"
      },
      {
        "id": "blip2",
        "x": 2023,
        "y": 3,
        "category": "fusion_model"
      },
      {
        "id": "imagebind",
        "x": 2023,
        "y": 3.5,
        "category": "fusion_model"
      },
      {
        "id": "pq",
        "x": 2010,
        "y": 4,
        "category": "vector_ann"
      },
      {
        "id": "hnsw",
        "x": 2016,
        "y": 4.5,
        "category": "vector_ann"
      },
      {
        "id": "ivf",
        "x": 2003,
        "y": 4,
        "category": "vector_ann"
      },
      {
        "id": "qwen3_vl_emb",
        "x": 2026,
        "y": 5,
        "category": "frontier_2026"
      },
      {
        "id": "retrv_r1",
        "x": 2026,
        "y": 5.5,
        "category": "frontier_2026"
      },
      {
        "id": "urag",
        "x": 2026,
        "y": 5.2,
        "category": "frontier_2026"
      },
      {
        "id": "unime_v2",
        "x": 2026,
        "y": 5.8,
        "category": "frontier_2026"
      }
    ],
    "edges": [
      {
        "from": "scan",
        "to": "oscar",
        "label": "对象锚点"
      },
      {
        "from": "oscar",
        "to": "vilt",
        "label": "纯Transformer"
      },
      {
        "from": "clip",
        "to": "align",
        "label": "噪声数据"
      },
      {
        "from": "clip",
        "to": "siglip",
        "label": "Sigmoid损失"
      },
      {
        "from": "clip",
        "to": "blip",
        "label": "CapFilt"
      },
      {
        "from": "blip",
        "to": "blip2",
        "label": "Q-Former"
      },
      {
        "from": "clip",
        "to": "imagebind",
        "label": "多模态扩展"
      },
      {
        "from": "pq",
        "to": "ivf",
        "label": "倒排索引"
      },
      {
        "from": "blip2",
        "to": "qwen3_vl_emb",
        "label": "统一框架"
      },
      {
        "from": "clip",
        "to": "retrv_r1",
        "label": "推理驱动"
      },
      {
        "from": "blip2",
        "to": "urag",
        "label": "检索生成"
      },
      {
        "from": "imagebind",
        "to": "unime_v2",
        "label": "MLLM标注"
      }
    ],
    "milestones": [
      "clip",
      "hnsw",
      "retrv_r1"
    ]
  },
  "algos": [
    {
      "id": "vse_pp",
      "num": 1,
      "name": "VSE++",
      "fullName": "视觉语义嵌入改进版 (VSE++)",
      "year": "2018",
      "org": "U Toronto",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/1707.05612",
      "projectUrl": "",
      "category": "foundation",
      "motivation": "困难负样本挖掘增强区分能力",
      "summary": "VSE++ 的核心目标是：困难负样本挖掘增强区分能力。",
      "keyPoints": [
        "核心动机：困难负样本挖掘增强区分能力",
        "代表机构：U Toronto"
      ],
      "detail": "<p>困难负样本挖掘增强区分能力</p>"
    },
    {
      "id": "scan",
      "num": 2,
      "name": "SCAN",
      "fullName": "堆叠交叉注意力 (Stacked Cross Attention)",
      "year": "2018",
      "org": "Microsoft",
      "parent": "—",
      "paperUrl": "http://openaccess.thecvf.com/content_ECCV_2018/html/Kuang-Huei_Lee_Stacked_Cross_Attention_ECCV_2018_paper.html",
      "projectUrl": "",
      "category": "foundation",
      "motivation": "细粒度图像区域与文本对齐",
      "summary": "SCAN 提出堆叠交叉注意力机制（Stacked Cross Attention），通过两阶段注意力推断图像区域与句子词语之间的潜在细粒度对应关系，在不依赖显式对齐标注的情况下实现了图文跨模态检索的 SOTA 性能，在 Flickr30K 和 MS-COCO 上大幅超越此前方法。",
      "keyPoints": [
        "<strong>堆叠交叉注意力（SCA）</strong>：两阶段注意力机制——第一阶段计算跨模态注意力权重，第二阶段基于注意力加权特征评估区域/词语重要性",
        "<strong>两种对称变体</strong>：Image-Text（以图像区域为查询注意文本词语）和 Text-Image（以词语为查询注意图像区域），捕获不同方面的对齐信息",
        "<strong>两种聚合策略</strong>：LogSumExp（LSE）池化关注最难对齐片段，Average（AVG）池化关注全局对齐，可组合使用",
        "<strong>底层注意力（Bottom-Up Attention）</strong>：使用 Faster R-CNN 提取 36 个显著目标区域特征作为图像表示，替代传统网格特征",
        "<strong>硬负样本三元组损失</strong>：在 mini-batch 中选取最难负样本进行训练，提升判别能力",
        "<strong>模型集成</strong>：不同变体（t-i/i-t × AVG/LSE）捕获数据不同方面，集成后进一步提升性能",
        "<strong>可解释性</strong>：注意力权重可视化直观展示模型学到的区域-词语对应关系"
      ],
      "detail": "<h5>核心架构示意图</h5>\n<p><img alt=\"SCAN Image-Text Stacked Cross Attention\" src=\"https://ar5iv.labs.arxiv.org/html/1803.08024v1/assets/x1.png\" />\n<em>图：Image-Text 堆叠交叉注意力示意。第一阶段对每个图像区域计算其对句子各词语的注意力，得到加权文本特征；第二阶段通过比较区域特征与其对应文本特征的相似度，确定各区域的重要性权重。</em></p>\n<p><img alt=\"SCAN Text-Image Stacked Cross Attention\" src=\"https://ar5iv.labs.arxiv.org/html/1803.08024v1/assets/x2.png\" />\n<em>图：Text-Image 堆叠交叉注意力示意。方向相反——第一阶段对每个词语计算其对图像各区域的注意力，第二阶段评估各词语的重要性。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># SCAN 核心算法伪代码\ndef scan_similarity(V, E, mode=&quot;image-text&quot;, pool=&quot;avg&quot;):\n    &quot;&quot;&quot;\n    V: 图像区域特征 [k, D]  (Faster R-CNN 提取的 k=36 个区域)\n    E: 句子词语特征 [n, D]  (bi-GRU 编码的 n 个词)\n    &quot;&quot;&quot;\n    # Step 0: 计算跨模态余弦相似度矩阵\n    cos_sim = cosine(V, E)  # [k, n]\n\n    if mode == &quot;image-text&quot;:\n        # === Image-Text: 以图像区域为查询 ===\n        # Stage 1: 对每个区域 v_i, 注意句子中的词语\n        # 阈值归一化: 将负值截断为0\n        cos_sim_clamp = clamp(cos_sim, min=0)  # [ReLU]\n        alpha = softmax(lambda_1 * cos_sim_clamp, dim=1)  # [k, n] 对词语维度\n        a_t = alpha @ E  # [k, D] 每个区域对应的加权文本特征\n\n        # Stage 2: 评估每个区域的重要性\n        R = cosine(V, a_t)  # [k] 每个区域与其文本对应的相似度\n\n    elif mode == &quot;text-image&quot;:\n        # === Text-Image: 以词语为查询 ===\n        cos_sim_clamp = clamp(cos_sim, min=0)\n        beta = softmax(lambda_2 * cos_sim_clamp, dim=0)  # [k, n] 对区域维度\n        a_v = beta.T @ V  # [n, D] 每个词语对应的加权图像特征\n\n        R = cosine(E, a_v)  # [n] 每个词语与其图像对应的相似度\n\n    # 最终聚合: 将所有片段相似度汇总为全局相似度\n    if pool == &quot;avg&quot;:\n        S = mean(R)\n    elif pool == &quot;lse&quot;:\n        S = log(mean(exp(lambda * R)))  # LogSumExp\n\n    return S\n\n# 训练: 硬负样本三元组损失\ndef triplet_loss_hard(I, T, margin=0.2):\n    S_pos = scan_similarity(I, T)\n    T_hard_neg = argmax_{T' != T} scan_similarity(I, T')  # 最难负文本\n    I_hard_neg = argmax_{I' != I} scan_similarity(I', T)  # 最难负图像\n    loss = max(0, margin - S_pos + scan_similarity(I, T_hard_neg)) \\\n         + max(0, margin - S_pos + scan_similarity(I_hard_neg, T))\n    return loss\n</code></pre>\n<h5>动机与背景</h5>\n<p>传统的图文跨模态检索方法（如 VSE++、Order Embeddings）将整张图像和整个句子分别编码为单一的全局向量，然后在联合嵌入空间中计算相似度。这种方法存在一个根本性缺陷：<strong>它忽略了图像区域与句子词语之间的细粒度对应关系</strong>。</p>\n<div class=\"key-point\">💡 关键直觉：当人们描述一张图片时，句子中的每个词语通常对应图像中的某个特定区域——\"狗\"对应图中的狗、\"红色\"对应某个物体的颜色属性。这种对应关系是潜在的（latent），没有显式标注，但对准确理解图文关系至关重要。</div>\n<p>SCAN 的核心思想是：<strong>不直接比较全局表示，而是先推断图像区域与词语之间的潜在对齐，再基于对齐结果计算整体相似度</strong>。</p>\n<h5>核心机制：堆叠交叉注意力</h5>\n<p>SCAN 的\"堆叠\"体现在两阶段串联的注意力计算：</p>\n<p><strong>第一阶段——跨模态注意力对齐：</strong> 给定图像区域特征 \\(V = \\{v_1, ..., v_k\\}\\) 和词语特征 \\(E = \\{e_1, ..., e_n\\}\\)，首先计算所有区域-词语对的余弦相似度矩阵。以 Image-Text 变体为例，对每个图像区域 \\(v_i\\)，通过 softmax 归一化得到其对各词语的注意力权重：</p>\n<p>$$\\alpha_{i,j} = \\frac{\\exp(\\lambda_1 [\\cos(v_i, e_j)]_+)}{\\sum_{j'=1}^{n} \\exp(\\lambda_1 [\\cos(v_i, e_{j'})]_+)}$$</p>\n<p>其中 \\([\\cdot]_+ = \\max(\\cdot, 0)\\) 是阈值截断（CLAMP），将语义不相关的负相似度归零，防止噪声干扰。\\(\\lambda_1\\) 是逆温度参数，控制注意力分布的尖锐程度。然后计算加权文本特征：</p>\n<p>$$a_i^t = \\sum_{j=1}^{n} \\alpha_{i,j} \\cdot e_j$$</p>\n<div class=\"warn-box\">⚠️ 注意：阈值归一化（CLAMP）是一个关键设计。论文消融实验表明，不使用 CLAMP 会导致性能显著下降，因为负相似度会引入语义无关的噪声。</div>\n<p><strong>第二阶段——重要性评估：</strong> 将每个区域 \\(v_i\\) 与其对应的加权文本特征 \\(a_i^t\\) 计算余弦相似度 \\(R(v_i, a_i^t)\\)，得到该区域的\"对齐质量分数\"。直觉上，如果一个区域能在文本中找到高度匹配的语义对应，其分数就高。</p>\n<p><strong>最终聚合：</strong> 将所有片段的对齐分数聚合为全局图文相似度。论文提出两种池化策略：</p>\n<p>$$S_{AVG}(I, T) = \\frac{1}{k} \\sum_{i=1}^{k} R(v_i, a_i^t) \\quad \\text{(平均池化)}$$</p>\n<p>$$S_{LSE}(I, T) = \\log\\left(\\sum_{i=1}^{k} \\frac{\\exp(\\lambda_2 \\cdot R(v_i, a_i^t))}{k}\\right)^{1/\\lambda_2} \\quad \\text{(LogSumExp 池化)}$$</p>\n<p>AVG 池化平等对待所有区域，关注全局一致性；LSE 池化是 max 的平滑近似，更关注最匹配的区域片段——类似于\"只要有一个区域高度匹配，就认为整体相似\"。</p>\n<h5>对称变体与模型集成</h5>\n<p>SCAN 提出两种对称的注意力方向：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>变体</th>\n<th>第一阶段查询</th>\n<th>第一阶段键</th>\n<th>第二阶段评估</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><strong>Image-Text (i-t)</strong></td>\n<td>图像区域 \\(v_i\\)</td>\n<td>词语 \\(e_j\\)</td>\n<td>区域重要性</td>\n</tr>\n<tr>\n<td><strong>Text-Image (t-i)</strong></td>\n<td>词语 \\(e_j\\)</td>\n<td>图像区域 \\(v_i\\)</td>\n<td>词语重要性</td>\n</tr>\n</tbody>\n</table></div>\n<p>两种变体捕获不同方面的对齐信息。论文发现将不同变体的预测相似度取平均进行集成（如 t-i AVG + i-t LSE）能进一步提升性能，这表明它们具有互补性。</p>\n<h5>图像与文本表示</h5>\n<ul>\n<li><strong>图像端</strong>：采用 Anderson et al. 提出的 Bottom-Up Attention，即使用在 Visual Genome 上预训练的 Faster R-CNN 检测图像中的显著区域（默认 36 个 ROI），提取每个区域的 2048 维特征，经线性变换映射到 1024 维联合空间。</li>\n<li><strong>文本端</strong>：词语先通过 300 维词嵌入，再经双向 GRU 编码，取各时间步的隐状态作为词语特征（1024 维）。</li>\n</ul>\n<h5>训练策略</h5>\n<p>采用硬负样本三元组损失（Hard Negative Triplet Loss）。对于正样本对 \\((I, T)\\)，在 mini-batch 中选取最难的负样本：</p>\n<p>$$\\hat{T}_h = \\arg\\max_{d \\neq T} S(I, d), \\quad \\hat{I}_h = \\arg\\max_{m \\neq I} S(m, T)$$</p>\n<p>$$\\mathcal{L}_{hard}(I, T) = [\\alpha - S(I, T) + S(I, \\hat{T}_h)]_+ + [\\alpha - S(I, T) + S(\\hat{I}_h, T)]_+$$</p>\n<p>其中 \\(\\alpha = 0.2\\) 为间隔超参数。使用 Adam 优化器，学习率分阶段衰减。</p>\n<h5>实验结果</h5>\n<p>SCAN 在 Flickr30K 和 MS-COCO 两个基准上全面超越此前 SOTA：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>数据集</th>\n<th>指标</th>\n<th>此前 SOTA</th>\n<th>SCAN (最佳单模型)</th>\n<th>SCAN (集成)</th>\n<th>相对提升</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Flickr30K</td>\n<td>句子检索 R@1</td>\n<td>55.6 (DPC)</td>\n<td>67.9 (i-t AVG)</td>\n<td>67.4</td>\n<td>+22.1%</td>\n</tr>\n<tr>\n<td>Flickr30K</td>\n<td>图像检索 R@1</td>\n<td>41.1 (SCO)</td>\n<td>45.8 (t-i AVG)</td>\n<td>48.6</td>\n<td>+18.2%</td>\n</tr>\n<tr>\n<td>MS-COCO 1K</td>\n<td>句子检索 R@1</td>\n<td>69.9 (SCO)</td>\n<td>72.7 (t-i AVG)</td>\n<td>74.8</td>\n<td>+7.0%</td>\n</tr>\n<tr>\n<td>MS-COCO 5K</td>\n<td>句子检索 R@1</td>\n<td>42.8 (SCO)</td>\n<td>50.4 (t-i AVG)</td>\n<td>51.4</td>\n<td>+17.8%</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 关键发现：消融实验证实了几个重要设计选择的有效性：(1) 堆叠交叉注意力本身是性能提升的核心来源；(2) CLAMP 阈值归一化至关重要；(3) 不同的池化策略和注意力方向具有互补性。</div>",
      "quiz": {
        "q": "SCAN 中堆叠交叉注意力的第一阶段（以 Image-Text 变体为例）的作用是什么？",
        "options": [
          "直接计算图像和句子的全局相似度",
          "对每个图像区域，通过注意力机制找到其在句子中最相关的词语语义表示",
          "使用 Faster R-CNN 检测图像中的显著区域",
          "通过 GRU 编码句子中每个词语的上下文特征"
        ],
        "answer": 1,
        "explain": "第一阶段的核心是跨模态注意力对齐：对每个图像区域 v_i，计算其对所有词语的注意力权重，加权求和得到该区域对应的文本语义表示 a_i^t，从而建立区域-词语的软对齐关系。"
      }
    },
    {
      "id": "oscar",
      "num": 3,
      "name": "OSCAR",
      "fullName": "对象语义对齐预训练 (OSCAR)",
      "year": "2020",
      "org": "Microsoft",
      "parent": "scan",
      "paperUrl": "https://arxiv.org/abs/2004.06165",
      "projectUrl": "",
      "category": "foundation",
      "motivation": "对象标签作为跨模态对齐锚点",
      "summary": "OSCAR 提出将图像中检测到的**对象标签**（object tags）作为锚点引入视觉-语言预训练的输入三元组，以显式桥接视觉区域特征与文本语义空间，显著缓解了跨模态对齐的弱监督难题，在 6 项 V+L 理解与生成任务上取得了当时的 SOTA。",
      "keyPoints": [
        "<strong>输入三元组表示</strong>：将传统 VLP 的 \\((w, v)\\) 二元输入扩展为 \\((w, q, v)\\) 三元组，其中 \\(w\\) 为文本词嵌入、\\(q\\) 为对象标签词嵌入、\\(v\\) 为图像区域特征",
        "<strong>对象标签作为锚点</strong>：利用 Faster R-CNN 检测的高精度对象标签，在语言语义空间中天然与文本词汇共享表示，从而为视觉-语言对齐提供显式锚点",
        "<strong>双视角预训练目标</strong>：",
        "<strong>字典视角（Masked Token Loss）</strong>：对文本词和对象标签联合做 15% 随机掩码预测",
        "<strong>模态视角（Contrastive Loss）</strong>：以 50% 概率替换对象标签序列构造负样本，训练二分类器判别图文匹配",
        "<strong>预训练语料</strong>：基于 COCO、Conceptual Captions、SBU、Flickr30k、GQA 等构建 6.5M 图文三元组",
        "<strong>两种模型规模</strong>：Oscar_B（BERT-base, H=768）和 Oscar_L（BERT-large, H=1024），均以 BERT 参数初始化",
        "<strong>下游任务 SOTA</strong>：在 VQA、GQA、Image-Text Retrieval、Image Captioning、NoCaps、NLVR2 等 6+ 项任务上刷新纪录"
      ],
      "detail": "<h5>核心架构示意图</h5>\n<p><img alt=\"OSCAR Pipeline 总览\" src=\"https://ar5iv.labs.arxiv.org/html/2004.06165/assets/x1.png\" />\n<em>图 1：OSCAR 流程总览。模型以三元组 [word tokens, object tags, region features] 为输入，使用 Masked Token Loss 和 Contrastive Loss 进行预训练，并在 5 项理解任务和 2 项生成任务上微调。</em></p>\n<p><img alt=\"OSCAR 架构详图\" src=\"https://ar5iv.labs.arxiv.org/html/2004.06165/assets/x5.png\" />\n<em>图 3：OSCAR 架构详图。输入三元组可从两个视角理解——模态视角（Modality View）将 \\(q\\) 归入图像侧，字典视角（Dictionary View）将 \\(q\\) 归入语言侧。对象标签 \\(q\\) 同时存在于两个视角中，起到跨模态桥梁作用。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># OSCAR 预训练伪代码\n# 输入: 图文对数据集 D, 预训练好的 BERT 参数 θ_BERT, Faster R-CNN 检测器\n\nfor (image, text) in D:\n    # Step 1: 提取视觉特征\n    regions, tags = FasterRCNN(image)         # v'∈R^{K×2048}, tags=[dog, couch, ...]\n    v = LinearProject(concat(regions, positions))  # v∈R^{K×H}\n    q = BERTWordEmbed(tags)                   # 对象标签的词嵌入\n    w = BERTWordEmbed(text)                   # 文本的词嵌入\n\n    # Step 2: 构造输入三元组\n    # 字典视角: h = [w, q] (语言空间), v (视觉空间)\n    # 模态视角: w (语言模态), h' = [q, v] (图像模态)\n\n    # Step 3: Masked Token Loss (字典视角)\n    h = concat(w, q)\n    h_masked = random_mask(h, prob=0.15)      # 15% token 替换为 [MASK]\n    loss_mtl = -log P(h_i | h_\\i, v)         # 基于上下文+图像预测被掩码 token\n\n    # Step 4: Contrastive Loss (模态视角)\n    if random() &lt; 0.5:\n        q_polluted = sample_random_tags(D)    # 50% 概率替换为随机标签\n        y = 0                                  # 负样本\n    else:\n        q_polluted = q\n        y = 1                                  # 正样本\n    h_prime = concat(q_polluted, v)\n    cls_repr = Transformer([w, h_prime])[CLS]  # [CLS] 融合表示\n    loss_c = -log P(y | FC(cls_repr))          # 二分类损失\n\n    # Step 5: 联合优化\n    loss = loss_mtl + loss_c\n    optimizer.step(loss)\n</code></pre>\n<h5>动机与背景</h5>\n<p>现有视觉-语言预训练（VLP）方法（如 ViLBERT、LXMERT、UNITER 等）将图像区域特征 \\(v\\) 与文本词嵌入 \\(w\\) 简单拼接后送入 Transformer，依赖自注意力机制以\"暴力\"方式学习跨模态对齐。然而，这种方式面临两个核心挑战：</p>\n<ol>\n<li><strong>语义空间不对齐</strong>：视觉区域特征和文本词嵌入分别处于不同的语义空间，模型需要从零学习跨空间映射；</li>\n<li><strong>缺乏显式锚定</strong>：没有标注哪些区域对应哪些词汇，VLP 本质上是弱监督学习，且视觉区域通常过采样、含噪声和歧义。</li>\n</ol>\n<p>OSCAR 的关键洞察是：<strong>图像中的显著对象可以被现代目标检测器准确识别，且这些对象往往在配对文本中被提及</strong>。在 MS COCO 数据集上，49.7% 的图文对至少共享 1 个对象，22.2% 共享 2 个，12.9% 共享 3 个。因此，对象标签天然可作为视觉与语言之间的\"锚点\"。</p>\n<h5>核心机制：三元组输入与双视角</h5>\n<p>OSCAR 的核心创新在于将输入从二元组 \\((w, v)\\) 扩展为三元组 \\((w, q, v)\\)，其中 \\(q\\) 是对象标签的词嵌入序列。这一设计的精妙之处在于 <strong>\\(q\\) 同时属于两个模态</strong>：</p>\n<ul>\n<li>从<strong>语义空间</strong>角度，\\(q\\) 是文本词汇，与 \\(w\\) 共享 BERT 的语言语义空间，二者之间的对齐可以直接利用预训练 BERT 的语言理解能力；</li>\n<li>从<strong>信息来源</strong>角度，\\(q\\) 来自图像的目标检测，与 \\(v\\) 共享视觉信息来源。</li>\n</ul>\n<div class=\"key-point\">💡 <strong>关键直觉</strong>：对象标签 \\(q\\) 像一座桥梁——它在语言空间中与文本 \\(w\\) 天然可比较（因为都是词），同时在信息来源上与视觉特征 \\(v\\) 紧密关联（因为来自同一张图）。这使得模型无需从零学习跨模态映射，而是通过 \\(q\\) 这个\"中间人\"大幅降低对齐难度。</div>\n<p>形式化地，输入三元组可从两个视角解读：</p>\n<p>$$\\boldsymbol{x} \\triangleq [\\underbrace{\\boldsymbol{w}}_{\\text{language}}, \\underbrace{\\boldsymbol{q}, \\boldsymbol{v}}_{\\text{image}}] = [\\underbrace{\\boldsymbol{w}, \\boldsymbol{q}}_{\\text{language}}, \\underbrace{\\boldsymbol{v}}_{\\text{image}}] \\triangleq \\boldsymbol{x}'$$</p>\n<h5>预训练目标详解</h5>\n<p><strong>1. Masked Token Loss（字典视角）</strong></p>\n<p>从字典视角出发，将 \\(w\\) 和 \\(q\\) 视为同一语言空间中的离散 token 序列 \\(h = [w, q]\\)，对其进行 15% 的随机掩码，利用上下文 token 和图像区域特征 \\(v\\) 来预测被掩码的 token：</p>\n<p>$$\\mathcal{L}_{\\text{MTL}} = -\\mathbb{E}_{(v, h) \\sim \\mathcal{D}} \\log p(h_i | h_{\\backslash i}, v)$$</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：与标准 BERT MLM 不同，这里的掩码范围包括对象标签 \\(q\\)，这意味着模型不仅需要理解语言上下文，还需要利用视觉信息来推断被掩码的对象名称，从而实现视觉接地（visual grounding）。</div>\n<p><strong>2. Contrastive Loss（模态视角）</strong></p>\n<p>从模态视角出发，将 \\(h' = [q, v]\\) 视为图像模态的表示，\\(w\\) 为语言模态。通过以 50% 概率将 \\(q\\) 替换为数据集中随机采样的标签序列来构造负样本，然后在 \\([CLS]\\) 位置的融合表示上训练一个二分类器：</p>\n<p>$$\\mathcal{L}_{\\text{C}} = -\\mathbb{E}_{(h', w) \\sim \\mathcal{D}} \\log p(y | f(h', w))$$</p>\n<p>其中 \\(y=1\\) 表示原始匹配对，\\(y=0\\) 表示被\"污染\"的对。这一损失迫使模型学习区分正确的图文对齐与错误的对齐。</p>\n<p><strong>联合目标</strong>：</p>\n<p>$$\\mathcal{L}_{\\text{Pre-training}} = \\mathcal{L}_{\\text{MTL}} + \\mathcal{L}_{\\text{C}}$$</p>\n<h5>视觉特征提取</h5>\n<p>OSCAR 使用 Faster R-CNN 提取每张图像 \\(K\\) 个区域的特征：\n- 区域视觉特征 \\(v' \\in \\mathbb{R}^{P}\\)（\\(P=2048\\)）\n- 区域位置编码 \\(z \\in \\mathbb{R}^{R}\\)（\\(R=4\\) 或 \\(6\\)，包含左上/右下坐标及宽高）\n- 拼接后通过线性投影 \\(\\mathbf{W}\\) 映射到与词嵌入相同的维度 \\(H\\)</p>\n<p>同时，Faster R-CNN 输出高置信度的对象标签，作为 \\(q\\) 的来源。</p>\n<h5>与传统 VLP 方法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>传统 VLP（ViLBERT/UNITER 等）</th>\n<th>OSCAR</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>输入形式</td>\n<td>二元组 \\((w, v)\\)</td>\n<td>三元组 \\((w, q, v)\\)</td>\n</tr>\n<tr>\n<td>对齐方式</td>\n<td>纯自注意力暴力对齐</td>\n<td>对象标签作为显式锚点</td>\n</tr>\n<tr>\n<td>预训练目标</td>\n<td>MLM + ITM（图文匹配）</td>\n<td>MTL（含标签掩码）+ Contrastive Loss</td>\n</tr>\n<tr>\n<td>负样本构造</td>\n<td>替换整张图或整段文本</td>\n<td>仅替换对象标签序列</td>\n</tr>\n<tr>\n<td>语义空间</td>\n<td>视觉和语言各自独立</td>\n<td>标签在语言空间中统一表示</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 <strong>核心优势</strong>：当移除对象标签 \\(q\\) 时，OSCAR 退化为传统 VLP 方法。\\(q\\) 的引入几乎不增加计算成本（仅多了几个文本 token），但通过在语言空间中提供显式的视觉-语言锚点，大幅提升了对齐学习效率。</div>\n<h5>下游任务适配</h5>\n<p>OSCAR 在微调阶段支持两类下游任务：\n- <strong>理解任务</strong>（VQA、GQA、NLVR2、Image-Text Retrieval）：在 \\([CLS]\\) 表示上添加任务特定的分类头\n- <strong>生成任务</strong>（Image Captioning、NoCaps）：采用 seq2seq 微调方式生成文本</p>\n<p>在所有 6+ 项任务上，OSCAR 均取得了当时的 SOTA 结果，验证了对象标签锚点策略的通用有效性。</p>",
      "quiz": {
        "q": "OSCAR 中对象标签（object tags）在预训练中的核心作用是什么？",
        "options": [
          "替代视觉区域特征，减少计算量",
          "作为跨模态锚点，桥接视觉区域特征与文本语义空间",
          "仅用于数据增强，构造更多训练样本",
          "作为额外的监督信号，直接预测图像类别"
        ],
        "answer": 1,
        "explain": "OSCAR 的核心创新是将对象标签作为锚点（anchor points），它们在语言空间中与文本词汇共享表示，同时在信息来源上与视觉特征关联，从而显式桥接两个模态的语义空间，降低跨模态对齐的学习难度。"
      }
    },
    {
      "id": "vilt",
      "num": 4,
      "name": "ViLT",
      "fullName": "视觉语言Transformer (ViLT)",
      "year": "2021",
      "org": "KAIST",
      "parent": "oscar",
      "paperUrl": "https://proceedings.mlr.press/v139/kim21k.html",
      "projectUrl": "",
      "category": "foundation",
      "motivation": "纯Transformer去除目标检测器",
      "summary": "ViLT 的核心目标是：纯Transformer去除目标检测器。",
      "keyPoints": [
        "核心动机：纯Transformer去除目标检测器",
        "演化来源：继承或改进自 oscar",
        "代表机构：KAIST"
      ],
      "detail": "<p>纯Transformer去除目标检测器</p>"
    },
    {
      "id": "clip",
      "num": 5,
      "name": "CLIP",
      "fullName": "对比语言图像预训练 (CLIP)",
      "year": "2021",
      "org": "OpenAI",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2103.00020",
      "projectUrl": "",
      "category": "dual_encoder",
      "motivation": "大规模对比学习实现零样本迁移",
      "summary": "CLIP 的核心目标是：大规模对比学习实现零样本迁移。",
      "keyPoints": [
        "核心动机：大规模对比学习实现零样本迁移",
        "代表机构：OpenAI"
      ],
      "detail": "<p>大规模对比学习实现零样本迁移</p>"
    },
    {
      "id": "align",
      "num": 6,
      "name": "ALIGN",
      "fullName": "大规模图像噪声文本嵌入 (ALIGN)",
      "year": "2021",
      "org": "Google",
      "parent": "clip",
      "paperUrl": "https://arxiv.org/abs/2102.05918",
      "projectUrl": "",
      "category": "dual_encoder",
      "motivation": "18亿规模噪声数据对比学习",
      "summary": "ALIGN 的核心目标是：18亿规模噪声数据对比学习。",
      "keyPoints": [
        "核心动机：18亿规模噪声数据对比学习",
        "演化来源：继承或改进自 clip",
        "代表机构：Google"
      ],
      "detail": "<p>18亿规模噪声数据对比学习</p>"
    },
    {
      "id": "siglip",
      "num": 7,
      "name": "SigLIP",
      "fullName": "Sigmoid损失语言图像预训练 (SigLIP)",
      "year": "2023",
      "org": "Google",
      "parent": "clip",
      "paperUrl": "http://openaccess.thecvf.com/content/ICCV2023/html/Zhai_Sigmoid_Loss_for_Language_Image_Pre-Training_ICCV_2023_paper.html",
      "projectUrl": "",
      "category": "dual_encoder",
      "motivation": "Sigmoid损失提升内存效率",
      "summary": "SigLIP 提出用 **sigmoid 损失**替代 CLIP 中的 softmax 对比损失进行语言-图像预训练，将图文匹配从多类分类问题转化为逐对二分类问题，消除了对全局归一化的依赖，从而实现更高的内存效率和更简单的分布式实现，在小批量场景下显著优于 softmax 基线。",
      "keyPoints": [
        "<strong>Sigmoid 对比损失</strong>：将图文对匹配建模为独立的二分类问题，对 batch 内所有 \\(n^2\\) 个图文对分别计算 sigmoid 损失，无需 softmax 的全局归一化",
        "<strong>可学习偏置项 \\(b\\)</strong>：在相似度计算中引入 learnable bias（初始化为 \\(-\\log(n)\\) 量级），自动平衡正负样本比例（1 正 vs \\(n-1\\) 负）",
        "<strong>两种实验设置</strong>：SigLiT（锁定预训练 ViT 图像塔，仅训练文本塔）和 SigLIP（从头训练双塔）",
        "<strong>Chunked Sigmoid Loss</strong>：分块计算损失，无需在单设备上聚合全局 batch，内存复杂度从 \\(O(B^2)\\) 降至 \\(O(B^2/K)\\)（\\(K\\) 为设备数）",
        "<strong>批量大小研究</strong>：系统实验表明 32k batch size 即可达到接近最优性能，远小于此前认为需要的超大 batch",
        "<strong>超参数鲁棒性</strong>：sigmoid 损失在不同 batch size 下无需调整学习率和权重衰减，默认超参即为最优或接近最优",
        "<strong>多语言扩展 mSigLIP</strong>：在 WebLI 数据集上训练多语言版本，覆盖 36 种语言的跨模态检索"
      ],
      "detail": "<h5>方法总览</h5>\n<p><img alt=\"SigLIP 框架对比图\" src=\"https://ar5iv.labs.arxiv.org/html/2303.15343v2/assets/x1.png\" />\n<em>图：Softmax 对比损失（左）vs Sigmoid 对比损失（右）。Softmax 需要在整行/列上做归一化（需要全局通信），而 Sigmoid 对每个 cell 独立计算损失。</em></p>\n<p>SigLIP 的核心思想非常直观：传统 CLIP 使用 softmax 对比损失（InfoNCE），需要对 batch 内所有样本做全局归一化。这意味着在多设备分布式训练时，必须在所有设备间同步完整的相似度矩阵。SigLIP 将其替换为 sigmoid 损失，每个图文对独立判断\"是否匹配\"，彻底消除了全局依赖。</p>\n<h5>损失函数设计</h5>\n<p><strong>Softmax 对比损失（CLIP 基线）：</strong></p>\n<p>传统的图文对比学习使用 InfoNCE 损失，对 batch 内 \\(n\\) 个图文对：</p>\n<p>$$\\mathcal{L}_{\\text{softmax}} = -\\frac{1}{n}\\sum_{i=1}^{n}\\left[\\log\\frac{e^{x_i \\cdot y_i / \\tau}}{\\sum_{j=1}^{n} e^{x_i \\cdot y_j / \\tau}} + \\log\\frac{e^{x_i \\cdot y_i / \\tau}}{\\sum_{j=1}^{n} e^{x_j \\cdot y_i / \\tau}}\\right]\n$$</p>\n<p>其中 \\(x_i, y_i\\) 分别是图像和文本的归一化嵌入，\\(\\tau\\) 是温度参数。关键问题在于分母中的求和 <strong>必须遍历 batch 内所有样本</strong>，在分布式训练中需要跨设备聚合。</p>\n<p><strong>Sigmoid 对比损失（SigLIP 提出）：</strong></p>\n<p>$$\\mathcal{L}_{\\text{sigmoid}} = -\\frac{1}{n}\\sum_{i=1}^{n}\\sum_{j=1}^{n}\\log\\frac{1}{1 + e^{z_{ij}(-x_i \\cdot y_j \\cdot t + b)}}\n$$</p>\n<p>其中：\n- \\(z_{ij} = \\begin{cases} 1 & \\text{if } i = j \\text{（正样本对）} \\\\ -1 & \\text{if } i \\neq j \\text{（负样本对）} \\end{cases}\\)\n- \\(t\\) 是可学习的温度参数（对应 \\(1/\\tau\\)）\n- \\(b\\) 是可学习的偏置项</p>\n<div class=\"key-point\">💡 <strong>关键直觉</strong>：Sigmoid 损失将每个图文对视为一个独立的二分类问题——\"这张图和这段文字是否匹配？\"。正样本对（对角线）标签为 1，负样本对（非对角线）标签为 -1。每个 cell 的损失计算完全独立，不依赖同行/同列的其他值。</div>\n<h5>偏置项 \\(b\\) 的作用</h5>\n<p>偏置项 \\(b\\) 是 SigLIP 的一个精妙设计。在一个 batch 中，正样本对有 \\(n\\) 个，而负样本对有 \\(n^2 - n\\) 个，正负比例约为 \\(1 : (n-1)\\)。如果没有偏置项，sigmoid 函数在零点处输出 0.5，这意味着模型初始化时会将所有对都预测为\"匹配\"，导致训练不稳定。</p>\n<p>偏置项 \\(b\\) 初始化为 \\(-\\log(n) \\approx -10\\)（当 \\(n = 32768\\) 时），使得初始时 sigmoid 输出接近 0（即\"不匹配\"），与负样本占绝大多数的先验一致。论文实验表明，\\(b\\) 的初始化值对最终性能影响不大（在 \\(-10\\) 到 \\(-15\\) 范围内结果稳定），但训练过程中 \\(b\\) 会收敛到约 \\(-10\\) 附近。</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：偏置项 \\(b\\) 的角色类似于逻辑回归中的截距项，它补偿了正负样本的类别不平衡。这与 Focal Loss 中处理类别不平衡的思路异曲同工。</div>\n<h5>Chunked Sigmoid Loss 分布式实现</h5>\n<pre><code class=\"language-python\"># Chunked Sigmoid Loss 伪代码\n# 假设 K 个设备，每个设备持有 n/K 个样本\n# 设备 k 上的图像嵌入: img_emb[k], 文本嵌入: txt_emb[k]\n\ndef chunked_sigmoid_loss(img_emb, txt_emb, t, b):\n    &quot;&quot;&quot;每个设备独立计算局部损失，无需聚合全局相似度矩阵&quot;&quot;&quot;\n    local_loss = 0\n    # 本地图像 vs 所有文本（通过 all-gather 获取文本嵌入）\n    for k in range(K):\n        txt_chunk = all_gather(txt_emb)[k]  # 获取第k个设备的文本\n        # 计算局部相似度矩阵 (n/K × n/K)\n        logits = img_emb @ txt_chunk.T * t + b\n        # 构造标签：只有当 chunk_k 是本设备时对角线为正\n        labels = get_labels(k, device_id)  # 1 for pos, -1 for neg\n        # Sigmoid 损失：每个元素独立计算\n        local_loss += -log_sigmoid(labels * logits).sum()\n    return local_loss / (n * n)\n</code></pre>\n<div class=\"key-point\">💡 <strong>关键优势</strong>：Softmax 损失需要在单个设备上构建完整的 \\(n \\times n\\) 相似度矩阵来计算归一化分母，内存为 \\(O(n^2)\\)。Chunked sigmoid 损失将矩阵分成 \\(K \\times K\\) 个块，每个设备只需处理 \\(K\\) 个大小为 \\((n/K) \\times (n/K)\\) 的块，内存降至 \\(O(n^2/K)\\)。</div>\n<h5>与 Softmax 对比损失的关键区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>Softmax (CLIP)</th>\n<th>Sigmoid (SigLIP)</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>损失类型</td>\n<td>多类交叉熵</td>\n<td>逐对二分类</td>\n</tr>\n<tr>\n<td>归一化</td>\n<td>全局（跨 batch）</td>\n<td>无（每对独立）</td>\n</tr>\n<tr>\n<td>分布式通信</td>\n<td>需要聚合全局矩阵</td>\n<td>仅需 all-gather 嵌入</td>\n</tr>\n<tr>\n<td>内存复杂度</td>\n<td>\\(O(B^2)\\)</td>\n<td>\\(O(B^2/K)\\)</td>\n</tr>\n<tr>\n<td>小 batch 性能</td>\n<td>较差</td>\n<td>显著更优</td>\n</tr>\n<tr>\n<td>超参数敏感性</td>\n<td>需按 batch 调参</td>\n<td>默认超参即可</td>\n</tr>\n<tr>\n<td>偏置项</td>\n<td>无</td>\n<td>可学习偏置 \\(b\\)</td>\n</tr>\n</tbody>\n</table></div>\n<h5>实验关键发现</h5>\n<p><strong>1. Sigmoid 在小 batch 下优势显著：</strong> 在 SigLiT 设置（锁定预训练 ViT-L/16 图像塔）下，batch size 为 512 时 sigmoid 比 softmax 高 3.0%（72.5% vs 69.5%），随着 batch 增大差距缩小，在 128k 时两者基本持平。</p>\n<p><strong>2. 32k 是性价比最优 batch size：</strong> 论文系统实验了从 512 到 1M 的 batch size，发现 32k 即可达到接近最优性能（84.2% vs 84.7%@1M），而所需计算资源远小于超大 batch。</p>\n<p><strong>3. 从头训练（SigLIP）同样有效：</strong> 在 WebLI 数据集上从头训练 ViT-B/16，SigLIP 在 ImageNet zero-shot 上达到 73.4%（batch=32k, 36B examples），优于同等设置的 softmax 基线。</p>\n<p><strong>4. 噪声鲁棒性：</strong> 在人工注入标签噪声的实验中，sigmoid 损失比 softmax 更鲁棒，在 40% 噪声率下仍保持合理性能。</p>",
      "quiz": {
        "q": "SigLIP 中引入可学习偏置项 b 的主要目的是什么？",
        "options": [
          "加速模型收敛",
          "补偿正负样本的严重不平衡（1个正样本 vs n-1个负样本）",
          "替代温度参数 τ 的作用",
          "防止梯度消失问题"
        ],
        "answer": 1,
        "explain": "在 batch size 为 n 的对比学习中，每个 anchor 有 1 个正样本和 n-1 个负样本。偏置项 b 初始化为约 -log(n)，使 sigmoid 初始输出偏向'不匹配'，与负样本占多数的先验一致，从而稳定训练。"
      }
    },
    {
      "id": "blip",
      "num": 8,
      "name": "BLIP",
      "fullName": "自举语言图像预训练 (BLIP)",
      "year": "2022",
      "org": "Salesforce",
      "parent": "clip",
      "paperUrl": "https://proceedings.mlr.press/v162/li22n.html",
      "projectUrl": "",
      "category": "fusion_model",
      "motivation": "CapFilt机制提升数据质量",
      "summary": "BLIP 的核心目标是：CapFilt机制提升数据质量。",
      "keyPoints": [
        "核心动机：CapFilt机制提升数据质量",
        "演化来源：继承或改进自 clip",
        "代表机构：Salesforce"
      ],
      "detail": "<p>CapFilt机制提升数据质量</p>"
    },
    {
      "id": "blip2",
      "num": 9,
      "name": "BLIP-2",
      "fullName": "自举语言图像预训练v2 (BLIP-2)",
      "year": "2023",
      "org": "Salesforce",
      "parent": "blip",
      "paperUrl": "https://proceedings.mlr.press/v202/li23q",
      "projectUrl": "",
      "category": "fusion_model",
      "motivation": "Q-Former连接冻结编码器与LLM",
      "summary": "BLIP-2 提出了一种通用且计算高效的视觉-语言预训练方法，通过轻量级的 Querying Transformer（Q-Former）分两阶段桥接冻结的图像编码器与冻结的大语言模型，以极少的可训练参数（最少 104M）在多项零样本视觉-语言任务上超越了参数量大 54 倍的 Flamingo80B。",
      "keyPoints": [
        "<strong>Q-Former 架构</strong>：轻量级 Transformer（188M 参数），包含 32 个可学习查询向量（768 维），通过交叉注意力从冻结图像编码器中提取固定数量的视觉特征",
        "<strong>两阶段预训练策略</strong>：第一阶段从冻结图像编码器引导视觉-语言表征学习（ITC + ITG + ITM），第二阶段从冻结 LLM 引导视觉到语言的生成学习",
        "<strong>三种互补的预训练目标</strong>：Image-Text Contrastive Learning（ITC）、Image-grounded Text Generation（ITG）、Image-Text Matching（ITM），通过不同的自注意力掩码策略在同一架构中实现",
        "<strong>冻结骨干网络</strong>：图像编码器（ViT-L/14, ViT-g/14）和 LLM（OPT, FlanT5）全程冻结，仅训练 Q-Former 和线性投影层",
        "<strong>兼容 Decoder-only 和 Encoder-Decoder LLM</strong>：分别支持 OPT 系列和 FlanT5 系列，通过全连接层将 Q-Former 输出投影到 LLM 的文本嵌入空间",
        "<strong>大规模预训练数据</strong>：使用 129M 图像（COCO、Visual Genome、CC3M、CC12M、SBU、LAION400M 子集），共 1.29 亿图文对",
        "<strong>零样本 SOTA</strong>：VQAv2 上达到 65.0%（超 Flamingo80B 8.7%），同时可训练参数仅为其 1/54"
      ],
      "detail": "<h5>整体架构</h5>\n<p><img alt=\"BLIP-2 整体框架\" src=\"https://ar5iv.labs.arxiv.org/html/2301.12597/assets/x1.png\" />\n<em>图 1：BLIP-2 框架总览。第一阶段从冻结图像编码器引导表征学习，第二阶段从冻结 LLM 引导生成学习。Q-Former 作为两者之间的桥梁。</em></p>\n<p>BLIP-2 的核心思想是：<strong>不从头联合训练视觉和语言模型，而是利用一个轻量级的中间模块（Q-Former）来桥接已有的强大冻结模型</strong>。这种设计的动机来自两个观察：</p>\n<ol>\n<li><strong>端到端训练代价极高</strong>：视觉-语言模型的规模不断增长，端到端预训练需要大量计算资源</li>\n<li><strong>灾难性遗忘风险</strong>：如果微调 LLM，可能导致其语言生成能力退化</li>\n</ol>\n<div class=\"key-point\">💡 关键：BLIP-2 的\"Bootstrapping\"体现在逐步利用冻结模型的能力——先从图像编码器\"引导\"出视觉表征，再从 LLM\"引导\"出生成能力，而非同时学习两者。</div>\n<h5>Q-Former 架构详解</h5>\n<p><img alt=\"Q-Former 架构\" src=\"https://ar5iv.labs.arxiv.org/html/2301.12597/assets/x2.png\" />\n<em>图 2：Q-Former 架构及第一阶段预训练目标。左侧为图像 Transformer，右侧为文本 Transformer，两者共享自注意力层。</em></p>\n<p>Q-Former 由两个共享自注意力层的 Transformer 子模块组成：</p>\n<ol>\n<li>\n<p><strong>图像 Transformer</strong>：以一组可学习的查询向量 \\(\\mathbf{Z} \\in \\mathbb{R}^{32 \\times 768}\\) 作为输入，通过交叉注意力层与冻结图像编码器的输出特征交互。这些查询向量充当\"信息瓶颈\"，将高维视觉信息压缩为固定数量（32 个）的紧凑表征。</p>\n</li>\n<li>\n<p><strong>文本 Transformer</strong>：同时作为文本编码器和文本解码器，其功能由自注意力掩码控制。它与图像 Transformer <strong>共享自注意力层</strong>，使得查询向量可以同时关注视觉和文本信息。</p>\n</li>\n</ol>\n<div class=\"warn-box\">⚠️ 注意：Q-Former 的参数从 BERT-base 初始化（除了交叉注意力层随机初始化），这为训练提供了良好的起点。交叉注意力层每隔一个 Transformer block 插入一次。</div>\n<h5>第一阶段：视觉-语言表征学习</h5>\n<p>第一阶段的目标是训练 Q-Former，使其学会从冻结图像编码器中提取与文本最相关的视觉特征。这一阶段联合优化三个互补的损失函数：</p>\n<p><strong>1. Image-Text Contrastive Learning (ITC)</strong></p>\n<p>ITC 对齐图像表征和文本表征，使匹配的图文对在特征空间中更接近。具体地，将每个查询向量的输出与文本的 <code>[CLS]</code> token 输出计算相似度，取最大值作为图文相似度：</p>\n<p>$$s(\\mathbf{I}, \\mathbf{T}) = \\max_{i \\in \\{1, \\ldots, 32\\}} \\mathbf{z}_i^\\top \\mathbf{t}_{\\text{cls}}$$</p>\n<p>为防止信息泄漏，ITC 使用<strong>单模态自注意力掩码</strong>（unimodal self-attention mask），即查询向量和文本 token 互相不可见。</p>\n<p><strong>2. Image-grounded Text Generation (ITG)</strong></p>\n<p>ITG 训练 Q-Former 在给定图像条件下生成对应文本。它使用<strong>因果自注意力掩码</strong>（causal self-attention mask）：查询向量之间可以互相关注，但文本 token 只能关注之前的 token 和所有查询向量。</p>\n<div class=\"key-point\">💡 关键：ITG 迫使查询向量捕获包含所有文本信息的视觉特征，因为文本生成的唯一视觉信息来源就是这 32 个查询向量。这实际上是一种\"信息瓶颈\"设计。</div>\n<p><strong>3. Image-Text Matching (ITM)</strong></p>\n<p>ITM 是一个二分类任务，预测图文对是否匹配。它使用<strong>双向自注意力掩码</strong>（bi-directional self-attention mask），允许查询向量和文本 token 完全交互。采用 hard negative mining 策略选择困难负样本。</p>\n<pre><code class=\"language-python\"># 第一阶段预训练伪代码\n# Q-Former 包含: queries Z (32×768), image_transformer, text_transformer (共享self-attn)\n# 冻结: image_encoder (ViT-L/g)\n\nfor images, texts in dataloader:\n    # 提取冻结视觉特征\n    with torch.no_grad():\n        image_features = image_encoder(images)  # [B, N_patch, D_vis]\n\n    # === ITC: 单模态掩码，查询与文本互不可见 ===\n    query_output = q_former(Z, image_features, mask=&quot;unimodal&quot;)  # [B, 32, 768]\n    text_output = q_former.text_encode(texts, mask=&quot;unimodal&quot;)   # [B, 768]\n    sim = max_over_queries(query_output @ text_output.T)\n    loss_itc = contrastive_loss(sim)\n\n    # === ITG: 因果掩码，文本仅能看到之前token和所有查询 ===\n    logits = q_former(Z, image_features, texts, mask=&quot;causal&quot;)\n    loss_itg = cross_entropy(logits, texts)\n\n    # === ITM: 双向掩码，查询与文本完全交互 ===\n    match_logits = q_former(Z, image_features, texts, mask=&quot;bidirectional&quot;)\n    loss_itm = binary_cross_entropy(match_logits, labels)  # hard negatives\n\n    loss = loss_itc + loss_itg + loss_itm\n    optimizer.step(loss)  # 仅更新 Q-Former 参数\n</code></pre>\n<h5>第二阶段：视觉到语言的生成学习</h5>\n<p><img alt=\"第二阶段预训练\" src=\"https://ar5iv.labs.arxiv.org/html/2301.12597/assets/x3.png\" />\n<em>图 3：第二阶段预训练。Q-Former 的输出通过全连接层投影后作为 soft visual prompt 输入冻结 LLM。</em></p>\n<p>第二阶段将 Q-Former 的输出连接到冻结的 LLM，使其获得视觉理解能力。具体步骤：</p>\n<ol>\n<li>使用一个全连接层（FC layer）将 Q-Former 的输出 \\(\\mathbf{Z} \\in \\mathbb{R}^{32 \\times 768}\\) 线性投影到 LLM 的文本嵌入空间维度</li>\n<li>投影后的向量作为 <strong>soft visual prompts</strong> 前置到 LLM 的输入文本嵌入之前</li>\n<li>这些 visual prompts 为 LLM 提供了最相关的视觉信息，引导其生成与图像相关的文本</li>\n</ol>\n<p>对于不同类型的 LLM，训练目标略有不同：</p>\n<ul>\n<li><strong>Decoder-only LLM（OPT）</strong>：使用语言建模损失（language modeling loss），即预测下一个 token</li>\n<li><strong>Encoder-Decoder LLM（FlanT5）</strong>：将文本分为前后两部分，前半部分与 visual prompts 一起作为编码器输入，后半部分作为解码器的生成目标</li>\n</ul>\n<p>$$\\mathcal{L}_{\\text{LM}} = -\\sum_{t=1}^{T} \\log p_{\\theta_{\\text{LLM}}}(y_t \\mid \\text{FC}(\\mathbf{Z}), y_{<t})$$</p>\n<div class=\"key-point\">💡 关键：第一阶段的表征学习至关重要。实验表明，没有第一阶段直接训练第二阶段时，OPT 会出现灾难性遗忘（性能随训练急剧下降），FlanT5 的性能也显著降低。这说明 Q-Former 需要先学会提取与文本相关的视觉特征，才能有效地与 LLM 对接。</div>\n<h5>预训练细节</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>配置项</th>\n<th>值</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>预训练数据</td>\n<td>129M 图像（COCO, VG, CC3M, CC12M, SBU, LAION400M 子集）</td>\n</tr>\n<tr>\n<td>图像分辨率</td>\n<td>224×224</td>\n</tr>\n<tr>\n<td>第一阶段训练</td>\n<td>250K 步，batch size 2320，lr 1e-4（cosine decay）</td>\n</tr>\n<tr>\n<td>第二阶段训练</td>\n<td>80K 步，batch size 1920，lr 1e-5</td>\n</tr>\n<tr>\n<td>Q-Former 参数</td>\n<td>188M（含查询向量）</td>\n</tr>\n<tr>\n<td>可训练参数（最小配置）</td>\n<td>104M（ViT-L + OPT 2.7B）</td>\n</tr>\n<tr>\n<td>图像编码器</td>\n<td>ViT-L/14（CLIP 预训练）或 ViT-g/14（EVA-CLIP 预训练）</td>\n</tr>\n<tr>\n<td>LLM</td>\n<td>OPT（2.7B/6.7B）或 FlanT5（XL/XXL）</td>\n</tr>\n</tbody>\n</table></div>\n<h5>关键实验结果</h5>\n<p><strong>零样本视觉问答（Zero-shot VQA）</strong>：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>模型</th>\n<th>可训练参数</th>\n<th>总参数</th>\n<th>VQAv2</th>\n<th>GQA</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Flamingo9B</td>\n<td>1.8B</td>\n<td>9.3B</td>\n<td>51.8</td>\n<td>44.7</td>\n</tr>\n<tr>\n<td>Flamingo80B</td>\n<td>10.2B</td>\n<td>80B</td>\n<td>56.3</td>\n<td>50.6</td>\n</tr>\n<tr>\n<td>BLIP-2 ViT-g FlanT5-XL</td>\n<td>107M</td>\n<td>4.1B</td>\n<td>63.1</td>\n<td>63.0</td>\n</tr>\n<tr>\n<td>BLIP-2 ViT-g FlanT5-XXL</td>\n<td>108M</td>\n<td>12.1B</td>\n<td><strong>65.0</strong></td>\n<td><strong>65.0</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p>BLIP-2 在 VQAv2 上超越 Flamingo80B 达 <strong>8.7%</strong>，而可训练参数仅为其 <strong>1/54</strong>。</p>\n<p><strong>关键发现</strong>：\n- 更强的图像编码器（ViT-g &gt; ViT-L）和更强的 LLM（FlanT5-XXL &gt; XL &gt; OPT）都能带来性能提升，验证了 BLIP-2 作为通用视觉-语言预训练框架的有效性\n- 指令微调的 LLM（FlanT5）在 VQA 任务上显著优于无监督训练的 LLM（OPT）\n- 第一阶段的表征学习对第二阶段至关重要，缺少它会导致 OPT 灾难性遗忘</p>\n<h5>与传统方法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方面</th>\n<th>传统方法（如 Flamingo）</th>\n<th>BLIP-2</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>视觉-语言对齐</td>\n<td>Perceiver Resampler 直接映射</td>\n<td>两阶段渐进式对齐（先表征后生成）</td>\n</tr>\n<tr>\n<td>训练成本</td>\n<td>端到端训练大量参数</td>\n<td>仅训练轻量级 Q-Former（~100M）</td>\n</tr>\n<tr>\n<td>图像编码器</td>\n<td>可能微调</td>\n<td>完全冻结</td>\n</tr>\n<tr>\n<td>LLM</td>\n<td>可能部分微调（gated cross-attention）</td>\n<td>完全冻结</td>\n</tr>\n<tr>\n<td>可扩展性</td>\n<td>受限于计算资源</td>\n<td>可即插即用更强的视觉/语言模型</td>\n</tr>\n</tbody>\n</table></div>\n<p>BLIP-2 的核心优势在于其<strong>模块化设计</strong>：当更强的图像编码器或 LLM 出现时，只需重新训练轻量级的 Q-Former 即可获得性能提升，无需重新训练整个系统。</p>",
      "quiz": {
        "q": "BLIP-2 的 Q-Former 在第一阶段预训练中使用了三种不同的自注意力掩码策略，其中 Image-grounded Text Generation (ITG) 使用的是哪种掩码？",
        "options": [
          "双向自注意力掩码（bi-directional），查询和文本完全可见",
          "单模态自注意力掩码（unimodal），查询和文本互不可见",
          "因果自注意力掩码（causal），文本 token 仅能关注之前的 token 和所有查询向量",
          "无掩码（no mask），所有 token 之间完全自由注意"
        ],
        "answer": 2,
        "explain": "ITG 要求模型基于图像生成文本，因此使用因果掩码：查询向量之间可互相关注，文本 token 只能看到之前的 token 和所有查询向量，确保生成过程的自回归性质。"
      }
    },
    {
      "id": "imagebind",
      "num": 10,
      "name": "ImageBind",
      "fullName": "统一嵌入空间 (ImageBind)",
      "year": "2023",
      "org": "Meta",
      "parent": "clip",
      "paperUrl": "http://openaccess.thecvf.com/content/CVPR2023/html/Girdhar_ImageBind_One_Embedding_Space_To_Bind_Them_All_CVPR_2023_paper.html",
      "projectUrl": "",
      "category": "fusion_model",
      "motivation": "六种模态统一对齐",
      "summary": "ImageBind 提出以图像为中心枢纽，仅利用图像与其他模态的自然配对数据（无需所有模态两两配对），通过对比学习将六种模态（图像/视频、文本、音频、深度、热成像、IMU）对齐到统一嵌入空间，实现跨模态的涌现零样本能力。",
      "keyPoints": [
        "<strong>六模态统一嵌入</strong>：将图像/视频、文本、音频、深度图、热成像、IMU 六种模态映射到同一向量空间",
        "<strong>图像中心对齐策略</strong>：仅使用 (image, X) 配对数据训练，无需所有模态两两配对；利用图像作为\"绑定\"桥梁",
        "<strong>涌现零样本能力（Emergent Zero-shot）</strong>：未直接训练 (audio, text) 对齐，但通过图像桥梁自动获得音频-文本零样本分类/检索能力",
        "<strong>编码器架构</strong>：各模态独立编码器 + 线性投影头；图像/文本编码器使用 OpenCLIP ViT-H 初始化并冻结，其余模态编码器训练",
        "<strong>对比损失</strong>：对称 InfoNCE 损失，固定温度优于可学习温度",
        "<strong>数据来源</strong>：Audioset (video-audio)、SUN RGB-D (image-depth)、LLVIP (image-thermal)、Ego4D (video-IMU)，小数据集复制 50× 平衡",
        "<strong>即插即用升级</strong>：可直接替换 CLIP 嵌入，将 Detic 检测器升级为音频驱动、DALL·E 2 升级为音频生成图像",
        "<strong>嵌入空间算术</strong>：支持跨模态嵌入相加组合语义（如图像+音频→检索）"
      ],
      "detail": "<p><img alt=\"ImageBind 框架总览\" src=\"https://ar5iv.labs.arxiv.org/html/2305.05665/assets/x1.png\" />\n<em>图：ImageBind 以图像为中心枢纽，将六种模态对齐到统一嵌入空间。仅使用图像配对数据训练，即可涌现出未见模态对之间的零样本对齐能力。</em></p>\n<pre><code class=\"language-python\"># ImageBind 核心训练伪代码\n# 对称 InfoNCE 对比学习\n\ndef imagebind_train_step(image_encoder, modality_encoder, batch):\n    &quot;&quot;&quot;\n    image_encoder: 冻结的 OpenCLIP ViT-H 图像编码器\n    modality_encoder: 可训练的模态编码器 (audio/depth/thermal/IMU)\n    batch: (image, paired_modality) 自然配对数据\n    &quot;&quot;&quot;\n    # 1. 编码 + 线性投影 → 归一化嵌入\n    q_i = normalize(proj_image(image_encoder(batch.image)))    # [B, d]\n    q_m = normalize(proj_modal(modality_encoder(batch.modal)))  # [B, d]\n\n    # 2. 计算相似度矩阵\n    logits = q_i @ q_m.T / tau  # tau: 固定温度 (depth/thermal/IMU: 0.2, audio: 0.05)\n\n    # 3. 对称 InfoNCE 损失\n    labels = torch.arange(B)\n    loss_i2m = cross_entropy(logits, labels)      # image → modality\n    loss_m2i = cross_entropy(logits.T, labels)     # modality → image\n    loss = (loss_i2m + loss_m2i) / 2\n\n    # 4. 仅更新 modality_encoder 和 proj_modal（image_encoder 冻结）\n    loss.backward()\n    optimizer.step()\n</code></pre>\n<p><strong>动机与背景：为什么需要统一嵌入空间？</strong></p>\n<p>CLIP 等对比学习方法已经证明了 (image, text) 对齐的强大能力，但现实世界的感知远不止视觉和文本两种模态。音频、深度、热成像、惯性测量（IMU）等模态在机器人、AR/VR、多媒体理解等场景中至关重要。然而，为所有 \\(M\\) 种模态收集两两配对数据需要 \\(O(M^2)\\) 种数据集，这在实际中几乎不可行——例如，很难获得大规模的 (audio, depth) 或 (thermal, IMU) 配对数据。ImageBind 的核心洞察是：<strong>图像天然地与几乎所有模态共现</strong>——视频自带音频、RGB-D 相机同时采集深度、热成像与可见光对齐、穿戴设备同时记录视频和 IMU。因此，只需 \\(O(M)\\) 种 (image, X) 配对数据，即可将所有模态\"绑定\"到统一空间。</p>\n<p><strong>核心机制：InfoNCE 对齐与涌现零样本</strong></p>\n<p>ImageBind 的训练目标是标准的对称 InfoNCE 对比损失。对于一个 batch 中的 \\(B\\) 个 (image, modality) 配对 \\(\\{(I_j, M_j)\\}_{j=1}^{B}\\)，损失函数为：</p>\n<p>$$\\mathcal{L}_{I,M} = -\\frac{1}{B}\\sum_{i=1}^{B}\\log\\frac{\\exp(q_i^I \\cdot q_i^M / \\tau)}{\\sum_{j=1}^{B}\\exp(q_i^I \\cdot q_j^M / \\tau)}$$</p>\n<p>其中 \\(q^I, q^M\\) 分别是图像和配对模态的归一化嵌入，\\(\\tau\\) 是温度超参数。最终损失对称化为 \\(\\mathcal{L} = \\mathcal{L}_{I,M} + \\mathcal{L}_{M,I}\\)。</p>\n<div class=\"key-point\">💡 <strong>关键洞察——涌现对齐（Emergent Alignment）</strong>：假设图像嵌入空间已经与文本对齐（来自 CLIP/OpenCLIP 预训练），当音频编码器被训练为与图像对齐时，音频嵌入自动与文本嵌入对齐。这是因为对齐关系具有传递性：如果 Audio ≈ Image 且 Image ≈ Text，则 Audio ≈ Text。论文将这种未经直接训练但自然获得的跨模态能力称为\"涌现零样本\"（Emergent Zero-shot），以区别于 AudioCLIP 等直接使用 (audio, text) 对训练的方法。</div>\n<p><strong>编码器架构与训练细节</strong></p>\n<p>各模态使用独立的编码器：\n- <strong>图像/视频</strong>：OpenCLIP ViT-H（630M 参数），<strong>冻结不训练</strong>。视频仅采样 2 帧，通过 temporal inflate（将 patch embedding 的卷积核沿时间维度复制并平均）处理\n- <strong>文本</strong>：OpenCLIP 文本编码器（302M 参数），<strong>冻结不训练</strong>\n- <strong>音频</strong>：ViT-B，将音频转换为 2D 梅尔频谱图后作为\"图像\"输入 ViT；使用 2 秒音频片段，采样率 16kHz，128 个梅尔频率 bin\n- <strong>深度</strong>：ViT-S，将深度图转换为视差图（disparity map）以获得尺度不变性，作为单通道图像输入\n- <strong>热成像</strong>：ViT-B，作为单通道图像输入\n- <strong>IMU</strong>：6 层 Transformer（512 维，8 头），5 秒 IMU 信号（加速度计+陀螺仪，6 轴），通过 1D 卷积（kernel=8）投影后输入</p>\n<p>每个编码器后接一个模态特定的<strong>线性投影头</strong>（实验表明线性优于 MLP），输出固定维度 \\(d\\) 的归一化嵌入用于 InfoNCE 损失。</p>\n<p><strong>关键消融实验发现</strong></p>\n<p>论文通过大量消融实验揭示了若干重要设计选择：</p>\n<ol>\n<li><strong>图像编码器越强，涌现能力越强</strong>：将图像编码器从 ViT-B → ViT-L → ViT-H，深度零样本分类提升 7%，音频提升 4%。这说明更强的视觉表示能更好地\"绑定\"其他模态</li>\n<li><strong>固定温度优于可学习温度</strong>：不同于 CLIP 使用可学习温度，ImageBind 发现固定温度更好；且不同模态最优温度不同（深度/热成像/IMU 偏好高温 \\(\\tau=0.2\\)，音频偏好低温 \\(\\tau=0.05\\)）</li>\n<li><strong>空间/时间对齐至关重要</strong>：深度图与图像需要空间对齐裁剪（随机裁剪掉 10%+），音频与视频需要时间对齐采样</li>\n<li><strong>数据增强因模态而异</strong>：强增强（RandAugment+RandErase）有助于小数据集的深度分类，但会严重损害音频分类（ESC 下降 34%）</li>\n<li><strong>编码器容量需匹配数据规模</strong>：小数据集（SUN RGB-D）适合小编码器（ViT-S），大数据集（Audioset）适合大编码器（ViT-B）</li>\n</ol>\n<p><strong>实验亮点与应用</strong></p>\n<p>在涌现零样本分类中，ImageBind 在 ESC-50 音频分类上达到 66.9%（接近使用 (audio, text) 直接训练的 AudioCLIP 的 68.6%），在 Ego4D IMU 场景分类上达到 25.0%（随机基线 0.9%）。在零样本音频-文本检索中，ImageBind 在 Clotho 数据集上 R@1 达到 6.0，是 AVFIC 方法的两倍，尽管后者使用了自动挖掘的 (audio, text) 对。</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：ImageBind 的图像/文本编码器完全冻结，因此其图像/文本任务性能等同于 OpenCLIP，并非 ImageBind 自身的贡献。ImageBind 的核心价值在于将其他模态\"免费\"接入已有的视觉-语言空间。</div>",
      "quiz": {
        "q": "ImageBind 实现音频零样本文本分类的关键机制是什么？",
        "options": [
          "使用大规模 (audio, text) 配对数据直接训练音频-文本对齐",
          "通过图像作为桥梁，分别对齐 (image, text) 和 (image, audio)，利用对齐的传递性实现涌现对齐",
          "将音频信号直接转换为文本描述后使用文本编码器处理",
          "在统一编码器中共享音频和文本的参数权重"
        ],
        "answer": 1,
        "explain": "ImageBind 的核心思想是利用图像作为中心枢纽：图像-文本对齐来自冻结的 OpenCLIP，图像-音频对齐通过 InfoNCE 训练获得，两者的传递性使音频自动与文本对齐，无需任何 (audio, text) 配对数据。"
      }
    },
    {
      "id": "pq",
      "num": 11,
      "name": "PQ",
      "fullName": "乘积量化 (Product Quantization)",
      "year": "2010",
      "org": "INRIA",
      "parent": "—",
      "paperUrl": "https://ieeexplore.ieee.org/abstract/document/5432202/",
      "projectUrl": "",
      "category": "vector_ann",
      "motivation": "子空间分解实现高压缩比",
      "summary": "PQ 的核心目标是：子空间分解实现高压缩比。",
      "keyPoints": [
        "核心动机：子空间分解实现高压缩比",
        "代表机构：INRIA"
      ],
      "detail": "<p>子空间分解实现高压缩比</p>"
    },
    {
      "id": "hnsw",
      "num": 12,
      "name": "HNSW",
      "fullName": "分层可导航小世界图 (HNSW)",
      "year": "2016",
      "org": "—",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/1603.09320",
      "projectUrl": "",
      "category": "vector_ann",
      "motivation": "多层导航图平衡精度与速度",
      "summary": "HNSW 的核心目标是：多层导航图平衡精度与速度。",
      "keyPoints": [
        "核心动机：多层导航图平衡精度与速度",
        "代表机构：—"
      ],
      "detail": "<p>多层导航图平衡精度与速度</p>"
    },
    {
      "id": "ivf",
      "num": 13,
      "name": "IVF",
      "fullName": "倒排文件索引 (IVF)",
      "year": "2003",
      "org": "—",
      "parent": "pq",
      "paperUrl": "—",
      "projectUrl": "",
      "category": "vector_ann",
      "motivation": "聚类缩小搜索范围",
      "summary": "IVF 将信息检索中的**倒排索引**思想迁移到向量近邻搜索领域，通过 K-means 聚类将向量空间划分为 Voronoi 单元，查询时仅在最近的少数聚类中进行穷举搜索，将搜索复杂度从 \\(O(N)\\) 降至 \\(O(nprobe \\cdot N/K)\\)，是 Faiss 等主流向量检索库的核心索引结构。",
      "keyPoints": [
        "<strong>粗量化器 (Coarse Quantizer)</strong>：使用 K-means 将 \\(N\\) 个数据库向量聚类为 \\(K\\) 个 Voronoi 单元，每个聚类中心作为\"视觉词汇\"",
        "<strong>倒排列表 (Inverted Lists)</strong>：每个聚类中心维护一个列表，存储所有被分配到该单元的向量（或其 ID + 残差编码）",
        "<strong>多探针搜索 (Multi-probe Search)</strong>：查询时不仅搜索最近的 1 个聚类，而是搜索最近的 \\(nprobe\\) 个聚类，以 nprobe 参数平衡精度与速度",
        "<strong>残差编码 (Residual Encoding)</strong>：存储向量与其所属聚类中心的残差 \\(\\mathbf{r} = \\mathbf{x} - c(\\mathbf{x})\\)，降低量化误差",
        "<strong>IVF+PQ (IVFADC)</strong>：将倒排索引与乘积量化结合，倒排列表中存储 PQ 编码的残差而非原始向量，实现内存高效的十亿级检索",
        "<strong>非对称距离计算 (ADC)</strong>：查询向量不量化，直接与 PQ 码本计算距离，保留查询精度",
        "<strong>源自文本检索</strong>：概念源于 Sivic &amp; Zisserman (2003) 将文本检索的倒排索引应用于视觉词袋模型，后由 Jégou et al. (2011) 推广至通用向量近邻搜索"
      ],
      "detail": "<h5>核心框架图</h5>\n<div class=\"img-wrap\"><img src=\"../../content/mm/mm_retrieval/assets/assets/ivf_architecture.png\" alt=\"IVF 索引结构与搜索过程\" loading=\"lazy\"><p class=\"img-caption\">▲ IVF 索引结构与搜索过程</p></div>\n<p><em>图：左侧展示 IVF 索引结构——K-means 将向量空间划分为 Voronoi 单元，每个聚类中心关联一个倒排列表；右侧展示搜索过程——查询向量 \\(q\\) 仅在最近的 nprobe=2 个聚类（红色虚线圈）中搜索候选向量，灰色区域的向量被完全跳过。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># ============================================\n# IVF 索引构建 (Offline)\n# ============================================\n# 输入: 数据库向量集 X = {x_1, ..., x_N}, 聚类数 K\n# 输出: 聚类中心 C, 倒排列表 inverted_lists\n\n# Step 1: 训练粗量化器 (K-means)\nC = {c_1, ..., c_K} ← KMeans(X, K)\n\n# Step 2: 构建倒排列表\ninverted_lists = {k: [] for k in range(K)}\nfor i, x in enumerate(X):\n    k* = argmin_k ||x - c_k||²          # 找到最近的聚类中心\n    r = x - c_{k*}                        # 计算残差向量\n    inverted_lists[k*].append((i, r))     # 存储 (向量ID, 残差)\n\n# ============================================\n# IVF 查询 (Online)\n# ============================================\n# 输入: 查询向量 q, 探针数 nprobe, 返回数 top_k\n# 输出: 最近邻列表\n\n# Step 1: 粗量化——找到 nprobe 个最近聚类\nprobed_cells = nprobe_nearest(q, C, nprobe)\n\n# Step 2: 在被探测的倒排列表中穷举搜索\ncandidates = []\nfor k in probed_cells:\n    for (id_i, r_i) in inverted_lists[k]:\n        dist = ||q - c_k - r_i||²        # 精确距离 (等价于 ||q - x_i||²)\n        candidates.append((dist, id_i))\n\n# Step 3: 返回 top-k 最近邻\nreturn top_k_smallest(candidates, top_k)\n</code></pre>\n<h5>动机与背景</h5>\n<p>在大规模向量检索场景中（如图像检索、推荐系统、RAG），数据库可能包含数十亿个高维向量。<strong>穷举搜索 (Brute-force)</strong> 需要计算查询向量与所有数据库向量的距离，复杂度为 \\(O(N \\cdot d)\\)，其中 \\(N\\) 为数据库大小，\\(d\\) 为向量维度。当 \\(N\\) 达到百万甚至十亿级别时，穷举搜索的延迟完全无法接受。</p>\n<p>传统的加速方法包括：\n- <strong>树结构 (KD-Tree, Ball Tree)</strong>：在低维空间有效，但在高维空间（\\(d > 20\\)）退化为穷举搜索（维度灾难）\n- <strong>局部敏感哈希 (LSH)</strong>：通过随机投影将相似向量映射到同一桶，但需要大量哈希表才能保证召回率，内存开销大</p>\n<p>IVF 的核心洞察来自文本检索领域：<strong>如果我们能将向量空间预先划分为若干区域，查询时只需搜索最相关的少数区域，就能大幅缩小搜索范围</strong>。这正是文本搜索引擎中倒排索引的工作原理——每个\"词\"对应一个文档列表，查询时只检索包含查询词的文档。</p>\n<div class=\"key-point\">💡 <strong>关键直觉</strong>：K-means 聚类将向量空间划分为 Voronoi 单元，查询向量的最近邻大概率落在与查询最近的几个聚类中。通过只搜索这几个聚类的倒排列表，搜索量从 \\(N\\) 降至 \\(nprobe \\cdot N/K\\)。</div>\n<h5>核心机制：粗量化与倒排索引</h5>\n<p><strong>1. 粗量化器 (Coarse Quantizer)</strong></p>\n<p>IVF 的第一步是使用 K-means 算法将整个数据库的 \\(N\\) 个向量聚类为 \\(K\\) 个簇。每个聚类中心 \\(c_k\\) 定义了一个 Voronoi 单元：</p>\n<p>$$V_k = \\{\\mathbf{x} \\in \\mathbb{R}^d : \\|\\mathbf{x} - c_k\\| \\leq \\|\\mathbf{x} - c_j\\|, \\forall j \\neq k\\}$$</p>\n<p>典型的 \\(K\\) 值选择为 \\(\\sqrt{N}\\) 到 \\(4\\sqrt{N}\\)。例如，对于 \\(N = 10^6\\) 的数据库，\\(K\\) 通常设为 1024 到 4096。</p>\n<p><strong>2. 倒排列表 (Inverted Lists)</strong></p>\n<p>对于每个聚类中心 \\(c_k\\)，维护一个倒排列表 \\(L_k\\)，包含所有被分配到该 Voronoi 单元的向量。列表中存储的内容取决于具体实现：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>存储方式</th>\n<th>倒排列表内容</th>\n<th>内存占用</th>\n<th>精度</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>IVFFlat</td>\n<td>原始向量 \\(\\mathbf{x}_i\\)</td>\n<td>\\(N \\cdot d \\cdot 4\\) 字节</td>\n<td>精确</td>\n</tr>\n<tr>\n<td>IVFPQ (IVFADC)</td>\n<td>PQ 编码的残差 \\(PQ(\\mathbf{x}_i - c_k)\\)</td>\n<td>\\(N \\cdot m\\) 字节</td>\n<td>近似</td>\n</tr>\n<tr>\n<td>IVFScalarQuantizer</td>\n<td>标量量化的残差</td>\n<td>\\(N \\cdot d\\) 字节</td>\n<td>近似</td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>3. 残差编码的重要性</strong></p>\n<p>直接对原始向量进行 PQ 编码会引入较大的量化误差。IVF 的一个关键设计是<strong>先减去聚类中心，再对残差进行编码</strong>：</p>\n<p>$$\\mathbf{r}_i = \\mathbf{x}_i - c_{q(\\mathbf{x}_i)}$$</p>\n<p>其中 \\(q(\\mathbf{x}_i)\\) 是 \\(\\mathbf{x}_i\\) 所属的聚类中心。残差向量的方差远小于原始向量，因此 PQ 编码的精度更高。</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：残差编码是 IVFADC 相比朴素 PQ 的关键改进。Jégou et al. (2011) 实验表明，残差编码可将 1-recall@100 从 0.35 提升至 0.45（SIFT1M 数据集）。</div>\n<h5>搜索流程：多探针策略</h5>\n<p>查询时，IVF 的搜索分为两个阶段：</p>\n<p><strong>阶段一：粗量化（Coarse Quantization）</strong></p>\n<p>计算查询向量 \\(\\mathbf{q}\\) 与所有 \\(K\\) 个聚类中心的距离，选出最近的 \\(nprobe\\) 个聚类：</p>\n<p>$$\\mathcal{S} = \\text{nprobe-nearest}(\\mathbf{q}, \\{c_1, \\ldots, c_K\\})$$</p>\n<p>此步复杂度为 \\(O(K \\cdot d)\\)，通常 \\(K \\ll N\\)，开销很小。</p>\n<p><strong>阶段二：倒排列表内搜索</strong></p>\n<p>仅在被选中的 \\(nprobe\\) 个倒排列表中搜索最近邻：</p>\n<p>$$\\text{NN}(\\mathbf{q}) = \\underset{i : q(\\mathbf{x}_i) \\in \\mathcal{S}}{\\text{argmin}} \\|\\mathbf{q} - \\mathbf{x}_i\\|^2$$</p>\n<p>假设向量在聚类间均匀分布，每个列表平均包含 \\(N/K\\) 个向量，则搜索的向量总数为 \\(nprobe \\cdot N/K\\)。</p>\n<p><strong>nprobe 的精度-速度权衡</strong>：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>nprobe</th>\n<th>搜索比例 (K=1024)</th>\n<th>典型 Recall@10</th>\n<th>相对延迟</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>1</td>\n<td>0.1%</td>\n<td>~40%</td>\n<td>1×</td>\n</tr>\n<tr>\n<td>8</td>\n<td>0.8%</td>\n<td>~80%</td>\n<td>8×</td>\n</tr>\n<tr>\n<td>32</td>\n<td>3.1%</td>\n<td>~95%</td>\n<td>32×</td>\n</tr>\n<tr>\n<td>64</td>\n<td>6.3%</td>\n<td>~98%</td>\n<td>64×</td>\n</tr>\n<tr>\n<td>1024</td>\n<td>100%</td>\n<td>100%</td>\n<td>穷举</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 <strong>关键</strong>：nprobe 是 IVF 最重要的运行时参数。实践中通常设为 \\(K\\) 的 1%~10%，在保证 &gt;90% 召回率的同时实现 10~100 倍加速。</div>\n<h5>IVF+PQ (IVFADC)：内存高效的十亿级检索</h5>\n<p>IVFFlat 虽然搜索快，但仍需存储所有原始向量，内存占用为 \\(N \\cdot d \\cdot 4\\) 字节。对于 \\(N = 10^9, d = 128\\) 的场景，需要约 512 GB 内存。</p>\n<p><strong>IVFADC (Inverted File with Asymmetric Distance Computation)</strong> 由 Jégou et al. (2011) 提出，将 IVF 与乘积量化 (PQ) 结合：</p>\n<ol>\n<li><strong>索引构建</strong>：对每个向量的残差 \\(\\mathbf{r}_i = \\mathbf{x}_i - c_{q(\\mathbf{x}_i)}\\) 进行 PQ 编码，倒排列表中仅存储 PQ 码（通常 8~16 字节/向量）</li>\n<li><strong>非对称距离计算 (ADC)</strong>：查询时，查询向量 \\(\\mathbf{q}\\) 不进行量化，直接与 PQ 码本计算子空间距离表，再查表累加得到近似距离：</li>\n</ol>\n<p>$$\\hat{d}(\\mathbf{q}, \\mathbf{x}_i) = \\sum_{j=1}^{m} \\|q_j - c_j^{PQ}(r_{i,j})\\|^2$$</p>\n<p>其中 \\(m\\) 为 PQ 子空间数，\\(q_j\\) 为查询向量在第 \\(j\\) 个子空间的分量，\\(c_j^{PQ}(r_{i,j})\\) 为残差第 \\(j\\) 个子空间的 PQ 码本中心。</p>\n<p><strong>内存对比</strong>（\\(N = 10^9, d = 128\\)）：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>每向量内存</th>\n<th>总内存</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Brute-force</td>\n<td>512 B</td>\n<td>512 GB</td>\n</tr>\n<tr>\n<td>IVFFlat</td>\n<td>512 B + 聚类开销</td>\n<td>~512 GB</td>\n</tr>\n<tr>\n<td>IVFPQ (m=8)</td>\n<td>8 B + ID</td>\n<td>~16 GB</td>\n</tr>\n<tr>\n<td>IVFPQ (m=16)</td>\n<td>16 B + ID</td>\n<td>~24 GB</td>\n</tr>\n</tbody>\n</table></div>\n<h5>与传统方法的区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>穷举搜索</th>\n<th>LSH</th>\n<th>KD-Tree</th>\n<th><strong>IVF</strong></th>\n<th>HNSW</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>搜索复杂度</td>\n<td>\\(O(Nd)\\)</td>\n<td>\\(O(N^{\\rho}d)\\)</td>\n<td>\\(O(N^{1-1/d})\\)</td>\n<td>\\(O(nprobe \\cdot N/K \\cdot d)\\)</td>\n<td>\\(O(d \\log N)\\)</td>\n</tr>\n<tr>\n<td>索引构建</td>\n<td>无</td>\n<td>\\(O(NLd)\\)</td>\n<td>\\(O(Nd \\log N)\\)</td>\n<td>\\(O(NKTd)\\) (K-means)</td>\n<td>\\(O(Nd \\log N)\\)</td>\n</tr>\n<tr>\n<td>高维适应性</td>\n<td>✓</td>\n<td>✓</td>\n<td>✗</td>\n<td>✓</td>\n<td>✓</td>\n</tr>\n<tr>\n<td>可与 PQ 结合</td>\n<td>✓</td>\n<td>✗</td>\n<td>✗</td>\n<td><strong>✓ (IVFADC)</strong></td>\n<td>✓</td>\n</tr>\n<tr>\n<td>动态更新</td>\n<td>✓</td>\n<td>✓</td>\n<td>需重建</td>\n<td>✓ (追加到列表)</td>\n<td>✓</td>\n</tr>\n<tr>\n<td>参数敏感性</td>\n<td>无</td>\n<td>哈希表数 L</td>\n<td>无</td>\n<td><strong>K, nprobe</strong></td>\n<td>ef, M</td>\n</tr>\n</tbody>\n</table></div>\n<p>IVF 相比 HNSW 的优势在于：(1) 内存占用更低（尤其结合 PQ）；(2) 索引构建更快；(3) 更适合磁盘存储（倒排列表可分段加载）。HNSW 的优势在于单次查询延迟更低（对数复杂度 vs 线性扫描列表）。</p>\n<h5>实践中的关键参数选择</h5>\n<ul>\n<li><strong>聚类数 \\(K\\)</strong>：通常取 \\(\\sqrt{N}\\) 到 \\(4\\sqrt{N}\\)。\\(K\\) 过小则每个列表太长，加速不明显；\\(K\\) 过大则聚类质量下降，且粗量化阶段开销增大</li>\n<li><strong>nprobe</strong>：运行时参数，控制精度-速度权衡。通常从 1 开始逐步增大，直到召回率满足需求</li>\n<li><strong>PQ 子空间数 \\(m\\)</strong>：决定每个向量的压缩比。\\(m\\) 越大精度越高但内存越大。常见选择为 8、16、32</li>\n<li><strong>训练集大小</strong>：K-means 训练不需要全部数据，通常取 \\(30K\\) 到 \\(256K\\) 个样本即可</li>\n</ul>",
      "quiz": {
        "q": "在 IVF 索引中，增大 nprobe 参数的直接效果是什么？",
        "options": [
          "减少索引构建时间",
          "降低每个向量的内存占用",
          "提高搜索召回率但增加查询延迟",
          "增加聚类中心的数量"
        ],
        "answer": 2,
        "explain": "nprobe 控制查询时探测的聚类数量。增大 nprobe 意味着搜索更多的倒排列表，覆盖更多候选向量，因此召回率提高；但同时需要计算更多距离，查询延迟也相应增加。"
      }
    },
    {
      "id": "qwen3_vl_emb",
      "num": 14,
      "name": "Qwen3-VL-Embedding",
      "fullName": "通义千问多模态嵌入 (Qwen3-VL-Embedding)",
      "year": "2026",
      "org": "Alibaba",
      "parent": "blip2",
      "paperUrl": "https://arxiv.org/abs/2601.04720",
      "projectUrl": "",
      "category": "frontier_2026",
      "motivation": "统一检索与重排序框架",
      "summary": "Qwen3-VL-Embedding 的核心目标是：统一检索与重排序框架。",
      "keyPoints": [
        "核心动机：统一检索与重排序框架",
        "演化来源：继承或改进自 blip2",
        "代表机构：Alibaba"
      ],
      "detail": "<p>统一检索与重排序框架</p>"
    },
    {
      "id": "retrv_r1",
      "num": 15,
      "name": "Retrv-R1",
      "fullName": "推理驱动多模态检索 (Retrv-R1)",
      "year": "2026",
      "org": "—",
      "parent": "clip",
      "paperUrl": "https://proceedings.neurips.cc/paper_files/paper/2025/hash/fac28e6ecee78ddcaa938d10bc90cf50-Abstract-Conference.html",
      "projectUrl": "",
      "category": "frontier_2026",
      "motivation": "推理链驱动解决语义鸿沟",
      "summary": "Retrv-R1 的核心目标是：推理链驱动解决语义鸿沟。",
      "keyPoints": [
        "核心动机：推理链驱动解决语义鸿沟",
        "演化来源：继承或改进自 clip",
        "代表机构：—"
      ],
      "detail": "<p>推理链驱动解决语义鸿沟</p>"
    },
    {
      "id": "urag",
      "num": 16,
      "name": "URaG",
      "fullName": "统一检索生成 (URaG)",
      "year": "2026",
      "org": "—",
      "parent": "blip2",
      "paperUrl": "https://ojs.aaai.org/index.php/AAAI/article/view/39729",
      "projectUrl": "",
      "category": "frontier_2026",
      "motivation": "检索与生成深度耦合",
      "summary": "URaG 的核心目标是：检索与生成深度耦合。",
      "keyPoints": [
        "核心动机：检索与生成深度耦合",
        "演化来源：继承或改进自 blip2",
        "代表机构：—"
      ],
      "detail": "<p>检索与生成深度耦合</p>"
    },
    {
      "id": "unime_v2",
      "num": 17,
      "name": "UniME-V2",
      "fullName": "通用多模态嵌入v2 (UniME-V2)",
      "year": "2026",
      "org": "—",
      "parent": "imagebind",
      "paperUrl": "https://ojs.aaai.org/index.php/AAAI/article/view/39284",
      "projectUrl": "",
      "category": "frontier_2026",
      "motivation": "MLLM-as-a-Judge自动标注",
      "summary": "UniME-V2 的核心目标是：MLLM-as-a-Judge自动标注。",
      "keyPoints": [
        "核心动机：MLLM-as-a-Judge自动标注",
        "演化来源：继承或改进自 imagebind",
        "代表机构：—"
      ],
      "detail": "<p>MLLM-as-a-Judge自动标注</p>"
    }
  ],
  "categories": {
    "foundation": {
      "label": "foundation",
      "color": "#7A5AF8"
    },
    "dual_encoder": {
      "label": "dual_encoder",
      "color": "#22a06b"
    },
    "fusion_model": {
      "label": "fusion_model",
      "color": "#0065FF"
    },
    "vector_ann": {
      "label": "vector_ann",
      "color": "#FF8B00"
    },
    "frontier_2026": {
      "label": "frontier_2026",
      "color": "#E34935"
    }
  },
  "projectUrls": {}
};
