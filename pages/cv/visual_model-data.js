/**
 * visual_model-data.js — 由 pipeline/build.py 于 2026-06-16 17:00:12 自动生成。
 * 源文件：content/cv/visual_model.md
 * ⚠️  请勿手动修改；如需更新，修改源文档后重新编译。
 */
window.PAGE_CONFIG = {
  "meta": {
    "domain": "cv",
    "topic_id": "visual_model",
    "topic_name": "视觉基础模型技术演进",
    "page_title": "视觉基础模型技术演进",
    "page_subtitle": "2026-06-16 版",
    "page_desc": "梳理从ViT到SAM的视觉表征学习演进历程，涵盖架构创新、自监督学习与通用视觉分割三大技术脉络",
    "page_icon": "👁️",
    "hero_pills": [
      "🏷️ CV · Foundation Models · Visual Representation"
    ],
    "count_pill": "{count} 个算法",
    "image_base": "",
    "overview_from_doc": true,
    "latest_overview_from_doc": true
  },
  "overview": [
    {
      "title": "",
      "body_html": "<h1>计算机视觉大模型概述（一）——视觉自监督</h1>\n<ul>\n<li>来源平台: <strong>zhihu</strong>（知乎专栏文章）</li>\n<li>原文链接: <a href=\"https://zhuanlan.zhihu.com/p/2036033044675551842\">https://zhuanlan.zhihu.com/p/2036033044675551842</a></li>\n<li>作者: 渣渣鸣</li>\n</ul>\n<hr />\n<p>计算机视觉大模型概述（一）——视觉自监督</p>\n<h1>计算机视觉大模型概述（一）——视觉自监督</h1>\n<p>作者: 渣渣鸣, 赞: 9</p>\n<p>无论是CV还是NLP，增加模型容量都是近几年的趋势，原因有二：</p>\n<ul>\n<li>一方面是算力平台的不断进步，NV不断推出算力/显存更大的GPU，而车端计算芯片的tops也从几十涨到了上千，在19/20年，智驾普遍才刚开始接触xavier的开发板，但在25/26年，thor/天玑等等车端新品的算力都已经进化到上千tops的级别，摩尔定律还在发力</li>\n<li>另一方面则是scaling law的出现，表明至少是language任务上，<strong>模型的性能和模型的参数量、训练数据量、以及GPU算力存在着幂律关系</strong>，而当参数量和数据量增加到某个临界值后，模型会出现一定的涌现与泛化能力。</li>\n</ul>\n<p>那么我们自然可以提出非常多的问题：视觉领域，是否依然存在scaling law？视觉领域能否通过扩大模型的参数量，来得到一个具备一定zero-shot或in-context能力的基础模型？视觉领域的预训练，应该以怎样的形式开展，什么是视觉领域的next token prediction？</p>\n<p>这一系列文章，笔者计划拆成两部分，第一部分会尝试介绍视觉预训练模型的发展过程，而第二部分则会尝试通过介绍Vision+LLM的多模态大模型发展过程来展现视觉大模型是如何进入具体的下游任务和生产环境。</p>\n<p>有心的同学可能发现了，其实视觉预训练模型和多模态大模型其实是不一样的东西。确实是这样的，但是笔者在这篇文章里，还是会统一把他们称作视觉大模型，并将其看作视觉大模型的两个阶段。</p>\n<p>在第一个阶段，视觉预训练大模型就是借鉴NLP领域的进展，试图让模型在海量的无标注图像上先进行<strong>自监督训练</strong>，得到一个能应对海量场景/光照/任务，具备通用视觉特征提取能力的模型。我们希望这样得到的模型能够经过很简单的微调，就能应用到不同的任务上去。整体的思路类似于先通过pretrain进行训练，然后再利用finetuning迁移到不同的领域去。</p>\n<p>在第二个阶段，视觉模型则和LLM进行了融合，通过视觉预训练模型提取视觉特征，通过LLM提取文本特征，两个模态的特征进行融合后输出我们需要的多模态结果。在这个阶段，我们所说的视觉预训练大模型，实际上成为了视觉模型+LLM的统称，或者说<strong>多模态大模型</strong>，也可以说是<strong>VLM</strong>。这里的预训练就不再是狭义的无监督训练，而是广义的大规模图文对预训练，而整个模型的训练流程，也不再仅仅是预训练，而是要通过和LLM一样使用额外的后训练来完成最终的对齐工作。</p>\n<p>其实，抛开👆介绍的这一条线，还有一个独立的分支，就是<strong>world model</strong>。world model试图通过next frame prediction来模仿language领域的ntp行为，通过对下一帧进行预测，尝试让模型通过大规模的互联网视频来获取world knowledge。这是因为视频中的时序信息天然带有了物理世界的规律，视频中玻璃会碎，水会流动，车辆的前进会带来视角的变化，这些前后帧之间的变化，恰恰是真实物理世界在二维空间的投影。更进一步地，我们可以通过给world model接入action head来预测action，并期望真实世界对action的反馈和world model的预测结果是一致的。不过这条线也有非常多的内容，适合新开一坑，等笔者看完physical intelligence的所有文章再学习这个方向吧。</p>\n<blockquote>\n<p>大部分内容笔者不会进行特别细致的解释，因为本文的目的在于综述这一条技术发展的路径，建议读者自行阅读原文或相关博客</p>\n</blockquote>\n<hr />\n<h2>视觉自监督（Self-Supervised Learning, SSL）</h2>\n<p>在21年左右，SSL领域有一波集中的爆发，包括meta/google/msra/deepmind/openai等公司都有涉及。在这个方向，主要有以下两种范式：</p>\n<ul>\n<li>掩码图像建模（Masked Image Modeling, MIM）</li>\n<li>对比学习（Contrastive Learning）</li>\n</ul>\n<p>之所以大家都要做SSL这个方向，原因也蛮简单的：</p>\n<ol>\n<li>自监督预训练可以突破标注数据的成本和数量限制，数据量可以从ImageNet的百万级别扩充到十亿以上的级别</li>\n<li>学习通用的视觉表征，通过掩码/对比学习，让模型对几何/位置/纹理等具备理解能力</li>\n</ol>\n<h2>对比学习（Contrastive Learning）</h2>\n<p>所谓对比学习，指的是通过自监督的方式，让模型学习一种映射方式，使得相似的样本在映射后的高维空间中更接近，而不相似的样本则距离更远。MoCo系列和SimCLR都是显式构建负样本，而DINO则通过自蒸馏无需显式构建负样本。</p>\n<p>对比学习的概念，非常像目标跟踪以及人脸检测中用到的triplet loss。triplet loss就是用于拉近pos sample和anchor sample的距离，拉大neg sample和anchor sample的距离。在人脸/目标跟踪中，一个物体常常会因为视角的变化出现较大的差异，因此我们会选择一个物体的不同视角图像作为正样本对，而随机选取一个非指定物体作为负样本，通过triplet loss，让一个模型输出3个输入的embedding，并且要让正样本之间的embedding在欧氏空间的距离更近，而正负样本之间的距离更远：</p>\n<p><img alt=\"\" src=\"https://pica.zhimg.com/v2-e031653f7cfc1fcdcc0182ea91e545a4_1440w.jpg\" /></p>\n<p>图片来源见水印</p>\n<p>在MoCo和SimCLR之前，对比学习主要通过memory bank。</p>\n<p>所谓memory bank，指的是先预先开辟一块非常大的内存空间，吧数据集中所有的图片都转化成特征向量存储上去，在对比的时候，取出当前图像的特征作为正样本，然后随机抽取其他图像特征作为负样本，最大化正负样本之间的分布差异。在每次对比完，更新模型以后，还要把正样本的特征更新回memory bank内部。这种方法一是占用空间大，二是取到的特征一致性差，每次随机取的负样本有可能是1000step以前的负样本，也有可能是才更新过的负样本。</p>\n<h3>SimCLR</h3>\n<p>SimCLR为了解决memory bank的缺点，选择了在batch内取负样本的做法。</p>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//www.zhihu.com/video/2036036914873102944\"><img alt=\"\" src=\"https://pica.zhimg.com/v2-14ce4e86ee15170836d8ea897cf191d2_1440w.jpg?source=ccfced1a\" />SimCLR流程https://www.zhihu.com/video/2036036914873102944</a></p>\n<p>对于每个batch内的N张图像，均使用两种不同的aug来处理，得到2N个样本，对于来自同一个图像的样本，作为正样本，其余的2N-2个样本就都是负样本了。相比于memory bank，SimCLR每个batch内的特征都是来自同一次forward，特征一致性非常好。</p>\n<p>但是SimCLR依旧非常吃显存，显存内的样本数量越多，效果越好，实际使用了8192的batchsize。由于batchsize太大，SimCLR也使用了LARS优化器才能训起来。</p>\n<h3>MoCo系列</h3>\n<p>MoCo则没有使用in batch negatives来构建负样本，而是维护了一个队列，这样队列的长度可以远超训练的batch size。通过新样本入列，老样本出列，实现memory的动态更新。但是如果队列的长度过长，依旧会有特征不一致的问题，作者在这里使用了momentum encoder的概念。也即是在最开始momentum encoder的权重和encoder一致，但是我们只通过梯度更新encoder，然后使用</p>\n<p><img alt=\"\\theta_k\\leftarrow m \\theta_k + (1-m)\\theta_q\" src=\"https://www.zhihu.com/equation?tex=%5Ctheta_k%5Cleftarrow+m+%5Ctheta_k+%2B+%281-m%29%5Ctheta_q\" /></p>\n<p>这样EMA的方式来更新momentum encoder，这样momentum encoder实际上是一个更新非常缓慢的encoder，从而保证了队列中的所有样本，其特征都较为一致。</p>\n<p><img alt=\"\" src=\"https://pic4.zhimg.com/v2-1b61fd1ac9bf3dcc16008f781dcaae17_1440w.jpg\" /></p>\n<p>MoCo</p>\n<p>此外还需要提一下的是，作者用Shuflfling BN替代了BN，原因是在对比学习中，Query 和对应的 Key 通常来自同一张图。如果在同一块显卡上计算 BN，Query 和 Key 会共享相同的均值和方差统计量。模型会发现，即便它不学习任何语义特征，只要通过观察 BN 的统计量波动，就能识别出哪些样本属于同一组（即正样本）。因此在forward之前需要把所有样本随机分配到不同的GPU上，推理完成以后再把feature重新分配回原始GPU。<br />\n后续使用LN就可以不再使用这个trick了。</p>\n<p>MoCov2增加了特征提取后的MLP projection再进行对比，使用了更强的数据增强。</p>\n<p>MoCov3拥抱了ViT，取消了队列，使用了batch内采样的方式。同时是用双路对比损失，Q和K相互匹配。</p>\n<h3>DINO</h3>\n<p>DINO的动机则是作者希望在视觉领域也使用transformer利用自监督来训练，因为图像的有监督训练会将丰富视觉信息简化，导致学习的特征不够优秀。</p>\n<p><img alt=\"\" src=\"https://pic4.zhimg.com/v2-bcb380b0a78ed1f365fd42a3f80ac0ef_1440w.jpg\" /></p>\n<p>DINO</p>\n<p>DINO把自监督对比学习的过程看作是一个蒸馏的过程，student要对齐teacher的输出，但student和teacher的结构完全一致，唯一不一样的只有内部的权重。但是teacher在训练的过程中不会接受梯度，而是通过student的权重缓慢更新。</p>\n<p>对于输入图像，会进行2次224x224的随机crop，得到global view；再经过6次96x96的随机crop得到local view。。在大图中具有完整的语义信息，而小图只有局部的细节，并且大图和小图的图像增强也有差异。loss计算的时候，student需要预测所有的局部视图与teacher的全局视图之间的一致性。</p>\n<p>作者给teacher增加了center和softmax，主要是为了防止模型崩溃。</p>\n<p>模型崩溃有2种情况，一是模型在所有维度输出的都一样，特征成了均匀分布；另一种是某个维度主导了输出。centering就是为了避免某个维度成为主导，但是有可能会让特征均匀分布，而softmax则是为了让特征sharp，但是有可能出现某个维度主导，因此这两者需要结合起来使用。</p>\n<p>具体实现上，center是通过给teacher的输出增加一个bias来得到的，而这个bias也是通过计算batch内teacher的平均输出再通过EMA来缓慢更新的，这类似于对teacher的输出做了一个零点校准，让teacher专注于以零点为基准输出feature。而sharpening则是为了防止输出过于平坦，使用了一个带温度的softmax。</p>\n<p>在结果上，DINO展现出了非常有趣的特性：不同的head可以关注到物体的不同部分，而这些部分又是具有语义上的一致性的。</p>\n<p><img alt=\"\" src=\"https://pica.zhimg.com/v2-61b7646bbfd046f9a126cefd28ccb296_1440w.jpg\" /></p>\n<p>transformer内不同head的可视化</p>\n<p>Meta在DINO的进化过程中，也践行了scaling law的思路，模型大小从100M提升到1B与7B，数据量从1M提升到142M与1.7B，并且不断优化训练的稳定性与特征的一致性。</p>\n<p>到了<a href=\"https://link.zhihu.com/?target=https%3A//video-sin6-3.xx.fbcdn.net/o1/v/t2/f2/m412/AQNTy7ypX0tXqJ7bDg4ADKWCmknOzU89Mr7WLgYBNuJpW-uJdmfLwRo9EseBm8pYQRv0yARNeVdwk_CXF6Ih0d3iSzKP0v72yi6AXzm7aA.mp4%3F_nc_cat%3D110%26_nc_sid%3D8bf8fe%26_nc_ht%3Dvideo-sin6-3.xx.fbcdn.net%26_nc_ohc%3DSq82gWADvbEQ7kNvwGiHXzp%26efg%3DeyJ2ZW5jb2RlX3RhZyI6Inhwdl9wcm9ncmVzc2l2ZS5GQUNFQk9PSy4uQzMuNjQwLnN2ZV9zZCIsInhwdl9hc3NldF9pZCI6MTQzNDI0NjI4NDQ1OTc5OCwiYXNzZXRfYWdlX2RheXMiOjIxOCwidmlfdXNlY2FzZV9pZCI6MTAxMjgsImR1cmF0aW9uX3MiOjg1LCJ1cmxnZW5fc291cmNlIjoid3d3In0%253D%26ccb%3D17-1%26_nc_gid%3DESVIsPqkP1M17h2S0hZy3g%26_nc_ss%3D7a30f%26_nc_zt%3D28%26oh%3D00_Afw9OnwM0fBIsbxt3copLb1ZHn19M7PrSh-9XcplgUhxuA%26oe%3D69C30DCC%26bitrate%3D292394%26tag%3Dsve_sd\">DINOv3</a>，freeze DINOv3只finetune一个linear decoder，在各大任务上都实现了非常大的领先</p>\n<p><img alt=\"\" src=\"https://pic2.zhimg.com/v2-f721777ac9a40b6063f3e6b19b80303d_1440w.jpg\" /></p>\n<p>DINOv3</p>\n<h2>MAE</h2>\n<p>Masked Autoencoders来自kaiming团队，做的思路也非常kaiming，简单有效：以一定比例随机 mask 掉图片中的一些图像块(patch)然后重建这些部分的像素值。</p>\n<p><img alt=\"\" src=\"https://pic4.zhimg.com/v2-20f0d930360255c729b48d280a4d9239_1440w.jpg\" /></p>\n<p>图片来源见水印</p>\n<p>主要的特点有两个：</p>\n<ol>\n<li>非对称的编解码器——encoder仅编码可见部分，而decoder会编码所有部分</li>\n<li>非常高的mask比例——不同于NLP中仅mask token，并且比例很低，MAE使用75%-95%的比例来进行mask</li>\n</ol>\n<p>作者在这里写了三个原因，为什么之前CV没人做mask：</p>\n<ol>\n<li>架构差异，CNN不方便把mask的东西直接丢掉不编码，但是有了ViT就可以了</li>\n<li>信息密度不同，语言是人类创造的，本身就是高度语义和信息密集的，于是将句子中的少量词语抹去再让模型去预测这些被抹去的词会逼迫模型去理解语义；而对于图像则相反，它在空间上是高度冗余的，对于图片中的某个部分，模型很容易由其相邻的图像块推断出来(你想想看插值的道理)，不需要大量的高级语义信息。因此在CV中如果要mask，应该mask掉非常多的内容，才能让任务具有挑战性，让模型学到latent representation</li>\n</ol>\n<blockquote>\n<p>Information density is different between language and vision. Languages are human-generated signals that are highly semantic and information-dense. When training a model to predict only a few missing words per sentence, this task appears to induce sophisticated language understanding. Images, on the contrary, are natural signals with heavy spatial redundancy -- e.g., a missing patch can be recovered from neighboring patches with little high-level understanding of parts, objects, and scenes</p>\n</blockquote>\n<ol>\n<li>解码目标不同，NLP是预测被mask的token，是有语义的，而CV mask掉的是像素，是低语义的。</li>\n</ol>\n<p>OK，那么mask掉这么多内容，模型的预测结果究竟怎样呢？</p>\n<p><img alt=\"\" src=\"https://pic4.zhimg.com/v2-227b185ea34beb5ef44553c5488400d1_1440w.jpg\" /></p>\n<p>MAE重建效果</p>\n<p>在具体的做法上，mask是通过将图像分成16x16互不重叠的patch，使用均匀分布进行随机采样，然后mask掉剩下的部分。作者尝试了不同的mask策略和比例，发现75%的均匀随机采样效果是最好的</p>\n<p><img alt=\"\" src=\"https://pic3.zhimg.com/v2-856cfd45f8bb9387de69021593f63932_1440w.jpg\" /></p>\n<p>mask比例对性能的影响</p>\n<p>decoder的masked token实际上是learnable embedding，由所有patch共享的1个embedding，通过pos embedding来区分。而decoder的target是重建出的像素数值，这里只对masked token计算MSE loss，而不对没有mask的token监督。</p>\n<p>在文章中encoder的参数量会远高于decoder，因为decoder只是一个重建图像用的解码器，而encoder才是我们需要的通用自监督模型。而且因为本身丢掉了非常多的图像token，即使使用非常大的encoder，训练效率也依然很高</p>\n<h2>总结</h2>\n<p>不管是对比学习，还是掩码学习，这一阶段的视觉大模型是通过自己的方式尝试向LLM中自监督的next token prediction学习，试图通过大规模自监督预训练，来让模型具备某种图像领域的world knowledge，从而few-show或zero-show迁移到具体的有监督任务上。</p>\n<p>而真正拥抱LLM的视觉大模型，我们在下个文章中进行介绍。</p>\n<p>下一篇：</p>\n<p><a href=\"https://zhuanlan.zhihu.com/p/2036395142320494575\">计算机视觉大模型概述（二）——VLM</a></p>"
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
        "id": "vit",
        "x": 100,
        "y": 100,
        "category": "foundation"
      },
      {
        "id": "deit",
        "x": 200,
        "y": 100,
        "category": "foundation"
      },
      {
        "id": "swin",
        "x": 220,
        "y": 100,
        "category": "foundation"
      },
      {
        "id": "clip",
        "x": 200,
        "y": 550,
        "category": "multimodal"
      },
      {
        "id": "dino",
        "x": 230,
        "y": 250,
        "category": "representation"
      },
      {
        "id": "beit",
        "x": 240,
        "y": 250,
        "category": "representation"
      },
      {
        "id": "mae",
        "x": 260,
        "y": 250,
        "category": "representation"
      },
      {
        "id": "convnext",
        "x": 300,
        "y": 100,
        "category": "foundation"
      },
      {
        "id": "eva",
        "x": 340,
        "y": 250,
        "category": "representation"
      },
      {
        "id": "internimage",
        "x": 340,
        "y": 100,
        "category": "foundation"
      },
      {
        "id": "dinov2",
        "x": 400,
        "y": 250,
        "category": "representation"
      },
      {
        "id": "sam",
        "x": 400,
        "y": 400,
        "category": "segmentation"
      },
      {
        "id": "florence2",
        "x": 500,
        "y": 550,
        "category": "multimodal"
      },
      {
        "id": "sam2",
        "x": 520,
        "y": 400,
        "category": "segmentation"
      },
      {
        "id": "vision_mamba",
        "x": 650,
        "y": 100,
        "category": "foundation"
      },
      {
        "id": "lookwhere",
        "x": 650,
        "y": 250,
        "category": "representation"
      },
      {
        "id": "xsam",
        "x": 670,
        "y": 400,
        "category": "segmentation"
      },
      {
        "id": "unipixel",
        "x": 650,
        "y": 550,
        "category": "multimodal"
      },
      {
        "id": "rynnbrain",
        "x": 670,
        "y": 550,
        "category": "multimodal"
      },
      {
        "id": "videoloom",
        "x": 650,
        "y": 550,
        "category": "multimodal"
      }
    ],
    "edges": [
      {
        "from": "vit",
        "to": "deit",
        "label": "数据高效"
      },
      {
        "from": "vit",
        "to": "swin",
        "label": "层级化"
      },
      {
        "from": "vit",
        "to": "clip",
        "label": "多模态对齐"
      },
      {
        "from": "vit",
        "to": "dino",
        "label": "自监督"
      },
      {
        "from": "vit",
        "to": "beit",
        "label": "掩码建模"
      },
      {
        "from": "vit",
        "to": "sam",
        "label": "可提示"
      },
      {
        "from": "beit",
        "to": "mae",
        "label": "高掩码率"
      },
      {
        "from": "mae",
        "to": "eva",
        "label": "语义重建"
      },
      {
        "from": "swin",
        "to": "convnext",
        "label": "CNN回归"
      },
      {
        "from": "convnext",
        "to": "internimage",
        "label": "可变形"
      },
      {
        "from": "dino",
        "to": "dinov2",
        "label": "大规模"
      },
      {
        "from": "clip",
        "to": "florence2",
        "label": "统一任务"
      },
      {
        "from": "sam",
        "to": "sam2",
        "label": "视频扩展"
      },
      {
        "from": "swin",
        "to": "vision_mamba",
        "label": "SSM架构"
      },
      {
        "from": "dinov2",
        "to": "lookwhere",
        "label": "自适应"
      },
      {
        "from": "sam2",
        "to": "xsam",
        "label": "任意分割"
      },
      {
        "from": "florence2",
        "to": "unipixel",
        "label": "像素推理"
      },
      {
        "from": "dinov2",
        "to": "rynnbrain",
        "label": "具身智能"
      },
      {
        "from": "sam2",
        "to": "videoloom",
        "label": "长视频"
      }
    ],
    "milestones": [
      "vit",
      "clip",
      "sam"
    ]
  },
  "algos": [
    {
      "id": "vit",
      "num": 1,
      "name": "ViT",
      "fullName": "视觉Transformer (Vision Transformer)",
      "year": "2020.10",
      "org": "Google Research",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2010.11929",
      "projectUrl": "",
      "category": "foundation",
      "motivation": "纯Transformer首次超越CNN",
      "summary": "ViT 将图像分割为固定大小的 patch 并线性嵌入为 token 序列，直接复用标准 Transformer 编码器进行图像分类，证明了在大规模数据预训练下纯 Transformer 架构无需卷积即可达到甚至超越 CNN 的 SOTA 性能（ImageNet 88.55%）。",
      "keyPoints": [
        "<strong>Patch Embedding</strong>：将图像切分为 <span class=\"kb-math kb-math-inline\">P \\times P</span> 的 patch 并展平后线性投影为 token，序列长度 <span class=\"kb-math kb-math-inline\">N = HW/P^2</span>",
        "<strong>[CLS] Token</strong>：沿用 BERT 的可学习分类 token，拼接在 patch 序列前端，其最终输出用于分类",
        "<strong>1D 可学习位置编码</strong>：实验表明 1D 位置编码与 2D 版本性能相当，模型自动学习到 2D 空间拓扑",
        "<strong>Pre-Norm Transformer</strong>：采用 LayerNorm 前置的 Transformer 编码器（区别于原始 Transformer 的 Post-Norm）",
        "<strong>三种模型规模</strong>：ViT-Base (86M)、ViT-Large (307M)、ViT-Huge (632M)，配置借鉴 BERT",
        "<strong>大规模预训练</strong>：在 JFT-300M（303M 图像）上预训练后迁移，ViT-H/14 在 ImageNet 达 88.55%",
        "<strong>计算效率优势</strong>：相同性能下 ViT 预训练计算量仅为 ResNet 的 1/2 ~ 1/4",
        "<strong>数据规模敏感性</strong>：小数据集上 ViT 不如 CNN（缺乏归纳偏置），大数据集上全面超越",
        "<strong>Hybrid 变体</strong>：可用 CNN 特征图替代原始 patch 作为输入序列，小模型时略优于纯 ViT"
      ],
      "detail": "<h5>核心架构示意图</h5>\n<p><img alt=\"ViT 模型架构\" src=\"https://ar5iv.labs.arxiv.org/html/2010.11929v2/assets/x1.png\" />\n<em>图：ViT 架构总览。图像被切分为固定大小的 patch，经线性投影后加上位置编码和 [CLS] token，送入标准 Transformer 编码器，最终通过 MLP Head 输出分类结果。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># Vision Transformer 前向传播伪代码\ndef vit_forward(image, E, E_pos, x_class, transformer_encoder, mlp_head):\n    &quot;&quot;&quot;\n    image: (B, C, H, W) 输入图像\n    E: (P²·C, D) patch 线性投影矩阵\n    E_pos: (N+1, D) 可学习位置编码\n    x_class: (1, D) 可学习 [CLS] token\n    &quot;&quot;&quot;\n    # Step 1: Patch Embedding\n    patches = split_into_patches(image, patch_size=P)  # (B, N, P²·C)\n    patch_tokens = patches @ E                          # (B, N, D)\n\n    # Step 2: 拼接 [CLS] token + 加位置编码\n    cls_token = x_class.expand(B, 1, D)\n    z_0 = concat([cls_token, patch_tokens], dim=1)      # (B, N+1, D)\n    z_0 = z_0 + E_pos                                   # (B, N+1, D)\n\n    # Step 3: L 层 Transformer 编码器（Pre-Norm）\n    for layer in transformer_encoder:\n        z_prime = layer.MSA(layer.LN1(z)) + z           # Eq.2\n        z = layer.MLP(layer.LN2(z_prime)) + z_prime     # Eq.3\n\n    # Step 4: 分类输出\n    y = LN(z[:, 0])                                     # 取 [CLS] token, Eq.4\n    return mlp_head(y)\n</code></pre>\n<h5>动机与背景</h5>\n<p><strong>传统方法的局限</strong>：在 ViT 之前，Transformer 在 NLP 领域已成为主流架构（BERT、GPT），但在计算机视觉中，卷积神经网络（CNN）仍占据绝对主导地位。虽然有研究尝试将 self-attention 引入视觉任务（如 Non-local Networks、Stand-Alone Self-Attention），但这些方法要么仅在局部窗口内应用注意力以控制计算量，要么需要与卷积层混合使用，无法实现纯 Transformer 架构。</p>\n<p><strong>核心问题</strong>：能否像 NLP 一样，将标准 Transformer <strong>直接</strong>应用于图像，而不引入任何视觉特定的归纳偏置？</p>\n<p><strong>关键洞察</strong>：作者发现，当预训练数据规模足够大时（如 JFT-300M 的 3 亿张图像），Transformer 可以从数据中直接学习到 CNN 通过架构设计（局部性、平移等变性）隐式编码的视觉先验，从而在迁移学习中全面超越 CNN。</p>\n<h5>核心机制详解</h5>\n<p><strong>1. Patch Embedding — 将图像转化为序列</strong></p>\n<p>ViT 的第一步是将 2D 图像转化为 1D token 序列。给定输入图像 <span class=\"kb-math kb-math-inline\">\\mathbf{x} \\in \\mathbb{R}^{H \\times W \\times C}</span>，将其切分为 <span class=\"kb-math kb-math-inline\">N</span> 个大小为 <span class=\"kb-math kb-math-inline\">P \\times P</span> 的 patch：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{x}_p \\in \\mathbb{R}^{N \\times (P^2 \\cdot C)}, \\quad N = \\frac{HW}{P^2}</div>\n<p>每个 patch 被展平为向量后，通过一个可训练的线性投影矩阵 <span class=\"kb-math kb-math-inline\">\\mathbf{E} \\in \\mathbb{R}^{(P^2 \\cdot C) \\times D}</span> 映射到 <span class=\"kb-math kb-math-inline\">D</span> 维嵌入空间。这一步在实现上等价于一个 kernel size = stride = <span class=\"kb-math kb-math-inline\">P</span> 的卷积操作。</p>\n<div class=\"key-point\">💡 <strong>关键</strong>：patch size <span class=\"kb-math kb-math-inline\">P</span> 决定了序列长度 <span class=\"kb-math kb-math-inline\">N = HW/P^2</span>。以 224×224 图像、P=16 为例，<span class=\"kb-math kb-math-inline\">N = 196</span>；若 P=14，则 <span class=\"kb-math kb-math-inline\">N = 256</span>。序列长度与 patch size 的平方成反比，因此更小的 patch 意味着更高的计算成本。</div>\n<p><strong>2. [CLS] Token 与位置编码</strong></p>\n<p>借鉴 BERT，ViT 在 patch 序列前拼接一个可学习的 <strong>[CLS] token</strong> <span class=\"kb-math kb-math-inline\">\\mathbf{x}_{\\text{class}}</span>，其在 Transformer 最后一层的输出作为整个图像的全局表示。初始嵌入为：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{z}_0 = [\\mathbf{x}_{\\text{class}};\\; \\mathbf{x}_p^1\\mathbf{E};\\; \\mathbf{x}_p^2\\mathbf{E};\\; \\cdots;\\; \\mathbf{x}_p^N\\mathbf{E}] + \\mathbf{E}_{\\text{pos}}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\mathbf{E}_{\\text{pos}} \\in \\mathbb{R}^{(N+1) \\times D}</span> 是 <strong>1D 可学习位置编码</strong>。论文实验表明，1D 编码与手工设计的 2D 编码性能无显著差异，因为模型能自动从 1D 编码中学习到 2D 空间结构（相邻 patch 的位置编码余弦相似度更高，且呈现行列结构）。</p>\n<p><strong>3. Transformer 编码器（Pre-Norm）</strong></p>\n<p>ViT 使用标准 Transformer 编码器，但采用 <strong>Pre-Norm</strong>（LayerNorm 前置）而非原始 Transformer 的 Post-Norm：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{z}&#x27;_\\ell = \\text{MSA}(\\text{LN}(\\mathbf{z}_{\\ell-1})) + \\mathbf{z}_{\\ell-1}, \\quad \\ell = 1 \\ldots L</div>\n<div class=\"kb-math kb-math-display\">\\mathbf{z}_\\ell = \\text{MLP}(\\text{LN}(\\mathbf{z}&#x27;_\\ell)) + \\mathbf{z}&#x27;_\\ell, \\quad \\ell = 1 \\ldots L</div>\n<ul>\n<li><strong>MSA（Multi-Head Self-Attention）</strong>：标准多头自注意力，每个 token 与所有其他 token 交互</li>\n<li><strong>MLP</strong>：两层全连接网络，隐藏层维度为 <span class=\"kb-math kb-math-inline\">4D</span>，激活函数为 GELU</li>\n<li><strong>残差连接</strong>：每个子层都有残差连接</li>\n</ul>\n<p>最终分类输出：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{y} = \\text{LN}(\\mathbf{z}_L^0)</div>\n<p>即取最后一层 [CLS] token 的输出，经 LayerNorm 后送入分类头。</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：Pre-Norm 与 Post-Norm 的区别在于 LayerNorm 的位置。Pre-Norm 将 LN 放在注意力/MLP <strong>之前</strong>，有助于深层网络的训练稳定性。</div>\n<p><strong>4. 分类头</strong></p>\n<ul>\n<li><strong>预训练阶段</strong>：使用带一个隐藏层的 MLP（隐藏层 + GELU + 输出层）</li>\n<li><strong>微调阶段</strong>：替换为单层线性层（zero-initialized），输出维度为下游任务类别数 <span class=\"kb-math kb-math-inline\">K</span></li>\n</ul>\n<p><strong>5. 高分辨率微调</strong></p>\n<p>微调时通常使用比预训练更高的分辨率（如 ViT-L/16 预训练 224 → 微调 512）。由于 patch size 不变，更高分辨率意味着更长的序列。此时对预训练的位置编码进行 <strong>2D 插值</strong>以适应新的序列长度。</p>\n<h5>模型变体</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>模型</th>\n<th>层数</th>\n<th>隐藏维度 <span class=\"kb-math kb-math-inline\">D</span></th>\n<th>MLP 维度</th>\n<th>注意力头数</th>\n<th>参数量</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>ViT-Base</td>\n<td>12</td>\n<td>768</td>\n<td>3072</td>\n<td>12</td>\n<td>86M</td>\n</tr>\n<tr>\n<td>ViT-Large</td>\n<td>24</td>\n<td>1024</td>\n<td>4096</td>\n<td>16</td>\n<td>307M</td>\n</tr>\n<tr>\n<td>ViT-Huge</td>\n<td>32</td>\n<td>1280</td>\n<td>5120</td>\n<td>16</td>\n<td>632M</td>\n</tr>\n</tbody>\n</table></div>\n<p>命名规则：<strong>ViT-{Size}/{Patch}</strong>，如 ViT-L/16 表示 Large 模型 + 16×16 patch。</p>\n<h5>训练细节</h5>\n<ul>\n<li><strong>预训练优化器</strong>：Adam（<span class=\"kb-math kb-math-inline\">\\beta_1=0.9, \\beta_2=0.999</span>），batch size 4096，weight decay 0.1，线性学习率 warmup + decay</li>\n<li><strong>微调优化器</strong>：SGD with momentum，batch size 512</li>\n<li><strong>预训练数据集</strong>：ImageNet-1k (1.3M)、ImageNet-21k (14M)、JFT-300M (303M)</li>\n<li><strong>数据增强</strong>：标准预处理，遵循 BiT 的设置</li>\n</ul>\n<h5>与 CNN 的关键对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th>CNN (如 ResNet)</th>\n<th>ViT</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><strong>归纳偏置</strong></td>\n<td>强（局部性、平移等变性、2D 结构）</td>\n<td>极弱（仅 patch 切分引入微弱 2D 先验）</td>\n</tr>\n<tr>\n<td><strong>感受野</strong></td>\n<td>逐层递增，浅层局部</td>\n<td>第一层即可全局注意</td>\n</tr>\n<tr>\n<td><strong>小数据表现</strong></td>\n<td>更好（归纳偏置提供正则化）</td>\n<td>较差（易过拟合）</td>\n</tr>\n<tr>\n<td><strong>大数据表现</strong></td>\n<td>性能饱和较早</td>\n<td>持续提升，超越 CNN</td>\n</tr>\n<tr>\n<td><strong>计算效率</strong></td>\n<td>基准</td>\n<td>相同性能下计算量为 CNN 的 1/2~1/4</td>\n</tr>\n<tr>\n<td><strong>可扩展性</strong></td>\n<td>有限</td>\n<td>在实验范围内未见饱和</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 <strong>关键洞察</strong>：卷积的归纳偏置在小数据集上是有益的正则化，但在大数据集上反而成为限制——直接从数据学习相关模式更加有效。ViT-B/32 在 JFT 9M 子集上不如 ResNet50，但在 90M+ 子集上反超。</div>\n<h5>注意力可视化分析</h5>\n<p>论文对 ViT 的内部表示进行了深入分析：</p>\n<ol>\n<li><strong>Patch Embedding 滤波器</strong>：学习到的线性投影滤波器类似于 CNN 浅层的 Gabor 滤波器，捕获 patch 内部的细粒度结构</li>\n<li><strong>位置编码</strong>：自动学习到 2D 空间拓扑——相邻 patch 的位置编码相似度更高，且呈现清晰的行列结构</li>\n<li><strong>注意力距离</strong>：浅层中部分注意力头已具有全局感受野（注意力距离覆盖整幅图像），同时也有局部注意力头（类似 CNN 早期卷积层的功能）；随网络深度增加，注意力距离整体增大</li>\n<li><strong>语义注意力</strong>：模型的注意力集中在对分类有语义意义的图像区域</li>\n</ol>",
      "quiz": {
        "q": "ViT 在小数据集（如 ImageNet-1k）上表现不如同等规模的 CNN，主要原因是什么？",
        "options": [
          "Transformer 的参数量太大，无法在小数据集上训练",
          "ViT 缺乏 CNN 的归纳偏置（局部性、平移等变性），在数据不足时难以学习有效的视觉特征",
          "ViT 的 patch embedding 丢失了过多的空间信息",
          "ViT 使用的 Adam 优化器不适合小数据集训练"
        ],
        "answer": 1,
        "explain": "CNN 通过架构设计内置了局部性和平移等变性等视觉先验，在数据有限时起到正则化作用；ViT 几乎不含视觉归纳偏置，需要大规模数据才能从数据中学习到这些模式。"
      }
    },
    {
      "id": "deit",
      "num": 2,
      "name": "DeiT",
      "fullName": "数据高效图像Transformer (Data-efficient Image Transformers)",
      "year": "2020.12",
      "org": "Facebook AI Research",
      "parent": "vit",
      "paperUrl": "https://arxiv.org/abs/2012.12877",
      "projectUrl": "",
      "category": "foundation",
      "motivation": "知识蒸馏解决数据依赖",
      "summary": "DeiT 通过一套专门面向 ViT 的高效训练配方和 distillation token 蒸馏机制，让 Transformer 仅用 ImageNet-1K 就能达到接近大规模预训练 ViT 的性能，显著缓解了视觉 Transformer 的数据依赖问题。",
      "keyPoints": [
        "只使用 ImageNet-1K 训练，不依赖 JFT-300M 等超大规模额外数据。",
        "提出 distillation token，使学生模型在 Transformer 内部直接接收教师监督。",
        "发现 hard distillation 比经典 soft distillation 更适合与强数据增强共同使用。",
        "使用 RegNetY 等 CNN 作为教师时，蒸馏效果优于 Transformer 教师。",
        "配套采用 AdamW、RandAugment、Mixup、CutMix、Repeated Augmentation 等完整训练配方。"
      ],
      "detail": "<p><img alt=\"DeiT 蒸馏框架图\" src=\"https://ar5iv.labs.arxiv.org/html/2012.12877/assets/x3.png\" />\n<em>图：DeiT 在标准 class token 之外引入 distillation token，由教师网络对其进行监督。</em></p>\n<pre><code class=\"language-python\"># DeiT 训练伪代码\npatch_tokens = patch_embed(image)\ntokens = concat([cls_token, dist_token, patch_tokens]) + pos_embed\nhidden = transformer(tokens)\ncls_logits = head(hidden[:, 0])\ndist_logits = head_dist(hidden[:, 1])\n\nteacher_label = teacher(image).argmax(dim=-1)\nloss = 0.5 * CE(cls_logits, gt_label) + 0.5 * CE(dist_logits, teacher_label)\nloss.backward()\noptimizer.step()\n</code></pre>\n<p>ViT 的第一个现实问题是：它在大数据预训练场景下很强，但在只用 ImageNet-1K 从头训练时，性能并不稳定，也难以和成熟 CNN 竞争。DeiT 的工作不是重新设计主干，而是回答一个更实际的问题：能否只靠更好的训练方法，把 ViT 训练得像卷积网络一样“省数据”。</p>\n<p>论文最核心的结构创新是 distillation token。标准 ViT 只有一个 class token 用于汇聚全局信息，而 DeiT 增加了第二个可学习 token，让它和 patch token 一起参与自注意力计算，但最终单独接收教师网络的监督。于是蒸馏不再发生在模型输出层之外，而是直接嵌入 Transformer 的内部表征学习过程。推理时，class token 和 distillation token 的预测做平均，得到最终结果。</p>\n<p>DeiT 比较了 soft distillation 和 hard distillation。soft 版本用教师输出分布做 KL 约束，hard 版本则直接把教师的 argmax 类别当作额外标签。论文发现后者更稳定，因为它与 Mixup、CutMix、label smoothing 等训练技巧的耦合更自然。目标函数可写成：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L} =\n\\frac{1}{2}\\,\\mathcal{L}_{\\text{CE}}(y_{\\text{cls}}, y)\n\\;+\\;\n\\frac{1}{2}\\,\\mathcal{L}_{\\text{CE}}(y_{\\text{dist}}, y_t)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">y</span> 是真实标签，<span class=\"kb-math kb-math-inline\">y_t</span> 是教师预测的硬标签。直觉上，学生同时学习“数据本身的监督”和“成熟教师给出的归纳偏置”，后者尤其弥补了 ViT 缺少卷积先验的问题。</p>\n<p>另一个重要结论是：CNN 教师往往比 Transformer 教师更有效。原因在于 CNN 本身携带局部性和平移等变等视觉归纳偏置，恰好能补齐 ViT 的短板。DeiT 因此并不是否定 CNN，而是把 CNN 的归纳偏置通过蒸馏传递给 Transformer，这也是它成为“数据高效 ViT”代表作的关键。</p>",
      "quiz": {
        "q": "DeiT 中 distillation token 的主要作用是什么？",
        "options": [
          "替代所有 patch token 参与编码",
          "专门承接教师模型监督，并在 Transformer 内部学习蒸馏表征",
          "只用于位置编码插值",
          "把图像切成更小 patch"
        ],
        "answer": 1,
        "explain": "DeiT 新增 distillation token，让教师监督直接进入 Transformer 编码过程，而不是只在最终 logits 上做外部蒸馏。"
      }
    },
    {
      "id": "swin",
      "num": 3,
      "name": "Swin Transformer",
      "fullName": "移动窗口层级Transformer (Swin Transformer)",
      "year": "2021.03",
      "org": "Microsoft Research Asia",
      "parent": "vit",
      "paperUrl": "https://openaccess.thecvf.com/content/ICCV2021/html/Liu_Swin_Transformer_Hierarchical_Vision_Transformer_Using_Shifted_Windows_ICCV_2021_paper",
      "projectUrl": "",
      "category": "foundation",
      "motivation": "层级特征+线性复杂度",
      "summary": "Swin Transformer 用局部窗口注意力和跨层移位窗口机制，把 Transformer 从单尺度全局建模改造成可线性扩展、可输出层级特征的通用视觉骨干，直接打通了检测和分割等密集预测任务。",
      "keyPoints": [
        "用 window-based self-attention 把全局 <span class=\"kb-math kb-math-inline\">O((HW)^2)</span> 复杂度降为对图像尺寸线性增长。",
        "相邻层交替使用 W-MSA 和 shifted W-MSA，实现跨窗口信息交换。",
        "通过 patch merging 构建 4-stage 层级特征金字塔，形式上更接近 CNN/FPN。",
        "使用相对位置偏置而非绝对位置编码，便于迁移到不同窗口尺寸和下游任务。",
        "在分类、检测、实例分割和语义分割上都显著优于同时代 ViT/ResNet 骨干。"
      ],
      "detail": "<p><img alt=\"Swin Transformer 架构图\" src=\"https://ar5iv.labs.arxiv.org/html/2103.14030/assets/x1.png\" />\n<em>图：Swin 采用分阶段层级结构，每个阶段内部交替堆叠常规窗口注意力和移位窗口注意力，并在阶段间做 patch merging。</em></p>\n<pre><code class=\"language-python\"># Swin Block 伪代码\ndef swin_block(x, shift=False, window_size=7):\n    shortcut = x\n    x = layer_norm(x)\n    if shift:\n        x = torch.roll(x, shifts=(-window_size // 2, -window_size // 2), dims=(1, 2))\n    windows = partition_windows(x, window_size)\n    windows = window_attention(windows, relative_position_bias=True, use_mask=shift)\n    x = reverse_windows(windows, window_size)\n    if shift:\n        x = torch.roll(x, shifts=(window_size // 2, window_size // 2), dims=(1, 2))\n    x = shortcut + x\n    x = x + mlp(layer_norm(x))\n    return x\n</code></pre>\n<p>ViT 的两个短板很明显：第一，全局自注意力在高分辨率下计算量过高；第二，输出始终是单尺度 token 序列，不适合检测和分割等需要多尺度特征的任务。Swin 的贡献就是把这两个问题一起处理掉，而且尽量不牺牲 Transformer 的建模能力。</p>\n<p>它的第一步是把注意力限制在固定大小窗口内。若特征图大小为 <span class=\"kb-math kb-math-inline\">h \\times w</span>，窗口边长为 <span class=\"kb-math kb-math-inline\">M</span>，则全局注意力复杂度近似为</p>\n<div class=\"kb-math kb-math-display\">\\Omega(\\text{MSA}) = 4hwC^2 + 2(hw)^2C</div>\n<p>而窗口注意力变成</p>\n<div class=\"kb-math kb-math-display\">\\Omega(\\text{W-MSA}) = 4hwC^2 + 2M^2hwC</div>\n<p>当 <span class=\"kb-math kb-math-inline\">M</span> 固定时，复杂度对图像尺寸 <span class=\"kb-math kb-math-inline\">hw</span> 线性增长。问题在于：如果永远只在独立窗口内部做注意力，不同窗口之间的信息就断开了。Swin 的解法是下一层把窗口平移半个窗口宽度，让原来分属不同窗口的 token 在新分组中相遇，这就是 shifted window 的核心。</p>\n<p>实现上，直接平移会导致边界出现尺寸不整齐的小窗口。论文因此使用 cyclic shift 加 attention mask：先对特征图做循环平移，再按原窗口数划分，最后用掩码阻断不该相互通信的位置。这样既保留了跨窗口连接，又不增加窗口数量，工程上非常高效。</p>\n<p>Swin 的第二个关键设计是 patch merging。每过一个阶段，把相邻 <span class=\"kb-math kb-math-inline\">2\\times2</span> patch 拼接并线性映射，空间分辨率减半、通道数增加，于是模型天然得到类似 CNN 的多尺度层级表示。这也是它能无缝接到 FPN、Mask R-CNN、UPerNet 等下游框架上的根本原因。某种意义上，Swin 不是“把 CNN 替掉”，而是把 Transformer 改造成了更像 CNN 的视觉骨干。</p>",
      "quiz": {
        "q": "Swin Transformer 中 shifted window 的主要作用是什么？",
        "options": [
          "让每层都恢复成全局自注意力",
          "在保持窗口注意力线性复杂度的同时，实现跨窗口的信息交互",
          "替代 patch embedding 做下采样",
          "去掉位置编码的需求"
        ],
        "answer": 1,
        "explain": "如果只做独立窗口注意力，不同窗口之间不会通信；shifted window 通过跨层平移窗口，让边界 token 在下一层建立连接。"
      }
    },
    {
      "id": "clip",
      "num": 4,
      "name": "CLIP",
      "fullName": "对比语言-图像预训练 (Contrastive Language-Image Pre-training)",
      "year": "2021.03",
      "org": "OpenAI",
      "parent": "vit",
      "paperUrl": "https://arxiv.org/abs/2103.00020",
      "projectUrl": "",
      "category": "multimodal",
      "motivation": "视觉语言对齐开创零样本",
      "summary": "CLIP 通过在 4 亿互联网图文对上进行对比学习预训练，将图像与自然语言映射到共享嵌入空间，开创性地实现了视觉模型的零样本迁移能力，无需任何下游标注数据即可匹配 ResNet-50 在 ImageNet 上的监督学习性能。",
      "keyPoints": [
        "<strong>对比学习目标</strong>：给定一个 batch 的 <span class=\"kb-math kb-math-inline\">N</span> 个图文对，最大化 <span class=\"kb-math kb-math-inline\">N</span> 个正确配对的余弦相似度、最小化 <span class=\"kb-math kb-math-inline\">N^2 - N</span> 个错误配对的相似度，使用对称交叉熵损失（InfoNCE）",
        "<strong>大规模预训练数据集 WIT</strong>：从互联网收集 4 亿（图像, 文本）对，覆盖广泛视觉概念，规模远超 ImageNet",
        "<strong>双编码器架构</strong>：图像编码器（ResNet / ViT）+ 文本编码器（Transformer），通过线性投影映射到共享多模态嵌入空间",
        "<strong>零样本迁移</strong>：推理时用自然语言描述构造分类器权重（如 \"A photo of a {class}\"），无需任何训练样本即可分类",
        "<strong>Prompt 工程与集成</strong>：使用多种 prompt 模板并集成，平均提升约 5 个百分点",
        "<strong>可学习温度参数 <span class=\"kb-math kb-math-inline\">\\tau</span></strong>：初始化为 0.07，训练中自动调节，裁剪防止 logits 超过 100",
        "<strong>8 种模型规模</strong>：5 个 ResNet（RN50, RN101, RN50x4, RN50x16, RN50x64）+ 3 个 ViT（ViT-B/32, ViT-B/16, ViT-L/14）"
      ],
      "detail": "<h5>核心架构示意图</h5>\n<p><img alt=\"CLIP 方法总览\" src=\"https://ar5iv.labs.arxiv.org/html/2103.00020/assets/x1.png\" />\n<em>图 1：CLIP 方法总览。左：对比预训练阶段，图像编码器和文本编码器联合训练以对齐配对的图文嵌入。右：零样本推理阶段，用自然语言构造分类器，直接对新任务进行预测。</em></p>\n<h5>算法伪代码</h5>\n<p><img alt=\"CLIP 伪代码\" src=\"https://ar5iv.labs.arxiv.org/html/2103.00020/assets/x3.png\" />\n<em>图 3：CLIP 核心实现的 Numpy 风格伪代码。</em></p>\n<p>等价的 Python 伪代码如下：</p>\n<pre><code class=\"language-python\"># CLIP 对比学习伪代码\n# I[n]: 一个 batch 的图像, T[n]: 对应的文本\nI_f = image_encoder(I)    # [N, d_i] 图像特征\nT_f = text_encoder(T)     # [N, d_t] 文本特征\n\n# 线性投影到共享嵌入空间\nI_e = l2_normalize(I_f @ W_i, axis=1)  # [N, d_e]\nT_e = l2_normalize(T_f @ W_t, axis=1)  # [N, d_e]\n\n# 计算缩放的余弦相似度矩阵\nlogits = (I_e @ T_e.T) * exp(t)  # [N, N], t 为可学习温度\n\n# 对称交叉熵损失\nlabels = arange(N)  # 对角线为正样本\nloss_i = cross_entropy(logits, labels, axis=0)  # 图像→文本\nloss_t = cross_entropy(logits, labels, axis=1)  # 文本→图像\nloss = (loss_i + loss_t) / 2\n</code></pre>\n<h5>动机与背景</h5>\n<p>传统计算机视觉系统被训练为预测一组固定的预定义类别，这种受限的监督形式严重限制了模型的通用性——每当需要识别新的视觉概念时，都必须收集额外的标注数据。与此同时，NLP 领域已经证明直接从原始文本学习的预训练方法（如 GPT、BERT）能够实现强大的零样本迁移能力。</p>\n<p>CLIP 的核心洞察是：<strong>自然语言本身就是一种丰富的监督信号</strong>。互联网上存在海量的图文配对数据，这些数据天然包含了对视觉概念的语言描述。与其训练模型预测固定类别标签，不如训练模型理解\"哪段文本描述了哪张图像\"，从而将视觉表示与语言语义对齐。</p>\n<div class=\"key-point\">💡 关键：CLIP 不是第一个利用自然语言监督学习视觉表示的工作，但它是第一个证明这种方法在足够大的数据规模下可以匹配甚至超越传统监督学习的工作。</div>\n<h5>核心机制：对比学习目标</h5>\n<p>CLIP 的训练目标基于 <strong>InfoNCE 损失</strong>（也称 multi-class N-pair loss）。给定一个 batch 中的 <span class=\"kb-math kb-math-inline\">N</span> 个图文对：</p>\n<ol>\n<li><strong>编码</strong>：图像编码器和文本编码器分别将图像和文本映射为特征向量</li>\n<li><strong>投影</strong>：通过线性投影层将两种特征映射到同一维度的共享嵌入空间，并进行 L2 归一化</li>\n<li><strong>相似度计算</strong>：计算所有 <span class=\"kb-math kb-math-inline\">N \\times N</span> 个图文对的余弦相似度，乘以可学习温度参数 <span class=\"kb-math kb-math-inline\">\\exp(\\tau)</span></li>\n<li><strong>损失计算</strong>：将相似度矩阵视为两个方向的分类问题——每张图像需要从 <span class=\"kb-math kb-math-inline\">N</span> 个文本中找到匹配的那个（反之亦然），使用对称交叉熵损失</li>\n</ol>\n<div class=\"kb-math kb-math-display\">\\mathcal{L} = \\frac{1}{2}\\left[\\frac{1}{N}\\sum_{i=1}^{N} -\\log \\frac{\\exp(\\text{sim}(I_i, T_i)/\\tau)}{\\sum_{j=1}^{N}\\exp(\\text{sim}(I_i, T_j)/\\tau)} + \\frac{1}{N}\\sum_{i=1}^{N} -\\log \\frac{\\exp(\\text{sim}(I_i, T_i)/\\tau)}{\\sum_{j=1}^{N}\\exp(\\text{sim}(I_j, T_i)/\\tau)}\\right]</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\text{sim}(I, T)</span> 为图像嵌入与文本嵌入的余弦相似度。</p>\n<div class=\"warn-box\">⚠️ 注意：作者发现对比目标比生成式目标（预测文本的精确词语）在零样本迁移效率上高出 <strong>4 倍</strong>。这是因为对比目标只需判断\"哪个文本与图像匹配\"，而非重建文本的每个词，大幅降低了学习难度。</div>\n<h5>模型架构</h5>\n<p><strong>图像编码器</strong>提供两种选择：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>架构</th>\n<th>特点</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><strong>ResNet 系列</strong></td>\n<td>基于 ResNet-50，采用 ResNet-D 改进、抗锯齿 rect-2 模糊池化、注意力池化（替代全局平均池化，使用单层 Transformer 风格 QKV 注意力）</td>\n</tr>\n<tr>\n<td><strong>ViT 系列</strong></td>\n<td>基于 Vision Transformer，添加额外的 LayerNorm 到 patch + position embedding 之前</td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>文本编码器</strong>为 Transformer：\n- 基础规模：63M 参数，12 层，512 宽度，8 个注意力头\n- BPE 分词，词表大小 49,152，最大序列长度 76\n- 使用 <code>[SOS]</code> 和 <code>[EOS]</code> 标记，取 <code>[EOS]</code> 位置的最高层激活作为文本表示\n- 使用掩码自注意力（causal mask），保留初始化为预训练语言模型的可能性</p>\n<p>两个编码器的输出分别通过<strong>线性投影</strong>（非非线性投影）映射到共享嵌入空间。作者发现线性投影与非线性投影在训练效率上无显著差异。</p>\n<h5>训练流程</h5>\n<ul>\n<li><strong>数据</strong>：WIT 数据集，4 亿图文对，从互联网公开来源收集，每个查询最多 20,000 对，总词数与 GPT-2 的 WebText 数据集相当</li>\n<li><strong>优化器</strong>：Adam + 解耦权重衰减（AdamW），余弦学习率调度</li>\n<li><strong>Batch 大小</strong>：32,768（极大 batch 对对比学习至关重要，提供更多负样本）</li>\n<li><strong>训练轮数</strong>：32 epochs</li>\n<li><strong>温度参数</strong>：<span class=\"kb-math kb-math-inline\">\\tau</span> 初始化为 0.07，训练中可学习，裁剪防止 logits 缩放超过 100</li>\n<li><strong>工程优化</strong>：混合精度训练、梯度检查点、半精度 Adam 统计量、嵌入相似度分片计算</li>\n<li><strong>训练成本</strong>：最大 ResNet（RN50x64）在 592 块 V100 上训练 18 天；最大 ViT（ViT-L/14）在 256 块 V100 上训练 12 天</li>\n</ul>\n<h5>零样本推理机制</h5>\n<p>CLIP 的零样本分类流程如下：</p>\n<ol>\n<li><strong>构造文本分类器</strong>：对目标数据集的每个类别名称，用 prompt 模板（如 <code>\"A photo of a {class}\"</code>）生成文本描述，通过文本编码器得到类别嵌入向量</li>\n<li><strong>图像编码</strong>：将待分类图像通过图像编码器得到图像嵌入</li>\n<li><strong>匹配预测</strong>：计算图像嵌入与所有类别文本嵌入的余弦相似度，选择最高相似度的类别</li>\n</ol>\n<div class=\"key-point\">💡 关键：这一机制将分类问题转化为图文匹配问题，类别集合完全由自然语言定义，因此可以在不重新训练的情况下迁移到任意分类任务。</div>\n<p><strong>Prompt 工程</strong>显著影响性能。作者发现：\n- 仅使用类别名（如 \"dog\"）存在歧义（多义词问题）和分布偏移（训练时文本是完整句子）\n- 使用 <code>\"A photo of a {class}\"</code> 等模板可提供上下文，提升约 1.3 个百分点\n- 针对不同数据集定制模板（如卫星图用 <code>\"a satellite photo of a {class}\"</code>）\n- 对多个模板的预测进行集成（ensemble），总计提升约 <strong>5 个百分点</strong></p>\n<h5>与传统方法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th>传统监督学习</th>\n<th>CLIP</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>监督信号</td>\n<td>人工标注的类别标签</td>\n<td>互联网图文对中的自然语言</td>\n</tr>\n<tr>\n<td>类别集合</td>\n<td>固定（如 ImageNet 1000 类）</td>\n<td>开放，由自然语言定义</td>\n</tr>\n<tr>\n<td>迁移能力</td>\n<td>需要微调或线性探测</td>\n<td>零样本直接迁移</td>\n</tr>\n<tr>\n<td>数据规模</td>\n<td>ImageNet 128 万张</td>\n<td>WIT 4 亿图文对</td>\n</tr>\n<tr>\n<td>泛化性</td>\n<td>受限于训练类别分布</td>\n<td>跨 30+ 数据集广泛泛化</td>\n</tr>\n</tbody>\n</table></div>\n<p>CLIP 在 ImageNet 上零样本达到 76.2% top-1 准确率，匹配原始 ResNet-50 的监督学习性能，且在 27 个评估数据集上零样本性能与全监督线性探测基线竞争力相当。</p>",
      "quiz": {
        "q": "CLIP 在预训练时为什么选择对比学习目标而非生成式（预测文本词语）目标？",
        "options": [
          "对比目标的模型参数更少，节省显存",
          "对比目标只需判断图文是否匹配，比预测精确词语更高效，零样本迁移速度提升 4 倍",
          "生成式目标无法处理图像输入",
          "对比目标不需要文本编码器"
        ],
        "answer": 1,
        "explain": "作者实验发现，对比目标将任务从预测精确词语简化为判断图文配对关系，在零样本迁移到 ImageNet 的效率上比生成式基线提升了 4 倍。"
      }
    },
    {
      "id": "dino",
      "num": 5,
      "name": "DINO",
      "fullName": "无标签自蒸馏 (Self-Distillation with No Labels)",
      "year": "2021.04",
      "org": "Meta AI",
      "parent": "vit",
      "paperUrl": "https://openaccess.thecvf.com/content/ICCV2021/html/Caron_Emerging_Properties_in_Self-Supervised_Vision_Transformers_ICCV_2021_paper",
      "projectUrl": "",
      "category": "representation",
      "motivation": "自蒸馏涌现语义分割",
      "summary": "DINO 提出了一种基于自蒸馏（self-distillation）的自监督训练框架，通过 student-teacher 架构与动量更新机制训练 Vision Transformer，发现 ViT 的自注意力图能自动涌现出显式的语义分割能力，并在 ImageNet 线性评估上以 ViT-Base 达到 80.1% top-1 准确率。",
      "keyPoints": [
        "<strong>自蒸馏框架</strong>：Student 网络和 Teacher 网络共享相同架构，Teacher 通过指数移动平均（EMA）更新，无需标签",
        "<strong>Multi-crop 数据增强</strong>：Student 接收全局视图和局部视图，Teacher 仅接收全局视图，鼓励 \"local-to-global\" 对应学习",
        "<strong>防止模式坍塌</strong>：结合 Centering（减去 teacher 输出的指数移动均值）和 Sharpening（低温度 softmax）两种机制，无需对比负样本",
        "<strong>涌现语义分割</strong>：ViT 的 [CLS] token 自注意力图自动学习到类别特定的语义分割，无需任何像素级标注",
        "<strong>k-NN 分类器友好</strong>：学到的特征在 k-NN 评估中表现优异，无需任何微调即可达到接近线性探针的性能",
        "<strong>多任务迁移能力</strong>：在图像检索（Oxford/Paris）、拷贝检测（Copydays）、视频目标分割（DAVIS 2017）等下游任务上均表现出色"
      ],
      "detail": "<h5>核心框架示意图</h5>\n<p><img alt=\"DINO 自蒸馏框架\" src=\"https://ar5iv.labs.arxiv.org/html/2104.14294/assets/x1.png\" />\n<em>图：DINO 自蒸馏训练框架。输入图像经过不同增强生成多个视图，Student 和 Teacher 共享架构但参数不同，Teacher 通过 EMA 更新。两者输出经过 softmax 归一化后计算交叉熵损失。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># DINO PyTorch 伪代码（简化版，不含 multi-crop）\n# gs, gt: student 和 teacher 网络\n# C: centering 变量\n# tps, tpt: student 和 teacher 温度\n# l, m: 网络更新率和 EMA 动量\n\ngt.params = gs.params  # 初始化 teacher = student\nfor x in loader:  # 加载一个 mini-batch x\n    x1, x2 = augment(x), augment(x)  # 随机增强生成两个视图\n\n    # Student 和 Teacher 前向传播\n    s1, s2 = gs(x1), gs(x2)\n    t1, t2 = gt(x1), gt(x2)\n\n    # 计算损失：交叉熵 H(teacher, student)\n    loss = H(t1, s2) / 2 + H(t2, s1) / 2\n\n    loss.backward()         # 反向传播更新 student\n    update(gs)              # SGD 更新 student 参数\n\n    # EMA 更新 teacher\n    gt.params = m * gt.params + (1 - m) * gs.params\n\n    # 更新 center\n    C = m * C + (1 - m) * cat([t1, t2]).mean(dim=0)\n\ndef H(t, s):\n    &quot;&quot;&quot;交叉熵损失，含 centering 和 sharpening&quot;&quot;&quot;\n    t = softmax((t - C) / tpt, dim=-1)  # teacher: centering + sharpening\n    s = softmax(s / tps, dim=-1)         # student: 普通 softmax\n    return - (t * log(s)).sum(dim=-1).mean()\n</code></pre>\n<h5>动机与背景</h5>\n<p>自监督学习（Self-Supervised Learning, SSL）在 NLP 领域取得了巨大成功（如 BERT、GPT），但在计算机视觉中，SSL 方法主要依赖 CNN 架构（如 MoCo、SimCLR、BYOL、SwAV）。这些方法通常需要对比学习中的负样本、大 batch size 或特殊的归一化技巧来避免表征坍塌（representation collapse）。</p>\n<p>DINO 的核心问题是：<strong>能否设计一种简单的自监督框架，使 Vision Transformer 学到具有涌现语义理解能力的特征？</strong> 作者发现，当将自蒸馏（self-distillation）与 ViT 结合时，模型的自注意力图会自动涌现出语义分割能力——这一特性在 CNN 或监督训练的 ViT 中均不明显。</p>\n<h5>核心机制详解</h5>\n<p><strong>1. Student-Teacher 自蒸馏架构</strong></p>\n<p>DINO 的核心思想来源于知识蒸馏，但与传统蒸馏不同的是，Student 和 Teacher 使用<strong>完全相同的网络架构</strong>（ViT 或 ResNet），且 Teacher 不需要预训练——它通过 Student 的指数移动平均（EMA）动态构建：</p>\n<div class=\"kb-math kb-math-display\">\\theta_t \\leftarrow \\lambda \\theta_t + (1 - \\lambda) \\theta_s</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\theta_t</span> 和 <span class=\"kb-math kb-math-inline\">\\theta_s</span> 分别是 Teacher 和 Student 的参数，<span class=\"kb-math kb-math-inline\">\\lambda</span> 是动量系数。训练过程中 <span class=\"kb-math kb-math-inline\">\\lambda</span> 从 0.996 按余弦调度逐渐增大到 1，使 Teacher 在训练后期更加稳定。</p>\n<div class=\"key-point\">💡 关键：EMA Teacher 相当于 Student 历史参数的集成（ensemble），提供了比 Student 更平滑、更稳定的目标分布，这是 DINO 成功的核心因素之一。</div>\n<p><strong>2. Multi-crop 增强策略</strong></p>\n<p>输入图像被增强为两种类型的视图：\n- <strong>全局视图（global views）</strong>：覆盖图像 50% 以上区域，分辨率 224×224，共 2 个\n- <strong>局部视图（local views）</strong>：覆盖图像不到 50% 区域，分辨率 96×96，共若干个（默认 6 个）</p>\n<p>Teacher 仅处理全局视图，而 Student 处理所有视图（包括局部视图）。这种不对称设计鼓励 Student 从局部信息推断全局语义（\"local-to-global\" 对应），显著提升了特征质量。</p>\n<p><strong>3. 避免模式坍塌：Centering + Sharpening</strong></p>\n<p>自蒸馏框架面临的最大挑战是模式坍塌——Teacher 和 Student 可能收敛到输出常数向量的平凡解。DINO 通过两个互补机制解决这一问题：</p>\n<ul>\n<li><strong>Centering</strong>：维护 Teacher 输出的指数移动均值 <span class=\"kb-math kb-math-inline\">\\mathbf{c}</span>，并在 softmax 之前减去它：</li>\n</ul>\n<div class=\"kb-math kb-math-display\">P_t(x)^{(i)} = \\frac{\\exp(g_t(x)^{(i)} - c^{(i)}) / \\tau_t}{\\sum_k \\exp(g_t(x)^{(k)} - c^{(k)}) / \\tau_t}</div>\n<p>Centering 防止某一维度主导输出，但单独使用会鼓励均匀分布（另一种坍塌形式）。</p>\n<ul>\n<li><strong>Sharpening</strong>：使用较低的 Teacher 温度 <span class=\"kb-math kb-math-inline\">\\tau_t</span>（如 0.04，远低于 Student 温度 <span class=\"kb-math kb-math-inline\">\\tau_s = 0.1</span>），使 Teacher 输出更加尖锐（peaked），避免均匀分布坍塌。</li>\n</ul>\n<div class=\"warn-box\">⚠️ 注意：Centering 和 Sharpening 必须同时使用才能有效防止坍塌。Centering 防止单一维度坍塌，Sharpening 防止均匀分布坍塌，二者形成互补。</div>\n<p><strong>4. 投影头设计</strong></p>\n<p>网络的输出经过一个 3 层 MLP 投影头（隐藏层维度 2048），最后接一个 <span class=\"kb-math kb-math-inline\">\\ell_2</span> 归一化层和一个权重归一化的全连接层，输出 <span class=\"kb-math kb-math-inline\">K</span> 维向量（默认 <span class=\"kb-math kb-math-inline\">K = 65536</span>）。值得注意的是，DINO <strong>不使用 Batch Normalization</strong>，这与 BYOL 等方法形成对比——BYOL 依赖 BN 来隐式传递 batch 统计信息以避免坍塌，而 DINO 通过 centering + sharpening 显式解决了这一问题。</p>\n<h5>与传统方法的关键区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>DINO</th>\n<th>MoCo-v2</th>\n<th>BYOL</th>\n<th>SwAV</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>负样本</td>\n<td>✗ 不需要</td>\n<td>✓ 需要</td>\n<td>✗ 不需要</td>\n<td>✗ 不需要</td>\n</tr>\n<tr>\n<td>动量编码器</td>\n<td>✓ EMA Teacher</td>\n<td>✓ 动量编码器</td>\n<td>✓ 动量编码器</td>\n<td>✗ 无</td>\n</tr>\n<tr>\n<td>Multi-crop</td>\n<td>✓</td>\n<td>✗</td>\n<td>✗</td>\n<td>✓</td>\n</tr>\n<tr>\n<td>损失函数</td>\n<td>交叉熵</td>\n<td>InfoNCE</td>\n<td>MSE</td>\n<td>交叉熵+SK</td>\n</tr>\n<tr>\n<td>Predictor</td>\n<td>✗ 不需要</td>\n<td>✗</td>\n<td>✓ 必需</td>\n<td>✗</td>\n</tr>\n<tr>\n<td>BN 依赖</td>\n<td>✗ 无</td>\n<td>✓ 有</td>\n<td>✓ 关键</td>\n<td>✓ 有</td>\n</tr>\n</tbody>\n</table></div>\n<p>消融实验（Table 7）表明：\n- 去掉动量编码器后模型完全坍塌（k-NN 准确率降至 0.1%）\n- Multi-crop 贡献约 +5% k-NN 准确率（72.8% vs 67.9%）\n- 交叉熵损失远优于 MSE 损失（72.8% vs 52.6%）\n- 添加 Predictor 对 DINO 几乎无影响（72.8% vs 71.8%），但对 BYOL 是必需的</p>\n<h5>涌现的语义分割能力</h5>\n<p>DINO 最引人注目的发现是：用 ViT-S/8 训练后，最后一层 [CLS] token 的多头自注意力图自动涌现出<strong>类别特定的语义分割</strong>。不同的注意力头关注物体的不同语义部分（如头部、腿部、背景），且这种能力在监督训练的 ViT 或使用 CNN 的自监督方法中均不明显。这一特性使 DINO 特征在 DAVIS 2017 视频目标分割任务上无需任何微调即可取得优异性能。</p>",
      "quiz": {
        "q": "DINO 中 Teacher 网络的参数更新方式是什么？",
        "options": [
          "通过反向传播梯度直接更新",
          "通过 Student 参数的指数移动平均（EMA）更新",
          "使用预训练的固定参数，不进行更新",
          "通过 Sinkhorn-Knopp 算法迭代优化"
        ],
        "answer": 1,
        "explain": "DINO 的 Teacher 通过 EMA 更新：θ_t ← λθ_t + (1-λ)θ_s，不接收梯度，相当于 Student 历史参数的集成，提供更稳定的学习目标。"
      }
    },
    {
      "id": "beit",
      "num": 6,
      "name": "BEiT",
      "fullName": "BERT式图像Transformer预训练 (BERT Pre-Training of Image Transformers)",
      "year": "2021.06",
      "org": "Microsoft Research",
      "parent": "vit",
      "paperUrl": "https://arxiv.org/abs/2106.08254",
      "projectUrl": "",
      "category": "representation",
      "motivation": "首创掩码图像建模",
      "summary": "BEiT 首次把 BERT 式掩码建模系统性迁移到视觉预训练中，用离散 visual token 作为预测目标而不是直接回归像素，从而显著提升了 ViT 的自监督表征质量。",
      "keyPoints": [
        "提出 Masked Image Modeling，把图像 patch 的恢复任务改写成离散 token 分类任务。",
        "引入双视图：patch 序列作为 Transformer 输入，dVAE 生成的 visual token 作为监督信号。",
        "使用 block-wise masking，而不是独立随机 mask，迫使模型利用更大范围上下文推断语义。",
        "采用 DALL-E 风格 dVAE 作为图像 tokenizer，词表大小为 8192。",
        "在 ImageNet 分类和 ADE20K 分割上优于 DeiT、DINO、MoCo v3 等同时代方法。"
      ],
      "detail": "<p><img alt=\"BEiT 预训练流程图\" src=\"https://ar5iv.labs.arxiv.org/html/2106.08254/assets/x1.png\" />\n<em>图：BEiT 将图像同时表示为 patch 序列和离散 visual token，模型输入被遮挡后的 patch，目标则是预测原图对应位置的 token。</em></p>\n<pre><code class=\"language-python\"># BEiT 预训练伪代码\nimage = load_image()\npatches = patch_embed(image)                     # Transformer 输入\ntokens = dvae_tokenizer(image)                   # 离散监督目标\nmasked_patches, mask_idx = blockwise_mask(patches, ratio=0.4)\nhidden = vit_encoder(masked_patches)\nlogits = classifier(hidden[mask_idx])\nloss = cross_entropy(logits, tokens[mask_idx])\nloss.backward()\noptimizer.step()\n</code></pre>\n<p>BEiT 的出发点很直接：直接预测像素值虽然也能形成重建任务，但模型往往更容易学到局部纹理和颜色连续性，而不一定真正掌握高层语义。论文因此把监督目标切换成 dVAE 生成的离散 visual token，相当于先用 tokenizer 把图像压缩成“视觉词汇”，再让 ViT 去做类似 BERT 的分类恢复。</p>\n<p>这一设计的关键在于“输入视图”和“目标视图”分离。输入端仍然是标准 patch embedding，因此编码器结构和 ViT 完全兼容；目标端则是 dVAE 产生的离散 token。这样模型既能复用成熟的 Transformer 架构，又能避免像素重建带来的低层细节偏置。预训练目标可以写成：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{MIM}} =\n\\sum_{i \\in \\mathcal{M}}\n-\\log p_\\theta(z_i \\mid x^\\mathcal{M})</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\mathcal{M}</span> 是被遮挡位置集合，<span class=\"kb-math kb-math-inline\">z_i</span> 是对应的 visual token，<span class=\"kb-math kb-math-inline\">x^\\mathcal{M}</span> 是 mask 后的输入图像。直观上，模型必须根据周围上下文判断“这里最可能是什么语义单元”，而不是做逐像素插值。</p>\n<p>BEiT 还特别强调 block-wise masking。原因是视觉 patch 之间局部相关性极强，如果只随机遮掉零散 patch，模型可以凭附近纹理轻松补全，任务难度偏低。将掩码做成连续块状区域后，模型必须利用更远距离的语义线索，比如“这里应当是狗的头部”而不是“这里颜色与周围相近”。这也是后来大量 MIM 工作沿用区域化 masking 的原因。</p>\n<p>从结果看，BEiT 证明了“预测离散语义 token”是一条有效路线，也直接催生了后续 MAE、EVA 等视觉预训练分支。它的重要性不只在于性能提升，更在于给视觉自监督预训练提供了一个与 NLP MLM 对齐的统一范式。</p>",
      "quiz": {
        "q": "BEiT 相比直接重建像素，为什么改为预测离散 visual token？",
        "options": [
          "为了减小 patch 数量，降低输入分辨率",
          "为了把恢复任务转成更偏语义的分类任务，避免模型只学习低层纹理",
          "为了让 Transformer 可以使用卷积解码器",
          "为了彻底去掉位置编码"
        ],
        "answer": 1,
        "explain": "BEiT 的核心思想是用 dVAE 生成的离散 token 作为监督目标，让模型恢复高层语义单元，而不是只做像素级纹理补全。"
      }
    },
    {
      "id": "mae",
      "num": 7,
      "name": "MAE",
      "fullName": "掩码自编码器 (Masked Autoencoders)",
      "year": "2021.11",
      "org": "Meta AI",
      "parent": "beit",
      "paperUrl": "https://openaccess.thecvf.com/content/CVPR2022/html/He_Masked_Autoencoders_Are_Scalable_Vision_Learners_CVPR_2022_paper",
      "projectUrl": "",
      "category": "representation",
      "motivation": "75%掩码率极简高效",
      "summary": "MAE 提出了一种非对称编码器-解码器架构的掩码自编码方法，通过随机掩盖 75% 的图像 patch 并重建像素值来进行自监督预训练，在大幅降低计算成本（3× 以上加速）的同时使 ViT 在 ImageNet-1K 上达到 87.8% 的最优精度，并在下游任务中展现出优异的迁移能力。",
      "keyPoints": [
        "<strong>非对称编码器-解码器架构</strong>：编码器仅处理可见 patch（约 25%），解码器轻量化（计算量不到编码器的 10%），大幅减少预训练计算量",
        "<strong>极高掩码率（75%）</strong>：远高于 BERT 的 15% 和视觉领域此前的 20%–50%，消除图像空间冗余，迫使模型学习全局语义理解",
        "<strong>像素级重建目标</strong>：直接预测被掩盖 patch 的像素值（MSE 损失），无需额外的离散 tokenizer（如 BEiT 的 dVAE），更简单高效",
        "<strong>仅在掩码 patch 上计算损失</strong>：类似 BERT，不对可见 patch 计算重建损失",
        "<strong>归一化像素作为重建目标</strong>：对每个 patch 内像素做归一化后作为目标可进一步提升表征质量",
        "<strong>Shuffle/Unshuffle 实现</strong>：无需稀疏操作，通过随机打乱 + 截断 + 恢复顺序实现高效掩码，引入的额外开销可忽略",
        "<strong>强大的可扩展性</strong>：ViT-H/14 在仅使用 ImageNet-1K 数据下达到 87.8% top-1 精度；COCO 检测 53.3 AP<span class=\"kb-math kb-math-inline\">^{\\text{box}}</span>，ADE20K 语义分割 53.6 mIoU"
      ],
      "detail": "<h5>核心架构示意图</h5>\n<p><img alt=\"MAE 架构示意图\" src=\"https://ar5iv.labs.arxiv.org/html/2111.06377/assets/x1.png\" />\n<em>图：MAE 预训练架构。输入图像被划分为 patch 后随机掩盖 75%，编码器仅处理可见 patch，解码器接收编码表示与 mask token 后重建完整图像。预训练完成后丢弃解码器，编码器用于下游任务。</em></p>\n<p><img alt=\"MAE 重建示例\" src=\"https://ar5iv.labs.arxiv.org/html/2111.06377/assets/x2.png\" />\n<em>图：ImageNet 验证集上的重建示例。每组三张图分别为掩码图像（左）、MAE 重建结果（中）、原始图像（右），掩码率 80%。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># MAE 预训练伪代码\ndef mae_pretrain_step(image, encoder, decoder, mask_ratio=0.75):\n    # 1. Patch 嵌入\n    patches = patchify(image)                    # [N, patch_dim]\n    tokens = linear_embed(patches) + pos_embed   # [N, D]\n\n    # 2. 随机掩码（Shuffle + 截断）\n    shuffled_indices = random_permutation(N)\n    num_visible = int(N * (1 - mask_ratio))      # e.g., 49 out of 196\n    visible_tokens = tokens[shuffled_indices[:num_visible]]   # [num_visible, D]\n\n    # 3. 编码（仅处理可见 patch）\n    latent = encoder(visible_tokens)             # [num_visible, D_enc]\n\n    # 4. 拼接 mask token 并恢复顺序（Unshuffle）\n    mask_tokens = repeat(learnable_mask_token, N - num_visible)\n    full_tokens = concat(latent, mask_tokens)    # [N, D_dec]\n    full_tokens = unshuffle(full_tokens, shuffled_indices)\n    full_tokens = full_tokens + decoder_pos_embed\n\n    # 5. 解码\n    reconstructed = decoder(full_tokens)         # [N, patch_pixel_dim]\n\n    # 6. 仅在掩码位置计算 MSE 损失\n    loss = MSE(reconstructed[masked_indices], target_pixels[masked_indices])\n    return loss\n</code></pre>\n<h5>动机与背景</h5>\n<p><strong>NLP 中掩码自编码的成功与视觉领域的差距。</strong> BERT 通过掩盖 15% 的 token 并预测被掩盖内容，在 NLP 领域取得了巨大成功。然而，将这一范式迁移到计算机视觉面临三个核心挑战：</p>\n<ol>\n<li>\n<p><strong>架构差异</strong>：此前视觉领域以 CNN 为主导，卷积操作在规则网格上运行，难以自然地引入 mask token 和位置编码等\"指示符\"。ViT 的出现消除了这一障碍。</p>\n</li>\n<li>\n<p><strong>信息密度差异</strong>：语言是高度语义化、信息密集的人工信号，掩盖少量词即可构成有意义的预测任务。图像则是自然信号，存在大量空间冗余——缺失的 patch 往往可以通过邻近 patch 简单插值恢复，无需高层语义理解。因此需要<strong>极高的掩码率</strong>来消除冗余，迫使模型进行全局推理。</p>\n</li>\n<li>\n<p><strong>解码器角色差异</strong>：在 NLP 中解码器预测的是富含语义的词，因此 BERT 的解码器可以很简单（一个 MLP）。而在视觉中解码器重建的是像素——语义层级较低——因此解码器的设计对学到的表征质量至关重要。</p>\n</li>\n</ol>\n<div class=\"key-point\">💡 关键洞察：图像的空间冗余是视觉掩码自编码与 NLP 的根本差异。MAE 通过极高掩码率（75%）将\"简单的插值任务\"转化为\"需要全局语义理解的困难任务\"。</div>\n<h5>核心机制详解</h5>\n<p><strong>1. 非对称编码器-解码器设计</strong></p>\n<p>MAE 的核心创新在于编码器和解码器的<strong>非对称</strong>设计：</p>\n<ul>\n<li>\n<p><strong>编码器</strong>：标准 ViT，但仅接收<strong>可见 patch</strong>（约 25%）的 token 序列。被掩盖的 patch 完全不参与编码器计算——不使用 mask token 占位。这意味着编码器的计算量仅为处理全部 patch 的 <span class=\"kb-math kb-math-inline\">\\sim</span>25%，带来巨大的效率提升。</p>\n</li>\n<li>\n<p><strong>解码器</strong>：轻量级 Transformer，接收编码器输出的可见 patch 表示 + 可学习的 mask token（共享参数），加上位置编码后处理完整的 token 序列。默认配置为 8 层、宽度 512，计算量不到编码器每 token 计算量的 10%。</p>\n</li>\n</ul>\n<div class=\"kb-math kb-math-display\">\\text{Encoder input: } \\{x_i + e_i \\mid i \\in \\mathcal{V}\\}, \\quad |\\mathcal{V}| \\approx 0.25N</div>\n<div class=\"kb-math kb-math-display\">\\text{Decoder input: } \\{z_i + d_i \\mid i \\in \\mathcal{V}\\} \\cup \\{m + d_j \\mid j \\in \\mathcal{M}\\}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">x_i</span> 为 patch 嵌入，<span class=\"kb-math kb-math-inline\">e_i, d_i</span> 为位置编码，<span class=\"kb-math kb-math-inline\">z_i</span> 为编码器输出，<span class=\"kb-math kb-math-inline\">m</span> 为共享的 mask token，<span class=\"kb-math kb-math-inline\">\\mathcal{V}, \\mathcal{M}</span> 分别为可见和掩码 patch 集合。</p>\n<div class=\"warn-box\">⚠️ 注意：将 mask token 从编码器移到解码器是效率的关键。如果编码器也处理 mask token（如 BEiT），计算量增加 3.3×，且精度反而下降（fine-tuning 84.2% vs 84.9%）。</div>\n<p><strong>2. 高掩码率策略</strong></p>\n<p>消融实验表明，75% 的掩码率在 fine-tuning 和 linear probing 两种评估协议下均为最优。这一比例远高于：\n- BERT 的 15%（NLP）\n- iGPT 的 50%、BEiT 的 40%（视觉）</p>\n<p>过低的掩码率（如 50%）使任务过于简单，模型可通过局部插值完成重建而无需学习语义；过高的掩码率（如 95%）则信息过少导致任务过难。75% 恰好在\"足够困难以学习语义\"和\"足够可行以收敛\"之间取得平衡。</p>\n<p><strong>3. 重建目标：像素 vs Token</strong></p>\n<p>MAE 直接以<strong>像素值</strong>作为重建目标，使用 MSE 损失：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L} = \\frac{1}{|\\mathcal{M}|} \\sum_{j \\in \\mathcal{M}} \\| \\hat{x}_j - x_j \\|_2^2</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\hat{x}_j</span> 为解码器对第 <span class=\"kb-math kb-math-inline\">j</span> 个掩码 patch 的预测像素值，<span class=\"kb-math kb-math-inline\">x_j</span> 为真实像素值。</p>\n<p>进一步地，对每个 patch 内的像素进行<strong>归一化</strong>（减均值除标准差）后作为目标，可提升表征质量（fine-tuning 85.4% vs 84.9%）。这种 per-patch 归一化鼓励模型关注局部对比和纹理结构，而非绝对亮度。</p>\n<p>与 BEiT 使用 dVAE token 作为目标相比，MAE 的像素级目标更简单（无需预训练 tokenizer），且精度相当甚至更优。</p>\n<p><strong>4. 高效实现：Shuffle/Unshuffle</strong></p>\n<p>MAE 的实现极为简洁，无需稀疏操作：</p>\n<ol>\n<li>对所有 patch token 进行<strong>随机打乱</strong>（shuffle）</li>\n<li><strong>截取前 25%</strong> 作为可见 token 送入编码器</li>\n<li>编码后，将编码输出与 mask token 拼接，<strong>恢复原始顺序</strong>（unshuffle）</li>\n<li>送入解码器</li>\n</ol>\n<p>这种实现等价于无放回均匀随机采样，且 shuffle/unshuffle 操作的计算开销可忽略不计。</p>\n<h5>与 BEiT 的关键区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th>MAE</th>\n<th>BEiT</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>重建目标</td>\n<td>像素值（MSE）</td>\n<td>dVAE 离散 token（交叉熵）</td>\n</tr>\n<tr>\n<td>编码器输入</td>\n<td>仅可见 patch</td>\n<td>全部 patch（含 mask token）</td>\n</tr>\n<tr>\n<td>掩码率</td>\n<td>75%</td>\n<td>40%</td>\n</tr>\n<tr>\n<td>额外依赖</td>\n<td>无</td>\n<td>需预训练 dVAE tokenizer</td>\n</tr>\n<tr>\n<td>训练速度</td>\n<td>3.5× 更快（每 epoch）</td>\n<td>基准</td>\n</tr>\n<tr>\n<td>ViT-L fine-tune</td>\n<td>85.9% → 86.9%（ViT-H）</td>\n<td>85.2%</td>\n</tr>\n</tbody>\n</table></div>\n<h5>主要实验结果</h5>\n<p><strong>ImageNet-1K 分类：</strong>\n- ViT-B：83.6%（fine-tune）\n- ViT-L：85.9%（fine-tune）\n- ViT-H (224)：86.9%（fine-tune）\n- ViT-H (448)：<strong>87.8%</strong>（仅用 IN1K 数据的 SOTA）</p>\n<p><strong>下游迁移任务（ViT-L）：</strong>\n- COCO 目标检测：53.3 AP<span class=\"kb-math kb-math-inline\">^{\\text{box}}</span>（超越监督预训练 4.0 点）\n- COCO 实例分割：47.2 AP<span class=\"kb-math kb-math-inline\">^{\\text{mask}}</span>\n- ADE20K 语义分割：53.6 mIoU（超越监督预训练 3.7 点）</p>\n<p><strong>训练效率：</strong> ViT-L 在 128 TPU-v3 上预训练 1600 epochs 仅需 31 小时，而 MoCo v3 训练 300 epochs 需 36 小时。</p>\n<div class=\"key-point\">💡 关键发现：MAE 的线性探测（linear probing）精度与 fine-tuning 精度<strong>不相关</strong>。MAE 的线性探测精度低于对比学习方法（如 MoCo v3），但只要 fine-tune 1 个 Transformer block，精度就从 73.5% 跃升至 81.0%，说明 MAE 学到的是强大但非线性的特征表示。</div>",
      "quiz": {
        "q": "MAE 将 mask token 从编码器移到解码器的主要好处是什么？",
        "options": [
          "提升重建图像的视觉质量",
          "使编码器仅处理约 25% 的 token，大幅减少预训练计算量",
          "让解码器能学到更好的位置编码",
          "避免编码器过拟合到掩码模式"
        ],
        "answer": 1,
        "explain": "编码器不处理 mask token 意味着其输入序列长度仅为全部 patch 的约 25%，Transformer 的计算量与序列长度平方成正比，因此计算量大幅降低（约 3× 以上加速），这是 MAE 高效训练的核心设计。"
      }
    },
    {
      "id": "convnext",
      "num": 8,
      "name": "ConvNeXt",
      "fullName": "2020年代的卷积网络 (A ConvNet for the 2020s)",
      "year": "2022.01",
      "org": "Meta AI",
      "parent": "swin",
      "paperUrl": "https://openaccess.thecvf.com/content/CVPR2022/html/Liu_A_ConvNet_for_the_2020s_CVPR_2022_paper.html",
      "projectUrl": "",
      "category": "foundation",
      "motivation": "现代化CNN媲美Transformer",
      "summary": "ConvNeXt 通过系统吸收 Transformer 时代的训练配方和结构设计，把 ResNet 逐步现代化为更强的纯卷积骨干，证明精心设计的 CNN 仍然能在分类、检测和分割上与 Swin Transformer 正面竞争。",
      "keyPoints": [
        "从 ResNet-50 出发，逐步替换训练策略、stem、深度卷积、大核、归一化和下采样设计。",
        "用 4×4 patchify stem 和独立下采样层，把卷积网络的宏观结构对齐到 Swin 风格。",
        "用 7×7 depthwise convolution、反转瓶颈、GELU 和 LayerNorm 重写 block。",
        "强调性能差距很大一部分来自训练 recipe，而不仅是注意力机制本身。",
        "在 ImageNet、COCO、ADE20K 上达到与 Swin 同级甚至更好的结果。"
      ],
      "detail": "<p><img alt=\"ConvNeXt 现代化路线图\" src=\"https://ar5iv.labs.arxiv.org/html/2201.03545/assets/x2.png\" />\n<em>图：论文把 ResNet 到 ConvNeXt 的改造拆解成一系列可独立消融的步骤。</em></p>\n<pre><code class=\"language-python\"># ConvNeXt block 伪代码\ndef convnext_block(x):\n    residual = x\n    x = depthwise_conv(x, kernel_size=7, padding=3)\n    x = layer_norm(x)\n    x = linear(x, 4 * dim)\n    x = gelu(x)\n    x = linear(x, dim)\n    return residual + x\n</code></pre>\n<p>ConvNeXt 的论文方法论很有代表性：作者没有从零发明一个新卷积架构，而是反过来问，“Transformer 时代到底哪些设计真正有效，这些设计是否也能迁移回 CNN？”因此它不是一次激进创新，而是一条清晰的现代化改造路线。</p>\n<p>第一类改造来自训练策略。仅仅把 ResNet-50 的训练 recipe 升级为 AdamW、300 epoch、Mixup、CutMix、RandAugment、label smoothing、stochastic depth 等 ViT/Swin 风格设置，性能就能明显上升。这说明早期“CNN 不如 Transformer”的一部分结论其实混杂了训练协议差异。</p>\n<p>第二类改造来自宏观结构。ConvNeXt 用 patchify stem 取代大卷积 + max-pooling 的传统开头，并把 stage 比例调整得更像 Swin，把更多计算量放到中间阶段。同时，阶段之间使用独立下采样层，而不是把降采样直接塞进残差块内部，使特征流更干净、更稳定。</p>\n<p>第三类改造落在 block 内部。ConvNeXt 使用 depthwise 大核卷积做空间混合，再用两层 <span class=\"kb-math kb-math-inline\">1\\times1</span> 线性层做通道混合，形式上已经很接近 Transformer 中“token mixing + channel MLP”的分工。论文特别把核扩大到 <span class=\"kb-math kb-math-inline\">7\\times7</span>，并采用反转瓶颈、GELU、LayerNorm，从而让卷积块既保留 CNN 的局部先验，又获得更大的感受野和更现代的优化行为。</p>\n<p>这篇论文最重要的结论不是“卷积比注意力更强”，而是“强视觉骨干的许多成功因素与是否使用注意力并不完全绑定”。ConvNeXt 因此成为后续大量 CNN 回潮工作的起点，也让“骨干网络设计”重新回到公平比较的语境中。</p>",
      "quiz": {
        "q": "ConvNeXt 的核心论点最准确的表述是哪一项？",
        "options": [
          "只要去掉所有归一化层，CNN 就会超过 Transformer",
          "Transformer 的优势很大程度上也来自训练 recipe 和若干可迁移的结构设计，而不只是注意力机制本身",
          "Depthwise 卷积可以完全等价替代自注意力",
          "ConvNeXt 证明了卷积网络不需要大规模数据"
        ],
        "answer": 1,
        "explain": "ConvNeXt 的方法是把 Transformer 时代被验证有效的设计逐步迁移回 CNN，说明性能差距并不只来自注意力本身。"
      }
    },
    {
      "id": "eva",
      "num": 9,
      "name": "EVA",
      "fullName": "探索视觉表征学习极限 (Exploring Visual Representation)",
      "year": "2022.11",
      "org": "智源研究院",
      "parent": "mae",
      "paperUrl": "https://arxiv.org/abs/2211.07636",
      "projectUrl": "",
      "category": "representation",
      "motivation": "重建CLIP特征引入语义",
      "summary": "EVA 提出以 CLIP 视觉特征（而非原始像素）作为掩码图像建模（MIM）的重建目标，成功将 vanilla ViT 扩展至 10 亿参数规模（ViT-g），在图像分类、目标检测、实例分割、语义分割和视频动作识别等多项下游任务上取得了全面领先的结果。",
      "keyPoints": [
        "<strong>架构</strong>：vanilla ViT-g，1.011B 参数（40 层，1408 隐藏维度，6144 MLP 维度，16 头），不引入任何视觉先验",
        "<strong>预训练任务</strong>：掩码图像建模（MIM），以冻结的 OpenAI CLIP-L/14 视觉编码器输出特征作为重建目标",
        "<strong>掩码策略</strong>：40% block-wise masking ratio，仅对被掩码 patch 的特征进行回归预测",
        "<strong>损失函数</strong>：负余弦相似度（negative cosine similarity），无需对 CLIP 特征进行 tokenization 或量化",
        "<strong>预训练数据</strong>：29.6M 公开图像（ImageNet-21K + CC12M + CC3M + Object365 + COCO + ADE20K）",
        "<strong>关键发现</strong>：直接回归 CLIP 特征优于 tokenize 后做分类，蒸馏（同时预测可见+掩码 patch）反而有害",
        "<strong>下游 SOTA</strong>：ImageNet-1K 89.7%、COCO 检测 64.7 AP<span class=\"kb-math kb-math-inline\">^{\\text{box}}</span>、LVIS 分割 55.0 AP<span class=\"kb-math kb-math-inline\">^{\\text{mask}}</span>、ADE20K 语义分割 62.3 mIoU、Kinetics-400/600/700 视频分类 89.7/89.8/82.9%",
        "<strong>EVA-CLIP</strong>：用 EVA 预训练权重初始化 1.1B CLIP 视觉塔，稳定大规模对比学习训练，以更少数据超越从头训练的 Open CLIP-H",
        "<strong>鲁棒性</strong>：ImageNet 与其分布偏移变体之间的性能差距仅 5.6，远优于此前方法"
      ],
      "detail": "<h5>框架总览</h5>\n<p><img alt=\"EVA 预训练与下游迁移流程\" src=\"https://raw.githubusercontent.com/baaivision/EVA/master/assets/eva_pipeline.png\" />\n<em>图：EVA 的整体流程。左侧为 MIM 预训练阶段（以 CLIP 特征为重建目标），右侧为在多种下游视觉任务上的迁移应用，最终还可用于初始化更大规模的 CLIP 模型。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># EVA 预训练核心流程伪代码\n# 输入: 图像数据集 D, 冻结的 CLIP 视觉编码器 f_clip\n# 输出: 预训练好的 ViT-g 编码器 f_eva\n\nf_clip = load_frozen_clip(&quot;CLIP-L/14&quot;)  # 冻结，不更新\nf_eva = ViT_g(layers=40, dim=1408, heads=16)  # 1.011B 参数\n\nfor epoch in range(150):\n    for images in DataLoader(D, batch_size=4096):\n        # Step 1: Block-wise masking (40% ratio)\n        visible_patches, masked_indices = block_mask(images, ratio=0.40)\n\n        # Step 2: EVA 编码器仅处理可见 patch\n        visible_features = f_eva.encode(visible_patches)\n\n        # Step 3: 轻量级解码器预测被掩码位置的特征\n        predicted_features = decoder(visible_features, masked_indices)\n\n        # Step 4: CLIP 提取完整图像的目标特征\n        with torch.no_grad():\n            target_features = f_clip.encode_patches(images)  # 所有 patch 的特征\n            target_masked = target_features[masked_indices]   # 仅取被掩码位置\n\n        # Step 5: 负余弦相似度损失（仅在 masked patches 上计算）\n        loss = -cosine_similarity(predicted_features, target_masked).mean()\n\n        optimizer.step(loss)\n</code></pre>\n<h5>动机与背景</h5>\n<p>掩码图像建模（MIM）借鉴了 NLP 中 BERT/GPT 的成功范式，通过\"遮住一部分、预测被遮部分\"来学习视觉表征。MAE 和 BEiT 等先驱工作已经证明了 MIM 的有效性，但存在两个核心问题：</p>\n<ol>\n<li><strong>重建目标缺乏语义</strong>：MAE 直接重建原始像素，学到的更多是低层纹理信息而非高层语义。BEiT 虽然用 dVAE token 作为目标，但 token 本身也缺乏显式的语义对齐。</li>\n<li><strong>模型规模受限</strong>：此前的 MIM 方法主要在 ViT-B/L/H（至多 630M 参数）上验证，尚未探索 10 亿参数级别的 scaling 行为。</li>\n</ol>\n<p>EVA 的核心洞察是：<strong>用 CLIP 的视觉特征作为 MIM 的重建目标，可以将图像-文本对齐的语义信息注入到纯视觉的自监督预训练中</strong>，同时这种方法在大规模下表现出优异的 scaling 特性。</p>\n<h5>核心机制详解</h5>\n<p><strong>1. 重建目标：CLIP 视觉特征</strong></p>\n<p>EVA 使用冻结的 OpenAI CLIP-L/14 视觉编码器提取每个 patch 的特征作为预测目标。具体而言，对于输入图像 <span class=\"kb-math kb-math-inline\">x</span>，CLIP 编码器输出 patch-level 特征序列 <span class=\"kb-math kb-math-inline\">\\{f_i^{\\text{clip}}\\}_{i=1}^{N}</span>，其中 <span class=\"kb-math kb-math-inline\">N</span> 为 patch 总数。EVA 编码器仅需预测被掩码位置 <span class=\"kb-math kb-math-inline\">\\mathcal{M}</span> 对应的 CLIP 特征。</p>\n<div class=\"key-point\">💡 <strong>关键直觉</strong>：CLIP 特征天然包含图像-文本对齐的语义信息，用它作为目标相当于让 MIM 预训练\"站在巨人的肩膀上\"——不仅学习视觉结构，还隐式地学习了语义理解能力。</div>\n<p><strong>2. 损失函数：负余弦相似度</strong></p>\n<p>EVA 使用负余弦相似度作为损失函数：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L} = -\\frac{1}{|\\mathcal{M}|} \\sum_{i \\in \\mathcal{M}} \\frac{\\hat{f}_i \\cdot f_i^{\\text{clip}}}{\\|\\hat{f}_i\\| \\cdot \\|f_i^{\\text{clip}}\\|}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\hat{f}_i</span> 是 EVA 对第 <span class=\"kb-math kb-math-inline\">i</span> 个被掩码 patch 的预测特征，<span class=\"kb-math kb-math-inline\">f_i^{\\text{clip}}</span> 是对应的 CLIP 目标特征。</p>\n<div class=\"warn-box\">⚠️ <strong>重要发现</strong>：论文通过 pilot study 系统比较了多种重建目标设计：\n- 将 CLIP 特征 tokenize 后做分类（类似 BEiT）→ 性能下降，因为量化引入信息损失\n- 蒸馏模式（同时预测可见和掩码 patch 的特征）→ 性能下降，因为可见 patch 的预测过于简单，稀释了学习信号\n- <strong>直接回归被掩码 patch 的 CLIP 特征</strong> → 最优方案，简单且高效</div>\n<p><strong>3. 掩码策略：Block-wise Masking</strong></p>\n<p>EVA 采用 40% 的 block-wise masking ratio。与 MAE 的 75% random masking 不同，EVA 选择较低的掩码比例，这是因为：\n- CLIP 特征本身已经是高层语义表示，预测难度较大\n- 较低的掩码比例保留更多上下文信息，有助于学习更好的表征\n- Block-wise（而非 random）masking 增加了空间连续性，迫使模型理解更大范围的视觉结构</p>\n<p><strong>4. 模型架构：Vanilla ViT-g</strong></p>\n<p>EVA 刻意选择了不带任何视觉先验（如窗口注意力、层级结构）的 vanilla ViT 架构：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>参数</th>\n<th>值</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>层数</td>\n<td>40</td>\n</tr>\n<tr>\n<td>隐藏维度</td>\n<td>1408</td>\n</tr>\n<tr>\n<td>MLP 维度</td>\n<td>6144</td>\n</tr>\n<tr>\n<td>注意力头数</td>\n<td>16</td>\n</tr>\n<tr>\n<td>总参数量</td>\n<td>1.011B</td>\n</tr>\n<tr>\n<td>Patch 大小</td>\n<td>14×14</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 <strong>设计哲学</strong>：EVA 认为视觉模型应当像语言模型一样，通过大规模预训练而非架构归纳偏置来获得能力。Vanilla ViT 的简洁性使其更容易扩展，且与 NLP Transformer 架构统一，有利于未来的多模态融合。</div>\n<h5>训练流程与关键细节</h5>\n<p><strong>预训练阶段</strong>：\n- 数据：合并 6 个公开数据集共 29.6M 图像（去重后），不使用任何标签\n- 输入分辨率：224×224（patch size 14×14，共 256 个 patch）\n- 优化器：AdamW（<span class=\"kb-math kb-math-inline\">\\beta_1=0.9, \\beta_2=0.98</span>），学习率 1e-3，weight decay 0.05\n- 训练：150 epochs，batch size 4096，fp16 混合精度\n- 硬件：128 张 A100-40G GPU，约 14.5 天\n- 解码器：仅 2 层 Transformer block（轻量级），训练后丢弃</p>\n<p><strong>下游微调</strong>：\n- <strong>图像分类</strong>（ImageNet-1K）：先在 IN-21K 上中间微调（90 epochs, 224²），再在 IN-1K 上微调（10 epochs, 336² 或 560²），达到 89.7% top-1\n- <strong>目标检测/实例分割</strong>（COCO &amp; LVIS）：使用 Cascade Mask R-CNN（ViTDet 框架），COCO 达到 64.7 AP<span class=\"kb-math kb-math-inline\">^{\\text{box}}</span>，LVIS 达到 62.2 AP<span class=\"kb-math kb-math-inline\">^{\\text{box}}</span> / 55.0 AP<span class=\"kb-math kb-math-inline\">^{\\text{mask}}</span>\n- <strong>语义分割</strong>（ADE20K）：使用 UperNet，达到 62.3 mIoU（单尺度）\n- <strong>视频分类</strong>（Kinetics-400/600/700）：直接微调，K-400 达到 89.7%</p>\n<h5>与传统方法的核心区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>对比维度</th>\n<th>MAE</th>\n<th>BEiT</th>\n<th>EVA</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>重建目标</td>\n<td>原始像素</td>\n<td>dVAE token（离散）</td>\n<td>CLIP 视觉特征（连续）</td>\n</tr>\n<tr>\n<td>语义信息</td>\n<td>无</td>\n<td>弱（dVAE 无语义对齐）</td>\n<td>强（CLIP 图文对齐）</td>\n</tr>\n<tr>\n<td>掩码比例</td>\n<td>75%</td>\n<td>40%</td>\n<td>40%</td>\n</tr>\n<tr>\n<td>损失函数</td>\n<td>MSE</td>\n<td>交叉熵</td>\n<td>负余弦相似度</td>\n</tr>\n<tr>\n<td>最大模型</td>\n<td>ViT-H (632M)</td>\n<td>ViT-L (307M)</td>\n<td>ViT-g (1.011B)</td>\n</tr>\n<tr>\n<td>额外依赖</td>\n<td>无</td>\n<td>需训练 dVAE tokenizer</td>\n<td>需冻结 CLIP 模型</td>\n</tr>\n</tbody>\n</table></div>\n<p>EVA 的独特优势在于：<strong>CLIP 特征作为\"免费\"的语义监督信号，无需额外训练 tokenizer，也无需标注数据，却能将丰富的图文对齐语义注入 MIM 预训练</strong>。这使得 EVA 在几乎所有下游任务上都显著超越了像素重建和 token 预测的 MIM 方法。</p>\n<h5>EVA-CLIP：反哺多模态学习</h5>\n<p>EVA 的一个重要应用是用其预训练权重初始化更大规模的 CLIP 视觉编码器。具体做法：\n1. 用 EVA 预训练的 ViT-g 权重初始化 1.1B 参数的 CLIP 视觉塔\n2. 语言塔从 CLIP-L 初始化\n3. 在 Merged-2B 数据集上进行图文对比学习</p>\n<p>这种\"MIM 预训练 → CLIP 微调\"的交替训练策略带来了显著收益：\n- 训练更稳定，避免了大规模 CLIP 训练中常见的崩溃问题\n- 以更少的数据和计算量超越了从头训练的 Open CLIP-H\n- EVA-CLIP 在 ImageNet 零样本分类上达到 78.5%，刷新了当时的自监督学习 SOTA</p>\n<div class=\"key-point\">💡 <strong>深层启示</strong>：EVA 展示了一条\"CLIP → MIM → 更大 CLIP\"的渐进式 scaling 路径——从较小的 CLIP-L 出发，通过 MIM 预训练扩展到 1B 级别的 ViT-g，再用其初始化更大的 CLIP 模型，形成了一个高效的视觉基础模型 scaling 循环。</div>",
      "quiz": {
        "q": "EVA 在 MIM 预训练中选择 CLIP 视觉特征作为重建目标的核心优势是什么？",
        "options": [
          "CLIP 特征维度更低，降低了计算成本",
          "CLIP 特征包含图文对齐的语义信息，为 MIM 引入了高层语义监督",
          "CLIP 特征是离散 token，便于用交叉熵损失训练",
          "CLIP 特征可以替代数据增强，减少对训练数据量的需求"
        ],
        "answer": 1,
        "explain": "EVA 的核心创新在于利用 CLIP 视觉特征天然携带的图像-文本对齐语义信息，使 MIM 预训练不仅学习视觉结构，还隐式获得语义理解能力，这是像素重建或 dVAE token 预测所不具备的。"
      }
    },
    {
      "id": "internimage",
      "num": 10,
      "name": "InternImage",
      "fullName": "可变形卷积视觉基础模型 (InternImage)",
      "year": "2022.11",
      "org": "上海AI实验室",
      "parent": "convnext",
      "paperUrl": "https://openaccess.thecvf.com/content/CVPR2023/html/Wang_InternImage_Exploring_Large-Scale_Vision_Foundation_Models_With_Deformable_Convolutions_CVPR_2023_paper.html",
      "projectUrl": "",
      "category": "foundation",
      "motivation": "可变形卷积扩展至10亿参数",
      "summary": "InternImage 提出 DCNv3 算子（多组可变形卷积 + 共享权重 + softmax 归一化），结合类 Transformer 的 block 设计和系统化缩放策略，将 CNN 首次扩展至 10 亿参数规模，在 ImageNet、COCO、ADE20K 等基准上达到与大规模 ViT 相当甚至超越的性能。",
      "keyPoints": [
        "<strong>核心算子 DCNv3</strong>：在 DCNv2 基础上做三项关键改进——(1) 采样点间共享投影权重以降低参数量；(2) 引入多组（multi-group）机制，不同组学习不同的空间聚合模式；(3) 将调制标量的归一化从 sigmoid 改为 softmax，使大规模训练更稳定",
        "<strong>DCNv3 公式</strong>：$y(p_0) = \\sum_{g=1}^{G}\\sum_{k=1}^{K} \\mathbf{w}<em gk=\"gk\">g \\, m</em>} \\, \\mathbf{x<em gk=\"gk\">g(p_0 + p_k + \\Delta p</em>})$，其中 $G$ 为组数，$K$ 为采样点数（默认 9），$\\mathbf{w<em gk=\"gk\">g \\in \\mathbb{R}^{C \\times C'}$ 为组内共享权重（$C'=C/G$），$m</em>$ 为可学习偏移量}$ 经 softmax 归一化，$\\Delta p_{gk",
        "<strong>架构设计</strong>：4 阶段层级结构，基础 block 采用 DCNv3 + LN + FFN（类 Transformer post-norm 设计）；Stem 层用两个 stride-2 的 3×3 卷积将分辨率降 4 倍；阶段间用 stride-2 的 3×3 卷积下采样",
        "<strong>堆叠规则 \"AABA\"</strong>：四个阶段的 block 数遵循 $L_1 = L_2 = L_4 \\leq L_3$ 的模式，通道数逐阶段翻倍（$C_i = C_1 \\times 2^{i-1}$），整个模型仅需 4 个超参数 $(C_1, C', L_1, L_3)$ 即可定义",
        "<strong>缩放能力</strong>：从 InternImage-T（30M）到 InternImage-H（1.08B），沿深度和宽度两个维度缩放，H 模型在 ImageNet 达 89.6% top-1，COCO 达 65.4 box mAP，ADE20K 达 62.9 mIoU，均为发表时 SOTA",
        "<strong>与 MHSA 的对比</strong>：DCNv3 兼具长程依赖（通过可学习偏移量）和自适应空间聚合（通过输入相关的偏移和调制），同时保留了卷积的归纳偏置（局部性、平移等变性），在效率上优于全局注意力"
      ],
      "detail": "<p><img alt=\"InternImage 整体架构\" src=\"https://ar5iv.labs.arxiv.org/html/2211.05778/assets/x3.png\" /></p>\n<pre><code>算法: InternImage 前向传播（单阶段 DCNv3 Block）\n\n输入: 特征图 x ∈ R^{C×H×W}\n输出: 更新后的特征图 x' ∈ R^{C×H×W}\n\n# ===== DCNv3 算子 =====\n# 1. 通过可分离卷积预测偏移量和调制标量\noffset, mask = SepConv3x3(x)          # offset: G×K×2, mask: G×K\nmask = softmax(mask, dim=K)            # 沿采样点维度做 softmax\n\n# 2. 多组可变形采样与聚合\nfor g in 1..G:                         # G 个组，每组独立采样\n    for k in 1..K:                     # K=9 个采样点（3×3 网格）\n        sample_pos = p0 + p_k + offset[g,k]   # 基础位置 + 网格偏移 + 可学习偏移\n        feat[g,k] = bilinear_sample(x_g, sample_pos)  # 双线性插值采样\n    out_g = w_g @ Σ_k (mask[g,k] * feat[g,k])         # 加权聚合 + 线性投影\n\ny = concat(out_1, ..., out_G)          # 拼接所有组的输出\n\n# ===== Basic Block (类 Transformer) =====\nx = x + DCNv3(LN(x))                  # 残差 + DCNv3（post-norm 变体）\nx = x + FFN(LN(x))                    # 残差 + FFN\nreturn x\n\n# ===== 整体流水线 =====\n# Stem: Conv3x3(s2) → LN → GELU → Conv3x3(s2) → LN   (4× 下采样)\n# Stage 1: L₁ × BasicBlock (C₁ channels)\n# Downsample: Conv3x3(s2) → LN                         (2× 下采样)\n# Stage 2: L₁ × BasicBlock (2C₁ channels)\n# Downsample: Conv3x3(s2) → LN                         (2× 下采样)\n# Stage 3: L₃ × BasicBlock (4C₁ channels)              ← 主要计算量\n# Downsample: Conv3x3(s2) → LN                         (2× 下采样)\n# Stage 4: L₁ × BasicBlock (8C₁ channels)\n</code></pre>\n<p><strong>从 DCNv2 到 DCNv3：三步关键改进</strong></p>\n<p>DCNv2 的核心问题在于其设计初衷是作为普通卷积的\"增强插件\"——加载预训练权重后微调，而非从头训练大规模模型。具体而言，DCNv2 中每个采样点拥有独立的投影权重 $\\mathbf{w}_k \\in \\mathbb{R}^{C \\times C}$，导致参数量随采样点数线性增长（3×3 卷积有 9 组独立权重）。InternImage 借鉴可分离卷积的思想，将位置相关的部分交给调制标量 $m_k$ 处理，而投影权重 $\\mathbf{w}$ 在所有采样点间共享，大幅降低参数量。同时引入多组机制（类似多头注意力），将通道分为 $G$ 组，每组学习独立的偏移量和调制标量，使单层卷积能捕获多种空间聚合模式。最后，将调制标量的归一化从逐元素 sigmoid（输出范围 $[0,1]$，总和不稳定）改为沿采样点维度的 softmax（总和恒为 1），显著提升了大规模训练的梯度稳定性。</p>\n<p><strong>架构设计：CNN 骨架 + Transformer 灵魂</strong></p>\n<p>InternImage 的宏观架构遵循经典 CNN 的层级设计（4 阶段、逐步下采样），但微观 block 设计完全借鉴了 Transformer：每个 basic block 由 DCNv3 层和 FFN 层组成，均使用 LayerNorm 和残差连接，采用 post-normalization 配置。Stem 层使用两个 stride-2 的 3×3 卷积（中间夹 LN 和 GELU）将输入从 $H \\times W$ 降至 $H/4 \\times W/4$，第一个卷积的输出通道数为 $C_1/2$，第二个为 $C_1$。阶段间的下采样层由一个 stride-2 的 3×3 卷积加 LN 组成。偏移量和调制标量的预测采用可分离卷积实现：先用 3×3 深度卷积提取空间信息，再用线性投影生成 $G \\times K \\times 3$ 维输出（2 维偏移 + 1 维调制标量）。这种\"CNN 骨架 + Transformer block\"的混合设计使模型既保留了卷积的归纳偏置优势，又获得了类似注意力机制的动态聚合能力。</p>\n<p><strong>系统化缩放：从 30M 到 1B 的路径</strong></p>\n<p>模型缩放是 InternImage 的重要贡献之一。作者将搜索空间通过 4 条规则压缩为仅 4 个超参数：(1) 通道数逐阶段翻倍 $C_i = C_1 \\times 2^{i-1}$；(2) 组维度 $C' = C/G$ 保持固定（T/S/B/L/XL 为 16，H 为 32）；(3) block 数遵循 \"AABA\" 模式 $L_1 = L_2 = L_4$；(4) $L_1 \\leq L_3$。以 InternImage-T（$C_1=64, C'=16, L_1=4, L_3=18$，30M 参数）为起点，通过增加宽度 $C_1$ 和深度 $L$ 缩放至更大模型。值得注意的是，InternImage-H（1.08B）将组维度从 16 提升至 32，这是因为在超大规模下更大的组维度能提供更丰富的组内表征。缩放遵循 $\\alpha \\cdot \\beta^2 \\approx 2$ 的复合缩放原则（$\\alpha$ 为深度倍率，$\\beta$ 为宽度倍率），确保每次缩放约将 FLOPs 翻倍。InternImage-H 在 427M 张图像上预训练后，ImageNet top-1 达 89.6%，COCO box mAP 达 65.4，ADE20K mIoU 达 62.9，全面超越同期 ViT 模型（如 BEiT-3、FD-SwinV2-G），证明了 CNN 在大规模场景下的竞争力。</p>\n<p><strong>训练策略与效率</strong></p>\n<p>InternImage 的训练分为两个阶段：小模型（T/S/B）在 ImageNet-1K 上从头训练 300 epoch，使用 AdamW 优化器、余弦学习率衰减、大量数据增强（RandAugment、Mixup、CutMix、随机擦除等）；大模型（L/XL/H）先在大规模数据集（如 ImageNet-22K 或私有数据集 Laion-2B 等共 427M 张图像）上预训练，再在 ImageNet-1K 上微调。在效率方面，DCNv3 的 CUDA 实现使其在相同 FLOPs 下比基于注意力的算子更快——InternImage-B 的推理速度与 Swin-B 相当，但精度更高。此外，DCNv3 的稀疏采样特性（每个位置仅采样 $K=9$ 个点）使其内存占用远低于全局注意力，这对于处理高分辨率下游任务（如目标检测和语义分割）至关重要。</p>",
      "quiz": {
        "q": "",
        "options": [],
        "answer": 0,
        "explain": ""
      }
    },
    {
      "id": "dinov2",
      "num": 11,
      "name": "DINOv2",
      "fullName": "无监督鲁棒视觉特征学习 (DINOv2)",
      "year": "2023.04",
      "org": "Meta AI",
      "parent": "dino",
      "paperUrl": "https://arxiv.org/abs/2304.07193",
      "projectUrl": "",
      "category": "representation",
      "motivation": "1.42亿图像通用视觉特征",
      "summary": "DINOv2 提出了一套完整的\"数据 + 算法 + 工程\"方案：通过自动化管线构建 1.42 亿图像的 LVD-142M 数据集，结合 DINO（图像级）与 iBOT（块级）判别式自监督损失以及 SwAV 中心化、KoLeo 正则等改进，在 ViT-g（1B 参数）上训练出无需微调即可在图像级与像素级任务上超越 OpenCLIP 的通用视觉特征，并通过知识蒸馏高效获得小模型。",
      "keyPoints": [
        "<strong>自动化数据管线 LVD-142M</strong>：从多个人工策展数据源出发，利用自监督特征对未策展网络图像进行检索与去重，构建 1.42 亿张高质量训练集，无需人工标注",
        "<strong>判别式自监督组合损失</strong>：图像级 DINO 损失（student-teacher CLS token 交叉熵）+ 块级 iBOT 损失（掩码 patch token 预测）+ SwAV Sinkhorn-Knopp 中心化",
        "<strong>DINO 与 iBOT 使用独立投影头</strong>：在大规模训练中，解耦两个损失的 MLP head 效果优于共享权重",
        "<strong>KoLeo 正则化器</strong>：基于 Kozachenko-Leonenko 微分熵估计，鼓励 batch 内特征均匀分布，防止表示坍塌",
        "<strong>高效工程实现</strong>：序列打包（block-diagonal attention mask）、高效随机深度（跳过计算而非掩码）、FSDP 混合精度训练、FlashAttention",
        "<strong>知识蒸馏</strong>：从 ViT-g 冻结教师蒸馏 ViT-S/B/L，性能优于从头训练",
        "<strong>模型规模</strong>：ViT-S (21M) / ViT-B (86M) / ViT-L (300M) / ViT-g (1.1B)",
        "<strong>短时高分辨率微调</strong>：训练末期将分辨率从 224 提升至 518，提升密集预测任务性能"
      ],
      "detail": "<h5>整体框架</h5>\n<p><img alt=\"DINOv2 特征可视化 — PCA 主成分\" src=\"https://ar5iv.labs.arxiv.org/html/2304.07193/assets/new-figure-1.jpg\" />\n<em>图 1：DINOv2 学到的特征经 PCA 可视化后，能在无监督条件下精准分离前景与背景，并在语义相似的物体间产生一致的特征映射。</em></p>\n<p>DINOv2 的核心思路是：<strong>在足够大且足够好的数据上，用足够强的判别式自监督方法训练足够大的模型，就能得到通用视觉特征</strong>。整个系统由三大支柱组成：</p>\n<ol>\n<li><strong>数据管线</strong>（Section 3）—— 自动构建 LVD-142M</li>\n<li><strong>训练算法</strong>（Section 4）—— DINO + iBOT + SwAV centering + KoLeo</li>\n<li><strong>工程优化</strong>（Section 5）—— FSDP / FlashAttention / 序列打包 / 高效随机深度</li>\n</ol>\n<p><img alt=\"数据规模与模型规模的 scaling 效果\" src=\"https://ar5iv.labs.arxiv.org/html/2304.07193/assets/x1.png\" />\n<em>图 2：增大数据量和模型规模均能持续提升下游性能，验证了 scaling 的有效性。</em></p>\n<hr />\n<h5>数据管线：LVD-142M</h5>\n<p><img alt=\"数据管线示意\" src=\"https://ar5iv.labs.arxiv.org/html/2304.07193/assets/x2.png\" />\n<em>图 3：LVD-142M 数据管线。从策展源出发，对未策展网络图像进行自监督检索和去重。</em></p>\n<p>数据管线分为三步：</p>\n<ol>\n<li><strong>策展数据源汇集</strong>：收集 ImageNet-22k、ImageNet-1k、Google Landmarks 等已有高质量数据集作为\"锚点\"</li>\n<li><strong>自监督检索扩充</strong>：用预训练自监督模型提取特征，从大规模未标注网络图像池中检索与策展图像余弦相似度高的样本</li>\n<li><strong>去重</strong>：使用 copy detection 方法去除近重复图像，同时在策展源与未策展源之间、未策展源内部分别去重</li>\n</ol>\n<div class=\"key-point\">💡 关键：整个管线<strong>不依赖任何人工标注或文本监督</strong>，完全基于视觉自监督特征完成数据筛选，这是与 CLIP/OpenCLIP 等方法的本质区别。</div>\n<p>最终得到 LVD-142M 数据集（142M 张图像），实验表明其效果显著优于仅使用 ImageNet-22k（14M）。</p>\n<hr />\n<h5>训练算法详解</h5>\n<p>DINOv2 的训练目标由四部分组成：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L} = \\mathcal{L}_{\\text{DINO}} + \\lambda_1 \\mathcal{L}_{\\text{iBOT}} + \\lambda_2 \\mathcal{L}_{\\text{KoLeo}}</div>\n<p><strong>（1）图像级目标 — DINO Loss</strong></p>\n<p>采用 student-teacher 框架。对同一图像生成不同裁剪（global crops + local crops），分别送入 student 和 teacher 网络。取两者的 CLS token，经各自的 MLP 投影头后得到 prototype scores，再分别做 softmax：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{DINO}} = -\\sum p_t \\log p_s</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">p_t</span> 为教师输出（经 Sinkhorn-Knopp 中心化），<span class=\"kb-math kb-math-inline\">p_s</span> 为学生输出（经 softmax）。教师网络参数通过学生参数的<strong>指数移动平均（EMA）</strong>更新：</p>\n<div class=\"kb-math kb-math-display\">\\theta_t \\leftarrow m \\cdot \\theta_t + (1 - m) \\cdot \\theta_s</div>\n<p><strong>（2）块级目标 — iBOT Loss</strong></p>\n<p>对学生输入随机掩码部分 patch，但教师看到完整图像。对学生的 mask token 和教师对应位置的 patch token 分别经投影头后计算交叉熵：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{iBOT}} = -\\sum_{i \\in \\text{masked}} p_{t,i} \\log p_{s,i}</div>\n<div class=\"warn-box\">⚠️ 注意：在大规模训练中，DINO head 和 iBOT head <strong>使用独立参数</strong>（untied weights），这与 iBOT 原论文中共享权重的结论相反。作者发现在大规模下解耦效果更好。</div>\n<p><strong>（3）Sinkhorn-Knopp 中心化</strong></p>\n<p>替代 DINO 原始的 softmax + moving-average centering，采用 SwAV 的 Sinkhorn-Knopp 批归一化（3 次迭代），对教师输出进行中心化。这能更好地防止表示坍塌。</p>\n<p><strong>（4）KoLeo 正则化器</strong></p>\n<p>基于 Kozachenko-Leonenko 微分熵估计器，鼓励 batch 内特征均匀分布：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{KoLeo}} = -\\frac{1}{n}\\sum_{i=1}^{n} \\log(d_{n,i})</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">d_{n,i} = \\min_{j \\neq i} \\|x_i - x_j\\|</span> 是样本 <span class=\"kb-math kb-math-inline\">x_i</span> 到 batch 内最近邻的距离。特征在计算前先做 <span class=\"kb-math kb-math-inline\">\\ell_2</span> 归一化。</p>\n<div class=\"key-point\">💡 直觉：KoLeo 惩罚特征过于聚集（最近邻距离小 → log 值大负数 → loss 大），从而鼓励特征在超球面上均匀展开。</div>\n<hr />\n<h5>训练伪代码</h5>\n<pre><code class=\"language-python\"># DINOv2 训练核心伪代码\nfor images in dataloader:\n    # 数据增强：生成 2 个 global crops + N 个 local crops\n    global_crops = augment_global(images)  # 224x224\n    local_crops  = augment_local(images)   # 96x96\n\n    # Student: 对 global crops 随机 mask patches\n    student_tokens = student_backbone(mask(global_crops))\n    student_cls    = student_tokens[:, 0]          # CLS token\n    student_patch  = student_tokens[:, 1:]         # patch tokens\n\n    # Teacher (frozen EMA): 看完整图像\n    with no_grad():\n        teacher_tokens = teacher_backbone(global_crops)\n        teacher_cls    = teacher_tokens[:, 0]\n        teacher_patch  = teacher_tokens[:, 1:]\n\n    # DINO loss: 图像级 CLS token 交叉熵\n    ps_cls = softmax(student_dino_head(student_cls))\n    pt_cls = sinkhorn_knopp(teacher_dino_head(teacher_cls))\n    L_dino = -sum(pt_cls * log(ps_cls))\n\n    # iBOT loss: 块级 masked patch token 交叉熵\n    ps_patch = softmax(student_ibot_head(student_patch[masked_indices]))\n    pt_patch = sinkhorn_knopp(teacher_ibot_head(teacher_patch[masked_indices]))\n    L_ibot = -sum(pt_patch * log(ps_patch))\n\n    # KoLeo regularizer: 鼓励特征均匀分布\n    feats = l2_normalize(student_cls)\n    d_nn  = pairwise_min_distance(feats)\n    L_koleo = -mean(log(d_nn))\n\n    # 总损失\n    loss = L_dino + λ1 * L_ibot + λ2 * L_koleo\n    loss.backward()\n    optimizer.step()\n\n    # 更新教师 EMA\n    teacher.params = m * teacher.params + (1 - m) * student.params\n</code></pre>\n<hr />\n<h5>工程优化</h5>\n<p>DINOv2 在工程层面做了大量优化，使得在 ViT-g（1.1B 参数）规模上的训练成为可能：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>优化技术</th>\n<th>核心思路</th>\n<th>收益</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><strong>序列打包</strong></td>\n<td>将不同分辨率的 crops 拼接为一条长序列，用 block-diagonal attention mask 隔离</td>\n<td>避免多次前向/反向，显著提升吞吐</td>\n</tr>\n<tr>\n<td><strong>高效随机深度</strong></td>\n<td>跳过被 drop 的残差块计算（而非计算后掩码），随机 shuffle batch 后取前 <span class=\"kb-math kb-math-inline\">(1-d) \\times B</span> 个样本</td>\n<td>drop rate=40% 时节省约 40% 计算和显存</td>\n</tr>\n<tr>\n<td><strong>FSDP 混合精度</strong></td>\n<td>权重 float32 存储 + float16 通信（backbone 梯度 fp16 reduce，MLP head 梯度 fp32 reduce）</td>\n<td>通信量减半，显存不受单卡限制</td>\n</tr>\n<tr>\n<td><strong>FlashAttention</strong></td>\n<td>融合 attention 计算，减少 HBM 访问</td>\n<td>加速 attention 计算</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 关键：FSDP 混合精度在几乎所有场景下都优于 DDP + autocast，因为它同时减少了通信开销和显存占用。</div>\n<hr />\n<h5>知识蒸馏</h5>\n<p>训练完 ViT-g 后，通过蒸馏获得小模型（ViT-S/B/L）：</p>\n<ul>\n<li>使用 ViT-g 作为<strong>冻结教师</strong></li>\n<li>复用同一训练框架（DINO + iBOT loss）</li>\n<li>关键修改：去除 masking 和 stochastic depth，对两个 global crops 都计算 iBOT loss</li>\n<li>最终模型取学生的 EMA</li>\n</ul>\n<div class=\"key-point\">💡 实验发现：蒸馏得到的 ViT-L 性能优于从头训练的 ViT-L，说明大模型的知识能有效传递。</div>\n<hr />\n<h5>与先前方法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th>DINO</th>\n<th>iBOT</th>\n<th>DINOv2</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>图像级目标</td>\n<td>✅ CLS token 蒸馏</td>\n<td>✅ 继承 DINO</td>\n<td>✅ 继承 DINO</td>\n</tr>\n<tr>\n<td>块级目标</td>\n<td>❌</td>\n<td>✅ masked patch prediction</td>\n<td>✅ 继承 iBOT</td>\n</tr>\n<tr>\n<td>中心化方式</td>\n<td>softmax + moving avg</td>\n<td>softmax + moving avg</td>\n<td><strong>Sinkhorn-Knopp</strong></td>\n</tr>\n<tr>\n<td>投影头</td>\n<td>共享</td>\n<td>共享</td>\n<td><strong>独立（untied）</strong></td>\n</tr>\n<tr>\n<td>特征正则</td>\n<td>无</td>\n<td>无</td>\n<td><strong>KoLeo</strong></td>\n</tr>\n<tr>\n<td>数据</td>\n<td>ImageNet-1k</td>\n<td>ImageNet-1k/22k</td>\n<td><strong>LVD-142M（自动策展）</strong></td>\n</tr>\n<tr>\n<td>模型规模</td>\n<td>ViT-S/B</td>\n<td>ViT-S/B/L</td>\n<td><strong>ViT-S/B/L/g（1.1B）</strong></td>\n</tr>\n<tr>\n<td>蒸馏</td>\n<td>无</td>\n<td>无</td>\n<td><strong>ViT-g → 小模型</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p>DINOv2 的核心贡献不在于提出全新的损失函数，而在于<strong>系统性地将数据规模、模型规模和训练技巧整合到一起</strong>，证明了判别式自监督方法在正确的 scaling 下可以产出媲美甚至超越弱监督方法（如 CLIP）的通用视觉特征。</p>",
      "quiz": {
        "q": "DINOv2 中为什么要将 DINO head 和 iBOT head 的权重解耦（untied）？",
        "options": [
          "为了减少模型总参数量",
          "因为在大规模训练中，解耦两个 head 的性能优于共享权重",
          "为了让 iBOT loss 只作用于 CLS token",
          "因为 Sinkhorn-Knopp 中心化要求两个 head 独立"
        ],
        "answer": 1,
        "explain": "iBOT 原论文在小规模实验中发现共享权重更好，但 DINOv2 在大规模训练中观察到相反结论——解耦两个投影头能获得更好的下游性能。"
      }
    },
    {
      "id": "sam",
      "num": 12,
      "name": "SAM",
      "fullName": "分割一切模型 (Segment Anything Model)",
      "year": "2023.04",
      "org": "Meta AI",
      "parent": "vit",
      "paperUrl": "https://openaccess.thecvf.com/content/ICCV2023/html/Kirillov_Segment_Anything_ICCV_2023_paper.html",
      "projectUrl": "",
      "category": "segmentation",
      "motivation": "可提示分割定义新范式",
      "summary": "SAM 将 NLP 中\"prompt → response\"的基础模型范式迁移到视觉分割领域：给定任意提示（点、框、文本、掩码），模型输出有效的分割掩码，并通过\"模型-数据\"飞轮（data engine）自举式地构建了迄今最大的分割数据集 SA-1B。\n\n---",
      "keyPoints": [
        "定义 <strong>可提示分割任务（Promptable Segmentation）</strong> 作为统一预训练目标，支持点、框、文本、掩码等任意 prompt 输入",
        "三组件架构：<strong>Image Encoder</strong>（MAE 预训练 ViT-H，632M 参数）+ <strong>Prompt Encoder</strong>（稀疏/稠密双路）+ <strong>Mask Decoder</strong>（2 层 Transformer decoder，~50ms on CPU）",
        "<strong>歧义感知输出</strong>：同时预测 3 个不同粒度的掩码 + IoU 置信度，训练时只对最小 loss 的掩码回传梯度",
        "<strong>三阶段数据引擎（Data Engine）</strong>：人工辅助 → 半自动 → 全自动，自举式构建 SA-1B 数据集",
        "<strong>SA-1B 数据集</strong>：11M 图像、1.1B 掩码（99.1% 全自动生成），94% 掩码与专业标注 IoU &gt; 90%",
        "在 23 个分割数据集上零样本迁移，多数任务超越或匹配全监督 prior art",
        "损失函数：Focal Loss + Dice Loss（20:1 权重），11 轮交互式 prompt 采样训练"
      ],
      "detail": "<h5>整体架构</h5>\n<p><img alt=\"SAM 模型架构总览\" src=\"https://ar5iv.labs.arxiv.org/html/2304.02643/assets/x1.png\" />\n<em>图：SAM 由 Image Encoder、Prompt Encoder 和 Mask Decoder 三部分组成。Image Encoder 只运行一次，后续所有 prompt 交互复用同一特征图。</em></p>\n<p>SAM 的设计哲学是\"一次编码，多次解码\"——将计算量最大的图像特征提取与轻量的 prompt 交互解耦，实现实时交互式分割。</p>\n<hr />\n<h5>1. Promptable Segmentation 任务定义</h5>\n<p><strong>动机：</strong> NLP 领域的基础模型（如 GPT）通过\"next token prediction\"预训练，再通过 prompt engineering 泛化到下游任务。图像分割领域缺乏类似的统一范式——语义分割、实例分割、全景分割各自为政，每种任务需要单独的模型和标注。</p>\n<p><strong>核心定义：</strong> 给定任意 prompt（前景/背景点、边界框、粗掩码、自由文本），返回一个<strong>有效的（valid）</strong>分割掩码。\"有效\"意味着即使 prompt 有歧义（如点击衬衫上的点，可能指衬衫、人、或整个场景），输出也应是其中至少一个物体的合理掩码。</p>\n<div class=\"key-point\">💡 <strong>关键洞察：</strong> 这个任务定义同时解决了预训练和零样本迁移两个问题——预训练时模拟交互式 prompt 序列，推理时通过设计合适的 prompt 即可解决各种下游分割任务（如用检测器的框输出作为 prompt 实现实例分割）。</div>\n<hr />\n<h5>2. Image Encoder — MAE 预训练的 ViT-H</h5>\n<p>SAM 选择 MAE（Masked Autoencoder）预训练的 ViT-H/16 作为图像编码器（632M 参数）：</p>\n<ul>\n<li><strong>输入</strong>：<span class=\"kb-math kb-math-inline\">1024 \\times 1024</span> 图像</li>\n<li><strong>输出</strong>：<span class=\"kb-math kb-math-inline\">64 \\times 64 \\times 256</span> 特征图（16× 下采样）</li>\n<li><strong>位置编码</strong>：相对位置编码（而非绝对），更好适应不同分辨率</li>\n<li><strong>注意力优化</strong>：在第 2、5、8、11 个 block 使用全局注意力，其余使用窗口注意力，降低计算量</li>\n<li><strong>通道映射</strong>：通过 <span class=\"kb-math kb-math-inline\">1 \\times 1</span> 和 <span class=\"kb-math kb-math-inline\">3 \\times 3</span> 卷积将 ViT 的 1280 维输出降至 256 维</li>\n</ul>\n<div class=\"warn-box\">⚠️ <strong>计算瓶颈：</strong> Image Encoder 是整个系统的计算瓶颈（~0.15s/image on GPU），但由于其输出不依赖 prompt，只需运行一次。后续所有 prompt 交互都复用同一特征图，实现\"摊销\"计算。</div>\n<hr />\n<h5>3. Prompt Encoder — 稀疏 + 稠密双路编码</h5>\n<p>Prompt Encoder 将不同类型的提示统一编码为 256 维向量：</p>\n<p><strong>稀疏 prompt（输出为 token 序列）：</strong>\n- <strong>点（point）</strong>：傅里叶位置编码 + 前景/背景可学习嵌入\n- <strong>框（box）</strong>：左上角 + 右下角两个点的位置编码 + 可学习嵌入\n- <strong>文本（text）</strong>：CLIP 文本编码器提取特征</p>\n<p><strong>稠密 prompt（输出为空间特征图）：</strong>\n- <strong>掩码（mask）</strong>：通过 <span class=\"kb-math kb-math-inline\">4 \\times</span> 下采样卷积网络编码，逐元素加到图像特征上</p>\n<p>位置编码使用<strong>随机傅里叶特征映射</strong>，将 2D 坐标映射到高维空间，与 NeRF 中的位置编码思路一致。</p>\n<hr />\n<h5>4. Mask Decoder — 轻量 Transformer 解码器</h5>\n<p>这是 SAM 最精巧的部分。Mask Decoder 仅用 <strong>2 层修改版 Transformer decoder</strong> 实现 prompt 到掩码的映射：</p>\n<pre><code>Mask Decoder 伪代码:\n─────────────────────────────────\n输入:\n  image_embedding: [64×64, 256]    # Image Encoder 输出\n  prompt_tokens: [N, 256]          # 稀疏 prompt 编码\n  output_tokens: [5, 256]          # 4 个 mask token + 1 个 IoU token (可学习)\n\nfor layer in decoder_layers (×2):\n    # Step 1: token 间自注意力\n    tokens = self_attn(output_tokens + prompt_tokens)\n\n    # Step 2: token → image 交叉注意力\n    tokens = cross_attn(q=tokens, kv=image_embedding)\n\n    # Step 3: MLP 变换\n    tokens = MLP(tokens)\n\n    # Step 4: image → token 交叉注意力 (关键！双向交互)\n    image_embedding = cross_attn(q=image_embedding, kv=tokens)\n\n# 上采样 + 动态 MLP 生成掩码\nupsampled = upsample_4x(image_embedding)  # → [256×256, 32]\nfor i in range(4):\n    mask_weights_i = DynamicMLP(mask_token_i)   # [32]\n    masks[i] = sigmoid(upsampled @ mask_weights_i)  # [256×256]\n\niou_scores = MLP(iou_token)  # 4 个 IoU 置信度\n─────────────────────────────────\n</code></pre>\n<p><strong>歧义处理机制：</strong> 一个 prompt 可能对应多个合理的分割结果。SAM 同时输出 <strong>3 个不同粒度的掩码</strong>（whole / part / subpart）+ 1 个额外掩码，每个附带 IoU 置信度。训练时只对 loss 最小的掩码回传梯度（类似 DETR 的匹配策略），推理时选 IoU 最高的掩码。</p>\n<div class=\"key-point\">💡 <strong>为什么只用 2 层 decoder？</strong> Image Encoder 已提供极其丰富的特征，decoder 只需做轻量的 prompt-conditioned 选择。这使得每次 prompt 交互仅需 ~50ms（CPU），支持实时交互标注。</div>\n<hr />\n<h5>5. 数据引擎 — 三阶段自举式数据飞轮</h5>\n<p>SAM 的核心洞察：<strong>模型和数据可以互相提升</strong>。数据引擎分三个阶段：</p>\n<p><strong>阶段一：人工辅助标注（Assisted-Manual）</strong>\n- 专业标注员使用 SAM 交互式标注（点击 prompt → 模型预测 → 人工修正）\n- 类似经典交互式分割，但 SAM 的实时性大幅提升效率\n- 收集 <strong>4.3M 掩码</strong>（120K 图像）</p>\n<p><strong>阶段二：半自动标注（Semi-Automatic）</strong>\n- SAM 先自动检测高置信度物体，标注员只需标注 SAM 遗漏的物体\n- 目标：增加多样性，标注不显眼的物体\n- 新增 <strong>5.9M 掩码</strong>（180K 图像），每张图像平均掩码数从 44 增至 72</p>\n<p><strong>阶段三：全自动标注（Fully Automatic）</strong>\n- 在图像上铺设 <span class=\"kb-math kb-math-inline\">32 \\times 32 = 1024</span> 个均匀网格点作为 prompt\n- 每个点预测一组掩码（利用歧义感知输出）\n- 通过 NMS（IoU 阈值）+ 置信度过滤 + 稳定性过滤去重\n- 最终生成 <strong>1.1B 掩码</strong>（11M 图像），99.1% 全自动</p>\n<pre><code class=\"language-python\"># 全自动标注伪代码\nfor image in dataset:\n    features = image_encoder(image)           # 编码一次\n    points = uniform_grid(32, 32)             # 1024 个点\n    all_masks = []\n    for point in points:\n        masks, ious = mask_decoder(features, point)  # 每点 3 个掩码\n        all_masks.extend(filter_by_confidence(masks, ious))\n\n    # 后处理\n    all_masks = NMS(all_masks, iou_threshold=0.7)\n    all_masks = stability_filter(all_masks)   # 阈值扰动稳定性\n    final_masks = remove_duplicates(all_masks)\n</code></pre>\n<hr />\n<h5>6. 训练策略</h5>\n<p><strong>交互式训练模拟：</strong> 每个训练样本模拟 <strong>11 轮交互</strong>：\n1. <strong>第 1 轮</strong>：随机选择前景点或边界框作为初始 prompt\n2. <strong>第 2-9 轮</strong>：从上一轮预测与 GT 的误差区域采样新的纠正点（false negative → 前景点，false positive → 背景点），同时将上一轮的<strong>未二值化 mask logits</strong> 作为额外 prompt 输入\n3. <strong>第 10-11 轮</strong>：不添加新点，让模型学习自我精炼掩码</p>\n<p><strong>损失函数：</strong></p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L} = \\lambda_{\\text{focal}} \\cdot \\text{FocalLoss}(m, \\hat{m}) + \\lambda_{\\text{dice}} \\cdot \\text{DiceLoss}(m, \\hat{m})</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\lambda_{\\text{focal}} : \\lambda_{\\text{dice}} = 20 : 1</span>，对 3 个输出掩码取最小 loss 回传。</p>\n<p><strong>优化配置：</strong> AdamW（<span class=\"kb-math kb-math-inline\">\\beta_1=0.9, \\beta_2=0.999</span>），初始学习率 <span class=\"kb-math kb-math-inline\">8 \\times 10^{-4}</span>，250 步线性 warmup，在 60K 和 86.7K 步分别衰减 10×，共训练 90K 步（~2 个 SA-1B epoch），batch size 256，weight decay 0.1，drop path rate 0.4，layer-wise lr decay 0.8。</p>\n<hr />\n<h5>7. 零样本迁移与传统方法对比</h5>\n<p>SAM 与传统分割方法的核心区别在于：传统方法为每个任务单独训练（语义分割用 FCN/DeepLab，实例分割用 Mask R-CNN，全景分割用 Panoptic FPN），而 SAM 通过 prompt engineering 零样本解决所有任务。</p>\n<p>在 23 个数据集上的零样本评估中：\n- <strong>单点分割</strong>：平均 mIoU 显著超越 RITM 等交互式分割方法\n- <strong>边界框 → 实例分割</strong>：COCO/LVIS 上零样本接近 ViTDet 全监督性能\n- <strong>目标提议生成</strong>：全自动网格点 prompt，中大物体 AR 超越 ViTDet\n- <strong>边缘检测</strong>：BSDS500 上零样本达到合理性能</p>\n<div class=\"warn-box\">⚠️ <strong>局限性：</strong> SAM 不生成语义标签（只输出掩码）；对细粒度结构精度有限；文本 prompt 能力尚为初步探索；实时性依赖图像编码器预计算。</div>\n<hr />",
      "quiz": {
        "q": "SAM 在训练时对 3 个输出掩码的损失函数采用什么策略？",
        "options": [
          "对 3 个掩码的 loss 取平均后回传梯度",
          "只对 IoU 置信度最高的掩码回传梯度",
          "只对与 GT 匹配 loss 最小的掩码回传梯度",
          "对 3 个掩码分别回传梯度，使用不同的 loss 权重"
        ],
        "answer": 2,
        "explain": "SAM 采用类似 DETR 的匹配策略，训练时只对 loss 最小的那个掩码回传梯度，让每个 output token 学会预测不同粒度的掩码，避免 mode averaging。"
      }
    },
    {
      "id": "florence2",
      "num": 13,
      "name": "Florence-2",
      "fullName": "统一视觉任务表征 (Florence-2)",
      "year": "2023.11",
      "org": "Microsoft Research",
      "parent": "clip",
      "paperUrl": "https://arxiv.org/abs/2311.06242",
      "projectUrl": "",
      "category": "multimodal",
      "motivation": "统一Prompt处理多粒度任务",
      "summary": "Florence-2 提出了一种基于序列到序列架构的统一视觉基础模型，通过构建包含 5.4B 多粒度注释的大规模数据集 FLD-5B 进行多任务预训练，使单一模型能够以统一的文本生成范式处理从图像级到像素级的多种视觉任务，在仅 0.77B 参数下实现了超越数十倍大模型的零样本性能。",
      "keyPoints": [
        "<strong>统一 seq2seq 架构</strong>：将所有视觉任务（分类、描述、检测、分割、Grounding 等）统一为\"图像 + 文本提示 → 文本输出\"的序列到序列范式",
        "<strong>FLD-5B 大规模多任务数据集</strong>：包含 126M 图片、5.4B 注释（500M 文本 + 1.3B 区域-文本 + 3.6B 文本-短语-区域），覆盖从粗到细的多粒度语义",
        "<strong>数据引擎三阶段流水线</strong>：专家模型初始标注 → 数据过滤与增强 → 迭代精炼，自动化构建高质量多任务标注",
        "<strong>位置 token 量化</strong>：将坐标归一化后量化为 1000 个 bin，作为新词加入 tokenizer，统一表示 bounding box 和多边形区域",
        "<strong>DaViT 视觉编码器 + 多模态 Encoder-Decoder</strong>：视觉特征经线性投影后与文本 embedding 拼接，输入标准 Transformer encoder-decoder",
        "<strong>两种规模</strong>：Florence-2-B（232M 参数）和 Florence-2-L（771M 参数），均以极小参数量实现 SOTA 零样本性能",
        "<strong>多任务零样本能力</strong>：单一模型在 COCO Caption、Flickr30k Grounding、RefCOCO 等多个基准上超越 Flamingo（80B）和 Kosmos-2（1.6B）"
      ],
      "detail": "<p><img alt=\"Florence-2 模型总览\" src=\"https://ar5iv.labs.arxiv.org/html/2311.06242/assets/x1.png\" />\n<em>图 1：Florence-2 以统一的 prompt-based 范式处理多种视觉任务，涵盖图像级（分类、描述、VQA）、区域级（检测、Grounding、OCR）和像素级（分割、指代分割）</em></p>\n<p><img alt=\"Florence-2 架构图\" src=\"https://ar5iv.labs.arxiv.org/html/2311.06242/assets/x2.png\" />\n<em>图 2：Florence-2 的模型架构——DaViT 视觉编码器提取图像特征，经线性投影后与文本 prompt embedding 拼接，送入多模态 encoder-decoder 生成目标文本序列</em></p>\n<h5>统一多任务训练的伪代码</h5>\n<pre><code class=\"language-python\"># Florence-2 统一多任务训练流程\n# 所有任务共享同一模型，仅通过 text prompt 区分任务类型\n\nfor batch in multitask_dataloader:\n    image, prompt, target = batch\n    # prompt 示例: &quot;&lt;OD&gt;&quot; (检测), &quot;&lt;CAPTION&gt;&quot; (描述), &quot;&lt;REFERRING_EXPRESSION&gt;&quot; (指代)\n\n    # 1. 视觉编码: DaViT 提取图像特征\n    V = DaViT(image)                    # V ∈ R^{N_v × D_v}\n    V_proj = LayerNorm(Linear(V))       # V' ∈ R^{N_v × D}\n\n    # 2. 文本编码: tokenize prompt (含 location tokens)\n    T = text_embedding(tokenize(prompt))  # T ∈ R^{N_t × D}\n\n    # 3. 拼接视觉与文本 token\n    X = concat(V_proj, T)               # X ∈ R^{(N_v + N_t) × D}\n\n    # 4. Encoder-Decoder 生成目标序列\n    # target 可包含普通文本 token 和 location tokens (&lt;loc_0&gt;...&lt;loc_999&gt;)\n    logits = encoder_decoder(X, target_shifted)\n\n    # 5. 标准交叉熵损失\n    loss = cross_entropy(logits, target)\n    loss.backward()\n    optimizer.step()\n</code></pre>\n<h5>动机与背景</h5>\n<p>传统视觉模型通常针对单一任务设计专门的架构和训练流程：分类模型输出类别标签，检测模型输出 bounding box，分割模型输出像素 mask。这种碎片化的设计导致：\n1. <strong>每个任务需要独立的模型和训练数据</strong>，无法共享跨任务的视觉知识；\n2. <strong>缺乏统一的表征空间</strong>，难以同时理解图像级语义和区域级/像素级细节；\n3. <strong>现有大规模预训练数据集</strong>（如 CLIP 的 WIT-400M、SAM 的 SA-1B）通常只覆盖单一层级的标注。</p>\n<p>Florence-2 的核心思想是：<strong>视觉理解本质上是一个从图像到结构化文本的映射问题</strong>，无论是\"这张图片描述了什么\"还是\"图中猫的位置在哪里\"，都可以用文本序列来表达答案。</p>\n<h5>核心机制：统一的序列到序列框架</h5>\n<p><strong>任务统一化设计</strong></p>\n<p>Florence-2 将所有视觉任务转化为统一的 seq2seq 格式：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L} = -\\sum_{i=1}^{|y|} \\log P_\\theta(y_i | y_{&lt;i}, x)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">x</span> 是图像与文本 prompt 的组合输入，<span class=\"kb-math kb-math-inline\">y</span> 是目标输出序列。不同任务通过不同的 prompt 触发：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>任务类型</th>\n<th>Prompt 示例</th>\n<th>输出格式</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>图像描述</td>\n<td><code>&lt;CAPTION&gt;</code></td>\n<td>自然语言文本</td>\n</tr>\n<tr>\n<td>目标检测</td>\n<td><code>&lt;OD&gt;</code></td>\n<td><code>&lt;loc_x1&gt;&lt;loc_y1&gt;&lt;loc_x2&gt;&lt;loc_y2&gt; 类别名</code></td>\n</tr>\n<tr>\n<td>视觉定位</td>\n<td><code>Locate: {phrase}</code></td>\n<td><code>&lt;loc_x1&gt;&lt;loc_y1&gt;&lt;loc_x2&gt;&lt;loc_y2&gt;</code></td>\n</tr>\n<tr>\n<td>指代分割</td>\n<td><code>&lt;REFERRING_EXPRESSION_SEGMENTATION&gt; {expr}</code></td>\n<td>多边形坐标序列</td>\n</tr>\n<tr>\n<td>OCR</td>\n<td><code>&lt;OCR&gt;</code></td>\n<td>识别文本 + 位置</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 <strong>关键创新</strong>：位置信息的文本化表示。Florence-2 将图像坐标归一化到 [0, 1000) 范围，每个整数值对应一个特殊 token <code>&lt;loc_0&gt;</code> 到 <code>&lt;loc_999&gt;</code>。这样 bounding box <code>(x1, y1, x2, y2)</code> 就变成了 4 个 token 的序列，多边形区域则是更长的坐标 token 序列。这种设计使得位置信息可以无缝融入标准的语言模型生成框架。</div>\n<p><strong>模型架构</strong></p>\n<p>Florence-2 采用 encoder-decoder 架构，由三个核心组件构成：</p>\n<ol>\n<li><strong>视觉编码器（DaViT）</strong>：采用 Dual-attention Vision Transformer，结合空间注意力和通道注意力，将输入图像编码为视觉 token 序列 <span class=\"kb-math kb-math-inline\">\\mathbf{V} \\in \\mathbb{R}^{N_v \\times D_v}</span>。</li>\n<li><strong>线性投影层 + LayerNorm</strong>：将视觉特征维度对齐到语言模型维度 <span class=\"kb-math kb-math-inline\">D</span>，得到 <span class=\"kb-math kb-math-inline\">\\mathbf{V}&#x27; \\in \\mathbb{R}^{N_v \\times D}</span>。</li>\n<li><strong>多模态 Encoder-Decoder</strong>：基于标准 Transformer 架构，encoder 接收视觉 token 与文本 prompt token 的拼接序列，decoder 自回归生成目标文本序列。权重初始化自 BART 预训练模型。</li>\n</ol>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：与 BLIP-2 等使用 Q-Former 桥接视觉和语言的方法不同，Florence-2 采用简单的线性投影 + 拼接方式，没有引入额外的跨模态对齐模块。这种简洁设计依赖于大规模多任务数据的充分训练来隐式学习跨模态对齐。</div>\n<h5>FLD-5B 数据引擎</h5>\n<p><img alt=\"Florence-2 数据引擎\" src=\"https://ar5iv.labs.arxiv.org/html/2311.06242/assets/x3.png\" />\n<em>图 3：Florence-2 数据引擎的三阶段流水线：专家模型初始标注 → 数据过滤 → 迭代精炼</em></p>\n<p>FLD-5B 的构建是 Florence-2 成功的关键。数据引擎包含三个阶段：</p>\n<p><strong>阶段一：专家模型初始标注</strong>\n- 从 ImageNet-22k、Object 365、Open Images、Conceptual Captions、LAION 等数据集收集 126M 图片\n- 使用多个专家模型为每张图片生成多粒度标注：图像描述模型生成文本、DINO 检测器生成区域框、Grounding DINO 生成短语-区域对、SAM 生成分割 mask</p>\n<p><strong>阶段二：数据过滤与增强</strong>\n- 文本过滤：基于 SpaCy 解析工具提取对象/属性/动作，过滤噪声过多的文本\n- 区域过滤：置信度阈值 + 非极大值抑制（NMS）去除低质量和冗余框</p>\n<p><strong>阶段三：迭代精炼</strong>\n- 用过滤后的数据训练初版多任务模型\n- 用该模型重新预测训练集，发现其预测质量优于原始噪声标注\n- 将更新后的标注与原始标注合并，进行下一轮训练\n- 对于初始数据不足的任务（如详细描述），利用迭代模型预训练后在小数据集上微调，再用微调模型标注全量数据</p>\n<p>最终 FLD-5B 包含三种粒度的标注：\n- <strong>文本</strong>（500M）：简短描述（~8 tokens）、详细描述（~32 tokens）、更详细描述（~71 tokens）\n- <strong>区域-文本对</strong>（1.3B）：bounding box + 类别短语/简短描述\n- <strong>文本-短语-区域三元组</strong>（3.6B）：图像描述 + 名词短语 + 对应区域框/mask</p>\n<h5>训练与推理流程</h5>\n<p><strong>预训练</strong>：\n- 所有任务混合训练，共享模型参数，使用标准交叉熵损失\n- 图像编码器初始化自 UniCL，encoder-decoder 初始化自 BART\n- 训练 3B 有效样本，先 384×384 分辨率，再高分辨率微调至 768×768\n- Base 模型 batch size 2048，Large 模型 batch size 3072</p>\n<p><strong>推理</strong>：\n- 输入图像和任务 prompt，模型自回归生成输出序列\n- 后处理：将输出中的 location token 转换回坐标，文本 token 直接作为结果</p>\n<h5>与传统方法的区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>对比维度</th>\n<th>传统专家模型</th>\n<th>Florence-2</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>模型数量</td>\n<td>每个任务一个模型</td>\n<td>单一统一模型</td>\n</tr>\n<tr>\n<td>输出格式</td>\n<td>任务特定（类别/框/mask）</td>\n<td>统一文本序列</td>\n</tr>\n<tr>\n<td>位置表示</td>\n<td>连续坐标回归</td>\n<td>离散化 location token</td>\n</tr>\n<tr>\n<td>预训练数据</td>\n<td>单任务标注</td>\n<td>多粒度 5.4B 标注</td>\n</tr>\n<tr>\n<td>参数量</td>\n<td>通常 &gt;1B（大模型）</td>\n<td>0.23B / 0.77B</td>\n</tr>\n<tr>\n<td>零样本能力</td>\n<td>无</td>\n<td>强零样本多任务能力</td>\n</tr>\n</tbody>\n</table></div>\n<p>Florence-2-L 以 0.77B 参数在 COCO Caption 上达到 135.6 CIDEr（零样本），远超 80B 参数的 Flamingo（84.3 CIDEr）；在 Flickr30k Grounding 上达到 84.4 R@1，超越 1.6B 的 Kosmos-2（78.7）约 5.7 个点。这证明了<strong>高质量多粒度数据 + 统一架构</strong>的巨大潜力。</p>",
      "quiz": {
        "q": "Florence-2 如何在统一的序列到序列框架中表示目标检测任务的 bounding box 输出？",
        "options": [
          "使用连续浮点数坐标直接回归",
          "将坐标归一化后量化为离散的 location token（如 <loc_0> 到 <loc_999>）作为文本序列生成",
          "使用额外的检测头输出框坐标，与文本生成分离",
          "将 bounding box 编码为固定长度的二进制向量"
        ],
        "answer": 1,
        "explain": "Florence-2 将归一化坐标量化为 1000 个 bin 对应的特殊 token，使位置信息可以像普通文本一样通过自回归生成，实现了检测、分割等任务与语言生成的统一。"
      }
    },
    {
      "id": "sam2",
      "num": 14,
      "name": "SAM 2",
      "fullName": "分割一切模型2 (Segment Anything Model 2)",
      "year": "2024.08",
      "org": "Meta FAIR",
      "parent": "sam",
      "paperUrl": "https://arxiv.org/abs/2408.00714",
      "projectUrl": "",
      "category": "segmentation",
      "motivation": "统一图像视频分割",
      "summary": "SAM 2 提出了统一的可提示视觉分割（Promptable Visual Segmentation）模型，通过在 SAM 架构上引入流式记忆机制（Memory Attention + Memory Bank），将图像分割能力自然扩展到视频领域，同时构建了迄今最大的视频分割数据集 SA-V（50.9K 视频、642.6K masklets），在 17 个视频分割基准上取得 SOTA，且图像分割速度比 SAM 快 6 倍、精度更高。",
      "keyPoints": [
        "<strong>统一任务定义</strong>：提出 Promptable Visual Segmentation (PVS) 任务，将图像分割（SA）和视频对象分割（VOS）统一为同一框架，支持在视频任意帧上以点击、框、掩码等方式交互式提示",
        "<strong>流式架构设计</strong>：基于 SAM 扩展，新增 Memory Attention 模块（L 层 Transformer，交叉注意力融合历史记忆）、Memory Encoder（编码预测掩码与图像特征）和 Memory Bank（FIFO 存储最近 N=6 帧 + M 个提示帧 + 对象指针）",
        "<strong>图像编码器升级</strong>：将 SAM 的 ViT 替换为 Hiera（MAE 预训练的层次化 ViT），支持多尺度特征，速度更快",
        "<strong>遮挡感知</strong>：在 Mask Decoder 中新增 occlusion prediction head，输出遮挡分数，当目标被遮挡时抑制低质量掩码进入记忆库",
        "<strong>三阶段数据引擎</strong>：Phase 1（纯 SAM 逐帧标注，37.8s/帧）→ Phase 2（SAM + SAM 2 辅助，7.4s/帧）→ Phase 3（SAM 2 主导 + 人工精修，4.5s/帧），标注效率提升 8.4 倍",
        "<strong>SA-V 数据集</strong>：50.9K 视频、642.6K masklets、35.5M 掩码，规模是现有最大 VOS 数据集的 53 倍，覆盖 47 个国家的多样化场景",
        "<strong>全面 SOTA</strong>：在 17 个 VOS 基准上全面超越先前方法；交互式视频分割比 SAM+XMem++/Cutie 组合少 3 倍交互次数；图像分割比 SAM 快 6 倍且精度更高（SA-23 上 1-click mIoU: 61.4 vs 58.1）"
      ],
      "detail": "<h5>模型架构总览</h5>\n<p><img alt=\"SAM 2 模型架构图\" src=\"https://raw.githubusercontent.com/facebookresearch/sam2/main/assets/model_diagram.png?raw=true\" />\n<em>图：SAM 2 整体架构。图像编码器逐帧提取特征，Memory Attention 模块融合历史记忆，Prompt/Mask Decoder 生成分割掩码，Memory Encoder 将结果写入 Memory Bank 供后续帧使用。</em></p>\n<p>SAM 2 的核心设计理念是：<strong>将视频视为\"带记忆的图像序列\"</strong>。当模型处理单帧图像时，它退化为类 SAM 的交互式分割器；当处理视频时，Memory Attention 模块通过交叉注意力机制融合来自 Memory Bank 的时序信息，实现跨帧追踪。</p>\n<h5>核心组件详解</h5>\n<p><strong>1. Image Encoder（图像编码器）</strong></p>\n<p>SAM 2 将原始 SAM 的 ViT-H 编码器替换为 <strong>Hiera</strong>（Ryali et al., 2023），一种通过 MAE（Masked Autoencoder）预训练的层次化视觉 Transformer。Hiera 的关键优势在于：\n- <strong>多尺度特征提取</strong>：类似 FPN 的层次结构，在不同分辨率下提取特征\n- <strong>计算效率</strong>：去除了 ViT 中不必要的组件，推理速度显著提升\n- <strong>实时处理</strong>：图像编码器对整个视频的每一帧运行（非条件化于交互），编码结果可被后续所有交互复用</p>\n<div class=\"key-point\">💡 关键：图像编码器是<strong>无条件的</strong>（不依赖提示），因此对于一段视频只需编码一次，后续的多次交互可以复用特征，这是实现实时交互的关键。</div>\n<p><strong>2. Memory Attention（记忆注意力）</strong></p>\n<p>Memory Attention 是 SAM 2 相对于 SAM 最核心的新增模块，由 <strong>L 层堆叠的 Transformer 块</strong>组成。每层包含：\n- <strong>Self-Attention</strong>：当前帧特征的自注意力\n- <strong>Cross-Attention to Memories</strong>：当前帧特征对 Memory Bank 中存储的记忆进行交叉注意力</p>\n<p>其计算过程可以表示为：</p>\n<div class=\"kb-math kb-math-display\">\\text{MemAttn}(Q, K_{\\text{mem}}, V_{\\text{mem}}) = \\text{Softmax}\\left(\\frac{Q \\cdot K_{\\text{mem}}^T}{\\sqrt{d}}\\right) V_{\\text{mem}}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">Q</span> 来自当前帧的图像特征，<span class=\"kb-math kb-math-inline\">K_{\\text{mem}}</span> 和 <span class=\"kb-math kb-math-inline\">V_{\\text{mem}}</span> 来自 Memory Bank 中存储的历史帧空间特征和对象指针。</p>\n<p>经过 Memory Attention 处理后的特征被称为 <strong>conditioned features</strong>，它们融合了当前帧的视觉信息和历史帧的时序上下文。</p>\n<p><strong>3. Prompt Encoder &amp; Mask Decoder（提示编码器与掩码解码器）</strong></p>\n<p>基本沿用 SAM 的设计：\n- <strong>Prompt Encoder</strong>：将点击（正/负）、边界框、掩码等提示编码为 token\n- <strong>Mask Decoder</strong>：轻量级 Transformer 解码器，融合 conditioned features 和 prompt tokens，输出分割掩码</p>\n<p><strong>关键改进 — 遮挡预测头（Occlusion Head）</strong>：</p>\n<div class=\"kb-math kb-math-display\">\\text{occ\\_score} = \\sigma(W_{\\text{occ}} \\cdot h_{\\text{IoU}} + b_{\\text{occ}})</div>\n<p>在视频场景中，目标物体可能被遮挡或离开画面。SAM 2 在 IoU 预测头旁新增了一个 occlusion prediction head，输出当前帧目标是否被遮挡的概率。当遮挡分数较高时：\n- 该帧的预测掩码<strong>不会被添加到 Memory Bank</strong>，避免低质量记忆污染后续预测\n- 输出的掩码可能为空（表示目标不可见）</p>\n<p><strong>4. Memory Encoder（记忆编码器）</strong></p>\n<p>Memory Encoder 将当前帧的预测结果编码为记忆表示，供后续帧使用：</p>\n<div class=\"kb-math kb-math-display\">\\text{Memory}_t = \\text{Conv}(\\text{ImageFeature}_t) + \\text{Conv}(\\text{Mask}_t)</div>\n<p>具体来说，它将 Image Encoder 输出的<strong>未经条件化的特征图</strong>（不含提示信息）与当前帧预测掩码通过轻量级卷积层融合，生成空间维度的记忆特征。</p>\n<p><strong>5. Memory Bank（记忆库）</strong></p>\n<p>Memory Bank 是 SAM 2 的\"时序记忆系统\"，存储三类信息：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>记忆类型</th>\n<th>数量</th>\n<th>来源</th>\n<th>说明</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Recent Memories</td>\n<td>N=6</td>\n<td>最近 N 帧的预测</td>\n<td>FIFO 队列，保持时序局部性</td>\n</tr>\n<tr>\n<td>Prompted Memories</td>\n<td>M（1-2）</td>\n<td>用户交互帧</td>\n<td>高质量锚点，长期保留</td>\n</tr>\n<tr>\n<td>Object Pointers</td>\n<td>每帧 1 个</td>\n<td>Mask Decoder 输出 token</td>\n<td>高维语义向量，编码目标外观</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"warn-box\">⚠️ 注意：Object Pointers 是从 Mask Decoder 的输出 token 中提取的高维向量（类似 SAM 中的 IoU token），它们编码了目标在每帧中的高层语义信息，作为 Memory Attention 中交叉注意力的额外 key-value 对参与计算。</div>\n<h5>训练策略</h5>\n<p>SAM 2 的训练采用<strong>模拟交互式提示</strong>的策略：</p>\n<pre><code class=\"language-python\"># SAM 2 训练伪代码\nfor video_clip in training_data:  # 采样 8 帧的视频片段\n    # 随机选择 1-2 帧作为&quot;交互帧&quot;\n    prompted_frames = random_select(video_clip, k=2)\n\n    for frame_t in video_clip:\n        # 1. Image Encoder 提取特征\n        features_t = image_encoder(frame_t)\n\n        # 2. Memory Attention 融合历史记忆\n        cond_features_t = memory_attention(features_t, memory_bank)\n\n        if frame_t in prompted_frames:\n            # 3a. 交互帧：模拟用户点击（基于GT与预测的误差区域采样）\n            prompt = simulate_click(gt_mask, pred_mask)\n            mask_t = mask_decoder(cond_features_t, prompt)\n        else:\n            # 3b. 非交互帧：无提示，纯传播\n            mask_t = mask_decoder(cond_features_t, no_prompt)\n\n        # 4. 计算损失（Focal + Dice Loss）\n        loss += focal_loss(mask_t, gt_t) + dice_loss(mask_t, gt_t)\n\n        # 5. 更新 Memory Bank\n        if not is_occluded(mask_t):\n            memory_bank.update(memory_encoder(features_t, mask_t))\n</code></pre>\n<p>训练时在 8 帧序列上展开，最多模拟 2 次交互式校正（iterative refinement），使用 Focal Loss + Dice Loss 监督。</p>\n<h5>数据引擎与 SA-V 数据集</h5>\n<p>SAM 2 的数据引擎采用<strong>模型-标注员协同的三阶段迭代</strong>策略，逐步提升标注效率：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>阶段</th>\n<th>工具</th>\n<th>每帧耗时</th>\n<th>加速比</th>\n<th>说明</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Phase 1</td>\n<td>SAM（逐帧）</td>\n<td>37.8s</td>\n<td>1×</td>\n<td>使用 SAM 在每帧上独立标注，无时序传播</td>\n</tr>\n<tr>\n<td>Phase 2</td>\n<td>SAM + SAM 2 Mask</td>\n<td>7.4s</td>\n<td>5.1×</td>\n<td>SAM 2 提供初始掩码传播，标注员用 SAM 精修</td>\n</tr>\n<tr>\n<td>Phase 3</td>\n<td>SAM 2 完整版</td>\n<td>4.5s</td>\n<td>8.4×</td>\n<td>SAM 2 主导分割，标注员仅需少量点击校正</td>\n</tr>\n</tbody>\n</table></div>\n<p>每个阶段结束后，收集的数据用于重新训练 SAM 2 模型，形成数据飞轮效应。此外，还通过<strong>自动 masklet 生成</strong>进一步扩充数据：对未标注的视频帧运行 SAM 生成掩码提议，再用 SAM 2 传播到全视频，经过质量过滤后加入训练集。</p>\n<p>最终构建的 <strong>SA-V 数据集</strong>：\n- <strong>50.9K 视频</strong>，平均 14 秒，来自 47 个国家\n- <strong>642.6K masklets</strong>（视频级对象轨迹）\n- <strong>35.5M 掩码</strong>（帧级），是现有最大 VOS 数据集的 53 倍\n- 涵盖整体对象和部件级标注，场景多样性远超 DAVIS/YouTube-VOS 等传统数据集</p>\n<h5>与 SAM 的关键区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>SAM</th>\n<th>SAM 2</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>输入</td>\n<td>单张图像</td>\n<td>图像或视频（流式处理）</td>\n</tr>\n<tr>\n<td>编码器</td>\n<td>ViT-H（MAE）</td>\n<td>Hiera（MAE，层次化）</td>\n</tr>\n<tr>\n<td>时序建模</td>\n<td>无</td>\n<td>Memory Attention + Memory Bank</td>\n</tr>\n<tr>\n<td>遮挡处理</td>\n<td>无</td>\n<td>Occlusion Head 抑制低质量记忆</td>\n</tr>\n<tr>\n<td>推理速度</td>\n<td>1×</td>\n<td>~6× 更快（图像任务）</td>\n</tr>\n<tr>\n<td>训练数据</td>\n<td>SA-1B（11M 图像）</td>\n<td>SA-1B + SA-V（50.9K 视频）+ VOS 数据集</td>\n</tr>\n</tbody>\n</table></div>\n<h5>实验结果亮点</h5>\n<p><strong>视频分割（交互式）</strong>：在 9 个零样本视频数据集上，SAM 2 仅需 <strong>3 次点击</strong>即可达到 SAM+XMem++/Cutie 组合 <strong>9 次点击</strong>的效果，交互效率提升 3 倍。</p>\n<p><strong>VOS 基准（首帧掩码）</strong>：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>MOSE <span class=\"kb-math kb-math-inline\">\\mathcal{J\\&amp;F}</span></th>\n<th>DAVIS <span class=\"kb-math kb-math-inline\">\\mathcal{J\\&amp;F}</span></th>\n<th>SA-V val <span class=\"kb-math kb-math-inline\">\\mathcal{J\\&amp;F}</span></th>\n<th>SA-V test <span class=\"kb-math kb-math-inline\">\\mathcal{J\\&amp;F}</span></th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Cutie-base+</td>\n<td>71.7</td>\n<td>88.1</td>\n<td>61.3</td>\n<td>62.8</td>\n</tr>\n<tr>\n<td>SAM 2 (Hiera-B+)</td>\n<td>75.8</td>\n<td>90.9</td>\n<td>73.6</td>\n<td>74.1</td>\n</tr>\n<tr>\n<td><strong>SAM 2 (Hiera-L)</strong></td>\n<td><strong>77.2</strong></td>\n<td><strong>91.6</strong></td>\n<td><strong>75.6</strong></td>\n<td><strong>77.6</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>图像分割</strong>：在 SA-23 基准上，SAM 2 (Hiera-L) 1-click mIoU 达到 <strong>61.4</strong>，优于 SAM (ViT-H) 的 58.1，同时推理速度快 <strong>6 倍</strong>。</p>\n<p><strong>数据消融</strong>：\n- 仅用 VOS 数据训练时，零样本性能仅 59.7 <span class=\"kb-math kb-math-inline\">\\mathcal{J\\&amp;F}</span>\n- 加入 SA-V 数据引擎数据后，零样本性能提升 <strong>+12.1%</strong> 至 71.8\n- 混合所有数据（VOS + SA-1B + SA-V）获得最佳综合性能</p>",
      "quiz": {
        "q": "SAM 2 的 Memory Bank 中不包含以下哪种类型的记忆？",
        "options": [
          "最近 N 帧的空间记忆特征（Recent Memories）",
          "用户交互帧的记忆特征（Prompted Memories）",
          "从 Mask Decoder 输出 token 提取的对象指针（Object Pointers）",
          "Image Encoder 的原始多尺度特征图（Raw Feature Maps）"
        ],
        "answer": 3,
        "explain": "Memory Bank 存储三类信息：Recent Memories（最近 N 帧经 Memory Encoder 编码的特征）、Prompted Memories（用户交互帧的编码特征）和 Object Pointers（Mask Decoder 输出的高维语义向量）。Image Encoder 的原始特征图不直接存入 Memory Bank，而是经过 Memory Encoder 处理后才写入。"
      }
    },
    {
      "id": "vision_mamba",
      "num": 15,
      "name": "Vision Mamba",
      "fullName": "双向状态空间视觉表征学习 (Vision Mamba)",
      "year": "2024.01",
      "org": "华中科技大学 / 地平线机器人 / 北京智源人工智能研究院",
      "parent": "swin",
      "paperUrl": "https://arxiv.org/abs/2401.09417",
      "projectUrl": "",
      "category": "foundation",
      "motivation": "SSM架构线性复杂度",
      "summary": "Vision Mamba（Vim）将 Mamba 的选择性状态空间模型（SSM）引入计算机视觉，提出双向 SSM 编码器处理图像 patch 序列，在保持与 ViT 相当性能的同时实现了序列长度的线性计算复杂度，显著降低了高分辨率图像处理的计算和显存开销。",
      "keyPoints": [
        "首个纯 SSM 架构的通用视觉骨干网络，不使用任何注意力机制",
        "双向状态空间模型（Bidirectional SSM）：对 patch 序列同时进行前向和后向扫描，弥补单向 SSM 缺乏全局上下文的不足",
        "类 ViT 的 patch 嵌入方式：图像分块 → 线性投影 + 位置编码 + CLS token",
        "数据依赖的 SSM 参数：<span class=\"kb-math kb-math-inline\">\\mathbf{B}</span>、<span class=\"kb-math kb-math-inline\">\\mathbf{C}</span>、<span class=\"kb-math kb-math-inline\">\\boldsymbol{\\Delta}</span> 均由输入动态生成（继承 Mamba 的选择性机制）",
        "线性复杂度 <span class=\"kb-math kb-math-inline\">O(M)</span>：相比 ViT 的 <span class=\"kb-math kb-math-inline\">O(M^2)</span> 自注意力，序列长度增长时计算量线性增长",
        "两种模型规格：Vim-Ti（Tiny）和 Vim-S（Small），分别对标 DeiT-Ti 和 DeiT-S",
        "在 ImageNet 分类、COCO 检测/分割、ADE20K 语义分割等任务上验证有效性"
      ],
      "detail": "<p><img alt=\"Vision Mamba 整体架构图\" src=\"https://arxiv.org/html/2401.09417v1/x2.png\" />\n<em>图：Vision Mamba（Vim）模型总览。输入图像被分割为 patch 并投影为 token 序列，经过 L 层 Vim 编码器处理后，通过 CLS token 输出分类结果。Vim 编码器的核心是双向 SSM 处理（前向 + 后向）。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># Vision Mamba Block (Algorithm 1)\ndef vim_block(T_prev, norm, linear_x, linear_z, linear_T,\n              conv1d_fwd, conv1d_bwd, ssm_params_fwd, ssm_params_bwd):\n    # Step 1: 归一化\n    T_norm = norm(T_prev)                        # (B, M, D)\n\n    # Step 2: 双分支线性投影\n    x = linear_x(T_norm)                         # (B, M, E)\n    z = linear_z(T_norm)                         # (B, M, E)\n\n    y_list = []\n    for direction in ['forward', 'backward']:\n        conv1d = conv1d_fwd if direction == 'forward' else conv1d_bwd\n        params = ssm_params_fwd if direction == 'forward' else ssm_params_bwd\n\n        # Step 3: 1D 卷积 + SiLU 激活\n        x_prime = silu(conv1d(x))                # (B, M, E)\n\n        # Step 4: 数据依赖的 SSM 参数\n        B = linear_B(x_prime)                    # (B, M, N)\n        C = linear_C(x_prime)                    # (B, M, N)\n        Delta = softplus(linear_delta(x_prime) + param_delta)  # (B, M, E)\n\n        # Step 5: 离散化\n        A_bar = Delta ⊗ param_A                  # (B, M, E, N)\n        B_bar = Delta ⊗ B                        # (B, M, E, N)\n\n        # Step 6: SSM 递推\n        y = SSM(A_bar, B_bar, C)(x_prime)        # (B, M, E)\n        y_list.append(y)\n\n    # Step 7: 门控融合 + 残差连接\n    y_fwd_gated = y_list[0] * silu(z)            # (B, M, E)\n    y_bwd_gated = y_list[1] * silu(z)            # (B, M, E)\n    T_out = linear_T(y_fwd_gated + y_bwd_gated) + T_prev  # (B, M, D)\n    return T_out\n</code></pre>\n<h5>动机与背景</h5>\n<p>Vision Transformer（ViT）凭借自注意力机制在视觉任务中取得了巨大成功，但其核心瓶颈在于自注意力的 <strong>二次复杂度</strong>——对于长度为 <span class=\"kb-math kb-math-inline\">M</span> 的序列，计算和显存开销为 <span class=\"kb-math kb-math-inline\">O(M^2)</span>。当处理高分辨率图像（如 1248×1248 像素）时，patch 序列长度可达数千甚至上万，导致 ViT 的计算成本急剧膨胀。</p>\n<p>与此同时，状态空间模型（SSM）在 NLP 领域展现了处理长序列的强大能力。特别是 <strong>Mamba</strong> 通过引入数据依赖的选择性机制，在语言建模任务上达到了与 Transformer 相当的性能，同时保持了序列长度的线性复杂度。然而，Mamba 是为 1D 序列设计的，直接应用于 2D 图像面临两个关键挑战：</p>\n<ol>\n<li><strong>空间感知不足</strong>：图像具有 2D 空间结构，而标准 Mamba 仅处理 1D 序列</li>\n<li><strong>单向建模局限</strong>：标准 Mamba 采用因果（单向）扫描，无法同时捕获前后文信息</li>\n</ol>\n<h5>核心机制：双向状态空间模型</h5>\n<p><strong>SSM 基础公式</strong></p>\n<p>Vision Mamba 建立在连续状态空间模型之上。连续系统将输入信号 <span class=\"kb-math kb-math-inline\">x(t) \\in \\mathbb{R}</span> 通过隐状态 <span class=\"kb-math kb-math-inline\">h(t) \\in \\mathbb{R}^N</span> 映射到输出 <span class=\"kb-math kb-math-inline\">y(t) \\in \\mathbb{R}</span>：</p>\n<div class=\"kb-math kb-math-display\">h&#x27;(t) = \\mathbf{A}h(t) + \\mathbf{B}x(t)</div>\n<div class=\"kb-math kb-math-display\">y(t) = \\mathbf{C}h(t)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\mathbf{A} \\in \\mathbb{R}^{N \\times N}</span> 是状态转移矩阵，<span class=\"kb-math kb-math-inline\">\\mathbf{B} \\in \\mathbb{R}^{N \\times 1}</span>、<span class=\"kb-math kb-math-inline\">\\mathbf{C} \\in \\mathbb{R}^{1 \\times N}</span> 是投影参数。</p>\n<p>通过零阶保持（ZOH）离散化，引入时间步长 <span class=\"kb-math kb-math-inline\">\\boldsymbol{\\Delta}</span>：</p>\n<div class=\"kb-math kb-math-display\">\\overline{\\mathbf{A}} = \\exp(\\boldsymbol{\\Delta} \\mathbf{A})</div>\n<div class=\"kb-math kb-math-display\">\\overline{\\mathbf{B}} = (\\boldsymbol{\\Delta} \\mathbf{A})^{-1}(\\exp(\\boldsymbol{\\Delta} \\mathbf{A}) - \\mathbf{I}) \\cdot \\boldsymbol{\\Delta} \\mathbf{B}</div>\n<p>离散递推形式为：</p>\n<div class=\"kb-math kb-math-display\">h_t = \\overline{\\mathbf{A}} h_{t-1} + \\overline{\\mathbf{B}} x_t, \\quad y_t = \\mathbf{C} h_t</div>\n<div class=\"key-point\">💡 <strong>关键直觉</strong>：SSM 的递推形式类似 RNN，每一步只需 <span class=\"kb-math kb-math-inline\">O(1)</span> 计算（给定隐状态维度），因此处理长度为 <span class=\"kb-math kb-math-inline\">M</span> 的序列总复杂度为 <span class=\"kb-math kb-math-inline\">O(M)</span>，而非注意力的 <span class=\"kb-math kb-math-inline\">O(M^2)</span>。</div>\n<p><strong>图像 Patch 化与嵌入</strong></p>\n<p>与 ViT 类似，Vim 首先将输入图像 <span class=\"kb-math kb-math-inline\">\\mathbf{t} \\in \\mathbb{R}^{H \\times W \\times C}</span> 分割为 <span class=\"kb-math kb-math-inline\">J</span> 个大小为 <span class=\"kb-math kb-math-inline\">P \\times P</span> 的 patch，然后通过线性投影和位置编码生成 token 序列：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{T}_0 = [\\mathbf{t}_{cls}; \\mathbf{t}_p^1 \\mathbf{W}; \\mathbf{t}_p^2 \\mathbf{W}; \\cdots; \\mathbf{t}_p^J \\mathbf{W}] + \\mathbf{E}_{pos}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\mathbf{W} \\in \\mathbb{R}^{(P^2 \\cdot C) \\times D}</span> 是可学习的投影矩阵，<span class=\"kb-math kb-math-inline\">\\mathbf{E}_{pos} \\in \\mathbb{R}^{(J+1) \\times D}</span> 是位置编码，<span class=\"kb-math kb-math-inline\">\\mathbf{t}_{cls}</span> 是可学习的分类 token。</p>\n<p><strong>双向 Vim Block</strong></p>\n<p>Vim Block 是整个架构的核心创新。与标准 Mamba 的单向扫描不同，Vim Block 对 token 序列同时进行 <strong>前向扫描</strong> 和 <strong>后向扫描</strong>，确保每个 token 都能感知到序列中所有其他 token 的信息：</p>\n<ol>\n<li><strong>归一化与投影</strong>：输入 <span class=\"kb-math kb-math-inline\">\\mathbf{T}_{l-1}</span> 经过 LayerNorm 后，分别投影为主分支 <span class=\"kb-math kb-math-inline\">\\mathbf{x}</span> 和门控分支 <span class=\"kb-math kb-math-inline\">\\mathbf{z}</span></li>\n<li><strong>双向 SSM 处理</strong>：对 <span class=\"kb-math kb-math-inline\">\\mathbf{x}</span> 分别进行前向和后向的 Conv1d → SiLU → SSM 处理，每个方向有独立的参数</li>\n<li><strong>数据依赖参数</strong>：<span class=\"kb-math kb-math-inline\">\\mathbf{B}_o</span>、<span class=\"kb-math kb-math-inline\">\\mathbf{C}_o</span>、<span class=\"kb-math kb-math-inline\">\\boldsymbol{\\Delta}_o</span> 均从输入 <span class=\"kb-math kb-math-inline\">\\mathbf{x}&#x27;_o</span> 动态生成，使模型能根据输入内容选择性地关注或忽略信息</li>\n<li><strong>门控融合</strong>：前向和后向的输出分别与 <span class=\"kb-math kb-math-inline\">\\text{SiLU}(\\mathbf{z})</span> 逐元素相乘（门控），然后相加</li>\n<li><strong>残差连接</strong>：最终通过线性投影映射回 <span class=\"kb-math kb-math-inline\">D</span> 维并加上残差</li>\n</ol>\n<div class=\"kb-math kb-math-display\">\\mathbf{T}_l = \\text{Linear}^{\\mathbf{T}}(\\mathbf{y}&#x27;_{forward} + \\mathbf{y}&#x27;_{backward}) + \\mathbf{T}_{l-1}</div>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：双向扫描是 Vim 区别于原始 Mamba 的核心设计。单向 SSM 在处理图像时，后面的 patch 无法感知前面的信息（或反之），而图像的空间关系是非因果的，双向扫描正好弥补了这一缺陷。</div>\n<h5>架构配置与效率分析</h5>\n<p>Vim 的超参数包括：\n- <span class=\"kb-math kb-math-inline\">\\mathtt{L}</span>：Vim Block 的层数\n- <span class=\"kb-math kb-math-inline\">\\mathtt{D}</span>：隐藏状态维度\n- <span class=\"kb-math kb-math-inline\">\\mathtt{E}</span>：扩展状态维度（通常 <span class=\"kb-math kb-math-inline\">E = 2D</span>）\n- <span class=\"kb-math kb-math-inline\">\\mathtt{N}</span>：SSM 维度</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>模型</th>\n<th>层数 L</th>\n<th>隐藏维度 D</th>\n<th>参数量</th>\n<th>ImageNet Top-1</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Vim-Ti</td>\n<td>24</td>\n<td>192</td>\n<td>7M</td>\n<td>76.1%</td>\n</tr>\n<tr>\n<td>Vim-S</td>\n<td>24</td>\n<td>384</td>\n<td>26M</td>\n<td>80.5%</td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>效率优势</strong>：\n- <strong>计算复杂度</strong>：Vim 的 SSM 递推为 <span class=\"kb-math kb-math-inline\">O(M)</span>，而 ViT 自注意力为 <span class=\"kb-math kb-math-inline\">O(M^2)</span>。当图像分辨率从 224 增加到 1248 时，Vim 的计算量仅线性增长，而 DeiT 的计算量增长了约 8.5 倍\n- <strong>显存效率</strong>：Vim 在推理时显存占用远低于 DeiT，尤其在高分辨率场景下优势更加明显（1248×1248 时节省约 86.8% GPU 显存）\n- <strong>推理速度</strong>：在 batch size=1 的 1248×1248 图像推理中，Vim-Ti 比 DeiT-Ti 快 2.8 倍</p>\n<h5>与传统方法的区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>ViT / DeiT</th>\n<th>Swin Transformer</th>\n<th>Vision Mamba (Vim)</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>核心机制</td>\n<td>全局自注意力</td>\n<td>窗口注意力 + 移位</td>\n<td>双向状态空间模型</td>\n</tr>\n<tr>\n<td>序列复杂度</td>\n<td><span class=\"kb-math kb-math-inline\">O(M^2)</span></td>\n<td><span class=\"kb-math kb-math-inline\">O(M)</span>（窗口内）</td>\n<td><span class=\"kb-math kb-math-inline\">O(M)</span></td>\n</tr>\n<tr>\n<td>全局感受野</td>\n<td>✅ 每层全局</td>\n<td>❌ 需跨窗口交互</td>\n<td>✅ 通过 SSM 递推</td>\n</tr>\n<tr>\n<td>位置编码</td>\n<td>绝对/相对</td>\n<td>相对位置偏置</td>\n<td>绝对位置编码</td>\n</tr>\n<tr>\n<td>高分辨率扩展</td>\n<td>显存爆炸</td>\n<td>线性扩展</td>\n<td>线性扩展</td>\n</tr>\n<tr>\n<td>建模方式</td>\n<td>无序集合</td>\n<td>局部窗口</td>\n<td>序列递推（双向）</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 <strong>核心优势总结</strong>：Vim 同时具备了 ViT 的全局感受野和 Swin 的线性复杂度，是首个纯 SSM 架构的通用视觉骨干，为视觉模型提供了注意力机制之外的新范式。</div>",
      "quiz": {
        "q": "Vision Mamba 引入双向 SSM 的主要目的是什么？",
        "options": [
          "加速模型训练收敛",
          "弥补单向 SSM 无法同时捕获前后文信息的缺陷，适应图像的非因果空间关系",
          "减少模型参数量",
          "替代位置编码以增强空间感知能力"
        ],
        "answer": 1,
        "explain": "图像 patch 之间的空间关系是非因果的，单向 SSM 只能从一个方向扫描，后方 patch 无法感知前方信息。双向扫描使每个 token 都能聚合来自两个方向的全局上下文。"
      }
    },
    {
      "id": "lookwhere",
      "num": 16,
      "name": "LookWhere",
      "fullName": "自监督自适应视觉识别 (LookWhere)",
      "year": "2025.05",
      "org": "多机构",
      "parent": "dinov2",
      "paperUrl": "https://arxiv.org/abs/2505.18051",
      "projectUrl": "",
      "category": "representation",
      "motivation": "自适应计算动态分配",
      "summary": "LookWhere 提出了 selector-extractor 双模块架构，通过自监督 what-where 蒸馏从 DINOv2 教师模型中学习\"在哪里计算\"和\"看到什么\"，实现了任务通用的自适应计算——在高分辨率交通标志识别中以 34× FLOPs 削减和 6× 推理加速达到接近 SOTA 精度，在 ImageNet 上以 1.36× 加速同时提升精度。",
      "keyPoints": [
        "<strong>Selector-Extractor 双模块架构</strong>：selector 处理低分辨率输入预测 2D 重要性图（where），extractor 仅处理被选中的高分辨率 patch（what）",
        "<strong>What-Where 蒸馏</strong>：三个损失函数联合训练——<span class=\"kb-math kb-math-inline\">L_{\\text{cls}}</span>（CLS token MSE）、<span class=\"kb-math kb-math-inline\">L_{\\text{pat}}</span>（patch token MSE）、<span class=\"kb-math kb-math-inline\">L_{\\text{map}}</span>（attention map KL 散度）",
        "<strong>任务通用预训练 + 仅 extractor 微调</strong>：selector 预训练后冻结，仅微调 extractor 即可迁移到下游任务",
        "<strong>纯标准 Transformer 操作</strong>：不依赖聚类算法或自定义 CUDA kernel，在现有 GPU 上高效加速",
        "<strong>高分辨率空间稀疏场景优势显著</strong>：Traffic Signs（34× FLOPs↓, 6× 速度↑）、CUB 鸟类细粒度识别、Billiard Balls 空间推理",
        "<strong>标准基准同样有效</strong>：ImageNet-1K 分类（ViT-S 9.5K im/s, 80.3% Top-1）、ADE20K 分割（≥2× 速度优于 DTEM）"
      ],
      "detail": "<p><img alt=\"LookWhere 架构总览\" src=\"https://arxiv.org/abs/2505.18051\" />\n<em>图：LookWhere 的 selector-extractor 架构示意。Selector 在低分辨率输入上预测 patch 重要性图，选出 top-k 个 patch 位置；Extractor 仅在这些高分辨率 patch 上进行全深度 Transformer 计算，同时融合低分辨率全局上下文 token。（详见论文 Figure 2）</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># LookWhere 推理流程\ndef lookwhere_forward(image, selector, extractor, k):\n    # Step 1: Selector 在低分辨率上预测重要性图\n    x_low = patchify(image, resolution=R_low)          # N_low × N_low patches\n    features_low = selector.forward_layers(x_low, L_low)  # 前 L_low 层\n    importance_map = selector.predict_map(features_low)    # N_high × N_high 的 2D map\n\n    # Step 2: 选择 top-k 个高分辨率 patch\n    top_k_indices = topk(importance_map.flatten(), k)\n    x_high_selected = patchify(image, resolution=R_high)[top_k_indices]  # k 个 patch\n\n    # Step 3: Extractor 处理选中 patch + 低分辨率全局 token\n    global_tokens = features_low  # 来自 selector 的低分辨率 token\n    output = extractor([cls_token, global_tokens, x_high_selected])  # 全深度 ViT\n\n    return output.cls_token  # 用于下游任务\n</code></pre>\n<h5>动机与背景</h5>\n<p>Vision Transformer (ViT) 的计算量随 token 数量二次增长，在高分辨率输入（如 1000×1000 px 的交通标志图像）下变得极其昂贵。现有自适应计算方法分为两类，各有缺陷：</p>\n<ol>\n<li>\n<p><strong>Token Reduction（逐层削减）</strong>：PiToMe、DTEM、ATC 等方法在每一层逐步合并或丢弃 token。问题在于第一层仍需处理所有 token，在高分辨率下依然昂贵。且它们依赖聚类算法（如二部匹配），虽然 FLOPs 低但在 GPU 上实际速度慢。</p>\n</li>\n<li>\n<p><strong>Token Selection（输入选择）</strong>：DPS、IPS 等方法选择输入 patch 子集。问题在于需要复杂的离散优化（REINFORCE 梯度估计、多阶段训练），且每个任务都需要重新训练 selector。</p>\n</li>\n</ol>\n<div class=\"key-point\">💡 关键洞察：LookWhere 的核心思想是将\"在哪里计算\"和\"计算什么\"解耦为两个独立模块，并通过自监督蒸馏实现任务通用的预训练，从而避免了逐任务优化 selector 的高昂代价。</div>\n<h5>核心机制：Selector-Extractor 架构</h5>\n<p><strong>Selector（低分辨率定位器）</strong>：</p>\n<p>Selector 是 DINOv2 ViT 的前 <span class=\"kb-math kb-math-inline\">L_{\\text{low}}</span> 层（默认 <span class=\"kb-math kb-math-inline\">L_{\\text{low}}=3</span>），输入分辨率为 <span class=\"kb-math kb-math-inline\">R_{\\text{low}}=154</span> px。它输出 <span class=\"kb-math kb-math-inline\">N_{\\text{low}} \\times N_{\\text{low}}</span> 个 token 特征，然后通过一个轻量级线性层将每个低分辨率 token 映射到对应的高分辨率区域，生成 <span class=\"kb-math kb-math-inline\">N_{\\text{high}} \\times N_{\\text{high}}</span> 的重要性图。选取 top-k 个位置作为高分辨率 patch 的采样点。</p>\n<div class=\"warn-box\">⚠️ 注意：Selector 在微调阶段完全冻结，不针对特定任务更新。这使得同一个 selector 可以泛化到交通标志识别、鸟类分类、语义分割等不同任务。</div>\n<p><strong>Extractor（稀疏高分辨率计算器）</strong>：</p>\n<p>Extractor 是完整深度的 ViT（如 ViT-B 的全部 12 层），但输入仅包含：\n- 1 个 CLS token\n- <span class=\"kb-math kb-math-inline\">N_{\\text{low}}^2</span> 个来自 selector 的低分辨率全局 token（提供全局上下文）\n- <span class=\"kb-math kb-math-inline\">k</span> 个被选中的高分辨率 patch token</p>\n<p>总 token 数为 <span class=\"kb-math kb-math-inline\">1 + N_{\\text{low}}^2 + k</span>，远小于完整高分辨率的 <span class=\"kb-math kb-math-inline\">N_{\\text{high}}^2</span> 个 token。例如在 Traffic Signs 实验中，<span class=\"kb-math kb-math-inline\">k=128</span> 而 <span class=\"kb-math kb-math-inline\">N_{\\text{high}}^2=4,900</span>，仅处理约 2.6% 的高分辨率 token。</p>\n<h5>训练流程：What-Where 蒸馏</h5>\n<p>预训练阶段使用 DINOv2 作为教师模型，通过三个损失函数联合优化 selector 和 extractor：</p>\n<p><strong>1. CLS Token 蒸馏（What — 全局表征）</strong>：</p>\n<div class=\"kb-math kb-math-display\">L_{\\text{cls}} = \\text{MSE}(\\hat{z}_{\\text{cls}}, z_{\\text{cls}})</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\hat{z}_{\\text{cls}}</span> 是 extractor 的 CLS token 输出，<span class=\"kb-math kb-math-inline\">z_{\\text{cls}}</span> 是教师模型处理完整高分辨率输入后的 CLS token。这确保稀疏计算的全局表征逼近完整计算。</p>\n<p><strong>2. Patch Token 蒸馏（What — 局部表征）</strong>：</p>\n<div class=\"kb-math kb-math-display\">L_{\\text{pat}} = \\text{MSE}(\\hat{z}_{\\text{pat}}, z_{\\text{pat}})</div>\n<p>仅在被选中的 <span class=\"kb-math kb-math-inline\">k</span> 个 patch 位置上计算 MSE，确保局部特征也准确。这对语义分割等需要像素级预测的任务至关重要。</p>\n<p><strong>3. Attention Map 蒸馏（Where — 选择策略）</strong>：</p>\n<div class=\"kb-math kb-math-display\">L_{\\text{map}} = \\text{KL}(\\hat{A}_{\\text{high}}, A_{\\text{high}})</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">A_{\\text{high}}</span> 是教师模型最后一层自注意力图的平均（跨所有 head），表示教师\"关注哪里\"。<span class=\"kb-math kb-math-inline\">\\hat{A}_{\\text{high}}</span> 是 selector 预测的重要性图。通过 KL 散度训练 selector 模仿教师的注意力分布。</p>\n<p>总损失为：</p>\n<div class=\"kb-math kb-math-display\">L = \\lambda_{\\text{cls}} L_{\\text{cls}} + \\lambda_{\\text{pat}} L_{\\text{pat}} + \\lambda_{\\text{map}} L_{\\text{map}}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\lambda_{\\text{cls}} = \\lambda_{\\text{pat}} = 1</span>，<span class=\"kb-math kb-math-inline\">\\lambda_{\\text{map}} = 0.1</span>。</p>\n<div class=\"key-point\">💡 关键设计：预训练时 <span class=\"kb-math kb-math-inline\">k</span> 在 <span class=\"kb-math kb-math-inline\">[16, 128]</span> 范围内随机采样（总 token 数 <span class=\"kb-math kb-math-inline\">N_{\\text{high}}^2 = 1369</span>），使模型学会在不同稀疏度下都能有效工作。</div>\n<p><strong>微调阶段</strong>：仅更新 extractor 参数和任务头，selector 完全冻结。这极大简化了下游适配流程。</p>\n<h5>与现有方法的关键区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>Token Reduction (PiToMe/DTEM)</th>\n<th>Token Selection (DPS/IPS)</th>\n<th><strong>LookWhere</strong></th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>第一层是否处理所有 token</td>\n<td>✅ 是</td>\n<td>❌ 否</td>\n<td>❌ 否</td>\n</tr>\n<tr>\n<td>是否需要逐任务训练 selector</td>\n<td>—</td>\n<td>✅ 是</td>\n<td>❌ 否（冻结）</td>\n</tr>\n<tr>\n<td>是否依赖非标准 GPU 操作</td>\n<td>✅ 聚类算法</td>\n<td>✅ REINFORCE</td>\n<td>❌ 纯 ViT 操作</td>\n</tr>\n<tr>\n<td>预训练方式</td>\n<td>无</td>\n<td>无</td>\n<td>自监督蒸馏</td>\n</tr>\n<tr>\n<td>高分辨率训练内存</td>\n<td>高</td>\n<td>中</td>\n<td><strong>低（&gt;5× 削减）</strong></td>\n</tr>\n</tbody>\n</table></div>\n<h5>实验亮点</h5>\n<p><strong>ImageNet-1K 分类</strong>（224² px，ViT-B）：LookWhere（k=128）达到 83.0% Top-1，3.2K im/s，14.8G FLOPs，优于所有自适应计算方法。ViT-S 版本达到 9.5K im/s，是第二快方法 DTEM 的 1.36×。</p>\n<p><strong>ADE20K 语义分割</strong>：在三个计算级别上均优于 DTEM，且速度 ≥2× 更快（如 k=512 时 mIoU 40.6% vs DTEM 38.9%，速度 2.0K vs 0.7K im/s）。</p>\n<p><strong>Traffic Signs</strong>（994² px）：仅处理 10% 高分辨率 token，LookWhere 以 34× FLOPs 削减和 6× 推理加速接近 IPS 的精度（差 1.1%），同时训练成本仅为 IPS 的 1/13。</p>\n<p><strong>消融实验关键发现</strong>：\n- 三个蒸馏损失缺一不可：去掉 <span class=\"kb-math kb-math-inline\">L_{\\text{map}}</span> 后 selector 无法有效定位；去掉 <span class=\"kb-math kb-math-inline\">L_{\\text{pat}}</span> 后分割性能显著下降\n- 低分辨率全局 token 的共享对 extractor 性能至关重要，提供了被丢弃 patch 的上下文信息\n- Selector 深度 <span class=\"kb-math kb-math-inline\">L_{\\text{low}}=3</span> 和分辨率 <span class=\"kb-math kb-math-inline\">R_{\\text{low}}=154</span> 在效率与精度间取得最佳平衡</p>",
      "quiz": {
        "q": "LookWhere 在微调阶段如何处理 selector？",
        "options": [
          "与 extractor 联合微调以适应特定任务",
          "使用 REINFORCE 梯度估计更新 selector 的离散选择策略",
          "完全冻结 selector，仅微调 extractor 和任务头",
          "丢弃 selector，改用教师模型的注意力图直接选择 patch"
        ],
        "answer": 2,
        "explain": "LookWhere 的核心设计之一是 selector 在预训练后完全冻结，下游任务仅微调 extractor。这使得同一个 selector 可以零成本迁移到不同任务，大幅简化部署流程。"
      }
    },
    {
      "id": "xsam",
      "num": 17,
      "name": "X-SAM",
      "fullName": "任意分割模型 (X-SAM)",
      "year": "2026.03",
      "org": "中山大学 / 美团 / 鹏城实验室",
      "parent": "sam2",
      "paperUrl": "https://ojs.aaai.org/index.php/AAAI/article/view/39822",
      "projectUrl": "",
      "category": "segmentation",
      "motivation": "任意分割交互式全实例",
      "summary": "X-SAM 把 SAM 从“给定提示做单类分割”扩展为“统一处理任意分割任务”的多模态框架，通过双编码器、统一查询接口和 Mask2Former 风格解码器，把开放词汇、指代、推理、交互和视觉指向分割放进同一个模型里。",
      "keyPoints": [
        "把多种分割任务统一为文本查询和视觉查询两类输入范式。",
        "采用 SigLIP2 提供语义视觉特征，SAM-L 提供细粒度空间分割特征。",
        "用 <code>&lt;SEG&gt;</code> 令牌触发分割解码，将 LLM 的语义理解直接传给掩码生成器。",
        "分割头改成 Mask2Former 风格的多尺度掩码解码器，支持多实例输出。",
        "提出 VGD 任务，要求根据视觉提示分割图中所有同类实例，而不是只分一个对象。"
      ],
      "detail": "<p><img alt=\"X-SAM 架构图\" src=\"https://ar5iv.labs.arxiv.org/html/2508.04655v2/assets/figures/fig2_arch.png\" />\n<em>图：X-SAM 同时接收语义编码器和分割编码器的特征，再由 LLM 生成 <code>&lt;SEG&gt;</code> 查询触发统一分割解码。</em></p>\n<pre><code class=\"language-python\"># X-SAM 推理伪代码\nimg_feat = siglip2_encoder(image)\nseg_feat = sam_encoder(image)\nvisual_tokens = concat(project_img(img_feat), project_seg(seg_feat))\nprompt_tokens = tokenize(query)                  # 文本查询或 &lt;region&gt; 视觉查询\nllm_out = llm(concat(visual_tokens, prompt_tokens))\nseg_queries = extract_seg_tokens(llm_out)\nmasks = mask_decoder(seg_queries, multiscale(seg_feat))\nreturn masks\n</code></pre>\n<p>X-SAM 的问题意识来自一个现实割裂：SAM 很强，但它更像一个“交互式掩码工具”；而多模态大模型虽然理解语言和视觉语义，但往往缺乏像素级输出能力。论文想做的是把两者拼起来，而且不是针对某一种任务拼，而是做成一个统一接口。</p>\n<p>统一接口的关键是输入格式。对于文本驱动任务，X-SAM 使用 <code>&lt;p&gt;...&lt;/p&gt;</code> 包裹类别或描述，例如开放词汇和指代表达；对于视觉驱动任务，则使用 <code>&lt;region&gt;</code> 占位符，把点、框、涂鸦等提示编码成区域嵌入塞进上下文。LLM 在理解输入后输出 <code>&lt;SEG&gt;</code> 特殊令牌，后者被当成条件查询送入分割头。于是“语义理解”和“掩码生成”之间建立了显式桥梁。</p>\n<p>结构上，SigLIP2 和 SAM-L 的双编码器设计也很有针对性。SigLIP2 更擅长高层语义对齐，适合理解文本描述和开放词汇概念；SAM-L 更擅长保留细粒度边界和几何结构。X-SAM 不尝试让一个编码器同时兼顾两件事，而是把两路特征投影后联合交给 LLM 和分割头。分割侧再利用像素洗牌构建多尺度特征，以适配 Mask2Former 式解码过程。</p>\n<p>训练上，论文采用三阶段流程：先单独把分割器调稳，再做视觉-语言对齐，最后混合多类任务进行端到端微调。这样能避免一开始就把“像素级学习”和“语言对齐”混在一起导致训练不稳定。X-SAM 的意义在于，它把“分割”从单任务工具升级成了可由统一多模态语义接口驱动的通用能力模块。</p>",
      "quiz": {
        "q": "X-SAM 中 `<SEG>` 令牌最核心的作用是什么？",
        "options": [
          "替代图像编码器输出视觉 patch",
          "作为 LLM 生成的条件查询，把语义理解传给分割解码器",
          "只用于统计分割类别数量",
          "充当位置编码"
        ],
        "answer": 1,
        "explain": "X-SAM 让 LLM 输出 `<SEG>` 令牌，再用它作为条件查询触发掩码生成，从而把语言理解和像素分割接起来。"
      }
    },
    {
      "id": "unipixel",
      "num": 18,
      "name": "UniPixel",
      "fullName": "统一像素级推理 (UniPixel)",
      "year": "2025.09",
      "org": "多机构",
      "parent": "florence2",
      "paperUrl": "https://arxiv.org/abs/2509.18094",
      "projectUrl": "",
      "category": "multimodal",
      "motivation": "像素推理融合MLLM",
      "summary": "UniPixel 通过对象记忆库把视觉指代、像素级分割和问答统一到一个多模态模型里，使模型既能理解“你指的是谁”，又能持续追踪并分割这个对象，从而完成更灵活的像素级推理。",
      "keyPoints": [
        "统一处理 referring、segmentation 和 PixelQA，不再把“理解提示”和“生成掩码”拆成两个系统。",
        "提出 Object Memory Bank，显式存储被引用对象的语义和视觉特征。",
        "采用 Prompt Encoder 编码点、框、掩码等视觉提示，并与时间信息联合建模。",
        "复用 SAM2.1 风格掩码解码器进行跨帧传播，支持视频级像素推理。",
        "设计 <code>&lt;REF&gt;</code>、<code>&lt;SEG&gt;</code>、<code>&lt;MEM&gt;</code> 特殊 token，驱动对象引用、掩码生成和记忆读取。"
      ],
      "detail": "<p><img alt=\"UniPixel 架构图\" src=\"https://arxiv.org/html/2509.18094v4/x3.png\" />\n<em>图：UniPixel 用对象记忆库把对象引用、掩码生成和后续推理串起来。</em></p>\n<pre><code class=\"language-python\"># UniPixel 核心流程\nprompt_tokens = prompt_encoder(visual_prompt, time_index=t)\nvlm_out = llm(video_tokens, text_query, prompt_tokens)\n\nif &quot;&lt;REF&gt;&quot; in vlm_out:\n    obj_state = build_object_state(vlm_out, visual_features)\n    memory_bank.store(obj_id, obj_state)\n\nif &quot;&lt;SEG&gt;&quot; in vlm_out:\n    masks = sam2_decoder(video_features, memory_bank[obj_id])\n\nif &quot;&lt;MEM&gt;&quot; in vlm_out:\n    llm_context = inject(memory_bank[obj_id], llm_context)\n</code></pre>\n<p>很多早期多模态模型要么能做 referring，知道“用户在说哪个对象”；要么能做 segmentation，知道“怎么画出掩码”。UniPixel 的目标是把这两种能力真正合并，否则模型在复杂交互场景里只能做其中一半。比如给出一点视觉提示，再问“这个物体后来做了什么”，单纯的分割器或单纯的问答模型都不够。</p>\n<p>论文的核心机制是 Object Memory Bank。模型在识别或分割某个对象后，不是把结果立即丢弃，而是以显式 slot 的形式存下来，包括引用 token、分割 token 和 mask-pooled 视觉特征。之后模型如果需要继续追踪、解释或回答与该对象有关的问题，就可以通过 <code>&lt;MEM&gt;</code> 读回对应对象的状态。这和普通 attention 的区别在于，它是结构化、持久化、按对象索引的记忆，而不是把所有 token 混在一个上下文窗口里。</p>\n<p>Prompt Encoder 也很关键。点、框、区域掩码等视觉提示都会先被编码成统一 token 序列，并与时间位置联合建模，否则在视频里同样的空间坐标可能指向不同帧上的不同对象。论文因此把时间信息也编码进 prompt，使模型学会“第几帧的哪个位置”这一更精确的对象索引方式。</p>\n<p>UniPixel 之所以能做 PixelQA，是因为它不把分割结果当最终输出，而把它当成推理中间状态。模型可以先理解提示对象，再生成分割掩码，再基于记忆中的对象特征输出文本答案。这个思路把“像素级 grounding”从工具能力提升成了多模态推理链的一部分，是它相比传统 MLLM 分割器更重要的地方。</p>",
      "quiz": {
        "q": "UniPixel 中 Object Memory Bank 的核心价值是什么？",
        "options": [
          "把所有对象都压缩成一个全局 token",
          "显式保存被引用对象的状态，使模型能在后续轮次继续分割、追踪和回答相关问题",
          "替代视频编码器做时序建模",
          "只用于加速训练收敛"
        ],
        "answer": 1,
        "explain": "Object Memory Bank 让对象信息可以被显式写入、读取和复用，因此模型能围绕同一个对象持续推理，而不是一次性输出后丢失状态。"
      }
    },
    {
      "id": "rynnbrain",
      "num": 19,
      "name": "RynnBrain",
      "fullName": "开源具身基础模型 (RynnBrain)",
      "year": "2026.02",
      "org": "多机构",
      "parent": "dinov2",
      "paperUrl": "https://arxiv.org/abs/2602.14979",
      "projectUrl": "",
      "category": "multimodal",
      "motivation": "开源具身感知基础模型",
      "summary": "RynnBrain 试图把具身认知、空间定位和任务规划统一进一个开源视觉语言基础模型里，通过统一坐标 token 表示、大规模具身数据预训练和规则奖励强化学习，形成面向 embodied 场景的通用感知与规划底座。",
      "keyPoints": [
        "基于 decoder-only VLM，把图像和视频统一成帧序列输入。",
        "将 bbox、点、区域和轨迹都量化为离散坐标 token，由模型自回归生成。",
        "预训练数据同时覆盖通用视觉理解、空间定位、affordance 和操作规划。",
        "提出 Chain-of-Perception，把推理链中的实体显式锚定到帧和空间位置。",
        "使用 GRPO 和规则奖励优化轨迹、区域和空间决策质量。"
      ],
      "detail": "<p><img alt=\"RynnBrain 任务与模型示意图\" src=\"https://arxiv.org/html/2602.14979v1/x1.png\" />\n<em>图：RynnBrain 试图把感知、定位、规划和动作相关输出统一到一个视觉语言建模框架里。</em></p>\n<pre><code class=\"language-python\"># RynnBrain 统一输出形式\nvideo_tokens = vision_encoder(frames)\nhidden = llm(video_tokens, instruction)\n\n# 统一离散坐标输出\nresponse = &quot;&quot;&quot;\n&lt;object&gt; &lt;frame 3&gt;: (214, 420), (650, 882) &lt;/object&gt;\n&lt;area&gt; &lt;frame 4&gt;: (120,210), (180,240), (175,330) &lt;/area&gt;\n&quot;&quot;&quot;\n</code></pre>\n<p>RynnBrain 的设计目标很明确：如果一个模型要在具身场景里真正可用，它不能只会看图说话，还得同时具备“找到物体在哪里”“判断什么位置可操作”“规划接下来怎么做”这些能力。论文因此没有把 embodied tasks 当成若干互相独立的小 benchmark，而是尝试构建一个共享的表示与输出接口。</p>\n<p>最关键的统一机制是离散坐标 token。传统做法往往会给 grounding、affordance、轨迹预测分别设计不同的回归头，而 RynnBrain 直接把空间坐标量化到统一整数区间，让 VLM 用 next-token prediction 方式生成。这么做的好处是接口统一、训练目标一致，也更方便和文本推理链结合；代价则是坐标精度受量化粒度限制，但在大多数 embodied 场景中这个代价是可接受的。</p>\n<p>论文的另一个亮点是 Chain-of-Perception。普通 CoT 只在文本空间里展开推理，而 CoP 会把“这个花纹墙纸”“那个抓手”“该走向哪里”等中间实体显式落到具体帧和坐标上，例如 <code>&lt;object&gt; &lt;frame 3&gt;: ... &lt;/object&gt;</code>。这样模型的推理不再只是语言上的自洽，而是被视觉证据绑定，能明显减少具身场景中的空间幻觉。</p>\n<p>在优化层面，RynnBrain 使用 GRPO 这类组相对强化学习，并配合规则奖励而非学习型奖励模型，例如轨迹用 Fréchet distance、区域用 Chamfer distance、多边形区域用点内率评估。这类奖励设计的好处是目标直接、可验证，也更符合具身任务中“输出几何结构是否正确”的评价方式。整体上，这篇工作代表的是“把 embodied 能力看成基础模型原生能力”的路线，而不仅仅是后接一个导航或操作头。</p>",
      "quiz": {
        "q": "RynnBrain 采用离散坐标 token 统一空间输出，最直接的工程收益是什么？",
        "options": [
          "完全消除空间误差",
          "让定位、区域和轨迹等任务都能复用同一种自回归生成接口，而不必为每个任务单独设计回归头",
          "让模型不再需要视觉编码器",
          "把视频输入长度压缩到常数"
        ],
        "answer": 1,
        "explain": "RynnBrain 的核心做法是把不同空间输出统一成 token 序列，这样可以直接复用 VLM 的生成范式，而不是为每类空间任务分别造头。"
      }
    },
    {
      "id": "videoloom",
      "num": 20,
      "name": "VideoLoom",
      "fullName": "视频大语言模型 (VideoLoom)",
      "year": "2026.01",
      "org": "多机构",
      "parent": "sam2",
      "paperUrl": "https://arxiv.org/abs/2601.07290",
      "projectUrl": "",
      "category": "multimodal",
      "motivation": "长视频时空联合理解",
      "summary": "VideoLoom 提出了一种基于 SlowFast 视觉 token 和 MLLM-SAM2 协同架构的统一视频时空理解框架，首次在单一模型中同时实现视频时间定位（temporal grounding）和空间分割（spatial segmentation），并构建了专用数据集 LoomData 和评测基准 LoomBench 来推动联合时空理解研究。",
      "keyPoints": [
        "<strong>统一时空架构</strong>：将 InternVL3（MLLM）与 SAM2（分割基础模型）结合，通过特殊 <code>[SEG]</code> token 桥接语言理解和像素级分割",
        "<strong>SlowFast 视觉 token 设计</strong>：Slow tokens（5帧×256 tokens）保留高分辨率空间细节用于分割，Fast tokens（128帧×16 tokens）压缩时序信息用于时间定位",
        "<strong>LoomData-8.7K 数据集</strong>：基于 ActivityNet 构建的联合时空标注数据，包含时间边界 + 空间 mask 的配对标注，通过 4 阶段自动化流水线生成",
        "<strong>LoomBench 评测基准</strong>：包含 When（时间定位）、Where（空间分割）、Combined（联合时空）三类问答，评估模型的联合时空理解能力",
        "<strong>训练策略</strong>：LoRA 微调 LLM + 全量训练 mask decoder，冻结视觉编码器和 SAM2 image encoder",
        "<strong>SOTA 性能</strong>：ReVOS 上 63.1 J&amp;F，Charades-STA 上 48.3 R1@0.7，同时在通用视频理解基准上保持竞争力"
      ],
      "detail": "<p><img alt=\"VideoLoom 整体架构图\" src=\"https://ar5iv.labs.arxiv.org/html/2601.07290/assets/x2.png\" />\n<em>图：VideoLoom 架构总览。左侧为 SlowFast 视觉 token 编码，右侧为 MLLM 与 SAM2 的协同推理流程。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># VideoLoom 推理流程伪代码\ndef videoloom_forward(video, text_query):\n    # Step 1: SlowFast Visual Token Encoding\n    frames = sample_frames(video, n_fast=128, n_slow=5)\n\n    # Fast tokens: 全局时序理解 (128帧, 每帧16 tokens)\n    fast_tokens = vision_encoder(frames[:128])  # [128, 256, D]\n    fast_tokens = pixel_shuffle_downsample(fast_tokens)  # [128, 16, D]\n\n    # Slow tokens: 高分辨率空间细节 (5帧, 每帧256 tokens)\n    slow_tokens = vision_encoder(frames[:5])  # [5, 256, D]\n\n    # Step 2: MLLM Reasoning\n    input_tokens = concat([fast_tokens, slow_tokens, tokenize(text_query)])\n    output = mllm(input_tokens)  # InternVL3-8B with LoRA\n\n    # Step 3: Parse output\n    if task == &quot;temporal_grounding&quot;:\n        timestamps = extract_timestamps(output)  # &lt;ts&gt;start&lt;/ts&gt;&lt;ts&gt;end&lt;/ts&gt;\n        return timestamps\n    elif task == &quot;spatial_segmentation&quot;:\n        seg_token = extract_seg_token(output)  # [SEG] hidden state\n        # Step 4: SAM2 Mask Decoding\n        seg_embedding = mlp_projection(seg_token)  # project to SAM2 space\n        masks = sam2_mask_decoder(\n            image_embeddings=sam2_encoder(frames),\n            prompt_embedding=seg_embedding\n        )\n        masks = propagate_masks(masks, video)  # SAM2 memory-based propagation\n        return masks\n    elif task == &quot;combined&quot;:\n        timestamps = extract_timestamps(output)\n        seg_token = extract_seg_token(output)\n        masks = sam2_decode_and_propagate(seg_token, frames[timestamps])\n        return timestamps, masks\n</code></pre>\n<h5>动机与背景</h5>\n<p>现有视频理解方法通常将<strong>时间理解</strong>（如视频时间定位 VTG、视频高光检测 VHD）和<strong>空间理解</strong>（如指代视频目标分割 RVOS）作为独立任务处理。然而，人类对视频的理解天然是时空交织的——例如\"当运动员起跳时，他的位置在哪里？\"需要同时定位时间段和空间区域。</p>\n<p>传统方法的缺陷：\n1. <strong>分离式架构</strong>：时间定位模型无法输出像素级分割，分割模型无法理解长视频时序\n2. <strong>token 效率矛盾</strong>：高分辨率 token 适合分割但帧数受限；低分辨率 token 适合长视频但丢失空间细节\n3. <strong>缺乏联合标注数据</strong>：现有数据集要么只有时间标注，要么只有空间标注</p>\n<h5>核心机制：SlowFast 视觉 Token</h5>\n<p>SlowFast 设计灵感来自 SlowFast Networks，但应用于 token 层面：</p>\n<div class=\"kb-math kb-math-display\">\\text{Visual Input} = \\underbrace{[\\mathbf{F}_1^{fast}, ..., \\mathbf{F}_{128}^{fast}]}_{\\text{128帧} \\times \\text{16 tokens}} \\oplus \\underbrace{[\\mathbf{S}_1^{slow}, ..., \\mathbf{S}_5^{slow}]}_{\\text{5帧} \\times \\text{256 tokens}}</div>\n<ul>\n<li><strong>Fast pathway</strong>：对 128 帧视频进行 pixel shuffle 下采样（将 <span class=\"kb-math kb-math-inline\">16 \\times 16</span> 的 token grid 压缩为 <span class=\"kb-math kb-math-inline\">4 \\times 4 = 16</span> tokens），总共 <span class=\"kb-math kb-math-inline\">128 \\times 16 = 2048</span> tokens，捕获长程时序动态</li>\n<li><strong>Slow pathway</strong>：均匀采样 5 帧保持原始 <span class=\"kb-math kb-math-inline\">16 \\times 16 = 256</span> tokens 分辨率，总共 <span class=\"kb-math kb-math-inline\">5 \\times 256 = 1280</span> tokens，保留精细空间信息用于分割</li>\n</ul>\n<div class=\"key-point\">💡 关键：SlowFast 设计使得单一模型同时拥有\"看得远\"（128帧时序覆盖）和\"看得清\"（高分辨率空间细节）的能力，总 token 数仅 3328，计算可控。</div>\n<h5>MLLM-SAM2 协同机制</h5>\n<p>VideoLoom 通过特殊的 <code>[SEG]</code> token 实现语言推理到像素级分割的桥接：</p>\n<ol>\n<li><strong>MLLM 推理阶段</strong>：模型在文本输出中生成 <code>[SEG]</code> token，其隐藏状态编码了目标对象的语义信息</li>\n<li><strong>投影层</strong>：通过 MLP 将 <code>[SEG]</code> token 的隐藏状态投影到 SAM2 的 prompt embedding 空间</li>\n<li><strong>SAM2 解码</strong>：将投影后的 embedding 作为 prompt 输入 SAM2 的 mask decoder，生成参考帧上的分割 mask</li>\n<li><strong>时序传播</strong>：利用 SAM2 的 memory-based propagation 机制将 mask 传播到整个视频</li>\n</ol>\n<p>损失函数设计：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L} = \\mathcal{L}_{CE}(\\text{text output}) + \\lambda_1 \\mathcal{L}_{BCE}(\\text{mask}) + \\lambda_2 \\mathcal{L}_{Dice}(\\text{mask})</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\lambda_1 = 2.0</span>，<span class=\"kb-math kb-math-inline\">\\lambda_2 = 0.5</span>。BCE loss 处理像素级分类，Dice loss 处理前景/背景不平衡问题。</p>\n<h5>LoomData 构建流程</h5>\n<p><img alt=\"LoomData 标注流水线\" src=\"https://ar5iv.labs.arxiv.org/html/2601.07290/assets/x1.png\" />\n<em>图：LoomData 4 阶段自动化标注流水线</em></p>\n<ol>\n<li><strong>Shot Partition</strong>：利用 PySceneDetect 将视频切分为镜头片段</li>\n<li><strong>Temporal Annotation</strong>：基于 ActivityNet 已有时间标注，对齐到镜头边界</li>\n<li><strong>Spatial Annotation</strong>：使用 Grounding DINO + SAM2 生成空间 mask，并通过 GPT-4o 验证质量</li>\n<li><strong>QA Generation</strong>：生成 When/Where/Combined 三类问答对</li>\n</ol>\n<h5>与传统方法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th>传统时间定位模型</th>\n<th>传统分割模型</th>\n<th>VideoLoom</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>时间理解</td>\n<td>✅</td>\n<td>❌</td>\n<td>✅</td>\n</tr>\n<tr>\n<td>空间分割</td>\n<td>❌</td>\n<td>✅</td>\n<td>✅</td>\n</tr>\n<tr>\n<td>联合时空</td>\n<td>❌</td>\n<td>❌</td>\n<td>✅</td>\n</tr>\n<tr>\n<td>长视频支持</td>\n<td>有限</td>\n<td>有限</td>\n<td>128帧</td>\n</tr>\n<tr>\n<td>统一架构</td>\n<td>—</td>\n<td>—</td>\n<td>单一模型端到端</td>\n</tr>\n</tbody>\n</table></div>\n<h5>关键实验结果</h5>\n<ul>\n<li><strong>时间定位</strong>：Charades-STA 上 R1@0.5=68.3, R1@0.7=48.3；ActivityNet-Captions 上 R1@0.5=56.2</li>\n<li><strong>空间分割</strong>：MeVIS 上 J&amp;F=57.2，ReVOS 上 J&amp;F=63.1（SOTA）</li>\n<li><strong>联合理解</strong>：LoomBench 上 tIoU=41.6，J&amp;F_bi-fore=49.1</li>\n<li><strong>消融实验</strong>：SlowFast 联合训练比单独 Slow/Fast 分别提升 +4.8 mIoU（时间）和 +3.2 J&amp;F（空间）；LoomData 带来 +5.0 J&amp;F_bi-fore 提升；模型从 4B→8B 持续获益</li>\n</ul>\n<div class=\"warn-box\">⚠️ 注意：VideoLoom 的核心创新不在于单项任务的绝对性能（某些专用模型可能更强），而在于首次证明了单一模型可以同时高质量地完成时间定位和空间分割，且两者相互促进。</div>",
      "quiz": {
        "q": "VideoLoom 中 SlowFast 视觉 token 设计的核心目的是什么？",
        "options": [
          "减少模型参数量以加速推理",
          "在有限 token 预算下同时兼顾长程时序覆盖和高分辨率空间细节",
          "替代 SAM2 的图像编码器以降低计算成本",
          "使模型能够处理不同分辨率的输入视频"
        ],
        "answer": 1,
        "explain": "Fast tokens 用少量 token 覆盖 128 帧实现时序理解，Slow tokens 用高分辨率 token 保留 5 帧空间细节用于分割，两者互补实现统一时空理解。"
      }
    }
  ],
  "categories": {
    "foundation": {
      "label": "奠基性架构",
      "color": "#4A90D9"
    },
    "representation": {
      "label": "通用表征学习",
      "color": "#50C878"
    },
    "segmentation": {
      "label": "视觉分割模型",
      "color": "#FF6B6B"
    },
    "multimodal": {
      "label": "多模态与前沿",
      "color": "#9B59B6"
    }
  },
  "projectUrls": {}
};
