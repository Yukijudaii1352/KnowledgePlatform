/**
 * 3d_generation-data.js — 由 pipeline/build.py 于 2026-06-16 17:00:08 自动生成。
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
    "image_base": "",
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
      "summary": "NeRF 把一个静态场景表示为连续函数 $F_\\Theta:(\\mathbf{x},\\mathbf{d})\\rightarrow(\\sigma,\\mathbf{c})$，再用可微体渲染从多视角照片中优化这个函数，从而用一个 MLP 学到几何密度与视角相关外观。",
      "keyPoints": [
        "<strong>表示方式</strong>：输入 3D 坐标 $\\mathbf{x}$ 与观察方向 $\\mathbf{d}$，输出体密度 $\\sigma$ 和 RGB 颜色 $\\mathbf{c}$；几何主要由 $\\sigma(\\mathbf{x})$ 承载，镜面/高光等视角效应由 $\\mathbf{c}(\\mathbf{x},\\mathbf{d})$ 承载。",
        "<strong>训练信号</strong>：不需要 3D 标注，只需要已知相机位姿的 posed images；损失是渲染颜色与真实像素的 MSE。",
        "<strong>关键技巧</strong>：位置编码把低维坐标映射到高频 Fourier 特征，分层采样把样本集中到有贡献的深度区间。",
        "<strong>局限</strong>：逐射线采样加 MLP 查询非常慢；每个场景单独优化，不能直接一次前向泛化到新场景。"
      ],
      "detail": "<p><strong>核心示意图/框架图</strong></p>\n<p><img alt=\"NeRF rendering pipeline\" src=\"https://ar5iv.labs.arxiv.org/html/2003.08934/assets/x2.png\" /></p>\n<p>NeRF 的主线是“相机射线采样 -&gt; MLP 查询密度和颜色 -&gt; 体渲染积分 -&gt; 像素级监督”。对一条射线 $\\mathbf{r}(t)=\\mathbf{o}+t\\mathbf{d}$，连续体渲染写作：</p>\n<div class=\"kb-math kb-math-display\">C(\\mathbf{r})=\\int_{t_n}^{t_f}T(t)\\sigma(\\mathbf{r}(t))\\mathbf{c}(\\mathbf{r}(t),\\mathbf{d})dt,\\quad\nT(t)=\\exp\\left(-\\int_{t_n}^{t}\\sigma(\\mathbf{r}(s))ds\\right).</div>\n<p>离散实现中，把射线分成 $N$ 个样本，令 $\\alpha_i=1-\\exp(-\\sigma_i\\delta_i)$，权重为 $w_i=T_i\\alpha_i$，最终颜色为 $\\hat{C}(\\mathbf{r})=\\sum_i w_i\\mathbf{c}_i$。这个公式让密度既影响遮挡也影响几何边界，梯度可以从像素误差反传到每个采样点。</p>\n<p><strong>算法伪代码</strong></p>\n<pre><code class=\"language-python\">for step in training_steps:\n    rays, target_rgb = sample_camera_rays(images, poses)\n    z_coarse = stratified_samples(rays, near, far, N_coarse)\n    x = rays.o[:, None] + z_coarse[..., None] * rays.d[:, None]\n    sigma, rgb = mlp(posenc(x), posenc(rays.d))\n    rgb_coarse, weights = volume_render(sigma, rgb, z_coarse)\n\n    z_fine = importance_samples(z_coarse, weights, N_fine)\n    sigma_f, rgb_f = mlp(posenc(points(rays, z_fine)), posenc(rays.d))\n    rgb_fine, _ = volume_render(sigma_f, rgb_f, z_fine)\n\n    loss = mse(rgb_coarse, target_rgb) + mse(rgb_fine, target_rgb)\n    loss.backward()\n    optimizer.step()\n</code></pre>\n<p>位置编码是 NeRF 成功的必要条件之一。原始坐标直接输入 MLP 时，网络倾向先拟合低频函数，细纹理和锐边界会被平滑掉；NeRF 使用</p>\n<div class=\"kb-math kb-math-display\">\\gamma(p)=\\left(\\sin(2^0\\pi p),\\cos(2^0\\pi p),\\dots,\\sin(2^{L-1}\\pi p),\\cos(2^{L-1}\\pi p)\\right)</div>\n<p>把坐标展开到多频空间，使小 MLP 也能表达高频变化。论文还把坐标和方向分开处理：密度只依赖位置，颜色在较深层再注入方向，这个归纳偏置避免几何随视角漂移。</p>\n<p>分层采样解决的是计算预算问题。coarse 网络先在整条射线上粗采样，估计哪些深度段有较高权重；fine 网络再按权重分布重采样，让查询集中在物体表面附近。这个过程不是显式三角网格重建，而是在优化一个可微渲染器；因此 NeRF 很适合新视角合成，但提取可编辑几何还需要后处理。</p>",
      "quiz": {
        "q": "",
        "options": [],
        "answer": 0,
        "explain": ""
      }
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
      "summary": "Mip-NeRF 把 NeRF 的“无面积光线”升级为“有像素足迹的圆锥/圆台”，用集成位置编码对一个空间区域而非单点编码，从源头缓解多尺度训练和渲染中的混叠问题。",
      "keyPoints": [
        "<strong>问题定位</strong>：原始 NeRF 每条射线被视为无限细的线，训练图像分辨率变化或远近尺度变化时，同一像素覆盖的 3D 区域不同，点采样容易产生 aliasing。",
        "<strong>核心改动</strong>：用 conical frustum 表示像素对应的 3D 体积段，并用高斯近似该体积段。",
        "<strong>编码方式</strong>：把位置编码 $\\gamma(\\mathbf{x})$ 的输入从确定点换成随机变量 $\\mathbf{x}\\sim\\mathcal{N}(\\boldsymbol{\\mu},\\boldsymbol{\\Sigma})$，计算正弦/余弦的期望。",
        "<strong>工程收益</strong>：保留 NeRF 的体渲染框架，但减少 coarse/fine 双网络依赖，并在多尺度数据上明显更稳。"
      ],
      "detail": "<p><strong>核心示意图/框架图</strong></p>\n<p><img alt=\"Mip-NeRF cone tracing and integrated positional encoding\" src=\"https://ar5iv.labs.arxiv.org/html/2103.13415/assets/x1.png\" /></p>\n<p>Mip-NeRF 的关键观察是：一个像素不是一条数学射线，而是一个随深度扩张的圆锥。若仍只在圆锥中心线上采点，模型会被迫解释超过采样带宽的高频信号，训练视图和测试视图尺度不一致时就会出现闪烁、摩尔纹和模糊。</p>\n<p>论文用多元高斯近似圆台区间，并对位置编码取期望。对一维高斯 $x\\sim\\mathcal{N}(\\mu,\\sigma^2)$，有：</p>\n<div class=\"kb-math kb-math-display\">\\mathbb{E}[\\sin(\\omega x)]=\\exp\\left(-\\frac{1}{2}\\omega^2\\sigma^2\\right)\\sin(\\omega\\mu),\n\\quad\n\\mathbb{E}[\\cos(\\omega x)]=\\exp\\left(-\\frac{1}{2}\\omega^2\\sigma^2\\right)\\cos(\\omega\\mu).</div>\n<p>这个衰减项很重要：当像素足迹很大、方差很大时，高频项自动被压低；当足迹很小、方差接近 0 时，IPE 退化为普通位置编码。</p>\n<p><strong>算法伪代码</strong></p>\n<pre><code class=\"language-python\">for rays in training_batches:\n    # 每条像素射线带有 cone radius，采样得到一串圆台区间\n    intervals = sample_conical_frustums(rays, near, far)\n    gaussians = [approximate_frustum_as_gaussian(f) for f in intervals]\n\n    encoded = [integrated_positional_encoding(mu, cov) for mu, cov in gaussians]\n    sigma, rgb = nerf_mlp(encoded, viewdirs=rays.d)\n    pred_rgb = volume_render(sigma, rgb, intervals.depths)\n\n    loss = mse(pred_rgb, rays.target_rgb)\n    update(loss)\n</code></pre>\n<p>从方法上看，Mip-NeRF 不是简单的采样数增加，而是改变了输入信号的数学对象：从 $\\mathbf{x}$ 变为 $(\\boldsymbol{\\mu},\\boldsymbol{\\Sigma})$。这让网络看到的是“区域平均后的特征”，相当于内置了随尺度变化的低通滤波器。相比先渲染再做图像空间抗锯齿，Mip-NeRF 的滤波发生在辐射场查询之前，因此能减少错误几何和错误纹理被学进去。</p>\n<p>另一个容易忽略的点是 Mip-NeRF 保持了 NeRF 的可微体渲染损失，因此可直接接入多视角重建流程。它的贡献主要在表示与采样层，而不是引入新的监督。后续 Zip-NeRF、Mip-NeRF 360 等工作继续沿着“区域编码 + 高效结构”的路线扩展大场景和无界场景。</p>",
      "quiz": {
        "q": "",
        "options": [],
        "answer": 0,
        "explain": ""
      }
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
      "summary": "Instant-NGP 用多分辨率哈希网格把大量空间细节存到可学习特征表中，让小 MLP 只负责轻量解码，从而把 NeRF 类表示的训练和渲染速度提升到交互级。",
      "keyPoints": [
        "<strong>瓶颈转移</strong>：原始 NeRF 把几何和外观都压在大 MLP 里，查询慢；Instant-NGP 把表示容量放到哈希表特征中，MLP 变得很小。",
        "<strong>多分辨率</strong>：低层网格捕捉粗结构，高层网格捕捉局部细节；不同层特征拼接后输入 tiny MLP。",
        "<strong>哈希冲突</strong>：细网格坐标远多于表项，冲突不可避免；优化会利用多层上下文和梯度自动解冲突。",
        "<strong>系统实现</strong>：CUDA hash encoding、fully-fused MLP、occupancy grid 跳空共同构成速度优势。"
      ],
      "detail": "<p><strong>核心示意图/框架图</strong></p>\n<p><img alt=\"Instant-NGP neural graphics primitives comparison\" src=\"https://ar5iv.labs.arxiv.org/html/2201.05989/assets/Figures/teaser/nerf_00.jpg\" /></p>\n<p>论文的核心模块是 multiresolution hash encoding。给定归一化坐标 $\\mathbf{x}$，第 $l$ 层把它缩放到分辨率 $N_l$ 的网格，取周围 $2^d$ 个顶点；每个整数顶点通过哈希函数映射到大小为 $T$ 的特征表，取出特征后做线性/三线性插值。所有层的插值特征拼接成 $\\mathrm{enc}(\\mathbf{x};\\theta)$：</p>\n<div class=\"kb-math kb-math-display\">N_l=\\left\\lfloor N_{\\min} b^l \\right\\rfloor,\\quad\n\\mathbf{y}=\\mathrm{MLP}\\left([\\mathrm{interp}_1(\\mathbf{x}),\\dots,\\mathrm{interp}_L(\\mathbf{x})]\\right).</div>\n<p>哈希表大小 $T$ 控制内存和冲突。粗层通常几乎无冲突，保证全局一致性；细层冲突多但只影响高频细节，且不同空间点在其他层的上下文不同，小 MLP 可以学习把冲突影响分开。</p>\n<p><strong>算法伪代码</strong></p>\n<pre><code class=\"language-python\">def hash_grid_encode(x):\n    features = []\n    for level in range(L):\n        x_l = x * resolution(level)\n        corners, weights = grid_corners_and_weights(x_l)\n        f_l = 0\n        for corner, w in zip(corners, weights):\n            index = spatial_hash(corner) % table_size(level)\n            f_l += w * hash_table[level][index]\n        features.append(f_l)\n    return concat(features)\n\nfor rays, rgb_gt in batches:\n    z = sample_with_occupancy_grid(rays)\n    enc = hash_grid_encode(points(rays, z))\n    sigma, color = tiny_mlp(enc, viewdirs=rays.d)\n    rgb = volume_render(sigma, color, z)\n    update(mse(rgb, rgb_gt))\n</code></pre>\n<p>Instant-NGP 的贡献既是表示，也是系统设计。哈希网格提供高容量局部特征，tiny MLP 降低每次查询的计算量；occupancy grid 周期性记录哪些空间块可能非空，渲染时跳过空区域，减少无效采样。三者结合后，速度提升不是来自单一技巧，而是查询次数、每次查询成本和 GPU kernel overhead 同时下降。</p>\n<p>与 Plenoxels 等纯显式体素方法相比，Instant-NGP 仍保留了神经解码器，因此能在固定内存下共享统计规律；与原始 NeRF 相比，它更依赖工程优化和 GPU 友好结构。后续大量 3D 生成系统把 hash grid 当成默认 NeRF backbone，正是因为它把“逐场景优化”从小时级推进到分钟甚至秒级。</p>",
      "quiz": {
        "q": "",
        "options": [],
        "answer": 0,
        "explain": ""
      }
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
      "summary": "Plenoxels 证明了 NeRF 式新视角合成不一定需要 MLP：用稀疏体素直接存密度和球谐颜色系数，也能通过可微体渲染从多视角图像优化出高质量辐射场。",
      "keyPoints": [
        "<strong>显式表示</strong>：每个活跃体素存储密度 $\\sigma$ 和 spherical harmonics 颜色系数，查询时三线性插值。",
        "<strong>无需神经网络</strong>：优化变量就是体素参数，避免大量 MLP 前向查询，训练速度显著提高。",
        "<strong>正则化关键</strong>：总变分（TV）等空间正则约束密度和颜色系数，防止体素噪声和漂浮伪影。",
        "<strong>取舍</strong>：速度快、可解释性强，但内存随空间分辨率增长，对大场景和连续细节的压缩能力弱于神经编码。"
      ],
      "detail": "<p><strong>核心示意图/框架图</strong></p>\n<p><img alt=\"Plenoxels sparse voxel radiance field\" src=\"https://ar5iv.labs.arxiv.org/html/2112.05131/assets/x1.png\" /></p>\n<p>Plenoxels 的“Plenoptic Voxels”把辐射场拆成两个显式表：密度网格和颜色基函数系数网格。给定空间点 $\\mathbf{x}$，先在稀疏体素结构中插值得到 $\\sigma(\\mathbf{x})$ 和一组球谐系数 $\\mathbf{k}_{lm}(\\mathbf{x})$；给定方向 $\\mathbf{d}$，颜色由球谐基展开：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{c}(\\mathbf{x},\\mathbf{d})=\\sum_{l=0}^{L}\\sum_{m=-l}^{l}\\mathbf{k}_{lm}(\\mathbf{x})Y_{lm}(\\mathbf{d}).</div>\n<p>这样，视角相关外观由方向基函数表达，空间变化由体素参数表达。渲染仍然使用 NeRF 同款 alpha compositing，因此训练损失可以保持为像素重建误差。</p>\n<p><strong>算法伪代码</strong></p>\n<pre><code class=\"language-python\">initialize_sparse_voxels()\nfor step in training_steps:\n    rays, target = sample_rays(images, poses)\n    samples = sample_points_along_rays(rays)\n\n    sigma = trilinear_interpolate(density_grid, samples.xyz)\n    sh_coef = trilinear_interpolate(sh_grid, samples.xyz)\n    rgb = evaluate_spherical_harmonics(sh_coef, samples.viewdir)\n    pred = volume_render(sigma, rgb, samples.depth)\n\n    loss = mse(pred, target)\n    loss += lambda_tv * total_variation(density_grid, sh_grid)\n    loss += lambda_sparsity * sparsity_regularizer(density_grid)\n    update_voxel_values(loss)\n    prune_low_density_voxels()\n</code></pre>\n<p>Plenoxels 的重要意义在于把“NeRF 的效果”与“必须使用神经网络”解耦。NeRF 的核心其实是可微体渲染和多视角监督，MLP 只是其中一种连续函数参数化。Plenoxels 用显式网格换来更直接的优化：梯度更新落在局部体素上，因此收敛快；但也更依赖网格分辨率和剪枝策略。</p>\n<p>正则化是这篇论文能工作的关键。没有 TV 约束时，显式体素很容易把每个训练视角的误差记成孤立噪声；TV 让相邻体素的密度和颜色系数平滑变化，稀疏正则推动空区域密度变小。它也提示后续方法：显式结构需要强约束，隐式结构则把一部分平滑性藏在网络架构和编码中。</p>",
      "quiz": {
        "q": "",
        "options": [],
        "answer": 0,
        "explain": ""
      }
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
      "summary": "3D Gaussian Splatting 用一组可优化的各向异性 3D 高斯替代逐点 MLP 体渲染，并通过可微 tile-based splatting 实现高质量、实时级的新视角渲染。",
      "keyPoints": [
        "<strong>表示对象</strong>：每个 primitive 是带中心、协方差、不透明度和球谐颜色的 3D 高斯，而不是隐式 MLP 或规则体素。",
        "<strong>渲染方式</strong>：把 3D 高斯投影成屏幕空间 2D 椭圆，按深度排序后 alpha compositing。",
        "<strong>优化策略</strong>：从 SfM 点云初始化，训练中根据梯度和尺度进行 clone/split/prune，实现自适应密度控制。",
        "<strong>影响</strong>：把高质量 radiance field 渲染从离线推向实时，成为后续 3D 编辑、动态场景和生成式 3D 的基础表示。"
      ],
      "detail": "<p><strong>核心示意图/框架图</strong></p>\n<p><img alt=\"3D Gaussian Splatting method overview\" src=\"https://ar5iv.labs.arxiv.org/html/2308.04079/assets/x2.png\" /></p>\n<p>3DGS 的每个高斯可写为：</p>\n<div class=\"kb-math kb-math-display\">G(\\mathbf{x})=\\exp\\left(-\\frac{1}{2}(\\mathbf{x}-\\boldsymbol{\\mu})^\\top\\Sigma^{-1}(\\mathbf{x}-\\boldsymbol{\\mu})\\right),</div>\n<p>其中协方差用旋转 $R$ 和尺度 $S$ 参数化为 $\\Sigma=RSS^\\top R^\\top$，以保证半正定。颜色常用球谐系数表达方向相关外观，不透明度 $\\alpha$ 控制该高斯对像素的贡献。</p>\n<p>渲染时，高斯经相机投影近似为 2D 协方差：</p>\n<div class=\"kb-math kb-math-display\">\\Sigma&#x27; = J W \\Sigma W^\\top J^\\top,</div>\n<p>其中 $W$ 是视图变换，$J$ 是投影雅可比。对每个 tile 收集可能覆盖的高斯，按深度排序，再执行前向 alpha compositing。</p>\n<p><strong>算法伪代码</strong></p>\n<pre><code class=\"language-python\">gaussians = initialize_from_sfm_points(point_cloud)\nfor step in training_steps:\n    camera, target = sample_view()\n    visible = project_gaussians_to_tiles(gaussians, camera)\n    pred = rasterize_sorted_gaussian_splats(visible, camera)\n\n    loss = l1(pred, target) + lambda_dssim * dssim(pred, target)\n    update_gaussian_params(loss)\n\n    if step % densify_interval == 0:\n        clone_high_gradient_small_gaussians(gaussians)\n        split_high_gradient_large_gaussians(gaussians)\n        prune_low_opacity_or_huge_gaussians(gaussians)\n</code></pre>\n<p>3DGS 的关键不只是“用高斯”，而是把表示、初始化、优化和光栅化合成一个闭环。SfM 点云给出合理的初始几何位置；高斯的各向异性尺度让一个 primitive 能覆盖面片状结构；自适应 densification 在欠拟合区域增加容量；tile-based renderer 让 GPU 可以高效处理大量 splat。</p>\n<p>相比 NeRF，3DGS 避免了沿射线密集采样，也不需要对每个采样点跑 MLP，因此渲染速度数量级提升。但它的显式 primitive 也带来新问题：高斯可能变得过大、过细或漂浮，边缘处可能出现半透明晕影。后续 HGS、2DGS、MCMC densification 等工作大多围绕这些 artifact 和几何一致性继续改进。</p>",
      "quiz": {
        "q": "",
        "options": [],
        "answer": 0,
        "explain": ""
      }
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
      "summary": "HGS 针对 3DGS 中软高斯过度平滑、针状高斯和边界模糊的问题，引入更“硬”的高斯支持与误差引导增长策略，让显式 splatting 更接近清晰表面重建。",
      "keyPoints": [
        "<strong>资料限制说明</strong>：manifest 给出的 <code>https://arxiv.org/abs/2601.05000</code> 实际不是 HGS 论文；公开可核验的 HGS 论文为 <code>Pushing Rendering Boundaries: Hard Gaussian Splatting</code>，arXiv 链接是 <code>https://arxiv.org/abs/2412.04826</code>。以下解读基于该公开论文与 manifest 元信息。",
        "<strong>问题定位</strong>：3DGS 的 Gaussian kernel 具有无限软尾，过大或拉长的高斯会造成 blur、needle artifact 和边界泄漏。",
        "<strong>核心思想</strong>：让高斯贡献更局部、更接近硬边界，并把新增高斯放到渲染误差真正集中的位置。",
        "<strong>继承关系</strong>：仍沿用 3DGS 的显式高斯、可微 splatting 和多视角重建训练，但修改 kernel/增长准则来改善清晰度。"
      ],
      "detail": "<p><strong>核心示意图/框架图</strong></p>\n<p><img alt=\"Hard Gaussian Splatting artifact analysis\" src=\"https://ar5iv.labs.arxiv.org/html/2412.04826/assets/x2.png\" /></p>\n<p>HGS 关注的是 3DGS 的一个结构性矛盾：高斯越软，优化越平滑、越容易覆盖空洞；但软尾会把颜色和透明度扩散到真实表面之外，特别是在边缘、细杆、薄片等区域。若优化为了拟合细节把高斯拉成长针状，又会带来不稳定的投影椭圆和异常 splat。</p>\n<p>论文题目中的 “Hard” 可以理解为限制或重塑高斯对像素的有效贡献区域，使一个 primitive 更像局部表面元素而不是无限扩散的半透明云。渲染误差引导的增长则把 densification 从“只看参数梯度”推进到“看图像残差在哪里没有被解释”。这能减少平均化增长：不是在已有高斯附近盲目 clone，而是在错误高、结构缺失的位置补容量。</p>\n<p><strong>算法伪代码</strong></p>\n<pre><code class=\"language-python\">gaussians = initialize_like_3dgs(sfm_points)\nfor step in training_steps:\n    camera, target = sample_training_view()\n    pred, visibility = hard_gaussian_rasterize(gaussians, camera)\n    residual = abs(pred - target)\n\n    loss = photometric_loss(pred, target) + regularize_shape_and_opacity(gaussians)\n    update_gaussians(loss)\n\n    if should_grow(step):\n        error_regions = find_high_residual_regions(residual, visibility)\n        add_or_split_gaussians_at(error_regions, gaussians)\n        suppress_degenerate_needle_gaussians(gaussians)\n        prune_low_contribution_gaussians(gaussians)\n</code></pre>\n<p>从 3DGS 的 alpha compositing 看，一个高斯的屏幕贡献近似是 $\\alpha_i G_i(\\mathbf{u})$，软尾意味着 $G_i(\\mathbf{u})$ 在远离中心时仍有非零贡献。HGS 类方法会通过截断、重加权或硬化 kernel 的方式降低远尾影响，使边界像素不再被背后或旁边的高斯“染色”。这对 thin structures 尤其重要，因为细结构的像素覆盖面积小，软尾平均会迅速吞掉局部对比度。</p>\n<p>HGS 的工程意义在于：3DGS 的实时性已经很好，下一阶段主要瓶颈转向几何质量和 artifact 控制。硬化 kernel 可能牺牲一部分优化平滑性，因此需要和误差引导增长、形状正则、剪枝策略配套使用。它不是替换 3DGS 的整体框架，而是对显式 Gaussian primitive 的有效支持域和密度控制进行修正。</p>",
      "quiz": {
        "q": "",
        "options": [],
        "answer": 0,
        "explain": ""
      }
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
      "summary": "DreamFusion 用冻结的 2D 文生图扩散模型作为先验，通过 Score Distillation Sampling（SDS）直接优化 NeRF，让随机初始化的 3D 表示逐步变成符合文本提示的可渲染物体。",
      "keyPoints": [
        "<strong>范式突破</strong>：不训练 3D 生成模型，也不需要文本-3D 数据；每个 prompt 单独优化一个 3D 表示。",
        "<strong>核心损失</strong>：SDS 把扩散模型预测噪声与真实加噪噪声的差值转成对渲染图像的梯度，再反传到 NeRF 参数。",
        "<strong>3D 约束来源</strong>：同一个 NeRF 从随机相机反复渲染，所有视角共享一套参数，因此 2D 先验被“lift”到 3D。",
        "<strong>典型问题</strong>：SDS 倾向 mode-seeking，常出现过饱和、过平滑、Janus 多脸和几何不稳定。"
      ],
      "detail": "<p><strong>核心示意图/框架图</strong></p>\n<p><img alt=\"DreamFusion text-to-3D examples and pipeline context\" src=\"https://ar5iv.labs.arxiv.org/html/2209.14988/assets/x1.png\" /></p>\n<p>DreamFusion 的关键是把“采样扩散图像”改写成“优化一个可微图像生成器”。令 3D 参数为 $\\theta$，随机相机为 $c$，可微渲染得到图像 $x=g(\\theta,c)$。扩散模型在噪声步 $t$ 上看到 $x_t=\\alpha_t x+\\sigma_t\\epsilon$，并预测噪声 $\\hat{\\epsilon}_\\phi(x_t,t,y)$。SDS 使用近似梯度：</p>\n<div class=\"kb-math kb-math-display\">\\nabla_\\theta \\mathcal{L}_{\\text{SDS}}\n=\n\\mathbb{E}_{t,\\epsilon,c}\\left[\nw(t)\\left(\\hat{\\epsilon}_\\phi(x_t,t,y)-\\epsilon\\right)\n\\frac{\\partial x}{\\partial \\theta}\n\\right].</div>\n<p>这个梯度不需要反传穿过扩散 U-Net 的所有内部计算，只把 U-Net 输出当作一个图像空间更新方向。直观上，如果当前渲染图加噪后不像 prompt 对应的自然图像，扩散模型会指出应该往哪个方向去噪；NeRF 渲染器再把这个方向传回密度和颜色。</p>\n<p><strong>算法伪代码</strong></p>\n<pre><code class=\"language-python\">theta = initialize_nerf()\ndiffusion = frozen_text_to_image_model()\nfor step in range(num_steps):\n    cam = sample_random_camera()\n    image = render_nerf(theta, cam)\n    t = sample_diffusion_timestep()\n    eps = normal_like(image)\n    x_t = alpha[t] * image + sigma[t] * eps\n\n    eps_hat = diffusion.predict_noise(x_t, t, text_prompt, guidance_scale=large)\n    grad_image = weight(t) * (eps_hat - eps)\n    backprop_to_nerf(image, grad_image)\n    apply_geometry_regularizers(theta)\n</code></pre>\n<p>DreamFusion 还加入了面向 3D 的工程约束，例如随机视角采样、前景/背景处理、法线与深度相关正则，以及鼓励表面朝向相机的 orientation loss。没有这些约束时，SDS 很容易只优化出能骗过单视角扩散模型的纹理云，而不是闭合、可旋转的物体。</p>\n<p>这篇论文的历史价值大于其最终视觉质量：它证明了强 2D 扩散模型可以作为通用 3D 先验，开创了 text-to-3D 的 optimization-based 路线。后续 Magic3D、Fantasia3D、ProlificDreamer、MVDream 等工作基本都在回答两个问题：如何改进 SDS 的梯度质量，以及如何换更强、更快、更可编辑的 3D 表示。</p>",
      "quiz": {
        "q": "",
        "options": [],
        "answer": 0,
        "explain": ""
      }
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
      "summary": "ProlificDreamer 把 DreamFusion 的单点 SDS 推广成 Variational Score Distillation（VSD），把 3D 参数看作分布中的样本，并用 LoRA 估计当前 3D 分布的图像 score，从而减少过平滑、过饱和和低多样性。",
      "keyPoints": [
        "<strong>理论改写</strong>：SDS 优化一个确定的 3D 参数点；VSD 优化一组 3D 粒子所代表的分布。",
        "<strong>梯度来源</strong>：更新方向由预训练扩散模型 score 与当前渲染分布 score 的差给出，而不是简单的 $\\hat{\\epsilon}-\\epsilon$。",
        "<strong>LoRA 角色</strong>：在冻结扩散模型上训练轻量 LoRA，近似当前 3D 粒子渲染图像分布的 score。",
        "<strong>实践改进</strong>：高分辨率渲染、时间步调度、场景初始化和 mesh fine-tuning 共同提升保真度。"
      ],
      "detail": "<p><strong>核心示意图/框架图</strong></p>\n<p><img alt=\"ProlificDreamer text-to-3D samples\" src=\"https://ar5iv.labs.arxiv.org/html/2305.16213/assets/x1.png\" /></p>\n<p>SDS 的问题可以理解为：它把一个 prompt 的多模态图像分布压成一个确定更新方向，多个合理外观会被平均，结果容易过平滑。VSD 从变分推断角度把 3D 参数 $\\theta$ 当作随机变量，目标是让渲染图像分布 $q^\\mu(x|y)$ 接近预训练扩散模型定义的图像分布 $p_\\phi(x|y)$：</p>\n<div class=\"kb-math kb-math-display\">\\min_{\\mu}\\ \\mathrm{KL}\\left(q^\\mu(x|y)\\ \\|\\ p_\\phi(x|y)\\right).</div>\n<p>实际更新可理解为两个 score 的差：</p>\n<div class=\"kb-math kb-math-display\">\\nabla_\\theta \\mathcal{L}_{\\text{VSD}}\n\\propto\nw(t)\\left(\\hat{\\epsilon}_{\\text{pretrain}}(x_t,t,y)\n-\\hat{\\epsilon}_{\\text{LoRA}}(x_t,t,c,y)\\right)\n\\frac{\\partial x}{\\partial \\theta}.</div>\n<p>其中预训练模型给出“文本图像先验”的 score，LoRA 模型给出“当前 3D 渲染分布”的 score；二者相减更像把粒子分布推向目标分布，而不是把所有样本压到单一模式。</p>\n<p><strong>算法伪代码</strong></p>\n<pre><code class=\"language-python\">particles = [initialize_3d_representation() for _ in range(num_particles)]\nlora_score = attach_lora_to_frozen_diffusion()\nfor step in range(num_steps):\n    for theta in particles:\n        cam = sample_camera()\n        image = render(theta, cam)\n        t, eps = sample_t_and_noise()\n        x_t = alpha[t] * image + sigma[t] * eps\n\n        eps_target = frozen_diffusion(x_t, t, prompt)\n        eps_current = lora_score(x_t, t, prompt, cam)\n        grad_image = weight(t) * (eps_target - eps_current)\n        update_3d_particle(theta, image, grad_image)\n\n    train_lora_on_current_particle_renderings(lora_score, particles)\n</code></pre>\n<p>ProlificDreamer 的贡献不只是一条新公式，也包括系统性梳理 text-to-3D 的训练设计空间。论文强调普通图像扩散常用的 CFG 权重在 VSD 下更稳定，而 SDS 往往依赖很大的 guidance scale 才能成形。VSD 还可以先优化 NeRF，再转 mesh 细化，让几何和纹理更适合最终资产输出。</p>\n<p>需要注意的是，VSD 的质量来自更多计算和更复杂的训练闭环：每一步既要更新 3D 表示，也要维护 LoRA score 估计。它降低了 SDS 的模式坍缩倾向，但没有从根本上提供严格多视角监督，因此在复杂 prompt 和遮挡结构上仍可能依赖表示、初始化和相机采样策略。</p>",
      "quiz": {
        "q": "",
        "options": [],
        "answer": 0,
        "explain": ""
      }
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
      "summary": "LucidDreamer 指出 SDS 的随机噪声伪 GT 会给同一个 3D 模型提供不一致更新，提出 Interval Score Matching（ISM）用确定性扩散轨迹上的区间 score 差来蒸馏，并结合 3D Gaussian Splatting 提升质量和速度。",
      "keyPoints": [
        "<strong>问题诊断</strong>：SDS 可被看作让渲染图追随扩散模型生成的 pseudo-GT；不同噪声和时间步产生的 pseudo-GT 不一致，平均后导致过平滑。",
        "<strong>ISM 核心</strong>：用确定性 DDIM 类轨迹连接两个时间步，在区间内匹配 score，减少随机目标方向的冲突。",
        "<strong>表示升级</strong>：用 3DGS 替代传统 NeRF 优化，使每次迭代渲染更快，也更容易得到清晰纹理。",
        "<strong>定位</strong>：它主要改进 distillation objective 和工程 pipeline，而不是训练新的大型 3D 生成模型。"
      ],
      "detail": "<p><strong>核心示意图/框架图</strong></p>\n<p><img alt=\"LucidDreamer SDS pseudo-GT analysis\" src=\"https://ar5iv.labs.arxiv.org/html/2311.11284/assets/x2.png\" /></p>\n<p>LucidDreamer 对 SDS 的解释很直接：给定同一个当前渲染 $x_0$，不同噪声 $\\epsilon$ 和时间步 $t$ 会诱导不同的 $\\hat{x}_0^t$，这些 pseudo-GT 在细节上可能互相矛盾。一个共享 3D 模型被迫同时朝多个方向更新，最终就会学到平均化纹理和模糊几何。</p>\n<p>ISM 试图避免这种“每次随机换目标”的问题。它沿确定性扩散轨迹构造两个相关状态 $x_t$ 与 $x_s$，并匹配它们之间的区间 score。论文中 ISM 目标可概括为：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{ISM}}(\\theta)\n=\n\\mathbb{E}_{t,c}\\left[\n\\omega(t)\\left\\|\n\\epsilon_\\phi(x_t,t,y)-\\epsilon_\\phi(x_s,s,\\emptyset)\n\\right\\|^2\n\\right].</div>\n<p>其中 $x_t$ 来自当前 3D 渲染和文本条件，$x_s$ 来自同一确定性轨迹上的另一状态。这样更新更关注同一轨迹区间内的方向差，而不是把多个独立随机 pseudo-GT 混到一起。</p>\n<p><strong>算法伪代码</strong></p>\n<pre><code class=\"language-python\">gaussians = initialize_3d_gaussians()\ndiffusion = frozen_text_to_image_diffusion()\nfor step in range(num_steps):\n    cam = sample_camera()\n    image = render_gaussian_splatting(gaussians, cam)\n\n    t, s = sample_interval_timesteps()\n    x_t, x_s = deterministic_diffusion_interval(image, t, s)\n    eps_text = diffusion.predict_noise(x_t, t, prompt)\n    eps_base = diffusion.predict_noise(x_s, s, empty_prompt)\n\n    loss_ism = weight(t) * squared_norm(eps_text - eps_base)\n    update_gaussians_through_render(loss_ism)\n    apply_3dgs_density_and_opacity_control(gaussians)\n</code></pre>\n<p>结合 3DGS 后，LucidDreamer 的训练循环不再需要密集 NeRF MLP 查询，渲染和反传更快。显式高斯也让几何增长、剪枝、透明度控制更直接；这与 ISM 的稳定梯度配合，目标是用更少迭代得到更锐利的纹理和形状。</p>\n<p>不过 ISM 并不是多视图扩散模型。它缓解了 SDS 的噪声目标不一致，但文本先验仍主要来自单图扩散模型；对强对称、遮挡、细长结构的 3D 一致性，仍需要相机采样、表示正则或 MVDream 这类多视图先验补充。</p>",
      "quiz": {
        "q": "",
        "options": [],
        "answer": 0,
        "explain": ""
      }
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
      "summary": "Zero-1-to-3 把单图到新视角生成建模为相机条件的图像到图像扩散任务，通过输入图像特征和相对相机位姿控制，让大规模 2D 扩散模型获得可泛化的 3D 视角先验。",
      "keyPoints": [
        "<strong>输入输出</strong>：给一张物体图像和目标相对视角，生成该物体在目标视角下的图像。",
        "<strong>相机条件</strong>：将相对相机变化编码为低维向量，例如方位、俯仰和半径变化，再注入 latent diffusion。",
        "<strong>训练数据</strong>：使用 Objaverse 等 3D 资产渲染成多视角图像对，学习从源视图到目标视图的条件生成。",
        "<strong>用途</strong>：既可直接做 novel view synthesis，也可生成多视图伪观测后优化 NeRF/SDF/mesh。"
      ],
      "detail": "<p><strong>核心示意图/框架图</strong></p>\n<p><img alt=\"Zero-1-to-3 conditional latent diffusion architecture\" src=\"https://ar5iv.labs.arxiv.org/html/2303.11328/assets/x3.png\" /></p>\n<p>单图 3D 是高度欠约束问题：看不到的背面并没有唯一答案。Zero-1-to-3 的策略不是直接输出 3D，而是先学习“给定源图和相机变化时，合理目标视图长什么样”。这种形式保留了不确定性，也能继承 Stable Diffusion 的自然图像先验。</p>\n<p>训练时，取同一 3D 物体的两张渲染图 $x_{\\text{src}}$ 和 $x_{\\text{tgt}}$，计算相对相机 $\\Delta c$。扩散模型在目标图 latent 上做噪声预测：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}=\n\\mathbb{E}_{t,\\epsilon}\n\\left[\n\\left\\|\n\\epsilon -\n\\epsilon_\\theta(z_t,t,\\mathrm{CLIP}(x_{\\text{src}}),\\Delta c)\n\\right\\|^2\n\\right].</div>\n<p>其中源图通常通过 CLIP/image encoder 提供语义和外观条件，相机向量提供几何控制。论文中常用球坐标变化表示相机，例如 $[\\theta,\\sin(\\phi),\\cos(\\phi),r]$，避免俯仰角周期性表示不连续。</p>\n<p><strong>算法伪代码</strong></p>\n<pre><code class=\"language-python\">for src_img, tgt_img, rel_camera in rendered_view_pairs:\n    cond_img = image_encoder(src_img)\n    cond_pose = pose_mlp(rel_camera)\n    z = vae.encode(tgt_img)\n    t, eps = sample_t_and_noise()\n    z_t = alpha[t] * z + sigma[t] * eps\n\n    eps_pred = unet(z_t, t, image_condition=cond_img, pose_condition=cond_pose)\n    loss = mse(eps_pred, eps)\n    update(loss)\n\ndef generate_new_view(input_img, rel_camera):\n    return diffusion_sample(condition=(input_img, rel_camera))\n</code></pre>\n<p>Zero-1-to-3 的价值在于把 3D 先验变成可调用的 feed-forward 视角生成器。与 DreamFusion 类逐场景优化相比，它一次生成新视图只需几秒；与传统单图重建相比，它不被固定类别 CAD 先验限制。但生成的新视图之间可能不完全一致，所以后续 One-2-3-45、SyncDreamer、MVDream 等工作都在加强多视图一致性或直接把多视图作为联合输出。</p>",
      "quiz": {
        "q": "",
        "options": [],
        "answer": 0,
        "explain": ""
      }
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
      "summary": "One-2-3-45 把 Zero-1-to-3 的单图新视角生成与快速多视图 3D 重建串联起来，用少量合成视图在约 45 秒内得到可用 textured mesh，避免每个物体长时间 SDS 优化。",
      "keyPoints": [
        "<strong>流水线思路</strong>：一张输入图先扩展成若干规范视角图，再由多视图重建模块生成 3D 网格。",
        "<strong>继承 Zero123</strong>：利用相机条件扩散补全未观测视角，解决单图背面缺失问题。",
        "<strong>速度优势</strong>：目标不是逐 prompt 优化高质量 NeRF，而是快速产出 mesh，适合交互式预览和资产草稿。",
        "<strong>主要风险</strong>：前端生成视图若不一致，后端重建会融合出扭曲几何或贴图错位。"
      ],
      "detail": "<p><strong>核心示意图/框架图</strong></p>\n<p><img alt=\"One-2-3-45 pipeline\" src=\"https://ar5iv.labs.arxiv.org/html/2306.16928/assets/figures/pipeline.png\" /></p>\n<p>One-2-3-45 的名字概括了流程：从 one image 到若干 novel views，再到 3D mesh，并强调快速完成。它没有像 DreamFusion 那样把每次渲染送入扩散模型做长时间优化，而是把扩散模型用于一次性补视角，然后交给重建网络或重建流程融合。</p>\n<p>典型流程包括：先对输入图做前景分割和规范化；用 Zero-1-to-3 生成固定相机集合的多视图，例如左右后等视角；再用多视图条件的几何重建方法估计隐式表面或体素/SDF；最后用 marching cubes 等方式提取 mesh，并从输入与生成视图回投纹理。</p>\n<p><strong>算法伪代码</strong></p>\n<pre><code class=\"language-python\">input_img = remove_background_and_center(object_image)\nviews = {front: input_img}\nfor pose in canonical_target_poses:\n    views[pose] = zero123_generate(input_img, rel_camera=pose)\n\nrecon_features = encode_multiview_images(views, camera_poses)\nsdf_or_density = reconstruct_geometry(recon_features)\nmesh = extract_mesh(sdf_or_density)\ntexture = project_or_optimize_texture(mesh, views, camera_poses)\nreturn mesh, texture\n</code></pre>\n<p>从技术取舍看，One-2-3-45 把难题分解成两个较容易工程化的模块。扩散模型负责“想象不可见部分”，重建模块负责“把多视图约束变成 3D”。这种模块化很实用：可以替换更强的视图生成器，也可以替换更强的重建器；但误差也会级联，前一阶段的幻觉会被后一阶段当作观测。</p>\n<p>相对优化式 text/image-to-3D，One-2-3-45 的重建速度是最大卖点；相对真正多视图摄影测量，它又能从单图启动。它适合快速生成粗网格，但对细节、背面真实性、透明/反光材料和非典型物体仍依赖 Zero123 先验的泛化能力。</p>",
      "quiz": {
        "q": "",
        "options": [],
        "answer": 0,
        "explain": ""
      }
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
      "summary": "MVDream 训练一个能同时生成一致多视图图像的扩散模型，并把它作为 text-to-3D 的多视图 SDS 先验，显著缓解单视角 2D lifting 中的 Janus 和视角漂移问题。",
      "keyPoints": [
        "<strong>核心动机</strong>：单图扩散模型每次只看一个视角，容易在不同角度重复生成正面语义或让内容漂移。",
        "<strong>模型改动</strong>：在 Stable Diffusion U-Net 基础上加入跨视图连接/3D self-attention，并为每个视图注入相机 embedding。",
        "<strong>训练策略</strong>：混合 3D 渲染多视图数据和大规模 2D 图文数据，兼顾多视图一致性与开放词汇泛化。",
        "<strong>3D 使用方式</strong>：一次渲染多个相机视图，把多视图扩散模型的 score 同时蒸馏到同一个 3D 表示。"
      ],
      "detail": "<p><strong>核心示意图/框架图</strong></p>\n<p><img alt=\"MVDream multi-view diffusion model\" src=\"https://ar5iv.labs.arxiv.org/html/2308.16512/assets/x6.png\" /></p>\n<p>MVDream 的关键判断是：仅仅让扩散模型知道“当前是背面视角”还不够，因为每个视图独立生成时仍可能各自满足文本，却彼此不一致。真正需要的是联合建模一组视图，让前后左右共享身份、纹理和结构。</p>\n<p>形式上，模型输入是一组 noisy latent $\\mathbf{x}_t\\in\\mathbb{R}^{F\\times H\\times W\\times C}$，其中 $F$ 是视图数。U-Net 保留文本 cross-attention，同时把原本只在单张图内部做的 self-attention 扩展到跨视图维度，并加入相机参数：</p>\n<div class=\"kb-math kb-math-display\">\\epsilon_\\theta =\n\\epsilon_\\theta(\\mathbf{x}_t,t,y,\\{c_1,\\dots,c_F\\}).</div>\n<p>训练损失仍是扩散噪声预测 MSE：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}=\n\\mathbb{E}_{t,\\epsilon}\n\\left[\n\\left\\|\n\\epsilon-\\epsilon_\\theta(\\mathbf{x}_t,t,y,\\mathbf{c})\n\\right\\|^2\n\\right],</div>\n<p>但样本是同一物体的多视图组，因此模型被迫学习跨视角一致性。</p>\n<p><strong>算法伪代码</strong></p>\n<pre><code class=\"language-python\"># train multi-view diffusion\nfor multiview_images, cameras, text in training_data:\n    z = vae.encode(multiview_images)  # shape: F x H x W x C\n    t, eps = sample_t_and_noise()\n    z_t = alpha[t] * z + sigma[t] * eps\n    eps_pred = multiview_unet(z_t, t, text, camera_embeddings(cameras))\n    update(mse(eps_pred, eps))\n\n# use as 3D prior\nfor step in range(num_3d_steps):\n    cameras = sample_camera_group()\n    renders = render_3d_representation(theta, cameras)\n    grad = multiview_sds_gradient(renders, prompt, cameras)\n    update_3d(theta, grad)\n</code></pre>\n<p>MVDream 对 optimization-based 3D 生成的意义很明确：把每次监督从“单张随机视角图像”升级为“相互通信的一组视角”。同一个 3D 表示在同一步被多个相机共同约束，扩散模型也能在注意力层看到其他视图，从而减少多脸、纹理漂移和背面语义重生。</p>\n<p>它的代价是训练和推理更重，并且多视图扩散模型的相机分布会影响泛化范围。若目标视角、物体类型或风格远离训练分布，仍可能出现不一致；但相对 Zero123 式逐视图生成和 DreamFusion 式单视图 SDS，MVDream 提供了更直接的多视图先验。</p>",
      "quiz": {
        "q": "",
        "options": [],
        "answer": 0,
        "explain": ""
      }
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
      "summary": "Wonder3D 提出用跨域扩散模型同时生成多视图 RGB 图和法线图，解决单图到 3D 中多视图外观、几何不一致的问题。它把 2D 扩散先验转化为一致的多视图监督，再通过法线融合和重建模块得到可用 3D 资产。",
      "keyPoints": [
        "双域输出：同一扩散过程同时预测多视图颜色图与多视图法线图。",
        "跨域注意力：让 RGB 分支和 normal 分支共享结构信息，减少纹理与几何错位。",
        "多视图一致性：固定一组正交或环绕相机视角，生成可直接用于重建的视图集合。",
        "单图条件控制：输入参考图提供物体身份、轮廓和纹理风格，扩散模型补全不可见面。",
        "下游重建：把多视图 RGB/normal 作为监督，优化神经表面或网格纹理，得到可渲染 3D 资产。"
      ],
      "detail": "<p><img alt=\"Wonder3D 框架图\" src=\"https://www.xxlong.site/Wonder3D/assets/pipeline.png\" />\n<em>图：Wonder3D 项目页给出的整体流程，从单张输入图生成一致多视图 RGB/normal，再进行 3D 重建。</em></p>\n<pre><code class=\"language-python\"># Wonder3D 核心流程伪代码\nimage = load_reference_image()\nviews = sample_fixed_cameras(num_views=6)\n\n# 1. 多视图跨域扩散\nrgb_views, normal_views = cross_domain_diffusion(\n    condition=image,\n    cameras=views,\n    domains=[&quot;rgb&quot;, &quot;normal&quot;],\n)\n\n# 2. 用法线约束几何，用 RGB 约束外观\nsurface = initialize_implicit_surface()\nfor step in range(num_reconstruction_steps):\n    rendered_rgb, rendered_normal = render(surface, views)\n    loss = l1(rendered_rgb, rgb_views) + lambda_n * normal_loss(rendered_normal, normal_views)\n    surface.update(loss)\n\nmesh = extract_mesh(surface)\ntexture = bake_texture(mesh, rgb_views)\n</code></pre>\n<p>Wonder3D 的动机来自单图 3D 生成中的两个典型失败：第一，扩散模型逐视角生成时会把同一物体的不同侧面画成不同实例；第二，只依靠 RGB 监督重建时，几何会被纹理误导，出现凹凸不一致、背面塌陷或轮廓漂移。它把问题拆成“先生成一致多视图观测，再重建 3D”，避免直接在 3D 空间用 2D 分数蒸馏慢速优化。</p>\n<p>核心设计是跨域扩散。模型不是单独生成颜色图，而是把颜色域 <span class=\"kb-math kb-math-inline\">I_v</span> 与法线域 <span class=\"kb-math kb-math-inline\">N_v</span> 作为两个互补输出：颜色负责身份和材质，法线负责几何朝向。跨域注意力让两个域之间交换中间特征，使颜色边界、局部部件和法线结构互相校正。直观地说，法线分支告诉 RGB 分支“这个部件应该转到哪里”，RGB 分支告诉法线分支“这个区域属于哪个语义部件”。</p>\n<p>多视图一致性通常通过固定相机集合实现。给定输入图 <span class=\"kb-math kb-math-inline\">I_0</span> 和视角集合 <span class=\"kb-math kb-math-inline\">\\{c_v\\}_{v=1}^{V}</span>，扩散网络学习条件分布：</p>\n<div class=\"kb-math kb-math-display\">p_{\\theta}(\\{I_v, N_v\\}_{v=1}^{V} \\mid I_0, \\{c_v\\}_{v=1}^{V})</div>\n<p>与只生成单视角图像相比，这个联合分布把不同视角放在同一次 denoising 过程中建模，因此同一 token/注意力上下文可以跨视角传播，减少“每张图都合理但合在一起不成立”的问题。</p>\n<p>重建阶段把生成结果转为显式或隐式 3D。颜色损失约束表面纹理，法线损失约束局部几何方向：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}=\\sum_v \\|R_{\\text{rgb}}(S,c_v)-I_v\\|_1+\n\\lambda_n\\sum_v \\|R_{\\text{normal}}(S,c_v)-N_v\\|_1</div>\n<div class=\"key-point\">💡 关键：Wonder3D 的核心不是提出新的 3D 表示，而是用“RGB + normal 的一致多视图生成”给后端重建提供更可靠的观测。</div>\n<p>相对 MVDream 这类多视图扩散方法，Wonder3D 更强调跨域几何信号。MVDream 主要解决多视图外观一致性，Wonder3D 则把法线作为显式中间监督，让几何重建不必完全从 RGB 中推断表面朝向。这也是它能在单图条件下减少背面扭曲和细节漂移的主要原因。</p>",
      "quiz": {
        "q": "Wonder3D 为什么同时生成 RGB 图和法线图？",
        "options": [
          "为了把生成速度降低到可交互级别",
          "为了让外观与几何互相约束，提高多视图重建一致性",
          "为了避免使用任何 3D 重建模块",
          "为了只训练一个纯文本到图像模型"
        ],
        "answer": 1,
        "explain": "RGB 提供纹理和语义，法线提供表面朝向；二者通过跨域注意力协同，能显著减少多视图几何和外观不一致。"
      }
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
      "summary": "LRM 提出用大规模 Transformer 从单张图像直接预测 triplane-NeRF，解决传统单图 3D 重建需要逐实例优化、速度慢且泛化弱的问题。它把 3D 重建训练成前馈预测任务，使一次前向即可得到可体渲染的 3D 表示。",
      "keyPoints": [
        "图像编码器：使用预训练 DINO 提取单图语义与局部视觉特征。",
        "Transformer 解码器：以 triplane token 为查询，通过 cross-attention 从图像特征中读取 3D 信息。",
        "Triplane-NeRF 表示：用三张正交特征平面表示 3D 场，MLP 输出颜色和密度。",
        "端到端监督：对随机目标视角进行体渲染，用 RGB/感知损失训练。",
        "大规模数据：在约百万级 3D 数据上训练，依靠数据规模获得类别泛化。"
      ],
      "detail": "<p><img alt=\"LRM 总体架构\" src=\"https://arxiv.org/html/2311.04400v2/x1.png\" />\n<em>图：LRM 的 DINO 图像编码器、Transformer image-to-triplane 解码器和 triplane-NeRF 渲染流程。</em></p>\n<pre><code class=\"language-python\"># LRM 核心流程伪代码\nimage = preprocess(input_image)\nimage_tokens = DINO(image)\n\ntriplane_tokens = learnable_queries(shape=(3, Ht, Wt, C))\nfor block in transformer_decoder:\n    triplane_tokens = block.self_attention(triplane_tokens)\n    triplane_tokens = block.cross_attention(query=triplane_tokens, key_value=image_tokens)\n\ntriplanes = reshape_to_three_planes(triplane_tokens)\nfor ray in target_camera.rays:\n    samples = sample_points(ray)\n    feats = bilinear_sample_triplanes(triplanes, samples)\n    sigma, color = mlp(feats, view_dir=ray.direction)\n    pixel = volume_render(sigma, color)\n</code></pre>\n<p>LRM 的核心判断是：单图 3D 重建不一定要为每个物体单独优化 NeRF，也可以像图像生成模型一样通过大规模监督学习得到一个通用重建器。输入图像先由 DINO 编码，DINO 的预训练特征保留了物体类别、部件和轮廓信息，减少从零学习视觉语义的成本。</p>\n<p>Transformer 解码器负责从 2D token 生成 3D triplane token。triplane 是三张互相正交的平面特征 <span class=\"kb-math kb-math-inline\">T_{xy},T_{xz},T_{yz}</span>。对任意 3D 点 <span class=\"kb-math kb-math-inline\">\\mathbf{x}=(x,y,z)</span>，分别投影到三张平面采样特征并聚合：</p>\n<div class=\"kb-math kb-math-display\">f(\\mathbf{x}) =\n\\phi(T_{xy}(x,y), T_{xz}(x,z), T_{yz}(y,z))</div>\n<p>随后 MLP 预测该点的体密度和颜色：</p>\n<div class=\"kb-math kb-math-display\">(\\sigma, \\mathbf{c}) = \\text{MLP}(f(\\mathbf{x}), \\mathbf{d})</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\mathbf{d}</span> 是视线方向。最终通过 NeRF 体渲染把沿光线的颜色和密度积分成目标视角像素。训练时，模型看到输入视角，但监督来自同一 3D 资产的多个随机目标视角，因此它必须学习从可见面推断完整形体。</p>\n<p>LRM 与 Zero-1-to-3 类方法的差异在于目标表示。Zero-1-to-3 主要生成新视角图像，仍需要额外多视图融合或优化；LRM 直接输出一个连续 3D 表示，可以从任意相机渲染。与 DreamFusion/Magic3D 这类优化式方法相比，LRM 把推理成本从几十分钟级逐实例优化降到一次前向加渲染。</p>\n<div class=\"key-point\">💡 关键：LRM 的“Large”不只是模型大，更重要是用大规模 3D 数据把单图补全先验学进 Transformer。</div>\n<p>局限也很明确：单张图像的不可见区域仍然依赖数据先验，复杂拓扑、透明材质、细长结构容易被平均化；triplane-NeRF 渲染质量高但导出高质量网格和纹理仍需后处理。</p>",
      "quiz": {
        "q": "LRM 中 Transformer 解码器的主要作用是什么？",
        "options": [
          "把单张图像直接压缩成文本提示词",
          "把图像特征映射为 triplane 3D 表示",
          "对每个测试物体执行 SDS 优化",
          "只预测相机姿态而不预测几何"
        ],
        "answer": 1,
        "explain": "LRM 使用 triplane token 通过 cross-attention 读取 DINO 图像特征，生成可由 NeRF MLP 查询和体渲染的 3D 表示。"
      }
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
      "summary": "Instant3D 提出“文本生成稀疏多视图 + LRM 快速重建”的两阶段框架，解决优化式文生 3D 速度慢和多面不一致的问题。它用多视图扩散先产生四张一致参考图，再由稀疏视图重建网络前馈生成 3D。",
      "keyPoints": [
        "两阶段流程：text-to-multiview diffusion 生成稀疏视图，sparse-view LRM 重建 3D。",
        "稀疏视图条件：通常使用 4 个固定相机视角，覆盖物体主要外观。",
        "多视图扩散：在同一画布或联合 token 中生成多个视角，提升跨视角一致性。",
        "LRM 扩展：从单图 LRM 改为多图条件输入，直接预测 triplane-NeRF 或类似 3D 表示。",
        "快速推理：避免 SDS 逐实例优化，将文生 3D 推理压缩到秒级到十秒级。"
      ],
      "detail": "<p><img alt=\"Instant3D 整体效果与流程\" src=\"https://arxiv.org/html/2311.06214v2/x1.png\" />\n<em>图：Instant3D 通过稀疏多视图生成和大规模重建模型快速生成 3D 资产。</em></p>\n<pre><code class=\"language-python\"># Instant3D 核心流程伪代码\nprompt = &quot;a stylized robot, high quality&quot;\ncameras = fixed_four_views()\n\n# 1. 文本到稀疏多视图\nmulti_view_images = multiview_diffusion(prompt, cameras)\n\n# 2. 稀疏视图到 3D\nview_tokens = image_encoder(multi_view_images, cameras)\ntriplane = sparse_view_lrm(view_tokens)\n\n# 3. 任意视角渲染或导出\nfor camera in novel_cameras:\n    image = render_triplane_nerf(triplane, camera)\nmesh = extract_mesh_from_density(triplane)\n</code></pre>\n<p>Instant3D 的动机是把文生 3D 中最昂贵的部分拆掉。DreamFusion 系列依靠 2D 扩散模型提供 SDS 梯度，需要对每个 prompt 优化一个 3D 表示；优化过程慢，而且每个视角分别受 2D 先验影响，容易产生 Janus 问题。Instant3D 改为先让扩散模型一次性生成少量互相一致的视图，再用前馈重建器完成 3D。</p>\n<p>第一阶段的多视图扩散可以理解为学习：</p>\n<div class=\"kb-math kb-math-display\">p_{\\theta}(I_1, I_2, I_3, I_4 \\mid y, c_1,c_2,c_3,c_4)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">y</span> 是文本提示，<span class=\"kb-math kb-math-inline\">c_i</span> 是固定相机。与分别生成四张图不同，联合生成让注意力能跨视图共享物体身份和部件布局，因此相同物体不会在不同方向变成不同实例。</p>\n<p>第二阶段是 LRM 思路的多视图版本。输入不再是一张图，而是带相机位姿的稀疏视图集合。图像 token 与相机编码一起进入 Transformer，输出 triplane 或其他可渲染 3D 表示。训练目标仍是目标视角重建：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L} = \\sum_{v \\in \\mathcal{V}_{target}}\n\\|R_{\\theta}(G, c_v) - I_v^{gt}\\|_1 + \\lambda \\mathcal{L}_{lpips}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">G</span> 是前馈预测的 3D 表示。多图输入比单图 LRM 更少依赖不可见区域幻觉，重建几何也更稳定。</p>\n<div class=\"key-point\">💡 关键：Instant3D 的质量瓶颈主要从“优化是否收敛”转移到“稀疏多视图是否足够一致且覆盖充分”。</div>\n<p>与 LRM 相比，Instant3D 更面向生成任务：LRM 假设已有输入图，Instant3D 从文本开始生成多视图观测。与 MVDream/Wonder3D 相比，它进一步把多视图图像接到重建模型上，形成端到端的资产生产流水线。</p>",
      "quiz": {
        "q": "Instant3D 为什么先生成稀疏多视图再重建 3D？",
        "options": [
          "因为稀疏视图能完全替代相机位姿",
          "因为多视图观测提供更强几何约束，同时避免逐实例 SDS 优化",
          "因为 LRM 只能处理文本输入",
          "因为四张图一定比完整视频包含更多信息"
        ],
        "answer": 1,
        "explain": "联合多视图扩散提供一致外观与几何线索，LRM 再前馈重建 3D，使流程比逐实例优化更快且更稳定。"
      }
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
      "summary": "iLRM 提出用紧凑场景表示和迭代细化机制预测 3D Gaussian，解决多视图前馈重建随视图数和分辨率扩展时注意力成本过高的问题。manifest 中的 arXiv 链接在本次检索中不可用；以下基于公开项目页 iLRM: An Iterative Large 3D Reconstruction Model 与 manifest 信息整理。",
      "keyPoints": [
        "输出表示：直接预测 3D Gaussian Splatting，而不是先预测 NeRF 再转换。",
        "紧凑场景 token：将场景表示与输入图像 token 解耦，避免所有视图全量互注意力。",
        "两阶段注意力：把多视图交互拆成图像到场景、场景内部/场景到图像的高效更新。",
        "迭代细化：多层或多轮更新 Gaussian 参数，使粗结构逐步变为高保真 3DGS。",
        "高分辨率注入：在每层保留或注入高分辨率局部信息，改善细节和边界。"
      ],
      "detail": "<p><img alt=\"iLRM 高效注意力设计\" src=\"https://gynjn.github.io/iLRM/static/images/eff_attn.webp\" />\n<em>图：iLRM 项目页展示的高效注意力设计，用紧凑场景表示替代对所有输入视图 token 的全局二次交互。</em></p>\n<pre><code class=\"language-python\"># iLRM 核心流程伪代码\nimages, cameras = load_multiview_inputs()\nimage_tokens = encode_images(images, cameras)\n\nscene_tokens = initialize_compact_scene_tokens()\nfor layer in ilrm_layers:\n    # 从多视图图像读取证据\n    scene_tokens = layer.image_to_scene_attention(scene_tokens, image_tokens)\n    # 在紧凑场景空间中融合几何\n    scene_tokens = layer.scene_self_update(scene_tokens)\n    # 注入高分辨率局部特征，恢复细节\n    scene_tokens = layer.high_res_feature_injection(scene_tokens, image_tokens)\n\ngaussians = gaussian_head(scene_tokens)\nrendered = differentiable_splatting(gaussians, target_cameras)\nloss = photometric_loss(rendered, target_images)\n</code></pre>\n<p>传统多视图 LRM 如果把所有图像 patch token 直接拼接后做全局注意力，复杂度会随 token 数近似二次增长。视图数增加、分辨率升高后，显存和计算都会迅速失控。iLRM 的核心思路是引入紧凑的场景 token，让输入图像只是被读取的信息源，而不是一直作为完整场景状态保存。</p>\n<p>这种解耦可以写成：</p>\n<div class=\"kb-math kb-math-display\">S^{k+1} = F_{\\theta}(S^k, \\{E(I_i,c_i)\\}_{i=1}^{N})</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">S^k</span> 是第 <span class=\"kb-math kb-math-inline\">k</span> 轮的场景表示，<span class=\"kb-math kb-math-inline\">E(I_i,c_i)</span> 是第 <span class=\"kb-math kb-math-inline\">i</span> 张图像及位姿编码后的 token。注意力主要发生在 <span class=\"kb-math kb-math-inline\">S</span> 与图像 token 之间，而不是所有图像 token 彼此之间做全连接交互。</p>\n<p>迭代细化对 3DGS 很自然。早期层可以决定高斯的大致位置、尺度和可见区域；后续层逐步修正颜色、不透明度、旋转和局部几何。一个高斯通常包含：</p>\n<div class=\"kb-math kb-math-display\">g_i=(\\mu_i, \\Sigma_i, \\alpha_i, \\mathbf{c}_i)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\mu_i</span> 是中心，<span class=\"kb-math kb-math-inline\">\\Sigma_i</span> 控制形状和方向，<span class=\"kb-math kb-math-inline\">\\alpha_i</span> 是不透明度，<span class=\"kb-math kb-math-inline\">\\mathbf{c}_i</span> 是颜色或球谐系数。通过可微 splatting 渲染到目标视角后，模型用图像重建损失学习这些参数。</p>\n<div class=\"key-point\">💡 关键：iLRM 的效率来自“固定规模场景状态 + 迭代读取多视图证据”，而不是让所有输入视图 token 永久参与二次注意力。</div>\n<p>相对 LRM 的 triplane-NeRF，iLRM 选择 3DGS 能获得更快渲染和更直接的显式资产表示；相对 DepthSplat/LongLRM 类多视图重建器，iLRM 的重点是可扩展到更多视图和更高分辨率，同时保持前馈速度。</p>",
      "quiz": {
        "q": "iLRM 为什么要把场景表示与输入图像 token 解耦？",
        "options": [
          "为了完全不使用相机参数",
          "为了避免多视图 token 全局注意力带来的二次复杂度",
          "为了只输出单张新视角图像",
          "为了让 3DGS 不能被微分渲染"
        ],
        "answer": 1,
        "explain": "紧凑场景 token 作为固定规模状态读取多视图证据，能显著降低随视图数和分辨率增长的注意力成本。"
      }
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
      "summary": "VGG-T³ 将 VGGT 中随图像数二次增长的全局 softmax attention 替换为基于测试时训练的线性模块，解决离线前馈 3D 重建难以扩展到上千张图的问题。它把可变长度 KV 场景记忆压缩到固定规模 MLP 中，使计算随输入视图数近似线性增长。",
      "keyPoints": [
        "基座模型：继承 VGGT 的多视图视觉几何 Transformer 结构。",
        "瓶颈定位：全局 attention 的 KV 空间随图像数量增长，计算近似 <span class=\"kb-math kb-math-inline\">O(n^2)</span>。",
        "TTT 线性化：在测试时优化小型 MLP，使其学习 key 到 value 的映射。",
        "固定场景状态：用 MLP 参数作为场景记忆，替代显式保存全部 KV token。",
        "大规模输入：支持上千张图片的离线重建，并保持较高点图、深度和相机估计质量。"
      ],
      "detail": "<p><img alt=\"VGG-T3 测试时训练模块\" src=\"https://arxiv.org/html/2602.23361v1/figures/method/ttt_optim.png\" />\n<em>图：VGG-T³ 用测试时训练的 MLP 压缩 VGGT 全局 attention 的 KV 空间。</em></p>\n<pre><code class=\"language-python\"># VGG-T3 核心流程伪代码\ntokens = encode_images_with_vggt(images)\ntheta = initialize_ttt_mlp()  # 固定规模 fast weights\n\nfor global_layer in vggt_layers:\n    keys, values, queries = project_qkv(tokens)\n\n    # 测试时训练：让 MLP 学会从 key 预测 value\n    for _ in range(ttt_steps):\n        pred_values = mlp(theta, keys)\n        ttt_loss = mse(pred_values, values)\n        theta = optimizer_step(theta, ttt_loss)\n\n    # 用压缩后的 MLP 近似全局 attention 的信息读取\n    retrieved = mlp(theta, queries)\n    tokens = update_tokens(tokens, retrieved)\n\ngeometry = prediction_heads(tokens)  # pointmap / depth / camera 等\n</code></pre>\n<p>VGGT 这类多视图模型的优势是可以把一组图像作为整体推理相机、深度和点图，但全局 attention 需要所有图像 token 之间互相通信。当输入从几十张扩展到几百、上千张时，token 数 <span class=\"kb-math kb-math-inline\">n</span> 增大后，softmax attention 的成本：</p>\n<div class=\"kb-math kb-math-display\">\\text{Attention}(Q,K,V)=\\text{softmax}\\left(\\frac{QK^\\top}{\\sqrt{d}}\\right)V</div>\n<p>会出现 <span class=\"kb-math kb-math-inline\">QK^\\top</span> 的二次复杂度，显存也随 KV 缓存膨胀。</p>\n<p>VGG-T³ 的核心观察是：全局 attention 中的 <span class=\"kb-math kb-math-inline\">K,V</span> 本质上是场景几何记忆。与其把所有 key-value token 显式保存并查询，不如在测试时训练一个固定规模 MLP <span class=\"kb-math kb-math-inline\">f_\\theta</span>，让它学习：</p>\n<div class=\"kb-math kb-math-display\">f_\\theta(k_i) \\approx v_i</div>\n<p>这样 <span class=\"kb-math kb-math-inline\">f_\\theta</span> 的参数就成为压缩场景表示。对新 query <span class=\"kb-math kb-math-inline\">q</span>，模型通过 <span class=\"kb-math kb-math-inline\">f_\\theta(q)</span> 读取场景信息，而不再对所有 key 做 softmax 匹配。</p>\n<p>训练与推理有两层优化：外层是模型参数的常规训练，学习如何把 VGGT 线性化；内层是在每个测试场景上对 fast weights <span class=\"kb-math kb-math-inline\">\\theta</span> 做少量自监督更新。这个内层优化不需要外部标签，因为 key-value 配对来自模型当前层本身。</p>\n<div class=\"key-point\">💡 关键：VGG-T³ 不是简单换成线性 attention，而是把“场景记忆”解释为一个测试时可优化的函数。</div>\n<p>相对在线方法，VGG-T³ 仍是离线全局重建：它可以同时利用整组图像的信息，不依赖固定输入顺序；相对原始 VGGT，它牺牲一部分精确 softmax 匹配能力，换取上千张图像可扩展的时间和显存曲线。</p>",
      "quiz": {
        "q": "VGG-T³ 中测试时训练的 MLP 主要压缩了什么？",
        "options": [
          "输入图像的 JPEG 文件大小",
          "VGGT 全局 attention 中可变长度的 key-value 场景记忆",
          "输出点图的像素分辨率",
          "相机内参矩阵的维度"
        ],
        "answer": 1,
        "explain": "VGG-T³ 让 MLP 在测试时学习 key 到 value 的映射，用固定规模参数替代随图像数量增长的 KV token。"
      }
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
      "summary": "4D-LRM 将 LRM 的前馈重建扩展到空间-时间联合建模，直接从带位姿和时间戳的稀疏图像预测 4D Gaussian，解决动态物体难以在任意视角与任意时间一致重建的问题。manifest 中链接在本次检索中不可用；以下基于公开论文 “4D-LRM: Large Space-Time Reconstruction Model From and To Any View at Any Time” 与 manifest 信息整理。",
      "keyPoints": [
        "4D 表示：用各向异性 4D Gaussian 同时建模三维空间和连续时间。",
        "任意 view-time 输入：输入可以来自不同相机视角和不同时间戳。",
        "Transformer 解码：把 RGB、Plucker ray、timestamp 拼接为 token，回归 4DGS 参数。",
        "连续时间渲染：在目标时间条件化 4D Gaussian，得到对应 3D Gaussian 后 splatting。",
        "数据驱动训练：面向动态对象数据训练，学习运动、形变和多视角补全先验。"
      ],
      "detail": "<p><img alt=\"4D-LRM 概览图\" src=\"https://arxiv.org/html/2506.18890v1/x1.png\" />\n<em>图：公开 arXiv HTML 中的 4D-LRM 概览，展示从稀疏 view-time 输入到任意 view-time 渲染的目标。</em></p>\n<pre><code class=\"language-python\"># 4D-LRM 核心流程伪代码\ninputs = []\nfor image, camera, time in observed_frames:\n    ray = plucker_rays(camera)\n    time_map = full_like(image[..., :1], time)\n    tokens = patchify(concat(image, ray, time_map))\n    inputs.append(tokens)\n\ntokens = concat_in_temporal_order(inputs)\ntokens = transformer(tokens)\ngaussians_4d = gaussian_head(tokens)  # mean/covariance/color/opacity in space-time\n\ndef render_at(camera_target, time_target):\n    gaussians_3d = condition_4d_gaussians(gaussians_4d, time_target)\n    return gaussian_splatting(gaussians_3d, camera_target)\n</code></pre>\n<p>静态 LRM 只需要回答“一个物体在三维空间中是什么样”，而 4D-LRM 还要回答“这个物体在任意时间是什么样”。传统动态重建常对每个序列逐实例优化，或者假设单目视频和有限相机轨迹；4D-LRM 的目标是训练一个通用前馈模型，从稀疏 view-time 观测中直接预测时空表示。</p>\n<p>4D Gaussian 可以看作在 <span class=\"kb-math kb-math-inline\">(x,y,z,t)</span> 中定义的高斯 primitive。给定目标时间 <span class=\"kb-math kb-math-inline\">t</span>，模型对 4D 高斯做条件化，得到该时刻的 3D 均值和协方差。例如直觉上可写为：</p>\n<div class=\"kb-math kb-math-display\">\\mu_{xyz|t} =\n\\mu_{1:3} + \\Sigma_{1:3,4}\\Sigma_{4,4}^{-1}(t-\\mu_4)</div>\n<p>这表示高斯中心会随时间连续变化，因此模型能插值未观测帧，而不是只能记住离散帧。</p>\n<p>输入编码也必须包含几何和时间。每张图像除了 RGB，还拼接相机 ray 表示和时间戳 map：</p>\n<div class=\"kb-math kb-math-display\">\\widetilde{I}_j = \\text{Concat}(I_j, P_j, T_j)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">P_j</span> 是每个像素的 Plucker ray 或等价位姿编码，<span class=\"kb-math kb-math-inline\">T_j</span> 是时间编码。这样 Transformer 在 token 层同时知道“这个像素来自哪个空间射线”和“它属于哪个时间”。</p>\n<div class=\"key-point\">💡 关键：4D-LRM 的创新是把动态重建统一成“从 view-time token 回归 4DGS”，而不是先逐帧重建 3D 再做时间配准。</div>\n<p>与静态 LRM 相比，4D-LRM 多了时间连续性和运动建模；与基于扩散的 4D 生成相比，它更强调忠实重建输入观测。局限在于需要可靠位姿和高质量动态数据，快速非线性运动、自遮挡和复杂拓扑变化仍可能产生 temporal ghosting。</p>",
      "quiz": {
        "q": "4D-LRM 中 4D Gaussian 的主要作用是什么？",
        "options": [
          "只保存每帧的 2D RGB 图片",
          "在统一时空表示中建模空间位置和连续时间变化",
          "完全替代相机位姿输入",
          "只用于文本提示词编码"
        ],
        "answer": 1,
        "explain": "4D Gaussian 在 xyz+t 空间中表示动态 primitive，目标时间条件化后可得到该时刻的 3D Gaussian 用于渲染。"
      }
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
      "summary": "YoNoSplat 旨在用单一前馈模型从任意输入视图集合直接预测 3D Gaussian，实现毫秒级新视角重建。manifest 中的 OpenReview 链接在本次环境中无法稳定定位到论文页面；以下依据 manifest 元信息和前馈 3DGS 系列公开技术脉络整理。",
      "keyPoints": [
        "单模型设定：不为不同视图数量、不同数据集或不同场景单独训练专用重建器。",
        "任意视图输入：把输入图像集合当作无序 set 或可变长序列处理。",
        "直接 3DGS 输出：预测 Gaussian 的位置、尺度、旋转、不透明度和颜色特征。",
        "几何感知融合：使用相机编码、ray token 或代价体线索把跨视图证据对齐。",
        "毫秒级渲染：输出 3DGS 后用 splatting 实现快速任意视角渲染。"
      ],
      "detail": "<p>资料限制：未取得稳定论文图片直链，下面给出按公开描述整理的框架图。</p>\n<pre><code class=\"language-mermaid\">flowchart LR\n  A[可变数量输入图像] --&gt; B[图像编码器]\n  C[相机位姿 / Ray 编码] --&gt; B\n  B --&gt; D[集合式跨视图融合]\n  D --&gt; E[Gaussian 参数预测头]\n  E --&gt; F[3DGS 显式场景]\n  F --&gt; G[任意视角实时 splatting]\n</code></pre>\n<pre><code class=\"language-python\"># YoNoSplat 核心流程伪代码\nimages, cameras = load_variable_view_inputs()\ntokens = []\nfor image, camera in zip(images, cameras):\n    feat = image_encoder(image)\n    ray = ray_embedding(camera, image.shape)\n    tokens.append(fuse(feat, ray))\n\nscene_tokens = set_transformer(tokens)       # 对输入视图数量不敏感\ngaussians = gaussian_decoder(scene_tokens)   # xyz, scale, rotation, opacity, color\n\nfor cam in novel_views:\n    pred = gaussian_splatting(gaussians, cam)\nloss = photometric_loss(pred, target_images)\n</code></pre>\n<p>YoNoSplat 所处的问题背景是前馈 3DGS 重建的“专用化”倾向。许多模型在固定视图数、固定分辨率或固定场景类型上表现很好，但部署时输入往往是任意数量的图片：有时只有两三张，有时有几十张；有时视角稀疏，有时覆盖充分。单模型目标就是让同一个网络在这些输入条件下保持稳定。</p>\n<p>为了处理可变视图，模型需要避免把输入写死成固定通道或固定网格。常见做法是把每张图像编码成 token，并附加相机或 ray 信息：</p>\n<div class=\"kb-math kb-math-display\">z_i = E(I_i, c_i)</div>\n<p>然后用集合式 Transformer、交叉注意力或池化机制得到场景表示：</p>\n<div class=\"kb-math kb-math-display\">S = F(\\{z_i\\}_{i=1}^{N})</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">F</span> 应该对输入顺序尽量不敏感，并能随视图数量增加吸收更多证据。</p>\n<p>输出 3DGS 的好处是推理路径短。Gaussian 参数可以直接进入 rasterizer：</p>\n<div class=\"kb-math kb-math-display\">g_k=(\\mu_k, s_k, q_k, \\alpha_k, \\mathbf{c}_k)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\mu_k</span> 是中心，<span class=\"kb-math kb-math-inline\">s_k</span> 是尺度，<span class=\"kb-math kb-math-inline\">q_k</span> 表示旋转，<span class=\"kb-math kb-math-inline\">\\alpha_k</span> 是不透明度，<span class=\"kb-math kb-math-inline\">\\mathbf{c}_k</span> 是颜色或球谐特征。渲染损失对目标视角监督后，网络学会把多视图证据融合成显式高斯场。</p>\n<div class=\"key-point\">💡 关键：YoNoSplat 的“单模型”价值在于减少工程部署中的模型选择和输入规格限制，而不只是把某个固定 benchmark 做快。</div>\n<p>与 iLRM 的关系可以理解为同属前馈 3DGS 路线：iLRM 更强调迭代高效融合和高分辨率扩展，YoNoSplat 更强调单模型覆盖任意视图场景。与优化式 3DGS 相比，它用训练好的网络摊销优化成本，牺牲少量逐场景最优性换取毫秒级或近实时响应。</p>",
      "quiz": {
        "q": "YoNoSplat 中单模型设计的主要目的是什么？",
        "options": [
          "让每个测试场景都从零训练一个网络",
          "在不同输入视图数量和场景条件下复用同一前馈 3DGS 重建器",
          "只支持固定四视图输入",
          "避免使用 Gaussian Splatting 渲染"
        ],
        "answer": 1,
        "explain": "单模型设计面向可变视图输入和部署泛化，直接输出 3DGS 后可快速渲染任意视角。"
      }
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
      "summary": "TEXTure 提出从不同视角迭代渲染、扩散生成、再投影到 mesh 的文本引导纹理方法，解决 2D 扩散模型直接用于 3D 纹理时跨视角不一致和接缝明显的问题。它用动态 trimap 区分已完成、待补全和待细化区域，使每次生成只更新需要更新的可见 texel。",
      "keyPoints": [
        "输入为已有 3D mesh 和文本提示，不负责生成几何。",
        "使用预训练 depth-to-image 扩散模型，在渲染视图上生成纹理细节。",
        "动态 trimap：把当前视图划分为 keep、refine、generate 三种状态。",
        "迭代投影：每个视角生成后投影回 UV/纹理图，并更新 texel 可见状态。",
        "支持纹理生成、编辑、迁移和局部 scribble 控制。"
      ],
      "detail": "<p><img alt=\"TEXTure 纹理流程图\" src=\"https://texturepaper.github.io/TEXTurePaper/static/figures/texturing_figure.png\" />\n<em>图：TEXTure 项目页展示的迭代式 texturing pipeline，从渲染视图生成纹理并投影回 3D mesh。</em></p>\n<pre><code class=\"language-python\"># TEXTure 核心流程伪代码\nmesh = load_mesh()\ntexture_map = initialize_blank_texture()\ntexel_state = initialize_state(mesh)  # unpainted / painted / refine\n\nfor camera in planned_view_sequence:\n    depth, visible_texels = render_depth(mesh, camera)\n    current_rgb = render_texture(mesh, texture_map, camera)\n    trimap = build_trimap(visible_texels, texel_state)\n\n    generated_view = depth_to_image_diffusion(\n        prompt=text_prompt,\n        depth=depth,\n        image=current_rgb,\n        mask=trimap.generate_or_refine,\n    )\n\n    texture_map = project_to_uv(texture_map, generated_view, visible_texels, trimap)\n    texel_state = update_texel_state(texel_state, visible_texels)\n</code></pre>\n<p>TEXTure 的前提是几何已经存在，任务是给 mesh 生成符合文本描述的纹理。直接让 2D 扩散模型对每个视角独立生成会导致严重不一致：同一个 texel 在不同视角可能被画成不同颜色，边界处也容易出现接缝。TEXTure 的核心是让 2D 生成结果不断回写到统一 texture map，使后续视角能看到之前已画的内容。</p>\n<p>动态 trimap 是方法关键。对当前渲染视图中的像素，系统根据对应 texel 的历史状态分为三类：已完成区域尽量保持，边界或低置信区域允许细化，从未绘制区域由扩散模型补全。这样扩散模型不是每次重画整张图，而是在已有纹理的上下文中做受控 inpainting。</p>\n<p>可以把每次更新写成：</p>\n<div class=\"kb-math kb-math-display\">T^{k+1} = \\Pi^{-1}_{c_k}\\left(\nD_{\\theta}(R(T^k,c_k), \\text{Depth}(M,c_k), m_k, y)\n\\right)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">T^k</span> 是当前纹理图，<span class=\"kb-math kb-math-inline\">R</span> 是渲染，<span class=\"kb-math kb-math-inline\">D_{\\theta}</span> 是 depth-to-image 扩散模型，<span class=\"kb-math kb-math-inline\">m_k</span> 是 trimap/mask，<span class=\"kb-math kb-math-inline\">\\Pi^{-1}_{c_k}</span> 表示从当前视角投影回 UV。</p>\n<div class=\"key-point\">💡 关键：TEXTure 用 3D texture map 作为跨视角记忆，用 trimap 控制哪些区域可改，从而把 2D 扩散模型变成 3D 一致的纹理生成器。</div>\n<p>与 CLIP 优化式纹理方法相比，TEXTure 直接利用扩散模型的图像先验，细节更丰富；与一次性 UV 生成相比，迭代视角投影更容易处理遮挡和复杂几何。但它仍依赖 mesh UV 和渲染质量，深凹区域、不可见区域或极细结构可能需要更多视角和后处理。</p>",
      "quiz": {
        "q": "TEXTure 中 trimap 的主要作用是什么？",
        "options": [
          "把 mesh 自动转换成点云",
          "区分保留、细化和新生成区域，控制扩散模型的局部更新",
          "替代深度图作为扩散条件",
          "只用于压缩最终纹理文件"
        ],
        "answer": 1,
        "explain": "trimap 告诉扩散模型哪些像素应保持、哪些应细化、哪些需要新生成，从而降低跨视角不一致和接缝。"
      }
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
      "summary": "Text2Tex 提出用深度感知 inpainting 扩散模型渐进式生成局部纹理，并自动选择下一最佳视角，解决文本到 3D 纹理中局部清晰但全局不一致的问题。它把每个可见 texel 的生成状态编码成 mask，引导扩散模型只更新需要补全或修复的区域。",
      "keyPoints": [
        "输入为给定 mesh 和文本 prompt，目标是生成高分辨率 texture map。",
        "使用预训练 depth-aware diffusion / ControlNet depth inpainting 作为 2D 纹理先验。",
        "动态 generation mask：标记当前视角中哪些 texel 是新区域、已生成区域或需更新区域。",
        "渐进式视角策略：自动选择下一视角以最大化未覆盖纹理区域并减少拉伸伪影。",
        "生成加细化两阶段：先覆盖主要表面，再用较低强度更新改善接缝和一致性。"
      ],
      "detail": "<p><img alt=\"Text2Tex 方法概览\" src=\"https://raw.githubusercontent.com/daveredrum/Text2Tex/main/docs/static/teaser/overview.jpg\" />\n<em>图：Text2Tex 仓库中的概览图，展示从多视角渲染、深度感知 inpainting 到纹理回投影的渐进流程。</em></p>\n<pre><code class=\"language-python\"># Text2Tex 核心流程伪代码\nmesh = normalize_mesh(input_mesh)\nuv_texture = init_texture(mesh)\nstatus = init_texel_status(mesh)  # unseen / generated / update\n\nview_queue = plan_initial_views(mesh)\nfor view in view_queue:\n    rgb, depth, texel_ids = render(mesh, uv_texture, view)\n    mask = build_generation_mask(texel_ids, status)\n\n    partial_texture = depth_aware_inpaint(\n        prompt=prompt,\n        image=rgb,\n        depth=depth,\n        mask=mask,\n        strength=choose_strength(mask),\n    )\n\n    uv_texture = back_project(partial_texture, texel_ids, uv_texture)\n    status = update_status(status, texel_ids)\n    view_queue = select_next_best_view(mesh, status)\n</code></pre>\n<p>Text2Tex 与 TEXTure 共享“渲染视图到 2D、扩散生成、回投影到 UV”的基本思路，但更强调渐进式策略和视角选择。问题的核心是：3D 纹理图是一个全局对象，而 2D 扩散模型一次只看当前渲染视图。如果视角顺序和更新区域控制不好，后画的区域会覆盖前画的语义，或者在斜视角产生拉伸纹理。</p>\n<p>方法首先渲染当前 mesh 的 RGB、depth 和 texel 可见性。depth 条件让扩散模型知道物体轮廓和局部几何，inpainting mask 则指定新生成区域。对当前视图 <span class=\"kb-math kb-math-inline\">v</span>，扩散模型近似学习：</p>\n<div class=\"kb-math kb-math-display\">I_v^{new} = D_{\\theta}(I_v^{old}, Z_v, M_v, y)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">Z_v</span> 是深度图，<span class=\"kb-math kb-math-inline\">M_v</span> 是 generation mask，<span class=\"kb-math kb-math-inline\">y</span> 是文本 prompt。生成结果再根据渲染时记录的 texel-id 或 UV 坐标投影回纹理图。</p>\n<p>generation mask 是保持一致性的关键。未见过的 texel 使用高强度生成；已生成但当前可见的 texel作为上下文保留；边界和低质量区域可以低强度更新。这样模型每次“补一块”而不是“重画一切”，全局 texture map 会逐步收敛。</p>\n<p>自动视角选择进一步减少人为设定。下一视角通常优先覆盖最多未生成 texel，并避免极端斜角导致纹理拉伸。可以把目标写成：</p>\n<div class=\"kb-math kb-math-display\">v^* = \\arg\\max_v \\left(\\text{coverage}(v) - \\lambda \\text{distortion}(v)\\right)</div>\n<div class=\"key-point\">💡 关键：Text2Tex 的贡献不是单纯调用 ControlNet，而是用 texel 状态、mask 和视角策略把 2D inpainting 组织成 3D 一致的纹理合成过程。</div>\n<p>相对 TEXTure，Text2Tex 的渐进式策略更系统地处理“先覆盖、再更新”的流程；相对 GAN 或 CLIP 优化纹理方法，它利用大规模 2D 扩散先验生成更丰富的语义细节。局限是它依赖已有 mesh 和 UV 参数化，且对不可见内凹区域仍需要额外视角或后处理。</p>",
      "quiz": {
        "q": "Text2Tex 中自动视角选择主要为了什么？",
        "options": [
          "最大化新 texel 覆盖并减少拉伸伪影",
          "让所有视角都使用同一个相机内参",
          "完全跳过纹理回投影",
          "把 3D mesh 转换成文本"
        ],
        "answer": 0,
        "explain": "Text2Tex 渐进式生成纹理，需要优先选择能覆盖未生成区域且投影失真较小的视角。"
      }
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
      "summary": "TRELLIS 2 面向原生 3D 资产生成，将几何与 PBR 材质统一到结构化体素/潜表示中建模，解决传统后贴图流程难以生成一致材质通道的问题。本次环境未取得稳定论文 PDF 或图片直链，以下基于 manifest 元信息、项目入口和 TRELLIS 系列公开技术脉络整理。",
      "keyPoints": [
        "原生 3D 路线：不只生成多视图图片，而是在 3D 潜空间中生成资产。",
        "O-Voxel 表示：用结构化体素 token 承载占据、几何和材质属性。",
        "PBR 材质生成：同时预测 base color、roughness、metallic、normal 等材质通道。",
        "多模态条件：可从文本、图像或粗几何条件生成完整 3D 资产。",
        "解码器分离：潜表示可解码为 mesh、3DGS、纹理图或 PBR 材质贴图。"
      ],
      "detail": "<p>资料限制：项目页可作为入口，但未取得可稳定嵌入的框架图直链。下面是按 TRELLIS 2 描述整理的核心框架图。</p>\n<pre><code class=\"language-mermaid\">flowchart LR\n  A[文本 / 图像 / 粗 3D 条件] --&gt; B[条件编码器]\n  B --&gt; C[O-Voxel 结构化 3D 潜空间]\n  C --&gt; D[几何解码器]\n  C --&gt; E[PBR 材质解码器]\n  D --&gt; F[Mesh / 3DGS]\n  E --&gt; G[BaseColor / Roughness / Metallic / Normal]\n  F --&gt; H[可渲染 3D 资产]\n  G --&gt; H\n</code></pre>\n<pre><code class=\"language-python\"># TRELLIS 2 核心流程伪代码\ncondition = encode_condition(text=text_prompt, image=reference_image)\n\n# 在结构化 O-Voxel 潜空间中生成 3D asset latent\nz = initialize_3d_latent_grid()\nfor t in diffusion_or_flow_steps:\n    z = denoise_or_flow_step(z, condition, timestep=t)\n\ngeometry = geometry_decoder(z)      # occupancy / SDF / mesh / Gaussian\npbr = material_decoder(z)           # albedo, roughness, metallic, normal\nasset = package_asset(geometry, pbr)\n</code></pre>\n<p>传统纹理方法通常先得到几何，再在 UV 或多视图上补贴图。这种流程对 base color 有效，但对 PBR 材质不够自然，因为 roughness、metallic、normal 等通道必须与几何和语义保持一致。例如金属区域应同时影响颜色、高光和粗糙度，不能只在 RGB 纹理里局部涂亮。</p>\n<p>TRELLIS 2 的思路是把材质作为 3D 资产的原生属性，而不是后处理贴图。O-Voxel 可以理解为一组结构化 3D token：</p>\n<div class=\"kb-math kb-math-display\">z = \\{z_i = (p_i, h_i)\\}_{i=1}^{N}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">p_i</span> 表示体素或稀疏单元的位置，<span class=\"kb-math kb-math-inline\">h_i</span> 是包含几何和材质信息的隐向量。生成模型在这些 token 上进行扩散或 flow matching，直接学习 3D 资产分布。</p>\n<p>PBR 解码器从同一个 3D latent 中预测多通道材质：</p>\n<div class=\"kb-math kb-math-display\">M = \\{A, R, Me, N\\}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">A</span> 是 base color/albedo，<span class=\"kb-math kb-math-inline\">R</span> 是 roughness，<span class=\"kb-math kb-math-inline\">Me</span> 是 metallic，<span class=\"kb-math kb-math-inline\">N</span> 是 normal 或法线细节。因为这些通道来自共享 latent，它们更容易在语义和几何上对齐。</p>\n<div class=\"key-point\">💡 关键：TRELLIS 2 的重点是“生成可用于真实渲染管线的材质资产”，而不只是生成看起来像 3D 的 RGB 外观。</div>\n<p>相对 Text2Tex，TRELLIS 2 更接近原生 3D 生成：Text2Tex 在已有 mesh 上逐视角绘制纹理，TRELLIS 2 则在 3D latent 中联合生成几何和材质。它的挑战是训练数据必须包含高质量 PBR 标注或可分解材质，且 O-Voxel 表示需要同时兼顾稀疏性、细节和解码稳定性。</p>",
      "quiz": {
        "q": "TRELLIS 2 强调 PBR 材质生成的原因是什么？",
        "options": [
          "PBR 通道能与真实渲染管线中的光照交互，比单纯 RGB 纹理更可编辑和可复用",
          "PBR 材质可以完全替代几何",
          "PBR 只包含一张灰度图",
          "PBR 会让模型不再需要训练数据"
        ],
        "answer": 0,
        "explain": "PBR 材质包含 albedo、roughness、metallic、normal 等通道，能在不同光照和渲染器中保持物理一致的外观。"
      }
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
      "summary": "Hunyuan3D 2.1 面向工业级 3D 资产生产，将图/文到形状生成与高质量纹理生成组合成完整流水线，解决开源 3D 生成中几何可用性和纹理真实感不足的问题。manifest 指向 GitHub 项目而非论文 PDF；以下基于项目公开信息和 manifest 元信息整理。",
      "keyPoints": [
        "两阶段资产生成：先生成几何/网格，再生成或细化纹理材质。",
        "多条件输入：支持图像到 3D、文本到 3D 或图文联合条件。",
        "形状生成模型：使用 3D 扩散/Transformer 类模型预测可导出几何。",
        "纹理生成模型：基于多视图渲染、扩散补全和 UV 回投影生成高质量纹理。",
        "质量目标：强调真实感、材质细节和用户盲测偏好，manifest 中记录 78% 盲测胜率。"
      ],
      "detail": "<p>资料限制：GitHub 项目入口可访问性和图片直链在本次环境中不稳定，下面给出规范化框架图。</p>\n<pre><code class=\"language-mermaid\">flowchart LR\n  A[文本或参考图] --&gt; B[条件编码器]\n  B --&gt; C[Hunyuan3D Shape Model]\n  C --&gt; D[Mesh / Geometry]\n  D --&gt; E[多视图渲染]\n  A --&gt; F[Texture Condition]\n  E --&gt; G[Hunyuan3D Paint / Texture Model]\n  F --&gt; G\n  G --&gt; H[UV 纹理 / 材质贴图]\n  D --&gt; I[完整 3D Asset]\n  H --&gt; I\n</code></pre>\n<pre><code class=\"language-python\"># Hunyuan3D 2.1 核心流程伪代码\ncondition = encode_text_image(prompt, reference_image)\n\n# 1. 形状生成\nshape_latent = shape_diffusion_or_transformer(condition)\nmesh = decode_mesh(shape_latent)\nmesh = postprocess_mesh(mesh)  # clean, remesh, UV unwrap\n\n# 2. 纹理生成\nviews = render_geometry_views(mesh)\ntexture_views = texture_diffusion(\n    condition=condition,\n    geometry_views=views,\n    normal_or_depth=render_normals_depth(mesh),\n)\nuv_texture = back_project_and_blend(texture_views, mesh.uv)\n\nasset = export(mesh, uv_texture)\n</code></pre>\n<p>Hunyuan3D 2.1 代表的是工程化 3D 生成系统路线：单篇论文中的某个模型往往只解决形状或纹理的一部分，而真实资产生产需要几何、UV、纹理、材质、导出格式和交互工具串起来。它通常先用形状模型生成可用 mesh，再在该 mesh 上做多视图纹理生成。</p>\n<p>形状阶段可以抽象为条件生成：</p>\n<div class=\"kb-math kb-math-display\">G = D_{\\theta}(z, c)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">c</span> 是文本/图像条件，<span class=\"kb-math kb-math-inline\">z</span> 是噪声或潜变量，<span class=\"kb-math kb-math-inline\">G</span> 是网格、隐式场或 3D latent。为了进入纹理阶段，系统需要得到拓扑相对干净、带 UV 或可自动展开 UV 的 mesh。</p>\n<p>纹理阶段和 TEXTure/Text2Tex 有相似处，但更偏系统化。模型从多个相机渲染几何的 normal/depth/position map，再用扩散模型生成一致的纹理视图，最后回投影到 UV。损失或后处理会关注跨视图一致性：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{cons} =\n\\sum_{(i,j)} \\| \\Pi_i(T_i) - \\Pi_j(T_j) \\|_1</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\Pi_i</span> 表示把第 <span class=\"kb-math kb-math-inline\">i</span> 个视图的纹理结果映射到公共表面坐标。</p>\n<div class=\"key-point\">💡 关键：Hunyuan3D 2.1 的优势来自端到端资产流水线质量，而不是单独某个纹理步骤；形状质量、UV、视图选择和纹理扩散都影响最终盲测偏好。</div>\n<p>相对 TRELLIS 2 的原生 PBR 潜空间路线，Hunyuan3D 2.1 更像可落地的 shape-then-paint 系统；相对 Text2Tex，它的条件模型和工程后处理更完整，目标是直接产出可下载和编辑的 3D 资产。局限是复杂材质的物理分解、透明/毛发/布料等细节仍然很难完全自动化。</p>",
      "quiz": {
        "q": "Hunyuan3D 2.1 为什么通常采用先形状后纹理的流水线？",
        "options": [
          "因为纹理生成需要稳定几何、UV 和多视图渲染作为条件",
          "因为形状生成不需要任何条件输入",
          "因为纹理可以替代 mesh 拓扑",
          "因为多视图渲染会降低一致性"
        ],
        "answer": 0,
        "explain": "高质量纹理依赖可靠几何和表面参数化；先得到 mesh 后，才能渲染 normal/depth 并把纹理稳定回投影到 UV。"
      }
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
      "summary": "Dragtex 面向交互式纹理编辑，让用户通过拖拽点或指定点对来控制 3D 表面纹理的局部变化，解决纯文本编辑难以精确控制纹理位置和形状的问题。IEEE 页面在本次环境中不适合深度抓取，以下基于 manifest 元信息和交互式纹理编辑通用机制整理。",
      "keyPoints": [
        "点式交互：用户在渲染视图或纹理表面选择 handle point 和 target point。",
        "局部编辑：只修改 mask 覆盖的纹理区域，尽量保持其他区域不变。",
        "3D 一致性：通过 UV/表面坐标把 2D 拖拽约束传播到 3D texture map。",
        "扩散先验：使用图像编辑或纹理扩散模型保持编辑后纹理自然。",
        "可迭代反馈：用户可多轮拖拽、预览、确认，逐步完成细粒度纹理编辑。"
      ],
      "detail": "<p>资料限制：未取得可公开嵌入的论文框架图直链，下面给出按点约束纹理编辑流程整理的框架图。</p>\n<pre><code class=\"language-mermaid\">flowchart LR\n  A[带纹理 3D Mesh] --&gt; B[当前视角渲染]\n  B --&gt; C[用户拖拽点: handle -&gt; target]\n  C --&gt; D[生成局部编辑 mask 与点约束]\n  D --&gt; E[扩散/优化式纹理编辑]\n  E --&gt; F[回投影到 UV Texture]\n  F --&gt; G[多视图一致性检查]\n  G --&gt; A\n</code></pre>\n<pre><code class=\"language-python\"># Dragtex 核心流程伪代码\nmesh, texture = load_textured_asset()\nview = render_current_view(mesh, texture)\n\nhandle_points, target_points = user_drag_points(view)\nmask = build_local_edit_mask(handle_points, target_points, mesh.uv)\n\nfor step in range(edit_steps):\n    edited_view = texture_edit_model(\n        image=view.rgb,\n        mask=mask,\n        point_constraints=(handle_points, target_points),\n        prompt=optional_text_prompt,\n    )\n    texture_candidate = project_to_uv(edited_view, mesh, view.camera)\n    loss = point_alignment_loss(texture_candidate, target_points)\n    loss += preserve_loss(texture_candidate, texture, outside=mask)\n    texture = update_texture(texture, texture_candidate, mask, loss)\n\npreview = render_multiview(mesh, texture)\n</code></pre>\n<p>纯文本纹理编辑的问题是控制粒度不够。用户说“把花纹往右移”或“让眼睛变大”时，模型很难知道具体哪个表面区域、移动多少、边界如何保持。Dragtex 类方法把编辑意图转成点约束：handle point 表示要移动的纹理位置，target point 表示目标位置。</p>\n<p>在 3D 纹理编辑中，点不应只停留在屏幕坐标。系统需要通过渲染记录把屏幕点映射到 mesh 表面或 UV：</p>\n<div class=\"kb-math kb-math-display\">u = \\Pi^{-1}(p_{\\text{screen}}, c, M)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">p_{\\text{screen}}</span> 是用户点击点，<span class=\"kb-math kb-math-inline\">c</span> 是当前相机，<span class=\"kb-math kb-math-inline\">M</span> 是 mesh。映射到 UV 后，同一表面点在其他视角也能保持一致。</p>\n<p>编辑模型通常需要两个约束：一是点对齐，让被拖拽区域朝目标点移动；二是保持约束，让 mask 外纹理不变。可以写成：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L} =\n\\lambda_p \\sum_i \\| \\phi(h_i) - t_i \\|_2^2\n+ \\lambda_{keep}\\|(1-m)\\odot(T&#x27;-T)\\|_1\n+ \\lambda_{prior}\\mathcal{L}_{diff}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">h_i,t_i</span> 是 handle/target 点，<span class=\"kb-math kb-math-inline\">m</span> 是编辑 mask，<span class=\"kb-math kb-math-inline\">T,T&#x27;</span> 是编辑前后的纹理，<span class=\"kb-math kb-math-inline\">\\mathcal{L}_{diff}</span> 表示扩散模型或图像先验带来的自然性约束。</p>\n<div class=\"key-point\">💡 关键：Dragtex 的价值是把“用户可操作的点拖拽”转成“可优化、可投影、可保持 3D 一致的纹理约束”。</div>\n<p>相对 Text2Tex/Hunyuan3D 这类生成式纹理系统，Dragtex 更偏后期编辑：它不一定重新生成整个资产，而是在已有纹理上做局部、可控、可交互修改。局限是点约束适合形变、移动和局部重绘，但对大范围语义替换或复杂材质物理属性编辑，还需要文本、mask 或 PBR 通道控制配合。</p>",
      "quiz": {
        "q": "Dragtex 中 handle point 和 target point 的作用是什么？",
        "options": [
          "指定纹理局部从哪里移动到哪里，提供精确交互约束",
          "定义相机的焦距和光圈",
          "替代 mesh 的所有顶点",
          "只用于压缩纹理分辨率"
        ],
        "answer": 0,
        "explain": "点对把用户拖拽意图转为可优化约束，再通过 UV/表面坐标传播到 3D 纹理图。"
      }
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
      "summary": "AR3DR1 将 GRPO 类强化学习引入自回归文本到 3D 生成，并用 Hi-GRPO 把粗几何规划和局部纹理细化拆成分层优化步骤，解决 3D 资产在全局结构、部件一致性和纹理偏好之间难以同时对齐的问题。",
      "keyPoints": [
        "以自回归 3D token 生成器为策略模型，先生成语义/视觉推理 token，再生成可解码为 3D mesh 的离散 latent token",
        "采用 group-relative reward，不训练 value model，而是在同一 prompt 的多候选 3D 输出内归一化优势",
        "Hi-GRPO 分成 Step 1 粗形状生成和 Step 2 纹理/局部细节细化，并为两个阶段配置不同 reward ensemble",
        "奖励包含人类偏好、文本-3D 对齐、多视角一致性、部件完整性等维度，使用 6 视角渲染评估 3D 输出",
        "提出 MME-3DR 作为复杂 3D 推理基准，覆盖机械结构、非刚体、稀有概念和风格化物体等难例",
        "资料限制：manifest 给出的 <code>paper_url</code> 当前不是 AR3D-R1 对应论文；以下基于公开 AR3D-R1/3DGen-R1 项目资料和 manifest 元信息整理"
      ],
      "detail": "<h5>核心示意图</h5>\n<p><img alt=\"AR3D-R1 结果与强化学习总览\" src=\"https://raw.githubusercontent.com/Ivan-Tang-3D/3DGen-R1/main/figures/teaser.png\" />\n<em>图：公开项目页中的 AR3D-R1 结果与 RL 增强文本到 3D 生成概览。manifest 中的链接不可直接作为该论文依据，因此这里使用项目公开图补足核心示意。</em></p>\n<h5>核心流程伪代码</h5>\n<pre><code class=\"language-python\"># Hi-GRPO for autoregressive text-to-3D generation\nfor prompt in training_prompts:\n    candidates = []\n    for i in range(group_size):  # e.g. G = 8\n        semantic_cot = policy.sample_text_reasoning(prompt, level=&quot;global&quot;)\n        coarse_tokens = policy.sample_3d_tokens(prompt, semantic_cot)\n        coarse_mesh = vqvae.decode(coarse_tokens)\n\n        visual_cot = policy.sample_text_reasoning(\n            prompt, semantic_cot, level=&quot;local_texture&quot;\n        )\n        refined_tokens = policy.sample_3d_tokens(prompt, semantic_cot, visual_cot)\n        refined_mesh = vqvae.decode(refined_tokens)\n        candidates.append((semantic_cot, coarse_tokens, visual_cot, refined_tokens,\n                           coarse_mesh, refined_mesh))\n\n    r1 = reward_step1([c.coarse_mesh for c in candidates], prompt)\n    r2 = reward_step2([c.refined_mesh for c in candidates], prompt)\n    a1 = normalize_within_group(r1)\n    a2 = normalize_within_group(r2)\n\n    loss = clipped_grpo_loss(policy, ref_policy, candidates, a1, step=1)\n    loss += clipped_grpo_loss(policy, ref_policy, candidates, a2, step=2)\n    update(policy, loss)\n</code></pre>\n<h5>方法解读</h5>\n<p>AR3DR1 的问题设定不是用 SDS 优化单个 NeRF/3DGS，而是把文本到 3D 看成自回归序列生成：模型先产生推理文本，再生成 3D token，最后由 3D VQ-VAE 或类似解码器转成网格。这个范式的难点在于，3D 输出的好坏不是单一标量能稳定描述的。一个结果可能文本语义对了但部件比例错了，也可能轮廓合理但多视角纹理不连续，因此直接套用 2D 图像偏好奖励容易把模型推向局部捷径。</p>\n<p>GRPO 的优势是避免 value model，直接在同一个 prompt 的候选组内比较奖励。对第 <span class=\"kb-math kb-math-inline\">k</span> 个阶段，候选 <span class=\"kb-math kb-math-inline\">i</span> 的优势可写成：</p>\n<div class=\"kb-math kb-math-display\">A_i^{(k)} = \\frac{R_i^{(k)} - \\mu_{\\mathcal{G}}^{(k)}}{\\sigma_{\\mathcal{G}}^{(k)} + \\epsilon}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\mathcal{G}</span> 是同一 prompt 下采样出的候选组。这样做能减少不同 prompt 难度差异造成的奖励尺度问题：简单物体和复杂机械结构不会直接用原始分数互相比较，而是在各自候选组内判断哪一个更好。</p>\n<p>Hi-GRPO 的关键改动是把一次 3D 生成拆成两个可奖励的阶段。Step 1 关注全局几何，包括类别、主要部件、比例、空间布局和粗 mesh 可解码性；Step 2 在 Step 1 的语义规划基础上生成视觉推理和细化 3D token，关注材质、颜色、纹理、局部细节和跨视角外观一致性。对应的目标可概括为：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{Hi-GRPO}} =\n\\mathcal{L}_{\\text{GRPO}}^{(1)}(A^{(1)}, y^{(1)}) +\n\\mathcal{L}_{\\text{GRPO}}^{(2)}(A^{(2)}, y^{(2)})</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">y^{(1)}</span> 包含语义推理和粗 3D token，<span class=\"kb-math kb-math-inline\">y^{(2)}</span> 包含视觉推理和细化 3D token。每个阶段仍使用 PPO 风格的概率比裁剪与参考策略 KL 约束，防止模型为了追逐奖励而破坏原始生成分布。</p>\n<p>奖励设计是这篇工作的核心工程点。Step 1 更依赖几何和语义对齐奖励，例如多视角渲染后由 VLM 判断物体类别、部件数量和空间关系；Step 2 更强调人类偏好、纹理合理性、材质一致性和多视角一致性。直觉上，粗阶段先把“物体是什么、有哪些部件、整体比例如何”定住，细阶段再处理“表面是什么材质、颜色如何连续、局部细节是否符合 prompt”。</p>\n<p>与传统 text-to-3D pipeline 相比，AR3DR1 的不同点在于优化对象是生成模型本身，而不是单个场景的参数。DreamFusion 类方法每个 prompt 都要重新优化 3D 表示；AR3DR1 通过 RL 更新自回归策略，使模型在后续 prompt 上直接产生更符合偏好的 3D token。它的代价是 reward 工程更重，并且需要防止奖励模型偏差被策略放大。</p>",
      "quiz": {
        "q": "Hi-GRPO 为什么要把文本到 3D 生成拆成粗几何和细纹理两个强化学习阶段？",
        "options": [
          "因为 3D VQ-VAE 只能一次解码一半 token",
          "因为全局结构和局部纹理适合由不同奖励重点约束，分阶段能降低单一奖励的冲突",
          "因为 GRPO 必须训练两个 value model 才能稳定",
          "因为多视角渲染只能评估纹理，不能评估几何"
        ],
        "answer": 1,
        "explain": "3D 生成同时要求结构正确和外观精细，单一奖励容易互相拉扯；Hi-GRPO 用阶段化 reward ensemble 分别优化全局几何和局部细节。"
      }
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
      "summary": "VIST3A 提出 Video VAE Stitching and 3D Alignment，把预训练视频生成器的 latent 空间和预训练 3D 重建网络的后半段“缝合”为 3D VAE，再用直接奖励微调让视频扩散模型生成可被 3D 解码器稳定解码的 latent。",
      "keyPoints": [
        "通过 model stitching 复用视频 VAE encoder 和 feed-forward 3D 模型 decoder，避免从头训练 3D latent decoder",
        "用最小二乘搜索最兼容的 3D 网络层 <span class=\"kb-math kb-math-inline\">k^\\star</span>，并用单个 3D 卷积 stitching layer 对齐 latent 与中间特征",
        "支持把 Wan、Hunyuan Video、SVD、CogVideoX 等视频 VAE 与 AnySplat、VGGT、MVDUSt3R 等 3D 重建模型组合",
        "使用 LoRA 微调 stitching layer 之后的 3D 模块，使 stitched VAE 复现原 3D 模型输出",
        "用 direct reward finetuning 将生成模型与 stitched decoder 对齐，奖励包含多视角图像质量、3D 表示质量和 decoded/rendered 一致性",
        "输出可以是 3D Gaussian Splatting 或 point map，目标是从文本直接生成可渲染的 3D 场景"
      ],
      "detail": "<h5>核心示意图</h5>\n<p><img alt=\"VIST3A 方法框架\" src=\"https://gohyojun15.github.io/VIST3A/method_figure.png\" />\n<em>图：VIST3A 先通过 model stitching 构造 3D VAE，再通过直接奖励微调让文本到视频生成器输出 3D 可解码 latent。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># VIST3A: stitching + direct reward finetuning\nvideo_vae_encoder = E\nvideo_vae_decoder = D_rgb\nthree_d_model = F_1_to_l\n\n# 1. Find stitching layer\nfor k in candidate_layers:\n    B = E(multiview_images)              # video VAE latent\n    A_k = F_1_to_k(multiview_images)     # 3D model activation\n    S_k = least_squares(B, A_k)\n    mse[k] = ||B @ S_k - A_k||_F ** 2\nk_star = argmin(mse)\nD_3d = F_(k_star+1)_to_l ∘ S_k_star\n\n# 2. Self-supervised stitched VAE finetuning\nfor batch in multiview_data:\n    target = three_d_model(batch.images)\n    pred = D_3d(E(batch.images))\n    loss_stitch = weighted_l1(pred, target)\n    update_lora(D_3d, loss_stitch)\n\n# 3. Align generator with 3D decoder\nfor prompt in prompts:\n    z0 = video_generator.denoise(noise, prompt)\n    mv_images = D_rgb(z0)\n    scene_3d = D_3d(z0)\n    reward = quality(mv_images, prompt) + quality(render(scene_3d), prompt)\n    reward += consistency(mv_images, render(scene_3d))\n    loss = generative_loss(prompt) - lambda_reward * reward\n    update_lora(video_generator, loss)\n</code></pre>\n<h5>方法解读</h5>\n<p>VIST3A 关注的是 latent diffusion 式 3D 生成中的 decoder 瓶颈。许多方法会把文本到视频/多视角生成器微调成输出多视角 latent，然后再训练一个从 latent 到 3DGS 或 point map 的 decoder。但 3D decoder 从头训练需要大量带 3D 监督的数据，而且与视频生成器分开训练时，生成出来的 latent 未必落在 decoder 熟悉的分布上。</p>\n<p>模型缝合的假设是：视频 VAE latent 和某些 feed-forward 3D 模型中间层虽然来自不同预训练任务，但都编码了视角一致的空间信息，因此可能存在近似线性映射。VIST3A 对每个候选层 <span class=\"kb-math kb-math-inline\">k</span> 解一个最小二乘问题：</p>\n<div class=\"kb-math kb-math-display\">S_k^\\star = \\arg\\min_S \\| B S - A_k \\|_F^2</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">B</span> 是视频 VAE encoder 的 latent，<span class=\"kb-math kb-math-inline\">A_k</span> 是 3D 模型第 <span class=\"kb-math kb-math-inline\">k</span> 层激活。选择误差最小的 <span class=\"kb-math kb-math-inline\">k^\\star</span> 后，丢弃 3D 模型前半段，把 <span class=\"kb-math kb-math-inline\">\\mathcal{E}</span>、<span class=\"kb-math kb-math-inline\">S_{k^\\star}</span> 和 <span class=\"kb-math kb-math-inline\">F_{k^\\star+1:l}</span> 拼起来：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{M}_{\\text{stitched}} = F_{k^\\star+1:l} \\circ S_{k^\\star} \\circ \\mathcal{E}</div>\n<p>这一步的直觉很直接：视频 VAE encoder 负责把多视角视频压缩成 latent，3D 网络后半段负责把兼容特征解码成 3D 输出。只要 stitching layer 把两个空间对齐，后半段的 3D 知识就能被复用。</p>\n<p>第二个关键是 direct reward finetuning。仅用多视角重建损失微调视频生成器，会鼓励它生成像视频的 latent，但不保证这些 latent 能被 stitched 3D decoder 稳定解释。VIST3A 因此在 denoising 轨迹末端计算 3D 相关奖励：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L} = \\mathcal{L}_{\\text{gen}} - \\lambda r(z_0, c)</div>\n<p>奖励由三部分组成：视频 decoder 输出的多视角图像质量、3D decoder 输出渲染图的文本对齐/偏好质量，以及 decoded image 与 3D rendered image 在同视角下的 <span class=\"kb-math kb-math-inline\">\\ell_1</span>+LPIPS 一致性。这样 reward 可以沿 denoising 过程反传，使生成模型逐渐产生更“3D 可解码”的 latent。</p>\n<p>与传统两阶段 text-to-3D 不同，VIST3A 不是先生成视频再另行重建，而是在 latent 层把生成器和 3D decoder 合成一个端到端系统。它避免了显式中间视频的误差累积，也减少了 3D decoder 从零学习的成本；限制是 stitching 是否有效取决于两个预训练模型表示空间的兼容性，并且 direct reward tuning 仍需要较高显存和精心选择奖励权重。</p>",
      "quiz": {
        "q": "VIST3A 中 model stitching 的核心目的是什么？",
        "options": [
          "把视频模型的 RGB decoder 替换为随机初始化的 3D decoder",
          "寻找视频 VAE latent 与 3D 重建网络中间层之间的线性兼容点，复用 3D 网络后半段作为 decoder",
          "把所有视频帧先渲染成 NeRF，再用 SDS 优化",
          "只用 CLIP 分数选择最好的多视角视频"
        ],
        "answer": 1,
        "explain": "VIST3A 通过最小二乘寻找 stitching layer，将视频 latent 对齐到 3D 模型中间特征，从而保留预训练 3D decoder 的重建能力。"
      }
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
      "summary": "Lyra 用相机可控视频扩散模型作为 teacher，在同一 latent 上训练 3DGS decoder 作为 student，把视频模型隐含的 3D 一致性蒸馏成显式 3D Gaussian Splatting 表示，并进一步扩展到动态 4D 场景。",
      "keyPoints": [
        "使用 camera-controlled video diffusion model 生成多轨迹视频 latent，RGB decoder 输出作为 teacher 监督",
        "训练 3DGS decoder 直接从视频 latent 和 Plucker 相机编码预测显式 3D Gaussian 参数",
        "不依赖真实多视角数据集，训练监督主要由视频扩散模型自蒸馏产生",
        "多轨迹监督使用 6 条相机轨迹扩大视角覆盖，decoder 学习融合不同轨迹 latent 并填补遮挡区域",
        "3DGS decoder 在压缩 latent 空间工作，避免像素空间重建模型处理长视频序列时的显存爆炸",
        "动态版本加入 source/target time embedding，生成时间条件 3DGS，实现单目视频到 4D 场景"
      ],
      "detail": "<h5>核心示意图</h5>\n<p><img alt=\"Lyra 自蒸馏框架\" src=\"https://arxiv.org/html/2509.19296v1/x2.png\" />\n<em>图：Lyra 的 teacher-student 自蒸馏框架。视频模型 RGB 分支提供监督，3DGS decoder 分支学习输出显式 3D 表示。</em></p>\n<h5>核心流程伪代码</h5>\n<pre><code class=\"language-python\"># Lyra self-distillation\nfreeze(video_diffusion_model)\nfreeze(video_vae_rgb_decoder)\ntrain(gaussian_decoder)\n\nfor image_or_video in synthetic_inputs:\n    trajectories = sample_camera_trajectories(num=6)\n    latents = []\n    teacher_frames = []\n\n    for cameras in trajectories:\n        z = video_diffusion_model.denoise(image_or_video, cameras)\n        latents.append(z)\n        teacher_frames.append(rgb_decoder(z))\n\n    plucker = encode_plucker_rays(trajectories)\n    gaussians = gaussian_decoder(latents, plucker)\n\n    rendered = render_3dgs(gaussians, trajectories)\n    loss = mse(rendered, teacher_frames)\n    loss += lambda_lpips * lpips(rendered, teacher_frames)\n    loss += lambda_depth * scale_invariant_depth(rendered, teacher_depth)\n    update(gaussian_decoder, loss)\n</code></pre>\n<h5>方法解读</h5>\n<p>Lyra 的出发点是：视频扩散模型已经从大规模视频中学到相机运动、遮挡和场景连续性，但这些知识通常只存在于 RGB 序列里，不能直接用于交互式三维渲染。Lyra 不再收集真实多视角重建数据，而是把相机可控视频模型当作 teacher，让它合成具有指定相机轨迹的视频，再训练 student 3DGS decoder 去复现这些视频的渲染结果。</p>\n<p>训练时，输入可以是单张图像或单目视频。视频扩散模型根据相机轨迹生成 denoised latent <span class=\"kb-math kb-math-inline\">\\mathbf{z}</span>，同一个 latent 有两条解码路径：冻结的 RGB decoder 得到 teacher 视频 <span class=\"kb-math kb-math-inline\">\\hat{I}_{\\text{rgb}}</span>，可训练的 3DGS decoder 得到高斯集合 <span class=\"kb-math kb-math-inline\">\\mathcal{G}</span>。渲染函数将 <span class=\"kb-math kb-math-inline\">\\mathcal{G}</span> 从对应相机视角渲染成 <span class=\"kb-math kb-math-inline\">\\hat{I}_{\\text{gs}}</span>，损失约束二者一致：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{img}} =\n\\lambda_{\\text{mse}}\\|\\hat{I}_{\\text{gs}} - \\hat{I}_{\\text{rgb}}\\|_2^2\n+ \\lambda_{\\text{lpips}}\\text{LPIPS}(\\hat{I}_{\\text{gs}}, \\hat{I}_{\\text{rgb}})</div>\n<p>只用 RGB loss 容易得到扁平几何，因此 Lyra 还使用视频深度估计器提供深度监督：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L} = \\mathcal{L}_{\\text{img}} + \\lambda_{\\text{depth}}\\mathcal{L}_{\\text{depth}}</div>\n<p>其中深度项通常使用尺度不变形式，重点约束相对几何而不是绝对尺度。3DGS decoder 输出每个高斯的中心、尺度、旋转、透明度和颜色等参数，显式 3D 表示保证推理后可以从任意视角实时渲染。</p>\n<p>多轨迹训练是 Lyra 区别于普通单轨迹蒸馏的关键。单条相机轨迹通常只能覆盖场景一侧，student 容易把未观察区域压扁或忽略。Lyra 为每个输入采样 6 条轨迹，每条轨迹有长序列帧，decoder 在 latent 空间融合这些轨迹信息。latent 空间维度远低于像素空间，使模型可以处理长序列和多视角，而不需要把数百张高分辨率图像都送进像素级 transformer。</p>\n<p>动态扩展中，Lyra 为 decoder 加入 source time 和 target time embedding。静态 3DGS 只需输出一个固定场景，动态 4D 则要输出某个目标时刻的高斯。训练时对每个目标时间选择对应 teacher 帧监督，并用 motion-reversed augmentation 改善早期/远端视角覆盖不均的问题。这样从单目视频中也能学到“同一运动状态在不同视角下应如何呈现”。</p>\n<p>与 VIST3A 相比，Lyra 不强调把两个预训练模型结构切开再缝合，而是让视频模型自己生成监督信号，训练一个显式 3DGS student。它的优势是数据闭环更简单、输出直接可渲染；限制是最终 3D 一致性受 teacher 视频模型相机控制能力约束，teacher 的幻觉和遮挡错误也可能被 student 蒸馏下来。</p>",
      "quiz": {
        "q": "Lyra 为什么选择在视频 latent 空间训练 3DGS decoder，而不是在像素空间输入所有帧？",
        "options": [
          "因为 3DGS 只能读取 latent，不能读取 RGB 图像",
          "因为 latent 空间压缩了时空信息，可高效融合长视频和多轨迹，避免像素级注意力显存过高",
          "因为 RGB decoder 在训练时必须被更新",
          "因为深度监督只在 latent 空间有定义"
        ],
        "answer": 1,
        "explain": "多轨迹长视频在像素空间会带来极高的 token 数和显存开销；Lyra 直接处理视频扩散 latent，可以高效聚合视角信息并输出显式 3DGS。"
      }
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
      "summary": "Hunyuan3D 3.0 面向高分辨率原生 3D 资产生成，将图像/文本条件、稀疏 3D latent 扩散、超高分辨率几何解码和纹理生成组合成端到端 pipeline，目标是以 1536³ 级空间分辨率恢复更锐利的几何细节。",
      "keyPoints": [
        "资料限制：manifest 中的 GitHub 链接当前不可访问，以下基于 manifest 的 1536³/36 亿体素信息和 Hunyuan3D 系列公开架构整理",
        "采用两阶段或多阶段资产生成范式：先生成几何，再进行 UV/纹理/PBR 材质生成",
        "高分辨率几何核心是稀疏空间查询，避免对完整 <span class=\"kb-math kb-math-inline\">1536^3</span> 体素网格做密集解码",
        "使用 3D VAE/DiT 或 rectified-flow diffusion 在 compact latent 中建模形状，再由 SDF/occupancy decoder 输出 mesh",
        "通过 coarse occupancy、octree/分块查询、marching cubes/DMC 和网格简化把高分辨率隐式场转为可用 mesh",
        "纹理阶段使用多视角渲染条件、UV baking 和材质估计，输出可导入图形引擎的 textured mesh"
      ],
      "detail": "<h5>核心示意图</h5>\n<p><img alt=\"Hunyuan3D 系列生成示意\" src=\"https://raw.githubusercontent.com/Tencent-Hunyuan/Hunyuan3D-2/main/assets/images/teaser.jpg\" />\n<em>图：Hunyuan3D 系列公开项目中的图像到 3D 资产生成示意。Hunyuan3D 3.0 指定仓库不可访问，因此这里使用同系列公开图表示整体 pipeline。</em></p>\n<h5>核心流程伪代码</h5>\n<pre><code class=\"language-python\"># Hunyuan3D 3.0 conceptual high-resolution pipeline\ncondition = encode_prompt_or_image(input_text, input_image)\n\n# geometry latent generation\nz = sample_noise(shape=&quot;sparse_3d_latents&quot;)\nfor t in denoising_schedule:\n    v = geometry_dit(z, t, condition)\n    z = rectified_flow_step(z, v, t)\n\n# high-resolution sparse SDF querying\ncoarse_mesh, occupancy = decode_coarse_shape(z, resolution=512)\nquery_blocks = prune_empty_blocks(occupancy, target_resolution=1536)\nsdf_values = {}\nfor block in query_blocks:\n    points = sample_grid_points(block)\n    sdf_values[block] = sdf_decoder(points, z, condition)\n\nmesh = dual_marching_cubes(sdf_values)\nmesh = simplify_and_repair(mesh)\n\n# texture and material\nuv = unwrap_uv(mesh)\nviews = render_geometry_condition(mesh, cameras=&quot;uniform&quot;)\npbr_maps = texture_model(input_image, views, condition)\nasset = bake_textures(mesh, uv, pbr_maps)\n</code></pre>\n<h5>方法解读</h5>\n<p>Hunyuan3D 3.0 的 manifest 关键词是“1536³原生分辨率36亿体素”。这类系统的核心挑战不是单纯把网格采样分辨率调大，而是如何在超高空间分辨率下控制计算量。完整 <span class=\"kb-math kb-math-inline\">1536^3</span> 网格约有 36 亿个采样点，若对每个点都运行 dense decoder，显存和时间都会不可接受。因此合理设计通常会采用稀疏 occupancy、分块查询和层级剪枝，只在可能靠近表面的区域查询 SDF 或 occupancy。</p>\n<p>几何生成通常先在低维 3D latent 中完成。输入图像或文本经过视觉/文本 encoder 得到条件 <span class=\"kb-math kb-math-inline\">c</span>，扩散 transformer 在 latent 空间学习从噪声到形状 token 的流：</p>\n<div class=\"kb-math kb-math-display\">z_t = (1-t)\\epsilon + t z_1,\\quad v_\\theta(z_t, t, c) \\approx z_1 - \\epsilon</div>\n<p>推理时从噪声出发沿 ODE 或采样调度更新 latent，得到描述整体形状的 <span class=\"kb-math kb-math-inline\">z_1</span>。这样全局结构在 compact latent 中建模，而不是直接在十亿级体素上生成。</p>\n<p>高分辨率 decoder 的重点是局部查询。系统先解码一个粗 occupancy 或粗 mesh，确定物体表面可能出现的空间块；再把 1536³ 空间分成较小 block，只对靠近表面的 block 采样 SDF。若粗 occupancy 显示某个 block 完全为空或完全在物体内部，就可以跳过或用低成本规则处理。最终通过 marching cubes 或 dual marching cubes 提取 mesh，并做法线修复、去噪、简化和面数控制。</p>\n<p>纹理阶段与几何阶段解耦。几何 mesh 先做 UV 展开，再从多个标准视角渲染法线、深度、位置或可见性条件。纹理模型根据输入参考图和这些几何条件生成多视角 albedo/roughness/metallic 或 RGB 贴图，最后通过 UV baking 合成到 mesh。相比只输出灰模，这一步使资产能进入实时渲染或 DCC 工具链。</p>\n<p>与 Instant3D 等早期多视角提升方法相比，Hunyuan3D 3.0 的关键目标是减少 2D 多视角不一致和低分辨率几何带来的边缘钝化。高原生分辨率能恢复更细的孔洞、锐边和薄结构，但也会放大训练数据噪声和后处理成本，因此稀疏解码、网格修复和纹理可见性处理是生产级 pipeline 中不可缺少的部分。</p>",
      "quiz": {
        "q": "在 1536³ 级别的 3D 生成中，为什么通常不能对完整体素网格做密集 SDF 解码？",
        "options": [
          "因为 marching cubes 只能处理 512³ 网格",
          "因为完整 1536³ 网格包含约 36 亿采样点，密集查询计算和显存开销过高，需要稀疏剪枝",
          "因为文本条件无法用于高分辨率几何",
          "因为 UV 展开必须先于几何生成"
        ],
        "answer": 1,
        "explain": "超高分辨率空间的采样点数量巨大，实际系统会先估计粗占据区域，再只在表面附近分块查询 SDF 或 occupancy。"
      }
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
      "summary": "Seed3D 2.0 用 locality-aware VAE 与两阶段 coarse-to-fine DiT 提升几何精度，再用统一 PBR 纹理模型和仿真就绪模块输出可分解、可铰接、可导出 URDF 的工业级 3D 资产。",
      "keyPoints": [
        "几何采用 VecSet 范式：3D VAE 将连续形状压缩为 latent token，decoder 通过 SDF 查询和 DMC 提取 mesh",
        "locality-aware latent aggregation 将容量集中在复杂几何区域，并用稀疏路由降低 SDF cross-attention 解码成本",
        "Seed3D-DiT 使用 rectified-flow diffusion transformer，两阶段生成：Stage 1 生成粗结构，Stage 2 依据粗形状 prior 和 voxelized positional encoding 恢复锐边与高频细节",
        "纹理从 Seed3D 1.0 的级联 RGB/PBR 流程升级为统一 PBR 模型，直接生成 albedo 与 metallic-roughness",
        "PBR 模型使用 MoE 扩容和 VLM material prior，缓解未知光照下材质分解的歧义",
        "扩展 scene layout planning、part-aware generation、articulation generation，并导出包含 joint、axis、range、mass/friction 的 URDF 等仿真格式"
      ],
      "detail": "<h5>核心示意图</h5>\n<p><img alt=\"Seed3D 2.0 几何生成流程\" src=\"https://arxiv.org/html/2605.13862v1/x2.png\" />\n<em>图：Seed3D 2.0 的两阶段几何生成 pipeline，Stage 1 建立粗形状，Stage 2 利用粗形状和位置先验恢复高频细节。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># Seed3D 2.0 image-to-asset pipeline\nimage_feat = image_encoder(input_image)\n\n# Stage 1: coarse geometry\nz1 = rectified_flow_sample(stage1_dit, condition=image_feat)\ncoarse_mesh = vae.decode_to_mesh(z1, grid_resolution=512)\n\n# Stage 2: geometry refinement\ncoarse_latent = vae.encode(coarse_mesh)\noccupancy = voxelize_and_dilate(coarse_mesh)\npos_enc = voxelized_positional_encoding(occupancy)\nz2 = rectified_flow_sample(\n    stage2_dit,\n    condition=[image_feat, partially_diffused(coarse_latent), pos_enc],\n)\nmesh = vae.decode_to_mesh_sparse(z2, target_resolution=1536)\nmesh = qem_simplify(mesh)\nuv = unwrap(mesh)\n\n# Unified PBR texture\ngeom_views = render_geometry_buffers(mesh)\nmaterial_text = vlm_describe_material(input_image)\npbr = pbr_dit_moe(input_image, geom_views, material_text)\nasset = bake_uv_textures(mesh, uv, pbr.albedo, pbr.metallic_roughness)\n\n# Simulation-ready export\nparts = partseg(asset.mesh)\npart_meshes = part_dit_complete(parts, asset)\narticulation = infer_joints_with_vlm_and_video_prior(part_meshes)\nexport_urdf(part_meshes, articulation, asset.materials)\n</code></pre>\n<h5>方法解读</h5>\n<p>Seed3D 2.0 先解决 Seed3D 1.0 的质量缺口。单阶段生成模型需要同时学全局拓扑和局部锐边，容易在复杂结构上过平滑。Seed3D 2.0 将几何分成两步：第一阶段只负责可靠地生成整体形状 latent，第二阶段拿第一阶段输出作为锚点，专门恢复边缘、曲率变化和细表面结构。</p>\n<p>3D VAE 采用双分支 perceiver encoder-decoder，把带位置、法线和锐边采样的点云压缩成 VecSet latent。局部感知聚合的直觉是，空间邻近 token 往往包含冗余信息，而几何复杂区域更需要表达容量。因此 encoder 把 token 容量集中到复杂区域；decoder 查询 SDF 时，也不让每个空间点 attend 全部 latent，而是通过 content-adaptive sparse routing 只关注空间相关 token，降低高分辨率 SDF 解码开销。</p>\n<p>两阶段 DiT 使用 rectified flow。在 latent 空间中，可把噪声 <span class=\"kb-math kb-math-inline\">\\epsilon</span> 与真实 latent <span class=\"kb-math kb-math-inline\">z_1</span> 的插值写作：</p>\n<div class=\"kb-math kb-math-display\">z_t = (1-t)\\epsilon + t z_1,\\quad v_\\theta(z_t,t,c) \\approx z_1-\\epsilon</div>\n<p>Stage 1 的条件主要来自输入图像，目标是得到全局拓扑正确的 coarse latent。Stage 2 则额外接收 partially diffused Stage 1 latent 和 coarse mesh voxelized positional encoding，使模型知道局部细节应依附在哪些空间位置。这样 Stage 2 不必重新发明整体结构，可以把模型容量集中在高频几何上。</p>\n<p>纹理部分从级联流程变成统一 PBR 生成。旧流程若先生成多视角 RGB，再估计 albedo/roughness/metallic，误差会层层传递。Seed3D 2.0 的统一模型直接以参考图、几何渲染条件和 VLM 材质描述为条件，生成多视角 albedo 与 MR 图。MoE 用稀疏 expert routing 扩大容量，避免高分辨率纹理带来线性增长的计算量；VLM material prior 则帮助区分“高光来自照明”还是“表面真实金属/粗糙度属性”。</p>\n<p>更重要的是，Seed3D 2.0 将资产生成推进到仿真可用。scene layout planning 根据文本、图像或视频推断多物体空间布局；part-aware pipeline 先用 PartSeg 分割功能部件，再用 PartDiT 根据局部点云、全局 shape latent 和图像外观补全部件 mesh；articulation generation 则结合 VLM 语义、几何候选轴和视频运动先验推断 joint type、axis 与 motion range。最终资产不仅是静态 mesh，还能带着层级部件和关节参数导出为 URDF。</p>",
      "quiz": {
        "q": "Seed3D 2.0 的 Stage 2 几何 DiT 为什么要使用 Stage 1 粗形状 prior 和 voxelized positional encoding？",
        "options": [
          "为了完全跳过 VAE 解码",
          "为了让 Stage 2 锚定全局结构，把优化重点放在锐边和高频细节恢复上",
          "为了把纹理图直接转换成 URDF",
          "为了避免输入图像参与条件控制"
        ],
        "answer": 1,
        "explain": "Stage 1 已提供可靠粗拓扑，Stage 2 借助粗形状和空间位置先验专注局部细节，从而缓解单阶段模型在全局与高频之间的冲突。"
      }
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
      "summary": "Rodin Gen-2 面向生产级 text/image-to-3D 资产生成，以 100 亿参数级生成模型和 BANG 式部件分解/拓扑控制为核心，将多图条件、四边形 mesh、HD texture 和可编辑部件输出整合到商业化 3D pipeline。",
      "keyPoints": [
        "资料限制：manifest 指向的 <code>microsoft.com/rodin</code> 当前不是稳定论文页，公开产品资料多以 Hyper3D/Rodin Gen-2 形式出现；以下按 manifest 与可公开访问产品说明整理",
        "输入支持文本、单图和多图，多图模式用于约束同一物体的多视角一致性",
        "生成目标是 production-ready asset，而不仅是隐式场预览，输出格式通常面向 GLB/mesh/texture 工作流",
        "manifest 强调 100 亿参数和四边形拓扑生成，说明模型重点从“能生成”转向“可编辑、可布线、可投产”",
        "BANG 式 part decomposition 支持部件级 refinement，使复杂资产能按功能区域局部修改",
        "推理参数通常包含 mesh mode、poly count、HD texture、material、bounding box 或高质量包等控制项"
      ],
      "detail": "<h5>核心示意图</h5>\n<p><img alt=\"Rodin Gen-2 产品示意\" src=\"https://assets.runware.ai/og/hyper3d-rodin-gen-2.png\" />\n<em>图：公开 API/产品页中的 Rodin Gen-2 示意图。由于没有可访问论文方法图，这里使用产品页图，并在下文给出概念级技术流程。</em></p>\n<h5>核心流程伪代码</h5>\n<pre><code class=\"language-python\"># Rodin Gen-2 conceptual production asset pipeline\ncond = encode_conditions(\n    text_prompt=prompt,\n    images=multi_view_images,\n    bbox=optional_bounding_boxes,\n    material_mode=material_setting,\n)\n\n# Large 3D generator samples structured asset latent\nz = sample_noise()\nfor t in denoising_or_autoregressive_steps:\n    z = generator_10b.step(z, t, cond)\n\n# BANG-style part decomposition and topology generation\nparts = decompose_into_parts(z, cond)\nquad_meshes = []\nfor part in parts:\n    surface = decode_part_surface(part)\n    quad_mesh = quad_remesh_or_generate(surface, target_poly_count)\n    quad_meshes.append(local_refine(quad_mesh, cond))\n\nmesh = assemble_parts(quad_meshes)\nuv = unwrap_quad_mesh(mesh)\ntextures = generate_hd_textures(mesh, uv, cond)\nasset = export_glb(mesh, textures, topology=&quot;quad&quot;)\n</code></pre>\n<h5>方法解读</h5>\n<p>Rodin Gen-2 的公开资料更接近产品/API 文档，而不是完整论文。根据 manifest 和可见产品能力，它的技术重点可以理解为：用更大的生成模型建模复杂 3D 资产，同时把输出从三角网格预览推进到可编辑、可纹理化、可控制面数和拓扑的资产。这里的“100亿参数四边形拓扑生成”指向两个关键方向：大模型容量和面向 DCC/游戏引擎的拓扑质量。</p>\n<p>输入层支持文本和图像条件。文本 prompt 提供语义、风格、材质和结构描述；多图输入可提供不同视角，缓解单图中背面和遮挡区域的不确定性；bounding box 或类似控制项用于约束比例和空间占位。条件编码后进入 3D 生成器，生成器可以是扩散式 latent generator，也可以混合自回归结构，核心都是在结构化 3D latent 中采样资产。</p>\n<p>与只输出点云、NeRF 或任意三角 mesh 的方法不同，Rodin Gen-2 更强调四边形 topology。四边形网格对后续编辑、绑定、细分曲面和 UV 展开更友好，但直接生成四边形拓扑比生成隐式表面更困难，因为它要求面流、边环和部件边界尽量符合物体结构。概念上，模型需要同时优化几何误差和拓扑可用性：</p>\n<div class=\"kb-math kb-math-display\">Q_{\\text{asset}} =\n\\lambda_g Q_{\\text{geometry}} +\n\\lambda_t Q_{\\text{topology}} +\n\\lambda_m Q_{\\text{material}} +\n\\lambda_a Q_{\\text{alignment}}</div>\n<p>其中 topology 项不仅关心面数，还关心四边形比例、非流形错误、部件边界、UV 友好度和局部细节是否被合理保留。</p>\n<p>BANG 式部件分解可以看作把复杂资产拆成可局部生成和局部编辑的子结构。对于包含多个功能部件的物体，整体一次性生成容易出现融合、穿插或细节互相污染；先分解再组装可以让每个部件拥有更清晰的边界、材质和拓扑。Gen-2 Edit 等后续能力也依赖这种部件级表示，因为局部文本编辑需要知道“改哪里”以及“哪些区域不应被改动”。</p>\n<p>纹理阶段通常在 mesh/UV 确定后进行。HD texture 模块根据 prompt、输入图和几何缓冲生成贴图，并按材质模式输出更适合渲染管线的颜色、粗糙度、金属度或法线信息。最终 GLB 或类似格式把 quad mesh、UV、纹理和材质打包，服务于产品可用性而非只展示渲染图。</p>\n<p>与 Seed3D 2.0 的研究型 pipeline 相比，Rodin Gen-2 的公开信息更强调商业控制面：多图输入、mesh mode、poly count、HD texture、material 选项和高质量包。它的局限也来自资料透明度不足：没有公开论文时，具体网络结构、训练数据、损失函数和拓扑生成细节只能按产品能力与 3D 生成通用技术进行概念化解读。</p>",
      "quiz": {
        "q": "Rodin Gen-2 强调四边形拓扑生成的主要工程意义是什么？",
        "options": [
          "四边形网格天然比任何隐式场占用更少显存",
          "四边形拓扑更适合 DCC 编辑、细分、绑定、UV 展开和生产级资产管线",
          "四边形拓扑不需要纹理贴图",
          "四边形网格可以完全避免多视角不一致"
        ],
        "answer": 1,
        "explain": "生产资产不仅要形状像，还要可编辑、可布线、可贴图；四边形拓扑通常比任意三角网格更适合后续建模和引擎工作流。"
      }
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
