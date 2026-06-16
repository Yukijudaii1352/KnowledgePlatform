/**
 * mm_video-data.js — 由 pipeline/build.py 于 2026-06-16 17:00:18 自动生成。
 * 源文件：content/mm/mm_video.md
 * ⚠️  请勿手动修改；如需更新，修改源文档后重新编译。
 */
window.PAGE_CONFIG = {
  "meta": {
    "domain": "multimodal",
    "topic_id": "mm_video",
    "topic_name": "视觉理解",
    "page_title": "视觉理解技术演进总结",
    "page_subtitle": "2026-05-12 版",
    "page_desc": "概述视频理解从传统时序建模、语义定位到Video-LLM的发展脉络",
    "page_icon": "🎬",
    "hero_pills": [
      "🏷️ Video-LLM · Temporal Grounding · Summarization · Long Video QA"
    ],
    "count_pill": "32 个算法",
    "image_base": "../../content/mm/mm_video/assets/",
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
        "id": "movieqa",
        "x": 100,
        "y": 50,
        "category": "classic"
      },
      {
        "id": "videobert",
        "x": 200,
        "y": 50,
        "category": "classic"
      },
      {
        "id": "clip4clip",
        "x": 350,
        "y": 50,
        "category": "classic"
      },
      {
        "id": "cinepile",
        "x": 500,
        "y": 50,
        "category": "classic"
      },
      {
        "id": "scnn",
        "x": 100,
        "y": 150,
        "category": "localization"
      },
      {
        "id": "cdc",
        "x": 200,
        "y": 150,
        "category": "localization"
      },
      {
        "id": "bsn",
        "x": 300,
        "y": 150,
        "category": "localization"
      },
      {
        "id": "bmn",
        "x": 400,
        "y": 150,
        "category": "localization"
      },
      {
        "id": "gtad",
        "x": 500,
        "y": 150,
        "category": "localization"
      },
      {
        "id": "afsd",
        "x": 600,
        "y": 150,
        "category": "localization"
      },
      {
        "id": "tallformer",
        "x": 700,
        "y": 150,
        "category": "localization"
      },
      {
        "id": "tall",
        "x": 200,
        "y": 250,
        "category": "grounding"
      },
      {
        "id": "mcn",
        "x": 200,
        "y": 300,
        "category": "grounding"
      },
      {
        "id": "2dtan",
        "x": 350,
        "y": 250,
        "category": "grounding"
      },
      {
        "id": "vslnet",
        "x": 350,
        "y": 300,
        "category": "grounding"
      },
      {
        "id": "moment_detr",
        "x": 500,
        "y": 275,
        "category": "grounding"
      },
      {
        "id": "univtg",
        "x": 650,
        "y": 275,
        "category": "grounding"
      },
      {
        "id": "mqvtg",
        "x": 800,
        "y": 275,
        "category": "grounding"
      },
      {
        "id": "dsnet",
        "x": 300,
        "y": 400,
        "category": "video_llm"
      },
      {
        "id": "video_chatgpt",
        "x": 450,
        "y": 400,
        "category": "video_llm"
      },
      {
        "id": "videollama",
        "x": 550,
        "y": 400,
        "category": "video_llm"
      },
      {
        "id": "llava_video",
        "x": 650,
        "y": 400,
        "category": "video_llm"
      },
      {
        "id": "internvideo2",
        "x": 750,
        "y": 400,
        "category": "video_llm"
      },
      {
        "id": "videollama3",
        "x": 850,
        "y": 400,
        "category": "video_llm"
      },
      {
        "id": "hmt",
        "x": 400,
        "y": 500,
        "category": "frontier_2026"
      },
      {
        "id": "lvsum",
        "x": 500,
        "y": 500,
        "category": "frontier_2026"
      },
      {
        "id": "hitea",
        "x": 750,
        "y": 500,
        "category": "frontier_2026"
      },
      {
        "id": "unitime",
        "x": 600,
        "y": 550,
        "category": "frontier_2026"
      },
      {
        "id": "markit",
        "x": 750,
        "y": 550,
        "category": "frontier_2026"
      },
      {
        "id": "universal_vtg_mllm",
        "x": 850,
        "y": 550,
        "category": "frontier_2026"
      },
      {
        "id": "qwen35",
        "x": 950,
        "y": 500,
        "category": "frontier_2026"
      },
      {
        "id": "gemini3pro",
        "x": 950,
        "y": 550,
        "category": "frontier_2026"
      }
    ],
    "edges": [
      {
        "from": "videobert",
        "to": "clip4clip",
        "label": "CLIP迁移"
      },
      {
        "from": "movieqa",
        "to": "cinepile",
        "label": "长视频扩展"
      },
      {
        "from": "scnn",
        "to": "cdc",
        "label": "反卷积"
      },
      {
        "from": "cdc",
        "to": "bsn",
        "label": "边界敏感"
      },
      {
        "from": "bsn",
        "to": "bmn",
        "label": "边界匹配"
      },
      {
        "from": "bmn",
        "to": "gtad",
        "label": "图卷积"
      },
      {
        "from": "gtad",
        "to": "afsd",
        "label": "无锚点"
      },
      {
        "from": "afsd",
        "to": "tallformer",
        "label": "长程记忆"
      },
      {
        "from": "tall",
        "to": "2dtan",
        "label": "二维建模"
      },
      {
        "from": "tall",
        "to": "vslnet",
        "label": "跨度预测"
      },
      {
        "from": "vslnet",
        "to": "moment_detr",
        "label": "Transformer"
      },
      {
        "from": "moment_detr",
        "to": "univtg",
        "label": "统一框架"
      },
      {
        "from": "univtg",
        "to": "mqvtg",
        "label": "时刻量化"
      },
      {
        "from": "clip4clip",
        "to": "video_chatgpt",
        "label": "对话微调"
      },
      {
        "from": "video_chatgpt",
        "to": "videollama",
        "label": "音频融合"
      },
      {
        "from": "videollama",
        "to": "llava_video",
        "label": "合成数据"
      },
      {
        "from": "llava_video",
        "to": "internvideo2",
        "label": "模型缩放"
      },
      {
        "from": "videollama",
        "to": "videollama3",
        "label": "动态分辨率"
      },
      {
        "from": "dsnet",
        "to": "hmt",
        "label": "层次融合"
      },
      {
        "from": "hmt",
        "to": "lvsum",
        "label": "时间戳感知"
      },
      {
        "from": "univtg",
        "to": "hitea",
        "label": "无训练"
      },
      {
        "from": "moment_detr",
        "to": "unitime",
        "label": "零样本"
      },
      {
        "from": "llava_video",
        "to": "markit",
        "label": "视觉标记"
      },
      {
        "from": "internvideo2",
        "to": "universal_vtg_mllm",
        "label": "生成式"
      },
      {
        "from": "videollama3",
        "to": "qwen35",
        "label": "原生多模态"
      },
      {
        "from": "internvideo2",
        "to": "gemini3pro",
        "label": "超长上下文"
      }
    ],
    "milestones": [
      "tall",
      "moment_detr",
      "video_chatgpt"
    ]
  },
  "algos": [
    {
      "id": "movieqa",
      "num": 1,
      "name": "MovieQA",
      "fullName": "电影问答基准 (MovieQA)",
      "year": "2016",
      "org": "Toronto",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/1512.02902",
      "projectUrl": "",
      "category": "classic",
      "motivation": "首个电影故事理解数据集",
      "summary": "MovieQA 提出了首个大规模电影故事理解问答数据集，包含 14,944 道关于 408 部电影的多选题，支持五种信息源（剧情概要、字幕、剧本、DVS、视频片段），并设计了从简单余弦检索到卷积神经网络和记忆网络的多级基线方法，揭示了视频故事理解的巨大挑战（最佳模型 56.7% vs 人类 83.4%）。",
      "keyPoints": [
        "<strong>大规模多源数据集</strong>：14,944 个 QA 对覆盖 408 部电影，每题 5 个选项，支持 5 种信息源（plot synopses、subtitles、scripts、DVS、video clips）",
        "<strong>视频问答子集</strong>：140 部电影提供时间戳对齐的视频片段（6,462 个 QA），是首个电影级视频 QA 基准",
        "<strong>偏差分析基线（Hasty Student）</strong>：验证答案长度、答案间相似度、问答相似度等偏差均接近随机（20-28%），证明数据集质量",
        "<strong>滑动窗口检索方法（Searching Student）</strong>：基于余弦相似度的滑窗匹配，TF-IDF 在 plot 上达 47.6%",
        "<strong>卷积神经相似度模型（SSCB）</strong>：将问题-故事和答案-故事相似度向量组合为张量，用 CNN 学习评分函数，融合特征后达 56.7%",
        "<strong>改进的端到端记忆网络（MemN2N）</strong>：引入自然语言答案嵌入层和固定 Word2Vec + 线性投影，解决大词汇量过拟合问题，在 scripts 上达 42.3%",
        "<strong>文本表示</strong>：对比 TF-IDF、Word2Vec、SkipThought 三种句子表示，TF-IDF 在词匹配任务最优，Word2Vec 在语义泛化上有优势",
        "<strong>视频 QA 极具挑战</strong>：纯视频 QA 准确率仅 ~23%，接近随机，表明视频故事理解远未解决"
      ],
      "detail": "<p><img alt=\"MovieQA 数据集概览\" src=\"https://ar5iv.labs.arxiv.org/html/1512.02902/assets/x1.png\" />\n<em>图：MovieQA 数据集示例——一个电影场景对应的问题、5 个候选答案以及多种信息源（plot、subtitle、script、DVS、video）</em></p>\n<p><img alt=\"SSCB 神经相似度架构\" src=\"https://ar5iv.labs.arxiv.org/html/1512.02902/assets/x5.png\" />\n<em>图：Searching Student with Convolutional Brain (SSCB) 的神经网络架构，输入为 n×5×2 的相似度张量，经 1×1 卷积和最大池化后输出 5 类 softmax 预测</em></p>\n<pre><code class=\"language-python\"># MovieQA 问答评分框架伪代码\n# 通用评分函数: f(S, q, a_j) → 第j个答案的得分\n# 预测: answer = argmax_j f(S, q, a_j)\n\n# === 方法1: Searching Student (余弦滑窗) ===\ndef searching_student(story_sentences, question, answers, window_H):\n    &quot;&quot;&quot;滑动窗口 + 余弦相似度&quot;&quot;&quot;\n    for j, a_j in enumerate(answers):\n        best_score = -inf\n        for l in range(len(story_sentences) - window_H):\n            window = story_sentences[l : l + window_H]\n            score = sum(cosine(s_k, question) + cosine(s_k, a_j) for s_k in window)\n            best_score = max(best_score, score)\n        scores[j] = best_score\n    return argmax(scores)\n\n# === 方法2: SSCB (卷积神经相似度) ===\ndef sscb(story_sentences, question, answers):\n    &quot;&quot;&quot;CNN 学习相似度评分函数&quot;&quot;&quot;\n    # 计算 g_I(S, q): n维向量, 每个元素是 cosine(s_k, q)\n    g_q = [cosine(s_k, question) for s_k in story_sentences]  # shape: (n,)\n    # 计算 g_I(S, a_j): 对每个答案, shape: (n, 5)\n    g_a = [[cosine(s_k, a_j) for s_k in story_sentences] for a_j in answers]\n    # 堆叠为张量: (n, 5, 2)\n    tensor = stack([replicate(g_q, 5), g_a], dim=-1)\n    # CNN: 1x1 conv (h=10) → MaxPool(3) → 1x1 conv → MeanPool + MaxPool → softmax\n    return cnn(tensor)  # shape: (5,)\n\n# === 方法3: 改进 MemN2N ===\ndef memn2n(story_sentences, question, answers):\n    &quot;&quot;&quot;端到端记忆网络 + 自然语言答案&quot;&quot;&quot;\n    Z = word2vec_embedding  # 固定预训练嵌入\n    T = learnable_projection  # d2 × d1 线性投影\n    u = T @ Z @ mean_pool(question)           # 问题编码\n    m_l = [T @ Z @ mean_pool(s) for s in story_sentences]  # 故事记忆\n    c_l = m_l  # 共享嵌入时 c = m\n    g_j = [T @ Z @ mean_pool(a) for a in answers]  # 答案编码\n    # 注意力机制\n    p = softmax([dot(u, m) for m in m_l])     # 故事句子权重\n    o = sum(p_l * c_l for p_l, c_l in zip(p, c_l))  # 加权故事表示\n    # 预测\n    return softmax([(o + u).T @ g for g in g_j])\n</code></pre>\n<p><strong>动机与背景</strong></p>\n<p>在 MovieQA 之前，视觉问答（VQA）主要关注单张图片的简单事实性问题，而文本 QA 数据集（如 bAbI、MCTest）规模有限且缺乏多模态支持。电影作为一种复杂的叙事媒介，要求理解长时间跨度的因果关系、角色动机和情节发展。MovieQA 的核心动机是构建一个能同时评估文本和视频故事理解能力的大规模基准，弥合视觉感知与语言推理之间的鸿沟。</p>\n<p><strong>数据集构建流程</strong></p>\n<p>数据集的构建分为三个阶段：(1) <strong>QA 生成</strong>：标注者阅读电影的 plot synopsis 后编写问题和正确答案，要求问题涉及\"what/who/why/how\"等多种类型；(2) <strong>干扰项生成</strong>：另一组标注者为每个问题编写 4 个错误但合理的候选答案，要求与正确答案长度和风格相似以避免偏差；(3) <strong>视频对齐</strong>：对于有视频的电影，标注者将每个 QA 与电影中的具体时间段（视频片段）对齐。最终数据集按电影划分为 train/val/test（约 10:2:3 比例），确保同一电影的所有 QA 在同一划分中。</p>\n<p><strong>核心方法解析</strong></p>\n<p>论文提出了三层递进的方法体系。<strong>第一层（Hasty Student）</strong> 完全不看故事，仅利用答案本身的统计偏差（长度、相互相似度）或问答对的表面匹配来猜测答案，结果均接近随机水平（20-28%），验证了数据集设计的有效性。人类在不看故事时也仅达 27.6%。</p>\n<p><strong>第二层（Searching Student）</strong> 引入故事信息，核心思想是在故事中搜索与问题和答案最相关的片段。具体地，对于故事中的每个长度为 <span class=\"kb-math kb-math-inline\">H</span> 的滑动窗口，计算窗口内句子与问题及答案的余弦相似度之和：</p>\n<div class=\"kb-math kb-math-display\">f(S, q, a_j) = \\max_l \\sum_{k=l}^{l+H} \\left[ g_{ss}(s_k, q) + g_{ss}(s_k, a_j) \\right]</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">g_{ss}(s, q) = x(s)^T x(q)</span> 是归一化句子表示的点积。这一方法在 plot 上使用 TF-IDF 特征可达 47.6%。</p>\n<p><strong>SSCB</strong> 进一步将上述相似度向量化并输入 CNN 学习更复杂的评分函数。将 <span class=\"kb-math kb-math-inline\">g_I(S, q)</span>（n 维向量）和 <span class=\"kb-math kb-math-inline\">[g_I(S, a_j)]_{j=1}^5</span>（n×5 矩阵）堆叠为 n×5×2 张量，经两层 1×1 卷积（h=10 个滤波器）、核大小为 3 的最大池化、以及均值+最大池化聚合后，通过 softmax 输出 5 类预测。融合 TF-IDF、Word2Vec、SkipThought 三种特征后，SSCB 在 plot 上达到 <strong>56.7%</strong> 的最佳准确率。</p>\n<p><strong>第三层（改进 MemN2N）</strong> 对原始端到端记忆网络做了两项关键修改：(1) 添加答案嵌入层 <span class=\"kb-math kb-math-inline\">F</span>，将预测从词汇表选择改为自然语言答案排序：<span class=\"kb-math kb-math-inline\">a = \\text{softmax}((o + u)^T g)</span>；(2) 用固定的 Word2Vec 嵌入 <span class=\"kb-math kb-math-inline\">Z</span> 替换可学习的词嵌入，仅学习一个共享线性投影 <span class=\"kb-math kb-math-inline\">T \\in \\mathbb{R}^{d_2 \\times d_1}</span>，将参数量从数百万降至数万。这使得 MemN2N 在长文本源（scripts: 42.3%, DVS: 33.0%）上表现优于 SSCB，因为注意力机制能有效筛选数千句故事中的关键信息。</p>\n<div class=\"key-point\">💡 <strong>关键发现</strong>：文本 QA 中 plot 表现最好（因 QA 基于 plot 生成），但 MemN2N 在 scripts 上超越其他文本源，说明复杂的三方评分函数（故事-问题-答案）对长文本至关重要。视频 QA 准确率仅 ~23%（接近随机的 20%），即使融合字幕也仅达 38%，远低于人类的 83.4%，表明视频故事理解是一个极具挑战的开放问题。</p>\n<p>⚠️ <strong>注意</strong>：所有报告结果均在 val 集上，test 集通过在线评估服务器提交。数据集的 QA 基于 plot synopses 生成，因此 plot 源天然具有优势，其他源（subtitles、scripts、DVS、video）的表现更能反映真实的故事理解能力。</div>",
      "quiz": {
        "q": "MovieQA 对原始 MemN2N 的关键改进是什么？",
        "options": [
          "增加了更多的记忆层（memory hops）以提升推理深度",
          "用固定 Word2Vec 嵌入替换可学习词嵌入，并添加自然语言答案嵌入层",
          "引入视觉特征作为额外的记忆输入",
          "使用 Transformer 注意力机制替换原始的点积注意力"
        ],
        "answer": 1,
        "explain": "原始 MemN2N 的词汇表选择式回答不适用于自然语言多选题，且可学习嵌入在大词汇量下严重过拟合。MovieQA 通过固定 Word2Vec + 共享线性投影解决过拟合，并添加答案嵌入层 F 实现自然语言答案排序。"
      }
    },
    {
      "id": "videobert",
      "num": 2,
      "name": "VideoBERT",
      "fullName": "视频预训练模型 (VideoBERT)",
      "year": "2019",
      "org": "Google",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/1904.01766",
      "projectUrl": "",
      "category": "classic",
      "motivation": "首创视频-语言BERT联合预训练",
      "summary": "VideoBERT 首次将 BERT 的掩码语言模型预训练范式扩展到视频-语言联合建模领域，通过将视频帧量化为离散\"视觉词汇\"并与文本 token 拼接，利用大规模无标注烹饪视频进行自监督预训练，在零样本动作分类和视频字幕生成任务上展现了强大的跨模态理解能力。",
      "keyPoints": [
        "<strong>视觉 token 化</strong>：利用预训练 S3D 网络提取视频片段特征，通过层次化 k-means（4 层 × 12 簇 = 20,736 个视觉词汇）将连续视频特征离散化为 visual tokens",
        "<strong>联合序列建模</strong>：将文本 WordPiece tokens 和视觉 tokens 通过特殊分隔符 <code>[SEP]</code> 拼接为统一序列，输入 BERT 进行联合编码",
        "<strong>三种预训练目标</strong>：text-only 掩码语言模型、video-only 掩码视觉 token 预测、text-video 跨模态对齐分类",
        "<strong>大规模预训练数据</strong>：从 YouTube 收集 312K 烹饪视频（共 23,186 小时），利用 ASR 自动获取文本标注，无需人工标注",
        "<strong>BERT_LARGE 架构</strong>：24 层 Transformer，1024 维隐藏层，16 头自注意力，词表扩展 20,736 个视觉词条目",
        "<strong>下游任务验证</strong>：在 YouCook II 数据集上实现零样本动作分类（verb top-5: 43.3%，object top-5: 33.7%）和视频字幕生成 SOTA（CIDEr: 0.55）"
      ],
      "detail": "<p><img alt=\"VideoBERT 模型总览\" src=\"https://ar5iv.labs.arxiv.org/html/1904.01766/assets/x1.png\" />\n<em>图 1：VideoBERT 模型总览。上方展示预训练过程：将视频帧通过 S3D + 向量量化转为视觉 token，与 ASR 文本 token 拼接后输入 BERT 进行联合预训练。下方展示下游应用：零样本分类和视频字幕生成。</em></p>\n<p><img alt=\"VideoBERT 输入格式与预训练目标\" src=\"https://ar5iv.labs.arxiv.org/html/1904.01766/assets/x2.png\" />\n<em>图 2：VideoBERT 的输入构造方式。文本 token 和视频 token 通过 <code>[CLS]</code>、<code>[SEP]</code>、<code>[&gt;]</code> 等特殊符号组织为统一序列，支持掩码预测和跨模态对齐两种预训练目标。</em></p>\n<h5>算法核心流程</h5>\n<pre><code class=\"language-python\"># VideoBERT 预训练伪代码\n# Step 1: 视频特征提取与量化\nfor video in youtube_cooking_videos:  # 312K videos\n    clips = sample_frames(video, fps=20, window=30)  # 1.5s non-overlapping clips\n    features = S3D_pretrained(clips)  # 1024-dim per clip\n    visual_tokens = hierarchical_kmeans_quantize(features, d=4, k=12)  # 20736 clusters\n\n# Step 2: 文本预处理\nfor video in videos_with_asr:  # ~120K English ASR videos\n    text = youtube_asr_api(video)\n    sentences = add_punctuation_lstm(text)\n    text_tokens = wordpiece_tokenize(sentences)  # 30K vocab\n\n# Step 3: 联合预训练 (BERT_LARGE, 4 TPUs, 0.5M iters)\nfor batch in data_loader:\n    # 目标 1: Text-only MLM\n    loss_text = masked_lm(text_tokens)\n\n    # 目标 2: Video-only masked token prediction  \n    loss_video = masked_lm(visual_tokens)\n\n    # 目标 3: Text-Video alignment classification\n    # [CLS] text_tokens [SEP] video_tokens [SEP]\n    combined = concat(text_tokens, video_tokens)\n    loss_align = binary_classification(combined, is_aligned)\n\n    loss = w1 * loss_text + w2 * loss_video + w3 * loss_align\n    adam_optimizer.step(loss, lr=1e-5, linear_decay)\n</code></pre>\n<h5>动机与背景</h5>\n<p>自然语言处理领域中，BERT 通过在大规模无标注文本上进行自监督预训练，学到了强大的通用语言表征，并在多项下游任务上取得了突破性进展。然而，视频理解领域长期依赖有监督学习范式——需要大量人工标注的动作标签或字幕数据来训练模型。这种范式面临两个核心瓶颈：</p>\n<ol>\n<li><strong>标注成本高昂</strong>：视频标注远比文本标注复杂，需要标注者观看完整视频并理解时序关系</li>\n<li><strong>语义鸿沟</strong>：视觉特征与语言描述之间存在巨大的表征差异，传统方法难以建立有效的跨模态关联</li>\n</ol>\n<p>VideoBERT 的核心洞察在于：<strong>互联网上存在海量的教学视频（如烹饪视频），其中的语音内容天然地描述了视觉场景中正在发生的事情</strong>。通过 ASR（自动语音识别）技术，可以零成本地获取与视频对齐的文本描述，从而构建大规模的视频-语言配对数据进行自监督预训练。</p>\n<h5>核心机制：视觉 Token 化</h5>\n<p>VideoBERT 面临的首要技术挑战是：BERT 处理的是离散 token 序列，而视频是连续的高维信号。论文提出了一种优雅的解决方案——<strong>视觉向量量化（Visual Vector Quantization）</strong>：</p>\n<ol>\n<li>\n<p><strong>特征提取</strong>：对输入视频以 20fps 采样，划分为 1.5 秒（30 帧）的非重叠片段，使用在 Kinetics 数据集上预训练的 S3D 网络提取每个片段的 1024 维特征向量</p>\n</li>\n<li>\n<p><strong>层次化聚类</strong>：对所有视频片段特征执行层次化 k-means 聚类，设置层次深度 <span class=\"kb-math kb-math-inline\">d=4</span>，每层簇数 <span class=\"kb-math kb-math-inline\">k=12</span>，总共产生 <span class=\"kb-math kb-math-inline\">12^4 = 20{,}736</span> 个视觉词汇（visual words）</p>\n</li>\n<li>\n<p><strong>Token 映射</strong>：每个视频片段被映射到最近的聚类中心，用该中心的索引作为其离散 token ID</p>\n</li>\n</ol>\n<div class=\"key-point\">💡 <strong>关键</strong>：层次化聚类的设计使得语义相近的视频片段被映射到相同或相邻的 token，保留了语义信息而非低级视觉外观。例如，不同视频中\"搅拌碗中食材\"的片段会被量化为相同的视觉 token。</div>\n<p><img alt=\"视觉量化示例\" src=\"https://ar5iv.labs.arxiv.org/html/1904.01766/assets/x3.png\" />\n<em>图 3：视觉 token 化示例。左侧为原始视频帧，右侧为对应的视觉聚类中心。可以看到量化过程保留了语义信息（如\"倒入液体\"、\"搅拌\"）而非像素级细节。</em></p>\n<h5>输入构造与预训练目标</h5>\n<p><strong>输入序列构造</strong>：VideoBERT 将文本和视频 token 拼接为统一序列。对于文本-视频配对输入，格式为：</p>\n<div class=\"kb-math kb-math-display\">\\text{[CLS]}\\ t_1\\ t_2\\ \\cdots\\ t_m\\ \\text{[SEP]}\\ v_1\\ v_2\\ \\cdots\\ v_n\\ \\text{[SEP]}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">t_i</span> 为 WordPiece 文本 token，<span class=\"kb-math kb-math-inline\">v_j</span> 为量化后的视觉 token。文本句子通过 ASR 时间戳与对应的视频片段对齐。</p>\n<p><strong>预训练目标 1 — 掩码 Token 预测（Cloze Task）</strong>：</p>\n<p>与 BERT 的 MLM 类似，随机掩码输入序列中的部分 token（文本或视觉），让模型预测被掩码的 token。对于 text-only 和 video-only 输入，分别独立执行掩码预测：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{cloze}} = -\\sum_{i \\in \\mathcal{M}} \\log p(x_i \\mid x_{\\setminus \\mathcal{M}})</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\mathcal{M}</span> 为被掩码的 token 索引集合。这使得模型不仅学习语言建模，还学习\"视频语言模型\"——即视频中状态转换的时序动态。</p>\n<p><strong>预训练目标 2 — 语言-视觉对齐分类</strong>：</p>\n<p>对于文本-视频配对输入，模型需要判断文本句子和视频片段是否来自同一时间段。具体地，利用 <code>[CLS]</code> token 的输出表征进行二分类：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{align}} = -\\left[ y \\log \\sigma(f_{\\text{CLS}}) + (1-y) \\log (1 - \\sigma(f_{\\text{CLS}})) \\right]</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">y \\in \\{0, 1\\}</span> 表示是否对齐，<span class=\"kb-math kb-math-inline\">f_{\\text{CLS}}</span> 为 <code>[CLS]</code> token 的输出经线性层映射后的 logit。</p>\n<p><strong>总训练目标</strong>为三个损失的加权和：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L} = \\lambda_1 \\mathcal{L}_{\\text{text-cloze}} + \\lambda_2 \\mathcal{L}_{\\text{video-cloze}} + \\lambda_3 \\mathcal{L}_{\\text{align}}</div>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：由于 ASR 文本与视频内容的时间对齐并不精确（说话者可能提前或延后描述视觉内容），论文采用了两个关键的数据增强策略：(1) 随机拼接相邻句子以容忍时间偏移；(2) 随机以 1-5 倍的步长对视频 token 进行子采样，以适应不同视频速度并捕获更长时间跨度的动态。</div>\n<h5>模型架构与训练细节</h5>\n<p>VideoBERT 基于 <strong>BERT_LARGE</strong> 架构：\n- 24 层 Transformer 块\n- 1024 维隐藏层\n- 16 个自注意力头\n- 词表：原始 BERT 的 ~30,000 个 WordPiece token + 20,736 个视觉 token</p>\n<p>模型从预训练的 BERT_LARGE 文本检查点初始化，新增的 20,736 个视觉词嵌入使用对应聚类中心的 S3D 特征初始化，且<strong>输入嵌入在预训练过程中冻结</strong>。</p>\n<p>训练配置：\n- 4 个 Cloud TPU（Pod 配置），batch size = 128\n- Adam 优化器，初始学习率 <span class=\"kb-math kb-math-inline\">1 \\times 10^{-5}</span>，线性衰减\n- 训练 50 万次迭代（约 8 个 epoch），耗时约 2 天</p>\n<h5>下游应用</h5>\n<p><strong>零样本动作分类</strong>：利用预训练模型的掩码预测能力，构造模板句 \"now let me show you how to [MASK] the [MASK]\"，将视频 token 与该模板拼接后，让模型预测两个 [MASK] 位置的词，分别作为动词和名词预测结果。在 YouCook II 上，无需任何微调即可达到 verb top-5 43.3%、object top-5 33.7% 的准确率。</p>\n<p><strong>视频字幕生成</strong>：提取 <code>[CLS]</code> token 的内部表征作为视频的稠密特征，结合 S3D 特征输入解码器生成字幕。在 YouCook II 上取得 CIDEr 0.55 的 SOTA 结果，超越了此前所有方法。</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>BLEU-4</th>\n<th>METEOR</th>\n<th>CIDEr</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Zhou et al.</td>\n<td>3.84</td>\n<td>11.55</td>\n<td>0.38</td>\n</tr>\n<tr>\n<td>S3D</td>\n<td>3.24</td>\n<td>9.52</td>\n<td>0.31</td>\n</tr>\n<tr>\n<td>VideoBERT (video only)</td>\n<td>3.81</td>\n<td>10.81</td>\n<td>0.47</td>\n</tr>\n<tr>\n<td><strong>VideoBERT + S3D</strong></td>\n<td><strong>4.33</strong></td>\n<td><strong>11.94</strong></td>\n<td><strong>0.55</strong></td>\n</tr>\n</tbody>\n</table></div>\n<h5>与传统方法的核心区别</h5>\n<ol>\n<li><strong>自监督 vs 有监督</strong>：传统视频理解方法依赖人工标注数据训练，VideoBERT 利用 ASR 文本作为免费的监督信号，可扩展到数十万视频</li>\n<li><strong>离散化 vs 连续化</strong>：不同于直接使用连续视觉特征的方法，VideoBERT 将视频量化为离散 token，使其能直接复用 BERT 的成熟架构和训练策略</li>\n<li><strong>联合建模 vs 独立建模</strong>：传统方法通常独立训练视觉和语言编码器再进行融合，VideoBERT 在统一的 Transformer 中同时建模两种模态，实现了深层的跨模态交互</li>\n<li><strong>预训练-微调范式</strong>：首次将 NLP 中成功的预训练-微调范式引入视频-语言领域，为后续 VisualBERT、VILBERT、UniVL 等工作奠定了基础</li>\n</ol>",
      "quiz": {
        "q": "VideoBERT 将视频转化为离散 token 的核心方法是什么？",
        "options": [
          "使用 VQ-VAE 对视频帧进行端到端的向量量化",
          "对 S3D 提取的视频特征进行层次化 k-means 聚类",
          "使用 CNN 直接将每帧分类为预定义的视觉类别",
          "通过目标检测器提取区域特征并离散化"
        ],
        "answer": 1,
        "explain": "VideoBERT 使用预训练 S3D 网络提取 1.5 秒视频片段的 1024 维特征，然后通过层次化 k-means（d=4, k=12）聚类为 20,736 个视觉 token，而非使用 VQ-VAE、分类器或目标检测器。"
      }
    },
    {
      "id": "clip4clip",
      "num": 3,
      "name": "CLIP4Clip",
      "fullName": "视频检索模型 (CLIP4Clip)",
      "year": "2021",
      "org": "Microsoft",
      "parent": "videobert",
      "paperUrl": "https://arxiv.org/abs/2104.08860",
      "projectUrl": "",
      "category": "classic",
      "motivation": "将CLIP迁移至视频-文本检索",
      "summary": "CLIP4Clip 将图文预训练模型 CLIP 直接迁移到视频-文本检索，通过“逐帧 CLIP 编码 + 视频级相似度计算 + 双向对比检索损失”解决视频片段和自然语言描述的匹配问题。",
      "keyPoints": [
        "以 CLIP ViT-B/32 和 CLIP text encoder 作为视频帧编码器与文本编码器，实现从像素输入到检索损失的端到端微调",
        "将视频表示为均匀采样的有序帧序列，而不是依赖离线提取的冻结视频特征",
        "系统比较三类 similarity calculator：parameter-free mean pooling、sequential LSTM/Transformer、tight Transformer 跨模态交互",
        "采用对称 video-to-text 与 text-to-video cross-entropy，在一个 batch 内构造 <span class=\"kb-math kb-math-inline\">B \\times B</span> 相似度矩阵",
        "研究 2D patch projection 与 3D patch projection，发现 CLIP 的 2D 初始化在当时更稳，3D temporal projection 需要更充分的视频预训练",
        "在 MSR-VTT、MSVD、LSMDC、ActivityNet、DiDeMo 等视频-文本检索数据集上取得当时 SOTA",
        "经验结论清晰：小数据集上少加新参数的 mean pooling 更稳，大数据集上 sequential Transformer 更容易学到时间依赖"
      ],
      "detail": "<p><img alt=\"CLIP4Clip 总体框架\" src=\"https://ar5iv.labs.arxiv.org/html/2104.08860/assets/x1.png\" />\n<em>图：CLIP4Clip 的主框架，视频被采样为帧序列，经 CLIP 图像编码器得到帧特征，再与 CLIP 文本特征计算视频-文本相似度</em></p>\n<p><img alt=\"CLIP4Clip 相似度计算器\" src=\"https://ar5iv.labs.arxiv.org/html/2104.08860/assets/x2.png\" />\n<em>图：论文比较的三类 similarity calculator：无参数聚合、时序建模、紧耦合跨模态交互</em></p>\n<p>CLIP4Clip 的问题设定是标准双向检索：给定视频集合 <span class=\"kb-math kb-math-inline\">\\mathcal{V}</span> 与文本集合 <span class=\"kb-math kb-math-inline\">\\mathcal{T}</span>，学习相似度函数 <span class=\"kb-math kb-math-inline\">s(v_i,t_j)</span>，让正确视频-文本对的相似度高于 batch 内其他负样本。视频 <span class=\"kb-math kb-math-inline\">v_i</span> 被表示成均匀采样的帧序列：</p>\n<div class=\"kb-math kb-math-display\">v_i = \\{v_i^1, v_i^2, \\dots, v_i^{|v_i|}\\}</div>\n<p>每一帧都被当成图像送入 CLIP visual encoder，取 ViT 的 <code>[class]</code> token 得到帧特征序列 <span class=\"kb-math kb-math-inline\">\\mathbf{Z}_i=\\{\\mathbf{z}_i^1,\\dots,\\mathbf{z}_i^{|v_i|}\\}</span>。文本侧直接沿用 CLIP text encoder，取 <code>[EOS]</code> 位置表示作为 caption embedding <span class=\"kb-math kb-math-inline\">\\mathbf{w}_j</span>。这使 CLIP4Clip 的关键问题从“如何训练一个新的视频编码器”转化为“如何把多个 CLIP 图像特征合成一个可检索的视频表示”。</p>\n<p>最保守的 parameter-free 方案是 mean pooling：把所有帧特征平均成“平均帧” <span class=\"kb-math kb-math-inline\">\\hat{\\mathbf{z}}_i</span>，再与文本向量做余弦相似度：</p>\n<div class=\"kb-math kb-math-display\">\\hat{\\mathbf{z}}_i = \\operatorname{mean}(\\mathbf{z}_i^1,\\mathbf{z}_i^2,\\dots,\\mathbf{z}_i^{|v_i|})</div>\n<div class=\"kb-math kb-math-display\">s(v_i,t_j)=\n\\frac{\\mathbf{w}_j^\\top \\hat{\\mathbf{z}}_i}\n{\\|\\mathbf{w}_j\\| \\|\\hat{\\mathbf{z}}_i\\|}</div>\n<p>这个设计的直觉是：CLIP 已经把单帧图像和文本投到强对齐的共同空间，小数据集上额外引入随机初始化模块反而容易破坏 CLIP 表示。mean pooling 不显式建模时间顺序，但它把多个关键帧的语义证据汇聚起来，在 MSR-VTT Training-7K、MSVD、ActivityNet、DiDeMo 等场景中非常稳。</p>\n<p>sequential 类型在 mean pooling 前增加时序编码器，用 LSTM 或 Transformer encoder 对帧序列建模：</p>\n<div class=\"kb-math kb-math-display\">\\tilde{\\mathbf{Z}}_i = \\operatorname{LSTM}(\\mathbf{Z}_i)\n\\quad \\text{or} \\quad\n\\tilde{\\mathbf{Z}}_i = \\operatorname{TransformerEnc}(\\mathbf{Z}_i+\\mathbf{P})</div>\n<p>随后仍然执行 mean pooling 和余弦相似度。它的优势是能利用帧顺序、动作变化和事件进展；代价是新增参数需要足够数据。论文的经验结果显示，在更大的 MSR-VTT Training-9K split 和 LSMDC 上，sequential Transformer/LSTM 更有竞争力。</p>\n<p>tight 类型则进一步把文本表示和所有帧表示拼成一个序列，让 Transformer 同时看文本和视频帧：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{U}_{ij}=[\\mathbf{w}_j,\\mathbf{z}_i^1,\\mathbf{z}_i^2,\\dots,\\mathbf{z}_i^{|v_i|}]</div>\n<div class=\"kb-math kb-math-display\">\\tilde{\\mathbf{U}}_{ij}=\\operatorname{TransformerEnc}(\\mathbf{U}_{ij}+\\mathbf{P}+\\mathbf{T})</div>\n<div class=\"kb-math kb-math-display\">s(v_i,t_j)=\\operatorname{FC}(\\operatorname{ReLU}(\\operatorname{FC}(\\tilde{\\mathbf{U}}_{ij}[0,:])))</div>\n<p>这个结构表达力最强，因为它允许文本 token 级语义和视频帧特征直接交互。但 CLIP4Clip 的实验反而显示 tightTransf 往往不如 meanP/seqTransf，核心原因是新增跨模态 Transformer 和线性层缺少对应预训练初始化，在检索数据规模有限时难以学稳。</p>\n<pre><code class=\"language-python\"># CLIP4Clip 训练流程伪代码\nfor batch in dataloader:\n    videos, texts = batch                         # B 个配对样本\n\n    frame_features = []\n    for video in videos:\n        frames = uniform_sample(video, fps=1, max_frames=L)\n        z = clip_image_encoder(frames)            # [L, D]\n        frame_features.append(z)\n\n    text_features = clip_text_encoder(texts)      # [B, D]\n\n    # 构造 B x B 相似度矩阵：每个视频都和每条文本比较\n    sim = zeros(B, B)\n    for i in range(B):\n        for j in range(B):\n            if calculator == &quot;mean_pooling&quot;:\n                video_emb = mean(frame_features[i], dim=&quot;time&quot;)\n                sim[i, j] = cosine(video_emb, text_features[j])\n            elif calculator == &quot;sequential&quot;:\n                temporal_emb = temporal_encoder(frame_features[i])\n                video_emb = mean(temporal_emb, dim=&quot;time&quot;)\n                sim[i, j] = cosine(video_emb, text_features[j])\n            elif calculator == &quot;tight&quot;:\n                fused = cross_modal_transformer(text_features[j], frame_features[i])\n                sim[i, j] = mlp(fused[0])\n\n    labels = arange(B)\n    loss_v2t = cross_entropy(sim, labels)          # 每个视频找正确文本\n    loss_t2v = cross_entropy(sim.T, labels)        # 每个文本找正确视频\n    loss = loss_v2t + loss_t2v\n    loss.backward()\n    optimizer.step()\n</code></pre>\n<p>检索损失本质上复用 CLIP 的 batch 内对比学习思想。给定 batch size <span class=\"kb-math kb-math-inline\">B</span>，模型计算所有正负组合的相似度：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{v2t}\n=-\\frac{1}{B}\\sum_{i=1}^{B}\n\\log\\frac{\\exp(s(v_i,t_i))}\n{\\sum_{j=1}^{B}\\exp(s(v_i,t_j))}</div>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{t2v}\n=-\\frac{1}{B}\\sum_{i=1}^{B}\n\\log\\frac{\\exp(s(v_i,t_i))}\n{\\sum_{j=1}^{B}\\exp(s(v_j,t_i))}</div>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}=\\mathcal{L}_{v2t}+\\mathcal{L}_{t2v}</div>\n<p>这个目标函数同时优化“给视频找文本”和“给文本找视频”。相比只做单向排序，双向损失能让视频空间和文本空间互相拉紧；相比离线特征检索，它还允许梯度回传到 CLIP visual encoder，从而微调帧级视觉表示。</p>\n<p>论文还探索了 3D linear projection：把 ViT 的 2D patch embedding 扩展为跨时间的 3D kernel <span class=\"kb-math kb-math-inline\">[t \\times h \\times w]</span>，希望在最底层捕获短时运动。但实验中 3D linear 表现不如 2D linear，原因并不是时间建模无用，而是 CLIP 的强初始化来自 2D 图文预训练；把底层 patch 投影改成 3D 后，初始化分布和预训练任务不匹配，需要更大规模视频-文本预训练才能释放潜力。</p>\n<p>CLIP4Clip 的定位不是提出复杂的新视频骨干，而是用实验回答“CLIP 到底能否直接做视频检索”。它的结论影响很大：视频-文本检索不一定必须从沉重的视频预训练开始，强图文模型加上简单帧聚合就能显著超过许多 feature-level 视频模型；当数据规模扩大时，再逐步引入时序模块更符合优化稳定性。</p>",
      "quiz": {
        "q": "CLIP4Clip 中 parameter-free mean pooling 相似度计算器的主要优势是什么？",
        "options": [
          "通过跨模态 Transformer 显式建模每个文本 token 和每帧视频的交互",
          "不引入随机初始化的新参数，最大限度保留 CLIP 已学到的图文对齐空间",
          "用 3D 卷积替代 ViT patch embedding，从底层学习运动特征",
          "只训练文本编码器，从而避免视频编码器过拟合"
        ],
        "answer": 1,
        "explain": "mean pooling 直接聚合 CLIP 帧特征并做余弦相似度，没有新增时序或跨模态模块；在小数据检索集上，这种做法更稳定。"
      }
    },
    {
      "id": "cinepile",
      "num": 4,
      "name": "CinePile",
      "fullName": "长视频QA基准 (CinePile)",
      "year": "2024",
      "org": "Google",
      "parent": "movieqa",
      "paperUrl": "https://arxiv.org/abs/2405.08813",
      "projectUrl": "",
      "category": "classic",
      "motivation": "真实长视频音频对齐基准",
      "summary": "CinePile 构建了一个面向真实长视频理解的多选问答基准，用电影音频描述（Audio Descriptions）作为高质量视觉代理标注，再通过 LLM 模板生成、质量过滤和人工审查得到大规模长视频 QA 数据。",
      "keyPoints": [
        "数据来自英文电影片段，最终保留 9,396 个视频片段，平均长度约 160 秒",
        "规模为 303,828 个 MCQ，其中训练集 298,887 条、测试集 4,941 条，每个视频约 32 个问题",
        "利用 Audio Descriptions 对齐 YouTube MovieClips 片段，把专为视障人群编写的场景旁白转化为视觉描述代理",
        "用 WhisperX 转录音频，用 WhereIsAI/UAE-Large-V1 句向量和 rolling window 将电影级 AD 定位到片段级 AD",
        "从 MovieQA、TVQA、Perception Test 的约 30,000 个人工问题中抽取模板，最终人工合并为 86 个问题模板",
        "问题类别覆盖 CRD、NPA、STA、TEMP、TH，强调角色关系、叙事、场景技术、时间推理和主题理解",
        "引入退化问题检测、educated guessing 检测、adversarial refinement、vision reliance、hardness 等质量控制指标",
        "模型评测显示 Gemini 1.5 Pro 约 60.12%，普通人类 73.21%，作者 86.00%，长视频多模态理解仍有明显差距"
      ],
      "detail": "<p><img alt=\"CinePile 自动 QA 生成与过滤流程\" src=\"https://ar5iv.labs.arxiv.org/html/2405.08813/assets/x3.png\" />\n<em>图：CinePile 从场景文本标注和问题模板出发，生成 MCQ 并通过多阶段过滤/修复得到最终数据</em></p>\n<p>CinePile 的核心洞察是：很多电影已经存在由专业人员编写的 Audio Descriptions（AD），这些旁白会在对话间隙描述角色动作、表情、空间位置、关键物体和场景变化。传统视频 caption 往往过度描述表面视觉内容，而 AD 更接近“为了理解剧情必须知道的视觉信息”。因此，CinePile 不直接让人工逐帧标注，而是把 AD 当作视觉代理标注，用它生成需要看视频才能回答的问题。</p>\n<p>数据对齐分两层。第一层是音频转录：论文用 WhisperX 转录 YouTube 电影片段音频和整部电影的 AD 音轨，以获得更准确的词级时间戳。第二层是片段定位：取 YouTube 片段转录的开头 3 行和结尾 3 行，用 WhereIsAI/UAE-Large-V1 编码，再在整部电影 AD 转录中用 rolling window 搜索最匹配的开始和结束位置。对齐后得到的片段级文本同时包含 visual description 和 dialogue，论文称为 scene-text-annotation。</p>\n<p>由于 AD 转录混合了视觉旁白和角色台词，CinePile 还训练了一个句子分类器来拆分二者。具体做法是在 MAD 数据集标注上 fine-tune BERT-Base，加二分类头区分 visual description 与 dialogue，80/20 划分训练和验证，验证准确率约 96%。这个步骤很关键，因为后续的 vision reliance 与纯视觉/对话依赖分析都需要知道问题是否真的依赖视觉描述。</p>\n<p>模板生成不是手写几个固定问题类型，而是从现有人工视频 QA 数据集中抽象出来。CinePile 从 MovieQA、TVQA、Perception Test 收集约 30,000 个问题，先用 GPT-3.5 把人名和实体替换成代词，避免句向量聚类被专名主导；去重后得到 17,575 个唯一问题。随后用 WhereIsAI/UAE-Large-V1 嵌入并 k-means 聚类，MovieQA/TVQA 侧实验 <span class=\"kb-math kb-math-inline\">k=10,50,100</span> 后选 <span class=\"kb-math kb-math-inline\">k=50</span>，Perception Test 因主题较少选 <span class=\"kb-math kb-math-inline\">k=20</span>。每个 cluster 随机抽 10 个问题给 GPT-4 归纳模板，生成约 300 个候选模板，再人工删并合并为 86 个。</p>\n<p>QA 生成阶段先让 Gemini 从 86 个模板中为每个场景选出 20 个相关模板，再随机取 5-6 个模板交给 GPT-4/Gemini 生成多选题。输入包括 scene-text-annotation、模板名、prototype question 和系统提示。论文特别强调两个 prompt 细节：给 prototype question 能减少幻觉并提升干扰项质量；要求模型给 rationale 能提升问题可验证性。最终每个视频大约生成 32 个 MCQ，每个问题包含 1 个正确答案和 4 个干扰项。</p>\n<pre><code class=\"language-python\"># CinePile 数据构建流程伪代码\nfor clip in youtube_movie_clips:\n    clip_transcript = whisperx_transcribe(clip.audio)\n    movie_ad_transcript = whisperx_transcribe(full_movie_audio_description(clip.movie))\n\n    start_query = embed(first_3_lines(clip_transcript))\n    end_query = embed(last_3_lines(clip_transcript))\n    start, end = rolling_window_match(movie_ad_transcript, start_query, end_query)\n\n    scene_text = movie_ad_transcript[start:end]\n    visual_desc, dialogue = bert_sentence_classifier(scene_text)\n    scene_annotation = merge_with_timestamps(visual_desc, dialogue)\n\n    relevant_templates = gemini_select_top20(scene_annotation, template_bank)\n    sampled_templates = random_sample(relevant_templates, k=5_or_6)\n\n    mcqs = []\n    for template in sampled_templates:\n        mcqs.extend(gpt_or_gemini_generate_mcq(scene_annotation, template))\n\n    for q in mcqs:\n        q.degenerate = lm_answers_without_context(q.question, q.choices)\n        q.vision_reliant = not gemini_answers_with_dialogue_only(q, dialogue)\n        q.hard = not gemini_answers_with_full_scene_text(q, scene_annotation)\n        if q.degenerate:\n            q = adversarial_refine_until_unanswerable(q, max_rounds=5)\n\n    save_valid_questions(mcqs)\n</code></pre>\n<p>质量控制比普通自动合成数据更重。退化问题指答案已经隐含在问题中，例如“粉色房子是什么颜色”；educated guessing 指不用看视频也能靠常识猜中。论文用 Gemini、GPT-3.5 Turbo、Phi-1.5 在“只给问题和选项、不提供上下文”的条件下检测弱问题。如果多个模型都能答对，就说明题目可能泄漏答案。随后使用 LLaMA 3.1 70B 做 adversarial refinement：让模型解释为什么能猜中，再把这个 rationale 反馈给生成模型改写问题或选项，最多迭代 5 轮。最终约 90.94% 的训练弱问答、90.24% 的测试弱问答被修复，无法修复的约 80 条测试问题被移除。</p>\n<p>Vision reliance 与 hardness 是 CinePile 的两个诊断指标。可以把视觉依赖写成：</p>\n<div class=\"kb-math kb-math-display\">\\operatorname{VR}(q)=\n\\mathbb{1}[\\hat{a}_{\\text{Gemini}}(q,\\text{dialogue only}) \\ne a^\\star]</div>\n<p>如果只给 dialogue 时 Gemini 答错，则该问题被标记为依赖视觉。Hardness 则更严格：给模型用于生成问题的完整 scene-text-annotation（包含 visual descriptions 和 subtitles）仍答错的问题，会被认为对模型困难，并由作者进一步审查。</p>\n<p>退化检测也可以抽象为：</p>\n<div class=\"kb-math kb-math-display\">\\operatorname{Weak}(q)=\n\\mathbb{1}\\left[\n\\frac{1}{|\\mathcal{M}|}\n\\sum_{m\\in\\mathcal{M}}\n\\mathbb{1}[\\hat{a}_m(q,\\text{choices only})=a^\\star]\n\\ge \\tau\n\\right]</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\mathcal{M}</span> 是用于检测的语言模型集合。这个指标不直接评价视频理解，而是保护 benchmark：如果只靠问题和选项就能答对，那么它不应进入评测集。</p>\n<p>CinePile 的评测协议是多选准确率，但模型输出并不总是规整的 A-E 选项。因此论文使用两阶段解析：先规范化模型回答，抽取选项字母和可能出现的选项文本；再与答案 key 比较，允许在只有字母或只有文本出现时按对应部分匹配。这个细节对开源模型尤其重要，因为许多模型会复述字幕、生成长段解释或输出未列出的选项。</p>\n<p>实验结果显示，CinePile 不是只靠单帧或字幕就能解决的简单 benchmark。普通人类约 73.21%，作者在仔细观看和回看条件下约 86.00%；商业模型中 Gemini 1.5 Pro--001 约 60.12%，GPT-4o 约 56.06%；开源模型中 LLaVA-OV 7B 约 49.34%。同时，使用 CinePile 训练集对 Video-LLaVA 进行 LoRA 微调后，准确率从 25.72% 提升到 44.16%，说明这个数据集不仅能评测长视频理解，也能作为 instruction tuning 数据改善开源视频模型。</p>",
      "quiz": {
        "q": "CinePile 为什么使用 Audio Descriptions 作为视觉代理标注？",
        "options": [
          "AD 是自动目标检测器输出，包含更精确的边界框",
          "AD 是为视障人群编写的人工场景旁白，通常覆盖理解剧情所需的关键视觉信息",
          "AD 只包含角色对话，适合训练纯文本问答模型",
          "AD 可以替代所有模型评测，不需要原始视频输入"
        ],
        "answer": 1,
        "explain": "CinePile 利用 AD 中的人写视觉描述来低成本构造长视频 QA；评测时模型仍需要从原始视频和对话中回答，不会看到 AD。"
      }
    },
    {
      "id": "scnn",
      "num": 5,
      "name": "S-CNN",
      "fullName": "时序动作定位网络 (Segment-CNN)",
      "year": "2016",
      "org": "Columbia",
      "parent": "—",
      "paperUrl": "http://openaccess.thecvf.com/content_cvpr_2016/html/Shou_Temporal_Action_Localization_CVPR_2016_paper.html",
      "projectUrl": "",
      "category": "localization",
      "motivation": "首个深度时序动作定位框架",
      "summary": "S-CNN 将 R-CNN 式“候选区域-分类-后处理”思想迁移到视频时间轴，提出 proposal、classification、localization 三阶段 3D ConvNet 框架，用 overlap-aware loss 提升未剪辑视频中的动作起止边界定位精度。",
      "keyPoints": [
        "首个系统性使用 segment-based 3D ConvNets 处理未剪辑长视频时序动作定位的深度框架之一",
        "用多尺度 temporal sliding window 生成候选片段，窗口长度为 16、32、64、128、256、512 帧，并使用 75% overlap",
        "每个候选片段统一采样 16 帧，输入 C3D 风格 3D ConvNet，捕获外观与运动信息",
        "Proposal network 做 action/background 二分类，先过滤大量背景窗口以提升效率和精度",
        "Classification network 学习 <span class=\"kb-math kb-math-inline\">K+1</span> 类动作分类器，主要用于给 localization network 提供可靠初始化",
        "Localization network 引入 overlap loss，让预测分数和片段-真值 IoU 对齐，避免 NMS 保留“分类强但边界差”的片段",
        "推理阶段只使用 proposal network 与 localization network，最后通过类别先验和 NMS 输出最终动作区间",
        "在 IoU 0.5 下，MEXaction2 mAP 从 1.7% 提升到 7.4%，THUMOS 2014 mAP 从 15.0% 提升到 19.0%"
      ],
      "detail": "<p><img alt=\"S-CNN 总体框架\" src=\"https://ar5iv.labs.arxiv.org/html/1601.02129/assets/x1.png\" />\n<em>图：S-CNN 的三阶段流程，包括多尺度候选片段生成、Segment-CNN 三个网络阶段和 NMS 后处理</em></p>\n<p>S-CNN 面向的任务是 temporal action localization：给定一个未剪辑长视频，不只判断视频里有什么动作，还要输出每个动作实例的开始和结束时间。论文将视频记为：</p>\n<div class=\"kb-math kb-math-display\">X=\\{x_t\\}_{t=1}^{T}</div>\n<p>每个视频有一组动作标注：</p>\n<div class=\"kb-math kb-math-display\">\\Psi=\\{(\\psi_m,\\psi&#x27;_m,k_m)\\}_{m=1}^{M}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\psi_m,\\psi&#x27;_m</span> 是第 <span class=\"kb-math kb-math-inline\">m</span> 个动作实例的起止帧，<span class=\"kb-math kb-math-inline\">k_m\\in\\{1,\\dots,K\\}</span> 是动作类别。相比 trimmed action recognition，难点在于背景片段大量存在、动作持续时间差异很大、一个视频可能包含多个动作实例，而且分类分数高并不等价于边界准确。</p>\n<p>候选片段生成直接在时间轴上做多尺度滑窗。S-CNN 对未剪辑视频使用 16、32、64、128、256、512 帧长度的窗口，每个尺度内部有 75% overlap；每个窗口再均匀采样 16 帧，缩放到 <span class=\"kb-math kb-math-inline\">171 \\times 128</span>，输入 3D ConvNet。两个 temporal segments 的 IoU 可写为：</p>\n<div class=\"kb-math kb-math-display\">\\operatorname{IoU}([a,b],[c,d])=\n\\frac{\\max(0,\\min(b,d)-\\max(a,c))}\n{\\max(b,d)-\\min(a,c)}</div>\n<p>Proposal network 的作用类似 objectness detector，但对象从图像框变成时间片段。训练时，候选片段与所有 ground truth 的最大 IoU 大于 0.7 就标为 positive，小于 0.3 就标为 background；如果某个 ground truth 没有 IoU 大于 0.7 的窗口，则选择和它 IoU 最大且大于 0.5 的片段作为 positive。这个阶段不关心具体动作类别，只学习“这里是否可能包含目标动作”，因此能在推理时大量减少后续分类/定位计算。</p>\n<p>Classification network 是普通 <span class=\"kb-math kb-math-inline\">K+1</span> 类分类器，其中第 0 类为 background。它使用 proposal 过滤后的片段训练动作类别判别能力，但论文明确指出它不是最终定位器：分类网络容易抓住片段内部的局部判别证据，即使候选窗口只覆盖了动作的一小段，也可能给出很高分类分数。这样的分数进入 NMS 后，会把 IoU 更高但分类分数略低的片段压掉，造成边界错误。</p>\n<p>Localization network 复用 classification network 的结构和初始化，但加入 overlap-aware loss。对第 <span class=\"kb-math kb-math-inline\">n</span> 个训练片段，记真实类别为 <span class=\"kb-math kb-math-inline\">k_n</span>，softmax 后真实类别概率为 <span class=\"kb-math kb-math-inline\">P_n^{(k_n)}</span>，与关联 ground truth 的 IoU 为 <span class=\"kb-math kb-math-inline\">v_n</span>。总损失为：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}=\\mathcal{L}_{\\text{softmax}}+\\lambda\\mathcal{L}_{\\text{overlap}}</div>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{softmax}}\n=\\frac{1}{N}\\sum_n -\\log P_n^{(k_n)}</div>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{overlap}}\n=\\frac{1}{N}\\sum_n\n\\frac{1}{2}\n\\left(\n\\frac{(P_n^{(k_n)})^2}{(v_n)^\\alpha}-1\n\\right)\n\\mathbb{1}[k_n&gt;0]</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\mathbb{1}[k_n&gt;0]</span> 表示 overlap loss 只作用于非背景片段。这个损失的直觉是：如果片段和真值高度重叠，模型应该给它更高置信度；如果片段只覆盖动作的一部分，即使分类正确，也不应该得到过高分数。论文指出正样本上的最优趋势是让 <span class=\"kb-math kb-math-inline\">P_n^{(k_n)}</span> 接近 <span class=\"kb-math kb-math-inline\">\\sqrt{(v_n)^\\alpha}</span>，也就是把分类置信度校准到时序重叠质量。</p>\n<pre><code class=\"language-python\"># S-CNN 推理流程伪代码\ndef scnn_localize(video):\n    candidates = []\n    for length in [16, 32, 64, 128, 256, 512]:\n        for window in sliding_windows(video, length=length, overlap=0.75):\n            segment = uniform_sample(window, num_frames=16)\n            candidates.append((window.start, window.end, segment))\n\n    proposals = []\n    for start, end, segment in candidates:\n        p_action = proposal_network(segment)[&quot;action&quot;]\n        if p_action &gt;= 0.7:\n            proposals.append((start, end, segment))\n\n    detections = []\n    for start, end, segment in proposals:\n        probs = localization_network(segment)      # K+1 类，0 是 background\n        cls = argmax(probs)\n        if cls != 0:\n            score = probs[cls] * length_prior(cls, end - start)\n            detections.append((start, end, cls, score))\n\n    return temporal_nms(detections, threshold=eval_iou_threshold - 0.1)\n</code></pre>\n<p>与 R-CNN 的类比很清楚：多尺度滑窗对应 region proposals，3D ConvNet 对应候选特征提取，NMS 对应冗余去除。但 S-CNN 没有像 Faster R-CNN 那样回归边界偏移。论文尝试后认为动作持续时间和边界变化太多样，直接回归 start/end 不稳定；因此采用 overlap loss 重新校准候选片段分数，让 NMS 更倾向保留高 IoU 的候选。</p>\n<p>S-CNN 的三个阶段分工也解释了为什么 classification network 虽然推理不用，但训练中不能省。Localization network 既要保持类别判别能力，又要学习 IoU-aware scoring；如果没有先训练好的分类网络初始化，定位网络直接从较难目标开始优化会更差。论文消融显示，去掉 proposal network 时 THUMOS 2014 mAP 为 17.1%，完整 S-CNN 为 19.0%；去掉 localization network 则会失去对边界质量的分数校准。</p>\n<p>从历史位置看，S-CNN 的意义不在于今天的精度仍最高，而在于它把视频动作定位从“手工特征 + 滑窗 SVM/FV”推进到深度多阶段检测范式。后续 TAL 方法中的 proposal generation、boundary quality scoring、classification/localization 分离、NMS 后处理，都能在 S-CNN 中看到早期雏形。</p>",
      "quiz": {
        "q": "S-CNN 的 localization network 为什么要加入 overlap loss？",
        "options": [
          "为了减少 3D ConvNet 的参数量",
          "为了让分类置信度反映候选片段与真实动作边界的 IoU，从而帮助 NMS 保留更准的片段",
          "为了把所有背景片段都强制标为正样本",
          "为了在推理阶段替代 proposal network"
        ],
        "answer": 1,
        "explain": "普通分类分数可能偏爱只包含局部判别证据的片段；overlap loss 会压低低 IoU 正片段的分数，提高高 IoU 片段在 NMS 中被保留的机会。"
      }
    },
    {
      "id": "cdc",
      "num": 6,
      "name": "CDC",
      "fullName": "卷积反卷积网络 (CDC Network)",
      "year": "2017",
      "org": "Columbia",
      "parent": "scnn",
      "paperUrl": "http://openaccess.thecvf.com/content_cvpr_2017/html/Shou_CDC_Convolutional-De-Convolutional_Networks_CVPR_2017_paper.html",
      "projectUrl": "",
      "category": "localization",
      "motivation": "反卷积实现精确边界定位",
      "summary": "CDC 提出 Convolutional-De-Convolutional filter，在 3D ConvNets 之后同时做时间维反卷积上采样和空间维卷积下采样，解决 S-CNN 等 proposal 级方法边界只能停留在候选段上的问题。它把视频动作定位从“给 proposal 打分”推进到“逐帧输出类别置信度，再回修 proposal 边界”。",
      "keyPoints": [
        "在 C3D 主干之后堆叠 CDC6、CDC7、CDC8，使时间分辨率从 <span class=\"kb-math kb-math-inline\">L/8</span> 恢复到 <span class=\"kb-math kb-math-inline\">L</span>，空间尺寸从 <span class=\"kb-math kb-math-inline\">4\\times4</span> 压到 <span class=\"kb-math kb-math-inline\">1\\times1</span>。",
        "CDC filter 将一组空间卷积核按时间维耦合，等价于“空间卷积 + 时间反卷积”的联合操作，而不是串联两个独立层。",
        "利用 C3D 预训练 FC 层初始化 CDC 层，缓解联合卷积-反卷积参数更多、直接训练困难的问题。",
        "训练时使用 frame-wise softmax loss，让每一帧都参与监督并输出 <span class=\"kb-math kb-math-inline\">K+1</span> 类置信度。",
        "推理时先扩展 proposal，再用逐帧分数估计类别和收缩边界，提升高 tIoU 阈值下的定位精度。",
        "主要验证在 THUMOS14 与 ActivityNet Challenge 2016；论文报告 CDC 网络本身可达到约 500 FPS。"
      ],
      "detail": "<p><img alt=\"CDC temporal localization framework\" src=\"https://ar5iv.labs.arxiv.org/html/1703.01515/assets/x1.png\" />\n<em>图：CDC 将原始视频送入 3D ConvNets 和 CDC 层得到逐帧分数，再结合 proposal 进行精确边界定位。</em></p>\n<pre><code class=\"language-python\"># CDC temporal boundary refinement\nfor proposal in proposals:\n    ts, te = proposal.start, proposal.end\n    length = te - ts + 1\n\n    # 1. 扩展 proposal，给边界回修留出搜索范围\n    ext_start = max(video_start, ts - alpha * length)\n    ext_end = min(video_end, te + alpha * length)\n\n    # 2. CDC 输出每一帧对每个类别的置信度\n    scores = CDC(video_frames[ext_start:ext_end + 1])  # shape: T x K\n    cls = argmax(mean(scores, axis=&quot;time&quot;))\n\n    # 3. 用该类别的逐帧分数估计阈值，并从两端向中间收缩\n    class_scores = scores[:, cls]\n    mu, sigma = gaussian_kde_stats(class_scores)\n    threshold = mu - sigma\n\n    left = ext_start\n    while left &lt; ext_end and scores[left - ext_start, cls] &lt; threshold:\n        left += 1\n\n    right = ext_end\n    while right &gt; left and scores[right - ext_start, cls] &lt; threshold:\n        right -= 1\n\n    refined_score = mean(scores[left - ext_start:right - ext_start + 1, cls])\n    emit(start=left, end=right, category=cls, score=refined_score)\n</code></pre>\n<p>CDC 的直接动机是 S-CNN 这类两阶段方法的边界瓶颈：proposal 可以被分类器打出更高或更低的分数，但最终边界仍然继承候选段本身。如果候选段开始/结束时间偏粗，定位结果在高 tIoU 阈值下会明显吃亏。CDC 因此不再只预测 segment-level score，而是在 proposal 覆盖的扩展片段中产生 frame-level score sequence，让边界可以根据每帧置信度重新收缩。</p>\n<p>核心算子是 CDC filter。C3D 的前几层适合建模动作语义，但池化会把时间长度从 <span class=\"kb-math kb-math-inline\">L</span> 降到 <span class=\"kb-math kb-math-inline\">L/8</span>；动作定位又需要回到帧级时间分辨率。CDC filter 用一个三维核 <span class=\"kb-math kb-math-inline\">F\\in\\mathbb{R}^{k_l\\times k_h\\times k_w}</span> 同时完成两件事：在空间上像卷积一样汇聚 <span class=\"kb-math kb-math-inline\">k_h\\times k_w</span> 感受野，在时间上像反卷积一样产生 <span class=\"kb-math kb-math-inline\">k_l</span> 个连续输出：</p>\n<div class=\"kb-math kb-math-display\">Y[c]=\\sum_{a=1}^{k_h}\\sum_{b=1}^{k_w}F[c,a,b]\\cdot X[a,b],\\quad c=1,\\dots,k_l</div>\n<p>这个设计比“先 conv6 再 deconv6”的串联方案更强，因为每个时间输出 <span class=\"kb-math kb-math-inline\">Y[c]</span> 有独立的空间卷积核；串联方案中多个上采样时间点共享同一个高层语义响应。论文也意识到 CDC filter 参数更多，所以将 C3D 的 FC6/FC7 转换成卷积核后复制初始化到 CDC6/CDC7 中，使网络可以从已有动作识别模型平滑迁移。</p>\n<p>网络结构上，C3D 的 conv1a 到 conv5b 先把输入变成 <span class=\"kb-math kb-math-inline\">L/8</span> 个 <span class=\"kb-math kb-math-inline\">4\\times4</span> 特征图；CDC6 把时间从 <span class=\"kb-math kb-math-inline\">L/8</span> 上采样到 <span class=\"kb-math kb-math-inline\">L/4</span>，同时把空间压到 <span class=\"kb-math kb-math-inline\">1\\times1</span>；CDC7 和 CDC8 继续各做 2 倍时间上采样，最终得到 <span class=\"kb-math kb-math-inline\">(K+1)\\times L\\times1\\times1</span> 的逐帧类别 logits。训练目标是逐帧 softmax：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}=\\frac{1}{N}\\sum_{n=1}^{N}\\sum_{t=1}^{L}-\\log\\left(P_n^{(z_n)}[t]\\right)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">P_n^{(z_n)}[t]</span> 是第 <span class=\"kb-math kb-math-inline\">n</span> 个训练片段在第 <span class=\"kb-math kb-math-inline\">t</span> 帧对真实类别的概率。这个损失让 CDC 层不仅学会“动作是什么”，还学会“动作在时间上何时出现/消失”。</p>\n<p>推理阶段 CDC 仍依赖外部 proposal，但它改变了 proposal 的用法：proposal 只是粗搜索区域，最终类别由该区域逐帧平均分数决定，边界则用类别分数曲线回修。论文采用高斯核密度估计得到分数分布的 <span class=\"kb-math kb-math-inline\">\\mu</span> 和 <span class=\"kb-math kb-math-inline\">\\sigma</span>，并以 <span class=\"kb-math kb-math-inline\">\\mu-\\sigma</span> 作为保守阈值，从扩展段两端向中间移动，直到遇到足够高的动作置信度。这样可以把原本偏长的候选段裁到更贴近真实动作的时间范围。</p>\n<div class=\"key-point\">💡 关键：CDC 的贡献不只是“用了反卷积”，而是把反卷积限制在时间维、把卷积保留在空间维，从而正好匹配“时间要恢复分辨率、空间要聚合语义”的动作定位需求。</div>",
      "quiz": {
        "q": "CDC filter 相比单独串联 conv 和 deconv 的核心优势是什么？",
        "options": [
          "减少所有层的参数量",
          "同时进行空间下采样和时间上采样，并为不同时间输出学习独立空间语义",
          "完全不需要 proposal",
          "只使用光流特征即可完成定位"
        ],
        "answer": 1,
        "explain": "CDC filter 将多个空间卷积核按时间维耦合，既恢复帧级时间分辨率，又避免多个上采样时间点共享同一个高层响应。"
      }
    },
    {
      "id": "bsn",
      "num": 7,
      "name": "BSN",
      "fullName": "边界敏感网络 (Boundary Sensitive Network)",
      "year": "2018",
      "org": "CUHK",
      "parent": "cdc",
      "paperUrl": "https://arxiv.org/abs/1806.02964",
      "projectUrl": "",
      "category": "localization",
      "motivation": "边界敏感机制生成高质量提案",
      "summary": "BSN 提出“local to global”的 temporal action proposal generation 框架，先在局部预测每个时间位置的 start/end/actionness 概率，再在全局用 Boundary-Sensitive Proposal feature 评估 proposal 质量。它解决了滑窗 proposal 边界不灵活、置信度不可靠的问题，成为后续 BMN 等边界匹配方法的重要前置工作。",
      "keyPoints": [
        "使用 two-stream 网络提取 snippet-level 视频特征，作为 BSN 的输入序列。",
        "Temporal Evaluation Module (TEM) 同时预测 start probability、end probability 和 actionness probability。",
        "Proposal Generation Module (PGM) 直接组合高 start/end 概率位置，生成灵活长度、边界更精细的候选 proposal。",
        "Boundary-Sensitive Proposal (BSP) feature 从 proposal 的起点区间、中心区间和终点区间采样 actionness 序列。",
        "Proposal Evaluation Module (PEM) 用一层隐藏层 MLP 根据 BSP feature 回归 proposal 与真实动作的 IoU 置信度。",
        "最终分数融合 <span class=\"kb-math kb-math-inline\">p_{conf}</span>、起点概率和终点概率，并用 Soft-NMS 抑制冗余 proposal。",
        "在 ActivityNet-1.3 和 THUMOS14 上验证 proposal 质量，同时与分类器结合提升完整 temporal action detection。"
      ],
      "detail": "<p><img alt=\"BSN framework\" src=\"https://ar5iv.labs.arxiv.org/html/1806.02964/assets/eccv_framework.jpg\" />\n<em>图：BSN 框架包含特征编码、TEM、PGM、PEM 和 Soft-NMS 后处理。</em></p>\n<pre><code class=\"language-python\"># BSN proposal generation and scoring\nfeatures = two_stream_encoder(video)\n\n# 1. TEM 输出每个 temporal location 的局部概率\nP_start, P_end, P_action = TEM(features)\n\n# 2. 选取高概率或局部峰值位置作为候选边界\nstart_candidates = select_peaks(P_start)\nend_candidates = select_peaks(P_end)\n\nproposals = []\nfor ts in start_candidates:\n    for te in end_candidates:\n        duration = te - ts\n        if d_min &lt;= duration &lt;= d_max and ts &lt; te:\n            # 3. 在起点、中心、终点区域采样 actionness，构造 BSP\n            f_s = interpolate(P_action, ts - duration / 5, ts + duration / 5, num=8)\n            f_c = interpolate(P_action, ts, te, num=16)\n            f_e = interpolate(P_action, te - duration / 5, te + duration / 5, num=8)\n            f_bsp = concat(f_s, f_c, f_e)\n\n            # 4. PEM 预测 proposal 质量，并融合边界概率\n            p_conf = PEM(f_bsp)\n            p_final = p_conf * P_start[ts] * P_end[te]\n            proposals.append((ts, te, p_final))\n\nfinal_proposals = soft_nms(proposals)\n</code></pre>\n<p>BSN 的核心问题意识是：高质量 temporal proposal 需要同时满足“覆盖率高”和“边界精确”。传统滑窗或预定义 duration 的方法虽然容易枚举，但时间间隔固定，动作长度变化大时会产生大量边界偏粗的候选段；而只给这些候选段打分，并不能从根本上修正边界。BSN 因此先预测边界本身，再组合边界形成 proposal。</p>\n<p>TEM 把每个 temporal location 看成一个候选事件点，输出三条概率序列：</p>\n<div class=\"kb-math kb-math-display\">P_S=\\{p^s_{t_n}\\}_{n=1}^{l_s},\\quad\nP_E=\\{p^e_{t_n}\\}_{n=1}^{l_s},\\quad\nP_A=\\{p^a_{t_n}\\}_{n=1}^{l_s}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">P_S</span> 和 <span class=\"kb-math kb-math-inline\">P_E</span> 分别表示该位置作为动作开始/结束的概率，<span class=\"kb-math kb-math-inline\">P_A</span> 表示该位置位于动作内部的概率。TEM 的训练目标是三任务二分类损失：</p>\n<div class=\"kb-math kb-math-display\">L_{TEM}=\\lambda L_{bl}^{action}+L_{bl}^{start}+L_{bl}^{end}</div>\n<div class=\"kb-math kb-math-display\">L_{bl}=\\frac{1}{l_s}\\sum_{n=1}^{l_s}\\left[-g_{t_n}\\log p_{t_n}-(1-g_{t_n})\\log(1-p_{t_n})\\right]</div>\n<p>这里 <span class=\"kb-math kb-math-inline\">\\lambda=2</span>，用来提高 actionness 分支的重要性。由于 start/end/actionness 都是序列预测，TEM 能一次性扫描视频并给出所有候选边界，而不是对每个滑窗重复计算。</p>\n<p>PGM 的关键是 BSP feature。给定候选 proposal <span class=\"kb-math kb-math-inline\">\\varphi=[t_s,t_e]</span>，设 <span class=\"kb-math kb-math-inline\">d=t_e-t_s</span>，BSN 定义中心区间 <span class=\"kb-math kb-math-inline\">r_C=[t_s,t_e]</span>，起点区间 <span class=\"kb-math kb-math-inline\">r_S=[t_s-d/5,t_s+d/5]</span>，终点区间 <span class=\"kb-math kb-math-inline\">r_E=[t_e-d/5,t_e+d/5]</span>。它分别在三段上从 <span class=\"kb-math kb-math-inline\">P_A</span> 采样：</p>\n<div class=\"kb-math kb-math-display\">f_{BSP}=(f_s^A,f_c^A,f_e^A)</div>\n<p>直觉上，中心区间回答“proposal 内部是否像一个动作”，起点/终点区间回答“边界附近的 actionness 是否发生合理变化”。这比只用 proposal 内部平均特征更边界敏感，也解释了为什么 PEM 的输入不直接是视觉特征，而是围绕边界组织过的 actionness 序列。</p>\n<p>PEM 将 BSP feature 输入 MLP，预测 <span class=\"kb-math kb-math-inline\">p_{conf}</span>，训练目标是回归该候选 proposal 与所有真实动作的最大 IoU：</p>\n<div class=\"kb-math kb-math-display\">L_{PEM}=\\frac{1}{N_{train}}\\sum_{i=1}^{N_{train}}(p_{conf,i}-g_{iou,i})^2</div>\n<p>训练时论文把 <span class=\"kb-math kb-math-inline\">g_{iou}&gt;0.7</span> 的 proposal 作为正样本，<span class=\"kb-math kb-math-inline\">g_{iou}&lt;0.3</span> 的 proposal 作为负样本，并采样到约 <span class=\"kb-math kb-math-inline\">1:2</span> 的正负比例。推理时，最终 proposal 分数融合 PEM 置信度和两个边界概率：</p>\n<div class=\"kb-math kb-math-display\">p_f=p_{conf}\\cdot p^s_{t_s}\\cdot p^e_{t_e}</div>\n<p>这个乘法设计很直接：一个 proposal 只有在“内部质量高、起点可信、终点可信”三者同时成立时才会得到高分。随后 Soft-NMS 对重叠 proposal 衰减分数：</p>\n<div class=\"kb-math kb-math-display\">p_{f,i}&#x27;=\n\\begin{cases}\np_{f,i}, &amp; \\operatorname{IoU}(\\varphi_m,\\varphi_i)&lt;\\theta \\\\\np_{f,i}\\cdot e^{-\\operatorname{IoU}(\\varphi_m,\\varphi_i)^2/\\varepsilon}, &amp; \\operatorname{IoU}(\\varphi_m,\\varphi_i)\\ge\\theta\n\\end{cases}</div>\n<div class=\"key-point\">💡 关键：BSN 不是简单“边界分类器 + 排序器”，而是把边界概率、动作内部概率和 proposal-level IoU 评估串成一个闭环；局部边界负责生成，BSP/PEM 负责全局质量校准。</div>",
      "quiz": {
        "q": "BSN 中 BSP feature 的主要作用是什么？",
        "options": [
          "直接替代 two-stream 特征提取器",
          "把 proposal 起点、中心和终点区域的 actionness 序列编码成 proposal-level 质量特征",
          "只用于 Soft-NMS 的 IoU 计算",
          "生成视频级动作类别标签"
        ],
        "answer": 1,
        "explain": "BSP feature 围绕 proposal 的边界和内部采样 actionness，使 PEM 能判断该候选段是否边界合理且包含完整动作。"
      }
    },
    {
      "id": "bmn",
      "num": 8,
      "name": "BMN",
      "fullName": "边界匹配网络 (Boundary Matching Network)",
      "year": "2019",
      "org": "CUHK",
      "parent": "bsn",
      "paperUrl": "https://arxiv.org/abs/1907.09702",
      "projectUrl": "",
      "category": "localization",
      "motivation": "边界匹配置信度图提升质量",
      "summary": "BMN 提出了边界匹配（Boundary-Matching）机制，将时序动作提案表示为二维置信度图中的点，通过统一网络同时生成所有提案的边界概率和置信度分数，解决了 BSN 逐提案特征构建效率低下、缺乏全局上下文且需多阶段训练的问题，在 ActivityNet-1.3 和 THUMOS-14 上取得了当时最优的提案生成性能，同时推理速度提升约 12 倍。",
      "keyPoints": [
        "<strong>边界匹配（BM）机制</strong>：将提案表示为 <span class=\"kb-math kb-math-inline\">(t_s, d)</span> 即起始时刻与持续时长的组合，映射到二维 BM 置信度图 <span class=\"kb-math kb-math-inline\">M_{CC} \\in \\mathbb{R}^{D \\times T}</span>，实现对所有候选提案的同时评估",
        "<strong>BM 特征层（BM Layer）</strong>：通过预计算的采样掩码矩阵 <span class=\"kb-math kb-math-inline\">W</span>，将一维时序特征 <span class=\"kb-math kb-math-inline\">S_F \\in \\mathbb{R}^{C \\times T}</span> 转换为二维 BM 特征图 <span class=\"kb-math kb-math-inline\">M_F \\in \\mathbb{R}^{C \\times N \\times D \\times T}</span>，在每个提案的扩展区域内均匀采样 <span class=\"kb-math kb-math-inline\">N</span> 个特征点",
        "<strong>三模块统一架构</strong>：Base Module（时序特征编码）+ TEM（边界概率预测）+ PEM（提案置信度评估），端到端联合训练",
        "<strong>双输出置信度图</strong>：PEM 同时输出分类置信度图 <span class=\"kb-math kb-math-inline\">M_{CC}</span> 和回归置信度图 <span class=\"kb-math kb-math-inline\">M_{CR}</span>，融合后得到最终提案分数",
        "<strong>评估基准</strong>：ActivityNet-1.3（AUC 67.10%，提升 0.93%）和 THUMOS-14（AR@1000 达 65.49%），推理速度比 BSN 快约 12 倍",
        "<strong>泛化能力</strong>：在未见过的动作类别上性能几乎无下降，表明模型学习了通用的\"动作何时发生\"的概念"
      ],
      "detail": "<h5>核心架构图</h5>\n<p><img alt=\"BMN 整体框架图\" src=\"https://ar5iv.labs.arxiv.org/html/1907.09702v1/assets/x3.png\" />\n<em>图：BMN 网络架构。输入视频经 TSN 编码为时序特征后，Base Module 提取共享特征，TEM 预测边界概率，PEM 通过 BM Layer 生成二维特征图并输出置信度图。</em></p>\n<p><img alt=\"BM 机制示意图\" src=\"https://ar5iv.labs.arxiv.org/html/1907.09702v1/assets/x1.png\" />\n<em>图：边界匹配机制。左侧为 BSN 的逐提案评估方式，右侧为 BMN 的二维置信度图方式，每个点 <span class=\"kb-math kb-math-inline\">(i,j)</span> 对应一个起始于 <span class=\"kb-math kb-math-inline\">t_i</span>、持续 <span class=\"kb-math kb-math-inline\">d_j</span> 的提案。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># BMN 训练与推理流程伪代码\n# === 特征编码 ===\nS_F = TSN_encode(video)              # S_F ∈ R^{C×T}, T=100 for ANet\n\n# === Base Module ===\nx = Conv1D(S_F, 256, k=3) + ReLU     # 时序卷积\nx = Conv1D(x, 128, k=3) + ReLU       # 共享时序特征\n\n# === TEM: 边界概率预测 ===\nP_start = Sigmoid(Conv1D(x, 1, k=3)) # 起始边界概率 ∈ R^T\nP_end   = Sigmoid(Conv1D(x, 1, k=3)) # 结束边界概率 ∈ R^T\n\n# === PEM: 提案置信度评估 ===\n# BM Layer: 一维特征 → 二维特征图\nW = precompute_sampling_mask(N, D, T) # 采样掩码 W ∈ R^{N×D×T×T}\nM_F = einsum('ct,ndtk-&gt;cndt', x, W)  # BM特征图 M_F ∈ R^{C×N×D×T}\n\n# 3D+2D 卷积生成置信度图\nh = Conv3D(M_F, 512, k=(N,1,1))      # 压缩采样维度 → R^{512×D×T}\nh = Conv2D_stack(h)                    # 多层2D卷积\nM_CC = Sigmoid(Conv2D(h, 1))          # 分类置信度图 ∈ R^{D×T}\nM_CR = Sigmoid(Conv2D(h, 1))          # 回归置信度图 ∈ R^{D×T}\n\n# === 推理: 提案生成 ===\nproposals = peak_detect(P_start, P_end)  # 从边界概率中选取峰值组合\nfor (ts, te) in proposals:\n    p_s, p_e = P_start[ts], P_end[te]\n    cc, cr = M_CC[te-ts, ts], M_CR[te-ts, ts]\n    score = p_s * p_e * (cc * cr) ** 0.5  # 融合分数\nproposals = SoftNMS(proposals, scores)     # 去冗余\n</code></pre>\n<h5>动机与背景</h5>\n<p>时序动作提案生成（Temporal Action Proposal Generation）旨在从未裁剪视频中定位可能包含动作实例的时间区间，是时序动作检测的关键前置步骤。此前最优方法 BSN（Boundary Sensitive Network）采用\"局部到全局\"的框架：先用 TEM 预测每个时刻的边界概率，再组合边界生成候选提案，最后用 PEM 逐一评估每个提案的置信度。</p>\n<p>BSN 存在三个核心缺陷：</p>\n<ol>\n<li><strong>逐提案特征构建效率低</strong>：PEM 需要为每个候选提案单独构建特征（通过在边界概率序列上采样），当提案数量达到数千时，计算开销巨大</li>\n<li><strong>提案特征缺乏上下文</strong>：BSN 仅使用边界概率序列构建提案特征，丢失了视觉内容信息，限制了置信度评估的准确性</li>\n<li><strong>多阶段训练流程</strong>：TEM 和 PEM 需要分别训练，无法端到端优化，增加了工程复杂度</li>\n</ol>\n<div class=\"key-point\">💡 关键：BMN 的核心洞察是——如果将所有可能的提案组织为一个二维矩阵（起始时刻 × 持续时长），就可以用一次前向传播同时生成所有提案的置信度，而非逐一评估。</div>\n<h5>核心机制：边界匹配（Boundary-Matching）</h5>\n<p><strong>BM 置信度图的定义</strong></p>\n<p>BMN 将每个提案 <span class=\"kb-math kb-math-inline\">\\phi_{i,j}</span> 用起始位置 <span class=\"kb-math kb-math-inline\">t_i</span> 和持续时长 <span class=\"kb-math kb-math-inline\">d_j</span> 来索引，构成一个二维矩阵。置信度图 <span class=\"kb-math kb-math-inline\">M_C \\in \\mathbb{R}^{D \\times T}</span> 中的每个元素 <span class=\"kb-math kb-math-inline\">m^c_{i,j}</span> 表示提案 <span class=\"kb-math kb-math-inline\">\\phi_{i,j} = (t_i, d_j)</span> 的置信度分数，其中 <span class=\"kb-math kb-math-inline\">D</span> 为最大持续时长，<span class=\"kb-math kb-math-inline\">T</span> 为时序长度。</p>\n<p>这种表示的优势在于：所有合法提案（满足 <span class=\"kb-math kb-math-inline\">t_i + d_j \\leq T</span>）构成置信度图的下三角区域，可以通过卷积网络一次性生成。</p>\n<p><strong>BM 特征层（BM Layer）</strong></p>\n<p>BM Layer 是连接一维时序特征与二维置信度图的桥梁。给定共享时序特征 <span class=\"kb-math kb-math-inline\">S_F \\in \\mathbb{R}^{C \\times T}</span>，BM Layer 为每个提案 <span class=\"kb-math kb-math-inline\">\\phi_{i,j}</span> 提取一个包含 <span class=\"kb-math kb-math-inline\">N</span> 个采样点的特征向量。</p>\n<p>具体地，对于提案 <span class=\"kb-math kb-math-inline\">\\phi_{i,j} = (t_i, d_j)</span>，首先计算其扩展区域 <span class=\"kb-math kb-math-inline\">[t_i - 0.25 d_j, \\; t_i + d_j + 0.25 d_j]</span>，然后在该区域内均匀采样 <span class=\"kb-math kb-math-inline\">N</span> 个位置。扩展 25% 的上下文区域是为了捕获提案边界附近的环境信息。</p>\n<p>采样过程通过预计算的掩码矩阵 <span class=\"kb-math kb-math-inline\">W \\in \\mathbb{R}^{N \\times D \\times T \\times T}</span> 实现：</p>\n<div class=\"kb-math kb-math-display\">M_F = S_F \\cdot W</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">M_F \\in \\mathbb{R}^{C \\times N \\times D \\times T}</span> 为 BM 特征图。掩码 <span class=\"kb-math kb-math-inline\">W</span> 的每个元素 <span class=\"kb-math kb-math-inline\">w^{n}_{i,j,k}</span> 表示第 <span class=\"kb-math kb-math-inline\">(i,j)</span> 个提案的第 <span class=\"kb-math kb-math-inline\">n</span> 个采样点对时序位置 <span class=\"kb-math kb-math-inline\">k</span> 的权重（通过线性插值计算）。由于 <span class=\"kb-math kb-math-inline\">W</span> 仅依赖于 <span class=\"kb-math kb-math-inline\">N, D, T</span> 的取值，可在训练前一次性计算并固定。</p>\n<div class=\"warn-box\">⚠️ 注意：BM Layer 的计算本质上是矩阵乘法，因此可以高效地在 GPU 上并行执行，这是 BMN 相比 BSN 速度大幅提升的关键。</div>\n<p><strong>从 BM 特征图到置信度图</strong></p>\n<p>BM 特征图 <span class=\"kb-math kb-math-inline\">M_F \\in \\mathbb{R}^{C \\times N \\times D \\times T}</span> 经过以下卷积处理生成最终置信度图：</p>\n<ol>\n<li><strong>3D 卷积层</strong>：卷积核大小 <span class=\"kb-math kb-math-inline\">(N, 1, 1)</span>，将采样维度 <span class=\"kb-math kb-math-inline\">N</span> 压缩，输出 <span class=\"kb-math kb-math-inline\">\\mathbb{R}^{512 \\times D \\times T}</span></li>\n<li><strong>多层 2D 卷积</strong>：逐步提取空间特征</li>\n<li><strong>双头输出</strong>：</li>\n<li>分类头 <span class=\"kb-math kb-math-inline\">M_{CC}</span>：输出二值分类置信度（该位置是否为有效提案）</li>\n<li>回归头 <span class=\"kb-math kb-math-inline\">M_{CR}</span>：输出 IoU 回归值（该提案与真实动作的重叠度）</li>\n</ol>\n<h5>训练流程</h5>\n<p><strong>TEM 损失函数</strong></p>\n<p>TEM 的标签通过 IoR（Intersection over Region）计算：对于每个真实动作实例，其边界区域定义为 <span class=\"kb-math kb-math-inline\">[t_s - d/10, t_s + d/10]</span>（起始）和 <span class=\"kb-math kb-math-inline\">[t_e - d/10, t_e + d/10]</span>（结束），其中 <span class=\"kb-math kb-math-inline\">d</span> 为动作持续时长。每个时刻的标签为其与所有边界区域的最大 IoR 值。</p>\n<p>TEM 采用加权二值逻辑回归损失：</p>\n<div class=\"kb-math kb-math-display\">L_{TEM} = L_{bl}(P_S, G_S) + L_{bl}(P_E, G_E)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">L_{bl}</span> 使用阈值 <span class=\"kb-math kb-math-inline\">\\theta = 0.5</span> 将标签二值化，并通过正负样本数量的倒数进行加权，平衡类别不均衡问题：</p>\n<div class=\"kb-math kb-math-display\">L_{bl}(P, G) = \\frac{1}{l_\\omega} \\sum_{i=1}^{l_\\omega} \\left( \\alpha^+ \\cdot b_i \\cdot \\log(p_i) + \\alpha^- \\cdot (1-b_i) \\cdot \\log(1-p_i) \\right)</div>\n<p><strong>PEM 损失函数</strong></p>\n<p>PEM 的标签 <span class=\"kb-math kb-math-inline\">G_C</span> 为每个提案与所有真实动作的最大 IoU 值。PEM 损失包含分类和回归两部分：</p>\n<div class=\"kb-math kb-math-display\">L_{PEM} = L_C(M_{CC}, G_C) + \\lambda \\cdot L_R(M_{CR}, G_C)</div>\n<p>其中分类损失 <span class=\"kb-math kb-math-inline\">L_C</span> 同样使用 <span class=\"kb-math kb-math-inline\">L_{bl}</span>，回归损失 <span class=\"kb-math kb-math-inline\">L_R</span> 使用 L2 损失，<span class=\"kb-math kb-math-inline\">\\lambda = 10</span>。为平衡正负样本，取 IoU &gt; 0.6 的点为正样本，随机采样 IoU &lt; 0.2 的点为负样本，保持正负比例约 1:1。</p>\n<p><strong>总体训练目标</strong></p>\n<div class=\"kb-math kb-math-display\">L = L_{TEM} + \\lambda_1 \\cdot L_{PEM} + \\lambda_2 \\cdot L_2(\\Theta)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\lambda_1 = 1</span>，<span class=\"kb-math kb-math-inline\">\\lambda_2 = 0.0001</span>。三个模块端到端联合训练。</p>\n<h5>推理流程</h5>\n<ol>\n<li><strong>候选提案生成</strong>：从 TEM 输出的边界概率序列中，选取概率值高于阈值的峰值位置作为候选起始/结束点，两两组合生成候选提案</li>\n<li><strong>分数融合</strong>：对每个候选提案 <span class=\"kb-math kb-math-inline\">(t_s, t_e)</span>，从置信度图中查询对应位置的分类分数 <span class=\"kb-math kb-math-inline\">cc</span> 和回归分数 <span class=\"kb-math kb-math-inline\">cr</span>，与边界概率融合：</li>\n</ol>\n<div class=\"kb-math kb-math-display\">score = p_s \\cdot p_e \\cdot \\sqrt{cc \\cdot cr}</div>\n<ol>\n<li><strong>冗余抑制</strong>：使用 Soft-NMS 去除重叠提案</li>\n</ol>\n<h5>与 BSN 的关键区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>对比维度</th>\n<th>BSN</th>\n<th>BMN</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>提案评估方式</td>\n<td>逐提案构建特征并评分</td>\n<td>一次前向生成所有提案的置信度图</td>\n</tr>\n<tr>\n<td>提案特征来源</td>\n<td>仅边界概率序列</td>\n<td>视觉时序特征 + 上下文扩展</td>\n</tr>\n<tr>\n<td>训练方式</td>\n<td>TEM 和 PEM 分别训练</td>\n<td>端到端联合训练</td>\n</tr>\n<tr>\n<td>推理速度（3min视频）</td>\n<td>0.629s</td>\n<td>0.052s（快 ~12x）</td>\n</tr>\n<tr>\n<td>AUC (ActivityNet-1.3)</td>\n<td>66.17%</td>\n<td>67.10%</td>\n</tr>\n</tbody>\n</table></div>\n<h5>实验结果</h5>\n<p><strong>ActivityNet-1.3</strong>：BMN 在验证集上 AUC 达到 67.10%（BSN 为 66.17%），AR@100 达到 75.01%。在测试集上 AUC 达到 67.19%。结合视频级分类结果后，时序动作检测 average mAP 达到 33.85%（验证集）和 36.42%（测试集），显著优于 BSN 的 30.03% 和 32.87%。</p>\n<p><strong>THUMOS-14</strong>：使用 Two-Stream 特征 + Soft-NMS，AR@50 达到 39.36%，AR@1000 达到 65.49%，全面超越 BSN。</p>\n<p><strong>消融实验关键发现</strong>：\n- 端到端联合训练比分别训练 TEM+PEM 提升 AUC 0.67%（67.10% vs 66.43%）\n- BM 机制使 PEM 推理时间从 BSN 的 0.624s 降至 0.062s（分别训练）或 0.047s（联合训练）\n- 模型在未见过的动作类别上性能几乎无下降（AUC 64.47% vs 64.37%），展现出强泛化能力</p>",
      "quiz": {
        "q": "BMN 中 BM Layer 的核心作用是什么？",
        "options": [
          "将视频帧转换为光流特征",
          "将一维时序特征转换为二维 BM 特征图，使所有提案可同时评估",
          "对候选提案进行非极大值抑制",
          "预测每个时刻的动作类别概率"
        ],
        "answer": 1,
        "explain": "BM Layer 通过预计算的采样掩码矩阵，将共享的一维时序特征映射为二维 BM 特征图，使得后续卷积网络可以一次性生成所有提案的置信度，这是 BMN 相比 BSN 效率大幅提升的关键。"
      }
    },
    {
      "id": "gtad",
      "num": 9,
      "name": "G-TAD",
      "fullName": "图时序检测 (Graph TAD)",
      "year": "2019",
      "org": "PKU",
      "parent": "bmn",
      "paperUrl": "http://openaccess.thecvf.com/content_ICCV_2019/html/Zeng_Graph_Convolutional_Networks_for_Temporal_Action_Localization_ICCV_2019_paper.html",
      "projectUrl": "",
      "category": "localization",
      "motivation": "图卷积建模提案间关系",
      "summary": "该条目的论文实际提出的是 P-GCN：把 temporal proposals 建成图节点，用 contextual edges 和 surrounding edges 显式建模 proposal-proposal 关系，再用 GCN 同时改进动作分类、完整性判断和边界回归。它解决了传统两阶段定位方法逐 proposal 独立处理、无法利用相邻/重叠候选段上下文的问题。",
      "keyPoints": [
        "将每个 action proposal 表示为图节点 <span class=\"kb-math kb-math-inline\">v_i</span>，proposal 之间的时间关系表示为边 <span class=\"kb-math kb-math-inline\">e_{ij}</span>。",
        "构造两类边：contextual edges 连接高 tIoU 重叠 proposal，surrounding edges 连接不重叠但时间距离近的 proposal。",
        "在 proposal graph 上执行 GCN 消息传递，使每个 proposal 聚合邻域 proposal 的上下文和相关动作线索。",
        "使用两个 GCN 分支：原始 proposal feature 用于动作类别预测，扩展 proposal feature 用于边界回归与 completeness 预测。",
        "邻接矩阵边权可由 proposal 特征余弦相似度计算，并可映射到 embedding 空间后再计算相似度。",
        "训练时采用 GraphSAGE 风格的邻域采样降低上千 proposal 带来的计算和显存开销。",
        "实验在 THUMOS14 和 ActivityNet v1.3 上验证，论文报告 THUMOS14 tIoU=0.5 的 mAP 达到 49.1%。"
      ],
      "detail": "<p><img alt=\"P-GCN framework for temporal action localization\" src=\"https://ar5iv.labs.arxiv.org/html/1909.03252/assets/x2.png\" />\n<em>图：P-GCN 将 proposal 实例化为图节点，建立 proposal 间边，并用两个 GCN 分支输出类别、完整性和边界回归结果。</em></p>\n<pre><code class=\"language-python\"># P-GCN training flow\nfor video in dataset:\n    proposals = proposal_generator(video)  # e.g. BSN/TAG proposals\n    x = extract_i3d_features(proposals)\n    x_ext = extract_i3d_features(extend_each_proposal(proposals, ratio=0.5))\n\n    # 1. 建图：节点是 proposals，边来自重叠关系和近邻关系\n    graph = Graph()\n    for pi in proposals:\n        graph.add_node(pi)\n    for pi, pj in all_pairs(proposals):\n        if tIoU(pi, pj) &gt; theta_ctx:\n            graph.add_edge(pi, pj, type=&quot;contextual&quot;)\n        elif tIoU(pi, pj) == 0 and temporal_distance(pi, pj) &lt; theta_sur:\n            graph.add_edge(pi, pj, type=&quot;surrounding&quot;)\n\n    A = cosine_adjacency(graph, features=x)\n\n    # 2. 训练时采样邻居，测试时使用完整邻接\n    for layer in range(K):\n        for pi in proposals:\n            neigh = sample_neighbors(graph.neighbors(pi), Ns)\n            x[pi] = aggregate_with_self(x[pi], x[neigh], A[pi, neigh])\n            x_ext[pi] = aggregate_with_self(x_ext[pi], x_ext[neigh], A[pi, neigh])\n\n    # 3. 两个 GCN 分支分别服务分类与定位\n    cls_logits = FC1(GCN1(x, graph))\n    boundary_offsets = FC2(GCN2(x_ext, graph))\n    completeness = FC3(GCN2(x_ext, graph))\n\n    loss = cross_entropy(cls_logits, labels) \\\n         + smooth_l1(boundary_offsets, target_offsets) \\\n         + hinge_loss(completeness, complete_labels)\n    optimize(loss)\n</code></pre>\n<p>传统两阶段 temporal action localization 通常先生成 proposal，再对每个 proposal 独立提取特征并预测类别/边界。这种做法忽略了一个事实：同一个动作实例往往对应多个高度重叠的 proposal，它们分别覆盖动作的开始、中段或结束；附近的不同 proposal 也可能提供场景和动作上下文。P-GCN 的核心判断是：proposal 不是孤立样本，而是一组有结构关系的候选片段。</p>\n<p>论文将一个视频内的 proposal 集合写成：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{P}=\\{\\mathbf{p}_i\\mid \\mathbf{p}_i=(\\mathbf{x}_i,(t_{i,s},t_{i,e}))\\}_{i=1}^{N}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\mathbf{x}_i</span> 是 proposal 特征，<span class=\"kb-math kb-math-inline\">(t_{i,s},t_{i,e})</span> 是时间边界。图 <span class=\"kb-math kb-math-inline\">\\mathcal{G}(\\mathcal{P},\\mathcal{E})</span> 的节点就是 proposal，边分成两类。第一类 contextual edge 用 tIoU 衡量重叠关系：</p>\n<div class=\"kb-math kb-math-display\">r(\\mathbf{p}_i,\\mathbf{p}_j)=tIoU(\\mathbf{p}_i,\\mathbf{p}_j)=\\frac{I(\\mathbf{p}_i,\\mathbf{p}_j)}{U(\\mathbf{p}_i,\\mathbf{p}_j)}</div>\n<p>若 <span class=\"kb-math kb-math-inline\">r(\\mathbf{p}_i,\\mathbf{p}_j)&gt;\\theta_{ctx}</span>，则两者连接。这样，高度重叠的 proposal 可以共享对同一动作实例不同部分的观察，帮助分类和边界修正。</p>\n<p>第二类 surrounding edge 针对不重叠但时间相近的 proposal。论文先要求 <span class=\"kb-math kb-math-inline\">r(\\mathbf{p}_i,\\mathbf{p}_j)=0</span>，再计算归一化时间距离：</p>\n<div class=\"kb-math kb-math-display\">d(\\mathbf{p}_i,\\mathbf{p}_j)=\\frac{|c_i-c_j|}{U(\\mathbf{p}_i,\\mathbf{p}_j)}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">c_i</span> 和 <span class=\"kb-math kb-math-inline\">c_j</span> 是两个 proposal 的中心坐标；若 <span class=\"kb-math kb-math-inline\">d(\\mathbf{p}_i,\\mathbf{p}_j)&lt;\\theta_{sur}</span>，则建立 surrounding edge。这类边允许背景片段或相邻动作片段向当前 proposal 传递场景线索，避免模型只盯着局部片段本身。</p>\n<p>在图构造完成后，P-GCN 使用标准图卷积更新所有 proposal 表示：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{X}^{(k)}=\\mathbf{A}\\mathbf{X}^{(k-1)}\\mathbf{W}^{(k)}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\mathbf{A}</span> 是邻接矩阵，<span class=\"kb-math kb-math-inline\">\\mathbf{X}^{(0)}\\in\\mathbb{R}^{N\\times d}</span> 是输入 proposal 特征。边权可以用 proposal 特征的余弦相似度给出：</p>\n<div class=\"kb-math kb-math-display\">A_{ij}=\\frac{\\mathbf{x}_i^T\\mathbf{x}_j}{\\|\\mathbf{x}_i\\|_2\\cdot\\|\\mathbf{x}_j\\|_2}</div>\n<p>最后一层还会把隐藏特征与原始输入拼接：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{X}^{(K)} := \\mathbf{X}^{(K)} \\| \\mathbf{X}^{(0)}</div>\n<p>这相当于在图消息传递后的上下文表示中保留 proposal 自身的局部证据，降低过度平滑的风险。</p>\n<p>模型输出拆成两个 GCN 分支。第一个分支使用原始 proposal 特征预测动作类别：</p>\n<div class=\"kb-math kb-math-display\">\\{\\hat{y}_i\\}_{i=1}^{N}=\\operatorname{softmax}(FC_1(GCN_1(\\{\\mathbf{x}_i\\}_{i=1}^{N},\\mathcal{G})))</div>\n<p>第二个分支使用扩展 proposal feature <span class=\"kb-math kb-math-inline\">\\mathbf{x}&#x27;_i</span>：每个 proposal 左右各扩展半个自身长度后提取特征，用来预测边界回归和 completeness：</p>\n<div class=\"kb-math kb-math-display\">\\{(\\hat{t}_{i,s},\\hat{t}_{i,e})\\}_{i=1}^{N}=FC_2(GCN_2(\\{\\mathbf{x}&#x27;_i\\}_{i=1}^{N},\\mathcal{G}))</div>\n<div class=\"kb-math kb-math-display\">\\{\\hat{c}_i\\}_{i=1}^{N}=FC_3(GCN_2(\\{\\mathbf{x}&#x27;_i\\}_{i=1}^{N},\\mathcal{G}))</div>\n<p>completeness 的作用是识别“分类分数很高但只覆盖动作一部分”的 proposal，避免 mAP 排序时把不完整片段排在完整片段前面。</p>\n<p>计算效率上，一个视频可能有上千个 proposal，直接完整图卷积会带来 <span class=\"kb-math kb-math-inline\">N^2</span> 级别的边处理负担。论文采用 GraphSAGE 式邻域采样训练，每层只采样 <span class=\"kb-math kb-math-inline\">N_s</span> 个邻居：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{x}_i^{(k)}=\n\\left(\\frac{1}{N_s}\\sum_{j=1}^{N_s}A_{ij}\\mathbf{x}_j^{(k-1)}+\\mathbf{x}_i^{(k-1)}\\right)\\mathbf{W}^{(k)}</div>\n<p>测试时则不采样，使用完整邻接图。训练损失由类别交叉熵、completeness hinge loss 和边界回归 smooth <span class=\"kb-math kb-math-inline\">L_1</span> loss 组成；测试时 RGB/Flow 两路结果融合，最终分数由分类分数和 completeness 分数相乘，再经 NMS 得到每类动作检测结果。</p>\n<div class=\"key-point\">💡 关键：P-GCN 的“图”不是把视频帧连起来，而是把 proposal 连起来；它建模的是候选片段之间的重叠、邻近和上下文关系，因此特别适合作为 BSN/BMN 这类 proposal generator 之后的关系推理模块。</div>",
      "quiz": {
        "q": "P-GCN 中 contextual edges 与 surrounding edges 的区别是什么？",
        "options": [
          "前者连接高度重叠 proposal，后者连接不重叠但时间距离近的 proposal",
          "前者只用于 RGB 流，后者只用于 Flow 流",
          "前者负责边界回归，后者负责 Soft-NMS",
          "前者连接视频帧，后者连接动作类别"
        ],
        "answer": 0,
        "explain": "contextual edges 基于 tIoU 连接重叠 proposal，用于共享同一动作实例的上下文；surrounding edges 连接相邻但不重叠 proposal，用于传递附近动作或背景线索。"
      }
    },
    {
      "id": "afsd",
      "num": 10,
      "name": "AFSD",
      "fullName": "无锚点检测器 (Anchor-Free Single-Stage)",
      "year": "2021",
      "org": "SJTU",
      "parent": "gtad",
      "paperUrl": "http://openaccess.thecvf.com/content/CVPR2021/html/Lin_Learning_Salient_Boundary_Feature_for_Anchor-free_Temporal_Action_Localization_CVPR_2021_paper.html",
      "projectUrl": "",
      "category": "localization",
      "motivation": "首个纯Anchor-free时序定位",
      "summary": "AFSD 提出首个纯 anchor-free 的单阶段时序动作定位框架，用“每个时序位置直接回归左右边界距离”的方式替代动作性枚举和预设 anchor，并通过显著边界特征与一致性学习提升边界精度。",
      "keyPoints": [
        "<strong>纯 anchor-free TAL</strong>：每个 FPN 时序位置只预测一个动作片段的起止距离与类别分数，不再枚举 <span class=\"kb-math kb-math-inline\">\\mathcal{O}(T^2)</span> 起止组合或调参预设 anchor",
        "<strong>端到端单阶段检测器</strong>：I3D backbone + 1D temporal FPN + coarse prediction head + saliency-based refinement head 共同训练",
        "<strong>显著边界池化</strong>：在粗边界附近构造 start/end 区域，用 channel-wise max pooling 选择最强激活的 moment-level 边界特征",
        "<strong>边界一致性学习 BCL</strong>：用 Activation Guided Learning 约束边界敏感特征，并用 Boundary Contrastive Learning 拉近真实动作两段边界、拉远背景边界",
        "<strong>质量置信度替代 centerness</strong>：用预测片段与真实片段的 tIoU 作为质量监督，避免直接套用目标检测中的 centerness",
        "<strong>推理融合</strong>：粗分类、精分类与质量分数联合得到最终类别置信度，再用 Soft-NMS 去除冗余片段"
      ],
      "detail": "<h5>核心架构图</h5>\n<p><img alt=\"AFSD 整体框架图\" src=\"https://ar5iv.labs.arxiv.org/html/2103.13137/assets/x3.png\" />\n<em>图：AFSD 从视频特征构建 1D temporal FPN，各层先输出粗边界，再用显著边界特征细化起止位置、类别和质量分数。</em></p>\n<p><img alt=\"AFSD 显著边界池化图\" src=\"https://ar5iv.labs.arxiv.org/html/2103.13137/assets/x4.png\" />\n<em>图：Saliency-based Refinement Module 根据粗边界定位 start/end 区域，并在区域内寻找最显著的 moment-level 边界特征。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># AFSD 训练与推理核心流程伪代码\ndef AFSD(video):\n    # 1. Backbone 与时序金字塔\n    F = I3D(video)                              # [T', C', H', W']\n    seq = flatten_spatial(F)                    # [T', C]\n    pyramid = temporal_fpn(seq)                 # 多尺度 1D FPN 特征\n\n    all_predictions = []\n    for level, f_l in enumerate(pyramid):\n        # 2. Anchor-free 粗预测：每个时序位置直接回归到左右边界的距离\n        f_loc, f_cls = conv_branch(f_l, &quot;loc&quot;), conv_branch(f_l, &quot;cls&quot;)\n        d_start, d_end = regressor(f_loc)\n        cls_coarse = classifier(f_cls)\n\n        coarse = []\n        for i in range(len(f_l)):\n            stride = 2 ** level\n            start = i * stride - d_start[i]\n            end = i * stride + d_end[i]\n            coarse.append((start, end, cls_coarse[i]))\n\n        # 3. 显著边界池化：围绕粗边界提取 start/end 敏感特征\n        f_start = relu(group_norm(conv_start(f_loc)))\n        f_end = relu(group_norm(conv_end(f_loc)))\n        boundary_feats = []\n        for start, end, _ in coarse:\n            width = end - start\n            start_region = (start - width / delta_a, start + width / delta_b)\n            end_region = (end - width / delta_b, end + width / delta_a)\n            s_feat = max_pool_over_time(f_start, start_region)\n            e_feat = max_pool_over_time(f_end, end_region)\n            boundary_feats.append(concat(f_l, s_feat, e_feat, frame_level_feats))\n\n        # 4. 细化预测\n        refined_feat = conv_reduce(boundary_feats)\n        delta_start, delta_end = refinement_regressor(refined_feat)\n        cls_refined = refinement_classifier(refined_feat)\n        quality = quality_head(refined_feat)\n\n        all_predictions.extend(fuse(coarse, delta_start, delta_end, cls_refined, quality))\n\n    return soft_nms(all_predictions)\n</code></pre>\n<h5>方法详解</h5>\n<p><strong>动机与背景</strong></p>\n<p>AFSD 针对的是 Temporal Action Localization：输入未裁剪长视频，输出每个动作实例的类别、开始时间和结束时间。它之前的主流路线有两类：actionness-guided 方法先预测每个时刻的 start/end/actionness，再组合出大量候选；anchor-based 方法预设多个尺度的 anchor，再做边界回归。前者近似枚举所有起止组合，复杂度可到 <span class=\"kb-math kb-math-inline\">\\mathcal{O}(T^2)</span>；后者输出数量与 anchor 数 <span class=\"kb-math kb-math-inline\">C</span> 绑定，约为 <span class=\"kb-math kb-math-inline\">C \\cdot T</span>，并且对 anchor 尺度和位置超参敏感。</p>\n<p>AFSD 的核心选择是把时序定位改写成类似 FCOS 的 anchor-free 回归：给定 FPN 第 <span class=\"kb-math kb-math-inline\">l</span> 层的时序位置 <span class=\"kb-math kb-math-inline\">i</span>，网络直接预测该位置到动作开始和结束的距离 <span class=\"kb-math kb-math-inline\">(\\hat d_i^s,\\hat d_i^e)</span>，从而得到粗边界：</p>\n<div class=\"kb-math kb-math-display\">\\hat{\\psi}_i = i \\cdot 2^l - \\hat d_i^s,\\qquad\n\\hat{\\xi}_i = i \\cdot 2^l + \\hat d_i^e</div>\n<p>这种形式让每个位置只产生一个候选片段，省掉了 anchor 设计和 proposal 组合。更重要的是，分类与定位在同一个端到端网络中完成，不再需要额外的片段分类器来给 proposal 重新打类别分。</p>\n<p><strong>显著边界池化</strong></p>\n<p>仅靠局部时序卷积回归边界会遇到一个问题：不同动作长度差异很大，固定感受野很难稳定看到真正的起止时刻。AFSD 因此增加 Saliency-based Refinement Module。它先把定位特征投影成 start-sensitive 和 end-sensitive 两个空间：</p>\n<div class=\"kb-math kb-math-display\">f^s=\\sigma(\\mathrm{GN}(\\mathrm{Conv}_s(f_{loc}))),\\qquad\nf^e=\\sigma(\\mathrm{GN}(\\mathrm{Conv}_e(f_{loc})))</div>\n<p>对第 <span class=\"kb-math kb-math-inline\">k</span> 个粗预测片段 <span class=\"kb-math kb-math-inline\">(\\hat\\psi_k,\\hat\\xi_k)</span>，设片段长度 <span class=\"kb-math kb-math-inline\">\\hat w_k=\\hat\\xi_k-\\hat\\psi_k</span>，AFSD 在开始点和结束点附近构造非对称边界区域：</p>\n<div class=\"kb-math kb-math-display\">T_s^k=\\left[\\hat\\psi_k-\\frac{\\hat w_k}{\\delta_a},\\hat\\psi_k+\\frac{\\hat w_k}{\\delta_b}\\right],\\qquad\nT_e^k=\\left[\\hat\\xi_k-\\frac{\\hat w_k}{\\delta_b},\\hat\\xi_k+\\frac{\\hat w_k}{\\delta_a}\\right]</div>\n<p>然后对每个通道在该区域内取最大激活：</p>\n<div class=\"kb-math kb-math-display\">\\hat f^s(k,c)=\\max_{j\\in T_s^k} f^s(j,c),\\qquad\n\\hat f^e(k,c)=\\max_{j\\in T_e^k} f^e(j,c)</div>\n<p>这一步的直觉很明确：边界判断依赖的是“某一瞬间是否发生从背景到动作、或从动作到背景的变化”，而不是整段区域的平均特征。mean pooling 或卷积会混入大量非边界帧，max pooling 则更像是在边界候选区域里寻找最有判别力的瞬时证据。</p>\n<p><strong>边界一致性学习</strong></p>\n<p>显著边界池化本身只保证“取最大值”，不保证最大值对应真正边界。AFSD 为此设计 Boundary Consistency Learning。第一部分是 Activation Guided Learning：把 start/end 敏感特征经过 <span class=\"kb-math kb-math-inline\">\\tanh</span> 后按通道平均，得到边界激活图 <span class=\"kb-math kb-math-inline\">\\tilde g^s,\\tilde g^e</span>，再用真实起止点邻域标签 <span class=\"kb-math kb-math-inline\">g^s,g^e</span> 做 BCE：</p>\n<div class=\"kb-math kb-math-display\">\\ell_{act}=\\mathrm{BCE}(g^s,\\tilde g^s)+\\mathrm{BCE}(g^e,\\tilde g^e)</div>\n<p>第二部分是 Boundary Contrastive Learning。论文把一个动作片段切成前后两段 <span class=\"kb-math kb-math-inline\">A_1,A_2</span>，中间插入背景 <span class=\"kb-math kb-math-inline\">Bg</span>。合理的边界特征应满足：<span class=\"kb-math kb-math-inline\">A_1</span> 的结束边界和 <span class=\"kb-math kb-math-inline\">A_2</span> 的开始边界相似，但应远离背景边界。于是使用 triplet 形式：</p>\n<div class=\"kb-math kb-math-display\">\\ell_{trip}=\\max\\left(\\|f^e_{A_1}-f^s_{A_2}\\|^2-\\|f^e_{A_1}-f_{Bg}\\|^2+1,0\\right)</div>\n<p>最终一致性损失为：</p>\n<div class=\"kb-math kb-math-display\">\\ell_{con}=\\ell_{act}+\\ell_{trip}</div>\n<p>这使边界池化不只是局部最大激活选择器，而是被训练成“应当在真实动作开始/结束处产生高响应”的特征提取器。</p>\n<p><strong>训练目标与质量分数</strong></p>\n<p>AFSD 同时监督粗预测和细化预测。粗定位使用 tIoU loss，细化边界使用 L1 offset loss，粗分类和精分类都用 focal loss。总体检测损失为：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}=\\ell^C_{cls}+\\lambda\\ell^C_{loc}+\\ell^R_{cls}+\\lambda\\ell^R_{loc}+\\gamma\\ell_q</div>\n<p>其中粗定位损失可写成：</p>\n<div class=\"kb-math kb-math-display\">\\ell^C_{loc}=\\frac{1}{N_C}\\sum_i \\mathbb{I}(y_i\\ge 1)\\left(1-\\frac{|\\hat\\phi_i\\cap\\phi_i|}{|\\hat\\phi_i\\cup\\phi_i|}\\right)</div>\n<p>质量分数 <span class=\"kb-math kb-math-inline\">\\eta_i</span> 的监督目标不是 FCOS centerness，而是细化边界 <span class=\"kb-math kb-math-inline\">\\tilde\\phi_i</span> 与真实片段 <span class=\"kb-math kb-math-inline\">\\phi_i</span> 的 tIoU：</p>\n<div class=\"kb-math kb-math-display\">\\ell_q=\\frac{1}{N_R}\\sum_i \\mathbb{I}(y_i\\ge 1)\\,\n\\mathrm{BCE}\\left(\\eta_i,\\frac{|\\tilde\\phi_i\\cap\\phi_i|}{|\\tilde\\phi_i\\cup\\phi_i|}\\right)</div>\n<p>这是时序定位里的关键取舍：动作边界不像目标框中心那样有清晰几何中心，直接套 centerness 不稳定；用 tIoU 作为质量目标更贴近最终 NMS 和 mAP 评价。</p>\n<p><strong>推理与传统方法差异</strong></p>\n<p>推理时，AFSD 把细化 offset 加到粗边界上，并将粗分类、精分类和质量置信度融合：</p>\n<div class=\"kb-math kb-math-display\">\\tilde\\psi_{l,i}=\\hat\\psi_{l,i}+\\frac{1}{2}\\hat w_{l,i}\\Delta\\hat\\psi_{l,i},\\qquad\n\\tilde\\xi_{l,i}=\\hat\\xi_{l,i}+\\frac{1}{2}\\hat w_{l,i}\\Delta\\hat\\xi_{l,i}</div>\n<div class=\"kb-math kb-math-display\">\\hat y_{l,i}=\\frac{1}{2}(\\hat y^C_{l,i}+\\hat y^R_{l,i})\\eta_{l,i}</div>\n<p>相比 BMN/G-TAD 这类 proposal-centric 方法，AFSD 不再显式构建二维 proposal 图或图关系，而是在 dense temporal location 上直接回归片段；相比 anchor-based 方法，它也不依赖预设持续时间集合。它的性能提升主要来自两个补丁：用边界池化弥补 anchor-free 粗回归的边界不准，用 BCL 确保边界池化学到真实边界而不是背景峰值。</p>",
      "quiz": {
        "q": "AFSD 中显著边界池化的主要作用是什么？",
        "options": [
          "枚举所有可能的起止时刻组合",
          "在粗边界附近选择最有判别力的 moment-level start/end 特征来细化边界",
          "把视频级类别标签转换成帧级标签",
          "用预设 anchor 生成多尺度候选片段"
        ],
        "answer": 1,
        "explain": "AFSD 已经由 anchor-free head 给出粗边界，边界池化在该边界附近寻找最强 start/end 激活，提供用于边界修正和质量估计的显著瞬时特征。"
      }
    },
    {
      "id": "tallformer",
      "num": 11,
      "name": "TallFormer",
      "fullName": "长程Transformer (TAL Long-Memory Transformer)",
      "year": "2022",
      "org": "UNC",
      "parent": "afsd",
      "paperUrl": "https://link.springer.com/chapter/10.1007/978-3-031-19830-4_29",
      "projectUrl": "",
      "category": "localization",
      "motivation": "长程记忆处理超长视频",
      "summary": "TallFormer 提出带长时记忆的端到端时序动作定位 Transformer，只在线处理少量采样 clip，并从 per-video long memory 中读取其余 clip 特征，从而在有限显存下同时保留强短时视频 Transformer 与长程边界定位能力。",
      "keyPoints": [
        "<strong>Long Memory Module (LMM)</strong>：为每个训练视频缓存所有短 clip 的特征，当前迭代只重算采样 clip，其余 clip 直接从 memory 读取",
        "<strong>端到端高分辨率训练</strong>：避免冻结 backbone 或降低空间分辨率，使 VideoSwin 等强视频 Transformer 能用于长视频 TAL",
        "<strong>Uniform random clip sampling</strong>：每轮训练随机选择 <span class=\"kb-math kb-math-inline\">N_s</span> 个 clip 经过 short-term encoder，未选 clip 用历史特征近似",
        "<strong>Temporal Consistency Module (TCM)</strong>：用多层 Transformer 让在线新特征和 memory 旧特征交互，缓解两者分布不一致",
        "<strong>一阶段边界定位模块</strong>：在 THUMOS14 上结合 DaoTAD 风格检测头，在 ActivityNet-1.3 上结合 AFSD 风格检测头，并减少对外部分类器的依赖",
        "<strong>训练与推理分离</strong>：训练阶段用 memory 节省显存和计算；推理阶段可直接用 short-term encoder 抽取全部 clip 特征"
      ],
      "detail": "<h5>核心架构图</h5>\n<p><img alt=\"TallFormer 长记忆框架图\" src=\"https://ar5iv.labs.arxiv.org/html/2204.01680/assets/x2.png\" />\n<em>图：TallFormer 只把随机采样 clip 送入短时 Transformer，其余位置读取 long memory；融合后的全视频特征进入 TCM 和边界定位模块。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># TallFormer 长记忆训练流程伪代码\ndef tallformer_train_step(video_id, clips, long_memory, encoder, tcm, tblm, r):\n    # clips: [N_c, L_c, H, W, 3]\n    # long_memory[video_id]: [N_c, L_f, C_f]\n    N_c = len(clips)\n    sampled_idx = uniform_sample(N_c, ratio=r)          # N_s 个 clip 在线编码\n    remaining_idx = [i for i in range(N_c) if i not in sampled_idx]\n\n    # 1. Short-term Transformer Encoder\n    sampled_features = encoder(clips[sampled_idx])      # 有梯度\n\n    # 2. Long Memory Module\n    memory_features = long_memory[video_id][remaining_idx]  # 无需重算、无梯度\n    long_memory[video_id][sampled_idx] = stop_gradient(sampled_features)\n\n    # 3. 按原始时间顺序拼回全视频特征\n    features = zeros_like_full_video_feature(N_c)\n    features[sampled_idx] = sampled_features\n    features[remaining_idx] = memory_features\n    features = features.reshape(N_c * L_f, C_f)\n\n    # 4. Temporal Consistency Module\n    for _ in range(L):\n        features = TransformerLayer(features)\n\n    # 5. Temporal Boundary Localization Module\n    detections = tblm(features)\n    loss = detection_loss(detections)\n    loss.backward()\n    return detections\n</code></pre>\n<h5>方法详解</h5>\n<p><strong>动机与背景</strong></p>\n<p>时序动作定位需要同时解决两个尺度的问题：短时 clip 内要有强视觉表示，长视频全局上要准确定位动作边界。早期 TAL 方法常把这两步拆开：先离线提取 I3D/TSN 等 action recognition 特征，再训练边界定位模型。这样显存低、速度快，但 feature extractor 不是为定位任务端到端优化的。AFSD、DaoTAD 等端到端方法推进了这一点，但为了装进显存，通常要降低输入分辨率、缩短 temporal support 或冻结部分 backbone。</p>\n<p>TallFormer 的核心观察是：长视频相邻 clip 高度冗余，训练时没有必要每轮都重算全部 clip 的 Transformer 特征。设一个视频被切成 <span class=\"kb-math kb-math-inline\">N_c</span> 个不重叠 clip，当前迭代只采样 <span class=\"kb-math kb-math-inline\">N_s</span> 个 clip 送入 VideoSwin 等 short-term Transformer，采样比例为：</p>\n<div class=\"kb-math kb-math-display\">r=\\frac{N_s}{N_c}</div>\n<p>理想情况下，短时 encoder 的主要显存和计算开销也近似按 <span class=\"kb-math kb-math-inline\">r</span> 缩减。剩余 <span class=\"kb-math kb-math-inline\">N_c-N_s</span> 个 clip 的特征从 long memory 中读取，这使模型仍然能把完整视频的时序上下文交给边界定位模块。</p>\n<p><strong>Long Memory Module</strong></p>\n<p>LMM 是 TallFormer 的关键。它为每个训练视频维护一个特征缓存：</p>\n<div class=\"kb-math kb-math-display\">M_V \\in \\mathbb{R}^{N_c \\times L_f \\times C_f}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">N_c</span> 是 clip 数，<span class=\"kb-math kb-math-inline\">L_f</span> 是每个 clip 输出的短时 token/feature 长度，<span class=\"kb-math kb-math-inline\">C_f</span> 是特征维度。当前迭代采样索引集合 <span class=\"kb-math kb-math-inline\">I</span>，未采样集合 <span class=\"kb-math kb-math-inline\">I&#x27;</span>。在线 encoder 只计算：</p>\n<div class=\"kb-math kb-math-display\">f_I^{(s)} = E_\\theta(c_I)</div>\n<p>未采样特征直接读取：</p>\n<div class=\"kb-math kb-math-display\">f_{I&#x27;}^{(l)} = M_V[I&#x27;]</div>\n<p>随后把新计算的 sampled features 写回 memory：</p>\n<div class=\"kb-math kb-math-display\">M_V[I] \\leftarrow \\mathrm{stopgrad}(f_I^{(s)})</div>\n<p>这里 <code>stopgrad</code> 很重要：memory 里的旧特征不参与反向传播，所以不会把梯度图扩展到所有历史 clip。由于 encoder 通常从 Kinetics 等大规模动作识别预训练开始，并且学习率小于后续定位模块，特征随训练变化相对缓慢，缓存近似在实践中可行。</p>\n<p><strong>Temporal Consistency Module</strong></p>\n<p>LMM 带来一个副作用：同一个视频的特征来自两个时间点，在线采样 clip 是当前 encoder 输出，memory clip 可能是若干迭代之前的 encoder 输出。直接拼接会产生 temporal inconsistency。TallFormer 用 Temporal Consistency Module 处理这个问题。</p>\n<p>先按原时间顺序构造全视频特征 <span class=\"kb-math kb-math-inline\">g</span>：</p>\n<div class=\"kb-math kb-math-display\">g[i]=\n\\begin{cases}\nf_i^{(s)}, &amp; i\\in I \\\\\nf_i^{(l)}, &amp; i\\in I&#x27;\n\\end{cases}</div>\n<p>然后用 <span class=\"kb-math kb-math-inline\">L</span> 层 TransformerLayer 让所有 clip 特征全局交互：</p>\n<div class=\"kb-math kb-math-display\">h^{(0)}=g,\\qquad h^{(\\ell)}=\\mathrm{TransformerLayer}(h^{(\\ell-1)}),\\quad \\ell=1,\\ldots,L</div>\n<p>TCM 的作用不是再做短时视频编码，而是把新旧来源的 clip-level 表示拉到同一分布，同时用 self-attention 建模完整视频范围内的长程依赖。论文默认使用 3 层 TCM，并采用相对位置编码、GELU 和 DropPath。</p>\n<p><strong>Temporal Boundary Localization Module</strong></p>\n<p>TCM 输出的 refined features 会送入 TBLM 预测动作边界与类别。TallFormer 不是重新发明检测头，而是把强 backbone 和 long memory 接到成熟 TAL head 上：THUMOS14 使用 DaoTAD 风格的 FPN + detection head，分类分支用 focal loss，回归分支用 DIoU loss；ActivityNet-1.3 使用 AFSD 风格的 basic prediction + saliency refinement，并额外加入视频级分类器。</p>\n<p>可以把总体训练目标概括为：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{TallFormer}\n=\\mathcal{L}_{TBLM}(h^{(L)}, \\Phi)\n+\\lambda_{video}\\mathcal{L}_{video\\_cls}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\Phi</span> 表示动作边界和类别标注。对 ActivityNet-1.3，<span class=\"kb-math kb-math-inline\">\\mathcal{L}_{TBLM}</span> 包含 AFSD 中的 focal classification、basic prediction tIoU regression、saliency refinement L1 regression 等损失；<span class=\"kb-math kb-math-inline\">\\mathcal{L}_{video\\_cls}</span> 来自 TCM 特征的 global average pooling、dropout 和线性分类器。对 THUMOS14，则主要是 DaoTAD head 的分类与边界回归损失。</p>\n<p><strong>训练、推理与设计取舍</strong></p>\n<p>训练阶段，TallFormer 的 memory 是“encoder 近似器”：未采样 clip 的 feature 不再在线计算，从而允许模型使用更强的 VideoSwin-B、更高空间分辨率和更长 temporal support。相比传统 memory bank 只作为辅助信息，TallFormer 直接把 memory feature 当作检测输入的一部分，这是它能保持长程定位能力的原因。</p>\n<p>推理阶段，论文不再需要 LMM：因为没有反向传播，显存压力大幅降低，可以用 short-term Transformer encoder 抽取所有 clip 的特征，再经过 TCM/TBLM 输出检测结果。也就是说，LMM 主要是训练时的显存和时间优化，而不是推理时的模型结构依赖。</p>\n<p><strong>与 AFSD 的关系</strong></p>\n<p>AFSD 解决的是“如何让单阶段 anchor-free detector 精确定位边界”；TallFormer 解决的是“如何把强视频 Transformer 端到端训练到长视频定位里”。在 ActivityNet-1.3 上，TallFormer 直接继承 AFSD detection head，但用 LMM + TCM 替换了传统的密集特征提取流程。它的贡献不在于新的边界回归公式，而在于把原本显存不可承受的强短时编码器带回 TAL 训练闭环。</p>",
      "quiz": {
        "q": "TallFormer 中 Long Memory Module 的核心目的是什么？",
        "options": [
          "在推理阶段替代所有视频特征提取",
          "训练时缓存未采样 clip 的历史特征，使模型只需重算一小部分 clip 仍能看到完整视频",
          "把语言查询缓存为文本 memory",
          "用动态规划枚举所有动作边界"
        ],
        "answer": 1,
        "explain": "TallFormer 每轮只把采样 clip 送入 short-term Transformer，未采样 clip 从 per-video long memory 读取，从而显著降低端到端训练长视频 Transformer 的显存和计算开销。"
      }
    },
    {
      "id": "tall",
      "num": 12,
      "name": "TALL",
      "fullName": "语言时序定位 (Temporal Activity Localization via Language)",
      "year": "2017",
      "org": "UCLA",
      "parent": "—",
      "paperUrl": "http://openaccess.thecvf.com/content_iccv_2017/html/Gao_TALL_Temporal_Activity_ICCV_2017_paper.html",
      "projectUrl": "",
      "category": "grounding",
      "motivation": "首创语言驱动视频定位",
      "summary": "TALL 首次系统提出用自然语言查询在未裁剪视频中定位活动片段，并用 CTRL 同时学习跨模态对齐分数和时序边界回归，突破了只能检测预定义动作类别的传统时序定位范式。",
      "keyPoints": [
        "<strong>新任务定义</strong>：Temporal Activity Localization via Language，输入是未裁剪视频和自然语言 query，输出匹配 query 的起止时间",
        "<strong>CTRL 框架</strong>：Cross-modal Temporal Regression Localizer 包含视觉编码器、句子编码器、多模态融合模块、对齐与回归双头",
        "<strong>上下文视觉特征</strong>：候选 clip 不只看自身，还显式拼接 pre-context、central clip、post-context 特征",
        "<strong>多模态融合</strong>：同时使用逐元素乘法、逐元素加法和 FC(concat)，构建跨模态表示 <span class=\"kb-math kb-math-inline\">f_{sv}</span>",
        "<strong>双目标训练</strong>：alignment loss 区分匹配/不匹配 clip-sentence 对，regression loss 将滑动窗口边界修正到更准确位置",
        "<strong>数据集贡献</strong>：使用 TACoS，并在 Charades 上构建 Charades-STA，为后续视频时刻检索/语言时序定位奠定基准"
      ],
      "detail": "<h5>核心架构图</h5>\n<p><img alt=\"TALL CTRL 框架图\" src=\"https://ar5iv.labs.arxiv.org/html/1705.02101/assets/x2.png\" />\n<em>图：CTRL 将候选视频片段及其上下文、自然语言查询分别编码，再通过跨模态融合输出匹配分数和边界回归偏移。</em></p>\n<p><img alt=\"TALL 任务示意图\" src=\"https://ar5iv.labs.arxiv.org/html/1705.02101/assets/x1.png\" />\n<em>图：给定自然语言 query，模型需要在未裁剪视频中定位对应的时间片段，而不是只输出预定义动作类别。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># TALL / CTRL 训练与推理核心流程伪代码\ndef CTRL(video, query):\n    # 1. 多尺度滑动窗口生成候选 clip\n    clips = sliding_windows(video, lengths=[64, 128, 256, 512], overlap=0.8)\n\n    # 2. 句子编码\n    sent_raw = sentence_encoder(query)          # LSTM 或 Skip-thought\n    f_s = linear(sent_raw)                      # [d_s]\n\n    predictions = []\n    for clip in clips:\n        # 3. 视觉编码：显式建模前后上下文\n        f_pre = mean_pool(CNN(context_before(clip)))\n        f_ctl = CNN(clip)\n        f_post = mean_pool(CNN(context_after(clip)))\n        f_v = linear(concat(f_pre, f_ctl, f_post))\n\n        # 4. 多模态融合\n        f_mul = f_s * f_v\n        f_add = f_s + f_v\n        f_fc = fc(concat(f_s, f_v))\n        f_sv = concat(f_mul, f_add, f_fc)\n\n        # 5. 双头输出：对齐分数 + 边界回归\n        score = alignment_head(f_sv)\n        delta_start, delta_end = regression_head(f_sv)\n        refined_start = clip.start + delta_start\n        refined_end = clip.end + delta_end\n        predictions.append((refined_start, refined_end, score))\n\n    return rank_by_score(predictions)\n</code></pre>\n<h5>方法详解</h5>\n<p><strong>动机与任务定义</strong></p>\n<p>传统时序动作定位通常假设动作类别集合已知，例如只检测 “jumping” 或 “diving” 等固定标签。但真实用户往往会提出更自由的语言需求，例如“person opens the refrigerator and takes out food”。这种查询组合了动作、物体、人物和上下文，无法用一个预定义类别表覆盖。TALL 因此把问题改成：给定视频 <span class=\"kb-math kb-math-inline\">V</span> 和自然语言句子 <span class=\"kb-math kb-math-inline\">s</span>，在视频中找出与句子语义最匹配的时间区间 <span class=\"kb-math kb-math-inline\">(t_s,t_e)</span>。</p>\n<p>论文提出的 CTRL 仍然使用滑动窗口生成候选 clip，但不满足于“选择最高分窗口”。它认为候选窗口粒度有限，可能过长、过短或偏移，因此需要额外的 temporal regression head 对起止边界做连续修正。这一点把语言时刻定位从检索式 matching 推向了“匹配 + 边界回归”的检测式框架。</p>\n<p><strong>视觉编码与上下文建模</strong></p>\n<p>对于候选 clip <span class=\"kb-math kb-math-inline\">c_i=(t_i^s,t_i^e)</span>，CTRL 不只提取中心 clip 特征 <span class=\"kb-math kb-math-inline\">f_v^{ctl}</span>，还提取它之前和之后的上下文片段：</p>\n<div class=\"kb-math kb-math-display\">f_v^{pre}=\\frac{1}{n}\\sum_{q=-n}^{-1}E_v(c_{i,q}),\\qquad\nf_v^{post}=\\frac{1}{n}\\sum_{q=1}^{n}E_v(c_{i,q})</div>\n<p>然后拼接三部分并线性映射：</p>\n<div class=\"kb-math kb-math-display\">f_v=\\mathrm{LT}(f_v^{pre}\\Vert f_v^{ctl}\\Vert f_v^{post})</div>\n<p>这个设计服务于边界定位：动作开始前和结束后的内容往往是判断边界的重要线索。例如“倒水”之前可能是拿杯子，之后可能是放下水壶；只看窗口内部会难以判断窗口是否过紧或过松。</p>\n<p><strong>句子编码与跨模态融合</strong></p>\n<p>句子编码器 <span class=\"kb-math kb-math-inline\">F_{se}</span> 把 query 映射到与视觉特征同维度的空间。论文实验了 LSTM 和 Skip-thought 两类句子表示。视觉特征和句子特征同为 <span class=\"kb-math kb-math-inline\">d_s</span> 维后，CTRL 用三种互补操作融合：</p>\n<div class=\"kb-math kb-math-display\">f_{sv}=(f_s\\times f_v)\\Vert(f_s+f_v)\\Vert\\mathrm{FC}(f_s\\Vert f_v)</div>\n<p>逐元素乘法像维度级门控，突出语言和视觉同时响应的语义；逐元素加法保留两模态的线性叠加；FC(concat) 允许跨维度交互。三者拼接后进入 temporal localization regression network。</p>\n<p><strong>对齐分数与边界回归</strong></p>\n<p>CTRL 的输出有两个 sibling heads。第一个输出 alignment score <span class=\"kb-math kb-math-inline\">cs_{i,j}</span>，表示候选 clip <span class=\"kb-math kb-math-inline\">c_i</span> 与句子 <span class=\"kb-math kb-math-inline\">s_j</span> 的匹配程度。第二个输出边界回归偏移。论文比较了 parameterized 与 non-parameterized 两种形式。</p>\n<p>Parameterized offset 类似目标检测框回归，用中心和长度归一化：</p>\n<div class=\"kb-math kb-math-display\">t_c=\\frac{p-p_c}{l_c},\\qquad t_l=\\log\\frac{l}{l_c}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">p,l</span> 是预测片段的中心和长度，<span class=\"kb-math kb-math-inline\">p_c,l_c</span> 是候选 clip 的中心和长度。Non-parameterized offset 直接回归起止点偏移：</p>\n<div class=\"kb-math kb-math-display\">t_s=s-s_c,\\qquad t_e=e-e_c</div>\n<p>实验发现 non-parameterized 形式更适合时序动作边界。论文给出的直觉是：图像目标框会因相机投影产生尺度变化，所以归一化框回归很自然；但视频中的时间本身就是统一尺度，动作持续时间不应像图像目标大小那样被任意重缩放。</p>\n<p><strong>训练目标</strong></p>\n<p>CTRL 使用多任务损失：</p>\n<div class=\"kb-math kb-math-display\">L=L_{aln}+\\alpha L_{reg}</div>\n<p>Alignment loss 在 mini-batch 内把第 <span class=\"kb-math kb-math-inline\">i</span> 个 clip 与第 <span class=\"kb-math kb-math-inline\">i</span> 个句子视为正样本，其他组合视为负样本：</p>\n<div class=\"kb-math kb-math-display\">L_{aln}=\\frac{1}{N}\\sum_i\\left[\n\\alpha_c\\log(1+\\exp(-cs_{i,i}))\n+\\sum_{j\\ne i}\\alpha_w\\log(1+\\exp(cs_{i,j}))\n\\right]</div>\n<p>正样本的分数越高，<span class=\"kb-math kb-math-inline\">\\log(1+\\exp(-cs))</span> 越小；负样本的分数越低，<span class=\"kb-math kb-math-inline\">\\log(1+\\exp(cs))</span> 越小。这使模型学习跨模态检索排序。</p>\n<p>Regression loss 只对对齐的 clip-sentence pair 计算，使用 smooth <span class=\"kb-math kb-math-inline\">L_1</span>：</p>\n<div class=\"kb-math kb-math-display\">L_{reg}=\\frac{1}{N}\\sum_i\\left[R(t_{x,i}^*-t_{x,i})+R(t_{y,i}^*-t_{y,i})\\right]</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">(x,y)</span> 对应 parameterized 的 <span class=\"kb-math kb-math-inline\">(c,l)</span> 或 non-parameterized 的 <span class=\"kb-math kb-math-inline\">(s,e)</span>。训练样本的匹配条件也很关键：候选窗口与句子标注片段需要 IoU &gt; 0.5，同时 nIoL &lt; 0.2。nIoL 用来限制候选窗口中不属于目标句子的比例，避免一个窗口虽然与目标有较高 IoU，但内部包含另一个动作而干扰语言对齐。</p>\n<p><strong>推理流程与影响</strong></p>\n<p>推理时，CTRL 对测试视频生成滑动窗口，分别计算 query 与所有候选的 <span class=\"kb-math kb-math-inline\">cs</span>，并用回归头修正每个候选的起止时间，最后按 alignment score 排序返回 top-<span class=\"kb-math kb-math-inline\">n</span>。这种方法仍有滑动窗口密集枚举的成本，但它奠定了后续 temporal grounding 的基本范式：候选片段、跨模态匹配、边界细化、Recall@<span class=\"kb-math kb-math-inline\">n</span>/IoU 评价。</p>\n<p>TALL 的历史意义很大。它把时序定位从封闭类别检测扩展到开放语言查询，并构建 Charades-STA 让该任务可复现实验。后续 MCN、2D-TAN、VSLNet、Moment-DETR、UniVTG 等方法都可以看作围绕三个问题继续推进：如何更好地生成/表示候选时刻，如何更强地对齐语言与视频，如何更准确地直接预测边界。</p>",
      "quiz": {
        "q": "TALL/CTRL 中边界回归头的主要作用是什么？",
        "options": [
          "把自然语言句子翻译成动作类别标签",
          "将粗粒度滑动窗口的起止时间修正到更贴近语言描述的真实片段",
          "生成视频的全局摘要",
          "替代视觉编码器提取 C3D 特征"
        ],
        "answer": 1,
        "explain": "CTRL 先用滑动窗口得到候选片段，再通过 temporal regression 输出起止偏移，弥补固定窗口粒度导致的边界不准问题。"
      }
    },
    {
      "id": "mcn",
      "num": 13,
      "name": "MCN",
      "fullName": "时刻上下文网络 (Moment Context Network)",
      "year": "2017",
      "org": "Adobe",
      "parent": "—",
      "paperUrl": "https://aclanthology.org/D18-1168/",
      "projectUrl": "",
      "category": "grounding",
      "motivation": "局部-全局上下文建模",
      "summary": "MCN 提出用共享视频-语言嵌入来检索自然语言描述对应的视频时刻，并把候选片段的局部视觉特征、整段视频的全局上下文和归一化时间端点联合编码，解决传统整段视频检索无法回答“发生在什么时候”的问题。",
      "keyPoints": [
        "<strong>Moment Context Network</strong>：将句子和候选视频时刻映射到同一嵌入空间，用距离度量完成时刻检索。",
        "<strong>局部-全局上下文特征</strong>：候选时刻内部的 local feature 表示“片段里发生什么”，整段视频的 global feature 表示“这个片段处在什么视频语境里”。",
        "<strong>Temporal Endpoint Feature (TEF)</strong>：用归一化起止位置编码时刻出现的相对时间，缓解“开头/结尾/再次发生”等时序线索缺失。",
        "<strong>双模态视觉输入</strong>：分别训练 RGB/appearance 与 optical flow/motion 分支，推理时可做 late fusion。",
        "<strong>inter-intra ranking loss</strong>：同时使用同视频内错误时刻和其他视频错误样本作为负例，使正确时刻与查询更近。",
        "<strong>DiDeMo 基准</strong>：原始 MCN 论文同时提出 Distinct Describable Moments 数据集，为自然语言视频时刻定位提供 4 万余条 localized descriptions。",
        "<strong>与输入 paper_url 的关系</strong>：给定 ACL 链接是 2018 年对 MCN/TALL 的统一扩展论文；其中 MCN 可视作只使用全局上下文的特例，本文主体仍按 2017 MCN 本体解读。"
      ],
      "detail": "<h5>核心框架图</h5>\n<p><img alt=\"MCN 模型架构图\" src=\"https://ar5iv.labs.arxiv.org/html/1708.01641/assets/x1.png\" />\n<em>图：MCN 将候选时刻的局部特征、整段视频的全局特征和时间端点特征组成 video temporal context features，再与 LSTM 语言特征投影到共享嵌入空间。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># MCN 训练/推理核心流程\ndef build_video_context(video, candidate):\n    local = mean_pool(cnn_features(video.frames[candidate.start:candidate.end]))\n    global_ctx = mean_pool(cnn_features(video.frames))\n    tef = [candidate.start / video.duration, candidate.end / video.duration]\n    return mlp(concat(local, global_ctx, tef))\n\ndef encode_query(sentence):\n    words = glove(sentence)\n    return mlp(lstm(words).last_state)\n\ndef train_mcn(batch, margin=0.1, lam=0.5):\n    loss = 0\n    for item in batch:\n        q = encode_query(item.sentence)\n        pos = build_video_context(item.video, item.gt_moment)\n        d_pos = squared_l2(q, pos)\n\n        for neg_moment in sample_wrong_moments(item.video, item.gt_moment):\n            d_neg = squared_l2(q, build_video_context(item.video, neg_moment))\n            loss += lam * max(0, margin + d_pos - d_neg)\n\n        for neg_video in sample_other_videos(batch, item.video):\n            d_neg = squared_l2(q, build_video_context(neg_video, item.gt_moment))\n            loss += (1 - lam) * max(0, margin + d_pos - d_neg)\n\n    return optimizer.step(loss)\n\ndef infer_mcn(video, sentence, candidates):\n    q = encode_query(sentence)\n    scored = [(squared_l2(q, build_video_context(video, c)), c) for c in candidates]\n    return min(scored, key=lambda x: x[0])[1]\n</code></pre>\n<h5>方法解读</h5>\n<p>MCN 的基本问题是：给定未裁剪视频 <span class=\"kb-math kb-math-inline\">v=\\{v_t\\}_{t=0}^{T-1}</span> 和自然语言描述 <span class=\"kb-math kb-math-inline\">s</span>，从一组候选时间段 <span class=\"kb-math kb-math-inline\">\\tau</span> 中找出最匹配的片段。它不直接回归连续边界，而是把定位写成候选检索：</p>\n<div class=\"kb-math kb-math-display\">\\hat{\\tau}=\\operatorname*{arg\\,min}_{\\tau}D_{\\theta}(s,v,\\tau)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">D_{\\theta}</span> 是句子嵌入和候选时刻嵌入之间的距离。这个设计在早期非常务实：只要候选集合覆盖目标片段，就可以把复杂的视频定位问题转成跨模态排序问题，训练目标也能直接围绕“正确时刻比错误时刻更近”展开。</p>\n<p>MCN 的关键不是简单地池化候选片段，而是构造 <strong>visual temporal context features</strong>。候选片段的局部特征 <span class=\"kb-math kb-math-inline\">g(v,\\tau)</span> 捕捉片段内的动作、物体和场景；全局特征 <span class=\"kb-math kb-math-inline\">g(v)</span> 提供整段视频的背景；TEF 则记录候选片段在视频中的相对起止点：</p>\n<div class=\"kb-math kb-math-display\">\\phi_V(v,\\tau)=\\operatorname{MLP}\\left([g(v,\\tau);g(v);\\tau^{(s)}/T;\\tau^{(e)}/T]\\right)</div>\n<p>这个局部-全局组合解决了一个常见歧义：同一个动作可能在视频中多次出现，仅看局部片段很难判断“第一次”“最后”“开始时”等查询；加入全局上下文和端点后，模型能把相同视觉内容放回完整视频顺序中理解。</p>\n<p>语言侧使用词向量和 LSTM 编码查询，再投影到与视频同维度的空间：</p>\n<div class=\"kb-math kb-math-display\">\\phi_L(s)=\\operatorname{MLP}(\\operatorname{LSTM}(\\operatorname{GloVe}(s)))</div>\n<p>视频和语言之间通常使用平方欧氏距离：</p>\n<div class=\"kb-math kb-math-display\">D_{\\theta}(s,v,\\tau)=\\|\\phi_L(s)-\\phi_V(v,\\tau)\\|_2^2</div>\n<p>直觉上，MCN 学到的是一个“可比较空间”：描述“一只猫从盒子里走出来”的文本向量，应该靠近包含该动作的候选时刻，远离同视频其他片段以及其他视频中的片段。</p>\n<p>训练采用排序损失，而不是对每个候选做独立二分类。给定正样本距离 <span class=\"kb-math kb-math-inline\">D^+</span> 和负样本距离 <span class=\"kb-math kb-math-inline\">D^-</span>，基础 hinge ranking loss 为：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}^R(D^+,D^-)=\\max(0,\\Delta + D^+ - D^-)</div>\n<p>MCN 同时构造 intra-video negative 和 inter-video negative。前者来自同一视频的错误时刻，迫使模型学会精细区分同一视频内部的不同片段；后者来自其他视频，帮助模型学习粗粒度语义差异。整体损失可写为：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}(\\theta)=\\lambda\\sum_i\\mathcal{L}^{intra}_i(\\theta)+(1-\\lambda)\\sum_i\\mathcal{L}^{inter}_i(\\theta)</div>\n<p>这种负样本设计是 MCN 的工程价值所在：只用跨视频负例会让模型学会“视频级检索”，但仍可能在同一视频内定位失败；只用同视频负例又可能削弱泛化。二者结合，才贴合 moment localization 的真实目标。</p>\n<p>输入给出的 ACL 2018 论文把 MCN 与 TALL 统一到 latent context 框架中：</p>\n<div class=\"kb-math kb-math-display\">s_{\\phi}(v,q,\\tau)=\\max_{\\tau&#x27;\\in T_{\\tau}}f_{\\mathcal{S}}\\left(f_{\\mathcal{V}}(v,\\tau,\\tau&#x27;),f_{\\mathcal{L}}(q)\\right)</div>\n<p>在这个统一视角里，MCN 相当于固定使用全局视频作为上下文；后续 MLLC 则把上下文时刻 <span class=\"kb-math kb-math-inline\">\\tau&#x27;</span> 作为隐变量搜索。这说明 MCN 的“全局上下文”思想是后续 temporal language grounding 的出发点，但 MCN 自身仍是候选检索式、非端到端边界预测模型。</p>\n<div class=\"key-point\">💡 关键：MCN 的贡献不是复杂网络结构，而是把 moment grounding 早期最缺的三件事放到一起：可训练的数据集、局部-全局上下文表示、面向定位的排序学习目标。</div>",
      "quiz": {
        "q": "MCN 中 Temporal Endpoint Feature 的主要作用是什么？",
        "options": [
          "替代 RGB 和光流特征，直接表示视频内容",
          "编码候选时刻在视频中的归一化起止位置，帮助理解时序位置线索",
          "生成更多候选片段以提升召回率",
          "把自然语言查询翻译成动作类别标签"
        ],
        "answer": 1,
        "explain": "TEF 记录候选片段的相对开始和结束位置，使模型能利用开头、结尾、先后顺序等语言线索，而不是只依赖局部视觉内容。"
      }
    },
    {
      "id": "2dtan",
      "num": 14,
      "name": "2D-TAN",
      "fullName": "二维时序网络 (2D Temporal Adjacent Networks)",
      "year": "2020",
      "org": "PKU",
      "parent": "tall",
      "paperUrl": "https://ojs.aaai.org/index.php/AAAI/article/view/6984",
      "projectUrl": "",
      "category": "grounding",
      "motivation": "二维网络建模时刻关系",
      "summary": "2D-TAN 提出将所有候选时刻组织为二维时序特征图（行列分别表示起止时刻），并利用二维卷积网络建模相邻候选时刻之间的时序依赖关系，从而在自然语言视频时刻定位（Moment Localization）任务上实现了高效且准确的检索。",
      "keyPoints": [
        "<strong>二维时序特征图（2D Temporal Map）</strong>：将所有 <span class=\"kb-math kb-math-inline\">(i, j)</span> 起止组合排列为上三角矩阵，每个位置对应一个候选时刻，天然编码了时刻之间的邻接关系",
        "<strong>稀疏采样策略（Sparse Sampling）</strong>：仅在固定间隔处采样候选时刻，减少约 50% 冗余候选而不损失性能",
        "<strong>多模态融合</strong>：采用简单的 Hadamard 乘积将语言特征与视频时刻特征融合，无需复杂注意力机制",
        "<strong>二维卷积上下文建模</strong>：在融合后的 2D 特征图上堆叠多层卷积，使每个候选时刻能感知其时序邻居的信息",
        "<strong>Scaled IoU 监督</strong>：将 IoU 通过双阈值线性缩放为连续标签，配合 BCE 损失训练，比硬二值标签更平滑",
        "<strong>三大基准数据集验证</strong>：在 Charades-STA、ActivityNet Captions、TACoS 上均达到当时最优或可比性能"
      ],
      "detail": "<h5>核心框架图</h5>\n<p><img alt=\"2D-TAN 框架总览\" src=\"https://ar5iv.labs.arxiv.org/html/1912.03590v2/assets/x2.png\" />\n<em>图：2D-TAN 整体框架。视频被切分为 N 个片段并提取特征，所有起止组合构成 2D 时序特征图；语言查询经 LSTM 编码后与视频特征逐元素相乘融合；融合后的 2D 图经多层卷积建模邻接关系，最终输出每个候选时刻的匹配分数。</em></p>\n<p><img alt=\"1D 与 2D 时序图对比\" src=\"https://ar5iv.labs.arxiv.org/html/1912.03590v2/assets/x1.png\" />\n<em>图：传统方法将候选时刻排成一维序列独立评分（左），2D-TAN 将其组织为二维矩阵（右），使相邻时刻在空间上也相邻，便于卷积建模上下文。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># 2D-TAN 核心流程伪代码\ndef TwoDTAN(video_clips, query_sentence):\n    # Step 1: 语言编码\n    word_embs = GloVe(query_sentence)           # [l_S, d_S]\n    f_S = LSTM_3layer(word_embs)                 # [d_S], 取最后隐状态\n\n    # Step 2: 视频片段特征提取\n    clip_feats = []\n    for clip in sample_N_clips(video_clips, N):\n        feat = pretrained_CNN(clip)              # VGG / C3D\n        feat = FC(feat, d_V)                     # 降维到 d_V\n        clip_feats.append(feat)                  # [N, d_V]\n\n    # Step 3: 构建 2D 时序特征图 (上三角有效)\n    map_2d = zeros(N, N, d_V)\n    for i in range(N):\n        for j in range(i, N):                    # 仅上三角: 起始 &lt;= 结束\n            map_2d[i, j] = max_pool(clip_feats[i:j+1])\n\n    # Step 4: 多模态融合 (Hadamard 乘积)\n    f_S_expanded = f_S.expand(N, N, d_V)         # 广播到 2D 图尺寸\n    fused_map = map_2d * f_S_expanded            # 逐元素相乘\n\n    # Step 5: 2D 卷积上下文建模\n    for layer in Conv2D_layers(L_layers, kernel=K):\n        fused_map = ReLU(layer(fused_map))\n\n    # Step 6: 预测匹配分数\n    scores = FC(fused_map, 1).sigmoid()          # 每个 (i,j) 一个分数\n\n    # 推理时: NMS 后取 top-n\n    return NMS(scores, threshold=0.5)\n</code></pre>\n<h5>方法详解</h5>\n<p><strong>动机与背景</strong></p>\n<p>自然语言视频时刻定位（Moment Localization with Natural Language）的目标是：给定一段未裁剪视频和一句自然语言查询，检索出视频中与查询语义匹配的时间片段。此前的方法主要有两类思路：</p>\n<ol>\n<li><strong>滑动窗口方法</strong>（如 MCN、CTRL）：预先生成大量候选时刻，逐一与查询匹配打分。这类方法将每个候选独立评估，忽略了候选之间的时序关系。</li>\n<li><strong>序列化方法</strong>（如 TGN）：用 RNN 沿时间轴逐步预测边界，但一维序列难以同时捕捉不同尺度的时序依赖。</li>\n</ol>\n<div class=\"key-point\">💡 <strong>关键洞察</strong>：相邻的候选时刻（例如 \"第 2-5 秒\" 和 \"第 3-6 秒\"）在语义上高度相关。如果一个候选是正确答案，其邻近候选的分数也应较高。传统方法独立评分无法利用这种结构化先验。</div>\n<p><strong>核心机制：二维时序特征图</strong></p>\n<p>2D-TAN 的核心创新在于将所有候选时刻组织为一个二维矩阵。具体地，将视频均匀采样为 <span class=\"kb-math kb-math-inline\">N</span> 个片段后，任意一个候选时刻可以用起始片段索引 <span class=\"kb-math kb-math-inline\">i</span> 和结束片段索引 <span class=\"kb-math kb-math-inline\">j</span>（<span class=\"kb-math kb-math-inline\">i \\leq j</span>）来表示。这样，所有 <span class=\"kb-math kb-math-inline\">\\frac{N(N+1)}{2}</span> 个有效候选恰好填充一个 <span class=\"kb-math kb-math-inline\">N \\times N</span> 上三角矩阵。</p>\n<p>每个位置 <span class=\"kb-math kb-math-inline\">(i, j)</span> 的特征通过对第 <span class=\"kb-math kb-math-inline\">i</span> 到第 <span class=\"kb-math kb-math-inline\">j</span> 个片段特征做 max-pooling 得到：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{f}_{i,j}^{M} = \\text{maxpool}(\\mathbf{f}_i^V, \\mathbf{f}_{i+1}^V, \\ldots, \\mathbf{f}_j^V)</div>\n<p>这种设计的精妙之处在于：<strong>在 2D 图上空间相邻的位置，对应的时间段也是时序相邻的</strong>。例如 <span class=\"kb-math kb-math-inline\">(i, j)</span> 的右邻 <span class=\"kb-math kb-math-inline\">(i, j+1)</span> 表示结束时刻后移一步，下邻 <span class=\"kb-math kb-math-inline\">(i+1, j)</span> 表示起始时刻后移一步。这使得标准的 2D 卷积可以自然地建模时序邻接关系。</p>\n<p><strong>多模态融合</strong></p>\n<p>语言查询经 GloVe 词嵌入后送入三层 LSTM，取最后一个隐状态作为句子表示 <span class=\"kb-math kb-math-inline\">\\mathbf{f}^S \\in \\mathbb{R}^{d_S}</span>。融合采用简单的 Hadamard 乘积（逐元素相乘）：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{F}_{i,j} = \\mathbf{f}^S \\odot \\mathbf{f}_{i,j}^M</div>\n<p>论文在消融实验中对比了三种融合方式：拼接（Concatenation）、逐元素加法（Addition）和 Hadamard 乘积，发现 <strong>Hadamard 乘积效果最好</strong>。直觉上，乘法融合相当于让语言特征对视频特征的每个维度进行\"门控\"，能更精确地筛选与查询相关的视觉信息。</p>\n<p><strong>二维卷积上下文建模</strong></p>\n<p>融合后的 2D 特征图经过 <span class=\"kb-math kb-math-inline\">L</span> 层卷积（kernel size 为 <span class=\"kb-math kb-math-inline\">K</span>），每层后接 ReLU 激活：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{F}^{(l+1)} = \\text{ReLU}(\\text{Conv2D}(\\mathbf{F}^{(l)}))</div>\n<p>随着层数增加，每个位置的感受野逐渐扩大，能够感知更远的时序邻居。消融实验表明：<strong>感受野大小是性能的关键因素</strong>——当 kernel=1（无邻居信息）时退化为独立评分，性能与 CTRL 相当；增大感受野后性能显著提升，但饱和后继续增大收益有限。</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：在固定感受野大小的前提下，改变层数和 kernel size 的具体组合对性能影响有限，说明关键在于感受野覆盖范围而非网络深度本身。</div>\n<p><strong>稀疏采样策略</strong></p>\n<p>完整的 2D 图包含 <span class=\"kb-math kb-math-inline\">\\frac{N(N+1)}{2}</span> 个候选，其中存在大量高度重叠的冗余候选。2D-TAN 提出稀疏采样：仅保留起止索引间隔为固定步长倍数的候选，可减少约 50% 的计算量。实验表明稀疏采样与密集枚举性能相当。</p>\n<p><strong>训练：Scaled IoU 监督</strong></p>\n<p>传统方法用硬阈值将候选标记为正/负样本。2D-TAN 采用更平滑的 Scaled IoU 作为连续标签：</p>\n<div class=\"kb-math kb-math-display\">y_i = \\begin{cases} 0 &amp; \\text{IoU}_i \\leq t_{min} \\\\ \\frac{\\text{IoU}_i - t_{min}}{t_{max} - t_{min}} &amp; t_{min} &lt; \\text{IoU}_i &lt; t_{max} \\\\ 1 &amp; \\text{IoU}_i \\geq t_{max} \\end{cases}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">t_{min}</span> 和 <span class=\"kb-math kb-math-inline\">t_{max}</span> 为缩放阈值（Charades-STA 和 ActivityNet 上设为 0.5/1.0，TACoS 上设为 0.3/0.7）。训练损失为标准 BCE：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L} = \\frac{1}{C} \\sum_{i=1}^{C} y_i \\log p_i + (1 - y_i) \\log(1 - p_i)</div>\n<p>这种设计让模型学会区分\"高度匹配\"和\"部分匹配\"的候选，而非简单的二分类。</p>\n<p><strong>推理流程</strong></p>\n<p>推理时，对 2D 图中所有有效位置的预测分数应用非极大值抑制（NMS，阈值 0.5），取 top-n 作为最终检索结果。</p>\n<p><strong>与传统方法的对比</strong></p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>滑动窗口方法 (CTRL等)</th>\n<th>RNN方法 (TGN等)</th>\n<th><strong>2D-TAN</strong></th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>候选组织方式</td>\n<td>一维列表</td>\n<td>序列化</td>\n<td><strong>二维矩阵</strong></td>\n</tr>\n<tr>\n<td>候选间关系建模</td>\n<td>❌ 独立评分</td>\n<td>部分（单向）</td>\n<td>✅ 2D卷积全局建模</td>\n</tr>\n<tr>\n<td>多尺度覆盖</td>\n<td>需多尺度窗口</td>\n<td>隐式</td>\n<td><strong>天然覆盖所有尺度</strong></td>\n</tr>\n<tr>\n<td>计算效率</td>\n<td>候选数多</td>\n<td>序列瓶颈</td>\n<td><strong>稀疏采样 + 并行卷积</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>实验结果亮点</strong></p>\n<ul>\n<li>在 Charades-STA 上 Rank1@0.7 达到 <strong>23.31%</strong>，大幅超越此前最优 MAN 的 20.54%</li>\n<li>在 ActivityNet Captions 上 Rank1@0.5 达到 <strong>44.51%</strong>，超越 CMIN 的 43.40%</li>\n<li>仅用 136 个候选（N=16）即可达到 CMIN（1400 个候选）的可比性能，验证了上下文建模的有效性</li>\n</ul>",
      "quiz": {
        "q": "2D-TAN 中二维时序特征图的位置 (i, j) 代表什么含义？",
        "options": [
          "第 i 帧和第 j 帧的视觉相似度",
          "从第 i 个片段到第 j 个片段的候选时刻特征",
          "第 i 个词和第 j 个视频片段的跨模态注意力权重",
          "视频第 i 秒到第 j 秒的光流特征"
        ],
        "answer": 1,
        "explain": "2D 时序图的每个上三角位置 (i, j) 对应一个从第 i 个视频片段到第 j 个片段的候选时刻，其特征由对应片段特征的 max-pooling 得到。"
      }
    },
    {
      "id": "vslnet",
      "num": 15,
      "name": "VSLNet",
      "fullName": "视频跨度网络 (Video Span Localizing Network)",
      "year": "2020",
      "org": "NTU",
      "parent": "tall",
      "paperUrl": "https://aclanthology.org/2020.acl-main.585/",
      "projectUrl": "",
      "category": "grounding",
      "motivation": "跨度预测与查询高亮机制",
      "summary": "VSLNet 将自然语言视频定位重写为类似机器阅读理解的 span prediction 问题，直接预测查询对应片段的开始和结束位置，并用 Query-Guided Highlighting 先突出与查询相关的视频帧来缓解视频背景噪声。",
      "keyPoints": [
        "<strong>Span-based QA 形式化</strong>：把未裁剪视频看作 passage，把自然语言查询看作 question，把目标时刻看作 answer span。",
        "<strong>VSLBase 主干</strong>：由特征编码器、Context-Query Attention 和 conditioned span predictor 构成，避免显式滑窗提案。",
        "<strong>共享 Feature Encoder</strong>：视频片段特征和词嵌入分别投影到同维度后，使用由卷积、多头自注意力和前馈层组成的 QANet 风格编码器。",
        "<strong>跨模态注意力</strong>：用 context-to-query 与 query-to-context attention 建模每个视频位置和查询词之间的匹配关系。",
        "<strong>Conditioned Span Predictor</strong>：先预测 start 分布，再用第二个单向 LSTM 在 start 隐状态条件下预测 end 分布。",
        "<strong>Query-Guided Highlighting (QGH)</strong>：把目标时刻及其前后扩展区域标为 foreground，学习 clip-wise 高亮分数并重加权视频特征。",
        "<strong>训练目标</strong>：总损失为边界交叉熵 <span class=\"kb-math kb-math-inline\">L_{span}</span> 与高亮二分类损失 <span class=\"kb-math kb-math-inline\">L_{QGH}</span> 之和。"
      ],
      "detail": "<h5>核心框架图</h5>\n<p><img alt=\"VSLNet 框架总览\" src=\"https://raw.githubusercontent.com/26hzhang/VSLNet/master/figures/overview.jpg\" />\n<em>图：VSLNet 在 VSLBase 的 span prediction 主干上增加 Query-Guided Highlighting，使模型先突出与查询相关的视频区域，再预测答案跨度边界。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># VSLNet 核心流程伪代码\ndef vslnet(video_features, query_tokens, gt_start=None, gt_end=None):\n    V0 = linear_video(video_features)       # [n, d]\n    Q0 = linear_text(glove(query_tokens))   # [m, d]\n\n    Ve = feature_encoder(V0)                # conv + multi-head attention + FFN\n    Qe = feature_encoder(Q0)                # 与视频侧共享编码器参数\n\n    S = trilinear_similarity(Ve, Qe)        # [n, m]\n    A = softmax(S, dim=&quot;query&quot;) @ Qe        # context-to-query\n    B = softmax(S, dim=&quot;query&quot;) @ softmax(S, dim=&quot;video&quot;).T @ Ve\n    Vq = ffn(concat(Ve, A, Ve * A, Ve * B))\n\n    hQ = self_attention_pool(Qe)\n    V_bar = concat_each_timestep(Vq, hQ)\n    Sh = sigmoid(conv1d(V_bar))             # query-guided highlighting score\n    V_tilde = Sh[:, None] * V_bar\n\n    Hs = unilstm_start(V_tilde)\n    He = unilstm_end(Hs)\n    Ps = softmax(ffn_start(concat(Hs, V_tilde)))\n    Pe = softmax(ffn_end(concat(He, V_tilde)))\n\n    if gt_start is not None:\n        loss_span = 0.5 * (cross_entropy(Ps, gt_start) + cross_entropy(Pe, gt_end))\n        loss_qgh = binary_cross_entropy(Sh, build_highlight_labels(gt_start, gt_end))\n        return loss_span + loss_qgh\n\n    best = None\n    for i in range(len(Ps)):\n        for j in range(i, len(Pe)):\n            score = Ps[i] * Pe[j]\n            best = max(best, (score, i, j), key=lambda x: x[0]) if best else (score, i, j)\n    return best[1], best[2]\n</code></pre>\n<h5>方法解读</h5>\n<p>VSLNet 的出发点是对滑窗/提案式方法的反思。早期 TALL/MCN 系列通常先枚举候选片段，再对每个候选做文本匹配，这会带来大量冗余候选，并且边界精度受候选生成策略限制。VSLNet 把问题改写为：</p>\n<div class=\"kb-math kb-math-display\">V=\\{f_t\\}_{t=1}^{n},\\quad Q=\\{q_j\\}_{j=1}^{m},\\quad \\text{output }(\\tau^s,\\tau^e)</div>\n<p>也就是在视频片段序列上直接找一个答案跨度。这个视角借鉴了 SQuAD 式抽取问答：文本 passage 中答案是连续 token span，视频中答案则是连续 clip span。区别在于，视频的背景片段多、语义变化慢、噪声高，因此需要专门的高亮机制辅助。</p>\n<p>在特征编码阶段，视频特征和查询词向量先投影到同一维度，再通过共享 Feature Encoder：</p>\n<div class=\"kb-math kb-math-display\">V_e=\\operatorname{FeatureEncoder}(V_0),\\quad Q_e=\\operatorname{FeatureEncoder}(Q_0)</div>\n<p>该编码器是简化版 QANet embedding encoder，包含卷积层、多头自注意力、前馈层、残差连接和 LayerNorm。卷积负责局部上下文，自注意力负责长程依赖；视频和语言共享参数则让二者在后续注意力计算前进入更可比较的表示空间。</p>\n<p>跨模态交互使用 Context-Query Attention。先计算视频位置 <span class=\"kb-math kb-math-inline\">i</span> 与查询词 <span class=\"kb-math kb-math-inline\">j</span> 的相似度矩阵 <span class=\"kb-math kb-math-inline\">S\\in\\mathbb{R}^{n\\times m}</span>，再得到 context-to-query 注意力 <span class=\"kb-math kb-math-inline\">A</span> 和 query-to-context 注意力 <span class=\"kb-math kb-math-inline\">B</span>：</p>\n<div class=\"kb-math kb-math-display\">A=S_r Q_e,\\quad B=S_r S_c^\\top V_e</div>\n<p>最终每个视频位置的 query-aware 表示为：</p>\n<div class=\"kb-math kb-math-display\">V_q=\\operatorname{FFN}\\left([V_e;A;V_e\\odot A;V_e\\odot B]\\right)</div>\n<p>这里的拼接不仅保留原始视频上下文，还显式加入查询聚合表示与乘性交互项，使模型能判断某个 clip 是否与查询词中的动作、对象和关系匹配。</p>\n<p>Conditioned Span Predictor 是 VSLBase 的边界预测头。它先用单向 LSTM 读取 <span class=\"kb-math kb-math-inline\">V_q</span> 得到 start 隐状态，再把 start 隐状态送入 end LSTM，让 end 预测条件化于 start：</p>\n<div class=\"kb-math kb-math-display\">h_t^s=\\operatorname{UniLSTM}_{start}(v_t^q,h_{t-1}^s),\\quad\nh_t^e=\\operatorname{UniLSTM}_{end}(h_t^s,h_{t-1}^e)</div>\n<p>对应边界分布为：</p>\n<div class=\"kb-math kb-math-display\">P_s=\\operatorname{SoftMax}(S^s),\\quad P_e=\\operatorname{SoftMax}(S^e)</div>\n<p>训练时使用交叉熵：</p>\n<div class=\"kb-math kb-math-display\">L_{span}=\\frac{1}{2}\\left[f_{CE}(P_s,Y_s)+f_{CE}(P_e,Y_e)\\right]</div>\n<p>推理时枚举所有合法 <span class=\"kb-math kb-math-inline\">0\\leq \\hat{a}^s\\leq \\hat{a}^e\\leq n</span> 的跨度，最大化联合概率：</p>\n<div class=\"kb-math kb-math-display\">(\\hat{a}^s,\\hat{a}^e)=\\operatorname*{arg\\,max}_{\\hat{a}^s,\\hat{a}^e}P_s(\\hat{a}^s)P_e(\\hat{a}^e)</div>\n<p>VSLNet 在 VSLBase 上加入 QGH。QGH 把目标时刻视作 foreground，并按超参数 <span class=\"kb-math kb-math-inline\">\\alpha</span> 向前后扩展，覆盖 antecedent/consequent context。它先把查询编码为句子向量 <span class=\"kb-math kb-math-inline\">h_Q</span>，与每个 <span class=\"kb-math kb-math-inline\">v_i^q</span> 拼接成 <span class=\"kb-math kb-math-inline\">\\bar{v}_i^q=[v_i^q;h_Q]</span>，再通过一维卷积和 Sigmoid 得到高亮分数：</p>\n<div class=\"kb-math kb-math-display\">S_h=\\sigma(\\operatorname{Conv1D}(\\bar{V}^{q})),\\quad \\widetilde{V}^{q}=S_h\\cdot\\bar{V}^{q}</div>\n<p>这个分数不是最终答案，而是一个软门控：背景 clip 的特征被压低，查询相关片段及其附近上下文被放大。随后 span predictor 使用 <span class=\"kb-math kb-math-inline\">\\widetilde{V}^{q}</span> 替代 <span class=\"kb-math kb-math-inline\">V_q</span>，因此边界预测建立在更干净的视频序列上。</p>\n<p>总损失为：</p>\n<div class=\"kb-math kb-math-display\">L=L_{span}+L_{QGH},\\quad L_{QGH}=f_{CE}(S_h,Y_h)</div>\n<p>VSLNet 的优势是把“候选评分”变成“边界抽取”，减少候选设计带来的工程偏差；QGH 则补上了视频任务相对文本 QA 的关键差异，即视频中大部分片段是背景且相邻片段高度相似。它仍是单跨度预测模型，因此面对一个查询对应多个不连续时刻的场景时表达力有限，这也是后来 Moment-DETR 这类集合预测模型继续推进的原因。</p>\n<div class=\"key-point\">💡 关键：VSLNet 的跨度预测提升了端到端程度，QGH 则让模型先学会“哪里值得看”，再判断“从哪里开始、到哪里结束”。</div>",
      "quiz": {
        "q": "VSLNet 中 Query-Guided Highlighting 的直接作用是什么？",
        "options": [
          "生成固定长度滑动窗口候选",
          "预测每个视频位置属于查询相关前景的概率，并用该分数重加权视频特征",
          "把自然语言查询压缩成单个类别标签",
          "用非极大值抑制过滤重叠候选"
        ],
        "answer": 1,
        "explain": "QGH 通过 Conv1D+Sigmoid 得到 clip-wise 高亮分数，将查询相关的前景片段放大、背景片段压低，再交给 span predictor 预测起止边界。"
      }
    },
    {
      "id": "moment_detr",
      "num": 16,
      "name": "Moment-DETR",
      "fullName": "时刻检测Transformer (Moment Detection Transformer)",
      "year": "2021",
      "org": "UNC",
      "parent": "vslnet",
      "paperUrl": "https://proceedings.neurips.cc/paper/2021/hash/62e0973455fd26eb03e91d5741a4a3bb-Abstract.html",
      "projectUrl": "",
      "category": "grounding",
      "motivation": "端到端Transformer定位",
      "summary": "Moment-DETR 将自然语言视频时刻定位建模为 DETR 式集合预测问题，用 Transformer encoder-decoder 直接输出一个或多个时刻坐标及逐 clip saliency 分数，从而去掉提案生成和 NMS 等手工流程。",
      "keyPoints": [
        "<strong>端到端集合预测</strong>：使用固定数量的 learnable moment queries，一次性预测多个候选时刻和前景/背景类别。",
        "<strong>视频-文本联合 Transformer 编码</strong>：把 SlowFast/CLIP 视频特征与 CLIP 文本 token 特征投影到同一维度后拼接输入 encoder。",
        "<strong>DETR 风格 decoder</strong>：moment queries 通过自注意力和 cross-attention 从编码后的多模态序列中抽取定位信息。",
        "<strong>三类预测头</strong>：encoder 输出预测 clip-wise saliency；decoder 输出 foreground/background 分类与归一化中心点/宽度坐标。",
        "<strong>Hungarian matching</strong>：训练时用二分图匹配将预测集合和真实时刻集合对齐，避免人为指定第几个 query 对应哪个 GT。",
        "<strong>复合定位损失</strong>：moment 坐标同时使用 L1 loss 和 1D generalized IoU loss。",
        "<strong>QVHighlights 数据集</strong>：支持一个查询对应多个不连续时刻，并提供查询相关 highlight 标注。",
        "<strong>ASR 弱监督预训练</strong>：使用 YouTube ASR caption-timestamp pairs 预训练，缓解端到端 Transformer 对数据量的需求。"
      ],
      "detail": "<h5>核心框架图</h5>\n<p><img alt=\"Moment-DETR 模型总览\" src=\"https://raw.githubusercontent.com/jayleicn/moment_detr/main/res/model_overview.png\" />\n<em>图：Moment-DETR 使用 Transformer encoder-decoder、learnable moment queries，以及 saliency、foreground/background、moment coordinates 三个预测头。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># Moment-DETR 核心训练流程\ndef moment_detr_forward(video_clips, text_query):\n    Ev = concat(normalize(slowfast(video_clips)), normalize(clip_video(video_clips)))\n    Eq = clip_text_tokens(text_query)\n\n    Pv = mlp_project_video(Ev)       # [Lv, d]\n    Pq = mlp_project_text(Eq)        # [Lq, d]\n    E_input = concat_along_time(Pv, Pq)\n\n    E_enc = transformer_encoder(E_input + positional_encoding(E_input))\n    video_enc = E_enc[:len(video_clips)]\n    saliency = linear_saliency(video_enc)        # [Lv]\n\n    moment_queries = learned_embeddings(N)       # [N, d]\n    E_dec = transformer_decoder(moment_queries, E_enc)\n    cls_logits = linear_fg_bg(E_dec)             # [N, 2]\n    moments = sigmoid(ffn_moment(E_dec))         # [N, 2], center + width\n    return cls_logits, moments, saliency\n\ndef train_step(video, query, gt_moments, gt_saliency):\n    cls_logits, pred_moments, saliency = moment_detr_forward(video, query)\n\n    # Hungarian matching: each GT is assigned to one prediction slot.\n    cost = classification_cost(cls_logits, gt_moments) + moment_cost(pred_moments, gt_moments)\n    assignment = hungarian_match(cost)\n\n    loss_cls = cross_entropy_for_matched_and_background(cls_logits, assignment)\n    loss_loc = l1_loss(pred_moments, gt_moments, assignment)\n    loss_iou = generalized_temporal_iou_loss(pred_moments, gt_moments, assignment)\n    loss_sal = pairwise_saliency_hinge(saliency, gt_saliency, gt_moments)\n    return loss_cls + lambda_l1 * loss_loc + lambda_iou * loss_iou + lambda_sal * loss_sal\n</code></pre>\n<h5>方法解读</h5>\n<p>Moment-DETR 解决的是 VSLNet 之后仍然存在的两个问题：一是很多真实查询可能对应多个分离的相关片段，单一 span 不够；二是提案生成、NMS、窗口长度等手工组件会把定位性能绑定到启发式设计。Moment-DETR 借鉴 DETR，把时刻定位写成集合预测：</p>\n<div class=\"kb-math kb-math-display\">\\hat{Y}=\\{(\\hat{c}_i,\\hat{m}_i)\\}_{i=1}^{N},\\quad \\hat{m}_i=(\\hat{c}^{time}_i,\\hat{w}_i)\\in[0,1]^2</div>\n<p>这里 <span class=\"kb-math kb-math-inline\">N</span> 是固定数量的 moment queries，每个 query 输出一个 foreground/background 标签和一个归一化时刻坐标。背景类表示这个 query 没有匹配到真实时刻，因此模型可以自然处理“真实时刻数量小于 query 数量”的情况。</p>\n<p>输入表示上，视频用 SlowFast 与 CLIP video encoder 提取每 2 秒一个 clip 的特征，文本用 CLIP text encoder 提取 token-level 特征。二者分别经 MLP 投影到共同维度 <span class=\"kb-math kb-math-inline\">d</span>，再沿长度维拼接：</p>\n<div class=\"kb-math kb-math-display\">E_{input}=[P_v(E_v);P_q(E_q)]\\in\\mathbb{R}^{(L_v+L_q)\\times d}</div>\n<p>Transformer encoder 对这个联合序列做自注意力，因而视频 clip 可以直接关注查询 token，查询 token 也能回看视频上下文。相比先独立编码再匹配的两塔式方法，这种单流编码更适合捕捉“某个动作在某个对象出现之后”的跨模态关系。</p>\n<p>Decoder 的输入不是文本查询，而是一组可学习的 <strong>moment queries</strong>。每个 query 经过 decoder self-attention 与 encoder cross-attention 后，学习成为一个“时刻槽位”。这些槽位没有人为语义标签，但训练后会分化：有的偏向短片段，有的偏向视频开头或结尾，有的偏向长跨度。这种槽位分化来自 Hungarian matching 和集合损失，而不是预设 anchors。</p>\n<p>匹配阶段定义预测集合 <span class=\"kb-math kb-math-inline\">\\hat{y}</span> 和带背景 padding 的真实集合 <span class=\"kb-math kb-math-inline\">y</span>，用 Hungarian algorithm 找最小成本排列：</p>\n<div class=\"kb-math kb-math-display\">\\hat{\\sigma}=\\operatorname*{arg\\,min}_{\\sigma\\in\\mathfrak{S}_N}\\sum_i^N \\mathcal{C}_{match}(y_i,\\hat{y}_{\\sigma(i)})</div>\n<p>匹配成本包含前景分类概率和时刻坐标误差：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{C}_{match}(y_i,\\hat{y}_{\\sigma(i)})=-\\mathbb{1}_{\\{c_i\\neq\\varnothing\\}}\\hat{p}_{\\sigma(i)}(c_i)+\\mathbb{1}_{\\{c_i\\neq\\varnothing\\}}\\mathcal{L}_{moment}(m_i,\\hat{m}_{\\sigma(i)})</div>\n<p>背景 padding 不参与坐标匹配，避免模型被不存在的时刻约束。匹配完成后，每个真实时刻只监督一个预测槽位，其余槽位学习为 background，这就是去掉 NMS 的关键。</p>\n<p>定位损失由 L1 和 1D generalized IoU 组成：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{moment}(m_i,\\hat{m}_{\\hat{\\sigma}(i)})=\\lambda_{L1}\\|m_i-\\hat{m}_{\\hat{\\sigma}(i)}\\|_1+\\lambda_{iou}\\mathcal{L}_{iou}(m_i,\\hat{m}_{\\hat{\\sigma}(i)})</div>\n<p>L1 提供坐标回归的直接梯度，IoU 项关注时间段重叠质量。由于时刻是 1D 区间，IoU 损失使用 temporal IoU 的形式，而不是 2D box IoU。</p>\n<p>Moment-DETR 还把 highlight detection 合入同一模型。encoder 的视频 clip 输出通过线性层得到 saliency score <span class=\"kb-math kb-math-inline\">S\\in\\mathbb{R}^{L_v}</span>。saliency loss 使用成对 hinge 约束：相关片段内部高分 clip 应高于低分 clip，真实时刻内部 clip 应高于外部 clip：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{saliency}(S)=\\max(0,\\Delta+S(t_{low})-S(t_{high}))+\\max(0,\\Delta+S(t_{out})-S(t_{in}))</div>\n<p>最终目标为：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}=\\lambda_{saliency}\\mathcal{L}_{saliency}(S)+\\sum_{i=1}^{N}\\left[-\\lambda_{cls}\\log\\hat{p}_{\\hat{\\sigma}(i)}(c_i)+\\mathbb{1}_{\\{c_i\\neq\\varnothing\\}}\\mathcal{L}_{moment}(m_i,\\hat{m}_{\\hat{\\sigma}(i)})\\right]</div>\n<p>这个联合目标让模型同时学“哪里是相关时刻”和“相关时刻内部哪些 clip 更适合当 highlight”。论文消融显示去掉 saliency loss 不仅影响 highlight，也会影响 moment retrieval，说明 clip-level 查询相关性监督会反过来改善时刻定位。</p>\n<p>Moment-DETR 的代价是数据需求更高。论文因此引入 ASR 弱监督预训练：从 YouTube ASR caption 中取 caption 作为查询、timestamp 作为弱标签，使用同一架构预训练。由于 ASR 没有人工 saliency 标注，预训练时移除 saliency loss 中依赖高低 saliency 标注的部分。这个策略体现了端到端 Transformer 的典型取舍：架构更少先验、更统一，但需要更多弱监督或大规模数据来学到可靠定位偏好。</p>\n<div class=\"key-point\">💡 关键：Moment-DETR 的本质转变是从“给候选片段打分”转到“直接预测一组时刻”，用 Hungarian matching 解决多个预测和多个真实片段之间的对齐问题。</div>",
      "quiz": {
        "q": "Moment-DETR 为什么需要 Hungarian matching？",
        "options": [
          "因为视频帧必须按时间重新排序",
          "因为模型输出的是无序预测集合，需要把预测槽位和真实时刻一一匹配后才能计算损失",
          "因为 CLIP 文本 token 需要和视频帧逐词对齐",
          "因为 NMS 只能在匹配之后运行"
        ],
        "answer": 1,
        "explain": "Moment queries 输出的是无序集合，无法预先指定第几个 query 对应哪个真实时刻；Hungarian matching 用最小成本分配建立监督关系，也让模型不依赖 NMS。"
      }
    },
    {
      "id": "univtg",
      "num": 17,
      "name": "UniVTG",
      "fullName": "统一时序定位 (Unified VTG)",
      "year": "2023",
      "org": "Tsinghua",
      "parent": "moment_detr",
      "paperUrl": "http://openaccess.thecvf.com/content/ICCV2023/html/Lin_UniVTG_Towards_Unified_Video-Language_Temporal_Grounding_ICCV_2023_paper.html",
      "projectUrl": "",
      "category": "grounding",
      "motivation": "统一时刻检索与高亮检测",
      "summary": "UniVTG 提出统一的视频-语言时序定位框架，将时刻检索、高亮检测和查询式视频摘要都转写为 clip 级前景、边界和显著性预测，解决了 VTG 方法长期依赖任务专用标签和任务专用模型的问题。",
      "keyPoints": [
        "<strong>统一标签三元组</strong>：每个 clip 被表示为 <span class=\"kb-math kb-math-inline\">(f_i, d_i, s_i)</span>，分别对应前景指示、边界偏移和语言相关显著性分数",
        "<strong>三类 VTG 标签互转</strong>：interval-wise 时刻检索标签、curve-wise 高亮曲线标签、point-wise 摘要/叙事点标签都可转换到统一形式",
        "<strong>可扩展伪监督</strong>：使用 VideoCC 构造伪区间标签，使用 CLIP teacher 和开放概念库构造伪显著性曲线，并利用 Ego4D/QFVS 等点标签扩展预训练语料",
        "<strong>统一 grounding 模型</strong>：沿用 Moment-DETR 风格的视频/文本编码器，加入多模态 Transformer 编码器，并用 foreground、boundary、saliency 三个预测头对应统一三元组",
        "<strong>多目标训练</strong>：前景头用 BCE，边界头用 Smooth L1 + generalized IoU，显著性头用 intra-video 与 inter-video 对比学习",
        "<strong>多任务推理</strong>：moment retrieval 用 <span class=\"kb-math kb-math-inline\">\\tilde f_i</span> 排序边界并做 1D NMS，高亮检测用 <span class=\"kb-math kb-math-inline\">\\tilde f_i+\\tilde s_i</span> 排序 clip，视频摘要用 KTS 分段后聚合 clip 分数",
        "<strong>评估范围</strong>：覆盖 QVHighlights、Charades-STA、TACoS、Ego4D、YouTube Highlights、TVSum、QFVS，并通过约 4.2M 样本的 grounding 预训练增强迁移和零样本能力"
      ],
      "detail": "<h5>核心框架图</h5>\n<p><img alt=\"UniVTG 统一标签与训练管线\" src=\"https://ar5iv.labs.arxiv.org/html/2307.16715/assets/x3.png\" />\n<em>图：UniVTG 先把不同来源的 interval、curve、point 标签统一成 clip 级 <span class=\"kb-math kb-math-inline\">(f_i,d_i,s_i)</span>，再用同一个 grounding 模型预训练并迁移到不同 VTG 下游任务。</em></p>\n<p><img alt=\"UniVTG 统一模型结构\" src=\"https://ar5iv.labs.arxiv.org/html/2307.16715/assets/x5.png\" />\n<em>图：UniVTG 模型由冻结视频编码器、冻结文本编码器、多模态编码器和三个输出头组成，分别预测前景、边界偏移和显著性。</em></p>\n<h5>算法流程</h5>\n<pre><code class=\"language-python\"># UniVTG 训练与推理流程伪代码\ndef train_univtg(video, query, raw_label):\n    clips = split_into_fixed_length_clips(video)\n\n    # 1. 将不同任务标签转成统一监督\n    if raw_label.type == &quot;interval&quot;:\n        f, d, s = interval_to_foreground_boundary_saliency(clips, raw_label)\n    elif raw_label.type == &quot;curve&quot;:\n        s = raw_label.saliency_curve\n        f = (s &gt; adaptive_threshold(s))\n        d = nearest_background_offsets(f)\n    elif raw_label.type == &quot;point&quot;:\n        f = point_labels_to_foreground(clips, raw_label)\n        s = f.astype(float)\n        d = estimate_interval_from_neighboring_points(raw_label)\n\n    # 2. 编码与跨模态交互\n    V = video_encoder(clips)                  # CLIP + SlowFast, frozen\n    Q = text_encoder(query)                   # CLIP text encoder, frozen\n    V, Q = project_to_same_dim(V), project_to_same_dim(Q)\n    S = attentive_pool(Q)                     # sentence representation\n    Z = multimodal_transformer(concat(V, Q))\n    V_joint = take_video_tokens(Z)\n\n    # 3. 三头预测\n    f_hat = foreground_head(V_joint)\n    d_hat = boundary_head(V_joint)\n    s_hat = cosine_similarity(V, S)\n\n    # 4. 联合优化\n    loss_f = binary_cross_entropy(f_hat, f)\n    loss_b = smooth_l1_and_giou(d_hat, d, mask=(f == 1))\n    loss_s = intra_inter_video_contrastive(s_hat, s)\n    return loss_f + loss_b + loss_s\n\ndef infer_univtg(video, query, task):\n    f_hat, b_hat, s_hat = forward(video, query)\n    if task == &quot;moment_retrieval&quot;:\n        return nms_1d(rank_by_score(b_hat, f_hat), threshold=0.7)\n    if task == &quot;highlight_detection&quot;:\n        return topk_clips(score=f_hat + s_hat)\n    if task == &quot;video_summarization&quot;:\n        shots = kernel_temporal_segmentation(video)\n        return select_summary_by_aggregated_clip_scores(shots, f_hat + s_hat)\n</code></pre>\n<h5>方法解读</h5>\n<p><strong>动机：从任务专用 VTG 走向统一 VTG。</strong> 早期 moment retrieval 通常输出一个连续时间区间，highlight detection 输出每个片段的 worthiness 曲线，video summarization 输出若干离散关键片段。它们看起来监督形式不同，导致模型、标签和评估流程都被任务切开。UniVTG 的核心判断是：这些任务本质上都在回答“给定视频 <span class=\"kb-math kb-math-inline\">V</span> 和查询 <span class=\"kb-math kb-math-inline\">Q</span>，哪些 clip 是目标 clip”。因此与其为每种任务设计专门 head，不如把 clip 当作统一原子，并让不同标签都落到同一组 clip 级变量上。</p>\n<p><strong>统一三元组是整篇论文的中心抽象。</strong> 给定视频 clip <span class=\"kb-math kb-math-inline\">v_i</span> 及其中心时间 <span class=\"kb-math kb-math-inline\">t_i</span>，UniVTG 定义：</p>\n<div class=\"kb-math kb-math-display\">v_i = (f_i, d_i, s_i), \\quad d_i=[d_i^s,d_i^e], \\quad b_i=[t_i-d_i^s, t_i+d_i^e].</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">f_i\\in\\{0,1\\}</span> 判断该 clip 是否属于查询相关前景，<span class=\"kb-math kb-math-inline\">d_i</span> 只在前景 clip 上有效，用来把 clip 中心回归到完整区间边界；<span class=\"kb-math kb-math-inline\">s_i\\in[0,1]</span> 则表示 clip 与语言查询的相关显著性。这个设计把“区间定位”“曲线打分”“离散摘要点”压到同一个监督空间：区间标签提供 <span class=\"kb-math kb-math-inline\">f_i,d_i</span>，高亮曲线直接提供 <span class=\"kb-math kb-math-inline\">s_i</span>，点标签提供稀疏 <span class=\"kb-math kb-math-inline\">f_i</span>，缺失项再通过阈值、邻近背景或平均叙事间隔补全。</p>\n<p><strong>伪标签机制解决了时序 grounding 预训练语料少的问题。</strong> 对 interval-wise 标签，论文利用 VideoCC 中裁剪视频与文本标题/描述的对应关系构造伪时间区间；对 curve-wise 标签，先用开放概念库生成候选概念，再用 CLIP 计算每个 clip 与概念的相似度，取 top-5 概念作为视频 gist，并把相似度作为伪显著性曲线；对 point-wise 标签，利用 Ego4D 叙事时间戳或 QFVS 概念点标注，把点扩展成局部时间监督。这样做的关键不是让伪标签完全准确，而是让三类标签可以在同一目标下共同训练，给模型大量“语言-时间”对齐信号。</p>\n<p><strong>模型结构继承 Moment-DETR，但输出被改造成三头统一预测。</strong> UniVTG 使用冻结视频编码器和文本编码器：视频侧采用 CLIP ViT-B/32 与 SlowFast R-50 特征拼接，文本侧采用 CLIP text encoder。视频 token 与文本 token 加入位置和模态嵌入后拼接，送入多层 Transformer 做跨模态交互：</p>\n<div class=\"kb-math kb-math-display\">\\tilde V=V+E_V^{pos}+E_V^{type}, \\quad\n\\tilde Q=Q+E_T^{pos}+E_T^{type}, \\quad\nZ_0=[\\tilde V;\\tilde Q],</div>\n<div class=\"kb-math kb-math-display\">Z_d=\\operatorname{MLP}(\\operatorname{MSA}(Z_{d-1})), \\quad d=1,\\ldots,k.</div>\n<p>输出的视频 token 接三个 head：foreground head 预测 <span class=\"kb-math kb-math-inline\">\\tilde f_i</span>，boundary head 预测 <span class=\"kb-math kb-math-inline\">\\tilde d_i</span>，saliency head 则通过视频 clip 表示与句子表示的余弦相似度预测 <span class=\"kb-math kb-math-inline\">\\tilde s_i</span>。</p>\n<p><strong>训练目标把匹配、定位和显著性显式拆开。</strong> 前景匹配使用二元交叉熵：</p>\n<div class=\"kb-math kb-math-display\">L_f=-\\lambda_f\\left(f_i\\log\\tilde f_i+(1-f_i)\\log(1-\\tilde f_i)\\right).</div>\n<p>边界回归只在前景 clip 上生效，组合 Smooth L1 和 generalized IoU：</p>\n<div class=\"kb-math kb-math-display\">L_b=\\mathbf{1}_{f_i=1}\\left[\\lambda_{L1}L_{\\text{SmoothL1}}(\\tilde d_i,d_i)+\\lambda_{\\text{iou}}L_{\\text{iou}}(\\tilde b_i,b_i)\\right].</div>\n<p>显著性头先用 attentive pooling 得到句子表示 <span class=\"kb-math kb-math-inline\">S</span>，再计算：</p>\n<div class=\"kb-math kb-math-display\">\\tilde s_i=\\cos(v_i,S)=\\frac{v_i^\\top S}{\\|v_i\\|_2\\|S\\|_2}.</div>\n<p>论文进一步用 intra-video 对比学习区分同一视频内高低显著性 clip，用 inter-video 对比学习把当前正 clip 与 batch 中其他句子拉开。总损失为：</p>\n<div class=\"kb-math kb-math-display\">L=\\frac{1}{N}\\sum_{i=1}^{N}(L_f+L_b+L_s), \\quad\nL_s=\\lambda_{\\text{inter}}L_s^{\\text{inter}}+\\lambda_{\\text{intra}}L_s^{\\text{intra}}.</div>\n<p><strong>推理时按任务选择不同读出方式。</strong> Moment retrieval 使用 foreground 概率排序所有预测边界，并用 1D NMS 去重；highlight detection 同时利用“是否前景”和“是否显著”，以 <span class=\"kb-math kb-math-inline\">\\tilde f_i+\\tilde s_i</span> 排序 clip；video summarization 则先用 KTS 切成 shot，再聚合 clip 分数生成摘要。与 Moment-DETR 相比，UniVTG 的创新不只是换一个 head，而是把标签空间、预训练语料和推理读出统一起来，使一个模型可以吸收不同粒度的时序监督。</p>",
      "quiz": {
        "q": "UniVTG 中统一三元组 (f_i, d_i, s_i) 的主要作用是什么？",
        "options": [
          "把视频帧压缩成固定长度视觉 token，降低显存占用",
          "将时刻检索、高亮检测和视频摘要的不同标签统一到 clip 级监督空间",
          "替代 CLIP 文本编码器，直接生成查询句向量",
          "只用于 moment retrieval 的边界框后处理"
        ],
        "answer": 1,
        "explain": "UniVTG 的核心是用前景、边界偏移和显著性三类 clip 级变量表示不同 VTG 标签，使多任务预训练和统一模型成为可能。"
      }
    },
    {
      "id": "mqvtg",
      "num": 18,
      "name": "MQVTG",
      "fullName": "时刻量化定位 (Moment Quantization VTG)",
      "year": "2025",
      "org": "CAS",
      "parent": "univtg",
      "paperUrl": "https://openaccess.thecvf.com/content/ICCV2025/html/Sun_Moment_Quantization_for_Video_Temporal_Grounding_ICCV_2025_paper.html",
      "projectUrl": "",
      "category": "grounding",
      "motivation": "量化机制提升定位精度",
      "summary": "MQVTG 将向量量化引入视频时序定位，在时序建模后的 moment 表示上学习可训练 codebook，通过“软量化”增强前景与背景的可分性，同时避免硬替换离散码字造成的视觉细节损失。",
      "keyPoints": [
        "<strong>首个 moment-level VTG 量化框架</strong>：把视频时刻看作可由离散 codeword 辅助聚类的对象，用离散语义增强相关/不相关片段区分度",
        "<strong>clip quantization 到 moment quantization</strong>：clip quantization 在时序建模前量化单 clip，moment quantization 在 temporal encoder 后量化跨 clip 语义特征",
        "<strong>软量化策略</strong>：不用离散码字 <span class=\"kb-math kb-math-inline\">\\hat z_t</span> 替换连续特征，而是继续把连续特征 <span class=\"kb-math kb-math-inline\">z_t</span> 送入定位模块，让 codebook loss 和 commitment loss 间接塑造特征空间",
        "<strong>moment codebook</strong>：用 CLIP clip-level 特征做 k-means 聚类初始化 codebook，并通过线性投影 <span class=\"kb-math kb-math-inline\">C&#x27;=P(C)</span> 建模 codeword 间相关性",
        "<strong>两种架构兼容</strong>：既能接 encoder-only 架构，也能作为 plug-and-play 模块接入 DETR 式 encoder-decoder VTG 模型",
        "<strong>训练目标组合</strong>：定位损失 <span class=\"kb-math kb-math-inline\">L_{mr}</span>、高亮损失 <span class=\"kb-math kb-math-inline\">L_{hd}</span>、moment quantization 损失 <span class=\"kb-math kb-math-inline\">L_{mq}</span>、视频-文本对齐损失 <span class=\"kb-math kb-math-inline\">L_{align}</span> 联合优化",
        "<strong>六个基准验证</strong>：在 QVHighlights、Charades-STA、TACoS、Ego4D-NLQ、YouTube Highlights、TVSum 上验证泛化性"
      ],
      "detail": "<h5>核心框架图</h5>\n<p><img alt=\"MQVTG 三种量化方式对比\" src=\"https://arxiv.org/html/2504.02286v1/x2.png\" />\n<em>图：MQVTG 对比 image quantization、clip quantization 和 moment quantization，并展示 moment codebook 的 prior initialization 与 joint projection 设计。</em></p>\n<p><img alt=\"MQVTG 架构示意\" src=\"https://arxiv.org/html/2504.02286v1/x3.png\" />\n<em>图：MQVTG 支持 encoder-only 与 encoder-decoder 两类 VTG 架构，moment codebook 位于时序建模之后，用量化监督增强视频特征判别性。</em></p>\n<h5>算法流程</h5>\n<pre><code class=\"language-python\"># MQVTG moment quantization 训练流程伪代码\ndef train_mqvtg(video, text, gt_moments, gt_saliency):\n    # 1. 空间与文本编码\n    clip_features = clip_visual_encoder(video)      # frozen CLIP visual features\n    z_s = spatial_pool_and_project(clip_features)   # [T, d]\n    text_features = clip_text_encoder(text)\n\n    # 2. 时序/跨模态建模，形成 moment-aware 连续特征\n    z_t = temporal_encoder(z_s, text_features)      # quantization after temporal modeling\n\n    # 3. moment codebook 量化监督\n    C = moment_codebook                            # initialized by k-means centers\n    C_projected = linear_projector(C)              # C' = P(C)\n    nearest_idx = argmin_l2(z_t, C_projected)\n    z_hat = C_projected[nearest_idx]\n\n    # 4. 软量化：定位模块继续使用连续 z_t，而不是 z_hat\n    pred_moments = boundary_head(z_t)\n    pred_saliency = saliency_head(z_t)\n    pred_confidence = classification_head(z_t)\n\n    # 5. 损失\n    L_cb = l2(z_hat, stop_gradient(z_t))\n    L_cmt = l2(stop_gradient(z_hat), z_t)\n    L_mq = L_cb + lambda_cmt * L_cmt\n    L_mr = moment_retrieval_loss(pred_moments, pred_confidence, gt_moments)\n    L_hd = highlight_detection_loss(pred_saliency, gt_saliency)\n    L_align = infonce_alignment_loss(z_t, text_features)\n\n    return L_mr + lambda_hd * L_hd + lambda_mq * L_mq + lambda_align * L_align\n</code></pre>\n<h5>方法解读</h5>\n<p><strong>动机：连续特征容易混淆前景和相似背景。</strong> VTG 的目标是根据语言描述定位相关时刻，但视频中有大量冗余片段，且背景片段可能与前景在视觉上非常接近。此前 UniVTG、DETR 式 VTG 或 R2-Tuning 等方法主要学习连续表征，前景 feature 往往分散，背景 feature 又可能靠得很近。MQVTG 的出发点是：语言描述天然带有离散语义，比如“spoon stirring curry”，那么能否用离散 codeword 帮助连续 video moment 特征形成更清晰的聚类结构？</p>\n<p><strong>从图像量化迁移到视频时刻量化，关键在于量化位置。</strong> 标准 VQ-VAE 风格图像量化会在 latent feature <span class=\"kb-math kb-math-inline\">z</span> 中找最近的 codeword：</p>\n<div class=\"kb-math kb-math-display\">\\hat z=C(z)=c_k,\\quad k=\\arg\\min_i\\|z-c_i\\|_2^2,\\quad C\\in\\mathbb{R}^{K\\times d}.</div>\n<p>如果直接套到视频上，最朴素做法是 clip quantization：在冻结视觉编码器和 projector 后得到 <span class=\"kb-math kb-math-inline\">z_s\\in\\mathbb{R}^{T\\times d}</span>，逐 clip 量化，再交给 temporal encoder。但这忽略了“moment 跨越多个 clip”的事实。MQVTG 因此把量化移到 temporal encoder 之后：先得到语义感知的连续特征 <span class=\"kb-math kb-math-inline\">z_t=E_t(z_s)</span>，再用 moment codebook 对 <span class=\"kb-math kb-math-inline\">z_t</span> 做量化监督。这样 codeword 对齐的是事件/时刻级语义，而不是孤立帧或孤立 clip。</p>\n<p><strong>软量化是 MQVTG 最重要的取舍。</strong> 传统硬量化会把连续特征直接替换成最近码字 <span class=\"kb-math kb-math-inline\">\\hat z_t</span>，但视频表达比图像 patch 更复杂，同一语言时刻可能有多种视觉形态。有限 codebook 如果直接替换特征，容易丢掉定位所需细粒度差异。MQVTG 保留连续特征 <span class=\"kb-math kb-math-inline\">z_t</span> 给下游定位头，只用量化损失约束特征-codeword 聚类：</p>\n<div class=\"kb-math kb-math-display\">L_{cb}=\\|\\hat z_t-\\operatorname{sg}(z_t)\\|_2^2\n=\\|C(z_t)-\\operatorname{sg}(E_t(z_s))\\|_2^2,</div>\n<div class=\"kb-math kb-math-display\">L_{cmt}=\\|\\operatorname{sg}(\\hat z_t)-z_t\\|_2^2\n=\\|\\operatorname{sg}(C(z_t))-E_t(z_s)\\|_2^2.</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\operatorname{sg}(\\cdot)</span> 是 stop-gradient。<span class=\"kb-math kb-math-inline\">L_{cb}</span> 更新 codebook，使 codeword 靠近时序特征分布；<span class=\"kb-math kb-math-inline\">L_{cmt}</span> 更新 temporal encoder，使 <span class=\"kb-math kb-math-inline\">z_t</span> 靠近 codebook embedding space。定位头仍看连续 <span class=\"kb-math kb-math-inline\">z_t</span>，因此既得到离散聚类带来的前景/背景分离，又尽量保留视觉多样性。</p>\n<p><strong>moment codebook 解决随机初始化和 codeword 独立性问题。</strong> 图像量化常随机初始化 codebook，但 VTG 中 batch 内只有少数 codeword 会被更新，随机初始化容易导致 codebook 利用率低。MQVTG 先用预训练 CLIP 提取训练集 clip-level 特征，再做 k-means，把聚类中心作为 codebook 初值，使码本一开始就落在有效视觉语义空间。随后用一个线性 projector 学习 <span class=\"kb-math kb-math-inline\">C&#x27;=P(C)</span>，让 codeword 之间也可以建立类似时序语义的相关性，而不是完全独立地被优化。</p>\n<p><strong>架构上是可插拔的训练正则，而不是重型新检测器。</strong> 在 encoder-only 版本中，MQVTG 使用 CLIP 视觉/文本编码器，temporal encoder 融合多层 CLIP 特征后输出 <span class=\"kb-math kb-math-inline\">z_t</span>，再接三个简单 head：分类置信度、边界位移、显著性分数。对于 DETR 式 encoder-decoder VTG，moment codebook 可以插在 Transformer encoder 和 decoder 之间。论文强调该模块主要增加训练期 codebook 参数，推理期没有额外复杂代价，因为下游仍使用连续特征路径。</p>\n<p><strong>整体训练目标把量化作为辅助判别约束。</strong> 论文把 moment retrieval、高亮检测、moment quantization 和视频-文本对齐联合起来：</p>\n<div class=\"kb-math kb-math-display\">L_{\\text{overall}}=\nL_{mr}+\\lambda_{hd}L_{hd}+\\lambda_{mq}L_{mq}+\\lambda_{align}L_{align},\n\\quad\nL_{mq}=L_{cb}+\\lambda_{cmt}L_{cmt}.</div>\n<p>这里 <span class=\"kb-math kb-math-inline\">L_{mr}</span> 包含定位相关的 L1/focal 目标，<span class=\"kb-math kb-math-inline\">L_{hd}</span> 采用类似 UniVTG 的 intra-video contrastive saliency 监督，<span class=\"kb-math kb-math-inline\">L_{align}</span> 用 InfoNCE 做视频级和层级约束。与 UniVTG 相比，MQVTG 的核心不是重新统一任务形式，而是在统一 VTG 表征上加入“离散聚类压力”，让前景聚合、背景分离更明确。</p>",
      "quiz": {
        "q": "MQVTG 为什么采用软量化而不是直接用离散码字替换连续视频特征？",
        "options": [
          "因为软量化可以完全跳过 temporal encoder",
          "因为直接硬替换可能丢失同一时刻的视觉多样性和定位细节",
          "因为 codebook 只用于文本 token，不能处理视频 token",
          "因为软量化会把所有背景片段设为同一个固定向量"
        ],
        "answer": 1,
        "explain": "MQVTG 用 codebook loss 和 commitment loss 塑造连续特征空间，但定位头仍使用 z_t，从而兼顾离散聚类判别性和视频视觉细节。"
      }
    },
    {
      "id": "dsnet",
      "num": 19,
      "name": "DSNet",
      "fullName": "检测摘要网络 (Detect-to-Summarize)",
      "year": "2020",
      "org": "—",
      "parent": "—",
      "paperUrl": "https://ieeexplore.ieee.org/abstract/document/9275314/",
      "projectUrl": "",
      "category": "video_llm",
      "motivation": "时序提案机制做视频摘要",
      "summary": "DSNet 将监督式视频摘要改写为时序兴趣检测问题，用 anchor-based 或 anchor-free 方式同时预测片段重要性和时间边界，再通过 KTS 分镜与 0/1 背包选择生成受长度约束的摘要。",
      "keyPoints": [
        "<strong>Detect-to-Summarize 范式</strong>：不只预测每帧重要性，而是检测“值得进入摘要的时间片段”，同时考虑片段完整性和重要性",
        "<strong>长程特征建模</strong>：GoogLeNet 提取帧特征，默认用 self-attention 建模长程依赖，并将长程表示与原始视觉特征相加",
        "<strong>Anchor-based DSNet</strong>：在每个时间位置生成多尺度 temporal interest proposals，对 proposal 做重要性分类和中心/长度偏移回归",
        "<strong>Anchor-free DSNet</strong>：去掉预定义 proposal，逐时间位置直接预测重要性分数、左右边界距离和 center-ness 分数",
        "<strong>检测式训练损失</strong>：anchor-based 使用交叉熵 + Smooth L1 回归；anchor-free 使用 focal loss + tIoU loss + center-ness BCE",
        "<strong>摘要生成后处理</strong>：NMS 去除高重叠低质量片段，KTS 切分 shot，片段分数转换为 shot 分数，最后用 15% 视频长度预算下的 0/1 背包选择关键 shot",
        "<strong>主要数据集</strong>：在 SumMe 和 TVSum 上验证两种 DSNet 形式，并与 LSTM、attention、强化学习等摘要方法对比"
      ],
      "detail": "<h5>核心框架图</h5>\n<p><img alt=\"DSNet Detect-to-Summarize 框架\" src=\"https://raw.githubusercontent.com/li-plus/DSNet/master/docs/framework.jpg\" />\n<em>图：DSNet 同时提供 anchor-based 与 anchor-free 两条路径，前者生成 temporal interest proposals，后者逐位置直接预测 segment；二者最终都通过 NMS、KTS 和背包选择生成视频摘要。</em></p>\n<h5>算法流程</h5>\n<pre><code class=\"language-python\"># DSNet 推理流程伪代码：anchor-based 与 anchor-free 共享后处理\ndef dsnet_summarize(video, mode=&quot;anchor_free&quot;):\n    frame_feats = googlenet_without_last_layers(video)\n    long_range = self_attention(frame_feats)\n    x = frame_feats + long_range\n\n    if mode == &quot;anchor_based&quot;:\n        segments = []\n        for t in range(len(x)):\n            for length in [4, 8, 16, 32]:\n                proposal = [t - length / 2, t + length / 2]\n                pooled = temporal_average_pool(x, proposal)\n                score, delta_c, delta_l = cls_reg_head(pooled)\n                refined = refine_center_length(proposal, delta_c, delta_l)\n                segments.append((refined, score))\n    else:\n        segments = []\n        for j in range(len(x)):\n            score, delta_l, delta_r, center = anchor_free_head(x[j])\n            start = j - exp(delta_l)\n            end = j + exp(delta_r)\n            confidence = score * center\n            segments.append(([start, end], confidence))\n\n    segments = nms_1d(segments)\n    frame_scores = assign_max_segment_score_to_frames(segments, len(video))\n    shots = kernel_temporal_segmentation(video)\n    shot_scores = average_frame_scores_in_each_shot(frame_scores, shots)\n    summary = zero_one_knapsack(shots, shot_scores, budget=0.15 * len(video))\n    return summary\n</code></pre>\n<h5>方法解读</h5>\n<p><strong>动机：帧级重要性预测容易破坏片段完整性。</strong> 传统监督式视频摘要通常分三步：预测帧级重要性、把视频切成 shot、在长度预算内选择关键 shot。问题是，帧级分数不能显式表达“一个完整事件片段从哪里开始、到哪里结束”，同一语义片段内部也可能出现不一致的重要性分数，导致摘要片段不完整或边界不合理。DSNet 借鉴目标检测和时序动作定位，把摘要目标改写为“检测 temporal interest segment”：不仅判断重要，还要回归位置。</p>\n<p><strong>Anchor-based DSNet 使用多尺度时序提案覆盖不同长度兴趣片段。</strong> 给定 <span class=\"kb-math kb-math-inline\">T</span> 帧视频，在每个时间位置 <span class=\"kb-math kb-math-inline\">t</span>，模型生成 <span class=\"kb-math kb-math-inline\">K</span> 个固定长度 proposal：</p>\n<div class=\"kb-math kb-math-display\">[t-l_k/2,\\;t+l_k/2), \\quad k=1,\\ldots,K.</div>\n<p>论文根据 SumMe/TVSum 中 ground-truth segment 长度范围和正样本 tIoU 阈值 <span class=\"kb-math kb-math-inline\">\\zeta=0.6</span> 推导多尺度 proposal 应满足：</p>\n<div class=\"kb-math kb-math-display\">l_k/l_{k+1}\\geq \\zeta^2,\\quad l_K\\geq \\zeta \\ell_2,\\quad l_1\\leq \\ell_1/\\zeta.</div>\n<p>实践中选用长度 <span class=\"kb-math kb-math-inline\">4,8,16,32</span>，平衡召回和效率。训练时 proposal 与任一真实片段 tIoU <span class=\"kb-math kb-math-inline\">&gt;0.6</span> 标为正样本；tIoU <span class=\"kb-math kb-math-inline\">=0</span> 的无关片段和 <span class=\"kb-math kb-math-inline\">0&lt;tIoU&lt;0.3</span> 的不完整片段标为负样本。这一点很关键：DSNet 明确把“不完整但有重叠”的片段当作负例，让分类头学习片段完整性。</p>\n<p><strong>Anchor-based 分类回归头同时预测重要性和边界修正。</strong> 对任意长度 proposal 先做 temporal average pooling 得到固定长度特征，再经过共享全连接层和两个 sibling branches：分类分支输出 proposal 重要性，回归分支输出中心偏移和长度偏移。多任务损失为：</p>\n<div class=\"kb-math kb-math-display\">L(p,p^\\*,t,t^\\*)=\n\\frac{1}{N}\\sum_i L_{\\text{cls}}(p_i,p_i^\\*)+\n\\frac{\\lambda}{N_{pos}}\\sum_i p_i^\\* L_{\\text{reg}}(t_i,t_i^\\*).</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">L_{\\text{cls}}</span> 是交叉熵，<span class=\"kb-math kb-math-inline\">L_{\\text{reg}}</span> 是 Smooth L1；回归目标为：</p>\n<div class=\"kb-math kb-math-display\">\\delta c_i^\\*=\\frac{c_i^\\*-c_i}{l_i},\\quad\n\\delta l_i^\\*=\\log\\frac{l_i^\\*}{l_i}.</div>\n<p>这与目标检测中的 bbox regression 很接近，只是空间框变成了一维时间段。</p>\n<p><strong>Anchor-free DSNet 去掉 proposal，减少超参数和类别不平衡。</strong> Anchor-based 需要密集 proposal、正负采样比例、proposal 尺度和 NMS 阈值等超参数，而且大多数 proposal 是负样本。Anchor-free 版本直接在每个时间位置 <span class=\"kb-math kb-math-inline\">j</span> 预测该帧是否属于摘要片段，以及到左右边界的距离：</p>\n<div class=\"kb-math kb-math-display\">\\delta_l^\\*=j-t_o^s,\\quad \\delta_r^\\*=t_o^e-j.</div>\n<p>模型用 <span class=\"kb-math kb-math-inline\">\\exp(\\cdot)</span> 保证预测距离为正，并增加 center-ness 约束，降低靠近边界位置生成低质量片段的影响：</p>\n<div class=\"kb-math kb-math-display\">v_e^\\*=\\frac{\\min(\\delta_l^\\*,\\delta_r^\\*)}{\\max(\\delta_l^\\*,\\delta_r^\\*)}.</div>\n<p>训练损失为：</p>\n<div class=\"kb-math kb-math-display\">L=\\frac{1}{N_{pos}}\\sum_j L_{\\text{cls}}(s_j,s_j^\\*)+\n\\frac{\\lambda}{N_{pos}}\\sum_e L_{\\text{reg}}(\\delta t_e,\\delta t_e^\\*),</div>\n<div class=\"kb-math kb-math-display\">L^\\*=L+\\frac{\\mu}{N_{pos}}\\sum_e L_{\\text{center}}(v_e,v_e^\\*).</div>\n<p>其中分类采用 focal loss 处理正负不平衡，位置回归采用 tIoU loss，更适合不同长度的时序片段。</p>\n<p><strong>后处理把检测结果变成可评估的视频摘要。</strong> 无论 anchor-based 还是 anchor-free，推理都会得到大量重叠候选片段。DSNet 先用 NMS 过滤冗余片段，再把每一帧的分数设为覆盖该帧的候选片段最大分数。之后使用 KTS 将视频切成 shots，并计算第 <span class=\"kb-math kb-math-inline\">h</span> 个 shot 的平均重要性：</p>\n<div class=\"kb-math kb-math-display\">y_h=\\frac{1}{n_h}\\sum_{r=1}^{n_h}s_{h,r}.</div>\n<p>最后按照视频摘要评测惯例，摘要长度不能超过原视频的 15%，因此选择 shot 被写成 0/1 背包：</p>\n<div class=\"kb-math kb-math-display\">\\max \\sum_{h=1}^{c}u_h y_h,\\quad\n\\text{s.t.}\\ \\sum_{h=1}^{c}u_h n_h\\leq 0.15T,\\quad u_h\\in\\{0,1\\}.</div>\n<p><strong>与普通摘要网络的区别在于显式建模“边界”。</strong> LSTM/attention 摘要方法通常只学习重要性曲线，边界依赖 KTS 或后处理间接决定；DSNet 把摘要片段当作检测目标，训练时就要求模型判断完整 proposal 或直接预测 segment boundaries。Anchor-free 进一步把“预定义 anchor”放宽为每个时间位置动态生成的柔性片段，因此工程上更简单、推理也更快。</p>",
      "quiz": {
        "q": "DSNet 相比传统帧级重要性预测方法的关键改动是什么？",
        "options": [
          "只使用视频标题作为监督信号",
          "将视频摘要建模为时序兴趣片段检测，同时预测重要性和时间边界",
          "完全取消 KTS 和背包选择，直接输出整段视频",
          "把所有帧平均采样为固定数量的图像分类样本"
        ],
        "answer": 1,
        "explain": "DSNet 的 Detect-to-Summarize 思路把摘要片段当作检测目标，显式学习 proposal/segment 的重要性和边界，从而缓解帧级分数导致的片段不完整问题。"
      }
    },
    {
      "id": "video_chatgpt",
      "num": 20,
      "name": "Video-ChatGPT",
      "fullName": "视频对话模型 (Video-ChatGPT)",
      "year": "2023",
      "org": "MBZUAI",
      "parent": "clip4clip",
      "paperUrl": "https://arxiv.org/abs/2306.05424",
      "projectUrl": "",
      "category": "video_llm",
      "motivation": "开启视频对话微调范式",
      "summary": "Video-ChatGPT 将 LLaVA 式图像对话模型扩展到视频输入，通过 CLIP 帧级编码、时空平均池化和视频指令微调，解决早期 Video-LMM 无法进行开放式视频对话的问题。",
      "keyPoints": [
        "架构以 CLIP ViT-L/14 视觉编码器和 Vicuna-v1.1 7B 语言解码器为基础，并从 LLaVA 权重初始化",
        "视频表示不训练重型视频 backbone，而是把帧独立编码后分别做空间池化和时间池化，得到 temporal tokens 与 spatial tokens",
        "使用一个可学习线性层 <span class=\"kb-math kb-math-inline\">g(\\cdot)</span> 将视频 token 投影到 LLM 词嵌入空间，形成可拼接的 video soft prompt",
        "指令微调阶段冻结视觉编码器与 LLM，只优化视频到语言空间的投影层，降低训练成本和灾难性遗忘风险",
        "构建 100,000 个 video-instruction pairs，结合人工增强标注与半自动 dense caption/tagging/GPT 后处理流程",
        "提出视频对话量化评估维度：correctness、detail orientation、contextual understanding、temporal understanding、consistency"
      ],
      "detail": "<p><img alt=\"Video-ChatGPT 架构图\" src=\"https://arxiv.org/html/2306.05424v2/extracted/5655180/images/video-chatgpt.png\" />\n<em>图：Video-ChatGPT 使用 CLIP-L/14 提取帧级视觉 token，经时空池化和线性投影后，与用户指令一起输入 Vicuna。</em></p>\n<p>Video-ChatGPT 的核心判断是：早期图像 LMM 已经具备较好的视觉-语言对齐能力，视频对话不必从零训练一个视频编码器。给定视频 <span class=\"kb-math kb-math-inline\">V_i \\in \\mathbb{R}^{T \\times H \\times W \\times C}</span>，模型把 <span class=\"kb-math kb-math-inline\">T</span> 帧当作一批图像送入 CLIP ViT-L/14，得到帧级 patch 表示：</p>\n<div class=\"kb-math kb-math-display\">x_i \\in \\mathbb{R}^{T \\times h \\times w \\times D}, \\quad\nh = H / p,\\; w = W / p,\\; N = h \\times w</div>\n<p>这里 <span class=\"kb-math kb-math-inline\">N</span> 是每帧 patch token 数，<span class=\"kb-math kb-math-inline\">D</span> 是视觉特征维度。论文没有引入显式 3D 卷积或时序 Transformer，而是用两个互补的平均池化方向保留视频信息：沿空间维平均得到逐帧时间表示，沿时间维平均得到跨帧空间表示。</p>\n<div class=\"kb-math kb-math-display\">t_i(\\tau)=\\frac{1}{N}\\sum_{n=1}^{N}x_i[\\tau,n,:]\\in\\mathbb{R}^{D}</div>\n<div class=\"kb-math kb-math-display\">z_i(n)=\\frac{1}{T}\\sum_{\\tau=1}^{T}x_i[\\tau,n,:]\\in\\mathbb{R}^{D}</div>\n<div class=\"kb-math kb-math-display\">v_i=[t_i \\; z_i]\\in\\mathbb{R}^{(T+N)\\times D}, \\qquad\nQ_v=g(v_i)\\in\\mathbb{R}^{(T+N)\\times K}</div>\n<p>这个设计的关键在于把“视频”拆成两类软提示：<span class=\"kb-math kb-math-inline\">t_i</span> 关注事件随时间发生了什么，<span class=\"kb-math kb-math-inline\">z_i</span> 保留跨时间稳定的空间布局、对象和场景。二者拼接后由线性层 <span class=\"kb-math kb-math-inline\">g</span> 投到 Vicuna 的 embedding 维度 <span class=\"kb-math kb-math-inline\">K</span>，因此 LLM 接收到的是一段和文本 token 同维度的视频 token 序列，而不是外部 caption 或离散标签。</p>\n<pre><code class=\"language-python\"># Video-ChatGPT 训练流程伪代码\nfor video, instruction, answer in dataloader:\n    frames = uniform_sample(video, T)\n\n    # 1. 冻结 CLIP，把视频按帧编码为 patch token\n    x = clip_vit_l14(frames)                      # [T, N, D]\n\n    # 2. 两个方向的平均池化构造时空视频表示\n    temporal_tokens = mean(x, dim=&quot;patch&quot;)        # [T, D]\n    spatial_tokens = mean(x, dim=&quot;time&quot;)          # [N, D]\n    video_features = concat(temporal_tokens, spatial_tokens, dim=&quot;token&quot;)\n\n    # 3. 仅训练投影层，把视频 token 对齐到 LLM embedding 空间\n    video_tokens = linear_projector(video_features)  # [T + N, K]\n    text_tokens = tokenizer_embed(instruction)       # [L, K]\n\n    # 4. 冻结 Vicuna，用自回归目标预测答案 token\n    prompt = concat(text_tokens, video_tokens, assistant_prefix)\n    logits = vicuna(prompt, labels=answer)\n    loss = cross_entropy(logits, answer)\n    loss.backward()\n    optimizer.step()\n</code></pre>\n<p>训练目标仍是标准语言模型负对数似然，只是条件上下文多了 <span class=\"kb-math kb-math-inline\">Q_v</span>。若答案 token 为 <span class=\"kb-math kb-math-inline\">a_1,\\dots,a_M</span>，训练优化：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}\n=-\\sum_{m=1}^{M}\\log p_\\theta(a_m \\mid a_{&lt;m}, Q_t, Q_v)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">Q_t</span> 是用户指令 token，<span class=\"kb-math kb-math-inline\">Q_v</span> 是投影后的视频 token。因为视觉编码器和 LLM 都冻结，梯度主要更新 <span class=\"kb-math kb-math-inline\">g(\\cdot)</span>。直觉上，Video-ChatGPT 并不是重新学习“语言如何生成”，而是学习“怎样把时空视觉证据摆到 Vicuna 已能理解的位置”。</p>\n<p>数据侧同样是贡献重点。论文把原始视频 caption 扩展成更适合对话训练的 instruction-answer：人工标注负责补充外观、空间关系、事件顺序和推理线索；半自动流程则用 BLIP-2、GRIT、Tag2Text 等模型产出帧级 caption、dense caption 和标签，再通过 GPT 后处理生成多样化视频问答。这样得到的 100K 样本覆盖描述、摘要、问答、创意生成和多轮对话，比单句 caption 更能训练 LMM 对时间顺序和上下文一致性的敏感度。</p>\n<p>与 CLIP4Clip 这类检索模型相比，Video-ChatGPT 的变化不只是把输出头从相似度换成文本生成。检索模型学习的是视频和文本的全局匹配分数，而 Video-ChatGPT 需要在开放式问题下选择性读取视觉证据并生成细粒度回答。因此它强调 instruction tuning 和 conversation evaluation，尤其关注 temporal understanding 与 consistency，这也为后续 VideoLLaMA、LLaVA-Video 等视频指令模型奠定了范式。</p>\n<div class=\"key-point\">💡 关键：Video-ChatGPT 的方法简洁但影响很大。它证明了“冻结图像 LMM + 视频 token 适配 + 视频指令数据”足以形成可用的视频对话模型，后续工作主要沿着更强数据、更强视频表示和更多模态继续扩展。</div>",
      "quiz": {
        "q": "Video-ChatGPT 为什么同时使用 temporal tokens 和 spatial tokens？",
        "options": [
          "为了让 CLIP 视觉编码器可以端到端训练",
          "为了分别保留跨帧事件变化和跨时间稳定的空间/对象信息",
          "为了把视频转成自然语言 caption 后再输入 LLM",
          "为了用 3D 卷积替代 ViT patch embedding"
        ],
        "answer": 1,
        "explain": "temporal tokens 来自空间池化，保留每帧随时间变化的语义；spatial tokens 来自时间池化，保留稳定空间结构。二者拼接后作为视频软提示输入 LLM。"
      }
    },
    {
      "id": "videollama",
      "num": 21,
      "name": "VideoLLaMA",
      "fullName": "视频大模型 (VideoLLaMA)",
      "year": "2023",
      "org": "Alibaba",
      "parent": "video_chatgpt",
      "paperUrl": "https://arxiv.org/abs/2306.02858",
      "projectUrl": "",
      "category": "video_llm",
      "motivation": "视觉-音频联合理解",
      "summary": "VideoLLaMA 提出视觉-语言分支与音频-语言分支并行的 Video-LLM 框架，用 Video Q-Former 和 Audio Q-Former 将视频帧与声音片段对齐到冻结 LLM 的 embedding 空间，解决视频对话只看画面、不理解声音的问题。",
      "keyPoints": [
        "架构包含 Vision-Language Branch 与 Audio-Language Branch，两条分支分别把视频帧和音频片段变成 LLM 可读的 soft prompt",
        "视觉分支使用冻结图像编码器提取帧表示，加入时间位置嵌入后交给 Video Q-Former 聚合成固定长度视频 token",
        "音频分支使用 ImageBind 作为冻结音频编码器，将 2 秒音频片段转为 mel-spectrogram 后编码，再由 Audio Q-Former 汇聚",
        "通过线性层把视觉/音频 query token 投影到 LLM 词嵌入维度，并与文本指令拼接输入冻结语言模型",
        "采用多分支跨模态训练：视觉分支先用 WebVid-2M 与 CC595K 做 caption 预训练，再用高质量指令数据微调",
        "由于音频-文本数据稀缺，音频分支利用 ImageBind 的共享嵌入空间，用视觉-文本数据进行替代式对齐训练"
      ],
      "detail": "<p><img alt=\"VideoLLaMA 总体架构\" src=\"https://ar5iv.labs.arxiv.org/html/2306.02858/assets/x1.png\" />\n<em>图：VideoLLaMA 的总体架构，左侧视觉分支处理视频帧，右侧音频分支处理声音片段，二者都通过 Q-Former 和线性层对齐到 LLM。</em></p>\n<p>VideoLLaMA 继承了 BLIP-2 的思想：不直接微调整个大语言模型，而是在冻结编码器与冻结 LLM 之间训练一个轻量连接器。视觉分支中，一个视频包含 <span class=\"kb-math kb-math-inline\">N</span> 帧，每帧经冻结图像编码器得到 <span class=\"kb-math kb-math-inline\">K_f</span> 个图像 token：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{V}=[\\mathbf{v}_1,\\mathbf{v}_2,\\dots,\\mathbf{v}_N], \\qquad\n\\mathbf{v}_i\\in\\mathbb{R}^{K_f\\times d_f}</div>\n<p>这些帧表示最初没有显式时间信息，所以 VideoLLaMA 在帧维度加入可学习位置嵌入，再送入 Video Q-Former。Q-Former 用一组可学习 query 从所有帧 token 中抽取固定长度的视频表示：</p>\n<div class=\"kb-math kb-math-display\">\\hat{\\mathbf{v}}\n=\\operatorname{QFormer}_V(\\mathbf{V}+\\mathbf{P}_V,\\mathbf{Q}_V)\n\\in\\mathbb{R}^{k_V\\times d_V}</div>\n<p>随后线性层把 <span class=\"kb-math kb-math-inline\">\\hat{\\mathbf{v}}</span> 映射到 LLM embedding 维度，作为 video soft prompt。相比 Video-ChatGPT 的简单时空平均池化，VideoLLaMA 的视觉分支更强调“用 query 压缩多帧信息”：模型可以学习哪些帧、哪些 patch 对当前语言生成更有用，而不是固定地平均所有位置。</p>\n<p>音频分支是 VideoLLaMA 区别于早期纯视觉 Video-LMM 的关键。模型从视频中均匀采样 <span class=\"kb-math kb-math-inline\">M</span> 个 2 秒音频片段，转换成 128-bin mel-spectrogram 后送入 ImageBind 音频编码器，得到：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{A}=[\\mathbf{a}_1,\\mathbf{a}_2,\\dots,\\mathbf{a}_M]</div>\n<p>Audio Q-Former 与视觉分支结构对称，同样加入时间位置嵌入并输出固定长度音频表示：</p>\n<div class=\"kb-math kb-math-display\">\\hat{\\mathbf{A}}\n=\\operatorname{QFormer}_A(\\mathbf{A}+\\mathbf{P}_A,\\mathbf{Q}_A)\n\\in\\mathbb{R}^{K_a\\times d_a}</div>\n<p>投影后的视觉 token、音频 token 和文本指令 token 被拼接为同一个上下文，送入冻结 LLM 自回归生成回答。若两种模态同时可用，条件生成可以写作：</p>\n<div class=\"kb-math kb-math-display\">p(y\\mid x,V,A)\n=\\prod_{m=1}^{M_y}p(y_m\\mid y_{&lt;m}, E_x, W_V\\hat{\\mathbf{v}}, W_A\\hat{\\mathbf{A}})</div>\n<p>训练目标仍是生成目标文本的负对数似然：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{gen}}\n=-\\sum_m \\log p(y_m\\mid y_{&lt;m}, E_x, E_V, E_A)</div>\n<pre><code class=\"language-python\"># VideoLLaMA 多分支训练/推理流程伪代码\nfor sample in dataloader:\n    text_prompt, target_text = sample.instruction, sample.answer\n\n    if sample.has_video_frames:\n        frames = sample_video_frames(sample.video)\n        frame_tokens = frozen_image_encoder(frames)          # [N, Kf, df]\n        frame_tokens = frame_tokens + temporal_pos_embed(N)\n        video_queries = video_qformer(frame_tokens)          # [kV, dV]\n        video_prompt = video_linear(video_queries)           # [kV, K]\n    else:\n        video_prompt = empty()\n\n    if sample.has_audio:\n        clips = sample_audio_segments(sample.audio, seconds=2)\n        specs = mel_spectrogram(clips, bins=128)\n        audio_tokens = frozen_imagebind_audio(specs)         # [M, d]\n        audio_tokens = audio_tokens + audio_pos_embed(M)\n        audio_queries = audio_qformer(audio_tokens)          # [Ka, da]\n        audio_prompt = audio_linear(audio_queries)           # [Ka, K]\n    else:\n        audio_prompt = empty()\n\n    text_prompt_tokens = llm_embed(text_prompt)\n    llm_input = concat(video_prompt, audio_prompt, text_prompt_tokens)\n    loss = autoregressive_nll(frozen_llm(llm_input), target_text)\n    loss.backward()                                          # 更新 Q-Former/线性层/位置嵌入\n    optimizer.step()\n</code></pre>\n<p>训练流程分为两条主线。视觉分支先在 WebVid-2M 视频 caption 和 CC595K 图像 caption 上做 video/image-to-text generation，让连接器学会把视觉编码器输出转成 LLM 可利用的语义提示；之后再用 MiniGPT-4、LLaVA 和 Video-Chat 等高质量指令数据做视觉指令微调，恢复并增强 instruction following 能力。图像被视为单帧视频，因此图像理解和视频理解共享同一条视觉连接器。</p>\n<p>音频分支面临更现实的数据问题：高质量音频-文本对远少于图像/视频-文本对。VideoLLaMA 的做法是利用 ImageBind 已把图像、音频等模态对齐到共同空间这一性质，让音频连接器也用视觉-文本数据训练。这个策略不是让模型“听到”图像，而是学习把 ImageBind 公共空间中的向量搬到 LLM 词嵌入空间；推理时真实音频通过 ImageBind 落入相近空间，Audio Q-Former 因而可以零样本地提供声音线索。</p>\n<p>与 Video-ChatGPT 相比，VideoLLaMA 的主要扩展有两点：一是从固定平均池化升级为 Q-Former 查询聚合，增强多帧信息筛选能力；二是显式引入音频分支，让模型能回答“画面中发生了什么”和“声音中出现了什么”两类问题。代价是训练和模块复杂度更高，而且论文也指出它仍受数据规模、长视频上下文和 LLM 幻觉问题限制。</p>\n<div class=\"key-point\">💡 关键：VideoLLaMA 的价值在于把 Video-LLM 从“看视频”推进到“看并听视频”，并给出了一套冻结基础模型、训练轻量跨模态连接器的工程路线。</div>",
      "quiz": {
        "q": "VideoLLaMA 为什么可以在音频-文本数据稀缺时仍训练音频分支？",
        "options": [
          "因为 Audio Q-Former 不需要任何训练",
          "因为 ImageBind 已将音频和视觉等模态对齐到公共嵌入空间，可用视觉-文本数据间接训练对齐到 LLM 的连接器",
          "因为模型把音频先转写成字幕，再输入文本编码器",
          "因为音频分支和视觉分支完全共享同一组参数"
        ],
        "answer": 1,
        "explain": "VideoLLaMA 利用 ImageBind 的跨模态公共空间，用视觉-文本数据学习从该空间到 LLM embedding 空间的映射，推理时音频特征也能通过同一空间被利用。"
      }
    },
    {
      "id": "llava_video",
      "num": 22,
      "name": "LLaVA-Video",
      "fullName": "视频指令模型 (LLaVA-Video)",
      "year": "2024",
      "org": "ByteDance",
      "parent": "videollama",
      "paperUrl": "https://arxiv.org/abs/2410.02713",
      "projectUrl": "",
      "category": "video_llm",
      "motivation": "大规模合成数据提升性能",
      "summary": "LLaVA-Video 通过构建 LLaVA-Video-178K 合成视频指令数据集，并配合 SlowFast 式视频 token 分配策略，解决高质量视频指令数据稀缺和长视频帧数受上下文窗口限制的问题。",
      "keyPoints": [
        "提出 LLaVA-Video-178K：178,510 个视频、约 2K 小时内容、1.3M instruction samples",
        "数据覆盖三类任务：178K detailed captions、960K open-ended QA、196K multiple-choice QA",
        "从十类主流视频源构建视频池，优先选择动态、未裁剪、情节完整的视频，而不是大量静态短片",
        "用 GPT-4o 进行合成标注，采用 1 FPS 密集采样和三层递归 caption 生成流程支持任意长度视频",
        "基于 detailed caption 生成 16 类视频问答，并通过去重与拒答模式过滤提升 QA 可用性",
        "在 LLaVA-OneVision 基础上混合视频指令数据与图像指令数据微调，形成 LLaVA-Video 模型族",
        "引入 <span class=\"kb-math kb-math-inline\">\\text{LLaVA-Video}_{\\mathtt{SlowFast}}</span> 表示，用更多帧加更少单帧 token 的方式提升时序覆盖"
      ],
      "detail": "<p><img alt=\"LLaVA-Video 三层数据生成流程\" src=\"https://llava-vl.github.io/blog/2024-09-30-llava-video/static/images/llava_video_data_creation_pages-to-jpg-0001.jpg\" />\n<em>图：LLaVA-Video-178K 的三层递归 caption 生成流程，短片段描述、中段摘要和全局描述互相提供历史上下文。</em></p>\n<p><img alt=\"LLaVA-Video 视频表示\" src=\"https://llava-vl.github.io/blog/2024-09-30-llava-video/static/images/llava_video_arch_page-0001.jpg\" />\n<em>图：LLaVA-Video 的视频表示设计，不同帧使用不同数量的视觉 token，以在上下文预算内覆盖更多时间点。</em></p>\n<p>LLaVA-Video 的核心贡献首先是数据工程。论文认为 Web 级原始视频很难直接变成高质量 instruction data：字幕常常不描述画面，人工标注又太贵，已有合成数据的帧采样过稀会遗漏细节。因此它构建 LLaVA-Video-178K，形式上可以看作：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{D}_{178K}\n=\\{(v_i, c_i, Q_i^{\\text{open}}, Q_i^{\\text{mc}})\\}_{i=1}^{178510}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">c_i</span> 是详细视频描述，<span class=\"kb-math kb-math-inline\">Q_i^{\\text{open}}</span> 是开放问答集合，<span class=\"kb-math kb-math-inline\">Q_i^{\\text{mc}}</span> 是多选问答集合。数据总量约为：</p>\n<div class=\"kb-math kb-math-display\">|\\mathcal{C}|=178K,\\qquad\n|\\mathcal{Q}^{\\text{open}}|=960K,\\qquad\n|\\mathcal{Q}^{\\text{mc}}|=196K</div>\n<p>数据生成流程采用密集时间覆盖。模型以 1 FPS 抽帧，但不是把所有帧一次性塞给 GPT-4o，而是递归维护三层描述：Level-1 每 10 秒描述当前片段，Level-2 每 30 秒总结近期情节，Level-3 在视频末尾综合全局内容。这样做的直觉是，长视频标注需要“滚动记忆”：局部描述保证细节，周期性摘要控制上下文长度，最终描述整合完整剧情。</p>\n<pre><code class=\"language-python\"># LLaVA-Video-178K 合成标注流程伪代码\nfor video in selected_dynamic_untrimmed_videos:\n    frames = sample_frames(video, fps=1)\n    level1_buffer = []\n    level2_summary = &quot;&quot;\n\n    for clip in split(frames, seconds=10):\n        level1 = gpt4o_describe(\n            current_frames=clip,\n            recent_level1=level1_buffer,\n            latest_level2=level2_summary,\n        )\n        level1_buffer.append(level1)\n\n        if elapsed_seconds(clip) % 30 == 0:\n            level2_summary = gpt4o_summarize(\n                recent_level1=last_k(level1_buffer, k=3),\n                previous_level2=level2_summary,\n            )\n            level1_buffer = keep_unsummarized(level1_buffer)\n\n    detailed_caption = gpt4o_global_caption(\n        remaining_level1=level1_buffer,\n        latest_level2=level2_summary,\n    )\n\n    qa_pairs = []\n    for question_type in sixteen_video_qa_types:\n        qa = gpt4o_generate_qa(detailed_caption, question_type, in_context_examples=3)\n        if qa is not None and not is_duplicate(qa) and not starts_with_refusal(qa.answer):\n            qa_pairs.append(qa)\n\n    save(video, detailed_caption, qa_pairs)\n</code></pre>\n<p>问答生成建立在 detailed caption 之上，而不是直接从稀疏帧中硬生成问题。每个 question type 最多生成一个 QA，并使用三条同类型 in-context examples 约束输出风格；过滤阶段删除语义重复问题，也丢弃以“未提及”“未显示”等拒答模板开头的答案。这个设计把 GPT-4o 的能力用于生成“可训练的监督信号”，同时尽量避免无信息或不忠实样本进入指令微调。</p>\n<p>模型训练侧，LLaVA-Video 在 LLaVA-OneVision 的基础上加入视频数据，并混合已有图像指令数据。官方项目页给出的联合训练集约包含 1.6M video-language samples 和 1.1M image-language pairs，其中视频侧包括 LLaVA-Video-178K 以及 ActivityNet-QA、NExT-QA、PerceptionTest、LLaVA-Hound-255K 等数据。其重点不在于发明一个全新 LLM 架构，而是验证：高质量、细粒度、动态视频的合成 instruction data 可以显著提升开源 video LMM。</p>\n<p>第二个方法点是 SlowFast 式视频表示。简单表示会给每一帧相同数量的 token，但 LLM 上下文和 GPU 显存固定，增加帧数就会线性增加 token。LLaVA-Video 将视频表示写作：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{V}=(T,M,s,p)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">T</span> 是帧数，<span class=\"kb-math kb-math-inline\">M</span> 是每帧原始视觉 token 数，<span class=\"kb-math kb-math-inline\">s</span> 是 slow frame 的抽样步长，<span class=\"kb-math kb-math-inline\">p</span> 是池化率。每隔 <span class=\"kb-math kb-math-inline\">s</span> 帧选为 slow group，其余帧是 fast group：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{S}=\\{f_t\\mid t\\bmod s=0\\}, \\qquad\n\\mathcal{F}=\\{f_t\\mid t\\bmod s\\neq 0\\}</div>\n<p>slow frames 使用 <span class=\"kb-math kb-math-inline\">p\\times p</span> pooling，fast frames 使用 <span class=\"kb-math kb-math-inline\">2p\\times 2p</span> pooling，因此总 token 近似为：</p>\n<div class=\"kb-math kb-math-display\">N_{\\text{tokens}}\n=|\\mathcal{S}|\\frac{M}{p^2}\n+|\\mathcal{F}|\\frac{M}{(2p)^2}</div>\n<p>这个公式表达了 LLaVA-Video 的取舍：关键帧保留更细视觉分辨率，非关键帧保留较粗时间证据。相比只用少量高分辨率帧，SlowFast 表示更适合动态视频，因为许多问题依赖“什么时候发生”“动作如何变化”，需要覆盖更多时间点；相比盲目增加帧数，它又通过降低 fast frames 的 token 密度控制总上下文成本。</p>\n<p>LLaVA-Video 与 VideoLLaMA 的差异也很清楚。VideoLLaMA 强调音频-视觉双分支架构，LLaVA-Video 则把主要火力放在数据质量、时间覆盖和视频 token 预算上。它说明在 2024 年的 Video-LMM 竞争中，性能提升不只来自更复杂的连接器，也来自更贴近视频本质的训练监督：动态、未裁剪、密集帧、长程描述、多任务问答。</p>\n<div class=\"key-point\">💡 关键：LLaVA-Video 把“合成数据”从简单 caption 扩展为层级描述和多类型视频 QA，并用 SlowFast token 分配让模型在有限上下文里看见更多时间过程。</div>",
      "quiz": {
        "q": "LLaVA-Video 的 SlowFast 视频表示主要解决什么问题？",
        "options": [
          "让音频和视频在同一个 ImageBind 空间中对齐",
          "在固定上下文和显存预算下，用更多帧覆盖时间变化，同时减少非关键帧的单帧 token 数",
          "把视频全部转写成字幕，避免视觉编码",
          "只保留第一帧和最后一帧，减少数据标注成本"
        ],
        "answer": 1,
        "explain": "SlowFast 表示将帧分为 slow 和 fast 两组，对 fast frames 使用更强池化，从而在 token 预算近似固定时纳入更多时间点。"
      }
    },
    {
      "id": "internvideo2",
      "num": 23,
      "name": "InternVideo2",
      "fullName": "视频基础模型 (InternVideo2)",
      "year": "2024",
      "org": "Shanghai AI Lab",
      "parent": "llava_video",
      "paperUrl": "https://arxiv.org/abs/2403.15377",
      "projectUrl": "",
      "category": "video_llm",
      "motivation": "大规模缩放增强多模态对齐",
      "summary": "InternVideo2 提出三阶段渐进式视频基础模型训练方案，把掩码视频 token 重建、视频-音频-语音-文本对齐和视频中心 next-token prediction 串联起来，解决大规模视频模型既要时空感知、又要跨模态语义对齐和开放式对话能力的问题。",
      "keyPoints": [
        "构建最大到 6B 参数的视频 ViT 编码器，输入稀疏采样视频帧并使用 3D 位置编码与 attention pooling 建模时空 token",
        "Stage 1 使用 InternVL-6B 与 VideoMAEv2-g 作为语义/运动教师，通过未掩码 token 的 MSE 蒸馏学习基础时空表示",
        "Stage 2 扩展到视频、图像、音频、语音、文本多模态，用跨模态对比、匹配和 masked language modeling 进行统一对齐",
        "Stage 3 通过 Q-Former/Video BLIP 连接 LLM，用视频中心指令数据和 next-token prediction 强化视频问答、描述、长视频推理",
        "数据侧强调时空一致性，构建包含 2M 视频、50M 视频-文本、50M 视频-音频-语音-文本、300M 图文样本的 402M 级训练集合",
        "InternVid2 对视频先做语义切分，再分别生成视频、音频、语音 caption 并融合，减少 clip 描述与真实事件错位",
        "高分辨率后训练把输入切分为多个局部子视频加一个全局子视频，并从 8 帧过渡到 16 帧以增强细粒度与长时序能力"
      ],
      "detail": "<p><img alt=\"InternVideo2 三阶段训练框架\" src=\"https://ar5iv.labs.arxiv.org/html/2403.15377/assets/x2.png\" />\n<em>图：InternVideo2 的整体框架，由未掩码视频 token 重建、多模态对齐、连接 LLM 的 next-token prediction 三个阶段组成。</em></p>\n<p>InternVideo2 的核心不是单独换一个视频编码器，而是把视频基础模型需要的三种能力按训练阶段拆开：第一阶段学低层和中层时空结构，第二阶段把这些结构对齐到文本、音频、语音等语义空间，第三阶段再把视频表示接入大语言模型。这个顺序很关键，因为直接用视频问答数据训练 LLM 接口，容易得到会“说”的模型，却不一定有稳定的视频时空表征；只做 masked video modeling 或 video-text contrastive，又难以支撑开放式对话。</p>\n<p>第一阶段采用“教师蒸馏式”的 masked token reconstruction。学生视频编码器随机初始化，视频 token 中约 80% 被按帧掩码；InternVL-6B 提供多模态语义教师，VideoMAEv2-g 提供运动敏感教师。与传统 MAE 重建像素不同，InternVideo2 对未掩码 token 做特征级对齐，让学生同时靠近图文语义空间和视频运动空间。一个简化目标可以写成：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{stage1}}\n= \\sum_{i \\in \\Omega}\n\\left(\n\\lambda_v \\left\\| P_v h_i - t_i^{\\text{InternVL}} \\right\\|_2^2\n+ \\lambda_m \\left\\| P_m h_i - t_i^{\\text{VideoMAE}} \\right\\|_2^2\n\\right)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\Omega</span> 表示未被掩码的 token 集合，<span class=\"kb-math kb-math-inline\">h_i</span> 是 InternVideo2 编码得到的 token，<span class=\"kb-math kb-math-inline\">P_v,P_m</span> 是训练时使用的投影层。训练结束后这些投影层会被丢弃，只保留基础视频编码器。这种做法的直觉是：用强教师告诉模型“这个可见局部应该是什么语义、属于什么运动模式”，比让 6B 级编码器从像素重建信号中慢慢摸索更高效。</p>\n<p>第二阶段把视频编码器放入更大的多模态对齐系统。视频、图像、音频、语音等输入被映射到与文本可比较的表示空间；音频编码器来自 BEATs，文本/语音侧使用 BERT-Large 结构的编码器和带 cross-attention 的多模态解码器。训练目标由跨模态对比、匹配分类和 masked language modeling 组成：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{stage2}}\n= \\mathcal{L}_{\\text{contrastive}}\n+ \\mathcal{L}_{\\text{matching}}\n+ \\mathcal{L}_{\\text{mlm}}</div>\n<p>对比损失负责把配对的视频/音频/图像与文本拉近，把 batch 内负样本推远：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{contrastive}}\n= -\\frac{1}{B}\\sum_i\n\\log\n\\frac{\\exp(\\operatorname{sim}(z_i^m,z_i^t)/\\tau)}\n{\\sum_j \\exp(\\operatorname{sim}(z_i^m,z_j^t)/\\tau)}</div>\n<p>匹配损失进一步判断输入对是否真实配对，MLM 则要求模型在跨模态上下文中恢复被 mask 的 caption token。论文还把 Stage 2 拆成“masked visual-language-audio alignment”和“unmasked post-pretraining”：前者提高训练效率，后者在较小但更接近推理形态的数据上校准完整 token 表示。</p>\n<p>第三阶段把 InternVideo2 接入 LLM。视频编码器输出先经 Q-Former/Video BLIP 类型连接器压缩和重排，再作为视觉前缀送入语言模型做自回归生成：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{ntp}}\n= -\\sum_{t=1}^{T}\n\\log p_\\theta(y_t \\mid y_{&lt;t}, q(V))</div>\n<p>这里 <span class=\"kb-math kb-math-inline\">q(V)</span> 是 Q-Former 从视频 token 中抽取出的少量查询表示。高分辨率后训练进一步把一个视频拆成最多 6 个局部 224x224 子视频和 1 个全局子视频，第一轮用 8 帧、第二轮用 16 帧；视频编码器与 Q-Former 继续更新，LLM 通过 LoRA 更新。这样既保留局部细节，又避免把所有高分辨率帧直接塞进 LLM 上下文。</p>\n<pre><code class=\"language-python\"># InternVideo2 渐进式训练流程伪代码\nvideo_encoder = VideoViT(scale=&quot;up_to_6B&quot;)\n\n# Stage 1: semantic/motion teacher distillation on unmasked video tokens\nfor video in kmash_videos:\n    frames = sparse_sample(video, num_frames=8)\n    visible_tokens, mask = mask_video_tokens(frames, ratio=0.80)\n    student_tokens = video_encoder(visible_tokens)\n    semantic_targets = internvl_teacher(frames)       # multimodal-friendly semantics\n    motion_targets = videomae_teacher(frames)         # motion-aware representation\n    loss = mse(project_sem(student_tokens), semantic_targets, where=~mask)\n    loss += mse(project_motion(student_tokens), motion_targets, where=~mask)\n    update(video_encoder, loss)\n\n# Stage 2: align video/image/audio/speech to text\nfor batch in multimodal_pairs:\n    z_modality = encode_modality(batch.signal)        # video, image, audio, speech\n    z_text = text_encoder(batch.caption)\n    loss = contrastive_loss(z_modality, z_text)\n    loss += matching_loss(z_modality, z_text, batch.is_pair)\n    loss += masked_lm_loss(multimodal_decoder, batch.caption)\n    update(alignment_modules, loss)\n\n# Stage 3: video-centric instruction tuning with next-token prediction\nfor sample in video_dialogue_data:\n    video_tokens = video_encoder(sample.video)\n    query_tokens = q_former(video_tokens)\n    logits = llm(prefix=query_tokens, text=sample.prompt_and_answer)\n    loss = autoregressive_ce(logits, sample.answer_tokens)\n    update(video_encoder, q_former, lora(llm), loss)\n</code></pre>\n<p>InternVideo2 的数据设计服务于同一个目标：让视频 token 和文字描述在时间上对齐。普通 web video caption 常常只描述整个视频的大意，和具体 clip 的动作并不精确；InternVid2 先按语义边界切分视频片段，再分别根据视觉、音频、语音生成描述，最后融合成更完整的 caption。这样 Stage 2 的对比学习看到的是更干净的“片段-语义”对应关系，减少了长视频中事件错位带来的噪声。</p>\n<p>相对 LLaVA-Video 一类主要把现成视觉编码器接到 LLM 的方法，InternVideo2 更强调“先把视频编码器做成基础模型”。它在 Stage 1/2 中学习可迁移的视频表征，再在 Stage 3 中获得对话能力；因此同一个编码器既能用于动作识别、时序定位、视频检索、音频相关任务，也能作为视频对话模型的感知底座。代价是训练系统更重、数据工程更复杂，但好处是能力不局限在单一指令微调任务上。</p>\n<div class=\"key-point\">💡 关键：InternVideo2 的“scale”不只是参数规模扩大，而是模型、数据和目标函数同时扩展；三阶段分别解决感知、对齐和生成三个瓶颈。</div>",
      "quiz": {
        "q": "InternVideo2 在 Stage 1 同时使用 InternVL-6B 和 VideoMAEv2-g 作为教师，主要目的是什么？",
        "options": [
          "让学生模型只学习静态图像分类能力",
          "同时注入多模态语义知识和运动敏感的视频表示",
          "避免 Stage 2 使用任何文本数据",
          "把 LLM 参数完全冻结，从而不需要指令微调"
        ],
        "answer": 1,
        "explain": "InternVL-6B 更偏语义和图文对齐，VideoMAEv2-g 更偏视频运动结构；二者共同蒸馏能让视频编码器同时具备语义友好性和时序敏感性。"
      }
    },
    {
      "id": "videollama3",
      "num": 24,
      "name": "VideoLLaMA 3",
      "fullName": "视觉中心架构 (VideoLLaMA 3)",
      "year": "2025",
      "org": "Alibaba",
      "parent": "videollama",
      "paperUrl": "https://github.com/DAMO-NLP-SG/VideoLLaMA3",
      "projectUrl": "",
      "category": "video_llm",
      "motivation": "动态分辨率视觉编码",
      "summary": "VideoLLaMA 3 提出视觉中心的图像/视频 MLLM 框架，用任意分辨率视觉 token 化和差分帧剪枝解决固定分辨率编码、视频 token 冗余和图像能力向视频迁移不足的问题。",
      "keyPoints": [
        "采用 SigLIP 视觉编码器、两层 MLP projector、DiffFP 视频压缩器和 Qwen2.5 系列 LLM 构成统一图像/视频理解模型",
        "提出 Any-resolution Vision Tokenization (AVT)，用 2D-RoPE 替换 ViT 绝对位置编码，使视觉编码器处理动态分辨率与非常规长宽比",
        "提出 Differential Frame Pruner (DiffFP)，在像素 patch 空间比较相邻帧 1-norm 差异，剪除低变化区域的视觉 token",
        "采用四阶段视觉中心训练：Vision Encoder Adaptation、Vision-Language Alignment、Multi-task Fine-tuning、Video-centric Fine-tuning",
        "构建 VL3-Syn7M，从 COYO-700M 经宽高比过滤、美学过滤、图文相似度过滤、KNN 多样性选择和 InternVL2 重标注得到 7M 高质量图文对",
        "把高质量图像-文本数据作为视频理解基础，先强化 OCR、文档、图表、数学等图像能力，再用视频数据补齐时序理解",
        "在图像和视频基准上同时保持强性能，避免许多视频 LLM 只提升视频任务但牺牲高分辨率图像理解的问题"
      ],
      "detail": "<p><img alt=\"VideoLLaMA 3 总体流水线\" src=\"https://ar5iv.labs.arxiv.org/html/2501.13106v2/assets/x3.png\" />\n<em>图：VideoLLaMA 3 的整体框架，核心包含 AVT、DiffFP、高质量图像重标注数据和四阶段训练。</em></p>\n<p>VideoLLaMA 3 的“视觉中心”有两层含义。训练上，它认为视频本质上是时间相关的图像序列，因此应先把图像理解底座做强，再迁移到视频；架构上，它把视觉编码器改造成可接收任意分辨率输入的 tokenizer，并为视频增加 token 压缩器。这个取向与只在视频指令数据上继续微调的做法不同：模型先获得文档、图表、场景文字和细粒度视觉定位能力，再学习跨帧动态关系。</p>\n<p>AVT 解决的是固定分辨率 ViT 的信息损失问题。传统 SigLIP/CLIP 类 ViT 通常绑定预训练分辨率和绝对位置编码，输入高分辨率文档或极端长宽比图像时，要么缩放导致文字模糊，要么切块后失去原图空间关系。VideoLLaMA 3 将绝对位置编码替换为二维 RoPE，让 patch token 的位置由其二维坐标决定：</p>\n<div class=\"kb-math kb-math-display\">N(H,W)=\\left\\lceil \\frac{H}{P} \\right\\rceil\n\\left\\lceil \\frac{W}{P} \\right\\rceil</div>\n<div class=\"kb-math kb-math-display\">\\operatorname{AVT}(I)\n= \\left\\{ \\operatorname{ViT}_{\\text{2D-RoPE}}(x_{u,v}, u, v)\n\\mid 1 \\le u \\le H/P,\\ 1 \\le v \\le W/P \\right\\}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">P</span> 是 patch 大小，<span class=\"kb-math kb-math-inline\">(u,v)</span> 是 patch 在原图网格中的二维位置。这样，视觉 token 数量会随图像大小自然变化，而不是被压到固定长度；LLM 接收到的是更接近原始图像结构的 token 序列。Stage 1 专门训练视觉编码器和 projector，让 SigLIP 从固定分辨率编码器适配为动态分辨率处理器。</p>\n<p><img alt=\"VideoLLaMA 3 DiffFP 流程\" src=\"https://ar5iv.labs.arxiv.org/html/2501.13106v2/assets/x4.png\" />\n<em>图：DiffFP 在像素空间比较相邻帧 patch 差异，剪除变化很小的后续 patch token。</em></p>\n<p>视频输入的瓶颈不只是分辨率，还有 token 冗余。若把每帧都按 AVT 展开，长视频会产生大量静态背景 token。DiffFP 的策略很直接：先在像素空间比较相邻帧同位置 patch 的 1-norm 距离，若小于阈值 <span class=\"kb-math kb-math-inline\">\\tau=0.1</span>，说明该 patch 相对上一帧变化很小，后续帧对应 token 可以剪除：</p>\n<div class=\"kb-math kb-math-display\">d_{t,p}=\\left\\| \\operatorname{patch}(F_t,p)-\\operatorname{patch}(F_{t-1},p) \\right\\|_1</div>\n<div class=\"kb-math kb-math-display\">m_{t,p}=\\mathbb{1}[d_{t,p}\\ge \\tau]</div>\n<p>论文还在视觉编码后对视频 token 做每帧 <span class=\"kb-math kb-math-inline\">2 \\times 2</span> 空间下采样，以控制上下文长度。DiffFP 的好处是决策发生在便宜的像素 patch 差分上，不需要额外训练一个复杂剪枝网络；同时它保留运动和画面变化显著的区域，让 LLM 更关注动态信息。</p>\n<pre><code class=\"language-python\"># VideoLLaMA 3 AVT + DiffFP 视觉编码流程伪代码\ndef encode_image_or_video(input):\n    if input.type == &quot;image&quot;:\n        patches = patchify_with_original_grid(input.image)\n        # 2D-RoPE uses patch coordinates instead of fixed absolute embeddings\n        visual_tokens = siglip_vit_2d_rope(patches, coords=patches.coords)\n        return projector(visual_tokens)\n\n    kept_tokens = []\n    previous_frame = None\n    for frame in sample_frames(input.video, fps=1, max_frames=MAX_FRAMES):\n        patches = patchify_with_original_grid(frame)\n        frame_tokens = siglip_vit_2d_rope(patches, coords=patches.coords)\n        frame_tokens = bilinear_downsample_tokens(frame_tokens, scale=2)\n\n        if previous_frame is None:\n            keep_mask = ones_like_patch_grid(frame)\n        else:\n            diff = l1_patch_distance(frame, previous_frame)\n            keep_mask = diff &gt;= 0.1\n\n        kept_tokens.append(frame_tokens[keep_mask])\n        previous_frame = frame\n\n    return projector(concat(kept_tokens))\n</code></pre>\n<p>四阶段训练把这些模块逐步接起来。第一阶段 Vision Encoder Adaptation 只训练视觉编码器和 projector，冻结语言模型，使动态分辨率视觉 token 能对齐到 LLM 表示空间；第二阶段 Vision-Language Alignment 解冻全部参数，用大规模图文、文档、图表、文字识别和少量 text-only 数据注入多模态知识；第三阶段 Multi-task Fine-tuning 加入图像问答和视频 caption/QA 数据，并开始使用视频压缩器；第四阶段 Video-centric Fine-tuning 聚焦通用视频、流式视频和 temporal grounding 等视频任务，同时保留图像和文本数据避免能力遗忘。</p>\n<p>VL3-Syn7M 是这套训练策略的关键数据资产。它不是简单从 COYO-700M 抽样，而是先去掉极端比例和低审美图像，再用 BLIP2 粗 caption 与 CLIP 相似度过滤图文不匹配样本，接着用 CLIP 视觉特征做 KNN 聚类以保证语义多样性，最后用 InternVL2-8B/26B 生成短描述和详细描述。短 caption 更适合早期视觉适配，详细 caption 更适合视觉-语言对齐。数据量从 700M 压到 7M，目的不是覆盖所有噪声，而是让每个样本的视觉细节和文本监督更可靠。</p>\n<p>相对 VideoLLaMA/VideoLLaMA 2，VideoLLaMA 3 的变化在于把“视频模型”重新定义成“强图像模型 + 视频高效压缩 + 视频专项微调”。这解释了它为什么同时重视 DocVQA、ChartQA、MathVista 等图像基准和 VideoMME、MLVU、LongVideoBench 等视频基准：如果视觉编码器不能保留高分辨率细节，视频问答中的文字、图表、远处物体和细粒度动作也会丢失。</p>\n<div class=\"key-point\">💡 关键：AVT 解决“看清楚不同尺寸画面”，DiffFP 解决“不要把静止背景反复塞给 LLM”；两者共同把视觉 token 预算花在更有信息量的位置上。</div>",
      "quiz": {
        "q": "VideoLLaMA 3 中 DiffFP 剪除视频 token 的依据是什么？",
        "options": [
          "LLM 对每个 token 的注意力权重是否小于均值",
          "相邻帧同位置 patch 在像素空间的 1-norm 差异是否低于阈值",
          "文本问题中是否出现动作相关动词",
          "视觉编码器最后一层 token 的通道数是否过大"
        ],
        "answer": 1,
        "explain": "DiffFP 在像素空间比较相邻帧 patch 差异，低于默认阈值 0.1 的后续 patch 被视为冗余并剪除。"
      }
    },
    {
      "id": "hmt",
      "num": 25,
      "name": "HMT",
      "fullName": "层次多模态Transformer (Hierarchical Multimodal Transformer)",
      "year": "2022",
      "org": "—",
      "parent": "dsnet",
      "paperUrl": "https://www.sciencedirect.com/science/article/pii/S0925231221015253",
      "projectUrl": "",
      "category": "frontier_2026",
      "motivation": "层次化融合视觉与音频",
      "summary": "HMT 提出用于关键镜头视频摘要的层次多模态 Transformer，把视频的 frame-shot-video 结构和视觉/音频双模态融合进两层注意力网络，解决 RNN 摘要模型难以建模全局依赖、多跳关系和音画互补信息的问题。",
      "keyPoints": [
        "面向 key-shot based video summarization，输出每个 shot 被选入摘要的概率，再用长度约束选择关键镜头",
        "用 KTS 将长视频切成 shot，并按照相同边界切分音频，使输入符合 frame-shot-video 的天然层次结构",
        "第一层为 frame-level Transformer：视觉分支独立编码每个 shot 内帧序列，音频分支在视觉 query 指导下编码音频特征",
        "第二层为 shot-level multimodal Transformer：把每个 shot 的视觉向量和视觉引导音频向量拼接后建模全局 shot 依赖",
        "采用多头注意力捕获全局依赖和多跳关系，相比 LSTM 更适合并行处理长序列",
        "使用 MSE 拟合人工标注的重要性分数，预测 shot 概率后扩展到 frame-level 评价",
        "在 SumMe 和 TVsum 上验证层次结构、视觉引导音频融合和完整 HMT 均带来增益"
      ],
      "detail": "<p><img alt=\"HMT 层次多模态 Transformer 架构\" src=\"https://ar5iv.labs.arxiv.org/html/2109.10559/assets/x1.png\" />\n<em>图：HMT 第一层由视觉 Transformer 与视觉引导的音频 Transformer 组成，第二层用多模态 Transformer 建模 shot 间关系并预测摘要概率。</em></p>\n<p>HMT 的任务是从一段长视频中选择能代表主要内容的关键镜头。早期视频摘要常把帧序列当作一条平坦时间序列，用 LSTM 或注意力直接预测 frame score；问题是视频通常由多个 shot 构成，同一个 shot 内帧变化平滑，不同 shot 之间才体现事件结构。HMT 因此先用 Kernel-based Temporal Segmentation (KTS) 切分 shot，再分别建模 shot 内 frame 依赖和 shot 间全局依赖。</p>\n<p>第一层 frame-level Transformer 对每个 shot 单独运行。视觉分支接收 GoogLeNet pool-5 提取的帧特征，得到 shot 内帧的上下文表示，再通过 mean pooling 得到视觉 shot 表示。标准自注意力写作：</p>\n<div class=\"kb-math kb-math-display\">Q=XW_Q,\\quad K=XW_K,\\quad V=XW_V</div>\n<div class=\"kb-math kb-math-display\">\\operatorname{Attn}(Q,K,V)\n=\\operatorname{softmax}\\left(\\frac{QK^\\top}{\\sqrt{d}}\\right)V</div>\n<p>多头版本在不同子空间并行计算注意力，再拼接并线性映射。它比 LSTM 更适合摘要任务，因为任意两帧或两个 shot 可直接建立联系，不必依赖递归状态逐步传递。</p>\n<p>音频分支不是简单把 VGGish 音频特征和视觉特征拼接，而是用视觉特征作为 query、音频特征作为 key/value 做视觉引导的跨模态注意力：</p>\n<div class=\"kb-math kb-math-display\">H_i^a\n=\\operatorname{softmax}\n\\left(\\frac{Q_i^v (K_i^a)^\\top}{\\sqrt{d}}\\right)V_i^a</div>\n<p>这样设计的原因是音频和画面并不总是严格同步：画面中可能没有发声物体，背景音乐也可能与视觉事件弱相关。视觉 query 相当于询问“当前 shot 的视觉内容需要哪些音频证据”，让模型更关注与画面一致或互补的音频片段，降低直接拼接带来的模态干扰。</p>\n<p>第一层完成后，每个 shot 得到视觉向量 <span class=\"kb-math kb-math-inline\">s_i^v</span> 和音频向量 <span class=\"kb-math kb-math-inline\">s_i^a</span>，二者拼接为多模态 shot 表示：</p>\n<div class=\"kb-math kb-math-display\">z_i=[s_i^v; s_i^a]</div>\n<p>第二层 shot-level Transformer 接收 <span class=\"kb-math kb-math-inline\">\\{z_1,\\dots,z_N\\}</span>，建模整个视频中的 shot 间关系，最后用一个预测头输出每个 shot 的选择概率：</p>\n<div class=\"kb-math kb-math-display\">H^s=\\operatorname{Transformer}_{\\text{shot}}(z_1,\\dots,z_N)</div>\n<div class=\"kb-math kb-math-display\">p_i=\\sigma(Wh_i^s+b)</div>\n<p>训练时将 shot 概率扩展回帧级概率，与人工重要性分数做均方误差：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{MSE}}\n=\\frac{1}{T}\\sum_{t=1}^{T}\n\\left(\\hat{p}_t-y_t\\right)^2</div>\n<p>推理时，模型先得到每个 shot 的重要性，再在摘要长度不超过原视频 15% 的约束下，用动态规划把选择问题转成 knapsack，选出得分最高的一组关键 shot。这一点很实用：模型不需要逐帧生成摘要，而是输出可排序、可约束优化的概率曲线。</p>\n<pre><code class=\"language-python\"># HMT 视频摘要流程伪代码\ndef hmt_summarize(video):\n    frames = sample_frames(video, fps=2)\n    visual_feats = googlenet_pool5(frames)          # [T, 1024]\n    audio_feats = vggish(segment_audio(video))      # [T_audio, 128]\n\n    shot_boundaries = kts(frames)\n    visual_shots = split_by_boundaries(visual_feats, shot_boundaries)\n    audio_shots = split_by_boundaries(audio_feats, shot_boundaries)\n\n    shot_tokens = []\n    for v_seq, a_seq in zip(visual_shots, audio_shots):\n        v_context = visual_transformer(v_seq)\n        v_shot = mean_pool(v_context)\n\n        # audio is encoded under visual guidance\n        q = linear_q(v_context)\n        k = linear_k(a_seq)\n        value = linear_v(a_seq)\n        a_context = softmax(q @ k.T / sqrt(dim)) @ value\n        a_shot = mean_pool(a_context)\n\n        shot_tokens.append(concat(v_shot, a_shot))\n\n    global_context = shot_transformer(shot_tokens)\n    shot_scores = sigmoid(linear(global_context))\n    summary = knapsack_select(shot_scores, max_duration=0.15 * video.duration)\n    return summary\n</code></pre>\n<p>HMT 的消融结果说明了三个组件的作用：单模态 Transformer 已经优于对应 LSTM，说明全局注意力对视频摘要有效；直接两流拼接的 Two-stream Transformer 反而可能不如视觉 Transformer，说明音画模态差异会引入噪声；加入视觉引导的 Multimodal Transformer 后性能提升，说明跨模态融合需要显式对齐。完整 HMT 再叠加层次结构，在 SumMe 和 TVsum 的 F-measure 上分别达到 0.441 和 0.601。</p>\n<p>与 DSNet 这类 detect-to-summarize 思路相比，HMT 更强调输入结构与模态结构：它没有把摘要看成独立 proposal 检测问题，而是先尊重 shot 边界，再在 shot 内和 shot 间分别建模。它的优势是结构清晰、可解释性较强，能展示每个 shot 的概率曲线；局限是依赖预提取视觉/音频特征和 KTS 边界，且论文也指出音画异步和局部 object-aware 特征仍未充分解决。</p>\n<div class=\"key-point\">💡 关键：HMT 的多模态融合不是“视觉 + 音频直接拼接”，而是先用视觉引导音频注意力，再把 shot 级音画表示送入第二层全局 Transformer。</div>",
      "quiz": {
        "q": "HMT 为什么要采用两层层次结构，而不是把所有帧直接输入一个 Transformer？",
        "options": [
          "因为视频摘要只需要音频，不需要视觉帧信息",
          "因为视频天然具有 frame-shot-video 结构，先建模 shot 内帧关系再建模 shot 间关系更符合任务",
          "因为 Transformer 只能处理固定长度为 1 的序列",
          "因为 KTS 会直接给出最终摘要，不需要模型预测"
        ],
        "answer": 1,
        "explain": "HMT 先用 frame-level Transformer 得到每个 shot 的表示，再用 shot-level Transformer 捕获全局 shot 依赖，既符合视频层次结构，也降低长序列建模负担。"
      }
    },
    {
      "id": "lvsum",
      "num": 26,
      "name": "LVSum",
      "fullName": "长视频摘要基准 (Long Video Summarization)",
      "year": "2026",
      "org": "—",
      "parent": "hmt",
      "paperUrl": "https://arxiv.org/abs/2604.10024",
      "projectUrl": "",
      "category": "frontier_2026",
      "motivation": "时间戳感知长视频摘要",
      "summary": "LVSum 提出了一个带时间戳、区间级重要性分数和多人工参考的长视频摘要基准，用来评估 MLLM 是否既能选中重要片段，又能生成与视频/音频内容一致的摘要描述。",
      "keyPoints": [
        "构建 72 个长视频样本，覆盖 13 个类别，视频时长 10-55 分钟，平均约 16 分钟。",
        "每个视频最多包含 10 份独立人工摘要，标注内容包括开始/结束时间戳、片段描述和 1-3 的重要性分数。",
        "标注流程要求总摘要区间长度控制在视频时长约 15% 以内，强调压缩能力而不是简单覆盖。",
        "评测在秒级时间轴上计算 Kendall's <span class=\"kb-math kb-math-inline\">\\tau</span> 与 Spearman's <span class=\"kb-math kb-math-inline\">\\rho</span>，比帧级 F1 更适合长视频摘要排序。",
        "引入 Content Relevance (CR) 与 Modality Coherence (MC) 两个 MLLM-as-Judge 指标，分别衡量语义覆盖与跨模态一致性。",
        "对 Opus-4.5、Gemini-2.5-Pro、Qwen3-VL-235B 等代表性 MLLM 进行系统评测，暴露过度覆盖、时间错位和跨模态幻觉三类失败模式。"
      ],
      "detail": "<p><img alt=\"LVSum CR/MC 失败模式示意\" src=\"https://arxiv.org/html/2604.10024v1/figs/failure_modes_metrics_3.png\" />\n<em>图：LVSum 论文中的失败模式示例，展示低 Content Relevance 与低 Modality Coherence 对传统排序指标的补充价值。</em></p>\n<p>LVSum 的核心不是提出新的摘要模型，而是把“长视频摘要”重新定义为带时间戳的 V2VT 评测问题：输入是视频及其转录文本，输出是若干个时间区间及对应描述。一个预测摘要可以写成</p>\n<div class=\"kb-math kb-math-display\">\\hat{S}=\\{(\\hat{s}_i,\\hat{e}_i,\\hat{d}_i,\\hat{r}_i)\\}_{i=1}^{M},\\qquad\n\\sum_i(\\hat{e}_i-\\hat{s}_i)\\le 0.15\\,T</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\hat{s}_i,\\hat{e}_i</span> 是秒级边界，<span class=\"kb-math kb-math-inline\">\\hat{d}_i</span> 是片段描述，<span class=\"kb-math kb-math-inline\">\\hat{r}_i</span> 是模型给出的重要性或排序信号，<span class=\"kb-math kb-math-inline\">T</span> 是视频总时长。这个约束很关键：如果没有 15% 左右的长度预算，模型可以把大量片段都放进摘要，从而在语义覆盖上看似更好，但失去“摘要”的压缩意义。</p>\n<pre><code class=\"language-python\"># LVSum 数据构建与评测流程伪代码\nvideos = crawl_web_videos(min_duration_minutes=10)\ncategory_labels = gemini_label_open_categories(videos)\ntaxonomy = gemini_cluster_to_13_categories(category_labels)\nsampled = weighted_sample(videos, taxonomy, target_count=100)\n\nlvsum = []\nfor video in sampled:\n    if contains_sensitive_content(video) or violates_usage_restriction(video):\n        continue\n    annotations = []\n    for annotator in independent_annotators(max_count=10):\n        segments = annotator.watch_and_mark_segments(\n            video,\n            fields=[&quot;start&quot;, &quot;end&quot;, &quot;description&quot;, &quot;importance_1_to_3&quot;],\n            length_budget_ratio=0.15,\n        )\n        if passes_manual_review(segments):\n            annotations.append(segments)\n    lvsum.append((video, annotations))\n\nfor model in evaluated_mllms:\n    pred = model.summarize(video_frames_96, timestamped_transcript)\n    saliency_pred = convert_segments_to_second_level_scores(pred)\n    saliency_ref = aggregate_human_second_level_scores(annotations)\n    tau = kendall_tau(saliency_pred, saliency_ref)\n    rho = spearman_rho(saliency_pred, saliency_ref)\n    cr = mllm_judge_content_relevance(pred, annotations)\n    mc = mllm_judge_modality_coherence(pred, video_audio_intervals=pred)\n</code></pre>\n<p>数据集构建先从约 4000 个至少 10 分钟的视频开始，用 Gemini-2.5-Pro 给视频打开放式语义标签，再聚类成 13 个高层类别，并按类别分布进行加权采样。这个设计保留了真实长视频内容的长尾分布，同时避免只用均匀采样导致热门类别被过度代表。最终 100 个候选里，11 个因敏感或可识别内容被过滤，17 个因来源站点使用限制变化被移除，保留 72 个视频。</p>\n<p>人工标注协议强调“先理解完整叙事，再选择关键区间”。标注者需要看完整视频，重看片段，记录开始/结束时间、简短描述和 1-3 重要性分数，并反复调整到总长度预算内。这与传统关键帧摘要不同：LVSum 监督的是连续时间区间，模型必须判断事件范围，而不是只挑单帧或生成无边界文本。</p>\n<p>评测上，LVSum 将人工标注与模型预测都映射成秒级 saliency 序列，再计算 Kendall's <span class=\"kb-math kb-math-inline\">\\tau</span> 和 Spearman's <span class=\"kb-math kb-math-inline\">\\rho</span>。两者关注排序一致性：</p>\n<div class=\"kb-math kb-math-display\">\\rho = \\operatorname{corr}(\\operatorname{rank}(y), \\operatorname{rank}(\\hat{y}))</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">y</span> 是人工重要性序列，<span class=\"kb-math kb-math-inline\">\\hat{y}</span> 是模型预测重要性序列。论文采用秒级粒度而非短视频基准常见的帧级粒度，是因为 MLLM 的输出边界通常以秒为单位，过细的帧级评价会放大无意义的微小偏差。</p>\n<p>CR 与 MC 解决的是排序指标看不到的问题。CR 评估生成摘要是否覆盖了参考摘要中的关键事件、对象和结果；MC 则检查模型在某个预测时间区间内写出的描述是否真的被该区间的视频帧、语音或声音支持。两者都按 1-5 分打分，直觉上可以写成：</p>\n<div class=\"kb-math kb-math-display\">\\operatorname{MC}(\\hat{S})=\\frac{1}{M}\\sum_{i=1}^{M}\n\\operatorname{Judge}(\\hat{d}_i,\\;V_{\\hat{s}_i:\\hat{e}_i},\\;A_{\\hat{s}_i:\\hat{e}_i})</div>\n<p>这能惩罚一种常见 MLLM 失败：模型选中了看似合理的时间段，文字也通顺，但文字说的人物、动作或声音并不在对应视频区间里。论文的实验证明，当前强 MLLM 往往已有较强语义理解，但仍会出现过度覆盖、时间压缩不足、描述与真实片段不一致等问题。</p>\n<div class=\"key-point\">💡 关键：LVSum 的价值在于把“摘要质量”拆成时间排序、内容相关性、跨模态一致性和长度约束四个维度；这比只看 F1 或 rank correlation 更接近真实长视频摘要需求。</div>",
      "quiz": {
        "q": "LVSum 引入 Modality Coherence (MC) 的主要目的是什么？",
        "options": [
          "衡量预测摘要区间的文字描述是否被对应视频/音频内容支持",
          "计算模型摘要与人工摘要之间的词面 BLEU 分数",
          "增加模型输入帧数以提升视觉分辨率",
          "用随机区间替代人工时间戳以降低标注成本"
        ],
        "answer": 0,
        "explain": "MC 专门评估生成描述与预测时间区间内视觉/音频证据的一致性，用来发现跨模态幻觉和时间-描述错配。"
      }
    },
    {
      "id": "hitea",
      "num": 27,
      "name": "HiTeA",
      "fullName": "层次时序对齐 (Hierarchical Temporal Alignment)",
      "year": "2026",
      "org": "ICLR",
      "parent": "univtg",
      "paperUrl": "https://iclr.cc/virtual/2026/poster/HiTeA",
      "projectUrl": "",
      "category": "frontier_2026",
      "motivation": "无需训练的层次化定位框架",
      "summary": "HiTeA 提出一个完全 training-free 的长视频时序定位框架，通过事件、场景、动作三层时间分解生成候选片段，再用冻结 VLM 打分和候选精炼完成自然语言查询到时间区间的定位。",
      "keyPoints": [
        "无需任务标注、无需微调，直接组合冻结的特征提取器、VideoCLIP 与 VLM 完成 zero-shot temporal grounding。",
        "Hierarchical Temporal Decomposition (HTD) 将视频拆成 event、scene、action 三种粒度，显式建模长视频层次结构。",
        "Temporal Signal Construction 使用 ViT 表示语义事件、DINO 表示场景/镜头变化、RAFT 光流表示动作边界。",
        "边界检测采用事件级局部极小值阈值与场景/动作级 PELT change point detection。",
        "长视频启用 hierarchical merging，保证 event ⊃ scene ⊃ action 的包含关系；短视频可绕过该约束以保留候选多样性。",
        "两阶段候选打分：先用 VideoCLIP 粗过滤与相邻段合并，再用冻结 VLM 做 query-conditioned 细粒度相似度评分。",
        "Candidate Refinement 通过分数融合、跨层 progressive merging 和排名输出最终时间段。"
      ],
      "detail": "<p><img alt=\"HiTeA ICLR 2026 官方海报\" src=\"https://iclr.cc/media/PosterPDFs/ICLR%202026/10006820.png?t=1775547230.391188\" />\n<em>图：ICLR 2026 官方 poster，展示 HiTeA 的层次分解、候选评分与候选精炼流程。</em></p>\n<p>HiTeA 针对的是训练无关的长视频 temporal grounding：给定未裁剪视频 <span class=\"kb-math kb-math-inline\">V=\\{f_1,\\ldots,f_T\\}</span> 和查询 <span class=\"kb-math kb-math-inline\">Q</span>，输出与查询语义最匹配的时间区间 <span class=\"kb-math kb-math-inline\">(\\hat{t}_s,\\hat{t}_e)</span>。它的核心判断是：VLM 很擅长判断“发生了什么”，但不天然擅长“什么时候发生”；因此先用显式时间结构生成高质量候选，再把 VLM 用在候选排序上。</p>\n<pre><code class=\"language-python\"># HiTeA training-free temporal grounding 伪代码\ndef hitea_ground(video, query, is_long_video=True):\n    vit_feat = frozen_vit(video.frames)          # event-aware semantic context\n    dino_feat = frozen_dino(video.frames)        # scene/shot transitions\n    flow_feat = frozen_raft(video.frame_pairs)   # action/motion dynamics\n\n    event_curve = cosine_to_current_segment_mean(vit_feat)\n    scene_curve = cosine_consecutive(dino_feat)\n    action_curve = -l2_norm(flow_feat)\n\n    event_points = local_minima(event_curve, threshold=&quot;tau_k&quot;)\n    scene_points = pelt_change_points(scene_curve)\n    action_points = pelt_change_points(action_curve)\n\n    if is_long_video:\n        scene_points = hierarchical_merge(event_points, scene_points, tolerance=&quot;alpha&quot;)\n        action_points = hierarchical_merge(scene_points, action_points, tolerance=&quot;alpha&quot;)\n\n    candidates = build_segments([event_points, scene_points, action_points])\n    clip_scores = videoclip_similarity(candidates, query)\n    candidates = merge_adjacent_if_score_close(candidates, clip_scores, beta=&quot;beta&quot;)\n    candidates = top_k_per_level(candidates, clip_scores)\n\n    vlm_scores = frozen_vlm_score(candidates, query)\n    final_scores = lambda_ * vlm_scores + (1 - lambda_) * normalize(clip_scores)\n    refined = progressive_merge_across_levels(candidates, final_scores)\n    return argmax(refined, key=&quot;final_score&quot;)\n</code></pre>\n<p>第一步是构造三类互补的时间信号。对每一帧 <span class=\"kb-math kb-math-inline\">f_t</span>，HiTeA 用冻结编码器抽取特征：</p>\n<div class=\"kb-math kb-math-display\">v_t^{\\text{vit}}=\\phi_{\\text{ViT}}(f_t),\\quad\nv_t^{\\text{dino}}=\\phi_{\\text{DINO}}(f_t),\\quad\nv_t^{\\text{flow}}=\\phi_{\\text{RAFT}}(f_t,f_{t+1})</div>\n<p>然后分别构造事件、场景、动作级相似度曲线：</p>\n<div class=\"kb-math kb-math-display\">s_t^{\\text{event}}=\n\\frac{v_t^{\\text{vit}}\\cdot \\bar{v}_{t-1}^{\\text{vit}}}\n{\\|v_t^{\\text{vit}}\\|\\|\\bar{v}_{t-1}^{\\text{vit}}\\|},\\quad\ns_t^{\\text{scene}}=\n\\frac{v_t^{\\text{dino}}\\cdot v_{t-1}^{\\text{dino}}}\n{\\|v_t^{\\text{dino}}\\|\\|v_{t-1}^{\\text{dino}}\\|},\\quad\ns_t^{\\text{action}}=-\\|v_t^{\\text{flow}}\\|_2</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\bar{v}_{t-1}^{\\text{vit}}</span> 是当前事件段内历史 ViT 特征均值。事件级信号关注长程语义转折，场景级信号关注镜头/结构变化，动作级信号则通过光流强度捕捉短时动作边界。论文还对这些曲线做 Gaussian smoothing，以降低噪声。</p>\n<p>HTD 的关键是“先粗后细”的候选边界组织。事件级边界来自相似度曲线低于阈值的局部极小值，场景级和动作级边界用 PELT 检测非线性分布变化。长视频中，HiTeA 用合并函数 <span class=\"kb-math kb-math-inline\">M(\\cdot)</span> 把高层边界注入低层边界：如果高层边界附近 <span class=\"kb-math kb-math-inline\">\\alpha</span> 容差内已有低层边界，就用高层边界替换最近点；否则插入高层边界。这样能让 action segment 不脱离 scene/event 的上位结构。</p>\n<p>候选评分分成粗过滤和细评分。VideoCLIP 先计算候选片段与查询的粗相似度 <span class=\"kb-math kb-math-inline\">s_{\\text{clip}}</span>，并把相邻且分数接近的候选合并：</p>\n<div class=\"kb-math kb-math-display\">|s_{\\text{clip}}^i-s_{\\text{clip}}^j|&lt;\\beta</div>\n<p>这样可以减少碎片化并降低 VLM 调用成本。随后冻结 VLM 对保留候选打分得到 <span class=\"kb-math kb-math-inline\">s_{\\text{vlm}}</span>。最终分数融合为：</p>\n<div class=\"kb-math kb-math-display\">s_{\\text{final}}=\\lambda s_{\\text{vlm}}+(1-\\lambda)s_{\\text{clip}}</div>\n<p>这里 <span class=\"kb-math kb-math-inline\">s_{\\text{vlm}}</span> 负责语义对齐，归一化后的 <span class=\"kb-math kb-math-inline\">s_{\\text{clip}}</span> 提供连续分值来打破 VLM 离散打分导致的并列。最后 Candidate Refinement 会跨 action、scene、event 候选做 progressive merging，把时间上接近且语义分数一致的候选整合成更稳定的预测，并输出：</p>\n<div class=\"kb-math kb-math-display\">(\\hat{t}_s,\\hat{t}_e)=\\arg\\max_{c_i\\in S_{\\text{final}}} s_{\\text{final}}^{(i)}</div>\n<div class=\"key-point\">💡 关键：HiTeA 的创新不在于训练更大的定位器，而在于把长视频的时间结构显式暴露给冻结 VLM，使其只需要判断候选片段和查询的语义匹配。</div>",
      "quiz": {
        "q": "HiTeA 中 HTD 模块的核心作用是什么？",
        "options": [
          "用事件、场景、动作三层边界生成结构化候选片段",
          "用监督标注训练一个新的 DETR 定位网络",
          "将所有视频统一裁成固定长度并随机采样",
          "只依赖语言模型生成时间戳，不使用视觉特征"
        ],
        "answer": 0,
        "explain": "HTD 通过多层时间信号和层次合并构造 event/scene/action 候选，为后续 VideoCLIP 与 VLM 打分提供显式时间结构。"
      }
    },
    {
      "id": "unitime",
      "num": 28,
      "name": "UniTime",
      "fullName": "通用时序定位 (Universal Video Temporal Grounding)",
      "year": "2026",
      "org": "NeurIPS",
      "parent": "moment_detr",
      "paperUrl": "https://nips.cc/virtual/2025/poster/UniTime",
      "projectUrl": "",
      "category": "frontier_2026",
      "motivation": "时间戳token实现零样本泛化",
      "summary": "UniTime 将时间戳作为文本 token 插入视频 token 序列，让生成式 MLLM 直接读出查询对应的时间边界，并通过自适应帧缩放与粗到细推理实现跨短视频、长视频和复杂查询的通用时序定位。",
      "keyPoints": [
        "把 temporal grounding 表述为生成式 MLLM 输出时间边界的问题，而不是固定检测头回归边界。",
        "Timestamp-interleaved sequence 在每帧或每段视频 token 前插入可读时间戳文本，使模型通过语言空间引用时间。",
        "Adaptive Frame Scaling 根据视频帧数动态分配每帧 token 预算，短视频保留高空间分辨率，长视频压缩 token 或切分处理。",
        "支持 multi-scale prediction：长视频先做粗粒度片段检索，再在候选区域内做细粒度边界细化。",
        "用 autoregressive loss 训练模型只生成目标答案 token，格式类似 “From <span class=\"kb-math kb-math-inline\">s</span> seconds to <span class=\"kb-math kb-math-inline\">e</span> seconds”。",
        "Video-centric training 将同一视频的多个 query-answer 对合并到一次输入中，减少长视频重复编码和 I/O 开销。",
        "在 Ego4D-NLQ、TACoS、Charades-STA、QVHighlights、ANet-Captions 等时序定位基准以及长视频 VideoQA 中验证泛化能力。"
      ],
      "detail": "<p><img alt=\"UniTime 框架图\" src=\"https://arxiv.org/html/2506.18883v1/x2.png\" />\n<em>图：UniTime 的自适应帧缩放、粗到细时序定位和 timestamp-interleaved sequence 架构。</em></p>\n<p>UniTime 的问题定义是：给定未裁剪视频 <span class=\"kb-math kb-math-inline\">\\mathcal{V}=\\{f_1,\\ldots,f_{N_f}\\}</span>、采样时间戳集合 <span class=\"kb-math kb-math-inline\">\\mathcal{T}=\\{t_1,\\ldots,t_{N_f}\\}</span> 和自由文本查询 <span class=\"kb-math kb-math-inline\">\\mathcal{Q}</span>，输出一个或多个匹配查询的时间段：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{Y}=\\{(s_1,e_1),\\ldots,(s_K,e_K)\\}\n=\\Phi_{\\text{UniTime}}(\\mathcal{V},\\mathcal{T},\\mathcal{Q})</div>\n<p>与传统 DETR/dual-encoder 类方法不同，UniTime 不让模型预测连续坐标，而是让 MLLM 从插入的 timestamp token 中“读出”边界。这降低了时序编码与语言模型对齐的难度，也让时间信息以普通文本形式进入 LLM。</p>\n<pre><code class=\"language-python\"># UniTime 训练与粗到细推理伪代码\ndef build_unitime_sequence(video, timestamps, query, segment_level=False):\n    visual_tokens = adaptive_frame_scaling(video)\n    seq = []\n    if not segment_level:\n        for t_i, v_i in zip(timestamps, visual_tokens):\n            seq += [tokenize(f&quot;timestamp: {t_i} seconds&quot;), v_i]\n    else:\n        for segment in group_frames(visual_tokens, length=&quot;L_s&quot;):\n            seq += [tokenize(f&quot;timestamp: {segment.start_time} seconds&quot;), segment.tokens]\n    seq += [tokenize(query)]\n    return seq\n\ndef train_step(video, timestamps, queries, answers):\n    # video-centric: one video, many query-answer pairs\n    seq = build_video_centric_batch(video, timestamps, queries, answers)\n    mask = block_attention_between_different_query_answer_pairs(seq)\n    loss = autoregressive_nll(target_tokens=answers, context=seq, attention_mask=mask)\n    update_model(loss)\n\ndef infer_long_video(video, query):\n    clips = split_if_long(video, max_frames=&quot;N_f_long&quot;)\n    coarse_segments = []\n    for clip in clips:\n        seq = build_unitime_sequence(clip, clip.coarse_timestamps, query, segment_level=True)\n        coarse_segments.append(generate_time_interval(seq))\n    candidate = aggregate_and_select(coarse_segments)\n    fine_seq = build_unitime_sequence(candidate.video_crop, candidate.fine_timestamps, query)\n    return generate_time_interval(fine_seq)\n</code></pre>\n<p>自适应帧缩放解决的是 MLLM 上下文窗口和显存约束。若视频帧数为 <span class=\"kb-math kb-math-inline\">N_f</span>，总 token 预算为 <span class=\"kb-math kb-math-inline\">N_{\\text{total}}</span>，每帧分到的 token 数为：</p>\n<div class=\"kb-math kb-math-display\">N_{\\text{res}}=\\left\\lfloor\\frac{N_{\\text{total}}}{N_f}\\right\\rfloor</div>\n<p>短视频帧数少，UniTime 可以通过 resize 给每帧更高空间分辨率；中长视频则用 token compression 通过双线性插值压缩视觉 token；超过 <span class=\"kb-math kb-math-inline\">N_f^{\\text{long}}</span> 的视频会切成多个 clip 分治处理。论文给出的形式是：</p>\n<div class=\"kb-math kb-math-display\">V_i=\n\\begin{cases}\n\\phi_{\\text{project}}(\\phi_{\\text{vision}}(\\psi_{\\text{resize}}(f_i)))\\in\\mathbb{R}^{N_{\\text{res}}\\times d},\n&amp; N_f&lt;N_f^{\\text{short}}\\\\\n\\psi_{\\text{compress}}(\\phi_{\\text{project}}(\\phi_{\\text{vision}}(f_i)))\\in\\mathbb{R}^{N_{\\text{res}}\\times d},\n&amp; N_f^{\\text{short}}\\le N_f&lt;N_f^{\\text{long}}\n\\end{cases}</div>\n<p>Timestamp-interleaved sequence 是 UniTime 的核心机制。细粒度定位时，模型在每帧视觉 token 前插入文本时间戳：</p>\n<div class=\"kb-math kb-math-display\">S=[T_1;V_1;T_2;V_2;\\ldots;T_{N_f};V_{N_f};Q],\n\\qquad T_i=\\phi_{\\text{tokenizer}}(\\tau_i)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\tau_i</span> 是类似 “timestamp: 15.0 seconds” 的文本。粗粒度定位时，时间戳不再插在每帧前，而是插在固定长度 segment 前：</p>\n<div class=\"kb-math kb-math-display\">S=[T_1;S_1;T_2;S_2;\\ldots;T_{N_s};S_{N_s};Q]</div>\n<p>这个设计让同一个模型能根据输入粒度输出不同尺度的边界：长视频先读出粗段位置，再对候选段重采样并细化边界。它比固定位置编码更容易迁移，因为时间是语言 token，不需要额外学习一套连续时间嵌入与 LLM 语义空间对齐。</p>\n<p>训练目标仍然是标准自回归负对数似然，只在答案 token 上计算损失：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}(S,Y)=-\\sum_{i=1}^{N_y}\\log P(y_i\\mid S,y_{&lt;i};\\theta)</div>\n<p>训练数据构造同时包含完整视频的粗粒度样本和包含 ground-truth moment 的短片段细粒度样本，并对长视频样本做重复采样以平衡分布。Video-centric training 进一步把同一视频下的多个 query-answer 对拼到同一个输入序列中，用 attention mask 阻止不同问答对互相看见，同时共享已编码的视频 token，从而避免长视频被重复加载和重复前向。</p>\n<div class=\"key-point\">💡 关键：UniTime 的“零样本泛化”主要来自两个选择：时间戳以文本 token 进入 LLM，视频长度差异由 adaptive scaling 和 coarse-to-fine inference 处理。</div>",
      "quiz": {
        "q": "UniTime 为什么要把 timestamp 作为文本 token 插入视频 token 序列？",
        "options": [
          "让 MLLM 在语言空间中直接引用时间边界，减少额外时序嵌入对齐需求",
          "让模型完全忽略视觉 token，只根据字幕回答",
          "替代所有视频帧采样，从而不再需要视觉编码器",
          "把 temporal grounding 退化为普通文本分类任务"
        ],
        "answer": 0,
        "explain": "时间戳文本 token 与 LLM 原生语言空间兼容，模型可以生成或读出这些时间边界，同时支持不同粒度的粗到细定位。"
      }
    },
    {
      "id": "markit",
      "num": 29,
      "name": "MarkIt",
      "fullName": "显式视觉线索定位 (Explicit Visual Cues for Grounding)",
      "year": "2026",
      "org": "CVPR",
      "parent": "llava_video",
      "paperUrl": "https://www.researchgate.net/publication/380000000",
      "projectUrl": "",
      "category": "frontier_2026",
      "motivation": "帧内嵌入语义标记增强定位",
      "summary": "MarkIt 提出一种 training-free 的视频重写框架，把查询相关主体的分割掩码、语义标签和帧编号直接渲染进视频帧，解决 Vid-LLM 在长视频时序定位中缺少显式时间参照和稳定实体对应的问题。",
      "keyPoints": [
        "提出 MarkIt：只改写输入视频，不修改 Vid-LLM 参数，可直接接入 Qwen2-VL、LLaVA-OV、InternVL2、LongVA 等模型",
        "核心模块 Q2M-Bridge：从自然语言查询抽取 canonical subject tags，再用开放词表分割模型生成 query-conditioned instance masks",
        "双重显式线索：每帧同时叠加语义实例标记和持久帧编号，把“找事件边界”转化为读取可见标记",
        "采用 recall-first mask 保留策略：宁可保留冗余实例，也尽量避免漏掉查询主体",
        "渲染顺序为 mask/contour 先行、文字后置，避免语义标签和帧编号被遮挡",
        "覆盖 Moment Retrieval 和 Highlight Detection，实验使用 Charades-STA、ActivityNet、QVHighlights 等基准",
        "支持纯推理增强，也兼容监督微调；在多种 Vid-LLM backbone 上持续提升时序定位精度"
      ],
      "detail": "<p><img alt=\"MarkIt 框架图\" src=\"https://arxiv.org/html/2604.25886v1/x1.png\" />\n<em>图：MarkIt 先从查询中抽取主体，再把主体 mask 和帧编号写入视频帧，最后交给已有 Vid-LLM 输出时间区间。公开 arXiv 版本为 https://arxiv.org/html/2604.25886v1。</em></p>\n<p>MarkIt 的动机很直接：很多 Vid-LLM 能识别视频里发生了什么，却不擅长稳定地说出“从第几帧到第几帧”。原因不是单纯的语言能力不足，而是视频输入本身缺少两类可读线索：一是绝对或相对时间位置，二是查询主体在帧间的连续对应。MarkIt 的做法不是重新训练一个定位模型，而是构造一个 markerization operator <span class=\"kb-math kb-math-inline\">\\Phi</span>，把原始视频 <span class=\"kb-math kb-math-inline\">V</span> 和查询 <span class=\"kb-math kb-math-inline\">q</span> 改写为带标记视频：</p>\n<div class=\"kb-math kb-math-display\">\\tilde{V}=\\Phi(V,q)=R\\left(V,\\mathcal{B}(q,V),\\mathcal{I}\\right), \\qquad\n\\hat{y}=M_\\theta(\\tilde{V}, p(q))</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">R</span> 是渲染器，<span class=\"kb-math kb-math-inline\">\\mathcal{B}(q,V)</span> 是查询相关的语义实例标记集合，<span class=\"kb-math kb-math-inline\">\\mathcal{I}</span> 是每帧固定位置的编号标记，<span class=\"kb-math kb-math-inline\">M_\\theta</span> 是被冻结的任意 Vid-LLM。对 Moment Retrieval，<span class=\"kb-math kb-math-inline\">\\hat{y}=(\\hat{s},\\hat{e})</span>；对 Highlight Detection，<span class=\"kb-math kb-math-inline\">\\hat{y}</span> 可以是帧或 clip 的相关性分数。</p>\n<p>Q2M-Bridge 负责把语言查询变成可画在帧上的区域证据。它先用语言解析和归一化提取主体标签，例如把 “the man along the chair” 这类描述压缩成 <code>person</code>、<code>chair</code> 等更容易被开放词表分割模型识别的视觉类别；随后对每一帧、每个主体标签调用 text-conditioned open-vocabulary segmentation，得到实例掩码：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{Z}(q)=\\{z_1,\\ldots,z_K\\},\\qquad\n\\mathcal{P}_{t,j}=G(f_t,z_j)=\\{m_{t,j}^{(1)},\\ldots,m_{t,j}^{(n)}\\}</div>\n<p>这里 <span class=\"kb-math kb-math-inline\">G</span> 可以由 YOLOE-Large 这类开放词表分割器实例化。MarkIt 不做激进的 top-k 筛选，而是保留所有候选 mask；这体现了它的定位偏好：多画几个无关实例最多增加一点视觉噪声，但漏掉真正的主体会直接破坏时间边界判断。</p>\n<pre><code class=\"language-python\"># MarkIt 推理流程伪代码\ndef markit_temporal_grounding(video, query, vid_llm, instruction):\n    # 1. 语言查询 -&gt; 主体标签\n    tags = extract_subject_tags(\n        query,\n        rules=[&quot;main grammatical subjects&quot;, &quot;singular nouns&quot;, &quot;person normalization&quot;],\n        max_tags=K,\n    )\n\n    marked_video = []\n    for frame_id, frame in enumerate(video):\n        semantic_markers = []\n\n        # 2. 主体标签 -&gt; 每帧开放词表实例 mask\n        for tag in tags:\n            masks = open_vocab_segment(frame, text=tag)\n            for mask in masks:  # recall-first: 不按置信度强剪枝\n                semantic_markers.append({&quot;mask&quot;: mask, &quot;label&quot;: tag})\n\n        # 3. 叠加主体 mask、轮廓、语义文字和帧编号\n        frame_index = {&quot;anchor&quot;: &quot;bottom_right&quot;, &quot;label&quot;: str(frame_id)}\n        marked_frame = render_markers(\n            frame,\n            region_markers=semantic_markers,\n            index_marker=frame_index,\n            fill_alpha=0.3,\n            contour=True,\n        )\n        marked_video.append(marked_frame)\n\n    # 4. 冻结 Vid-LLM 直接读取标记视频并生成时间边界\n    prompt = instruction.format(query=query)\n    answer = vid_llm.generate(video=marked_video, text=prompt)\n    return parse_temporal_span_or_highlight_scores(answer)\n</code></pre>\n<p>渲染阶段把每一帧的标记集合写成：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{M}_t\n=\\{(m_{t,j}^{(r)}, z_j)\\mid z_j\\in\\mathcal{Z}(q), m_{t,j}^{(r)}\\in\\mathcal{P}_{t,j}\\}\n\\cup \\{(a_{\\text{idx}}, \\mathrm{text}(t))\\}</div>\n<p>被标记帧为：</p>\n<div class=\"kb-math kb-math-display\">\\tilde{f}_t=R(f_t,\\mathcal{M}_t;\\omega)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\omega</span> 控制颜色、透明度、轮廓宽度、字体大小和帧编号位置。论文消融显示，中等透明度和适度轮廓通常优于过重遮挡；帧编号放在固定角落比放在画面中心更稳定。直觉上，标记要足够显眼，让 LLM 能读到；但不能遮住动作本身，否则定位证据反而被破坏。</p>\n<p>与传统 VTG 模型相比，MarkIt 的关键差异在于它不学习一个新的时间边界回归头，也不要求额外时间戳监督。Moment-DETR、UniVTG 这类模型通常把视频和文本编码后在隐空间做匹配；MarkIt 则把“时间”和“主体对应”外显到像素空间，让已有 Vid-LLM 通过 OCR/视觉读取能力完成定位。它特别适合那些已经有强通用理解能力、但对帧号和实体跟踪不敏感的视频大模型。</p>\n<p>MarkIt 和 LLaVA-Video 的关系也很清楚。LLaVA-Video 通过大规模合成视频指令数据提升视频问答和理解能力；MarkIt 则更像一个推理时插件，把帧内语义线索注入输入表示。前者主要改进模型训练数据，后者主要改进输入可解释性。因此 MarkIt 可以作为 LLaVA-Video 类模型的上层增强：不用重新训练，也能让模型更容易输出稳定的 <span class=\"kb-math kb-math-inline\">[\\hat{s},\\hat{e}]</span>。</p>\n<div class=\"key-point\">💡 关键：MarkIt 的核心不是“让模型学会定位”，而是把定位所需的主体和时间参照画出来，让冻结 Vid-LLM 少做隐式跟踪、多读显式线索。</div>",
      "quiz": {
        "q": "MarkIt 中 Q2M-Bridge 的主要作用是什么？",
        "options": [
          "把视频帧压缩成更少的视觉 token",
          "把自然语言查询转换为主体标签，并进一步生成每帧的查询相关实例 mask",
          "训练一个新的 DETR 边界回归头",
          "用音频字幕替代视觉帧输入"
        ],
        "answer": 1,
        "explain": "Q2M-Bridge 先抽取 canonical subject tags，再用开放词表分割模型得到实例 mask，供 MarkIt 渲染成显式视觉标记。"
      }
    },
    {
      "id": "universal_vtg_mllm",
      "num": 30,
      "name": "Universal VTG MLLM",
      "fullName": "通用时序定位大模型 (Universal VTG with Generative MLLM)",
      "year": "2026",
      "org": "NeurIPS",
      "parent": "internvideo2",
      "paperUrl": "https://proceedings.neurips.cc/paper_files/paper/2025/hash/5d2e24df9cfaad3189833b819c40b392-Abstract-Conference.html",
      "projectUrl": "",
      "category": "frontier_2026",
      "motivation": "生成式大模型实现通用定位",
      "summary": "Universal VTG MLLM 对应 UniTime，提出用生成式多模态大模型直接输出视频时间区间，并通过时间戳 token、adaptive frame scaling 和 coarse-to-fine 推理解决不同领域、不同视角、不同长度视频的通用时序定位问题。",
      "keyPoints": [
        "提出 UniTime：面向 universal video temporal grounding 的生成式 MLLM，而不是只服务单一数据集的判别式检索器",
        "用 timestamp-interleaved sequence 把时间戳文本 token 插入视频 token 序列，让 LLM 直接生成可解析的时间边界",
        "采用 adaptive frame scaling：根据视频帧数动态调整每帧 token 预算，短视频保留高空间分辨率，长视频降低空间粒度",
        "对超长视频使用多阶段 coarse-to-fine inference：先粗粒度找候选片段，再在候选范围内细粒度重采样",
        "训练目标是标准自回归负对数似然，只监督目标时间文本，不需要额外边界回归头",
        "使用 video-centric training：同一视频的多个查询和对应时间段尽量合并进一次前向，减少重复视频编码开销",
        "在 Ego4D-NLQ、TACoS、Charades-STA、ActivityNet Captions、QVHighlights 等公开时序定位基准上评估，并作为长视频 QA 的前置检索器"
      ],
      "detail": "<p><img alt=\"UniTime 架构图\" src=\"https://lzq5.github.io/UniTime/resources/arch.png\" />\n<em>图：UniTime 通过 adaptive frame scaling 构造多尺度视频输入，并在视觉 token 间插入时间戳 token，使生成式 MLLM 能从粗到细输出时间区间。项目页为 https://lzq5.github.io/UniTime/。</em></p>\n<p>传统视频时序定位通常是判别式框架：先编码视频和文本，再对候选窗口打分，或用 DETR 类查询回归边界。这类方法在单一数据集内很有效，但面对第一人称/第三人称、电影/烹饪/日常活动、几十秒到数小时的视频时，泛化会变差。UniTime 的目标是把时序定位改造成 MLLM 可处理的生成问题：</p>\n<div class=\"kb-math kb-math-display\">Y=\\Phi_{\\text{UniTime}}(V,T,Q),\\qquad\nY=\\{(s_1,e_1),\\ldots,(s_K,e_K)\\}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">V=\\{f_1,\\ldots,f_{N_f}\\}</span> 是视频帧，<span class=\"kb-math kb-math-inline\">T=\\{t_1,\\ldots,t_{N_f}\\}</span> 是对应时间戳，<span class=\"kb-math kb-math-inline\">Q</span> 是自由形式查询。模型输出不再是隐空间分数，而是类似 <code>From 15.0s to 18.0s</code> 的文本答案，之后可直接解析为时间边界。</p>\n<p>第一个核心机制是 adaptive frame scaling。对于固定总视觉 token 预算 <span class=\"kb-math kb-math-inline\">N_{\\text{total}}</span>，如果视频帧数为 <span class=\"kb-math kb-math-inline\">N_f</span>，每帧可分配的 token 近似为：</p>\n<div class=\"kb-math kb-math-display\">N_{\\text{res}}=\\left\\lfloor\\frac{N_{\\text{total}}}{N_f}\\right\\rfloor</div>\n<p>当 <span class=\"kb-math kb-math-inline\">N_f</span> 较小，模型可以通过 resize 保留更高空间分辨率；当 <span class=\"kb-math kb-math-inline\">N_f</span> 较大，则在特征层做 token compression，以牺牲部分空间细节换取更长时间覆盖；当 <span class=\"kb-math kb-math-inline\">N_f</span> 超过长视频阈值，则把视频分成多个 clip 做分治处理。这个设计比固定抽帧更稳，因为固定抽帧会在长视频里丢失大量动作细节，在短视频里又浪费可用分辨率。</p>\n<p>第二个机制是 timestamp-interleaved sequence。对细粒度定位，可以在每个帧特征前插入时间戳；对粗粒度定位，可以在每个 segment 前插入一个代表该 segment 起点的时间戳：</p>\n<div class=\"kb-math kb-math-display\">S=[T_1;S_1;T_2;S_2;\\cdots;T_{N_s};S_{N_s};Q],\n\\qquad\nT_i=\\phi_{\\text{tokenizer}}(\\tau_{s_i})</div>\n<p>这里 <span class=\"kb-math kb-math-inline\">S_i</span> 是第 <span class=\"kb-math kb-math-inline\">i</span> 个视频 segment 的视觉 token 序列，<span class=\"kb-math kb-math-inline\">T_i</span> 是文本时间戳 token。时间戳作为普通文本 token 进入语言空间，不需要学习额外的时间 embedding 对齐；LLM 在生成答案时可以“指向”它已经读过的时间文本。这也是 UniTime 相比纯视觉位置编码更容易外推到不同视频长度的原因。</p>\n<pre><code class=\"language-python\"># UniTime / Universal VTG MLLM 推理流程伪代码\ndef unitime_ground(video, query, model, token_budget, long_threshold):\n    if num_frames(video) &lt;= long_threshold:\n        frames = sample_frames(video)\n        visual_tokens = adaptive_frame_scaling(frames, token_budget)\n        seq = interleave_timestamps(visual_tokens, timestamps(frames), query)\n        return parse_span(model.generate(seq))\n\n    # 超长视频：先粗后细\n    clips = split_video(video, max_frames=long_threshold)\n    coarse_candidates = []\n    for clip in clips:\n        coarse_frames = sparse_sample(clip)\n        coarse_tokens = adaptive_frame_scaling(coarse_frames, token_budget)\n        coarse_seq = interleave_segment_timestamps(\n            coarse_tokens,\n            segment_start_times(coarse_frames),\n            query,\n        )\n        coarse_candidates.append(parse_span(model.generate(coarse_seq)))\n\n    merged = aggregate_candidates(coarse_candidates)\n    while needs_refinement(merged):\n        local_video = crop(video, merged)\n        fine_frames = dense_sample(local_video)\n        fine_tokens = adaptive_frame_scaling(fine_frames, token_budget)\n        fine_seq = interleave_timestamps(fine_tokens, timestamps(fine_frames), query)\n        merged = parse_span(model.generate(fine_seq))\n\n    return merged\n</code></pre>\n<p>训练上，UniTime 没有引入专门的边界回归损失，而是沿用生成式 MLLM 的自回归目标。给定构造好的输入序列 <span class=\"kb-math kb-math-inline\">S</span> 和目标答案 token <span class=\"kb-math kb-math-inline\">Y=(y_1,\\ldots,y_{N_y})</span>，只在答案部分计算负对数似然：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}(S,Y)\n=-\\sum_{i=1}^{N_y}\\log P(y_i\\mid S,y_{&lt;i};\\theta)</div>\n<p>这让模型的定位能力和语言生成能力共享同一个训练接口：同样可以处理描述式查询、问题式查询，也可以在下游 VideoQA 中先检索相关片段，再交给 QA 模型回答。相比为每种数据集设计不同 head，生成式接口更适合统一多任务、多领域、多时长的 VTG 数据。</p>\n<p>为了提高训练效率，UniTime 使用 video-centric training。很多 VTG 数据集里，一个视频对应多个查询；传统 query-centric 采样会反复加载和编码同一个视频。UniTime 尽量把同一视频的多个 <span class=\"kb-math kb-math-inline\">(Q^{(k)},Y^{(k)})</span> 拼到一次训练样本中，使视觉 token 只编码一次，随后让 LLM 对多个查询生成多个时间答案。这对长视频尤其重要，因为视频 token 是主要计算瓶颈。</p>\n<p>UniTime 与 InternVideo2 类视频基础模型的差异在于任务接口。InternVideo2 更强调大规模视频表示学习和多模态对齐，可作为强视频特征或预训练 backbone；UniTime 则把时间戳文本化，并用 MLLM 的生成能力直接输出时间范围。它牺牲了一部分判别式模型的轻量推理优势，但换来更强的查询表达能力、跨数据集泛化能力和与长视频 QA 流水线的自然衔接。</p>\n<div class=\"key-point\">💡 关键：UniTime 的“通用”来自三件事叠加：输入粒度随视频长度自适应，时间戳以文本 token 暴露给 LLM，超长视频通过 coarse-to-fine 推理逐步缩小搜索范围。</div>",
      "quiz": {
        "q": "UniTime 为什么要把时间戳 token 与视频 token 交错插入？",
        "options": [
          "让 LLM 在语言空间中直接读取并生成时间边界，减少额外时间 embedding 对齐需求",
          "替代视觉编码器，使模型只处理字幕",
          "把所有视频都压缩成一个固定长度向量",
          "强制模型只输出单帧分类结果"
        ],
        "answer": 0,
        "explain": "时间戳作为文本 token 与视觉证据相邻出现，LLM 生成答案时可直接引用这些时间线索，从而更稳定地输出 start/end。"
      }
    },
    {
      "id": "qwen35",
      "num": 31,
      "name": "Qwen3.5",
      "fullName": "通义千问3.5视频版 (Qwen3.5-122B-A10B)",
      "year": "2026",
      "org": "Alibaba",
      "parent": "videollama3",
      "paperUrl": "https://llm-stats.com/benchmarks/mlvu",
      "projectUrl": "",
      "category": "frontier_2026",
      "motivation": "原生多模态支持2小时视频",
      "summary": "Qwen3.5-122B-A10B 是 Qwen 系列的原生多模态 MoE 模型，通过视觉编码器、早期多模态 token 融合、Gated DeltaNet/Attention 混合序列建模和稀疏专家路由，在 10B active 参数成本下支持长上下文图像/视频理解，并在 MLVU 长视频榜单上取得领先结果。",
      "keyPoints": [
        "模型类型为 Causal Language Model with Vision Encoder，支持图像和视频 token 进入同一个聊天序列",
        "参数规模为 122B total、10B active，采用 sparse MoE 降低每 token 前向成本",
        "语言主干 48 层，布局为 <span class=\"kb-math kb-math-inline\">12\\times(3\\times(\\text{Gated DeltaNet}\\rightarrow\\text{MoE})+1\\times(\\text{Gated Attention}\\rightarrow\\text{MoE}))</span>",
        "MoE 包含 256 个专家，每 token 激活 8 个 routed experts 加 1 个 shared expert",
        "视觉编码器使用 16×16 patch、temporal patch size 2、spatial merge size 2，并输出到 3072 维语言隐藏空间",
        "原生上下文长度 262,144 tokens，可通过 YaRN 扩展到约 1,010,000 tokens",
        "阿里云 Model Studio 文档标注 Qwen3.5 系列视频输入时长为 2 秒到 2 小时，单文件公网 URL 可到 2GB，视频帧列表最多 8,000 张",
        "LLM Stats 的 MLVU 页面显示 Qwen3.5-122B-A10B 以 0.873/87.3% 领先该长视频理解榜单"
      ],
      "detail": "<p><img alt=\"Qwen3.5 官方模型卡图\" src=\"https://qianwen-res.oss-accelerate.aliyuncs.com/logo_qwen3.5.png\" />\n<em>图：Qwen3.5 官方模型卡使用的标识。该条目没有标准论文页，方法解读基于 Qwen 官方 Hugging Face 模型卡、阿里云视觉理解文档和 MLVU 榜单。</em></p>\n<p><img alt=\"Qwen3.5 官方模型卡 benchmark 图\" src=\"https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen3.5/Figures/qwen3.5_middle_size_score.png\" />\n<em>图：Qwen3.5 模型卡中的中等规模模型 benchmark 对比图，包含多模态和视频理解结果。</em></p>\n<p>Qwen3.5 的关键不是在 VideoLLaMA3 这种专门 video LMM 框架上继续加一个视频压缩器，而是把多模态能力做进通用基础模型。模型卡中的 chat template 明确把图像和视频都表示为特殊视觉片段：</p>\n<div class=\"kb-math kb-math-display\">\\texttt{&lt;|vision\\_start|&gt;&lt;|image\\_pad|&gt;&lt;|vision\\_end|&gt;},\\qquad\n\\texttt{&lt;|vision\\_start|&gt;&lt;|video\\_pad|&gt;&lt;|vision\\_end|&gt;}</div>\n<p>这些占位符对应的视觉特征会被视觉编码器转换成与语言主干同维度的 token，再和文本 token 一起进入自回归模型。因此它不是“先做视频分类再把结果交给 LLM”的级联方案，而是早期融合的 vision-language foundation：视觉 token、视频 token 和文本指令共同参与后续推理。</p>\n<p>视觉侧可以概括为 patch 化和合并。根据公开 config，vision encoder 的 patch size 为 16，temporal patch size 为 2，spatial merge size 为 2，输出 hidden size 为 3072。对一个抽帧后的视频片段，粗略的视觉 token 数可写成：</p>\n<div class=\"kb-math kb-math-display\">N_{\\text{video}}\n\\approx\n\\left\\lceil\\frac{T}{2}\\right\\rceil\n\\cdot\n\\left\\lceil\\frac{H}{16}\\right\\rceil\n\\cdot\n\\left\\lceil\\frac{W}{16}\\right\\rceil\n\\cdot \\frac{1}{2^2}</div>\n<p>这里 <span class=\"kb-math kb-math-inline\">T,H,W</span> 分别是帧数、高度和宽度，最后的 <span class=\"kb-math kb-math-inline\">1/2^2</span> 来自 2×2 spatial merge 的近似压缩。这个公式解释了为什么长视频理解高度依赖抽帧率、分辨率和上下文预算：即使单帧 token 被合并，2 小时视频仍需要强长上下文主干才能承载足够时间覆盖。</p>\n<pre><code class=\"language-python\"># Qwen3.5-122B-A10B 视频理解流程伪代码\ndef qwen35_video_chat(video_url, user_prompt, model):\n    # 1. 解码和采样视频；实际服务可按 fps、max_pixels、max_frames 控制成本\n    frames = decode_and_sample_video(video_url, fps=2.0, max_frames=8000)\n\n    # 2. 视觉编码：时间 patch、空间 patch、空间合并后投影到语言维度\n    video_patches = make_video_patches(\n        frames,\n        patch_size=16,\n        temporal_patch_size=2,\n        spatial_merge_size=2,\n    )\n    visual_tokens = vision_encoder(video_patches)  # hidden dim -&gt; 3072\n\n    # 3. 聊天模板把视频 token 和文本 token 放进同一个序列\n    sequence = [\n        &quot;&lt;|im_start|&gt;user&quot;,\n        &quot;&lt;|vision_start|&gt;&quot;, visual_tokens, &quot;&lt;|vision_end|&gt;&quot;,\n        user_prompt,\n        &quot;&lt;|im_end|&gt;&quot;,\n        &quot;&lt;|im_start|&gt;assistant&quot;,\n    ]\n\n    # 4. 48 层混合主干：三层线性注意力后接一层全注意力，层层接 MoE\n    h = embed(sequence)\n    for layer_id in range(48):\n        if layer_id % 4 in (0, 1, 2):\n            h = gated_deltanet(h)      # 线性注意力路径，适合长上下文\n        else:\n            h = gated_attention(h)     # 周期性全注意力，补全全局交互\n        h = sparse_moe(h, routed_experts=8, shared_experts=1)\n\n    return autoregressive_decode(h, max_new_tokens=81920)\n</code></pre>\n<p>语言主干的效率来自两层设计叠加。第一层是 Gated DeltaNet 与 Gated Attention 的 3:1 混合：多数层使用线性注意力路径处理长序列，周期性插入全注意力层保持全局 token 交互。粗略地说，如果序列长度为 <span class=\"kb-math kb-math-inline\">L</span>，纯全注意力的代价随 <span class=\"kb-math kb-math-inline\">L^2</span> 增长，而线性注意力路径更接近随 <span class=\"kb-math kb-math-inline\">L</span> 增长；混合后可写成：</p>\n<div class=\"kb-math kb-math-display\">C_{\\text{mix}}\n\\approx\n\\frac{3}{4}C_{\\text{linear}}(L)\n+\\frac{1}{4}C_{\\text{full}}(L)</div>\n<p>这不是严格实现代价公式，但能说明设计直觉：长视频需要大量视觉 token，不能每层都做完整二次复杂度注意力；同时完全去掉全注意力又可能损失远距离细粒度依赖。</p>\n<p>第二层是 sparse MoE。对每个 token 的隐藏状态 <span class=\"kb-math kb-math-inline\">h</span>，router 从 256 个 experts 中选择 8 个 routed experts，并叠加 1 个 shared expert：</p>\n<div class=\"kb-math kb-math-display\">\\operatorname{MoE}(h)\n=E_{\\text{shared}}(h)\n+\\sum_{e\\in \\operatorname{TopK}(g(h),8)}\n\\alpha_e E_e(h)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">g(h)</span> 是 router 打分，<span class=\"kb-math kb-math-inline\">\\alpha_e</span> 是归一化路由权重。这样模型拥有 122B 总容量，但单 token 只激活约 10B 参数，兼顾能力和推理成本。这对视频理解很重要，因为视频输入通常比文本问答消耗更多上下文和 KV/cache 资源。</p>\n<p>长视频能力还依赖服务侧输入策略。阿里云视觉理解文档把 Qwen3.5 系列定位为最新一代视觉理解模型，适合多模态推理、图像/视频理解和多模态 agent；在视频限制中，Qwen3.5 系列单视频文件时长范围为 2 秒到 2 小时，公网 URL 文件大小可到 2GB，作为图片列表输入时最多 8,000 张。文档同时说明视频文件的音频不会被视觉理解模型处理，因此“2 小时视频”在这里主要指视觉帧序列的长时程理解，而不是完整音视频联合理解。</p>\n<p>MLVU 榜单的意义在于验证长视频综合能力，而不是单一动作定位。MLVU 覆盖 3 分钟到 2 小时的视频，任务包括推理、captioning、识别和摘要等 9 类；LLM Stats 页面显示 Qwen3.5-122B-A10B 得分 0.873，领先同页列出的 Qwen3.6 Plus、Qwen3.6-27B、Qwen3-VL-235B 等模型。结合模型结构看，这个结果来自三方面：视觉 token 能进入原生语言主干，长上下文机制能承载足够帧证据，MoE 让大容量模型在视频场景下仍可部署。</p>\n<p>与 VideoLLaMA3 相比，Qwen3.5 更像“通用多模态基础设施”。VideoLLaMA3 的优势是围绕视频 token 压缩和图像中心训练做专项设计；Qwen3.5 的优势是统一模型规模、长上下文、agent 能力和视觉理解能力。对 KnowledgePipeline 中的演进关系而言，它代表从专门 Video-LLM 走向原生多模态基础模型：视频不再是附加模块，而是和文本、图像一起进入主干推理。</p>\n<div class=\"warn-box\">⚠️ 注意：给定 <code>paper_url</code> 是 MLVU 榜单而非 Qwen3.5 技术论文；因此这里的“方法”来自公开模型卡、config 和阿里云文档的结构信息，部分训练细节没有论文级展开。</div>",
      "quiz": {
        "q": "Qwen3.5-122B-A10B 为什么能在 122B 总参数规模下保持较低的单 token 前向成本？",
        "options": [
          "每次只使用第一帧视频，不处理完整上下文",
          "使用 sparse MoE，每 token 只激活 8 个 routed experts 加 1 个 shared expert，约 10B active 参数",
          "完全删除语言模型，只保留视觉编码器",
          "把所有视频离线转成固定标签，不进行生成式推理"
        ],
        "answer": 1,
        "explain": "模型总容量来自 256 个专家，但 router 每 token 只选择少量专家，并叠加共享专家，因此 active 参数远小于总参数。"
      }
    },
    {
      "id": "gemini3pro",
      "num": 32,
      "name": "Gemini 3 Pro",
      "fullName": "Gemini 3专业版 (Gemini 3 Pro)",
      "year": "2026",
      "org": "Google",
      "parent": "internvideo2",
      "paperUrl": "https://deepmind.google/technologies/gemini/",
      "projectUrl": "",
      "category": "frontier_2026",
      "motivation": "百万token超长上下文窗口",
      "summary": "Gemini 3 Pro 是 Google 发布的原生多模态稀疏 MoE Transformer，把文本、图像、音频、视频和代码放入最高 1M token 上下文中进行统一推理，解决长视频、长文档和大代码库任务中“信息放不进模型、跨模态证据难以同时对齐”的问题。",
      "keyPoints": [
        "架构上采用 sparse mixture-of-experts Transformer，按 token 动态路由到部分专家，解耦总参数容量与每 token 推理成本",
        "原生支持文本、图像、音频、视频输入，输出文本，官方 Model Card 标注最高 1M token 输入上下文与 64K token 输出",
        "训练数据覆盖公开网页文档、文本、代码、图像、音频、语音和视频；后训练包含指令微调、强化学习数据和人类偏好数据",
        "面向复杂推理引入 Deep Think 模式，在推理时增强复杂问题求解能力，但官方未公开其内部搜索、验证或采样细节",
        "长上下文能力使长视频问答可以把视频帧、音频/字幕、镜头级描述、检索到的网页和用户问题放在同一上下文中联合推理",
        "评测覆盖 reasoning、multimodal、agentic tool use、multilingual 与 long-context，官方发布页强调 MMMU-Pro、Video-MMMU、Terminal-Bench、SWE-bench 等能力",
        "与 InternVideo2 这类显式视频编码器路线相比，Gemini 3 Pro 的关键在于把视频理解并入通用原生多模态大模型和长上下文推理栈"
      ],
      "detail": "<p><img alt=\"Gemini 3 Pro 官方评测总览\" src=\"https://storage.googleapis.com/gweb-uniblog-publish-prod/original_images/gemini_3_table_final_HLE_Tools_on.gif\" />\n<em>图：Google 官方 Gemini 3 发布页给出的评测总览。Google 未公开 Gemini 3 Pro 的完整内部架构图，因此这里用官方发布图作为模型能力总览，并在下文基于 Model Card 解读公开可确认的架构与流程。</em></p>\n<p>Gemini 3 Pro 的公开 Model Card 把它定义为“natively multimodal, reasoning models”，而不是在纯文本 LLM 外面外挂一个视觉编码器的单任务 Video-LLM。对视频理解来说，这意味着视频帧、音频、字幕、用户问题、工具返回结果和代码片段最终都进入同一个推理上下文，由同一个模型栈完成跨模态证据聚合。官方没有披露视频 tokenizer、帧采样策略、位置编码或专家数量；因此更稳妥的理解是：Gemini 3 Pro 公开层面的算法贡献在于把 MoE Transformer、原生多模态预训练、后训练推理能力和 1M context 组合成一个可产品化的统一模型。</p>\n<p>稀疏 MoE 是 Model Card 明确披露的核心架构。普通 Transformer 的每个 token 都经过同一组 FFN 参数，计算量随模型宽度直接增长；MoE 层则用路由器为每个 token 选择少数专家，只激活一部分参数。可以抽象为：</p>\n<div class=\"kb-math kb-math-display\">p(e \\mid h_t)=\\operatorname{softmax}(W_r h_t)_e,\\quad\n\\mathcal{E}_t=\\operatorname{TopK}_e\\,p(e \\mid h_t)</div>\n<div class=\"kb-math kb-math-display\">\\operatorname{MoE}(h_t)=\n\\sum_{e\\in\\mathcal{E}_t}\np(e \\mid h_t)\\operatorname{FFN}_e(h_t)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">h_t</span> 是第 <span class=\"kb-math kb-math-inline\">t</span> 个 token 的隐藏状态，<span class=\"kb-math kb-math-inline\">\\mathcal{E}_t</span> 是被激活的专家集合。这个设计对多模态尤其重要：语言、代码、图像 patch、音频片段和视频帧 token 的统计结构不同，动态路由允许不同 token 走向更合适的专家，同时不要求每个 token 都跑完整模型容量。</p>\n<p>百万 token 上下文是它在长视频任务里的直接动机。传统长视频问答常见做法是先切片、摘要或检索，再把少量片段喂给模型；这会把“哪些片段重要”的判断提前交给外部系统，容易丢掉远距离线索。Gemini 3 Pro 的 1M context 让工程流程可以更接近“把完整材料交给模型”：采样帧序列、ASR 字幕、镜头边界、OCR、音频事件、用户问题、检索结果都作为同一个上下文 <span class=\"kb-math kb-math-inline\">X</span> 输入：</p>\n<div class=\"kb-math kb-math-display\">X=[x_{\\text{text}},x_{\\text{video}},x_{\\text{audio}},x_{\\text{image}},x_{\\text{code}},x_{\\text{tool}}],\\quad |X|\\le 10^6</div>\n<div class=\"kb-math kb-math-display\">p_\\theta(y\\mid X)=\\prod_{i=1}^{T}p_\\theta(y_i\\mid y_{&lt;i},X),\\quad T\\le 64K</div>\n<p>这种能力不等于“所有 1M token 都会被完美使用”。更准确的说法是，它把瓶颈从上下文容量转移到长距离证据选择和多跳推理质量：模型需要在海量上下文中找到相关帧、对齐语音和画面，再把多个时刻的证据组合成答案。因此官方评测方法把 long-context、multimodal 和 agentic tool use 分开报告，是在区分“能装下材料”“能读懂多模态材料”和“能持续执行任务”三种能力。</p>\n<p>训练流程方面，Model Card 只公开了高层数据和后训练类型：预训练覆盖网页、文本、代码、图像、音频和视频；后训练包含 instruction tuning、reinforcement learning data 和 human-preference data，并强调可利用多步推理、问题求解和定理证明数据。可以把公开流程抽象成三段：先做大规模多模态自监督/自回归预训练，学会跨模态表征和 next-token prediction；再用指令数据把模型对齐到问答、代码、工具调用和视频理解等交互任务；最后用偏好或奖励信号约束回答质量、安全性与推理风格。</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{pretrain}}\n=-\\sum_{(X,Y)\\in\\mathcal{D}_{mm}}\n\\sum_{t=1}^{|Y|}\n\\log p_\\theta(y_t\\mid y_{&lt;t},X)</div>\n<div class=\"kb-math kb-math-display\">\\max_\\theta\\ \n\\mathbb{E}_{\\tau\\sim \\pi_\\theta}[R(\\tau)]\n-\\beta\\,D_{\\mathrm{KL}}(\\pi_\\theta\\|\\pi_{\\mathrm{ref}})</div>\n<p>第二个式子是对偏好/强化学习后训练的通用抽象，不代表 Google 公开了 Gemini 3 Pro 的具体 RL 算法。它表达的直觉是：在保持模型不偏离参考策略太远的同时，让回答在有用性、指令遵循、安全性、事实性和多步推理上获得更高奖励。</p>\n<pre><code class=\"language-python\"># Gemini 3 Pro 公开资料可支持的长视频推理流程抽象\ndef gemini3pro_long_video_qa(video, question, tools=None, deep_think=False):\n    # 1. 多模态上下文构造：具体采样器/tokenizer 未公开\n    visual_tokens = encode_video_frames(video.frames)       # frames, OCR, spatial cues\n    audio_tokens = encode_audio(video.audio)                # speech and non-speech events\n    text_tokens = tokenize([video.subtitles, question])\n    context = pack_context(\n        text=text_tokens,\n        video=visual_tokens,\n        audio=audio_tokens,\n        max_tokens=1_000_000,\n    )\n\n    # 2. 原生多模态 MoE Transformer：每个 token 动态选择少量专家\n    hidden = context\n    for layer in transformer_layers:\n        hidden = self_attention(hidden)                     # long-context evidence mixing\n        hidden = sparse_moe_ffn(hidden, route=&quot;top_k&quot;)       # expert routing per token\n\n    # 3. 可选推理增强：Deep Think 的内部算法未公开，只能抽象为更高推理预算\n    if deep_think:\n        hidden = allocate_more_inference_budget(hidden)\n\n    # 4. 生成答案，必要时通过工具补充外部证据\n    answer = autoregressive_decode(hidden, max_output_tokens=64_000)\n    if tools and answer.requests_tool_call:\n        observation = tools.call(answer.tool_name, answer.tool_args)\n        return gemini3pro_long_video_qa(\n            video=video,\n            question=question + format_observation(observation),\n            tools=tools,\n            deep_think=deep_think,\n        )\n    return answer\n</code></pre>\n<p>从视频理解谱系看，InternVideo2 的路线是“先训练强视频编码器，再接入 LLM”，优势是视频表征、检索和时序定位能力更透明；Gemini 3 Pro 的路线则更像“把视频作为通用多模态上下文的一种输入”，优势是能直接处理长材料、工具调用、代码生成和跨文档推理。对于长视频 QA，后者可以一次性接纳更多上下文，但解释性较弱：外部用户通常看不到帧级 attention、专家路由或中间证据选择，只能通过提示结构、引用要求、分段检查和工具日志来约束输出。</p>\n<p>在工程使用上，1M context 不应被理解为可以无脑堆所有内容。更稳健的流程是保留原始视频证据，同时加入结构化索引：镜头时间戳、ASR 段落、OCR 文本、人物/物体候选、事件标签和用户问题。这样模型既能利用超长上下文做全局回看，又能在回答中定位到具体证据。对于“某人什么时候拿起物体”“前后两段对话是否矛盾”“整部讲座如何组织成学习材料”这类任务，长上下文提供的是统一证据池，MoE 多模态推理负责把池中的远距离线索连起来。</p>\n<div class=\"key-point\">💡 关键：Gemini 3 Pro 的可公开技术核心不是单一新损失函数，而是原生多模态、稀疏 MoE、长上下文和推理后训练的系统组合；其中许多内部细节未公开，解读时应把官方披露与合理抽象区分开。</div>\n<p>公开资料：</p>\n<ul>\n<li>Google DeepMind Gemini 3 Pro Model Card: https://deepmind.google/models/model-cards/gemini-3-pro</li>\n<li>Google Gemini 3 发布页: https://blog.google/products-and-platforms/products/gemini/gemini-3/</li>\n<li>Gemini API Long Context 文档: https://ai.google.dev/gemini-api/docs/long-context</li>\n<li>Gemini 3 Pro Evaluation Methodology: https://deepmind.google/models/evals-methodology/gemini-3-pro</li>\n</ul>",
      "quiz": {
        "q": "Gemini 3 Pro 的 sparse MoE Transformer 对长视频多模态理解最直接的作用是什么？",
        "options": [
          "把所有视频帧压缩成一个固定类别标签，避免语言推理",
          "让每个 token 动态路由到少量专家，在扩大模型容量的同时控制每 token 计算成本",
          "保证 1M token 中任意远距离证据都能被完美召回",
          "把视频任务完全转化为纯字幕检索，不需要视觉或音频输入"
        ],
        "answer": 1,
        "explain": "MoE 的核心是按 token 激活部分专家，从而解耦总容量和单 token 计算；它有利于多模态 token 的专业化处理，但不等于自动解决所有长距离推理问题。"
      }
    }
  ],
  "categories": {
    "classic": {
      "label": "经典时序建模",
      "color": "#3B82F6"
    },
    "localization": {
      "label": "时序动作定位",
      "color": "#10B981"
    },
    "grounding": {
      "label": "视频时刻检索",
      "color": "#F59E0B"
    },
    "video_llm": {
      "label": "Video-LLM",
      "color": "#8B5CF6"
    },
    "frontier_2026": {
      "label": "2026年前沿",
      "color": "#EF4444"
    }
  },
  "projectUrls": {}
};
