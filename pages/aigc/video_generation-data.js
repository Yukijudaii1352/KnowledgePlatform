/**
 * video_generation-data.js — 由 pipeline/build.py 于 2026-06-15 09:55:51 自动生成。
 * 源文件：content/aigc/video_generation.md
 * ⚠️  请勿手动修改；如需更新，修改源文档后重新编译。
 */
window.PAGE_CONFIG = {
  "meta": {
    "domain": "aigc",
    "topic_id": "video_generation",
    "topic_name": "视频生成 算法总结",
    "page_title": "视频生成 算法总结",
    "page_subtitle": "2026-06-15 版",
    "page_desc": "从GAN到扩散模型再到世界模型的视频生成技术演进，涵盖Sora、Kling等里程碑模型与时序一致性核心技术",
    "page_icon": "🎬",
    "hero_pills": [
      "Sora · Kling · 时序一致性"
    ],
    "count_pill": "{count} 个算法",
    "image_base": "",
    "overview_from_doc": true,
    "latest_overview_from_doc": true
  },
  "overview": [
    {
      "title": "",
      "body_html": "<h1>拆解AI视频生成的底层心脏：深度解析视频生成底层的扩散模型革命</h1>\n<ul>\n<li>来源平台: <strong>zhihu</strong>（知乎专栏文章）</li>\n<li>原文链接: <a href=\"https://zhuanlan.zhihu.com/p/2014355599241021297\">https://zhuanlan.zhihu.com/p/2014355599241021297</a></li>\n<li>作者: 打工人小小苏</li>\n</ul>\n<hr />\n<p>拆解AI视频生成的底层心脏：深度解析视频生成底层的扩散模型革命</p>\n<h1>拆解AI视频生成的底层心脏：深度解析视频生成底层的扩散模型革命</h1>\n<p>作者: 打工人小小苏, 赞: 6</p>\n<blockquote>\n<p>作为一名深耕 NLP 的算法工程师，我们对 Transformer 的 Self-Attention 早已形成了肌肉记忆。我们习惯了在离散的 Token 空间中，通过预测下一个词（Next Token Prediction）来构建语言的宏伟殿堂。<br />\n但当你踏入视频生成领域，试图用同样的逻辑去逐个像素预测时，现实会给你一记重锤：高维连续的像素空间充满了幻觉的深渊，单纯的自回归往往导致画面崩塌。<br />\n这里发生了一场范式的革命。<strong>扩散模型（Diffusion Models）</strong>不再尝试“创造”像素，而是学习如何“清洗”噪声。本文将剥离繁复的数学表象，从<strong>小白的直观直觉</strong>出发，一路深入到<strong>2026年最前沿的流匹配（Flow Matching）与DiT架构</strong>，为你揭示AI视频生成的底层心脏是如何跳动的。</p>\n</blockquote>\n<h2>第一部分：为什么我们需要“加噪”再“去噪”？</h2>\n<p>如果你问一个普通人：“AI是怎么画出一只猫的？”<br />\n传统的直觉是：AI像一个画家，从白纸开始，一笔一笔画出耳朵、眼睛、胡须。<br />\n<strong>但在AI视频生成的世界里，逻辑完全反过来了。</strong></p>\n<h3>1.1 小白视角——核心直觉：从“无中生有”到“拨云见日”</h3>\n<p>想象你在一个浓雾弥漫的清晨站在窗前。</p>\n<ul>\n<li><strong>初始状态（</strong> <strong>t=T<em>t<em>=</em>T</em></strong> <strong>）</strong>：窗外白茫茫一片，全是随机飞舞的水汽（高斯噪声）。你完全不知道外面有什么。</li>\n<li><strong>过程（</strong> <strong>t→0<em>t</em>→0</strong> <strong>）</strong>：随着时间推移，雾气逐渐散去。起初，你只能隐约看到一些模糊的轮廓（这是猫还是狗？）；接着，五官变得清晰；最后，雾气散尽，一只栩栩如生的猫咪清晰地呈现在你眼前。</li>\n</ul>\n<p><strong>扩散模型做的正是这件事：它不画画，它只负责“驱散雾气”。</strong></p>\n<ul>\n<li><strong>为什么要先加噪（正向过程）？</strong><br />\n  真实世界的图像分布太复杂了（多模态）。有的猫是黑的，有的是白的，有的站着，有的躺着。直接让模型学习“从无到有”画出所有可能的猫，就像让它在布满孤立山峰的崎岖地形上走路，极易迷路（模式坍塌）。<br />\n  但如果我们先把所有图片都变成纯粹的噪声（高斯分布），那么<strong>所有的猫、狗、人都变成了同一种东西——随机噪声</strong>。这就给了我们一个<strong>统一的、简单的起点</strong>。</li>\n<li><strong>怎么去噪（反向过程）？</strong><br />\n  既然起点统一了，任务就简化为：训练一个模型，告诉它在每一个迷雾阶段，“往哪个方向走”能最快看到清晰的图像。<br />\n  模型不需要知道最终图像长什么样，它只需要学会<strong>预测当前的噪声是什么</strong>，然后减去它。重复这个过程几十次，图像就从噪声中“浮现”出来了。</li>\n</ul>\n<blockquote>\n<p><strong>一句话总结</strong>：扩散模型不是在做“加法”（创造像素），而是在做“减法”（去除噪声）。这是一种将极难的生成问题，转化为稳定的回归问题的天才思路。<br />\n<strong>简单原理总结</strong>：扩散模型的核心是学习一个复杂的“逆向去噪”过程。它从纯粹的噪声出发，像变魔术一样，一步步地、有策略地移除噪声，最终生成一张符合要求的、高质量的图片。你给它文字，它就努力在去噪过程中“画”出文字描述的东西。</p>\n</blockquote>\n<h3>1.2 工程师视角——从离散Token到连续流场</h3>\n<h3>数学本质：逆转熵增</h3>\n<p>在信息论中，加噪是<strong>熵增</strong>的过程，原始信息被抹除；去噪则是<strong>逆转熵增</strong>，重建秩序。</p>\n<ul>\n<li><strong>前向过程（Forward Process）</strong>：<br />\n  给定一张真实的图像 <img alt=\"x_0\" src=\"https://www.zhihu.com/equation?tex=x_0\" />，我们不断向其加入高斯噪声 <img alt=\"\\epsilon\" src=\"https://www.zhihu.com/equation?tex=%5Cepsilon\" />：</li>\n</ul>\n<p><img alt=\"x_t = \\sqrt{\\alpha_t}x_0 + \\sqrt{1-\\alpha_t}\\epsilon\" src=\"https://www.zhihu.com/equation?tex=x_t+%3D+%5Csqrt%7B%5Calpha_t%7Dx_0+%2B+%5Csqrt%7B1-%5Calpha_t%7D%5Cepsilon\" /></p>\n<p>当 <img alt=\"t\" src=\"https://www.zhihu.com/equation?tex=t\" /> 足够大时，<img alt=\"x_t\" src=\"https://www.zhihu.com/equation?tex=x_t\" /> 变成了一个标准的正态分布。这在信息论中是熵增的过程，原始信息被彻底抹除。</p>\n<ul>\n<li><strong>反向过程（Reverse Process）</strong>：<br />\n  扩散模型的核心任务是学习一个去噪器 <img alt=\"\\epsilon_\\theta(x_t, t, c)\" src=\"https://www.zhihu.com/equation?tex=%5Cepsilon_%5Ctheta%28x_t%2C+t%2C+c%29\" />，在给定当前噪声状态 <img alt=\"x_t\" src=\"https://www.zhihu.com/equation?tex=x_t\" />、时间步 <img alt=\"t\" src=\"https://www.zhihu.com/equation?tex=t\" /> 和条件约束 <img alt=\"c\" src=\"https://www.zhihu.com/equation?tex=c\" />（如 Prompt）的情况下，预测出这一步加入的噪声是多少。 本质上，模型在学习高维数据流形（Data Manifold）上的得分函数（Score Function）——即在每一个位置，指引噪声向真实数据靠拢的“引力方向”。</li>\n</ul>\n<h2>第二部分：范式转移：从 U-Net 到 DiT（Transformer 的降维打击）</h2>\n<p>在视频生成的早期（2020-2023），<strong>U-Net</strong>是绝对的王者；而到了 2024-2026 年，<strong>DiT (Diffusion Transformer)</strong>已经完成了全面接管。这不仅仅是模型结构的替换，更是处理视觉信息逻辑的根本性变革。</p>\n<h3>2.1 小白视角——从“传话游戏”到“全员群聊”</h3>\n<p>想象你要制作一部电影，需要保证主角在第 1 秒穿的红衣服，在第 10 秒依然是同一件，且动作连贯。</p>\n<ul>\n<li>\n<p><strong>U-Net 的做法：像玩“传话游戏” (The Telephone Game)</strong><br />\n  U-Net 基于传统的卷积网络，它的视野是<strong>局部</strong>的。</p>\n</li>\n<li>\n<p><strong>工作方式</strong>：它像一个站在队列里的士兵，只能看到紧邻的前后几个人。如果它想知道“队伍最前面的人在干什么”，它必须通过中间的人一个个传话过去。</p>\n</li>\n<li><strong>视频里的灾难</strong>：在视频中，信息需要跨越时间和空间传递。当“主角穿了红衣服”这个信息从第 1 帧传到第 50 帧时，经过层层传递，信息早就失真了（“红衣服”可能传成了“蓝裤子”）。</li>\n<li>\n<p><strong>结果</strong>：视频容易出现<strong>闪烁、变形、人物突然换装</strong>。因为它“记不住”太久之前的事，也“看不全”整个画面。</p>\n</li>\n<li>\n<p><strong>DiT 的做法：像拉了一个“全员群聊” (Global Group Chat)</strong><br />\n  DiT 基于 Transformer，它的核心能力是<strong>全局注意力</strong>。</p>\n</li>\n<li>\n<p><strong>工作方式</strong>：它把视频的每一帧、每一个小块都拉进一个微信群。群里的任何一个人（像素块），都可以<strong>直接</strong>@任何另一个人，无论对方是在画面的角落，还是在几秒前的时间里。</p>\n</li>\n<li><strong>视频里的降维打击</strong>：当模型要生成第 50 帧时，它可以<strong>直接</strong>“看到”第 1 帧的主角穿着红衣服，无需经过中间帧的传话。它对整个时空拥有“上帝视角”。</li>\n<li><strong>结果</strong>：主角的衣服颜色稳如泰山，动作流畅自然，甚至能理解复杂的物理规律（比如水泼出去后的轨迹）。因为它能同时统筹全局信息。</li>\n</ul>\n<blockquote>\n<p><strong>一句话总结</strong>：U-Net 是“走一步看一步，容易忘事”；DiT 是“眼观六路耳听八方，过目不忘”。对于需要高度连贯性的视频，DiT 是天然的王者。</p>\n</blockquote>\n<p><strong>2.2 工程师视角——拆解 DiT 的三大“黑科技”</strong></p>\n<ol>\n<li>Patchification（分块化）：把视频变成“乐高积木”</li>\n</ol>\n<p>在 NLP（大语言模型）中，我们把句子切成一个个“词（Token）”给模型处理。DiT 把这个思路完美移植到了视频上。</p>\n<p><strong>以前（U-Net）</strong>：模型是一像素一像素地“扫描”图像，就像用毛笔一点点画画，效率低且难以把握整体结构。</p>\n<p><strong>现在（DiT）</strong>：</p>\n<p><strong>切块</strong>：DiT 先把视频切成无数个小小的<strong>时空方块</strong>（比如 2 帧高、16 像素宽、16 像素高的小立方体）。</p>\n<p><strong>序列化</strong>：把这些小方块展平，变成一串长长的“列表”。</p>\n<p><strong>意义</strong>：这样一来，视频生成问题就变成了和写文章一样的问题——<strong>“预测下一个方块是什么”</strong>。这让视频模型可以直接复用大语言模型（LLM）那些成熟的训练技巧和基础设施。原本复杂的三维视频数据，被巧妙地转化为了模型擅长的“序列数据”。</p>\n<ol>\n<li>AdaLN（自适应归一化）：给模型戴上“动态眼镜”</li>\n</ol>\n<p>视频生成有两个关键条件：<strong>“现在进行到哪一步了？”（时间步）</strong> 和 <strong>“用户想要什么内容？”（文本提示）</strong>。</p>\n<p><strong>以前的做法</strong>：通常是用一种比较生硬的方式把条件“塞”给模型，模型很难灵活调整。</p>\n<p><strong>DiT 的革新 (AdaLN)</strong>：</p>\n<p>想象模型是一个演员。AdaLN 就像是导演手里的一套<strong>“动态调节器”</strong>。</p>\n<p><strong>时间调节</strong>：在去噪的初期（全是噪声时），导演告诉演员：“别管细节，先勾勒大轮廓！”；在去噪的后期（快完成时），导演说：“现在专注刻画毛孔和光影！”模型会根据阶段自动切换状态。</p>\n<p><strong>内容调节</strong>：同时，导演还会带上“语义耳机”，告诉演员：“现在你要演一只猫，不是狗。”</p>\n<p><strong>效果</strong>：这种机制让同一个模型权重，能在不同的时间点、针对不同的提示词，表现出完全不同的行为模式。它极大地提升了生成的<strong>可控性</strong>和<strong>细腻度</strong>，是让视频既符合物理规律又符合用户指令的关键。</p>\n<ol>\n<li>Scaling Law（缩放定律）：大力出奇迹的“入场券”</li>\n</ol>\n<p>这是 DiT 取代 U-Net 的最根本原因，也是大模型时代的终极真理。</p>\n<p><strong>U-Net 的瓶颈</strong>：传统的 U-Net 架构就像一辆老式卡车，你给它换更大的引擎（增加参数），它的速度提升很慢，甚至会因为车身太重（结构复杂）而跑不动。它的性能是有天花板的。</p>\n<p><strong>DiT 的红利</strong>：</p>\n<p>DiT 的结构非常纯粹、规整（就是一堆 Transformer 层堆叠）。这意味着，<strong>只要你给更多的数据、更大的显存、更多的参数，它的智能程度就会线性甚至指数级上升。</strong></p>\n<p><strong>现实验证</strong>：这就是为什么 Sora、Wan 2.1 等模型敢做到 100 亿、140 亿参数。因为它们遵循<strong>Scaling Law</strong>——参数量越大，它学到的物理规律（重力、碰撞、流体）就越真实，生成的视频就越不像“假”的。</p>\n<p><strong>结论</strong>：U-Net 是在“手工打磨零件”，而 DiT 是在“堆算力换智能”。在算力飞速发展的今天，DiT 是唯一能吃到时代红利的架构。</p>\n<h2>第三部门：主流架构横向评测</h2>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>架构类型</th>\n<th>代表模型</th>\n<th>核心杀手锏</th>\n<th>商业场景</th>\n<th>单5秒720P生成速度 (RTX4090)</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>3D U-Net</td>\n<td>ImagenVideo</td>\n<td>结构成熟、控制力强</td>\n<td>早期研究/短片段</td>\n<td>~12分钟</td>\n</tr>\n<tr>\n<td>DiT (全量)</td>\n<td>Sora / Gen-3</td>\n<td>极致画质、长序列建模</td>\n<td>电影/高质量创作</td>\n<td>~8分钟</td>\n</tr>\n<tr>\n<td>3D因果VAE+DiT</td>\n<td>Wan 2.2</td>\n<td>时空压缩率极高，显存友好</td>\n<td>商用内容/本地部署</td>\n<td>~4分钟</td>\n</tr>\n<tr>\n<td>蒸馏优化(rCM)</td>\n<td>优化版 Wan / SD</td>\n<td>极速采样，百步变两步</td>\n<td>实时交互/短视频生产</td>\n<td>~5秒</td>\n</tr>\n</tbody>\n</table></div>\n<h2>第四部分：从“静止”到“流动”——扩散模型如何适配视频生成？</h2>\n<p>理解了 DiT 架构的强大后，我们面临一个更严峻的挑战：<strong>如何让这个擅长处理静态图像的“画家”，变成一位能执导动态电影的“导演”？</strong></p>\n<p>如果直接把图片生成模型拿来生成视频，结果往往是一场灾难：画面会像坏掉的电视一样疯狂闪烁，人物会在帧与帧之间瞬间变脸，甚至物体违反物理定律地瞬移。</p>\n<p>这是因为视频不仅仅是“连续的图片”，它多了一个至关重要的维度——<strong>时间（Time）</strong>。<br />\n为了让扩散模型真正“动起来”，工程师们在三个核心维度进行了颠覆性的改造。让我们再次透过<strong>小白直觉</strong>与<strong>进阶剖析</strong>的双重视角，拆解这场技术进化。</p>\n<h3>改造一：给模型装上“时间眼睛” —— 时空注意力机制</h3>\n<p><strong>小白视角——从“看照片”到“看电影”</strong></p>\n<p>想象原来的图像模型是一个只会看照片的人。你给它看第 5 帧画面，它只关心这一帧里的像素怎么排列，完全不知道第 4 帧发生了什么，更不在乎第 6 帧要去哪。所以，它生成的每一帧都是独立的，拼在一起自然就闪烁、断裂。</p>\n<p><strong>改造后的视频模型</strong>，我们强行给它戴上了一副<strong>“3D 时空眼镜”</strong>：</p>\n<ul>\n<li><strong>回头望</strong>：当它在绘制第 5 帧的某个像素时，它不仅看当前的画面，还会<strong>直接“回头看”</strong>第 1、2、3、4 帧对应位置的样子。</li>\n<li><strong>向前看</strong>：它甚至会预判：“上一帧这里有个车头朝左，那这一帧车头应该继续向左移动，而不是突然消失。”</li>\n<li><strong>效果</strong>：通过这种<strong>“跨帧参考”</strong>，模型强行把前后几十帧的画面“粘”在了一起。它不再是在画一张张孤立的画，而是在编织一条连贯的时间线。</li>\n</ul>\n<blockquote>\n<p><strong>一句话总结</strong>：图像模型是“走一步看一步，容易忘事”；视频模型是“眼观六路，过目不忘”，确保了主角不会在第 10 秒突然换装或变形。</p>\n</blockquote>\n<p><strong>工程师视角——3D Attention 与时空分离策略</strong></p>\n<p>在 DiT 架构中，这一改造是通过扩展 <strong>Self-Attention（自注意力）</strong> 机制实现的，核心在于打破时间的壁垒。</p>\n<p><strong>1.全量 3D Token 交互</strong>：<br />\n视频被切分为 (T,H,W)(<em>T</em>,<em>H</em>,<em>W</em>) 的时空块（Patches）。在计算 Attention 时，Query、Key、Value 不再局限于同一帧，而是来自<strong>整个视频片段的所有帧</strong>。</p>\n<ul>\n<li><strong>数学本质</strong>： Attention(Q,K,V)<em>Attention</em>(<em>Q</em>,<em>K</em>,<em>V</em>) 中的 K<em>K</em> 和 V<em>V</em> 包含了所有时间步 t∈[0,T]<em>t</em>∈[0,<em>T</em>] 的信息。这使得模型能直接建立 t<em>t</em> 时刻与 t−k<em>t</em>−<em>k</em> 时刻的长程依赖（Long-term Dependency），从根本上解决了时序一致性问题。</li>\n</ul>\n<p>2.<strong>时空分离注意力（Spatio-Temporal Separated Attention）</strong>：<br />\n直接做全量的 3D Attention 计算量是爆炸的（复杂度 O((THW)2)<em>O</em>((<em>THW</em>)2) ）。为了工程落地，主流模型（如 Sora, Wan, AnimateDiff）采用了<strong>分解策略</strong>：</p>\n<ul>\n<li><strong>空间注意力（Spatial Attn）</strong>：先在每一帧内部独立计算，专注于纹理、边缘等空间细节。</li>\n<li><strong>时间注意力（Temporal Attn）</strong>：再在每一个空间位置 across 时间轴进行计算，专注于运动轨迹、速度变化。</li>\n<li><strong>优势</strong>：这种设计将计算复杂度从立方级降低到线性可接受范围，使得生成长视频（如 5 秒、10 秒以上）在消费级显卡上成为可能。</li>\n</ul>\n<h3>改造二：压缩时间的魔法 —— 3D VAE</h3>\n<p><strong>小白视角——把“厚字典”压缩成“薄便签”</strong></p>\n<ul>\n<li><strong>痛点</strong>：原始视频数据太庞大了。1 秒 30 帧的 1080P 视频，像素点多得吓人。如果让扩散模型直接在这些像素上“去噪”，显存瞬间就会爆满，生成一个镜头可能需要几天几夜。</li>\n<li>\n<p><strong>解决方案</strong>：我们在扩散模型前面加了一个<strong>“超级压缩机”（3D VAE）</strong>。</p>\n</li>\n<li>\n<p><strong>压缩过程</strong>：它把连续的几十帧高清视频，“揉”成一个极小的、高密度的<strong>潜在向量（Latent Vector）</strong>。</p>\n</li>\n<li><strong>比喻</strong>：就像把一部厚厚的电影剧本（原始视频），浓缩成了一张写满密码的<strong>小纸条</strong>（Latent）。这张纸条里既隐含了画面信息，也编码了动作信息。</li>\n<li><strong>工作流程</strong>：扩散模型不再处理庞大的像素，而是在这张小小的“密码纸条”上进行去噪运算。因为数据量缩小了百倍，计算速度提升了千倍。生成完成后，再用另一个解码器把“纸条”还原成高清视频。</li>\n</ul>\n<blockquote>\n<p><strong>一句话总结</strong>：3D VAE 是视频生成的“降维打击”利器，它让模型在“低维空间”里思考复杂的运动，最后在“高维空间”里呈现惊艳的画质。</p>\n</blockquote>\n<p><strong>工程师视角——因果卷积与时间下采样</strong></p>\n<p>这是视频生成能从“实验室”走向“实时应用”的工程关键。</p>\n<ol>\n<li>\n<p><strong>3D 卷积与时间下采样</strong>：<br />\n   普通的图像 VAE 只在空间 (H,W)(<em>H</em>,<em>W</em>) 上压缩。视频 VAE 必须在时间 (T)(<em>T</em>) 维度上也进行压缩。</p>\n</li>\n<li>\n<p><strong>机制</strong>：例如，输入 16 帧原始视频，输出可能只有 2 帧深度的 Latent 张量（时间压缩 8 倍）。</p>\n</li>\n<li><strong>挑战</strong>：如何在极度压缩下保留运动矢量（Motion Vector）信息？这要求 VAE 的编码器经过特殊训练，学会在低维空间中“记住”物体的位移趋势。</li>\n</ol>\n<p><strong>2.因果性（Causality）的决定性作用</strong>：</p>\n<ul>\n<li><strong>非因果 VAE</strong>：生成第 t<em>t</em> 帧的 Latent 时，“偷看”了第 t+1<em>t</em>+1 帧的信息。这在训练中效果很好，但在<strong>推理时（实时生成）</strong>是不可用的，因为未来还没发生。</li>\n<li><strong>因果 3D VAE</strong>：严格限制卷积核只能利用<strong>当前帧和历史帧</strong>（Causal Convolution）。</li>\n<li><strong>意义</strong>：这是实现<strong>实时视频流生成</strong>和<strong>长视频无限续写</strong>的前提。最新的 Wan 2.1、Kling 等模型均采用因果 3D VAE，确保了生成过程符合严格的时间因果律，不会出现“预知未来”的作弊行为。</li>\n</ul>\n<h3>改造三：注入物理常识 —— 从“看图说话”到“世界模拟”</h3>\n<p><strong>小白视角——不仅要“看过”，还要“懂物理”</strong></p>\n<ul>\n<li><strong>以前的做法</strong>：给模型看几百万张静态图片，指望它自己悟出“苹果松手会往下掉”。结果模型经常画出苹果往上飞，或者人走路脚不沾地，因为它没见过“过程”。</li>\n<li>\n<p><strong>现在的做法</strong>：</p>\n</li>\n<li>\n<p><strong>喂视频数据</strong>：直接给模型看成千上万段高质量视频。让它亲眼看到水流怎么流、火怎么烧、人怎么跑、布料怎么飘。</p>\n</li>\n<li><strong>文本 - 视频对齐</strong>：训练时，不仅告诉模型“这是一只猫”，还要告诉它“这只猫在跳跃”。模型学会了将<strong>文字描述的动作</strong>与<strong>像素随时间的变化规律</strong>对应起来。</li>\n<li><strong>结果</strong>：模型不仅仅是记住了画面，它隐式地学习了一个<strong>“世界模拟器”</strong>。它知道了物体是有体积的（不会穿模），是有重力的（抛物线运动），是有惯性的。</li>\n</ul>\n<blockquote>\n<p><strong>一句话总结</strong>：现在的视频模型不再是简单的“图片拼接器”，而是一个<strong>基于概率的物理引擎</strong>。它在数字世界里重构了重力、光影和碰撞规则。</p>\n</blockquote>\n<p><strong>工程师视角——World Model 与 Flow Matching 的融合</strong></p>\n<ol>\n<li><strong>大规模视频 - 文本对训练</strong>：<br />\n   利用 CLIP 或 T5 等大语言模型提取视频的深度语义，构建海量的 (Video,Text)(<em>Video</em>,<em>Text</em>) 对。模型在去噪过程中，学习的是条件概率分布 p(xvideo∣text)<em>p</em>(<em>xvideo</em>​∣<em>text</em>) ，即如何根据文本指令推演出一段符合物理规律的视频序列。</li>\n<li>\n<p><strong>Resolution &amp; Duration Scaling</strong>：</p>\n</li>\n<li>\n<p><strong>课程学习（Curriculum Learning）</strong>：先训练低分辨率短片段，再通过<strong>位置编码插值（Positional Embedding Interpolation）</strong>微调高分辨率长视频。DiT 架构的扩展性使得这种“从小到大”的训练策略极其高效。</p>\n</li>\n<li><strong>Flow Matching 的加持</strong>：结合前文提到的流匹配技术，视频生成的轨迹更加平滑。直线路径减少了随机噪声的干扰，使得物体在长时间序列中的运动轨迹更加稳定，显著减少了“抖动”和“突变”，让物理模拟更加逼真。</li>\n</ol>\n<p><strong>总结：</strong>视频生成模型的“三驾马车”</p>\n<p>如果把视频生成模型比作一辆赛车，那么这三项改造就是它的核心组件，缺一不可：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>改造点</th>\n<th>核心作用</th>\n<th>关键技术词</th>\n<th>通俗比喻</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>时空注意力</td>\n<td>解决连贯性</td>\n<td>3D Attention, Temporal Block, RoPE 3D</td>\n<td>给模型装上“时间眼睛”，让它能回头看</td>\n</tr>\n<tr>\n<td>3D VAE</td>\n<td>解决算力瓶颈</td>\n<td>Latent Space, Causal Conv, Downsample T</td>\n<td>把厚字典压缩成薄便签，降维打击</td>\n</tr>\n<tr>\n<td>大规模视频训练</td>\n<td>解决物理规律</td>\n<td>Video-Text Pairs, World Model, Flow Matching</td>\n<td>从“看图说话”进化为“世界模拟”</td>\n</tr>\n</tbody>\n</table></div>"
    }
  ],
  "latest_overview": [
    {
      "title": "",
      "body_html": "<h1>CVPR 2026 视频模型趋势梳理：不止生成下一帧，更要理解下一步</h1>\n<ul>\n<li>来源平台: <strong>zhihu</strong>（知乎专栏文章）</li>\n<li>原文链接: <a href=\"https://zhuanlan.zhihu.com/p/2037598361134577057\">https://zhuanlan.zhihu.com/p/2037598361134577057</a></li>\n<li>作者: AI科技评论</li>\n</ul>\n<hr />\n<p>CVPR 2026 视频模型趋势梳理：不止生成下一帧，更要理解下一步</p>\n<h1>CVPR 2026 视频模型趋势梳理：不止生成下一帧，更要理解下一步</h1>\n<p>作者: AI科技评论, 赞: 13</p>\n<p><img alt=\"\" src=\"https://picx.zhimg.com/v2-e52eddd442f13ab87131761e4f2ca60d_1440w.jpg\" /></p>\n<p>视频智能正从画面生成走向运动控制、动态建模、信号理解与真实场景应用。</p>\n<p>编辑丨马晓宁</p>\n<p><strong><em>*<img alt=\"\" src=\"https://pic4.zhimg.com/v2-6a7f46d4391e7003d356222bebf86631_1440w.jpg\" /></em></strong>*</p>\n<p>过去，视频生成更多是在解决“像不像”的问题：人物是否清晰，画面是否流畅，风格是否统一。但随着模型能力提升，视频真正困难的部分开始显现出来——它不是一组漂亮帧的连续播放，而是一个由时间、空间、运动、相机、光照和物理信号共同构成的动态系统。</p>\n<p>只要模型无法理解这些隐含结构，它生成的视频就可能看似逼真，却在运动逻辑、视角一致性或真实场景适应上露出破绽。因此，视频智能正在进入一个更深的阶段：不只是生成画面，而是理解画面为什么会这样变化。</p>\n<p>从运动轨迹编辑、3D 结构约束、可迭代文生视频，到自适应视频 token、长期运动表征、频闪去除、热成像分离和地球观测模型，研究者实际上都在处理同一个底层问题：如何让模型把视频从“像素序列”理解为“动态世界”。</p>\n<p>这也是今年 CVPR 相关方向中一个值得注意的信号——<strong>视频模型的竞争重心，正在从视觉质量转向对时间、空间和物理规律的建模能力。</strong></p>\n<p>换句话说，视频 AI 的下一步，不是单纯把视频生成得更长、更清楚、更炫，而是让模型知道运动从哪里来、结构为什么稳定、信号如何形成，以及复杂场景中的变化如何被预测和控制。</p>\n<p>当这些能力逐渐补齐，视频模型才可能真正从内容生成工具，走向能够理解、编辑和推演现实世界的动态智能系统。</p>\n<p><strong>01</strong></p>\n<h2></h2>\n<h2><strong><em>*</em>*从改画面到改运动</strong>****</h2>\n<p>视频生成和视频编辑正在从“画面是否好看”，走向“运动是否可控”。谷歌和石溪大学共同提出的<strong>《MotionV2V: Editing Motion in a Video》</strong>研究的正是如何不只修改视频风格或局部外观，而是直接编辑视频里的“运动”。</p>\n<p>比如让人物换方向、让物体晚一点出现，或在保留场景内容的同时改变镜头运动。现有方法一旦涉及物体运动、相机轨迹或时间顺序变化，就很难保留原视频后续帧中已有的内容。</p>\n<p>MotionV2V 的核心思路是把视频运动表示成稀疏轨迹点，并让用户直接编辑这些轨迹。系统先从输入视频中提取物体或场景点的原始运动轨迹，用户再指定目标运动，模型根据“原始轨迹”和“目标轨迹”之间的差异生成编辑后的视频。论文把这种差异称为 motion edit，并用它指导视频扩散模型，在尽量保留原视频内容的同时，让目标物体或相机按新的方式运动。</p>\n<p><img alt=\"\" src=\"https://pic4.zhimg.com/v2-bd7e5d20b30a3ce22f6527eba68a37d3_1440w.jpg\" /></p>\n<p>它的亮点在于，MotionV2V 不是从单张图片重新生成视频，而是真正以完整输入视频为条件进行 video-to-video motion editing。因此它可以利用视频中任意时间点的信息，处理首帧里还没出现的物体，也能支持物体运动、相机运动、时间控制和连续多次编辑。</p>\n<p>作者还构建了 motion counterfactuals，即内容相同但运动不同的视频对，用来微调 motion-conditioned video diffusion 架构。从论文对比来看，MotionV2V 在内容保留、运动控制和整体编辑质量上优于已有方法，用户研究中也获得约 70% 的偏好率。整体来看，这篇论文把视频编辑从“改外观”推进到“改运动”。</p>\n<p><img alt=\"\" src=\"https://pic1.zhimg.com/v2-9aca33fb353cfe2ab6e6f8157d135322_1440w.jpg\" /></p>\n<p>当运动编辑涉及相机、物体和非刚性形变时，仅靠 2D 运动线索往往不够。Adobe 和马里兰大学帕克分校共同提出的<strong>《Generative Video Motion Editing with 3D Point Tracks》</strong>进一步使用 3D point tracks 作为统一的运动控制表示，同时改变视频里的相机运动和物体运动。</p>\n<p>系统会先估计输入视频中的相机参数和 3D 点轨迹，用户编辑相机运动或物体轨迹后，再由 video-to-video 生成模型合成新视频。</p>\n<p><img alt=\"\" src=\"https://pic1.zhimg.com/v2-623598d9fd4ad0cd4b153686bd89cfea_1440w.jpg\" /></p>\n<p>相比 2D 轨迹，3D 轨迹提供了深度信息，可以帮助模型判断遮挡关系、前后层次和真实空间运动。论文还设计了 3D track conditioner，通过 cross-attention 从输入视频中采样视觉上下文，并把这些信息对齐到目标帧空间中，让模型在改变运动的同时保持画面连贯。</p>\n<p>由于真实世界中很难获得成对训练数据，作者采用两阶段训练：先用合成数据学习基础运动控制，再用真实单目视频构造非连续片段对，缩小合成到真实的差距。整体来看，这篇论文把视频运动编辑推进到更 3D-aware 的阶段，也支持运动迁移、非刚性变形、物体移除和复制等效果。</p>\n<p><img alt=\"\" src=\"https://pica.zhimg.com/v2-98af03eee9e2ddbf0afc0d48b385cc92_1440w.jpg\" /></p>\n<p>如果输入只有一张物体图像，模型如何在相机绕物体旋转时生成稳定、真实、结构一致的视频？澳大利亚国立大学和亚马逊共同提出的<strong>《Towards Realistic and Consistent Orbital Video Generation via 3D Foundation Priors》</strong>研究的就是从单张物体图像生成 orbital video。现有视频生成方法在大角度视角变化时缺少可靠像素对应关系，容易生成结构扭曲或不合理的物体形状。</p>\n<p><img alt=\"\" src=\"https://pic3.zhimg.com/v2-9e714e9ce26c9f00c506f06223867448_1440w.jpg\" /></p>\n<p>这篇论文的核心思路是引入 3D foundation model 中学到的形状先验，用它辅助视频扩散模型生成更稳定的环绕视频。模型从单张输入图像中提取两类 3D latent features：全局 latent vector 提供整体结构指导，体积特征投影得到的 latent images 提供随视角变化的几何细节。</p>\n<p>相比深度图或法线图，这些 3D latent features 能表达更完整的物体形状，也避免显式提取 mesh 的额外开销。作者还设计了 multi-scale 3D adapter，把不同尺度的 3D 特征接入基础视频模型，从而提升生成视频的真实感、物体形状合理性和多视角一致性。</p>\n<p><img alt=\"\" src=\"https://pica.zhimg.com/v2-282b10dc5f84bd619c56bdbc58d61714_1440w.jpg\" /></p>\n<p>谷歌和新加坡国立大学共同提出的<strong>《VISTA: A Test-Time Self-Improving Video Generation Agent》</strong>则把重点放在生成流程本身：当用户给出文本想法后，系统能不能反复评估、反思和修改，直到生成更符合意图的视频。</p>\n<p>它研究的是 test-time self-improvement，也就是不重新训练视频生成模型，而是在推理阶段通过反复评价和改写 prompt 来提升结果。</p>\n<p>VISTA 会先把用户想法拆成带有时间结构的场景计划，包括时长、角色、动作、对白、环境、相机、声音和情绪等要素；生成多个候选视频后，通过 pairwise tournament 选出当前最好结果；随后由视觉、音频和上下文评审智能体提出意见，最后由 reasoning agent 综合反馈并改写 prompt，进入下一轮生成。</p>\n<p><img alt=\"\" src=\"https://pic2.zhimg.com/v2-b92a322af46b1edc79e1d86a5549462d_1440w.jpg\" /></p>\n<p>它的亮点在于，VISTA 不是只优化某个指标，而是把视频规划、候选筛选、多维度评价和提示词重写串成自动闭环。论文中提到，VISTA 在自动指标下相较先进基线最高达到 60% 的 pairwise win rate，在人工评测中也获得 66.4% 的偏好率。整体来看，它把文生视频从“一次性生成”推进到“生成—评价—反思—再生成”。</p>\n<p><img alt=\"\" src=\"https://picx.zhimg.com/v2-3cf59476bd7c044e12aaace9ec732dbf_1440w.jpg\" /></p>\n<p><strong>02</strong></p>\n<h2></h2>\n<h2><strong><em>*</em>*让模型先学会「怎么动」</strong>****</h2>\n<p>要让视频模型更好地生成和编辑内容，底层表示也需要更高效。上海交通大学、香港中文大学多媒体实验室、上海人工智能实验室 OpenGVLab、同济大学、清华大学共同提出的<strong>《AdapTok: Learning Adaptive and Temporally Causal Video Tokenization in a 1D Latent Space》</strong>研究的是视频 tokenization 问题，也就是如何把连续视频帧压缩成更适合自回归模型处理的离散 token。</p>\n<p><img alt=\"\" src=\"https://pic1.zhimg.com/v2-9970a279b9c32b5973d77d6ac10d7fb8_1440w.jpg\" /></p>\n<p>AdapTok 的核心思路是让视频 token 分配变得自适应。它不是给每个时间段分配同样多的 token，而是根据视频内容、时间变化和整体预算，动态决定哪里多用 token、哪里少用 token。</p>\n<p>它使用 1D latent token space 表示视频，并引入 temporal causality，让前面帧的编码和解码不依赖未来帧，更适合流式处理和自回归生成；同时通过 block-wise masking、block causal scorer 和 IPAL 策略完成自适应分配。</p>\n<p>这样一来，运动明显、场景变化大的片段会获得更多 token，静态或冗余片段则使用更少 token。在 UCF-101 和 Kinetics-600 任务中，AdapTok 在不同 token 预算下都能提升重建质量和生成表现。</p>\n<p><img alt=\"\" src=\"https://pica.zhimg.com/v2-ea802fd7f15e45940b4f58885568a064_1440w.jpg\" /></p>\n<p>AdapTok 解决的是视频如何被高效表示，而 CompVis @ LMU、MCML 和苹果共同提出的<strong>《Learning Long-term Motion Embeddings for Efficient Kinematics Generation》</strong>进一步追问：如果只是理解未来怎么动，是否一定要完整生成像素视频。论文转向学习一种更紧凑的 long-term motion embedding，用来表示场景中的长期运动规律。</p>\n<p>它从大规模 tracker 模型得到的轨迹数据中学习压缩运动空间，把稀疏轨迹和起始帧编码成 latent motion grid，并可在任意空间查询点上重建密集运动；随后在这个运动 latent 空间里训练 conditional flow-matching 模型，根据文本任务描述或 spatial pokes 生成长期运动。这种表示可达到 64 倍时间压缩，也就是说模型不用逐帧生成视频，就能在更抽象的运动空间中推断未来动态。</p>\n<p><img alt=\"\" src=\"https://picx.zhimg.com/v2-a2cd67c6055461c8eb2b348a0c578aeb_1440w.jpg\" /></p>\n<p>这篇论文的亮点在于，它把“生成视频”拆成了更基础的“生成运动”。这种 kinematics-first 方式更适合探索多个可能未来，也更适合机器人规划、轨迹预测和长期动态建模。</p>\n<p>在开放域互联网视频和 LIBERO 机器人基准上，它的运动生成质量、条件遵循能力和效率都优于专门轨迹预测方法以及 Wan、Veo 3 等视频模型基线。整体来看，AI 不一定要先“画出未来”，也可以先学会“未来应该怎么动”。</p>\n<p><img alt=\"\" src=\"https://pic4.zhimg.com/v2-da552462ee4a713b6c2f8bf465abe97d_1440w.jpg\" /></p>\n<p><strong>03</strong></p>\n<h2></h2>\n<h2><strong><em>*</em>*从修复画面到理解信号来源</strong>****</h2>\n<p>除了生成和编辑，视频与图像研究也在关注如何从复杂成像退化中恢复可靠信息。南开大学国际先进研究院、鹏城实验室、南开大学计算机学院、香港理工大学、OPPO 研究院共同提出的<strong>《It Takes Two: A Duet of Periodicity and Directionality for Burst Flicker Removal》</strong>研究的是短曝光连拍图像中的 flicker artifact 去除问题。</p>\n<p>这类退化由人工光源频闪和 rolling shutter 共同造成，表现为条纹状、明暗不均的闪烁，不能简单当作普通噪声或低光增强处理。</p>\n<p>Flickerformer 的核心思路是利用闪烁退化的周期性和方向性。周期性来自交流电光源亮度变化，方向性与相机逐行扫描机制有关。针对这两个特点，Flickerformer 设计了 PFM、AFFN 和 WDAM 三个模块，分别用于帧间相位相关融合、单帧自相关建模，以及小波域方向性高频修复。</p>\n<p><img alt=\"\" src=\"https://pic3.zhimg.com/v2-412ddd38d28888514eaede247db85fbe_1440w.jpg\" /></p>\n<p>它的亮点在于，把频闪本身的物理先验嵌入网络结构里，而不是把 flicker removal 当成普通图像增强任务。在 BurstDeflicker benchmark 上，Flickerformer 超过多种图像复原和 burst restoration 方法，取得 31.226 PSNR、0.920 SSIM、0.045 LPIPS。整体来看，这篇论文让模型能够更准确地去除条纹闪烁，同时保留细节并减少重影。</p>\n<p>类似思路也出现在热成像研究中。CMU 提出的<strong>《Dual Band Video Thermography: Separating Time-Varying Reflection and Emission Near Ambient Conditions》</strong>研究的是热成像中的发射 / 反射分离问题。</p>\n<p>热相机看到的长波红外信号既可能来自物体自身热辐射，也可能来自周围环境反射；在接近室温的日常场景中，这两部分信号强度接近且都会随时间变化，因此很难判断亮暗变化到底来自物体温度变化，还是背景反射。</p>\n<p><img alt=\"\" src=\"https://pic4.zhimg.com/v2-6cd665eb64dffd6b45834b960a897e3f_1440w.jpg\" /></p>\n<p>论文提出 dual-band thermal videography，用两个长波红外子波段视频分离“物体自身发射”和“背景反射”。它同时利用光谱线索和时间线索：同一材料在两个波段中的发射率比例相对固定，而物体热传导变化通常更平滑、背景反射变化更快。</p>\n<p>实验中，方法能把咖啡壶升温时的热发射与旁边移动人物的反射分开，也能区分玻璃板上的手指热印和手指反射。在酒杯和咖啡壶视频中的非校准温度估计误差分别约为 1.72% 和 5.34%。整体来看，这篇论文把热成像从“看到温度分布”推进到“理解热信号来源”。</p>\n<p><img alt=\"\" src=\"https://pic3.zhimg.com/v2-65c6483b8a4fec73226f8f2bb84040d6_1440w.jpg\" /></p>\n<p><strong>04</strong></p>\n<h2></h2>\n<h2><strong><em>*</em>*让视觉模型进入真实世界任务</strong>****</h2>\n<p>当视觉模型进入遥感和地球观测场景时，问题会比普通图像更复杂：模型不仅要处理图像，还要同时理解时间序列、多源数据和地图标注。艾伦人工智能研究所、华盛顿大学、亚利桑那州立大学、不列颠哥伦比亚大学联合提出的<strong>《Helios: Stable Latent Image Modeling for Multimodal Earth Observation》</strong>研究的是面向地球观测数据的多模态基础模型。</p>\n<p>地球观测数据既有图像空间结构，也有类似视频或文本的时间序列特征，还包含卫星影像、地图、地形、作物、土地覆盖等多种模态。</p>\n<p>这篇论文提出的模型叫 OlmoEarth，目标是让地球观测基础模型更稳定、更高效，也更容易落地到环保、人道主义和公共利益相关任务中。它不只训练模型，还配套构建端到端平台，用于数据收集、标注、训练和推理，降低真实组织使用前沿地球观测模型的门槛。</p>\n<p><img alt=\"\" src=\"https://pica.zhimg.com/v2-56ce3bc9907b00f3c8c2e94bb486c9ee_1440w.jpg\" /></p>\n<p>OlmoEarth 的核心方法是 Latent MIM Lite。它用随机初始化、训练中冻结的线性投影层，把图像 patch 投到 token 空间作为预测目标，在保留 latent modeling 表征能力的同时提升训练稳定性。这个设计还把自监督数据和带标注地图数据统一到同一个 token 空间里，让模型可以用相同损失学习观测数据和标签地图。</p>\n<p>针对遥感数据空间、时间和模态高度冗余的问题，OlmoEarth 采用 modality-aware masking，让模型必须从其他时间、空间或模态中推断缺失信息；同时只在同一 bandset 内进行 token 对比，避免大量“太容易”的负样本削弱训练效果。</p>\n<p>综合评估中，OlmoEarth 与 12 个其他基础模型相比，在 embedding 评估中于 24 个任务里的 15 个取得最好表现；在 full fine-tuning 设置下，于 29 个任务里的 19 个取得最好表现。整体来看，这篇论文为地球观测任务提出了一个更稳定、更开放、更面向真实应用的多模态基础模型体系。</p>\n<p><img alt=\"\" src=\"https://pic3.zhimg.com/v2-91c4cf8b3127b3bc0e75f6a336f10c76_1440w.jpg\" /></p>\n<p>这次去 CVPR 现场，一定不要错过</p>\n<p>【认识大牛+赚外快】的机会</p>\n<p>需要你做什么：把你最关注的10个大会报告，每页PPT都拍下来</p>\n<p>你能获得什么？</p>\n<p>认识大牛：你将可以进入CVPR名师博士社群；</p>\n<p>钱多活少：提供丰厚奖金，任务量精简；</p>\n<p>听会自由：你的行程你做主，顺手就把外快赚。拍下你最感兴趣的10个报告PPT即可。</p>\n<p>【限额5位，先到先得】</p>\n<p>//</p>"
    }
  ],
  "graph": {
    "nodes": [
      {
        "id": "videogan",
        "x": 2016,
        "y": 1,
        "category": "gan_based"
      },
      {
        "id": "tgan",
        "x": 2017,
        "y": 1,
        "category": "gan_based"
      },
      {
        "id": "mocogan",
        "x": 2018,
        "y": 1,
        "category": "gan_based"
      },
      {
        "id": "svg",
        "x": 2018,
        "y": 2,
        "category": "vae_based"
      },
      {
        "id": "videogpt",
        "x": 2021,
        "y": 3,
        "category": "autoregressive"
      },
      {
        "id": "nuwa",
        "x": 2021.9,
        "y": 3,
        "category": "autoregressive"
      },
      {
        "id": "cogvideo",
        "x": 2022.4,
        "y": 3,
        "category": "autoregressive"
      },
      {
        "id": "nuwa_infinity",
        "x": 2022.6,
        "y": 3,
        "category": "autoregressive"
      },
      {
        "id": "svd",
        "x": 2023.9,
        "y": 4,
        "category": "diffusion_based"
      },
      {
        "id": "gen1",
        "x": 2023.2,
        "y": 4,
        "category": "diffusion_based"
      },
      {
        "id": "pika",
        "x": 2023.3,
        "y": 4,
        "category": "diffusion_based"
      },
      {
        "id": "gen2",
        "x": 2023.5,
        "y": 4,
        "category": "diffusion_based"
      },
      {
        "id": "lumiere",
        "x": 2024.1,
        "y": 4,
        "category": "diffusion_based"
      },
      {
        "id": "sora",
        "x": 2024.2,
        "y": 4,
        "category": "diffusion_based"
      },
      {
        "id": "veo",
        "x": 2024.4,
        "y": 4,
        "category": "diffusion_based"
      },
      {
        "id": "gen3",
        "x": 2024.5,
        "y": 4,
        "category": "diffusion_based"
      },
      {
        "id": "kling",
        "x": 2024.5,
        "y": 4,
        "category": "diffusion_based"
      },
      {
        "id": "cogvideox",
        "x": 2024.7,
        "y": 4,
        "category": "diffusion_based"
      },
      {
        "id": "hunyuanvideo",
        "x": 2024.12,
        "y": 4,
        "category": "diffusion_based"
      },
      {
        "id": "sora2",
        "x": 2024.12,
        "y": 4,
        "category": "diffusion_based"
      },
      {
        "id": "wan",
        "x": 2025.2,
        "y": 4,
        "category": "diffusion_based"
      },
      {
        "id": "seedance",
        "x": 2025.7,
        "y": 4,
        "category": "diffusion_based"
      },
      {
        "id": "pika25",
        "x": 2025.9,
        "y": 4,
        "category": "diffusion_based"
      },
      {
        "id": "gen4",
        "x": 2026.1,
        "y": 4,
        "category": "diffusion_based"
      },
      {
        "id": "kling3",
        "x": 2026.1,
        "y": 4,
        "category": "diffusion_based"
      },
      {
        "id": "veo3",
        "x": 2026.1,
        "y": 4,
        "category": "diffusion_based"
      },
      {
        "id": "seedance2",
        "x": 2026.2,
        "y": 4,
        "category": "diffusion_based"
      },
      {
        "id": "wan27",
        "x": 2026.3,
        "y": 4,
        "category": "diffusion_based"
      },
      {
        "id": "hunyuanvideo15",
        "x": 2026.3,
        "y": 4,
        "category": "diffusion_based"
      },
      {
        "id": "gwm1",
        "x": 2026.2,
        "y": 5,
        "category": "world_model"
      },
      {
        "id": "vjepa2",
        "x": 2026.3,
        "y": 5,
        "category": "world_model"
      }
    ],
    "edges": [
      {
        "from": "videogan",
        "to": "tgan",
        "label": "时序判别"
      },
      {
        "from": "videogan",
        "to": "mocogan",
        "label": "运动解耦"
      },
      {
        "from": "svg",
        "to": "videogpt",
        "label": "离散Token化"
      },
      {
        "from": "videogpt",
        "to": "nuwa",
        "label": "多任务统一"
      },
      {
        "from": "nuwa",
        "to": "nuwa_infinity",
        "label": "无限扩展"
      },
      {
        "from": "nuwa",
        "to": "cogvideo",
        "label": "中文理解"
      },
      {
        "from": "svd",
        "to": "sora",
        "label": "DiT架构"
      },
      {
        "from": "sora",
        "to": "sora2",
        "label": "物理增强"
      },
      {
        "from": "svd",
        "to": "lumiere",
        "label": "STUNet"
      },
      {
        "from": "lumiere",
        "to": "veo",
        "label": "高分辨率"
      },
      {
        "from": "veo",
        "to": "veo3",
        "label": "原生音视频"
      },
      {
        "from": "gen1",
        "to": "gen2",
        "label": "T2V能力"
      },
      {
        "from": "gen2",
        "to": "gen3",
        "label": "世界模型"
      },
      {
        "from": "gen3",
        "to": "gen4",
        "label": "世界一致性"
      },
      {
        "from": "cogvideo",
        "to": "cogvideox",
        "label": "3D VAE"
      },
      {
        "from": "svd",
        "to": "hunyuanvideo",
        "label": "开源优化"
      },
      {
        "from": "hunyuanvideo",
        "to": "hunyuanvideo15",
        "label": "GPU优化"
      },
      {
        "from": "svd",
        "to": "wan",
        "label": "MoE架构"
      },
      {
        "from": "wan",
        "to": "wan27",
        "label": "参数扩展"
      },
      {
        "from": "svd",
        "to": "kling",
        "label": "3D注意力"
      },
      {
        "from": "kling",
        "to": "kling3",
        "label": "4K音频"
      },
      {
        "from": "svd",
        "to": "seedance",
        "label": "时间线提示"
      },
      {
        "from": "seedance",
        "to": "seedance2",
        "label": "音视频同步"
      },
      {
        "from": "svd",
        "to": "pika",
        "label": "物理特效"
      },
      {
        "from": "pika",
        "to": "pika25",
        "label": "唇形同步"
      },
      {
        "from": "gen4",
        "to": "gwm1",
        "label": "物理仿真"
      }
    ],
    "milestones": [
      "svd",
      "sora",
      "veo3"
    ]
  },
  "algos": [
    {
      "id": "videogan",
      "num": 1,
      "name": "VideoGAN",
      "fullName": "视频生成对抗网络 (Video Generative Adversarial Network)",
      "year": "2016",
      "org": "MIT",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/1609.02612",
      "projectUrl": "",
      "category": "gan_based",
      "motivation": "首次将GAN应用于视频生成，分解静态背景与动态前景",
      "summary": "VideoGAN 的核心目标是：首次将GAN应用于视频生成，分解静态背景与动态前景。",
      "keyPoints": [
        "核心动机：首次将GAN应用于视频生成，分解静态背景与动态前景",
        "代表机构：MIT"
      ],
      "detail": "<p>首次将GAN应用于视频生成，分解静态背景与动态前景</p>"
    },
    {
      "id": "mocogan",
      "num": 2,
      "name": "MoCoGAN",
      "fullName": "运动内容解耦GAN (Motion-Content Decomposed GAN)",
      "year": "2018",
      "org": "NEC Labs",
      "parent": "videogan",
      "paperUrl": "https://arxiv.org/abs/1707.04993",
      "projectUrl": "",
      "category": "gan_based",
      "motivation": "将潜在空间分解为内容和运动部分，实现解耦控制",
      "summary": "MoCoGAN 的核心目标是：将潜在空间分解为内容和运动部分，实现解耦控制。",
      "keyPoints": [
        "核心动机：将潜在空间分解为内容和运动部分，实现解耦控制",
        "演化来源：继承或改进自 videogan",
        "代表机构：NEC Labs"
      ],
      "detail": "<p>将潜在空间分解为内容和运动部分，实现解耦控制</p>"
    },
    {
      "id": "tgan",
      "num": 3,
      "name": "TGAN",
      "fullName": "时序生成对抗网络 (Temporal GAN)",
      "year": "2017",
      "org": "Preferred Networks",
      "parent": "videogan",
      "paperUrl": "https://arxiv.org/abs/1611.06624",
      "projectUrl": "",
      "category": "gan_based",
      "motivation": "引入时序判别器增强视频时序连贯性",
      "summary": "TGAN 的核心目标是：引入时序判别器增强视频时序连贯性。",
      "keyPoints": [
        "核心动机：引入时序判别器增强视频时序连贯性",
        "演化来源：继承或改进自 videogan",
        "代表机构：Preferred Networks"
      ],
      "detail": "<p>引入时序判别器增强视频时序连贯性</p>"
    },
    {
      "id": "svg",
      "num": 4,
      "name": "SVG",
      "fullName": "随机视频生成 (Stochastic Video Generation)",
      "year": "2018",
      "org": "DeepMind",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/1802.07687",
      "projectUrl": "",
      "category": "vae_based",
      "motivation": "引入随机隐变量建模视频生成的不确定性",
      "summary": "SVG 的核心目标是：引入随机隐变量建模视频生成的不确定性。",
      "keyPoints": [
        "核心动机：引入随机隐变量建模视频生成的不确定性",
        "代表机构：DeepMind"
      ],
      "detail": "<p>引入随机隐变量建模视频生成的不确定性</p>"
    },
    {
      "id": "videogpt",
      "num": 5,
      "name": "VideoGPT",
      "fullName": "视频生成预训练Transformer (Video Generative Pre-trained Transformer)",
      "year": "2021",
      "org": "UC Berkeley",
      "parent": "svg",
      "paperUrl": "https://arxiv.org/abs/2104.10157",
      "projectUrl": "",
      "category": "autoregressive",
      "motivation": "将视频视为离散Token序列进行自回归预测",
      "summary": "VideoGPT 的核心目标是：将视频视为离散Token序列进行自回归预测。",
      "keyPoints": [
        "核心动机：将视频视为离散Token序列进行自回归预测",
        "演化来源：继承或改进自 svg",
        "代表机构：UC Berkeley"
      ],
      "detail": "<p>将视频视为离散Token序列进行自回归预测</p>"
    },
    {
      "id": "nuwa",
      "num": 6,
      "name": "NUWA",
      "fullName": "女娲多模态生成模型 (NUWA)",
      "year": "2021.11",
      "org": "Microsoft Research Asia",
      "parent": "videogpt",
      "paperUrl": "https://arxiv.org/abs/2111.12417",
      "projectUrl": "",
      "category": "autoregressive",
      "motivation": "统一文本、图像、视频生成的多任务框架",
      "summary": "NUWA 的核心目标是：统一文本、图像、视频生成的多任务框架。",
      "keyPoints": [
        "核心动机：统一文本、图像、视频生成的多任务框架",
        "演化来源：继承或改进自 videogpt",
        "代表机构：Microsoft Research Asia"
      ],
      "detail": "<p>统一文本、图像、视频生成的多任务框架</p>"
    },
    {
      "id": "nuwa_infinity",
      "num": 7,
      "name": "NUWA-Infinity",
      "fullName": "女娲无限生成模型 (NUWA-Infinity)",
      "year": "2022.07",
      "org": "Microsoft Research Asia",
      "parent": "nuwa",
      "paperUrl": "https://arxiv.org/abs/2207.09814",
      "projectUrl": "",
      "category": "autoregressive",
      "motivation": "自回归之上的自回归，突破固定分辨率和长度限制",
      "summary": "NUWA-Infinity 的核心目标是：自回归之上的自回归，突破固定分辨率和长度限制。",
      "keyPoints": [
        "核心动机：自回归之上的自回归，突破固定分辨率和长度限制",
        "演化来源：继承或改进自 nuwa",
        "代表机构：Microsoft Research Asia"
      ],
      "detail": "<p>自回归之上的自回归，突破固定分辨率和长度限制</p>"
    },
    {
      "id": "cogvideo",
      "num": 8,
      "name": "CogVideo",
      "fullName": "认知视频生成模型 (CogVideo)",
      "year": "2022.05",
      "org": "清华大学/智谱AI",
      "parent": "nuwa",
      "paperUrl": "https://arxiv.org/abs/2205.15868",
      "projectUrl": "",
      "category": "autoregressive",
      "motivation": "多帧速率层级训练，实现高质量文本到视频生成",
      "summary": "CogVideo 的核心目标是：多帧速率层级训练，实现高质量文本到视频生成。",
      "keyPoints": [
        "核心动机：多帧速率层级训练，实现高质量文本到视频生成",
        "演化来源：继承或改进自 nuwa",
        "代表机构：清华大学/智谱AI"
      ],
      "detail": "<p>多帧速率层级训练，实现高质量文本到视频生成</p>"
    },
    {
      "id": "svd",
      "num": 9,
      "name": "SVD",
      "fullName": "稳定视频扩散 (Stable Video Diffusion)",
      "year": "2023.11",
      "org": "Stability AI",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2311.15127",
      "projectUrl": "",
      "category": "diffusion_based",
      "motivation": "开源基线，三阶段训练，时序感知去闪烁解码器",
      "summary": "SVD 的核心目标是：开源基线，三阶段训练，时序感知去闪烁解码器。",
      "keyPoints": [
        "核心动机：开源基线，三阶段训练，时序感知去闪烁解码器",
        "代表机构：Stability AI"
      ],
      "detail": "<p>开源基线，三阶段训练，时序感知去闪烁解码器</p>"
    },
    {
      "id": "sora",
      "num": 10,
      "name": "Sora",
      "fullName": "Sora视频生成模型 (Sora)",
      "year": "2024.02",
      "org": "OpenAI",
      "parent": "svd",
      "paperUrl": "https://openai.com/index/video-generation-models-as-world-simulators/",
      "projectUrl": "",
      "category": "diffusion_based",
      "motivation": "时空补丁DiT架构，初步物理模拟能力",
      "summary": "Sora 的核心目标是：时空补丁DiT架构，初步物理模拟能力。",
      "keyPoints": [
        "核心动机：时空补丁DiT架构，初步物理模拟能力",
        "演化来源：继承或改进自 svd",
        "代表机构：OpenAI"
      ],
      "detail": "<p>时空补丁DiT架构，初步物理模拟能力</p>"
    },
    {
      "id": "sora2",
      "num": 11,
      "name": "Sora 2",
      "fullName": "Sora第二代 (Sora 2)",
      "year": "2024.12",
      "org": "OpenAI",
      "parent": "sora",
      "paperUrl": "https://openai.com/sora",
      "projectUrl": "",
      "category": "diffusion_based",
      "motivation": "1080p/60s生成，API转型，物理模拟增强",
      "summary": "Sora 2 的核心目标是：1080p/60s生成，API转型，物理模拟增强。",
      "keyPoints": [
        "核心动机：1080p/60s生成，API转型，物理模拟增强",
        "演化来源：继承或改进自 sora",
        "代表机构：OpenAI"
      ],
      "detail": "<p>1080p/60s生成，API转型，物理模拟增强</p>"
    },
    {
      "id": "gen1",
      "num": 12,
      "name": "Gen-1",
      "fullName": "Runway Gen-1 (Runway Gen-1)",
      "year": "2023.02",
      "org": "Runway",
      "parent": "svd",
      "paperUrl": "https://research.runwayml.com/gen1",
      "projectUrl": "",
      "category": "diffusion_based",
      "motivation": "视频到视频转换，风格迁移保持结构",
      "summary": "Gen-1 的核心目标是：视频到视频转换，风格迁移保持结构。",
      "keyPoints": [
        "核心动机：视频到视频转换，风格迁移保持结构",
        "演化来源：继承或改进自 svd",
        "代表机构：Runway"
      ],
      "detail": "<p>视频到视频转换，风格迁移保持结构</p>"
    },
    {
      "id": "gen2",
      "num": 13,
      "name": "Gen-2",
      "fullName": "Runway Gen-2 (Runway Gen-2)",
      "year": "2023.06",
      "org": "Runway",
      "parent": "gen1",
      "paperUrl": "https://research.runwayml.com/gen2",
      "projectUrl": "",
      "category": "diffusion_based",
      "motivation": "首次文本到视频和图像到视频能力",
      "summary": "Gen-2 提出了一种基于潜在扩散模型的视频合成框架，通过将视频分解为**结构表示**（单目深度估计）和**内容表示**（CLIP 图像嵌入），并结合时空联合训练与时序引导机制，实现了文本、图像、视频等多模态条件下的高质量视频生成与编辑。",
      "keyPoints": [
        "<strong>结构-内容解耦表示</strong>：将视频分解为结构信号（MiDaS 单目深度图，可控细节层级）和内容信号（CLIP 图像嵌入），分别通过拼接和交叉注意力注入扩散模型",
        "<strong>时空潜在扩散模型</strong>：在预训练图像 LDM（Stable Diffusion）的 UNet 中插入 1D 时序卷积和 1D 时序注意力层，实现图像-视频联合训练",
        "<strong>时序引导尺度 <span class=\"kb-math kb-math-inline\">\\omega_t</span></strong>：利用图像模型与视频模型的预测差异，通过类似 classifier-free guidance 的方式显式控制生成视频的时序一致性",
        "<strong>多模态条件支持</strong>：支持文本→图像 prior 映射、图像 CLIP 嵌入、深度图等多种条件输入，实现 text-to-video、image-to-video、video-to-video 等多种生成模式",
        "<strong>v-参数化</strong>：采用 v-prediction 替代 <span class=\"kb-math kb-math-inline\">\\epsilon</span>-prediction，显著改善视频样本的色彩一致性",
        "<strong>多阶段训练策略</strong>：从预训练 SD 出发，依次引入 CLIP 图像条件（15k步）→ 时序层（75k步）→ 结构条件（25k+10k步），使用 240M 图像 + 6.4M 视频片段",
        "<strong>用户研究验证</strong>：在 AMT 用户研究中，Gen-2 在 prompt 忠实度和时序一致性上均显著优于 Text2Live、SDEdit 等基线方法"
      ],
      "detail": "<p><img alt=\"Gen-2 方法总览\" src=\"https://ar5iv.labs.arxiv.org/html/2302.03011/assets/x2.png\" />\n<em>图：Gen-2 方法总览。输入视频通过 MiDaS 提取深度图作为结构表示 <span class=\"kb-math kb-math-inline\">s</span>，通过 CLIP 提取图像嵌入作为内容表示 <span class=\"kb-math kb-math-inline\">c</span>。结构表示经编码器后与噪声潜变量拼接输入 UNet，内容表示通过交叉注意力机制注入。文本条件通过 prior 网络映射为 CLIP 图像嵌入。</em></p>\n<p><img alt=\"时序扩展架构\" src=\"https://ar5iv.labs.arxiv.org/html/2302.03011/assets/x3.png\" />\n<em>图：时序扩展架构。在 UNet 的每个残差块中，2D 空间卷积后插入 1D 时序卷积（左）；在每个 2D 空间注意力块后插入 1D 时序注意力块（右）。图像被视为单帧视频，时序层仅对多帧视频激活。</em></p>\n<pre><code class=\"language-python\"># Gen-2 训练与推理伪代码\n# === 训练阶段 ===\n# 输入: 视频帧 x ∈ R^(n×3×H×W), 深度图 d = MiDaS(x)\n# 结构表示: 对深度图加噪控制细节层级\nx_s = alpha(t_s) * d + sigma(t_s) * epsilon   # t_s 控制结构细节\ns = Encoder(x_s)                                # 编码为潜在结构表示\n\n# 内容表示: CLIP 图像嵌入\nc = CLIP_image(x[0])                            # 取首帧的 CLIP 嵌入\n\n# 潜在编码\nz = Encoder_LDM(x)                              # z ∈ R^(n×4×H/8×W/8)\n\n# 前向扩散\nt ~ Uniform(0, T)\nz_t = alpha(t) * z + sigma(t) * epsilon\n\n# UNet 预测 (v-parameterization)\n# 结构 s 与 z_t 在通道维拼接; 内容 c 通过交叉注意力注入\nv_pred = UNet(concat(z_t, s), t, c)             # 含时序层的 UNet\nloss = ||v - v_pred||^2                          # v = alpha(t)*eps - sigma(t)*z\n\n# === 推理阶段 (含时序引导) ===\nfor t in reversed(timesteps):                    # DDIM 采样\n    mu_video = UNet_video(z_t, t, c=None, s)     # 视频模型无条件预测\n    mu_image = UNet_image(z_t, t, c=None, s)     # 图像模型逐帧预测\n    mu_cond  = UNet_video(z_t, t, c, s)           # 视频模型有条件预测\n\n    # 三项引导: 基础 + 时序引导 + 内容引导\n    mu_guided = mu_image \\\n        + omega_t * (mu_video - mu_image) \\       # 时序一致性控制\n        + omega   * (mu_cond - mu_video)           # 内容引导\n\n    z_{t-1} = DDIM_step(z_t, mu_guided)\n</code></pre>\n<p><strong>动机与背景：从图像扩散到视频合成的挑战</strong></p>\n<p>扩散模型在图像生成领域取得了突破性进展（DALL-E 2、Stable Diffusion、Imagen），但将其扩展到视频合成面临三大核心挑战：（1）视频数据的时序一致性要求模型理解帧间关系；（2）视频数据集规模远小于图像数据集，导致泛化能力不足；（3）视频的高维特性使得直接在像素空间建模计算代价极高。此前的方法如 Video Diffusion Models (VDM) 直接在像素空间操作，受限于分辨率和长度；而基于 GAN 或自回归模型的方法则难以保证生成质量和多样性。Gen-2 的核心洞察在于：<strong>视频可以被分解为与运动相关的\"结构\"和与外观相关的\"内容\"两个独立维度</strong>，通过分别控制这两个维度，可以实现灵活且高质量的视频合成。</p>\n<p><strong>核心机制一：结构与内容的解耦表示</strong></p>\n<p>Gen-2 的关键创新在于将条件信号分为结构表示 <span class=\"kb-math kb-math-inline\">s</span> 和内容表示 <span class=\"kb-math kb-math-inline\">c</span> 两个正交维度。<strong>结构表示</strong>采用 MiDaS 单目深度估计网络从输入视频中提取深度图，深度图天然编码了场景的几何布局和物体运动轨迹，同时对外观变化具有不变性。为了控制结构信息的细节层级，论文提出了一个巧妙的机制：对深度图施加扩散噪声，噪声时间步 <span class=\"kb-math kb-math-inline\">t_s</span> 越大，深度图细节越模糊，仅保留粗略的场景布局；<span class=\"kb-math kb-math-inline\">t_s = 0</span> 时保留完整深度细节。具体地，带噪深度图为：</p>\n<div class=\"kb-math kb-math-display\">x_s = \\alpha_{t_s} \\cdot d + \\sigma_{t_s} \\cdot \\epsilon, \\quad \\epsilon \\sim \\mathcal{N}(0, I)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">d</span> 为原始深度图，<span class=\"kb-math kb-math-inline\">\\alpha_{t_s}</span> 和 <span class=\"kb-math kb-math-inline\">\\sigma_{t_s}</span> 为扩散调度参数。编码后的结构表示 <span class=\"kb-math kb-math-inline\">s = \\mathcal{E}(x_s)</span> 在通道维度上与噪声潜变量 <span class=\"kb-math kb-math-inline\">z_t</span> 拼接，作为 UNet 的输入。<strong>内容表示</strong>则采用 CLIP 图像编码器提取的嵌入向量，通过交叉注意力机制注入 UNet 的每一层。对于文本条件输入，论文训练了一个类似 DALL-E 2 的 prior 网络，将 CLIP 文本嵌入映射为 CLIP 图像嵌入空间，从而统一了文本和图像两种条件输入的处理方式。</p>\n<div class=\"key-point\">💡 <strong>关键洞察</strong>：结构-内容解耦使得用户可以独立控制\"视频中发生什么运动\"（结构）和\"视频看起来像什么\"（内容），例如保持原视频的运动轨迹但将场景风格从夏天变为冬天。</div>\n<p><strong>核心机制二：时空联合训练与时序引导</strong></p>\n<p>Gen-2 在预训练的图像 LDM（Stable Diffusion）基础上，通过插入时序层将其扩展为视频模型。具体地，在 UNet 的每个残差块中，2D 空间卷积后插入 1D 时序卷积（沿时间轴操作）；在每个 2D 空间注意力块后插入 1D 时序注意力块（帧间自注意力）。关键设计是：<strong>图像和视频共享所有空间层参数，时序层仅对多帧视频输入激活</strong>。这通过张量重排实现：形状为 <span class=\"kb-math kb-math-inline\">b \\times n \\times c \\times h \\times w</span> 的视频张量在空间层中被重排为 <span class=\"kb-math kb-math-inline\">(b \\cdot n) \\times c \\times h \\times w</span>（每帧独立处理），在时序层中被重排为 <span class=\"kb-math kb-math-inline\">(b \\cdot h \\cdot w) \\times c \\times n</span>（每个空间位置跨帧处理）。</p>\n<p>这种联合训练策略带来了一个独特的推理时控制能力——<strong>时序引导尺度 <span class=\"kb-math kb-math-inline\">\\omega_t</span></strong>。由于图像模型和视频模型共享参数，对同一输入，图像模型（逐帧独立预测）和视频模型（跨帧联合预测）会给出不同的去噪方向。类比 classifier-free guidance 的思想，论文将图像模型的预测视为\"无时序条件\"的基线，视频模型的预测视为\"有时序条件\"的增强，通过线性外推控制时序一致性强度：</p>\n<div class=\"kb-math kb-math-display\">\\tilde{\\mu}_\\theta(z_t, t, c, s) = \\mu^\\pi_\\theta(z_t, t, \\varnothing, s) + \\omega_t \\left(\\mu_\\theta(z_t, t, \\varnothing, s) - \\mu^\\pi_\\theta(z_t, t, \\varnothing, s)\\right) + \\omega \\left(\\mu_\\theta(z_t, t, c, s) - \\mu_\\theta(z_t, t, \\varnothing, s)\\right)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\mu^\\pi_\\theta</span> 为图像模型预测，<span class=\"kb-math kb-math-inline\">\\mu_\\theta</span> 为视频模型预测，<span class=\"kb-math kb-math-inline\">\\omega_t</span> 控制时序一致性，<span class=\"kb-math kb-math-inline\">\\omega</span> 为标准的内容引导尺度。实验表明，<span class=\"kb-math kb-math-inline\">\\omega_t</span> 较低时生成的视频具有\"手绘\"风格（帧间变化大），<span class=\"kb-math kb-math-inline\">\\omega_t</span> 较高时生成更平滑一致的视频。</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：时序引导需要三次 UNet 前向传播（图像无条件、视频无条件、视频有条件），推理成本约为标准 classifier-free guidance 的 1.5 倍。</div>\n<p><strong>训练流程与工程细节</strong></p>\n<p>Gen-2 采用精心设计的多阶段训练策略：（1）从预训练 Stable Diffusion 出发，将条件从 CLIP 文本嵌入切换为 CLIP 图像嵌入，仅在图像上微调 15k 步；（2）引入时序卷积和时序注意力层，在图像（12.5% 概率采样）和视频上联合训练 75k 步，视频为 8 帧、间隔 4 帧、分辨率 448×256；（3）添加结构条件（固定 <span class=\"kb-math kb-math-inline\">t_s = 0</span>）训练 25k 步；（4）将 <span class=\"kb-math kb-math-inline\">t_s</span> 在 0-7 之间均匀采样，继续训练 10k 步。训练数据包括 240M 内部图像和 6.4M 视频片段。模型采用 v-parameterization（预测 <span class=\"kb-math kb-math-inline\">v = \\alpha_t \\epsilon - \\sigma_t z</span> 而非 <span class=\"kb-math kb-math-inline\">\\epsilon</span>），这对视频样本的色彩一致性至关重要。推理时使用 DDIM 采样器。</p>",
      "quiz": {
        "q": "Gen-2 中控制结构表示细节层级的机制是什么？",
        "options": [
          "调整 MiDaS 深度估计网络的分辨率参数",
          "对深度图施加不同程度的扩散噪声，通过噪声时间步 t_s 控制",
          "使用不同大小的卷积核对深度图进行模糊处理",
          "通过 CLIP 嵌入的维度裁剪控制信息量"
        ],
        "answer": 1,
        "explain": "论文通过对 MiDaS 深度图施加扩散噪声 x_s = α_{t_s}·d + σ_{t_s}·ε 来控制结构细节层级，t_s 越大噪声越多，深度图越模糊仅保留粗略布局，t_s=0 时保留完整细节。"
      }
    },
    {
      "id": "gen3",
      "num": 14,
      "name": "Gen-3 Alpha",
      "fullName": "Runway Gen-3 Alpha (Runway Gen-3 Alpha)",
      "year": "2024.06",
      "org": "Runway",
      "parent": "gen2",
      "paperUrl": "https://runwayml.com/research/introducing-gen-3-alpha",
      "projectUrl": "",
      "category": "diffusion_based",
      "motivation": "时空世界模型，全局物理一致性建模",
      "summary": "Gen-3 Alpha 是 Runway 推出的新一代视频生成基础模型，通过大规模视频-图像联合训练和时空世界模型架构，在保真度、时序一致性和运动表现上大幅超越 Gen-2，迈向通用世界模型（General World Models）的目标。",
      "keyPoints": [
        "<strong>多模态联合训练</strong>：在视频和图像上联合训练，统一支持 Text-to-Video、Image-to-Video、Text-to-Image 三种生成模式",
        "<strong>大规模训练基础设施</strong>：全新构建的大规模多模态训练基础设施，支撑更大参数量和更长序列的训练",
        "<strong>时间密集描述（Temporally Dense Captions）</strong>：训练时使用高描述性的时间密集标注，实现精细的时序控制和关键帧编排",
        "<strong>多种控制模式</strong>：支持 Motion Brush（运动笔刷）、Advanced Camera Controls（高级相机控制）、Director Mode（导演模式）等精细控制手段",
        "<strong>逼真人物生成</strong>：在人物表情、动作、手势和情感表达方面表现突出，支持多样化的叙事场景",
        "<strong>行业定制化</strong>：支持针对特定艺术风格和叙事需求的模型微调（Fine-tuning），与娱乐和媒体机构合作定制",
        "<strong>安全与溯源</strong>：集成 C2PA 内容溯源标准和自研视觉内容审核系统",
        "<strong>通用世界模型方向</strong>：定位为迈向 General World Models（GWM）的关键一步，目标是构建能理解和模拟真实世界动态的 AI 系统"
      ],
      "detail": "<h5>核心架构示意</h5>\n<p><img alt=\"Gen-3 Alpha 生成示例\" src=\"https://d3phaj0sisr2ct.cloudfront.net/site/videos/gen-3-alpha/gen-3-alpha-output-001.jpg\" />\n<em>图：Gen-3 Alpha 生成的视频帧示例——展示了模型在光影反射、人物细节和场景一致性方面的能力</em></p>\n<div class=\"warn-box\">⚠️ 注意：Gen-3 Alpha 未发布正式学术论文，以下技术分析基于 Runway 官方博客、General World Models 研究公告及公开的技术信息综合推断。</div>\n<h5>推测架构伪代码</h5>\n<pre><code class=\"language-python\"># Gen-3 Alpha 推测训练流程伪代码\n# 基于 Diffusion Transformer (DiT) 架构的视频生成\n\n# Stage 1: 视频-图像联合编码\nvideo_latent = VideoVAE.encode(video)          # 视频编码到潜空间 [B, T, C, H, W]\nimage_latent = VideoVAE.encode(image)          # 图像视为单帧视频 [B, 1, C, H, W]\ntext_emb = TextEncoder(temporally_dense_caption)  # 时间密集描述编码\n\n# Stage 2: 扩散过程 (Diffusion Transformer)\nnoise = torch.randn_like(video_latent)\nt = sample_timestep()\nnoisy_latent = scheduler.add_noise(video_latent, noise, t)\n\n# 时空注意力机制\nfor block in DiT_blocks:\n    # 空间自注意力 — 帧内像素关系\n    x = block.spatial_attention(noisy_latent)\n    # 时间自注意力 — 帧间时序一致性\n    x = block.temporal_attention(x)\n    # 文本交叉注意力 — 条件控制\n    x = block.cross_attention(x, text_emb)\n    x = block.ffn(x)\n\n# 预测噪声并优化\npred_noise = DiT(noisy_latent, t, text_emb)\nloss = MSE(pred_noise, noise)\n</code></pre>\n<h5>动机与背景</h5>\n<p>传统视频生成模型面临三大核心挑战：<strong>时序一致性差</strong>（帧间闪烁、物体变形）、<strong>运动质量低</strong>（不自然的运动轨迹）、<strong>物理合理性不足</strong>（违反基本物理规律）。Runway 的前代产品 Gen-2 虽然在文本到视频生成领域取得了突破，但仍然在复杂相机运动和物体运动方面存在明显局限。</p>\n<p>2023 年 12 月，Runway 提出了 <strong>General World Models（通用世界模型）</strong> 的研究方向，其核心理念是：</p>\n<div class=\"key-point\">💡 关键：世界模型是一种构建环境内部表征并用其模拟未来事件的 AI 系统。通用世界模型的目标是表征和模拟真实世界中遇到的各种情境和交互，而非局限于游戏或驾驶等狭窄场景。</div>\n<p>Gen-3 Alpha 正是这一研究方向的首个重要成果——它不仅是一个视频生成工具，更是一个初步具备世界理解能力的基础模型。</p>\n<h5>核心技术机制</h5>\n<p><strong>1. 大规模视频-图像联合训练</strong></p>\n<p>Gen-3 Alpha 采用视频和图像的联合训练策略。这种多模态联合训练带来两个关键优势：</p>\n<ul>\n<li><strong>数据效率提升</strong>：图像数据量远大于高质量视频数据，联合训练使模型能从海量图像中学习丰富的视觉先验（纹理、光影、构图），再将这些知识迁移到视频生成中</li>\n<li><strong>统一表征空间</strong>：视频和图像共享同一潜空间表征，使得模型能够无缝支持 Text-to-Video、Image-to-Video 和 Text-to-Image 三种生成模式</li>\n</ul>\n<p>这一策略与 Stable Video Diffusion（SVD）等工作的思路一致，但 Gen-3 Alpha 在训练规模和数据质量上进行了大幅提升。</p>\n<p><strong>2. 时间密集描述（Temporally Dense Captions）</strong></p>\n<p>Gen-3 Alpha 训练的一个核心创新是使用 <strong>时间密集描述</strong>（temporally dense captions）。与传统的单句视频描述不同，时间密集描述为视频的不同时间段提供详细的文本标注：</p>\n<div class=\"kb-math kb-math-display\">\\text{Caption}(v) = \\{(t_i, c_i)\\}_{i=1}^{N}, \\quad t_i \\in [0, T]</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">t_i</span> 是时间戳，<span class=\"kb-math kb-math-inline\">c_i</span> 是对应时刻的描述文本，<span class=\"kb-math kb-math-inline\">T</span> 是视频总时长。这种标注方式使模型能够：</p>\n<ul>\n<li>实现精确的<strong>关键帧控制</strong>：用户可以描述场景在不同时间点的状态变化</li>\n<li>支持<strong>想象性过渡</strong>：如\"镜头从蚂蚁特写拉远，展现远处的社区\"这样的复杂时序叙事</li>\n<li>理解<strong>电影术语</strong>：如 FPV（第一人称视角）、推拉镜头、航拍等专业摄影指令</li>\n</ul>\n<p><strong>3. 时空注意力机制</strong></p>\n<p>Gen-3 Alpha 的架构核心是基于 Diffusion Transformer（DiT）的时空注意力机制。推测其采用分离式时空注意力设计：</p>\n<div class=\"kb-math kb-math-display\">\\text{Attention}(Q, K, V) = \\text{softmax}\\left(\\frac{QK^T}{\\sqrt{d_k}}\\right)V</div>\n<ul>\n<li><strong>空间注意力</strong>：在每一帧内部建模像素间的空间关系，捕获场景结构和纹理细节</li>\n<li><strong>时间注意力</strong>：跨帧建模同一空间位置的时序演变，确保运动连贯性和物理一致性</li>\n<li><strong>交叉注意力</strong>：将文本条件注入生成过程，实现精确的语义控制</li>\n</ul>\n<p>这种设计使模型能够同时保证<strong>帧内质量</strong>和<strong>帧间一致性</strong>，是解决视频生成中\"闪烁\"和\"漂移\"问题的关键。</p>\n<p><strong>4. 多层次控制体系</strong></p>\n<p>Gen-3 Alpha 提供了从粗粒度到细粒度的多层次控制：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>控制模式</th>\n<th>功能描述</th>\n<th>控制粒度</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Text Prompt</td>\n<td>文本描述驱动生成</td>\n<td>全局语义</td>\n</tr>\n<tr>\n<td>Image-to-Video</td>\n<td>以参考图像为起始帧</td>\n<td>视觉风格+内容</td>\n</tr>\n<tr>\n<td>Motion Brush</td>\n<td>指定区域的运动方向和强度</td>\n<td>局部运动</td>\n</tr>\n<tr>\n<td>Advanced Camera Controls</td>\n<td>控制相机运动轨迹</td>\n<td>相机参数</td>\n</tr>\n<tr>\n<td>Director Mode</td>\n<td>综合场景编排</td>\n<td>多维度协同</td>\n</tr>\n</tbody>\n</table></div>\n<h5>与 Gen-2 的关键区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th>Gen-2</th>\n<th>Gen-3 Alpha</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>训练数据</td>\n<td>视频为主</td>\n<td>视频+图像联合训练</td>\n</tr>\n<tr>\n<td>训练基础设施</td>\n<td>常规规模</td>\n<td>全新大规模多模态训练基础设施</td>\n</tr>\n<tr>\n<td>标注方式</td>\n<td>常规视频描述</td>\n<td>时间密集描述（Temporally Dense Captions）</td>\n</tr>\n<tr>\n<td>人物生成</td>\n<td>表情和动作有限</td>\n<td>丰富的表情、手势和情感表达</td>\n</tr>\n<tr>\n<td>运动质量</td>\n<td>复杂运动易失败</td>\n<td>大幅改善运动合理性</td>\n</tr>\n<tr>\n<td>时序一致性</td>\n<td>存在闪烁和漂移</td>\n<td>显著提升帧间一致性</td>\n</tr>\n<tr>\n<td>控制能力</td>\n<td>基础文本控制</td>\n<td>多层次精细控制（Motion Brush、Camera Controls 等）</td>\n</tr>\n<tr>\n<td>定位</td>\n<td>视频生成工具</td>\n<td>迈向通用世界模型的基础模型</td>\n</tr>\n</tbody>\n</table></div>\n<h5>安全与责任</h5>\n<p>Gen-3 Alpha 在安全性方面引入了两项重要机制：</p>\n<ul>\n<li><strong>C2PA 内容溯源标准</strong>：为生成内容嵌入数字水印和元数据，确保 AI 生成内容可追溯、可验证</li>\n<li><strong>自研视觉内容审核系统</strong>：在生成管线中集成内容安全过滤，防止生成有害或不当内容</li>\n</ul>\n<div class=\"key-point\">💡 关键：Gen-3 Alpha 的核心贡献不在于提出全新的算法公式，而在于工程层面的系统性突破——通过大规模训练基础设施、高质量数据标注流程和精细化控制体系的协同优化，将视频生成质量推向新的高度，并首次将\"世界模型\"的概念从学术探索推进到产品级应用。</div>",
      "quiz": {
        "q": "Gen-3 Alpha 相比 Gen-2 的核心训练策略变化是什么？",
        "options": [
          "从 GAN 架构切换到扩散模型架构",
          "采用视频和图像联合训练，并使用时间密集描述标注",
          "将模型参数量缩小以提升推理速度",
          "放弃文本条件，改用纯图像条件生成"
        ],
        "answer": 1,
        "explain": "Gen-3 Alpha 的关键变化是在视频和图像上联合训练，并引入时间密集描述（temporally dense captions）实现精细时序控制，这是其在保真度、一致性和运动质量上大幅提升的核心原因。"
      }
    },
    {
      "id": "gen4",
      "num": 15,
      "name": "Gen-4",
      "fullName": "Runway Gen-4 (Runway Gen-4)",
      "year": "2026.01",
      "org": "Runway",
      "parent": "gen3",
      "paperUrl": "https://runwayml.com/gen-4",
      "projectUrl": "",
      "category": "diffusion_based",
      "motivation": "世界一致性，角色身份跨场景持久性",
      "summary": "Gen-4 的核心目标是：世界一致性，角色身份跨场景持久性。",
      "keyPoints": [
        "核心动机：世界一致性，角色身份跨场景持久性",
        "演化来源：继承或改进自 gen3",
        "代表机构：Runway"
      ],
      "detail": "<p>世界一致性，角色身份跨场景持久性</p>"
    },
    {
      "id": "pika",
      "num": 16,
      "name": "Pika",
      "fullName": "Pika视频生成 (Pika)",
      "year": "2023.04",
      "org": "Pika Labs",
      "parent": "svd",
      "paperUrl": "https://pika.art",
      "projectUrl": "",
      "category": "diffusion_based",
      "motivation": "Pikaffects物理特效，电影级镜头控制",
      "summary": "Pika 的核心目标是：Pikaffects物理特效，电影级镜头控制。",
      "keyPoints": [
        "核心动机：Pikaffects物理特效，电影级镜头控制",
        "演化来源：继承或改进自 svd",
        "代表机构：Pika Labs"
      ],
      "detail": "<p>Pikaffects物理特效，电影级镜头控制</p>"
    },
    {
      "id": "pika25",
      "num": 17,
      "name": "Pika 2.5",
      "fullName": "Pika 2.5 (Pika 2.5)",
      "year": "2025.11",
      "org": "Pika Labs",
      "parent": "pika",
      "paperUrl": "https://pika.art/blog/pika-2-5",
      "projectUrl": "",
      "category": "diffusion_based",
      "motivation": "实时唇形同步，自动音效生成",
      "summary": "Pika 2.5 的核心目标是：实时唇形同步，自动音效生成。",
      "keyPoints": [
        "核心动机：实时唇形同步，自动音效生成",
        "演化来源：继承或改进自 pika",
        "代表机构：Pika Labs"
      ],
      "detail": "<p>实时唇形同步，自动音效生成</p>"
    },
    {
      "id": "lumiere",
      "num": 18,
      "name": "Lumiere",
      "fullName": "光影视频生成 (Lumiere)",
      "year": "2024.01",
      "org": "Google Research",
      "parent": "svd",
      "paperUrl": "https://arxiv.org/abs/2401.12945",
      "projectUrl": "",
      "category": "diffusion_based",
      "motivation": "时空U-Net单次生成完整时长，全局运动一致性",
      "summary": "Lumiere 的核心目标是：时空U-Net单次生成完整时长，全局运动一致性。",
      "keyPoints": [
        "核心动机：时空U-Net单次生成完整时长，全局运动一致性",
        "演化来源：继承或改进自 svd",
        "代表机构：Google Research"
      ],
      "detail": "<p>时空U-Net单次生成完整时长，全局运动一致性</p>"
    },
    {
      "id": "cogvideox",
      "num": 19,
      "name": "CogVideoX",
      "fullName": "认知视频X (CogVideoX)",
      "year": "2024.08",
      "org": "智谱AI",
      "parent": "cogvideo",
      "paperUrl": "https://arxiv.org/abs/2408.06072",
      "projectUrl": "",
      "category": "diffusion_based",
      "motivation": "3D因果VAE，Expert Transformer架构",
      "summary": "CogVideoX 的核心目标是：3D因果VAE，Expert Transformer架构。",
      "keyPoints": [
        "核心动机：3D因果VAE，Expert Transformer架构",
        "演化来源：继承或改进自 cogvideo",
        "代表机构：智谱AI"
      ],
      "detail": "<p>3D因果VAE，Expert Transformer架构</p>"
    },
    {
      "id": "veo",
      "num": 20,
      "name": "Veo",
      "fullName": "Veo视频生成 (Veo)",
      "year": "2024.05",
      "org": "Google DeepMind",
      "parent": "lumiere",
      "paperUrl": "https://deepmind.google/technologies/veo/",
      "projectUrl": "",
      "category": "diffusion_based",
      "motivation": "高分辨率生成，增强可控性",
      "summary": "Veo 的核心目标是：高分辨率生成，增强可控性。",
      "keyPoints": [
        "核心动机：高分辨率生成，增强可控性",
        "演化来源：继承或改进自 lumiere",
        "代表机构：Google DeepMind"
      ],
      "detail": "<p>高分辨率生成，增强可控性</p>"
    },
    {
      "id": "veo3",
      "num": 21,
      "name": "Veo 3.1",
      "fullName": "Veo 3.1 (Veo 3.1)",
      "year": "2026.01",
      "org": "Google DeepMind",
      "parent": "veo",
      "paperUrl": "https://blog.google/technology/ai/google-veo-3-update/",
      "projectUrl": "",
      "category": "diffusion_based",
      "motivation": "原生4K/60fps音视频同步，Cinematic Anchor",
      "summary": "Veo 3.1 的核心目标是：原生4K/60fps音视频同步，Cinematic Anchor。",
      "keyPoints": [
        "核心动机：原生4K/60fps音视频同步，Cinematic Anchor",
        "演化来源：继承或改进自 veo",
        "代表机构：Google DeepMind"
      ],
      "detail": "<p>原生4K/60fps音视频同步，Cinematic Anchor</p>"
    },
    {
      "id": "hunyuanvideo",
      "num": 22,
      "name": "HunyuanVideo",
      "fullName": "混元视频 (HunyuanVideo)",
      "year": "2024.12",
      "org": "腾讯",
      "parent": "svd",
      "paperUrl": "https://github.com/Tencent/HunyuanVideo",
      "projectUrl": "",
      "category": "diffusion_based",
      "motivation": "开源SSTA-DiT架构，8.3B参数",
      "summary": "HunyuanVideo 的核心目标是：开源SSTA-DiT架构，8.3B参数。",
      "keyPoints": [
        "核心动机：开源SSTA-DiT架构，8.3B参数",
        "演化来源：继承或改进自 svd",
        "代表机构：腾讯"
      ],
      "detail": "<p>开源SSTA-DiT架构，8.3B参数</p>"
    },
    {
      "id": "hunyuanvideo15",
      "num": 23,
      "name": "HunyuanVideo 1.5",
      "fullName": "混元视频1.5 (HunyuanVideo 1.5)",
      "year": "2026.04",
      "org": "腾讯",
      "parent": "hunyuanvideo",
      "paperUrl": "https://github.com/Tencent/HunyuanVideo",
      "projectUrl": "",
      "category": "diffusion_based",
      "motivation": "消费级GPU优化，14GB VRAM可运行",
      "summary": "HunyuanVideo 1.5 的核心目标是：消费级GPU优化，14GB VRAM可运行。",
      "keyPoints": [
        "核心动机：消费级GPU优化，14GB VRAM可运行",
        "演化来源：继承或改进自 hunyuanvideo",
        "代表机构：腾讯"
      ],
      "detail": "<p>消费级GPU优化，14GB VRAM可运行</p>"
    },
    {
      "id": "wan",
      "num": 24,
      "name": "Wan",
      "fullName": "万象视频生成 (Wan)",
      "year": "2025.02",
      "org": "阿里巴巴",
      "parent": "svd",
      "paperUrl": "https://wavespeed.ai",
      "projectUrl": "",
      "category": "diffusion_based",
      "motivation": "MoE架构，首末帧引导技术",
      "summary": "Wan 的核心目标是：MoE架构，首末帧引导技术。",
      "keyPoints": [
        "核心动机：MoE架构，首末帧引导技术",
        "演化来源：继承或改进自 svd",
        "代表机构：阿里巴巴"
      ],
      "detail": "<p>MoE架构，首末帧引导技术</p>"
    },
    {
      "id": "wan27",
      "num": 25,
      "name": "Wan 2.7",
      "fullName": "万象2.7 (Wan 2.7)",
      "year": "2026.03",
      "org": "阿里巴巴",
      "parent": "wan",
      "paperUrl": "https://wavespeed.ai/blog/wan-2-7-launch",
      "projectUrl": "",
      "category": "diffusion_based",
      "motivation": "2.7B参数开源，混合专家扩展",
      "summary": "Wan 2.7 的核心目标是：2.7B参数开源，混合专家扩展。",
      "keyPoints": [
        "核心动机：2.7B参数开源，混合专家扩展",
        "演化来源：继承或改进自 wan",
        "代表机构：阿里巴巴"
      ],
      "detail": "<p>2.7B参数开源，混合专家扩展</p>"
    },
    {
      "id": "seedance",
      "num": 26,
      "name": "Seedance",
      "fullName": "即梦视频生成 (Seedance)",
      "year": "2025.08",
      "org": "字节跳动",
      "parent": "svd",
      "paperUrl": "https://dreamina.com",
      "projectUrl": "",
      "category": "diffusion_based",
      "motivation": "时间线提示，精确时间窗口动作控制",
      "summary": "Seedance 的核心目标是：时间线提示，精确时间窗口动作控制。",
      "keyPoints": [
        "核心动机：时间线提示，精确时间窗口动作控制",
        "演化来源：继承或改进自 svd",
        "代表机构：字节跳动"
      ],
      "detail": "<p>时间线提示，精确时间窗口动作控制</p>"
    },
    {
      "id": "seedance2",
      "num": 27,
      "name": "Seedance 2.0",
      "fullName": "即梦2.0 (Seedance 2.0)",
      "year": "2026.02",
      "org": "字节跳动",
      "parent": "seedance",
      "paperUrl": "https://dreamina.com/seedance",
      "projectUrl": "",
      "category": "diffusion_based",
      "motivation": "原生音视频同步，C2PA加密水印",
      "summary": "Seedance 2.0 的核心目标是：原生音视频同步，C2PA加密水印。",
      "keyPoints": [
        "核心动机：原生音视频同步，C2PA加密水印",
        "演化来源：继承或改进自 seedance",
        "代表机构：字节跳动"
      ],
      "detail": "<p>原生音视频同步，C2PA加密水印</p>"
    },
    {
      "id": "kling",
      "num": 28,
      "name": "Kling",
      "fullName": "可灵视频生成 (Kling)",
      "year": "2024.06",
      "org": "快手",
      "parent": "svd",
      "paperUrl": "https://kling.kuaishou.com",
      "projectUrl": "",
      "category": "diffusion_based",
      "motivation": "3D时空联合注意力，2分钟1080p生成",
      "summary": "Kling 的核心目标是：3D时空联合注意力，2分钟1080p生成。",
      "keyPoints": [
        "核心动机：3D时空联合注意力，2分钟1080p生成",
        "演化来源：继承或改进自 svd",
        "代表机构：快手"
      ],
      "detail": "<p>3D时空联合注意力，2分钟1080p生成</p>"
    },
    {
      "id": "kling3",
      "num": 29,
      "name": "Kling 3.0",
      "fullName": "可灵3.0 (Kling 3.0)",
      "year": "2026.01",
      "org": "快手",
      "parent": "kling",
      "paperUrl": "https://arxiv.org/abs/2512.16776",
      "projectUrl": "",
      "category": "diffusion_based",
      "motivation": "4K/60fps生成，Kling-Foley原生音频",
      "summary": "Kling-Omni 提出了一个基于 Diffusion Transformer (DiT) 与视觉语言模型 (VLM) 对齐的统一多模态视频生成与编辑框架，通过 Multi-modal Visual Language (MVL) 输入协议将生成、编辑、参考引导等任务统一到单一模型中，支持 4K/60fps 输出并原生集成音频生成（Kling-Foley），在参考生成和视频编辑任务上达到业界领先水平。",
      "keyPoints": [
        "<strong>统一架构</strong>：DiT 骨干网络与 VLM 对齐，通过共享嵌入空间实现视频生成、编辑、多模态参考引导等任务的统一建模",
        "<strong>MVL 输入协议</strong>：Multi-modal Visual Language 格式将文本、图像、视频等多模态输入编码为统一序列，消除任务间的输入格式差异",
        "<strong>渐进式分辨率训练</strong>：从 256px 到 4K 的多阶段渐进训练策略，结合 flow matching（v-prediction 参数化）作为生成范式",
        "<strong>一致性蒸馏</strong>：将多步扩散模型蒸馏为少步生成模型，大幅降低推理延迟",
        "<strong>NTK-aware RoPE</strong>：位置编码外推技术，支持训练时未见过的更长序列和更高分辨率",
        "<strong>级联超分辨率 DiT</strong>：专用超分模型实现 4K 分辨率和 60fps 帧率输出",
        "<strong>Kling-Foley 音频生成</strong>：原生集成视频到音频生成模块，实现视听一体化",
        "<strong>高效训练基础设施</strong>：弹性 Ulysses 并行、流水线感知 offloading、97% 有效训练时间比",
        "<strong>FP8 混合量化推理</strong>：覆盖 GEMM 和注意力模块的 FP8 量化，结合缓存机制实现约 2× 推理加速",
        "<strong>三层数据过滤体系</strong>：基础质量过滤 → 时序稳定性评估 → 跨模态对齐检测的系统化数据工程"
      ],
      "detail": "<p><img alt=\"Kling-Omni 整体架构图\" src=\"https://arxiv.org/html/2512.16776v1/x1.png\" />\n<em>图：Kling-Omni 整体架构。DiT 骨干与 VLM 对齐，接受 MVL 格式的多模态输入，统一处理生成、编辑、参考引导等任务。</em></p>\n<p><img alt=\"渐进式训练策略\" src=\"https://arxiv.org/html/2512.16776v1/x2.png\" />\n<em>图：渐进式分辨率训练流程，从低分辨率逐步提升至 4K，每阶段引入更复杂的任务和数据。</em></p>\n<pre><code class=\"language-python\"># Kling-Omni 核心训练流程伪代码\n# 1. MVL 输入编码\ndef encode_mvl_input(text, images, videos, edit_instructions):\n    &quot;&quot;&quot;将多模态输入统一编码为 MVL 序列&quot;&quot;&quot;\n    text_tokens = text_encoder(text)           # 文本编码\n    image_tokens = vae_encode(images)          # 图像 → latent tokens\n    video_tokens = vae_encode(videos)          # 视频 → latent tokens\n    # VLM 对齐：将所有模态映射到共享嵌入空间\n    unified_cond = vlm_align([text_tokens, image_tokens, video_tokens])\n    return unified_cond\n\n# 2. Flow Matching 训练 (v-prediction)\ndef train_step(dit_model, x_0, condition):\n    t = sample_timestep()                      # 采样时间步\n    noise = torch.randn_like(x_0)\n    x_t = (1 - t) * x_0 + t * noise           # 线性插值构造含噪样本\n    v_target = noise - x_0                     # v-prediction 目标\n    v_pred = dit_model(x_t, t, condition)      # DiT 预测速度场\n    loss = mse_loss(v_pred, v_target)\n    loss.backward()\n    optimizer.step()\n\n# 3. 一致性蒸馏 (少步推理)\ndef consistency_distill(teacher, student, x_0):\n    &quot;&quot;&quot;将多步 teacher 蒸馏为少步 student&quot;&quot;&quot;\n    t_n, t_n1 = sample_adjacent_timesteps()\n    x_tn = add_noise(x_0, t_n)\n    # Teacher: ODE 求解从 t_n 到 t_n+1\n    x_teacher = ode_solve(teacher, x_tn, t_n, t_n1)\n    # Student: 直接预测\n    x_student = student(x_tn, t_n)\n    loss = mse_loss(x_student, x_teacher.detach())\n    return loss\n\n# 4. 渐进式分辨率训练\nstages = [\n    {&quot;resolution&quot;: 256,  &quot;tasks&quot;: [&quot;t2v_basic&quot;]},\n    {&quot;resolution&quot;: 512,  &quot;tasks&quot;: [&quot;t2v&quot;, &quot;i2v&quot;]},\n    {&quot;resolution&quot;: 1024, &quot;tasks&quot;: [&quot;t2v&quot;, &quot;i2v&quot;, &quot;editing&quot;, &quot;reference&quot;]},\n    {&quot;resolution&quot;: 2048, &quot;tasks&quot;: [&quot;all_tasks&quot;]},\n    {&quot;resolution&quot;: 4096, &quot;tasks&quot;: [&quot;all_tasks + super_resolution&quot;]},\n]\nfor stage in stages:\n    train(model, stage[&quot;resolution&quot;], stage[&quot;tasks&quot;])\n</code></pre>\n<h5>动机与背景</h5>\n<p>传统视频生成领域面临严重的任务碎片化问题：文本到视频（T2V）、图像到视频（I2V）、视频编辑、参考引导生成等任务通常需要独立的专家模型。这不仅增加了系统复杂度，还导致不同任务间的能力无法共享和协同。此外，现有方法在以下方面存在明显不足：\n- <strong>分辨率与帧率受限</strong>：大多数模型难以达到 4K/60fps 的高质量输出\n- <strong>多模态理解不足</strong>：缺乏对复杂多模态输入（多图参考、视频参考、编辑指令组合）的统一理解能力\n- <strong>音视频割裂</strong>：视频生成和音频生成通常是分离的流程</p>\n<p>Kling-Omni 的核心动机是构建一个\"通才型\"生成模型，用单一架构替代碎片化的专家模型群。</p>\n<h5>核心架构：DiT + VLM 对齐</h5>\n<p>Kling-Omni 的架构核心是一个 Diffusion Transformer (DiT)，与视觉语言模型 (VLM) 进行深度对齐。这种设计的关键创新在于：</p>\n<ol>\n<li>\n<p><strong>共享嵌入空间</strong>：VLM 将文本、图像、视频等不同模态的输入映射到统一的语义空间中，使 DiT 能够以一致的方式理解和处理各类条件信号。</p>\n</li>\n<li>\n<p><strong>MVL 输入协议</strong>：所有任务的输入被统一编码为 Multi-modal Visual Language 格式。例如，\"根据参考图像生成视频\"和\"编辑视频中的某个对象\"在 MVL 格式下具有相同的输入结构，只是条件内容不同。这使得模型无需为每个任务设计特定的输入处理逻辑。</p>\n</li>\n<li>\n<p><strong>条件注入机制</strong>：编码后的条件信号通过交叉注意力机制注入 DiT 的每一层，实现细粒度的条件控制。</p>\n</li>\n</ol>\n<div class=\"key-point\">💡 关键：MVL 协议的核心价值在于将\"任务类型\"从显式的架构差异转化为隐式的输入内容差异，从而实现真正的任务统一。</div>\n<h5>训练策略：渐进式多阶段训练</h5>\n<p>Kling-Omni 采用渐进式分辨率训练策略，从低分辨率逐步提升到高分辨率：</p>\n<ul>\n<li><strong>低分辨率阶段</strong>（256-512px）：模型学习基本的时空建模能力和语义理解</li>\n<li><strong>中分辨率阶段</strong>（512-1024px）：引入更复杂的任务（编辑、参考引导），模型学习跨模态对齐</li>\n<li><strong>高分辨率阶段</strong>（1024-2048px）：全任务训练，提升细节质量和时序一致性</li>\n<li><strong>超高分辨率阶段</strong>（4K）：通过级联超分辨率 DiT 实现最终的 4K/60fps 输出</li>\n</ul>\n<p>生成范式采用 <strong>Flow Matching</strong> 框架，使用 v-prediction 参数化。相比传统的 <span class=\"kb-math kb-math-inline\">\\epsilon</span>-prediction，v-prediction 在训练稳定性和生成质量上具有优势，其目标函数为：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L} = \\mathbb{E}_{t, x_0, \\epsilon} \\left[ \\| v_\\theta(x_t, t, c) - ({\\epsilon} - x_0) \\|^2 \\right]</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">x_t = (1-t) x_0 + t \\epsilon</span> 是线性插值构造的含噪样本，<span class=\"kb-math kb-math-inline\">c</span> 是条件信号。</p>\n<h5>一致性蒸馏与推理加速</h5>\n<p>为解决扩散模型推理步数多、延迟高的问题，Kling-Omni 采用一致性蒸馏（Consistency Distillation）技术：</p>\n<ul>\n<li><strong>Teacher 模型</strong>：完整的多步扩散模型，通过 ODE 求解器进行高质量采样</li>\n<li><strong>Student 模型</strong>：学习在更少的步数内直接映射到去噪结果</li>\n<li>蒸馏过程中，Student 被训练为在任意噪声水平上都能一步预测出与 Teacher 多步求解一致的结果</li>\n</ul>\n<p>推理端还结合了以下优化：\n- <strong>FP8 混合量化</strong>：大部分 GEMM 和自注意力模块量化为 FP8，量化/反量化操作融合进其他 kernel，实现零额外开销\n- <strong>条件缓存</strong>：对参考图像和视频的条件编码进行缓存，避免重复计算，实现约 2× 加速\n- <strong>混合并行推理</strong>：Ulysses 并行 + 张量并行，配合计算-通信重叠，隐藏大部分通信开销</p>\n<h5>位置编码外推：NTK-aware RoPE</h5>\n<p>为支持推理时生成比训练时更长的序列（更高分辨率或更多帧），Kling-Omni 采用 NTK-aware RoPE 位置编码。其核心思想是调整 RoPE 的基频参数，使模型能够在不重新训练的情况下外推到更长的序列：</p>\n<div class=\"kb-math kb-math-display\">\\text{RoPE}(x, m) = x \\cdot e^{im\\theta_k}, \\quad \\theta_k = \\beta^{-2k/d}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\beta</span> 是经过 NTK 感知调整的基频，<span class=\"kb-math kb-math-inline\">m</span> 是位置索引。通过适当增大 <span class=\"kb-math kb-math-inline\">\\beta</span>，高频分量的周期被拉长，从而避免在超出训练长度时出现位置编码冲突。</p>\n<h5>级联超分辨率与音频生成</h5>\n<p><strong>超分辨率</strong>：专用的超分 DiT 模型将基础分辨率输出提升至 4K/60fps。该模型以低分辨率视频作为条件输入，学习添加高频细节和时序插帧。</p>\n<p><strong>Kling-Foley 音频生成</strong>：原生集成的视频到音频生成模块，能够根据视频内容自动生成匹配的音效和环境音。这是 Kling-Omni 区别于其他视频生成模型的重要特性，实现了真正的视听一体化输出。</p>\n<h5>训练基础设施</h5>\n<p><img alt=\"训练流水线调度\" src=\"https://arxiv.org/html/2512.16776v1/x4.png\" />\n<em>图：Kling-Omni 的流水线调度。VAE/TE 的推理分布在数据并行和流水线并行维度上，采用交错 1F1B 调度。</em></p>\n<p>Kling-Omni 的训练基础设施实现了多项关键优化：</p>\n<ol>\n<li><strong>在线数据流水线</strong>：推理调度器将原始数据分配到 DP/PP 组，推理后由训练调度器重排以平衡负载</li>\n<li><strong>弹性 Ulysses 并行</strong>：微批次级别的动态 UP 度切换，在线自适应调度器异步确定每个微批次的并行度</li>\n<li><strong>两层 All-to-All 通信</strong>：节点内聚合 + 节点间交换，缓解 spine 交换机负载</li>\n<li><strong>MM-FlashAttention</strong>：支持任意跨模态 mask 和变长序列的打包版多模态 FlashAttention kernel</li>\n<li><strong>选择性重计算 + 流水线感知 offloading</strong>：将激活值卸载到 CPU，减少 GPU 显存占用</li>\n<li><strong>97% 有效训练时间比</strong>：自动故障检测（分钟级挂起检测）、亚分钟级重启、并行化 warmup</li>\n</ol>\n<h5>数据工程</h5>\n<p>数据系统覆盖跨模态（图像/文本/视频）和跨任务（I2V、V2V、编辑、参考生成）两个维度：</p>\n<ul>\n<li><strong>真实数据采集</strong>：大规模互联网数据挖掘，利用内部嵌入模型构建语义相关的跨模态样本</li>\n<li><strong>合成数据构造</strong>：专家模型驱动的合成流水线，包括自动逆向合成策略，构建保持时序一致性的参考-视频训练对</li>\n<li><strong>三层过滤体系</strong>：</li>\n<li>基础过滤：分辨率/时长阈值、帧级去重、音视频损坏检测、NSFW 过滤</li>\n<li>时序质量评估：模糊/抖动/压缩噪声检测、场景切换检测、低动作密度过滤</li>\n<li>跨模态对齐：视频-文本语义一致性、参考图像-目标视频保真度、编辑指令-执行结果对齐、人物身份一致性检查</li>\n</ul>\n<div class=\"warn-box\">⚠️ 注意：Kling-Omni 的核心创新不仅在于模型架构，更在于将生成、编辑、参考引导等任务通过 MVL 协议统一到单一模型中，并配合系统化的数据工程和高效训练基础设施实现了工业级部署。</div>",
      "quiz": {
        "q": "Kling-Omni 中 MVL (Multi-modal Visual Language) 输入协议的核心作用是什么？",
        "options": [
          "提升模型的参数效率，减少模型大小",
          "将不同任务的多模态输入统一编码为一致格式，消除任务间的输入差异",
          "替代 VAE 编码器，直接处理原始像素输入",
          "实现音频和视频的同步生成"
        ],
        "answer": 1,
        "explain": "MVL 协议将文本、图像、视频等多模态输入编码为统一序列格式，使得生成、编辑、参考引导等不同任务可以被同一个模型以一致的方式处理，这是 Kling-Omni 实现任务统一的关键设计。"
      }
    },
    {
      "id": "gwm1",
      "num": 30,
      "name": "GWM-1",
      "fullName": "通用世界模型1 (General World Model 1)",
      "year": "2026.02",
      "org": "Runway",
      "parent": "gen4",
      "paperUrl": "https://runwayml.com/research/introducing-general-world-models",
      "projectUrl": "",
      "category": "world_model",
      "motivation": "学习世界动力学，理解因果关系和物理规律",
      "summary": "GWM-1 的核心目标是：学习世界动力学，理解因果关系和物理规律。",
      "keyPoints": [
        "核心动机：学习世界动力学，理解因果关系和物理规律",
        "演化来源：继承或改进自 gen4",
        "代表机构：Runway"
      ],
      "detail": "<p>学习世界动力学，理解因果关系和物理规律</p>"
    },
    {
      "id": "vjepa2",
      "num": 31,
      "name": "V-JEPA 2",
      "fullName": "视频联合嵌入预测架构2 (Video Joint Embedding Predictive Architecture 2)",
      "year": "2026.03",
      "org": "Meta",
      "parent": "—",
      "paperUrl": "https://ai.meta.com/research/publications/",
      "projectUrl": "",
      "category": "world_model",
      "motivation": "自监督学习世界模型，机器人训练与仿真",
      "summary": "V-JEPA 2 的核心目标是：自监督学习世界模型，机器人训练与仿真。",
      "keyPoints": [
        "核心动机：自监督学习世界模型，机器人训练与仿真",
        "代表机构：Meta"
      ],
      "detail": "<p>自监督学习世界模型，机器人训练与仿真</p>"
    }
  ],
  "categories": {
    "gan_based": {
      "label": "GAN生成模型",
      "color": "#E74C3C"
    },
    "vae_based": {
      "label": "VAE变分编码",
      "color": "#9B59B6"
    },
    "autoregressive": {
      "label": "自回归模型",
      "color": "#3498DB"
    },
    "diffusion_based": {
      "label": "扩散模型",
      "color": "#2ECC71"
    },
    "world_model": {
      "label": "世界模型",
      "color": "#F39C12"
    }
  },
  "projectUrls": {}
};
