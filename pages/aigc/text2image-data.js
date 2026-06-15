/**
 * text2image-data.js — 由 pipeline/build.py 于 2026-06-15 09:55:51 自动生成。
 * 源文件：content/aigc/text2image.md
 * ⚠️  请勿手动修改；如需更新，修改源文档后重新编译。
 */
window.PAGE_CONFIG = {
  "meta": {
    "domain": "aigc",
    "topic_id": "text2image",
    "topic_name": "文生图技术演进",
    "page_title": "文生图技术演进",
    "page_subtitle": "2026-06-15 版",
    "page_desc": "从GAN到扩散模型，从Stable Diffusion到FLUX.1的文生图技术全景演进",
    "page_icon": "🎨",
    "hero_pills": [
      "🏷️ Diffusion Models · GAN · Transformer · Flow Matching · AIGC"
    ],
    "count_pill": "{count} 个算法",
    "image_base": "",
    "overview_from_doc": true,
    "latest_overview_from_doc": true
  },
  "overview": [
    {
      "title": "",
      "body_html": "<h1>图像生成技术演进综述：从VAE到Sora的十二年革命（2013-2025）</h1>\n<ul>\n<li>来源平台: <strong>zhihu</strong>（知乎专栏文章）</li>\n<li>原文链接: <a href=\"https://zhuanlan.zhihu.com/p/704178706\">https://zhuanlan.zhihu.com/p/704178706</a></li>\n<li>作者: 罗清雨</li>\n</ul>\n<hr />\n<p>图像生成技术演进综述：从VAE到Sora的十二年革命（2013-2025）</p>\n<h1>图像生成技术演进综述：从VAE到Sora的十二年革命（2013-2025）</h1>\n<p>作者: 罗清雨, 赞: 17</p>\n<h2>导言：定义与重要性</h2>\n<p>图像生成是生成式人工智能的核心分支，旨在从数据分布中学习，进而生成逼真、多样且满足条件约束的新图像。从本质上讲，它解决了机器智能中一个根本性的问题：如何让计算机理解并创造视觉世界。  </p>\n<p>过去十多年间，这个领域经历了四次范式转变。从2013年变分自编码器（VAE）引入潜空间表示，到2020年扩散概率模型（DDPM）开启去噪范式，再到2021年潜空间扩散模型（LDM）和CLIP带来的「文生图」革命，直至2023年扩散变换器（DiT）统一架构、2024年Sora实现视频生成——每一次突破都代表着我们对生成过程理解的深化，以及对算力优化的突破。  </p>\n<p>本文系统梳理了这一演进路径，不仅呈现关键技术里程碑和量化指标，更重要的是阐明它们之间的因果关系：为什么这些创新会接踵而至，又如何层层递进。我们将看到，图像生成的演进遵循了一条内在的逻辑：从「学习像素」进化到「理解语义」，从「暴力计算」演进到「优雅架构」。</p>\n<h2>第一阶段：表征与降维的奠基期（2013-2015）</h2>\n<h3>问题的根源：维度诅咒</h3>\n<p>在深度学习早期，计算机视觉领域被一个根本性困境所困扰：高维数据的学习与表示。一张256×256的RGB图像包含196,608个维度，要让神经网络在如此高维空间中学习数据分布几乎是不可能的。传统的方法是什么？要么依赖人工特征工程（低效且不可泛化），要么用超大规模数据和计算资源蛮力逼近（成本极高）。  </p>\n<p>VAE的突破在于引入了一个优雅的数学框架来回答这个问题：能否自动发现高维数据的低维表示？</p>\n<h3>VAE：变分下界的魔法</h3>\n<p>Diederik P. Kingma和Max Welling在2013年发表的论文《Auto-Encoding Variational Bayes》中提出了变分自编码器。其核心思想来自贝叶斯推断中的一个经典问题——如何用容易求解的分布来近似难以求解的后验？</p>\n<p><strong>关键概念：ELBO与重参数化</strong></p>\n<p>给定数据 <img alt=\"x\" src=\"https://www.zhihu.com/equation?tex=x\" />，我们想要最大化边际对数似然 <img alt=\"\\log p_{\\theta}(x)\" src=\"https://www.zhihu.com/equation?tex=%5Clog+p_%7B%5Ctheta%7D%28x%29\" />，但真实后验 <img alt=\"p_{\\theta}(z|x)\" src=\"https://www.zhihu.com/equation?tex=p_%7B%5Ctheta%7D%28z%7Cx%29\" /> 难以直接计算。VAE引入一个可学习的编码器 <img alt=\"q_{\\phi}(z|x)\" src=\"https://www.zhihu.com/equation?tex=q_%7B%5Cphi%7D%28z%7Cx%29\" /> 来近似它，通过最大化证据下界（ELBO）来间接优化对数似然：</p>\n<p><img alt=\"\\log p_{\\theta}(x) = \\mathbb{E}_{q_{\\phi}(z|x)} \\left[ \\log \\frac{p_{\\theta}(x|z) p_{\\theta}(z)}{q_{\\phi}(z|x)} \\right] + D_{\\text{KL}}(q_{\\phi}(z|x) | p_{\\theta}(z|x))\" src=\"https://www.zhihu.com/equation?tex=%5Clog+p_%7B%5Ctheta%7D%28x%29+%3D+%5Cmathbb%7BE%7D_%7Bq_%7B%5Cphi%7D%28z%7Cx%29%7D+%5Cleft%5B+%5Clog+%5Cfrac%7Bp_%7B%5Ctheta%7D%28x%7Cz%29+p_%7B%5Ctheta%7D%28z%29%7D%7Bq_%7B%5Cphi%7D%28z%7Cx%29%7D+%5Cright%5D+%2B+D_%7B%5Ctext%7BKL%7D%7D%28q_%7B%5Cphi%7D%28z%7Cx%29+%5C%7C+p_%7B%5Ctheta%7D%28z%7Cx%29%29\" /></p>\n<p>ELBO定义为：</p>\n<p><img alt=\"\\mathcal{L}_{ELBO}(x) = \\underbrace{\\mathbb{E}_{q_{\\phi}(z|x)} [\\log p_{\\theta}(x|z)]}_\\text{重构项} - \\underbrace{D_{\\text{KL}}(q_{\\phi}(z|x) | p_{\\theta}(z))}_\\text{正则项}\" src=\"https://www.zhihu.com/equation?tex=%5Cmathcal%7BL%7D_%7BELBO%7D%28x%29+%3D+%5Cunderbrace%7B%5Cmathbb%7BE%7D_%7Bq_%7B%5Cphi%7D%28z%7Cx%29%7D+%5B%5Clog+p_%7B%5Ctheta%7D%28x%7Cz%29%5D%7D_%5Ctext%7B%E9%87%8D%E6%9E%84%E9%A1%B9%7D+-+%5Cunderbrace%7BD_%7B%5Ctext%7BKL%7D%7D%28q_%7B%5Cphi%7D%28z%7Cx%29+%5C%7C+p_%7B%5Ctheta%7D%28z%29%29%7D_%5Ctext%7B%E6%AD%A3%E5%88%99%E9%A1%B9%7D\" /></p>\n<p>第一项鼓励解码器准确重建原始数据，第二项促使编码器的分布接近标准正态分布（先验）。这种平衡是VAE的精妙之处——它既学会压缩数据，又保留足够的随机性以支持生成。</p>\n<p>但VAE有个技术障碍：如何通过随机采样层进行反向传播？答案是重参数化技巧（Reparameterization Trick）：</p>\n<p><img alt=\"z = \\mu + \\sigma \\odot \\epsilon, \\quad \\epsilon \\sim \\mathcal{N}(0, I)\" src=\"https://www.zhihu.com/equation?tex=z+%3D+%5Cmu+%2B+%5Csigma+%5Codot+%5Cepsilon%2C+%5Cquad+%5Cepsilon+%5Csim+%5Cmathcal%7BN%7D%280%2C+I%29\" /></p>\n<p>将随机性转移到输入，使得梯度流能够通过确定性的网络参数。</p>\n<p><strong>影响与局限</strong></p>\n<p><img alt=\"\" src=\"https://pic4.zhimg.com/v2-f263221591e883696652fc40be51e3cf_1440w.jpg\" /></p>\n<p>VAE架构示意图：展示编码器将高维图像压缩到低维潜空间，解码器从潜空间重建图像。潜空间中通过重参数化技巧实现可微采样。</p>\n<p>VAE于2013年发表后，迅速成为了生成模型的主流选择。其潜空间表示的优雅性是无与伦比的——一个低维向量能够平滑地参数化整个数据分布，这使得图像插值和有意义的修改成为可能。</p>\n<p>由于KL散度正则项，编码器倾向于让不同类别的数据点在潜空间中相互混合，导致生成的图像往往显得模糊。这个问题在图像生成上表现为明显——生成的脸部或风景往往缺乏清晰度，仿佛被蒙上了一层朦胧的面纱。</p>\n<h3>Diffusion Model的理论初现（2015）</h3>\n<p>随着VAE的成功，另一个重要的思想也在同时期浮现。受热力学启发，研究者们开始思考逆向问题：能否通过逐步反转一个噪声过程来生成图像？</p>\n<p>随着VAE的成功，另一个重要的思想也在同时期浮现。受热力学启发，研究者们开始思考逆向问题：<strong>能否通过逐步反转一个噪声过程来生成图像</strong>？  </p>\n<p>2015年前后，Sohl-Dickstein等人以及Bengio的团队独立地提出了扩散概率模型的理论框架，但当时这些工作主要停留在理论探讨，离实用还有很远的距离。扩散模型引入了一个与VAE截然不同的生成范式：</p>\n<ul>\n<li><strong>VAE</strong>：直接从潜空间采样→解码→生成</li>\n<li><strong>Diffusion</strong>：从纯噪声开始→逐步去噪→生成</li>\n</ul>\n<p>这两个范式各有千秋。VAE的优势是采样速度快（单次前向传播），但生成质量受限。Diffusion的劣势是采样需要数百步迭代（后来发展了加速方法），但生成质量理论上可以达到任意高。</p>\n<hr />\n<h2>第二阶段：去噪概率模型的突破期（2020）</h2>\n<h3>DDPM：让扩散模型实用化</h3>\n<p>VAE的成功激发了对更优雅的生成框架的渴望。2020年是图像生成领域的分水岭年份。Jonathan Ho、Ajay Jain和Pieter Abbeel在《Denoising Diffusion Probabilistic Models》中提出了一个关键洞察：扩散模型不仅仅是理论构想，而是可以与基于对抗网络（GAN）的方法竞争的实用生成模型。</p>\n<p><strong>前向扩散：马尔可夫链中的噪声</strong></p>\n<p>DDPM的核心机制是定义一个前向扩散过程，在 <img alt=\"T\" src=\"https://www.zhihu.com/equation?tex=T\" /> 个时间步内逐步向图像添加高斯噪声。设 <img alt=\"\\beta_1, \\beta_2, \\ldots, \\beta_T\" src=\"https://www.zhihu.com/equation?tex=%5Cbeta_1%2C+%5Cbeta_2%2C+%5Cldots%2C+%5Cbeta_T\" /> 是方差调度，前向转移定义为：</p>\n<p><img alt=\"   q(x_t|x_{t-1}) = \\mathcal{N}(x_t; \\sqrt{1-\\beta_t} x_{t-1}, \\beta_t I)\" src=\"https://www.zhihu.com/equation?tex=+++q%28x_t%7Cx_%7Bt-1%7D%29+%3D+%5Cmathcal%7BN%7D%28x_t%3B+%5Csqrt%7B1-%5Cbeta_t%7D+x_%7Bt-1%7D%2C+%5Cbeta_t+I%29\" /></p>\n<p>其中 <img alt=\"\\alpha_t = 1 - \\beta_t\" src=\"https://www.zhihu.com/equation?tex=%5Calpha_t+%3D+1+-+%5Cbeta_t\" />，<img alt=\"\\bar{\\alpha}t = \\prod{i=1}^{t} \\alpha_i\" src=\"https://www.zhihu.com/equation?tex=%5Cbar%7B%5Calpha%7Dt+%3D+%5Cprod%7Bi%3D1%7D%5E%7Bt%7D+%5Calpha_i\" />。当 <img alt=\"t=T\" src=\"https://www.zhihu.com/equation?tex=t%3DT\" /> 足够大时，<img alt=\"x_T\" src=\"https://www.zhihu.com/equation?tex=x_T\" /> 几乎等同于标准正态分布。</p>\n<p><strong>反向扩散：学习去噪</strong></p>\n<p>关键的洞察是：虽然前向过程是确定性的（给定 <img alt=\"x_0\" src=\"https://www.zhihu.com/equation?tex=x_0\" /> 和 <img alt=\"\\epsilon\" src=\"https://www.zhihu.com/equation?tex=%5Cepsilon\" />），反向过程 <img alt=\"q(x_{t-1}|x_t)\" src=\"https://www.zhihu.com/equation?tex=q%28x_%7Bt-1%7D%7Cx_t%29\" /> 也具有已知的高斯形式！通过贝叶斯公式和高斯性质，可以推导出：</p>\n<p><img alt=\"q(x_{t-1}|x_t, x_0) = \\mathcal{N}(x_{t-1}; \\tilde{\\mu}_t(x_t, x_0), \\tilde{\\beta}_t I)\" src=\"https://www.zhihu.com/equation?tex=q%28x_%7Bt-1%7D%7Cx_t%2C+x_0%29+%3D+%5Cmathcal%7BN%7D%28x_%7Bt-1%7D%3B+%5Ctilde%7B%5Cmu%7D_t%28x_t%2C+x_0%29%2C+%5Ctilde%7B%5Cbeta%7D_t+I%29\" /></p>\n<p>其中均值 <img alt=\"\\tilde{\\mu}_t\" src=\"https://www.zhihu.com/equation?tex=%5Ctilde%7B%5Cmu%7D_t\" /> 依赖于 <img alt=\"x_0\" src=\"https://www.zhihu.com/equation?tex=x_0\" />（我们想要恢复的图像）和 <img alt=\"x_t\" src=\"https://www.zhihu.com/equation?tex=x_t\" />（当前的噪声图像）。但在采样时，我们不知道 <img alt=\"x_0\" src=\"https://www.zhihu.com/equation?tex=x_0\" />——这正是神经网络要学会预测的东西。</p>\n<p>DDPM的训练目标是让参数化的反向模型 <img alt=\"p_{\\theta}(x_{t-1}|x_t)\" src=\"https://www.zhihu.com/equation?tex=p_%7B%5Ctheta%7D%28x_%7Bt-1%7D%7Cx_t%29\" /> 匹配真实后验 <img alt=\"q(x_{t-1}|x_t, x_0)\" src=\"https://www.zhihu.com/equation?tex=q%28x_%7Bt-1%7D%7Cx_t%2C+x_0%29\" />。经过复杂的推导，DDPM提出了一个简化而优雅的损失函数：</p>\n<p><img alt=\"L_{\\text{simple}} = \\mathbb{E}_{t, x_0, \\epsilon} \\left[ |\\epsilon - \\epsilon_\\theta(x_t, t)|^2 \\right]\" src=\"https://www.zhihu.com/equation?tex=L_%7B%5Ctext%7Bsimple%7D%7D+%3D+%5Cmathbb%7BE%7D_%7Bt%2C+x_0%2C+%5Cepsilon%7D+%5Cleft%5B+%5C%7C%5Cepsilon+-+%5Cepsilon_%5Ctheta%28x_t%2C+t%29%5C%7C%5E2+%5Cright%5D\" /></p>\n<p>其中 <img alt=\"\\epsilon_\\theta(x_t, t)\" src=\"https://www.zhihu.com/equation?tex=%5Cepsilon_%5Ctheta%28x_t%2C+t%29\" /> 是一个U-Net类型的神经网络，直接预测被添加到数据中的噪声。这一简化至关重要——它避免了复杂的方差优化，使训练变得稳定而高效。</p>\n<h3>U-Net：对称性的力量</h3>\n<p><img alt=\"\" src=\"https://pic2.zhimg.com/v2-481cd05676afb5d4e4be65b0069cc961_1440w.jpg\" /></p>\n<p>DDPM扩散过程可视化：上方展示前向扩散过程（左到右逐步添加高斯噪声），下方展示反向去噪过程（右到左逐步恢复结构），使用U-Net网络预测每一步的噪声。</p>\n<p>DDPM选择U-Net作为噪声预测网络的骨干。U-Net起源于医学图像分割领域（Ronneberger等，2015），其设计简洁但强大：</p>\n<ul>\n<li><strong>编码路径</strong>：图像通过卷积层逐步下采样，每层都记录跳过连接的特征</li>\n<li><strong>瓶颈</strong>：最深层进行最高度的特征压缩</li>\n<li><strong>解码路径</strong>：特征通过转置卷积逐步上采样，在每一步与编码路径的对应特征拼接</li>\n</ul>\n<p>这种对称的结构特别适合逐像素的预测任务（如去噪），因为它既能捕获全局结构（通过下采样），又能保留局部细节（通过跳过连接）。</p>\n<p>突破性成果</p>\n<p>DDPM在CIFAR-10数据集上取得的结果震撼了业界：Inception Score（IS）为9.46，Fréchet Inception Distance（FID）为3.17。这些指标竞争力极强——当时GAN模型虽然已经相当成熟，但扩散模型展现出了与之相当甚至超越的性能，同时<strong>生成过程更加稳定，不存在模式崩溃</strong>的问题。</p>\n<p><strong>Vision Transformer的意外收获（2020）</strong></p>\n<p>2020年，Dosovitskiy等人发表了《An Image is Worth 16x16 Words: Transformers for Image Recognition at Scale》，首次证明了Transformer架构能够在纯视觉任务上超越卷积神经网络。  </p>\n<p>Vision Transformer（ViT）的核心思想是将图像分割成固定大小的补丁（例如16×16像素），线性嵌入这些补丁，然后使用标准Transformer编码器处理。虽然ViT主要用于分类任务，但它的成功为后续的一个关键创新——扩散变换器（DiT）——埋下了伏笔。</p>\n<hr />\n<h2>第三阶段：跨模态与潜空间的爆发期（2021-2022）</h2>\n<h3>CLIP：文本与图像的对齐</h3>\n<p>到了2021年，一个新的需求变得迫切：<strong>如何让生成模型理解文本描述？</strong>这个问题的核心是多模态对齐。</p>\n<p>OpenAI在2021年2月发布的CLIP（Contrastive Language-Image Pre-training）模型解决了这个问题。CLIP采用了一个优雅的对比学习框架：</p>\n<p><strong>架构：双塔与对比学习</strong></p>\n<p>CLIP包含两个独立的编码器：</p>\n<ul>\n<li><strong>图像编码器</strong>：ResNet或Vision Transformer</li>\n<li><strong>文本编码器</strong>：Transformer（GPT风格）</li>\n</ul>\n<p>给定一个包含 <img alt=\"N\" src=\"https://www.zhihu.com/equation?tex=N\" /> 个图像-文本对的批次，CLIP计算所有可能的图像-文本相似度，形成一个 <img alt=\"N \\times N\" src=\"https://www.zhihu.com/equation?tex=N+%5Ctimes+N\" /> 的相似度矩阵。对角线元素代表正样本对，非对角线元素为负样本。损失函数采用对称的交叉熵：</p>\n<p><img alt=\"L = -\\frac{1}{N} \\sum_{i=1}^{N} \\left[ \\log \\frac{\\exp(\\text{sim}(I_i, T_i)/\\tau)}{\\sum_{j=1}^{N} \\exp(\\text{sim}(I_i, T_j)/\\tau)} + \\log \\frac{\\exp(\\text{sim}(I_i, T_i)/\\tau)}{\\sum_{j=1}^{N} \\exp(\\text{sim}(I_j, T_i)/\\tau)} \\right]\" src=\"https://www.zhihu.com/equation?tex=L+%3D+-%5Cfrac%7B1%7D%7BN%7D+%5Csum_%7Bi%3D1%7D%5E%7BN%7D+%5Cleft%5B+%5Clog+%5Cfrac%7B%5Cexp%28%5Ctext%7Bsim%7D%28I_i%2C+T_i%29%2F%5Ctau%29%7D%7B%5Csum_%7Bj%3D1%7D%5E%7BN%7D+%5Cexp%28%5Ctext%7Bsim%7D%28I_i%2C+T_j%29%2F%5Ctau%29%7D+%2B+%5Clog+%5Cfrac%7B%5Cexp%28%5Ctext%7Bsim%7D%28I_i%2C+T_i%29%2F%5Ctau%29%7D%7B%5Csum_%7Bj%3D1%7D%5E%7BN%7D+%5Cexp%28%5Ctext%7Bsim%7D%28I_j%2C+T_i%29%2F%5Ctau%29%7D+%5Cright%5D\" /></p>\n<p>CLIP的真正威力来自<strong>大规模预训练</strong>。OpenAI使用了从互联网爬取的4亿个图像-文本对进行预训练。这个规模的数据投入，结合简洁而有效的对比学习目标，使得CLIP学会了一个非常通用的视觉-语言特征空间。</p>\n<p><img alt=\"\" src=\"https://pic1.zhimg.com/v2-9941c70a1eec283ecfb77ae04e7c1494_1440w.jpg\" /></p>\n<p>CLIP双塔架构：独立的图像编码器和文本编码器将不同模态投影到共享语义空间，通过对比学习对齐正样本对（对角线）并分离负样本。</p>\n<p>CLIP的零样本转移能力令人惊叹——在30多个计算机视觉数据集上，CLIP匹配甚至超越了在ImageNet上监督学习的ResNet-50的准确率。这意味着CLIP学到的是真正通用的、与自然语言对齐的视觉特征。</p>\n<h3>潜空间扩散模型：计算复杂度的克星</h3>\n<p>2021-2022年间，一个关键的问题困扰着扩散模型社区：<strong>DDPM虽然质量好，但速度太慢</strong>。每次采样需要1000步迭代，这对实际应用几乎不可行。而且，DDPM在像素空间进行扩散，意味着一张1024×1024的图像需要在100万维的空间中进行运算——极其昂贵。</p>\n<h3>LDM的突破：降维再降维</h3>\n<p>2021年12月，Robin Rombach等人发表了《High-Resolution Image Synthesis with Latent Diffusion Models》，提出了一个改变游戏规则的思想：<strong>为什么不在潜空间而非像素空间进行扩散</strong>？</p>\n<p>这个想法很直接，却非常强大。LDM的框架是：</p>\n<ol>\n<li>编码：使用预训练的VAE编码器将图像压缩到低维潜空间 <img alt=\"z = E(x)\" src=\"https://www.zhihu.com/equation?tex=z+%3D+E%28x%29\" /></li>\n<li>扩散：在潜空间中进行扩散-去噪过程</li>\n<li>解码：使用VAE解码器将去噪后的潜表示重建为高分辨率图像 <img alt=\"x = D(z)\" src=\"https://www.zhihu.com/equation?tex=x+%3D+D%28z%29\" /></li>\n</ol>\n<p>这个简单的改变带来了指数级的性能提升。由于VAE可以将图像压缩4-8倍（在空间维度上），潜空间的维度可能从100万维减少到数千维。这意味着计算复杂度下降了 <strong>100-1000倍</strong>。</p>\n<h3>条件控制：Classifier-Free Guidance</h3>\n<p>为了在LDM中加入文本条件，一个关键的技术问题出现了：如何高效地指导生成过程朝着特定的文本描述方向？</p>\n<p>Ho和Salimans在2022年提出的\"Classifier-Free Guidance\"解决了这个问题。其核心思想是：与其使用一个预训练分类器的梯度来引导生成，不如在训练时同时学习条件和无条件的去噪过程，采样时进行外推：</p>\n<p><img alt=\"\\tilde{\\epsilon}_\\theta(x_t|c) = \\epsilon_\\theta(x_t|\\emptyset) + \\gamma(\\epsilon_\\theta(x_t|c) - \\epsilon_\\theta(x_t|\\emptyset))\" src=\"https://www.zhihu.com/equation?tex=%5Ctilde%7B%5Cepsilon%7D_%5Ctheta%28x_t%7Cc%29+%3D+%5Cepsilon_%5Ctheta%28x_t%7C%5Cemptyset%29+%2B+%5Cgamma%28%5Cepsilon_%5Ctheta%28x_t%7Cc%29+-+%5Cepsilon_%5Ctheta%28x_t%7C%5Cemptyset%29%29\" /></p>\n<p>其中 <img alt=\"c\" src=\"https://www.zhihu.com/equation?tex=c\" /> 是条件（如CLIP文本嵌入），<img alt=\"\\gamma\" src=\"https://www.zhihu.com/equation?tex=%5Cgamma\" /> 是引导强度。当 <img alt=\"\\gamma=0\" src=\"https://www.zhihu.com/equation?tex=%5Cgamma%3D0\" /> 时为完全无条件生成，<img alt=\"\\gamma=1\" src=\"https://www.zhihu.com/equation?tex=%5Cgamma%3D1\" /> 时为标准条件生成，<img alt=\"\\gamma&gt;1\" src=\"https://www.zhihu.com/equation?tex=%5Cgamma%3E1\" /> 时增强条件信号。这个机制优雅而高效，后来成为了所有文生图模型的标准。</p>\n<h3>Stable Diffusion：开源革命</h3>\n<p>2022年8月，基于LDM框架的Stable Diffusion由StabilityAI、CompVis和Runway合作发布，并直接开源。这是一个历史性的时刻——<strong>首次有高质量的文生图模型对所有人开放</strong>。  </p>\n<p><strong>架构与规格</strong></p>\n<p>Stable Diffusion的核心组件包括：</p>\n<ul>\n<li><strong>VAE编码器/解码器</strong>：将图像在4×压缩和解压缩</li>\n<li><strong>U-Net去噪网络</strong>：在潜空间中进行去噪预测</li>\n<li><strong>CLIP文本编码器</strong>：将文本提示转换为条件嵌入</li>\n<li><strong>交叉注意力模块</strong>：将文本嵌入融入U-Net的每一层</li>\n</ul>\n<p>第一个广泛可用的版本是Stable Diffusion v1.5，包含9.83亿参数，在256个NVIDIA A100 GPU上训练了150,000小时，成本约为60万美元。虽然相对于DALL-E等专有模型而言较小，但Stable Diffusion展现出了与那些巨型模型竞争的性能。</p>\n<p><strong>社区生态</strong></p>\n<p>Stable Diffusion的开源释放催生了一个爆炸性增长的生态。不到一年时间，数百个微调版本、LoRA适配器、自定义采样器和应用层出不穷。社区开发者通过量化、剪枝和其他优化技术，使得Stable Diffusion可以在消费级GPU甚至CPU上运行。</p>\n<hr />\n<h2>第四阶段：架构大一统与多模态融合（2023-2025）</h2>\n<h3>DiT：Transformer的胜利</h3>\n<p>2023年初，一个激进的想法开始在业界流传：能否完全用Transformer替代U-Net架构？Vision Transformer在分类任务上的成功暗示这是可能的，但在扩散模型中应用Transformer从未被系统地证明过。</p>\n<p>DiT的设计哲学</p>\n<p>William Peebles和Saining Xie在《Scalable Diffusion Models with Transformers》一文中给出了答案。DiT将U-Net的三个核心设计决策进行了重新思考：</p>\n<p>（1）分块输入：不是像U-Net那样进行卷积下采样，DiT将潜空间表示分割成patch，例如将 <img alt=\"8 \\times H \\times W\" src=\"https://www.zhihu.com/equation?tex=8+%5Ctimes+H+%5Ctimes+W\" /> 的潜张量（<img alt=\"H\" src=\"https://www.zhihu.com/equation?tex=H\" /> 和 <img alt=\"W\" src=\"https://www.zhihu.com/equation?tex=W\" /> 是空间维度）分割为 <img alt=\"N = HW\" src=\"https://www.zhihu.com/equation?tex=N+%3D+HW\" /> 个 <img alt=\"8 \\times p \\times p\" src=\"https://www.zhihu.com/equation?tex=8+%5Ctimes+p+%5Ctimes+p\" /> 的patch（<img alt=\"p\" src=\"https://www.zhihu.com/equation?tex=p\" /> 是patch大小）。每个patch被线性投影到嵌入维度。</p>\n<p>（2）条件嵌入：时间步长 <img alt=\"t\" src=\"https://www.zhihu.com/equation?tex=t\" /> 和条件信息（如类别标签或文本嵌入）被转换为嵌入向量，通过自适应层归一化（AdaLN）融入Transformer的每一层：</p>\n<p><img alt=\"y_i' = \\gamma_i(t, c) \\cdot \\text{LayerNorm}(y_i) + \\beta_i(t, c)\" src=\"https://www.zhihu.com/equation?tex=y_i%27+%3D+%5Cgamma_i%28t%2C+c%29+%5Ccdot+%5Ctext%7BLayerNorm%7D%28y_i%29+%2B+%5Cbeta_i%28t%2C+c%29\" /></p>\n<p>其中 <img alt=\"\\gamma\" src=\"https://www.zhihu.com/equation?tex=%5Cgamma\" /> 和 <img alt=\"\\beta\" src=\"https://www.zhihu.com/equation?tex=%5Cbeta\" /> 是依赖于条件的缩放和平移参数。</p>\n<p><strong>（3）标准化架构</strong>：DiT使用标准的Transformer编码器块，而不是为图像任务设计的自定义卷积块。这使得模型能够受益于多年来Transformer架构优化的积累。</p>\n<p><strong>性能与扩展性</strong></p>\n<p><img alt=\"\" src=\"https://pic1.zhimg.com/v2-c8634e8e07b6b08f313890be354f2e32_1440w.jpg\" /></p>\n<p>DiT架构对比：左侧为传统U-Net的卷积下采样-上采样路径；右侧为DiT的patch处理和Transformer堆叠。DiT舍弃U-Net的对称性，转而使用标准Transformer块处理patch序列，展现出更优的可扩展性。</p>\n<p>DiT在ImageNet 256×256的类条件生成任务上取得了突破性成果，FID达到2.27——这是一个显著的改进（DDPM为3.17，之前的DPM-Solver改进版本为2.62）。但更重要的是DiT展现出了优异的扩展性。随着模型大小增加，生成质量以可预测的幂律关系提升——这恰好遵循了Transformer在语言模型中观察到的\"Scaling Law\"：</p>\n<p><img alt=\"\\text{Quality} \\propto \\text{Model Size}^\\alpha\" src=\"https://www.zhihu.com/equation?tex=%5Ctext%7BQuality%7D+%5Cpropto+%5Ctext%7BModel+Size%7D%5E%5Calpha\" /></p>\n<h3>Sora：时空的统一</h3>\n<p>2024年2月，OpenAI发布了Sora模型，标志着生成模型研究的一个新纪元——<strong>视频生成进入高保真时代</strong>。</p>\n<p>核心创新：时空补丁</p>\n<p>Sora基于DiT的思想，但进行了关键的扩展。如果图像可以表示为补丁的集合，那么视频（一系列时间上连贯的图像）也可以表示为时空补丁的集合。</p>\n<p>Sora的流程是：</p>\n<ol>\n<li><strong>编码</strong>：使用3D VAE编码器将视频压缩到时空潜空间</li>\n<li>patch化：将时空潜表示分割成3Dpatch，每个patch跨越时间和空间维度</li>\n<li><strong>DiT处理</strong>：使用扩散Transformer在补丁序列上进行去噪</li>\n<li><strong>解码</strong>：使用3D VAE解码器重建原始分辨率的视频</li>\n</ol>\n<p>这个框架的美妙之处在于它的通用性。通过调整patch大小和时空比例，同一个架构可以处理：</p>\n<ul>\n<li>不同分辨率的视频（从720p到1080p，甚至更高）</li>\n<li>不同长度的视频（从几秒到一分钟）</li>\n<li>动态分辨率（模型在训练时同时看到多个分辨率）</li>\n</ul>\n<p><strong>性能指标</strong></p>\n<p>Sora能够生成最长60秒、分辨率高达1920×1080的视频。更重要的是，这些视频展现出了<strong>惊人的一致性</strong>：</p>\n<ul>\n<li><strong>3D一致性</strong>：同一个物体在视频中从不同角度出现时保持外观一致</li>\n<li><strong>物体恒久性</strong>：物体在遮挡后能够正确地重新出现</li>\n<li><strong>物理感知</strong>：模型展现出对重力、撞击和其他物理现象的理解</li>\n<li><strong>长程连贯性</strong>：60秒的视频中，开头和结尾的物体与背景保持连贯</li>\n</ul>\n<p>这些特性暗示Sora可能学到了某种对物理世界工作方式的隐性模型。</p>\n<h2>2024-2025年的技术前沿</h2>\n<h3>Stable Diffusion 3.0+</h3>\n<p>在Sora发布后的几个月内，开源社区也在快速迭代。StabilityAI在2024年2月发布了Stable Diffusion 3.0，采用了多模态扩散变换器（MMDiT）架构——本质上是将DiT推广到多条件融合的版本。SD3.0参数量从9.83亿扩展到80亿。</p>\n<p>更激动人心的是，2024年10月发布的Stable Diffusion 3.5进一步优化了文本理解和图像质量。这个版本提供了Large（80亿）、Medium（25亿）和Turbo（快速推理）三个变体。</p>\n<h3>FLUX与其他竞争者</h3>\n<p>平行地，Black Forest Labs开发的FLUX模型系列也采用了类似的MMDiT架构，并在一些基准上超越了SD3.5。截至2025年，图像生成领域呈现出\"百花齐放\"的态势，多个高质量模型共存竞争，推动了整个领域的进步。</p>\n<p>关键趋势总结</p>\n<ol>\n<li><strong>架构统一</strong>：Transformer + 扩散已成为新标准，替代了卷积+GAN的旧范式</li>\n<li><strong>参数扩展</strong>：模型大小从10亿到800亿参数级别跨越，展现出明确的Scaling Law</li>\n<li><strong>多模态融合</strong>：单一文本条件演进为支持文本、图像、视频等多模式同时指导</li>\n<li><strong>计算优化</strong>：推理速度显著提升，使得实时应用变为可能</li>\n<li><strong>开源民主化</strong>：高质量模型不再被商业机构垄断</li>\n</ol>\n<h2>2025年的新前沿与创新突破</h2>\n<p>进入2025年，图像生成技术迎来了第五波创新浪潮，重点转向了三个关键方向：<strong>架构效率化</strong>、<strong>多模态统一</strong>、和<strong>实时可控生成</strong>。这些创新标志着从单纯追求生成质量向实用性、效率性和可控性的转变。</p>\n<h3>架构创新：状态空间模型的崛起</h3>\n<p>长期以来，Transformer的自注意力机制虽然强大，但其二次计算复杂度 <img alt=\"O(n^2)\" src=\"https://www.zhihu.com/equation?tex=O%28n%5E2%29\" /> 成为了瓶颈。2025年，状态空间模型（SSM）与Mamba架构的融合为图像生成带来了根本性的效率提升。</p>\n<p>扩散Transformer-to-Mamba蒸馏（T2MD）技术代表了这一方向的重要突破。该方法不是从零开始训练Mamba模型（成本高、数据需求大），而是采用知识蒸馏策略——让一个已经训练好的扩散Transformer作为教师，将其学到的生成知识「转移」到效率更高的Mamba学生模型。具体流程包括：</p>\n<ul>\n<li>建立扩散自注意力和Mamba混合架构</li>\n<li>通过层级强制（layer-wise forcing）进行逐层对齐</li>\n<li>基于特征的知识蒸馏减少优化难度</li>\n<li>从512×512基础模型进行轻量级适应，最终达到2048×2048高分辨率</li>\n</ul>\n<p>建立扩散自注意力和Mamba混合架构 通过层级强制（layer-wise forcing）进行逐层对齐 基于特征的知识蒸馏减少优化难度 从512×512基础模型进行轻量级适应，最终达到2048×2048高分辨率 更激进的工作是”Pushing the Boundaries of State Space Models”，构建了迄今最大的扩散SSM-Transformer混合模型，参数达50亿。该模型基于亚二次复杂度的Hydra架构（双向混合机制），能够生成2K分辨率图像和360p、8秒（16 FPS）的视频，展现了SSM在处理长序列时的优势。与标准Transformer相比，这种混合架构将推理时间复杂度从 <img alt=\"O(T^2)\" src=\"https://www.zhihu.com/equation?tex=O%28T%5E2%29\" /> 降低到 <img alt=\"O(T\\log T)\" src=\"https://www.zhihu.com/equation?tex=O%28T%5Clog+T%29\" /> 或线性复杂度，在大规模生成任务中性能提升显著。</p>\n<p>这一转变的深层意义在于：<strong>生成任务正在从注意力主导转向混合范式</strong>。不同于语言任务中Transformer一统天下，视觉生成任务因其长序列特性（数千个patch标记）更适合混合架构。这为未来的大规模视频生成和实时应用打开了可能。</p>\n<h3>多模态统一框架：UnityVideo</h3>\n<p>UnityVideo框架代表了2025年多模态融合的重要进展，将图像生成从「单一文本条件」推进到「多条件多任务联合学习」。该框架的创新在于建立了一个统一的接口来处理不同模态的条件：</p>\n<ul>\n<li><strong>输入模态多样化</strong>：文本提示、语义分割掩码、人体骨架、DensePose、光流、深度图等</li>\n<li><strong>动态噪声注入</strong>：通过在不同模态的输入上引入可控的噪声，统一异质数据的训练范式</li>\n<li><strong>模态切换器</strong>：带有上下文学习器的动态路由机制，通过模块化参数和少次学习实现对新模态的快速适应</li>\n</ul>\n<p>该框架贡献了一个包含130万样本的大规模数据集OpenUni，涵盖多种模态的配对数据。关键的洞察是：通过联合学习，模型不仅提升了单任务性能，更重要的是获得了强大的<strong>零样本泛化能力</strong>——对未见的模态组合、新对象和风格都能快速适应。</p>\n<p>UnityVideo在结构上解决了一个长期困扰多模态学习的问题：<strong>如何在统一框架内处理异质性</strong>。传统方法需要为每种模态设计专门的编码器和融合机制，导致模型复杂度指数增长。UnityVideo通过「统一前处理、条件化处理、动态路由」的三层设计，将这个问题优雅地转化为一个可学习的参数化问题。</p>\n<h3>推理优化：流式生成的实用化</h3>\n<p>生成速度一直是扩散模型的阿喀琉斯之踵。2025年的推理优化技术使得<strong>实时交互式视频生成</strong>从实验室走向可部署的系统。  </p>\n<p><strong>Q-VDiT量化框架</strong>为视频生成量化做出了专门设计。传统的量化方法（如均匀量化）在扩散模型上性能下降严重，原因在于它忽视了不同令牌和时间步的量化敏感性差异。Q-VDiT的创新包括：</p>\n<ol>\n<li><strong>token感知量化估计器（TQE）</strong>：从正交的token维度和特征维度两个方向分别补偿量化误差，适应不同时间步对精度的不同需求</li>\n<li><strong>时间保持蒸馏（TMD）</strong>：在量化过程中保持帧间的时空相关性，确保视频生成的连贯性</li>\n</ol>\n<p>在W3A6配置下（3比特权重、6比特激活），Q-VDiT在场景一致性上达到23.40，比现有最佳方法高1.9倍，同时推理速度提升3-5倍。</p>\n<p><strong>StreamDiffusionV2系统</strong>则通过系统级优化实现了一个完全实用的实时解决方案。该系统集成了：</p>\n<ul>\n<li>SLO感知的批处理和块调度器</li>\n<li>token引导的滚动KV缓存（减少内存占用）</li>\n<li>运动感知噪声控制（增强时间连贯性）</li>\n<li>混精度计算和异步处理</li>\n</ul>\n<p>在四块H100 GPU上，140亿参数模型可达58.28 FPS（无降噪步骤）或31.62 FPS（有降噪步骤），13亿参数模型分别可达64.52 FPS和61.58 FPS。这意味着<strong>实时视频生成已经成为现实</strong>，不再是实验性功能。</p>\n<h3>可控生成：细粒度编辑的突破</h3>\n<p>SliderEdit框架在可控图像编辑中实现了一个长期目标——连续、细粒度的指令控制。传统编辑模型通常是离散的（要么应用编辑指令，要么不应用），或者需要为每个新的编辑属性单独微调。SliderEdit改变了这个范式：</p>\n<p>给定多部分编辑指令（如「增加人物年龄」、「改变背景颜色」、「调整光线强度」等），SliderEdit学习一组低秩适应矩阵，这些矩阵可以平滑地插值。用户可以通过调整滑块来连续改变编辑的强度，就像在Photoshop中调整滑块参数一样。</p>\n<p>数学上，这是通过LoRA（Low-Rank Adaptation）的扩展实现的。对于每个编辑方向 <img alt=\"d\" src=\"https://www.zhihu.com/equation?tex=d\" />，模型学习 <img alt=\"\\Delta W_d = U_d V_d^T\" src=\"https://www.zhihu.com/equation?tex=%5CDelta+W_d+%3D+U_d+V_d%5ET\" />，使得对于任意标量 <img alt=\"\\alpha \\in [0, 1]\" src=\"https://www.zhihu.com/equation?tex=%5Calpha+%5Cin+%5B0%2C+1%5D\" />，都有：</p>\n<p><img alt=\"\\text{edit}(x, \\alpha, d) = x + \\alpha \\cdot U_d V_d^T (f(x))\" src=\"https://www.zhihu.com/equation?tex=%5Ctext%7Bedit%7D%28x%2C+%5Calpha%2C+d%29+%3D+x+%2B+%5Calpha+%5Ccdot+U_d+V_d%5ET+%28f%28x%29%29\" /></p>\n<p>这允许平滑的编辑插值，同时保持空间局部性和全局语义一致性。在FLUX-Kontext和Qwen-Image-Edit等最新模型上的应用显示，这种方法在编辑可控性、视觉一致性和用户体验上都有显著改进。</p>\n<h2>技术演进背后的深层逻辑</h2>\n<p><img alt=\"\" src=\"https://pic2.zhimg.com/v2-1f2e0fd4b76115d2f2129741e1c50365_1440w.jpg\" /></p>\n<p>图像生成技术演进时间线（2013-2025）：展示从VAE到Sora的完整发展路径，包含关键技术、性能指标（FID分数）、架构演变（从多层感知机到Transformer）、以及条件能力的提升（从无条件到多模态融合）。时间线用不同颜色区分各个技术阶段。</p>\n<p><strong>四个维度的进化</strong>  </p>\n<p>回顾2013-2025年的演进路径，我们可以看到四条贯穿始终的线索：</p>\n<p><img alt=\"\" src=\"https://pic3.zhimg.com/v2-ad846b233ccc28bd83d2bdf8fae6595a_1440w.jpg\" /></p>\n<p>为什么这个顺序是必然的</p>\n<p>每一次技术跃进都是前一阶段固有限制的直接回应：</p>\n<ol>\n<li><strong>VAE→扩散</strong>：VAE生成质量受限于KL散度正则项导致的过度平滑。扩散模型通过逐步去噪，在每一步只预测一个小幅度的改变，避免了这个问题。</li>\n<li><strong>像素空间→潜空间</strong>：扩散在像素空间的计算复杂度随图像分辨率以立方的速度增长。LDM通过VAE压缩，将问题转移到低维空间，使高分辨率生成变得可行。</li>\n<li><strong>U-Net→Transformer</strong>：U-Net虽然设计良好，但其参数效率和扩展性存在瓶颈。Transformer的注意力机制使其能够在增加参数时持续改进性能，打开了大规模预训练的可能。</li>\n<li><strong>文本条件→多模态</strong>：单一的文本条件限制了生成的灵活性。多模态输入（文本+图像+草图）让模型能够更精确地理解用户意图，在实际应用中价值倍增。</li>\n</ol>\n<h3>未来研究方向</h3>\n<p>虽然扩散模型在图像生成中已经取得巨大成功，但开放的问题依然众多：  </p>\n<ol>\n<li>更长程的视频一致性  </li>\n</ol>\n<p>Sora的60秒上限仍然相对较短。电影级别的长视频生成需要更强大的长程依赖建模能力。一个有前景的方向是结合循环注意力机制或外部记忆结构。  </p>\n<ol>\n<li>3D世界建模  </li>\n</ol>\n<p>当前的模型在处理3D场景时往往失败——它们生成的是2D图案的3D假象。真正的3D理解需要模型学会隐式表示3D几何和表面属性。NeRF和3D高斯溅射等技术可能是方向。  </p>\n<ol>\n<li>物理模拟  </li>\n</ol>\n<p>Sora展现出了某种物理直觉，但这种直觉是隐式的且易出错。显式地在生成过程中融入物理约束（通过可微物理引擎）可能提升真实性和可控性。  </p>\n<ol>\n<li>实时交互生成  </li>\n</ol>\n<p>当前的生成通常是一次性的——用户输入提示，模型生成结果。实时交互生成（用户在生成过程中调整，模型快速更新）仍处于早期阶段。这需要极大地加快推理速度。  </p>\n<ol>\n<li>因果理解与干预  </li>\n</ol>\n<p>生成模型通常学到的是关联而非因果。在可控生成中，理解哪些属性因果影响其他属性至关重要。这是从关联模型向因果模型转型的一步。</p>\n<h2>结语</h2>\n<p>从2013年的VAE到2024年的Sora，图像生成领域完成了一次彻底的范式转变。每一步突破都不是偶然，而是前一阶段的痛点催生了新的思想，新的思想推动了新的突破。  </p>\n<p>这个故事还在继续。当我们写下这些文字时，新的想法正在诞生，新的论文正在发表。但这十二年的历史清晰地告诉我们：在AI领域，真正的进步来自于对根本问题的深思熟虑、对数学的严谨尊重，以及对计算可能性的大胆探索。图像生成的演进正是这三者完美结合的证明。</p>\n<h2>参考文献与资源索引</h2>\n<p>VAE与表征学习</p>\n<ul>\n<li>Kingma, D. P., &amp; Welling, M. (2013). \"Auto-Encoding Variational Bayes.\" ArXiv:1312.6114 - <a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/1312.6114\">链接</a></li>\n<li>Rezende, D. J., Mohamed, S., &amp; Wierstra, D. (2014). \"Stochastic Backpropagation and Approximate Inference in Deep Generative Models.\" ICML - <a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/1401.4082\">链接</a></li>\n</ul>\n<p>扩散模型基础</p>\n<ul>\n<li>Sohl-Dickstein, J., Weiss, E., Maheswaranathan, N., &amp; Bengio, S. (2015). \"Deep Unsupervised Learning using Nonequilibrium Thermodynamics.\" ICML - <a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/1503.03585\">链接</a></li>\n<li>Ho, J., Jain, A., &amp; Abbeel, P. (2020). \"Denoising Diffusion Probabilistic Models.\" NeurIPS - <a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2006.11239\">链接</a></li>\n<li>Song, Y., Sohl-Dickstein, J., Kingma, D. P., Kumar, A., Ermon, S., &amp; Poole, B. (2021). \"Score-Based Generative Modeling through Stochastic Differential Equations.\" ICLR - <a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2011.13456\">链接</a></li>\n</ul>\n<p><strong>Vision Transformer</strong></p>\n<ul>\n<li>Dosovitskiy, A., Beyer, L., Kolesnikov, A., Weissenborn, D., Zhai, X., Unterthiner, T., ... &amp; Houlsby, N. (2020). \"An Image is Worth 16x16 Words: Transformers for Image Recognition at Scale.\" ICLR - <a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2010.11929\">链接</a></li>\n</ul>\n<p><strong>多模态学习</strong></p>\n<ul>\n<li>Radford, A., Kim, J. W., Hallacy, C., Ramesh, A., Goh, G., Agarwal, S., ... &amp; Sutskever, I. (2021). \"Learning Transferable Visual Models From Natural Language Supervision.\" ICML - <a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2103.00020\">链接</a></li>\n</ul>\n<p><strong>潜空间扩散模型</strong></p>\n<ul>\n<li>Rombach, R., Blattmann, A., Lorenz, D., Esser, P., &amp; Ommer, B. (2022). \"High-Resolution Image Synthesis with Latent Diffusion Models.\" CVPR - <a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2112.10752\">链接</a></li>\n<li>Ho, J., &amp; Salimans, T. (2022). \"Classifier-Free Diffusion Guidance.\" ArXiv:2207.12598 - <a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2207.12598\">链接</a></li>\n</ul>\n<p><strong>扩散变换器</strong></p>\n<ul>\n<li>Peebles, W., &amp; Xie, S. (2023). \"Scalable Diffusion Models with Transformers.\" ICCV - <a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2212.09748\">链接</a></li>\n</ul>\n<p><strong>视频生成</strong></p>\n<ul>\n<li>Brooks, T., Holynski, A., &amp; Efros, A. A. (2023). \"Instructing Pix2Pix: Exploring Semantic Guidance for Zero-Shot Image Translation.\" NeurIPS - <a href=\"https://link.zhihu.com/?target=https%3A//pix2pixinst.github.io/\">参考</a></li>\n<li>OpenAI. (2024). \"Video generation models as world simulators.\" <a href=\"https://link.zhihu.com/?target=https%3A//openai.com/research/video-generation-models-as-world-simulators\">官方技术报告</a></li>\n</ul>"
    }
  ],
  "latest_overview": [
    {
      "title": "",
      "body_html": "<h1>一文了解文生图大模型近期发展趋势</h1>\n<ul>\n<li>来源平台: <strong>zhihu</strong>（知乎专栏文章）</li>\n<li>原文链接: <a href=\"https://zhuanlan.zhihu.com/p/2036856392343085477\">https://zhuanlan.zhihu.com/p/2036856392343085477</a></li>\n<li>作者: 榴莲酥</li>\n</ul>\n<hr />\n<p>一文了解文生图大模型近期发展趋势</p>\n<h1>一文了解文生图大模型近期发展趋势</h1>\n<p>作者: 榴莲酥, 赞: 5</p>\n<blockquote>\n<p>一句话总结：超高分辨率与灵活画幅；多图一致性；理解生成统一；图像和视频生态联动。</p>\n</blockquote>\n<h2>总结表格：</h2>\n<p><img alt=\"\" src=\"https://pica.zhimg.com/v2-49e0ead8d088307ccdb8c8b1eebb12e6_1440w.jpg\" /></p>\n<p>生图模型近期更新概况：</p>\n<hr />\n<h2>整体趋势：</h2>\n<h3>1. 超高分辨率与灵活画幅：从“够用”到“原生与无界”</h3>\n<p><strong>【现状总结】</strong></p>\n<ul>\n<li>4K（最长边 3840px）目前已成为第一梯队模型的标配。</li>\n<li>原生高分辨率：更重要的是底层的生成逻辑正在改变——像 Seedream 5.0 已经实现了原生 4K 直出，而非依赖后期的超分辨率放大（Upscaling）。同时，GPT Image 2（3:1 到 1:3）和 Nano Banana 2（8:1 到 1:8）打破了传统摄影画幅的限制，完美支持了非常规的极端长宽比。</li>\n</ul>\n<p><strong>【未来方向】</strong></p>\n<ul>\n<li>无限画幅与全景生成：未来模型将不再受限于固定的矩形框，能够根据提示词自动延展画幅，直接生成 360 度 VR 全景图、超长网页滚动背景或无限延伸的清明上河图式长卷。</li>\n<li>自适应排版：模型将能够根据目标媒介（如手机屏幕、户外广告牌）自动调整构图，确保主体在任何极端比例下都不被裁切或变形。</li>\n</ul>\n<h3>2. 多图一致性：从“单张抽卡”到“IP 资产化”</h3>\n<p><strong>【现状总结】</strong></p>\n<ul>\n<li>以前让 AI 在不同图片中保持同 ID 的长相、服装或特定物体的细节通常需要复杂的 LoRA 训练或 ControlNet 工作流。</li>\n<li>如今，**零样本/少样本一致性（Zero-shot/Few-shot Consistency）**已成为基操。GPT Image 2 的“思考模式”能一次性输出 8 张高度一致的连环画，Seedream 5.0 支持多达 14 张参考图来锚定面部和特征。</li>\n</ul>\n<p><strong>【未来方向】</strong></p>\n<ul>\n<li>会话级记忆（Session State）：模型将具备长期的视觉记忆。用户可以像聊天一样，在同一个对话窗口中让同一个角色换衣服、换场景、做不同动作，甚至跨越不同的年龄段，而角色特征始终保持绝对一致。</li>\n<li>个人/企业专属模型：文生图将彻底颠覆漫画、绘本、游戏资产和品牌营销的生产流，创作者可以轻松构建并维护一个包含数百个一致性资产的“视觉 IP 库”。</li>\n</ul>\n<h3>3. 理解生成统一：从“盲目作画”到“思维链视觉推理”</h3>\n<p><strong>【现状总结】</strong></p>\n<ul>\n<li>早期： Diffusion 模型往往是“文盲”且缺乏常识（例如画错手指、文字乱码、违反物理规律）。2026 年的模型通过引入超大参数的语言模型（如 FLUX.2 结合 Mistral-3 24B）或采用自回归 MoE 架构（如 Grok 的 Aurora），实现了理解与生成的底层统一。</li>\n</ul>\n<p>当前支持了👇</p>\n<ul>\n<li>文本渲染：GPT Image 2 实现了 99% 的多语言排版准确率，AI 终于“识字”了。</li>\n<li>事实增强：Nano Banana 2 引入了搜索增强（Grounding），作画前先查资料，确保现实地标和新闻事件的准确性。</li>\n<li>视觉思维链（CoT）：Seedream 5.0 在构图前会进行逻辑推理，确保光影方向、物理遮挡和景深符合现实规律。</li>\n</ul>\n<p><strong>【未来方向】</strong></p>\n<ul>\n<li>原生多模态大一统：LLM（大语言模型）和视觉生成模型将彻底合并为一个网络。模型不再是“翻译提示词去画画”，而是直接在同一个潜空间内同时处理文本、逻辑和像素。</li>\n<li>物理世界模拟器：模型将真正理解“重力”、“材质反射”和“空间结构”，生成的图像不再是 2D 贴图，而是包含 3D 深度信息的物理正确切片。</li>\n</ul>\n<h3>4.图片生成和视频生成联动：从“静态终点 ”到“动态起点”</h3>\n<p><strong>【现状总结】</strong></p>\n<ul>\n<li>图片不再是 AI 生成的最终产物，而是视频生成的“完美第一帧（Keyframe）”。</li>\n<li>\n<p>各大厂商都在打通图生视频的生态壁垒，例如字节跳动的 Seedream 与视频模型 Seedance 实现了底层特征的对齐，用户生成满意的 4K 图像后，可以无缝、无损地将其转化为动态视频。</p>\n</li>\n<li>\n<p><strong>未来方向</strong>：</p>\n</li>\n<li>时空统一模型（4D Models）：未来的文生图和文生视频将不再是两个独立的工具。用户生成一张图片后，可以直接通过自然语言下达指令：“让摄像机向前推进”、“让画面里的光线从清晨变成黄昏”、“让画中的人物转头”。</li>\n<li>交互式图像：生成的图像将包含时间维度和交互属性，成为一种“可播放、可探索”的动态资产空间，彻底模糊图片、视频和 3D 游戏引擎之间的界限。</li>\n</ul>\n<hr />\n<h3>榜单</h3>\n<p>参考<a href=\"https://link.zhihu.com/?target=https%3A//artificialanalysis.ai/%3Fintelligence%3Dartificial-analysis-intelligence-index%26intelligence-category%3Dopen-weights-vs-proprietary%26media-leaderboards%3Dimage-editing\">artificialanalysis</a>平台</p>\n<p><img alt=\"\" src=\"https://picx.zhimg.com/v2-62880abfe07aceddcbf6d743f545a869_1440w.jpg\" /></p>\n<p>文生图榜单</p>\n<p><img alt=\"\" src=\"https://picx.zhimg.com/v2-c1e31690ca8756635580677642b2c39f_1440w.jpg\" /></p>\n<p>图片编辑榜单</p>\n<p>推荐阅读：<a href=\"https://zhuanlan.zhihu.com/p/2031823577171900186\">国产之光VS御三家—近期大模型更新概况</a>，<a href=\"https://zhuanlan.zhihu.com/p/1985442260779823812\">关于AI大模型你需要了解什么？</a></p>"
    }
  ],
  "graph": {
    "nodes": [
      {
        "id": "stackgan",
        "x": 100,
        "y": 100,
        "category": "gan_era"
      },
      {
        "id": "attngan",
        "x": 200,
        "y": 100,
        "category": "gan_era"
      },
      {
        "id": "stylegan",
        "x": 300,
        "y": 100,
        "category": "gan_era"
      },
      {
        "id": "vqvae",
        "x": 100,
        "y": 200,
        "category": "vae_discrete"
      },
      {
        "id": "vqgan",
        "x": 400,
        "y": 200,
        "category": "vae_discrete"
      },
      {
        "id": "llamagen",
        "x": 800,
        "y": 200,
        "category": "vae_discrete"
      },
      {
        "id": "ddpm",
        "x": 400,
        "y": 300,
        "category": "diffusion_foundation"
      },
      {
        "id": "ddim",
        "x": 450,
        "y": 280,
        "category": "diffusion_foundation"
      },
      {
        "id": "score_sde",
        "x": 450,
        "y": 320,
        "category": "diffusion_foundation"
      },
      {
        "id": "clip",
        "x": 500,
        "y": 300,
        "category": "diffusion_foundation"
      },
      {
        "id": "ldm",
        "x": 600,
        "y": 400,
        "category": "sd_evolution"
      },
      {
        "id": "sd_v2",
        "x": 650,
        "y": 400,
        "category": "sd_evolution"
      },
      {
        "id": "controlnet",
        "x": 700,
        "y": 380,
        "category": "sd_evolution"
      },
      {
        "id": "ip_adapter",
        "x": 700,
        "y": 420,
        "category": "sd_evolution"
      },
      {
        "id": "sdxl",
        "x": 750,
        "y": 400,
        "category": "sd_evolution"
      },
      {
        "id": "sd3",
        "x": 850,
        "y": 400,
        "category": "sd_evolution"
      },
      {
        "id": "flux_1",
        "x": 900,
        "y": 400,
        "category": "sd_evolution"
      },
      {
        "id": "lumina_mgpt",
        "x": 950,
        "y": 200,
        "category": "frontier_2026"
      },
      {
        "id": "npp",
        "x": 950,
        "y": 220,
        "category": "frontier_2026"
      },
      {
        "id": "infinitystar",
        "x": 1000,
        "y": 200,
        "category": "frontier_2026"
      },
      {
        "id": "argen_dexion",
        "x": 1000,
        "y": 220,
        "category": "frontier_2026"
      },
      {
        "id": "nextstep_1",
        "x": 1000,
        "y": 240,
        "category": "frontier_2026"
      },
      {
        "id": "tlcm",
        "x": 850,
        "y": 500,
        "category": "frontier_2026"
      },
      {
        "id": "dit_air",
        "x": 920,
        "y": 480,
        "category": "frontier_2026"
      },
      {
        "id": "pixart_alpha",
        "x": 900,
        "y": 500,
        "category": "frontier_2026"
      },
      {
        "id": "sana",
        "x": 950,
        "y": 500,
        "category": "frontier_2026"
      },
      {
        "id": "mm_r1",
        "x": 980,
        "y": 440,
        "category": "frontier_2026"
      },
      {
        "id": "vinci",
        "x": 1020,
        "y": 440,
        "category": "frontier_2026"
      },
      {
        "id": "lmfusion",
        "x": 1000,
        "y": 460,
        "category": "frontier_2026"
      },
      {
        "id": "unigen",
        "x": 1040,
        "y": 460,
        "category": "frontier_2026"
      }
    ],
    "edges": [
      {
        "from": "stackgan",
        "to": "attngan",
        "label": "注意力增强"
      },
      {
        "from": "attngan",
        "to": "stylegan",
        "label": "风格控制"
      },
      {
        "from": "vqvae",
        "to": "vqgan",
        "label": "感知增强"
      },
      {
        "from": "vqgan",
        "to": "llamagen",
        "label": "自回归统一"
      },
      {
        "from": "ddpm",
        "to": "ddim",
        "label": "加速采样"
      },
      {
        "from": "ddpm",
        "to": "score_sde",
        "label": "理论统一"
      },
      {
        "from": "ddpm",
        "to": "ldm",
        "label": "潜空间迁移"
      },
      {
        "from": "ldm",
        "to": "sd_v2",
        "label": "编码器升级"
      },
      {
        "from": "sd_v2",
        "to": "sdxl",
        "label": "级联增强"
      },
      {
        "from": "sdxl",
        "to": "sd3",
        "label": "MMDiT引入"
      },
      {
        "from": "sd3",
        "to": "flux_1",
        "label": "流匹配巅峰"
      },
      {
        "from": "ldm",
        "to": "controlnet",
        "label": "空间控制"
      },
      {
        "from": "ldm",
        "to": "ip_adapter",
        "label": "图像提示"
      },
      {
        "from": "llamagen",
        "to": "lumina_mgpt",
        "label": "多模态扩展"
      },
      {
        "from": "llamagen",
        "to": "npp",
        "label": "预测策略"
      },
      {
        "from": "lumina_mgpt",
        "to": "infinitystar",
        "label": "时空统一"
      },
      {
        "from": "llamagen",
        "to": "argen_dexion",
        "label": "解码器增强"
      },
      {
        "from": "llamagen",
        "to": "nextstep_1",
        "label": "连续Token"
      },
      {
        "from": "ldm",
        "to": "tlcm",
        "label": "一致性加速"
      },
      {
        "from": "sd3",
        "to": "dit_air",
        "label": "架构优化"
      },
      {
        "from": "sd3",
        "to": "pixart_alpha",
        "label": "训练高效"
      },
      {
        "from": "pixart_alpha",
        "to": "sana",
        "label": "线性注意力"
      },
      {
        "from": "flux_1",
        "to": "mm_r1",
        "label": "偏好对齐"
      },
      {
        "from": "mm_r1",
        "to": "vinci",
        "label": "推理增强"
      },
      {
        "from": "flux_1",
        "to": "lmfusion",
        "label": "理解生成统一"
      },
      {
        "from": "lmfusion",
        "to": "unigen",
        "label": "多任务统一"
      }
    ],
    "milestones": [
      {
        "id": "clip",
        "label": "跨模态语义对齐基石"
      },
      {
        "id": "ldm",
        "label": "潜空间扩散开创开源生态"
      },
      {
        "id": "flux_1",
        "label": "流匹配与大规模Transformer成熟"
      }
    ]
  },
  "algos": [
    {
      "id": "stackgan",
      "num": 1,
      "name": "StackGAN",
      "fullName": "条件增强文生图 (StackGAN)",
      "year": "2017",
      "org": "百度/Rutgers",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/1612.03242",
      "projectUrl": "",
      "category": "gan_era",
      "motivation": "两阶段生成与条件增强",
      "summary": "StackGAN 的核心目标是：两阶段生成与条件增强。",
      "keyPoints": [
        "核心动机：两阶段生成与条件增强",
        "代表机构：百度/Rutgers"
      ],
      "detail": "<p>两阶段生成与条件增强</p>"
    },
    {
      "id": "attngan",
      "num": 2,
      "name": "AttnGAN",
      "fullName": "注意力文生图 (AttnGAN)",
      "year": "2018",
      "org": "微软",
      "parent": "stackgan",
      "paperUrl": "https://arxiv.org/abs/1711.10485",
      "projectUrl": "",
      "category": "gan_era",
      "motivation": "单词级注意力与DAMSM",
      "summary": "AttnGAN 的核心目标是：单词级注意力与DAMSM。",
      "keyPoints": [
        "核心动机：单词级注意力与DAMSM",
        "演化来源：继承或改进自 stackgan",
        "代表机构：微软"
      ],
      "detail": "<p>单词级注意力与DAMSM</p>"
    },
    {
      "id": "stylegan",
      "num": 3,
      "name": "StyleGAN",
      "fullName": "风格生成网络 (StyleGAN)",
      "year": "2019",
      "org": "NVIDIA",
      "parent": "attngan",
      "paperUrl": "https://arxiv.org/abs/1812.04948",
      "projectUrl": "",
      "category": "gan_era",
      "motivation": "映射网络与AdaIN风格注入",
      "summary": "StyleGAN 的核心目标是：映射网络与AdaIN风格注入。",
      "keyPoints": [
        "核心动机：映射网络与AdaIN风格注入",
        "演化来源：继承或改进自 attngan",
        "代表机构：NVIDIA"
      ],
      "detail": "<p>映射网络与AdaIN风格注入</p>"
    },
    {
      "id": "vqvae",
      "num": 4,
      "name": "VQ-VAE",
      "fullName": "矢量量化变分自编码器 (VQ-VAE)",
      "year": "2017",
      "org": "DeepMind",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/1711.00937",
      "projectUrl": "",
      "category": "vae_discrete",
      "motivation": "可学习码本将图像离散化",
      "summary": "VQ-VAE 的核心目标是：可学习码本将图像离散化。",
      "keyPoints": [
        "核心动机：可学习码本将图像离散化",
        "代表机构：DeepMind"
      ],
      "detail": "<p>可学习码本将图像离散化</p>"
    },
    {
      "id": "vqgan",
      "num": 5,
      "name": "VQ-GAN",
      "fullName": "矢量量化生成网络 (VQ-GAN)",
      "year": "2020",
      "org": "海德堡大学",
      "parent": "vqvae",
      "paperUrl": "https://arxiv.org/abs/2012.09841",
      "projectUrl": "",
      "category": "vae_discrete",
      "motivation": "CNN归纳偏置与Transformer建模",
      "summary": "VQ-GAN 的核心目标是：CNN归纳偏置与Transformer建模。",
      "keyPoints": [
        "核心动机：CNN归纳偏置与Transformer建模",
        "演化来源：继承或改进自 vqvae",
        "代表机构：海德堡大学"
      ],
      "detail": "<p>CNN归纳偏置与Transformer建模</p>"
    },
    {
      "id": "ddpm",
      "num": 6,
      "name": "DDPM",
      "fullName": "去噪扩散概率模型 (DDPM)",
      "year": "2020",
      "org": "UC Berkeley",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2006.11239",
      "projectUrl": "",
      "category": "diffusion_foundation",
      "motivation": "确立去噪扩散范式",
      "summary": "DDPM 的核心目标是：确立去噪扩散范式。",
      "keyPoints": [
        "核心动机：确立去噪扩散范式",
        "代表机构：UC Berkeley"
      ],
      "detail": "<p>确立去噪扩散范式</p>"
    },
    {
      "id": "ddim",
      "num": 7,
      "name": "DDIM",
      "fullName": "去噪扩散隐式模型 (DDIM)",
      "year": "2020",
      "org": "Stanford",
      "parent": "ddpm",
      "paperUrl": "https://arxiv.org/abs/2010.02502",
      "projectUrl": "",
      "category": "diffusion_foundation",
      "motivation": "非马尔可夫加速采样",
      "summary": "DDIM 的核心目标是：非马尔可夫加速采样。",
      "keyPoints": [
        "核心动机：非马尔可夫加速采样",
        "演化来源：继承或改进自 ddpm",
        "代表机构：Stanford"
      ],
      "detail": "<p>非马尔可夫加速采样</p>"
    },
    {
      "id": "score_sde",
      "num": 8,
      "name": "Score SDE",
      "fullName": "基于分数的SDE (Score SDE)",
      "year": "2020",
      "org": "Stanford",
      "parent": "ddpm",
      "paperUrl": "https://arxiv.org/abs/2011.13456",
      "projectUrl": "",
      "category": "diffusion_foundation",
      "motivation": "统一SDE理论框架",
      "summary": "Score SDE 的核心目标是：统一SDE理论框架。",
      "keyPoints": [
        "核心动机：统一SDE理论框架",
        "演化来源：继承或改进自 ddpm",
        "代表机构：Stanford"
      ],
      "detail": "<p>统一SDE理论框架</p>"
    },
    {
      "id": "clip",
      "num": 9,
      "name": "CLIP",
      "fullName": "对比语言图像预训练 (CLIP)",
      "year": "2021",
      "org": "OpenAI",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2103.00020",
      "projectUrl": "",
      "category": "diffusion_foundation",
      "motivation": "大规模跨模态语义对齐",
      "summary": "CLIP 的核心目标是：大规模跨模态语义对齐。",
      "keyPoints": [
        "核心动机：大规模跨模态语义对齐",
        "代表机构：OpenAI"
      ],
      "detail": "<p>大规模跨模态语义对齐</p>"
    },
    {
      "id": "ldm",
      "num": 10,
      "name": "LDM/SD v1.5",
      "fullName": "潜在扩散模型 (Latent Diffusion)",
      "year": "2022",
      "org": "CompVis/Stability AI",
      "parent": "ddpm",
      "paperUrl": "https://arxiv.org/abs/2112.10752",
      "projectUrl": "",
      "category": "sd_evolution",
      "motivation": "潜空间扩散降低计算成本",
      "summary": "LDM/SD v1.5 的核心目标是：潜空间扩散降低计算成本。",
      "keyPoints": [
        "核心动机：潜空间扩散降低计算成本",
        "演化来源：继承或改进自 ddpm",
        "代表机构：CompVis/Stability AI"
      ],
      "detail": "<p>潜空间扩散降低计算成本</p>"
    },
    {
      "id": "sd_v2",
      "num": 11,
      "name": "SD v2.0",
      "fullName": "Stable Diffusion v2.0",
      "year": "2022.11",
      "org": "Stability AI",
      "parent": "ldm",
      "paperUrl": "—",
      "projectUrl": "",
      "category": "sd_evolution",
      "motivation": "OpenCLIP编码器升级",
      "summary": "SD v2.0 的核心目标是：OpenCLIP编码器升级。",
      "keyPoints": [
        "核心动机：OpenCLIP编码器升级",
        "演化来源：继承或改进自 ldm",
        "代表机构：Stability AI"
      ],
      "detail": "<p>OpenCLIP编码器升级</p>"
    },
    {
      "id": "sdxl",
      "num": 12,
      "name": "SDXL",
      "fullName": "Stable Diffusion XL",
      "year": "2023",
      "org": "Stability AI",
      "parent": "sd_v2",
      "paperUrl": "https://arxiv.org/abs/2307.01952",
      "projectUrl": "",
      "category": "sd_evolution",
      "motivation": "Base+Refiner级联架构",
      "summary": "SDXL 的核心目标是：Base+Refiner级联架构。",
      "keyPoints": [
        "核心动机：Base+Refiner级联架构",
        "演化来源：继承或改进自 sd_v2",
        "代表机构：Stability AI"
      ],
      "detail": "<p>Base+Refiner级联架构</p>"
    },
    {
      "id": "sd3",
      "num": 13,
      "name": "SD3",
      "fullName": "Stable Diffusion 3",
      "year": "2024.02",
      "org": "Stability AI",
      "parent": "sdxl",
      "paperUrl": "—",
      "projectUrl": "",
      "category": "sd_evolution",
      "motivation": "MMDiT架构与整流流",
      "summary": "SD3 的核心目标是：MMDiT架构与整流流。",
      "keyPoints": [
        "核心动机：MMDiT架构与整流流",
        "演化来源：继承或改进自 sdxl",
        "代表机构：Stability AI"
      ],
      "detail": "<p>MMDiT架构与整流流</p>"
    },
    {
      "id": "flux_1",
      "num": 14,
      "name": "FLUX.1",
      "fullName": "FLUX.1流匹配模型 (FLUX.1)",
      "year": "2024.08",
      "org": "Black Forest Labs",
      "parent": "sd3",
      "paperUrl": "—",
      "projectUrl": "",
      "category": "sd_evolution",
      "motivation": "12B流匹配Transformer",
      "summary": "FLUX.1 的核心目标是：12B流匹配Transformer。",
      "keyPoints": [
        "核心动机：12B流匹配Transformer",
        "演化来源：继承或改进自 sd3",
        "代表机构：Black Forest Labs"
      ],
      "detail": "<p>12B流匹配Transformer</p>"
    },
    {
      "id": "controlnet",
      "num": 15,
      "name": "ControlNet",
      "fullName": "可控条件网络 (ControlNet)",
      "year": "2023",
      "org": "Stanford",
      "parent": "ldm",
      "paperUrl": "https://arxiv.org/abs/2302.05543",
      "projectUrl": "",
      "category": "sd_evolution",
      "motivation": "零卷积引入空间控制",
      "summary": "ControlNet 通过将预训练扩散模型（Stable Diffusion）的编码器权重克隆为可训练副本，并以**零卷积（Zero Convolution）**连接原始网络与副本，实现了在保留大模型生成能力的同时，精确注入边缘图、深度图、人体姿态等多种空间条件控制信号。",
      "keyPoints": [
        "<strong>零卷积机制</strong>：使用权重和偏置均初始化为零的 1×1 卷积层连接原始网络与训练副本，训练初始阶段输出恒为零，确保不向预训练模型注入有害噪声",
        "<strong>锁定副本架构</strong>：将预训练模型的编码器（locked copy）完整克隆为可训练副本（trainable copy），通过零卷积将副本输出加回原始网络的跳跃连接",
        "<strong>条件编码器</strong>：4 层卷积网络（4×4 kernel, 2×2 stride, 通道数 16→32→64→128, ReLU 激活），将 512×512 条件图像压缩为 64×64 特征图",
        "<strong>突然收敛现象</strong>：由于零卷积的保护，模型在约 6K 步时突然学会遵循条件，而非渐进式学习",
        "<strong>50% Prompt Dropout</strong>：训练时以 50% 概率将文本提示替换为空字符串，增强模型直接从条件图像识别语义的能力",
        "<strong>CFG Resolution Weighting</strong>：推理时对不同分辨率的 ControlNet 连接施加权重 <span class=\"kb-math kb-math-inline\">w_i = 64 / h_i</span>，消除 Classifier-Free Guidance 引起的伪影",
        "<strong>多 ControlNet 组合</strong>：多个 ControlNet 的输出可直接相加到 Stable Diffusion 模型中，实现多条件联合控制",
        "<strong>支持 8 种以上条件类型</strong>：Canny 边缘、HED 边界、M-LSD 直线、深度图、法线图、语义分割、人体姿态、用户涂鸦等"
      ],
      "detail": "<p><img alt=\"ControlNet 基本结构\" src=\"https://ar5iv.labs.arxiv.org/html/2302.05543/assets/x2.png\" />\n<em>图 2：(a) 原始神经网络块；(b) 加入 ControlNet 后的结构。可训练副本通过两组零卷积与原始锁定块相连。</em></p>\n<p><img alt=\"ControlNet 与 Stable Diffusion U-Net 的连接方式\" src=\"https://ar5iv.labs.arxiv.org/html/2302.05543/assets/x3.png\" />\n<em>图 3：ControlNet 连接到 Stable Diffusion U-Net 编码器的完整架构。SD 编码器的 12 个块和 1 个中间块被完整克隆，条件图像经 4 层卷积编码后输入可训练副本。</em></p>\n<pre><code class=\"language-python\"># ControlNet 训练与推理伪代码\n# === 训练阶段 ===\n# 初始化：克隆 SD 编码器权重 → trainable_copy\n#         创建零卷积层（weight=0, bias=0）→ zero_conv_in, zero_conv_out\n# 条件编码器 E: 4层Conv(4×4, stride=2) + ReLU, channels: 16→32→64→128\n\nfor batch in dataloader:\n    image, prompt, condition = batch          # condition: Canny/depth/pose 等\n    # 50% prompt dropout\n    if random() &lt; 0.5:\n        prompt = &quot;&quot;\n\n    z = VAE_encode(image)                     # 编码到潜空间 64×64\n    t = sample_timestep()\n    noise = sample_noise()\n    z_t = add_noise(z, noise, t)\n\n    c_f = E(condition)                        # 条件编码: 512×512 → 64×64\n\n    # Locked SD encoder (frozen)\n    h_locked = SD_encoder(z_t, t, prompt)     # 原始特征\n\n    # ControlNet (trainable copy)\n    h_ctrl = trainable_copy(z_t + zero_conv_in(c_f), t, prompt)\n    h_ctrl_out = zero_conv_out(h_ctrl)        # 各层输出经零卷积\n\n    # 将 ControlNet 输出加到 SD decoder 的跳跃连接\n    noise_pred = SD_decoder(h_locked + h_ctrl_out, t, prompt)\n\n    loss = MSE(noise_pred, noise)\n    loss.backward()                           # 仅更新 trainable_copy + zero_conv\n\n# === 推理阶段 (CFG Resolution Weighting) ===\n# 对每个连接层 i，施加权重 w_i = 64 / h_i (h_i 为该层特征图高度)\n# 条件引导: noise_pred = noise_uncond + β_cfg * (noise_cond - noise_uncond)\n</code></pre>\n<p><strong>动机与背景：为什么需要 ControlNet？</strong></p>\n<p>大规模文本到图像扩散模型（如 Stable Diffusion）虽然能生成高质量图像，但仅依靠文本提示难以精确控制生成图像的空间结构。例如，用户可能希望生成的图像严格遵循特定的边缘轮廓、人体姿态或深度布局。传统的微调方法（如直接 fine-tune 整个模型）在数据量有限时容易导致过拟合和灾难性遗忘，破坏预训练模型学到的丰富语义知识。ControlNet 的核心目标是：<strong>在不破坏预训练大模型能力的前提下，高效地学习新的空间条件控制</strong>。</p>\n<p><strong>核心机制：零卷积为何如此关键？</strong></p>\n<p>ControlNet 的核心创新在于<strong>零卷积（Zero Convolution）</strong>的设计。对于一个预训练的神经网络块 <span class=\"kb-math kb-math-inline\">\\mathcal{F}(\\cdot; \\Theta)</span>，ControlNet 创建其可训练副本 <span class=\"kb-math kb-math-inline\">\\mathcal{F}(\\cdot; \\Theta_c)</span>，并通过两组零卷积层 <span class=\"kb-math kb-math-inline\">\\mathcal{Z}(\\cdot; \\Theta_{z1})</span> 和 <span class=\"kb-math kb-math-inline\">\\mathcal{Z}(\\cdot; \\Theta_{z2})</span> 连接。零卷积是 1×1 卷积层，其权重和偏置在训练开始时均初始化为零。完整的前向传播公式为：</p>\n<div class=\"kb-math kb-math-display\">y_c = \\mathcal{F}(x; \\Theta) + \\mathcal{Z}\\big(\\mathcal{F}(x + \\mathcal{Z}(c; \\Theta_{z1}); \\Theta_c); \\Theta_{z2}\\big)</div>\n<p>在训练的第一步，由于 <span class=\"kb-math kb-math-inline\">\\mathcal{Z}</span> 的输出恒为零，因此 <span class=\"kb-math kb-math-inline\">y_c = \\mathcal{F}(x; \\Theta)</span>，即 ControlNet 的加入对原始模型的输出<strong>完全没有影响</strong>。这一特性至关重要——它意味着无论训练数据的质量如何，模型都不会在初始阶段被随机噪声破坏。论文的消融实验证实，如果将零卷积替换为标准高斯随机初始化的卷积层，预训练模型的能力会被立即摧毁，即使经过长时间训练也无法完全恢复。</p>\n<div class=\"key-point\">💡 <strong>关键直觉</strong>：零卷积就像一个\"安全阀\"——训练开始时完全关闭（输出为零），随着梯度更新逐渐打开，让条件信号以可控的速度流入预训练网络。</div>\n<p><strong>训练与推理流程</strong></p>\n<p>在 Stable Diffusion 的具体应用中，ControlNet 克隆了 U-Net 编码器的全部 12 个 Transformer 块和 1 个中间块（共 13 个块），参数量约为原始 SD 模型的一半。条件图像（如 Canny 边缘图）首先通过一个轻量级的 4 层卷积编码器 <span class=\"kb-math kb-math-inline\">\\mathcal{E}(\\cdot)</span> 从 512×512 压缩到 64×64 的特征图，与潜空间表示的分辨率对齐。训练损失为标准的噪声预测 MSE：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L} = \\mathbb{E}_{z_0, t, c_t, c_f, \\epsilon \\sim \\mathcal{N}(0,1)} \\left[ \\| \\epsilon - \\epsilon_\\theta(z_t, t, c_t, c_f) \\|_2^2 \\right]</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">c_t</span> 为文本提示，<span class=\"kb-math kb-math-inline\">c_f</span> 为条件特征图。训练时采用 50% 的 prompt dropout 策略（将 <span class=\"kb-math kb-math-inline\">c_t</span> 替换为空字符串），迫使模型学会直接从条件图像中识别语义内容（如从 Canny 边缘推断物体类别），而非完全依赖文本描述。</p>\n<p>推理阶段，ControlNet 与 Classifier-Free Guidance (CFG) 结合使用。然而，直接应用 CFG 会导致低分辨率特征层的引导信号过强，产生伪影。论文提出了 <strong>CFG Resolution Weighting</strong> 策略：对第 <span class=\"kb-math kb-math-inline\">i</span> 个连接层施加权重 <span class=\"kb-math kb-math-inline\">w_i = 64 / h_i</span>（<span class=\"kb-math kb-math-inline\">h_i</span> 为该层特征图的高度），使得高分辨率层（64×64）权重为 1，低分辨率层（8×8）权重为 8，有效平衡了不同尺度的控制强度。</p>\n<p><strong>与传统方法的区别和优势</strong></p>\n<p>与 HyperNetwork、Adapter 等轻量级微调方法相比，ControlNet 保留了预训练编码器的完整结构，因此能够学习更复杂的空间条件映射。消融实验表明，仅使用单层卷积连接的 ControlNet-lite 变体在处理复杂条件（如语义分割图）时效果显著下降。与全量微调相比，ControlNet 仅增加约 23% 的 GPU 显存和 34% 的训练时间，且由于锁定了原始模型权重，完全避免了灾难性遗忘的风险。此外，多个独立训练的 ControlNet 可以通过简单地将输出相加来实现多条件组合控制，无需联合训练。</p>\n<p><img alt=\"多种条件控制效果\" src=\"https://ar5iv.labs.arxiv.org/html/2302.05543/assets/imgs/qua.jpg\" />\n<em>图 7：ControlNet 在无文本提示情况下，仅通过不同类型的条件图像（Canny、HED、深度、法线、分割、姿态等）控制 Stable Diffusion 的生成结果。</em></p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：ControlNet 的\"突然收敛\"现象（约 6K 步时模型突然学会遵循条件）是零卷积保护机制的直接结果——模型在前期保持稳定输出，直到零卷积层的参数积累到足够大的值，条件信号才突然\"涌入\"网络。</div>",
      "quiz": {
        "q": "ControlNet 中零卷积（Zero Convolution）的核心作用是什么？",
        "options": [
          "减少模型参数量，提升训练效率",
          "在训练初始阶段确保 ControlNet 不向预训练模型注入有害噪声",
          "替代标准卷积以提升图像生成质量",
          "将条件图像从高分辨率压缩到低分辨率"
        ],
        "answer": 1,
        "explain": "零卷积的权重和偏置初始化为零，使得训练开始时 ControlNet 分支的输出恒为零，从而保护预训练模型不受随机初始化噪声的破坏。"
      }
    },
    {
      "id": "ip_adapter",
      "num": 16,
      "name": "IP-Adapter",
      "fullName": "图像提示适配器 (IP-Adapter)",
      "year": "2023",
      "org": "腾讯",
      "parent": "ldm",
      "paperUrl": "https://arxiv.org/abs/2308.06721",
      "projectUrl": "",
      "category": "sd_evolution",
      "motivation": "解耦图像提示控制",
      "summary": "IP-Adapter 的核心目标是：解耦图像提示控制。",
      "keyPoints": [
        "核心动机：解耦图像提示控制",
        "演化来源：继承或改进自 ldm",
        "代表机构：腾讯"
      ],
      "detail": "<p>解耦图像提示控制</p>"
    },
    {
      "id": "llamagen",
      "num": 17,
      "name": "LlamaGen",
      "fullName": "自回归图像生成 (LlamaGen)",
      "year": "2024",
      "org": "北大/港大",
      "parent": "vqgan",
      "paperUrl": "https://arxiv.org/abs/2406.06525",
      "projectUrl": "",
      "category": "vae_discrete",
      "motivation": "纯Llama架构图像生成",
      "summary": "LlamaGen 的核心目标是：纯Llama架构图像生成。",
      "keyPoints": [
        "核心动机：纯Llama架构图像生成",
        "演化来源：继承或改进自 vqgan",
        "代表机构：北大/港大"
      ],
      "detail": "<p>纯Llama架构图像生成</p>"
    },
    {
      "id": "lumina_mgpt",
      "num": 18,
      "name": "Lumina-mGPT",
      "fullName": "多模态自回归生成 (Lumina-mGPT)",
      "year": "2026.03",
      "org": "上海AI Lab",
      "parent": "llamagen",
      "paperUrl": "IJCV 2026",
      "projectUrl": "",
      "category": "frontier_2026",
      "motivation": "灵活多模态自回归",
      "summary": "Lumina-mGPT 的核心目标是：灵活多模态自回归。",
      "keyPoints": [
        "核心动机：灵活多模态自回归",
        "演化来源：继承或改进自 llamagen",
        "代表机构：上海AI Lab"
      ],
      "detail": "<p>灵活多模态自回归</p>"
    },
    {
      "id": "npp",
      "num": 19,
      "name": "Next Patch Prediction",
      "fullName": "下一块预测 (NPP)",
      "year": "2026.02",
      "org": "北大",
      "parent": "llamagen",
      "paperUrl": "AAAI 2026",
      "projectUrl": "",
      "category": "frontier_2026",
      "motivation": "扩展自回归预测策略",
      "summary": "Next Patch Prediction 的核心目标是：扩展自回归预测策略。",
      "keyPoints": [
        "核心动机：扩展自回归预测策略",
        "演化来源：继承或改进自 llamagen",
        "代表机构：北大"
      ],
      "detail": "<p>扩展自回归预测策略</p>"
    },
    {
      "id": "infinitystar",
      "num": 20,
      "name": "InfinityStar",
      "fullName": "统一时空自回归 (InfinityStar)",
      "year": "2026.01",
      "org": "上海AI Lab",
      "parent": "lumina_mgpt",
      "paperUrl": "NeurIPS 2025",
      "projectUrl": "",
      "category": "frontier_2026",
      "motivation": "统一时空自回归建模",
      "summary": "InfinityStar 的核心目标是：统一时空自回归建模。",
      "keyPoints": [
        "核心动机：统一时空自回归建模",
        "演化来源：继承或改进自 lumina_mgpt",
        "代表机构：上海AI Lab"
      ],
      "detail": "<p>统一时空自回归建模</p>"
    },
    {
      "id": "argen_dexion",
      "num": 21,
      "name": "ARGen-Dexion",
      "fullName": "增强视觉解码器 (ARGen-Dexion)",
      "year": "2026",
      "org": "字节跳动",
      "parent": "llamagen",
      "paperUrl": "—",
      "projectUrl": "",
      "category": "frontier_2026",
      "motivation": "视觉解码器架构增强",
      "summary": "ARGen-Dexion 的核心目标是：视觉解码器架构增强。",
      "keyPoints": [
        "核心动机：视觉解码器架构增强",
        "演化来源：继承或改进自 llamagen",
        "代表机构：字节跳动"
      ],
      "detail": "<p>视觉解码器架构增强</p>"
    },
    {
      "id": "nextstep_1",
      "num": 22,
      "name": "NextStep-1",
      "fullName": "连续Token自回归 (NextStep-1)",
      "year": "2026",
      "org": "阿里巴巴",
      "parent": "llamagen",
      "paperUrl": "—",
      "projectUrl": "",
      "category": "frontier_2026",
      "motivation": "大规模连续Token生成",
      "summary": "NextStep-1 的核心目标是：大规模连续Token生成。",
      "keyPoints": [
        "核心动机：大规模连续Token生成",
        "演化来源：继承或改进自 llamagen",
        "代表机构：阿里巴巴"
      ],
      "detail": "<p>大规模连续Token生成</p>"
    },
    {
      "id": "tlcm",
      "num": 23,
      "name": "TLCM",
      "fullName": "训练高效一致性模型 (TLCM)",
      "year": "2024.06",
      "org": "清华",
      "parent": "ldm",
      "paperUrl": "https://arxiv.org/abs/2406.05768",
      "projectUrl": "",
      "category": "frontier_2026",
      "motivation": "训练高效潜一致性",
      "summary": "TLCM 的核心目标是：训练高效潜一致性。",
      "keyPoints": [
        "核心动机：训练高效潜一致性",
        "演化来源：继承或改进自 ldm",
        "代表机构：清华"
      ],
      "detail": "<p>训练高效潜一致性</p>"
    },
    {
      "id": "dit_air",
      "num": 24,
      "name": "DiT-AIR",
      "fullName": "高效扩散Transformer (DiT-AIR)",
      "year": "2025.03",
      "org": "腾讯",
      "parent": "sd3",
      "paperUrl": "https://arxiv.org/abs/2503.10618",
      "projectUrl": "",
      "category": "frontier_2026",
      "motivation": "重审DiT架构效率",
      "summary": "DiT-AIR 的核心目标是：重审DiT架构效率。",
      "keyPoints": [
        "核心动机：重审DiT架构效率",
        "演化来源：继承或改进自 sd3",
        "代表机构：腾讯"
      ],
      "detail": "<p>重审DiT架构效率</p>"
    },
    {
      "id": "pixart_alpha",
      "num": 25,
      "name": "PixArt-α",
      "fullName": "高效文生图 (PixArt-α)",
      "year": "2024",
      "org": "华为",
      "parent": "sd3",
      "paperUrl": "https://arxiv.org/abs/2310.00426",
      "projectUrl": "",
      "category": "frontier_2026",
      "motivation": "高效DiT训练策略",
      "summary": "PixArt-α 的核心目标是：高效DiT训练策略。",
      "keyPoints": [
        "核心动机：高效DiT训练策略",
        "演化来源：继承或改进自 sd3",
        "代表机构：华为"
      ],
      "detail": "<p>高效DiT训练策略</p>"
    },
    {
      "id": "sana",
      "num": 26,
      "name": "SANA",
      "fullName": "高分辨率线性注意力 (SANA)",
      "year": "2024",
      "org": "NVIDIA",
      "parent": "pixart_alpha",
      "paperUrl": "https://arxiv.org/abs/2410.10629",
      "projectUrl": "",
      "category": "frontier_2026",
      "motivation": "线性注意力高分辨率",
      "summary": "SANA 的核心目标是：线性注意力高分辨率。",
      "keyPoints": [
        "核心动机：线性注意力高分辨率",
        "演化来源：继承或改进自 pixart_alpha",
        "代表机构：NVIDIA"
      ],
      "detail": "<p>线性注意力高分辨率</p>"
    },
    {
      "id": "mm_r1",
      "num": 27,
      "name": "MM-R1",
      "fullName": "统一多模态生成 (MM-R1)",
      "year": "2026.02",
      "org": "北大",
      "parent": "flux_1",
      "paperUrl": "AAAI 2026",
      "projectUrl": "",
      "category": "frontier_2026",
      "motivation": "GRPO偏好对齐减少畸变",
      "summary": "MM-R1 的核心目标是：GRPO偏好对齐减少畸变。",
      "keyPoints": [
        "核心动机：GRPO偏好对齐减少畸变",
        "演化来源：继承或改进自 flux_1",
        "代表机构：北大"
      ],
      "detail": "<p>GRPO偏好对齐减少畸变</p>"
    },
    {
      "id": "vinci",
      "num": 28,
      "name": "Vinci",
      "fullName": "深度思考文生图 (Vinci)",
      "year": "2026.01",
      "org": "浙大",
      "parent": "mm_r1",
      "paperUrl": "NeurIPS 2025",
      "projectUrl": "",
      "category": "frontier_2026",
      "motivation": "QA奖励增强逻辑推理",
      "summary": "Vinci 的核心目标是：QA奖励增强逻辑推理。",
      "keyPoints": [
        "核心动机：QA奖励增强逻辑推理",
        "演化来源：继承或改进自 mm_r1",
        "代表机构：浙大"
      ],
      "detail": "<p>QA奖励增强逻辑推理</p>"
    },
    {
      "id": "lmfusion",
      "num": 29,
      "name": "LMFusion",
      "fullName": "语言模型融合生成 (LMFusion)",
      "year": "2026",
      "org": "Meta",
      "parent": "flux_1",
      "paperUrl": "—",
      "projectUrl": "",
      "category": "frontier_2026",
      "motivation": "理解与生成统一骨干",
      "summary": "LMFusion 的核心目标是：理解与生成统一骨干。",
      "keyPoints": [
        "核心动机：理解与生成统一骨干",
        "演化来源：继承或改进自 flux_1",
        "代表机构：Meta"
      ],
      "detail": "<p>理解与生成统一骨干</p>"
    },
    {
      "id": "unigen",
      "num": 30,
      "name": "UniGen",
      "fullName": "统一生成框架 (UniGen)",
      "year": "2026",
      "org": "Google",
      "parent": "lmfusion",
      "paperUrl": "—",
      "projectUrl": "",
      "category": "frontier_2026",
      "motivation": "多任务统一生成",
      "summary": "UniGen 的核心目标是：多任务统一生成。",
      "keyPoints": [
        "核心动机：多任务统一生成",
        "演化来源：继承或改进自 lmfusion",
        "代表机构：Google"
      ],
      "detail": "<p>多任务统一生成</p>"
    }
  ],
  "categories": {
    "gan_era": {
      "label": "对抗生成时代",
      "color": "#8B5CF6"
    },
    "vae_discrete": {
      "label": "离散化与VAE",
      "color": "#F59E0B"
    },
    "diffusion_foundation": {
      "label": "扩散模型奠基",
      "color": "#10B981"
    },
    "sd_evolution": {
      "label": "SD系列演进",
      "color": "#3B82F6"
    },
    "frontier_2026": {
      "label": "2026前沿探索",
      "color": "#EF4444"
    }
  },
  "projectUrls": {}
};
