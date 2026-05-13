/**
 * ocr-data.js — 由 pipeline/build.py 于 2026-05-13 12:20:51 自动生成。
 * 源文件：content/cv/ocr.md
 * ⚠️  请勿手动修改；如需更新，修改源文档后重新编译。
 */
window.PAGE_CONFIG = {
  "meta": {
    "domain": "cv",
    "topic_id": "ocr",
    "topic_name": "ocr",
    "page_title": "OCR 技术演进图谱",
    "page_subtitle": "2026-05-13 版",
    "page_desc": "梳理从传统检测识别到端到端文档理解的技术演进，涵盖文本检测、识别、版面分析与视觉文档理解四大方向。",
    "page_icon": "📜",
    "hero_pills": [
      "🏷️ Text Detection · Recognition · Document AI"
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
  "graph": {
    "nodes": [
      {
        "id": "ctpn",
        "x": 100,
        "y": 100,
        "category": "detection"
      },
      {
        "id": "textboxes",
        "x": 200,
        "y": 80,
        "category": "detection"
      },
      {
        "id": "east",
        "x": 200,
        "y": 120,
        "category": "detection"
      },
      {
        "id": "psenet",
        "x": 300,
        "y": 100,
        "category": "detection"
      },
      {
        "id": "pan",
        "x": 400,
        "y": 80,
        "category": "detection"
      },
      {
        "id": "dbnet",
        "x": 400,
        "y": 120,
        "category": "detection"
      },
      {
        "id": "dptext_detr",
        "x": 500,
        "y": 100,
        "category": "detection"
      },
      {
        "id": "srformer",
        "x": 600,
        "y": 100,
        "category": "detection"
      },
      {
        "id": "crnn",
        "x": 50,
        "y": 300,
        "category": "recognition"
      },
      {
        "id": "aster",
        "x": 150,
        "y": 300,
        "category": "recognition"
      },
      {
        "id": "moran",
        "x": 250,
        "y": 280,
        "category": "recognition"
      },
      {
        "id": "master",
        "x": 250,
        "y": 320,
        "category": "recognition"
      },
      {
        "id": "abinet",
        "x": 350,
        "y": 300,
        "category": "recognition"
      },
      {
        "id": "parseq",
        "x": 450,
        "y": 300,
        "category": "recognition"
      },
      {
        "id": "trocr",
        "x": 550,
        "y": 300,
        "category": "recognition"
      },
      {
        "id": "svtrv2",
        "x": 650,
        "y": 300,
        "category": "recognition"
      },
      {
        "id": "fots",
        "x": 150,
        "y": 500,
        "category": "e2e_spotting"
      },
      {
        "id": "mask_textspotter",
        "x": 250,
        "y": 500,
        "category": "e2e_spotting"
      },
      {
        "id": "mask_textspotter_v3",
        "x": 350,
        "y": 480,
        "category": "e2e_spotting"
      },
      {
        "id": "abcnet",
        "x": 350,
        "y": 520,
        "category": "e2e_spotting"
      },
      {
        "id": "abcnet_v2",
        "x": 450,
        "y": 500,
        "category": "e2e_spotting"
      },
      {
        "id": "estextspotter",
        "x": 550,
        "y": 500,
        "category": "e2e_spotting"
      },
      {
        "id": "layoutlm",
        "x": 200,
        "y": 700,
        "category": "document_ai"
      },
      {
        "id": "layoutlmv3",
        "x": 300,
        "y": 680,
        "category": "document_ai"
      },
      {
        "id": "dit",
        "x": 300,
        "y": 720,
        "category": "document_ai"
      },
      {
        "id": "donut",
        "x": 400,
        "y": 700,
        "category": "document_ai"
      },
      {
        "id": "pix2struct",
        "x": 500,
        "y": 700,
        "category": "document_ai"
      },
      {
        "id": "got_ocr",
        "x": 600,
        "y": 700,
        "category": "document_ai"
      },
      {
        "id": "glm_ocr",
        "x": 700,
        "y": 700,
        "category": "document_ai"
      }
    ],
    "edges": [
      {
        "from": "ctpn",
        "to": "textboxes",
        "label": "优化宽高比"
      },
      {
        "from": "ctpn",
        "to": "east",
        "label": "简化流程"
      },
      {
        "from": "east",
        "to": "psenet",
        "label": "处理粘连"
      },
      {
        "from": "psenet",
        "to": "pan",
        "label": "轻量化"
      },
      {
        "from": "psenet",
        "to": "dbnet",
        "label": "可微二值化"
      },
      {
        "from": "dbnet",
        "to": "dptext_detr",
        "label": "引入DETR"
      },
      {
        "from": "dptext_detr",
        "to": "srformer",
        "label": "统一范式"
      },
      {
        "from": "crnn",
        "to": "aster",
        "label": "加入校正"
      },
      {
        "from": "aster",
        "to": "moran",
        "label": "多对象校正"
      },
      {
        "from": "aster",
        "to": "master",
        "label": "多视角注意力"
      },
      {
        "from": "master",
        "to": "abinet",
        "label": "语言模型增强"
      },
      {
        "from": "abinet",
        "to": "parseq",
        "label": "统一解码"
      },
      {
        "from": "parseq",
        "to": "trocr",
        "label": "全TF架构"
      },
      {
        "from": "trocr",
        "to": "svtrv2",
        "label": "CTC复兴"
      },
      {
        "from": "fots",
        "to": "mask_textspotter",
        "label": "分割思想"
      },
      {
        "from": "mask_textspotter",
        "to": "mask_textspotter_v3",
        "label": "极端比例"
      },
      {
        "from": "mask_textspotter",
        "to": "abcnet",
        "label": "参数化曲线"
      },
      {
        "from": "abcnet",
        "to": "abcnet_v2",
        "label": "自适应训练"
      },
      {
        "from": "abcnet_v2",
        "to": "estextspotter",
        "label": "显式协同"
      },
      {
        "from": "layoutlm",
        "to": "layoutlmv3",
        "label": "统一掩码"
      },
      {
        "from": "layoutlm",
        "to": "dit",
        "label": "自监督"
      },
      {
        "from": "layoutlmv3",
        "to": "donut",
        "label": "OCR-Free"
      },
      {
        "from": "donut",
        "to": "pix2struct",
        "label": "截图预训练"
      },
      {
        "from": "donut",
        "to": "got_ocr",
        "label": "统一全类型"
      },
      {
        "from": "got_ocr",
        "to": "glm_ocr",
        "label": "专用优化"
      }
    ],
    "milestones": [
      "crnn",
      "layoutlm",
      "donut"
    ]
  },
  "algos": [
    {
      "id": "ctpn",
      "num": 1,
      "name": "CTPN",
      "fullName": "连接文本提议网络 (Connectionist Text Proposal Network)",
      "year": "2016",
      "org": "Tsinghua University / Megvii",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/1609.03605",
      "projectUrl": "",
      "category": "detection",
      "motivation": "垂直锚点+BLSTM检测水平文本",
      "summary": "CTPN 的核心目标是：垂直锚点+BLSTM检测水平文本。",
      "keyPoints": [
        "核心动机：垂直锚点+BLSTM检测水平文本",
        "代表机构：Tsinghua University / Megvii"
      ],
      "detail": "<p>垂直锚点+BLSTM检测水平文本</p>"
    },
    {
      "id": "textboxes",
      "num": 2,
      "name": "TextBoxes",
      "fullName": "文本框检测网络 (TextBoxes)",
      "year": "2017",
      "org": "Huazhong University of Science and Technology",
      "parent": "ctpn",
      "paperUrl": "https://arxiv.org/abs/1611.06779",
      "projectUrl": "",
      "category": "detection",
      "motivation": "长条卷积核适配高宽比文本",
      "summary": "TextBoxes 基于 SSD 框架，通过引入长条形默认框（大宽高比）和 1×5 不规则卷积核来适配文本的极端宽高比特征，实现了端到端可训练的单次前向传播场景文字检测，在保持高精度的同时达到 0.09s/图的实时速度。",
      "keyPoints": [
        "基于 SSD 的全卷积文本检测架构：28 层网络，VGG-16 骨干 + 9 层额外卷积层，6 个 text-box 输出层",
        "长宽比默认框设计：宽高比为 1, 2, 3, 5, 7, 10 的 default boxes，并引入垂直偏移解决匹配稀疏问题",
        "1×5 不规则卷积核：替代标准 3×3 卷积，产生矩形感受野，更好匹配水平文本",
        "多尺度输入策略：5 种尺度（300×300, 700×700, 300×700, 500×700, 1600×1600）进一步提升检测精度",
        "结合 CRNN 文本识别器：利用识别置信度重新评分检测框，消除假阳性，提升 word spotting 和端到端识别性能",
        "损失函数：与 SSD 相同，分类使用 2-class softmax loss，定位使用 smooth L1 loss"
      ],
      "detail": "<p><img alt=\"TextBoxes 网络架构图\" src=\"https://ar5iv.labs.arxiv.org/html/1611.06779/assets/x1.png\" />\n<em>图：TextBoxes 架构总览。28 层全卷积网络，text-box 层连接到 6 个卷积层，每个位置预测 12 个默认框的文本存在分数和偏移量（72 维向量）。</em></p>\n<p><img alt=\"默认框设计示意图\" src=\"https://ar5iv.labs.arxiv.org/html/1611.06779/assets/x2.png\" />\n<em>图：默认框设计。展示了宽高比为 1 和 5 的默认框，以及带有垂直偏移的变体，用于解决水平方向密集、垂直方向稀疏的匹配问题。</em></p>\n<pre><code class=\"language-python\"># TextBoxes 检测流程伪代码\ndef textboxes_detect(image):\n    # 1. 多尺度输入（可选）\n    scales = [(300,300), (700,700), (300,700), (500,700), (1600,1600)]\n    all_boxes = []\n\n    for scale in scales:\n        img_resized = resize(image, scale)\n        # 2. 前向传播：VGG-16 骨干 + 额外卷积层\n        features = backbone(img_resized)  # 多层特征图\n\n        # 3. 6 个 text-box 层分别预测\n        for feat_map in selected_feature_maps:  # 6 层\n            # 使用 1x5 卷积核预测\n            # 每个位置 12 个默认框 × (2 分类 + 4 回归) = 72 维\n            preds = conv1x5(feat_map)  \n            boxes = decode(preds, default_boxes)\n            all_boxes.extend(boxes)\n\n    # 4. NMS 后处理\n    final_boxes = nms(all_boxes, threshold=0.45)\n    return final_boxes\n\n# 可选：结合 CRNN 重评分\ndef rescore_with_crnn(boxes, image, lexicon):\n    for box in boxes:\n        crop = crop_image(image, box)\n        score = max(crnn.prob(word | crop) for word in lexicon)\n        box.score = score\n    return nms(boxes)  # 二次 NMS\n</code></pre>\n<p><strong>动机与背景</strong></p>\n<p>场景文字检测面临的核心挑战是文本具有极端的宽高比（如长单词或短语），这与通用目标检测中物体通常接近正方形的假设截然不同。传统方法依赖多步流水线（字符检测→过滤→分组），参数调优困难且速度慢。SSD 等通用检测器虽然速度快，但其默认框和 3×3 卷积核的设计无法有效覆盖高宽高比的文本区域——实验表明直接使用 SSD 检测文本的 F-measure 仅为 0.68（ICDAR 2013），远低于专用方法。</p>\n<p><strong>核心机制：Text-box 层</strong></p>\n<p>Text-box 层是 TextBoxes 的关键创新。在每个特征图位置，该层同时预测文本存在概率和边界框偏移量。其核心设计包含两个方面：</p>\n<p><strong>1. 大宽高比默认框 + 垂直偏移</strong></p>\n<p>与 SSD 使用 \\(1, 2, 1/2, 3, 1/3\\) 等对称宽高比不同，TextBoxes 定义了 6 种宽高比：\\(1, 2, 3, 5, 7, 10\\)，全部偏向水平方向。然而，仅增加水平方向的默认框会导致水平方向密集而垂直方向稀疏，造成 ground-truth 与默认框的匹配质量下降。为此，每个默认框额外设置一个垂直偏移版本（偏移量为网格单元高度的一半），使得每个位置共有 \\(6 \\times 2 = 12\\) 个默认框。</p>\n<p><strong>2. 1×5 不规则卷积核</strong></p>\n<p>标准 3×3 卷积核产生正方形感受野，对于水平延伸的文本会引入大量背景噪声。TextBoxes 采用 1×5 的 inception 风格卷积核，产生水平矩形感受野，更好地匹配文本的形态特征，同时减少垂直方向的噪声干扰。</p>\n<p><strong>边界框回归公式</strong></p>\n<p>给定默认框 \\(\\mathbf{b}_0 = (x_0, y_0, w_0, h_0)\\)，text-box 层预测偏移量 \\((\\Delta x, \\Delta y, \\Delta w, \\Delta h)\\)，最终检测框通过以下公式解码：</p>\n<p>$$x = x_0 + w_0 \\cdot \\Delta x$$\n$$y = y_0 + h_0 \\cdot \\Delta y$$\n$$w = w_0 \\cdot \\exp(\\Delta w)$$\n$$h = h_0 \\cdot \\exp(\\Delta h)$$</p>\n<p><strong>损失函数</strong></p>\n<p>TextBoxes 采用与 SSD 相同的多任务损失：</p>\n<p>$$L(x, c, l, g) = \\frac{1}{N}\\left(L_{\\text{conf}}(x, c) + \\alpha \\cdot L_{\\text{loc}}(x, l, g)\\right)$$</p>\n<p>其中 \\(N\\) 为匹配的默认框数量，\\(\\alpha = 1\\)。\\(L_{\\text{conf}}\\) 为 2-class softmax 分类损失，\\(L_{\\text{loc}}\\) 为 smooth L1 回归损失。</p>\n<p><strong>训练流程</strong></p>\n<ul>\n<li>输入尺寸：训练时固定 300×300</li>\n<li>预训练：在 SynthText（80 万合成图像）上训练 50k 迭代</li>\n<li>微调：在 ICDAR 2013 训练集上微调 2k 迭代</li>\n<li>优化器：SGD，momentum=0.9，weight decay=5×10⁻⁴</li>\n<li>学习率：初始 10⁻³，40k 迭代后衰减至 10⁻⁴</li>\n<li>数据增强：在线随机裁剪和翻转</li>\n<li>训练时间：约 25 小时（单块 Titan X GPU）</li>\n</ul>\n<p><strong>与 CRNN 结合的 Word Spotting</strong></p>\n<p>TextBoxes 先以低阈值生成候选框（约 35 个/图，召回率 0.93），然后用 CRNN 对每个候选框计算识别置信度：</p>\n<p>$$s = \\max_{\\mathbf{w} \\in \\mathcal{W}} p(\\mathbf{w} | I)$$</p>\n<p>其中 \\(\\mathcal{W}\\) 为给定词典。该分数替代原始检测分数后进行二次阈值过滤和 NMS。对于识别为相同单词的框，采用更低的 NMS 重叠阈值以施加更强的抑制。</p>\n<p><strong>与传统方法的区别</strong></p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>传统方法</th>\n<th>SSD</th>\n<th>TextBoxes</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>流水线</td>\n<td>多步（检测→过滤→分组）</td>\n<td>单步</td>\n<td>单步</td>\n</tr>\n<tr>\n<td>默认框宽高比</td>\n<td>—</td>\n<td>对称（1, 2, 1/2, 3, 1/3）</td>\n<td>偏水平（1,2,3,5,7,10）+ 垂直偏移</td>\n</tr>\n<tr>\n<td>卷积核</td>\n<td>—</td>\n<td>3×3</td>\n<td>1×5</td>\n</tr>\n<tr>\n<td>文本适配</td>\n<td>手工规则</td>\n<td>无</td>\n<td>专门设计</td>\n</tr>\n<tr>\n<td>ICDAR 2013 F值</td>\n<td>~0.80</td>\n<td>0.68</td>\n<td><strong>0.85</strong>（多尺度 0.86）</td>\n</tr>\n<tr>\n<td>速度</td>\n<td>1-7s</td>\n<td>0.1s</td>\n<td>0.09s（快速）/ 0.73s（多尺度）</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 关键：TextBoxes 的核心贡献在于证明了只需对通用检测器（SSD）做针对性的\"形状适配\"改造——长条默认框 + 长条卷积核——就能大幅提升文本检测性能，无需复杂的多阶段流水线。</div>",
      "quiz": {
        "q": "TextBoxes 相比 SSD 的核心改进是什么？",
        "options": [
          "使用更深的骨干网络（ResNet 替代 VGG）",
          "引入大宽高比默认框和 1×5 卷积核以适配文本的极端宽高比",
          "采用 Faster R-CNN 的两阶段检测策略",
          "使用可变形卷积替代标准卷积"
        ],
        "answer": 1,
        "explain": "TextBoxes 保持 VGG-16 骨干不变，核心改进是将默认框宽高比从对称设计改为偏水平的 1,2,3,5,7,10，并用 1×5 卷积核替代 3×3 以产生矩形感受野，专门适配文本的大宽高比特征。"
      }
    },
    {
      "id": "east",
      "num": 3,
      "name": "EAST",
      "fullName": "高效精准场景文本检测器 (Efficient and Accurate Scene Text Detector)",
      "year": "2017",
      "org": "Megvii Technology",
      "parent": "ctpn",
      "paperUrl": "https://arxiv.org/abs/1704.03155",
      "projectUrl": "",
      "category": "detection",
      "motivation": "单阶段直接回归简化流程",
      "summary": "EAST 提出了一种极简的单阶段场景文本检测方法，通过全卷积网络（FCN）直接在每个像素位置预测文本置信度和几何形状（旋转矩形或四边形），彻底消除了传统方法中候选区域提取、文本行聚合、分词等冗余中间步骤，在保持实时速度的同时大幅提升了检测精度。",
      "keyPoints": [
        "<strong>极简两阶段流水线</strong>：仅包含 FCN 密集预测 + NMS 后处理，去除候选聚合、分词等所有中间步骤",
        "<strong>双几何输出模式</strong>：支持 RBOX（旋转矩形，5 通道：4 距离 + 1 角度）和 QUAD（四边形，8 通道：4 顶点偏移），适应不同场景",
        "<strong>U-shape 特征合并网络</strong>：自底向上提取多尺度特征（1/4 ~ 1/32），自顶向下逐级 unpool + concat + conv 合并，输出 1/4 分辨率",
        "<strong>尺度不变的 IoU 损失</strong>：RBOX 几何回归采用 \\(-\\log \\text{IoU}\\) 损失，对不同尺度文本天然不变",
        "<strong>Locality-Aware NMS</strong>：利用相邻像素几何体高度相关的假设，按行逐步合并，将 NMS 从 \\(O(n^2)\\) 降至 \\(O(n)\\)",
        "<strong>Backbone 灵活</strong>：支持 VGG16（精度优先）和 PVANet（速度优先），PVANet 2x 达 13.2 FPS（720p）",
        "<strong>多基准 SOTA</strong>：ICDAR 2015 F-score 0.7820（单尺度）/ 0.8072（多尺度），MSRA-TD500 F-score 0.7608，COCO-Text F-score 0.3245"
      ],
      "detail": "<h5>流水线对比与动机</h5>\n<p><img alt=\"EAST 流水线对比\" src=\"https://ar5iv.labs.arxiv.org/html/1704.03155/assets/x1.png\" />\n<em>图 1：传统多阶段文本检测流水线（上）vs EAST 极简流水线（下）。传统方法需要候选生成、过滤、文本行聚合、分词等多个步骤，每一步的误差都会累积；EAST 将所有步骤压缩为 FCN + NMS 两步。</em></p>\n<p>传统场景文本检测方法（如 CTPN、TextBoxes 等）通常包含多个串行阶段：候选区域生成 → 候选过滤 → 边界框回归 → 文本行聚合 → 分词。这种多阶段设计存在两个核心问题：</p>\n<ol>\n<li><strong>误差累积</strong>：每个中间步骤的错误都会传递到下游，最终性能受限于最弱环节</li>\n<li><strong>速度瓶颈</strong>：冗余的后处理步骤（尤其是文本行聚合和分词）显著增加推理时间</li>\n</ol>\n<p>EAST 的核心思想是：<strong>让网络直接在每个像素位置预测文本区域的完整几何描述</strong>，从而跳过所有中间步骤。</p>\n<h5>网络架构</h5>\n<p><img alt=\"EAST 网络架构\" src=\"https://ar5iv.labs.arxiv.org/html/1704.03155/assets/x2.png\" />\n<em>图 2：EAST 网络架构。左侧为特征提取干（feature extractor stem），中间为特征合并分支（feature-merging branch），右侧为输出层。</em></p>\n<p>网络由三部分组成：</p>\n<p><strong>1. 特征提取干（Feature Extractor Stem）</strong></p>\n<p>使用预训练的卷积网络（VGG16 或 PVANet）作为骨干，从四个不同层级提取特征图：</p>\n<p>$$f_1, f_2, f_3, f_4$$</p>\n<p>分别对应原图的 1/4、1/8、1/16、1/32 分辨率。这些多尺度特征图能同时捕获小文本的细节信息和大文本的语义信息。</p>\n<p><strong>2. 特征合并分支（Feature-Merging Branch）</strong></p>\n<p>采用类似 U-Net 的自顶向下合并策略，逐级融合多尺度特征：</p>\n<p>$$h_i = f_i \\quad (i=1)$$</p>\n<p>$$g_i = \\text{unpool}(h_i) \\quad (i \\geq 2)$$</p>\n<p>$$h_i = \\text{Conv}_{3\\times3}(\\text{Conv}_{1\\times1}([g_i; f_{i-1}]))$$</p>\n<p>其中 \\([g_i; f_{i-1}]\\) 表示沿通道维度拼接。每一级先用 1×1 卷积降维，再用 3×3 卷积融合特征。最终输出特征图 \\(h_4\\) 的分辨率为原图的 1/4。</p>\n<div class=\"key-point\">💡 <strong>关键设计</strong>：合并分支中每级的通道数逐步减半（如 128→64→32），既保证了感受野的逐步扩大，又控制了计算量。</div>\n<p><strong>3. 输出层</strong></p>\n<p>在合并后的特征图上，用 1×1 卷积产生两类输出：</p>\n<ul>\n<li><strong>Score Map</strong>（1 通道）：每个像素属于文本区域的置信度，值域 \\([0, 1]\\)</li>\n<li><strong>Geometry Map</strong>：</li>\n<li><strong>RBOX 模式</strong>（5 通道）：4 个通道分别表示像素到矩形上、右、下、左边界的距离 \\((d_1, d_2, d_3, d_4)\\)，1 个通道表示旋转角度 \\(\\theta \\in [-\\pi/4, \\pi/4)\\)</li>\n<li><strong>QUAD 模式</strong>（8 通道）：4 个顶点相对于当前像素位置的偏移量 \\((\\Delta x_i, \\Delta y_i), i=1,2,3,4\\)</li>\n</ul>\n<h5>标签生成</h5>\n<p><img alt=\"EAST 标签生成\" src=\"https://ar5iv.labs.arxiv.org/html/1704.03155/assets/x3.png\" />\n<em>图 3：标签生成过程。(a) 原始四边形标注；(b) 收缩后的正样本区域（绿色）；(c) RBOX 几何标签；(d) QUAD 几何标签。</em></p>\n<p><strong>Score Map 标签</strong>：为避免文本边界处的模糊性，对原始四边形标注进行收缩处理。对四边形的每条边，按参考长度的 \\(0.3\\) 倍向内收缩：</p>\n<p>$$D(p_i) = \\min(D(p_i, p_{(i \\bmod 4)+1}),\\ D(p_i, p_{((i+2) \\bmod 4)+1}))$$</p>\n<p>其中 \\(D(p_i, p_j)\\) 是顶点 \\(p_i\\) 到 \\(p_j\\) 的欧氏距离。收缩后的区域内像素标记为正样本（score = 1），其余为负样本。</p>\n<p><strong>Geometry 标签</strong>：对于正样本区域内的每个像素，计算其到对应文本框边界的距离（RBOX）或顶点偏移（QUAD）。</p>\n<h5>损失函数</h5>\n<p>总损失为分类损失和几何损失的加权和：</p>\n<p>$$L = L_s + \\lambda_g \\cdot L_g$$</p>\n<p>其中 \\(\\lambda_g\\) 设为 1。</p>\n<p><strong>分类损失 \\(L_s\\)</strong>：采用类别平衡的交叉熵损失，通过对正负样本加权来处理严重的类别不平衡：</p>\n<p>$$L_s = -\\beta \\cdot Y^* \\cdot \\log(\\hat{Y}) - (1-\\beta) \\cdot (1-Y^*) \\cdot \\log(1-\\hat{Y})$$</p>\n<p>其中 \\(\\beta\\) 为负样本在训练 patch 中的比例，自动平衡正负样本的贡献。</p>\n<p><strong>RBOX 几何损失 \\(L_g\\)</strong>：由 AABB 损失和角度损失两部分组成：</p>\n<p>$$L_g = L_{\\text{AABB}} + \\lambda_\\theta \\cdot L_\\theta$$</p>\n<p>AABB 部分采用 IoU 损失，对不同尺度的文本天然不变：</p>\n<p>$$L_{\\text{AABB}} = -\\log \\text{IoU}(\\hat{\\mathbf{R}}, \\mathbf{R}^*) = -\\log \\frac{|\\hat{\\mathbf{R}} \\cap \\mathbf{R}^*|}{|\\hat{\\mathbf{R}} \\cup \\mathbf{R}^*|}$$</p>\n<p>其中交集的宽和高可直接计算：</p>\n<p>$$w_i = \\min(\\hat{d}_2, d_2^*) + \\min(\\hat{d}_4, d_4^*), \\quad h_i = \\min(\\hat{d}_1, d_1^*) + \\min(\\hat{d}_3, d_3^*)$$</p>\n<p>角度部分采用余弦损失：</p>\n<p>$$L_\\theta(\\hat{\\theta}, \\theta^*) = 1 - \\cos(\\hat{\\theta} - \\theta^*)$$</p>\n<div class=\"key-point\">💡 <strong>关键</strong>：\\(\\lambda_\\theta = 10\\)，角度损失权重较高，因为角度预测的准确性对最终检测框质量至关重要。</div>\n<p><strong>QUAD 几何损失</strong>：采用尺度归一化的 Smooth-L1 损失：</p>\n<p>$$L_g = \\min_{\\tilde{Q}} \\sum_{c_i \\in C_{\\tilde{Q}}} \\frac{\\text{smoothed}_{L_1}(d_i, d_i^*)}{8 \\times N_{\\tilde{Q}}^*}$$</p>\n<p>其中 \\(N_{\\tilde{Q}}^*\\) 是四边形最短边长，用于归一化不同尺度文本的损失贡献。</p>\n<h5>核心算法伪代码</h5>\n<pre><code class=\"language-python\"># EAST 检测流程伪代码\ndef east_detect(image, model, score_thresh=0.5):\n    # 1. FCN 前向推理\n    score_map, geometry_map = model(image)  # score: H/4×W/4×1, geo: H/4×W/4×5(RBOX)或8(QUAD)\n\n    # 2. 阈值过滤\n    mask = score_map &gt; score_thresh\n    scores = score_map[mask]\n    geometries = geometry_map[mask]\n\n    # 3. Locality-Aware NMS\n    detections = locality_aware_nms(geometries, scores)\n    return detections\n\ndef locality_aware_nms(geometries, scores):\n    &quot;&quot;&quot;按行扫描合并，O(n) 最优复杂度&quot;&quot;&quot;\n    # 按行（y坐标）排序\n    S = sort_by_row(geometries, scores)\n    merged = None\n    results = []\n\n    for g, s in S:\n        if merged is not None and should_merge(g, merged):\n            # 按置信度加权合并坐标\n            merged = weighted_merge(g, merged)\n        else:\n            if merged is not None:\n                results.append(merged)\n            merged = (g, s)\n\n    if merged is not None:\n        results.append(merged)\n\n    # 对合并后的少量候选执行标准 NMS\n    return standard_nms(results)\n</code></pre>\n<h5>与传统方法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>传统多阶段方法</th>\n<th>EAST</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>流水线步骤</td>\n<td>候选生成→过滤→回归→聚合→分词</td>\n<td>FCN → NMS</td>\n</tr>\n<tr>\n<td>中间表示</td>\n<td>字符/单词候选框</td>\n<td>像素级 score + geometry</td>\n</tr>\n<tr>\n<td>几何输出</td>\n<td>水平矩形</td>\n<td>旋转矩形 / 任意四边形</td>\n</tr>\n<tr>\n<td>后处理复杂度</td>\n<td>高（多步串行）</td>\n<td>低（单步 NMS）</td>\n</tr>\n<tr>\n<td>速度（720p）</td>\n<td>通常 &lt; 5 FPS</td>\n<td>6.5~16.8 FPS</td>\n</tr>\n<tr>\n<td>多方向文本</td>\n<td>需要额外设计</td>\n<td>天然支持</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：EAST 在 RBOX 模式下计算 AABB 损失时忽略了旋转角度的影响，这是一种近似——当角度预测准确时，该近似误差很小。这种解耦设计简化了损失计算，同时在实验中表现良好。</div>\n<h5>实验结果</h5>\n<p>在三个主流基准上的表现：</p>\n<p><strong>ICDAR 2015</strong>（倾斜文本检测）：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>Precision</th>\n<th>Recall</th>\n<th>F-score</th>\n<th>FPS</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>CTPN</td>\n<td>0.7411</td>\n<td>0.5168</td>\n<td>0.6085</td>\n<td>7.1</td>\n</tr>\n<tr>\n<td>RRPN</td>\n<td>0.8202</td>\n<td>0.7340</td>\n<td>0.7744</td>\n<td>—</td>\n</tr>\n<tr>\n<td><strong>EAST (PVANet 2x)</strong></td>\n<td><strong>0.8034</strong></td>\n<td><strong>0.7608</strong></td>\n<td><strong>0.7820</strong></td>\n<td><strong>13.2</strong></td>\n</tr>\n<tr>\n<td>EAST (VGG16, 多尺度)</td>\n<td>0.8072</td>\n<td>—</td>\n<td>0.8072</td>\n<td>6.52</td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>MSRA-TD500</strong>（多语言长文本行）：F-score = 0.7608，Precision = 0.8152，Recall = 0.7127</p>\n<p><strong>COCO-Text</strong>（大规模自然场景）：F-score = 0.3245（AP = 0.3218）</p>",
      "quiz": {
        "q": "EAST 在 RBOX 模式下，几何损失 L_g 由哪两部分组成？",
        "options": [
          "交叉熵损失 + Smooth-L1 损失",
          "IoU 损失（AABB 距离）+ 余弦角度损失",
          "MSE 损失 + 交叉熵损失",
          "Focal Loss + L2 正则化损失"
        ],
        "answer": 1,
        "explain": "RBOX 几何损失由 AABB 的 -log IoU 损失和旋转角度的余弦损失 1-cos(θ̂-θ*) 加权求和组成，其中角度损失权重 λ_θ=10。"
      }
    },
    {
      "id": "psenet",
      "num": 4,
      "name": "PSENet",
      "fullName": "渐进式尺度扩展网络 (Progressive Scale Expansion Network)",
      "year": "2019",
      "org": "Nanjing University",
      "parent": "east",
      "paperUrl": "https://arxiv.org/abs/1903.12473",
      "projectUrl": "",
      "category": "detection",
      "motivation": "渐进扩展分离粘连文本",
      "summary": "PSENet 的核心目标是：渐进扩展分离粘连文本。",
      "keyPoints": [
        "核心动机：渐进扩展分离粘连文本",
        "演化来源：继承或改进自 east",
        "代表机构：Nanjing University"
      ],
      "detail": "<p>渐进扩展分离粘连文本</p>"
    },
    {
      "id": "pan",
      "num": 5,
      "name": "PAN",
      "fullName": "像素聚合网络 (Pixel Aggregation Network)",
      "year": "2019",
      "org": "SenseTime Research",
      "parent": "psenet",
      "paperUrl": "https://arxiv.org/abs/1908.05900",
      "projectUrl": "",
      "category": "detection",
      "motivation": "轻量聚合模块实现实时检测",
      "summary": "PAN 提出了低计算量的特征金字塔增强模块（FPEM）和可学习的像素聚合（PA）后处理策略，在保持高精度的同时将任意形状文本检测速度提升至实时水平（26.1 FPS @ 640px，ResNet18 骨干）。",
      "keyPoints": [
        "轻量骨干 + 可级联 FPEM：使用 ResNet18 作为骨干，FPEM 采用可分离卷积构建 U 形结构，计算量仅为标准 FPN 的 1/5，且可多次级联（默认 \\(n_c=2\\)）持续增强特征",
        "特征融合模块（FFM）：将多个 FPEM 输出逐尺度相加后上采样拼接，生成 \\(4 \\times 128 = 512\\) 通道的融合特征图",
        "像素聚合（PA）后处理：预测文本区域分割图、收缩核分割图和相似性向量，通过聚合损失 \\(\\mathcal{L}_{agg}\\) 和判别损失 \\(\\mathcal{L}_{dis}\\) 引导像素向对应核心聚类，实现快速且可学习的实例重建",
        "损失函数设计：\\(\\mathcal{L} = \\mathcal{L}_{tex} + 0.5\\mathcal{L}_{ker} + 0.25(\\mathcal{L}_{agg} + \\mathcal{L}_{dis})\\)，分割部分使用 Dice Loss 解决正负样本不平衡",
        "速度-精度权衡：CTW1500 上 PAN-320 达 79.9% F-measure @ 84.2 FPS；PAN-640 达 83.7% F-measure @ 26.1 FPS"
      ],
      "detail": "<p><img alt=\"PAN 整体架构图\" src=\"https://arxiv.org/html/1908.05900v2/extracted/figures/pipeline.png\" />\n<em>图：PAN 整体流程——轻量骨干提取多尺度特征 → FPEM 级联增强 → FFM 融合 → 分割头预测文本区域/核/相似向量 → PA 聚合重建实例</em></p>\n<pre><code class=\"language-python\"># PAN 像素聚合 (Pixel Aggregation) 后处理伪代码\ndef pixel_aggregation(P_tex, P_ker, P_sim, threshold=0.5):\n    &quot;&quot;&quot;\n    P_tex: 文本区域分割图 (H, W)\n    P_ker: 收缩核分割图 (H, W)  \n    P_sim: 相似性向量图 (4, H, W)\n    &quot;&quot;&quot;\n    # Step 1: 在核分割图上找连通域作为初始实例\n    kernels = connected_components(P_ker &gt; threshold)\n\n    # Step 2: 计算每个核的相似性向量均值\n    for k in kernels:\n        k.center = mean(P_sim[:, k.mask])\n\n    # Step 3: 对文本区域中的非核像素，按相似性向量距离聚合到最近核\n    text_pixels = (P_tex &gt; threshold) &amp; (P_ker &lt;= threshold)\n    for pixel in text_pixels:  # BFS/queue-based\n        nearest_kernel = argmin(||P_sim[:, pixel] - k.center|| for k in neighbors)\n        if distance &lt; delta_agg:  # δ_agg = 0.5\n            assign pixel to nearest_kernel\n\n    # Step 4: 输出每个实例的像素集合作为检测结果\n    return [instance.pixels for instance in kernels]\n</code></pre>\n<p><strong>动机与背景</strong></p>\n<p>基于分割的文本检测方法（如 PSENet）虽然能处理任意形状文本，但面临两个瓶颈：(1) 特征提取网络（如 ResNet50 + FPN）计算量大，难以实时；(2) 后处理中的渐进式尺度扩展（Progressive Scale Expansion）耗时严重，成为速度瓶颈。PAN 的核心目标是同时解决这两个问题。</p>\n<p><strong>FPEM：轻量可级联的特征增强</strong></p>\n<p>FPEM 是一个 U 形模块，包含自底向上和自顶向下两条路径。每条路径在相邻尺度间使用 <strong>可分离卷积</strong>（depthwise separable convolution）进行特征融合：先对低分辨率特征上采样/下采样到目标尺度，再与目标尺度特征逐元素相加，最后通过 3×3 深度可分离卷积精炼。</p>\n<p>$$\n\\text{FPEM 单步}: F_{out} = \\text{DWSepConv}_{3\\times3}(F_{in} + \\text{Resize}(F_{adj}))\n$$</p>\n<p>关键设计：\n- 所有中间通道统一为 128，大幅减少参数\n- 可分离卷积使计算量降至标准卷积的 1/5\n- <strong>可级联特性</strong>：输入输出通道数相同，可堆叠 \\(n_c\\) 个 FPEM 持续增强特征，实验表明 \\(n_c=2\\) 即可获得显著提升</p>\n<div class=\"key-point\">💡 关键：FPEM 的级联设计使得即使使用轻量骨干（ResNet18），也能通过多次特征增强弥补表达能力不足。</div>\n<p><strong>FFM：多尺度特征融合</strong></p>\n<p>当使用 \\(n_c\\) 个级联 FPEM 时，每个尺度会产生 \\(n_c\\) 组特征图。FFM 的策略是：\n1. 对同一尺度的所有 FPEM 输出进行逐元素相加\n2. 将 4 个尺度的特征图统一上采样到最大分辨率（1/4 原图）\n3. 沿通道维度拼接，得到 \\(4 \\times 128 = 512\\) 通道的融合特征</p>\n<p>最终通过 1×1 卷积将 512 通道降维，分别预测：文本区域图 \\(P_{tex}\\)、核区域图 \\(P_{ker}\\)、相似性向量图 \\(P_{sim}\\)（4维）。</p>\n<p><strong>PA：可学习的像素聚合</strong></p>\n<p>PA 是 PAN 最核心的创新，用于替代 PSENet 中耗时的渐进式扩展。其思路是：</p>\n<ol>\n<li><strong>预测相似性向量</strong>：网络为每个像素预测一个 4 维向量，语义相同的像素应具有相近的向量</li>\n<li><strong>聚合损失</strong> \\(\\mathcal{L}_{agg}\\)：拉近同一文本实例内像素向量与该实例核心向量的距离</li>\n</ol>\n<p>$$\n\\mathcal{L}_{agg} = \\frac{1}{N}\\sum_{i=1}^{N}\\frac{1}{|T_i|}\\sum_{p \\in T_i} \\ln(D(p, K_i) + 1)\n$$</p>\n<p>其中 \\(D(p, K_i) = \\max(||F(p) - G(K_i)|| - \\delta_{agg}, 0)\\)，\\(\\delta_{agg}=0.5\\)</p>\n<ol>\n<li><strong>判别损失</strong> \\(\\mathcal{L}_{dis}\\)：推远不同实例核心之间的距离</li>\n</ol>\n<p>$$\n\\mathcal{L}_{dis} = \\frac{1}{N(N-1)}\\sum_{i=1}^{N}\\sum_{j=1,j\\neq i}^{N} \\ln(D'(K_i, K_j) + 1)\n$$</p>\n<p>其中 \\(D'(K_i, K_j) = \\max(\\delta_{dis} - ||G(K_i) - G(K_j)||, 0)\\)，\\(\\delta_{dis}=3\\)</p>\n<div class=\"warn-box\">⚠️ 注意：PA 的后处理只需一次 BFS 遍历即可完成实例重建，时间复杂度为 O(像素数)，远快于 PSENet 的多次膨胀操作。</div>\n<p><strong>与 PSENet 的关键区别</strong></p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方面</th>\n<th>PSENet</th>\n<th>PAN</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>骨干网络</td>\n<td>ResNet50 + FPN</td>\n<td>ResNet18 + FPEM×2</td>\n</tr>\n<tr>\n<td>后处理</td>\n<td>渐进式尺度扩展（多轮BFS）</td>\n<td>像素聚合（单轮BFS + 相似向量）</td>\n</tr>\n<tr>\n<td>后处理可学习</td>\n<td>否（纯规则）</td>\n<td>是（聚合/判别损失引导）</td>\n</tr>\n<tr>\n<td>CTW1500 速度</td>\n<td>3.9 FPS</td>\n<td>26.1 FPS（快 6.7×）</td>\n</tr>\n</tbody>\n</table></div>",
      "quiz": {
        "q": "PAN 中像素聚合（PA）模块的核心作用是什么？",
        "options": [
          "替代 NMS 进行候选框筛选",
          "通过相似性向量将文本像素聚合到对应的收缩核，重建完整文本实例",
          "对特征图进行多尺度融合增强",
          "生成文本区域的最小外接矩形"
        ],
        "answer": 1,
        "explain": "PA 利用网络预测的相似性向量，将文本区域像素按距离聚合到对应的收缩核实例上，从而快速重建完整文本区域，替代了 PSENet 中耗时的渐进式扩展。"
      }
    },
    {
      "id": "dbnet",
      "num": 6,
      "name": "DBNet",
      "fullName": "可微二值化网络 (Differentiable Binarization Network)",
      "year": "2020",
      "org": "Huazhong University of Science and Technology",
      "parent": "psenet",
      "paperUrl": "https://arxiv.org/abs/1911.08947",
      "projectUrl": "",
      "category": "detection",
      "motivation": "可微二值化平衡速度精度",
      "summary": "DBNet 提出可微分二值化（Differentiable Binarization, DB）模块，将二值化操作嵌入分割网络进行端到端联合优化，使阈值自适应预测，在大幅简化后处理的同时实现了速度与精度的最优平衡。",
      "keyPoints": [
        "提出 <strong>Differentiable Binarization (DB)</strong> 模块：用近似阶跃函数替代标准不可微二值化，使二值化过程可端到端训练",
        "网络同时输出<strong>概率图 P</strong> 和<strong>阈值图 T</strong>，自适应为图像每个位置预测最优阈值",
        "DB 模块在推理阶段可移除（仅用固定阈值的概率图即可），<strong>不引入额外计算/内存开销</strong>",
        "采用 FPN 结构的轻量级分割网络（ResNet-18/50 + 特征金字塔），结合可变形卷积增强感受野",
        "标签生成使用 Vatti clipping 算法按固定比例收缩/扩张多边形",
        "后处理极度简化：仅需固定阈值 + 连通域 + 反收缩，无需像素聚类等复杂操作",
        "在 5 个基准数据集（MSRA-TD500、CTW1500、Total-Text、ICDAR2015、MLT-2017）上取得 SOTA 或接近 SOTA 性能，速度显著优于同期方法"
      ],
      "detail": "<h5>核心架构图</h5>\n<p><img alt=\"DBNet 网络架构\" src=\"https://ar5iv.labs.arxiv.org/html/1911.08947/assets/x3.png\" />\n<em>图：DBNet 网络架构。输入图像经 FPN 提取多尺度特征后，分别预测概率图 P 和阈值图 T，通过 DB 模块生成近似二值图 \\(\\hat{B}\\)。</em></p>\n<p><img alt=\"传统流程 vs DB 流程\" src=\"https://ar5iv.labs.arxiv.org/html/1911.08947/assets/x2.png\" />\n<em>图：传统分割检测流程（蓝色）使用固定阈值 + 复杂后处理；DB 流程（红色）将二值化嵌入网络联合优化，自适应阈值使后处理大幅简化。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># DBNet 训练与推理核心逻辑\n# ===== 训练阶段 =====\ndef train_forward(image, gt_polygons):\n    # 1. 特征提取 (FPN)\n    features = FPN(ResNet(image))  # 多尺度融合特征 F\n\n    # 2. 预测概率图和阈值图\n    P = sigmoid(conv_prob(features))      # 概率图, shape: H×W\n    T = sigmoid(conv_thresh(features))    # 阈值图, shape: H×W\n\n    # 3. 可微二值化 (DB)\n    k = 50  # 放大因子\n    B_hat = 1.0 / (1.0 + exp(-k * (P - T)))  # 近似二值图\n\n    # 4. 计算损失\n    L_s = BCE_OHEM(P, gt_prob_map)           # 概率图监督\n    L_b = BCE_OHEM(B_hat, gt_prob_map)       # 二值图监督\n    L_t = L1(T[dilated_mask], gt_thresh_map) # 阈值图监督\n    Loss = L_s + 1.0 * L_b + 10.0 * L_t\n    return Loss\n\n# ===== 推理阶段 (DB 模块可移除) =====\ndef inference(image):\n    features = FPN(ResNet(image))\n    P = sigmoid(conv_prob(features))\n    binary_map = (P &gt; 0.3)  # 固定阈值即可\n    # 简单后处理: 连通域 → 最小外接框 → 反收缩\n    boxes = post_process(binary_map, shrink_ratio=1.5)\n    return boxes\n</code></pre>\n<h5>方法详解</h5>\n<p><strong>1. 动机与背景</strong></p>\n<p>基于分割的文本检测方法能处理任意形状文本，但面临一个核心瓶颈：<strong>后处理复杂且耗时</strong>。传统流程需要固定阈值将概率图转为二值图，再通过像素聚类（如 PSENet 的渐进式尺度扩展、Pixel Embedding 的特征距离聚类）将像素分组为文本实例。这些后处理步骤占据了大量推理时间。</p>\n<p>DBNet 的核心思想是：<strong>将二值化操作本身变为可学习的</strong>，让网络自适应地为每个像素位置预测最优阈值，从而使二值化结果更加鲁棒，后处理可以极度简化。</p>\n<p><strong>2. 可微分二值化 (DB) 模块</strong></p>\n<p>标准二值化是阶跃函数，不可微：</p>\n<p>$$B_{i,j} = \\begin{cases} 1 & \\text{if } P_{i,j} \\geq T_{i,j} \\\\ 0 & \\text{otherwise} \\end{cases}$$</p>\n<p>DBNet 用近似函数替代：</p>\n<p>$$\\hat{B}_{i,j} = \\frac{1}{1 + e^{-k(P_{i,j} - T_{i,j})}}$$</p>\n<p>其中 \\(k\\) 为放大因子（实验中取 50）。当 \\(k\\) 足够大时，该函数逼近阶跃函数，但处处可微。</p>\n<div class=\"key-point\">💡 关键：DB 的梯度对 \\(P\\) 和 \\(T\\) 的偏导数中都包含放大因子 \\(k\\)，这使得梯度在边界区域（\\(P \\approx T\\)）被显著放大，促使网络更精准地学习前景/背景边界。</div>\n<p><img alt=\"DB 函数可视化\" src=\"https://ar5iv.labs.arxiv.org/html/1911.08947/assets/x4.png\" />\n<em>图：DB 函数示意。蓝色为标准二值化（不可微），红色为 DB 近似（可微），通过放大因子 k 控制逼近程度。</em></p>\n<p><strong>3. 自适应阈值图</strong></p>\n<p>与传统方法使用全局固定阈值不同，DBNet 的阈值图 \\(T\\) 是逐像素预测的。网络学习到的阈值图类似文本区域的\"边界图\"——在文本边缘处阈值较高，在文本中心和背景处阈值较低。这种自适应机制使得：\n- 文本边界更加清晰锐利\n- 对不同对比度、光照条件的文本具有更强鲁棒性</p>\n<p><strong>4. 标签生成</strong></p>\n<p><img alt=\"标签生成过程\" src=\"https://ar5iv.labs.arxiv.org/html/1911.08947/assets/x5.png\" />\n<em>图：标签生成。对原始多边形使用 Vatti clipping 按比例收缩得到概率图标签 \\(G_s\\)，扩张得到阈值图监督区域 \\(G_d\\)。</em></p>\n<ul>\n<li><strong>概率图标签</strong>：使用 Vatti clipping 算法将文本多边形按收缩比 \\(r=0.4\\) 向内收缩，收缩距离 \\(D = A(1-r^2)/L\\)（A 为面积，L 为周长）</li>\n<li><strong>阈值图标签</strong>：在收缩区域与扩张区域之间的环形带内，计算每个像素到最近文本边界的归一化距离</li>\n</ul>\n<p><strong>5. 损失函数</strong></p>\n<p>$$L = L_s + \\alpha \\cdot L_b + \\beta \\cdot L_t$$</p>\n<p>其中 \\(\\alpha = 1.0\\)，\\(\\beta = 10\\)：\n- \\(L_s\\)：概率图的 BCE 损失，使用 OHEM（正负样本比 1:3）\n- \\(L_b\\)：近似二值图的 BCE 损失，同样使用 OHEM\n- \\(L_t\\)：阈值图的 L1 损失，仅在扩张区域内计算</p>\n<div class=\"warn-box\">⚠️ 注意：推理时仅使用概率图 P 加固定阈值（0.3），DB 模块和阈值图分支可完全移除，因此不增加任何推理开销。DB 的作用体现在训练阶段对概率图预测质量的提升。</div>\n<p><strong>6. 网络结构细节</strong></p>\n<ul>\n<li>Backbone：ResNet-18（轻量）或 ResNet-50，在 stage 3-5 使用可变形卷积</li>\n<li>Neck：FPN 结构，将 4 个尺度的特征上采样到 1/4 分辨率后拼接</li>\n<li>Head：两个并行分支（概率图 + 阈值图），各含 3×3 卷积 + BN + ReLU + 转置卷积上采样</li>\n</ul>\n<p><strong>7. 与传统方法的对比优势</strong></p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>传统分割方法</th>\n<th>DBNet</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>阈值</td>\n<td>全局固定</td>\n<td>逐像素自适应预测</td>\n</tr>\n<tr>\n<td>后处理</td>\n<td>像素聚类/渐进扩展</td>\n<td>仅连通域 + 反收缩</td>\n</tr>\n<tr>\n<td>二值化</td>\n<td>不参与训练</td>\n<td>端到端联合优化</td>\n</tr>\n<tr>\n<td>推理额外开销</td>\n<td>后处理耗时</td>\n<td>DB 可移除，零开销</td>\n</tr>\n<tr>\n<td>ResNet-18 性能</td>\n<td>较差</td>\n<td>显著提升（+3.7% F on TD500）</td>\n</tr>\n</tbody>\n</table></div>\n<p><img alt=\"速度-精度对比\" src=\"https://ar5iv.labs.arxiv.org/html/1911.08947/assets/x1.png\" />\n<em>图：在 MSRA-TD500 数据集上，DBNet 在速度和精度两方面均优于同期方法，实现最佳平衡。</em></p>",
      "quiz": {
        "q": "DBNet 中可微二值化 (DB) 模块在推理阶段的作用是什么？",
        "options": [
          "替代固定阈值进行自适应二值化，提升推理精度",
          "可以完全移除，不参与推理，其作用体现在训练阶段对概率图质量的提升",
          "作为后处理模块加速像素聚类过程",
          "生成阈值图用于多尺度文本检测"
        ],
        "answer": 1,
        "explain": "DB 模块在训练时通过梯度放大效应提升概率图的边界预测质量，但推理时仅用概率图加固定阈值即可，DB 分支可完全移除，不引入额外计算开销。"
      }
    },
    {
      "id": "dptext_detr",
      "num": 7,
      "name": "DPText-DETR",
      "fullName": "动态点文本检测Transformer (Dynamic Points Text Detection Transformer)",
      "year": "2023",
      "org": "Alibaba Group",
      "parent": "dbnet",
      "paperUrl": "https://arxiv.org/abs/2207.04491",
      "projectUrl": "",
      "category": "detection",
      "motivation": "动态点查询建模任意形状",
      "summary": "DPText-DETR 提出**显式点查询建模（EPQM）**，将文本边界控制点坐标直接作为位置查询并逐层动态更新，配合**增强因子化自注意力（EFSA）**和**位置标签形式**，解决了基于 DETR 的文本检测器中粗粒度位置查询建模和阅读顺序依赖标签导致的训练效率低、鲁棒性差的问题，在多个任意形状文本检测基准上取得 SOTA。",
      "keyPoints": [
        "<strong>显式点查询建模（EPQM）</strong>：在锚框上下边界均匀采样 \\(N/2\\) 个点作为显式位置查询，逐解码层动态更新坐标，替代传统 DETR 的粗粒度框级位置查询",
        "<strong>增强因子化自注意力（EFSA）</strong>：在分组自注意力中引入循环卷积，为同一实例内的点查询提供环形形状先验，增强空间归纳偏置",
        "<strong>位置标签形式（Positional Label Form）</strong>：以左上角点为起点按顺时针排列控制点，消除对文本阅读方向的依赖，大幅提升旋转/反转文本的检测鲁棒性",
        "<strong>Inverse-Text 测试集</strong>：建立包含 500 张图像（约 40% 反向文本实例）的测试基准，用于评估检测器在真实场景中的鲁棒性",
        "<strong>SOTA 性能</strong>：Total-Text F=89.0%、CTW1500 F=88.8%、ICDAR19 ArT F=78.1%，且训练收敛速度提升约 6 倍"
      ],
      "detail": "<p><img alt=\"DPText-DETR 整体架构\" src=\"https://raw.githubusercontent.com/ymy-k/DPText-DETR/main/figs/dptext_detr.jpg\" />\n<em>图：DPText-DETR 整体架构。CNN 骨干网络提取多尺度特征后，经 Transformer 编码器增强，解码器中通过 EPQM 生成显式点查询并逐层动态更新，EFSA 提供环形形状引导，最终输出多边形控制点坐标。</em></p>\n<pre><code class=\"language-python\"># DPText-DETR 核心流程伪代码\n# ========== 1. 特征提取 ==========\nmulti_scale_feats = CNN_Backbone(image)          # ResNet-50 提取多尺度特征\nmemory = DeformableEncoder(multi_scale_feats)     # 6 层可变形注意力编码器\n\n# ========== 2. 初始查询生成 (EPQM) ==========\n# 从编码器输出中选取 Top-K 个候选锚框\nanchor_boxes = TopK_Select(memory, K=100)         # [K, 4] (cx, cy, w, h)\n\nfor k in range(K):\n    cx, cy, w, h = anchor_boxes[k]\n    # 在锚框上边界均匀采样 N/2 个点，下边界均匀采样 N/2 个点\n    top_points = [(cx - w/2 + i*w/(N/2-1), cy - h/2) for i in range(N//2)]\n    bot_points = [(cx + w/2 - i*w/(N/2-1), cy + h/2) for i in range(N//2)]\n    point_queries[k] = top_points + bot_points    # [N, 2] 顺时针排列\n\n# 位置查询 = 点坐标的正弦位置编码\npos_queries = SinusoidalPE(point_queries)         # [K, N, d]\n# 内容查询 = 锚框中心点对应的编码器特征\ncontent_queries = memory[anchor_centers]          # [K, d]\n\n# ========== 3. 解码器逐层动态更新 ==========\nfor layer in DecoderLayers:  # 6 层\n    # 3a. 交叉注意力：每个点独立地在多尺度特征图上采样\n    content = DeformableCrossAttn(content_queries, pos_queries, memory)\n\n    # 3b. EFSA：实例内点查询的自注意力 + 循环卷积\n    content = EFSA(content, pos_queries)\n\n    # 3c. 预测偏移量并更新点坐标 (动态更新)\n    delta = MLP(content)                          # [K, N, 2]\n    point_queries = sigmoid(inverse_sigmoid(point_queries) + delta)\n    pos_queries = SinusoidalPE(point_queries)     # 更新位置编码\n\n# ========== 4. 输出 ==========\npolygons = point_queries                          # [K, N, 2] 最终多边形控制点\nscores = ClassificationHead(content)              # [K, 1] 置信度\n</code></pre>\n<p><strong>动机与背景</strong></p>\n<p>现有基于 DETR 的文本检测方法（如 TESTR）存在两个关键问题：</p>\n<ol>\n<li>\n<p><strong>粗粒度位置查询</strong>：传统方法使用锚框（4 维）或锚点（2 维）生成位置查询，但文本检测需要输出 \\(N\\) 个多边形控制点（\\(2N\\) 维）。这种维度不匹配导致位置查询无法精确引导每个控制点的注意力区域，训练收敛慢。</p>\n</li>\n<li>\n<p><strong>阅读顺序依赖的标签形式</strong>：以往方法按文本阅读方向（如从左到右）排列控制点标签。当文本旋转或反转时，同一文字的控制点排列顺序会发生剧变，导致模型预测不稳定。</p>\n</li>\n</ol>\n<div class=\"key-point\">💡 关键：DPText-DETR 的核心洞察是——<strong>位置查询的粒度应与输出粒度匹配</strong>。既然输出是 \\(N\\) 个点，位置查询也应该是 \\(N\\) 个显式点坐标，而非一个粗粒度的框。</div>\n<p><strong>核心机制一：显式点查询建模（EPQM）</strong></p>\n<p>EPQM 将位置查询从\"框级\"提升到\"点级\"。具体而言：</p>\n<ol>\n<li><strong>初始化</strong>：从编码器选出 Top-K 个候选锚框后，在每个锚框的上下边界各均匀采样 \\(N/2\\) 个点，按顺时针方向排列为 \\(N\\) 个初始控制点：</li>\n</ol>\n<p>$$\\mathbf{p}_i^{(0)} = \\text{SampleOnBorder}(\\text{anchor}_k), \\quad i = 1, \\ldots, N$$</p>\n<ol>\n<li><strong>动态更新</strong>：每个解码层预测一个偏移量 \\(\\Delta \\mathbf{p}_i^{(l)}\\)，通过逆 sigmoid 空间的残差连接更新点坐标：</li>\n</ol>\n<p>$$\\mathbf{p}_i^{(l+1)} = \\sigma\\!\\left(\\sigma^{-1}(\\mathbf{p}_i^{(l)}) + \\Delta \\mathbf{p}_i^{(l)}\\right)$$</p>\n<ol>\n<li><strong>独立交叉注意力</strong>：每个点作为独立查询参与可变形交叉注意力，直接在其当前坐标附近的特征图区域采样，实现精确的局部特征聚合。</li>\n</ol>\n<div class=\"warn-box\">⚠️ 注意：EPQM 不仅提升了最终性能，更显著加速了训练收敛（约 6 倍），并大幅增强了小样本学习能力——在仅 25% 训练数据时，EPQM 带来 +48.45% 的 F-measure 提升。</div>\n<p><strong>核心机制二：增强因子化自注意力（EFSA）</strong></p>\n<p>标准 Transformer 的全局自注意力缺乏空间归纳偏置，对于多边形控制点这种具有明确环形拓扑结构的输出不够高效。EFSA 的设计思路：</p>\n<ol>\n<li>\n<p><strong>因子化自注意力（FSA）</strong>：将 \\(K \\times N\\) 个查询分为两组——实例内自注意力（同一文本的 \\(N\\) 个点之间）和实例间自注意力（不同文本之间），降低计算复杂度。</p>\n</li>\n<li>\n<p><strong>循环卷积增强</strong>：在实例内自注意力中，将 \\(N\\) 个点视为环形序列，施加 1D 循环卷积（kernel size=3），为相邻控制点注入局部形状约束：</p>\n</li>\n</ol>\n<p>$$\\text{EFSA}(\\mathbf{Q}) = \\text{SelfAttn}(\\mathbf{Q}) + \\text{CircularConv1D}(\\mathbf{Q})$$</p>\n<p>循环卷积使首尾点（如第 1 个点和第 \\(N\\) 个点）也能直接交互，符合多边形闭合的几何先验。</p>\n<div class=\"key-point\">💡 关键：EFSA 中的循环卷积仅适用于多边形控制点版本。对于 Bézier 曲线控制点，由于控制点不一定形成环形且可能相距较远，循环卷积反而不适用。</div>\n<p><strong>核心机制三：位置标签形式（Positional Label Form）</strong></p>\n<p>传统标签按阅读方向排列控制点（如从左到右），当文本旋转 180° 时，起始点会从左上跳到右下，导致标签不连续。位置标签形式的改进：</p>\n<ul>\n<li><strong>规则</strong>：始终以<strong>左上角点</strong>（y 坐标最小的点中 x 最小者）为起点，按<strong>顺时针方向</strong>排列所有控制点</li>\n<li><strong>效果</strong>：无论文本朝向如何，同一文本实例的控制点排列顺序保持一致，消除了阅读方向的歧义</li>\n</ul>\n<p>消融实验验证：位置标签形式在 Rot.Total-Text 上提升 +3.90% F-measure，在 Inverse-Text 上提升 +3.07%，证明其对鲁棒性的显著贡献。</p>\n<p><strong>主要实验结果</strong></p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>基准</th>\n<th>Precision</th>\n<th>Recall</th>\n<th>F-measure</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Total-Text</td>\n<td>91.8</td>\n<td>86.4</td>\n<td><strong>89.0</strong></td>\n</tr>\n<tr>\n<td>CTW1500</td>\n<td>91.7</td>\n<td>86.2</td>\n<td><strong>88.8</strong></td>\n</tr>\n<tr>\n<td>ICDAR19 ArT</td>\n<td>83.0</td>\n<td>73.7</td>\n<td><strong>78.1</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p>DPText-DETR 在三个基准上均取得 SOTA，分别超越此前最优方法 TextBPN++ 达 +0.5%、+3.3%、+2.3%。</p>\n<p><strong>与传统方法的区别</strong></p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th>传统 DETR 文本检测 (如 TESTR)</th>\n<th>DPText-DETR</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>位置查询粒度</td>\n<td>框级 (4D) 或点级 (2D)</td>\n<td>显式 N 点级 (2N D)</td>\n</tr>\n<tr>\n<td>查询更新</td>\n<td>框坐标更新</td>\n<td>逐点坐标动态更新</td>\n</tr>\n<tr>\n<td>自注意力</td>\n<td>全局或简单分组</td>\n<td>EFSA（分组 + 循环卷积）</td>\n</tr>\n<tr>\n<td>标签形式</td>\n<td>阅读顺序依赖</td>\n<td>位置顺序（顺时针，与阅读方向无关）</td>\n</tr>\n<tr>\n<td>训练收敛</td>\n<td>较慢</td>\n<td>约 6 倍加速</td>\n</tr>\n</tbody>\n</table></div>",
      "quiz": {
        "q": "DPText-DETR 中 EPQM 模块的初始控制点是如何生成的？",
        "options": [
          "随机初始化 N 个点坐标作为可学习参数",
          "在候选锚框的上下边界各均匀采样 N/2 个点，按顺时针排列",
          "使用预训练的关键点检测网络预测 N 个初始位置",
          "直接将锚框的四个角点复制扩展为 N 个点"
        ],
        "answer": 1,
        "explain": "EPQM 在 Top-K 锚框的上边界和下边界各均匀采样 N/2 个点，按顺时针方向排列为 N 个初始控制点，从而将位置查询的粒度从框级提升到点级。"
      }
    },
    {
      "id": "srformer",
      "num": 8,
      "name": "SRFormer",
      "fullName": "分割回归融合检测器 (Segmentation and Regression Transformer)",
      "year": "2024",
      "org": "ByteDance Inc.",
      "parent": "dptext_detr",
      "paperUrl": "https://arxiv.org/abs/2308.10531",
      "projectUrl": "",
      "category": "detection",
      "motivation": "统一分割与回归刷新SOTA",
      "summary": "SRFormer 在 DETR 框架的 Decoder 中**同时引入分割分支与回归分支**，利用预测的实例掩码为控制点回归提供锚点先验，并通过 Mask-guided Query Enhancement (MQE) 模块以掩码为软注意力权重增强查询特征，在 Total-Text、CTW1500、ICDAR19-ArT 三大任意形状文本检测基准上均取得 SOTA。",
      "keyPoints": [
        "<strong>统一 Decoder 架构</strong>：将 6 层 Decoder 分为前 N 层 Segmentation &amp; Regression Chunk（同时输出掩码与控制点）和后续 Regression-only Chunk（仅精细化控制点），兼顾分割的全局感知与回归的逐层精炼",
        "<strong>掩码作为回归先验</strong>：利用预测掩码的概率加权计算实例重心作为锚点（anchor point），控制点以该锚点为基准回归偏移量，提供强位置先验",
        "<strong>Mask-guided Query Enhancement (MQE)</strong>：将实例掩码与语义掩码分别作为软 ROI 权重，对像素特征做加权池化后注入查询嵌入，等效于以掩码为位置编码的交叉注意力机制",
        "<strong>高效收敛</strong>：分割分支引入的像素级监督使模型在训练早期即获得良好定位能力，收敛速度显著优于纯回归方法 DPText-DETR",
        "<strong>SOTA 性能</strong>：Total-Text F1=90.0%、CTW1500 F1=89.5%、ICDAR19-ArT F1=79.3%，分别超越前 SOTA DPText +1.3/+0.7/+1.2 个百分点"
      ],
      "detail": "<h5>整体架构</h5>\n<p><img alt=\"SRFormer 整体架构\" src=\"https://arxiv.org/html/2308.10531v2/x1.png\" />\n<em>图 1：SRFormer 整体架构。Decoder 前几层为 Segmentation &amp; Regression Chunk（同时预测掩码与控制点），后续层为 Regression-only Chunk（仅精炼控制点）。MQE 模块利用掩码预测增强查询特征。</em></p>\n<p>SRFormer 沿用 DETR 的 Encoder-Decoder 范式：\n1. <strong>Backbone + Encoder</strong>：ResNet-50 提取多尺度特征，经 Deformable Transformer Encoder（8 头、4 采样点）更新得到像素级特征图 \\(\\mathbf{F}\\)。\n2. <strong>Query 初始化</strong>：从 Encoder 输出中选取分类得分 Top-K 的 proposal 作为位置查询（正弦位置编码），配合可学习的内容查询，共 100 个 query。\n3. <strong>Decoder</strong>：总共 6 层，分为两种 Chunk：\n   - <strong>Seg &amp; Reg Chunk</strong>（前 \\(N\\) 层）：每层同时输出实例掩码、语义掩码和控制点坐标，并通过 MQE 模块将掩码信息反馈到查询嵌入。\n   - <strong>Reg-only Chunk</strong>（后 \\(6-N\\) 层）：仅进行控制点坐标的逐层精炼，不再预测掩码。</p>\n<div class=\"key-point\">💡 <strong>关键直觉</strong>：分割任务提供像素级密集监督，帮助模型在训练早期快速建立\"哪里有文字\"的全局感知；回归任务则在此基础上逐层精细化多边形边界。两者在 Decoder 中的有机融合，既避免了纯分割方法复杂后处理的问题，又克服了纯回归方法收敛慢、对位置先验敏感的缺陷。</div>\n<h5>掩码预测与锚点生成</h5>\n<p><img alt=\"掩码预测头\" src=\"https://arxiv.org/html/2308.10531v2/x3.png\" />\n<em>图 2：掩码预测头。实例掩码通过 query 嵌入与像素特征的点积生成；语义掩码通过共享 1×1 卷积生成。</em></p>\n<p>在 Seg &amp; Reg Chunk 的每一层中，掩码预测包含两个分支：</p>\n<p><strong>实例掩码（Instance Mask）</strong>：</p>\n<p>$$\\mathbf{M}_{\\text{ins}}^{(i)} = \\sigma\\!\\bigl(\\text{MLP}(\\mathbf{q}_i) \\cdot \\mathbf{F}^T\\bigr) \\in [0,1]^{H \\times W}$$</p>\n<p>其中 \\(\\mathbf{q}_i\\) 是第 \\(i\\) 个 query 的嵌入，\\(\\mathbf{F}\\) 是像素特征图，\\(\\sigma\\) 为 Sigmoid。每个 query 生成一张独立的实例掩码，表示该 query 对应文本实例的空间范围。</p>\n<p><strong>语义掩码（Semantic Mask）</strong>：</p>\n<p>$$\\mathbf{M}_{\\text{sem}} = \\sigma\\!\\bigl(\\text{Conv}_{1\\times1}(\\mathbf{F})\\bigr) \\in [0,1]^{H \\times W}$$</p>\n<p>所有 query 共享同一张语义掩码，提供全局的文本/非文本二值先验。</p>\n<p><strong>锚点生成</strong>：利用实例掩码的概率分布计算加权重心作为锚点：</p>\n<p>$$\\mathbf{a}_i = \\frac{\\sum_{(x,y)} \\mathbf{M}_{\\text{ins}}^{(i)}(x,y) \\cdot (x, y)}{\\sum_{(x,y)} \\mathbf{M}_{\\text{ins}}^{(i)}(x,y)}$$</p>\n<p>控制点坐标以该锚点为基准进行偏移回归：\\(\\mathbf{p}_k = \\mathbf{a}_i + \\Delta\\mathbf{p}_k\\)，其中 \\(\\Delta\\mathbf{p}_k\\) 由 MLP 从 query 嵌入预测。</p>\n<div class=\"key-point\">💡 <strong>为什么用掩码重心做锚点？</strong> 传统 DETR 检测中，参考点来自 Encoder proposal，在训练初期可能偏离真实目标中心。掩码重心直接由像素级预测驱动，即使在训练早期也能提供相对准确的位置先验，加速控制点回归的收敛。</div>\n<h5>Mask-guided Query Enhancement (MQE)</h5>\n<p><img alt=\"MQE 模块\" src=\"https://arxiv.org/html/2308.10531v2/x4.png\" />\n<em>图 3：MQE 模块。利用实例掩码和语义掩码分别对像素特征做加权池化，增强 query 嵌入。</em></p>\n<p>MQE 是 SRFormer 的另一核心创新，其目标是将掩码中蕴含的空间信息反馈到 query 嵌入中，使每个 query 能\"看到\"其对应文本区域的丰富像素特征。</p>\n<p><strong>实例分支</strong>：</p>\n<p>$$\\mathbf{e}_{\\text{ins}}^{(i)} = \\text{Linear}\\!\\left(\\frac{\\sum_{(x,y)} \\mathbf{M}_{\\text{ins}}^{(i)}(x,y) \\cdot \\mathbf{F}(x,y)}{\\sum_{(x,y)} \\mathbf{M}_{\\text{ins}}^{(i)}(x,y) + \\epsilon}\\right)$$</p>\n<p>以实例掩码为权重对像素特征做加权平均池化，每个 query 获得独立的区域特征。</p>\n<p><strong>语义分支</strong>：</p>\n<p>$$\\mathbf{e}_{\\text{sem}} = \\text{Linear}\\!\\left(\\frac{\\sum_{(x,y)} \\mathbf{M}_{\\text{sem}}(x,y) \\cdot \\mathbf{F}(x,y)}{\\sum_{(x,y)} \\mathbf{M}_{\\text{sem}}(x,y) + \\epsilon}\\right)$$</p>\n<p>以语义掩码为权重做全局加权池化，所有 query 共享该特征。</p>\n<p><strong>融合</strong>：</p>\n<p>$$\\mathbf{q}_i \\leftarrow \\mathbf{q}_i + \\mathbf{e}_{\\text{ins}}^{(i)} + \\mathbf{e}_{\\text{sem}}$$</p>\n<div class=\"key-point\">💡 <strong>MQE 的本质</strong>：可以将 MQE 理解为一种<strong>以掩码为注意力权重的交叉注意力</strong>。标准交叉注意力中，注意力权重由 query-key 点积产生；MQE 中，注意力权重直接由掩码预测给出，绕过了点积计算，同时引入了显式的空间归纳偏置。实验表明 MQE 单独带来 +1.2% F1 提升，引入参数不到 3M。</div>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># SRFormer Decoder 前向传播伪代码\ndef decoder_forward(queries, pixel_features, N_seg=3, N_total=6):\n    for layer_idx in range(N_total):\n        # 标准 Deformable Cross-Attention + Self-Attention\n        queries = deformable_cross_attn(queries, pixel_features)\n        queries = self_attn(queries)\n\n        if layer_idx &lt; N_seg:  # Seg &amp; Reg Chunk\n            # 1. 掩码预测\n            inst_mask = sigmoid(mlp(queries) @ pixel_features.T)  # [N_q, H, W]\n            sem_mask  = sigmoid(conv1x1(pixel_features))          # [H, W]\n\n            # 2. MQE: 掩码引导的 query 增强\n            inst_feat = mask_weighted_pool(inst_mask, pixel_features)  # [N_q, C]\n            sem_feat  = mask_weighted_pool(sem_mask, pixel_features)   # [C]\n            queries   = queries + linear(inst_feat) + linear(sem_feat)\n\n            # 3. 锚点生成 + 控制点回归\n            anchor = mask_weighted_centroid(inst_mask)       # [N_q, 2]\n            offsets = mlp_reg(queries)                       # [N_q, 2K]\n            ctrl_pts = anchor.unsqueeze(1) + offsets.view(N_q, K, 2)\n        else:  # Regression-only Chunk\n            # 仅精炼控制点\n            offsets = mlp_reg(queries)\n            ctrl_pts = prev_ctrl_pts + offsets.view(N_q, K, 2)\n\n        # 分类预测\n        cls_score = cls_head(queries)\n\n    return cls_score, ctrl_pts, inst_mask, sem_mask\n</code></pre>\n<h5>损失函数与训练</h5>\n<p><strong>匈牙利匹配</strong>：采用与 DETR 相同的二部图匹配，匹配代价为分类代价、掩码代价和回归代价的加权和：</p>\n<p>$$\\mathcal{C} = \\lambda_{\\text{cls}} \\mathcal{L}_{\\text{cls}} + \\lambda_{\\text{mask}} \\mathcal{L}_{\\text{mask}} + \\lambda_{\\text{reg}} \\mathcal{L}_{\\text{reg}}$$</p>\n<p><strong>总损失</strong>：</p>\n<p>$$\\mathcal{L} = \\lambda_{\\text{cls}} \\mathcal{L}_{\\text{focal}} + \\lambda_{\\text{mask}} (\\mathcal{L}_{\\text{dice}} + \\mathcal{L}_{\\text{bce}}) + \\lambda_{\\text{reg}} \\mathcal{L}_{1}$$</p>\n<p>其中 \\(\\lambda_{\\text{cls}}=2\\)，\\(\\lambda_{\\text{mask}}=\\lambda_{\\text{reg}}=5\\)。掩码损失同时包含 Dice Loss 和 BCE Loss，分别作用于实例掩码和语义掩码。</p>\n<p><strong>训练细节</strong>：\n- Backbone：ResNet-50，Encoder 8 头 4 采样点\n- Query 数量：100，控制点数量 \\(K=16\\)\n- 预训练：SynthText150K + MLT17 + TotalText，300K 迭代\n- 微调：TotalText 30K 迭代（lr=1e-4→1e-5），CTW1500 30K 迭代（lr=5e-5）\n- 优化器：AdamW（\\(\\beta_1=0.9, \\beta_2=0.999\\)，weight decay=1e-4）\n- 数据增强：随机裁剪、模糊、亮度调整、颜色变换\n- 多尺度训练：短边 480~896，长边≤1600；推理短边 1000，长边≤1800\n- 硬件：8× NVIDIA 3090</p>\n<h5>与传统方法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th>纯分割方法（DBNet/FCENet）</th>\n<th>纯回归方法（DPText-DETR）</th>\n<th>SRFormer</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>检测范式</td>\n<td>像素级分割 → 后处理提取轮廓</td>\n<td>DETR query 直接回归控制点</td>\n<td>Decoder 内分割+回归联合</td>\n</tr>\n<tr>\n<td>后处理复杂度</td>\n<td>高（阈值化、连通域、多边形拟合）</td>\n<td>低（直接输出多边形）</td>\n<td>低（直接输出多边形）</td>\n</tr>\n<tr>\n<td>训练收敛</td>\n<td>快（密集像素监督）</td>\n<td>慢（稀疏点监督）</td>\n<td>快（掩码提供密集监督）</td>\n</tr>\n<tr>\n<td>位置先验</td>\n<td>隐式（像素分类）</td>\n<td>Encoder proposal</td>\n<td>掩码重心锚点</td>\n</tr>\n<tr>\n<td>低数据场景</td>\n<td>—</td>\n<td>10% 数据 F1=75.6</td>\n<td>10% 数据 F1=76.9</td>\n</tr>\n</tbody>\n</table></div>\n<h5>消融实验关键发现</h5>\n<p><strong>Decoder 层分配</strong>（Table 2，TotalText 无预训练 50K 迭代）：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>Seg 层数</th>\n<th>Reg 层数</th>\n<th>Precision</th>\n<th>Recall</th>\n<th>F1</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>1</td>\n<td>5</td>\n<td>88.6</td>\n<td>84.5</td>\n<td>86.5</td>\n</tr>\n<tr>\n<td>2</td>\n<td>4</td>\n<td>89.0</td>\n<td>85.1</td>\n<td>87.0</td>\n</tr>\n<tr>\n<td><strong>3</strong></td>\n<td><strong>3</strong></td>\n<td><strong>88.0</strong></td>\n<td><strong>86.1</strong></td>\n<td><strong>87.1</strong></td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"warn-box\">⚠️ 注意：增加分割层数提升 Recall 但降低 Precision，因为减少了回归精炼层数。实验发现 Decoder 第一层即可获得较好的分割结果，后续层难以进一步改善掩码质量，因此 3+3 为最优平衡。</div>\n<p><strong>组件消融</strong>（Table 3）：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>AnchorReg</th>\n<th>MQE</th>\n<th>F1</th>\n<th>提升</th>\n<th>额外参数</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>✗</td>\n<td>✗</td>\n<td>85.5</td>\n<td>—</td>\n<td>—</td>\n</tr>\n<tr>\n<td>✓</td>\n<td>✗</td>\n<td>86.0</td>\n<td>+0.5</td>\n<td>0.39M</td>\n</tr>\n<tr>\n<td>✗</td>\n<td>✓</td>\n<td>86.7</td>\n<td>+1.2</td>\n<td>2.95M</td>\n</tr>\n<tr>\n<td>✓</td>\n<td>✓</td>\n<td><strong>87.1</strong></td>\n<td><strong>+1.6</strong></td>\n<td>3.34M</td>\n</tr>\n</tbody>\n</table></div>\n<h5>训练收敛与可视化</h5>\n<p><img alt=\"训练收敛曲线\" src=\"https://arxiv.org/html/2308.10531v2/x5.png\" />\n<em>图 4：SRFormer 与 DPText-DETR 在 TotalText 和 Rot.TotalText 上的收敛曲线。SRFormer 在 5K 迭代后即持续领先，即使 DPText 训练时间翻倍仍不及 SRFormer。</em></p>\n<p><img alt=\"检测可视化\" src=\"https://arxiv.org/html/2308.10531v2/x6.png\" />\n<em>图 5：SRFormer 在各数据集上的检测可视化结果。</em></p>",
      "quiz": {
        "q": "SRFormer 中 Mask-guided Query Enhancement (MQE) 模块的核心作用是什么？",
        "options": [
          "替代 Decoder 中的自注意力机制以减少计算量",
          "利用预测掩码作为软注意力权重，对像素特征做加权池化以增强 query 嵌入",
          "生成更精确的语义分割掩码用于后处理",
          "将掩码预测结果直接作为最终检测输出"
        ],
        "answer": 1,
        "explain": "MQE 以实例掩码和语义掩码为权重对像素特征做加权平均池化，将区域特征注入 query 嵌入，等效于以掩码为位置编码的交叉注意力，带来 +1.2% F1 提升。"
      }
    },
    {
      "id": "crnn",
      "num": 9,
      "name": "CRNN",
      "fullName": "卷积循环神经网络 (Convolutional Recurrent Neural Network)",
      "year": "2015",
      "org": "Huazhong University of Science and Technology",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/1507.05717",
      "projectUrl": "",
      "category": "recognition",
      "motivation": "CNN+RNN+CTC开创序列识别",
      "summary": "CRNN 的核心目标是：CNN+RNN+CTC开创序列识别。",
      "keyPoints": [
        "核心动机：CNN+RNN+CTC开创序列识别",
        "代表机构：Huazhong University of Science and Technology"
      ],
      "detail": "<p>CNN+RNN+CTC开创序列识别</p>"
    },
    {
      "id": "aster",
      "num": 10,
      "name": "ASTER",
      "fullName": "注意力场景文本识别器 (Attentional Scene Text Recognizer)",
      "year": "2018",
      "org": "Hikvision Research Institute",
      "parent": "crnn",
      "paperUrl": "https://arxiv.org/abs/1807.03364",
      "projectUrl": "",
      "category": "recognition",
      "motivation": "TPS校正+注意力解码",
      "summary": "ASTER 提出了薄板样条(TPS)空间变换校正网络与注意力序列到序列识别网络的端到端级联框架，通过自适应几何校正将弯曲、透视等不规则文本转化为规则水平文本后再识别，在不规则文本基准上大幅超越先前方法。",
      "keyPoints": [
        "提出 TPS 校正网络：通过定位网络预测 K=20 个控制点，利用薄板样条变换实现灵活的非刚性几何校正",
        "端到端无监督校正：校正模块无需任何几何标注，仅通过识别损失梯度反传自动学习最优校正策略",
        "双向注意力解码器：同时从左到右和从右到左解码，取置信度更高的结果，缓解注意力漂移问题",
        "识别网络采用 ResNet 编码器 + BiLSTM + Attention-GRU 解码器的 seq2seq 架构",
        "在 7 个标准基准上评测，不规则文本数据集 (CUTE80, SVT-P, IC15) 上取得显著提升（CUTE80: 79.5% vs 先前 59.2%）"
      ],
      "detail": "<pre><code>输入图像 (不规则/弯曲文本)\n    │\n    ▼\n┌───────────────────────────────────────┐\n│         校正网络 (Rectification)        │\n│  [定位CNN] → K=20控制点 → [TPS变换]    │\n│         → 双线性采样 → 校正图像         │\n└───────────────────────────────────────┘\n    │  32×100 规则图像\n    ▼\n┌───────────────────────────────────────┐\n│         识别网络 (Recognition)          │\n│  [ResNet编码器] → [BiLSTM] →           │\n│  [注意力GRU解码器(L→R)] ─┐             │\n│  [注意力GRU解码器(R→L)] ─┤→ 取高置信度  │\n└───────────────────────────────────────┘\n    │\n    ▼\n  预测: &quot;GOOGLE&quot;\n</code></pre>\n<p><em>图：ASTER 整体框架——上半部分为 TPS 校正网络（定位网络→TPS变换→校正图像），下半部分为双向注意力识别网络</em></p>\n<pre><code class=\"language-python\"># ASTER 核心流程伪代码\nclass ASTER:\n    def __init__(self, K=20):\n        self.localization_net = CNN_FC(output=2*K)  # 预测K个控制点坐标\n        self.tps_transform = TPS(K)                  # 薄板样条变换\n        self.encoder = ResNet() + BiLSTM(256)        # 视觉+序列编码\n        self.decoder_fwd = AttentionGRU('L2R')       # 正向解码\n        self.decoder_bwd = AttentionGRU('R2L')       # 反向解码\n\n    def forward(self, img, target=None):\n        # Step 1: 校正\n        ctrl_points = self.localization_net(img)       # [B, K, 2]\n        rectified = self.tps_transform(img, ctrl_points)  # [B, 3, 32, 100]\n\n        # Step 2: 编码\n        features = self.encoder(rectified)             # [B, T, 512]\n\n        # Step 3: 双向解码\n        if training:\n            return CE_loss(decoder_fwd(features, target)) + \\\n                   CE_loss(decoder_bwd(features, reverse(target)))\n        else:\n            pred_fwd, score_fwd = decoder_fwd.decode(features)\n            pred_bwd, score_bwd = decoder_bwd.decode(features)\n            return pred_fwd if score_fwd &gt; score_bwd else reverse(pred_bwd)\n</code></pre>\n<p><strong>动机与背景</strong></p>\n<p>自然场景文本常呈现弯曲、透视变形、旋转等不规则形态。传统识别器（如 CRNN）假设文本水平排列，面对不规则文本性能急剧下降。早期的空间变换网络 (STN) 仅使用仿射变换（6 自由度），无法处理弯曲等非刚性变形。ASTER 的核心思想是：<strong>与其让识别网络直接处理复杂的不规则文本，不如先将其\"摆正\"为规则形态，降低后续识别难度。</strong></p>\n<p><strong>核心机制一：TPS 校正网络</strong></p>\n<p>TPS（Thin-Plate Spline）是一种灵活的非刚性 2D 变换，其数学表达为：</p>\n<p>$$T(p) = A \\begin{bmatrix} p \\\\ 1 \\end{bmatrix} + \\sum_{k=1}^{K} w_k \\cdot U(\\|p - c_k\\|)$$</p>\n<p>其中 \\(A \\in \\mathbb{R}^{2 \\times 3}\\) 为仿射部分，\\(w_k\\) 为控制点权重，\\(U(r) = r^2 \\log r\\) 为 TPS 径向基函数。20 个控制点（上下各 10 个）提供 40+6 个自由度，远超仿射变换的 6 个自由度，足以拟合弯曲和透视变形。</p>\n<div class=\"key-point\">💡 关键：TPS 等价于在无限薄金属板上施加点力后的变形，天然具有\"最小弯曲能\"性质——在所有满足控制点约束的变换中，TPS 的弯曲能量最小，因此变换结果平滑自然。</div>\n<p>定位网络是一个轻量 CNN（6 层卷积 + 2 层全连接），从输入图像直接回归 K 个控制点的归一化坐标。整个 TPS 变换过程可微分，梯度链为：</p>\n<p>$$\\frac{\\partial \\mathcal{L}}{\\partial c_k} = \\frac{\\partial \\mathcal{L}}{\\partial I'} \\cdot \\frac{\\partial I'}{\\partial G} \\cdot \\frac{\\partial G}{\\partial T} \\cdot \\frac{\\partial T}{\\partial c_k}$$</p>\n<p>这使得校正网络在<strong>没有任何几何监督</strong>的情况下，仅靠识别损失即可学会正确的校正行为。</p>\n<p><strong>核心机制二：注意力识别网络</strong></p>\n<p>编码器采用修改版 ResNet（在高度方向 stride=2 压缩、宽度方向 stride=1 保留序列长度），将 32×100 的校正图像编码为长度约 25 的特征序列，再经 2 层 BiLSTM 增强上下文建模。</p>\n<p>解码器采用基于 GRU 的注意力机制，第 \\(t\\) 步：\n1. 状态更新：\\(s_t = \\text{GRU}(s_{t-1}, [e(y_{t-1}); c_{t-1}])\\)\n2. 注意力计算：\\(\\alpha_{t,i} = \\text{softmax}(v^T \\tanh(W_s s_t + W_h h_i))\\)\n3. 上下文向量：\\(c_t = \\sum_i \\alpha_{t,i} \\cdot h_i\\)\n4. 字符预测：\\(p(y_t) = \\text{softmax}(W_o [s_t; c_t])\\)</p>\n<p><strong>核心机制三：双向解码策略</strong></p>\n<p>注意力解码器存在\"注意力漂移\"——某步出错会级联传播。ASTER 同时训练正向（L→R）和反向（R→L）两个解码器，推理时分别生成候选序列，取序列对数概率 \\(\\log P = \\sum_t \\log p(y_t|y_{<t})\\) 更高者为最终结果。两个解码器共享编码器但各有独立的 GRU 参数。</p>\n<p><strong>与传统方法的区别</strong></p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方面</th>\n<th>CRNN (2015)</th>\n<th>RARE (2016)</th>\n<th>ASTER (2018)</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>校正</td>\n<td>无</td>\n<td>TPS</td>\n<td>TPS</td>\n</tr>\n<tr>\n<td>编码器</td>\n<td>VGG-7层</td>\n<td>VGG</td>\n<td>ResNet (更深更强)</td>\n</tr>\n<tr>\n<td>序列建模</td>\n<td>BiLSTM</td>\n<td>无</td>\n<td>BiLSTM</td>\n</tr>\n<tr>\n<td>解码</td>\n<td>CTC</td>\n<td>单向 Attention</td>\n<td><strong>双向 Attention</strong></td>\n</tr>\n<tr>\n<td>CUTE80</td>\n<td>54.9%</td>\n<td>59.2%</td>\n<td><strong>79.5%</strong></td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"warn-box\">⚠️ 注意：ASTER 可视为 RARE 的全面增强版——相同的 TPS 校正思想，但更强的编码器、更鲁棒的双向解码器，以及端到端联合优化带来了 20+ 百分点的提升。</div>\n<p><strong>消融实验关键结论</strong></p>\n<ul>\n<li>TPS 校正对不规则文本贡献最大（CUTE80: +10.4%）</li>\n<li>注意力解码优于 CTC（+4~6%）</li>\n<li>双向解码额外贡献约 1~3%</li>\n<li>校正网络对已规则文本几乎不做变换（自动退化为近似恒等映射）</li>\n</ul>",
      "quiz": {
        "q": "ASTER 中 TPS 校正网络能够在无几何标注的情况下学会校正，其根本原因是什么？",
        "options": [
          "TPS 变换本身具有自校正能力，无需学习",
          "定位网络使用了预训练的关键点检测模型提供初始监督",
          "整个 TPS 采样过程可微分，识别损失的梯度可反传至定位网络",
          "训练数据中包含了校正前后的配对图像作为隐式监督"
        ],
        "answer": 2,
        "explain": "TPS 变换中的网格生成和双线性采样均可微分，因此识别损失可通过采样器→网格→TPS参数→控制点的完整梯度链反传到定位网络，使其学会产生有利于识别的校正。"
      }
    },
    {
      "id": "moran",
      "num": 11,
      "name": "MORAN",
      "fullName": "多对象校正注意力网络 (Multi-Object Rectified Attention Network)",
      "year": "2019",
      "org": "Shanghai Jiao Tong University",
      "parent": "aster",
      "paperUrl": "https://arxiv.org/abs/1901.03003",
      "projectUrl": "",
      "category": "recognition",
      "motivation": "弱监督多对象图像校正",
      "summary": "MORAN 提出了一种无几何约束的多对象校正网络（MORN）与注意力序列识别网络（ASRN）联合的两阶段框架，通过弱监督方式（仅需图像-文本标签对）将不规则场景文字校正为规则形态后再识别，并引入 Fractional Pickup 方法扩展注意力视野，在 7 个主流基准上取得了当时最优的无词典识别精度。",
      "keyPoints": [
        "<strong>两阶段架构</strong>：MORN（多对象校正网络）负责图像校正 + ASRN（注意力序列识别网络）负责文字识别",
        "<strong>无几何约束的像素级校正</strong>：MORN 直接预测每个像素的偏移量（offset map），不受仿射/TPS 等几何变换限制，理论上可处理任意长度和任意形变的文字",
        "<strong>弱监督训练</strong>：整个网络仅需图像和对应文本标签，无需字符级标注或校正目标图像",
        "<strong>Fractional Pickup（FP）</strong>：训练时对注意力权重进行邻域混合，扩展解码器的感受野，增强对噪声和模糊边界的鲁棒性",
        "<strong>课程学习策略</strong>：先单独训练 ASRN，再联合训练 MORN+ASRN，避免端到端训练的不稳定性",
        "<strong>7 个基准 SOTA</strong>：在 IIIT5K（91.2%）、SVT（88.3%）、IC03（95.0%）、IC13（92.4%）、SVT-P（76.1%）、CUTE80（77.4%）、IC15（68.8%）上均达到当时最优无词典精度"
      ],
      "detail": "<h5>框架总览</h5>\n<p><img alt=\"MORAN 整体架构图\" src=\"https://ar5iv.labs.arxiv.org/html/1901.03003/assets/picture/Moran-overview.jpg\" />\n<em>图：MORAN 整体框架。上半部分为 MORN（多对象校正网络），下半部分为 ASRN（注意力序列识别网络）。输入图像经 MORN 校正后送入 ASRN 进行序列识别。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># MORAN 训练流程伪代码\n# 阶段 1: 单独训练 ASRN\nfor epoch in range(E1):\n    for img, label in dataloader:\n        # 直接用原图训练识别网络\n        pred = ASRN(img)\n        loss = cross_entropy(pred, label)\n        optimizer_asrn.step(loss)\n\n# 阶段 2: 联合训练 MORN + ASRN\nfor epoch in range(E2):\n    for img, label in dataloader:\n        # MORN 预测像素偏移并校正图像\n        offset_x, offset_y = MORN_CNN(img)          # [B, H, W]\n        grid = base_grid + offset                     # 像素级偏移\n        rectified_img = bilinear_sample(img, grid)    # 可微采样\n\n        # ASRN 识别校正后图像\n        features = ASRN_Encoder(rectified_img)        # CNN 特征\n        for t in range(max_len):\n            # Fractional Pickup: 混合相邻注意力权重\n            alpha_t = attention(h_{t-1}, features)     # [B, L]\n            k = argmax(alpha_t)\n            alpha_t[k]   = beta * alpha_t[k] + (1-beta) * alpha_t[k+1]\n            alpha_t[k+1] = (1-beta) * alpha_t[k] + beta * alpha_t[k+1]\n            context = sum(alpha_t * features)\n            h_t, pred_t = GRU_decoder(context, h_{t-1})\n\n        loss = cross_entropy(pred, label)\n        optimizer_all.step(loss)\n</code></pre>\n<h5>动机与背景</h5>\n<p>场景文字识别（Scene Text Recognition, STR）是计算机视觉的核心任务之一，广泛应用于交通标志阅读、商品识别、智能检索等场景。对于<strong>规则文字</strong>（水平排列、无明显形变），基于 CNN+RNN+CTC 或 CNN+Attention 的方法已取得显著成功。然而，现实场景中大量存在<strong>不规则文字</strong>——包括透视变形、弯曲排列、旋转倾斜等，这些形变严重降低了识别精度。</p>\n<p>在 MORAN 之前，处理不规则文字的主流方法包括：\n- <strong>仿射变换</strong>（如 STAR-Net）：受限于旋转、缩放、平移 6 个参数，无法处理非线性形变\n- <strong>TPS 变换</strong>（如 RARE）：通过基准点（fiducial points）拟合薄板样条，但只能捕捉全局形状，无法对每个字符独立校正，且基准点数量限制了处理无限长文字的能力</p>\n<p>MORAN 的核心思想是：<strong>完全摆脱几何变换的参数化约束，直接让网络学习每个像素应该\"看向\"原图的哪个位置</strong>，从而实现真正灵活的多对象校正。</p>\n<h5>MORN：多对象校正网络</h5>\n<p>MORN 的核心是一个全卷积网络，输入图像 \\(I \\in \\mathbb{R}^{C \\times H \\times W}\\)，输出两个与输入同尺寸的偏移图（offset map）：</p>\n<p>$$\\Delta x, \\Delta y = f_{\\text{MORN}}(I), \\quad \\Delta x, \\Delta y \\in \\mathbb{R}^{H \\times W}$$</p>\n<p>对于输出图像中位置 \\((i, j)\\) 的像素，其对应的采样坐标为：</p>\n<p>$$x_s = x_i + \\Delta x_{i,j}, \\quad y_s = y_j + \\Delta y_{i,j}$$</p>\n<p>然后通过<strong>双线性插值</strong>从原图中采样：</p>\n<p>$$V_c^{out}(i,j) = \\sum_{n}^{H} \\sum_{m}^{W} V_c^{in}(n,m) \\cdot \\max(0, 1-|x_s - m|) \\cdot \\max(0, 1-|y_s - n|)$$</p>\n<div class=\"key-point\">💡 <strong>关键</strong>：由于双线性插值对坐标是可微的，梯度可以从 ASRN 的识别损失反向传播到 MORN 的偏移预测，实现端到端训练。这意味着 MORN <strong>不需要任何校正目标图像作为监督</strong>，仅通过识别损失就能学会如何校正。</div>\n<p>MORN 的网络结构采用 U-Net 风格的编码器-解码器架构，包含下采样和上采样路径，确保偏移图具有足够的空间分辨率。为了防止偏移值过大导致采样越界，网络在最后一层使用 \\(\\tanh\\) 激活函数将偏移限制在 \\([-1, 1]\\) 范围内。</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：与 STN（Spatial Transformer Network）的仿射变换不同，MORN 预测的是<strong>逐像素偏移</strong>而非全局变换参数。这使得它可以对图像中不同位置的字符施加不同的校正，真正实现\"多对象\"校正。例如，一个弯曲文字中，左侧字符可能需要向上移动，右侧字符需要向下移动，MORN 可以同时处理这两种情况。</div>\n<h5>ASRN：注意力序列识别网络</h5>\n<p>ASRN 采用经典的 Encoder-Decoder 架构：</p>\n<p><strong>编码器</strong>：一个深度 CNN（基于 ResNet 变体），将校正后的图像编码为特征序列 \\(\\{h_1, h_2, ..., h_L\\}\\)，其中 \\(L\\) 为特征图宽度方向的长度。</p>\n<p><strong>解码器</strong>：基于 GRU 的注意力解码器，在每个时间步 \\(t\\)：</p>\n<ol>\n<li>计算注意力权重：</li>\n</ol>\n<p>$$e_{t,i} = w^T \\tanh(W_s h_i + W_h s_{t-1})$$\n$$\\alpha_{t,i} = \\frac{\\exp(e_{t,i})}{\\sum_{j=1}^{L} \\exp(e_{t,j})}$$</p>\n<ol>\n<li>加权求和得到上下文向量：</li>\n</ol>\n<p>$$c_t = \\sum_{i=1}^{L} \\alpha_{t,i} h_i$$</p>\n<ol>\n<li>GRU 更新隐状态并预测字符：</li>\n</ol>\n<p>$$s_t = \\text{GRU}(c_t, s_{t-1})$$\n$$y_t = \\text{softmax}(W_o s_t)$$</p>\n<h5>Fractional Pickup（FP）</h5>\n<p>在实际场景中，文字图像常伴有阴影、模糊边界和复杂背景，注意力解码器容易聚焦到错误区域。MORAN 提出 <strong>Fractional Pickup</strong> 方法来缓解这一问题。</p>\n<p>核心思想是在训练时，对注意力权重最大值位置 \\(k\\) 及其相邻位置 \\(k+1\\) 进行混合：</p>\n<p>$$\\alpha'_{t,k} = \\beta \\cdot \\alpha_{t,k} + (1-\\beta) \\cdot \\alpha_{t,k+1}$$\n$$\\alpha'_{t,k+1} = (1-\\beta) \\cdot \\alpha_{t,k} + \\beta \\cdot \\alpha_{t,k+1}$$</p>\n<p>其中 \\(\\beta \\in (0.5, 1)\\) 是混合系数。这迫使解码器在训练时\"看到\"相邻字符的特征，从而：\n- 扩展了注意力的有效感受野\n- 增强了对注意力漂移的鲁棒性\n- 在推理时不使用 FP，注意力自然更加精准</p>\n<div class=\"key-point\">💡 <strong>关键</strong>：FP 仅在训练时使用，推理时关闭。这类似于 Dropout 的思想——训练时引入噪声以增强泛化能力。实验表明 FP 使 IIIT5K 精度从 89.7% 提升至 91.2%，IC03 从 94.5% 提升至 95.0%。</div>\n<h5>课程学习策略</h5>\n<p>直接端到端训练 MORN+ASRN 会导致性能下降（Table 4 中端到端训练仅 89.9% vs MORAN 91.2%），因为 MORN 在训练初期产生的校正图像质量差，会误导 ASRN 的学习。</p>\n<p>MORAN 采用两阶段课程学习：\n1. <strong>第一阶段</strong>：冻结 MORN，仅训练 ASRN，使其具备基本的识别能力\n2. <strong>第二阶段</strong>：联合训练 MORN+ASRN，ASRN 的梯度指导 MORN 学习有效的校正</p>\n<p>这种策略确保了 MORN 在开始学习时，已有一个可靠的识别网络提供有意义的梯度信号。</p>\n<h5>与传统方法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>仿射变换 (STAR-Net)</th>\n<th>TPS (RARE)</th>\n<th>MORAN</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>变换参数</td>\n<td>6 个全局参数</td>\n<td>K 个基准点</td>\n<td>H×W 个像素偏移</td>\n</tr>\n<tr>\n<td>几何约束</td>\n<td>旋转+缩放+平移</td>\n<td>薄板样条</td>\n<td>无约束</td>\n</tr>\n<tr>\n<td>字符级校正</td>\n<td>❌</td>\n<td>❌</td>\n<td>✅</td>\n</tr>\n<tr>\n<td>无限长文字</td>\n<td>✅</td>\n<td>❌（受基准点数限制）</td>\n<td>✅</td>\n</tr>\n<tr>\n<td>弱监督</td>\n<td>✅</td>\n<td>✅</td>\n<td>✅</td>\n</tr>\n</tbody>\n</table></div>\n<p>在 IIIT5K 无词典设置下，MORAN（91.2%）显著优于 STAR-Net（83.3%）和 RARE（81.9%）。在不规则文字数据集 CUTE80 上，MORAN（77.4%）比 RARE（59.2%）高出 18.2 个百分点。</p>",
      "quiz": {
        "q": "MORAN 中 MORN（多对象校正网络）的核心输出是什么？",
        "options": [
          "仿射变换的 6 个参数（旋转、缩放、平移）",
          "一组 TPS 薄板样条的基准点坐标",
          "与输入图像同尺寸的逐像素偏移图（offset map）",
          "校正后图像的像素值"
        ],
        "answer": 2,
        "explain": "MORN 输出两个与输入同尺寸的偏移图 Δx 和 Δy，每个像素独立预测偏移量，再通过双线性插值从原图采样生成校正图像，不受任何几何变换的参数化约束。"
      }
    },
    {
      "id": "master",
      "num": 12,
      "name": "MASTER",
      "fullName": "多视角注意力识别器 (Multi-Aspect Non-local Network)",
      "year": "2021",
      "org": "Ping An Technology",
      "parent": "aster",
      "paperUrl": "https://arxiv.org/abs/1910.02562",
      "projectUrl": "",
      "category": "recognition",
      "motivation": "多视角注意力解决漂移",
      "summary": "MASTER 提出了 **Multi-Aspect GCAttention (MAGC) 编码器 + Transformer 解码器** 的场景文字识别架构，通过多头全局上下文注意力机制缓解了传统 RNN 注意力模型中的 **注意力漂移 (attention drift)** 问题，同时利用 Transformer 的并行性大幅提升训练与推理效率。",
      "keyPoints": [
        "<strong>问题定位</strong>：传统 encoder-decoder 文字识别器（如 CRNN、SAR）中，RNN 编码的特征高度相似，导致注意力漂移（相邻字符被重复或跳过识别）",
        "<strong>编码器创新 — MAGC 模块</strong>：将 GCNet 的 Global Context Block 扩展为多头版本，在 CNN 特征图上捕获全局上下文依赖，替代 BiLSTM",
        "<strong>解码器 — Transformer Decoder</strong>：采用 \\(N=3\\) 层标准 Transformer 解码器，同时学习 self-attention（target-target）和 cross-attention（input-output），增强对空间畸变的鲁棒性",
        "<strong>Memory-Cache 推理机制</strong>：受 XLNet 启发，缓存解码过程中 Masked MHA 的 K/V 中间结果，避免重复计算，加速自回归推理",
        "<strong>骨干网络 — ResNet31</strong>：使用非对称池化（\\(2 \\times 1\\) max-pooling）保留水平方向信息，输入 \\(48 \\times 160\\) 输出 \\(6 \\times 40 \\times 512\\)",
        "<strong>训练仅用合成数据</strong>：Synth90K (9M) + SynthText (7M) + SynthAdd (1.6M)，无需真实数据微调即在 8 个标准基准上取得 SOTA"
      ],
      "detail": "<h5>整体架构</h5>\n<p><img alt=\"MASTER 模型架构图\" src=\"https://ar5iv.labs.arxiv.org/html/1910.02562/assets/x2.png\" />\n<em>图：MASTER 整体架构。左侧为 Multi-Aspect GCAttention 编码器（ResNet31 + MAGC），右侧为 Transformer 解码器（Masked MHA + Cross MHA + FFN）。</em></p>\n<p>MASTER 由两个核心模块组成：</p>\n<ol>\n<li><strong>Multi-Aspect GCAttention (MAGC) 编码器</strong>：基于 ResNet31 的 CNN 骨干网络，在每个残差阶段后插入 MAGC 模块，用全局上下文注意力增强特征表示</li>\n<li><strong>Transformer 解码器</strong>：标准的自回归 Transformer 解码器，将编码器输出的 2D 特征图展平为序列后进行 cross-attention 解码</li>\n</ol>\n<h5>注意力漂移问题</h5>\n<p><img alt=\"注意力漂移示意图\" src=\"https://ar5iv.labs.arxiv.org/html/1910.02562/assets/x1.png\" />\n<em>图：注意力漂移现象。由于 RNN 编码的相邻位置特征高度相似，注意力权重容易在相邻字符间漂移，导致重复识别（如 \"TIMMMS\"）或漏字（如 \"FOOTBAL\"）。</em></p>\n<p>传统方法（如 SAR）使用 BiLSTM 编码 CNN 特征后再用 attention 解码，但 BiLSTM 输出的相邻位置特征差异很小，使得 attention 机制难以精确区分相邻字符位置。MASTER 通过两方面解决此问题：</p>\n<ol>\n<li><strong>编码端</strong>：MAGC 模块引入全局上下文信息，使每个位置的特征不仅包含局部信息，还融合了全图的语义，从而增大相邻位置特征的区分度</li>\n<li><strong>解码端</strong>：Transformer 的 self-attention 直接建模已解码字符之间的依赖关系（target-target relationship），而非像 RNN 那样仅依赖隐状态传递</li>\n</ol>\n<h5>Multi-Aspect GCAttention (MAGC) 模块</h5>\n<p>MAGC 是对 GCNet 中 Global Context (GC) Block 的多头扩展。单个 GC Block 的计算过程为：</p>\n<p>$$\\text{gc}(x) = \\sum_{j=1}^{N_p} \\alpha_j \\cdot x_j, \\quad \\alpha_j = \\frac{e^{W_k x_j}}{\\sum_{m=1}^{N_p} e^{W_k x_m}}$$</p>\n<p>其中 \\(N_p = H \\times W\\) 为特征图的空间位置数。GC Block 通过全局注意力池化将整个特征图压缩为一个全局上下文向量，再经过瓶颈变换（bottleneck transform）广播回每个位置：</p>\n<p>$$y = x + \\delta(\\text{GC}(x))$$</p>\n<p>$$\\delta(\\cdot) = W_{v2} \\cdot \\text{ReLU}(\\text{LN}(W_{v1} \\cdot (\\cdot)))$$</p>\n<div class=\"key-point\">💡 <strong>关键创新</strong>：MAGC 将单一注意力头扩展为 \\(h\\) 个头，每个头在 \\(d_h = d_{\\text{model}} / h\\) 维子空间中独立计算全局上下文，最后拼接：</div>\n<p>$$\\text{MAGC}(x) = \\text{Concat}(\\text{gc}_1, \\text{gc}_2, \\ldots, \\text{gc}_h)$$</p>\n<p>每个头使用缩放因子 \\(\\sqrt{d_h}\\) 防止点积过大：</p>\n<p>$$\\alpha_j^{(i)} = \\frac{\\exp(W_k^{(i)} x_j / \\sqrt{d_h})}{\\sum_{m} \\exp(W_k^{(i)} x_m / \\sqrt{d_h})}$$</p>\n<p>多头机制使模型能从<strong>多个语义视角 (multi-aspect)</strong> 捕获全局上下文，不同头关注不同的语义模式。实验表明 \\(h=8\\) 为最优设置。</p>\n<h5>编码器网络结构</h5>\n<p>编码器基于 ResNet31，包含 4 个基本阶段（conv2_x 到 conv5_x），每个阶段的结构为：</p>\n<pre><code>残差块 (Residual Block) → MAGC 模块 → 卷积块 (Conv Block) → 最大池化 (Max Pooling)\n</code></pre>\n<p>关键设计：\n- <strong>非对称池化</strong>：前两个阶段使用 \\(2 \\times 2\\) 池化，后两个阶段使用 \\(2 \\times 1\\) 池化（仅在垂直方向下采样），保留水平方向的空间分辨率，这对于文字识别中区分窄字符至关重要\n- <strong>输入输出</strong>：灰度图像 \\(48 \\times 160 \\times 1\\) → 特征图 \\(6 \\times 40 \\times 512\\)，展平后得到 240 个 512 维特征向量</p>\n<h5>Transformer 解码器</h5>\n<p>解码器包含 \\(N=3\\) 个相同的 Transformer 解码块，每块包含三个子模块：</p>\n<ol>\n<li><strong>Masked Multi-Head Attention (Masked MHA)</strong>：对已解码的目标序列做自注意力，使用下三角掩码防止信息泄露</li>\n<li><strong>Multi-Head Attention (Cross MHA)</strong>：Query 来自上一层输出，Key/Value 来自编码器输出，实现 input-output attention</li>\n<li><strong>Feed-Forward Network (FFN)</strong>：两层全连接 + ReLU 激活</li>\n</ol>\n<p>多头注意力的计算：</p>\n<p>$$\\text{MultiHead}(Q, K, V) = \\text{Concat}(\\text{head}_1, \\ldots, \\text{head}_h) W^O$$</p>\n<p>$$\\text{head}_i = \\text{Attention}(Q W_i^Q, K W_i^K, V W_i^V)$$</p>\n<p>$$\\text{Attention}(Q, K, V) = \\text{softmax}\\left(\\frac{QK^T}{\\sqrt{d_k}}\\right) V$$</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：编码器输出的 K/V 在所有解码步骤中保持不变，因此可以预计算并缓存。</div>\n<h5>Memory-Cache 推理机制</h5>\n<pre><code class=\"language-python\"># Memory-Cache 推理伪代码\n# 预计算编码器输出的 K/V 投影（每个 decoder block b）\nfor b in range(B):\n    X_k[b] = W_k[b] * encoder_output  # 缓存，不再重复计算\n    X_v[b] = W_v[b] * encoder_output\n\nkeys_memory = [[] for _ in range(B)]    # 缓存 Masked MHA 的 Key\nvalues_memory = [[] for _ in range(B)]  # 缓存 Masked MHA 的 Value\n\nt = 0\nq = embedding(SOS) + positional_encoding(0)\n\nwhile q != EOS and t &lt; T:\n    for b in range(B):\n        # 缓存当前步的 K/V 投影（仅 1 个向量，非整个序列）\n        keys_memory[b].append(M_k[b] * q)\n        values_memory[b].append(M_v[b] * q)\n        # Masked MHA：用缓存的历史 K/V，无需重新计算前 t-1 步\n        q = MaskedMHA(M_q[b] * q, keys_memory[b], values_memory[b])\n        # Cross MHA：使用预计算的编码器 K/V\n        q = CrossMHA(W_q[b] * q, X_k[b], X_v[b])\n        q = FeedForward(q)\n    p_t = argmax(softmax(linear(q)))\n    t += 1\n</code></pre>\n<div class=\"key-point\">💡 <strong>关键优化</strong>：传统 Transformer 推理中，每个解码步需要将所有已解码 token 重新输入 Masked MHA 计算，复杂度为 \\(O(t^2)\\)。Memory-Cache 机制将前序步骤的 K/V 缓存起来，每步仅需处理当前 1 个 token 的 query，复杂度降为 \\(O(t)\\)。</div>\n<h5>训练与推理细节</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>配置项</th>\n<th>值</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>训练数据</td>\n<td>Synth90K (9M) + SynthText (7M) + SynthAdd (1.6M)</td>\n</tr>\n<tr>\n<td>输入尺寸</td>\n<td>\\(48 \\times 160 \\times 1\\)（灰度）</td>\n</tr>\n<tr>\n<td>优化器</td>\n<td>Adam, lr = \\(4 \\times 10^{-4}\\)</td>\n</tr>\n<tr>\n<td>Batch Size</td>\n<td>\\(128 \\times 4\\) (4 GPU)</td>\n</tr>\n<tr>\n<td>训练轮数</td>\n<td>12 epochs, 每轮约 3 小时</td>\n</tr>\n<tr>\n<td>符号类别</td>\n<td>66 类（10 数字 + 52 大小写字母 + SOS/EOS/PAD/UNK）</td>\n</tr>\n<tr>\n<td>解码最大长度</td>\n<td>T（论文未明确，通常为 25）</td>\n</tr>\n<tr>\n<td>硬件</td>\n<td>4 × NVIDIA Tesla V100 (16GB)</td>\n</tr>\n<tr>\n<td>推理技巧</td>\n<td>对高&gt;宽的图像做 ±90° 旋转，取最大概率输出；不使用 beam search 和 lexicon</td>\n</tr>\n</tbody>\n</table></div>\n<h5>实验结果</h5>\n<p>在 7 个标准基准上的识别准确率（%），无 lexicon：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>IIIT5K</th>\n<th>SVT</th>\n<th>IC03</th>\n<th>IC13</th>\n<th>IC15</th>\n<th>SVTP</th>\n<th>CUTE</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>CRNN</td>\n<td>78.2</td>\n<td>80.8</td>\n<td>89.4</td>\n<td>86.7</td>\n<td>—</td>\n<td>—</td>\n<td>—</td>\n</tr>\n<tr>\n<td>ASTER</td>\n<td>93.4</td>\n<td>89.5</td>\n<td>94.5</td>\n<td>91.8</td>\n<td>76.1</td>\n<td>78.5</td>\n<td>79.5</td>\n</tr>\n<tr>\n<td>SAR</td>\n<td>91.5</td>\n<td>84.5</td>\n<td>—</td>\n<td>91.0</td>\n<td>69.2</td>\n<td>76.4</td>\n<td>83.3</td>\n</tr>\n<tr>\n<td>NRTR</td>\n<td>86.5</td>\n<td>88.3</td>\n<td>95.4</td>\n<td>94.7</td>\n<td>—</td>\n<td>—</td>\n<td>—</td>\n</tr>\n<tr>\n<td>MORAN</td>\n<td>91.2</td>\n<td>88.3</td>\n<td>95.0</td>\n<td>92.4</td>\n<td>68.8</td>\n<td>76.1</td>\n<td>77.4</td>\n</tr>\n<tr>\n<td><strong>MASTER</strong></td>\n<td><strong>95.0</strong></td>\n<td><strong>90.6</strong></td>\n<td><strong>96.4</strong></td>\n<td><strong>95.3</strong></td>\n<td><strong>79.4</strong></td>\n<td><strong>84.5</strong></td>\n<td><strong>87.5</strong></td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 <strong>关键发现</strong>：MASTER 在不规则文本数据集（IC15、SVTP、CUTE）上提升尤为显著，相比 SAR 在 IIIT5K 上提升 3.5%，SVT 上提升 6.1%，验证了多视角注意力机制对空间畸变的鲁棒性。</div>\n<h5>消融实验</h5>\n<p><strong>MAGC 头数 \\(h\\) 的影响</strong>（固定 \\(N=3\\)）：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>\\(h\\)</th>\n<th>IIIT5K</th>\n<th>SVTP</th>\n<th>CUTE</th>\n<th>IC15</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>0（无 MAGC）</td>\n<td>94.6</td>\n<td>82.3</td>\n<td>86.2</td>\n<td>78.4</td>\n</tr>\n<tr>\n<td>1</td>\n<td>94.9</td>\n<td>83.8</td>\n<td>87.6</td>\n<td>79.4</td>\n</tr>\n<tr>\n<td>8（标准）</td>\n<td><strong>95.0</strong></td>\n<td><strong>84.5</strong></td>\n<td><strong>87.5</strong></td>\n<td><strong>79.4</strong></td>\n</tr>\n<tr>\n<td>16</td>\n<td>95.1</td>\n<td>84.1</td>\n<td>85.4</td>\n<td>79.4</td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>解码器层数 \\(N\\) 的影响</strong>（固定 \\(h=8\\)）：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>\\(N\\)</th>\n<th>IIIT5K</th>\n<th>SVTP</th>\n<th>CUTE</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>1</td>\n<td>94.3</td>\n<td>83.1</td>\n<td>85.4</td>\n</tr>\n<tr>\n<td>3（标准）</td>\n<td><strong>95.0</strong></td>\n<td><strong>84.5</strong></td>\n<td><strong>87.5</strong></td>\n</tr>\n<tr>\n<td>6</td>\n<td>91.3</td>\n<td>75.7</td>\n<td>76.7</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：\\(N=6\\) 时性能急剧下降，说明过深的解码器在合成数据训练下容易过拟合。\\(h=0\\) 到 \\(h \\geq 1\\) 的提升在不规则文本数据集上最为明显，证实 MAGC 对处理弯曲/畸变文本的有效性。</div>",
      "quiz": {
        "q": "MASTER 中 Multi-Aspect GCAttention (MAGC) 模块相比原始 GCNet 的 GC Block，核心改进是什么？",
        "options": [
          "将全局平均池化替换为全局最大池化",
          "引入多头机制，从多个语义子空间捕获全局上下文",
          "增加了残差连接和 Layer Normalization",
          "将 softmax 注意力替换为 sigmoid 门控机制"
        ],
        "answer": 1,
        "explain": "MAGC 将 GC Block 的单一全局注意力扩展为 h 个头，每个头在 d_model/h 维子空间中独立计算全局上下文后拼接，从而从多个语义视角（multi-aspect）增强特征表示。"
      }
    },
    {
      "id": "abinet",
      "num": 13,
      "name": "ABINet",
      "fullName": "自治双向迭代网络 (Autonomous Bidirectional Iterative Network)",
      "year": "2021",
      "org": "University of Science and Technology of China",
      "parent": "master",
      "paperUrl": "https://arxiv.org/abs/2103.06495",
      "projectUrl": "",
      "category": "recognition",
      "motivation": "显式语言模型增强识别",
      "summary": "ABINet 提出将视觉模型与语言模型显式解耦（自治），并设计双向完形填空网络（BCN）和迭代纠正机制，解决了传统隐式语言建模能力有限、单向表示信息不足、噪声输入影响预测的三大问题，在场景文字识别中实现了 SOTA 性能。",
      "keyPoints": [
        "<strong>自治策略（Autonomous）</strong>：阻断视觉模型到语言模型的梯度流（BGF），强制语言模型独立学习语言知识，可单独预训练",
        "<strong>双向完形填空网络（BCN）</strong>：通过注意力掩码实现真正的双向特征表示，信息量是单向模型集成的 2 倍",
        "<strong>迭代纠正（Iterative Correction）</strong>：语言模型多轮执行，逐步修正视觉预测中的噪声，同时缓解长度不对齐问题",
        "<strong>门控融合机制</strong>：使用门控单元对齐并融合视觉特征与语言特征",
        "<strong>半监督集成自训练</strong>：基于迭代预测的集成结果过滤高质量伪标签，利用无标注数据提升性能",
        "<strong>视觉模型</strong>：ResNet backbone + Transformer 序列建模 + 位置注意力并行解码"
      ],
      "detail": "<p><img alt=\"ABINet 整体架构图\" src=\"https://ar5iv.labs.arxiv.org/html/2103.06495/assets/x2.png\" />\n<em>图：ABINet 整体架构示意图。视觉模型（VM）、语言模型（LM/BCN）和融合模块（Fusion）协同工作，支持迭代纠正。</em></p>\n<p><img alt=\"自治语言模型对比\" src=\"https://ar5iv.labs.arxiv.org/html/2103.06495/assets/x1.png\" />\n<em>图：(a) 传统耦合式语言模型 vs (b) ABINet 的自治式语言模型，梯度流在输入处被阻断。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># ABINet 迭代推理流程\ndef abinet_inference(image, M=3):\n    # 1. 视觉模型：提取视觉特征并生成初始字符概率\n    F_b = Transformer(ResNet(image))          # 骨干特征 [H/4, W/4, C]\n    F_v = PositionAttention(Q=pos_enc, K=F_b, V=F_b)  # 视觉特征 [T, C]\n    P_v = Linear(F_v)                          # 视觉预测 [T, c]\n\n    y = P_v  # 初始输入为视觉预测概率\n    for i in range(M):  # 迭代纠正\n        # 2. 语言模型（BCN）：双向完形填空\n        y_detached = stop_gradient(y)          # 阻断梯度（自治）\n        F_l = BCN(y_detached)                  # 语言特征 [T, C]\n\n        # 3. 门控融合\n        G = sigmoid(concat(F_v, F_l) @ W_f)   # 门控权重 [T, C]\n        F_f = G * F_v + (1 - G) * F_l         # 融合特征\n        y = Linear(F_f)                        # 更新预测概率\n\n    return y  # 最终识别结果\n</code></pre>\n<h5>动机与背景</h5>\n<p>场景文字识别（STR）中，语言知识对于处理模糊、遮挡等低质量图像至关重要。然而，现有方法存在三个根本性限制：</p>\n<ol>\n<li><strong>隐式语言建模</strong>：传统注意力解码器（如 RNN/Transformer decoder）将语言建模隐含在序列解码中，模型实际学到的语言知识不可控且有限。</li>\n<li><strong>单向特征表示</strong>：大多数方法采用从左到右的自回归解码，或简单集成两个单向模型。从信息论角度，单向表示平均只能利用 \\(\\frac{1}{2}H_{\\bm{y}}\\) 的上下文信息。</li>\n<li><strong>噪声输入问题</strong>：并行 Transformer 的输入来自视觉预测的近似值，错误预测会作为噪声传播到语言模型，降低纠正能力。</li>\n</ol>\n<div class=\"key-point\">💡 关键洞察：人类阅读是自治的（视觉与语言独立学习）、双向的（利用前后文推理）、迭代的（反复确认修正），ABINet 的设计正是模拟这三个特性。</div>\n<h5>核心机制详解</h5>\n<p><strong>1. 自治策略（Autonomous）</strong></p>\n<p>ABINet 的核心设计哲学是将语言模型视为一个独立的\"拼写纠正器\"。具体实现：</p>\n<ul>\n<li>语言模型的输入是字符概率向量（而非隐层特征），使其可解释且可替换</li>\n<li>在输入处阻断梯度回传（Block Gradient Flow, BGF），确保 LM 不依赖视觉信号学习</li>\n<li>LM 可以在纯文本数据上独立预训练，直接复用 NLP 社区的进展</li>\n</ul>\n<p>这使得视觉模型和语言模型各自专注于自己的任务：VM 负责\"看\"，LM 负责\"读\"。</p>\n<p><strong>2. 双向完形填空网络（BCN）</strong></p>\n<p>BCN 是一个 \\(L\\) 层 Transformer decoder 变体，其核心创新在于注意力掩码设计：</p>\n<p>$$\\mathbf{M}_{ij} = \\begin{cases} 0, & i \\neq j \\\\ -\\infty, & i = j \\end{cases}$$</p>\n<p>这意味着每个位置可以看到<strong>所有其他位置</strong>的信息，但<strong>看不到自身</strong>——这正是完形填空（cloze）的思想。与 BERT 的 MLM 不同，BCN 无需逐个 mask 再分别推理，而是通过注意力掩码一次并行完成所有位置的双向预测。</p>\n<p><img alt=\"BCN 架构\" src=\"https://ar5iv.labs.arxiv.org/html/2103.06495/assets/x4.png\" />\n<em>图：BCN 语言模型架构。字符概率向量通过线性映射后作为 K/V，位置编码作为 Q，注意力掩码阻止自身信息泄露。</em></p>\n<p>注意力计算：</p>\n<p>$$\\mathbf{F}_{mha} = \\text{softmax}\\left(\\frac{\\mathbf{Q}\\mathbf{K}^{\\mathsf{T}}}{\\sqrt{C}} + \\mathbf{M}\\right)\\mathbf{V}$$</p>\n<p>其中 \\(\\mathbf{K}_i = \\mathbf{V}_i = P(y_i)\\mathbf{W}_l\\)，即每个位置的 Key/Value 来自该位置的字符概率分布经线性变换。</p>\n<div class=\"warn-box\">⚠️ 注意：BCN 中<strong>没有自注意力</strong>（self-attention），避免了跨时间步的信息泄露。Q 在第一层为位置编码，后续层为上一层输出。</div>\n<p><strong>3. 迭代纠正（Iterative Correction）</strong></p>\n<p>语言模型被执行 \\(M\\) 次（实验中 \\(M=3\\)）：\n- 第 1 次迭代：输入为视觉模型的预测概率 \\(\\bm{y}_{i=1} = P_v\\)\n- 第 \\(i \\geq 2\\) 次迭代：输入为上一轮融合模型的输出概率</p>\n<p>这种设计的优势：\n- 每轮纠正后的预测更准确，下一轮 LM 获得更干净的输入\n- 逐步修正文本长度预测（缓解 padding mask 导致的长度不对齐问题）\n- 实验表明 3 次迭代即可收敛，额外迭代收益递减</p>\n<p><strong>4. 门控融合</strong></p>\n<p>视觉特征和语言特征来自不同模态，通过门控机制进行自适应融合：</p>\n<p>$$\\mathbf{G} = \\sigma([\\mathbf{F}_v, \\mathbf{F}_l]\\mathbf{W}_f)$$\n$$\\mathbf{F}_f = \\mathbf{G} \\odot \\mathbf{F}_v + (1 - \\mathbf{G}) \\odot \\mathbf{F}_l$$</p>\n<p>其中 \\(\\mathbf{W}_f \\in \\mathbb{R}^{2C \\times C}\\)，\\(\\sigma\\) 为 sigmoid 函数。门控值自适应决定每个特征维度上视觉与语言的贡献比例。</p>\n<h5>训练策略</h5>\n<p><strong>监督训练</strong>采用多任务损失：</p>\n<p>$$\\mathcal{L} = \\lambda_v \\mathcal{L}_v + \\frac{\\lambda_l}{M}\\sum_{i=1}^{M}\\mathcal{L}_l^i + \\frac{1}{M}\\sum_{i=1}^{M}\\mathcal{L}_f^i$$</p>\n<p>其中 \\(\\mathcal{L}_v\\)、\\(\\mathcal{L}_l\\)、\\(\\mathcal{L}_f\\) 分别是视觉、语言、融合分支的交叉熵损失。对每次迭代的语言和融合损失取平均。</p>\n<p><strong>半监督自训练</strong>利用迭代预测的集成进行伪标签过滤：</p>\n<p>$$\\mathcal{C} = \\min_{1 \\leq t \\leq T} e^{\\mathbb{E}[\\log P(y_t)]}, \\quad P(y_t) = \\max_{1 \\leq m \\leq M} P_m(y_t)$$</p>\n<p>只有当文本实例的最小字符置信度 \\(\\mathcal{C}\\) 超过阈值 \\(Q\\) 时，才将其作为伪标签加入训练。</p>\n<h5>与传统方法的区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>传统隐式 LM（如 SRN）</th>\n<th>ABINet</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>语言建模方式</td>\n<td>隐式（嵌入解码器中）</td>\n<td>显式（独立模块）</td>\n</tr>\n<tr>\n<td>梯度流</td>\n<td>视觉→语言贯通</td>\n<td>阻断（BGF）</td>\n</tr>\n<tr>\n<td>方向性</td>\n<td>单向或双单向集成</td>\n<td>真正双向（BCN）</td>\n</tr>\n<tr>\n<td>噪声处理</td>\n<td>单次预测</td>\n<td>迭代纠正</td>\n</tr>\n<tr>\n<td>可预训练性</td>\n<td>不支持独立预训练</td>\n<td>支持纯文本预训练</td>\n</tr>\n<tr>\n<td>可替换性</td>\n<td>LM 与 VM 耦合</td>\n<td>LM 可独立替换升级</td>\n</tr>\n</tbody>\n</table></div>",
      "quiz": {
        "q": "ABINet 中双向完形填空网络（BCN）实现双向建模的核心机制是什么？",
        "options": [
          "使用两个独立的单向 Transformer 分别建模左到右和右到左，再拼接",
          "采用 BERT 的 [MASK] token 逐位置替换后分别推理",
          "通过注意力掩码阻止每个位置看到自身信息，从而并行实现双向上下文建模",
          "使用双向 LSTM 对字符序列进行编码"
        ],
        "answer": 2,
        "explain": "BCN 通过设置注意力掩码 M_ij（i=j 时为 -∞，否则为 0），使每个位置能看到所有其他位置但看不到自身，一次前向传播即可并行完成所有位置的双向预测，避免了 BERT MLM 需要 n 次推理的低效问题。"
      }
    },
    {
      "id": "parseq",
      "num": 14,
      "name": "PARSeq",
      "fullName": "置换自回归序列模型 (Permuted Autoregressive Sequence Models)",
      "year": "2022",
      "org": "University of Adelaide",
      "parent": "abinet",
      "paperUrl": "https://arxiv.org/abs/2207.06966",
      "projectUrl": "",
      "category": "recognition",
      "motivation": "统一多种解码策略",
      "summary": "PARSeq 通过排列语言建模（PLM）训练单一 Transformer 模型学习共享权重的 AR 模型集合，统一了上下文无关的非自回归解码、上下文感知的自回归解码以及基于双向上下文的迭代精炼，在场景文字识别任务上以最优的参数效率达到 SOTA 精度。",
      "keyPoints": [
        "架构极简：ViT-S 编码器（12 层）+ 单层 Transformer 解码器，共约 23.8M 参数",
        "排列语言建模（PLM）训练：对 T! 种排列采样 K 个（K/2 对），用 attention mask 实现不同因式分解顺序",
        "统一三种解码方案：NAR（并行）、AR（单调自回归）、Cloze（迭代精炼），仅通过切换 attention mask 实现",
        "Position tokens 与 context tokens 解耦：position query 指定\"预测哪个位置\"，context 提供\"已知哪些字符\"",
        "迭代精炼机制：将上一轮预测作为 context 反馈，利用双向上下文修正低置信度 token",
        "合成数据训练达 91.9% 平均准确率（SOTA），真实数据训练达 96.0%（SOTA）",
        "参数效率最优：在 accuracy vs params/FLOPS/latency 的帕累托前沿上"
      ],
      "detail": "<p><img alt=\"PARSeq 模型架构\" src=\"https://arxiv.org/html/2207.06966v2/extracted/figures/parseq_arch.png\" />\n<em>图：PARSeq 整体架构。ViT 编码器提取图像特征，单层 Transformer 解码器通过 attention mask 统一 AR/NAR/Cloze 解码。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># PARSeq 训练伪代码\ndef train_step(image, label):\n    # 1. 编码图像\n    z = ViT_Encoder(image)  # [batch, num_patches, d_model]\n\n    # 2. 采样 K 个排列（K/2 对）\n    perms = sample_permutation_pairs(K, T=len(label))\n    # 前 K/2: [LTR] + (K/2-1) 随机排列\n    # 后 K/2: 前 K/2 的翻转版本\n\n    # 3. 对每个排列生成 attention mask 并解码\n    total_loss = 0\n    for perm in perms:\n        mask = generate_attention_mask(perm)  # 根据排列顺序生成因果 mask\n        y_pred = Decoder(z, pos_tokens, context_tokens, mask)\n        total_loss += cross_entropy(y_pred, label)\n\n    return total_loss / K\n\n# PARSeq 推理伪代码（迭代精炼）\ndef inference(image, max_iters=2):\n    z = ViT_Encoder(image)\n\n    # 第 1 轮：NAR 解码（context 仅含 [B]）\n    context = [BOS]\n    mask = nar_mask()  # 全 1 mask，无因果约束\n    prediction = Decoder(z, pos_tokens, context, mask)\n\n    # 第 2+ 轮：Cloze 精炼（用上轮预测作为双向 context）\n    for i in range(max_iters - 1):\n        context = prediction  # 上轮输出作为新 context\n        mask = cloze_mask()   # 双向 mask（每个位置可见所有其他位置）\n        prediction = Decoder(z, pos_tokens, context, mask)\n\n    return prediction\n</code></pre>\n<h5>动机与背景</h5>\n<p>传统场景文字识别（STR）中的上下文感知方法面临两大困境：</p>\n<ol>\n<li><strong>AR 模型的单向性限制</strong>：标准自回归模型仅能学习单方向（通常是从左到右）的 token 依赖关系，导致模型对阅读方向产生偏见，在反向文本或旋转文本上表现不佳。</li>\n<li><strong>两阶段方法的低效性</strong>：如 ABINet 采用独立的视觉模型 + 外部语言模型 + 融合层的三段式结构。外部 LM 与图像条件独立，可能错误地\"纠正\"已经正确的预测（ABINet LM 单独使用时仅 41.9% 词准确率），且参数利用率极低。</li>\n</ol>\n<div class=\"key-point\">💡 关键洞察：不同的解码策略（AR、NAR、Cloze）本质上只是序列似然函数的不同因式分解顺序，可以通过 attention mask 在同一模型中统一实现。</div>\n<h5>核心机制：排列语言建模（PLM）</h5>\n<p>PLM 的核心思想是对序列似然函数的所有可能因式分解进行训练：</p>\n<p>$$\\log p(\\mathbf{y}|\\mathbf{x}) = \\mathbb{E}_{\\mathbf{z}\\sim\\mathcal{Z}_T}\\left[\\sum_{t=1}^{T}\\log p_\\theta(y_{z_t}|\\mathbf{y}_{\\mathbf{z}_{<t}},\\mathbf{x})\\right]$$</p>\n<p>其中 \\(\\mathcal{Z}_T\\) 是长度为 \\(T\\) 的所有排列集合，\\(z_t\\) 是排列 \\(\\mathbf{z}\\) 的第 \\(t\\) 个元素。</p>\n<p><strong>关键设计</strong>：PLM 不需要实际打乱输入序列，而是通过构造不同的 attention mask 来强制执行排列指定的因果顺序。例如对于排列 \\([3,1,2]\\)，位置 3 无需任何上下文，位置 1 可以看到位置 3 的 token，位置 2 可以看到位置 3 和位置 1 的 token。</p>\n<p><strong>排列采样策略</strong>：由于 \\(T!\\) 增长过快，实际训练中只使用 \\(K\\) 个排列。采样方式为 \\(K/2\\) 对：\n- 前半部分：1 个 LTR 排列 + \\(K/2-1\\) 个随机排列\n- 后半部分：前半部分每个排列的翻转版本</p>\n<p>训练损失为所有排列的平均交叉熵：</p>\n<p>$$\\mathcal{L} = \\frac{1}{K}\\sum_{k=1}^{K}\\mathcal{L}_{ce}(\\mathbf{y}_k, \\hat{\\mathbf{y}})$$</p>\n<h5>解码器架构细节</h5>\n<p>解码器接收三类输入：\n1. <strong>图像特征</strong> \\(\\mathbf{z} \\in \\mathbb{R}^{n \\times d_{model}}\\)：来自 ViT 编码器\n2. <strong>Position tokens</strong> \\(\\mathbf{p} \\in \\mathbb{R}^{(T+1) \\times d_{model}}\\)：可学习的位置嵌入，指定输出位置\n3. <strong>Context tokens</strong> \\(\\mathbf{c} \\in \\mathbb{R}^{(T+1) \\times d_{model}}\\)：已知字符的嵌入（训练时为 ground truth，推理时为上轮预测）</p>\n<p>解码器的计算流程：\n1. Self-attention（带 attention mask \\(\\mathbf{m}\\)）处理 context tokens\n2. Cross-attention 融合图像特征\n3. 残差 MLP 输出：\\(\\mathbf{h}_{dec} = \\mathbf{h}_i + \\text{MLP}(\\mathbf{h}_i)\\)\n4. 线性层映射到字符集：\\(\\mathbf{y} = \\text{Linear}(\\mathbf{h}_{dec}) \\in \\mathbb{R}^{(T+1)\\times(S+1)}\\)</p>\n<div class=\"warn-box\">⚠️ 注意：Position tokens 和 context tokens 的解耦是 PARSeq 的关键设计。Position tokens 始终指定\"要预测哪些位置\"，而 context tokens 通过 attention mask 控制\"可以利用哪些已知信息\"，这使得同一解码器能灵活切换解码模式。</div>\n<h5>统一的解码方案</h5>\n<p>通过不同的 attention mask，同一模型支持三种解码：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>解码方式</th>\n<th>Context 输入</th>\n<th>Attention Mask</th>\n<th>特点</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>NAR（并行）</td>\n<td>仅 [B] token</td>\n<td>全 1（无因果约束）</td>\n<td>最快，一次前向传播</td>\n</tr>\n<tr>\n<td>AR（自回归）</td>\n<td>[B] + 逐步生成的 token</td>\n<td>下三角因果 mask</td>\n<td>最精确的单次解码</td>\n</tr>\n<tr>\n<td>Cloze（精炼）</td>\n<td>上轮完整预测</td>\n<td>双向 mask（排除自身）</td>\n<td>利用双向上下文修正</td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>迭代精炼流程</strong>：第一轮用 NAR 获得初始预测，后续轮次用 Cloze mask 将整个预测作为双向上下文反馈，逐步修正低置信度的 token。这等价于 ABINet 中外部 LM 的功能，但 PARSeq 的 LM 是<strong>内部的</strong>（条件依赖于图像特征），因此不会出现与图像矛盾的错误纠正。</p>\n<h5>与传统方法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>语言模型类型</th>\n<th>解码方式</th>\n<th>参数量</th>\n<th>缺陷</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>CRNN/CTC</td>\n<td>无</td>\n<td>并行</td>\n<td>少</td>\n<td>无上下文</td>\n</tr>\n<tr>\n<td>ASTER/NRTR</td>\n<td>内部 AR</td>\n<td>串行 LTR</td>\n<td>中</td>\n<td>单向偏见</td>\n</tr>\n<tr>\n<td>ABINet</td>\n<td>外部双向 LM</td>\n<td>并行+精炼</td>\n<td>多（36.7M）</td>\n<td>LM 与图像独立，易错误纠正</td>\n</tr>\n<tr>\n<td><strong>PARSeq</strong></td>\n<td><strong>内部 PLM</strong></td>\n<td><strong>AR/NAR/Cloze 统一</strong></td>\n<td><strong>23.8M</strong></td>\n<td><strong>参数最优，精度最高</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p>PARSeq 的核心优势在于：用一个简单统一的结构（单层解码器 + attention mask）替代了 ABINet 中视觉模型 + 语言模型 + 融合模型的复杂三段式架构，同时获得了更强的精度和更高的效率。</p>",
      "quiz": {
        "q": "PARSeq 如何在同一模型中实现 AR、NAR 和迭代精炼三种解码方式？",
        "options": [
          "使用三个独立的解码器分支，分别处理不同解码模式",
          "通过切换 Transformer 解码器的 attention mask 来控制 token 间的依赖关系",
          "在训练时使用不同的损失函数分别优化三种解码路径",
          "通过调整编码器输出的特征维度来适配不同解码需求"
        ],
        "answer": 1,
        "explain": "PARSeq 的核心设计是通过 attention mask 控制 context tokens 之间的可见性：NAR 用全 1 mask（无因果约束），AR 用下三角 mask（因果约束），Cloze 用排除自身的双向 mask，从而在同一模型中统一三种解码。"
      }
    },
    {
      "id": "trocr",
      "num": 15,
      "name": "TrOCR",
      "fullName": "Transformer光学字符识别 (Transformer-based Optical Character Recognition)",
      "year": "2023",
      "org": "Microsoft Research",
      "parent": "parseq",
      "paperUrl": "https://arxiv.org/abs/2109.10282",
      "projectUrl": "",
      "category": "recognition",
      "motivation": "纯Transformer预训练架构",
      "summary": "TrOCR 提出了首个端到端纯 Transformer 架构的 OCR 模型，通过利用预训练的图像 Transformer（DeiT/BEiT）作为编码器和预训练的语言模型（RoBERTa）作为解码器，在无需 CNN 和 RNN 的情况下，在印刷文本、手写文本和场景文本识别任务上均达到了 SOTA 性能。",
      "keyPoints": [
        "首个纯 Transformer 的 OCR 架构：完全摒弃 CNN 特征提取器和 RNN 序列建模器，仅使用 Transformer encoder-decoder 结构",
        "编码器采用预训练图像 Transformer（DeiT/BEiT），将输入图像分割为 16×16 patch 序列作为视觉特征",
        "解码器采用预训练语言模型（RoBERTa/MiniLM），通过交叉注意力机制融合视觉信息进行自回归文本生成",
        "三种模型规模：TrOCR_SMALL（62M）、TrOCR_BASE（334M）、TrOCR_LARGE（558M）",
        "两阶段预训练策略：第一阶段使用 684M 合成印刷文本行，第二阶段使用合成手写文本数据",
        "在 SROIE（F1=96.58）、IAM（CER=2.89）等基准上达到 SOTA，无需外部语言模型或复杂后处理"
      ],
      "detail": "<p><img alt=\"TrOCR 模型架构图\" src=\"https://arxiv.org/html/2109.10282v2/x1.png\" />\n<em>图：TrOCR 的 encoder-decoder 架构。编码器将输入图像分割为固定大小的 patch 并提取视觉特征，解码器以自回归方式生成文本 token。</em></p>\n<pre><code class=\"language-python\"># TrOCR 推理伪代码\ndef trocr_inference(image):\n    # 1. 图像预处理：resize 到 384x384\n    image = resize(image, (384, 384))\n\n    # 2. Patch Embedding：分割为 16x16 的 patch\n    patches = split_into_patches(image, patch_size=16)  # 得到 (384/16)^2 = 576 个 patch\n\n    # 3. 编码器：预训练 ViT/BEiT 提取视觉特征\n    visual_features = encoder(patches)  # [576, hidden_dim]\n\n    # 4. 解码器：自回归生成文本\n    tokens = [BOS]\n    while tokens[-1] != EOS:\n        # 自注意力 + 交叉注意力（attend to visual_features）\n        logits = decoder(tokens, visual_features)\n        next_token = beam_search(logits)\n        tokens.append(next_token)\n\n    return tokenizer.decode(tokens)\n</code></pre>\n<p><strong>动机与背景</strong></p>\n<p>传统 OCR 系统通常采用 CNN+RNN 的混合架构：CNN 作为视觉特征提取器，RNN（如 LSTM/GRU）作为序列建模器，再配合 CTC 解码或注意力机制进行文本输出。这种流水线式设计存在以下问题：</p>\n<ol>\n<li>CNN 和 RNN 的组合增加了模型复杂度，难以端到端优化</li>\n<li>无法充分利用大规模预训练模型的知识迁移能力</li>\n<li>通常需要外部语言模型（External LM）进行后处理以提升准确率</li>\n</ol>\n<p>TrOCR 的核心动机是：既然 Transformer 在 CV（ViT、BEiT）和 NLP（BERT、GPT）领域都已证明了强大的表示能力，能否构建一个纯 Transformer 的 OCR 模型，同时利用两个领域的预训练知识？</p>\n<p><strong>核心机制：Encoder-Decoder 架构</strong></p>\n<p>TrOCR 采用标准的 Transformer encoder-decoder 架构，但创新性地将预训练的视觉 Transformer 和语言模型分别作为编码器和解码器的初始化：</p>\n<p><strong>编码器（Image Transformer）：</strong></p>\n<p>输入图像首先被 resize 到 \\(384 \\times 384\\) 的固定分辨率，然后分割为 \\(16 \\times 16\\) 的不重叠 patch，得到 \\((384/16)^2 = 576\\) 个 patch 序列。每个 patch 通过线性投影映射为一个 embedding 向量，加上可学习的位置编码后送入 Transformer 编码器：</p>\n<p>$$\\mathbf{z}_0 = [\\mathbf{x}_1 E; \\mathbf{x}_2 E; \\ldots; \\mathbf{x}_N E] + \\mathbf{E}_{pos}$$</p>\n<p>其中 \\(E \\in \\mathbb{R}^{P^2 \\cdot C \\times D}\\) 是 patch 投影矩阵，\\(\\mathbf{E}_{pos}\\) 是位置编码。编码器支持三种预训练初始化：\n- <strong>DeiT</strong>（Data-efficient Image Transformer）：在 ImageNet 上通过知识蒸馏训练\n- <strong>BEiT</strong>（Bidirectional Encoder representation from Image Transformers）：使用 masked image modeling 自监督预训练</p>\n<p>实验表明 BEiT 编码器性能最优，因为其自监督预训练目标与 OCR 的视觉理解需求更匹配。</p>\n<p><strong>解码器（Language Model Transformer）：</strong></p>\n<p>解码器使用标准 Transformer decoder 结构，包含 masked self-attention 和 cross-attention 层。关键创新在于使用预训练语言模型（RoBERTa）初始化解码器权重：</p>\n<p>$$\\text{CrossAttn}(Q, K, V) = \\text{softmax}\\left(\\frac{Q K^T}{\\sqrt{d_k}}\\right) V$$</p>\n<p>其中 \\(Q\\) 来自解码器的 self-attention 输出，\\(K, V\\) 来自编码器的视觉特征。由于原始 RoBERTa 没有 cross-attention 层，这些层采用随机初始化。解码器以自回归方式逐 token 生成输出文本，使用 BPE（Byte Pair Encoding）分词。</p>\n<div class=\"key-point\">💡 关键：TrOCR 的解码器同时承担了\"语言模型\"和\"序列解码器\"的双重角色——预训练的 RoBERTa 权重提供了强大的语言先验，使模型无需外部语言模型即可生成流畅准确的文本。</div>\n<p><strong>两阶段预训练策略</strong></p>\n<p>TrOCR 采用精心设计的两阶段预训练：</p>\n<ul>\n<li><strong>第一阶段</strong>：使用大规模合成印刷文本数据（684M 文本行，从 IIT-CDIP 文档数据集通过文本渲染引擎生成）进行预训练，使模型学习基本的视觉-文本对齐能力</li>\n<li><strong>第二阶段</strong>：使用合成手写文本数据（从 IAM 手写风格生成的 17.9M 文本行）继续预训练，使模型适应手写文本的视觉特征</li>\n</ul>\n<p>数据增强策略包括：RandAugment、随机旋转（-15°~15°）、高斯模糊和图像质量退化（JPEG 压缩、高斯噪声等）。</p>\n<p><strong>与传统方法的区别</strong></p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>传统 OCR (CNN+RNN)</th>\n<th>TrOCR</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>视觉特征提取</td>\n<td>CNN (ResNet等)</td>\n<td>Image Transformer (ViT/BEiT)</td>\n</tr>\n<tr>\n<td>序列建模</td>\n<td>RNN (LSTM/GRU)</td>\n<td>Transformer Decoder</td>\n</tr>\n<tr>\n<td>解码方式</td>\n<td>CTC / Attention</td>\n<td>自回归 + Beam Search</td>\n</tr>\n<tr>\n<td>预训练利用</td>\n<td>有限（ImageNet CNN）</td>\n<td>充分（CV+NLP 双预训练）</td>\n</tr>\n<tr>\n<td>外部语言模型</td>\n<td>通常需要</td>\n<td>不需要</td>\n</tr>\n<tr>\n<td>输入处理</td>\n<td>特征图 + 序列化</td>\n<td>Patch 序列化</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"warn-box\">⚠️ 注意：TrOCR 的成功关键不仅在于架构设计，更在于充分利用了预训练模型的知识迁移。消融实验表明，去除预训练初始化会导致性能显著下降（IAM 上 CER 从 4.22 升至 7.01）。</div>\n<p><strong>实验结果</strong></p>\n<p>TrOCR 在三个主要基准上验证了有效性：\n- <strong>SROIE</strong>（印刷收据）：TrOCR_LARGE 达到 F1=96.58，超越所有 CNN+RNN 基线\n- <strong>IAM</strong>（手写文本）：TrOCR_LARGE 达到 CER=2.89，在不使用外部 LM 的条件下创造新 SOTA\n- <strong>场景文本</strong>（6个标准基准）：TrOCR_LARGE 在 IC13 上达到 98.4% 准确率，整体与专用场景文本模型竞争力相当</p>",
      "quiz": {
        "q": "TrOCR 解码器使用预训练 RoBERTa 初始化时，哪一部分需要随机初始化？",
        "options": [
          "Self-attention 层的全部参数",
          "Cross-attention 层的参数",
          "Feed-forward 层的参数",
          "Token embedding 层的参数"
        ],
        "answer": 1,
        "explain": "RoBERTa 是纯编码器模型，不包含 cross-attention 层，因此 TrOCR 解码器中的 cross-attention 层只能随机初始化，其余层可从 RoBERTa 权重迁移。"
      }
    },
    {
      "id": "svtrv2",
      "num": 16,
      "name": "SVTRv2",
      "fullName": "场景视觉Transformer v2 (Scene Vision Transformer v2)",
      "year": "2025",
      "org": "Baidu Inc.",
      "parent": "trocr",
      "paperUrl": "https://arxiv.org/abs/2411.15858",
      "projectUrl": "",
      "category": "recognition",
      "motivation": "CTC架构超越Encoder-Decoder",
      "summary": "SVTRv2 提出多尺度缩放（MSR）、特征重排模块（FRM）和语义引导模块（SGM）三大创新组件，系统性解决了 CTC 模型在不规则文本识别上的短板，首次使纯 CTC 模型在 15 个场景中的 12 个超越了主流 Encoder-Decoder 方法。",
      "keyPoints": [
        "提出 Multi-Size Resizing（MSR）：根据文本宽高比将图像缩放到多个预定义尺寸，避免不规则文本被拉伸变形",
        "提出 Feature Rearrangement Module（FRM）：通过水平和垂直重排矩阵将 2D 特征图转换为 1D CTC 对齐序列，解决弯曲/旋转文本的对齐问题",
        "提出 Semantic Guidance Module（SGM）：利用 CTC 解码的初步结果通过交叉注意力将语言上下文注入视觉特征，弥补 CTC 缺乏语言建模的缺陷",
        "构建 U14M 基准：包含 1400 万真实文本图像的统一评测集，覆盖常规、弯曲、遮挡、长文本等 15 个场景",
        "SVTRv2-B 在 U14M 上达到 86.14% 准确率，比 MAERec 高 0.97% 且推理速度快 8 倍",
        "三个模块可即插即用到其他视觉骨干（ResNet、FocalNet、ConvNeXtV2、ViT、SVTR）"
      ],
      "detail": "<p><img alt=\"SVTRv2 整体架构图\" src=\"https://ar5iv.labs.arxiv.org/html/2411.15858/assets/x1.png\" />\n<em>图：SVTRv2 整体框架，包含 Multi-Size Resizing、视觉编码器、Feature Rearrangement Module 和 Semantic Guidance Module</em></p>\n<h5>动机与背景</h5>\n<p>场景文本识别（STR）的主流方法分为两类：基于 CTC 的方法和基于 Encoder-Decoder（EDTR）的方法。CTC 方法具有推理速度快、天然支持长文本的优势，但在不规则文本（弯曲、旋转、遮挡）上表现远逊于 EDTR。作者分析了 CTC 模型的三大瓶颈：</p>\n<ol>\n<li><strong>固定尺寸缩放导致变形</strong>：将不同宽高比的文本图像统一缩放到固定尺寸（如 32×128），导致弯曲/竖排文本严重变形</li>\n<li><strong>2D→1D 特征压缩丢失空间信息</strong>：CTC 需要将 2D 特征图按列压缩为 1D 序列，对于非水平排列的文本会导致字符错位</li>\n<li><strong>缺乏语言上下文建模</strong>：CTC 逐位置独立预测，无法利用语言先验修正遮挡/模糊字符</li>\n</ol>\n<h5>核心机制</h5>\n<p><strong>1. Multi-Size Resizing (MSR)</strong></p>\n<p>MSR 根据输入图像的宽高比 \\(r = W/H\\) 将其分配到预定义的尺寸集合中：</p>\n<p>$$S = \\{(H_1, W_1), (H_2, W_2), \\ldots, (H_N, W_N)\\}$$</p>\n<p>具体地，SVTRv2 定义了 4 个尺寸区间：\n- \\(R_1\\)：宽高比 &lt; 2，缩放到 64×128（适合竖排/方形文本）\n- \\(R_2\\)：宽高比 ∈ [2, 4)，缩放到 48×160\n- \\(R_3\\)：宽高比 ∈ [4, 8)，缩放到 32×256\n- \\(R_4\\)：宽高比 ≥ 8，缩放到 32×384（适合长文本）</p>\n<div class=\"key-point\">💡 关键：MSR 的核心思想是\"让缩放适应文本，而非让文本适应缩放\"。通过保持合理的宽高比，避免了弯曲文本被拉伸后字符粘连的问题。</div>\n<p><img alt=\"MSR 和 FRM 详细结构\" src=\"https://ar5iv.labs.arxiv.org/html/2411.15858/assets/x2.png\" />\n<em>图：(a) Multi-Size Resizing 策略示意；(b) Feature Rearrangement Module 结构</em></p>\n<p><strong>2. Feature Rearrangement Module (FRM)</strong></p>\n<p>FRM 解决的核心问题是：对于弯曲/旋转文本，简单的按列压缩会导致不同字符的特征混在同一列中。FRM 通过学习重排矩阵，将 2D 特征图中属于同一字符的特征聚合到正确的位置。</p>\n<p>设视觉编码器输出特征图 \\(F \\in \\mathbb{R}^{H' \\times W' \\times C}\\)，FRM 包含两个子模块：</p>\n<p><strong>水平重排（H-rearranging）</strong>：学习水平方向的重排矩阵 \\(M_h \\in \\mathbb{R}^{H' \\times W' \\times W'}\\)：</p>\n<p>$$F_h = M_h \\cdot F$$</p>\n<p>其中 \\(M_h\\) 对每一行学习一个 \\(W' \\times W'\\) 的软置换矩阵，将水平方向上错位的特征重新对齐。</p>\n<p><strong>垂直重排（V-rearranging）</strong>：学习垂直方向的重排矩阵 \\(M_v \\in \\mathbb{R}^{W' \\times H' \\times H'}\\)：</p>\n<p>$$F_v = M_v \\cdot F_h$$</p>\n<p>垂直重排将不同行中属于同一字符的特征聚合，最终通过列方向池化得到 1D 序列。</p>\n<div class=\"warn-box\">⚠️ 注意：FRM 的重排矩阵是通过网络预测的\"软\"矩阵（经 Softmax 归一化），而非硬置换，因此可以端到端训练。</div>\n<pre><code class=\"language-python\"># FRM 伪代码\ndef FRM(feature_map):\n    # feature_map: [B, H', W', C]\n\n    # 水平重排：对每行学习 W'×W' 的重排矩阵\n    M_h = predict_h_matrix(feature_map)  # [B, H', W', W']\n    M_h = softmax(M_h, dim=-1)\n    F_h = einsum('bhwk,bhkc-&gt;bhwc', M_h, feature_map)\n\n    # 垂直重排：对每列学习 H'×H' 的重排矩阵\n    M_v = predict_v_matrix(F_h)  # [B, W', H', H']\n    M_v = softmax(M_v, dim=-1)\n    F_v = einsum('bwhn,bhnc-&gt;bwhc', M_v, F_h.permute(0,2,1,3))\n\n    # 列方向池化得到 1D 序列\n    output = F_v.mean(dim=2)  # [B, W', C]\n    return output\n</code></pre>\n<p><strong>3. Semantic Guidance Module (SGM)</strong></p>\n<p>SGM 的目标是在不引入自回归解码器的前提下，为 CTC 模型注入语言上下文。其核心设计是一个\"先粗后精\"的两阶段预测：</p>\n<p><strong>阶段一（CTC 初步解码）</strong>：视觉特征经 CTC 头得到初步预测结果 \\(\\hat{Y}\\)</p>\n<p><strong>阶段二（语义增强）</strong>：\n1. 将 \\(\\hat{Y}\\) 通过嵌入层得到语义查询 \\(Q_s\\)\n2. 使用 Transformer 解码器中的交叉注意力，以 \\(Q_s\\) 为 Query、视觉特征为 Key/Value：</p>\n<p>$$F_{enhanced} = \\text{CrossAttn}(Q_s, F_{visual}, F_{visual}) + F_{visual}$$</p>\n<ol>\n<li>增强后的特征再次通过 CTC 头得到最终预测</li>\n</ol>\n<div class=\"key-point\">💡 关键：SGM 的精妙之处在于利用 CTC 自身的初步预测作为\"语义锚点\"，通过交叉注意力让模型关注与语义相关的视觉区域，从而修正遮挡/模糊导致的错误。这种设计保持了 CTC 的并行解码优势，不引入自回归的速度开销。</div>\n<p>训练时使用 Ground Truth 标签替代 CTC 预测作为语义输入（Teacher Forcing），损失函数为：</p>\n<p>$$\\mathcal{L} = \\mathcal{L}_{CTC}^{(1)} + \\mathcal{L}_{CTC}^{(2)}$$</p>\n<p>其中 \\(\\mathcal{L}_{CTC}^{(1)}\\) 和 \\(\\mathcal{L}_{CTC}^{(2)}\\) 分别是两阶段的 CTC 损失。</p>\n<h5>与传统方法的区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>传统 CTC (SVTR)</th>\n<th>Encoder-Decoder (MAERec)</th>\n<th>SVTRv2</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>解码方式</td>\n<td>CTC 并行</td>\n<td>自回归逐字</td>\n<td>CTC 并行（两阶段）</td>\n</tr>\n<tr>\n<td>不规则文本处理</td>\n<td>固定缩放</td>\n<td>注意力机制隐式处理</td>\n<td>MSR + FRM 显式处理</td>\n</tr>\n<tr>\n<td>语言建模</td>\n<td>无</td>\n<td>解码器隐式建模</td>\n<td>SGM 显式注入</td>\n</tr>\n<tr>\n<td>长文本支持</td>\n<td>✓（天然支持）</td>\n<td>✗（固定长度限制）</td>\n<td>✓（MSR 自适应）</td>\n</tr>\n<tr>\n<td>推理速度</td>\n<td>快</td>\n<td>慢（自回归）</td>\n<td>快（仅增加少量计算）</td>\n</tr>\n</tbody>\n</table></div>\n<h5>实验验证</h5>\n<p>消融实验证实了各模块的有效性：\n- <strong>MSR</strong>：在高宽高比文本（R1）上提升 15.3%，R2 上提升 5.2%\n- <strong>FRM</strong>：在遮挡文本（MO）上提升 2.46%，水平+垂直重排协同效果最佳\n- <strong>SGM</strong>：在遮挡场景文本（OST）上提升 5.11%，U14M 整体提升 2.28%</p>\n<p><img alt=\"定性对比结果\" src=\"https://ar5iv.labs.arxiv.org/html/2411.15858/assets/x4.png\" />\n<em>图：SVTRv2 与其他方法在不规则和遮挡文本上的定性对比。绿色为正确识别，红色为错误识别</em></p>",
      "quiz": {
        "q": "SVTRv2 中 Feature Rearrangement Module (FRM) 的主要作用是什么？",
        "options": [
          "通过数据增强生成更多弯曲文本训练样本",
          "学习重排矩阵将2D特征中属于同一字符的特征对齐到正确的CTC位置",
          "使用空间变换网络对输入图像进行矫正",
          "通过注意力机制替代CTC解码器实现自回归预测"
        ],
        "answer": 1,
        "explain": "FRM 通过学习水平和垂直方向的软重排矩阵，将弯曲/旋转文本的2D特征重新排列，使同一字符的特征聚合到正确的列位置，从而实现准确的CTC对齐。"
      }
    },
    {
      "id": "fots",
      "num": 17,
      "name": "FOTS",
      "fullName": "快速定向文本检测识别 (Fast Oriented Text Spotting)",
      "year": "2018",
      "org": "Megvii Technology",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/1801.01671",
      "projectUrl": "",
      "category": "e2e_spotting",
      "motivation": "RoIRotate实现首个实时端到端",
      "summary": "FOTS 提出了一种端到端可训练的统一网络，通过可微分的 RoIRotate 操作将文本检测与识别融合在共享卷积特征上，在实现多方向文本检测与识别的同时达到实时速度（22.6 fps），并在 ICDAR 2015 端到端识别任务上超越此前最优方法 15% 以上。",
      "keyPoints": [
        "<strong>端到端统一架构</strong>：检测与识别共享 ResNet-50 + FPN 特征提取骨干，避免两阶段方法的重复计算",
        "<strong>RoIRotate 操作</strong>：核心创新，通过仿射变换从共享特征图中提取任意方向文本区域特征，支持梯度反向传播",
        "<strong>检测分支</strong>：基于 EAST 的全卷积逐像素预测（分类分数 + 4 距离 + 1 旋转角度），配合 OHEM 和 IoU Loss",
        "<strong>识别分支</strong>：CNN（VGG-like 6 层卷积 + 高度方向 max-pool）→ BiLSTM → CTC 解码器",
        "<strong>实时性能</strong>：FOTS RT 版本（ResNet-34 骨干）达到 22.6 fps，端到端识别仅比纯检测多 2.5ms 开销",
        "<strong>多尺度测试</strong>：FOTS MS 在 ICDAR 2015 端到端 Strong 词典下达到 F=84.77",
        "<strong>互利训练</strong>：识别损失的监督信号帮助检测分支学习字符级细节特征，减少漏检、误检、断裂、合并四类错误"
      ],
      "detail": "<p><img alt=\"FOTS 整体架构图\" src=\"https://arxiv.org/html/1801.01671v2/extracted/figures/pipeline.png\" />\n<em>图：FOTS 端到端架构。共享特征经检测分支输出文本区域，RoIRotate 提取旋转区域特征送入识别分支。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># FOTS 端到端文本检测与识别流程\ndef FOTS_forward(image):\n    # 1. 共享特征提取\n    C2, C3, C4, C5 = ResNet50(image)  # 多尺度特征\n    # FPN 特征融合（自顶向下 + 横向连接）\n    P5 = conv1x1(C5)\n    P4 = conv1x1(C4) + upsample(P5)\n    P3 = conv1x1(C3) + upsample(P4)\n    P2 = conv1x1(C2) + upsample(P3)  # 1/4 分辨率\n    shared_features = conv3x3(P2)  # 最终共享特征图\n\n    # 2. 检测分支（逐像素预测）\n    score_map = conv(shared_features)      # H/4 × W/4, 1ch (文本/非文本)\n    geo_map = conv(shared_features)        # H/4 × W/4, 4ch (到上下左右边界距离)\n    angle_map = conv(shared_features)      # H/4 × W/4, 1ch (旋转角度)\n\n    # 3. NMS 后处理得到文本区域\n    text_regions = NMS(score_map, geo_map, angle_map, threshold=0.5)\n\n    # 4. RoIRotate：从共享特征中提取旋转文本区域\n    for region in text_regions:\n        # 仿射变换 + 双线性插值 → 固定高度8，宽度按比例\n        roi_features = affine_transform(shared_features, region)\n\n    # 5. 识别分支\n    cnn_out = RecogCNN(roi_features)       # 6层卷积，高度压缩为1\n    lstm_out = BiLSTM(cnn_out)             # 双向LSTM序列建模\n    text_result = CTC_decode(lstm_out)     # CTC 解码得到文本\n\n    return text_regions, text_result\n\n# 训练损失\nL_total = L_detect + λ * L_recog  # λ = 1\nL_detect = L_cls(OHEM) + λ_geo * L_geo(IoU_loss + angle_loss)\nL_recog = CTC_loss(predicted_sequence, ground_truth_text)\n</code></pre>\n<h5>动机与背景</h5>\n<p>传统场景文本识别系统采用两阶段流水线：先用检测模型定位文本区域，再将裁剪的图像块送入独立的识别模型。这种方法存在三个核心问题：</p>\n<ol>\n<li><strong>计算冗余</strong>：检测和识别各自维护独立的特征提取网络，重复计算卷积特征</li>\n<li><strong>误差累积</strong>：检测错误直接传播到识别阶段，无法通过识别反馈修正检测</li>\n<li><strong>速度瓶颈</strong>：两个网络串行执行，难以达到实时速度</li>\n</ol>\n<p>FOTS 的核心思想是：既然检测和识别都依赖图像的视觉特征，为何不共享一个特征提取器，让两个任务互相促进？</p>\n<h5>核心机制：RoIRotate</h5>\n<p>RoIRotate 是连接检测与识别的桥梁，其核心挑战在于：如何从共享特征图中提取<strong>任意方向</strong>的文本区域特征，同时保持<strong>可微分</strong>以支持端到端训练。</p>\n<p>给定一个旋转文本区域（由中心点、宽高、旋转角度定义），RoIRotate 执行以下步骤：</p>\n<ol>\n<li><strong>构建仿射变换矩阵</strong>：将目标输出坐标映射回原始特征图坐标</li>\n</ol>\n<p>$$T = \\begin{pmatrix} \\cos\\theta & -\\sin\\theta & t_x \\\\ \\sin\\theta & \\cos\\theta & t_y \\end{pmatrix}$$</p>\n<p>其中 \\(\\theta\\) 为文本区域旋转角度，\\((t_x, t_y)\\) 为平移参数。</p>\n<ol>\n<li><strong>坐标映射</strong>：对输出特征图的每个位置 \\((x^t, y^t)\\)，计算其在输入特征图上的对应位置：</li>\n</ol>\n<p>$$\\begin{pmatrix} x^s \\\\ y^s \\end{pmatrix} = T \\begin{pmatrix} x^t \\\\ y^t \\\\ 1 \\end{pmatrix}$$</p>\n<ol>\n<li><strong>双线性插值采样</strong>：由于映射后的坐标通常不是整数，使用双线性插值从四个相邻像素获取特征值，保证梯度可传播。</li>\n</ol>\n<div class=\"key-point\">💡 关键：与传统 RoI Pooling 使用最大池化不同，RoIRotate 使用双线性插值，这使得梯度能够平滑地传回特征图的每个位置，实现真正的端到端训练。</div>\n<p>输出特征的高度固定为 8 像素，宽度根据文本区域的宽高比动态调整，保持原始比例关系。</p>\n<h5>检测分支设计</h5>\n<p>检测分支基于 EAST 的设计理念，采用全卷积网络进行逐像素预测：</p>\n<ul>\n<li><strong>分类分数</strong>：每个像素预测属于文本区域的概率</li>\n<li><strong>几何信息</strong>：每个正样本像素预测到文本框上、下、左、右四条边的距离 + 旋转角度 \\(\\theta \\in [-\\pi/4, \\pi/4]\\)</li>\n</ul>\n<p>检测损失函数：</p>\n<p>$$L_{detect} = L_{cls} + \\lambda_{geo} \\cdot L_{geo}$$</p>\n<p>其中分类损失使用交叉熵配合 OHEM（每张图选 512 困难负样本 + 512 随机负样本 + 全部正样本，正负比从 1:60 提升到 1:3）。</p>\n<p>几何损失采用 IoU Loss + 角度损失：</p>\n<p>$$L_{geo} = -\\log \\text{IoU}(\\hat{R}, R^*) + \\lambda_\\theta (1 - \\cos(\\hat{\\theta} - \\theta^*))$$</p>\n<div class=\"key-point\">💡 关键：IoU Loss 对不同尺度的文本框具有天然的尺度不变性，避免了 L1/L2 回归对大框偏向的问题。</div>\n<h5>识别分支设计</h5>\n<p>识别分支接收 RoIRotate 输出的固定高度特征序列：</p>\n<ol>\n<li><strong>CNN 编码器</strong>：6 层卷积（类 VGG 结构），通过高度方向的 max-pooling 将特征压缩为高度=1 的序列</li>\n<li><strong>BiLSTM</strong>：双向 LSTM 捕获序列上下文依赖</li>\n<li><strong>CTC 解码</strong>：使用 Connectionist Temporal Classification 处理不定长文本输出，无需字符级对齐标注</li>\n</ol>\n<p>CTC 损失定义为：</p>\n<p>$$L_{recog} = -\\log p(\\text{target} | \\text{features})$$</p>\n<p>其中概率通过对所有合法路径求和得到（CTC forward-backward 算法）。</p>\n<h5>训练策略</h5>\n<ul>\n<li><strong>预训练</strong>：ImageNet 预训练 ResNet-50 骨干</li>\n<li><strong>第一阶段</strong>：Synth800K 合成数据训练 10 个 epoch</li>\n<li><strong>第二阶段</strong>：真实数据（ICDAR 2017 MLT + ICDAR 2015 + ICDAR 2013）微调至收敛</li>\n<li><strong>数据增强</strong>：长边缩放 640-2560 → 随机旋转 [-10°, 10°] → 高度缩放 0.8-1.2 → 随机裁剪 640×640</li>\n<li><strong>训练时使用 GT 区域</strong>：识别分支训练时使用真实标注区域（非预测区域），避免早期检测不准影响识别训练</li>\n</ul>\n<h5>与传统方法的关键区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>两阶段方法</th>\n<th>FOTS</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>特征提取</td>\n<td>检测+识别各自独立</td>\n<td>共享骨干网络</td>\n</tr>\n<tr>\n<td>方向处理</td>\n<td>需额外旋转校正</td>\n<td>RoIRotate 原生支持</td>\n</tr>\n<tr>\n<td>速度 (IC15)</td>\n<td>3.7 fps</td>\n<td>7.5 fps (2倍加速)</td>\n</tr>\n<tr>\n<td>模型参数</td>\n<td>63.90M (28.67+35.23)</td>\n<td>34.98M (减少45%)</td>\n</tr>\n<tr>\n<td>端到端训练</td>\n<td>❌ 分别训练</td>\n<td>✅ 联合优化</td>\n</tr>\n<tr>\n<td>识别对检测的反馈</td>\n<td>❌ 无</td>\n<td>✅ 减少漏检/误检/断裂/合并</td>\n</tr>\n</tbody>\n</table></div>\n<h5>实验结果</h5>\n<p>FOTS 在三个主流基准上取得了当时的最优性能：</p>\n<ul>\n<li><strong>ICDAR 2015 检测</strong>：F-measure = 87.99%（单尺度），91.99%（多尺度）</li>\n<li><strong>ICDAR 2015 端到端</strong>：Strong=81.09%, Weak=75.90%, Generic=60.80%（单尺度）</li>\n<li><strong>ICDAR 2017 MLT 检测</strong>：F-measure = 62.30%（单尺度），67.25%（多尺度）</li>\n<li><strong>ICDAR 2013 检测</strong>：F-measure = 92.82%（多尺度，DetEval）</li>\n</ul>\n<div class=\"warn-box\">⚠️ 注意：FOTS 在 ICDAR 2015 端到端任务上超越此前最优方法（SegLink + CRNN）15% 以上，证明了端到端联合训练的巨大优势。</div>",
      "quiz": {
        "q": "FOTS 中 RoIRotate 相比传统 RoI Pooling 的核心区别是什么？",
        "options": [
          "使用最大池化提取固定尺寸特征",
          "通过仿射变换和双线性插值提取旋转区域特征，支持梯度反向传播",
          "仅支持水平方向的文本区域提取",
          "需要预先将图像旋转为水平方向再提取特征"
        ],
        "answer": 1,
        "explain": "RoIRotate 通过仿射变换处理任意方向的文本区域，使用双线性插值（而非最大池化）保证梯度可微，实现端到端训练。"
      }
    },
    {
      "id": "mask_textspotter",
      "num": 18,
      "name": "Mask TextSpotter",
      "fullName": "掩码文本检测器 (Mask TextSpotter)",
      "year": "2018",
      "org": "Huazhong University of Science and Technology",
      "parent": "fots",
      "paperUrl": "https://arxiv.org/abs/1807.02242",
      "projectUrl": "",
      "category": "e2e_spotting",
      "motivation": "像素级分割支持任意形状",
      "summary": "Mask TextSpotter 将 Mask R-CNN 引入场景文本检测与识别，通过语义分割（字符级像素预测）实现端到端文本定位与识别，首次在统一网络中支持任意形状（含弯曲）文本的检测与识别。",
      "keyPoints": [
        "基于 Mask R-CNN 框架：FPN (ResNet-50) + RPN + Fast R-CNN + Mask Branch 构成统一网络",
        "Mask Branch 输出 38 通道分割图（32×128）：1 个全局文本实例图 + 36 个字符类别图 + 1 个背景图",
        "像素投票算法（Pixel Voting）：通过背景图二值化获取连通域，再对每个连通域进行字符类别概率投票，实现字符识别",
        "加权编辑距离（Weighted Edit Distance）：利用字符概率信息为删除/插入/替换操作赋予不同代价，提升词典匹配精度",
        "全局文本图提供精确多边形检测输出，支持任意形状文本定位",
        "端到端可训练：检测与识别共享特征，联合优化",
        "在 ICDAR2013、ICDAR2015、Total-Text 三个数据集上达到当时 SOTA"
      ],
      "detail": "<h5>架构总览</h5>\n<p><img alt=\"Mask TextSpotter 架构图\" src=\"https://ar5iv.labs.arxiv.org/html/1807.02242/assets/x1.png\" />\n<em>图：Mask TextSpotter 整体网络架构。输入图像经 FPN 提取多尺度特征，RPN 生成候选区域，Fast R-CNN 进行分类与回归，Mask Branch 输出文本实例分割图和字符分割图。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># Mask TextSpotter 推理流程\ndef inference(image):\n    # 1. 特征提取\n    features = FPN(ResNet50(image))  # 多尺度特征 P2-P5\n\n    # 2. 区域提议\n    proposals = RPN(features)\n\n    # 3. Fast R-CNN 分类与回归\n    boxes, scores = FastRCNN(features, proposals)\n    boxes = NMS(boxes, scores, threshold=0.5)\n\n    # 4. Mask Branch: RoI → 38通道分割图\n    for box in boxes:\n        roi_feat = RoIAlign(features, box, size=(16, 64))\n        masks = MaskBranch(roi_feat)  # shape: (38, 32, 128)\n\n        # 4a. 全局文本图 → 多边形检测\n        text_mask = masks[0]  # 二值文本区域\n        polygon = extract_contour(text_mask)\n\n        # 4b. 字符图 → 像素投票识别\n        bg_map = masks[37]  # 背景图\n        char_maps = masks[1:37]  # 36个字符类别图\n\n        # 二值化背景图，获取字符连通域\n        binary_bg = (bg_map &lt; 192/255)\n        regions = connected_components(binary_bg)\n\n        # 对每个连通域投票得到字符类别\n        text = &quot;&quot;\n        for region in sorted(regions, key=lambda r: r.x_center):\n            probs = mean(char_maps[:, region.pixels], axis=1)\n            char = argmax(probs)  # 0-9, a-z\n            text += decode(char)\n\n    # 5. 加权编辑距离进行词典匹配（可选）\n    if lexicon:\n        text = weighted_edit_distance_match(text, char_probs, lexicon)\n\n    return polygons, texts\n</code></pre>\n<h5>动机与背景</h5>\n<p>传统端到端文本识别方法（如 FOTS、Deep TextSpotter）依赖序列解码器（CTC/Attention），将文本视为一维序列。这种设计存在根本性局限：</p>\n<ol>\n<li><strong>无法处理弯曲文本</strong>：序列解码器假设文本沿水平方向排列，对曲线文本需要额外的矫正步骤</li>\n<li><strong>检测精度受限</strong>：通常输出矩形或四边形框，无法精确描述任意形状文本边界</li>\n<li><strong>训练复杂度高</strong>：CTC 解码需要处理对齐问题，Attention 机制引入额外计算开销</li>\n</ol>\n<p>Mask TextSpotter 的核心洞察是：<strong>将文本识别转化为像素级语义分割问题</strong>。每个字符在空间上占据特定区域，通过预测每个像素属于哪个字符类别，可以自然地处理任意形状文本，无需显式的序列建模。</p>\n<h5>核心机制详解</h5>\n<p><strong>1. 网络骨架与特征提取</strong></p>\n<p>采用 ResNet-50 + FPN 作为骨架网络，生成 \\(P_2, P_3, P_4, P_5\\) 四个尺度的特征图。RPN 在所有尺度上生成候选区域，Fast R-CNN 对候选区域进行文本/非文本分类和边界框回归。</p>\n<p><strong>2. Mask Branch 设计</strong></p>\n<p>Mask Branch 是本文的核心创新。对于每个文本候选区域：</p>\n<ul>\n<li>通过 RoIAlign 提取 \\(16 \\times 64\\) 的特征图（高×宽，适配文本纵横比）</li>\n<li>经过 4 个 \\(3\\times3\\) 卷积层（256通道）+ 1 个反卷积层上采样至 \\(32 \\times 128\\)</li>\n<li>最终输出 38 个通道的分割图：</li>\n</ul>\n<p>$$\\text{Output} \\in \\mathbb{R}^{38 \\times 32 \\times 128}$$</p>\n<p>其中：\n- 通道 0：全局文本实例分割图（前景/背景）\n- 通道 1-36：36 个字符类别分割图（0-9 + a-z）\n- 通道 37：背景分割图</p>\n<div class=\"key-point\">💡 关键：字符分割图和背景图共同构成 37 类空间 softmax 分类，每个像素被分配到 36 个字符类别或背景之一。</div>\n<p><strong>3. 损失函数</strong></p>\n<p>总损失由四部分组成：</p>\n<p>$$L = L_{rpn} + L_{rcnn} + \\lambda_1 L_{global} + \\lambda_2 L_{char}$$</p>\n<ul>\n<li>\\(L_{global}\\)：全局文本图的二值交叉熵损失（sigmoid 激活）</li>\n</ul>\n<p>$$L_{global} = -\\frac{1}{N}\\sum_{i}[y_i \\log(\\hat{y}_i) + (1-y_i)\\log(1-\\hat{y}_i)]$$</p>\n<ul>\n<li>\\(L_{char}\\)：字符分割图的加权空间 softmax 损失（37 类）</li>\n</ul>\n<p>$$L_{char} = -\\frac{1}{N_{pos}}\\sum_{i \\in \\text{pos}} w_i \\log\\frac{e^{x_{i,c_i}}}{\\sum_{k=0}^{36} e^{x_{i,k}}}$$</p>\n<p>其中 \\(w_i\\) 为权重（仅对文本区域内像素计算损失），\\(c_i\\) 为像素 \\(i\\) 的真实字符类别。</p>\n<div class=\"warn-box\">⚠️ 注意：字符损失仅在有字符级标注的样本上计算。对于只有词级标注的数据（如 ICDAR2015），仅使用 \\(L_{global}\\) 进行 Mask Branch 的监督。</div>\n<p><strong>4. 像素投票算法</strong></p>\n<p>推理时的字符识别流程：</p>\n<ol>\n<li>将背景图以阈值 192（0-255 范围）二值化，得到前景区域</li>\n<li>对前景区域进行连通域分析，每个连通域对应一个字符</li>\n<li>对每个连通域内的像素，计算其在 36 个字符通道上的平均概率</li>\n<li>取概率最大的类别作为该字符的识别结果</li>\n<li>按连通域中心的水平位置从左到右排列，组成最终文本</li>\n</ol>\n<p><strong>5. 加权编辑距离</strong></p>\n<p>标准编辑距离对所有操作赋予相同代价（=1），无法区分高置信度和低置信度字符。本文提出加权版本：</p>\n<p>$$D_{a,b}(i,j) = \\min\\begin{cases} D_{a,b}(i-1,j) + C_d \\\\ D_{a,b}(i,j-1) + C_i \\\\ D_{a,b}(i-1,j-1) + C_r \\cdot \\mathbf{1}_{(a_i \\neq b_j)} \\end{cases}$$</p>\n<p>其中删除代价 \\(C_d\\)、插入代价 \\(C_i\\)、替换代价 \\(C_r\\) 均由像素投票产生的字符概率决定：\n- 高置信度字符的删除/替换代价更高\n- 低置信度字符的删除/替换代价更低</p>\n<p>这使得词典匹配更倾向于修改不确定的字符，保留确定的字符。</p>\n<h5>标签生成策略</h5>\n<p>训练标签的生成需要将字符级标注映射到 Mask Branch 的输出空间：</p>\n<ol>\n<li>将文本多边形标注转换为水平矩形作为 RPN/Fast R-CNN 的训练目标</li>\n<li>对于 Mask Branch：将字符框坐标通过仿射变换映射到 \\(32 \\times 128\\) 的输出空间</li>\n<li>全局文本图标签：文本多边形内部为 1，外部为 0</li>\n<li>字符图标签：每个字符框内的像素标记为对应字符类别</li>\n</ol>\n<h5>与传统方法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>FOTS/Li et al.</th>\n<th>Deep TextSpotter</th>\n<th>Mask TextSpotter</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>识别方式</td>\n<td>CTC 序列解码</td>\n<td>CTC 序列解码</td>\n<td>像素级分割</td>\n</tr>\n<tr>\n<td>文本形状</td>\n<td>仅水平/多方向</td>\n<td>仅水平/多方向</td>\n<td><strong>任意形状（含弯曲）</strong></td>\n</tr>\n<tr>\n<td>检测输出</td>\n<td>矩形/四边形</td>\n<td>矩形</td>\n<td><strong>多边形</strong></td>\n</tr>\n<tr>\n<td>训练难度</td>\n<td>需 CTC 对齐</td>\n<td>需采样策略</td>\n<td>简单直接</td>\n</tr>\n<tr>\n<td>字符级监督</td>\n<td>不需要</td>\n<td>不需要</td>\n<td>需要（可选）</td>\n</tr>\n</tbody>\n</table></div>\n<h5>实验结果</h5>\n<p>在三个基准数据集上的端到端识别性能：</p>\n<p><strong>ICDAR2013</strong>（水平文本）：E2E Strong=92.2%, Weak=91.1%, Generic=86.5%</p>\n<p><strong>ICDAR2015</strong>（多方向文本，输入 1600）：E2E Strong=79.3%, Weak=73.0%, Generic=62.4%</p>\n<p><strong>Total-Text</strong>（弯曲文本）：E2E None=52.9%, Full=71.8%（超越 TextBoxes 16.6%+）</p>\n<p>检测性能：ICDAR2013 F=91.7%, ICDAR2015 F=86.0%, Total-Text F=61.3%</p>\n<p>速度：720×1280 输入下 6.9 FPS</p>",
      "quiz": {
        "q": "Mask TextSpotter 的 Mask Branch 输出 38 个通道，其中字符识别是如何实现的？",
        "options": [
          "通过 CTC 解码器对特征序列进行序列到序列的转录",
          "对 36 个字符通道和 1 个背景通道进行空间 softmax，再通过连通域像素投票确定字符类别",
          "使用 Attention 机制对 RoI 特征进行逐字符解码",
          "将 38 个通道直接映射为字符序列的 one-hot 编码"
        ],
        "answer": 1,
        "explain": "Mask TextSpotter 将识别建模为像素级分类：37 类空间 softmax（36 字符+背景）产生每像素概率，推理时先二值化背景图获取连通域，再对每个连通域内像素的字符概率取均值投票，得到最终字符类别。"
      }
    },
    {
      "id": "mask_textspotter_v3",
      "num": 19,
      "name": "Mask TextSpotter v3",
      "fullName": "掩码文本检测器v3 (Mask TextSpotter v3)",
      "year": "2020",
      "org": "Huazhong University of Science and Technology",
      "parent": "mask_textspotter",
      "paperUrl": "https://arxiv.org/abs/2007.09482",
      "projectUrl": "",
      "category": "e2e_spotting",
      "motivation": "SPN解决极端长宽比文本",
      "summary": "Mask TextSpotter v3 的核心目标是：SPN解决极端长宽比文本。",
      "keyPoints": [
        "核心动机：SPN解决极端长宽比文本",
        "演化来源：继承或改进自 mask_textspotter",
        "代表机构：Huazhong University of Science and Technology"
      ],
      "detail": "<p>SPN解决极端长宽比文本</p>"
    },
    {
      "id": "abcnet",
      "num": 20,
      "name": "ABCNet",
      "fullName": "自适应贝塞尔曲线网络 (Adaptive Bezier-Curve Network)",
      "year": "2020",
      "org": "University of Adelaide",
      "parent": "mask_textspotter",
      "paperUrl": "https://arxiv.org/abs/2002.10200",
      "projectUrl": "",
      "category": "e2e_spotting",
      "motivation": "贝塞尔曲线提速10倍",
      "summary": "ABCNet 的核心目标是：贝塞尔曲线提速10倍。",
      "keyPoints": [
        "核心动机：贝塞尔曲线提速10倍",
        "演化来源：继承或改进自 mask_textspotter",
        "代表机构：University of Adelaide"
      ],
      "detail": "<p>贝塞尔曲线提速10倍</p>"
    },
    {
      "id": "abcnet_v2",
      "num": 21,
      "name": "ABCNet v2",
      "fullName": "自适应贝塞尔曲线网络v2 (ABCNet v2)",
      "year": "2021",
      "org": "University of Adelaide",
      "parent": "abcnet",
      "paperUrl": "https://arxiv.org/abs/2105.03620",
      "projectUrl": "",
      "category": "e2e_spotting",
      "motivation": "自适应端到端增强对齐",
      "summary": "ABCNet v2 提出基于贝塞尔曲线的端到端任意形状文本检测与识别框架，通过 BezierAlign 实现曲线文本的精确特征对齐，结合注意力识别模块、CoordConv 和自适应端到端训练策略，在保持实时速度（10 FPS）的同时大幅提升了弯曲文本的识别精度。",
      "keyPoints": [
        "<strong>贝塞尔曲线检测</strong>：用三阶贝塞尔曲线（8 个控制点）参数化任意形状文本边界，替代传统矩形/多边形标注",
        "<strong>BezierAlign 特征对齐</strong>：沿贝塞尔曲线生成正交于文本方向的非矩形采样网格，精确裁剪弯曲文本特征",
        "<strong>CoordConv 增强</strong>：在 FPN 特征图上拼接归一化坐标通道，为检测分支提供显式位置信息",
        "<strong>注意力识别模块</strong>：6 层 CNN + BiLSTM + GRU Attention Decoder，支持 96 类英文和 5462 类中英文字符",
        "<strong>自适应端到端训练（AET）</strong>：根据检测分支精度自适应调整识别分支的训练样本来源（GT vs 预测框）",
        "<strong>BiFPN 特征融合</strong>：双向特征金字塔网络增强多尺度特征表达，仅损失 1 FPS",
        "<strong>模型量化</strong>：采用 LSQ（权重）+ PACT（激活）实现 INT8 量化，模型压缩 4× 且精度损失极小",
        "<strong>150K 贝塞尔曲线合成数据</strong>：基于 VGG Synth 方法生成含曲线文本的合成数据集用于预训练"
      ],
      "detail": "<p><img alt=\"ABCNet v2 整体架构\" src=\"https://ar5iv.labs.arxiv.org/html/2105.03620/assets/x2.png\" />\n<em>图：ABCNet v2 整体框架。输入图像经 ResNet-50 + BiFPN 提取多尺度特征，检测分支回归贝塞尔曲线控制点，BezierAlign 根据曲线参数从特征图中采样对齐的文本特征，送入注意力识别模块输出文本。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># ABCNet v2 端到端推理流程\ndef abcnet_v2_forward(image):\n    # 1. 特征提取\n    features = ResNet50(image)              # 多尺度特征 C2-C5\n    fpn_features = BiFPN(features)          # 双向特征金字塔融合\n    coord_features = CoordConv(fpn_features)  # 拼接 (x, y) 归一化坐标\n\n    # 2. 检测分支：回归贝塞尔曲线控制点\n    proposals = RPN(coord_features)         # 生成候选区域\n    bezier_points = BezierHead(proposals)   # 回归 8 个控制点 (上下各4)\n    # bezier_points shape: (N, 8, 2) — N个文本实例\n\n    # 3. BezierAlign：沿曲线采样特征\n    for each detected bezier curve:\n        # 沿上下贝塞尔曲线等参数采样 W=32 个点\n        top_points = bezier_sample(top_curve, num=32)\n        bot_points = bezier_sample(bot_curve, num=32)\n        # 在每对上下点之间线性插值 H=8 个采样点\n        grid = linear_interpolate(top_points, bot_points, H=8)\n        # 双线性插值从特征图采样\n        text_feature = bilinear_sample(fpn_features, grid)  # (8, 32, C)\n\n    # 4. 识别分支：Attention Decoder\n    cnn_feat = RecogCNN(text_feature)       # 6层CNN降维\n    seq_feat = BiLSTM(cnn_feat)             # 序列建模\n    text = GRU_Attention_Decode(seq_feat)   # 逐字符解码\n\n    return bezier_points, text\n</code></pre>\n<h5>动机与背景</h5>\n<p>传统场景文本检测方法使用水平矩形框或旋转矩形框表示文本区域，这对于弯曲文本（如弧形招牌、瓶身文字）存在严重的几何失配问题。具体而言：</p>\n<ol>\n<li><strong>矩形框包含大量背景噪声</strong>：弯曲文本的矩形外接框中，文本像素占比可能不足 30%，大量背景干扰识别</li>\n<li><strong>RoIAlign 对曲线文本失效</strong>：标准 RoIAlign 假设文本区域为矩形，对弯曲文本的特征提取产生严重形变</li>\n<li><strong>多边形标注冗余</strong>：使用密集多边形点（如 CTW1500 的 28 点标注）表示文本边界参数过多，回归困难</li>\n</ol>\n<p>ABCNet v1 首次提出用贝塞尔曲线表示文本边界，ABCNet v2 在此基础上进行了全面升级。</p>\n<h5>核心机制一：贝塞尔曲线文本表示</h5>\n<p>三阶贝塞尔曲线由 4 个控制点 \\(\\{b_0, b_1, b_2, b_3\\}\\) 定义，参数方程为：</p>\n<p>$$\\mathbf{c}(t) = \\sum_{i=0}^{3} \\binom{3}{i} (1-t)^{3-i} t^i \\cdot b_i, \\quad t \\in [0, 1]$$</p>\n<p>文本实例用<strong>上下两条</strong>三阶贝塞尔曲线表示，共 8 个控制点。这种表示具有以下优势：\n- <strong>紧凑性</strong>：仅需 16 个坐标值（8 点 × 2 维）即可精确描述复杂曲线边界\n- <strong>连续性</strong>：贝塞尔曲线天然光滑，避免多边形的锯齿效应\n- <strong>可微性</strong>：曲线参数可直接通过网络回归，支持端到端训练</p>\n<div class=\"key-point\">💡 关键：控制点的生成采用最小二乘法拟合——给定多边形标注点，通过求解 \\(\\mathbf{b} = (\\mathbf{M}^T\\mathbf{M})^{-1}\\mathbf{M}^T\\mathbf{q}\\) 获得最优控制点，其中 \\(\\mathbf{M}\\) 为伯恩斯坦基函数矩阵，\\(\\mathbf{q}\\) 为标注点坐标。</div>\n<h5>核心机制二：BezierAlign</h5>\n<p>BezierAlign 是本文最核心的创新，解决了弯曲文本的特征对齐问题。与标准 RoIAlign 的关键区别在于<strong>采样网格的构造方式</strong>：</p>\n<ol>\n<li><strong>沿曲线等参数采样</strong>：在上下贝塞尔曲线上分别取 \\(W\\) 个等间距参数点（\\(t = 0, \\frac{1}{W-1}, \\frac{2}{W-1}, \\ldots, 1\\)）</li>\n<li><strong>正交插值</strong>：对每对上下对应点之间进行线性插值，生成 \\(H\\) 个中间采样点</li>\n<li><strong>双线性采样</strong>：将采样点映射到特征图坐标，通过双线性插值获取特征值</li>\n</ol>\n<p>采样网格的数学表达为：</p>\n<p>$$\\mathbf{p}(s, t) = (1 - s) \\cdot \\mathbf{c}_{top}(t) + s \\cdot \\mathbf{c}_{bot}(t), \\quad s \\in [0,1], t \\in [0,1]$$</p>\n<p>其中 \\(\\mathbf{c}_{top}(t)\\) 和 \\(\\mathbf{c}_{bot}(t)\\) 分别为上下贝塞尔曲线。最终采样网格大小为 \\(H \\times W = 8 \\times 32\\)。</p>\n<div class=\"warn-box\">⚠️ 注意：BezierAlign 的采样网格不再是矩形，而是随文本弯曲程度自适应变形的曲面网格。这使得提取的特征天然\"拉直\"了弯曲文本，无需额外的矫正步骤。</div>\n<p>消融实验证明了 BezierAlign 的巨大优势：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>采样方法</th>\n<th>E2E F-measure</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>水平采样</td>\n<td>38.4%</td>\n</tr>\n<tr>\n<td>四边形采样</td>\n<td>44.7%</td>\n</tr>\n<tr>\n<td><strong>BezierAlign</strong></td>\n<td><strong>61.9%</strong></td>\n</tr>\n</tbody>\n</table></div>\n<h5>核心机制三：CoordConv 位置编码</h5>\n<p>检测分支在 FPN 特征图上拼接两个额外通道——归一化的 x 和 y 坐标：</p>\n<p>$$\\mathbf{F}' = \\text{Concat}(\\mathbf{F}, \\mathbf{X}_{norm}, \\mathbf{Y}_{norm})$$</p>\n<p>其中 \\(\\mathbf{X}_{norm}(i,j) = \\frac{j}{W-1}\\)，\\(\\mathbf{Y}_{norm}(i,j) = \\frac{i}{H-1}\\)。这为卷积核提供了显式的空间位置信息，有助于精确回归控制点的绝对坐标。消融实验显示 CoordConv 带来 2.8%~2.9% 的端到端提升，且几乎无计算开销。</p>\n<h5>核心机制四：注意力识别模块</h5>\n<p>识别分支采用 Encoder-Decoder 架构：</p>\n<ul>\n<li><strong>Encoder</strong>：6 层 CNN（含 BN + ReLU）将 BezierAlign 输出的 \\(8 \\times 32\\) 特征压缩为 \\(1 \\times 32 \\times 256\\) 序列，再经 BiLSTM 建模长程依赖</li>\n<li><strong>Decoder</strong>：GRU + Attention 机制逐步解码字符序列</li>\n</ul>\n<p>注意力权重计算：</p>\n<p>$$e_{t,i} = \\mathbf{w}^T \\tanh(\\mathbf{W}_s \\mathbf{s}_t + \\mathbf{W}_h \\mathbf{h}_i + \\mathbf{b})$$\n$$\\alpha_{t,i} = \\frac{\\exp(e_{t,i})}{\\sum_j \\exp(e_{t,j})}$$</p>\n<p>其中 \\(\\mathbf{s}_t\\) 为解码器隐状态，\\(\\mathbf{h}_i\\) 为编码器第 \\(i\\) 步输出。相比 ABCNet v1 的 CTC 解码器，注意力机制在 Total-Text 上提升 2.7%，在 CTW1500 上提升 7.9%。</p>\n<h5>核心机制五：自适应端到端训练（AET）</h5>\n<p>端到端训练的难点在于：训练初期检测不准确，用预测框裁剪的特征质量差，会误导识别分支。AET 策略动态调整训练样本来源：</p>\n<p>$$\\text{sample} = \\begin{cases} \\text{GT boxes} & \\text{if IoU}_{det} < \\tau \\\\ \\alpha \\cdot \\text{GT} + (1-\\alpha) \\cdot \\text{Pred} & \\text{otherwise} \\end{cases}$$</p>\n<p>随着训练推进，检测精度提升，逐步增加预测框的比例，使识别分支适应真实推理时的输入分布。该策略带来 1.2%~1.7% 的额外提升。</p>\n<h5>与传统方法的区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>传统方法 (FOTS/Mask TextSpotter)</th>\n<th>ABCNet v2</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>文本表示</td>\n<td>矩形框/像素级分割</td>\n<td>贝塞尔曲线（8 控制点）</td>\n</tr>\n<tr>\n<td>特征对齐</td>\n<td>RoIAlign/RoIRotate</td>\n<td>BezierAlign（曲线自适应）</td>\n</tr>\n<tr>\n<td>弯曲文本处理</td>\n<td>需额外矫正网络</td>\n<td>天然支持，无需矫正</td>\n</tr>\n<tr>\n<td>推理速度</td>\n<td>1-5 FPS</td>\n<td><strong>10 FPS</strong>（快 2-10×）</td>\n</tr>\n<tr>\n<td>参数效率</td>\n<td>分割需像素级标注</td>\n<td>仅 16 个坐标值</td>\n</tr>\n</tbody>\n</table></div>\n<h5>主要实验结果</h5>\n<p>在多个基准上取得 SOTA 或接近 SOTA 的端到端文本识别性能：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>数据集</th>\n<th>E2E Hmean (None)</th>\n<th>速度</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Total-Text</td>\n<td>70.4% (73.5% 多尺度)</td>\n<td>10 FPS</td>\n</tr>\n<tr>\n<td>SCUT-CTW1500</td>\n<td>57.5%</td>\n<td>10 FPS</td>\n</tr>\n<tr>\n<td>ICDAR 2015 (Generic)</td>\n<td>73.0%</td>\n<td>10 FPS</td>\n</tr>\n<tr>\n<td>ReCTS (1-NED)</td>\n<td>62.7%</td>\n<td>10 FPS</td>\n</tr>\n</tbody>\n</table></div>\n<p>检测性能：Total-Text H=87.0%, ICDAR15 H=88.1%, ReCTS H=90.4%。</p>",
      "quiz": {
        "q": "ABCNet v2 中 BezierAlign 相比标准 RoIAlign 的核心区别是什么？",
        "options": [
          "使用更高分辨率的特征图进行采样",
          "沿贝塞尔曲线构建非矩形采样网格，使采样点正交于文本方向",
          "在采样后增加了额外的文本矫正网络",
          "使用可变形卷积替代双线性插值"
        ],
        "answer": 1,
        "explain": "BezierAlign 的核心创新在于采样网格不再是矩形，而是沿上下贝塞尔曲线构建的自适应曲面网格，采样点方向正交于文本走向，从而天然实现弯曲文本的特征'拉直'，无需额外矫正步骤。"
      }
    },
    {
      "id": "estextspotter",
      "num": 22,
      "name": "ESTextSpotter",
      "fullName": "显式协同文本检测器 (Explicit Synergy Text Spotter)",
      "year": "2023",
      "org": "The Chinese University of Hong Kong",
      "parent": "abcnet_v2",
      "paperUrl": "https://arxiv.org/abs/2308.10147",
      "projectUrl": "",
      "category": "e2e_spotting",
      "motivation": "Transformer显式检测识别协同",
      "summary": "ESTextSpotter 提出了显式协同（Explicit Synergy）机制，通过在 Transformer Decoder 中构建任务感知查询（Task-aware Queries）实现检测与识别的显式交互，并引入视觉-语言通信模块从跨模态视角增强协同，在多个场景文字识别基准上取得 SOTA 性能。",
      "keyPoints": [
        "<strong>显式协同 vs 隐式协同</strong>：区别于以往方法仅通过共享特征实现隐式协同，本文将每个查询分解为检测查询和识别查询，显式建模两任务的差异化特征需求并进行交互",
        "<strong>任务感知查询初始化（TAQI）</strong>：利用可学习嵌入为检测和识别查询提供不同的初始化，引导各自关注不同特征模式",
        "<strong>视觉-语言通信模块（VLC）</strong>：在 Decoder 层间引入跨模态交互，让检测查询（视觉）与识别查询（语言）相互增强",
        "<strong>感受野增强模块（REM）</strong>：在编码器中增强多尺度特征的感受野，提升对不同尺度文字的检测能力",
        "<strong>任务感知去噪训练（TADN）</strong>：针对文字识别任务特点设计去噪训练策略，同时对位置和文本内容添加噪声",
        "<strong>两种变体</strong>：ESTextSpotter-Polygon（多边形检测，适用于弯曲文本）和 ESTextSpotter-Quad（四边形检测，适用于多方向文本）",
        "<strong>SOTA 结果</strong>：TotalText 80.9% (None)、ICDAR2015 78.1% (Generic)、CTW1500 65.0% (None)"
      ],
      "detail": "<p><img alt=\"ESTextSpotter 整体架构图\" src=\"https://raw.githubusercontent.com/mxin262/ESTextSpotter/main/figs/overall.png\" />\n<em>图：ESTextSpotter 整体框架。输入图像经 CNN backbone 和 Transformer Encoder 提取多尺度特征，然后通过任务感知 Decoder 进行显式协同的检测与识别。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># ESTextSpotter 前向推理伪代码\ndef forward(image):\n    # 1. 特征提取\n    multi_scale_feats = backbone(image)          # CNN backbone (ResNet-50)\n    enhanced_feats = encoder(multi_scale_feats)  # Deformable Transformer Encoder + REM\n\n    # 2. 任务感知查询初始化 (TAQI)\n    content_query = learnable_embedding          # 共享内容查询\n    det_query = content_query + det_task_embed   # 检测查询 = 内容 + 检测任务嵌入\n    rec_query = content_query + rec_task_embed   # 识别查询 = 内容 + 识别任务嵌入\n    position_query = init_reference_points()     # 位置查询（参考点）\n\n    # 3. 任务感知 Decoder（逐层）\n    for layer in decoder_layers:\n        # 自注意力：检测查询和识别查询分别自注意力\n        det_query = self_attn(det_query)\n        rec_query = self_attn(rec_query)\n\n        # 显式交互：检测↔识别 交叉注意力\n        det_query = cross_attn(det_query, key=rec_query)\n        rec_query = cross_attn(rec_query, key=det_query)\n\n        # 交叉注意力：与编码器特征交互\n        det_query = deformable_cross_attn(det_query, enhanced_feats)\n        rec_query = deformable_cross_attn(rec_query, enhanced_feats)\n\n        # 视觉-语言通信 (VLC)\n        det_query, rec_query = VLC(det_query, rec_query)\n\n        # FFN\n        det_query = FFN(det_query)\n        rec_query = FFN(rec_query)\n\n    # 4. 预测头\n    boxes = det_head(det_query)       # 检测：边界框/多边形坐标\n    texts = rec_head(rec_query)       # 识别：字符序列\n    return boxes, texts\n</code></pre>\n<h5>动机与背景</h5>\n<p>场景文字识别（Text Spotting）需要同时完成文字检测和文字识别两个子任务。现有端到端方法大多采用<strong>隐式协同</strong>策略——即让检测和识别共享同一组特征或查询，期望模型自动学习两任务间的互利关系。然而，这种隐式方式存在根本缺陷：</p>\n<ol>\n<li><strong>特征需求冲突</strong>：检测任务需要关注文字区域的边界和形状（视觉/空间特征），而识别任务需要关注字符的语义内容（语言/纹理特征）。共享特征无法同时满足两者的差异化需求。</li>\n<li><strong>缺乏显式交互机制</strong>：隐式协同没有专门的模块确保两任务之间的信息流动，导致协同效果有限。</li>\n<li><strong>检测性能退化</strong>：实验表明，隐式协同虽能提升识别性能，但常常导致检测性能下降。</li>\n</ol>\n<div class=\"key-point\">💡 关键洞察：检测和识别虽然目标不同，但存在天然的互补关系——检测提供文字的位置和方向信息有助于确定阅读顺序，识别提供的语义信息有助于区分文字与背景。显式建模这种互补关系是提升整体性能的关键。</div>\n<h5>核心机制详解</h5>\n<p><strong>1. 任务感知查询分解</strong></p>\n<p>传统方法使用单一查询 \\(q\\) 同时服务于检测和识别。ESTextSpotter 将其分解为：</p>\n<p>$$q_{det} = q_{content} + e_{det}, \\quad q_{rec} = q_{content} + e_{rec}$$</p>\n<p>其中 \\(q_{content}\\) 是共享的内容查询，\\(e_{det}\\) 和 \\(e_{rec}\\) 分别是可学习的检测和识别任务嵌入。这种设计既保留了两任务的共性基础，又允许各自发展差异化的特征表示。</p>\n<p><strong>2. 显式交互机制</strong></p>\n<p>在每个 Decoder 层中，检测查询和识别查询通过交叉注意力进行显式交互：</p>\n<p>$$q_{det}' = \\text{CrossAttn}(Q=q_{det},\\ K=V=q_{rec})$$\n$$q_{rec}' = \\text{CrossAttn}(Q=q_{rec},\\ K=V=q_{det})$$</p>\n<p>这确保了检测信息（如文字方向、边界）能流向识别分支，识别信息（如字符语义）能流向检测分支。</p>\n<p><strong>3. 视觉-语言通信模块（VLC）</strong></p>\n<p>VLC 从跨模态视角进一步增强协同。检测查询本质上编码视觉/空间信息，识别查询编码语言/语义信息。VLC 通过额外的注意力层让两种模态的信息深度融合：</p>\n<p>$$q_{det}^{vlc} = \\text{Attn}(q_{det}',\\ q_{rec}') + q_{det}'$$\n$$q_{rec}^{vlc} = \\text{Attn}(q_{rec}',\\ q_{det}') + q_{rec}'$$</p>\n<div class=\"warn-box\">⚠️ 注意：VLC 与显式交互的区别在于，VLC 在交叉注意力之后额外进行，相当于\"二次融合\"，从跨模态角度进一步释放协同潜力。消融实验显示 VLC 为端到端识别带来 +1.3% 的提升。</div>\n<p><strong>4. 感受野增强模块（REM）</strong></p>\n<p>REM 在编码器输出特征上应用多尺度空洞卷积，增强对不同尺度文字实例的感知能力。这对于场景中同时存在大小差异悬殊的文字尤为重要。</p>\n<p><strong>5. 任务感知去噪训练（TADN）</strong></p>\n<p>借鉴 DN-DETR 的去噪训练思想，TADN 同时对 GT 边界框添加位置噪声和对 GT 文本添加字符噪声：</p>\n<ul>\n<li><strong>位置噪声</strong>：对 GT 框坐标添加随机偏移</li>\n<li><strong>文本噪声</strong>：随机替换 GT 文本中的部分字符</li>\n</ul>\n<p>模型需要从含噪输入中恢复正确的检测和识别结果，这加速了训练收敛并提升了最终性能（+1.1% E2E）。</p>\n<h5>损失函数</h5>\n<p>总损失由检测损失和识别损失组成：</p>\n<p>$$\\mathcal{L} = \\lambda_1 \\mathcal{L}_{focal} + \\lambda_2 \\mathcal{L}_{L1} + \\lambda_3 \\mathcal{L}_{GIoU} + \\lambda_4 \\mathcal{L}_{CE}$$</p>\n<p>其中：\n- \\(\\mathcal{L}_{focal}\\)：分类损失（Focal Loss），用于文字/非文字分类\n- \\(\\mathcal{L}_{L1}\\)：边界框回归的 L1 损失\n- \\(\\mathcal{L}_{GIoU}\\)：广义 IoU 损失，增强框回归精度\n- \\(\\mathcal{L}_{CE}\\)：字符识别的交叉熵损失</p>\n<p>训练采用匈牙利匹配进行预测与 GT 的一对一分配。</p>\n<h5>与传统方法的区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>隐式协同方法 (如 TESTR, DeepSolo)</th>\n<th>ESTextSpotter (显式协同)</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>查询设计</td>\n<td>单一共享查询</td>\n<td>任务感知分解查询</td>\n</tr>\n<tr>\n<td>交互方式</td>\n<td>无显式交互模块</td>\n<td>交叉注意力显式交互</td>\n</tr>\n<tr>\n<td>特征建模</td>\n<td>统一特征表示</td>\n<td>差异化特征 + 跨模态通信</td>\n</tr>\n<tr>\n<td>检测影响</td>\n<td>常导致检测退化</td>\n<td>检测和识别同时提升</td>\n</tr>\n<tr>\n<td>去噪训练</td>\n<td>仅位置噪声</td>\n<td>位置 + 文本联合噪声</td>\n</tr>\n</tbody>\n</table></div>",
      "quiz": {
        "q": "ESTextSpotter 中显式协同（Explicit Synergy）相比隐式协同（Implicit Synergy）的核心优势是什么？",
        "options": [
          "减少了模型参数量，提高推理速度",
          "通过任务感知查询分解和交叉注意力，同时提升检测和识别性能而非顾此失彼",
          "使用了更大的预训练数据集",
          "引入了外部语言模型进行文本纠错"
        ],
        "answer": 1,
        "explain": "隐式协同通过共享特征虽能提升识别但常导致检测退化；显式协同通过将查询分解为检测/识别专用查询并显式交互，使两任务互相促进而非冲突。"
      }
    },
    {
      "id": "layoutlm",
      "num": 23,
      "name": "LayoutLM",
      "fullName": "版面语言模型 (Layout Language Model)",
      "year": "2020",
      "org": "Microsoft Research Asia",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/1912.13318",
      "projectUrl": "",
      "category": "document_ai",
      "motivation": "融合文本版面图像预训练",
      "summary": "LayoutLM 的核心目标是：融合文本版面图像预训练。",
      "keyPoints": [
        "核心动机：融合文本版面图像预训练",
        "代表机构：Microsoft Research Asia"
      ],
      "detail": "<p>融合文本版面图像预训练</p>"
    },
    {
      "id": "layoutlmv3",
      "num": 24,
      "name": "LayoutLMv3",
      "fullName": "版面语言模型v3 (LayoutLMv3)",
      "year": "2022",
      "org": "Microsoft Research Asia",
      "parent": "layoutlm",
      "paperUrl": "https://arxiv.org/abs/2204.08387",
      "projectUrl": "",
      "category": "document_ai",
      "motivation": "统一MIM+MLM去除CNN",
      "summary": "LayoutLMv3 提出首个无需 CNN 的文档 AI 多模态预训练模型，通过统一的文本掩码语言建模（MLM）与图像掩码建模（MIM）目标，配合词-图块对齐（WPA）任务学习跨模态表示，在文本中心和图像中心的文档理解任务上均达到 SOTA。",
      "keyPoints": [
        "<strong>去除 CNN 依赖</strong>：用线性 Patch Embedding 替代 ResNet/ResNeXt 等 CNN 骨干提取图像特征，大幅简化架构并减少参数（133M vs LayoutLMv2 200M）",
        "<strong>统一离散 token 重建目标</strong>：文本端 MLM 重建词汇 ID，图像端 MIM 重建 DALL-E dVAE 离散 token，两者形式统一",
        "<strong>Word-Patch Alignment (WPA)</strong>：预测未掩码文本 token 对应的图像 patch 是否被掩码，学习细粒度跨模态对齐",
        "<strong>Segment-level 2D 布局位置编码</strong>：以 OCR segment（而非 word）为单位共享 2D 坐标，减少位置噪声",
        "<strong>通用预训练模型</strong>：同一模型在表单理解（FUNSD F1=92.08）、票据理解（CORD F1=97.46）、文档分类（RVL-CDIP Acc=95.93）、文档 VQA（DocVQA ANLS=83.37）和版面分析（PubLayNet mAP=95.1）上均 SOTA"
      ],
      "detail": "<h5>架构总览</h5>\n<p><img alt=\"LayoutLMv3 架构图\" src=\"https://ar5iv.labs.arxiv.org/html/2204.08387/assets/x2.png\" />\n<em>图：LayoutLMv3 模型架构与预训练目标。左侧为输入嵌入，右侧为三个预训练目标 MLM、MIM 和 WPA。</em></p>\n<p><img alt=\"与现有方法对比\" src=\"https://ar5iv.labs.arxiv.org/html/2204.08387/assets/x1.png\" />\n<em>图：LayoutLMv3 与 DocFormer、SelfDoc 在图像嵌入方式和预训练目标上的对比。LayoutLMv3 使用线性 patch 投影替代 CNN，使用离散 token 分类替代像素/区域特征回归。</em></p>\n<h5>算法核心流程</h5>\n<pre><code class=\"language-python\"># LayoutLMv3 预训练伪代码\n# 输入: 文档图像 I, OCR文本序列 w, 布局坐标 bbox\n\n# === 嵌入层 ===\n# 文本嵌入 (初始化自 RoBERTa)\ntext_emb = WordEmbed(w) + Pos1D(w) + LayoutPos2D(bbox)  # segment-level 2D pos\n\n# 图像嵌入 (无CNN, 线性投影)\npatches = reshape(I, [M, P*P*C])  # M=196 patches, P=16\nimage_emb = Linear(patches) + Pos1D_learnable(1..M)\n\n# 拼接输入统一 Transformer\nx = concat([CLS, text_emb, SEP, image_emb])\nh = Transformer(x)  # 12/24 layers\n\n# === 预训练目标 ===\n# 1. MLM: 30% span masking (Poisson λ=3)\nL_MLM = CrossEntropy(h[masked_text], vocab_ids[masked_text])\n\n# 2. MIM: 40% blockwise masking → 重建 DALL-E dVAE tokens\ndvae_tokens = DALL_E_Tokenizer(I)  # 离散化为 8192 类\nL_MIM = CrossEntropy(h[masked_patches], dvae_tokens[masked_patches])\n\n# 3. WPA: 对齐预测 (未掩码text ↔ 对应patch是否被掩码)\naligned = (patch_of(unmasked_word) is NOT masked)  # binary label\nL_WPA = BinaryCrossEntropy(align_head(h[unmasked_text]), aligned)\n\n# 总损失\nL = L_MLM + L_MIM + L_WPA\n</code></pre>\n<h5>动机与背景</h5>\n<p>现有文档 AI 预训练模型面临两个关键问题：</p>\n<ol>\n<li>\n<p><strong>图像特征提取依赖重型 CNN</strong>：LayoutLMv2 使用 ResNeXt101-FPN 提取网格特征，不仅参数量大、计算开销高，还需要额外的目标检测预训练（如在 COCO 上训练 Faster R-CNN）。这使得整个预训练流程复杂且难以端到端优化。</p>\n</li>\n<li>\n<p><strong>文本与图像预训练目标不统一</strong>：文本端使用 MLM 预测离散词汇 ID，但图像端的目标五花八门——DocFormer 重建原始像素（倾向学习噪声细节），SelfDoc 回归区域特征（连续空间更难优化）。这种不对称性增加了多模态融合的难度。</p>\n</li>\n</ol>\n<div class=\"key-point\">💡 关键洞察：LayoutLMv3 的核心思想是将 NLP 中成熟的\"掩码-预测\"范式统一应用到文本和图像两个模态，通过将图像离散化为 token 来消除模态间的目标函数差异。</div>\n<h5>核心机制详解</h5>\n<p><strong>1. 线性 Patch Embedding（去 CNN）</strong></p>\n<p>将文档图像 \\(I \\in \\mathbb{R}^{3 \\times 224 \\times 224}\\) 切分为 \\(M = 14 \\times 14 = 196\\) 个大小为 \\(16 \\times 16\\) 的 patch，每个 patch 展平后通过一个线性层投影到 \\(D\\) 维：</p>\n<p>$$\\mathbf{v}_i = \\text{Linear}(\\text{flatten}(P_i)) + \\mathbf{e}_i^{1D}, \\quad i = 1, \\ldots, M$$</p>\n<p>其中 \\(\\mathbf{e}_i^{1D}\\) 是可学习的 1D 位置嵌入。这比 ResNeXt101-FPN 减少了约 67M 参数，且无需预训练目标检测器。</p>\n<p><strong>2. Segment-level 2D 布局位置编码</strong></p>\n<p>与 LayoutLMv2 对每个 word token 独立编码 2D 坐标不同，LayoutLMv3 以 OCR segment（通常是一个完整短语或单词组）为单位，segment 内所有 subword token 共享相同的 2D 坐标。这减少了 BPE 分词导致的坐标噪声。</p>\n<p>2D 位置嵌入由 6 个可学习嵌入表组成：</p>\n<p>$$\\text{LayoutPos2D} = \\text{Emb}(x_0) + \\text{Emb}(y_0) + \\text{Emb}(x_1) + \\text{Emb}(y_1) + \\text{Emb}(w) + \\text{Emb}(h)$$</p>\n<p><strong>3. Masked Image Modeling (MIM)</strong></p>\n<p>采用 blockwise masking 策略（约 40% 的 patch 被掩码），被掩码区域用可学习的 [MASK] embedding 替代。重建目标不是原始像素，而是预训练好的 DALL-E discrete VAE tokenizer 生成的离散 token（词表大小 8192）：</p>\n<p>$$\\mathcal{L}_{\\text{MIM}} = -\\sum_{i \\in \\mathcal{M}_I} \\log p(z_i | \\mathbf{h}_i)$$</p>\n<p>其中 \\(z_i\\) 是第 \\(i\\) 个 patch 对应的 dVAE token ID。</p>\n<div class=\"warn-box\">⚠️ 注意：消融实验表明，如果只有 MLM 而没有 MIM，模型在图像中心任务（如 PubLayNet 版面分析）上会出现 loss 发散，无法收敛。MIM 是使模型具备视觉理解能力的关键。</div>\n<p><strong>4. Word-Patch Alignment (WPA)</strong></p>\n<p>WPA 是一个轻量级的跨模态对齐任务。对于每个<strong>未被掩码</strong>的文本 token，模型需要预测其对应位置的图像 patch 是否被掩码（二分类）：</p>\n<p>$$\\mathcal{L}_{\\text{WPA}} = -\\sum_{j \\in \\mathcal{U}_T} \\left[ y_j \\log p_j + (1-y_j) \\log(1-p_j) \\right]$$</p>\n<p>其中 \\(y_j = 1\\) 表示文本 token \\(j\\) 对应的 patch 未被掩码（即\"对齐\"），\\(y_j = 0\\) 表示对应 patch 被掩码。</p>\n<div class=\"key-point\">💡 设计巧思：WPA 只在未掩码的文本 token 上计算，避免了掩码 token 本身语义不确定带来的噪声。同时，它利用了 MIM 的掩码策略作为天然的正负样本生成器，无需额外标注。</div>\n<p><strong>5. 总预训练损失</strong></p>\n<p>$$\\mathcal{L} = \\mathcal{L}_{\\text{MLM}} + \\mathcal{L}_{\\text{MIM}} + \\mathcal{L}_{\\text{WPA}}$$</p>\n<h5>消融实验关键发现</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>配置</th>\n<th>图像嵌入</th>\n<th>预训练目标</th>\n<th>FUNSD F1</th>\n<th>PubLayNet mAP</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>#1</td>\n<td>无</td>\n<td>MLM</td>\n<td>88.64</td>\n<td>N/A</td>\n</tr>\n<tr>\n<td>#2</td>\n<td>Linear</td>\n<td>MLM</td>\n<td>89.39</td>\n<td>Loss 发散</td>\n</tr>\n<tr>\n<td>#3</td>\n<td>Linear</td>\n<td>MLM+MIM</td>\n<td>89.19</td>\n<td>94.38</td>\n</tr>\n<tr>\n<td>#4</td>\n<td>Linear</td>\n<td>MLM+MIM+WPA</td>\n<td>89.78</td>\n<td>94.43</td>\n</tr>\n</tbody>\n</table></div>\n<p>关键结论：\n- 仅添加图像 patch 而不加 MIM 目标，会导致视觉任务 loss 发散（#2）\n- MIM 是视觉能力的必要条件（#3 vs #2）\n- WPA 在文本中心和图像中心任务上均有提升（#4 vs #3）</p>\n<h5>与前代方法对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>LayoutLM</th>\n<th>LayoutLMv2</th>\n<th>LayoutLMv3</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>图像编码</td>\n<td>ResNet-101 (fine-tune)</td>\n<td>ResNeXt101-FPN</td>\n<td>Linear Patch</td>\n</tr>\n<tr>\n<td>需要预训练检测器</td>\n<td>✓</td>\n<td>✓</td>\n<td>✗</td>\n</tr>\n<tr>\n<td>图像预训练目标</td>\n<td>无</td>\n<td>对比学习</td>\n<td>MIM (离散token)</td>\n</tr>\n<tr>\n<td>跨模态对齐</td>\n<td>无</td>\n<td>MVLM+TIA+TIM</td>\n<td>WPA</td>\n</tr>\n<tr>\n<td>参数量 (BASE)</td>\n<td>160M</td>\n<td>200M</td>\n<td>133M</td>\n</tr>\n<tr>\n<td>FUNSD F1</td>\n<td>79.27</td>\n<td>82.76</td>\n<td>90.29</td>\n</tr>\n</tbody>\n</table></div>\n<h5>训练配置</h5>\n<ul>\n<li><strong>预训练数据</strong>：IIT-CDIP Test Collection（1100 万文档图像），使用其中部分数据</li>\n<li><strong>BASE 模型</strong>：12 层 Transformer，D=768，12 头，FFN=3072</li>\n<li><strong>LARGE 模型</strong>：24 层 Transformer，D=1024，16 头，FFN=4096</li>\n<li><strong>文本初始化</strong>：从 RoBERTa 权重初始化</li>\n<li><strong>图像输入</strong>：224×224，patch size=16，共 196 个 patch token</li>\n<li><strong>文本长度</strong>：最大 512 token</li>\n<li><strong>训练稳定性</strong>：采用 CogView 的 PB-Relax 注意力计算避免数值溢出</li>\n</ul>",
      "quiz": {
        "q": "LayoutLMv3 在预训练时，如果去掉 MIM 目标只保留 MLM，会出现什么问题？",
        "options": [
          "文本理解任务性能大幅下降",
          "图像中心任务（如版面分析）的 loss 发散，无法收敛",
          "模型参数量显著增加",
          "跨模态对齐能力完全丧失"
        ],
        "answer": 1,
        "explain": "消融实验表明，仅用 MLM 训练时图像 patch embedding 缺乏有效监督信号，导致视觉任务 loss 发散。MIM 通过重建离散 dVAE token 为图像模态提供了必要的自监督信号。"
      }
    },
    {
      "id": "dit",
      "num": 25,
      "name": "DiT",
      "fullName": "文档图像Transformer (Document Image Transformer)",
      "year": "2022",
      "org": "Microsoft Research Asia",
      "parent": "layoutlm",
      "paperUrl": "https://arxiv.org/abs/2203.02378",
      "projectUrl": "",
      "category": "document_ai",
      "motivation": "海量无标注自监督预训练",
      "summary": "DiT 的核心目标是：海量无标注自监督预训练。",
      "keyPoints": [
        "核心动机：海量无标注自监督预训练",
        "演化来源：继承或改进自 layoutlm",
        "代表机构：Microsoft Research Asia"
      ],
      "detail": "<p>海量无标注自监督预训练</p>"
    },
    {
      "id": "donut",
      "num": 26,
      "name": "Donut",
      "fullName": "文档理解Transformer (Document Understanding Transformer)",
      "year": "2022",
      "org": "NAVER CLOVA",
      "parent": "layoutlmv3",
      "paperUrl": "https://arxiv.org/abs/2111.15664",
      "projectUrl": "",
      "category": "document_ai",
      "motivation": "OCR-Free直接生成结构化",
      "summary": "Donut 的核心目标是：OCR-Free直接生成结构化。",
      "keyPoints": [
        "核心动机：OCR-Free直接生成结构化",
        "演化来源：继承或改进自 layoutlmv3",
        "代表机构：NAVER CLOVA"
      ],
      "detail": "<p>OCR-Free直接生成结构化</p>"
    },
    {
      "id": "pix2struct",
      "num": 27,
      "name": "Pix2Struct",
      "fullName": "像素到结构 (Pix2Struct)",
      "year": "2023",
      "org": "Google Research",
      "parent": "donut",
      "paperUrl": "https://arxiv.org/abs/2210.03347",
      "projectUrl": "",
      "category": "document_ai",
      "motivation": "截图解析预训练VLU",
      "summary": "Pix2Struct 的核心目标是：截图解析预训练VLU。",
      "keyPoints": [
        "核心动机：截图解析预训练VLU",
        "演化来源：继承或改进自 donut",
        "代表机构：Google Research"
      ],
      "detail": "<p>截图解析预训练VLU</p>"
    },
    {
      "id": "got_ocr",
      "num": 28,
      "name": "GOT-OCR2.0",
      "fullName": "通用OCR理论2.0 (General OCR Theory 2.0)",
      "year": "2024",
      "org": "StepFun",
      "parent": "donut",
      "paperUrl": "https://arxiv.org/abs/2409.01704",
      "projectUrl": "",
      "category": "document_ai",
      "motivation": "580M统一模型处理全类型",
      "summary": "GOT-OCR2.0 的核心目标是：580M统一模型处理全类型。",
      "keyPoints": [
        "核心动机：580M统一模型处理全类型",
        "演化来源：继承或改进自 donut",
        "代表机构：StepFun"
      ],
      "detail": "<p>580M统一模型处理全类型</p>"
    },
    {
      "id": "glm_ocr",
      "num": 29,
      "name": "GLM-OCR",
      "fullName": "通用语言模型OCR (General Language Model OCR)",
      "year": "2026",
      "org": "Zhipu AI",
      "parent": "got_ocr",
      "paperUrl": "https://arxiv.org/abs/2601.xxxxx",
      "projectUrl": "",
      "category": "document_ai",
      "motivation": "专用VLM文档解析领跑基准",
      "summary": "GLM-OCR 的核心目标是：专用VLM文档解析领跑基准。",
      "keyPoints": [
        "核心动机：专用VLM文档解析领跑基准",
        "演化来源：继承或改进自 got_ocr",
        "代表机构：Zhipu AI"
      ],
      "detail": "<p>专用VLM文档解析领跑基准</p>"
    }
  ],
  "categories": {
    "detection": {
      "label": "文本检测",
      "color": "#4A90D9"
    },
    "recognition": {
      "label": "文本识别",
      "color": "#50C878"
    },
    "e2e_spotting": {
      "label": "端到端检测识别",
      "color": "#FF7F50"
    },
    "document_ai": {
      "label": "文档理解与视觉问答",
      "color": "#9B59B6"
    }
  },
  "projectUrls": {}
};
