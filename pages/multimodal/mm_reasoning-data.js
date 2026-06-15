/**
 * mm_reasoning-data.js — 由 pipeline/build.py 于 2026-06-15 17:41:34 自动生成。
 * 源文件：content/mm/mm_reasoning.md
 * ⚠️  请勿手动修改；如需更新，修改源文档后重新编译。
 */
window.PAGE_CONFIG = {
  "meta": {
    "domain": "multimodal",
    "topic_id": "mm_reasoning",
    "topic_name": "多模态推理",
    "page_title": "多模态推理技术演进图谱",
    "page_subtitle": "2026-06-15 版",
    "page_desc": "涵盖从视觉问答、多模态CoT到2026年原生多模态长链推理（Think with Images）的技术发展历程",
    "page_icon": "🧠",
    "hero_pills": [
      "🏷️ Multimodal CoT · Visual Reasoning · Think with Images"
    ],
    "count_pill": "{count} 个算法",
    "image_base": "../../content/mm/mm_reasoning/assets/",
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
        "id": "vilbert",
        "x": 100,
        "y": 100,
        "category": "foundation"
      },
      {
        "id": "clip",
        "x": 200,
        "y": 100,
        "category": "foundation"
      },
      {
        "id": "flamingo",
        "x": 300,
        "y": 100,
        "category": "foundation"
      },
      {
        "id": "blip2",
        "x": 400,
        "y": 100,
        "category": "foundation"
      },
      {
        "id": "llava",
        "x": 420,
        "y": 250,
        "category": "mm_cot"
      },
      {
        "id": "mm_cot",
        "x": 410,
        "y": 300,
        "category": "mm_cot"
      },
      {
        "id": "ddcot",
        "x": 480,
        "y": 300,
        "category": "mm_cot"
      },
      {
        "id": "t_sciq",
        "x": 550,
        "y": 300,
        "category": "mm_cot"
      },
      {
        "id": "visual_cot",
        "x": 620,
        "y": 300,
        "category": "mm_cot"
      },
      {
        "id": "image_of_thought",
        "x": 680,
        "y": 280,
        "category": "mm_cot"
      },
      {
        "id": "llava_cot",
        "x": 750,
        "y": 250,
        "category": "mm_cot"
      },
      {
        "id": "visprog",
        "x": 450,
        "y": 450,
        "category": "compositional"
      },
      {
        "id": "vipergpt",
        "x": 520,
        "y": 450,
        "category": "compositional"
      },
      {
        "id": "genome",
        "x": 600,
        "y": 450,
        "category": "compositional"
      },
      {
        "id": "cot_vla",
        "x": 760,
        "y": 450,
        "category": "compositional"
      },
      {
        "id": "mvot",
        "x": 720,
        "y": 550,
        "category": "frontier_2026"
      },
      {
        "id": "latent_sketchpad",
        "x": 780,
        "y": 580,
        "category": "frontier_2026"
      },
      {
        "id": "visual_thoughts",
        "x": 850,
        "y": 550,
        "category": "frontier_2026"
      },
      {
        "id": "covt",
        "x": 920,
        "y": 570,
        "category": "frontier_2026"
      },
      {
        "id": "zebra_cot",
        "x": 920,
        "y": 530,
        "category": "frontier_2026"
      },
      {
        "id": "reason_rft",
        "x": 850,
        "y": 350,
        "category": "frontier_2026"
      },
      {
        "id": "visionthink",
        "x": 920,
        "y": 330,
        "category": "frontier_2026"
      },
      {
        "id": "vl_rethinker",
        "x": 920,
        "y": 370,
        "category": "frontier_2026"
      },
      {
        "id": "think_or_not",
        "x": 990,
        "y": 350,
        "category": "frontier_2026"
      },
      {
        "id": "grounded_rl",
        "x": 990,
        "y": 390,
        "category": "frontier_2026"
      },
      {
        "id": "ssr_cot",
        "x": 850,
        "y": 600,
        "category": "frontier_2026"
      },
      {
        "id": "muslr",
        "x": 850,
        "y": 450,
        "category": "frontier_2026"
      },
      {
        "id": "med_r1",
        "x": 990,
        "y": 310,
        "category": "frontier_2026"
      }
    ],
    "edges": [
      {
        "from": "clip",
        "to": "flamingo",
        "label": "少样本学习"
      },
      {
        "from": "clip",
        "to": "blip2",
        "label": "Q-Former桥接"
      },
      {
        "from": "blip2",
        "to": "llava",
        "label": "指令微调"
      },
      {
        "from": "blip2",
        "to": "mm_cot",
        "label": "两阶段推理"
      },
      {
        "from": "mm_cot",
        "to": "ddcot",
        "label": "职责分离"
      },
      {
        "from": "mm_cot",
        "to": "t_sciq",
        "label": "LLM教导"
      },
      {
        "from": "mm_cot",
        "to": "visual_cot",
        "label": "数据集构建"
      },
      {
        "from": "visual_cot",
        "to": "image_of_thought",
        "label": "证据锚定"
      },
      {
        "from": "llava",
        "to": "llava_cot",
        "label": "逐步推理"
      },
      {
        "from": "blip2",
        "to": "visprog",
        "label": "程序合成"
      },
      {
        "from": "visprog",
        "to": "vipergpt",
        "label": "代码执行"
      },
      {
        "from": "vipergpt",
        "to": "genome",
        "label": "模块重用"
      },
      {
        "from": "llava_cot",
        "to": "cot_vla",
        "label": "具身智能"
      },
      {
        "from": "visual_cot",
        "to": "mvot",
        "label": "视觉想象"
      },
      {
        "from": "mvot",
        "to": "latent_sketchpad",
        "label": "潜空间草图"
      },
      {
        "from": "mvot",
        "to": "visual_thoughts",
        "label": "统一框架"
      },
      {
        "from": "visual_thoughts",
        "to": "covt",
        "label": "连续Token"
      },
      {
        "from": "visual_thoughts",
        "to": "zebra_cot",
        "label": "交错数据"
      },
      {
        "from": "visual_cot",
        "to": "ssr_cot",
        "label": "空间推理"
      },
      {
        "from": "llava_cot",
        "to": "reason_rft",
        "label": "GRPO微调"
      },
      {
        "from": "reason_rft",
        "to": "visionthink",
        "label": "Token压缩"
      },
      {
        "from": "reason_rft",
        "to": "vl_rethinker",
        "label": "自反思"
      },
      {
        "from": "reason_rft",
        "to": "think_or_not",
        "label": "选择性推理"
      },
      {
        "from": "reason_rft",
        "to": "grounded_rl",
        "label": "接地推理"
      },
      {
        "from": "reason_rft",
        "to": "med_r1",
        "label": "医学应用"
      },
      {
        "from": "genome",
        "to": "muslr",
        "label": "符号逻辑"
      }
    ],
    "milestones": [
      "clip",
      "mm_cot",
      "reason_rft"
    ]
  },
  "algos": [
    {
      "id": "vilbert",
      "num": 1,
      "name": "ViLBERT",
      "fullName": "视觉语言BERT (Vision-and-Language BERT)",
      "year": "2019",
      "org": "Georgia Tech / Meta",
      "parent": "—",
      "paperUrl": "https://proceedings.neurips.cc/paper/2019/hash/c74d97b59837b67032d2d4d6208c1d39-Abstract.html",
      "projectUrl": "",
      "category": "foundation",
      "motivation": "首个多模态BERT扩展，双流架构实现跨模态注意力",
      "summary": "ViLBERT 的核心目标是：首个多模态BERT扩展，双流架构实现跨模态注意力。",
      "keyPoints": [
        "核心动机：首个多模态BERT扩展，双流架构实现跨模态注意力",
        "代表机构：Georgia Tech / Meta"
      ],
      "detail": "<p>首个多模态BERT扩展，双流架构实现跨模态注意力</p>"
    },
    {
      "id": "clip",
      "num": 2,
      "name": "CLIP",
      "fullName": "对比语言图像预训练 (Contrastive Language-Image Pre-training)",
      "year": "2021.01",
      "org": "OpenAI",
      "parent": "—",
      "paperUrl": "https://openai.com/index/clip/",
      "projectUrl": "",
      "category": "foundation",
      "motivation": "4亿图文对对比学习，零样本视觉理解奠基",
      "summary": "CLIP 通过在 4 亿图文对上进行对比学习预训练，将图像和文本映射到共享嵌入空间，实现了强大的零样本视觉分类能力，无需任何标注数据即可匹配 ResNet-50 在 ImageNet 上的监督学习性能。",
      "keyPoints": [
        "<strong>对比学习目标</strong>：使用对称的 InfoNCE 损失，最大化匹配图文对的余弦相似度，最小化非匹配对的相似度",
        "<strong>大规模数据集 WIT</strong>：从互联网收集的 4 亿（图像, 文本）对，覆盖 50 万条搜索查询",
        "<strong>双编码器架构</strong>：图像编码器（ResNet / ViT）+ 文本编码器（Transformer），各自独立编码后在共享空间对齐",
        "<strong>可学习温度参数</strong>：温度 <span class=\"kb-math kb-math-inline\">\\tau</span> 作为 log 参数化的可学习标量直接优化，控制 softmax 的 logits 范围",
        "<strong>零样本迁移</strong>：通过自然语言描述类别名，将分类问题转化为图文匹配问题，无需微调",
        "<strong>Prompt Engineering &amp; Ensembling</strong>：使用 \"A photo of a {label}.\" 等模板和多 prompt 集成，在 ImageNet 上提升约 5%",
        "<strong>训练规模</strong>：batch size = 32,768，最大模型 RN50x64 在 592 块 V100 上训练 18 天"
      ],
      "detail": "<h5>核心架构示意图</h5>\n<p><img alt=\"CLIP 训练与零样本推理流程\" src=\"https://ar5iv.labs.arxiv.org/html/2103.00020/assets/x1.png\" />\n<em>图 1：CLIP 的三阶段流程——(1) 对比预训练：联合训练图像编码器和文本编码器，使匹配的图文对在嵌入空间中对齐；(2) 创建零样本分类器：将数据集的类别名嵌入文本模板生成文本嵌入；(3) 零样本预测：计算图像嵌入与所有类别文本嵌入的相似度，选择最高者。</em></p>\n<h5>算法伪代码</h5>\n<p><img alt=\"CLIP 核心实现伪代码\" src=\"https://ar5iv.labs.arxiv.org/html/2103.00020/assets/x3.png\" />\n<em>图 3：CLIP 核心实现的 NumPy 风格伪代码。</em></p>\n<p>以下为整理后的伪代码：</p>\n<pre><code class=\"language-python\"># CLIP 对比学习核心伪代码\n# image_encoder: ResNet 或 Vision Transformer\n# text_encoder:  Transformer\n# I[n, h, w, c]: 一个 mini-batch 的图像\n# T[n, l]:       一个 mini-batch 的文本\n\n# 分别提取特征\nI_f = image_encoder(I)    # [n, d_i]\nT_f = text_encoder(T)     # [n, d_t]\n\n# 线性投影到共享的多模态嵌入空间\nI_e = l2_normalize(I_f @ W_i, axis=1)  # [n, d_e]\nT_e = l2_normalize(T_f @ W_t, axis=1)  # [n, d_e]\n\n# 计算缩放的余弦相似度矩阵\nlogits = (I_e @ T_e.T) * exp(t)  # [n, n], t 为可学习的 log 温度\n\n# 对称交叉熵损失（InfoNCE）\nlabels = arange(n)  # 对角线为正样本对\nloss_i = cross_entropy_loss(logits, labels, axis=0)   # 图像→文本\nloss_t = cross_entropy_loss(logits, labels, axis=1)   # 文本→图像\nloss   = (loss_i + loss_t) / 2\n</code></pre>\n<h5>动机与背景</h5>\n<p>传统视觉模型依赖人工标注的固定类别标签（如 ImageNet 的 1000 类），这带来两个根本问题：<strong>标注成本高昂</strong>和<strong>泛化能力受限</strong>——模型只能识别训练时见过的类别。自然语言处理领域已经证明，从互联网原始文本中学习的预训练模型（如 GPT 系列）具有强大的零样本迁移能力。CLIP 的核心动机是：<strong>能否用自然语言作为监督信号来训练视觉模型，从而继承 NLP 的开放世界泛化能力？</strong></p>\n<p>早期工作如 VirTex、ICMLM 和 ConVIRT 已探索了图文联合学习，但规模有限。CLIP 的关键洞察是：<strong>对比学习目标比预测式目标（如逐词生成图像描述）在计算效率上高出 4 倍</strong>。这使得在 4 亿规模的数据上训练成为可能。</p>\n<h5>核心机制：对比学习目标</h5>\n<p>CLIP 的训练目标是一个<strong>对称的对比损失</strong>。给定一个 batch 中的 <span class=\"kb-math kb-math-inline\">N</span> 个图文对，CLIP 构造一个 <span class=\"kb-math kb-math-inline\">N \\times N</span> 的相似度矩阵，其中对角线元素为正样本对（匹配的图文），其余 <span class=\"kb-math kb-math-inline\">N^2 - N</span> 个为负样本对。</p>\n<p>损失函数为对称的 InfoNCE：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L} = \\frac{1}{2} \\left[ \\frac{1}{N}\\sum_{i=1}^{N} -\\log \\frac{\\exp(\\text{sim}(\\mathbf{I}_i, \\mathbf{T}_i)/\\tau)}{\\sum_{j=1}^{N}\\exp(\\text{sim}(\\mathbf{I}_i, \\mathbf{T}_j)/\\tau)} + \\frac{1}{N}\\sum_{i=1}^{N} -\\log \\frac{\\exp(\\text{sim}(\\mathbf{T}_i, \\mathbf{I}_i)/\\tau)}{\\sum_{j=1}^{N}\\exp(\\text{sim}(\\mathbf{T}_i, \\mathbf{I}_j)/\\tau)} \\right]</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\text{sim}(\\mathbf{I}, \\mathbf{T}) = \\frac{\\mathbf{I} \\cdot \\mathbf{T}}{|\\mathbf{I}||\\mathbf{T}|}</span> 为余弦相似度，<span class=\"kb-math kb-math-inline\">\\tau</span> 为可学习的温度参数。</p>\n<div class=\"key-point\">💡 <strong>关键直觉</strong>：这个损失函数本质上是在做一个 <span class=\"kb-math kb-math-inline\">N</span> 路分类——对于每张图像，要从 <span class=\"kb-math kb-math-inline\">N</span> 个文本中找到匹配的那一个（反之亦然）。batch size 越大，负样本越多，对比信号越强。这就是为什么 CLIP 使用了 32,768 的超大 batch size。</div>\n<h5>双编码器架构</h5>\n<p><strong>图像编码器</strong>提供两种选择：\n1. <strong>ResNet 系列</strong>：基于 ResNet-50，加入 ResNet-D 改进、抗锯齿模糊池化，并将全局平均池化替换为<strong>注意力池化</strong>（单层 Transformer 风格的 QKV 注意力，query 以全局平均池化表示为条件）。通过 EfficientNet 风格的宽度-深度-分辨率联合缩放，扩展到 RN50x4、RN50x16、RN50x64。\n2. <strong>Vision Transformer (ViT)</strong>：紧跟 ViT 原始实现，仅增加了对 patch + position embeddings 的额外 LayerNorm。训练了 ViT-B/32、ViT-B/16、ViT-L/14 三个规模。</p>\n<p><strong>文本编码器</strong>为 Transformer（63M 参数，12 层，512 宽度，8 头注意力），使用 BPE 分词（词表大小 49,152），最大序列长度 76。文本序列以 <code>[SOS]</code> 和 <code>[EOS]</code> 括起，取 <code>[EOS]</code> 位置最高层的激活作为文本表征，经 LayerNorm 后线性投影到共享嵌入空间。使用<strong>掩码自注意力</strong>以保留未来初始化预训练语言模型的能力。</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：两个编码器的输出分别通过各自的线性投影层 <span class=\"kb-math kb-math-inline\">W_i</span> 和 <span class=\"kb-math kb-math-inline\">W_t</span> 映射到<strong>同一维度的共享嵌入空间</strong>，然后进行 L2 归一化。这意味着图像和文本在几何上被约束在同一个超球面上。</div>\n<h5>零样本推理流程</h5>\n<p>CLIP 的零样本分类本质上是将分类问题转化为<strong>检索问题</strong>：</p>\n<ol>\n<li><strong>构造文本分类器</strong>：将目标数据集的每个类别名填入 prompt 模板（如 \"A photo of a {label}.\"），通过文本编码器生成类别嵌入向量</li>\n<li><strong>编码测试图像</strong>：通过图像编码器提取图像嵌入</li>\n<li><strong>匹配预测</strong>：计算图像嵌入与所有类别嵌入的余弦相似度，选择最高相似度的类别</li>\n</ol>\n<div class=\"key-point\">💡 <strong>关键洞察</strong>：从这个角度看，文本编码器实际上是一个<strong>超网络 (Hypernetwork)</strong>——它根据自然语言描述动态生成线性分类器的权重。每一步 CLIP 预训练都可以看作在优化一个随机创建的代理分类器（32,768 类，每类 1 个样本）。</div>\n<h5>Prompt Engineering 与集成</h5>\n<p>直接使用类别名作为文本输入效果欠佳，原因有二：(1) <strong>多义性</strong>——如 \"crane\" 既可以是建筑起重机也可以是鹤；(2) <strong>分布偏移</strong>——预训练数据中文本通常是完整句子而非单词。</p>\n<p>解决方案：\n- <strong>Prompt 模板</strong>：使用 \"A photo of a {label}.\" 作为默认模板，在 ImageNet 上提升 1.3%\n- <strong>领域定制</strong>：如宠物数据集用 \"A photo of a {label}, a type of pet.\"，卫星图用 \"a satellite photo of a {label}.\"\n- <strong>Prompt 集成</strong>：对同一类别使用多个不同 prompt（如 \"A photo of a big {label}\" 和 \"A photo of a small {label}\"），在嵌入空间中平均。ImageNet 上使用 80 个 prompt 集成，额外提升 3.5%</p>\n<h5>训练细节与规模</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>配置</th>\n<th>值</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>数据集</td>\n<td>WIT (WebImageText)，4 亿图文对</td>\n</tr>\n<tr>\n<td>Batch Size</td>\n<td>32,768</td>\n</tr>\n<tr>\n<td>训练轮数</td>\n<td>32 epochs</td>\n</tr>\n<tr>\n<td>优化器</td>\n<td>AdamW（解耦权重衰减）</td>\n</tr>\n<tr>\n<td>学习率调度</td>\n<td>Cosine schedule</td>\n</tr>\n<tr>\n<td>温度初始化</td>\n<td><span class=\"kb-math kb-math-inline\">\\tau</span> 初始化为 0.07，logits 裁剪至最大 100</td>\n</tr>\n<tr>\n<td>精度</td>\n<td>混合精度训练 + 梯度检查点 + 半精度 Adam 统计量</td>\n</tr>\n<tr>\n<td>最大模型训练时间</td>\n<td>RN50x64: 592 V100 × 18 天; ViT-L/14: 256 V100 × 12 天</td>\n</tr>\n<tr>\n<td>最佳模型</td>\n<td>ViT-L/14@336px（额外 1 epoch 高分辨率微调）</td>\n</tr>\n</tbody>\n</table></div>\n<h5>与传统方法的区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th>传统监督学习</th>\n<th>CLIP</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>监督信号</td>\n<td>人工标注的固定类别标签</td>\n<td>自然语言文本（互联网自动采集）</td>\n</tr>\n<tr>\n<td>类别空间</td>\n<td>封闭集（如 1000 类）</td>\n<td>开放集（任意自然语言描述）</td>\n</tr>\n<tr>\n<td>迁移方式</td>\n<td>微调或线性探测</td>\n<td>零样本（无需任何标注数据）</td>\n</tr>\n<tr>\n<td>训练目标</td>\n<td>交叉熵分类</td>\n<td>对比学习（图文匹配）</td>\n</tr>\n<tr>\n<td>鲁棒性</td>\n<td>对分布偏移敏感</td>\n<td>显著更强的分布偏移鲁棒性</td>\n</tr>\n</tbody>\n</table></div>",
      "quiz": {
        "q": "CLIP 选择对比学习目标而非预测式目标（如图像描述生成）的主要原因是什么？",
        "options": [
          "对比学习目标的分类精度更高",
          "预测式目标无法处理图文对数据",
          "对比学习目标的训练效率高出约 4 倍",
          "对比学习目标不需要负样本"
        ],
        "answer": 2,
        "explain": "论文实验表明，对比目标比等价的预测目标（bag-of-words 或 autoregressive）在相同计算量下效率高约 4 倍，这使得在 4 亿规模数据上训练成为可能。"
      }
    },
    {
      "id": "flamingo",
      "num": 3,
      "name": "Flamingo",
      "fullName": "少样本视觉语言模型 (Flamingo: Few-Shot VLM)",
      "year": "2022",
      "org": "DeepMind",
      "parent": "clip",
      "paperUrl": "https://arxiv.org/abs/2204.14198",
      "projectUrl": "",
      "category": "foundation",
      "motivation": "Perceiver+门控交叉注意力，少样本推理突破",
      "summary": "Flamingo 的核心目标是：Perceiver+门控交叉注意力，少样本推理突破。",
      "keyPoints": [
        "核心动机：Perceiver+门控交叉注意力，少样本推理突破",
        "演化来源：继承或改进自 clip",
        "代表机构：DeepMind"
      ],
      "detail": "<p>Perceiver+门控交叉注意力，少样本推理突破</p>"
    },
    {
      "id": "blip2",
      "num": 4,
      "name": "BLIP-2",
      "fullName": "引导式语言图像预训练2 (Bootstrapping Language-Image Pre-training 2)",
      "year": "2023",
      "org": "Salesforce",
      "parent": "clip",
      "paperUrl": "https://proceedings.mlr.press/v202/li23q",
      "projectUrl": "",
      "category": "foundation",
      "motivation": "Q-Former轻量桥接，冻结编码器高效训练",
      "summary": "BLIP-2 的核心目标是：Q-Former轻量桥接，冻结编码器高效训练。",
      "keyPoints": [
        "核心动机：Q-Former轻量桥接，冻结编码器高效训练",
        "演化来源：继承或改进自 clip",
        "代表机构：Salesforce"
      ],
      "detail": "<p>Q-Former轻量桥接，冻结编码器高效训练</p>"
    },
    {
      "id": "llava",
      "num": 5,
      "name": "LLaVA",
      "fullName": "大型语言视觉助手 (Large Language and Vision Assistant)",
      "year": "2023.04",
      "org": "UW-Madison",
      "parent": "blip2",
      "paperUrl": "https://arxiv.org/abs/2304.08485",
      "projectUrl": "",
      "category": "mm_cot",
      "motivation": "视觉指令微调，线性投影实现强大通用推理",
      "summary": "LLaVA 的核心目标是：视觉指令微调，线性投影实现强大通用推理。",
      "keyPoints": [
        "核心动机：视觉指令微调，线性投影实现强大通用推理",
        "演化来源：继承或改进自 blip2",
        "代表机构：UW-Madison"
      ],
      "detail": "<p>视觉指令微调，线性投影实现强大通用推理</p>"
    },
    {
      "id": "mm_cot",
      "num": 6,
      "name": "Multimodal-CoT",
      "fullName": "多模态思维链 (Multimodal Chain-of-Thought)",
      "year": "2023.02",
      "org": "Amazon",
      "parent": "blip2",
      "paperUrl": "https://arxiv.org/abs/2302.00923",
      "projectUrl": "",
      "category": "mm_cot",
      "motivation": "两阶段框架生成推理理由，首超人类水平",
      "summary": "Multimodal-CoT 的核心目标是：两阶段框架生成推理理由，首超人类水平。",
      "keyPoints": [
        "核心动机：两阶段框架生成推理理由，首超人类水平",
        "演化来源：继承或改进自 blip2",
        "代表机构：Amazon"
      ],
      "detail": "<p>两阶段框架生成推理理由，首超人类水平</p>"
    },
    {
      "id": "ddcot",
      "num": 7,
      "name": "DDCoT",
      "fullName": "职责分离思维链 (Duty-Distinct Chain-of-Thought)",
      "year": "2023",
      "org": "Tsinghua",
      "parent": "mm_cot",
      "paperUrl": "https://proceedings.neurips.cc/paper_files/paper/2023/hash/108030643e640ac050e0ed5e6aace48f-Abstract-Conference.html",
      "projectUrl": "",
      "category": "mm_cot",
      "motivation": "职责分离减轻幻觉，提升推理可靠性",
      "summary": "DDCoT 的核心目标是：职责分离减轻幻觉，提升推理可靠性。",
      "keyPoints": [
        "核心动机：职责分离减轻幻觉，提升推理可靠性",
        "演化来源：继承或改进自 mm_cot",
        "代表机构：Tsinghua"
      ],
      "detail": "<p>职责分离减轻幻觉，提升推理可靠性</p>"
    },
    {
      "id": "t_sciq",
      "num": 8,
      "name": "T-SciQ",
      "fullName": "教学式科学问答 (Teaching Multimodal CoT via LLM Signals)",
      "year": "2024",
      "org": "HKUST",
      "parent": "mm_cot",
      "paperUrl": "https://ojs.aaai.org/index.php/AAAI/article/view/29884",
      "projectUrl": "",
      "category": "mm_cot",
      "motivation": "LLM信号教导多模态推理，解决数据稀缺",
      "summary": "T-SciQ 的核心目标是：LLM信号教导多模态推理，解决数据稀缺。",
      "keyPoints": [
        "核心动机：LLM信号教导多模态推理，解决数据稀缺",
        "演化来源：继承或改进自 mm_cot",
        "代表机构：HKUST"
      ],
      "detail": "<p>LLM信号教导多模态推理，解决数据稀缺</p>"
    },
    {
      "id": "visual_cot",
      "num": 9,
      "name": "Visual CoT",
      "fullName": "视觉思维链数据集 (Visual Chain-of-Thought Dataset)",
      "year": "2024",
      "org": "NTU",
      "parent": "mm_cot",
      "paperUrl": "https://proceedings.neurips.cc/paper_files/paper/2024/hash/0ff38d72a2e0aa6dbe42de83a17b2223-Abstract-Datasets_and_Benchmarks_Track.html",
      "projectUrl": "",
      "category": "mm_cot",
      "motivation": "首个综合视觉CoT数据集，定义标注规范",
      "summary": "Visual CoT 构建了一个包含 438k 样本的视觉思维链（Visual Chain-of-Thought）数据集，并提出一种让多模态大语言模型在推理时**先预测关键区域边界框、再裁剪放大该区域重新编码**的两阶段推理流程，使模型能够像人类一样\"聚焦细节再回答\"，在多个 VQA 基准上以更少的视觉 token 实现了超越更大模型和更高分辨率方案的性能。",
      "keyPoints": [
        "<strong>视觉 CoT 数据集</strong>：438k VQA 样本，覆盖 5 大领域（文档/文字识别、图表理解、通用 VQA、关系推理、细粒度识别），其中约 98k 样本附带详细推理步骤标注，数据来源于 12 个公开数据集",
        "<strong>CoT 边界框标注流水线</strong>：利用 GPT-4 生成推理步骤，再通过专用检测/OCR 模型将文本描述的关键区域自动转化为精确的边界框坐标",
        "<strong>Visual Sampler 机制</strong>：基于模型预测的边界框，以中心扩展方式裁剪出正方形子区域，经 CLIP 视觉编码器重新编码后与全局特征拼接，实现\"先定位后精读\"",
        "<strong>两阶段推理流程</strong>：第一阶段输出关键区域坐标 <span class=\"kb-math kb-math-inline\">[x_1, y_1, x_2, y_2]</span>，第二阶段将裁剪区域的视觉特征追加到序列中再生成最终答案",
        "<strong>Token 效率优势</strong>：224×224 全局 + CoT 裁剪区域（共约 500 token）即可超越 448×448 全图方案（约 1024 token），证明\"智能聚焦\"比\"暴力提分辨率\"更高效",
        "<strong>多任务兼容</strong>：同一模型同时支持 VQA 问答和 Referring Expression Comprehension（REC）目标检测任务，REC 性能超越专用模型"
      ],
      "detail": "<h5>整体框架</h5>\n<p><img alt=\"Visual CoT 整体框架\" src=\"https://arxiv.org/html/2403.16999v2/x1.png\" />\n<em>图：Visual CoT 的完整流程。给定图像和问题，模型首先预测关键区域的边界框，Visual Sampler 据此裁剪并重新编码该区域，最后将新增的视觉特征拼接到已有序列中生成最终答案。</em></p>\n<p>Visual CoT 的核心思想是将人类\"先扫视全局、再聚焦细节\"的视觉推理模式引入多模态大语言模型。传统 MLLM（如 LLaVA）将整张图像编码为固定分辨率的视觉 token 后直接回答问题，当关键信息位于图像的小区域时（如文档中的某个数字、图表中的某条曲线），低分辨率编码会丢失细节。Visual CoT 通过让模型\"自己决定看哪里\"来解决这一问题。</p>\n<h5>数据集构建流水线</h5>\n<p><img alt=\"数据集构建与示例\" src=\"https://arxiv.org/html/2403.16999v2/x2.png\" />\n<em>图：Visual CoT 数据集的构建流程与各领域示例。</em></p>\n<p>数据集构建分为三个关键步骤：</p>\n<p><strong>步骤一：推理步骤生成。</strong> 对于每个 VQA 样本，将图像、问题和答案输入 GPT-4，要求其生成逐步推理过程，并在推理中明确指出需要关注的图像区域（以自然语言描述）。</p>\n<p><strong>步骤二：区域定位与边界框生成。</strong> 根据 GPT-4 输出的区域描述，使用专用模型将其转化为精确坐标：\n- 对于<strong>文档/文字类</strong>数据，使用 OCR 引擎（如 PaddleOCR）定位文字区域\n- 对于<strong>通用物体类</strong>数据，使用开放词汇检测器（如 Grounding DINO）定位目标\n- 对于<strong>图表类</strong>数据，结合 OCR 和检测器处理混合内容</p>\n<p><strong>步骤三：质量过滤。</strong> 通过 IoU 阈值、面积比例等规则过滤掉定位不准确的样本，确保边界框确实指向回答问题所需的关键区域。</p>\n<p>最终数据集涵盖 5 个领域、12 个来源数据集：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>领域</th>\n<th>来源数据集</th>\n<th>样本数</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>文档/文字</td>\n<td>SROIE, TextVQA, TextCaps, STVQA</td>\n<td>~120k</td>\n</tr>\n<tr>\n<td>图表</td>\n<td>ChartQA, DVQA, PlotQA</td>\n<td>~95k</td>\n</tr>\n<tr>\n<td>通用 VQA</td>\n<td>VQAv2, OK-VQA, GQA</td>\n<td>~150k</td>\n</tr>\n<tr>\n<td>关系推理</td>\n<td>VSR</td>\n<td>~10k</td>\n</tr>\n<tr>\n<td>细粒度</td>\n<td>Hateful Memes</td>\n<td>~8.5k</td>\n</tr>\n</tbody>\n</table></div>\n<h5>Visual Sampler 裁剪策略</h5>\n<p><img alt=\"Visual Sampler 示意\" src=\"https://arxiv.org/html/2403.16999v2/x3.png\" />\n<em>图：Visual Sampler 的裁剪策略。以预测框中心为基准，取半宽、半高、半分辨率三者的最大值作为扩展半径，裁剪出正方形区域。</em></p>\n<p>Visual Sampler 是连接\"定位\"与\"精读\"的关键组件。给定模型预测的边界框 <span class=\"kb-math kb-math-inline\">[x_1, y_1, x_2, y_2]</span>，裁剪过程如下：</p>\n<pre><code class=\"language-python\"># Visual Sampler 裁剪伪代码\ndef visual_sampler(image, bbox, input_resolution):\n    x1, y1, x2, y2 = bbox\n    cx, cy = (x1 + x2) / 2, (y1 + y2) / 2          # 边界框中心\n    w_half, h_half = (x2 - x1) / 2, (y2 - y1) / 2   # 半宽、半高\n    res_half = input_resolution / 2                    # 输入分辨率的一半\n\n    # 取三者最大值作为正方形半边长\n    half_len = max(w_half, h_half, res_half)\n\n    # 以中心扩展为正方形，并裁剪到图像边界内\n    crop_x1 = max(0, cx - half_len)\n    crop_y1 = max(0, cy - half_len)\n    crop_x2 = min(image.width, cx + half_len)\n    crop_y2 = min(image.height, cy + half_len)\n\n    cropped = image.crop((crop_x1, crop_y1, crop_x2, crop_y2))\n    # 缩放到与全局图像相同的输入分辨率\n    cropped = cropped.resize((input_resolution, input_resolution))\n    return cropped\n</code></pre>\n<p>这一设计有三个关键考量：</p>\n<ol>\n<li><strong>正方形裁剪</strong>：CLIP ViT 的输入为正方形，直接裁剪正方形避免了额外的形变</li>\n<li><strong>最小尺寸保证</strong>（<span class=\"kb-math kb-math-inline\">\\text{res\\_half}</span> 下界）：即使预测框很小，裁剪区域也不会小于输入分辨率的一半，防止过度放大导致的模糊</li>\n<li><strong>中心对齐</strong>：以预测框中心为裁剪中心，保留目标周围的上下文信息</li>\n</ol>\n<div class=\"key-point\">💡 <strong>关键直觉</strong>：Visual Sampler 的本质是一个\"可微的数字变焦镜头\"——模型通过预测坐标来控制镜头对准哪里，然后用相同的视觉编码器对放大后的区域重新提取特征。</div>\n<h5>两阶段推理流程</h5>\n<p>完整的推理过程可以形式化为：</p>\n<p><strong>第一阶段（定位）：</strong></p>\n<div class=\"kb-math kb-math-display\">\\text{bbox} = [x_1, y_1, x_2, y_2] = f_{\\text{LLM}}(H_0, T_q)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">H_0 = g_{\\text{ViT}}(I)</span> 是全局图像特征，<span class=\"kb-math kb-math-inline\">T_q</span> 是问题的文本 token。模型在生成答案之前，先输出一个特殊格式的边界框坐标。</p>\n<p><strong>第二阶段（精读与回答）：</strong></p>\n<div class=\"kb-math kb-math-display\">I_{\\text{crop}} = \\text{VisualSampler}(I, \\text{bbox})</div>\n<div class=\"kb-math kb-math-display\">H_1 = g_{\\text{ViT}}(I_{\\text{crop}})</div>\n<div class=\"kb-math kb-math-display\">\\text{answer} = f_{\\text{LLM}}([H_0; H_1], T_q)</div>\n<p>裁剪后的图像经同一 CLIP ViT 编码得到 <span class=\"kb-math kb-math-inline\">H_1</span>，与原始全局特征 <span class=\"kb-math kb-math-inline\">H_0</span> 拼接后，模型基于\"全局+局部\"的双重视觉信息生成最终答案。</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：整个流程只需要一个 ViT 和一个 LLM，不引入额外的检测模型。边界框预测完全由 LLM 自身完成，这使得模型在推理时保持端到端的简洁性。</div>\n<h5>训练策略</h5>\n<p>模型基于 LLaVA-1.5 架构（CLIP ViT-L/14 + Vicuna-7B/13B），采用两阶段训练：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>阶段</th>\n<th>数据</th>\n<th>学习率</th>\n<th>训练参数</th>\n<th>Epoch</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>预训练</td>\n<td>558k 图文对齐数据</td>\n<td>2e-3</td>\n<td>仅投影层</td>\n<td>1</td>\n</tr>\n<tr>\n<td>微调</td>\n<td>665k 指令数据 + 438k VisCoT 数据</td>\n<td>2e-5</td>\n<td>全参数</td>\n<td>1</td>\n</tr>\n</tbody>\n</table></div>\n<p>训练在 32 张 A100 GPU 上使用 FSDP ZeRO-3 策略完成。训练数据中的 CoT 样本格式为：</p>\n<pre><code>Question: {question}\nAnswer: To answer this question, I need to focus on [x1, y1, x2, y2].\n{reasoning steps}\nThe answer is {answer}.\n</code></pre>\n<h5>实验结果与分析</h5>\n<p><strong>主要结果：</strong> VisCoT-7B（336×336）在 8 个 VQA 基准上的平均得分达到 0.580，超越了 LLaVA-1.5-13B（0.478）这一参数量近两倍的模型。</p>\n<p>关键发现包括：</p>\n<ol>\n<li><strong>CoT 的显著增益</strong>：在消融实验中，移除 CoT 机制后平均性能从 0.580 降至 0.443（-13.7%），证明视觉思维链的核心价值</li>\n<li><strong>GT 边界框上界</strong>：使用 ground-truth 边界框时性能可达 0.752，说明更精准的定位还有巨大提升空间</li>\n<li><strong>Token 效率</strong>：224 分辨率 + CoT 裁剪（~500 token）的性能优于 448 分辨率无 CoT（~1024 token），以约一半的 token 量实现更好效果</li>\n<li><strong>文档场景的巨大提升</strong>：在 SROIE（收据信息提取）任务上，VisCoT 相比基线提升约 8 倍（从 5.8% 到 47.8%），因为文档中的关键文字通常集中在小区域</li>\n<li><strong>REC 能力</strong>：模型在 RefCOCO/RefCOCO+/RefCOCOg 上的目标检测性能超越了 KOSMOS-2、Shikra 等专用模型，证明 CoT 训练带来的定位能力具有通用性</li>\n</ol>\n<div class=\"key-point\">💡 <strong>关键洞察</strong>：Visual CoT 揭示了一个重要设计原则——对于需要细节理解的视觉任务，\"智能地选择看哪里\"比\"盲目提高全图分辨率\"更有效且更经济。这与人类视觉系统中注视点（foveation）机制的原理一致。</div>",
      "quiz": {
        "q": "Visual CoT 中 Visual Sampler 裁剪区域的最小尺寸由什么决定？",
        "options": [
          "预测边界框的面积",
          "输入分辨率的一半（res_half）",
          "图像原始分辨率",
          "CLIP ViT 的 patch 大小"
        ],
        "answer": 1,
        "explain": "Visual Sampler 取 w_half、h_half、res_half 三者的最大值作为裁剪半边长，其中 res_half（输入分辨率的一半）作为下界，确保裁剪区域不会过小导致放大后模糊。"
      }
    },
    {
      "id": "image_of_thought",
      "num": 10,
      "name": "Image-of-Thought",
      "fullName": "图像思维提示 (Image-of-Thought Prompting)",
      "year": "2024.05",
      "org": "CUHK",
      "parent": "visual_cot",
      "paperUrl": "https://arxiv.org/abs/2405.13872",
      "projectUrl": "",
      "category": "mm_cot",
      "motivation": "每步锚定文本与视觉证据，精细化推理",
      "summary": "Image-of-Thought 的核心目标是：每步锚定文本与视觉证据，精细化推理。",
      "keyPoints": [
        "核心动机：每步锚定文本与视觉证据，精细化推理",
        "演化来源：继承或改进自 visual_cot",
        "代表机构：CUHK"
      ],
      "detail": "<p>每步锚定文本与视觉证据，精细化推理</p>"
    },
    {
      "id": "llava_cot",
      "num": 11,
      "name": "LLaVA-CoT",
      "fullName": "LLaVA思维链推理 (LLaVA Chain-of-Thought)",
      "year": "2025",
      "org": "ByteDance",
      "parent": "llava",
      "paperUrl": "https://openaccess.thecvf.com/content/ICCV2025/html/Xu_LLaVA-CoT_Let_Vision_Language_Models_Reason_Step-by-Step_ICCV_2025_paper.html",
      "projectUrl": "",
      "category": "mm_cot",
      "motivation": "让VLM逐步推理，结构化提升多步准确性",
      "summary": "LLaVA-CoT 提出将视觉语言模型的推理过程分解为四个结构化阶段（摘要→描述→推理→结论），并配合阶段级束搜索与回溯机制（SWIRES），在仅 100k 训练数据的条件下使 11B 模型在多个推理基准上超越 GPT-4o-mini，实现了多模态 CoT 推理的系统性突破。",
      "keyPoints": [
        "<strong>四阶段结构化推理</strong>：将响应分为 <code>&lt;SUMMARY&gt;</code>、<code>&lt;CAPTION&gt;</code>、<code>&lt;REASONING&gt;</code>、<code>&lt;CONCLUSION&gt;</code> 四个 XML 标签包裹的阶段，强制模型先规划、再观察、再推理、最后总结",
        "<strong>LLaVA-CoT-100k 数据集</strong>：从 ShareGPT4V、ChartQA、A-OKVQA、GeoQA+ 等 10 个 VQA 数据集中筛选 99k 样本，由 GPT-4o 生成四阶段格式的推理标注",
        "<strong>基座模型</strong>：Llama-3.2-11B-Vision-Instruct，全参数 SFT，8×H100 训练",
        "<strong>SWIRES（Stage-wise Beam Search with Backtracking）</strong>：测试时在每个推理阶段生成多个候选、用奖励模型评分筛选、不满足阈值则回溯重试，实现阶段级 test-time scaling",
        "<strong>奖励模型</strong>：InternLM-XComposer2.5-Reward（IXC-2.5-Reward），用于在线评估各阶段输出质量",
        "<strong>性能</strong>：6 个基准平均从基座 56.6 提升至 62.4（训练后）→ 65.5（+SWIRES），在 MMStar、MMBench、MathVista 等推理密集型任务上超越 GPT-4o-mini 和 Gemini-1.5-pro",
        "<strong>消融发现</strong>：直接训练 CoT 数据（无标签）= 59.0，加标签但无结构 = 60.9，完整四阶段 = 62.4，证明结构化标签是关键"
      ],
      "detail": "<h5>动机与背景</h5>\n<p>当前视觉语言模型（VLM）在面对复杂推理任务时存在两个关键问题：</p>\n<ol>\n<li><strong>仓促回答</strong>：模型未充分组织问题信息就直接给出答案，例如 Llama-3.2-11B-Vision-Instruct 在看到\"这个人接下来会做什么？\"的问题时，误将选项中的\"cry\"理解为自杀倾向而拒绝回答</li>\n<li><strong>推理偏离</strong>：模型在推理过程中偏离逻辑路径，草率得出\"问题无意义\"等错误结论</li>\n</ol>\n<p>这些问题的根源在于：VLM 缺乏系统性的推理框架来组织\"看什么→想什么→怎么推→得什么\"的完整思维链。传统的 CoT prompting 虽然在 LLM 中有效，但直接应用于 VLM 时效果有限（实验显示基座模型加 CoT 提示后平均分不变，仍为 56.9）。</p>\n<div class=\"key-point\">💡 关键洞察：VLM 的推理不仅需要语言层面的链式思考，还需要在<strong>视觉感知</strong>和<strong>逻辑推理</strong>之间建立显式的阶段划分。</div>\n<h5>核心方法：四阶段结构化推理</h5>\n<p><img alt=\"LLaVA-CoT 四阶段推理框架\" src=\"assets/llava_cot_framework.png\" />\n<em>图：LLaVA-CoT 将推理过程分解为 Summary → Caption → Reasoning → Conclusion 四个阶段</em></p>\n<p>LLaVA-CoT 的核心创新是将模型的推理过程显式分解为四个阶段，每个阶段用 XML 标签包裹：</p>\n<p><strong>Stage 1 — Summary（问题摘要）</strong>：模型首先概述解题思路，规划后续步骤。这迫使模型在回答前先\"想清楚要做什么\"，避免仓促回答。</p>\n<p><strong>Stage 2 — Caption（视觉描述）</strong>：模型描述图像中与问题相关的细节。这一阶段将视觉感知与推理解耦，确保模型充分\"看清楚图片内容\"。</p>\n<p><strong>Stage 3 — Reasoning（逻辑推理）</strong>：基于前两个阶段的信息，模型进行逐步的逻辑推理。这是传统 CoT 的核心部分，但因为有了前置的规划和观察，推理质量显著提升。</p>\n<p><strong>Stage 4 — Conclusion（最终结论）</strong>：给出简洁直接的最终答案。</p>\n<p>模型输出格式示例：</p>\n<pre><code>&lt;SUMMARY&gt;我需要分析图中的几何关系来求解角度...&lt;/SUMMARY&gt;\n&lt;CAPTION&gt;图中显示一个三角形ABC，其中角A=60°，边AB上有一点D...&lt;/CAPTION&gt;\n&lt;REASONING&gt;由三角形内角和定理，角B+角C=120°。又因为AD是角平分线...&lt;/REASONING&gt;\n&lt;CONCLUSION&gt;角BDC = 120°&lt;/CONCLUSION&gt;\n</code></pre>\n<div class=\"warn-box\">⚠️ 注意：标签结构不是简单的 prompt 工程——模型通过 SFT 学会了在生成过程中自主切换阶段，标签成为模型内部推理流程的一部分。</div>\n<h5>数据集构建：LLaVA-CoT-100k</h5>\n<p>数据集构建流程：</p>\n<ol>\n<li><strong>来源选择</strong>：从 10 个 VQA 数据集中采样，覆盖通用 VQA（ShareGPT4V, A-OKVQA）、图表理解（ChartQA, DVQA）、文档/OCR（DocVQA, SynthDoG-EN）、数学推理（GeoQA+, CLEVR-Math）、科学推理（AI2D）等多种任务类型</li>\n<li><strong>GPT-4o 标注</strong>：将原始问题、图像和标准答案提供给 GPT-4o，要求其按四阶段格式生成推理过程</li>\n<li><strong>格式验证</strong>：过滤不符合 XML 标签格式的输出</li>\n<li><strong>答案一致性检查</strong>：用 GPT-4o 验证生成的 CONCLUSION 与原始标准答案是否一致，过滤拒绝回答或答案不匹配的样本</li>\n</ol>\n<p>最终得到约 99k 高质量样本。</p>\n<h5>训练细节</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>参数</th>\n<th>值</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>基座模型</td>\n<td>Llama-3.2-11B-Vision-Instruct</td>\n</tr>\n<tr>\n<td>训练方式</td>\n<td>全参数 SFT（FSDP）</td>\n</tr>\n<tr>\n<td>学习率</td>\n<td><span class=\"kb-math kb-math-inline\">1 \\times 10^{-5}</span></td>\n</tr>\n<tr>\n<td>Epochs</td>\n<td>3</td>\n</tr>\n<tr>\n<td>Batch size</td>\n<td>4</td>\n</tr>\n<tr>\n<td>Context length</td>\n<td>4096</td>\n</tr>\n<tr>\n<td>混合精度</td>\n<td>True</td>\n</tr>\n<tr>\n<td>硬件</td>\n<td>8 × H100 GPU</td>\n</tr>\n</tbody>\n</table></div>\n<h5>SWIRES：阶段级测试时搜索</h5>\n<p><img alt=\"SWIRES 阶段级束搜索与回溯机制\" src=\"assets/llava_cot_swires.png\" />\n<em>图：SWIRES 在每个推理阶段生成多个候选，用奖励模型评分筛选，不满足条件则回溯</em></p>\n<p>SWIRES（Stage-wise Beam Search with Backtracking）是 LLaVA-CoT 的测试时缩放方法，其核心思想是：<strong>利用四阶段结构的天然分界点，在每个阶段独立进行束搜索和质量控制</strong>。</p>\n<p>算法伪代码：</p>\n<pre><code class=\"language-python\"># SWIRES: Stage-wise Retrace Algorithm\n# M=4 (candidates per stage), N=2 (keep top), C=3 (max backtracks)\ndef swires(question, image, reward_model, M=4, N=2, C=3):\n    # Stage 1: Generate one summary\n    summary = generate_summary(question, image)\n\n    backtrack_count = 0\n    candidates, scores = [], []\n\n    while backtrack_count &lt; C:\n        # Stage 2: Generate M captions, keep top N\n        captions = [generate_caption(summary) for _ in range(M)]\n        caption_scores = [reward_model.score(c) for c in captions]\n        top_captions = top_k(captions, caption_scores, N)\n\n        # Stage 3: Generate M reasonings per caption\n        for caption in top_captions:\n            reasonings = [generate_reasoning(caption) for _ in range(M)]\n            for r in reasonings:\n                candidates.append(r)\n                scores.append(reward_model.score(r))\n\n        # Check backtrack condition\n        sorted_scores = sorted(scores, reverse=True)\n        threshold = reward_mean + Z * reward_std  # Z=0.2533\n        if sorted_scores[1] &gt;= threshold:  # 2nd best passes\n            break\n        backtrack_count += 1\n\n    # Stage 4: Generate conclusion for top N reasonings\n    top_reasonings = top_k(candidates, scores, N)\n    conclusions = [generate_conclusion(r) for r in top_reasonings]\n    conclusion_scores = [reward_model.score(c) for c in conclusions]\n\n    return conclusions[argmax(conclusion_scores)]\n</code></pre>\n<p><strong>回溯阈值设计</strong>：</p>\n<p>回溯条件基于奖励分数的统计分布：</p>\n<div class=\"kb-math kb-math-display\">\\text{backtrack\\_cutoff} = \\mu_{\\text{reward}} + Z \\times \\sigma_{\\text{reward}}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\mu_{\\text{reward}} = -0.77</span>，<span class=\"kb-math kb-math-inline\">\\sigma_{\\text{reward}} = 2.08</span>，<span class=\"kb-math kb-math-inline\">Z = 0.2533</span>。这个 Z 值对应标准正态分布中 top 40% 的分位点——即只要第二好的候选分数超过此阈值（意味着它在分布中排名前 40%），就认为当前候选集质量足够，无需回溯。</p>\n<div class=\"key-point\">💡 关键：SWIRES 与传统 Best-of-N 搜索的本质区别在于<strong>阶段级粒度</strong>。传统方法在完整响应级别搜索，而 SWIRES 在每个阶段独立搜索，允许不同阶段的最优候选自由组合，搜索效率更高。</div>\n<h5>与传统方法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>搜索粒度</th>\n<th>回溯能力</th>\n<th>适用场景</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Best-of-N</td>\n<td>完整响应</td>\n<td>无</td>\n<td>通用</td>\n</tr>\n<tr>\n<td>Beam Search</td>\n<td>Token 级</td>\n<td>无</td>\n<td>生成质量</td>\n</tr>\n<tr>\n<td>SWIRES</td>\n<td>推理阶段级</td>\n<td>有（阶段间回溯）</td>\n<td>结构化推理</td>\n</tr>\n</tbody>\n</table></div>\n<p>实验表明，SWIRES 在相同计算预算下显著优于 Best-of-N：在 MMStar 上，Best-of-N（32 次采样）达到 59.5，而 SWIRES（等效计算量）达到 61.2。</p>\n<h5>实验结果</h5>\n<p><strong>主要结果（6 个推理基准）</strong>：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>模型</th>\n<th>MMStar</th>\n<th>MMBench</th>\n<th>MMVet</th>\n<th>MathVista</th>\n<th>AI2D</th>\n<th>Hallusion</th>\n<th>Avg</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Llama-3.2-11B (base)</td>\n<td>49.8</td>\n<td>65.8</td>\n<td>57.6</td>\n<td>47.6</td>\n<td>77.0</td>\n<td>41.9</td>\n<td>56.6</td>\n</tr>\n<tr>\n<td>GPT-4o-mini</td>\n<td>54.9</td>\n<td>76.9</td>\n<td>66.9</td>\n<td>52.4</td>\n<td>77.8</td>\n<td>46.1</td>\n<td>62.5</td>\n</tr>\n<tr>\n<td><strong>LLaVA-CoT</strong></td>\n<td><strong>57.6</strong></td>\n<td>73.8</td>\n<td>60.0</td>\n<td><strong>54.8</strong></td>\n<td><strong>85.0</strong></td>\n<td>43.1</td>\n<td><strong>62.4</strong></td>\n</tr>\n<tr>\n<td><strong>LLaVA-CoT + SWIRES</strong></td>\n<td><strong>61.2</strong></td>\n<td><strong>75.3</strong></td>\n<td><strong>63.2</strong></td>\n<td><strong>57.4</strong></td>\n<td><strong>85.7</strong></td>\n<td><strong>50.1</strong></td>\n<td><strong>65.5</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>消融实验（训练策略）</strong>：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>训练方式</th>\n<th>MMStar</th>\n<th>Avg</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>基座直接推理</td>\n<td>49.8</td>\n<td>56.6</td>\n</tr>\n<tr>\n<td>直接训练 CoT（无标签）</td>\n<td>51.8</td>\n<td>59.0</td>\n</tr>\n<tr>\n<td>加标签但无结构</td>\n<td>54.3</td>\n<td>60.9</td>\n</tr>\n<tr>\n<td><strong>完整四阶段（LLaVA-CoT）</strong></td>\n<td><strong>57.6</strong></td>\n<td><strong>62.4</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p>消融结果清晰表明：(1) CoT 训练本身带来 +2.4 的提升；(2) XML 标签结构额外带来 +1.9；(3) 完整四阶段设计再带来 +1.5。结构化标签不仅是格式约束，更是帮助模型建立内部推理流程的关键机制。</p>\n<p><strong>MMStar 技能维度分析</strong>显示，LLaVA-CoT 的增益主要来自推理密集型维度（Instance Reasoning +10.7, Logical Reasoning +9.3, Math +10.0, Science &amp; Tech +8.0），而在感知维度（Coarse/Fine-grained Perception）上提升较小（+3.3/+4.0），验证了方法确实增强了推理而非感知能力。</p>",
      "quiz": {
        "q": "LLaVA-CoT 的 SWIRES 测试时搜索方法与传统 Best-of-N 采样的核心区别是什么？",
        "options": [
          "SWIRES 使用更大的采样温度来增加多样性",
          "SWIRES 在每个推理阶段独立进行束搜索和回溯，而非在完整响应级别搜索",
          "SWIRES 使用更强的奖励模型进行评分",
          "SWIRES 通过微调模型参数来提升推理质量"
        ],
        "answer": 1,
        "explain": "SWIRES 利用四阶段结构化推理的天然分界点，在 Caption、Reasoning、Conclusion 每个阶段独立生成多个候选并用奖励模型筛选，还支持阶段间回溯。这种阶段级粒度的搜索比完整响应级别的 Best-of-N 更高效，因为它允许不同阶段的最优候选自由组合。"
      }
    },
    {
      "id": "visprog",
      "num": 12,
      "name": "VisProg",
      "fullName": "视觉编程 (Visual Programming)",
      "year": "2023",
      "org": "UW",
      "parent": "blip2",
      "paperUrl": "http://openaccess.thecvf.com/content/CVPR2023/html/Gupta_Visual_Programming_Compositional_Visual_Reasoning_Without_Training_CVPR_2023_paper.html",
      "projectUrl": "",
      "category": "compositional",
      "motivation": "LLM生成Python调用视觉API，无需训练",
      "summary": "VisProg 的核心目标是：LLM生成Python调用视觉API，无需训练。",
      "keyPoints": [
        "核心动机：LLM生成Python调用视觉API，无需训练",
        "演化来源：继承或改进自 blip2",
        "代表机构：UW"
      ],
      "detail": "<p>LLM生成Python调用视觉API，无需训练</p>"
    },
    {
      "id": "vipergpt",
      "num": 13,
      "name": "ViperGPT",
      "fullName": "Python执行视觉推理 (Visual Inference via Python Execution)",
      "year": "2023",
      "org": "Columbia",
      "parent": "visprog",
      "paperUrl": "https://openaccess.thecvf.com/content/ICCV2023/html/Suris_ViperGPT_Visual_Inference_via_Python_Execution_for_Reasoning_ICCV_2023_paper.html",
      "projectUrl": "",
      "category": "compositional",
      "motivation": "代码执行实现可解释可调试的视觉推理",
      "summary": "ViperGPT 的核心目标是：代码执行实现可解释可调试的视觉推理。",
      "keyPoints": [
        "核心动机：代码执行实现可解释可调试的视觉推理",
        "演化来源：继承或改进自 visprog",
        "代表机构：Columbia"
      ],
      "detail": "<p>代码执行实现可解释可调试的视觉推理</p>"
    },
    {
      "id": "genome",
      "num": 14,
      "name": "GENOME",
      "fullName": "生成式神经符号推理 (Generative Neuro-Symbolic Reasoning)",
      "year": "2024",
      "org": "MIT",
      "parent": "vipergpt",
      "paperUrl": "https://openreview.net/forum?id=GENOME2024",
      "projectUrl": "",
      "category": "compositional",
      "motivation": "模块生长与重用，动态扩展组合泛化",
      "summary": "GENOME 的核心目标是：模块生长与重用，动态扩展组合泛化。",
      "keyPoints": [
        "核心动机：模块生长与重用，动态扩展组合泛化",
        "演化来源：继承或改进自 vipergpt",
        "代表机构：MIT"
      ],
      "detail": "<p>模块生长与重用，动态扩展组合泛化</p>"
    },
    {
      "id": "cot_vla",
      "num": 15,
      "name": "CoT-VLA",
      "fullName": "视觉语言动作思维链 (Chain-of-Thought for Vision-Language-Action)",
      "year": "2025",
      "org": "Stanford",
      "parent": "llava_cot",
      "paperUrl": "http://openaccess.thecvf.com/content/CVPR2025/html/Zhao_CoT-VLA_Visual_Chain-of-Thought_Reasoning_for_Vision-Language-Action_Models_CVPR_2025_paper.html",
      "projectUrl": "",
      "category": "compositional",
      "motivation": "CoT扩展至具身智能，提升机器人决策",
      "summary": "CoT-VLA 提出在视觉-语言-动作模型中引入**视觉思维链（Visual Chain-of-Thought）**机制，在预测动作之前先自回归生成未来子目标图像作为隐式推理步骤，结合混合注意力机制和动作分块策略，显著提升了机器人在仿真与真实环境中的长时操作任务成功率。",
      "keyPoints": [
        "<strong>视觉思维链（Visual CoT）</strong>：在动作预测前先生成未来子目标图像（预测未来约 0.4 秒的场景），作为视觉推理的中间步骤，替代传统文本 CoT",
        "<strong>基础模型 VILA-U 7B</strong>：基于统一视觉-语言模型，使用离散视觉 tokenizer 将图像编码为 <span class=\"kb-math kb-math-inline\">16 \\times 16 \\times 4 = 1024</span> 个 token，实现图像理解与生成的统一",
        "<strong>混合注意力机制（Hybrid Attention）</strong>：图像/文本 token 使用因果注意力，动作 token 使用全注意力（bidirectional），使动作预测能同时利用所有上下文信息",
        "<strong>动作分块（Action Chunking）</strong>：每步预测 10 个连续动作（7-DoF，256 bins 离散化），减少自回归步数，提升推理效率",
        "<strong>两阶段训练</strong>：先在 OpenX-Embodiment、EPIC-KITCHENS、Something-Something V2 上预训练视觉预测能力，再在目标机器人数据上微调",
        "<strong>三大评估基准</strong>：LIBERO 仿真（4 个任务套件）、Bridge-V2 真实机器人、Franka 桌面操作，均取得 SOTA 或竞争性结果"
      ],
      "detail": "<h5>整体架构</h5>\n<p><img alt=\"CoT-VLA 与传统 VLA 对比\" src=\"https://ar5iv.labs.arxiv.org/html/2503.22020/assets/x1.png\" />\n<em>图 1：传统 VLA 直接从观测预测动作（System-1 快思考），CoT-VLA 先生成子目标图像再预测动作（System-2 慢思考），实现视觉推理</em></p>\n<p><img alt=\"CoT-VLA 模型架构\" src=\"https://ar5iv.labs.arxiv.org/html/2503.22020/assets/x2.png\" />\n<em>图 2：CoT-VLA 完整架构。输入为当前观测图像 + 语言指令，模型先自回归生成子目标图像 token，再基于混合注意力预测动作 chunk</em></p>\n<p>CoT-VLA 的核心思想源自认知科学中的 <strong>System-1 / System-2 双系统理论</strong>：传统 VLA（如 OpenVLA、π₀）类似 System-1 的快速反射式决策，直接从观测映射到动作；而 CoT-VLA 引入 System-2 的慢思考过程——在输出动作前，先\"想象\"未来场景会是什么样子，再据此做出决策。</p>\n<h5>视觉思维链机制</h5>\n<p><strong>为什么用视觉 CoT 而非文本 CoT？</strong> 机器人操作任务的推理本质上是空间性的——物体在哪里、手臂该往哪移动、目标状态是什么样。这些信息用自然语言描述既冗长又不精确，而一张子目标图像可以直接编码丰富的空间几何信息。</p>\n<p><strong>子目标图像的定义</strong>：给定当前时刻 <span class=\"kb-math kb-math-inline\">t</span> 的观测，子目标图像为未来 <span class=\"kb-math kb-math-inline\">t + k</span> 时刻的图像帧（<span class=\"kb-math kb-math-inline\">k</span> 对应约 0.4 秒后的场景）。训练时直接从演示轨迹中取对应帧作为监督信号，无需额外标注。</p>\n<p><strong>图像 token 化</strong>：使用 VILA-U 的离散视觉 tokenizer，将 <span class=\"kb-math kb-math-inline\">256 \\times 256</span> 的图像编码为 <span class=\"kb-math kb-math-inline\">16 \\times 16</span> 的空间网格，每个位置有 4 层残差深度（residual depth），共 <span class=\"kb-math kb-math-inline\">1024</span> 个离散 token。生成子目标图像时按光栅扫描顺序自回归生成这些 token。</p>\n<p>训练损失函数为：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L} = \\mathcal{L}_{\\text{visual}} + \\mathcal{L}_{\\text{action}}</div>\n<p>其中：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{visual}} = -\\sum_{i=1}^{N_{\\text{img}}} \\log p_\\theta(v_i \\mid v_{&lt;i}, \\mathbf{o}, \\mathbf{l})</div>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{action}} = -\\sum_{j=1}^{N_{\\text{act}}} \\log p_\\theta(a_j \\mid a_{&lt;j}, \\hat{\\mathbf{s}}, \\mathbf{o}, \\mathbf{l})</div>\n<div class=\"key-point\">💡 <strong>关键</strong>：视觉损失 <span class=\"kb-math kb-math-inline\">\\mathcal{L}_{\\text{visual}}</span> 迫使模型学习预测未来场景的能力（即世界模型），而动作损失 <span class=\"kb-math kb-math-inline\">\\mathcal{L}_{\\text{action}}</span> 确保生成的子目标图像能有效指导动作预测。两者联合优化使模型同时具备\"想象\"和\"执行\"能力。</div>\n<h5>混合注意力机制</h5>\n<p><img alt=\"混合注意力机制\" src=\"https://ar5iv.labs.arxiv.org/html/2503.22020/assets/x3.png\" />\n<em>图 3：混合注意力设计。图像和文本 token 使用因果注意力（下三角掩码），动作 token 使用全注意力（可看到所有 token）</em></p>\n<p>传统 LLM 使用纯因果注意力（每个 token 只能看到之前的 token），这对文本生成是合理的，但对动作预测并非最优——一个动作 chunk 中的各个动作应该相互协调。</p>\n<p>CoT-VLA 的混合注意力设计：\n- <strong>图像 token 和文本 token</strong>：保持因果注意力，维持自回归生成能力\n- <strong>动作 token</strong>：使用全注意力（bidirectional），每个动作 token 可以看到所有其他 token（包括后续的动作 token）</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：这种设计使得动作 token 不再是严格自回归的，而是类似 BERT 的双向编码。这意味着动作 chunk 内的所有动作可以并行解码，既提升了质量又不增加推理延迟。</div>\n<h5>动作表示与分块</h5>\n<ul>\n<li><strong>动作空间</strong>：7-DoF（6 维末端执行器位姿 + 1 维夹爪开合）</li>\n<li><strong>离散化</strong>：每个维度均匀量化为 256 个 bin</li>\n<li><strong>动作分块</strong>：每次预测 <span class=\"kb-math kb-math-inline\">C = 10</span> 个连续动作，共 <span class=\"kb-math kb-math-inline\">10 \\times 7 = 70</span> 个 token</li>\n<li>执行时使用时序集成（temporal ensembling）平滑相邻 chunk 的重叠动作</li>\n</ul>\n<h5>核心算法伪代码</h5>\n<pre><code class=\"language-python\"># CoT-VLA 推理流程\ndef cot_vla_inference(observation, language_instruction, model):\n    # Step 1: 编码输入\n    img_tokens = visual_tokenizer.encode(observation)  # 1024 tokens\n    text_tokens = text_tokenizer.encode(language_instruction)\n\n    # Step 2: Visual Chain-of-Thought — 自回归生成子目标图像\n    subgoal_tokens = []\n    for i in range(1024):  # 16x16x4 tokens\n        next_token = model.generate_next(\n            context=[img_tokens, text_tokens, subgoal_tokens],\n            attention=&quot;causal&quot;  # 因果注意力\n        )\n        subgoal_tokens.append(next_token)\n    subgoal_image = visual_tokenizer.decode(subgoal_tokens)\n\n    # Step 3: 动作预测 — 全注意力并行解码\n    action_chunk = model.predict_actions(\n        context=[img_tokens, text_tokens, subgoal_tokens],\n        num_actions=10,  # chunk size C=10\n        attention=&quot;full&quot;  # 动作 token 间全注意力\n    )  # shape: (10, 7), 每个动作 7-DoF\n\n    # Step 4: 离散 bin → 连续动作值\n    actions = dequantize(action_chunk, num_bins=256)\n    return actions, subgoal_image\n</code></pre>\n<h5>训练流程</h5>\n<p><strong>阶段一：预训练（视觉预测能力）</strong>\n- 数据：OpenX-Embodiment 子集（Bridge-V2、Fractal 等）+ EPIC-KITCHENS（人手操作视频）+ Something-Something V2（人-物交互视频）\n- 目标：仅优化 <span class=\"kb-math kb-math-inline\">\\mathcal{L}_{\\text{visual}}</span>，训练模型预测未来图像帧的能力\n- 预训练带来 <strong>46.7% 的相对性能提升</strong>，说明视觉预测预训练对下游任务至关重要</p>\n<p><strong>阶段二：微调（目标任务）</strong>\n- 数据：目标机器人的演示轨迹\n- 目标：联合优化 <span class=\"kb-math kb-math-inline\">\\mathcal{L}_{\\text{visual}} + \\mathcal{L}_{\\text{action}}</span>\n- 超参数：学习率 <span class=\"kb-math kb-math-inline\">2 \\times 10^{-5}</span>，batch size 128（LIBERO）/ 256（Bridge-V2），训练 100 epoch</p>\n<h5>与传统方法的区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>OpenVLA</th>\n<th>π₀</th>\n<th>CoT-VLA</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>推理方式</td>\n<td>直接映射</td>\n<td>扩散去噪</td>\n<td>视觉 CoT + 动作预测</td>\n</tr>\n<tr>\n<td>动作表示</td>\n<td>离散 token</td>\n<td>连续（flow matching）</td>\n<td>离散 token（分块）</td>\n</tr>\n<tr>\n<td>注意力</td>\n<td>纯因果</td>\n<td>因果</td>\n<td>混合（因果 + 全）</td>\n</tr>\n<tr>\n<td>世界模型</td>\n<td>无</td>\n<td>无</td>\n<td>隐式（子目标生成）</td>\n</tr>\n<tr>\n<td>推理速度</td>\n<td>快</td>\n<td>中等</td>\n<td>较慢（7× overhead）</td>\n</tr>\n</tbody>\n</table></div>\n<h5>实验结果</h5>\n<p><strong>LIBERO 仿真基准</strong>（4 个任务套件，每套 10 个任务，每任务 20 次评估）：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>LIBERO-Spatial</th>\n<th>LIBERO-Object</th>\n<th>LIBERO-Goal</th>\n<th>LIBERO-Long</th>\n<th>平均</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Diffusion Policy</td>\n<td>78.3%</td>\n<td>92.5%</td>\n<td>68.3%</td>\n<td>50.5%</td>\n<td>72.4%</td>\n</tr>\n<tr>\n<td>OpenVLA</td>\n<td>84.7%</td>\n<td>88.4%</td>\n<td>51.6%</td>\n<td>46.7%</td>\n<td>67.8%</td>\n</tr>\n<tr>\n<td>π₀ (fine-tuned)</td>\n<td>82.3%</td>\n<td>90.0%</td>\n<td>75.0%</td>\n<td>62.5%</td>\n<td>77.5%</td>\n</tr>\n<tr>\n<td><strong>CoT-VLA</strong></td>\n<td><strong>86.3%</strong></td>\n<td><strong>91.0%</strong></td>\n<td><strong>79.0%</strong></td>\n<td><strong>68.2%</strong></td>\n<td><strong>81.1%</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p>CoT-VLA 在所有 4 个套件上均取得最佳或接近最佳结果，尤其在需要长期推理的 LIBERO-Long 上优势明显（+5.7% vs π₀）。</p>\n<p><strong>消融实验关键发现</strong>：\n- 动作分块（+8.4%）、混合注意力（+6.1%）、视觉 CoT（+4.9%）各自贡献显著\n- 使用 <strong>GT 目标图像</strong>替代生成的子目标图像时，成功率提升约 <strong>40%</strong>，表明提升视觉生成质量是重要的未来方向\n- 预训练带来 46.7% 的相对提升，验证了跨域视觉预测迁移的有效性</p>\n<p><img alt=\"子目标图像可视化\" src=\"https://ar5iv.labs.arxiv.org/html/2503.22020/assets/x5.png\" />\n<em>图 5：CoT-VLA 生成的子目标图像示例。尽管图像质量不如扩散模型，但已足够捕捉物体位置和机械臂姿态的关键变化</em></p>\n<h5>局限性</h5>\n<ul>\n<li><strong>推理延迟</strong>：生成 1024 个图像 token 导致约 <strong>7 倍推理减速</strong>（约 1 秒/步），限制了实时应用</li>\n<li><strong>图像质量</strong>：离散 tokenizer 生成的图像质量低于扩散模型，存在伪影</li>\n<li><strong>动作 chunk 不连续</strong>：相邻 chunk 之间可能出现不平滑过渡，时序集成仅部分缓解</li>\n</ul>",
      "quiz": {
        "q": "CoT-VLA 中视觉思维链（Visual CoT）的核心作用是什么？",
        "options": [
          "用文本描述未来场景，指导动作生成",
          "在动作预测前生成子目标图像作为隐式推理步骤，提供空间规划信息",
          "通过扩散模型生成高质量目标图像用于奖励计算",
          "将动作序列可视化为图像以便人类监督"
        ],
        "answer": 1,
        "explain": "CoT-VLA 的核心创新是在预测动作前先自回归生成未来子目标图像（而非文本），这些图像编码了丰富的空间信息，作为视觉推理的中间步骤指导后续动作预测。"
      }
    },
    {
      "id": "mvot",
      "num": 16,
      "name": "MVoT",
      "fullName": "多模态可视化思维 (Multimodal Visualization-of-Thought)",
      "year": "2025.01",
      "org": "PKU",
      "parent": "visual_cot",
      "paperUrl": "https://arxiv.org/abs/2501.07542",
      "projectUrl": "",
      "category": "frontier_2026",
      "motivation": "生成图像想象推理过程，空间推理优势",
      "summary": "MVoT 的核心目标是：生成图像想象推理过程，空间推理优势。",
      "keyPoints": [
        "核心动机：生成图像想象推理过程，空间推理优势",
        "演化来源：继承或改进自 visual_cot",
        "代表机构：PKU"
      ],
      "detail": "<h5>核心示意图</h5>\n<p><img alt=\"MVoT 推理范式\" src=\"https://arxiv.org/html/2501.07542v1/x1.png\" />\n<em>图：MVoT 在推理轨迹中交错生成文字步骤和可视化图像状态，让后续推理条件化于此前的视觉思维。</em></p>\n<p><img alt=\"Token discrepancy loss\" src=\"https://arxiv.org/html/2501.07542v1/x3.png\" />\n<em>图：MVoT 在自回归 MLLM 训练中加入 token discrepancy loss，缓解文本 tokenizer 与图像 tokenizer 表征差异带来的视觉生成质量问题。</em></p>\n<h5>算法伪代码</h5>\n<p>```python</p>"
    },
    {
      "id": "latent_sketchpad",
      "num": 17,
      "name": "Latent Sketchpad",
      "fullName": "潜空间草图板 (Latent Sketchpad)",
      "year": "2025",
      "org": "Google",
      "parent": "mvot",
      "paperUrl": "https://arxiv.org/abs/2501.latentsketchpad",
      "projectUrl": "",
      "category": "frontier_2026",
      "motivation": "潜空间草图绘制，高效辅助复杂推理",
      "summary": "Latent Sketchpad 的核心目标是：潜空间草图绘制，高效辅助复杂推理。",
      "keyPoints": [
        "核心动机：潜空间草图绘制，高效辅助复杂推理",
        "演化来源：继承或改进自 mvot",
        "代表机构：Google"
      ],
      "detail": "<h5>核心示意图</h5>\n<p><img alt=\"Latent Sketchpad 总览\" src=\"https://github.com/hwanyu112/Latent-Sketchpad/raw/main/asset/overview.png\" />\n<em>图：Latent Sketchpad 在现有 MLLM 上增加 Vision Head 与 Sketch Decoder，使模型可以在文本推理中插入视觉 latent。</em></p>\n<h5>动机与背景</h5>\n<p>传统多模态 CoT 主要把视觉信息转写为语言，复杂空间关系、路径规划和动态场景状态会被压缩成离散文本描述，容易丢失几何细节。另一类方法调用外部视觉工具或图像生成模型，但工具能力固定，像素生成也往往更关注逼真度而不是推理需要的抽象结构。</p>\n<p>Latent Sketchpad 的核心判断是：预训练 MLLM 的视觉编码器已经拥有可用于理解的高质量视觉表征，只是这些表征通常只作为输入感知结果，而不会在推理过程中被主动生成。论文因此把视觉特征空间重新用作“内部草图板”：模型每走一步，可以生成下一段视觉 latent，用它帮助后续语言推理。</p>\n<p>这种设计把视觉思考放在 latent 层，而不是像素层。latent 不需要对人类天然可读，但它可以保留空间结构；当需要解释时，再通过 Sketch Decoder 渲染成草图。这样既避免了高成本图像生成，又能让模型拥有可插拔的视觉中间状态。</p>\n<h5>方法机制</h5>\n<p><img alt=\"Vision Head 与 Sketch Decoder 架构\" src=\"https://github.com/hwanyu112/Latent-Sketchpad/raw/main/asset/task_visualization.png\" />\n<em>图：Latent Sketchpad 在 MazePlanning 中生成逐步草图，展示模型对路径状态的中间视觉表示。</em></p>\n<p>给定输入图像 <span class=\"kb-math kb-math-inline\">X_0</span>，视觉编码器先得到 visual latents：</p>\n<div class=\"kb-math kb-math-display\">l_{X_0}=G(X_0)\\in\\mathbb{R}^{n_v\\times d_v}</div>\n<p>连接器 <span class=\"kb-math kb-math-inline\">C(\\cdot)</span> 将其投影到 LLM embedding 空间：</p>\n<div class=\"kb-math kb-math-display\">h_{X_0}=C(l_{X_0})</div>\n<p>Latent Sketchpad 在原有文本 token 流中插入特殊标记，例如 <code>&lt;start_of_image&gt;</code> 与 <code>&lt;end_of_image&gt;</code>。当模型生成到视觉片段时，Context-Aware Vision Head 负责预测视觉 latent，而不是普通词表 token。它同时利用两类上下文：</p>\n<ul>\n<li><strong>Global context</strong>：历史图像或历史草图 latent，提供长程视觉记忆</li>\n<li><strong>Local context</strong>：当前正在生成的草图 latent，保证同一张草图内部连贯</li>\n</ul>\n<p>可抽象为：</p>\n<div class=\"kb-math kb-math-display\">\\hat{l}_{t}=H_\\phi(h_t,\\;l_{&lt;t}^{global},\\;l_{&lt;t}^{local})</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">H_\\phi</span> 是 Vision Head，<span class=\"kb-math kb-math-inline\">h_t</span> 是 MLLM 当前隐藏状态。训练时用视觉编码器得到的目标 latent <span class=\"kb-math kb-math-inline\">l_t</span> 监督：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{vision}=\\sum_t d(\\hat{l}_t,l_t)</div>\n<p>距离 <span class=\"kb-math kb-math-inline\">d(\\cdot)</span> 可使用 cosine、L1 或 MSE。关键是主干 MLLM 冻结，只训练 Vision Head，降低对原模型语言/视觉理解能力的扰动。</p>\n<h5>推理流程伪代码</h5>\n<p>```python</p>"
    },
    {
      "id": "visual_thoughts",
      "num": 18,
      "name": "Visual Thoughts",
      "fullName": "视觉思维统一视角 (Visual Thoughts: Unified Perspective)",
      "year": "2026",
      "org": "Tsinghua",
      "parent": "mvot",
      "paperUrl": "https://proceedings.neurips.cc/paper_files/paper/2025/hash/8a57d66b8e0cc468dbb6574114f60f0c-Abstract-Conference.html",
      "projectUrl": "",
      "category": "frontier_2026",
      "motivation": "统一视觉思维框架，整合多种操作",
      "summary": "Visual Thoughts 的核心目标是：统一视觉思维框架，整合多种操作。",
      "keyPoints": [
        "核心动机：统一视觉思维框架，整合多种操作",
        "演化来源：继承或改进自 mvot",
        "代表机构：Tsinghua"
      ],
      "detail": "<h5>核心示意图</h5>\n<p><img alt=\"Textual-MCoT 与 Interleaved-MCoT 对比\" src=\"https://ar5iv.labs.arxiv.org/html/2505.15510/assets/x1.png\" />\n<em>图：Visual Thoughts 将纯文本 rationale 和图文交错 rationale 都视为 visual thoughts 的不同表达。</em></p>\n<h5>动机与背景</h5>\n<p>多模态 CoT 领域长期存在一个争论：复杂视觉推理到底应该用文本中间步骤，还是应该生成/编辑中间图像？Textual-MCoT 使用图像描述、场景图或自然语言 rationale；Interleaved-MCoT 则在推理链中插入生成图、编辑图或工具处理图。两者在不同任务上各有优势，但缺少统一解释。</p>\n<p>Visual Thoughts 的观点是：形式不是根因，真正起作用的是推理链中是否创建了任务相关的视觉中间表示。这个表示可以是文本，也可以是图像；它的作用是把原图中与问题相关的内容抽取出来，让后续 reasoning 不必每一步都重新访问完整原图。</p>\n<p>论文把原始图像类比为外部存储，把 visual thoughts 类比为 cache。外部存储信息完整但访问成本高，cache 信息更少但与当前任务高度相关，能支撑更深、更快的推理。</p>\n<p><img alt=\"Visual Thoughts 缓存机制\" src=\"https://ar5iv.labs.arxiv.org/html/2505.15510/assets/x2.png\" />\n<em>图：没有 visual thoughts 时，模型需要反复从原图提取信息；有 visual thoughts 时，推理步骤可直接读取任务相关视觉缓存。</em></p>\n<h5>形式化定义</h5>\n<p>给定输入图像 <span class=\"kb-math kb-math-inline\">I</span>、问题 <span class=\"kb-math kb-math-inline\">q</span>、已有推理步骤 <span class=\"kb-math kb-math-inline\">s_{&lt;t}</span>，visual thought <span class=\"kb-math kb-math-inline\">v_t</span> 是一个显式传递视觉信息的中间步骤：</p>\n<div class=\"kb-math kb-math-display\">v_t \\sim p_\\theta(v_t \\mid I, q, s_{&lt;t}, e)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">e</span> 表示要求采用的表达形式，例如自然语言描述、结构化场景图、图像编辑结果或生成图。随后模型基于 visual thought 生成派生推理步骤：</p>\n<div class=\"kb-math kb-math-display\">s_t \\sim p_\\theta(s_t \\mid q, s_{&lt;t}, v_{\\le t})</div>\n<p>这一定义把“描述图片”“生成辅助图”“标注区域”“绘制几何图”都纳入同一个框架：它们都是把原始视觉输入转化为更适合当前推理的中间表达。</p>\n<h5>四类 Visual Thought</h5>\n<p><img alt=\"四类 Visual Thoughts\" src=\"https://ar5iv.labs.arxiv.org/html/2505.15510/assets/x3.png\" />\n<em>图：Visual Thoughts 分为文本表达的 N-LANG/S-LANG 和视觉表达的 E-IMG/G-IMG。</em></p>\n<p><strong>1. Natural Language (N-LANG)</strong><br />\n模型先生成与问题相关的自然语言图像描述，再进行推理。例如先描述“左侧有两个苹果，右侧有三个苹果”，再计算总数。优点是实现简单、兼容所有 LVLM；缺点是可能漏掉细粒度视觉细节。</p>\n<p><strong>2. Structured Language (S-LANG)</strong><br />\n模型输出场景图、JSON、表格或结构化属性列表，再用结构化信息推理。它比自然语言更清晰，适合几何、图表、实体关系等需要约束表达的任务。</p>\n<p><strong>3. Edited Image (E-IMG)</strong><br />\n通过检测、分割、深度估计、标注、裁剪等工具处理原图，把任务相关区域显式呈现给模型。例如在图上标出目标物体或几何辅助线。它保留图像模态优势，但需要额外工具。</p>\n<p><strong>4. Generative Image (G-IMG)</strong><br />\n模型调用图像生成器绘制辅助图，例如根据函数表达式生成曲线图，或把文字题转换为几何示意图。它适合原图缺失或需要构造新视觉状态的任务，但成本更高且生成错误会传播。</p>\n<h5>核心流程伪代码</h5>\n<p>```python</p>"
    },
    {
      "id": "covt",
      "num": 19,
      "name": "COVT",
      "fullName": "连续视觉思维链 (Chain-of-Visual-Thought)",
      "year": "2025",
      "org": "SJTU",
      "parent": "visual_thoughts",
      "paperUrl": "https://arxiv.org/abs/2501.covt",
      "projectUrl": "",
      "category": "frontier_2026",
      "motivation": "连续视觉Token推理，无需外部工具",
      "summary": "COVT 的核心目标是：连续视觉Token推理，无需外部工具。",
      "keyPoints": [
        "核心动机：连续视觉Token推理，无需外部工具",
        "演化来源：继承或改进自 visual_thoughts",
        "代表机构：SJTU"
      ],
      "detail": "<h5>核心示意图</h5>\n<p><img alt=\"COVT teaser\" src=\"https://github.com/Wakals/CoVT/raw/main/assets/teaser.png\" />\n<em>图：COVT 在文本推理链中插入连续视觉 token，使 VLM 不再只能把视觉信息翻译成离散语言。</em></p>\n<h5>动机与背景</h5>\n<p>标准 VLM 把图像编码成视觉 embedding，再通过投影层送入语言模型。后续推理基本在离散语言空间中展开，这对数学、逻辑和知识推理很有效，但对边界、深度、布局、相对位置等连续视觉信息非常低效。模型必须先把高维视觉关系说成文字，再用文字推理，形成明显的信息瓶颈。</p>\n<p>工具增强方法可以调用检测、分割或深度估计模型，但这种方式把感知能力委托给外部模块，成本高，且最终效果受工具能力限制。生成或裁剪中间图像也仍然需要重新投影回文本空间，细粒度信息依然容易丢失。</p>\n<p>COVT 的目标是让 VLM 在内部直接拥有“视觉思维链”：模型可以在生成 rationale 时输出少量连续视觉 token，这些 token 不是词表符号，而是携带视觉专家知识的 latent 表征。</p>\n<h5>CoVT Token 设计</h5>\n<p><img alt=\"COVT pipeline\" src=\"https://github.com/Wakals/CoVT/raw/main/assets/pipeline.png\" />\n<em>图：COVT visual tokens 可对齐分割、深度、边缘、DINO 特征等视觉专家，也可按需解码为可视化结果。</em></p>\n<p>COVT 把输出序列从纯文本扩展为混合序列：</p>\n<div class=\"kb-math kb-math-display\">y_t \\in \\mathcal{V}_{text} \\cup \\mathbb{R}^{d_v}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\mathcal{V}_{text}</span> 是离散文本词表，<span class=\"kb-math kb-math-inline\">\\mathbb{R}^{d_v}</span> 是连续视觉 token 空间。生成时，模型在 <code>&lt;think&gt;</code> 内既可以输出文本 token，也可以输出视觉 token：</p>\n<div class=\"kb-math kb-math-display\">p_\\theta(y_t \\mid x, y_{&lt;t})</div>\n<p>当 <span class=\"kb-math kb-math-inline\">y_t</span> 是文本 token 时使用常规交叉熵；当 <span class=\"kb-math kb-math-inline\">y_t</span> 是视觉 token 时，用 projection layer 输出连续向量，并通过专家监督对齐。</p>\n<p>论文中典型 token 分配为：</p>\n<ul>\n<li>SAM mask prompts：8 个 visual tokens，用于分割/实例定位</li>\n<li>DepthAnything：4 个 visual tokens，用于深度结构</li>\n<li>PIDINet：4 个 visual tokens，用于边缘结构</li>\n<li>DINO：4 个 visual tokens，用于 patch-level 语义特征</li>\n</ul>\n<p>这组约 20 个 tokens 不是要重建完整图像，而是把最关键的感知线索压缩进推理链。</p>\n<h5>训练目标</h5>\n<p>COVT 的损失由语言建模和视觉对齐两部分组成：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}=\\mathcal{L}_{text}+\\lambda_{seg}\\mathcal{L}_{seg}+\\lambda_{depth}\\mathcal{L}_{depth}+\\lambda_{edge}\\mathcal{L}_{edge}+\\lambda_{dino}\\mathcal{L}_{dino}</div>\n<p>其中：</p>\n<ul>\n<li><span class=\"kb-math kb-math-inline\">\\mathcal{L}_{text}</span>：普通 next-token prediction，保持 VLM 的回答能力</li>\n<li><span class=\"kb-math kb-math-inline\">\\mathcal{L}_{seg}</span>：让视觉 token 作为 prompt 重建 SAM 风格 mask</li>\n<li><span class=\"kb-math kb-math-inline\">\\mathcal{L}_{depth}</span>：对齐深度图或深度排序线索</li>\n<li><span class=\"kb-math kb-math-inline\">\\mathcal{L}_{edge}</span>：对齐边缘结构</li>\n<li><span class=\"kb-math kb-math-inline\">\\mathcal{L}_{dino}</span>：匹配 DINO patch 特征，保留语义与局部对应关系</li>\n</ul>\n<div class=\"key-point\">💡 关键：视觉专家只用于训练监督；推理阶段 COVT 不需要再调用这些专家，因此它是 self-contained 的视觉推理框架。</div>\n<h5>四阶段训练流程</h5>\n<p>```python</p>"
    },
    {
      "id": "zebra_cot",
      "num": 20,
      "name": "Zebra-CoT",
      "fullName": "交错视觉语言推理数据集 (Zebra Chain-of-Thought Dataset)",
      "year": "2025",
      "org": "Meta",
      "parent": "visual_thoughts",
      "paperUrl": "https://arxiv.org/abs/2507.16746",
      "projectUrl": "",
      "category": "frontier_2026",
      "motivation": "交错视觉语言推理数据，训练基础",
      "summary": "Zebra-CoT 的核心目标是：交错视觉语言推理数据，训练基础。",
      "keyPoints": [
        "核心动机：交错视觉语言推理数据，训练基础",
        "演化来源：继承或改进自 visual_thoughts",
        "代表机构：Meta"
      ],
      "detail": "<h5>核心示意图</h5>\n<p><img alt=\"Zebra-CoT 数据组成\" src=\"https://github.com/multimodal-reasoning-lab/Bagel-Zebra-CoT/raw/main/assets/zebra_cot_datacard.png\" />\n<em>图：Zebra-CoT 数据集覆盖科学、2D、3D、视觉逻辑与策略游戏四大类任务。</em></p>\n<h5>动机与背景</h5>\n<p>Visual CoT 的目标是让模型像人一样在解决复杂问题时画图、标注、移动物体或构造中间视觉状态。但训练这类模型有两个现实困难：第一，现成模型的 visual CoT 能力较弱，用它们做强化学习冷启动很不稳定；第二，高质量图文交错推理数据稀缺，尤其缺少“中间图像确实服务于推理”的样本。</p>\n<p>Zebra-CoT 的定位不是提出一个新模型结构，而是补齐训练基础设施。它把任务设计成天然需要视觉辅助的形式，让每个样本包含问题图像、文本思考步骤、中间视觉结果和最终答案，训练模型学会何时生成视觉中间状态以及如何让它推动后续推理。</p>\n<h5>示例与数据形态</h5>\n<p><img alt=\"Bagel-Zebra-CoT 推理示例\" src=\"https://github.com/multimodal-reasoning-lab/Bagel-Zebra-CoT/raw/main/assets/bagel-cot-example.png\" />\n<em>图：模型先删除圆柱体、再加入红色球体，逐步生成中间图像并给出答案。</em></p>\n<p>一个 Zebra-CoT 样本可以抽象为：</p>\n<div class=\"kb-math kb-math-display\">D_i=(x_0,\\;q,\\;(t_1,x_1),(t_2,x_2),...,\\;a)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">x_0</span> 是初始图像，<span class=\"kb-math kb-math-inline\">q</span> 是问题，<span class=\"kb-math kb-math-inline\">t_k</span> 是第 <span class=\"kb-math kb-math-inline\">k</span> 步文本 rationale，<span class=\"kb-math kb-math-inline\">x_k</span> 是对应中间图像，<span class=\"kb-math kb-math-inline\">a</span> 是最终答案。与普通 CoT 数据相比，Zebra-CoT 的关键在于 <span class=\"kb-math kb-math-inline\">x_k</span> 不是装饰图，而是会改变或显式呈现推理状态。</p>\n<p>例如在 2D 物体操作任务中，文本步骤“Remove all cylinders”对应一张已删除圆柱体的中间图；下一步“Add 1 red sphere”对应再加入红球的图。最终答案依赖这些视觉状态的逐步更新。</p>\n<h5>数据构建流程</h5>\n<p>```python</p>"
    },
    {
      "id": "reason_rft",
      "num": 21,
      "name": "Reason-RFT",
      "fullName": "视觉推理强化微调 (Reinforcement Fine-Tuning for Visual Reasoning)",
      "year": "2026",
      "org": "NTU",
      "parent": "llava_cot",
      "paperUrl": "https://proceedings.neurips.cc/paper_files/paper/2025/hash/08d70284b013c03ba89cd2b642bc864b-Abstract-Conference.html",
      "projectUrl": "",
      "category": "frontier_2026",
      "motivation": "GRPO强化微调，提升推理泛化能力",
      "summary": "Reason-RFT 的核心目标是：GRPO强化微调，提升推理泛化能力。",
      "keyPoints": [
        "核心动机：GRPO强化微调，提升推理泛化能力",
        "演化来源：继承或改进自 llava_cot",
        "代表机构：NTU"
      ],
      "detail": "<h5>核心示意图</h5>\n<p><img alt=\"Reason-RFT pipeline\" src=\"https://tanhuajie.github.io/ReasonRFT/images/pipeline.png\" />\n<em>图：Reason-RFT 先进行 SFT-based activation，再用 GRPO 与格式/准确性奖励进行强化微调。</em></p>\n<h5>动机与背景</h5>\n<p>传统视觉推理增强主要依赖两类方法：神经符号程序或 CoT SFT。神经符号方法可解释，但依赖程序生成和模块组合，系统复杂；CoT SFT 更直接，但需要大量高质量推理标注，容易让模型记住训练分布中的固定解题模式，面对视角变化、物体外观变化或题型迁移时泛化不足。</p>\n<p>Reason-RFT 的出发点是把 SFT 和 RL 的优势结合起来。SFT 用于冷启动，让模型知道“如何按结构化格式推理”；RL 用于探索，让模型不只模仿标注轨迹，而是根据答案正确性优化自己的推理策略。这样可以缓解纯 SFT 的 cognitive rigidity，也避免纯 RL 初期没有稳定推理格式的问题。</p>\n<h5>Stage 1：SFT-based Reasoning Activation</h5>\n<p>第一阶段使用带 CoT 的视觉推理数据训练模型生成推理步骤 <span class=\"kb-math kb-math-inline\">r</span> 与答案 <span class=\"kb-math kb-math-inline\">a</span>。给定图像 <span class=\"kb-math kb-math-inline\">I</span>、问题 <span class=\"kb-math kb-math-inline\">q</span>，训练目标是最大化：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{SFT}=-\\log p_\\theta(r,a \\mid I,q)</div>\n<p>这一步不追求覆盖所有任务，只要求建立稳定先验：模型会分解问题、输出 <code>&lt;think&gt;</code> 和 <code>&lt;answer&gt;</code>，并能在视觉计数、几何结构、空间变换等任务中形成基本推理链。</p>\n<div class=\"key-point\">💡 关键：Reason-RFT 不是用 SFT 解决全部问题，而是用 SFT 给 RL 一个可优化的起点。</div>\n<h5>Stage 2：GRPO-based Reasoning Enhancement</h5>\n<p>第二阶段对每个输入采样一组候选回答：</p>\n<div class=\"kb-math kb-math-display\">\\{o_i\\}_{i=1}^{G}\\sim \\pi_{\\theta_{old}}(\\cdot\\mid I,q)</div>\n<p>每个候选通过 reward function 得到分数 <span class=\"kb-math kb-math-inline\">R_i</span>。GRPO 不需要 value model，而是在组内计算相对优势：</p>\n<div class=\"kb-math kb-math-display\">\\hat{A}_i=\\frac{R_i-\\mathrm{mean}(\\{R_j\\}_{j=1}^{G})}{\\mathrm{std}(\\{R_j\\}_{j=1}^{G})}</div>\n<p>再用 clipped policy objective 更新策略：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{J}_{GRPO}=\\frac{1}{G}\\sum_{i=1}^{G}\\frac{1}{|o_i|}\\sum_t\n\\min\\left(\\rho_{i,t}\\hat{A}_i,\\mathrm{clip}(\\rho_{i,t},1-\\epsilon,1+\\epsilon)\\hat{A}_i\\right)\n-\\beta D_{KL}(\\pi_\\theta||\\pi_{ref})</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\rho_{i,t}</span> 是新旧策略在 token <span class=\"kb-math kb-math-inline\">t</span> 上的概率比。KL 项限制模型不要偏离参考模型过远，clip 项避免单次更新过激。</p>\n<h5>Reward 设计</h5>\n<p>Reason-RFT 的 reward 由格式和准确性组成：</p>\n<div class=\"kb-math kb-math-display\">R=R_{format}+R_{acc}</div>\n<p><strong>格式奖励</strong>检查输出是否遵循：</p>\n<pre><code class=\"language-text\">&lt;think&gt; reasoning process &lt;/think&gt;\n&lt;answer&gt; final answer &lt;/answer&gt;\n</code></pre>\n<p><strong>准确性奖励</strong>按任务类型区分：</p>\n<ul>\n<li><strong>Discrete-valued reward</strong>：用于计数、选择题、离散结构感知，答案完全匹配得 1，否则 0</li>\n<li><strong>Mathematical reward</strong>：用于角度、长度、数值或 LaTeX 表达，允许小容差并可给部分分</li>\n<li><strong>Function-based reward</strong>：用于空间变换序列，按函数名、对象、参数分层匹配，完整匹配得高分，部分匹配得较低分</li>\n</ul>\n<p>这种 reward 设计让同一个 GRPO 框架能覆盖不同视觉推理任务，而不必为每个任务训练独立奖励模型。</p>\n<h5>训练流程伪代码</h5>\n<p>```python</p>"
    },
    {
      "id": "visionthink",
      "num": 22,
      "name": "VisionThink",
      "fullName": "智能高效视觉语言模型 (Smart and Efficient VLM via RL)",
      "year": "2026",
      "org": "CUHK",
      "parent": "reason_rft",
      "paperUrl": "https://proceedings.neurips.cc/paper_files/paper/2025/hash/88be023075a5a3ff3dc3b5d26623fa22-Abstract-Conference.html",
      "projectUrl": "",
      "category": "frontier_2026",
      "motivation": "RL+Token压缩，效率与性能平衡",
      "summary": "VisionThink 提出了一种动态分辨率视觉语言模型范式：模型先接收低分辨率图像进行推理，通过强化学习（Multi-Turn GRPO）自主决定是否需要请求高分辨率图像，结合 LLM-as-Judge 评估开放式 VQA 答案，在保持甚至超越全分辨率模型性能的同时大幅降低视觉 token 数量和推理时间。",
      "keyPoints": [
        "<strong>动态分辨率推理范式</strong>：模型首先接收低分辨率图像（如 384×384），在推理过程中自主决定是否调用 <code>&lt;resize&gt;</code> 工具获取高分辨率图像（如 768×768），实现\"按需升分辨率\"",
        "<strong>Multi-Turn GRPO 训练</strong>：将 GRPO（Group Relative Policy Optimization）扩展为多轮交互场景，模型在第一轮输出后可能触发工具调用，工具返回的 token 被 mask 不参与策略梯度计算",
        "<strong>LLM-as-Judge 奖励机制</strong>：使用 Qwen2.5-72B-Instruct 作为裁判模型评估开放式 VQA 答案的正确性，解决传统精确匹配无法处理同义表达的问题",
        "<strong>Penalty 控制机制</strong>：通过阈值 <span class=\"kb-math kb-math-inline\">\\theta</span>（默认 0.2）控制高分辨率请求比例——仅当 resize 比例超过阈值时施加惩罚，平衡性能与效率",
        "<strong>训练数据</strong>：仅需 20K 样本（10K 高分辨率依赖 + 10K 低分辨率可解），涵盖 MathVerse、AI2D、ChartQA、DocVQA 等多类型数据",
        "<strong>显著效率提升</strong>：相比全分辨率基线，视觉 token 减少约 62%，推理时间减少约 66%，同时在多数基准上性能持平或提升"
      ],
      "detail": "<h5>核心框架</h5>\n<p><img alt=\"VisionThink 框架总览\" src=\"https://ar5iv.labs.arxiv.org/html/2507.13348/assets/x2.png\" />\n<em>图：VisionThink 框架。(a) 左图展示推理流程——模型先接收低分辨率图像，自主决定是否调用 resize 工具获取高分辨率图像；(b) 右图展示 Multi-Turn GRPO 训练流程，包含 LLM-as-Judge 奖励评估。</em></p>\n<h5>动机与背景</h5>\n<p>当前视觉语言模型（VLM）为追求高性能，普遍采用高分辨率图像输入，导致视觉 token 数量急剧增长。例如，将图像从 384×384 提升到 768×768，视觉 token 数量从约 729 增加到约 2916（4 倍增长）。然而，论文的关键观察是：<strong>并非所有任务都需要高分辨率输入</strong>。</p>\n<p><img alt=\"关键观察\" src=\"https://ar5iv.labs.arxiv.org/html/2507.13348/assets/x1.png\" />\n<em>图：(a) 不同分辨率下的性能对比——部分基准（如 MathVerse）在低分辨率下即可达到高性能，而 OCR 类基准（如 DocVQA）确实需要高分辨率；(b)(c) VisionThink 在性能和效率上的优势。</em></p>\n<p>传统的高效 VLM 方法（如 FastV、FitPrune）通过注意力分数剪枝或合并 token 来减少冗余，但它们：\n1. 对所有样本施加<strong>固定比例</strong>的 token 削减，无法区分简单/困难样本\n2. 在 OCR 相关基准上性能下降严重\n3. 是<strong>被动的后处理策略</strong>，而非让模型主动决策</p>\n<p>VisionThink 提出了一种全新范式：让模型<strong>主动思考</strong>是否需要更多视觉信息，将分辨率选择从工程启发式转变为模型的内生能力。</p>\n<h5>核心技术方案</h5>\n<p><strong>1. Multi-Turn 推理流程</strong></p>\n<p>推理过程分为两种路径：</p>\n<ul>\n<li><strong>路径 A（低分辨率足够）</strong>：模型接收低分辨率图像 → 思考 → 直接输出答案</li>\n<li><strong>路径 B（需要高分辨率）</strong>：模型接收低分辨率图像 → 思考 → 输出 <code>&lt;resize&gt;</code> 工具调用 → 环境返回高分辨率图像 → 继续思考 → 输出答案</li>\n</ul>\n<pre><code class=\"language-python\"># VisionThink 推理伪代码\ndef visionthink_inference(model, image, question):\n    # Step 1: 输入低分辨率图像\n    low_res_image = resize(image, 384)\n    low_res_tokens = vision_encoder(low_res_image)  # ~729 tokens\n\n    # Step 2: 模型第一轮推理\n    prompt = f&quot;&lt;image&gt;{low_res_tokens}&lt;/image&gt;\\n{question}&quot;\n    response_turn1 = model.generate(prompt)\n\n    # Step 3: 检查是否请求高分辨率\n    if &quot;&lt;resize&gt;&quot; in response_turn1:\n        # 环境返回高分辨率图像\n        high_res_image = resize(image, 768)\n        high_res_tokens = vision_encoder(high_res_image)  # ~2916 tokens\n\n        # Step 4: 模型第二轮推理（拼接高分辨率信息）\n        prompt_turn2 = prompt + response_turn1 + f&quot;&lt;image&gt;{high_res_tokens}&lt;/image&gt;&quot;\n        response_turn2 = model.generate(prompt_turn2)\n        return extract_answer(response_turn2)\n    else:\n        return extract_answer(response_turn1)\n</code></pre>\n<p><strong>2. LLM-as-Judge 奖励设计</strong></p>\n<p>传统 RL 训练中，VQA 答案的正确性通常通过精确字符串匹配判断。但开放式问答中，语义等价的不同表达（如 \"2/3\" vs \"0.667\"、\"New York\" vs \"NYC\"）会被误判为错误。VisionThink 引入 LLM-as-Judge 解决此问题：</p>\n<div class=\"kb-math kb-math-display\">r_{\\text{acc}}(q, a, a^*) = \\text{LLM-Judge}(q, a, a^*) \\in \\{0, 1\\}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">q</span> 为问题，<span class=\"kb-math kb-math-inline\">a</span> 为模型预测答案，<span class=\"kb-math kb-math-inline\">a^*</span> 为标准答案。裁判模型（Qwen2.5-72B-Instruct）综合考虑问题语境，判断语义等价性。</p>\n<div class=\"key-point\">💡 <strong>关键</strong>：LLM-as-Judge 不仅提升了奖励信号的准确性，还使得训练数据中可以包含更多开放式 VQA 样本，扩大了可用训练数据的范围。</div>\n<p><strong>3. Multi-Turn GRPO</strong></p>\n<p>标准 GRPO 的目标函数为：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{J}_{\\text{GRPO}}(\\theta) = \\mathbb{E}_{q \\sim P(Q), \\{o_i\\}_{i=1}^G \\sim \\pi_{\\theta_{\\text{old}}}(O|q)} \\left[ \\frac{1}{G} \\sum_{i=1}^G \\frac{1}{|o_i|} \\sum_{t=1}^{|o_i|} \\min\\left(\\rho_{i,t} \\hat{A}_{i}, \\text{clip}(\\rho_{i,t}, 1-\\varepsilon, 1+\\varepsilon) \\hat{A}_{i}\\right) - \\beta D_{\\text{KL}} \\right]</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\rho_{i,t} = \\frac{\\pi_\\theta(o_{i,t} | q, o_{i,&lt;t})}{\\pi_{\\theta_{\\text{old}}}(o_{i,t} | q, o_{i,&lt;t})}</span> 为新旧策略的概率比，<span class=\"kb-math kb-math-inline\">\\hat{A}_i</span> 为基于组内奖励归一化的优势值。</p>\n<p>VisionThink 将其扩展为 <strong>Multi-Turn</strong> 版本，关键修改是：<strong>工具返回的 token（高分辨率图像 token）不参与策略梯度计算</strong>，因为这些 token 由环境生成，不属于模型策略的一部分：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{J}_{\\text{MT-GRPO}}(\\theta) = \\mathbb{E}\\left[ \\frac{1}{G} \\sum_{i=1}^G \\frac{1}{|o_i|} \\sum_{t=1}^{|o_i|} \\mathbf{m}_{i,t} \\cdot \\min\\left(\\rho_{i,t} \\hat{A}_{i}, \\text{clip}(\\rho_{i,t}, 1-\\varepsilon, 1+\\varepsilon) \\hat{A}_{i}\\right) - \\beta D_{\\text{KL}} \\right]</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\mathbf{m}_{i,t}</span> 为 mask 向量：模型生成的 token 处为 1，工具返回的 token 处为 0。</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：如果不对工具返回 token 进行 mask，这些 token 的梯度会干扰策略优化，因为模型无法控制环境返回的内容。</div>\n<p><strong>4. 奖励函数与 Penalty 机制</strong></p>\n<p>总奖励由三部分组成：</p>\n<div class=\"kb-math kb-math-display\">R = r_{\\text{acc}} + r_{\\text{format}} + r_{\\text{penalty}}</div>\n<ul>\n<li><strong>准确性奖励</strong> <span class=\"kb-math kb-math-inline\">r_{\\text{acc}} \\in \\{0, 1\\}</span>：由 LLM-as-Judge 评估</li>\n<li><strong>格式奖励</strong> <span class=\"kb-math kb-math-inline\">r_{\\text{format}}</span>：鼓励模型使用 <code>&lt;think&gt;...&lt;/think&gt;</code> 和 <code>&lt;answer&gt;...&lt;/answer&gt;</code> 标签的规范输出格式</li>\n<li><strong>Penalty 惩罚</strong> <span class=\"kb-math kb-math-inline\">r_{\\text{penalty}}</span>：控制高分辨率请求比例</li>\n</ul>\n<p>Penalty 的设计尤为精巧。直接对所有 resize 请求施加惩罚会导致模型完全放弃使用高分辨率，在 OCR 类任务上性能崩溃。因此采用<strong>阈值控制</strong>：</p>\n<div class=\"kb-math kb-math-display\">r_{\\text{penalty}} = \\begin{cases} -\\lambda &amp; \\text{if resize ratio} &gt; \\theta \\text{ and sample requests resize} \\\\ 0 &amp; \\text{otherwise} \\end{cases}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\theta = 0.2</span> 表示允许最多 20% 的样本请求高分辨率。只有当当前 batch 中 resize 比例超过阈值时，才对请求 resize 的样本施加惩罚。</p>\n<p><img alt=\"Penalty 消融实验\" src=\"https://ar5iv.labs.arxiv.org/html/2507.13348/assets/x3.png\" />\n<em>图：(a) Penalty 比例的影响——全部惩罚或完全不惩罚都不是最优策略；(b) 不同 θ 值对性能和 resize 比例的影响。</em></p>\n<p><strong>5. 训练数据构建</strong></p>\n<p>训练数据仅需 20K 样本，按以下策略构建：</p>\n<ul>\n<li><strong>10K 高分辨率依赖样本</strong>：从 DocVQA、ChartQA、InfoVQA 等 OCR 密集型数据集中筛选，这些样本在低分辨率下性能显著下降</li>\n<li><strong>10K 低分辨率可解样本</strong>：从 MathVerse、AI2D、ScienceQA 等数据集中筛选，这些样本在低分辨率下即可正确回答</li>\n</ul>\n<p>这种混合构建确保模型学会<strong>区分</strong>何时需要高分辨率、何时低分辨率即可。</p>\n<h5>效率与性能分析</h5>\n<p><img alt=\"推理效率对比\" src=\"https://ar5iv.labs.arxiv.org/html/2507.13348/assets/x4.png\" />\n<em>图：VisionThink 与传统高效 VLM 方法的推理时间和性能对比。VisionThink 在保持高性能的同时显著降低推理时间。</em></p>\n<p>VisionThink 的效率优势来源于：大部分样本（约 80%）仅使用低分辨率图像（729 tokens），仅约 20% 的困难样本使用高分辨率（2916 tokens）。平均视觉 token 数量从 2916 降至约 1166，减少约 60%。</p>\n<p><img alt=\"自适应 Resize 比例\" src=\"https://ar5iv.labs.arxiv.org/html/2507.13348/assets/x5.png\" />\n<em>图：VisionThink 在不同基准上的 resize 比例——OCR 类任务（DocVQA、ChartQA）的 resize 比例显著高于数学/科学类任务，验证了模型确实学会了\"按需升分辨率\"。</em></p>\n<div class=\"key-point\">💡 <strong>关键洞察</strong>：VisionThink 不是一种特定的 token 削减策略，而是一种<strong>新范式</strong>，可以与现有的高效 VLM 方法（如 FastV、FitPrune）正交组合，进一步提升效率。</div>",
      "quiz": {
        "q": "VisionThink 在 Multi-Turn GRPO 训练中，为什么要对工具返回的 token 进行 mask 处理？",
        "options": [
          "为了减少显存占用，加速训练",
          "因为工具返回的 token 由环境生成，不属于模型策略，其梯度会干扰策略优化",
          "为了防止模型过拟合到高分辨率图像特征",
          "因为工具返回的 token 数量过多，会导致梯度爆炸"
        ],
        "answer": 1,
        "explain": "工具返回的高分辨率图像 token 由环境（视觉编码器）生成，不受模型策略控制。如果不 mask，这些 token 的概率比会产生无意义的梯度信号，干扰策略优化方向。"
      }
    },
    {
      "id": "vl_rethinker",
      "num": 23,
      "name": "VL-Rethinker",
      "fullName": "视觉语言自反思 (VL Self-Reflection via RL)",
      "year": "2026",
      "org": "PKU",
      "parent": "reason_rft",
      "paperUrl": "https://proceedings.neurips.cc/paper_files/paper/2025/hash/2c84844a559e4f962752570bff456ae4-Abstract-Conference.html",
      "projectUrl": "",
      "category": "frontier_2026",
      "motivation": "RL激励自反思，提升复杂推理性能",
      "summary": "VL-Rethinker 的核心目标是：RL激励自反思，提升复杂推理性能。",
      "keyPoints": [
        "核心动机：RL激励自反思，提升复杂推理性能",
        "演化来源：继承或改进自 reason_rft",
        "代表机构：PKU"
      ],
      "detail": "<h5>核心示意图</h5>\n<p><img alt=\"VL-Rethinker overview\" src=\"https://tiger-ai-lab.github.io/VL-Rethinker/static/images/overview.png\" />\n<em>图：VL-Rethinker 由 Selective Sample Replay 和 Forced Rethinking 两个关键训练组件组成。</em></p>\n<h5>动机与背景</h5>\n<p>GPT-o1、DeepSeek-R1 等慢思考模型证明了显式反思能提升复杂数学和代码问题表现，但视觉语言模型的慢思考能力并未同步提升。很多 VLM 即使用长 CoT，也容易把第一轮错误视觉理解一路推到最终答案，缺少“我刚才看错了吗”的自我检查。</p>\n<p>VL-Rethinker 的目标是用 RL 直接诱导 VLM 的 self-reflection，而不是从强模型蒸馏反思文本。它先发现标准 GRPO 在 72B 级 VLM 上存在严重训练信号稀释：模型很快对大量样本全答对或全答错，组内 reward 方差趋近 0，相对优势消失，更新效率下降。</p>\n<h5>Vanishing Advantages</h5>\n<p>GRPO 依赖组内 reward 差异计算优势：</p>\n<div class=\"kb-math kb-math-display\">\\hat{A}_i=\\frac{R_i-\\mu_R}{\\sigma_R}</div>\n<p>如果一个 query 的 <span class=\"kb-math kb-math-inline\">G</span> 个采样回答全部正确或全部错误，则 <span class=\"kb-math kb-math-inline\">\\sigma_R</span> 很小或为 0，这个 query 几乎不提供有效策略梯度。随着大模型能力增强，这类“全对/全错”的 query 比例上升，有效 query 比例下降。</p>\n<p><img alt=\"Vanishing advantages\" src=\"https://tiger-ai-lab.github.io/VL-Rethinker/static/images/vanishing_adv.png\" />\n<em>图：随着训练推进，72B 模型中有效 query 比例下降，说明标准 GRPO 的训练信号逐渐稀疏。</em></p>\n<h5>Selective Sample Replay</h5>\n<p>SSR 从 active learning 角度处理这个问题：训练应该更多关注“接近能力边界”的样本，也就是模型有时答对、有时答错、组内优势不为 0 的样本。它将这些样本放入 replay buffer，并按优势强度采样重放。</p>\n<p>```python</p>"
    },
    {
      "id": "think_or_not",
      "num": 24,
      "name": "Think or Not",
      "fullName": "选择性推理 (Selective Reasoning via RL)",
      "year": "2026",
      "org": "Tsinghua",
      "parent": "reason_rft",
      "paperUrl": "https://proceedings.neurips.cc/paper_files/paper/2025/hash/a168b27492ec2eb7aa184815fa0cd046-Abstract-Conference.html",
      "projectUrl": "",
      "category": "frontier_2026",
      "motivation": "GRPO选择性推理，动态调整推理深度",
      "summary": "Think or Not 的核心目标是：GRPO选择性推理，动态调整推理深度。",
      "keyPoints": [
        "核心动机：GRPO选择性推理，动态调整推理深度",
        "演化来源：继承或改进自 reason_rft",
        "代表机构：Tsinghua"
      ],
      "detail": "<h5>核心示意图</h5>\n<p><img alt=\"TON teaser\" src=\"https://github.com/kokolerk/TON/raw/main/assets/teaser.png\" />\n<em>图：简单题中 TON 跳过冗长思考直接回答，难题中仍保留完整推理链。</em></p>\n<h5>动机与背景</h5>\n<p>GRPO 等 RL 后训练方法常鼓励模型在回答前生成完整 reasoning trace，这在复杂任务上有效，但也会带来过度推理：简单计数、显然的图形问题或重复模板任务不需要长篇 <code>&lt;think&gt;</code>，长输出反而增加训练采样时间、推理延迟和错误暴露面。</p>\n<p>论文的核心观察是：有些样本即使去掉整个 reasoning trace，答案仍然正确；而仅靠 prompt 让模型“简单题不要思考”并不可靠，模型会保守地继续输出完整推理。因此，“是否思考”不是推理能力的副产品，而是一种需要训练的格式和策略能力。</p>\n<h5>Stage 1：Thought Dropout</h5>\n<p>常规 SFT 数据形如：</p>\n<pre><code class=\"language-text\">&lt;think&gt;reasoning trace&lt;/think&gt;&lt;answer&gt;answer&lt;/answer&gt;\n</code></pre>\n<p>TON 随机把 <code>&lt;think&gt;</code> 中的内容替换为空白，例如只保留换行：</p>\n<pre><code class=\"language-python\">def thought_dropout(thought, dropout_prob):\n    if random.random() &lt; dropout_prob:\n        thought = &quot;\\n\\n&quot;\n    return thought\n</code></pre>\n<p>训练后模型见过两类合法格式：</p>\n<pre><code class=\"language-text\">&lt;think&gt;完整推理&lt;/think&gt;&lt;answer&gt;...&lt;/answer&gt;\n&lt;think&gt;\n\n&lt;/think&gt;&lt;answer&gt;...&lt;/answer&gt;\n</code></pre>\n<p>这一步的作用不是告诉模型具体哪些题该跳过，而是让“跳过思考”成为可生成的合法动作。真正的选择策略交给第二阶段 RL 学习。</p>\n<h5>Reverse Thinking：构造冷启动 thoughts</h5>\n<p>如果没有人工 CoT 标注，TON 使用 reverse thinking：给定图像 <span class=\"kb-math kb-math-inline\">I</span>、问题 <span class=\"kb-math kb-math-inline\">q</span> 和标准答案 <span class=\"kb-math kb-math-inline\">a^\\*</span>，让基座模型生成解释“如何从输入得到答案”的简洁 thought：</p>\n<div class=\"kb-math kb-math-display\">r \\sim \\pi_{base}(r \\mid I,q,a^\\*)</div>\n<p>这样可以低成本构造 SFT 所需的 reasoning trace，再对其执行 Thought Dropout。与调用闭源教师相比，这种方式更轻量，也让 thoughts 风格接近目标基座模型。</p>\n<h5>Stage 2：GRPO 选择 think / non-think</h5>\n<p>SFT 只提供格式能力，GRPO 学习决策。对同一图像问题采样 <span class=\"kb-math kb-math-inline\">G</span> 个候选输出，有的包含完整 thought，有的为空 thought。每个输出根据任务 reward 评分：</p>\n<div class=\"kb-math kb-math-display\">R=R_{format}+R_{outcome}</div>\n<p>组内优势为：</p>\n<div class=\"kb-math kb-math-display\">\\hat{A}_i=\\frac{R_i-\\mu_R}{\\sigma_R}</div>\n<p>如果某个简单样本在 non-think 模式下也能答对，它会得到与 think 模式相同或更稳定的 reward；随着训练推进，模型会提高空 thought 的概率，减少输出长度。对于困难样本，空 thought 更容易答错，完整推理样本获得更高优势，模型会保留推理。</p>\n<p>```python</p>"
    },
    {
      "id": "grounded_rl",
      "num": 25,
      "name": "Grounded-RL",
      "fullName": "接地强化学习 (Grounded Reinforcement Learning)",
      "year": "2026",
      "org": "CMU",
      "parent": "reason_rft",
      "paperUrl": "https://proceedings.neurips.cc/paper_files/paper/2025/hash/ddbd83ac1ad27304a72b873124c2dac2-Abstract-Conference.html",
      "projectUrl": "",
      "category": "frontier_2026",
      "motivation": "推理步骤锚定视觉证据，减少幻觉",
      "summary": "Grounded-RL 的核心目标是：推理步骤锚定视觉证据，减少幻觉。",
      "keyPoints": [
        "核心动机：推理步骤锚定视觉证据，减少幻觉",
        "演化来源：继承或改进自 reason_rft",
        "代表机构：CMU"
      ],
      "detail": "<h5>核心框架</h5>\n<p><img alt=\"ViGoRL 方法总览\" src=\"https://arxiv.org/html/2505.23678v3/Figures/Figure2_V3.jpg\" />\n<em>图：ViGoRL 先用 MCTS 生成接地图像区域的推理树，线性化为 SFT 冷启动轨迹，再用 GRPO 按最终奖励强化接地推理行为。</em></p>\n<h5>动机与背景</h5>\n<p>传统多模态 CoT 让模型输出较长的文字推理，但这些推理步骤往往只停留在“图中有某物”“左边那个区域”等模糊引用上。论文观察到，普通 VLM 在复杂视觉推理中常把图像当作静态上下文，而不是在每一步主动定位、检查、回看具体区域；标准 RL 只奖励最终答案时，还可能放大这种捷径，因为模型可以靠语言模式或数据偏置拿到奖励。</p>\n<p>Grounded-RL 的核心判断是：视觉推理和数学/代码推理不同，模型不仅要会“想”，还要知道每个想法来自图像中的哪里。因此 ViGoRL 把推理链从纯文本序列改写为带坐标的轨迹：</p>\n<div class=\"kb-math kb-math-display\">\\tau = [n_1,\\ldots,n_T,a], \\quad n_t=\\langle s_t,(x_t,y_t)\\rangle</div>\n<p>对应的策略分解为：</p>\n<div class=\"kb-math kb-math-display\">\\pi_\\theta(\\tau \\mid I,q)=\n\\left(\\prod_{t=1}^{T}\\pi_\\theta(n_t \\mid I,q,n_{&lt;t})\\right)\n\\pi_\\theta(a \\mid I,q,n_{\\le T})</div>\n<p>这里的关键不是让模型多输出一个坐标字段，而是把坐标变成策略的一部分。模型必须为每个推理步骤选择一个可定位的视觉证据点，后续训练才能奖励“有效地看图”和“正确地回答”。</p>\n<h5>MCTS 生成接地冷启动轨迹</h5>\n<p>ViGoRL 不直接从空白模型开始 RL，因为预训练 VLM 的初始采样分布很少包含充分的区域探索、视觉验证和回溯。论文用 MCTS 构造冷启动数据，每个搜索节点就是一个接地推理步骤 <span class=\"kb-math kb-math-inline\">\\langle s_t,(x_t,y_t)\\rangle</span>：</p>\n<p>```python</p>"
    },
    {
      "id": "ssr_cot",
      "num": 26,
      "name": "SSR-CoT",
      "fullName": "空间推理思维链 (Spatial Reasoning Chain-of-Thought)",
      "year": "2026",
      "org": "SJTU",
      "parent": "visual_cot",
      "paperUrl": "https://proceedings.neurips.cc/paper_files/paper/2025/hash/b3732a13897c4cea145c3bdece80de64-Abstract-Conference.html",
      "projectUrl": "",
      "category": "frontier_2026",
      "motivation": "百万级空间推理数据，增强深度感知",
      "summary": "SSR-CoT 的核心目标是：百万级空间推理数据，增强深度感知。",
      "keyPoints": [
        "核心动机：百万级空间推理数据，增强深度感知",
        "演化来源：继承或改进自 visual_cot",
        "代表机构：SJTU"
      ],
      "detail": "<h5>核心框架</h5>\n<p><img alt=\"SSR 框架图\" src=\"https://arxiv.org/html/2505.12448v3/x2.png\" />\n<em>图：SSR 由深度估计、MIDI 模块、VLM 推理与两阶段训练组成；Stage 1 让 MIDI 学会恢复空间 rationale，Stage 2 可选地让 MIDI 与 VLM 联合生成最终答案。</em></p>\n<h5>动机与背景</h5>\n<p>多数 VLM 只看 RGB 图像，天然缺少几何深度信息。即使引入深度图或点云，传统做法也常把深度当作额外输入特征，缺少“如何把深度用于推理”的中间表达。例如判断“谁在更前面”“物体是否在桌子下面”“人推着什么”时，模型需要把像素级深度转成对象级位置、距离、遮挡和交互关系。</p>\n<p>SSR 的核心思想是把深度数据翻译成结构化、可解释的空间 rationale，再把 rationale 压缩为 latent tokens。这样既保留了 CoT 的推理信息，又避免推理阶段生成大量文字带来的成本。</p>\n<h5>MIDI：从图像和深度生成空间 latent tokens</h5>\n<p>给定 RGB 图像 <span class=\"kb-math kb-math-inline\">X_V \\in \\mathbb{R}^{H\\times W\\times 3}</span>、文本问题 <span class=\"kb-math kb-math-inline\">X_T</span>，SSR 首先用 Depth Pro 得到单目深度图：</p>\n<div class=\"kb-math kb-math-display\">X_D \\in \\mathbb{R}^{H\\times W\\times 1}</div>\n<p>随后分别提取 RGB 和深度特征。论文使用 CLIP ViT-L/14 作为视觉编码器 <span class=\"kb-math kb-math-inline\">E_V</span>，使用 SigLIP 作为深度编码器 <span class=\"kb-math kb-math-inline\">E_D</span>：</p>\n<div class=\"kb-math kb-math-display\">H_\\alpha = E_\\alpha(X_\\alpha), \\quad \\alpha \\in \\{V,D\\}</div>\n<p>再通过两层 MLP projector <span class=\"kb-math kb-math-inline\">\\phi_V,\\phi_D</span> 映射到语言模型可用的语义空间：</p>\n<div class=\"kb-math kb-math-display\">Z_\\alpha = \\phi_\\alpha(H_\\alpha), \\quad \\alpha \\in \\{V,D\\}</div>\n<p>MIDI 的核心是一个 Mamba-based language model <span class=\"kb-math kb-math-inline\">f_{\\text{LM}}</span>，它联合 RGB 特征、深度特征和问题，生成表示中间空间 rationale 的隐状态：</p>\n<div class=\"kb-math kb-math-display\">H_R = f_{\\text{LM}}(Z_V,Z_D,X_T)</div>\n<p>最后再用投影层 <span class=\"kb-math kb-math-inline\">\\phi_R</span> 变成可插入 VLM 的 latent rationale tokens：</p>\n<div class=\"kb-math kb-math-display\">Z_R = \\phi_R(H_R)</div>\n<p>这些 <span class=\"kb-math kb-math-inline\">Z_R</span> token 被当作“隐式空间思维链”拼入 VLM 的图文输入，最终答案为：</p>\n<div class=\"kb-math kb-math-display\">Y_A = f_{\\text{VLM}}(X_V,Z_R,X_T)</div>\n<div class=\"key-point\">💡 关键：SSR 不是简单把深度图塞给 VLM，而是让 MIDI 把深度转换成任务相关的空间推理表示，再由 VLM 使用这些 latent tokens 回答问题。</div>\n<h5>两阶段训练目标</h5>\n<p><strong>Stage 1：Reasoning and Alignment</strong></p>\n<p>Stage 1 只训练 MIDI，使它产生的 latent tokens 能被冻结或后续 LLM 理解为原始文字 rationale。每个样本包含 ground-truth rationale <span class=\"kb-math kb-math-inline\">Y_R</span>，训练目标是从 <span class=\"kb-math kb-math-inline\">X_V,X_D,X_T,Z_R</span> 自回归重建该 rationale：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_1(\\theta)=\n-\\mathbb{E}_{(X_V,X_D,X_T,Z_R,Y_R)\\sim D}\n\\left[\n\\frac{1}{|Y_R|}\n\\sum_{i=1}^{|Y_R|}\n\\log P_\\theta(Y_{R,i}\\mid X_V,X_D,X_T,Z_R,Y_{R,&lt;i})\n\\right]</div>\n<p>这一阶段解决两个问题：MIDI 必须学会“读懂深度并形成空间推理”，同时还要把 latent tokens 投影到语言语义空间，使后续 VLM 能消费它们。</p>\n<p><strong>Stage 2：Co-Training</strong></p>\n<p>Stage 2 是可选的联合训练。此时不再监督中间 rationale，而是让 VLM 直接生成答案 <span class=\"kb-math kb-math-inline\">Y_A</span>，目标函数为：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_2(\\theta)=\n-\\mathbb{E}_{(X_V,X_D,X_T,Y_A)\\sim D}\n\\left[\n\\frac{1}{|Y_A|}\n\\sum_{j=1}^{|Y_A|}\n\\log P_\\theta(Y_{A,j}\\mid X_V,X_D,X_T,Y_{A,&lt;j})\n\\right]</div>\n<p>因为 Stage 2 不需要 rationale 标注，所以可以引入更多普通 VQA 样本来扩展泛化能力。论文也强调 MIDI 具备 plug-and-play 特性：只做 Stage 1 时，也能把 <span class=\"kb-math kb-math-inline\">Z_R</span> 作为外部模块接入已有 VLM。</p>\n<h5>SSR-CoT 数据构造</h5>\n<p><img alt=\"SSR-CoT 标注流程\" src=\"https://arxiv.org/html/2505.12448v3/x3.png\" />\n<em>图：SSR-CoT 先估计深度，再结合 bounding box、SpatialRGPT/GPT-4o 等工具生成空间 rationale，并通过质量评估筛选。</em></p>\n<p>SSR-CoT 的样本格式可以理解为：</p>\n<pre><code class=\"language-yaml\">image: RGB image\ndepth: estimated depth map\nquestion: spatial or general VQA question\nrationale: object locations, depth/order/proximity relations, and reasoning steps\nanswer: final answer\n</code></pre>\n<p>数据来源包括：</p>\n<ul>\n<li>LLaVA-CoT：通用和科学 VQA 的结构化 reasoning 数据</li>\n<li>Visual-CoT：以 bounding box 作为中间思考步骤的多模态 CoT 数据</li>\n<li>VoCoT：包含对象关系和框标注的细粒度 image-text CoT 数据</li>\n<li>SpatialQA：包含深度相关和机器人空间问答的数据</li>\n</ul>\n<p>处理流程大致如下：</p>\n<p>```python</p>"
    },
    {
      "id": "muslr",
      "num": 27,
      "name": "MuSLR",
      "fullName": "多模态符号逻辑推理 (Multimodal Symbolic Logical Reasoning)",
      "year": "2026",
      "org": "NUS",
      "parent": "genome",
      "paperUrl": "https://proceedings.neurips.cc/paper_files/paper/2025/hash/4a69d58b1a64fd931ef72cd93b71dcbe-Abstract-Conference.html",
      "projectUrl": "",
      "category": "frontier_2026",
      "motivation": "增强鲁棒性与逻辑严密性",
      "summary": "MuSLR 的核心目标是：增强鲁棒性与逻辑严密性。",
      "keyPoints": [
        "核心动机：增强鲁棒性与逻辑严密性",
        "演化来源：继承或改进自 genome",
        "代表机构：NUS"
      ],
      "detail": "<h5>核心框架</h5>\n<p><img alt=\"LogiCAM 工作流\" src=\"https://arxiv.org/html/2509.25851v2/x4.png\" />\n<em>图：LogiCAM 每轮先选择关键多模态前提，再判断使用形式符号推理还是启发式常识推理，最后把新结论加入上下文继续迭代。</em></p>\n<h5>动机与背景</h5>\n<p>很多视觉推理 benchmark 关注空间关系、属性识别或常识问答，但高风险场景还需要可验证的形式逻辑。例如自动驾驶中，图像显示“前方道路关闭”，文本规则写着“只有道路开放时车辆才能直行”，模型应通过 Modus Tollens 推出“不能直行”。这类问题不能只靠图像描述或语言常识，而需要把视觉事实映射成逻辑前提，再严格应用形式规则。</p>\n<p>MuSLR 的挑战在于两点同时成立：图像和文本各自都不够，模型必须融合两种模态；答案不能只看语义相似度，而要符合逻辑推导链。论文因此把样本组织为：</p>\n<div class=\"kb-math kb-math-display\">(I,T,Q) \\rightarrow A</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">I</span> 是图像，<span class=\"kb-math kb-math-inline\">T</span> 包含文本上下文和符号规则，<span class=\"kb-math kb-math-inline\">Q</span> 是问题，<span class=\"kb-math kb-math-inline\">A</span> 是 Truth Evaluation 或 Multiple Choice 的答案。每个样本还配有 ground-truth reasoning chain，用于分析模型是否真正按逻辑步骤推导。</p>\n<h5>MuSLR-Bench 构造</h5>\n<p><img alt=\"MuSLR 数据构造流程\" src=\"https://arxiv.org/html/2509.25851v2/x2.png\" />\n<em>图：MuSLR 从多模态数据和符号规则出发，组合推理链、映射到真实场景、生成问答，并经过自动和人工质量检查。</em></p>\n<p>数据构造流程可以概括为：</p>\n<p>```python</p>"
    },
    {
      "id": "med_r1",
      "num": 28,
      "name": "Med-R1",
      "fullName": "医学多模态推理 (Medical Multimodal Reasoning via RL)",
      "year": "2026",
      "org": "Stanford Med",
      "parent": "reason_rft",
      "paperUrl": "https://ieeexplore.ieee.org/abstract/document/11371404/",
      "projectUrl": "",
      "category": "frontier_2026",
      "motivation": "GRPO医学推理，跨模态跨任务泛化",
      "summary": "Med-R1 的核心目标是：GRPO医学推理，跨模态跨任务泛化。",
      "keyPoints": [
        "核心动机：GRPO医学推理，跨模态跨任务泛化",
        "演化来源：继承或改进自 reason_rft",
        "代表机构：Stanford Med"
      ],
      "detail": "<h5>核心框架</h5>\n<p><img alt=\"Med-R1 奖励与长度曲线\" src=\"https://arxiv.org/html/2503.13939v4/extracted/6388405/fig_rewards_length.png\" />\n<em>图：Med-R1 在不同医学模态和任务上的 GRPO 训练奖励与输出长度变化；奖励通常在 100-200 steps 内收敛，输出长度随训练缩短。</em></p>\n<h5>动机与背景</h5>\n<p>医学影像 VQA 与自然图像 VQA 不同：问题往往要求识别细粒度病灶、解剖结构或影像模态，且不同模态之间视觉分布差异很大。传统 SFT 容易把模型绑定到训练集中的表面模式，例如某种模态的特定纹理或某类问题的常见答案；高质量医学 CoT 标注又昂贵且难以规模化。</p>\n<p>Med-R1 的出发点是用 RL 替代单纯最大似然拟合，让模型在规则奖励下探索更稳健的回答策略。与 PPO 相比，GRPO 不需要额外价值模型，适合资源受限的医学 VLM 后训练。</p>\n<h5>GRPO 目标函数</h5>\n<p>对训练问题集合 <span class=\"kb-math kb-math-inline\">P(Q)</span>，每次采样问题 <span class=\"kb-math kb-math-inline\">q</span>，旧策略 <span class=\"kb-math kb-math-inline\">\\pi_{\\theta_{\\text{old}}}</span> 对同一问题生成 <span class=\"kb-math kb-math-inline\">G</span> 个回答 <span class=\"kb-math kb-math-inline\">\\{o_i\\}_{i=1}^{G}</span>。GRPO 目标为：</p>\n<div class=\"kb-math kb-math-display\">J_{\\text{GRPO}}(\\theta)=\n\\mathbb{E}_{q\\sim P(Q),\\{o_i\\}_{i=1}^{G}\\sim \\pi_{\\theta_{\\text{old}}}}\n\\frac{1}{G}\\sum_{i=1}^{G}\n\\left[\n\\min\\left(\n\\frac{\\pi_{\\theta_{\\text{new}}}(o_i\\mid q)}\n{\\pi_{\\theta_{\\text{old}}}(o_i\\mid q)}A_i,\n\\text{clip}\\left(\n\\frac{\\pi_{\\theta_{\\text{new}}}(o_i\\mid q)}\n{\\pi_{\\theta_{\\text{old}}}(o_i\\mid q)},\n1-\\epsilon,1+\\epsilon\n\\right)A_i\n\\right)\n-\\beta D_{\\text{KL}}(\\pi_{\\theta_{\\text{new}}}\\|\\pi_{\\text{ref}})\n\\right]</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\pi_{\\text{ref}}</span> 是冻结的基础 MLLM，KL 项限制新策略不要偏离基础模型太远。与 PPO 不同，GRPO 的 <span class=\"kb-math kb-math-inline\">A_i</span> 不来自 critic，而来自同组样本的奖励归一化：</p>\n<div class=\"kb-math kb-math-display\">A_i = \\frac{r_i-\\text{mean}(\\{r_j\\}_{j=1}^{G})}{\\text{std}(\\{r_j\\}_{j=1}^{G})}</div>\n<p>直觉上，同一医学问题下多条候选回答互相比，答对且格式正确的回答获得正优势，答错或格式坏的回答获得负优势。</p>\n<h5>奖励设计</h5>\n<p>Med-R1 使用两类规则奖励：</p>\n<ul>\n<li><strong>格式奖励</strong>：要求模型把思考过程放在 <code>&lt;think&gt;...&lt;/think&gt;</code>，最终答案放在 <code>&lt;answer&gt;...&lt;/answer&gt;</code> 中；标签存在且格式正确时给 1 分</li>\n<li><strong>准确率奖励</strong>：医学 VQA 多为选项题，若提取出的首个答案字母与 ground truth 匹配，则给 1 分</li>\n</ul>\n<p>```python</p>"
    }
  ],
  "categories": {
    "foundation": {
      "label": "视觉语言对齐基础",
      "color": "#888888"
    },
    "mm_cot": {
      "label": "多模态思维链",
      "color": "#888888"
    },
    "compositional": {
      "label": "组合推理与神经符号",
      "color": "#888888"
    },
    "frontier_2026": {
      "label": "2026前沿技术",
      "color": "#888888"
    }
  },
  "projectUrls": {}
};
