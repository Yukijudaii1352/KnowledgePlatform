/**
 * video_vision-data.js — 由 pipeline/build.py 于 2026-06-16 17:00:12 自动生成。
 * 源文件：content/cv/video_vision.md
 * ⚠️  请勿手动修改；如需更新，修改源文档后重新编译。
 */
window.PAGE_CONFIG = {
  "meta": {
    "domain": "cv",
    "topic_id": "video_vision",
    "topic_name": "视频视觉",
    "page_title": "视频视觉技术演进",
    "page_subtitle": "2026-06-16 版",
    "page_desc": "从手工特征到深度学习，再到视频基础模型与世界模型的技术演进",
    "page_icon": "🎬",
    "hero_pills": [
      "视频理解 · 动作识别 · 时序建模 · 视频大模型"
    ],
    "count_pill": "{count} 个算法",
    "image_base": "",
    "overview_from_doc": true,
    "latest_overview_from_doc": true
  },
  "overview": [
    {
      "title": "",
      "body_html": "<h1>CVPR 2026 视频模型趋势梳理：不止生成下一帧，更要理解下一步</h1>\n<ul>\n<li>来源平台: <strong>zhihu</strong>（知乎专栏文章）</li>\n<li>原文链接: <a href=\"https://zhuanlan.zhihu.com/p/2037598361134577057\">https://zhuanlan.zhihu.com/p/2037598361134577057</a></li>\n<li>作者: AI科技评论</li>\n</ul>\n<hr />\n<p>CVPR 2026 视频模型趋势梳理：不止生成下一帧，更要理解下一步</p>\n<h1>CVPR 2026 视频模型趋势梳理：不止生成下一帧，更要理解下一步</h1>\n<p>作者: AI科技评论, 赞: 13</p>\n<p><img alt=\"\" src=\"https://picx.zhimg.com/v2-e52eddd442f13ab87131761e4f2ca60d_1440w.jpg\" /></p>\n<p>视频智能正从画面生成走向运动控制、动态建模、信号理解与真实场景应用。</p>\n<p>编辑丨马晓宁</p>\n<p><strong><em>*<img alt=\"\" src=\"https://pic4.zhimg.com/v2-6a7f46d4391e7003d356222bebf86631_1440w.jpg\" /></em></strong>*</p>\n<p>过去，视频生成更多是在解决“像不像”的问题：人物是否清晰，画面是否流畅，风格是否统一。但随着模型能力提升，视频真正困难的部分开始显现出来——它不是一组漂亮帧的连续播放，而是一个由时间、空间、运动、相机、光照和物理信号共同构成的动态系统。</p>\n<p>只要模型无法理解这些隐含结构，它生成的视频就可能看似逼真，却在运动逻辑、视角一致性或真实场景适应上露出破绽。因此，视频智能正在进入一个更深的阶段：不只是生成画面，而是理解画面为什么会这样变化。</p>\n<p>从运动轨迹编辑、3D 结构约束、可迭代文生视频，到自适应视频 token、长期运动表征、频闪去除、热成像分离和地球观测模型，研究者实际上都在处理同一个底层问题：如何让模型把视频从“像素序列”理解为“动态世界”。</p>\n<p>这也是今年 CVPR 相关方向中一个值得注意的信号——<strong>视频模型的竞争重心，正在从视觉质量转向对时间、空间和物理规律的建模能力。</strong></p>\n<p>换句话说，视频 AI 的下一步，不是单纯把视频生成得更长、更清楚、更炫，而是让模型知道运动从哪里来、结构为什么稳定、信号如何形成，以及复杂场景中的变化如何被预测和控制。</p>\n<p>当这些能力逐渐补齐，视频模型才可能真正从内容生成工具，走向能够理解、编辑和推演现实世界的动态智能系统。</p>\n<p><strong>01</strong></p>\n<h2></h2>\n<h2><strong><em>*</em>*从改画面到改运动</strong>****</h2>\n<p>视频生成和视频编辑正在从“画面是否好看”，走向“运动是否可控”。谷歌和石溪大学共同提出的<strong>《MotionV2V: Editing Motion in a Video》</strong>研究的正是如何不只修改视频风格或局部外观，而是直接编辑视频里的“运动”。</p>\n<p>比如让人物换方向、让物体晚一点出现，或在保留场景内容的同时改变镜头运动。现有方法一旦涉及物体运动、相机轨迹或时间顺序变化，就很难保留原视频后续帧中已有的内容。</p>\n<p>MotionV2V 的核心思路是把视频运动表示成稀疏轨迹点，并让用户直接编辑这些轨迹。系统先从输入视频中提取物体或场景点的原始运动轨迹，用户再指定目标运动，模型根据“原始轨迹”和“目标轨迹”之间的差异生成编辑后的视频。论文把这种差异称为 motion edit，并用它指导视频扩散模型，在尽量保留原视频内容的同时，让目标物体或相机按新的方式运动。</p>\n<p><img alt=\"\" src=\"https://pic4.zhimg.com/v2-bd7e5d20b30a3ce22f6527eba68a37d3_1440w.jpg\" /></p>\n<p>它的亮点在于，MotionV2V 不是从单张图片重新生成视频，而是真正以完整输入视频为条件进行 video-to-video motion editing。因此它可以利用视频中任意时间点的信息，处理首帧里还没出现的物体，也能支持物体运动、相机运动、时间控制和连续多次编辑。</p>\n<p>作者还构建了 motion counterfactuals，即内容相同但运动不同的视频对，用来微调 motion-conditioned video diffusion 架构。从论文对比来看，MotionV2V 在内容保留、运动控制和整体编辑质量上优于已有方法，用户研究中也获得约 70% 的偏好率。整体来看，这篇论文把视频编辑从“改外观”推进到“改运动”。</p>\n<p><img alt=\"\" src=\"https://pic1.zhimg.com/v2-9aca33fb353cfe2ab6e6f8157d135322_1440w.jpg\" /></p>\n<p>当运动编辑涉及相机、物体和非刚性形变时，仅靠 2D 运动线索往往不够。Adobe 和马里兰大学帕克分校共同提出的<strong>《Generative Video Motion Editing with 3D Point Tracks》</strong>进一步使用 3D point tracks 作为统一的运动控制表示，同时改变视频里的相机运动和物体运动。</p>\n<p>系统会先估计输入视频中的相机参数和 3D 点轨迹，用户编辑相机运动或物体轨迹后，再由 video-to-video 生成模型合成新视频。</p>\n<p><img alt=\"\" src=\"https://pic1.zhimg.com/v2-623598d9fd4ad0cd4b153686bd89cfea_1440w.jpg\" /></p>\n<p>相比 2D 轨迹，3D 轨迹提供了深度信息，可以帮助模型判断遮挡关系、前后层次和真实空间运动。论文还设计了 3D track conditioner，通过 cross-attention 从输入视频中采样视觉上下文，并把这些信息对齐到目标帧空间中，让模型在改变运动的同时保持画面连贯。</p>\n<p>由于真实世界中很难获得成对训练数据，作者采用两阶段训练：先用合成数据学习基础运动控制，再用真实单目视频构造非连续片段对，缩小合成到真实的差距。整体来看，这篇论文把视频运动编辑推进到更 3D-aware 的阶段，也支持运动迁移、非刚性变形、物体移除和复制等效果。</p>\n<p><img alt=\"\" src=\"https://pica.zhimg.com/v2-98af03eee9e2ddbf0afc0d48b385cc92_1440w.jpg\" /></p>\n<p>如果输入只有一张物体图像，模型如何在相机绕物体旋转时生成稳定、真实、结构一致的视频？澳大利亚国立大学和亚马逊共同提出的<strong>《Towards Realistic and Consistent Orbital Video Generation via 3D Foundation Priors》</strong>研究的就是从单张物体图像生成 orbital video。现有视频生成方法在大角度视角变化时缺少可靠像素对应关系，容易生成结构扭曲或不合理的物体形状。</p>\n<p><img alt=\"\" src=\"https://pic3.zhimg.com/v2-9e714e9ce26c9f00c506f06223867448_1440w.jpg\" /></p>\n<p>这篇论文的核心思路是引入 3D foundation model 中学到的形状先验，用它辅助视频扩散模型生成更稳定的环绕视频。模型从单张输入图像中提取两类 3D latent features：全局 latent vector 提供整体结构指导，体积特征投影得到的 latent images 提供随视角变化的几何细节。</p>\n<p>相比深度图或法线图，这些 3D latent features 能表达更完整的物体形状，也避免显式提取 mesh 的额外开销。作者还设计了 multi-scale 3D adapter，把不同尺度的 3D 特征接入基础视频模型，从而提升生成视频的真实感、物体形状合理性和多视角一致性。</p>\n<p><img alt=\"\" src=\"https://pica.zhimg.com/v2-282b10dc5f84bd619c56bdbc58d61714_1440w.jpg\" /></p>\n<p>谷歌和新加坡国立大学共同提出的<strong>《VISTA: A Test-Time Self-Improving Video Generation Agent》</strong>则把重点放在生成流程本身：当用户给出文本想法后，系统能不能反复评估、反思和修改，直到生成更符合意图的视频。</p>\n<p>它研究的是 test-time self-improvement，也就是不重新训练视频生成模型，而是在推理阶段通过反复评价和改写 prompt 来提升结果。</p>\n<p>VISTA 会先把用户想法拆成带有时间结构的场景计划，包括时长、角色、动作、对白、环境、相机、声音和情绪等要素；生成多个候选视频后，通过 pairwise tournament 选出当前最好结果；随后由视觉、音频和上下文评审智能体提出意见，最后由 reasoning agent 综合反馈并改写 prompt，进入下一轮生成。</p>\n<p><img alt=\"\" src=\"https://pic2.zhimg.com/v2-b92a322af46b1edc79e1d86a5549462d_1440w.jpg\" /></p>\n<p>它的亮点在于，VISTA 不是只优化某个指标，而是把视频规划、候选筛选、多维度评价和提示词重写串成自动闭环。论文中提到，VISTA 在自动指标下相较先进基线最高达到 60% 的 pairwise win rate，在人工评测中也获得 66.4% 的偏好率。整体来看，它把文生视频从“一次性生成”推进到“生成—评价—反思—再生成”。</p>\n<p><img alt=\"\" src=\"https://picx.zhimg.com/v2-3cf59476bd7c044e12aaace9ec732dbf_1440w.jpg\" /></p>\n<p><strong>02</strong></p>\n<h2></h2>\n<h2><strong><em>*</em>*让模型先学会「怎么动」</strong>****</h2>\n<p>要让视频模型更好地生成和编辑内容，底层表示也需要更高效。上海交通大学、香港中文大学多媒体实验室、上海人工智能实验室 OpenGVLab、同济大学、清华大学共同提出的<strong>《AdapTok: Learning Adaptive and Temporally Causal Video Tokenization in a 1D Latent Space》</strong>研究的是视频 tokenization 问题，也就是如何把连续视频帧压缩成更适合自回归模型处理的离散 token。</p>\n<p><img alt=\"\" src=\"https://pic1.zhimg.com/v2-9970a279b9c32b5973d77d6ac10d7fb8_1440w.jpg\" /></p>\n<p>AdapTok 的核心思路是让视频 token 分配变得自适应。它不是给每个时间段分配同样多的 token，而是根据视频内容、时间变化和整体预算，动态决定哪里多用 token、哪里少用 token。</p>\n<p>它使用 1D latent token space 表示视频，并引入 temporal causality，让前面帧的编码和解码不依赖未来帧，更适合流式处理和自回归生成；同时通过 block-wise masking、block causal scorer 和 IPAL 策略完成自适应分配。</p>\n<p>这样一来，运动明显、场景变化大的片段会获得更多 token，静态或冗余片段则使用更少 token。在 UCF-101 和 Kinetics-600 任务中，AdapTok 在不同 token 预算下都能提升重建质量和生成表现。</p>\n<p><img alt=\"\" src=\"https://pica.zhimg.com/v2-ea802fd7f15e45940b4f58885568a064_1440w.jpg\" /></p>\n<p>AdapTok 解决的是视频如何被高效表示，而 CompVis @ LMU、MCML 和苹果共同提出的<strong>《Learning Long-term Motion Embeddings for Efficient Kinematics Generation》</strong>进一步追问：如果只是理解未来怎么动，是否一定要完整生成像素视频。论文转向学习一种更紧凑的 long-term motion embedding，用来表示场景中的长期运动规律。</p>\n<p>它从大规模 tracker 模型得到的轨迹数据中学习压缩运动空间，把稀疏轨迹和起始帧编码成 latent motion grid，并可在任意空间查询点上重建密集运动；随后在这个运动 latent 空间里训练 conditional flow-matching 模型，根据文本任务描述或 spatial pokes 生成长期运动。这种表示可达到 64 倍时间压缩，也就是说模型不用逐帧生成视频，就能在更抽象的运动空间中推断未来动态。</p>\n<p><img alt=\"\" src=\"https://picx.zhimg.com/v2-a2cd67c6055461c8eb2b348a0c578aeb_1440w.jpg\" /></p>\n<p>这篇论文的亮点在于，它把“生成视频”拆成了更基础的“生成运动”。这种 kinematics-first 方式更适合探索多个可能未来，也更适合机器人规划、轨迹预测和长期动态建模。</p>\n<p>在开放域互联网视频和 LIBERO 机器人基准上，它的运动生成质量、条件遵循能力和效率都优于专门轨迹预测方法以及 Wan、Veo 3 等视频模型基线。整体来看，AI 不一定要先“画出未来”，也可以先学会“未来应该怎么动”。</p>\n<p><img alt=\"\" src=\"https://pic4.zhimg.com/v2-da552462ee4a713b6c2f8bf465abe97d_1440w.jpg\" /></p>\n<p><strong>03</strong></p>\n<h2></h2>\n<h2><strong><em>*</em>*从修复画面到理解信号来源</strong>****</h2>\n<p>除了生成和编辑，视频与图像研究也在关注如何从复杂成像退化中恢复可靠信息。南开大学国际先进研究院、鹏城实验室、南开大学计算机学院、香港理工大学、OPPO 研究院共同提出的<strong>《It Takes Two: A Duet of Periodicity and Directionality for Burst Flicker Removal》</strong>研究的是短曝光连拍图像中的 flicker artifact 去除问题。</p>\n<p>这类退化由人工光源频闪和 rolling shutter 共同造成，表现为条纹状、明暗不均的闪烁，不能简单当作普通噪声或低光增强处理。</p>\n<p>Flickerformer 的核心思路是利用闪烁退化的周期性和方向性。周期性来自交流电光源亮度变化，方向性与相机逐行扫描机制有关。针对这两个特点，Flickerformer 设计了 PFM、AFFN 和 WDAM 三个模块，分别用于帧间相位相关融合、单帧自相关建模，以及小波域方向性高频修复。</p>\n<p><img alt=\"\" src=\"https://pic3.zhimg.com/v2-412ddd38d28888514eaede247db85fbe_1440w.jpg\" /></p>\n<p>它的亮点在于，把频闪本身的物理先验嵌入网络结构里，而不是把 flicker removal 当成普通图像增强任务。在 BurstDeflicker benchmark 上，Flickerformer 超过多种图像复原和 burst restoration 方法，取得 31.226 PSNR、0.920 SSIM、0.045 LPIPS。整体来看，这篇论文让模型能够更准确地去除条纹闪烁，同时保留细节并减少重影。</p>\n<p>类似思路也出现在热成像研究中。CMU 提出的<strong>《Dual Band Video Thermography: Separating Time-Varying Reflection and Emission Near Ambient Conditions》</strong>研究的是热成像中的发射 / 反射分离问题。</p>\n<p>热相机看到的长波红外信号既可能来自物体自身热辐射，也可能来自周围环境反射；在接近室温的日常场景中，这两部分信号强度接近且都会随时间变化，因此很难判断亮暗变化到底来自物体温度变化，还是背景反射。</p>\n<p><img alt=\"\" src=\"https://pic4.zhimg.com/v2-6cd665eb64dffd6b45834b960a897e3f_1440w.jpg\" /></p>\n<p>论文提出 dual-band thermal videography，用两个长波红外子波段视频分离“物体自身发射”和“背景反射”。它同时利用光谱线索和时间线索：同一材料在两个波段中的发射率比例相对固定，而物体热传导变化通常更平滑、背景反射变化更快。</p>\n<p>实验中，方法能把咖啡壶升温时的热发射与旁边移动人物的反射分开，也能区分玻璃板上的手指热印和手指反射。在酒杯和咖啡壶视频中的非校准温度估计误差分别约为 1.72% 和 5.34%。整体来看，这篇论文把热成像从“看到温度分布”推进到“理解热信号来源”。</p>\n<p><img alt=\"\" src=\"https://pic3.zhimg.com/v2-65c6483b8a4fec73226f8f2bb84040d6_1440w.jpg\" /></p>\n<p><strong>04</strong></p>\n<h2></h2>\n<h2><strong><em>*</em>*让视觉模型进入真实世界任务</strong>****</h2>\n<p>当视觉模型进入遥感和地球观测场景时，问题会比普通图像更复杂：模型不仅要处理图像，还要同时理解时间序列、多源数据和地图标注。艾伦人工智能研究所、华盛顿大学、亚利桑那州立大学、不列颠哥伦比亚大学联合提出的<strong>《Helios: Stable Latent Image Modeling for Multimodal Earth Observation》</strong>研究的是面向地球观测数据的多模态基础模型。</p>\n<p>地球观测数据既有图像空间结构，也有类似视频或文本的时间序列特征，还包含卫星影像、地图、地形、作物、土地覆盖等多种模态。</p>\n<p>这篇论文提出的模型叫 OlmoEarth，目标是让地球观测基础模型更稳定、更高效，也更容易落地到环保、人道主义和公共利益相关任务中。它不只训练模型，还配套构建端到端平台，用于数据收集、标注、训练和推理，降低真实组织使用前沿地球观测模型的门槛。</p>\n<p><img alt=\"\" src=\"https://pica.zhimg.com/v2-56ce3bc9907b00f3c8c2e94bb486c9ee_1440w.jpg\" /></p>\n<p>OlmoEarth 的核心方法是 Latent MIM Lite。它用随机初始化、训练中冻结的线性投影层，把图像 patch 投到 token 空间作为预测目标，在保留 latent modeling 表征能力的同时提升训练稳定性。这个设计还把自监督数据和带标注地图数据统一到同一个 token 空间里，让模型可以用相同损失学习观测数据和标签地图。</p>\n<p>针对遥感数据空间、时间和模态高度冗余的问题，OlmoEarth 采用 modality-aware masking，让模型必须从其他时间、空间或模态中推断缺失信息；同时只在同一 bandset 内进行 token 对比，避免大量“太容易”的负样本削弱训练效果。</p>\n<p>综合评估中，OlmoEarth 与 12 个其他基础模型相比，在 embedding 评估中于 24 个任务里的 15 个取得最好表现；在 full fine-tuning 设置下，于 29 个任务里的 19 个取得最好表现。整体来看，这篇论文为地球观测任务提出了一个更稳定、更开放、更面向真实应用的多模态基础模型体系。</p>\n<p><img alt=\"\" src=\"https://pic3.zhimg.com/v2-91c4cf8b3127b3bc0e75f6a336f10c76_1440w.jpg\" /></p>\n<p>这次去 CVPR 现场，一定不要错过</p>\n<p>【认识大牛+赚外快】的机会</p>\n<p>需要你做什么：把你最关注的10个大会报告，每页PPT都拍下来</p>\n<p>你能获得什么？</p>\n<p>认识大牛：你将可以进入CVPR名师博士社群；</p>\n<p>钱多活少：提供丰厚奖金，任务量精简；</p>\n<p>听会自由：你的行程你做主，顺手就把外快赚。拍下你最感兴趣的10个报告PPT即可。</p>\n<p>【限额5位，先到先得】</p>\n<p>//</p>"
    }
  ],
  "latest_overview": [
    {
      "title": "",
      "body_html": "<h1>CVPR 2026 多模态视觉智能全景梳理：从感知到推理的范式重写</h1>\n<ul>\n<li>来源平台: <strong>zhihu</strong>（知乎专栏文章）</li>\n<li>原文链接: <a href=\"https://zhuanlan.zhihu.com/p/2032218148754170046\">https://zhuanlan.zhihu.com/p/2032218148754170046</a></li>\n<li>作者: AI科技评论</li>\n</ul>\n<hr />\n<p>CVPR 2026 多模态视觉智能全景梳理：从感知到推理的范式重写</p>\n<h1>CVPR 2026 多模态视觉智能全景梳理：从感知到推理的范式重写</h1>\n<p>作者: AI科技评论, 赞: 6</p>\n<p><img alt=\"\" src=\"https://pic2.zhimg.com/v2-b90a20b258fcbacd63b95b35f80b8ecd_1440w.jpg\" /></p>\n<p>视觉智能：从单一感知能力，扩展为融合感知、认知与行动的一体化智能形态。</p>\n<p>编辑丨岑 峰</p>\n<p><strong><em>*<img alt=\"\" src=\"https://pic4.zhimg.com/v2-6a7f46d4391e7003d356222bebf86631_1440w.jpg\" /></em></strong>*</p>\n<p>如果回看过去十年的计算机视觉发展，其主线其实非常清晰：从早期以 ImageNet classification 为代表的“识别范式”，到以检测、分割为核心的“结构理解”，再到扩散模型推动的“生成范式”，视觉研究始终围绕一个核心目标展开——<strong>让机器更准确地“看见世界”</strong>。</p>\n<p>然而，这一路径在近两年开始出现明显的边界：当模型已经可以在静态图像上达到接近甚至超过人类的感知水平时，“看得更准”本身，正在变成一个边际收益递减的问题。</p>\n<p>在这样的背景下，在 CVPR 2026 中的一些相关工作所呈现出的，不再只是性能曲线的继续上扬，而是一种更深层的范式转向：视觉不再被视为终点，而被重新定位为一种中介能力<strong>，</strong>它服务于更高层的目标，例如推理、决策与交互。</p>\n<p>这种变化直接体现在多个层面：一方面，越来越多工作开始质疑以语言为中心的推理路径，尝试让模型在视觉或潜在空间中直接完成结构推理；另一方面，研究者也在反思现有评测体系与数据构建方式，因为如果评价标准本身存在偏差，那么所谓的“进步”很可能只是对 benchmark 的过拟合。</p>\n<p>更重要的是，这一届论文并不是在单一方向上推进，而是呈现出一种系统性重构的迹象：推理机制上，从“始终推理”走向“按需推理”，从显式链式推理走向隐式表示推理。</p>\n<p>评测层面，从选择题式的便捷评估走向更接近真实能力的开放式验证；模型形态上，从单一任务模型演进为支持图像、视频与定位的一体化多模态系统；而在数据层面，则从零散数据集走向规模化、结构化且任务驱动的数据基础设施。</p>\n<p>这些变化背后隐含着一个更深的共识正在形成：<strong>视觉智能的瓶颈，已经不再只是模型能力本身，而是“推理方式、评测范式、系统形态与数据供给”之间的协同问题。</strong></p>\n<p>基于这样的整体趋势，AI 科技评论对本届具有代表性的工作进行了系统梳理，从推理机制的重构、评测范式的反思、模型系统的演进以及数据基础设施的升级四个关键维度出发，选取了一系列具有标志性意义的论文，试图还原这一轮视觉智能范式转变的核心脉络。</p>\n<p><strong>01</strong></p>\n<h2><strong><em>*</em>*推理，可能一直用错了</strong>****</h2>\n<p>如果说过去的多模态研究默认一种路径——无论任务难易，模型都应该通过 Chain-of-Thought 展开逐步推理，那么由 Meta AI、KAUST 以及普林斯顿大学共同提出的<strong>《 VideoAutoThink: Video Auto Reasoning via Thinking Once, Answering Twice》</strong>实际上是在动摇这个前提本身。</p>\n<p>在视频理解任务中，主流方法往往依赖显式推理来提升性能，但作者通过实验观察到一个并不直观的现象：对于经过强化学习优化的视频模型，直接回答在不少情况下已经可以达到，甚至超过带推理的结果。这意味着问题并不在于模型缺乏推理能力，而在于“每一次都推理”本身可能是低效甚至冗余的。</p>\n<p>基于这一点，论文提出了 VideoAuto-R1 框架，与其说是在增强推理，不如说是在重新调度推理。模型在训练阶段采用一种“Thinking Once, Answering Twice”的机制：先生成一个初始答案，再进行推理得到修正后的答案，并同时对这两个输出进行监督学习，使模型既具备快速响应能力，又具备在必要时进行深入推理的能力。</p>\n<p>而在推理阶段，模型不会固定执行推理流程，而是根据初始答案的置信度动态决策——如果问题简单，则直接输出结果；如果问题复杂，才触发后续推理。</p>\n<p>这种设计把“是否推理”从一个人为设定的流程，转变为模型自身可以学习的决策变量。实验结果进一步说明，这种按需推理的方式不仅没有损失性能，反而在保持当前最优水平的同时，将平均输出长度减少约 3.3 倍。</p>\n<p>同时也揭示出一个更细粒度的规律：在感知类任务中，推理的作用相对有限，而在真正需要复杂逻辑的任务中，推理才显得关键。</p>\n<p><img alt=\"\" src=\"https://pic1.zhimg.com/v2-83f2f3736dd5993082ae7f2e14c41394_1440w.jpg\" /></p>\n<p>论文链接：<a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/pdf/2601.05175v2\">https://arxiv.org/pdf/2601.05175v2</a></p>\n<p>这篇论文的亮点主要体现在三个方面。首先，它提出了一种“按需推理”的新范式，使模型不再固定执行复杂推理流程，从而显著提高效率。</p>\n<p>其次，通过“双答案训练机制”，模型在保持高性能的同时减少不必要的推理开销，在实验中将平均输出长度减少约 3.3 倍，同时仍达到当前最优水平。</p>\n<p>最后，论文揭示了一个重要现象，即<strong>推理并不是在所有任务中都必要</strong>，在感知类任务中使用较少，而在复杂推理任务中才更有价值，这为后续多模态模型设计提供了重要启发 。</p>\n<p>总体来看，这篇论文的核心贡献是提出了一种“按需触发推理”的视频理解框架，使多模态模型在保证性能的同时显著提升效率，从而推动视频理解从“始终推理”向“自适应推理”转变。</p>\n<p><img alt=\"\" src=\"https://picx.zhimg.com/v2-5156da1a2add2016d4397bb54b479c49_1440w.jpg\" /></p>\n<p>如果说 VideoAuto-R1 是在回答“推理是否必须发生”，那么由加州大学伯克利分校、Xero 以及 MIT-IBM Watson AI Lab 共同提出的<strong>《Latent Visual Reasoning》</strong>则是在追问另一个更隐蔽的问题——即便发生了推理，它是否一定要以语言为中介。</p>\n<p>当前多模态模型虽然能够处理视觉输入，但其内部推理过程依然高度依赖语言表示，这在处理拼图、空间对应关系、几何结构等任务时会遇到表达瓶颈，因为这些结构本身很难被线性的文本步骤充分刻画。</p>\n<p>同时，已有方法往往依赖人工设计的中间监督信号（例如边界框或裁剪区域），不仅标注成本高，也限制了模型学习更灵活的视觉表示能力。</p>\n<p>在这种背景下，LIVR（Latent Implicit Visual Reasoning）提出了一种不同路径：与其显式构造推理步骤，不如让模型在潜在空间中自行形成推理结构。</p>\n<p>具体来说，方法在输入中引入一组 latent visual tokens，并通过一种“视觉瓶颈机制”强制模型在预测答案时只能通过这些 token 获取视觉信息，而不能直接访问原始图像特征。这种限制实际上迫使模型将关键信息压缩并编码进这些潜在表示中，从而在 latent 空间中完成信息组织与推理。</p>\n<p>训练过程分为两个阶段：首先学习 latent token 如何承载视觉信息，其次恢复完整结构进行联合优化。最终得到的不是一条可读的推理链，而是一种隐式的、内嵌在表示中的推理过程。这种方式不依赖显式中间监督，却在多个视觉任务和不同模型架构上都带来了稳定性能提升，说明这种“去语言化”的推理机制具备较强的泛化能力。</p>\n<p><img alt=\"\" src=\"https://picx.zhimg.com/v2-2fd0dd456c6e5311f03b45c4c9384209_1440w.jpg\" /></p>\n<p>这篇论文的亮点主要体现在三个方面。首先，它提出了一种<strong>不依赖显式监督的视觉推理方式</strong>，模型可以自动学习中间表示，而不需要人工设计推理步骤。</p>\n<p>其次，它将推理从“文本链式推理”扩展到“潜在空间推理”，使模型能够更自然地表达复杂视觉结构。最后，该方法具有很强的通用性，在多个视觉任务和多模型上都能稳定提升性能，说明这种隐式视觉推理机制具有良好的泛化能力 。</p>\n<p>总体来看，这篇论文的核心贡献是提出了一种基于潜在 token 的隐式视觉推理框架，使多模态模型从依赖语言进行推理，转向在内部表示中进行更高效、更灵活的视觉推理。</p>\n<p><img alt=\"\" src=\"https://pica.zhimg.com/v2-25f2880350f4f4ba1b876df70e3666d6_1440w.jpg\" /></p>\n<p>而麻省理工学院（MIT）的研究论文<strong>《ARC Is a Vision Problem!》</strong>则更进一步，直接打破了问题本身的建模方式。ARC（抽象推理基准）长期以来被视为语言推理任务，大量方法依赖大语言模型进行规则归纳与解释，但这篇论文指出，这种处理方式可能从一开始就偏离了问题本质。</p>\n<p>与其说 ARC 是一个需要语言推理的问题，不如说它是一个典型的视觉结构变换问题，其核心在于空间关系、对称性以及几何规律，而非语言逻辑。</p>\n<p><img alt=\"\" src=\"https://pic1.zhimg.com/v2-547a5637c762428794e7702a5799849c_1440w.jpg\" /></p>\n<p>基于这一重新定义，研究将 ARC 建模为一个图像到图像的映射任务：首先将原始网格嵌入到一个“画布（canvas）”中，使其可以像自然图像一样被处理；随后直接使用标准视觉模型（例如 Vision Transformer）学习从输入到输出的空间变换规则。</p>\n<p>在推理阶段，方法进一步引入测试时训练（test-time training），使模型能够在看到少量示例后进行快速适应，从而实现跨任务泛化。</p>\n<p>值得注意的是，这种方法并不依赖大规模预训练数据，但依然能够在 ARC 上取得接近人类水平的性能，同时显著缩小与大型语言模型之间的差距。其背后依赖的是视觉模型天然具备的归纳偏置，例如空间局部性、平移不变性和尺度不变性，这些特性使模型能够更自然地学习抽象规则，并在少样本场景中展现出更强的泛化能力。</p>\n<p>总体来看，这篇论文的核心贡献是将 ARC 问题从“语言推理”重新定义为“视觉建模问题”，并证明基于视觉的方法可以有效学习抽象规则，从而为通用推理模型提供了一种新的方向。</p>\n<p><img alt=\"\" src=\"https://pic3.zhimg.com/v2-7af0cb2029b69d6bc997a4ef4765ff8a_1440w.jpg\" /></p>\n<p>把这几项工作放在一起看，会发现它们并不是简单地提升模型能力，而是在逐步拆解“推理”这一概念本身：如果说过去的路径是默认所有问题都需要通过语言展开推理，那么现在的趋势更像是在重新分工，有些问题本质上是感知问题，可以直接回答。</p>\n<p>有些推理可以在潜在表示中完成，而不需要显式展开；还有一些任务甚至需要先被重新定义，才能找到更合适的建模方式。也正是在这种不断打破既有假设、并建立新范式的过程中，多模态模型开始从“始终推理”的范式，转向一种更具适应性的“按需与多形态推理”。</p>\n<p><strong>02</strong></p>\n<h2></h2>\n<h2><strong><em>*</em>*评测，正在误导一切</strong>****</h2>\n<p>如果说现有视觉语言模型的评测大多还停留在“看懂了什么”这一层，那么由清华大学电机工程系、清华大学深圳国际研究生院、清华大学交叉信息研究院与理想汽车共同提出的<strong>《VS-Bench: Evaluating VLMs for Strategic Abilities in Multi-Agent Environments》</strong>，则把问题推进到了更接近真实世界的一步：模型不仅要看懂环境，还要在多个智能体共同参与的场景中理解合作、竞争与策略选择。</p>\n<p>现实任务往往不是单一主体面对静态图像，而是多个智能体在同一环境中相互影响，既可能合作，也可能竞争，还可能处在混合动机之下；但已有基准大多局限于单智能体或纯文本环境，很难真正衡量 VLM 在复杂交互场景中的策略能力。</p>\n<p>基于这个缺口，论文提出了<strong>VS-Bench（Visual Strategic Benchmark）</strong>，构建了一个多模态、多智能体的统一评测环境，其中包含 10 个视觉驱动的交互场景，覆盖合作、竞争以及混合动机等任务类型。</p>\n<p><img alt=\"\" src=\"https://picx.zhimg.com/v2-e84f62e5d5c7a3384e6c1e87998f0a07_1440w.jpg\" /></p>\n<p>更重要的是，它没有只看最终答对与否，而是把模型能力拆成三个层次来评估：首先是感知能力，也就是能否识别环境元素；其次是策略推理能力，即能否预测下一步行动；最后是决策能力，也就是模型在整体任务中的实际表现。</p>\n<p>这样的拆分让评测结果不再只是一个分数，而能进一步看出模型到底是“没看懂”，还是“看懂了但不会推理”，又或者是“能推理但决策不稳”。</p>\n<p>实验中，作者测试了多个主流视觉语言模型，结果显示这些模型虽然在感知层面已经表现较强，但在策略推理和决策上仍然存在明显差距。也就是说，它们很多时候是“看得懂环境”，却还没有真正具备在复杂交互中做出好决策的能力。</p>\n<p>这篇工作的价值也正在这里：它首次建立了一个面向多智能体与多模态场景的统一评测框架，弥补了现有基准在复杂交互任务上的空缺；同时又通过感知、推理、决策三层拆解，让 VLM 的能力分析更细致、更可解释。</p>\n<p>与其说它只是增加了一个新 benchmark，不如说它把视觉语言模型的评估范围，从单一图像理解扩展到了策略推理与交互决策，从而为后续研究明确指出了一个关键短板：当前模型已经越来越会“看”，但还远没有真正学会在多智能体环境中“谋”。</p>\n<p><img alt=\"\" src=\"https://pic4.zhimg.com/v2-7cac136604c6a6d68af8bdcb1602f8bf_1440w.jpg\" /></p>\n<p>相比之下中国科学院自动化研究所、中国科学院大学人工智能学院、智源 FlagEval 团队、北京航空航天大学、北京大学、浙江大学共同提出的<strong>《Beyond Multiple Choice: Verifiable OpenQA for Robust Vision-Language RFT》</strong>，则把目光转向了另一个更基础、却同样影响深远的问题：我们现在用来训练和评估多模态模型的题目形式，本身是否可靠。</p>\n<p>当前大量视觉问答基准采用多项选择问答（MCQA），这种形式确实方便自动评测，但论文指出，选项本身常常会泄露额外信息，使模型即使没有真正理解图像和问题，也能通过排除法、选项偏差或猜测模式拿到较高分数。换句话说，模型分数看起来变高了，但真实能力可能被系统性高估。</p>\n<p>为了解决这个问题，论文提出了<strong>ReVeL（Rewrite and Verify by LLM）</strong>框架，试图打破对选择题形式的依赖，建立一种“可验证开放问答”的新范式。</p>\n<p><img alt=\"\" src=\"https://pic2.zhimg.com/v2-415ed861c6acaf691e69980ad4697b19_1440w.jpg\" /></p>\n<p>它的核心做法并不是简单删除选项，而是根据不同问题类型设计对应的重写策略和验证机制，把原本依赖选项的信息重新组织成开放式问答形式，同时保留自动验证答案的能力。这样一来，模型在回答时不能再借助选项进行投机性推理，而必须真正基于视觉内容和问题语义生成答案。</p>\n<p>在训练阶段，作者进一步利用这些转换后的数据对视觉语言模型进行强化微调，使训练信号更加接近真实开放场景，也降低了 MCQA 选项偏差带来的干扰。</p>\n<p>这篇论文最关键的贡献，是把一个长期被默认接受的评测形式重新问题化了。作者不仅指出 MCQA 存在“虚高”风险，还通过实验量化了这种偏差，发现分数可能被高估多达约 20 个百分点。</p>\n<p>在此基础上，ReVeL 又提供了一条从“选择题评测”走向“可验证开放问答”的路径。它既保留了自动评测的可操作性，又迫使模型摆脱对选项线索的依赖，从而提升开放问答能力、数据效率和训练稳健性。</p>\n<p>与其说这项工作只是换了一种题型，不如说它在打破多模态评测中“方便评估等于有效评估”的惯性，并建立起一种更接近真实应用的训练与评估方式。</p>\n<p><img alt=\"\" src=\"https://pic4.zhimg.com/v2-7b410a07a72b9f50159611e51e8806fd_1440w.jpg\" /></p>\n<p>把这两篇放在一起看，会发现它们都在推动视觉语言模型评测从“表面正确”走向“能力真实”。<strong>VS-Bench</strong>追问的是：模型能否在多智能体环境中完成策略推理与决策；<strong>ReVeL</strong>追问的是：模型看似答对时，是否真的理解了问题，而不是被选项提示带着走。</p>\n<p>前者把评估场景从单一理解扩展到复杂交互，后者把评估形式从多项选择推进到可验证开放问答。它们共同指向的是同一个趋势：未来的多模态模型不能只在静态、封闭、容易打分的任务上取得高分，而必须在更开放、更动态、更接近真实世界的任务中证明自己的理解、推理和决策能力。</p>\n<p><strong>03</strong></p>\n<h2></h2>\n<h2><strong><em>*</em>*不是小修小补，而是整体重建</strong>****</h2>\n<p>与不少已经具备图像理解能力的开源视觉语言模型相比，由 Allen Institute for AI 和 华盛顿大学共同提出的<strong>《Molmo2: Open Weights and Data for Vision-Language Models with Video Understanding and Grounding》</strong>则把关注点进一步延伸到了两个更关键的方向：一是视频理解能力，二是语言与视觉之间的精细对齐。</p>\n<p>当前主流开源 VLM 虽然在单张图像理解上已经取得不错效果，但在处理视频这种时序信息更复杂的输入时仍然能力有限，同时在将语言描述精确对应到具体视觉区域方面也存在明显不足。</p>\n<p><img alt=\"\" src=\"https://pic3.zhimg.com/v2-848fddcbee84eda7aa01dabb64bfdc10_1440w.jpg\" /></p>\n<p>更深一层的问题在于“开源”的不彻底：不少模型仅开放部分权重，训练数据、数据来源或训练流程并不透明，甚至依赖闭源模型蒸馏，这使得结果难以复现，也限制了后续研究的可持续发展。</p>\n<p>Molmo2 的切入点正是同时回应这两个问题。它不仅扩展了输入形式，从单图、多图进一步覆盖到视频，还在模型中引入了 grounding 能力，使模型能够将语言中的描述精确映射到图像或视频中的具体区域。</p>\n<p>这样一来，模型不再只是回答“看到了什么”，而是能够进一步回答“具体在哪里”，在理解与定位之间建立更紧密的联系。</p>\n<p>在方法之外，这篇论文的亮点同样瞩目。首先，它提供了一个<strong>完全开源的视觉语言模型体系</strong>，不仅开放模型，还开放数据和训练流程，这在当前多模态领域中较为少见。</p>\n<p>其次，它将能力从图像扩展到视频，并且加入了精细的定位能力，使模型不仅能“看懂”，还可以“指出具体位置”。最后，该工作在开放性和性能之间取得了平衡，为后续研究提供了一个可直接使用和扩展的基础模型框架。</p>\n<p>总体来看，这篇论文的核心贡献是构建了一套完全开放、支持视频理解与定位能力的视觉语言模型体系，使多模态模型从“只理解图像”进一步发展为“能够理解视频并进行精细对齐”的统一框架。</p>\n<p><strong>04</strong></p>\n<h2></h2>\n<h2><strong><em>*</em>*不是缺模型，而是缺数据</strong>****</h2>\n<p>而由苹果公司提出的<strong>《Pico-Banana-400K: A Large-Scale Dataset for Text-Guided Image Editing》</strong>，则是把焦点放在文本驱动图像编辑里一个基础但长期缺口明显的问题上：模型想要根据自然语言指令修改图像，离不开大规模、高质量、开放且贴近真实场景的数据，但现有数据集往往要么规模有限，要么主要依赖合成图像，难以覆盖真实图像中的复杂内容、多样物体关系和开放场景变化。</p>\n<p><strong>Pico-Banana-400K</strong>正是围绕这一数据瓶颈构建的。论文基于来自<strong>OpenImages</strong>的真实图像，利用多模态模型自动生成编辑指令和对应编辑结果，从而形成大规模的“图像 - 指令 - 编辑结果”三元组数据集。</p>\n<p><img alt=\"\" src=\"https://pica.zhimg.com/v2-4435ea89ff219157c33cfc4181a5e5ac_1440w.jpg\" /></p>\n<p>它并不只是简单堆数据，而是在构建过程中引入细粒度编辑分类体系和多模态模型评分机制，用来同时保证两件事：编辑结果要符合指令，修改后又要尽可能保持原始图像内容的一致性。</p>\n<p>更进一步，这个数据集的设计也没有停留在单步编辑。除了基础的单轮“给一张图、按一句话编辑”之外，它还包含多轮编辑数据、偏好数据以及长短指令对，因而可以支持更复杂的推理、规划和对齐研究。</p>\n<p>也就是说，Pico-Banana-400K 不只是为图像编辑模型补充训练样本，而是在尝试把文本驱动图像编辑从一次性操作，推进到更接近真实使用场景的连续编辑、偏好对齐和指令理解。</p>\n<p>这篇工作的价值主要在于，它以 40 万级别的高质量真实图像编辑数据，填补了 instruction-based image editing 领域长期缺少开放大规模数据的空白，同时又通过系统化的数据构建流程，在规模、质量和多样性之间取得平衡。</p>\n<p>它打破了以往图像编辑数据过小、过合成、任务形式单一的限制，建立起一个更标准化的基础设施，为后续文本驱动图像编辑模型的训练、评测和对齐提供了更扎实的起点。</p>\n<p><img alt=\"\" src=\"https://pic2.zhimg.com/v2-4312fee86e1c950d7b141131f5b727ed_1440w.jpg\" /></p>\n<p>这次去 CVPR 现场，一定不要错过</p>\n<p>【认识大牛+赚外快】的机会</p>\n<p>需要你做什么：把你最关注的10个大会报告，每页PPT都拍下来</p>\n<p>你能获得什么？</p>\n<p>认识大牛：你将可以进入CVPR名师博士社群；</p>\n<p>钱多活少：提供丰厚奖金，任务量精简；</p>\n<p>听会自由：你的行程你做主，顺手就把外快赚。拍下你最感兴趣的10个报告PPT即可。</p>\n<p>【限额5位，先到先得】</p>\n<p>//</p>"
    }
  ],
  "graph": {
    "nodes": [
      {
        "id": "idt",
        "x": 0,
        "y": 0,
        "category": "traditional_feature"
      },
      {
        "id": "two_stream",
        "x": 1,
        "y": 1,
        "category": "cnn_rnn"
      },
      {
        "id": "c3d",
        "x": 2,
        "y": 1,
        "category": "cnn_rnn"
      },
      {
        "id": "lrcn",
        "x": 2,
        "y": 1.5,
        "category": "cnn_rnn"
      },
      {
        "id": "tsn",
        "x": 3,
        "y": 1,
        "category": "cnn_rnn"
      },
      {
        "id": "i3d",
        "x": 4,
        "y": 1,
        "category": "cnn_rnn"
      },
      {
        "id": "non_local",
        "x": 5,
        "y": 2,
        "category": "transformer"
      },
      {
        "id": "r2plus1d",
        "x": 5,
        "y": 1,
        "category": "cnn_rnn"
      },
      {
        "id": "tsm",
        "x": 6,
        "y": 1,
        "category": "cnn_rnn"
      },
      {
        "id": "slowfast",
        "x": 6,
        "y": 1.5,
        "category": "cnn_rnn"
      },
      {
        "id": "timesformer",
        "x": 8,
        "y": 2,
        "category": "transformer"
      },
      {
        "id": "vivit",
        "x": 8,
        "y": 2.5,
        "category": "transformer"
      },
      {
        "id": "clip4clip",
        "x": 8,
        "y": 3,
        "category": "foundation_model"
      },
      {
        "id": "video_swin",
        "x": 9,
        "y": 2,
        "category": "transformer"
      },
      {
        "id": "videomae",
        "x": 9,
        "y": 3,
        "category": "foundation_model"
      },
      {
        "id": "internvideo",
        "x": 9,
        "y": 3.5,
        "category": "foundation_model"
      },
      {
        "id": "mamba3",
        "x": 13,
        "y": 2,
        "category": "transformer"
      },
      {
        "id": "cosmos",
        "x": 13,
        "y": 3,
        "category": "foundation_model"
      },
      {
        "id": "worldreel",
        "x": 13,
        "y": 3.5,
        "category": "foundation_model"
      },
      {
        "id": "kangaroo",
        "x": 13,
        "y": 4,
        "category": "foundation_model"
      },
      {
        "id": "trajtok",
        "x": 13,
        "y": 3.2,
        "category": "foundation_model"
      }
    ],
    "edges": [
      {
        "from": "idt",
        "to": "c3d",
        "label": "深度学习化"
      },
      {
        "from": "two_stream",
        "to": "lrcn",
        "label": "时序建模"
      },
      {
        "from": "two_stream",
        "to": "tsn",
        "label": "长视频采样"
      },
      {
        "from": "c3d",
        "to": "i3d",
        "label": "权重膨胀"
      },
      {
        "from": "c3d",
        "to": "r2plus1d",
        "label": "卷积分解"
      },
      {
        "from": "tsn",
        "to": "tsm",
        "label": "时序移位"
      },
      {
        "from": "i3d",
        "to": "non_local",
        "label": "自注意力"
      },
      {
        "from": "i3d",
        "to": "slowfast",
        "label": "双速采样"
      },
      {
        "from": "non_local",
        "to": "timesformer",
        "label": "纯注意力"
      },
      {
        "from": "timesformer",
        "to": "vivit",
        "label": "时空因子化"
      },
      {
        "from": "vivit",
        "to": "video_swin",
        "label": "窗口注意力"
      },
      {
        "from": "video_swin",
        "to": "videomae",
        "label": "自监督"
      },
      {
        "from": "video_swin",
        "to": "mamba3",
        "label": "线性注意力"
      },
      {
        "from": "videomae",
        "to": "internvideo",
        "label": "多模态对齐"
      },
      {
        "from": "videomae",
        "to": "trajtok",
        "label": "轨迹Token"
      },
      {
        "from": "internvideo",
        "to": "cosmos",
        "label": "世界模型"
      },
      {
        "from": "internvideo",
        "to": "kangaroo",
        "label": "长上下文"
      },
      {
        "from": "cosmos",
        "to": "worldreel",
        "label": "4D生成"
      }
    ],
    "milestones": [
      "c3d",
      "timesformer",
      "videomae"
    ]
  },
  "algos": [
    {
      "id": "idt",
      "num": 1,
      "name": "iDT",
      "fullName": "改进密集轨迹 (Improved Dense Trajectories)",
      "year": "2013",
      "org": "INRIA",
      "parent": "—",
      "paperUrl": "https://hal.inria.fr/hal-00803241",
      "projectUrl": "",
      "category": "traditional_feature",
      "motivation": "相机运动补偿的手工特征巅峰",
      "summary": "iDT 在密集轨迹（Dense Trajectories）框架基础上引入相机运动估计与补偿机制，通过人体检测排除前景干扰后估计全局单应性变换来消除背景光流中的相机运动分量，使得提取的轨迹描述子（尤其是 MBH）更纯粹地反映人体动作，成为深度学习时代之前动作识别领域的性能巅峰方法。",
      "keyPoints": [
        "相机运动补偿：利用人体检测器排除前景区域，在背景区域匹配 SURF 特征点并估计帧间单应性矩阵，对光流进行 warp 去除相机运动",
        "密集轨迹提取：在多尺度密集网格上采样特征点，利用中值滤波光流跟踪，轨迹长度限制为 L=15 帧",
        "四种局部描述子：沿轨迹在 <span class=\"kb-math kb-math-inline\">N_\\sigma \\times N_\\sigma \\times N_\\tau</span> 时空体积内计算 Trajectory Shape、HOG、HOF、MBH",
        "MBH（运动边界直方图）为最具判别力的单一描述子，计算光流的空间梯度方向直方图",
        "Fisher Vector 编码：使用 256 个高斯分量的 GMM，对每种描述子独立编码后拼接",
        "线性 SVM 分类：对 Fisher Vector 进行 power normalization 和 L2 归一化后用线性 SVM",
        "在 Hollywood2（64.3%）、HMDB51（57.2%）、UCF101（85.9%）上达到当时最优"
      ],
      "detail": "<p><img alt=\"iDT 管线示意图\" src=\"https://lear.inrialpes.fr/people/wang/fig/pipeline.png\" />\n<em>图：iDT 整体流程。在密集采样点上通过光流跟踪生成轨迹，沿轨迹提取多种描述子，经 Fisher Vector 编码后用线性 SVM 分类。相机运动补偿通过估计全局单应性并 warp 光流实现。</em></p>\n<pre><code class=\"language-python\"># iDT 核心流程伪代码\ndef iDT(video):\n    # Step 1: 密集采样特征点（多尺度网格，间隔 W=5 像素）\n    points = dense_sample(video[0], step=5, num_scales=8)\n\n    # Step 2: 相机运动估计与补偿\n    for t in range(1, len(video)):\n        # 2a: 人体检测，获取前景 mask\n        human_mask = person_detector(video[t])\n        # 2b: 在背景区域匹配 SURF 特征点\n        matches = match_surf(video[t-1], video[t], exclude=human_mask)\n        # 2c: RANSAC 估计单应性矩阵 H\n        H = estimate_homography(matches)\n        # 2d: 用 H warp 前一帧，计算补偿后光流\n        warped = warp_frame(video[t-1], H)\n        flow_compensated[t] = optical_flow(warped, video[t])\n\n    # Step 3: 中值滤波光流跟踪（L=15 帧）\n    trajectories = track_points(points, flow_compensated, max_length=15)\n\n    # Step 4: 沿轨迹提取描述子（32x32x15 时空体积，2x2x3 网格）\n    for traj in trajectories:\n        shape_desc = trajectory_shape(traj)           # 30-d\n        hog_desc = compute_HOG(video, traj)           # 96-d\n        hof_desc = compute_HOF(flow_compensated, traj) # 108-d\n        mbhx_desc = compute_MBH(flow_x, traj)        # 96-d\n        mbhy_desc = compute_MBH(flow_y, traj)        # 96-d\n\n    # Step 5: Fisher Vector 编码 + 线性 SVM\n    fv = fisher_vector_encode(all_descriptors, gmm_256)\n    prediction = linear_svm(fv)\n    return prediction\n</code></pre>\n<p><strong>动机与背景</strong></p>\n<p>在 iDT 之前，Wang 等人于 2011 年提出了 Dense Trajectories（DT）方法，通过在视频中密集采样点并利用光流进行跟踪，沿轨迹提取局部描述子，在动作识别上取得了优异表现。然而，DT 方法存在一个关键缺陷：</p>\n<ol>\n<li><strong>相机运动干扰</strong>：当相机发生平移、旋转或缩放时，光流场中包含大量与人体动作无关的相机运动分量，导致提取的轨迹和描述子被噪声污染。</li>\n<li><strong>背景轨迹噪声</strong>：相机运动产生的背景光流会生成大量无意义的背景轨迹，降低描述子的判别力。</li>\n</ol>\n<p>iDT 正是为了解决相机运动带来的干扰而提出的改进方案。</p>\n<p><strong>核心机制一：相机运动估计与补偿</strong></p>\n<p>iDT 的核心创新在于估计并去除相机运动。具体步骤如下：</p>\n<ol>\n<li>\n<p><strong>人体检测排除前景</strong>：使用基于 DPM（Deformable Part Model）的人体检测器定位视频中的人体区域。在估计相机运动时排除这些区域，避免人体运动干扰全局运动估计。</p>\n</li>\n<li>\n<p><strong>SURF 特征点匹配</strong>：在排除人体区域后的背景中提取 SURF 特征点，在相邻帧间进行匹配。</p>\n</li>\n<li>\n<p><strong>单应性估计</strong>：利用 RANSAC 算法从匹配点对中鲁棒估计帧间单应性矩阵 <span class=\"kb-math kb-math-inline\">H</span>：</p>\n</li>\n</ol>\n<div class=\"kb-math kb-math-display\">\\mathbf{x}&#x27; \\sim H \\mathbf{x}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\mathbf{x}</span> 和 <span class=\"kb-math kb-math-inline\">\\mathbf{x}&#x27;</span> 分别是前后帧中的对应点齐次坐标。单应性矩阵 <span class=\"kb-math kb-math-inline\">H</span> 是 3×3 矩阵，可以建模相机的旋转、平移和缩放。</p>\n<ol>\n<li><strong>光流补偿</strong>：利用估计的单应性 <span class=\"kb-math kb-math-inline\">H</span> 将前一帧 warp 到当前帧的视角，然后重新计算光流：</li>\n</ol>\n<div class=\"kb-math kb-math-display\">\\mathbf{w}^*(x, y) = \\mathbf{w}(x, y) - \\mathbf{w}_H(x, y)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\mathbf{w}</span> 是原始光流，<span class=\"kb-math kb-math-inline\">\\mathbf{w}_H</span> 是由单应性 <span class=\"kb-math kb-math-inline\">H</span> 引起的运动场，<span class=\"kb-math kb-math-inline\">\\mathbf{w}^*</span> 是补偿后的光流，仅包含前景物体的独立运动。</p>\n<div class=\"key-point\">💡 关键：选择单应性而非仿射变换的原因是——单应性（8 自由度）能更好地建模真实相机运动（包括透视变换），而仿射变换（6 自由度）在相机旋转较大时误差显著。</div>\n<p><strong>核心机制二：密集轨迹提取</strong></p>\n<p>轨迹提取沿用 DT 的框架：</p>\n<ol>\n<li>\n<p><strong>密集采样</strong>：在 8 个空间尺度上，以 <span class=\"kb-math kb-math-inline\">W=5</span> 像素间隔在网格上采样特征点。为避免无纹理区域的无效跟踪，使用特征值阈值过滤（Shi-Tomasi 角点准则）。</p>\n</li>\n<li>\n<p><strong>中值滤波跟踪</strong>：对于每个采样点 <span class=\"kb-math kb-math-inline\">\\mathbf{P}_t = (x_t, y_t)</span>，利用光流场通过中值滤波进行跟踪：</p>\n</li>\n</ol>\n<div class=\"kb-math kb-math-display\">\\mathbf{P}_{t+1} = (x_{t+1}, y_{t+1}) = (x_t, y_t) + (\\mathcal{M} * \\mathbf{w}^*)|_{(\\bar{x}_t, \\bar{y}_t)}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\mathcal{M}</span> 是 3×3 中值滤波核，<span class=\"kb-math kb-math-inline\">\\mathbf{w}^*</span> 是补偿后的光流。中值滤波相比双线性插值更鲁棒。</p>\n<ol>\n<li><strong>轨迹长度限制</strong>：最大长度 <span class=\"kb-math kb-math-inline\">L=15</span> 帧。超过此长度的轨迹被截断并重新采样，以避免漂移累积。</li>\n</ol>\n<p><strong>核心机制三：局部描述子</strong></p>\n<p>沿每条轨迹，在 <span class=\"kb-math kb-math-inline\">N_\\sigma \\times N_\\sigma \\times N_\\tau = 2 \\times 2 \\times 3</span> 的时空网格中计算描述子：</p>\n<ol>\n<li>\n<p><strong>Trajectory Shape（30-d）</strong>：归一化的位移向量序列 <span class=\"kb-math kb-math-inline\">(\\Delta P_t, \\ldots, \\Delta P_{t+L-1})</span>，描述轨迹的形状。</p>\n</li>\n<li>\n<p><strong>HOG（96-d）</strong>：方向梯度直方图，捕获外观信息。在 <span class=\"kb-math kb-math-inline\">2 \\times 2 \\times 3</span> 网格的每个 cell 中计算 8-bin 方向直方图。</p>\n</li>\n<li>\n<p><strong>HOF（108-d）</strong>：光流方向直方图，捕获运动方向。每个 cell 计算 9-bin 直方图（8 个方向 + 1 个幅度小于阈值的 bin）。</p>\n</li>\n<li>\n<p><strong>MBH（192-d = 96+96）</strong>：运动边界直方图，分别对光流的水平分量 <span class=\"kb-math kb-math-inline\">u</span> 和垂直分量 <span class=\"kb-math kb-math-inline\">v</span> 计算空间梯度，再对梯度方向做直方图：</p>\n</li>\n</ol>\n<div class=\"kb-math kb-math-display\">\\text{MBH}_x = \\text{HOG}(\\nabla u), \\quad \\text{MBH}_y = \\text{HOG}(\\nabla v)</div>\n<div class=\"key-point\">💡 关键：MBH 是 iDT 中最强的描述子。其优势在于——对光流取空间梯度天然消除了恒定运动（如相机平移导致的均匀光流），因此即使不做显式相机运动补偿，MBH 也具有一定的鲁棒性。而 iDT 的相机运动补偿进一步提升了 MBH 的判别力。</div>\n<p><strong>核心机制四：Fisher Vector 编码</strong></p>\n<p>将局部描述子编码为固定长度的视频级表示：</p>\n<ol>\n<li><strong>PCA 降维</strong>：将每种描述子降至原维度的一半。</li>\n<li><strong>GMM 训练</strong>：对每种描述子独立训练 <span class=\"kb-math kb-math-inline\">K=256</span> 个高斯分量的 GMM。</li>\n<li><strong>Fisher Vector 计算</strong>：对于一组局部描述子 <span class=\"kb-math kb-math-inline\">\\{x_1, \\ldots, x_T\\}</span>，Fisher Vector 编码一阶和二阶统计量：</li>\n</ol>\n<div class=\"kb-math kb-math-display\">\\mathcal{G}_{\\mu_k} = \\frac{1}{T\\sqrt{\\pi_k}} \\sum_{t=1}^T \\gamma_t(k) \\frac{x_t - \\mu_k}{\\sigma_k}</div>\n<div class=\"kb-math kb-math-display\">\\mathcal{G}_{\\sigma_k} = \\frac{1}{T\\sqrt{2\\pi_k}} \\sum_{t=1}^T \\gamma_t(k) \\left[\\frac{(x_t - \\mu_k)^2}{\\sigma_k^2} - 1\\right]</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\gamma_t(k)</span> 是第 <span class=\"kb-math kb-math-inline\">t</span> 个描述子对第 <span class=\"kb-math kb-math-inline\">k</span> 个高斯分量的后验概率。</p>\n<ol>\n<li>\n<p><strong>归一化</strong>：依次进行 power normalization（<span class=\"kb-math kb-math-inline\">f(x) = \\text{sign}(x)|x|^\\alpha, \\alpha=0.5</span>）和 L2 归一化。</p>\n</li>\n<li>\n<p><strong>多描述子融合</strong>：各描述子的 Fisher Vector 独立计算后拼接，最终维度为 <span class=\"kb-math kb-math-inline\">2 \\times K \\times d_i</span> 对每种描述子 <span class=\"kb-math kb-math-inline\">i</span>。</p>\n</li>\n</ol>\n<p><strong>与 Dense Trajectories 的对比</strong></p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>相机运动补偿</th>\n<th>HOF mAP (Hollywood2)</th>\n<th>MBH mAP (Hollywood2)</th>\n<th>总体 mAP</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>DT</td>\n<td>✗</td>\n<td>53.2%</td>\n<td>55.1%</td>\n<td>58.2%</td>\n</tr>\n<tr>\n<td><strong>iDT</strong></td>\n<td><strong>✓</strong></td>\n<td><strong>57.6%</strong></td>\n<td><strong>60.5%</strong></td>\n<td><strong>64.3%</strong></td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"warn-box\">⚠️ 注意：相机运动补偿对 HOF 的提升最为显著（+4.4%），因为 HOF 直接依赖光流方向，受相机运动干扰最大。MBH 由于本身对恒定运动具有鲁棒性，提升相对较小但依然明显（+5.4%）。Trajectory Shape 描述子的提升也很大，因为相机运动会严重扭曲轨迹形状。</div>\n<p><strong>iDT 的历史地位</strong></p>\n<p>iDT 是深度学习方法（如双流网络、C3D）出现之前动作识别领域的统治性方法。即使在深度学习早期（2014-2016），iDT 特征与深度特征的融合仍能带来显著提升，证明了手工特征与学习特征的互补性。直到 TSN、I3D 等方法的出现，iDT 才逐渐被完全取代。</p>",
      "quiz": {
        "q": "iDT 中相机运动补偿的关键步骤是什么？",
        "options": [
          "使用 3D 卷积网络学习相机运动模式",
          "在排除人体区域后的背景中估计帧间单应性矩阵，warp 光流去除相机运动",
          "对所有光流向量减去全局均值来消除平移运动",
          "使用 IMU 传感器数据直接获取相机运动参数"
        ],
        "answer": 1,
        "explain": "iDT 通过人体检测排除前景后，在背景区域匹配 SURF 特征点并用 RANSAC 估计单应性矩阵 H，然后利用 H 对光流进行 warp 补偿，从而去除相机运动分量。"
      }
    },
    {
      "id": "two_stream",
      "num": 2,
      "name": "Two-Stream",
      "fullName": "双流卷积网络 (Two-Stream ConvNets)",
      "year": "2014",
      "org": "Oxford",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/1406.2199",
      "projectUrl": "",
      "category": "cnn_rnn",
      "motivation": "RGB与光流双流解耦架构",
      "summary": "Two-Stream ConvNets 提出将视频动作识别解耦为空间流（单帧外观）和时间流（堆叠光流）两条独立 ConvNet，通过晚期融合实现互补，首次证明了深度学习在视频理解中可与手工特征（如 IDT）媲美的性能。",
      "keyPoints": [
        "双流架构：空间流 ConvNet 处理单帧 RGB 图像捕获外观信息，时间流 ConvNet 处理堆叠密集光流捕获运动信息",
        "光流输入设计：提出光流堆叠（optical flow stacking）、轨迹堆叠（trajectory stacking）、双向光流三种输入配置",
        "时间流输入：将连续 <span class=\"kb-math kb-math-inline\">L</span> 帧的水平/垂直光流分量堆叠为 <span class=\"kb-math kb-math-inline\">2L</span> 通道张量作为 ConvNet 输入",
        "均值光流减除：通过减去位移场均值补偿全局相机运动",
        "多任务学习：联合 UCF-101 和 HMDB-51 分类任务训练时间流网络，缓解小数据集过拟合",
        "晚期融合策略：对两流 softmax 分数进行平均或 SVM 融合",
        "空间流预训练：利用 ImageNet ILSVRC-2012 预训练解决视频数据集规模不足问题",
        "网络架构：基于 CNN-M-2048（类似 Zeiler &amp; Fergus 网络），5 层卷积 + 3 层全连接",
        "在 UCF-101 达到 88.0%、HMDB-51 达到 59.4% 准确率，与当时最优手工特征方法持平"
      ],
      "detail": "<p><img alt=\"Two-Stream Architecture\" src=\"https://arxiv.org/html/1406.2199v2/extracted/figures/two_stream_arch.png\" />\n<em>图：Two-Stream ConvNet 架构示意。上方为空间流（输入单帧 RGB），下方为时间流（输入多帧堆叠光流），最终通过晚期融合得到动作分类结果。</em></p>\n<div class=\"key-point\">💡 <strong>核心思想</strong>：受神经科学中视觉皮层\"双通路假说\"（腹侧通路负责物体识别，背侧通路负责运动感知）启发，将视频理解分解为外观识别和运动识别两个独立子问题。</div>\n<pre><code class=\"language-python\"># Two-Stream ConvNet 推理伪代码\ndef two_stream_predict(video):\n    # 1. 空间流：随机采样帧 → ImageNet预训练ConvNet\n    frames = sample_frames(video, n=25)\n    spatial_scores = spatial_convnet(frames)  # 输入: 224x224x3\n\n    # 2. 时间流：计算光流 → 堆叠L=10帧 → ConvNet\n    for frame_t in frames:\n        flow_volume = stack_optical_flow(video, t=frame_t, L=10)\n        # flow_volume shape: 224x224x20 (dx,dy × 10帧)\n        flow_volume -= flow_volume.mean(axis=(0,1))  # 均值减除\n    temporal_scores = temporal_convnet(flow_volume)\n\n    # 3. 晚期融合\n    # 方式A: 平均融合\n    final_score = (spatial_scores + temporal_scores) / 2\n    # 方式B: SVM融合 (L2归一化后拼接，训练线性SVM)\n    # final_score = svm(l2_norm(spatial_scores), l2_norm(temporal_scores))\n\n    return argmax(final_score)\n</code></pre>\n<h5>动机与背景</h5>\n<p>2014 年之前，视频动作识别领域主要依赖手工特征方法，如改进密集轨迹（Improved Dense Trajectories, IDT），其通过 HOF、MBH 等手工描述子编码光流信息。虽然 CNN 在图像分类上已取得突破（AlexNet, 2012），但直接将 CNN 应用于视频面临两大挑战：</p>\n<ol>\n<li><strong>时序建模困难</strong>：简单堆叠 RGB 帧（如 Karpathy 等人的\"slow fusion\"）效果远不如手工特征，因为 CNN 难以从原始像素中隐式学习运动模式</li>\n<li><strong>训练数据不足</strong>：当时最大的标注视频数据集 UCF-101 仅有 9.5K 训练视频，远不足以从零训练深度网络</li>\n</ol>\n<p>Two-Stream ConvNets 的核心洞察是：<strong>将运动信息显式化</strong>——用预计算的密集光流作为时间流的输入，而非让网络自行从原始帧中学习运动。</p>\n<h5>空间流 ConvNet</h5>\n<p>空间流接收单帧 RGB 图像（<span class=\"kb-math kb-math-inline\">224 \\times 224 \\times 3</span>），本质上执行静态图像的动作识别（类似物体/场景识别）。关键设计：</p>\n<ul>\n<li><strong>ImageNet 预训练</strong>：由于视频数据集过小，空间流使用在 ILSVRC-2012 上预训练的 CNN-M-2048 网络，仅微调最后分类层即可达到 72.8% 准确率（UCF-101）</li>\n<li>从零训练仅达 52.3%，证明预训练的必要性</li>\n<li>采用 dropout=0.5 的最后层训练策略</li>\n</ul>\n<h5>时间流 ConvNet——核心创新</h5>\n<p>时间流是本文最重要的贡献。它将密集光流显式编码为多通道\"图像\"输入 ConvNet：</p>\n<p><strong>光流堆叠（Optical Flow Stacking）</strong>：对于时刻 <span class=\"kb-math kb-math-inline\">\\tau</span> 的帧，将其前后 <span class=\"kb-math kb-math-inline\">L</span> 帧的光流水平分量 <span class=\"kb-math kb-math-inline\">d^x_t</span> 和垂直分量 <span class=\"kb-math kb-math-inline\">d^y_t</span> 堆叠：</p>\n<div class=\"kb-math kb-math-display\">I_\\tau(u, v, 2k-1) = d^x_{\\tau+k}(u, v), \\quad I_\\tau(u, v, 2k) = d^y_{\\tau+k}(u, v)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">k = 0, \\ldots, L-1</span>，最终输入张量维度为 <span class=\"kb-math kb-math-inline\">w \\times h \\times 2L</span>。实验中 <span class=\"kb-math kb-math-inline\">L=10</span>，即 20 通道输入。</p>\n<p><strong>轨迹堆叠（Trajectory Stacking）</strong>：沿运动轨迹采样光流，而非固定空间位置：</p>\n<div class=\"kb-math kb-math-display\">I_\\tau(u, v, 2k-1) = d^x_{\\tau+k}(p_k), \\quad I_\\tau(u, v, 2k) = d^y_{\\tau+k}(p_k)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">p_k</span> 为从 <span class=\"kb-math kb-math-inline\">(u,v)</span> 出发沿光流追踪到第 <span class=\"kb-math kb-math-inline\">k</span> 帧的位置。</p>\n<p><strong>双向光流</strong>：使用 <span class=\"kb-math kb-math-inline\">L/2</span> 帧前向光流 + <span class=\"kb-math kb-math-inline\">L/2</span> 帧后向光流，总通道数不变。</p>\n<div class=\"warn-box\">⚠️ <strong>关键发现</strong>：堆叠多帧光流（<span class=\"kb-math kb-math-inline\">L=10</span>）比单帧光流（<span class=\"kb-math kb-math-inline\">L=1</span>）提升约 7%，证明长程时序信息的重要性。光流堆叠略优于轨迹堆叠，双向光流仅带来微小提升。</div>\n<p><strong>均值光流减除</strong>：从每个位移场中减去其空间均值向量，补偿全局相机运动，类似于图像处理中的零均值化。实验证明这一简单操作可提升约 1% 准确率。</p>\n<h5>与手工特征的关系</h5>\n<p>论文深刻揭示了时间流 ConvNet 与传统手工描述子的联系：</p>\n<ul>\n<li><strong>HOF/MBH 描述子</strong>：基于光流方向直方图，可由第一层卷积（方向敏感滤波器）+ ReLU + 池化实现</li>\n<li><strong>运动学特征</strong>（散度、旋度、剪切）：基于光流梯度，同样可被卷积层捕获</li>\n<li><strong>轨迹特征</strong>：沿轨迹堆叠位移向量，对应轨迹堆叠输入方式</li>\n</ul>\n<p>第一层学到的 96 个滤波器（<span class=\"kb-math kb-math-inline\">7 \\times 7 \\times 20</span>）可视化显示：部分滤波器计算光流的空间导数（类似 MBH），部分计算时间导数（捕获运动变化）。</p>\n<h5>多任务学习</h5>\n<p>为缓解时间流在小数据集（尤其是 HMDB-51 仅 3.7K 训练视频）上的过拟合，采用多任务学习：</p>\n<ul>\n<li>在最后全连接层之上添加两个 softmax 分类头（UCF-101 和 HMDB-51）</li>\n<li>总损失为两个任务损失之和，通过反向传播联合优化</li>\n<li>HMDB-51 上从 46.6% 提升至 55.4%（+8.8%），UCF-101 上从 81.0% 提升至 81.5%</li>\n</ul>\n<h5>训练与测试细节</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>配置项</th>\n<th>空间流</th>\n<th>时间流</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>输入尺寸</td>\n<td>224×224×3</td>\n<td>224×224×20</td>\n</tr>\n<tr>\n<td>预训练</td>\n<td>ImageNet ILSVRC-2012</td>\n<td>无（从零训练）</td>\n</tr>\n<tr>\n<td>Dropout</td>\n<td>0.5</td>\n<td>0.9</td>\n</tr>\n<tr>\n<td>学习率</td>\n<td>10⁻² → 10⁻³(14K) → stop(20K)</td>\n<td>10⁻² → 10⁻³(50K) → 10⁻⁴(70K) → stop(80K)</td>\n</tr>\n<tr>\n<td>数据增强</td>\n<td>随机裁剪 + 翻转 + RGB抖动</td>\n<td>随机裁剪 + 翻转</td>\n</tr>\n</tbody>\n</table></div>\n<ul>\n<li><strong>测试</strong>：均匀采样 25 帧，每帧 10 次裁剪（4角+中心 × 翻转），对所有分数取平均</li>\n<li><strong>光流计算</strong>：使用 Brox 等人的 GPU 实现（OpenCV），0.06s/帧对，预计算并 JPEG 压缩存储（UCF-101 从 1.5TB 压缩至 27GB）</li>\n<li><strong>多 GPU 训练</strong>：基于 Caffe，4× NVIDIA Titan，数据并行，3.2× 加速</li>\n</ul>\n<h5>晚期融合与最终结果</h5>\n<p>两流融合方式对比（UCF-101 split 1）：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>融合方式</th>\n<th>准确率</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>仅空间流</td>\n<td>72.8%</td>\n</tr>\n<tr>\n<td>仅时间流</td>\n<td>81.2%</td>\n</tr>\n<tr>\n<td>平均融合</td>\n<td>85.9%</td>\n</tr>\n<tr>\n<td>SVM 融合</td>\n<td>87.0%</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 <strong>互补性</strong>：融合后比单独时间流提升 6%，比空间流提升 14%，证明外观和运动信息高度互补。</div>\n<p><strong>与当时最优方法对比（3-split 平均）</strong>：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>UCF-101</th>\n<th>HMDB-51</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>IDT [Wang &amp; Schmid, 2013]</td>\n<td>85.9%</td>\n<td>57.2%</td>\n</tr>\n<tr>\n<td>IDT + 高维编码</td>\n<td>87.9%</td>\n<td>61.1%</td>\n</tr>\n<tr>\n<td>Slow Fusion ConvNet [Karpathy, 2014]</td>\n<td>65.4%</td>\n<td>-</td>\n</tr>\n<tr>\n<td><strong>Two-Stream (SVM 融合)</strong></td>\n<td><strong>88.0%</strong></td>\n<td><strong>59.4%</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p>Two-Stream ConvNets 首次使深度学习方法在视频动作识别上达到与精心设计的手工特征方法持平的性能，开创了视频理解的双流范式。</p>",
      "quiz": {
        "q": "Two-Stream ConvNets 中时间流网络的输入是什么？",
        "options": [
          "连续多帧 RGB 图像堆叠",
          "单帧 RGB 图像的梯度图",
          "连续多帧的密集光流位移场堆叠",
          "视频帧的频域变换特征"
        ],
        "answer": 2,
        "explain": "时间流的核心创新在于使用预计算的密集光流作为显式运动表示，将连续 L=10 帧的水平和垂直光流分量堆叠为 2L=20 通道的输入张量，而非直接使用原始 RGB 帧。"
      }
    },
    {
      "id": "c3d",
      "num": 3,
      "name": "C3D",
      "fullName": "3D卷积网络 (Convolutional 3D Networks)",
      "year": "2015",
      "org": "Facebook",
      "parent": "idt",
      "paperUrl": "https://arxiv.org/abs/1412.0767",
      "projectUrl": "",
      "category": "cnn_rnn",
      "motivation": "3D卷积端到端时空特征学习",
      "summary": "C3D 提出使用统一的 \\(3 \\times 3 \\times 3\\) 小卷积核构建深度3D卷积网络，在大规模视频数据集 Sports-1M 上预训练后，其中间层特征（fc6）可作为通用的视频时空描述子，在动作识别、场景分类、动作相似度判断等多个视频分析任务上取得优异的迁移性能。",
      "keyPoints": [
        "<strong>统一的3D卷积核尺寸</strong>：系统实验证明 <span class=\"kb-math kb-math-inline\">3 \\times 3 \\times 3</span> 是3D卷积的最优核尺寸，兼顾时间和空间建模能力",
        "<strong>C3D网络架构</strong>：8层卷积 + 5层池化 + 2层全连接（4096维），输入为16帧 <span class=\"kb-math kb-math-inline\">112 \\times 112</span> 的视频片段",
        "<strong>大规模预训练</strong>：在 Sports-1M 数据集（110万视频，487类）上进行预训练",
        "<strong>通用视频特征</strong>：fc6 层的4096维激活值作为通用视频描述子，可直接迁移到多种下游任务",
        "<strong>高效紧凑表示</strong>：通过 PCA 降至仅10维仍保持52.8%的 UCF101 准确率，证明特征的高度紧凑性",
        "<strong>多任务验证</strong>：在动作识别（UCF101）、动作相似度（ASLAN）、场景识别（YUPENN/Maryland）、物体识别等任务上均表现优异"
      ],
      "detail": "<p><img alt=\"C3D 2D与3D卷积对比\" src=\"https://ar5iv.labs.arxiv.org/html/1412.0767/assets/x1.png\" />\n<em>图1：2D卷积 vs 3D卷积。2D卷积仅在空间维度操作，输出为2D特征图；3D卷积同时在时间和空间维度操作，输出保留时间信息的3D特征体。</em></p>\n<p><img alt=\"C3D网络架构\" src=\"https://ar5iv.labs.arxiv.org/html/1412.0767/assets/x2.png\" />\n<em>图2：C3D 网络架构。包含8个卷积层、5个池化层和2个全连接层，所有3D卷积核均为 3×3×3。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># C3D 特征提取流程\ndef extract_c3d_features(video):\n    # 1. 视频预处理：分割为16帧片段，8帧重叠\n    clips = split_video(video, clip_length=16, overlap=8)\n\n    features = []\n    for clip in clips:\n        # 2. 输入预处理：resize到 128x171，随机裁剪 112x112\n        x = preprocess(clip)  # shape: (3, 16, 112, 112)\n\n        # 3. 前向传播通过 C3D 网络\n        # Conv1a(64) -&gt; Pool1(1x2x2) \n        # Conv2a(128) -&gt; Pool2(2x2x2)\n        # Conv3a(256) -&gt; Conv3b(256) -&gt; Pool3(2x2x2)\n        # Conv4a(512) -&gt; Conv4b(512) -&gt; Pool4(2x2x2)\n        # Conv5a(512) -&gt; Conv5b(512) -&gt; Pool5(2x2x2)\n        # FC6(4096) -&gt; FC7(4096) -&gt; Softmax(487)\n        fc6 = forward_to_fc6(x)  # shape: (4096,)\n        features.append(fc6)\n\n    # 4. 平均池化所有片段特征\n    video_descriptor = mean(features)  # (4096,)\n\n    # 5. L2 归一化\n    video_descriptor = l2_normalize(video_descriptor)\n\n    return video_descriptor\n</code></pre>\n<h5>动机与背景</h5>\n<p>视频理解的核心挑战在于如何同时建模空间外观和时间运动信息。传统方法依赖手工设计的特征（如 HOG、HOF、MBH），虽然在特定任务上表现良好，但缺乏通用性和可扩展性。2D CNN 在图像领域取得了巨大成功，但直接应用于视频时会丢失时间维度的信息。</p>\n<p>早期的3D卷积网络（如 Ji et al. 2010, Karpathy et al. 2014）虽然尝试了时空建模，但存在以下问题：\n- 网络较浅，表达能力有限\n- 卷积核尺寸选择缺乏系统研究\n- 未充分利用大规模数据进行预训练\n- 特征迁移能力未被充分验证</p>\n<p>C3D 的核心动机是：<strong>构建一个简单而有效的3D卷积网络，使其学到的特征能够像 ImageNet 预训练的2D CNN 特征一样，成为视频分析的通用表示。</strong></p>\n<h5>核心机制：3×3×3 卷积核的系统验证</h5>\n<p>C3D 的第一个关键贡献是通过系统实验确定了最优的3D卷积核时间维度。作者在 UCF101 上对比了不同时间深度的卷积核：</p>\n<div class=\"kb-math kb-math-display\">L_{cls} = -\\sum_{i=1}^{N} y_i \\log(\\hat{y}_i)</div>\n<p>实验设置了以下变体进行对比：\n- <strong>同质网络</strong>：所有卷积层使用相同的时间核深度 <span class=\"kb-math kb-math-inline\">d \\in \\{1, 3, 5, 7\\}</span>\n- <strong>递增网络</strong>：时间核深度从浅层到深层递增（3-3-5-5-7）\n- <strong>递减网络</strong>：时间核深度从浅层到深层递减（7-5-5-3-3）</p>\n<div class=\"key-point\">💡 关键发现：<span class=\"kb-math kb-math-inline\">3 \\times 3 \\times 3</span> 核在所有变体中表现最佳。这与2D领域 VGGNet 的发现一致——小卷积核堆叠比大卷积核更有效，因为引入了更多非线性层，同时参数量更少。</div>\n<h5>C3D 网络架构详解</h5>\n<p>C3D 的最终架构设计如下：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>层</th>\n<th>输出尺寸</th>\n<th>卷积核/池化核</th>\n<th>通道数</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Input</td>\n<td>3×16×112×112</td>\n<td>—</td>\n<td>3</td>\n</tr>\n<tr>\n<td>Conv1a</td>\n<td>64×16×112×112</td>\n<td>3×3×3</td>\n<td>64</td>\n</tr>\n<tr>\n<td>Pool1</td>\n<td>64×16×56×56</td>\n<td>1×2×2</td>\n<td>—</td>\n</tr>\n<tr>\n<td>Conv2a</td>\n<td>128×16×56×56</td>\n<td>3×3×3</td>\n<td>128</td>\n</tr>\n<tr>\n<td>Pool2</td>\n<td>128×8×28×28</td>\n<td>2×2×2</td>\n<td>—</td>\n</tr>\n<tr>\n<td>Conv3a</td>\n<td>256×8×28×28</td>\n<td>3×3×3</td>\n<td>256</td>\n</tr>\n<tr>\n<td>Conv3b</td>\n<td>256×8×28×28</td>\n<td>3×3×3</td>\n<td>256</td>\n</tr>\n<tr>\n<td>Pool3</td>\n<td>256×4×14×14</td>\n<td>2×2×2</td>\n<td>—</td>\n</tr>\n<tr>\n<td>Conv4a</td>\n<td>512×4×14×14</td>\n<td>3×3×3</td>\n<td>512</td>\n</tr>\n<tr>\n<td>Conv4b</td>\n<td>512×4×14×14</td>\n<td>3×3×3</td>\n<td>512</td>\n</tr>\n<tr>\n<td>Pool4</td>\n<td>512×2×7×7</td>\n<td>2×2×2</td>\n<td>—</td>\n</tr>\n<tr>\n<td>Conv5a</td>\n<td>512×2×7×7</td>\n<td>3×3×3</td>\n<td>512</td>\n</tr>\n<tr>\n<td>Conv5b</td>\n<td>512×2×7×7</td>\n<td>3×3×3</td>\n<td>512</td>\n</tr>\n<tr>\n<td>Pool5</td>\n<td>512×1×4×4</td>\n<td>2×2×2</td>\n<td>—</td>\n</tr>\n<tr>\n<td>FC6</td>\n<td>4096</td>\n<td>—</td>\n<td>—</td>\n</tr>\n<tr>\n<td>FC7</td>\n<td>4096</td>\n<td>—</td>\n<td>—</td>\n</tr>\n<tr>\n<td>Softmax</td>\n<td>487</td>\n<td>—</td>\n<td>—</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"warn-box\">⚠️ 注意：Pool1 的时间维度步长为1（即 <span class=\"kb-math kb-math-inline\">1 \\times 2 \\times 2</span>），这是为了在早期保留时间信息。从 Pool2 开始使用 <span class=\"kb-math kb-math-inline\">2 \\times 2 \\times 2</span> 的池化核，逐步降低时空分辨率。</div>\n<h5>训练策略</h5>\n<p>C3D 在 Sports-1M 数据集上训练，关键超参数：\n- <strong>优化器</strong>：SGD，动量0.9\n- <strong>批量大小</strong>：30\n- <strong>初始学习率</strong>：0.003，每150K次迭代减半\n- <strong>总迭代次数</strong>：1.9M（约13个epoch）\n- <strong>数据增强</strong>：随机裁剪 <span class=\"kb-math kb-math-inline\">16 \\times 112 \\times 112</span>，50%概率水平翻转\n- <strong>Dropout</strong>：0.5（应用于FC6和FC7）</p>\n<h5>特征迁移与应用</h5>\n<p>C3D 的核心价值在于其学到的特征具有强大的迁移能力。特征提取流程：</p>\n<ol>\n<li>将视频分割为16帧的片段，相邻片段有8帧重叠</li>\n<li>每个片段通过 C3D 网络前向传播，提取 fc6 层的4096维激活值</li>\n<li>对所有片段的特征取平均，得到视频级描述子</li>\n<li>L2 归一化</li>\n</ol>\n<p>在下游任务中，C3D 特征可以直接配合简单的线性 SVM 分类器使用，无需微调网络：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>任务</th>\n<th>数据集</th>\n<th>C3D 性能</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>动作识别</td>\n<td>UCF101</td>\n<td>82.3%（单网络）/ 90.4%（+iDT）</td>\n</tr>\n<tr>\n<td>动作相似度</td>\n<td>ASLAN</td>\n<td>78.3% accuracy</td>\n</tr>\n<tr>\n<td>场景识别</td>\n<td>YUPENN</td>\n<td>98.1%</td>\n</tr>\n<tr>\n<td>场景识别</td>\n<td>Maryland</td>\n<td>87.7%</td>\n</tr>\n</tbody>\n</table></div>\n<h5>与传统方法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>手工特征(iDT)</th>\n<th>2D CNN</th>\n<th>C3D</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>时间建模</td>\n<td>光流+轨迹</td>\n<td>无/有限</td>\n<td>3D卷积</td>\n</tr>\n<tr>\n<td>特征维度</td>\n<td>高维稀疏</td>\n<td>4096</td>\n<td>4096</td>\n</tr>\n<tr>\n<td>计算效率</td>\n<td>慢（光流计算）</td>\n<td>快</td>\n<td>快（91.5 fps）</td>\n</tr>\n<tr>\n<td>通用性</td>\n<td>仅动作</td>\n<td>仅外观</td>\n<td>时空通用</td>\n</tr>\n<tr>\n<td>紧凑性</td>\n<td>差</td>\n<td>中等</td>\n<td>优（10维仍52.8%）</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 关键优势：C3D 的计算效率极高，在单GPU上可达 313 fps 的特征提取速度（仅卷积部分），完整流程约 91.5 fps，比实时处理快数倍。同时，C3D 特征与 iDT 互补，二者融合可进一步提升性能。</div>",
      "quiz": {
        "q": "C3D 网络中 Pool1 层使用 1×2×2 的池化核（时间维度步长为1）的主要原因是什么？",
        "options": [
          "减少计算量，加速训练过程",
          "在网络早期保留时间信息，避免过早丢失时序细节",
          "与2D池化保持兼容，方便迁移学习",
          "防止梯度消失，提升训练稳定性"
        ],
        "answer": 1,
        "explain": "作者发现在第一层池化时对时间维度进行下采样会导致时间信息过早丢失，因此Pool1仅在空间维度进行2×2下采样，保持16帧的时间分辨率不变。"
      }
    },
    {
      "id": "lrcn",
      "num": 4,
      "name": "LRCN",
      "fullName": "长程循环网络 (Long-term Recurrent ConvNets)",
      "year": "2015",
      "org": "UC Berkeley",
      "parent": "two_stream",
      "paperUrl": "https://arxiv.org/abs/1411.4389",
      "projectUrl": "",
      "category": "cnn_rnn",
      "motivation": "CNN+LSTM端到端时序建模",
      "summary": "LRCN 提出将深度卷积网络（CNN）与长短期记忆网络（LSTM）端到端结合的通用架构，统一处理视觉序列输入（视频活动识别）和序列输出（图像/视频描述生成）任务，证明了深度时序建模相比单帧静态特征的显著优势。",
      "keyPoints": [
        "<strong>统一架构</strong>：LRCN 是一种同时具备空间深度（CNN）和时间深度（LSTM）的通用模型，可处理序列输入、序列输出或两者兼有的视觉任务",
        "<strong>端到端训练</strong>：CNN 视觉特征提取器与 LSTM 序列模型联合训练，梯度从 LSTM 反传至 CNN 实现微调",
        "<strong>三大任务验证</strong>：活动识别（UCF-101）、图像描述生成（COCO 2014）、视频描述生成（YouTube/TACoS）",
        "<strong>视觉特征逐帧输入</strong>：不同于仅在首帧输入图像特征的方法，LRCN 在每个时间步都输入视觉特征",
        "<strong>分层（Factored）架构</strong>：多层 LSTM 中将视觉输入传递到各层，增强视觉信息利用",
        "<strong>RGB + 光流互补融合</strong>：通过加权平均两种输入模态的预测分数提升活动识别性能",
        "<strong>关键训练技巧</strong>：使用 0.9 的高 dropout 率防止过拟合；fc6 特征优于 fc7"
      ],
      "detail": "<p><img alt=\"LRCN 整体架构图\" src=\"https://ar5iv.labs.arxiv.org/html/1411.4389/assets/x1.png\" />\n<em>图 1：LRCN 模型总览。视觉输入经 CNN 提取特征后，逐帧送入 LSTM 进行时序建模。该架构可灵活应用于序列输入（活动识别）、序列输出（图像描述）或序列到序列（视频描述）任务。</em></p>\n<p><img alt=\"任务特定实例化\" src=\"https://ar5iv.labs.arxiv.org/html/1411.4389/assets/x3.png\" />\n<em>图 3：LRCN 在三个任务上的具体实例化方式——活动识别（左）、图像描述（中）、视频描述（右）。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># LRCN 端到端训练流程（活动识别）\n# 输入：视频片段 V = {f_1, f_2, ..., f_T}，T=16帧\n# CNN: CaffeNet (类AlexNet)，提取 fc6 特征 (4096-d)\n\nfor clip in training_clips:\n    frames = sample_frames(clip, T=16)  # 连续16帧\n\n    # CNN 特征提取（权重共享）\n    for t in range(T):\n        x_t = CNN(frames[t])  # fc6: 4096-d 向量\n\n    # LSTM 序列建模\n    h_0 = zeros(hidden_size)  # flow: 1024, RGB: 256\n    for t in range(T):\n        h_t = LSTM(x_t, h_{t-1})\n\n    # 分类：对所有时间步预测取平均\n    logits = mean([Linear(h_t) for t in range(T)])\n    loss = CrossEntropy(logits, label)\n\n    # 端到端反向传播（含CNN微调）\n    loss.backward()  # 梯度流经 LSTM → CNN\n    optimizer.step()  # dropout=0.9\n</code></pre>\n<pre><code class=\"language-python\"># LRCN 图像描述生成\n# 输入：单张图像 I，词汇表 vocab\n# CNN: VGGNet，提取 fc7 特征\n\ndef generate_caption(image):\n    v = CNN(image)  # 视觉特征，每步都输入\n\n    words = [BOS]  # 起始符\n    h = zeros(hidden_size)\n\n    for t in range(max_len):\n        # 视觉特征 + 词嵌入拼接后输入 LSTM\n        input_t = concat(v, embed(words[-1]))\n        h = LSTM(input_t, h)\n\n        # 预测下一个词\n        prob = softmax(Linear(h))\n        next_word = sample(prob, temperature=1.5, N=100)\n\n        if next_word == EOS:\n            break\n        words.append(next_word)\n\n    return words\n</code></pre>\n<h5>动机与背景</h5>\n<p>传统视频理解方法面临两大挑战：（1）手工设计的时序特征（如 iDT）难以端到端优化；（2）早期深度学习方法（如 Karpathy 等人的大规模视频分类）仅在固定时间窗口内进行池化，无法建模长程时序依赖。同时，图像描述生成任务需要模型既理解视觉内容又能生成自然语言序列，传统方法依赖检索或模板填充。</p>\n<p>LRCN 的核心动机是：<strong>能否设计一个统一的深度架构，既能从原始像素中学习视觉表示，又能建模任意长度的时序动态？</strong> 答案是将 CNN 的空间特征学习能力与 LSTM 的长程序列建模能力端到端结合。</p>\n<h5>核心机制</h5>\n<p><strong>1. LSTM 序列建模</strong></p>\n<p>LRCN 采用标准 LSTM 单元，其核心计算为：</p>\n<div class=\"kb-math kb-math-display\">i_t = \\sigma(W_{xi}x_t + W_{hi}h_{t-1} + b_i)</div>\n<div class=\"kb-math kb-math-display\">f_t = \\sigma(W_{xf}x_t + W_{hf}h_{t-1} + b_f)</div>\n<div class=\"kb-math kb-math-display\">o_t = \\sigma(W_{xo}x_t + W_{ho}h_{t-1} + b_o)</div>\n<div class=\"kb-math kb-math-display\">g_t = \\tanh(W_{xg}x_t + W_{hg}h_{t-1} + b_g)</div>\n<div class=\"kb-math kb-math-display\">c_t = f_t \\odot c_{t-1} + i_t \\odot g_t</div>\n<div class=\"kb-math kb-math-display\">h_t = o_t \\odot \\tanh(c_t)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">i_t, f_t, o_t</span> 分别为输入门、遗忘门和输出门，<span class=\"kb-math kb-math-inline\">c_t</span> 为记忆单元状态。遗忘门允许网络选择性地保留或丢弃历史信息，这是建模长程依赖的关键。</p>\n<div class=\"key-point\">💡 关键：与普通 RNN 相比，LSTM 通过门控机制解决了梯度消失问题，使得网络能够学习跨越数十帧的时序模式。</div>\n<p><strong>2. CNN 视觉编码器</strong></p>\n<p>视觉特征提取采用预训练的 CaffeNet（类似 AlexNet）或 VGGNet。实验发现 <span class=\"kb-math kb-math-inline\">fc_6</span> 层特征（4096 维）略优于 <span class=\"kb-math kb-math-inline\">fc_7</span>，因为 <span class=\"kb-math kb-math-inline\">fc_6</span> 保留了更多的视觉细节信息。CNN 权重在端到端训练中被微调，使视觉表示适应具体任务。</p>\n<p><strong>3. 分层（Factored）LSTM 架构</strong></p>\n<p><img alt=\"分层架构变体\" src=\"https://ar5iv.labs.arxiv.org/html/1411.4389/assets/x4.png\" />\n<em>图 4：三种 LRCN 图像描述架构变体。左：单层直接输入；中：两层但视觉仅输入第一层；右：分层架构，视觉特征同时输入两层 LSTM。</em></p>\n<p>在多层 LSTM 中，分层架构将视觉输入不仅传递给第一层，还直接传递给更高层。这使得高层 LSTM 能够直接访问视觉信息，而非仅依赖低层的隐状态表示。实验证明分层架构在图像描述任务上带来了显著提升。</p>\n<p><strong>4. 双流融合策略</strong></p>\n<p>对于活动识别，LRCN 分别训练 RGB 和光流两个网络，推理时通过加权平均融合：</p>\n<div class=\"kb-math kb-math-display\">P_{final} = \\alpha \\cdot P_{RGB} + (1-\\alpha) \\cdot P_{flow}</div>\n<p>实验中 <span class=\"kb-math kb-math-inline\">\\alpha = 1/3</span>（即光流权重 2/3）时效果最佳，因为光流网络（77.28%）显著优于 RGB 网络（68.20%），运动信息对动作识别更为关键。</p>\n<div class=\"warn-box\">⚠️ 注意：RGB 和光流的互补性体现在不同类别上——\"Typing\" 等依赖物体外观的动作由 RGB 主导，而 \"SoccerJuggling\" 等依赖运动模式的动作由光流主导。</div>\n<h5>训练与推理流程</h5>\n<p><strong>活动识别训练：</strong>\n- 从视频中随机采样 16 帧连续片段\n- 光流使用 Brox 算法计算，以 x/y 方向光流图作为输入\n- 光流 LSTM 隐藏层 1024 维，RGB LSTM 隐藏层 256 维\n- 所有时间步的预测取平均作为最终分类结果\n- 使用 SGD 优化，dropout 率 0.9</p>\n<p><strong>图像描述生成：</strong>\n- 训练时以 teacher forcing 方式输入真实词序列\n- 推理时采用采样策略：从模型分布中采样 <span class=\"kb-math kb-math-inline\">N=100</span> 个候选句子，温度 <span class=\"kb-math kb-math-inline\">T=1.5</span>，选择对数似然最高的\n- Beam search（宽度 3-5）也有效，但采样策略在 CIDEr-D 指标上更优</p>\n<p><strong>视频描述生成：</strong>\n- 采用两阶段方法：先用 CNN 提取帧级特征并均值池化为视频级表示\n- 再用 LSTM 解码器生成描述（与图像描述共享架构）</p>\n<h5>与传统方法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方面</th>\n<th>传统方法</th>\n<th>LRCN</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>时序建模</td>\n<td>手工特征 + SVM/HMM</td>\n<td>LSTM 端到端学习</td>\n</tr>\n<tr>\n<td>视觉特征</td>\n<td>固定 CNN 特征</td>\n<td>CNN 端到端微调</td>\n</tr>\n<tr>\n<td>长程依赖</td>\n<td>滑动窗口池化</td>\n<td>LSTM 记忆单元</td>\n</tr>\n<tr>\n<td>任务通用性</td>\n<td>任务特定设计</td>\n<td>统一架构适配多任务</td>\n</tr>\n<tr>\n<td>图像描述</td>\n<td>检索/模板</td>\n<td>序列生成</td>\n</tr>\n</tbody>\n</table></div>\n<p>与 Simonyan &amp; Zisserman 的双流网络相比，LRCN 的核心区别在于用 LSTM 替代了简单的时间池化，能够建模帧间的顺序关系而非仅聚合统计量。在 UCF-101 上，LRCN（82.34%）与双流网络（87.6%）存在差距，主要因为双流网络使用了更深的 VGGNet 和更大的光流堆叠窗口。</p>\n<p>与 Karpathy 等人的方法（65.4%）相比，LRCN 的 LSTM 时序建模带来了巨大提升，验证了序列模型对视频理解的重要性。</p>\n<h5>关键实验结果</h5>\n<ul>\n<li><strong>UCF-101 活动识别</strong>：LRCN-fc6 RGB 68.20%，Flow 77.28%，加权融合 82.34%（超越单帧基线 3.40%）</li>\n<li><strong>COCO 图像描述</strong>：CIDEr-D 0.934，BLEU-4 0.585，与 Google NIC（0.946）接近</li>\n<li><strong>生成策略</strong>：采样（N=100, T=1.5）优于贪心搜索和 beam search</li>\n</ul>",
      "quiz": {
        "q": "LRCN 中为什么在每个时间步都输入视觉特征，而非仅在第一步输入？",
        "options": [
          "为了减少 LSTM 的参数量",
          "因为 LSTM 的遗忘门会逐渐丢失早期输入的视觉信息，持续输入可保持视觉信号强度",
          "为了使模型能够处理不同分辨率的图像",
          "因为 CNN 在不同时间步提取的特征完全不同"
        ],
        "answer": 1,
        "explain": "LSTM 的遗忘门机制会随时间衰减早期信息，若仅在首帧输入视觉特征，后续时间步的视觉信号会逐渐减弱。每步都输入视觉特征确保序列模型在生成每个词时都能充分利用图像信息。"
      }
    },
    {
      "id": "tsn",
      "num": 5,
      "name": "TSN",
      "fullName": "时序分段网络 (Temporal Segment Networks)",
      "year": "2016",
      "org": "CUHK",
      "parent": "two_stream",
      "paperUrl": "https://arxiv.org/abs/1608.00859",
      "projectUrl": "",
      "category": "cnn_rnn",
      "motivation": "稀疏采样与段共识机制",
      "summary": "TSN 提出基于稀疏时序采样与段共识函数的视频级表示学习框架，通过将长视频均匀分段并聚合各段特征，以极低计算开销建模完整视频的时序结构，在动作识别任务上取得了当时最优性能。",
      "keyPoints": [
        "稀疏时序采样策略：将视频均匀划分为 K 个段，每段随机采样一个片段（snippet），以低成本覆盖整段视频",
        "段共识函数（Segment Consensus）：通过聚合函数 <span class=\"kb-math kb-math-inline\">G</span>（均值、最大值、加权平均等）融合各段预测，实现视频级分类",
        "多模态输入：支持 RGB、光流（Optical Flow）、RGB 差分（Warped Optical Flow）三种输入模态",
        "跨模态预训练（Cross-modality Pre-training）：利用 RGB 模型的 ImageNet 预训练权重初始化光流网络",
        "部分批归一化（Partial BN）：冻结除第一层外的所有 BN 层均值/方差，缓解小数据集过拟合",
        "数据增强策略：角点裁剪（Corner Cropping）与多尺度裁剪（Multi-scale Cropping）",
        "在 UCF101 上达到 94.2%，HMDB51 上达到 69.4% 的识别准确率"
      ],
      "detail": "<p><img alt=\"TSN 框架示意图\" src=\"https://ar5iv.labs.arxiv.org/html/1608.00859/assets/x1.png\" />\n<em>图：TSN 的整体框架。视频被均匀分为 K 段，每段随机采样一个片段送入共享权重的 ConvNet，最终通过段共识函数聚合得到视频级预测。</em></p>\n<pre><code class=\"language-python\"># TSN 核心逻辑伪代码\ndef TSN(video, K=3, consensus='avg'):\n    # Step 1: 将视频均匀分为 K 段\n    segments = divide_video(video, K)\n\n    # Step 2: 从每段随机采样一个 snippet\n    snippets = [random_sample(seg) for seg in segments]\n\n    # Step 3: 共享权重的 ConvNet 提取各段特征\n    scores = [ConvNet(snippet, W) for snippet in snippets]\n\n    # Step 4: 段共识函数聚合\n    if consensus == 'avg':\n        video_score = mean(scores)\n    elif consensus == 'max':\n        video_score = max(scores)\n    elif consensus == 'weighted':\n        video_score = weighted_mean(scores)\n\n    # Step 5: Softmax 输出最终预测\n    prediction = softmax(video_score)\n    return prediction\n</code></pre>\n<p><strong>动机与背景</strong></p>\n<p>在 TSN 之前，双流卷积网络（Two-Stream ConvNets）已经证明了结合 RGB 外观信息和光流运动信息对视频理解的有效性。然而，传统双流方法存在两个关键缺陷：</p>\n<ol>\n<li><strong>时序建模不足</strong>：双流网络仅在单帧或短片段（如连续 10 帧光流）上操作，无法捕获长程时序结构。</li>\n<li><strong>训练数据有限</strong>：视频数据集（如 UCF101 仅约 9.5K 训练视频）规模远小于图像数据集（ImageNet 120 万张），深度网络容易过拟合。</li>\n</ol>\n<p>TSN 正是为了解决这两个问题而提出的。</p>\n<p><strong>核心机制：稀疏采样与段共识</strong></p>\n<p>TSN 的核心思想可以用一个公式概括：</p>\n<div class=\"kb-math kb-math-display\">\\text{TSN}(T_1, T_2, \\ldots, T_K) = \\mathcal{H}\\left(\\mathcal{G}\\left(\\mathcal{F}(T_1; W), \\mathcal{F}(T_2; W), \\ldots, \\mathcal{F}(T_K; W)\\right)\\right)</div>\n<p>其中：\n- <span class=\"kb-math kb-math-inline\">T_k</span> 是第 <span class=\"kb-math kb-math-inline\">k</span> 段中随机采样的片段\n- <span class=\"kb-math kb-math-inline\">\\mathcal{F}(T_k; W)</span> 是共享参数 <span class=\"kb-math kb-math-inline\">W</span> 的卷积网络对片段 <span class=\"kb-math kb-math-inline\">T_k</span> 的类别得分输出\n- <span class=\"kb-math kb-math-inline\">\\mathcal{G}</span> 是段共识函数，聚合所有段的预测\n- <span class=\"kb-math kb-math-inline\">\\mathcal{H}</span> 是预测函数（如 Softmax）</p>\n<div class=\"key-point\">💡 关键：稀疏采样的精妙之处在于——不需要密集处理所有帧，只需从每个时间段中采样一个代表性片段。这使得计算成本与处理单个片段几乎相同（因为段数 K 通常仅为 3），却能覆盖整个视频的时序范围。</div>\n<p><strong>段共识函数的选择</strong></p>\n<p>论文探索了多种聚合函数 <span class=\"kb-math kb-math-inline\">\\mathcal{G}</span>：</p>\n<ol>\n<li><strong>均值聚合（Average）</strong>：<span class=\"kb-math kb-math-inline\">\\mathcal{G}(F_1, \\ldots, F_K) = \\frac{1}{K}\\sum_{k=1}^K F_k</span></li>\n<li><strong>最大值聚合（Max）</strong>：取各段得分的逐类最大值</li>\n<li><strong>加权平均</strong>：根据段的重要性分配权重</li>\n<li><strong>Top-K 聚合</strong>：取得分最高的 K 个段</li>\n</ol>\n<p>实验表明，简单的均值聚合即可取得最优效果，这也体现了方法的简洁优雅。</p>\n<p><strong>训练与优化</strong></p>\n<p>基于段共识函数，TSN 的损失函数为标准交叉熵：</p>\n<div class=\"kb-math kb-math-display\">L(y, \\mathcal{G}) = -\\sum_{i=1}^C y_i \\left( g_i - \\log \\sum_{j=1}^C \\exp(g_j) \\right)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">C</span> 为类别数，<span class=\"kb-math kb-math-inline\">g_i</span> 为共识函数输出的第 <span class=\"kb-math kb-math-inline\">i</span> 类得分。梯度通过共识函数反传到各段的 ConvNet：</p>\n<div class=\"kb-math kb-math-display\">\\frac{\\partial L}{\\partial W} = \\frac{\\partial L}{\\partial \\mathcal{G}} \\sum_{k=1}^K \\frac{\\partial \\mathcal{G}}{\\partial \\mathcal{F}(T_k)} \\frac{\\partial \\mathcal{F}(T_k)}{\\partial W}</div>\n<p><strong>Good Practices：解决过拟合</strong></p>\n<p>TSN 提出了一系列训练技巧来应对视频数据集规模小的问题：</p>\n<ol>\n<li>\n<p><strong>跨模态预训练</strong>：光流输入为单通道（或双通道 x/y），无法直接使用 ImageNet 预训练的 RGB 模型。TSN 提出将 RGB 模型第一层卷积核沿通道维度取平均，再复制到光流通道数，从而实现跨模态权重迁移。</p>\n</li>\n<li>\n<p><strong>部分批归一化（Partial BN）</strong>：微调时冻结除第一个 BN 层外的所有 BN 层统计量。第一层保留更新是因为输入分布（光流 vs ImageNet 图像）差异较大，需要适配。</p>\n</li>\n<li>\n<p><strong>数据增强</strong>：</p>\n</li>\n<li>角点裁剪：仅从图像的四角和中心裁剪，避免过度关注中心区域</li>\n<li>多尺度裁剪：在 {256, 224, 192, 168} 多个尺度上裁剪，增加尺度多样性</li>\n</ol>\n<p><strong>测试时融合策略</strong></p>\n<p>推理时，TSN 对每个视频均匀采样 25 帧，每帧进行 10 次裁剪（4 角 + 1 中心 × 2 翻转），最终对所有采样帧的预测取平均作为视频级预测。多模态融合采用加权平均：RGB : Flow : Warped Flow = 1 : 1.5 : 1.5。</p>\n<p><strong>与传统方法的对比</strong></p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>时序建模范围</th>\n<th>计算开销</th>\n<th>UCF101</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Two-Stream</td>\n<td>单帧/10帧</td>\n<td>低</td>\n<td>88.0%</td>\n</tr>\n<tr>\n<td>C3D</td>\n<td>16帧</td>\n<td>高</td>\n<td>85.2%</td>\n</tr>\n<tr>\n<td>LRCN</td>\n<td>全视频(RNN)</td>\n<td>高</td>\n<td>82.9%</td>\n</tr>\n<tr>\n<td><strong>TSN</strong></td>\n<td><strong>全视频(稀疏)</strong></td>\n<td><strong>低</strong></td>\n<td><strong>94.2%</strong></td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"warn-box\">⚠️ 注意：TSN 的核心优势在于以极低的额外计算成本（仅 K=3 个片段）实现了全视频时序建模，避免了 RNN/3D 卷积等方法的高计算代价。</div>",
      "quiz": {
        "q": "TSN 中段共识函数（Segment Consensus）的主要作用是什么？",
        "options": [
          "对视频帧进行时序卷积以提取运动特征",
          "聚合各时间段的片段级预测，生成视频级表示",
          "计算相邻帧之间的光流场",
          "对不同模态的特征进行通道拼接"
        ],
        "answer": 1,
        "explain": "段共识函数 G 将 K 个时间段各自的 ConvNet 输出聚合为统一的视频级预测，是 TSN 实现长程时序建模的核心机制。"
      }
    },
    {
      "id": "i3d",
      "num": 6,
      "name": "I3D",
      "fullName": "膨胀3D网络 (Inflated 3D ConvNet)",
      "year": "2017",
      "org": "DeepMind",
      "parent": "c3d",
      "paperUrl": "https://arxiv.org/abs/1705.07750",
      "projectUrl": "",
      "category": "cnn_rnn",
      "motivation": "2D权重膨胀至3D+Kinetics预训练",
      "summary": "I3D 提出将成熟的 2D 图像分类网络（Inception-V1）的卷积核和池化核沿时间维度膨胀为 3D，通过 \"boring-video fixed point\" 策略继承 ImageNet 预训练权重，并结合大规模 Kinetics 数据集预训练，在 UCF-101 和 HMDB-51 上取得了当时最优的动作识别性能。",
      "keyPoints": [
        "<strong>膨胀策略（Inflation）</strong>：将 2D 卷积核 <span class=\"kb-math kb-math-inline\">N \\times N</span> 扩展为 3D 卷积核 <span class=\"kb-math kb-math-inline\">N \\times N \\times N</span>，使网络能够学习时空特征",
        "<strong>Boring-Video Fixed Point 初始化</strong>：将 2D 预训练权重沿时间维度重复 N 次后除以 N，保证对静态视频的输出与原 2D 网络一致",
        "<strong>时间感受野节奏控制（Receptive Field Pacing）</strong>：前两个 max-pooling 不做时间池化（<span class=\"kb-math kb-math-inline\">1 \\times 3 \\times 3</span>），后续使用对称核，平衡时空感受野增长",
        "<strong>双流架构（Two-Stream I3D）</strong>：RGB 流 + 光流流分别训练，预测时取平均，互补外观和运动信息",
        "<strong>Kinetics 数据集</strong>：400 类人体动作，约 240k 训练视频，为视频理解提供类似 ImageNet 的大规模预训练基础",
        "<strong>迁移学习验证</strong>：Kinetics 预训练后在 UCF-101 达 98.0%、HMDB-51 达 80.9%，大幅超越此前方法"
      ],
      "detail": "<h5>核心架构图</h5>\n<p><img alt=\"I3D 架构对比图\" src=\"https://ar5iv.labs.arxiv.org/html/1705.07750/assets/figs/architecture-finalversion.png\" />\n<em>图：论文中对比的五种视频架构。从左到右：(a) 2D ConvNet + LSTM，(b) 3D ConvNet (C3D)，(c) Two-Stream 2D ConvNet，(d) 3D-Fused Two-Stream，(e) Two-Stream I3D（本文提出）。K 为总帧数，N 为单次输入帧数。</em></p>\n<p><img alt=\"Inflated Inception-V1 网络结构\" src=\"https://ar5iv.labs.arxiv.org/html/1705.07750/assets/figs/inflated_net.png\" />\n<em>图：Inflated Inception-V1 的整体网络结构（左）及其 Inception 子模块细节（右）。所有 2D 卷积和池化操作均被膨胀为对应的 3D 版本。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># I3D 膨胀与初始化伪代码\ndef inflate_conv2d_to_3d(conv2d_weight, temporal_kernel_size=N):\n    &quot;&quot;&quot;\n    将 2D 卷积权重 [C_out, C_in, H, W] 膨胀为 3D [C_out, C_in, T, H, W]\n    使用 boring-video fixed point 策略\n    &quot;&quot;&quot;\n    # 沿时间维度重复 N 次\n    weight_3d = conv2d_weight.unsqueeze(2).repeat(1, 1, N, 1, 1)\n    # 除以 N 保证对静态输入的响应不变\n    weight_3d = weight_3d / N\n    return weight_3d\n\n# Two-Stream I3D 推理\ndef two_stream_i3d_predict(video_frames, optical_flow):\n    rgb_logits = i3d_rgb(video_frames)        # [B, 400]\n    flow_logits = i3d_flow(optical_flow)      # [B, 400]\n    final_prediction = (rgb_logits + flow_logits) / 2\n    return final_prediction\n</code></pre>\n<h5>动机与背景</h5>\n<p>视频动作识别的核心挑战在于如何有效建模时空信息。在 I3D 之前，主流方法包括：</p>\n<ol>\n<li><strong>2D ConvNet + 时序聚合</strong>（如 LSTM、时间池化）：丢失了底层的时间结构信息</li>\n<li><strong>C3D（3D ConvNet）</strong>：使用 3D 卷积直接建模时空，但由于参数量大，只能在较小数据集上从头训练，且无法利用 ImageNet 预训练</li>\n<li><strong>Two-Stream 方法</strong>：分别处理 RGB 和光流，但仍使用 2D 卷积，无法在卷积层内捕获时间模式</li>\n</ol>\n<div class=\"key-point\">💡 关键：I3D 的核心洞察是——既然 2D 网络在 ImageNet 上已经学到了强大的空间特征，为什么不直接将这些特征\"膨胀\"到时间维度，让网络在保留空间表征能力的同时获得时间建模能力？</div>\n<h5>核心机制：膨胀（Inflation）</h5>\n<p><strong>2D → 3D 膨胀</strong>：对于一个预训练的 2D 卷积核 <span class=\"kb-math kb-math-inline\">W \\in \\mathbb{R}^{C_{out} \\times C_{in} \\times d \\times d}</span>，膨胀为 3D 核：</p>\n<div class=\"kb-math kb-math-display\">W_{3D} = \\frac{1}{t} \\cdot \\text{repeat}(W, t) \\in \\mathbb{R}^{C_{out} \\times C_{in} \\times t \\times d \\times d}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">t</span> 为时间维度的核大小。除以 <span class=\"kb-math kb-math-inline\">t</span> 的原因是保证 <strong>boring-video fixed point</strong> 性质：当输入为静态视频（每帧相同）时，3D 网络对每帧的输出与原始 2D 网络完全一致。</p>\n<p><strong>数学证明</strong>：设输入为静态视频 <span class=\"kb-math kb-math-inline\">x_1 = x_2 = \\cdots = x_t = x</span>，则 3D 卷积在时间维度的求和为：</p>\n<div class=\"kb-math kb-math-display\">\\sum_{i=1}^{t} \\frac{W}{t} * x = W * x</div>\n<p>这恰好等于原始 2D 卷积的输出，因此膨胀后的网络可以无损地继承 2D 预训练权重作为起点。</p>\n<h5>时间感受野节奏控制</h5>\n<p>并非所有层都使用对称的 3D 核。作者发现：</p>\n<ul>\n<li><strong>前两个 max-pooling 层</strong>：使用 <span class=\"kb-math kb-math-inline\">1 \\times 3 \\times 3</span> 核（不做时间池化），避免过早压缩时间信息</li>\n<li><strong>后续池化层</strong>：使用 <span class=\"kb-math kb-math-inline\">2 \\times 3 \\times 3</span> 核，逐步增大时间感受野</li>\n<li><strong>所有卷积层</strong>：使用 <span class=\"kb-math kb-math-inline\">3 \\times 3 \\times 3</span> 或 <span class=\"kb-math kb-math-inline\">1 \\times 1 \\times 1</span> 核</li>\n</ul>\n<div class=\"warn-box\">⚠️ 注意：这种非对称设计是关键的工程决策。如果在早期就做时间池化，会导致时间分辨率过快下降，丢失细粒度的运动信息。</div>\n<h5>训练流程</h5>\n<ol>\n<li><strong>ImageNet 预训练</strong>：使用 Inception-V1 在 ImageNet 上训练 2D 模型</li>\n<li><strong>膨胀初始化</strong>：将所有 2D 权重按 boring-video fixed point 策略膨胀为 3D</li>\n<li><strong>Kinetics 预训练</strong>：在 Kinetics-400 上端到端训练 I3D，输入为 64 帧 RGB（或光流），分辨率 224×224</li>\n<li><strong>下游微调</strong>：在目标数据集（UCF-101/HMDB-51）上微调，替换最后的分类层</li>\n</ol>\n<p>训练细节：\n- 输入：64 帧 @ 25fps（约 2.56 秒时间跨度）\n- 优化器：SGD + momentum 0.9\n- 数据增强：随机裁剪 224×224、随机左右翻转\n- 测试时：对整个视频均匀采样多个 clip，取平均预测</p>\n<h5>与传统方法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>时间建模</th>\n<th>预训练利用</th>\n<th>UCF-101</th>\n<th>HMDB-51</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Two-Stream (2014)</td>\n<td>光流</td>\n<td>ImageNet 2D</td>\n<td>88.0%</td>\n<td>59.4%</td>\n</tr>\n<tr>\n<td>C3D (2015)</td>\n<td>3D 卷积</td>\n<td>Sports-1M</td>\n<td>82.3%</td>\n<td>51.6%</td>\n</tr>\n<tr>\n<td>TSN (2016)</td>\n<td>段级采样</td>\n<td>ImageNet 2D</td>\n<td>94.2%</td>\n<td>69.4%</td>\n</tr>\n<tr>\n<td><strong>I3D (Two-Stream)</strong></td>\n<td><strong>3D 卷积 + 光流</strong></td>\n<td><strong>ImageNet → Kinetics</strong></td>\n<td><strong>98.0%</strong></td>\n<td><strong>80.9%</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p>I3D 的优势在于：\n1. <strong>兼得 2D 预训练与 3D 时空建模</strong>：通过膨胀策略，不需要从头训练 3D 网络\n2. <strong>大规模视频预训练</strong>：Kinetics 提供了足够的视频数据来微调 3D 参数\n3. <strong>端到端时空学习</strong>：不同于后期融合方法，I3D 在每一层都同时处理时空信息</p>",
      "quiz": {
        "q": "I3D 中 boring-video fixed point 策略的核心操作是什么？",
        "options": [
          "将 2D 权重沿通道维度复制并求平均",
          "将 2D 权重沿时间维度重复 N 次后除以 N",
          "随机初始化时间维度的卷积核权重",
          "使用时间维度的均值池化替代卷积"
        ],
        "answer": 1,
        "explain": "Boring-video fixed point 将 2D 卷积核沿时间维度重复 N 次后除以 N，确保对静态视频（每帧相同）的响应与原始 2D 网络一致，从而无损继承预训练权重。"
      }
    },
    {
      "id": "non_local",
      "num": 7,
      "name": "Non-local",
      "fullName": "非局部神经网络 (Non-local Neural Networks)",
      "year": "2018",
      "org": "FAIR",
      "parent": "i3d",
      "paperUrl": "https://arxiv.org/abs/1711.07971",
      "projectUrl": "",
      "category": "transformer",
      "motivation": "自注意力捕捉长程时空依赖",
      "summary": "提出了非局部（Non-local）操作作为通用神经网络构建模块，通过计算所有位置间的加权响应直接捕获长程依赖关系，在视频分类、目标检测与分割、姿态估计等任务上均取得显著提升。",
      "keyPoints": [
        "提出通用的非局部操作公式：<span class=\"kb-math kb-math-inline\">y_i = \\frac{1}{\\mathcal{C}(x)} \\sum_{\\forall j} f(x_i, x_j) \\cdot g(x_j)</span>，一次操作即可聚合全局信息",
        "4 种成对函数实例化：Gaussian、Embedded Gaussian（等价于 self-attention）、Dot-product、Concatenation，实验证明效果相近",
        "设计可即插即用的 Non-local Block：包含残差连接 <span class=\"kb-math kb-math-inline\">z_i = W_z y_i + x_i</span>，可嵌入任意已有架构的任意位置",
        "效率优化：通道瓶颈（bottleneck）减半通道数 + 子采样（subsampling）将计算量降至约 1/4",
        "视频分类 Kinetics：NL I3D ResNet-101 达到 77.7% top-1（128帧），超越当时所有 RGB 方法",
        "视频分类 Charades：NL I3D 达到 39.5% mAP，超越 2017 竞赛冠军",
        "静态图像 COCO：仅加 1 个 NL block，目标检测 AP 提升 ~1 点，关键点检测 AP 提升 1.4 点",
        "证明非局部建模与 3D 卷积互补：NL + I3D 优于单独使用任一方法"
      ],
      "detail": "<p><img alt=\"Non-local Block 结构示意图\" src=\"https://ar5iv.labs.arxiv.org/html/1711.07971/assets/x2.png\" />\n<em>图：Non-local Block 的计算图。输入 x 经过 θ、φ、g 三个变换后计算成对关系，输出经 W_z 投影后与输入残差相加。</em></p>\n<pre><code class=\"language-python\"># Non-local Block 伪代码 (Embedded Gaussian 版本)\ndef non_local_block(x):\n    &quot;&quot;&quot;\n    x: 输入特征 [B, C, T, H, W] (视频) 或 [B, C, H, W] (图像)\n    &quot;&quot;&quot;\n    batch, C, *spatial = x.shape\n\n    # 1x1x1 卷积降维 (bottleneck, C -&gt; C//2)\n    theta = W_theta(x)  # [B, C//2, T*H*W]  query\n    phi = W_phi(x)      # [B, C//2, T*H*W]  key\n    g = W_g(x)          # [B, C//2, T*H*W]  value\n\n    # 可选: 对 phi 和 g 进行子采样 (max pooling) 减少计算\n    phi = max_pool(phi)  # [B, C//2, T*H*W / 4]\n    g = max_pool(g)      # [B, C//2, T*H*W / 4]\n\n    # 计算成对关系矩阵 (Embedded Gaussian)\n    attn = softmax(theta^T @ phi)  # [B, T*H*W, T*H*W/4]\n\n    # 加权聚合\n    y = attn @ g^T  # [B, T*H*W, C//2]\n\n    # 1x1x1 卷积恢复维度 + 残差连接\n    y = W_z(y)  # [B, C, T, H, W], W_z 的 BN 初始化为 0\n    return y + x  # 残差连接，初始时 block 为恒等映射\n</code></pre>\n<h5>动机与背景</h5>\n<p>传统深度网络依赖卷积和循环操作逐层堆叠来扩大感受野，存在以下根本局限：</p>\n<ol>\n<li><strong>局部性</strong>：卷积核仅覆盖局部邻域（如 3×3 或 3×3×3），捕获远程依赖需要堆叠大量层，信号在多层传播中逐渐衰减</li>\n<li><strong>序列瓶颈</strong>：RNN/LSTM 按时间步顺序处理，难以直接建模相距较远的帧间关系，且梯度传播路径长</li>\n<li><strong>计算效率</strong>：大卷积核（如全局卷积）虽然理论上可覆盖全局，但参数量和计算量不可接受</li>\n</ol>\n<p>受经典计算机视觉中非局部均值（Non-local Means）去噪算法的启发，作者提出将\"非局部操作\"引入深度网络——让每个位置直接与所有其他位置交互，一步到位地捕获全局依赖。</p>\n<h5>核心机制：非局部操作</h5>\n<p><strong>通用公式定义</strong>：</p>\n<div class=\"kb-math kb-math-display\">y_i = \\frac{1}{\\mathcal{C}(x)} \\sum_{\\forall j} f(x_i, x_j) \\cdot g(x_j)</div>\n<p>其中：\n- <span class=\"kb-math kb-math-inline\">i</span> 是输出位置（时空中的某一点），<span class=\"kb-math kb-math-inline\">j</span> 枚举所有可能位置\n- <span class=\"kb-math kb-math-inline\">f(x_i, x_j)</span> 是成对函数，计算位置 <span class=\"kb-math kb-math-inline\">i</span> 和 <span class=\"kb-math kb-math-inline\">j</span> 之间的关系/相似度\n- <span class=\"kb-math kb-math-inline\">g(x_j) = W_g x_j</span> 是对位置 <span class=\"kb-math kb-math-inline\">j</span> 特征的线性变换\n- <span class=\"kb-math kb-math-inline\">\\mathcal{C}(x)</span> 是归一化因子</p>\n<div class=\"key-point\">💡 关键直觉：非局部操作本质上是一种\"软注意力\"——对所有位置的特征做加权平均，权重由位置间的相似度决定。这使得网络可以在单层内直接\"看到\"并利用远处的信息。</div>\n<p><strong>四种成对函数 <span class=\"kb-math kb-math-inline\">f</span> 的实例化</strong>：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>变体</th>\n<th>公式</th>\n<th>归一化 <span class=\"kb-math kb-math-inline\">\\mathcal{C}(x)</span></th>\n<th>特点</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Gaussian</td>\n<td><span class=\"kb-math kb-math-inline\">f = e^{x_i^T x_j}</span></td>\n<td><span class=\"kb-math kb-math-inline\">\\sum_j f(x_i, x_j)</span></td>\n<td>原始空间计算相似度</td>\n</tr>\n<tr>\n<td>Embedded Gaussian</td>\n<td><span class=\"kb-math kb-math-inline\">f = e^{\\theta(x_i)^T \\phi(x_j)}</span></td>\n<td><span class=\"kb-math kb-math-inline\">\\sum_j f(x_i, x_j)</span></td>\n<td><strong>等价于 self-attention</strong></td>\n</tr>\n<tr>\n<td>Dot-product</td>\n<td><span class=\"kb-math kb-math-inline\">f = \\theta(x_i)^T \\phi(x_j)</span></td>\n<td><span class=\"kb-math kb-math-inline\">N</span>（位置总数）</td>\n<td>无 softmax，更简洁</td>\n</tr>\n<tr>\n<td>Concatenation</td>\n<td><span class=\"kb-math kb-math-inline\">f = \\text{ReLU}(w_f^T [\\theta(x_i), \\phi(x_j)])</span></td>\n<td><span class=\"kb-math kb-math-inline\">N</span></td>\n<td>非对称关系建模</td>\n</tr>\n</tbody>\n</table></div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\theta(x_i) = W_\\theta x_i</span>，<span class=\"kb-math kb-math-inline\">\\phi(x_j) = W_\\phi x_j</span> 为嵌入变换。</p>\n<div class=\"warn-box\">⚠️ 重要发现：实验表明四种变体效果相近（Kinetics 上差异 &lt; 0.5%），说明<strong>非局部行为本身</strong>（而非特定的注意力归一化方式）才是性能提升的关键。</div>\n<h5>Non-local Block 的工程设计</h5>\n<p>为了将非局部操作无缝嵌入现有网络，作者设计了 Non-local Block：</p>\n<div class=\"kb-math kb-math-display\">z_i = W_z y_i + x_i</div>\n<p>关键设计选择：</p>\n<ol>\n<li><strong>残差连接</strong>：输出 = 非局部响应 + 原始输入。<span class=\"kb-math kb-math-inline\">W_z</span> 的 BatchNorm 层初始化为零，使得初始时整个 block 等价于恒等映射，不破坏预训练权重</li>\n<li><strong>瓶颈结构</strong>：<span class=\"kb-math kb-math-inline\">W_\\theta, W_\\phi, W_g</span> 将通道数从 <span class=\"kb-math kb-math-inline\">C</span> 降至 <span class=\"kb-math kb-math-inline\">C/2</span>，<span class=\"kb-math kb-math-inline\">W_z</span> 再恢复为 <span class=\"kb-math kb-math-inline\">C</span>，计算量减半</li>\n<li><strong>子采样技巧</strong>：对 <span class=\"kb-math kb-math-inline\">\\phi</span> 和 <span class=\"kb-math kb-math-inline\">g</span> 的空间维度做 max pooling（步长为2），将注意力矩阵大小缩减为 1/4，不影响性能</li>\n</ol>\n<h5>时空域中的非局部操作</h5>\n<p>在视频理解中，非局部操作可以在不同维度上应用：\n- <strong>时空联合</strong>（spacetime）：<span class=\"kb-math kb-math-inline\">j</span> 遍历所有帧的所有空间位置 → 效果最优\n- <strong>仅空间</strong>（space-only）：<span class=\"kb-math kb-math-inline\">j</span> 仅遍历当前帧内的空间位置\n- <strong>仅时间</strong>（time-only）：<span class=\"kb-math kb-math-inline\">j</span> 仅遍历同一空间位置在不同帧的特征</p>\n<p>实验证明时空联合版本最优（73.8% vs 72.9%/73.1%），因为它能同时捕获空间中的物体关系和时间中的运动模式。</p>\n<h5>与 Self-Attention 的关系</h5>\n<p>作者明确指出 Embedded Gaussian 版本的非局部操作<strong>数学上等价于 Transformer 中的 self-attention</strong>：</p>\n<div class=\"kb-math kb-math-display\">y = \\text{softmax}(x^T W_\\theta^T W_\\phi x) \\cdot g(x)</div>\n<p>但本文的贡献在于：\n1. 将 self-attention 从 NLP 序列推广到<strong>时空视觉特征</strong>\n2. 证明 softmax 归一化并非必要（dot-product 版本同样有效）\n3. 提出了实用的 block 设计使其可嵌入任意 CNN 架构</p>\n<h5>实验结果</h5>\n<p><strong>Kinetics 视频分类</strong>：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>模型</th>\n<th>Backbone</th>\n<th>帧数</th>\n<th>Top-1 (%)</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>C2D baseline</td>\n<td>R-50</td>\n<td>32</td>\n<td>71.8</td>\n</tr>\n<tr>\n<td>NL C2D (5 blocks)</td>\n<td>R-50</td>\n<td>32</td>\n<td>73.8</td>\n</tr>\n<tr>\n<td>NL C2D (5 blocks)</td>\n<td>R-101</td>\n<td>32</td>\n<td>75.1</td>\n</tr>\n<tr>\n<td>I3D</td>\n<td>R-50</td>\n<td>32</td>\n<td>73.3</td>\n</tr>\n<tr>\n<td>NL I3D (5 blocks)</td>\n<td>R-50</td>\n<td>32</td>\n<td>74.9</td>\n</tr>\n<tr>\n<td>NL I3D (5 blocks)</td>\n<td>R-101</td>\n<td>128</td>\n<td><strong>77.7</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>COCO 目标检测/分割</strong>（Mask R-CNN + 1 NL block）：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>Backbone</th>\n<th>AP^box (baseline → +NL)</th>\n<th>AP^mask (baseline → +NL)</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>R-50</td>\n<td>38.0 → 39.0 (+1.0)</td>\n<td>34.6 → 35.5 (+0.9)</td>\n</tr>\n<tr>\n<td>R-101</td>\n<td>39.5 → 40.8 (+1.3)</td>\n<td>36.0 → 37.1 (+1.1)</td>\n</tr>\n<tr>\n<td>X-152</td>\n<td>44.1 → 45.0 (+0.9)</td>\n<td>39.7 → 40.3 (+0.6)</td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>COCO 关键点检测</strong>：R-101 baseline 65.1 AP → +4 NL in head + 1 NL in backbone = 66.5 AP (+1.4)</p>\n<div class=\"key-point\">💡 关键洞察：即使在极深的 X-152 上，1 个 NL block 仍能带来提升，说明<strong>非局部依赖未被现有模型充分捕获</strong>，无论深度/容量如何增加。</div>",
      "quiz": {
        "q": "Non-local Neural Networks 中，Embedded Gaussian 版本的非局部操作与以下哪个机制数学上等价？",
        "options": [
          "LSTM 中的门控机制",
          "Transformer 中的 self-attention",
          "ResNet 中的跳跃连接",
          "GAN 中的判别器"
        ],
        "answer": 1,
        "explain": "Embedded Gaussian 使用 softmax(θ(x_i)^T φ(x_j)) 作为权重对 g(x_j) 加权求和，这与 Transformer self-attention 的 Query-Key-Value 机制在数学形式上完全一致。"
      }
    },
    {
      "id": "r2plus1d",
      "num": 8,
      "name": "R(2+1)D",
      "fullName": "分解3D卷积 (Factorized 3D Convolutions)",
      "year": "2018",
      "org": "Facebook",
      "parent": "c3d",
      "paperUrl": "https://arxiv.org/abs/1711.11248",
      "projectUrl": "",
      "category": "cnn_rnn",
      "motivation": "将3D卷积分解为2D空间+1D时间",
      "summary": "R(2+1)D 将 3D 卷积核分解为 2D 空间卷积和 1D 时间卷积的级联，在保持参数量不变的前提下，通过增加非线性变换的数量和简化优化过程，显著提升了视频动作识别的性能。",
      "keyPoints": [
        "系统性对比了 5 种时空卷积架构：R2D、MCx、rMCx、R3D、R(2+1)D",
        "核心创新：将 <span class=\"kb-math kb-math-inline\">t \\times d \\times d</span> 的 3D 卷积分解为 <span class=\"kb-math kb-math-inline\">1 \\times d \\times d</span> 的 2D 空间卷积 + <span class=\"kb-math kb-math-inline\">t \\times 1 \\times 1</span> 的 1D 时间卷积",
        "中间子空间维度 <span class=\"kb-math kb-math-inline\">M_i</span> 的计算公式保证分解后参数量与原始 3D 卷积一致",
        "双重优势：(1) 非线性数量翻倍（每次分解之间插入 ReLU）；(2) 优化更容易（训练损失更低）",
        "基于 ResNet-18/34 架构，在 clip 级别和 video 级别均达到 SOTA",
        "在 Kinetics、Sports-1M、UCF101、HMDB51 四个基准上验证有效性",
        "仅用 RGB 输入（无光流）即可达到甚至超过双流方法的性能"
      ],
      "detail": "<h5>示意图</h5>\n<p><img alt=\"R(2+1)D 时空卷积分解示意图\" src=\"https://ar5iv.labs.arxiv.org/html/1711.11248v3/assets/x1.png\" />\n<em>图：(a) 全 3D 卷积 vs (b) (2+1)D 分解卷积。3D 卷积核 <span class=\"kb-math kb-math-inline\">t \\times d \\times d</span> 被分解为空间 2D 卷积 <span class=\"kb-math kb-math-inline\">1 \\times d \\times d</span> 和时间 1D 卷积 <span class=\"kb-math kb-math-inline\">t \\times 1 \\times 1</span>，中间通过 ReLU 非线性连接。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># R(2+1)D 分解卷积块伪代码\ndef r2plus1d_block(x, N_in, N_out, t=3, d=3):\n    &quot;&quot;&quot;\n    x: 输入特征 [B, N_in, T, H, W]\n    N_in: 输入通道数\n    N_out: 输出通道数\n    t: 时间卷积核大小\n    d: 空间卷积核大小\n    &quot;&quot;&quot;\n    # 计算中间子空间维度 M_i，保证总参数量 ≈ 原始 3D 卷积\n    M_i = int(t * d * d * N_in * N_out / (d * d * N_in + t * N_out))\n\n    # 第一步：2D 空间卷积 (1 × d × d)\n    z = Conv3D(x, kernel=(1, d, d), in_ch=N_in, out_ch=M_i)\n    z = BatchNorm(z)\n    z = ReLU(z)  # 额外的非线性！\n\n    # 第二步：1D 时间卷积 (t × 1 × 1)\n    y = Conv3D(z, kernel=(t, 1, 1), in_ch=M_i, out_ch=N_out)\n    y = BatchNorm(y)\n    y = ReLU(y)\n\n    return y\n</code></pre>\n<h5>动机与背景</h5>\n<p>视频理解的核心挑战在于如何有效建模时空信息。早期方法如 C3D 和 I3D 直接使用 3D 卷积处理视频，但 3D 卷积存在两个关键问题：</p>\n<ol>\n<li><strong>参数量大、优化困难</strong>：3D 卷积核的参数空间比 2D 卷积大一个数量级，导致训练过程中更容易陷入局部最优。</li>\n<li><strong>时空耦合</strong>：3D 卷积同时学习空间和时间特征，但空间外观和时间运动本质上是两种不同性质的信息，强制耦合可能限制模型的表达能力。</li>\n</ol>\n<p>在此之前，已有一些工作尝试分解时空建模（如 P3D、S3D），但缺乏系统性的对比研究。本文的核心贡献在于：<strong>系统性地比较了多种时空卷积设计方案，并证明 (2+1)D 分解是最优选择。</strong></p>\n<h5>核心机制：(2+1)D 分解</h5>\n<p><strong>五种架构对比</strong></p>\n<p>论文系统研究了以下五种基于 ResNet 的时空卷积架构：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>架构</th>\n<th>描述</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><strong>R2D</strong></td>\n<td>仅使用 2D 卷积，将视频帧拼接为多通道输入</td>\n</tr>\n<tr>\n<td><strong>MCx</strong></td>\n<td>前 x 层使用 3D 卷积（底层），其余使用 2D 卷积（高层）</td>\n</tr>\n<tr>\n<td><strong>rMCx</strong></td>\n<td>前 x 层使用 2D 卷积（底层），其余使用 3D 卷积（高层）</td>\n</tr>\n<tr>\n<td><strong>R3D</strong></td>\n<td>全部使用 3D 卷积</td>\n</tr>\n<tr>\n<td><strong>R(2+1)D</strong></td>\n<td>全部使用 (2+1)D 分解卷积</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 <strong>关键发现</strong>：MC 和 rMC 实验表明，3D 卷积放在高层（rMCx）比放在底层（MCx）效果更好，说明时间建模在高层语义空间中更有效。但 R(2+1)D 在所有层都使用分解卷积，效果最优。</div>\n<p><strong>中间维度 <span class=\"kb-math kb-math-inline\">M_i</span> 的设计</strong></p>\n<p>将 <span class=\"kb-math kb-math-inline\">N_{i-1}</span> 个输入通道的 <span class=\"kb-math kb-math-inline\">t \\times d \\times d</span> 3D 卷积分解为两步时，引入中间子空间维度 <span class=\"kb-math kb-math-inline\">M_i</span>：</p>\n<div class=\"kb-math kb-math-display\">M_i = \\left\\lfloor \\frac{t d^2 N_{i-1} N_i}{d^2 N_{i-1} + t N_i} \\right\\rfloor</div>\n<p>这个公式的推导逻辑是：</p>\n<ul>\n<li>原始 3D 卷积的参数量为 <span class=\"kb-math kb-math-inline\">t \\times d^2 \\times N_{i-1} \\times N_i</span></li>\n<li>分解后：2D 空间卷积参数量 <span class=\"kb-math kb-math-inline\">d^2 \\times N_{i-1} \\times M_i</span> + 1D 时间卷积参数量 <span class=\"kb-math kb-math-inline\">t \\times M_i \\times N_i</span></li>\n<li>令两者相等：<span class=\"kb-math kb-math-inline\">d^2 N_{i-1} M_i + t M_i N_i = t d^2 N_{i-1} N_i</span></li>\n<li>解出 <span class=\"kb-math kb-math-inline\">M_i</span></li>\n</ul>\n<div class=\"warn-box\">⚠️ 注意：<span class=\"kb-math kb-math-inline\">M_i</span> 的设计确保了 R(2+1)D 与 R3D 具有<strong>完全相同的参数量</strong>，因此性能提升完全来自架构设计而非参数增加。</div>\n<p><strong>为什么 (2+1)D 分解更优？</strong></p>\n<p>论文给出了两个核心原因：</p>\n<p><strong>1. 非线性数量翻倍</strong></p>\n<p>在每个残差块中，原始 3D 卷积后只有一个 ReLU 非线性。而 (2+1)D 分解在 2D 空间卷积和 1D 时间卷积之间额外插入了一个 ReLU，使得非线性变换的数量翻倍。更多的非线性意味着模型可以表示更复杂的函数空间。</p>\n<p><strong>2. 优化更容易</strong></p>\n<p>论文通过实验发现，R(2+1)D 在训练集上的损失比 R3D 更低（图 3），这表明分解后的优化景观（optimization landscape）更加平滑。直觉上，将复杂的 3D 时空滤波器分解为两个更简单的操作，降低了学习难度。</p>\n<h5>训练与推理流程</h5>\n<p><strong>训练设置</strong>：\n- 输入：从视频中采样 L 帧（L=8 或 32），空间裁剪为 <span class=\"kb-math kb-math-inline\">112 \\times 112</span>\n- 数据增强：随机裁剪、水平翻转\n- 优化器：SGD，初始学习率 0.01，在验证损失饱和时降低 10 倍\n- 预训练：先在 Sports-1M 上预训练，再在 Kinetics 上微调</p>\n<p><strong>推理方式</strong>：\n- <strong>Clip 级别</strong>：对单个 clip 进行中心裁剪预测\n- <strong>Video 级别</strong>：从视频中均匀采样 10 个 clip，取预测平均值</p>\n<p><strong>关键实验结果</strong>：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>Clip@1 (Kinetics)</th>\n<th>Video@1 (Kinetics)</th>\n<th>UCF101</th>\n<th>HMDB51</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>R3D-34</td>\n<td>63.0%</td>\n<td>—</td>\n<td>—</td>\n<td>—</td>\n</tr>\n<tr>\n<td>R(2+1)D-34</td>\n<td><strong>65.6%</strong></td>\n<td><strong>74.3%</strong></td>\n<td><strong>96.8%</strong></td>\n<td><strong>74.5%</strong></td>\n</tr>\n<tr>\n<td>I3D (RGB)</td>\n<td>—</td>\n<td>71.1%</td>\n<td>95.6%</td>\n<td>74.8%</td>\n</tr>\n<tr>\n<td>I3D (RGB+Flow)</td>\n<td>—</td>\n<td>74.2%</td>\n<td>98.0%</td>\n<td>80.7%</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 <strong>关键</strong>：R(2+1)D 仅使用 RGB 输入，在 Kinetics 上的 video 级别准确率（74.3%）就超过了使用 RGB+光流双流的 I3D（74.2%），证明了分解卷积的强大建模能力。</div>\n<h5>与传统方法的区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>对比维度</th>\n<th>C3D / I3D (R3D)</th>\n<th>R(2+1)D</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>卷积类型</td>\n<td>完整 3D 卷积</td>\n<td>2D 空间 + 1D 时间分解</td>\n</tr>\n<tr>\n<td>非线性数量</td>\n<td>每个卷积后 1 个 ReLU</td>\n<td>每个分解块中 2 个 ReLU</td>\n</tr>\n<tr>\n<td>参数量</td>\n<td>基准</td>\n<td>与 R3D 相同</td>\n</tr>\n<tr>\n<td>优化难度</td>\n<td>较高（训练损失较高）</td>\n<td>较低（训练损失更低）</td>\n</tr>\n<tr>\n<td>时空建模</td>\n<td>耦合学习</td>\n<td>解耦学习，先空间后时间</td>\n</tr>\n<tr>\n<td>预训练利用</td>\n<td>需要 inflate 2D 权重</td>\n<td>2D 部分可直接加载 ImageNet 权重</td>\n</tr>\n</tbody>\n</table></div>\n<p>与 P3D、S3D 等同期工作相比，R(2+1)D 的独特之处在于：(1) 提供了系统性的架构对比实验；(2) 通过 <span class=\"kb-math kb-math-inline\">M_i</span> 公式严格控制参数量一致；(3) 从理论（非线性增加）和实验（优化景观更平滑）两个角度解释了分解的优势。</p>",
      "quiz": {
        "q": "R(2+1)D 相比 R3D 性能更优的核心原因是什么？",
        "options": [
          "R(2+1)D 使用了更多的参数",
          "R(2+1)D 引入了注意力机制",
          "分解增加了非线性数量并使优化更容易",
          "R(2+1)D 使用了光流作为额外输入"
        ],
        "answer": 2,
        "explain": "R(2+1)D 与 R3D 参数量相同，其优势来自两方面：(1) 2D 和 1D 卷积之间额外插入 ReLU 使非线性翻倍；(2) 将复杂的 3D 滤波器分解为两个简单操作使优化景观更平滑。"
      }
    },
    {
      "id": "tsm",
      "num": 9,
      "name": "TSM",
      "fullName": "时序移位模块 (Temporal Shift Module)",
      "year": "2019",
      "org": "MIT",
      "parent": "tsn",
      "paperUrl": "https://arxiv.org/abs/1811.08383",
      "projectUrl": "",
      "category": "cnn_rnn",
      "motivation": "零计算代价的通道时序移位",
      "summary": "TSM 提出了一种零额外计算量、零额外参数的**时序移位模块**，通过沿时间维度移动部分通道的特征图来实现帧间信息交换，使 2D CNN 获得与 3D CNN 相当的时序建模能力，同时保持 2D CNN 的推理效率。",
      "keyPoints": [
        "<strong>核心操作</strong>：将特征图中 1/4 的通道沿时间维度分别前移和后移一帧（各 1/8），实现相邻帧间信息融合",
        "<strong>零计算代价</strong>：移位操作仅涉及数据搬运，不引入任何乘加运算和额外参数",
        "<strong>部分移位策略 (Partial Shift)</strong>：仅移位少量通道（1/4），将数据搬运开销控制在 3% 以内，避免全通道移位带来的 ~14% 延迟增加",
        "<strong>残差移位策略 (Residual Shift)</strong>：将 TSM 插入残差分支内部而非外部，通过恒等映射保留当前帧的完整空间信息，避免空间建模能力退化",
        "<strong>双向 TSM (Bi-directional)</strong>：离线场景下同时融合过去帧和未来帧，适用于高吞吐离线视频识别",
        "<strong>单向 TSM (Uni-directional)</strong>：在线场景下仅从过去帧向当前帧移位，支持实时低延迟在线视频识别",
        "<strong>多层级时序融合</strong>：TSM 可插入每个残差块，实现从低层到高层的全层级时序建模",
        "<strong>发表时在 Something-Something 排行榜排名第一</strong>；在 Jetson Nano 和 Galaxy Note8 上分别实现 13ms 和 35ms 的在线识别延迟"
      ],
      "detail": "<h5>核心示意图</h5>\n<p><img alt=\"TSM 时序移位示意图\" src=\"https://ar5iv.labs.arxiv.org/html/1811.08383/assets/x1.png\" />\n<em>图 1：TSM 的核心操作示意。(a) 原始张量无移位；(b) 离线双向移位——同时向前和向后移动部分通道；(c) 在线单向移位——仅将过去帧的特征移入当前帧。</em></p>\n<p><img alt=\"部分移位开销与残差移位性能对比\" src=\"https://ar5iv.labs.arxiv.org/html/1811.08383/assets/x2.png\" />\n<em>图 2：(a) 不同移位比例下的延迟开销——部分移位（1/8）可将开销控制在 3%；(b) 残差移位在所有比例下均优于原地移位，1/4 比例达到最优。</em></p>\n<p><img alt=\"原地 TSM 与残差 TSM 对比\" src=\"https://ar5iv.labs.arxiv.org/html/1811.08383/assets/x3.png\" />\n<em>图 3：(a) 原地 TSM 在卷积层之前移位，会丢失当前帧信息；(b) 残差 TSM 在残差分支内部移位，通过 shortcut 保留完整的当前帧特征。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># TSM 核心操作伪代码\n# 输入: x — 形状为 (N*T, C, H, W) 的特征张量\n# fold: 移位通道比例，默认 1/8（前移 1/8 + 后移 1/8 = 总共 1/4）\n\ndef temporal_shift(x, T, fold_div=8):\n    N_T, C, H, W = x.shape\n    x = x.view(N_T // T, T, C, H, W)  # (N, T, C, H, W)\n    fold = C // fold_div  # 每个方向移位的通道数\n\n    out = x.clone()\n    # 前移: 将 t+1 帧的前 fold 个通道移到 t 帧\n    out[:, :-1, :fold, :, :] = x[:, 1:, :fold, :, :]\n    # 后移: 将 t-1 帧的第 fold~2*fold 个通道移到 t 帧\n    out[:, 1:, fold:2*fold, :, :] = x[:, :-1, fold:2*fold, :, :]\n    # 剩余 C - 2*fold 个通道保持不变\n\n    return out.view(N_T, C, H, W)\n\n# 残差 TSM 的插入方式（在 ResNet 残差块中）:\n# class ResBlock(nn.Module):\n#     def forward(self, x):\n#         identity = x\n#         x = temporal_shift(x, T)  # 在残差分支内部移位\n#         x = self.conv1(x)\n#         x = self.conv2(x)\n#         return x + identity  # identity 保留完整当前帧信息\n</code></pre>\n<h5>动机与背景</h5>\n<p>视频理解的核心挑战在于<strong>时序建模</strong>——例如区分\"打开盒子\"和\"关闭盒子\"需要理解帧的时间顺序。传统方法面临效率与性能的两难：</p>\n<ul>\n<li><strong>2D CNN（如 TSN）</strong>：对每帧独立处理后平均融合，计算高效但完全忽略时序关系</li>\n<li><strong>3D CNN（如 I3D、C3D）</strong>：联合学习时空特征，性能好但计算量巨大（通常是 2D 的 3~5 倍），难以部署到边缘设备</li>\n<li><strong>混合方法（如 ECO、R(2+1)D）</strong>：部分层使用 3D 卷积，牺牲了低层或高层的时序建模</li>\n</ul>\n<p>TSM 的核心洞察是：<strong>卷积操作可以分解为\"移位\"和\"乘加累积\"两步</strong>。如果在时间维度上执行移位，再将乘加累积折叠到后续的 2D 卷积中，就能以零额外计算实现时序建模。</p>\n<h5>核心机制详解</h5>\n<p><strong>1. 移位即时序卷积</strong></p>\n<p>考虑一维卷积 <span class=\"kb-math kb-math-inline\">Y_i = w_1 X_{i-1} + w_2 X_i + w_3 X_{i+1}</span>，它可以分解为：</p>\n<ul>\n<li><strong>移位步骤</strong>：生成三个移位版本 <span class=\"kb-math kb-math-inline\">X^{-1}_i = X_{i-1}</span>，<span class=\"kb-math kb-math-inline\">X^{0}_i = X_i</span>，<span class=\"kb-math kb-math-inline\">X^{+1}_i = X_{i+1}</span></li>\n<li><strong>乘加步骤</strong>：<span class=\"kb-math kb-math-inline\">Y = w_1 X^{-1} + w_2 X^{0} + w_3 X^{+1}</span></li>\n</ul>\n<p>TSM 的关键在于：<strong>移位步骤在时间维度上完成（零计算），乘加步骤被后续的 2D 空间卷积自然吸收</strong>。这等价于在时间维度上执行了卷积核大小为 3 的时序卷积，但不需要任何额外的参数或计算。</p>\n<p><strong>2. 朴素移位的两大问题</strong></p>\n<p>直接将所有通道进行时序移位会导致：</p>\n<ul>\n<li><strong>效率问题</strong>：全通道移位的数据搬运开销在 CPU 上高达 13.7%，GPU 上 12.4%，对于 5D 视频张量（<span class=\"kb-math kb-math-inline\">N \\times C \\times T \\times H \\times W</span>）尤为严重</li>\n<li><strong>精度问题</strong>：被移位的通道丢失了当前帧的信息，严重损害 2D 骨干网络的空间建模能力，导致准确率下降 2.6%</li>\n</ul>\n<p><strong>3. 部分移位 (Partial Shift)</strong></p>\n<p>TSM 仅移位 <strong>1/4 的通道</strong>（1/8 前移 + 1/8 后移），其余 3/4 通道保持不变。实验表明：</p>\n<div class=\"kb-math kb-math-display\">\\text{延迟开销} = \\begin{cases} \\sim 3\\% &amp; \\text{移位 1/8 通道} \\\\ \\sim 6\\% &amp; \\text{移位 1/4 通道} \\\\ \\sim 14\\% &amp; \\text{移位全部通道} \\end{cases}</div>\n<p>1/4 的移位比例在时序建模能力和数据搬运开销之间取得最佳平衡。</p>\n<p><strong>4. 残差移位 (Residual Shift)</strong></p>\n<p>将 TSM 插入残差块的<strong>内部分支</strong>而非外部：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{y} = \\mathcal{F}(\\text{TSM}(\\mathbf{x})) + \\mathbf{x}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\mathcal{F}</span> 是残差分支中的卷积操作，<span class=\"kb-math kb-math-inline\">\\mathbf{x}</span> 是输入。由于恒等映射 <span class=\"kb-math kb-math-inline\">\\mathbf{x}</span> 保留了当前帧的完整信息，即使移位了部分通道，空间特征学习能力也不会退化。实验证明，残差移位在所有移位比例下均优于原地移位（in-place shift）。</p>\n<div class=\"key-point\">💡 <strong>关键</strong>：残差移位是 TSM 成功的核心设计——它让时序融合\"免费搭车\"于残差学习框架，既不破坏空间特征，又实现了多层级时序建模。</div>\n<p><strong>5. 离线双向 TSM</strong></p>\n<p>在离线视频识别中，TSM 采用双向移位：</p>\n<ul>\n<li>从视频中均匀采样 <span class=\"kb-math kb-math-inline\">T</span> 帧（通常 8 或 16 帧）</li>\n<li>在每个残差块中，1/8 通道从未来帧移入、1/8 通道从过去帧移入</li>\n<li>所有帧堆叠为 batch 维度，共享同一个 2D CNN 骨干（如 ResNet-50）</li>\n<li>最终对所有帧的 logits 取平均得到预测</li>\n</ul>\n<p>这与 TSN 的流程完全一致，唯一区别是在每个残差块中插入了 TSM，因此参数量和计算量与 2D 基线完全相同。</p>\n<p><strong>6. 在线单向 TSM</strong></p>\n<p>在线场景中不能访问未来帧，TSM 改为单向移位：</p>\n<ul>\n<li>每帧到达时，缓存当前帧 1/8 通道的特征图</li>\n<li>下一帧处理时，用缓存的旧特征替换对应通道（7/8 当前 + 1/8 缓存）</li>\n<li>仅需 <strong>0.9MB</strong> 内存缓存（ResNet-50），实现逐帧实时预测</li>\n</ul>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：在线 TSM 的延迟几乎等于单帧 2D CNN 推理延迟，而非多帧累积，这是相比 ECO 等方法的关键优势。</div>\n<h5>与传统方法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>时序建模</th>\n<th>额外计算</th>\n<th>额外参数</th>\n<th>部署友好</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>TSN (2D CNN)</td>\n<td>❌ 无</td>\n<td>0</td>\n<td>0</td>\n<td>✅</td>\n</tr>\n<tr>\n<td>I3D (3D CNN)</td>\n<td>✅ 强</td>\n<td>~3-5×</td>\n<td>~1.5×</td>\n<td>❌</td>\n</tr>\n<tr>\n<td>R(2+1)D (分解 3D)</td>\n<td>✅ 中</td>\n<td>~1.5×</td>\n<td>~1.2×</td>\n<td>⚠️</td>\n</tr>\n<tr>\n<td>ECO (混合)</td>\n<td>⚠️ 部分层</td>\n<td>~1.5×</td>\n<td>~1.2×</td>\n<td>⚠️</td>\n</tr>\n<tr>\n<td><strong>TSM (本文)</strong></td>\n<td><strong>✅ 全层级</strong></td>\n<td><strong>0</strong></td>\n<td><strong>0</strong></td>\n<td><strong>✅</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p>TSM 的核心优势在于：它在<strong>不增加任何计算和参数</strong>的前提下，通过纯数据搬运操作实现了与 3D CNN 可比的时序建模能力，且完全兼容现有 2D CNN 骨干和预训练权重。</p>",
      "quiz": {
        "q": "TSM 将移位模块插入残差分支内部（而非外部）的主要目的是什么？",
        "options": [
          "减少模型的总参数量",
          "通过恒等映射保留当前帧的完整空间信息，避免空间建模能力退化",
          "加速移位操作的数据搬运效率",
          "使模型能够访问更多相邻帧的信息"
        ],
        "answer": 1,
        "explain": "残差移位通过 shortcut 连接保留了当前帧的完整特征，即使部分通道被移位到相邻帧，空间信息也不会丢失，从而避免了原地移位导致的精度下降。"
      }
    },
    {
      "id": "slowfast",
      "num": 10,
      "name": "SlowFast",
      "fullName": "双速网络 (SlowFast Networks)",
      "year": "2019",
      "org": "FAIR",
      "parent": "i3d",
      "paperUrl": "https://arxiv.org/abs/1812.03982",
      "projectUrl": "",
      "category": "cnn_rnn",
      "motivation": "双速采样捕捉外观与运动",
      "summary": "SlowFast 提出了一种双路径视频识别网络，其中 Slow 路径以低帧率捕捉空间语义信息，Fast 路径以高帧率（\\(\\alpha\\) 倍）但极轻量（\\(\\beta\\) 倍通道）的方式捕捉细粒度时序运动信息，两条路径通过横向连接融合，在无需光流或 ImageNet 预训练的情况下取得了视频识别的全面 SOTA。",
      "keyPoints": [
        "<strong>双路径架构</strong>：Slow pathway（低帧率、高通道容量）捕捉空间语义，Fast pathway（高帧率、低通道容量）捕捉时序运动",
        "<strong>关键超参数</strong>：速度比 <span class=\"kb-math kb-math-inline\">\\alpha = 8</span>（Fast 帧率是 Slow 的 8 倍），通道比 <span class=\"kb-math kb-math-inline\">\\beta = 1/8</span>（Fast 通道数仅为 Slow 的 1/8）",
        "<strong>计算高效</strong>：Fast pathway 仅占总计算量约 20%，整体网络高效",
        "<strong>横向连接（Lateral Connections）</strong>：Fast→Slow 的单向信息融合，支持 Time-to-Channel、Time-strided Sampling、Time-strided Convolution 三种实现",
        "<strong>无需光流输入</strong>：直接从 RGB 帧学习运动表征，端到端训练",
        "<strong>无需 ImageNet 预训练</strong>：从头训练（train from scratch）即可超越所有依赖预训练的方法",
        "<strong>生物学启发</strong>：类比视网膜神经节细胞中 P-cells（~80%，低时频高空间分辨率）和 M-cells（~15-20%，高时频低空间分辨率）的功能分工",
        "<strong>全面 SOTA</strong>：Kinetics-400（79.8% top-1）、Kinetics-600（81.8% top-1）、Charades（42.5% mAP）、AVA（28.3% mAP）"
      ],
      "detail": "<h5>架构总览</h5>\n<p><img alt=\"SlowFast 网络架构示意图\" src=\"https://ar5iv.labs.arxiv.org/html/1812.03982/assets/x1.png\" />\n<em>图：SlowFast 网络架构。上方为 Slow pathway（低帧率，高通道），下方为 Fast pathway（高帧率，轻量通道），通过横向连接（Lateral Connections）在每个阶段进行信息融合。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># SlowFast Networks 前向传播伪代码\ndef slowfast_forward(video_clip, tau=16, alpha=8):\n    &quot;&quot;&quot;\n    video_clip: 原始视频片段，共 T_total 帧\n    tau: Slow pathway 采样步长\n    alpha: Fast/Slow 帧率比\n    &quot;&quot;&quot;\n    # 1. 帧采样\n    slow_frames = sample_every(video_clip, stride=tau)        # T 帧 (e.g., 4)\n    fast_frames = sample_every(video_clip, stride=tau//alpha)  # αT 帧 (e.g., 32)\n\n    # 2. 双路径独立处理 + 横向连接融合\n    for stage in [res2, res3, res4, res5]:\n        slow_feat = slow_pathway[stage](slow_feat)    # 通道: C\n        fast_feat = fast_pathway[stage](fast_feat)     # 通道: βC (β=1/8)\n\n        # 横向连接: Fast → Slow (单向)\n        lateral_feat = lateral_connection(fast_feat)   # 变换时间维度匹配\n        slow_feat = concat(slow_feat, lateral_feat)    # 沿通道维度拼接\n\n    # 3. 全局池化 + 分类\n    slow_out = global_avg_pool(slow_feat)  \n    fast_out = global_avg_pool(fast_feat)\n    logits = fc(concat(slow_out, fast_out))\n    return logits\n</code></pre>\n<h5>动机与背景</h5>\n<p>视频理解的核心挑战在于同时建模<strong>空间语义</strong>（场景中有什么物体、人物）和<strong>时序运动</strong>（动作如何随时间变化）。传统方法主要有两条技术路线：</p>\n<ol>\n<li><strong>双流网络（Two-Stream）</strong>：分别处理 RGB 帧（空间流）和光流（时间流），但光流计算代价极高且需要预计算存储</li>\n<li><strong>3D 卷积网络（C3D/I3D）</strong>：将 2D 卷积扩展为 3D 以同时建模时空，但对所有通道使用相同的时间分辨率，无法区分空间语义和运动信息的不同需求</li>\n</ol>\n<div class=\"key-point\">💡 <strong>关键洞察</strong>：识别视觉内容的\"类别\"（如识别一个人在做什么动作的类型）变化相对缓慢，不需要高帧率；而捕捉运动的\"细节\"（如手的快速移动方向）需要高时间分辨率。这两类信息的计算需求天然不对称。</div>\n<p>这一洞察与灵长类视觉系统的生物学发现高度吻合：视网膜中约 80% 的神经节细胞为 <strong>P-cells</strong>（Parvocellular），对空间细节和颜色敏感但时间响应慢；约 15-20% 为 <strong>M-cells</strong>（Magnocellular），时间分辨率高但对空间细节和颜色不敏感。SlowFast 网络正是对这种生物学分工的计算建模。</p>\n<h5>核心机制详解</h5>\n<p><strong>1. Slow Pathway — 空间语义建模</strong></p>\n<p>Slow pathway 以较大的时间步长 <span class=\"kb-math kb-math-inline\">\\tau</span>（默认 16）对视频进行稀疏采样，输入 <span class=\"kb-math kb-math-inline\">T</span> 帧（通常 <span class=\"kb-math kb-math-inline\">T = 4</span> 或 <span class=\"kb-math kb-math-inline\">T = 8</span>）。它使用完整的通道容量来建模丰富的空间语义信息：</p>\n<div class=\"kb-math kb-math-display\">T_{slow} = T, \\quad \\text{采样步长} = \\tau</div>\n<p>Slow pathway 可以是任何时空卷积网络（如 ResNet-50/101 的 3D 变体）。在默认配置中，Slow pathway 仅在较深的阶段（res<span class=\"kb-math kb-math-inline\">_4</span> 和 res<span class=\"kb-math kb-math-inline\">_5</span>）使用时间卷积（temporal kernel size = 3），浅层不做时间建模，这与其\"关注空间语义\"的设计目标一致。</p>\n<p><strong>2. Fast Pathway — 时序运动建模</strong></p>\n<p>Fast pathway 以 <span class=\"kb-math kb-math-inline\">\\alpha</span> 倍更高的帧率采样，输入 <span class=\"kb-math kb-math-inline\">\\alpha T</span> 帧（默认 <span class=\"kb-math kb-math-inline\">\\alpha = 8</span>，即 32 帧），但通道数仅为 Slow 的 <span class=\"kb-math kb-math-inline\">\\beta</span> 倍（默认 <span class=\"kb-math kb-math-inline\">\\beta = 1/8</span>）：</p>\n<div class=\"kb-math kb-math-display\">T_{fast} = \\alpha T, \\quad \\text{采样步长} = \\tau / \\alpha</div>\n<div class=\"kb-math kb-math-display\">C_{fast} = \\beta \\cdot C_{slow}</div>\n<div class=\"warn-box\">⚠️ <strong>关键设计</strong>：Fast pathway 的计算量约为 <span class=\"kb-math kb-math-inline\">\\beta^2 \\times \\alpha \\approx (1/8)^2 \\times 8 \\approx 12.5\\%</span> 的 Slow pathway 计算量。这意味着增加 Fast pathway 仅带来约 20% 的额外计算开销，但显著提升了运动建模能力。</div>\n<p>Fast pathway 的另一关键特征是<strong>全程无时间下采样</strong>（no temporal downsampling via pooling）。在所有阶段中，时间维度保持不变（或仅通过 stride=1 的时间卷积），确保细粒度的时间信息不被丢失。同时，Fast pathway 在每个残差块中都使用时间卷积（temporal kernel size = 3），充分利用高时间分辨率。</p>\n<p><strong>3. 横向连接（Lateral Connections）— 信息融合</strong></p>\n<p>两条路径通过横向连接在每个阶段进行融合，方向为 <strong>Fast → Slow</strong>（单向）。由于两条路径的时间维度不同（<span class=\"kb-math kb-math-inline\">\\alpha T</span> vs <span class=\"kb-math kb-math-inline\">T</span>），需要进行时间维度变换。论文探索了三种方式：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方式</th>\n<th>操作</th>\n<th>输出通道数</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Time-to-Channel</td>\n<td>将 <span class=\"kb-math kb-math-inline\">\\alpha T</span> 帧 reshape 为 <span class=\"kb-math kb-math-inline\">T</span> 帧，通道扩展 <span class=\"kb-math kb-math-inline\">\\alpha</span> 倍</td>\n<td><span class=\"kb-math kb-math-inline\">\\alpha \\beta C</span></td>\n</tr>\n<tr>\n<td>Time-strided Sampling</td>\n<td>每隔 <span class=\"kb-math kb-math-inline\">\\alpha</span> 帧采样一帧</td>\n<td><span class=\"kb-math kb-math-inline\">\\beta C</span></td>\n</tr>\n<tr>\n<td>Time-strided Convolution</td>\n<td>使用 5×1² 卷积，时间 stride=<span class=\"kb-math kb-math-inline\">\\alpha</span></td>\n<td><span class=\"kb-math kb-math-inline\">2\\beta C</span></td>\n</tr>\n</tbody>\n</table></div>\n<p>融合方式为在通道维度上拼接（concatenation）到 Slow pathway 的特征上。实验表明 <strong>Time-strided Convolution</strong> 效果最佳（75.6% vs 75.3%/74.9%）。</p>\n<p><strong>4. 网络实例化</strong></p>\n<p><img alt=\"SlowFast 网络实例化架构表\" src=\"https://ar5iv.labs.arxiv.org/html/1812.03982/assets/x2.png\" />\n<em>图：SlowFast 网络的具体实例化架构（基于 ResNet-50），展示了 Slow 和 Fast 两条路径在每个阶段的具体配置。</em></p>\n<p>基于 ResNet-50 的 SlowFast 网络具体配置：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>阶段</th>\n<th>Slow pathway</th>\n<th>Fast pathway</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>输入</td>\n<td><span class=\"kb-math kb-math-inline\">T \\times 224^2</span>，<span class=\"kb-math kb-math-inline\">T=4</span> 或 8</td>\n<td><span class=\"kb-math kb-math-inline\">\\alpha T \\times 224^2</span>，32 或 64 帧</td>\n</tr>\n<tr>\n<td>conv<span class=\"kb-math kb-math-inline\">_1</span></td>\n<td>1×7² stride 1,1,2</td>\n<td>5×7² stride 1,1,2</td>\n</tr>\n<tr>\n<td>res<span class=\"kb-math kb-math-inline\">_2</span></td>\n<td>1×1,1×3,1×1 ×3</td>\n<td>3×1,1×3,3×1 ×3</td>\n</tr>\n<tr>\n<td>res<span class=\"kb-math kb-math-inline\">_3</span></td>\n<td>1×1,1×3,1×1 ×4</td>\n<td>3×1,1×3,3×1 ×4</td>\n</tr>\n<tr>\n<td>res<span class=\"kb-math kb-math-inline\">_4</span></td>\n<td>3×1,1×3,3×1 ×6</td>\n<td>3×1,1×3,3×1 ×6</td>\n</tr>\n<tr>\n<td>res<span class=\"kb-math kb-math-inline\">_5</span></td>\n<td>3×1,1×3,3×1 ×3</td>\n<td>3×1,1×3,3×1 ×3</td>\n</tr>\n<tr>\n<td>通道数</td>\n<td>64→2048</td>\n<td>8→256</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 <strong>注意</strong>：Slow pathway 在 res<span class=\"kb-math kb-math-inline\">_2</span>、res<span class=\"kb-math kb-math-inline\">_3</span> 使用时间 kernel=1（无时间卷积），仅在 res<span class=\"kb-math kb-math-inline\">_4</span>、res<span class=\"kb-math kb-math-inline\">_5</span> 使用时间 kernel=3；而 Fast pathway 在所有阶段都使用时间 kernel=3，体现了其专注于时间建模的设计。</div>\n<h5>训练与推理</h5>\n<p><strong>训练细节</strong>：\n- 从随机初始化训练（不使用 ImageNet 预训练），使用同步 SGD，128 GPU\n- 使用半周期余弦学习率调度，基础学习率 0.1（线性缩放）\n- 输入：随机裁剪 224×224，随机水平翻转\n- Batch Normalization 使用 synchronized BN</p>\n<p><strong>推理策略</strong>：\n- 时间维度：均匀采样 10 个 clip\n- 空间维度：3 个 crop（左、中、右）\n- 最终预测为 30 个 view 的 softmax 平均</p>\n<h5>与传统方法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>双流网络</th>\n<th>I3D/C3D</th>\n<th>SlowFast</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>运动输入</td>\n<td>光流（需预计算）</td>\n<td>RGB（隐式）</td>\n<td>RGB（显式双路径）</td>\n</tr>\n<tr>\n<td>时间分辨率</td>\n<td>固定</td>\n<td>固定</td>\n<td>自适应（双帧率）</td>\n</tr>\n<tr>\n<td>计算分配</td>\n<td>两流等量</td>\n<td>统一</td>\n<td>不对称（Slow重+Fast轻）</td>\n</tr>\n<tr>\n<td>预训练依赖</td>\n<td>ImageNet</td>\n<td>ImageNet</td>\n<td>无需</td>\n</tr>\n<tr>\n<td>K400 top-1</td>\n<td>~73%</td>\n<td>~75%</td>\n<td><strong>79.8%</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p>SlowFast 的核心优势在于：(1) 通过不对称的通道分配实现了高效的计算利用；(2) 无需光流即可显式建模运动；(3) 端到端可训练，无需分阶段预训练。</p>\n<h5>实验亮点</h5>\n<p><img alt=\"SlowFast 在 AVA 数据集上的检测结果\" src=\"https://ar5iv.labs.arxiv.org/html/1812.03982/assets/x3.png\" />\n<em>图：SlowFast 在 AVA 动作检测数据集上的可视化结果，展示了对多人多动作场景的精确检测能力。</em></p>\n<ul>\n<li><strong>Kinetics-400</strong>：SlowFast R101+NL 达到 <strong>79.8% top-1</strong>，比此前最佳（无预训练）高出 <strong>+5.9%</strong></li>\n<li><strong>Kinetics-600</strong>：<strong>81.8% top-1</strong></li>\n<li><strong>Charades</strong>：<strong>42.5% mAP</strong>（+12.6% 绝对提升）</li>\n<li><strong>AVA v2.1</strong>：<strong>28.3% mAP</strong>（+4.7% 绝对提升）</li>\n<li>消融实验验证了 <span class=\"kb-math kb-math-inline\">\\alpha=8, \\beta=1/8</span> 为最优配置，Fast pathway 不使用时间下采样至关重要</li>\n</ul>",
      "quiz": {
        "q": "SlowFast 网络中 Fast pathway 的设计核心是什么？",
        "options": [
          "使用更大的空间分辨率输入以捕捉细节",
          "使用更高帧率但更少通道数，专注于时序运动建模",
          "使用光流作为输入来显式编码运动信息",
          "使用更深的网络层数来提升特征表达能力"
        ],
        "answer": 1,
        "explain": "Fast pathway 的核心设计是以 α 倍更高的帧率采样（α=8），但仅使用 β 倍的通道数（β=1/8），从而以极低的计算开销（~20%）专注于捕捉细粒度的时序运动信息。"
      }
    },
    {
      "id": "timesformer",
      "num": 11,
      "name": "TimeSformer",
      "fullName": "时空Transformer (TimeSformer)",
      "year": "2021",
      "org": "Facebook",
      "parent": "non_local",
      "paperUrl": "https://arxiv.org/abs/2102.05095",
      "projectUrl": "",
      "category": "transformer",
      "motivation": "分层时空自注意力机制",
      "summary": "TimeSformer 将 ViT 扩展到视频理解，系统比较多种时空注意力分解方式，并证明先时间后空间的 Divided Space-Time Attention 能以较低计算量实现强视频时序建模。",
      "keyPoints": [
        "纯 Transformer 视频模型：不使用 3D 卷积，直接对视频 patch token 建模",
        "五种注意力方案：Space-only、Joint Space-Time、Divided、Sparse Local-Global、Axial",
        "Divided Space-Time 最优：先同一空间位置跨帧注意力，再同一帧内空间注意力",
        "降低复杂度：将全局时空注意力的 <span class=\"kb-math kb-math-inline\">O((NF)^2)</span> 分解为 <span class=\"kb-math kb-math-inline\">O(NF^2 + FN^2)</span>",
        "支持长视频：相比 3D CNN 更容易处理更多帧和长程依赖",
        "依赖图像预训练：通常从 ImageNet 预训练 ViT 初始化，再迁移到视频任务"
      ],
      "detail": "<p><img alt=\"TimeSformer 时空注意力方案\" src=\"https://ar5iv.labs.arxiv.org/html/2102.05095/assets/x1.png\" />\n<em>图：TimeSformer 比较的五类时空注意力，其中 Divided Space-Time 在效率和精度上表现最好。</em></p>\n<h5>1. 动机与背景</h5>\n<p>在 TimeSformer 之前，视频理解主流是 3D CNN 或 2D CNN + temporal module。卷积有强局部归纳偏置，但长程关系需要堆叠很多层才能覆盖；当视频帧数增加时，3D 卷积的计算和训练成本也迅速上升。</p>\n<p>ViT 已经证明图像可以被表示为 patch token 序列并交给 Transformer 处理。TimeSformer 的关键问题是：视频有时间和空间两个维度，如果直接把所有帧的所有 patch 拼成一个长序列做全局 attention，计算和显存会过高；如果只做空间 attention，又会丢失时序信息。</p>\n<h5>2. 输入表示</h5>\n<p>给定 <span class=\"kb-math kb-math-inline\">F</span> 帧视频，每帧大小为 <span class=\"kb-math kb-math-inline\">H \\times W</span>，用 patch size <span class=\"kb-math kb-math-inline\">P</span> 划分后每帧有 <span class=\"kb-math kb-math-inline\">N=HW/P^2</span> 个 patch。每个 patch 经线性投影得到 token，并加入时空位置编码：</p>\n<div class=\"kb-math kb-math-display\">z^{(0)}_{p,t} = E x_{p,t} + e^{pos}_{p,t}</div>\n<p>模型还加入分类 token。经过多层 Transformer block 后，分类 token 用于动作分类。这个表示与 ViT 非常接近，差异在于 token 多了时间索引 <span class=\"kb-math kb-math-inline\">t</span>。</p>\n<h5>3. Divided Space-Time Attention</h5>\n<p>TimeSformer 的核心 block 将注意力拆成两步。第一步是时间注意力：对每个空间位置 <span class=\"kb-math kb-math-inline\">p</span>，只在不同帧的同一位置之间交互：</p>\n<div class=\"kb-math kb-math-display\">a^{time}_{p,t} = \\sum_{t&#x27;=1}^{F}\n\\text{Softmax}\\left(\\frac{q_{p,t}k_{p,t&#x27;}^\\top}{\\sqrt{d}}\\right)v_{p,t&#x27;}</div>\n<p>第二步是空间注意力：对每一帧 <span class=\"kb-math kb-math-inline\">t</span>，在该帧所有空间 patch 之间交互：</p>\n<div class=\"kb-math kb-math-display\">a^{space}_{p,t} = \\sum_{p&#x27;=1}^{N}\n\\text{Softmax}\\left(\\frac{q_{p,t}k_{p&#x27;,t}^\\top}{\\sqrt{d}}\\right)v_{p&#x27;,t}</div>\n<pre><code class=\"language-python\"># TimeSformer Divided Space-Time Attention 伪代码\ndef timesformer_block(x):\n    # x: [B, F, N, D]\n    for p in range(N):\n        x[:, :, p] = x[:, :, p] + temporal_attention(norm(x[:, :, p]))\n\n    for t in range(F):\n        x[:, t, :] = x[:, t, :] + spatial_attention(norm(x[:, t, :]))\n\n    x = x + mlp(norm(x))\n    return x\n</code></pre>\n<p>这种分解让每个 token 不必一次性关注 <span class=\"kb-math kb-math-inline\">NF</span> 个 token，而是先关注 <span class=\"kb-math kb-math-inline\">F</span> 个时间邻居，再关注 <span class=\"kb-math kb-math-inline\">N</span> 个空间邻居。它保留了跨帧建模和帧内空间理解，同时避免全局 joint attention 的二次爆炸。</p>\n<h5>4. 为什么先时间后空间有效</h5>\n<p>视频动作往往表现为同一局部区域随时间变化，例如手的位置、物体移动、姿态变化。先做时间注意力，相当于为每个空间位置提取运动线索；随后空间注意力再把这些局部时序线索组合成整帧语义。</p>\n<p>TimeSformer 还显示，数据集对时间建模的需求不同：Kinetics 中很多类别可由场景和对象识别完成，Space-only 已有不错结果；Something-Something V2 更依赖动作方向和物体交互，Divided 注意力的优势更明显。</p>\n<h5>5. 与传统方法的区别</h5>\n<p>与 3D CNN 相比，TimeSformer 没有固定卷积核大小限制，每层 attention 可以建立更长距离依赖；与全局时空 Transformer 相比，它通过结构化分解降低计算；与后续 Video Swin 相比，它仍偏全局空间注意力，而 Video Swin 引入局部窗口和层级结构进一步提升效率。</p>\n<div class=\"key-point\">💡 关键：TimeSformer 的贡献不只是“把 ViT 用到视频”，而是系统证明时空注意力的分解方式决定了视频 Transformer 的可训练性和效率。</div>",
      "quiz": {
        "q": "TimeSformer 中 Divided Space-Time Attention 的核心设计是什么？",
        "options": [
          "只做空间注意力，完全忽略时间维度",
          "先在同一空间位置跨帧做时间注意力，再在同一帧内做空间注意力",
          "把视频先压缩成单张图片再分类",
          "用 NMS 删除重复视频片段"
        ],
        "answer": 1,
        "explain": "Divided 方案把时空注意力拆成时间和空间两步，在保留时序建模的同时降低全局 joint attention 的计算量。"
      }
    },
    {
      "id": "vivit",
      "num": 12,
      "name": "ViViT",
      "fullName": "视频视觉Transformer (Video Vision Transformer)",
      "year": "2021",
      "org": "Google",
      "parent": "timesformer",
      "paperUrl": "https://arxiv.org/abs/2103.15691",
      "projectUrl": "",
      "category": "transformer",
      "motivation": "多种时空因子化方案",
      "summary": "ViViT 提出了四种基于纯 Transformer 的视频分类模型变体，通过不同粒度的时空注意力因子化策略，在大幅降低计算复杂度的同时实现了五个主流视频基准上的 SOTA 性能。",
      "keyPoints": [
        "提出 4 种时空注意力模型变体：联合时空注意力(Model 1)、因子化编码器(Model 2)、因子化自注意力(Model 3)、因子化点积注意力(Model 4)",
        "两种视频 token 化方法：均匀帧采样(Uniform frame sampling) 和 管状嵌入(Tubelet embedding, 3D卷积)",
        "管状嵌入的\"中心帧初始化\"策略优于传统的滤波器膨胀(filter inflation)方法",
        "从预训练 ViT 有效初始化视频模型：位置嵌入时间维重复 + 管状嵌入中心帧初始化",
        "针对小数据集的正则化策略组合：随机深度 + RandAugment + 标签平滑 + Mixup（+5.3% on Epic Kitchens）",
        "在 Kinetics 400/600、Epic Kitchens 100、Something-Something v2、Moments in Time 五个基准上达到 SOTA"
      ],
      "detail": "<p><img alt=\"ViViT 模型架构总览\" src=\"https://ar5iv.labs.arxiv.org/html/2103.15691v1/assets/x1.png\" />\n<em>图：ViViT 的四种模型变体示意图。从左到右分别为：联合时空注意力、因子化编码器、因子化自注意力、因子化点积注意力。</em></p>\n<pre><code class=\"language-python\"># ViViT 因子化编码器 (Model 2) 伪代码\ndef vivit_factorised_encoder(video, spatial_transformer, temporal_transformer):\n    # Step 1: Tokenization - 提取 tubelet embeddings\n    # video: [B, T, H, W, C] -&gt; tubelets via 3D conv\n    tokens = tubelet_embedding(video)  # [B, n_t, n_h*n_w, d]\n\n    # Step 2: 空间编码器 - 独立处理每帧的空间token\n    spatial_outputs = []\n    for t in range(n_t):\n        frame_tokens = tokens[:, t]  # [B, n_h*n_w, d]\n        frame_tokens = prepend_cls(frame_tokens)\n        encoded = spatial_transformer(frame_tokens)  # L_s layers\n        spatial_outputs.append(encoded[:, 0])  # CLS token as frame repr\n\n    # Step 3: 时间编码器 - 聚合帧级表示\n    temporal_tokens = stack(spatial_outputs)  # [B, n_t, d]\n    temporal_tokens = prepend_cls(temporal_tokens)\n    output = temporal_transformer(temporal_tokens)  # L_t layers\n\n    # Step 4: 分类\n    return classify(output[:, 0])  # final CLS token\n</code></pre>\n<p><strong>动机与背景</strong></p>\n<p>视频理解长期依赖 3D 卷积网络（如 I3D、SlowFast），但卷积的感受野有限且随深度线性增长，难以高效建模长程时空依赖。Vision Transformer (ViT) 在图像分类上展现了纯注意力架构的潜力，但直接将 ViT 扩展到视频面临严峻的计算挑战：对于 <span class=\"kb-math kb-math-inline\">n_t</span> 帧、每帧 <span class=\"kb-math kb-math-inline\">n_h \\times n_w</span> 个 patch 的视频，联合注意力的复杂度为 <span class=\"kb-math kb-math-inline\">O((n_t \\cdot n_h \\cdot n_w)^2)</span>，这在实际视频长度下是不可接受的。</p>\n<p><strong>核心机制：四种时空因子化策略</strong></p>\n<p><strong>Model 1 — 联合时空注意力（Spatio-temporal attention）</strong></p>\n<p>最直接的方案：将视频所有时空 token 拼接后送入标准 Transformer 编码器。每个 token 可以关注所有其他时空位置，建模能力最强但计算量最大：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{y} = \\text{MSA}(\\text{LN}(\\mathbf{z})) + \\mathbf{z}, \\quad \\text{复杂度} = O((n_t \\cdot n_h \\cdot n_w)^2)</div>\n<p><strong>Model 2 — 因子化编码器（Factorised encoder）</strong></p>\n<p>将编码过程分为两个串联阶段：首先用空间 Transformer 独立编码每帧的空间 token，提取帧级 CLS 表示；然后用时间 Transformer 聚合所有帧的表示进行时序建模。</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{h}_s^i = \\text{SpatialTransformer}(\\mathbf{z}^i), \\quad i = 1, \\ldots, n_t</div>\n<div class=\"kb-math kb-math-display\">\\mathbf{y} = \\text{TemporalTransformer}([\\mathbf{h}_s^1, \\ldots, \\mathbf{h}_s^{n_t}])</div>\n<div class=\"key-point\">💡 关键：Model 2 将复杂度从 <span class=\"kb-math kb-math-inline\">O((n_t \\cdot n_s)^2)</span> 降至 <span class=\"kb-math kb-math-inline\">O(n_t \\cdot n_s^2 + n_t^2)</span>，其中 <span class=\"kb-math kb-math-inline\">n_s = n_h \\cdot n_w</span>。实验显示仅需 <span class=\"kb-math kb-math-inline\">L_t = 4</span> 层时间 Transformer 即可达到饱和性能，推理速度比 Model 1 快 3.4 倍。</div>\n<p><strong>Model 3 — 因子化自注意力（Factorised self-attention）</strong></p>\n<p>在同一个 Transformer 编码器的每一层内，将多头自注意力分为两步：先计算空间注意力（同一时间步内的 token 互相关注），再计算时间注意力（同一空间位置跨时间步互相关注）：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{a}_s = \\text{MSA}_{\\text{spatial}}(\\text{LN}(\\mathbf{z})), \\quad \\mathbf{y} = \\text{MSA}_{\\text{temporal}}(\\text{LN}(\\mathbf{a}_s))</div>\n<p><strong>Model 4 — 因子化点积注意力（Factorised dot-product attention）</strong></p>\n<p>最细粒度的因子化：在注意力头级别操作。将每层的注意力头分为两组，一半计算空间注意力，另一半计算时间注意力，最后拼接输出：</p>\n<div class=\"kb-math kb-math-display\">\\text{Attention}_{\\text{spatial}}(\\mathbf{Q}_s, \\mathbf{K}_s, \\mathbf{V}_s), \\quad \\text{Attention}_{\\text{temporal}}(\\mathbf{Q}_t, \\mathbf{K}_t, \\mathbf{V}_t)</div>\n<div class=\"kb-math kb-math-display\">\\mathbf{y} = \\text{Concat}(\\text{head}_s^1, \\ldots, \\text{head}_s^{N_h/2}, \\text{head}_t^1, \\ldots, \\text{head}_t^{N_h/2}) \\mathbf{W}_O</div>\n<p><strong>Tokenization 与初始化</strong></p>\n<p>两种 token 化方法：\n1. <strong>均匀帧采样</strong>：从视频中均匀采样 <span class=\"kb-math kb-math-inline\">n_t</span> 帧，每帧独立用 2D 卷积（ViT 的 patch embedding）提取 token\n2. <strong>管状嵌入（Tubelet embedding）</strong>：用 3D 卷积核 <span class=\"kb-math kb-math-inline\">\\mathbb{R}^{t \\times h \\times w}</span> 直接从视频体中提取时空 token，可在 tokenization 阶段即融合时间信息</p>\n<p>从 ViT 预训练权重初始化 3D 管状嵌入的三种策略：\n- <strong>滤波器膨胀</strong>：将 2D 卷积核沿时间维复制并除以 <span class=\"kb-math kb-math-inline\">t</span>（77.6%）\n- <strong>中心帧初始化</strong>：仅在中心时间位置放置 2D 权重，其余置零（<strong>79.2%，最优</strong>）\n- <strong>随机初始化</strong>：仅随机初始化 3D 卷积（73.2%，最差）</p>\n<div class=\"warn-box\">⚠️ 注意：中心帧初始化优于滤波器膨胀 1.6%，这是因为它在训练初期保持了与 ViT 完全一致的行为（仅看中心帧），然后逐步学习时间信息。</div>\n<p><strong>效率与精度权衡</strong></p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>模型</th>\n<th>K400 Top-1</th>\n<th>FLOPs (×10⁹)</th>\n<th>参数量 (M)</th>\n<th>推理时间 (ms)</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Model 1: 联合时空</td>\n<td>80.0</td>\n<td>455.2</td>\n<td>88.9</td>\n<td>58.9</td>\n</tr>\n<tr>\n<td>Model 2: 因子化编码器</td>\n<td>78.8</td>\n<td>284.4</td>\n<td>115.1</td>\n<td>17.4</td>\n</tr>\n<tr>\n<td>Model 3: 因子化自注意力</td>\n<td>77.4</td>\n<td>372.3</td>\n<td>117.3</td>\n<td>31.7</td>\n</tr>\n<tr>\n<td>Model 4: 因子化点积</td>\n<td>76.3</td>\n<td>277.1</td>\n<td>88.9</td>\n<td>22.9</td>\n</tr>\n</tbody>\n</table></div>\n<p>Model 2 在精度仅损失 1.2% 的情况下，推理速度提升 3.4 倍，是最佳的精度-效率折中方案。</p>\n<p><strong>SOTA 结果</strong></p>\n<p>使用 ViViT-H/14x2 (JFT 预训练) 配合 Factorised Encoder，在 Kinetics 400 达到 <strong>84.9%</strong> Top-1，Kinetics 600 达到 <strong>85.8%</strong> Top-1，大幅超越此前基于 3D CNN 的方法（SlowFast: 79.8%）和同期 TimeSformer（82.2%）。</p>\n<p><strong>与传统方法的区别</strong></p>\n<p>与 3D CNN（I3D、SlowFast）相比：ViViT 通过全局自注意力在每一层即可建模任意距离的时空依赖，无需堆叠多层来扩大感受野。与同期 TimeSformer 相比：ViViT 提出了更多样化的因子化方案（尤其是 Model 2 的双编码器设计），并通过系统的正则化策略在小数据集上取得更好效果（SSv2 上超出 TimeSformer 2.9%）。</p>",
      "quiz": {
        "q": "ViViT 的因子化编码器(Model 2)相比联合时空注意力(Model 1)的主要优势是什么？",
        "options": [
          "精度更高，因为分开建模空间和时间更有效",
          "推理速度提升约3.4倍，精度仅损失约1.2%",
          "参数量更少，因此更容易训练",
          "不需要预训练模型即可达到SOTA"
        ],
        "answer": 1,
        "explain": "Model 2 将时空注意力分解为串联的空间编码器和时间编码器，复杂度从 O((n_t·n_s)²) 降至 O(n_t·n_s² + n_t²)，推理时间从58.9ms降至17.4ms（快3.4倍），而K400精度仅从80.0%降至78.8%。"
      }
    },
    {
      "id": "clip4clip",
      "num": 13,
      "name": "CLIP4Clip",
      "fullName": "CLIP视频检索 (CLIP for Video Retrieval)",
      "year": "2021",
      "org": "Alibaba",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2104.08860",
      "projectUrl": "",
      "category": "foundation_model",
      "motivation": "CLIP迁移至视频文本检索",
      "summary": "CLIP4Clip将图像-文本预训练模型CLIP迁移到视频-文本检索任务，通过三种时序建模策略（均值池化/序列编码/跨模态交互）进行端到端微调，在五个基准数据集上取得SOTA性能。\n\n---",
      "keyPoints": [
        "核心动机：CLIP迁移至视频文本检索",
        "代表机构：Alibaba"
      ],
      "detail": "<h5>1. 整体架构</h5>\n<pre><code>┌─────────────────────────────────────────────────────────┐\n│                    CLIP4Clip Framework                    │\n├─────────────────────────────────────────────────────────┤\n│                                                          │\n│  Video: v_i ──→ [Frame Sampling] ──→ {f_1,...,f_N}      │\n│                        │                                 │\n│                        ▼                                 │\n│              ┌──────────────────┐                        │\n│              │  Video Encoder   │ (CLIP ViT-B/32)        │\n│              │  2D/3D Linear +  │                        │\n│              │  Transformer×12  │                        │\n│              └────────┬─────────┘                        │\n│                       │                                  │\n│                       ▼                                  │\n│              Z_i = {z_1,...,z_N}  (frame embeddings)     │\n│                       │                                  │\n│                       ▼                                  │\n│         ┌─────────────────────────────┐                  │\n│         │   Similarity Calculator     │                  │\n│         │  ┌─────┐ ┌─────┐ ┌─────┐   │                  │\n│         │  │meanP│ │ seq │ │tight│   │                  │\n│         │  └─────┘ └─────┘ └─────┘   │                  │\n│         └─────────────┬───────────────┘                  │\n│                       │                                  │\n│  Text: t_j ──→ ┌─────────────────┐                      │\n│                │  Text Encoder   │ (CLIP Text Transf.)   │\n│                │  Transformer×12 │                       │\n│                └────────┬────────┘                       │\n│                         │                                │\n│                         ▼                                │\n│                    w_j (text embedding)                   │\n│                         │                                │\n│                         ▼                                │\n│                   s(v_i, t_j) → Similarity Score         │\n└─────────────────────────────────────────────────────────┘\n</code></pre>\n<h5>2. 视频编码器</h5>\n<p>视频编码器复用CLIP的ViT-B/32图像编码器，核心修改在于patch embedding层：</p>\n<ul>\n<li><strong>2D Linear（默认）</strong>：直接对每帧独立做2D patch embedding（32×32 patch → 768维），与原始CLIP一致</li>\n<li><strong>3D Linear</strong>：将patch embedding扩展为3D卷积（时间维度kernel=3, stride=1, padding=1），捕获相邻帧的时序信息</li>\n</ul>\n<p>3D Linear初始化策略（来自ViViT）：\n<div class=\"kb-math kb-math-display\">E_{3D} = [0, E_{2D}, 0]</div>\n即将CLIP预训练的2D权重放在中心帧位置，两侧补零。</p>\n<h5>3. 三种相似度计算器</h5>\n<p><strong>核心设计哲学</strong>：由于CLIP已在大规模数据上预训练，新引入的参数越多，越难训练且可能破坏预训练表示。</p>\n<p><strong>(a) Parameter-free Type（均值池化）</strong></p>\n<div class=\"kb-math kb-math-display\">\\hat{z}_i = \\text{mean-pooling}(z_1_i, z_2_i, \\ldots, z_N_i)</div>\n<div class=\"kb-math kb-math-display\">s(v_i, t_j) = \\frac{w_j^\\top \\hat{z}_i}{\\|w_j\\| \\|\\hat{z}_i\\|}</div>\n<ul>\n<li>无新参数，直接在CLIP的多模态嵌入空间中计算余弦相似度</li>\n<li>假设：CLIP已将帧和文本映射到同一空间，简单平均即可表示视频</li>\n</ul>\n<p><strong>(b) Sequential Type（序列编码）</strong></p>\n<div class=\"kb-math kb-math-display\">\\tilde{Z}_i = \\text{LSTM}(Z_i) \\quad \\text{或} \\quad \\tilde{Z}_i = \\text{Transformer-Enc}(Z_i + P)</div>\n<div class=\"kb-math kb-math-display\">\\hat{z}_i = \\text{mean-pooling}(\\tilde{Z}_i)</div>\n<div class=\"kb-math kb-math-display\">s(v_i, t_j) = \\frac{w_j^\\top \\hat{z}_i}{\\|w_j\\| \\|\\hat{z}_i\\|}</div>\n<ul>\n<li>引入少量新参数建模帧间时序关系</li>\n<li>Transformer初始化：复用CLIP图像编码器对应层的权重</li>\n<li>位置编码：重复CLIP文本编码器的位置编码</li>\n</ul>\n<p><strong>(c) Tight Type（跨模态交互）</strong></p>\n<div class=\"kb-math kb-math-display\">U_i = [w_j, z_1_i, z_2_i, \\ldots, z_N_i]</div>\n<div class=\"kb-math kb-math-display\">\\tilde{U}_i = \\text{Transformer-Enc}(U_i + P + T)</div>\n<div class=\"kb-math kb-math-display\">s(v_i, t_j) = \\text{FC}(\\text{ReLU}(\\text{FC}(\\tilde{U}_i[0,:])))</div>\n<ul>\n<li>引入最多新参数：Transformer + 类型嵌入 + 线性投影</li>\n<li>类型嵌入T区分文本token和视频帧token（类似BERT的segment embedding）</li>\n<li>取第一个token（[CLS]对应位置）的输出做相似度预测</li>\n</ul>\n<h5>4. 训练策略</h5>\n<p><strong>损失函数</strong>：对称的对比学习损失（InfoNCE）</p>\n<p>对于batch中B对(video, text)：\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{v2t} = -\\frac{1}{B}\\sum_{i=1}^{B}\\log\\frac{\\exp(s(v_i,t_i)/\\tau)}{\\sum_{k=1}^{B}\\exp(s(v_i,t_k)/\\tau)}</div></p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{t2v} = -\\frac{1}{B}\\sum_{j=1}^{B}\\log\\frac{\\exp(s(v_j,t_j)/\\tau)}{\\sum_{k=1}^{B}\\exp(s(v_k,t_j)/\\tau)}</div>\n<div class=\"kb-math kb-math-display\">\\mathcal{L} = \\mathcal{L}_{v2t} + \\mathcal{L}_{t2v}</div>\n<p>其中τ为可学习温度参数（初始化自CLIP）。</p>\n<p><strong>后预训练（Post-pretraining）</strong>：在HowTo100M（136M视频-文本对）上继续训练CLIP，弥合图像-文本与视频-文本的域差距。</p>\n<h5>5. 关键超参数与消融实验发现</h5>\n<pre><code>┌────────────────────┬────────────────────────────────────┐\n│ 超参数              │ 设置                                │\n├────────────────────┼────────────────────────────────────┤\n│ 预训练模型          │ CLIP ViT-B/32                      │\n│ 学习率(编码器)      │ 1e-7                               │\n│ 学习率(新模块)      │ 1e-4                               │\n│ 优化器              │ Adam + Cosine Schedule             │\n│ Batch Size         │ 128                                │\n│ 帧数               │ 12                                 │\n│ 文本长度            │ 32 tokens                          │\n│ 训练轮数            │ 5 epochs                           │\n│ Seq/Tight层数      │ 4层 Transformer                    │\n│ LSTM层数            │ 1层                                │\n│ 冻结策略            │ 冻结前6层                           │\n│ 硬件               │ 4× NVIDIA V100 32GB                │\n└────────────────────┴────────────────────────────────────┘\n</code></pre>\n<p><strong>关键发现</strong>：\n1. <strong>学习率极其敏感</strong>：1e-7最优，偏大（&gt;1e-6）会严重损害性能\n2. <strong>冻结底层有效</strong>：冻结前6层效果最好，全部微调反而下降\n3. <strong>帧数影响</strong>：12帧通常最优，更多帧在短视频数据集上收益递减\n4. <strong>Batch Size</strong>：越大越好（对比学习特性），128为实际最优\n5. <strong>Tight type在长视频上失效</strong>：ActivityNet/DiDeMo上远差于meanP/seq</p>\n<h5>6. 主要实验结果</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>数据集</th>\n<th>方法</th>\n<th>R@1</th>\n<th>R@5</th>\n<th>R@10</th>\n<th>MdR</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>MSR-VTT (9K)</td>\n<td>seqTransf</td>\n<td><strong>44.5</strong></td>\n<td>71.4</td>\n<td>81.6</td>\n<td>2</td>\n</tr>\n<tr>\n<td>MSR-VTT (7K)</td>\n<td>meanP</td>\n<td><strong>42.1</strong></td>\n<td>71.9</td>\n<td>81.4</td>\n<td>2</td>\n</tr>\n<tr>\n<td>MSVD</td>\n<td>meanP</td>\n<td><strong>46.2</strong></td>\n<td>76.1</td>\n<td>84.6</td>\n<td>2</td>\n</tr>\n<tr>\n<td>LSMDC</td>\n<td>seqTransf</td>\n<td><strong>22.6</strong></td>\n<td>41.0</td>\n<td>49.1</td>\n<td>11</td>\n</tr>\n<tr>\n<td>ActivityNet</td>\n<td>meanP/seqTransf</td>\n<td><strong>40.5</strong></td>\n<td>72.4</td>\n<td>98.1/98.2</td>\n<td>2</td>\n</tr>\n<tr>\n<td>DiDeMo</td>\n<td>meanP</td>\n<td><strong>43.4</strong></td>\n<td>70.2</td>\n<td>80.6</td>\n<td>2</td>\n</tr>\n</tbody>\n</table></div>\n<p>对比此前SOTA提升：MSR-VTT 9K上R@1从38.9(MDMMT)→44.5(+14.4%)</p>\n<h5>7. 伪代码</h5>\n<pre><code class=\"language-python\"># CLIP4Clip Forward Pass (simplified)\ndef clip4clip_forward(video_frames, text, sim_type='meanP'):\n    # 1. Encode video frames independently\n    frame_features = []\n    for frame in video_frames:  # N frames\n        patch_embed = linear_projection(frame)  # 2D or 3D\n        z = clip_visual_transformer(patch_embed)  # [CLS] token\n        frame_features.append(z)\n    Z = stack(frame_features)  # (N, d)\n\n    # 2. Encode text\n    w = clip_text_transformer(text)  # (d,)\n\n    # 3. Similarity calculation\n    if sim_type == 'meanP':\n        z_hat = mean(Z, dim=0)  # (d,)\n        sim = cosine_similarity(w, z_hat)\n    elif sim_type == 'seqTransf':\n        Z_tilde = temporal_transformer(Z + pos_embed)  # (N, d)\n        z_hat = mean(Z_tilde, dim=0)  # (d,)\n        sim = cosine_similarity(w, z_hat)\n    elif sim_type == 'tightTransf':\n        U = concat([w.unsqueeze(0), Z], dim=0)  # (N+1, d)\n        U_tilde = cross_transformer(U + pos_embed + type_embed)\n        sim = fc2(relu(fc1(U_tilde[0])))  # scalar\n\n    return sim\n\n# Training: symmetric contrastive loss\ndef clip4clip_loss(videos, texts, temperature):\n    sims = compute_similarity_matrix(videos, texts)  # (B, B)\n    loss_v2t = cross_entropy(sims / temperature, labels=arange(B))\n    loss_t2v = cross_entropy(sims.T / temperature, labels=arange(B))\n    return (loss_v2t + loss_t2v) / 2\n</code></pre>\n<hr />",
      "quiz": {
        "q": "",
        "options": [],
        "answer": 0,
        "explain": ""
      }
    },
    {
      "id": "video_swin",
      "num": 14,
      "name": "Video Swin",
      "fullName": "视频Swin Transformer (Video Swin Transformer)",
      "year": "2022",
      "org": "MSRA",
      "parent": "vivit",
      "paperUrl": "https://arxiv.org/abs/2106.13230",
      "projectUrl": "",
      "category": "transformer",
      "motivation": "3D偏移窗口注意力",
      "summary": "Video Swin Transformer 将 Swin 的层级窗口注意力扩展到视频，用 3D window / shifted window 在局部时空块内高效建模，并通过跨窗口移位逐层扩大感受野。",
      "keyPoints": [
        "3D Window MSA：在 <span class=\"kb-math kb-math-inline\">P \\times M \\times M</span> 时空窗口内计算注意力，复杂度近似线性于 token 数",
        "3D Shifted Window：相邻层窗口沿时间、高度、宽度移位，建立跨窗口信息流",
        "层级结构：继承 Swin 的 patch merging，逐 stage 降低空间分辨率并增加通道",
        "3D 相对位置偏置：把 2D Swin 的相对位置偏置扩展到时间维度",
        "复用图像预训练：可从 ImageNet 预训练 Swin 初始化，降低视频训练成本",
        "多任务适用：在动作分类、时序相关数据集和视频检测/分割下作为通用 backbone"
      ],
      "detail": "<p><img alt=\"Video Swin 总体结构\" src=\"https://ar5iv.labs.arxiv.org/html/2106.13230/assets/x1.png\" />\n<em>图：Video Swin 使用 3D patch partition、四阶段层级 backbone 和交替窗口注意力。</em></p>\n<h5>1. 动机与背景</h5>\n<p>TimeSformer、ViViT 等早期视频 Transformer 证明了 attention 适合视频，但全局或分解 attention 在高分辨率、多帧输入下仍然昂贵。视频还有强局部性：相邻帧、相邻空间区域通常相关，没必要在每一层都让所有 token 全局交互。</p>\n<p>Swin Transformer 在图像中用局部窗口注意力和 shifted window 取得了很好的效率-精度平衡。Video Swin 的工作就是把这种归纳偏置扩展到视频：窗口不再是 2D 的 <span class=\"kb-math kb-math-inline\">M \\times M</span>，而是 3D 的 <span class=\"kb-math kb-math-inline\">P \\times M \\times M</span>。</p>\n<h5>2. 3D 窗口注意力</h5>\n<p>给定视频 token 特征 <span class=\"kb-math kb-math-inline\">x \\in \\mathbb{R}^{T \\times H \\times W \\times C}</span>，模型将其划分为多个不重叠 3D 窗口。每个窗口内部执行多头自注意力：</p>\n<div class=\"kb-math kb-math-display\">\\text{Attention}(Q,K,V)=\\text{Softmax}\\left(\\frac{QK^\\top}{\\sqrt{d}} + B\\right)V</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">B</span> 是 3D 相对位置偏置，覆盖时间和空间相对偏移。若窗口大小为 <span class=\"kb-math kb-math-inline\">P \\times M \\times M</span>，全局 3D attention 的二次项从 <span class=\"kb-math kb-math-inline\">(THW)^2</span> 变为每个 token 只与 <span class=\"kb-math kb-math-inline\">PM^2</span> 个局部 token 交互：</p>\n<div class=\"kb-math kb-math-display\">\\Omega(\\text{3D-W-MSA}) = 4THWC^2 + 2PM^2 \\cdot THW \\cdot C</div>\n<h5>3. 3D Shifted Window</h5>\n<p><img alt=\"3D shifted window 机制\" src=\"https://ar5iv.labs.arxiv.org/html/2106.13230/assets/figs/3d-shift-window.png\" />\n<em>图：连续 block 交替使用常规 3D 窗口和移位 3D 窗口，实现跨窗口通信。</em></p>\n<p>单纯窗口注意力会让不同窗口之间没有直接通信。Video Swin 在相邻 block 中把窗口沿时间、高度、宽度移动 <span class=\"kb-math kb-math-inline\">(P/2, M/2, M/2)</span>，使前一层分属不同窗口的 token 在后一层进入同一个窗口。</p>\n<pre><code class=\"language-python\"># Video Swin block 伪代码\ndef video_swin_stage(tokens):\n    for i, block in enumerate(blocks):\n        if i % 2 == 0:\n            windows = partition_3d(tokens, size=(P, M, M))\n            out = window_attention(windows, rel_pos_bias_3d)\n            tokens = merge_3d(out)\n        else:\n            shifted = cyclic_shift(tokens, shift=(P//2, M//2, M//2))\n            windows = partition_3d(shifted, size=(P, M, M))\n            out = window_attention(windows, rel_pos_bias_3d, attn_mask)\n            tokens = reverse_shift(merge_3d(out))\n        tokens = tokens + mlp(norm(tokens))\n    return tokens\n</code></pre>\n<p>循环移位会在边界产生跨越原图边界的窗口片段，因此实现中需要 attention mask，确保不该互相看到的 token 不被错误连接。这与 2D Swin 的高效批处理策略一致。</p>\n<h5>4. 层级视频 backbone</h5>\n<p>Video Swin 先用 3D patch partition 把输入划成 tubelet，再经过四个 stage。除最后 stage 外，每个 stage 后通过 patch merging 进行空间下采样，通道数提升。时间维度通常保持较高分辨率，以保留动作信息。</p>\n<p>3D 相对位置偏置可由图像 Swin 的 2D 偏置初始化：时间相对位移为 0 的切片复制 2D 偏置，其他时间位置初始化或插值学习。这样模型一开始接近逐帧图像 Swin，再通过视频微调学习时序交互。</p>\n<h5>5. 与 TimeSformer / ViViT 的区别</h5>\n<p>TimeSformer 通过分解时间和空间注意力降复杂度，但空间 attention 仍偏全局；ViViT 使用多种时空 factorization，但常需要较高预训练成本。Video Swin 通过局部 3D 窗口把计算限制在相邻时空块内，再靠 shifted window 逐层传播信息，更像一个层级视觉 backbone。</p>\n<div class=\"key-point\">💡 关键：Video Swin 的效率来自“局部窗口”，表达力来自“移位窗口 + 层级堆叠”；它不是忽略全局，而是逐层构造更大感受野。</div>",
      "quiz": {
        "q": "Video Swin 中 3D Shifted Window 的主要作用是什么？",
        "options": [
          "在相邻窗口之间建立信息交互，扩大时空感受野",
          "删除时间维度，只做图像分类",
          "把所有窗口合并成全局注意力以增加计算量",
          "替代相对位置偏置"
        ],
        "answer": 0,
        "explain": "常规窗口注意力只在窗口内通信，shifted window 让不同窗口的 token 在下一层进入同一窗口，从而实现跨窗口信息流。"
      }
    },
    {
      "id": "videomae",
      "num": 15,
      "name": "VideoMAE",
      "fullName": "视频掩码自编码器 (VideoMAE)",
      "year": "2022",
      "org": "Nanjing University",
      "parent": "video_swin",
      "paperUrl": "https://arxiv.org/abs/2203.12602",
      "projectUrl": "",
      "category": "foundation_model",
      "motivation": "90%高掩码率自监督预训练",
      "summary": "VideoMAE 提出了针对视频数据的掩码自编码预训练方法，通过管状掩码（tube masking）策略和极高掩码比率（90-95%）克服视频时间冗余导致的信息泄漏问题，在多个视频理解基准上以极少数据实现了优异性能。",
      "keyPoints": [
        "提出 Tube Masking 策略：对所有帧施加相同的空间掩码模式，防止时间维度的信息泄漏",
        "采用极高掩码比率（90-95%），远超图像 MAE 的 75%，利用视频的时间冗余特性",
        "使用 Cube Embedding 将视频 token 化：每个 token 为 <span class=\"kb-math kb-math-inline\">2 \\times 16 \\times 16</span> 的时空立方体",
        "非对称 Encoder-Decoder 架构：Encoder 仅处理可见 token（10%），Decoder 轻量（4层，宽度为 Encoder 一半）",
        "骨干网络为 vanilla ViT + Joint Space-Time Attention，无需归纳偏置",
        "在像素空间使用 MSE 损失进行重建",
        "数据高效：仅用 3.5k 视频（SSv2）即可达到有竞争力的性能",
        "主要结果：Kinetics-400 87.4%、Something-Something V2 75.4%、UCF101 91.3%"
      ],
      "detail": "<p><img alt=\"VideoMAE 框架总览图\" src=\"https://ar5iv.labs.arxiv.org/html/2203.12602/assets/x1.png\" />\n<em>图：VideoMAE 整体框架。视频经 Cube Embedding 后施加 Tube Masking，仅可见 token 送入 Encoder，Decoder 在完整 token 序列上重建被掩码的像素。</em></p>\n<p><img alt=\"Masking 策略对比\" src=\"https://ar5iv.labs.arxiv.org/html/2203.12602/assets/x2.png\" />\n<em>图：不同掩码策略对比。(a) Frame Random：每帧独立随机掩码；(b) Tube Masking：所有帧共享同一掩码模式，有效防止时间信息泄漏。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># VideoMAE 预训练伪代码\ndef videomae_pretrain(video, mask_ratio=0.9):\n    # 1. Cube Embedding: 将视频分割为时空 token\n    # video: [T, H, W, 3] → tokens: [T/2 × H/16 × W/16, D]\n    tokens = cube_embed(video, patch_size=(2, 16, 16))\n\n    # 2. Tube Masking: 生成空间掩码并跨时间复制\n    spatial_mask = random_mask(H//16 * W//16, mask_ratio)  # 空间维度\n    tube_mask = repeat(spatial_mask, T//2)  # 时间维度复制\n\n    # 3. Encoder: 仅处理可见 token (约10%)\n    visible_tokens = tokens[~tube_mask]\n    visible_tokens += positional_embedding[~tube_mask]\n    encoded = encoder(visible_tokens)  # ViT-Base/Large/Huge\n\n    # 4. Decoder: 在完整序列上重建\n    full_tokens = concat(encoded, mask_tokens)  # 补回 mask token\n    full_tokens += positional_embedding\n    decoded = decoder(full_tokens)  # 4层, 宽度为encoder一半\n\n    # 5. Loss: 仅对被掩码位置计算 MSE\n    pred_pixels = linear_proj(decoded[tube_mask])\n    target_pixels = original_pixels[tube_mask]\n    loss = MSE(pred_pixels, target_pixels)\n    return loss\n</code></pre>\n<h5>动机与背景</h5>\n<p>视频自监督学习面临的核心挑战是<strong>时间冗余</strong>。与图像不同，视频相邻帧之间存在极高的相似性，这使得简单地将图像 MAE 扩展到视频时，模型可以通过\"偷看\"相邻帧中对应位置的可见 patch 来轻松完成重建任务，而无需真正学习语义表示。</p>\n<p>传统的对比学习方法（如 MoCo、BYOL 的视频扩展）需要大量负样本和精心设计的数据增强，且对小数据集效果有限。VideoMAE 的核心洞察是：<strong>通过设计合适的掩码策略，可以将视频重建变成一个具有挑战性的自监督任务</strong>。</p>\n<h5>核心机制详解</h5>\n<p><strong>1. Cube Embedding（时空立方体嵌入）</strong></p>\n<p>VideoMAE 将输入视频 <span class=\"kb-math kb-math-inline\">V \\in \\mathbb{R}^{T \\times H \\times W \\times 3}</span> 通过 3D 卷积划分为不重叠的时空立方体 token。每个 token 覆盖 <span class=\"kb-math kb-math-inline\">2 \\times 16 \\times 16</span> 的时空区域，总共生成 <span class=\"kb-math kb-math-inline\">\\frac{T}{2} \\times \\frac{H}{16} \\times \\frac{W}{16}</span> 个 token。</p>\n<p>时间维度的下采样率为 2（而非 16），这是因为输入视频已经经过了时间采样（stride <span class=\"kb-math kb-math-inline\">\\tau = 4</span> 或 2），进一步的时间压缩会丢失运动信息。</p>\n<p><strong>2. Tube Masking（管状掩码）</strong></p>\n<div class=\"key-point\">💡 关键：Tube Masking 是 VideoMAE 最核心的设计创新。</div>\n<p>传统的 frame-level random masking 对每帧独立采样掩码位置，导致同一空间位置在不同帧中可能被掩码或可见。由于视频时间连续性，模型可以从相邻帧的可见 patch \"复制\" 信息来完成重建，使预训练任务过于简单。</p>\n<p>Tube Masking 的解决方案极其简洁：<strong>在空间维度生成一次随机掩码 <span class=\"kb-math kb-math-inline\">M \\in \\{0,1\\}^{\\frac{H}{16} \\times \\frac{W}{16}}</span>，然后将其沿时间维度复制到所有帧</strong>。这样，如果某个空间位置被掩码，它在所有帧中都不可见，彻底消除了时间维度的信息泄漏。</p>\n<div class=\"kb-math kb-math-display\">M_{tube} = \\text{repeat}(M_{spatial}, \\frac{T}{2})</div>\n<p>消融实验验证：在 SSv2 数据集上，tube masking（75.4%）显著优于 frame random masking（72.0%），证明了防止时间泄漏的重要性。</p>\n<p><strong>3. 极高掩码比率（90-95%）</strong></p>\n<div class=\"warn-box\">⚠️ 注意：视频 MAE 的最优掩码率远高于图像 MAE（75%）。</div>\n<p>由于视频的时间冗余，即使使用 tube masking，较低的掩码率（如 75%）仍然使任务过于简单。VideoMAE 发现 <strong>90%</strong> 的掩码率在 Kinetics-400 上最优，<strong>95%</strong> 在 Something-Something V2 上最优。</p>\n<p>这带来了显著的计算优势：Encoder 仅需处理 10% 的 token，使得预训练效率极高。对于 ViT-Base 处理 16 帧 224×224 视频，总 token 数为 <span class=\"kb-math kb-math-inline\">8 \\times 14 \\times 14 = 1568</span>，90% 掩码后 Encoder 仅处理约 157 个 token。</p>\n<p><strong>4. 非对称 Encoder-Decoder 架构</strong></p>\n<ul>\n<li><strong>Encoder</strong>：标准 ViT（Base/Large/Huge），使用 Joint Space-Time Attention，仅处理可见 token</li>\n<li><strong>Decoder</strong>：轻量设计，4 个 Transformer block，嵌入维度为 Encoder 的一半（如 ViT-B Encoder 768 维，Decoder 384 维）</li>\n</ul>\n<p>Decoder 接收完整的 token 序列（可见 token 的 Encoder 输出 + 可学习的 mask token），添加位置编码后进行自注意力处理，最终通过线性层投影到像素空间。</p>\n<p><strong>5. 重建目标</strong></p>\n<p>VideoMAE 使用简单的像素级 MSE 损失，仅在被掩码的 token 位置计算：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L} = \\frac{1}{|\\mathcal{M}|} \\sum_{i \\in \\mathcal{M}} \\| \\hat{x}_i - x_i \\|^2</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\mathcal{M}</span> 为被掩码 token 的索引集合，<span class=\"kb-math kb-math-inline\">\\hat{x}_i</span> 为预测像素，<span class=\"kb-math kb-math-inline\">x_i</span> 为原始像素。</p>\n<p>消融实验表明，简单的归一化像素值作为目标即可获得最佳效果，无需使用 tokenizer（如 dVAE）或其他复杂目标。</p>\n<h5>训练与微调流程</h5>\n<p><strong>预训练阶段：</strong>\n- 输入：16 帧视频片段，分辨率 224×224\n- 时间采样：stride <span class=\"kb-math kb-math-inline\">\\tau = 4</span>（K400）或 <span class=\"kb-math kb-math-inline\">\\tau = 2</span>（SSv2）\n- 训练 800/1600/2400 epochs（数据集越小需要越多 epochs）\n- 优化器：AdamW，学习率 1.5e-4，cosine schedule</p>\n<p><strong>微调阶段：</strong>\n- 移除 Decoder，仅使用 Encoder\n- 在 Encoder 输出的 [CLS] token 或全局平均池化上添加分类头\n- 微调所有参数，学习率较低</p>\n<h5>与传统方法的区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方面</th>\n<th>对比学习（MoCo/BYOL）</th>\n<th>VideoMAE</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>预训练任务</td>\n<td>实例判别/不变性学习</td>\n<td>像素重建</td>\n</tr>\n<tr>\n<td>数据增强依赖</td>\n<td>高（需精心设计）</td>\n<td>低（仅基本增强）</td>\n</tr>\n<tr>\n<td>负样本需求</td>\n<td>需要大量负样本</td>\n<td>无需负样本</td>\n</tr>\n<tr>\n<td>小数据集表现</td>\n<td>较差</td>\n<td>优异（3.5k视频即有效）</td>\n</tr>\n<tr>\n<td>计算效率</td>\n<td>需要动量编码器</td>\n<td>90%掩码大幅降低计算量</td>\n</tr>\n<tr>\n<td>时间建模</td>\n<td>通常较弱</td>\n<td>通过掩码重建强制学习时间关系</td>\n</tr>\n</tbody>\n</table></div>\n<p>与图像 MAE 相比，VideoMAE 的关键创新在于：(1) tube masking 解决时间泄漏；(2) 更高掩码率适应视频冗余；(3) 证明了视频领域 vanilla ViT 无需时间归纳偏置即可通过 MAE 预训练获得强表示。</p>",
      "quiz": {
        "q": "VideoMAE 采用 Tube Masking 而非 Frame Random Masking 的主要原因是什么？",
        "options": [
          "Tube Masking 计算效率更高，减少了掩码生成的开销",
          "防止模型利用相邻帧中同一空间位置的可见 patch 泄漏信息",
          "Tube Masking 能生成更多训练样本，增加数据多样性",
          "Tube Masking 使得 Decoder 结构可以更简单"
        ],
        "answer": 1,
        "explain": "视频相邻帧高度相似，Frame Random Masking 下同一空间位置在不同帧可能可见，模型可直接'复制'而非学习语义。Tube Masking 确保被掩码位置在所有帧中都不可见，迫使模型学习真正的时空表示。"
      }
    },
    {
      "id": "internvideo",
      "num": 16,
      "name": "InternVideo",
      "fullName": "通用视频模型 (InternVideo)",
      "year": "2022",
      "org": "Shanghai AI Lab",
      "parent": "videomae",
      "paperUrl": "https://arxiv.org/abs/2212.03191",
      "projectUrl": "",
      "category": "foundation_model",
      "motivation": "多任务统一表征与多模态对齐",
      "summary": "InternVideo 提出了一种双路径视频基础模型框架，将自监督掩码视频建模（VideoMAE）与多模态视频-语言对比学习通过跨模型注意力（CMA）机制统一融合，在动作识别、视频-语言对齐和开放世界理解等 39 个数据集上取得 SOTA 表现。",
      "keyPoints": [
        "<strong>双路径架构</strong>：掩码视频编码器（VideoMAE ViT-Huge）+ 多模态视频编码器（UniformerV2 + CLIP-ViT-L/14），分别学习时空表征与视频-语言对齐表征",
        "<strong>跨模型注意力（CMA）</strong>：冻结两个骨干网络，通过可学习的多头交叉注意力模块在两条路径间进行知识迁移与表征对齐",
        "<strong>Kinetics-710 数据集</strong>：合并 K400/K600/K700 并去重，构建包含 710 个类别、65 万视频的统一动作识别数据集",
        "<strong>UnlabeledHybrid 数据集</strong>：融合 K710、SSv2、AVA、WebVid2M 和自采集视频共约 1200 万视频片段，用于掩码视频预训练",
        "<strong>大规模多模态训练</strong>：在 WebVid2M/10M + HowTo100M + LAION-100M 上进行视频-语言联合训练，视频-图像交替迭代",
        "<strong>tanh 门控机制</strong>：CMA 模块采用 Flamingo 风格的 tanh 门控，确保新增模块初始输出为零，不破坏原始表征",
        "<strong>39 个数据集 SOTA</strong>：K400 达 91.1%、SSv2 达 77.2%，在视频检索、视频问答等任务上全面领先"
      ],
      "detail": "<p><img alt=\"InternVideo 整体框架图\" src=\"https://ar5iv.labs.arxiv.org/html/2212.03191/assets/x1.png\" />\n<em>图 1：InternVideo 整体框架。左侧为掩码视频编码器（VideoMAE），右侧为多模态视频编码器（UniformerV2），两者通过跨模型注意力（CMA）进行交互融合。</em></p>\n<p><img alt=\"跨模型注意力（CMA）示意图\" src=\"https://ar5iv.labs.arxiv.org/html/2212.03191/assets/x4.png\" />\n<em>图 2：Cross-Model Attention 的模型交互机制。冻结双骨干，通过交叉注意力模块实现双向知识迁移。</em></p>\n<h5>动机与背景</h5>\n<p>视频理解任务种类繁多，包括动作识别、时序定位、视频检索、视频问答等。传统方法通常只关注单一预训练范式：要么使用掩码自编码（如 VideoMAE）学习细粒度的时空表征，要么使用对比学习（如 CLIP）学习语义对齐的多模态表征。然而，这两种范式各有优劣：</p>\n<ul>\n<li><strong>掩码视频建模</strong>（生成式）：擅长捕捉局部时空细节，在动作识别等细粒度任务上表现优异，但缺乏语言语义对齐能力</li>\n<li><strong>视频-语言对比学习</strong>（判别式）：擅长语义级别的跨模态对齐，在检索、问答等任务上表现出色，但对细粒度时空建模能力有限</li>\n</ul>\n<p>InternVideo 的核心思想是：<strong>将两种互补的预训练范式统一到一个框架中</strong>，通过跨模型注意力机制让两个编码器相互增强，构建一个真正通用的视频基础模型。</p>\n<h5>掩码视频编码器（Masked Video Encoder）</h5>\n<p>掩码视频编码器基于 <strong>VideoMAE</strong> 框架，使用 <strong>ViT-Huge</strong>（632M 参数）作为骨干网络。核心训练流程：</p>\n<ol>\n<li><strong>预训练数据</strong>：在 UnlabeledHybrid 数据集（~12M 视频片段）上进行自监督预训练</li>\n<li><strong>掩码策略</strong>：采用管状掩码（tube masking），掩码比例高达 <strong>90%</strong>，迫使模型学习强大的时空表征</li>\n<li><strong>训练配置</strong>：在 64 块 A100 GPU 上训练 <strong>1200 个 epoch</strong>，学习率 <span class=\"kb-math kb-math-inline\">2.5 \\times 10^{-4}</span>，余弦退火调度</li>\n<li><strong>后续微调</strong>：在 K710 上用 32 块 GPU 微调 40 个 epoch，基础学习率 0.001，层衰减 0.8</li>\n</ol>\n<p>掩码视频建模的核心目标函数为像素级重建损失：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{MAE}} = \\frac{1}{|\\mathcal{M}|} \\sum_{i \\in \\mathcal{M}} \\| \\hat{x}_i - x_i \\|^2</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\mathcal{M}</span> 是被掩码的 token 集合，<span class=\"kb-math kb-math-inline\">\\hat{x}_i</span> 是重建的像素值，<span class=\"kb-math kb-math-inline\">x_i</span> 是原始像素值。</p>\n<div class=\"key-point\">💡 <strong>关键</strong>：90% 的超高掩码比例是 VideoMAE 的核心设计——视频帧间存在大量冗余，高掩码比例迫使模型真正理解时空结构而非简单插值。</div>\n<h5>多模态视频编码器（Multimodal Video Encoder）</h5>\n<p>多模态路径基于 <strong>UniformerV2</strong> 架构，以 <strong>CLIP-ViT-L/14</strong> 作为视觉骨干：</p>\n<ol>\n<li><strong>架构设计</strong>：在 ViT 的最后 4 层插入全局 UniBlock，实现多阶段时空融合。额外参数初始化为使输出与原始 CLIP 模型一致，这对保持零样本性能至关重要</li>\n<li><strong>视频字幕模块</strong>：标准 6 层 Transformer 解码器（<span class=\"kb-math kb-math-inline\">c=768</span>），后接两层 MLP</li>\n<li><strong>训练数据</strong>：WebVid2M/10M + HowTo100M（视频-文本）+ LAION-100M（图像-文本），视频和图像交替迭代训练</li>\n<li><strong>训练配置</strong>：128 块 A100 GPU 训练 2 周，共 400K 步；视频-文本 batch size 14,336，图像-文本 batch size 86,016；学习率 <span class=\"kb-math kb-math-inline\">8 \\times 10^{-5}</span></li>\n</ol>\n<p>多模态训练采用标准的对比学习损失：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{contrast}} = -\\frac{1}{N} \\sum_{i=1}^{N} \\left[ \\log \\frac{\\exp(\\text{sim}(v_i, t_i) / \\tau)}{\\sum_{j=1}^{N} \\exp(\\text{sim}(v_i, t_j) / \\tau)} \\right]</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">v_i, t_i</span> 分别是视频和文本的嵌入表示，<span class=\"kb-math kb-math-inline\">\\tau</span> 是温度参数。</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：图像-文本数据的引入是关键设计——视频-文本数据集规模远小于 CLIP 的 400M 图像-文本对，因此通过图像-文本联合训练弥补数据不足。</div>\n<h5>跨模型注意力（Cross-Model Attention, CMA）</h5>\n<p>CMA 是 InternVideo 的核心创新，用于在两个冻结的骨干网络之间建立知识桥梁：</p>\n<pre><code class=\"language-python\"># CMA 伪代码\n# 阶段1: 冻结两个预训练骨干\nfreeze(masked_video_encoder)\nfreeze(multimodal_video_encoder)\n\n# 阶段2: 添加可学习的CMA模块\nfor layer_i in range(num_cma_layers - 1):\n    # 多模态编码器的中间token作为K/V\n    # 掩码编码器的token作为Q\n    K, V = multimodal_encoder.intermediate_tokens[layer_i]\n    Q = masked_encoder.tokens[layer_i]\n    cma_out = MultiHeadCrossAttention(Q, K, V)\n    cma_out = tanh_gate * FFN(cma_out)  # tanh门控，初始为0\n    masked_encoder.tokens[layer_i] += cma_out\n\n# 最后一层CMA: 方向反转\nK, V = masked_encoder.final_tokens\nQ = multimodal_encoder.class_token\ncma_out_final = MultiHeadCrossAttention(Q, K, V)\nmultimodal_encoder.class_token += tanh_gate * FFN(cma_out_final)\n\n# 阶段3: 动态加权融合预测分数\nscore = w1 * masked_score + w2 * multimodal_score  # w1, w2可学习，初始为0\n</code></pre>\n<p>CMA 的设计有以下关键特点：</p>\n<ol>\n<li><strong>双向知识迁移</strong>：前 N-1 层 CMA 将多模态知识迁移到掩码编码器（多模态→掩码），最后一层反向迁移掩码编码器的细粒度时空知识到多模态编码器（掩码→多模态）</li>\n<li><strong>tanh 门控</strong>：借鉴 Flamingo 的设计，在 MHCA 和 FFN 后添加 tanh 门控层，参数初始化为零，确保训练初期 CMA 输出为零，不破坏预训练表征</li>\n<li><strong>动态分数融合</strong>：最终预测通过可学习的线性组合动态融合两个编码器的预测分数，权重初始化为零</li>\n<li><strong>训练效率</strong>：仅更新 CMA 模块、分类层和多模态编码器的 query token，大幅减少可训练参数</li>\n</ol>\n<h5>Kinetics-710 数据集</h5>\n<p>InternVideo 提出了 <strong>Kinetics-710（K710）</strong> 数据集，通过合并 K400、K600、K700 三个 Kinetics 版本并去除重复类别构建：</p>\n<ul>\n<li>K400 有 400 类，K600 有 600 类，K700 有 700 类，三者存在大量类别重叠</li>\n<li>去重后得到 <strong>710 个唯一类别</strong>，共约 <strong>65 万个训练视频</strong></li>\n<li>作为统一的动作识别微调数据集，避免了在不同 Kinetics 版本间重复实验的问题</li>\n</ul>\n<h5>与传统方法的区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th>传统单路径方法</th>\n<th>InternVideo</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>预训练范式</td>\n<td>仅掩码建模 或 仅对比学习</td>\n<td>双路径融合：掩码 + 对比</td>\n</tr>\n<tr>\n<td>表征能力</td>\n<td>偏向细粒度 或 偏向语义</td>\n<td>兼具细粒度时空 + 语义对齐</td>\n</tr>\n<tr>\n<td>模型交互</td>\n<td>无</td>\n<td>CMA 跨模型注意力双向迁移</td>\n</tr>\n<tr>\n<td>任务覆盖</td>\n<td>单一类型任务</td>\n<td>39 个数据集，3 大类任务</td>\n</tr>\n<tr>\n<td>数据规模</td>\n<td>通常单一数据集</td>\n<td>12M 视频 + 100M 图文对</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 <strong>核心洞察</strong>：InternVideo 的成功表明，生成式（掩码建模）和判别式（对比学习）预训练是互补的——前者提供细粒度的时空理解，后者提供语义级别的跨模态对齐，两者通过 CMA 融合后能显著超越任一单独路径。</div>",
      "quiz": {
        "q": "InternVideo 中跨模型注意力（CMA）最后一层的设计与前面层有何不同？",
        "options": [
          "最后一层使用更大的隐藏维度",
          "最后一层的 Query 来自多模态编码器的 class token，Key/Value 来自掩码编码器",
          "最后一层不使用 tanh 门控机制",
          "最后一层同时融合两个编码器的所有 token"
        ],
        "answer": 1,
        "explain": "前 N-1 层 CMA 以掩码编码器 token 为 Q、多模态编码器 token 为 K/V（多模态→掩码方向），而最后一层反转方向：以多模态编码器的 class token 为 Q、掩码编码器 token 为 K/V，实现掩码→多模态的知识迁移。"
      }
    },
    {
      "id": "mamba3",
      "num": 17,
      "name": "Mamba-3",
      "fullName": "状态空间模型3代 (Mamba-3 Architecture)",
      "year": "2026",
      "org": "Princeton",
      "parent": "video_swin",
      "paperUrl": "https://pli.princeton.edu/mamba3",
      "projectUrl": "",
      "category": "transformer",
      "motivation": "线性注意力解决长视频瓶颈",
      "summary": "Mamba-3 从推理优先的角度重设计 Mamba 系列状态空间层，用更强的离散化递推、复值状态更新和 MIMO 状态空间模块提升线性序列模型质量，为长文本或长视频 token 序列提供比全局注意力更低的长度扩展成本。",
      "keyPoints": [
        "推理优先 SSM：目标是在固定状态大小下提高每步更新的表达力和硬件利用率",
        "Exponential-trapezoidal discretization：用更强离散化形式替代 Mamba-2 过度简化的递推",
        "Complex-valued SSM：用复值转移增强状态追踪能力，并通过 RoPE 形式高效实现",
        "MIMO formulation：从 SISO 标量状态更新扩展到多输入多输出，提高性能且尽量不增加 decode latency",
        "架构现代化：引入 QK/BC Norm、SwiGLU 交替块、可选 MIMO projection，并移除短 causal conv",
        "长序列意义：固定状态使推理内存不随上下文线性增长，适合作为长视频/VLM backbone 或混合层组件"
      ],
      "detail": "<blockquote>\n<p>注：给定 <code>paper_url</code> 是简写入口；本文依据 Princeton PLI 官方博客和可检索论文 <code>arXiv:2603.15569</code> 解读。</p>\n</blockquote>\n<p><img alt=\"Mamba-3 架构对比\" src=\"https://arxiv.org/html/2603.15569v1/x2.png\" />\n<em>图：Mamba-3 相比 Mamba-2 增加指数-梯形离散化、数据依赖 RoPE、MIMO projection、QK/BC Norm 和可学习偏置。</em></p>\n<h5>1. 动机与背景</h5>\n<p>Transformer 的自注意力在长序列上有两个典型成本：prefill 近似二次计算，decode 需要不断读取增长的 KV cache。长视频理解会把帧、patch、轨迹或视觉摘要转成很长 token 序列，因此这类成本会成为瓶颈。</p>\n<p>Mamba 系列用状态空间模型把历史压缩到固定大小状态中，推理时每来一个 token 只更新状态，而不是保存所有历史 token。Mamba-2 为了训练效率将状态转移进一步简化，但也让单步推理过于轻量、表达力不足且偏 memory-bound。Mamba-3 的目标是让固定状态“做更多有用计算”。</p>\n<h5>2. SSM 基础形式</h5>\n<p>离散状态空间层可写为：</p>\n<div class=\"kb-math kb-math-display\">h_t = A_t h_{t-1} + B_t x_t,\\quad\ny_t = C_t^\\top h_t</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">h_t</span> 是固定大小状态，<span class=\"kb-math kb-math-inline\">x_t</span> 是当前 token 表示，<span class=\"kb-math kb-math-inline\">y_t</span> 是输出。与 attention 保存所有 <span class=\"kb-math kb-math-inline\">K,V</span> 不同，SSM 只保存 <span class=\"kb-math kb-math-inline\">h_t</span>，因此 decode 内存与序列长度解耦。</p>\n<h5>3. Mamba-3 的三项方法升级</h5>\n<p>第一，Mamba-3 使用更具表达力的 exponential-trapezoidal 离散化。直觉上，它不再把连续动态粗糙地简化为过窄的递推形式，而是在数值离散化时保留更多动态结构，使状态更新既稳定又能表达复杂变化。</p>\n<p>第二，Mamba-3 引入复值 SSM。复数转移可表示旋转和振荡模式，这对括号、奇偶、状态追踪、周期性事件等序列结构有帮助。实现上，论文用 RoPE 风格把复值旋转融入实值 kernel，避免重写昂贵复数计算。</p>\n<p>第三，MIMO 将单输入单输出的独立标量 SSM 扩展到向量输入/输出。相比每个通道独立更新，MIMO 让一组通道共享更丰富的状态交互，提升质量；在 decode 阶段，由于 GPU 仍有空闲算力，增加部分 FLOPs 不一定线性增加墙钟延迟。</p>\n<h5>4. 前向流程伪代码</h5>\n<pre><code class=\"language-python\"># Mamba-3 block 简化伪代码\ndef mamba3_block(x, state):\n    residual = x\n    x = rms_norm(x)\n\n    # 生成 SSM 参数与门控分支\n    a, b, c, gate = linear_projections(x)\n    b, c = bc_norm(b), bc_norm(c)\n\n    # 复值动态可用 RoPE/rotation 参数化\n    theta = rope_projection(x)\n    a_complex = compose_transition(a, theta)\n\n    # exponential-trapezoidal discretized recurrence\n    state = exp_trapezoid_update(state, a_complex, b, x)\n    y = readout(state, c)\n\n    # 可选 MIMO projection 增强通道交互\n    y = mimo_projection(y)\n    y = output_projection(y * silu(gate))\n    return residual + y, state\n</code></pre>\n<p>在语言或视频模型中，Mamba-3 block 通常与 MLP/SwiGLU block 交替，并可与少量全局 attention 层混合。对于长视频，常见用法不是直接替代视觉 patch tokenizer，而是在已经压缩后的帧级、轨迹级或多模态 token 序列上建模长程依赖。</p>\n<h5>5. 与 Transformer / Video Swin 的区别</h5>\n<p>Video Swin 用局部窗口注意力降低视频 token 的局部建模成本，但跨长时间上下文仍需要堆叠或额外机制。Transformer 全局注意力能精确检索历史 token，但上下文越长 KV cache 越大。Mamba-3 则把历史压缩进固定状态，牺牲一部分精确随机访问能力，换取线性长度扩展和低 decode 内存。</p>\n<p>因此 Mamba-3 更适合被理解为长序列 backbone 或混合架构组件，而不是一个专门的视频识别算法。若用于长视频语言模型，它解决的主要是“大量视频 token 进入语言模型后的长上下文建模成本”，而不是前端视觉感知本身。</p>\n<div class=\"warn-box\">⚠️ 注意：Mamba-3 不是线性注意力的简单变体，而是状态空间递推模型；它与 attention 的核心差异在于是否保存所有历史 token。</div>",
      "quiz": {
        "q": "Mamba-3 相比 Transformer 在长序列推理中的核心优势是什么？",
        "options": [
          "保存完整 KV cache 以便精确访问所有历史 token",
          "使用固定大小状态递推，推理内存不随序列长度按 KV cache 方式增长",
          "只适用于短图像分类输入",
          "完全不需要参数训练"
        ],
        "answer": 1,
        "explain": "Mamba-3 属于状态空间模型，历史信息被压缩到固定状态中；这降低了长上下文 decode 时的内存压力。"
      }
    },
    {
      "id": "cosmos",
      "num": 18,
      "name": "Cosmos",
      "fullName": "世界模型策略 (Cosmos World Model Policy)",
      "year": "2026",
      "org": "NVIDIA",
      "parent": "internvideo",
      "paperUrl": "https://research.nvidia.com/cosmos",
      "projectUrl": "",
      "category": "foundation_model",
      "motivation": "视频预训练转化机器人策略",
      "summary": "Cosmos 的核心目标是：视频预训练转化机器人策略。",
      "keyPoints": [
        "核心动机：视频预训练转化机器人策略",
        "演化来源：继承或改进自 internvideo",
        "代表机构：NVIDIA"
      ],
      "detail": "<h3>Cosmos World Foundation Model Platform for Physical AI</h3>\n<pre><code class=\"language-yaml\">标题: &quot;Cosmos World Foundation Model Platform for Physical AI&quot;\n作者: &quot;NVIDIA (Agarwal et al.)&quot;\n机构: &quot;NVIDIA&quot;\n发表: &quot;arXiv 2501.03575, 2025年1月&quot;\n链接: &quot;https://arxiv.org/abs/2501.03575&quot;\n代码: &quot;https://github.com/NVIDIA/Cosmos&quot;\n领域: &quot;视频生成 / 世界模型 / Physical AI&quot;\n</code></pre>\n<hr />\n<h2>一句话总结</h2>\n<p>Cosmos 提出了一个面向 Physical AI 的<strong>世界基础模型 (WFM) 平台</strong>，包含视频 Tokenizer、扩散 Transformer 和自回归 Transformer 双路径预训练模型，以及面向相机控制、机器人操控和自动驾驶的后训练流程，在 1 亿视频片段上预训练，实现了高质量、物理一致的视频世界生成。</p>\n<hr />\n<h2>核心要点</h2>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th>内容</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><strong>解决的问题</strong></td>\n<td>Physical AI（机器人、自动驾驶）需要理解和预测物理世界的未来状态，但现有视频生成模型缺乏物理一致性和可控性</td>\n</tr>\n<tr>\n<td><strong>核心思路</strong></td>\n<td>构建\"预训练 + 后训练\"范式的世界基础模型平台：先在大规模多样视频上预训练通用世界模型，再针对具体 Physical AI 任务微调</td>\n</tr>\n<tr>\n<td><strong>关键创新</strong></td>\n<td>① 双路径架构（Diffusion + Autoregressive Transformer）；② 连续/离散双模态视频 Tokenizer（8×8×8 时空压缩）；③ AdaLN-LoRA 参数高效设计（减少 36% 参数）；④ 完整的数据策展→预训练→后训练→安全护栏流水线</td>\n</tr>\n<tr>\n<td><strong>主要结果</strong></td>\n<td>Diffusion 7B/14B 和 AR 4B-13B 模型在视频生成质量、3D 一致性和物理真实性上表现优异；后训练成功应用于相机轨迹控制、机器人操控预测和自动驾驶场景</td>\n</tr>\n<tr>\n<td><strong>局限性</strong></td>\n<td>AR 模型存在物体从底部突然出现的伪影；离散 tokenizer 有损压缩导致模糊；文本条件对 AR 模型效果有限；世界模型问题远未解决</td>\n</tr>\n</tbody>\n</table></div>\n<hr />\n<h2>深入细节</h2>\n<h3>1. 问题定义与整体架构</h3>\n<p><strong>世界基础模型 (WFM)</strong> 被形式化定义为：</p>\n<div class=\"kb-math kb-math-display\">\\hat{x}_{t+1} = \\mathcal{W}(x_{0:t}, c_t)</div>\n<p>其中 $x_{0:t}$ 是过去的视觉观测序列（RGB 视频），$c_t$ 是当前扰动（可以是动作指令、文本描述、随机扰动等），$\\hat{x}_{t+1}$ 是预测的下一时刻观测。</p>\n<p><strong>平台架构总览：</strong></p>\n<p><img alt=\"Cosmos Platform Overview\" src=\"https://ar5iv.labs.arxiv.org/html/2501.03575/assets/figures/cosmos_teaser_v3.jpg\" /></p>\n<p>整个平台包含四大模块：\n1. <strong>数据策展管线</strong> — 从 20M 小时视频中提取 100M 高质量片段\n2. <strong>视频 Tokenizer</strong> — 连续/离散双模态编码器\n3. <strong>预训练 WFM</strong> — Diffusion 和 Autoregressive 双路径\n4. <strong>后训练 WFM</strong> — 面向相机控制、机器人、自动驾驶的专用模型</p>\n<p>WFM 的应用场景包括：策略评估（在虚拟世界中测试策略）、策略初始化、策略训练（配合奖励模型做 RL）、规划/模型预测控制、合成数据生成。</p>\n<hr />\n<h3>2. 视频 Tokenizer（Sec 4）</h3>\n<p>Cosmos Tokenizer 是一套同时支持<strong>连续</strong>和<strong>离散</strong>表示的因果视频 tokenizer。</p>\n<p><strong>架构设计：</strong>\n- 基于注意力机制的 encoder-decoder 架构\n- <strong>因果时空压缩</strong>：支持 8×8×8（时间×高度×宽度）的压缩率\n- 第一个时间 token 对应第一帧，实现图像 ($T=0$) 和视频 ($T&gt;0$) 的联合 tokenization</p>\n<p><strong>两种 token 类型：</strong></p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>类型</th>\n<th>潜在维度</th>\n<th>量化方式</th>\n<th>用途</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><strong>连续 token</strong></td>\n<td>16 维向量</td>\n<td>无量化</td>\n<td>扩散模型输入</td>\n</tr>\n<tr>\n<td><strong>离散 token</strong></td>\n<td>6 维 FSQ</td>\n<td>FSQ levels = (8,8,8,5,5,5)，词表大小 64,000</td>\n<td>自回归模型输入</td>\n</tr>\n</tbody>\n</table></div>\n<blockquote>\n<p><strong>FSQ (Finite Scalar Quantization)</strong>：将每个维度量化到有限个离散级别，避免了 VQ-VAE 中码本坍塌的问题。6 个维度分别量化到 8/8/8/5/5/5 个级别，总词表 $8^3 \\times 5^3 = 64{,}000$。</p>\n</blockquote>\n<p><strong>训练策略：</strong>\n- 联合图像-视频训练，共享潜在空间\n- 多种压缩率变体（如 CV8x8x8 表示连续视频 8×8×8 压缩）</p>\n<pre><code>伪代码：Cosmos Tokenizer\n输入: 视频 V ∈ R^{T×3×H×W}\n# 编码\nz = Encoder(V)  # z ∈ R^{T/8 × C × H/8 × W/8}\n# 连续路径\nz_cont = z  # C=16, 直接用于扩散模型\n# 离散路径  \nz_disc = FSQ(z)  # 6维, 每维量化为整数索引, 词表64k\n# 解码\nV_recon = Decoder(z_cont) 或 Decoder(Lookup(z_disc))\n</code></pre>\n<hr />\n<h3>3. 扩散世界基础模型（Sec 5.1）</h3>\n<p>基于 <strong>Transformer 的扩散模型</strong>，使用连续 token 和 flow matching 训练。</p>\n<p><strong>核心架构组件：</strong></p>\n<p><strong>① 3D Patchification</strong>\n- 输入潜在表示 $T \\times C \\times H \\times W$\n- 用线性层将非重叠 3D 块 $(p_t, p_h, p_w) = (1, 2, 2)$ 投影为 token\n- 展平为 1D 时空序列，长度 $THW/(p_t \\cdot p_h \\cdot p_w)$</p>\n<p><strong>② 混合位置编码：FPS-aware 3D RoPE + 可学习嵌入</strong>\n- <strong>3D 分解 RoPE</strong>：将特征维度分为三个近似相等的块，分别沿时间、高度、宽度轴施加 RoPE\n- <strong>FPS 感知</strong>：根据视频帧率缩放时间频率，支持不同帧率的视频\n- <strong>NTK-RoPE</strong>：渐进式训练中改变分辨率/视频长度时快速收敛（5000 步内达到合理性能）\n- <strong>额外可学习绝对位置嵌入</strong>：每个 Transformer block 添加，减少形变伪影</p>\n<p><strong>③ 文本条件：Cross-Attention</strong>\n- 每个 Transformer block：Self-Attention → Cross-Attention → FFN\n- Cross-Attention 使用 <strong>T5-XXL</strong> 文本嵌入作为 key/value</p>\n<p><strong>④ QK 归一化</strong>\n- 对 Q 和 K 使用 RMSNorm（带可学习缩放），防止注意力 logit 增长导致的训练不稳定</p>\n<p><strong>⑤ AdaLN-LoRA（关键创新）</strong>\n- DiT 的自适应层归一化 (AdaLN) 占大量参数但 FLOPs 贡献极小\n- 用 LoRA 分解 AdaLN 中的密集线性投影为低秩近似\n- <strong>效果</strong>：参数从 11B 降至 7B（减少 36%），性能不变</p>\n<pre><code>伪代码：Cosmos Diffusion WFM 前向\n输入: 噪声潜在 z_t, 时间步 t, 文本嵌入 text_emb\n# 3D Patchify\ntokens = LinearProject(z_t, patch_size=(1,2,2))  # [B, L, D]\n# 添加位置编码\ntokens += LearnableAPE(tokens)\nfor block in transformer_blocks:\n    # 3D RoPE 应用于 Q, K\n    q, k, v = block.self_attn_proj(tokens)\n    q, k = apply_3d_rope(q, k, fps)\n    q, k = rms_norm(q), rms_norm(k)  # QK-Norm\n    tokens = self_attention(q, k, v)\n    # Cross-attention with text\n    tokens = cross_attention(tokens, text_emb)\n    # AdaLN-LoRA + FFN\n    tokens = adaln_lora(tokens, t) → ffn(tokens)\n# Unpatchify\noutput = Unpatchify(tokens)\n</code></pre>\n<p><strong>模型规模：</strong>\n- Cosmos-1.0-Diffusion-<strong>7B</strong>（AdaLN-LoRA 优化后）\n- Cosmos-1.0-Diffusion-<strong>14B</strong></p>\n<p><strong>训练配方：</strong>\n- 渐进式训练：从低分辨率短视频逐步增加到高分辨率长视频\n- Flow matching 目标函数\n- 联合图像-视频训练</p>\n<hr />\n<h3>4. 自回归世界基础模型（Sec 5.2）</h3>\n<p>基于 <strong>Transformer 的自回归模型</strong>，使用离散 token 和 next-token prediction。</p>\n<p><strong>架构设计：</strong></p>\n<p><img alt=\"AR Architecture\" src=\"https://ar5iv.labs.arxiv.org/html/2501.03575/assets/figures/ar_architecture.png\" /></p>\n<ul>\n<li>输入视频 → Cosmos-1.0-Tokenizer-DV8x16x16 编码为离散 token → 学习嵌入</li>\n<li>重复 Transformer block：APE + 3D RoPE → Self-Attention → Cross-Attention (T5) → 2-layer MLP</li>\n<li>输出 token → Tokenizer 解码器重建视频</li>\n</ul>\n<p><strong>与扩散模型的关键差异：</strong></p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>扩散模型</th>\n<th>自回归模型</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Token 类型</td>\n<td>连续（16维向量）</td>\n<td>离散（FSQ 64k 词表）</td>\n</tr>\n<tr>\n<td>生成方式</td>\n<td>从噪声逐步去噪</td>\n<td>逐 token 预测</td>\n</tr>\n<tr>\n<td>位置编码 APE</td>\n<td>可学习嵌入</td>\n<td>正弦嵌入</td>\n</tr>\n<tr>\n<td>RoPE 扩展</td>\n<td>NTK-RoPE</td>\n<td>YaRN（仅时间轴）</td>\n</tr>\n<tr>\n<td>训练目标</td>\n<td>Flow matching</td>\n<td>Cross-entropy (next-token)</td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>词表设计：</strong>\n- 视频 token 词表：64,000（来自 FSQ tokenizer）\n- 文本 token 词表：与 LLM tokenizer 共享\n- 总词表 = 视频词表 + 文本词表</p>\n<p><strong>Diffusion Decoder 增强：</strong>\n- AR 模型输出因离散 tokenizer 有损压缩而模糊\n- 将 AR 输出通过扩散解码器增强清晰度，同时保持内容一致性</p>\n<p><strong>模型规模：</strong>\n- Cosmos-1.0-Autoregressive-<strong>4B</strong> / <strong>12B</strong>（无文本条件）\n- Cosmos-1.0-Autoregressive-<strong>5B</strong> / <strong>13B</strong>-Video2World（有文本条件）</p>\n<p><strong>失败率分析：</strong></p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>模型</th>\n<th>图像条件</th>\n<th>视频条件(9帧)</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>AR-4B</td>\n<td>15%</td>\n<td>1%</td>\n</tr>\n<tr>\n<td>AR-5B-V2W</td>\n<td>7%</td>\n<td>2%</td>\n</tr>\n<tr>\n<td>AR-12B</td>\n<td>2%</td>\n<td>1%</td>\n</tr>\n<tr>\n<td>AR-13B-V2W</td>\n<td>3%</td>\n<td>0%</td>\n</tr>\n</tbody>\n</table></div>\n<hr />\n<h3>5. 数据策展管线（Sec 3）</h3>\n<p><strong>规模：</strong> 从 20M 小时视频中提取约 <strong>100M 视频片段</strong>（2-60 秒）</p>\n<p><strong>关键流程：</strong>\n1. <strong>视频解码/转码</strong>：利用 GPU 硬件 H.264 编解码器加速\n2. <strong>动态丰富度筛选</strong>：定位富含动态和高视觉质量的片段\n3. <strong>VLM 字幕生成</strong>：每 256 帧使用视觉语言模型生成一个字幕\n4. <strong>Ray 编排管线</strong>：协调不同吞吐量的预训练理解模型，最大化整体处理速度</p>\n<hr />\n<h3>6. 后训练（Sec 6）</h3>\n<h4>6.1 相机可控性后训练</h4>\n<ul>\n<li>微调预训练 Diffusion WFM，使其以<strong>相机位姿</strong>为条件</li>\n<li>创建可导航的虚拟世界，用户可通过移动虚拟视点探索生成的世界</li>\n</ul>\n<h4>6.2 机器人操控后训练</h4>\n<ul>\n<li>在视频-动作序列数据上微调 WFM</li>\n<li>利用预训练 WFM 的先验知识，更好地预测机器人动作导致的未来世界状态</li>\n<li>支持指令跟随的机器人操控任务</li>\n</ul>\n<h4>6.3 自动驾驶后训练</h4>\n<ul>\n<li>针对自动驾驶相关任务微调预训练 WFM</li>\n<li>生成驾驶场景的未来状态预测</li>\n</ul>\n<hr />\n<h3>7. 安全护栏（Sec 7）</h3>\n<ul>\n<li><strong>Pre-Guard</strong>：阻止有害输入进入模型</li>\n<li><strong>Post-Guard</strong>：阻止有害输出被返回给用户</li>\n<li>为 Physical AI 开发者提供安全保障</li>\n</ul>\n<hr />\n<h3>8. 关键技术总结图</h3>\n<pre><code>┌─────────────────────────────────────────────────────────┐\n│                 Cosmos WFM Platform                      │\n├─────────────┬───────────────────────────────────────────┤\n│  数据策展    │ 20M小时 → 100M片段, Ray编排, VLM字幕      │\n├─────────────┼───────────────────────────────────────────┤\n│  Tokenizer  │ 连续(16D) + 离散(FSQ 64k), 8×8×8压缩     │\n├─────────────┼─────────────────┬─────────────────────────┤\n│  预训练WFM  │ Diffusion 7B/14B│ Autoregressive 4B-13B   │\n│             │ 连续token        │ 离散token               │\n│             │ Flow matching    │ Next-token prediction   │\n│             │ 3D RoPE+学习APE  │ 3D RoPE+正弦APE+YaRN   │\n│             │ AdaLN-LoRA       │ Diffusion decoder增强   │\n├─────────────┼─────────────────┴─────────────────────────┤\n│  后训练     │ 相机控制 | 机器人操控 | 自动驾驶             │\n├─────────────┼───────────────────────────────────────────┤\n│  安全护栏   │ Pre-Guard (输入过滤) + Post-Guard (输出过滤)│\n└─────────────┴───────────────────────────────────────────┘\n</code></pre>\n<hr />\n<h2>练习题</h2>\n<h3>概念理解</h3>\n<ol>\n<li>\n<p><strong>世界基础模型 (WFM) 与传统视频生成模型的核心区别是什么？</strong> WFM 不仅生成视觉上逼真的视频，还需要对物理世界的动态规律建模，能够根据输入的扰动（动作、指令等）预测物理一致的未来状态。</p>\n</li>\n<li>\n<p><strong>为什么 Cosmos 同时采用扩散和自回归两种架构？各自的优劣是什么？</strong> 扩散模型生成质量更高（连续 token 无量化损失），但推理需要多步去噪；自回归模型推理更灵活（逐 token 生成，易于与 LLM 集成），但离散化导致信息损失。两者互补。</p>\n</li>\n<li>\n<p><strong>AdaLN-LoRA 的设计动机是什么？为什么 AdaLN 层适合用 LoRA 压缩？</strong> AdaLN 层占大量参数但 FLOPs 贡献极小（仅做逐元素仿射变换的参数生成），说明其内在维度较低，适合低秩近似。LoRA 分解使参数从 11B 降至 7B 而不损失性能。</p>\n</li>\n<li>\n<p><strong>FSQ 相比 VQ-VAE 的优势是什么？</strong> FSQ 直接将每个维度量化到有限级别，避免了 VQ-VAE 中常见的码本坍塌问题和辅助损失的调参困难。</p>\n</li>\n</ol>\n<h3>深入思考</h3>\n<ol>\n<li>\n<p><strong>如果要将 Cosmos 扩展到更长的视频生成（如 10 分钟），你认为主要的技术瓶颈在哪里？</strong> 提示：考虑 token 序列长度、注意力复杂度、时间一致性维持、以及 RoPE 外推能力。</p>\n</li>\n<li>\n<p><strong>论文提到 AR 模型的文本条件效果有限，你认为可能的改进方向是什么？</strong> 提示：考虑预训练阶段文本-视频对齐的比例、CLIP 对比学习、以及 instruction tuning 策略。</p>\n</li>\n<li>\n<p><strong>设计一个实验来验证 WFM 在机器人策略训练中的有效性。</strong> 提示：对比使用 WFM 生成的合成数据 vs 纯真实数据训练策略模型的成功率，控制数据量变量。</p>\n</li>\n</ol>"
    },
    {
      "id": "worldreel",
      "num": 19,
      "name": "WorldReel",
      "fullName": "4D世界视频 (WorldReel 4D Generation)",
      "year": "2026",
      "org": "CVPR",
      "parent": "cosmos",
      "paperUrl": "https://cvpr2026.thecvf.com",
      "projectUrl": "",
      "category": "foundation_model",
      "motivation": "几何一致4D视频生成",
      "summary": "WorldReel 提出了一种前馈式统一 4D 视频生成框架，在潜空间中将深度和光流与 RGB 联合编码（Geo-Motion Augmented Latent），并通过时序 DPT 解码器同时预测点云、相机轨迹、场景流和动态掩码，配合两阶段联合训练策略，在保持视觉质量的同时显著提升了动态场景的几何一致性和运动连贯性。",
      "keyPoints": [
        "<strong>统一 4D 表示</strong>：单次前向推理同时输出 RGB 视频、逐像素点云 <span class=\"kb-math kb-math-inline\">P_i</span>、相机内外参 <span class=\"kb-math kb-math-inline\">C_i</span>、3D 场景流 <span class=\"kb-math kb-math-inline\">F_i^{3d}</span> 和动态前景掩码 <span class=\"kb-math kb-math-inline\">M_i</span>，所有几何量统一在首帧规范坐标系下",
        "<strong>Geo-Motion 增强潜空间</strong>：将逐帧深度图和光流通过同一 3D VAE 编码为 geo-motion latent，与 RGB latent 在通道维度拼接后送入 DiT，通过零初始化策略保留预训练权重",
        "<strong>时序 DPT 多任务解码器</strong>：基于 DPT 架构引入时序 Transformer，从扩散潜空间提取多尺度特征，共享解码器 + 轻量任务头分别预测深度/点云/相机/流/掩码，实现参数高效的几何正则化",
        "<strong>两阶段训练策略</strong>：第一阶段分别训练 DiT（扩散损失）和 DPT heads（多任务损失）；第二阶段端到端联合训练，加入背景深度一致性正则 <span class=\"kb-math kb-math-inline\">\\mathcal{L}_{\\text{reg}}^{\\text{depth}}</span> 和前景流平滑正则 <span class=\"kb-math kb-math-inline\">\\mathcal{L}_{\\text{reg}}^{\\text{flow}}</span>",
        "<strong>混合数据策略</strong>：合成数据（PointOdyssey、BEDLAM、Dynamic Replica、Omniworld-Game）提供精确标注 + 真实视频（SpatialVid 筛选的 Panda-70M）通过 GeometryCrafter/ViPE/SEA-RAFT 生成高质量伪标签",
        "<strong>场景流伪标签生成</strong>：利用光流 + 点云对应关系计算稠密 3D 场景流，结合前景掩码、不确定性和前后向一致性检查过滤噪声",
        "<strong>基座模型</strong>：CogVideoX-5B-I2V，480×720 分辨率，49 帧，4D 表示在下采样的 13 帧上预测"
      ],
      "detail": "<p><img alt=\"WorldReel 框架总览\" src=\"https://arxiv.org/html/2512.07821v1/x2.png\" />\n<em>图：WorldReel 整体架构。左侧为 Geo-Motion Augmented DiT，将 RGB 与深度/光流的联合潜空间输入扩散 Transformer；右侧为 Temporal DPT Decoder，从去噪后的潜空间解码出统一的 4D 场景表示（点云、相机、场景流、掩码）。</em></p>\n<pre><code class=\"language-python\"># WorldReel 推理伪代码\ndef worldreel_inference(image, text_prompt):\n    # 1. 编码输入图像为 RGB latent\n    z_rgb = vae_3d.encode(image)  # 3D VAE (CogVideoX)\n\n    # 2. 初始化 geo-motion latent (深度+光流通道)\n    z_gm = zeros_like(z_rgb, channels=C_gm)  # 零初始化\n    z_input = concat([z_rgb, z_gm], dim=channel)  # 通道拼接\n\n    # 3. 扩散去噪过程 (DiT with geo-motion augmented latent)\n    for t in reversed(range(T)):\n        z_input = dit_denoise_step(z_input, t, text_prompt)\n\n    # 4. 分离 RGB 和 geo-motion latent\n    z_rgb_clean, z_gm_clean = split(z_input, dim=channel)\n\n    # 5. 解码 RGB 视频\n    video = vae_3d.decode(z_rgb_clean)  # [49, H, W, 3]\n\n    # 6. Temporal DPT 解码 4D 表示 (13 个下采样帧)\n    features = temporal_dpt.extract_multiscale(z_gm_clean)\n    unified_feat = temporal_dpt.fuse(features)\n\n    depth = depth_head(unified_feat)       # [13, H, W, 1]\n    pointmap = pointmap_head(unified_feat)  # [13, H, W, 3]\n    camera = camera_head(unified_feat)      # [13, 9]\n    scene_flow = flow_head(unified_feat)    # [13, H, W, 3]\n    dyn_mask = mask_head(unified_feat)      # [13, H, W, 1]\n\n    return video, depth, pointmap, camera, scene_flow, dyn_mask\n</code></pre>\n<h5>动机与背景</h5>\n<p>现有视频生成模型（如 CogVideoX、Sora 等）虽然能生成视觉逼真的视频，但缺乏对底层 3D 世界状态的显式建模。这导致两个核心问题：</p>\n<ol>\n<li><strong>几何不一致</strong>：生成的视频在不同帧之间缺乏一致的 3D 结构，物体形状和场景布局会随时间漂移</li>\n<li><strong>运动不连贯</strong>：相机运动和物体运动纠缠在一起，难以生成具有复杂动态的场景</li>\n</ol>\n<p>已有的 4D 视频生成方法（如 GeoVideo、4DNeX）尝试引入几何约束，但存在关键缺陷：\n- <strong>GeoVideo</strong> 仅建模静态几何（深度 + 相机），忽略了物体运动，导致模型倾向于生成近静态内容以维持几何一致性\n- <strong>4DNeX</strong> 虽然输出点云，但其极低的动态度（dynamic degree 仅 0.03）表明模型坍缩为近静态生成\n- <strong>DimensionX</strong> 将空间和时间维度分离建模，无法捕捉几何与运动的耦合关系</p>\n<div class=\"key-point\">💡 关键洞察：<strong>几何一致性和运动连贯性不应被分开处理</strong>。只有同时显式建模静态结构和动态运动，才能避免\"为保持几何一致性而牺牲动态性\"的困境。</div>\n<h5>核心机制一：Geo-Motion 增强潜空间</h5>\n<p>WorldReel 的第一个核心设计是将几何和运动信息直接注入扩散模型的潜空间。具体做法：</p>\n<p><strong>编码</strong>：对于每帧视频，除了 RGB 图像外，还有对应的深度图 <span class=\"kb-math kb-math-inline\">D_i</span> 和光流 <span class=\"kb-math kb-math-inline\">F_i^{2d}</span>。将深度图复制为 3 通道、光流补零为 3 通道后，使用与 RGB <strong>相同的预训练 3D VAE</strong> 分别编码：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{z}^{\\text{gm}} = \\text{VAE}_{\\text{enc}}(\\text{concat}[D_{\\text{rep}}, F^{2d}_{\\text{pad}}])</div>\n<p><strong>拼接</strong>：将 geo-motion latent 与 RGB latent 在通道维度拼接，形成增强输入：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{z}_{\\text{input}} = [\\mathbf{z}^{\\text{rgb}}; \\mathbf{z}^{\\text{gm}}] \\in \\mathbb{R}^{T&#x27; \\times H&#x27; \\times W&#x27; \\times 2C}</div>\n<p><strong>零初始化</strong>：DiT 输入层新增通道的权重初始化为零，确保训练初期模型行为与预训练一致，避免破坏已有的视频生成能力。</p>\n<div class=\"warn-box\">⚠️ 注意：复用同一 3D VAE 编码几何信息是一个巧妙的设计选择——虽然深度/光流与 RGB 的分布不同，但 3D VAE 的时空压缩能力可以被有效迁移，避免了训练额外编码器的开销。</div>\n<h5>核心机制二：时序 DPT 多任务解码器</h5>\n<p>从去噪后的 geo-motion latent 中解码出完整的 4D 表示，WorldReel 设计了一个基于 DPT（Dense Prediction Transformer）的时序解码器：</p>\n<ol>\n<li><strong>多尺度特征提取</strong>：从 DiT 的不同层提取多尺度稠密特征</li>\n<li><strong>时序 Transformer 融合</strong>：在 DPT 融合骨干中引入时序 Transformer，建模帧间关系</li>\n<li><strong>共享解码 + 任务头分离</strong>：所有任务共享同一个 DPT 解码器，仅在最终输出层使用轻量级任务头分别预测：</li>\n<li>深度图 <span class=\"kb-math kb-math-inline\">D_i \\in \\mathbb{R}^{H \\times W}</span></li>\n<li>点云 <span class=\"kb-math kb-math-inline\">P_i \\in \\mathbb{R}^{H \\times W \\times 3}</span>（首帧规范坐标系）</li>\n<li>相机参数 <span class=\"kb-math kb-math-inline\">C_i \\in \\mathbb{R}^{9}</span>（内参 + 外参，采用 VGGT 参数化）</li>\n<li>3D 场景流 <span class=\"kb-math kb-math-inline\">F_i^{3d} \\in \\mathbb{R}^{H \\times W \\times 3}</span></li>\n<li>动态掩码 <span class=\"kb-math kb-math-inline\">M_i \\in \\mathbb{R}^{H \\times W}</span></li>\n</ol>\n<div class=\"key-point\">💡 关键：共享解码器不仅节省参数，更重要的是作为<strong>强正则化</strong>，迫使模型学习统一的几何一致表示。各任务之间的高度相关性（深度↔点云↔相机）通过共享特征自然传递。</div>\n<h5>核心机制三：两阶段联合训练</h5>\n<p><strong>第一阶段（分离训练）</strong>：\n- DiT 微调 20K 步：标准扩散损失 <span class=\"kb-math kb-math-inline\">\\mathcal{L}_{\\text{diff}} = \\mathcal{L}_{\\text{diff}}^{\\text{rgb}} + \\mathcal{L}_{\\text{diff}}^{\\text{gm}}</span>\n- DPT heads 从头训练 100K 步：以干净的 geo-motion latent 为输入，多任务损失：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{dpt}} = \\mathcal{L}_{\\text{depth}} + \\mathcal{L}_{\\text{pc}} + \\mathcal{L}_{\\text{cam}} + \\mathcal{L}_{\\text{mask}} + \\lambda_{\\text{flow}} \\mathcal{L}_{\\text{flow}}</div>\n<p>其中深度和点云用 masked L1 loss，相机用 Huber loss，掩码用 BCE loss，场景流按前景掩码重加权。</p>\n<p><strong>第二阶段（联合训练 10K 步）</strong>：端到端优化，加入关键正则化项：</p>\n<ul>\n<li><strong>背景深度一致性</strong>：利用相机变换将深度投影到其他帧，在静态背景区域强制一致：</li>\n</ul>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{reg}}^{\\text{depth}} = \\sum_i \\sum_j \\left\\| \\hat{M}_i^{\\text{bg}} \\odot \\left( D_j - \\text{Proj}(D_i, T_{i \\to j}) \\right) \\right\\|_2</div>\n<ul>\n<li><strong>前景流平滑</strong>：对动态前景区域的场景流施加空间平滑约束：</li>\n</ul>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{reg}}^{\\text{flow}} = \\sum_i \\left( \\left\\| \\hat{M}_i^{\\text{fg}} \\odot \\nabla_x F_i^{3d} \\right\\|_2 + \\left\\| \\hat{M}_i^{\\text{fg}} \\odot \\nabla_y F_i^{3d} \\right\\|_2 \\right)</div>\n<p>总损失：<span class=\"kb-math kb-math-inline\">\\mathcal{L} = \\mathcal{L}_{\\text{diff}} + \\lambda_{\\text{dpt}} \\mathcal{L}_{\\text{dpt}} + \\lambda_{\\text{reg}} \\mathcal{L}_{\\text{reg}}</span>，其中 <span class=\"kb-math kb-math-inline\">\\lambda_{\\text{dpt}}=0.1</span>，<span class=\"kb-math kb-math-inline\">\\lambda_{\\text{reg}}=0.5</span>。</p>\n<div class=\"key-point\">💡 关键设计：正则化项<strong>按动态掩码分区处理</strong>——背景强制多视图一致，前景强制运动平滑。这种解耦策略避免了对动态区域施加过强的几何约束，从而不会抑制复杂运动的生成。</div>\n<h5>与现有方法的关键区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>CogVideoX</th>\n<th>GeoVideo</th>\n<th>4DNeX</th>\n<th><strong>WorldReel</strong></th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>几何建模</td>\n<td>❌</td>\n<td>深度+相机</td>\n<td>点云</td>\n<td><strong>深度+点云+相机</strong></td>\n</tr>\n<tr>\n<td>运动建模</td>\n<td>隐式</td>\n<td>❌</td>\n<td>❌</td>\n<td><strong>场景流+光流+掩码</strong></td>\n</tr>\n<tr>\n<td>动态场景</td>\n<td>✅</td>\n<td>偏静态</td>\n<td>近静态</td>\n<td><strong>✅ 强动态</strong></td>\n</tr>\n<tr>\n<td>潜空间增强</td>\n<td>❌</td>\n<td>深度</td>\n<td>❌</td>\n<td><strong>深度+光流</strong></td>\n</tr>\n<tr>\n<td>联合训练</td>\n<td>❌</td>\n<td>冻结DPT</td>\n<td>❌</td>\n<td><strong>端到端+正则化</strong></td>\n</tr>\n</tbody>\n</table></div>\n<h5>实验关键数据</h5>\n<p><strong>视频生成质量</strong>（Table 1，Complex motion split）：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th style=\"text-align: center;\">Dynamic Degree ↑</th>\n<th style=\"text-align: center;\">FVD ↓</th>\n<th style=\"text-align: center;\">FID ↓</th>\n<th style=\"text-align: center;\">Subject Consistency ↑</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>CogVideoX-I2V</td>\n<td style=\"text-align: center;\">0.52</td>\n<td style=\"text-align: center;\">824.8</td>\n<td style=\"text-align: center;\">52.97</td>\n<td style=\"text-align: center;\">0.916</td>\n</tr>\n<tr>\n<td>4DNeX</td>\n<td style=\"text-align: center;\">0.19</td>\n<td style=\"text-align: center;\">632.8</td>\n<td style=\"text-align: center;\">49.79</td>\n<td style=\"text-align: center;\">0.983</td>\n</tr>\n<tr>\n<td>GeoVideo</td>\n<td style=\"text-align: center;\">0.79</td>\n<td style=\"text-align: center;\">409.9</td>\n<td style=\"text-align: center;\">49.92</td>\n<td style=\"text-align: center;\">0.914</td>\n</tr>\n<tr>\n<td><strong>WorldReel</strong></td>\n<td style=\"text-align: center;\"><strong>1.00</strong></td>\n<td style=\"text-align: center;\"><strong>394.2</strong></td>\n<td style=\"text-align: center;\"><strong>44.95</strong></td>\n<td style=\"text-align: center;\"><strong>0.927</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>4D 几何质量</strong>（Table 2）：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th style=\"text-align: center;\">Depth log-RMSE ↓</th>\n<th style=\"text-align: center;\">δ₁.₂₅ ↑</th>\n<th style=\"text-align: center;\">Camera ATE ↓</th>\n<th style=\"text-align: center;\">RTE ↓</th>\n<th style=\"text-align: center;\">RRE ↓</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>GeoVideo</td>\n<td style=\"text-align: center;\">0.353</td>\n<td style=\"text-align: center;\">63.4</td>\n<td style=\"text-align: center;\">0.011</td>\n<td style=\"text-align: center;\">0.012</td>\n<td style=\"text-align: center;\">0.443</td>\n</tr>\n<tr>\n<td><strong>WorldReel</strong></td>\n<td style=\"text-align: center;\"><strong>0.287</strong></td>\n<td style=\"text-align: center;\"><strong>71.1</strong></td>\n<td style=\"text-align: center;\"><strong>0.005</strong></td>\n<td style=\"text-align: center;\"><strong>0.007</strong></td>\n<td style=\"text-align: center;\"><strong>0.317</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>消融实验</strong>（Table 3）关键发现：\n- 移除 geo-motion latent（\"w/o g.m.\"）：Complex motion FVD 从 394.2 恶化至 452.8，证明几何-运动潜空间对复杂动态建模至关重要\n- 移除联合训练（\"w/o joint\"）：深度 log-RMSE 从 0.287 恶化至 0.399，证明端到端联合优化对几何精度的关键作用\n- 冻结 DPT（\"freeze dpt\"）：FVD 略优（382.3 vs 394.2），但几何精度下降，表明 DPT 参与联合训练有助于几何-外观对齐</p>\n<h5>局限性</h5>\n<ul>\n<li>依赖 4D 监督信号（相机、几何、场景流），当前通过合成数据和伪标签获取，存在域差距</li>\n<li>有限的时序窗口（49 帧）在拓扑剧变、严重遮挡和快速运动场景下会出现失败</li>\n<li>伪标签质量受限于标注模型（ViPE、GeometryCrafter 等）的精度上限</li>\n</ul>",
      "quiz": {
        "q": "WorldReel 中 Geo-Motion Augmented Latent 的核心设计意图是什么？",
        "options": [
          "用额外的 VAE 编码深度和光流，增加模型容量",
          "将几何和运动信息注入扩散潜空间，使 DiT 在去噪过程中感知 3D 结构和动态",
          "替代 RGB latent 以减少计算量",
          "仅用于训练阶段的数据增强，推理时不使用"
        ],
        "answer": 1,
        "explain": "Geo-Motion Augmented Latent 将深度和光流编码后与 RGB latent 通道拼接，使扩散 Transformer 在去噪过程中同时处理外观和几何-运动信息，从而将几何一致性的梯度反传到潜空间，实现外观与 3D 结构的联合优化。"
      }
    },
    {
      "id": "kangaroo",
      "num": 20,
      "name": "Kangaroo",
      "fullName": "长视频语言模型 (Kangaroo VLM)",
      "year": "2026",
      "org": "IJCV",
      "parent": "internvideo",
      "paperUrl": "https://link.springer.com/kangaroo",
      "projectUrl": "",
      "category": "foundation_model",
      "motivation": "超长上下文视频语言对齐",
      "summary": "Kangaroo 通过高质量视频-文本数据策划、时序位置编码、空间-时间 patchify 压缩和渐进式课程训练，构建了支持长上下文视频输入的 8B 级视频语言模型。",
      "keyPoints": [
        "长视频 VLM 架构：视觉编码器 + spatial-temporal patchify + multimodal projector + LLM",
        "时间戳位置编码：用真实浮点时间戳增强帧特征，而不是只用离散帧序号",
        "数据策划系统：围绕图像/视频预训练和指令微调构建高质量多模态数据",
        "课程训练：从图像对齐、短视频预训练逐步过渡到高分辨率和长视频微调",
        "上下文扩展：通过 token 压缩、动态帧采样和序列打包支持更多帧输入",
        "长视频基准收益：在 MLVU、LVBench、VideoMME、EgoSchema 等长视频理解任务上强调竞争力"
      ],
      "detail": "<blockquote>\n<p>注：给定 <code>paper_url</code> 是占位式短链；可检索正式版本为 IJCV 2026 DOI <code>10.1007/s11263-025-02620-2</code>，预印本为 <code>arXiv:2408.15542</code>。</p>\n</blockquote>\n<p><img alt=\"Kangaroo 架构图\" src=\"https://arxiv.org/html/2408.15542v1/x2.png\" />\n<em>图：Kangaroo 由 vision encoder、spatial-temporal patchify、multi-modal projector 和 LLM 组成。</em></p>\n<h5>1. 动机与背景</h5>\n<p>视频语言模型面临两个互相牵制的问题。第一，长视频需要更多帧才能覆盖关键事件，但帧数增加会让视觉 token 爆炸，迅速耗尽 LLM 上下文。第二，公开视频-文本数据噪声高，字幕常只描述局部片段或缺少细粒度事件，模型很难学到可靠的视频语言对齐。</p>\n<p>Kangaroo 的策略是同时处理数据和架构：用数据策划系统提升监督质量，用课程训练逐步扩大分辨率、帧数和上下文长度，并用 patchify 压缩把高分辨率多帧视觉特征变成 LLM 可承受的 token 序列。</p>\n<h5>2. 模型结构与时间编码</h5>\n<p>每帧先经过视觉编码器得到 patch 特征 <span class=\"kb-math kb-math-inline\">Z_f^t</span>。Kangaroo 给每帧加入基于真实时间戳 <span class=\"kb-math kb-math-inline\">t</span> 的 temporal position embedding：</p>\n<div class=\"kb-math kb-math-display\">\\hat{Z}_f^t = Z_f^t + \\text{TPE}(t)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">t</span> 是浮点秒级时间，而不是第几帧的整数索引。这样模型能区分均匀采样、稀疏采样和不同视频时长下的同一帧序号。随后 spatial-temporal patchify 对视觉 token 进行压缩，projector 将其映射到 LLM embedding 空间，与文本 token 拼接后送入语言模型。</p>\n<h5>3. 课程训练流程</h5>\n<p><img alt=\"Kangaroo 课程训练\" src=\"https://arxiv.org/html/2408.15542v1/x5.png\" />\n<em>图：Kangaroo 通过逐步增加任务难度、分辨率和帧数来训练长视频能力。</em></p>\n<pre><code class=\"language-python\"># Kangaroo 课程训练伪代码\nstage1_image_pretrain(\n    data=image_text_pairs,\n    trainable=[&quot;projector&quot;],\n    frozen=[&quot;vision_encoder&quot;, &quot;llm&quot;],\n)\n\nstage2_video_pretrain(\n    data=short_video_text_pairs,\n    frames=8,\n    resolution=224,\n    trainable=[&quot;vision_encoder&quot;, &quot;projector&quot;],\n)\n\nstage3_refine(\n    data=curated_high_quality_data,\n    frames=16,\n    resolution=448,\n    trainable=[&quot;vision_encoder&quot;, &quot;patchify&quot;, &quot;projector&quot;, &quot;llm&quot;],\n)\n\nstage4_instruction_tune(\n    data=video_instruction_data,\n    frames=&quot;up_to_64&quot;,\n    context=&quot;10K&quot;,\n)\n\nstage5_long_video_tune(\n    data=long_video_subset,\n    frames=&quot;up_to_160&quot;,\n    context=&quot;22K&quot;,\n)\n</code></pre>\n<p>这种安排避免了一开始就把 LLM 暴露在超长、超噪声、多帧高分辨率输入下。先学图文对齐，再学短视频时序，最后扩展到长视频指令任务，训练稳定性更好。</p>\n<h5>4. 长视频处理机制</h5>\n<p>Spatial-temporal patchify 是 Kangaroo 控制视觉 token 数的关键。分辨率从 224 到 448 会使每帧 patch 数显著增加，如果直接把所有 token 输入 LLM，长视频不可行。Patchify 模块在空间和时间维度上做结构化压缩，保留关键视觉语义，同时减少 token 数。</p>\n<p>动态帧采样负责覆盖不同长度视频：短视频不必采太多冗余帧，长视频则增加采样以覆盖事件跨度。序列打包和注意力 mask 减少 padding 浪费，使不同长度样本可以更高效地训练。</p>\n<h5>5. 与 InternVideo 等视频基础模型的关系</h5>\n<p>InternVideo 更偏视频表示/编码预训练，强调视觉 backbone 的通用视频表征；Kangaroo 则聚焦把长视频接入 LLM，解决视觉 token 压缩、长上下文对齐和指令问答。它的关键不只是视觉编码器强，而是数据质量、时间元信息和逐步扩展训练共同支撑长视频语言推理。</p>\n<div class=\"key-point\">💡 关键：Kangaroo 的长视频能力主要来自“少丢信息地压缩视觉 token”与“课程式扩大上下文”的配合，而不是简单增加输入帧数。</div>",
      "quiz": {
        "q": "Kangaroo 使用真实浮点时间戳做 TPE 的主要意义是什么？",
        "options": [
          "让模型感知帧的真实时间间隔和采样密度",
          "替代视觉编码器，使模型不再需要图像特征",
          "只用于计算视频文件大小",
          "强制所有视频采样相同帧数"
        ],
        "answer": 0,
        "explain": "真实时间戳能保留视频时长和采样间隔等元信息，比单纯帧序号更适合长视频理解。"
      }
    },
    {
      "id": "trajtok",
      "num": 21,
      "name": "TrajTok",
      "fullName": "轨迹Token (Learning Trajectory Tokens)",
      "year": "2026",
      "org": "Tsinghua/CAS",
      "parent": "videomae",
      "paperUrl": "https://arxiv.org/abs/2604.trajtok",
      "projectUrl": "",
      "category": "foundation_model",
      "motivation": "端到端轨迹Token解耦时长",
      "summary": "TrajTok 提出端到端可训练的视频轨迹 tokenizer，用统一 segmenter 隐式聚合跨时空像素并生成轨迹 token，使视频 token 数更多取决于语义复杂度而不是视频时长。",
      "keyPoints": [
        "端到端轨迹 tokenizer：与下游视频模型联合训练，不依赖外部分割和跟踪流水线",
        "Universal segmenter：用 learnable queries 对像素/特征做隐式时空聚类，单次前向产生轨迹 mask",
        "Trajectory encoder：按轨迹 mask 聚合视觉特征，输出紧凑语义 token",
        "可调 token 粒度：每条轨迹可输出不同数量子 token，适配算力预算",
        "三种使用方式：TrajViT2 预训练、TrajAdapter 特征探针、TrajVLM 多模态连接器",
        "长视频收益：轨迹表示减少冗余 patch token，尤其利于长视频推理和视频语言模型"
      ],
      "detail": "<blockquote>\n<p>注：给定 <code>paper_url</code> 为不可访问占位符；可检索论文为 <code>arXiv:2602.22779</code>，CVPR 2026 open access 版本题名为 <em>TrajTok: Learning Trajectory Tokens Enhances Video Understanding</em>。</p>\n</blockquote>\n<p><img alt=\"TrajTok 架构概览\" src=\"https://arxiv.org/html/2602.22779v3/x2.png\" />\n<em>图：TrajTok 由 trajectory segmenter 和 trajectory encoder 组成，先产生轨迹 mask，再聚合为轨迹 token。</em></p>\n<h5>1. 动机与背景</h5>\n<p>VideoMAE、TimeSformer、Video Swin 等方法通常把视频切成固定时空 patch。这样做简单稳定，但 token 数与帧数线性增长；长视频中大量背景、静止区域或重复帧会产生冗余 token，限制模型规模和上下文长度。</p>\n<p>轨迹 token 的想法是：视频理解更关心“对象或部件随时间如何变化”，而不是每一帧每个网格都单独成 token。此前 TrajViT 等方法已证明轨迹式 tokenization 可以减少冗余，但依赖 SAM/跟踪器等外部流水线，慢、不可微、也无法根据下游目标调整 token 粒度。</p>\n<h5>2. Universal Segmenter</h5>\n<p>TrajTok 的 segmenter 用一组 learnable queries 对视频像素或中间视觉特征做隐式聚类。它不追求像 SAM 那样像素级完美分割，而是追求对下游理解任务有用的语义分组。</p>\n<p>可以将 segmenter 看成一个 mask proposal 网络：</p>\n<div class=\"kb-math kb-math-display\">M = \\text{Segmenter}(X; Q_s), \\quad M \\in \\mathbb{R}^{K \\times T \\times H \\times W}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">K</span> 是轨迹数，<span class=\"kb-math kb-math-inline\">M_k</span> 表示第 <span class=\"kb-math kb-math-inline\">k</span> 条轨迹在各帧上的软 mask。由于整个模块在模型内部，梯度可以从分类、检索或 VLM 目标回传到分组策略，使 tokenization 随任务自适应。</p>\n<h5>3. Trajectory Encoder</h5>\n<p>Trajectory encoder 根据 mask 聚合原始视频特征或预训练视觉特征：</p>\n<div class=\"kb-math kb-math-display\">u_k = \\frac{\\sum_{t,h,w} M_{k,t,h,w} \\cdot f_{t,h,w}}\n{\\sum_{t,h,w} M_{k,t,h,w} + \\epsilon}</div>\n<p>随后通过 perceiver/attention 模块细化轨迹 token。论文还允许每条轨迹展开为 <span class=\"kb-math kb-math-inline\">n \\in \\{1,2,4\\}</span> 个子 token，训练时随机采样粒度，推理时可按算力预算选择。</p>\n<pre><code class=\"language-python\"># TrajTok 前向伪代码\ndef trajtok(video_or_features):\n    feats = patch_encoder(video_or_features)\n\n    # 统一 segmenter 产生 K 条软轨迹\n    masks = trajectory_segmenter(feats, learnable_queries)\n\n    # 按轨迹聚合时空特征\n    traj_tokens = []\n    for k in range(K):\n        token = masked_pool(feats, masks[k])\n        traj_tokens.append(token)\n\n    # 轨迹 token 细化和可选子 token 展开\n    traj_tokens = trajectory_encoder(traj_tokens, masks)\n    return traj_tokens\n</code></pre>\n<h5>4. 三种接入方式</h5>\n<p><img alt=\"TrajTok 应用方式\" src=\"https://arxiv.org/html/2602.22779v3/x4.png\" />\n<em>图：TrajTok 可用于从头训练视频编码器、适配预训练特征，也可作为 VLM 的视觉连接器。</em></p>\n<p>TrajViT2 从头训练视频 CLIP 式模型，用 TrajTok 替代固定 patch token，直接学习适合检索和分类的轨迹表示。TrajAdapter 则把 TrajTok 插到冻结视觉 backbone 后面，作为下游分类/检索的轻量探针头。TrajVLM 把轨迹 token 作为 LLaVA 风格 VLM 的视觉输入，让长视频问答不必吞下海量 patch token。</p>\n<p>这三种设置说明 TrajTok 不是单一模型，而是一个可插拔 tokenization 模块。它可以处在预训练阶段，也可以处在微调或多模态对齐阶段。</p>\n<h5>5. 与 VideoMAE/patch token 的区别</h5>\n<p>VideoMAE 的 mask reconstruction 仍基于规则网格 patch，适合学习局部时空表征；TrajTok 则把 token 单位改成对象/部件轨迹，目标是减少冗余并突出长期语义一致性。前者的 token 数主要由 <span class=\"kb-math kb-math-inline\">T \\times H \\times W</span> 决定，后者更接近由场景中对象和运动复杂度决定。</p>\n<div class=\"key-point\">💡 关键：TrajTok 的“解耦时长”不是说完全不受帧数影响，而是通过轨迹聚合让长视频中重复背景和持续对象不再按每帧网格重复计费。</div>",
      "quiz": {
        "q": "TrajTok 相比依赖外部 SAM+Tracker 的轨迹 tokenization 最大优势是什么？",
        "options": [
          "完全不使用视觉特征",
          "端到端可训练，token 分组能根据下游任务目标自适应",
          "把所有帧压缩成一个固定类别标签",
          "只能用于 GPS 轨迹数据，不能用于视频"
        ],
        "answer": 1,
        "explain": "TrajTok 将 segmenter 和 trajectory encoder 集成进模型内部，梯度可回传到 tokenization 过程，因此比外部不可微流水线更灵活。"
      }
    }
  ],
  "categories": {
    "traditional_feature": {
      "label": "传统特征方法",
      "color": "#8B4513"
    },
    "cnn_rnn": {
      "label": "CNN/RNN架构",
      "color": "#2E8B57"
    },
    "transformer": {
      "label": "Transformer时序建模",
      "color": "#4169E1"
    },
    "foundation_model": {
      "label": "视频基础模型",
      "color": "#9932CC"
    }
  },
  "projectUrls": {}
};
