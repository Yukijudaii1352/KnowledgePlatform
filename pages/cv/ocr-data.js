/**
 * ocr-data.js — 由 pipeline/build.py 于 2026-06-15 09:55:53 自动生成。
 * 源文件：content/cv/ocr.md
 * ⚠️  请勿手动修改；如需更新，修改源文档后重新编译。
 */
window.PAGE_CONFIG = {
  "meta": {
    "domain": "cv",
    "topic_id": "ocr",
    "topic_name": "OCR 技术演进图谱",
    "page_title": "OCR 技术演进图谱",
    "page_subtitle": "2026-06-15 版",
    "page_desc": "梳理从传统检测识别到端到端文档理解的技术演进，涵盖文本检测、识别、版面分析与视觉文档理解四大方向。",
    "page_icon": "📜",
    "hero_pills": [
      "🏷️ Text Detection · Recognition · Document AI"
    ],
    "count_pill": "{count} 个算法",
    "image_base": "",
    "overview_from_doc": true,
    "latest_overview_from_doc": true
  },
  "overview": [
    {
      "title": "",
      "body_html": "<h1>你真的了解OCR吗？</h1>\n<ul>\n<li>来源平台: <strong>zhihu</strong>（知乎专栏文章）</li>\n<li>原文链接: <a href=\"https://zhuanlan.zhihu.com/p/2048074494309298457\">https://zhuanlan.zhihu.com/p/2048074494309298457</a></li>\n<li>作者: 冷逸</li>\n</ul>\n<hr />\n<p>你真的了解OCR吗？</p>\n<h1>你真的了解OCR吗？</h1>\n<p>作者: 冷逸, 赞: 3</p>\n<p><strong>OCR（Optical Character Recognition，光学字符识别）</strong>可能是计算机视觉领域最古老的问题之一。从 1929 年的机械装置到 2026 年的端到端，它走过了将近一个世纪。</p>\n<p>但真正有趣的是，这个领域的四次升级，几乎完美映射了整个 AI 技术栈的演进轨迹。</p>\n<p>接下来，我会带你走过 OCR 的四个时代，每一次跃迁背后的技术动因。</p>\n<p><img alt=\"\" src=\"https://pic2.zhimg.com/v2-6221da21bf63c47e9733fccc3969113b_1440w.jpg\" /></p>\n<h2><strong>01 OCR 0.5 时代：规则与特征匹配（1929–2012）</strong></h2>\n<p>这个时代跨度最长，机器就像一个高度近视、只会死记硬背的老大爷。它的工作逻辑很简单：人先告诉他字长什么样，他拿着卡尺去纸上挨个比对。</p>\n<p>1929 年，奥地利工程师 Gustav Tauschek 申请了人类历史上第一个 OCR 专利——一个用模板匹配来识别字符的机械装置。</p>\n<p>这个装置很简单：用光去照射纸张，黑色的墨水会吸光，而白纸会反光，再利用一个刻有字符镂空孔的圆盘，通过旋转这个特殊圆盘来匹配，当后方的光电管接受到了反光，则说明不是这个字符，而当没有光线透过镂空孔的时候，说明匹配成功，再通过机械装置输出对应的字符。</p>\n<p><img alt=\"\" src=\"https://pic2.zhimg.com/v2-d5d1e4ae41a492d9d6c31fbd4ae629fb_1440w.jpg\" /></p>\n<p>到了 1950-60 年代，OCR 开始商业化。IBM、RCA 等公司推出了能识别特定字体的 OCR 设备，主要用于银行支票和邮政编码。为了能让机器更好的识别字体，甚至诞生了两种字体：OCR-A和 OCR-B。</p>\n<p>1974 年，美国发明家 Ray Kurzweil 在一次航班上偶遇一位盲人，这位盲人告诉他，视力障碍并没有给他带来出行障碍，最大的障碍反而是阅读，于是，他做了一件改变 OCR 历史的事：创立了库兹韦尔计算机产品公司，并创建了第一个全字体OCR 系统，这是一种几乎能够处理任何印刷字体的 OCR 系统，而不仅仅是特定的标准字体。</p>\n<p>为了实现全字体的 OCR 系统，Ray Kurzweil 抛弃了传统的模板匹配，改为提取字符的特征来实现文字识别，这个算法会先通过分析字符的结构特征，例如线段的方向，线段在哪里交叉等，比如字符 A 就被定义为两条在顶部相交的对角线，中间由一条水平线连接，而小写的 b 被定义为左边一条垂直长线，右下方连接一个闭合的环。通过这种拆解特征的方式，机器获得了识别全字体的能力。</p>\n<p>之后还需要将特征匹配到对应的文字上，Kurzweil 的团队编写了一套复杂的规则引擎，系统会将提取到的特征，输入到规则库中进行概率评分和逻辑匹配，当这些特征组合满足了字母的规则条件时，系统就会输出对应的 ASCII 码字符。</p>\n<p>同时，为了解决部分字体特征几乎一致的问题，例如大写 O 与数字 0，小写 l 与数字 1 ，Kurzweil 的系统还引入了基于词汇和语言规则的后处理机制，系统会根据上下文来做逻辑判断：如果这个字符出现在单词 App_e 中，那它一定是字母 l；如果它出现在公式 199_ 中，那它大概率是数字。</p>\n<p>接着，Ray Kurzweil 又发明了 CCD 平板扫描仪和 TTS 文本转语音合成器，并将它们与 OCR 结合，创建了著名的库兹韦尔阅读机。</p>\n<p>之后，HP 实验室在 1985 年开始开发 Tesseract，并于 2005 年开源，于 2006 年交由 Google 接手维护。Tesseract 的发展历经两个主要阶段，经典架构，对应版本 1.0-3.x，以及现代架构，对应版本 4.0 及以后。</p>\n<p>由于 4.0 及之后的版本引入了深度学习，超出了这个时代的范畴，所以我们只讨论经典架构。</p>\n<p><strong>Tesseract 的识别过程，就像一个经验丰富的阅卷老师批改手写试卷：</strong></p>\n<p>首先，它把图片转成黑白两色，把每一团黑色墨迹抠出来，每一团通常对应一个字符。然后，它把这些墨迹团按位置排成一行行文字，再根据间距判断哪里是字母之间的缝隙、哪里是单词之间的空格。</p>\n<p>最精妙的是它处理粘连字和断裂字的方式：如果两个字母粘在一起（比如 rn 看起来像 m），它会尝试从最细的地方掰开；如果一个字母断成了两半，它会尝试把碎片拼回去。</p>\n<p>而 Tesseract 准确率极高的秘诀，在于它的两遍阅读法：第一遍先认出那些清晰好认的字，然后从中学会这篇文档的字体风格；第二遍再用学到的字体知识，回头去辨认那些第一遍没认出来的模糊字。就像人类阅读时，先根据清晰的字迹摸清作者的笔迹，然后再去猜那些潦草的字。</p>\n<p>最后，它还会用内置的词典和语言规则进行纠错（比如 q 后面通常是 u），输出最终结果。</p>\n<p><strong>然而，以上的方法都有一个致命弱点：严重依赖几何学、拓扑学和穷举规则。</strong></p>\n<p>几乎所有以上的 OCR ，都需要撰写特定的规则，或者识别特定的特征，然而，这在多语言时简直就是灾难，因为对于英文来讲，对于 26 个字母，以及少量标点符号进行特征提取和规则编写是可行的，然而对于中文、日文、阿拉伯文等语言来说，几乎是不现实的，因为它们拥有复杂的字符结构，庞大的字符数量，还会根据位置变形，并且以上的方法还严重依赖输入，如果出现字符不清晰、变形等问题，这些规则和特征就会失效，导致识别率急剧下降。</p>\n<p>这个问题困扰了 OCR 社区几十年——直到深度学习的到来。</p>\n<p><img alt=\"\" src=\"https://pic4.zhimg.com/v2-9a92846e5e69b3fc5a31a020d675bae5_1440w.jpg\" /></p>\n<h2><strong>02 OCR 1.0 时代：深度学习登场（2012–2017）</strong></h2>\n<p>2012 年，一个名为 AlexNet 的深度学习模型横空出世，在全球最大的图像识别竞赛中一战成名，把错误率从 26% 一口气降到了 15%。它向全世界证明了一件事：只要喂给机器足够多的数据，让它自己去悟出规律，效果远比人类手写规则要好得多。从此之后，计算机视觉领域全面转向了深度学习，各大科技巨头（谷歌、微软、百度等）纷纷入场，AI 军备竞赛正式开始。</p>\n<p>2015 年，Shi 等人发表了 CRNN，这篇论文几乎重新定义了文字识别的方式。</p>\n<p>它把三种神经网络巧妙地串在了一起，就像一条高效的流水线：</p>\n<p><strong>CNN（卷积神经网络）</strong>——充当眼睛，负责从图片中提取文字的视觉特征，比如笔画的形状和纹理。</p>\n<p><strong>BiLSTM（双向长短期记忆网络）</strong>——充当大脑，从左到右、再从右到左把整行文字读两遍，理解字符之间的前后关系。就像人类读一句话时，会结合前后文来判断中间那个模糊的字是什么。</p>\n<p><strong>CTC（连接时序分类）</strong>——充当翻译官，解决了一个棘手问题：图片里每个字的宽度不一样，模型输出的信号长短不一、充满重复。CTC 能自动把这些杂乱信号整理成最终的文字（比如把 H-ee-l-ll--o 自动整理成 Hello）。这样一来，模型不需要知道每个字符的精确位置，只需要知道整行文字是什么。</p>\n<p><img alt=\"\" src=\"https://pic1.zhimg.com/v2-5880812f573c37642376f4e037a92b8c_1440w.jpg\" /></p>\n<p>直到今天，你在市面上看到的部分科技公司的文字识别接口，或者最出名的开源神器（如 PaddleOCR），它们底层用来识别文字的核心模型，依然是 CRNN 的架构或其变体。</p>\n<p>这个时代形成了经典的<strong>两阶段 pipeline：检测 → 识别。</strong>先用检测模型找到文本区域，裁剪出来，再送入识别模型。这套范式在工业界广泛落地，成为了各种扫描 App、票据识别、车牌识别的基础架构。</p>\n<p>但两阶段 pipeline 有自己的问题：</p>\n<ul>\n<li>检测和识别是两个独立的环节，第一步出了错，第二步只能跟着错——就像流水线上前一道工序切歪了，后面也没法纠正。</li>\n<li>遇到弯曲、密集或被遮挡的文字，只会用方框去框选，经常把无关内容一起框进来。</li>\n<li>对于复杂文档（表格、公式、图文混排），光是找到文字在哪远远不够，还需要理解整个页面的布局结构。</li>\n</ul>\n<p><strong>更深层的问题是：这套架构处理长文本时会健忘。就像一个人读一段很长的话，读到后面就忘了前面说什么了。</strong></p>\n<p>随着 2017 年 Transformer 架构的诞生，一个新的架构正在酝酿。</p>\n<h2><strong>03 OCR 1.5 时代：Transformer 驱动的精细化（2017–2023）</strong></h2>\n<p>2017 年，Vaswani 等人发表 Attention Is All You Need，Transformer 架构席卷 NLP。但它对 OCR 的影响并非一蹴而就——从渗透到主导，经历了大约三年。</p>\n<p>Transformer 对 OCR 的改造发生在两个维度：检测更精细，识别更强大。除此之外，这个时代还诞生了一个全新的领域：文档理解（Document AI）。</p>\n<h3><strong>检测端的进化：告别死板的矩形，走向像素级多边形</strong></h3>\n<p>在 1.0 时代，检测模型大多沿用目标检测的思路，画个矩形框把文字框出来。但现实中，印章上的文字是环形的，商品包装上的文字是扭曲的。如果用矩形框，就会把大量无关背景甚至其他文字框进去。</p>\n<p>为了解决这个问题，检测模型转向了抠图路线——不再画框，而是像 PS 抠图一样，把文字区域的像素精确地扣出来。在这个方向上，2020 年由华中科技大学和旷视联合提出的 DBNet 是一座难以逾越的高峰，它几乎统治了工业界的检测端（也是 PaddleOCR v2/v3 的核心检测算法）。</p>\n<p>它的核心突破可以用一个比喻来理解：</p>\n<p>以前的模型就像一个工人用固定标准来判断这里是不是文字——比如亮度低于 50% 就算文字。但不同图片的光线、颜色差异很大，一刀切的标准经常出错。DBNet 的天才之处在于：它让 AI 自己学会因地制宜——对于明亮的区域用一个标准，对于阴暗的角落用另一个标准，对每一小块区域都动态调整判断尺度。</p>\n<p>结果就是：不管文字怎么弯曲、怎么密集排列，DBNet 都能极其快速、精准地贴着字画出精确轮廓，彻底解决了复杂排版下的检测难题。</p>\n<h3><strong>识别端的进化：扔掉 CNN 和 RNN，全盘 Transformer 化</strong></h3>\n<p>既然检测变准了，识别又该怎么突破读长句会健忘的瓶颈？答案是直接换一个更聪明的大脑。</p>\n<p>2021 年，微软提出了 TrOCR，这篇论文就像是一场革命，彻底掀翻了 CRNN 统治多年的桌子。<strong>它宣告：以前那套三件套（CNN + RNN + CTC）全都不要了！</strong></p>\n<p>TrOCR 的架构可以理解为两个协作的角色：</p>\n<p><strong>看图的人（视觉编码器）：</strong>它把文本行图片切成一个个小方块（比如 16×16 像素），然后同时审视所有方块之间的关系——不像以前只能看到局部，现在一眼就能纵览全局。</p>\n<p><strong>写字的人（文本解码器）：</strong>这部分本质上就是一个语言模型，类似于 ChatGPT 的前身。它接收看图的人传来的视觉信息，然后像写作文一样，一个字一个字地写出识别结果。</p>\n<p><img alt=\"\" src=\"https://pic2.zhimg.com/v2-1d93b7b8f7cc1a7cf17ae9477bcd3057_1440w.jpg\" /></p>\n<p><strong>关键优势：</strong>传统模型看不清字母时容易乱猜（比如把 clear 识别成 dear），因为它几乎不懂语言。而 TrOCR 自带强大的语言知识，能根据上下文推断出模糊的单词——就像人类即使看到一个潦草的字，也能根据整句话的意思猜出来。而且超长文本的健忘问题也彻底解决了。</p>\n<h3><strong>从认字到懂文档：多模态的觉醒</strong></h3>\n<p>1.0 时代的结尾我们提到，只是把字抠出来是不够的，我们需要理解发票、简历、报表上的表格和键值对（Key-Value）。</p>\n<p>2020 年，微软亚洲研究院发表了 LayoutLM，正式拉开了文档理解的序幕。</p>\n<p>它的创新可以这样理解：传统的 AI 读文字时，就像蒙着眼睛听人朗读——它只知道姓名和张三这两个词前后挨着，却不知道姓名印在左边、张三写在右边，两者其实是一对标签-内容的关系。</p>\n<p>LayoutLM 做的事情，就是把 AI 的眼罩摘掉。它不仅让模型知道每个词是什么，还让模型知道每个词在页面上的哪个位置，以及这个词周围长什么样。</p>\n<p>于是，模型突然开眼看世界了。它发现，发票上左边加粗的字通常是表头，右边对齐的字通常是内容。有了 LayoutLM，OCR 不再只是吐出一堆文字，而是能直接把一张复杂的报表转化为结构化数据。</p>\n<p>但 1.5 时代依然不够完美：</p>\n<p>尽管 DBNet 解决了弯曲文本，TrOCR 解决了长文本识别，LayoutLM 解决了排版理解，但这依然是一个拼图时代。</p>\n<p>为了实现文档理解，你得先跑一遍 DBNet 做检测，切图后再跑一遍 TrOCR 做识别，最后把文字和坐标喂给 LayoutLM 去做结构化提取。整个系统无比臃肿，不仅推理慢、维护成本极高，而且模块之间依然存在各自为战、误差累积的顽疾。</p>\n<p>直到 2023 年底，随着 GPT-4V 的震撼登场和多模态大模型的爆发，OCR 领域才终于意识到：<strong>其实，我们甚至不需要检测和识别这两个概念。</strong></p>\n<p>一场名为 像素即文本（Pixels-to-Text）的终极革命——OCR 2.0 大模型时代，正式降临。</p>\n<h2><strong>04 OCR 2.0 时代：大语言模型的降维打击与端到端（2023–至今）</strong></h2>\n<p>2023 年，随着 GPT-4V 的震撼发布，整个 AI 社区猛然惊醒：既然多模态大语言模型（MLLM）已经拥有了不可思议的看图说话能力，那我们为什么还要辛辛苦苦地去切图、认字、排版呢？</p>\n<p><strong>OCR 2.0 与 1.5 时代的本质区别，在于流水线（Pipeline）的彻底消亡。</strong></p>\n<p>在 1.5 时代，OCR 是一套极其臃肿的接力赛。先用一个模型框出文字位置，再用另一个模型认字，最后再用第三个模型理解排版。这不仅速度慢，更要命的是多米诺骨牌效应——只要第一步框歪了一点，后面每一步都会跟着错。</p>\n<p>在 2.0 时代，OCR 变成了一个全能选手。不需要检测框，不需要独立识别，不需要后处理。给模型一张图片，它直接输出排版完美的 Markdown、带公式的 LaTeX 或是结构化的 JSON。一个模型，一步到位，解决所有问题。</p>\n<p>在这个过程中，诞生了一个极具代表性、甚至可以说是集大成者的经典技术架构：GOT-OCR 2.0（General OCR Theory，通用 OCR 理论）。</p>\n<p>它在 2024 年横空出世，用极其优雅的架构和不到 1B（十亿）的参数量，向世界展示了 OCR 2.0 的终极形态。如果你想弄懂 OCR 2.0 是怎么运作的，看透 GOT-OCR 2.0 就够了。</p>\n<p><img alt=\"\" src=\"https://pic3.zhimg.com/v2-705d3f4947366a918189910151c1072a_1440w.jpg\" /></p>\n<h3><strong>经典技术拆解：GOT-OCR 2.0 的大一统魔法</strong></h3>\n<p>GOT-OCR 2.0 能够做到看一眼图，直接输出排版代码，是因为它在底层架构上完成了三大革命性的创新：</p>\n<p><strong>视觉编码器：从全局缩放到动态分辨率（Dynamic Resolution）</strong></p>\n<p>以前的 AI 看图有一个致命弱点：它只能看固定大小的小照片（比如 224×224 像素）。如果你给它一张 4K 高清报表，它会把图片硬缩成小图，结果文字全糊了。</p>\n<p>GOT-OCR 引入了动态分辨率机制——就像人类看大报纸一样：先扫一眼全局了解大致布局，再凑近看局部细节。它把大图切成一块块小图分别看清，最后在脑中拼成完整画面。这样一来，无论是一张小名片，还是一张超大工程图纸，它都能看清每一个字。</p>\n<p><strong>文本解码器：大语言模型（LLM）的降维打击</strong></p>\n<p>1.5 时代的 TrOCR 虽然也用了 Transformer，但它的 Decoder 只是一个很弱的语言模型，只能勉强拼凑单词。</p>\n<p>而 GOT-OCR 直接把真正的大语言模型（如 Qwen-0.5B 等 LLM）拿来做大脑。这意味着什么？这意味着模型不仅是在认字，更是在理解世界。当它看到图片里有一个被划掉的错别字时，传统的 OCR 会傻傻地把错别字也识别出来；而有了大模型的常识加持，它知道那是一个无效信息，会自动忽略。遇到极其模糊的医学处方，大模型甚至能根据上下文的药理逻辑，准确推理出那个看不清的药名。</p>\n<p><strong>交互式范式：万物皆可 Prompt</strong></p>\n<p>1.0 和 1.5 时代，OCR 被认为是一种单向任务：输入图片，机器吐出所有文字，不管你需不需要。</p>\n<p>GOT-OCR 2.0 将 OCR 变成了对话式的交互。你可以向它下达各种极度精细的指令（Prompt）：</p>\n<ul>\n<li>识别图片右上角红色框里的文字。（区域 OCR）</li>\n<li>将这张满是数学公式和图表的论文截图，直接转成 LaTeX 源码。（格式化 OCR）</li>\n<li>这张五线谱上的音符是什么？（超越文本的泛 OCR）</li>\n</ul>\n<p>甚至连分子式、几何图形、乐谱，在它的眼里都只是某种语言。只要大模型见过这种语言的规律，它就能完美地将视觉像素翻译成对应的代码。</p>\n<h3><strong>总结：OCR 的终结与新生</strong></h3>\n<p>从 1.0 时代用 CNN 逐个抠字，到 1.5 时代用 Transformer 理解版面，再到如今 2.0 时代用 MLLM 统御一切，OCR 走过了一条无比漫长但充满魅力的演进之路。</p>\n<p>OCR 2.0 的出现，在某种意义上宣告了传统 OCR 工程师这个岗位的消亡。 因为文字识别不再是一个独立的计算机视觉子领域，它已经被彻底消解、并入到了通用人工智能（AGI）的多模态感知能力之中。</p>\n<p>未来的 AI，不再需要一个专门的器官去阅读文字，因为当它睁开眼睛看向这个世界的像素时，它就已经读懂了一切。</p>\n<h2><strong>05 站在 OCR 2.0，回头看</strong></h2>\n<p>把四个时代放在一起，你会发现一条清晰的主线：<strong>从人定义规则到模型学习规则，从分步解决到端到端解决，从识别文字到理解文档。</strong></p>\n<p><strong>OCR 0.5 时代：</strong>采用“模板比对+人工规则”，能将扫描图片转为纯文字。最大瓶颈是遇到字符粘连和切分不准时，识别率极低。</p>\n<p><strong>OCR 1.0 时代：</strong>引入深度学习（CNN+RNN），可识别单行文字图片。最大瓶颈是“检测”和“识别”各管各的，步骤较为割裂。</p>\n<p><strong>OCR 1.5 时代：</strong>采用Transformer架构，支持整页文档转文字。最大瓶颈是依然需要复杂的多步流水线，依赖多个模型拼接。</p>\n<p><strong>OCR 2.0 时代：</strong>基于多模态大模型，能将任意图片直接转为结构化文本。最大瓶颈是目前推理速度慢、算力贵、成本高。</p>\n<p>每一次转换，都不是简单的用新技术替换旧技术，而是重新定义了问题本身：</p>\n<p>OCR 0.5 → 1.0：从怎么把字一个个切开认变成怎么让机器自己学会认整行字</p>\n<p>OCR 1.0 → 1.5：从怎么让机器认得更准变成怎么让机器带着知识储备来认字</p>\n<p>OCR 1.5 → 2.0：从怎么识别文字变成怎么理解整份文档</p>\n<p><img alt=\"\" src=\"https://pic4.zhimg.com/v2-faf3ad5c94361e8fbfa9e9f54fad1667_1440w.jpg\" /></p>\n<h3><strong>OCR 2.0 的未解问题</strong></h3>\n<p>当然，OCR 2.0 并不是终点，它面临的挑战同样巨大：</p>\n<p><strong>分辨率困境：</strong>一页 A4 文档扫描后的图片非常大，让 AI 看这么大的图需要消耗巨大的算力——就像让一个人用放大镜逐像素地审视一整面墙。</p>\n<p><strong>幻觉问题：</strong>大模型有时会脑补图片中根本不存在的文字——这在金融、法律、医疗等对准确性要求极高的场景中，是不可接受的。</p>\n<p><strong>速度问题：</strong>大模型是一个字一个字地写出结果的，面对一页几千字的文档，速度远不如传统方案。</p>\n<p><strong>可控性：</strong>传统方案就像手动挡汽车，每个环节都能精确调节；大模型更像自动驾驶系统，整体很强，但出了问题很难定位和微调。</p>\n<p>所以在未来 2-3 年内，OCR 2.0 和 OCR 1.5 会长期共存。需要极高精度和极快速度的场景（如金融票据、身份证、车牌识别），传统流水线方案仍然是更优选择。而面对复杂文档理解、多语言、灵活排版输出的场景，大模型方案将逐步成为主流。</p>\n<p>最终，OCR 的边界正在消融。当一个模型既能识别文字、又能理解表格、还能解析公式和图表的时候，OCR 这个词本身可能已经不够用了。</p>\n<h2><strong>06 从 OCR 到 PDF 文档解析：真正的战场</strong></h2>\n<p>如果 OCR 是识别文字，那文档解析就是理解文档。而在所有文档格式中，PDF 是最难的那个。</p>\n<p><strong>为什么 PDF 是文档解析的终极 Boss？</strong></p>\n<p>PDF 的设计哲学是所见即所得——它忠实地保存了文档的视觉外观，但彻底丢弃了语义结构。一个 PDF 文件内部是什么样的？</p>\n<ul>\n<li>文字不是按照人类阅读顺序存储的，而是按照渲染顺序排列的。一个看起来连续的段落，在底层可能是几十个分散的文本块。</li>\n<li>表格没有表格标记。那些整齐的行列，在 PDF 里只是一堆精确定位的文字和线条。</li>\n<li>公式更不用说了。LaTeX 渲染出来的公式，在 PDF 里变成了一堆带有精确坐标的特殊字符。</li>\n<li>图片可能嵌入在页面的任何位置，与文字混排。</li>\n<li>多栏排版、脚注、页眉页脚、跨页表格——每一个都是一个独立的解析难题。</li>\n</ul>\n<h3><strong>MinerU：传统 pipeline 的集大成者</strong></h3>\n<p>在 2024–2025 年的 PDF 解析领域，MinerU（上海人工智能实验室，开源于 2024）是传统路线的代表作。它的思路就像一个分工明确的团队：</p>\n<ul>\n<li>一个模型专门负责排版分析——识别出哪里是文字、哪里是图片、哪里是表格</li>\n<li>一个模型专门负责文字识别</li>\n<li>一个模型专门负责表格识别</li>\n<li>一个模型专门负责公式识别</li>\n</ul>\n<p>最后由一套规则把所有结果拼接整合，生成结构化输出。</p>\n<p>MinerU 在学术论文、技术报告等标准文档上表现优异。但它的本质仍然是一套多个专家协作的流水线——每个专家只管自己那一块，通过复杂的规则拼接在一起。</p>\n<p>这意味着：</p>\n<ul>\n<li>任何一个专家出了问题，整条流水线的结果都会变差——就像团队里有人掉链子，整体产出就会下降。</li>\n<li>遇到非标准文档（工程图纸、扫描件、手写笔记），各个模型容易水土不服，效果急剧变差。</li>\n<li>维护成本高——每个模型都要单独训练、单独升级、单独部署。</li>\n</ul>\n<h2><strong>07 纯视觉路线：一个模型解决所有问题</strong></h2>\n<p>2025 年，一个激进的想法开始在工业界获得真正的牵引力：<strong>为什么我们不直接把 PDF 页面当作图像，让一个视觉语言模型来看这一页，然后直接输出结构化的文本？</strong></p>\n<p><strong>这就是纯视觉路线（Pure Vision Approach）。</strong></p>\n<p><strong>PDF → 页面渲染为图像 → VLM（视觉语言模型）→ 结构化 Markdown/JSON</strong></p>\n<p>整个流程被压缩为一步。不需要版面分析、不需要区域分类、不需要独立的文字识别器、表格识别器、公式识别器。一个足够强大的视觉语言模型，直接看着页面图片，输出你想要的任何格式化文本。</p>\n<p>这听起来过于简化，但 2025–2026 年的实践证明，对于越来越多的文档类型，纯视觉路线已经达到甚至超过了传统 pipeline 的质量，同时大幅降低了系统复杂度。</p>\n<p>值得注意的是，连 MinerU 自身也在拥抱这个趋势。在最新版本中，MinerU 的 API 已经支持 model_version: vlm 参数——这意味着它的后端正在从传统的多模型 pipeline 向基于视觉语言模型的端到端方案迁移。</p>\n<h3><strong>Knowhere：为</strong> <strong>AI Agent</strong> <strong>构建的文档记忆基础设施</strong></h3>\n<p><img alt=\"\" src=\"https://pic1.zhimg.com/v2-aa35dee8258994b6b41e6034ff8077b8_1440w.jpg\" /></p>\n<p>作为这个时代的亲历者，我们（Knowhere 团队）在 2026 年 5 月将 Knowhere 核心技术栈全面开源（采用 Apache 2.0 协议）。我们始终相信，AI Agent 的记忆层不应该是一个封闭的黑盒，而应当作为整个 AI 开发者生态共享的开源基础设施。</p>\n<h3><strong>全栈开源与私有化部署</strong></h3>\n<p>目前，Knowhere 开源项目已经在 GitHub 上完整发布，涵盖了从数据接入、层级解析到 Agent 检索的全套技术栈：</p>\n<p><strong>核心框架(Knowhere Core)：</strong>(<a href=\"https://link.zhihu.com/?target=https%3A//github.com/Ontos-AI/knowhere\">https://github.com/Ontos-AI/knowhere</a>) —— 提供完整的文档解析路由、树形层级重构、多模态对齐以及 Cross-document Graph 记忆构建算法。</p>\n<p><strong>一键私有化部署(Knowhere Self-Hosted)：</strong>(<a href=\"https://link.zhihu.com/?target=https%3A//github.com/Ontos-AI/knowhere-self-hosted\">https://github.com/Ontos-AI/knowhere-self-hosted</a>) —— 支持开发者在本地或企业内网中，通过 Docker 快速一键拉起整套端到端服务，确保敏感数据不出内网。</p>\n<p><strong>可视化控制台(Knowhere Dashboard)：</strong>(<a href=\"https://link.zhihu.com/?target=https%3A//github.com/Ontos-AI/knowhere-dashboard\">https://github.com/Ontos-AI/knowhere-dashboard</a>) —— 方便开发者管理文档知识库、监控解析任务并进行可视化的检索调试。</p>\n<p>通过彻底开源，Knowhere 赋予了企业与开发者完全掌控自身“文档记忆数据”的能力，告别了云端服务商的商业绑定与隐私顾虑。</p>\n<h3><strong>我们是谁？我们在做什么？</strong></h3>\n<p><strong>Knowhere 是连接脏文档（复杂、非结构化的真实世界文档）与 AI Agent 之间的记忆层。</strong></p>\n<p>很多开发者在构建 AI 应用时，处理文档的方式非常粗暴——就像把一本书随机撕成一页页碎片，然后让 AI 通过关键词在碎片堆里翻找答案。这种方式会彻底打碎文档原有的逻辑结构，导致 AI 拿到的永远是断章取义的信息片段。</p>\n<p>我们不认为这是通向文档智能的正确路径。正如我们在主页上所说：我们不是在打造下一个 MinerU 解析器，我们是在构建能被 Agent 高效消费的文档记忆基础设施。</p>\n<p>我们的工作分为两个核心步骤：第一步，把文档解析成 AI 能理解的记忆；第二步，让 AI 像研究员一样智能地检索这些记忆。</p>\n<h3><strong>我们是如何实现的？</strong></h3>\n<p><strong>第一步：解析与记忆建构 (Parse and Build Memory)</strong></p>\n<p>我们建立了一个智能的分诊台——无论你扔过来的是 PDF、Word、图片还是 Markdown，系统都会自动把它分配给最合适的解析器来处理。</p>\n<p>但这仅仅是基础。我们最核心的技术是独创的树形算法。打个比方：传统方案把一本书撕成碎片，而我们是给这本书建一个完整的目录树——保留章、节、段的层级关系，让每一块内容都知道自己属于哪一章、哪一节。同时，系统会自动识别文档中的图片和表格，用 AI 为它们生成摘要，最终把整份文档变成一张 AI 随时可以查阅的知识地图。</p>\n<p><img alt=\"\" src=\"https://pic3.zhimg.com/v2-73d692aa603914175b40f892ae3a4a4a_1440w.jpg\" /></p>\n<p><strong>第二步：Agent 式检索 (Agentic Retrieval)</strong></p>\n<p>这是我们与传统方案最大的区别。在 Knowhere 的架构下，AI 不是在碎片堆里盲目翻找，而是像一个人类研究员查阅资料一样，有章法地阅读文档：</p>\n<p><strong>1. 发现：</strong>先通过关键词和语义理解，快速定位到最相关的文档和章节——就像先翻目录找到对的章节。</p>\n<p><strong>2. 导航：</strong>沿着文档的目录树和知识关系网，层层深入到最核心的段落——就像顺着目录一级级点进去，找到最关键的那一页。</p>\n<p><strong>3. 引证：</strong>每一次回答都能精准指出这个信息来自哪份文档的第几章第几节，保证答案有据可查。</p>\n<p><img alt=\"\" src=\"https://pic2.zhimg.com/v2-2dcbadf21bb73fb33c03fe8ea1270651_1440w.jpg\" /></p>\n<h3><strong>为什么我们能做得更好？</strong></h3>\n<p>构建在 Knowhere 记忆层之上的 AI，在真实业务场景中展现出了远超传统方案的实力：</p>\n<ul>\n<li><strong>更准：</strong>首次回答的准确率提升了 36%，找到正确信息的能力提升了 11%。</li>\n<li><strong>更可靠：</strong>经过反馈优化后，业务准确率可达 79%，而直接把原始文档扔给大模型的方案往往在 53% 就遇到了天花板。</li>\n<li><strong>更省钱：</strong>因为 AI 能在知识地图中精准导航，避免了阅读大量无关内容，大幅减少了计算消耗和等待时间。</li>\n</ul>\n<p>此外，Knowhere <strong>不挑模型</strong>——不管是 DeepSeek、Qwen-VL，还是 OpenAI、智谱等，都可以无缝接入。</p>\n<h3><strong>落地 PageMemory V2：首创颗粒度自适应路由</strong></h3>\n<p>为了让 Agent 更完美地平衡“完整理解”与“局部检索”的效率，Knowhere 目前正全面落地 PageMemory V2 方案。该方案的核心在于引入了 DOC_PROFILE 颗粒度路由器，作为大脑根据文档的分类（如科技论文、财务报表等）、TOC 结构以及复杂页面比例，自适应输出最契合的记忆颗粒度判决（Verdict）：</p>\n<p><strong>whole_doc 整体记忆：</strong>对于少页、无 TOC 的简单文档进行整篇全量记忆，不作拆解，避免破坏 Agent 对宏观上下文的理解。</p>\n<p><strong>page 逐页记忆：</strong>对于复杂文档进行逐页持久化与深度记忆，结合全页图像、图像摘要与原始文本构建关联。</p>\n<p><strong>shard_page 分片记忆：</strong>针对超大文档，先分片再进行逐页记忆，合理平摊算力。</p>\n<p>通过这一首创的“颗粒度自适应”机制，配合可插拔的 Profiler 接口（开源默认支持规则与通用 VLM，商业版支持更高精度和性价比的专有微调模型），Knowhere 在多模态文档记忆的消费效率和成本控制上实现了关键突破。</p>\n<hr />\n<p>站在 2026 年的今天，我们坚信：非结构化数据不应再是 AI 系统的障碍，而应成为它们生生不息的记忆。从识别文字到构建可导航的文档记忆，这就是我们 Knowhere 正在践行的未来。</p>\n<p>站在 2026 年，再看这条线，从 1929 年 Gustav Tauschek 的机械模板匹配装置，到 2026 年 VLM 直接看文档生成结构化知识——将近一个世纪的 OCR 进化史，最终指向了一个朴素但深刻的结论：</p>\n<p><strong>我们从来不需要识别文字，我们需要的一直是理解文档。</strong></p>\n<p>随着多模态大模型推动 OCR 融入文档智能范畴，一条从文档解析延伸至 Agent 可消费知识基础设施的演变路径也愈发清晰，共同指向了那个宏大的愿景——在 Agent 时代，非结构化数据不再是 AI 系统的障碍，而是成为它的记忆。</p>\n<p><strong>也许，这才是 OCR 一个世纪进化的真正终点——不是让机器读文字，而是让机器真正记住文档里的知识。</strong></p>"
    }
  ],
  "latest_overview": [
    {
      "title": "",
      "body_html": "<h1>【科普】谈谈25年后的OCR和版面分析</h1>\n<ul>\n<li>来源平台: <strong>zhihu</strong>（知乎专栏文章）</li>\n<li>原文链接: <a href=\"https://zhuanlan.zhihu.com/p/2021261770241647875\">https://zhuanlan.zhihu.com/p/2021261770241647875</a></li>\n<li>作者: ChenKun</li>\n</ul>\n<hr />\n<p>【科普】谈谈25年后的OCR和版面分析</p>\n<h1>【科普】谈谈25年后的OCR和版面分析</h1>\n<p>作者: ChenKun, 赞: 1</p>\n<ul>\n<li><strong>2026年爆发期</strong>：年初短短两个月内，百度、智谱、小红书和 DeepSeek 密集发布了针对 <strong>2B 以下参数</strong> 的轻量化 OCR 模型，预示着 “端侧 OCR-VLM”的普及元年。</li>\n<li><strong>架构趋同</strong>：<strong>NaViT</strong>（动态分辨率）+ <strong>轻量 LLM</strong> 已经成为端到端 OCR 的标准配置，传统的检测+识别两阶段方案正在逐渐向单模型转换。</li>\n</ul>\n<h2>OCR-VLM 核心模型演进表（倒序）</h2>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th></th>\n<th></th>\n<th></th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>模型信息 (名称 / 官方日期 / 规模)</td>\n<td>基座 / 核心架构</td>\n<td>形态与技术特点</td>\n</tr>\n<tr>\n<td>FireRed-OCR 2026-03-02 (报告) / 2B</td>\n<td>基于 Qwen3-VL-2B-Instruct</td>\n<td>端到端 OCR-VLM；针对社交媒体复杂背景、艺术字进行了专项强化。</td>\n</tr>\n<tr>\n<td>GLM-OCR 2026-03-11 (报告) / 0.9B</td>\n<td>0.4B CogViT + 0.5B GLM decoder</td>\n<td>两阶段系统；系统侧配 PP-DocLayout-V3，目前最轻量且兼顾版面的商业方案。</td>\n</tr>\n<tr>\n<td>PaddleOCR-VL-1.5 2026-01-29 / 0.9B</td>\n<td>NaViT-style 动态分辨率编码器 + ERNIE-4.5</td>\n<td>部署级 OCR-VLM；支持部署侧灵活配置布局检测，推理效率极高。</td>\n</tr>\n<tr>\n<td>Kimi K2.5 2026-01-29 / 1T (32B active)</td>\n<td>MoE + MoonViT (400M)</td>\n<td>原生多模态 Agent；极强的长文档解析与指令遵循能力，多模态 Bench 常客。</td>\n</tr>\n<tr>\n<td>DeepSeek-OCR / OCR2 2026-01-27 (V2) / 3B级</td>\n<td>DeepEncoder V2 + DeepSeek3B-MoE</td>\n<td>端到端 OCR-VLM；DeepSeek 自研视觉编码器，极速识别且表格识别能力出色。</td>\n</tr>\n<tr>\n<td>Dolphin-v2 2025-12-12 / 3B</td>\n<td>基于 Qwen2.5-VL-3B，视觉侧 NaViT 风格</td>\n<td>混合 Parsing；两阶段解析，擅长页级与元素级的混合处理。</td>\n</tr>\n<tr>\n<td>InternVL 2.5 2025-12-05 / 1B - 78B</td>\n<td>InternViT-300M/6B + Qwen2.5</td>\n<td>开源多模态标杆；OCRBench 长期领先，提供从端侧到云端的多尺寸选择。</td>\n</tr>\n<tr>\n<td>HunyuanOCR 2025-11-25 / 1B</td>\n<td>Native ViT + Lightweight LLM</td>\n<td>纯端到端专家模型；彻底抛弃检测框，用纯生成方式解决密集文本。</td>\n</tr>\n<tr>\n<td>MinerU 2.5 2025-09-26 (论文) / 1.2B</td>\n<td>Coarse-to-fine 两阶段 / Qwen2-VL</td>\n<td>文档解析系统；PDF 转 Markdown 的工业级利器，版面还原精准。</td>\n</tr>\n<tr>\n<td>GOT-OCR 2.0 2024-09-03 / 0.58B</td>\n<td>ViTDet + Qwen-0.5B</td>\n<td>OCR 2.0 范式定义者；统一了公式、表格、几何、乐谱等全场景输出。</td>\n</tr>\n<tr>\n<td>DianJin-OCR-R1 2025-08-18 / 7B</td>\n<td>基于 Qwen2.5-VL-7B-Instruct</td>\n<td>推理型 OCR；首创将 R1 风格的 Reasoning 引入 OCR 领域。</td>\n</tr>\n</tbody>\n</table></div>\n<hr />\n<p>在 2025-2026 年的 OCR-VLM 评测体系中，单纯的“检测框（Detection）”评测已经逐渐退居幕后，取而代之的是衡量<strong>端到端还原能力</strong>、<strong>复杂结构理解能力</strong>和<strong>文档逻辑推理能力</strong>的综合性 Benchmark。以下是核心版面分析与文档理解 Benchmark 汇总表。</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th></th>\n<th></th>\n<th></th>\n<th></th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>维度</td>\n<td>Benchmark 名称</td>\n<td>侧重点 / 考核指标</td>\n<td>代表性模型</td>\n</tr>\n<tr>\n<td>综合全能型</td>\n<td>OCRBench</td>\n<td>当前行业金标准。涵盖感知、推理、数学、表格等多维度，是这一批模型（如 InternVL, DeepSeek, GLM）必测项。</td>\n<td>InternVL 2.5, DeepSeek-OCR2, GLM-OCR</td>\n</tr>\n<tr>\n<td>文档问答 (VQA)</td>\n<td>DocVQA</td>\n<td>针对扫描件、文档图提问。考核模型是否能在复杂版面中精准定位并提取信息。</td>\n<td>几乎所有模型 (DianJin-OCR-R1 重点)</td>\n</tr>\n<tr>\n<td>版面分割/解析</td>\n<td>DocLayNet</td>\n<td>工业级复杂版面数据集（包含多栏、插图、页眉页脚）。考核模型对文档物理结构的理解。</td>\n<td>MinerU 2.5, Dolphin-v2, PaddleOCR-VL</td>\n</tr>\n<tr>\n<td>表格理解</td>\n<td>WTQ / TableQA</td>\n<td>考核对表格结构的解析能力。不仅仅是认字，还包括行列对齐及跨单元格计算。</td>\n<td>DeepSeek-OCR2, HunyuanOCR</td>\n</tr>\n<tr>\n<td>图表解析</td>\n<td>ChartQA</td>\n<td>针对柱状图、折线图等可视化图表的数值理解与趋势分析。</td>\n<td>InternVL 2.5, Kimi K2.5</td>\n</tr>\n<tr>\n<td>长文档解析</td>\n<td>DUDE</td>\n<td>多页文档理解（Document Understanding Dataset and Evaluation）。考核模型处理长序列和页间逻辑的能力。</td>\n<td>Kimi K2.5, Dolphin-v2</td>\n</tr>\n<tr>\n<td>推理与逻辑</td>\n<td>MathVista / MathVerse</td>\n<td>考核模型在 OCR 基础上的数学公式解析与逻辑推理。</td>\n<td>DianJin-OCR-R1, FireRed-OCR</td>\n</tr>\n<tr>\n<td>工业级还原</td>\n<td>VGT (Vision-Grid-Transformer)</td>\n<td>专门针对文档元素（标题、正文、列表、图像）的细粒度对齐和识别。</td>\n<td>MinerU 2.5, PaddleOCR-VL</td>\n</tr>\n</tbody>\n</table></div>\n<hr />\n<h2>评测逻辑的演变</h2>\n<ol>\n<li><strong>从“IOU”转向“Edit Distance / F1 Score”</strong>：<br />\n<strong><em>传统的版面分析看重检测框的重合度（IOU）</em></strong>，但现在的端到端模型（如 HunyuanOCR）更看重输出内容与标准 Markdown 之间的<strong>编辑距离</strong>或 <strong>F1 分数</strong>。如果模型能精准还原表格结构，哪怕它内部没有明确的“框”，也被认为是优秀的。</li>\n<li><strong>“端到端还原”成为新高地</strong>：<br />\n<strong>MinerU 2.5</strong> 和 <strong>Dolphin-v2</strong> 这种强调“解析”的模型，现在更倾向于在 <strong>Common Crawl-OCR</strong> 等大规模真实网页/文档抓取集上进行闭环测试，看转换后的 Markdown 在浏览器中重新渲染后与原图的视觉相似度。</li>\n<li><strong>推理化趋势下的新指标</strong>：<br />\n<strong>DianJin-OCR-R1</strong> 引入了类似 <strong>AIME</strong> 或 <strong>MathVista</strong> 的逻辑测试。因为对于 OCR 来说，认出“$2+2$”是感知，算出“$2+2$=4$”才是理解。版面分析的终极形态是理解<strong>段落间的因果逻辑</strong>，而不仅仅是空间上的邻近。</li>\n</ol>\n<hr />\n<h2>真实场景的表现</h2>\n<p>在 2025-2026 年的评估体系中，虽然 <strong>OmniDocBench</strong> 和 <strong>OCRBench</strong> 成了衡量 VLM 能力的“主考场”，但针对传统自然图片（Scene Text）、海报、发票和路牌等任务，各大模型依然在经典的开源数据集上保留了测试成绩，用以证明其<strong>泛化能力</strong>。详见下图：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th></th>\n<th></th>\n<th></th>\n<th></th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>任务类型</td>\n<td>核心开源数据集 (Benchmark)</td>\n<td>代表模型表现 / 测试结论</td>\n<td>评测侧重点</td>\n</tr>\n<tr>\n<td>发票 / 票据 (Receipts)</td>\n<td>SROIE, FUNSD, CORD</td>\n<td>HunyuanOCR 在 SROIE 达到 92.5% 以上准确率；GLM-OCR 针对真实发票提取进行了内部 SOTA 验证。</td>\n<td>关键信息提取 (KIE) 与 字段对齐精度。</td>\n</tr>\n<tr>\n<td>海报 / 广告 (Posters)</td>\n<td>ReCTS, ArT (Arbitrary Text)</td>\n<td>FireRed-OCR 在处理这类具有艺术字、复杂背景的任务时表现最佳，因其针对小红书图文场景做了专项微调。</td>\n<td>艺术字识别、变形文字处理、背景抗干扰。</td>\n</tr>\n<tr>\n<td>路标路牌 (Signs)</td>\n<td>LSVT, CTW1500, Total-Text</td>\n<td>PaddleOCR-VL-1.5 凭借动态分辨率编码器，在 LSVT 长图和倾斜路牌上表现稳健。</td>\n<td>任意形状文本检测 (Spotting) 与 远距离小字。</td>\n</tr>\n<tr>\n<td>自然图片 (Scene Text)</td>\n<td>ICDAR 2015 / 2023, COCO-Text</td>\n<td>DeepSeek-OCR2 和 InternVL 2.5 在此类通用场景下主要作为基础能力测试，识别率普遍在 90% 以上。</td>\n<td>复杂光照、遮挡情况下的鲁棒性。</td>\n</tr>\n<tr>\n<td>商品 / 包装 (Products)</td>\n<td>MTWI (Alibaba), ReCTS</td>\n<td>Dolphin-v2 (字节) 在商品标签解析上引用了此类数据，强调其对多语种、多尺寸文字的统一识别。</td>\n<td>高密度、多尺寸文字共存的解析。</td>\n</tr>\n<tr>\n<td>手写体 (Handwriting)</td>\n<td>CASIA-HWDB, HIT-OR3C</td>\n<td>GLM-OCR 在技术报告中明确提到对中文手写体和涂改场景进行了优化。</td>\n<td>连笔字、非规范字形的识别能力。</td>\n</tr>\n</tbody>\n</table></div>\n<hr />\n<p>深度分析：为什么现在的报告里这些数据集变少了？<br />\n虽然这些数据集依然是“必修课”，但在VLM-OCR的技术报告中，它们的地位发生了微调：</p>\n<ol>\n<li><strong>从“感知”转向“抗损”</strong>：<br />\n<strong>PaddleOCR-VL-1.5</strong> 提出了一个非常有代表性的新基准 <strong>Real5-OmniDocBench</strong>。它不再仅仅测“路牌上是什么字”，而是模拟现实中的 <strong>扫描伪影、倾斜、折痕、屏幕翻拍、光照变化</strong> 五种极端情况。目前的趋势是，模型在干净的开源集上基本都已“刷爆”（接近 95%+），现在的竞争点在于谁能在<strong>极度恶劣的真实环境</strong>下不翻车。</li>\n<li><strong>“端到端 Spotting”取代“检测+识别”</strong>：<br />\n   传统的 <strong>ICDAR</strong> 任务通常分开测检测和识别。但 <strong>HunyuanOCR</strong> 和 <strong>FireRed-OCR</strong> 现在的测试结果通常给出一个 <strong>End-to-End Edit Distance</strong>。这说明模型不再关注“框”得准不准，而是关注“最终输出的文本串”是否和图中的海报内容一致。</li>\n<li><strong>版面逻辑的“空间坐标”化</strong>：<br />\n   现在的模型（如 <strong>DeepSeek-OCR2</strong>）在处理发票和海报时，开始输出带有 <code>{\"point\": [x, y]}</code> 这种视觉定位信息的 JSON。这种“Point-to-Text”的能力让它们在处理传统任务时，比老牌 OCR 系统更具“语义理解”优势（例如能直接分辨出海报里的“5折”是促销信息还是装饰字）。</li>\n</ol>"
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
      "detail": "<p><img alt=\"TextBoxes 网络架构图\" src=\"https://ar5iv.labs.arxiv.org/html/1611.06779/assets/x1.png\" />\n<em>图：TextBoxes 架构总览。28 层全卷积网络，text-box 层连接到 6 个卷积层，每个位置预测 12 个默认框的文本存在分数和偏移量（72 维向量）。</em></p>\n<p><img alt=\"默认框设计示意图\" src=\"https://ar5iv.labs.arxiv.org/html/1611.06779/assets/x2.png\" />\n<em>图：默认框设计。展示了宽高比为 1 和 5 的默认框，以及带有垂直偏移的变体，用于解决水平方向密集、垂直方向稀疏的匹配问题。</em></p>\n<pre><code class=\"language-python\"># TextBoxes 检测流程伪代码\ndef textboxes_detect(image):\n    # 1. 多尺度输入（可选）\n    scales = [(300,300), (700,700), (300,700), (500,700), (1600,1600)]\n    all_boxes = []\n\n    for scale in scales:\n        img_resized = resize(image, scale)\n        # 2. 前向传播：VGG-16 骨干 + 额外卷积层\n        features = backbone(img_resized)  # 多层特征图\n\n        # 3. 6 个 text-box 层分别预测\n        for feat_map in selected_feature_maps:  # 6 层\n            # 使用 1x5 卷积核预测\n            # 每个位置 12 个默认框 × (2 分类 + 4 回归) = 72 维\n            preds = conv1x5(feat_map)  \n            boxes = decode(preds, default_boxes)\n            all_boxes.extend(boxes)\n\n    # 4. NMS 后处理\n    final_boxes = nms(all_boxes, threshold=0.45)\n    return final_boxes\n\n# 可选：结合 CRNN 重评分\ndef rescore_with_crnn(boxes, image, lexicon):\n    for box in boxes:\n        crop = crop_image(image, box)\n        score = max(crnn.prob(word | crop) for word in lexicon)\n        box.score = score\n    return nms(boxes)  # 二次 NMS\n</code></pre>\n<p><strong>动机与背景</strong></p>\n<p>场景文字检测面临的核心挑战是文本具有极端的宽高比（如长单词或短语），这与通用目标检测中物体通常接近正方形的假设截然不同。传统方法依赖多步流水线（字符检测→过滤→分组），参数调优困难且速度慢。SSD 等通用检测器虽然速度快，但其默认框和 3×3 卷积核的设计无法有效覆盖高宽高比的文本区域——实验表明直接使用 SSD 检测文本的 F-measure 仅为 0.68（ICDAR 2013），远低于专用方法。</p>\n<p><strong>核心机制：Text-box 层</strong></p>\n<p>Text-box 层是 TextBoxes 的关键创新。在每个特征图位置，该层同时预测文本存在概率和边界框偏移量。其核心设计包含两个方面：</p>\n<p><strong>1. 大宽高比默认框 + 垂直偏移</strong></p>\n<p>与 SSD 使用 <span class=\"kb-math kb-math-inline\">1, 2, 1/2, 3, 1/3</span> 等对称宽高比不同，TextBoxes 定义了 6 种宽高比：<span class=\"kb-math kb-math-inline\">1, 2, 3, 5, 7, 10</span>，全部偏向水平方向。然而，仅增加水平方向的默认框会导致水平方向密集而垂直方向稀疏，造成 ground-truth 与默认框的匹配质量下降。为此，每个默认框额外设置一个垂直偏移版本（偏移量为网格单元高度的一半），使得每个位置共有 <span class=\"kb-math kb-math-inline\">6 \\times 2 = 12</span> 个默认框。</p>\n<p><strong>2. 1×5 不规则卷积核</strong></p>\n<p>标准 3×3 卷积核产生正方形感受野，对于水平延伸的文本会引入大量背景噪声。TextBoxes 采用 1×5 的 inception 风格卷积核，产生水平矩形感受野，更好地匹配文本的形态特征，同时减少垂直方向的噪声干扰。</p>\n<p><strong>边界框回归公式</strong></p>\n<p>给定默认框 <span class=\"kb-math kb-math-inline\">\\mathbf{b}_0 = (x_0, y_0, w_0, h_0)</span>，text-box 层预测偏移量 <span class=\"kb-math kb-math-inline\">(\\Delta x, \\Delta y, \\Delta w, \\Delta h)</span>，最终检测框通过以下公式解码：</p>\n<div class=\"kb-math kb-math-display\">x = x_0 + w_0 \\cdot \\Delta x</div>\n<div class=\"kb-math kb-math-display\">y = y_0 + h_0 \\cdot \\Delta y</div>\n<div class=\"kb-math kb-math-display\">w = w_0 \\cdot \\exp(\\Delta w)</div>\n<div class=\"kb-math kb-math-display\">h = h_0 \\cdot \\exp(\\Delta h)</div>\n<p><strong>损失函数</strong></p>\n<p>TextBoxes 采用与 SSD 相同的多任务损失：</p>\n<div class=\"kb-math kb-math-display\">L(x, c, l, g) = \\frac{1}{N}\\left(L_{\\text{conf}}(x, c) + \\alpha \\cdot L_{\\text{loc}}(x, l, g)\\right)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">N</span> 为匹配的默认框数量，<span class=\"kb-math kb-math-inline\">\\alpha = 1</span>。<span class=\"kb-math kb-math-inline\">L_{\\text{conf}}</span> 为 2-class softmax 分类损失，<span class=\"kb-math kb-math-inline\">L_{\\text{loc}}</span> 为 smooth L1 回归损失。</p>\n<p><strong>训练流程</strong></p>\n<ul>\n<li>输入尺寸：训练时固定 300×300</li>\n<li>预训练：在 SynthText（80 万合成图像）上训练 50k 迭代</li>\n<li>微调：在 ICDAR 2013 训练集上微调 2k 迭代</li>\n<li>优化器：SGD，momentum=0.9，weight decay=5×10⁻⁴</li>\n<li>学习率：初始 10⁻³，40k 迭代后衰减至 10⁻⁴</li>\n<li>数据增强：在线随机裁剪和翻转</li>\n<li>训练时间：约 25 小时（单块 Titan X GPU）</li>\n</ul>\n<p><strong>与 CRNN 结合的 Word Spotting</strong></p>\n<p>TextBoxes 先以低阈值生成候选框（约 35 个/图，召回率 0.93），然后用 CRNN 对每个候选框计算识别置信度：</p>\n<div class=\"kb-math kb-math-display\">s = \\max_{\\mathbf{w} \\in \\mathcal{W}} p(\\mathbf{w} | I)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\mathcal{W}</span> 为给定词典。该分数替代原始检测分数后进行二次阈值过滤和 NMS。对于识别为相同单词的框，采用更低的 NMS 重叠阈值以施加更强的抑制。</p>\n<p><strong>与传统方法的区别</strong></p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>传统方法</th>\n<th>SSD</th>\n<th>TextBoxes</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>流水线</td>\n<td>多步（检测→过滤→分组）</td>\n<td>单步</td>\n<td>单步</td>\n</tr>\n<tr>\n<td>默认框宽高比</td>\n<td>—</td>\n<td>对称（1, 2, 1/2, 3, 1/3）</td>\n<td>偏水平（1,2,3,5,7,10）+ 垂直偏移</td>\n</tr>\n<tr>\n<td>卷积核</td>\n<td>—</td>\n<td>3×3</td>\n<td>1×5</td>\n</tr>\n<tr>\n<td>文本适配</td>\n<td>手工规则</td>\n<td>无</td>\n<td>专门设计</td>\n</tr>\n<tr>\n<td>ICDAR 2013 F值</td>\n<td>~0.80</td>\n<td>0.68</td>\n<td><strong>0.85</strong>（多尺度 0.86）</td>\n</tr>\n<tr>\n<td>速度</td>\n<td>1-7s</td>\n<td>0.1s</td>\n<td>0.09s（快速）/ 0.73s（多尺度）</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 关键：TextBoxes 的核心贡献在于证明了只需对通用检测器（SSD）做针对性的\"形状适配\"改造——长条默认框 + 长条卷积核——就能大幅提升文本检测性能，无需复杂的多阶段流水线。</div>",
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
        "<strong>尺度不变的 IoU 损失</strong>：RBOX 几何回归采用 <span class=\"kb-math kb-math-inline\">-\\log \\text{IoU}</span> 损失，对不同尺度文本天然不变",
        "<strong>Locality-Aware NMS</strong>：利用相邻像素几何体高度相关的假设，按行逐步合并，将 NMS 从 <span class=\"kb-math kb-math-inline\">O(n^2)</span> 降至 <span class=\"kb-math kb-math-inline\">O(n)</span>",
        "<strong>Backbone 灵活</strong>：支持 VGG16（精度优先）和 PVANet（速度优先），PVANet 2x 达 13.2 FPS（720p）",
        "<strong>多基准 SOTA</strong>：ICDAR 2015 F-score 0.7820（单尺度）/ 0.8072（多尺度），MSRA-TD500 F-score 0.7608，COCO-Text F-score 0.3245"
      ],
      "detail": "<h5>流水线对比与动机</h5>\n<p><img alt=\"EAST 流水线对比\" src=\"https://ar5iv.labs.arxiv.org/html/1704.03155/assets/x1.png\" />\n<em>图 1：传统多阶段文本检测流水线（上）vs EAST 极简流水线（下）。传统方法需要候选生成、过滤、文本行聚合、分词等多个步骤，每一步的误差都会累积；EAST 将所有步骤压缩为 FCN + NMS 两步。</em></p>\n<p>传统场景文本检测方法（如 CTPN、TextBoxes 等）通常包含多个串行阶段：候选区域生成 → 候选过滤 → 边界框回归 → 文本行聚合 → 分词。这种多阶段设计存在两个核心问题：</p>\n<ol>\n<li><strong>误差累积</strong>：每个中间步骤的错误都会传递到下游，最终性能受限于最弱环节</li>\n<li><strong>速度瓶颈</strong>：冗余的后处理步骤（尤其是文本行聚合和分词）显著增加推理时间</li>\n</ol>\n<p>EAST 的核心思想是：<strong>让网络直接在每个像素位置预测文本区域的完整几何描述</strong>，从而跳过所有中间步骤。</p>\n<h5>网络架构</h5>\n<p><img alt=\"EAST 网络架构\" src=\"https://ar5iv.labs.arxiv.org/html/1704.03155/assets/x2.png\" />\n<em>图 2：EAST 网络架构。左侧为特征提取干（feature extractor stem），中间为特征合并分支（feature-merging branch），右侧为输出层。</em></p>\n<p>网络由三部分组成：</p>\n<p><strong>1. 特征提取干（Feature Extractor Stem）</strong></p>\n<p>使用预训练的卷积网络（VGG16 或 PVANet）作为骨干，从四个不同层级提取特征图：</p>\n<div class=\"kb-math kb-math-display\">f_1, f_2, f_3, f_4</div>\n<p>分别对应原图的 1/4、1/8、1/16、1/32 分辨率。这些多尺度特征图能同时捕获小文本的细节信息和大文本的语义信息。</p>\n<p><strong>2. 特征合并分支（Feature-Merging Branch）</strong></p>\n<p>采用类似 U-Net 的自顶向下合并策略，逐级融合多尺度特征：</p>\n<div class=\"kb-math kb-math-display\">h_i = f_i \\quad (i=1)</div>\n<div class=\"kb-math kb-math-display\">g_i = \\text{unpool}(h_i) \\quad (i \\geq 2)</div>\n<div class=\"kb-math kb-math-display\">h_i = \\text{Conv}_{3\\times3}(\\text{Conv}_{1\\times1}([g_i; f_{i-1}]))</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">[g_i; f_{i-1}]</span> 表示沿通道维度拼接。每一级先用 1×1 卷积降维，再用 3×3 卷积融合特征。最终输出特征图 <span class=\"kb-math kb-math-inline\">h_4</span> 的分辨率为原图的 1/4。</p>\n<div class=\"key-point\">💡 <strong>关键设计</strong>：合并分支中每级的通道数逐步减半（如 128→64→32），既保证了感受野的逐步扩大，又控制了计算量。</div>\n<p><strong>3. 输出层</strong></p>\n<p>在合并后的特征图上，用 1×1 卷积产生两类输出：</p>\n<ul>\n<li><strong>Score Map</strong>（1 通道）：每个像素属于文本区域的置信度，值域 <span class=\"kb-math kb-math-inline\">[0, 1]</span></li>\n<li><strong>Geometry Map</strong>：</li>\n<li><strong>RBOX 模式</strong>（5 通道）：4 个通道分别表示像素到矩形上、右、下、左边界的距离 <span class=\"kb-math kb-math-inline\">(d_1, d_2, d_3, d_4)</span>，1 个通道表示旋转角度 <span class=\"kb-math kb-math-inline\">\\theta \\in [-\\pi/4, \\pi/4)</span></li>\n<li><strong>QUAD 模式</strong>（8 通道）：4 个顶点相对于当前像素位置的偏移量 <span class=\"kb-math kb-math-inline\">(\\Delta x_i, \\Delta y_i), i=1,2,3,4</span></li>\n</ul>\n<h5>标签生成</h5>\n<p><img alt=\"EAST 标签生成\" src=\"https://ar5iv.labs.arxiv.org/html/1704.03155/assets/x3.png\" />\n<em>图 3：标签生成过程。(a) 原始四边形标注；(b) 收缩后的正样本区域（绿色）；(c) RBOX 几何标签；(d) QUAD 几何标签。</em></p>\n<p><strong>Score Map 标签</strong>：为避免文本边界处的模糊性，对原始四边形标注进行收缩处理。对四边形的每条边，按参考长度的 <span class=\"kb-math kb-math-inline\">0.3</span> 倍向内收缩：</p>\n<div class=\"kb-math kb-math-display\">D(p_i) = \\min(D(p_i, p_{(i \\bmod 4)+1}),\\ D(p_i, p_{((i+2) \\bmod 4)+1}))</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">D(p_i, p_j)</span> 是顶点 <span class=\"kb-math kb-math-inline\">p_i</span> 到 <span class=\"kb-math kb-math-inline\">p_j</span> 的欧氏距离。收缩后的区域内像素标记为正样本（score = 1），其余为负样本。</p>\n<p><strong>Geometry 标签</strong>：对于正样本区域内的每个像素，计算其到对应文本框边界的距离（RBOX）或顶点偏移（QUAD）。</p>\n<h5>损失函数</h5>\n<p>总损失为分类损失和几何损失的加权和：</p>\n<div class=\"kb-math kb-math-display\">L = L_s + \\lambda_g \\cdot L_g</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\lambda_g</span> 设为 1。</p>\n<p><strong>分类损失 <span class=\"kb-math kb-math-inline\">L_s</span></strong>：采用类别平衡的交叉熵损失，通过对正负样本加权来处理严重的类别不平衡：</p>\n<div class=\"kb-math kb-math-display\">L_s = -\\beta \\cdot Y^* \\cdot \\log(\\hat{Y}) - (1-\\beta) \\cdot (1-Y^*) \\cdot \\log(1-\\hat{Y})</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\beta</span> 为负样本在训练 patch 中的比例，自动平衡正负样本的贡献。</p>\n<p><strong>RBOX 几何损失 <span class=\"kb-math kb-math-inline\">L_g</span></strong>：由 AABB 损失和角度损失两部分组成：</p>\n<div class=\"kb-math kb-math-display\">L_g = L_{\\text{AABB}} + \\lambda_\\theta \\cdot L_\\theta</div>\n<p>AABB 部分采用 IoU 损失，对不同尺度的文本天然不变：</p>\n<div class=\"kb-math kb-math-display\">L_{\\text{AABB}} = -\\log \\text{IoU}(\\hat{\\mathbf{R}}, \\mathbf{R}^*) = -\\log \\frac{|\\hat{\\mathbf{R}} \\cap \\mathbf{R}^*|}{|\\hat{\\mathbf{R}} \\cup \\mathbf{R}^*|}</div>\n<p>其中交集的宽和高可直接计算：</p>\n<div class=\"kb-math kb-math-display\">w_i = \\min(\\hat{d}_2, d_2^*) + \\min(\\hat{d}_4, d_4^*), \\quad h_i = \\min(\\hat{d}_1, d_1^*) + \\min(\\hat{d}_3, d_3^*)</div>\n<p>角度部分采用余弦损失：</p>\n<div class=\"kb-math kb-math-display\">L_\\theta(\\hat{\\theta}, \\theta^*) = 1 - \\cos(\\hat{\\theta} - \\theta^*)</div>\n<div class=\"key-point\">💡 <strong>关键</strong>：<span class=\"kb-math kb-math-inline\">\\lambda_\\theta = 10</span>，角度损失权重较高，因为角度预测的准确性对最终检测框质量至关重要。</div>\n<p><strong>QUAD 几何损失</strong>：采用尺度归一化的 Smooth-L1 损失：</p>\n<div class=\"kb-math kb-math-display\">L_g = \\min_{\\tilde{Q}} \\sum_{c_i \\in C_{\\tilde{Q}}} \\frac{\\text{smoothed}_{L_1}(d_i, d_i^*)}{8 \\times N_{\\tilde{Q}}^*}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">N_{\\tilde{Q}}^*</span> 是四边形最短边长，用于归一化不同尺度文本的损失贡献。</p>\n<h5>核心算法伪代码</h5>\n<pre><code class=\"language-python\"># EAST 检测流程伪代码\ndef east_detect(image, model, score_thresh=0.5):\n    # 1. FCN 前向推理\n    score_map, geometry_map = model(image)  # score: H/4×W/4×1, geo: H/4×W/4×5(RBOX)或8(QUAD)\n\n    # 2. 阈值过滤\n    mask = score_map &gt; score_thresh\n    scores = score_map[mask]\n    geometries = geometry_map[mask]\n\n    # 3. Locality-Aware NMS\n    detections = locality_aware_nms(geometries, scores)\n    return detections\n\ndef locality_aware_nms(geometries, scores):\n    &quot;&quot;&quot;按行扫描合并，O(n) 最优复杂度&quot;&quot;&quot;\n    # 按行（y坐标）排序\n    S = sort_by_row(geometries, scores)\n    merged = None\n    results = []\n\n    for g, s in S:\n        if merged is not None and should_merge(g, merged):\n            # 按置信度加权合并坐标\n            merged = weighted_merge(g, merged)\n        else:\n            if merged is not None:\n                results.append(merged)\n            merged = (g, s)\n\n    if merged is not None:\n        results.append(merged)\n\n    # 对合并后的少量候选执行标准 NMS\n    return standard_nms(results)\n</code></pre>\n<h5>与传统方法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>传统多阶段方法</th>\n<th>EAST</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>流水线步骤</td>\n<td>候选生成→过滤→回归→聚合→分词</td>\n<td>FCN → NMS</td>\n</tr>\n<tr>\n<td>中间表示</td>\n<td>字符/单词候选框</td>\n<td>像素级 score + geometry</td>\n</tr>\n<tr>\n<td>几何输出</td>\n<td>水平矩形</td>\n<td>旋转矩形 / 任意四边形</td>\n</tr>\n<tr>\n<td>后处理复杂度</td>\n<td>高（多步串行）</td>\n<td>低（单步 NMS）</td>\n</tr>\n<tr>\n<td>速度（720p）</td>\n<td>通常 &lt; 5 FPS</td>\n<td>6.5~16.8 FPS</td>\n</tr>\n<tr>\n<td>多方向文本</td>\n<td>需要额外设计</td>\n<td>天然支持</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：EAST 在 RBOX 模式下计算 AABB 损失时忽略了旋转角度的影响，这是一种近似——当角度预测准确时，该近似误差很小。这种解耦设计简化了损失计算，同时在实验中表现良好。</div>\n<h5>实验结果</h5>\n<p>在三个主流基准上的表现：</p>\n<p><strong>ICDAR 2015</strong>（倾斜文本检测）：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>Precision</th>\n<th>Recall</th>\n<th>F-score</th>\n<th>FPS</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>CTPN</td>\n<td>0.7411</td>\n<td>0.5168</td>\n<td>0.6085</td>\n<td>7.1</td>\n</tr>\n<tr>\n<td>RRPN</td>\n<td>0.8202</td>\n<td>0.7340</td>\n<td>0.7744</td>\n<td>—</td>\n</tr>\n<tr>\n<td><strong>EAST (PVANet 2x)</strong></td>\n<td><strong>0.8034</strong></td>\n<td><strong>0.7608</strong></td>\n<td><strong>0.7820</strong></td>\n<td><strong>13.2</strong></td>\n</tr>\n<tr>\n<td>EAST (VGG16, 多尺度)</td>\n<td>0.8072</td>\n<td>—</td>\n<td>0.8072</td>\n<td>6.52</td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>MSRA-TD500</strong>（多语言长文本行）：F-score = 0.7608，Precision = 0.8152，Recall = 0.7127</p>\n<p><strong>COCO-Text</strong>（大规模自然场景）：F-score = 0.3245（AP = 0.3218）</p>",
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
        "轻量骨干 + 可级联 FPEM：使用 ResNet18 作为骨干，FPEM 采用可分离卷积构建 U 形结构，计算量仅为标准 FPN 的 1/5，且可多次级联（默认 <span class=\"kb-math kb-math-inline\">n_c=2</span>）持续增强特征",
        "特征融合模块（FFM）：将多个 FPEM 输出逐尺度相加后上采样拼接，生成 <span class=\"kb-math kb-math-inline\">4 \\times 128 = 512</span> 通道的融合特征图",
        "像素聚合（PA）后处理：预测文本区域分割图、收缩核分割图和相似性向量，通过聚合损失 <span class=\"kb-math kb-math-inline\">\\mathcal{L}_{agg}</span> 和判别损失 <span class=\"kb-math kb-math-inline\">\\mathcal{L}_{dis}</span> 引导像素向对应核心聚类，实现快速且可学习的实例重建",
        "损失函数设计：<span class=\"kb-math kb-math-inline\">\\mathcal{L} = \\mathcal{L}_{tex} + 0.5\\mathcal{L}_{ker} + 0.25(\\mathcal{L}_{agg} + \\mathcal{L}_{dis})</span>，分割部分使用 Dice Loss 解决正负样本不平衡",
        "速度-精度权衡：CTW1500 上 PAN-320 达 79.9% F-measure @ 84.2 FPS；PAN-640 达 83.7% F-measure @ 26.1 FPS"
      ],
      "detail": "<p><img alt=\"PAN 整体架构图\" src=\"https://arxiv.org/html/1908.05900v2/extracted/figures/pipeline.png\" />\n<em>图：PAN 整体流程——轻量骨干提取多尺度特征 → FPEM 级联增强 → FFM 融合 → 分割头预测文本区域/核/相似向量 → PA 聚合重建实例</em></p>\n<pre><code class=\"language-python\"># PAN 像素聚合 (Pixel Aggregation) 后处理伪代码\ndef pixel_aggregation(P_tex, P_ker, P_sim, threshold=0.5):\n    &quot;&quot;&quot;\n    P_tex: 文本区域分割图 (H, W)\n    P_ker: 收缩核分割图 (H, W)  \n    P_sim: 相似性向量图 (4, H, W)\n    &quot;&quot;&quot;\n    # Step 1: 在核分割图上找连通域作为初始实例\n    kernels = connected_components(P_ker &gt; threshold)\n\n    # Step 2: 计算每个核的相似性向量均值\n    for k in kernels:\n        k.center = mean(P_sim[:, k.mask])\n\n    # Step 3: 对文本区域中的非核像素，按相似性向量距离聚合到最近核\n    text_pixels = (P_tex &gt; threshold) &amp; (P_ker &lt;= threshold)\n    for pixel in text_pixels:  # BFS/queue-based\n        nearest_kernel = argmin(||P_sim[:, pixel] - k.center|| for k in neighbors)\n        if distance &lt; delta_agg:  # δ_agg = 0.5\n            assign pixel to nearest_kernel\n\n    # Step 4: 输出每个实例的像素集合作为检测结果\n    return [instance.pixels for instance in kernels]\n</code></pre>\n<p><strong>动机与背景</strong></p>\n<p>基于分割的文本检测方法（如 PSENet）虽然能处理任意形状文本，但面临两个瓶颈：(1) 特征提取网络（如 ResNet50 + FPN）计算量大，难以实时；(2) 后处理中的渐进式尺度扩展（Progressive Scale Expansion）耗时严重，成为速度瓶颈。PAN 的核心目标是同时解决这两个问题。</p>\n<p><strong>FPEM：轻量可级联的特征增强</strong></p>\n<p>FPEM 是一个 U 形模块，包含自底向上和自顶向下两条路径。每条路径在相邻尺度间使用 <strong>可分离卷积</strong>（depthwise separable convolution）进行特征融合：先对低分辨率特征上采样/下采样到目标尺度，再与目标尺度特征逐元素相加，最后通过 3×3 深度可分离卷积精炼。</p>\n<div class=\"kb-math kb-math-display\">\\text{FPEM 单步}: F_{out} = \\text{DWSepConv}_{3\\times3}(F_{in} + \\text{Resize}(F_{adj}))</div>\n<p>关键设计：\n- 所有中间通道统一为 128，大幅减少参数\n- 可分离卷积使计算量降至标准卷积的 1/5\n- <strong>可级联特性</strong>：输入输出通道数相同，可堆叠 <span class=\"kb-math kb-math-inline\">n_c</span> 个 FPEM 持续增强特征，实验表明 <span class=\"kb-math kb-math-inline\">n_c=2</span> 即可获得显著提升</p>\n<div class=\"key-point\">💡 关键：FPEM 的级联设计使得即使使用轻量骨干（ResNet18），也能通过多次特征增强弥补表达能力不足。</div>\n<p><strong>FFM：多尺度特征融合</strong></p>\n<p>当使用 <span class=\"kb-math kb-math-inline\">n_c</span> 个级联 FPEM 时，每个尺度会产生 <span class=\"kb-math kb-math-inline\">n_c</span> 组特征图。FFM 的策略是：\n1. 对同一尺度的所有 FPEM 输出进行逐元素相加\n2. 将 4 个尺度的特征图统一上采样到最大分辨率（1/4 原图）\n3. 沿通道维度拼接，得到 <span class=\"kb-math kb-math-inline\">4 \\times 128 = 512</span> 通道的融合特征</p>\n<p>最终通过 1×1 卷积将 512 通道降维，分别预测：文本区域图 <span class=\"kb-math kb-math-inline\">P_{tex}</span>、核区域图 <span class=\"kb-math kb-math-inline\">P_{ker}</span>、相似性向量图 <span class=\"kb-math kb-math-inline\">P_{sim}</span>（4维）。</p>\n<p><strong>PA：可学习的像素聚合</strong></p>\n<p>PA 是 PAN 最核心的创新，用于替代 PSENet 中耗时的渐进式扩展。其思路是：</p>\n<ol>\n<li><strong>预测相似性向量</strong>：网络为每个像素预测一个 4 维向量，语义相同的像素应具有相近的向量</li>\n<li><strong>聚合损失</strong> <span class=\"kb-math kb-math-inline\">\\mathcal{L}_{agg}</span>：拉近同一文本实例内像素向量与该实例核心向量的距离</li>\n</ol>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{agg} = \\frac{1}{N}\\sum_{i=1}^{N}\\frac{1}{|T_i|}\\sum_{p \\in T_i} \\ln(D(p, K_i) + 1)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">D(p, K_i) = \\max(||F(p) - G(K_i)|| - \\delta_{agg}, 0)</span>，<span class=\"kb-math kb-math-inline\">\\delta_{agg}=0.5</span></p>\n<ol>\n<li><strong>判别损失</strong> <span class=\"kb-math kb-math-inline\">\\mathcal{L}_{dis}</span>：推远不同实例核心之间的距离</li>\n</ol>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{dis} = \\frac{1}{N(N-1)}\\sum_{i=1}^{N}\\sum_{j=1,j\\neq i}^{N} \\ln(D&#x27;(K_i, K_j) + 1)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">D&#x27;(K_i, K_j) = \\max(\\delta_{dis} - ||G(K_i) - G(K_j)||, 0)</span>，<span class=\"kb-math kb-math-inline\">\\delta_{dis}=3</span></p>\n<div class=\"warn-box\">⚠️ 注意：PA 的后处理只需一次 BFS 遍历即可完成实例重建，时间复杂度为 O(像素数)，远快于 PSENet 的多次膨胀操作。</div>\n<p><strong>与 PSENet 的关键区别</strong></p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方面</th>\n<th>PSENet</th>\n<th>PAN</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>骨干网络</td>\n<td>ResNet50 + FPN</td>\n<td>ResNet18 + FPEM×2</td>\n</tr>\n<tr>\n<td>后处理</td>\n<td>渐进式尺度扩展（多轮BFS）</td>\n<td>像素聚合（单轮BFS + 相似向量）</td>\n</tr>\n<tr>\n<td>后处理可学习</td>\n<td>否（纯规则）</td>\n<td>是（聚合/判别损失引导）</td>\n</tr>\n<tr>\n<td>CTW1500 速度</td>\n<td>3.9 FPS</td>\n<td>26.1 FPS（快 6.7×）</td>\n</tr>\n</tbody>\n</table></div>",
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
      "detail": "<h5>核心架构图</h5>\n<p><img alt=\"DBNet 网络架构\" src=\"https://ar5iv.labs.arxiv.org/html/1911.08947/assets/x3.png\" />\n<em>图：DBNet 网络架构。输入图像经 FPN 提取多尺度特征后，分别预测概率图 P 和阈值图 T，通过 DB 模块生成近似二值图 <span class=\"kb-math kb-math-inline\">\\hat{B}</span>。</em></p>\n<p><img alt=\"传统流程 vs DB 流程\" src=\"https://ar5iv.labs.arxiv.org/html/1911.08947/assets/x2.png\" />\n<em>图：传统分割检测流程（蓝色）使用固定阈值 + 复杂后处理；DB 流程（红色）将二值化嵌入网络联合优化，自适应阈值使后处理大幅简化。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># DBNet 训练与推理核心逻辑\n# ===== 训练阶段 =====\ndef train_forward(image, gt_polygons):\n    # 1. 特征提取 (FPN)\n    features = FPN(ResNet(image))  # 多尺度融合特征 F\n\n    # 2. 预测概率图和阈值图\n    P = sigmoid(conv_prob(features))      # 概率图, shape: H×W\n    T = sigmoid(conv_thresh(features))    # 阈值图, shape: H×W\n\n    # 3. 可微二值化 (DB)\n    k = 50  # 放大因子\n    B_hat = 1.0 / (1.0 + exp(-k * (P - T)))  # 近似二值图\n\n    # 4. 计算损失\n    L_s = BCE_OHEM(P, gt_prob_map)           # 概率图监督\n    L_b = BCE_OHEM(B_hat, gt_prob_map)       # 二值图监督\n    L_t = L1(T[dilated_mask], gt_thresh_map) # 阈值图监督\n    Loss = L_s + 1.0 * L_b + 10.0 * L_t\n    return Loss\n\n# ===== 推理阶段 (DB 模块可移除) =====\ndef inference(image):\n    features = FPN(ResNet(image))\n    P = sigmoid(conv_prob(features))\n    binary_map = (P &gt; 0.3)  # 固定阈值即可\n    # 简单后处理: 连通域 → 最小外接框 → 反收缩\n    boxes = post_process(binary_map, shrink_ratio=1.5)\n    return boxes\n</code></pre>\n<h5>方法详解</h5>\n<p><strong>1. 动机与背景</strong></p>\n<p>基于分割的文本检测方法能处理任意形状文本，但面临一个核心瓶颈：<strong>后处理复杂且耗时</strong>。传统流程需要固定阈值将概率图转为二值图，再通过像素聚类（如 PSENet 的渐进式尺度扩展、Pixel Embedding 的特征距离聚类）将像素分组为文本实例。这些后处理步骤占据了大量推理时间。</p>\n<p>DBNet 的核心思想是：<strong>将二值化操作本身变为可学习的</strong>，让网络自适应地为每个像素位置预测最优阈值，从而使二值化结果更加鲁棒，后处理可以极度简化。</p>\n<p><strong>2. 可微分二值化 (DB) 模块</strong></p>\n<p>标准二值化是阶跃函数，不可微：</p>\n<div class=\"kb-math kb-math-display\">B_{i,j} = \\begin{cases} 1 &amp; \\text{if } P_{i,j} \\geq T_{i,j} \\\\ 0 &amp; \\text{otherwise} \\end{cases}</div>\n<p>DBNet 用近似函数替代：</p>\n<div class=\"kb-math kb-math-display\">\\hat{B}_{i,j} = \\frac{1}{1 + e^{-k(P_{i,j} - T_{i,j})}}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">k</span> 为放大因子（实验中取 50）。当 <span class=\"kb-math kb-math-inline\">k</span> 足够大时，该函数逼近阶跃函数，但处处可微。</p>\n<div class=\"key-point\">💡 关键：DB 的梯度对 <span class=\"kb-math kb-math-inline\">P</span> 和 <span class=\"kb-math kb-math-inline\">T</span> 的偏导数中都包含放大因子 <span class=\"kb-math kb-math-inline\">k</span>，这使得梯度在边界区域（<span class=\"kb-math kb-math-inline\">P \\approx T</span>）被显著放大，促使网络更精准地学习前景/背景边界。</div>\n<p><img alt=\"DB 函数可视化\" src=\"https://ar5iv.labs.arxiv.org/html/1911.08947/assets/x4.png\" />\n<em>图：DB 函数示意。蓝色为标准二值化（不可微），红色为 DB 近似（可微），通过放大因子 k 控制逼近程度。</em></p>\n<p><strong>3. 自适应阈值图</strong></p>\n<p>与传统方法使用全局固定阈值不同，DBNet 的阈值图 <span class=\"kb-math kb-math-inline\">T</span> 是逐像素预测的。网络学习到的阈值图类似文本区域的\"边界图\"——在文本边缘处阈值较高，在文本中心和背景处阈值较低。这种自适应机制使得：\n- 文本边界更加清晰锐利\n- 对不同对比度、光照条件的文本具有更强鲁棒性</p>\n<p><strong>4. 标签生成</strong></p>\n<p><img alt=\"标签生成过程\" src=\"https://ar5iv.labs.arxiv.org/html/1911.08947/assets/x5.png\" />\n<em>图：标签生成。对原始多边形使用 Vatti clipping 按比例收缩得到概率图标签 <span class=\"kb-math kb-math-inline\">G_s</span>，扩张得到阈值图监督区域 <span class=\"kb-math kb-math-inline\">G_d</span>。</em></p>\n<ul>\n<li><strong>概率图标签</strong>：使用 Vatti clipping 算法将文本多边形按收缩比 <span class=\"kb-math kb-math-inline\">r=0.4</span> 向内收缩，收缩距离 <span class=\"kb-math kb-math-inline\">D = A(1-r^2)/L</span>（A 为面积，L 为周长）</li>\n<li><strong>阈值图标签</strong>：在收缩区域与扩张区域之间的环形带内，计算每个像素到最近文本边界的归一化距离</li>\n</ul>\n<p><strong>5. 损失函数</strong></p>\n<div class=\"kb-math kb-math-display\">L = L_s + \\alpha \\cdot L_b + \\beta \\cdot L_t</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\alpha = 1.0</span>，<span class=\"kb-math kb-math-inline\">\\beta = 10</span>：\n- <span class=\"kb-math kb-math-inline\">L_s</span>：概率图的 BCE 损失，使用 OHEM（正负样本比 1:3）\n- <span class=\"kb-math kb-math-inline\">L_b</span>：近似二值图的 BCE 损失，同样使用 OHEM\n- <span class=\"kb-math kb-math-inline\">L_t</span>：阈值图的 L1 损失，仅在扩张区域内计算</p>\n<div class=\"warn-box\">⚠️ 注意：推理时仅使用概率图 P 加固定阈值（0.3），DB 模块和阈值图分支可完全移除，因此不增加任何推理开销。DB 的作用体现在训练阶段对概率图预测质量的提升。</div>\n<p><strong>6. 网络结构细节</strong></p>\n<ul>\n<li>Backbone：ResNet-18（轻量）或 ResNet-50，在 stage 3-5 使用可变形卷积</li>\n<li>Neck：FPN 结构，将 4 个尺度的特征上采样到 1/4 分辨率后拼接</li>\n<li>Head：两个并行分支（概率图 + 阈值图），各含 3×3 卷积 + BN + ReLU + 转置卷积上采样</li>\n</ul>\n<p><strong>7. 与传统方法的对比优势</strong></p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>传统分割方法</th>\n<th>DBNet</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>阈值</td>\n<td>全局固定</td>\n<td>逐像素自适应预测</td>\n</tr>\n<tr>\n<td>后处理</td>\n<td>像素聚类/渐进扩展</td>\n<td>仅连通域 + 反收缩</td>\n</tr>\n<tr>\n<td>二值化</td>\n<td>不参与训练</td>\n<td>端到端联合优化</td>\n</tr>\n<tr>\n<td>推理额外开销</td>\n<td>后处理耗时</td>\n<td>DB 可移除，零开销</td>\n</tr>\n<tr>\n<td>ResNet-18 性能</td>\n<td>较差</td>\n<td>显著提升（+3.7% F on TD500）</td>\n</tr>\n</tbody>\n</table></div>\n<p><img alt=\"速度-精度对比\" src=\"https://ar5iv.labs.arxiv.org/html/1911.08947/assets/x1.png\" />\n<em>图：在 MSRA-TD500 数据集上，DBNet 在速度和精度两方面均优于同期方法，实现最佳平衡。</em></p>",
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
        "<strong>显式点查询建模（EPQM）</strong>：在锚框上下边界均匀采样 <span class=\"kb-math kb-math-inline\">N/2</span> 个点作为显式位置查询，逐解码层动态更新坐标，替代传统 DETR 的粗粒度框级位置查询",
        "<strong>增强因子化自注意力（EFSA）</strong>：在分组自注意力中引入循环卷积，为同一实例内的点查询提供环形形状先验，增强空间归纳偏置",
        "<strong>位置标签形式（Positional Label Form）</strong>：以左上角点为起点按顺时针排列控制点，消除对文本阅读方向的依赖，大幅提升旋转/反转文本的检测鲁棒性",
        "<strong>Inverse-Text 测试集</strong>：建立包含 500 张图像（约 40% 反向文本实例）的测试基准，用于评估检测器在真实场景中的鲁棒性",
        "<strong>SOTA 性能</strong>：Total-Text F=89.0%、CTW1500 F=88.8%、ICDAR19 ArT F=78.1%，且训练收敛速度提升约 6 倍"
      ],
      "detail": "<p><img alt=\"DPText-DETR 整体架构\" src=\"https://raw.githubusercontent.com/ymy-k/DPText-DETR/main/figs/dptext_detr.jpg\" />\n<em>图：DPText-DETR 整体架构。CNN 骨干网络提取多尺度特征后，经 Transformer 编码器增强，解码器中通过 EPQM 生成显式点查询并逐层动态更新，EFSA 提供环形形状引导，最终输出多边形控制点坐标。</em></p>\n<pre><code class=\"language-python\"># DPText-DETR 核心流程伪代码\n# ========== 1. 特征提取 ==========\nmulti_scale_feats = CNN_Backbone(image)          # ResNet-50 提取多尺度特征\nmemory = DeformableEncoder(multi_scale_feats)     # 6 层可变形注意力编码器\n\n# ========== 2. 初始查询生成 (EPQM) ==========\n# 从编码器输出中选取 Top-K 个候选锚框\nanchor_boxes = TopK_Select(memory, K=100)         # [K, 4] (cx, cy, w, h)\n\nfor k in range(K):\n    cx, cy, w, h = anchor_boxes[k]\n    # 在锚框上边界均匀采样 N/2 个点，下边界均匀采样 N/2 个点\n    top_points = [(cx - w/2 + i*w/(N/2-1), cy - h/2) for i in range(N//2)]\n    bot_points = [(cx + w/2 - i*w/(N/2-1), cy + h/2) for i in range(N//2)]\n    point_queries[k] = top_points + bot_points    # [N, 2] 顺时针排列\n\n# 位置查询 = 点坐标的正弦位置编码\npos_queries = SinusoidalPE(point_queries)         # [K, N, d]\n# 内容查询 = 锚框中心点对应的编码器特征\ncontent_queries = memory[anchor_centers]          # [K, d]\n\n# ========== 3. 解码器逐层动态更新 ==========\nfor layer in DecoderLayers:  # 6 层\n    # 3a. 交叉注意力：每个点独立地在多尺度特征图上采样\n    content = DeformableCrossAttn(content_queries, pos_queries, memory)\n\n    # 3b. EFSA：实例内点查询的自注意力 + 循环卷积\n    content = EFSA(content, pos_queries)\n\n    # 3c. 预测偏移量并更新点坐标 (动态更新)\n    delta = MLP(content)                          # [K, N, 2]\n    point_queries = sigmoid(inverse_sigmoid(point_queries) + delta)\n    pos_queries = SinusoidalPE(point_queries)     # 更新位置编码\n\n# ========== 4. 输出 ==========\npolygons = point_queries                          # [K, N, 2] 最终多边形控制点\nscores = ClassificationHead(content)              # [K, 1] 置信度\n</code></pre>\n<p><strong>动机与背景</strong></p>\n<p>现有基于 DETR 的文本检测方法（如 TESTR）存在两个关键问题：</p>\n<ol>\n<li>\n<p><strong>粗粒度位置查询</strong>：传统方法使用锚框（4 维）或锚点（2 维）生成位置查询，但文本检测需要输出 <span class=\"kb-math kb-math-inline\">N</span> 个多边形控制点（<span class=\"kb-math kb-math-inline\">2N</span> 维）。这种维度不匹配导致位置查询无法精确引导每个控制点的注意力区域，训练收敛慢。</p>\n</li>\n<li>\n<p><strong>阅读顺序依赖的标签形式</strong>：以往方法按文本阅读方向（如从左到右）排列控制点标签。当文本旋转或反转时，同一文字的控制点排列顺序会发生剧变，导致模型预测不稳定。</p>\n</li>\n</ol>\n<div class=\"key-point\">💡 关键：DPText-DETR 的核心洞察是——<strong>位置查询的粒度应与输出粒度匹配</strong>。既然输出是 <span class=\"kb-math kb-math-inline\">N</span> 个点，位置查询也应该是 <span class=\"kb-math kb-math-inline\">N</span> 个显式点坐标，而非一个粗粒度的框。</div>\n<p><strong>核心机制一：显式点查询建模（EPQM）</strong></p>\n<p>EPQM 将位置查询从\"框级\"提升到\"点级\"。具体而言：</p>\n<ol>\n<li><strong>初始化</strong>：从编码器选出 Top-K 个候选锚框后，在每个锚框的上下边界各均匀采样 <span class=\"kb-math kb-math-inline\">N/2</span> 个点，按顺时针方向排列为 <span class=\"kb-math kb-math-inline\">N</span> 个初始控制点：</li>\n</ol>\n<div class=\"kb-math kb-math-display\">\\mathbf{p}_i^{(0)} = \\text{SampleOnBorder}(\\text{anchor}_k), \\quad i = 1, \\ldots, N</div>\n<ol>\n<li><strong>动态更新</strong>：每个解码层预测一个偏移量 <span class=\"kb-math kb-math-inline\">\\Delta \\mathbf{p}_i^{(l)}</span>，通过逆 sigmoid 空间的残差连接更新点坐标：</li>\n</ol>\n<div class=\"kb-math kb-math-display\">\\mathbf{p}_i^{(l+1)} = \\sigma\\!\\left(\\sigma^{-1}(\\mathbf{p}_i^{(l)}) + \\Delta \\mathbf{p}_i^{(l)}\\right)</div>\n<ol>\n<li><strong>独立交叉注意力</strong>：每个点作为独立查询参与可变形交叉注意力，直接在其当前坐标附近的特征图区域采样，实现精确的局部特征聚合。</li>\n</ol>\n<div class=\"warn-box\">⚠️ 注意：EPQM 不仅提升了最终性能，更显著加速了训练收敛（约 6 倍），并大幅增强了小样本学习能力——在仅 25% 训练数据时，EPQM 带来 +48.45% 的 F-measure 提升。</div>\n<p><strong>核心机制二：增强因子化自注意力（EFSA）</strong></p>\n<p>标准 Transformer 的全局自注意力缺乏空间归纳偏置，对于多边形控制点这种具有明确环形拓扑结构的输出不够高效。EFSA 的设计思路：</p>\n<ol>\n<li>\n<p><strong>因子化自注意力（FSA）</strong>：将 <span class=\"kb-math kb-math-inline\">K \\times N</span> 个查询分为两组——实例内自注意力（同一文本的 <span class=\"kb-math kb-math-inline\">N</span> 个点之间）和实例间自注意力（不同文本之间），降低计算复杂度。</p>\n</li>\n<li>\n<p><strong>循环卷积增强</strong>：在实例内自注意力中，将 <span class=\"kb-math kb-math-inline\">N</span> 个点视为环形序列，施加 1D 循环卷积（kernel size=3），为相邻控制点注入局部形状约束：</p>\n</li>\n</ol>\n<div class=\"kb-math kb-math-display\">\\text{EFSA}(\\mathbf{Q}) = \\text{SelfAttn}(\\mathbf{Q}) + \\text{CircularConv1D}(\\mathbf{Q})</div>\n<p>循环卷积使首尾点（如第 1 个点和第 <span class=\"kb-math kb-math-inline\">N</span> 个点）也能直接交互，符合多边形闭合的几何先验。</p>\n<div class=\"key-point\">💡 关键：EFSA 中的循环卷积仅适用于多边形控制点版本。对于 Bézier 曲线控制点，由于控制点不一定形成环形且可能相距较远，循环卷积反而不适用。</div>\n<p><strong>核心机制三：位置标签形式（Positional Label Form）</strong></p>\n<p>传统标签按阅读方向排列控制点（如从左到右），当文本旋转 180° 时，起始点会从左上跳到右下，导致标签不连续。位置标签形式的改进：</p>\n<ul>\n<li><strong>规则</strong>：始终以<strong>左上角点</strong>（y 坐标最小的点中 x 最小者）为起点，按<strong>顺时针方向</strong>排列所有控制点</li>\n<li><strong>效果</strong>：无论文本朝向如何，同一文本实例的控制点排列顺序保持一致，消除了阅读方向的歧义</li>\n</ul>\n<p>消融实验验证：位置标签形式在 Rot.Total-Text 上提升 +3.90% F-measure，在 Inverse-Text 上提升 +3.07%，证明其对鲁棒性的显著贡献。</p>\n<p><strong>主要实验结果</strong></p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>基准</th>\n<th>Precision</th>\n<th>Recall</th>\n<th>F-measure</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Total-Text</td>\n<td>91.8</td>\n<td>86.4</td>\n<td><strong>89.0</strong></td>\n</tr>\n<tr>\n<td>CTW1500</td>\n<td>91.7</td>\n<td>86.2</td>\n<td><strong>88.8</strong></td>\n</tr>\n<tr>\n<td>ICDAR19 ArT</td>\n<td>83.0</td>\n<td>73.7</td>\n<td><strong>78.1</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p>DPText-DETR 在三个基准上均取得 SOTA，分别超越此前最优方法 TextBPN++ 达 +0.5%、+3.3%、+2.3%。</p>\n<p><strong>与传统方法的区别</strong></p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th>传统 DETR 文本检测 (如 TESTR)</th>\n<th>DPText-DETR</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>位置查询粒度</td>\n<td>框级 (4D) 或点级 (2D)</td>\n<td>显式 N 点级 (2N D)</td>\n</tr>\n<tr>\n<td>查询更新</td>\n<td>框坐标更新</td>\n<td>逐点坐标动态更新</td>\n</tr>\n<tr>\n<td>自注意力</td>\n<td>全局或简单分组</td>\n<td>EFSA（分组 + 循环卷积）</td>\n</tr>\n<tr>\n<td>标签形式</td>\n<td>阅读顺序依赖</td>\n<td>位置顺序（顺时针，与阅读方向无关）</td>\n</tr>\n<tr>\n<td>训练收敛</td>\n<td>较慢</td>\n<td>约 6 倍加速</td>\n</tr>\n</tbody>\n</table></div>",
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
      "detail": "<h5>整体架构</h5>\n<p><img alt=\"SRFormer 整体架构\" src=\"https://arxiv.org/html/2308.10531v2/x1.png\" />\n<em>图 1：SRFormer 整体架构。Decoder 前几层为 Segmentation &amp; Regression Chunk（同时预测掩码与控制点），后续层为 Regression-only Chunk（仅精炼控制点）。MQE 模块利用掩码预测增强查询特征。</em></p>\n<p>SRFormer 沿用 DETR 的 Encoder-Decoder 范式：\n1. <strong>Backbone + Encoder</strong>：ResNet-50 提取多尺度特征，经 Deformable Transformer Encoder（8 头、4 采样点）更新得到像素级特征图 <span class=\"kb-math kb-math-inline\">\\mathbf{F}</span>。\n2. <strong>Query 初始化</strong>：从 Encoder 输出中选取分类得分 Top-K 的 proposal 作为位置查询（正弦位置编码），配合可学习的内容查询，共 100 个 query。\n3. <strong>Decoder</strong>：总共 6 层，分为两种 Chunk：\n   - <strong>Seg &amp; Reg Chunk</strong>（前 <span class=\"kb-math kb-math-inline\">N</span> 层）：每层同时输出实例掩码、语义掩码和控制点坐标，并通过 MQE 模块将掩码信息反馈到查询嵌入。\n   - <strong>Reg-only Chunk</strong>（后 <span class=\"kb-math kb-math-inline\">6-N</span> 层）：仅进行控制点坐标的逐层精炼，不再预测掩码。</p>\n<div class=\"key-point\">💡 <strong>关键直觉</strong>：分割任务提供像素级密集监督，帮助模型在训练早期快速建立\"哪里有文字\"的全局感知；回归任务则在此基础上逐层精细化多边形边界。两者在 Decoder 中的有机融合，既避免了纯分割方法复杂后处理的问题，又克服了纯回归方法收敛慢、对位置先验敏感的缺陷。</div>\n<h5>掩码预测与锚点生成</h5>\n<p><img alt=\"掩码预测头\" src=\"https://arxiv.org/html/2308.10531v2/x3.png\" />\n<em>图 2：掩码预测头。实例掩码通过 query 嵌入与像素特征的点积生成；语义掩码通过共享 1×1 卷积生成。</em></p>\n<p>在 Seg &amp; Reg Chunk 的每一层中，掩码预测包含两个分支：</p>\n<p><strong>实例掩码（Instance Mask）</strong>：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{M}_{\\text{ins}}^{(i)} = \\sigma\\!\\bigl(\\text{MLP}(\\mathbf{q}_i) \\cdot \\mathbf{F}^T\\bigr) \\in [0,1]^{H \\times W}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\mathbf{q}_i</span> 是第 <span class=\"kb-math kb-math-inline\">i</span> 个 query 的嵌入，<span class=\"kb-math kb-math-inline\">\\mathbf{F}</span> 是像素特征图，<span class=\"kb-math kb-math-inline\">\\sigma</span> 为 Sigmoid。每个 query 生成一张独立的实例掩码，表示该 query 对应文本实例的空间范围。</p>\n<p><strong>语义掩码（Semantic Mask）</strong>：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{M}_{\\text{sem}} = \\sigma\\!\\bigl(\\text{Conv}_{1\\times1}(\\mathbf{F})\\bigr) \\in [0,1]^{H \\times W}</div>\n<p>所有 query 共享同一张语义掩码，提供全局的文本/非文本二值先验。</p>\n<p><strong>锚点生成</strong>：利用实例掩码的概率分布计算加权重心作为锚点：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{a}_i = \\frac{\\sum_{(x,y)} \\mathbf{M}_{\\text{ins}}^{(i)}(x,y) \\cdot (x, y)}{\\sum_{(x,y)} \\mathbf{M}_{\\text{ins}}^{(i)}(x,y)}</div>\n<p>控制点坐标以该锚点为基准进行偏移回归：<span class=\"kb-math kb-math-inline\">\\mathbf{p}_k = \\mathbf{a}_i + \\Delta\\mathbf{p}_k</span>，其中 <span class=\"kb-math kb-math-inline\">\\Delta\\mathbf{p}_k</span> 由 MLP 从 query 嵌入预测。</p>\n<div class=\"key-point\">💡 <strong>为什么用掩码重心做锚点？</strong> 传统 DETR 检测中，参考点来自 Encoder proposal，在训练初期可能偏离真实目标中心。掩码重心直接由像素级预测驱动，即使在训练早期也能提供相对准确的位置先验，加速控制点回归的收敛。</div>\n<h5>Mask-guided Query Enhancement (MQE)</h5>\n<p><img alt=\"MQE 模块\" src=\"https://arxiv.org/html/2308.10531v2/x4.png\" />\n<em>图 3：MQE 模块。利用实例掩码和语义掩码分别对像素特征做加权池化，增强 query 嵌入。</em></p>\n<p>MQE 是 SRFormer 的另一核心创新，其目标是将掩码中蕴含的空间信息反馈到 query 嵌入中，使每个 query 能\"看到\"其对应文本区域的丰富像素特征。</p>\n<p><strong>实例分支</strong>：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{e}_{\\text{ins}}^{(i)} = \\text{Linear}\\!\\left(\\frac{\\sum_{(x,y)} \\mathbf{M}_{\\text{ins}}^{(i)}(x,y) \\cdot \\mathbf{F}(x,y)}{\\sum_{(x,y)} \\mathbf{M}_{\\text{ins}}^{(i)}(x,y) + \\epsilon}\\right)</div>\n<p>以实例掩码为权重对像素特征做加权平均池化，每个 query 获得独立的区域特征。</p>\n<p><strong>语义分支</strong>：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{e}_{\\text{sem}} = \\text{Linear}\\!\\left(\\frac{\\sum_{(x,y)} \\mathbf{M}_{\\text{sem}}(x,y) \\cdot \\mathbf{F}(x,y)}{\\sum_{(x,y)} \\mathbf{M}_{\\text{sem}}(x,y) + \\epsilon}\\right)</div>\n<p>以语义掩码为权重做全局加权池化，所有 query 共享该特征。</p>\n<p><strong>融合</strong>：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{q}_i \\leftarrow \\mathbf{q}_i + \\mathbf{e}_{\\text{ins}}^{(i)} + \\mathbf{e}_{\\text{sem}}</div>\n<div class=\"key-point\">💡 <strong>MQE 的本质</strong>：可以将 MQE 理解为一种<strong>以掩码为注意力权重的交叉注意力</strong>。标准交叉注意力中，注意力权重由 query-key 点积产生；MQE 中，注意力权重直接由掩码预测给出，绕过了点积计算，同时引入了显式的空间归纳偏置。实验表明 MQE 单独带来 +1.2% F1 提升，引入参数不到 3M。</div>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># SRFormer Decoder 前向传播伪代码\ndef decoder_forward(queries, pixel_features, N_seg=3, N_total=6):\n    for layer_idx in range(N_total):\n        # 标准 Deformable Cross-Attention + Self-Attention\n        queries = deformable_cross_attn(queries, pixel_features)\n        queries = self_attn(queries)\n\n        if layer_idx &lt; N_seg:  # Seg &amp; Reg Chunk\n            # 1. 掩码预测\n            inst_mask = sigmoid(mlp(queries) @ pixel_features.T)  # [N_q, H, W]\n            sem_mask  = sigmoid(conv1x1(pixel_features))          # [H, W]\n\n            # 2. MQE: 掩码引导的 query 增强\n            inst_feat = mask_weighted_pool(inst_mask, pixel_features)  # [N_q, C]\n            sem_feat  = mask_weighted_pool(sem_mask, pixel_features)   # [C]\n            queries   = queries + linear(inst_feat) + linear(sem_feat)\n\n            # 3. 锚点生成 + 控制点回归\n            anchor = mask_weighted_centroid(inst_mask)       # [N_q, 2]\n            offsets = mlp_reg(queries)                       # [N_q, 2K]\n            ctrl_pts = anchor.unsqueeze(1) + offsets.view(N_q, K, 2)\n        else:  # Regression-only Chunk\n            # 仅精炼控制点\n            offsets = mlp_reg(queries)\n            ctrl_pts = prev_ctrl_pts + offsets.view(N_q, K, 2)\n\n        # 分类预测\n        cls_score = cls_head(queries)\n\n    return cls_score, ctrl_pts, inst_mask, sem_mask\n</code></pre>\n<h5>损失函数与训练</h5>\n<p><strong>匈牙利匹配</strong>：采用与 DETR 相同的二部图匹配，匹配代价为分类代价、掩码代价和回归代价的加权和：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{C} = \\lambda_{\\text{cls}} \\mathcal{L}_{\\text{cls}} + \\lambda_{\\text{mask}} \\mathcal{L}_{\\text{mask}} + \\lambda_{\\text{reg}} \\mathcal{L}_{\\text{reg}}</div>\n<p><strong>总损失</strong>：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L} = \\lambda_{\\text{cls}} \\mathcal{L}_{\\text{focal}} + \\lambda_{\\text{mask}} (\\mathcal{L}_{\\text{dice}} + \\mathcal{L}_{\\text{bce}}) + \\lambda_{\\text{reg}} \\mathcal{L}_{1}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\lambda_{\\text{cls}}=2</span>，<span class=\"kb-math kb-math-inline\">\\lambda_{\\text{mask}}=\\lambda_{\\text{reg}}=5</span>。掩码损失同时包含 Dice Loss 和 BCE Loss，分别作用于实例掩码和语义掩码。</p>\n<p><strong>训练细节</strong>：\n- Backbone：ResNet-50，Encoder 8 头 4 采样点\n- Query 数量：100，控制点数量 <span class=\"kb-math kb-math-inline\">K=16</span>\n- 预训练：SynthText150K + MLT17 + TotalText，300K 迭代\n- 微调：TotalText 30K 迭代（lr=1e-4→1e-5），CTW1500 30K 迭代（lr=5e-5）\n- 优化器：AdamW（<span class=\"kb-math kb-math-inline\">\\beta_1=0.9, \\beta_2=0.999</span>，weight decay=1e-4）\n- 数据增强：随机裁剪、模糊、亮度调整、颜色变换\n- 多尺度训练：短边 480~896，长边≤1600；推理短边 1000，长边≤1800\n- 硬件：8× NVIDIA 3090</p>\n<h5>与传统方法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th>纯分割方法（DBNet/FCENet）</th>\n<th>纯回归方法（DPText-DETR）</th>\n<th>SRFormer</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>检测范式</td>\n<td>像素级分割 → 后处理提取轮廓</td>\n<td>DETR query 直接回归控制点</td>\n<td>Decoder 内分割+回归联合</td>\n</tr>\n<tr>\n<td>后处理复杂度</td>\n<td>高（阈值化、连通域、多边形拟合）</td>\n<td>低（直接输出多边形）</td>\n<td>低（直接输出多边形）</td>\n</tr>\n<tr>\n<td>训练收敛</td>\n<td>快（密集像素监督）</td>\n<td>慢（稀疏点监督）</td>\n<td>快（掩码提供密集监督）</td>\n</tr>\n<tr>\n<td>位置先验</td>\n<td>隐式（像素分类）</td>\n<td>Encoder proposal</td>\n<td>掩码重心锚点</td>\n</tr>\n<tr>\n<td>低数据场景</td>\n<td>—</td>\n<td>10% 数据 F1=75.6</td>\n<td>10% 数据 F1=76.9</td>\n</tr>\n</tbody>\n</table></div>\n<h5>消融实验关键发现</h5>\n<p><strong>Decoder 层分配</strong>（Table 2，TotalText 无预训练 50K 迭代）：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>Seg 层数</th>\n<th>Reg 层数</th>\n<th>Precision</th>\n<th>Recall</th>\n<th>F1</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>1</td>\n<td>5</td>\n<td>88.6</td>\n<td>84.5</td>\n<td>86.5</td>\n</tr>\n<tr>\n<td>2</td>\n<td>4</td>\n<td>89.0</td>\n<td>85.1</td>\n<td>87.0</td>\n</tr>\n<tr>\n<td><strong>3</strong></td>\n<td><strong>3</strong></td>\n<td><strong>88.0</strong></td>\n<td><strong>86.1</strong></td>\n<td><strong>87.1</strong></td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"warn-box\">⚠️ 注意：增加分割层数提升 Recall 但降低 Precision，因为减少了回归精炼层数。实验发现 Decoder 第一层即可获得较好的分割结果，后续层难以进一步改善掩码质量，因此 3+3 为最优平衡。</div>\n<p><strong>组件消融</strong>（Table 3）：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>AnchorReg</th>\n<th>MQE</th>\n<th>F1</th>\n<th>提升</th>\n<th>额外参数</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>✗</td>\n<td>✗</td>\n<td>85.5</td>\n<td>—</td>\n<td>—</td>\n</tr>\n<tr>\n<td>✓</td>\n<td>✗</td>\n<td>86.0</td>\n<td>+0.5</td>\n<td>0.39M</td>\n</tr>\n<tr>\n<td>✗</td>\n<td>✓</td>\n<td>86.7</td>\n<td>+1.2</td>\n<td>2.95M</td>\n</tr>\n<tr>\n<td>✓</td>\n<td>✓</td>\n<td><strong>87.1</strong></td>\n<td><strong>+1.6</strong></td>\n<td>3.34M</td>\n</tr>\n</tbody>\n</table></div>\n<h5>训练收敛与可视化</h5>\n<p><img alt=\"训练收敛曲线\" src=\"https://arxiv.org/html/2308.10531v2/x5.png\" />\n<em>图 4：SRFormer 与 DPText-DETR 在 TotalText 和 Rot.TotalText 上的收敛曲线。SRFormer 在 5K 迭代后即持续领先，即使 DPText 训练时间翻倍仍不及 SRFormer。</em></p>\n<p><img alt=\"检测可视化\" src=\"https://arxiv.org/html/2308.10531v2/x6.png\" />\n<em>图 5：SRFormer 在各数据集上的检测可视化结果。</em></p>",
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
      "detail": "<pre><code>输入图像 (不规则/弯曲文本)\n    │\n    ▼\n┌───────────────────────────────────────┐\n│         校正网络 (Rectification)        │\n│  [定位CNN] → K=20控制点 → [TPS变换]    │\n│         → 双线性采样 → 校正图像         │\n└───────────────────────────────────────┘\n    │  32×100 规则图像\n    ▼\n┌───────────────────────────────────────┐\n│         识别网络 (Recognition)          │\n│  [ResNet编码器] → [BiLSTM] →           │\n│  [注意力GRU解码器(L→R)] ─┐             │\n│  [注意力GRU解码器(R→L)] ─┤→ 取高置信度  │\n└───────────────────────────────────────┘\n    │\n    ▼\n  预测: &quot;GOOGLE&quot;\n</code></pre>\n<p><em>图：ASTER 整体框架——上半部分为 TPS 校正网络（定位网络→TPS变换→校正图像），下半部分为双向注意力识别网络</em></p>\n<pre><code class=\"language-python\"># ASTER 核心流程伪代码\nclass ASTER:\n    def __init__(self, K=20):\n        self.localization_net = CNN_FC(output=2*K)  # 预测K个控制点坐标\n        self.tps_transform = TPS(K)                  # 薄板样条变换\n        self.encoder = ResNet() + BiLSTM(256)        # 视觉+序列编码\n        self.decoder_fwd = AttentionGRU('L2R')       # 正向解码\n        self.decoder_bwd = AttentionGRU('R2L')       # 反向解码\n\n    def forward(self, img, target=None):\n        # Step 1: 校正\n        ctrl_points = self.localization_net(img)       # [B, K, 2]\n        rectified = self.tps_transform(img, ctrl_points)  # [B, 3, 32, 100]\n\n        # Step 2: 编码\n        features = self.encoder(rectified)             # [B, T, 512]\n\n        # Step 3: 双向解码\n        if training:\n            return CE_loss(decoder_fwd(features, target)) + \\\n                   CE_loss(decoder_bwd(features, reverse(target)))\n        else:\n            pred_fwd, score_fwd = decoder_fwd.decode(features)\n            pred_bwd, score_bwd = decoder_bwd.decode(features)\n            return pred_fwd if score_fwd &gt; score_bwd else reverse(pred_bwd)\n</code></pre>\n<p><strong>动机与背景</strong></p>\n<p>自然场景文本常呈现弯曲、透视变形、旋转等不规则形态。传统识别器（如 CRNN）假设文本水平排列，面对不规则文本性能急剧下降。早期的空间变换网络 (STN) 仅使用仿射变换（6 自由度），无法处理弯曲等非刚性变形。ASTER 的核心思想是：<strong>与其让识别网络直接处理复杂的不规则文本，不如先将其\"摆正\"为规则形态，降低后续识别难度。</strong></p>\n<p><strong>核心机制一：TPS 校正网络</strong></p>\n<p>TPS（Thin-Plate Spline）是一种灵活的非刚性 2D 变换，其数学表达为：</p>\n<div class=\"kb-math kb-math-display\">T(p) = A \\begin{bmatrix} p \\\\ 1 \\end{bmatrix} + \\sum_{k=1}^{K} w_k \\cdot U(\\|p - c_k\\|)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">A \\in \\mathbb{R}^{2 \\times 3}</span> 为仿射部分，<span class=\"kb-math kb-math-inline\">w_k</span> 为控制点权重，<span class=\"kb-math kb-math-inline\">U(r) = r^2 \\log r</span> 为 TPS 径向基函数。20 个控制点（上下各 10 个）提供 40+6 个自由度，远超仿射变换的 6 个自由度，足以拟合弯曲和透视变形。</p>\n<div class=\"key-point\">💡 关键：TPS 等价于在无限薄金属板上施加点力后的变形，天然具有\"最小弯曲能\"性质——在所有满足控制点约束的变换中，TPS 的弯曲能量最小，因此变换结果平滑自然。</div>\n<p>定位网络是一个轻量 CNN（6 层卷积 + 2 层全连接），从输入图像直接回归 K 个控制点的归一化坐标。整个 TPS 变换过程可微分，梯度链为：</p>\n<div class=\"kb-math kb-math-display\">\\frac{\\partial \\mathcal{L}}{\\partial c_k} = \\frac{\\partial \\mathcal{L}}{\\partial I&#x27;} \\cdot \\frac{\\partial I&#x27;}{\\partial G} \\cdot \\frac{\\partial G}{\\partial T} \\cdot \\frac{\\partial T}{\\partial c_k}</div>\n<p>这使得校正网络在<strong>没有任何几何监督</strong>的情况下，仅靠识别损失即可学会正确的校正行为。</p>\n<p><strong>核心机制二：注意力识别网络</strong></p>\n<p>编码器采用修改版 ResNet（在高度方向 stride=2 压缩、宽度方向 stride=1 保留序列长度），将 32×100 的校正图像编码为长度约 25 的特征序列，再经 2 层 BiLSTM 增强上下文建模。</p>\n<p>解码器采用基于 GRU 的注意力机制，第 <span class=\"kb-math kb-math-inline\">t</span> 步：\n1. 状态更新：<span class=\"kb-math kb-math-inline\">s_t = \\text{GRU}(s_{t-1}, [e(y_{t-1}); c_{t-1}])</span>\n2. 注意力计算：<span class=\"kb-math kb-math-inline\">\\alpha_{t,i} = \\text{softmax}(v^T \\tanh(W_s s_t + W_h h_i))</span>\n3. 上下文向量：<span class=\"kb-math kb-math-inline\">c_t = \\sum_i \\alpha_{t,i} \\cdot h_i</span>\n4. 字符预测：<span class=\"kb-math kb-math-inline\">p(y_t) = \\text{softmax}(W_o [s_t; c_t])</span></p>\n<p><strong>核心机制三：双向解码策略</strong></p>\n<p>注意力解码器存在\"注意力漂移\"——某步出错会级联传播。ASTER 同时训练正向（L→R）和反向（R→L）两个解码器，推理时分别生成候选序列，取序列对数概率 <span class=\"kb-math kb-math-inline\">\\log P = \\sum_t \\log p(y_t|y_{&lt;t})</span> 更高者为最终结果。两个解码器共享编码器但各有独立的 GRU 参数。</p>\n<p><strong>与传统方法的区别</strong></p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方面</th>\n<th>CRNN (2015)</th>\n<th>RARE (2016)</th>\n<th>ASTER (2018)</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>校正</td>\n<td>无</td>\n<td>TPS</td>\n<td>TPS</td>\n</tr>\n<tr>\n<td>编码器</td>\n<td>VGG-7层</td>\n<td>VGG</td>\n<td>ResNet (更深更强)</td>\n</tr>\n<tr>\n<td>序列建模</td>\n<td>BiLSTM</td>\n<td>无</td>\n<td>BiLSTM</td>\n</tr>\n<tr>\n<td>解码</td>\n<td>CTC</td>\n<td>单向 Attention</td>\n<td><strong>双向 Attention</strong></td>\n</tr>\n<tr>\n<td>CUTE80</td>\n<td>54.9%</td>\n<td>59.2%</td>\n<td><strong>79.5%</strong></td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"warn-box\">⚠️ 注意：ASTER 可视为 RARE 的全面增强版——相同的 TPS 校正思想，但更强的编码器、更鲁棒的双向解码器，以及端到端联合优化带来了 20+ 百分点的提升。</div>\n<p><strong>消融实验关键结论</strong></p>\n<ul>\n<li>TPS 校正对不规则文本贡献最大（CUTE80: +10.4%）</li>\n<li>注意力解码优于 CTC（+4~6%）</li>\n<li>双向解码额外贡献约 1~3%</li>\n<li>校正网络对已规则文本几乎不做变换（自动退化为近似恒等映射）</li>\n</ul>",
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
      "detail": "<h5>框架总览</h5>\n<p><img alt=\"MORAN 整体架构图\" src=\"https://ar5iv.labs.arxiv.org/html/1901.03003/assets/picture/Moran-overview.jpg\" />\n<em>图：MORAN 整体框架。上半部分为 MORN（多对象校正网络），下半部分为 ASRN（注意力序列识别网络）。输入图像经 MORN 校正后送入 ASRN 进行序列识别。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># MORAN 训练流程伪代码\n# 阶段 1: 单独训练 ASRN\nfor epoch in range(E1):\n    for img, label in dataloader:\n        # 直接用原图训练识别网络\n        pred = ASRN(img)\n        loss = cross_entropy(pred, label)\n        optimizer_asrn.step(loss)\n\n# 阶段 2: 联合训练 MORN + ASRN\nfor epoch in range(E2):\n    for img, label in dataloader:\n        # MORN 预测像素偏移并校正图像\n        offset_x, offset_y = MORN_CNN(img)          # [B, H, W]\n        grid = base_grid + offset                     # 像素级偏移\n        rectified_img = bilinear_sample(img, grid)    # 可微采样\n\n        # ASRN 识别校正后图像\n        features = ASRN_Encoder(rectified_img)        # CNN 特征\n        for t in range(max_len):\n            # Fractional Pickup: 混合相邻注意力权重\n            alpha_t = attention(h_{t-1}, features)     # [B, L]\n            k = argmax(alpha_t)\n            alpha_t[k]   = beta * alpha_t[k] + (1-beta) * alpha_t[k+1]\n            alpha_t[k+1] = (1-beta) * alpha_t[k] + beta * alpha_t[k+1]\n            context = sum(alpha_t * features)\n            h_t, pred_t = GRU_decoder(context, h_{t-1})\n\n        loss = cross_entropy(pred, label)\n        optimizer_all.step(loss)\n</code></pre>\n<h5>动机与背景</h5>\n<p>场景文字识别（Scene Text Recognition, STR）是计算机视觉的核心任务之一，广泛应用于交通标志阅读、商品识别、智能检索等场景。对于<strong>规则文字</strong>（水平排列、无明显形变），基于 CNN+RNN+CTC 或 CNN+Attention 的方法已取得显著成功。然而，现实场景中大量存在<strong>不规则文字</strong>——包括透视变形、弯曲排列、旋转倾斜等，这些形变严重降低了识别精度。</p>\n<p>在 MORAN 之前，处理不规则文字的主流方法包括：\n- <strong>仿射变换</strong>（如 STAR-Net）：受限于旋转、缩放、平移 6 个参数，无法处理非线性形变\n- <strong>TPS 变换</strong>（如 RARE）：通过基准点（fiducial points）拟合薄板样条，但只能捕捉全局形状，无法对每个字符独立校正，且基准点数量限制了处理无限长文字的能力</p>\n<p>MORAN 的核心思想是：<strong>完全摆脱几何变换的参数化约束，直接让网络学习每个像素应该\"看向\"原图的哪个位置</strong>，从而实现真正灵活的多对象校正。</p>\n<h5>MORN：多对象校正网络</h5>\n<p>MORN 的核心是一个全卷积网络，输入图像 <span class=\"kb-math kb-math-inline\">I \\in \\mathbb{R}^{C \\times H \\times W}</span>，输出两个与输入同尺寸的偏移图（offset map）：</p>\n<div class=\"kb-math kb-math-display\">\\Delta x, \\Delta y = f_{\\text{MORN}}(I), \\quad \\Delta x, \\Delta y \\in \\mathbb{R}^{H \\times W}</div>\n<p>对于输出图像中位置 <span class=\"kb-math kb-math-inline\">(i, j)</span> 的像素，其对应的采样坐标为：</p>\n<div class=\"kb-math kb-math-display\">x_s = x_i + \\Delta x_{i,j}, \\quad y_s = y_j + \\Delta y_{i,j}</div>\n<p>然后通过<strong>双线性插值</strong>从原图中采样：</p>\n<div class=\"kb-math kb-math-display\">V_c^{out}(i,j) = \\sum_{n}^{H} \\sum_{m}^{W} V_c^{in}(n,m) \\cdot \\max(0, 1-|x_s - m|) \\cdot \\max(0, 1-|y_s - n|)</div>\n<div class=\"key-point\">💡 <strong>关键</strong>：由于双线性插值对坐标是可微的，梯度可以从 ASRN 的识别损失反向传播到 MORN 的偏移预测，实现端到端训练。这意味着 MORN <strong>不需要任何校正目标图像作为监督</strong>，仅通过识别损失就能学会如何校正。</div>\n<p>MORN 的网络结构采用 U-Net 风格的编码器-解码器架构，包含下采样和上采样路径，确保偏移图具有足够的空间分辨率。为了防止偏移值过大导致采样越界，网络在最后一层使用 <span class=\"kb-math kb-math-inline\">\\tanh</span> 激活函数将偏移限制在 <span class=\"kb-math kb-math-inline\">[-1, 1]</span> 范围内。</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：与 STN（Spatial Transformer Network）的仿射变换不同，MORN 预测的是<strong>逐像素偏移</strong>而非全局变换参数。这使得它可以对图像中不同位置的字符施加不同的校正，真正实现\"多对象\"校正。例如，一个弯曲文字中，左侧字符可能需要向上移动，右侧字符需要向下移动，MORN 可以同时处理这两种情况。</div>\n<h5>ASRN：注意力序列识别网络</h5>\n<p>ASRN 采用经典的 Encoder-Decoder 架构：</p>\n<p><strong>编码器</strong>：一个深度 CNN（基于 ResNet 变体），将校正后的图像编码为特征序列 <span class=\"kb-math kb-math-inline\">\\{h_1, h_2, ..., h_L\\}</span>，其中 <span class=\"kb-math kb-math-inline\">L</span> 为特征图宽度方向的长度。</p>\n<p><strong>解码器</strong>：基于 GRU 的注意力解码器，在每个时间步 <span class=\"kb-math kb-math-inline\">t</span>：</p>\n<ol>\n<li>计算注意力权重：</li>\n</ol>\n<div class=\"kb-math kb-math-display\">e_{t,i} = w^T \\tanh(W_s h_i + W_h s_{t-1})</div>\n<div class=\"kb-math kb-math-display\">\\alpha_{t,i} = \\frac{\\exp(e_{t,i})}{\\sum_{j=1}^{L} \\exp(e_{t,j})}</div>\n<ol>\n<li>加权求和得到上下文向量：</li>\n</ol>\n<div class=\"kb-math kb-math-display\">c_t = \\sum_{i=1}^{L} \\alpha_{t,i} h_i</div>\n<ol>\n<li>GRU 更新隐状态并预测字符：</li>\n</ol>\n<div class=\"kb-math kb-math-display\">s_t = \\text{GRU}(c_t, s_{t-1})</div>\n<div class=\"kb-math kb-math-display\">y_t = \\text{softmax}(W_o s_t)</div>\n<h5>Fractional Pickup（FP）</h5>\n<p>在实际场景中，文字图像常伴有阴影、模糊边界和复杂背景，注意力解码器容易聚焦到错误区域。MORAN 提出 <strong>Fractional Pickup</strong> 方法来缓解这一问题。</p>\n<p>核心思想是在训练时，对注意力权重最大值位置 <span class=\"kb-math kb-math-inline\">k</span> 及其相邻位置 <span class=\"kb-math kb-math-inline\">k+1</span> 进行混合：</p>\n<div class=\"kb-math kb-math-display\">\\alpha&#x27;_{t,k} = \\beta \\cdot \\alpha_{t,k} + (1-\\beta) \\cdot \\alpha_{t,k+1}</div>\n<div class=\"kb-math kb-math-display\">\\alpha&#x27;_{t,k+1} = (1-\\beta) \\cdot \\alpha_{t,k} + \\beta \\cdot \\alpha_{t,k+1}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\beta \\in (0.5, 1)</span> 是混合系数。这迫使解码器在训练时\"看到\"相邻字符的特征，从而：\n- 扩展了注意力的有效感受野\n- 增强了对注意力漂移的鲁棒性\n- 在推理时不使用 FP，注意力自然更加精准</p>\n<div class=\"key-point\">💡 <strong>关键</strong>：FP 仅在训练时使用，推理时关闭。这类似于 Dropout 的思想——训练时引入噪声以增强泛化能力。实验表明 FP 使 IIIT5K 精度从 89.7% 提升至 91.2%，IC03 从 94.5% 提升至 95.0%。</div>\n<h5>课程学习策略</h5>\n<p>直接端到端训练 MORN+ASRN 会导致性能下降（Table 4 中端到端训练仅 89.9% vs MORAN 91.2%），因为 MORN 在训练初期产生的校正图像质量差，会误导 ASRN 的学习。</p>\n<p>MORAN 采用两阶段课程学习：\n1. <strong>第一阶段</strong>：冻结 MORN，仅训练 ASRN，使其具备基本的识别能力\n2. <strong>第二阶段</strong>：联合训练 MORN+ASRN，ASRN 的梯度指导 MORN 学习有效的校正</p>\n<p>这种策略确保了 MORN 在开始学习时，已有一个可靠的识别网络提供有意义的梯度信号。</p>\n<h5>与传统方法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>仿射变换 (STAR-Net)</th>\n<th>TPS (RARE)</th>\n<th>MORAN</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>变换参数</td>\n<td>6 个全局参数</td>\n<td>K 个基准点</td>\n<td>H×W 个像素偏移</td>\n</tr>\n<tr>\n<td>几何约束</td>\n<td>旋转+缩放+平移</td>\n<td>薄板样条</td>\n<td>无约束</td>\n</tr>\n<tr>\n<td>字符级校正</td>\n<td>❌</td>\n<td>❌</td>\n<td>✅</td>\n</tr>\n<tr>\n<td>无限长文字</td>\n<td>✅</td>\n<td>❌（受基准点数限制）</td>\n<td>✅</td>\n</tr>\n<tr>\n<td>弱监督</td>\n<td>✅</td>\n<td>✅</td>\n<td>✅</td>\n</tr>\n</tbody>\n</table></div>\n<p>在 IIIT5K 无词典设置下，MORAN（91.2%）显著优于 STAR-Net（83.3%）和 RARE（81.9%）。在不规则文字数据集 CUTE80 上，MORAN（77.4%）比 RARE（59.2%）高出 18.2 个百分点。</p>",
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
        "<strong>解码器 — Transformer Decoder</strong>：采用 <span class=\"kb-math kb-math-inline\">N=3</span> 层标准 Transformer 解码器，同时学习 self-attention（target-target）和 cross-attention（input-output），增强对空间畸变的鲁棒性",
        "<strong>Memory-Cache 推理机制</strong>：受 XLNet 启发，缓存解码过程中 Masked MHA 的 K/V 中间结果，避免重复计算，加速自回归推理",
        "<strong>骨干网络 — ResNet31</strong>：使用非对称池化（<span class=\"kb-math kb-math-inline\">2 \\times 1</span> max-pooling）保留水平方向信息，输入 <span class=\"kb-math kb-math-inline\">48 \\times 160</span> 输出 <span class=\"kb-math kb-math-inline\">6 \\times 40 \\times 512</span>",
        "<strong>训练仅用合成数据</strong>：Synth90K (9M) + SynthText (7M) + SynthAdd (1.6M)，无需真实数据微调即在 8 个标准基准上取得 SOTA"
      ],
      "detail": "<h5>整体架构</h5>\n<p><img alt=\"MASTER 模型架构图\" src=\"https://ar5iv.labs.arxiv.org/html/1910.02562/assets/x2.png\" />\n<em>图：MASTER 整体架构。左侧为 Multi-Aspect GCAttention 编码器（ResNet31 + MAGC），右侧为 Transformer 解码器（Masked MHA + Cross MHA + FFN）。</em></p>\n<p>MASTER 由两个核心模块组成：</p>\n<ol>\n<li><strong>Multi-Aspect GCAttention (MAGC) 编码器</strong>：基于 ResNet31 的 CNN 骨干网络，在每个残差阶段后插入 MAGC 模块，用全局上下文注意力增强特征表示</li>\n<li><strong>Transformer 解码器</strong>：标准的自回归 Transformer 解码器，将编码器输出的 2D 特征图展平为序列后进行 cross-attention 解码</li>\n</ol>\n<h5>注意力漂移问题</h5>\n<p><img alt=\"注意力漂移示意图\" src=\"https://ar5iv.labs.arxiv.org/html/1910.02562/assets/x1.png\" />\n<em>图：注意力漂移现象。由于 RNN 编码的相邻位置特征高度相似，注意力权重容易在相邻字符间漂移，导致重复识别（如 \"TIMMMS\"）或漏字（如 \"FOOTBAL\"）。</em></p>\n<p>传统方法（如 SAR）使用 BiLSTM 编码 CNN 特征后再用 attention 解码，但 BiLSTM 输出的相邻位置特征差异很小，使得 attention 机制难以精确区分相邻字符位置。MASTER 通过两方面解决此问题：</p>\n<ol>\n<li><strong>编码端</strong>：MAGC 模块引入全局上下文信息，使每个位置的特征不仅包含局部信息，还融合了全图的语义，从而增大相邻位置特征的区分度</li>\n<li><strong>解码端</strong>：Transformer 的 self-attention 直接建模已解码字符之间的依赖关系（target-target relationship），而非像 RNN 那样仅依赖隐状态传递</li>\n</ol>\n<h5>Multi-Aspect GCAttention (MAGC) 模块</h5>\n<p>MAGC 是对 GCNet 中 Global Context (GC) Block 的多头扩展。单个 GC Block 的计算过程为：</p>\n<div class=\"kb-math kb-math-display\">\\text{gc}(x) = \\sum_{j=1}^{N_p} \\alpha_j \\cdot x_j, \\quad \\alpha_j = \\frac{e^{W_k x_j}}{\\sum_{m=1}^{N_p} e^{W_k x_m}}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">N_p = H \\times W</span> 为特征图的空间位置数。GC Block 通过全局注意力池化将整个特征图压缩为一个全局上下文向量，再经过瓶颈变换（bottleneck transform）广播回每个位置：</p>\n<div class=\"kb-math kb-math-display\">y = x + \\delta(\\text{GC}(x))</div>\n<div class=\"kb-math kb-math-display\">\\delta(\\cdot) = W_{v2} \\cdot \\text{ReLU}(\\text{LN}(W_{v1} \\cdot (\\cdot)))</div>\n<div class=\"key-point\">💡 <strong>关键创新</strong>：MAGC 将单一注意力头扩展为 <span class=\"kb-math kb-math-inline\">h</span> 个头，每个头在 <span class=\"kb-math kb-math-inline\">d_h = d_{\\text{model}} / h</span> 维子空间中独立计算全局上下文，最后拼接：</div>\n<div class=\"kb-math kb-math-display\">\\text{MAGC}(x) = \\text{Concat}(\\text{gc}_1, \\text{gc}_2, \\ldots, \\text{gc}_h)</div>\n<p>每个头使用缩放因子 <span class=\"kb-math kb-math-inline\">\\sqrt{d_h}</span> 防止点积过大：</p>\n<div class=\"kb-math kb-math-display\">\\alpha_j^{(i)} = \\frac{\\exp(W_k^{(i)} x_j / \\sqrt{d_h})}{\\sum_{m} \\exp(W_k^{(i)} x_m / \\sqrt{d_h})}</div>\n<p>多头机制使模型能从<strong>多个语义视角 (multi-aspect)</strong> 捕获全局上下文，不同头关注不同的语义模式。实验表明 <span class=\"kb-math kb-math-inline\">h=8</span> 为最优设置。</p>\n<h5>编码器网络结构</h5>\n<p>编码器基于 ResNet31，包含 4 个基本阶段（conv2_x 到 conv5_x），每个阶段的结构为：</p>\n<pre><code>残差块 (Residual Block) → MAGC 模块 → 卷积块 (Conv Block) → 最大池化 (Max Pooling)\n</code></pre>\n<p>关键设计：\n- <strong>非对称池化</strong>：前两个阶段使用 <span class=\"kb-math kb-math-inline\">2 \\times 2</span> 池化，后两个阶段使用 <span class=\"kb-math kb-math-inline\">2 \\times 1</span> 池化（仅在垂直方向下采样），保留水平方向的空间分辨率，这对于文字识别中区分窄字符至关重要\n- <strong>输入输出</strong>：灰度图像 <span class=\"kb-math kb-math-inline\">48 \\times 160 \\times 1</span> → 特征图 <span class=\"kb-math kb-math-inline\">6 \\times 40 \\times 512</span>，展平后得到 240 个 512 维特征向量</p>\n<h5>Transformer 解码器</h5>\n<p>解码器包含 <span class=\"kb-math kb-math-inline\">N=3</span> 个相同的 Transformer 解码块，每块包含三个子模块：</p>\n<ol>\n<li><strong>Masked Multi-Head Attention (Masked MHA)</strong>：对已解码的目标序列做自注意力，使用下三角掩码防止信息泄露</li>\n<li><strong>Multi-Head Attention (Cross MHA)</strong>：Query 来自上一层输出，Key/Value 来自编码器输出，实现 input-output attention</li>\n<li><strong>Feed-Forward Network (FFN)</strong>：两层全连接 + ReLU 激活</li>\n</ol>\n<p>多头注意力的计算：</p>\n<div class=\"kb-math kb-math-display\">\\text{MultiHead}(Q, K, V) = \\text{Concat}(\\text{head}_1, \\ldots, \\text{head}_h) W^O</div>\n<div class=\"kb-math kb-math-display\">\\text{head}_i = \\text{Attention}(Q W_i^Q, K W_i^K, V W_i^V)</div>\n<div class=\"kb-math kb-math-display\">\\text{Attention}(Q, K, V) = \\text{softmax}\\left(\\frac{QK^T}{\\sqrt{d_k}}\\right) V</div>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：编码器输出的 K/V 在所有解码步骤中保持不变，因此可以预计算并缓存。</div>\n<h5>Memory-Cache 推理机制</h5>\n<pre><code class=\"language-python\"># Memory-Cache 推理伪代码\n# 预计算编码器输出的 K/V 投影（每个 decoder block b）\nfor b in range(B):\n    X_k[b] = W_k[b] * encoder_output  # 缓存，不再重复计算\n    X_v[b] = W_v[b] * encoder_output\n\nkeys_memory = [[] for _ in range(B)]    # 缓存 Masked MHA 的 Key\nvalues_memory = [[] for _ in range(B)]  # 缓存 Masked MHA 的 Value\n\nt = 0\nq = embedding(SOS) + positional_encoding(0)\n\nwhile q != EOS and t &lt; T:\n    for b in range(B):\n        # 缓存当前步的 K/V 投影（仅 1 个向量，非整个序列）\n        keys_memory[b].append(M_k[b] * q)\n        values_memory[b].append(M_v[b] * q)\n        # Masked MHA：用缓存的历史 K/V，无需重新计算前 t-1 步\n        q = MaskedMHA(M_q[b] * q, keys_memory[b], values_memory[b])\n        # Cross MHA：使用预计算的编码器 K/V\n        q = CrossMHA(W_q[b] * q, X_k[b], X_v[b])\n        q = FeedForward(q)\n    p_t = argmax(softmax(linear(q)))\n    t += 1\n</code></pre>\n<div class=\"key-point\">💡 <strong>关键优化</strong>：传统 Transformer 推理中，每个解码步需要将所有已解码 token 重新输入 Masked MHA 计算，复杂度为 <span class=\"kb-math kb-math-inline\">O(t^2)</span>。Memory-Cache 机制将前序步骤的 K/V 缓存起来，每步仅需处理当前 1 个 token 的 query，复杂度降为 <span class=\"kb-math kb-math-inline\">O(t)</span>。</div>\n<h5>训练与推理细节</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>配置项</th>\n<th>值</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>训练数据</td>\n<td>Synth90K (9M) + SynthText (7M) + SynthAdd (1.6M)</td>\n</tr>\n<tr>\n<td>输入尺寸</td>\n<td><span class=\"kb-math kb-math-inline\">48 \\times 160 \\times 1</span>（灰度）</td>\n</tr>\n<tr>\n<td>优化器</td>\n<td>Adam, lr = <span class=\"kb-math kb-math-inline\">4 \\times 10^{-4}</span></td>\n</tr>\n<tr>\n<td>Batch Size</td>\n<td><span class=\"kb-math kb-math-inline\">128 \\times 4</span> (4 GPU)</td>\n</tr>\n<tr>\n<td>训练轮数</td>\n<td>12 epochs, 每轮约 3 小时</td>\n</tr>\n<tr>\n<td>符号类别</td>\n<td>66 类（10 数字 + 52 大小写字母 + SOS/EOS/PAD/UNK）</td>\n</tr>\n<tr>\n<td>解码最大长度</td>\n<td>T（论文未明确，通常为 25）</td>\n</tr>\n<tr>\n<td>硬件</td>\n<td>4 × NVIDIA Tesla V100 (16GB)</td>\n</tr>\n<tr>\n<td>推理技巧</td>\n<td>对高&gt;宽的图像做 ±90° 旋转，取最大概率输出；不使用 beam search 和 lexicon</td>\n</tr>\n</tbody>\n</table></div>\n<h5>实验结果</h5>\n<p>在 7 个标准基准上的识别准确率（%），无 lexicon：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>IIIT5K</th>\n<th>SVT</th>\n<th>IC03</th>\n<th>IC13</th>\n<th>IC15</th>\n<th>SVTP</th>\n<th>CUTE</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>CRNN</td>\n<td>78.2</td>\n<td>80.8</td>\n<td>89.4</td>\n<td>86.7</td>\n<td>—</td>\n<td>—</td>\n<td>—</td>\n</tr>\n<tr>\n<td>ASTER</td>\n<td>93.4</td>\n<td>89.5</td>\n<td>94.5</td>\n<td>91.8</td>\n<td>76.1</td>\n<td>78.5</td>\n<td>79.5</td>\n</tr>\n<tr>\n<td>SAR</td>\n<td>91.5</td>\n<td>84.5</td>\n<td>—</td>\n<td>91.0</td>\n<td>69.2</td>\n<td>76.4</td>\n<td>83.3</td>\n</tr>\n<tr>\n<td>NRTR</td>\n<td>86.5</td>\n<td>88.3</td>\n<td>95.4</td>\n<td>94.7</td>\n<td>—</td>\n<td>—</td>\n<td>—</td>\n</tr>\n<tr>\n<td>MORAN</td>\n<td>91.2</td>\n<td>88.3</td>\n<td>95.0</td>\n<td>92.4</td>\n<td>68.8</td>\n<td>76.1</td>\n<td>77.4</td>\n</tr>\n<tr>\n<td><strong>MASTER</strong></td>\n<td><strong>95.0</strong></td>\n<td><strong>90.6</strong></td>\n<td><strong>96.4</strong></td>\n<td><strong>95.3</strong></td>\n<td><strong>79.4</strong></td>\n<td><strong>84.5</strong></td>\n<td><strong>87.5</strong></td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 <strong>关键发现</strong>：MASTER 在不规则文本数据集（IC15、SVTP、CUTE）上提升尤为显著，相比 SAR 在 IIIT5K 上提升 3.5%，SVT 上提升 6.1%，验证了多视角注意力机制对空间畸变的鲁棒性。</div>\n<h5>消融实验</h5>\n<p><strong>MAGC 头数 <span class=\"kb-math kb-math-inline\">h</span> 的影响</strong>（固定 <span class=\"kb-math kb-math-inline\">N=3</span>）：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th><span class=\"kb-math kb-math-inline\">h</span></th>\n<th>IIIT5K</th>\n<th>SVTP</th>\n<th>CUTE</th>\n<th>IC15</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>0（无 MAGC）</td>\n<td>94.6</td>\n<td>82.3</td>\n<td>86.2</td>\n<td>78.4</td>\n</tr>\n<tr>\n<td>1</td>\n<td>94.9</td>\n<td>83.8</td>\n<td>87.6</td>\n<td>79.4</td>\n</tr>\n<tr>\n<td>8（标准）</td>\n<td><strong>95.0</strong></td>\n<td><strong>84.5</strong></td>\n<td><strong>87.5</strong></td>\n<td><strong>79.4</strong></td>\n</tr>\n<tr>\n<td>16</td>\n<td>95.1</td>\n<td>84.1</td>\n<td>85.4</td>\n<td>79.4</td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>解码器层数 <span class=\"kb-math kb-math-inline\">N</span> 的影响</strong>（固定 <span class=\"kb-math kb-math-inline\">h=8</span>）：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th><span class=\"kb-math kb-math-inline\">N</span></th>\n<th>IIIT5K</th>\n<th>SVTP</th>\n<th>CUTE</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>1</td>\n<td>94.3</td>\n<td>83.1</td>\n<td>85.4</td>\n</tr>\n<tr>\n<td>3（标准）</td>\n<td><strong>95.0</strong></td>\n<td><strong>84.5</strong></td>\n<td><strong>87.5</strong></td>\n</tr>\n<tr>\n<td>6</td>\n<td>91.3</td>\n<td>75.7</td>\n<td>76.7</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：<span class=\"kb-math kb-math-inline\">N=6</span> 时性能急剧下降，说明过深的解码器在合成数据训练下容易过拟合。<span class=\"kb-math kb-math-inline\">h=0</span> 到 <span class=\"kb-math kb-math-inline\">h \\geq 1</span> 的提升在不规则文本数据集上最为明显，证实 MAGC 对处理弯曲/畸变文本的有效性。</div>",
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
      "detail": "<p><img alt=\"ABINet 整体架构图\" src=\"https://ar5iv.labs.arxiv.org/html/2103.06495/assets/x2.png\" />\n<em>图：ABINet 整体架构示意图。视觉模型（VM）、语言模型（LM/BCN）和融合模块（Fusion）协同工作，支持迭代纠正。</em></p>\n<p><img alt=\"自治语言模型对比\" src=\"https://ar5iv.labs.arxiv.org/html/2103.06495/assets/x1.png\" />\n<em>图：(a) 传统耦合式语言模型 vs (b) ABINet 的自治式语言模型，梯度流在输入处被阻断。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># ABINet 迭代推理流程\ndef abinet_inference(image, M=3):\n    # 1. 视觉模型：提取视觉特征并生成初始字符概率\n    F_b = Transformer(ResNet(image))          # 骨干特征 [H/4, W/4, C]\n    F_v = PositionAttention(Q=pos_enc, K=F_b, V=F_b)  # 视觉特征 [T, C]\n    P_v = Linear(F_v)                          # 视觉预测 [T, c]\n\n    y = P_v  # 初始输入为视觉预测概率\n    for i in range(M):  # 迭代纠正\n        # 2. 语言模型（BCN）：双向完形填空\n        y_detached = stop_gradient(y)          # 阻断梯度（自治）\n        F_l = BCN(y_detached)                  # 语言特征 [T, C]\n\n        # 3. 门控融合\n        G = sigmoid(concat(F_v, F_l) @ W_f)   # 门控权重 [T, C]\n        F_f = G * F_v + (1 - G) * F_l         # 融合特征\n        y = Linear(F_f)                        # 更新预测概率\n\n    return y  # 最终识别结果\n</code></pre>\n<h5>动机与背景</h5>\n<p>场景文字识别（STR）中，语言知识对于处理模糊、遮挡等低质量图像至关重要。然而，现有方法存在三个根本性限制：</p>\n<ol>\n<li><strong>隐式语言建模</strong>：传统注意力解码器（如 RNN/Transformer decoder）将语言建模隐含在序列解码中，模型实际学到的语言知识不可控且有限。</li>\n<li><strong>单向特征表示</strong>：大多数方法采用从左到右的自回归解码，或简单集成两个单向模型。从信息论角度，单向表示平均只能利用 <span class=\"kb-math kb-math-inline\">\\frac{1}{2}H_{\\bm{y}}</span> 的上下文信息。</li>\n<li><strong>噪声输入问题</strong>：并行 Transformer 的输入来自视觉预测的近似值，错误预测会作为噪声传播到语言模型，降低纠正能力。</li>\n</ol>\n<div class=\"key-point\">💡 关键洞察：人类阅读是自治的（视觉与语言独立学习）、双向的（利用前后文推理）、迭代的（反复确认修正），ABINet 的设计正是模拟这三个特性。</div>\n<h5>核心机制详解</h5>\n<p><strong>1. 自治策略（Autonomous）</strong></p>\n<p>ABINet 的核心设计哲学是将语言模型视为一个独立的\"拼写纠正器\"。具体实现：</p>\n<ul>\n<li>语言模型的输入是字符概率向量（而非隐层特征），使其可解释且可替换</li>\n<li>在输入处阻断梯度回传（Block Gradient Flow, BGF），确保 LM 不依赖视觉信号学习</li>\n<li>LM 可以在纯文本数据上独立预训练，直接复用 NLP 社区的进展</li>\n</ul>\n<p>这使得视觉模型和语言模型各自专注于自己的任务：VM 负责\"看\"，LM 负责\"读\"。</p>\n<p><strong>2. 双向完形填空网络（BCN）</strong></p>\n<p>BCN 是一个 <span class=\"kb-math kb-math-inline\">L</span> 层 Transformer decoder 变体，其核心创新在于注意力掩码设计：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{M}_{ij} = \\begin{cases} 0, &amp; i \\neq j \\\\ -\\infty, &amp; i = j \\end{cases}</div>\n<p>这意味着每个位置可以看到<strong>所有其他位置</strong>的信息，但<strong>看不到自身</strong>——这正是完形填空（cloze）的思想。与 BERT 的 MLM 不同，BCN 无需逐个 mask 再分别推理，而是通过注意力掩码一次并行完成所有位置的双向预测。</p>\n<p><img alt=\"BCN 架构\" src=\"https://ar5iv.labs.arxiv.org/html/2103.06495/assets/x4.png\" />\n<em>图：BCN 语言模型架构。字符概率向量通过线性映射后作为 K/V，位置编码作为 Q，注意力掩码阻止自身信息泄露。</em></p>\n<p>注意力计算：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{F}_{mha} = \\text{softmax}\\left(\\frac{\\mathbf{Q}\\mathbf{K}^{\\mathsf{T}}}{\\sqrt{C}} + \\mathbf{M}\\right)\\mathbf{V}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\mathbf{K}_i = \\mathbf{V}_i = P(y_i)\\mathbf{W}_l</span>，即每个位置的 Key/Value 来自该位置的字符概率分布经线性变换。</p>\n<div class=\"warn-box\">⚠️ 注意：BCN 中<strong>没有自注意力</strong>（self-attention），避免了跨时间步的信息泄露。Q 在第一层为位置编码，后续层为上一层输出。</div>\n<p><strong>3. 迭代纠正（Iterative Correction）</strong></p>\n<p>语言模型被执行 <span class=\"kb-math kb-math-inline\">M</span> 次（实验中 <span class=\"kb-math kb-math-inline\">M=3</span>）：\n- 第 1 次迭代：输入为视觉模型的预测概率 <span class=\"kb-math kb-math-inline\">\\bm{y}_{i=1} = P_v</span>\n- 第 <span class=\"kb-math kb-math-inline\">i \\geq 2</span> 次迭代：输入为上一轮融合模型的输出概率</p>\n<p>这种设计的优势：\n- 每轮纠正后的预测更准确，下一轮 LM 获得更干净的输入\n- 逐步修正文本长度预测（缓解 padding mask 导致的长度不对齐问题）\n- 实验表明 3 次迭代即可收敛，额外迭代收益递减</p>\n<p><strong>4. 门控融合</strong></p>\n<p>视觉特征和语言特征来自不同模态，通过门控机制进行自适应融合：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{G} = \\sigma([\\mathbf{F}_v, \\mathbf{F}_l]\\mathbf{W}_f)</div>\n<div class=\"kb-math kb-math-display\">\\mathbf{F}_f = \\mathbf{G} \\odot \\mathbf{F}_v + (1 - \\mathbf{G}) \\odot \\mathbf{F}_l</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\mathbf{W}_f \\in \\mathbb{R}^{2C \\times C}</span>，<span class=\"kb-math kb-math-inline\">\\sigma</span> 为 sigmoid 函数。门控值自适应决定每个特征维度上视觉与语言的贡献比例。</p>\n<h5>训练策略</h5>\n<p><strong>监督训练</strong>采用多任务损失：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L} = \\lambda_v \\mathcal{L}_v + \\frac{\\lambda_l}{M}\\sum_{i=1}^{M}\\mathcal{L}_l^i + \\frac{1}{M}\\sum_{i=1}^{M}\\mathcal{L}_f^i</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\mathcal{L}_v</span>、<span class=\"kb-math kb-math-inline\">\\mathcal{L}_l</span>、<span class=\"kb-math kb-math-inline\">\\mathcal{L}_f</span> 分别是视觉、语言、融合分支的交叉熵损失。对每次迭代的语言和融合损失取平均。</p>\n<p><strong>半监督自训练</strong>利用迭代预测的集成进行伪标签过滤：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{C} = \\min_{1 \\leq t \\leq T} e^{\\mathbb{E}[\\log P(y_t)]}, \\quad P(y_t) = \\max_{1 \\leq m \\leq M} P_m(y_t)</div>\n<p>只有当文本实例的最小字符置信度 <span class=\"kb-math kb-math-inline\">\\mathcal{C}</span> 超过阈值 <span class=\"kb-math kb-math-inline\">Q</span> 时，才将其作为伪标签加入训练。</p>\n<h5>与传统方法的区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>传统隐式 LM（如 SRN）</th>\n<th>ABINet</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>语言建模方式</td>\n<td>隐式（嵌入解码器中）</td>\n<td>显式（独立模块）</td>\n</tr>\n<tr>\n<td>梯度流</td>\n<td>视觉→语言贯通</td>\n<td>阻断（BGF）</td>\n</tr>\n<tr>\n<td>方向性</td>\n<td>单向或双单向集成</td>\n<td>真正双向（BCN）</td>\n</tr>\n<tr>\n<td>噪声处理</td>\n<td>单次预测</td>\n<td>迭代纠正</td>\n</tr>\n<tr>\n<td>可预训练性</td>\n<td>不支持独立预训练</td>\n<td>支持纯文本预训练</td>\n</tr>\n<tr>\n<td>可替换性</td>\n<td>LM 与 VM 耦合</td>\n<td>LM 可独立替换升级</td>\n</tr>\n</tbody>\n</table></div>",
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
      "detail": "<p><img alt=\"PARSeq 模型架构\" src=\"https://arxiv.org/html/2207.06966v2/extracted/figures/parseq_arch.png\" />\n<em>图：PARSeq 整体架构。ViT 编码器提取图像特征，单层 Transformer 解码器通过 attention mask 统一 AR/NAR/Cloze 解码。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># PARSeq 训练伪代码\ndef train_step(image, label):\n    # 1. 编码图像\n    z = ViT_Encoder(image)  # [batch, num_patches, d_model]\n\n    # 2. 采样 K 个排列（K/2 对）\n    perms = sample_permutation_pairs(K, T=len(label))\n    # 前 K/2: [LTR] + (K/2-1) 随机排列\n    # 后 K/2: 前 K/2 的翻转版本\n\n    # 3. 对每个排列生成 attention mask 并解码\n    total_loss = 0\n    for perm in perms:\n        mask = generate_attention_mask(perm)  # 根据排列顺序生成因果 mask\n        y_pred = Decoder(z, pos_tokens, context_tokens, mask)\n        total_loss += cross_entropy(y_pred, label)\n\n    return total_loss / K\n\n# PARSeq 推理伪代码（迭代精炼）\ndef inference(image, max_iters=2):\n    z = ViT_Encoder(image)\n\n    # 第 1 轮：NAR 解码（context 仅含 [B]）\n    context = [BOS]\n    mask = nar_mask()  # 全 1 mask，无因果约束\n    prediction = Decoder(z, pos_tokens, context, mask)\n\n    # 第 2+ 轮：Cloze 精炼（用上轮预测作为双向 context）\n    for i in range(max_iters - 1):\n        context = prediction  # 上轮输出作为新 context\n        mask = cloze_mask()   # 双向 mask（每个位置可见所有其他位置）\n        prediction = Decoder(z, pos_tokens, context, mask)\n\n    return prediction\n</code></pre>\n<h5>动机与背景</h5>\n<p>传统场景文字识别（STR）中的上下文感知方法面临两大困境：</p>\n<ol>\n<li><strong>AR 模型的单向性限制</strong>：标准自回归模型仅能学习单方向（通常是从左到右）的 token 依赖关系，导致模型对阅读方向产生偏见，在反向文本或旋转文本上表现不佳。</li>\n<li><strong>两阶段方法的低效性</strong>：如 ABINet 采用独立的视觉模型 + 外部语言模型 + 融合层的三段式结构。外部 LM 与图像条件独立，可能错误地\"纠正\"已经正确的预测（ABINet LM 单独使用时仅 41.9% 词准确率），且参数利用率极低。</li>\n</ol>\n<div class=\"key-point\">💡 关键洞察：不同的解码策略（AR、NAR、Cloze）本质上只是序列似然函数的不同因式分解顺序，可以通过 attention mask 在同一模型中统一实现。</div>\n<h5>核心机制：排列语言建模（PLM）</h5>\n<p>PLM 的核心思想是对序列似然函数的所有可能因式分解进行训练：</p>\n<div class=\"kb-math kb-math-display\">\\log p(\\mathbf{y}|\\mathbf{x}) = \\mathbb{E}_{\\mathbf{z}\\sim\\mathcal{Z}_T}\\left[\\sum_{t=1}^{T}\\log p_\\theta(y_{z_t}|\\mathbf{y}_{\\mathbf{z}_{&lt;t}},\\mathbf{x})\\right]</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\mathcal{Z}_T</span> 是长度为 <span class=\"kb-math kb-math-inline\">T</span> 的所有排列集合，<span class=\"kb-math kb-math-inline\">z_t</span> 是排列 <span class=\"kb-math kb-math-inline\">\\mathbf{z}</span> 的第 <span class=\"kb-math kb-math-inline\">t</span> 个元素。</p>\n<p><strong>关键设计</strong>：PLM 不需要实际打乱输入序列，而是通过构造不同的 attention mask 来强制执行排列指定的因果顺序。例如对于排列 <span class=\"kb-math kb-math-inline\">[3,1,2]</span>，位置 3 无需任何上下文，位置 1 可以看到位置 3 的 token，位置 2 可以看到位置 3 和位置 1 的 token。</p>\n<p><strong>排列采样策略</strong>：由于 <span class=\"kb-math kb-math-inline\">T!</span> 增长过快，实际训练中只使用 <span class=\"kb-math kb-math-inline\">K</span> 个排列。采样方式为 <span class=\"kb-math kb-math-inline\">K/2</span> 对：\n- 前半部分：1 个 LTR 排列 + <span class=\"kb-math kb-math-inline\">K/2-1</span> 个随机排列\n- 后半部分：前半部分每个排列的翻转版本</p>\n<p>训练损失为所有排列的平均交叉熵：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L} = \\frac{1}{K}\\sum_{k=1}^{K}\\mathcal{L}_{ce}(\\mathbf{y}_k, \\hat{\\mathbf{y}})</div>\n<h5>解码器架构细节</h5>\n<p>解码器接收三类输入：\n1. <strong>图像特征</strong> <span class=\"kb-math kb-math-inline\">\\mathbf{z} \\in \\mathbb{R}^{n \\times d_{model}}</span>：来自 ViT 编码器\n2. <strong>Position tokens</strong> <span class=\"kb-math kb-math-inline\">\\mathbf{p} \\in \\mathbb{R}^{(T+1) \\times d_{model}}</span>：可学习的位置嵌入，指定输出位置\n3. <strong>Context tokens</strong> <span class=\"kb-math kb-math-inline\">\\mathbf{c} \\in \\mathbb{R}^{(T+1) \\times d_{model}}</span>：已知字符的嵌入（训练时为 ground truth，推理时为上轮预测）</p>\n<p>解码器的计算流程：\n1. Self-attention（带 attention mask <span class=\"kb-math kb-math-inline\">\\mathbf{m}</span>）处理 context tokens\n2. Cross-attention 融合图像特征\n3. 残差 MLP 输出：<span class=\"kb-math kb-math-inline\">\\mathbf{h}_{dec} = \\mathbf{h}_i + \\text{MLP}(\\mathbf{h}_i)</span>\n4. 线性层映射到字符集：<span class=\"kb-math kb-math-inline\">\\mathbf{y} = \\text{Linear}(\\mathbf{h}_{dec}) \\in \\mathbb{R}^{(T+1)\\times(S+1)}</span></p>\n<div class=\"warn-box\">⚠️ 注意：Position tokens 和 context tokens 的解耦是 PARSeq 的关键设计。Position tokens 始终指定\"要预测哪些位置\"，而 context tokens 通过 attention mask 控制\"可以利用哪些已知信息\"，这使得同一解码器能灵活切换解码模式。</div>\n<h5>统一的解码方案</h5>\n<p>通过不同的 attention mask，同一模型支持三种解码：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>解码方式</th>\n<th>Context 输入</th>\n<th>Attention Mask</th>\n<th>特点</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>NAR（并行）</td>\n<td>仅 [B] token</td>\n<td>全 1（无因果约束）</td>\n<td>最快，一次前向传播</td>\n</tr>\n<tr>\n<td>AR（自回归）</td>\n<td>[B] + 逐步生成的 token</td>\n<td>下三角因果 mask</td>\n<td>最精确的单次解码</td>\n</tr>\n<tr>\n<td>Cloze（精炼）</td>\n<td>上轮完整预测</td>\n<td>双向 mask（排除自身）</td>\n<td>利用双向上下文修正</td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>迭代精炼流程</strong>：第一轮用 NAR 获得初始预测，后续轮次用 Cloze mask 将整个预测作为双向上下文反馈，逐步修正低置信度的 token。这等价于 ABINet 中外部 LM 的功能，但 PARSeq 的 LM 是<strong>内部的</strong>（条件依赖于图像特征），因此不会出现与图像矛盾的错误纠正。</p>\n<h5>与传统方法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>语言模型类型</th>\n<th>解码方式</th>\n<th>参数量</th>\n<th>缺陷</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>CRNN/CTC</td>\n<td>无</td>\n<td>并行</td>\n<td>少</td>\n<td>无上下文</td>\n</tr>\n<tr>\n<td>ASTER/NRTR</td>\n<td>内部 AR</td>\n<td>串行 LTR</td>\n<td>中</td>\n<td>单向偏见</td>\n</tr>\n<tr>\n<td>ABINet</td>\n<td>外部双向 LM</td>\n<td>并行+精炼</td>\n<td>多（36.7M）</td>\n<td>LM 与图像独立，易错误纠正</td>\n</tr>\n<tr>\n<td><strong>PARSeq</strong></td>\n<td><strong>内部 PLM</strong></td>\n<td><strong>AR/NAR/Cloze 统一</strong></td>\n<td><strong>23.8M</strong></td>\n<td><strong>参数最优，精度最高</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p>PARSeq 的核心优势在于：用一个简单统一的结构（单层解码器 + attention mask）替代了 ABINet 中视觉模型 + 语言模型 + 融合模型的复杂三段式架构，同时获得了更强的精度和更高的效率。</p>",
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
      "detail": "<p><img alt=\"TrOCR 模型架构图\" src=\"https://arxiv.org/html/2109.10282v2/x1.png\" />\n<em>图：TrOCR 的 encoder-decoder 架构。编码器将输入图像分割为固定大小的 patch 并提取视觉特征，解码器以自回归方式生成文本 token。</em></p>\n<pre><code class=\"language-python\"># TrOCR 推理伪代码\ndef trocr_inference(image):\n    # 1. 图像预处理：resize 到 384x384\n    image = resize(image, (384, 384))\n\n    # 2. Patch Embedding：分割为 16x16 的 patch\n    patches = split_into_patches(image, patch_size=16)  # 得到 (384/16)^2 = 576 个 patch\n\n    # 3. 编码器：预训练 ViT/BEiT 提取视觉特征\n    visual_features = encoder(patches)  # [576, hidden_dim]\n\n    # 4. 解码器：自回归生成文本\n    tokens = [BOS]\n    while tokens[-1] != EOS:\n        # 自注意力 + 交叉注意力（attend to visual_features）\n        logits = decoder(tokens, visual_features)\n        next_token = beam_search(logits)\n        tokens.append(next_token)\n\n    return tokenizer.decode(tokens)\n</code></pre>\n<p><strong>动机与背景</strong></p>\n<p>传统 OCR 系统通常采用 CNN+RNN 的混合架构：CNN 作为视觉特征提取器，RNN（如 LSTM/GRU）作为序列建模器，再配合 CTC 解码或注意力机制进行文本输出。这种流水线式设计存在以下问题：</p>\n<ol>\n<li>CNN 和 RNN 的组合增加了模型复杂度，难以端到端优化</li>\n<li>无法充分利用大规模预训练模型的知识迁移能力</li>\n<li>通常需要外部语言模型（External LM）进行后处理以提升准确率</li>\n</ol>\n<p>TrOCR 的核心动机是：既然 Transformer 在 CV（ViT、BEiT）和 NLP（BERT、GPT）领域都已证明了强大的表示能力，能否构建一个纯 Transformer 的 OCR 模型，同时利用两个领域的预训练知识？</p>\n<p><strong>核心机制：Encoder-Decoder 架构</strong></p>\n<p>TrOCR 采用标准的 Transformer encoder-decoder 架构，但创新性地将预训练的视觉 Transformer 和语言模型分别作为编码器和解码器的初始化：</p>\n<p><strong>编码器（Image Transformer）：</strong></p>\n<p>输入图像首先被 resize 到 <span class=\"kb-math kb-math-inline\">384 \\times 384</span> 的固定分辨率，然后分割为 <span class=\"kb-math kb-math-inline\">16 \\times 16</span> 的不重叠 patch，得到 <span class=\"kb-math kb-math-inline\">(384/16)^2 = 576</span> 个 patch 序列。每个 patch 通过线性投影映射为一个 embedding 向量，加上可学习的位置编码后送入 Transformer 编码器：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{z}_0 = [\\mathbf{x}_1 E; \\mathbf{x}_2 E; \\ldots; \\mathbf{x}_N E] + \\mathbf{E}_{pos}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">E \\in \\mathbb{R}^{P^2 \\cdot C \\times D}</span> 是 patch 投影矩阵，<span class=\"kb-math kb-math-inline\">\\mathbf{E}_{pos}</span> 是位置编码。编码器支持三种预训练初始化：\n- <strong>DeiT</strong>（Data-efficient Image Transformer）：在 ImageNet 上通过知识蒸馏训练\n- <strong>BEiT</strong>（Bidirectional Encoder representation from Image Transformers）：使用 masked image modeling 自监督预训练</p>\n<p>实验表明 BEiT 编码器性能最优，因为其自监督预训练目标与 OCR 的视觉理解需求更匹配。</p>\n<p><strong>解码器（Language Model Transformer）：</strong></p>\n<p>解码器使用标准 Transformer decoder 结构，包含 masked self-attention 和 cross-attention 层。关键创新在于使用预训练语言模型（RoBERTa）初始化解码器权重：</p>\n<div class=\"kb-math kb-math-display\">\\text{CrossAttn}(Q, K, V) = \\text{softmax}\\left(\\frac{Q K^T}{\\sqrt{d_k}}\\right) V</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">Q</span> 来自解码器的 self-attention 输出，<span class=\"kb-math kb-math-inline\">K, V</span> 来自编码器的视觉特征。由于原始 RoBERTa 没有 cross-attention 层，这些层采用随机初始化。解码器以自回归方式逐 token 生成输出文本，使用 BPE（Byte Pair Encoding）分词。</p>\n<div class=\"key-point\">💡 关键：TrOCR 的解码器同时承担了\"语言模型\"和\"序列解码器\"的双重角色——预训练的 RoBERTa 权重提供了强大的语言先验，使模型无需外部语言模型即可生成流畅准确的文本。</div>\n<p><strong>两阶段预训练策略</strong></p>\n<p>TrOCR 采用精心设计的两阶段预训练：</p>\n<ul>\n<li><strong>第一阶段</strong>：使用大规模合成印刷文本数据（684M 文本行，从 IIT-CDIP 文档数据集通过文本渲染引擎生成）进行预训练，使模型学习基本的视觉-文本对齐能力</li>\n<li><strong>第二阶段</strong>：使用合成手写文本数据（从 IAM 手写风格生成的 17.9M 文本行）继续预训练，使模型适应手写文本的视觉特征</li>\n</ul>\n<p>数据增强策略包括：RandAugment、随机旋转（-15°~15°）、高斯模糊和图像质量退化（JPEG 压缩、高斯噪声等）。</p>\n<p><strong>与传统方法的区别</strong></p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>传统 OCR (CNN+RNN)</th>\n<th>TrOCR</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>视觉特征提取</td>\n<td>CNN (ResNet等)</td>\n<td>Image Transformer (ViT/BEiT)</td>\n</tr>\n<tr>\n<td>序列建模</td>\n<td>RNN (LSTM/GRU)</td>\n<td>Transformer Decoder</td>\n</tr>\n<tr>\n<td>解码方式</td>\n<td>CTC / Attention</td>\n<td>自回归 + Beam Search</td>\n</tr>\n<tr>\n<td>预训练利用</td>\n<td>有限（ImageNet CNN）</td>\n<td>充分（CV+NLP 双预训练）</td>\n</tr>\n<tr>\n<td>外部语言模型</td>\n<td>通常需要</td>\n<td>不需要</td>\n</tr>\n<tr>\n<td>输入处理</td>\n<td>特征图 + 序列化</td>\n<td>Patch 序列化</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"warn-box\">⚠️ 注意：TrOCR 的成功关键不仅在于架构设计，更在于充分利用了预训练模型的知识迁移。消融实验表明，去除预训练初始化会导致性能显著下降（IAM 上 CER 从 4.22 升至 7.01）。</div>\n<p><strong>实验结果</strong></p>\n<p>TrOCR 在三个主要基准上验证了有效性：\n- <strong>SROIE</strong>（印刷收据）：TrOCR_LARGE 达到 F1=96.58，超越所有 CNN+RNN 基线\n- <strong>IAM</strong>（手写文本）：TrOCR_LARGE 达到 CER=2.89，在不使用外部 LM 的条件下创造新 SOTA\n- <strong>场景文本</strong>（6个标准基准）：TrOCR_LARGE 在 IC13 上达到 98.4% 准确率，整体与专用场景文本模型竞争力相当</p>",
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
      "detail": "<p><img alt=\"SVTRv2 整体架构图\" src=\"https://ar5iv.labs.arxiv.org/html/2411.15858/assets/x1.png\" />\n<em>图：SVTRv2 整体框架，包含 Multi-Size Resizing、视觉编码器、Feature Rearrangement Module 和 Semantic Guidance Module</em></p>\n<h5>动机与背景</h5>\n<p>场景文本识别（STR）的主流方法分为两类：基于 CTC 的方法和基于 Encoder-Decoder（EDTR）的方法。CTC 方法具有推理速度快、天然支持长文本的优势，但在不规则文本（弯曲、旋转、遮挡）上表现远逊于 EDTR。作者分析了 CTC 模型的三大瓶颈：</p>\n<ol>\n<li><strong>固定尺寸缩放导致变形</strong>：将不同宽高比的文本图像统一缩放到固定尺寸（如 32×128），导致弯曲/竖排文本严重变形</li>\n<li><strong>2D→1D 特征压缩丢失空间信息</strong>：CTC 需要将 2D 特征图按列压缩为 1D 序列，对于非水平排列的文本会导致字符错位</li>\n<li><strong>缺乏语言上下文建模</strong>：CTC 逐位置独立预测，无法利用语言先验修正遮挡/模糊字符</li>\n</ol>\n<h5>核心机制</h5>\n<p><strong>1. Multi-Size Resizing (MSR)</strong></p>\n<p>MSR 根据输入图像的宽高比 <span class=\"kb-math kb-math-inline\">r = W/H</span> 将其分配到预定义的尺寸集合中：</p>\n<div class=\"kb-math kb-math-display\">S = \\{(H_1, W_1), (H_2, W_2), \\ldots, (H_N, W_N)\\}</div>\n<p>具体地，SVTRv2 定义了 4 个尺寸区间：\n- <span class=\"kb-math kb-math-inline\">R_1</span>：宽高比 &lt; 2，缩放到 64×128（适合竖排/方形文本）\n- <span class=\"kb-math kb-math-inline\">R_2</span>：宽高比 ∈ [2, 4)，缩放到 48×160\n- <span class=\"kb-math kb-math-inline\">R_3</span>：宽高比 ∈ [4, 8)，缩放到 32×256\n- <span class=\"kb-math kb-math-inline\">R_4</span>：宽高比 ≥ 8，缩放到 32×384（适合长文本）</p>\n<div class=\"key-point\">💡 关键：MSR 的核心思想是\"让缩放适应文本，而非让文本适应缩放\"。通过保持合理的宽高比，避免了弯曲文本被拉伸后字符粘连的问题。</div>\n<p><img alt=\"MSR 和 FRM 详细结构\" src=\"https://ar5iv.labs.arxiv.org/html/2411.15858/assets/x2.png\" />\n<em>图：(a) Multi-Size Resizing 策略示意；(b) Feature Rearrangement Module 结构</em></p>\n<p><strong>2. Feature Rearrangement Module (FRM)</strong></p>\n<p>FRM 解决的核心问题是：对于弯曲/旋转文本，简单的按列压缩会导致不同字符的特征混在同一列中。FRM 通过学习重排矩阵，将 2D 特征图中属于同一字符的特征聚合到正确的位置。</p>\n<p>设视觉编码器输出特征图 <span class=\"kb-math kb-math-inline\">F \\in \\mathbb{R}^{H&#x27; \\times W&#x27; \\times C}</span>，FRM 包含两个子模块：</p>\n<p><strong>水平重排（H-rearranging）</strong>：学习水平方向的重排矩阵 <span class=\"kb-math kb-math-inline\">M_h \\in \\mathbb{R}^{H&#x27; \\times W&#x27; \\times W&#x27;}</span>：</p>\n<div class=\"kb-math kb-math-display\">F_h = M_h \\cdot F</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">M_h</span> 对每一行学习一个 <span class=\"kb-math kb-math-inline\">W&#x27; \\times W&#x27;</span> 的软置换矩阵，将水平方向上错位的特征重新对齐。</p>\n<p><strong>垂直重排（V-rearranging）</strong>：学习垂直方向的重排矩阵 <span class=\"kb-math kb-math-inline\">M_v \\in \\mathbb{R}^{W&#x27; \\times H&#x27; \\times H&#x27;}</span>：</p>\n<div class=\"kb-math kb-math-display\">F_v = M_v \\cdot F_h</div>\n<p>垂直重排将不同行中属于同一字符的特征聚合，最终通过列方向池化得到 1D 序列。</p>\n<div class=\"warn-box\">⚠️ 注意：FRM 的重排矩阵是通过网络预测的\"软\"矩阵（经 Softmax 归一化），而非硬置换，因此可以端到端训练。</div>\n<pre><code class=\"language-python\"># FRM 伪代码\ndef FRM(feature_map):\n    # feature_map: [B, H', W', C]\n\n    # 水平重排：对每行学习 W'×W' 的重排矩阵\n    M_h = predict_h_matrix(feature_map)  # [B, H', W', W']\n    M_h = softmax(M_h, dim=-1)\n    F_h = einsum('bhwk,bhkc-&gt;bhwc', M_h, feature_map)\n\n    # 垂直重排：对每列学习 H'×H' 的重排矩阵\n    M_v = predict_v_matrix(F_h)  # [B, W', H', H']\n    M_v = softmax(M_v, dim=-1)\n    F_v = einsum('bwhn,bhnc-&gt;bwhc', M_v, F_h.permute(0,2,1,3))\n\n    # 列方向池化得到 1D 序列\n    output = F_v.mean(dim=2)  # [B, W', C]\n    return output\n</code></pre>\n<p><strong>3. Semantic Guidance Module (SGM)</strong></p>\n<p>SGM 的目标是在不引入自回归解码器的前提下，为 CTC 模型注入语言上下文。其核心设计是一个\"先粗后精\"的两阶段预测：</p>\n<p><strong>阶段一（CTC 初步解码）</strong>：视觉特征经 CTC 头得到初步预测结果 <span class=\"kb-math kb-math-inline\">\\hat{Y}</span></p>\n<p><strong>阶段二（语义增强）</strong>：\n1. 将 <span class=\"kb-math kb-math-inline\">\\hat{Y}</span> 通过嵌入层得到语义查询 <span class=\"kb-math kb-math-inline\">Q_s</span>\n2. 使用 Transformer 解码器中的交叉注意力，以 <span class=\"kb-math kb-math-inline\">Q_s</span> 为 Query、视觉特征为 Key/Value：</p>\n<div class=\"kb-math kb-math-display\">F_{enhanced} = \\text{CrossAttn}(Q_s, F_{visual}, F_{visual}) + F_{visual}</div>\n<ol>\n<li>增强后的特征再次通过 CTC 头得到最终预测</li>\n</ol>\n<div class=\"key-point\">💡 关键：SGM 的精妙之处在于利用 CTC 自身的初步预测作为\"语义锚点\"，通过交叉注意力让模型关注与语义相关的视觉区域，从而修正遮挡/模糊导致的错误。这种设计保持了 CTC 的并行解码优势，不引入自回归的速度开销。</div>\n<p>训练时使用 Ground Truth 标签替代 CTC 预测作为语义输入（Teacher Forcing），损失函数为：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L} = \\mathcal{L}_{CTC}^{(1)} + \\mathcal{L}_{CTC}^{(2)}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\mathcal{L}_{CTC}^{(1)}</span> 和 <span class=\"kb-math kb-math-inline\">\\mathcal{L}_{CTC}^{(2)}</span> 分别是两阶段的 CTC 损失。</p>\n<h5>与传统方法的区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>传统 CTC (SVTR)</th>\n<th>Encoder-Decoder (MAERec)</th>\n<th>SVTRv2</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>解码方式</td>\n<td>CTC 并行</td>\n<td>自回归逐字</td>\n<td>CTC 并行（两阶段）</td>\n</tr>\n<tr>\n<td>不规则文本处理</td>\n<td>固定缩放</td>\n<td>注意力机制隐式处理</td>\n<td>MSR + FRM 显式处理</td>\n</tr>\n<tr>\n<td>语言建模</td>\n<td>无</td>\n<td>解码器隐式建模</td>\n<td>SGM 显式注入</td>\n</tr>\n<tr>\n<td>长文本支持</td>\n<td>✓（天然支持）</td>\n<td>✗（固定长度限制）</td>\n<td>✓（MSR 自适应）</td>\n</tr>\n<tr>\n<td>推理速度</td>\n<td>快</td>\n<td>慢（自回归）</td>\n<td>快（仅增加少量计算）</td>\n</tr>\n</tbody>\n</table></div>\n<h5>实验验证</h5>\n<p>消融实验证实了各模块的有效性：\n- <strong>MSR</strong>：在高宽高比文本（R1）上提升 15.3%，R2 上提升 5.2%\n- <strong>FRM</strong>：在遮挡文本（MO）上提升 2.46%，水平+垂直重排协同效果最佳\n- <strong>SGM</strong>：在遮挡场景文本（OST）上提升 5.11%，U14M 整体提升 2.28%</p>\n<p><img alt=\"定性对比结果\" src=\"https://ar5iv.labs.arxiv.org/html/2411.15858/assets/x4.png\" />\n<em>图：SVTRv2 与其他方法在不规则和遮挡文本上的定性对比。绿色为正确识别，红色为错误识别</em></p>",
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
      "detail": "<p><img alt=\"FOTS 整体架构图\" src=\"https://arxiv.org/html/1801.01671v2/extracted/figures/pipeline.png\" />\n<em>图：FOTS 端到端架构。共享特征经检测分支输出文本区域，RoIRotate 提取旋转区域特征送入识别分支。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># FOTS 端到端文本检测与识别流程\ndef FOTS_forward(image):\n    # 1. 共享特征提取\n    C2, C3, C4, C5 = ResNet50(image)  # 多尺度特征\n    # FPN 特征融合（自顶向下 + 横向连接）\n    P5 = conv1x1(C5)\n    P4 = conv1x1(C4) + upsample(P5)\n    P3 = conv1x1(C3) + upsample(P4)\n    P2 = conv1x1(C2) + upsample(P3)  # 1/4 分辨率\n    shared_features = conv3x3(P2)  # 最终共享特征图\n\n    # 2. 检测分支（逐像素预测）\n    score_map = conv(shared_features)      # H/4 × W/4, 1ch (文本/非文本)\n    geo_map = conv(shared_features)        # H/4 × W/4, 4ch (到上下左右边界距离)\n    angle_map = conv(shared_features)      # H/4 × W/4, 1ch (旋转角度)\n\n    # 3. NMS 后处理得到文本区域\n    text_regions = NMS(score_map, geo_map, angle_map, threshold=0.5)\n\n    # 4. RoIRotate：从共享特征中提取旋转文本区域\n    for region in text_regions:\n        # 仿射变换 + 双线性插值 → 固定高度8，宽度按比例\n        roi_features = affine_transform(shared_features, region)\n\n    # 5. 识别分支\n    cnn_out = RecogCNN(roi_features)       # 6层卷积，高度压缩为1\n    lstm_out = BiLSTM(cnn_out)             # 双向LSTM序列建模\n    text_result = CTC_decode(lstm_out)     # CTC 解码得到文本\n\n    return text_regions, text_result\n\n# 训练损失\nL_total = L_detect + λ * L_recog  # λ = 1\nL_detect = L_cls(OHEM) + λ_geo * L_geo(IoU_loss + angle_loss)\nL_recog = CTC_loss(predicted_sequence, ground_truth_text)\n</code></pre>\n<h5>动机与背景</h5>\n<p>传统场景文本识别系统采用两阶段流水线：先用检测模型定位文本区域，再将裁剪的图像块送入独立的识别模型。这种方法存在三个核心问题：</p>\n<ol>\n<li><strong>计算冗余</strong>：检测和识别各自维护独立的特征提取网络，重复计算卷积特征</li>\n<li><strong>误差累积</strong>：检测错误直接传播到识别阶段，无法通过识别反馈修正检测</li>\n<li><strong>速度瓶颈</strong>：两个网络串行执行，难以达到实时速度</li>\n</ol>\n<p>FOTS 的核心思想是：既然检测和识别都依赖图像的视觉特征，为何不共享一个特征提取器，让两个任务互相促进？</p>\n<h5>核心机制：RoIRotate</h5>\n<p>RoIRotate 是连接检测与识别的桥梁，其核心挑战在于：如何从共享特征图中提取<strong>任意方向</strong>的文本区域特征，同时保持<strong>可微分</strong>以支持端到端训练。</p>\n<p>给定一个旋转文本区域（由中心点、宽高、旋转角度定义），RoIRotate 执行以下步骤：</p>\n<ol>\n<li><strong>构建仿射变换矩阵</strong>：将目标输出坐标映射回原始特征图坐标</li>\n</ol>\n<div class=\"kb-math kb-math-display\">T = \\begin{pmatrix} \\cos\\theta &amp; -\\sin\\theta &amp; t_x \\\\ \\sin\\theta &amp; \\cos\\theta &amp; t_y \\end{pmatrix}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\theta</span> 为文本区域旋转角度，<span class=\"kb-math kb-math-inline\">(t_x, t_y)</span> 为平移参数。</p>\n<ol>\n<li><strong>坐标映射</strong>：对输出特征图的每个位置 <span class=\"kb-math kb-math-inline\">(x^t, y^t)</span>，计算其在输入特征图上的对应位置：</li>\n</ol>\n<div class=\"kb-math kb-math-display\">\\begin{pmatrix} x^s \\\\ y^s \\end{pmatrix} = T \\begin{pmatrix} x^t \\\\ y^t \\\\ 1 \\end{pmatrix}</div>\n<ol>\n<li><strong>双线性插值采样</strong>：由于映射后的坐标通常不是整数，使用双线性插值从四个相邻像素获取特征值，保证梯度可传播。</li>\n</ol>\n<div class=\"key-point\">💡 关键：与传统 RoI Pooling 使用最大池化不同，RoIRotate 使用双线性插值，这使得梯度能够平滑地传回特征图的每个位置，实现真正的端到端训练。</div>\n<p>输出特征的高度固定为 8 像素，宽度根据文本区域的宽高比动态调整，保持原始比例关系。</p>\n<h5>检测分支设计</h5>\n<p>检测分支基于 EAST 的设计理念，采用全卷积网络进行逐像素预测：</p>\n<ul>\n<li><strong>分类分数</strong>：每个像素预测属于文本区域的概率</li>\n<li><strong>几何信息</strong>：每个正样本像素预测到文本框上、下、左、右四条边的距离 + 旋转角度 <span class=\"kb-math kb-math-inline\">\\theta \\in [-\\pi/4, \\pi/4]</span></li>\n</ul>\n<p>检测损失函数：</p>\n<div class=\"kb-math kb-math-display\">L_{detect} = L_{cls} + \\lambda_{geo} \\cdot L_{geo}</div>\n<p>其中分类损失使用交叉熵配合 OHEM（每张图选 512 困难负样本 + 512 随机负样本 + 全部正样本，正负比从 1:60 提升到 1:3）。</p>\n<p>几何损失采用 IoU Loss + 角度损失：</p>\n<div class=\"kb-math kb-math-display\">L_{geo} = -\\log \\text{IoU}(\\hat{R}, R^*) + \\lambda_\\theta (1 - \\cos(\\hat{\\theta} - \\theta^*))</div>\n<div class=\"key-point\">💡 关键：IoU Loss 对不同尺度的文本框具有天然的尺度不变性，避免了 L1/L2 回归对大框偏向的问题。</div>\n<h5>识别分支设计</h5>\n<p>识别分支接收 RoIRotate 输出的固定高度特征序列：</p>\n<ol>\n<li><strong>CNN 编码器</strong>：6 层卷积（类 VGG 结构），通过高度方向的 max-pooling 将特征压缩为高度=1 的序列</li>\n<li><strong>BiLSTM</strong>：双向 LSTM 捕获序列上下文依赖</li>\n<li><strong>CTC 解码</strong>：使用 Connectionist Temporal Classification 处理不定长文本输出，无需字符级对齐标注</li>\n</ol>\n<p>CTC 损失定义为：</p>\n<div class=\"kb-math kb-math-display\">L_{recog} = -\\log p(\\text{target} | \\text{features})</div>\n<p>其中概率通过对所有合法路径求和得到（CTC forward-backward 算法）。</p>\n<h5>训练策略</h5>\n<ul>\n<li><strong>预训练</strong>：ImageNet 预训练 ResNet-50 骨干</li>\n<li><strong>第一阶段</strong>：Synth800K 合成数据训练 10 个 epoch</li>\n<li><strong>第二阶段</strong>：真实数据（ICDAR 2017 MLT + ICDAR 2015 + ICDAR 2013）微调至收敛</li>\n<li><strong>数据增强</strong>：长边缩放 640-2560 → 随机旋转 [-10°, 10°] → 高度缩放 0.8-1.2 → 随机裁剪 640×640</li>\n<li><strong>训练时使用 GT 区域</strong>：识别分支训练时使用真实标注区域（非预测区域），避免早期检测不准影响识别训练</li>\n</ul>\n<h5>与传统方法的关键区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>两阶段方法</th>\n<th>FOTS</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>特征提取</td>\n<td>检测+识别各自独立</td>\n<td>共享骨干网络</td>\n</tr>\n<tr>\n<td>方向处理</td>\n<td>需额外旋转校正</td>\n<td>RoIRotate 原生支持</td>\n</tr>\n<tr>\n<td>速度 (IC15)</td>\n<td>3.7 fps</td>\n<td>7.5 fps (2倍加速)</td>\n</tr>\n<tr>\n<td>模型参数</td>\n<td>63.90M (28.67+35.23)</td>\n<td>34.98M (减少45%)</td>\n</tr>\n<tr>\n<td>端到端训练</td>\n<td>❌ 分别训练</td>\n<td>✅ 联合优化</td>\n</tr>\n<tr>\n<td>识别对检测的反馈</td>\n<td>❌ 无</td>\n<td>✅ 减少漏检/误检/断裂/合并</td>\n</tr>\n</tbody>\n</table></div>\n<h5>实验结果</h5>\n<p>FOTS 在三个主流基准上取得了当时的最优性能：</p>\n<ul>\n<li><strong>ICDAR 2015 检测</strong>：F-measure = 87.99%（单尺度），91.99%（多尺度）</li>\n<li><strong>ICDAR 2015 端到端</strong>：Strong=81.09%, Weak=75.90%, Generic=60.80%（单尺度）</li>\n<li><strong>ICDAR 2017 MLT 检测</strong>：F-measure = 62.30%（单尺度），67.25%（多尺度）</li>\n<li><strong>ICDAR 2013 检测</strong>：F-measure = 92.82%（多尺度，DetEval）</li>\n</ul>\n<div class=\"warn-box\">⚠️ 注意：FOTS 在 ICDAR 2015 端到端任务上超越此前最优方法（SegLink + CRNN）15% 以上，证明了端到端联合训练的巨大优势。</div>",
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
      "detail": "<h5>架构总览</h5>\n<p><img alt=\"Mask TextSpotter 架构图\" src=\"https://ar5iv.labs.arxiv.org/html/1807.02242/assets/x1.png\" />\n<em>图：Mask TextSpotter 整体网络架构。输入图像经 FPN 提取多尺度特征，RPN 生成候选区域，Fast R-CNN 进行分类与回归，Mask Branch 输出文本实例分割图和字符分割图。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># Mask TextSpotter 推理流程\ndef inference(image):\n    # 1. 特征提取\n    features = FPN(ResNet50(image))  # 多尺度特征 P2-P5\n\n    # 2. 区域提议\n    proposals = RPN(features)\n\n    # 3. Fast R-CNN 分类与回归\n    boxes, scores = FastRCNN(features, proposals)\n    boxes = NMS(boxes, scores, threshold=0.5)\n\n    # 4. Mask Branch: RoI → 38通道分割图\n    for box in boxes:\n        roi_feat = RoIAlign(features, box, size=(16, 64))\n        masks = MaskBranch(roi_feat)  # shape: (38, 32, 128)\n\n        # 4a. 全局文本图 → 多边形检测\n        text_mask = masks[0]  # 二值文本区域\n        polygon = extract_contour(text_mask)\n\n        # 4b. 字符图 → 像素投票识别\n        bg_map = masks[37]  # 背景图\n        char_maps = masks[1:37]  # 36个字符类别图\n\n        # 二值化背景图，获取字符连通域\n        binary_bg = (bg_map &lt; 192/255)\n        regions = connected_components(binary_bg)\n\n        # 对每个连通域投票得到字符类别\n        text = &quot;&quot;\n        for region in sorted(regions, key=lambda r: r.x_center):\n            probs = mean(char_maps[:, region.pixels], axis=1)\n            char = argmax(probs)  # 0-9, a-z\n            text += decode(char)\n\n    # 5. 加权编辑距离进行词典匹配（可选）\n    if lexicon:\n        text = weighted_edit_distance_match(text, char_probs, lexicon)\n\n    return polygons, texts\n</code></pre>\n<h5>动机与背景</h5>\n<p>传统端到端文本识别方法（如 FOTS、Deep TextSpotter）依赖序列解码器（CTC/Attention），将文本视为一维序列。这种设计存在根本性局限：</p>\n<ol>\n<li><strong>无法处理弯曲文本</strong>：序列解码器假设文本沿水平方向排列，对曲线文本需要额外的矫正步骤</li>\n<li><strong>检测精度受限</strong>：通常输出矩形或四边形框，无法精确描述任意形状文本边界</li>\n<li><strong>训练复杂度高</strong>：CTC 解码需要处理对齐问题，Attention 机制引入额外计算开销</li>\n</ol>\n<p>Mask TextSpotter 的核心洞察是：<strong>将文本识别转化为像素级语义分割问题</strong>。每个字符在空间上占据特定区域，通过预测每个像素属于哪个字符类别，可以自然地处理任意形状文本，无需显式的序列建模。</p>\n<h5>核心机制详解</h5>\n<p><strong>1. 网络骨架与特征提取</strong></p>\n<p>采用 ResNet-50 + FPN 作为骨架网络，生成 <span class=\"kb-math kb-math-inline\">P_2, P_3, P_4, P_5</span> 四个尺度的特征图。RPN 在所有尺度上生成候选区域，Fast R-CNN 对候选区域进行文本/非文本分类和边界框回归。</p>\n<p><strong>2. Mask Branch 设计</strong></p>\n<p>Mask Branch 是本文的核心创新。对于每个文本候选区域：</p>\n<ul>\n<li>通过 RoIAlign 提取 <span class=\"kb-math kb-math-inline\">16 \\times 64</span> 的特征图（高×宽，适配文本纵横比）</li>\n<li>经过 4 个 <span class=\"kb-math kb-math-inline\">3\\times3</span> 卷积层（256通道）+ 1 个反卷积层上采样至 <span class=\"kb-math kb-math-inline\">32 \\times 128</span></li>\n<li>最终输出 38 个通道的分割图：</li>\n</ul>\n<div class=\"kb-math kb-math-display\">\\text{Output} \\in \\mathbb{R}^{38 \\times 32 \\times 128}</div>\n<p>其中：\n- 通道 0：全局文本实例分割图（前景/背景）\n- 通道 1-36：36 个字符类别分割图（0-9 + a-z）\n- 通道 37：背景分割图</p>\n<div class=\"key-point\">💡 关键：字符分割图和背景图共同构成 37 类空间 softmax 分类，每个像素被分配到 36 个字符类别或背景之一。</div>\n<p><strong>3. 损失函数</strong></p>\n<p>总损失由四部分组成：</p>\n<div class=\"kb-math kb-math-display\">L = L_{rpn} + L_{rcnn} + \\lambda_1 L_{global} + \\lambda_2 L_{char}</div>\n<ul>\n<li><span class=\"kb-math kb-math-inline\">L_{global}</span>：全局文本图的二值交叉熵损失（sigmoid 激活）</li>\n</ul>\n<div class=\"kb-math kb-math-display\">L_{global} = -\\frac{1}{N}\\sum_{i}[y_i \\log(\\hat{y}_i) + (1-y_i)\\log(1-\\hat{y}_i)]</div>\n<ul>\n<li><span class=\"kb-math kb-math-inline\">L_{char}</span>：字符分割图的加权空间 softmax 损失（37 类）</li>\n</ul>\n<div class=\"kb-math kb-math-display\">L_{char} = -\\frac{1}{N_{pos}}\\sum_{i \\in \\text{pos}} w_i \\log\\frac{e^{x_{i,c_i}}}{\\sum_{k=0}^{36} e^{x_{i,k}}}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">w_i</span> 为权重（仅对文本区域内像素计算损失），<span class=\"kb-math kb-math-inline\">c_i</span> 为像素 <span class=\"kb-math kb-math-inline\">i</span> 的真实字符类别。</p>\n<div class=\"warn-box\">⚠️ 注意：字符损失仅在有字符级标注的样本上计算。对于只有词级标注的数据（如 ICDAR2015），仅使用 <span class=\"kb-math kb-math-inline\">L_{global}</span> 进行 Mask Branch 的监督。</div>\n<p><strong>4. 像素投票算法</strong></p>\n<p>推理时的字符识别流程：</p>\n<ol>\n<li>将背景图以阈值 192（0-255 范围）二值化，得到前景区域</li>\n<li>对前景区域进行连通域分析，每个连通域对应一个字符</li>\n<li>对每个连通域内的像素，计算其在 36 个字符通道上的平均概率</li>\n<li>取概率最大的类别作为该字符的识别结果</li>\n<li>按连通域中心的水平位置从左到右排列，组成最终文本</li>\n</ol>\n<p><strong>5. 加权编辑距离</strong></p>\n<p>标准编辑距离对所有操作赋予相同代价（=1），无法区分高置信度和低置信度字符。本文提出加权版本：</p>\n<div class=\"kb-math kb-math-display\">D_{a,b}(i,j) = \\min\\begin{cases} D_{a,b}(i-1,j) + C_d \\\\ D_{a,b}(i,j-1) + C_i \\\\ D_{a,b}(i-1,j-1) + C_r \\cdot \\mathbf{1}_{(a_i \\neq b_j)} \\end{cases}</div>\n<p>其中删除代价 <span class=\"kb-math kb-math-inline\">C_d</span>、插入代价 <span class=\"kb-math kb-math-inline\">C_i</span>、替换代价 <span class=\"kb-math kb-math-inline\">C_r</span> 均由像素投票产生的字符概率决定：\n- 高置信度字符的删除/替换代价更高\n- 低置信度字符的删除/替换代价更低</p>\n<p>这使得词典匹配更倾向于修改不确定的字符，保留确定的字符。</p>\n<h5>标签生成策略</h5>\n<p>训练标签的生成需要将字符级标注映射到 Mask Branch 的输出空间：</p>\n<ol>\n<li>将文本多边形标注转换为水平矩形作为 RPN/Fast R-CNN 的训练目标</li>\n<li>对于 Mask Branch：将字符框坐标通过仿射变换映射到 <span class=\"kb-math kb-math-inline\">32 \\times 128</span> 的输出空间</li>\n<li>全局文本图标签：文本多边形内部为 1，外部为 0</li>\n<li>字符图标签：每个字符框内的像素标记为对应字符类别</li>\n</ol>\n<h5>与传统方法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>FOTS/Li et al.</th>\n<th>Deep TextSpotter</th>\n<th>Mask TextSpotter</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>识别方式</td>\n<td>CTC 序列解码</td>\n<td>CTC 序列解码</td>\n<td>像素级分割</td>\n</tr>\n<tr>\n<td>文本形状</td>\n<td>仅水平/多方向</td>\n<td>仅水平/多方向</td>\n<td><strong>任意形状（含弯曲）</strong></td>\n</tr>\n<tr>\n<td>检测输出</td>\n<td>矩形/四边形</td>\n<td>矩形</td>\n<td><strong>多边形</strong></td>\n</tr>\n<tr>\n<td>训练难度</td>\n<td>需 CTC 对齐</td>\n<td>需采样策略</td>\n<td>简单直接</td>\n</tr>\n<tr>\n<td>字符级监督</td>\n<td>不需要</td>\n<td>不需要</td>\n<td>需要（可选）</td>\n</tr>\n</tbody>\n</table></div>\n<h5>实验结果</h5>\n<p>在三个基准数据集上的端到端识别性能：</p>\n<p><strong>ICDAR2013</strong>（水平文本）：E2E Strong=92.2%, Weak=91.1%, Generic=86.5%</p>\n<p><strong>ICDAR2015</strong>（多方向文本，输入 1600）：E2E Strong=79.3%, Weak=73.0%, Generic=62.4%</p>\n<p><strong>Total-Text</strong>（弯曲文本）：E2E None=52.9%, Full=71.8%（超越 TextBoxes 16.6%+）</p>\n<p>检测性能：ICDAR2013 F=91.7%, ICDAR2015 F=86.0%, Total-Text F=61.3%</p>\n<p>速度：720×1280 输入下 6.9 FPS</p>",
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
      "detail": "<p><img alt=\"ABCNet v2 整体架构\" src=\"https://ar5iv.labs.arxiv.org/html/2105.03620/assets/x2.png\" />\n<em>图：ABCNet v2 整体框架。输入图像经 ResNet-50 + BiFPN 提取多尺度特征，检测分支回归贝塞尔曲线控制点，BezierAlign 根据曲线参数从特征图中采样对齐的文本特征，送入注意力识别模块输出文本。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># ABCNet v2 端到端推理流程\ndef abcnet_v2_forward(image):\n    # 1. 特征提取\n    features = ResNet50(image)              # 多尺度特征 C2-C5\n    fpn_features = BiFPN(features)          # 双向特征金字塔融合\n    coord_features = CoordConv(fpn_features)  # 拼接 (x, y) 归一化坐标\n\n    # 2. 检测分支：回归贝塞尔曲线控制点\n    proposals = RPN(coord_features)         # 生成候选区域\n    bezier_points = BezierHead(proposals)   # 回归 8 个控制点 (上下各4)\n    # bezier_points shape: (N, 8, 2) — N个文本实例\n\n    # 3. BezierAlign：沿曲线采样特征\n    for each detected bezier curve:\n        # 沿上下贝塞尔曲线等参数采样 W=32 个点\n        top_points = bezier_sample(top_curve, num=32)\n        bot_points = bezier_sample(bot_curve, num=32)\n        # 在每对上下点之间线性插值 H=8 个采样点\n        grid = linear_interpolate(top_points, bot_points, H=8)\n        # 双线性插值从特征图采样\n        text_feature = bilinear_sample(fpn_features, grid)  # (8, 32, C)\n\n    # 4. 识别分支：Attention Decoder\n    cnn_feat = RecogCNN(text_feature)       # 6层CNN降维\n    seq_feat = BiLSTM(cnn_feat)             # 序列建模\n    text = GRU_Attention_Decode(seq_feat)   # 逐字符解码\n\n    return bezier_points, text\n</code></pre>\n<h5>动机与背景</h5>\n<p>传统场景文本检测方法使用水平矩形框或旋转矩形框表示文本区域，这对于弯曲文本（如弧形招牌、瓶身文字）存在严重的几何失配问题。具体而言：</p>\n<ol>\n<li><strong>矩形框包含大量背景噪声</strong>：弯曲文本的矩形外接框中，文本像素占比可能不足 30%，大量背景干扰识别</li>\n<li><strong>RoIAlign 对曲线文本失效</strong>：标准 RoIAlign 假设文本区域为矩形，对弯曲文本的特征提取产生严重形变</li>\n<li><strong>多边形标注冗余</strong>：使用密集多边形点（如 CTW1500 的 28 点标注）表示文本边界参数过多，回归困难</li>\n</ol>\n<p>ABCNet v1 首次提出用贝塞尔曲线表示文本边界，ABCNet v2 在此基础上进行了全面升级。</p>\n<h5>核心机制一：贝塞尔曲线文本表示</h5>\n<p>三阶贝塞尔曲线由 4 个控制点 <span class=\"kb-math kb-math-inline\">\\{b_0, b_1, b_2, b_3\\}</span> 定义，参数方程为：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{c}(t) = \\sum_{i=0}^{3} \\binom{3}{i} (1-t)^{3-i} t^i \\cdot b_i, \\quad t \\in [0, 1]</div>\n<p>文本实例用<strong>上下两条</strong>三阶贝塞尔曲线表示，共 8 个控制点。这种表示具有以下优势：\n- <strong>紧凑性</strong>：仅需 16 个坐标值（8 点 × 2 维）即可精确描述复杂曲线边界\n- <strong>连续性</strong>：贝塞尔曲线天然光滑，避免多边形的锯齿效应\n- <strong>可微性</strong>：曲线参数可直接通过网络回归，支持端到端训练</p>\n<div class=\"key-point\">💡 关键：控制点的生成采用最小二乘法拟合——给定多边形标注点，通过求解 <span class=\"kb-math kb-math-inline\">\\mathbf{b} = (\\mathbf{M}^T\\mathbf{M})^{-1}\\mathbf{M}^T\\mathbf{q}</span> 获得最优控制点，其中 <span class=\"kb-math kb-math-inline\">\\mathbf{M}</span> 为伯恩斯坦基函数矩阵，<span class=\"kb-math kb-math-inline\">\\mathbf{q}</span> 为标注点坐标。</div>\n<h5>核心机制二：BezierAlign</h5>\n<p>BezierAlign 是本文最核心的创新，解决了弯曲文本的特征对齐问题。与标准 RoIAlign 的关键区别在于<strong>采样网格的构造方式</strong>：</p>\n<ol>\n<li><strong>沿曲线等参数采样</strong>：在上下贝塞尔曲线上分别取 <span class=\"kb-math kb-math-inline\">W</span> 个等间距参数点（<span class=\"kb-math kb-math-inline\">t = 0, \\frac{1}{W-1}, \\frac{2}{W-1}, \\ldots, 1</span>）</li>\n<li><strong>正交插值</strong>：对每对上下对应点之间进行线性插值，生成 <span class=\"kb-math kb-math-inline\">H</span> 个中间采样点</li>\n<li><strong>双线性采样</strong>：将采样点映射到特征图坐标，通过双线性插值获取特征值</li>\n</ol>\n<p>采样网格的数学表达为：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{p}(s, t) = (1 - s) \\cdot \\mathbf{c}_{top}(t) + s \\cdot \\mathbf{c}_{bot}(t), \\quad s \\in [0,1], t \\in [0,1]</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\mathbf{c}_{top}(t)</span> 和 <span class=\"kb-math kb-math-inline\">\\mathbf{c}_{bot}(t)</span> 分别为上下贝塞尔曲线。最终采样网格大小为 <span class=\"kb-math kb-math-inline\">H \\times W = 8 \\times 32</span>。</p>\n<div class=\"warn-box\">⚠️ 注意：BezierAlign 的采样网格不再是矩形，而是随文本弯曲程度自适应变形的曲面网格。这使得提取的特征天然\"拉直\"了弯曲文本，无需额外的矫正步骤。</div>\n<p>消融实验证明了 BezierAlign 的巨大优势：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>采样方法</th>\n<th>E2E F-measure</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>水平采样</td>\n<td>38.4%</td>\n</tr>\n<tr>\n<td>四边形采样</td>\n<td>44.7%</td>\n</tr>\n<tr>\n<td><strong>BezierAlign</strong></td>\n<td><strong>61.9%</strong></td>\n</tr>\n</tbody>\n</table></div>\n<h5>核心机制三：CoordConv 位置编码</h5>\n<p>检测分支在 FPN 特征图上拼接两个额外通道——归一化的 x 和 y 坐标：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{F}&#x27; = \\text{Concat}(\\mathbf{F}, \\mathbf{X}_{norm}, \\mathbf{Y}_{norm})</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\mathbf{X}_{norm}(i,j) = \\frac{j}{W-1}</span>，<span class=\"kb-math kb-math-inline\">\\mathbf{Y}_{norm}(i,j) = \\frac{i}{H-1}</span>。这为卷积核提供了显式的空间位置信息，有助于精确回归控制点的绝对坐标。消融实验显示 CoordConv 带来 2.8%~2.9% 的端到端提升，且几乎无计算开销。</p>\n<h5>核心机制四：注意力识别模块</h5>\n<p>识别分支采用 Encoder-Decoder 架构：</p>\n<ul>\n<li><strong>Encoder</strong>：6 层 CNN（含 BN + ReLU）将 BezierAlign 输出的 <span class=\"kb-math kb-math-inline\">8 \\times 32</span> 特征压缩为 <span class=\"kb-math kb-math-inline\">1 \\times 32 \\times 256</span> 序列，再经 BiLSTM 建模长程依赖</li>\n<li><strong>Decoder</strong>：GRU + Attention 机制逐步解码字符序列</li>\n</ul>\n<p>注意力权重计算：</p>\n<div class=\"kb-math kb-math-display\">e_{t,i} = \\mathbf{w}^T \\tanh(\\mathbf{W}_s \\mathbf{s}_t + \\mathbf{W}_h \\mathbf{h}_i + \\mathbf{b})</div>\n<div class=\"kb-math kb-math-display\">\\alpha_{t,i} = \\frac{\\exp(e_{t,i})}{\\sum_j \\exp(e_{t,j})}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\mathbf{s}_t</span> 为解码器隐状态，<span class=\"kb-math kb-math-inline\">\\mathbf{h}_i</span> 为编码器第 <span class=\"kb-math kb-math-inline\">i</span> 步输出。相比 ABCNet v1 的 CTC 解码器，注意力机制在 Total-Text 上提升 2.7%，在 CTW1500 上提升 7.9%。</p>\n<h5>核心机制五：自适应端到端训练（AET）</h5>\n<p>端到端训练的难点在于：训练初期检测不准确，用预测框裁剪的特征质量差，会误导识别分支。AET 策略动态调整训练样本来源：</p>\n<div class=\"kb-math kb-math-display\">\\text{sample} = \\begin{cases} \\text{GT boxes} &amp; \\text{if IoU}_{det} &lt; \\tau \\\\ \\alpha \\cdot \\text{GT} + (1-\\alpha) \\cdot \\text{Pred} &amp; \\text{otherwise} \\end{cases}</div>\n<p>随着训练推进，检测精度提升，逐步增加预测框的比例，使识别分支适应真实推理时的输入分布。该策略带来 1.2%~1.7% 的额外提升。</p>\n<h5>与传统方法的区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>传统方法 (FOTS/Mask TextSpotter)</th>\n<th>ABCNet v2</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>文本表示</td>\n<td>矩形框/像素级分割</td>\n<td>贝塞尔曲线（8 控制点）</td>\n</tr>\n<tr>\n<td>特征对齐</td>\n<td>RoIAlign/RoIRotate</td>\n<td>BezierAlign（曲线自适应）</td>\n</tr>\n<tr>\n<td>弯曲文本处理</td>\n<td>需额外矫正网络</td>\n<td>天然支持，无需矫正</td>\n</tr>\n<tr>\n<td>推理速度</td>\n<td>1-5 FPS</td>\n<td><strong>10 FPS</strong>（快 2-10×）</td>\n</tr>\n<tr>\n<td>参数效率</td>\n<td>分割需像素级标注</td>\n<td>仅 16 个坐标值</td>\n</tr>\n</tbody>\n</table></div>\n<h5>主要实验结果</h5>\n<p>在多个基准上取得 SOTA 或接近 SOTA 的端到端文本识别性能：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>数据集</th>\n<th>E2E Hmean (None)</th>\n<th>速度</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Total-Text</td>\n<td>70.4% (73.5% 多尺度)</td>\n<td>10 FPS</td>\n</tr>\n<tr>\n<td>SCUT-CTW1500</td>\n<td>57.5%</td>\n<td>10 FPS</td>\n</tr>\n<tr>\n<td>ICDAR 2015 (Generic)</td>\n<td>73.0%</td>\n<td>10 FPS</td>\n</tr>\n<tr>\n<td>ReCTS (1-NED)</td>\n<td>62.7%</td>\n<td>10 FPS</td>\n</tr>\n</tbody>\n</table></div>\n<p>检测性能：Total-Text H=87.0%, ICDAR15 H=88.1%, ReCTS H=90.4%。</p>",
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
      "detail": "<p><img alt=\"ESTextSpotter 整体架构图\" src=\"https://raw.githubusercontent.com/mxin262/ESTextSpotter/main/figs/overall.png\" />\n<em>图：ESTextSpotter 整体框架。输入图像经 CNN backbone 和 Transformer Encoder 提取多尺度特征，然后通过任务感知 Decoder 进行显式协同的检测与识别。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># ESTextSpotter 前向推理伪代码\ndef forward(image):\n    # 1. 特征提取\n    multi_scale_feats = backbone(image)          # CNN backbone (ResNet-50)\n    enhanced_feats = encoder(multi_scale_feats)  # Deformable Transformer Encoder + REM\n\n    # 2. 任务感知查询初始化 (TAQI)\n    content_query = learnable_embedding          # 共享内容查询\n    det_query = content_query + det_task_embed   # 检测查询 = 内容 + 检测任务嵌入\n    rec_query = content_query + rec_task_embed   # 识别查询 = 内容 + 识别任务嵌入\n    position_query = init_reference_points()     # 位置查询（参考点）\n\n    # 3. 任务感知 Decoder（逐层）\n    for layer in decoder_layers:\n        # 自注意力：检测查询和识别查询分别自注意力\n        det_query = self_attn(det_query)\n        rec_query = self_attn(rec_query)\n\n        # 显式交互：检测↔识别 交叉注意力\n        det_query = cross_attn(det_query, key=rec_query)\n        rec_query = cross_attn(rec_query, key=det_query)\n\n        # 交叉注意力：与编码器特征交互\n        det_query = deformable_cross_attn(det_query, enhanced_feats)\n        rec_query = deformable_cross_attn(rec_query, enhanced_feats)\n\n        # 视觉-语言通信 (VLC)\n        det_query, rec_query = VLC(det_query, rec_query)\n\n        # FFN\n        det_query = FFN(det_query)\n        rec_query = FFN(rec_query)\n\n    # 4. 预测头\n    boxes = det_head(det_query)       # 检测：边界框/多边形坐标\n    texts = rec_head(rec_query)       # 识别：字符序列\n    return boxes, texts\n</code></pre>\n<h5>动机与背景</h5>\n<p>场景文字识别（Text Spotting）需要同时完成文字检测和文字识别两个子任务。现有端到端方法大多采用<strong>隐式协同</strong>策略——即让检测和识别共享同一组特征或查询，期望模型自动学习两任务间的互利关系。然而，这种隐式方式存在根本缺陷：</p>\n<ol>\n<li><strong>特征需求冲突</strong>：检测任务需要关注文字区域的边界和形状（视觉/空间特征），而识别任务需要关注字符的语义内容（语言/纹理特征）。共享特征无法同时满足两者的差异化需求。</li>\n<li><strong>缺乏显式交互机制</strong>：隐式协同没有专门的模块确保两任务之间的信息流动，导致协同效果有限。</li>\n<li><strong>检测性能退化</strong>：实验表明，隐式协同虽能提升识别性能，但常常导致检测性能下降。</li>\n</ol>\n<div class=\"key-point\">💡 关键洞察：检测和识别虽然目标不同，但存在天然的互补关系——检测提供文字的位置和方向信息有助于确定阅读顺序，识别提供的语义信息有助于区分文字与背景。显式建模这种互补关系是提升整体性能的关键。</div>\n<h5>核心机制详解</h5>\n<p><strong>1. 任务感知查询分解</strong></p>\n<p>传统方法使用单一查询 <span class=\"kb-math kb-math-inline\">q</span> 同时服务于检测和识别。ESTextSpotter 将其分解为：</p>\n<div class=\"kb-math kb-math-display\">q_{det} = q_{content} + e_{det}, \\quad q_{rec} = q_{content} + e_{rec}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">q_{content}</span> 是共享的内容查询，<span class=\"kb-math kb-math-inline\">e_{det}</span> 和 <span class=\"kb-math kb-math-inline\">e_{rec}</span> 分别是可学习的检测和识别任务嵌入。这种设计既保留了两任务的共性基础，又允许各自发展差异化的特征表示。</p>\n<p><strong>2. 显式交互机制</strong></p>\n<p>在每个 Decoder 层中，检测查询和识别查询通过交叉注意力进行显式交互：</p>\n<div class=\"kb-math kb-math-display\">q_{det}&#x27; = \\text{CrossAttn}(Q=q_{det},\\ K=V=q_{rec})</div>\n<div class=\"kb-math kb-math-display\">q_{rec}&#x27; = \\text{CrossAttn}(Q=q_{rec},\\ K=V=q_{det})</div>\n<p>这确保了检测信息（如文字方向、边界）能流向识别分支，识别信息（如字符语义）能流向检测分支。</p>\n<p><strong>3. 视觉-语言通信模块（VLC）</strong></p>\n<p>VLC 从跨模态视角进一步增强协同。检测查询本质上编码视觉/空间信息，识别查询编码语言/语义信息。VLC 通过额外的注意力层让两种模态的信息深度融合：</p>\n<div class=\"kb-math kb-math-display\">q_{det}^{vlc} = \\text{Attn}(q_{det}&#x27;,\\ q_{rec}&#x27;) + q_{det}&#x27;</div>\n<div class=\"kb-math kb-math-display\">q_{rec}^{vlc} = \\text{Attn}(q_{rec}&#x27;,\\ q_{det}&#x27;) + q_{rec}&#x27;</div>\n<div class=\"warn-box\">⚠️ 注意：VLC 与显式交互的区别在于，VLC 在交叉注意力之后额外进行，相当于\"二次融合\"，从跨模态角度进一步释放协同潜力。消融实验显示 VLC 为端到端识别带来 +1.3% 的提升。</div>\n<p><strong>4. 感受野增强模块（REM）</strong></p>\n<p>REM 在编码器输出特征上应用多尺度空洞卷积，增强对不同尺度文字实例的感知能力。这对于场景中同时存在大小差异悬殊的文字尤为重要。</p>\n<p><strong>5. 任务感知去噪训练（TADN）</strong></p>\n<p>借鉴 DN-DETR 的去噪训练思想，TADN 同时对 GT 边界框添加位置噪声和对 GT 文本添加字符噪声：</p>\n<ul>\n<li><strong>位置噪声</strong>：对 GT 框坐标添加随机偏移</li>\n<li><strong>文本噪声</strong>：随机替换 GT 文本中的部分字符</li>\n</ul>\n<p>模型需要从含噪输入中恢复正确的检测和识别结果，这加速了训练收敛并提升了最终性能（+1.1% E2E）。</p>\n<h5>损失函数</h5>\n<p>总损失由检测损失和识别损失组成：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L} = \\lambda_1 \\mathcal{L}_{focal} + \\lambda_2 \\mathcal{L}_{L1} + \\lambda_3 \\mathcal{L}_{GIoU} + \\lambda_4 \\mathcal{L}_{CE}</div>\n<p>其中：\n- <span class=\"kb-math kb-math-inline\">\\mathcal{L}_{focal}</span>：分类损失（Focal Loss），用于文字/非文字分类\n- <span class=\"kb-math kb-math-inline\">\\mathcal{L}_{L1}</span>：边界框回归的 L1 损失\n- <span class=\"kb-math kb-math-inline\">\\mathcal{L}_{GIoU}</span>：广义 IoU 损失，增强框回归精度\n- <span class=\"kb-math kb-math-inline\">\\mathcal{L}_{CE}</span>：字符识别的交叉熵损失</p>\n<p>训练采用匈牙利匹配进行预测与 GT 的一对一分配。</p>\n<h5>与传统方法的区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>隐式协同方法 (如 TESTR, DeepSolo)</th>\n<th>ESTextSpotter (显式协同)</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>查询设计</td>\n<td>单一共享查询</td>\n<td>任务感知分解查询</td>\n</tr>\n<tr>\n<td>交互方式</td>\n<td>无显式交互模块</td>\n<td>交叉注意力显式交互</td>\n</tr>\n<tr>\n<td>特征建模</td>\n<td>统一特征表示</td>\n<td>差异化特征 + 跨模态通信</td>\n</tr>\n<tr>\n<td>检测影响</td>\n<td>常导致检测退化</td>\n<td>检测和识别同时提升</td>\n</tr>\n<tr>\n<td>去噪训练</td>\n<td>仅位置噪声</td>\n<td>位置 + 文本联合噪声</td>\n</tr>\n</tbody>\n</table></div>",
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
      "detail": "<h5>架构总览</h5>\n<p><img alt=\"LayoutLMv3 架构图\" src=\"https://ar5iv.labs.arxiv.org/html/2204.08387/assets/x2.png\" />\n<em>图：LayoutLMv3 模型架构与预训练目标。左侧为输入嵌入，右侧为三个预训练目标 MLM、MIM 和 WPA。</em></p>\n<p><img alt=\"与现有方法对比\" src=\"https://ar5iv.labs.arxiv.org/html/2204.08387/assets/x1.png\" />\n<em>图：LayoutLMv3 与 DocFormer、SelfDoc 在图像嵌入方式和预训练目标上的对比。LayoutLMv3 使用线性 patch 投影替代 CNN，使用离散 token 分类替代像素/区域特征回归。</em></p>\n<h5>算法核心流程</h5>\n<pre><code class=\"language-python\"># LayoutLMv3 预训练伪代码\n# 输入: 文档图像 I, OCR文本序列 w, 布局坐标 bbox\n\n# === 嵌入层 ===\n# 文本嵌入 (初始化自 RoBERTa)\ntext_emb = WordEmbed(w) + Pos1D(w) + LayoutPos2D(bbox)  # segment-level 2D pos\n\n# 图像嵌入 (无CNN, 线性投影)\npatches = reshape(I, [M, P*P*C])  # M=196 patches, P=16\nimage_emb = Linear(patches) + Pos1D_learnable(1..M)\n\n# 拼接输入统一 Transformer\nx = concat([CLS, text_emb, SEP, image_emb])\nh = Transformer(x)  # 12/24 layers\n\n# === 预训练目标 ===\n# 1. MLM: 30% span masking (Poisson λ=3)\nL_MLM = CrossEntropy(h[masked_text], vocab_ids[masked_text])\n\n# 2. MIM: 40% blockwise masking → 重建 DALL-E dVAE tokens\ndvae_tokens = DALL_E_Tokenizer(I)  # 离散化为 8192 类\nL_MIM = CrossEntropy(h[masked_patches], dvae_tokens[masked_patches])\n\n# 3. WPA: 对齐预测 (未掩码text ↔ 对应patch是否被掩码)\naligned = (patch_of(unmasked_word) is NOT masked)  # binary label\nL_WPA = BinaryCrossEntropy(align_head(h[unmasked_text]), aligned)\n\n# 总损失\nL = L_MLM + L_MIM + L_WPA\n</code></pre>\n<h5>动机与背景</h5>\n<p>现有文档 AI 预训练模型面临两个关键问题：</p>\n<ol>\n<li>\n<p><strong>图像特征提取依赖重型 CNN</strong>：LayoutLMv2 使用 ResNeXt101-FPN 提取网格特征，不仅参数量大、计算开销高，还需要额外的目标检测预训练（如在 COCO 上训练 Faster R-CNN）。这使得整个预训练流程复杂且难以端到端优化。</p>\n</li>\n<li>\n<p><strong>文本与图像预训练目标不统一</strong>：文本端使用 MLM 预测离散词汇 ID，但图像端的目标五花八门——DocFormer 重建原始像素（倾向学习噪声细节），SelfDoc 回归区域特征（连续空间更难优化）。这种不对称性增加了多模态融合的难度。</p>\n</li>\n</ol>\n<div class=\"key-point\">💡 关键洞察：LayoutLMv3 的核心思想是将 NLP 中成熟的\"掩码-预测\"范式统一应用到文本和图像两个模态，通过将图像离散化为 token 来消除模态间的目标函数差异。</div>\n<h5>核心机制详解</h5>\n<p><strong>1. 线性 Patch Embedding（去 CNN）</strong></p>\n<p>将文档图像 <span class=\"kb-math kb-math-inline\">I \\in \\mathbb{R}^{3 \\times 224 \\times 224}</span> 切分为 <span class=\"kb-math kb-math-inline\">M = 14 \\times 14 = 196</span> 个大小为 <span class=\"kb-math kb-math-inline\">16 \\times 16</span> 的 patch，每个 patch 展平后通过一个线性层投影到 <span class=\"kb-math kb-math-inline\">D</span> 维：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{v}_i = \\text{Linear}(\\text{flatten}(P_i)) + \\mathbf{e}_i^{1D}, \\quad i = 1, \\ldots, M</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\mathbf{e}_i^{1D}</span> 是可学习的 1D 位置嵌入。这比 ResNeXt101-FPN 减少了约 67M 参数，且无需预训练目标检测器。</p>\n<p><strong>2. Segment-level 2D 布局位置编码</strong></p>\n<p>与 LayoutLMv2 对每个 word token 独立编码 2D 坐标不同，LayoutLMv3 以 OCR segment（通常是一个完整短语或单词组）为单位，segment 内所有 subword token 共享相同的 2D 坐标。这减少了 BPE 分词导致的坐标噪声。</p>\n<p>2D 位置嵌入由 6 个可学习嵌入表组成：</p>\n<div class=\"kb-math kb-math-display\">\\text{LayoutPos2D} = \\text{Emb}(x_0) + \\text{Emb}(y_0) + \\text{Emb}(x_1) + \\text{Emb}(y_1) + \\text{Emb}(w) + \\text{Emb}(h)</div>\n<p><strong>3. Masked Image Modeling (MIM)</strong></p>\n<p>采用 blockwise masking 策略（约 40% 的 patch 被掩码），被掩码区域用可学习的 [MASK] embedding 替代。重建目标不是原始像素，而是预训练好的 DALL-E discrete VAE tokenizer 生成的离散 token（词表大小 8192）：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{MIM}} = -\\sum_{i \\in \\mathcal{M}_I} \\log p(z_i | \\mathbf{h}_i)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">z_i</span> 是第 <span class=\"kb-math kb-math-inline\">i</span> 个 patch 对应的 dVAE token ID。</p>\n<div class=\"warn-box\">⚠️ 注意：消融实验表明，如果只有 MLM 而没有 MIM，模型在图像中心任务（如 PubLayNet 版面分析）上会出现 loss 发散，无法收敛。MIM 是使模型具备视觉理解能力的关键。</div>\n<p><strong>4. Word-Patch Alignment (WPA)</strong></p>\n<p>WPA 是一个轻量级的跨模态对齐任务。对于每个<strong>未被掩码</strong>的文本 token，模型需要预测其对应位置的图像 patch 是否被掩码（二分类）：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{WPA}} = -\\sum_{j \\in \\mathcal{U}_T} \\left[ y_j \\log p_j + (1-y_j) \\log(1-p_j) \\right]</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">y_j = 1</span> 表示文本 token <span class=\"kb-math kb-math-inline\">j</span> 对应的 patch 未被掩码（即\"对齐\"），<span class=\"kb-math kb-math-inline\">y_j = 0</span> 表示对应 patch 被掩码。</p>\n<div class=\"key-point\">💡 设计巧思：WPA 只在未掩码的文本 token 上计算，避免了掩码 token 本身语义不确定带来的噪声。同时，它利用了 MIM 的掩码策略作为天然的正负样本生成器，无需额外标注。</div>\n<p><strong>5. 总预训练损失</strong></p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L} = \\mathcal{L}_{\\text{MLM}} + \\mathcal{L}_{\\text{MIM}} + \\mathcal{L}_{\\text{WPA}}</div>\n<h5>消融实验关键发现</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>配置</th>\n<th>图像嵌入</th>\n<th>预训练目标</th>\n<th>FUNSD F1</th>\n<th>PubLayNet mAP</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>#1</td>\n<td>无</td>\n<td>MLM</td>\n<td>88.64</td>\n<td>N/A</td>\n</tr>\n<tr>\n<td>#2</td>\n<td>Linear</td>\n<td>MLM</td>\n<td>89.39</td>\n<td>Loss 发散</td>\n</tr>\n<tr>\n<td>#3</td>\n<td>Linear</td>\n<td>MLM+MIM</td>\n<td>89.19</td>\n<td>94.38</td>\n</tr>\n<tr>\n<td>#4</td>\n<td>Linear</td>\n<td>MLM+MIM+WPA</td>\n<td>89.78</td>\n<td>94.43</td>\n</tr>\n</tbody>\n</table></div>\n<p>关键结论：\n- 仅添加图像 patch 而不加 MIM 目标，会导致视觉任务 loss 发散（#2）\n- MIM 是视觉能力的必要条件（#3 vs #2）\n- WPA 在文本中心和图像中心任务上均有提升（#4 vs #3）</p>\n<h5>与前代方法对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>LayoutLM</th>\n<th>LayoutLMv2</th>\n<th>LayoutLMv3</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>图像编码</td>\n<td>ResNet-101 (fine-tune)</td>\n<td>ResNeXt101-FPN</td>\n<td>Linear Patch</td>\n</tr>\n<tr>\n<td>需要预训练检测器</td>\n<td>✓</td>\n<td>✓</td>\n<td>✗</td>\n</tr>\n<tr>\n<td>图像预训练目标</td>\n<td>无</td>\n<td>对比学习</td>\n<td>MIM (离散token)</td>\n</tr>\n<tr>\n<td>跨模态对齐</td>\n<td>无</td>\n<td>MVLM+TIA+TIM</td>\n<td>WPA</td>\n</tr>\n<tr>\n<td>参数量 (BASE)</td>\n<td>160M</td>\n<td>200M</td>\n<td>133M</td>\n</tr>\n<tr>\n<td>FUNSD F1</td>\n<td>79.27</td>\n<td>82.76</td>\n<td>90.29</td>\n</tr>\n</tbody>\n</table></div>\n<h5>训练配置</h5>\n<ul>\n<li><strong>预训练数据</strong>：IIT-CDIP Test Collection（1100 万文档图像），使用其中部分数据</li>\n<li><strong>BASE 模型</strong>：12 层 Transformer，D=768，12 头，FFN=3072</li>\n<li><strong>LARGE 模型</strong>：24 层 Transformer，D=1024，16 头，FFN=4096</li>\n<li><strong>文本初始化</strong>：从 RoBERTa 权重初始化</li>\n<li><strong>图像输入</strong>：224×224，patch size=16，共 196 个 patch token</li>\n<li><strong>文本长度</strong>：最大 512 token</li>\n<li><strong>训练稳定性</strong>：采用 CogView 的 PB-Relax 注意力计算避免数值溢出</li>\n</ul>",
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
