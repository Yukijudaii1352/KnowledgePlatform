/**
 * image_classification-data.js — 由 pipeline/build.py 于 2026-06-15 09:55:52 自动生成。
 * 源文件：content/cv/image_classification.md
 * ⚠️  请勿手动修改；如需更新，修改源文档后重新编译。
 */
window.PAGE_CONFIG = {
  "meta": {
    "domain": "cv",
    "topic_id": "image_classification",
    "topic_name": "图像分类",
    "page_title": "图像分类算法演进",
    "page_subtitle": "2026-06-15 版",
    "page_desc": "从AlexNet开启的深度学习时代，经历ResNet残差革命、ViT注意力范式，到ConvNeXt现代CNN复兴与2026年高效状态空间模型的融合探索",
    "page_icon": "🖼️",
    "hero_pills": [
      "CNN深化 · 注意力机制 · Transformer革命",
      "架构融合 · 高效推理 · 多模态感知"
    ],
    "count_pill": "{count} 个算法",
    "image_base": "",
    "overview_from_doc": true,
    "latest_overview_from_doc": true
  },
  "overview": [
    {
      "title": "",
      "body_html": "<h1>卷积网络（视觉模型）发展史：从 CNN 到 Vision Transformer，再到视觉 Mamba 的主干演化全景图</h1>\n<ul>\n<li>来源平台: <strong>zhihu</strong>（知乎专栏文章）</li>\n<li>原文链接: <a href=\"https://zhuanlan.zhihu.com/p/2027708778305299183\">https://zhuanlan.zhihu.com/p/2027708778305299183</a></li>\n<li>作者: 建模先锋</li>\n</ul>\n<hr />\n<p>卷积网络（视觉模型）发展史：从 CNN 到 Vision Transformer，再到视觉 Mamba 的主干演化全景图</p>\n<h1>卷积网络（视觉模型）发展史：从 CNN 到 Vision Transformer，再到视觉 Mamba 的主干演化全景图</h1>\n<p>作者: 建模先锋, 赞: 38</p>\n<p>做故障诊断、时间序列预测，你是不是还默认把 ResNet 当成第一选择？<br />\n这当然没错。ResNet 经典、稳定、好用，到今天依然是很多工业场景里的强基线。</p>\n<p>但问题是：<br />\n如果你的模型认知还停留在 ResNet，那你看到的，只是视觉网络发展史中的一小段。</p>\n<p>如果把现代计算机视觉的发展压缩成一条主线，那么最值得反复回看的，不是某一个单独模型，而是<strong>视觉主干网络（backbone）如何一步步演化</strong>：从早期卷积网络建立“局部感受野 + 参数共享 + 层级特征”的视觉归纳偏置，到 ImageNet 时代把 CNN 推上主舞台，再到 Transformer 打开新的视觉建模范式，最后进入卷积、注意力、状态空间模型并行发展的新阶段。</p>\n<p><img alt=\"\" src=\"https://pica.zhimg.com/v2-377f15197da9bc2de7ee69abf33b0fc2_1440w.jpg\" /></p>\n<p>卷积网络的根本价值，不只是“能做图像分类”，而是它把视觉任务中最核心的结构性先验直接写进了模型：<strong>局部感受野、参数共享、层级特征提取、一定程度的平移鲁棒性</strong>。这类归纳偏置让它在图像领域天然比纯全连接结构更高效。早期的 Neocognitron 已经体现了这种思想，而 LeNet-5 则把它真正落成了可通过反向传播训练的工程系统。</p>\n<p>如果从历史演进看，视觉 backbone 大致经历了五个阶段：<br />\n<strong>思想原型期</strong>（Neocognitron/LeNet）→ <strong>深度学习复兴期</strong>（AlexNet/ZFNet/VGG）→ <strong>结构成熟期</strong>（GoogLeNet/ResNet/DenseNet）→ <strong>高效化与注意力增强期</strong>（SENet/MobileNet/EfficientNet）→ T<strong>ransformer 与后 Transformer 时期</strong>（ViT/Swin/ConvNeXt/VMamba 等）。这个脉络，基本就是过去二十多年视觉模型发展的主轴。</p>\n<h2><strong>1 Neocognitron：卷积网络思想的源头</strong></h2>\n<p>（1）论文题目：Neocognitron: A Self-Organizing Neural Network Model for a Mechanism of Pattern Recognition Unaffected by Shift in Position（1980）</p>\n<p><img alt=\"\" src=\"https://pic3.zhimg.com/v2-c322a7684f1aea7ed418ad2cdbc58742_1440w.jpg\" /></p>\n<p>（2）模型简介：</p>\n<p>Neocognitron 并不是现代深度学习框架下的 CNN，但它非常重要，因为它最早系统化地提出了<strong>分层感受野、局部连接、位置鲁棒性</strong>这类思想。后来的卷积网络很多基本设计，都能在这里找到原型。它更像是“卷积网络的思想起点”，而不是今天工程意义上的可训练标准模型。</p>\n<p>核心思想：用层级结构逐步抽取局部模式，并让模型对位移具有一定鲁棒性。</p>\n<p>（3）论文链接：</p>\n<p><em><a href=\"https://link.zhihu.com/?target=https%3A//link.springer.com/article/10.1007/BF00344251\">https://link.springer.com/article/10.1007/BF00344251</a></em></p>\n<p>开源代码：</p>\n<p><em><a href=\"https://link.zhihu.com/?target=https%3A//github.com/lcpo/neocognitron\">https://github.com/lcpo/neocognitron</a></em></p>\n<h2><strong>2 LeNet-5：现代 CNN 的工程起点</strong></h2>\n<p>（1）论文题目：Gradient-Based Learning Applied to Document Recognition（1998）</p>\n<p><img alt=\"\" src=\"https://pic3.zhimg.com/v2-edee2bb9e8c63cc1794a1842a3b5c708_1440w.jpg\" /></p>\n<p>（2）模型简介：</p>\n<p>LeNet-5 是现代卷积网络真正意义上的起点。它把卷积层、下采样层和全连接层组合成一个端到端可训练系统，主要用于手写数字识别。今天回看，LeNet 很小、很浅，但它定义了后来 CNN 的基本流水线。</p>\n<p>核心思想：用卷积提取局部空间特征，用下采样减少分辨率和参数量，最后用全连接完成分类。</p>\n<p>（3）论文链接：</p>\n<p><em><a href=\"https://link.zhihu.com/?target=https%3A//ieeexplore.ieee.org/abstract/document/726791\">https://ieeexplore.ieee.org/abstract/document/726791</a></em></p>\n<p>开源代码：</p>\n<p><em><a href=\"https://link.zhihu.com/?target=https%3A//github.com/0x7dc/LeNet-5\">https://github.com/0x7dc/LeNet-5</a></em></p>\n<h2><strong>3 AlexNet：深度学习复兴的标志</strong></h2>\n<p>（1）论文题目：ImageNet Classification with Deep Convolutional Neural Networks（2012）</p>\n<p><img alt=\"\" src=\"https://pic2.zhimg.com/v2-495c535b40c87739c88ba241f705138b_1440w.jpg\" /></p>\n<p>（2）模型简介：</p>\n<p>AlexNet 的意义不在于“第一个 CNN”，而在于它第一次在大规模 ImageNet 分类上，用深卷积网络显著拉开了与传统方法的差距。ReLU、Dropout、数据增强、GPU 训练，这些今天看来很常规的设计，在 AlexNet 这里被系统组合到一起，直接引爆了深度学习视觉时代。</p>\n<p>核心思想：更深的卷积网络 + 大规模数据 + GPU 加速训练。</p>\n<p>（3）论文链接：</p>\n<p><em><a href=\"https://link.zhihu.com/?target=https%3A//dl.acm.org/doi/epdf/10.1145/3065386\">https://dl.acm.org/doi/epdf/10.1145/3065386</a></em></p>\n<p>开源代码：</p>\n<p><em><a href=\"https://link.zhihu.com/?target=https%3A//github.com/computerhistory/AlexNet-Source-Code\">https://github.com/computerhistory/AlexNet-Source-Code</a></em></p>\n<h2><strong>4 ZFNet：第一次系统解释 CNN 在学什么</strong></h2>\n<p>（1）论文题目：Visualizing and Understanding Convolutional Networks（2013）</p>\n<p><img alt=\"\" src=\"https://pica.zhimg.com/v2-a153bd655dccbc6218904a133c2c266e_1440w.jpg\" /></p>\n<p>（2）模型简介：</p>\n<p>ZFNet 可以看作 AlexNet 的一次结构微调，但它真正的贡献，是通过反卷积可视化解释了卷积网络各层到底在响应什么。这让研究者第一次比较系统地“看见”了 CNN 的中间特征，也推动了后续架构设计更加精细。</p>\n<p>核心思想：通过 deconvnet 可视化中间层特征，同时改进 AlexNet 前层卷积核和步长设置。</p>\n<p>（3）论文链接：</p>\n<p><em><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/1311.2901\">https://arxiv.org/abs/1311.2901</a></em></p>\n<p>开源代码：</p>\n<p><em><a href=\"https://link.zhihu.com/?target=https%3A//github.com/amir-saniyan/ZFNet\">https://github.com/amir-saniyan/ZFNet</a></em></p>\n<h2><strong>5 VGG：把“堆深”做得最整齐的一代网络</strong></h2>\n<p>（1）论文题目：Very Deep Convolutional Networks for Large-Scale Image Recognition（2014）</p>\n<p><img alt=\"\" src=\"https://picx.zhimg.com/v2-ec21fab8007361333da7575913af4001_1440w.jpg\" /></p>\n<p>（2）模型简介：</p>\n<p>VGG 的贡献非常纯粹：<strong>统一使用 3×3 小卷积核，不断加深网络</strong>。它没有 Inception 的复杂分支，也没有 ResNet 的捷径连接，但正因为结构规整，VGG 成了一个时代里最容易理解、最容易做迁移学习的 backbone。</p>\n<p>核心思想：用多个 3×3 卷积堆叠来扩大感受野，同时保持架构统一。</p>\n<p>（3）论文链接：</p>\n<p><em><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/1409.1556\">https://arxiv.org/abs/1409.1556</a></em></p>\n<p>开源代码：</p>\n<p><em><a href=\"https://link.zhihu.com/?target=https%3A//github.com/Prabhu204/Very-Deep-Convolutional-Networks-for-Large-Scale-Image-Recognition\">https://github.com/Prabhu204/Very-Deep-Convolutional-Networks-for-Large-Scale-Image-Recognition</a></em></p>\n<h2><strong>6 GoogLeNet / Inception v1：多尺度分支的开始</strong></h2>\n<p>（1）论文题目：Going Deeper with Convolutions（2015）</p>\n<p><img alt=\"\" src=\"https://pic1.zhimg.com/v2-6cb9691ce54724973abc3fbe2abb1fcc_1440w.jpg\" /></p>\n<p>（2）模型简介：</p>\n<p>GoogLeNet 的关键创新是 <strong>Inception 模块</strong>：在同一层中并行使用 1×1、3×3、5×5 卷积和池化，然后把结果拼接。这等于把“多尺度特征提取”显式写进网络结构中，同时通过 1×1 卷积控制参数量。它标志着 CNN 设计从“单一路径堆深”走向“结构化多分支设计”。</p>\n<p>核心思想：多尺度并行卷积 + 1×1 降维。</p>\n<p>（3）论文链接：</p>\n<p><em><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/1409.4842\">https://arxiv.org/abs/1409.4842</a></em></p>\n<p>开源代码：</p>\n<p><em><a href=\"https://link.zhihu.com/?target=https%3A//github.com/pytorch/vision\">https://github.com/pytorch/vision</a></em></p>\n<h2><strong>7 ResNet：解决“网络越深越难训练”的关键一跳</strong></h2>\n<p>（1）论文题目：Deep Residual Learning for Image Recognition（2016）</p>\n<p><img alt=\"\" src=\"https://picx.zhimg.com/v2-a3f4069885085cdab290a675399b47df_1440w.jpg\" /></p>\n<p>（2）模型简介：</p>\n<p>ResNet 是视觉网络发展史上最重要的论文之一。它提出了残差连接，直接把深网络训练问题从“堆不动”变成“可以继续堆”。很多人记住的是 ResNet-50/101/152，但真正要记住的是这条公式：</p>\n<p>y=F(x)+x</p>\n<p>它让网络学习残差，而不是直接学习完整映射。这个简单改动，极大改善了优化难度。</p>\n<p>核心思想：多shortcut / skip connection，使深层网络更容易优化。</p>\n<p>（3）论文链接：</p>\n<p><em><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/pdf/1512.03385\">https://arxiv.org/pdf/1512.03385</a></em></p>\n<p>开源代码：</p>\n<p><em><a href=\"https://link.zhihu.com/?target=https%3A//github.com/KaimingHe/deep-residual-networks\">https://github.com/KaimingHe/deep-residual-networks</a></em></p>\n<h2><strong>8 DenseNet：把特征复用推到极致</strong></h2>\n<p>（1）论文题目：Densely Connected Convolutional Networks（2017）</p>\n<p><img alt=\"\" src=\"https://pica.zhimg.com/v2-9ca06d90e9ce062adf9780ae27e2f12e_1440w.jpg\" /></p>\n<p>（2）模型简介：</p>\n<p>DenseNet 的思路是：每一层都接收前面所有层的特征，形成密集连接。它的典型表达是：</p>\n<p><img alt=\"\" src=\"https://pica.zhimg.com/v2-95452a7e744b795044da5e9f0810fe74_1440w.jpg\" /></p>\n<p>这里的 [] 表示特征拼接。相比 ResNet 的“相加”，DenseNet 走的是“拼接与复用”。这样做能强化梯度传播和特征复用，也让模型在参数效率上很突出。</p>\n<p>核心思想：层间密集连接，鼓励特征复用，缓解梯度消失。</p>\n<p>（3）论文链接：</p>\n<p><em><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/1608.06993\">https://arxiv.org/abs/1608.06993</a></em></p>\n<p>开源代码：</p>\n<p><em><a href=\"https://link.zhihu.com/?target=https%3A//github.com/liuzhuang13/DenseNet\">https://github.com/liuzhuang13/DenseNet</a></em></p>\n<h2><strong>9 SENet：把“通道注意力”引入主流视觉网络</strong></h2>\n<p>（1）论文题目：Squeeze-and-Excitation Networks（2018）</p>\n<p><img alt=\"\" src=\"https://pic2.zhimg.com/v2-629c2ef324874d45bce1f7063ee3776b_1440w.jpg\" /></p>\n<p>（2）模型简介：</p>\n<p>SENet 的重要性在于，它提出了一个非常轻量但非常有效的模块：SE block。它先对空间维度做全局压缩，再学习通道间依赖关系，最后对通道权重进行重标定。换句话说，它解决的是“哪些通道更重要”这个问题。</p>\n<p>核心思想：显式建模通道关系，进行特征重标定。</p>\n<p>（3）论文链接：</p>\n<p><em><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/1709.01507\">https://arxiv.org/abs/1709.01507</a></em></p>\n<p>开源代码：</p>\n<p><em><a href=\"https://link.zhihu.com/?target=https%3A//github.com/hujie-frank/SENet\">https://github.com/hujie-frank/SENet</a></em></p>\n<h2><strong>10 MobileNetV2：轻量化 CNN 的工程范式</strong></h2>\n<p>（1）论文题目：MobileNetV2: Inverted Residuals and Linear Bottlenecks（2018）</p>\n<p><img alt=\"\" src=\"https://pica.zhimg.com/v2-a11516fa98184e776417f375747a9c6c_1440w.jpg\" /></p>\n<p>（2）模型简介：</p>\n<p>MobileNetV2 面向的是移动端和边缘端部署。它最关键的设计是 <strong>depthwise separable convolution + inverted residual + linear bottleneck</strong>。这让模型在保持较好性能的同时，大幅减少参数量和计算量。对于工程落地，这类模型的意义非常大。</p>\n<p>核心思想：轻量卷积、反残差结构、线性瓶颈。</p>\n<h2><strong>11 EfficientNet：把网络缩放方法系统化</strong></h2>\n<p>（1）论文题目：EfficientNet: Rethinking Model Scaling for Convolutional Neural Networks（2019）</p>\n<p><img alt=\"\" src=\"https://pic2.zhimg.com/v2-04a68e5ecccba5f40001748cd5db7655_1440w.jpg\" /></p>\n<p>（2）模型简介：</p>\n<p>在 EfficientNet 之前，大家通常是单独加深网络、加宽网络，或者提高输入分辨率。EfficientNet 的关键是提出了 <strong>compound scaling</strong>：统一协调深度、宽度和分辨率三者的缩放，而不是只调其中一个维度。它代表了 CNN 时代在“效率—精度权衡”上的一次系统化总结。</p>\n<p>核心思想：复合缩放，而不是单维度粗暴扩张。</p>\n<p>（3）论文链接：</p>\n<p><em><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/1905.11946\">https://arxiv.org/abs/1905.11946</a></em></p>\n<p>开源代码：</p>\n<p><em><a href=\"https://link.zhihu.com/?target=https%3A//github.com/sd2001/EfficientNet\">https://github.com/sd2001/EfficientNet</a></em></p>\n<h2><strong>12 ViT：视觉模型第一次大规模脱离卷积</strong></h2>\n<p>（1）论文题目：An Image is Worth 16x16 Words: Transformers for Image Recognition at Scale（2021）</p>\n<p><img alt=\"\" src=\"https://pic4.zhimg.com/v2-bff7ab2265e51309d20991caae769015_1440w.jpg\" /></p>\n<p>（2）模型简介：</p>\n<p>ViT 的关键不是“引入注意力”，而是<strong>直接把图像切成 patch，当作 token 输入纯 Transformer 编码器</strong>。这等于第一次明确提出：视觉分类并不一定需要卷积作为主干。它的出现标志着视觉 backbone 的范式发生了根本变化。</p>\n<p>核心思想：Patchify 图像，把分类问题改写成 token 序列建模。</p>\n<p>（3）论文链接：</p>\n<p><em><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2010.11929\">https://arxiv.org/abs/2010.11929</a></em></p>\n<p>开源代码：</p>\n<p><em><a href=\"https://link.zhihu.com/?target=https%3A//github.com/gupta-abhay/pytorch-vit\">https://github.com/gupta-abhay/pytorch-vit</a></em></p>\n<h2><strong>13 Swin Transformer：真正可做通用视觉骨干的 Transformer</strong></h2>\n<p>（1）论文题目：Swin Transformer: Hierarchical Vision Transformer using Shifted Windows（2021）</p>\n<p><img alt=\"\" src=\"https://pic1.zhimg.com/v2-4199965ffe608412f1654307259f9b52_1440w.jpg\" /></p>\n<p>（2）模型简介：</p>\n<p>ViT 在分类上很强，但直接迁移到检测和分割并不自然。Swin Transformer 通过<strong>层级特征图 + 窗口注意力 + shifted windows</strong>，重新引入了很多原本属于 CNN 的多尺度先验，使 Transformer 真正成为可泛化到检测、分割等任务的通用 backbone。</p>\n<p>核心思想：层级化表示 + 局部窗口注意力 + 跨窗口交互。</p>\n<p>（3）论文链接：</p>\n<p><em><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2103.14030\">https://arxiv.org/abs/2103.14030</a></em></p>\n<p>开源代码：</p>\n<p><em><a href=\"https://link.zhihu.com/?target=https%3A//github.com/durongzheng/Swin\">https://github.com/durongzheng/Swin</a></em></p>\n<h2><strong>14 RepLKNet：大核卷积在 Transformer 时代的强势回归</strong></h2>\n<p>（1）论文题目：Scaling Up Your Kernels to 31x31: Revisiting Large Kernel Design in CNNs（2022）</p>\n<p><img alt=\"\" src=\"https://pic1.zhimg.com/v2-47d1e26c80f331ab63c4403af4c3711c_1440w.jpg\" /></p>\n<p>（2）模型简介：</p>\n<p>RepLKNet 是 CVPR 2022 一篇非常值得单独写进发展史的论文。它重新讨论了一个看似“老问题”、但在 Transformer 时代又变得很关键的话题：<strong>卷积核到底能不能做大，而且做大以后是否真的有价值。</strong> 作者在论文中提出，少量大卷积核并不只是“小卷积核堆叠”的低效替代，相反，在现代 CNN 设计中，大核可能是一种更强的范式。基于这一判断，论文提出了 <strong>RepLKNet</strong>，其核心特征是使用可重参数化的大型 depth-wise 卷积，并把卷积核尺度扩展到 <strong>31×31</strong>。</p>\n<p>核心思想：RepLKNet 的关键不是单纯把卷积核变大，而是围绕“大核 CNN”提出了一套设计准则，并结合 <strong>re-parameterized large depth-wise convolution</strong> 构建纯 CNN 主干。</p>\n<p>（3）论文链接：</p>\n<p><em><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2203.06717\">https://arxiv.org/abs/2203.06717</a></em></p>\n<p>开源代码：</p>\n<p><em><a href=\"https://link.zhihu.com/?target=https%3A//github.com/MegEngine/RepLKNet\">https://github.com/MegEngine/RepLKNet</a></em></p>\n<h2><strong>15 ConvNeXt：Transformer 时代下的卷积复兴代表作</strong></h2>\n<p>（1）论文题目：A ConvNet for the 2020s（2022）</p>\n<p><img alt=\"\" src=\"https://pic3.zhimg.com/v2-e1bef9b58516e8e5cf31cbcd4c1fa1c0_1440w.jpg\" /></p>\n<p>（2）模型简介：</p>\n<p>ConvNeXt 的意义非常大。它不是发明一个全新的卷积算子，而是系统性地回答一个问题：<strong>如果把 ViT 时代有效的训练和设计经验重新用于纯卷积网络，会发生什么？</strong> 论文通过逐步“现代化”ResNet，最终得到 ConvNeXt，并证明纯 ConvNet 依然可以与强势 Transformer backbone 竞争。</p>\n<p>核心思想：用 Transformer 时代的设计经验重构经典 ConvNet，使其在保持卷积先验的同时获得更强性能。</p>\n<p>（3）论文链接：</p>\n<p><em><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2201.03545\">https://arxiv.org/abs/2201.03545</a></em></p>\n<p>开源代码：</p>\n<p><em><a href=\"https://link.zhihu.com/?target=https%3A//github.com/facebookresearch/ConvNeXt\">https://github.com/facebookresearch/ConvNeXt</a></em></p>\n<h2><strong>16 PoolFormer / MetaFormer：把视觉网络提升到“结构范式”层面</strong></h2>\n<p>（1）论文题目：MetaFormer Is Actually What You Need for Vision（2022）</p>\n<p><img alt=\"\" src=\"https://pic3.zhimg.com/v2-e28f2f3c8b8a0dc66b643209ead31dfc_1440w.jpg\" /></p>\n<p>（2）模型简介：</p>\n<p>这篇论文的重要性不在于 PoolFormer 本身有多强，而在于它提出了一个更抽象的判断：很多视觉模型成功的关键，可能不在于注意力这个具体 token mixer，而在于更高层的 <strong>MetaFormer 框架</strong>。论文用极其简单的 pooling 代替 attention，结果依然能得到很有竞争力的效果。</p>\n<p>核心思想：真正重要的可能是“MetaFormer 骨架”本身，而不是某一种特定的 token mixing 算子。</p>\n<p>（3）论文链接：</p>\n<p><em><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2111.11418\">https://arxiv.org/abs/2111.11418</a></em></p>\n<p>开源代码：</p>\n<p><em><a href=\"https://link.zhihu.com/?target=https%3A//github.com/sail-sg/poolformer\">https://github.com/sail-sg/poolformer</a></em></p>\n<h2><strong>17 MaxViT：局部与全局注意力的混合层级视觉骨干</strong></h2>\n<p>（1）论文题目：MaxViT: Multi-Axis Vision Transformer（2022）</p>\n<p><img alt=\"\" src=\"https://pic2.zhimg.com/v2-f45c27f80d45070db25893ff84538d61_1440w.jpg\" /></p>\n<p>（2）模型简介：</p>\n<p>MaxViT 是后 Swin 时代非常有代表性的层级 Transformer。它通过 <strong>blocked local attention + dilated global attention</strong> 在同一个 block 中同时建模局部和全局关系，并保持线性复杂度。相比“只做窗口注意力”的方案，MaxViT 更强调全局-局部交互的统一。</p>\n<p>核心思想：将局部注意力和稀疏全局注意力结合，构建可扩展的层级视觉 Transformer。</p>\n<p>（3）论文链接：</p>\n<p><em><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2204.01697\">https://arxiv.org/abs/2204.01697</a></em></p>\n<p>开源代码：</p>\n<p><em><a href=\"https://link.zhihu.com/?target=https%3A//github.com/google-research/maxvit\">https://github.com/google-research/maxvit</a></em></p>\n<h2><strong>18 InternImage：以可变形卷积为核心的大规模 CNN 骨干</strong></h2>\n<p>（1）论文题目：InternImage: Exploring Large-Scale Vision Foundation Models With Deformable Convolutions（2023）</p>\n<p><img alt=\"\" src=\"https://picx.zhimg.com/v2-c5b0324a026cdfd083ce6bd135ad218b_1440w.jpg\" /></p>\n<p>（2）模型简介：</p>\n<p>InternImage 是卷积路线中非常值得单独写的一篇论文。它没有走大核卷积路线，而是把 <strong>deformable convolution</strong> 作为核心算子，试图让 CNN 也具备类似 ViT 的大感受野与输入自适应空间聚合能力，从而构建面向 foundation model 时代的大规模 CNN。</p>\n<p>核心思想：利用可变形卷积提升 CNN 的空间自适应建模能力和有效感受野。</p>\n<p>（3）论文链接：</p>\n<p><em><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2211.05778\">https://arxiv.org/abs/2211.05778</a></em></p>\n<p>开源代码：</p>\n<p><em><a href=\"https://link.zhihu.com/?target=https%3A//github.com/OpenGVLab/InternImage\">https://github.com/OpenGVLab/InternImage</a></em></p>\n<h2><strong>19 InceptionNeXt：经典 Inception 思想在现代 ConvNet 中的再生</strong></h2>\n<p>（1）论文题目：InceptionNeXt: When Inception Meets ConvNeXt（2024）</p>\n<p><img alt=\"\" src=\"https://pica.zhimg.com/v2-0293a180c823c505036ec298cdd95536_1440w.jpg\" /></p>\n<p>（2）模型简介：</p>\n<p>InceptionNeXt 可以理解为“把 GoogLeNet/Inception 的多分支思想重新带回 ConvNeXt 时代”。论文从 ConvNeXt 出发，尝试改造其中较重的 depthwise convolution 模块，在兼顾精度的同时提高效率，是一种“经典结构思想现代化”的代表案例。</p>\n<p>核心思想：将 Inception 风格的分支式局部建模思想与现代 ConvNeXt 设计结合起来。</p>\n<p>（3）论文链接：</p>\n<p><em><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2303.16900\">https://arxiv.org/abs/2303.16900</a></em></p>\n<p>开源代码：</p>\n<p><em><a href=\"https://link.zhihu.com/?target=https%3A//github.com/sail-sg/inceptionnext\">https://github.com/sail-sg/inceptionnext</a></em></p>\n<h2><strong>20 ViTamin：视觉-语言时代的可扩展视觉编码器</strong></h2>\n<p>（1）论文题目：ViTamin: Designing Scalable Vision Models in the Vision-Language Era（2024）</p>\n<p><img alt=\"\" src=\"https://picx.zhimg.com/v2-74a433561241c0b623ebb0a9399eeb77_1440w.jpg\" /></p>\n<p>（2）模型简介：</p>\n<p>ViTamin 的特殊性在于，它不再只面向传统 ImageNet 分类，而是把视觉 backbone 的设计问题放到 <strong>Vision-Language Model（VLM）时代</strong> 来重新讨论。它更关心的是：在大规模图文预训练和开放词汇任务背景下，视觉编码器应该如何扩展。</p>\n<p>核心思想：面向视觉-语言预训练范式，设计可扩展、高迁移性的视觉编码器。</p>\n<p>（3）论文链接：</p>\n<p><em><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2404.02132\">https://arxiv.org/abs/2404.02132</a></em></p>\n<p>开源代码：</p>\n<p><em><a href=\"https://link.zhihu.com/?target=https%3A//beckschen.github.io/vitamin.html\">https://beckschen.github.io/vitamin.html</a></em></p>\n<h2><strong>21 VMamba：视觉主干开始进入状态空间模型时代</strong></h2>\n<p>（1）论文题目：VMamba: Visual State Space Model（2024）</p>\n<p><img alt=\"\" src=\"https://pic4.zhimg.com/v2-f0858caa0d2701d185a7743ce67eaaef_1440w.jpg\" /></p>\n<p>（2）模型简介：</p>\n<p>VMamba 是后 Transformer 时代非常重要的一篇论文。它把语言领域的 Mamba/SSM 思路引入视觉 backbone，提出了 <strong>Visual State-Space（VSS）block</strong> 和 <strong>2D Selective Scan（SS2D）</strong> 模块，试图用线性复杂度方式处理视觉长序列建模问题。</p>\n<p>核心思想：将状态空间模型从语言迁移到视觉，构建线性复杂度的视觉骨干。</p>\n<p>（3）论文链接：</p>\n<p><em><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2401.10166\">https://arxiv.org/abs/2401.10166</a></em></p>\n<p>开源代码：</p>\n<p><em><a href=\"https://link.zhihu.com/?target=https%3A//github.com/MzeroMiko/VMamba\">https://github.com/MzeroMiko/VMamba</a></em></p>\n<h2><strong>22 MambaVision：Mamba 与 Transformer 的混合视觉骨干</strong></h2>\n<p>（1）论文题目：MambaVision: A Hybrid Mamba-Transformer Vision Backbone（2025）</p>\n<p><img alt=\"\" src=\"https://pic3.zhimg.com/v2-1544d638fd28d756a7bf9e9094f9178a_1440w.jpg\" /></p>\n<p>（2）模型简介：</p>\n<p>MambaVision 的代表性在于，它没有走“纯 Mamba 替代 Transformer”的极端路线，而是采用 <strong>Mamba + Transformer 的混合架构</strong>。这反映出一个现实趋势：在视觉任务中，研究者更关注不同机制之间的互补，而不是简单押注单一范式。</p>\n<p>核心思想：将 Mamba 的线性建模能力与 Transformer 的表达优势结合起来。</p>\n<p>（3）论文链接：</p>\n<p><em><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2407.08083\">https://arxiv.org/abs/2407.08083</a></em></p>\n<p>开源代码：</p>\n<p><em><a href=\"https://link.zhihu.com/?target=https%3A//github.com/NVlabs/MambaVision\">https://github.com/NVlabs/MambaVision</a></em></p>\n<h2><strong>23 PVMamba：尝试解决视觉 Mamba 的并行化瓶颈</strong></h2>\n<p>（1）论文题目：PVMamba: Parallelizing Vision Mamba via Dynamic State Aggregation（2025）</p>\n<p><img alt=\"\" src=\"https://pic2.zhimg.com/v2-c677382a23ca38dafe57a11abd5f355f_1440w.jpg\" /></p>\n<p>（2）模型简介：</p>\n<p>PVMamba 是 ICCV 2025 的一个代表性工作。它关注的是视觉 Mamba 的一个现实问题：虽然 Mamba 具有线性复杂度优势，但其顺序扫描方式与 2D 图像并不天然匹配。PVMamba 通过 <strong>Dynamic State Aggregation</strong> 来提升并行性，是视觉 SSM 路线向更强工程可用性推进的一篇论文。</p>\n<p>核心思想：针对视觉 Mamba 的顺序扫描瓶颈，提升并行化和 2D 数据适配能力。</p>\n<p>（3）论文链接：</p>\n<p><em><a href=\"https://link.zhihu.com/?target=https%3A//openaccess.thecvf.com/content/ICCV2025/papers/Xie_PVMamba_Parallelizing_Vision_Mamba_via_Dynamic_State_Aggregation_ICCV_2025_paper.pdf\">https://openaccess.thecvf.com/content/ICCV2025/papers/Xie_PVMamba_Parallelizing_Vision_Mamba_via_Dynamic_State_Aggregation_ICCV_2025_paper.pdf</a></em></p>\n<p>开源代码：</p>\n<p><em>https: //<a href=\"https://link.zhihu.com/?target=http%3A//github.com/VISION-SJTU/PVMamba\">http://github.com/VISION-SJTU/PVMamba</a></em></p>\n<h2><strong>总结</strong></h2>\n<p>卷积网络的发展史，本质上不是“模型名字越来越多”的历史，而是视觉建模思路不断演化的历史。Neocognitron 提出层级视觉思想，LeNet 建立 CNN 的工程范式，AlexNet 让深度学习重回视觉中心，VGG/GoogLeNet/ResNet/DenseNet 把结构设计推向成熟，SENet/MobileNet/EfficientNet 让视觉主干开始兼顾注意力、轻量化与效率。随后 ViT 和 Swin Transformer 改写了视觉主干的范式，而 ConvNeXt、InternImage、VMamba、MambaVision 则进一步说明：后 Swin 时代，视觉网络已经不再是“CNN 被 Transformer 取代”的单线叙事，而是卷积、注意力与状态空间模型持续重组、相互借鉴的多路线时代。</p>"
    }
  ],
  "latest_overview": [
    {
      "title": "",
      "body_html": "<h1>2026 视觉大模型架构进化论：从特征提取到万物生成</h1>\n<ul>\n<li>来源平台: <strong>zhihu</strong>（知乎专栏文章）</li>\n<li>原文链接: <a href=\"https://zhuanlan.zhihu.com/p/2036040704405791452\">https://zhuanlan.zhihu.com/p/2036040704405791452</a></li>\n<li>作者: 北方的郎</li>\n</ul>\n<hr />\n<p>2026 视觉大模型架构进化论：从特征提取到万物生成</p>\n<h1>2026 视觉大模型架构进化论：从特征提取到万物生成</h1>\n<p>作者: 北方的郎, 赞: 3</p>\n<p>在2026年的视觉大模型（Vision Foundation Models）版图上，按照“核心功能”可以划分为两大阵营：<strong>负责“理解世界”的特征提取基石（CNN、ViT、Mamba）</strong>，以及<strong>负责“创造世界”的生成引擎（DiT）</strong>。</p>\n<h2>一、 负责“理解世界”的特征提取基石 (Backbones)</h2>\n<p>这类模型的核心任务是：将现实世界中非结构化的像素，降维转化成人工智能可以理解的高维语义特征向量。</p>\n<p><img alt=\"\" src=\"https://pic3.zhimg.com/v2-a08e4bed9aad8882846a1a6635d1fc58_1440w.jpg\" /></p>\n<h3>1. CNN（卷积神经网络）：局部特征的大师与边缘计算之王</h3>\n<ul>\n<li><strong>底层机制：</strong> 核心是“局部感受野”和“权值共享”。CNN 通过滑动窗口（卷积核）在图像上逐层扫描。它天生具有极强的“归纳偏置”（Inductive Bias）——即假设图像中相邻的像素具有强相关性（例如构成边缘或纹理），且无论物体出现在图片哪个位置，都能被识别（平移不变性）。</li>\n<li><strong>2026年的最新演进：</strong> 现代纯 CNN 已经摒弃了传统的小卷积核（如 3×3）。以 ConvNeXt V2 为代表的现代架构，吸收了 Transformer 的设计，采用了超大卷积核（如 7×7甚至 31×31）和层归一化（LayerNorm）。它证明了只要设计得当，纯卷积网络也能达到极高的精度。</li>\n<li>\n<p><strong>核心优势与应用：</strong></p>\n</li>\n<li>\n<p><strong>极高效率：</strong> 它的计算复杂度与图像分辨率呈线性关系（<em>O</em>(<em>N</em>)）。</p>\n</li>\n<li><strong>硬件亲和度极高：</strong> 全球所有的芯片（手机 NPU、各类边缘计算盒子）都对卷积运算做了十多年的底层指令集优化。</li>\n<li><strong>主阵地：</strong> 手机端侧的实时图像处理、无人机视觉跟随、工业流水线的高速缺陷检测、自动驾驶的实时目标检测（如 YOLO 家族的最新迭代）。</li>\n</ul>\n<h3>2. ViT（Vision Transformer）：全局视角的霸主与多模态的桥梁</h3>\n<ul>\n<li><strong>底层机制：</strong> 摒弃了滑动窗口。它将一幅图像硬生生切分成固定大小的“图块”（Patches），把它们当作自然语言中的“单词”对待。通过“多头自注意力机制”（Self-Attention），ViT 在第一层就能让图像左上角的图块和右下角的图块进行信息交互，建立全局视野。</li>\n<li><strong>2026年的最新演进：</strong> ViT 彻底证明了“大力出奇迹”（Scaling Law）。只要数据和参数量足够大，它就能碾压一切。最新的 ViT 广泛结合了“掩码自监督学习”（MAE），即遮住图片的 80%，让模型去猜剩下的内容，从而极大地提升了模型的语义理解深度。</li>\n<li>\n<p><strong>核心优势与应用：</strong></p>\n</li>\n<li>\n<p><strong>多模态的通用语言：</strong> 因为架构和自然语言大模型（LLM）完全一致，ViT 极其容易与语言模型对齐（如 CLIP）。目前所有顶尖的图文大模型（Vision-Language Models），底层视觉编码器几乎清一色是大型 ViT。</p>\n</li>\n<li><strong>痛点：</strong> 算力灾难。自注意力的计算量随图块数量呈“平方级爆炸”（O(N2)）。处理 4K 分辨率图像或长视频时，显存会瞬间耗尽。</li>\n</ul>\n<h3>3. Vision Mamba (SSMs)：打破算力极限的新锐第四极</h3>\n<ul>\n<li><strong>底层机制：</strong> 源于控制论中的“状态空间模型”（State Space Models）。它将二维图像展平为一维序列，通过“选择性扫描”（Selective Scan）机制，模型可以像看书一样扫过图像，并动态决定哪些信息需要记住，哪些需要遗忘。</li>\n<li><strong>2026年的最新演进：</strong> 这是目前学术界和工业界最火热的突破口。架构如 VMamba 通过交叉扫描（Cross-Scan）解决了图像缺乏方向感的问题，成功在视觉领域立足。</li>\n<li>\n<p><strong>核心优势与应用：</strong></p>\n</li>\n<li>\n<p><strong>完美的既要又要：</strong> 它既拥有类似 ViT 的“全局感受野”，又保持了类似 CNN 的“线性计算复杂度（<br />\n  O(N)）”。</p>\n</li>\n<li><strong>主阵地：</strong> 它是为“高分辨率”和“长序列”而生的。在卫星遥感图像分析、超高分辨率医疗病理切片（如 <br />\n  4096×40964096×4096<br />\n   的图像）诊断，以及数小时的长监控视频理解中，Mamba 架构正在迅速取代 ViT。</li>\n</ul>\n<h2>二、 负责“创造世界”的生成引擎 (Generative Paradigm)</h2>\n<p><img alt=\"\" src=\"https://pic4.zhimg.com/v2-1db1c65ba7dc5a44375ee947f2dde7cb_1440w.jpg\" /></p>\n<h3>DiT（Diffusion Transformer）：视觉生成的“大一统”</h3>\n<ul>\n<li><strong>底层机制：</strong> 传统的扩散模型（Diffusion）是把图片打上纯噪声，然后训练一个神经网络（以前通常用基于 CNN 的 U-Net）把噪声一步步去掉，还原出图片。<strong>DiT 的伟大之处在于，它用 Transformer 彻底替换掉了老旧的 U-Net。</strong> 它将带噪的图像切成图块，通过注意力机制去预测和消除噪声。</li>\n<li><strong>2026年的最新演进：</strong> 架构实现了惊人的“可扩展性”。现在的 DiT 模型不仅能生成图像，还统一了视频生成。通过在架构中引入时间维度的注意力机制（Temporal Attention），DiT 能够确保生成的视频在物理规律和时间流逝上保持高度一致。</li>\n<li>\n<p><strong>核心优势与应用：</strong></p>\n</li>\n<li>\n<p><strong>涌现物理规律：</strong> 当 DiT 模型足够大、看过足够多的视频后，它不仅学会了画图，还“内化”了现实世界的物理法则（比如重力、光影反射、流体动力学）。</p>\n</li>\n<li>\n<p><strong>主阵地：</strong></p>\n</li>\n<li>\n<p><strong>影视级文生视频：</strong> 从输入一段文字直接生成长达几分钟的高清、连贯视频。</p>\n</li>\n<li><strong>世界模型（World Models）：</strong> 用于自动驾驶和机器人训练的仿真器。输入当前路况和方向盘转角，DiT 能直接生成出10秒后的路况视频，让AI在虚拟世界里无损试错。</li>\n</ul>\n<h2>三、 2026 视觉模型的终局形态：走向深度融合 (Hybridization)</h2>\n<p>在实际的工业落地中，单一架构的时代已经结束，当前的顶尖视觉系统全部是<strong>混合架构</strong>的结晶：</p>\n<p><img alt=\"\" src=\"https://pic4.zhimg.com/v2-da7f8b288672577361158725718b46f9_1440w.jpg\" /></p>\n<p><strong>特征提取的最优解（CNN + Mamba + ViT）：</strong><br />\n现代最强效的骨干网络（如混合型视觉架构）通常呈金字塔结构：</p>\n<ul>\n<li><strong>浅层（处理几百万像素）：</strong> 使用 CNN。快速提取边缘和纹理，并迅速缩小图像分辨率，极其节省显存。</li>\n<li><strong>中层（处理全局关系）：</strong> 引入 Vision Mamba。在较低分辨率下，以线性的计算成本建立全图的空间依赖关系。</li>\n<li><strong>深层（处理高级语义）：</strong> 接入少量的 ViT 层。利用自注意力机制进行最深度的概念抽象，以便最终与语言文字对齐。</li>\n</ul>\n<p><strong>“生成即理解”的反哺闭环：</strong>行业发现，经过海量数据训练的 DiT 生成模型，由于它必须非常懂物理世界才能“画”出逼真的视频，其内部提取的特征比任何纯识别模型（如单纯的 ViT 或 CNN）都要丰富。因此，最新的趋势是直接将 DiT 中间层的特征抽取出来，用于高精度的图像分割、深度估计甚至 3D 重建。理解与生成，在底层架构上实现了闭环。</p>\n<p><strong>总结而言：</strong>CNN 是高效的感官，ViT 是深度的语义大脑，而 DiT 是极具想象力的创造引擎。若再拼上主攻高分辨率与长视频的 Vision Mamba，这四块拼图便构成了当前最完整、最前沿的人工智能视觉基础架构。</p>"
    }
  ],
  "graph": {
    "nodes": [
      {
        "id": "alexnet",
        "x": 100,
        "y": 100,
        "category": "cnn_classic"
      },
      {
        "id": "vggnet",
        "x": 200,
        "y": 100,
        "category": "cnn_classic"
      },
      {
        "id": "googlenet",
        "x": 200,
        "y": 50,
        "category": "cnn_classic"
      },
      {
        "id": "resnet",
        "x": 300,
        "y": 100,
        "category": "cnn_classic"
      },
      {
        "id": "densenet",
        "x": 400,
        "y": 120,
        "category": "cnn_classic"
      },
      {
        "id": "senet",
        "x": 450,
        "y": 150,
        "category": "attention_cnn"
      },
      {
        "id": "efficientnet",
        "x": 550,
        "y": 150,
        "category": "attention_cnn"
      },
      {
        "id": "vit",
        "x": 650,
        "y": 50,
        "category": "vit_era"
      },
      {
        "id": "deit",
        "x": 700,
        "y": 30,
        "category": "vit_era"
      },
      {
        "id": "swin_transformer",
        "x": 750,
        "y": 70,
        "category": "vit_era"
      },
      {
        "id": "convnext",
        "x": 800,
        "y": 120,
        "category": "modern_efficient"
      },
      {
        "id": "convnext_v2",
        "x": 850,
        "y": 120,
        "category": "modern_efficient"
      },
      {
        "id": "mambavision",
        "x": 900,
        "y": 60,
        "category": "modern_efficient"
      },
      {
        "id": "jumbo_token",
        "x": 920,
        "y": 40,
        "category": "modern_efficient"
      },
      {
        "id": "raptor",
        "x": 940,
        "y": 30,
        "category": "modern_efficient"
      },
      {
        "id": "vmamba",
        "x": 960,
        "y": 50,
        "category": "modern_efficient"
      },
      {
        "id": "focalnet",
        "x": 950,
        "y": 80,
        "category": "modern_efficient"
      }
    ],
    "edges": [
      {
        "from": "alexnet",
        "to": "vggnet",
        "label": "小核深层"
      },
      {
        "from": "alexnet",
        "to": "googlenet",
        "label": "多尺度并行"
      },
      {
        "from": "vggnet",
        "to": "resnet",
        "label": "残差连接"
      },
      {
        "from": "resnet",
        "to": "densenet",
        "label": "密集连接"
      },
      {
        "from": "resnet",
        "to": "senet",
        "label": "通道注意力"
      },
      {
        "from": "senet",
        "to": "efficientnet",
        "label": "复合缩放"
      },
      {
        "from": "vit",
        "to": "deit",
        "label": "知识蒸馏"
      },
      {
        "from": "vit",
        "to": "swin_transformer",
        "label": "窗口机制"
      },
      {
        "from": "resnet",
        "to": "convnext",
        "label": "现代化改造"
      },
      {
        "from": "convnext",
        "to": "convnext_v2",
        "label": "自监督融合"
      },
      {
        "from": "swin_transformer",
        "to": "mambavision",
        "label": "SSM融合"
      },
      {
        "from": "vit",
        "to": "jumbo_token",
        "label": "巨型Token"
      },
      {
        "from": "vit",
        "to": "raptor",
        "label": "块递归"
      },
      {
        "from": "swin_transformer",
        "to": "vmamba",
        "label": "选择性扫描"
      },
      {
        "from": "swin_transformer",
        "to": "focalnet",
        "label": "焦点调制"
      }
    ],
    "milestones": [
      "alexnet",
      "resnet",
      "vit"
    ]
  },
  "algos": [
    {
      "id": "alexnet",
      "num": 1,
      "name": "AlexNet",
      "fullName": "深度卷积神经网络 (Deep Convolutional Neural Network)",
      "year": "2012.12",
      "org": "多伦多大学",
      "parent": "—",
      "paperUrl": "https://proceedings.neurips.cc/paper/2012/file/c399862d3b9d6b76c8436e924a68c45b-Paper.pdf",
      "projectUrl": "",
      "category": "cnn_classic",
      "motivation": "首次应用ReLU、Dropout和GPU加速",
      "summary": "AlexNet首次将深度卷积神经网络应用于大规模图像分类任务，通过ReLU激活函数、Dropout正则化、数据增强和双GPU并行训练，在ILSVRC-2012上以top-5 error 15.3%大幅超越传统方法（第二名26.2%），开启了深度学习在计算机视觉领域的统治时代。",
      "keyPoints": [
        "<strong>ReLU激活函数</strong>：用非饱和激活函数 <span class=\"kb-math kb-math-inline\">f(x) = \\max(0, x)</span> 替代tanh/sigmoid，训练速度提升约6倍，解决深层网络梯度消失问题",
        "<strong>双GPU并行架构</strong>：将网络分布在两块GTX 580 GPU上，每块GPU负责一半的feature maps，仅在特定层进行跨GPU通信，实现大模型高效训练",
        "<strong>局部响应归一化(LRN)</strong>：对相邻feature map通道进行归一化，模拟生物神经元的侧抑制效应，top-1/top-5 error分别降低1.4%/1.2%",
        "<strong>重叠池化(Overlapping Pooling)</strong>：使用stride=2、size=3的池化窗口（stride &lt; size），相比非重叠池化(stride=size=2)降低top-1/top-5 error 0.4%/0.3%",
        "<strong>Dropout正则化</strong>：在全连接层以0.5概率随机置零神经元输出，有效减少过拟合，代价是收敛时间约增加一倍",
        "<strong>数据增强</strong>：包括随机裁剪(256→224)与水平翻转、PCA颜色扰动，大幅减少过拟合",
        "<strong>网络规模</strong>：5层卷积 + 3层全连接，约6000万参数、65万神经元，在120万训练图像上训练"
      ],
      "detail": "<p><img alt=\"AlexNet Architecture\" src=\"https://production-media.paperswithcode.com/methods/Screen_Shot_2020-06-22_at_6.35.45_PM.png\" />\n<em>图：AlexNet网络架构示意图，展示双GPU分割结构。上下两条路径分别对应两块GPU，仅在第3层卷积和全连接层进行跨GPU通信。</em></p>\n<p><strong>算法伪代码：AlexNet 前向传播</strong></p>\n<pre><code>Input: RGB image 227×227×3 (从256×256随机裁剪224×224，实际实现为227)\n\n# Conv1: 96 kernels of 11×11×3, stride 4\nx = Conv(3→96, k=11, s=4) → ReLU → LRN → MaxPool(3×3, s=2)\n# Output: 27×27×96 (split: 48 per GPU)\n\n# Conv2: 256 kernels of 5×5×48\nx = Conv(96→256, k=5, pad=2) → ReLU → LRN → MaxPool(3×3, s=2)\n# Output: 13×13×256 (split: 128 per GPU)\n\n# Conv3: 384 kernels of 3×3×256 (cross-GPU connection)\nx = Conv(256→384, k=3, pad=1) → ReLU\n# Output: 13×13×384 (split: 192 per GPU)\n\n# Conv4: 384 kernels of 3×3×192\nx = Conv(384→384, k=3, pad=1) → ReLU\n# Output: 13×13×384 (split: 192 per GPU)\n\n# Conv5: 256 kernels of 3×3×192\nx = Conv(384→256, k=3, pad=1) → ReLU → MaxPool(3×3, s=2)\n# Output: 6×6×256 (split: 128 per GPU)\n\n# Classifier\nx = FC(6×6×256→4096) → ReLU → Dropout(0.5)\nx = FC(4096→4096) → ReLU → Dropout(0.5)\nx = FC(4096→1000) → Softmax\n\nOutput: 1000-class probability\n</code></pre>\n<p><strong>核心设计原理</strong></p>\n<ol>\n<li><strong>ReLU：解决梯度消失的关键</strong></li>\n</ol>\n<p>传统激活函数如sigmoid <span class=\"kb-math kb-math-inline\">\\sigma(x) = 1/(1+e^{-x})</span> 和tanh在输入绝对值较大时梯度趋近于0（饱和区），导致深层网络训练极慢。ReLU定义为：</p>\n<div class=\"kb-math kb-math-display\">f(x) = \\max(0, x)</div>\n<p>其梯度在正区间恒为1，不存在饱和问题。论文实验表明，在CIFAR-10上使用ReLU的4层CNN达到25% training error的速度比等效tanh网络快约6倍。</p>\n<div class=\"key-point\">💡 关键：ReLU的计算也极其简单（仅需判断正负），相比sigmoid的指数运算大幅降低计算开销。</div>\n<ol>\n<li><strong>双GPU并行训练策略</strong></li>\n</ol>\n<p>2012年单块GPU（GTX 580, 3GB显存）无法容纳完整的AlexNet。作者将96个/256个feature maps分为两组，分别放在两块GPU上。关键设计：\n   - 第3层卷积接收两块GPU的全部feature maps（跨GPU通信）\n   - 其余卷积层仅在同一GPU内部连接\n   - 全连接层接收所有feature maps</p>\n<p>这种\"受限连接\"设计不仅解决了显存限制，还通过交叉验证发现能降低top-1/top-5 error约1.7%/1.2%（相比每层都跨GPU通信的方案）。</p>\n<ol>\n<li><strong>局部响应归一化(Local Response Normalization)</strong></li>\n</ol>\n<p>受生物视觉系统侧抑制启发，对第 <span class=\"kb-math kb-math-inline\">i</span> 个feature map在位置 <span class=\"kb-math kb-math-inline\">(x,y)</span> 的激活值进行归一化：</p>\n<div class=\"kb-math kb-math-display\">b_{x,y}^{i} = a_{x,y}^{i} / \\left( k + \\alpha \\sum_{j=\\max(0,i-n/2)}^{\\min(N-1,i+n/2)} (a_{x,y}^{j})^2 \\right)^{\\beta}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">k=2, n=5, \\alpha=10^{-4}, \\beta=0.75</span>（通过验证集调优）。LRN在相邻通道间产生竞争，使响应较大的神经元相对更突出。</p>\n<div class=\"warn-box\">⚠️ 注意：后续研究（如VGGNet）发现LRN对性能提升有限，现代网络已被Batch Normalization完全取代。</div>\n<ol>\n<li><strong>重叠池化(Overlapping Pooling)</strong></li>\n</ol>\n<p>传统池化使用 stride = kernel_size（如2×2池化stride=2），相邻池化窗口无重叠。AlexNet使用：</p>\n<div class=\"kb-math kb-math-display\">\\text{kernel\\_size} = 3, \\quad \\text{stride} = 2</div>\n<p>窗口间有1像素重叠，实验表明这能轻微降低过拟合倾向（top-1降0.4%，top-5降0.3%）。</p>\n<ol>\n<li><strong>数据增强策略</strong></li>\n</ol>\n<p>两种互补的数据增强方法：</p>\n<p><strong>方法一：随机裁剪与翻转</strong>\n   - 从256×256图像中随机裁剪224×224 patch及其水平镜像\n   - 测试时提取4角+中心共5个patch及其翻转（10个patch），取softmax输出均值\n   - 将训练集扩大2048倍</p>\n<p><strong>方法二：PCA颜色扰动</strong>\n   - 对训练集RGB像素值进行PCA\n   - 对每张图像加入扰动：<span class=\"kb-math kb-math-inline\">[\\mathbf{p}_1, \\mathbf{p}_2, \\mathbf{p}_3][\\alpha_1 \\lambda_1, \\alpha_2 \\lambda_2, \\alpha_3 \\lambda_3]^T</span>\n   - 其中 <span class=\"kb-math kb-math-inline\">\\mathbf{p}_i, \\lambda_i</span> 为RGB协方差矩阵的特征向量和特征值，<span class=\"kb-math kb-math-inline\">\\alpha_i \\sim N(0, 0.1)</span>\n   - 捕捉自然图像的光照变化不变性，降低top-1 error超过1%</p>\n<ol>\n<li><strong>Dropout正则化</strong></li>\n</ol>\n<p>在前两个全连接层（4096维）中，训练时以概率0.5随机将神经元输出置零：</p>\n<div class=\"kb-math kb-math-display\">h_i = \\begin{cases} 0 &amp; \\text{with probability } 0.5 \\\\ 2 \\cdot a_i &amp; \\text{otherwise} \\end{cases}</div>\n<p>每次前向传播采样不同的\"瘦网络\"，等效于训练大量共享参数的子网络的集成。测试时使用全部神经元但权重减半（等效于几何平均）。Dropout使模型不依赖特定神经元的共适应关系，显著减少过拟合。</p>\n<ol>\n<li>\n<p><strong>训练细节</strong></p>\n</li>\n<li>\n<p>优化器：SGD，batch size 128，momentum 0.9，weight decay 0.0005</p>\n</li>\n<li>学习率：初始0.01，当验证集error不再下降时手动除以10，共降低3次</li>\n<li>权重初始化：均值0、标准差0.01的高斯分布；偏置在Conv2/4/5和全连接层初始化为1（加速ReLU早期学习），其余为0</li>\n<li>训练时长：120万图像训练约90个epoch，在两块GTX 580上耗时5-6天</li>\n</ol>\n<p><strong>与传统方法的对比</strong></p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>Top-5 Error (ILSVRC-2012)</th>\n<th>特点</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>AlexNet (1 CNN)</td>\n<td>18.2%</td>\n<td>单模型深度CNN</td>\n</tr>\n<tr>\n<td>AlexNet (5 CNNs)</td>\n<td>16.4%</td>\n<td>5模型集成</td>\n</tr>\n<tr>\n<td>AlexNet (7 CNNs)*</td>\n<td>15.3%</td>\n<td>含预训练微调模型</td>\n</tr>\n<tr>\n<td>第二名 (传统方法)</td>\n<td>26.2%</td>\n<td>Fisher Vector + 多尺度SIFT</td>\n</tr>\n<tr>\n<td>第三名</td>\n<td>26.6%</td>\n<td>传统特征工程</td>\n</tr>\n</tbody>\n</table></div>\n<p>*竞赛提交版本使用了在ImageNet Fall 2011数据集上预训练的两个额外CNN。</p>\n<div class=\"key-point\">💡 关键：AlexNet将error rate从26.2%直接降到15.3%（相对提升41.6%），这一跨越性进步彻底改变了计算机视觉的研究范式，从手工特征工程转向端到端深度学习。</div>",
      "quiz": {
        "q": "AlexNet中使用ReLU激活函数替代tanh的主要优势是什么？",
        "options": [
          "ReLU能产生稀疏激活，减少模型参数量",
          "ReLU在正区间梯度恒为1，避免梯度饱和，大幅加速训练收敛",
          "ReLU的输出范围有界，有助于数值稳定性",
          "ReLU能自动实现特征归一化"
        ],
        "answer": 1,
        "explain": "ReLU的核心优势在于非饱和性——正区间梯度恒为1，不像sigmoid/tanh在大输入时梯度趋近于0。论文实验表明ReLU使训练速度提升约6倍。"
      }
    },
    {
      "id": "vggnet",
      "num": 2,
      "name": "VGGNet",
      "fullName": "视觉几何组网络 (Visual Geometry Group Network)",
      "year": "2014.09",
      "org": "牛津大学",
      "parent": "alexnet",
      "paperUrl": "https://arxiv.org/abs/1409.1556",
      "projectUrl": "",
      "category": "cnn_classic",
      "motivation": "证明使用连续3×3小卷积核增加深度可显著提升性能",
      "summary": "VGGNet通过将卷积核统一为3×3并将网络深度增加到16-19层，在保持架构简洁的同时达到了ILSVRC-2014分类任务第二名（top-5 error 6.8%），证明了深度是提升CNN性能的关键因素。",
      "keyPoints": [
        "<strong>统一3×3卷积核</strong>：用2-3个3×3卷积替代5×5/7×7，获得相同感受野但参数更少（$27C^2$ vs $49C^2$，减少45%）且引入更多ReLU非线性",
        "<strong>深度提升性能</strong>：从11层(A)到19层(E)，top-5 error从10.4%降至8.0%（单尺度），验证了\"更深更好\"",
        "<strong>多尺度训练/测试</strong>：训练时scale jittering $S \\in [256, 512]$，测试时多尺度dense evaluation + multi-crop融合，最终单模型7.0% top-5 error",
        "<strong>简洁统一的架构设计</strong>：所有配置遵循相同模板（3×3 conv + maxpool + FC），仅通过增加层数扩展，成为后续研究的backbone标准",
        "<strong>预训练初始化策略</strong>：先训练浅层网络A，再用其权重初始化深层网络，解决深层网络训练不稳定问题"
      ],
      "detail": "<p><img alt=\"VGGNet Architecture\" src=\"https://production-media.paperswithcode.com/methods/vgg_7mT4DML.png\" /></p>\n<p><strong>算法伪代码：VGG-16 (Configuration D) 前向传播</strong></p>\n<pre><code>Input: RGB image 224×224×3 (mean subtracted)\n\n# Block 1: 2×conv3-64 + maxpool\nx = Conv3×3(3→64) → ReLU → Conv3×3(64→64) → ReLU → MaxPool2×2\n\n# Block 2: 2×conv3-128 + maxpool  \nx = Conv3×3(64→128) → ReLU → Conv3×3(128→128) → ReLU → MaxPool2×2\n\n# Block 3: 3×conv3-256 + maxpool\nx = Conv3×3(128→256) → ReLU → Conv3×3(256→256) → ReLU → Conv3×3(256→256) → ReLU → MaxPool2×2\n\n# Block 4: 3×conv3-512 + maxpool\nx = Conv3×3(256→512) → ReLU → Conv3×3(512→512) → ReLU → Conv3×3(512→512) → ReLU → MaxPool2×2\n\n# Block 5: 3×conv3-512 + maxpool\nx = Conv3×3(512→512) → ReLU → Conv3×3(512→512) → ReLU → Conv3×3(512→512) → ReLU → MaxPool2×2\n\n# Classifier\nx = FC(7×7×512→4096) → ReLU → Dropout(0.5)\nx = FC(4096→4096) → ReLU → Dropout(0.5)\nx = FC(4096→1000) → Softmax\n\nOutput: 1000-class probability\n</code></pre>\n<p><strong>核心设计原理</strong></p>\n<ol>\n<li><strong>3×3卷积核的等效感受野</strong></li>\n</ol>\n<p>两层3×3卷积的有效感受野等于一层5×5，三层3×3等于一层7×7：</p>\n<div class=\"kb-math kb-math-display\">RF = (k-1) \\times L + 1 = (3-1) \\times 3 + 1 = 7</div>\n<p>其中 $k=3$ 为卷积核大小，$L$ 为层数。参数量对比：</p>\n<div class=\"kb-math kb-math-display\">\\text{三层3×3}: 3 \\times (3^2 C^2) = 27C^2</div>\n<div class=\"kb-math kb-math-display\">\\text{一层7×7}: 7^2 C^2 = 49C^2</div>\n<p>减少约 $\\frac{49-27}{49} \\approx 45\\%$ 参数，同时引入3个ReLU非线性变换增强表达能力。</p>\n<ol>\n<li><strong>网络配置对比</strong></li>\n</ol>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>配置</th>\n<th>层数</th>\n<th>参数量</th>\n<th>Top-5 Error (S=[256;512])</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>A</td>\n<td>11</td>\n<td>133M</td>\n<td>10.4% (S=256)</td>\n</tr>\n<tr>\n<td>B</td>\n<td>13</td>\n<td>133M</td>\n<td>9.9% (S=256)</td>\n</tr>\n<tr>\n<td>C</td>\n<td>16</td>\n<td>134M</td>\n<td>8.8%</td>\n</tr>\n<tr>\n<td>D (VGG-16)</td>\n<td>16</td>\n<td>138M</td>\n<td><strong>8.1%</strong></td>\n</tr>\n<tr>\n<td>E (VGG-19)</td>\n<td>19</td>\n<td>144M</td>\n<td><strong>8.0%</strong></td>\n</tr>\n</tbody>\n</table></div>\n<ol>\n<li>\n<p><strong>训练策略</strong></p>\n</li>\n<li>\n<p><strong>优化器</strong>：SGD + Momentum 0.9，batch size 256，L2 weight decay $5 \\times 10^{-4}$</p>\n</li>\n<li><strong>学习率</strong>：初始 $10^{-2}$，验证精度停滞时除以10，共衰减3次，总训练370K iterations（74 epochs）</li>\n<li><strong>Dropout</strong>：0.5，应用于前两个FC层</li>\n<li><strong>权重初始化</strong>：随机 $\\mathcal{N}(0, 10^{-2})$，偏置初始化为0；深层网络用浅层网络A的权重预初始化</li>\n<li>\n<p><strong>数据增强</strong>：随机裁剪224×224、水平翻转、RGB颜色偏移</p>\n</li>\n<li>\n<p><strong>多尺度策略</strong></p>\n</li>\n<li>\n<p><strong>训练尺度</strong>：固定 $S=256$ 或 $S=384$，或随机 $S \\in [256, 512]$（scale jittering）</p>\n</li>\n<li><strong>测试尺度</strong>：固定S时 $Q={S-32, S, S+32}$；jittering时 $Q={256, 384, 512}$</li>\n<li><strong>Dense evaluation</strong>：FC层转为卷积层（$7\\times7$, $1\\times1$, $1\\times1$），对整图应用后空间平均池化</li>\n<li>\n<p><strong>Multi-crop</strong>：150 crops（5×5网格 × 2翻转 × 3尺度）</p>\n</li>\n<li>\n<p><strong>最终结果（ILSVRC-2014）</strong></p>\n</li>\n</ol>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>Top-5 Test Error</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>VGG 单模型 (E, dense+multi-crop)</td>\n<td>7.0%</td>\n</tr>\n<tr>\n<td>VGG 7模型集成 (竞赛提交)</td>\n<td>7.3%</td>\n</tr>\n<tr>\n<td>VGG 2模型集成 (D+E, 赛后)</td>\n<td><strong>6.8%</strong></td>\n</tr>\n<tr>\n<td>GoogLeNet 集成 (冠军)</td>\n<td>6.7%</td>\n</tr>\n<tr>\n<td>GoogLeNet 单模型</td>\n<td>7.9%</td>\n</tr>\n</tbody>\n</table></div>",
      "quiz": {
        "q": "VGGNet中三层3×3卷积相比一层7×7卷积的优势是什么？",
        "options": [
          "感受野更大",
          "参数更多，表达能力更强",
          "参数减少约45%，同时引入更多非线性变换",
          "计算速度更快但精度更低"
        ],
        "answer": 2,
        "explain": "三层3×3卷积与一层7×7卷积具有相同的7×7感受野，但参数量从49C²减少到27C²（约减少45%），同时引入了3个ReLU非线性激活，增强了网络的判别能力。"
      }
    },
    {
      "id": "googlenet",
      "num": 3,
      "name": "GoogLeNet",
      "fullName": "Inception V1网络 (Inception V1)",
      "year": "2014.09",
      "org": "Google",
      "parent": "alexnet",
      "paperUrl": "https://arxiv.org/abs/1409.4842",
      "projectUrl": "",
      "category": "cnn_classic",
      "motivation": "引入Inception模块，通过多尺度卷积并行提取特征",
      "summary": "GoogLeNet 提出了 Inception 模块，通过在同一层内并行执行多尺度卷积（\\(1 \\times 1\\)、\\(3 \\times 3\\)、\\(5 \\times 5\\)）并利用 \\(1 \\times 1\\) 卷积进行通道降维，在仅约 500 万参数的条件下构建了 22 层深度网络，以 6.67% 的 top-5 错误率赢得 ILSVRC 2014 分类冠军，比 AlexNet 参数量减少 12 倍的同时显著提升了精度。",
      "keyPoints": [
        "<strong>Inception 模块</strong>：在同一层内并行执行 <span class=\"kb-math kb-math-inline\">1 \\times 1</span>、<span class=\"kb-math kb-math-inline\">3 \\times 3</span>、<span class=\"kb-math kb-math-inline\">5 \\times 5</span> 卷积和 <span class=\"kb-math kb-math-inline\">3 \\times 3</span> 最大池化，拼接多尺度特征",
        "<strong><span class=\"kb-math kb-math-inline\">1 \\times 1</span> 卷积降维</strong>：在 <span class=\"kb-math kb-math-inline\">3 \\times 3</span> 和 <span class=\"kb-math kb-math-inline\">5 \\times 5</span> 卷积前插入 <span class=\"kb-math kb-math-inline\">1 \\times 1</span> 卷积瓶颈层，将计算量从不可承受降至可控范围",
        "<strong>22 层深度网络</strong>：包含 9 个 Inception 模块，仅约 500 万参数、15 亿次乘加运算，远少于同期 AlexNet（6000 万参数）",
        "<strong>辅助分类器</strong>：在网络中间层（inception(4a) 和 inception(4d)）接出两个辅助分类头，训练时以 0.3 权重加入总损失，缓解梯度消失，推理时丢弃",
        "<strong>全局平均池化替代全连接层</strong>：在最终分类前使用全局平均池化（<span class=\"kb-math kb-math-inline\">7 \\times 7</span> → <span class=\"kb-math kb-math-inline\">1 \\times 1</span>），大幅减少参数量，借鉴 Network in Network 思想",
        "<strong>多尺度测试与模型集成</strong>：测试时使用 4 种尺度 × 3 个裁剪区域 × 6 种裁剪方式 × 2（镜像）= 144 crops，7 个模型集成达到 6.67% top-5 错误率",
        "<strong>ILSVRC 2014 冠军</strong>：分类任务第一名（top-5 error 6.67%），检测任务也获得第一名（mAP 43.9%）",
        "<strong>设计哲学</strong>：受 Hebbian 原理和多尺度处理启发，在增加网络深度和宽度的同时保持计算预算恒定"
      ],
      "detail": "<h5>模型架构总览</h5>\n<p><img alt=\"Inception 模块（朴素版本）\" src=\"https://ar5iv.labs.arxiv.org/html/1409.4842/assets/x3.png\" />\n<em>图 (a)：Inception 模块朴素版本——在同一层内并行执行 <span class=\"kb-math kb-math-inline\">1 \\times 1</span>、<span class=\"kb-math kb-math-inline\">3 \\times 3</span>、<span class=\"kb-math kb-math-inline\">5 \\times 5</span> 卷积和 <span class=\"kb-math kb-math-inline\">3 \\times 3</span> 最大池化后拼接。</em></p>\n<p><img alt=\"Inception 模块（含降维）\" src=\"https://ar5iv.labs.arxiv.org/html/1409.4842/assets/x4.png\" />\n<em>图 (b)：实际使用的 Inception 模块——在 <span class=\"kb-math kb-math-inline\">3 \\times 3</span> 和 <span class=\"kb-math kb-math-inline\">5 \\times 5</span> 卷积前插入 <span class=\"kb-math kb-math-inline\">1 \\times 1</span> 瓶颈层降维，池化路径后也加 <span class=\"kb-math kb-math-inline\">1 \\times 1</span> 卷积控制通道数。</em></p>\n<p><img alt=\"GoogLeNet 完整网络架构\" src=\"https://ar5iv.labs.arxiv.org/html/1409.4842/assets/x5.png\" />\n<em>图：GoogLeNet 完整网络架构，包含 9 个 Inception 模块、2 个辅助分类器和全局平均池化分类头。</em></p>\n<p>GoogLeNet 完整架构由以下部分组成：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>层类型</th>\n<th>Patch/Stride</th>\n<th>输出尺寸</th>\n<th>参数量</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>卷积 7×7</td>\n<td>2 / 2</td>\n<td>112×112×64</td>\n<td>2.7K</td>\n</tr>\n<tr>\n<td>最大池化 3×3</td>\n<td>2</td>\n<td>56×56×64</td>\n<td>—</td>\n</tr>\n<tr>\n<td>卷积 3×3</td>\n<td>1 (reduce 64)</td>\n<td>56×56×192</td>\n<td>112K</td>\n</tr>\n<tr>\n<td>最大池化 3×3</td>\n<td>2</td>\n<td>28×28×192</td>\n<td>—</td>\n</tr>\n<tr>\n<td>Inception(3a)</td>\n<td>—</td>\n<td>28×28×256</td>\n<td>159K</td>\n</tr>\n<tr>\n<td>Inception(3b)</td>\n<td>—</td>\n<td>28×28×480</td>\n<td>380K</td>\n</tr>\n<tr>\n<td>最大池化 3×3</td>\n<td>2</td>\n<td>14×14×480</td>\n<td>—</td>\n</tr>\n<tr>\n<td>Inception(4a)</td>\n<td>—</td>\n<td>14×14×512</td>\n<td>364K</td>\n</tr>\n<tr>\n<td>Inception(4b)</td>\n<td>—</td>\n<td>14×14×512</td>\n<td>437K</td>\n</tr>\n<tr>\n<td>Inception(4c)</td>\n<td>—</td>\n<td>14×14×512</td>\n<td>463K</td>\n</tr>\n<tr>\n<td>Inception(4d)</td>\n<td>—</td>\n<td>14×14×528</td>\n<td>580K</td>\n</tr>\n<tr>\n<td>Inception(4e)</td>\n<td>—</td>\n<td>14×14×832</td>\n<td>840K</td>\n</tr>\n<tr>\n<td>最大池化 3×3</td>\n<td>2</td>\n<td>7×7×832</td>\n<td>—</td>\n</tr>\n<tr>\n<td>Inception(5a)</td>\n<td>—</td>\n<td>7×7×832</td>\n<td>1.07M</td>\n</tr>\n<tr>\n<td>Inception(5b)</td>\n<td>—</td>\n<td>7×7×1024</td>\n<td>1.39M</td>\n</tr>\n<tr>\n<td>全局平均池化 7×7</td>\n<td>1</td>\n<td>1×1×1024</td>\n<td>—</td>\n</tr>\n<tr>\n<td>Dropout (40%)</td>\n<td>—</td>\n<td>1×1×1024</td>\n<td>—</td>\n</tr>\n<tr>\n<td>线性 + Softmax</td>\n<td>—</td>\n<td>1×1×1000</td>\n<td>1M</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 <strong>关键</strong>：整个网络约 500 万参数，而 AlexNet 约 6000 万参数。参数量减少 12 倍的核心原因是用全局平均池化替代了大型全连接层，以及 <span class=\"kb-math kb-math-inline\">1 \\times 1</span> 卷积的降维设计。</div>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># Inception 模块伪代码\ndef inception_module(x, ch_1x1, ch_3x3_reduce, ch_3x3, ch_5x5_reduce, ch_5x5, ch_pool):\n    &quot;&quot;&quot;\n    x: 输入特征图 (B, C_in, H, W)\n    ch_1x1: 1×1 卷积输出通道数\n    ch_3x3_reduce: 3×3 卷积前的 1×1 降维通道数\n    ch_3x3: 3×3 卷积输出通道数\n    ch_5x5_reduce: 5×5 卷积前的 1×1 降维通道数\n    ch_5x5: 5×5 卷积输出通道数\n    ch_pool: 池化路径后 1×1 卷积输出通道数\n    &quot;&quot;&quot;\n    # 分支 1: 1×1 卷积\n    branch1 = conv2d(x, 1, ch_1x1) + ReLU\n\n    # 分支 2: 1×1 降维 → 3×3 卷积\n    branch2 = conv2d(x, 1, ch_3x3_reduce) + ReLU\n    branch2 = conv2d(branch2, 3, ch_3x3, padding=1) + ReLU\n\n    # 分支 3: 1×1 降维 → 5×5 卷积\n    branch3 = conv2d(x, 1, ch_5x5_reduce) + ReLU\n    branch3 = conv2d(branch3, 5, ch_5x5, padding=2) + ReLU\n\n    # 分支 4: 3×3 最大池化 → 1×1 卷积\n    branch4 = max_pool2d(x, 3, stride=1, padding=1)\n    branch4 = conv2d(branch4, 1, ch_pool) + ReLU\n\n    # 拼接所有分支\n    output = concat([branch1, branch2, branch3, branch4], dim=channel)\n    return output  # (B, ch_1x1+ch_3x3+ch_5x5+ch_pool, H, W)\n\n\n# GoogLeNet 完整前向传播\ndef googlenet_forward(image):\n    # 前端: 常规卷积 + 池化\n    x = ReLU(conv2d(image, 7, 64, stride=2, pad=3))     # 112×112×64\n    x = max_pool(x, 3, stride=2)                          # 56×56×64\n    x = ReLU(conv2d(x, 1, 64))                            # 56×56×64 (1×1 reduce)\n    x = ReLU(conv2d(x, 3, 192, pad=1))                    # 56×56×192\n    x = max_pool(x, 3, stride=2)                           # 28×28×192\n\n    # Inception 模块堆叠\n    x = inception_3a(x)  # 28×28×256\n    x = inception_3b(x)  # 28×28×480\n    x = max_pool(x, 3, stride=2)  # 14×14×480\n\n    x = inception_4a(x)  # 14×14×512\n    aux1 = auxiliary_classifier(x)  # 辅助分类器 1\n    x = inception_4b(x)  # 14×14×512\n    x = inception_4c(x)  # 14×14×512\n    x = inception_4d(x)  # 14×14×528\n    aux2 = auxiliary_classifier(x)  # 辅助分类器 2\n    x = inception_4e(x)  # 14×14×832\n    x = max_pool(x, 3, stride=2)  # 7×7×832\n\n    x = inception_5a(x)  # 7×7×832\n    x = inception_5b(x)  # 7×7×1024\n\n    # 分类头\n    x = global_avg_pool(x)   # 1×1×1024\n    x = dropout(x, 0.4)\n    logits = linear(x, 1000)\n    return logits, aux1, aux2\n</code></pre>\n<h5>动机与背景</h5>\n<p>在 GoogLeNet 提出之前，提升深度神经网络性能的最直接方式是增加网络的<strong>深度</strong>（层数）和<strong>宽度</strong>（每层通道数）。然而，这种暴力扩展面临两个根本性问题：</p>\n<ol>\n<li><strong>参数爆炸与过拟合</strong>：更大的网络意味着更多参数，在标注数据有限的情况下极易过拟合。ILSVRC 数据集虽有 120 万训练图像，但对于拥有数千万参数的网络而言仍显不足。</li>\n<li><strong>计算资源瓶颈</strong>：均匀增加卷积核数量会导致计算量平方级增长。例如，两个连续卷积层的通道数同时翻倍，计算量将增加 4 倍。</li>\n</ol>\n<p>GoogLeNet 的核心思路是：<strong>将密集的全连接结构替换为稀疏的局部连接结构</strong>，同时利用现有硬件对密集矩阵运算的高效支持。这一思想源自 Arora 等人的理论工作——如果数据集的概率分布可以被一个大型稀疏深度网络表示，那么最优网络拓扑可以通过逐层分析上一层激活值的相关统计量来构建。</p>\n<div class=\"key-point\">💡 <strong>关键直觉</strong>：在视觉网络中，同一区域的特征可能需要在不同尺度上被捕获——有些特征是局部的（小卷积核），有些是更大范围的（大卷积核）。Inception 模块通过并行多尺度卷积，让网络自动学习在每个位置使用哪种尺度的特征。</div>\n<h5>核心机制详解</h5>\n<p><strong>1. Inception 模块 — 多尺度特征并行提取</strong></p>\n<p>Inception 模块的朴素版本在同一层内并行执行四种操作：</p>\n<div class=\"kb-math kb-math-display\">\\text{Output} = \\text{Concat}\\left[\\text{Conv}_{1\\times1}(x),\\ \\text{Conv}_{3\\times3}(x),\\ \\text{Conv}_{5\\times5}(x),\\ \\text{MaxPool}_{3\\times3}(x)\\right]</div>\n<p>这种设计的理论依据是：对于图像中的某个局部区域，其最优特征表示可能存在于不同的感受野尺度上。<span class=\"kb-math kb-math-inline\">1 \\times 1</span> 卷积捕获点级特征（通道间相关性），<span class=\"kb-math kb-math-inline\">3 \\times 3</span> 捕获小范围空间特征，<span class=\"kb-math kb-math-inline\">5 \\times 5</span> 捕获更大范围的空间特征，而最大池化则提供了一种非线性的下采样路径。</p>\n<p>然而，朴素版本存在严重的<strong>计算瓶颈</strong>：当输入通道数较大时，<span class=\"kb-math kb-math-inline\">5 \\times 5</span> 卷积的计算量极其庞大。例如，对于 <span class=\"kb-math kb-math-inline\">28 \\times 28 \\times 192</span> 的输入，直接使用 32 个 <span class=\"kb-math kb-math-inline\">5 \\times 5</span> 卷积核需要约 1.2 亿次乘法运算。</p>\n<p><strong>2. <span class=\"kb-math kb-math-inline\">1 \\times 1</span> 卷积降维 — 计算效率的关键</strong></p>\n<p>解决方案是在昂贵的卷积操作前插入 <span class=\"kb-math kb-math-inline\">1 \\times 1</span> 卷积作为瓶颈层：</p>\n<div class=\"kb-math kb-math-display\">\\text{Branch}_{3\\times3} = \\text{Conv}_{3\\times3}\\left(\\text{ReLU}\\left(\\text{Conv}_{1\\times1}^{\\text{reduce}}(x)\\right)\\right)</div>\n<div class=\"kb-math kb-math-display\">\\text{Branch}_{5\\times5} = \\text{Conv}_{5\\times5}\\left(\\text{ReLU}\\left(\\text{Conv}_{1\\times1}^{\\text{reduce}}(x)\\right)\\right)</div>\n<p>以 Inception(3a) 为例，输入为 <span class=\"kb-math kb-math-inline\">28 \\times 28 \\times 192</span>：\n- <span class=\"kb-math kb-math-inline\">5 \\times 5</span> 分支：先用 16 个 <span class=\"kb-math kb-math-inline\">1 \\times 1</span> 卷积将通道从 192 降至 16，再用 32 个 <span class=\"kb-math kb-math-inline\">5 \\times 5</span> 卷积。计算量从 1.2 亿降至约 1200 万次乘法，<strong>减少约 10 倍</strong>。\n- <span class=\"kb-math kb-math-inline\">3 \\times 3</span> 分支：先用 96 个 <span class=\"kb-math kb-math-inline\">1 \\times 1</span> 卷积将通道从 192 降至 96，再用 128 个 <span class=\"kb-math kb-math-inline\">3 \\times 3</span> 卷积。</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：<span class=\"kb-math kb-math-inline\">1 \\times 1</span> 卷积不仅仅是降维工具，它后面跟随 ReLU 激活函数，因此也引入了额外的非线性变换能力，这一思想直接来源于 Lin 等人的 Network in Network。</div>\n<p><strong>3. 辅助分类器 — 对抗梯度消失</strong></p>\n<p>22 层的深度网络在 2014 年面临严重的梯度消失问题。GoogLeNet 在网络中间位置引入了两个辅助分类器，其结构为：</p>\n<ol>\n<li><span class=\"kb-math kb-math-inline\">5 \\times 5</span> 平均池化（stride 3）→ <span class=\"kb-math kb-math-inline\">4 \\times 4 \\times 512/528</span> 特征图</li>\n<li><span class=\"kb-math kb-math-inline\">1 \\times 1 \\times 128</span> 卷积 + ReLU</li>\n<li>全连接层（1024 个节点）+ ReLU + Dropout(70%)</li>\n<li>全连接层（1000 个节点）+ Softmax</li>\n</ol>\n<p>训练时的总损失函数为：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{total}} = \\mathcal{L}_{\\text{main}} + 0.3 \\times \\mathcal{L}_{\\text{aux1}} + 0.3 \\times \\mathcal{L}_{\\text{aux2}}</div>\n<p>辅助分类器的作用是在网络中间层注入额外的梯度信号，帮助浅层参数获得有效的梯度更新。在推理阶段，辅助分类器被完全丢弃。</p>\n<div class=\"key-point\">💡 <strong>关键</strong>：后续研究（Inception V3 论文）发现辅助分类器的主要作用更像是<strong>正则化器</strong>而非梯度辅助工具，因为移除辅助分类器对最终精度的影响很小，但它们确实加速了训练初期的收敛。</div>\n<p><strong>4. 全局平均池化 — 参数量的决定性削减</strong></p>\n<p>在 GoogLeNet 之前，AlexNet 和 VGGNet 在最后的卷积层之后使用多个大型全连接层（如 4096-4096-1000），这些全连接层占据了绝大部分参数。GoogLeNet 采用了 Network in Network 提出的全局平均池化策略：</p>\n<div class=\"kb-math kb-math-display\">\\text{GAP}(x)_c = \\frac{1}{H \\times W} \\sum_{i=1}^{H} \\sum_{j=1}^{W} x_{c,i,j}</div>\n<p>将 <span class=\"kb-math kb-math-inline\">7 \\times 7 \\times 1024</span> 的特征图直接压缩为 <span class=\"kb-math kb-math-inline\">1 \\times 1 \\times 1024</span> 的向量，然后仅通过一个线性层映射到 1000 类。这使得分类头的参数量从数千万降至约 100 万。</p>\n<h5>训练与推理策略</h5>\n<p><strong>训练配置</strong>：\n- <strong>优化器</strong>：异步随机梯度下降（Async SGD），动量 0.9\n- <strong>学习率</strong>：固定衰减策略，每 8 个 epoch 降低 4%\n- <strong>推理模型</strong>：使用 Polyak 平均生成最终推理模型\n- <strong>数据增强</strong>：随机裁剪图像面积的 8%~100%，宽高比在 <span class=\"kb-math kb-math-inline\">3/4</span> 到 <span class=\"kb-math kb-math-inline\">4/3</span> 之间随机选择；Andrew Howard 的光度失真；随机插值方法（双线性、面积、最近邻、三次，等概率）</p>\n<p><strong>测试策略</strong>：\n- 将图像缩放到 4 种尺度（短边分别为 256、288、320、352）\n- 每种尺度取左、中、右（或上、中、下）3 个正方形区域\n- 每个区域取 4 角 + 中心共 5 个 <span class=\"kb-math kb-math-inline\">224 \\times 224</span> 裁剪 + 1 个缩放裁剪\n- 每个裁剪取镜像\n- 总计 <span class=\"kb-math kb-math-inline\">4 \\times 3 \\times 6 \\times 2 = 144</span> 个裁剪\n- 7 个模型集成，对所有裁剪的 softmax 概率取平均</p>\n<h5>与传统方法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方面</th>\n<th>AlexNet (2012)</th>\n<th>VGGNet (2014)</th>\n<th><strong>GoogLeNet (2014)</strong></th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>深度</td>\n<td>8 层</td>\n<td>16/19 层</td>\n<td><strong>22 层</strong></td>\n</tr>\n<tr>\n<td>参数量</td>\n<td>~60M</td>\n<td>~138M</td>\n<td><strong>~5M</strong></td>\n</tr>\n<tr>\n<td>计算量</td>\n<td>~0.7B MACs</td>\n<td>~15.5B MACs</td>\n<td><strong>~1.5B MACs</strong></td>\n</tr>\n<tr>\n<td>Top-5 错误率</td>\n<td>16.4%</td>\n<td>7.3%</td>\n<td><strong>6.67%</strong></td>\n</tr>\n<tr>\n<td>核心思想</td>\n<td>ReLU + Dropout + GPU</td>\n<td>小卷积核堆叠</td>\n<td><strong>多尺度并行 + 降维</strong></td>\n</tr>\n<tr>\n<td>全连接层</td>\n<td>3 个大型 FC</td>\n<td>3 个大型 FC</td>\n<td><strong>全局平均池化</strong></td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 <strong>关键</strong>：GoogLeNet 用 AlexNet 1/12 的参数量和 VGGNet 1/10 的计算量，取得了更好的分类精度。这证明了精心设计的网络拓扑比简单增加网络规模更加有效。</div>\n<h5>实验结果</h5>\n<p>在 ILSVRC 2014 分类任务中：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>模型配置</th>\n<th>Top-5 错误率</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>单模型，单裁剪</td>\n<td>10.07%</td>\n</tr>\n<tr>\n<td>单模型，多裁剪</td>\n<td>~9%</td>\n</tr>\n<tr>\n<td>7 模型集成，144 裁剪</td>\n<td><strong>6.67%</strong></td>\n</tr>\n<tr>\n<td>第二名 (VGGNet)</td>\n<td>7.3%</td>\n</tr>\n<tr>\n<td>上一年冠军 (Clarifai)</td>\n<td>11.7%</td>\n</tr>\n</tbody>\n</table></div>\n<p>GoogLeNet 同时在检测任务中以 43.9% mAP 获得第一名，采用了多区域方法与 CNN 分类器的组合，而非传统的 R-CNN 方法。</p>",
      "quiz": {
        "q": "GoogLeNet 的 Inception 模块中，在 3×3 和 5×5 卷积前使用 1×1 卷积的主要目的是什么？",
        "options": [
          "增加网络的非线性表达能力",
          "减少输入通道数以降低后续卷积的计算量",
          "实现跨通道的特征融合以替代全连接层",
          "对输入特征图进行空间下采样"
        ],
        "answer": 1,
        "explain": "1×1 卷积作为瓶颈层，将输入通道数从较大值（如 192）降至较小值（如 16 或 96），使得后续昂贵的 3×3/5×5 卷积的计算量减少约 10 倍。虽然 1×1 卷积也引入了非线性（选项 A），但其在 Inception 模块中的主要设计目的是降维以控制计算成本。"
      }
    },
    {
      "id": "resnet",
      "num": 4,
      "name": "ResNet",
      "fullName": "深度残差网络 (Deep Residual Network)",
      "year": "2015.12",
      "org": "微软亚洲研究院",
      "parent": "vggnet",
      "paperUrl": "https://arxiv.org/abs/1512.03385",
      "projectUrl": "",
      "category": "cnn_classic",
      "motivation": "提出残差连接解决深层网络退化问题",
      "summary": "ResNet 通过引入恒等快捷连接(identity shortcut connection)，让网络学习残差映射 \\(\\mathcal{F}(\\mathbf{x}) = \\mathcal{H}(\\mathbf{x}) - \\mathbf{x}\\) 而非直接映射，从根本上解决了深层网络的退化(degradation)问题，使训练152层甚至1000+层网络成为可能，以3.57% top-5错误率赢得ILSVRC 2015冠军。",
      "keyPoints": [
        "发现并定义<strong>退化问题(Degradation Problem)</strong>：深层plain网络的训练误差反而高于浅层网络，这不是过拟合而是优化困难",
        "提出<strong>残差学习框架</strong>：通过shortcut connection让网络学习残差函数 <span class=\"kb-math kb-math-inline\">\\mathcal{F}(\\mathbf{x}) + \\mathbf{x}</span>，极大降低优化难度",
        "设计<strong>Bottleneck结构</strong>：1×1-3×3-1×1卷积组合，ResNet-152(11.3B FLOPs)比VGG-16(15.3B FLOPs)更深但计算量更低",
        "三种shortcut方案对比：Option A(零填充)、B(投影shortcut用于维度变化)、C(全投影)，证明identity shortcut即可解决退化",
        "提供5种深度变体：ResNet-18/34(BasicBlock)、ResNet-50/101/152(Bottleneck)",
        "ImageNet集成3.57% top-5错误率；单模型ResNet-152达4.49% top-5；COCO检测28%相对提升"
      ],
      "detail": "<h5>核心架构示意图</h5>\n<p><img alt=\"ResNet残差学习基本单元\" src=\"https://ar5iv.labs.arxiv.org/html/1512.03385/assets/x2.png\" />\n<em>图：残差学习Building Block。输入 x 通过shortcut直接加到输出上，网络只需学习残差 F(x)</em></p>\n<p><img alt=\"ResNet网络架构对比\" src=\"https://ar5iv.labs.arxiv.org/html/1512.03385/assets/x3.png\" />\n<em>图：VGG-19(左)、34层Plain网络(中)、34层ResNet(右)的架构对比。虚线shortcut表示维度变化处使用投影</em></p>\n<p><img alt=\"BasicBlock与Bottleneck对比\" src=\"https://ar5iv.labs.arxiv.org/html/1512.03385/assets/x5.png\" />\n<em>图：左为ResNet-34使用的BasicBlock(两层3×3)，右为ResNet-50/101/152使用的Bottleneck(1×1降维→3×3→1×1升维)</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># ResNet 前向传播核心逻辑\n\nclass BasicBlock:\n    &quot;&quot;&quot;ResNet-18/34 使用的基本残差块&quot;&quot;&quot;\n    def forward(self, x):\n        identity = x\n        # 主路径: 两层3×3卷积\n        out = relu(bn(conv3x3(x)))      # 第一层\n        out = bn(conv3x3(out))           # 第二层(激活前)\n        # 维度不匹配时使用1×1投影\n        if need_downsample:\n            identity = bn(conv1x1_stride2(x))\n        # 残差连接 + 激活\n        out = relu(out + identity)\n        return out\n\nclass Bottleneck:\n    &quot;&quot;&quot;ResNet-50/101/152 使用的瓶颈残差块&quot;&quot;&quot;\n    def forward(self, x):\n        identity = x\n        # 主路径: 1×1降维 → 3×3卷积 → 1×1升维\n        out = relu(bn(conv1x1(x)))       # 降维(256→64)\n        out = relu(bn(conv3x3(out)))     # 空间卷积\n        out = bn(conv1x1(out))           # 升维(64→256)\n        # 维度不匹配时使用1×1投影\n        if need_downsample:\n            identity = bn(conv1x1_stride2(x))\n        # 残差连接 + 激活\n        out = relu(out + identity)\n        return out\n\nclass ResNet:\n    &quot;&quot;&quot;整体网络结构&quot;&quot;&quot;\n    def forward(self, x):\n        # Stage 0: 初始卷积\n        x = relu(bn(conv7x7_stride2(x)))  # 224→112\n        x = maxpool3x3_stride2(x)          # 112→56\n        # Stage 1-4: 残差块堆叠\n        x = layer1(x)  # 56×56,  64通道(BasicBlock) / 256通道(Bottleneck)\n        x = layer2(x)  # 28×28, 128通道 / 512通道\n        x = layer3(x)  # 14×14, 256通道 / 1024通道\n        x = layer4(x)  #  7×7,  512通道 / 2048通道\n        # 分类头\n        x = global_avg_pool(x)  # 7×7→1×1\n        x = fc_1000(x)\n        return softmax(x)\n</code></pre>\n<h5>动机与背景</h5>\n<p>深度学习的核心假设是\"更深的网络能学到更好的表示\"。VGGNet证明了16-19层网络的有效性，但当研究者尝试进一步加深网络时，遇到了一个反直觉的现象：<strong>56层的plain网络在训练集上的误差竟然高于20层网络</strong>。</p>\n<p>这不是过拟合（过拟合应该是训练误差低但测试误差高），而是一个纯粹的优化问题。理论上，深层网络至少可以通过让额外层学习恒等映射来达到与浅层网络相同的性能，但实际的SGD优化器无法找到这样的解。</p>\n<div class=\"key-point\">💡 关键洞察：退化问题的本质是——对于标准网络，学习恒等映射（什么都不做）反而是困难的，因为非线性层的堆叠天然倾向于将信号变换为非恒等的形式。</div>\n<h5>核心机制：残差学习</h5>\n<p>ResNet的核心思想极为简洁：与其让网络直接学习目标映射 <span class=\"kb-math kb-math-inline\">\\mathcal{H}(\\mathbf{x})</span>，不如让网络学习<strong>残差</strong> <span class=\"kb-math kb-math-inline\">\\mathcal{F}(\\mathbf{x}) := \\mathcal{H}(\\mathbf{x}) - \\mathbf{x}</span>。</p>\n<p>最终输出通过加法重构：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{y} = \\mathcal{F}(\\mathbf{x}, \\{W_i\\}) + \\mathbf{x}</div>\n<p><strong>为什么这样设计有效？</strong></p>\n<ol>\n<li><strong>优化简化</strong>：如果最优映射接近恒等，网络只需将 <span class=\"kb-math kb-math-inline\">\\mathcal{F}</span> 推向零（所有权重趋近零即可），而不需要通过非线性层拟合恒等函数</li>\n<li><strong>梯度高速公路</strong>：反向传播时，梯度可以通过shortcut无衰减地直接传回浅层：<span class=\"kb-math kb-math-inline\">\\frac{\\partial \\mathbf{y}}{\\partial \\mathbf{x}} = \\frac{\\partial \\mathcal{F}}{\\partial \\mathbf{x}} + \\mathbf{I}</span>，恒等项 <span class=\"kb-math kb-math-inline\">\\mathbf{I}</span> 保证梯度不会消失</li>\n<li><strong>信息保持</strong>：输入信息通过shortcut无损传递，避免在多层变换中丢失</li>\n</ol>\n<p>当输入输出维度不匹配时（通道数翻倍、空间尺寸减半），使用线性投影：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{y} = \\mathcal{F}(\\mathbf{x}, \\{W_i\\}) + W_s\\mathbf{x}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">W_s</span> 为1×1卷积（stride=2实现下采样）。</p>\n<h5>架构设计细节</h5>\n<p><strong>整体设计哲学</strong>（继承自VGGNet）：\n- 对于相同输出特征图尺寸的层，使用相同数量的滤波器\n- 特征图尺寸减半时，滤波器数量翻倍（保持每层计算复杂度相近）\n- 下采样通过stride=2的卷积实现</p>\n<p><strong>各变体配置</strong>：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>模型</th>\n<th>Block类型</th>\n<th>各Stage块数</th>\n<th>参数量</th>\n<th>FLOPs</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>ResNet-18</td>\n<td>BasicBlock</td>\n<td>[2, 2, 2, 2]</td>\n<td>11.7M</td>\n<td>1.8B</td>\n</tr>\n<tr>\n<td>ResNet-34</td>\n<td>BasicBlock</td>\n<td>[3, 4, 6, 3]</td>\n<td>21.8M</td>\n<td>3.6B</td>\n</tr>\n<tr>\n<td>ResNet-50</td>\n<td>Bottleneck</td>\n<td>[3, 4, 6, 3]</td>\n<td>25.6M</td>\n<td>3.8B</td>\n</tr>\n<tr>\n<td>ResNet-101</td>\n<td>Bottleneck</td>\n<td>[3, 4, 23, 3]</td>\n<td>44.5M</td>\n<td>7.6B</td>\n</tr>\n<tr>\n<td>ResNet-152</td>\n<td>Bottleneck</td>\n<td>[3, 8, 36, 3]</td>\n<td>60.2M</td>\n<td>11.3B</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"warn-box\">⚠️ 注意：ResNet-50与ResNet-34的Block数配置相同[3,4,6,3]，但因使用Bottleneck(3层/block)替代BasicBlock(2层/block)，总层数从34增至50。Bottleneck的1×1卷积先将通道降为1/4再升回，使得3×3卷积的计算量大幅减少。</div>\n<p><strong>训练配置</strong>：\n- SGD, momentum=0.9, weight decay=0.0001\n- Batch size=256, 初始lr=0.1, 误差平台时÷10\n- 60×10⁴ 迭代，不使用Dropout\n- He初始化，BN在每个conv后、ReLU前\n- 数据增强：随机裁剪224×224 + 水平翻转 + PCA颜色增强</p>\n<h5>与传统方法的区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>对比维度</th>\n<th>Plain深层网络</th>\n<th>Highway Networks</th>\n<th>ResNet</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>深度扩展</td>\n<td>退化，无法有效训练</td>\n<td>门控机制，可训练深层</td>\n<td>identity shortcut，简洁高效</td>\n</tr>\n<tr>\n<td>额外参数</td>\n<td>无</td>\n<td>门控参数（参数量翻倍）</td>\n<td>无（identity）或极少（投影）</td>\n</tr>\n<tr>\n<td>shortcut类型</td>\n<td>无</td>\n<td>门控：<span class=\"kb-math kb-math-inline\">T \\cdot H + (1-T) \\cdot x</span></td>\n<td>恒等：<span class=\"kb-math kb-math-inline\">F + x</span></td>\n</tr>\n<tr>\n<td>信息流</td>\n<td>逐层衰减</td>\n<td>门控调节</td>\n<td>无损直通</td>\n</tr>\n<tr>\n<td>实际深度</td>\n<td>≤30层有效</td>\n<td>~100层</td>\n<td>152层(ImageNet), 1202层(CIFAR)</td>\n</tr>\n</tbody>\n</table></div>\n<h5>实验验证</h5>\n<p><strong>退化问题验证</strong>（ImageNet, 10-crop）：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>网络</th>\n<th>plain-18</th>\n<th>plain-34</th>\n<th>ResNet-18</th>\n<th>ResNet-34</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Top-1 Error</td>\n<td>27.94%</td>\n<td>28.54%↑</td>\n<td>27.88%</td>\n<td>25.03%↓</td>\n</tr>\n</tbody>\n</table></div>\n<p>Plain网络加深后性能下降，ResNet加深后性能显著提升——退化问题被解决。</p>\n<p><strong>深度收益</strong>（单模型，多尺度测试）：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>模型</th>\n<th>Top-1 Error</th>\n<th>Top-5 Error</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>ResNet-34 C</td>\n<td>21.53%</td>\n<td>5.60%</td>\n</tr>\n<tr>\n<td>ResNet-50</td>\n<td>20.74%</td>\n<td>5.25%</td>\n</tr>\n<tr>\n<td>ResNet-101</td>\n<td>19.87%</td>\n<td>4.60%</td>\n</tr>\n<tr>\n<td>ResNet-152</td>\n<td><strong>19.38%</strong></td>\n<td><strong>4.49%</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>集成结果</strong>：6模型集成在ImageNet测试集达到<strong>3.57%</strong> top-5错误率，赢得ILSVRC 2015分类冠军。</p>",
      "quiz": {
        "q": "ResNet中退化问题(degradation problem)的本质是什么？",
        "options": [
          "深层网络发生了严重的过拟合",
          "梯度消失导致深层网络无法收敛",
          "优化器难以在深层网络中找到不差于浅层网络的解",
          "深层网络的参数量过大导致内存不足"
        ],
        "answer": 2,
        "explain": "退化问题表现为深层网络的训练误差(非测试误差)高于浅层网络，排除了过拟合；BN已解决梯度消失；本质是SGD优化器在高维损失面中搜索困难，无法找到理论上存在的恒等映射解。"
      }
    },
    {
      "id": "densenet",
      "num": 5,
      "name": "DenseNet",
      "fullName": "密集连接卷积网络 (Densely Connected Convolutional Network)",
      "year": "2017.07",
      "org": "康奈尔大学",
      "parent": "resnet",
      "paperUrl": "https://arxiv.org/abs/1608.06993",
      "projectUrl": "",
      "category": "cnn_classic",
      "motivation": "通过特征拼接实现每层与之前所有层的密集连接",
      "summary": "DenseNet 提出了密集连接机制，将每一层与所有前序层通过特征拼接（concatenation）直接相连，实现了最大化的特征复用和信息流通，在显著减少参数量的同时超越了 ResNet 等架构的分类性能。",
      "keyPoints": [
        "<strong>密集连接（Dense Connectivity）</strong>：每层接收所有前序层的特征图作为输入，网络中共有 <span class=\"kb-math kb-math-inline\">L(L+1)/2</span> 条连接（L 为层数）",
        "<strong>增长率（Growth Rate, k）</strong>：每层仅产生 k 个新特征图，k 可以很小（如 12），网络通过累积实现丰富表示",
        "<strong>特征拼接而非相加</strong>：与 ResNet 的逐元素加法不同，DenseNet 使用 channel 维度的 concatenation 保留所有前序特征",
        "<strong>Bottleneck 层（DenseNet-B）</strong>：引入 1×1 卷积将输入压缩到 4k 个通道，再接 3×3 卷积输出 k 个通道",
        "<strong>Transition 层与压缩（DenseNet-C）</strong>：在 Dense Block 之间使用 1×1 卷积 + 2×2 平均池化进行下采样，压缩因子 θ=0.5",
        "<strong>隐式深度监督</strong>：短连接使损失信号可直接传播到浅层，天然缓解梯度消失",
        "<strong>参数高效</strong>：DenseNet-BC（L=100, k=12）仅用 0.8M 参数即可匹敌 1001 层 ResNet（10.2M 参数）的性能"
      ],
      "detail": "<h5>核心架构示意图</h5>\n<p><img alt=\"DenseNet 5层Dense Block示意图\" src=\"https://ar5iv.labs.arxiv.org/html/1608.06993/assets/x1.png\" />\n<em>图1：一个 5 层的 Dense Block（growth rate k=4）。每层以所有前序层的特征图拼接作为输入。</em></p>\n<p><img alt=\"DenseNet 整体架构\" src=\"https://ar5iv.labs.arxiv.org/html/1608.06993/assets/x2.png\" />\n<em>图2：包含 3 个 Dense Block 的 DenseNet 架构。相邻 Block 之间的 Transition 层负责下采样和通道压缩。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># DenseNet Forward Pass (单个 Dense Block)\ndef dense_block_forward(x0, layers, growth_rate_k):\n    &quot;&quot;&quot;\n    x0: 初始输入特征图\n    layers: Dense Block 中的层数 L\n    &quot;&quot;&quot;\n    features = [x0]\n    for l in range(layers):\n        # 拼接所有前序层的输出\n        input_l = concatenate(features, dim='channel')  # [x0, x1, ..., x_{l-1}]\n        # Bottleneck: BN -&gt; ReLU -&gt; 1x1 Conv (输出 4k 通道)\n        out = batch_norm(input_l)\n        out = relu(out)\n        out = conv1x1(out, filters=4 * growth_rate_k)\n        # 主卷积: BN -&gt; ReLU -&gt; 3x3 Conv (输出 k 通道)\n        out = batch_norm(out)\n        out = relu(out)\n        out = conv3x3(out, filters=growth_rate_k)\n        features.append(out)\n    return concatenate(features, dim='channel')\n\n# Transition Layer\ndef transition_layer(x, compression_theta=0.5):\n    m = x.channels\n    x = batch_norm(x)\n    x = conv1x1(x, filters=int(m * compression_theta))\n    x = avg_pool_2x2(x)\n    return x\n</code></pre>\n<h5>动机与背景</h5>\n<p>随着深度网络层数增加，输入信息和梯度在逐层传播过程中可能逐渐\"消失\"。ResNet 通过跳跃连接（shortcut）缓解了这一问题，但其采用的<strong>逐元素相加</strong>方式可能阻碍网络中的信息流动——因为恒等映射和非线性变换的输出被混合在一起，后续层无法区分二者。</p>\n<p>DenseNet 的核心洞察是：<strong>确保网络中各层之间的最大信息流通</strong>。为此，每一层都直接连接到所有后续层，形成密集连接模式。</p>\n<h5>核心机制详解</h5>\n<p><strong>1. 密集连接公式</strong></p>\n<p>传统前馈网络第 <span class=\"kb-math kb-math-inline\">l</span> 层的输出为：</p>\n<div class=\"kb-math kb-math-display\">x_l = H_l(x_{l-1})</div>\n<p>ResNet 引入跳跃连接：</p>\n<div class=\"kb-math kb-math-display\">x_l = H_l(x_{l-1}) + x_{l-1}</div>\n<p>DenseNet 将所有前序层的输出拼接后作为输入：</p>\n<div class=\"kb-math kb-math-display\">x_l = H_l([x_0, x_1, \\ldots, x_{l-1}])</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">[x_0, x_1, \\ldots, x_{l-1}]</span> 表示第 0 到 <span class=\"kb-math kb-math-inline\">l-1</span> 层输出特征图在 channel 维度的拼接。</p>\n<div class=\"key-point\">💡 关键：拼接（concatenation）而非相加（addition）是 DenseNet 的本质区别。拼接保留了每一层的原始特征，使后续层可以选择性地复用任意前序层的信息。</div>\n<p><strong>2. 增长率（Growth Rate）</strong></p>\n<p>每个 <span class=\"kb-math kb-math-inline\">H_l</span> 产生 <span class=\"kb-math kb-math-inline\">k</span> 个特征图，则第 <span class=\"kb-math kb-math-inline\">l</span> 层的输入通道数为：</p>\n<div class=\"kb-math kb-math-display\">k_0 + k \\times (l - 1)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">k_0</span> 是初始输入通道数。虽然 DenseNet 层数很深，但 <span class=\"kb-math kb-math-inline\">k</span> 可以很小（如 k=12），因为每层可以访问所有前序特征（\"集体知识\"），无需在单层中重复学习冗余特征。</p>\n<div class=\"key-point\">💡 关键：增长率 k 可理解为每层对网络\"全局状态\"的新增贡献量。小 k 即可实现高性能，这是 DenseNet 参数高效的根本原因。</div>\n<p><strong>3. Bottleneck 层（DenseNet-B）</strong></p>\n<p>随着层数增加，拼接后的输入通道数线性增长。为控制计算量，在 3×3 卷积前引入 1×1 卷积进行降维：</p>\n<div class=\"kb-math kb-math-display\">H_l = \\text{BN} \\to \\text{ReLU} \\to \\text{Conv}(1\\times1, 4k) \\to \\text{BN} \\to \\text{ReLU} \\to \\text{Conv}(3\\times3, k)</div>\n<p>1×1 卷积将输入压缩到 4k 个通道，有效减少了 3×3 卷积的计算开销。</p>\n<p><strong>4. Transition 层与压缩（DenseNet-C）</strong></p>\n<p>Dense Block 之间的 Transition 层负责：\n- 通过 1×1 卷积进行通道压缩（压缩因子 <span class=\"kb-math kb-math-inline\">\\theta \\in (0, 1]</span>，论文取 <span class=\"kb-math kb-math-inline\">\\theta = 0.5</span>）\n- 通过 2×2 平均池化进行空间下采样</p>\n<p>当同时使用 Bottleneck 和 Compression 时，称为 <strong>DenseNet-BC</strong>。</p>\n<p><strong>5. 特征复用分析</strong></p>\n<p>论文通过可视化各层对前序层特征的平均绝对权重，验证了密集连接确实实现了特征复用：\n- 浅层特征被深层广泛使用（而非仅被相邻层使用）\n- Transition 层之后的第一层对前一个 Dense Block 的所有层都有较高权重\n- 最终分类层也会利用浅层特征，说明低级特征对最终决策有直接贡献</p>\n<p><img alt=\"特征复用热力图\" src=\"https://ar5iv.labs.arxiv.org/html/1608.06993/assets/x7.png\" />\n<em>图5：训练后的 DenseNet 各层卷积权重的平均绝对值热力图，颜色越深表示对该前序层特征的依赖越强。</em></p>\n<h5>训练细节</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>配置项</th>\n<th>CIFAR/SVHN</th>\n<th>ImageNet</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>优化器</td>\n<td>SGD (Nesterov momentum=0.9)</td>\n<td>SGD (Nesterov momentum=0.9)</td>\n</tr>\n<tr>\n<td>Batch size</td>\n<td>64</td>\n<td>256</td>\n</tr>\n<tr>\n<td>初始学习率</td>\n<td>0.1</td>\n<td>0.1</td>\n</tr>\n<tr>\n<td>学习率衰减</td>\n<td>在 50%、75% epoch 时 ÷10</td>\n<td>在 epoch 30、60 时 ÷10</td>\n</tr>\n<tr>\n<td>总 epoch</td>\n<td>300 (CIFAR) / 40 (SVHN)</td>\n<td>90</td>\n</tr>\n<tr>\n<td>Weight decay</td>\n<td><span class=\"kb-math kb-math-inline\">10^{-4}</span></td>\n<td><span class=\"kb-math kb-math-inline\">10^{-4}</span></td>\n</tr>\n<tr>\n<td>Dropout</td>\n<td>0.2（无数据增强时）</td>\n<td>—</td>\n</tr>\n</tbody>\n</table></div>\n<h5>ImageNet 架构配置</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>模型</th>\n<th>层数</th>\n<th>Dense Block 配置 (6,12,24,16)</th>\n<th>参数量</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>DenseNet-121</td>\n<td>121</td>\n<td>6, 12, 24, 16</td>\n<td>8.0M</td>\n</tr>\n<tr>\n<td>DenseNet-169</td>\n<td>169</td>\n<td>6, 12, 32, 32</td>\n<td>14.1M</td>\n</tr>\n<tr>\n<td>DenseNet-201</td>\n<td>201</td>\n<td>6, 12, 48, 32</td>\n<td>20.0M</td>\n</tr>\n<tr>\n<td>DenseNet-264</td>\n<td>264</td>\n<td>6, 12, 64, 48</td>\n<td>33.3M</td>\n</tr>\n</tbody>\n</table></div>\n<p>所有 ImageNet 模型使用 k=32，初始卷积为 7×7 stride 2 + 3×3 max pool。</p>\n<h5>与 ResNet 的核心区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>对比维度</th>\n<th>ResNet</th>\n<th>DenseNet</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>连接方式</td>\n<td>跳跃连接（加法）</td>\n<td>密集连接（拼接）</td>\n</tr>\n<tr>\n<td>信息流</td>\n<td>仅相邻层间</td>\n<td>任意层到所有后续层</td>\n</tr>\n<tr>\n<td>特征复用</td>\n<td>隐式（通过恒等映射）</td>\n<td>显式（拼接保留原始特征）</td>\n</tr>\n<tr>\n<td>参数效率</td>\n<td>较低（每层需学习完整表示）</td>\n<td>较高（每层仅贡献 k 个新特征）</td>\n</tr>\n<tr>\n<td>梯度传播</td>\n<td>通过跳跃连接</td>\n<td>直接到任意浅层</td>\n</tr>\n</tbody>\n</table></div>\n<h5>实验结果亮点</h5>\n<p><img alt=\"参数效率对比\" src=\"https://ar5iv.labs.arxiv.org/html/1608.06993/assets/x3.png\" />\n<em>图3：ImageNet 上 DenseNet 与 ResNet 的 top-1 错误率对比（参数量 vs 性能）。DenseNet 在相同参数量下始终优于 ResNet。</em></p>\n<ul>\n<li><strong>CIFAR-10+</strong>：DenseNet-BC (L=190, k=40) 达到 <strong>3.46%</strong> 错误率，显著优于 Wide ResNet 的 4.17%</li>\n<li><strong>CIFAR-100+</strong>：<strong>17.18%</strong> 错误率，优于 Wide ResNet 的 20.50%</li>\n<li><strong>ImageNet</strong>：DenseNet-264 达到 top-1 <strong>20.80%</strong> / top-5 <strong>5.29%</strong>（10-crop）</li>\n<li><strong>参数效率</strong>：DenseNet-BC (L=100, k=12) 仅 0.8M 参数，性能匹敌 10.2M 参数的 1001 层 ResNet</li>\n</ul>\n<div class=\"warn-box\">⚠️ 注意：DenseNet 的朴素实现存在显存效率问题（中间拼接结果需要额外内存），论文作者后续发布了内存高效实现方案。</div>",
      "quiz": {
        "q": "DenseNet 中第 l 层的输入是什么？",
        "options": [
          "仅第 l-1 层的输出特征图",
          "第 l-1 层输出与原始输入的逐元素相加",
          "第 0 到第 l-1 层所有输出特征图在 channel 维度的拼接",
          "第 0 到第 l-1 层所有输出特征图的逐元素平均"
        ],
        "answer": 2,
        "explain": "DenseNet 的核心设计是将所有前序层的输出在 channel 维度拼接后作为当前层输入，即 x_l = H_l([x_0, x_1, ..., x_{l-1}])，这与 ResNet 的加法跳跃连接有本质区别。"
      }
    },
    {
      "id": "senet",
      "num": 6,
      "name": "SENet",
      "fullName": "挤压和激励网络 (Squeeze-and-Excitation Network)",
      "year": "2018.06",
      "org": "Momenta",
      "parent": "resnet",
      "paperUrl": "https://arxiv.org/abs/1709.01507",
      "projectUrl": "",
      "category": "attention_cnn",
      "motivation": "引入通道注意力机制，显式建模通道间依赖关系",
      "summary": "SENet 提出了 Squeeze-and-Excitation (SE) 模块，通过全局平均池化压缩空间信息并利用两层全连接网络学习通道注意力权重，以即插即用的方式嵌入任意 CNN 架构中，以不到 10% 的额外参数换取显著的精度提升，获得 ILSVRC 2017 图像分类冠军（top-5 错误率 2.251%）。",
      "keyPoints": [
        "<strong>SE Block 三步操作</strong>：Squeeze（全局平均池化）→ Excitation（FC-ReLU-FC-Sigmoid 瓶颈结构）→ Scale（通道级乘法重标定）",
        "<strong>即插即用设计</strong>：可无缝嵌入 ResNet、ResNeXt、Inception、VGG、MobileNet 等任意现有架构",
        "<strong>极低计算开销</strong>：以 ResNet-50 为例，参数仅增加约 10%（25.6M → 28.1M），GFLOPs 几乎不变（3.86 → 3.87）",
        "<strong>瓶颈降维比 <span class=\"kb-math kb-math-inline\">r</span></strong>：默认 <span class=\"kb-math kb-math-inline\">r=16</span>，在精度与复杂度之间取得最佳平衡",
        "<strong>通道注意力机制先驱</strong>：首次系统性地在深度网络中引入轻量级通道注意力，启发了后续 CBAM、ECA-Net 等大量工作",
        "<strong>ILSVRC 2017 冠军</strong>：集成模型在测试集上达到 2.251% top-5 错误率，较 2016 年冠军相对降低约 25%"
      ],
      "detail": "<h5>核心架构示意图</h5>\n<p><img alt=\"SE Block 结构示意图\" src=\"https://ar5iv.labs.arxiv.org/html/1709.01507v4/assets/x1.png\" /></p>\n<p><em>图 1：SE Block 的结构。对卷积变换 <span class=\"kb-math kb-math-inline\">F_{tr}</span> 的输出特征 <span class=\"kb-math kb-math-inline\">U</span> 依次执行 Squeeze、Excitation 和 Scale 操作，实现通道级特征重标定。</em></p>\n<p><img alt=\"SE-ResNet 模块示意图\" src=\"https://ar5iv.labs.arxiv.org/html/1709.01507v4/assets/x3.png\" /></p>\n<p><em>图 2：SE Block 嵌入 ResNet 残差模块（左）和 Inception 模块（右）的示意。SE Block 作用于残差分支输出，在与 shortcut 相加之前进行通道重标定。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># SE Block 伪代码\nimport torch\nimport torch.nn as nn\n\nclass SEBlock(nn.Module):\n    def __init__(self, channels, reduction=16):\n        super().__init__()\n        mid = channels // reduction\n        self.squeeze = nn.AdaptiveAvgPool2d(1)          # Squeeze: H×W → 1×1\n        self.excitation = nn.Sequential(\n            nn.Linear(channels, mid, bias=False),        # W1: C → C/r\n            nn.ReLU(inplace=True),\n            nn.Linear(mid, channels, bias=False),        # W2: C/r → C\n            nn.Sigmoid()                                  # 归一化到 [0,1]\n        )\n\n    def forward(self, x):\n        b, c, _, _ = x.size()\n        # Squeeze: 全局平均池化\n        z = self.squeeze(x).view(b, c)                   # (B, C)\n        # Excitation: 学习通道权重\n        s = self.excitation(z).view(b, c, 1, 1)          # (B, C, 1, 1)\n        # Scale: 通道级重标定\n        return x * s.expand_as(x)                         # (B, C, H, W)\n</code></pre>\n<h5>动机与背景</h5>\n<p>卷积神经网络的核心操作——卷积——在每一层中融合空间和通道信息以构建特征表示。大量先前工作（如 Inception 系列、ResNeXt）致力于增强<strong>空间维度</strong>的特征提取能力，但对<strong>通道维度</strong>的建模相对薄弱。传统卷积核对所有通道一视同仁地处理，无法根据输入内容动态调整各通道的重要性。</p>\n<div class=\"key-point\">💡 <strong>关键直觉</strong>：不同通道对应不同的特征模式（如边缘、纹理、语义部件），它们的重要性因输入而异。SE Block 让网络学会\"看哪些通道更重要\"，并据此放大有用通道、抑制无用通道。</div>\n<h5>核心机制详解</h5>\n<p><strong>1. Squeeze：全局信息嵌入</strong></p>\n<p>卷积操作的感受野是局部的，底层特征难以利用全局上下文。Squeeze 操作通过全局平均池化（GAP）将每个通道的空间特征图 <span class=\"kb-math kb-math-inline\">u_c \\in \\mathbb{R}^{H \\times W}</span> 压缩为一个标量，生成通道描述符 <span class=\"kb-math kb-math-inline\">z \\in \\mathbb{R}^C</span>：</p>\n<div class=\"kb-math kb-math-display\">z_c = F_{sq}(u_c) = \\frac{1}{H \\times W} \\sum_{i=1}^{H} \\sum_{j=1}^{W} u_c(i, j)</div>\n<p>这一步将全局空间信息编码到通道描述符中，为后续的通道间关系建模提供全局视野。</p>\n<p><strong>2. Excitation：自适应通道权重学习</strong></p>\n<p>为了充分利用 Squeeze 阶段聚合的信息，Excitation 操作需要满足两个条件：（1）能够学习通道间的非线性交互；（2）能够输出非互斥的多通道权重（不同于 one-hot 的 softmax）。因此采用带瓶颈的两层全连接结构：</p>\n<div class=\"kb-math kb-math-display\">s = F_{ex}(z, W) = \\sigma(W_2 \\cdot \\delta(W_1 \\cdot z))</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">W_1 \\in \\mathbb{R}^{\\frac{C}{r} \\times C}</span>、<span class=\"kb-math kb-math-inline\">W_2 \\in \\mathbb{R}^{C \\times \\frac{C}{r}}</span>，<span class=\"kb-math kb-math-inline\">\\delta</span> 为 ReLU，<span class=\"kb-math kb-math-inline\">\\sigma</span> 为 Sigmoid。</p>\n<div class=\"warn-box\">⚠️ <strong>瓶颈设计的意义</strong>：降维比 <span class=\"kb-math kb-math-inline\">r</span> 控制模型复杂度。先通过 <span class=\"kb-math kb-math-inline\">W_1</span> 将 <span class=\"kb-math kb-math-inline\">C</span> 维降至 <span class=\"kb-math kb-math-inline\">C/r</span> 维（信息压缩），再通过 <span class=\"kb-math kb-math-inline\">W_2</span> 恢复至 <span class=\"kb-math kb-math-inline\">C</span> 维（信息恢复）。这不仅限制了参数量，还起到了正则化作用，有助于泛化。实验表明 <span class=\"kb-math kb-math-inline\">r=16</span> 在精度与效率间取得最佳平衡。</div>\n<p><strong>3. Scale：特征重标定</strong></p>\n<p>最终，将学到的通道权重 <span class=\"kb-math kb-math-inline\">s_c \\in [0, 1]</span> 与原始特征图逐通道相乘：</p>\n<div class=\"kb-math kb-math-display\">\\tilde{x}_c = F_{scale}(u_c, s_c) = s_c \\cdot u_c</div>\n<p>这一操作本质上是一种<strong>通道级的注意力机制</strong>——权重接近 1 的通道被保留，接近 0 的通道被抑制。</p>\n<h5>与现有架构的集成</h5>\n<p>SE Block 的设计使其可以直接嵌入现有网络的构建模块中：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>基础架构</th>\n<th>集成方式</th>\n<th>Top-1 提升</th>\n<th>Top-5 提升</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>ResNet-50</td>\n<td>残差分支后、shortcut 相加前</td>\n<td>24.56% → 23.29% (↓1.27)</td>\n<td>7.48% → 6.62% (↓0.86)</td>\n</tr>\n<tr>\n<td>ResNet-101</td>\n<td>同上</td>\n<td>—</td>\n<td>6.52% → 6.07% (↓0.45)</td>\n</tr>\n<tr>\n<td>ResNeXt-50</td>\n<td>同上</td>\n<td>22.23% → 21.10% (↓1.13)</td>\n<td>5.90% → 5.49% (↓0.41)</td>\n</tr>\n<tr>\n<td>VGGNet-16</td>\n<td>每个卷积层后</td>\n<td>—</td>\n<td>8.67% → 7.44% (↓1.23)</td>\n</tr>\n<tr>\n<td>BN-Inception</td>\n<td>Inception 模块后</td>\n<td>—</td>\n<td>7.89% → 7.14% (↓0.75)</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 <strong>关键发现</strong>：SE Block 在不同深度、不同架构风格的网络上均带来一致的提升，验证了通道注意力机制的通用性。</div>\n<h5>消融实验关键结论</h5>\n<p><strong>Squeeze 算子选择</strong>：全局平均池化（AvgPool）优于最大池化（MaxPool），因为 AvgPool 能更好地编码通道的全局分布信息。</p>\n<p><strong>Excitation 激活函数</strong>：Sigmoid 优于 Tanh 和 ReLU。ReLU 由于将权重截断为非负且可能置零，丢失了通道间的相对关系；Tanh 虽然保留了正负信息但饱和区梯度消失；Sigmoid 输出 <span class=\"kb-math kb-math-inline\">[0,1]</span> 的平滑权重最为合适。</p>\n<p><strong>降维比 <span class=\"kb-math kb-math-inline\">r</span> 的影响</strong>：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th><span class=\"kb-math kb-math-inline\">r</span></th>\n<th>Top-1 (%)</th>\n<th>Top-5 (%)</th>\n<th>参数量</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>2</td>\n<td>22.93</td>\n<td>6.38</td>\n<td>最多</td>\n</tr>\n<tr>\n<td>4</td>\n<td>23.01</td>\n<td>6.48</td>\n<td>—</td>\n</tr>\n<tr>\n<td>8</td>\n<td>23.19</td>\n<td>6.62</td>\n<td>—</td>\n</tr>\n<tr>\n<td><strong>16</strong></td>\n<td><strong>23.29</strong></td>\n<td><strong>6.62</strong></td>\n<td><strong>最佳平衡</strong></td>\n</tr>\n<tr>\n<td>32</td>\n<td>23.61</td>\n<td>6.82</td>\n<td>最少</td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>SE Block 位置</strong>：在残差模块中，SE Block 放在残差分支的卷积之后、与 shortcut 相加之前（SE-PRE）效果最佳。</p>\n<h5>计算效率分析</h5>\n<p>SE Block 引入的额外计算量极小：</p>\n<ul>\n<li><strong>参数增量</strong>：主要来自两个 FC 层，总增量约为 <span class=\"kb-math kb-math-inline\">\\frac{2}{r} \\sum_{s=1}^{S} N_s \\cdot C_s^2</span>，其中 <span class=\"kb-math kb-math-inline\">S</span> 为阶段数，<span class=\"kb-math kb-math-inline\">N_s</span> 为该阶段重复次数，<span class=\"kb-math kb-math-inline\">C_s</span> 为通道数</li>\n<li><strong>SE-ResNet-50</strong>：参数从 25.56M 增至 28.07M（+10%），GFLOPs 从 3.86 增至 3.87（+0.26%）</li>\n<li><strong>推理速度</strong>：在 GPU 上 SE-ResNet-50 单张图推理约 209 张/秒 vs ResNet-50 约 234 张/秒，增加约 10% 的推理时间</li>\n</ul>\n<h5>竞赛成绩与跨任务泛化</h5>\n<ul>\n<li><strong>ILSVRC 2017 分类冠军</strong>：SENet-154 集成模型在测试集上达到 <strong>2.251% top-5 错误率</strong></li>\n<li><strong>场景分类</strong>：在 Places-365 数据集上，SE-ResNet-152 的 top-1 错误率从 41.07% 降至 40.37%</li>\n<li><strong>目标检测</strong>：在 COCO 上使用 Faster R-CNN + SE-ResNet-50 骨干，mAP 从 ResNet-50 基线提升约 1.3%（在 COCO minival 上）</li>\n<li><strong>CIFAR-10/100</strong>：SE-ResNet-110 在 CIFAR-10 上错误率从 6.37% 降至 5.21%，CIFAR-100 上从 27.45% 降至 24.28%</li>\n</ul>\n<h5>与传统方法的区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>对比维度</th>\n<th>传统 CNN</th>\n<th>SENet</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>通道处理</td>\n<td>所有通道等权重</td>\n<td>自适应通道权重</td>\n</tr>\n<tr>\n<td>注意力机制</td>\n<td>无显式通道注意力</td>\n<td>显式 Squeeze-Excitation</td>\n</tr>\n<tr>\n<td>全局信息利用</td>\n<td>依赖感受野逐步扩大</td>\n<td>GAP 直接获取全局统计</td>\n</tr>\n<tr>\n<td>架构修改</td>\n<td>需要重新设计网络</td>\n<td>即插即用，不改变原有架构</td>\n</tr>\n<tr>\n<td>计算开销</td>\n<td>—</td>\n<td>仅增加 ~10% 参数，GFLOPs 几乎不变</td>\n</tr>\n</tbody>\n</table></div>",
      "quiz": {
        "q": "SE Block 中 Excitation 操作使用 Sigmoid 而非 Softmax 作为最终激活函数的主要原因是什么？",
        "options": [
          "Sigmoid 的计算速度比 Softmax 更快",
          "Sigmoid 允许多个通道同时具有较高权重，而 Softmax 会强制通道间竞争",
          "Sigmoid 的梯度比 Softmax 更稳定，不会出现梯度消失",
          "Softmax 只能用于分类任务的最后一层"
        ],
        "answer": 1,
        "explain": "SE Block 需要输出非互斥的通道权重——多个通道可以同时被增强。Sigmoid 独立地将每个通道映射到 [0,1]，而 Softmax 会使所有通道权重之和为 1，形成互斥竞争，不符合通道重标定的需求。"
      }
    },
    {
      "id": "efficientnet",
      "num": 7,
      "name": "EfficientNet",
      "fullName": "高效网络 (Efficient Network)",
      "year": "2019.05",
      "org": "Google",
      "parent": "senet",
      "paperUrl": "https://arxiv.org/abs/1905.11946",
      "projectUrl": "",
      "category": "attention_cnn",
      "motivation": "提出复合缩放方法，平衡深度、宽度与分辨率",
      "summary": "EfficientNet 提出了一种**复合缩放方法（Compound Scaling）**，通过同时按固定比例缩放网络深度、宽度和输入分辨率三个维度，结合神经架构搜索（NAS）得到的高效基线网络 EfficientNet-B0，构建了 B0–B7 系列模型，在 ImageNet 上以 8.4 倍更少的参数达到了当时最优的 84.3% top-1 准确率。",
      "keyPoints": [
        "<strong>复合缩放方法</strong>：提出统一缩放深度（<span class=\"kb-math kb-math-inline\">d</span>）、宽度（<span class=\"kb-math kb-math-inline\">w</span>）和分辨率（<span class=\"kb-math kb-math-inline\">r</span>）三个维度，使用用户指定的复合系数 <span class=\"kb-math kb-math-inline\">\\phi</span> 控制总计算量",
        "<strong>缩放公式</strong>：<span class=\"kb-math kb-math-inline\">d = \\alpha^\\phi,\\ w = \\beta^\\phi,\\ r = \\gamma^\\phi</span>，约束 <span class=\"kb-math kb-math-inline\">\\alpha \\cdot \\beta^2 \\cdot \\gamma^2 \\approx 2</span>，FLOPS 约增长 <span class=\"kb-math kb-math-inline\">2^\\phi</span> 倍",
        "<strong>关键观察</strong>：单一维度缩放存在收益递减（diminishing returns），平衡三个维度的缩放才能获得最佳精度-效率权衡",
        "<strong>EfficientNet-B0 基线</strong>：通过 NAS 搜索得到（搜索空间同 MnasNet），以 MBConv（移动倒置瓶颈）+ Squeeze-and-Excitation 为核心模块",
        "<strong>搜索到的最优缩放系数</strong>：<span class=\"kb-math kb-math-inline\">\\alpha=1.2,\\ \\beta=1.1,\\ \\gamma=1.15</span>",
        "<strong>ImageNet SOTA</strong>：EfficientNet-B7 达到 84.3% top-1 准确率，仅 66M 参数、37B FLOPS，比 GPipe 小 8.4 倍、快 6.1 倍",
        "<strong>迁移学习</strong>：在 8 个数据集中的 5 个达到 SOTA，平均参数减少 9.6 倍",
        "<strong>通用性验证</strong>：复合缩放方法在 MobileNet 和 ResNet 上同样有效，优于单维度缩放"
      ],
      "detail": "<h5>核心示意图</h5>\n<p><img alt=\"EfficientNet 复合缩放方法示意图\" src=\"https://ar5iv.labs.arxiv.org/html/1905.11946/assets/x2.png\" />\n<em>图：模型缩放方法对比。(a) 基线网络；(b) 仅增加宽度；(c) 仅增加深度；(d) 仅增加分辨率；(e) 本文提出的复合缩放方法，同时平衡三个维度。</em></p>\n<h5>EfficientNet-B0 基线架构</h5>\n<pre><code>┌──────────┬───────────────────────┬──────────────┬──────────┬────────┐\n│  Stage   │      Operator         │  Resolution  │ Channels │ Layers │\n├──────────┼───────────────────────┼──────────────┼──────────┼────────┤\n│    1     │ Conv3x3               │  224 × 224   │    32    │   1    │\n│    2     │ MBConv1, k3×3         │  112 × 112   │    16    │   1    │\n│    3     │ MBConv6, k3×3         │  112 × 112   │    24    │   2    │\n│    4     │ MBConv6, k5×5         │   56 × 56    │    40    │   2    │\n│    5     │ MBConv6, k3×3         │   28 × 28    │    80    │   3    │\n│    6     │ MBConv6, k5×5         │   14 × 14    │   112    │   3    │\n│    7     │ MBConv6, k5×5         │   14 × 14    │   192    │   4    │\n│    8     │ MBConv6, k3×3         │    7 × 7     │   320    │   1    │\n│    9     │ Conv1x1 &amp; Pooling &amp; FC│    7 × 7     │  1280    │   1    │\n└──────────┴───────────────────────┴──────────────┴──────────┴────────┘\n</code></pre>\n<p><em>表：EfficientNet-B0 架构。MBConv<span class=\"kb-math kb-math-inline\">N</span> 表示扩展比为 <span class=\"kb-math kb-math-inline\">N</span> 的移动倒置瓶颈卷积（Mobile Inverted Bottleneck Conv），所有 MBConv 块均包含 Squeeze-and-Excitation 优化。</em></p>\n<h5>复合缩放伪代码</h5>\n<pre><code class=\"language-python\"># EfficientNet 复合缩放方法\n# Step 1: 在基线模型上搜索最优缩放系数\nphi = 1  # 固定 φ=1，假设可用资源翻倍\n# 网格搜索 α, β, γ，约束: α · β² · γ² ≈ 2\nbest_alpha, best_beta, best_gamma = grid_search(\n    constraint=lambda a, b, g: a * b**2 * g**2 ≈ 2\n)\n# 搜索结果: α=1.2, β=1.1, γ=1.15\n\n# Step 2: 固定 α, β, γ，用不同 φ 缩放得到 B1-B7\nalpha, beta, gamma = 1.2, 1.1, 1.15\nfor phi in [1, 2, 3, 3.5, 4, 5, 6.5]:  # B1 到 B7\n    depth_coeff  = alpha ** phi   # 深度缩放系数\n    width_coeff  = beta  ** phi   # 宽度缩放系数\n    resolution   = int(base_resolution * gamma ** phi)  # 输入分辨率\n    # FLOPS ≈ base_flops * 2^φ\n    model = scale_baseline(EfficientNet_B0, depth_coeff, width_coeff, resolution)\n</code></pre>\n<h5>动机与背景</h5>\n<p>卷积神经网络的性能提升传统上依赖于增大模型规模，但如何高效地缩放模型一直缺乏系统性研究。此前的工作通常只关注单一维度的缩放：</p>\n<ul>\n<li><strong>深度缩放</strong>（如 ResNet-18 → ResNet-200）：增加网络层数，能学习更复杂的特征，但过深的网络面临梯度消失问题，训练困难</li>\n<li><strong>宽度缩放</strong>（如 WideResNet）：增加每层通道数，能捕获更细粒度的特征，但浅而宽的网络难以学习高层语义特征</li>\n<li><strong>分辨率缩放</strong>：使用更大的输入图像，能获得更精细的特征模式，但高分辨率带来的精度增益在极高分辨率时迅速递减</li>\n</ul>\n<div class=\"key-point\">💡 <strong>关键观察</strong>：论文通过系统实验发现，单独缩放任何一个维度都存在<strong>收益递减</strong>现象——当模型达到一定规模后，继续在单一维度上增加资源带来的精度提升越来越小。更重要的是，<strong>平衡缩放所有三个维度</strong>才能获得最佳的精度-效率权衡。</div>\n<h5>核心机制：复合缩放方法</h5>\n<p>论文将模型缩放形式化为一个优化问题。给定基线网络的每一层 <span class=\"kb-math kb-math-inline\">i</span> 的操作 <span class=\"kb-math kb-math-inline\">\\hat{F}_i</span>、输入张量维度 <span class=\"kb-math kb-math-inline\">\\langle H_i, W_i, C_i \\rangle</span>，目标是在给定资源约束下最大化模型精度：</p>\n<div class=\"kb-math kb-math-display\">\\max_{d, w, r} \\text{Accuracy}\\big(\\mathcal{N}(d, w, r)\\big)</div>\n<div class=\"kb-math kb-math-display\">\\text{s.t.} \\quad \\mathcal{N}(d, w, r) = \\bigodot_{i=1..s} \\hat{F}_i^{d \\cdot \\hat{L}_i}\\big(X_{\\langle r \\cdot \\hat{H}_i,\\ r \\cdot \\hat{W}_i,\\ w \\cdot \\hat{C}_i \\rangle}\\big)</div>\n<div class=\"kb-math kb-math-display\">\\text{Memory}(\\mathcal{N}) \\leq \\text{target\\_memory}, \\quad \\text{FLOPS}(\\mathcal{N}) \\leq \\text{target\\_flops}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">d, w, r</span> 分别是深度、宽度和分辨率的缩放系数。</p>\n<p>为了简化搜索空间，论文提出使用<strong>单一复合系数 <span class=\"kb-math kb-math-inline\">\\phi</span></strong> 统一控制三个维度的缩放：</p>\n<div class=\"kb-math kb-math-display\">d = \\alpha^\\phi, \\quad w = \\beta^\\phi, \\quad r = \\gamma^\\phi</div>\n<div class=\"kb-math kb-math-display\">\\text{s.t.} \\quad \\alpha \\cdot \\beta^2 \\cdot \\gamma^2 \\approx 2, \\quad \\alpha \\geq 1, \\quad \\beta \\geq 1, \\quad \\gamma \\geq 1</div>\n<div class=\"warn-box\">⚠️ <strong>约束条件的直觉</strong>：卷积层的 FLOPS 与 <span class=\"kb-math kb-math-inline\">d</span>（深度）成正比，与 <span class=\"kb-math kb-math-inline\">w^2</span>（宽度的平方，因为卷积核输入输出通道都缩放）成正比，与 <span class=\"kb-math kb-math-inline\">r^2</span>（分辨率的平方，因为特征图面积缩放）成正比。因此总 FLOPS 正比于 <span class=\"kb-math kb-math-inline\">\\alpha^\\phi \\cdot (\\beta^\\phi)^2 \\cdot (\\gamma^\\phi)^2 = (\\alpha \\cdot \\beta^2 \\cdot \\gamma^2)^\\phi</span>。当 <span class=\"kb-math kb-math-inline\">\\alpha \\cdot \\beta^2 \\cdot \\gamma^2 = 2</span> 时，总 FLOPS 约增长 <span class=\"kb-math kb-math-inline\">2^\\phi</span> 倍，使得用户可以通过 <span class=\"kb-math kb-math-inline\">\\phi</span> 精确控制计算预算。</div>\n<h5>两步缩放流程</h5>\n<p><strong>Step 1</strong>：固定 <span class=\"kb-math kb-math-inline\">\\phi = 1</span>（即资源翻倍），在 EfficientNet-B0 上进行小规模网格搜索，找到最优的 <span class=\"kb-math kb-math-inline\">\\alpha, \\beta, \\gamma</span>。搜索结果为：</p>\n<div class=\"kb-math kb-math-display\">\\alpha = 1.2, \\quad \\beta = 1.1, \\quad \\gamma = 1.15</div>\n<p>验证：<span class=\"kb-math kb-math-inline\">1.2 \\times 1.1^2 \\times 1.15^2 = 1.2 \\times 1.21 \\times 1.3225 \\approx 1.92 \\approx 2</span> ✓</p>\n<p><strong>Step 2</strong>：固定 <span class=\"kb-math kb-math-inline\">\\alpha, \\beta, \\gamma</span> 为常数，通过调整 <span class=\"kb-math kb-math-inline\">\\phi</span> 得到不同规模的模型（B1–B7）。这种方法的优势在于只需在小模型上搜索一次，即可应用于所有规模。</p>\n<h5>EfficientNet-B0 的 NAS 搜索</h5>\n<p>基线网络 EfficientNet-B0 通过神经架构搜索（NAS）获得，搜索空间与 MnasNet 相同，优化目标同时考虑准确率和效率：</p>\n<div class=\"kb-math kb-math-display\">\\text{ACC}(m) \\times \\left[\\frac{\\text{FLOPS}(m)}{T}\\right]^w</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">T = 400M</span> FLOPS 为目标计算量，<span class=\"kb-math kb-math-inline\">w = -0.07</span> 为权重因子。搜索得到的 B0 架构以 <strong>MBConv（移动倒置瓶颈卷积）</strong> 为核心构建块，每个 MBConv 块包含：</p>\n<ol>\n<li><strong>逐点卷积（1×1）扩展</strong>：将通道数扩展 <span class=\"kb-math kb-math-inline\">N</span> 倍（扩展比）</li>\n<li><strong>深度可分离卷积（3×3 或 5×5）</strong>：在扩展后的通道上进行空间卷积</li>\n<li><strong>Squeeze-and-Excitation（SE）模块</strong>：通过全局平均池化 → FC → ReLU → FC → Sigmoid 学习通道注意力权重</li>\n<li><strong>逐点卷积（1×1）压缩</strong>：将通道数压缩回目标维度</li>\n<li><strong>残差连接</strong>：当输入输出维度匹配时添加跳跃连接</li>\n</ol>\n<h5>训练细节</h5>\n<ul>\n<li><strong>优化器</strong>：RMSProp（decay=0.9, momentum=0.9）</li>\n<li><strong>激活函数</strong>：SiLU（Swish-1），即 <span class=\"kb-math kb-math-inline\">x \\cdot \\sigma(x)</span></li>\n<li><strong>数据增强</strong>：AutoAugment</li>\n<li><strong>正则化</strong>：</li>\n<li>权重衰减 1e-5</li>\n<li>Stochastic Depth（存活概率 0.8）</li>\n<li>Dropout 从 B0 的 0.2 线性增加到 B7 的 0.5</li>\n<li><strong>学习率</strong>：初始 0.256，每 2.4 个 epoch 衰减 0.97</li>\n<li><strong>Batch Norm</strong>：momentum=0.99</li>\n</ul>\n<h5>ImageNet 实验结果</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>模型</th>\n<th>Top-1 Acc.</th>\n<th>#Params</th>\n<th>#FLOPS</th>\n<th>对比</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>EfficientNet-B0</td>\n<td>77.1%</td>\n<td>5.3M</td>\n<td>0.39B</td>\n<td>基线</td>\n</tr>\n<tr>\n<td>EfficientNet-B1</td>\n<td>79.1%</td>\n<td>7.8M</td>\n<td>0.70B</td>\n<td>比 ResNet-152 (77.8%) 更准，参数少 7.6×</td>\n</tr>\n<tr>\n<td>EfficientNet-B2</td>\n<td>80.1%</td>\n<td>9.2M</td>\n<td>1.0B</td>\n<td>媲美 Inception-ResNet-v2 (80.1%)</td>\n</tr>\n<tr>\n<td>EfficientNet-B3</td>\n<td>81.6%</td>\n<td>12M</td>\n<td>1.8B</td>\n<td>超越 ResNeXt-101 (80.9%)，FLOPS 少 18×</td>\n</tr>\n<tr>\n<td>EfficientNet-B4</td>\n<td>82.9%</td>\n<td>19M</td>\n<td>4.2B</td>\n<td>超越 NASNet-A (82.7%)，参数少 4.7×</td>\n</tr>\n<tr>\n<td>EfficientNet-B5</td>\n<td>83.6%</td>\n<td>30M</td>\n<td>9.9B</td>\n<td>超越 AmoebaNet-C (83.5%)</td>\n</tr>\n<tr>\n<td>EfficientNet-B6</td>\n<td>84.0%</td>\n<td>43M</td>\n<td>19B</td>\n<td>—</td>\n</tr>\n<tr>\n<td>EfficientNet-B7</td>\n<td><strong>84.3%</strong></td>\n<td>66M</td>\n<td>37B</td>\n<td>媲美 GPipe (84.3%)，参数少 <strong>8.4×</strong>，快 <strong>6.1×</strong></td>\n</tr>\n</tbody>\n</table></div>\n<h5>与传统方法的区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>对比维度</th>\n<th>传统缩放方法</th>\n<th>EfficientNet 复合缩放</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>缩放维度</td>\n<td>通常只缩放单一维度（深度 OR 宽度 OR 分辨率）</td>\n<td>同时平衡缩放三个维度</td>\n</tr>\n<tr>\n<td>缩放策略</td>\n<td>手动设计，缺乏理论指导</td>\n<td>基于约束优化，用 <span class=\"kb-math kb-math-inline\">\\phi</span> 统一控制</td>\n</tr>\n<tr>\n<td>基线网络</td>\n<td>手动设计（ResNet、VGG 等）</td>\n<td>NAS 自动搜索高效基线</td>\n</tr>\n<tr>\n<td>搜索成本</td>\n<td>每个规模独立设计</td>\n<td>只在小模型上搜索一次，复用到所有规模</td>\n</tr>\n<tr>\n<td>效率</td>\n<td>参数和 FLOPS 增长不可控</td>\n<td>FLOPS 精确按 <span class=\"kb-math kb-math-inline\">2^\\phi</span> 增长</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 <strong>核心洞察</strong>：更高分辨率的图像需要更深的网络来捕获更大的感受野，也需要更宽的网络来捕获更精细的模式。这三个维度之间存在内在耦合关系，因此必须协调缩放才能获得最优性能。</div>",
      "quiz": {
        "q": "EfficientNet 复合缩放公式中约束 α·β²·γ² ≈ 2 的主要目的是什么？",
        "options": [
          "确保模型参数量恰好翻倍",
          "使总 FLOPS 随复合系数 φ 按 2^φ 倍增长，便于精确控制计算预算",
          "保证三个缩放维度的系数之和为常数",
          "限制搜索空间大小以加速 NAS 搜索过程"
        ],
        "answer": 1,
        "explain": "由于 FLOPS 正比于 d·w²·r² = (α·β²·γ²)^φ，当 α·β²·γ²=2 时，FLOPS 增长为 2^φ，用户可通过 φ 直接控制计算预算的倍数增长。"
      }
    },
    {
      "id": "vit",
      "num": 8,
      "name": "ViT",
      "fullName": "视觉Transformer (Vision Transformer)",
      "year": "2020.10",
      "org": "Google",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2010.11929",
      "projectUrl": "",
      "category": "vit_era",
      "motivation": "将图像切分为Patch，纯Transformer超越CNN",
      "summary": "ViT 将图像切分为固定大小的 Patch 序列，直接输入标准 Transformer Encoder 进行分类，证明了在大规模数据预训练下，纯 Transformer 架构无需任何卷积即可超越最先进的 CNN 模型，开启了视觉 Transformer 时代。",
      "keyPoints": [
        "<strong>Patch Embedding</strong>：将图像切分为 <span class=\"kb-math kb-math-inline\">P \\times P</span> 的固定大小 Patch，展平后通过线性投影映射到 <span class=\"kb-math kb-math-inline\">D</span> 维嵌入空间，将 2D 图像转化为 1D 序列",
        "<strong>[CLS] Token</strong>：借鉴 BERT，在 Patch 序列前添加一个可学习的分类 Token，其最终输出作为整张图像的表示用于分类",
        "<strong>可学习 1D 位置编码</strong>：为每个 Patch（含 [CLS]）添加可学习的 1D 位置嵌入，实验表明 2D 位置编码无显著增益",
        "<strong>标准 Transformer Encoder</strong>：采用 Pre-LN 结构（LayerNorm 在 MSA/MLP 之前），MLP 含两层全连接 + GELU 激活",
        "<strong>三种模型规模</strong>：ViT-Base（86M）、ViT-Large（307M）、ViT-Huge（632M），配置沿用 BERT 命名",
        "<strong>大规模预训练 + 微调范式</strong>：在 ImageNet-21k（14M）或 JFT-300M 上预训练，迁移到下游任务微调",
        "<strong>归纳偏置极少</strong>：相比 CNN 的局部性和平移等变性，ViT 仅在 Patch 切分时引入 2D 结构先验",
        "<strong>高分辨率微调</strong>：微调时保持 Patch 大小不变、增大序列长度，对预训练位置编码进行 2D 插值",
        "<strong>核心发现</strong>：大规模训练可以弥补归纳偏置的缺失——数据量足够大时，ViT 超越 CNN；数据量不足时，ViT 不如 CNN"
      ],
      "detail": "<h5>模型架构总览</h5>\n<p><img alt=\"ViT 模型架构图\" src=\"https://ar5iv.labs.arxiv.org/html/2010.11929/assets/x1.png\" />\n<em>图：ViT 模型总览。将图像切分为固定大小的 Patch，线性嵌入后加上位置编码，送入标准 Transformer Encoder。[CLS] Token 的输出经分类头得到预测结果。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># Vision Transformer 前向传播伪代码\ndef ViT_forward(image, E, E_pos, cls_token, transformer_encoder, mlp_head):\n    &quot;&quot;&quot;\n    image: (B, C, H, W)\n    E: 线性投影矩阵, shape (P²·C, D)\n    E_pos: 位置嵌入, shape (N+1, D)\n    cls_token: 可学习分类Token, shape (1, D)\n    &quot;&quot;&quot;\n    # Step 1: Patch Embedding\n    patches = split_into_patches(image, patch_size=P)   # (B, N, P²·C)\n    patch_embeddings = patches @ E                        # (B, N, D)\n\n    # Step 2: 拼接 [CLS] Token\n    z_0 = concat([cls_token, patch_embeddings], dim=1)   # (B, N+1, D)\n\n    # Step 3: 加位置编码\n    z_0 = z_0 + E_pos                                    # (B, N+1, D)\n\n    # Step 4: Transformer Encoder (L 层)\n    for layer in transformer_encoder:\n        # Pre-LN + MSA + 残差\n        z_prime = MSA(LayerNorm(z)) + z\n        # Pre-LN + MLP + 残差\n        z = MLP(LayerNorm(z_prime)) + z_prime\n\n    # Step 5: 分类输出\n    y = LayerNorm(z[:, 0])      # 取 [CLS] Token 输出\n    logits = mlp_head(y)         # 预训练: MLP(hidden+GELU); 微调: Linear\n    return logits\n</code></pre>\n<h5>动机与背景</h5>\n<p>在 ViT 提出之前，Transformer 已在 NLP 领域取得巨大成功（BERT、GPT 等），但在计算机视觉中，卷积神经网络（CNN）仍占据主导地位。此前将注意力机制引入视觉的工作要么将 self-attention 与 CNN 结合使用，要么用特殊的局部注意力模式替代卷积——这些方法虽然理论上高效，但由于使用了特殊的注意力模式，难以在现代硬件加速器上高效扩展。</p>\n<p>ViT 的核心动机非常直接：<strong>能否以最少的修改，将标准 Transformer 直接应用于图像？</strong> 作者发现，只需将图像切分为 Patch 并线性嵌入，就可以将其视为 NLP 中的 Token 序列，直接复用 NLP 中成熟的 Transformer 架构及其高效实现。</p>\n<h5>核心机制详解</h5>\n<p><strong>1. Patch Embedding — 图像序列化</strong></p>\n<p>给定输入图像 <span class=\"kb-math kb-math-inline\">\\mathbf{x} \\in \\mathbb{R}^{H \\times W \\times C}</span>，ViT 将其重塑为 <span class=\"kb-math kb-math-inline\">N</span> 个展平的 2D Patch：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{x}_p \\in \\mathbb{R}^{N \\times (P^2 \\cdot C)}, \\quad N = \\frac{HW}{P^2}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">P</span> 为 Patch 大小（通常为 16 或 14），<span class=\"kb-math kb-math-inline\">N</span> 为 Patch 数量，即 Transformer 的有效序列长度。例如对于 224×224 的图像、Patch 大小 16×16，序列长度 <span class=\"kb-math kb-math-inline\">N = 196</span>。</p>\n<p>每个 Patch 通过可训练的线性投影矩阵 <span class=\"kb-math kb-math-inline\">\\mathbf{E} \\in \\mathbb{R}^{(P^2 \\cdot C) \\times D}</span> 映射到 <span class=\"kb-math kb-math-inline\">D</span> 维空间。这一操作等价于一个 kernel size = stride = <span class=\"kb-math kb-math-inline\">P</span> 的卷积层，但概念上更简洁——直接将 Patch 视为\"视觉词元\"。</p>\n<div class=\"key-point\">💡 <strong>关键</strong>：Patch 大小决定了序列长度，序列长度与 Patch 大小的平方成反比。更小的 Patch 意味着更长的序列和更高的计算代价，但也能捕获更精细的空间信息。</div>\n<p><strong>2. [CLS] Token 与位置编码</strong></p>\n<p>ViT 在 Patch 嵌入序列前拼接一个可学习的 [CLS] Token <span class=\"kb-math kb-math-inline\">\\mathbf{x}_{\\text{class}}</span>，并为整个序列（长度 <span class=\"kb-math kb-math-inline\">N+1</span>）添加可学习的 1D 位置嵌入 <span class=\"kb-math kb-math-inline\">\\mathbf{E}_{pos} \\in \\mathbb{R}^{(N+1) \\times D}</span>：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{z}_0 = [\\mathbf{x}_{\\text{class}};\\, \\mathbf{x}_p^1\\mathbf{E};\\, \\mathbf{x}_p^2\\mathbf{E};\\, \\cdots;\\, \\mathbf{x}_p^N\\mathbf{E}] + \\mathbf{E}_{pos}</div>\n<p>作者实验发现，1D 可学习位置编码与 2D 位置编码、相对位置编码的性能差异极小（&lt;0.1%），因此选择了最简单的 1D 方案。这说明 Transformer 能够从数据中自动学习到 Patch 之间的空间关系。</p>\n<p><strong>3. Transformer Encoder — Pre-LN 架构</strong></p>\n<p>ViT 采用标准 Transformer Encoder，但使用 <strong>Pre-LN</strong>（LayerNorm 在注意力/MLP 之前）而非原始 Transformer 的 Post-LN，这有助于训练稳定性：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{z}&#x27;_\\ell = \\text{MSA}(\\text{LN}(\\mathbf{z}_{\\ell-1})) + \\mathbf{z}_{\\ell-1}, \\quad \\ell = 1 \\ldots L</div>\n<div class=\"kb-math kb-math-display\">\\mathbf{z}_\\ell = \\text{MLP}(\\text{LN}(\\mathbf{z}&#x27;_\\ell)) + \\mathbf{z}&#x27;_\\ell, \\quad \\ell = 1 \\ldots L</div>\n<p>其中 MLP 包含两个全连接层，中间使用 GELU 激活函数，隐藏层维度为 <span class=\"kb-math kb-math-inline\">4D</span>（如 ViT-Base 的 MLP 维度为 3072 = 4×768）。</p>\n<p>最终分类输出取 [CLS] Token 经过 LayerNorm 后的表示：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{y} = \\text{LN}(\\mathbf{z}_L^0)</div>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：预训练时分类头为含一个隐藏层的 MLP，微调时替换为单层线性层，并零初始化。</div>\n<p><strong>4. 归纳偏置分析</strong></p>\n<p>这是 ViT 最深刻的洞察之一。CNN 在每一层都内置了三种归纳偏置：<strong>局部性</strong>（卷积核只看局部区域）、<strong>二维邻域结构</strong>（特征图保持空间排列）和<strong>平移等变性</strong>（同一卷积核在所有位置共享）。</p>\n<p>而 ViT 中：\n- <strong>MSA 层是全局的</strong>：每个 Token 可以关注所有其他 Token，没有局部性约束\n- <strong>MLP 层是局部且平移等变的</strong>：独立作用于每个 Token\n- <strong>2D 结构仅在两处使用</strong>：(1) 初始 Patch 切分；(2) 微调时位置编码的 2D 插值</p>\n<p>这意味着 ViT 必须从数据中学习 CNN 天然具备的空间先验。因此，<strong>在小数据集上 ViT 不如 CNN，但在大数据集上 ViT 的灵活性反而成为优势</strong>。</p>\n<p><strong>5. 高分辨率微调与位置编码插值</strong></p>\n<p>微调时通常使用比预训练更高的分辨率（如预训练 224→微调 384/512）。由于 Patch 大小不变，更高分辨率意味着更多 Patch、更长序列。此时预训练的位置编码维度不匹配，ViT 的解决方案是对预训练位置编码进行 <strong>2D 双线性插值</strong>——先将 1D 位置编码按原始网格排列为 2D，插值到新网格大小，再展平回 1D。</p>\n<h5>模型变体与训练细节</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>模型</th>\n<th>层数</th>\n<th>隐藏维度 D</th>\n<th>MLP 维度</th>\n<th>注意力头数</th>\n<th>参数量</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>ViT-Base</td>\n<td>12</td>\n<td>768</td>\n<td>3072</td>\n<td>12</td>\n<td>86M</td>\n</tr>\n<tr>\n<td>ViT-Large</td>\n<td>24</td>\n<td>1024</td>\n<td>4096</td>\n<td>16</td>\n<td>307M</td>\n</tr>\n<tr>\n<td>ViT-Huge</td>\n<td>32</td>\n<td>1280</td>\n<td>5120</td>\n<td>16</td>\n<td>632M</td>\n</tr>\n</tbody>\n</table></div>\n<p>命名规则 ViT-X/Y 表示模型规模 X 和 Patch 大小 Y，如 ViT-L/16 表示 Large 模型 + 16×16 Patch。</p>\n<p>训练配置：\n- <strong>预训练</strong>：Adam 优化器（<span class=\"kb-math kb-math-inline\">\\beta_1=0.9, \\beta_2=0.999</span>），batch size 4096，权重衰减 0.1，线性学习率 warmup + decay\n- <strong>微调</strong>：SGD with momentum，batch size 512，高分辨率输入（ViT-L/16 用 512，ViT-H/14 用 518）</p>\n<h5>与 CNN 的关键对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th>CNN (ResNet/EfficientNet)</th>\n<th>ViT</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>归纳偏置</td>\n<td>强（局部性 + 平移等变性）</td>\n<td>弱（仅 Patch 切分引入 2D 先验）</td>\n</tr>\n<tr>\n<td>小数据表现</td>\n<td>更好（归纳偏置起正则化作用）</td>\n<td>较差（需要大量数据学习空间关系）</td>\n</tr>\n<tr>\n<td>大数据表现</td>\n<td>趋于饱和</td>\n<td>持续提升，超越 CNN</td>\n</tr>\n<tr>\n<td>计算效率</td>\n<td>卷积硬件优化成熟</td>\n<td>可直接复用 NLP Transformer 高效实现</td>\n</tr>\n<tr>\n<td>扩展性</td>\n<td>受限于架构设计</td>\n<td>与 NLP 一致的 scaling law</td>\n</tr>\n</tbody>\n</table></div>\n<p>在 JFT-300M 预训练后，ViT-H/14 在 ImageNet 上达到 <strong>88.55%</strong> top-1 准确率，超越了当时最强的 BiT（87.54%）和 Noisy Student（88.4%），且预训练计算成本更低。</p>",
      "quiz": {
        "q": "ViT 在中等规模数据集（如 ImageNet-1k）上直接训练时表现不如同等规模的 ResNet，主要原因是什么？",
        "options": [
          "Transformer 的参数量太大，容易过拟合",
          "ViT 缺少 CNN 固有的局部性和平移等变性等归纳偏置，在数据不足时泛化能力较弱",
          "ViT 的位置编码无法表达 2D 空间信息",
          "Patch Embedding 的线性投影损失了太多图像信息"
        ],
        "answer": 1,
        "explain": "ViT 的 self-attention 是全局操作，不具备 CNN 天然的局部性和平移等变性归纳偏置。在数据量不足时，模型需要从头学习这些空间先验，导致泛化能力不如 CNN。但当预训练数据足够大时（如 JFT-300M），这一劣势被消除，ViT 反而因更强的灵活性超越 CNN。"
      }
    },
    {
      "id": "deit",
      "num": 9,
      "name": "DeiT",
      "fullName": "数据高效图像Transformer (Data-efficient Image Transformer)",
      "year": "2020.12",
      "org": "Facebook AI Research",
      "parent": "vit",
      "paperUrl": "https://arxiv.org/abs/2012.12877",
      "projectUrl": "",
      "category": "vit_era",
      "motivation": "引入蒸馏Token实现数据高效训练",
      "summary": "DeiT 提出了一套针对 Vision Transformer 的**数据高效训练策略**和基于 **distillation token 的知识蒸馏方法**，仅使用 ImageNet-1k 数据即可训练出超越在 JFT-300M 上预训练的 ViT-B 的模型（85.2% vs 84.15% top-1），证明了大规模外部数据并非训练高性能 ViT 的必要条件。",
      "keyPoints": [
        "<strong>无需外部数据</strong>：仅用 ImageNet-1k（128万张图）在单台 8-GPU 服务器上 53 小时即可训练出有竞争力的 ViT",
        "<strong>Distillation Token 机制</strong>：在 ViT 的 patch embedding 序列中新增一个可学习的蒸馏 token，与 class token 并行，通过自注意力交互学习教师模型的知识",
        "<strong>Hard Distillation 优于 Soft Distillation</strong>：硬标签蒸馏（83.0%）显著优于软标签蒸馏（81.8%），且无需调节温度 <span class=\"kb-math kb-math-inline\">\\tau</span> 和权重 <span class=\"kb-math kb-math-inline\">\\lambda</span> 超参数",
        "<strong>CNN 教师优于 Transformer 教师</strong>：使用 RegNetY-16GF（CNN，82.9%）作为教师，学生可通过蒸馏继承 CNN 的归纳偏置（局部性、平移等变性）",
        "<strong>三种模型尺寸</strong>：DeiT-Ti（5M）、DeiT-S（22M）、DeiT-B（86M），覆盖不同计算预算",
        "<strong>关键训练策略</strong>：AdamW 优化器、RandAugment、Mixup、CutMix、Stochastic Depth、Repeated Augmentation 等缺一不可",
        "<strong>最佳结果</strong>：DeiT⚗-B↑384 在 1000 epoch 训练下达到 <strong>85.2% top-1</strong>，超越 ViT-B/16@JFT-300M（84.15%）"
      ],
      "detail": "<p><img alt=\"DeiT 蒸馏框架示意图\" src=\"https://ar5iv.labs.arxiv.org/html/2012.12877v2/assets/x2.png\" />\n<em>图：DeiT 的 distillation token 机制。在标准 ViT 的 class token 旁新增一个 distillation token，分别通过独立的线性分类头输出预测，训练时 class token 对应真实标签损失，distillation token 对应教师模型蒸馏损失。</em></p>\n<pre><code class=\"language-python\"># DeiT 蒸馏训练伪代码\nimport torch\nimport torch.nn.functional as F\n\nclass DeiT(nn.Module):\n    def __init__(self, vit_backbone):\n        super().__init__()\n        self.backbone = vit_backbone          # 标准 ViT (patch embed + transformer blocks)\n        self.cls_token = nn.Parameter(...)     # [1, 1, D] class token\n        self.dist_token = nn.Parameter(...)    # [1, 1, D] distillation token (新增!)\n        self.head = nn.Linear(D, num_classes)       # class head\n        self.head_dist = nn.Linear(D, num_classes)  # distillation head (新增!)\n\n    def forward(self, x):\n        # x: [B, 3, 224, 224]\n        patches = self.backbone.patch_embed(x)       # [B, N, D], N=196 for 16x16 patches\n        tokens = torch.cat([self.cls_token, self.dist_token, patches], dim=1)  # [B, N+2, D]\n        tokens = self.backbone.transformer(tokens)    # 12层 Transformer Encoder\n        cls_out = self.head(tokens[:, 0])             # class token → 分类logits\n        dist_out = self.head_dist(tokens[:, 1])       # distillation token → 蒸馏logits\n        return cls_out, dist_out\n\n# Hard Distillation 训练循环\nteacher = RegNetY_16GF(pretrained=True).eval()  # CNN 教师模型, 82.9% top-1\n\nfor images, labels in dataloader:\n    cls_logits, dist_logits = student(images)\n    with torch.no_grad():\n        teacher_labels = teacher(images).argmax(dim=-1)  # 教师硬标签\n\n    # Hard Distillation Loss (Eq. 3)\n    loss = 0.5 * F.cross_entropy(cls_logits, labels) \\\n         + 0.5 * F.cross_entropy(dist_logits, teacher_labels)\n    loss.backward()\n    optimizer.step()\n\n# 推理时：两个 head 的 softmax 融合\ndef inference(model, x):\n    cls_logits, dist_logits = model(x)\n    return (cls_logits.softmax(dim=-1) + dist_logits.softmax(dim=-1)) / 2\n</code></pre>\n<h5>动机与背景</h5>\n<p>ViT（Vision Transformer）在 JFT-300M（3 亿张图像）上预训练后展现了卓越的图像分类性能，但在仅使用 ImageNet-1k（128 万张图像）训练时表现不佳——ViT-B/16 仅达到 77.9% top-1，远低于同等规模的 CNN（如 EfficientNet-B7 的 84.3%）。核心问题在于：<strong>Transformer 缺乏 CNN 固有的归纳偏置</strong>（局部连接、平移等变性），因此需要更多数据来学习这些视觉先验。</p>\n<div class=\"key-point\">💡 <strong>关键洞察</strong>：与其收集更多数据，不如通过<strong>知识蒸馏</strong>从 CNN 教师中\"继承\"归纳偏置，同时配合精心设计的训练策略来弥补数据不足。</div>\n<h5>核心机制 1：Distillation Token</h5>\n<p>DeiT 的核心创新是在 ViT 架构中引入一个专用的 <strong>distillation token</strong>。标准 ViT 在 patch embedding 序列前拼接一个 class token <span class=\"kb-math kb-math-inline\">[\\texttt{CLS}]</span>，DeiT 在此基础上再拼接一个 distillation token <span class=\"kb-math kb-math-inline\">[\\texttt{DIST}]</span>：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{z}_0 = [\\mathbf{x}_{\\text{class}};\\, \\mathbf{x}_{\\text{dist}};\\, \\mathbf{x}_1^p;\\, \\mathbf{x}_2^p;\\, \\cdots;\\, \\mathbf{x}_N^p] + \\mathbf{E}_{\\text{pos}}</div>\n<p>两个 token 在所有 Transformer 层中通过自注意力与 patch token 交互，但在输出端连接<strong>不同的线性分类头</strong>：\n- <strong>Class head</strong>：以真实标签 <span class=\"kb-math kb-math-inline\">y</span> 为监督目标\n- <strong>Distillation head</strong>：以教师模型的输出为监督目标</p>\n<div class=\"key-point\">💡 <strong>为什么不直接用两个 class token？</strong> 实验表明，两个相同目标的 class token 会在训练中收敛到几乎相同的向量（余弦相似度 0.999），不提供额外信息。而 distillation token 与 class token 学到的表示显著不同（初始层余弦相似度仅 0.06），在最后一层才逐渐趋近（0.93），说明两者提供了<strong>互补的信息</strong>。</div>\n<h5>核心机制 2：Hard vs Soft Distillation</h5>\n<p>DeiT 探索了两种蒸馏策略：</p>\n<p><strong>Soft Distillation</strong>（传统 KD）：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{soft}} = (1-\\lambda)\\,\\mathcal{L}_{\\text{CE}}(\\psi(Z_s),\\, y) + \\lambda\\,\\tau^2\\,\\text{KL}\\!\\left(\\psi\\!\\left(\\frac{Z_s}{\\tau}\\right),\\, \\psi\\!\\left(\\frac{Z_t}{\\tau}\\right)\\right)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\psi</span> 为 softmax，<span class=\"kb-math kb-math-inline\">Z_s, Z_t</span> 分别为学生和教师的 logits，<span class=\"kb-math kb-math-inline\">\\tau=3.0</span> 为温度，<span class=\"kb-math kb-math-inline\">\\lambda=0.1</span> 为平衡权重。</p>\n<p><strong>Hard Distillation</strong>（DeiT 推荐）：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{hard}} = \\frac{1}{2}\\,\\mathcal{L}_{\\text{CE}}(\\psi(Z_s),\\, y) + \\frac{1}{2}\\,\\mathcal{L}_{\\text{CE}}(\\psi(Z_s),\\, y_t)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">y_t = \\arg\\max_c Z_t(c)</span> 是教师的硬预测标签。</p>\n<div class=\"warn-box\">⚠️ <strong>关键发现</strong>：Hard distillation 在 DeiT 上显著优于 soft distillation（83.0% vs 81.8%），这与传统 CNN 蒸馏中 soft distillation 通常更优的结论相反。原因可能是：(1) 硬标签与 label smoothing（<span class=\"kb-math kb-math-inline\">\\varepsilon=0.1</span>）结合后已包含足够的软信息；(2) 硬标签无需调节 <span class=\"kb-math kb-math-inline\">\\tau</span> 和 <span class=\"kb-math kb-math-inline\">\\lambda</span>，更鲁棒。</div>\n<h5>核心机制 3：CNN 教师传递归纳偏置</h5>\n<p>DeiT 发现 <strong>CNN 教师优于 Transformer 教师</strong>：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th style=\"text-align: left;\">教师模型</th>\n<th style=\"text-align: center;\">教师 acc.</th>\n<th style=\"text-align: center;\">DeiT-B 学生</th>\n<th style=\"text-align: center;\">DeiT-B↑384</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td style=\"text-align: left;\">DeiT-B (Transformer)</td>\n<td style=\"text-align: center;\">81.8%</td>\n<td style=\"text-align: center;\">81.9%</td>\n<td style=\"text-align: center;\">83.1%</td>\n</tr>\n<tr>\n<td style=\"text-align: left;\">RegNetY-16GF (CNN)</td>\n<td style=\"text-align: center;\">82.9%</td>\n<td style=\"text-align: center;\">83.1%</td>\n<td style=\"text-align: center;\">84.2%</td>\n</tr>\n</tbody>\n</table></div>\n<p>即使教师准确率接近，CNN 教师也能带来更大的提升。这是因为蒸馏过程中，学生 Transformer 可以<strong>继承 CNN 的归纳偏置</strong>——局部性和平移等变性等视觉先验通过教师的预测隐式传递给学生。实验还发现，distillation token 的输出与 CNN 教师的预测更相关，而 class token 的输出更接近纯标签训练的 Transformer。</p>\n<h5>训练策略：数据增强与正则化</h5>\n<p>DeiT 的成功不仅依赖蒸馏，更依赖一套精心调优的训练策略。以下是关键组件的消融实验（DeiT-B, 300 epochs）：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th style=\"text-align: left;\">配置变化</th>\n<th style=\"text-align: center;\">224² top-1</th>\n<th style=\"text-align: center;\">384² top-1</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td style=\"text-align: left;\"><strong>完整配置（基线）</strong></td>\n<td style=\"text-align: center;\"><strong>81.8%</strong></td>\n<td style=\"text-align: center;\"><strong>83.1%</strong></td>\n</tr>\n<tr>\n<td style=\"text-align: left;\">SGD 替代 AdamW</td>\n<td style=\"text-align: center;\">74.5%</td>\n<td style=\"text-align: center;\">77.3%</td>\n</tr>\n<tr>\n<td style=\"text-align: left;\">去掉 RandAugment</td>\n<td style=\"text-align: center;\">79.6%</td>\n<td style=\"text-align: center;\">80.4%</td>\n</tr>\n<tr>\n<td style=\"text-align: left;\">去掉 Mixup</td>\n<td style=\"text-align: center;\">78.7%</td>\n<td style=\"text-align: center;\">79.8%</td>\n</tr>\n<tr>\n<td style=\"text-align: left;\">去掉 CutMix</td>\n<td style=\"text-align: center;\">80.0%</td>\n<td style=\"text-align: center;\">80.6%</td>\n</tr>\n<tr>\n<td style=\"text-align: left;\">去掉 Mixup + CutMix</td>\n<td style=\"text-align: center;\">75.8%</td>\n<td style=\"text-align: center;\">76.7%</td>\n</tr>\n<tr>\n<td style=\"text-align: left;\">去掉 Stochastic Depth</td>\n<td style=\"text-align: center;\">不收敛*</td>\n<td style=\"text-align: center;\">—</td>\n</tr>\n<tr>\n<td style=\"text-align: left;\">去掉 Repeated Augmentation</td>\n<td style=\"text-align: center;\">76.5%</td>\n<td style=\"text-align: center;\">77.4%</td>\n</tr>\n<tr>\n<td style=\"text-align: left;\">加入 Dropout</td>\n<td style=\"text-align: center;\">81.3%</td>\n<td style=\"text-align: center;\">83.1%</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 <strong>关键训练超参数</strong>：300 epochs，batch size 1024，AdamW（lr=5×10⁻⁴ × batchsize/512），cosine LR decay，weight decay 0.05，warmup 5 epochs，label smoothing ε=0.1，stochastic depth rate 0.1，RandAugment 9/0.5，Mixup α=0.8，CutMix α=1.0，Random Erasing p=0.25。</div>\n<p>核心结论：\n1. <strong>AdamW 是必须的</strong>——SGD 导致 7.3% 的巨大性能下降\n2. <strong>Mixup + CutMix 组合至关重要</strong>——去掉两者导致 6% 下降\n3. <strong>Stochastic Depth 不可或缺</strong>——没有它模型无法收敛\n4. <strong>Repeated Augmentation 贡献巨大</strong>——去掉导致 5.3% 下降\n5. <strong>Dropout 反而有害</strong>——与 Stochastic Depth 存在冲突</p>\n<h5>模型变体与最终结果</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th style=\"text-align: left;\">模型</th>\n<th style=\"text-align: center;\">Embedding dim</th>\n<th style=\"text-align: center;\">Heads</th>\n<th style=\"text-align: center;\">Params</th>\n<th style=\"text-align: center;\">ImageNet top-1</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td style=\"text-align: left;\">DeiT-Ti</td>\n<td style=\"text-align: center;\">192</td>\n<td style=\"text-align: center;\">3</td>\n<td style=\"text-align: center;\">5M</td>\n<td style=\"text-align: center;\">72.2%</td>\n</tr>\n<tr>\n<td style=\"text-align: left;\">DeiT-S</td>\n<td style=\"text-align: center;\">384</td>\n<td style=\"text-align: center;\">6</td>\n<td style=\"text-align: center;\">22M</td>\n<td style=\"text-align: center;\">79.8%</td>\n</tr>\n<tr>\n<td style=\"text-align: left;\">DeiT-B</td>\n<td style=\"text-align: center;\">768</td>\n<td style=\"text-align: center;\">12</td>\n<td style=\"text-align: center;\">86M</td>\n<td style=\"text-align: center;\">81.8%</td>\n</tr>\n<tr>\n<td style=\"text-align: left;\">DeiT⚗-B</td>\n<td style=\"text-align: center;\">768</td>\n<td style=\"text-align: center;\">12</td>\n<td style=\"text-align: center;\">86M</td>\n<td style=\"text-align: center;\">83.4%</td>\n</tr>\n<tr>\n<td style=\"text-align: left;\">DeiT⚗-B↑384</td>\n<td style=\"text-align: center;\">768</td>\n<td style=\"text-align: center;\">12</td>\n<td style=\"text-align: center;\">86M</td>\n<td style=\"text-align: center;\">84.4%</td>\n</tr>\n<tr>\n<td style=\"text-align: left;\">DeiT⚗-B↑384 (1000ep)</td>\n<td style=\"text-align: center;\">768</td>\n<td style=\"text-align: center;\">12</td>\n<td style=\"text-align: center;\">86M</td>\n<td style=\"text-align: center;\"><strong>85.2%</strong></td>\n</tr>\n<tr>\n<td style=\"text-align: left;\">ViT-B/16@JFT-300M</td>\n<td style=\"text-align: center;\">768</td>\n<td style=\"text-align: center;\">12</td>\n<td style=\"text-align: center;\">86M</td>\n<td style=\"text-align: center;\">84.15%</td>\n</tr>\n</tbody>\n</table></div>\n<p>DeiT⚗-B↑384 在 1000 epoch 训练下达到 85.2%，<strong>仅用 ImageNet-1k 就超越了在 JFT-300M（3 亿张图像）上预训练的 ViT-B</strong>。同时，DeiT 在下游任务（CIFAR-10/100、Flowers、Cars、iNaturalist 等）上的迁移学习表现也与 CNN 和大数据预训练的 ViT 相当。</p>",
      "quiz": {
        "q": "DeiT 中 hard distillation 优于 soft distillation 的关键原因是什么？",
        "options": [
          "hard distillation 使用了更高的温度参数 τ",
          "hard distillation 的教师硬标签配合 label smoothing 已包含足够信息，且无需调节 τ 和 λ 超参数",
          "hard distillation 使用了更强的数据增强策略",
          "hard distillation 的梯度更新幅度更大，收敛更快"
        ],
        "answer": 1,
        "explain": "Hard distillation 将教师的 argmax 硬标签作为伪标签，配合 label smoothing (ε=0.1) 已隐式包含软信息，同时避免了 soft distillation 中温度 τ 和权重 λ 的超参数敏感性问题，在 DeiT 上达到 83.0% vs 81.8% 的显著优势。"
      }
    },
    {
      "id": "swin_transformer",
      "num": 10,
      "name": "Swin Transformer",
      "fullName": "移动窗口Transformer (Shifted Window Transformer)",
      "year": "2021.03",
      "org": "微软亚洲研究院",
      "parent": "vit",
      "paperUrl": "https://arxiv.org/abs/2103.14030",
      "projectUrl": "",
      "category": "vit_era",
      "motivation": "引入移动窗口机制，将计算复杂度降至线性并构建层级特征",
      "summary": "Swin Transformer 提出了基于**移动窗口（Shifted Window）**的层级式 Vision Transformer 架构，通过在局部窗口内计算自注意力将复杂度从二次降至线性，并借助窗口移位策略实现跨窗口信息交互，使 Transformer 首次作为通用视觉骨干在分类、检测、分割任务上全面超越 CNN。",
      "keyPoints": [
        "<strong>层级式特征金字塔</strong>：通过 Patch Merging 逐阶段下采样（4×→8×→16×→32×），生成多尺度特征图，可直接替代 CNN 骨干接入 FPN/UPerNet 等下游头",
        "<strong>窗口自注意力（W-MSA）</strong>：将特征图划分为不重叠的 <span class=\"kb-math kb-math-inline\">M \\times M</span> 局部窗口，在窗口内计算自注意力，复杂度从 <span class=\"kb-math kb-math-inline\">O((hw)^2)</span> 降至 <span class=\"kb-math kb-math-inline\">O(M^2 \\cdot hw)</span>，对输入尺寸线性",
        "<strong>移动窗口自注意力（SW-MSA）</strong>：相邻 Transformer 块交替使用常规窗口与移位窗口（偏移 <span class=\"kb-math kb-math-inline\">\\lfloor M/2 \\rfloor</span> 像素），在不增加计算量的前提下建立跨窗口连接",
        "<strong>循环移位 + 掩码的高效实现</strong>：通过向左上方循环移位将移位后的子窗口拼回等大窗口，配合注意力掩码保证正确性，避免窗口数量增加",
        "<strong>相对位置偏置（Relative Position Bias）</strong>：在注意力矩阵中加入可学习的相对位置偏置 <span class=\"kb-math kb-math-inline\">B</span>，替代绝对位置编码，效果更优且支持跨分辨率迁移",
        "<strong>四种模型变体</strong>：Swin-T / S / B / L，分别对标 ResNet-50 / ResNet-101 / ViT-B / 更大模型，覆盖不同计算预算"
      ],
      "detail": "<h5>整体架构</h5>\n<p><img alt=\"Swin Transformer 架构总览\" src=\"https://ar5iv.labs.arxiv.org/html/2103.14030/assets/figs/teaser11.png\" />\n<em>图 1：(a) Swin Transformer 构建层级特征图，仅在局部窗口内计算自注意力，复杂度对输入尺寸线性；(b) ViT 生成单一低分辨率特征图，全局自注意力导致二次复杂度。</em></p>\n<p><img alt=\"Swin Transformer Block 结构\" src=\"https://ar5iv.labs.arxiv.org/html/2103.14030/assets/x1.png\" />\n<em>图 2：(a) Swin-T 整体架构；(b) 连续两个 Swin Transformer Block，交替使用 W-MSA 和 SW-MSA。</em></p>\n<p>Swin Transformer 的整体流程如下：</p>\n<ol>\n<li><strong>Patch Splitting + Linear Embedding（Stage 1 入口）</strong>：输入 RGB 图像被切分为 <span class=\"kb-math kb-math-inline\">4 \\times 4</span> 的不重叠 patch，每个 patch 展平为 48 维向量，经线性层投影到 <span class=\"kb-math kb-math-inline\">C</span> 维，得到 <span class=\"kb-math kb-math-inline\">\\frac{H}{4} \\times \\frac{W}{4}</span> 个 token。</li>\n<li><strong>Swin Transformer Blocks</strong>：在每个 Stage 内，多个 Swin Transformer Block 对 token 序列进行特征变换，token 数量不变。</li>\n<li><strong>Patch Merging（Stage 2/3/4 入口）</strong>：将相邻 <span class=\"kb-math kb-math-inline\">2 \\times 2</span> 个 token 的特征拼接（4C 维），再经线性层降至 2C 维，实现 2× 空间下采样。</li>\n<li>四个 Stage 的输出分辨率分别为 <span class=\"kb-math kb-math-inline\">\\frac{H}{4}, \\frac{H}{8}, \\frac{H}{16}, \\frac{H}{32}</span>，与 ResNet 的 C2–C5 特征层完全对齐。</li>\n</ol>\n<h5>核心机制：窗口自注意力与移动窗口</h5>\n<p><strong>动机与背景</strong>：ViT 对所有 token 计算全局自注意力，复杂度为 <span class=\"kb-math kb-math-inline\">O(n^2)</span>，当输入分辨率较高时（如检测任务需要 800×1200），token 数量可达数万，计算代价不可接受。传统 CNN 通过局部卷积核天然具有线性复杂度，但感受野受限。Swin Transformer 的目标是<strong>兼顾局部高效计算与全局信息流通</strong>。</p>\n<p><strong>窗口自注意力（W-MSA）</strong>：将 <span class=\"kb-math kb-math-inline\">h \\times w</span> 的 token 网格均匀划分为 <span class=\"kb-math kb-math-inline\">\\frac{h}{M} \\times \\frac{w}{M}</span> 个大小为 <span class=\"kb-math kb-math-inline\">M \\times M</span> 的不重叠窗口，自注意力仅在每个窗口内部计算。复杂度对比：</p>\n<div class=\"kb-math kb-math-display\">\\Omega(\\text{MSA}) = 4hwC^2 + 2(hw)^2C</div>\n<div class=\"kb-math kb-math-display\">\\Omega(\\text{W-MSA}) = 4hwC^2 + 2M^2hwC</div>\n<p>当 <span class=\"kb-math kb-math-inline\">M</span> 固定（默认 <span class=\"kb-math kb-math-inline\">M=7</span>）时，W-MSA 的复杂度对 <span class=\"kb-math kb-math-inline\">hw</span> 为<strong>线性</strong>，而全局 MSA 为<strong>二次</strong>。</p>\n<div class=\"key-point\">💡 关键：W-MSA 将全局注意力的 <span class=\"kb-math kb-math-inline\">O(n^2)</span> 瓶颈项 <span class=\"kb-math kb-math-inline\">2(hw)^2C</span> 替换为 <span class=\"kb-math kb-math-inline\">2M^2 \\cdot hwC</span>，其中 <span class=\"kb-math kb-math-inline\">M^2=49</span> 是常数，因此整体复杂度变为线性。</div>\n<p><strong>移动窗口自注意力（SW-MSA）</strong>：W-MSA 的窗口之间没有信息交互，限制了建模能力。Swin Transformer 在连续的两个 Block 中交替使用常规窗口和移位窗口：</p>\n<p><img alt=\"移动窗口示意图\" src=\"https://ar5iv.labs.arxiv.org/html/2103.14030/assets/figs/teaser_v4.png\" />\n<em>图 3：移动窗口机制——Layer l 使用常规窗口划分，Layer l+1 将窗口偏移 <span class=\"kb-math kb-math-inline\">\\lfloor M/2 \\rfloor</span> 像素，使得相邻窗口的边界区域在新窗口中相遇，实现跨窗口连接。</em></p>\n<p>连续两个 Block 的计算公式为：</p>\n<div class=\"kb-math kb-math-display\">\\hat{\\mathbf{z}}^l = \\text{W-MSA}(\\text{LN}(\\mathbf{z}^{l-1})) + \\mathbf{z}^{l-1}</div>\n<div class=\"kb-math kb-math-display\">\\mathbf{z}^l = \\text{MLP}(\\text{LN}(\\hat{\\mathbf{z}}^l)) + \\hat{\\mathbf{z}}^l</div>\n<div class=\"kb-math kb-math-display\">\\hat{\\mathbf{z}}^{l+1} = \\text{SW-MSA}(\\text{LN}(\\mathbf{z}^l)) + \\mathbf{z}^l</div>\n<div class=\"kb-math kb-math-display\">\\mathbf{z}^{l+1} = \\text{MLP}(\\text{LN}(\\hat{\\mathbf{z}}^{l+1})) + \\hat{\\mathbf{z}}^{l+1}</div>\n<p>其中 W-MSA 和 SW-MSA 分别表示常规窗口和移位窗口的多头自注意力。每个 Block 内部结构与标准 Transformer 一致：LayerNorm → (S)W-MSA → 残差 → LayerNorm → MLP（2 层，GELU 激活，扩展率 4×）→ 残差。</p>\n<h5>高效循环移位实现</h5>\n<p><img alt=\"循环移位批量计算\" src=\"https://ar5iv.labs.arxiv.org/html/2103.14030/assets/x2.png\" />\n<em>图 4：循环移位的高效批量计算方法——将特征图向左上方循环移位后，移位窗口重新对齐为等大窗口，配合注意力掩码保证不同子窗口之间不交互。</em></p>\n<p>移位窗口划分会产生更多且大小不一的窗口（从 <span class=\"kb-math kb-math-inline\">\\lceil\\frac{h}{M}\\rceil \\times \\lceil\\frac{w}{M}\\rceil</span> 增加到 <span class=\"kb-math kb-math-inline\">(\\lceil\\frac{h}{M}\\rceil+1) \\times (\\lceil\\frac{w}{M}\\rceil+1)</span>）。朴素的 padding + mask 方案会使窗口数增加 2.25 倍。Swin Transformer 提出<strong>循环移位（Cyclic Shift）</strong>策略：</p>\n<ol>\n<li>将特征图向左上方循环移位 <span class=\"kb-math kb-math-inline\">\\lfloor M/2 \\rfloor</span> 个像素</li>\n<li>移位后的特征图仍按常规方式划分为等大窗口</li>\n<li>在注意力计算中施加<strong>掩码矩阵</strong>，确保来自不同原始区域的 token 之间不产生注意力</li>\n<li>计算完成后将结果反向移位恢复</li>\n</ol>\n<div class=\"warn-box\">⚠️ 注意：循环移位不改变窗口数量，因此 SW-MSA 与 W-MSA 的计算量完全相同，仅多了移位和掩码操作的极小开销。</div>\n<h5>相对位置偏置</h5>\n<p>Swin Transformer 在注意力计算中引入可学习的<strong>相对位置偏置</strong> <span class=\"kb-math kb-math-inline\">B</span>：</p>\n<div class=\"kb-math kb-math-display\">\\text{Attention}(Q, K, V) = \\text{SoftMax}\\left(\\frac{QK^T}{\\sqrt{d}} + B\\right)V</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">Q, K, V \\in \\mathbb{R}^{M^2 \\times d}</span>，<span class=\"kb-math kb-math-inline\">B \\in \\mathbb{R}^{M^2 \\times M^2}</span>。由于相对位置沿每个轴的范围为 <span class=\"kb-math kb-math-inline\">[-(M-1), M-1]</span>，实际参数化一个较小的偏置矩阵 <span class=\"kb-math kb-math-inline\">\\hat{B} \\in \\mathbb{R}^{(2M-1) \\times (2M-1)}</span>，<span class=\"kb-math kb-math-inline\">B</span> 中的值通过索引从 <span class=\"kb-math kb-math-inline\">\\hat{B}</span> 中取出。</p>\n<div class=\"key-point\">💡 关键：相对位置偏置相比绝对位置编码有两大优势——(1) 更好地编码 token 间的空间关系，实验中带来显著精度提升；(2) 预训练的偏置可通过双三次插值迁移到不同窗口大小，支持灵活的分辨率微调。</div>\n<h5>与 ViT 的核心区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>ViT</th>\n<th>Swin Transformer</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>特征分辨率</td>\n<td>单一（16× 下采样）</td>\n<td>多尺度金字塔（4×/8×/16×/32×）</td>\n</tr>\n<tr>\n<td>自注意力范围</td>\n<td>全局（所有 token）</td>\n<td>局部窗口（<span class=\"kb-math kb-math-inline\">M \\times M</span>）</td>\n</tr>\n<tr>\n<td>计算复杂度</td>\n<td><span class=\"kb-math kb-math-inline\">O(n^2)</span> 二次</td>\n<td><span class=\"kb-math kb-math-inline\">O(n)</span> 线性</td>\n</tr>\n<tr>\n<td>位置编码</td>\n<td>绝对位置编码</td>\n<td>相对位置偏置</td>\n</tr>\n<tr>\n<td>下游任务适配</td>\n<td>需额外适配（如 ViTDet）</td>\n<td>天然兼容 FPN/UPerNet 等</td>\n</tr>\n<tr>\n<td>跨窗口信息流</td>\n<td>天然全局</td>\n<td>移动窗口机制</td>\n</tr>\n</tbody>\n</table></div>\n<h5>模型变体与伪代码</h5>\n<pre><code class=\"language-python\"># Swin Transformer 前向传播伪代码\ndef swin_transformer_forward(image):\n    # Stage 1: Patch Splitting + Linear Embedding\n    x = patch_split(image, patch_size=4)        # [B, H/4*W/4, 48]\n    x = linear_embed(x, dim=C)                  # [B, H/4*W/4, C]\n    for block in stage1_blocks:                  # {2,2,6,2} blocks per stage\n        x = swin_block(x, shift=False)           # W-MSA\n        x = swin_block(x, shift=True)            # SW-MSA\n\n    # Stage 2/3/4: Patch Merging + Swin Blocks\n    for stage in [stage2, stage3, stage4]:\n        x = patch_merge(x)                       # 2x downsample, 2C dim\n        for block in stage.blocks:\n            x = swin_block(x, shift=False)\n            x = swin_block(x, shift=True)\n\n    return x  # 多尺度特征 {C, 2C, 4C, 8C}\n\ndef swin_block(x, shift):\n    # 循环移位（仅 SW-MSA）\n    if shift:\n        x_shifted = cyclic_shift(x, displacement=M//2)\n        attn_mask = create_mask()\n    else:\n        x_shifted = x\n        attn_mask = None\n\n    # Window Partition → Attention → Window Reverse\n    windows = partition_windows(x_shifted, M=7)  # [num_win*B, M*M, C]\n    attn_out = window_attention(windows, mask=attn_mask,\n                                 rel_pos_bias=B_hat)\n    x_out = reverse_windows(attn_out)\n\n    if shift:\n        x_out = cyclic_shift(x_out, displacement=-M//2)  # 反向移位\n\n    return x_out\n</code></pre>\n<p>四种模型变体的超参数配置：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>变体</th>\n<th>嵌入维度 C</th>\n<th>各 Stage 层数</th>\n<th>参数量</th>\n<th>FLOPs</th>\n<th>对标模型</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Swin-T</td>\n<td>96</td>\n<td>{2, 2, 6, 2}</td>\n<td>29M</td>\n<td>4.5G</td>\n<td>ResNet-50 / DeiT-S</td>\n</tr>\n<tr>\n<td>Swin-S</td>\n<td>96</td>\n<td>{2, 2, 18, 2}</td>\n<td>50M</td>\n<td>8.7G</td>\n<td>ResNet-101</td>\n</tr>\n<tr>\n<td>Swin-B</td>\n<td>128</td>\n<td>{2, 2, 18, 2}</td>\n<td>88M</td>\n<td>15.4G</td>\n<td>ViT-B / DeiT-B</td>\n</tr>\n<tr>\n<td>Swin-L</td>\n<td>192</td>\n<td>{2, 2, 18, 2}</td>\n<td>197M</td>\n<td>34.5G</td>\n<td>—</td>\n</tr>\n</tbody>\n</table></div>\n<p>所有变体默认窗口大小 <span class=\"kb-math kb-math-inline\">M=7</span>，每头 query 维度 <span class=\"kb-math kb-math-inline\">d=32</span>，MLP 扩展率 <span class=\"kb-math kb-math-inline\">\\alpha=4</span>。</p>",
      "quiz": {
        "q": "Swin Transformer 中移动窗口（Shifted Window）机制的主要作用是什么？",
        "options": [
          "减少模型参数量以提升推理速度",
          "在不增加计算量的前提下建立相邻窗口之间的信息交互",
          "将自注意力的复杂度从线性降至对数级别",
          "替代相对位置偏置以编码空间位置信息"
        ],
        "answer": 1,
        "explain": "W-MSA 仅在窗口内部计算注意力，窗口间无信息流通。SW-MSA 通过将窗口偏移 ⌊M/2⌋ 像素，使原本处于不同窗口边界的 token 在新窗口中相遇，从而建立跨窗口连接，且配合循环移位保持窗口数不变，计算量与 W-MSA 相同。"
      }
    },
    {
      "id": "convnext",
      "num": 11,
      "name": "ConvNeXt",
      "fullName": "现代卷积网络 (A ConvNet for the 2020s)",
      "year": "2022.01",
      "org": "Meta AI",
      "parent": "resnet",
      "paperUrl": "https://arxiv.org/abs/2201.03545",
      "projectUrl": "",
      "category": "modern_efficient",
      "motivation": "借鉴Transformer技巧现代化改造CNN",
      "summary": "ConvNeXt 通过系统性地将 Vision Transformer 的设计策略（大核深度可分离卷积、倒瓶颈结构、LayerNorm、GELU 等）逐步移植到标准 ResNet 架构中，证明了纯卷积网络在精度和可扩展性上可以与 Swin Transformer 匹敌甚至超越，在 ImageNet 上达到 87.8% top-1 准确率，同时在 COCO 检测和 ADE20K 分割任务上也优于 Swin Transformer。",
      "keyPoints": [
        "<strong>渐进式现代化路线图</strong>：从标准 ResNet-50 出发，经过 7 步改造逐步逼近并超越 Swin-T（76.1% → 82.0%）",
        "<strong>现代训练策略</strong>：采用 300 epoch、AdamW、Mixup、CutMix、RandAugment、Stochastic Depth、Label Smoothing 等 Transformer 训练技巧，仅此一项即提升 +2.7%",
        "<strong>宏观设计调整</strong>：阶段计算比从 (3,4,6,3) 改为 (3,3,9,3)；Stem 从 7×7 conv + maxpool 改为 4×4 stride-4 patchify 卷积",
        "<strong>深度可分离卷积 + 通道扩展</strong>：采用 depthwise conv 分离空间与通道混合，通道数从 64 扩展到 96（对齐 Swin-T）",
        "<strong>倒瓶颈结构</strong>：MLP 隐藏维度为输入的 4 倍，与 Transformer FFN 设计一致",
        "<strong>7×7 大核卷积</strong>：将 depthwise conv 上移至 block 开头并增大到 7×7，模拟 Transformer 的大感受野",
        "<strong>微观设计</strong>：GELU 替换 ReLU、每 block 仅 1 个激活函数和 1 个 LayerNorm、独立下采样层",
        "<strong>模型家族</strong>：ConvNeXt-T/S/B/L/XL，参数量和 FLOPs 与 Swin 系列对齐",
        "<strong>ImageNet-22K 预训练 + ImageNet-1K 微调</strong>：ConvNeXt-XL 达到 87.8% top-1"
      ],
      "detail": "<p><img alt=\"ConvNeXt 现代化路线图\" src=\"https://ar5iv.labs.arxiv.org/html/2201.03545/assets/x2.png\" />\n<em>图：从标准 ResNet 到 ConvNeXt 的渐进式现代化路线图。每一步改造对应的 ImageNet-1K top-1 准确率变化。</em></p>\n<p><img alt=\"ConvNeXt Block 设计对比\" src=\"https://ar5iv.labs.arxiv.org/html/2201.03545/assets/x4.png\" />\n<em>图：ResNet、Swin Transformer 和 ConvNeXt 的 block 结构对比。ConvNeXt block 用纯卷积模块实现了与 Transformer block 等价的设计模式。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># ConvNeXt Block 伪代码\ndef convnext_block(x):\n    residual = x\n    # 1. 7×7 Depthwise Conv（大核空间混合，类似 MSA 的局部窗口注意力）\n    x = depthwise_conv7x7(x)       # [B, C, H, W] → [B, C, H, W]\n    x = layer_norm(x)\n    # 2. 1×1 Conv 升维（倒瓶颈，扩展 4 倍，类似 Transformer FFN）\n    x = pointwise_conv(x, C * 4)   # [B, C, H, W] → [B, 4C, H, W]\n    x = gelu(x)                    # 唯一的激活函数\n    # 3. 1×1 Conv 降维\n    x = pointwise_conv(x, C)       # [B, 4C, H, W] → [B, C, H, W]\n    # 4. Stochastic Depth + 残差连接\n    x = stochastic_depth(x) + residual\n    return x\n\n# ConvNeXt 整体架构\ndef convnext(image):\n    # Stem: Patchify（4×4 conv, stride 4）\n    x = conv2d(image, kernel=4, stride=4, out_ch=C)  # [B,3,224,224] → [B,C,56,56]\n    x = layer_norm(x)\n\n    # Stage 1-4，每个 stage 之间有独立下采样层\n    for stage_id in [1, 2, 3, 4]:\n        if stage_id &gt; 1:\n            x = layer_norm(x)\n            x = conv2d(x, kernel=2, stride=2, out_ch=C*2)  # 空间减半，通道翻倍\n        for _ in range(num_blocks[stage_id]):\n            x = convnext_block(x)\n\n    # 分类头\n    x = global_avg_pool(x)         # [B, C_last, H, W] → [B, C_last]\n    x = layer_norm(x)\n    logits = linear(x, num_classes)\n    return logits\n</code></pre>\n<h5>动机与背景</h5>\n<p>2020 年代初，Vision Transformer (ViT) 及其层级变体 Swin Transformer 在视觉识别领域迅速崛起，在 ImageNet 分类、COCO 检测、ADE20K 分割等任务上全面超越传统 ConvNet。然而，Swin Transformer 的成功在很大程度上<strong>重新引入了卷积网络的归纳偏置</strong>（层级结构、局部窗口），这引发了一个根本性问题：<strong>ConvNet 与 Transformer 之间的性能差距，究竟源于 Transformer 架构本身的优越性，还是仅仅因为 ConvNet 没有采用现代的训练策略和设计选择？</strong></p>\n<p>ConvNeXt 的核心动机就是回答这个问题。作者从标准 ResNet-50 出发，系统性地将 Swin Transformer 的每一个设计决策\"翻译\"为卷积网络的等价实现，逐步缩小差距，最终证明<strong>纯卷积网络完全可以达到甚至超越 Transformer 的性能</strong>。</p>\n<h5>核心机制：七步现代化路线图</h5>\n<p>ConvNeXt 的方法论本身就是其最大创新——不是提出单一新模块，而是通过<strong>受控实验</strong>逐步改造 ResNet，每一步对应一个从 Transformer 借鉴的设计选择：</p>\n<p><strong>第一步：现代训练策略（76.1% → 78.8%，+2.7%）</strong></p>\n<p>传统 ResNet 使用 90 epoch + SGD 训练。作者改用 Transformer 社区的训练配方：</p>\n<ul>\n<li>训练 300 epoch，AdamW 优化器</li>\n<li>数据增强：Mixup、CutMix、RandAugment、Random Erasing</li>\n<li>正则化：Stochastic Depth、Label Smoothing</li>\n</ul>\n<div class=\"key-point\">💡 关键：仅改变训练策略（不改架构），ResNet-50 就从 76.1% 提升到 78.8%，说明传统 ConvNet 与 Transformer 的性能差距中有相当一部分来自训练策略而非架构。</div>\n<p><strong>第二步：宏观设计——阶段计算比（78.8% → 79.4%）</strong></p>\n<p>ResNet-50 的四阶段 block 数为 (3, 4, 6, 3)，而 Swin-T 为 (1:1:3:1) 比例。作者将 block 数调整为 <strong>(3, 3, 9, 3)</strong>，将更多计算集中在第三阶段（分辨率 14×14），与 Swin-T 对齐。</p>\n<p><strong>第三步：宏观设计——Patchify Stem（79.4% → 79.5%）</strong></p>\n<p>将 ResNet 的 7×7 conv stride-2 + maxpool 替换为 <strong>4×4 conv stride-4 的非重叠卷积</strong>，与 ViT/Swin 的 patch embedding 等价。这一步性能变化微小，但简化了网络入口。</p>\n<p><strong>第四步：ResNeXt 化——深度可分离卷积（79.5% → 80.5%）</strong></p>\n<p>采用 <strong>depthwise convolution</strong>（分组数 = 通道数），实现空间与通道信息的分离混合，这与 Transformer 中 MSA（空间混合）和 FFN（通道混合）的分离设计理念一致。同时将网络宽度从 64 扩展到 96 以补偿容量。</p>\n<div class=\"kb-math kb-math-display\">\\text{Depthwise Conv: } y_c = \\sum_{(i,j) \\in \\mathcal{N}} w_c^{(i,j)} \\cdot x_c^{(i,j)}, \\quad \\forall c \\in \\{1,...,C\\}</div>\n<p>每个通道独立进行空间卷积，再通过 <span class=\"kb-math kb-math-inline\">1 \\times 1</span> pointwise conv 进行通道间信息交换。</p>\n<p><strong>第五步：倒瓶颈结构（80.5% → 80.6%）</strong></p>\n<p>Transformer FFN 的隐藏维度是输入的 4 倍，形成\"窄→宽→窄\"的倒瓶颈。作者将 ResNet block 从传统的\"宽→窄→宽\"瓶颈改为 <strong>倒瓶颈</strong>（expansion ratio = 4），与 MobileNetV2 的设计一致。</p>\n<div class=\"warn-box\">⚠️ 注意：倒瓶颈在 ResNet-50 级别提升微小（+0.1%），但在 ResNet-200 级别带来显著提升（+0.7%），说明该设计在大模型中更有效。</div>\n<p><strong>第六步：大核卷积（80.6% → 80.6%，但为后续微观设计奠定基础）</strong></p>\n<p>这一步包含两个子操作：</p>\n<ol>\n<li><strong>上移 depthwise conv</strong>：将其从 block 中间移到开头（类似 Transformer 中 MSA 在 FFN 之前），使大核卷积作用在低维空间，降低计算量</li>\n<li><strong>增大卷积核到 7×7</strong>：实验了 3/5/7/9/11 多种核大小，发现 <strong>7×7 是最佳平衡点</strong>，与 Swin Transformer 的 7×7 窗口大小一致</li>\n</ol>\n<div class=\"kb-math kb-math-display\">\\text{感受野对比: } \\underbrace{3 \\times 3}_{\\text{ResNet}} \\ll \\underbrace{7 \\times 7}_{\\text{ConvNeXt/Swin}}</div>\n<p><strong>第七步：微观设计（80.6% → 82.0%，+1.4%）</strong></p>\n<p>这是提升最大的一步，包含四个子改动：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>改动</th>\n<th>准确率变化</th>\n<th>说明</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>ReLU → GELU</td>\n<td>80.6%（不变）</td>\n<td>更平滑的激活函数，与 BERT/GPT 一致</td>\n</tr>\n<tr>\n<td>减少激活函数数量</td>\n<td>→ 81.3%（+0.7%）</td>\n<td>每 block 仅在两个 1×1 conv 之间保留 1 个 GELU</td>\n</tr>\n<tr>\n<td>减少归一化层数量</td>\n<td>→ 81.4%（+0.1%）</td>\n<td>每 block 仅保留 1 个归一化层</td>\n</tr>\n<tr>\n<td>BN → LN</td>\n<td>→ 81.5%（+0.1%）</td>\n<td>LayerNorm 替换 BatchNorm</td>\n</tr>\n<tr>\n<td>独立下采样层</td>\n<td>→ 82.0%（+0.5%）</td>\n<td>用 2×2 stride-2 conv 替代 stride-2 残差块，阶段间加 LN 稳定训练</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 关键：减少激活函数数量（+0.7%）是微观设计中增益最大的单项改动，说明 Transformer 中\"稀疏非线性\"的设计哲学对 ConvNet 同样有效。</div>\n<h5>模型家族与扩展性</h5>\n<p>ConvNeXt 定义了 5 个规模变体，与 Swin Transformer 严格对齐：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>模型</th>\n<th>通道数 <span class=\"kb-math kb-math-inline\">C</span></th>\n<th>Block 数 <span class=\"kb-math kb-math-inline\">B</span></th>\n<th>参数量</th>\n<th>FLOPs</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>ConvNeXt-T</td>\n<td>(96, 192, 384, 768)</td>\n<td>(3, 3, 9, 3)</td>\n<td>29M</td>\n<td>4.5G</td>\n</tr>\n<tr>\n<td>ConvNeXt-S</td>\n<td>(96, 192, 384, 768)</td>\n<td>(3, 3, 27, 3)</td>\n<td>50M</td>\n<td>8.7G</td>\n</tr>\n<tr>\n<td>ConvNeXt-B</td>\n<td>(128, 256, 512, 1024)</td>\n<td>(3, 3, 27, 3)</td>\n<td>89M</td>\n<td>15.4G</td>\n</tr>\n<tr>\n<td>ConvNeXt-L</td>\n<td>(192, 384, 768, 1536)</td>\n<td>(3, 3, 27, 3)</td>\n<td>198M</td>\n<td>34.4G</td>\n</tr>\n<tr>\n<td>ConvNeXt-XL</td>\n<td>(256, 512, 1024, 2048)</td>\n<td>(3, 3, 27, 3)</td>\n<td>350M</td>\n<td>60.9G</td>\n</tr>\n</tbody>\n</table></div>\n<p>在 ImageNet-22K 预训练 + ImageNet-1K 微调的设置下，ConvNeXt-XL 达到 <strong>87.8% top-1 准确率</strong>，超越 Swin-L（87.3%）。在 COCO 目标检测（Cascade Mask R-CNN 框架）和 ADE20K 语义分割（UperNet 框架）上，ConvNeXt 同样全面超越对应规模的 Swin Transformer。</p>\n<h5>与传统方法的核心区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th>ResNet</th>\n<th>Swin Transformer</th>\n<th>ConvNeXt</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>基本算子</td>\n<td>3×3 标准卷积</td>\n<td>窗口自注意力 + Shifted Window</td>\n<td>7×7 深度可分离卷积 + 1×1 卷积</td>\n</tr>\n<tr>\n<td>归一化</td>\n<td>BatchNorm</td>\n<td>LayerNorm</td>\n<td>LayerNorm</td>\n</tr>\n<tr>\n<td>激活函数</td>\n<td>每层 ReLU</td>\n<td>每 block 1 个 GELU</td>\n<td>每 block 1 个 GELU</td>\n</tr>\n<tr>\n<td>瓶颈结构</td>\n<td>标准瓶颈（宽→窄→宽）</td>\n<td>FFN 倒瓶颈</td>\n<td>倒瓶颈（窄→宽→窄）</td>\n</tr>\n<tr>\n<td>Stem</td>\n<td>7×7 conv + maxpool</td>\n<td>4×4 patch embed</td>\n<td>4×4 patchify conv</td>\n</tr>\n<tr>\n<td>下采样</td>\n<td>Stride-2 残差块</td>\n<td>Patch merging</td>\n<td>独立 2×2 stride-2 conv + LN</td>\n</tr>\n<tr>\n<td>特殊模块</td>\n<td>无</td>\n<td>Shifted Window、相对位置偏置</td>\n<td>无（纯标准卷积）</td>\n</tr>\n</tbody>\n</table></div>\n<p>ConvNeXt 最重要的贡献不是某个单一的新模块，而是<strong>证明了通过系统性地采用现代设计选择，纯卷积网络完全可以匹敌 Transformer</strong>，且不需要任何专用模块（如 shifted window attention 或相对位置编码），保持了卷积网络的简洁性和硬件友好性。</p>",
      "quiz": {
        "q": "在 ConvNeXt 的渐进式现代化过程中，以下哪项微观设计改动带来了最大的单步精度提升？",
        "options": [
          "将 ReLU 替换为 GELU 激活函数",
          "将 BatchNorm 替换为 LayerNorm",
          "减少每个 block 中激活函数的数量（仅保留 1 个 GELU）",
          "将卷积核从 3×3 增大到 7×7"
        ],
        "answer": 2,
        "explain": "减少激活函数数量（从每层都有 ReLU 到每 block 仅 1 个 GELU）带来了 +0.7% 的提升（80.6% → 81.3%），是微观设计中增益最大的单项改动，体现了 Transformer 中稀疏非线性的设计哲学。"
      }
    },
    {
      "id": "convnext_v2",
      "num": 12,
      "name": "ConvNeXt V2",
      "fullName": "现代卷积网络V2 (ConvNeXt V2)",
      "year": "2023.01",
      "org": "Meta AI",
      "parent": "convnext",
      "paperUrl": "https://arxiv.org/abs/2301.00808",
      "projectUrl": "",
      "category": "modern_efficient",
      "motivation": "引入全卷积掩码自编码器和全局响应归一化",
      "summary": "ConvNeXt V2 提出了全卷积掩码自编码器（FCMAE）预训练框架和全局响应归一化（GRN）层，通过协同设计解决了卷积网络在掩码图像建模中的特征坍塌问题，首次在从 3.7M 到 650M 参数的广泛模型谱系中验证了掩码预训练对 ConvNet 的有效性，最终以纯卷积架构在 ImageNet 上达到 88.9% 的 SOTA 精度。",
      "keyPoints": [
        "<strong>FCMAE 预训练框架</strong>：基于稀疏卷积的全卷积掩码自编码器，使 ConvNet 能高效进行掩码图像建模预训练",
        "<strong>GRN（全局响应归一化）层</strong>：通过全局特征聚合、归一化和校准三步操作增强通道间特征竞争，解决自监督预训练中的特征坍塌问题",
        "<strong>协同设计理念</strong>：FCMAE + GRN 单独使用效果有限，组合使用产生显著协同增益（V2-B: 84.6% vs V1-B supervised: 83.8%）",
        "<strong>8 种模型尺寸</strong>：Atto(3.7M)、Femto(5.2M)、Pico(9.1M)、Nano(15.6M)、Tiny(28M)、Base(89M)、Large(198M)、Huge(659M)",
        "<strong>全面的下游任务验证</strong>：ImageNet 分类（88.9%）、COCO 检测/分割（AP^box 55.7）、ADE20K 语义分割（mIoU 57.0）",
        "<strong>稀疏卷积编码</strong>：使用 MinkowskiEngine 的 submanifold sparse convolution 实现对可见 patch 的高效编码，避免掩码信息泄露"
      ],
      "detail": "<p><img alt=\"ConvNeXt V2 模型缩放与性能对比\" src=\"https://ar5iv.labs.arxiv.org/html/2301.00808/assets/x1.png\" />\n<em>图1：ConvNeXt V2 + FCMAE 在所有模型尺寸上均超越监督训练基线，展示了强大的模型缩放能力</em></p>\n<p><img alt=\"FCMAE 框架示意图\" src=\"https://ar5iv.labs.arxiv.org/html/2301.00808/assets/figs/convmae_teaser.png\" />\n<em>图2：FCMAE 预训练框架概览——稀疏卷积编码器处理可见 patch，轻量解码器重建被掩码像素</em></p>\n<p><img alt=\"特征激活可视化\" src=\"https://ar5iv.labs.arxiv.org/html/2301.00808/assets/figs/feat_act_qual.png\" />\n<em>图3：特征激活对比——无 GRN 时出现严重特征坍塌（多通道激活相同），加入 GRN 后通道间呈现多样化响应</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># FCMAE 预训练流程\ndef fcmae_pretrain(image, model, decoder, mask_ratio=0.6):\n    # 1. 随机掩码生成 (patch size 32x32)\n    mask = random_mask(image, ratio=mask_ratio, patch_size=32)\n\n    # 2. 稀疏卷积编码（仅处理可见patch）\n    visible_patches = apply_mask(image, mask)  # 转为稀疏张量\n    features = sparse_encoder(visible_patches)  # SubmanifoldSparseConv\n\n    # 3. 密集化 + 轻量解码器重建\n    dense_features = densify(features)  # 稀疏→密集，掩码位置填0\n    reconstruction = decoder(dense_features)  # 单ConvNeXt Block\n\n    # 4. 仅在掩码区域计算MSE损失\n    loss = mse_loss(reconstruction[mask], image[mask])\n    return loss\n\n# GRN 层实现\nclass GRN(nn.Module):\n    def __init__(self, dim):\n        self.gamma = nn.Parameter(torch.zeros(1, 1, 1, dim))\n        self.beta = nn.Parameter(torch.zeros(1, 1, 1, dim))\n\n    def forward(self, x):  # x: (B, H, W, C)\n        gx = torch.norm(x, p=2, dim=(1, 2), keepdim=True)  # 全局特征聚合 G(X)\n        nx = gx / (gx.mean(dim=-1, keepdim=True) + 1e-6)   # 响应归一化 N(·)\n        return self.gamma * (x * nx) + self.beta + x         # 校准 + 残差\n</code></pre>\n<h5>动机与背景</h5>\n<p>掩码图像建模（Masked Image Modeling, MIM）已在 Vision Transformer 上取得巨大成功（MAE、BEiT、SimMIM），但将其直接应用于卷积网络面临两个核心挑战：</p>\n<ol>\n<li>\n<p><strong>架构不兼容</strong>：Transformer 可通过丢弃掩码 token 实现高效编码，而标准卷积必须处理所有空间位置，无法自然地\"跳过\"掩码区域。直接将掩码位置填零会导致训练-测试分布不一致，且掩码信息通过卷积核的感受野泄露到可见区域。</p>\n</li>\n<li>\n<p><strong>特征坍塌</strong>：实验发现，即使解决了架构问题，ConvNeXt 在 FCMAE 预训练后会出现严重的特征坍塌——不同通道的特征激活高度相似，模型学到的表征缺乏多样性，导致微调性能受限。</p>\n</li>\n</ol>\n<h5>核心机制一：FCMAE 框架</h5>\n<p>FCMAE（Fully Convolutional Masked AutoEncoder）的设计要点：</p>\n<p><strong>稀疏卷积编码器</strong>：采用 MinkowskiEngine 中的 submanifold sparse convolution 替代标准卷积。该操作仅在输入非零位置进行卷积计算，输出也仅保留对应位置的值。这确保了：\n- 掩码区域不参与计算，避免信息泄露\n- 计算量与可见 patch 数量成正比，提升效率\n- 编码器保持 ConvNeXt 的完整架构不变</p>\n<p><strong>掩码策略</strong>：使用 <span class=\"kb-math kb-math-inline\">32 \\times 32</span> 的 patch 大小和 0.6 的掩码比例。相比 MAE 的 <span class=\"kb-math kb-math-inline\">16 \\times 16</span> patch + 0.75 比例，更大的 patch 更适合卷积网络的层级下采样结构（经过 4 倍下采样后仍保持合理的稀疏粒度）。</p>\n<p><strong>轻量解码器</strong>：仅使用单个 ConvNeXt Block 作为解码器，将编码器输出密集化后进行像素重建。损失函数为仅在掩码区域计算的 MSE：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L} = \\frac{1}{|\\mathcal{M}|} \\sum_{i \\in \\mathcal{M}} \\| \\hat{x}_i - x_i \\|^2</div>\n<div class=\"key-point\">💡 关键：轻量解码器的设计迫使编码器承担更多的语义理解任务，而非将重建能力依赖于解码器。</div>\n<h5>核心机制二：GRN 层</h5>\n<p>GRN（Global Response Normalization）层通过三步操作解决特征坍塌：</p>\n<p><strong>Step 1 - 全局特征聚合 <span class=\"kb-math kb-math-inline\">G(\\cdot)</span></strong>：对每个通道在空间维度上计算 L2 范数，获得全局统计量：</p>\n<div class=\"kb-math kb-math-display\">G(X)_i = \\| X_i \\|_2 = \\sqrt{\\sum_{h,w} X_{i,h,w}^2}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">X_i</span> 是第 <span class=\"kb-math kb-math-inline\">i</span> 个通道的特征图。</p>\n<p><strong>Step 2 - 响应归一化 <span class=\"kb-math kb-math-inline\">N(\\cdot)</span></strong>：通过除法归一化实现通道间竞争：</p>\n<div class=\"kb-math kb-math-display\">N(g_i) = \\frac{g_i}{\\sum_{j=1}^{C} g_j}</div>\n<p>这使得每个通道的重要性相对于其他通道进行衡量——如果某个通道的全局响应远高于平均水平，其归一化值接近 1；反之接近 0。</p>\n<p><strong>Step 3 - 特征校准与残差</strong>：</p>\n<div class=\"kb-math kb-math-display\">X_i = \\gamma \\cdot X_i \\cdot N(G(X)_i) + \\beta + X_i</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\gamma, \\beta</span> 为可学习参数，初始化为零。零初始化确保 GRN 在训练初期等价于恒等映射，不破坏预训练模型的初始行为。</p>\n<div class=\"warn-box\">⚠️ 注意：GRN 与 SE-Net 的通道注意力不同——SE 使用 sigmoid 压缩到 [0,1] 进行\"门控\"，而 GRN 使用除法归一化实现\"竞争\"，允许值大于 1，更有效地促进通道多样性。</div>\n<h5>协同设计的重要性</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>配置</th>\n<th>ImageNet-1K Top-1</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>ConvNeXt V1 + Supervised</td>\n<td>83.8%</td>\n</tr>\n<tr>\n<td>ConvNeXt V1 + FCMAE</td>\n<td>83.5%</td>\n</tr>\n<tr>\n<td>ConvNeXt V2 (w/ GRN) + Supervised</td>\n<td>84.0%</td>\n</tr>\n<tr>\n<td><strong>ConvNeXt V2 + FCMAE</strong></td>\n<td><strong>84.6%</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p>单独使用 FCMAE（无 GRN）甚至略低于监督基线；单独使用 GRN（监督训练）仅提升 0.2%。但两者组合后产生 0.8% 的显著提升，验证了\"模型架构与学习框架需要协同设计\"的核心论点。</p>\n<h5>模型配置与缩放</h5>\n<p>ConvNeXt V2 采用 4 阶段层级结构，通道数逐阶段翻倍：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>模型</th>\n<th>参数量</th>\n<th>基础通道 C</th>\n<th>Block 分布 (B)</th>\n<th>IN-1K Acc</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Atto</td>\n<td>3.7M</td>\n<td>40</td>\n<td>(2,2,6,2)</td>\n<td>76.7%</td>\n</tr>\n<tr>\n<td>Femto</td>\n<td>5.2M</td>\n<td>48</td>\n<td>(2,2,6,2)</td>\n<td>78.5%</td>\n</tr>\n<tr>\n<td>Pico</td>\n<td>9.1M</td>\n<td>64</td>\n<td>(2,2,6,2)</td>\n<td>80.3%</td>\n</tr>\n<tr>\n<td>Nano</td>\n<td>15.6M</td>\n<td>80</td>\n<td>(2,2,8,2)</td>\n<td>81.9%</td>\n</tr>\n<tr>\n<td>Tiny</td>\n<td>28M</td>\n<td>96</td>\n<td>(3,3,9,3)</td>\n<td>83.0%</td>\n</tr>\n<tr>\n<td>Base</td>\n<td>89M</td>\n<td>128</td>\n<td>(3,3,27,3)</td>\n<td>84.9%</td>\n</tr>\n<tr>\n<td>Large</td>\n<td>198M</td>\n<td>192</td>\n<td>(3,3,27,3)</td>\n<td>85.8%</td>\n</tr>\n<tr>\n<td>Huge</td>\n<td>659M</td>\n<td>352</td>\n<td>(3,3,27,3)</td>\n<td>86.3%</td>\n</tr>\n</tbody>\n</table></div>\n<h5>与现有方法的对比</h5>\n<p><strong>vs. MAE (ViT)</strong>：在 Base/Large 规模下性能相当（84.9 vs 83.6 / 85.8 vs 85.9），但 ConvNeXt V2-L 仅用 198M 参数即达到 ViT-L (307M) 的水平。在 Huge 规模下略有差距（86.3 vs 86.9），但通过 IN-22K 中间微调可弥补。</p>\n<p><strong>vs. SimMIM (Swin)</strong>：在所有模型尺寸上均超越 Swin + SimMIM（Base: 84.9 vs 84.0, Large: 85.8 vs 85.4, Huge: 86.3 vs 85.7）。</p>\n<p><strong>下游任务迁移</strong>：\n- COCO 检测：V2-H AP^box = 55.7（vs Swin V2-H 54.4）\n- ADE20K 分割：V2-H mIoU = 55.0（vs Swin V2-H 54.2），加 IN-22K 微调达 57.0</p>",
      "quiz": {
        "q": "ConvNeXt V2 中 GRN 层的可学习参数 γ 和 β 初始化为零的主要原因是什么？",
        "options": [
          "减少模型参数量，加速训练收敛",
          "确保训练初期 GRN 等价于恒等映射，不破坏网络初始行为",
          "防止梯度爆炸，稳定反向传播",
          "使 GRN 层在推理时可以被完全移除"
        ],
        "answer": 1,
        "explain": "γ=0, β=0 时 GRN 输出为 0·X·N(G(X)) + 0 + X = X，即恒等映射。这保证了 GRN 在训练初期不改变网络行为，随训练逐步学习有意义的通道竞争模式。"
      }
    },
    {
      "id": "mambavision",
      "num": 13,
      "name": "MambaVision",
      "fullName": "Mamba视觉模型 (Mamba Vision Model)",
      "year": "2024.07",
      "org": "NVIDIA",
      "parent": "swin_transformer",
      "paperUrl": "https://arxiv.org/abs/2407.08083",
      "projectUrl": "",
      "category": "modern_efficient",
      "motivation": "混合Mamba与Transformer获得更优精度吞吐比",
      "summary": "MambaVision 提出了一种混合 Mamba-Transformer 视觉骨干网络，通过重新设计 Mamba 块（去除因果卷积、增加对称分支）并在最终层引入自注意力机制，在 ImageNet-1K 上实现了精度-吞吐量的新 SOTA Pareto 前沿。",
      "keyPoints": [
        "<strong>混合架构设计</strong>：4 阶段层级结构，Stage 1-2 使用 CNN 残差块进行高分辨率快速特征提取，Stage 3-4 使用 MambaVision Mixer + Transformer 块（各占 N/2 层）",
        "<strong>MambaVision Mixer 创新</strong>：(1) 用普通卷积替换因果卷积消除方向性限制；(2) 增加无 SSM 的对称分支作为 token mixer 补偿序列建模的信息损失；(3) 双分支各投影到 C/2 维度后拼接",
        "<strong>自注意力补充</strong>：在 Stage 3-4 的后半部分使用标准 self-attention 块恢复全局上下文建模能力",
        "<strong>SOTA 性能</strong>：MambaVision-B 以 84.2% Top-1 / 3670 img/s 超越 ConvNeXt-B (83.8% / 1485) 和 Swin-B (83.5% / 1245)，吞吐量提升 2-3 倍",
        "<strong>下游任务验证</strong>：在 COCO 目标检测/实例分割和 ADE20K 语义分割上均超越同等规模的 Swin 和 ConvNeXt 骨干"
      ],
      "detail": "<h5>4.1 示意图</h5>\n<p><strong>整体架构：</strong></p>\n<p><img alt=\"MambaVision Architecture\" src=\"https://ar5iv.labs.arxiv.org/html/2407.08083/assets/x2.png\" /></p>\n<p>MambaVision 采用 4 阶段层级架构。Stem 由两个 3×3 卷积（stride=2）组成，将输入图像从 $H \\times W \\times 3$ 转换为 $\\frac{H}{4} \\times \\frac{W}{4} \\times C$ 的特征图。各阶段之间通过 3×3 卷积（stride=2）进行下采样。</p>\n<p><strong>MambaVision Mixer 结构：</strong></p>\n<p><img alt=\"MambaVision Mixer\" src=\"https://ar5iv.labs.arxiv.org/html/2407.08083/assets/x3.png\" /></p>\n<p>MambaVision Mixer 的核心创新在于双分支设计：一条分支包含 SSM（Selective Scan）进行序列建模，另一条对称分支仅使用卷积+激活进行空间特征混合，两者拼接后通过线性层投影回原始维度。</p>\n<h5>4.2 伪代码</h5>\n<pre><code class=\"language-python\"># MambaVision Mixer - PyTorch-like Pseudocode\nclass MambaVisionMixer(nn.Module):\n    def __init__(self, dim, d_state=16, kernel_size=3):\n        super().__init__()\n        self.in_proj = nn.Linear(dim, dim)  # project to dim (split into 2 x dim//2)\n        # SSM branch (x path)\n        self.conv1d_x = nn.Conv1d(dim//2, dim//2, kernel_size, padding='same', groups=dim//2)\n        self.x_proj = nn.Linear(dim//2, dt_rank + d_state*2)  # project to dt, B, C\n        self.dt_proj = nn.Linear(dt_rank, dim//2)\n        # Symmetric branch (z path) - NO SSM\n        self.conv1d_z = nn.Conv1d(dim//2, dim//2, kernel_size, padding='same', groups=dim//2)\n        # Output projection\n        self.out_proj = nn.Linear(dim, dim)\n\n    def forward(self, hidden_states):\n        # Input projection and split into two branches\n        xz = rearrange(self.in_proj(hidden_states), 'b l d -&gt; b d l')\n        x, z = xz.chunk(2, dim=1)  # each: [B, C//2, L]\n\n        # Branch 1: Conv + SiLU + SSM (Selective Scan)\n        x = F.silu(self.conv1d_x(x))         # regular (non-causal) conv\n        dt, B, C = self.x_proj(x)            # input-dependent parameters\n        x_ssm = selective_scan(x, dt, A, B, C, D)  # SSM forward\n\n        # Branch 2: Conv + SiLU only (no SSM)\n        z = F.silu(self.conv1d_z(z))          # spatial mixing without SSM\n\n        # Concatenate and project\n        output = rearrange(torch.cat([x_ssm, z], dim=1), 'b d l -&gt; b l d')\n        return self.out_proj(output)\n</code></pre>\n<p><strong>整体 Block 结构：</strong></p>\n<pre><code class=\"language-python\"># Stage 3-4 Layer: first N/2 layers use MambaVision Mixer, last N/2 use Self-Attention\nX_hat = Mixer(LayerNorm(X)) + X       # Token mixing (Mamba or Attention)\nX_out = MLP(LayerNorm(X_hat)) + X_hat  # Channel mixing\n</code></pre>\n<h5>4.3 方法细节</h5>\n<p><strong>宏观架构设计哲学。</strong> MambaVision 的核心设计理念是\"分而治之\"：在高分辨率的早期阶段（Stage 1-2），使用计算高效的 CNN 残差块（3×3 Conv + BatchNorm + GELU）进行快速局部特征提取；在低分辨率的后期阶段（Stage 3-4），使用 MambaVision Mixer 和 Transformer 块进行全局特征建模。这种分层策略避免了在高分辨率特征图上运行复杂的 SSM 或注意力机制，显著提升了推理吞吐量。作者通过系统实验发现，将 Transformer 块放在最终层（而非均匀分布或放在早期层）能最有效地恢复全局上下文建模能力。</p>\n<p><strong>MambaVision Mixer 的关键改进。</strong> 原始 Mamba 块为 NLP 设计，存在两个不适合视觉任务的问题：(1) 因果卷积（causal conv）限制了信息只能单向流动，而视觉特征本质上是二维且无方向性的；(2) SSM 的序列约束可能丢失部分空间信息。MambaVision 通过两个改进解决这些问题：首先，将因果卷积替换为普通卷积（padding='same'），允许双向信息流动；其次，增加一条不含 SSM 的对称分支，仅通过卷积+SiLU 激活进行空间特征混合，补偿 SSM 序列建模可能丢失的内容。消融实验验证了每个改进的贡献：去因果性 +0.4%，加对称分支 +0.4%，使用拼接融合 +1.0%，总计从 80.5% 提升到 82.3%。</p>\n<p><strong>SSM 数学基础与选择性机制。</strong> MambaVision 中的 SSM 分支基于 Mamba 的选择性状态空间模型。连续时间 SSM 定义为 $h'(t) = \\mathbf{A}h(t) + \\mathbf{B}x(t)$，$y(t) = \\mathbf{C}h(t)$，通过零阶保持（ZOH）离散化为 $\\bar{\\mathbf{A}} = \\exp(\\Delta \\mathbf{A})$，$\\bar{\\mathbf{B}} = (\\Delta \\mathbf{A})^{-1}(\\exp(\\Delta \\mathbf{A}) - \\mathbf{I}) \\cdot \\Delta \\mathbf{B}$。Mamba 的核心创新是使参数 $B$、$C$、$\\Delta$ 依赖于输入（通过线性投影），实现选择性信息过滤。在 MambaVision 中，SSM 仅作用于 C/2 维度的子空间，另一半通过对称分支处理，这既保留了 SSM 的长程建模能力，又通过并行分支增强了局部空间特征的保留。</p>\n<p><strong>训练策略与模型变体。</strong> 所有模型在 ImageNet-1K 上训练 300 epochs，使用余弦衰减学习率调度（含 20 epochs warmup 和 cooldown），LAMB 优化器（比 AdamW 对高学习率更鲁棒），全局 batch size 4096，初始学习率 0.005，权重衰减 0.05，使用 32 张 A100 GPU。模型提供 T/T2/S/B/L/L2 六个变体，参数量从 31.8M 到 241.5M，覆盖从轻量到大规模的不同需求。各变体在 ImageNet-1K 上的表现如下：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>模型</th>\n<th>Params (M)</th>\n<th>FLOPs (G)</th>\n<th>Throughput (img/s)</th>\n<th>Top-1 (%)</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>MambaVision-T</td>\n<td>31.8</td>\n<td>4.4</td>\n<td>6298</td>\n<td>82.3</td>\n</tr>\n<tr>\n<td>MambaVision-T2</td>\n<td>35.1</td>\n<td>5.1</td>\n<td>5990</td>\n<td>82.7</td>\n</tr>\n<tr>\n<td>MambaVision-S</td>\n<td>50.1</td>\n<td>7.5</td>\n<td>4700</td>\n<td>83.3</td>\n</tr>\n<tr>\n<td>MambaVision-B</td>\n<td>97.7</td>\n<td>15.0</td>\n<td>3670</td>\n<td>84.2</td>\n</tr>\n<tr>\n<td>MambaVision-L</td>\n<td>227.9</td>\n<td>34.9</td>\n<td>2190</td>\n<td>85.0</td>\n</tr>\n<tr>\n<td>MambaVision-L2</td>\n<td>241.5</td>\n<td>37.5</td>\n<td>1021</td>\n<td>85.3</td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>下游任务表现。</strong> 在 MS COCO 上使用 Mask R-CNN，MambaVision-T 达到 box AP 46.4 / mask AP 41.8，超越 ConvNeXt-T 和 Swin-T。使用 Cascade Mask R-CNN，MambaVision-S 达到 48.2 box AP，MambaVision-B 达到 49.1 box AP。在 ADE20K 语义分割（UPerNet）上，MambaVision-T/S/B 分别达到 46.6/48.2/49.1 mIoU，均超越同等规模竞争模型。</p>\n<h5>4.4 公式</h5>\n<p><strong>SSM 连续形式：</strong></p>\n<div class=\"kb-math kb-math-display\">h&#x27;(t) = \\mathbf{A}h(t) + \\mathbf{B}x(t), \\quad y(t) = \\mathbf{C}h(t)</div>\n<p><strong>ZOH 离散化：</strong></p>\n<div class=\"kb-math kb-math-display\">\\bar{\\mathbf{A}} = \\exp(\\Delta \\mathbf{A}), \\quad \\bar{\\mathbf{B}} = (\\Delta \\mathbf{A})^{-1}(\\exp(\\Delta \\mathbf{A}) - \\mathbf{I}) \\cdot \\Delta \\mathbf{B}</div>\n<p><strong>离散递推：</strong></p>\n<div class=\"kb-math kb-math-display\">h_k = \\bar{\\mathbf{A}} h_{k-1} + \\bar{\\mathbf{B}} x_k, \\quad y_k = \\mathbf{C} h_k + \\mathbf{D} x_k</div>\n<p><strong>MambaVision Mixer 公式：</strong></p>\n<div class=\"kb-math kb-math-display\">X_1 = \\text{Scan}(\\sigma(\\text{Conv}(\\text{Linear}_{C \\to C/2}(X_{in}))))</div>\n<div class=\"kb-math kb-math-display\">X_2 = \\sigma(\\text{Conv}(\\text{Linear}_{C \\to C/2}(X_{in})))</div>\n<div class=\"kb-math kb-math-display\">X_{out} = \\text{Linear}_{C \\to C}(\\text{Concat}(X_1, X_2))</div>\n<p><strong>Layer 结构：</strong></p>\n<div class=\"kb-math kb-math-display\">\\hat{X}^n = \\text{Mixer}(\\text{Norm}(X^{n-1})) + X^{n-1}</div>\n<div class=\"kb-math kb-math-display\">X^n = \\text{MLP}(\\text{Norm}(\\hat{X}^n)) + \\hat{X}^n</div>",
      "quiz": {
        "q": "",
        "options": [],
        "answer": 0,
        "explain": ""
      }
    },
    {
      "id": "jumbo_token",
      "num": 14,
      "name": "Jumbo Token",
      "fullName": "巨型Token高效ViT (Jumbo Token for Fast Plain Vision Transformers)",
      "year": "2026.01",
      "org": "Carleton University / UBC / Vector Institute",
      "parent": "vit",
      "paperUrl": "https://arxiv.org/abs/2502.15021",
      "projectUrl": "",
      "category": "modern_efficient",
      "motivation": "引入巨型Token加速平原ViT，大幅提升吞吐量",
      "summary": "Jumbo Token 通过给 plain ViT 引入一个更宽的全局 token，并让它拥有独立且跨层共享的 FFN，在几乎不破坏 ViT 接口的前提下显著提升了速度-精度权衡。",
      "keyPoints": [
        "保持 plain ViT 的 attention-only、non-hierarchical 结构，不引入卷积或层级金字塔。",
        "用一个宽度为 patch token <span class=\"kb-math kb-math-inline\">J</span> 倍的 Jumbo token 替代普通 CLS token。",
        "自注意力前把 Jumbo token 拆成多个标准宽度 token，注意力后再拼回去。",
        "为 Jumbo token 配置独立 FFN，并在所有层之间共享该 FFN 参数以节省内存。",
        "在 ImageNet-1K、ImageNet-21K、ADE20K 和 MAE 预训练上都优于 ViT+Registers 基线。"
      ],
      "detail": "<p><img alt=\"Jumbo Token 仓库示意图\" src=\"https://raw.githubusercontent.com/antofuller/jumbo/main/sophia.png\" />\n<em>图：Jumbo Token 官方仓库配图。该工作关注在不破坏 plain ViT 结构接口的前提下，用更宽的全局 token 提高容量与吞吐表现。</em></p>\n<pre><code class=\"language-python\"># Jumbo Token 核心流程\npatch_tokens = patch_embed(image)                 # [N, D]\njumbo = jumbo_token.expand(1, J * D)             # [1, J*D]\n\nfor layer in layers:\n    jumbo_split = jumbo.view(J, D)               # attention 前拆成 J 个标准 token\n    tokens = concat([jumbo_split, patch_tokens], dim=0)\n    tokens = self_attention(tokens)\n    jumbo_split, patch_tokens = tokens[:J], tokens[J:]\n    jumbo = jumbo_split.reshape(1, J * D)        # attention 后重新拼接\n    jumbo = jumbo + jumbo_ffn_shared(jumbo)      # Jumbo 独立 FFN\n    patch_tokens = patch_tokens + patch_ffn(patch_tokens)\n\nlogits = classifier(jumbo)\n</code></pre>\n<p>Jumbo 的出发点是一个很实用的观察：plain ViT 的主要代价来自所有 patch token 的宽度和数量，但全局分类 token 只占极少一部分计算。如果直接把所有 token 一起加宽，模型会更贵；如果只把全局 token 做宽，则有机会以很低代价提升全局汇聚能力。</p>\n<p>论文因此把传统 CLS token 改造成一个更宽的 Jumbo token。设 patch token 宽度为 <span class=\"kb-math kb-math-inline\">D</span>，则 Jumbo token 宽度为 <span class=\"kb-math kb-math-inline\">J \\cdot D</span>。为了兼容标准多头注意力，进入注意力层之前先把它拆成 <span class=\"kb-math kb-math-inline\">J</span> 个宽度为 <span class=\"kb-math kb-math-inline\">D</span> 的 token，与 patch token 一起做普通 self-attention；注意力完成后再把这 <span class=\"kb-math kb-math-inline\">J</span> 个 token 按通道维重新拼回一个大 token。这样整个模型仍然保持 plain ViT 的接口和行为习惯。</p>\n<p>真正的容量提升来自 Jumbo token 的专属 FFN。普通 patch token 继续走共享的 patch FFN，而 Jumbo token 走一个更宽的独立 FFN。由于这个 FFN 只处理一个 token，计算成本相对很低；论文进一步把它在层间共享，以控制参数量和显存开销。核心思想可以理解为：把额外模型容量集中投入到“全局汇聚通道”，而不是平均分摊给所有 patch。</p>\n<p>这种设计为什么有效？作者认为，很多视觉分类任务瓶颈不在局部 patch 表达，而在全局信息如何被高效汇聚到分类头。Jumbo 让模型在几乎不改变基础架构的前提下，拥有一个更强的“全局思考槽位”。因此它尤其适合本来就偏窄、偏快的 plain ViT 变体，在小模型上收益更明显。</p>",
      "quiz": {
        "q": "Jumbo Token 为什么能在保持 plain ViT 结构的同时提升效率？",
        "options": [
          "因为它把所有 patch token 都改成了更宽的 token",
          "因为它只扩大全局 token 的容量，并在注意力前后做拆分/拼接，额外成本主要集中在单个全局 token 上",
          "因为它完全移除了 FFN",
          "因为它把自注意力改成卷积"
        ],
        "answer": 1,
        "explain": "Jumbo 只放大全局 token，而不是所有 patch token；这样既保留了 plain ViT 接口，又把额外容量集中在代价最低的全局路径上。"
      }
    },
    {
      "id": "raptor",
      "num": 15,
      "name": "Raptor",
      "fullName": "块递归视觉Transformer近似 (Recurrent Approximations to Phase-structured TransfORmers)",
      "year": "2026.01",
      "org": "Harvard University / Osnabrück University",
      "parent": "vit",
      "paperUrl": "https://arxiv.org/abs/2512.19941",
      "projectUrl": "",
      "category": "modern_efficient",
      "motivation": "发现ViT块递归结构，用少量权重共享块逼近深层ViT",
      "summary": "Raptor 提出训练一个由少量共享块递归展开的 ViT 近似模型，验证了深层 ViT 内部存在显著的块递归结构，并用极少的不同 block 逼近原模型的大部分分类能力。",
      "keyPoints": [
        "提出 Block-Recurrent Hypothesis，认为训练好的 ViT 深度方向可分成少数重复计算阶段。",
        "用表征相似矩阵和 max-cut 方法自动发现 block phase 边界。",
        "训练权重共享的 recurrent surrogate，即 Raptor，去重建原始 ViT 的层间表示轨迹。",
        "在 DINOv2 上仅用 2 到 3 个递归 block 就恢复了原模型大部分线性探测精度。",
        "该工作更偏“机制解释 + 可重构性验证”，而不仅仅是压缩部署。"
      ],
      "detail": "<p><img alt=\"Raptor 项目标识\" src=\"https://raw.githubusercontent.com/KempnerInstitute/raptor/main/assets/raptor_logo.png\" />\n<em>图：Raptor 官方项目页标识。该工作关注 ViT 深度方向是否存在可重用的递归计算阶段。</em></p>\n<pre><code class=\"language-python\"># Raptor 近似训练流程\nteacher = pretrained_vit()\nphases = discover_phases_via_similarity(teacher)\nblocks = [init_from_phase(p) for p in phases[:k]]   # k &lt;&lt; L\n\ndef raptor_forward(x):\n    h = patch_embed(x)\n    for t in range(L):\n        h = blocks[phase_id(t)](h)                  # 复用少量共享 block\n    return h\n\nloss = tf_loss(hidden_pred, hidden_teacher) + ar_loss(unrolled_pred, hidden_teacher)\nopt.step()\n</code></pre>\n<p>Raptor 的出发点并不是传统意义上的“做一个更快模型”，而是一个更基础的问题：ViT 的很多层是否真的都在做彼此不同的计算？论文通过层间表征相似度矩阵发现，许多训练好的 ViT 在深度方向会出现若干连续 phase，同一 phase 内多层的表征变化模式高度相似。</p>\n<p>基于这个观察，作者提出 Block-Recurrent Hypothesis：一个深层 ViT 可以被重写为少量不同 block 反复展开的递归系统。Raptor 就是这种假设的构造性验证。它并不只是模仿最终分类结果，而是尽量重建原 ViT 从浅层到深层的整个隐藏状态轨迹，因此训练目标既包括 teacher forcing 的逐层拟合，也包括真正展开后的自回归式层间重建。</p>\n<p>从动力系统视角看，这意味着 ViT 的深度计算并非任意堆叠，而更像若干阶段性更新规则反复作用于表征。论文里最有意思的结论是：在 DINOv2 这类 foundation ViT 上，仅用极少数共享 block，就能恢复绝大部分 ImageNet 线性探测精度，并保持接近的运行成本。这说明很多深层 block 的功能具有高度复用性。</p>\n<p>Raptor 的价值主要在两个方向。第一，它为 ViT 压缩、共享参数和递归化设计提供了直接证据；第二，它给解释性研究提供了一个更低复杂度的对象，因为你不必再把每一层都当作独立模块分析，而可以研究少量递归动力学单元如何驱动表征演化。</p>",
      "quiz": {
        "q": "Raptor 试图验证的核心假设是什么？",
        "options": [
          "ViT 的所有层都必须保持完全独立才能工作",
          "训练好的 ViT 在深度方向可被少量不同 block 递归展开近似",
          "卷积一定优于 Transformer",
          "分类性能完全由 patch embedding 决定"
        ],
        "answer": 1,
        "explain": "Raptor 的 Block-Recurrent Hypothesis 认为，深层 ViT 的计算可被压缩成少量可重用 block 反复展开。"
      }
    },
    {
      "id": "vmamba",
      "num": 16,
      "name": "VMamba",
      "fullName": "视觉状态空间模型 (VMamba: Visual State Space Model)",
      "year": "2024.01",
      "org": "中国科学院大学 / 华为 / 鹏城实验室",
      "parent": "swin_transformer",
      "paperUrl": "https://arxiv.org/abs/2401.10166",
      "projectUrl": "",
      "category": "modern_efficient",
      "motivation": "以2D选择性扫描实现线性复杂度全局建模",
      "summary": "VMamba 把 Mamba 状态空间模型扩展到二维视觉场景，通过 2D Selective Scan 在保持线性复杂度的同时获得全局感受野，成为视觉状态空间模型路线中的代表工作。",
      "keyPoints": [
        "提出 Visual State-Space (VSS) block，把 Mamba 从 1D 序列推广到 2D 图像。",
        "核心模块 SS2D 用四条扫描路径在二维特征图上执行选择性扫描。",
        "保持全局感受野和输入缩放效率，对高分辨率输入更友好。",
        "采用分层主干结构，可直接迁移到分类、检测和分割任务。",
        "在 ImageNet 分类和下游视觉任务上显示出优于多种 CNN/ViT 基线的效率表现。"
      ],
      "detail": "<p><img alt=\"VMamba 整体架构图\" src=\"https://raw.githubusercontent.com/MzeroMiko/VMamba/main/assets/architecture.png\" />\n<em>图：VMamba 用分层 VSS block 堆叠成视觉主干，并在每个 block 内通过 SS2D 完成二维全局信息聚合。</em></p>\n<pre><code class=\"language-python\"># VMamba 的 SS2D 思路\ndef ss2d(x):\n    routes = [\n        scan_left_to_right(x),\n        scan_right_to_left(x),\n        scan_top_to_bottom(x),\n        scan_bottom_to_top(x),\n    ]\n    outputs = [selective_scan(route) for route in routes]\n    return merge_routes(outputs)\n\ndef vss_block(x):\n    x = x + ss2d(layer_norm(x))\n    x = x + mlp(layer_norm(x))\n    return x\n</code></pre>\n<p>视觉版 Mamba 最大的问题，是原始 Mamba 面向一维序列，而图像本质上是二维结构。若简单把图像拉平成一条长序列，再直接用 1D selective scan，空间邻接关系会被严重扭曲。VMamba 的关键贡献，就是用 SS2D 解决这个结构错位问题。</p>\n<p>SS2D 的基本思路是从多个方向遍历二维特征图。论文采用四条扫描路线，让状态传播不只依赖单一序列顺序，而是分别从水平和垂直两个维度的正反方向收集上下文。这样每个位置都能通过多路扫描接收到更完整的全局信息。相比自注意力，扫描式计算不需要显式构造 token 两两交互矩阵，因此复杂度更接近线性。</p>\n<p>从机制上看，VMamba 保留了 Mamba 的“输入依赖参数”思想，也就是根据当前内容动态控制状态更新与信息选择。它既不是纯卷积，也不是注意力，而是一类具有全局传播能力的状态空间主干。论文特别强调其输入分辨率扩展效率，因为随着图像变大，注意力成本会快速膨胀，而 SS2D 的计算增长更可控。</p>\n<p>VMamba 之所以重要，不只是因为它做到了“视觉版 Mamba”，而是因为它提出了一套比较完整的二维状态空间建模范式。后续很多视觉 SSM 工作，包括更强的混合主干和 deformable/state-space 变种，基本都在沿着这条路线继续推进。</p>",
      "quiz": {
        "q": "VMamba 中 SS2D 的主要作用是什么？",
        "options": [
          "把所有 token 送入标准全局自注意力",
          "通过多方向二维选择性扫描，把一维 Mamba 扩展到图像结构并获取全局上下文",
          "仅用于做数据增强",
          "替代分类头输出 logits"
        ],
        "answer": 1,
        "explain": "SS2D 通过在二维特征图上进行多方向扫描，弥补了原始 Mamba 只适用于一维序列的限制。"
      }
    },
    {
      "id": "focalnet",
      "num": 17,
      "name": "FocalNet",
      "fullName": "焦点调制网络 (Focal Modulation Networks)",
      "year": "2022.03",
      "org": "Microsoft Research",
      "parent": "swin_transformer",
      "paperUrl": "https://arxiv.org/abs/2203.11926",
      "projectUrl": "",
      "category": "modern_efficient",
      "motivation": "用焦点调制替代自注意力，实现分层上下文聚合",
      "summary": "FocalNet 用 focal modulation 机制完全替代自注意力，通过分层上下文聚合、门控选择和逐元素调制，实现了既有全局建模能力又更高效的视觉 token 交互。",
      "keyPoints": [
        "用 focal modulation 而不是 self-attention 建模 token 之间关系。",
        "先用多层深度卷积提取从局部到全局的上下文，再由门控动态聚合。",
        "将聚合后的上下文作为调制器，对 query token 做逐元素调制。",
        "仍然采用分层视觉骨干，便于迁移到分类、检测和分割。",
        "在 ImageNet、COCO、ADE20K 上以相似成本超过多种注意力基线。"
      ],
      "detail": "<p><img alt=\"FocalNet 模型图\" src=\"https://raw.githubusercontent.com/microsoft/FocalNet/main/figures/focalnet-model.png\" />\n<em>图：FocalNet 先用多尺度上下文聚合器收集不同感受野信息，再通过调制器作用到当前 token。</em></p>\n<pre><code class=\"language-python\"># Focal modulation 伪代码\ndef focal_modulation(x):\n    q, ctx, gates = linear(x).split([d, d, L + 1], dim=-1)\n    contexts = []\n    for l in range(L):\n        ctx = depthwise_conv(ctx, kernel_size[level_k[l]])\n        contexts.append(ctx)\n    global_ctx = global_avg_pool(ctx)\n    agg = sum(gates[..., l:l+1] * contexts[l] for l in range(L))\n    agg = agg + gates[..., -1:] * global_ctx\n    modulator = conv1x1(agg)\n    return q * modulator\n</code></pre>\n<p>FocalNet 关注的核心问题是：视觉 Transformer 的强大建模能力，是否必须依赖成对 token 的自注意力矩阵？论文给出的答案是否定的。它认为 token 交互可以分成两步：先为每个位置收集一个结构化上下文，再让当前位置用这个上下文来调制自身表示，而不必显式计算 query-key 两两匹配。</p>\n<p>具体来说，focal modulation 有三个阶段。第一是 hierarchical contextualization：用多层不同感受野的 depthwise convolution，从短程到长程依次构造上下文。第二是 gated aggregation：模型学习一个门控向量，决定当前 token 更该依赖哪一级上下文。第三是 modulation：把聚合后的上下文变成一个调制器，对当前 query 做逐元素缩放或仿射变换。整个过程更像“先看周围环境，再调整自己”，而不是标准自注意力那种成对匹配。</p>\n<p>这种设计的直观优势是计算路径更规整、对硬件更友好，而且无需维护显式注意力图。与 Swin 这类局部窗口注意力相比，FocalNet 通过逐层扩大的上下文聚合器自然获得大范围感受野；与 CNN 相比，它又保留了内容自适应的门控调制能力，因此不是简单回到卷积，而是提出一种新的 token mixing 机制。</p>\n<p>论文结果表明，FocalNet 在图像分类上能和注意力模型正面竞争，并在检测和分割上继续保持优势。它的重要性在于证明了“替代自注意力”的路线不仅可行，而且可以做到统一、可扩展、跨任务迁移。</p>",
      "quiz": {
        "q": "FocalNet 与自注意力最本质的区别是什么？",
        "options": [
          "它完全不做任何上下文建模",
          "它不通过 token 两两匹配建图，而是先聚合多尺度上下文，再用调制器作用到当前 token",
          "它只适用于卷积网络而不适用于视觉主干",
          "它去掉了所有非线性激活"
        ],
        "answer": 1,
        "explain": "FocalNet 的关键在于上下文聚合 + 调制，而不是标准自注意力中的 query-key 成对交互。"
      }
    }
  ],
  "categories": {
    "cnn_classic": {
      "label": "CNN经典时代",
      "color": "#3B82F6"
    },
    "attention_cnn": {
      "label": "注意力增强CNN",
      "color": "#8B5CF6"
    },
    "vit_era": {
      "label": "Vision Transformer",
      "color": "#EC4899"
    },
    "modern_efficient": {
      "label": "现代高效架构",
      "color": "#10B981"
    }
  },
  "projectUrls": {}
};
