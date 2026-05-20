/**
 * visual_language_model-data.js — 由 pipeline/build.py 于 2026-05-20 16:56:36 自动生成。
 * 源文件：content/mm/visual_language_model.md
 * ⚠️  请勿手动修改；如需更新，修改源文档后重新编译。
 */
window.PAGE_CONFIG = {
  "meta": {
    "domain": "multimodal",
    "topic_id": "visual_language_model",
    "topic_name": "视觉-语言基础模型",
    "page_title": "视觉-语言基础模型",
    "page_subtitle": "2026-05-20 版",
    "page_desc": "视觉-语言基础模型（VLM）通过跨模态对齐、指令微调和原生多模态训练，实现图像与文本的深度理解与生成，是多模态AI的核心基础设施。",
    "page_icon": "🔗",
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
        "id": "clip",
        "x": 100,
        "y": 100,
        "category": "contrastive"
      },
      {
        "id": "align",
        "x": 150,
        "y": 120,
        "category": "contrastive"
      },
      {
        "id": "vilt",
        "x": 120,
        "y": 250,
        "category": "encoder_decoder"
      },
      {
        "id": "albef",
        "x": 140,
        "y": 200,
        "category": "encoder_decoder"
      },
      {
        "id": "blip",
        "x": 200,
        "y": 220,
        "category": "encoder_decoder"
      },
      {
        "id": "flamingo",
        "x": 220,
        "y": 350,
        "category": "connector"
      },
      {
        "id": "pali",
        "x": 240,
        "y": 450,
        "category": "encoder_decoder"
      },
      {
        "id": "blip2",
        "x": 300,
        "y": 240,
        "category": "connector"
      },
      {
        "id": "instructblip",
        "x": 350,
        "y": 260,
        "category": "connector"
      },
      {
        "id": "minigpt4",
        "x": 360,
        "y": 300,
        "category": "connector"
      },
      {
        "id": "llava",
        "x": 320,
        "y": 150,
        "category": "connector"
      },
      {
        "id": "qwen_vl",
        "x": 380,
        "y": 170,
        "category": "connector"
      },
      {
        "id": "cogvlm",
        "x": 390,
        "y": 130,
        "category": "connector"
      },
      {
        "id": "gemini",
        "x": 340,
        "y": 480,
        "category": "native_multimodal"
      },
      {
        "id": "llava_next",
        "x": 450,
        "y": 160,
        "category": "connector"
      },
      {
        "id": "internvl_2_5",
        "x": 460,
        "y": 320,
        "category": "connector"
      },
      {
        "id": "internvl_3_5",
        "x": 520,
        "y": 340,
        "category": "connector"
      },
      {
        "id": "siglip2",
        "x": 600,
        "y": 80,
        "category": "frontier_2026"
      },
      {
        "id": "llm2clip",
        "x": 610,
        "y": 110,
        "category": "frontier_2026"
      },
      {
        "id": "gpt5_4",
        "x": 640,
        "y": 500,
        "category": "native_multimodal"
      },
      {
        "id": "gemini_3_1",
        "x": 650,
        "y": 520,
        "category": "native_multimodal"
      },
      {
        "id": "claude_opus_4_7",
        "x": 660,
        "y": 400,
        "category": "frontier_2026"
      },
      {
        "id": "llama4",
        "x": 620,
        "y": 460,
        "category": "native_multimodal"
      },
      {
        "id": "qwen3_5_vlm",
        "x": 630,
        "y": 180,
        "category": "frontier_2026"
      },
      {
        "id": "doubao_2_0",
        "x": 640,
        "y": 280,
        "category": "frontier_2026"
      },
      {
        "id": "glm_4_5v",
        "x": 650,
        "y": 140,
        "category": "frontier_2026"
      },
      {
        "id": "deepseek_v4",
        "x": 670,
        "y": 350,
        "category": "frontier_2026"
      },
      {
        "id": "internvl_3_0",
        "x": 580,
        "y": 360,
        "category": "native_multimodal"
      },
      {
        "id": "v_jepa2",
        "x": 680,
        "y": 220,
        "category": "frontier_2026"
      },
      {
        "id": "drivepi",
        "x": 690,
        "y": 250,
        "category": "frontier_2026"
      }
    ],
    "edges": [
      {
        "from": "clip",
        "to": "align",
        "label": "规模扩展"
      },
      {
        "from": "clip",
        "to": "albef",
        "label": "对齐融合"
      },
      {
        "from": "clip",
        "to": "llava",
        "label": "指令微调"
      },
      {
        "from": "clip",
        "to": "siglip2",
        "label": "统一配方"
      },
      {
        "from": "clip",
        "to": "llm2clip",
        "label": "LLM增强"
      },
      {
        "from": "albef",
        "to": "blip",
        "label": "数据引导"
      },
      {
        "from": "blip",
        "to": "blip2",
        "label": "Q-Former"
      },
      {
        "from": "blip2",
        "to": "instructblip",
        "label": "指令感知"
      },
      {
        "from": "blip2",
        "to": "minigpt4",
        "label": "简化投影"
      },
      {
        "from": "llava",
        "to": "qwen_vl",
        "label": "位置感知"
      },
      {
        "from": "llava",
        "to": "cogvlm",
        "label": "深度融合"
      },
      {
        "from": "llava",
        "to": "llava_next",
        "label": "动态切片"
      },
      {
        "from": "qwen_vl",
        "to": "qwen3_5_vlm",
        "label": "早期融合"
      },
      {
        "from": "cogvlm",
        "to": "glm_4_5v",
        "label": "思考模式"
      },
      {
        "from": "pali",
        "to": "gemini",
        "label": "原生训练"
      },
      {
        "from": "gemini",
        "to": "gpt5_4",
        "label": "统一架构"
      },
      {
        "from": "gemini",
        "to": "gemini_3_1",
        "label": "超长上下文"
      },
      {
        "from": "internvl_2_5",
        "to": "internvl_3_5",
        "label": "RL对齐"
      },
      {
        "from": "internvl_3_5",
        "to": "internvl_3_0",
        "label": "原生预训练"
      }
    ],
    "milestones": [
      {
        "id": "clip",
        "label": "对比学习奠基",
        "description": "CLIP开创大规模图文对比学习范式，成为VLM视觉编码器标准"
      },
      {
        "id": "llava",
        "label": "指令微调开创",
        "description": "LLaVA首次将指令微调引入多模态，开启开源VLM对话模型浪潮"
      },
      {
        "id": "gemini",
        "label": "原生多模态标杆",
        "description": "Gemini实现从预训练阶段的原生多模态联合训练，树立新范式标杆"
      }
    ]
  },
  "algos": [
    {
      "id": "clip",
      "num": 1,
      "name": "CLIP",
      "fullName": "CLIP",
      "year": "2021",
      "org": "OpenAI",
      "parent": "—",
      "paperUrl": "ICML 2021",
      "projectUrl": "",
      "category": "contrastive",
      "motivation": "利用自然语言监督学习通用视觉表征",
      "summary": "在4亿图文对上进行对比学习，通过双塔架构（ViT+Transformer）实现零样本分类，成为多模态AI的视觉基石。",
      "keyPoints": [
        "核心动机：利用自然语言监督学习通用视觉表征",
        "代表机构：OpenAI",
        "在4亿图文对上进行对比学习，通过双塔架构（ViT+Transformer）实现零样本分类，成为多模态AI的视觉基石。"
      ],
      "detail": "<p>在4亿图文对上进行对比学习，通过双塔架构（ViT+Transformer）实现零样本分类，成为多模态AI的视觉基石。</p>"
    },
    {
      "id": "align",
      "num": 2,
      "name": "ALIGN",
      "fullName": "ALIGN",
      "year": "2021",
      "org": "Google",
      "parent": "clip",
      "paperUrl": "ICML 2021",
      "projectUrl": "",
      "category": "contrastive",
      "motivation": "验证规模胜于质量的假设",
      "summary": "使用18亿对原始噪声Alt-text数据，证明简单架构在大规模数据下的强大生命力。",
      "keyPoints": [
        "核心动机：验证规模胜于质量的假设",
        "演化来源：继承或改进自 clip",
        "代表机构：Google",
        "使用18亿对原始噪声Alt-text数据，证明简单架构在大规模数据下的强大生命力。"
      ],
      "detail": "<p>使用18亿对原始噪声Alt-text数据，证明简单架构在大规模数据下的强大生命力。</p>"
    },
    {
      "id": "vilt",
      "num": 3,
      "name": "ViLT",
      "fullName": "ViLT",
      "year": "2021",
      "org": "KAIST",
      "parent": "—",
      "paperUrl": "ICML 2021",
      "projectUrl": "",
      "category": "encoder_decoder",
      "motivation": "首个完全摒弃目标检测器的VLM",
      "summary": "直接将图像Patch和文本Token拼接输入统一Transformer，解决推理速度慢的痛点。",
      "keyPoints": [
        "核心动机：首个完全摒弃目标检测器的VLM",
        "代表机构：KAIST",
        "直接将图像Patch和文本Token拼接输入统一Transformer，解决推理速度慢的痛点。"
      ],
      "detail": "<p>直接将图像Patch和文本Token拼接输入统一Transformer，解决推理速度慢的痛点。</p>"
    },
    {
      "id": "albef",
      "num": 4,
      "name": "ALBEF",
      "fullName": "ALBEF",
      "year": "2021",
      "org": "Salesforce",
      "parent": "clip",
      "paperUrl": "NeurIPS 2021",
      "projectUrl": "",
      "category": "encoder_decoder",
      "motivation": "对齐后融合+动量蒸馏处理噪声",
      "summary": "ALBEF 提出在跨模态融合之前先通过对比学习对齐图像与文本表征，并引入动量蒸馏（Momentum Distillation）从噪声网络数据中学习鲁棒的多模态表征，在图文检索、VQA、NLVR2、视觉蕴含等多项下游任务上取得当时的 SOTA 性能。",
      "keyPoints": [
        "<strong>\"先对齐再融合\"架构</strong>：图像编码器（ViT-B/16）和文本编码器（BERT 前 6 层）先独立编码，通过 ITC 对比损失在融合前对齐单模态表征，再送入 6 层多模态编码器进行深度交互",
        "<strong>三大预训练目标联合优化</strong>：Image-Text Contrastive Learning（ITC）、Image-Text Matching（ITM）、Masked Language Modeling（MLM）",
        "<strong>动量蒸馏（MoD）</strong>：维护一个指数移动平均的动量模型，生成伪标签（软目标）替代噪声的 one-hot 标签，显著提升对网络噪声数据的鲁棒性",
        "<strong>难负例挖掘</strong>：利用 ITC 的对比相似度选取最具迷惑性的负样本用于 ITM 训练，提升细粒度匹配能力",
        "<strong>预训练数据</strong>：使用 4M 或 14M 规模的网络图文对数据（来自 Conceptual Captions、SBU、COCO、Visual Genome 等）",
        "<strong>下游任务全面 SOTA</strong>：在 Flickr30K 检索（TR R@1 95.9%）、COCO 检索、VQA（76.04）、NLVR2（82.55）、Visual Entailment（80.91）等任务上超越同期方法"
      ],
      "detail": "<h5>模型架构总览</h5>\n<p><img alt=\"ALBEF 模型架构图\" src=\"https://ar5iv.labs.arxiv.org/html/2107.07651/assets/x1.png\" />\n<em>图：ALBEF 预训练框架。左侧为图像编码器（12 层 ViT）和文本编码器（6 层 Transformer），右侧为多模态编码器（6 层带交叉注意力的 Transformer）。三个预训练目标 ITC、ITM、MLM 联合优化。动量模型（虚线框）用于生成伪标签进行蒸馏。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># ALBEF 预训练伪代码\n# 初始化\nimage_encoder = ViT_B_16()          # 12层 Vision Transformer\ntext_encoder = BERT_base[:6]         # BERT 前6层\nmultimodal_encoder = BERT_base[6:]   # BERT 后6层 + 交叉注意力\n# 动量模型（指数移动平均）\nmom_image_encoder = copy(image_encoder)\nmom_text_encoder = copy(text_encoder)\nmom_multimodal_encoder = copy(multimodal_encoder)\n\nfor images, texts in dataloader:\n    # === 单模态编码 ===\n    img_feat = image_encoder(images)       # [B, N+1, D], 含[CLS]\n    txt_feat = text_encoder(texts)         # [B, L, D], 含[CLS]\n    img_cls = normalize(img_proj(img_feat[:, 0]))  # 图像[CLS]投影\n    txt_cls = normalize(txt_proj(txt_feat[:, 0]))  # 文本[CLS]投影\n\n    # === 1. ITC: Image-Text Contrastive Loss ===\n    sim_i2t = img_cls @ txt_cls.T / tau   # 温度缩放的相似度矩阵\n    # 动量模型生成软目标\n    with no_grad():\n        mom_img_cls = mom_image_encoder(images)[:, 0]\n        mom_txt_cls = mom_text_encoder(texts)[:, 0]\n        soft_target = softmax(mom_img_cls @ mom_txt_cls.T / tau)\n    # ITC损失 = (1-α)*CE(sim, one_hot) + α*KL(sim, soft_target)\n    L_itc = (1 - alpha) * cross_entropy(sim_i2t, labels) \\\n          + alpha * kl_div(log_softmax(sim_i2t), soft_target)\n\n    # === 2. ITM: Image-Text Matching Loss ===\n    # 利用ITC相似度挖掘难负例\n    hard_neg_texts = select_hard_negatives(sim_i2t, texts)\n    hard_neg_images = select_hard_negatives(sim_i2t.T, images)\n    # 正样本 + 难负例 送入多模态编码器\n    itm_logits = multimodal_encoder(img_feat, txt_feat)  # 交叉注意力融合\n    L_itm = binary_cross_entropy(itm_logits, match_labels)\n\n    # === 3. MLM: Masked Language Modeling Loss ===\n    masked_texts = random_mask(texts, prob=0.15)\n    masked_feat = text_encoder(masked_texts)\n    mlm_logits = multimodal_encoder(img_feat, masked_feat)\n    # 动量蒸馏：软目标替代one-hot\n    with no_grad():\n        mom_mlm_soft = mom_multimodal_encoder(mom_img_feat, mom_masked_feat)\n    L_mlm = (1 - alpha) * cross_entropy(mlm_logits, true_tokens) \\\n          + alpha * kl_div(log_softmax(mlm_logits), softmax(mom_mlm_soft))\n\n    # === 总损失 ===\n    loss = L_itc + L_itm + L_mlm\n    loss.backward()\n    optimizer.step()\n\n    # === 更新动量模型 ===\n    mom_image_encoder = m * mom_image_encoder + (1 - m) * image_encoder   # m=0.995\n    mom_text_encoder = m * mom_text_encoder + (1 - m) * text_encoder\n    mom_multimodal_encoder = m * mom_multimodal_encoder + (1 - m) * multimodal_encoder\n</code></pre>\n<h5>动机与背景</h5>\n<p>视觉-语言预训练（VLP）旨在从大规模图文对中学习通用的多模态表征。在 ALBEF 之前，主流方法面临两大核心问题：</p>\n<ol>\n<li>\n<p><strong>视觉特征瓶颈</strong>：早期方法（如 ViLBERT、UNITER）依赖预训练的目标检测器（如 Faster R-CNN）提取区域特征，导致计算开销巨大且视觉特征无法端到端优化。虽然 ViLT 尝试直接使用图像 Patch，但其简单拼接的方式缺乏有效的跨模态对齐。</p>\n</li>\n<li>\n<p><strong>网络数据噪声</strong>：从互联网收集的图文对（如 Conceptual Captions）普遍存在文本与图像弱相关甚至不相关的噪声问题。传统方法使用 one-hot 标签监督，将每个图文对视为严格匹配/不匹配，无法处理这种模糊性。</p>\n</li>\n</ol>\n<div class=\"key-point\">💡 关键洞察：ALBEF 的核心思想是\"<strong>先对齐，再融合</strong>\"——在将图像和文本特征送入昂贵的多模态融合模块之前，先通过轻量级的对比学习将两个模态的表征空间对齐，使融合模块能更高效地学习细粒度的跨模态交互。</div>\n<h5>核心机制详解</h5>\n<p><strong>（1）模型架构：三段式设计</strong></p>\n<p>ALBEF 采用三段式架构，而非传统的单一 Transformer：</p>\n<ul>\n<li>\n<p><strong>图像编码器</strong>：12 层 ViT-B/16，将 \\(256 \\times 256\\) 图像分割为 \\(16 \\times 16\\) 的 Patch 序列，输出 \\(\\{v_{\\text{cls}}, v_1, \\ldots, v_N\\}\\)，其中 \\(N = 256\\)（含 1 个 [CLS] token）。使用 ImageNet-1K 预训练的 DeiT 权重初始化。</p>\n</li>\n<li>\n<p><strong>文本编码器</strong>：6 层 Transformer（取 BERT-base 前 6 层），输出 \\(\\{w_{\\text{cls}}, w_1, \\ldots, w_L\\}\\)。使用 BERT-base 预训练权重初始化。</p>\n</li>\n<li>\n<p><strong>多模态编码器</strong>：6 层带交叉注意力（Cross-Attention）的 Transformer（取 BERT-base 后 6 层，并插入交叉注意力层）。文本特征作为 Query，图像特征作为 Key/Value，通过交叉注意力实现深度融合。</p>\n</li>\n</ul>\n<div class=\"warn-box\">⚠️ 注意：多模态编码器中的交叉注意力层是新增的（随机初始化），而自注意力和前馈层则继承自 BERT-base 后 6 层的权重。</div>\n<p><strong>（2）三大预训练目标</strong></p>\n<p><strong>Image-Text Contrastive Learning (ITC)</strong>：在融合之前对齐单模态表征。将图像 [CLS] 和文本 [CLS] 分别通过线性投影映射到归一化的低维空间，计算余弦相似度：</p>\n<p>$$s(I, T) = g_v(v_{\\text{cls}})^\\top g_w(w_{\\text{cls}})$$</p>\n<p>其中 \\(g_v, g_w\\) 为线性投影头。对比损失采用 InfoNCE 形式，正样本为匹配的图文对，负样本来自同一 batch 内的其他样本。此外，ALBEF 维护两个动量队列（momentum queue）存储最近的特征向量，扩大负样本数量而不增加 GPU 显存开销。</p>\n<p><strong>Image-Text Matching (ITM)</strong>：二分类任务，判断图文对是否匹配。将图像和文本特征送入多模态编码器，取输出的 [CLS] token 经线性分类头预测匹配概率。关键创新在于<strong>难负例挖掘</strong>：利用 ITC 计算的相似度矩阵，为每张图像选择与之最相似但不匹配的文本作为负样本（反之亦然），迫使模型学习更细粒度的区分能力。</p>\n<p>$$p^{\\text{itm}} = \\text{softmax}(f_{\\text{cls}}(\\text{MultimodalEnc}(v, w)))$$</p>\n<p><strong>Masked Language Modeling (MLM)</strong>：随机遮蔽 15% 的文本 token，利用图像信息和上下文预测被遮蔽的词。与 BERT 的 MLM 不同，这里的预测同时依赖文本上下文和视觉信息，迫使模型学习细粒度的视觉-语言对齐。</p>\n<p>$$L_{\\text{mlm}} = \\mathbb{E}_{(I,\\hat{T}) \\sim D}\\, H\\big(y^{\\text{msk}},\\, p^{\\text{msk}}(I, \\hat{T})\\big)$$</p>\n<p>其中 \\(\\hat{T}\\) 是遮蔽后的文本，\\(y^{\\text{msk}}\\) 是被遮蔽 token 的真实标签。</p>\n<p><strong>（3）动量蒸馏（Momentum Distillation, MoD）</strong></p>\n<p>这是 ALBEF 最重要的创新之一。核心思想是：网络图文对的 one-hot 标签不可靠（一张图可能与多个文本相关），因此用动量模型生成的软标签（soft pseudo-targets）替代硬标签。</p>\n<p>动量模型是在线模型的指数移动平均（EMA）版本：</p>\n<p>$$\\theta' = m \\cdot \\theta' + (1 - m) \\cdot \\theta, \\quad m = 0.995$$</p>\n<p>对于 ITC 损失，动量模型生成的软目标为：</p>\n<p>$$q^{\\text{i2t}} = \\frac{\\exp(s'(I, T_i) / \\tau)}{\\sum_j \\exp(s'(I, T_j) / \\tau)}$$</p>\n<p>最终 ITC 损失变为原始 CE 损失与 KL 散度的加权组合：</p>\n<p>$$L_{\\text{itc}}^{\\text{mod}} = (1 - \\alpha) \\cdot H(y^{\\text{i2t}}, p^{\\text{i2t}}) + \\alpha \\cdot \\text{KL}(q^{\\text{i2t}} \\| p^{\\text{i2t}})$$</p>\n<p>类似地，MLM 损失也引入动量蒸馏。这使得模型能从动量模型的\"集体智慧\"中学习，即使原始标签有噪声，软目标也能提供更准确的监督信号。</p>\n<div class=\"key-point\">💡 关键：动量蒸馏的本质是<strong>自训练（self-training）</strong>——用模型自身的平滑版本生成伪标签。由于 EMA 模型是多步训练的集成，其预测比单步模型更稳定，能有效抑制噪声标签的影响。</div>\n<h5>下游任务适配与训练流程</h5>\n<p>ALBEF 的下游任务适配非常灵活：</p>\n<ul>\n<li><strong>图文检索</strong>：直接使用 ITC 相似度进行粗排，再用 ITM 分数精排。ITC 提供高效的全局匹配，ITM 提供精确的细粒度判断。</li>\n<li><strong>VQA</strong>：将多模态编码器的输出接一个 6 层 Transformer 解码器，以自回归方式生成答案（开放式生成而非分类）。</li>\n<li><strong>NLVR2</strong>：需要判断两张图片与一段文本的关系。ALBEF 对两张图分别与文本进行多模态编码，然后合并 [CLS] 特征进行分类。</li>\n<li><strong>Visual Entailment</strong>：类似 ITM，判断图像是否蕴含文本假设。</li>\n</ul>\n<p>预训练配置：使用 AdamW 优化器，学习率 \\(1 \\times 10^{-4}\\)（图像编码器 \\(1 \\times 10^{-5}\\)），在 8 张 A100 上训练 30 个 epoch（4M 数据）。</p>\n<h5>与传统方法的关键区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>传统方法（UNITER等）</th>\n<th>ViLT</th>\n<th>ALBEF</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>视觉特征</td>\n<td>目标检测器（Faster R-CNN）</td>\n<td>原始 Patch</td>\n<td>原始 Patch（ViT）</td>\n</tr>\n<tr>\n<td>跨模态交互</td>\n<td>直接拼接融合</td>\n<td>直接拼接融合</td>\n<td><strong>先对齐再融合</strong></td>\n</tr>\n<tr>\n<td>噪声处理</td>\n<td>无</td>\n<td>无</td>\n<td><strong>动量蒸馏</strong></td>\n</tr>\n<tr>\n<td>负例策略</td>\n<td>随机采样</td>\n<td>随机采样</td>\n<td><strong>难负例挖掘</strong></td>\n</tr>\n<tr>\n<td>推理效率</td>\n<td>慢（需检测器）</td>\n<td>快</td>\n<td>中等（三段式）</td>\n</tr>\n</tbody>\n</table></div>\n<p>ALBEF 的核心优势在于：(1) 对比学习预对齐使融合更高效；(2) 动量蒸馏使模型对噪声数据鲁棒；(3) 端到端训练避免了目标检测器的瓶颈。</p>",
      "quiz": {
        "q": "ALBEF 中动量蒸馏（Momentum Distillation）的主要目的是什么？",
        "options": [
          "加速模型训练收敛",
          "增加负样本数量以改善对比学习",
          "用动量模型生成软伪标签，缓解网络图文对的噪声标签问题",
          "减少多模态编码器的计算开销"
        ],
        "answer": 2,
        "explain": "网络爬取的图文对存在大量噪声（文本与图像弱相关），one-hot 硬标签不可靠。动量蒸馏通过 EMA 模型生成软目标分布，为 ITC 和 MLM 提供更准确的监督信号，显著提升模型对噪声数据的鲁棒性。"
      }
    },
    {
      "id": "blip",
      "num": 5,
      "name": "BLIP",
      "fullName": "BLIP",
      "year": "2022",
      "org": "Salesforce",
      "parent": "albef",
      "paperUrl": "ICML 2022",
      "projectUrl": "",
      "category": "encoder_decoder",
      "motivation": "CapFilt数据引导提升质量",
      "summary": "通过Captioner生成合成标题并用Filter剔除噪声，联合优化ITC、ITM和LM三个目标。",
      "keyPoints": [
        "核心动机：CapFilt数据引导提升质量",
        "演化来源：继承或改进自 albef",
        "代表机构：Salesforce",
        "通过Captioner生成合成标题并用Filter剔除噪声，联合优化ITC、ITM和LM三个目标。"
      ],
      "detail": "<p>通过Captioner生成合成标题并用Filter剔除噪声，联合优化ITC、ITM和LM三个目标。</p>"
    },
    {
      "id": "flamingo",
      "num": 6,
      "name": "Flamingo",
      "fullName": "Flamingo",
      "year": "2022",
      "org": "DeepMind",
      "parent": "—",
      "paperUrl": "NeurIPS 2022",
      "projectUrl": "",
      "category": "connector",
      "motivation": "冻结双塔+门控交叉注意力",
      "summary": "80B参数，通过Perceiver Resampler和Gated Cross-Attention连接冻结的视觉与语言模型，实现少样本学习。",
      "keyPoints": [
        "核心动机：冻结双塔+门控交叉注意力",
        "代表机构：DeepMind",
        "80B参数，通过Perceiver Resampler和Gated Cross-Attention连接冻结的视觉与语言模型，实现少样本学习。"
      ],
      "detail": "<p>80B参数，通过Perceiver Resampler和Gated Cross-Attention连接冻结的视觉与语言模型，实现少样本学习。</p>"
    },
    {
      "id": "pali",
      "num": 7,
      "name": "PaLI",
      "fullName": "PaLI",
      "year": "2022",
      "org": "Google",
      "parent": "—",
      "paperUrl": "arXiv",
      "projectUrl": "",
      "category": "encoder_decoder",
      "motivation": "视觉语言联合缩放定律",
      "summary": "提出视觉编码器和语言模型规模应同步增长，支持100+语言的多语言多模态理解。",
      "keyPoints": [
        "核心动机：视觉语言联合缩放定律",
        "代表机构：Google",
        "提出视觉编码器和语言模型规模应同步增长，支持100+语言的多语言多模态理解。"
      ],
      "detail": "<p>提出视觉编码器和语言模型规模应同步增长，支持100+语言的多语言多模态理解。</p>"
    },
    {
      "id": "blip2",
      "num": 8,
      "name": "BLIP-2",
      "fullName": "BLIP-2",
      "year": "2023",
      "org": "Salesforce",
      "parent": "blip",
      "paperUrl": "ICML 2023",
      "projectUrl": "",
      "category": "connector",
      "motivation": "Q-Former高效模态桥接",
      "summary": "188M参数的Q-Former使用32个可学习查询，两阶段预训练实现极高参数效率，以54倍更少参数超越Flamingo-80B。",
      "keyPoints": [
        "核心动机：Q-Former高效模态桥接",
        "演化来源：继承或改进自 blip",
        "代表机构：Salesforce",
        "188M参数的Q-Former使用32个可学习查询，两阶段预训练实现极高参数效率，以54倍更少参数超越Flamingo-80B。"
      ],
      "detail": "<p>188M参数的Q-Former使用32个可学习查询，两阶段预训练实现极高参数效率，以54倍更少参数超越Flamingo-80B。</p>"
    },
    {
      "id": "instructblip",
      "num": 9,
      "name": "InstructBLIP",
      "fullName": "InstructBLIP",
      "year": "2023",
      "org": "Salesforce",
      "parent": "blip2",
      "paperUrl": "NeurIPS 2023",
      "projectUrl": "",
      "category": "connector",
      "motivation": "指令感知视觉特征提取",
      "summary": "将文本指令输入Q-Former，引导查询关注与任务相关的视觉区域，在26个数据集上达到SOTA。",
      "keyPoints": [
        "核心动机：指令感知视觉特征提取",
        "演化来源：继承或改进自 blip2",
        "代表机构：Salesforce",
        "将文本指令输入Q-Former，引导查询关注与任务相关的视觉区域，在26个数据集上达到SOTA。"
      ],
      "detail": "<p>将文本指令输入Q-Former，引导查询关注与任务相关的视觉区域，在26个数据集上达到SOTA。</p>"
    },
    {
      "id": "minigpt4",
      "num": 10,
      "name": "MiniGPT-4",
      "fullName": "MiniGPT-4",
      "year": "2023",
      "org": "KAUST",
      "parent": "blip2",
      "paperUrl": "ICLR 2024",
      "projectUrl": "",
      "category": "connector",
      "motivation": "线性投影+高质量对话微调",
      "summary": "复用BLIP-2视觉前端，通过单层线性投影连接Vicuna，证明小规模高质量数据在第二阶段的关键作用。",
      "keyPoints": [
        "核心动机：线性投影+高质量对话微调",
        "演化来源：继承或改进自 blip2",
        "代表机构：KAUST",
        "复用BLIP-2视觉前端，通过单层线性投影连接Vicuna，证明小规模高质量数据在第二阶段的关键作用。"
      ],
      "detail": "<p>复用BLIP-2视觉前端，通过单层线性投影连接Vicuna，证明小规模高质量数据在第二阶段的关键作用。</p>"
    },
    {
      "id": "llava",
      "num": 11,
      "name": "LLaVA",
      "fullName": "LLaVA",
      "year": "2023",
      "org": "UW-Microsoft",
      "parent": "clip",
      "paperUrl": "NeurIPS 2023 Oral",
      "projectUrl": "",
      "category": "connector",
      "motivation": "视觉指令微调开创者",
      "summary": "首次将指令微调引入多模态，通过GPT-4生成15万条对话数据，开启开源多模态对话模型浪潮。",
      "keyPoints": [
        "核心动机：视觉指令微调开创者",
        "演化来源：继承或改进自 clip",
        "代表机构：UW-Microsoft",
        "首次将指令微调引入多模态，通过GPT-4生成15万条对话数据，开启开源多模态对话模型浪潮。"
      ],
      "detail": "<p>首次将指令微调引入多模态，通过GPT-4生成15万条对话数据，开启开源多模态对话模型浪潮。</p>"
    },
    {
      "id": "qwen_vl",
      "num": 12,
      "name": "Qwen-VL",
      "fullName": "Qwen-VL",
      "year": "2023.08",
      "org": "阿里巴巴",
      "parent": "llava",
      "paperUrl": "arXiv",
      "projectUrl": "",
      "category": "connector",
      "motivation": "位置感知跨注意力适配器",
      "summary": "单层Cross-attention适配器支持细粒度定位和强OCR能力，首个原生支持中文的开源多模态大模型。",
      "keyPoints": [
        "核心动机：位置感知跨注意力适配器",
        "演化来源：继承或改进自 llava",
        "代表机构：阿里巴巴",
        "单层Cross-attention适配器支持细粒度定位和强OCR能力，首个原生支持中文的开源多模态大模型。"
      ],
      "detail": "<p>单层Cross-attention适配器支持细粒度定位和强OCR能力，首个原生支持中文的开源多模态大模型。</p>"
    },
    {
      "id": "cogvlm",
      "num": 13,
      "name": "CogVLM",
      "fullName": "CogVLM",
      "year": "2023",
      "org": "智谱AI",
      "parent": "llava",
      "paperUrl": "arXiv",
      "projectUrl": "",
      "category": "connector",
      "motivation": "视觉专家模块深度融合",
      "summary": "17B参数，在LLM每一层引入独立的视觉QKV矩阵和MLP层，实现视觉优先的深度融合。",
      "keyPoints": [
        "核心动机：视觉专家模块深度融合",
        "演化来源：继承或改进自 llava",
        "代表机构：智谱AI",
        "17B参数，在LLM每一层引入独立的视觉QKV矩阵和MLP层，实现视觉优先的深度融合。"
      ],
      "detail": "<p>17B参数，在LLM每一层引入独立的视觉QKV矩阵和MLP层，实现视觉优先的深度融合。</p>"
    },
    {
      "id": "gemini",
      "num": 14,
      "name": "Gemini",
      "fullName": "Gemini",
      "year": "2023.12",
      "org": "Google",
      "parent": "pali",
      "paperUrl": "Technical Report",
      "projectUrl": "",
      "category": "native_multimodal",
      "motivation": "原生多模态联合训练",
      "summary": "从预训练阶段即在跨模态数据上联合训练，支持文本、图像、音频、视频无缝交错，在30/32个基准上刷新SOTA。",
      "keyPoints": [
        "核心动机：原生多模态联合训练",
        "演化来源：继承或改进自 pali",
        "代表机构：Google",
        "从预训练阶段即在跨模态数据上联合训练，支持文本、图像、音频、视频无缝交错，在30/32个基准上刷新SOTA。"
      ],
      "detail": "<p>从预训练阶段即在跨模态数据上联合训练，支持文本、图像、音频、视频无缝交错，在30/32个基准上刷新SOTA。</p>"
    },
    {
      "id": "llava_next",
      "num": 15,
      "name": "LLaVA-NeXT",
      "fullName": "LLaVA-NeXT",
      "year": "2024.01",
      "org": "UW-ByteDance",
      "parent": "llava",
      "paperUrl": "arXiv",
      "projectUrl": "",
      "category": "connector",
      "motivation": "AnyRes动态分辨率切片",
      "summary": "将高分辨率图像切分为多个336x336子图并保留全局图，支持4倍像素量，显著提升OCR和文档理解能力。",
      "keyPoints": [
        "核心动机：AnyRes动态分辨率切片",
        "演化来源：继承或改进自 llava",
        "代表机构：UW-ByteDance",
        "将高分辨率图像切分为多个336x336子图并保留全局图，支持4倍像素量，显著提升OCR和文档理解能力。"
      ],
      "detail": "<p>将高分辨率图像切分为多个336x336子图并保留全局图，支持4倍像素量，显著提升OCR和文档理解能力。</p>"
    },
    {
      "id": "internvl_2_5",
      "num": 16,
      "name": "InternVL 2.5",
      "fullName": "InternVL 2.5",
      "year": "2024",
      "org": "上海AI Lab",
      "parent": "—",
      "paperUrl": "arXiv",
      "projectUrl": "",
      "category": "connector",
      "motivation": "动态高分辨率+Pixel Unshuffle",
      "summary": "采用InternViT-6B视觉端，通过像素逆置减少Token数量，首个在MMMU上突破70分的开源模型。",
      "keyPoints": [
        "核心动机：动态高分辨率+Pixel Unshuffle",
        "代表机构：上海AI Lab",
        "采用InternViT-6B视觉端，通过像素逆置减少Token数量，首个在MMMU上突破70分的开源模型。"
      ],
      "detail": "<p>采用InternViT-6B视觉端，通过像素逆置减少Token数量，首个在MMMU上突破70分的开源模型。</p>"
    },
    {
      "id": "internvl_3_5",
      "num": 17,
      "name": "InternVL 3.5",
      "fullName": "InternVL 3.5",
      "year": "2025",
      "org": "上海AI Lab",
      "parent": "internvl_2_5",
      "paperUrl": "arXiv",
      "projectUrl": "",
      "category": "connector",
      "motivation": "级联RL逻辑对齐",
      "summary": "引入级联式强化学习进行逻辑对齐，采用解耦部署架构（DvD），响应速度提升4倍。",
      "keyPoints": [
        "核心动机：级联RL逻辑对齐",
        "演化来源：继承或改进自 internvl_2_5",
        "代表机构：上海AI Lab",
        "引入级联式强化学习进行逻辑对齐，采用解耦部署架构（DvD），响应速度提升4倍。"
      ],
      "detail": "<p>引入级联式强化学习进行逻辑对齐，采用解耦部署架构（DvD），响应速度提升4倍。</p>"
    },
    {
      "id": "siglip2",
      "num": 18,
      "name": "SigLIP 2",
      "fullName": "SigLIP 2",
      "year": "2026.02",
      "org": "Google",
      "parent": "clip",
      "paperUrl": "arXiv",
      "projectUrl": "",
      "category": "frontier_2026",
      "motivation": "统一训练配方增强定位",
      "summary": "整合描述、自蒸馏和掩码预测任务，显著增强定位能力，成为新一代视觉编码器标准。",
      "keyPoints": [
        "核心动机：统一训练配方增强定位",
        "演化来源：继承或改进自 clip",
        "代表机构：Google",
        "整合描述、自蒸馏和掩码预测任务，显著增强定位能力，成为新一代视觉编码器标准。"
      ],
      "detail": "<p>整合描述、自蒸馏和掩码预测任务，显著增强定位能力，成为新一代视觉编码器标准。</p>"
    },
    {
      "id": "llm2clip",
      "num": 19,
      "name": "LLM2CLIP",
      "fullName": "LLM2CLIP",
      "year": "2026.01",
      "org": "AAAI 2026杰出论文",
      "parent": "clip",
      "paperUrl": "AAAI 2026",
      "projectUrl": "",
      "category": "frontier_2026",
      "motivation": "语言模型解锁视觉表示",
      "summary": "展示如何利用强大的语言模型解锁更丰富的视觉表示，获得AAAI 2026杰出论文奖。",
      "keyPoints": [
        "核心动机：语言模型解锁视觉表示",
        "演化来源：继承或改进自 clip",
        "代表机构：AAAI 2026杰出论文",
        "展示如何利用强大的语言模型解锁更丰富的视觉表示，获得AAAI 2026杰出论文奖。"
      ],
      "detail": "<p>展示如何利用强大的语言模型解锁更丰富的视觉表示，获得AAAI 2026杰出论文奖。</p>"
    },
    {
      "id": "gpt5_4",
      "num": 20,
      "name": "GPT-5.4",
      "fullName": "GPT-5.4",
      "year": "2026.03",
      "org": "OpenAI",
      "parent": "gemini",
      "paperUrl": "—",
      "projectUrl": "",
      "category": "native_multimodal",
      "motivation": "原生统一架构+1M上下文",
      "summary": "原生统一架构支持1M上下文，强化计算机交互能力，在MMMU Pro上达到75%。",
      "keyPoints": [
        "核心动机：原生统一架构+1M上下文",
        "演化来源：继承或改进自 gemini",
        "代表机构：OpenAI",
        "原生统一架构支持1M上下文，强化计算机交互能力，在MMMU Pro上达到75%。"
      ],
      "detail": "<p>原生统一架构支持1M上下文，强化计算机交互能力，在MMMU Pro上达到75%。</p>"
    },
    {
      "id": "gemini_3_1",
      "num": 21,
      "name": "Gemini 3.1 Pro",
      "fullName": "Gemini 3.1 Pro",
      "year": "2026.02",
      "org": "Google",
      "parent": "gemini",
      "paperUrl": "—",
      "projectUrl": "",
      "category": "native_multimodal",
      "motivation": "2M超长上下文多模态",
      "summary": "支持2M超长上下文，实现音视频图文同步处理，在MMMU Pro上达到79%。",
      "keyPoints": [
        "核心动机：2M超长上下文多模态",
        "演化来源：继承或改进自 gemini",
        "代表机构：Google",
        "支持2M超长上下文，实现音视频图文同步处理，在MMMU Pro上达到79%。"
      ],
      "detail": "<p>支持2M超长上下文，实现音视频图文同步处理，在MMMU Pro上达到79%。</p>"
    },
    {
      "id": "claude_opus_4_7",
      "num": 22,
      "name": "Claude Opus 4.7",
      "fullName": "Claude Opus 4.7",
      "year": "2026.04",
      "org": "Anthropic",
      "parent": "—",
      "paperUrl": "—",
      "projectUrl": "",
      "category": "frontier_2026",
      "motivation": "xhigh深度推理模式",
      "summary": "支持3.75MP高分辨率输入，引入\"xhigh\"深度推理模式，在OmniDocBench上达到87.7。",
      "keyPoints": [
        "核心动机：xhigh深度推理模式",
        "代表机构：Anthropic",
        "支持3.75MP高分辨率输入，引入\"xhigh\"深度推理模式，在OmniDocBench上达到87.7。"
      ],
      "detail": "<p>支持3.75MP高分辨率输入，引入\"xhigh\"深度推理模式，在OmniDocBench上达到87.7。</p>"
    },
    {
      "id": "llama4",
      "num": 23,
      "name": "Llama 4",
      "fullName": "Llama 4",
      "year": "2025.04",
      "org": "Meta",
      "parent": "—",
      "paperUrl": "—",
      "projectUrl": "",
      "category": "native_multimodal",
      "motivation": "原生MoE+1M上下文",
      "summary": "原生多模态MoE架构，17B激活参数，1M上下文，LMArena ELO达到1417。",
      "keyPoints": [
        "核心动机：原生MoE+1M上下文",
        "代表机构：Meta",
        "原生多模态MoE架构，17B激活参数，1M上下文，LMArena ELO达到1417。"
      ],
      "detail": "<p>原生多模态MoE架构，17B激活参数，1M上下文，LMArena ELO达到1417。</p>"
    },
    {
      "id": "qwen3_5_vlm",
      "num": 24,
      "name": "Qwen3.5-VLM",
      "fullName": "Qwen3.5-VLM",
      "year": "2026.02",
      "org": "阿里巴巴",
      "parent": "qwen_vl",
      "paperUrl": "—",
      "projectUrl": "",
      "category": "frontier_2026",
      "motivation": "GDN早期融合架构",
      "summary": "Gated Delta Network+MoE，256K原生上下文，早期融合架构，在OmniDocBench上达到90.8。",
      "keyPoints": [
        "核心动机：GDN早期融合架构",
        "演化来源：继承或改进自 qwen_vl",
        "代表机构：阿里巴巴",
        "Gated Delta Network+MoE，256K原生上下文，早期融合架构，在OmniDocBench上达到90.8。"
      ],
      "detail": "<p>Gated Delta Network+MoE，256K原生上下文，早期融合架构，在OmniDocBench上达到90.8。</p>"
    },
    {
      "id": "doubao_2_0",
      "num": 25,
      "name": "豆包2.0 Pro",
      "fullName": "豆包2.0 Pro",
      "year": "2026.02",
      "org": "字节跳动",
      "parent": "—",
      "paperUrl": "—",
      "projectUrl": "",
      "category": "frontier_2026",
      "motivation": "万亿MoE视频解析",
      "summary": "万亿参数MoE架构，强化复杂文档与视频解析能力，在SuperCLUE-VLM上达到90.66。",
      "keyPoints": [
        "核心动机：万亿MoE视频解析",
        "代表机构：字节跳动",
        "万亿参数MoE架构，强化复杂文档与视频解析能力，在SuperCLUE-VLM上达到90.66。"
      ],
      "detail": "<p>万亿参数MoE架构，强化复杂文档与视频解析能力，在SuperCLUE-VLM上达到90.66。</p>"
    },
    {
      "id": "glm_4_5v",
      "num": 26,
      "name": "GLM-4.5V",
      "fullName": "GLM-4.5V",
      "year": "2026",
      "org": "智谱AI",
      "parent": "cogvlm",
      "paperUrl": "—",
      "projectUrl": "",
      "category": "frontier_2026",
      "motivation": "3D-RoPE思考模式",
      "summary": "3D-RoPE空间感知技术，支持\"思考模式\"切换，科学推理能力大幅提升。",
      "keyPoints": [
        "核心动机：3D-RoPE思考模式",
        "演化来源：继承或改进自 cogvlm",
        "代表机构：智谱AI",
        "3D-RoPE空间感知技术，支持\"思考模式\"切换，科学推理能力大幅提升。"
      ],
      "detail": "<p>3D-RoPE空间感知技术，支持\"思考模式\"切换，科学推理能力大幅提升。</p>"
    },
    {
      "id": "deepseek_v4",
      "num": 27,
      "name": "DeepSeek-V4",
      "fullName": "DeepSeek-V4",
      "year": "2026.04",
      "org": "DeepSeek",
      "parent": "—",
      "paperUrl": "—",
      "projectUrl": "",
      "category": "frontier_2026",
      "motivation": "Engram条件内存",
      "summary": "1.6T参数MoE，Engram条件内存机制，推理成本降低10倍，空间导航胜过GPT-5.4。",
      "keyPoints": [
        "核心动机：Engram条件内存",
        "代表机构：DeepSeek",
        "1.6T参数MoE，Engram条件内存机制，推理成本降低10倍，空间导航胜过GPT-5.4。"
      ],
      "detail": "<p>1.6T参数MoE，Engram条件内存机制，推理成本降低10倍，空间导航胜过GPT-5.4。</p>"
    },
    {
      "id": "internvl_3_0",
      "num": 28,
      "name": "InternVL 3.0",
      "fullName": "InternVL 3.0",
      "year": "2025.04",
      "org": "上海AI Lab",
      "parent": "internvl_3_5",
      "paperUrl": "—",
      "projectUrl": "",
      "category": "native_multimodal",
      "motivation": "V2PE原生多模态预训练",
      "summary": "原生多模态预训练，V2PE可变位置编码，支持万级token，在MMMU上达到72.2。",
      "keyPoints": [
        "核心动机：V2PE原生多模态预训练",
        "演化来源：继承或改进自 internvl_3_5",
        "代表机构：上海AI Lab",
        "原生多模态预训练，V2PE可变位置编码，支持万级token，在MMMU上达到72.2。"
      ],
      "detail": "<p>原生多模态预训练，V2PE可变位置编码，支持万级token，在MMMU上达到72.2。</p>"
    },
    {
      "id": "v_jepa2",
      "num": 29,
      "name": "V-JEPA 2",
      "fullName": "V-JEPA 2",
      "year": "2026",
      "org": "Meta",
      "parent": "—",
      "paperUrl": "ICLR 2026",
      "projectUrl": "",
      "category": "frontier_2026",
      "motivation": "预测编码视频理解",
      "summary": "预测编码器家族，通过预测潜在表示而非像素，在视频理解和规划中表现卓越。",
      "keyPoints": [
        "核心动机：预测编码视频理解",
        "代表机构：Meta",
        "预测编码器家族，通过预测潜在表示而非像素，在视频理解和规划中表现卓越。"
      ],
      "detail": "<p>预测编码器家族，通过预测潜在表示而非像素，在视频理解和规划中表现卓越。</p>"
    },
    {
      "id": "drivepi",
      "num": 30,
      "name": "DrivePI",
      "fullName": "DrivePI",
      "year": "2026",
      "org": "—",
      "parent": "—",
      "paperUrl": "CVPR 2026",
      "projectUrl": "",
      "category": "frontier_2026",
      "motivation": "4D多模态自动驾驶",
      "summary": "空间感知的4D多模态大模型，统一自动驾驶的感知、预测与规划，实现端到端闭环控制。",
      "keyPoints": [
        "核心动机：4D多模态自动驾驶",
        "代表机构：—",
        "空间感知的4D多模态大模型，统一自动驾驶的感知、预测与规划，实现端到端闭环控制。"
      ],
      "detail": "<p>空间感知的4D多模态大模型，统一自动驾驶的感知、预测与规划，实现端到端闭环控制。</p>"
    }
  ],
  "categories": {
    "contrastive": {
      "label": "对比学习",
      "color": "#3B82F6"
    },
    "encoder_decoder": {
      "label": "编解码器",
      "color": "#10B981"
    },
    "connector": {
      "label": "连接器架构",
      "color": "#F59E0B"
    },
    "native_multimodal": {
      "label": "原生多模态",
      "color": "#8B5CF6"
    },
    "frontier_2026": {
      "label": "2026前沿",
      "color": "#EF4444"
    }
  },
  "projectUrls": {}
};
