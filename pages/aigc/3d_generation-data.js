/**
 * 3d_generation-data.js — 由 pipeline/build.py 于 2026-06-15 18:08:19 自动生成。
 * 源文件：content/aigc/3d_generation.md
 * ⚠️  请勿手动修改；如需更新，修改源文档后重新编译。
 */
window.PAGE_CONFIG = {
  "meta": {
    "domain": "aigc",
    "topic_id": "3d_generation",
    "topic_name": "3D生成",
    "page_title": "3D生成 技术演进",
    "page_subtitle": "2026-05-12 版",
    "page_desc": "概述3D生成技术从NeRF神经辐射场、3D Gaussian Splatting到扩散模型及原生3D大模型的发展历程，涵盖文生3D、图生3D、纹理生成与3D资产生产四大方向。",
    "page_icon": "🧊",
    "hero_pills": [
      "🏷️ Text-to-3D · NeRF · 3DGS · Diffusion · LRM"
    ],
    "count_pill": "32 个算法",
    "image_base": "../../content/aigc/3d_generation/assets/",
    "overview_from_doc": true,
    "latest_overview_from_doc": true
  },
  "overview": [
    {
      "title": "",
      "body_html": "<h1>2024年AI+3D技术进展总结 （第三篇）- 3D AIGC方向2</h1>\n<ul>\n<li>来源平台: <strong>zhihu</strong>（知乎专栏文章）</li>\n<li>原文链接: <a href=\"https://zhuanlan.zhihu.com/p/15651784766\">https://zhuanlan.zhihu.com/p/15651784766</a></li>\n<li>作者: 创业坤哥</li>\n</ul>\n<hr />\n<p>2024年AI+3D技术进展总结 （第三篇）- 3D AIGC方向2</p>\n<h1>2024年AI+3D技术进展总结 （第三篇）- 3D AIGC方向2</h1>\n<p>作者: 创业坤哥, 赞: 11</p>\n<p>上一篇我们讲过，AI现在生成的模型大部分都是dense 的三角面片，然后跟传统建模师生成的模型差距点主要在： 1. 面数可以更简洁， 面片可以更规则 2. 布线可以更均匀.</p>\n<p>于是乎， 开始有人探索跟建模师，艺术家风格比较一致的模型的生成.</p>\n<h2>MeshGPT</h2>\n<p>开始了像生成一个单词那样， 生成mesh face的研究， 它把一个face （3个顶点，9个坐标数值）tokenize， 基于一个encoder ， decoder 的结构，流程看下图。值得指出的是，在MeshGPT中,RVQ被用来压缩网格的几何特征。通过多个量化器的级联,可以在保持较高重建质量的同时,显著减少存储空间。每个顶点的特征被编码为一系列离散的索引,这些索引可以被后续的Transformer模型用来生成新的网格。</p>\n<p><img alt=\"\" src=\"https://picx.zhimg.com/v2-b1a17be3800341abaac3a7de6521fb8f_1440w.jpg\" /></p>\n<p>还有其他的paper ：比如MeshAnything2 （更高效的tokenizer） <a href=\"https://link.zhihu.com/?target=https%3A//buaacyw.github.io/meshanything-v2/\">MeshAnything V2</a>， meshXL <a href=\"https://link.zhihu.com/?target=https%3A//github.com/OpenMeshLab/MeshXL\">https://github.com/OpenMeshLab/MeshXL</a> ， 目前能生成的mesh的顶点数比较受限，~几千的样子，还没法比较好的表征复杂物体.</p>\n<h2>MeshArt （articulated）</h2>\n<p>这个工作为啥单拿出来说，因为他跟具身相关了， 他生成了带有articulated的objects， 这个就开始有功能性或者物理性了，而不是单纯的结构或者贴图美观</p>\n<p><img alt=\"\" src=\"https://pic2.zhimg.com/v2-f5c9f7ab20d179c3402d5093a91efb27_1440w.jpg\" /></p>\n<p>它的特点是：分不同部分的 mesh generation， 然后每个部分都是有状态的，比如抽屉是可以沿某个方向拖拽水平移动的。</p>\n<p>他们是在partnet mobility 这个数据集为基础， 花了150小时进行了更多的标注。</p>\n<p><img alt=\"\" src=\"https://pic2.zhimg.com/v2-bbcf9c4e66d11bb47f133ac78cc1787b_1440w.jpg\" /></p>\n<p>MeshArt 工作给未来其他品类的articulated的物体生成打开了一个大门。</p>\n<p>展望：2025年应该会有更多的MeshGPT 类的工作出现，期待能够有在可编辑性等方向上有更好的作品</p>\n<p>下一篇 主要想讲讲 在CAD生成领域的工作，目前讲的都是游戏类的模型， 但是CAD类的模型比较特殊， 他们是服务工业设计生产用的， 目前也开始有了新的突破</p>"
    }
  ],
  "latest_overview": [
    {
      "title": "",
      "body_html": "<h1>CVPR 2026 3D 视觉前沿梳理：模型正在学会理解、生成和构建世界</h1>\n<ul>\n<li>来源平台: <strong>zhihu</strong>（知乎专栏文章）</li>\n<li>原文链接: <a href=\"https://zhuanlan.zhihu.com/p/2036529094490318171\">https://zhuanlan.zhihu.com/p/2036529094490318171</a></li>\n<li>作者: AI科技评论</li>\n</ul>\n<hr />\n<p>CVPR 2026 3D 视觉前沿梳理：模型正在学会理解、生成和构建世界</p>\n<h1>CVPR 2026 3D 视觉前沿梳理：模型正在学会理解、生成和构建世界</h1>\n<p>作者: AI科技评论, 赞: 3</p>\n<p><img alt=\"\" src=\"https://pica.zhimg.com/v2-5659f1c4a355208294bdab538bb99f4c_1440w.jpg\" /></p>\n<p>3D 视觉正从重建生成，走向空间理解、动态模拟与工程化应用。</p>\n<p>编辑丨岑 峰</p>\n<p><strong><em>*<img alt=\"\" src=\"https://pic4.zhimg.com/v2-6a7f46d4391e7003d356222bebf86631_1440w.jpg\" /></em></strong>*</p>\n<p>如果说过去几年的视觉 AI 主要是在回答“模型能不能看懂一张图”，那么到 CVPR 2026，一个更清晰的趋势正在浮现：<strong>模型正在被要求理解图像背后的三维世界。</strong></p>\n<p>二维图像只是现实世界在某个视角下的投影，真正困难的地方不在于生成一张看起来合理的画面，而在于模型能否理解物体的空间结构、相机运动、材质光照、物理变化，以及这些信息在不同视角和不同时间中的一致性。</p>\n<p>从今年的一系列 3D 视觉相关工作可以看到，研究重点正在从“生成结果是否好看”，转向“生成过程是否具备空间逻辑”。</p>\n<p>有的工作试图通过自监督 3D 重建，让模型在没有显式标注的情况下学习几何关系；有的工作绕过传统重建流程，直接利用 3D-aware 特征实现实时新视角合成；也有工作进一步把 3D 表示扩展到 4D 动态生成，让物体不仅有形状和外观，还能表现出符合物理规律的运动。</p>\n<p>同时，单图 3D 重建、真实感 3D 生成、关键点长期追踪、像素级预训练、真实世界数据集和自动化代码工具链，也都在从不同层面补齐 3D 视觉的基础能力。</p>\n<p>这些工作共同指向一个更深层的变化：3D 视觉不再只是计算机图形学或三维重建中的一个技术分支，而是在成为通向空间智能的重要路径。</p>\n<p>模型要进入真实世界，就不能只学习图像表面的纹理和语义，而必须理解“物体在哪里、是什么形状、如何运动、在不同条件下如何保持一致”。从某种意义上说，CVPR 2026 的这些工作进一步加强了行业此前的认知：<strong>视觉 AI 正在从二维感知走向三维理解，从图像生成走向世界建模。</strong></p>\n<p><strong>01</strong></p>\n<h2></h2>\n<h2><strong><em>*</em>*从看懂 3D 到生成 4D</strong>****</h2>\n<p>3D 视觉研究的一个核心问题，是如何让模型真正理解空间结构，而不是只在图像层面学习纹理和相似性。</p>\n<p>由 CMU、Adobe 研究院和哈佛大学共同提出的《E-RayZer: Self-supervised 3D Reconstruction as Spatial Visual Pre-training》正是从这个问题出发，研究如何在没有 3D 标注、相机位姿或深度监督的情况下，让模型仅通过多视角图像学习 3D 空间理解能力。</p>\n<p>作者提出了 E-RayZer 这一自监督 3D 视觉预训练方法：模型会输入同一场景的多张图片，自动估计相机参数，并构建显式的 3D Gaussians 场景表示，再通过可微渲染生成目标视角图像，最后利用渲染结果与真实图像之间的差异来训练模型。这样一来，模型不只是学习图像之间的相似性，而是需要真正理解相机、几何结构和多视角空间关系。</p>\n<p><img alt=\"\" src=\"https://pica.zhimg.com/v2-9ae23788be9bc452ed7768ad2b9d97f2_1440w.jpg\" /></p>\n<p>这篇论文的亮点在于，它把自监督学习和显式 3D 重建结合起来，使模型能够在不依赖 3D 标注的情况下学习空间表征。相比一些只在隐式特征空间中做视角合成的方法，E-RayZer 使用 3D Gaussians 直接建模场景，因此几何意义更强，也更适合学习真实的 3D 结构。</p>\n<p>实验结果表明，这种预训练方式在相机位姿估计、深度估计和新视角合成等任务上都有较好的表现，说明模型通过“自己重建 3D 场景”的训练过程，确实学到了有用的空间视觉能力。</p>\n<p>E-RayZer 选择用显式 3D 重建来逼迫模型学习空间结构，但在实际的新视角合成任务中，显式重建并不是唯一选择。另一条思路是：如果模型已经具备足够强的 3D-aware 特征，是否可以跳过复杂的显式建模过程，直接用神经网络生成目标视角画面。</p>\n<p>而由牛津大学视觉几何组、Meta AI 共同提出的《LagerNVS: Latent Geometry for Fully Neural Real-time Novel View Synthesis》就研究了这个方向。</p>\n<p>它关注的是 Novel View Synthesis（新视角合成），也就是给定一个场景的若干输入图像，让模型生成从新相机视角看到的画面。传统方法通常需要先重建显式 3D 场景，比如 NeRF 或 3D Gaussians，再进行渲染；而这篇论文提出的 LagerNVS 选择绕过显式 3D 重建，直接用神经网络从输入图像和目标相机视角生成新视角图像。</p>\n<p><img alt=\"\" src=\"https://pic2.zhimg.com/v2-ae24180f64adc03f2973d5c10c8199c9_1440w.jpg\" /></p>\n<p>它的核心想法是：虽然模型不直接输出显式 3D 结构，但仍然应该引入强 3D 先验。具体来说，LagerNVS 使用一个从 3D 重建网络初始化而来的编码器来提取带有 3D 感知能力的 latent features，再配合轻量级解码器根据目标相机视角生成图像。</p>\n<p>这样既保留了 3D 结构信息带来的几何理解能力，又避免了传统 3D 重建和渲染流程的复杂性。这篇论文的亮点在于，它证明了即使是不显式重建 3D 场景的新视角合成模型，也能明显受益于 3D-aware 特征。</p>\n<p>实验中，LagerNVS 在确定性 feed-forward 新视角合成上取得了很强的效果，例如在 RealEstate10K 上达到 31.4 PSNR，并且可以在有相机参数或无相机参数的情况下工作；模型还支持实时渲染，在单张 H100 GPU 上可达到 30 FPS 以上。</p>\n<p>如果说 E-RayZer 和 LagerNVS 主要处理的是静态场景中的空间理解与视角生成，那么更进一步的问题是：模型能否不仅生成 3D 外观，还生成符合物理规律的动态变化。</p>\n<p>北京理工大学、理想汽车、哈尔滨工业大学和四川大学联合提出的《PhysGM: Large Physical Gaussian Model for Feed-Forward 4D Synthesis》把关注点从静态 3D 扩展到动态 4D。</p>\n<p>它研究的是如何从单张图像快速生成带有物理规律的动态 4D 场景，也就是不仅要重建物体的 3D 外观，还要让它在运动、变形、受力时表现得更符合真实物理。现有很多方法通常需要先用多视角图像重建 3D Gaussian Splatting，再手动设置刚度、质量等物理参数，或者通过视频模型进行耗时的逐场景优化。</p>\n<p>而 PhysGM 希望用一次前向推理，直接预测物体的 3D Gaussian 表示和对应的物理属性，从而快速初始化物理模拟并生成高质量动态渲染结果。</p>\n<p><img alt=\"\" src=\"https://pic2.zhimg.com/v2-ef403b13534598be9b0eef0d744ef881_1440w.jpg\" /></p>\n<p>这篇论文的亮点在于，它把 3D Gaussian 重建和物理属性预测放到同一个 feed-forward 框架中，不再把几何重建和物理模拟分成两个独立步骤。模型会从输入图像中推断物体的外观、几何以及材料属性，例如刚度、密度等，再结合 MPM 物理模拟生成动态序列。</p>\n<p>作者还使用 DPO 对模型进行偏好优化，让生成结果更接近物理合理的参考视频，同时避免传统 SDS 方法中昂贵且不稳定的逐场景优化。整体来看，这篇论文的贡献是：让模型从单张图像出发，在较短时间内生成既有真实外观、又具备物理运动规律的 4D Gaussian 场景，提升了物理驱动 4D 内容生成的效率和实用性。</p>\n<p>动态场景生成强调的是物体如何运动和变化，而在真实应用中，另一个基础需求是把普通自然图像中的物体直接转成可用的 3D 表示。Meta 超级智能实验室提出的《SAM 3D: 3Dfy Anything in Images》研究的就是从单张自然图像中进行 3D 物体重建：</p>\n<p>模型不仅要恢复物体的几何形状，还要预测纹理、姿态和在场景中的布局。相比只在干净物体图或合成数据上表现较好的方法，SAM 3D 更强调真实场景中的应用，例如物体被遮挡、背景杂乱、尺寸较小或姿态异常时，仍然能够根据图像上下文生成较完整的 3D 结果。</p>\n<p>它把大规模数据引擎和生成式 3D 重建模型结合起来。作者通过 human- and model-in-the-loop 的流程标注物体形状、纹理和姿态，构建了大规模视觉对齐的 3D 重建数据，再用多阶段训练方式把合成预训练和真实世界对齐结合起来，试图突破 3D 数据不足的问题。</p>\n<p>实验中，SAM 3D 相比已有方法在真实物体和场景的人类偏好评测中取得了至少 5:1 的胜率，并且论文还计划发布代码、模型权重、在线 demo 和新的野外 3D 重建 benchmark。整体来看，这篇论文的贡献是：把类似 SAM 的“开放世界视觉理解”能力推进到 3D 重建中，让模型可以从普通图片中更稳定地生成可用的 3D 物体表示。</p>\n<p><img alt=\"\" src=\"https://picx.zhimg.com/v2-97eb5b465c6f2efb32003c2f60a80099_1440w.jpg\" /></p>\n<p>当 3D 生成模型逐渐能从真实图片中恢复物体结构后，画面是否足够真实就变成了新的瓶颈。很多 3D 可控生成方法依赖合成数据来获得几何、视角和材质控制能力，但合成数据本身也容易把模型带向“合成感”的视觉风格。</p>\n<p>Technion 和 Meta AI 共同提出的《Realiz3D: 3D Generation Made Photorealistic via Domain-Aware Learning》正是针对这个问题，研究如何让 3D 生成结果同时具备真实照片级外观和稳定的 3D 一致性。</p>\n<p>很多方法会用带有标注的合成 3D 数据去微调图像生成模型，从而获得视角、几何、材质等控制能力，但这样容易让模型把“有控制信号”和“合成渲染风格”错误绑定在一起，导致生成结果虽然可控，却不够真实。</p>\n<p>Realiz3D 的目标就是解决这个真实图像和合成数据之间的 domain gap，让模型既能听从 3D 控制，又能生成更像真实照片的结果。</p>\n<p><img alt=\"\" src=\"https://pic1.zhimg.com/v2-081be6919503510293ac0d33c804e1d4_1440w.jpg\" /></p>\n<p>这篇论文的核心做法是引入 Domain Shifters，也就是一组轻量级残差适配器，用来单独学习“真实 / 合成”这种视觉域信息，而不是把视觉风格和 3D 控制信号混在一起。训练时，模型先学习区分和切换真实域、合成域，再利用合成数据学习精确控制，同时通过真实数据帮助模型保持照片级外观。</p>\n<p>论文还结合了 layer-aware training 和 domain reassignment 等策略，让控制能力更好地迁移到真实图像域中。它的亮点在于，不是简单把真实数据和合成数据混在一起微调，而是显式拆分“视觉真实性”和“几何控制能力”，从而减少模型生成合成感画面的倾向。</p>\n<p>实验展示中，Realiz3D 可以用于 text-to-multiview generation 和基于 3D 输入的纹理生成，生成结果既保持多视角一致性，又比普通微调方式更加真实。</p>\n<p><img alt=\"\" src=\"https://pica.zhimg.com/v2-2fdacb3280e7516e52761834ddfe5e9a_1440w.jpg\" /></p>\n<p><strong>02</strong></p>\n<h2></h2>\n<h2><strong><em>*</em>*不只拼生成，底层表征也在进化</strong>****</h2>\n<p>并不是所有 3D 视觉研究都直接以生成完整场景或物体为目标。很多基础工作更关心的是，模型能否学到可靠的空间表征、稳定的局部结构，以及能否在后续 3D 任务中提供更强的底层视觉能力。</p>\n<p>由武汉大学计算机学院和小米 EV 团队提出的《From Pairs to Sequences: Track-Aware Policy Gradients for Keypoint Detection》聚焦的就是 3D 视觉系统中的关键点检测问题，尤其关注 SfM、SLAM 等任务里关键点能否在连续多帧图像中长期稳定地被追踪。</p>\n<p>作者认为，很多现有方法主要基于图像对训练，只优化两张图之间的匹配效果，但在真实序列任务中，更重要的是关键点能不能在多视角、光照变化和运动模糊下持续保持稳定。这篇论文提出的方法叫 TraqPoint，核心是把关键点检测看成一个序列决策问题，并用强化学习中的 policy gradient 来直接优化关键点的长期可追踪性。</p>\n<p><img alt=\"\" src=\"https://pic3.zhimg.com/v2-667114406fb475ccc2913fc5ad15660c_1440w.jpg\" /></p>\n<p>论文链接：<a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/pdf/2602.20630v3\">https://arxiv.org/pdf/2602.20630v3</a></p>\n<p>它不再只判断一个点在两张图里是否好匹配，而是把整段图像序列作为环境，通过 track-aware reward 奖励那些在多帧中既稳定、又具有区分度的关键点。这样训练出来的关键点更倾向于落在结构明显、跨视角一致性强的位置上。</p>\n<p>这篇论文的亮点在于，它把关键点学习从“图像对匹配”推进到了“序列级追踪”，更贴近 SLAM、视觉里程计和 3D 重建等实际应用需求。实验结果也显示，TraqPoint 在相对位姿估计、视觉定位、视觉里程计和 3D 重建等任务上都有较好表现，尤其在序列任务中能带来更长的关键点跟踪长度和更稳定的轨迹估计。</p>\n<p><img alt=\"\" src=\"https://pic1.zhimg.com/v2-242908e7f2e93ed2433daec267cc8382_1440w.jpg\" /></p>\n<p>关键点检测强调的是局部结构在多帧序列中的稳定性，而视觉预训练则进一步追问：模型要获得通用视觉能力，究竟应该依赖什么样的监督信号。FAIR 和香港大学共同提出的《In Pursuit of Pixel Supervision for Visual Pre-training》重新把目光放回像素本身，研究的是视觉预训练中的一个核心问题：</p>\n<p>模型到底应该从哪里获得监督信号。相比现在很常见的 DINO、JEPA 等在 latent space 中学习表征的方法，这篇论文重新强调 pixel supervision 的价值，认为像素本身包含颜色、纹理、材质、几何和语义等多层次信息，因此直接让模型预测被遮挡的像素，也可以学到很强的通用视觉表征。</p>\n<p>这篇论文的亮点在于，它证明了基于像素重建的自监督学习并没有过时，只要任务设计和数据规模足够好，仍然可以和当前强大的 latent-space 方法竞争。</p>\n<p><img alt=\"\" src=\"https://pic3.zhimg.com/v2-95d3de363d16e9ab9ea12e373642ef4c_1440w.jpg\" /></p>\n<p>Pixio 在原始 MAE 的基础上做了几个关键改进，包括使用更大的 mask block 来增加预训练难度、更深的 decoder 来增强像素重建能力、更多的 CLS token 来捕捉不同层次的全局信息，并使用约 2B 张网络图片进行训练，同时通过自筛选策略减少人工数据清洗依赖。</p>\n<p>整体来看，这篇论文的贡献是：重新验证了像素级自监督预训练的潜力。实验显示，Pixio 在单目深度估计、前馈式 3D 重建、语义分割和机器人学习等任务上，能够达到或超过类似规模训练的 DINOv3 表现。</p>\n<p>它说明直接预测像素不仅能学习低层视觉细节，也能帮助模型理解几何、空间结构和语义信息，因此可以作为 latent-space 预训练方法的有力替代和补充。</p>\n<p><img alt=\"\" src=\"https://pic2.zhimg.com/v2-a085c4fb951509dddab5ef6bfb24a6dd_1440w.jpg\" /></p>\n<p><strong>03</strong></p>\n<h2></h2>\n<h2><strong><em>*</em>*从论文到代码，从采集到数据</strong>****</h2>\n<p>模型能力的提升不仅依赖新的网络结构和训练目标，也依赖数据与工具链的完善。一方面，研究者需要更高效地复现已有方法并把论文转化为可运行代码；另一方面，真实世界 3D 视觉任务也需要更高质量、更可控的数据资源。</p>\n<p>UCSD 提出的《NERFIFY: Multi Agent Framework for Turning NeRF Papers into code》对应的是前一个问题，研究的是如何让大语言模型代理自动把 NeRF 相关研究论文转化成可以运行、可以训练的 Nerfstudio 插件代码。</p>\n<p>作者指出，很多 NeRF 论文没有公开代码，研究者往往需要花费很长时间重新实现，而通用的 paper-to-code 方法在这类任务上容易生成不能运行或训练效果很差的代码，因此他们提出了 NERFIFY 这个面向 NeRF 领域的多智能体代码生成框架。</p>\n<p>它的核心思路是把论文解析、依赖恢复、代码生成和训练反馈串成一个自动化流程。系统先将论文内容整理成结构化信息，再利用 Nerfstudio 的架构约束形成类似 CFG 的生成规则，保证生成代码符合基本模块接口。</p>\n<p>随后通过 Graph-of-Thought 多智能体方式按依赖顺序生成多个文件，并自动追踪论文引用中隐藏的关键组件，例如采样器、编码器或 proposal network；最后还会根据训练结果和渲染图像中的问题进行视觉反馈和代码修正。</p>\n<p><img alt=\"\" src=\"https://picx.zhimg.com/v2-9298410c4fbeeb6098cd65281b2240ad_1440w.jpg\" /></p>\n<p>它不是简单让模型“读论文写代码”，而是把 NeRF 领域知识、代码结构约束、引用依赖恢复和视觉质量反馈结合起来，让生成的代码更接近真实可用的研究实现。</p>\n<p>实验中，NERFIFY 在 30 篇不同复杂度的 NeRF 论文上进行评估，对于没有公开实现的论文，它生成的结果可以接近专家手写代码的视觉质量，同时把实现时间从几周缩短到几分钟。</p>\n<p>整体来看，这篇论文的贡献是提出了一种面向复杂视觉论文的领域专用 paper-to-code 框架，目标是降低 NeRF 研究复现和二次开发的门槛。</p>\n<p><img alt=\"\" src=\"https://pic4.zhimg.com/v2-e8199944f7161d36cce513e674f30cb7_1440w.jpg\" /></p>\n<p>如果说 NERFIFY 试图降低研究复现和二次开发的成本，那么 OLATverse 则是在数据层面为逆渲染、重光照和新视角合成等任务补足基础设施。</p>\n<p>由马克斯・普朗克信息学研究所和南京大学共同提出的《OLATverse: A Large-scale Real-world Object Dataset with Precise Lighting Control》研究的是面向逆渲染、重光照、新视角合成和法线估计的真实物体数据集构建问题。</p>\n<p>作者指出，现有很多方法仍然依赖合成数据训练，或者只能在小规模真实数据上评估，导致模型在真实场景中的材质、光照和几何泛化能力受限。为了解决这个问题，论文提出了 OLATverse，一个大规模真实物体数据集，包含 765 个真实物体，并在多视角和精确可控光照条件下采集图像。</p>\n<p>这篇论文的亮点在于，它同时兼顾了真实物体规模、光照控制精度和辅助标注质量。数据采集使用 lightstage 系统，每个物体由 35 个校准相机拍摄，并由 331 个可控光源照明，支持 OLAT、环境光、均匀光和梯度光等多种光照设置。</p>\n<p><img alt=\"\" src=\"https://picx.zhimg.com/v2-fee9c6beb8803434f1f790784a860dd9_1440w.jpg\" /></p>\n<p>同时数据集中还提供相机参数、物体 mask、表面法线和 diffuse albedo 等信息。相比以往很多数据集只强调物体数量，或者只在少量物体上做精细光照采集，OLATverse 的价值在于把“大规模真实物体”和“高精度可控光照”结合起来。</p>\n<p>整体来看，这篇论文的贡献是：提供了一个更贴近真实世界的高质量物体外观数据资源，让模型可以更可靠地学习材质、几何和光照之间的关系。它不仅可以用于训练重光照和生成式先验，也可以作为逆渲染、新视角合成、法线估计等任务的综合 benchmark。</p>\n<p>论文也提到，目前数据中的法线和反照率还不是严格意义上的真实 ground truth，且没有提供真实 mesh，但作为真实世界物体外观和可控光照数据集，它对后续 3D 视觉和图形学研究仍然很有价值。</p>\n<p>这次去 CVPR 现场，一定不要错过</p>\n<p>【认识大牛+赚外快】的机会</p>\n<p>需要你做什么：把你最关注的10个大会报告，每页PPT都拍下来</p>\n<p>你能获得什么？</p>\n<p>认识大牛：你将可以进入CVPR名师博士社群；</p>\n<p>钱多活少：提供丰厚奖金，任务量精简；</p>\n<p>听会自由：你的行程你做主，顺手就把外快赚。拍下你最感兴趣的10个报告PPT即可。</p>\n<p>【限额5位，先到先得】</p>\n<p>//</p>"
    }
  ],
  "graph": {
    "nodes": [
      {
        "id": "nerf",
        "x": 2020,
        "y": 100,
        "category": "representation"
      },
      {
        "id": "mip_nerf",
        "x": 2021,
        "y": 90,
        "category": "representation"
      },
      {
        "id": "instant_ngp",
        "x": 2022,
        "y": 80,
        "category": "representation"
      },
      {
        "id": "plenoxels",
        "x": 2022,
        "y": 110,
        "category": "representation"
      },
      {
        "id": "3dgs",
        "x": 2023,
        "y": 70,
        "category": "representation"
      },
      {
        "id": "hgs",
        "x": 2026,
        "y": 60,
        "category": "representation"
      },
      {
        "id": "dreamfusion",
        "x": 2022,
        "y": 200,
        "category": "optimization"
      },
      {
        "id": "magic3d",
        "x": 2022.5,
        "y": 190,
        "category": "optimization"
      },
      {
        "id": "fantasia3d",
        "x": 2023,
        "y": 210,
        "category": "optimization"
      },
      {
        "id": "prolificdreamer",
        "x": 2023.5,
        "y": 200,
        "category": "optimization"
      },
      {
        "id": "luciddreamer",
        "x": 2023.8,
        "y": 190,
        "category": "optimization"
      },
      {
        "id": "zero123",
        "x": 2023,
        "y": 300,
        "category": "feed_forward"
      },
      {
        "id": "one2345",
        "x": 2023.3,
        "y": 310,
        "category": "feed_forward"
      },
      {
        "id": "mvdream",
        "x": 2024,
        "y": 290,
        "category": "feed_forward"
      },
      {
        "id": "wonder3d",
        "x": 2024.3,
        "y": 300,
        "category": "feed_forward"
      },
      {
        "id": "lrm",
        "x": 2024,
        "y": 320,
        "category": "feed_forward"
      },
      {
        "id": "instant3d",
        "x": 2024.3,
        "y": 330,
        "category": "feed_forward"
      },
      {
        "id": "ilrm",
        "x": 2026,
        "y": 310,
        "category": "feed_forward"
      },
      {
        "id": "vgg_t3",
        "x": 2026.2,
        "y": 320,
        "category": "feed_forward"
      },
      {
        "id": "4d_lrm",
        "x": 2025.8,
        "y": 340,
        "category": "feed_forward"
      },
      {
        "id": "yonosplat",
        "x": 2026.4,
        "y": 300,
        "category": "feed_forward"
      },
      {
        "id": "texture",
        "x": 2023,
        "y": 400,
        "category": "texture"
      },
      {
        "id": "text2tex",
        "x": 2023.5,
        "y": 410,
        "category": "texture"
      },
      {
        "id": "trellis2",
        "x": 2025.8,
        "y": 400,
        "category": "texture"
      },
      {
        "id": "hunyuan3d_21",
        "x": 2026.2,
        "y": 410,
        "category": "texture"
      },
      {
        "id": "dragtex",
        "x": 2026.4,
        "y": 420,
        "category": "texture"
      },
      {
        "id": "ar3dr1",
        "x": 2026,
        "y": 500,
        "category": "native_3d"
      },
      {
        "id": "vist3a",
        "x": 2026.2,
        "y": 510,
        "category": "native_3d"
      },
      {
        "id": "lyra",
        "x": 2026.4,
        "y": 520,
        "category": "native_3d"
      },
      {
        "id": "hunyuan3d_3",
        "x": 2026.3,
        "y": 490,
        "category": "native_3d"
      },
      {
        "id": "seed3d_2",
        "x": 2026.5,
        "y": 500,
        "category": "native_3d"
      },
      {
        "id": "rodin_gen2",
        "x": 2026.6,
        "y": 510,
        "category": "native_3d"
      }
    ],
    "edges": [
      {
        "from": "nerf",
        "to": "mip_nerf",
        "label": "抗锯齿"
      },
      {
        "from": "nerf",
        "to": "instant_ngp",
        "label": "哈希加速"
      },
      {
        "from": "nerf",
        "to": "plenoxels",
        "label": "去神经网络"
      },
      {
        "from": "instant_ngp",
        "to": "3dgs",
        "label": "显式高斯"
      },
      {
        "from": "3dgs",
        "to": "hgs",
        "label": "消除伪影"
      },
      {
        "from": "nerf",
        "to": "dreamfusion",
        "label": "SDS蒸馏"
      },
      {
        "from": "dreamfusion",
        "to": "magic3d",
        "label": "两阶段"
      },
      {
        "from": "dreamfusion",
        "to": "fantasia3d",
        "label": "解耦几何"
      },
      {
        "from": "dreamfusion",
        "to": "prolificdreamer",
        "label": "VSD改进"
      },
      {
        "from": "prolificdreamer",
        "to": "luciddreamer",
        "label": "ISM匹配"
      },
      {
        "from": "zero123",
        "to": "one2345",
        "label": "快速重建"
      },
      {
        "from": "zero123",
        "to": "mvdream",
        "label": "多视图"
      },
      {
        "from": "mvdream",
        "to": "wonder3d",
        "label": "跨域扩散"
      },
      {
        "from": "zero123",
        "to": "lrm",
        "label": "大模型"
      },
      {
        "from": "lrm",
        "to": "instant3d",
        "label": "稀疏视图"
      },
      {
        "from": "lrm",
        "to": "ilrm",
        "label": "迭代细化"
      },
      {
        "from": "ilrm",
        "to": "vgg_t3",
        "label": "TTT扩展"
      },
      {
        "from": "lrm",
        "to": "4d_lrm",
        "label": "4D动态"
      },
      {
        "from": "ilrm",
        "to": "yonosplat",
        "label": "单模型"
      },
      {
        "from": "texture",
        "to": "text2tex",
        "label": "渐进式"
      },
      {
        "from": "text2tex",
        "to": "trellis2",
        "label": "PBR材质"
      },
      {
        "from": "trellis2",
        "to": "hunyuan3d_21",
        "label": "质量提升"
      },
      {
        "from": "hunyuan3d_21",
        "to": "dragtex",
        "label": "交互编辑"
      },
      {
        "from": "luciddreamer",
        "to": "ar3dr1",
        "label": "强化学习"
      },
      {
        "from": "luciddreamer",
        "to": "vist3a",
        "label": "视频蒸馏"
      },
      {
        "from": "vist3a",
        "to": "lyra",
        "label": "自蒸馏"
      },
      {
        "from": "instant3d",
        "to": "hunyuan3d_3",
        "label": "原生分辨率"
      },
      {
        "from": "hunyuan3d_3",
        "to": "seed3d_2",
        "label": "DiT架构"
      },
      {
        "from": "seed3d_2",
        "to": "rodin_gen2",
        "label": "拓扑优化"
      }
    ],
    "milestones": [
      {
        "id": "nerf",
        "title": "NeRF开创神经隐式表示",
        "year": "2020",
        "desc": "提出神经辐射场概念，利用MLP和体渲染实现照片级新视角合成，开启神经渲染时代"
      },
      {
        "id": "dreamfusion",
        "title": "DreamFusion打通2D到3D",
        "year": "2022",
        "desc": "提出分数蒸馏采样(SDS)，利用2D扩散模型先验优化3D表示，开创文生3D现代范式"
      },
      {
        "id": "3dgs",
        "title": "3DGS革新实时渲染",
        "year": "2023",
        "desc": "显式3D高斯泼溅实现100+FPS实时渲染，取代NeRF成为2026年主流表征方法"
      }
    ]
  },
  "algos": [
    {
      "id": "nerf",
      "num": 1,
      "name": "NeRF",
      "fullName": "神经辐射场 (Neural Radiance Fields)",
      "year": "2020",
      "org": "UC Berkeley",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2003.08934",
      "projectUrl": "",
      "category": "representation",
      "motivation": "MLP+体渲染实现连续隐式表示",
      "summary": "NeRF 的核心目标是：MLP+体渲染实现连续隐式表示。",
      "keyPoints": [
        "核心动机：MLP+体渲染实现连续隐式表示",
        "代表机构：UC Berkeley"
      ],
      "detail": "<p><strong>核心示意图/框架图</strong></p>\n<div class=\"img-wrap\"><img src=\"https://ar5iv.labs.arxiv.org/html/2003.08934/assets/x2.png\" alt=\"NeRF rendering pipeline\" loading=\"lazy\"><p class=\"img-caption\">▲ NeRF rendering pipeline</p></div>\n<p>NeRF 的主线是“相机射线采样 -&gt; MLP 查询密度和颜色 -&gt; 体渲染积分 -&gt; 像素级监督”。对一条射线 $\\mathbf{r}(t)=\\mathbf{o}+t\\mathbf{d}$，连续体渲染写作：</p>\n<div class=\"kb-math kb-math-display\">C(\\mathbf{r})=\\int_{t_n}^{t_f}T(t)\\sigma(\\mathbf{r}(t))\\mathbf{c}(\\mathbf{r}(t),\\mathbf{d})dt,\\quad\nT(t)=\\exp\\left(-\\int_{t_n}^{t}\\sigma(\\mathbf{r}(s))ds\\right).</div>\n<p>离散实现中，把射线分成 $N$ 个样本，令 $\\alpha_i=1-\\exp(-\\sigma_i\\delta_i)$，权重为 $w_i=T_i\\alpha_i$，最终颜色为 $\\hat{C}(\\mathbf{r})=\\sum_i w_i\\mathbf{c}_i$。这个公式让密度既影响遮挡也影响几何边界，梯度可以从像素误差反传到每个采样点。</p>\n<p><strong>算法伪代码</strong></p>\n<pre><code class=\"language-python\">for step in training_steps:\n    rays, target_rgb = sample_camera_rays(images, poses)\n    z_coarse = stratified_samples(rays, near, far, N_coarse)\n    x = rays.o[:, None] + z_coarse[..., None] * rays.d[:, None]\n    sigma, rgb = mlp(posenc(x), posenc(rays.d))\n    rgb_coarse, weights = volume_render(sigma, rgb, z_coarse)\n\n    z_fine = importance_samples(z_coarse, weights, N_fine)\n    sigma_f, rgb_f = mlp(posenc(points(rays, z_fine)), posenc(rays.d))\n    rgb_fine, _ = volume_render(sigma_f, rgb_f, z_fine)\n\n    loss = mse(rgb_coarse, target_rgb) + mse(rgb_fine, target_rgb)\n    loss.backward()\n    optimizer.step()\n</code></pre>\n<p>位置编码是 NeRF 成功的必要条件之一。原始坐标直接输入 MLP 时，网络倾向先拟合低频函数，细纹理和锐边界会被平滑掉；NeRF 使用</p>\n<div class=\"kb-math kb-math-display\">\\gamma(p)=\\left(\\sin(2^0\\pi p),\\cos(2^0\\pi p),\\dots,\\sin(2^{L-1}\\pi p),\\cos(2^{L-1}\\pi p)\\right)</div>\n<p>把坐标展开到多频空间，使小 MLP 也能表达高频变化。论文还把坐标和方向分开处理：密度只依赖位置，颜色在较深层再注入方向，这个归纳偏置避免几何随视角漂移。</p>\n<p>分层采样解决的是计算预算问题。coarse 网络先在整条射线上粗采样，估计哪些深度段有较高权重；fine 网络再按权重分布重采样，让查询集中在物体表面附近。这个过程不是显式三角网格重建，而是在优化一个可微渲染器；因此 NeRF 很适合新视角合成，但提取可编辑几何还需要后处理。</p>"
    },
    {
      "id": "mip_nerf",
      "num": 2,
      "name": "Mip-NeRF",
      "fullName": "抗锯齿神经辐射场 (Mip-NeRF)",
      "year": "2021",
      "org": "Google Research",
      "parent": "nerf",
      "paperUrl": "https://arxiv.org/abs/2103.13415",
      "projectUrl": "",
      "category": "representation",
      "motivation": "集成位置编码解决多尺度渲染",
      "summary": "Mip-NeRF 的核心目标是：集成位置编码解决多尺度渲染。",
      "keyPoints": [
        "核心动机：集成位置编码解决多尺度渲染",
        "演化来源：继承或改进自 nerf",
        "代表机构：Google Research"
      ],
      "detail": "<p><strong>核心示意图/框架图</strong></p>\n<div class=\"img-wrap\"><img src=\"https://ar5iv.labs.arxiv.org/html/2103.13415/assets/x1.png\" alt=\"Mip-NeRF cone tracing and integrated positional encoding\" loading=\"lazy\"><p class=\"img-caption\">▲ Mip-NeRF cone tracing and integrated positional encoding</p></div>\n<p>Mip-NeRF 的关键观察是：一个像素不是一条数学射线，而是一个随深度扩张的圆锥。若仍只在圆锥中心线上采点，模型会被迫解释超过采样带宽的高频信号，训练视图和测试视图尺度不一致时就会出现闪烁、摩尔纹和模糊。</p>\n<p>论文用多元高斯近似圆台区间，并对位置编码取期望。对一维高斯 $x\\sim\\mathcal{N}(\\mu,\\sigma^2)$，有：</p>\n<div class=\"kb-math kb-math-display\">\\mathbb{E}[\\sin(\\omega x)]=\\exp\\left(-\\frac{1}{2}\\omega^2\\sigma^2\\right)\\sin(\\omega\\mu),\n\\quad\n\\mathbb{E}[\\cos(\\omega x)]=\\exp\\left(-\\frac{1}{2}\\omega^2\\sigma^2\\right)\\cos(\\omega\\mu).</div>\n<p>这个衰减项很重要：当像素足迹很大、方差很大时，高频项自动被压低；当足迹很小、方差接近 0 时，IPE 退化为普通位置编码。</p>\n<p><strong>算法伪代码</strong></p>\n<pre><code class=\"language-python\">for rays in training_batches:\n    # 每条像素射线带有 cone radius，采样得到一串圆台区间\n    intervals = sample_conical_frustums(rays, near, far)\n    gaussians = [approximate_frustum_as_gaussian(f) for f in intervals]\n\n    encoded = [integrated_positional_encoding(mu, cov) for mu, cov in gaussians]\n    sigma, rgb = nerf_mlp(encoded, viewdirs=rays.d)\n    pred_rgb = volume_render(sigma, rgb, intervals.depths)\n\n    loss = mse(pred_rgb, rays.target_rgb)\n    update(loss)\n</code></pre>\n<p>从方法上看，Mip-NeRF 不是简单的采样数增加，而是改变了输入信号的数学对象：从 $\\mathbf{x}$ 变为 $(\\boldsymbol{\\mu},\\boldsymbol{\\Sigma})$。这让网络看到的是“区域平均后的特征”，相当于内置了随尺度变化的低通滤波器。相比先渲染再做图像空间抗锯齿，Mip-NeRF 的滤波发生在辐射场查询之前，因此能减少错误几何和错误纹理被学进去。</p>\n<p>另一个容易忽略的点是 Mip-NeRF 保持了 NeRF 的可微体渲染损失，因此可直接接入多视角重建流程。它的贡献主要在表示与采样层，而不是引入新的监督。后续 Zip-NeRF、Mip-NeRF 360 等工作继续沿着“区域编码 + 高效结构”的路线扩展大场景和无界场景。</p>"
    },
    {
      "id": "instant_ngp",
      "num": 3,
      "name": "Instant-NGP",
      "fullName": "即时神经图形基元 (Instant Neural Graphics Primitives)",
      "year": "2022",
      "org": "NVIDIA",
      "parent": "nerf",
      "paperUrl": "https://arxiv.org/abs/2201.05989",
      "projectUrl": "",
      "category": "representation",
      "motivation": "哈希编码将训练加速1000倍",
      "summary": "Instant-NGP 的核心目标是：哈希编码将训练加速1000倍。",
      "keyPoints": [
        "核心动机：哈希编码将训练加速1000倍",
        "演化来源：继承或改进自 nerf",
        "代表机构：NVIDIA"
      ],
      "detail": "<p><strong>核心示意图/框架图</strong></p>\n<div class=\"img-wrap\"><img src=\"https://ar5iv.labs.arxiv.org/html/2201.05989/assets/Figures/teaser/nerf_00.jpg\" alt=\"Instant-NGP neural graphics primitives comparison\" loading=\"lazy\"><p class=\"img-caption\">▲ Instant-NGP neural graphics primitives comparison</p></div>\n<p>论文的核心模块是 multiresolution hash encoding。给定归一化坐标 $\\mathbf{x}$，第 $l$ 层把它缩放到分辨率 $N_l$ 的网格，取周围 $2^d$ 个顶点；每个整数顶点通过哈希函数映射到大小为 $T$ 的特征表，取出特征后做线性/三线性插值。所有层的插值特征拼接成 $\\mathrm{enc}(\\mathbf{x};\\theta)$：</p>\n<div class=\"kb-math kb-math-display\">N_l=\\left\\lfloor N_{\\min} b^l \\right\\rfloor,\\quad\n\\mathbf{y}=\\mathrm{MLP}\\left([\\mathrm{interp}_1(\\mathbf{x}),\\dots,\\mathrm{interp}_L(\\mathbf{x})]\\right).</div>\n<p>哈希表大小 $T$ 控制内存和冲突。粗层通常几乎无冲突，保证全局一致性；细层冲突多但只影响高频细节，且不同空间点在其他层的上下文不同，小 MLP 可以学习把冲突影响分开。</p>\n<p><strong>算法伪代码</strong></p>\n<pre><code class=\"language-python\">def hash_grid_encode(x):\n    features = []\n    for level in range(L):\n        x_l = x * resolution(level)\n        corners, weights = grid_corners_and_weights(x_l)\n        f_l = 0\n        for corner, w in zip(corners, weights):\n            index = spatial_hash(corner) % table_size(level)\n            f_l += w * hash_table[level][index]\n        features.append(f_l)\n    return concat(features)\n\nfor rays, rgb_gt in batches:\n    z = sample_with_occupancy_grid(rays)\n    enc = hash_grid_encode(points(rays, z))\n    sigma, color = tiny_mlp(enc, viewdirs=rays.d)\n    rgb = volume_render(sigma, color, z)\n    update(mse(rgb, rgb_gt))\n</code></pre>\n<p>Instant-NGP 的贡献既是表示，也是系统设计。哈希网格提供高容量局部特征，tiny MLP 降低每次查询的计算量；occupancy grid 周期性记录哪些空间块可能非空，渲染时跳过空区域，减少无效采样。三者结合后，速度提升不是来自单一技巧，而是查询次数、每次查询成本和 GPU kernel overhead 同时下降。</p>\n<p>与 Plenoxels 等纯显式体素方法相比，Instant-NGP 仍保留了神经解码器，因此能在固定内存下共享统计规律；与原始 NeRF 相比，它更依赖工程优化和 GPU 友好结构。后续大量 3D 生成系统把 hash grid 当成默认 NeRF backbone，正是因为它把“逐场景优化”从小时级推进到分钟甚至秒级。</p>"
    },
    {
      "id": "plenoxels",
      "num": 4,
      "name": "Plenoxels",
      "fullName": "光场体素 (Plenoxels)",
      "year": "2022",
      "org": "UC Berkeley",
      "parent": "nerf",
      "paperUrl": "https://arxiv.org/abs/2112.05131",
      "projectUrl": "",
      "category": "representation",
      "motivation": "稀疏体素+球谐函数无需神经网络",
      "summary": "Plenoxels 的核心目标是：稀疏体素+球谐函数无需神经网络。",
      "keyPoints": [
        "核心动机：稀疏体素+球谐函数无需神经网络",
        "演化来源：继承或改进自 nerf",
        "代表机构：UC Berkeley"
      ],
      "detail": "<p><strong>核心示意图/框架图</strong></p>\n<div class=\"img-wrap\"><img src=\"https://ar5iv.labs.arxiv.org/html/2112.05131/assets/x1.png\" alt=\"Plenoxels sparse voxel radiance field\" loading=\"lazy\"><p class=\"img-caption\">▲ Plenoxels sparse voxel radiance field</p></div>\n<p>Plenoxels 的“Plenoptic Voxels”把辐射场拆成两个显式表：密度网格和颜色基函数系数网格。给定空间点 $\\mathbf{x}$，先在稀疏体素结构中插值得到 $\\sigma(\\mathbf{x})$ 和一组球谐系数 $\\mathbf{k}_{lm}(\\mathbf{x})$；给定方向 $\\mathbf{d}$，颜色由球谐基展开：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{c}(\\mathbf{x},\\mathbf{d})=\\sum_{l=0}^{L}\\sum_{m=-l}^{l}\\mathbf{k}_{lm}(\\mathbf{x})Y_{lm}(\\mathbf{d}).</div>\n<p>这样，视角相关外观由方向基函数表达，空间变化由体素参数表达。渲染仍然使用 NeRF 同款 alpha compositing，因此训练损失可以保持为像素重建误差。</p>\n<p><strong>算法伪代码</strong></p>\n<pre><code class=\"language-python\">initialize_sparse_voxels()\nfor step in training_steps:\n    rays, target = sample_rays(images, poses)\n    samples = sample_points_along_rays(rays)\n\n    sigma = trilinear_interpolate(density_grid, samples.xyz)\n    sh_coef = trilinear_interpolate(sh_grid, samples.xyz)\n    rgb = evaluate_spherical_harmonics(sh_coef, samples.viewdir)\n    pred = volume_render(sigma, rgb, samples.depth)\n\n    loss = mse(pred, target)\n    loss += lambda_tv * total_variation(density_grid, sh_grid)\n    loss += lambda_sparsity * sparsity_regularizer(density_grid)\n    update_voxel_values(loss)\n    prune_low_density_voxels()\n</code></pre>\n<p>Plenoxels 的重要意义在于把“NeRF 的效果”与“必须使用神经网络”解耦。NeRF 的核心其实是可微体渲染和多视角监督，MLP 只是其中一种连续函数参数化。Plenoxels 用显式网格换来更直接的优化：梯度更新落在局部体素上，因此收敛快；但也更依赖网格分辨率和剪枝策略。</p>\n<p>正则化是这篇论文能工作的关键。没有 TV 约束时，显式体素很容易把每个训练视角的误差记成孤立噪声；TV 让相邻体素的密度和颜色系数平滑变化，稀疏正则推动空区域密度变小。它也提示后续方法：显式结构需要强约束，隐式结构则把一部分平滑性藏在网络架构和编码中。</p>"
    },
    {
      "id": "3dgs",
      "num": 5,
      "name": "3D-GS",
      "fullName": "3D高斯泼溅 (3D Gaussian Splatting)",
      "year": "2023",
      "org": "INRIA",
      "parent": "instant_ngp",
      "paperUrl": "https://arxiv.org/abs/2308.04079",
      "projectUrl": "",
      "category": "representation",
      "motivation": "显式高斯实现100+FPS实时渲染",
      "summary": "3D-GS 的核心目标是：显式高斯实现100+FPS实时渲染。",
      "keyPoints": [
        "核心动机：显式高斯实现100+FPS实时渲染",
        "演化来源：继承或改进自 instant_ngp",
        "代表机构：INRIA"
      ],
      "detail": "<p><strong>核心示意图/框架图</strong></p>\n<div class=\"img-wrap\"><img src=\"https://ar5iv.labs.arxiv.org/html/2308.04079/assets/x2.png\" alt=\"3D Gaussian Splatting method overview\" loading=\"lazy\"><p class=\"img-caption\">▲ 3D Gaussian Splatting method overview</p></div>\n<p>3DGS 的每个高斯可写为：</p>\n<div class=\"kb-math kb-math-display\">G(\\mathbf{x})=\\exp\\left(-\\frac{1}{2}(\\mathbf{x}-\\boldsymbol{\\mu})^\\top\\Sigma^{-1}(\\mathbf{x}-\\boldsymbol{\\mu})\\right),</div>\n<p>其中协方差用旋转 $R$ 和尺度 $S$ 参数化为 $\\Sigma=RSS^\\top R^\\top$，以保证半正定。颜色常用球谐系数表达方向相关外观，不透明度 $\\alpha$ 控制该高斯对像素的贡献。</p>\n<p>渲染时，高斯经相机投影近似为 2D 协方差：</p>\n<div class=\"kb-math kb-math-display\">\\Sigma&#x27; = J W \\Sigma W^\\top J^\\top,</div>\n<p>其中 $W$ 是视图变换，$J$ 是投影雅可比。对每个 tile 收集可能覆盖的高斯，按深度排序，再执行前向 alpha compositing。</p>\n<p><strong>算法伪代码</strong></p>\n<pre><code class=\"language-python\">gaussians = initialize_from_sfm_points(point_cloud)\nfor step in training_steps:\n    camera, target = sample_view()\n    visible = project_gaussians_to_tiles(gaussians, camera)\n    pred = rasterize_sorted_gaussian_splats(visible, camera)\n\n    loss = l1(pred, target) + lambda_dssim * dssim(pred, target)\n    update_gaussian_params(loss)\n\n    if step % densify_interval == 0:\n        clone_high_gradient_small_gaussians(gaussians)\n        split_high_gradient_large_gaussians(gaussians)\n        prune_low_opacity_or_huge_gaussians(gaussians)\n</code></pre>\n<p>3DGS 的关键不只是“用高斯”，而是把表示、初始化、优化和光栅化合成一个闭环。SfM 点云给出合理的初始几何位置；高斯的各向异性尺度让一个 primitive 能覆盖面片状结构；自适应 densification 在欠拟合区域增加容量；tile-based renderer 让 GPU 可以高效处理大量 splat。</p>\n<p>相比 NeRF，3DGS 避免了沿射线密集采样，也不需要对每个采样点跑 MLP，因此渲染速度数量级提升。但它的显式 primitive 也带来新问题：高斯可能变得过大、过细或漂浮，边缘处可能出现半透明晕影。后续 HGS、2DGS、MCMC densification 等工作大多围绕这些 artifact 和几何一致性继续改进。</p>"
    },
    {
      "id": "hgs",
      "num": 6,
      "name": "HGS",
      "fullName": "硬高斯泼溅 (Hard Gaussian Splatting)",
      "year": "2026.01",
      "org": "AAAI",
      "parent": "3dgs",
      "paperUrl": "https://arxiv.org/abs/2601.05000",
      "projectUrl": "",
      "category": "representation",
      "motivation": "解决模糊和针状伪影问题",
      "summary": "HGS 的核心目标是：解决模糊和针状伪影问题。",
      "keyPoints": [
        "核心动机：解决模糊和针状伪影问题",
        "演化来源：继承或改进自 3dgs",
        "代表机构：AAAI"
      ],
      "detail": "<p><strong>核心示意图/框架图</strong></p>\n<div class=\"img-wrap\"><img src=\"https://ar5iv.labs.arxiv.org/html/2412.04826/assets/x2.png\" alt=\"Hard Gaussian Splatting artifact analysis\" loading=\"lazy\"><p class=\"img-caption\">▲ Hard Gaussian Splatting artifact analysis</p></div>\n<p>HGS 关注的是 3DGS 的一个结构性矛盾：高斯越软，优化越平滑、越容易覆盖空洞；但软尾会把颜色和透明度扩散到真实表面之外，特别是在边缘、细杆、薄片等区域。若优化为了拟合细节把高斯拉成长针状，又会带来不稳定的投影椭圆和异常 splat。</p>\n<p>论文题目中的 “Hard” 可以理解为限制或重塑高斯对像素的有效贡献区域，使一个 primitive 更像局部表面元素而不是无限扩散的半透明云。渲染误差引导的增长则把 densification 从“只看参数梯度”推进到“看图像残差在哪里没有被解释”。这能减少平均化增长：不是在已有高斯附近盲目 clone，而是在错误高、结构缺失的位置补容量。</p>\n<p><strong>算法伪代码</strong></p>\n<pre><code class=\"language-python\">gaussians = initialize_like_3dgs(sfm_points)\nfor step in training_steps:\n    camera, target = sample_training_view()\n    pred, visibility = hard_gaussian_rasterize(gaussians, camera)\n    residual = abs(pred - target)\n\n    loss = photometric_loss(pred, target) + regularize_shape_and_opacity(gaussians)\n    update_gaussians(loss)\n\n    if should_grow(step):\n        error_regions = find_high_residual_regions(residual, visibility)\n        add_or_split_gaussians_at(error_regions, gaussians)\n        suppress_degenerate_needle_gaussians(gaussians)\n        prune_low_contribution_gaussians(gaussians)\n</code></pre>\n<p>从 3DGS 的 alpha compositing 看，一个高斯的屏幕贡献近似是 $\\alpha_i G_i(\\mathbf{u})$，软尾意味着 $G_i(\\mathbf{u})$ 在远离中心时仍有非零贡献。HGS 类方法会通过截断、重加权或硬化 kernel 的方式降低远尾影响，使边界像素不再被背后或旁边的高斯“染色”。这对 thin structures 尤其重要，因为细结构的像素覆盖面积小，软尾平均会迅速吞掉局部对比度。</p>\n<p>HGS 的工程意义在于：3DGS 的实时性已经很好，下一阶段主要瓶颈转向几何质量和 artifact 控制。硬化 kernel 可能牺牲一部分优化平滑性，因此需要和误差引导增长、形状正则、剪枝策略配套使用。它不是替换 3DGS 的整体框架，而是对显式 Gaussian primitive 的有效支持域和密度控制进行修正。</p>"
    },
    {
      "id": "dreamfusion",
      "num": 7,
      "name": "DreamFusion",
      "fullName": "梦境融合 (DreamFusion)",
      "year": "2022",
      "org": "Google Research",
      "parent": "nerf",
      "paperUrl": "https://arxiv.org/abs/2209.14988",
      "projectUrl": "",
      "category": "optimization",
      "motivation": "提出SDS Loss开创文生3D范式",
      "summary": "DreamFusion 的核心目标是：提出SDS Loss开创文生3D范式。",
      "keyPoints": [
        "核心动机：提出SDS Loss开创文生3D范式",
        "演化来源：继承或改进自 nerf",
        "代表机构：Google Research"
      ],
      "detail": "<p><strong>核心示意图/框架图</strong></p>\n<div class=\"img-wrap\"><img src=\"https://ar5iv.labs.arxiv.org/html/2209.14988/assets/x1.png\" alt=\"DreamFusion text-to-3D examples and pipeline context\" loading=\"lazy\"><p class=\"img-caption\">▲ DreamFusion text-to-3D examples and pipeline context</p></div>\n<p>DreamFusion 的关键是把“采样扩散图像”改写成“优化一个可微图像生成器”。令 3D 参数为 $\\theta$，随机相机为 $c$，可微渲染得到图像 $x=g(\\theta,c)$。扩散模型在噪声步 $t$ 上看到 $x_t=\\alpha_t x+\\sigma_t\\epsilon$，并预测噪声 $\\hat{\\epsilon}_\\phi(x_t,t,y)$。SDS 使用近似梯度：</p>\n<div class=\"kb-math kb-math-display\">\\nabla_\\theta \\mathcal{L}_{\\text{SDS}}\n=\n\\mathbb{E}_{t,\\epsilon,c}\\left[\nw(t)\\left(\\hat{\\epsilon}_\\phi(x_t,t,y)-\\epsilon\\right)\n\\frac{\\partial x}{\\partial \\theta}\n\\right].</div>\n<p>这个梯度不需要反传穿过扩散 U-Net 的所有内部计算，只把 U-Net 输出当作一个图像空间更新方向。直观上，如果当前渲染图加噪后不像 prompt 对应的自然图像，扩散模型会指出应该往哪个方向去噪；NeRF 渲染器再把这个方向传回密度和颜色。</p>\n<p><strong>算法伪代码</strong></p>\n<pre><code class=\"language-python\">theta = initialize_nerf()\ndiffusion = frozen_text_to_image_model()\nfor step in range(num_steps):\n    cam = sample_random_camera()\n    image = render_nerf(theta, cam)\n    t = sample_diffusion_timestep()\n    eps = normal_like(image)\n    x_t = alpha[t] * image + sigma[t] * eps\n\n    eps_hat = diffusion.predict_noise(x_t, t, text_prompt, guidance_scale=large)\n    grad_image = weight(t) * (eps_hat - eps)\n    backprop_to_nerf(image, grad_image)\n    apply_geometry_regularizers(theta)\n</code></pre>\n<p>DreamFusion 还加入了面向 3D 的工程约束，例如随机视角采样、前景/背景处理、法线与深度相关正则，以及鼓励表面朝向相机的 orientation loss。没有这些约束时，SDS 很容易只优化出能骗过单视角扩散模型的纹理云，而不是闭合、可旋转的物体。</p>\n<p>这篇论文的历史价值大于其最终视觉质量：它证明了强 2D 扩散模型可以作为通用 3D 先验，开创了 text-to-3D 的 optimization-based 路线。后续 Magic3D、Fantasia3D、ProlificDreamer、MVDream 等工作基本都在回答两个问题：如何改进 SDS 的梯度质量，以及如何换更强、更快、更可编辑的 3D 表示。</p>"
    },
    {
      "id": "magic3d",
      "num": 8,
      "name": "Magic3D",
      "fullName": "魔法3D (Magic3D)",
      "year": "2022",
      "org": "NVIDIA",
      "parent": "dreamfusion",
      "paperUrl": "https://arxiv.org/abs/2211.10440",
      "projectUrl": "",
      "category": "optimization",
      "motivation": "两阶段粗到精提升分辨率",
      "summary": "Magic3D 提出了一种两阶段粗到细（coarse-to-fine）的文本到3D生成框架，第一阶段使用基于哈希网格的神经辐射场在低分辨率下快速建立粗糙几何，第二阶段切换为可微分光栅化的纹理网格并借助潜在扩散模型在高分辨率下精细优化，在比 DreamFusion 快 2 倍的同时显著提升了生成质量。",
      "keyPoints": [
        "<strong>两阶段场景表示</strong>：粗阶段采用 Instant NGP 哈希网格编码 + 体渲染（64×64），细阶段采用 DMTet 可变形四面体网格 + 可微光栅化（512×512）",
        "<strong>两阶段扩散先验</strong>：粗阶段使用 eDiff-I 基础扩散模型（像素空间，64×64），细阶段使用 Stable Diffusion 潜在扩散模型（潜空间 64×64，对应图像 512×512）",
        "<strong>SDS 损失扩展</strong>：将 DreamFusion 的 Score Distillation Sampling 扩展到潜在扩散模型，通过链式法则引入编码器梯度 <span class=\"kb-math kb-math-inline\">\\partial z / \\partial x</span>",
        "<strong>高效稀疏表示</strong>：利用八叉树空间跳跃和密度体素剪枝加速体渲染，MLP 预测法线代替有限差分以降低计算开销",
        "<strong>密度到 SDF 转换</strong>：通过减去非零常数将粗阶段密度场转换为 SDF，实现从神经场到网格的无缝初始化",
        "<strong>可控3D生成</strong>：支持 DreamBooth 个性化、基于 prompt 的编辑和图像风格迁移",
        "<strong>性能</strong>：总优化时间 40 分钟（8×A100），比 DreamFusion 快 2 倍，用户偏好率 61.7%"
      ],
      "detail": "<h5>框架总览</h5>\n<p><img alt=\"Magic3D 两阶段框架\" src=\"https://ar5iv.labs.arxiv.org/html/2211.10440/assets/figs/overview.png\" />\n<em>图：Magic3D 的两阶段粗到细优化框架。第一阶段使用低分辨率扩散先验优化稀疏神经辐射场；第二阶段将其转换为纹理网格，使用高分辨率潜在扩散模型进行精细优化。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># Magic3D 两阶段优化伪代码\n\n# ========== Stage 1: Coarse (Neural Field) ==========\n# 场景模型: Instant NGP hash grid + 两个单层MLP (albedo/density + normals)\n# 扩散先验: eDiff-I base model (64×64 像素空间)\ninit_occupancy_grid(resolution=256^3, value=20)\n\nfor iter in range(5000):\n    camera = sample_random_camera()\n    x = render_volume(hash_grid, camera, resolution=64)  # 体渲染\n    t = sample_timestep()\n    epsilon = sample_noise()\n    x_t = add_noise(x, epsilon, t)\n\n    # SDS 梯度 (Eq. 1)\n    eps_pred = diffusion_model(x_t, text_embed, t)\n    grad_SDS = w(t) * (eps_pred - epsilon) * dx/dtheta\n    update(hash_grid, grad_SDS)\n\n    if iter % 10 == 0:\n        update_occupancy_grid(decay=0.6)\n\n# ========== Stage 2: Fine (Textured Mesh) ==========\n# 场景模型: DMTet mesh + neural color field\n# 扩散先验: Stable Diffusion LDM (latent 64×64 → image 512×512)\nsdf = density_field - constant  # 密度→SDF转换\nmesh = marching_tetrahedra(sdf, deformations)\ntexture = coarse_color_field  # 继承粗阶段颜色场\n\nfor iter in range(3000):\n    camera = sample_random_camera(zoom_in=True)  # 增大焦距\n    x = rasterize(mesh, texture, camera, resolution=512)  # 可微光栅化\n    z = LDM_encoder(x)  # 编码到潜空间\n    t = sample_timestep()\n    epsilon = sample_noise()\n    z_t = add_noise(z, epsilon, t)\n\n    # LDM SDS 梯度 (Eq. 2)\n    eps_pred = LDM(z_t, text_embed, t)\n    grad_SDS = w(t) * (eps_pred - epsilon) * dz/dx * dx/dtheta\n\n    # 更新 SDF 值 s_i、顶点偏移 Δv_i 和纹理\n    update(mesh_sdf, mesh_deform, texture, grad_SDS)\n\n    # 面法线平滑正则化\n    smooth_loss = angular_diff_adjacent_faces(mesh)\n    update(mesh, smooth_loss)\n</code></pre>\n<h5>动机与背景</h5>\n<p>DreamFusion 首次证明了利用预训练 2D 扩散模型的先验知识，通过 Score Distillation Sampling (SDS) 损失优化 3D 场景表示的可行性。然而，DreamFusion 存在两个关键限制：</p>\n<ol>\n<li><strong>分辨率瓶颈</strong>：其扩散模型（Imagen base model）仅在 64×64 分辨率下操作，无法生成高分辨率几何和纹理</li>\n<li><strong>计算效率低</strong>：基于 Mip-NeRF 360 的大型全局 MLP 进行体渲染计算昂贵且内存密集，难以扩展到高分辨率图像</li>\n</ol>\n<p>Magic3D 的核心思想是：<strong>将问题分解为两个阶段，每个阶段使用最适合其需求的场景表示和扩散先验</strong>。</p>\n<h5>核心机制详解</h5>\n<p><strong>1. Score Distillation Sampling (SDS)</strong></p>\n<p>SDS 的核心思想是利用预训练扩散模型作为评判者，引导 3D 场景的优化。给定场景参数 <span class=\"kb-math kb-math-inline\">\\theta</span>，渲染函数 <span class=\"kb-math kb-math-inline\">g(\\theta)</span> 生成图像 <span class=\"kb-math kb-math-inline\">x</span>，SDS 梯度为：</p>\n<div class=\"kb-math kb-math-display\">\\nabla_{\\theta}\\mathcal{L}_{\\text{SDS}}(\\phi, g(\\theta)) = \\mathbb{E}_{t,\\epsilon}\\left[w(t)(\\epsilon_{\\phi}(x_t; y, t) - \\epsilon)\\frac{\\partial x}{\\partial \\theta}\\right]</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\epsilon_{\\phi}</span> 是扩散模型的噪声预测网络，<span class=\"kb-math kb-math-inline\">y</span> 是文本嵌入，<span class=\"kb-math kb-math-inline\">w(t)</span> 是权重函数。直觉上，SDS 梯度将渲染图像\"推向\"扩散模型认为在给定文本条件下概率密度高的区域。</p>\n<div class=\"key-point\">💡 <strong>关键</strong>：SDS 不需要对扩散模型本身进行反向传播（U-Net 梯度被截断），只需要其预测的噪声方向来指导场景参数的更新。</div>\n<p><strong>2. 潜在扩散模型的 SDS 扩展</strong></p>\n<p>在细阶段，Magic3D 使用 Stable Diffusion（一种潜在扩散模型 LDM）。LDM 在潜空间 <span class=\"kb-math kb-math-inline\">z</span> 而非像素空间 <span class=\"kb-math kb-math-inline\">x</span> 上操作，因此 SDS 梯度需要通过编码器的链式法则：</p>\n<div class=\"kb-math kb-math-display\">\\nabla_{\\theta}\\mathcal{L}_{\\text{SDS}}(\\phi, g(\\theta)) = \\mathbb{E}_{t,\\epsilon}\\left[w(t)(\\epsilon_{\\phi}(z_t; y, t) - \\epsilon)\\frac{\\partial z}{\\partial x}\\frac{\\partial x}{\\partial \\theta}\\right]</div>\n<div class=\"key-point\">💡 <strong>关键</strong>：尽管输出图像分辨率为 512×512，扩散模型的计算仍在 64×64 的潜空间进行，计算量的增加主要来自高分辨率图像的渲染梯度 <span class=\"kb-math kb-math-inline\">\\partial x / \\partial \\theta</span> 和编码器梯度 <span class=\"kb-math kb-math-inline\">\\partial z / \\partial x</span>。</div>\n<p><strong>3. 粗阶段：哈希网格神经场</strong></p>\n<p>粗阶段采用 Instant NGP 的多分辨率哈希网格编码替代 Mip-NeRF 360 的大型 MLP，大幅降低计算成本。具体设计包括：</p>\n<ul>\n<li><strong>双 MLP 架构</strong>：一个单层 MLP 预测 albedo 和密度，另一个预测法线。使用 MLP 直接预测法线而非通过有限差分估计，显著减少计算开销</li>\n<li><strong>稀疏加速</strong>：维护 256³ 分辨率的占用网格，每 10 次迭代更新（衰减因子 0.6），构建八叉树进行空间跳跃</li>\n<li><strong>环境贴图</strong>：使用极小的 MLP（隐藏维度 16）建模背景，学习率降低 10 倍，防止模型将物体信息\"泄漏\"到背景中</li>\n</ul>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：MLP 预测的法线在体渲染中不需要严格对齐等值面法线，因为体渲染中粒子的朝向是连续位置上的属性。精确法线在细阶段的真实表面渲染中自然获得。</div>\n<p><strong>4. 细阶段：可变形四面体网格</strong></p>\n<p>细阶段使用 DMTet（Deformable Marching Tetrahedra）表示 3D 形状：</p>\n<ul>\n<li><strong>几何表示</strong>：在四面体网格 <span class=\"kb-math kb-math-inline\">(V_T, T)</span> 的每个顶点 <span class=\"kb-math kb-math-inline\">\\mathbf{v}_i</span> 上存储 SDF 值 <span class=\"kb-math kb-math-inline\">s_i \\in \\mathbb{R}</span> 和顶点偏移 <span class=\"kb-math kb-math-inline\">\\Delta\\mathbf{v}_i \\in \\mathbb{R}^3</span></li>\n<li><strong>网格提取</strong>：通过可微分 Marching Tetrahedra 算法从 SDF 提取表面网格</li>\n<li><strong>纹理表示</strong>：使用粗阶段的神经颜色场作为体积纹理</li>\n<li><strong>初始化</strong>：将粗阶段的密度场减去非零常数转换为初始 SDF</li>\n</ul>\n<p>关键优化技巧：\n- <strong>焦距放大</strong>：渲染时增大焦距以放大物体细节，这是恢复高频细节的关键步骤\n- <strong>面平滑正则化</strong>：对网格相邻面的法线角度差异进行正则化，在高方差的 SDS 梯度监督下保持几何平滑\n- <strong>可微抗锯齿</strong>：使用可微抗锯齿将前景物体与预训练的环境贴图背景合成</p>\n<h5>与 DreamFusion 的关键区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方面</th>\n<th>DreamFusion</th>\n<th>Magic3D</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>场景表示</td>\n<td>Mip-NeRF 360 (全局MLP)</td>\n<td>Stage1: Hash Grid; Stage2: DMTet Mesh</td>\n</tr>\n<tr>\n<td>扩散先验</td>\n<td>Imagen (64×64)</td>\n<td>Stage1: eDiff-I (64×64); Stage2: Stable Diffusion (512×512)</td>\n</tr>\n<tr>\n<td>渲染方式</td>\n<td>体渲染</td>\n<td>Stage1: 体渲染; Stage2: 可微光栅化</td>\n</tr>\n<tr>\n<td>优化分辨率</td>\n<td>64×64</td>\n<td>64×64 → 512×512</td>\n</tr>\n<tr>\n<td>法线计算</td>\n<td>有限差分</td>\n<td>MLP 直接预测</td>\n</tr>\n<tr>\n<td>输出格式</td>\n<td>NeRF (不可直接用于图形引擎)</td>\n<td>纹理网格 (可直接导入标准图形软件)</td>\n</tr>\n<tr>\n<td>优化时间</td>\n<td>~1.5 小时</td>\n<td>~40 分钟</td>\n</tr>\n</tbody>\n</table></div>\n<h5>可控生成扩展</h5>\n<p>Magic3D 还展示了三种可控生成能力：</p>\n<ol>\n<li><strong>DreamBooth 个性化</strong>：用少量目标图像微调 eDiff-I 和 LDM，将特定实例绑定到 [V] 标识符，然后在 3D 优化中使用包含 [V] 的 prompt</li>\n<li><strong>Prompt 编辑</strong>：三阶段流程——(a) 用基础 prompt 训练粗模型 → (b) 修改 prompt 并用 LDM 微调 NeRF → (c) 用修改后的 prompt 优化网格。可修改纹理或几何</li>\n<li><strong>图像风格迁移</strong>：将参考图像作为扩散模型的条件输入，通过调节文本引导权重和联合引导权重控制风格强度</li>\n</ol>",
      "quiz": {
        "q": "Magic3D 在细阶段（Stage 2）选择纹理网格而非继续使用神经辐射场的主要原因是什么？",
        "options": [
          "纹理网格的表达能力比神经辐射场更强",
          "可微光栅化在高分辨率下比体渲染更高效，能在合理的内存和计算预算内渲染 512×512 图像",
          "神经辐射场无法表示 SDF，不兼容 Marching Tetrahedra 算法",
          "潜在扩散模型只能处理网格渲染的图像，不支持体渲染输出"
        ],
        "answer": 1,
        "explain": "体渲染需要沿光线密集采样并逐点评估神经网络，在 512×512 分辨率下内存和计算开销过大；而可微光栅化的计算量随分辨率增长更为温和，是高分辨率优化的合适选择。"
      }
    },
    {
      "id": "fantasia3d",
      "num": 9,
      "name": "Fantasia3D",
      "fullName": "幻想3D (Fantasia3D)",
      "year": "2023",
      "org": "Alibaba",
      "parent": "dreamfusion",
      "paperUrl": "https://arxiv.org/abs/2303.13873",
      "projectUrl": "",
      "category": "optimization",
      "motivation": "解耦几何与外观学习PBR材质",
      "summary": "Fantasia3D 提出将文本到3D生成中的几何与外观**解耦建模**：几何阶段利用 DMTet 混合表示配合法线图编码进行 SDS 优化，外观阶段引入 PBR（BRDF）材质模型实现逼真渲染，生成的3D资产可直接导入图形引擎进行重光照、编辑和物理仿真。",
      "keyPoints": [
        "<strong>解耦设计</strong>：将几何建模与外观建模分为两个独立阶段，分别优化，避免耦合学习导致的质量退化",
        "<strong>混合场景表示</strong>：采用 DMTet（Deep Marching Tetrahedra）作为几何表示，兼具隐式灵活性与显式网格的高效渲染",
        "<strong>法线图编码驱动几何</strong>：将渲染的法线图（而非着色图像）作为 Stable Diffusion 的输入，利用扩散模型对法线分布的先验知识指导几何优化",
        "<strong>PBR 材质建模</strong>：引入空间可变 BRDF（漫反射 <span class=\"kb-math kb-math-inline\">k_d</span>、粗糙度/金属度 <span class=\"kb-math kb-math-inline\">k_{rm}</span>、法线扰动 <span class=\"kb-math kb-math-inline\">k_n</span>），通过 MLP 预测材质参数并用物理渲染方程生成图像",
        "<strong>粗到细几何策略</strong>：几何优化分两阶段，先用大权重 <span class=\"kb-math kb-math-inline\">\\omega(t)=\\sigma^2</span> 获取整体形状，后切换 <span class=\"kb-math kb-math-inline\">w(t)=\\sigma^2\\sqrt{1-\\sigma^2}</span> 精细化细节",
        "<strong>用户引导生成</strong>：支持以自定义3D形状初始化 DMTet，实现可控生成",
        "<strong>图形引擎兼容</strong>：输出带 PBR 材质的标准网格，可直接用于 Blender 等引擎的重光照、编辑与物理仿真"
      ],
      "detail": "<h5>整体框架</h5>\n<p><img alt=\"Fantasia3D 几何建模流程\" src=\"https://ar5iv.labs.arxiv.org/html/2303.13873/assets/x3.png\" />\n<em>图：Fantasia3D 几何建模阶段。DMTet 提取的网格渲染为法线图和 mask，编码后送入预训练 Stable Diffusion 计算 SDS 损失，梯度回传更新 MLP Ψ 的参数。</em></p>\n<p><img alt=\"Fantasia3D 外观建模流程\" src=\"https://ar5iv.labs.arxiv.org/html/2303.13873/assets/x4.png\" />\n<em>图：Fantasia3D 外观建模阶段。MLP Γ 预测每个表面点的 BRDF 材质参数，通过物理渲染方程生成彩色图像，再经 SDS 损失优化材质网络。</em></p>\n<p>Fantasia3D 的核心思想是将文本到3D生成解耦为<strong>几何建模</strong>和<strong>外观建模</strong>两个独立阶段，分别使用不同的网络和优化策略。</p>\n<h5>预备知识：SDS 损失与 DMTet</h5>\n<p><strong>Score Distillation Sampling (SDS)</strong> 是 DreamFusion 提出的核心技术，利用预训练的文本到图像扩散模型作为先验来指导3D生成。其梯度公式为：</p>\n<div class=\"kb-math kb-math-display\">\\nabla_\\theta \\mathcal{L}_{\\text{SDS}}(\\phi, x) = \\mathbb{E}\\left[w(t)\\left(\\hat{\\epsilon}_\\phi(z_t^x; y, t) - \\epsilon\\right)\\frac{\\partial z^x}{\\partial x}\\frac{\\partial x}{\\partial \\theta}\\right]</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\hat{\\epsilon}_\\phi</span> 是预训练扩散模型的噪声预测，<span class=\"kb-math kb-math-inline\">z_t^x</span> 是对渲染图像 <span class=\"kb-math kb-math-inline\">x</span> 的潜变量添加噪声后的结果，<span class=\"kb-math kb-math-inline\">y</span> 是文本提示，<span class=\"kb-math kb-math-inline\">w(t)</span> 是与时间步相关的权重函数。</p>\n<p><strong>DMTet（Deep Marching Tetrahedra）</strong> 是一种混合3D表示，在规则四面体网格的每个顶点 <span class=\"kb-math kb-math-inline\">v_i</span> 上存储 SDF 值 <span class=\"kb-math kb-math-inline\">s_i</span> 和位移 <span class=\"kb-math kb-math-inline\">\\Delta v_i</span>，通过 Marching Tetrahedra 算法提取显式三角网格：</p>\n<div class=\"kb-math kb-math-display\">s_i, \\Delta v_i = \\Psi(\\beta(v_i); \\theta)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\Psi</span> 是带 hash-grid 位置编码 <span class=\"kb-math kb-math-inline\">\\beta</span> 的 MLP，<span class=\"kb-math kb-math-inline\">\\theta</span> 为可学习参数。</p>\n<div class=\"key-point\">💡 <strong>关键</strong>：DMTet 的优势在于既能通过可微分的 Marching Tetrahedra 实现端到端梯度传播，又能输出高质量的显式三角网格，直接兼容传统图形管线。</div>\n<h5>几何建模阶段</h5>\n<p>几何建模的核心创新是<strong>使用法线图编码作为扩散模型的输入</strong>，而非传统的着色图像。具体流程：</p>\n<ol>\n<li><strong>网格提取</strong>：MLP <span class=\"kb-math kb-math-inline\">\\Psi</span> 预测四面体顶点的 SDF 值和位移，通过 Marching Tetrahedra 提取三角网格</li>\n<li><strong>法线图渲染</strong>：从随机采样的相机视角，通过可微分光栅化渲染法线图 <span class=\"kb-math kb-math-inline\">I_n</span> 和二值 mask <span class=\"kb-math kb-math-inline\">I_m</span></li>\n<li><strong>图像组合</strong>：将法线图与 mask 组合为 RGB 图像 <span class=\"kb-math kb-math-inline\">I_g = I_n \\odot I_m</span></li>\n<li><strong>SDS 优化</strong>：将 <span class=\"kb-math kb-math-inline\">I_g</span> 编码到潜空间，计算 SDS 损失并回传梯度更新 <span class=\"kb-math kb-math-inline\">\\Psi</span> 的参数</li>\n</ol>\n<p>SDS 梯度对几何参数 <span class=\"kb-math kb-math-inline\">\\theta</span> 的更新公式：</p>\n<div class=\"kb-math kb-math-display\">\\nabla_\\theta \\mathcal{L}_{\\text{SDS}}(\\phi, x) = \\mathbb{E}\\left[w(t)\\left(\\hat{\\epsilon}_\\phi(z_t^x; y, t) - \\epsilon\\right)\\frac{\\partial x}{\\partial \\theta}\\frac{\\partial z^x}{\\partial x}\\right]</div>\n<div class=\"key-point\">💡 <strong>为什么用法线图？</strong> 法线图的值域为 <span class=\"kb-math kb-math-inline\">(-1, 1)</span>，恰好与潜空间扩散所需的数据范围对齐。更重要的是，训练 Stable Diffusion 的 LAION-5B 数据集中包含大量法线图数据，使得扩散模型天然具备处理法线图的能力。实验表明，使用着色图像替代法线图会导致几何扭曲。</div>\n<p><strong>粗到细策略</strong>：几何优化分两阶段调整 SDS 权重函数：\n- <strong>粗阶段</strong>：<span class=\"kb-math kb-math-inline\">w(t) = \\sigma^2</span>，鼓励大范围形状变化，快速建立整体轮廓\n- <strong>细阶段</strong>：<span class=\"kb-math kb-math-inline\">w(t) = \\sigma^2\\sqrt{1-\\sigma^2}</span>，抑制大幅更新，精细化表面细节</p>\n<h5>外观建模阶段</h5>\n<p>几何固定后，进入外观建模阶段。Fantasia3D 引入<strong>物理渲染（PBR）材质模型</strong>，使用 MLP <span class=\"kb-math kb-math-inline\">\\Gamma</span> 预测每个表面点的空间可变 BRDF 参数：</p>\n<div class=\"kb-math kb-math-display\">(k_d, k_{rm}, k_n) = \\Gamma(\\beta(p); \\gamma)</div>\n<p>其中：\n- <span class=\"kb-math kb-math-inline\">k_d \\in \\mathbb{R}^3</span>：漫反射颜色\n- <span class=\"kb-math kb-math-inline\">k_{rm} \\in \\mathbb{R}^2</span>：粗糙度 <span class=\"kb-math kb-math-inline\">r</span> 和金属度 <span class=\"kb-math kb-math-inline\">m</span>\n- <span class=\"kb-math kb-math-inline\">k_n \\in \\mathbb{R}^3</span>：切空间法线扰动，增强表面光照细节</p>\n<p>镜面反射项由金属度和漫反射计算：<span class=\"kb-math kb-math-inline\">k_s = (1-m) \\cdot 0.04 + m \\cdot k_d</span></p>\n<p><strong>渲染方程</strong>采用标准的 Cook-Torrance BRDF 模型：</p>\n<div class=\"kb-math kb-math-display\">L(p, \\omega) = L_d(p) + L_s(p, \\omega)</div>\n<div class=\"kb-math kb-math-display\">L_d(p) = k_d(1-m)\\int_{\\Omega} L_i(p, \\omega_i)(\\omega_i \\cdot n_p)\\,\\mathrm{d}\\omega_i</div>\n<div class=\"kb-math kb-math-display\">L_s(p, \\omega) = \\int_{\\Omega} \\frac{DFG}{4(\\omega \\cdot n_p)(\\omega_i \\cdot n_p)} L_i(p, \\omega_i)(\\omega_i \\cdot n_p)\\,\\mathrm{d}\\omega_i</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">D</span> 为 GGX 法线分布函数（由粗糙度 <span class=\"kb-math kb-math-inline\">r</span> 参数化），<span class=\"kb-math kb-math-inline\">F</span> 为 Fresnel 项，<span class=\"kb-math kb-math-inline\">G</span> 为遮蔽-阴影项。入射光 <span class=\"kb-math kb-math-inline\">L_i</span> 由现成的环境贴图提供，半球积分通过 split-sum 方法高效计算。</p>\n<p>渲染得到的彩色图像 <span class=\"kb-math kb-math-inline\">x = \\{L(p, \\omega)\\}</span> 送入 Stable Diffusion 计算 SDS 损失，梯度回传更新材质网络 <span class=\"kb-math kb-math-inline\">\\Gamma</span> 的参数 <span class=\"kb-math kb-math-inline\">\\gamma</span>。</p>\n<div class=\"warn-box\">⚠️ <strong>外观阶段的权重调度</strong>：为避免颜色过饱和，外观建模采用不同的权重策略——早期使用 <span class=\"kb-math kb-math-inline\">w(t) = \\sigma^2\\sqrt{1-\\sigma^2}</span>，后期切换为 <span class=\"kb-math kb-math-inline\">w(t) = 1/\\sigma^2</span>。</div>\n<h5>纹理导出与后处理</h5>\n<p>训练完成后，通过 xatlas 生成 UV 映射，将 MLP 预测的材质参数采样为标准2D纹理贴图。为消除纹理接缝，采用 <strong>UV edge padding</strong> 技术扩展 UV 岛边界并填充空白区域。</p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># Fantasia3D 训练流程伪代码\n\n# ===== 阶段 1: 几何建模 =====\n# 初始化 DMTet 四面体网格（椭球或用户提供的形状）\n# MLP Ψ: 预测 SDF 值和顶点位移\nfor iteration in geometry_iterations:\n    # 随机采样 24 个相机视角\n    cameras = sample_cameras(n=24)\n\n    # DMTet 提取三角网格\n    sdf, delta_v = Ψ(hash_encode(vertices))\n    mesh = marching_tetrahedra(sdf, vertices + delta_v)\n\n    # 可微分光栅化渲染法线图 + mask\n    normal_map, mask = rasterize(mesh, cameras)\n    I_g = normal_map * mask  # 组合为 RGB 图像\n\n    # 编码到潜空间，计算 SDS 损失\n    z = encode(I_g)\n    loss = SDS_loss(z, text_prompt, w=coarse_or_fine_weight(t))\n\n    # 更新几何网络\n    loss.backward()\n    optimizer_Ψ.step()  # lr = 1e-3\n\n# ===== 阶段 2: 外观建模 =====\n# 冻结几何，初始化材质 MLP Γ\nfor iteration in appearance_iterations:\n    cameras = sample_cameras(n=24)\n\n    # 预测 BRDF 材质参数\n    kd, krm, kn = Γ(hash_encode(surface_points))\n\n    # PBR 渲染（Cook-Torrance BRDF + 环境光照）\n    color_image = pbr_render(mesh, kd, krm, kn, env_map, cameras)\n\n    # SDS 损失优化材质\n    z = encode(color_image)\n    loss = SDS_loss(z, text_prompt, w=appearance_weight(t))\n\n    loss.backward()\n    optimizer_Γ.step()  # lr = 1e-2\n\n# ===== 导出 =====\n# UV 展开 + 纹理采样 + edge padding\nuv_map = xatlas_unwrap(mesh)\ntexture_maps = sample_material_to_uv(Γ, uv_map)\nexport(mesh, texture_maps)  # 可导入 Blender\n</code></pre>\n<h5>与现有方法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>DreamFusion</th>\n<th>Magic3D</th>\n<th>Fantasia3D</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>3D 表示</td>\n<td>NeRF</td>\n<td>NeRF → DMTet</td>\n<td>DMTet</td>\n</tr>\n<tr>\n<td>几何/外观</td>\n<td>耦合</td>\n<td>耦合</td>\n<td><strong>解耦</strong></td>\n</tr>\n<tr>\n<td>材质模型</td>\n<td>简单着色</td>\n<td>简单着色</td>\n<td><strong>PBR (BRDF)</strong></td>\n</tr>\n<tr>\n<td>网格提取</td>\n<td>困难</td>\n<td>支持</td>\n<td><strong>原生支持</strong></td>\n</tr>\n<tr>\n<td>重光照/编辑</td>\n<td>✗</td>\n<td>有限</td>\n<td><strong>✓</strong></td>\n</tr>\n<tr>\n<td>物理仿真</td>\n<td>✗</td>\n<td>✗</td>\n<td><strong>✓</strong></td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 <strong>核心优势</strong>：Fantasia3D 是首个在文本到3D任务中引入完整 PBR 材质管线的方法，生成的资产可直接用于下游图形应用（重光照、材质编辑、物理仿真），而非仅作为\"观赏品\"。</div>\n<h5>实现细节</h5>\n<ul>\n<li><strong>网络架构</strong>：<span class=\"kb-math kb-math-inline\">\\Psi</span> 为 3 层 MLP（32 隐藏单元），<span class=\"kb-math kb-math-inline\">\\Gamma</span> 为 2 层 MLP（32 隐藏单元），均使用 hash-grid 位置编码</li>\n<li><strong>训练配置</strong>：8× NVIDIA RTX 3090，几何阶段约 15 分钟，外观阶段约 16 分钟</li>\n<li><strong>优化器</strong>：AdamW，几何学习率 <span class=\"kb-math kb-math-inline\">1 \\times 10^{-3}</span>，外观学习率 <span class=\"kb-math kb-math-inline\">1 \\times 10^{-2}</span></li>\n<li><strong>每次迭代采样 24 个相机视角</strong>进行渲染</li>\n</ul>\n<h5>消融实验关键发现</h5>\n<ol>\n<li><strong>解耦 vs 耦合</strong>：将几何和材质耦合到同一网络联合学习会导致生成失败，验证了解耦设计的必要性</li>\n<li><strong>法线图 vs 着色图像</strong>：用着色图像替代法线图进行几何优化会产生扭曲的几何形状</li>\n<li><strong>粗到细策略</strong>：去除粗到细的权重调度会导致几何细节不足</li>\n</ol>",
      "quiz": {
        "q": "Fantasia3D 在几何建模阶段使用什么作为 Stable Diffusion 的输入？",
        "options": [
          "PBR 渲染的彩色图像",
          "渲染的法线图与 mask 的组合",
          "深度图",
          "SDF 体素网格的切片"
        ],
        "answer": 1,
        "explain": "Fantasia3D 将 DMTet 提取网格渲染的法线图与二值 mask 组合为 RGB 图像，编码后送入 Stable Diffusion 计算 SDS 损失。法线图的值域 (-1,1) 与潜空间数据范围对齐，且 LAION-5B 训练数据中包含法线图，使扩散模型能有效处理。"
      }
    },
    {
      "id": "prolificdreamer",
      "num": 10,
      "name": "ProlificDreamer",
      "fullName": "高产梦想家 (ProlificDreamer)",
      "year": "2023",
      "org": "Tsinghua University",
      "parent": "dreamfusion",
      "paperUrl": "https://arxiv.org/abs/2305.16213",
      "projectUrl": "",
      "category": "optimization",
      "motivation": "变分分数蒸馏VSD解决过平滑",
      "summary": "ProlificDreamer 的核心目标是：变分分数蒸馏VSD解决过平滑。",
      "keyPoints": [
        "核心动机：变分分数蒸馏VSD解决过平滑",
        "演化来源：继承或改进自 dreamfusion",
        "代表机构：Tsinghua University"
      ],
      "detail": "<p><strong>核心示意图/框架图</strong></p>\n<div class=\"img-wrap\"><img src=\"https://ar5iv.labs.arxiv.org/html/2305.16213/assets/x1.png\" alt=\"ProlificDreamer text-to-3D samples\" loading=\"lazy\"><p class=\"img-caption\">▲ ProlificDreamer text-to-3D samples</p></div>\n<p>SDS 的问题可以理解为：它把一个 prompt 的多模态图像分布压成一个确定更新方向，多个合理外观会被平均，结果容易过平滑。VSD 从变分推断角度把 3D 参数 $\\theta$ 当作随机变量，目标是让渲染图像分布 $q^\\mu(x|y)$ 接近预训练扩散模型定义的图像分布 $p_\\phi(x|y)$：</p>\n<div class=\"kb-math kb-math-display\">\\min_{\\mu}\\ \\mathrm{KL}\\left(q^\\mu(x|y)\\ \\|\\ p_\\phi(x|y)\\right).</div>\n<p>实际更新可理解为两个 score 的差：</p>\n<div class=\"kb-math kb-math-display\">\\nabla_\\theta \\mathcal{L}_{\\text{VSD}}\n\\propto\nw(t)\\left(\\hat{\\epsilon}_{\\text{pretrain}}(x_t,t,y)\n-\\hat{\\epsilon}_{\\text{LoRA}}(x_t,t,c,y)\\right)\n\\frac{\\partial x}{\\partial \\theta}.</div>\n<p>其中预训练模型给出“文本图像先验”的 score，LoRA 模型给出“当前 3D 渲染分布”的 score；二者相减更像把粒子分布推向目标分布，而不是把所有样本压到单一模式。</p>\n<p><strong>算法伪代码</strong></p>\n<pre><code class=\"language-python\">particles = [initialize_3d_representation() for _ in range(num_particles)]\nlora_score = attach_lora_to_frozen_diffusion()\nfor step in range(num_steps):\n    for theta in particles:\n        cam = sample_camera()\n        image = render(theta, cam)\n        t, eps = sample_t_and_noise()\n        x_t = alpha[t] * image + sigma[t] * eps\n\n        eps_target = frozen_diffusion(x_t, t, prompt)\n        eps_current = lora_score(x_t, t, prompt, cam)\n        grad_image = weight(t) * (eps_target - eps_current)\n        update_3d_particle(theta, image, grad_image)\n\n    train_lora_on_current_particle_renderings(lora_score, particles)\n</code></pre>\n<p>ProlificDreamer 的贡献不只是一条新公式，也包括系统性梳理 text-to-3D 的训练设计空间。论文强调普通图像扩散常用的 CFG 权重在 VSD 下更稳定，而 SDS 往往依赖很大的 guidance scale 才能成形。VSD 还可以先优化 NeRF，再转 mesh 细化，让几何和纹理更适合最终资产输出。</p>\n<p>需要注意的是，VSD 的质量来自更多计算和更复杂的训练闭环：每一步既要更新 3D 表示，也要维护 LoRA score 估计。它降低了 SDS 的模式坍缩倾向，但没有从根本上提供严格多视角监督，因此在复杂 prompt 和遮挡结构上仍可能依赖表示、初始化和相机采样策略。</p>"
    },
    {
      "id": "luciddreamer",
      "num": 11,
      "name": "LucidDreamer",
      "fullName": "清醒梦境 (LucidDreamer)",
      "year": "2023",
      "org": "KAIST",
      "parent": "prolificdreamer",
      "paperUrl": "https://arxiv.org/abs/2311.11284",
      "projectUrl": "",
      "category": "optimization",
      "motivation": "区间分数匹配ISM提升保真度",
      "summary": "LucidDreamer 的核心目标是：区间分数匹配ISM提升保真度。",
      "keyPoints": [
        "核心动机：区间分数匹配ISM提升保真度",
        "演化来源：继承或改进自 prolificdreamer",
        "代表机构：KAIST"
      ],
      "detail": "<p><strong>核心示意图/框架图</strong></p>\n<div class=\"img-wrap\"><img src=\"https://ar5iv.labs.arxiv.org/html/2311.11284/assets/x2.png\" alt=\"LucidDreamer SDS pseudo-GT analysis\" loading=\"lazy\"><p class=\"img-caption\">▲ LucidDreamer SDS pseudo-GT analysis</p></div>\n<p>LucidDreamer 对 SDS 的解释很直接：给定同一个当前渲染 $x_0$，不同噪声 $\\epsilon$ 和时间步 $t$ 会诱导不同的 $\\hat{x}_0^t$，这些 pseudo-GT 在细节上可能互相矛盾。一个共享 3D 模型被迫同时朝多个方向更新，最终就会学到平均化纹理和模糊几何。</p>\n<p>ISM 试图避免这种“每次随机换目标”的问题。它沿确定性扩散轨迹构造两个相关状态 $x_t$ 与 $x_s$，并匹配它们之间的区间 score。论文中 ISM 目标可概括为：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{ISM}}(\\theta)\n=\n\\mathbb{E}_{t,c}\\left[\n\\omega(t)\\left\\|\n\\epsilon_\\phi(x_t,t,y)-\\epsilon_\\phi(x_s,s,\\emptyset)\n\\right\\|^2\n\\right].</div>\n<p>其中 $x_t$ 来自当前 3D 渲染和文本条件，$x_s$ 来自同一确定性轨迹上的另一状态。这样更新更关注同一轨迹区间内的方向差，而不是把多个独立随机 pseudo-GT 混到一起。</p>\n<p><strong>算法伪代码</strong></p>\n<pre><code class=\"language-python\">gaussians = initialize_3d_gaussians()\ndiffusion = frozen_text_to_image_diffusion()\nfor step in range(num_steps):\n    cam = sample_camera()\n    image = render_gaussian_splatting(gaussians, cam)\n\n    t, s = sample_interval_timesteps()\n    x_t, x_s = deterministic_diffusion_interval(image, t, s)\n    eps_text = diffusion.predict_noise(x_t, t, prompt)\n    eps_base = diffusion.predict_noise(x_s, s, empty_prompt)\n\n    loss_ism = weight(t) * squared_norm(eps_text - eps_base)\n    update_gaussians_through_render(loss_ism)\n    apply_3dgs_density_and_opacity_control(gaussians)\n</code></pre>\n<p>结合 3DGS 后，LucidDreamer 的训练循环不再需要密集 NeRF MLP 查询，渲染和反传更快。显式高斯也让几何增长、剪枝、透明度控制更直接；这与 ISM 的稳定梯度配合，目标是用更少迭代得到更锐利的纹理和形状。</p>\n<p>不过 ISM 并不是多视图扩散模型。它缓解了 SDS 的噪声目标不一致，但文本先验仍主要来自单图扩散模型；对强对称、遮挡、细长结构的 3D 一致性，仍需要相机采样、表示正则或 MVDream 这类多视图先验补充。</p>"
    },
    {
      "id": "zero123",
      "num": 12,
      "name": "Zero-1-to-3",
      "fullName": "零样本视角合成 (Zero-1-to-3)",
      "year": "2023",
      "org": "Columbia University",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2303.11328",
      "projectUrl": "",
      "category": "feed_forward",
      "motivation": "注入相机参数实现单图新视角",
      "summary": "Zero-1-to-3 的核心目标是：注入相机参数实现单图新视角。",
      "keyPoints": [
        "核心动机：注入相机参数实现单图新视角",
        "代表机构：Columbia University"
      ],
      "detail": "<p><strong>核心示意图/框架图</strong></p>\n<div class=\"img-wrap\"><img src=\"https://ar5iv.labs.arxiv.org/html/2303.11328/assets/x3.png\" alt=\"Zero-1-to-3 conditional latent diffusion architecture\" loading=\"lazy\"><p class=\"img-caption\">▲ Zero-1-to-3 conditional latent diffusion architecture</p></div>\n<p>单图 3D 是高度欠约束问题：看不到的背面并没有唯一答案。Zero-1-to-3 的策略不是直接输出 3D，而是先学习“给定源图和相机变化时，合理目标视图长什么样”。这种形式保留了不确定性，也能继承 Stable Diffusion 的自然图像先验。</p>\n<p>训练时，取同一 3D 物体的两张渲染图 $x_{\\text{src}}$ 和 $x_{\\text{tgt}}$，计算相对相机 $\\Delta c$。扩散模型在目标图 latent 上做噪声预测：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}=\n\\mathbb{E}_{t,\\epsilon}\n\\left[\n\\left\\|\n\\epsilon -\n\\epsilon_\\theta(z_t,t,\\mathrm{CLIP}(x_{\\text{src}}),\\Delta c)\n\\right\\|^2\n\\right].</div>\n<p>其中源图通常通过 CLIP/image encoder 提供语义和外观条件，相机向量提供几何控制。论文中常用球坐标变化表示相机，例如 $[\\theta,\\sin(\\phi),\\cos(\\phi),r]$，避免俯仰角周期性表示不连续。</p>\n<p><strong>算法伪代码</strong></p>\n<pre><code class=\"language-python\">for src_img, tgt_img, rel_camera in rendered_view_pairs:\n    cond_img = image_encoder(src_img)\n    cond_pose = pose_mlp(rel_camera)\n    z = vae.encode(tgt_img)\n    t, eps = sample_t_and_noise()\n    z_t = alpha[t] * z + sigma[t] * eps\n\n    eps_pred = unet(z_t, t, image_condition=cond_img, pose_condition=cond_pose)\n    loss = mse(eps_pred, eps)\n    update(loss)\n\ndef generate_new_view(input_img, rel_camera):\n    return diffusion_sample(condition=(input_img, rel_camera))\n</code></pre>\n<p>Zero-1-to-3 的价值在于把 3D 先验变成可调用的 feed-forward 视角生成器。与 DreamFusion 类逐场景优化相比，它一次生成新视图只需几秒；与传统单图重建相比，它不被固定类别 CAD 先验限制。但生成的新视图之间可能不完全一致，所以后续 One-2-3-45、SyncDreamer、MVDream 等工作都在加强多视图一致性或直接把多视图作为联合输出。</p>"
    },
    {
      "id": "one2345",
      "num": 13,
      "name": "One-2-3-45",
      "fullName": "单图45秒重建 (One-2-3-45)",
      "year": "2023",
      "org": "Stanford University",
      "parent": "zero123",
      "paperUrl": "https://arxiv.org/abs/2306.16928",
      "projectUrl": "",
      "category": "feed_forward",
      "motivation": "多视图生成+快速网格重建",
      "summary": "One-2-3-45 的核心目标是：多视图生成+快速网格重建。",
      "keyPoints": [
        "核心动机：多视图生成+快速网格重建",
        "演化来源：继承或改进自 zero123",
        "代表机构：Stanford University"
      ],
      "detail": "<p><strong>核心示意图/框架图</strong></p>\n<div class=\"img-wrap\"><img src=\"https://ar5iv.labs.arxiv.org/html/2306.16928/assets/figures/pipeline.png\" alt=\"One-2-3-45 pipeline\" loading=\"lazy\"><p class=\"img-caption\">▲ One-2-3-45 pipeline</p></div>\n<p>One-2-3-45 的名字概括了流程：从 one image 到若干 novel views，再到 3D mesh，并强调快速完成。它没有像 DreamFusion 那样把每次渲染送入扩散模型做长时间优化，而是把扩散模型用于一次性补视角，然后交给重建网络或重建流程融合。</p>\n<p>典型流程包括：先对输入图做前景分割和规范化；用 Zero-1-to-3 生成固定相机集合的多视图，例如左右后等视角；再用多视图条件的几何重建方法估计隐式表面或体素/SDF；最后用 marching cubes 等方式提取 mesh，并从输入与生成视图回投纹理。</p>\n<p><strong>算法伪代码</strong></p>\n<pre><code class=\"language-python\">input_img = remove_background_and_center(object_image)\nviews = {front: input_img}\nfor pose in canonical_target_poses:\n    views[pose] = zero123_generate(input_img, rel_camera=pose)\n\nrecon_features = encode_multiview_images(views, camera_poses)\nsdf_or_density = reconstruct_geometry(recon_features)\nmesh = extract_mesh(sdf_or_density)\ntexture = project_or_optimize_texture(mesh, views, camera_poses)\nreturn mesh, texture\n</code></pre>\n<p>从技术取舍看，One-2-3-45 把难题分解成两个较容易工程化的模块。扩散模型负责“想象不可见部分”，重建模块负责“把多视图约束变成 3D”。这种模块化很实用：可以替换更强的视图生成器，也可以替换更强的重建器；但误差也会级联，前一阶段的幻觉会被后一阶段当作观测。</p>\n<p>相对优化式 text/image-to-3D，One-2-3-45 的重建速度是最大卖点；相对真正多视图摄影测量，它又能从单图启动。它适合快速生成粗网格，但对细节、背面真实性、透明/反光材料和非典型物体仍依赖 Zero123 先验的泛化能力。</p>"
    },
    {
      "id": "mvdream",
      "num": 14,
      "name": "MVDream",
      "fullName": "多视图梦境 (MVDream)",
      "year": "2024",
      "org": "ByteDance",
      "parent": "zero123",
      "paperUrl": "https://arxiv.org/abs/2308.16512",
      "projectUrl": "",
      "category": "feed_forward",
      "motivation": "多视图注意力解决Janus问题",
      "summary": "MVDream 的核心目标是：多视图注意力解决Janus问题。",
      "keyPoints": [
        "核心动机：多视图注意力解决Janus问题",
        "演化来源：继承或改进自 zero123",
        "代表机构：ByteDance"
      ],
      "detail": "<p><strong>核心示意图/框架图</strong></p>\n<div class=\"img-wrap\"><img src=\"https://ar5iv.labs.arxiv.org/html/2308.16512/assets/x6.png\" alt=\"MVDream multi-view diffusion model\" loading=\"lazy\"><p class=\"img-caption\">▲ MVDream multi-view diffusion model</p></div>\n<p>MVDream 的关键判断是：仅仅让扩散模型知道“当前是背面视角”还不够，因为每个视图独立生成时仍可能各自满足文本，却彼此不一致。真正需要的是联合建模一组视图，让前后左右共享身份、纹理和结构。</p>\n<p>形式上，模型输入是一组 noisy latent $\\mathbf{x}_t\\in\\mathbb{R}^{F\\times H\\times W\\times C}$，其中 $F$ 是视图数。U-Net 保留文本 cross-attention，同时把原本只在单张图内部做的 self-attention 扩展到跨视图维度，并加入相机参数：</p>\n<div class=\"kb-math kb-math-display\">\\epsilon_\\theta =\n\\epsilon_\\theta(\\mathbf{x}_t,t,y,\\{c_1,\\dots,c_F\\}).</div>\n<p>训练损失仍是扩散噪声预测 MSE：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}=\n\\mathbb{E}_{t,\\epsilon}\n\\left[\n\\left\\|\n\\epsilon-\\epsilon_\\theta(\\mathbf{x}_t,t,y,\\mathbf{c})\n\\right\\|^2\n\\right],</div>\n<p>但样本是同一物体的多视图组，因此模型被迫学习跨视角一致性。</p>\n<p><strong>算法伪代码</strong></p>\n<p>```python</p>"
    },
    {
      "id": "wonder3d",
      "num": 15,
      "name": "Wonder3D",
      "fullName": "神奇3D (Wonder3D)",
      "year": "2024",
      "org": "HKU",
      "parent": "mvdream",
      "paperUrl": "https://arxiv.org/abs/2310.15008",
      "projectUrl": "",
      "category": "feed_forward",
      "motivation": "跨域扩散生成一致多视图",
      "summary": "Wonder3D 的核心目标是：跨域扩散生成一致多视图。",
      "keyPoints": [
        "核心动机：跨域扩散生成一致多视图",
        "演化来源：继承或改进自 mvdream",
        "代表机构：HKU"
      ],
      "detail": "<p>跨域扩散生成一致多视图</p>"
    },
    {
      "id": "lrm",
      "num": 16,
      "name": "LRM",
      "fullName": "大规模重建模型 (Large Reconstruction Model)",
      "year": "2024",
      "org": "Adobe Research",
      "parent": "zero123",
      "paperUrl": "https://arxiv.org/abs/2311.04400",
      "projectUrl": "",
      "category": "feed_forward",
      "motivation": "Transformer单图5秒预测NeRF",
      "summary": "LRM 的核心目标是：Transformer单图5秒预测NeRF。",
      "keyPoints": [
        "核心动机：Transformer单图5秒预测NeRF",
        "演化来源：继承或改进自 zero123",
        "代表机构：Adobe Research"
      ],
      "detail": "<p>Transformer单图5秒预测NeRF</p>"
    },
    {
      "id": "instant3d",
      "num": 17,
      "name": "Instant3D",
      "fullName": "即时3D (Instant3D)",
      "year": "2024",
      "org": "Tencent",
      "parent": "lrm",
      "paperUrl": "https://arxiv.org/abs/2311.06214",
      "projectUrl": "",
      "category": "feed_forward",
      "motivation": "稀疏视图+LRM快速前馈生成",
      "summary": "Instant3D 的核心目标是：稀疏视图+LRM快速前馈生成。",
      "keyPoints": [
        "核心动机：稀疏视图+LRM快速前馈生成",
        "演化来源：继承或改进自 lrm",
        "代表机构：Tencent"
      ],
      "detail": "<p>稀疏视图+LRM快速前馈生成</p>"
    },
    {
      "id": "ilrm",
      "num": 18,
      "name": "iLRM",
      "fullName": "迭代大规模重建 (Iterative LRM)",
      "year": "2026.03",
      "org": "CVPR",
      "parent": "lrm",
      "paperUrl": "https://arxiv.org/abs/2604.16000",
      "projectUrl": "",
      "category": "feed_forward",
      "motivation": "迭代细化机制生成3DGS",
      "summary": "iLRM 的核心目标是：迭代细化机制生成3DGS。",
      "keyPoints": [
        "核心动机：迭代细化机制生成3DGS",
        "演化来源：继承或改进自 lrm",
        "代表机构：CVPR"
      ],
      "detail": "<p>迭代细化机制生成3DGS</p>"
    },
    {
      "id": "vgg_t3",
      "num": 19,
      "name": "VGG-T³",
      "fullName": "测试时训练重建 (VGG-T³)",
      "year": "2026.02",
      "org": "arXiv",
      "parent": "ilrm",
      "paperUrl": "https://arxiv.org/abs/2602.23361",
      "projectUrl": "",
      "category": "feed_forward",
      "motivation": "TTT线性扩展58秒千图重建",
      "summary": "VGG-T³ 的核心目标是：TTT线性扩展58秒千图重建。",
      "keyPoints": [
        "核心动机：TTT线性扩展58秒千图重建",
        "演化来源：继承或改进自 ilrm",
        "代表机构：arXiv"
      ],
      "detail": "<p>TTT线性扩展58秒千图重建</p>"
    },
    {
      "id": "4d_lrm",
      "num": 20,
      "name": "4D-LRM",
      "fullName": "4D大规模重建 (4D-LRM)",
      "year": "2025.12",
      "org": "arXiv",
      "parent": "lrm",
      "paperUrl": "https://arxiv.org/abs/2512.04000",
      "projectUrl": "",
      "category": "feed_forward",
      "motivation": "首个大规模4D动态重建模型",
      "summary": "4D-LRM 的核心目标是：首个大规模4D动态重建模型。",
      "keyPoints": [
        "核心动机：首个大规模4D动态重建模型",
        "演化来源：继承或改进自 lrm",
        "代表机构：arXiv"
      ],
      "detail": "<p>首个大规模4D动态重建模型</p>"
    },
    {
      "id": "yonosplat",
      "num": 21,
      "name": "YoNoSplat",
      "fullName": "单模型前馈3DGS (YoNoSplat)",
      "year": "2026.04",
      "org": "ICLR",
      "parent": "ilrm",
      "paperUrl": "https://openreview.net/forum?id=yono2026",
      "projectUrl": "",
      "category": "feed_forward",
      "motivation": "毫秒级任意视图重建",
      "summary": "YoNoSplat 的核心目标是：毫秒级任意视图重建。",
      "keyPoints": [
        "核心动机：毫秒级任意视图重建",
        "演化来源：继承或改进自 ilrm",
        "代表机构：ICLR"
      ],
      "detail": "<p>毫秒级任意视图重建</p>"
    },
    {
      "id": "texture",
      "num": 22,
      "name": "TEXTure",
      "fullName": "文本纹理 (TEXTure)",
      "year": "2023",
      "org": "Technion",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2302.01721",
      "projectUrl": "",
      "category": "texture",
      "motivation": "迭代投影涂色生成无缝纹理",
      "summary": "TEXTure 的核心目标是：迭代投影涂色生成无缝纹理。",
      "keyPoints": [
        "核心动机：迭代投影涂色生成无缝纹理",
        "代表机构：Technion"
      ],
      "detail": "<p>迭代投影涂色生成无缝纹理</p>"
    },
    {
      "id": "text2tex",
      "num": 23,
      "name": "Text2Tex",
      "fullName": "文本转纹理 (Text2Tex)",
      "year": "2023",
      "org": "Stanford University",
      "parent": "texture",
      "paperUrl": "https://arxiv.org/abs/2303.11396",
      "projectUrl": "",
      "category": "texture",
      "motivation": "渐进式策略确保全局一致性",
      "summary": "Text2Tex 的核心目标是：渐进式策略确保全局一致性。",
      "keyPoints": [
        "核心动机：渐进式策略确保全局一致性",
        "演化来源：继承或改进自 texture",
        "代表机构：Stanford University"
      ],
      "detail": "<p>渐进式策略确保全局一致性</p>"
    },
    {
      "id": "trellis2",
      "num": 24,
      "name": "TRELLIS 2",
      "fullName": "微软TRELLIS 2 (TRELLIS 2)",
      "year": "2025.12",
      "org": "Microsoft Research",
      "parent": "text2tex",
      "paperUrl": "https://trellis2.app/",
      "projectUrl": "",
      "category": "texture",
      "motivation": "O-Voxel原生PBR材质生成",
      "summary": "TRELLIS 2 的核心目标是：O-Voxel原生PBR材质生成。",
      "keyPoints": [
        "核心动机：O-Voxel原生PBR材质生成",
        "演化来源：继承或改进自 text2tex",
        "代表机构：Microsoft Research"
      ],
      "detail": "<p>O-Voxel原生PBR材质生成</p>"
    },
    {
      "id": "hunyuan3d_21",
      "num": 25,
      "name": "Hunyuan3D 2.1",
      "fullName": "混元3D 2.1 (Hunyuan3D 2.1)",
      "year": "2026.03",
      "org": "Tencent",
      "parent": "trellis2",
      "paperUrl": "https://github.com/tencent/Hunyuan3D-2",
      "projectUrl": "",
      "category": "texture",
      "motivation": "78%盲测胜率高质量纹理",
      "summary": "Hunyuan3D 2.1 的核心目标是：78%盲测胜率高质量纹理。",
      "keyPoints": [
        "核心动机：78%盲测胜率高质量纹理",
        "演化来源：继承或改进自 trellis2",
        "代表机构：Tencent"
      ],
      "detail": "<p>78%盲测胜率高质量纹理</p>"
    },
    {
      "id": "dragtex",
      "num": 26,
      "name": "Dragtex",
      "fullName": "拖拽纹理编辑 (Dragtex)",
      "year": "2026.02",
      "org": "IEEE",
      "parent": "hunyuan3d_21",
      "paperUrl": "https://ieeexplore.ieee.org/document/11368713",
      "projectUrl": "",
      "category": "texture",
      "motivation": "基于点的交互式纹理编辑",
      "summary": "Dragtex 的核心目标是：基于点的交互式纹理编辑。",
      "keyPoints": [
        "核心动机：基于点的交互式纹理编辑",
        "演化来源：继承或改进自 hunyuan3d_21",
        "代表机构：IEEE"
      ],
      "detail": "<p>基于点的交互式纹理编辑</p>"
    },
    {
      "id": "ar3dr1",
      "num": 27,
      "name": "AR3DR1",
      "fullName": "强化学习3D生成 (AR3DR1)",
      "year": "2026.03",
      "org": "CVPR",
      "parent": "luciddreamer",
      "paperUrl": "https://arxiv.org/abs/2603.15000",
      "projectUrl": "",
      "category": "native_3d",
      "motivation": "high-GRPO分层RL优化生成",
      "summary": "AR3DR1 的核心目标是：high-GRPO分层RL优化生成。",
      "keyPoints": [
        "核心动机：high-GRPO分层RL优化生成",
        "演化来源：继承或改进自 luciddreamer",
        "代表机构：CVPR"
      ],
      "detail": "<p>high-GRPO分层RL优化生成</p>"
    },
    {
      "id": "vist3a",
      "num": 28,
      "name": "VIST3A",
      "fullName": "视频蒸馏3D (VIST3A)",
      "year": "2026.04",
      "org": "ICLR",
      "parent": "luciddreamer",
      "paperUrl": "https://iclr.cc/virtual/2026/poster/25432",
      "projectUrl": "",
      "category": "native_3d",
      "motivation": "视频生成器缝合3D重建",
      "summary": "VIST3A 的核心目标是：视频生成器缝合3D重建。",
      "keyPoints": [
        "核心动机：视频生成器缝合3D重建",
        "演化来源：继承或改进自 luciddreamer",
        "代表机构：ICLR"
      ],
      "detail": "<p>视频生成器缝合3D重建</p>"
    },
    {
      "id": "lyra",
      "num": 29,
      "name": "Lyra",
      "fullName": "视频扩散自蒸馏 (Lyra)",
      "year": "2026.04",
      "org": "ICLR",
      "parent": "vist3a",
      "paperUrl": "https://iclr.cc/virtual/2026/poster/lyra",
      "projectUrl": "",
      "category": "native_3d",
      "motivation": "视频扩散自蒸馏到3DGS",
      "summary": "Lyra 的核心目标是：视频扩散自蒸馏到3DGS。",
      "keyPoints": [
        "核心动机：视频扩散自蒸馏到3DGS",
        "演化来源：继承或改进自 vist3a",
        "代表机构：ICLR"
      ],
      "detail": "<p>视频扩散自蒸馏到3DGS</p>"
    },
    {
      "id": "hunyuan3d_3",
      "num": 30,
      "name": "Hunyuan3D 3.0",
      "fullName": "混元3D 3.0 (Hunyuan3D 3.0)",
      "year": "2026.04",
      "org": "Tencent",
      "parent": "instant3d",
      "paperUrl": "https://github.com/tencent/Hunyuan3D-3",
      "projectUrl": "",
      "category": "native_3d",
      "motivation": "1536³原生分辨率36亿体素",
      "summary": "Hunyuan3D 3.0 的核心目标是：1536³原生分辨率36亿体素。",
      "keyPoints": [
        "核心动机：1536³原生分辨率36亿体素",
        "演化来源：继承或改进自 instant3d",
        "代表机构：Tencent"
      ],
      "detail": "<p>1536³原生分辨率36亿体素</p>"
    },
    {
      "id": "seed3d_2",
      "num": 31,
      "name": "Seed3D 2.0",
      "fullName": "豆包3D 2.0 (Seed3D 2.0)",
      "year": "2026.04",
      "org": "ByteDance",
      "parent": "hunyuan3d_3",
      "paperUrl": "https://www.bytedance.com/seed3d",
      "projectUrl": "",
      "category": "native_3d",
      "motivation": "DiT+URDF工业级资产输出",
      "summary": "Seed3D 2.0 的核心目标是：DiT+URDF工业级资产输出。",
      "keyPoints": [
        "核心动机：DiT+URDF工业级资产输出",
        "演化来源：继承或改进自 hunyuan3d_3",
        "代表机构：ByteDance"
      ],
      "detail": "<p>DiT+URDF工业级资产输出</p>"
    },
    {
      "id": "rodin_gen2",
      "num": 32,
      "name": "Rodin Gen-2",
      "fullName": "Rodin二代 (Rodin Gen-2)",
      "year": "2026.04",
      "org": "Microsoft",
      "parent": "seed3d_2",
      "paperUrl": "https://microsoft.com/rodin",
      "projectUrl": "",
      "category": "native_3d",
      "motivation": "100亿参数四边形拓扑生成",
      "summary": "Rodin Gen-2 的核心目标是：100亿参数四边形拓扑生成。",
      "keyPoints": [
        "核心动机：100亿参数四边形拓扑生成",
        "演化来源：继承或改进自 seed3d_2",
        "代表机构：Microsoft"
      ],
      "detail": "<p>100亿参数四边形拓扑生成</p>"
    }
  ],
  "categories": {
    "representation": {
      "label": "3D表征奠基",
      "color": "#3b82f6"
    },
    "optimization": {
      "label": "基于优化的生成",
      "color": "#8b5cf6"
    },
    "feed_forward": {
      "label": "前馈快速生成",
      "color": "#10b981"
    },
    "texture": {
      "label": "纹理生成",
      "color": "#f59e0b"
    },
    "native_3d": {
      "label": "原生3D生成",
      "color": "#ef4444"
    }
  },
  "projectUrls": {}
};
