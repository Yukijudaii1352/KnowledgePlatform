/**
 * semantic_segmentation-data.js — 由 pipeline/build.py 于 2026-05-20 17:34:40 自动生成。
 * 源文件：content/cv/semantic_segmentation.md
 * ⚠️  请勿手动修改；如需更新，修改源文档后重新编译。
 */
window.PAGE_CONFIG = {
  "meta": {
    "domain": "cv",
    "topic_id": "semantic_segmentation",
    "topic_name": "语义分割",
    "page_title": "语义分割技术演进图谱",
    "page_subtitle": "2026-05-20 版",
    "page_desc": "从 FCN 开启深度学习分割时代，历经 U-Net 医疗影像突破与 Mask2Former 统一架构，迈向 2026 年 Mamba 架构与开放词汇分割的前沿历程。",
    "page_icon": "🎨",
    "hero_pills": [
      "🏷️ Semantic Segmentation · Panoptic Segmentation · Foundation Models"
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
        "id": "fcn",
        "x": 50,
        "y": 100,
        "category": "foundation"
      },
      {
        "id": "unet",
        "x": 150,
        "y": 100,
        "category": "foundation"
      },
      {
        "id": "segnet",
        "x": 250,
        "y": 100,
        "category": "foundation"
      },
      {
        "id": "enet",
        "x": 350,
        "y": 100,
        "category": "core"
      },
      {
        "id": "deeplabv1",
        "x": 100,
        "y": 200,
        "category": "core"
      },
      {
        "id": "deeplabv2",
        "x": 200,
        "y": 200,
        "category": "core"
      },
      {
        "id": "pspnet",
        "x": 250,
        "y": 200,
        "category": "core"
      },
      {
        "id": "deeplabv3",
        "x": 300,
        "y": 200,
        "category": "core"
      },
      {
        "id": "deeplabv3plus",
        "x": 400,
        "y": 200,
        "category": "core"
      },
      {
        "id": "hrnet",
        "x": 500,
        "y": 200,
        "category": "core"
      },
      {
        "id": "panoptic_fpn",
        "x": 150,
        "y": 300,
        "category": "unified"
      },
      {
        "id": "panoptic_deeplab",
        "x": 250,
        "y": 300,
        "category": "unified"
      },
      {
        "id": "setr",
        "x": 350,
        "y": 300,
        "category": "unified"
      },
      {
        "id": "segformer",
        "x": 450,
        "y": 300,
        "category": "unified"
      },
      {
        "id": "maskformer",
        "x": 500,
        "y": 300,
        "category": "unified"
      },
      {
        "id": "mask2former",
        "x": 600,
        "y": 300,
        "category": "unified"
      },
      {
        "id": "sam",
        "x": 700,
        "y": 300,
        "category": "unified"
      },
      {
        "id": "oneformer",
        "x": 750,
        "y": 300,
        "category": "unified"
      },
      {
        "id": "vim",
        "x": 400,
        "y": 400,
        "category": "unified"
      },
      {
        "id": "vmamba",
        "x": 500,
        "y": 400,
        "category": "unified"
      },
      {
        "id": "medmamba",
        "x": 600,
        "y": 400,
        "category": "frontier"
      },
      {
        "id": "spmamba",
        "x": 650,
        "y": 400,
        "category": "frontier"
      },
      {
        "id": "segmaformer",
        "x": 700,
        "y": 400,
        "category": "frontier"
      },
      {
        "id": "taming_sam3",
        "x": 800,
        "y": 400,
        "category": "frontier"
      },
      {
        "id": "omniovcd",
        "x": 850,
        "y": 400,
        "category": "frontier"
      },
      {
        "id": "rein_plus",
        "x": 900,
        "y": 400,
        "category": "frontier"
      },
      {
        "id": "omnisegmentor",
        "x": 750,
        "y": 350,
        "category": "frontier"
      },
      {
        "id": "text4seg_plus",
        "x": 550,
        "y": 350,
        "category": "frontier"
      }
    ],
    "edges": [
      {
        "from": "fcn",
        "to": "unet",
        "label": "医疗影像适配"
      },
      {
        "from": "fcn",
        "to": "segnet",
        "label": "内存高效上采样"
      },
      {
        "from": "fcn",
        "to": "deeplabv1",
        "label": "引入空洞卷积"
      },
      {
        "from": "fcn",
        "to": "pspnet",
        "label": "金字塔池化"
      },
      {
        "from": "fcn",
        "to": "panoptic_fpn",
        "label": "全景分割扩展"
      },
      {
        "from": "segnet",
        "to": "enet",
        "label": "轻量级实时化"
      },
      {
        "from": "deeplabv1",
        "to": "deeplabv2",
        "label": "增加ASPP"
      },
      {
        "from": "deeplabv2",
        "to": "deeplabv3",
        "label": "改进ASPP"
      },
      {
        "from": "deeplabv3",
        "to": "deeplabv3plus",
        "label": "加入解码器"
      },
      {
        "from": "deeplabv3plus",
        "to": "panoptic_deeplab",
        "label": "全景分割"
      },
      {
        "from": "setr",
        "to": "segformer",
        "label": "分层高效化"
      },
      {
        "from": "maskformer",
        "to": "mask2former",
        "label": "掩码注意力"
      },
      {
        "from": "mask2former",
        "to": "sam",
        "label": "提示式通用化"
      },
      {
        "from": "mask2former",
        "to": "oneformer",
        "label": "三任务统一"
      },
      {
        "from": "mask2former",
        "to": "omnisegmentor",
        "label": "多模态扩展"
      },
      {
        "from": "sam",
        "to": "taming_sam3",
        "label": "开放词汇增强"
      },
      {
        "from": "sam",
        "to": "omniovcd",
        "label": "变化检测扩展"
      },
      {
        "from": "sam",
        "to": "rein_plus",
        "label": "VFM微调框架"
      },
      {
        "from": "vim",
        "to": "vmamba",
        "label": "Cross-Scan改进"
      },
      {
        "from": "vmamba",
        "to": "medmamba",
        "label": "医疗领域适配"
      },
      {
        "from": "vmamba",
        "to": "spmamba",
        "label": "脊柱分割特化"
      },
      {
        "from": "vmamba",
        "to": "segmaformer",
        "label": "混合架构融合"
      },
      {
        "from": "segformer",
        "to": "text4seg_plus",
        "label": "生成式语言建模"
      }
    ],
    "milestones": [
      {
        "id": "fcn",
        "label": "开创深度学习语义分割时代"
      },
      {
        "id": "mask2former",
        "label": "统一分割范式里程碑"
      },
      {
        "id": "sam",
        "label": "通用分割基础模型革命"
      }
    ]
  },
  "algos": [
    {
      "id": "fcn",
      "num": 1,
      "name": "FCN",
      "fullName": "全卷积网络 (Fully Convolutional Networks)",
      "year": "2015",
      "org": "UC Berkeley",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/1411.4038",
      "projectUrl": "",
      "category": "foundation",
      "motivation": "全卷积化实现端到端像素预测",
      "summary": "FCN 的核心目标是：全卷积化实现端到端像素预测。",
      "keyPoints": [
        "核心动机：全卷积化实现端到端像素预测",
        "代表机构：UC Berkeley"
      ],
      "detail": "<p>全卷积化实现端到端像素预测</p>"
    },
    {
      "id": "unet",
      "num": 2,
      "name": "U-Net",
      "fullName": "U型网络 (U-Net)",
      "year": "2015",
      "org": "Freiburg Univ.",
      "parent": "fcn",
      "paperUrl": "https://arxiv.org/abs/1505.04597",
      "projectUrl": "",
      "category": "foundation",
      "motivation": "U型编码-解码器与跳跃连接",
      "summary": "U-Net 提出了对称的编码器-解码器架构并引入跳跃连接（skip connection），将编码器的高分辨率特征与解码器的上采样特征拼接融合，在训练样本极少的生物医学图像分割任务上实现了精确的像素级分割，并通过弹性形变数据增强和加权损失函数进一步提升了对细胞边界等细微结构的分割能力。",
      "keyPoints": [
        "<strong>对称 U 形编码器-解码器架构</strong>：收缩路径（contracting path）逐步提取上下文语义，扩展路径（expansive path）逐步恢复空间分辨率，整体呈 U 形对称结构",
        "<strong>跳跃连接（Skip Connection）</strong>：将编码器各层的高分辨率特征图裁剪后与解码器对应层拼接（concatenation），补偿下采样丢失的空间细节",
        "<strong>Overlap-tile 策略</strong>：对大图像进行重叠分块预测，通过镜像填充（mirror padding）处理边界，使网络可处理任意大小的图像",
        "<strong>弹性形变数据增强（Elastic Deformation）</strong>：在仅有极少标注样本时，通过随机弹性形变生成逼真的训练变体，大幅提升模型泛化能力",
        "<strong>加权交叉熵损失</strong>：引入预计算的权重图 \\(w(\\mathbf{x})\\)，对相邻细胞间的狭窄间隙赋予更高权重，迫使网络学习分离紧密接触的同类实例",
        "<strong>无填充卷积（Unpadded Convolution）</strong>：所有卷积均不使用 padding，输出尺寸小于输入，确保每个输出像素的感受野仅包含有效输入区域",
        "<strong>极少样本下的 SOTA 表现</strong>：在 ISBI 2012 EM 分割挑战中以 warping error 0.0003530 夺冠，在 ISBI 2015 细胞追踪挑战中多项指标排名第一（PhC-U373 IOU 92%、DIC-HeLa IOU 77.5%）"
      ],
      "detail": "<p><img alt=\"U-Net 网络架构图\" src=\"https://ar5iv.labs.arxiv.org/html/1505.04597/assets/x1.png\" />\n<em>图 1：U-Net 架构（以 32×32 最低分辨率为例）。蓝色箭头为 3×3 卷积+ReLU，红色箭头为 2×2 最大池化，绿色箭头为 2×2 上卷积，灰色箭头为跳跃连接（copy and crop），青色箭头为 1×1 卷积输出。每个方块上方标注通道数，左侧标注特征图尺寸。</em></p>\n<p><img alt=\"Overlap-tile 策略示意\" src=\"https://ar5iv.labs.arxiv.org/html/1505.04597/assets/x2.png\" />\n<em>图 2：Overlap-tile 策略。黄色区域为待分割区域，蓝色区域为所需的输入上下文，超出图像边界的部分通过镜像填充获得。</em></p>\n<pre><code class=\"language-python\"># U-Net 前向传播伪代码\ndef UNet_forward(input_tile):  # input: 572×572×1\n    # ===== Contracting Path (Encoder) =====\n    c1 = ReLU(Conv3x3(input_tile, 64))   # 570×570×64\n    c1 = ReLU(Conv3x3(c1, 64))           # 568×568×64\n    p1 = MaxPool2x2(c1)                  # 284×284×64\n\n    c2 = ReLU(Conv3x3(p1, 128))          # 282×282×128\n    c2 = ReLU(Conv3x3(c2, 128))          # 280×280×128\n    p2 = MaxPool2x2(c2)                  # 140×140×128\n\n    c3 = ReLU(Conv3x3(p2, 256))          # 138×138×256\n    c3 = ReLU(Conv3x3(c3, 256))          # 136×136×256\n    p3 = MaxPool2x2(c3)                  # 68×68×256\n\n    c4 = ReLU(Conv3x3(p3, 512))          # 66×66×512\n    c4 = ReLU(Conv3x3(c4, 512))          # 64×64×512\n    p4 = MaxPool2x2(c4)                  # 32×32×512\n\n    # ===== Bottleneck =====\n    c5 = ReLU(Conv3x3(p4, 1024))         # 30×30×1024\n    c5 = ReLU(Conv3x3(c5, 1024))         # 28×28×1024\n\n    # ===== Expansive Path (Decoder) =====\n    u4 = UpConv2x2(c5, 512)              # 56×56×512\n    u4 = Concat(CropCenter(c4), u4)      # 56×56×1024  (skip connection)\n    u4 = ReLU(Conv3x3(u4, 512))          # 54×54×512\n    u4 = ReLU(Conv3x3(u4, 512))          # 52×52×512\n\n    u3 = UpConv2x2(u4, 256)              # 104×104×256\n    u3 = Concat(CropCenter(c3), u3)      # 104×104×512\n    u3 = ReLU(Conv3x3(u3, 256))          # 102×102×256\n    u3 = ReLU(Conv3x3(u3, 256))          # 100×100×256\n\n    u2 = UpConv2x2(u3, 128)              # 200×200×128\n    u2 = Concat(CropCenter(c2), u2)      # 200×200×256\n    u2 = ReLU(Conv3x3(u2, 128))          # 198×198×128\n    u2 = ReLU(Conv3x3(u2, 128))          # 196×196×128\n\n    u1 = UpConv2x2(u2, 64)              # 392×392×64\n    u1 = Concat(CropCenter(c1), u1)      # 392×392×128\n    u1 = ReLU(Conv3x3(u1, 64))           # 390×390×64\n    u1 = ReLU(Conv3x3(u1, 64))           # 388×388×64\n\n    output = Conv1x1(u1, num_classes)     # 388×388×num_classes\n    return PixelWiseSoftmax(output)\n</code></pre>\n<p><strong>动机与背景：从图像分类到像素级分割</strong></p>\n<p>在 U-Net 之前，卷积神经网络在生物医学图像分析中的应用主要受限于两个问题：一是训练数据极度匮乏（生物医学标注通常只有几十张图像），二是分割任务不仅需要判断\"是什么\"，还需要精确定位\"在哪里\"。Ciresan 等人（2012）提出的滑动窗口方法虽然能逐像素分类，但速度极慢且感受野有限，无法捕获全局上下文。Long 等人（2015）提出的全卷积网络（FCN）通过端到端的方式实现了语义分割，但其上采样路径较为粗糙，细节恢复不足。U-Net 的核心动机正是在 FCN 的基础上，设计一种能够同时利用全局语义上下文和局部空间细节的架构，并通过精巧的数据增强策略解决小样本问题。</p>\n<p><strong>核心机制：对称编码-解码器与跳跃连接</strong></p>\n<p>U-Net 的架构由两条对称路径组成。<strong>收缩路径</strong>（左半部分）遵循经典卷积网络设计：每个层级包含两个 3×3 无填充卷积（后接 ReLU）和一个 2×2 最大池化（步长 2），通道数逐级翻倍（64→128→256→512→1024）。<strong>扩展路径</strong>（右半部分）则逐步恢复空间分辨率：每个层级先用 2×2 上卷积（up-convolution，也称转置卷积）将特征图尺寸翻倍并将通道数减半，然后与收缩路径对应层级的特征图进行<strong>裁剪拼接</strong>（crop and concatenate），再通过两个 3×3 卷积融合信息。</p>\n<p>跳跃连接是 U-Net 最关键的设计。在编码过程中，池化操作虽然扩大了感受野、提取了高层语义，但不可避免地丢失了空间细节（如精确的边缘位置）。跳跃连接将编码器中未经池化的高分辨率特征图直接传递给解码器，使解码器在上采样恢复分辨率时能够参考原始的空间细节信息。由于使用了无填充卷积，编码器特征图的尺寸大于解码器对应层的上采样结果，因此需要中心裁剪后再拼接。最终输出层使用 1×1 卷积将 64 通道特征映射到目标类别数。</p>\n<div class=\"key-point\">💡 <strong>关键</strong>：U-Net 的跳跃连接采用<strong>拼接（concatenation）</strong> 而非 FCN 中的<strong>逐元素相加（addition）</strong>，这保留了编码器和解码器特征的完整信息，让网络自主学习如何融合两者，表达能力更强。</div>\n<p><strong>加权损失函数与边界分离</strong></p>\n<p>U-Net 使用带权重的像素级交叉熵损失。对于每个像素 \\(\\mathbf{x}\\)，损失函数定义为：</p>\n<p>$$E = \\sum_{\\mathbf{x} \\in \\Omega} w(\\mathbf{x}) \\log\\left(p_{\\ell(\\mathbf{x})}(\\mathbf{x})\\right)$$</p>\n<p>其中 \\(p_{\\ell(\\mathbf{x})}(\\mathbf{x})\\) 是 softmax 输出中真实类别的概率，\\(w(\\mathbf{x})\\) 是预计算的权重图。权重图的设计是 U-Net 的一大亮点：</p>\n<p>$$w(\\mathbf{x}) = w_c(\\mathbf{x}) + w_0 \\cdot \\exp\\left(-\\frac{(d_1(\\mathbf{x}) + d_2(\\mathbf{x}))^2}{2\\sigma^2}\\right)$$</p>\n<p>其中 \\(w_c\\) 用于平衡类别频率，\\(d_1\\) 和 \\(d_2\\) 分别是像素到最近和次近细胞边界的距离，\\(w_0 = 10\\)，\\(\\sigma \\approx 5\\) 像素。这一设计使得两个相邻细胞之间的狭窄间隙获得极高的损失权重，迫使网络学会将紧密接触的细胞实例分离开来——这对细胞计数和形态分析至关重要。</p>\n<p><strong>数据增强：弹性形变的关键作用</strong></p>\n<p>在生物医学图像分割中，标注数据极为稀缺。U-Net 的解决方案是大量使用数据增强，其中最重要的是<strong>随机弹性形变（random elastic deformation）</strong>。具体做法是：在图像上生成一个粗糙的 3×3 随机位移场（每个控制点的位移从标准差为 10 像素的高斯分布中采样），然后通过双三次插值将其平滑为密集的逐像素位移场。这种形变模拟了生物组织的自然变形，生成的训练样本既逼真又多样。论文指出，弹性形变是在标注样本极少时最关键的增强手段，对网络学习形变不变性至关重要。</p>\n<p><strong>训练细节与 Overlap-tile 推理</strong></p>\n<p>网络权重使用 He 初始化（从标准差为 \\(\\sqrt{2/N}\\) 的高斯分布中采样，\\(N\\) 为输入神经元数）。由于 GPU 内存限制，训练时 batch size 为 1，但使用了较大的动量（momentum = 0.99），使得大量先前样本参与梯度更新方向的估计，等效地扩大了 batch 的影响范围。</p>\n<p>推理时，U-Net 采用 <strong>overlap-tile 策略</strong>处理大图像：将图像分割为重叠的 tile，每个 tile 的预测仅取中心有效区域（因为无填充卷积导致边缘像素缺少完整上下文），相邻 tile 之间的重叠确保了无缝拼接。对于图像边界处缺失的上下文，采用镜像填充（mirror padding）补全。这一策略使 U-Net 可以处理任意大小的图像，不受 GPU 内存限制。</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：原始 U-Net 使用无填充卷积（valid convolution），因此输出尺寸（388×388）显著小于输入尺寸（572×572）。现代实现中通常改用 same padding 以简化流程，但这会引入边界效应。</div>\n<p><strong>实验结果与影响</strong></p>\n<p>U-Net 在 ISBI 2012 EM 分割挑战中以 warping error 0.0003530 取得第一名，大幅超越当时的第二名（0.0005140）。在 ISBI 2015 细胞追踪挑战中，U-Net 在 PhC-U373 数据集上达到 92% IOU（第二名 83%），在 DIC-HeLa 数据集上达到 77.5% IOU（第二名 46%）。这些结果充分验证了 U-Net 在小样本生物医学分割任务上的有效性。U-Net 后来成为医学图像分割领域最广泛使用的基线架构，其编码器-解码器加跳跃连接的设计范式深刻影响了后续的 V-Net、Attention U-Net、nnU-Net 等一系列工作。</p>",
      "quiz": {
        "q": "U-Net 中跳跃连接（skip connection）的主要作用是什么？",
        "options": [
          "减少网络参数量，加速训练收敛",
          "将编码器的高分辨率空间细节传递给解码器，补偿下采样丢失的定位信息",
          "在编码器和解码器之间共享权重以实现正则化",
          "替代池化操作以避免信息丢失"
        ],
        "answer": 1,
        "explain": "跳跃连接将编码器各层级的高分辨率特征图裁剪后与解码器对应层拼接，使解码器在恢复空间分辨率时能利用原始的精细空间信息，从而实现精确的像素级定位。"
      }
    },
    {
      "id": "segnet",
      "num": 3,
      "name": "SegNet",
      "fullName": "分割网络 (SegNet)",
      "year": "2015",
      "org": "Cambridge Univ.",
      "parent": "fcn",
      "paperUrl": "https://arxiv.org/abs/1505.07293",
      "projectUrl": "",
      "category": "foundation",
      "motivation": "池化索引复用实现高效上采样",
      "summary": "SegNet 提出了一种编码器-解码器架构，通过在解码器中复用编码器的最大池化索引（max-pooling indices）进行上采样，无需学习上采样参数即可将低分辨率特征映射恢复为像素级语义标注，在室内外场景分割任务上取得了优于同期方法的效果。",
      "keyPoints": [
        "<strong>编码器-解码器对称架构</strong>：编码器逐层提取特征并降采样，解码器逐层上采样恢复空间分辨率，最终通过 soft-max 分类器输出像素级标注",
        "<strong>最大池化索引复用</strong>：编码器中每次 2×2 max-pooling 时记录最大值位置索引，解码器利用这些索引进行非学习式上采样（upsampling），无需额外参数",
        "<strong>\"扁平\"网络设计</strong>：每层固定 64 个特征图，使用 7×7 卷积核，4 层深度网络产生 106×106 像素的感受野",
        "<strong>模块化逐层训练策略</strong>：使用 L-BFGS 优化器逐层贪心训练（先训练浅层再逐步加深），而非端到端 SGD",
        "<strong>局部对比度归一化（LCN）预处理</strong>：对输入 RGB 图像进行 LCN 处理以增强局部特征",
        "<strong>逆频率类别加权</strong>：交叉熵损失中使用类别频率倒数作为权重，缓解类别不平衡问题",
        "<strong>多数据集验证</strong>：在 CamVid（道路场景）、KITTI（自动驾驶）、NYU v2（室内 RGBD）三个数据集上验证有效性",
        "<strong>迁移学习能力</strong>：预训练的 SegNet 可通过微调少量层快速适配新数据集"
      ],
      "detail": "<p><img alt=\"SegNet 编码器-解码器架构示意图\" src=\"https://arxiv.org/html/1511.00561v3/extracted/figures/segnet_architecture.png\" />\n<em>图：SegNet 的编码器-解码器架构。编码器通过卷积+池化逐步降低空间分辨率，解码器利用存储的池化索引进行上采样，最终通过 soft-max 输出像素级分类。</em></p>\n<pre><code class=\"language-python\"># SegNet 前向传播伪代码\ndef segnet_forward(input_image):\n    &quot;&quot;&quot;\n    input: RGB image after LCN preprocessing, size 360x480x3\n    output: pixel-wise class labels, size 360x480xC\n    &quot;&quot;&quot;\n    # === Encoder (4 layers) ===\n    pool_indices = []\n    x = input_image  # 360x480x3\n\n    for layer in range(4):\n        x = conv2d(x, kernel=7x7, filters=64, padding='same')\n        x = batch_norm(x)  # LCN in original\n        x = relu(x)\n        x, indices = max_pool_2x2_with_indices(x)  # 记录池化位置\n        pool_indices.append(indices)\n        # 每层空间尺寸减半: 180x240 → 90x120 → 45x60 → 22x30\n\n    # === Decoder (4 layers, 镜像结构) ===\n    for layer in range(4):\n        idx = pool_indices[3 - layer]  # 逆序使用索引\n        x = max_unpool_2x2(x, idx)    # 利用索引上采样\n        x = conv2d(x, kernel=7x7, filters=64, padding='same')\n        x = batch_norm(x)\n        # 注意：解码器不使用 ReLU\n\n    # === Classifier ===\n    output = softmax(linear(x, num_classes=C))\n    return output  # 360x480xC\n</code></pre>\n<h5>动机与背景</h5>\n<p>在 2015 年之前，语义分割的主流方法依赖于手工特征（如 TextonBoost、Random Forest）配合 CRF 后处理，或者使用 CNN 进行 patch-wise 分类。这些方法存在以下问题：</p>\n<ol>\n<li><strong>Patch-wise 方法效率低</strong>：对每个像素提取局部 patch 送入分类器，计算冗余且无法利用全局上下文</li>\n<li><strong>特征上采样缺乏学习</strong>：Farabet 等人的多尺度 CNN 使用简单的双线性插值或 ad hoc 方法恢复分辨率，丢失空间精度</li>\n<li><strong>感受野受限</strong>：浅层网络难以捕获足够大的空间上下文进行全局推理</li>\n</ol>\n<p>SegNet 的核心思想是：<strong>设计一个端到端可训练的编码器-解码器网络，让网络自身学习如何从低分辨率编码特征恢复到全分辨率语义标注</strong>。</p>\n<h5>核心机制：最大池化索引上采样</h5>\n<p>SegNet 最关键的创新在于<strong>解码器的上采样机制</strong>。传统方法中，从低分辨率特征恢复到高分辨率通常使用：\n- 双线性插值（无学习，模糊）\n- 反卷积/转置卷积（需要学习参数）\n- 反池化 + 零填充（丢失位置信息）</p>\n<p>SegNet 的方案是：在编码器进行 max-pooling 时，<strong>记录每个 2×2 窗口中最大值的位置索引</strong>。在解码器对应层中，利用这些索引将特征值精确放回原始位置，其余位置填零，然后通过卷积层进行平滑。</p>\n<div class=\"key-point\">💡 关键：池化索引的存储仅需每个特征图位置 2 bit（2×2 窗口中 4 个位置之一），内存开销极小，却保留了精确的空间位置信息。</div>\n<p>这种设计的优势：\n- <strong>无需学习上采样参数</strong>：减少了模型参数量和过拟合风险\n- <strong>保留边界信息</strong>：最大值位置通常对应边缘或纹理的关键位置\n- <strong>内存高效</strong>：仅存储 2-bit 索引而非完整特征图</p>\n<h5>网络架构细节</h5>\n<p>编码器和解码器各包含 4 层，每层结构为：</p>\n<p><strong>编码器层</strong>：\n$$\\text{Conv}(7 \\times 7, 64) \\rightarrow \\text{LCN} \\rightarrow \\text{ReLU} \\rightarrow \\text{MaxPool}(2 \\times 2)$$</p>\n<p><strong>解码器层</strong>：\n$$\\text{MaxUnpool}(2 \\times 2, \\text{indices}) \\rightarrow \\text{Conv}(7 \\times 7, 64) \\rightarrow \\text{BN}$$</p>\n<p>关键设计选择：\n- <strong>固定 64 特征图</strong>：不同于 VGG 等逐层加倍通道数的设计，SegNet 保持每层 64 个特征图（\"flat\" 架构），总参数约 1.4M\n- <strong>7×7 大卷积核</strong>：配合 4 层池化，产生 \\(106 \\times 106\\) 像素的有效感受野，足以覆盖大面积上下文\n- <strong>解码器无 ReLU</strong>：解码器不使用非线性激活，编码器和解码器权重不共享（untied）\n- <strong>LCN 预处理</strong>：对输入进行局部对比度归一化，增强局部特征对比度</p>\n<h5>训练策略</h5>\n<p>SegNet 采用独特的<strong>模块化逐层训练</strong>（modular layer-wise training）：</p>\n<ol>\n<li><strong>第 1 阶段</strong>：仅训练编码器第 1 层 + 解码器第 1 层 + soft-max 分类器</li>\n<li><strong>第 2 阶段</strong>：固定第 1 层，训练编码器第 2 层 + 解码器第 2 层</li>\n<li><strong>依次类推</strong>：逐层向深处扩展</li>\n<li><strong>最终微调</strong>：所有层联合微调</li>\n</ol>\n<div class=\"warn-box\">⚠️ 注意：使用 L-BFGS 优化器而非 SGD。L-BFGS 是一种拟牛顿法，收敛更快但需要更多内存存储梯度历史。作者发现这种方式比端到端 SGD 训练更稳定。</div>\n<p><strong>损失函数</strong>：带类别加权的交叉熵</p>\n<p>$$\\mathcal{L} = -\\sum_{i=1}^{N} \\sum_{c=1}^{C} w_c \\cdot y_{i,c} \\cdot \\log(\\hat{y}_{i,c})$$</p>\n<p>其中 \\(w_c\\) 为类别 \\(c\\) 的逆频率权重（median frequency balancing），用于缓解道路、天空等大面积类别对小目标类别（行人、自行车）的压制。</p>\n<h5>特征可视化分析</h5>\n<p>作者通过 Top-N 特征图激活分析揭示了网络的学习行为：\n- <strong>深层特征（第 4 层）</strong>：仅需 Top-1 特征即可预测大部分静态场景类别（建筑、道路），约 15% 的特征被激活\n- <strong>浅层特征（第 1-2 层）</strong>：需要 Top-5~10 特征才能产生合理预测，约 50% 特征被激活\n- <strong>语义填充现象</strong>：当车辆相关特征被置零时，网络用人行道\"填充\"缺失区域，表明深层学到了空间上下文/类别位置先验</p>\n<h5>与传统方法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>Patch-wise CNN</th>\n<th>多尺度 CNN (Farabet)</th>\n<th>SegNet</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>输入方式</td>\n<td>逐像素 patch</td>\n<td>多尺度金字塔</td>\n<td>全图端到端</td>\n</tr>\n<tr>\n<td>上采样</td>\n<td>不需要</td>\n<td>双线性插值</td>\n<td>池化索引</td>\n</tr>\n<tr>\n<td>感受野</td>\n<td>patch 大小</td>\n<td>多尺度融合</td>\n<td>106×106</td>\n</tr>\n<tr>\n<td>后处理</td>\n<td>通常需要 CRF</td>\n<td>超像素平滑</td>\n<td>无需</td>\n</tr>\n<tr>\n<td>输出平滑度</td>\n<td>噪声大</td>\n<td>较平滑</td>\n<td>平滑</td>\n</tr>\n</tbody>\n</table></div>\n<h5>实验结果</h5>\n<p><strong>CamVid 数据集</strong>（11 类道路场景，367 训练 / 233 测试）：\n- Class Average: <strong>62.9%</strong>，Global Average: <strong>84.3%</strong>\n- 在车辆（82.7%）、行人（55.0%）、柱子（44.8%）等小目标类别上显著优于其他方法\n- 超越使用 CRF 后处理、SfM 深度、时序信息的方法</p>\n<p><strong>NYU v2 数据集</strong>（13 类室内场景，795 训练 / 654 测试）：\n- Class Average: <strong>41.0%</strong>，Global Average: <strong>50.5%</strong>\n- 在 13 个类别中有 9 个优于同参数量级的多尺度 CNN</p>\n<p><strong>KITTI 数据集</strong>（7 类道路场景）：\n- SegNet(R) 从随机初始化训练：Class Average 60.0%，Global Average <strong>89.7%</strong>\n- 验证了预训练迁移能力：仅微调第 4 层即可获得 58.4% class avg</p>",
      "quiz": {
        "q": "SegNet 解码器中上采样操作的核心机制是什么？",
        "options": [
          "使用转置卷积（反卷积）学习上采样参数",
          "复用编码器 max-pooling 时记录的位置索引进行非学习式上采样",
          "使用双线性插值将特征图放大 2 倍",
          "通过亚像素卷积（sub-pixel convolution）重排特征通道"
        ],
        "answer": 1,
        "explain": "SegNet 的核心创新是在编码器 max-pooling 时存储最大值位置的 2-bit 索引，解码器直接利用这些索引将特征值放回原始位置，无需学习任何上采样参数，既节省内存又保留了精确的空间位置信息。"
      }
    },
    {
      "id": "deeplabv1",
      "num": 4,
      "name": "DeepLabv1",
      "fullName": "深度实验室v1 (DeepLab v1)",
      "year": "2015",
      "org": "Google",
      "parent": "fcn",
      "paperUrl": "https://arxiv.org/abs/1412.7062",
      "projectUrl": "",
      "category": "core",
      "motivation": "引入空洞卷积扩大感受野",
      "summary": "DeepLab 提出将空洞卷积（Atrous Convolution）引入深度卷积网络以控制特征图分辨率，并结合全连接条件随机场（Dense CRF）作为后处理来恢复精细边界，在 PASCAL VOC 2012 语义分割任务上达到 71.6% mIOU。",
      "keyPoints": [
        "基于 VGG-16 改造的全卷积网络，将全连接层转为卷积层用于逐像素预测",
        "空洞卷积（Atrous/Hole Algorithm）：在不增加参数量的情况下扩大感受野，同时保持特征图分辨率为输入的 1/8",
        "全连接 CRF 后处理：利用像素间的颜色和位置关系进行全局推理，精细化分割边界",
        "多尺度预测（Multi-Scale Prediction）：从多个中间层提取特征并融合以捕获多尺度信息",
        "在 PASCAL VOC 2012 test 集上达到 71.6% mIOU，显著超越当时最优方法"
      ],
      "detail": "<p><img alt=\"DeepLab 模型架构图\" src=\"https://ar5iv.labs.arxiv.org/html/1412.7062/assets/x1.png\" />\n<em>图：DeepLab 系统总览——DCNN 产生粗糙分数图，经双线性插值上采样后由全连接 CRF 精细化</em></p>\n<pre><code class=\"language-python\"># DeepLab 推理流程伪代码\ndef deeplab_inference(image):\n    # 1. DCNN 前向传播（VGG-16 with atrous convolution）\n    # 最后三个 max-pooling 的 stride 从 2 改为 1\n    # 后续卷积层使用 atrous convolution (rate=2,4) 补偿感受野\n    coarse_score_map = dcnn_forward(image)  # 输出尺寸: input_size / 8\n\n    # 2. 双线性插值上采样到原始分辨率\n    upsampled_score = bilinear_upsample(coarse_score_map, target_size=image.size)\n\n    # 3. 全连接 CRF 后处理（10次均场迭代）\n    refined_segmentation = dense_crf(upsampled_score, image)\n\n    return refined_segmentation\n\ndef dense_crf(unary_potentials, image):\n    &quot;&quot;&quot;\n    能量函数: E(x) = Σ_i θ_i(x_i) + Σ_{i&lt;j} θ_{ij}(x_i, x_j)\n    一元势: θ_i(x_i) = -log P(x_i)  (来自DCNN输出)\n    二元势: θ_{ij} = μ(x_i,x_j) * [w1*exp(-|p_i-p_j|²/2σ_α² - |I_i-I_j|²/2σ_β²) \n                                     + w2*exp(-|p_i-p_j|²/2σ_γ²)]\n    &quot;&quot;&quot;\n    # 使用均场近似进行高效推理\n    Q = softmax(unary_potentials)\n    for iteration in range(10):\n        # 消息传递（高斯滤波实现）\n        Q = mean_field_update(Q, image)\n    return argmax(Q)\n</code></pre>\n<p><strong>动机与背景</strong></p>\n<p>深度卷积神经网络（DCNN）在图像分类任务上取得了巨大成功，但将其直接应用于语义分割面临两个核心挑战：</p>\n<ol>\n<li><strong>信号下采样问题</strong>：DCNN 中重复的 max-pooling 和下采样操作导致特征图分辨率急剧下降（通常为输入的 1/32），丢失了精细的空间信息，使得分割结果过于粗糙。</li>\n<li><strong>空间不变性与定位精度的矛盾</strong>：DCNN 的空间不变性（spatial invariance）有利于分类但不利于精确定位，高层特征对目标位置不敏感。</li>\n</ol>\n<p><strong>核心机制一：空洞卷积（Atrous Convolution）</strong></p>\n<p>为解决信号下采样问题，DeepLab 引入了空洞卷积（也称 hole algorithm 或 dilated convolution）。其核心思想是在卷积核的采样点之间插入\"空洞\"（zeros），从而在不增加参数量和计算量的情况下扩大感受野。</p>\n<p>具体实现方式：将 VGG-16 最后两个 max-pooling 层的步长从 2 改为 1，这样特征图分辨率从 1/32 提升到 1/8。为了补偿因步长减小而缩小的感受野，后续卷积层使用空洞卷积，空洞率（rate）分别设为 2 和 4。</p>\n<p>空洞卷积的数学定义为：</p>\n<p>$$y[i] = \\sum_{k} x[i + r \\cdot k] \\cdot w[k]$$</p>\n<p>其中 \\(r\\) 为空洞率（dilation rate），\\(w[k]\\) 为卷积核权重。当 \\(r=1\\) 时退化为标准卷积。</p>\n<div class=\"key-point\">💡 关键：空洞卷积使得网络可以在保持高分辨率特征图的同时拥有大感受野，这是 DeepLab 能产生较精细分割结果的基础。</div>\n<p><strong>核心机制二：全连接条件随机场（Dense CRF）</strong></p>\n<p>尽管空洞卷积提升了特征图分辨率，DCNN 输出的分数图仍然相对粗糙，边界不够精确。DeepLab 采用全连接 CRF 作为后处理步骤来恢复精细边界。</p>\n<p>与传统的短程 CRF（仅连接相邻像素）不同，全连接 CRF 在所有像素对之间建立连接，能够进行长程推理。其能量函数定义为：</p>\n<p>$$E(\\mathbf{x}) = \\sum_{i} \\theta_i(x_i) + \\sum_{i < j} \\theta_{ij}(x_i, x_j)$$</p>\n<p>其中一元势 \\(\\theta_i(x_i) = -\\log P(x_i)\\) 直接来自 DCNN 的 softmax 输出。</p>\n<p>二元势采用高斯核的线性组合：</p>\n<p>$$\\theta_{ij}(x_i, x_j) = \\mu(x_i, x_j) \\left[ w_1 \\exp\\left(-\\frac{|p_i - p_j|^2}{2\\sigma_\\alpha^2} - \\frac{|I_i - I_j|^2}{2\\sigma_\\beta^2}\\right) + w_2 \\exp\\left(-\\frac{|p_i - p_j|^2}{2\\sigma_\\gamma^2}\\right) \\right]$$</p>\n<p>第一个核（外观核）依赖像素位置 \\(p\\) 和颜色 \\(I\\)，鼓励颜色相似且位置相近的像素取相同标签；第二个核（平滑核）仅依赖位置，起正则化作用。</p>\n<div class=\"warn-box\">⚠️ 注意：全连接 CRF 的推理使用均场近似（mean field approximation），通过高效的高斯滤波实现消息传递，使得在全图所有像素对上的推理变得可行（复杂度为 \\(O(N)\\) 而非 \\(O(N^2)\\)）。</div>\n<p><strong>核心机制三：多尺度预测</strong></p>\n<p>DeepLab 还探索了多尺度预测策略：将输入图像和前四个 max-pooling 层的输出分别通过 128 通道的 3×3 卷积层和 128 通道的 1×1 卷积层，得到的特征与主网络最后一层的特征拼接后送入分类器。这种方式能够融合不同尺度的上下文信息。</p>\n<p><strong>与传统方法的区别</strong></p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方面</th>\n<th>传统 FCN</th>\n<th>DeepLab</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>分辨率恢复</td>\n<td>反卷积/跳跃连接</td>\n<td>空洞卷积保持高分辨率</td>\n</tr>\n<tr>\n<td>边界精细化</td>\n<td>无专门处理</td>\n<td>全连接 CRF 后处理</td>\n</tr>\n<tr>\n<td>感受野</td>\n<td>依赖网络深度</td>\n<td>空洞率灵活控制</td>\n</tr>\n<tr>\n<td>输出分辨率</td>\n<td>1/32 后上采样</td>\n<td>1/8 后上采样</td>\n</tr>\n</tbody>\n</table></div>\n<p>DeepLab 的设计哲学是将 DCNN 的强语义识别能力与概率图模型的精细定位能力相结合，前者负责\"识别是什么\"，后者负责\"精确在哪里\"。</p>\n<p><img alt=\"CRF 迭代精细化效果\" src=\"https://ar5iv.labs.arxiv.org/html/1412.7062/assets/x3.png\" />\n<em>图：全连接 CRF 均场迭代过程中分割结果逐步精细化的可视化</em></p>",
      "quiz": {
        "q": "DeepLab 中使用空洞卷积（Atrous Convolution）的主要目的是什么？",
        "options": [
          "减少模型参数量以加速推理",
          "在不降低特征图分辨率的前提下扩大感受野",
          "替代全连接 CRF 进行边界精细化",
          "实现多尺度特征融合"
        ],
        "answer": 1,
        "explain": "空洞卷积通过在卷积核采样点间插入空洞来扩大感受野，同时避免了 max-pooling 带来的分辨率损失，使特征图保持在输入的 1/8 分辨率。"
      }
    },
    {
      "id": "enet",
      "num": 5,
      "name": "ENet",
      "fullName": "高效网络 (ENet)",
      "year": "2016",
      "org": "Cambridge Univ.",
      "parent": "segnet",
      "paperUrl": "https://arxiv.org/abs/1606.02147",
      "projectUrl": "",
      "category": "core",
      "motivation": "非对称结构实现实时分割",
      "summary": "ENet 提出了一种极致高效的编码器-解码器语义分割架构，通过早期激进下采样、非对称编码器-解码器设计、瓶颈模块与空洞/非对称卷积等技术，在仅 0.37M 参数下实现了比 SegNet 快 18 倍的实时推理速度，同时保持了可比的分割精度。",
      "keyPoints": [
        "<strong>极致轻量架构</strong>：仅 0.37M 参数、3.83 GFLOPs、0.7MB 模型大小，比 SegNet 少 79 倍参数、75 倍 FLOPs",
        "<strong>实时推理</strong>：在嵌入式 NVIDIA TX1 平台上达到 10+ fps（512×1024 分辨率），比 SegNet 快 18 倍",
        "<strong>Initial Block</strong>：并行 3×3 卷积（stride 2）与 MaxPooling 后拼接，高效保留信息的同时完成下采样",
        "<strong>瓶颈模块（Bottleneck Module）</strong>：1×1 投影降维 → 主卷积 → 1×1 扩展 + 残差跳连，借鉴 ResNet 思想",
        "<strong>非对称编码器-解码器</strong>：编码器大、解码器小，因为编码器负责特征提取（类似分类网络），解码器仅做上采样细化",
        "<strong>多样化卷积核</strong>：常规 3×3、空洞卷积（dilation 2/4/8/16）、非对称卷积（5×1 + 1×5 分解）交替使用",
        "<strong>Spatial Dropout</strong>：替代传统 Dropout，对整个特征图通道进行随机置零，正则化效果更好",
        "<strong>PReLU 激活</strong>：使用参数化 ReLU，允许网络学习负值斜率，提升小模型表达能力",
        "<strong>自定义类别加权</strong>：\\(w_{class} = \\frac{1}{\\ln(c + p_{class})}\\)，平衡类别不均衡问题"
      ],
      "detail": "<h5>架构总览</h5>\n<p><img alt=\"ENet 架构模块示意图\" src=\"https://ar5iv.labs.arxiv.org/html/1606.02147v1/assets/x1.png\" />\n<em>图：(a) ENet Initial Block — 并行卷积与池化路径；(b) ENet Bottleneck Module — 瓶颈残差结构</em></p>\n<p>ENet 采用编码器-解码器架构，共 5 个阶段（Stage 1-3 为编码器，Stage 4-5 为解码器）。整体设计遵循\"前重后轻\"原则：编码器承担主要特征提取任务，解码器仅负责轻量级上采样恢复空间分辨率。</p>\n<h5>网络架构详细表</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>Stage</th>\n<th>Type</th>\n<th>Output Size</th>\n<th>说明</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Initial</td>\n<td>Initial Block</td>\n<td>256×512×16</td>\n<td>并行 Conv+Pool，输入 512×1024×3</td>\n</tr>\n<tr>\n<td>1</td>\n<td>5× Bottleneck</td>\n<td>128×256×64</td>\n<td>1个下采样 + 4个常规</td>\n</tr>\n<tr>\n<td>2</td>\n<td>8× Bottleneck</td>\n<td>64×128×128</td>\n<td>1个下采样 + 含 dilated(2,4,8,16) + asymmetric(5)</td>\n</tr>\n<tr>\n<td>3</td>\n<td>8× Bottleneck</td>\n<td>64×128×128</td>\n<td>无下采样，重复 Stage 2 的卷积模式</td>\n</tr>\n<tr>\n<td>4</td>\n<td>5× Bottleneck</td>\n<td>128×256×64</td>\n<td>1个上采样 + 4个常规/dilated</td>\n</tr>\n<tr>\n<td>5</td>\n<td>3× Bottleneck</td>\n<td>256×512×16</td>\n<td>1个上采样 + 2个常规</td>\n</tr>\n<tr>\n<td>Output</td>\n<td>Fullconv (转置卷积)</td>\n<td>512×1024×C</td>\n<td>最终反卷积恢复全分辨率</td>\n</tr>\n</tbody>\n</table></div>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># ENet Forward Pass 伪代码\ndef ENet_forward(input_image):\n    # Initial Block: 并行路径\n    branch1 = Conv2d(3, 13, kernel=3, stride=2, padding=1)(input_image)\n    branch2 = MaxPool2d(kernel=2, stride=2)(input_image)\n    x = Concatenate([branch1, branch2])  # 16 channels\n\n    # Encoder\n    # Stage 1: 下采样到 1/4\n    x = bottleneck_downsample(x, out_ch=64)  # 1个下采样bottleneck\n    for i in range(4):\n        x = bottleneck(x, out_ch=64)  # 4个常规bottleneck\n\n    # Stage 2: 下采样到 1/8 + 多样化卷积\n    x = bottleneck_downsample(x, out_ch=128)\n    for dilate in [1, 2, 1, 4, 1, 8, 1, 16]:  # 交替使用dilated\n        x = bottleneck(x, out_ch=128, dilation=dilate)\n\n    # Stage 3: 保持 1/8，重复 Stage 2 模式（无下采样）\n    for dilate in [1, 2, 1, 4, 1, 8, 1, 16]:\n        x = bottleneck(x, out_ch=128, dilation=dilate)\n\n    # Decoder\n    # Stage 4: 上采样到 1/4\n    x = bottleneck_upsample(x, out_ch=64)\n    for i in range(4):\n        x = bottleneck(x, out_ch=64)\n\n    # Stage 5: 上采样到 1/2\n    x = bottleneck_upsample(x, out_ch=16)\n    for i in range(2):\n        x = bottleneck(x, out_ch=16)\n\n    # 最终全卷积上采样到原始分辨率\n    output = TransposedConv2d(16, num_classes, kernel=2, stride=2)(x)\n    return output\n\ndef bottleneck(x, out_ch, dilation=1, asymmetric=False):\n    &quot;&quot;&quot;核心瓶颈模块&quot;&quot;&quot;\n    internal_ch = out_ch // 4  # 4倍降维比\n    # 主路径\n    main = Conv1x1(x, internal_ch)  # 投影降维\n    main = BatchNorm(PReLU(main))\n    if asymmetric:\n        main = Conv_5x1(main, internal_ch)\n        main = Conv_1x5(main, internal_ch)  # 分解卷积\n    else:\n        main = Conv3x3(main, internal_ch, dilation=dilation)\n    main = BatchNorm(PReLU(main))\n    main = Conv1x1(main, out_ch)  # 扩展回原维度\n    main = BatchNorm(main)\n    main = SpatialDropout(main)\n    # 残差连接\n    return PReLU(x + main)\n</code></pre>\n<h5>动机与背景</h5>\n<p>语义分割是自动驾驶、机器人导航等场景的核心视觉任务，但当时主流方法（如 SegNet、FCN）计算量巨大，无法在嵌入式设备上实时运行。ENet 的核心动机是：</p>\n<div class=\"key-point\">💡 关键：能否设计一个网络，在精度仅略有下降的情况下，将推理速度提升一个数量级，使其能在移动端/嵌入式设备上实时运行？</div>\n<p>传统方法的主要问题：\n1. <strong>SegNet</strong>：对称编码器-解码器设计导致解码器参数冗余（解码器与编码器同等大小）\n2. <strong>FCN</strong>：基于 VGG 等重量级骨干网络，参数量和计算量过大\n3. <strong>Dilated Convolutions (DeepLab)</strong>：虽然避免了下采样信息损失，但在高分辨率特征图上计算代价极高</p>\n<h5>核心机制详解</h5>\n<p><strong>1. 早期激进下采样（Early Downsampling）</strong></p>\n<p>ENet 在前两个阶段就将分辨率降至 1/8，这与传统方法形成鲜明对比。其理论依据是：</p>\n<p>$$\\text{计算量} \\propto \\text{特征图面积} \\times \\text{通道数}^2$$</p>\n<p>视觉信息具有高度空间冗余性，前几层主要提取边缘、颜色等低级特征，不需要在全分辨率上操作。通过在 Initial Block 中使用 stride-2 卷积，输入立即从 \\(512 \\times 1024\\) 降至 \\(256 \\times 512\\)，计算量减少 4 倍。</p>\n<p><strong>2. Initial Block 的信息保留设计</strong></p>\n<p>$$\\text{output} = \\text{Concat}[\\text{Conv}_{3\\times3}^{s=2}(x),\\ \\text{MaxPool}_{2\\times2}(x)]$$</p>\n<p>并行使用卷积和池化的设计灵感来自 Inception 模块。单纯使用池化会丢失信息，单纯使用卷积计算量大。两者拼接既保留了池化的位置不变性，又通过卷积学习到有用的特征变换，最终产生 16 通道输出（13 + 3）。</p>\n<p><strong>3. 非对称编码器-解码器</strong></p>\n<div class=\"warn-box\">⚠️ 注意：ENet 的解码器远小于编码器，这与 SegNet/U-Net 的对称设计截然不同。</div>\n<p>作者的关键洞察是：编码器的功能类似于分类网络（提取语义特征），需要足够的容量；而解码器仅需将粗糙的语义图上采样并细化边界，任务相对简单。实验表明，将解码器参数从编码器的 100% 减少到约 20%，精度仅下降 2-3 个 IoU 点。</p>\n<p><strong>4. 瓶颈模块中的多样化卷积</strong></p>\n<p>ENet 在 Stage 2 和 Stage 3 中交替使用不同类型的卷积：</p>\n<ul>\n<li><strong>空洞卷积（Dilated Convolution）</strong>：在不增加参数的情况下扩大感受野</li>\n</ul>\n<p>$$\\text{有效感受野} = k + (k-1) \\times (d-1)$$</p>\n<p>其中 \\(k\\) 为核大小，\\(d\\) 为膨胀率。使用 dilation = 2, 4, 8, 16 逐步扩大感受野。</p>\n<ul>\n<li><strong>非对称卷积（Asymmetric Convolution）</strong>：将 \\(n \\times n\\) 卷积分解为 \\(n \\times 1 + 1 \\times n\\)</li>\n</ul>\n<p>$$\\text{参数量}: n^2 \\rightarrow 2n \\quad (5\\times5: 25 \\rightarrow 10)$$</p>\n<p>这种分解在保持相同感受野的同时大幅减少参数，且引入了更多非线性（两次激活）。</p>\n<p><strong>5. Spatial Dropout 正则化</strong></p>\n<p>不同于标准 Dropout 随机置零单个神经元，Spatial Dropout 随机置零整个特征图通道：</p>\n<p>$$\\text{SpatialDropout}(X)_{c,h,w} = \\begin{cases} 0 & \\text{if channel } c \\text{ is dropped} \\\\ X_{c,h,w} / (1-p) & \\text{otherwise} \\end{cases}$$</p>\n<p>这迫使网络不依赖于任何单一特征图，增强了特征的冗余性和鲁棒性。</p>\n<p><strong>6. 自定义类别加权损失</strong></p>\n<p>针对语义分割中严重的类别不均衡问题（如道路像素远多于行人像素），ENet 设计了对数加权方案：</p>\n<p>$$w_{class} = \\frac{1}{\\ln(c + p_{class})}$$</p>\n<p>其中 \\(p_{class}\\) 为该类别在训练集中的像素频率，\\(c = 1.02\\)（略大于 \\(e\\) 的倒数，确保权重为正）。相比简单的频率倒数加权，对数形式避免了极端权重值。</p>\n<h5>与传统方法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>指标</th>\n<th>ENet</th>\n<th>SegNet</th>\n<th>DeepLab-LFOV</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>参数量</td>\n<td>0.37M</td>\n<td>29.5M (79×)</td>\n<td>37.3M (101×)</td>\n</tr>\n<tr>\n<td>GFLOPs</td>\n<td>3.83</td>\n<td>286.0 (75×)</td>\n<td>36.0 (9.4×)</td>\n</tr>\n<tr>\n<td>推理时间 (Cityscapes)</td>\n<td>7ms</td>\n<td>757ms (18×)</td>\n<td>-</td>\n</tr>\n<tr>\n<td>Cityscapes IoU</td>\n<td>58.3%</td>\n<td>57.0%</td>\n<td>63.1%</td>\n</tr>\n<tr>\n<td>模型大小</td>\n<td>0.7MB</td>\n<td>112.9MB</td>\n<td>142.5MB</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 关键：ENet 以不到 1% 的参数量和计算量，达到了与 SegNet 相当甚至略优的精度，同时推理速度提升了 18 倍。</div>",
      "quiz": {
        "q": "ENet 的 Initial Block 为什么采用并行卷积和最大池化再拼接的设计？",
        "options": [
          "为了增加网络深度，提升特征表达能力",
          "为了在高效下采样的同时保留更多输入信息，避免单一操作的信息损失",
          "为了实现多尺度特征融合，类似 FPN 的设计",
          "为了减少反向传播时的梯度消失问题"
        ],
        "answer": 1,
        "explain": "并行卷积学习特征变换，池化保留位置不变性，拼接后既高效完成2倍下采样又最大化保留输入信息，避免了单纯池化的信息丢失或单纯卷积的计算开销。"
      }
    },
    {
      "id": "deeplabv2",
      "num": 6,
      "name": "DeepLabv2",
      "fullName": "深度实验室v2 (DeepLab v2)",
      "year": "2017",
      "org": "Google",
      "parent": "deeplabv1",
      "paperUrl": "https://arxiv.org/abs/1606.00915",
      "projectUrl": "",
      "category": "core",
      "motivation": "提出ASPP多尺度特征聚合",
      "summary": "DeepLabv2 提出了基于空洞卷积（Atrous Convolution）的特征提取框架，结合空洞空间金字塔池化（ASPP）捕获多尺度上下文信息，并利用全连接条件随机场（Dense CRF）恢复精细边界，在 PASCAL VOC 2012 上达到 79.7% mIOU，系统性解决了深度卷积网络用于语义分割时分辨率损失和多尺度目标识别的核心问题。",
      "keyPoints": [
        "<strong>空洞卷积（Atrous Convolution）</strong>：在不增加参数量的前提下扩大感受野，替代池化导致的分辨率下降，控制特征图分辨率",
        "<strong>空洞空间金字塔池化（ASPP）</strong>：使用多个不同采样率（rate=6,12,18,24）的空洞卷积并行探测多尺度特征，融合后生成鲁棒的分割预测",
        "<strong>全连接 CRF 后处理</strong>：利用全连接条件随机场（DenseCRF）建模像素间长程依赖，结合颜色和位置信息精细化分割边界",
        "<strong>骨干网络</strong>：支持 VGG-16 和 ResNet-101，ResNet-101 的恒等映射结构天然有利于边界定位",
        "<strong>多尺度输入融合</strong>：通过多尺度图像输入 + max-pooling 融合进一步提升性能",
        "<strong>四个基准数据集验证</strong>：PASCAL VOC 2012（79.7%）、PASCAL-Context（45.7%）、PASCAL-Person-Part（64.94%）、Cityscapes（71.4% val）"
      ],
      "detail": "<p><img alt=\"DeepLabv2 系统架构图\" src=\"https://ar5iv.labs.arxiv.org/html/1606.00915v2/assets/x1.png\" />\n<em>图：DeepLab 系统总览——DCNN 生成粗糙得分图，经双线性插值上采样后由全连接 CRF 精细化得到最终分割结果</em></p>\n<p><img alt=\"ASPP 结构示意图\" src=\"https://ar5iv.labs.arxiv.org/html/1606.00915v2/assets/x4.png\" />\n<em>图：空洞空间金字塔池化（ASPP）——使用不同采样率的空洞卷积并行提取多尺度特征</em></p>\n<pre><code class=\"language-python\"># DeepLabv2 核心推理流程伪代码\ndef deeplabv2_inference(image, backbone='resnet101'):\n    # 1. 多尺度输入（可选）\n    scales = [0.5, 0.75, 1.0]\n    score_maps = []\n\n    for scale in scales:\n        scaled_img = resize(image, scale)\n\n        # 2. 骨干网络提取特征（使用空洞卷积保持分辨率）\n        # 将最后两个池化层的 stride 从 2 改为 1\n        # 后续卷积层使用 rate=2, 4 的空洞卷积补偿感受野\n        features = backbone_with_atrous_conv(scaled_img)  # output_stride=8\n\n        # 3. ASPP: 多个并行的空洞卷积分支\n        aspp_out = []\n        for rate in [6, 12, 18, 24]:\n            branch = atrous_conv_3x3(features, rate=rate)\n            aspp_out.append(branch)\n        fused = concat_and_conv1x1(aspp_out)\n\n        score_maps.append(fused)\n\n    # 4. 多尺度融合（max-pooling）\n    merged_score = max_pool_fusion(score_maps)\n\n    # 5. 双线性插值上采样到原始分辨率\n    upsampled = bilinear_upsample(merged_score, target_size=image.shape)\n\n    # 6. Dense CRF 后处理\n    prediction = dense_crf(upsampled, image)\n\n    return prediction\n</code></pre>\n<h5>动机与背景</h5>\n<p>深度卷积神经网络（DCNN）在图像分类任务上取得了巨大成功，但将其直接应用于像素级语义分割面临三个核心挑战：</p>\n<ol>\n<li><strong>分辨率损失</strong>：DCNN 中反复的最大池化和下采样操作导致特征图分辨率急剧降低（通常为输入的 1/32），丢失了精细的空间信息</li>\n<li><strong>多尺度目标</strong>：场景中物体尺度变化巨大，固定感受野难以同时捕获小目标的细节和大目标的全局上下文</li>\n<li><strong>定位精度不足</strong>：分类网络的空间不变性（invariance）与分割任务要求的精确定位（localization）存在本质矛盾</li>\n</ol>\n<div class=\"key-point\">💡 关键：DeepLabv2 的核心洞察是——空洞卷积可以在不损失分辨率的前提下任意扩大感受野，这为解决上述三个问题提供了统一的技术基础。</div>\n<h5>核心机制一：空洞卷积（Atrous Convolution）</h5>\n<p>空洞卷积（又称膨胀卷积）通过在标准卷积核的采样点之间插入\"空洞\"（zeros）来扩大有效感受野。对于一维信号，空洞卷积定义为：</p>\n<p>$$y[i] = \\sum_{k=1}^{K} x[i + r \\cdot k] \\cdot w[k]$$</p>\n<p>其中 \\(r\\) 为采样率（rate/dilation），\\(K\\) 为滤波器长度。当 \\(r=1\\) 时退化为标准卷积。</p>\n<p><strong>在 DeepLabv2 中的应用</strong>：将 VGG-16/ResNet-101 最后几个池化层的 stride 从 2 改为 1（保持分辨率），同时将后续卷积层替换为空洞卷积（rate=2, 4）以补偿因去除下采样而缩小的感受野。最终实现 output stride = 8（即特征图为输入的 1/8），相比原始的 1/32 保留了更多空间细节。</p>\n<div class=\"warn-box\">⚠️ 注意：空洞卷积不增加任何额外参数——它只是改变了采样模式，复用了预训练权重。</div>\n<h5>核心机制二：空洞空间金字塔池化（ASPP）</h5>\n<p>受 SPPNet 空间金字塔池化启发，ASPP 使用多个不同采样率的空洞卷积并行处理特征图，捕获不同尺度的上下文信息：</p>\n<p>$$\\text{ASPP}(x) = \\text{Fuse}\\left[\\text{AtrousConv}(x, r_1), \\text{AtrousConv}(x, r_2), ..., \\text{AtrousConv}(x, r_n)\\right]$$</p>\n<p>在 DeepLabv2 中，ASPP 使用 4 个并行分支，采样率分别为 \\(r \\in \\{6, 12, 18, 24\\}\\)。每个分支独立产生分类得分图，最终通过逐像素求和（或拼接后 1×1 卷积）融合。</p>\n<p><strong>设计直觉</strong>：小采样率捕获局部纹理和小目标细节，大采样率捕获全局上下文和大目标结构。多尺度并行探测使模型对目标尺度变化具有鲁棒性。</p>\n<h5>核心机制三：全连接条件随机场（Dense CRF）</h5>\n<p>DCNN 输出的得分图通常较为平滑，缺乏精细的边界信息。DeepLabv2 采用全连接 CRF 作为后处理步骤，其能量函数为：</p>\n<p>$$E(\\mathbf{x}) = \\sum_i \\theta_i(x_i) + \\sum_{ij} \\theta_{ij}(x_i, x_j)$$</p>\n<p>其中一元势函数 \\(\\theta_i(x_i) = -\\log P(x_i)\\) 来自 DCNN 的输出概率，二元势函数使用两个高斯核：</p>\n<p>$$\\theta_{ij}(x_i, x_j) = \\mu(x_i, x_j)\\left[w_1 \\exp\\left(-\\frac{\\|p_i-p_j\\|^2}{2\\sigma_\\alpha^2} - \\frac{\\|I_i-I_j\\|^2}{2\\sigma_\\beta^2}\\right) + w_2 \\exp\\left(-\\frac{\\|p_i-p_j\\|^2}{2\\sigma_\\gamma^2}\\right)\\right]$$</p>\n<ul>\n<li><strong>双边核</strong>（第一项）：颜色相似且空间相近的像素倾向于获得相同标签——实现边缘感知的平滑</li>\n<li><strong>外观核</strong>（第二项）：仅基于空间距离的平滑先验——去除孤立噪声</li>\n</ul>\n<div class=\"key-point\">💡 关键：与传统短程 CRF 不同，全连接 CRF 连接图像中所有像素对，利用高效的均值场近似推断（基于高维高斯滤波），在 PASCAL VOC 图像上推断时间 &lt; 0.5 秒。</div>\n<h5>与传统方法的区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方面</th>\n<th>传统方法</th>\n<th>DeepLabv2</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>分辨率保持</td>\n<td>反卷积/上采样恢复</td>\n<td>空洞卷积直接保持</td>\n</tr>\n<tr>\n<td>多尺度处理</td>\n<td>图像金字塔（计算昂贵）</td>\n<td>ASPP（共享特征，高效）</td>\n</tr>\n<tr>\n<td>边界精细化</td>\n<td>短程 CRF / skip connection</td>\n<td>全连接 CRF（长程依赖）</td>\n</tr>\n<tr>\n<td>感受野扩大</td>\n<td>更深网络/更大卷积核</td>\n<td>空洞卷积（无额外参数）</td>\n</tr>\n</tbody>\n</table></div>\n<h5>VGG-16 vs ResNet-101</h5>\n<p>论文发现 ResNet-101 的恒等映射（identity mapping）具有类似 Hypercolumn 的效果，能自然地利用中间层特征改善边界定位。实验表明：<strong>ResNet-101 在 CRF 之前的边界精度已接近 VGG-16 + CRF 的水平</strong>，CRF 后处理进一步提升 ResNet-101 的效果。</p>",
      "quiz": {
        "q": "DeepLabv2 中 ASPP 模块使用不同采样率的空洞卷积的主要目的是什么？",
        "options": [
          "减少模型参数量以加速推理",
          "在不同尺度上捕获上下文信息，增强对多尺度目标的鲁棒性",
          "替代全连接 CRF 实现边界精细化",
          "增加网络深度以提升特征表达能力"
        ],
        "answer": 1,
        "explain": "ASPP 通过并行使用不同采样率(6,12,18,24)的空洞卷积，在同一特征图上以不同有效感受野提取多尺度上下文，使模型能同时识别不同大小的目标。"
      }
    },
    {
      "id": "pspnet",
      "num": 7,
      "name": "PSPNet",
      "fullName": "金字塔场景解析网络 (Pyramid Scene Parsing Network)",
      "year": "2017",
      "org": "商汤/港中文",
      "parent": "fcn",
      "paperUrl": "https://arxiv.org/abs/1612.01105",
      "projectUrl": "",
      "category": "core",
      "motivation": "金字塔池化聚合全局上下文",
      "summary": "PSPNet 提出金字塔池化模块（Pyramid Pooling Module），通过多尺度全局先验信息聚合解决了场景解析中因缺乏全局上下文而导致的类别误分类问题，在 ADE20K、PASCAL VOC 2012 和 Cityscapes 三大基准上取得当时最优性能。",
      "keyPoints": [
        "金字塔池化模块（PPM）：4 级自适应池化（1×1, 2×2, 3×3, 6×6）捕获多尺度全局上下文",
        "骨干网络：采用 dilated ResNet（output stride=8），在不损失分辨率的前提下扩大感受野",
        "深度监督（Auxiliary Loss）：在 ResNet 第 4 阶段（res4b22）添加辅助分类头，权重 0.4，加速收敛",
        "多尺度测试 + 水平翻转数据增强用于推理阶段",
        "ADE20K 2016 场景解析挑战赛冠军（mIoU 57.21%）",
        "PASCAL VOC 2012 测试集 mIoU 85.4%，Cityscapes 测试集 mIoU 80.2%"
      ],
      "detail": "<p><img alt=\"PSPNet 架构总览\" src=\"https://ar5iv.labs.arxiv.org/html/1612.01105/assets/x3.png\" />\n<em>图：PSPNet 整体架构。输入图像经 CNN 提取特征图后，通过金字塔池化模块聚合多尺度上下文，最终拼接生成像素级预测。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># PSPNet 前向传播伪代码\ndef forward(image):\n    # Step 1: 骨干网络提取特征 (dilated ResNet, output_stride=8)\n    feature_map = dilated_resnet(image)  # H/8 × W/8 × 2048\n\n    # Step 2: 金字塔池化模块 (PPM)\n    pool_1x1 = AdaptiveAvgPool2d(1)(feature_map)   # 1×1×2048 → Conv1x1 → 1×1×512\n    pool_2x2 = AdaptiveAvgPool2d(2)(feature_map)   # 2×2×2048 → Conv1x1 → 2×2×512\n    pool_3x3 = AdaptiveAvgPool2d(3)(feature_map)   # 3×3×2048 → Conv1x1 → 3×3×512\n    pool_6x6 = AdaptiveAvgPool2d(6)(feature_map)   # 6×6×2048 → Conv1x1 → 6×6×512\n\n    # 上采样回原特征图尺寸并拼接\n    context = Concat([\n        feature_map,                          # 2048-d\n        Upsample(Conv1x1(pool_1x1)),         # 512-d\n        Upsample(Conv1x1(pool_2x2)),         # 512-d\n        Upsample(Conv1x1(pool_3x3)),         # 512-d\n        Upsample(Conv1x1(pool_6x6))          # 512-d\n    ])  # 总计 4096-d\n\n    # Step 3: 最终分类\n    output = Conv3x3_BN_ReLU(context)  # 降维到 512\n    prediction = Conv1x1(output)        # 输出 num_classes 通道\n    return Upsample_8x(prediction)      # 上采样到原图尺寸\n</code></pre>\n<h5>动机与背景</h5>\n<p>场景解析（Scene Parsing）要求对图像中每个像素进行语义标注，是自动驾驶、机器人导航等应用的基础。基于 FCN 的方法虽然实现了端到端像素预测，但存在三个关键问题：</p>\n<ol>\n<li><strong>关系不匹配（Mismatched Relationship）</strong>：局部特征无法利用物体间的共现关系。例如，\"船\"常出现在\"水\"上方，但缺乏全局上下文时，网络可能将水面上的物体误判为\"车\"。</li>\n<li><strong>类别混淆（Confusion Categories）</strong>：外观相似的类别（如\"田野\"和\"土地\"）在局部区域难以区分，需要全局语义信息辅助判断。</li>\n<li><strong>不显眼类别（Inconspicuous Classes）</strong>：小尺寸物体（如路灯、标志牌）容易被周围大面积区域的特征淹没。</li>\n</ol>\n<div class=\"key-point\">💡 关键：这三个问题的共同根源是<strong>感受野不足</strong>——即使 dilated convolution 扩大了理论感受野，网络仍然难以有效利用图像级别的全局信息。</div>\n<h5>核心机制：金字塔池化模块（PPM）</h5>\n<p>PPM 的设计灵感来自空间金字塔池化（SPP），但目标不同：SPP 用于生成固定长度的特征向量，而 PPM 用于为每个像素注入多尺度全局上下文。</p>\n<p><strong>四级池化的设计逻辑：</strong></p>\n<p>$$\\text{PPM}(F) = \\text{Cat}\\left[F,\\; \\text{Up}(f_1(P_1(F))),\\; \\text{Up}(f_2(P_2(F))),\\; \\text{Up}(f_3(P_3(F))),\\; \\text{Up}(f_4(P_4(F)))\\right]$$</p>\n<p>其中 \\(P_n\\) 为自适应平均池化（输出尺寸分别为 1×1, 2×2, 3×3, 6×6），\\(f_n\\) 为 1×1 卷积（降维至原通道数的 \\(1/N\\)，N=4 即 512 维），Up 为双线性上采样。</p>\n<ul>\n<li><strong>1×1 级别</strong>：捕获全局平均信息（相当于全图统计先验）</li>\n<li><strong>2×2 级别</strong>：粗粒度空间分区上下文</li>\n<li><strong>3×3 级别</strong>：中等粒度区域上下文</li>\n<li><strong>6×6 级别</strong>：细粒度局部区域上下文</li>\n</ul>\n<div class=\"warn-box\">⚠️ 注意：1×1 卷积的降维操作至关重要——它将每级池化的通道数从 2048 降至 512，确保拼接后的特征维度可控（4096 = 2048 + 512×4），避免全局上下文淹没原始局部特征。</div>\n<h5>骨干网络：Dilated ResNet</h5>\n<p>PSPNet 使用预训练的 ResNet（101 或更深）作为骨干，并对最后两个 stage 进行 dilated（空洞）卷积改造：</p>\n<ul>\n<li><strong>原始 ResNet</strong>：经过 5 次下采样，输出为 1/32 分辨率</li>\n<li><strong>Dilated 改造</strong>：移除最后两个 stage 的下采样（stride=2→1），用 dilation rate=2 和 4 的空洞卷积补偿感受野损失</li>\n<li><strong>最终输出</strong>：1/8 分辨率的特征图（60×60 for 473×473 输入）</li>\n</ul>\n<p>这样既保持了较高的空间分辨率（有利于精细分割），又维持了足够大的感受野。</p>\n<h5>深度监督训练策略</h5>\n<p><img alt=\"辅助损失示意\" src=\"https://ar5iv.labs.arxiv.org/html/1612.01105/assets/x4.png\" />\n<em>图：深度监督策略。在 ResNet 第 4 阶段末尾（res4b22）添加辅助分类头。</em></p>\n<p>总损失函数为：</p>\n<p>$$L = L_{\\text{main}} + \\alpha \\cdot L_{\\text{aux}}$$</p>\n<p>其中 \\(\\alpha = 0.4\\)。辅助损失作用于 res4b22 层的输出，通过额外的分类头（BN + ReLU + Conv1×1 + 交叉熵）产生梯度。这一设计：\n- 缓解深层网络的梯度消失问题\n- 为中间层提供直接的语义监督信号\n- 推理时辅助分支被丢弃，不增加计算开销</p>\n<h5>训练细节</h5>\n<ul>\n<li><strong>学习率策略</strong>：Poly 衰减，\\(\\text{lr} = \\text{base\\_lr} \\times (1 - \\frac{\\text{iter}}{\\text{max\\_iter}})^{0.9}\\)，初始学习率 0.01</li>\n<li><strong>优化器</strong>：SGD，momentum=0.9，weight decay=0.0001</li>\n<li><strong>Batch Size</strong>：16（多 GPU 同步 BN）</li>\n<li><strong>数据增强</strong>：随机缩放（0.5~2.0）、随机裁剪（473×473）、随机水平翻转</li>\n<li><strong>推理增强</strong>：多尺度测试 + 水平翻转，取平均</li>\n</ul>\n<h5>与传统方法的区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>上下文建模方式</th>\n<th>局限性</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>FCN</td>\n<td>仅依赖卷积感受野</td>\n<td>理论感受野远大于有效感受野</td>\n</tr>\n<tr>\n<td>DeepLab (ASPP)</td>\n<td>多个 dilation rate 的并行空洞卷积</td>\n<td>仍是局部操作，无法获取全局信息</td>\n</tr>\n<tr>\n<td>ParseNet</td>\n<td>全局平均池化</td>\n<td>仅单一尺度全局特征，缺乏层次性</td>\n</tr>\n<tr>\n<td><strong>PSPNet (PPM)</strong></td>\n<td><strong>多尺度全局池化 + 拼接</strong></td>\n<td><strong>兼顾全局统计与多粒度空间布局</strong></td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 关键：PSPNet 的核心优势在于 PPM 以极低的计算代价（几个池化 + 1×1 卷积）实现了从全局到局部的多尺度上下文聚合，且通过拼接（而非相加）保留了原始特征的完整性。</div>",
      "quiz": {
        "q": "PSPNet 金字塔池化模块中，1×1 卷积的主要作用是什么？",
        "options": [
          "增加非线性表达能力",
          "将池化后的特征通道数降维，防止全局上下文淹没局部特征",
          "替代 3×3 卷积以减少计算量",
          "实现跨通道的特征融合以提升分类精度"
        ],
        "answer": 1,
        "explain": "PPM 中每级池化后接 1×1 卷积将 2048 维降至 512 维（原通道数的 1/N），确保拼接后全局上下文与原始局部特征的权重平衡。"
      }
    },
    {
      "id": "deeplabv3",
      "num": 8,
      "name": "DeepLabv3",
      "fullName": "深度实验室v3 (DeepLab v3)",
      "year": "2017",
      "org": "Google",
      "parent": "deeplabv2",
      "paperUrl": "https://arxiv.org/abs/1706.05587",
      "projectUrl": "",
      "category": "core",
      "motivation": "改进ASPP加入图像级特征",
      "summary": "DeepLabv3 的核心目标是：改进ASPP加入图像级特征。",
      "keyPoints": [
        "核心动机：改进ASPP加入图像级特征",
        "演化来源：继承或改进自 deeplabv2",
        "代表机构：Google"
      ],
      "detail": "<p>改进ASPP加入图像级特征</p>"
    },
    {
      "id": "deeplabv3plus",
      "num": 9,
      "name": "DeepLabv3+",
      "fullName": "深度实验室v3+ (DeepLab v3+)",
      "year": "2018",
      "org": "Google",
      "parent": "deeplabv3",
      "paperUrl": "https://arxiv.org/abs/1802.02611",
      "projectUrl": "",
      "category": "core",
      "motivation": "编码-解码器+深度可分离空洞卷积",
      "summary": "DeepLabv3+ 在 DeepLabv3 的 ASPP 编码器基础上引入简洁的解码器模块以恢复物体边界细节，并将深度可分离卷积与空洞卷积结合（Atrous Separable Convolution）大幅降低计算量，在 PASCAL VOC 2012 上达到 89.0% mIOU。",
      "keyPoints": [
        "编码器-解码器架构：在 DeepLabv3（ASPP）编码器之上增加轻量解码器，融合低层特征恢复边界细节",
        "Atrous Separable Convolution：将空洞卷积应用于深度可分离卷积的 depthwise 层，兼顾大感受野与计算效率",
        "改进的 Xception-65 骨干网络：更深层数、所有 max pooling 替换为 strided depthwise separable conv、每层后加 BN+ReLU",
        "解码器设计：编码器特征 4× 上采样 → 与 1×1 卷积降维后的低层特征拼接 → 3×3 卷积精炼 → 4× 上采样",
        "PASCAL VOC 2012 test 89.0% mIOU，Cityscapes test 82.1% mIOU"
      ],
      "detail": "<p><img alt=\"DeepLabv3+ 编码器-解码器架构\" src=\"https://production-media.paperswithcode.com/methods/deeplabv3plus_Vj3CT2c.png\" />\n<em>图：DeepLabv3+ 整体架构。左侧为编码器（含 ASPP 模块），右侧为解码器（融合低层特征并逐步上采样）</em></p>\n<h5>算法核心流程</h5>\n<pre><code class=\"language-python\"># DeepLabv3+ 前向推理伪代码\ndef deeplabv3plus_forward(input_image):\n    # === 编码器 ===\n    # 骨干网络提取多尺度特征 (output_stride=16)\n    low_level_features = backbone.conv2(input_image)   # 1/4 分辨率\n    high_level_features = backbone.final(input_image)  # 1/16 分辨率\n\n    # ASPP 多尺度上下文聚合\n    aspp_out = ASPP(high_level_features)  # rates=[6,12,18], 1x1conv, global_avg_pool\n    encoder_output = concat_and_1x1(aspp_out)  # 256 channels\n\n    # === 解码器 ===\n    # 编码器输出上采样 4×\n    upsampled_encoder = bilinear_upsample_4x(encoder_output)  # 1/4 分辨率\n\n    # 低层特征降维 (从256/512通道降至48)\n    low_level_reduced = conv1x1(low_level_features, out_channels=48)\n\n    # 特征融合\n    fused = concat(upsampled_encoder, low_level_reduced)\n    refined = conv3x3(conv3x3(fused))  # 两层3×3卷积精炼\n\n    # 最终上采样 4× 恢复原始分辨率\n    output = bilinear_upsample_4x(refined)\n    return output\n</code></pre>\n<h5>动机与背景</h5>\n<p>语义分割需要同时捕获<strong>全局语义信息</strong>（识别物体类别）和<strong>精细空间细节</strong>（准确的边界定位）。此前的方法存在两种主要范式：</p>\n<ol>\n<li>\n<p><strong>空间金字塔池化方法</strong>（如 DeepLabv3/PSPNet）：通过多尺度空洞卷积或池化操作捕获丰富的上下文信息，但由于多次下采样，输出分辨率低（通常为输入的 1/16），物体边界模糊。虽然可以用 output_stride=8 提升分辨率，但计算量增加约 4 倍。</p>\n</li>\n<li>\n<p><strong>编码器-解码器方法</strong>（如 U-Net/SegNet）：通过逐步上采样和跳跃连接恢复空间细节，但编码器通常缺乏足够的多尺度上下文建模能力。</p>\n</li>\n</ol>\n<p>DeepLabv3+ 的核心思想是<strong>结合两种范式的优势</strong>：用 DeepLabv3 的 ASPP 作为强大的编码器捕获多尺度上下文，再用简洁的解码器模块恢复边界细节。</p>\n<h5>核心机制详解</h5>\n<p><strong>1. 空洞卷积（Atrous Convolution）</strong></p>\n<p>空洞卷积通过在卷积核中插入空洞（zeros）来扩大感受野而不增加参数量：</p>\n<p>$$y[i] = \\sum_{k} x[i + r \\cdot k] \\cdot w[k]$$</p>\n<p>其中 \\(r\\) 为空洞率（atrous rate）。当 \\(r=1\\) 时退化为标准卷积。通过调整 \\(r\\)，可以在不改变特征图分辨率的情况下控制感受野大小。</p>\n<div class=\"key-point\">💡 关键：空洞卷积允许在保持高分辨率特征图的同时获得大感受野，这是 DeepLab 系列的核心思想。</div>\n<p><strong>2. 深度可分离空洞卷积（Atrous Separable Convolution）</strong></p>\n<p>将空洞卷积与深度可分离卷积结合，分为两步：</p>\n<p>$$\\text{Atrous Depthwise Conv: } y_c[i] = \\sum_{k} x_c[i + r \\cdot k] \\cdot w_c[k]$$</p>\n<p>$$\\text{Pointwise Conv: } z[i] = \\sum_{c} y_c[i] \\cdot v_c$$</p>\n<ul>\n<li><strong>Depthwise</strong>：对每个输入通道独立执行空洞卷积（rate=\\(r\\)）</li>\n<li><strong>Pointwise</strong>：用 1×1 卷积混合通道信息</li>\n</ul>\n<p>相比标准空洞卷积，计算量降低为约 \\(\\frac{1}{C_{out}} + \\frac{1}{k^2}\\)（其中 \\(k\\) 为卷积核大小，\\(C_{out}\\) 为输出通道数）。</p>\n<div class=\"warn-box\">⚠️ 注意：Atrous Separable Convolution 被应用于 ASPP 模块和解码器中的 3×3 卷积，显著降低了整体计算开销。</div>\n<p><strong>3. 编码器：ASPP 模块</strong></p>\n<p>ASPP（Atrous Spatial Pyramid Pooling）在 output_stride=16 的特征图上并行应用多个不同空洞率的卷积：</p>\n<ul>\n<li>1×1 卷积（等价于 rate=0）</li>\n<li>3×3 空洞卷积，rate=6</li>\n<li>3×3 空洞卷积，rate=12</li>\n<li>3×3 空洞卷积，rate=18</li>\n<li>全局平均池化（Image-level features）</li>\n</ul>\n<p>五个分支的输出拼接后通过 1×1 卷积融合为 256 通道的编码器输出。</p>\n<p><strong>4. 解码器模块</strong></p>\n<p>解码器的设计简洁而有效：</p>\n<ol>\n<li>编码器输出（1/16 分辨率）通过双线性插值上采样 <strong>4×</strong> 至 1/4 分辨率</li>\n<li>骨干网络中对应的低层特征（1/4 分辨率，如 ResNet 的 Conv2 或 Xception 的 Entry flow 输出）通过 <strong>1×1 卷积</strong>将通道数从 256（或 128）降至 <strong>48</strong></li>\n<li>两者在通道维度 <strong>拼接</strong></li>\n<li>经过若干 <strong>3×3 卷积</strong>（论文中使用两个 3×3 的 256 通道卷积）精炼融合特征</li>\n<li>最终通过双线性插值上采样 <strong>4×</strong> 恢复至原始分辨率</li>\n</ol>\n<div class=\"key-point\">💡 关键：低层特征通道降至 48 是经过消融实验确定的——过多低层通道会使训练困难且淹没编码器的语义信息。</div>\n<p><strong>5. 改进的 Xception 骨干网络</strong></p>\n<p>论文对 Xception 架构做了三项关键修改以适配语义分割：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>修改</th>\n<th>原始 Xception</th>\n<th>DeepLabv3+ 的 Xception-65</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>深度</td>\n<td>36 层</td>\n<td>65 层（Middle flow 重复 16 次）</td>\n</tr>\n<tr>\n<td>下采样</td>\n<td>Max pooling</td>\n<td>Strided depthwise separable conv</td>\n</tr>\n<tr>\n<td>激活</td>\n<td>无中间激活</td>\n<td>每个 depthwise conv 后加 BN + ReLU</td>\n</tr>\n</tbody>\n</table></div>\n<p>此外，所有 depthwise separable conv 后都添加了 Batch Normalization。</p>\n<h5>与 DeepLabv3 的关键区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方面</th>\n<th>DeepLabv3</th>\n<th>DeepLabv3+</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>解码器</td>\n<td>无（直接双线性 16× 上采样）</td>\n<td>有（融合低层特征，分步 4×+4× 上采样）</td>\n</tr>\n<tr>\n<td>卷积类型</td>\n<td>标准空洞卷积</td>\n<td>深度可分离空洞卷积</td>\n</tr>\n<tr>\n<td>骨干网络</td>\n<td>ResNet-101</td>\n<td>Modified Xception-65（更优）</td>\n</tr>\n<tr>\n<td>边界质量</td>\n<td>较粗糙</td>\n<td>显著提升（尤其细长物体）</td>\n</tr>\n<tr>\n<td>计算效率</td>\n<td>较高</td>\n<td>更低（深度可分离卷积降低约 50% 计算量）</td>\n</tr>\n</tbody>\n</table></div>\n<h5>实验结果</h5>\n<p>在 PASCAL VOC 2012 测试集上，DeepLabv3+ 以 Modified Xception-65 为骨干、使用 JFT 预训练时达到 <strong>89.0% mIOU</strong>，刷新当时的 state-of-the-art。在 Cityscapes 测试集上达到 <strong>82.1% mIOU</strong>。</p>\n<p>消融实验表明：\n- 解码器相比直接上采样提升约 <strong>2% mIOU</strong>（尤其在边界区域提升 trimap 评估约 5%）\n- 使用 Xception-65 比 ResNet-101 提升约 <strong>2% mIOU</strong>\n- 深度可分离卷积在几乎不损失精度的情况下将 ASPP 和解码器的计算量降低约 <strong>50%</strong></p>",
      "quiz": {
        "q": "DeepLabv3+ 解码器中，低层特征在与编码器特征拼接前需要经过什么处理？",
        "options": [
          "3×3 卷积将通道数增加到 256",
          "1×1 卷积将通道数降低到 48",
          "全局平均池化后拼接",
          "直接使用原始通道数拼接"
        ],
        "answer": 1,
        "explain": "论文通过消融实验确定使用 1×1 卷积将低层特征从 256/512 通道降至 48 通道，避免低层特征淹没编码器的高层语义信息。"
      }
    },
    {
      "id": "hrnet",
      "num": 10,
      "name": "HRNet",
      "fullName": "高分辨率网络 (High-Resolution Network)",
      "year": "2019",
      "org": "中科大/MSRA",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/1908.07919",
      "projectUrl": "",
      "category": "core",
      "motivation": "并行高分辨率子网持续融合",
      "summary": "HRNet通过在整个网络中**并行维护多分辨率子网络**并**反复进行多分辨率融合**，避免了传统方法中先降分辨率再恢复的信息损失，在语义分割、姿态估计、目标检测等密集预测任务上取得了优异性能。",
      "keyPoints": [
        "<strong>HRNetV1</strong>：仅输出最高分辨率特征（用于姿态估计）",
        "<strong>HRNetV2</strong>：将所有分辨率上采样到最高分辨率后concat，得到15C维表示（用于语义分割）",
        "<strong>HRNetV2p</strong>：在HRNetV2基础上构建特征金字塔（用于目标检测）"
      ],
      "detail": "<h5>网络整体架构</h5>\n<p><img alt=\"HRNet Architecture\" src=\"https://ar5iv.labs.arxiv.org/html/1908.07919/assets/x2.png\" /></p>\n<p><em>图：HRNet整体架构。网络包含4个stage，第n个stage包含n条并行的不同分辨率子网络。每条子网络由多个残差块组成，子网络之间通过exchange unit进行信息融合。</em></p>\n<h5>多分辨率融合模块</h5>\n<p><img alt=\"Multi-Resolution Fusion\" src=\"https://ar5iv.labs.arxiv.org/html/1908.07919/assets/x3.png\" /></p>\n<p><em>图：Exchange Unit的融合方式。每个输出分辨率的特征等于所有输入分辨率经过变换后的加和。变换方式取决于分辨率差异：同分辨率用identity，下采样用strided 3×3 conv，上采样用bilinear interpolation + 1×1 conv。</em></p>\n<h5>表示头设计</h5>\n<p><img alt=\"Representation Heads\" src=\"https://ar5iv.labs.arxiv.org/html/1908.07919/assets/x4.png\" /></p>\n<p><em>图：三种表示头。(a) HRNetV1只取高分辨率输出；(b) HRNetV2将所有分辨率concat；(c) HRNetV2p在concat基础上构建多尺度金字塔。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-text\">Algorithm: HRNet Forward Pass (Semantic Segmentation)\nInput: Image I (H×W×3)\nOutput: Segmentation map S (H×W×num_classes)\n\n1. Stem: x = two_stride2_3x3_conv(I)  // 输出 H/4 × W/4\n2. Stage 1: R1 = residual_blocks(x)   // 1条流, 分辨率 H/4\n3. Stage 2: \n     新增 H/8 流: R2_init = strided_conv(R1)\n     for each exchange_unit:\n       R1, R2 = fuse(R1, R2)          // 2条流并行 + 融合\n4. Stage 3:\n     新增 H/16 流: R3_init = strided_conv(R2)\n     for each exchange_unit:\n       R1, R2, R3 = fuse(R1, R2, R3)  // 3条流并行 + 融合\n5. Stage 4:\n     新增 H/32 流: R4_init = strided_conv(R3)\n     for each exchange_unit:\n       R1, R2, R3, R4 = fuse(R1, R2, R3, R4)  // 4条流并行 + 融合\n6. Representation Head (HRNetV2):\n     R2_up = bilinear_upsample(R2, scale=2)\n     R3_up = bilinear_upsample(R3, scale=4)\n     R4_up = bilinear_upsample(R4, scale=8)\n     feat = concat(R1, R2_up, R3_up, R4_up)   // 15C channels\n7. S = softmax(linear_classifier(feat))\n8. S = bilinear_upsample(S, scale=4)           // 恢复到原始分辨率\nReturn S\n</code></pre>\n<h5>融合函数（Exchange Unit）详解</h5>\n<p>对于第r条输出流（分辨率为输入的 1/2^(r+1)），其输出为：</p>\n<p>$$R_r^{out} = \\sum_{s=1}^{S} f_{s \\to r}(R_s^{in})$$</p>\n<p>其中变换函数 $f_{s \\to r}$ 的定义：\n- <strong>s = r</strong>（同分辨率）：identity mapping\n- <strong>s &lt; r</strong>（需要下采样）：连续 (r-s) 个 strided 3×3 conv（stride=2），每个后接BN，最后一个不加ReLU\n- <strong>s &gt; r</strong>（需要上采样）：1×1 conv对齐通道数 + bilinear 2× 上采样（重复 s-r 次）</p>\n<p>所有分支加和后统一过ReLU激活。</p>\n<h5>关键实验结果（语义分割）</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>Backbone</th>\n<th>Params</th>\n<th>GFLOPs</th>\n<th>Cityscapes val mIoU</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>DeepLabv3</td>\n<td>D-ResNet-101</td>\n<td>58.0M</td>\n<td>1778.7</td>\n<td>78.5</td>\n</tr>\n<tr>\n<td>PSPNet</td>\n<td>D-ResNet-101</td>\n<td>65.9M</td>\n<td>2017.6</td>\n<td>79.7</td>\n</tr>\n<tr>\n<td>DeepLabv3+</td>\n<td>D-Xception-71</td>\n<td>43.5M</td>\n<td>1444.6</td>\n<td>79.6</td>\n</tr>\n<tr>\n<td><strong>HRNetV2-W40</strong></td>\n<td>HRNetV2</td>\n<td><strong>45.2M</strong></td>\n<td><strong>493.2</strong></td>\n<td><strong>80.2</strong></td>\n</tr>\n<tr>\n<td><strong>HRNetV2-W48</strong></td>\n<td>HRNetV2</td>\n<td>65.9M</td>\n<td>696.2</td>\n<td><strong>81.1</strong></td>\n</tr>\n<tr>\n<td>HRNetV2-W48+OCR</td>\n<td>HRNetV2</td>\n<td>70.3M</td>\n<td>1206.3</td>\n<td><strong>81.6</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>关键观察</strong>：\n- HRNetV2-W40仅用493 GFLOPs（PSPNet的1/4）即超越PSPNet 0.5 mIoU\n- 在PASCAL-Context (60类) 上达到54.0 mIoU（当时SOTA）\n- 在LIP人体解析数据集上达到55.90 mIoU（无需额外姿态信息）</p>\n<h5>为什么HRNet优于Encoder-Decoder？</h5>\n<ol>\n<li>\n<p><strong>信息保真度</strong>：高分辨率流从未经历大幅下采样，空间细节信息始终保留在网络中，而encoder-decoder中信息经过bottleneck必然有损失。</p>\n</li>\n<li>\n<p><strong>语义增强方式</strong>：通过反复融合低分辨率（高语义）信息到高分辨率流，高分辨率特征同时具备精确位置和丰富语义，而非依赖单次skip connection。</p>\n</li>\n<li>\n<p><strong>计算效率</strong>：低分辨率流的计算量很小（面积为1/4, 1/16, 1/64），但提供了等效的大感受野；相比dilated convolution，不需要在高分辨率上做大kernel计算。</p>\n</li>\n<li>\n<p><strong>多次融合 vs 单次融合</strong>：论文消融实验表明，增加融合次数持续带来性能提升（从1次到4次融合，mIoU从73.2提升到76.0）。</p>\n</li>\n</ol>",
      "quiz": {
        "q": "",
        "options": [],
        "answer": 0,
        "explain": ""
      }
    },
    {
      "id": "panoptic_fpn",
      "num": 11,
      "name": "Panoptic FPN",
      "fullName": "全景特征金字塔网络 (Panoptic FPN)",
      "year": "2019",
      "org": "FAIR",
      "parent": "fcn",
      "paperUrl": "https://arxiv.org/abs/1901.02446",
      "projectUrl": "",
      "category": "unified",
      "motivation": "FPN统一语义与实例分割",
      "summary": "Panoptic FPN 在 Mask R-CNN 的 FPN 骨干上添加一个轻量级语义分割分支（Semantic FPN），通过多尺度特征融合实现像素级 stuff 分类，与实例分割分支联合训练，以单一统一架构同时完成 thing 和 stuff 的全景分割任务。",
      "keyPoints": [
        "统一架构：在 Mask R-CNN + FPN 基础上增加语义分割分支，单模型同时输出实例分割和语义分割",
        "轻量语义分支（Semantic FPN）：将 FPN 各层级（P2-P5，1/4 到 1/32）通过上采样统一到 1/4 分辨率后逐元素相加，再经 1×1 卷积输出类别预测",
        "联合训练策略：总损失 \\(L = \\lambda_i(L_c + L_b + L_m) + \\lambda_s L_s\\)，通过调节 \\(\\lambda_i / \\lambda_s\\) 平衡实例与语义任务",
        "FPN 效率优势：相比空洞卷积方法，FPN 计算量和内存占用大幅降低（约 4-7× 更高效），同时产生更高分辨率特征",
        "实验结果：Cityscapes 语义分割 79.1% mIoU（ResNeXt-101-FPN）；COCO Stuff 2017 挑战赛第一名（28.8 mIoU）"
      ],
      "detail": "<p><img alt=\"Panoptic FPN 整体架构\" src=\"https://ar5iv.labs.arxiv.org/html/1901.02446/assets/x1.png\" />\n<em>图：Panoptic FPN 架构总览。上方为 FPN 骨干 + 实例分割分支（Region-based），下方为新增的轻量语义分割分支（Dense-pixels）。两条分支共享 FPN 特征，联合训练。</em></p>\n<h5>动机与背景</h5>\n<p>全景分割（Panoptic Segmentation）要求同时完成：\n- <strong>Thing 分割</strong>（可数物体如人、车）：传统由实例分割方法（如 Mask R-CNN）处理\n- <strong>Stuff 分割</strong>（不可数区域如天空、道路）：传统由语义分割方法（如 DeepLab、PSPNet）处理</p>\n<p>此前这两类任务使用完全不同的架构：实例分割依赖 FPN + Region Proposal，语义分割依赖空洞卷积（dilated convolution）扩大感受野。Panoptic FPN 的核心洞察是：<strong>FPN 本身已经生成了适合语义分割的多尺度特征</strong>，只需添加一个轻量分支即可，无需空洞卷积。</p>\n<div class=\"key-point\">💡 关键洞察：FPN 在每个空间分辨率上都生成了语义丰富的特征图，天然适合密集像素预测任务，而不仅仅是实例检测。</div>\n<h5>语义分割分支（Semantic FPN）设计</h5>\n<p><img alt=\"Semantic FPN 分支结构\" src=\"https://ar5iv.labs.arxiv.org/html/1901.02446/assets/x3.png\" />\n<em>图：Semantic FPN 分支。将 FPN 各层级特征逐步上采样至 1/4 分辨率后相加融合。</em></p>\n<p>Semantic FPN 的设计遵循<strong>简洁高效</strong>原则：</p>\n<pre><code class=\"language-python\"># Semantic FPN 前向推理伪代码\ndef semantic_fpn_forward(fpn_features):\n    &quot;&quot;&quot;\n    输入: FPN 各层级特征 {P2, P3, P4, P5}\n          P2: 1/4 分辨率, P3: 1/8, P4: 1/16, P5: 1/32\n          每层 256 通道\n    &quot;&quot;&quot;\n    # 每个层级通过上采样链路统一到 1/4 分辨率 (128 通道)\n    # P5 路径: 3×3 conv → 2× upsample → 3×3 conv → 2× upsample → 3×3 conv → 2× upsample\n    p5_out = upsample_2x(conv3x3_gn_relu(\n             upsample_2x(conv3x3_gn_relu(\n             upsample_2x(conv3x3_gn_relu(P5))))))  # 3次 2× 上采样\n\n    # P4 路径: 3×3 conv → 2× upsample → 3×3 conv → 2× upsample\n    p4_out = upsample_2x(conv3x3_gn_relu(\n             upsample_2x(conv3x3_gn_relu(P4))))     # 2次 2× 上采样\n\n    # P3 路径: 3×3 conv → 2× upsample\n    p3_out = upsample_2x(conv3x3_gn_relu(P3))       # 1次 2× 上采样\n\n    # P2 路径: 3×3 conv (已在 1/4 分辨率)\n    p2_out = conv3x3_gn_relu(P2)                     # 无需上采样\n\n    # 逐元素求和融合\n    fused = p2_out + p3_out + p4_out + p5_out  # [B, 128, H/4, W/4]\n\n    # 最终预测: 1×1 卷积 → 4× 双线性上采样\n    logits = bilinear_upsample_4x(conv1x1(fused))  # [B, num_classes, H, W]\n    return logits\n</code></pre>\n<p>设计要点：\n1. <strong>每个上采样阶段</strong>由 <code>3×3 conv + GroupNorm + ReLU + 2× bilinear upsample</code> 组成\n2. <strong>通道数统一为 128</strong>（消融实验表明 128 在精度与效率间最优）\n3. <strong>求和聚合</strong>优于拼接（concat），且更节省内存\n4. 所有卷积后使用 <strong>Group Normalization</strong>（而非 BN），因为语义分割训练时 batch size 通常较小</p>\n<div class=\"warn-box\">⚠️ 注意：该分支极其轻量——仅包含少量 3×3 卷积和上采样操作，不使用空洞卷积、ASPP 或任何复杂模块。</div>\n<h5>联合训练与损失函数</h5>\n<p>Panoptic FPN 的总损失函数为：</p>\n<p>$$L = \\lambda_i \\cdot (L_{cls} + L_{box} + L_{mask}) + \\lambda_s \\cdot L_{sem}$$</p>\n<p>其中：\n- \\(L_{cls}, L_{box}, L_{mask}\\)：Mask R-CNN 的分类、边框回归、实例掩码损失\n- \\(L_{sem}\\)：语义分割的逐像素交叉熵损失\n- \\(\\lambda_i, \\lambda_s\\)：实例与语义任务的损失权重</p>\n<p><strong>关键发现</strong>：联合训练不仅不会相互干扰，反而能<strong>互相促进</strong>：\n- 固定 \\(\\lambda_i = 1\\)，增大 \\(\\lambda_s\\) 时，语义 mIoU 提升（0 → 41.5），实例 AP 仅轻微下降（33.9 → 32.1）\n- 固定 \\(\\lambda_s = 1\\)，增大 \\(\\lambda_i\\) 时，实例 AP 提升（0 → 32.1），语义 mIoU 也略有提升（40.2 → 41.5）\n- 最佳平衡点约在 \\(\\lambda_i = 1, \\lambda_s = 0.5\\)</p>\n<div class=\"key-point\">💡 关键：两个任务共享 FPN 特征，语义分割的梯度信号有助于学习更好的底层特征表示，从而也提升实例分割性能。</div>\n<h5>FPN vs 空洞卷积：效率对比</h5>\n<p><img alt=\"FPN 与空洞卷积效率对比\" src=\"https://ar5iv.labs.arxiv.org/html/1901.02446/assets/x4.png\" />\n<em>图：FPN 与空洞卷积（Dilated-FCN）在 FLOPs 和内存占用上的对比。FPN 在各种骨干网络下均显著更高效。</em></p>\n<p>论文的一个重要贡献是系统性地对比了 FPN 与空洞卷积两种多尺度特征提取范式：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>输出分辨率</th>\n<th>FLOPs（相对）</th>\n<th>内存（相对）</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Dilated-FCN (output stride 8)</td>\n<td>1/8</td>\n<td>高</td>\n<td>高</td>\n</tr>\n<tr>\n<td>FPN</td>\n<td>1/4</td>\n<td><strong>~4-7× 更低</strong></td>\n<td><strong>~4-7× 更低</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p>FPN 更高效的原因：\n- 空洞卷积在高分辨率特征图上操作（如 1/8），计算量与分辨率平方成正比\n- FPN 在低分辨率上提取高层语义，仅在最后阶段上采样，大部分计算在小特征图上完成\n- FPN 同时产生 <strong>1/4 分辨率</strong>输出（比空洞卷积的 1/8 更精细）</p>\n<h5>与传统方法的区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>传统语义分割（DeepLab等）</th>\n<th>Panoptic FPN</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>多尺度机制</td>\n<td>空洞卷积 / ASPP</td>\n<td>FPN 自顶向下路径</td>\n</tr>\n<tr>\n<td>计算效率</td>\n<td>高（高分辨率特征图）</td>\n<td>低（金字塔结构）</td>\n</tr>\n<tr>\n<td>输出分辨率</td>\n<td>1/8</td>\n<td>1/4</td>\n</tr>\n<tr>\n<td>实例分割</td>\n<td>需要额外模型</td>\n<td>同一模型内置</td>\n</tr>\n<tr>\n<td>全景分割</td>\n<td>需要后融合两个模型</td>\n<td>单模型端到端</td>\n</tr>\n</tbody>\n</table></div>",
      "quiz": {
        "q": "Panoptic FPN 的语义分割分支如何融合 FPN 各层级的特征？",
        "options": [
          "将所有层级特征拼接（concat）后通过 1×1 卷积降维",
          "仅使用最高分辨率的 P2 层特征",
          "将各层级特征分别上采样到 1/4 分辨率后逐元素求和",
          "使用注意力机制加权融合各层级特征"
        ],
        "answer": 2,
        "explain": "Semantic FPN 将 P2-P5 各层级通过逐步 2× 上采样统一到 1/4 分辨率，然后逐元素求和（element-wise sum），简洁高效。消融实验表明求和略优于拼接。"
      }
    },
    {
      "id": "panoptic_deeplab",
      "num": 12,
      "name": "Panoptic-DeepLab",
      "fullName": "全景深度实验室 (Panoptic-DeepLab)",
      "year": "2020",
      "org": "Google",
      "parent": "deeplabv3plus",
      "paperUrl": "https://arxiv.org/abs/1911.10194",
      "projectUrl": "",
      "category": "unified",
      "motivation": "自底向上全景分割基线",
      "summary": "Panoptic-DeepLab 提出了一种简单高效的自底向上全景分割框架，通过双 ASPP 和双解码器结构分别处理语义分割与实例中心回归，首次证明自底向上方法可在全景分割任务上达到与自顶向下方法相当甚至更优的性能。",
      "keyPoints": [
        "自底向上单次前向推理（single-shot）全景分割框架，无需区域提议或两阶段处理",
        "双 ASPP（Dual-ASPP）+ 双解码器（Dual-Decoder）结构，为语义分割和实例分割提供独立的上下文与解码路径",
        "类别无关的实例分割头：预测实例中心热力图（MSE 损失）+ 每个前景像素到其中心的偏移量（L1 损失）",
        "简单的实例分组：前景像素通过预测偏移量移动后分配给最近的预测中心点",
        "多数投票（Majority Vote）融合语义分割与实例分割结果，GPU 并行仅需 3ms",
        "Cityscapes 测试集同时在三项任务排名第一：84.2% mIoU、39.0% AP、65.5% PQ",
        "搭配 MobileNetV3 可达近实时推理（15.8 FPS，1025×2049 输入）"
      ],
      "detail": "<p><img alt=\"Panoptic-DeepLab 架构总览\" src=\"https://ar5iv.labs.arxiv.org/html/1911.10194v2/assets/x2.png\" />\n<em>图：Panoptic-DeepLab 采用双上下文模块和双解码器分别服务语义分割与实例分割预测。实例分割通过预测目标中心并将前景像素回归到对应中心来实现。</em></p>\n<h5>动机与背景</h5>\n<p>全景分割（Panoptic Segmentation）要求为图像中每个像素分配语义标签和实例 ID，统一了语义分割（stuff 类别）和实例分割（thing 类别）。此前主流的<strong>自顶向下方法</strong>（如基于 Mask R-CNN 的 Panoptic FPN、UPSNet）依赖区域提议生成重叠的实例掩码，再通过启发式后处理解决冲突，流程复杂且推理速度慢。<strong>自底向上方法</strong>（如 DeeperLab、SSAP）虽然推理快，但性能远逊于自顶向下方法。</p>\n<p>Panoptic-DeepLab 的目标是建立一个<strong>简单、强大、快速</strong>的自底向上基线，证明无需区域提议也能达到 SOTA 性能。</p>\n<h5>网络架构</h5>\n<p>Panoptic-DeepLab 由四个组件构成：</p>\n<ol>\n<li>\n<p><strong>共享编码器骨干网络</strong>：使用 ImageNet 预训练网络（如 Xception-71、HRNet-W48），在最后一个 block 使用空洞卷积提取更密集的特征图（output stride = 16）。</p>\n</li>\n<li>\n<p><strong>双 ASPP 模块</strong>：为语义分割和实例分割分别配置独立的 Atrous Spatial Pyramid Pooling 模块。实验证明解耦的上下文模块优于共享设计，因为两个任务需要不同的上下文信息。</p>\n</li>\n<li>\n<p><strong>双解码器模块</strong>：基于 DeepLabV3+ 的轻量解码器，做了两处改进：</p>\n</li>\n<li>引入额外的 output stride = 8 的低层特征，空间分辨率逐步 ×2 恢复</li>\n<li>\n<p>每个上采样阶段使用单个 \\(5 \\times 5\\) 深度可分离卷积</p>\n</li>\n<li>\n<p><strong>任务特定预测头</strong>：</p>\n</li>\n<li>语义分割头：预测所有 thing + stuff 类别</li>\n<li>实例分割头：预测中心热力图 + 偏移量</li>\n</ol>\n<h5>实例表示与分组</h5>\n<pre><code class=\"language-python\"># Panoptic-DeepLab 推理伪代码\ndef panoptic_deeplab_inference(image):\n    # 1. 编码器提取共享特征\n    features = encoder(image)\n\n    # 2. 双 ASPP + 双解码器\n    sem_features = sem_decoder(sem_aspp(features))\n    ins_features = ins_decoder(ins_aspp(features))\n\n    # 3. 预测头\n    sem_pred = semantic_head(sem_features)        # [H, W, num_classes]\n    center_heatmap = center_head(ins_features)    # [H, W, 1]\n    offset_pred = offset_head(ins_features)       # [H, W, 2]\n\n    # 4. 实例中心检测：关键点 NMS + 阈值过滤\n    centers = keypoint_nms(center_heatmap, kernel=7)\n    centers = centers[centers.score &gt; 0.1][:top_k]  # top_k=200\n\n    # 5. 实例分组：前景像素通过偏移量分配到最近中心\n    foreground_mask = (sem_pred.argmax(-1) in thing_classes)\n    for pixel (i, j) in foreground_mask:\n        shifted = (i, j) + offset_pred[i, j]\n        instance_id[i, j] = argmin_k ||centers[k] - shifted||^2\n\n    # 6. 多数投票融合\n    for each instance_mask:\n        class_label = majority_vote(sem_pred[instance_mask])\n\n    return panoptic_result\n</code></pre>\n<h5>训练损失函数</h5>\n<p>整个模型仅使用三个损失函数联合训练：</p>\n<p>$$\\mathcal{L} = \\lambda_{\\text{sem}} \\cdot \\mathcal{L}_{\\text{sem}} + \\lambda_{\\text{center}} \\cdot \\mathcal{L}_{\\text{center}} + \\lambda_{\\text{offset}} \\cdot \\mathcal{L}_{\\text{offset}}$$</p>\n<ul>\n<li>\n<p><strong>语义分割损失</strong> \\(\\mathcal{L}_{\\text{sem}}\\)：加权自举交叉熵损失（Weighted Bootstrapped Cross Entropy），对每个像素赋予不同权重，仅保留 top-K 困难像素参与梯度计算。</p>\n</li>\n<li>\n<p><strong>中心热力图损失</strong> \\(\\mathcal{L}_{\\text{center}}\\)：均方误差（MSE）损失。Ground truth 中心编码为标准差 8 像素的 2D 高斯分布。</p>\n</li>\n<li>\n<p><strong>偏移回归损失</strong> \\(\\mathcal{L}_{\\text{offset}}\\)：L1 损失，仅在属于实例的前景像素上激活。</p>\n</li>\n</ul>\n<div class=\"key-point\">💡 关键：实例分割分支是<strong>类别无关</strong>的——它只负责将像素聚类为实例，不预测类别。实例的语义类别由多数投票从语义分割分支获得。</div>\n<h5>推理时的融合策略</h5>\n<p>推理时采用 DeeperLab 提出的\"多数投票\"原则：</p>\n<ol>\n<li>语义分割预测过滤出 stuff 像素（instance_id = 0）</li>\n<li>对每个预测的实例掩码，统计其内部语义预测的类别直方图</li>\n<li>票数最多的类别作为该实例的语义标签</li>\n</ol>\n<p>该操作本质是累积类别直方图，可在 GPU 上高效并行实现，处理 1025×2049 输入仅需 <strong>3ms</strong>。</p>\n<h5>实例置信度评分</h5>\n<p>为支持实例分割评估（需要置信度分数），借鉴 YOLO 的设计：</p>\n<p>$$\\text{Score} = \\text{Score}(\\text{Objectness}) \\times \\text{Score}(\\text{Class})$$</p>\n<p>其中 Objectness 来自中心热力图的未归一化分数，Class 来自实例掩码区域内语义预测概率的平均值。</p>\n<h5>与传统方法的区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>自顶向下方法 (Mask R-CNN系)</th>\n<th>Panoptic-DeepLab (自底向上)</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>实例检测</td>\n<td>区域提议 + RoI 操作</td>\n<td>中心点热力图 + 偏移回归</td>\n</tr>\n<tr>\n<td>掩码生成</td>\n<td>逐提议预测二值掩码</td>\n<td>像素级分组到最近中心</td>\n</tr>\n<tr>\n<td>冲突解决</td>\n<td>置信度排序 + 启发式规则</td>\n<td>天然无重叠 + 多数投票</td>\n</tr>\n<tr>\n<td>推理速度</td>\n<td>慢（串行处理提议）</td>\n<td>快（单次前向 + 并行后处理）</td>\n</tr>\n<tr>\n<td>额外模块</td>\n<td>FPN、RPN、RoI Align</td>\n<td>仅双 ASPP + 双解码器</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"warn-box\">⚠️ 注意：Panoptic-DeepLab 的关键洞察是——语义分割和实例分割需要<strong>不同的上下文信息</strong>，因此解耦 ASPP 和解码器比共享结构更优（消融实验中 PQ 提升 ~1.7%）。</div>",
      "quiz": {
        "q": "Panoptic-DeepLab 中实例分割分支的核心设计是什么？",
        "options": [
          "使用 Mask R-CNN 风格的 RoI Align 提取实例特征",
          "预测类别无关的实例中心热力图和像素到中心的偏移量",
          "使用像素对亲和力图进行图分割聚类",
          "通过嵌入向量的余弦相似度进行像素分组"
        ],
        "answer": 1,
        "explain": "Panoptic-DeepLab 的实例分支预测中心热力图定位实例中心，并回归每个前景像素到其中心的偏移量，通过最近中心分配实现分组，无需区域提议或复杂聚类。"
      }
    },
    {
      "id": "setr",
      "num": 13,
      "name": "SETR",
      "fullName": "分割Transformer (SEgmentation TRansformer)",
      "year": "2021",
      "org": "腾讯/港大",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2012.15840",
      "projectUrl": "",
      "category": "unified",
      "motivation": "纯Transformer序列到序列分割",
      "summary": "SETR 将语义分割重新定义为序列到序列预测任务，首次采用纯 Transformer（无卷积、无分辨率下降）作为编码器，通过每一层的全局自注意力彻底解决了 FCN 感受野受限的问题，在 ADE20K 上取得当时 SOTA（50.28% mIoU）。",
      "keyPoints": [
        "将图像分割建模为序列到序列预测任务，完全抛弃 FCN 编码器架构",
        "编码器采用纯 ViT（Vision Transformer），将图像切分为 16×16 patch 后展平为 1D 序列输入",
        "每层 Transformer 都具有全局感受野，从根本上解决 CNN 局部感受野受限问题",
        "设计三种解码器：Naive（直接上采样）、PUP（渐进上采样）、MLA（多层特征聚合）",
        "使用 ImageNet-21K 预训练的 ViT-Large（24层, 1024维, 16头）作为骨干网络",
        "在 ADE20K（50.28% mIoU）、Pascal Context（55.83% mIoU）达到 SOTA，Cityscapes 上有竞争力",
        "提交时在 ADE20K 测试服务器排行榜取得第一名"
      ],
      "detail": "<p><img alt=\"SETR 整体架构图\" src=\"https://ar5iv.labs.arxiv.org/html/2012.15840/assets/x1.png\" />\n<em>图：SETR 编码器架构——纯 Transformer 将图像 patch 序列编码为特征序列</em></p>\n<p><img alt=\"SETR 解码器设计\" src=\"https://ar5iv.labs.arxiv.org/html/2012.15840/assets/x2.png\" />\n<em>图：SETR-PUP 渐进上采样解码器</em></p>\n<p><img alt=\"SETR-MLA 解码器\" src=\"https://ar5iv.labs.arxiv.org/html/2012.15840/assets/x3.png\" />\n<em>图：SETR-MLA 多层特征聚合解码器</em></p>\n<h5>动机与背景</h5>\n<p>传统语义分割方法基于 FCN 编码器-解码器架构，编码器通过堆叠卷积层逐步降低分辨率来扩大感受野。然而，卷积操作的<strong>局部性</strong>导致感受野仅随层数线性增长，且增加更多层的收益会迅速递减。虽然空洞卷积和注意力模块可以缓解这一问题，但它们仅作为组件级别的改进，FCN 架构本身的局限性并未改变。</p>\n<p>SETR 的核心思想是：<strong>在架构级别做出根本性改变</strong>——完全放弃 FCN，采用纯 Transformer 编码器，使每一层都具有全局感受野，从根本上消除对感受野的担忧。</p>\n<h5>核心机制：Image-to-Sequence 编码</h5>\n<p><strong>Patch Embedding：</strong> 给定输入图像 \\(x \\in \\mathbb{R}^{H \\times W \\times 3}\\)，由于直接将每个像素作为 token 会导致序列长度过大（如 480×480 图像将产生 691,200 长度的序列），SETR 将图像划分为 \\(\\frac{H}{16} \\times \\frac{W}{16}\\) 个大小为 16×16 的 patch，每个 patch 通过线性投影映射到 \\(C\\) 维嵌入空间：</p>\n<p>$$p \\longrightarrow e \\in \\mathbb{R}^C$$</p>\n<p><strong>位置编码：</strong> 为保留空间信息，为每个位置 \\(i\\) 学习一个位置嵌入 \\(p_i\\)，最终输入序列为：</p>\n<p>$$E = \\{e_1 + p_1, \\ e_2 + p_2, \\ \\cdots, \\ e_L + p_L\\}$$</p>\n<p>其中序列长度 \\(L = \\frac{HW}{256}\\)。</p>\n<h5>Transformer 编码器</h5>\n<p>编码器由 \\(L_e\\) 层多头自注意力（MSA）和 MLP 块组成。在每层 \\(l\\)，计算过程为：</p>\n<p><strong>自注意力计算：</strong></p>\n<p>$$\\text{query} = Z^{l-1} \\mathbf{W}_Q, \\quad \\text{key} = Z^{l-1} \\mathbf{W}_K, \\quad \\text{value} = Z^{l-1} \\mathbf{W}_V$$</p>\n<p>$$SA(Z^{l-1}) = Z^{l-1} + \\text{softmax}\\left(\\frac{Z^{l-1}\\mathbf{W}_Q (Z^{l-1}\\mathbf{W}_K)^\\top}{\\sqrt{d}}\\right)(Z^{l-1}\\mathbf{W}_V)$$</p>\n<p><strong>多头注意力：</strong></p>\n<p>$$MSA(Z^{l-1}) = [SA_1(Z^{l-1}); \\ SA_2(Z^{l-1}); \\ \\cdots; \\ SA_m(Z^{l-1})]\\mathbf{W}_O$$</p>\n<p><strong>层输出（含 MLP 和残差连接）：</strong></p>\n<p>$$Z^l = MSA(Z^{l-1}) + MLP(MSA(Z^{l-1})) \\in \\mathbb{R}^{L \\times C}$$</p>\n<div class=\"key-point\">💡 关键：与 CNN 不同，Transformer 的自注意力在每一层都对所有 patch 进行全局交互，因此<strong>每一层都具有全局感受野</strong>，无需通过堆叠层数来扩大感受野。</div>\n<h5>三种解码器设计</h5>\n<p>编码器输出 \\(Z \\in \\mathbb{R}^{\\frac{HW}{256} \\times C}\\) 需要 reshape 为 \\(\\frac{H}{16} \\times \\frac{W}{16} \\times C\\) 的 3D 特征图后送入解码器：</p>\n<p><strong>1. SETR-Naive（朴素上采样）：</strong>\n- 对最后一层特征 \\(Z^{L_e}\\) 用 1×1 conv + BN + ReLU + 1×1 conv 投影到类别数维度\n- 直接双线性插值上采样到原始分辨率</p>\n<p><strong>2. SETR-PUP（渐进上采样）：</strong>\n- 避免一步上采样引入噪声，采用 4 次 2× 上采样交替 conv 层\n- 从 \\(\\frac{H}{16} \\times \\frac{W}{16}\\) 逐步恢复到 \\(H \\times W\\)</p>\n<p><strong>3. SETR-MLA（多层特征聚合）：</strong>\n- 类似 FPN 思想，但所有层特征分辨率相同（无金字塔形状）\n- 从 \\(M\\) 个均匀分布的层（间隔 \\(\\frac{L_e}{M}\\)）提取特征\n- 每个流经过 1×1、3×3、3×3 卷积（通道逐步减半）+ 4× 上采样\n- 引入自顶向下的逐元素加法聚合跨流交互\n- 最终通过通道拼接融合所有流，再 4× 上采样到全分辨率</p>\n<pre><code class=\"language-python\"># SETR 前向传播伪代码\ndef setr_forward(image, patch_size=16):\n    # 1. Patch Embedding\n    H, W = image.shape[:2]\n    patches = split_into_patches(image, patch_size)  # (H/16 * W/16) patches\n    embeddings = linear_project(patches)  # [L, C], L = HW/256\n\n    # 2. 添加位置编码\n    pos_embed = learnable_position_embedding(L)\n    tokens = embeddings + pos_embed  # [L, C]\n\n    # 3. Transformer 编码器 (ViT-Large: 24层)\n    for layer in transformer_layers:  # 24 layers\n        tokens = layer.MSA(layer.LN(tokens)) + tokens  # 全局自注意力\n        tokens = layer.MLP(layer.LN(tokens)) + tokens  # FFN\n\n    # 4. Reshape 为 2D 特征图\n    feature_map = tokens.reshape(H//16, W//16, C)\n\n    # 5. 解码器 (以 PUP 为例)\n    for i in range(4):  # 4次 2x 上采样\n        feature_map = conv_bn_relu(feature_map)\n        feature_map = bilinear_upsample_2x(feature_map)\n\n    segmentation = pixel_classify(feature_map)  # [H, W, num_classes]\n    return segmentation\n</code></pre>\n<h5>与传统方法的区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>FCN 编码器</th>\n<th>SETR 编码器</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>基本操作</td>\n<td>卷积（局部）</td>\n<td>自注意力（全局）</td>\n</tr>\n<tr>\n<td>感受野</td>\n<td>随层数线性增长</td>\n<td>每层即为全局</td>\n</tr>\n<tr>\n<td>分辨率变化</td>\n<td>逐步下采样</td>\n<td>保持不变（1/16）</td>\n</tr>\n<tr>\n<td>特征维度</td>\n<td>逐层变化</td>\n<td>所有层相同（C=1024）</td>\n</tr>\n<tr>\n<td>上下文建模</td>\n<td>仅高层有效</td>\n<td>每层都建模全局上下文</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"warn-box\">⚠️ 注意：SETR 的计算复杂度为 \\(O(L^2)\\)，其中 \\(L = \\frac{HW}{256}\\)。对于 480×480 图像，\\(L=900\\)；对于 768×768 图像，\\(L=2304\\)。这使得处理高分辨率图像时计算开销较大，模型参数量也较大（~306M）。</div>\n<h5>模型配置与实验结果</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>配置</th>\n<th>层数</th>\n<th>隐藏维度</th>\n<th>注意力头数</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>T-Base</td>\n<td>12</td>\n<td>768</td>\n<td>12</td>\n</tr>\n<tr>\n<td>T-Large</td>\n<td>24</td>\n<td>1024</td>\n<td>16</td>\n</tr>\n</tbody>\n</table></div>\n<p>主要结果（使用 T-Large + ImageNet-21K 预训练）：\n- <strong>ADE20K</strong>: SETR-MLA 达到 50.28% mIoU（测试集 SOTA）\n- <strong>Pascal Context</strong>: 55.83% mIoU\n- <strong>Cityscapes</strong>: SETR-PUP 达到 79.34% mIoU（80k iterations）</p>",
      "quiz": {
        "q": "SETR 相比传统 FCN 分割方法的核心架构级别改变是什么？",
        "options": [
          "使用空洞卷积扩大感受野",
          "在 FCN 编码器后添加注意力模块",
          "完全用 Transformer 替代 CNN 编码器，每层都具有全局感受野",
          "使用更深的 ResNet 作为骨干网络"
        ],
        "answer": 2,
        "explain": "SETR 的核心创新是在架构级别完全抛弃 FCN，采用纯 Transformer 编码器，使得每一层的自注意力都能建模全局上下文，从根本上解决感受野受限问题。"
      }
    },
    {
      "id": "segformer",
      "num": 14,
      "name": "SegFormer",
      "fullName": "分割Former (SegFormer)",
      "year": "2021",
      "org": "NVIDIA",
      "parent": "setr",
      "paperUrl": "https://arxiv.org/abs/2105.15203",
      "projectUrl": "",
      "category": "unified",
      "motivation": "分层Mix Transformer+MLP解码",
      "summary": "SegFormer 提出了分层 Mix Transformer 编码器（MiT）与轻量级全 MLP 解码器的统一框架，无需位置编码即可高效生成多尺度特征并融合局部与全局注意力，在语义分割任务上实现了精度与效率的最优平衡。",
      "keyPoints": [
        "<strong>分层 Mix Transformer 编码器（MiT-B0 ~ B5）</strong>：生成 1/4、1/8、1/16、1/32 四级多尺度特征，类似 CNN 的金字塔结构",
        "<strong>无位置编码设计</strong>：用 Mix-FFN（含 3×3 深度可分离卷积）替代固定位置编码，避免测试分辨率变化时的插值精度损失",
        "<strong>高效自注意力</strong>：通过序列缩减（Reduction Ratio R=[64,16,4,1]）将复杂度从 \\(O(N^2)\\) 降至 \\(O(N^2/R)\\)",
        "<strong>重叠 Patch Merging</strong>：使用重叠卷积（K=7,S=4,P=3）替代 ViT 的非重叠 patch 划分，保持局部连续性",
        "<strong>轻量级全 MLP 解码器</strong>：仅用 4 步 Linear 层完成多尺度特征融合，解码器参数仅占模型总参数的 ~4%",
        "<strong>模型系列化</strong>：B0（3.8M 参数，实时）到 B5（84.7M 参数，SOTA），覆盖从边缘部署到最高精度的全场景",
        "<strong>SOTA 结果</strong>：ADE20K 51.0% mIoU，Cityscapes 84.0% mIoU，且具备优秀的零样本鲁棒性"
      ],
      "detail": "<p><img alt=\"SegFormer 整体框架图\" src=\"https://ar5iv.labs.arxiv.org/html/2105.15203/assets/x2.png\" />\n<em>图：SegFormer 框架由分层 Transformer 编码器（左）和轻量 All-MLP 解码器（右）组成。编码器输出四级多尺度特征，解码器通过 MLP 融合后预测分割掩码。</em></p>\n<p><img alt=\"性能 vs 效率对比\" src=\"https://ar5iv.labs.arxiv.org/html/2105.15203/assets/x1.png\" />\n<em>图：SegFormer 在 ADE20K 上的性能-效率权衡，显著优于 SETR、DeepLabV3+ 等方法。</em></p>\n<h5>动机与背景</h5>\n<p>SETR 首次将 ViT 引入语义分割，但存在三个核心问题：\n1. <strong>单尺度特征</strong>：ViT 仅输出单一低分辨率特征图，无法提供多尺度信息\n2. <strong>固定位置编码</strong>：测试分辨率与训练不同时需插值 PE，导致精度下降\n3. <strong>重型解码器</strong>：SETR 依赖复杂 CNN 解码器恢复分辨率，计算开销大</p>\n<p>SegFormer 从编码器和解码器两端同时重新设计，追求简洁、高效、强大的统一框架。</p>\n<h5>编码器：Mix Transformer（MiT）</h5>\n<p><strong>1. 分层特征提取</strong></p>\n<p>输入图像 \\(H \\times W \\times 3\\) 首先被划分为 \\(4 \\times 4\\) 的 patch（比 ViT 的 \\(16 \\times 16\\) 更细），经过 4 个 stage 逐级下采样，产生分辨率为 \\(\\{H/4, H/8, H/16, H/32\\}\\) 的特征图 \\(F_1, F_2, F_3, F_4\\)，通道数逐级增大。</p>\n<p><strong>2. 重叠 Patch Merging</strong></p>\n<p>不同于 ViT 的非重叠 patch 划分，SegFormer 使用重叠卷积实现 patch 合并：\n- 第一层：\\(K=7, S=4, P=3\\)\n- 后续层：\\(K=3, S=2, P=1\\)</p>\n<p>这保证了相邻 patch 之间的局部连续性，避免边界伪影。</p>\n<p><strong>3. 高效自注意力（Efficient Self-Attention）</strong></p>\n<p>标准自注意力复杂度为 \\(O(N^2)\\)，对高分辨率特征图不可承受。SegFormer 采用序列缩减策略：</p>\n<p>$$\\hat{K} = \\text{Reshape}\\left(\\frac{N}{R}, C \\cdot R\\right)(K)$$</p>\n<p>$$K = \\text{Linear}(C \\cdot R, C)(\\hat{K})$$</p>\n<p>将 Key 序列长度从 \\(N\\) 缩减为 \\(N/R\\)，复杂度降为 \\(O(N^2/R)\\)。四个 stage 的缩减比 \\(R = [64, 16, 4, 1]\\)，越深层分辨率越低，缩减越少。</p>\n<p><strong>4. Mix-FFN（替代位置编码）</strong></p>\n<p>SegFormer 完全移除位置编码，转而在 FFN 中嵌入 3×3 深度可分离卷积，利用零填充隐式提供位置信息：</p>\n<p>$$\\mathbf{x}_{out} = \\text{MLP}(\\text{GELU}(\\text{Conv}_{3\\times3}(\\text{MLP}(\\mathbf{x}_{in})))) + \\mathbf{x}_{in}$$</p>\n<div class=\"key-point\">💡 关键：Mix-FFN 的 3×3 卷积不仅引入位置信息，还增强了局部特征建模能力，使编码器同时具备局部注意力（低层）和全局注意力（高层）。</div>\n<h5>解码器：All-MLP Decoder</h5>\n<pre><code class=\"language-python\"># SegFormer All-MLP Decoder 伪代码\ndef decode(F1, F2, F3, F4, C_embed):\n    # Step 1: 统一通道维度\n    F1_hat = Linear(C1, C_embed)(F1)  # H/4 × W/4\n    F2_hat = Linear(C2, C_embed)(F2)  # H/8 × W/8\n    F3_hat = Linear(C3, C_embed)(F3)  # H/16 × W/16\n    F4_hat = Linear(C4, C_embed)(F4)  # H/32 × W/32\n\n    # Step 2: 上采样到统一分辨率 H/4 × W/4\n    F1_hat = Upsample(H/4, W/4)(F1_hat)\n    F2_hat = Upsample(H/4, W/4)(F2_hat)\n    F3_hat = Upsample(H/4, W/4)(F3_hat)\n    F4_hat = Upsample(H/4, W/4)(F4_hat)\n\n    # Step 3: 拼接 + 融合\n    F = Linear(4*C_embed, C_embed)(Concat(F1_hat, F2_hat, F3_hat, F4_hat))\n\n    # Step 4: 预测分割掩码\n    M = Linear(C_embed, N_cls)(F)  # H/4 × W/4 × N_cls\n    return M\n</code></pre>\n<div class=\"key-point\">💡 关键：如此简单的解码器之所以有效，是因为 Transformer 编码器的有效感受野（ERF）远大于 CNN。Stage-4 已具备高度非局部注意力，MLP 解码器只需融合多尺度特征即可获得强大表征，无需 ASPP 等复杂上下文模块。</div>\n<p><img alt=\"有效感受野对比\" src=\"https://ar5iv.labs.arxiv.org/html/2105.15203/assets/x3.png\" />\n<em>图：DeepLabV3+（上）vs SegFormer（下）的有效感受野对比。SegFormer 在 Stage-4 具有显著更大的非局部注意力范围。</em></p>\n<h5>与 SETR 的核心区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th>SETR</th>\n<th>SegFormer</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>预训练数据</td>\n<td>ImageNet-22K</td>\n<td>ImageNet-1K</td>\n</tr>\n<tr>\n<td>编码器结构</td>\n<td>单尺度 ViT</td>\n<td>分层多尺度 MiT</td>\n</tr>\n<tr>\n<td>位置编码</td>\n<td>固定形状 PE</td>\n<td>无 PE（Mix-FFN 替代）</td>\n</tr>\n<tr>\n<td>解码器</td>\n<td>重型 CNN 解码器</td>\n<td>轻量 All-MLP</td>\n</tr>\n<tr>\n<td>分辨率泛化</td>\n<td>需插值 PE，精度下降</td>\n<td>天然支持任意分辨率</td>\n</tr>\n</tbody>\n</table></div>\n<h5>模型系列与性能</h5>\n<p>SegFormer 提供 B0~B5 六个规模的模型：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>模型</th>\n<th>编码器参数</th>\n<th>解码器参数</th>\n<th>ADE20K mIoU</th>\n<th>Cityscapes mIoU</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>B0</td>\n<td>3.4M</td>\n<td>0.4M</td>\n<td>37.4%</td>\n<td>76.2%</td>\n</tr>\n<tr>\n<td>B1</td>\n<td>13.1M</td>\n<td>0.6M</td>\n<td>42.2%</td>\n<td>78.5%</td>\n</tr>\n<tr>\n<td>B2</td>\n<td>24.2M</td>\n<td>3.3M</td>\n<td>46.5%</td>\n<td>81.0%</td>\n</tr>\n<tr>\n<td>B3</td>\n<td>44.0M</td>\n<td>3.3M</td>\n<td>49.4%</td>\n<td>81.7%</td>\n</tr>\n<tr>\n<td>B4</td>\n<td>60.8M</td>\n<td>3.3M</td>\n<td>50.3%</td>\n<td>82.3%</td>\n</tr>\n<tr>\n<td>B5</td>\n<td>81.4M</td>\n<td>3.3M</td>\n<td>51.0%</td>\n<td>82.4%</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"warn-box\">⚠️ 注意：B4 以 64M 参数达到 50.3% mIoU，比此前最佳方法小 5 倍且高 2.2%。B5 在 Cityscapes 验证集达 84.0% mIoU（多尺度测试），并展现出优秀的零样本鲁棒性（Cityscapes-C）。</div>",
      "quiz": {
        "q": "SegFormer 用什么机制替代了传统 Transformer 中的位置编码（Positional Encoding）？",
        "options": [
          "可学习的绝对位置嵌入",
          "相对位置偏置（Relative Position Bias）",
          "Mix-FFN 中的 3×3 深度可分离卷积利用零填充隐式编码位置",
          "正弦余弦位置编码的改进版本"
        ],
        "answer": 2,
        "explain": "SegFormer 完全移除位置编码，在 FFN 中嵌入 3×3 深度可分离卷积，利用零填充（zero padding）隐式泄露位置信息，从而避免了固定 PE 在分辨率变化时的插值问题。"
      }
    },
    {
      "id": "maskformer",
      "num": 15,
      "name": "MaskFormer",
      "fullName": "掩码Former (MaskFormer)",
      "year": "2021",
      "org": "FAIR",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2107.06278",
      "projectUrl": "",
      "category": "unified",
      "motivation": "掩码分类范式统一分割任务",
      "summary": "MaskFormer 提出将语义分割从传统的逐像素分类（per-pixel classification）转变为掩码分类（mask classification）范式，通过预测一组二值掩码及其对应类别来完成分割，使用同一模型架构、损失函数和训练流程即可统一处理语义分割和全景分割任务，在大类别数数据集上显著超越逐像素分类方法，在 ADE20K 上达到 55.6 mIoU 的新 SOTA。",
      "keyPoints": [
        "<strong>范式转变</strong>：将语义分割从逐像素分类重新定义为掩码分类，每个预测由一个类别概率和一个二值掩码组成",
        "<strong>统一架构</strong>：同一个 MaskFormer 模型无需修改即可同时处理语义分割和全景分割任务",
        "<strong>三模块设计</strong>：像素级模块（backbone + pixel decoder）、Transformer 模块（DETR 风格 decoder）、分割模块（类别预测 + 掩码预测）",
        "<strong>集合预测训练</strong>：采用匈牙利匹配进行预测与 GT 的二部图匹配，损失函数结合交叉熵分类损失和二值掩码损失（focal loss + dice loss）",
        "<strong>双推理策略</strong>：语义推理（semantic inference，对每个像素在所有掩码上取 argmax）和通用推理（general inference，先过滤低置信度掩码再赋标签）",
        "<strong>大类别数优势</strong>：在类别数较多的数据集（ADE20K 150类、COCO-Stuff 171类、ADE20K-Full 847类）上显著优于逐像素分类方法",
        "<strong>SOTA 结果</strong>：ADE20K val 55.6 mIoU（Swin-L backbone），ADE20K test 49.67 mIoU，COCO panoptic 53.3 PQ"
      ],
      "detail": "<h5>核心示意图</h5>\n<p><img alt=\"Per-pixel classification vs Mask classification\" src=\"https://ar5iv.labs.arxiv.org/html/2107.06278/assets/x1.png\" />\n<em>图1：（左）传统逐像素分类对每个像素独立预测类别；（右）掩码分类预测一组二值掩码并为每个掩码分配一个类别标签。匹配可通过二部图匹配或固定匹配完成。</em></p>\n<p><img alt=\"MaskFormer 架构总览\" src=\"https://ar5iv.labs.arxiv.org/html/2107.06278/assets/x2.png\" />\n<em>图2：MaskFormer 架构。包含三个模块：像素级模块提取逐像素嵌入，Transformer 模块计算 N 个 per-segment 嵌入，分割模块生成最终的类别-掩码预测对。</em></p>\n<h5>算法核心流程</h5>\n<pre><code class=\"language-python\"># MaskFormer 前向推理伪代码\ndef maskformer_forward(image):\n    # 1. 像素级模块\n    F = backbone(image)                    # 特征图 F ∈ R^{C_F × H/S × W/S}\n    E_pixel = pixel_decoder(F)             # 逐像素嵌入 E_pixel ∈ R^{C_E × H × W}\n\n    # 2. Transformer 模块\n    Q = transformer_decoder(F, queries)    # N 个 per-segment 嵌入 Q ∈ R^{C_Q × N}\n\n    # 3. 分割模块\n    p = softmax(linear_classifier(Q))      # 类别概率 {p_i ∈ Δ^{K+1}}, 含 ∅ 类\n    E_mask = MLP(Q)                        # 掩码嵌入 E_mask ∈ R^{C_E × N}\n    m = sigmoid(E_mask.T @ E_pixel)        # 二值掩码 {m_i ∈ [0,1]^{H×W}}\n\n    # 4. 推理：语义分割\n    # 对每个像素 (h,w)，计算 c = argmax_k Σ_i p_i(k) · m_i(h,w)\n    return assemble_semantic(p, m)\n</code></pre>\n<h5>动机与背景</h5>\n<p>自 FCN 以来，语义分割几乎被等价为逐像素分类问题——对图像中每个像素独立预测其类别。然而，实例级分割任务（如实例分割、全景分割）天然采用掩码分类的思路：先检测目标区域，再为每个区域分配类别。这种范式差异导致语义分割和实例分割使用完全不同的模型架构和训练方式，阻碍了图像分割领域的统一发展。</p>\n<p>MaskFormer 的核心观察是：<strong>掩码分类具有足够的通用性，可以同时解决语义级和实例级分割任务</strong>。事实上，在 FCN 之前，最好的语义分割方法（如 O2P、SDS）就使用了掩码分类的形式。基于这一洞察，作者提出了一个自然的问题：能否用一个统一的掩码分类模型取代逐像素分类，并在语义分割上取得更好的效果？</p>\n<h5>掩码分类的形式化定义</h5>\n<p>传统逐像素分类将图像分割为 \\(K\\) 个类别，对每个像素 \\((h, w)\\) 预测类别概率分布 \\(y \\in \\{1, \\ldots, K\\}^{H \\times W}\\)。</p>\n<p>掩码分类则将分割问题分解为：预测 \\(N\\) 个概率-掩码对 \\(z = \\{(p_i, m_i)\\}_{i=1}^{N}\\)，其中 \\(p_i \\in \\Delta^{K+1}\\) 是第 \\(i\\) 个掩码的类别概率分布（包含一个\"无对象\" \\(\\varnothing\\) 类），\\(m_i \\in [0, 1]^{H \\times W}\\) 是对应的二值掩码预测。</p>\n<div class=\"key-point\">💡 <strong>关键洞察</strong>：当 \\(N = K\\) 且使用固定匹配时，掩码分类退化为逐像素分类的特殊情况。因此掩码分类严格地比逐像素分类更通用。</div>\n<h5>三模块架构详解</h5>\n<p><strong>1. 像素级模块（Pixel-level Module）</strong></p>\n<p>该模块由一个 backbone 网络和一个 pixel decoder 组成。Backbone（如 ResNet、Swin Transformer）提取低分辨率特征图 \\(\\mathcal{F} \\in \\mathbb{R}^{C_{\\mathcal{F}} \\times \\frac{H}{S} \\times \\frac{W}{S}}\\)（stride \\(S=32\\)）。Pixel decoder 逐步上采样特征，生成全分辨率的逐像素嵌入 \\(\\mathcal{E}_{\\text{pixel}} \\in \\mathbb{R}^{C_{\\mathcal{E}} \\times H \\times W}\\)。</p>\n<div class=\"warn-box\">⚠️ <strong>设计亮点</strong>：任何现有的逐像素分类分割模型都可以直接作为像素级模块使用，MaskFormer 可以无缝地将其转换为掩码分类模型。</div>\n<p><strong>2. Transformer 模块</strong></p>\n<p>采用标准 Transformer decoder（与 DETR 类似），输入为图像特征 \\(\\mathcal{F}\\) 和 \\(N\\) 个可学习的位置嵌入（queries），输出 \\(N\\) 个 per-segment 嵌入 \\(\\mathcal{Q} \\in \\mathbb{R}^{C_{\\mathcal{Q}} \\times N}\\)。每个嵌入编码了对应分割区域的全局信息，所有预测并行生成。</p>\n<p><strong>3. 分割模块（Segmentation Module）</strong></p>\n<ul>\n<li><strong>类别预测</strong>：对 per-segment 嵌入 \\(\\mathcal{Q}\\) 施加线性分类器 + softmax，得到 \\(K+1\\) 类的概率分布（含 \\(\\varnothing\\) 类）</li>\n<li><strong>掩码预测</strong>：通过 2 层隐藏层的 MLP 将 \\(\\mathcal{Q}\\) 转换为掩码嵌入 \\(\\mathcal{E}_{\\text{mask}} \\in \\mathbb{R}^{C_{\\mathcal{E}} \\times N}\\)，然后与逐像素嵌入做点积 + sigmoid 得到二值掩码：</li>\n</ul>\n<p>$$m_i[h, w] = \\text{sigmoid}(\\mathcal{E}_{\\text{mask}}[:, i]^{\\top} \\cdot \\mathcal{E}_{\\text{pixel}}[:, h, w])$$</p>\n<div class=\"key-point\">💡 <strong>关键设计</strong>：掩码预测之间不施加互斥约束（不用 softmax），而是使用独立的 sigmoid。这使得同一像素可以属于多个掩码，提高了模型的灵活性。</div>\n<h5>训练：匈牙利匹配 + 混合损失</h5>\n<p>训练时，使用匈牙利算法在 \\(N\\) 个预测和 GT 分割之间进行最优二部图匹配。匹配代价综合考虑分类损失和掩码损失。</p>\n<p>匹配完成后，总损失为：</p>\n<p>$$\\mathcal{L}_{\\text{mask-cls}} = \\sum_{j=1}^{N} \\left[ -\\log p_{\\sigma(j)}(c_j) + \\mathbf{1}_{c_j \\neq \\varnothing} \\mathcal{L}_{\\text{mask}}(m_{\\sigma(j)}, m_j^{\\text{gt}}) \\right]$$</p>\n<p>其中 \\(\\sigma\\) 为最优匹配，掩码损失 \\(\\mathcal{L}_{\\text{mask}}\\) 结合了 focal loss 和 dice loss：</p>\n<p>$$\\mathcal{L}_{\\text{mask}} = \\lambda_{\\text{focal}} \\cdot \\mathcal{L}_{\\text{focal}} + \\lambda_{\\text{dice}} \\cdot \\mathcal{L}_{\\text{dice}}$$</p>\n<p>默认超参数：\\(\\lambda_{\\text{focal}} = 20\\)，\\(\\lambda_{\\text{dice}} = 1\\)，\\(\\lambda_{\\text{cls}} = 1\\)。</p>\n<h5>推理策略</h5>\n<p>MaskFormer 设计了两种推理策略以适配不同任务：</p>\n<p><strong>语义推理（Semantic Inference）</strong>：对每个像素 \\((h, w)\\)，计算所有 \\(K\\) 个类别的加权概率并取 argmax：</p>\n<p>$$\\text{label}(h, w) = \\arg\\max_{c \\in \\{1, \\ldots, K\\}} \\sum_{i=1}^{N} p_i(c) \\cdot m_i[h, w]$$</p>\n<p>这种方式自然地将多个预测同一类别的掩码聚合起来，适合语义分割。</p>\n<p><strong>通用推理（General Inference）</strong>：先用阈值（0.3）过滤低置信度掩码，再为剩余掩码分配类别标签，适合全景分割等需要区分实例的任务。</p>\n<h5>与传统方法的关键区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>逐像素分类（FCN 范式）</th>\n<th>MaskFormer（掩码分类）</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>预测单元</td>\n<td>每个像素独立分类</td>\n<td>预测 N 个掩码-类别对</td>\n</tr>\n<tr>\n<td>类别数依赖</td>\n<td>输出通道数 = 类别数 K</td>\n<td>输出掩码数 N 与 K 解耦</td>\n</tr>\n<tr>\n<td>大类别数扩展</td>\n<td>内存随 K 线性增长</td>\n<td>内存与 K 无关</td>\n</tr>\n<tr>\n<td>全局上下文</td>\n<td>依赖感受野大小</td>\n<td>Transformer decoder 天然捕获全局信息</td>\n</tr>\n<tr>\n<td>任务统一性</td>\n<td>仅适用于语义分割</td>\n<td>统一语义分割和全景分割</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 <strong>为什么大类别数时掩码分类更优？</strong> 逐像素分类需要为每个像素预测 K 维概率向量，当 K 很大时（如 ADE20K-Full 的 847 类），分类头的参数量和内存消耗急剧增加。而掩码分类将类别预测解耦到 N 个掩码上（N 远小于像素数），每个掩码只需一次 K+1 维分类，大幅降低了计算和内存开销。实验表明，在 ADE20K-Full（847类）上，MaskFormer 仅需 6529M 训练内存，而 PerPixelBaseline+ 需要 26698M。</div>",
      "quiz": {
        "q": "MaskFormer 在语义分割推理时，如何将多个掩码预测组合为最终的逐像素标签？",
        "options": [
          "对每个像素选择置信度最高的单个掩码的类别",
          "对每个像素，将所有掩码的类别概率与掩码值加权求和后取 argmax",
          "使用非极大值抑制（NMS）去除重叠掩码后直接赋值",
          "通过 CRF 后处理优化掩码边界后逐像素投票"
        ],
        "answer": 1,
        "explain": "MaskFormer 的语义推理策略对每个像素计算 Σ_i p_i(c) · m_i[h,w]，即将所有掩码的类别概率与对应掩码值加权求和，然后对类别维度取 argmax，自然聚合了预测同一类别的多个掩码。"
      }
    },
    {
      "id": "mask2former",
      "num": 16,
      "name": "Mask2Former",
      "fullName": "掩码Former2 (Mask2Former)",
      "year": "2022",
      "org": "FAIR",
      "parent": "maskformer",
      "paperUrl": "https://arxiv.org/abs/2112.01527",
      "projectUrl": "",
      "category": "unified",
      "motivation": "掩码注意力机制三任务SOTA",
      "summary": "Mask2Former 在 MaskFormer 基础上引入掩码注意力（masked attention）机制，将 Transformer 解码器的交叉注意力限制在预测掩码的前景区域内，结合高效多尺度特征策略和优化改进，以统一架构在全景分割、实例分割和语义分割三大任务上同时达到 SOTA。",
      "keyPoints": [
        "掩码注意力（Masked Attention）：将标准交叉注意力限制在前一层预测掩码的前景区域内，加速收敛并提升性能",
        "高效多尺度策略：以 round-robin 方式将不同分辨率特征图（1/32、1/16、1/8）轮流送入连续 Transformer 层，避免高分辨率特征的计算爆炸",
        "优化改进：可学习 query 替代零初始化、交换 self-attention 与 cross-attention 顺序、去除 Transformer decoder 中的 dropout",
        "训练效率：使用点采样（point sampling）计算匹配损失和训练损失，训练内存降低 3 倍",
        "统一架构：同一模型结构无需修改即可处理全景/实例/语义分割三大任务",
        "可学习 query 可作为区域提议（region proposals），在未经 Transformer 解码前即提供高质量掩码候选"
      ],
      "detail": "<p><img alt=\"Mask2Former 架构总览\" src=\"https://ar5iv.labs.arxiv.org/html/2112.01527/assets/x1.png\" />\n<em>图：Mask2Former 整体架构。左侧为像素解码器（pixel decoder）提取多尺度特征，右侧为带掩码注意力的 Transformer 解码器逐层精化 query 并生成掩码预测。</em></p>\n<h5>动机与背景</h5>\n<p>MaskFormer 证明了掩码分类（mask classification）范式可以统一语义分割和全景分割。然而其 Transformer 解码器直接采用标准交叉注意力，每个 query 关注全局所有像素位置，导致：\n1. 收敛速度慢（需要大量训练迭代）\n2. 在实例分割等需要精细定位的任务上性能不足\n3. 无法有效利用高分辨率特征（计算量过大）</p>\n<p>Mask2Former 的核心思想是：<strong>每个 query 只需关注其对应掩码区域内的特征</strong>，而非全局所有像素，这既是合理的归纳偏置，又能显著降低计算复杂度。</p>\n<h5>核心机制：掩码注意力</h5>\n<p>标准交叉注意力的公式为：</p>\n<p>$$X_l = \\text{softmax}(Q_l K_l^T) V_l + X_{l-1}$$</p>\n<p>Mask2Former 提出的掩码注意力在 attention 矩阵中引入掩码约束：</p>\n<p>$$X_l = \\text{softmax}(\\mathcal{M}_{l-1} + Q_l K_l^T) V_l + X_{l-1}$$</p>\n<p>其中掩码项 \\(\\mathcal{M}_{l-1}\\) 定义为：</p>\n<p>$$\\mathcal{M}_{l-1}(x, y) = \\begin{cases} 0 & \\text{if } M_{l-1}(x, y) = 1 \\\\ -\\infty & \\text{otherwise} \\end{cases}$$</p>\n<p>这里 \\(M_{l-1}\\) 是第 \\(l-1\\) 层 Transformer 解码器输出的二值掩码预测（通过阈值 0.5 获得），\\(Q_l\\) 来自 query 特征的线性变换，\\(K_l, V_l\\) 来自像素解码器特征的线性变换。</p>\n<div class=\"key-point\">💡 关键：掩码注意力的直觉是——如果一个 query 负责预测某个物体/区域的掩码，那么它只需要从该区域内的像素收集信息即可。将掩码外的位置设为 \\(-\\infty\\) 使得 softmax 后这些位置的权重为 0。</div>\n<p>对于第一层（\\(l=1\\)），由于尚无预测掩码，使用可学习 query 通过 MLP 生成的初始掩码预测作为 \\(M_0\\)。</p>\n<pre><code class=\"language-python\"># Mask2Former 掩码注意力伪代码\ndef masked_cross_attention(query_feat, pixel_feat, prev_mask_pred):\n    &quot;&quot;&quot;\n    query_feat: (N, C) - N个query的特征\n    pixel_feat: (H*W, C) - 像素解码器输出的特征图\n    prev_mask_pred: (N, H, W) - 上一层的掩码预测\n    &quot;&quot;&quot;\n    Q = linear_q(query_feat)        # (N, C)\n    K = linear_k(pixel_feat)        # (H*W, C)\n    V = linear_v(pixel_feat)        # (H*W, C)\n\n    # 计算注意力分数\n    attn = Q @ K.T / sqrt(C)        # (N, H*W)\n\n    # 构造掩码: 前景=0, 背景=-inf\n    binary_mask = (prev_mask_pred.flatten(1) &lt; 0.5)  # True for background\n    attn[binary_mask] = -inf\n\n    # softmax + 加权求和\n    attn = softmax(attn, dim=-1)\n    output = attn @ V + query_feat  # 残差连接\n    return output\n</code></pre>\n<h5>高效多尺度特征策略</h5>\n<p>像素解码器（默认使用 Multi-Scale Deformable Attention, MSDeformAttn）生成三个尺度的特征图：1/32、1/16、1/8 分辨率。</p>\n<p>传统做法是将所有尺度特征拼接后送入每一层 Transformer 解码器，但这会导致极高的计算量（尤其是 1/8 分辨率）。Mask2Former 采用 <strong>round-robin</strong> 策略：</p>\n<ul>\n<li>第 1、4、7 层使用 1/8 分辨率特征（高分辨率，捕捉细节）</li>\n<li>第 2、5、8 层使用 1/16 分辨率特征</li>\n<li>第 3、6、9 层使用 1/32 分辨率特征（低分辨率，捕捉全局）</li>\n</ul>\n<p>每 3 层为一个 resolution cycle，共重复 3 次（9 层总计）。每个 cycle 结束时都会产生一个掩码预测，用于监督。</p>\n<div class=\"warn-box\">⚠️ 注意：由于掩码注意力将每个 query 的注意力限制在其掩码区域内，即使使用高分辨率 1/8 特征，实际参与计算的像素数量也远小于全图，因此计算量可控。</div>\n<h5>优化改进</h5>\n<ol>\n<li>\n<p><strong>可学习 query</strong>：使用可学习的 query 特征（而非零初始化），这些 query 在训练后可以作为类似\"区域提议\"的角色，在进入 Transformer 解码器前就能产生有意义的掩码预测（AR@100 达到 ~40）。</p>\n</li>\n<li>\n<p><strong>Self-attention 与 Cross-attention 顺序交换</strong>：将原始 Transformer 解码器中\"先 self-attention 再 cross-attention\"的顺序改为\"先 cross-attention 再 self-attention\"。这使得 query 先从图像特征中获取信息，再进行 query 间的交互。</p>\n</li>\n<li>\n<p><strong>去除 dropout</strong>：在 Transformer 解码器中去除 dropout，因为掩码注意力本身已经提供了足够的正则化效果。</p>\n</li>\n</ol>\n<h5>训练效率：点采样损失</h5>\n<p>为了降低训练内存，Mask2Former 采用 PointRend 中的均匀采样策略：</p>\n<ul>\n<li>在计算匹配损失（Hungarian matching）和最终训练损失时，不计算完整掩码上的损失</li>\n<li>而是从掩码中均匀采样 \\(K\\) 个点（默认 \\(K=12544\\)）计算二值交叉熵损失</li>\n<li>这将训练内存从 18GB 降低到 6GB（3 倍减少），且不影响性能</li>\n</ul>\n<h5>与 MaskFormer 的关键区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>MaskFormer</th>\n<th>Mask2Former</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>交叉注意力</td>\n<td>标准全局注意力</td>\n<td>掩码注意力（限制在前景区域）</td>\n</tr>\n<tr>\n<td>特征分辨率</td>\n<td>单尺度（1/32 或 1/16）</td>\n<td>多尺度 round-robin（1/8~1/32）</td>\n</tr>\n<tr>\n<td>Query 初始化</td>\n<td>零初始化</td>\n<td>可学习 query</td>\n</tr>\n<tr>\n<td>Attention 顺序</td>\n<td>self → cross</td>\n<td>cross → self</td>\n</tr>\n<tr>\n<td>训练损失</td>\n<td>全掩码计算</td>\n<td>点采样计算</td>\n</tr>\n<tr>\n<td>实例分割 AP</td>\n<td>较低</td>\n<td>显著提升（+5.1 AP）</td>\n</tr>\n</tbody>\n</table></div>\n<h5>实验结果</h5>\n<p>Mask2Former 在三大分割任务上均达到 SOTA：\n- <strong>全景分割</strong>：COCO val 57.8 PQ（Swin-L backbone）\n- <strong>实例分割</strong>：COCO val 50.1 AP（Swin-L backbone），首次以掩码分类方法超越专用检测器\n- <strong>语义分割</strong>：ADE20K val 57.7 mIoU（Swin-L backbone）</p>\n<p>消融实验表明，掩码注意力是最重要的组件，在所有三个任务上贡献最大的性能提升。</p>",
      "quiz": {
        "q": "Mask2Former 中掩码注意力（Masked Attention）的核心机制是什么？",
        "options": [
          "使用可变形注意力替代标准注意力以降低计算量",
          "将交叉注意力限制在上一层预测掩码的前景区域内",
          "在注意力计算中加入位置编码以增强空间感知",
          "使用多头注意力的不同头关注不同尺度的特征"
        ],
        "answer": 1,
        "explain": "掩码注意力通过将掩码外位置的注意力权重设为-∞（softmax后为0），使每个query仅关注其预测掩码的前景区域，既提供了合理的归纳偏置又加速了收敛。"
      }
    },
    {
      "id": "sam",
      "num": 17,
      "name": "SAM",
      "fullName": "分割一切模型 (Segment Anything Model)",
      "year": "2023",
      "org": "Meta AI",
      "parent": "mask2former",
      "paperUrl": "https://arxiv.org/abs/2304.02643",
      "projectUrl": "",
      "category": "unified",
      "motivation": "提示式分割与零样本泛化",
      "summary": "SAM 提出了一个基于提示（prompt）的通用图像分割基础模型，通过大规模数据引擎构建了包含 11M 图像和 1.1B 掩码的 SA-1B 数据集，实现了强大的零样本分割泛化能力。",
      "keyPoints": [
        "核心动机：提示式分割与零样本泛化",
        "演化来源：继承或改进自 mask2former",
        "代表机构：Meta AI"
      ],
      "detail": "<h5>模型架构</h5>\n<p>SAM 的架构设计遵循一个核心原则：<strong>将昂贵的图像编码与轻量的提示交互解耦</strong>，使得同一张图像的编码结果可以被不同提示复用，从而实现实时交互式分割。整体架构由三个组件构成：</p>\n<p><img alt=\"SAM Architecture Overview\" src=\"https://ar5iv.labs.arxiv.org/html/2304.02643/assets/x3.png\" /></p>\n<p><strong>图像编码器（Image Encoder）</strong>：采用经过 MAE 预训练的 ViT-H/16 模型。输入图像被缩放至 $1024 \\times 1024$ 分辨率，经过 ViT 处理后得到 $64 \\times 64$ 的特征图（16× 下采样）。为适应高分辨率输入，使用 $14 \\times 14$ 的窗口注意力机制，并在均匀间隔的 4 个位置插入全局注意力块。最终通过 $1 \\times 1$ 卷积和 $3 \\times 3$ 卷积将通道数映射为 256，每层后接 Layer Normalization。图像编码器每张图像仅运行一次，其计算开销被后续多次提示查询所分摊。</p>\n<p><strong>提示编码器（Prompt Encoder）</strong>：将不同类型的提示统一编码为 256 维向量：\n- <strong>点提示</strong>：位置编码 + 前景/背景学习嵌入\n- <strong>框提示</strong>：左上角位置编码 + 学习嵌入 与 右下角位置编码 + 学习嵌入 的组合\n- <strong>文本提示</strong>：通过 CLIP 文本编码器映射\n- <strong>掩码提示</strong>（密集）：通过 $4\\times$ 下采样卷积网络（$2\\times2$ stride-2 卷积，通道 4→16→256，GELU + LayerNorm）编码后与图像嵌入逐元素相加</p>\n<p><strong>掩码解码器（Mask Decoder）</strong>：</p>\n<p><img alt=\"Mask Decoder Details\" src=\"https://ar5iv.labs.arxiv.org/html/2304.02643/assets/x29.png\" /></p>\n<p>解码器是一个修改版的 2 层 Transformer 解码器，每层执行 4 个步骤：</p>\n<p>$$\\text{Layer}(T, I) = \\begin{cases} T' = \\text{SelfAttn}(T) & \\text{(1) token 自注意力} \\\\ T'' = \\text{CrossAttn}(Q{=}T', KV{=}I) & \\text{(2) token→image 交叉注意力} \\\\ T''' = \\text{MLP}(T'') & \\text{(3) 逐点 MLP 更新} \\\\ I' = \\text{CrossAttn}(Q{=}I, KV{=}T''') & \\text{(4) image→token 交叉注意力} \\end{cases}$$</p>\n<p>其中 $T$ 为 prompt tokens（含学习的输出 token），$I$ 为 $64 \\times 64$ 图像嵌入。关键设计细节：\n- 嵌入维度 256，8 个注意力头，MLP 内部维度 2048\n- 交叉注意力中 Q/K/V 降维至 128 以提升效率\n- 每层注意力都重新添加位置编码和原始 prompt token\n- 解码后通过 2 个转置卷积（stride-2，通道 64→32）上采样 $4\\times$\n- 最终预测：上采样图像嵌入与 3 层 MLP 输出的<strong>逐空间点积</strong></p>\n<h5>歧义感知与多掩码预测</h5>\n<p>单个提示点可能对应多个有效的分割结果（如点击人的衣服，可以是衣服、上半身、整个人）。SAM 通过同时预测 <strong>3 个掩码</strong>来解决这一歧义，分别对应整体（whole）、部分（part）和子部分（subpart）三个语义层级。训练时计算每个预测掩码与 ground truth 的损失，仅反向传播最小损失：</p>\n<p>$$\\mathcal{L} = \\min_{i \\in \\{1,2,3\\}} \\left[ \\lambda_{\\text{focal}} \\cdot \\mathcal{L}_{\\text{focal}}(\\hat{m}_i, m^*) + \\lambda_{\\text{dice}} \\cdot \\mathcal{L}_{\\text{dice}}(\\hat{m}_i, m^*) \\right]$$</p>\n<p>其中 Focal Loss 与 Dice Loss 的权重比为 20:1。此外，一个额外的 IoU 预测头估计每个掩码与 ground truth 的 IoU 分数，用于推理时的掩码排序。</p>\n<h5>数据引擎与 SA-1B 数据集</h5>\n<p>SAM 的成功很大程度上归功于其\"模型-数据飞轮\"式的数据引擎，分三个阶段迭代：</p>\n<p><strong>阶段一：辅助手动标注</strong>。使用 SAM 的早期版本辅助专业标注员，标注员可以点击前景/背景点来修正模型预测。此阶段在 120K 图像上收集了 4.3M 掩码。随着模型迭代改进，每个掩码的平均标注时间从 34 秒降至 14 秒。</p>\n<p><strong>阶段二：半自动标注</strong>。模型自动生成置信掩码，标注员仅需标注模型遗漏的对象，重点关注不太显著的物体。此阶段在额外 180K 图像上新增 5.9M 掩码（含自动生成的 4.8M），平均每张图像的掩码数从 44 增至 72。</p>\n<p><strong>阶段三：全自动标注</strong>。使用 $32 \\times 32$ 的规则点网格作为提示，对每个点生成一组有效掩码。通过 NMS（非极大值抑制）和稳定性过滤（要求在阈值 $\\tau \\in [0.5-\\delta, 0.5+\\delta]$ 范围内掩码稳定）去除冗余和低质量掩码。最终在 11M 图像上生成了 1.1B 高质量掩码，构成 <strong>SA-1B</strong> 数据集——比此前任何分割数据集大 400 倍以上。</p>\n<h5>训练策略</h5>\n<pre><code>算法: SAM 交互式训练流程\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n输入: 图像 I, ground truth 掩码集合 {m*}\n输出: 训练好的 SAM 模型参数 θ\n\n1. 对每张图像 I:\n   a. 运行图像编码器: E_img = ImageEncoder(I)  [仅一次]\n\n2. 对每个 ground truth 掩码 m*:\n   a. 模拟 11 轮交互提示:\n      - 第 1 轮: 随机选择 {前景点, 框, 框+点} 之一\n      - 第 2-11 轮: 在上一轮预测的误差区域采样点\n        (从 false negative / false positive 区域中\n         均匀采样，最多 1 个新点/轮)\n      - 每轮将上一轮的（未阈值化的）掩码预测作为\n        额外的 mask prompt 输入\n\n   b. 对每轮的 3 个预测掩码 {m̂_1, m̂_2, m̂_3}:\n      - 计算 L = min_i [Focal(m̂_i, m*) + Dice(m̂_i, m*)]\n      - 仅对最小损失的掩码反向传播\n\n3. 优化器: AdamW, lr=8e-4 (image encoder 缩小10×)\n4. 数据增强: 随机水平翻转, 大规模抖动 (0.1-2.0×)\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n</code></pre>\n<p>训练在 256 个 A100 GPU 上进行，SA-1B 数据集训练约 3 个 epoch。提示编码器和掩码解码器的推理延迟仅约 50ms（CPU/浏览器环境），使得实时交互成为可能。</p>\n<h5>零样本迁移能力</h5>\n<p>SAM 的核心价值在于其零样本泛化能力。论文在 23 个多样化数据集上评估了以下零样本任务：</p>\n<ol>\n<li><strong>单点分割</strong>：给定单个前景点，SAM 在大多数数据集上超越了 RITM 等先前最强交互式分割方法</li>\n<li><strong>边缘检测</strong>：使用 $16\\times16$ 点网格生成掩码，取 Sobel 滤波后的边缘图，在 BSDS500 上达到有竞争力的性能（未经任何边缘检测训练）</li>\n<li><strong>目标提案生成</strong>：在 LVIS v1 上，SAM 的 AR@1000 超越了 ViTDet-H</li>\n<li><strong>实例分割</strong>：以 ViTDet 的检测框为提示，SAM 生成的掩码质量优于 ViTDet 自身的掩码头</li>\n<li><strong>文本到掩码</strong>：通过 CLIP 嵌入作为提示，实现初步的文本引导分割</li>\n</ol>",
      "quiz": {
        "q": "",
        "options": [],
        "answer": 0,
        "explain": ""
      }
    },
    {
      "id": "oneformer",
      "num": 18,
      "name": "OneFormer",
      "fullName": "统一Former (OneFormer)",
      "year": "2023",
      "org": "SHI Lab",
      "parent": "mask2former",
      "paperUrl": "https://arxiv.org/abs/2211.06220",
      "projectUrl": "",
      "category": "unified",
      "motivation": "单次训练三任务统一分割",
      "summary": "OneFormer 提出了任务条件化联合训练策略与查询-文本对比损失，使单个模型仅训练一次即可在语义、实例和全景三种分割任务上超越各自独立训练的 Mask2Former 专用模型。",
      "keyPoints": [
        "<strong>多任务统一架构</strong>：单个模型、单次训练同时覆盖语义/实例/全景三种分割任务",
        "<strong>任务条件化联合训练</strong>：通过 \"the task is {task}\" 文本输入生成 task token，条件化整个模型",
        "<strong>任务引导的查询初始化</strong>：用 task token 的 N-1 次重复初始化 object queries，替代全零初始化",
        "<strong>查询-文本对比损失</strong>：在 object queries 与 text queries 之间计算对比损失，建立任务间和类间区分",
        "<strong>统一标注利用</strong>：从全景标注中派生语义/实例标签，仅需一套标注",
        "<strong>文本查询表示</strong>：利用 6 层 Transformer 文本编码器将 GT 类别文本映射为 text queries，训练时使用、推理时丢弃",
        "<strong>在 ADE20k、Cityscapes、COCO 上均超越独立训练的 Mask2Former</strong>，资源消耗仅为后者的 1/3"
      ],
      "detail": "<p><img alt=\"OneFormer 架构总览\" src=\"https://ar5iv.labs.arxiv.org/html/2211.06220/assets/x2.png\" />\n<em>图：OneFormer 整体架构。输入图像经 backbone + pixel decoder 提取多尺度特征；task input 经 tokenize 得到 task token 用于条件化 object queries；text list 经文本编码器得到 text queries 用于对比学习；transformer decoder 输出最终预测。</em></p>\n<p><img alt=\"统一分割路径\" src=\"https://ar5iv.labs.arxiv.org/html/2211.06220/assets/x1.png\" />\n<em>图：从专用模型 → 半统一（同架构不同模型）→ 真正统一（OneFormer：同架构、同模型、同数据集）的演进路径。</em></p>\n<h5>动机与背景</h5>\n<p>传统图像分割方法为语义、实例、全景三种任务分别设计专用架构和模型。Mask2Former 等\"新全景架构\"虽然使用统一架构，但仍需为每种任务<strong>独立训练</strong>三个模型才能达到最优性能——这是一种\"半统一\"方案。OneFormer 的目标是实现<strong>真正的统一</strong>：单次训练、单个模型，在三种任务上均达到 SOTA。</p>\n<p>核心挑战在于：三种任务对 object queries 的语义要求不同——实例分割只关注 thing 类别，语义分割要求每个类别仅一个无定形 mask，全景分割则是两者的混合。直接联合训练会导致性能严重下降（Mask2Former 联合训练时 PQ 下降超过 8%）。</p>\n<h5>核心机制一：任务条件化联合训练</h5>\n<pre><code class=\"language-python\"># 任务条件化联合训练伪代码\nfor image, panoptic_annotation in dataset:\n    # 1. 均匀采样任务\n    task = uniform_sample([&quot;panoptic&quot;, &quot;instance&quot;, &quot;semantic&quot;])\n\n    # 2. 从全景标注派生任务特定GT\n    binary_masks, class_names = derive_gt(panoptic_annotation, task)\n\n    # 3. 构建文本列表\n    T_list = [f&quot;a photo with a {cls}&quot; for cls in class_names]\n    T_pad = pad(T_list, N_text, fill=f&quot;a {task} photo&quot;)  # 填充至固定长度\n\n    # 4. 生成 task token\n    I_task = f&quot;the task is {task}&quot;\n    Q_task = tokenize_and_map(I_task)  # 1-D task token\n\n    # 5. 条件化 object queries\n    Q_prime = repeat(Q_task, N-1)  # 任务引导初始化\n    Q = transformer_2layer(Q_prime, F_1_4) + [Q_task]  # 拼接 task token\n\n    # 6. 前向 + 计算损失\n    predictions = transformer_decoder(Q, multi_scale_features)\n    loss = compute_loss(predictions, binary_masks, Q, Q_text)\n</code></pre>\n<p>关键设计：\n- <strong>任务均匀采样</strong>：每张图像随机选择一个任务，从全景标注中派生对应 GT\n- <strong>统一标注</strong>：利用全景标注的统一性（包含 stuff + thing），无需额外标注\n- <strong>任务特定 GT 派生规则</strong>：语义→每类一个 mask；实例→仅 thing 类的非重叠 mask；全景→stuff 一个 mask + thing 非重叠 mask</p>\n<h5>核心机制二：查询表示与任务条件化</h5>\n<p>OneFormer 使用两组查询：</p>\n<p><strong>Object Queries \\(\\mathbf{Q}\\)</strong>：\n1. 将 task token \\(\\mathbf{Q}_{\\text{task}}\\) 重复 \\(N-1\\) 次作为初始化（而非全零）\n2. 通过 2 层 Transformer 与 1/4 尺度特征交互更新\n3. 拼接 \\(\\mathbf{Q}_{\\text{task}}\\) 得到最终 \\(N\\) 个 task-conditioned queries</p>\n<p><strong>Text Queries \\(\\mathbf{Q}_{\\text{text}}\\)</strong>（仅训练时使用）：\n1. 将填充后的文本列表 \\(\\mathbf{T}_{\\text{pad}}\\) 通过 6 层 Transformer 文本编码器编码\n2. 拼接 \\(N_{\\text{ctx}}\\) 个可学习文本上下文嵌入 \\(\\mathbf{Q}_{\\text{ctx}}\\)\n3. 得到 \\(N\\) 个 text queries</p>\n<div class=\"key-point\">💡 <strong>关键</strong>：task token 的引入使 object queries 具有任务感知能力，模型能根据不同任务动态调整预测行为。推理时只需指定任务类型即可。</div>\n<h5>核心机制三：查询-文本对比损失</h5>\n<p>为了在联合训练中建立任务间和类间区分，OneFormer 在 object queries 和 text queries 之间计算对称对比损失：</p>\n<p>$$\\mathcal{L}_{\\mathbf{Q}\\rightarrow\\mathbf{Q}_{\\text{text}}} = -\\frac{1}{B}\\sum_{i=1}^{B}\\log\\frac{\\exp(q_i^{obj} \\odot q_i^{txt} / \\tau)}{\\sum_{j=1}^{B}\\exp(q_i^{obj} \\odot q_j^{txt} / \\tau)}$$</p>\n<p>$$\\mathcal{L}_{\\mathbf{Q}_{\\text{text}}\\rightarrow\\mathbf{Q}} = -\\frac{1}{B}\\sum_{i=1}^{B}\\log\\frac{\\exp(q_i^{txt} \\odot q_i^{obj} / \\tau)}{\\sum_{j=1}^{B}\\exp(q_i^{txt} \\odot q_j^{obj} / \\tau)}$$</p>\n<p>$$\\mathcal{L}_{\\mathbf{Q}\\leftrightarrow\\mathbf{Q}_{\\text{text}}} = \\mathcal{L}_{\\mathbf{Q}\\rightarrow\\mathbf{Q}_{\\text{text}}} + \\mathcal{L}_{\\mathbf{Q}_{\\text{text}}\\rightarrow\\mathbf{Q}}$$</p>\n<p>其中 \\(\\odot\\) 表示点积，\\(\\tau\\) 为温度参数，\\(B\\) 为 batch 中匹配的 query 对数。</p>\n<div class=\"key-point\">💡 <strong>直觉</strong>：text queries 由 GT 标签派生，天然包含任务语义信息（如语义任务只有类级别文本，实例任务只有 thing 类文本）。通过对比学习，object queries 被迫学习与当前任务对应的表示，从而实现任务区分。</div>\n<h5>总损失函数</h5>\n<p>$$\\mathcal{L}_{\\text{final}} = \\lambda_{\\mathbf{Q}\\leftrightarrow\\mathbf{Q}_{\\text{text}}}\\mathcal{L}_{\\mathbf{Q}\\leftrightarrow\\mathbf{Q}_{\\text{text}}} + \\lambda_{\\text{cls}}\\mathcal{L}_{\\text{cls}} + \\lambda_{\\text{bce}}\\mathcal{L}_{\\text{bce}} + \\lambda_{\\text{dice}}\\mathcal{L}_{\\text{dice}}$$</p>\n<p>其中 \\(\\lambda_{\\mathbf{Q}\\leftrightarrow\\mathbf{Q}_{\\text{text}}}=0.5\\)，\\(\\lambda_{\\text{cls}}=2\\)，\\(\\lambda_{\\text{bce}}=5\\)，\\(\\lambda_{\\text{dice}}=5\\)。使用匈牙利匹配进行预测-GT 配对。</p>\n<h5>架构其他组件</h5>\n<ul>\n<li><strong>Backbone + Pixel Decoder</strong>：使用 ImageNet 预训练骨干（Swin-L / ConvNeXt-L / DiNAT-L）提取多尺度特征，pixel decoder 采用 MSDeformAttn 架构逐步上采样</li>\n<li><strong>Transformer Decoder</strong>：采用 Mask2Former 的多尺度策略，交替使用 1/8、1/16、1/32 分辨率特征更新 queries（masked cross-attention → self-attention → FFN），重复 L 次</li>\n<li><strong>预测头</strong>：queries 映射到 \\(K+1\\) 维空间（K 类 + no-object）；mask 通过 queries 与 1/4 特征的 einsum 操作生成</li>\n<li><strong>推理</strong>：指定任务类型，丢弃文本编码器模块，后处理阈值因数据集而异（ADE20k: 0.5, Cityscapes/COCO: 0.8）</li>\n</ul>\n<h5>与 Mask2Former 的关键区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th>Mask2Former</th>\n<th>OneFormer</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>训练方式</td>\n<td>每任务独立训练</td>\n<td>单次联合训练</td>\n</tr>\n<tr>\n<td>模型数量</td>\n<td>3 个（每任务一个）</td>\n<td>1 个</td>\n</tr>\n<tr>\n<td>任务感知</td>\n<td>无</td>\n<td>task token 条件化</td>\n</tr>\n<tr>\n<td>Query 初始化</td>\n<td>全零/随机</td>\n<td>task token 重复</td>\n</tr>\n<tr>\n<td>额外监督</td>\n<td>无</td>\n<td>查询-文本对比损失</td>\n</tr>\n<tr>\n<td>资源消耗</td>\n<td>3×</td>\n<td>1×</td>\n</tr>\n</tbody>\n</table></div>\n<h5>消融实验关键结论（Cityscapes, Swin-L）</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>配置</th>\n<th>PQ</th>\n<th>AP</th>\n<th>mIoU</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>OneFormer (完整)</td>\n<td>67.2</td>\n<td>45.6</td>\n<td>83.0</td>\n</tr>\n<tr>\n<td>− task token</td>\n<td>66.5 (-0.7)</td>\n<td>43.3 (-2.3)</td>\n<td>82.9</td>\n</tr>\n<tr>\n<td>− 可学习文本上下文</td>\n<td>62.7 (-4.5)</td>\n<td>45.0 (-0.6)</td>\n<td>82.8</td>\n</tr>\n<tr>\n<td>− 任务引导 query 初始化</td>\n<td>65.8 (-1.4)</td>\n<td>44.5 (-1.1)</td>\n<td>83.1</td>\n</tr>\n<tr>\n<td>− 对比损失</td>\n<td>58.8 (-8.4)</td>\n<td>42.4 (-3.2)</td>\n<td>82.5</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：对比损失对 PQ 的提升高达 8.4%，是 OneFormer 能成功联合训练的最关键因素。</div>",
      "quiz": {
        "q": "OneFormer 中 task token 的主要作用是什么？",
        "options": [
          "替代 backbone 提取图像特征",
          "条件化 object queries 使模型感知当前任务类型",
          "直接生成最终的分割 mask",
          "计算对比损失的温度参数"
        ],
        "answer": 1,
        "explain": "task token 由 'the task is {task}' 文本生成，用于初始化和拼接 object queries，使模型能根据不同任务（语义/实例/全景）动态调整预测行为。"
      }
    },
    {
      "id": "vim",
      "num": 19,
      "name": "Vision Mamba",
      "fullName": "视觉Mamba (Vision Mamba)",
      "year": "2024",
      "org": "华中科大",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2401.09417",
      "projectUrl": "",
      "category": "unified",
      "motivation": "双向SSM线性复杂度视觉建模",
      "summary": "Vision Mamba (Vim) 提出了基于双向状态空间模型 (Bidirectional SSM) 的纯序列视觉骨干网络，以 \\(O(n)\\) 线性复杂度替代 ViT 的 \\(O(n^2)\\) 自注意力机制，在 ImageNet 分类、ADE20K 语义分割和 COCO 检测上均超越同规模 DeiT，同时在高分辨率场景下实现 2.8× 加速与 86.8% 显存节省。",
      "keyPoints": [
        "<strong>纯 SSM 视觉骨干</strong>：首次将 Mamba（选择性状态空间模型）应用于通用视觉表征学习，无需卷积或自注意力",
        "<strong>双向 SSM 机制</strong>：对每个 token 序列同时进行前向和后向 SSM 扫描，弥补单向 SSM 无法捕获全局上下文的缺陷",
        "<strong>线性复杂度</strong>：序列长度 \\(n\\) 下计算和内存均为 \\(O(n)\\)，对比 ViT 的 \\(O(n^2)\\) 在高分辨率输入上优势显著",
        "<strong>位置嵌入 + CLS Token</strong>：采用双向学习的位置嵌入和类别 token，兼容分类与密集预测任务",
        "<strong>长序列微调策略</strong>：通过减小 patch 提取步长（stride=8, patch_size=16）增加序列长度，进一步提升性能（Vim-S† 达 81.6 top-1）",
        "<strong>ImageNet-1K</strong>：Vim-Ti 76.1 (+3.9 vs DeiT-Ti)，Vim-S 80.5 (+0.7 vs DeiT-S)",
        "<strong>ADE20K 语义分割</strong>：Vim-Ti 41.0 mIoU (+1.8 vs DeiT-Ti)，Vim-S 44.9 mIoU (+0.9 vs DeiT-S)",
        "<strong>COCO 检测</strong>：Vim-Ti AP\\(^{\\text{box}}\\) 45.7 (+1.3 vs DeiT-Ti)，AP\\(^{\\text{mask}}\\) 39.2 (+1.1)"
      ],
      "detail": "<p><img alt=\"Vim 整体架构\" src=\"https://github.com/hustvl/Vim/raw/main/assets/vim_pipeline.png\" />\n<em>图：Vision Mamba 整体流程——图像经 Patch Embedding 后加入位置嵌入和 CLS Token，送入 L 层 Vim Encoder Block，最后通过 Norm + MLP Head 输出分类结果。</em></p>\n<p><img alt=\"Vim Block 结构\" src=\"https://github.com/hustvl/Vim/raw/main/assets/vim_block.png\" />\n<em>图：Vim Block 内部结构——输入经 Normalize 后分为两个线性分支 (x, z)，x 分支进行双向 SSM 处理，z 分支提供门控信号。</em></p>\n<p><strong>算法伪代码（Vim Block）：</strong></p>\n<pre><code class=\"language-python\"># Vim Block 前向传播\ndef vim_block(input_T, params):\n    # input_T: (B, L, D) — B=batch, L=序列长度, D=维度\n    x_norm = Normalize(input_T)                  # LayerNorm\n    x = Linear_x(x_norm)  # (B, L, D) → (B, L, E)  投影到扩展维度\n    z = Linear_z(x_norm)  # (B, L, D) → (B, L, E)  门控分支\n\n    # === 前向 SSM ===\n    x_fwd = SiLU(Conv1d(x))                     # 局部特征 + 激活\n    B_fwd = Linear_B(x_fwd)                      # (B, L, N) 输入矩阵\n    C_fwd = Linear_C(x_fwd)                      # (B, L, N) 输出矩阵\n    delta_fwd = softplus(Linear_delta(x_fwd))     # (B, L, E) 步长参数\n    # 离散化: A_bar = exp(delta * A), B_bar = delta * B\n    y_fwd = SSM_scan(x_fwd, A_bar_fwd, B_bar_fwd, C_fwd)  # (B, L, E)\n\n    # === 后向 SSM ===\n    x_bwd = flip(x)  # 反转序列\n    # 同样流程: Conv1d → SiLU → Linear_{B,C,Δ} → 离散化 → SSM\n    y_bwd = SSM_scan(x_bwd, A_bar_bwd, B_bar_bwd, C_bwd)\n    y_bwd = flip(y_bwd)  # 反转回原序列顺序\n\n    # === 门控融合 ===\n    y_fwd_gated = y_fwd * SiLU(z)               # 前向输出 × 门控\n    y_bwd_gated = y_bwd * SiLU(z)               # 后向输出 × 门控\n    output = Linear_T(y_fwd_gated + y_bwd_gated) # (B, L, E) → (B, L, D)\n\n    return output + input_T                       # 残差连接\n</code></pre>\n<h5>动机与背景</h5>\n<p>Vision Transformer (ViT) 将图像切分为 patch 序列后使用自注意力建模，取得了优异的视觉表征能力，但自注意力的 \\(O(n^2)\\) 复杂度在高分辨率图像（如 1024×1024 产生 4096 个 patch）上带来严重的计算和内存瓶颈。传统解决方案如窗口注意力 (Swin) 虽降低了复杂度，但引入了 2D 先验，破坏了纯序列建模的通用性。</p>\n<p>Mamba 是一种选择性状态空间模型 (Selective SSM)，在 NLP 领域已展示出与 Transformer 匹敌的性能，同时保持 \\(O(n)\\) 的线性复杂度。然而，Mamba 原生设计为单向因果模型（从左到右），直接应用于视觉任务存在两个关键问题：\n1. <strong>单向性</strong>：图像 patch 序列不具有因果性，单向扫描无法充分利用全局上下文\n2. <strong>位置感知</strong>：视觉 token 需要空间位置信息</p>\n<h5>核心机制：双向状态空间模型</h5>\n<p><strong>SSM 基础</strong>：状态空间模型将输入序列 \\(x(t)\\) 映射到输出 \\(y(t)\\)，通过隐状态 \\(h(t)\\) 进行信息传递：</p>\n<p>$$h'(t) = \\mathbf{A} h(t) + \\mathbf{B} x(t), \\quad y(t) = \\mathbf{C} h(t)$$</p>\n<p>其中 \\(\\mathbf{A} \\in \\mathbb{R}^{N \\times N}\\) 是状态转移矩阵，\\(\\mathbf{B} \\in \\mathbb{R}^{N \\times 1}\\)、\\(\\mathbf{C} \\in \\mathbb{R}^{1 \\times N}\\) 分别是输入和输出投影。通过零阶保持 (ZOH) 离散化：</p>\n<p>$$\\bar{\\mathbf{A}} = \\exp(\\Delta \\mathbf{A}), \\quad \\bar{\\mathbf{B}} = (\\Delta \\mathbf{A})^{-1}(\\exp(\\Delta \\mathbf{A}) - \\mathbf{I}) \\cdot \\Delta \\mathbf{B}$$</p>\n<p>离散后的递推形式为：</p>\n<p>$$h_t = \\bar{\\mathbf{A}} h_{t-1} + \\bar{\\mathbf{B}} x_t, \\quad y_t = \\mathbf{C} h_t$$</p>\n<div class=\"key-point\">💡 <strong>关键直觉</strong>：SSM 本质上是一个\"压缩记忆\"机制——隐状态 \\(h_t\\) 将历史信息压缩为固定大小的向量，每步仅需 \\(O(1)\\) 更新，因此整个序列处理为 \\(O(n)\\)。</div>\n<p><strong>Mamba 的选择性机制</strong>：与传统 SSM（参数固定）不同，Mamba 让 \\(\\mathbf{B}\\)、\\(\\mathbf{C}\\)、\\(\\Delta\\) 依赖于输入 \\(x_t\\)，使模型能够根据内容动态选择保留或遗忘信息，类似于注意力机制的\"选择性关注\"。</p>\n<p><strong>Vim 的双向扩展</strong>：为解决单向 SSM 的局限性，Vim 对同一输入序列分别进行前向（\\(t = 1 \\to L\\)）和后向（\\(t = L \\to 1\\)）SSM 扫描，两个方向使用独立的参数（\\(\\mathbf{B}\\)、\\(\\mathbf{C}\\)、\\(\\Delta\\)），最终将两个方向的输出相加融合。这确保每个 token 都能同时获取来自序列两端的上下文信息。</p>\n<div class=\"warn-box\">⚠️ <strong>设计选择</strong>：消融实验表明，\"双向 SSM + Conv1d\"组合效果最佳（ImageNet 73.9 / ADE20K 35.9），优于仅双向层（70.9 / 33.6）或仅双向 SSM（72.8 / 33.2）。Conv1d 提供了局部特征提取能力，与 SSM 的全局建模形成互补。</div>\n<h5>整体架构</h5>\n<p>Vim 的整体架构遵循 ViT 的设计范式：</p>\n<ol>\n<li><strong>Patch Embedding</strong>：将输入图像 \\(I \\in \\mathbb{R}^{H \\times W \\times C}\\) 切分为 \\(J\\) 个大小为 \\(P \\times P\\) 的 patch，线性投影为 \\(D\\) 维 token 序列</li>\n<li><strong>位置嵌入 + CLS Token</strong>：添加可学习的 1D 位置嵌入 \\(E_{\\text{pos}} \\in \\mathbb{R}^{(J+1) \\times D}\\) 和分类 token \\(t_{\\text{cls}}\\)</li>\n<li><strong>L 层 Vim Block</strong>：每层包含 Normalize → 双分支投影 → 双向 SSM → 门控融合 → 残差连接</li>\n<li><strong>分类头</strong>：最终 Normalize + MLP Head 作用于 CLS token</li>\n</ol>\n<p>模型配置：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>变体</th>\n<th>层数 L</th>\n<th>维度 D</th>\n<th>SSM 维度 N</th>\n<th>扩展比 E/D</th>\n<th>参数量</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Vim-Ti</td>\n<td>24</td>\n<td>192</td>\n<td>16</td>\n<td>~2×</td>\n<td>7M</td>\n</tr>\n<tr>\n<td>Vim-S</td>\n<td>24</td>\n<td>384</td>\n<td>16</td>\n<td>~2×</td>\n<td>26M</td>\n</tr>\n</tbody>\n</table></div>\n<h5>效率分析</h5>\n<p>Vim 的核心优势在于线性复杂度。对于序列长度 \\(n\\)：\n- <strong>自注意力 (ViT)</strong>：计算 \\(O(n^2 \\cdot D)\\)，内存 \\(O(n^2)\\)\n- <strong>SSM (Vim)</strong>：计算 \\(O(n \\cdot D \\cdot N)\\)，内存 \\(O(n \\cdot D \\cdot N)\\)</p>\n<p>实测效率对比（Vim-Ti vs DeiT-Ti）：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>分辨率</th>\n<th>Vim FPS 优势</th>\n<th>Vim 内存节省</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>512×512</td>\n<td>~1×</td>\n<td>~1×</td>\n</tr>\n<tr>\n<td>1248×1248</td>\n<td><strong>2.8×</strong> 更快</td>\n<td><strong>86.8%</strong> 节省</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 <strong>关键</strong>：在低分辨率下 Vim 与 DeiT 效率相当，但随着分辨率增长，线性 vs 二次的差距急剧放大。这使 Vim 特别适合高分辨率密集预测任务（语义分割、目标检测）以及超长序列多模态应用。</div>\n<h5>与传统方法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方面</th>\n<th>ViT / DeiT</th>\n<th>Swin Transformer</th>\n<th>Vim</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>序列建模</td>\n<td>全局自注意力</td>\n<td>窗口注意力 + 移位</td>\n<td>双向 SSM</td>\n</tr>\n<tr>\n<td>复杂度</td>\n<td>\\(O(n^2)\\)</td>\n<td>\\(O(n)\\)（窗口内）</td>\n<td>\\(O(n)\\)</td>\n</tr>\n<tr>\n<td>2D 先验</td>\n<td>无</td>\n<td>窗口划分</td>\n<td>无</td>\n</tr>\n<tr>\n<td>高分辨率扩展</td>\n<td>差</td>\n<td>中</td>\n<td>优</td>\n</tr>\n<tr>\n<td>纯序列建模</td>\n<td>✓</td>\n<td>✗</td>\n<td>✓</td>\n</tr>\n</tbody>\n</table></div>\n<p>Vim 的独特优势在于：保持了 ViT 纯序列建模的通用性（无需窗口等 2D 先验），同时获得了与 Swin 类似的线性复杂度。在 COCO 检测中，DeiT 需要使用窗口注意力才能处理 1024×1024 输入，而 Vim 可以直接以纯序列方式处理。</p>\n<h5>实验结果汇总</h5>\n<p><strong>ImageNet-1K 分类：</strong></p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>模型</th>\n<th>参数量</th>\n<th>Top-1 Acc</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>ResNet-50</td>\n<td>25M</td>\n<td>76.2</td>\n</tr>\n<tr>\n<td>DeiT-Ti</td>\n<td>6M</td>\n<td>72.2</td>\n</tr>\n<tr>\n<td>DeiT-S</td>\n<td>22M</td>\n<td>79.8</td>\n</tr>\n<tr>\n<td>DeiT-B</td>\n<td>87M</td>\n<td>81.8</td>\n</tr>\n<tr>\n<td><strong>Vim-Ti</strong></td>\n<td>7M</td>\n<td><strong>76.1</strong></td>\n</tr>\n<tr>\n<td><strong>Vim-Ti†</strong></td>\n<td>7M</td>\n<td><strong>78.3</strong></td>\n</tr>\n<tr>\n<td><strong>Vim-S</strong></td>\n<td>26M</td>\n<td><strong>80.5</strong></td>\n</tr>\n<tr>\n<td><strong>Vim-S†</strong></td>\n<td>26M</td>\n<td><strong>81.6</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>ADE20K 语义分割（UperNet）：</strong></p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>骨干网络</th>\n<th>参数量</th>\n<th>mIoU</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>DeiT-Ti</td>\n<td>—</td>\n<td>39.2</td>\n</tr>\n<tr>\n<td>DeiT-S</td>\n<td>—</td>\n<td>44.0</td>\n</tr>\n<tr>\n<td><strong>Vim-Ti</strong></td>\n<td>13M</td>\n<td><strong>41.0</strong></td>\n</tr>\n<tr>\n<td><strong>Vim-S</strong></td>\n<td>46M</td>\n<td><strong>44.9</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>COCO 检测与实例分割（Cascade Mask R-CNN）：</strong></p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>骨干网络</th>\n<th>AP\\(^{\\text{box}}\\)</th>\n<th>AP\\(^{\\text{mask}}\\)</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>DeiT-Ti</td>\n<td>44.4</td>\n<td>38.1</td>\n</tr>\n<tr>\n<td><strong>Vim-Ti</strong></td>\n<td><strong>45.7</strong></td>\n<td><strong>39.2</strong></td>\n</tr>\n</tbody>\n</table></div>",
      "quiz": {
        "q": "Vision Mamba 采用双向 SSM 的主要原因是什么？",
        "options": [
          "降低模型参数量",
          "图像 patch 序列不具有因果性，单向 SSM 无法捕获完整的上下文信息",
          "加速 SSM 的并行计算",
          "替代位置嵌入提供空间信息"
        ],
        "answer": 1,
        "explain": "图像不同于自然语言，patch 序列没有固有的因果方向。单向 SSM 只能从一个方向积累信息，导致序列末端 token 缺少来自另一方向的上下文。双向 SSM 通过同时进行前向和后向扫描，确保每个 token 都能获取完整的全局信息。"
      }
    },
    {
      "id": "vmamba",
      "num": 20,
      "name": "VMamba",
      "fullName": "视觉状态空间模型 (VMamba)",
      "year": "2024",
      "org": "中科大/华为",
      "parent": "vim",
      "paperUrl": "https://arxiv.org/abs/2401.10166",
      "projectUrl": "",
      "category": "unified",
      "motivation": "Cross-Scan 2D选择性扫描",
      "summary": "VMamba 提出 Cross-Scan Module (CSM)，将 2D 图像沿四个方向展开为 1D 序列并输入选择性状态空间模型 (S6)，以 \\(O(N)\\) 线性复杂度实现全局感受野，在分类、检测、语义分割任务上全面超越 Swin Transformer 和 ConvNeXt 等同量级模型。",
      "keyPoints": [
        "<strong>Cross-Scan Module (CSM)</strong>：将 2D 特征图沿 4 个方向（左上→右下、右下→左上、右上→左下、左下→右上）展开为 1D 序列，确保任意两个像素之间至少存在一条扫描路径可达",
        "<strong>SS2D (2D-Selective-Scan)</strong>：在 CSM 展开的 4 条序列上分别执行 S6 选择性扫描，再合并回 2D 特征图，是 VSS Block 的核心算子",
        "<strong>VSS Block</strong>：Linear → DWConv 3×3 → SiLU → SS2D → LayerNorm 的双分支结构（另一分支为 Linear → SiLU 的门控），无需位置编码和 MLP 层",
        "<strong>4-stage 层级架构</strong>：类似 Swin Transformer 的金字塔结构，通道数 [C, 2C, 4C, 8C]，各 stage 通过 Patch Merging 下采样",
        "<strong>三种规模</strong>：VMamba-T (22M/4.5G)、VMamba-S (44M/9.1G)、VMamba-B (75M/15.2G)",
        "<strong>线性复杂度</strong>：相比 ViT 的 \\(O(N^2)\\) 全局注意力和 CNN 的局部感受野，VMamba 以 \\(O(N)\\) 复杂度实现全局建模",
        "<strong>ADE20K 语义分割</strong>：VMamba-T 以 UperNet 达到 47.3% mIoU (SS)，VMamba-S 达到 50.8% mIoU，VMamba-B 达到 50.0/51.3% mIoU (SS/MS)，均超越同级 Swin 和 ConvNeXt"
      ],
      "detail": "<h5>核心架构总览</h5>\n<p><img alt=\"VMamba 整体架构\" src=\"https://raw.githubusercontent.com/MzeroMiko/VMamba/main/assets/architecture.png\" />\n<em>图：VMamba 整体架构。左侧为 4-stage 层级结构，右侧为 VSS Block 内部结构，核心是 SS2D 模块。</em></p>\n<h5>2D 选择性扫描 (SS2D) 示意</h5>\n<p><img alt=\"SS2D Cross-Scan 示意\" src=\"https://raw.githubusercontent.com/MzeroMiko/VMamba/main/assets/ss2d.png\" />\n<em>图：SS2D 中的 Cross-Scan Module。2D 特征图被沿 4 个方向展开为 1D 序列，分别经过 S6 扫描后合并回 2D。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># VMamba VSS Block 前向传播伪代码\ndef vss_block_forward(x):\n    # 双分支结构\n    x_residual = x\n    # 分支 1: SS2D 路径\n    z = Linear(x)           # 投影\n    x = Linear(x)           # 投影\n    x = DWConv3x3(x)        # 局部特征提取\n    x = SiLU(x)             # 激活\n    x = ss2d(x)             # 2D 选择性扫描（核心）\n    x = LayerNorm(x)\n    # 分支 2: 门控\n    x = x * SiLU(z)         # 门控乘法\n    x = Linear(x)           # 输出投影\n    return x + x_residual   # 残差连接\n\ndef ss2d(x):\n    &quot;&quot;&quot;2D Selective Scan: Cross-Scan + S6 + Cross-Merge&quot;&quot;&quot;\n    B, C, H, W = x.shape\n    # Cross-Scan: 4 方向展开\n    x1 = x.flatten(row_major)           # 左上 → 右下\n    x2 = x.flatten(row_major).flip()    # 右下 → 左上\n    x3 = x.T.flatten(row_major)         # 右上 → 左下\n    x4 = x.T.flatten(row_major).flip()  # 左下 → 右上\n    # 对每条序列执行 S6 选择性扫描\n    y1, y2, y3, y4 = S6(x1), S6(x2), S6(x3), S6(x4)\n    # Cross-Merge: 逆展开 + 求和\n    return inverse_scan(y1) + inverse_scan(y2) + inverse_scan(y3) + inverse_scan(y4)\n</code></pre>\n<h5>动机与背景</h5>\n<p>视觉 Transformer (ViT) 通过全局自注意力实现了强大的建模能力，但其 \\(O(N^2)\\) 的计算复杂度在高分辨率输入（如语义分割中的 512×512 或更大）时成为瓶颈。CNN 虽然高效，但受限于局部感受野，难以捕获长距离依赖。</p>\n<p>Mamba（S6 模型）在 NLP 领域展示了以 \\(O(N)\\) 线性复杂度实现全局序列建模的能力，其核心是<strong>选择性扫描机制</strong>——通过输入依赖的参数 \\(\\mathbf{B}\\)、\\(\\mathbf{C}\\)、\\(\\Delta\\) 动态决定信息的保留与遗忘。然而，Mamba 是为 1D 序列设计的，直接应用于 2D 图像面临<strong>方向性局限</strong>：单一扫描方向无法让所有像素对之间建立有效的信息通路。</p>\n<div class=\"key-point\">💡 <strong>关键洞察</strong>：如果只用单方向（如从左到右）扫描，右上角的像素信息无法有效传递到左下角。VMamba 的 CSM 通过 4 方向扫描确保任意两个像素之间至少存在一条短路径。</div>\n<h5>核心机制：选择性状态空间模型 (S6)</h5>\n<p><strong>连续 SSM</strong> 的基本形式为：</p>\n<p>$$h'(t) = \\mathbf{A} h(t) + \\mathbf{B} x(t), \\quad y(t) = \\mathbf{C} h(t)$$</p>\n<p>其中 \\(\\mathbf{A} \\in \\mathbb{R}^{N \\times N}\\) 为状态转移矩阵，\\(\\mathbf{B} \\in \\mathbb{R}^{N \\times 1}\\)、\\(\\mathbf{C} \\in \\mathbb{R}^{1 \\times N}\\) 为投影矩阵，\\(h(t) \\in \\mathbb{R}^N\\) 为隐状态。</p>\n<p><strong>离散化</strong>后（零阶保持 ZOH）：</p>\n<p>$$\\bar{\\mathbf{A}} = \\exp(\\Delta \\mathbf{A}), \\quad \\bar{\\mathbf{B}} = (\\Delta \\mathbf{A})^{-1}(\\exp(\\Delta \\mathbf{A}) - \\mathbf{I}) \\cdot \\Delta \\mathbf{B}$$</p>\n<p>$$h_t = \\bar{\\mathbf{A}} h_{t-1} + \\bar{\\mathbf{B}} x_t, \\quad y_t = \\mathbf{C} h_t$$</p>\n<p><strong>S6 的关键创新</strong>：将 \\(\\mathbf{B}\\)、\\(\\mathbf{C}\\)、\\(\\Delta\\) 从固定参数变为<strong>输入依赖</strong>的函数，即 \\(\\mathbf{B}_t = f_B(x_t)\\)，\\(\\mathbf{C}_t = f_C(x_t)\\)，\\(\\Delta_t = \\text{softplus}(f_\\Delta(x_t))\\)。这使得模型能够根据输入内容动态调整信息流，类似于注意力机制的选择性。</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：S6 的递推计算天然是因果的（当前状态只依赖过去），这在 NLP 中是合理的，但在视觉中需要非因果的全局信息交互——这正是 CSM 4 方向扫描的必要性所在。</div>\n<h5>核心机制：Cross-Scan Module (CSM)</h5>\n<p>CSM 是 VMamba 最核心的创新，解决了 1D SSM 应用于 2D 图像的根本问题：</p>\n<ol>\n<li><strong>Cross-Scan（展开）</strong>：将 \\(H \\times W\\) 的 2D 特征图沿 4 个方向展开为 4 条长度为 \\(H \\times W\\) 的 1D 序列</li>\n<li>方向 1：逐行从左到右（左上→右下）</li>\n<li>方向 2：方向 1 的逆序（右下→左上）</li>\n<li>方向 3：逐列从上到下（右上→左下，即转置后逐行）</li>\n<li>\n<p>方向 4：方向 3 的逆序（左下→右上）</p>\n</li>\n<li>\n<p><strong>S6 扫描</strong>：对 4 条序列分别执行独立的 S6 选择性扫描，各自维护独立的隐状态</p>\n</li>\n<li>\n<p><strong>Cross-Merge（合并）</strong>：将 4 条输出序列逆展开回 \\(H \\times W\\) 的 2D 形状，然后逐元素求和</p>\n</li>\n</ol>\n<div class=\"key-point\">💡 <strong>为什么是 4 个方向？</strong> 考虑位于 \\((i, j)\\) 的像素，方向 1 可以接收其左侧和上方行的信息，方向 2 可以接收右侧和下方行的信息，方向 3/4 覆盖列方向。4 个方向的组合确保了全局连通性，且计算量仅为单方向的 4 倍，仍保持 \\(O(N)\\) 复杂度。</div>\n<h5>VSS Block 与整体架构</h5>\n<p><strong>VSS Block</strong> 采用双分支门控结构（类似 Mamba Block）：\n- 主分支：Linear → DWConv 3×3 → SiLU → SS2D → LayerNorm\n- 门控分支：Linear → SiLU\n- 输出：主分支 ⊙ 门控分支 → Linear → 残差连接</p>\n<p>DWConv 3×3 提供局部位置信息（替代显式位置编码），SS2D 提供全局信息建模。</p>\n<p><strong>整体架构</strong>为 4-stage 层级结构：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>Stage</th>\n<th>分辨率</th>\n<th>通道数</th>\n<th>Block 数 (T/S/B)</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>1</td>\n<td>H/4 × W/4</td>\n<td>C</td>\n<td>2/2/2</td>\n</tr>\n<tr>\n<td>2</td>\n<td>H/8 × W/8</td>\n<td>2C</td>\n<td>2/2/2</td>\n</tr>\n<tr>\n<td>3</td>\n<td>H/16 × W/16</td>\n<td>4C</td>\n<td>5/9/15</td>\n</tr>\n<tr>\n<td>4</td>\n<td>H/32 × W/32</td>\n<td>8C</td>\n<td>2/2/2</td>\n</tr>\n</tbody>\n</table></div>\n<p>其中 VMamba-T 的 C=96，VMamba-S 的 C=96（Stage 3 更深），VMamba-B 的 C=128。</p>\n<h5>与传统方法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>CNN (ResNet/ConvNeXt)</th>\n<th>ViT/Swin</th>\n<th>VMamba</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>感受野</td>\n<td>局部（堆叠扩大）</td>\n<td>全局（窗口/全局注意力）</td>\n<td>全局（SSM 递推）</td>\n</tr>\n<tr>\n<td>计算复杂度</td>\n<td>\\(O(N)\\)</td>\n<td>\\(O(N^2)\\) 或 \\(O(N \\cdot W^2)\\)</td>\n<td>\\(O(N)\\)</td>\n</tr>\n<tr>\n<td>位置编码</td>\n<td>隐式（卷积）</td>\n<td>显式（APE/RPE）</td>\n<td>隐式（DWConv）</td>\n</tr>\n<tr>\n<td>动态性</td>\n<td>静态权重</td>\n<td>输入依赖（注意力）</td>\n<td>输入依赖（S6 参数）</td>\n</tr>\n</tbody>\n</table></div>\n<h5>有效感受野 (ERF) 可视化</h5>\n<p><img alt=\"ERF 可视化\" src=\"https://raw.githubusercontent.com/MzeroMiko/VMamba/main/assets/erf.png\" />\n<em>图：有效感受野对比。VMamba 的 ERF 覆盖范围远大于 ResNet 和 ConvNeXt，接近全局，且呈十字形扩展模式（对应 4 方向扫描）。</em></p>\n<h5>关键实验结果</h5>\n<p><strong>ImageNet-1K 分类</strong>：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>模型</th>\n<th>Params</th>\n<th>FLOPs</th>\n<th>Top-1 Acc</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Swin-T</td>\n<td>28M</td>\n<td>4.5G</td>\n<td>81.3%</td>\n</tr>\n<tr>\n<td>ConvNeXt-T</td>\n<td>29M</td>\n<td>4.5G</td>\n<td>82.1%</td>\n</tr>\n<tr>\n<td><strong>VMamba-T</strong></td>\n<td><strong>22M</strong></td>\n<td><strong>4.5G</strong></td>\n<td><strong>82.2%</strong></td>\n</tr>\n<tr>\n<td>Swin-S</td>\n<td>50M</td>\n<td>8.7G</td>\n<td>83.0%</td>\n</tr>\n<tr>\n<td><strong>VMamba-S</strong></td>\n<td><strong>44M</strong></td>\n<td><strong>9.1G</strong></td>\n<td><strong>83.5%</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>ADE20K 语义分割 (UperNet)</strong>：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>模型</th>\n<th>Crop Size</th>\n<th>mIoU (SS)</th>\n<th>mIoU (MS)</th>\n<th>Params</th>\n<th>FLOPs</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Swin-B</td>\n<td>512²</td>\n<td>48.1</td>\n<td>49.7</td>\n<td>121M</td>\n<td>1188G</td>\n</tr>\n<tr>\n<td>ConvNeXt-B</td>\n<td>512²</td>\n<td>49.1</td>\n<td>49.9</td>\n<td>122M</td>\n<td>1170G</td>\n</tr>\n<tr>\n<td><strong>VMamba-B</strong></td>\n<td><strong>512²</strong></td>\n<td><strong>50.0</strong></td>\n<td><strong>51.3</strong></td>\n<td><strong>110M</strong></td>\n<td><strong>1167G</strong></td>\n</tr>\n<tr>\n<td>Swin-S</td>\n<td>640²</td>\n<td>47.9</td>\n<td>48.8</td>\n<td>81M</td>\n<td>1614G</td>\n</tr>\n<tr>\n<td><strong>VMamba-S</strong></td>\n<td><strong>640²</strong></td>\n<td><strong>50.8</strong></td>\n<td><strong>50.8</strong></td>\n<td><strong>76M</strong></td>\n<td><strong>1620G</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>COCO 目标检测 (Mask R-CNN 1×)</strong>：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>模型</th>\n<th>AP^box</th>\n<th>AP^mask</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Swin-T</td>\n<td>42.7</td>\n<td>39.3</td>\n</tr>\n<tr>\n<td>ConvNeXt-T</td>\n<td>44.2</td>\n<td>40.1</td>\n</tr>\n<tr>\n<td><strong>VMamba-T</strong></td>\n<td><strong>46.5</strong></td>\n<td><strong>42.1</strong></td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 <strong>关键发现</strong>：VMamba 在密集预测任务（检测、分割）上的优势比分类任务更显著，这得益于 SSM 在高分辨率输入下的线性复杂度优势和全局感受野。</div>",
      "quiz": {
        "q": "VMamba 的 Cross-Scan Module (CSM) 为什么需要 4 个扫描方向而非 2 个？",
        "options": [
          "4 个方向可以将计算复杂度从 O(N²) 降低到 O(N)",
          "4 个方向确保 2D 特征图中任意两个像素之间至少存在一条有效信息传递路径",
          "4 个方向是为了与 4-stage 层级结构对应",
          "4 个方向可以替代多头注意力机制中的多个注意力头"
        ],
        "answer": 1,
        "explain": "S6 的递推是因果的，单方向扫描只能传递该方向上的信息。2 个方向（如左→右和右→左）只能覆盖水平方向，垂直方向的像素对仍缺乏直接通路。4 个方向（水平正反 + 垂直正反）确保了 2D 平面上任意两点间的全局连通性。"
      }
    },
    {
      "id": "medmamba",
      "num": 21,
      "name": "MedMamba",
      "fullName": "医疗Mamba (MedMamba)",
      "year": "2026",
      "org": "多机构",
      "parent": "vmamba",
      "paperUrl": "https://www.sciencedirect.com/science/article/pii/S1746809425008742",
      "projectUrl": "",
      "category": "frontier",
      "motivation": "多尺度可变形注意力医疗分割",
      "summary": "MedMamba 提出了一种融合多尺度协同感知编码器（MSCP）与全局-变形协同解码器（GDCD）的 UNet 架构，通过状态空间模型（SSM/Mamba）实现线性复杂度的全局建模，并结合 BceDiceFocal 复合损失函数，在超声肾脏和眼底血管分割任务上取得了优于现有方法的性能。",
      "keyPoints": [
        "<strong>编码器 MSCP 模块</strong>：多分支卷积（3×1、1×3、3×3、5×5 四种核）捕获多尺度空间特征，配合 scSE（空间-通道挤压激励）机制自适应重标定特征重要性",
        "<strong>解码器 GDCD 模块</strong>：双分支设计融合 Local-SS2D（局部状态空间 2D 扫描）和 Conv-SS2D（卷积增强状态空间 2D 扫描），无需可变形卷积即可实现对复杂解剖边界的灵活建模",
        "<strong>复合损失函数 BceDiceFocal</strong>：组合 BCE（像素级精度）、Dice（区域级重叠）和 Focal Loss（难样本聚焦），自适应加权应对严重类别不平衡",
        "<strong>骨干网络</strong>：基于 VMamba 的 SSM 视觉模型，具有线性计算复杂度的全局依赖建模能力",
        "<strong>验证数据集</strong>：CT2USforKidneySeg（超声肾脏分割）和 FIVES（眼底血管分割），覆盖不同模态和分割难度",
        "<strong>整体架构</strong>：保留 UNet 编码器-解码器框架的结构优势，实现全局建模与局部感知的统一"
      ],
      "detail": "<h5>架构总览</h5>\n<p>MedMamba 采用经典的 UNet 编码器-解码器结构，在编码器端引入 MSCP 模块增强多尺度特征提取，在解码器端引入 GDCD 模块实现全局-局部协同解码。整体设计遵循\"三重增强策略\"：多尺度感知、全局-变形协同解码、任务感知复合损失。</p>\n<div class=\"key-point\">💡 关键：MedMamba 的核心创新不在于引入全新的基础算子，而在于将 SSM 的全局建模能力与多尺度卷积的局部感知能力进行深度融合，形成互补。</div>\n<h5>背景与动机</h5>\n<p>医学图像分割面临三大核心挑战：</p>\n<ol>\n<li><strong>多尺度解剖结构</strong>：从粗粒度器官到细粒度血管，需要同时建模全局语义和局部细节</li>\n<li><strong>弱边界与低信噪比</strong>：超声、眼底等模态中，结构与噪声背景难以区分</li>\n<li><strong>严重类别不平衡</strong>：目标区域仅占图像的极小比例，标准学习目标表现不佳</li>\n</ol>\n<p>传统 CNN 受限于局部感受野，难以捕获长程依赖；Transformer 虽能全局建模，但自注意力的二次复杂度 \\(O(n^2)\\) 在高分辨率医学图像上计算代价过高。状态空间模型（SSM）以线性复杂度 \\(O(n)\\) 实现全局依赖建模，为医学图像分割提供了新的技术路径。</p>\n<h5>状态空间模型（SSM）基础</h5>\n<p>MedMamba 基于 Mamba/VMamba 的选择性状态空间模型。SSM 的连续形式为：</p>\n<p>$$h'(t) = Ah(t) + Bx(t)$$\n$$y(t) = Ch(t)$$</p>\n<p>其中 \\(A \\in \\mathbb{R}^{N \\times N}\\) 为状态矩阵，\\(B \\in \\mathbb{R}^{N \\times 1}\\) 和 \\(C \\in \\mathbb{R}^{N \\times 1}\\) 为投影参数。通过零阶保持（ZOH）离散化，引入时间尺度参数 \\(\\delta\\)：</p>\n<p>$$\\bar{A} = \\exp(\\delta A)$$\n$$\\bar{B} = (\\delta A)^{-1}(\\exp(\\delta A) - I) \\cdot \\delta B$$</p>\n<p>Mamba 的关键创新在于使参数 \\(B\\)、\\(C\\)、\\(\\delta\\) 依赖于输入，实现选择性信息过滤，同时通过硬件感知的并行扫描算法保持高效计算。</p>\n<h5>MSCP 模块（编码器 - Multi-Scale Collaborative Perception）</h5>\n<p>MSCP 模块的设计动机是：不同尺度的解剖结构需要不同大小的感受野来有效捕获。</p>\n<p><strong>多分支卷积设计</strong>：\n- <strong>3×1 卷积</strong>：捕获水平方向的细长结构（如血管横截面）\n- <strong>1×3 卷积</strong>：捕获垂直方向的细长结构\n- <strong>3×3 卷积</strong>：标准局部特征提取\n- <strong>5×5 卷积</strong>：较大感受野，捕获更粗粒度的上下文</p>\n<p>四个分支的输出进行融合，形成多尺度特征表示。</p>\n<p><strong>scSE 注意力机制</strong>：\n在多分支卷积之后，应用空间-通道挤压激励（spatial-channel Squeeze-and-Excitation）机制：</p>\n<p>$$\\text{scSE}(F) = \\max(\\text{cSE}(F), \\text{sSE}(F))$$</p>\n<ul>\n<li><strong>cSE（通道挤压激励）</strong>：通过全局平均池化→全连接层→Sigmoid 生成通道权重，强调信息丰富的通道</li>\n<li><strong>sSE（空间挤压激励）</strong>：通过 1×1 卷积→Sigmoid 生成空间权重图，强调关键空间位置</li>\n</ul>\n<div class=\"key-point\">💡 关键：scSE 的双路径设计使模型能够同时在通道维度和空间维度上进行自适应特征选择，特别适合强调细粒度结构（如薄血管、模糊病灶边界）。</div>\n<pre><code class=\"language-python\"># MSCP 模块伪代码\nclass MSCP(nn.Module):\n    def __init__(self, in_channels, out_channels):\n        self.branch_3x1 = Conv2d(in_channels, out_channels, kernel_size=(3, 1), padding=(1, 0))\n        self.branch_1x3 = Conv2d(in_channels, out_channels, kernel_size=(1, 3), padding=(0, 1))\n        self.branch_3x3 = Conv2d(in_channels, out_channels, kernel_size=(3, 3), padding=1)\n        self.branch_5x5 = Conv2d(in_channels, out_channels, kernel_size=(5, 5), padding=2)\n        self.scse = scSE(out_channels)\n\n    def forward(self, x):\n        f1 = self.branch_3x1(x)\n        f2 = self.branch_1x3(x)\n        f3 = self.branch_3x3(x)\n        f4 = self.branch_5x5(x)\n        fused = f1 + f2 + f3 + f4  # 多尺度特征融合\n        out = self.scse(fused)      # 自适应特征重标定\n        return out\n</code></pre>\n<h5>GDCD 模块（解码器 - Global-Deformation Collaborative Decoding）</h5>\n<p>GDCD 模块的名称中\"Deformation\"并非指使用可变形卷积（Deformable Convolution），而是指其对多样化目标形状（如肿瘤、器官）的灵活适应能力。</p>\n<p><strong>双分支设计</strong>：</p>\n<ol>\n<li><strong>Local-SS2D 分支</strong>：局部状态空间 2D 扫描</li>\n<li>在局部窗口内执行 SS2D（Selective Scan 2D）操作</li>\n<li>捕获局部几何细节和边界信息</li>\n<li>\n<p>保持对细粒度结构的敏感性</p>\n</li>\n<li>\n<p><strong>Conv-SS2D 分支</strong>：卷积增强状态空间 2D 扫描</p>\n</li>\n<li>将卷积特征与 SS2D 全局扫描相结合</li>\n<li>提供更强的全局语义上下文</li>\n<li>增强对大尺度结构的理解</li>\n</ol>\n<p>两个分支的输出通过动态融合机制进行整合，实现局部细节与全局上下文的互补：</p>\n<pre><code class=\"language-python\"># GDCD 模块伪代码\nclass GDCD(nn.Module):\n    def __init__(self, dim):\n        self.local_ss2d = LocalSS2D(dim)   # 局部窗口内的选择性扫描\n        self.conv_ss2d = ConvSS2D(dim)     # 卷积增强的选择性扫描\n        self.fusion = DynamicFusion(dim)    # 动态融合层\n\n    def forward(self, x, skip_connection):\n        x = torch.cat([x, skip_connection], dim=1)\n        local_feat = self.local_ss2d(x)    # 局部几何细节\n        global_feat = self.conv_ss2d(x)    # 全局语义上下文\n        out = self.fusion(local_feat, global_feat)  # 动态融合\n        return out\n</code></pre>\n<div class=\"warn-box\">⚠️ 注意：GDCD 的\"变形\"能力来自 Local-SS2D 和 Conv-SS2D 的堆叠融合机制，而非传统的可变形卷积算子。这种设计在保持计算效率的同时，实现了对复杂解剖边界的精确重建。</div>\n<h5>SS2D（Selective Scan 2D）机制</h5>\n<p>SS2D 是 VMamba 提出的将 1D 选择性扫描扩展到 2D 图像的关键机制。它通过四个方向的扫描路径（左→右、右→左、上→下、下→上）将 2D 特征图展平为 1D 序列，分别执行选择性状态空间扫描后再合并：</p>\n<p>$$\\text{SS2D}(X) = \\text{Merge}(\\text{SSM}(\\text{Scan}_1(X)), \\text{SSM}(\\text{Scan}_2(X)), \\text{SSM}(\\text{Scan}_3(X)), \\text{SSM}(\\text{Scan}_4(X)))$$</p>\n<p>这使得模型能够以线性复杂度捕获图像中任意两点之间的长程依赖关系。</p>\n<h5>复合损失函数 BceDiceFocal</h5>\n<p>针对医学图像分割中的类别不平衡和边界模糊问题，MedMamba 设计了三重复合损失：</p>\n<p>$$\\mathcal{L}_{total} = \\lambda_1 \\mathcal{L}_{BCE} + \\lambda_2 \\mathcal{L}_{Dice} + \\lambda_3 \\mathcal{L}_{Focal}$$</p>\n<p>各分量的作用：</p>\n<ul>\n<li><strong>BCE Loss</strong>（像素级精度）：</li>\n</ul>\n<p>$$\\mathcal{L}_{BCE} = -\\frac{1}{N}\\sum_{i=1}^{N}[y_i \\log(\\hat{y}_i) + (1-y_i)\\log(1-\\hat{y}_i)]$$</p>\n<ul>\n<li><strong>Dice Loss</strong>（区域级重叠）：</li>\n</ul>\n<p>$$\\mathcal{L}_{Dice} = 1 - \\frac{2\\sum_{i=1}^{N} y_i \\hat{y}_i + \\epsilon}{\\sum_{i=1}^{N} y_i + \\sum_{i=1}^{N} \\hat{y}_i + \\epsilon}$$</p>\n<ul>\n<li><strong>Focal Loss</strong>（难样本聚焦）：</li>\n</ul>\n<p>$$\\mathcal{L}_{Focal} = -\\frac{1}{N}\\sum_{i=1}^{N} \\alpha_t (1-p_t)^\\gamma \\log(p_t)$$</p>\n<div class=\"key-point\">💡 关键：三种损失的互补性——BCE 提供稳定的像素级梯度，Dice 直接优化分割指标（对类别不平衡鲁棒），Focal Loss 使模型聚焦于难以分割的边界区域和小目标。</div>\n<h5>与现有方法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>U-Mamba</th>\n<th>VM-UNet</th>\n<th>SegMamba</th>\n<th><strong>MedMamba</strong></th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>编码器</td>\n<td>SSM+CNN 混合</td>\n<td>纯 VSS Block</td>\n<td>SSM</td>\n<td>MSCP + VMamba</td>\n</tr>\n<tr>\n<td>解码器</td>\n<td>CNN</td>\n<td>VSS Block</td>\n<td>CNN</td>\n<td>GDCD (Local-SS2D + Conv-SS2D)</td>\n</tr>\n<tr>\n<td>多尺度设计</td>\n<td>✗</td>\n<td>✗</td>\n<td>✗</td>\n<td>✓ (四种卷积核)</td>\n</tr>\n<tr>\n<td>注意力机制</td>\n<td>✗</td>\n<td>✗</td>\n<td>✗</td>\n<td>scSE</td>\n</tr>\n<tr>\n<td>复合损失</td>\n<td>✗</td>\n<td>✗</td>\n<td>✗</td>\n<td>BceDiceFocal</td>\n</tr>\n<tr>\n<td>计算复杂度</td>\n<td>线性</td>\n<td>线性</td>\n<td>线性</td>\n<td>线性</td>\n</tr>\n</tbody>\n</table></div>\n<p>MedMamba 的主要优势在于：\n1. 编码器端的多尺度感知能力（MSCP）弥补了纯 SSM 模型缺乏显式多尺度建模的不足\n2. 解码器端的双分支 SS2D 设计（GDCD）在保持全局建模的同时增强了局部几何适应性\n3. 复合损失函数从像素、区域、难样本三个层面综合优化分割质量</p>\n<h5>实验验证</h5>\n<p>MedMamba 在两个公开数据集上进行了验证：</p>\n<ul>\n<li><strong>CT2USforKidneySeg</strong>：超声肾脏分割数据集，挑战在于超声图像的散斑噪声和低信噪比</li>\n<li><strong>FIVES</strong>：眼底血管分割数据集，挑战在于血管的细长结构和弱对比度</li>\n</ul>\n<p>实验结果表明 MedMamba 在分割精度、对弱结构的敏感性和跨模态泛化能力方面均优于现有最先进方法。</p>",
      "quiz": {
        "q": "MedMamba 的 GDCD 解码模块中'Deformation'能力的实现方式是什么？",
        "options": [
          "使用可变形卷积（Deformable Convolution）学习偏移量",
          "通过 Local-SS2D 和 Conv-SS2D 的动态融合实现形状自适应",
          "使用空间变换网络（STN）进行几何变换",
          "通过注意力机制动态调整卷积核形状"
        ],
        "answer": 1,
        "explain": "GDCD 的'变形'能力并非来自可变形卷积，而是通过 Local-SS2D（局部状态空间扫描）和 Conv-SS2D（卷积增强状态空间扫描）的双分支动态融合机制实现对多样化目标形状的灵活适应。"
      }
    },
    {
      "id": "spmamba",
      "num": 22,
      "name": "SPMamba",
      "fullName": "脊柱Mamba (SPMamba)",
      "year": "2026",
      "org": "多机构",
      "parent": "vmamba",
      "paperUrl": "https://www.sciencedirect.com/science/article/pii/S1746809425008754",
      "projectUrl": "",
      "category": "frontier",
      "motivation": "层级特征融合脊柱图像分割",
      "summary": "SPMamba 的核心目标是：层级特征融合脊柱图像分割。",
      "keyPoints": [
        "核心动机：层级特征融合脊柱图像分割",
        "演化来源：继承或改进自 vmamba",
        "代表机构：多机构"
      ],
      "detail": "<p>层级特征融合脊柱图像分割</p>"
    },
    {
      "id": "segmaformer",
      "num": 23,
      "name": "SegMaFormer",
      "fullName": "分割MaFormer (SegMaFormer)",
      "year": "2026",
      "org": "多机构",
      "parent": "vmamba",
      "paperUrl": "https://arxiv.org/abs/2603.22002",
      "projectUrl": "",
      "category": "frontier",
      "motivation": "Mamba+Transformer混合高效分割",
      "summary": "SegMaFormer 的核心目标是：Mamba+Transformer混合高效分割。",
      "keyPoints": [
        "核心动机：Mamba+Transformer混合高效分割",
        "演化来源：继承或改进自 vmamba",
        "代表机构：多机构"
      ],
      "detail": "<p>Mamba+Transformer混合高效分割</p>"
    },
    {
      "id": "taming_sam3",
      "num": 24,
      "name": "Taming SAM3",
      "fullName": "驯服SAM3 (Taming SAM3)",
      "year": "2026",
      "org": "多机构",
      "parent": "sam",
      "paperUrl": "https://arxiv.org/abs/2602.06333",
      "projectUrl": "",
      "category": "frontier",
      "motivation": "概念库增强开放词汇分割",
      "summary": "Taming SAM3 的核心目标是：概念库增强开放词汇分割。",
      "keyPoints": [
        "核心动机：概念库增强开放词汇分割",
        "演化来源：继承或改进自 sam",
        "代表机构：多机构"
      ],
      "detail": "<p>概念库增强开放词汇分割</p>"
    },
    {
      "id": "omniovcd",
      "num": 25,
      "name": "OmniOVCD",
      "fullName": "全能开放词汇变化检测 (OmniOVCD)",
      "year": "2026",
      "org": "多机构",
      "parent": "sam",
      "paperUrl": "https://arxiv.org/abs/2601.13895",
      "projectUrl": "",
      "category": "frontier",
      "motivation": "SAM3开放词汇变化检测",
      "summary": "OmniOVCD 提出了首个独立的开放词汇变化检测（OVCD）框架，通过 **协同融合到实例解耦（SFID）** 策略充分挖掘 SAM 3 统一架构中语义头、实例头和存在头的互补优势，以单模型替代传统多模型流水线，在四大遥感变化检测基准上取得 SOTA 性能的同时大幅降低计算开销。",
      "keyPoints": [
        "<strong>首个独立 OVCD 框架</strong>：无需组合 SAM + CLIP + 专用分割模型等多模型流水线，仅依赖 SAM 3 单一模型完成开放词汇变化检测",
        "<strong>SFID 策略</strong>：包含两阶段——协同掩码融合（Synergistic Mask Fusion）与实例解耦匹配（Instance Decoupling &amp; Matching）",
        "<strong>三头协同融合</strong>：将 SAM 3 的语义头（Semantic Head）、实例头（Instance Head）和存在头（Presence Head）进行像素级最大值融合与置信度门控，生成高质量语义分割图",
        "<strong>实例级变化匹配</strong>：通过连通域分析将语义图解耦为实例掩码，利用双向重叠率匹配识别变化区域，有效抑制像素级噪声",
        "<strong>四大基准 SOTA</strong>：在 LEVIR-CD（IoU 67.2）、WHU-CD（IoU 66.5）、S2Looking（IoU 24.5）、SECOND（class-avg IoU 27.1）上均超越现有方法",
        "<strong>高效推理</strong>：单张 RTX 3090 即可运行，推理速度最快、显存占用最低"
      ],
      "detail": "<h5>核心框架图</h5>\n<p><img alt=\"OmniOVCD 整体框架\" src=\"https://arxiv.org/html/2601.13895v1/x1.png\" />\n<em>图 1：OmniOVCD 与传统多模型流水线方法的对比。传统方法需要组合多个独立模型（如 SAM + CLIP + 专用分割器），而 OmniOVCD 仅使用 SAM 3 单一模型。</em></p>\n<p><img alt=\"SFID 策略流程\" src=\"https://arxiv.org/html/2601.13895v1/x2.png\" />\n<em>图 2：SFID（Synergistic Fusion to Instance Decoupling）策略的完整流程。左侧为协同掩码融合阶段，右侧为实例解耦与匹配阶段。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># OmniOVCD: SFID 策略核心流程\ndef omniovcd_change_detection(image_t1, image_t2, text_prompts, tau_match=0.5):\n    &quot;&quot;&quot;\n    输入: 双时相遥感图像 image_t1, image_t2; 文本提示 text_prompts\n    输出: 变化掩码 change_mask\n    &quot;&quot;&quot;\n    # ===== 阶段一: 协同掩码融合 (Synergistic Mask Fusion) =====\n    for image in [image_t1, image_t2]:\n        # SAM 3 前向推理，获取三个头的输出\n        P_sem, P_inst_raw, P_pres = sam3_forward(image, text_prompts)\n\n        # 1. 实例头聚合: 加权最大值选择 (Eq.2)\n        # 对每个类别 c，选择置信度最高的实例掩码\n        P_agg[c] = max over instances k of (P_pres[c,k] * P_inst[c,k])\n\n        # 2. 像素级最大值融合 (Eq.3)\n        # 融合语义头和聚合后的实例头\n        P_fused = pixel_wise_max(P_sem, P_agg)\n\n        # 3. 存在头门控 (Eq.4)\n        # 过滤低置信度类别\n        P_final[c] = P_fused[c] if max(P_pres[c]) &gt; threshold else 0\n\n        # 4. Argmax 生成语义分割图\n        semantic_map = argmax(P_final, dim='class')\n\n    # ===== 阶段二: 实例解耦与匹配 (Instance Decoupling &amp; Matching) =====\n    for each class c:\n        # 连通域分析 (8-连通) 提取实例\n        instances_t1 = connected_components(semantic_map_t1 == c)\n        instances_t2 = connected_components(semantic_map_t2 == c)\n\n        # 双向重叠率匹配 (Eq.5)\n        for inst_a in instances_t1:\n            matched = False\n            for inst_b in instances_t2:\n                overlap = |inst_a ∩ inst_b| / |inst_a ∪ inst_b|  # IoU\n                if overlap &gt; tau_match:\n                    matched = True; break\n            if not matched:\n                change_mask |= inst_a  # 未匹配 → 标记为变化\n\n        # 反向同理: t2 中未匹配的实例也标记为变化\n\n    return change_mask\n</code></pre>\n<h5>动机与背景</h5>\n<p><strong>传统变化检测的局限性。</strong> 遥感变化检测（Change Detection, CD）旨在识别同一地理区域在不同时间点的地表变化。传统方法分为两类：（1）<strong>监督方法</strong>（如 BIT、ChangeFormer）依赖大规模标注数据训练专用模型，泛化能力受限于训练类别；（2）<strong>无监督方法</strong>（如 CVA、DCVA）通过特征差异检测变化，但无法提供语义级别的变化类型信息。</p>\n<p><strong>开放词汇变化检测（OVCD）的兴起。</strong> 随着视觉-语言基础模型（如 CLIP、SAM）的发展，OVCD 应运而生——通过自然语言文本提示指定感兴趣的变化类别，无需针对特定类别重新训练。然而，现有 OVCD 方法（如 DynamicEarth、ChangeCLIP）普遍采用<strong>多模型流水线</strong>架构：将 SAM/SAM2 用于分割、CLIP/DINOv2 用于语义理解、再加上专用的开放词汇分割器（如 SegEarth-OV）。这种拼接方式存在三大问题：</p>\n<div class=\"warn-box\">⚠️ <strong>流水线方法的核心缺陷：</strong>\n1. <strong>误差累积</strong>：各模块的误差逐级传播，难以全局优化\n2. <strong>计算冗余</strong>：多个大模型并行运行，显存和推理时间成倍增长\n3. <strong>集成不稳定</strong>：不同模型的特征空间不一致，融合效果依赖大量超参调优</div>\n<p><strong>SAM 3 的统一架构优势。</strong> SAM 3（Segment Anything with Concepts）在 SAM 2 的基础上引入了概念级理解能力，其架构内部同时包含<strong>语义分割头</strong>、<strong>实例分割头</strong>和<strong>存在预测头</strong>三个互补的输出头。OmniOVCD 的核心洞察是：这三个头各有所长，通过精心设计的融合策略可以替代整条多模型流水线。</p>\n<h5>核心机制：SFID 策略详解</h5>\n<p><strong>阶段一：协同掩码融合（Synergistic Mask Fusion）</strong></p>\n<p>SAM 3 对每张输入图像产生三类输出：</p>\n<ol>\n<li>\n<p><strong>语义头</strong> \\(P_{\\text{sem}} \\in \\mathbb{R}^{C \\times H \\times W}\\)：直接输出每个像素属于各类别的概率图。优势在于全局语义一致性好，但边界精度有限。</p>\n</li>\n<li>\n<p><strong>实例头</strong> \\(P_{\\text{inst}} \\in \\mathbb{R}^{C \\times K \\times H \\times W}\\)：对每个类别 \\(c\\) 输出最多 \\(K\\) 个实例掩码。优势在于边界精确，但需要聚合为类别级表示。</p>\n</li>\n<li>\n<p><strong>存在头</strong> \\(P_{\\text{pres}} \\in \\mathbb{R}^{C \\times K}\\)：预测每个实例是否真实存在的置信度分数。</p>\n</li>\n</ol>\n<p><strong>实例头聚合（Eq.2）。</strong> 对于类别 \\(c\\) 的 \\(K\\) 个实例掩码，采用加权最大值选择策略进行聚合：</p>\n<p>$$P_{\\text{agg}}^{(c)}(h, w) = P_{\\text{inst}}^{(c, k^*)}(h, w), \\quad k^* = \\arg\\max_k \\left[ P_{\\text{pres}}^{(c,k)} \\cdot P_{\\text{inst}}^{(c,k)}(h, w) \\right]$$</p>\n<div class=\"key-point\">💡 <strong>关键直觉：</strong> 对每个像素位置，选择\"存在置信度 × 掩码概率\"最大的那个实例。这既利用了实例头的精确边界，又通过存在头过滤了虚假实例。</div>\n<p><strong>像素级最大值融合（Eq.3）。</strong> 将语义头和聚合后的实例头进行逐像素融合：</p>\n<p>$$P_{\\text{fused}}^{(c)}(h, w) = \\max\\left(P_{\\text{sem}}^{(c)}(h, w),\\; P_{\\text{agg}}^{(c)}(h, w)\\right)$$</p>\n<div class=\"key-point\">💡 <strong>为什么用 max 而非 mean？</strong> 语义头和实例头各有擅长的区域——语义头在大面积均匀区域表现好，实例头在边界和小目标处更准确。取最大值可以让每个像素自动选择更自信的那个头的预测，避免平均操作稀释高置信度预测。</div>\n<p><strong>存在头门控（Eq.4）。</strong> 最后利用存在头的置信度对融合结果进行门控过滤：</p>\n<p>$$P_{\\text{final}}^{(c)}(h, w) = \\begin{cases} P_{\\text{fused}}^{(c)}(h, w), & \\text{if } \\max_k P_{\\text{pres}}^{(c,k)} > \\tau_{\\text{pres}} \\\\ 0, & \\text{otherwise} \\end{cases}$$</p>\n<p>这一步的作用是抑制 SAM 3 对不存在类别的虚假激活——如果存在头认为某个类别在图中不存在，则直接将该类别的所有像素概率置零。</p>\n<p><strong>阶段二：实例解耦与匹配（Instance Decoupling &amp; Matching）</strong></p>\n<p>获得双时相的语义分割图 \\(M_{t_1}\\) 和 \\(M_{t_2}\\) 后，需要识别哪些区域发生了变化。OmniOVCD 采用<strong>实例级</strong>而非像素级的比较策略：</p>\n<p><strong>步骤 1：连通域分析。</strong> 对每个类别 \\(c\\)，分别在 \\(M_{t_1}\\) 和 \\(M_{t_2}\\) 上执行 8-连通域分析，将连续的同类像素区域提取为独立的实例掩码集合 \\(\\{I_{t_1}^{(c,i)}\\}\\) 和 \\(\\{I_{t_2}^{(c,j)}\\}\\)。</p>\n<p><strong>步骤 2：双向重叠率匹配（Eq.5）。</strong> 对于 \\(t_1\\) 中的每个实例 \\(I_{t_1}^{(c,i)}\\)，计算其与 \\(t_2\\) 中所有同类实例的 IoU：</p>\n<p>$$\\text{IoU}(I_{t_1}^{(c,i)}, I_{t_2}^{(c,j)}) = \\frac{|I_{t_1}^{(c,i)} \\cap I_{t_2}^{(c,j)}|}{|I_{t_1}^{(c,i)} \\cup I_{t_2}^{(c,j)}|}$$</p>\n<p>若存在某个 \\(j\\) 使得 \\(\\text{IoU} > \\tau_{\\text{match}}\\)，则认为该实例在两个时相中均存在（未变化）；否则标记为<strong>变化实例</strong>。</p>\n<p><strong>步骤 3：双向执行（Eq.6）。</strong> 上述匹配从 \\(t_1 \\to t_2\\) 和 \\(t_2 \\to t_1\\) 两个方向分别执行，取并集作为最终变化掩码：</p>\n<p>$$\\text{ChangeMask} = \\text{Unmatched}(t_1 \\to t_2) \\cup \\text{Unmatched}(t_2 \\to t_1)$$</p>\n<div class=\"key-point\">💡 <strong>实例级匹配的优势：</strong> 像素级比较（如直接对比 \\(M_{t_1}\\) 和 \\(M_{t_2}\\)）对分类噪声极其敏感——单个像素的误分类就会产生虚假变化。而实例级匹配通过连通域聚合，将噪声的影响限制在局部，同时保持了变化目标的完整形状和边界。消融实验证实，实例匹配策略比像素级比较（PMC）在 LEVIR-CD 上高出约 3.5 个 IoU 点。</div>\n<h5>与传统方法的关键区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>传统流水线方法 (DynamicEarth)</th>\n<th>OmniOVCD</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>模型数量</td>\n<td>2-3 个（SAM2 + DINOv2 + SegEarth-OV）</td>\n<td>1 个（SAM 3）</td>\n</tr>\n<tr>\n<td>特征空间</td>\n<td>多模型异构特征需对齐</td>\n<td>统一特征空间，天然一致</td>\n</tr>\n<tr>\n<td>变化检测粒度</td>\n<td>像素级差异比较</td>\n<td>实例级解耦匹配</td>\n</tr>\n<tr>\n<td>推理效率</td>\n<td>高显存、低速度</td>\n<td>最低显存、最快速度</td>\n</tr>\n<tr>\n<td>误差传播</td>\n<td>级联累积</td>\n<td>单模型端到端</td>\n</tr>\n</tbody>\n</table></div>\n<h5>实验结果亮点</h5>\n<p>在四大遥感变化检测基准上的表现（IoU / F1）：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>数据集</th>\n<th>DynamicEarth (最佳配置)</th>\n<th>OmniOVCD</th>\n<th>提升</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>LEVIR-CD</td>\n<td>63.3 / 77.5</td>\n<td><strong>67.2 / 80.4</strong></td>\n<td>+3.9</td>\n</tr>\n<tr>\n<td>WHU-CD</td>\n<td>52.1 / 68.5</td>\n<td><strong>66.5 / 79.9</strong></td>\n<td>+14.4</td>\n</tr>\n<tr>\n<td>S2Looking</td>\n<td>20.7 / 34.3</td>\n<td><strong>24.5 / 39.4</strong></td>\n<td>+3.8</td>\n</tr>\n<tr>\n<td>SECOND (class-avg)</td>\n<td>21.2</td>\n<td><strong>27.1</strong></td>\n<td>+5.9</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 <strong>WHU-CD 上 +14.4 IoU 的巨大提升</strong>说明传统流水线方法在建筑物密集场景中的误差累积问题尤为严重，而 OmniOVCD 的统一架构有效避免了这一问题。</div>\n<p>消融实验的关键发现：\n- <strong>语义头融合至关重要</strong>：移除语义头后 IoU 下降约 14 个点，表明语义头提供了不可替代的全局语义信息\n- <strong>存在头门控有效</strong>：移除后 IoU 下降 1-3 个点，主要作用是抑制虚假类别激活\n- <strong>实例匹配 &gt;&gt; 像素比较</strong>：实例匹配策略在所有数据集上均优于像素级比较（PMC）、\\(L_1\\) 距离和 \\(L_2\\) 距离方法\n- <strong>\\(\\tau_{\\text{match}} = 0.5\\) 最优</strong>：过低的阈值导致漏检，过高的阈值导致误检</p>",
      "quiz": {
        "q": "OmniOVCD 的 SFID 策略中，协同掩码融合阶段使用像素级最大值（max）而非均值（mean）融合语义头和实例头输出的主要原因是什么？",
        "options": [
          "max 操作的计算复杂度更低，有利于实时推理",
          "max 操作可以让每个像素自动选择更自信的头的预测，避免均值稀释高置信度结果",
          "mean 操作会导致梯度消失，无法进行反向传播训练",
          "max 操作能够增加输出的类别多样性，覆盖更多变化类型"
        ],
        "answer": 1,
        "explain": "语义头和实例头在不同区域各有优势（语义头擅长大面积区域，实例头擅长边界），取最大值让每个像素自动采用更自信的预测，而均值会稀释高置信度区域的预测质量。"
      }
    },
    {
      "id": "rein_plus",
      "num": 26,
      "name": "Rein++",
      "fullName": "强化++ (Rein++)",
      "year": "2026",
      "org": "多机构",
      "parent": "sam",
      "paperUrl": "https://ieeexplore.ieee.org/abstract/document/11477127/",
      "projectUrl": "",
      "category": "frontier",
      "motivation": "VFM高效微调域泛化框架",
      "summary": "Rein++ 提出基于可学习 token 的参数高效微调策略（Rein-G 用于域泛化，Rein-A 用于无监督域适应），仅需冻结骨干网络 1% 的额外参数即可在语义分割任务中超越全参数微调，并通过 SAM 辅助的语义知识迁移进一步提升跨域适应能力。",
      "keyPoints": [
        "<strong>Rein 核心机制</strong>：在冻结 VFM 的每一层之间嵌入可学习 token 集合 \\(T_i \\in \\mathbb{R}^{m \\times c}\\)，通过注意力机制生成逐层特征修正 \\(\\Delta f_i\\)",
        "<strong>实例级特征精炼</strong>：利用 token-to-feature 相似度图实现对单张图像中不同类别实例的差异化特征调整",
        "<strong>Token-Instance 链接</strong>：通过 DETR 风格的 object query 将 token 隐式关联到语义实例，增强分割精度",
        "<strong>层共享 MLP 权重</strong>：所有层共享 MLP 参数，配合低秩 token 序列，将可训练参数压缩至骨干的 ~1%",
        "<strong>Rein-G（域泛化）</strong>：仅在合成数据上训练，无需访问真实目标域数据即可泛化",
        "<strong>Rein-A（域适应）</strong>：扩展至 UDA 场景，引入实例级和 logit 级对齐策略，以及基于 SAM 的语义知识迁移",
        "<strong>SOTA 性能</strong>：GTAV→Cityscapes 达到 68.1% mIoU（域泛化），显著超越此前所有方法"
      ],
      "detail": "<p><img alt=\"Rein 架构示意图\" src=\"https://raw.githubusercontent.com/w1oves/Rein/train/docs/framework.png\" />\n<em>图：Rein 方法总览。可学习 token 嵌入冻结 VFM 各层之间，通过注意力机制生成特征修正量 Δf_i，逐层精炼特征图。</em></p>\n<pre><code class=\"language-python\"># Rein 核心逻辑伪代码\nclass Rein:\n    def __init__(self, num_layers, num_tokens, dim):\n        # 每层一组可学习 token\n        self.tokens = [Parameter(randn(num_tokens, dim)) for _ in range(num_layers)]\n        # 层共享的 MLP\n        self.mlp_T = Linear(dim, dim)  # token 变换\n        self.mlp_f = Linear(dim, dim)  # 特征变换\n        self.mlp_Q = Linear(dim, query_dim)  # query 生成\n\n    def forward(self, f_i, layer_idx):\n        T_i = self.tokens[layer_idx]\n        # Step 1: 计算相似度图 (attention)\n        S_i = softmax(f_i @ T_i.T / sqrt(c), dim=-1)  # [n, m]\n        # Step 2: 排除第一个 token (absorb token)\n        S_used = S_i[:, 1:]       # [n, m-1]\n        T_used = T_i[1:]          # [m-1, c]\n        # Step 3: 初步特征修正\n        delta_f_bar = S_used @ self.mlp_T(T_used)  # [n, c]\n        # Step 4: 最终修正 (残差 + MLP)\n        delta_f = self.mlp_f(delta_f_bar + f_i)    # [n, c]\n        return f_i + delta_f  # 精炼后的特征\n\n    def get_queries(self):\n        # 聚合所有层的 query 用于 decode head\n        Q_all = [self.mlp_Q(T) for T in self.tokens]\n        Q_max = element_wise_max(Q_all)\n        Q_avg = element_wise_mean(Q_all)\n        Q = concat([Q_max, Q_avg, Q_all[-1]]) @ W_Q\n        return Q\n</code></pre>\n<p><strong>动机与背景</strong></p>\n<p>传统域泛化语义分割（DGSS）方法依赖于数据增强、风格迁移等技术来提升模型的跨域泛化能力，但受限于 CNN 骨干网络的表征能力。随着 DINOv2、SAM、EVA02 等视觉基础模型（VFM）的出现，研究者发现<strong>直接冻结 VFM 骨干 + 简单 decode head 就能超越所有先前 DGSS 方法</strong>（如 DINOv2-L 在 GTAV→Cityscapes 上达到 63.3% mIoU，远超此前 SOTA 的 47.6%）。</p>\n<p>然而，VFM 参数量巨大（如 ViT-L 有 300M+ 参数），全参数微调不仅计算代价高，还会破坏预训练获得的泛化表征。Rein 的核心动机是：<strong>用极少的可训练参数高效引导冻结的 VFM 生成任务特定的特征</strong>。</p>\n<p><strong>核心机制详解</strong></p>\n<p><strong>1. 特征精炼（Feature Refinement）</strong></p>\n<p>对于冻结 VFM 第 \\(i\\) 层输出的特征图 \\(f_i \\in \\mathbb{R}^{n \\times c}\\)，Rein 生成修正量：</p>\n<p>$$f_{i+1} = L_{i+1}(f_i + \\Delta f_i), \\quad \\Delta f_i = \\text{Rein}(f_i)$$</p>\n<p>这里 \\(\\Delta f_i\\) 的计算分为三步：</p>\n<p><strong>Step 1 - 相似度计算</strong>：通过 token 与特征的点积生成注意力图：</p>\n<p>$$S_i = \\text{Softmax}\\left(\\frac{f_i \\cdot T_i^\\top}{\\sqrt{c}}\\right) \\in \\mathbb{R}^{n \\times m}$$</p>\n<p><strong>Step 2 - 初步修正</strong>：利用相似度加权 token 值（排除第 1 个吸收 token）：</p>\n<p>$$\\Delta\\bar{f_i} = S_i(:, 2\\!:\\!m) \\times [T_i(2\\!:\\!m) \\cdot W_T + b_T]$$</p>\n<div class=\"key-point\">💡 <strong>关键设计</strong>：第 1 个 token 作为\"吸收 token\"（absorb token），用于处理没有对应语义类别的 patch。由于 softmax 归一化，排除该 token 后每行的权重和在 [0,1] 之间，避免对无关 patch 产生错误修正。</div>\n<p><strong>Step 3 - 最终修正</strong>：加入残差连接并通过 MLP 变换：</p>\n<p>$$\\Delta f_i = (\\Delta\\bar{f_i} + f_i) \\times W_f + b_f$$</p>\n<p><strong>2. Token-Instance 链接</strong></p>\n<p>Rein 将 token 通过线性变换映射为 DETR 风格的 object query：</p>\n<p>$$Q_i = T_i \\times W_Q + b_Q, \\quad Q_i \\in \\mathbb{R}^{m \\times c'}$$</p>\n<p>多层 query 通过 max/avg 聚合后送入 Mask2Former decode head：</p>\n<p>$$Q = \\text{Concat}([Q_{\\max}, Q_{\\text{avg}}, Q_N]) \\times W_Q + b_Q$$</p>\n<p>这使得每个 token 隐式对应一个语义实例，decode head 可直接利用这些 query 进行 mask 预测。</p>\n<p><strong>3. 参数效率设计</strong></p>\n<ul>\n<li><strong>层共享 MLP</strong>：\\(W_T, W_f, W_Q\\) 在所有 \\(N\\) 层间共享，由 token \\(T_i\\) 本身提供层间差异</li>\n<li><strong>低秩 token</strong>：\\(T_i = A_i \\times B\\)，其中 \\(A_i \\in \\mathbb{R}^{m \\times r}, B \\in \\mathbb{R}^{r \\times c}\\)，\\(r \\ll c\\)，进一步压缩参数</li>\n</ul>\n<div class=\"warn-box\">⚠️ <strong>对比 LoRA</strong>：Rein 不修改 VFM 内部权重，而是在层间插入特征修正模块。这保留了 VFM 原始表征的完整性，同时通过 instance-aware 的修正实现任务适配。</div>\n<p><strong>4. Rein++ 扩展：Rein-A（域适应）</strong></p>\n<p>Rein++ 将 Rein 从域泛化扩展到无监督域适应（UDA）场景：</p>\n<ul>\n<li><strong>实例级对齐</strong>：利用 token 的实例关联性，在源域和目标域之间进行实例级特征对齐</li>\n<li><strong>Logit 级对齐</strong>：对分割预测的 logit 分布进行跨域一致性约束</li>\n<li><strong>SAM 语义迁移</strong>：利用 SAM 的类无关分割能力，将目标域的结构信息迁移为语义监督信号</li>\n</ul>\n<p><strong>与传统方法的区别</strong></p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法类型</th>\n<th>代表工作</th>\n<th>可训练参数</th>\n<th>GTAV→Citys mIoU</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>传统 DGSS</td>\n<td>TLDR (ICCV'23)</td>\n<td>全部骨干</td>\n<td>47.6%</td>\n</tr>\n<tr>\n<td>冻结 VFM + Head</td>\n<td>DINOv2-L</td>\n<td>仅 Head</td>\n<td>63.3%</td>\n</tr>\n<tr>\n<td><strong>Rein (Ours)</strong></td>\n<td>DINOv2-L + Rein</td>\n<td><strong>骨干 1%</strong></td>\n<td><strong>68.1%</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p>Rein 以极少参数超越了全参数微调和纯冻结方案，证明了\"精准引导优于暴力调参\"的设计哲学。</p>",
      "quiz": {
        "q": "Rein 中第一个 token 被排除在特征修正计算之外的主要原因是什么？",
        "options": [
          "减少计算量，加速推理",
          "作为吸收 token，使无对应类别的 patch 修正量趋近于零",
          "存储全局上下文信息供 decode head 使用",
          "防止梯度消失，稳定训练过程"
        ],
        "answer": 1,
        "explain": "排除第一个 token 后，softmax 归一化的剩余权重和可以小于 1，使得没有匹配语义类别的 patch 获得接近零的修正量，避免错误修改。"
      }
    },
    {
      "id": "omnisegmentor",
      "num": 27,
      "name": "Omnisegmentor",
      "fullName": "全能分割器 (Omnisegmentor)",
      "year": "2026",
      "org": "多机构",
      "parent": "mask2former",
      "paperUrl": "https://proceedings.neurips.cc/paper_files/paper/2025/hash/d1fa901403156f5d31b1cad964d78006-Abstract-Conference.html",
      "projectUrl": "",
      "category": "frontier",
      "motivation": "多模态灵活学习鲁棒分割",
      "summary": "Omnisegmentor 的核心目标是：多模态灵活学习鲁棒分割。",
      "keyPoints": [
        "核心动机：多模态灵活学习鲁棒分割",
        "演化来源：继承或改进自 mask2former",
        "代表机构：多机构"
      ],
      "detail": "<p>多模态灵活学习鲁棒分割</p>"
    },
    {
      "id": "text4seg_plus",
      "num": 28,
      "name": "Text4seg++",
      "fullName": "文本分割++ (Text4seg++)",
      "year": "2026",
      "org": "多机构",
      "parent": "segformer",
      "paperUrl": "https://ieeexplore.ieee.org/abstract/document/11479916/",
      "projectUrl": "",
      "category": "frontier",
      "motivation": "生成式语言建模图像分割",
      "summary": "Text4Seg 提出了 **text-as-mask** 范式，将图像分割重新定义为文本生成问题：用 \\(16 \\times 16\\) 的语义描述符（Semantic Descriptors）将分割掩码编码为纯文本序列，并通过行级游程编码（R-RLE）压缩 74% 的 token 长度、提速 3 倍，使任意多模态大语言模型（MLLM）无需任何架构修改即可执行分割任务，在 refCOCO 系列等基准上达到 SOTA。",
      "keyPoints": [
        "<strong>text-as-mask 范式</strong>：将分割掩码表示为纯文本语义描述符序列，完全复用 MLLM 的 next-token prediction 能力",
        "<strong>语义描述符（Semantic Descriptors）</strong>：将图像划分为 \\(16 \\times 16 = 256\\) 个 patch，每个 patch 映射到对应的语义标签文本（如 \"sky\"、\"brown dog\"）",
        "<strong>行级游程编码（R-RLE）</strong>：在每行内对相邻重复标签做 Run-Length Encoding，行间用 <code>\\n</code> 分隔，token 长度从 583 降至 154（压缩 74%），推理速度提升 3 倍，且无性能损失",
        "<strong>零架构修改</strong>：通过 LoRA 微调即可将分割能力注入 LLaVA-1.5、Qwen-VL、DeepseekVL、InternVL2 等多种 MLLM",
        "<strong>可选 SAM 精炼器</strong>：推理时可用 SAM 将粗糙的 \\(16 \\times 16\\) 掩码上采样为像素级精细掩码，cIoU 从 73.5 提升至 79.3",
        "<strong>多任务验证</strong>：在 Referring Expression Segmentation（refCOCO/+/g）、Generalized RES（gRefCOCO）、语义分割、开放词汇分割等任务上均取得 SOTA 或有竞争力的结果",
        "<strong>训练数据构建</strong>：利用现有分割数据集的 \\(\\langle\\text{image, mask}\\rangle\\) 对，将 mask 下采样到 \\(16 \\times 16\\) 后替换索引为文本标签，嵌入 query-response 模板进行 SFT"
      ],
      "detail": "<h5>核心框架图</h5>\n<p><img alt=\"Text4Seg 整体框架\" src=\"https://ar5iv.labs.arxiv.org/html/2410.09855/assets/x3.png\" />\n<em>图：语义描述符的构建过程与两种压缩策略（Full-length → I-RLE → R-RLE）的对比示意。图像被划分为 \\(16 \\times 16\\) 的 patch 网格，每个 patch 用语义标签替代，再通过 R-RLE 进行行级压缩。</em></p>\n<p><img alt=\"Text4Seg 与 MLLM 集成\" src=\"https://ar5iv.labs.arxiv.org/html/2410.09855/assets/x5.png\" />\n<em>图：Text4Seg 无缝集成到现有 MLLM 架构中。输入为图像 + 文本指令，输出为纯文本格式的语义描述符，可直接由 MLLM 的文本解码器生成。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># Text4Seg: 语义描述符构建 + R-RLE 编码 + 推理流程\n\n# === 阶段 1: 训练数据构建 ===\ndef build_semantic_descriptors(image, mask, label_map):\n    &quot;&quot;&quot;将 &lt;image, mask&gt; 对转换为语义描述符文本&quot;&quot;&quot;\n    # Step 1: 将 mask 下采样到 16×16\n    mask_16x16 = resize(mask, (16, 16), mode='nearest')  # [16, 16]\n\n    # Step 2: 将每个 patch 的类别索引替换为文本标签\n    descriptors = []\n    for row in range(16):\n        row_labels = []\n        for col in range(16):\n            class_id = mask_16x16[row, col]\n            row_labels.append(label_map[class_id])  # e.g., &quot;sky&quot;, &quot;sand&quot;\n        descriptors.append(row_labels)\n\n    # Step 3: 应用 R-RLE 压缩（行级游程编码）\n    compressed = apply_r_rle(descriptors)\n    return compressed\n\ndef apply_r_rle(descriptors):\n    &quot;&quot;&quot;Row-wise Run-Length Encoding&quot;&quot;&quot;\n    rows = []\n    for row_labels in descriptors:\n        encoded = []\n        i = 0\n        while i &lt; len(row_labels):\n            label = row_labels[i]\n            count = 1\n            while i + count &lt; len(row_labels) and row_labels[i + count] == label:\n                count += 1\n            if count &gt; 1:\n                encoded.append(f&quot;{label}*{count}&quot;)  # e.g., &quot;sky*5&quot;\n            else:\n                encoded.append(label)\n            i += count\n        rows.append(&quot; | &quot;.join(encoded))\n    return &quot; \\\\n &quot;.join(rows)  # 行间用 \\n 分隔\n\n# === 阶段 2: 训练（LoRA SFT）===\n# Query:  &lt;IMAGE&gt; Can you segment the {text_labels} in the image?\n# Response: The result is: \\n &lt;seg&gt; {semantic_descriptors} &lt;/seg&gt;.\n# 使用 MLLM 原始自回归损失 L_txt 训练，LoRA rank=64\n\n# === 阶段 3: 推理 ===\ndef inference(image, query, mllm, sam_refiner=None):\n    # Step 1: MLLM 生成语义描述符文本\n    text_output = mllm.generate(image, query)\n\n    # Step 2: 解码 R-RLE → 16×16 粗糙掩码\n    coarse_mask = decode_r_rle(text_output)  # [16, 16]\n\n    # Step 3: (可选) SAM 精炼为像素级掩码\n    if sam_refiner:\n        fine_mask = sam_refiner(image, prompt=coarse_mask)\n        return fine_mask\n    else:\n        return resize(coarse_mask, image.shape[:2])\n</code></pre>\n<h5>方法深入解析</h5>\n<p><strong>1. 动机与背景：为什么需要 text-as-mask？</strong></p>\n<p>现有将分割能力引入 MLLM 的方法主要有两条路线，但都存在明显缺陷：</p>\n<ul>\n<li><strong>embedding-as-mask</strong>（如 LISA）：在 LLM 输出中插入特殊 <code>&lt;seg&gt;</code> token，将其隐藏向量送入额外的 SAM 解码器生成掩码。问题在于需要额外的分割解码器和对应的损失函数，增加了架构复杂度，限制了模型的可扩展性。</li>\n<li><strong>坐标序列方法</strong>（如 VisionLLM）：用多边形顶点坐标序列表示分割结果。但多边形坐标难以精确描述复杂形状，且在语义分割等密集预测任务上表现不佳。</li>\n</ul>\n<p>Text4Seg 的核心洞察是：<strong>既然 MLLM 本质上是文本生成器，那么最自然的方式就是让分割结果本身成为文本</strong>。这就是 text-as-mask 范式的由来——将分割掩码编码为一段可由 LLM 直接生成的文本序列。</p>\n<div class=\"key-point\">💡 <strong>关键洞察</strong>：ViT 已经证明图像可以用 \\(16 \\times 16\\) 的 patch token 表示。Text4Seg 进一步将每个 patch token 替换为人类可读的语义标签文本，使得分割掩码成为 LLM 的\"母语\"。</div>\n<p><strong>2. 语义描述符的设计</strong></p>\n<p>语义描述符的构建过程如下：</p>\n<ol>\n<li>将输入图像划分为 \\(16 \\times 16 = 256\\) 个 patch（与 ViT 的 patch 划分一致）</li>\n<li>对每个 patch，根据其对应区域的 ground truth 掩码确定语义标签</li>\n<li>将 256 个标签按光栅扫描顺序排列为一维序列</li>\n</ol>\n<p>每个描述符可以是：\n- <strong>简单标签</strong>：如 \"sky\"、\"sand\"（语义分割）\n- <strong>短语</strong>：如 \"brown dog\"、\"black dog\"（实例区分）\n- <strong>复杂描述</strong>：如 \"a dog in the left\"（推理分割）</p>\n<p>这种设计的优势在于：\n- 完全符合 MLLM 的 next-token prediction 训练范式\n- 不需要任何架构修改（无额外解码器、无新 token embedding）\n- 语义标签本身携带丰富的语义信息，有助于 LLM 理解</p>\n<p><strong>3. R-RLE 压缩：平衡效率与空间信息</strong></p>\n<p>全长 256 个语义描述符在 refCOCO 数据集上平均产生 583 个 token，单次推理需约 19 秒（V100 GPU）。为解决这一效率瓶颈，论文探索了两种游程编码策略：</p>\n<p><strong>Image-wise RLE (I-RLE)</strong>：对整个 256 长度序列直接做 RLE。虽然压缩率高，但会破坏二维空间结构信息，导致显著的性能下降（refCOCO cIoU 从 74.2 降至 70.4）。</p>\n<p><strong>Row-wise RLE (R-RLE)</strong>：在每行 16 个 patch 内独立做 RLE，行间用 <code>\\n</code> 分隔符保持二维结构。这一设计的关键在于：</p>\n<p>$$\\text{R-RLE}(\\mathbf{M}) = \\text{RLE}(\\text{row}_1) \\; \\backslash n \\; \\text{RLE}(\\text{row}_2) \\; \\backslash n \\; \\cdots \\; \\backslash n \\; \\text{RLE}(\\text{row}_{16})$$</p>\n<p>其中每行的 RLE 将连续相同标签合并为 <code>label*count</code> 格式。</p>\n<div class=\"warn-box\">⚠️ <strong>关键对比</strong>：I-RLE 将 2D 掩码压缩为 1D 序列时丢失了行边界信息，而 R-RLE 通过 <code>\\n</code> 分隔符显式保留了行结构，使 LLM 能够\"感知\"空间布局。实验证明 R-RLE 在压缩 74% token 的同时完全不损失性能。</div>\n<p><strong>4. 训练与推理流程</strong></p>\n<p><strong>训练</strong>：采用 LoRA（rank=64）对 MLLM 进行监督微调（SFT），使用标准自回归语言建模损失：</p>\n<p>$$\\mathcal{L}_{txt} = -\\sum_{t=1}^{T} \\log P_\\theta(y_t \\mid y_{<t}, \\mathbf{x}_{img}, \\mathbf{x}_{query})$$</p>\n<p>其中 \\(y_t\\) 是语义描述符序列中的第 \\(t\\) 个 token，\\(\\mathbf{x}_{img}\\) 和 \\(\\mathbf{x}_{query}\\) 分别是图像和文本查询。</p>\n<p>与 LISA 等方法不同，Text4Seg <strong>不需要</strong>先在大规模混合数据集上做 Continued Pre-Training（CPT），而是直接在下游任务数据上 SFT，大幅简化了训练流程。</p>\n<p><strong>推理</strong>：MLLM 生成语义描述符文本 → 解码 R-RLE 得到 \\(16 \\times 16\\) 粗糙掩码 → （可选）SAM 精炼为像素级掩码。SAM 精炼器以粗糙掩码作为 prompt，几乎不增加推理时间（从 5.34s 到 5.92s），但 cIoU 从 73.5 提升至 79.3。</p>\n<p><strong>5. 与现有方法的对比</strong></p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>LISA (embedding-as-mask)</th>\n<th>VisionLLM (坐标序列)</th>\n<th><strong>Text4Seg (text-as-mask)</strong></th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>额外解码器</td>\n<td>需要 SAM 解码器</td>\n<td>不需要</td>\n<td><strong>不需要</strong></td>\n</tr>\n<tr>\n<td>架构修改</td>\n<td>需要</td>\n<td>需要</td>\n<td><strong>不需要</strong></td>\n</tr>\n<tr>\n<td>输出格式</td>\n<td>隐藏向量 → 掩码</td>\n<td>多边形坐标</td>\n<td><strong>纯文本</strong></td>\n</tr>\n<tr>\n<td>密集分割</td>\n<td>✓</td>\n<td>✗（坐标不适合）</td>\n<td><strong>✓</strong></td>\n</tr>\n<tr>\n<td>MLLM 通用性</td>\n<td>仅 LLaVA</td>\n<td>有限</td>\n<td><strong>LLaVA/Qwen-VL/DeepseekVL/InternVL2</strong></td>\n</tr>\n<tr>\n<td>训练方式</td>\n<td>CPT + SFT</td>\n<td>CPT + SFT</td>\n<td><strong>仅 SFT</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>6. 关键实验结果</strong></p>\n<ul>\n<li><strong>Referring Expression Segmentation</strong>（refCOCO/+/g）：Text4Seg 基于 InternVL2-8B 达到 75.4 avg cIoU，基于 LLaVA-1.5-13B 达到 76.2 avg cIoU，均超越 Groundhog（74.2）和 GSVA（71.4）</li>\n<li><strong>Generalized RES</strong>（gRefCOCO）：Text4Seg 基于 InternVL2-8B 达到 71.1 avg，显著超越 LISA（62.9）和 GSVA（65.6）</li>\n<li><strong>消融实验</strong>：</li>\n<li>分辨率：\\(16^2\\) + SAM 已达最优，\\(32^2\\) 无 SAM 时 cIoU 为 71.4（vs \\(16^2\\) 的 67.5）</li>\n<li>R-RLE vs I-RLE：R-RLE 保持 74.2 cIoU，I-RLE 降至 70.4（refCOCO）</li>\n<li>SAM 变体：ViT-L 与 ViT-H 性能接近（79.1 vs 79.3），但更快</li>\n</ul>",
      "quiz": {
        "q": "Text4Seg 中 R-RLE 相比 I-RLE 的核心优势是什么？",
        "options": [
          "R-RLE 的压缩率更高，能将 token 数量减少 90% 以上",
          "R-RLE 通过行分隔符保留了二维空间结构信息，避免了性能下降",
          "R-RLE 使用了更复杂的熵编码算法，信息损失更小",
          "R-RLE 不需要特殊分隔符，直接兼容所有 LLM 的 tokenizer"
        ],
        "answer": 1,
        "explain": "I-RLE 对整个序列做游程编码会破坏行边界的空间信息，导致 cIoU 下降约 4 个点。R-RLE 在每行内独立编码并用 \\n 分隔行，显式保留了二维结构，在压缩 74% token 的同时完全不损失分割性能。"
      }
    }
  ],
  "categories": {
    "foundation": {
      "label": "奠基算法",
      "color": "#22a06b"
    },
    "core": {
      "label": "核心改进",
      "color": "#5b63d3"
    },
    "unified": {
      "label": "统一架构",
      "color": "#e8820c"
    },
    "frontier": {
      "label": "前沿进展",
      "color": "#d32f2f"
    }
  },
  "projectUrls": {}
};
