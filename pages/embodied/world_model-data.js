/**
 * world_model-data.js — 由 pipeline/build.py 于 2026-06-16 17:00:13 自动生成。
 * 源文件：content/embodied/world_model.md
 * ⚠️  请勿手动修改；如需更新，修改源文档后重新编译。
 */
window.PAGE_CONFIG = {
  "meta": {
    "domain": "embodied",
    "topic_id": "world_model",
    "topic_name": "世界模型",
    "page_title": "世界模型 算法总结",
    "page_subtitle": "2026-06-16 版",
    "page_desc": "从早期状态空间模型到生成式视频世界模型，涵盖物理世界建模、时空预测与基于模型的规划的完整演化历程。",
    "page_icon": "🌍",
    "hero_pills": [
      "物理仿真",
      "时空预测"
    ],
    "count_pill": "{count} 个算法",
    "image_base": "",
    "overview_from_doc": true,
    "latest_overview_from_doc": true
  },
  "overview": [
    {
      "title": "",
      "body_html": "<h1>arXiv：面向具身智能的世界模型综述</h1>\n<ul>\n<li>来源平台: <strong>zhihu</strong>（知乎专栏文章）</li>\n<li>原文链接: <a href=\"https://zhuanlan.zhihu.com/p/2048057002954379980\">https://zhuanlan.zhihu.com/p/2048057002954379980</a></li>\n<li>作者: 集智科学家</li>\n</ul>\n<hr />\n<p>arXiv：面向具身智能的世界模型综述</p>\n<h1>arXiv：面向具身智能的世界模型综述</h1>\n<p>作者: 集智科学家, 赞: 2</p>\n<p><img alt=\"\" src=\"https://picx.zhimg.com/v2-6ab0890ce0e67fe21e50238b5b6cda7b_1440w.jpg\" /></p>\n<p><strong>导语</strong></p>\n<p><strong>机器人自主操作、自动驾驶预判、智能体想象式决策的背后，是世界模型，具身人工智能的内部模拟器。它赋予智能体感知、预测与规划能力，是下一代通用人工智能的核心基石。这篇工作首次提出功能-时间-空间三轴统一分类框架，系统梳理世界模型从决策专用到通用模拟的演进脉络，量化对比全球顶尖模型性能，深度剖析领域核心挑战与未来方向，为学术界构建了全景式知识图谱，也为工业界技术落地指明了清晰路径。</strong></p>\n<p><strong>关键词：世界模型（World Models），具身人工智能（Embodied AI），时间建模，空间表示，自主智能体 （Autonomous Agents）</strong></p>\n<p><img alt=\"\" src=\"https://pic3.zhimg.com/v2-81a9cdf1a7db9806413474e53972bcd6_1440w.jpg\" /></p>\n<p>王璇丨作者</p>\n<p>赵思怡丨审校</p>\n<p><img alt=\"\" src=\"https://picx.zhimg.com/v2-8c87781856a342f32b743512a567afff_1440w.jpg\" /></p>\n<blockquote>\n<p>论文题目：A Comprehensive Survey on World Models for Embodied AI</p>\n<p>论文链接：<a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/html/2510.16732v1\">https://arxiv.org/html/2510.16732v1</a></p>\n<p>发表时间：2025 年 10 月 19 日</p>\n<p>论文来源：arXiv</p>\n</blockquote>\n<h1></h1>\n<p><strong><em>*</em>*从认知科学到通用模拟器：世界模型的进化之路</strong>****</p>\n<p>世界模型的思想根植于认知科学，人类通过大脑内部模型整合感官、预判事件、指导行动。受此启发，早期AI将其引入基于模型的强化学习，通过学习环境状态转移提升样本效率与规划能力。2018年Ha与Schmidhuber的开创性工作正式确立\"世界模型\"概念，证明循环神经网络可编码环境状态、模拟未来轨迹以驱动策略优化，直接催生了经典的Dreamer系列模型。</p>\n<p>大规模生成式与多模态学习的爆发，推动世界模型从任务专用的决策辅助工具，进化为高保真通用环境模拟器。OpenAI Sora、Meta V-JEPA 2等模型不仅能生成长时序连贯视频，更能捕捉复杂物理规律与物体交互，为跨领域具身智能奠定了通用基础。</p>\n<p>但领域的快速发展也导致术语混乱、分类体系割裂，现有综述多局限于功能视角或自动驾驶等单一应用，缺乏覆盖全主流方法的统一框架。本次综述提出的<strong>功能-时间-空间三轴分类法</strong>，正是为解决这一痛点而生，从三个核心维度构建了逻辑自洽的分类体系，为领域研究提供了标准化分析工具。</p>\n<h2></h2>\n<p><strong><em>*</em>*三轴统一框架：拆解世界模型的核心设计维度</strong>****</p>\n<p>三轴分类框架是该综述的核心贡献，它从<strong>功能耦合性、时间建模方式、空间表示策略</strong>三个相互关联的核心维度，厘清了世界模型的设计逻辑与技术路线。</p>\n<p>图1. 该综述的结构。沿三个轴对全球模型进行分类，并展示每种方法的代表性方案，为该领域提供了统一的视角</p>\n<p>功能维度上，世界模型呈现<strong>决策耦合与通用目的</strong>的分野。决策耦合模型与下游任务深度绑定，在特定领域数据上训练，以实时高效的控制为目标，代表如覆盖800+任务的DreamerV3、自动驾驶MILE、机器人操作ManiGaussian。通用目的模型则在大规模无标注数据上预训练通用物理规律，以跨域泛化为核心优势，典型如Sora、V-JEPA 2，但存在训练成本高、通用表示与具体决策衔接难的问题。</p>\n<p>时间建模维度，核心是<strong>序列模拟与全局预测</strong>的权衡。序列模拟采用自回归方式逐帧推演，结构紧凑、样本效率高且天然支持闭环控制，从早期RNN到如今的Transformer 状态空间模型（TSSM）、状态空间模型（SSM）如 Mamba均属此类，但存在长时序误差累积的致命缺陷。全局差异预测并行估计完整未来序列，通过全局约束缓解误差，以JEPA系列为代表，却难以适配需要逐步决策的控制场景，当前研究正朝着融合两者优势的方向推进。</p>\n<p>空间表示维度，呈现<strong>从低维抽象到高维几何</strong>的进化路径。全局隐向量计算高效但丢失细粒度空间信息，是早期模型的主流选择。令牌特征序列依托Transformer与LLM技术，成为当前跨模态建模的主流。空间隐网格凭借BEV、体素等几何先验，在自动驾驶领域广泛应用；分解渲染表示则基于3D 高斯溅射（3DGS）和神经辐射场（NeRF）等技术，通过可微渲染实现视角一致、物理可信的高保真预测，是当前最前沿的研究方向。</p>\n<h2></h2>\n<p><strong><em>*</em>*数据、评估与领域核心挑战</strong>****</p>\n<p>数据与评估是世界模型发展的核心基础设施，基于统一框架的量化对比则清晰呈现了领域进展与现存瓶颈。将数据资源划分为四类：仿真平台（MuJoCo、CARLA等）提供可控可扩展的虚拟环境，交互式基准（DMC、RLBench等）建立标准化性能标尺，百万级轨迹的OXE等离线数据集支撑跨具身预训练，Franka、Unitree系列等真实机器人平台完成物理世界验证。评估体系呈三层递进：像素级质量（FID、FVD等）、状态级理解（mIoU、mAP等）、任务级性能（成功率、样本效率等），但当前指标过度侧重像素保真度，忽视了物理一致性与因果推理等具身核心能力。</p>\n<p>表1. nuScenes验证集上开环规划的性能对比</p>\n<p>基于统一框架的量化对比显示，DrivePhysica、MiLA分别领跑自动驾驶视频生成的视觉保真度与时间一致性，COME在4D占用预测中表现最优，基于逆动力学的VidMan在机器人操作任务中成功率领先，SSR则在开环规划中实现最低碰撞率。尽管进展显著，领域仍面临三大核心挑战：一是<strong>数据与评估碎片化</strong>，缺乏跨域统一数据集与物理导向的评估标准；二是<strong>计算效率瓶颈</strong>，Transformer、扩散模型的推理成本难以满足实时控制需求；三是<strong>建模策略的固有矛盾</strong>，自回归的误差累积、全局预测的交互性不足、空间表示的效率与表达性失衡，共同限制了长时序复杂任务的落地。</p>\n<h2></h2>\n<p><strong><em>*</em>*未来展望：走向统一、高效、物理可信的世界模型</strong>****</p>\n<p>针对上述挑战，综述指出了未来的研究方向。在数据与评估方面，需要构建统一的多模态跨域数据集，并发展能够评估物理一致性、因果推理和长时序动态的新型指标。在计算效率方面，模型压缩技术和新型架构是重要的突破点，它们有望在保持性能的同时，实现实时推理。在建模策略方面，融合自回归和全局预测的优势、引入显式 3D 几何先验和物理约束、结合大语言模型的推理能力，将是构建下一代通用世界模型的关键路径。</p>\n<p>世界模型作为具身 AI 的核心，正在经历从专用到通用、从 2D 到 3D、从像素到物理的深刻变革。这篇综述提出的三轴统一框架，不仅为学术界梳理了清晰的研究脉络，也为工业界的技术落地提供了重要参考。随着数据、算法和算力的持续进步，我们有理由相信，未来的世界模型将能够像人类大脑一样，构建出物理可信、因果一致的内部世界，真正实现感知、预测与决策的统一，为通用人工智能的到来奠定坚实基础。</p>\n<p><strong>具身智能读书会</strong></p>\n<p>集智俱乐部联合上海交通大学助理教授李永露、银河通用机器人合伙人史雪松、南京大学LAMDA组博士生陈雄辉、香港大学在读博士生穆尧，共同发起首季「具身智能」读书会。读书会计划采用“自下而上”的层级结构，探讨四个核心模块：硬件系统（机器人本体设计），数据、仿真环境与Benchmark，机器人学习，具体场景任务。希望通过重点讨论经典、前沿的重要文献，帮助大家更好地学习机器人与具身智能技术前沿技术，为相关领域的研究和应用提供洞见。读书会已完结，现在报名可加入社群并解锁回放视频权限。</p>\n<p>https://pattern.swarma.org/study_group/58?from=wechat (二维码自动识别)</p>\n<p>详情请见：具身智能读书会启动：走向现实世界的下一代AI系统</p>\n<p>https://campus.swarma.org/vip (二维码自动识别)</p>"
    }
  ],
  "latest_overview": [
    {
      "title": "",
      "body_html": "<h1>【具身智能】2025~2026.3具身操作相关工作整理(2): 世界模型</h1>\n<ul>\n<li>来源平台: <strong>zhihu</strong>（知乎专栏文章）</li>\n<li>原文链接: <a href=\"https://zhuanlan.zhihu.com/p/2039024359751283170\">https://zhuanlan.zhihu.com/p/2039024359751283170</a></li>\n<li>作者: Mayer Zhu</li>\n</ul>\n<hr />\n<p>【具身智能】2025~2026.3具身操作相关工作整理(2): 世界模型</p>\n<h1>【具身智能】2025~2026.3具身操作相关工作整理(2): 世界模型</h1>\n<p>作者: Mayer Zhu, 赞: 34</p>\n<p>本文整理了2025年到2026年3月的VLA相关工作，世界模型、灵巧手相关工作也将陆续整理。</p>\n<p>另外也欢迎加入FluxVLA框架学习交流群。FluxVLA是专为具身智能打造的“一站式”VLA 工程平台，现已支持DreamZero，欢迎使用。</p>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//github.com/FluxVLA/FluxVLA\">https://github.com/FluxVLA/FluxVLA</a></p>\n<p>当前具身智能领域提到的World Model大致可以分为三种类型：</p>\n<ul>\n<li>Generation + Inverse Dynamics：先“想象未来”，再反推出“应该做什么动作”。即先预测未来的图像视频或与未来相关的latent feature，然后在此基础上输出action</li>\n<li>Action-conditioned Generation：给定当前状态 + action → 预测未来状态（通常是图像/latent）。本质是 forward dynamics model，可用于替代仿真器和真实场景，相比在真实世界中rollout效率更高，当然也可以直接在world model预训练模型的基础上微调出一个policy</li>\n<li>Joint Generate：联合建模 state + action，即同时预测未来帧和action，代表工作为DreamZero</li>\n</ul>\n<p>本文参考了：<a href=\"https://link.zhihu.com/?target=https%3A//itcanthink.substack.com/p/will-world-models-allow-robots-to\">https://itcanthink.substack.com/p/will-world-models-allow-robots-to</a></p>\n<h2>Generation + Inverse Dynamics</h2>\n<h2>LingBot VA</h2>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2601.21998\">https://arxiv.org/abs/2601.21998</a></p>\n<p><img alt=\"\" src=\"https://pica.zhimg.com/v2-b2eefa99cdf9ae83da3b815e0c81e0d0_1440w.jpg\" /></p>\n<p>LingBot-VA 把“未来视频想象”和“动作推断”放进同一个自回归扩散序列里联合建模。主要特色为：因果式 AR 建模、视频/动作共享但不混同的双流 MoT、以及能落地实时控制的闭环异步执行。</p>\n<h3>主要亮点</h3>\n<p><strong>把操作建模为“自回归视频-动作世界模型”：</strong>LingBot-VA 不是直接学 <code>obs -&gt; action</code> 的反应式 policy，而是先在 latent space 里预测未来视觉latent状态，再基于这些未来视觉状态做 inverse dynamics 式动作解码。即先做 visual dynamics prediction，再做 inverse dynamics；在模型实现上，视频 token 和动作 token 被交错进同一个自回归序列里，用同一个 unified AR diffusion 过程联合生成。</p>\n<p><strong>用因果式 autoregressive 替代 bidirectional / chunk-open-loop world model</strong><br />\n已有 video-action world model的大概问题：</p>\n<ul>\n<li>chunk/open-loop rollout，长段生成时缺少实时反馈；</li>\n<li>在 segment 内部用双向注意力，未来 token 会泄漏给过去 token，不符合物理世界因果性；</li>\n<li>还有一类 chunk-wise 生成没有持续历史缓存，长时程容易 drift。</li>\n</ul>\n<p>LingBot-VA 用严格因果 mask + KV cache 的 AR 生成来解决这几个问题：只看过去，不看未来；所有历史视频-动作轨迹都能被缓存；每一步都能插入真实环境反馈。</p>\n<p><strong>共享 latent space：</strong>LingBot-VA 使用<strong>dual-stream Mixture-of-Transformers (MoT)</strong>。视频流和动作流各有自己的 transformer block / QKV / FFN 参数，保留各自模态空间；但通过 cross-modal attention 和统一序列组织，两者又能相互条件化。也就是说是“共享上下文，不共享表示”。</p>\n<p><strong>两层推理提速（partial denoising + asynchronous execution）：</strong>视频扩散推理最大的瓶颈是视频 token 多、去噪步数也多。LingBot-VA 提出 <strong>Noisy History Augmentation</strong>：训练时故意给历史视频 latent 加噪，让动作头学会从“还没完全去噪干净”的视觉表征里也能读出动作相关信息。这样推理时视频不必从纯噪声一路去到全干净，只需要去到一个中间噪声水平，就能给动作分支足够的信息，论文说大致可把视频去噪步数减半。再往上，系统层面又做了异步预测-执行并行：机器人执行当前动作 chunk 的同时，模型在后台预测后续 chunk。</p>\n<p><strong>异步执行采用带 FDM-grounded feedback refresh：</strong>直接把异步执行和 AR cache 结合，容易把“上一步 hallucinated 的视频预测”继续沿用，导致越来越 open-loop。为此它在异步pipeline里加了一个 <strong>FDM-grounded step</strong>：拿到最近真实观测后，不是直接沿用旧预测，而是先用 forward dynamics 方式“基于真实反馈重想象”执行中动作的视觉后果，再把这个 feedback-grounded 的预测写回 cache。</p>\n<h3>模型与方法</h3>\n<p>LingBot-VA将机器人操作视为部分可观测的时序决策问题。和标准 VLA 不同，LingBot-VA 先基于历史z和<strong>历史动作</strong>以及语言指令预测未来的z，这里 <code>z</code> 是视频 latent； 然后再建模 inverse dynamics即再基于预测的未来z估计动作 。但并不是两个独立模型依次跑，而是把 noisy video chunk、condition video history、noisy action chunk、condition action history 拼成一个统一输入，在同一个 Transformer 里一起处理。</p>\n<p><strong>模型输入：</strong></p>\n<ul>\n<li>视觉输入先过 Wan2.2 causal VAE 压到 latent space。 backbone 初始化来自 Wan2.2-5B，tokenizer 也沿用 Wan2.2 causal VAE。多视角图像在latent层级上拼接：非 RoboTwin 情况下，多个 camera latent 沿宽度维拼接；RoboTwin 的 robotwin_tshape中，两个 wrist view 先横向拼，再与 top view 纵向拼，形成一个 T-shape 布局。目的和 DreamZero 里“把多相机拼成一张图”很像：避免为不同相机数专门改模型结构。</li>\n<li>动作先被对齐到统一维度，<code>action_dim=30</code>，缺失维度用 0 padding。使用一个线性层/轻量 MLP 投到和视频 token 同维度的 embedding， 并用线性层做动作 token embedding，输出侧用线性层解码回动作。</li>\n<li>任务指令使用冻结的 T5 text encoder 编码，并通过 cross-attention 注入。论文里说是 frozen T5；训练数据里每段 action segment 都会带 <code>action_text</code>，对应的 text embedding 预先存在 latent 文件里，训练时还会做 0.1 的 classifier-free text dropout。</li>\n</ul>\n<p><strong>网络结构：</strong></p>\n<p><img alt=\"\" src=\"https://pica.zhimg.com/v2-b52292270922b1943ba4e2bfb54999ac_1440w.jpg\" /></p>\n<p>双流 MoT backbone ：</p>\n<ul>\n<li><strong>video stream</strong>：初始化自 Wan2.2-5B，30 层 Transformer，24head*128。视频预测是按chunk为单位进行（一次性预测未来K帧），同一组video chunk可以互相attend，不同chunk之间是causal的attention</li>\n<li><strong>action stream</strong>：层数相同，但 hidden width 更小。动作流比视频流少很多参数，总共只额外增加约 350M 参数，整个模型约 5.3B。</li>\n</ul>\n<p>每层 block 里并不是一个简单 self-attention，而是video 和 action token 用各自 QKV 保持不同特征空间，action token 先线性映射到 video 维度参加 joint attention，再映回动作维度，通过 residual 保留动作专属表示：</p>\n<ul>\n<li>每个流各自有自己的 self-attention；</li>\n<li>再有一层 cross-attention；</li>\n<li>再过各自 FFN；</li>\n<li>时间噪声 embedding 通过 scale-shift / gate 的方式注入。</li>\n</ul>\n<p>unified sequence 的拼接顺序为： <code>[noisy video tokens] [clean/cond video history] [noisy action tokens] [clean/cond action history]</code>（这里排列顺序不代表attention关系，causal mask是单独生成的）。 然后再给整个序列加 RoPE、time embedding，并构造因果 mask。最后输出再切回视频部分和动作部分分别解码。<br />\n为了降低冗余，会把视频按时间下采样，再在每个视频帧之间插入多个 action token。例如：RoboTwin 原始视频是 50Hz 下采样到 12.5Hz，而动作仍保持 50Hz，所以每个视频帧对应 4 个原始控制步；推理时chunk size为4， 即一次视频预测对应 16 个action。推理时先跑 video denoise（不一定要完全去噪，因为训练时有带噪声的augmentation），再跑 action denoise，不是每个噪声步同步更新 video 和 action。</p>\n<p><strong>推理优化：</strong></p>\n<p><img alt=\"\" src=\"https://picx.zhimg.com/v2-c4d4f4f49182e2f075488ee26d956ecd_1440w.jpg\" /></p>\n<p>除了KV cache外，还采用了异步推理。即机器人在执行at时，模型同时在根据当前最新的观测预测at+1。但是直接用上一步预测的z作为condition会导致模型开环预测且不断漂移。为了解决这个问题，Lingbot VA引入Forward Dynamics Model(FDM)，即根据zt−1和at预测zt。在后训练中，loss会增加一项FDM预测loss</p>\n<h3>训练与数据</h3>\n<p><strong>阶段 1：统一视频-动作预训练</strong><br />\nLingBot-VA 基于 Wan2.2-5B 初始化视频流，VAE 也是 Wan2.2 causal VAE。<br />\n这一阶段联合优化两部分：</p>\n<ul>\n<li>视频 dynamics loss：预测视频 latent 的 flow / velocity；</li>\n<li>动作 inverse dynamics loss：基于当前与下一视觉状态预测动作。 论文写成 flow matching 目标，且历史视频可以做 noisy history augmentation。</li>\n</ul>\n<p>训练时把 episode 看成一个 interleaved video-action sequence，当前 token 只能看前面的 token。训练时 chunk size K是随机采样的，范围为[1,8]（推理时一般固定为4）；attention 窗口长度也随机。</p>\n<p>预训练数据来自 6 个来源：</p>\n<ul>\n<li>Agibot</li>\n<li>RoboMind</li>\n<li>InternData-A1</li>\n<li>OXE（使用 OpenVLA subset）</li>\n<li>UMI Data（排除 DexUMI）</li>\n<li>RoboCOIN。</li>\n</ul>\n<p>总规模约 16K 小时 机器人 manipulation 数据，跨多 embodiment、多环境、多任务，并包含部分内部采集数据。每个数据源按 90/10 切 train/val。训练时数据源均匀采样，总共训练 1.4T tokens。训练时提前抽取好 Wan2.2 VAE latents保存，而不是每次训练时从原始视频提取。</p>\n<p><strong>阶段 2：新平台/新任务的 post-training</strong></p>\n<p>换到新机器人平台需要少量 task-specific post-training，一般需要约50条数据。<br />\n这个阶段在不同 benchmark 上的setting不同：RoboTwin上使用27,500条数据， 视频从原始 50Hz 降到 12.5Hz，动作仍为 50Hz，微调50k step。LIBERO 上4个suite，每个suite 500条数据，微调5k step；真实世界六个任务每个都只采了 50 条 real-world demos ，微调500 step</p>\n<h2>DIT4DIT</h2>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/pdf/2603.10448v1\">https://arxiv.org/pdf/2603.10448v1</a></p>\n<p><img alt=\"\" src=\"https://pic3.zhimg.com/v2-44101d623a5992d9ec8028c802c36230_1440w.jpg\" /></p>\n<p>DiT4DiT 把机器人控制拆成两个互相耦合的生成问题：先用 Video DiT 预测未来视觉动态，再用 Action DiT 从这个“未来视觉想象”的中间特征里推断动作。DiT4DiT 是级联式、联合训练的 video→action 模型：训练时 video loss 和 action loss 同时优化；推理动作时，只从 Video DiT 的中间去噪过程抽 hidden feature，再让 Action DiT 预测动作。</p>\n<h3>主要亮点</h3>\n<p><strong>不依赖最终生成的视频，而是用中间去噪特征控制机器人。</strong> DiT4DiT 不是先完整生成一段未来视频，再把视频喂给动作模型。它在 Video DiT 的某个扩散时间步和某一层 transformer block 上挂 hook，抽取 hidden states 作为动作模型的条件。推理时，动作分支只需要一次 Video DiT feature extraction，再用少量 action denoising step 生成动作 chunk。这样可以避免两类问题：最终像素视频可能过度关注纹理细节；完整视频采样又太慢，不适合闭环控制。<br />\n<strong>双 DiT 结构：Video DiT 负责 dynamics，Action DiT 负责 inverse dynamics。</strong> Video DiT 初始化自 Cosmos-Predict2.5-2B，用 causal video VAE 把当前观测和未来帧压到 latent space，并用 Cosmos-Reason1 的语言 embedding 做条件。Action DiT 则改自 GR00T-N1 的 flow-matching action expert，接收 proprioceptive state、noisy action trajectory 和 Video DiT 抽出的视觉 hidden features，通过 cross-attention 预测动作流场。<br />\n<strong>asymmetric tri-timestep 设计。</strong> DiT4DiT 有三个不同的时间变量：video denoising timestep <code>τv</code>、feature extraction timestep <code>τf</code>、action denoising timestep <code>τa</code>。其中 <code>τv</code> 让视频模型完整学习从噪声到未来 latent 的 flow matching；<code>τf</code> 固定在一个适合抽特征的中间噪声水平；<code>τa</code> 用 Beta 分布采样，让动作模型更关注关键控制阶段。这个设计的重点是：视频模型、视觉特征、动作模型不强行共享同一个扩散时间，而是各自工作在最适合自己的噪声区间。</p>\n<h3>模型与方法</h3>\n<p>DiT4DiT 先从当前观测、语言指令预测未来视觉 latent 的动态，再让动作模型基于这些未来动态特征做 inverse dynamics。<br />\n<strong>Video DiT 部分</strong>使用 Cosmos-Predict2.5-2B 作为基础视频生成模型。输入图像先经过 causal video VAE 压成 latent；语言指令用 Cosmos-Reason1 的多层 text embeddings 表示；Video DiT 训练目标是 flow matching，即在不同噪声水平下预测未来视频 latent 的 velocity / flow。<br />\n<strong>Action DiT 部分</strong>是一个单独的 flow-matching transformer。它输入当前机器人状态、带噪声的未来动作轨迹、learnable future tokens，以及 Video DiT 抽出的中间视觉特征，默认抽取第 18 层。时间步通过 AdaLN 注入，视觉特征通过 cross-attention 注入，输出是动作空间里的 vector field，推理时通过数值积分从噪声动作逐步 denoise 到可执行动作。<br />\n<strong>联合训练目标</strong>由两部分组成：视频 flow loss 和动作 flow loss。训练时 text encoder 和 visual VAE 冻结，只更新 Video DiT / Action DiT 相关模块。</p>\n<h3>训练流程和数据</h3>\n<p><strong>模拟 benchmark 上的 DiT4DiT 训练</strong><br />\nLIBERO 使用官方 LIBERO 数据。论文正文按四个 suite 描述：Spatial、Object、Goal、Long，每个标准 suite 有 10 个任务和约 500 条 demonstration，共 1,693 episodes。<br />\nRoboCasa-GR1 使用 Fourier GR1 Unified 1K 数据集，共 24 个 household manipulation 任务，每个任务 1,000 条 demonstration，总计 24,000 episodes。机器人是 29-DoF GR1 humanoid，输入只用 ego-view camera，评估时每个任务 50 次 rollout，最大 horizon 为 720。<br />\n<strong>真实机器人的训练</strong><br />\n真实世界实验不是直接用 1,400 条真实数据从零开始训。先在 Fourier GR1 Pretrain 10K 上预训练，数据规模是 241,450 个模拟 GR1 episodes，action space 为 29-DoF。<br />\n预训练之后再在真机数据上训练。真实机器人阶段使用 Unitree G1 humanoid，双 7-DoF 手臂加 ALOHA2 gripper，总动作维度是 16-DoF；视觉输入来自第一视角 RGB 相机。作者采集了 7 个真实任务，每个任务 200 条 teleoperated demonstration，总计 1,400 episodes。</p>\n<h3>推理流程</h3>\n<p>DiT4DiT 的 action 推理依赖的是 video DiT 在固定/中间 denoising timestep 的 hidden features，不是最终解码出来的 clean future frames。因此Action DiT 的 conditioning “只需要一次 deterministic feature extraction step”，即采样一个新的 noise latent，在固定 feature-extraction timestep 对 video backbone 做一次 forward，并用 hook 拿中间激活；之后 Action DiT 再从 action noise 逐步积分得到动作。</p>\n<p>所以可以把推理流程理解成：</p>\n<ol>\n<li>当前图像 + 语言输入 video DiT。</li>\n<li>video DiT 不必完整去噪出 future video，只在固定 denoising timestep 做一次/少量 forward，hook 出中间 hidden representation。</li>\n<li>Action DiT 以这些 hidden features 和 proprioceptive state 为条件，从 action noise 开始迭代 denoise 出 action trajectory；这个迭代是 <strong>action diffusion</strong>，不是 future video 的完整 denoise。</li>\n</ol>\n<h2>——————————————————</h2>\n<h2>Action-conditioned Generation</h2>\n<h2>V-JEPA 2 Self-Supervised Video Models Enable Understanding, Prediction and Planning</h2>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/pdf/2506.09985\">https://arxiv.org/pdf/2506.09985</a></p>\n<p><img alt=\"\" src=\"https://pic2.zhimg.com/v2-73f8db945c103895092754f647755b73_1440w.jpg\" /></p>\n<p>这篇论文的目标做一个在表征空间里理解、预测、规划的世界模型。整体分成两步：</p>\n<p>第一阶段是 <strong>V-JEPA 2 预训练</strong>：在超过 100 万小时互联网视频和 100 万张图像上，学习一个 action-free 的视频表征与预测模型；训练目标是“给视频打 mask，然后在特征空间里预测被遮住的部分”。第二段是 <strong>V-JEPA 2-AC 后训练</strong>：冻结前面学到的视频编码器，只在其上训练一个小很多的动作条件预测器，让它根据当前视觉特征、动作和末端状态，预测下一时刻的表征；再把这个模型放进 MPC/CEM 规划回路里做机器人控制。</p>\n<ul>\n<li><strong>understanding</strong> 来自大规模自监督视频表征学习；</li>\n<li><strong>prediction</strong> 来自 JEPA 式 masked latent prediction；</li>\n<li><strong>planning</strong> 来自在该表征空间上再学一个 action-conditioned predictor</li>\n</ul>\n<h3>主要创新点</h3>\n<ol>\n<li>把“世界模型”重新落在表征空间，而不是像素生成空间：作者认为世界模型不一定要生成逼真的像素视频。V-JEPA 2 用 JEPA 的方式，只预测可预测的语义/动力学结构，而不是强迫模型还原所有像素细节。这点很关键，因为它直接解释了为什么后面机器人控制不是靠“生成未来视频再读动作”，而是靠latent dynamics + planning。</li>\n<li>V-JEPA 2-AC 用“冻结表征 + 小规模动作条件预测器”迁移到机器人任务上，通过实验大规模“观察世界”学到的表征，本身就可以成为规划的基础。</li>\n<li>Goal-conditioned World Model Planner： V-JEPA 2-AC 不是直接回归一个动作，而是给定当前观测和目标图像，在latent space里对一段动作序列做优化，优化目标是让 imagined future representation 靠近 goal representation</li>\n</ol>\n<h3>模型与方法</h3>\n<p><strong>V-JEPA 2 预训练模型</strong><br />\nV-JEPA 2 的预训练目标延续了 V-JEPA 思路： 给视频打 mask，丢掉一部分 patch/tubelet，只把剩余上下文送进 encoder； 然后把 encoder 输出与 learnable mask token 拼起来送进 predictor，让 predictor 去回归被 mask 部分在 <strong>EMA target encoder</strong> 表示空间里的目标特征。训练损失是对 mask 区域做的表示回归损失，训练时通过 stop-gradient 和 EMA teacher 来防止塌缩。这个训练目标本质上是“在表征空间做 mask denoising / masked latent prediction”。</p>\n<p>V-JEPA 2 预训练的模型架构类似 V-JEPA：</p>\n<ul>\n<li>一个 encoder 处理带 mask 的视频；</li>\n<li>一个 predictor 接收 encoder 输出和 mask token，预测被 mask 掉位置的目标表征；</li>\n<li>目标表征来自 EMA target encoder；</li>\n<li>原先 V-JEPA 里的绝对位置编码换成了 3D RoPE<strong>，</strong>做法是把特征维拆成时间、高度、宽度三段，分别做 1D rotary embedding，作者指出这能显著稳定大模型训练。视频 patchify 采用 tubelet 方式，<code>patch_size=16, tubelet_size=2</code></li>\n</ul>\n<p>encoder 规模从 ViT-L 300M、ViT-H 600M 到 ViT-g 1B；而 predictor 在预训练阶段始终保持较小，类似一个 ViT-small：</p>\n<ul>\n<li>ViT-L：300M，width 1024，depth 24，heads 16；</li>\n<li>ViT-H：600M，width 1280，depth 32，heads 16；</li>\n<li>ViT-g：1B，width 1408，depth 40，heads 22；</li>\n<li>predictor：22M，width 384，depth 12，heads 12。</li>\n</ul>\n<p><strong>V-JEPA 2-AC：动作条件世界模型</strong><br />\nV-JEPA 2-AC使用 V-JEPA 2 encoder 当作图像编码器，<strong>逐帧独立编码</strong> 4 秒视频片段。训练数据每个 clip 是 16 帧，4 fps，分辨率 256。每帧都伴随一个 7 维末端状态：3 维位置、3 维欧拉角、1 维 gripper state；动作定义为相邻帧之间 end-effector delta action，也是 7 维。</p>\n<p>V-JEPA 2-AC 的 predictor 是一个 <strong>300M transformer</strong>，24 层，16 头，hidden dim 1024，动作、末端状态、视觉 feature map 各自先过独立 affine 投到同一隐藏维，输出再映射回 encoder 的 embedding 维。predictor 使用 <strong>block-causal attention</strong>。每个时间步的视频 patch token 可以attend到：</p>\n<ul>\n<li>当前时刻和过去时刻的视频 patch；</li>\n<li>当前时刻和过去时刻的 action；</li>\n<li>当前时刻和过去时刻的 end-effector state。</li>\n</ul>\n<p>V-JEPA 2-AC 的loss包括：</p>\n<ul>\n<li><strong>teacher-forcing loss</strong>：给当前真值表征，预测下一时刻表征；</li>\n<li><strong>rollout loss</strong>：把模型自己的预测再喂回去，做短程自回归 rollout，减少测试时的误差累积。</li>\n</ul>\n<p>部署时，V-JEPA 2-AC 不直接输出动作，而是给定当前图像和目标图像后，先都编码成 latent representation，然后在规划时优化一个动作序列，使得世界模型 rollout 出来的未来 latent 尽量接近 goal latent，具体步骤为：</p>\n<ol>\n<li>编码当前观测和目标为latent representation；</li>\n<li>在一个固定 horizon 上采样候选动作序列；</li>\n<li>用 world model rollout 出 imagined future latent states；</li>\n<li>最小化 imagined latent 与 goal latent 的 L1 距离；</li>\n<li>用Cross-Entropy Method (CEM) 更新动作分布；</li>\n<li>执行最优序列的第一步，再重规划。</li>\n</ol>\n<h3>训练流程和数据</h3>\n<p><strong>阶段 1：V-JEPA 2 预训练（Phase 1）</strong></p>\n<p>学习一个强视频表征 encoder 和一个 masked feature predictor。输入：16 帧，256 分辨率，4 fps；patch size 16，tubelet size 2；训练时长：252K iterations。</p>\n<p>数据来源与规模：</p>\n<p>VideoMix22M / VM22M，总共 2200 万个 sample；为了做 image-video joint pretraining，ImageNet 图像会被时间复制成 16 帧“静态视频”。构成如下：</p>\n<ul>\n<li>SSv2：16.8 万视频，168 小时，采样权重0.056</li>\n<li>Kinetics：73.3 万视频，614 小时，采样权重0.188</li>\n<li>HowTo100M：110 万视频，13.4 万小时，采样权重0.318</li>\n<li>YT-Temporal-1B：1900 万视频，160 万小时，使用 retrieval-based curation，采样权重0.188</li>\n<li>ImageNet：100 万图像，采样权重0.250</li>\n</ul>\n<p><strong>阶段 2：cooldown / anneal（渐进式提升分辨率和时长）</strong></p>\n<p>预训练不是一直固定在 16 帧/256 上。完整 recipe 是：</p>\n<ul>\n<li>warmup 阶段：16 帧、256 分辨率；</li>\n<li>constant phase：继续在这个设置上长时间训练；</li>\n<li>cooldown phase：把 clip length 提升到 <strong>64 帧</strong>、分辨率提升到 <strong>384</strong>，同时线性衰减学习率。 论文里给的代表性 ViT-g 训练是：总共 <strong>252K iterations</strong>，其中前 <strong>240K</strong> 左右在 16 帧/256 上，最后 <strong>12K</strong> 左右做 cooldown；这套 progressive strategy 带来明显收益，并把 full high-res long-clip 训练的计算代价压低了很多。表 14 也显示，ViT-g 从 phase 1 到 phase 2（尤其是 384 分辨率 cooldown）会继续涨一截。</li>\n</ul>\n<p>目标是在更小学习率下，把模型迁移到更长时长、更高分辨率的输入，提升时空建模能力。<br />\n训练数据仍然是 Phase 1 的视频/图像混合预训练数据。代码中的 cooldown config 与 pretrain config 使用同一组数据源。输入为64 帧&amp;256 分辨率或64 帧&amp;384 分辨率。</p>\n<p><strong>阶段 3：V-JEPA 2-AC 机器人后训练</strong><br />\n此阶段冻结 V-JEPA 2 encoder，仅训练动作条件 predictor。</p>\n<p>数据来自 raw Droid dataset；只用原始视频和末端状态，共计23k条轨迹，包括成功和失败，不用 reward、任务标签、是否成功等额外监督</p>\n<p>数据处理流程为：256分辨率，只用左外参相机视角。每次采样 4 秒 clip，以 4 fps 采样，得到 16 帧；为了简化训练，丢弃短于 4 秒的视频；最终保留下来不足 62 小时 的训练数据。开源代码 post-training config 使用了较短上下文或 release-time 的精简 recipe采用8帧的版本，而论文主实验使用的是 16-frame clip 的设定。</p>\n<h2>Dreamer 4</h2>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/pdf/2509.24527\">https://arxiv.org/pdf/2509.24527</a></p>\n<p><img alt=\"\" src=\"https://pica.zhimg.com/v2-41ecc99ee1ef58b008651bdd911f8ba2_1440w.jpg\" /></p>\n<p>用一个可实时交互的世界模型，在完全离线数据上训练policy，并在世界模型内部通过 imagination RL 继续提升。</p>\n<h3>主要创新点</h3>\n<ol>\n<li><strong>把“可扩展视频世界模型”和 Dreamer 式 imagination training 接起来：</strong> Genie / Oasis / Lucid 这类 interactive video model 虽然更可扩展，但通常还不能准确模拟复杂 object interaction，也很难直接拿来训练 agent。Dreamer 4 的核心贡献是把两者合起来：先训练一个大容量、可交互的 world model，再把 policy / reward / value heads 插入同一个 transformer，最后在 imagined rollouts 上做强化学习。</li>\n<li><strong>提出 shortcut forcing，让世界模型可以用很少 denoising step 做实时逐帧生成：</strong> Dreamer 4 的 dynamics 不是普通 autoregressive next-token prediction，也不是常规多步 diffusion video model，而是结合了 diffusion forcing 和 shortcut models。模型在每个时间步接收不同的 noise level <code>τ</code> 和 shortcut step size <code>d</code>，Shortcut model 则专门训练网络适配不同 step size，允许推理时选择 step size，并用很少的step就能得到最终的输出</li>\n<li><strong>从 v-prediction 改成 x-prediction，并在 x-space 里算 loss，用于解决长 rollout 误差累积：</strong> 普通 diffusion / flow matching 常见做法是预测 velocity，但作者认为这会让网络输出更高频（如视频生成中需要拟合局部方向、纹理差异、边界变化、噪声抵消项），逐帧 rollout 时容易产生细微误差并累积。Dreamer 4 对于最小步长使用标准的flow matching loss，对于更长的步长则不直接输出 velocity，而是让网络输出 clean tokenizer representation，如果是推理则再根据clean的预测转换为 velocity。</li>\n<li><strong>设计了适合实时 world model 的 efficient block-causal transformer。</strong> Dreamer 4 的 tokenizer 和 dynamics 都使用 block-causal transformer。为了兼顾长上下文、视频质量和交互速度，作者用了几类关键工程/架构设计：space-only 和 time-only attention 分解、每 4 层才做一次 temporal attention、GQA 减少 KV cache、register tokens 改善 temporal consistency、训练时交替 short batch / long batch，最后再用 long batch finetune。最终在 2B 参数规模下仍能维持 Minecraft 20 FPS 量级的交互速度。</li>\n</ol>\n<h3>模型与方法</h3>\n<p>Dreamer 4 整体由两个核心模块组成：<strong>causal tokenizer</strong> 和 <strong>interactive dynamics model</strong>。训练成 agent 之后，又在 dynamics transformer 中插入 <strong>agent/task tokens</strong>，用于预测 action、reward、value。</p>\n<p><strong>Causal Tokenizer</strong></p>\n<p>Tokenizer 的作用是把 raw video frame 压缩成连续 latent representation，供 dynamics model 预测。注意tokenizer 是 causal in time 的。在Minecraft 实验中是400M的模型。<br />\n它是一个 encoder-decoder 结构。输入为当前图像的 patch tokens （以及作为mask的 learnable latent tokens）；经过encoder 后从得到latent tokens；decoder 再把 latent tokens投回 model dimension，并和 learnable tokens 拼接后重建图像。patch训练目标是 MSE reconstruction + 0.2×LPIPS。</p>\n<p>为了让 tokenizer 的表征更适合后续 dynamics 生成，训练时还做 masked autoencoding：每张图的 patch dropout 概率随机采样，被 drop 的 patch 用 learned embedding 替代，这样可以改善 dynamics 生成视频的空间一致性。</p>\n<p><strong>Interactive Dynamics Model</strong></p>\n<p>Dynamics model 在 tokenizer latent 上建模未来。输入序列是交错的：action tokens、shortcut noise level token、step size token、corrupted representation tokens、register tokens。在Minecraft 实验中是1.6B的模型。</p>\n<p>输入的representation 先线性投影成 <code>Sz</code> 个 spatial tokens，再拼接 <code>Sr</code> 个 learned register tokens，以及一个包含 shortcut signal level <code>τ</code> 和 step size <code>d</code> 的 token。<br />\n动作可以包含多种 component。Minecraft 中键盘被表示成 23 个 binary distributions，鼠标动作按 VPT 的 foveated / μ-law discretization 处理成 121 类 categorical variable。对于 continuous action，模型用线性投影；对于 categorical / binary action，模型用 embedding lookup。没有 action label 的视频则用一个 learned action embedding 代替。</p>\n<p>Dreamer 4 的 transformer 是 2D transformer，有 time 和 space 两个维度。attention 是 block-causal：同一时间步内的 token 可以互相 attend，也可以 attend 到过去时间步，但不能看未来。基础模块使用 pre-layer RMSNorm、RoPE、SwiGLU，并用 QKNorm 和 attention logit soft capping 增强大模型训练稳定性。</p>\n<p>为了让 2B 参数模型能实时交互，作者做了几项效率设计：</p>\n<ul>\n<li>把 dense video attention 拆成 space-only 和 time-only attention；</li>\n<li>只每 4 层做一次 temporal attention；</li>\n<li>dynamics 中使用 GQA，减少 KV cache；</li>\n<li>训练时交替 short batch 和 occasional long batch，最后只用 long batch finetune；</li>\n<li>增加 spatial tokens 来提升复杂 interaction 的视觉质量。</li>\n</ul>\n<p><strong>policy / reward</strong></p>\n<p>World model 预训练后，作者把它改造成 agent。做法不是额外接一个独立 policy 网络，而是在 dynamics transformer 里插入 <strong>agent tokens</strong> 作为额外 modality。Agent tokens 接收 task embedding，然后用小 MLP heads 预测 policy 和 reward。agent tokens 可以 attend 到自己和其他 modality，但其他 modality 不能 attend 回 agent tokens。</p>\n<h3>训练流程和数据</h3>\n<p>训练流程分成三步：world model pretraining、agent finetuning、imagination training。</p>\n<p><strong>阶段 1：World Model Pretraining</strong></p>\n<p>这一阶段训练 tokenizer 和 dynamics model。Tokenizer 在视频上用 masked autoencoding + reconstruction 训练；dynamics model 在 tokenized videos 上训练，视频可以有 action，也可以没有 action。</p>\n<p>训练数据是 OpenAI VPT contractor gameplay dataset 的 subsets 6–10，总共 2541 小时，90% 训练、10% evaluation，确保 train/eval 不共享同一个 5 分钟 recording chunk。数据是 360×640、20 FPS，并包含 mouse/keyboard action 和 event annotations。</p>\n<p>模型训练目标为 <strong>shortcut forcing</strong>。形式上，模型接收带噪声的latent ，以及每个时间步的 <code>τ, d, action</code>，预测 clean latent <code>z1</code>。如果 <code>d=d_min</code>，就是普通 flow matching / denoising loss；如果 <code>d&gt;d_min</code>，则用两个半步预测 bootstrap 出一个目标，训练模型直接走更大的 shortcut step。这样推理时可以指定 <code>d=1/4</code>，每帧只做 4 个 denoising step。和常规 shortcut model 不同，Dreamer 4 不让网络直接预测 velocity，而是预测 clean representation，也就是 x-prediction。因为长视频是逐帧 rollout 的，v-prediction 的高频误差容易在时间上累积；x-space 的目标更结构化，更适合长 rollout。</p>\n<p>在 world model 预训练里，作者还把 batch 中 30% 的视频当成独立图片处理，用来改善无 context 起始帧生成能力。这个阶段的数据来源仍是同一批 VPT 视频；对于缺少 action label 的样本，模型用 learned action embedding 代替动作输入。  </p>\n<p><strong>阶段 2：Agent Finetuning</strong></p>\n<p>这一阶段在 pretrained world model 上插入 task/agent tokens，训练 task-conditioned policy 和 reward heads，同时继续保留 video prediction loss。数据仍来自 VPT contractor dataset，只是使用其中的 event annotations 构造 20 个 Minecraft 子任务和 sparse binary rewards，例如 mine_log、craft_planks、craft_stone_pickaxe、mine_diamond 等。</p>\n<p>Agent finetuning 阶段的监督包括 policy behavioral cloning 和 reward model。给定视频 latent、action、task、reward，模型用 task output embedding <code>h_t</code> 做 multi-token prediction，MTP 长度 <code>L=8</code>，同时预测未来多个 action 和 reward。Reward head 用 Dreamer 3 里的 symexp twohot 输出；policy head 则根据 action space 用 categorical 或 vectorized binary distribution。为了保持 world model 原有能力，agent finetuning 阶段仍继续使用 noisy representation 和 video prediction loss。</p>\n<p>为了增强稀疏任务信号，作者使用 50% uniform sequences + 50% relevant sequences 的数据混合。Relevant sequences 是完成某个任务的片段；BC loss 只加在 relevant fraction 上，dynamics loss 只加在 uniform fraction 上，以避免 world model 产生过度乐观的 imagined future。  </p>\n<p><strong>阶段 3：Imagination Training</strong></p>\n<p>为了继续提升模型能力，Dreamer 4 在 world model 里做 on-policy RL，但整个过程没有真实环境交互。它初始化一个 value head，并保留一份 frozen policy head 作为 behavioral prior；imagination training 时只更新 policy 和 value heads，transformer 主体保持冻结。</p>\n<p>Imagined rollouts 从之前训练数据中的 context 开始。模型 rollout 时同时从 flow head 采样未来 representation <code>z_t</code>，从 policy head 采样 action <code>a_t</code>，再用 reward head 给 imagined trajectory 标注 reward，用 value head 估计 value。Value head 用 TD-learning 学习 λ-return。Policy 用 PMPO训练：只看 advantage 的符号，不依赖 advantage的大小，因此不需要复杂的 return / advantage normalization；同时加上到 behavioral prior 的 KL，约束 policy 不要跑出合理行为空间。</p>\n<h2>Genie: Generative Interactive Environments</h2>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/pdf/2402.15391v1\">https://arxiv.org/pdf/2402.15391v1</a> <a href=\"https://link.zhihu.com/?target=https%3A//deepmind.google/models/genie/\">Genie 3</a></p>\n<p><img alt=\"\" src=\"https://pic4.zhimg.com/v2-8ebd533d7974372f6267979e8940e49f_1440w.jpg\" /></p>\n<p>Genie 系列的主线是从视频中学出可交互的世界模型。</p>\n<ul>\n<li>v1主要侧重：只有视频，没有动作标签，能不能学出可以交互操控的环境。即输入图像/视频 prompt，用户输入离散latent action，模型输出未来帧的预测。</li>\n<li>v2 主要侧重：能不能从一张图生成可交互操控的 3D 世界。即输入单帧图片prompt，得到一个可以用键盘鼠标控制的3D世界</li>\n<li>v3 主要侧重：能不能从文本生成一个实时、720p、可交互并能保持分钟级一致性的世界。即输入文本prompt，输出分钟级视频</li>\n</ul>\n<h3>主要创新点</h3>\n<p>Genie v1 的创新点在于从 action-free 视频中学习“可控动作空间”，算是很早期使用<strong>latent action</strong>的工作。它提出了一个强假设：如果一个视频序列来自人类/智能体与环境的交互，那么相邻帧之间的变化可以被某种离散 latent action 解释。 因此模型不需要数据集中有手柄按键、键盘输入或机器人动作标签，而是通过 Latent Action Model 从视频中反推出动作。这些 latent action 在不同 prompt 上具有相对一致的语义，因此用户可以像学习一个新游戏手柄一样，尝试几次后掌握每个 action 的效果。</p>\n<p>Genie v1 的 tokenizer、latent action model 和 dynamics model 都使用了类似 ST-transformer 的结构。ST-transformer 把 attention 拆成 spatial attention 和 temporal attention：先在同一帧内部做空间注意力，再跨时间做 causal temporal attention。这样比直接对所有时空 token 做全局 attention 更省，因为空间 attention 对帧数是线性增长，而不是二次增长。</p>\n<h3>模型与方法</h3>\n<p>Genie v1 是一个 <strong>11B 参数的生成式交互环境模型</strong>，只用未标注互联网视频训练，不需要真实动作标签。由三部分组成：<strong>spatiotemporal video tokenizer、latent action model、autoregressive dynamics model</strong>。</p>\n<p><strong>Video Tokenizer</strong>：把原始视频帧编码成离散 token，供后面的 transformer 在 token 空间建模。Genie使用的是基于 ST-transformer 的 VQ-VAE tokenizer。相比普通逐帧图像 tokenizer，它的 encoder / decoder 都看视频上下文，因此每个 token 不只是单帧压缩结果，也包含一定时间动态信息。论文中使用的是16-frame context，对应1.6秒的视频序列</p>\n<p><strong>Latent Action Model, LAM</strong>：给定视频序列中的过去帧和下一帧，编码器推断一个离散 latent action；然后 decoder 尝试用这个 latent action 重建下一帧。训练目标类似 VQ-VAE：既要 reconstruction，也要把连续表示量化到一个小的离散 codebook。</p>\n<ul>\n<li>Genie 设置 latent action数量为8，因为对 2D 平台游戏比较合理，可以覆盖向左、向右、跳跃、停止、组合动作等模式，但具体语义不是人工规定，而是模型自己从视频中学出来。</li>\n<li>训练完之后，LAM 在推理阶段大部分被丢弃，只保留其 VQ codebook。也就是说，推理时用户直接选择一个 action code，dynamics model 使用这个 code 作为动作条件。LAM 主要用于训练阶段自动给 action-free 视频打上 latent action 标签。</li>\n<li>作者还对LAM 的输入应该是原始像素，还是 tokenizer 后的 video tokens进行了对比实验，发现 pixel-input LAM 更好，尤其是机器人数据上差距很大，可能是因为tokenizer 压缩后可能丢掉对动作推断有用的细微信息，而 pixel-level LAM 能更直接看到物体运动和交互痕迹。</li>\n</ul>\n<p><strong>Dynamics Model</strong>： 10.1B的 decoder-only MaskGIT-style transformer，输入是：</p>\n<ul>\n<li>过去的 video tokens；</li>\n<li>对应时间步的 latent action； action 作为 additive embedding 加到视频 token 上，比其他 action conditioning 方式更有利于 controllability。</li>\n<li>当前需要预测的下一帧 token mask。</li>\n</ul>\n<p>输出是下一帧离散 video tokens 的分布，用 cross-entropy 训练。</p>\n<h3>训练和数据</h3>\n<p>Genie v1 的数据来自公开视频平台上的 2D platformer 游戏视频。数据构建流程大致是：</p>\n<ol>\n<li>用关键词初筛视频标题，比如包含 2D platformer 相关词；</li>\n<li>进一步要求标题/描述中包含 speedrun、playthrough 等动作型词；</li>\n<li>排除 movie、unboxing 等不太像游戏操作视频的内容；</li>\n<li>把视频切成 16 秒 clip，10 FPS，得到每个 clip 160 帧；</li>\n<li>初始数据约 55M clips，约 244K 小时；</li>\n<li>人工标注约 10K 个视频片段，耗时约 10 小时；</li>\n<li>用这些标签训练一个 11M 参数 ResNet18 分类器；</li>\n<li>根据分类器分数过滤，得到最终 6.8M clips，也就是超过 30K 小时的 curated platformer dataset。</li>\n</ol>\n<p>论文训练时分两大阶段：先训练 tokenizer，然后固定 tokenizer，联合训练 LAM 和 dynamics。</p>\n<p><strong>阶段 1：训练 video tokenizer：</strong>单独训练 tokenizer，让它能把视频帧压缩成离散 tokens 并重建。 输入16-frame sequences，帧率：10 FPS，分辨率：160×90， codebook：1024 codes</p>\n<p><strong>阶段 2：联合训练 LAM 和 dynamics：</strong>固定或使用已训练好的 tokenizer，然后联合训练LAM and dynamics。<br />\nLAM 的 latent action 会通过 stop-gradient 进入 dynamics，即 dynamics 学会使用 LAM 产生的离散动作，但不会直接反向破坏 LAM 的动作编码。</p>\n<p><strong>阶段 3：规模扩展到 10B dynamics</strong> 论文先训练了一系列 dynamics model，从 41M 到 2.7B 参数，统一用 batch size 256、200K steps。模型尺寸越大，FVD 越好，并呈现比较稳定的 scaling trend。之后最终模型扩到 10.1B dynamics，使用 batch size 512、125K steps、256 TPU v5 训练。<br />\n除了平台游戏，论文还做了机器人 action-free world model 实验。数据来自 RT-1 相关机器人数据，包括真实机器人 episodes 和模拟数据，但训练 Genie 时不使用动作标签，只用视频。论文提到机器人数据包含 209K条轨迹</p>\n<h3>Genie 2 和 Genie 3</h3>\n<p>这两个模型发布的具体细节较少。</p>\n<p>Genie 2 是 v1 从 2D 平台游戏向 3D 世界的扩展：它可以从<strong>单张 prompt image</strong> 生成一个 action-controllable、可玩的 3D 环境，用户可以用键盘和鼠标逐步控制。v2 可以生成一致的世界最长约一分钟，相比 v1 的短序列 2D 预测，v2 的难点在于 3D 场景中相机运动、物体位置、地形结构和遮挡关系需要保持一致。  </p>\n<p>Genie 2 的模型架构是一个 autoregressive latent diffusion world model。 它先用 autoencoder 把视频帧编码成 latent frames，然后用一个 large transformer dynamics model 在 latent 空间中做自回归预测。这个 dynamics model 使用 causal mask，形式上类似 LLM：每一步根据过去 latent frames 和当前 action 预测下一帧 latent。最后再通过 decoder 还原视频帧。  </p>\n<p>Genie 3可以从文本 prompt 生成动态世界，可生成 720p、20–24 FPS 的世界，交互一致性可持续数分钟，并具有约一分钟的视觉记忆。v3 的技术难点在于：自回归生成的轨迹会越来越长，模型需要记住很久以前生成过的内容。如果用户一分钟后回到某个地点，模型需要回忆起那里的细节；而实时交互要求这种长程依赖每秒处理多次。</p>\n<h2>RISE: Self-Improving Robot Policy with Compositional World Model</h2>\n<p><img alt=\"\" src=\"https://picx.zhimg.com/v2-107268cb310e8eaea4478e935020e37b_1440w.jpg\" /></p>\n<p>RISE 的核心想法是把 RL 的“环境”从仿真器或真实世界搬到一个学出来的World Model 里。世界模型先根据动作生成未来多视角图像，再由 value model 给这些 imagined states 打分；这些分数被转成 advantage，用来继续训练策略。</p>\n<h3>主要亮点</h3>\n<p>第一，<strong>把真实机器人 RL 的交互搬到 imagination space</strong>。传统真实世界 RL 的瓶颈在于机器人执行慢、reset 难、危险高、样本吞吐低。RISE 让策略从离线数据中的状态出发，在学出来的世界模型中连续 rollout，生成新的 online actions 和 online states，再用这些 imagined rollouts 更新策略。 RECAP、DSRL、PPO、DAgger 等方法要么主要依赖离线样本，要么需要真实交互，要么只在 diffusion latent/noise 上做有限调整；RISE 则用世界模型构造新的状态分布和动作评价。</p>\n<p>第二，<strong>提出 Compositional World Model：把未来状态生成和价值评估拆成两个模型</strong>。RISE 没有训练一个端到端“视频+reward”统一模型，而是拆成：<br />\nDynamics Model：输入当前多视角历史观测和候选 action chunk，生成未来多视角视频状态。<br />\nProgress Value Model：输入多视角图像和语言任务，输出一个 progress/value 标量，用来评价 imagined state 离成功还有多近。<br />\n两个子问题可以用最适合自己的架构和目标来训练：视频生成用高效 video diffusion / flow matching backbone，value 估计则从 VLA policy backbone 初始化。</p>\n<p>第三，<strong>不等世界模型预测到结束再给 reward，而是用 chunk-wise advantage 提供中间学习信号</strong>。很多 model-based RL 方案的问题是：如果 reward 只在最后成功/失败时才出现，世界模型必须 rollout 到很远的终局，这对视频生成模型很不可靠。RISE 的 value model 对每个 imagined future observation 都打 value，然后把未来每一帧相对初始帧的 value improvement 聚合成 action chunk 的 advantage。这样，机器人不用“想象完整任务结束”，只要想象短 horizon 内动作是否推动了进展。</p>\n<p>第四，<strong>针对机器人 action controllability 改造视频生成模型</strong>。RISE 的 dynamics model 初始化自 Genie Envisioner GE-base；该模型本身继承 LTX-Video 的高效视频生成结构。RISE 在此基础上加入轻量 action encoder，并用 Galaxea 和 AgiBot World 这类带动作标注的大规模机器人数据做预训练，让文本条件视频模型变成 action-conditioned dynamics model。</p>\n<p>第五，<strong>Task-Centric Batching</strong>。异构机器人数据有很多任务、场景、视角和动作模式。如果每个 batch 过度混杂不同任务，模型容易学到视觉上合理但动作不敏感的平均动态。RISE 的做法是让每个 batch 只覆盖少量任务，但在同一任务下采更多不同动作样本。直观上，它牺牲 batch 内场景多样性，换取“同一场景下不同动作导致不同未来”的可辨识性，从而提升 action controllability。</p>\n<p>第六，<strong>value model 同时用 progress regression 和 TD learning</strong>。单纯按时间进度训练 value，能得到一个平滑、稠密的 progress signal，但容易把失败轨迹也当作“时间往后就是更接近成功”；单纯 TD learning 又更敏感但数值更不稳。RISE 先用 progress estimate warm start，再加入 TD learning，让 value model 一方面知道任务的阶段性进展，另一方面能区分成功和失败、抓住错抓、错放、卡住、未闭合这类视觉上很细微但任务上致命的失败。</p>\n<h3>模型与方法</h3>\n<p>RISE 主要由三个模块组成：</p>\n<ul>\n<li><strong>policy</strong>。策略模型初始化自预训练VLA模型如Pi05 。输入为多视角图像、语言指令和 advantage condition，输出一个 action chunk。</li>\n<li>\n<p><strong>Compositional World Model</strong>，由Dynamics Model和Value Model两个独立的模块组成：</p>\n</li>\n<li>\n<p><strong>Controllable Dynamics Model</strong>：从 GE-base (LTX-Video架构)初始化。模型原本更偏文本条件视频生成；RISE 给它加入轻量 action encoder，然后在大规模 action-labeled robot datasets 上训练。输入当前 3 个视角的 RGB observation，以及未来 action chunk，输出未来 25 帧多视角图像。预训练采样频率 30 Hz，任务 fine-tune 采样频率 15 Hz；训练目标是 flow matching。</p>\n</li>\n<li><strong>Progress Value Model：</strong>它从预训练 VLA 初始化，因为 VLA 已经在机器人数据上学过多视角输入和任务语义，因此比通用单视角 VLM 更适合作为 value backbone。输入1 帧3视角 observation（没有action输入），输出 value/progress。训练时先只用 progress estimate loss，再联合 TD learning loss；训练完成后冻结，在 policy self-improving loop 中专门负责给 imagined state 估值。</li>\n</ul>\n<p><strong>Compositional World Model 怎么算 advantage</strong></p>\n<p>给定当前多视角观测历史、文本指令和policy输出的 action chunk，dynamics model 先生成未来 observation 序列。然后 value model 对这些 imagined observations 逐帧打分。RISE 不直接把 value 当 reward，而是计算“未来状态相对初始状态的 value improvement”。如果动作让 imagined future 更接近成功，advantage 就高；如果动作导致失败，比如把蓝色积木放进黄色箱子、夹爪没抓住衣服、盒盖卡住，value curve 会下降，advantage 就低。论文中这个 advantage 会被离散化成 uniform bins，作为 policy 的条件输入。</p>\n<p>policy类似pi0.6*的思路学“给定 advantage 条件下应该生成什么动作”。这样训练时既能看到高 advantage 的成功动作，也能看到低 advantage 的失败动作。推理或 rollout 时，系统给 rollout policy 一个 optimal advantage prompt，让它倾向于产生高回报动作；随后再用 world model 真实评估这个动作到底有没有带来进展。</p>\n<p><strong>Self-improving loop</strong></p>\n<p>RISE 的 self-improving loop 分成 rollout stage 和 training stage。<br />\nRollout stage 从 warm-up 离线数据里采一个初始状态。rollout policy 在 optimal advantage 条件下生成 action chunk；dynamics model 根据 action chunk 生成未来多视角状态；value model 给这些 imagined states 估值，得到 evaluated advantage。为了扩大状态覆盖，RISE 会把 imagined state 继续作为下一步 rollout 的输入，但最多连续进行两次，因为视频生成世界模型仍然有误差累积问题。rollout policy 的参数用 behavior policy 的 EMA 更新。</p>\n<p>Training stage 把这些 imagined online rollouts 和一部分 offline labeled data 混在一起，继续优化 behavior policy。混合配比需要平衡：如果 online imagined data 占比太高，policy 会忘掉真实数据里的行为分布；如果 offline data 占比太高，又会被旧分布过度约束，探索不到更好的动作。</p>\n<h3>训练和数据</h3>\n<p><strong>准备工作1：Dynamics Model 训练</strong><br />\n分为预训练和下游任务finetune两部分。<br />\n预训练阶段在大规模 action-labeled robot datasets 上训练，使它在看到不同 action chunk 时能生成不同、且物理上相符的未来多视角视频。此外还采用Task-Centric Batching提高训练稳定性并防止异构机器人数据降低收敛速。所用的数据是 Galaxea Open World Dataset 和 AgiBot World Alpha。pre-train 120k steps，global batch size 512，16 张 NVIDIA H100，约 7 天；输入/预测帧数为 4 / 25，视角数为 3，预训练采样频率为 30 Hz，视频预先resize 到 256×192。<br />\nfinetune阶段是在具体的某个下游任务中具体相机布局、具体机器人、具体物体材质和具体任务分布。</p>\n<p>数据来源是每个目标任务的 offline data。world model 和 policy 共享同一套 task-specific offline data，包括专家示教数据、rollout的成功失败数据。任务数据量根据任务不同：Dynamic Brick Sorting 有 3063 条 human demonstration 和 610 条 policy rollout；Backpack Packing 有 2478 条 human demonstration 和 507 条 policy rollout；Box Closing 有 2286 条 human demonstration、524 条 policy rollout，以及 540 条 DAgger human correction。</p>\n<p>训练量方面，dynamics fine-tune 为 50k steps，global batch size 64，8 张 H100，约 3 天；采样频率为 15 Hz。训练目标仍然是 flow matching。</p>\n<p><strong>准备工作2：Value Model 训练</strong><br />\n该阶段训练一个能给多视角机器人状态打分的 progress/value model。它不是看动作本身，而是看 observation 和任务指令，判断当前视觉状态距离成功有多近。训练时从预训练 VLA 初始化，</p>\n<p>数据来源同样是 task-specific offline data，包括成功 demonstration 和失败 rollout。训练分两段：前 10k steps 只用 progress estimate loss，让模型先学到任务阶段的单调进展；后 40k steps 加入 TD learning loss，让它能识别失败和回退。总训练 50k steps，batch size 64，8 GPUs，约 1 天。</p>\n<p><strong>准备工作3：Policy warm-up</strong></p>\n<p>该阶段通过类似RECAP的训练方式训练policy，目标是先让策略落在“物理上合理”的行为分布里。直接从一个还没适配目标任务的 policy 开始在 imagination 中探索，容易生成胡乱动作；所以 RISE 先在真实离线数据上 warm-up policy，让它学会基本任务行为，同时具备 advantage conditioning 能力。</p>\n<p>数据来源包括专家示教数据、rollout的成功失败数据以及人类干预数据。这里有一个与 RECAP 不同的实现细节：RISE 不对所有 offline 数据都用 learned advantage 标注。论文提到，对 expert data 和 rollout data 都标 learned advantage 效果反而差；最终做法是只给 policy rollout 数据分配 learned advantages，而 expert demonstrations 和 human correction 数据直接配最高/最优 advantage。此外RISE 把 advantage 离散成 10 个 uniform bins，而不是 RECAP 的 binary bins。</p>\n<p>训练量方面，policy warm-up 使用 global batch size 64，8 GPUs；后续 self-improving 阶段约 10k steps。</p>\n<p><strong>在World Model中自我迭代：Self Improving with World Model</strong></p>\n<p><img alt=\"\" src=\"https://pic2.zhimg.com/v2-799f2c10aba1972874537d5f931ccf5b_1440w.jpg\" /></p>\n<p>目标是真正让 policy 通过 imagined on-policy rollouts 自我提升。训练过程中，policy 从 offline state 出发，在 world model 中生成动作和未来状态；value model 估算 evaluated advantage；policy 再用这些 imagined samples 更新。</p>\n<p>数据来源有两类：一类是世界模型新生成的 imagined online rollout data，另一类是混入 batch 的 offline labeled data。</p>\n<p><img alt=\"\" src=\"https://picx.zhimg.com/v2-9810db77fb593134fcb3fc67f4f2a3b3_1440w.jpg\" /></p>\n<h3>主要实验结论</h3>\n<ul>\n<li>world model 能提供足够有用的 on-policy training distribution 和 advantage signal，PPO、DSRL 这类直接在真实/近真实数据上做后训练的方法出现不稳定甚至退化；RECAP由于主要依赖固定离线数据，提升有限。RISE 的优势来自 imagined online actions + imagined online states 共同扩展了训练分布。世界模型把动作推进到新的视觉状态，让 policy 看到离线数据里没有覆盖的中间状态、失败状态和恢复状态。RISE 用 dynamics model 把它们“想象”出来，使本来要靠硬件试错才能得到的数据可以通过“想象”得到。</li>\n<li>offline data ratio 不能太低也不能太高： self-improving 阶段混入 offline data 的比例存在最佳区间。offline ratio 0.1 时，模型几乎被 imagined online distribution 拖走，complete success 只有 5%、score 1.35；ratio 0.3 时提升到 25%、score 7.03；ratio 0.6 时达到最好，complete success 50%、score 8.32；ratio 0.9 时又下降到 30%、score 7.90。论文解释为：offline 太少会 catastrophic forgetting，offline 太多则过度约束在旧行为分布，阻止 policy 从 imagined rollout 中发现更优动作。</li>\n<li>论文中也提到了RISE的不足：world model 在罕见状态、欠覆盖场景里仍可能生成物理上不合理的 transition；虽然 compositional design 改善了 controllability 和一致性，但它不是严格物理仿真。其次，RISE 仍然需要不少真实离线数据来 anchor learning procedure，并没有完全摆脱真实数据采集。第三，高保真 dynamics model 和 value model 训练本身很耗算力，论文给出的 dynamics pretrain 就是 16 张 H100 训练约 7 天，task fine-tune 也需要 8 张 H100 约 3 天。</li>\n</ul>\n<h2>——————————————————</h2>\n<h2>Joint Generate</h2>\n<h2>DreamZero: World Action Models are Zero-shot Policies</h2>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/pdf/2602.15922\">https://arxiv.org/pdf/2602.15922</a></p>\n<p><img alt=\"\" src=\"https://pic2.zhimg.com/v2-b9fc28806008fefa55b15929448c31ed_1440w.jpg\" /></p>\n<h3><strong>创新点</strong></h3>\n<p>将policy建模为<strong>未来视频预测 + 动作预测</strong>的联合问题，即一个模型同时预测 video + action。并对模型进行包括并行化、缓存、量化等推理优化，把推理加速到 38倍，实现约 7Hz 的闭环控制。</p>\n<h3>模型结构</h3>\n<p>DreamZero 将机器人操作建模为：基于当前观测、历史和语言指令，联合预测未来视频和动作。在问题建模上可以分解为“先预测未来世界（视频），再由未来世界决定动作（IDM）”。在实现上，DreamZero 使用一个 autoregressive DiT 同时联合建模视频和动作，而不需要显式分成两个模型或分两步执行。<br />\n模型的输入包括视觉观测（包括历史帧）+语言指令+机器人state。网络主要由5个模块组成：</p>\n<ul>\n<li><strong>Backbone</strong>：14B autoregressive diffusion transformer，预训练 backbone 来自 Wan2.1-I2V-14B-480P 图像到视频扩散模型。选择自回归而不是一般常见的双向注意力DiT是因为可用 KV cache，推理更快，能利用更长的视觉历史，避免双向架构里视频/动作/语言对齐困难以及需要固定sequence长度的问题。</li>\n<li><strong>Video encoder/decoder：</strong>来自Wan2.1的VAE encoder/decoder。输入时多个相机拼成一张图像送入VAE（ 2×2 布局，对于DROID 是“腕部图像占上半行、左右外部相机占下半行”）。这样可以避免因相机数量的不同而调整网络架构。</li>\n<li><strong>Image Encoder</strong>:对图像condition使用CLIP提取图像condition的全局语义特征，作为VAE encoder提取的low level feature的补充</li>\n<li><strong>Text encoder：</strong>24 层 UMT5 ，输入 token 来自 google/umt5-xxl tokenizer，训练/推理时再加载 Wan 提供的 umt5-xxl 编码器权重，通过cross attention的方式作为DiT的condition。</li>\n<li><strong>State encoder:</strong>和gr00t同款的CategorySpecificMLP，project为token和视觉token连接在一起</li>\n<li><strong>Action decoder：</strong>和gr00t同款的 Category-Specific Linear</li>\n<li>Time embedding 通过 AdaLN / scale-shift 注入到 transformer</li>\n</ul>\n<p>联合去噪视频 chunk 和动作 chunk，DreamZero 不是逐帧输出，而是按 block/chunk 生成。查看开源代码可以看出：</p>\n<ul>\n<li>backbone的输入token顺序类似[首帧 CLIP + vae latent] [video blocks(noise)] [action blocks(noise)] [state blocks]的序列。每个block代表了<code>num_frame_per_block=2</code> 帧，对应 <code>num_action_per_block=24</code> 个 action、以及<code>num_state_per_block=1</code>个state</li>\n<li>看开源代码，训练时似乎是以1 帧初始视频帧作为condition ，然后按 <code>24</code>为窗口向前后扩展得到video；例如每个 window只取视频 offset <code>[0,3,6,9,12,15,18,21]</code> 这 8 帧，使总帧数满足 <strong><code>8n+1</code>。</strong></li>\n<li>推理时用 KV cache 提升效率，动作 chunk 在真实世界异步执行，执行后把真实观测帧回写到 KV cache，避免累计误差</li>\n</ul>\n<p><strong>Block之间如何attend？</strong>block-wise causal mask确定的block之间的attend关系为：</p>\n<ul>\n<li>t时刻的Video 可以attend到首帧图像feature，t时刻以及之前的video，当前时刻的action和state</li>\n<li>t时刻action可以attend到首帧图像feature，t时刻以及之前的video，当前时刻的action和state</li>\n<li>t时刻state只attend到自己</li>\n</ul>\n<h3>训练与数据</h3>\n<p><strong>训练目标：</strong>联合 video-action flow matching。DreamZero 用的是 flow matching 训练目标。训练时，对当前 chunk 的视频 latent 和动作都加噪，然后让模型预测联合 velocity。loss 是联合 velocity 的加权 MSE <br />\n训练采用 <strong>teacher forcing，</strong>即当前块是noisy chunk，可以 attend 到之前的真值clean chunks，有助于稳定训练。训练不是把样本完全拆散，而是做 <strong>trajectory-level 更新</strong>，再通过 attention mask 控制当前 chunk 只看该看的历史上下文。<br />\n训练时基于Wan2.1-I2V-14B-480P权重初始化，DiT blocks, the state encoder, action encoder+decoder参与训练；text encoder和VAE冻结。batchsize128训练10万步。  </p>\n<p><strong>训练数据：</strong>约 500 小时 AgiBot G1 遥操数据，分布在 22 个真实环境，共 7193 个 episode。每个 episode 平均 4.4 分钟，每个 episode 平均约 42.4 个 subtasks。在单臂 Franka 上，使用的DROID数据集训练。跨 embodiment 实验中， 12分钟人类视频数据或20分钟YAM robot遥操数据可以提高 AgiBot G1 在没见过的任务上的Task Progress。使用AgiBot G1训练的checkpoint，采集11个任务30分钟YAM robot数据， 即可实现迁移（论文里没报具体点数）。</p>\n<h3>推理优化</h3>\n<p>作者把推理优化分成三层：<br />\n<strong>系统层面：</strong>CFG 并行到两张 GPU；利用 velocity 一致性做 DiT caching，把有效步数从 16 降到 4 左右 <br />\n<strong>实现层面：</strong>torch.compile + CUDA Graphs；NVFP4 量化；cuDNN attention；把 scheduler 操作迁到 GPU，减少 CPU-GPU 同步开销 <br />\n<strong>模型层面优化：DreamZero-Flash：</strong>训练时把 video 和 action 的噪声时间步解耦，视频更偏向高噪声，动作保持均匀噪声，目的是让模型学会“在视觉仍然有较大噪声时，也能快速输出干净动作”，匹配 few-step / one-step action denoising 的推理需求。</p>\n<h2>Motus: A Unified Latent Action World Model</h2>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/pdf/2512.13030\">https://arxiv.org/pdf/2512.13030</a></p>\n<p><img alt=\"\" src=\"https://pic1.zhimg.com/v2-dccf3f796a8e547fc1f11de0f4c7fe2a_1440w.jpg\" /></p>\n<p>这篇论文的目标是做一个统一的 latent-action world model：一个模型同时支持 VLA、World Model、IDM、Video Generation、Video-Action Joint Prediction 5 种模式。核心思想是：不要把“理解、想象未来、预测动作”拆成多个模型，而是把 VLM、VGM 和 action expert 接到一个 Mixture-of-Transformers 框架里，再用 UniDiffuser 式调度统一 video/action 两种连续模态。</p>\n<h3>创新点</h3>\n<ul>\n<li><strong>统一 5 类模型</strong> ：Motus把 VLA、WM、IDM、VGM、video-action joint prediction 都放进同一个生成式框架。论文认为之前方法要么只做静态策略，要么只做未来视频，要么是两阶段 VGM+IDM，功能割裂。Motus 用一个模型表示这些分布，并通过 UniDiffuser-like scheduler 控制条件模态和生成模态。</li>\n<li><strong>MoT / Tri-model Joint Attention</strong>：模型不是简单把所有 token 拼起来丢进同一个 Transformer，而是保留 video generation expert、action expert、understanding expert 三个专家，各自有 Transformer 模块，但共享/拼接 self-attention 来做跨模态交互。这样一方面继承 Wan 2.2 5B 的视频生成先验和 Qwen3-VL-2B 的视觉语言理解能力，另一方面避免不同功能完全混在一起造成干扰。</li>\n<li><strong>latent action用 optical flow 学“像素级 delta action”</strong>：Motus 用 DPFlow 计算相邻帧 optical flow，把 flow 转成 RGB，再用 DC-AE 压缩为 4 个 512 维 token，最后投影成 14 维 latent action，使其大致对齐常见机器人动作空间。训练 latent action VAE 时混合 90% 无标签 flow reconstruction 数据和 10% 有标签轨迹做弱 action supervision。</li>\n<li><strong>Action-Dense Video-Sparse Prediction</strong>：由于 action chunk 需要高频输出，但视频预测不需要每个 action step 都生成一帧，Motus 把 video frame rate 下采样，例如让 video frame rate 变成 action frame rate 的 1/6，以减少 video token 对 attention 的压倒性占比，避免模型过拟合视频预测而削弱动作预测。</li>\n</ul>\n<h3>模型架构</h3>\n<p>Motus 的输入为：语言指令、当前观测图像、未来 video latent、action/action latent。训练目标是 rectified flow：分别对 video latent 和 action/action latent 加噪，模型预测两个 velocity field，最终 loss 是 video loss 和 action loss 的和。video 和 action 各自有独立 timestep，因此可以在推理时指定不同模态是否被生成、是否作为条件，从而切换成 VLA、WM、IDM、VGM 或 joint prediction。</p>\n<p>模型主要有4个模块：</p>\n<ul>\n<li><strong>Video expert</strong>：基于 Wan 2.2 5B，作为视频生成基础模型；</li>\n<li><strong>Understanding expert</strong>：基于 Qwen3-VL-2B，取 VLM 最后一层相关 token，强调 3D grounding、空间理解和物体定位；</li>\n<li><strong>Action expert</strong>：构造与 Wan 相同深度的 Transformer block，每层包含 AdaLN、FFN、Tri-model Joint Attention；</li>\n<li><strong>Latent action VAE</strong>：DPFlow → 转换为optical flow RGB → DC-AE(deep convolutional variational autoencoder) 得到4×512 latent → 经过encoder 得到 14 维 latent action。</li>\n</ul>\n<p><img alt=\"\" src=\"https://pica.zhimg.com/v2-8e4bdf79b702af260478d504cf130250_1440w.jpg\" /></p>\n<h3>训练流程与数据</h3>\n<p><img alt=\"\" src=\"https://picx.zhimg.com/v2-13086f8093436d8b96720dca2d412bdb_1440w.jpg\" /><img alt=\"\" src=\"https://pica.zhimg.com/v2-411c6b140c5f49fc11e8ff16adf182a4_1440w.jpg\" /></p>\n<p>Motus 是三阶段训练，配合六层数据金字塔：Web Data、Egocentric Human Videos、Synthetic Data、Task-agnostic Data、Multi-Robot Task Trajectory Data、Target-Robot Task Trajectory Data。训练分为3个阶段。Stage 1 是 video generation，Stage 2 是 latent action unified training，Stage 3 是 target robot SFT。<br />\n<strong>Stage 0：获取 foundation models：</strong> Motus 直接继承 off-the-shelf foundation models；</p>\n<p><strong>Stage 1：Learning Visual Dynamics / Video Generation</strong></p>\n<ul>\n<li>只训练 VGM/video branch；</li>\n<li>数据：Egocentric Human Videos、Synthetic Data、 Multi-Robot Task Trajectory Data；</li>\n<li>目的：把通用视频生成先验适配到 embodied manipulation，使模型能从语言和初始图像生成合理的未来任务视频。</li>\n</ul>\n<p><strong>Stage 2：Unified Training with Latent Actions</strong></p>\n<ul>\n<li>训练对象：Motus 三个 expert，VLM 冻结，加入 latent actions；</li>\n<li>数据：Level 2 egocentric human videos、Level 3 synthetic data、Level 4 task-agnostic data、Level 5 multi-robot task trajectory data；</li>\n<li>目的：用 latent action 把没有 action label 的视频数据、task-agnostic action 数据、多机器人轨迹统一到一个 motion/action space 里。</li>\n</ul>\n<p><strong>Stage 3：SFT / Target Robot Finetuning</strong></p>\n<ul>\n<li>训练对象：Motus 全模型，用真实 action 而不是 latent action；</li>\n<li>数据：Level 6 target-robot task trajectory data；</li>\n<li>目的：把通用 motion prior 适配到目标机器人的具体动作空间、动力学和相机分布。</li>\n</ul>\n<h2>MotuBrain</h2>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/pdf/2604.27792\">https://arxiv.org/pdf/2604.27792</a></p>\n<p><img alt=\"\" src=\"https://pic1.zhimg.com/v2-701aa4a8db538697bd5582de3195c12a_1440w.jpg\" /></p>\n<p>MotuBrain 可以看成 Motus 的工程化和规模化升级版。它保留 Motus 的 UniDiffuser + World Action Model 思路，但重点解决四个问题：多视角输入、语言和动作耦合、跨 embodiment 统一动作表示、真实部署速度。注意最终 post-training和部署推理时不是双向 joint attention，action 可以 attend video/language，但video 不 attend action；推理时先短暂 joint denoise video/action，然后冻结 video，只做 action-only denoise。</p>\n<h3>创新点</h3>\n<ul>\n<li><strong>三流 MoT + H-bridge attention</strong>  MotuBrain 把 text stream、video stream、action stream 放进三流 MoT。text stream 不输出预测头，但参与 attention，使语言指令更直接地影响 action generation。 MotuBrain 不在所有层都做完整 video-action joint attention，而是只在中间 50% Transformer layers 做 full V-A joint attention，底部 25% 和顶部 25% 使用 decoupled attention。这样既保留中层跨模态对齐，又减少计算，并避免浅层/深层注入太多无关模态信息。</li>\n<li><strong>统一多视角建模</strong> 每个 camera view 先独立用 Vidu VAE 编码，再在 token 维度拼接；位置编码用 3D RoPE，并给不同 view 加 spatial offset，时间维保持一致。这样模型可以支持任意数量和布局的相机，而不需要改 backbone。</li>\n<li><strong>真实部署优化：54.4× speedup / 11 Hz</strong> MotuBrain 的推理优化包括 noise sampling 降步数、torch.compile、FP8 quantization、DiT cache、V2A-style action-only inference，最终从 baseline 50 step、4.90s、0.20Hz 提升到 0.09s、11.11Hz，累计 54.4× speedup。</li>\n</ul>\n<h3>模型与方法</h3>\n<p>MotuBrain 仍然采用 UniDiffuser，把 video 和 action 作为两个连续模态联合建模。输入包括 text tokens、condition image latent、noisy future video latents、noisy action tokens；condition image 被看作第一帧 video latent 并 teacher-forced，后续 video/action token 通过 flow matching 预测 velocity field。</p>\n<p>与 Motus 相比，MotuBrain 更强调部署形式：</p>\n<ul>\n<li><strong>Non-AR post-training</strong>：一次 forward denoise 整个 observation window 内的 video/action token；</li>\n<li><strong>AR post-training</strong>：把 episode 切成 chunks，训练时并行处理所有 chunks，但用 block-causal mask；部署时逐 chunk rollout，并用新观测作为 clean context；</li>\n<li><strong>V2A-style attention</strong>：action token 可以 attend video/language，video token 不 attend action token；推理时先短暂 joint denoise，之后冻结 video latent，只继续 action-only denoise。</li>\n</ul>\n<p>真实执行时，MotuBrain 将 inference loop 和 robot control loop 解耦：控制器持续执行当前 action chunk，模型异步生成下一个 chunk。为了减少 chunk boundary 的 action regression、速度突变和 jitter，它把当前 chunk 未执行部分作为下一次生成的约束，并用 smooth decay weight 做融合。</p>\n<h3>训练流程与数据</h3>\n<p>MotuBrain 的数据金字塔从 Motus 的六层简化为四层：Internet videos、ego-centric videos、heterogeneous-embodiment data、specific-embodiment data。底层 Internet videos 用于训练 Vidu，作为 MotuBrain 的视频基础模型；第二层 ego-centric videos 提供第一人称手物交互；第三层 heterogeneous-embodiment data 来自不同机器人平台。</p>\n<p><img alt=\"\" src=\"https://pica.zhimg.com/v2-f73166ec92d7c54103427ff15de2ef12_1440w.jpg\" /></p>\n<p><strong>Stage 1：video branch pre-training</strong></p>\n<ul>\n<li>目的是把互联网视频先验迁移到 embodied manipulation，尤其是双臂交互动力学。从预训练的Vidu 权重开始，只训练 video branch，action branch 随机初始化但不更新；</li>\n<li>数据：ego-centric videos + heterogeneous-embodiment data；</li>\n<li>使用 LingBot-VA 风格 noisy-conditioning；多视角数据随机 drop auxiliary views，提高对不同相机数量和坏观测的鲁棒性。</li>\n</ul>\n<p><strong>Stage 2：action branch pre-training</strong></p>\n<ul>\n<li>只训练 action branch，冻结 video branch；</li>\n<li>数据：heterogeneous-embodiment dual-arm robot data； action 为relative EEF chunk；</li>\n<li>loss：虽然只更新 action branch，但在 unified formulation 下仍优化 video + action objective，目的是让 action 学习受 video dynamics 约束。</li>\n</ul>\n<p><strong>Post-training：target embodiment adaptation</strong></p>\n<ul>\n<li>初始化：Stage 2 checkpoint；</li>\n<li>数据：specific-embodiment data； 新 humanoid embodiment 只需 50–100 条同 embodiment 轨迹的数据</li>\n<li>训练分为两种模式：Non-AR 和 AR 分开训练； Non-AR对 video 和 action 一起加噪声同时预测video和action，但要注意video并不会attend到action上。 AR则是在 Non-AR基础上并行处理所有 chunk，block-causal mask 控制信息流，可以理解为把 Non-AR 的“大窗口一次性预测”拆成多个 chunk，并在 chunk 之间不断插入最新真实观测来纠偏。</li>\n</ul>"
    }
  ],
  "graph": {
    "nodes": [
      {
        "id": "world_models",
        "x": 2018.03,
        "y": 0,
        "category": "ssm"
      },
      {
        "id": "planet",
        "x": 2019.06,
        "y": 0,
        "category": "ssm"
      },
      {
        "id": "dreamerv1",
        "x": 2019.12,
        "y": 0,
        "category": "ssm"
      },
      {
        "id": "dreamerv2",
        "x": 2020.1,
        "y": 0,
        "category": "ssm"
      },
      {
        "id": "dreamerv3",
        "x": 2023.01,
        "y": 0,
        "category": "ssm"
      },
      {
        "id": "dreamer4",
        "x": 2025.09,
        "y": 0,
        "category": "ssm"
      },
      {
        "id": "jepa",
        "x": 2022.06,
        "y": 1,
        "category": "predictive"
      },
      {
        "id": "ijepa",
        "x": 2023.06,
        "y": 1,
        "category": "predictive"
      },
      {
        "id": "vjepa",
        "x": 2024.04,
        "y": 1,
        "category": "predictive"
      },
      {
        "id": "vjepa2",
        "x": 2025.06,
        "y": 1,
        "category": "predictive"
      },
      {
        "id": "vjepa21",
        "x": 2026.02,
        "y": 1,
        "category": "predictive"
      },
      {
        "id": "videogpt",
        "x": 2021.04,
        "y": 2,
        "category": "generative"
      },
      {
        "id": "teco",
        "x": 2023.07,
        "y": 2,
        "category": "generative"
      },
      {
        "id": "gaia1",
        "x": 2023.1,
        "y": 2,
        "category": "generative"
      },
      {
        "id": "genie",
        "x": 2024.02,
        "y": 2,
        "category": "generative"
      },
      {
        "id": "sora",
        "x": 2024.02,
        "y": 2,
        "category": "generative"
      },
      {
        "id": "genie2",
        "x": 2024.12,
        "y": 2,
        "category": "generative"
      },
      {
        "id": "gaia3",
        "x": 2026.03,
        "y": 2,
        "category": "generative"
      },
      {
        "id": "deltaworld",
        "x": 2026.04,
        "y": 2,
        "category": "generative"
      },
      {
        "id": "worldreel",
        "x": 2026.03,
        "y": 2,
        "category": "generative"
      },
      {
        "id": "occsora",
        "x": 2026.02,
        "y": 2,
        "category": "generative"
      },
      {
        "id": "astra",
        "x": 2026.01,
        "y": 2,
        "category": "generative"
      },
      {
        "id": "interaction_networks",
        "x": 2016.12,
        "y": 3,
        "category": "physics"
      },
      {
        "id": "vin",
        "x": 2017.12,
        "y": 3,
        "category": "physics"
      },
      {
        "id": "hnn",
        "x": 2019.12,
        "y": 3,
        "category": "physics"
      },
      {
        "id": "lnn",
        "x": 2020.03,
        "y": 3,
        "category": "physics"
      },
      {
        "id": "gns",
        "x": 2020.07,
        "y": 3,
        "category": "physics"
      },
      {
        "id": "roboscape",
        "x": 2026.01,
        "y": 3,
        "category": "physics"
      },
      {
        "id": "newton",
        "x": 2026.03,
        "y": 3,
        "category": "physics"
      },
      {
        "id": "mbpo",
        "x": 2019.12,
        "y": 4,
        "category": "planning"
      },
      {
        "id": "simple",
        "x": 2020.04,
        "y": 4,
        "category": "planning"
      },
      {
        "id": "muzero",
        "x": 2020.12,
        "y": 4,
        "category": "planning"
      },
      {
        "id": "tdmpc",
        "x": 2022.06,
        "y": 4,
        "category": "planning"
      },
      {
        "id": "iris",
        "x": 2023.05,
        "y": 4,
        "category": "planning"
      },
      {
        "id": "tdmpc2",
        "x": 2024.05,
        "y": 4,
        "category": "planning"
      },
      {
        "id": "jumpy_wm",
        "x": 2026.02,
        "y": 4,
        "category": "planning"
      },
      {
        "id": "rlvr_world",
        "x": 2026.01,
        "y": 4,
        "category": "planning"
      },
      {
        "id": "unidrive_wm",
        "x": 2026.01,
        "y": 5,
        "category": "embodied"
      },
      {
        "id": "resim",
        "x": 2026.02,
        "y": 5,
        "category": "embodied"
      },
      {
        "id": "navthinker",
        "x": 2026.03,
        "y": 5,
        "category": "embodied"
      },
      {
        "id": "gen1",
        "x": 2026.04,
        "y": 5,
        "category": "embodied"
      },
      {
        "id": "xwam",
        "x": 2026.04,
        "y": 5,
        "category": "embodied"
      },
      {
        "id": "vagen",
        "x": 2026.03,
        "y": 5,
        "category": "embodied"
      },
      {
        "id": "mindjourney",
        "x": 2026.03,
        "y": 5,
        "category": "embodied"
      },
      {
        "id": "chatvla2",
        "x": 2026.03,
        "y": 5,
        "category": "embodied"
      }
    ],
    "edges": [
      {
        "from": "world_models",
        "to": "planet",
        "label": "引入RSSM"
      },
      {
        "from": "planet",
        "to": "dreamerv1",
        "label": "潜在想象"
      },
      {
        "from": "dreamerv1",
        "to": "dreamerv2",
        "label": "离散潜变量"
      },
      {
        "from": "dreamerv2",
        "to": "dreamerv3",
        "label": "跨域通用"
      },
      {
        "from": "dreamerv3",
        "to": "dreamer4",
        "label": "规模扩展"
      },
      {
        "from": "jepa",
        "to": "ijepa",
        "label": "图像掩码"
      },
      {
        "from": "ijepa",
        "to": "vjepa",
        "label": "视频扩展"
      },
      {
        "from": "vjepa",
        "to": "vjepa2",
        "label": "机器人规划"
      },
      {
        "from": "vjepa2",
        "to": "vjepa21",
        "label": "规模提升"
      },
      {
        "from": "videogpt",
        "to": "teco",
        "label": "时空一致"
      },
      {
        "from": "videogpt",
        "to": "gaia1",
        "label": "驾驶场景"
      },
      {
        "from": "videogpt",
        "to": "genie",
        "label": "交互环境"
      },
      {
        "from": "videogpt",
        "to": "sora",
        "label": "物理直觉"
      },
      {
        "from": "genie",
        "to": "genie2",
        "label": "3D实时"
      },
      {
        "from": "gaia1",
        "to": "gaia3",
        "label": "长尾场景"
      },
      {
        "from": "genie2",
        "to": "deltaworld",
        "label": "增量编码"
      },
      {
        "from": "sora",
        "to": "worldreel",
        "label": "几何一致"
      },
      {
        "from": "sora",
        "to": "occsora",
        "label": "占据栅格"
      },
      {
        "from": "sora",
        "to": "astra",
        "label": "自回归去噪"
      },
      {
        "from": "interaction_networks",
        "to": "vin",
        "label": "视觉输入"
      },
      {
        "from": "interaction_networks",
        "to": "hnn",
        "label": "能量守恒"
      },
      {
        "from": "hnn",
        "to": "lnn",
        "label": "约束系统"
      },
      {
        "from": "vin",
        "to": "gns",
        "label": "GNN模拟"
      },
      {
        "from": "gns",
        "to": "roboscape",
        "label": "物理先验"
      },
      {
        "from": "gns",
        "to": "newton",
        "label": "物理引擎"
      },
      {
        "from": "mbpo",
        "to": "simple",
        "label": "样本效率"
      },
      {
        "from": "mbpo",
        "to": "muzero",
        "label": "MCTS搜索"
      },
      {
        "from": "muzero",
        "to": "tdmpc",
        "label": "TD+MPC"
      },
      {
        "from": "muzero",
        "to": "iris",
        "label": "Trans建模"
      },
      {
        "from": "tdmpc",
        "to": "tdmpc2",
        "label": "可扩展性"
      },
      {
        "from": "tdmpc2",
        "to": "jumpy_wm",
        "label": "跳跃动力学"
      },
      {
        "from": "iris",
        "to": "rlvr_world",
        "label": "RL微调"
      },
      {
        "from": "gaia3",
        "to": "unidrive_wm",
        "label": "统一架构"
      },
      {
        "from": "gaia3",
        "to": "resim",
        "label": "闭环仿真"
      },
      {
        "from": "vjepa21",
        "to": "navthinker",
        "label": "社交导航"
      },
      {
        "from": "vjepa21",
        "to": "gen1",
        "label": "通用操作"
      },
      {
        "from": "vjepa21",
        "to": "vagen",
        "label": "VLM推理"
      },
      {
        "from": "vjepa21",
        "to": "mindjourney",
        "label": "空间推理"
      },
      {
        "from": "vjepa21",
        "to": "chatvla2",
        "label": "开放世界"
      },
      {
        "from": "worldreel",
        "to": "xwam",
        "label": "动作建模"
      },
      {
        "from": "dreamerv3",
        "to": "vjepa",
        "label": "预测表征"
      },
      {
        "from": "jepa",
        "to": "genie",
        "label": "生成架构"
      },
      {
        "from": "gns",
        "to": "roboscape",
        "label": "具身场景"
      },
      {
        "from": "dreamerv3",
        "to": "iris",
        "label": "世界模型RL"
      }
    ],
    "milestones": [
      "dreamerv3",
      "jepa",
      "genie2"
    ]
  },
  "algos": [
    {
      "id": "world_models",
      "num": 1,
      "name": "World Models",
      "fullName": "世界模型 (World Models)",
      "year": "2018.03",
      "org": "Google Brain",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/1803.10122",
      "projectUrl": "",
      "category": "ssm",
      "motivation": "首次展示智能体可在自身生成的梦境中学习策略",
      "summary": "World Models 提出把智能体拆成视觉压缩器 V、时序预测器 M 和轻量控制器 C，先用无监督方式学习环境的潜在动力学，再让控制器在真实环境或模型生成的“梦境”中学习策略，证明紧凑世界模型可以显著降低强化学习的搜索难度。",
      "keyPoints": [
        "<strong>三模块架构</strong>：VAE 视觉模型 <span class=\"kb-math kb-math-inline\">V</span> 压缩像素帧，MDN-RNN 记忆模型 <span class=\"kb-math kb-math-inline\">M</span> 预测未来潜变量，线性控制器 <span class=\"kb-math kb-math-inline\">C</span> 根据 <span class=\"kb-math kb-math-inline\">[z_t, h_t]</span> 输出动作",
        "<strong>无监督世界模型训练</strong>：先用随机策略收集轨迹，只用观察和动作训练 <span class=\"kb-math kb-math-inline\">V</span> 与 <span class=\"kb-math kb-math-inline\">M</span>，奖励只用于后续优化控制器",
        "<strong>混合密度时序预测</strong>：<span class=\"kb-math kb-math-inline\">M</span> 输出下一潜变量的高斯混合分布，能表达随机环境中的多种未来",
        "<strong>梦境中学习策略</strong>：在 VizDoom 中用 MDN-RNN 与 VAE 解码器构造可交互的 hallucinated environment，并在其中训练控制器再迁移到真实环境",
        "<strong>极小控制器</strong>：CarRacing 中控制器只有 867 个参数，便于用 CMA-ES 等黑盒优化方法稳定搜索",
        "<strong>温度调节与不确定性</strong>：通过 MDN 采样温度控制梦境环境的随机性，过低会被策略利用，适中温度提升迁移稳定性"
      ],
      "detail": "<h5>核心示意图</h5>\n<p><img alt=\"World Models 的 V-M-C 架构\" src=\"https://ar5iv.labs.arxiv.org/html/1803.10122/assets/x1.png\" />\n<em>图：智能体由 Vision、Memory、Controller 三部分构成；复杂感知和预测能力放在世界模型中，控制器保持尽量简单。</em></p>\n<h5>动机与背景</h5>\n<p>传统深度强化学习常把感知、记忆和控制都塞进一个端到端策略网络里，导致奖励稀疏、信用分配困难和样本效率低。World Models 的切入点是：环境中大量结构可以不依赖奖励而通过观察学习到，策略优化只需要在一个更小、更抽象的空间中做决策。</p>\n<p>论文把“世界模型”具体化为两个可微生成模型。视觉模型 <span class=\"kb-math kb-math-inline\">V</span> 学会把 <span class=\"kb-math kb-math-inline\">64\\times64</span> RGB 图像压缩为低维潜变量 <span class=\"kb-math kb-math-inline\">z_t</span>，记忆模型 <span class=\"kb-math kb-math-inline\">M</span> 学会根据过去潜变量、动作和 RNN 隐状态预测未来潜变量分布。控制器不直接看像素，而是读出当前压缩状态 <span class=\"kb-math kb-math-inline\">z_t</span> 和记忆状态 <span class=\"kb-math kb-math-inline\">h_t</span>，因此动作选择可以写成一个简单线性映射：</p>\n<div class=\"kb-math kb-math-display\">a_t = W_c [z_t, h_t] + b_c</div>\n<p>这种分工的关键价值在于把高维表征学习从强化学习目标中剥离出来。<span class=\"kb-math kb-math-inline\">V</span> 和 <span class=\"kb-math kb-math-inline\">M</span> 可以用标准反向传播快速训练，而 <span class=\"kb-math kb-math-inline\">C</span> 参数很少，可以用 CMA-ES 在真实环境或模型环境中搜索。</p>\n<h5>算法流程</h5>\n<pre><code class=\"language-python\"># World Models 的训练与控制流程\ncollect_random_rollouts()\n\n# 1. 训练视觉模型 V\nfor image_batch in replay_images:\n    z = VAE.encoder(image_batch)\n    reconstruction = VAE.decoder(z)\n    optimize(reconstruction_loss + kl_regularizer)\n\n# 2. 训练记忆模型 M\nfor sequence in replay_sequences:\n    z_t = VAE.encoder(o_t)\n    params = MDN_RNN(z_t, a_t, h_t)\n    optimize(-log_prob_mixture(params, z_{t+1}))\n\n# 3. 训练控制器 C\nfor candidate_controller in CMA_ES.population:\n    rollout_return = rollout(lambda z, h: W @ concat(z, h) + b)\n    CMA_ES.update(candidate_controller, rollout_return)\n</code></pre>\n<h5>V：从像素到潜变量</h5>\n<p>VAE 的目标是把每一帧图像编码为潜变量分布 <span class=\"kb-math kb-math-inline\">q_\\phi(z_t \\mid o_t)</span>，并通过解码器重建图像。训练目标是标准 VAE 证据下界的负号：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_V\n=\n\\mathbb{E}_{q_\\phi(z_t \\mid o_t)}\n[-\\log p_\\theta(o_t \\mid z_t)]\n+\nD_{\\mathrm{KL}}\\big(q_\\phi(z_t \\mid o_t)\\,\\|\\,p(z_t)\\big)</div>\n<p>直觉上，<span class=\"kb-math kb-math-inline\">z_t</span> 不需要保留每个像素细节，只需要保留足以重建任务场景的主要空间结构。CarRacing 中，这让道路、车身位置和弯道形状进入低维状态；VizDoom 中，它压缩走廊、火球和敌人等视觉信息。</p>\n<h5>M：用 MDN-RNN 预测未来</h5>\n<p>记忆模型 <span class=\"kb-math kb-math-inline\">M</span> 是一个 RNN，输入当前潜变量 <span class=\"kb-math kb-math-inline\">z_t</span>、动作 <span class=\"kb-math kb-math-inline\">a_t</span> 和隐状态 <span class=\"kb-math kb-math-inline\">h_t</span>，输出下一潜变量 <span class=\"kb-math kb-math-inline\">z_{t+1}</span> 的高斯混合分布：</p>\n<div class=\"kb-math kb-math-display\">p(z_{t+1}\\mid z_t, a_t, h_t)\n=\n\\sum_{k=1}^{K} \\pi_k\n\\mathcal{N}(z_{t+1}; \\mu_k, \\Sigma_k)</div>\n<p>高斯混合不是装饰，而是解决“未来不唯一”的核心机制。同一个当前画面和动作可能对应多个未来，例如转弯后的赛道形状、敌人是否发射火球等。MDN-RNN 通过混合分量表达这些可能性，采样温度 <span class=\"kb-math kb-math-inline\">\\tau</span> 则控制生成环境的随机程度。</p>\n<h5>C：小控制器与梦境训练</h5>\n<p>控制器 <span class=\"kb-math kb-math-inline\">C</span> 只接收 <span class=\"kb-math kb-math-inline\">z_t</span> 和 <span class=\"kb-math kb-math-inline\">h_t</span>。在 CarRacing 中，加入 <span class=\"kb-math kb-math-inline\">M</span> 的隐状态后，控制器能根据未来道路趋势做更稳定的转向；只看 <span class=\"kb-math kb-math-inline\">z_t</span> 时车会出现明显摇摆。论文报告完整 <span class=\"kb-math kb-math-inline\">V+M+C</span> 在 CarRacing-v0 上达到平均 906 分，超过当时常见深度 RL 基线。</p>\n<p>更具标志性的实验是 VizDoom。作者先训练世界模型模拟游戏环境，再把控制器放入梦境环境中训练。训练出的策略可以迁移回真实 VizDoom，并且在适当温度下避免利用模型缺陷：</p>\n<div class=\"key-point\">💡 关键：World Models 不是把模型当成辅助特征，而是让模型本身成为可交互环境，策略可以在其中获得大量低成本经验。</div>\n<h5>与传统模型式强化学习的区别</h5>\n<p>World Models 与经典 Dyna 或 MPC 方法不同。它并不要求模型在原始状态空间精确预测所有细节，也不在每一步做显式规划；它学习一个潜在生成模型，再让一个简单策略直接在该潜在状态上行动。这让它更像“学会可用于控制的内部表征”，而不是“学会一个完美仿真器”。</p>\n<p>局限也很清楚：<span class=\"kb-math kb-math-inline\">V</span> 和 <span class=\"kb-math kb-math-inline\">M</span> 分开训练，控制目标不能反向影响表征；MDN-RNN 的长时程一致性有限，梦境环境也可能被策略钻空子。后续 PlaNet 和 Dreamer 系列正是在这个基础上，把 RSSM、潜在规划、actor-critic 想象训练和更稳定的训练目标逐步引入。</p>",
      "quiz": {
        "q": "World Models 中控制器 C 为什么可以设计得很小？",
        "options": [
          "因为环境奖励已经被 VAE 直接预测出来",
          "因为 V 和 M 已经把像素和历史压缩成当前与未来相关的潜在状态",
          "因为 CMA-ES 只能优化线性模型，不能优化神经网络",
          "因为论文只处理离散动作空间"
        ],
        "answer": 1,
        "explain": "VAE 提供当前视觉摘要，MDN-RNN 的隐状态提供历史和未来预测信息，控制器只需在压缩状态上做动作映射，因此参数可以很少。"
      }
    },
    {
      "id": "planet",
      "num": 2,
      "name": "PlaNet",
      "fullName": "深度规划网络 (Deep Planning Network)",
      "year": "2019.06",
      "org": "Google DeepMind",
      "parent": "world_models",
      "paperUrl": "https://proceedings.mlr.press/v97/hafner19a.html",
      "projectUrl": "",
      "category": "ssm",
      "motivation": "引入RSSM循环状态空间模型实现像素级规划",
      "summary": "PlaNet 提出 Recurrent State-Space Model (RSSM) 和 latent overshooting，用像素观测学习可多步预测的潜在动力学，并通过 CEM 在潜在空间中在线规划动作，显著提升纯模型式强化学习在视觉连续控制任务上的样本效率。",
      "keyPoints": [
        "<strong>RSSM 潜在动力学</strong>：把确定性 RNN 状态 <span class=\"kb-math kb-math-inline\">h_t</span> 与随机潜变量 <span class=\"kb-math kb-math-inline\">s_t</span> 结合，同时保留长时记忆和多未来建模能力",
        "<strong>像素到潜在规划</strong>：观测模型用于训练表征，规划时只在潜在状态中预测奖励，不生成图像",
        "<strong>CEM 在线 MPC</strong>：每个环境步采样大量候选动作序列，选取高回报 elite 序列更新高斯分布，并只执行第一个动作",
        "<strong>latent overshooting</strong>：把一阶 KL 正则推广为多步潜在预测一致性，训练模型在规划 horizon 内保持稳定",
        "<strong>纯模型式智能体</strong>：不使用策略网络或价值网络，行为完全来自 learned dynamics + online planning",
        "<strong>视觉控制样本效率</strong>：在 DeepMind Control Suite 像素任务上以远少于 A3C/D4PG 的 episode 数达到接近或更高表现"
      ],
      "detail": "<h5>核心示意图</h5>\n<p><img alt=\"PlaNet RSSM 架构\" src=\"https://planetrl.github.io/assets/fig/rssm.png\" />\n<em>图：PlaNet 的 RSSM 同时包含确定性路径和随机路径；确定性路径负责记忆，随机状态负责表达不确定性和多种可能未来。</em></p>\n<h5>动机与背景</h5>\n<p>从像素规划的难点不只是图像维度高，还包括部分可观测、接触动力学、稀疏奖励和多步误差累积。早期基于模型方法通常要么在低维真实状态上规划，要么在像素空间做昂贵的视频预测。PlaNet 的关键问题是：能否学到一个足够紧凑、足够可预测的潜在状态，使规划可以直接在这个空间完成？</p>\n<p>PlaNet 的答案是 RSSM。纯 RNN 状态容易给出确定性未来，难以表达多个可能结果；纯随机状态空间模型又难以长期记忆。RSSM 把二者结合：</p>\n<div class=\"kb-math kb-math-display\">h_t = f_\\theta(h_{t-1}, s_{t-1}, a_{t-1}), \\qquad\ns_t \\sim p_\\theta(s_t \\mid h_t)</div>\n<p>训练时还用 encoder 近似后验：</p>\n<div class=\"kb-math kb-math-display\">s_t \\sim q_\\theta(s_t \\mid h_t, o_t)</div>\n<p>因此模型在看到图像时可以校正信念，在想象未来时可以只用 prior <span class=\"kb-math kb-math-inline\">p_\\theta(s_t\\mid h_t)</span> 向前滚动。</p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># PlaNet: latent dynamics learning + online planning\ninitialize_replay_with_random_episodes()\ninitialize_rssm_encoder_decoder_reward()\n\nwhile not converged:\n    # 1. 模型拟合\n    for update in range(model_updates):\n        chunk = sample_sequence_chunks(replay)\n        posteriors = infer_states_with_encoder(chunk.obs, chunk.actions)\n        priors = predict_states_with_rssm(chunk.actions)\n        loss = reconstruction_loss(chunk.obs)\n        loss += reward_prediction_loss(chunk.rewards)\n        loss += kl_one_step(posteriors, priors)\n        loss += latent_overshooting_kl(posteriors, priors)\n        optimize(loss)\n\n    # 2. 数据采集\n    obs = env.reset()\n    for t in range(episode_length):\n        belief = filter_current_state(history)\n        action = cem_plan_in_latent_space(belief, rssm, reward_model)\n        obs, reward = env.step(action + exploration_noise)\n        replay.add(obs, action, reward)\n</code></pre>\n<h5>潜在规划：为什么不生成图像</h5>\n<p>PlaNet 的 observation model <span class=\"kb-math kb-math-inline\">p(o_t\\mid h_t,s_t)</span> 是训练信号，但不是规划组件。规划时只需要预测奖励：</p>\n<div class=\"kb-math kb-math-display\">\\max_{a_{t:t+H}}\n\\mathbb{E}\\left[\n\\sum_{\\tau=t+1}^{t+H}\np_\\theta(r_\\tau \\mid h_\\tau, s_\\tau)\n\\right]</div>\n<p>这样每个环境步可以评估成千上万个动作序列，而不用为每条序列解码像素。图像解码器的作用是迫使潜变量保留足够环境信息；一旦世界模型学好，CEM 只在低维潜在状态上滚动。</p>\n<h5>CEM 与 MPC</h5>\n<p>PlaNet 使用 Cross-Entropy Method 搜索动作序列。它维护一个关于未来动作序列的时间相关对角高斯分布，反复采样候选序列、用 RSSM 预测回报、保留 elite 序列、重新拟合均值和方差。最终只执行当前时刻的均值动作，下一帧重新规划：</p>\n<pre><code class=\"language-python\">def cem_plan(belief):\n    mean, std = zeros(H, action_dim), ones(H, action_dim)\n    for _ in range(num_iterations):\n        candidates = sample_normal(mean, std, size=num_candidates)\n        returns = rollout_rssm_and_reward(belief, candidates)\n        elites = topk(candidates, returns, k=num_elites)\n        mean, std = elites.mean(axis=0), elites.std(axis=0)\n    return mean[0]\n</code></pre>\n<div class=\"key-point\">💡 关键：MPC 的“每步重规划”让模型误差不必长期闭环累积；新观测会通过 encoder 校正当前 belief。</div>\n<h5>latent overshooting</h5>\n<p>标准序列 VAE 的 KL 项主要训练一步 prior：</p>\n<div class=\"kb-math kb-math-display\">D_{\\mathrm{KL}}\\big(q(s_t\\mid o_{\\le t}, a_{&lt;t}) \\,\\|\\, p(s_t\\mid s_{t-1}, a_{t-1})\\big)</div>\n<p>但规划需要多步预测准确。latent overshooting 将 prior 多次展开，要求从 <span class=\"kb-math kb-math-inline\">t-d</span> 出发的 <span class=\"kb-math kb-math-inline\">d</span> 步预测也接近 <span class=\"kb-math kb-math-inline\">t</span> 时刻后验：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\mathrm{over}}\n=\n\\sum_{d=1}^{D}\n\\beta_d\\,\nD_{\\mathrm{KL}}\n\\left(\nq(s_t \\mid o_{\\le t}, a_{&lt;t})\n\\;\\|\\;\np^{(d)}(s_t \\mid s_{t-d}, a_{t-d:t-1})\n\\right)</div>\n<p>这个损失在潜在空间计算，避免了 observation overshooting 需要多次图像解码的昂贵成本。它直接训练“规划时会用到的模型行为”：在没有中间观测纠正时，模型仍能保持合理的多步预测。</p>\n<h5>与 World Models 的区别</h5>\n<p>World Models 先学习 <span class=\"kb-math kb-math-inline\">V</span> 和 <span class=\"kb-math kb-math-inline\">M</span>，再训练一个反应式控制器；PlaNet 则把“如何选择动作”交给在线规划器。World Models 的控制器快速但固定，PlaNet 的 CEM 每步搜索，更适合低样本阶段利用模型预测。PlaNet 也把 VAE 和 RNN 统一为 RSSM，使用变分后验进行滤波，比单纯 MDN-RNN 更适合部分可观测控制。</p>\n<p>PlaNet 的主要代价是推理时需要大量候选动作序列评估，因此实时性受规划预算影响。DreamerV1 随后把 PlaNet 的 RSSM 保留下来，但用 actor-critic 在潜在想象中学习一个策略，避免每步 CEM 搜索。</p>",
      "quiz": {
        "q": "PlaNet 在执行规划时为什么不需要生成未来图像？",
        "options": [
          "因为 PlaNet 只处理低维状态输入",
          "因为 observation model 只用于训练潜变量，规划时 RSSM 和 reward model 可直接在潜在空间预测回报",
          "因为 CEM 不能处理图像输入",
          "因为 latent overshooting 会替代所有奖励预测"
        ],
        "answer": 1,
        "explain": "PlaNet 通过图像重建学习信息充足的潜变量，但在线规划只滚动潜在状态并累加奖励预测，因此避免了昂贵的像素生成。"
      }
    },
    {
      "id": "dreamerv1",
      "num": 3,
      "name": "DreamerV1",
      "fullName": "梦想家V1 (Dream to Control)",
      "year": "2019.12",
      "org": "Google DeepMind",
      "parent": "planet",
      "paperUrl": "https://arxiv.org/abs/1912.01603",
      "projectUrl": "",
      "category": "ssm",
      "motivation": "通过潜在想象进行行为学习的Actor-Critic框架",
      "summary": "DreamerV1 在 PlaNet 的潜在世界模型上引入 actor-critic 行为学习，通过在 RSSM 潜在空间中想象轨迹并把价值梯度反传给策略，解决了 CEM 在线规划计算昂贵且 horizon 固定的问题。",
      "keyPoints": [
        "<strong>潜在想象 actor-critic</strong>：从 replay 的真实后验状态出发，在 RSSM prior 中生成 imagined trajectories 来训练 actor 和 value",
        "<strong>价值模型补足长 horizon</strong>：用 <span class=\"kb-math kb-math-inline\">\\lambda</span>-return 和 value bootstrap 估计想象 horizon 之外的回报，避免短视规划",
        "<strong>解析梯度穿过动力学</strong>：连续动作下使用重参数化，让策略梯度穿过动作、RSSM 状态、奖励和价值预测",
        "<strong>三阶段循环</strong>：学习世界模型、在想象中学习行为、用 actor 与真实环境交互并扩充数据集",
        "<strong>兼容多种表征学习目标</strong>：论文强调 Dreamer 可以搭配现有潜在动力学学习方法，实际使用 RSSM",
        "<strong>视觉控制强性能</strong>：在 20 个 DeepMind Control Suite 像素任务上超过 PlaNet、A3C、D4PG 等方法的数据效率和最终表现"
      ],
      "detail": "<h5>核心示意图</h5>\n<p><img alt=\"DreamerV1 潜在想象训练\" src=\"https://ar5iv.labs.arxiv.org/html/1912.01603/assets/x1.png\" />\n<em>图：Dreamer 从经验数据学习潜在动力学，再在该潜在空间中学习价值和动作模型，最后把动作模型部署到真实环境采集新经验。</em></p>\n<h5>动机与背景</h5>\n<p>PlaNet 已经证明从像素学习 RSSM 并在潜在空间中规划是可行的，但每个动作都要运行 CEM，推理成本高；同时固定 planning horizon 容易短视，尤其在稀疏奖励或长程任务中。DreamerV1 的核心改动是把“在线搜索动作序列”替换为“离线训练一个 actor”，并用 value model 承接 horizon 之外的回报。</p>\n<p>Dreamer 的世界模型仍然包含 representation model、transition model 和 reward model：</p>\n<div class=\"kb-math kb-math-display\">\\begin{aligned}\n\\text{posterior: } &amp; q_\\theta(s_t \\mid s_{t-1}, a_{t-1}, o_t) \\\\\n\\text{prior: } &amp; p_\\theta(s_t \\mid s_{t-1}, a_{t-1}) \\\\\n\\text{reward: } &amp; p_\\theta(r_t \\mid s_t)\n\\end{aligned}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">s_t</span> 代表紧凑 model state，可包含 RSSM 的确定性与随机部分。posterior 用于从真实序列中推断状态，prior 用于想象未来。</p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># DreamerV1: learn world model, then learn actor-critic in latent imagination\ninitialize_dataset_with_seed_episodes()\ninitialize(world_model, actor, value)\n\nwhile not converged:\n    for update in range(update_steps):\n        seq = sample_sequences(dataset)\n\n        # 1. Dynamics learning\n        states = world_model.observe(seq.obs, seq.actions)\n        model_loss = reconstruction_loss(seq.obs)\n        model_loss += reward_loss(seq.rewards)\n        model_loss += kl_loss(posterior_states=states, prior_states=world_model.priors)\n        optimize(world_model, model_loss)\n\n        # 2. Behavior learning in imagination\n        start_states = stop_gradient(states)\n        imagined = rollout_prior(start_states, actor, horizon=H)\n        lambda_returns = compute_lambda_returns(imagined.rewards, value(imagined.states))\n        optimize(value, regression_loss(value(imagined.states), lambda_returns))\n        optimize(actor, -expected_return(lambda_returns))\n\n    # 3. Environment interaction\n    collect_episode(lambda obs_history: actor(world_model.filter(obs_history)))\n</code></pre>\n<h5>价值梯度如何进入 actor</h5>\n<p>DreamerV1 的行为学习目标是在想象 MDP 中最大化未来奖励。想象轨迹从真实数据推断出的状态 <span class=\"kb-math kb-math-inline\">s_\\tau</span> 开始：</p>\n<div class=\"kb-math kb-math-display\">s_{t+1} \\sim p_\\theta(s_{t+1}\\mid s_t, a_t), \\qquad\na_t \\sim q_\\phi(a_t \\mid s_t), \\qquad\n\\hat r_t = r_\\theta(s_t)</div>\n<p>为了考虑超过想象 horizon 的收益，Dreamer 使用 value model <span class=\"kb-math kb-math-inline\">v_\\psi(s_t)</span> 和 <span class=\"kb-math kb-math-inline\">\\lambda</span>-return：</p>\n<div class=\"kb-math kb-math-display\">V^\\lambda_t\n=\n\\hat r_t\n+\n\\gamma\\left(\n(1-\\lambda)v_\\psi(s_{t+1})\n+\n\\lambda V^\\lambda_{t+1}\n\\right)</div>\n<p>actor 最大化这些 imagined returns。由于动作分布采用 tanh-transformed Gaussian 并可重参数化，采样动作可以写成确定性函数 <span class=\"kb-math kb-math-inline\">a_t=f_\\phi(s_t,\\epsilon)</span>，梯度可穿过 actor、RSSM transition、reward model 和 value model：</p>\n<div class=\"kb-math kb-math-display\">\\nabla_\\phi \\mathbb{E}[V^\\lambda_t]\n\\approx\n\\nabla_\\phi V^\\lambda_t(s_t, a_t, s_{t+1}, \\dots)</div>\n<div class=\"key-point\">💡 关键：Dreamer 不是用模型生成额外 replay 给无模型算法，而是直接把可微世界模型当成训练策略的计算图。</div>\n<h5>为什么比 PlaNet 更适合长程任务</h5>\n<p>PlaNet 每步 CEM 只能优化有限 horizon 内的预测奖励，即使 horizon 加长也会让模型误差和计算成本上升。DreamerV1 的 value model 学习“horizon 之外”的回报，因此 actor 在短想象轨迹中也能获得长程信号。论文中的 horizon 消融显示，有 value model 的 Dreamer 对 imagination horizon 更鲁棒。</p>\n<p>此外，actor 学好后执行只需要一次前向推理，不必每步采样和评估大量动作序列。这让 Dreamer 训练和部署都比 PlaNet 更高效，尤其适合需要连续闭环控制的视觉任务。</p>\n<h5>与无模型 actor-critic 的区别</h5>\n<p>无模型 actor-critic 从真实 replay 或在线轨迹中学习 TD 目标，价值误差和策略更新都受真实样本数量限制。DreamerV1 在每次参数更新时可以从 replay 状态启动大量潜在想象，得到密集的模型预测奖励和价值梯度。它用模型泛化过去经验，而不是只重放过去经验。</p>\n<p>局限在于世界模型误差会影响 imagined return。DreamerV1 通过从真实后验状态启动短 horizon 想象、停止 actor/value 梯度更新世界模型、以及持续用新环境数据更新 RSSM 来控制这种误差。后续 DreamerV2 进一步把连续随机潜变量替换为离散分类潜变量，并引入 KL balancing 来提升 Atari 等离散复杂环境的建模能力。</p>",
      "quiz": {
        "q": "DreamerV1 相比 PlaNet 的关键行为学习变化是什么？",
        "options": [
          "把 RSSM 替换为纯 CNN 视频预测器",
          "用 actor-critic 在潜在想象轨迹中学习策略和值函数，减少每步在线 CEM 规划",
          "完全取消世界模型，只保留策略网络",
          "只在真实环境中用 PPO 训练 actor"
        ],
        "answer": 1,
        "explain": "DreamerV1 继承 PlaNet 的 RSSM，但不再依赖每步 CEM，而是在潜在空间中想象轨迹训练 actor 和 value。"
      }
    },
    {
      "id": "dreamerv2",
      "num": 4,
      "name": "DreamerV2",
      "fullName": "梦想家V2 (Mastering Atari)",
      "year": "2020.10",
      "org": "Google DeepMind",
      "parent": "dreamerv1",
      "paperUrl": "https://arxiv.org/abs/2010.02193",
      "projectUrl": "",
      "category": "ssm",
      "motivation": "引入离散潜在变量首次在Atari达到人类水平",
      "summary": "DreamerV2 将 Dreamer 的 RSSM 随机状态改为多个分类变量，并加入 straight-through 梯度、KL balancing 和 discount predictor，使智能体首次能只在单独训练的世界模型内部学习策略并在 55 个 Atari 游戏上达到人类水平。",
      "keyPoints": [
        "<strong>离散 RSSM 潜变量</strong>：用多个 categorical variables 替代 DreamerV1 的高斯随机状态，更适合 Atari 中离散、符号化和多模态变化",
        "<strong>straight-through estimator</strong>：前向采样 one-hot 离散状态，反向用 softmax 概率传递梯度，保持可微训练",
        "<strong>KL balancing</strong>：对 prior 学习和 posterior 正则化施加不同梯度权重，避免未训练好的 prior 过早压制表示能力",
        "<strong>discount predictor</strong>：显式预测 episode continuation，用于想象中处理终止概率和 Atari 生命/结束信号",
        "<strong>纯世界模型行为学习</strong>：actor-critic 只在固定世界模型的潜在预测中训练，证明模型足够准确可支撑高性能策略",
        "<strong>Atari 里程碑</strong>：在 200M frames、单 GPU 设置下超过 Rainbow 和 IQN 等强单 GPU model-free 基线"
      ],
      "detail": "<h5>核心示意图</h5>\n<p><img alt=\"DreamerV2 离散世界模型\" src=\"https://ar5iv.labs.arxiv.org/html/2010.02193/assets/x2.png\" />\n<em>图：DreamerV2 的世界模型用 CNN 编码图像，用 RSSM 维护确定性状态 <span class=\"kb-math kb-math-inline\">h_t</span> 与离散随机状态 <span class=\"kb-math kb-math-inline\">z_t</span>，posterior 看当前图像，prior 只根据历史和动作预测。</em></p>\n<h5>动机与背景</h5>\n<p>DreamerV1 在连续控制视觉任务上表现强，但 Atari 长期被认为更考验模型式方法：游戏包含离散事件、对象出现/消失、得分突变、终止条件和高随机性。过去 Atari 世界模型常能生成看似合理的画面，却不足以让策略在模型里学到人类水平行为。</p>\n<p>DreamerV2 的核心假设是：对于 Atari 这类离散环境，连续高斯潜变量并不是最自然的表示。论文将随机潜变量设计为 <span class=\"kb-math kb-math-inline\">32</span> 个 categorical，每个 categorical 有 <span class=\"kb-math kb-math-inline\">32</span> 个类别，组合后形成高容量但离散的 latent code。模型状态仍由确定性 GRU 状态与随机状态拼接：</p>\n<div class=\"kb-math kb-math-display\">s_t = (h_t, z_t), \\qquad z_t \\in \\{0,1\\}^{32\\times 32}</div>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># DreamerV2 world model + imagined actor-critic\nfor batch in replay_sequences:\n    embed = cnn_encoder(batch.images)\n    posterior = q_theta(z_t | h_t, embed_t)\n    prior = p_theta(z_t | h_t)\n    z_t = straight_through_sample(posterior.logits)\n    h_{t+1} = gru(h_t, z_t, action_t)\n\n    model_loss = image_nll(decoder(h_t, z_t), batch.images)\n    model_loss += reward_nll(reward_head(h_t, z_t), batch.rewards)\n    model_loss += discount_nll(discount_head(h_t, z_t), batch.discounts)\n    model_loss += kl_balance(posterior, prior, alpha)\n    optimize(world_model, model_loss)\n\nfor start in posterior_states:\n    imagined = rollout_prior_with_actor(start, horizon=H)\n    lambda_returns = compute_lambda_returns(\n        imagined.rewards, imagined.discounts, critic(imagined.states)\n    )\n    optimize(critic, loss_to_targets(lambda_returns))\n    optimize(actor, actor_objective(lambda_returns))\n</code></pre>\n<h5>离散潜变量与 straight-through 梯度</h5>\n<p>直接采样 one-hot 离散变量不可微。DreamerV2 使用 straight-through estimator，把前向值设为采样结果，但反向梯度当作 softmax 概率：</p>\n<pre><code class=\"language-python\">sample = one_hot(draw(logits))       # forward: 离散 one-hot\nprobs = softmax(logits)              # backward: 连续概率梯度\nz = sample + probs - stop_gradient(probs)\n</code></pre>\n<p>直觉上，这让模型在前向预测时真的使用离散状态，避免训练/推理不一致；反向传播时又能像连续分布一样更新 logits。相比高斯 latent，categorical latent 更容易表示“球在左/右”“敌人出现/未出现”“奖励事件发生/未发生”等离散因素。</p>\n<h5>KL balancing</h5>\n<p>RSSM 的 ELBO 里 KL 项有双重角色：训练 prior 追 posterior，也把 posterior 正则到 prior。如果 prior 还很差，强行把 posterior 拉向 prior 会削弱表征学习。DreamerV2 将 KL 梯度拆成两部分：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\mathrm{KL}}\n=\n\\alpha\\,D_{\\mathrm{KL}}(\\mathrm{sg}(q_\\theta) \\,\\|\\, p_\\theta)\n+\n(1-\\alpha)\\,D_{\\mathrm{KL}}(q_\\theta \\,\\|\\, \\mathrm{sg}(p_\\theta))</div>\n<p>第一项主要训练 prior，第二项主要约束 posterior。通过设置 <span class=\"kb-math kb-math-inline\">\\alpha</span> 更偏向 prior 学习，模型先学会预测 posterior 聚合分布，而不是过早牺牲图像和奖励信息。</p>\n<div class=\"key-point\">💡 关键：KL balancing 不是简单减小 KL 系数，而是改变 KL 对 prior 与 posterior 两边的学习速度。</div>\n<h5>行为学习与终止建模</h5>\n<p>DreamerV2 的 actor-critic 延续 DreamerV1：世界模型固定，actor 和 critic 在潜在想象中训练。不同的是，它加入 discount predictor <span class=\"kb-math kb-math-inline\">\\gamma_t</span>，让 imagined return 能处理 episode 结束：</p>\n<div class=\"kb-math kb-math-display\">V^\\lambda_t\n=\n\\hat r_t\n+\n\\hat\\gamma_t\\left((1-\\lambda)v(s_{t+1})+\\lambda V^\\lambda_{t+1}\\right)</div>\n<p>这对 Atari 很重要，因为许多游戏的生命、回合或终止状态会改变未来回报。discount predictor 让模型不仅预测“会得到什么奖励”，还预测“这个想象轨迹还能继续多久”。</p>\n<h5>与 DreamerV1 的区别</h5>\n<p>DreamerV1 已经把 PlaNet 的 CEM 替换为潜在 actor-critic，DreamerV2 则主要增强世界模型本身。离散 latent 让表示更贴合 Atari 的结构，KL balancing 稳定 prior 学习，discount head 支持终止预测。论文强调策略学习与世界模型分开：世界模型先从 replay 学习，actor/critic 的梯度不更新世界模型，这使“策略完全在模型内部学会”成为对世界模型质量的强检验。</p>\n<p>局限是 DreamerV2 仍需要对不同领域调整一些训练设置，且图像重建仍会消耗容量建模任务无关细节。DreamerV3 后续主要解决跨领域固定超参数、奖励尺度不一致和鲁棒归一化问题。</p>",
      "quiz": {
        "q": "DreamerV2 中 KL balancing 的主要目的是什么？",
        "options": [
          "让图像解码器完全不参与训练",
          "使 prior 更快追上 posterior，同时避免 posterior 被差的 prior 过早压制",
          "把离散潜变量改回连续高斯变量",
          "用环境真实状态替代像素输入"
        ],
        "answer": 1,
        "explain": "KL balancing 通过 stop-gradient 将 KL 对 prior 和 posterior 的作用拆开，鼓励 prior 学习而不过早牺牲 posterior 表示能力。"
      }
    },
    {
      "id": "dreamerv3",
      "num": 5,
      "name": "DreamerV3",
      "fullName": "梦想家V3 (Mastering Diverse Domains)",
      "year": "2023.01",
      "org": "Google DeepMind",
      "parent": "dreamerv2",
      "paperUrl": "https://arxiv.org/abs/2301.04104",
      "projectUrl": "",
      "category": "ssm",
      "motivation": "固定超参数实现跨领域通用性首次在MC收集钻石",
      "summary": "DreamerV3 在 DreamerV2 的离散世界模型和潜在 actor-critic 上加入 symlog 预测、free bits、two-hot critic 与鲁棒 return 归一化，使同一套超参数能跨连续控制、Atari、DMLab、Crafter 和 Minecraft 等多领域工作，并首次从零在 Minecraft 收集钻石。",
      "keyPoints": [
        "<strong>固定超参数跨领域</strong>：同一算法覆盖连续/离散动作、视觉/低维输入、稠密/稀疏奖励、2D/3D 环境和不同数据预算",
        "<strong>symlog / symexp 变换</strong>：对观测、奖励和值预测压缩大尺度信号，同时保留零附近近似线性",
        "<strong>free bits + KL balancing</strong>：把 dynamics loss 和 representation loss 低于 1 nat 的部分裁掉，避免过度正则化表示",
        "<strong>two-hot 离散回归</strong>：reward 和 critic 用 symlog 后的离散桶分布预测连续值，加快稀疏/多峰回报学习",
        "<strong>鲁棒 actor 目标</strong>：只缩小大 return，不放大小 return 噪声，让固定 entropy regularizer 能适配多奖励尺度",
        "<strong>可扩展性实验</strong>：模型规模从 8M 到 200M，规模增大带来更高数据效率和最终性能"
      ],
      "detail": "<h5>核心示意图</h5>\n<p><img alt=\"DreamerV3 世界模型学习\" src=\"https://ar5iv.labs.arxiv.org/html/2301.04104/assets/x3.png\" />\n<em>图：DreamerV3 的世界模型把输入编码为离散表示，RSSM 根据动作预测未来表示，并通过重建、奖励和 continuation 预测获得学习信号。</em></p>\n<p><img alt=\"DreamerV3 actor-critic 想象学习\" src=\"https://ar5iv.labs.arxiv.org/html/2301.04104/assets/x4.png\" />\n<em>图：actor 和 critic 在世界模型预测出的抽象状态轨迹中学习，二者的梯度不反向更新世界模型。</em></p>\n<h5>动机与背景</h5>\n<p>DreamerV2 已经在 Atari 上展示了离散世界模型的能力，但强化学习算法常常需要为不同领域重新调奖励尺度、KL 权重、entropy 权重和网络规模。DreamerV3 的目标不是只刷新某个 benchmark，而是让世界模型 RL 成为“拿来就能用”的通用算法。</p>\n<p>跨领域困难集中在信号尺度。Minecraft 稀疏奖励和长 horizon 与 Control Suite 稠密奖励差异极大，像素输入和低维输入的 reconstruction loss 规模也不同。如果直接用 MSE 回归大值，梯度容易爆炸；如果做运行归一化，又会引入非平稳目标。DreamerV3 用 symlog 统一处理：</p>\n<div class=\"kb-math kb-math-display\">\\mathrm{symlog}(x)=\\mathrm{sign}(x)\\log(|x|+1),\n\\qquad\n\\mathrm{symexp}(x)=\\mathrm{sign}(x)(\\exp(|x|)-1)</div>\n<p>它压缩大正值和大负值，但在零附近近似恒等，因而不会破坏小尺度任务。</p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># DreamerV3 training loop\nfor seq in replay:\n    # 1. world model\n    states = rssm.observe(symlog_inputs(seq.obs), seq.actions)\n    pred_loss = decoder_loss(states, symlog_inputs(seq.obs))\n    pred_loss += twohot_reward_loss(states, seq.rewards)\n    pred_loss += continue_binary_loss(states, seq.continues)\n\n    dyn_loss = max(1.0, kl(stop_grad(states.posterior), states.prior))\n    rep_loss = max(1.0, kl(states.posterior, stop_grad(states.prior)))\n    optimize(world_model, pred_loss + beta_dyn * dyn_loss + beta_rep * rep_loss)\n\n    # 2. actor critic in imagination\n    imagined = rollout_prior(states, actor, horizon=H)\n    returns = lambda_returns(imagined.rewards, imagined.continues, critic)\n    optimize(critic, twohot_symlog_loss(critic(imagined.states), returns))\n    scaled_returns = scale_down_large_returns(returns)\n    optimize(actor, -scaled_returns - entropy_bonus(actor))\n</code></pre>\n<h5>世界模型：free bits 与稳定 KL</h5>\n<p>DreamerV3 仍使用离散 RSSM。世界模型损失分为 prediction loss、dynamics loss 和 representation loss。dynamics loss 训练 prior 预测 posterior，representation loss 让 posterior 在包含足够信息的同时保持可预测：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\mathrm{dyn}}\n=\n\\max\\left(1, D_{\\mathrm{KL}}(\\mathrm{sg}(q)\\,\\|\\,p)\\right),\n\\quad\n\\mathcal{L}_{\\mathrm{rep}}\n=\n\\max\\left(1, D_{\\mathrm{KL}}(q\\,\\|\\,\\mathrm{sg}(p))\\right)</div>\n<p>这里的 <span class=\"kb-math kb-math-inline\">1</span> nat free bits 表示：当 KL 已经足够小时，不再继续惩罚。这样能防止模型为了让 latent 更容易预测而丢掉任务相关信息，也避免复杂 3D 视觉和简单 2D 游戏需要不同正则强度。</p>\n<h5>critic：two-hot symlog 回归</h5>\n<p>直接让 critic 用 MSE 拟合 return 的期望，会在稀疏奖励任务里学习很慢。DreamerV3 先把 return 做 symlog，再映射到两个相邻离散桶的 soft label，即 two-hot 编码。critic 输出桶分布，训练目标是交叉熵：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{V}\n=\n-\\sum_i \\mathrm{twohot}_i(\\mathrm{symlog}(R^\\lambda))\n\\log p_\\psi(i\\mid s_t)</div>\n<p>输出值则通过桶值期望再 symexp 回原尺度。这相当于让 critic 保持一个粗粒度分布，比单点回归更容易处理稀疏、双峰或长尾回报。</p>\n<h5>actor：跨奖励尺度的归一化</h5>\n<p>策略目标需要 entropy regularizer，但 entropy 权重对奖励尺度极敏感。DreamerV3 的做法不是把所有 return 标准化到单位方差，因为稀疏奖励下这会把近零噪声放大，导致策略过早确定。它只“缩小大的 return”，不“放大小的 return”，例如用 batch 的 5% 到 95% 分位范围作为尺度并设置最小阈值。</p>\n<div class=\"key-point\">💡 关键：DreamerV3 的泛化性主要来自一系列尺度处理细节，而不是单个新网络结构。</div>\n<h5>结果与意义</h5>\n<p>论文在超过 150 个任务上评估 DreamerV3，包括 Control Suite、Atari 100k/200M、BSuite、Crafter、DMLab 和 Minecraft。最受关注的是 Minecraft：在没有人类数据或手工课程的情况下，DreamerV3 从零探索并收集钻石，说明潜在世界模型可以支撑极长 horizon、稀疏奖励和开放世界任务。</p>\n<p>与 DreamerV2 相比，DreamerV3 的技术路线更像“鲁棒工程化的世界模型 RL”：保留离散 RSSM 和想象 actor-critic，但把输入/输出尺度、KL 下限、critic 表示和 actor 归一化都设计成跨任务稳定。Dreamer 4 后续则进一步把重点转向可扩展 Transformer 世界模型、离线视频数据和模型内部的长程想象训练。</p>",
      "quiz": {
        "q": "DreamerV3 中 symlog 变换的主要作用是什么？",
        "options": [
          "把所有动作空间都变成离散动作",
          "压缩大尺度正负信号，同时保留零附近近似线性，从而稳定跨领域预测",
          "替代 RSSM 中的 recurrent state",
          "让模型不再需要 replay buffer"
        ],
        "answer": 1,
        "explain": "symlog 对大幅值奖励、值和输入进行对数压缩，避免梯度尺度失控；零附近近似恒等，因此小信号不会被破坏。"
      }
    },
    {
      "id": "dreamer4",
      "num": 6,
      "name": "Dreamer 4",
      "fullName": "梦想家4 (Scalable World Models)",
      "year": "2025.09",
      "org": "Google DeepMind",
      "parent": "dreamerv3",
      "paperUrl": "https://arxiv.org/abs/2509.24527",
      "projectUrl": "",
      "category": "ssm",
      "motivation": "扩展模型规模增强长时程记忆与复杂任务想象",
      "summary": "Dreamer 4 提出基于 causal tokenizer、interactive dynamics Transformer 与 shortcut forcing 的可扩展世界模型，让智能体能在快速、高保真模型内部通过离线想象训练学习 Minecraft 长程任务，并首次仅凭离线数据获得钻石。",
      "keyPoints": [
        "<strong>三阶段训练</strong>：世界模型预训练、带任务输入的 agent finetuning、在世界模型中进行 imagination training",
        "<strong>causal tokenizer</strong>：把视频帧压缩为连续 latent tokens，并用时间因果注意力支持逐帧交互式解码",
        "<strong>interactive dynamics Transformer</strong>：在动作、噪声水平、步长和 latent 表示交织序列上建模未来",
        "<strong>shortcut forcing objective</strong>：结合 diffusion forcing 与 shortcut models，用少量采样步实现实时交互推理并降低长视频误差累积",
        "<strong>离线 Minecraft diamond challenge</strong>：仅使用固定 VPT contractor 数据集，不进行环境交互，仍能通过想象 RL 改进行为",
        "<strong>少量 action grounding</strong>：世界模型可从大量无动作视频学习视觉知识，只需少量动作标注视频学习动作条件化"
      ],
      "detail": "<h5>核心示意图</h5>\n<p><img alt=\"Dreamer 4 离线 Minecraft 结果\" src=\"https://danijar.com/asset/dreamer4/benchmark.png\" />\n<em>图：Dreamer 4 项目页展示的离线 Minecraft 里程碑结果；论文 Figure 2 的架构图描述了 causal tokenizer 与 interactive dynamics 两个模块。</em></p>\n<div class=\"warn-box\">⚠️ 注意：YAML 中的 arXiv 论文可下载，但当前 ar5iv/html 转换不可用；本文依据 arXiv PDF、摘要和作者项目页公开资料整理，并使用项目页可访问图片作为示意图。</div>\n<h5>动机与背景</h5>\n<p>DreamerV3 的 RSSM 世界模型在多领域 RL 中非常稳健，但它仍主要面向相对窄的交互分布。Dreamer 4 面对的是更接近通用视频世界模型的问题：Minecraft 有复杂物体交互、长时间记忆、UI 操作、工具使用和超过 20,000 个鼠标键盘动作的任务链。模型不仅要预测画面，还要让策略能在其中训练。</p>\n<p>论文指出，通用视频模型虽然规模大，但通常生成慢、交互动作条件弱，难以作为训练智能体的神经仿真器。Dreamer 4 因此采用高容量 Transformer 世界模型，同时针对交互式 rollout 做速度和稳定性设计。</p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># Dreamer 4 三阶段训练\n# Phase 1: World model pretraining\ntrain_tokenizer(videos, loss=mse + 0.2 * lpips, patch_dropout=True)\nz = tokenizer.encode(videos)\ntrain_dynamics_transformer(\n    tokens=z,\n    actions=optional_actions,\n    objective=shortcut_forcing_loss\n)\n\n# Phase 2: Agent finetuning\ninsert_task_tokens(dynamics_transformer)\ntrain_policy_and_reward_heads(\n    task_conditioned_sequences,\n    loss=multi_token_action_nll + multi_token_reward_nll + video_prediction_loss\n)\n\n# Phase 3: Imagination training\nfreeze_world_model_transformer()\nfor context in offline_dataset:\n    imagined = rollout_world_model(context, policy_head, K_sampling_steps=4)\n    rewards = reward_head(imagined.states)\n    lambda_returns = td_lambda(rewards, value_head(imagined.states))\n    optimize(value_head, twohot_value_loss(lambda_returns))\n    optimize(policy_head, pmpo_loss(lambda_returns, behavioral_prior))\n</code></pre>\n<h5>causal tokenizer</h5>\n<p>tokenizer 负责把原始视频压缩成 dynamics model 可处理的连续表示。它由 encoder、瓶颈和 decoder 组成，时间维度上保持因果性，因此可以在交互推理时逐帧编码和解码。训练使用 masked autoencoding：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\mathrm{tok}}\n=\n\\mathcal{L}_{\\mathrm{MSE}}\n+\n0.2\\,\\mathcal{L}_{\\mathrm{LPIPS}}</div>\n<p>patch dropout 概率随机采样，促使 latent 学到空间一致表示。与 DreamerV3 的离散 RSSM 不同，Dreamer 4 更像把视频压缩成连续 token，再让大 Transformer 学习这些 token 的动作条件化动态。</p>\n<h5>shortcut forcing 与 interactive dynamics</h5>\n<p>Dreamer 4 的 dynamics model 建在 flow matching、diffusion forcing 和 shortcut models 之上。普通 flow matching 训练网络从噪声数据 <span class=\"kb-math kb-math-inline\">x_\\tau</span> 预测指向干净数据的速度：</p>\n<div class=\"kb-math kb-math-display\">x_\\tau = (1-\\tau)x_0+\\tau x_1,\n\\qquad\n\\mathcal{L}=\\|f_\\theta(x_\\tau,\\tau)-(x_1-x_0)\\|^2</div>\n<p>shortcut models 进一步把步长 <span class=\"kb-math kb-math-inline\">d</span> 输入网络，让模型学会用较大步长直接逼近多个小步的结果。Dreamer 4 将其用于序列 latent dynamics，并偏向 <strong>x-prediction</strong>：直接预测干净表示 <span class=\"kb-math kb-math-inline\">z_1</span>，而不是预测高频速度项。这能减少逐帧生成长视频时的误差累积。</p>\n<p>论文还提出 ramp loss weight：</p>\n<div class=\"kb-math kb-math-display\">w(\\tau)=0.9\\tau+0.1</div>\n<p>低信号水平更接近纯噪声，学习信号弱；较高 <span class=\"kb-math kb-math-inline\">\\tau</span> 处更接近真实 latent，权重更大可让容量集中到对交互 rollout 更有用的区域。</p>\n<h5>agent finetuning 与想象训练</h5>\n<p>为把世界模型变成智能体，Dreamer 4 插入 task tokens，并从这些 token 上预测动作、奖励和值。动作和奖励先通过行为克隆/奖励建模学习：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}\n=\n-\\sum_{n=0}^{L}\\log p_\\theta(a_{t+n}\\mid h_t)\n-\\sum_{n=0}^{L}\\log p_\\theta(r_{t+n}\\mid h_t)</div>\n<p>随后进入想象训练：冻结主体 world model，只更新 policy/value heads。rollout 从离线数据 context 出发，模型自己生成未来 latent，policy 采样动作，reward head 给出奖励，value head 用 <span class=\"kb-math kb-math-inline\">\\lambda</span>-return 学习：</p>\n<div class=\"kb-math kb-math-display\">R^\\lambda_t\n=\nr_t+\\gamma c_t\\big((1-\\lambda)v_t+\\lambda R^\\lambda_{t+1}\\big)</div>\n<p>策略使用 PMPO，只关注 advantage 的符号而非幅值，并用 behavioral prior KL 约束策略不要离开合理行为空间。这对纯离线 RL 很关键，因为策略如果在模型内跑到离线数据之外，可能会利用世界模型漏洞。</p>\n<h5>与 DreamerV3 的区别</h5>\n<p>DreamerV3 的世界模型核心仍是 RSSM，强调固定超参数和在线/从零交互学习。Dreamer 4 则面向“大规模离线视频 + 少量动作标注 + 神经仿真器内训练”：它把 recurrent state-space model 换成 block-causal Transformer，把图像空间压缩交给 causal tokenizer，并用 shortcut forcing 让生成足够快，能支撑人类交互和策略想象训练。</p>\n<p>结果上，Dreamer 4 在 VPT contractor 数据集的离线 Minecraft diamond challenge 中，显著超过 VPT offline agent、行为克隆和基于 Gemma 3 的 VLA 行为克隆；论文还报告世界模型在 Minecraft 物体交互、人类实时操控和机器人视频交互预测上优于此前模型。其意义在于把 Dreamer 系列从“样本高效在线 RL”推进到“可从固定视频数据中训练可交互世界模型，再在模型中改进策略”。</p>",
      "quiz": {
        "q": "Dreamer 4 中 shortcut forcing 的核心作用是什么？",
        "options": [
          "用更多环境交互替代离线数据",
          "让世界模型用少量采样步生成高质量未来，从而支持实时交互和想象训练",
          "把所有视频帧重建任务替换为文本预测",
          "取消策略和值函数，只保留行为克隆"
        ],
        "answer": 1,
        "explain": "shortcut forcing 让 dynamics model 条件化于采样步长，学习用大步近似多个小步，显著减少交互生成所需前向次数。"
      }
    },
    {
      "id": "jepa",
      "num": 7,
      "name": "JEPA",
      "fullName": "联合嵌入预测架构 (Joint Embedding Predictive Architecture)",
      "year": "2022.06",
      "org": "Meta AI",
      "parent": "—",
      "paperUrl": "https://openreview.net/forum?id=BZ5a_v_S_s",
      "projectUrl": "",
      "category": "predictive",
      "motivation": "预测潜在表征而非像素避免建模噪声",
      "summary": "JEPA 提出在联合嵌入空间中预测未来或缺失部分的表征，而不是重建像素、声音或 token 细节，从而让世界模型聚焦可预测、语义相关的信息，并为层级规划和自主智能提供非生成式表征学习框架。",
      "keyPoints": [
        "<strong>非生成式预测</strong>：预测 <span class=\"kb-math kb-math-inline\">y</span> 的表征 <span class=\"kb-math kb-math-inline\">s_y</span>，而不是直接生成 <span class=\"kb-math kb-math-inline\">y</span> 本身，避免浪费容量建模不可预测细节",
        "<strong>双编码器 + predictor</strong>：<span class=\"kb-math kb-math-inline\">x</span>-encoder 产生 <span class=\"kb-math kb-math-inline\">s_x</span>，<span class=\"kb-math kb-math-inline\">y</span>-encoder 产生 <span class=\"kb-math kb-math-inline\">s_y</span>，predictor 从 <span class=\"kb-math kb-math-inline\">s_x</span> 和可选 latent <span class=\"kb-math kb-math-inline\">z</span> 预测 <span class=\"kb-math kb-math-inline\">\\hat{s}_y</span>",
        "<strong>能量式解释</strong>：预测误差 <span class=\"kb-math kb-math-inline\">D(s_y,\\hat{s}_y)</span> 可视为兼容性能量，低能量代表 <span class=\"kb-math kb-math-inline\">x</span> 与 <span class=\"kb-math kb-math-inline\">y</span> 可互相解释",
        "<strong>多模态未来表达</strong>：通过 <span class=\"kb-math kb-math-inline\">y</span>-encoder 的不变性和 predictor latent <span class=\"kb-math kb-math-inline\">z</span> 表达一个 <span class=\"kb-math kb-math-inline\">x</span> 对应多个合理 <span class=\"kb-math kb-math-inline\">y</span>",
        "<strong>非对比防坍塌</strong>：主张用信息最大化、predictability 和 latent 信息最小化等正则，而非大量负样本",
        "<strong>层级 JEPA</strong>：低层做短期细节预测，高层做长期抽象预测，为多时间尺度规划提供表征基础"
      ],
      "detail": "<h5>核心示意图</h5>\n<p><img alt=\"JEPA 通用架构\" src=\"https://ar5iv.labs.arxiv.org/html/2404.08471/assets/x2.png\" />\n<em>图：JEPA 从一个输入的表征预测另一个输入的表征，额外变量提供两者之间的变换、遮挡或时间关系信息。该图来自 V-JEPA 论文中的通用 JEPA 示意。</em></p>\n<div class=\"warn-box\">⚠️ 注意：YAML 中的 OpenReview 链接 <code>BZ5a_v_S_s</code> 当前无法直接访问；公开 OpenReview PDF 对应 Yann LeCun 的 2022 年路线论文《A Path Towards Autonomous Machine Intelligence》，本文据该论文和后续 I-JEPA/V-JEPA 公开资料整理。</div>\n<h5>动机与背景</h5>\n<p>LeCun 的 JEPA 观点针对两个问题。第一，智能体需要学习世界模型来预测未来、补全缺失信息和规划动作，但真实世界未来通常是多模态的，不适合要求模型生成唯一像素结果。第二，像素级生成模型会花费大量容量预测树叶纹理、阴影、噪声等对行为无关且不可精确预测的细节。</p>\n<p>JEPA 的核心想法是：把预测目标从数据空间移到表征空间。给定观测部分 <span class=\"kb-math kb-math-inline\">x</span> 和目标部分 <span class=\"kb-math kb-math-inline\">y</span>，编码器产生：</p>\n<div class=\"kb-math kb-math-display\">s_x = E_x(x), \\qquad s_y = E_y(y)</div>\n<p>predictor 根据 <span class=\"kb-math kb-math-inline\">s_x</span> 和可选 latent <span class=\"kb-math kb-math-inline\">z</span> 预测目标表征：</p>\n<div class=\"kb-math kb-math-display\">\\hat{s}_y = P(s_x, z)</div>\n<p>能量或损失为：</p>\n<div class=\"kb-math kb-math-display\">E(x,y,z)=D(s_y,\\hat{s}_y)</div>\n<p>如果 <span class=\"kb-math kb-math-inline\">z</span> 未知，可通过最小化能量推断：</p>\n<div class=\"kb-math kb-math-display\">F(x,y)=\\min_z D(E_y(y), P(E_x(x), z))</div>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># Generic JEPA training sketch\nfor x, y, transform_info in unlabeled_pairs:\n    sx = x_encoder(x)\n    with stop_gradient_or_target_update():\n        sy = y_encoder(y)\n\n    z = infer_or_sample_latent(transform_info)\n    pred = predictor(sx, z)\n    pred_loss = distance(pred, sy)\n\n    info_regularizer = maximize_information(sx) + maximize_information(sy)\n    latent_regularizer = minimize_information(z)\n    optimize(pred_loss + info_regularizer + latent_regularizer)\n</code></pre>\n<h5>为什么预测表征而不是像素</h5>\n<p>设 <span class=\"kb-math kb-math-inline\">x</span> 是一段车驶向岔路口的视频，<span class=\"kb-math kb-math-inline\">y</span> 是几秒后的画面。像素级模型必须决定车向左还是向右、树叶如何摆动、路面纹理如何变化；但对规划来说，关键可能只是“车的位置、速度、道路分支、潜在风险”。JEPA 允许 <span class=\"kb-math kb-math-inline\">E_y</span> 把不可预测或无关细节映射掉，使多个像素不同但语义等价的未来共享近似表征。</p>\n<p>这与生成式模型的差异很重要。生成式模型必须构造 <span class=\"kb-math kb-math-inline\">y</span> 或像素重建 <span class=\"kb-math kb-math-inline\">\\hat y</span>，损失通常迫使它解释所有低层细节；JEPA 只要求 <span class=\"kb-math kb-math-inline\">\\hat{s}_y</span> 接近 <span class=\"kb-math kb-math-inline\">s_y</span>，因此更适合学习“对任务和预测有用的抽象”。</p>\n<div class=\"key-point\">💡 关键：JEPA 的抽象不是人工规定的，而是由“可预测且信息充足”两个目标共同塑造。</div>\n<h5>防止表示坍塌</h5>\n<p>简单的 joint embedding 容易坍塌：两个 encoder 都输出常数，预测误差为零但表征无信息。JEPA 路线论文提出非对比训练原则：</p>\n<ul>\n<li><span class=\"kb-math kb-math-inline\">s_x</span> 应尽量包含 <span class=\"kb-math kb-math-inline\">x</span> 的信息</li>\n<li><span class=\"kb-math kb-math-inline\">s_y</span> 应尽量包含 <span class=\"kb-math kb-math-inline\">y</span> 的信息</li>\n<li><span class=\"kb-math kb-math-inline\">s_y</span> 应容易由 <span class=\"kb-math kb-math-inline\">s_x</span> 预测</li>\n<li>latent <span class=\"kb-math kb-math-inline\">z</span> 的信息容量应受限，避免 predictor 只靠 <span class=\"kb-math kb-math-inline\">z</span> 复制目标</li>\n</ul>\n<p>用公式概括，可写成：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\mathrm{JEPA}}\n=\nD(s_y, P(s_x,z))\n+\n\\mathcal{R}_{\\mathrm{info}}(s_x,s_y)\n+\n\\mathcal{R}_{\\mathrm{latent}}(z)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\mathcal{R}_{\\mathrm{info}}</span> 可由 VICReg、Barlow Twins、EMA target encoder、variance/covariance 正则等具体机制实现；<span class=\"kb-math kb-math-inline\">\\mathcal{R}_{\\mathrm{latent}}</span> 则限制 latent 维度、离散度、稀疏度或噪声。</p>\n<h5>层级 JEPA 与世界模型</h5>\n<p>路线论文进一步提出 H-JEPA：低层 JEPA 学习短期、细粒度预测，高层 JEPA 接收低层表征并做长期、抽象预测。这样，系统可以在不同时间尺度上规划：毫秒级动作控制依赖低层细节，分钟级路线或任务规划依赖高层状态。</p>\n<p>对具身智能而言，这意味着世界模型不必只有一个统一 latent。它可以形成从局部视觉特征、对象、事件到任务状态的层级表征，并在每层预测未来。I-JEPA 与 V-JEPA 是该思想在图像和视频上的具体实例，后续世界模型研究则进一步探索把这种表征预测用于机器人控制、视频理解和规划。</p>",
      "quiz": {
        "q": "JEPA 相比像素重建式世界模型的核心优势是什么？",
        "options": [
          "它完全不需要编码器",
          "它在表征空间预测目标，可以忽略不可预测或任务无关的低层细节",
          "它只能用于有监督分类",
          "它通过增加负样本数量来生成更清晰图像"
        ],
        "answer": 1,
        "explain": "JEPA 预测的是目标表征而非原始数据，因此模型容量集中在可预测的语义结构上，而不是纹理、噪声等细节。"
      }
    },
    {
      "id": "ijepa",
      "num": 8,
      "name": "I-JEPA",
      "fullName": "图像JEPA (Image-JEPA)",
      "year": "2023.06",
      "org": "Meta AI",
      "parent": "jepa",
      "paperUrl": "https://arxiv.org/abs/2301.08243",
      "projectUrl": "",
      "category": "predictive",
      "motivation": "通过掩码块预测学习强语义特征训练效率高",
      "summary": "I-JEPA 将 JEPA 落地到图像自监督学习：从单个上下文块预测同一图像中多个目标块的 latent representations，而不是重建像素，从而在不依赖手工数据增强的情况下高效学到语义表征。",
      "keyPoints": [
        "<strong>单视图自监督</strong>：不生成多种 crop/color jitter 视图，只从同一图像采样 context block 和 target blocks",
        "<strong>表征空间预测</strong>：target encoder 先编码完整图像 patch 表征，predictor 只预测被 mask 目标块的表征",
        "<strong>EMA target encoder</strong>：target encoder 由 context encoder 的指数滑动平均更新，配合 stop-gradient 防止坍塌",
        "<strong>语义尺度 mask</strong>：target blocks 采样较大连续区域，context block 保持足够信息但移除与 target 重叠部分",
        "<strong>ViT 可扩展性</strong>：结合 Vision Transformer，ViT-H/14 可在 ImageNet 上用 16 张 A100 于 72 小时内完成训练",
        "<strong>下游泛化</strong>：在线性分类、少样本分类、目标计数和深度预测等任务上表现强，说明表征不只服务分类"
      ],
      "detail": "<h5>核心示意图</h5>\n<p><img alt=\"I-JEPA 架构\" src=\"https://ar5iv.labs.arxiv.org/html/2301.08243/assets/x5.png\" />\n<em>图：I-JEPA 用 context encoder 处理可见上下文块，predictor 结合目标位置 mask tokens 预测目标块表征，target encoder 提供 stop-gradient 目标。</em></p>\n<h5>动机与背景</h5>\n<p>图像自监督学习主流有两类：对比/不变性方法依赖手工增强构造正样本视图，生成式方法通过 MAE 等方式重建缺失像素。前者的增强不一定适合所有任务，后者会把容量花在低层纹理和颜色细节上。I-JEPA 的目标是学习“无需手工增强、无需像素解码”的图像语义表征。</p>\n<p>给定图像 <span class=\"kb-math kb-math-inline\">x</span>，I-JEPA 先把它切成 patch token。target encoder <span class=\"kb-math kb-math-inline\">E_{\\bar\\theta}</span> 编码完整图像，得到每个 patch 的目标表征；context encoder <span class=\"kb-math kb-math-inline\">E_\\theta</span> 只处理 context block 中未被遮挡的 patch；predictor <span class=\"kb-math kb-math-inline\">P_\\phi</span> 接收 context 表征和目标位置 mask tokens，预测多个 target block 的 patch-level 表征。</p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># I-JEPA pretraining\nfor image in dataloader:\n    target_masks = sample_large_semantic_blocks(image, num_blocks=M)\n    context_mask = sample_context_block(image)\n    context_mask = remove_overlap(context_mask, target_masks)\n\n    with stop_gradient():\n        target_repr = target_encoder(image)          # EMA encoder, full image\n        targets = [target_repr[mask] for mask in target_masks]\n\n    context_tokens = image_patches(image)[context_mask]\n    context_repr = context_encoder(context_tokens)\n\n    preds = []\n    for mask in target_masks:\n        mask_tokens = positional_mask_tokens(mask)\n        preds.append(predictor(context_repr, mask_tokens))\n\n    loss = mean_distance(preds, targets)\n    optimize(context_encoder, predictor, loss)\n    update_ema(target_encoder, context_encoder)\n</code></pre>\n<h5>损失函数</h5>\n<p>I-JEPA 的目标是让预测表征接近 target encoder 给出的表征。若第 <span class=\"kb-math kb-math-inline\">i</span> 个目标块的 patch 表征为 <span class=\"kb-math kb-math-inline\">s_{y_i}</span>，预测为 <span class=\"kb-math kb-math-inline\">\\hat{s}_{y_i}</span>，可写作：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}\n=\n\\frac{1}{M}\\sum_{i=1}^{M}\nD\\left(\nP_\\phi(E_\\theta(x_{\\mathrm{ctx}}), m_i),\n\\mathrm{sg}(E_{\\bar\\theta}(x)_{m_i})\n\\right)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">m_i</span> 表示目标块位置，<span class=\"kb-math kb-math-inline\">\\mathrm{sg}</span> 表示 stop-gradient。target encoder 参数用 EMA 更新：</p>\n<div class=\"kb-math kb-math-display\">\\bar\\theta \\leftarrow \\tau\\bar\\theta + (1-\\tau)\\theta</div>\n<p>这种结构与 BYOL/data2vec 的 target network 思路相近，但 I-JEPA 的关键是“预测空间”和“mask 采样策略”。</p>\n<h5>mask 设计为什么关键</h5>\n<p>如果 target block 太小，模型可利用局部纹理补全，学到的是低层边缘和颜色；如果 context 太窄，预测任务过难且不稳定。论文强调两个条件：</p>\n<ul>\n<li>target blocks 要足够大，迫使目标表征偏向对象和语义区域</li>\n<li>context block 要信息充足且空间分布合理，但不能与 target 大量重叠</li>\n</ul>\n<div class=\"key-point\">💡 关键：I-JEPA 的语义性很大程度来自 mask 任务设计，而不仅是“把 MAE 的 decoder 换成 predictor”。</div>\n<h5>与 MAE / 对比学习的区别</h5>\n<p>MAE 预测像素，decoder 必须重建局部纹理，因此预训练表征往往需要大量 fine-tuning 才释放性能。I-JEPA 预测 target encoder 的 latent representation，避免像素解码器，计算更省，也更偏向高层语义。</p>\n<p>对比学习和 DINO/iBOT 等方法通常依赖多视图增强来定义不变性。I-JEPA 只处理单个图像视图，不需要手工设计“哪些变化应保持不变”。这让它更接近 JEPA 的一般目标：通过预测上下文与目标之间的表征关系，让系统自己形成有用抽象。</p>\n<h5>实验意义</h5>\n<p>论文报告 I-JEPA 在 ImageNet linear evaluation 上优于不使用手工增强的 MAE、CAE、data2vec 等方法，并展现良好规模化。更重要的是，I-JEPA 的表征可迁移到目标计数、深度预测等非分类任务，说明它保留了比分类标签更丰富的图像结构信息。这也是它成为 V-JEPA 和后续具身世界模型表征基础的原因。</p>",
      "quiz": {
        "q": "I-JEPA 为什么强调 target blocks 要足够大？",
        "options": [
          "为了让模型直接复制像素纹理",
          "为了让预测任务偏向语义区域，而不是只靠局部低层线索完成",
          "为了减少 target encoder 的参数量",
          "为了让 context encoder 可以看到完整目标块"
        ],
        "answer": 1,
        "explain": "大块目标更难用局部纹理猜出，迫使模型学习对象级和场景级语义表征；同时 context 会移除与目标重叠区域以避免泄漏。"
      }
    },
    {
      "id": "vjepa",
      "num": 9,
      "name": "V-JEPA",
      "fullName": "视频JEPA (Video-JEPA)",
      "year": "2024.04",
      "org": "Meta AI",
      "parent": "ijepa",
      "paperUrl": "https://arxiv.org/abs/2404.08471",
      "projectUrl": "",
      "category": "predictive",
      "motivation": "扩展至视频域学习时空特征理解物理运动",
      "summary": "V-JEPA 将 JEPA 式特征预测扩展到视频，通过遮挡大块时空区域并预测其 latent features，在不使用文本、负样本、预训练图像编码器或像素重建的情况下学习兼具外观和运动理解的视频表征。",
      "keyPoints": [
        "<strong>视频特征预测目标</strong>：从视频中可见 token 表征预测被遮挡时空 token 的 target encoder 表征",
        "<strong>无需额外监督</strong>：不使用标签、文本、负样本、预训练 image encoder 或像素级 decoder",
        "<strong>多块时空 mask</strong>：目标块为空间连续区域，并沿整个时间维重复，减少视频冗余造成的信息泄漏",
        "<strong>EMA target encoder + stop-gradient</strong>：用动量 target encoder 提供稳定目标，避免常数表示坍塌",
        "<strong>VideoMix2M 预训练</strong>：整合 HowTo100M、Kinetics、Something-Something-v2 等约 200 万公开视频",
        "<strong>冻结骨干评估强</strong>：同一 frozen backbone 在 Kinetics、Something-Something-v2、ImageNet 等外观和运动任务上表现稳健"
      ],
      "detail": "<h5>核心示意图</h5>\n<p><img alt=\"V-JEPA 训练流程\" src=\"https://ar5iv.labs.arxiv.org/html/2404.08471/assets/x3.png\" />\n<em>图：V-JEPA 丢弃视频中的可见 token 输入 context encoder，再用 predictor 和 mask tokens 预测被遮挡时空位置的 target encoder 表征。</em></p>\n<h5>动机与背景</h5>\n<p>视频理解需要同时捕获外观、运动、物体交互和时间因果。像素级视频重建方法容易把容量花在颜色、纹理、压缩噪声等低层细节上；对比学习则常依赖负样本或强增强。V-JEPA 的问题是：单独的 latent feature prediction 是否足以让视频模型学到通用表征？</p>\n<p>V-JEPA 的答案是肯定的。它沿用 JEPA 的非生成式思想，把目标定义为“预测另一个视频区域的表征”。给定视频 clip <span class=\"kb-math kb-math-inline\">x</span>，采样上下文区域 <span class=\"kb-math kb-math-inline\">x_c</span> 和目标区域 <span class=\"kb-math kb-math-inline\">x_t</span>，模型优化：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}\n=\n\\left\\|\nP_\\phi(E_\\theta(x_c), m_t)\n-\n\\mathrm{sg}(E_{\\bar\\theta}(x)_{m_t})\n\\right\\|_1</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">m_t</span> 是目标时空位置的 mask token/positional embedding，<span class=\"kb-math kb-math-inline\">E_{\\bar\\theta}</span> 是 EMA target encoder。</p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># V-JEPA pretraining\nfor video in VideoMix2M:\n    tokens = patchify_video(video)  # 3D spatio-temporal patches\n    target_masks = sample_multiblock_masks(tokens)\n    context_tokens = drop_tokens(tokens, target_masks)\n\n    context_repr = context_encoder(context_tokens)\n    with stop_gradient():\n        full_target_repr = target_encoder(tokens)\n        targets = full_target_repr[target_masks]\n\n    mask_tokens = positional_tokens(target_masks)\n    preds = predictor(context_repr, mask_tokens)\n\n    loss = l1_distance(preds, targets)\n    optimize(context_encoder, predictor, loss)\n    update_ema(target_encoder, context_encoder)\n</code></pre>\n<h5>时空 mask 设计</h5>\n<p>视频有强冗余，如果只随机遮挡少量 patch，模型可能从相邻帧和相邻像素直接插值，而不是学习运动或对象关系。V-JEPA 采样空间连续的大块区域，并把这些区域沿整个时间维重复遮挡。论文使用短程和长程 mask：短程目标覆盖较小比例，长程目标可覆盖很大比例，从而同时训练局部和全局预测能力。</p>\n<p>这种 mask 让任务更接近“根据可见场景推断被遮挡对象/动作在整段视频中的表征”，而不是补一小块纹理。对于 Something-Something-v2 这类动作类别高度依赖物体运动关系的数据集，这种时空预测尤其关键。</p>\n<h5>网络结构与目标编码器</h5>\n<p>V-JEPA 使用 ViT 视频骨干，把视频切成 3D patch tokens。context encoder 只处理未被遮挡 token，因此计算类似 MAE 一样高效；predictor 是较窄的 Transformer，接收 context 表征和 learnable mask tokens，输出每个目标 token 的表征预测。</p>\n<p>target encoder 是 context encoder 的 EMA 版本，输出 stop-gradient 目标。没有这个机制时，最简单的表征预测损失会允许 encoder 输出常数，导致坍塌。EMA target 让 predictor 追逐一个缓慢变化、信息更稳定的目标。</p>\n<div class=\"key-point\">💡 关键：V-JEPA 的“非生成式”不是不预测，而是只预测抽象特征，让模型保留对下游任务有用的运动和语义信息。</div>\n<h5>结果与意义</h5>\n<p>论文在约 200 万公开视频组成的 VideoMix2M 上预训练 ViT-L/16、ViT-H/16 和更高分辨率模型。最大模型在 frozen backbone 评估下同时覆盖外观任务和运动任务：Kinetics-400 更偏外观识别，Something-Something-v2 更考验时序和物体交互。V-JEPA 在不微调骨干的情况下表现稳健，说明特征预测能学习通用视觉表征。</p>\n<p>与 I-JEPA 相比，V-JEPA 的新增挑战是时间维冗余和运动理解；与视频 MAE 相比，它不重建像素，训练周期更短且冻结表征更强。对于具身智能，V-JEPA 提供了一个重要方向：先从大量无标签视频学习物理和时空表征，再把这些表征接入规划、控制或世界模型预测。</p>",
      "quiz": {
        "q": "V-JEPA 为什么把空间目标块沿整个时间维重复遮挡？",
        "options": [
          "为了让模型只学习单帧分类",
          "为了减少视频相邻帧泄漏，迫使模型学习更高层的时空关系",
          "为了让 target encoder 不需要 EMA 更新",
          "为了把所有视频都转换成文本数据"
        ],
        "answer": 1,
        "explain": "视频相邻帧冗余很强，若遮挡太局部，模型可直接插值；沿时间维遮挡连续区域能强化运动和对象关系预测。"
      }
    },
    {
      "id": "vjepa2",
      "num": 10,
      "name": "V-JEPA 2",
      "fullName": "视频JEPA 2 (V-JEPA 2)",
      "year": "2025.06",
      "org": "Meta AI",
      "parent": "vjepa",
      "paperUrl": "https://arxiv.org/abs/2506.09985",
      "projectUrl": "",
      "category": "predictive",
      "motivation": "增强时空推理应用于机器人规划任务",
      "summary": "V-JEPA 2 将 V-JEPA 的联合嵌入预测目标扩展到互联网规模视频预训练，并通过少量机器人轨迹后训练出 action-conditioned latent world model，解决了仅靠视觉观测学习物理预测和零样本机器人规划的问题。",
      "keyPoints": [
        "<strong>两阶段训练</strong>：先在大规模视频和图像上做 action-free V-JEPA 2 预训练，再用少量机器人交互视频训练 V-JEPA 2-AC",
        "<strong>表示空间预测</strong>：不重建像素，而是在 EMA target encoder 的 latent feature 空间预测被 mask 的时空片段",
        "<strong>规模化配方</strong>：使用 VideoMix22M、Curated-YT1B、ViT-g 级模型、长视频 clip 和高分辨率 cooldown 提升视频理解能力",
        "<strong>预测能力评估</strong>：在 Something-Something v2、EPIC-KITCHENS-100、视频问答等任务上验证 motion understanding 和 action anticipation",
        "<strong>V-JEPA 2-AC</strong>：冻结 V-JEPA 2 encoder，在 DROID 的少量 Franka 机器人视频上训练 frame-causal action-conditioned predictor",
        "<strong>图像目标规划</strong>：用 CEM 在 latent 空间搜索动作序列，最小化想象未来状态与目标图像状态的 <span class=\"kb-math kb-math-inline\">L_1</span> 距离",
        "<strong>零样本机器人部署</strong>：无需目标实验室数据、任务专用训练或奖励函数，在不同实验室的 Franka 机械臂上执行 reaching、grasping、pick-and-place"
      ],
      "detail": "<h5>核心示意图</h5>\n<p><img alt=\"V-JEPA 2 总览\" src=\"https://arxiv.org/html/2506.09985v1/x1.png\" />\n<em>图：V-JEPA 2 先从大规模视频学习视觉世界表征，再把冻结表征用于 action-conditioned world model 和机器人规划。</em></p>\n<h5>动机与背景</h5>\n<p>V-JEPA 的核心主张是“预测表征而不是预测像素”：如果模型只需要预测抽象 latent feature，它可以忽略像素级纹理噪声，集中学习物体、运动和可预测的物理结构。V-JEPA 2 的问题设置更进一步：仅从观察式视频学习到的模型，能否迁移到机器人控制，并在没有目标环境示范的情况下进行规划。</p>\n<p>V-JEPA 2 的第一阶段沿用 JEPA 风格的 masked feature prediction。给定视频 <span class=\"kb-math kb-math-inline\">v</span>，context view <span class=\"kb-math kb-math-inline\">x</span> 删除一组时空 patch，target view <span class=\"kb-math kb-math-inline\">y</span> 保留对应 patch。在线 encoder <span class=\"kb-math kb-math-inline\">E_\\theta</span> 编码 context，predictor <span class=\"kb-math kb-math-inline\">P_\\phi</span> 根据 mask 位置预测 target encoder <span class=\"kb-math kb-math-inline\">\\bar E_\\theta</span> 的表示：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{V-JEPA}} =\n\\sum_{m \\in \\mathcal{M}}\n\\left\\|\nP_\\phi(E_\\theta(x), m) - \\text{sg}(\\bar E_\\theta(y_m))\n\\right\\|_1</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\bar E_\\theta</span> 通常由 <span class=\"kb-math kb-math-inline\">E_\\theta</span> 的 EMA 更新得到，<span class=\"kb-math kb-math-inline\">\\text{sg}</span> 表示 stop-gradient。这个目标避免了生成模型必须还原每个像素的负担，使预训练更像学习“什么会发生”的语义和动力学表征。</p>\n<p>V-JEPA 2-AC 的第二阶段把冻结的视觉 encoder 变成机器人 latent dynamics 的状态抽取器。给定当前图像和动作 <span class=\"kb-math kb-math-inline\">a_t</span>，action-conditioned predictor 预测下一步或多步 latent state。论文同时使用 teacher forcing loss 和 rollout loss：前者稳定单步预测，后者让模型在把自身预测再喂回去时仍能维持多步一致性。</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{AC}} =\n\\sum_t \\|\\hat z_{t+1} - \\text{sg}(z_{t+1})\\|_1\n+ \\lambda\n\\sum_{k=1}^{H} \\|\\hat z_{t+k}^{\\text{rollout}} - \\text{sg}(z_{t+k})\\|_1</div>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># V-JEPA 2 and V-JEPA 2-AC training + planning\ninitialize(video_encoder, predictor, target_encoder_ema)\n\n# Stage 1: action-free video pretraining\nfor video in internet_video_batches:\n    context, targets, masks = sample_masked_views(video)\n    context_tokens = video_encoder(context)\n    with no_grad():\n        target_tokens = target_encoder_ema(targets)\n    pred_tokens = predictor(context_tokens, masks)\n    loss = l1(pred_tokens, target_tokens)\n    optimize(video_encoder, predictor, loss)\n    update_ema(target_encoder_ema, video_encoder)\n\n# Stage 2: robot action-conditioned world model\nfreeze(video_encoder)\ninitialize(action_predictor)\nfor frames, actions in droid_robot_batches:\n    z = video_encoder(frames)\n    one_step = action_predictor(z[:-1], actions[:-1])\n    rollout = autoregressive_rollout(action_predictor, z[0], actions, horizon=H)\n    loss = l1(one_step, stopgrad(z[1:])) + rollout_loss(rollout, stopgrad(z))\n    optimize(action_predictor, loss)\n\n# Planning with image goals\ndef plan(current_image, goal_image):\n    z0 = video_encoder(current_image)\n    zg = video_encoder(goal_image)\n    action_sequence = cem_search(\n        objective=lambda a_seq: l1(rollout(action_predictor, z0, a_seq)[-1], zg)\n    )\n    return action_sequence[0]\n</code></pre>\n<h5>训练与推理流程</h5>\n<p>在预训练时，模型看不到动作，只学习视频内部“可预测的表征结构”。这使 encoder 能捕捉物体外观、运动方向、交互关系和时间上下文。论文的规模化配方重点不只是扩大参数，还包括更丰富的视频数据、更长时域、更高分辨率和更稳定的 EMA/weight decay 训练设置。</p>\n<p>在机器人阶段，V-JEPA 2-AC 不重新学习像素世界，而是在已经具备视频理解能力的 frozen representation 上学习动作到 latent 变化的映射。这样做的直觉是：机器人数据少而昂贵，不应从零开始学习视觉语义；少量交互数据只负责告诉模型“动作如何推动世界状态变化”。</p>\n<p>规划时，任务由目标图像指定，而不是由手写奖励指定。给定当前图像和目标图像，系统在 latent 空间想象不同动作序列的结果，选择让最终 latent 最接近目标 latent 的序列：</p>\n<div class=\"kb-math kb-math-display\">a_{1:H}^{*} =\n\\arg\\min_{a_{1:H}}\n\\left\\|\n\\hat z_{t+H}(a_{1:H}) - z_{\\text{goal}}\n\\right\\|_1</div>\n<p>实际执行采用 receding-horizon control：每次只执行 CEM 搜到的第一个动作，然后重新观察、重新规划。这样可以用闭环反馈纠正模型误差，避免一次性开环 rollout 在真实机器人上漂移。</p>\n<div class=\"key-point\">💡 关键：V-JEPA 2 的“世界模型”不是像素级视频生成器，而是 latent prediction model。它牺牲像素可视化，换来更高效的物理表征、动作预测和目标图像规划。</div>",
      "quiz": {
        "q": "V-JEPA 2-AC 用于机器人规划时，为什么要在 latent 空间最小化与目标图像的距离？",
        "options": [
          "因为 latent 表征包含任务相关的物体和空间状态，比像素差更适合做目标匹配",
          "因为它需要先生成完整高清视频再计算奖励",
          "因为 CEM 只能优化离散动作，不能优化连续动作",
          "因为 target encoder 会直接输出机器人关节角"
        ],
        "answer": 0,
        "explain": "V-JEPA 2-AC 使用冻结视觉 encoder 的表征作为状态，规划目标是让想象未来状态接近目标图像状态，而不是重建像素或依赖人工奖励。"
      }
    },
    {
      "id": "vjepa21",
      "num": 11,
      "name": "V-JEPA 2.1",
      "fullName": "视频JEPA 2.1 (Understanding Physical World)",
      "year": "2026.02",
      "org": "Meta AI",
      "parent": "vjepa2",
      "paperUrl": "https://ai.meta.com/blog/v-jepa-2-1-physical-world/",
      "projectUrl": "",
      "category": "predictive",
      "motivation": "扩展至20亿参数实现80%零样本抓取成功率",
      "summary": "V-JEPA 2.1 在 V-JEPA 2 的全局视频理解基础上加入 dense predictive loss、deep self-supervision 和多模态 tokenizer，使自监督视频表征同时具备局部空间密度、时间一致性和机器人可用性。",
      "keyPoints": [
        "<strong>Dense Predictive Loss</strong>：对 masked tokens 和 visible context tokens 都施加预测损失，显式保留局部时空结构",
        "<strong>Context loss 加权</strong>：对靠近 mask 区域的 context token 赋予更高权重，增强 mask 与可见区域之间的局部连续性",
        "<strong>Deep Self-Supervision</strong>：在多个中间 encoder 层级施加自监督目标，避免最终层只保留全局语义而损失局部细节",
        "<strong>Multi-Modal Tokenizers</strong>：使用图像和视频专用 patch embedding，在共享 encoder 中联合训练静态图像和视频",
        "<strong>规模化到 ViT-G 2B</strong>：模型容量、VisionMix163M 图像数据、高分辨率 cooldown 共同提升 dense 与 global 任务表现",
        "<strong>具身任务收益</strong>：论文报告短期物体交互预测、动作预测、深度估计、语义分割、机器人抓取和导航均受益",
        "<strong>依据限制</strong>：YAML 的 <code>paper_url</code> 指向 Meta 博客；方法细节主要依据公开 arXiv 论文 <code>V-JEPA 2.1: Unlocking Dense Features in Video Self-Supervised Learning</code>"
      ],
      "detail": "<h5>核心示意图</h5>\n<p><img alt=\"V-JEPA 2.1 架构\" src=\"https://arxiv.org/html/2603.14482v2/diagrams/architecture_vjepa2_1.jpg\" />\n<em>图：V-JEPA 2.1 使用图像/视频 tokenizers、3D RoPE、multi-level encoder features 和 predictor，对 masked 与 context tokens 同时做自监督预测。</em></p>\n<h5>动机与背景</h5>\n<p>V-JEPA 2 擅长 motion understanding、action anticipation 和机器人目标规划，但其 feature map 对 dense prediction 不够友好。直观地说，原始 JEPA 目标主要监督 masked patch，visible context token 可以退化成全局信息汇聚器，导致局部边界、物体部件和深度结构在最后层表示中不够清晰。</p>\n<p>V-JEPA 2.1 的关键改动是把“预测被遮挡部分”扩展为“让所有 token 都承担局部表征责任”。设 <span class=\"kb-math kb-math-inline\">M</span> 是 masked token 集合，<span class=\"kb-math kb-math-inline\">C</span> 是 context token 集合，原始预测损失可写作：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{pred}} =\n\\frac{1}{|M|}\n\\sum_{i \\in M}\nd(\\hat y_i, \\text{sg}(y_i))</div>\n<p>V-JEPA 2.1 额外引入 context loss：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{ctx}} =\n\\frac{1}{|C|}\n\\sum_{i \\in C}\n\\lambda_i d(\\hat y_i, \\text{sg}(y_i))</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">d(\\cdot,\\cdot)</span> 是特征距离，<span class=\"kb-math kb-math-inline\">\\lambda_i</span> 与 context token 到最近 mask token 的距离有关。靠近缺失区域的 context token 更需要携带精确局部信息，因此被更强监督。总损失不只作用在最终层，还作用在多个中间层：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{V-JEPA 2.1}} =\n\\sum_{\\ell \\in \\mathcal{S}}\n\\left(\n\\mathcal{L}_{\\text{pred}}^{(\\ell)}\n+ \\mathcal{L}_{\\text{ctx}}^{(\\ell)}\n\\right)</div>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># V-JEPA 2.1 dense self-supervised training\nfor sample in image_video_batches:\n    tokens = modality_tokenizer(sample)       # 2D image patches or 3D video tubelets\n    visible, masked, mask_info = random_mask(tokens)\n\n    # Shared encoder produces multi-level context features\n    layer_features = encoder(visible, return_layers=selected_layers)\n    fused_context = mlp_fuse(layer_features)\n\n    # Predictor receives context tokens plus learnable mask tokens\n    predictions = predictor(fused_context, mask_tokens(mask_info))\n\n    loss = 0.0\n    for layer in selected_layers:\n        target = stopgrad(target_encoder(tokens, layer=layer))\n        loss += distance(predictions.masked[layer], target.masked)\n        loss += weighted_context_loss(predictions.context[layer], target.context)\n\n    optimize(encoder, predictor, modality_tokenizers, loss)\n    update_ema(target_encoder, encoder)\n</code></pre>\n<h5>方法机制拆解</h5>\n<p>Dense Predictive Loss 解决的是“表征是否能被像素级下游任务线性读出”的问题。传统 V-JEPA 表征更偏向全局语义，适合分类和动作预测；V-JEPA 2.1 要求 visible context token 自己也被预测到 target 表征，因此每个 patch 需要保留更强的位置、边界和物体部件信息。</p>\n<p>Deep Self-Supervision 解决的是“中间层有局部信息，最终层有语义信息”之间的矛盾。模型把若干中间层和最终层特征拼接，经 MLP 融合后送入 predictor，并在多个层级计算损失。这样最终层不必为了分类而完全丢掉局部结构，dense downstream task 也不再强依赖多层 probing。</p>\n<p>Multi-Modal Tokenizer 让同一个 encoder 同时吃图像和视频。图像提供大规模外观、物体和边界多样性，视频提供运动、时序和物理连续性。V-JEPA 2.1 通过模态专用 patch embedding、3D RoPE 和 modality embedding 把二者纳入统一表征学习流程。</p>\n<p>在机器人任务中，dense feature 的价值尤其直接。抓取和导航不仅需要知道“这是什么物体”，还需要知道物体边界、深度关系和相对位置。V-JEPA 2.1 改善的局部空间结构可以让后续 latent planner 更准确地估计目标物和夹爪之间的几何关系。</p>\n<div class=\"key-point\">💡 关键：V-JEPA 2.1 不是把 V-JEPA 变成像素重建模型，而是在表征预测目标中补上 context token 和中间层监督，使 latent feature 同时服务全局理解和局部控制。</div>",
      "quiz": {
        "q": "V-JEPA 2.1 中 context loss 的核心作用是什么？",
        "options": [
          "让可见 token 也被自监督约束，从而保留局部空间结构",
          "把所有视频帧压缩成单个全局分类 token",
          "替代 target encoder 的 EMA 更新",
          "只提升文本问答任务，与视觉密集任务无关"
        ],
        "answer": 0,
        "explain": "context loss 对 visible context tokens 也施加预测约束，避免它们只做全局汇聚，从而提升分割、深度和机器人几何理解。"
      }
    },
    {
      "id": "videogpt",
      "num": 12,
      "name": "VideoGPT",
      "fullName": "视频GPT (VideoGPT)",
      "year": "2021.04",
      "org": "UC Berkeley",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2104.10157",
      "projectUrl": "",
      "category": "generative",
      "motivation": "利用VQ-VAE和Transformer自回归生成视频",
      "summary": "VideoGPT 用 3D VQ-VAE 将视频压缩为离散时空 latent token，再用 GPT 式 Transformer 自回归建模 token 序列，解决了直接在像素空间生成视频维度过高、训练和采样成本过大的问题。",
      "keyPoints": [
        "<strong>两阶段生成框架</strong>：先训练 VQ-VAE tokenizer，再训练 autoregressive Transformer prior",
        "<strong>3D VQ-VAE</strong>：用 3D convolution 和 transposed convolution 在时间与空间上共同下采样和上采样",
        "<strong>Axial self-attention</strong>：在 VQ-VAE residual block 中加入轴向注意力，提升重建和生成质量",
        "<strong>离散 latent prior</strong>：把视频 latent 展平成序列，用 GPT-like masked self-attention 预测下一个 code",
        "<strong>时空位置编码</strong>：为 latent token 注入空间和时间位置信息，使 Transformer 能区分帧内位置和帧间顺序",
        "<strong>条件生成扩展</strong>：通过 cross-attention 做帧条件生成，通过 conditional LayerNorm 做动作或类别条件生成",
        "<strong>基准验证</strong>：在 BAIR Robot Pushing、UCF-101、TGIF、ViZDoom 等数据上展示无条件、单帧条件、动作条件视频生成"
      ],
      "detail": "<h5>核心示意图</h5>\n<p><img alt=\"VideoGPT 训练流程\" src=\"https://raw.githubusercontent.com/wilson1yan/VideoGPT/master/VideoGPT.png\" />\n<em>图：VideoGPT 先把视频编码为离散 latent codes，再用 Transformer 预测 latent 序列，最后由 VQ-VAE decoder 还原为视频。</em></p>\n<h5>动机与背景</h5>\n<p>视频生成比图像生成难，核心原因是输入维度同时沿空间和时间膨胀。若直接用自回归模型预测每个像素，序列长度巨大，训练和采样都很慢。VideoGPT 的选择是保留 likelihood-based autoregressive model 的稳定训练优势，但把建模对象从像素换成 VQ-VAE 的离散 latent token。</p>\n<p>第一阶段训练 VQ-VAE。encoder <span class=\"kb-math kb-math-inline\">E</span> 把视频 <span class=\"kb-math kb-math-inline\">x</span> 映射到连续 latent，再通过 codebook <span class=\"kb-math kb-math-inline\">e_k</span> 做最近邻量化，decoder <span class=\"kb-math kb-math-inline\">G</span> 重建视频。典型目标为：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{VQ}} =\n\\|x - G(z_q)\\|_2^2\n+ \\|\\text{sg}(E(x)) - z_q\\|_2^2\n+ \\beta \\|E(x) - \\text{sg}(z_q)\\|_2^2</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">z_q</span> 是量化后的 codebook embedding，第二项训练 codebook，第三项是 commitment loss。VideoGPT 的 VQ-VAE 在 encoder/decoder 中使用 3D 卷积处理视频时空结构，并在 residual block 中用 axial attention 增强长程依赖。</p>\n<p>第二阶段训练 GPT prior。将离散 code <span class=\"kb-math kb-math-inline\">z_{1:N}</span> 展平成序列后，Transformer 学习：</p>\n<div class=\"kb-math kb-math-display\">p_\\theta(z_{1:N}) =\n\\prod_{i=1}^{N} p_\\theta(z_i \\mid z_{&lt;i})</div>\n<p>条件生成时，可以把单帧或前缀帧编码成条件表示，通过 cross-attention 输入 prior；动作或类别则可以通过 conditional normalization 调制 Transformer 层。</p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># Stage 1: train video tokenizer\nfor video in video_batches:\n    z_e = encoder_3d_conv_axial_attn(video)\n    z_q, code_ids = nearest_codebook_lookup(z_e)\n    recon = decoder_3d_deconv_axial_attn(z_q)\n    loss = recon_loss(video, recon)\n    loss += codebook_loss(stopgrad(z_e), z_q)\n    loss += beta * commitment_loss(z_e, stopgrad(z_q))\n    optimize(vqvae, loss)\n\n# Stage 2: train autoregressive prior\nfreeze(vqvae)\nfor video in video_batches:\n    code_ids = vqvae.encode_to_codes(video)\n    seq = flatten_spacetime(code_ids)\n    logits = transformer_prior(seq[:-1], position=&quot;spacetime&quot;)\n    loss = cross_entropy(logits, seq[1:])\n    optimize(transformer_prior, loss)\n\n# Sampling\nseq = autoregressive_sample(transformer_prior, condition=optional_context)\nvideo = vqvae.decode_from_codes(unflatten_spacetime(seq))\n</code></pre>\n<h5>方法机制拆解</h5>\n<p>VideoGPT 的核心不是提出复杂的新模块，而是把两个成熟组件组合成一个可复现的视频生成基线。VQ-VAE 负责去除视频中的低层冗余，Transformer 负责建模高层离散序列的时空依赖。这样既避免 GAN 的训练不稳定，也避免像素自回归的巨大计算成本。</p>\n<p>3D convolution 的作用是让 tokenizer 从一开始就把时间维度纳入压缩，而不是逐帧编码。若只逐帧压缩，prior 仍要独自学习大量运动一致性；3D tokenizer 能把局部运动模式编码进 latent token，降低 prior 的负担。</p>\n<p>Axial attention 是 VideoGPT 在 VQ-VAE 里提升建模能力的重要细节。完整时空 self-attention 成本高，轴向注意力分解为沿时间、高度、宽度等轴分别建模，使局部长程依赖更可控。论文的消融表明，加入 axial attention 的 VQ-VAE 重建和生成质量更好。</p>\n<p>与传统视频 GAN 相比，VideoGPT 的优点是目标函数明确、可以用 likelihood 和 cross entropy 训练、条件生成接口自然。缺点也很直接：自回归采样仍然逐 token 进行，长视频生成会变慢，且 codebook 压缩质量限制了最终像素质量。</p>\n<div class=\"key-point\">💡 关键：VideoGPT 的“GPT”不是处理文本，而是处理 VQ-VAE 离散视频 token；它把视频生成转化为离散时空 token 的语言建模问题。</div>",
      "quiz": {
        "q": "VideoGPT 为什么先训练 VQ-VAE 再训练 Transformer prior？",
        "options": [
          "为了把高维视频压缩为更短的离散 latent 序列，降低自回归建模成本",
          "为了让 Transformer 直接预测 RGB 像素",
          "为了完全避免使用位置编码",
          "为了把视频生成改成监督分类任务"
        ],
        "answer": 0,
        "explain": "VQ-VAE 去除时空冗余并生成离散 code，Transformer 只需在压缩后的 token 空间建模序列分布。"
      }
    },
    {
      "id": "teco",
      "num": 13,
      "name": "TECO",
      "fullName": "时序一致Transformer (Temporally Consistent Transformer)",
      "year": "2023.07",
      "org": "Google Research",
      "parent": "videogpt",
      "paperUrl": "http://proceedings.mlr.press/v202/yan23b.html",
      "projectUrl": "",
      "category": "generative",
      "motivation": "弱瓶颈潜在表示解决长视频时空一致性",
      "summary": "TECO 通过“高质量 VQ latent 压缩 - temporal causal transformer - spatial MaskGIT 展开”的结构，在保持长上下文的同时降低注意力成本，解决了 VideoGPT 类模型长视频生成中内容遗忘和时序不一致的问题。",
      "keyPoints": [
        "<strong>面向长时域一致性</strong>：关注物体离开视野后再出现时是否保持一致，而不只评估短 horizon 清晰度",
        "<strong>三类长依赖基准</strong>：构建 DMLab 迷宫、Minecraft 世界、Habitat 室内场景等部分可观测 3D 视频预测数据集",
        "<strong>VQ latent dynamics</strong>：先用 VQ-GAN/VQ tokenizer 将图像帧压缩成离散视觉 token",
        "<strong>弱瓶颈压缩</strong>：将高分辨率时空 token 序列进一步压成较少 temporal embeddings，显著降低长序列注意力开销",
        "<strong>Temporal causal transformer</strong>：在压缩后的时间序列上建模长程动态，支持数百帧上下文",
        "<strong>Spatial MaskGIT prior</strong>：在每个时间步并行迭代生成空间 token，比纯自回归逐 token 采样更快",
        "<strong>强于滑窗方法</strong>：相比只能看短窗口的模型，TECO 更能记住全局地图、场景布局和被遮挡对象"
      ],
      "detail": "<h5>核心示意图</h5>\n<p><img alt=\"TECO 架构\" src=\"https://raw.githubusercontent.com/wilson1yan/teco/master/TECO.png\" />\n<em>图：TECO 将视频 token 压缩到更短的时间表征，在 temporal transformer 中建模长程依赖，再通过 spatial MaskGIT 还原每帧 token。</em></p>\n<h5>动机与背景</h5>\n<p>VideoGPT 证明了“VQ tokenizer + Transformer prior”可以用于视频生成，但长视频里有一个硬问题：如果直接对所有时空 token 做 Transformer，注意力复杂度随 token 数平方增长；如果用滑动窗口分段生成，模型只能看到短历史，物体、地图和场景布局很容易在长程 rollout 中漂移。</p>\n<p>TECO 的核心假设是，长程一致性并不要求 temporal transformer 处理每个空间位置的所有细节。模型可以先把一帧的 VQ token 压成较少的 latent embeddings，让 temporal module 负责“场景状态和动态记忆”，再让 spatial generator 负责把该时间步展开成清晰图像。</p>\n<p>设输入视频为 <span class=\"kb-math kb-math-inline\">x_{1:T}</span>，VQ tokenizer 得到离散 token <span class=\"kb-math kb-math-inline\">z_{1:T}</span>。TECO 学习压缩表征 <span class=\"kb-math kb-math-inline\">h_t</span>，并在时间上自回归建模：</p>\n<div class=\"kb-math kb-math-display\">h_t = C_\\psi(z_t), \\quad\np_\\theta(h_{1:T}) =\n\\prod_{t=1}^{T} p_\\theta(h_t \\mid h_{&lt;t}, a_{&lt;t})</div>\n<p>随后 spatial MaskGIT 根据 <span class=\"kb-math kb-math-inline\">h_t</span> 和可见/已生成 token 预测该帧的空间 token：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{mask}} =\n-\\mathbb{E}_{z,m}\n\\left[\n\\log p_\\omega(z \\mid z \\odot m, h_t)\n\\right]</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">m</span> 是随机 mask。MaskGIT 在推理时可以多轮并行填充 token，而不是像 VideoGPT 那样完全逐 token 自回归，因此采样速度更好。</p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># TECO training\nfreeze_or_train_vq_tokenizer()\ninitialize(spatial_compressor, temporal_transformer, spatial_maskgit)\n\nfor video, actions in long_video_batches:\n    z = vq_tokenizer.encode(video)            # [T, H, W] discrete codes\n    h = spatial_compressor(z)                 # [T, small_h, small_w, dim]\n\n    # Long-horizon dynamics over compressed temporal states\n    h_pred = temporal_transformer(h[:-1], actions[:-1])\n    temporal_loss = cross_entropy_or_regression(h_pred, stopgrad(h[1:]))\n\n    # Spatial reconstruction/prediction with MaskGIT\n    masked_z, mask = random_mask(z)\n    logits = spatial_maskgit(masked_z, h, mask)\n    maskgit_loss = cross_entropy(logits[mask], z[mask])\n\n    optimize(spatial_compressor, temporal_transformer, spatial_maskgit,\n             temporal_loss + maskgit_loss)\n\n# TECO sampling\nz_context = vq_tokenizer.encode(context_frames)\nh_context = spatial_compressor(z_context)\nfor t in future_steps:\n    h_t = temporal_transformer.sample_next(h_context, actions)\n    z_t = maskgit_iterative_decode(spatial_maskgit, h_t)\n    append(h_context, spatial_compressor(z_t))\nvideo = vq_tokenizer.decode(all_z)\n</code></pre>\n<h5>方法机制拆解</h5>\n<p>TECO 的“弱瓶颈”很重要。瓶颈太强会牺牲画面细节，导致生成模糊或语义丢失；瓶颈太弱又会让 temporal transformer 面对过长序列。TECO 在二者之间折中：长程模块只看压缩状态，空间细节由 MaskGIT 根据当前 latent state 并行恢复。</p>\n<p>Temporal transformer 使用 causal mask，因此未来帧只能依赖过去帧和动作条件。这与世界模型的预测需求一致：给定历史和动作，预测下一段视觉状态。对于 DMLab、Minecraft、Habitat 这类部分可观测 3D 场景，模型必须记住曾经看到但当前不可见的空间布局。</p>\n<p>Spatial MaskGIT 与纯自回归 decoder 的区别在于生成顺序。纯 AR decoder 每次只生成一个 token，误差和采样时间都随空间 token 数累积；MaskGIT 每轮填充一批 token，并用置信度机制逐步 refine，因此可以更快生成整帧，同时保持清晰度。</p>\n<p>与传统 FitVid、CW-VAE 或短窗口 latent models 相比，TECO 的优势不是单帧重建更锐利，而是可以把长视频中的“世界状态”传递得更久。论文的长 horizon benchmark 正是为了评估模型是否在回到同一地点时记住原来的几何和物体。</p>\n<div class=\"warn-box\">⚠️ 注意：TECO 的核心收益来自架构化分工。VQ tokenizer 负责压缩和像素还原，temporal transformer 负责长程状态，MaskGIT 负责空间细节。把三者合成一个巨大时空 Transformer 会明显增加长序列成本。</div>",
      "quiz": {
        "q": "TECO 为什么要先把每帧 VQ token 压缩成更少的 temporal embeddings？",
        "options": [
          "为了让 temporal transformer 能在数百帧上建模长程依赖，同时避免完整时空注意力的平方开销",
          "为了完全丢弃空间信息，只保留动作标签",
          "为了让模型只能生成单帧图像",
          "为了把 MaskGIT 替换成像素级 GAN"
        ],
        "answer": 0,
        "explain": "弱瓶颈压缩降低了长视频序列长度，temporal transformer 负责长期记忆，spatial MaskGIT 再恢复每帧细节。"
      }
    },
    {
      "id": "gaia1",
      "num": 14,
      "name": "GAIA-1",
      "fullName": "自动驾驶生成式AI (Generative AI for Autonomy)",
      "year": "2023.10",
      "org": "Wayve",
      "parent": "videogpt",
      "paperUrl": "https://arxiv.org/abs/2309.17080",
      "projectUrl": "",
      "category": "generative",
      "motivation": "9B参数模型预测驾驶场景理解交通规则",
      "summary": "GAIA-1 将自动驾驶世界建模表述为多模态 token 的下一 token 预测问题，用视频、文本和动作条件生成可控驾驶视频，解决了真实道路长尾场景难以穷尽采集和测试的问题。",
      "keyPoints": [
        "<strong>多模态输入</strong>：同时利用视频、文本和动作信号，生成真实感驾驶场景",
        "<strong>统一 token 序列建模</strong>：将视频和文本离散化为 token，将速度、曲率等动作标量投影到共享表示",
        "<strong>自回归 world model</strong>：核心 6.5B 参数 Transformer 根据历史图像 token、文本 token 和动作 token 预测未来图像 token",
        "<strong>视频扩散解码器</strong>：2.6B 参数 diffusion decoder 将预测出的图像 token 转回像素视频，提高视觉真实感和时序一致性",
        "<strong>总规模超过 9B 参数</strong>：Wayve 技术报告版本比早期 1B GAIA-1 扩展到 9B 级别",
        "<strong>驾驶数据训练</strong>：使用 2019-2023 年在伦敦采集的约 4,700 小时专有驾驶数据",
        "<strong>可控生成能力</strong>：支持未来 rollout、文本改写场景属性、动作控制 ego vehicle 行为、无条件采样等模式"
      ],
      "detail": "<h5>核心示意图</h5>\n<p><img alt=\"GAIA-1 模型架构\" src=\"https://wayve.ai/wp-content/uploads/2023/09/gaia_schematic_animated_v2.gif\" />\n<em>图：GAIA-1 将视频、文本和动作编码到共享 token 序列，经 autoregressive transformer 预测未来 token，再用视频 diffusion decoder 还原为驾驶视频。</em></p>\n<h5>动机与背景</h5>\n<p>自动驾驶系统需要理解未来可能发生什么，尤其是 ego vehicle 的动作会如何改变周围交通参与者和道路状态。真实世界采集覆盖不了所有危险组合，传统仿真又常缺少视觉真实感和行为多样性。GAIA-1 的目标是做一个神经世界模型，让模型从真实驾驶数据中学习“场景如何随动作和语义条件演化”。</p>\n<p>GAIA-1 把世界建模转成类似语言模型的 next-token prediction。给定历史视频 token <span class=\"kb-math kb-math-inline\">v_{\\le t}</span>、文本 token <span class=\"kb-math kb-math-inline\">c</span> 和动作 token <span class=\"kb-math kb-math-inline\">a_{t:t+H}</span>，world model 学习未来视觉 token 分布：</p>\n<div class=\"kb-math kb-math-display\">p_\\theta(v_{t+1:t+H} \\mid v_{\\le t}, c, a_{t:t+H})\n=\n\\prod_{i=t+1}^{t+H}\np_\\theta(v_i \\mid v_{&lt;i}, c, a_{t:i})</div>\n<p>视频 tokenizer/encoder 负责把视觉输入离散化，文本 encoder 负责将提示词变成条件 token，动作 encoder 则把速度、曲率等连续控制量投影到同一个时间轴上。所有条件在时间上对齐后输入 Transformer。</p>\n<p>生成出的并不是最终像素，而是未来图像 token。GAIA-1 再用视频 diffusion decoder 将 token 转换为像素空间视频。这个设计结合了 autoregressive token model 的可控序列建模能力和 diffusion decoder 的高保真视觉生成能力。</p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># GAIA-1 world model training\ninitialize(video_encoder, text_encoder, action_encoder)\ninitialize(autoregressive_world_model, video_diffusion_decoder)\n\nfor clip, text_prompt, ego_actions in driving_batches:\n    video_tokens = video_encoder.discretize(clip)\n    text_tokens = text_encoder(text_prompt)\n    action_tokens = action_encoder(ego_actions)  # speed, curvature, steering-like signals\n\n    aligned_tokens = temporal_align(video_tokens, text_tokens, action_tokens)\n    logits = autoregressive_world_model(aligned_tokens[:-1])\n    token_loss = cross_entropy(logits, video_tokens[1:])\n\n    predicted_tokens = sample_or_teacher_force(logits)\n    reconstructed_video = video_diffusion_decoder(predicted_tokens)\n    decoder_loss = diffusion_reconstruction_loss(reconstructed_video, clip)\n\n    optimize(all_trainable_modules, token_loss + decoder_loss)\n\n# Controlled generation\ncontext_tokens = video_encoder.discretize(context_video)\ncondition = encode(text=&quot;make it snowy at night&quot;, actions=future_speed_curvature)\nfuture_tokens = autoregressive_sample(world_model, context_tokens, condition)\nfuture_video = video_diffusion_decoder(future_tokens)\n</code></pre>\n<h5>方法机制拆解</h5>\n<p>GAIA-1 的文本条件可以修改场景属性，例如天气、光照、交通灯颜色或道路状态；动作条件可以控制 ego vehicle 的未来行为，例如转向、速度和曲率。多模态条件让生成结果不仅是“看起来像驾驶视频”，还可以成为可干预的 what-if 场景。</p>\n<p>与 VideoGPT 相比，GAIA-1 的任务更具体也更具控制需求。VideoGPT 主要展示通用视频生成，而 GAIA-1 面向自动驾驶：它需要生成道路几何、交通参与者、信号灯、车道线和 ego motion 之间的耦合关系。这要求模型同时学习视觉语义和交通动力学。</p>\n<p>与传统仿真相比，GAIA-1 不依赖显式建模所有几何和材质，而是从真实驾驶视频中学习分布。优势是视觉真实感和场景多样性更强；限制是自回归长视频生成计算成本高，且 GAIA-1 技术报告阶段主要聚焦单摄像头输出，完整多相机闭环评估仍是后续方向。</p>\n<div class=\"key-point\">💡 关键：GAIA-1 的世界模型不是单纯的视频生成器，而是条件化的驾驶未来预测器。动作条件使它能回答“如果车这样开，场景会怎样变化”。</div>",
      "quiz": {
        "q": "GAIA-1 将驾驶世界建模为 next-token prediction 的主要好处是什么？",
        "options": [
          "可以把视频、文本和动作统一到序列建模框架中，并预测可控的未来驾驶场景",
          "可以完全不需要驾驶视频数据",
          "可以只用单帧图像完成所有交通规则推理",
          "可以避免任何形式的视频解码器"
        ],
        "answer": 0,
        "explain": "GAIA-1 把不同模态映射为 token 序列，用自回归 Transformer 预测未来视觉 token，再由视频扩散解码器生成像素视频。"
      }
    },
    {
      "id": "genie",
      "num": 15,
      "name": "Genie",
      "fullName": "精灵 (Generative Interactive Environments)",
      "year": "2024.02",
      "org": "Google DeepMind",
      "parent": "videogpt",
      "paperUrl": "https://arxiv.org/abs/2402.15391",
      "projectUrl": "",
      "category": "generative",
      "motivation": "从无标注视频学习生成式交互环境",
      "summary": "Genie 从无动作标注的互联网视频中同时学习视频 tokenizer、latent action model 和 dynamics model，使用户能用离散 latent action 逐帧控制生成环境，解决了交互式世界模型依赖人工动作标签和特定环境数据的问题。",
      "keyPoints": [
        "<strong>生成式交互环境</strong>：不是只生成固定视频，而是根据用户动作逐帧生成可交互轨迹",
        "<strong>三组件架构</strong>：spatiotemporal video tokenizer、latent action model、autoregressive dynamics model",
        "<strong>无动作标签学习</strong>：latent action model 从相邻帧中推断动作 code，不依赖游戏手柄、机器人控制或人工标注",
        "<strong>VQ tokenization</strong>：视频 tokenizer 将原始帧压缩为离散 token，降低 dynamics model 的建模难度",
        "<strong>ST-transformer</strong>：空间层和时间层分解注意力，处理视频 token 的高维时空结构",
        "<strong>MaskGIT dynamics</strong>：给定历史视频 token 和 latent actions，预测下一帧 token",
        "<strong>规模化 foundation world model</strong>：最终模型达到 11B 级别，可由文本生成图、手绘图、照片等作为 prompt 启动",
        "<strong>潜在动作可迁移</strong>：学到的 latent action 可用于从未见过的视频中提取行为标签，支持 imitation/behavior cloning 实验"
      ],
      "detail": "<h5>核心示意图</h5>\n<p><img alt=\"Genie 模型训练\" src=\"https://arxiv.org/html/2402.15391v1/figures/genie_architecture.png\" />\n<em>图：Genie 将视频帧 token 化，latent action model 从相邻帧推断动作，dynamics model 根据历史 token 和 latent action 预测后续帧。</em></p>\n<h5>动机与背景</h5>\n<p>传统世界模型常需要动作标签：游戏环境有按键，机器人数据有关节或末端执行器动作。但互联网视频绝大多数没有动作标注。Genie 的核心问题是：能否仅从视频帧变化中反推出“可控动作空间”，并把这个动作空间用于生成可交互环境。</p>\n<p>Genie 的 video tokenizer 将视频帧 <span class=\"kb-math kb-math-inline\">x_{1:T}</span> 压缩成离散 token：</p>\n<div class=\"kb-math kb-math-display\">z_{1:T} = \\text{Tokenizer}(x_{1:T})</div>\n<p>latent action model 观察相邻帧，推断中间动作：</p>\n<div class=\"kb-math kb-math-display\">a_t = \\text{LAM}(x_t, x_{t+1})</div>\n<p>dynamics model 则学习在历史 token 和 latent actions 条件下预测下一帧 token：</p>\n<div class=\"kb-math kb-math-display\">p_\\theta(z_t \\mid z_{&lt;t}, a_{&lt;t})</div>\n<p>这个分解让 Genie 可以在推理时接受用户选择的 latent action。虽然用户最初不知道每个 latent action 的含义，但论文观察到动作含义在不同 prompt 中相对一致，类似学习一个新游戏手柄的按键映射。</p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># Phase 1: train video tokenizer\nfor video in unlabeled_video_batches:\n    z = tokenizer.encode(video)\n    recon = tokenizer.decode(z)\n    loss = reconstruction_loss(video, recon) + vq_commitment_loss(z)\n    optimize(tokenizer, loss)\n\n# Phase 2: train latent action model and dynamics model\nfreeze(tokenizer)\nfor video in unlabeled_video_batches:\n    z = tokenizer.encode(video)\n    latent_actions = lam(video[:-1], video[1:])  # inferred from pixels\n\n    logits = dynamics_model(z[:-1], stopgrad(latent_actions))\n    loss = token_prediction_loss(logits, z[1:])\n    loss += latent_action_regularization(latent_actions)\n    optimize(lam, dynamics_model, loss)\n\n# Interactive inference\nz_current = tokenizer.encode(prompt_frame)\nwhile user_or_agent_is_playing:\n    action_id = get_discrete_latent_action()\n    z_next = dynamics_model.sample_next(z_current, action_id)\n    frame_next = tokenizer.decode(z_next)\n    render(frame_next)\n    z_current = append_context(z_current, z_next)\n</code></pre>\n<h5>方法机制拆解</h5>\n<p>Video tokenizer 是 Genie 的视觉基础。它把原始帧转换为离散 token，使 dynamics model 不必直接生成像素。论文使用 spatiotemporal transformer tokenizer，并发现扩大 decoder 比扩大 encoder 更有效，因为最终交互体验对解码质量敏感。</p>\n<p>Latent Action Model 是 Genie 与普通视频生成模型的关键区别。它不是从外部动作标签学习，而是通过相邻帧变化学习一个离散动作 codebook。这个 codebook 不必对应人类语义中的“左、右、跳”，但如果同一 code 在不同场景中产生一致变化，它就可以作为可控接口。</p>\n<p>Dynamics model 接收历史 video tokens 和 latent actions，生成下一帧 token。它本质上是一个 action-conditioned video model，但动作来自模型自己从无标注视频中学习到的 latent space。这样，Genie 可以从平台游戏、机器人视频或其他互联网视频中学习交互规则。</p>\n<p>与 VideoGPT 相比，Genie 多了 latent action inference 和交互式闭环。VideoGPT 更像一次性采样视频序列，Genie 则每一步接收动作、生成观察、再接收动作。这个“frame-by-frame control”是把视频生成模型转化为环境模拟器的关键。</p>\n<div class=\"key-point\">💡 关键：Genie 的动作不是人工给定的真实动作，而是从视频变化中自监督发现的 latent action。只要这些动作在生成时保持一致，用户或 agent 就能把它当作控制接口。</div>",
      "quiz": {
        "q": "Genie 能在无动作标注视频上学习交互控制，关键依赖哪个模块？",
        "options": [
          "Latent Action Model，从相邻帧中推断离散潜在动作",
          "只用于图像分类的线性 probe",
          "人工编写的游戏物理引擎",
          "固定的真实键盘动作标签"
        ],
        "answer": 0,
        "explain": "LAM 从视频帧变化中学习 latent action code，使 dynamics model 可以在没有真实动作标签的情况下变成 action-conditioned world model。"
      }
    },
    {
      "id": "sora",
      "num": 16,
      "name": "Sora",
      "fullName": "空 (Sora)",
      "year": "2024.02",
      "org": "OpenAI",
      "parent": "videogpt",
      "paperUrl": "https://openai.com/research/video-generation-models-as-world-simulators",
      "projectUrl": "",
      "category": "generative",
      "motivation": "展现对重力碰撞等物理规律的直觉理解",
      "summary": "Sora 将不同长度、分辨率和宽高比的视频/图像压缩为空间-时间 latent patches，并用文本条件 diffusion transformer 生成最长约一分钟的视频，展示了大规模视频生成模型向通用世界模拟器演化的潜力。",
      "keyPoints": [
        "<strong>统一视觉 patch 表示</strong>：先压缩视频到 latent space，再切成 spacetime patches 作为 Transformer token",
        "<strong>Diffusion Transformer</strong>：在带噪 latent patches 和文本条件下预测干净 patches，而不是逐像素或逐 token 自回归采样",
        "<strong>原生尺寸训练</strong>：支持可变时长、分辨率和宽高比，避免传统固定裁剪导致的构图损失",
        "<strong>文本条件增强</strong>：使用视频重描述和 GPT prompt expansion，提高文本遵循和细节可控性",
        "<strong>多输入能力</strong>：除 text-to-video 外，还支持图像动画、视频延展、视频编辑和视频插值",
        "<strong>涌现模拟能力</strong>：在 3D 一致性、长程物体持久性、简单交互、Minecraft 类数字世界模拟上表现出规模化收益",
        "<strong>依据限制</strong>：OpenAI 技术报告明确未公开完整模型和实现细节，因此本文按公开报告中的方法框架进行精读"
      ],
      "detail": "<h5>核心示意图</h5>\n<p><img alt=\"Sora spacetime patches\" src=\"https://images.ctfassets.net/kftzwdyauwt9/1d2955dd-9d05-4f33-13073dc9301d/8dc0bae8cb98054d083ab3cc3ade6859/figure-patches.png?fm=webp&amp;q=90&amp;w=3840\" />\n<em>图：Sora 将视频压缩为 latent 表示，再切成 spacetime patches，让 Transformer 能在不同尺寸和时长的视频上训练。</em></p>\n<h5>动机与背景</h5>\n<p>许多早期视频生成方法只训练固定尺寸、固定长度的短片段，例如把所有视频裁剪成 4 秒、256x256。这样做简化了训练，但丢失了真实视频的构图、纵横比、镜头时长和运动分布。Sora 的技术报告把问题改成：如何像语言模型处理任意文本 token 一样，用统一 token 表示处理多样化视觉数据。</p>\n<p>Sora 首先训练 video compression network，将原始视频压缩到低维 latent space：</p>\n<div class=\"kb-math kb-math-display\">z = E_{\\text{video}}(x), \\quad \\hat x = D_{\\text{video}}(z)</div>\n<p>然后把 <span class=\"kb-math kb-math-inline\">z</span> 切成 spacetime patches。图像可以看作只有一帧的视频，因此同一 patch 表示同时适用于图片和视频。推理时，通过布置不同形状的随机噪声 patch 网格，就能控制输出视频的分辨率、宽高比和时长。</p>\n<p>扩散训练目标可以抽象为：给定带噪 latent patches <span class=\"kb-math kb-math-inline\">z_t</span>、扩散时间 <span class=\"kb-math kb-math-inline\">t</span> 和文本条件 <span class=\"kb-math kb-math-inline\">c</span>，模型预测原始干净 patches 或噪声：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{diff}} =\n\\mathbb{E}_{z_0,t,\\epsilon,c}\n\\left[\n\\left\\|\n\\epsilon - \\epsilon_\\theta(z_t, t, c)\n\\right\\|_2^2\n\\right]</div>\n<p>报告强调 Sora 是 diffusion transformer。Transformer 的作用是让所有 spacetime patches 在统一序列中通信，扩散过程负责从噪声逐步去噪到高保真视频。</p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># Publicly described Sora-style training flow\ninitialize(video_compressor, video_decoder, diffusion_transformer)\n\nfor visual_sample, caption in image_video_batches:\n    # visual_sample may be image or video with native size/duration\n    latent = video_compressor(visual_sample)\n    patches = extract_spacetime_patches(latent)\n\n    detailed_caption = recaption_or_expand(caption)\n    t = sample_diffusion_timestep()\n    noise = sample_gaussian_like(patches)\n    noisy_patches = add_noise(patches, noise, t)\n\n    pred_noise = diffusion_transformer(noisy_patches, t, text=detailed_caption)\n    loss = mse(pred_noise, noise)\n    optimize(diffusion_transformer, loss)\n\n# Sampling\nshape = choose_patch_grid(duration, resolution, aspect_ratio)\npatches = gaussian_noise(shape)\nfor t in reversed(diffusion_schedule):\n    patches = denoise_step(diffusion_transformer, patches, t, text_prompt)\nlatent_video = combine_spacetime_patches(patches)\nvideo = video_decoder(latent_video)\n</code></pre>\n<h5>方法机制拆解</h5>\n<p>Spacetime patches 是 Sora 与 VideoGPT 类离散自回归方法的关键差别。VideoGPT 依赖 VQ code 序列逐 token 建模，Sora 则在连续 latent patches 上用扩散去噪。这样做可以让模型在一次去噪网络调用中让不同位置、不同帧之间相互注意，适合高分辨率长视频。</p>\n<p>原生尺寸训练解决了构图问题。若所有训练视频都被裁剪为正方形，模型会学到错误的取景先验，生成时容易截断主体。Sora 保留原始宽高比和时长分布，因此可以直接生成横屏 1920x1080、竖屏 1080x1920 以及中间比例的视频。</p>\n<p>文本理解并非只靠原始用户 prompt。报告使用类似 DALL-E 3 的重描述策略：先用 captioner 为训练视频生成高描述性文本，再用 GPT 将短 prompt 扩展成更具体的 caption。这样视频模型得到的条件信号更精确，文本遵循和细节一致性更好。</p>\n<p>Sora 的“世界模拟器”能力来自规模化而非显式物理引擎。报告列举的 3D 一致性、物体持久性、交互影响和 Minecraft 模拟说明模型在大量视频上学到了部分物理和场景动力学。但报告也明确指出，Sora 仍会在玻璃破碎、进食状态变化、长视频一致性和突然出现物体等方面失败。</p>\n<div class=\"warn-box\">⚠️ 注意：Sora 技术报告没有公开参数规模、训练数据细节和完整架构超参，因此不能把这里的伪代码理解为可复现实现，只能视为公开描述的方法抽象。</div>",
      "quiz": {
        "q": "Sora 使用 spacetime latent patches 的主要目的是什么？",
        "options": [
          "把不同分辨率、宽高比和时长的视频统一成 Transformer 可处理的 token 序列",
          "把所有视频强制裁剪成固定正方形",
          "完全移除文本条件",
          "只生成单帧图像，避免时间建模"
        ],
        "answer": 0,
        "explain": "Sora 先压缩视频再切分时空 patch，使同一 diffusion transformer 能处理可变尺寸、可变时长的视频和图像。"
      }
    },
    {
      "id": "genie2",
      "num": 17,
      "name": "Genie 2",
      "fullName": "精灵2 (Large-scale Foundation World Model)",
      "year": "2024.12",
      "org": "Google DeepMind",
      "parent": "genie",
      "paperUrl": "https://deepmind.google/discover/blog/genie-2-a-large-scale-foundation-world-model/",
      "projectUrl": "",
      "category": "generative",
      "motivation": "11B参数支持实时3D环境生成与交互",
      "summary": "Genie 2 将 Genie 的交互式世界模型扩展到可由单张图像提示生成、可用键盘鼠标控制的 3D playable environments，并用自回归 latent diffusion dynamics 支持 embodied agent 的训练和评估。",
      "keyPoints": [
        "<strong>单图提示生成世界</strong>：从 Imagen 3 生成图、概念图或真实照片启动一个可交互 3D 环境",
        "<strong>动作可控</strong>：人类或 AI agent 通过键盘和鼠标逐步输入动作，模型生成下一帧观察",
        "<strong>自回归 latent diffusion world model</strong>：视频经 autoencoder 进入 latent frames，再由 causal transformer dynamics model 逐帧预测",
        "<strong>Classifier-free guidance</strong>：推理时用于增强动作可控性",
        "<strong>长程一致性</strong>：官方博客展示最长约一分钟的世界一致性，多数样例为 10-20 秒",
        "<strong>涌现能力</strong>：支持长程记忆、3D 结构、物体交互、角色动画、NPC、水/烟/重力/光照/反射等模拟现象",
        "<strong>Agent 评估用途</strong>：DeepMind 展示 SIMA agent 在 Genie 2 生成的新环境中按自然语言指令完成任务",
        "<strong>依据限制</strong>：官方博客给出架构级描述但没有完整论文超参；YAML 标注 11B 参数，公开博客没有给出完整参数表"
      ],
      "detail": "<h5>核心示意图</h5>\n<p><img alt=\"Genie 2 推理流程\" src=\"https://lh3.googleusercontent.com/NWpfbDUhaC1ivgNDaRc7d3kmDjVh5vGPPOJV34yN6trHaFIPmBVasa7URKn-UQo0-l3PegAOOGUa78Bu4eSi2uht2zGm3KeIGCcVfw2a0FjyZGim7w%3Dw1440\" />\n<em>图：Genie 2 从图像提示编码 latent world state，并在每一步接收键盘/鼠标动作，自回归生成下一帧。</em></p>\n<h5>动机与背景</h5>\n<p>Genie 1 证明了从无标注视频中学习 2D 交互环境是可行的，但未来 embodied agents 需要更丰富的训练和评估环境：3D 视角、复杂物体交互、长期记忆、NPC 行为以及多样化任务。真实游戏和模拟器制作成本高，Genie 2 的目标是把“生成环境”本身变成一个基础模型能力。</p>\n<p>官方描述中，Genie 2 是 autoregressive latent diffusion model。给定图像提示 <span class=\"kb-math kb-math-inline\">x_0</span>，autoencoder 得到 latent frame <span class=\"kb-math kb-math-inline\">z_0</span>。随后在每个时间步接收动作 <span class=\"kb-math kb-math-inline\">a_t</span>，causal transformer dynamics model 预测下一 latent：</p>\n<div class=\"kb-math kb-math-display\">p_\\theta(z_{t+1} \\mid z_{\\le t}, a_{\\le t}, c)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">c</span> 是 prompt 或场景条件。由于 latent transition 使用 diffusion 生成，可将单步采样写成去噪过程：</p>\n<div class=\"kb-math kb-math-display\">z_{t+1}^{(k-1)} =\n\\text{Denoise}_\\theta(z_{t+1}^{(k)}, k, z_{\\le t}, a_{\\le t}, c)</div>\n<p>生成后的 latent 再由 decoder 转回图像帧。和 Genie 1 相比，Genie 2 不只学习抽象 latent actions，而是面向通用键盘/鼠标控制和 3D playable worlds。</p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># Publicly described Genie 2 inference abstraction\nprompt_image = imagen3_or_user_image(prompt)\nz_context = autoencoder.encode(prompt_image)\n\nwhile episode_not_done:\n    action = read_keyboard_mouse_or_agent_action()\n\n    # Autoregressive latent diffusion next-frame generation\n    z_next = gaussian_latent()\n    for denoise_step in reversed(schedule):\n        z_next = transformer_dynamics.denoise(\n            z_next,\n            denoise_step,\n            context_latents=z_context,\n            actions=history_actions + [action],\n            guidance=&quot;classifier_free&quot;\n        )\n\n    frame = autoencoder.decode(z_next)\n    render(frame)\n    z_context = append_context(z_context, z_next)\n    history_actions.append(action)\n</code></pre>\n<h5>方法机制拆解</h5>\n<p>Genie 2 的关键接口是“single prompt image + action stream”。用户先用文本生成一张图，或直接提供照片/概念图，模型把它解释成一个可进入的世界。此后每一步动作都改变下一个观察，这使模型更像环境模拟器而不是离线视频生成器。</p>\n<p>Causal transformer dynamics model 的作用类似语言模型中的 next-token model，只是 token 换成 autoencoder latent frames，并额外条件化动作。causal mask 保证当前预测只依赖过去观察和动作历史，这符合交互环境的时间因果结构。</p>\n<p>自回归 latent diffusion 与 Genie 1 的离散 token dynamics 不同。它用 diffusion 的逐步去噪来生成下一帧 latent，理论上更适合高保真 3D 场景、复杂光照和视觉细节。官方博客还提到，未蒸馏 base model 质量更高，蒸馏版本可实时游玩但质量下降。</p>\n<p>Genie 2 在 agent 训练上的意义是“无限新环境”。如果每个 prompt 都能生成一个未见过的可交互世界，那么 agent 可以在合成环境中进行泛化评估。DeepMind 展示 SIMA agent 在 Genie 2 生成场景中执行“打开蓝门”“绕到房子后面”等任务，说明这种世界模型可作为评估平台。</p>\n<div class=\"warn-box\">⚠️ 注意：Genie 2 官方博客没有发布可复现实验细节和完整训练配方，因此它更接近研究发布和技术报告，而不是完整论文。本文的算法解释依据公开架构描述和 YAML 元信息。</div>",
      "quiz": {
        "q": "Genie 2 与 Genie 1 相比，最关键的扩展是什么？",
        "options": [
          "从 2D 交互视频扩展到单图提示的可控 3D playable worlds，并使用自回归 latent diffusion dynamics",
          "只保留静态图像生成，不再支持动作输入",
          "放弃世界模型，改为纯文本语言模型",
          "只能在已有游戏引擎地图中重放固定轨迹"
        ],
        "answer": 0,
        "explain": "Genie 2 从图像提示生成可交互 3D 环境，逐步接收动作并由 latent diffusion dynamics 生成下一观察，用于 agent 训练和评估。"
      }
    },
    {
      "id": "gaia3",
      "num": 18,
      "name": "GAIA-3",
      "fullName": "自动驾驶生成式AI 3 (GAIA-3)",
      "year": "2026.03",
      "org": "Wayve",
      "parent": "gaia1",
      "paperUrl": "https://wayve.ai/news/series-d-funding-1-2-billion/",
      "projectUrl": "",
      "category": "generative",
      "motivation": "生成极端长尾场景助力伦敦L4级测试",
      "summary": "GAIA-3 将 Wayve 的驾驶世界模型从视觉合成推进到可度量的安全评估，使用 15B 参数 latent diffusion world model 生成受控、可重复的反事实驾驶场景，解决真实道路长尾风险难以规模化复现和验证的问题。",
      "keyPoints": [
        "<strong>资料限制说明</strong>：清单 <code>paper_url</code> 指向融资新闻，非 GAIA-3 技术页；本文依据 Wayve 官方 <code>GAIA-3: Scaling World Models to Power Safety and Evaluation</code> 页面完成",
        "<strong>15B latent diffusion world model</strong>：官方技术页披露 GAIA-3 是 15B 参数、面向自动驾驶离线评估的潜在扩散世界模型",
        "<strong>规模化训练</strong>：相比 GAIA-2 使用约 5 倍训练计算、约 10 倍数据，覆盖 9 个国家和 3 个大洲",
        "<strong>更大视频 tokenizer</strong>：新 tokenizer 规模约为 GAIA-2 的 2 倍，强化行人、骑行者、标志、交通控制设施等安全关键结构",
        "<strong>World-on-Rails</strong>：改变 ego vehicle 轨迹时保持其他车辆、静态场景、光照和天气等元素一致",
        "<strong>安全关键场景生成</strong>：可生成碰撞、近碰撞、NCAP 风格 CCFTAP/CCRS 等可重复测试场景",
        "<strong>离线评估套件</strong>：通过动作条件和轨迹扰动生成多个 what-if 测试，评估驾驶模型从偏离状态恢复的能力",
        "<strong>Embodiment transfer</strong>：用少量未配对目标 rig 样本，把同一场景重渲染到不同车辆相机配置"
      ],
      "detail": "<h5>核心示意图</h5>\n<p><img alt=\"GAIA-3 embodiment transfer\" src=\"https://wayve.ai/wp-content/uploads/2025/11/EmbodimentGraph-1920x737.jpg\" />\n<em>图：GAIA-3 支持把同一驾驶场景迁移到不同车辆和相机 rig，用于跨 embodiment 的评估复用。</em></p>\n<h5>动机与背景</h5>\n<p>真实道路测试是自动驾驶安全验证的必要环节，但效率很低：模型越强，真实道路上可观察错误越少，想得到统计显著的安全结论就需要更多里程。传统仿真可控但不够真实，3D 重建仿真更真实但难处理遮挡和动态交通参与者。GAIA-3 试图把真实数据的视觉/行为真实性与仿真的可控性结合起来。</p>\n<p>GAIA-3 的核心任务可以抽象成条件化世界重生成。给定真实种子序列 <span class=\"kb-math kb-math-inline\">x_{1:T}^{\\text{seed}}</span>、ego 轨迹或动作条件 <span class=\"kb-math kb-math-inline\">u_{1:T}^{\\text{ego}}</span>、外观条件 <span class=\"kb-math kb-math-inline\">c</span> 和相机 embodiment <span class=\"kb-math kb-math-inline\">e</span>，模型生成一个结构一致但可控变化的视频：</p>\n<div class=\"kb-math kb-math-display\">x&#x27;_{1:T} \\sim\np_\\theta(\nx_{1:T}\n\\mid x_{1:T}^{\\text{seed}},\nu_{1:T}^{\\text{ego}},\nc,\ne\n)</div>\n<p>作为 latent diffusion model，它在压缩 latent 空间中完成去噪生成：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{diff}} =\n\\mathbb{E}_{z_0,t,\\epsilon}\n\\left[\n\\|\\epsilon - \\epsilon_\\theta(z_t, t, \\text{conditions})\\|_2^2\n\\right]</div>\n<p>条件不仅包括动作，还包括光照、天气、语义外观、相机 rig 和 seed scene structure。这样 GAIA-3 可以只改变被指定的因素，其他因素保持一致，用于可归因的评估。</p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># GAIA-3-style counterfactual evaluation generation\nseed_sequence = load_real_driving_clip()\nscene_latents = video_tokenizer.encode(seed_sequence)\n\nfor perturbation in evaluation_suite:\n    conditions = {\n        &quot;ego_trajectory&quot;: perturbation.ego_path,      # drift left, too fast, collision path\n        &quot;appearance&quot;: perturbation.weather_or_light,  # night, rain, sunset\n        &quot;embodiment&quot;: perturbation.camera_rig,        # target vehicle sensor setup\n        &quot;world_on_rails&quot;: True                        # keep non-ego scene consistent\n    }\n\n    noisy_latents = sample_noise_like(scene_latents)\n    generated_latents = latent_diffusion_denoise(\n        noisy_latents,\n        context=scene_latents,\n        conditions=conditions\n    )\n    generated_video = video_tokenizer.decode(generated_latents)\n\n    metrics = evaluate_driving_policy(\n        policy=model_under_test,\n        scenario=generated_video,\n        metrics=[&quot;occupancy&quot;, &quot;trajectory&quot;, &quot;recovery&quot;]\n    )\n    log(metrics)\n</code></pre>\n<h5>方法机制拆解</h5>\n<p>World-on-Rails 是 GAIA-3 从“生成好看视频”走向“可评估仿真”的关键。假设只想测试 ego 车偏离车道时模型能否恢复，那么其他交通参与者、道路、天气和场景结构应尽量保持不变。否则策略表现变化无法归因到 ego perturbation。</p>\n<p>安全关键场景生成关注低频高风险事件，例如迎面碰撞、追尾、前车急刹、车辆横穿等。这些事件在真实道路上稀有且不能主动制造。GAIA-3 用真实场景作为基础，通过动作条件和轨迹扰动生成反事实碰撞或近碰撞视频，再用占用、轨迹等指标评估驾驶策略。</p>\n<p>Embodiment transfer 解决的是数据复用问题。不同车型的相机高度、视场角、遮挡和车身外观不同，同一真实数据不能直接迁移。GAIA-3 通过目标 rig 的少量未配对样本学习重渲染条件，使评估套件能跨 OEM 和传感器配置复用。</p>\n<p>Robustness 与 interpretable control 则让外观变量可控：同一几何与运动结构可以被渲染成白天、夜晚、雨天或不同光照。这样可以直接测量驾驶模型对视觉域变化的敏感性，而不是把几何变化和外观变化混在一起。</p>\n<p>官方页面还披露，GAIA-3 相比 GAIA-2 在模型规模、tokenizer、数据覆盖和生成质量上提升明显，尤其更擅长生成清晰标志、行人运动、地标和长轨迹遮挡后的场景一致性。这些能力都服务于离线评估，而不仅是视觉展示。</p>\n<div class=\"warn-box\">⚠️ 注意：YAML 中的年份与链接和 Wayve 官方 GAIA-3 技术页存在不一致。为保持元信息一致，YAML 原样保留；正文按当前可访问的官方 GAIA-3 技术资料说明依据限制。</div>",
      "quiz": {
        "q": "GAIA-3 中 World-on-Rails 机制对自动驾驶评估的核心价值是什么？",
        "options": [
          "只改变指定的 ego 行为或外观因素，保持其他场景元素一致，从而让评估结果可归因",
          "随机改变所有车辆和道路，使每次测试完全不可重复",
          "只生成静态图片，不生成视频",
          "替代驾驶策略模型本身，不再需要评估"
        ],
        "answer": 0,
        "explain": "World-on-Rails 让反事实场景在保持背景和非 ego 动态一致的前提下改变测试变量，适合构造可重复、可度量的安全评估套件。"
      }
    },
    {
      "id": "deltaworld",
      "num": 19,
      "name": "DeltaWorld",
      "fullName": "增量世界 (Efficient World Modeling with Delta Tokens)",
      "year": "2026.04",
      "org": "ETH Zurich",
      "parent": "genie2",
      "paperUrl": "https://arxiv.org/abs/2604.04913",
      "projectUrl": "",
      "category": "generative",
      "motivation": "仅编码帧间差异计算量降低2000倍",
      "summary": "DeltaWorld 提出用 DeltaTok 将相邻帧在视觉基础模型特征空间中的变化压缩成单个连续 delta token，并在这些 token 上训练生成式世界模型，解决了视频世界模型因空间 token 过多和多次采样导致的高计算成本问题。",
      "keyPoints": [
        "<strong>DeltaTok 单 token 差分压缩</strong>：只编码相邻帧 VFM 特征差异，而不是重建整帧空间特征图",
        "<strong>一维时间序列世界模型</strong>：将视频从时空三维 token 网格压缩为每帧一个 delta token 的时间序列",
        "<strong>Best-of-Many 生成训练</strong>：并行产生多个未来假设，只监督最接近真实未来的样本",
        "<strong>单次前向多未来预测</strong>：推理时用不同噪声查询在一次前向中输出多个合理未来",
        "<strong>密集预测评估</strong>：在 Cityscapes、VSPW 语义分割和 KITTI 深度预测等 dense forecasting 任务上评估",
        "<strong>高效率收益</strong>：论文报告相对既有生成式世界模型参数少 35 倍以上、FLOPs 少约 2000 倍"
      ],
      "detail": "<p><img alt=\"DeltaWorld 总览\" src=\"https://deltatok.github.io/assets/fig4_deltaworld.svg\" />\n<em>图：DeltaWorld 使用单个 delta token 表示每个未来步的视觉变化，并在 token 序列上生成多种未来。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># DeltaWorld 训练与推理核心流程\nfor video in dataset:\n    features = frozen_vfm(video.frames)              # DINO/CLIP 类 VFM patch features\n    delta_tokens = []\n    for t in range(1, T):\n        z_t = DeltaTok.encode(features[t - 1], features[t])\n        delta_tokens.append(z_t)\n\n    # Best-of-Many: 一次生成 K 个未来 token 假设\n    hypotheses = DeltaWorld(context=delta_tokens[:c], noise_queries=sample_noise(K))\n    losses = [smooth_l1(h, target_delta_tokens) for h in hypotheses]\n    loss = min(losses)                               # 只监督最接近真实未来的样本\n    update(loss)\n\n# 推理\nsamples = DeltaWorld(context_delta_tokens, sample_noise(K))\nfuture_features = rollout_decode(previous_feature, samples, DeltaTok.decode)\n</code></pre>\n<h5>动机与背景</h5>\n<p>视频世界模型需要预测未来，而真实未来通常是多模态的：行人可能左转或直行，车辆可能加速或减速。判别式模型用回归损失输出单一预测，容易变成“平均未来”；扩散或自回归生成模型可以采样多种未来，但常常需要多次前向、逐空间 patch 生成，成本很高。</p>\n<p>DeltaWorld 的切入点是：下游任务并不总需要像素级重建，很多决策任务只需要 VFM 特征中的语义和几何信息。更进一步，相邻帧的大部分内容不变，真正需要预测的是“从上一帧到下一帧发生了什么”。因此论文把目标从“生成整帧特征图”改成“生成单个变化 token”。</p>\n<h5>核心机制：DeltaTok</h5>\n<p>给定相邻两帧的视觉基础模型特征 <span class=\"kb-math kb-math-inline\">F_{t-1}</span> 与 <span class=\"kb-math kb-math-inline\">F_t</span>，DeltaTok 编码器学习一个紧凑表示：</p>\n<div class=\"kb-math kb-math-display\">z_t = E_{\\Delta}(F_{t-1}, F_t)</div>\n<p>解码器则利用上一帧特征和 delta token 重建当前帧特征：</p>\n<div class=\"kb-math kb-math-display\">\\hat{F}_t = D_{\\Delta}(F_{t-1}, z_t)</div>\n<p>训练目标是让 <span class=\"kb-math kb-math-inline\">\\hat{F}_t</span> 接近 <span class=\"kb-math kb-math-inline\">F_t</span>，通常可用 MSE 或 smooth L1 形式：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{tok} = \\|D_{\\Delta}(F_{t-1}, E_{\\Delta}(F_{t-1}, F_t)) - F_t\\|_2^2</div>\n<p>这个设计的直觉很直接：如果场景没有变化，delta token 可以接近“无变化”；如果只有局部运动，token 只需表达变化的语义方向，而不用重新携带整张图的空间背景。</p>\n<h5>生成式世界模型与 Best-of-Many</h5>\n<p>DeltaWorld 在 delta token 序列上预测未来。设历史 token 为 <span class=\"kb-math kb-math-inline\">z_{1:c}</span>，模型用多个随机查询 <span class=\"kb-math kb-math-inline\">\\epsilon_k</span> 生成 <span class=\"kb-math kb-math-inline\">K</span> 个未来候选：</p>\n<div class=\"kb-math kb-math-display\">\\hat{z}_{c+1:T}^{(k)} = f_{\\theta}(z_{1:c}, \\epsilon_k)</div>\n<p>Best-of-Many 训练只对最接近真实未来的候选反传：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{BoM} = \\min_{k \\in \\{1,\\dots,K\\}} d(\\hat{z}_{c+1:T}^{(k)}, z_{c+1:T})</div>\n<p>这避免了普通回归把多种未来平均掉，也避免了扩散模型多步 denoising 的高开销。推理时保留所有候选，就能在单次前向里获得多样未来。</p>\n<h5>与传统视频生成世界模型的区别</h5>\n<p>传统视频生成器通常在像素 latent 或空间 patch token 上建模，序列长度随分辨率和时间一起增长。DeltaWorld 通过 delta token 将每个时间步压到一个 token，使未来预测主要沿时间维展开。对 <span class=\"kb-math kb-math-inline\">512 \\times 512</span> 输入，论文报告可达到约 <span class=\"kb-math kb-math-inline\">1024\\times</span> token reduction；在另一个 DINO-Foresight 迁移实验中，delta token 也可带来约 <span class=\"kb-math kb-math-inline\">2048\\times</span> token reduction。</p>\n<div class=\"key-point\">💡 关键：DeltaWorld 不是追求直接生成最漂亮的 RGB 视频，而是让世界模型在 VFM 特征空间中高效生成“对下游感知任务有用”的多未来表示。</div>",
      "quiz": {
        "q": "DeltaWorld 计算量显著下降的核心原因是什么？",
        "options": [
          "完全取消未来预测，只复制最后一帧",
          "把每帧空间特征图压缩成表示帧间变化的单个 delta token",
          "使用更大的扩散模型减少训练轮数",
          "只在低分辨率 RGB 像素上训练"
        ],
        "answer": 1,
        "explain": "DeltaTok 只编码相邻帧的 VFM 特征差异，将时空 token 网格压缩为一维时间 token 序列，因此生成多个未来的成本大幅降低。"
      }
    },
    {
      "id": "worldreel",
      "num": 20,
      "name": "WorldReel",
      "fullName": "世界卷轴 (4D Video via Consistent Geometry)",
      "year": "2026.03",
      "org": "SenseTime",
      "parent": "sora",
      "paperUrl": "https://arxiv.org/abs/2603.worldreel",
      "projectUrl": "",
      "category": "generative",
      "motivation": "几何一致性建模解决视频生成幻觉问题",
      "summary": "WorldReel 提出把视频生成从单纯 RGB 帧生成提升为联合生成 RGB、点图、相机轨迹、光流和 3D scene flow 的 4D 生成框架，解决视频扩散模型在大相机运动和动态物体下容易出现几何漂移与时空不一致的问题。",
      "keyPoints": [
        "<strong>输入链接限制</strong>：清单中的 <code>https://arxiv.org/abs/2603.worldreel</code> 疑似占位符；实际可访问公开论文为 <code>https://arxiv.org/abs/2512.07821</code>",
        "<strong>统一 4D 输出</strong>：同时生成 RGB、per-frame geometry、calibrated camera trajectory、optical flow、scene flow 和 object masks",
        "<strong>geo-motion augmented latent</strong>：在视频扩散 Transformer 的 latent 中显式携带几何与运动信息",
        "<strong>appearance-independent 表征</strong>：减少外观纹理泄漏到几何/运动通道，提升跨视角和跨光照泛化",
        "<strong>Temporal DPT 多任务解码器</strong>：共享轻量 DPT 风格主干，任务头分别预测点图、相机、动态 mask、scene flow",
        "<strong>混合数据训练</strong>：结合有精确 4D 标注的合成数据和更具真实外观多样性的真实视频"
      ],
      "detail": "<p><img alt=\"WorldReel 框架图\" src=\"https://arxiv.org/html/2512.07821/figures/figure2_v2.png\" />\n<em>图：WorldReel 在视频扩散模型中加入 geo-motion latent，并通过 temporal DPT 解码统一 4D 表征。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># WorldReel 的联合 4D 视频生成训练\nfor batch in mixed_synthetic_real_videos:\n    rgb_latent = video_vae.encode(batch.rgb)\n    geo_motion_latent = encode_geometry_motion(\n        depth=batch.depth_or_pseudo_depth,\n        optical_flow=batch.flow,\n        camera=batch.camera,\n        scene_flow=batch.scene_flow,\n        mask=batch.dynamic_mask,\n    )\n\n    noisy_latent, noise, t = diffusion_forward(rgb_latent, geo_motion_latent)\n    pred = video_dit(noisy_latent, t, prompt=batch.prompt, geo_motion=geo_motion_latent)\n\n    rgb_loss = diffusion_loss(pred.rgb, noise.rgb)\n    task_outputs = temporal_dpt(pred.geo_motion_features)\n    four_d_loss = (\n        l1(task_outputs.pointmap, batch.pointmap)\n        + pose_loss(task_outputs.camera, batch.camera)\n        + huber(task_outputs.scene_flow, batch.scene_flow)\n        + bce(task_outputs.dynamic_mask, batch.dynamic_mask)\n    )\n    consistency_loss = static_geometry_consistency() + dynamic_motion_smoothness()\n    update(rgb_loss + four_d_loss + consistency_loss)\n</code></pre>\n<h5>动机与背景</h5>\n<p>强视频生成模型可以产生逼真的局部纹理和运动，但它们通常没有维护“同一个 3D 世界随时间演化”的内部状态。因此在视角外推、相机大幅移动或非刚体运动中，常见失败包括物体形状漂移、背景几何闪烁、相机运动和物体运动相互混淆。</p>\n<p>WorldReel 的目标不是只让视频“看起来连续”，而是让生成过程显式输出一个随时间一致的 4D 场景。这里的 4D 指 3D 几何随时间演化：每帧有点图/深度，相机轨迹可标定，动态区域有 3D scene flow 描述其运动。</p>\n<h5>核心机制：geo-motion augmented latent</h5>\n<p>普通 latent video diffusion 可以写成：</p>\n<div class=\"kb-math kb-math-display\">\\epsilon_{\\theta}(z_t, t, c)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">z_t</span> 是带噪视频 latent，<span class=\"kb-math kb-math-inline\">c</span> 是文本或图像条件。WorldReel 扩展为：</p>\n<div class=\"kb-math kb-math-display\">\\epsilon_{\\theta}(z_t, g_t, t, c)</div>\n<p><span class=\"kb-math kb-math-inline\">g_t</span> 是几何-运动增强 latent，包含与外观解耦的深度、点图、相机、光流和 3D scene flow 信息。这样做的关键收益是把生成约束从“RGB 相邻帧像不像”提升到“同一个 3D 结构在不同时间和视角下是否一致”。</p>\n<h5>多任务 4D 解码与正则</h5>\n<p>WorldReel 使用 temporal DPT-style decoder 将 latent 特征映射为多个 4D 任务输出。共享 backbone 学习统一几何表示，最后用轻量任务头预测不同输出：</p>\n<div class=\"kb-math kb-math-display\">(\\hat{P}, \\hat{C}, \\hat{F}_{3D}, \\hat{M}) = D_{\\phi}(h)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\hat{P}</span> 是 pointmap，<span class=\"kb-math kb-math-inline\">\\hat{C}</span> 是相机参数，<span class=\"kb-math kb-math-inline\">\\hat{F}_{3D}</span> 是 scene flow，<span class=\"kb-math kb-math-inline\">\\hat{M}</span> 是动态 mask。训练损失组合为：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L} =\n\\mathcal{L}_{diff}\n+ \\lambda_p \\mathcal{L}_{point}\n+ \\lambda_c \\mathcal{L}_{camera}\n+ \\lambda_f \\mathcal{L}_{flow}\n+ \\lambda_m \\mathcal{L}_{mask}\n+ \\lambda_r \\mathcal{L}_{reg}</div>\n<p>正则项区分静态背景和动态前景：背景更强调跨帧几何一致，前景更强调非刚体 motion smoothness 和 camera/object motion 解耦。</p>\n<h5>数据策略与传统方法区别</h5>\n<p>只用合成数据可获得精确 4D 监督，但外观域窄；只用真实视频则标签噪声大。WorldReel 的混合策略让合成数据负责精确几何/运动监督，让真实视频补充视觉多样性。真实视频的伪标签来自深度、相机和光流估计模型，再通过 back-projection 与 scene flow 构造 4D 监督。</p>\n<p>与后处理式 4D 重建不同，WorldReel 在生成时就联合输出视频和 4D 表征，而不是先生成 RGB 再尝试补救几何错误。这个“生成即 4D”的设计使模型更适合作为世界模型：agent 可以在同一稳定时空表征中渲染、编辑和推理。</p>\n<div class=\"warn-box\">⚠️ 注意：本文实际机构与 YAML 中的 <code>SenseTime</code> 不一致，公开 arXiv/CVPR 页面列出的作者机构包括 UT Austin、Adobe Research 和 UCL；本文件保留清单 YAML 原文。</div>",
      "quiz": {
        "q": "WorldReel 相比普通视频扩散模型最关键的改动是什么？",
        "options": [
          "只提高 RGB 视频分辨率",
          "在生成过程中显式联合建模几何、相机和 3D 运动",
          "删除所有真实视频数据，只用合成数据",
          "把视频生成改成纯文本生成任务"
        ],
        "answer": 1,
        "explain": "WorldReel 的核心是 geo-motion augmented latent 和多任务 4D 解码器，使 RGB 生成受到点图、相机轨迹和 scene flow 等几何运动约束。"
      }
    },
    {
      "id": "occsora",
      "num": 21,
      "name": "OccSora",
      "fullName": "占据空 (4D Occupancy Generation)",
      "year": "2026.02",
      "org": "Tsinghua University",
      "parent": "sora",
      "paperUrl": "https://ieeexplore.ieee.org/abstract/document/11511396/",
      "projectUrl": "",
      "category": "generative",
      "motivation": "利用4D占据栅格提供几何稳定环境",
      "summary": "OccSora 提出面向自动驾驶的扩散式 4D occupancy 世界模型，用 4D 场景 tokenizer 压缩长时序占据栅格，再用轨迹条件 DiT 生成未来占据 token，解决自回归 occupancy 预测长时程低效且几何稳定性不足的问题。",
      "keyPoints": [
        "<strong>公开资料限制</strong>：清单中的 IEEE 链接可能对应后续版本；主要可访问论文和图源为 arXiv:2405.20337 与项目页",
        "<strong>4D occupancy 表征</strong>：用体素语义占据网格表示 3D 场景，并显式加入时间维度",
        "<strong>4D scene tokenizer</strong>：通过类别嵌入、3D encoder、codebook 量化和 3D decoder 压缩/重建占据视频",
        "<strong>扩散式世界模型</strong>：在离散/潜在 occupancy token 空间中加噪与去噪，避免逐步自回归生成长序列",
        "<strong>轨迹条件控制</strong>：将 ego vehicle trajectory 作为条件嵌入，使生成结果与车辆运动逻辑一致",
        "<strong>nuScenes + Occ3D 评估</strong>：基于 nuScenes occupancy 标注验证 16 秒级 4D occupancy 生成能力"
      ],
      "detail": "<p><img alt=\"OccSora 总体流程\" src=\"https://arxiv.org/html/2405.20337v1/x2.png\" />\n<em>图：OccSora 先用 4D occupancy tokenizer 压缩真实占据序列，再用轨迹条件扩散 Transformer 从噪声生成可控 4D occupancy token。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># OccSora: tokenizer + trajectory-conditioned diffusion world model\nfor occ_video, ego_traj in dataset:\n    # 1. 4D occupancy scene tokenizer\n    category_tokens = category_embedding(occ_video)       # [D, H, W, T] semantic occupancy\n    latent = encoder3d(category_tokens)                   # spatiotemporal compression\n    quantized = nearest_codebook(latent)                  # vector quantization\n    recon_occ = decoder3d(quantized)\n    tokenizer_loss = reconstruction_loss(recon_occ, occ_video) + vq_loss(latent, quantized)\n\n    # 2. diffusion world model on compressed tokens\n    eps = normal_like(quantized)\n    noisy_tokens, step = add_noise(quantized, eps)\n    traj_embed = mlp(ego_traj)\n    eps_pred = diffusion_transformer(noisy_tokens, step, condition=traj_embed)\n    diffusion_loss = mse(eps_pred, eps)\n\n    update(tokenizer_loss + diffusion_loss)\n\n# sampling\ntokens = denoise_from_gaussian(condition=target_trajectory)\ngenerated_4d_occ = decoder3d(tokens)\n</code></pre>\n<h5>动机与背景</h5>\n<p>自动驾驶世界模型需要理解“车辆如何运动”和“周围 3D 场景如何随时间演化”的耦合关系。只生成前视 RGB 视频容易缺失三维空间约束；只预测下一步 occupancy 又容易受自回归误差累积限制，长时程生成效率低。</p>\n<p>OccSora 将世界状态放在 4D occupancy 空间中：每个体素位置不仅记录是否被占据，还记录语义类别，并沿时间维形成 occupancy video。这种表示比 RGB 更接近规划与安全决策所需的几何结构，也更容易检查物体是否穿插、道路空间是否连续。</p>\n<h5>4D Scene Tokenizer</h5>\n<p>输入 4D occupancy 可抽象为：</p>\n<div class=\"kb-math kb-math-display\">R_{in} \\in \\mathbb{R}^{D \\times H \\times W \\times T}</div>\n<p>类别嵌入后，3D encoder 在空间和时间维上共同下采样，得到低维 latent：</p>\n<div class=\"kb-math kb-math-display\">R_{latent} = \\tau_{en}(R_{in})</div>\n<p>再用 codebook 做向量量化：</p>\n<div class=\"kb-math kb-math-display\">z_i = \\arg\\min_{e_j \\in \\mathcal{C}} \\|R_{latent,i} - e_j\\|_2</div>\n<p>最后 3D decoder 将 token 还原为原始分辨率 occupancy。这个 tokenizer 的作用类似视频 VQ-VAE，但处理对象不是 RGB，而是 4D 占据语义体。</p>\n<h5>轨迹条件扩散生成</h5>\n<p>扩散模型在 tokenizer 的 latent token 空间工作。前向过程逐步加入高斯噪声：</p>\n<div class=\"kb-math kb-math-display\">q(z_t \\mid z_0) = \\mathcal{N}(\\sqrt{\\bar{\\alpha}_t}z_0,\\ (1-\\bar{\\alpha}_t)I)</div>\n<p>去噪网络学习在给定 ego 轨迹 <span class=\"kb-math kb-math-inline\">a</span> 和扩散步 <span class=\"kb-math kb-math-inline\">t</span> 时预测噪声：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{diff} =\n\\mathbb{E}_{z_0,\\epsilon,t,a}\\left[\n\\|\\epsilon - \\epsilon_{\\theta}(z_t, t, a)\\|_2^2\n\\right]</div>\n<p>轨迹 <span class=\"kb-math kb-math-inline\">a</span> 被编码为条件向量并注入 Transformer token 序列，使模型学会“车辆直行/右转/静止”对应的未来场景演化差异。</p>\n<h5>与自回归 occupancy 世界模型的区别</h5>\n<p>OccWorld 等方法通常按时间递推下一帧 occupancy token，误差会在长 rollout 中累积。OccSora 用扩散模型一次性建模完整时空 occupancy token 分布，把长序列生成转化为条件去噪问题，因此更适合生成 16 秒级长时序场景。</p>\n<div class=\"key-point\">💡 关键：OccSora 的世界模型不是“像素视频模拟器”，而是“可控 4D 几何-语义场景模拟器”，因此更贴近自动驾驶规划对可通行空间和动态障碍物的需求。</div>",
      "quiz": {
        "q": "OccSora 为什么选择 4D occupancy 作为世界状态？",
        "options": [
          "因为 occupancy token 可以直接替代所有相机图像传感器",
          "因为 4D occupancy 同时表达 3D 几何、语义和时间演化，更适合自动驾驶规划",
          "因为扩散模型只能处理体素数据，不能处理 RGB",
          "因为轨迹条件只能加到 occupancy decoder 上"
        ],
        "answer": 1,
        "explain": "4D occupancy 将空间占据、语义类别和时间演化统一起来，比纯 RGB 更能提供几何稳定的驾驶环境表示。"
      }
    },
    {
      "id": "astra",
      "num": 22,
      "name": "Astra",
      "fullName": "星辰 (Autoregressive Denoising World Model)",
      "year": "2026.01",
      "org": "Tsinghua/Kuaishou",
      "parent": "sora",
      "paperUrl": "https://arxiv.org/abs/2512.08931",
      "projectUrl": "",
      "category": "generative",
      "motivation": "自回归流与扩散去噪确保长时序物理连贯",
      "summary": "Astra 提出把预训练视频扩散骨干改造成自回归去噪世界模型，通过 ACT-Adapter、噪声增强历史记忆和 Mixture of Action Experts 统一处理相机、机器人和键鼠等动作条件，解决长时序视频世界模型难以同时保持历史一致性和动作响应性的问题。",
      "keyPoints": [
        "<strong>自回归去噪架构</strong>：以 chunk 为单位从历史观测、动作和可选文本提示生成未来视频",
        "<strong>Temporal causal attention</strong>：保证模型只能使用过去 chunk 作为条件，支持流式长时程输出",
        "<strong>ACT-Adapter</strong>：在预训练 video DiT 的 latent 特征空间直接注入 action-induced shift",
        "<strong>Noise-as-mask 历史记忆</strong>：训练时污染历史帧，缓解模型过度复制历史而忽视动作的 visual inertia",
        "<strong>Action-free guidance</strong>：类似 CFG，通过有/无动作条件的速度场差异放大动作响应",
        "<strong>MoAE 多动作专家</strong>：动态路由相机 pose、机器人 pose、键鼠离散命令等异构动作模态",
        "<strong>跨场景数据训练</strong>：使用 nuScenes、Sekai、SpatialVID、RT-1、Multi-Cam Video 等多源数据"
      ],
      "detail": "<p><img alt=\"Astra 框架图\" src=\"https://arxiv.org/html/2512.08931v3/x2.png\" />\n<em>图：Astra 以初始图像、历史 chunk、动作和提示为条件，逐 chunk 进行自回归去噪生成。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># Astra autoregressive denoising training\nfor video, actions, prompt in dataset:\n    history, target_chunk = sample_history_and_target(video)\n\n    # noise-as-mask: 训练时弱化历史视觉条件，避免 visual inertia\n    corrupted_history = add_context_noise(history)\n    action_embed = MoAE(actions)                       # camera / robot / keyboard-mouse\n\n    z_t, noise, t = flow_matching_noising(target_chunk)\n    pred_velocity = video_dit_with_act_adapter(\n        noisy_target=z_t,\n        history=corrupted_history,\n        action=action_embed,\n        prompt=prompt,\n        timestep=t,\n    )\n    loss = flow_matching_loss(pred_velocity, noise)\n    update(loss)\n\n# inference with action-free guidance\nhistory = [initial_frame]\nfor chunk_id in range(num_chunks):\n    v_action = model(history, action=actions[chunk_id])\n    v_null = model(history, action=null_action)\n    v_guided = v_null + guidance_scale * (v_action - v_null)\n    next_chunk = denoise(v_guided)\n    history.append(next_chunk)\n</code></pre>\n<h5>动机与背景</h5>\n<p>现有视频生成模型的强项是短视频质量，但世界模型要求更苛刻：它必须从过去观测和动作预测未来，且能长时间滚动。简单地把视频扩散模型串成自回归 rollout 会遇到两个问题：历史帧太强导致模型只维持视觉惯性、不响应新动作；动作条件太强又会破坏时序一致性。</p>\n<p>Astra 的核心思路是保留预训练视频扩散模型的生成先验，同时用轻量模块让它变成交互式世界模型。论文基于 Wan-2.1 类 flow transformer backbone，仅添加动作适配和专家路由，避免从零训练大视频模型。</p>\n<h5>自回归去噪世界模型</h5>\n<p>设历史视频 chunk 为 <span class=\"kb-math kb-math-inline\">H_{&lt;i}</span>，动作序列为 <span class=\"kb-math kb-math-inline\">a_i</span>，目标是生成下一段视频 <span class=\"kb-math kb-math-inline\">X_i</span>：</p>\n<div class=\"kb-math kb-math-display\">p(X_i \\mid H_{&lt;i}, a_i, c)</div>\n<p>Astra 使用 flow matching / denoising 形式学习速度场：</p>\n<div class=\"kb-math kb-math-display\">v_{\\theta}(z_t, t, H_{&lt;i}, a_i, c)</div>\n<p>推理时逐 chunk 去噪得到 <span class=\"kb-math kb-math-inline\">X_i</span>，再把 <span class=\"kb-math kb-math-inline\">X_i</span> 追加到历史中，用于下一步预测。Temporal causal attention 保证生成过程符合时间因果。</p>\n<h5>ACT-Adapter 与动作注入</h5>\n<p>动作不是文本提示，而是会在 latent dynamics 中导致特征位移的控制信号。Astra 将动作编码为与视频 latent 对齐的向量，并在每个 Transformer block 中通过 ACT-Adapter 注入：</p>\n<div class=\"kb-math kb-math-display\">h_{\\ell}&#x27; = h_{\\ell} + A_{\\ell}(e_a)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">A_{\\ell}</span> 是初始化为近似恒等的轻量线性层。论文还冻结大部分 backbone，只微调 self-attention 和 adapter，既保留视频生成能力，又学习动作对未来状态的影响。</p>\n<h5>噪声历史记忆与 visual inertia</h5>\n<p>长历史能提升一致性，但也让模型过度依赖过去画面，忽略“转向、抓取、移动”等新动作。Astra 在训练时对历史条件加入独立噪声：</p>\n<div class=\"kb-math kb-math-display\">\\tilde{H}_{&lt;i} = H_{&lt;i} + \\sigma \\epsilon</div>\n<p>这相当于 soft mask：历史仍提供场景身份和粗结构，但不能被模型直接复制。这样模型被迫综合动作和历史，而不是只做视觉外推。</p>\n<h5>MoAE：统一异构动作</h5>\n<p>不同任务的动作结构差异很大：相机控制可能是 7D/12D pose，机器人操作常是 7D end-effector pose，游戏/探索可能是键鼠离散输入。MoAE 先把每种动作投影到共享空间，再由 router 选择 top-k MLP experts：</p>\n<div class=\"kb-math kb-math-display\">e_a = \\sum_{m \\in \\text{TopK}(r(a))} \\alpha_m E_m(P_m(a))</div>\n<p>这种设计让模型共享世界生成能力，同时保留动作模态专门化。论文在 397K 视频片段、约 360 小时数据上训练，并报告在 instruction following、subject/background consistency 和 motion smoothness 等指标上优于 Wan-2.1、MatrixGame 和 YUME。</p>\n<div class=\"key-point\">💡 关键：Astra 的贡献不是单个动作编码器，而是把“预训练视频去噪 + 自回归历史 + 动作响应”组织成可扩展的交互式世界模型训练范式。</div>",
      "quiz": {
        "q": "Astra 中 noise-as-mask 历史记忆的主要作用是什么？",
        "options": [
          "减少视频分辨率以节省显存",
          "弱化历史帧的直接复制倾向，让模型更重视动作条件",
          "把连续动作离散化成文本 token",
          "替代扩散模型中的随机噪声"
        ],
        "answer": 1,
        "explain": "训练时给历史条件加噪可以缓解 visual inertia，使模型在保持长期一致性的同时对当前动作更敏感。"
      }
    },
    {
      "id": "interaction_networks",
      "num": 23,
      "name": "IN",
      "fullName": "交互网络 (Interaction Networks)",
      "year": "2016.12",
      "org": "DeepMind",
      "parent": "—",
      "paperUrl": "https://proceedings.neurips.cc/paper/2016/hash/3147da8ab4a0437c15ef51a5cc7f2dc4-Abstract.html",
      "projectUrl": "",
      "category": "physics",
      "motivation": "通过对象关系图建模实现物理系统推理",
      "summary": "Interaction Networks 提出把物理系统表示为对象和关系组成的图，并分别用关系模型和对象模型计算交互效应与状态更新，解决普通神经网络难以泛化到不同对象数量、关系结构和物理组合的问题。",
      "keyPoints": [
        "<strong>对象-关系图输入</strong>：节点表示对象状态，边表示物理关系或约束，外部效应单独作为输入",
        "<strong>关系模型 <span class=\"kb-math kb-math-inline\">f_R</span></strong>：对每条边计算 sender 对 receiver 的 interaction effect",
        "<strong>对象模型 <span class=\"kb-math kb-math-inline\">f_O</span></strong>：聚合所有作用到同一对象的 effect，再预测对象未来状态",
        "<strong>共享权重与置换不变性</strong>：同一个 <span class=\"kb-math kb-math-inline\">f_R</span>、<span class=\"kb-math kb-math-inline\">f_O</span> 作用于所有边和节点，可泛化到不同对象数",
        "<strong>可学习物理引擎</strong>：在 n-body、弹性碰撞、非刚体弹簧系统中学习多步 rollout",
        "<strong>抽象属性推断</strong>：可加 global abstraction model 估计系统势能等整体属性"
      ],
      "detail": "<p><img alt=\"Interaction Network 框架图\" src=\"https://ar5iv.labs.arxiv.org/html/1612.00222/assets/x1.png\" />\n<em>图：Interaction Network 先计算关系交互效应，再把效应聚合到对象上执行对象动力学更新。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># Interaction Network one-step prediction\ndef interaction_network(objects, relations, external_effects):\n    # objects: O_j, relations: (receiver_i, sender_i, attr_i)\n    effects_by_receiver = defaultdict(list)\n\n    for receiver, sender, rel_attr in relations:\n        b_ij = concat(objects[receiver], objects[sender], rel_attr)\n        e_ij = f_R(b_ij)                       # relation-centric reasoning\n        effects_by_receiver[receiver].append(e_ij)\n\n    predictions = []\n    for j, obj in enumerate(objects):\n        e_bar = sum(effects_by_receiver[j])    # commutative aggregation\n        c_j = concat(obj, external_effects[j], e_bar)\n        p_j = f_O(c_j)                         # object-centric dynamics\n        predictions.append(p_j)\n\n    return predictions\n</code></pre>\n<h5>动机与背景</h5>\n<p>物理系统的复杂性来自组合：同一种物体、同一种关系可以在不同数量、不同拓扑和不同初始条件下反复出现。普通 MLP 若把所有状态展平成向量，就把“第 1 个物体”和“第 2 个物体”绑定到固定输入位置，难以迁移到 3 个、6 个或 12 个物体。</p>\n<p>IN 的关键假设是物理推理应分解为两类局部计算：关系计算和对象更新。关系模型学习“两个对象之间的相互作用”，对象模型学习“对象在外部效应和所有交互作用下如何变化”。这种分解与传统物理引擎的接触/力计算非常接近，但参数由神经网络从数据中学习。</p>\n<h5>核心公式</h5>\n<p>设对象集合为 <span class=\"kb-math kb-math-inline\">O = \\{o_j\\}</span>，关系集合为 <span class=\"kb-math kb-math-inline\">R = \\langle R_r, R_s, R_a\\rangle</span>，其中 <span class=\"kb-math kb-math-inline\">R_r</span> 和 <span class=\"kb-math kb-math-inline\">R_s</span> 分别索引 receiver 与 sender，<span class=\"kb-math kb-math-inline\">R_a</span> 是关系属性。IN 的基本计算为：</p>\n<div class=\"kb-math kb-math-display\">B = m(O, R)</div>\n<div class=\"kb-math kb-math-display\">E = \\phi_R(B)</div>\n<div class=\"kb-math kb-math-display\">C = a(O, R, E, X)</div>\n<div class=\"kb-math kb-math-display\">P = \\phi_O(C)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">m</span> 是 marshalling function，把对象和关系整理成每条边的输入；<span class=\"kb-math kb-math-inline\">\\phi_R</span> 是共享的关系 MLP；<span class=\"kb-math kb-math-inline\">a</span> 把同一 receiver 的边效应求和聚合；<span class=\"kb-math kb-math-inline\">\\phi_O</span> 是共享的对象 MLP。</p>\n<h5>为什么能泛化</h5>\n<p>IN 的泛化来自两个结构约束。第一，<span class=\"kb-math kb-math-inline\">f_R</span> 在所有边上共享，相当于学习一种局部相互作用规则；第二，边效应用 sum 聚合，满足交换律和结合律，因此对象顺序不会改变结果：</p>\n<div class=\"kb-math kb-math-display\">\\bar{e}_j = \\sum_{i: r(i)=j} e_i</div>\n<p>这让模型可以处理训练时未见过的对象数量和关系图。例如论文中 n-body 训练用 6 个天体，测试可以评估 3 个和 12 个天体；弹簧串训练一种端点固定方式，测试不同长度和固定方式。</p>\n<h5>训练与 rollout</h5>\n<p>论文主要用监督方式训练单步速度预测：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L} = \\| \\hat{v}_{t+1} - v_{t+1} \\|_2^2</div>\n<p>多步 rollout 时，把模型输出的速度用于更新位置，再作为下一步输入。虽然只训练单步，IN 在 n-body、bouncing balls 和 string 系统中可以滚动上千步并保持物理上合理的轨迹。</p>\n<div class=\"key-point\">💡 关键：IN 把“可学习神经网络”放进“对象-关系-聚合”的物理归纳偏置里，是后续 Graph Network Simulator、Visual Interaction Networks 和很多学习型物理引擎的基础模板。</div>",
      "quiz": {
        "q": "Interaction Network 为什么能泛化到不同数量的对象？",
        "options": [
          "因为它固定只处理 6 个对象",
          "因为关系模型和对象模型在所有边/节点上共享，并用求和聚合交互效应",
          "因为它不使用对象属性",
          "因为它只预测系统总能量"
        ],
        "answer": 1,
        "explain": "共享的 f_R 和 f_O 学习局部规则，sum 聚合保证置换不变性，因此同一模型可应用到不同规模和拓扑的对象关系图。"
      }
    },
    {
      "id": "vin",
      "num": 24,
      "name": "VIN",
      "fullName": "视觉交互网络 (Visual Interaction Networks)",
      "year": "2017.12",
      "org": "DeepMind",
      "parent": "interaction_networks",
      "paperUrl": "https://proceedings.neurips.cc/paper/7040-visual-interaction-networks",
      "projectUrl": "",
      "category": "physics",
      "motivation": "从原始视频中学习物理模拟器",
      "summary": "Visual Interaction Networks 将 CNN 视觉编码器与 Interaction Network 动力学预测器端到端结合，从少量原始视频帧中解析对象 latent 状态并执行物理 rollout，解决 IN 依赖显式对象状态、无法直接从视觉观测学习模拟器的问题。",
      "keyPoints": [
        "<strong>视觉前端 + IN 后端</strong>：CNN 从视频帧估计对象状态，IN 在对象状态图上预测未来动力学",
        "<strong>六帧输入长期预测</strong>：论文展示模型可从 6 个输入视频帧预测数百步未来轨迹",
        "<strong>factored latent object representation</strong>：视觉模块被动力学任务驱动，学习对象分解式 latent 表示",
        "<strong>多物理域评估</strong>：弹簧、重力、磁力、弹球和漂移等二维物理系统",
        "<strong>不可见对象推断</strong>：可从可见物体受力效果推断不可见物体的未来状态",
        "<strong>隐式物理属性推断</strong>：模型能从运动中隐式估计未知质量等物理属性"
      ],
      "detail": "<p><img alt=\"VIN 预测器结构\" src=\"https://ar5iv.labs.arxiv.org/html/1706.01433/assets/Predictor.png\" />\n<em>图：VIN 的 dynamics predictor 基于 Interaction Network，对对象 latent 状态执行交互推理与未来 rollout。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># Visual Interaction Network\ndef vin_forward(video_frames, relation_graph, rollout_steps):\n    # 1. 视觉编码：用连续帧估计对象状态\n    state_codes = []\n    for triplet in sliding_window(video_frames, size=3):\n        state_codes.append(cnn_encoder(triplet))\n\n    # 2. 从多个 state code 估计当前位置/速度等 latent state\n    object_states = infer_object_state(state_codes)\n\n    # 3. IN 动力学 rollout\n    predictions = []\n    for _ in range(rollout_steps):\n        delta_state = interaction_network(object_states, relation_graph)\n        object_states = integrate(object_states, delta_state)\n        predictions.append(object_states)\n\n    return predictions\n</code></pre>\n<h5>动机与背景</h5>\n<p>Interaction Network 已证明对象-关系图是学习物理模拟器的强归纳偏置，但它假设对象状态、关系属性和外部效应已经可得。真实机器人或视觉系统通常只看到像素视频，不直接知道每个物体的位置、速度、质量或相互作用。</p>\n<p>VIN 的问题设定因此更接近感知到规划的闭环：输入是视频帧，输出是未来物体轨迹。模型必须同时解决感知解析和动力学学习，而且这两部分要互相配合。视觉模块不需要显式监督“这是第几个物体”，而是通过预测未来轨迹的损失被迫学习适合物理推理的对象 latent。</p>\n<h5>架构拆解</h5>\n<p>VIN 由两个模块组成：</p>\n<div class=\"kb-math kb-math-display\">s_t = E_{\\theta}(I_{t-2:t})</div>\n<div class=\"kb-math kb-math-display\">\\hat{s}_{t+1:t+H} = D_{\\phi}(s_t, R)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">E_{\\theta}</span> 是基于 CNN 的 visual encoder，输入若干帧图像以推断位置和速度等状态；<span class=\"kb-math kb-math-inline\">D_{\\phi}</span> 是 Interaction Network 风格的 dynamics predictor，输入对象状态和关系图 <span class=\"kb-math kb-math-inline\">R</span>，递推未来状态。</p>\n<p>由于单帧无法确定速度，VIN 使用多个连续帧形成 state code。论文中视觉编码器通常取三帧片段，模型整体从六帧视频中估计当前动力学状态。</p>\n<h5>动力学预测器如何使用 IN</h5>\n<p>预测器保留 IN 的核心结构：对每条关系计算 interaction effect，再聚合到每个对象并预测状态变化。若对象状态为 <span class=\"kb-math kb-math-inline\">o_i</span>，关系为 <span class=\"kb-math kb-math-inline\">r_{ij}</span>，则：</p>\n<div class=\"kb-math kb-math-display\">e_{ij} = f_R(o_i, o_j, r_{ij})</div>\n<div class=\"kb-math kb-math-display\">\\bar{e}_j = \\sum_i e_{ij}</div>\n<div class=\"kb-math kb-math-display\">\\Delta o_j = f_O(o_j, \\bar{e}_j)</div>\n<p>这让 VIN 不只是从像素拟合轨迹，而是在 latent 对象空间里执行类似物理引擎的结构化推理。</p>\n<h5>与传统视觉预测的区别</h5>\n<p>普通视频预测模型直接预测未来像素，容易把物理规律混在纹理生成中；VIN 先解析对象状态，再在对象图上预测动力学。这样做的优势是长期 rollout 更稳定，也能自然处理不同关系类型，如弹簧、重力、磁力和碰撞。</p>\n<p>论文还展示了隐变量推断能力：当某些对象不可见时，VIN 可通过可见对象受到的影响推断隐藏因素；当质量未知时，模型可从历史运动中形成足以预测未来的 latent 表示。</p>\n<div class=\"warn-box\">⚠️ 注意：VIN 仍需要监督目标对象状态，视觉编码器并不是完全无监督对象发现；它的贡献是把视觉解析与关系动力学端到端对齐。</div>",
      "quiz": {
        "q": "VIN 相比原始 Interaction Network 主要增加了什么能力？",
        "options": [
          "从原始视频帧中学习对象状态表示并进行物理 rollout",
          "用哈密顿量保证能量守恒",
          "把所有对象合并成一个全局向量",
          "只预测单步像素重建"
        ],
        "answer": 0,
        "explain": "VIN 在 IN 前加入 CNN 感知模块，使模型可从视频观测中解析对象 latent 状态，再用 IN 预测未来物理轨迹。"
      }
    },
    {
      "id": "hnn",
      "num": 25,
      "name": "HNN",
      "fullName": "哈密顿神经网络 (Hamiltonian Neural Networks)",
      "year": "2019.12",
      "org": "Google Brain",
      "parent": "interaction_networks",
      "paperUrl": "https://proceedings.neurips.cc/paper/2019/hash/26cd8ecadce0d4efd6cc8a8725cbd1f8-Abstract.html",
      "projectUrl": "",
      "category": "physics",
      "motivation": "引入哈密顿力学确保能量守恒",
      "summary": "HNN 用神经网络参数化系统的哈密顿量 \\(H(q,p)\\)，再通过哈密顿方程从能量梯度导出动力学，解决普通神经网络直接拟合状态导数时容易违反能量守恒、长期 rollout 漂移的问题。",
      "keyPoints": [
        "<strong>学习标量 Hamiltonian</strong>：网络输出单个能量式标量，而不是直接输出状态导数",
        "<strong>辛梯度动力学</strong>：通过 <span class=\"kb-math kb-math-inline\">\\dot{q}=\\partial H/\\partial p</span>、<span class=\"kb-math kb-math-inline\">\\dot{p}=-\\partial H/\\partial q</span> 构造向量场",
        "<strong>无监督守恒量学习</strong>：不需要能量标签，只用状态导数监督即可学到近似能量守恒量",
        "<strong>时间可逆性</strong>：哈密顿系统的流映射满足相空间体积守恒和可逆性",
        "<strong>多任务验证</strong>：质量弹簧、理想摆、真实摆、二体问题和像素摆",
        "<strong>像素到 Hamiltonian</strong>：结合 autoencoder 在 latent 空间学习 pendulum 的哈密顿动力学"
      ],
      "detail": "<p><img alt=\"HNN 质量弹簧示意\" src=\"https://ar5iv.labs.arxiv.org/html/1906.01563/assets/x1.png\" />\n<em>图：普通神经网络 rollout 出现能量漂移，而 HNN 学到近似总能量的守恒量并保持轨道稳定。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># Hamiltonian Neural Network training\ndef hnn_derivative(q, p):\n    x = concat(q, p)\n    H = hamiltonian_mlp(x)          # scalar\n    dH_dq, dH_dp = grad(H, (q, p))\n    q_dot = dH_dp\n    p_dot = -dH_dq\n    return q_dot, p_dot\n\nfor q, p, q_dot_true, p_dot_true in dataset:\n    q_dot_pred, p_dot_pred = hnn_derivative(q, p)\n    loss = mse(q_dot_pred, q_dot_true) + mse(p_dot_pred, p_dot_true)\n    update(loss)\n\n# rollout 用 ODE integrator 积分 hnn_derivative\ntrajectory = solve_ivp(hnn_derivative, initial_state)\n</code></pre>\n<h5>动机与背景</h5>\n<p>普通神经网络学习动力学时通常直接拟合：</p>\n<div class=\"kb-math kb-math-display\">\\dot{x} = f_{\\theta}(x)</div>\n<p>这种方法可以在训练分布内拟合单步导数，但没有物理守恒约束。长期积分时，即使每步误差很小，也可能表现为能量逐渐增加或衰减，最终轨迹从真实系统中漂走。</p>\n<p>HNN 的核心想法是把输出空间从“任意向量场”限制为“某个哈密顿量的辛梯度”。如果系统有正则坐标 <span class=\"kb-math kb-math-inline\">x=(q,p)</span>，哈密顿力学给出：</p>\n<div class=\"kb-math kb-math-display\">\\frac{d}{dt}\n\\begin{bmatrix}\nq \\\\\np\n\\end{bmatrix}\n=\n\\begin{bmatrix}\n\\frac{\\partial H}{\\partial p} \\\\\n-\\frac{\\partial H}{\\partial q}\n\\end{bmatrix}</div>\n<p>这样构造出的动力学天然沿着 <span class=\"kb-math kb-math-inline\">H</span> 的等值线运动，因此不会随意改变能量。</p>\n<h5>学习目标</h5>\n<p>HNN 参数化标量函数：</p>\n<div class=\"kb-math kb-math-display\">H_{\\theta}(q,p) \\in \\mathbb{R}</div>\n<p>再用自动微分得到导数：</p>\n<div class=\"kb-math kb-math-display\">\\hat{\\dot{q}} = \\frac{\\partial H_{\\theta}}{\\partial p}, \\quad\n\\hat{\\dot{p}} = -\\frac{\\partial H_{\\theta}}{\\partial q}</div>\n<p>训练损失只比较预测导数和观测导数：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{HNN} =\n\\left\\|\n\\frac{\\partial H_{\\theta}}{\\partial p} - \\dot{q}\n\\right\\|_2^2\n+\n\\left\\|\n-\\frac{\\partial H_{\\theta}}{\\partial q} - \\dot{p}\n\\right\\|_2^2</div>\n<p>论文强调不需要真实能量标签；网络学到的是与真实总能量成比例或相差常数的守恒量，这已足以稳定轨迹。</p>\n<h5>像素摆实验</h5>\n<p>在像素观测中，模型先用 autoencoder 把连续两帧 pendulum 图像编码为 latent 坐标 <span class=\"kb-math kb-math-inline\">z=(q,p)</span>，再在 latent 空间应用 HNN。损失包括像素重建、HNN 导数拟合和 latent 辅助约束，使 latent 的两半近似满足正则坐标关系。</p>\n<p>这说明 HNN 不一定只能接收人工定义的坐标；只要编码器能学出接近正则坐标的表示，就可以把哈密顿先验用于高维观测。</p>\n<h5>与 IN/GNS 的区别</h5>\n<p>IN 和 GNS 通过对象关系图表达局部相互作用，适合多对象组合泛化；HNN 则从守恒律出发，约束整个系统的动力学向量场。它不要求显式对象图，但要求状态能表示为正则坐标 <span class=\"kb-math kb-math-inline\">(q,p)</span>，且系统近似保守。</p>\n<div class=\"warn-box\">⚠️ 注意：HNN 对摩擦、耗散、碰撞等非保守过程不天然适配。真实摆实验中如果存在阻尼，HNN 会倾向于学习一个近似守恒系统，无法解释能量损失本身。</div>",
      "quiz": {
        "q": "HNN 为什么比直接预测状态导数的 MLP 更能保持长期稳定？",
        "options": [
          "因为 HNN 输出更多参数",
          "因为 HNN 通过哈密顿量的辛梯度构造动力学，天然约束能量式守恒量",
          "因为 HNN 不需要训练数据",
          "因为 HNN 只预测位置，不预测动量"
        ],
        "answer": 1,
        "explain": "HNN 学习标量 H(q,p)，再用哈密顿方程生成向量场，使轨迹沿守恒量等值线演化，从结构上减少能量漂移。"
      }
    },
    {
      "id": "lnn",
      "num": 26,
      "name": "LNN",
      "fullName": "拉格朗日神经网络 (Lagrangian Neural Networks)",
      "year": "2020.03",
      "org": "MIT",
      "parent": "hnn",
      "paperUrl": "https://arxiv.org/abs/2003.04630",
      "projectUrl": "",
      "category": "physics",
      "motivation": "基于拉格朗日力学处理复杂约束系统",
      "summary": "LNN 提出用神经网络直接参数化拉格朗日量 \\(L(q, \\dot{q})\\)，通过欧拉-拉格朗日方程推导运动方程，解决了哈密顿神经网络 (HNN) 必须依赖正则坐标的限制，使物理先验神经网络能够处理任意坐标系下的复杂约束系统。",
      "keyPoints": [
        "<strong>拉格朗日参数化</strong>：用神经网络学习系统的拉格朗日量 <span class=\"kb-math kb-math-inline\">L(q, \\dot{q})</span>，而非直接学习动力学映射",
        "<strong>任意坐标兼容</strong>：不要求正则坐标 <span class=\"kb-math kb-math-inline\">(q, p)</span>，可直接使用广义坐标 <span class=\"kb-math kb-math-inline\">(q, \\dot{q})</span>，适用范围远超 HNN",
        "<strong>欧拉-拉格朗日约束</strong>：通过 <span class=\"kb-math kb-math-inline\">\\frac{d}{dt}\\frac{\\partial L}{\\partial \\dot{q}} - \\frac{\\partial L}{\\partial q} = 0</span> 将物理守恒律硬编码进网络结构",
        "<strong>二阶自动微分</strong>：利用深度学习框架的自动微分计算 Hessian <span class=\"kb-math kb-math-inline\">\\frac{\\partial^2 L}{\\partial \\dot{q}^2}</span> 及混合偏导数",
        "<strong>拉格朗日图网络 (LGN)</strong>：将方法扩展到 PDE 系统，通过图网络对拉格朗日密度求和建模连续场",
        "<strong>实验验证</strong>：在双摆、相对论粒子、1D 波动方程三个任务上展示了长时程能量守恒与坐标无关性优势"
      ],
      "detail": "<p><img alt=\"LNN 核心框架图\" src=\"https://ar5iv.labs.arxiv.org/html/2003.04630/assets/new_lnn_figv3_fat.png\" />\n<em>图：LNN 核心思想示意。物理学家用拉格朗日量描述双摆等物理系统的动力学（黑色）。普通神经网络在长时间预测中因误差累积而失败（红色），而 LNN 通过学习拉格朗日量并利用物理约束推导运动方程，实现精确的长期预测（蓝色）。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># Lagrangian Neural Network 前向推理\n# 输入: 广义坐标 q, 广义速度 q_dot\n# 输出: 广义加速度 q_ddot\n\ndef lnn_forward(q, q_dot, lagrangian_nn):\n    &quot;&quot;&quot;通过欧拉-拉格朗日方程计算加速度&quot;&quot;&quot;\n    # 1. 神经网络预测拉格朗日量\n    L = lagrangian_nn(q, q_dot)  # L: scalar\n\n    # 2. 计算所需的偏导数（自动微分）\n    dL_dq = grad(L, q)           # ∂L/∂q\n    dL_dq_dot = grad(L, q_dot)   # ∂L/∂q̇\n\n    # 3. 计算 Hessian 和混合偏导\n    H = jacobian(dL_dq_dot, q_dot)  # ∂²L/∂q̇² (Hessian)\n    J = jacobian(dL_dq_dot, q)      # ∂²L/∂q∂q̇ (混合项)\n\n    # 4. 通过欧拉-拉格朗日方程求解加速度\n    # q̈ = H⁻¹ [∂L/∂q - (∂²L/∂q∂q̇) q̇]\n    q_ddot = solve(H, dL_dq - J @ q_dot)\n\n    return q_ddot\n\n# 训练循环\nfor (q, q_dot, q_ddot_true) in dataset:\n    q_ddot_pred = lnn_forward(q, q_dot, lagrangian_nn)\n    loss = MSE(q_ddot_pred, q_ddot_true)\n    optimizer.step(loss)\n</code></pre>\n<h5>动机与背景</h5>\n<p>物理系统的动力学建模是科学计算的核心问题。传统方法直接用神经网络拟合状态到状态的映射 <span class=\"kb-math kb-math-inline\">\\dot{x} = f_\\theta(x)</span>，虽然短期预测准确，但由于缺乏物理约束，长时间积分后会严重违反能量守恒等基本物理定律。</p>\n<p><strong>哈密顿神经网络 (HNN)</strong> 率先引入物理先验，通过学习哈密顿量 <span class=\"kb-math kb-math-inline\">H(q, p)</span> 并利用哈密顿方程 <span class=\"kb-math kb-math-inline\">\\dot{q} = \\frac{\\partial H}{\\partial p},\\ \\dot{p} = -\\frac{\\partial H}{\\partial q}</span> 来保证能量守恒。然而 HNN 有一个关键限制：<strong>它要求输入必须是正则坐标 <span class=\"kb-math kb-math-inline\">(q, p)</span></strong>，其中 <span class=\"kb-math kb-math-inline\">p</span> 是正则动量。在许多实际问题中（如机器人关节角度、传感器读数），我们获得的是广义坐标和广义速度 <span class=\"kb-math kb-math-inline\">(q, \\dot{q})</span>，而非正则动量。从 <span class=\"kb-math kb-math-inline\">\\dot{q}</span> 到 <span class=\"kb-math kb-math-inline\">p</span> 的转换本身就需要知道系统的拉格朗日量，形成了鸡生蛋的困境。</p>\n<div class=\"key-point\">💡 <strong>关键洞察</strong>：拉格朗日力学与哈密顿力学在物理上等价，但拉格朗日形式直接使用 <span class=\"kb-math kb-math-inline\">(q, \\dot{q})</span> 作为状态变量，天然兼容任意广义坐标，无需正则变换。</div>\n<h5>核心机制：欧拉-拉格朗日方程驱动的神经网络</h5>\n<p>LNN 的核心思想极为优雅：用一个神经网络 <span class=\"kb-math kb-math-inline\">\\mathcal{L}_\\theta</span> 参数化拉格朗日量，然后通过经典力学的欧拉-拉格朗日方程自动推导出运动方程。</p>\n<p><strong>拉格朗日量</strong>定义为动能减去势能：</p>\n<div class=\"kb-math kb-math-display\">L(q, \\dot{q}) = T(\\dot{q}) - V(q)</div>\n<p><strong>欧拉-拉格朗日方程</strong>给出系统的运动方程：</p>\n<div class=\"kb-math kb-math-display\">\\frac{d}{dt}\\frac{\\partial L}{\\partial \\dot{q}} - \\frac{\\partial L}{\\partial q} = 0</div>\n<p>将全导数展开，可以得到加速度的显式表达：</p>\n<div class=\"kb-math kb-math-display\">\\ddot{q} = \\left(\\frac{\\partial^2 L}{\\partial \\dot{q}^2}\\right)^{-1} \\left[\\frac{\\partial L}{\\partial q} - \\left(\\frac{\\partial^2 L}{\\partial q \\partial \\dot{q}}\\right) \\dot{q}\\right]</div>\n<p>这个公式是 LNN 的核心计算步骤。其中：\n- <span class=\"kb-math kb-math-inline\">\\frac{\\partial^2 L}{\\partial \\dot{q}^2}</span> 是拉格朗日量对广义速度的 <strong>Hessian 矩阵</strong>，对应系统的广义质量矩阵\n- <span class=\"kb-math kb-math-inline\">\\frac{\\partial^2 L}{\\partial q \\partial \\dot{q}}</span> 是<strong>混合偏导数</strong>，捕捉坐标与速度之间的耦合（如科里奥利力）\n- <span class=\"kb-math kb-math-inline\">\\frac{\\partial L}{\\partial q}</span> 包含广义力的信息</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：Hessian 矩阵 <span class=\"kb-math kb-math-inline\">\\frac{\\partial^2 L}{\\partial \\dot{q}^2}</span> 必须可逆。对于合理的物理系统，这等价于要求广义质量矩阵正定，这在物理上总是成立的。</div>\n<h5>自动微分的关键作用</h5>\n<p>LNN 的实现高度依赖现代深度学习框架的<strong>自动微分</strong>能力。具体来说，需要计算：</p>\n<ol>\n<li><strong>一阶梯度</strong> <span class=\"kb-math kb-math-inline\">\\frac{\\partial L}{\\partial q}</span> 和 <span class=\"kb-math kb-math-inline\">\\frac{\\partial L}{\\partial \\dot{q}}</span>：标准反向传播</li>\n<li><strong>二阶导数</strong> <span class=\"kb-math kb-math-inline\">\\frac{\\partial^2 L}{\\partial \\dot{q}^2}</span>：对一阶梯度再次求导（Hessian）</li>\n<li><strong>混合二阶导数</strong> <span class=\"kb-math kb-math-inline\">\\frac{\\partial^2 L}{\\partial q \\partial \\dot{q}}</span>：交叉偏导数</li>\n</ol>\n<p>这些高阶导数在 JAX 等框架中可以通过嵌套的 <code>grad</code> 和 <code>jacobian</code> 调用高效计算。论文使用 JAX 实现，利用其函数式自动微分特性。</p>\n<h5>与 HNN 的核心区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>HNN</th>\n<th>LNN</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>学习目标</td>\n<td>哈密顿量 <span class=\"kb-math kb-math-inline\">H(q, p)</span></td>\n<td>拉格朗日量 <span class=\"kb-math kb-math-inline\">L(q, \\dot{q})</span></td>\n</tr>\n<tr>\n<td>输入坐标</td>\n<td>正则坐标 <span class=\"kb-math kb-math-inline\">(q, p)</span></td>\n<td>任意广义坐标 <span class=\"kb-math kb-math-inline\">(q, \\dot{q})</span></td>\n</tr>\n<tr>\n<td>运动方程</td>\n<td>哈密顿方程（一阶ODE）</td>\n<td>欧拉-拉格朗日方程（二阶ODE）</td>\n</tr>\n<tr>\n<td>坐标限制</td>\n<td>必须正则变换</td>\n<td><strong>无限制</strong></td>\n</tr>\n<tr>\n<td>约束系统</td>\n<td>困难</td>\n<td>自然处理</td>\n</tr>\n<tr>\n<td>计算代价</td>\n<td>一阶导数</td>\n<td>二阶导数（Hessian）</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 <strong>关键优势</strong>：在相对论粒子实验中，HNN 在非正则坐标下完全失败（轨迹发散），而 LNN 在同样的任意坐标下仍能准确学习动力学。这验证了坐标无关性是 LNN 的核心优势。</div>\n<h5>拉格朗日图网络：扩展到 PDE 系统</h5>\n<p>论文进一步提出了<strong>拉格朗日图网络 (Lagrangian Graph Networks, LGN)</strong>，将 LNN 的思想扩展到偏微分方程（PDE）描述的连续系统。</p>\n<p>核心思想是将连续场离散化为图上的节点，每个节点的<strong>拉格朗日密度</strong> <span class=\"kb-math kb-math-inline\">\\mathcal{L}_i</span> 由其局部邻域决定：</p>\n<div class=\"kb-math kb-math-display\">L_{\\text{total}} = \\sum_i \\mathcal{L}_\\theta(q_i, \\dot{q}_i, q_{\\mathcal{N}(i)})</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\mathcal{N}(i)</span> 是节点 <span class=\"kb-math kb-math-inline\">i</span> 的邻居集合。这种设计使得 LNN 可以建模波动方程等连续物理系统，同时保持平移不变性和守恒律。</p>\n<p><img alt=\"双摆实验结果\" src=\"https://ar5iv.labs.arxiv.org/html/2003.04630/assets/x1.png\" />\n<em>图：双摆任务实验结果对比。LNN 和基线模型在短期动力学建模上表现相似，但在能量守恒方面 LNN 显著优于无物理先验的基线。</em></p>\n<p><img alt=\"相对论粒子实验\" src=\"https://ar5iv.labs.arxiv.org/html/2003.04630/assets/x4.png\" />\n<em>图：相对论粒子任务。(a) HNN 在非正则坐标下失败；(b) HNN 在正则坐标下成功；(c) LNN 在任意坐标下均成功，验证了坐标无关性优势。</em></p>",
      "quiz": {
        "q": "与哈密顿神经网络 (HNN) 相比，拉格朗日神经网络 (LNN) 的核心优势是什么？",
        "options": [
          "训练速度更快，因为只需一阶导数",
          "能够在任意广义坐标下工作，无需正则坐标变换",
          "网络参数量更少，更容易收敛",
          "可以直接预测系统能量，无需积分"
        ],
        "answer": 1,
        "explain": "LNN 基于拉格朗日力学，直接使用广义坐标 (q, q̇) 作为输入，而 HNN 要求正则坐标 (q, p)。这使得 LNN 能处理无法轻易获得正则动量的复杂约束系统。"
      }
    },
    {
      "id": "gns",
      "num": 27,
      "name": "GNS",
      "fullName": "图网络模拟器 (Learning to Simulate)",
      "year": "2020.07",
      "org": "DeepMind",
      "parent": "vin",
      "paperUrl": "https://proceedings.mlr.press/v119/sanchez-gonzalez20a.html",
      "projectUrl": "",
      "category": "physics",
      "motivation": "利用GNN模拟流体刚体可变形材料",
      "summary": "GNS 将复杂物理系统表示为粒子图，用 encode-process-decode 图网络通过多轮消息传递预测粒子加速度，并用噪声扰动训练缓解 rollout 误差累积，解决学习型模拟器难以统一模拟流体、刚体和可变形材料的问题。",
      "keyPoints": [
        "<strong>粒子图表示</strong>：每个粒子是节点，局部邻域内粒子关系是边，边随 rollout 动态重建",
        "<strong>Encode-Process-Decode</strong>：编码粒子/边特征，多轮 GN message passing，再解码为每粒子加速度",
        "<strong>Euler update</strong>：模型预测 <span class=\"kb-math kb-math-inline\">\\hat{a}_t</span>，由固定积分器更新速度和位置",
        "<strong>相对位置归纳偏置</strong>：边特征使用相对位移和距离，提升空间平移泛化",
        "<strong>训练噪声注入</strong>：向输入速度加入 random-walk noise，让模型适应自身 rollout 产生的偏差",
        "<strong>跨材料统一模拟</strong>：覆盖 Water、Sand、Goop、MultiMaterial、WaterRamps 等流体/颗粒/黏塑材料",
        "<strong>尺度泛化</strong>：训练单步、测试长 rollout，并可泛化到更多粒子和更大场景"
      ],
      "detail": "<p><img alt=\"GNS 复杂材料模拟\" src=\"https://ar5iv.labs.arxiv.org/html/2002.09405/assets/x1.png\" />\n<em>图：GNS 在 Water-3D、Goop-3D、Sand-3D 等粒子系统上生成长时程 rollout。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># Graph Network-based Simulator\ndef gns_step(particles, velocity_history, globals):\n    # 1. 动态构图：连接半径内粒子\n    edges = radius_graph(particles.positions, radius=R)\n\n    # 2. Encoder：节点/边特征编码到 latent graph\n    node_feat = concat(particles.positions, velocity_history, particles.material, globals)\n    edge_feat = relative_displacement_and_distance(edges, particles.positions)\n    graph = encode_nodes_edges(node_feat, edge_feat)\n\n    # 3. Processor：M 轮消息传递\n    for _ in range(M):\n        graph = graph_network_block(graph)      # edge update + node update + residual\n\n    # 4. Decoder：输出每粒子加速度\n    accel = decode_node_acceleration(graph.nodes)\n\n    # 5. 固定积分器更新\n    new_velocity = particles.velocity + accel * dt\n    new_position = particles.position + new_velocity * dt\n    return new_position, new_velocity\n\nfor pair in sampled_trajectory_pairs:\n    noisy_input = add_random_walk_noise(pair.input)\n    accel_pred = gns_step(noisy_input)\n    loss = mse(normalize(accel_pred), normalize(pair.target_accel))\n    update(loss)\n</code></pre>\n<h5>动机与背景</h5>\n<p>传统物理模拟器通常需要针对材料类型和场景手工设计：流体、沙子、黏塑性材料、刚体交互往往使用不同方程或求解器。学习型模拟器希望直接从轨迹数据中学习动力学，但标准端到端网络难以处理数千到数万个粒子的高维状态。</p>\n<p>GNS 的关键观察是：粒子模拟本身就可以看作图上的局部消息传递。粒子只与半径内邻居强交互，压力、碰撞、摩擦和材料约束都可以由局部边消息逐步传播。</p>\n<h5>模型框架</h5>\n<p>GNS 将状态 <span class=\"kb-math kb-math-inline\">S_t</span> 表示为粒子集合，学习动力学函数：</p>\n<div class=\"kb-math kb-math-display\">\\hat{a}_t = f_{\\theta}(S_t)</div>\n<p>再用固定 update procedure 预测下一状态：</p>\n<div class=\"kb-math kb-math-display\">v_{t+1} = v_t + \\hat{a}_t \\Delta t</div>\n<div class=\"kb-math kb-math-display\">x_{t+1} = x_t + v_{t+1} \\Delta t</div>\n<p>与直接预测位置不同，预测加速度让模型更接近物理求解器中的“计算动力学信息 + 积分更新”分工。</p>\n<h5>Encode-Process-Decode 图网络</h5>\n<p>Encoder 将粒子状态和边属性映射为 latent graph：</p>\n<div class=\"kb-math kb-math-display\">G^0 = E(S_t)</div>\n<p>Processor 执行 <span class=\"kb-math kb-math-inline\">M</span> 轮消息传递：</p>\n<div class=\"kb-math kb-math-display\">G^{m+1} = P_m(G^m)</div>\n<p>Decoder 从最终节点 latent 输出加速度：</p>\n<div class=\"kb-math kb-math-display\">\\hat{a}_i = D(G^M_i)</div>\n<p>论文发现 message-passing steps 是长期性能的关键超参数，因为多轮传递允许局部约束沿粒子邻域传播，从而模拟更长程的物理影响。</p>\n<h5>训练噪声与 rollout 稳定性</h5>\n<p>GNS 训练用单步监督，但测试要自回归 rollout 上百到上千步。若训练输入总是真实状态，模型从未见过自己预测带来的小误差，rollout 时会快速偏离分布。论文用 random-walk noise 污染输入速度，并相应调整位置，使训练分布更接近 rollout 分布：</p>\n<div class=\"kb-math kb-math-display\">\\tilde{v}_t = v_t + \\eta_t</div>\n<div class=\"kb-math kb-math-display\">\\mathcal{L} = \\|\\hat{a}_{\\theta}(\\tilde{S}_t) - a_t\\|_2^2</div>\n<p>这个技巧与 DAgger/数据增强思想类似，是 GNS 长时程稳定的主要因素之一。</p>\n<h5>与 IN/VIN 的区别</h5>\n<p>IN 更像一般对象关系推理框架，VIN 解决从像素得到对象状态的问题；GNS 则专门面向大规模粒子物理，把图构建、message passing、加速度预测和积分更新组织成可扩展模拟器。它能在训练时几千粒子、测试时更多粒子的情形下运行，并覆盖多种材料。</p>\n<div class=\"key-point\">💡 关键：GNS 的“物理先验”不来自显式方程，而来自粒子局部相互作用、共享消息函数、相对坐标和固定积分器这些结构选择。</div>",
      "quiz": {
        "q": "GNS 中训练时向输入速度加入 random-walk noise 的目的是什么？",
        "options": [
          "让图的节点数量减少",
          "让模型在训练时见到类似 rollout 误差的扰动，从而减轻长期误差累积",
          "把连续粒子状态离散成 codebook",
          "替代图网络中的消息传递"
        ],
        "answer": 1,
        "explain": "GNS 测试时会反复喂入自己的预测，输入会带偏差；训练噪声让模型提前适应这种分布偏移，提高长 rollout 稳定性。"
      }
    },
    {
      "id": "roboscape",
      "num": 28,
      "name": "Roboscape",
      "fullName": "机器人场景 (Physics-informed Embodied World Model)",
      "year": "2026.01",
      "org": "Tsinghua University",
      "parent": "gns",
      "paperUrl": "https://arxiv.org/abs/2601.roboscape",
      "projectUrl": "",
      "category": "physics",
      "motivation": "引入物理先验提升机器人场景预测准确性",
      "summary": "RoboScape 提出在自回归机器人视频世界模型中联合学习 RGB 生成、时间深度预测和自适应关键点动力学，用几何一致性与接触区域运动约束提升机器人交互视频的物理合理性。",
      "keyPoints": [
        "<strong>输入链接限制</strong>：清单中的 <code>https://arxiv.org/abs/2601.roboscape</code> 疑似占位符；实际公开论文为 <code>https://arxiv.org/abs/2506.23135</code>",
        "<strong>物理先验数据管线</strong>：从 AGIBOT-World 视频中抽取 RGB、深度、动作、关键点轨迹和质量过滤标签",
        "<strong>双分支 co-autoregressive Transformer</strong>：RGB token 分支和 depth token 分支并行预测未来帧",
        "<strong>Temporal depth prediction</strong>：深度分支为 RGB 生成注入 3D 几何一致性约束",
        "<strong>Adaptive keypoint dynamics learning</strong>：选择运动幅度最大的关键点，约束接触和形变区域的时序 token 一致性",
        "<strong>Keypoint-guided attention</strong>：对关键点轨迹覆盖区域提高训练权重，强化复杂局部运动学习",
        "<strong>下游机器人用途</strong>：生成数据可辅助 Diffusion Policy、pi0 等策略训练，也可作为 policy evaluator"
      ],
      "detail": "<p><img alt=\"RoboScape 框架图\" src=\"https://arxiv.org/html/2506.23135v1/x2.png\" />\n<em>图：RoboScape 将 RGB 视频生成、时间深度预测和关键点动力学学习合并到统一自回归世界模型中。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># RoboScape physics-informed world model\nfor clip in agibot_world_clips:\n    rgb_tokens = magvit2.encode_rgb(clip.rgb_frames)\n    depth_maps = video_depth_anything(clip.rgb_frames)\n    depth_tokens = tokenize_depth(depth_maps)\n    keypoints = spatial_tracker(clip.rgb_frames)\n    active_kpts = select_top_motion_keypoints(keypoints, top_k=K)\n    action_embed = robot_action_encoder(clip.actions)\n\n    # 双分支自回归预测\n    rgb_pred, depth_pred, hidden_rgb, hidden_depth = dct_transformer(\n        history_rgb=rgb_tokens[:-1],\n        history_depth=depth_tokens[:-1],\n        actions=action_embed,\n    )\n\n    rgb_loss = cross_entropy(rgb_pred, rgb_tokens[1:])\n    depth_loss = cross_entropy(depth_pred, depth_tokens[1:])\n    kp_consistency = temporal_token_consistency(hidden_rgb, active_kpts)\n    kp_weighted_loss = keypoint_guided_attention_loss(rgb_pred, rgb_tokens[1:], active_kpts)\n\n    loss = rgb_loss + lambda_d * depth_loss + lambda_k * kp_consistency + lambda_a * kp_weighted_loss\n    update(loss)\n</code></pre>\n<h5>动机与背景</h5>\n<p>机器人视频世界模型常被用来生成交互数据、想象未来和评估策略，但纯 RGB 目标会鼓励模型拟合表面纹理，而不是理解物体接触、深度结构和材料形变。对机器人来说，这些错误非常致命：布料可能无物理原因地变形，物体可能穿透，抓取过程可能视觉上平滑但动作不可执行。</p>\n<p>RoboScape 的核心判断是：物理合理性不一定要通过昂贵的外部物理仿真器注入，也可以通过多任务辅助监督让视频模型在训练中学习几何和运动先验。论文选用两个易从视频中提取的先验：时间深度一致性和关键点轨迹一致性。</p>\n<h5>数据处理管线</h5>\n<p>论文从 AGIBOT-World 构建大规模机器人视频片段，使用多个现成模型产生物理相关标注：Video Depth Anything 生成深度序列，SpatialTracker 采样并跟踪关键点，TransNetV2 检测镜头边界，InternVL 标注动作语义与关键帧，FlowNet 用于过滤低质量或运动混乱片段。</p>\n<p>这个管线的作用是把原始互联网/机器人视频整理为更适合世界模型训练的多模态样本：</p>\n<div class=\"kb-math kb-math-display\">(o_{1:T}^{rgb}, o_{1:T}^{depth}, a_{1:T}, k_{1:T})</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">a_t</span> 是机器人动作，<span class=\"kb-math kb-math-inline\">k_t</span> 是关键点坐标轨迹。</p>\n<h5>双分支 RGB-Depth 自回归</h5>\n<p>RoboScape 用 MAGVIT-2 将 RGB 帧压缩为离散 token，也将深度图 token 化。RGB 和 depth 分支都用 Spatial-Temporal Transformer block，并接收动作嵌入：</p>\n<div class=\"kb-math kb-math-display\">\\hat{z}^{rgb}_{t+1} = f_{rgb}(z^{rgb}_{\\le t}, z^{dep}_{\\le t}, a_t)</div>\n<div class=\"kb-math kb-math-display\">\\hat{z}^{dep}_{t+1} = f_{dep}(z^{dep}_{\\le t}, a_t)</div>\n<p>深度分支的中间特征通过线性投影注入 RGB 分支：</p>\n<div class=\"kb-math kb-math-display\">h^{rgb}_{\\ell} \\leftarrow h^{rgb}_{\\ell} + W_{\\ell} h^{dep}_{\\ell}</div>\n<p>这样 RGB 生成不仅学习“下一帧长什么样”，还受到 3D 深度结构的约束。</p>\n<h5>自适应关键点动力学</h5>\n<p>对于机器人操作，最关键的物理信息往往集中在接触区域和高运动区域。RoboScape 不依赖手工分割，而是根据关键点运动幅度选择 top-k active keypoints：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{K} = \\text{TopK}_i \\sum_t \\|k_{i,t} - k_{i,t-1}\\|</div>\n<p>然后对这些关键点在各帧对应的视觉 token 施加时序一致性：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{kp} =\n\\sum_{i \\in \\mathcal{K}}\\sum_t\n\\|h_{t, k_{i,t}} - h_{0, k_{i,0}}\\|_2^2</div>\n<p>直觉是：布料、袋子、工具和被抓取物体的局部关键点轨迹反映了材料和接触动力学。让模型关注这些点，比对整幅图平均施加约束更能改善物理交互细节。</p>\n<h5>联合目标与下游意义</h5>\n<p>最终训练目标组合 RGB token 预测、depth token 预测、关键点一致性和关键点加权 token loss：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L} =\n\\mathcal{L}_{rgb}\n+ \\lambda_d \\mathcal{L}_{depth}\n+ \\lambda_k \\mathcal{L}_{kp}\n+ \\lambda_a \\mathcal{L}_{attn}</div>\n<p>论文报告在 50,000 视频 clips、约 6.5M 训练 clips 上训练，并在外观保真、几何一致和动作可控性指标上优于 IRASim、iVideoGPT、Genie 和 CogVideoX。更重要的是，RoboScape 生成的视频可作为机器人策略训练数据，也能作为 policy evaluator，与真实仿真评估结果保持相关。</p>\n<div class=\"key-point\">💡 关键：RoboScape 的物理先验不是显式求解牛顿方程，而是把“深度几何”和“关键点运动”变成世界模型训练时必须同时解释的监督信号。</div>",
      "quiz": {
        "q": "RoboScape 中自适应关键点动力学学习主要约束什么？",
        "options": [
          "整幅图所有静态背景像素",
          "运动幅度较大的接触/形变区域在时间上的 token 一致性",
          "语言提示与动作标签的一致性",
          "相机内参的标定误差"
        ],
        "answer": 1,
        "explain": "RoboScape 选择运动最活跃的关键点并约束其跨帧 token 表示，促使模型学习接触、形变和材料相关的局部动力学。"
      }
    },
    {
      "id": "newton",
      "num": 29,
      "name": "Newton 1.0",
      "fullName": "牛顿物理引擎 (Newton Physics Engine)",
      "year": "2026.03",
      "org": "NVIDIA",
      "parent": "gns",
      "paperUrl": "https://blogs.nvidia.com/blog/2026/04/gtc26-robots/",
      "projectUrl": "",
      "category": "physics",
      "motivation": "开源物理引擎实现精确刚体流体动力学",
      "summary": "Newton 1.0 提出面向机器人学习的开源、GPU 加速、可扩展物理引擎，用统一的 OpenUSD/Warp 架构把刚体、接触、变形体、自定义求解器和 Isaac/MuJoCo 工作流连接起来，解决高保真接触仿真与大规模强化学习训练难以兼得的问题。",
      "keyPoints": [
        "<strong>开源物理引擎定位</strong>：由 NVIDIA、Google DeepMind、Disney Research 发起，Linux Foundation 治理，面向机器人仿真与学习",
        "<strong>统一架构</strong>：以 OpenUSD 作为场景与资产数据层，以 NVIDIA Warp/CUDA 作为 GPU 计算层",
        "<strong>多求解器设计</strong>：包含 MuJoCo Warp、Kamino、变形体求解器、规范求解器与用户自定义求解器",
        "<strong>高保真接触建模</strong>：支持 SDF 碰撞、hydroelastic contact、摩擦与复杂闭链机构，用于接触丰富的操控和装配任务",
        "<strong>可微与可扩展</strong>：支持通过仿真反传梯度，便于系统辨识、控制优化和学习算法集成",
        "<strong>机器人学习工作流</strong>：可作为 Isaac Lab/Isaac Sim 的后端，使同一 MDP、奖励、PPO 训练循环在不同物理后端间切换",
        "<strong>视觉 RL 支持</strong>：Warp tiled camera sensor 支持 RGB、深度、法线、实例分割等批量观测生成"
      ],
      "detail": "<h5>资料来源说明</h5>\n<div class=\"warn-box\">⚠️ 注意：清单中的 <code>paper_url</code> 指向 NVIDIA 新闻/博客页，而不是同行评审论文。以下内容基于 NVIDIA 官方 Newton 技术博客、Newton Developer 页面和开源仓库 README 中公开的架构与接口说明整理；因此这里更接近“系统/算法精读”，而不是传统论文复现。</div>\n<p><img alt=\"Newton 架构图\" src=\"https://developer-blogs.nvidia.com/wp-content/uploads/2026/03/newton-architecture.webp\" />\n<em>图：Newton 以 OpenUSD 连接 Isaac、MuJoCo、Warp 和内部多求解器；核心模块包含 collision、contact、sensor、control 与多种 solver。</em></p>\n<h5>核心仿真循环</h5>\n<pre><code class=\"language-python\"># Newton 典型仿真/训练后端伪代码\nbuilder = newton.ModelBuilder()\nbuilder.add_usd(&quot;robot_or_scene.usd&quot;)      # 统一资产入口，也可来自 URDF/MJCF\nmodel = builder.finalize()                 # 上传到 GPU\n\nsolver = newton.solvers.SolverKamino(model)  # 或 MuJoCo Warp / custom solver\nstate_0 = model.state()\nstate_1 = model.state()\ncontrol = model.control()\ncontacts = model.contacts()\n\nfor step in range(num_steps):\n    state_0.clear_forces()\n    policy_action = policy(observation(state_0))\n    control.apply(policy_action)\n\n    model.collide(state_0, contacts)       # 碰撞检测和接触生成\n    solver.step(state_0, state_1, control, contacts, sim_dt)\n\n    reward = task_reward(state_1)\n    replay.add(state_0, policy_action, reward, state_1)\n    state_0, state_1 = state_1, state_0\n</code></pre>\n<h5>动机与背景</h5>\n<p>机器人世界模型有两类常见瓶颈：一类是学习式世界模型容易在接触、摩擦、闭链机构和变形体上产生不可控误差；另一类是传统物理引擎虽可解释，但在大规模 RL 中常受限于 CPU 性能、求解器耦合和资产格式割裂。Newton 的目标不是学习一个神经动力学模型，而是提供一个可用于学习的物理底座：把高保真物理、GPU 并行、可微分和通用场景描述整合成同一后端。</p>\n<p>其核心抽象可以写成：</p>\n<div class=\"kb-math kb-math-display\">s_{t+1} = \\mathrm{Solver}_{\\phi}(s_t, a_t, c_t, \\Delta t)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">s_t</span> 是系统状态，<span class=\"kb-math kb-math-inline\">a_t</span> 是控制输入，<span class=\"kb-math kb-math-inline\">c_t</span> 是由碰撞检测与接触模型生成的约束/接触信息，<span class=\"kb-math kb-math-inline\">\\phi</span> 表示求解器和物理参数。与纯神经世界模型不同，Newton 把动力学先验写进求解器，把需要学习的部分留给策略、参数辨识或自定义模块。</p>\n<h5>核心机制：模块化物理栈</h5>\n<p>Newton 的设计重点是“可替换但统一”。OpenUSD 负责表达机器人、环境、材质、传感器和资产组合；Newton 中的 collision、contact、sensor、control 模块把场景转换为求解器可处理的运行时数据；不同 solver 再负责推进物理状态。这样做的价值在于，研究者可以在同一个机器人学习任务中替换物理后端，观察策略是否依赖某个求解器的偏差。</p>\n<p>接触丰富任务是 Newton 重点覆盖的场景。传统点接触模型在插拔、装配、手内操控中容易出现不稳定或不真实的摩擦行为。Newton 引入 SDF 碰撞和 hydroelastic contact，使接触不再只是单点冲量，而可以表达接触面积、压力分布和扭转摩擦。对工业装配来说，这比只关心质心运动的粗糙刚体仿真更接近真实任务。</p>\n<h5>与学习式世界模型的关系</h5>\n<p>在 KnowledgePipeline 的世界模型谱系里，Newton 更像“可微物理世界模型”而不是“数据驱动潜在动力学模型”。它不直接学习 <span class=\"kb-math kb-math-inline\">p(s_{t+1}|s_t,a_t)</span>，而是提供一个可批量调用的近似物理转移函数。训练时，策略可以通过 Isaac Lab 的 RL 环境调用 Newton：</p>\n<div class=\"kb-math kb-math-display\">\\pi_\\theta(a_t|o_t) \\rightarrow \\text{Newton step} \\rightarrow (o_{t+1}, r_t, d_t)</div>\n<p>如果启用可微仿真，还可以把目标函数对物理参数或控制变量的梯度反传：</p>\n<div class=\"kb-math kb-math-display\">\\nabla_\\phi J = \\frac{\\partial J}{\\partial s_T}\\prod_{t=0}^{T-1}\\frac{\\partial s_{t+1}}{\\partial s_t}\\frac{\\partial s_t}{\\partial \\phi}</div>\n<p>这使 Newton 同时支持两种用途：作为大规模 RL 的快速环境，以及作为系统辨识和轨迹优化的可微动力学模型。</p>\n<h5>与传统仿真器的区别</h5>\n<p>Newton 相比单一物理引擎的关键区别在于它把“求解器生态”作为一等公民。MuJoCo Warp 提供 GPU 化 MuJoCo 能力；Kamino 处理闭链机构和复杂机制；变形体求解器覆盖软物体；自定义 solver 允许研究者接入新物理模型。OpenUSD 则降低了不同机器人资产、仿真器和渲染管线之间的转换成本。</p>\n<div class=\"key-point\">💡 关键：Newton 的算法价值不在某一个新损失函数，而在把机器人学习需要的物理求解、资产表达、传感器生成和训练后端统一到可扩展 GPU 运行时中。</div>",
      "quiz": {
        "q": "Newton 1.0 相比纯学习式世界模型的核心优势是什么？",
        "options": [
          "只通过视频预测未来帧，不需要物理约束",
          "用可扩展物理求解器提供高保真、可并行、可微的状态转移",
          "完全替代强化学习策略，不再需要奖励函数",
          "只支持单一 MuJoCo 场景格式"
        ],
        "answer": 1,
        "explain": "Newton 的核心是 GPU 加速、多求解器、OpenUSD 统一资产和可微物理，使机器人学习可以在物理约束下获得高吞吐仿真。"
      }
    },
    {
      "id": "mbpo",
      "num": 30,
      "name": "MBPO",
      "fullName": "基于模型的策略优化 (Model-Based Policy Optimization)",
      "year": "2019.12",
      "org": "UC Berkeley",
      "parent": "—",
      "paperUrl": "https://proceedings.neurips.cc/paper/2019/hash/5faf461eff3099671ad63c6f3f094f7f-Abstract.html",
      "projectUrl": "",
      "category": "planning",
      "motivation": "短步长模型生成数据极大提升样本效率",
      "summary": "MBPO 提出从真实数据状态出发、利用学习到的动力学模型进行短步长分支 rollout 来生成训练数据，并给出了基于模型误差和 rollout 长度的单调改进理论保证，在连续控制任务上实现了比无模型方法快一个数量级的样本效率，同时保持了相当的渐近性能。",
      "keyPoints": [
        "<strong>分支 rollout 机制</strong>：从真实经验回放池中采样状态，用学习到的模型执行 <span class=\"kb-math kb-math-inline\">k</span> 步短 rollout，而非从初始状态分布开始长 rollout，有效控制模型误差累积",
        "<strong>单调改进理论保证</strong>：Theorem 4.1 给出模型下策略回报与真实回报的下界关系；Theorem 4.2 证明分支 rollout 的误差随 <span class=\"kb-math kb-math-inline\">k</span> 线性增长而非随 <span class=\"kb-math kb-math-inline\">1/(1-\\gamma)</span> 二次增长",
        "<strong>概率集成模型</strong>：使用多个概率神经网络（输出高斯分布的均值和方差）组成的集成模型作为动力学模型，同时捕获认知不确定性和随机不确定性",
        "<strong>高梯度更新比</strong>：短 rollout 生成的大量模型数据使得每个真实环境步可执行 20–40 次策略梯度更新（远高于纯无模型方法的稳定上限）",
        "<strong>基于 SAC 的策略优化</strong>：在模型生成数据上使用 Soft Actor-Critic 进行策略学习，继承其最大熵框架的探索优势",
        "<strong>模型泛化分析</strong>：实验表明训练数据越多，模型对策略分布偏移的敏感度越低（<span class=\"kb-math kb-math-inline\">\\mathrm{d}\\epsilon_{m&#x27;}/\\mathrm{d}\\epsilon_\\pi</span> 递减），为使用更长 rollout 提供了实践依据"
      ],
      "detail": "<h5>动机与背景</h5>\n<p>基于模型的强化学习（MBRL）通过学习环境动力学模型来提升样本效率，但长期以来面临一个核心困境：<strong>模型误差在多步预测中会指数级累积</strong>，导致策略在模型中被\"利用\"（model exploitation），学到的策略在真实环境中表现很差。</p>\n<p>传统的 Dyna 风格方法从初始状态分布开始做完整 episode 的模型 rollout，误差随 horizon 长度急剧放大。而纯无模型方法（如 SAC、PPO）虽然渐近性能好，但需要大量真实交互样本。MBPO 的核心问题是：<strong>能否找到一种\"恰到好处\"的模型使用方式，既利用模型提升效率，又不被模型误差拖累？</strong></p>\n<h5>理论框架：单调改进下界</h5>\n<p>MBPO 的理论基础建立在策略改进下界之上。首先定义关键符号：</p>\n<ul>\n<li><span class=\"kb-math kb-math-inline\">\\eta[\\pi]</span>：策略 <span class=\"kb-math kb-math-inline\">\\pi</span> 在<strong>真实环境</strong>中的期望回报</li>\n<li><span class=\"kb-math kb-math-inline\">\\hat{\\eta}[\\pi]</span>：策略 <span class=\"kb-math kb-math-inline\">\\pi</span> 在<strong>学习到的模型</strong>中的期望回报</li>\n<li><span class=\"kb-math kb-math-inline\">\\epsilon_m = \\max_t \\mathbb{E}_{s \\sim \\pi_t} [D_{\\mathrm{TV}}(p(s&#x27;|s,a) \\| \\hat{p}(s&#x27;|s,a))]</span>：模型误差（TV 距离）</li>\n<li><span class=\"kb-math kb-math-inline\">\\epsilon_\\pi = \\max_t \\mathbb{E}_{s \\sim d_{\\pi_D}^t} [D_{\\mathrm{TV}}(\\pi \\| \\pi_D)]</span>：策略偏移</li>\n</ul>\n<p><strong>Theorem 4.1（模型下的单调改进）</strong>：</p>\n<div class=\"kb-math kb-math-display\">\\eta[\\pi] \\geq \\hat{\\eta}[\\pi] - C(\\epsilon_m, \\epsilon_\\pi)</div>\n<p>其中惩罚项 <span class=\"kb-math kb-math-inline\">C</span> 同时依赖模型误差 <span class=\"kb-math kb-math-inline\">\\epsilon_m</span> 和策略偏移 <span class=\"kb-math kb-math-inline\">\\epsilon_\\pi</span>。这意味着：只要模型足够准确且策略更新幅度受控，在模型中改进策略就能保证在真实环境中也改进。</p>\n<div class=\"key-point\">💡 <strong>关键直觉</strong>：该 bound 将\"信任模型的程度\"量化为两个可控量——模型精度和策略变化幅度。</div>\n<p><strong>Theorem 4.2（分支 rollout 的更紧下界）</strong>：</p>\n<p>对于从真实数据分布 <span class=\"kb-math kb-math-inline\">d_{\\pi_D}</span> 出发、在模型中执行 <span class=\"kb-math kb-math-inline\">k</span> 步的分支 rollout：</p>\n<div class=\"kb-math kb-math-display\">\\eta[\\pi] \\geq \\hat{\\eta}_k^{\\mathrm{branch}}[\\pi] - 2r_{\\max}\\left[\\frac{\\gamma^{k+1}\\epsilon_\\pi}{(1-\\gamma)^2} + \\frac{\\gamma^k + 2}{1-\\gamma}\\epsilon_\\pi + \\frac{k}{1-\\gamma}(\\epsilon_m + 2\\epsilon_\\pi)\\right]</div>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：bound 中有两个竞争因素——随 <span class=\"kb-math kb-math-inline\">k</span> 指数衰减的项（来自真实数据的\"锚定\"效应）和随 <span class=\"kb-math kb-math-inline\">k</span> 线性增长的项（模型误差累积）。这意味着存在一个最优的 rollout 长度 <span class=\"kb-math kb-math-inline\">k^*</span>，在理论上平衡了模型利用与误差控制。</div>\n<h5>模型泛化的实证分析</h5>\n<p>理论 bound 在字面意义上取最大值时 <span class=\"kb-math kb-math-inline\">k=0</span>（即完全不用模型），这是因为分析对模型泛化能力做了最悲观的假设。论文通过实验发现：</p>\n<p><img alt=\"模型泛化分析\" src=\"https://ar5iv.labs.arxiv.org/html/1906.08253/assets/x1.png\" />\n<em>图 1：(a) 模型误差随策略偏移的变化——训练数据越多，误差增长越慢；(b) 模型误差对策略偏移的局部导数 <span class=\"kb-math kb-math-inline\">\\mathrm{d}\\epsilon_{m&#x27;}/\\mathrm{d}\\epsilon_\\pi</span> 随训练数据量递减，说明模型泛化能力随数据增加而增强。</em></p>\n<p>实验表明模型误差对策略偏移的敏感度可以用线性近似：</p>\n<div class=\"kb-math kb-math-display\">\\hat{\\epsilon}_{m&#x27;}(\\epsilon_\\pi) \\approx \\epsilon_m + \\epsilon_\\pi \\cdot \\frac{\\mathrm{d}\\epsilon_{m&#x27;}}{\\mathrm{d}\\epsilon_\\pi}</div>\n<p>当 <span class=\"kb-math kb-math-inline\">\\mathrm{d}\\epsilon_{m&#x27;}/\\mathrm{d}\\epsilon_\\pi &lt; 2</span> 时（实验中训练数据充足时成立），这比理论中悲观的 <span class=\"kb-math kb-math-inline\">\\epsilon_m + 2\\epsilon_\\pi</span> 上界更紧，使得更长的 rollout 在实践中变得可行。</p>\n<h5>算法：实用 MBPO</h5>\n<pre><code class=\"language-python\"># Algorithm 2: Model-Based Policy Optimization (MBPO)\n初始化策略 π_φ, 环境回放池 D_env, 模型回放池 D_model\nfor N epochs:\n    # 1. 训练动力学模型\n    在 D_env 上通过最大似然训练模型集成 p_θ\n\n    for E environment steps:\n        # 2. 真实环境交互\n        用 π_φ 在环境中执行动作, 将 (s, a, r, s') 加入 D_env\n\n        # 3. 模型分支 rollout\n        for M model rollouts:\n            从 D_env 中均匀采样状态 s_t\n            从 s_t 出发, 用 π_φ 在模型 p_θ 中执行 k 步 rollout\n            将生成的 (s, a, r, s') 加入 D_model\n\n        # 4. 策略优化（高更新比）\n        for G gradient updates:  # G = 20~40, 远高于无模型方法\n            φ ← φ - λ_π · ∇̂_φ J_π(φ, D_model)\n</code></pre>\n<div class=\"key-point\">💡 <strong>关键设计</strong>：即使 rollout 长度 <span class=\"kb-math kb-math-inline\">k</span> 很短（甚至 <span class=\"kb-math kb-math-inline\">k=1</span>），通过执行大量（<span class=\"kb-math kb-math-inline\">M</span> 次）短 rollout，仍可生成足够多的模型数据来支撑高频策略更新。这是 MBPO 能做到每个环境步 20–40 次梯度更新的关键。</div>\n<h5>核心机制详解</h5>\n<p><strong>1. 概率集成动力学模型</strong></p>\n<p>模型由 <span class=\"kb-math kb-math-inline\">B</span> 个独立的概率神经网络组成（论文中 <span class=\"kb-math kb-math-inline\">B=7</span>，每次 rollout 随机选 5 个），每个网络输出下一状态的高斯分布参数：</p>\n<div class=\"kb-math kb-math-display\">\\hat{p}_{\\theta_b}(s_{t+1} | s_t, a_t) = \\mathcal{N}(\\mu_{\\theta_b}(s_t, a_t),\\; \\Sigma_{\\theta_b}(s_t, a_t))</div>\n<ul>\n<li><strong>随机不确定性</strong>（aleatoric）：由每个网络输出的方差 <span class=\"kb-math kb-math-inline\">\\Sigma_{\\theta_b}</span> 捕获</li>\n<li><strong>认知不确定性</strong>（epistemic）：由集成中不同网络预测的分歧捕获</li>\n</ul>\n<p>训练损失为负对数似然：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}(\\theta_b) = -\\sum_{(s,a,s&#x27;) \\in \\mathcal{D}_{\\text{env}}} \\log \\hat{p}_{\\theta_b}(s&#x27; | s, a)</div>\n<p><strong>2. 分支 rollout 与数据混合</strong></p>\n<p>与传统 Dyna 从初始状态分布 rollout 不同，MBPO 从 <span class=\"kb-math kb-math-inline\">\\mathcal{D}_{\\text{env}}</span> 中均匀采样真实状态作为 rollout 起点。这保证了：\n- rollout 起始状态分布接近真实策略的状态访问分布\n- 短步长 rollout 的状态不会偏离真实分布太远\n- 模型只需在真实数据附近的局部区域保持准确</p>\n<p><strong>3. 与传统方法的关键区别</strong></p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>rollout 起点</th>\n<th>rollout 长度</th>\n<th>数据用途</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Dyna / SLBO</td>\n<td>初始状态分布</td>\n<td>完整 episode</td>\n<td>策略训练</td>\n</tr>\n<tr>\n<td>MVE / STEVE</td>\n<td>真实数据</td>\n<td>短</td>\n<td>值函数目标改进</td>\n</tr>\n<tr>\n<td><strong>MBPO</strong></td>\n<td><strong>真实数据</strong></td>\n<td><strong>短（1–15步）</strong></td>\n<td><strong>策略训练</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p>MBPO 结合了两个优势：从真实数据出发（控制分布偏移）+ 用模型数据直接训练策略（比仅改进值目标更充分利用模型）。</p>\n<h5>实验结果</h5>\n<p><img alt=\"训练曲线\" src=\"https://ar5iv.labs.arxiv.org/html/1906.08253/assets/x2.png\" />\n<em>图 2：MBPO 与五个基线在 MuJoCo 连续控制任务上的学习曲线。MBPO 在 Ant 任务上 30 万步达到 SAC 300 万步的性能，样本效率提升约 10 倍。</em></p>\n<p>关键实验发现：</p>\n<ul>\n<li><strong>样本效率</strong>：MBPO 在所有任务上比 SAC 快约 10 倍，在 Hopper 和 Walker2d 上分别仅需 14 分钟和 40 分钟的等效实时仿真</li>\n<li><strong>渐近性能</strong>：与最优无模型方法（SAC）相当，远超纯模型方法（PETS 在高维 Ant 任务上失败）</li>\n<li><strong>消融实验</strong>：</li>\n<li>仅提高无模型 SAC 的梯度更新比（不用模型数据）无法匹配 MBPO，证明模型数据确实有帮助</li>\n<li>固定 <span class=\"kb-math kb-math-inline\">k=1</span> 的单步 rollout 已能获得大部分收益，验证了理论分析中\"短 rollout 最优\"的结论</li>\n<li>模型足够准确支持 200 步 rollout，但用于策略优化时短 rollout 效果更好；500 步 rollout 则误差过大</li>\n</ul>\n<p><img alt=\"消融实验\" src=\"https://ar5iv.labs.arxiv.org/html/1906.08253/assets/x3.png\" />\n<em>图 3：消融实验——无模型高更新比、不同 rollout 长度、值展开对比。单步 rollout 提供了一个难以超越的强基线。</em></p>",
      "quiz": {
        "q": "MBPO 中分支 rollout 从哪里采样起始状态？",
        "options": [
          "从环境的初始状态分布中采样",
          "从真实经验回放池中均匀采样已访问过的状态",
          "从模型生成的虚拟状态中采样",
          "从当前策略的在线轨迹末端状态采样"
        ],
        "answer": 1,
        "explain": "MBPO 的核心设计是从真实经验回放池 D_env 中均匀采样状态作为模型 rollout 的起点（Algorithm 2 第 7 行），这保证了 rollout 起始分布接近真实数据分布，从而控制模型误差累积。"
      }
    },
    {
      "id": "simple",
      "num": 31,
      "name": "SimPLe",
      "fullName": "模拟策略学习 (Simulated Policy Learning)",
      "year": "2020.04",
      "org": "Google Research",
      "parent": "mbpo",
      "paperUrl": "https://arxiv.org/abs/1903.00374",
      "projectUrl": "",
      "category": "planning",
      "motivation": "在Atari 100k展示极高样本效率",
      "summary": "SimPLe 提出用视频预测世界模型反复生成短程模拟轨迹，再用 PPO 在模型内训练策略，解决 Atari 低样本场景中无模型 RL 需要海量真实交互的问题。",
      "keyPoints": [
        "<strong>迭代式 Dyna 框架</strong>：真实环境采样、训练世界模型、在世界模型中训练策略三步循环执行",
        "<strong>Atari 100k 设置</strong>：只使用 100k agent-environment interactions，约等于两小时真实游戏时间",
        "<strong>视频预测世界模型</strong>：输入 4 帧堆叠图像和动作，预测下一帧与奖励",
        "<strong>离散随机潜变量模型</strong>：用离散 bit latent 表达环境随机性，训练 LSTM 自回归预测 latent bits",
        "<strong>短 rollout 策略训练</strong>：从真实 replay buffer 中随机状态启动模型 rollout，定期重置以控制模型误差累积",
        "<strong>PPO 作为模型内优化器</strong>：不直接用模型做树搜索，而是在学习到的模拟器里训练策略网络",
        "<strong>经验聚合</strong>：新策略回到真实 Atari 环境采样，扩展数据集后再更新世界模型"
      ],
      "detail": "<h5>主循环示意</h5>\n<p><img alt=\"SimPLe 主循环\" src=\"https://arxiv.org/html/1903.00374v5/extracted/1903.00374v5/figures/Cycle_full.png\" />\n<em>图：SimPLe 的三阶段循环：真实环境交互收集数据、训练世界模型、在世界模型中训练策略。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># SimPLe: Simulated Policy Learning\ninitialize policy pi\ninitialize world_model M\nreplay = []\n\nwhile real_env_budget_not_exhausted:\n    # 1. 用当前策略收集真实 Atari 交互\n    for t in range(real_steps_per_iter):\n        a_t = pi(o_t)\n        o_next, r_t, done = real_env.step(a_t)\n        replay.append((o_t, a_t, r_t, o_next, done))\n        o_t = reset_if_done(o_next, done)\n\n    # 2. 用真实 replay 训练视频预测世界模型\n    M.fit(replay, targets=[&quot;next_frame&quot;, &quot;reward&quot;, &quot;done&quot;])\n\n    # 3. 在世界模型中短 rollout，并用 PPO 更新策略\n    for update in range(ppo_updates):\n        start = sample_observation_stack(replay)\n        simulated_traj = M.rollout(pi, start, horizon=short_horizon)\n        pi = PPO_update(pi, simulated_traj, bootstrap_value=True)\n</code></pre>\n<h5>动机与背景</h5>\n<p>Atari 是像素输入、部分可观测、长时序决策的典型基准。DQN、Rainbow、IMPALA 等无模型算法可以获得很强最终性能，但通常需要数千万到数亿帧交互；这和人类玩家几分钟内形成游戏物理直觉的样本效率差距很大。SimPLe 的核心问题是：能否把“预测未来图像和奖励”转化为真实的策略学习收益？</p>\n<p>论文采用近似 Dyna 的思想，但关键难点在于 Atari 的图像动力学非常复杂。世界模型如果直接长程展开，像素误差会逐步放大，策略还可能利用模型错误得到虚假高奖励。因此 SimPLe 不把模型当作完美模拟器，而是只用它提供短程、反复重启的想象经验。</p>\n<h5>世界模型：从动作条件视频预测到随机 latent</h5>\n<p>SimPLe 的世界模型学习：</p>\n<div class=\"kb-math kb-math-display\">\\hat{o}_{t+1}, \\hat{r}_t, \\hat{d}_t = M_\\phi(o_{t-3:t}, a_t, z_t)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">o_{t-3:t}</span> 是 4 帧堆叠观测，<span class=\"kb-math kb-math-inline\">a_t</span> 是 one-hot 动作，<span class=\"kb-math kb-math-inline\">z_t</span> 是随机潜变量。确定性版本用卷积编码器和反卷积解码器预测下一帧；随机版本增加一个近似后验网络，在训练时看到真实下一帧并产生离散 latent bits，在推理时由 LSTM 自回归生成这些 bits。</p>\n<p>这种离散随机设计解决了两个问题。第一，Atari 中存在闪烁、遮挡、敌人行为等不确定性，单一确定性预测会平均化未来。第二，连续 VAE latent 的 KL 权重对游戏很敏感，离散 bit + 自回归 prior 更容易在多游戏上稳定工作。</p>\n<p>训练损失由图像预测和奖励预测组成。图像输出既可以是连续 RGB，也可以是每像素 256 类 softmax。论文强调 clipped loss 很重要，因为 Atari 大面积背景像素容易主导梯度，而真正影响控制的是球、敌人、子弹等小区域。</p>\n<h5>策略训练：短 rollout 控制模型偏差</h5>\n<p>在模型内训练策略时，SimPLe 使用 PPO。每个模拟 episode 不从模型自己生成的任意状态开始，而是从真实 replay buffer 的状态堆叠启动，并且只展开较短 horizon。这个设计类似后来 MBPO 的短分支 rollout：</p>\n<div class=\"kb-math kb-math-display\">\\tau_{\\text{model}} = (o_i, a_i, \\hat{r}_i, \\hat{o}_{i+1}, \\ldots, \\hat{o}_{i+k})</div>\n<p>当 <span class=\"kb-math kb-math-inline\">k</span> 较短时，模型误差还没有严重累积；当 <span class=\"kb-math kb-math-inline\">k</span> 太长时，策略会进入模型未见过的状态区域，导致 model exploitation。SimPLe 还在 rollout 末尾用价值函数 bootstrap，缓解短 rollout 无法看到远期奖励的问题：</p>\n<div class=\"kb-math kb-math-display\">G_t = \\sum_{j=0}^{k-1}\\gamma^j \\hat{r}_{t+j} + \\gamma^k V_\\psi(\\hat{o}_{t+k})</div>\n<h5>与传统方法的区别</h5>\n<p>SimPLe 与纯无模型 Atari 算法的差异在于：真实交互只用于改进世界模型，策略的大量梯度更新发生在模型里。它与 MuZero 的差异也很明显：MuZero 学习的是只服务于价值、奖励和策略的潜在模型，并通过 MCTS 规划；SimPLe 学习可视化的下一帧模拟器，并用 PPO 在该模拟器中训练策略。</p>\n<div class=\"key-point\">💡 关键：SimPLe 的贡献不是证明像素世界模型完美，而是证明“短程视频预测 + 模型内策略优化 + 数据聚合”足以在 Atari 100k 低样本设置中取得强样本效率。</div>",
      "quiz": {
        "q": "SimPLe 在世界模型中训练策略时为什么使用短 rollout？",
        "options": [
          "因为 PPO 不能处理超过 1 步的轨迹",
          "为了减少模型预测误差在长序列中的累积和被策略利用",
          "因为 Atari 游戏没有长期奖励",
          "为了完全避免价值函数 bootstrap"
        ],
        "answer": 1,
        "explain": "SimPLe 的 learned simulator 并不完美，长程展开会放大像素和奖励误差；短 rollout 从真实 buffer 状态重启，可以控制模型偏差。"
      }
    },
    {
      "id": "muzero",
      "num": 32,
      "name": "MuZero",
      "fullName": "无模型零 (MuZero)",
      "year": "2020.12",
      "org": "DeepMind",
      "parent": "mbpo",
      "paperUrl": "https://www.nature.com/articles/s41586-020-03051-4",
      "projectUrl": "",
      "category": "planning",
      "motivation": "学习对价值奖励策略有用的潜在动力学",
      "summary": "MuZero 提出只学习对规划有用的潜在动力学、奖励、价值和策略，而不重建环境观测本身，从而在不知道规则的情况下把 AlphaZero 式 MCTS 扩展到 Atari、Go、Chess 和 Shogi。",
      "keyPoints": [
        "<strong>三网络世界模型</strong>：representation <span class=\"kb-math kb-math-inline\">h_\\theta</span>、dynamics <span class=\"kb-math kb-math-inline\">g_\\theta</span>、prediction <span class=\"kb-math kb-math-inline\">f_\\theta</span>",
        "<strong>不预测原始观测</strong>：潜在状态只需保留能预测 reward、value、policy 的信息",
        "<strong>潜在空间 MCTS</strong>：树搜索在 learned hidden state 上展开，不需要真实环境模拟器",
        "<strong>搜索策略监督</strong>：训练目标中的 policy target 来自 MCTS visit distribution",
        "<strong>奖励和值联合训练</strong>：unroll 多步后同时预测即时奖励、折扣回报和值",
        "<strong>跨领域统一</strong>：同一算法同时处理已知完美规则游戏和未知视觉 Atari 环境",
        "<strong>Reanalyze 思想</strong>：可用最新网络重新分析历史轨迹，提升数据利用效率"
      ],
      "detail": "<h5>规划示意</h5>\n<p><img alt=\"MuZero 潜在空间规划\" src=\"https://storage.googleapis.com/gdm-deepmind-com-prod-public/media/original_images/62277f565ad61d23ae431c30_Fig202.gif\" />\n<em>图：MuZero 先用 representation function <span class=\"kb-math kb-math-inline\">h</span> 把历史观测映射到隐藏状态，再用 dynamics <span class=\"kb-math kb-math-inline\">g</span> 和 prediction <span class=\"kb-math kb-math-inline\">f</span> 在搜索树中评估未来动作。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># MuZero training and acting\nfor iteration in range(num_iterations):\n    # Acting: 用 MCTS 改进当前策略\n    history = env.reset()\n    while not done:\n        s0 = h_theta(history)\n        search_tree = MCTS(root=s0, dynamics=g_theta, prediction=f_theta)\n        pi_search = visit_count_distribution(search_tree)\n        action = sample_or_argmax(pi_search)\n        obs, reward, done = env.step(action)\n        replay.add(history, action, reward, pi_search)\n        history = history + [action, obs]\n\n    # Training: 对真实轨迹做 recurrent unroll\n    batch = replay.sample_sequences()\n    for history_t, actions, rewards, value_targets, policy_targets in batch:\n        s = h_theta(history_t)\n        losses = prediction_loss(f_theta(s), policy_targets[0], value_targets[0])\n        for k, a in enumerate(actions):\n            s, r_hat = g_theta(s, a)\n            p_hat, v_hat = f_theta(s)\n            losses += reward_loss(r_hat, rewards[k])\n            losses += value_loss(v_hat, value_targets[k + 1])\n            losses += policy_loss(p_hat, policy_targets[k + 1])\n        theta = optimizer.step(losses)\n</code></pre>\n<h5>动机与背景</h5>\n<p>AlphaZero 的强大来自 MCTS 与深度策略/价值网络的闭环：搜索产生更强的动作分布，网络再学习搜索结果。但 AlphaZero 依赖已知规则模拟器；它能在棋盘游戏中展开未来局面，却不能直接用于 Atari 这类只有像素观测、规则未知的环境。传统模型式 RL 试图学习完整环境模型 <span class=\"kb-math kb-math-inline\">p(o_{t+1}|o_t,a_t)</span>，但精确预测每个像素既难又未必与决策相关。</p>\n<p>MuZero 的核心洞察是：规划不需要知道完整世界，只需要知道“动作会如何改变未来的奖励、价值和可选策略”。因此它学习的是 value-equivalent model，而不是 reconstruction model。</p>\n<h5>三个函数：h、g、f</h5>\n<p>MuZero 的内部模型由三个函数组成：</p>\n<div class=\"kb-math kb-math-display\">s^0 = h_\\theta(o_{1:t})</div>\n<div class=\"kb-math kb-math-display\">r^k, s^k = g_\\theta(s^{k-1}, a^k)</div>\n<div class=\"kb-math kb-math-display\">p^k, v^k = f_\\theta(s^k)</div>\n<p><span class=\"kb-math kb-math-inline\">h_\\theta</span> 把历史观测编码为初始潜在状态；<span class=\"kb-math kb-math-inline\">g_\\theta</span> 在潜在空间执行动作并预测即时奖励；<span class=\"kb-math kb-math-inline\">f_\\theta</span> 从潜在状态预测策略先验 <span class=\"kb-math kb-math-inline\">p</span> 和价值 <span class=\"kb-math kb-math-inline\">v</span>。注意这里没有 decoder，也没有 <span class=\"kb-math kb-math-inline\">\\hat{o}_{t+1}</span>。隐藏状态 <span class=\"kb-math kb-math-inline\">s</span> 只要能支持搜索和训练目标即可。</p>\n<h5>潜在 MCTS 与动作选择</h5>\n<p>在每个真实环境步，MuZero 以 <span class=\"kb-math kb-math-inline\">s^0</span> 为根节点执行 MCTS。每条边维护访问次数 <span class=\"kb-math kb-math-inline\">N(s,a)</span>、平均价值 <span class=\"kb-math kb-math-inline\">Q(s,a)</span>、先验概率 <span class=\"kb-math kb-math-inline\">P(s,a)</span>、奖励 <span class=\"kb-math kb-math-inline\">R(s,a)</span> 和后继隐藏状态。选择动作时使用 PUCT 类规则：</p>\n<div class=\"kb-math kb-math-display\">a = \\arg\\max_a \\left[ Q(s,a) + U(s,a) \\right]</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">U(s,a)</span> 随先验 <span class=\"kb-math kb-math-inline\">P(s,a)</span> 和父节点访问次数增加，随该动作访问次数增加而下降。搜索结束后，真实动作不是直接由网络 policy 输出，而是由访问次数分布 <span class=\"kb-math kb-math-inline\">\\pi(a|s) \\propto N(s,a)^{1/\\tau}</span> 产生。这使网络每次训练都在模仿一个比自己更强的搜索策略。</p>\n<h5>训练目标：奖励、价值、策略三重监督</h5>\n<p>对一段真实轨迹，MuZero 从时间 <span class=\"kb-math kb-math-inline\">t</span> 的历史观测开始，在模型中按真实动作 unroll <span class=\"kb-math kb-math-inline\">K</span> 步，并在每一步监督：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_t(\\theta)=\n\\sum_{k=0}^{K}\\ell^v(v_t^k, z_{t+k})\n+ \\sum_{k=0}^{K}\\ell^p(p_t^k, \\pi_{t+k})\n+ \\sum_{k=1}^{K}\\ell^r(r_t^k, u_{t+k})\n+ c\\|\\theta\\|^2</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">z</span> 是 n-step bootstrapped return，<span class=\"kb-math kb-math-inline\">\\pi</span> 是 MCTS visit distribution，<span class=\"kb-math kb-math-inline\">u</span> 是真实环境奖励。这个目标把“学模型”和“学规划”绑在一起：模型只会被奖励、价值和策略误差塑形，不会被像素重建误差牵引到任务无关细节。</p>\n<h5>与 SimPLe/MBPO 的区别</h5>\n<p>SimPLe 和 MBPO 都使用模型生成经验再训练策略，因此模型误差可能直接污染策略梯度。MuZero 不把模型 rollout 当作 replay 数据，而是用模型在搜索树中评估候选动作；真实训练目标仍来自真实轨迹和搜索改进策略。相对 AlphaZero，MuZero 去掉了规则模拟器依赖；相对视频预测世界模型，它去掉了观测重建负担。</p>\n<div class=\"key-point\">💡 关键：MuZero 的“世界模型”不是为了看见未来画面，而是为了让搜索树在隐藏空间里可靠地比较动作。</div>",
      "quiz": {
        "q": "MuZero 为什么不需要预测下一帧原始观测？",
        "options": [
          "因为它只在棋盘游戏中使用，没有像素输入",
          "因为它学习的潜在模型只需预测奖励、价值和策略，足够支持规划",
          "因为 MCTS 可以直接访问真实环境未来状态",
          "因为策略网络完全不参与动作选择"
        ],
        "answer": 1,
        "explain": "MuZero 的核心是 value-equivalent latent model；隐藏状态不重建观测，只服务于 reward/value/policy 预测和 MCTS。"
      }
    },
    {
      "id": "tdmpc",
      "num": 33,
      "name": "TD-MPC",
      "fullName": "时序差分模型预测控制 (TD-MPC)",
      "year": "2022.06",
      "org": "UC San Diego",
      "parent": "muzero",
      "paperUrl": "https://arxiv.org/abs/2203.04955",
      "projectUrl": "",
      "category": "planning",
      "motivation": "结合TD学习与MPC无需显式重建损失",
      "summary": "TD-MPC 提出用时序差分学习训练任务导向潜在动力学模型，并在潜在空间中执行短视野 MPC，用终端价值函数补足长远回报，解决连续控制中长程模型预测昂贵且像素/状态重建不一定服务控制的问题。",
      "keyPoints": [
        "<strong>TOLD 模型</strong>：Task-Oriented Latent Dynamics 同时学习 latent transition、reward、Q value 和 policy",
        "<strong>无重建损失</strong>：不用预测未来像素或完整状态，只通过奖励、TD 价值和 latent consistency 塑造模型",
        "<strong>MPC + terminal value</strong>：短 horizon 模型 rollout 负责局部控制，价值函数估计 horizon 之后的回报",
        "<strong>MPPI 规划</strong>：在潜在空间采样动作序列，根据模型奖励和终端 Q 值加权更新采样分布",
        "<strong>策略先验引导规划</strong>：学习一个 policy prior，为采样优化提供候选动作轨迹",
        "<strong>多步反传</strong>：从 reward、value、consistency 三项损失跨多步反传到潜在动力学",
        "<strong>连续控制适配</strong>：在 DMControl、Meta-World 及高维 Dog/Humanoid 任务上显示样本效率优势"
      ],
      "detail": "<h5>方法总览</h5>\n<p><img alt=\"TD-MPC 总览\" src=\"https://ar5iv.labs.arxiv.org/html/2203.04955/assets/x1.png\" />\n<em>图：TD-MPC 在 latent state 上做模型 rollout，短期奖励由模型预测，长期收益由 learned value 估计。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># TD-MPC inference with a TOLD model\ndef plan_tdmpc(obs, previous_mean):\n    z0 = h_theta(obs)\n    mean, std = warm_start(previous_mean), init_std()\n\n    for i in range(num_mppi_iterations):\n        action_sequences = sample_gaussian(mean, std, horizon=H)\n        action_sequences += sample_from_policy_prior(pi_theta, z0)\n\n        returns = []\n        for actions in action_sequences:\n            z = z0\n            total = 0\n            for t, a in enumerate(actions):\n                r_hat = R_theta(z, a)\n                z = d_theta(z, a)\n                total += gamma**t * r_hat\n            total += gamma**H * Q_theta(z, pi_theta(z))\n            returns.append(total)\n\n        elites = top_k(action_sequences, returns)\n        mean, std = weighted_refit(elites, returns)\n\n    return sample_first_action(mean, std)\n\n# training: reward + TD value + latent consistency, no pixel decoder\nloss = reward_loss + value_td_loss + latent_consistency_loss + policy_prior_loss\n</code></pre>\n<h5>动机与背景</h5>\n<p>传统模型预测控制需要一个可靠动力学模型。若模型来自真实仿真器，规划效果强但计算昂贵；若模型从数据学习，长程预测又容易误差累积。另一方面，纯模型自由方法如 SAC 在连续控制中稳定，但真实交互样本效率较低。TD-MPC 的问题设定是：能否把模型式方法的规划优势和 TD 学习的长期价值估计结合起来？</p>\n<p>TD-MPC 的答案是“不学完整世界，只学控制相关世界”。论文认为，让模型重建所有未来像素、阴影或本体状态会浪费容量，并可能学习到与奖励无关的细节。因此 TD-MPC 用任务目标塑造潜在模型，让 latent dynamics 只需要对 reward 和 value 有用。</p>\n<h5>TOLD：任务导向潜在动力学模型</h5>\n<p>TD-MPC 的 TOLD 模型包含五个组件：</p>\n<div class=\"kb-math kb-math-display\">z_t = h_\\theta(s_t), \\quad z_{t+1}=d_\\theta(z_t,a_t)</div>\n<div class=\"kb-math kb-math-display\">\\hat{r}_t = R_\\theta(z_t,a_t), \\quad \\hat{Q}_t=Q_\\theta(z_t,a_t), \\quad \\hat{a}_t=\\pi_\\theta(z_t)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">h</span> 是 encoder，<span class=\"kb-math kb-math-inline\">d</span> 是 latent transition，<span class=\"kb-math kb-math-inline\">R</span> 是奖励头，<span class=\"kb-math kb-math-inline\">Q</span> 是状态动作价值，<span class=\"kb-math kb-math-inline\">\\pi</span> 是策略先验。与 Dreamer、SimPLe 等重建式世界模型不同，TD-MPC 没有 decoder，不产生 <span class=\"kb-math kb-math-inline\">\\hat{s}_{t+1}</span> 或 <span class=\"kb-math kb-math-inline\">\\hat{o}_{t+1}</span>。</p>\n<p>训练时从 replay buffer 采样一段轨迹，只编码第一帧，然后用 <span class=\"kb-math kb-math-inline\">d_\\theta</span> recurrently 预测后续 latent。后续真实观测通过 target encoder 得到 <span class=\"kb-math kb-math-inline\">z^{\\text{target}}_{t+k}</span>，作为 latent consistency 目标：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{cons}} = \\| d_\\theta^{(k)}(z_t,a_{t:t+k-1}) - \\mathrm{sg}(h_{\\bar{\\theta}}(s_{t+k})) \\|^2</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\mathrm{sg}</span> 表示 stop-gradient，<span class=\"kb-math kb-math-inline\">\\bar{\\theta}</span> 是 EMA target network。这个损失不要求 latent 解码成图像，只要求预测 latent 与目标 latent 对齐。</p>\n<h5>TD 学习如何进入世界模型</h5>\n<p>TOLD 的价值头通过 TD 目标训练：</p>\n<div class=\"kb-math kb-math-display\">y_t = r_t + \\gamma Q_{\\bar{\\theta}}(z_{t+1}, \\pi_\\theta(z_{t+1}))</div>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_Q = \\|Q_\\theta(z_t,a_t)-y_t\\|^2</div>\n<p>因为 <span class=\"kb-math kb-math-inline\">Q</span> 的梯度会穿过多步 latent rollout，模型会被迫学习那些能预测长期价值变化的状态因素。奖励损失负责短期局部正确性，TD 价值损失负责长远控制意义，consistency 损失负责防止 latent dynamics 漂移。</p>\n<h5>MPC：短期模型 + 长期价值</h5>\n<p>推理阶段 TD-MPC 不直接执行 <span class=\"kb-math kb-math-inline\">\\pi_\\theta</span>，而是用 MPPI 在 latent space 中优化动作序列。对候选动作序列 <span class=\"kb-math kb-math-inline\">a_{0:H-1}</span>，它评估：</p>\n<div class=\"kb-math kb-math-display\">J(a_{0:H-1}) =\n\\sum_{t=0}^{H-1}\\gamma^t R_\\theta(z_t,a_t)\n+ \\gamma^H Q_\\theta(z_H,\\pi_\\theta(z_H))</div>\n<p>这就是 TD-MPC 的关键折中：模型只需要在短 horizon 内相对准确；horizon 之后的收益交给价值函数。策略先验 <span class=\"kb-math kb-math-inline\">\\pi_\\theta</span> 同时用于 TD target 和规划采样，使优化不必完全从随机动作序列开始。</p>\n<h5>与 MuZero 的联系和差异</h5>\n<p>TD-MPC 与 MuZero 都学习不重建观测的潜在模型，也都让模型服务于 reward/value/policy。但 MuZero 面向离散动作和 MCTS，搜索树由 visit count 产生 policy target；TD-MPC 面向连续动作，通过 MPPI/CEM 风格的采样优化产生动作。TD-MPC 也更强调 actor-critic 的 TD 学习，把终端价值函数作为 MPC 的长远补偿。</p>\n<div class=\"key-point\">💡 关键：TD-MPC 的世界模型不是“像不像真实世界”，而是“能不能在短 rollout 内给 MPC 排序动作，并用价值函数正确补偿未来”。</div>",
      "quiz": {
        "q": "TD-MPC 为什么不使用像素重建损失训练世界模型？",
        "options": [
          "因为它只能处理低维状态，不能处理图像",
          "因为像素重建会迫使模型学习大量控制无关细节，TD-MPC 更关注奖励、价值和潜在一致性",
          "因为 MPC 只能使用真实环境模型",
          "因为 TD 学习不允许使用 latent 表示"
        ],
        "answer": 1,
        "explain": "TD-MPC 的 TOLD 模型是任务导向的，训练信号来自 reward、TD value 和 latent consistency，而不是重建未来观测。"
      }
    },
    {
      "id": "iris",
      "num": 34,
      "name": "IRIS",
      "fullName": "内部语音想象 (Imagination with auto-Regression)",
      "year": "2023.05",
      "org": "Google DeepMind",
      "parent": "muzero",
      "paperUrl": "https://openreview.net/forum?id=vhFu1Acb0xb",
      "projectUrl": "",
      "category": "planning",
      "motivation": "Transformer作为世界模型2小时达人类水平",
      "summary": "IRIS 提出把 Atari 图像离散化为“inner speech”视觉 token，再用自回归 Transformer 建模动作条件未来 token 序列，并在该世界模型中训练策略，使 Atari 100k 仅约两小时交互即可达到人类归一化平均分 1.046。",
      "keyPoints": [
        "<strong>离散自编码器</strong>：将每帧图像压缩成离散 token 网格，形成可被 Transformer 建模的视觉语言",
        "<strong>自回归世界模型</strong>：Transformer 按序预测下一帧 token、reward 和 episode continuation",
        "<strong>想象中训练智能体</strong>：actor-critic 策略在 learned world model 中生成大量 imagined trajectories",
        "<strong>无 lookahead search</strong>：不使用 MCTS，仅依靠世界模型内的策略优化",
        "<strong>Atari 100k SOTA</strong>：在 26 个游戏上平均人类归一化分数 1.046，其中 10 个超过人类",
        "<strong>分阶段训练</strong>：真实交互更新 tokenizer/world model，再用想象轨迹更新 actor-critic",
        "<strong>序列建模视角</strong>：将动力学学习转化为离散 token 语言建模问题"
      ],
      "detail": "<h5>官方展示图</h5>\n<p><img alt=\"IRIS 官方展示\" src=\"https://raw.githubusercontent.com/eloialonso/iris/main/assets/iris.gif\" />\n<em>图：IRIS 官方仓库展示的 Atari agent 行为。OpenReview 页面未提供稳定的 HTML 论文图片直链，因此这里引用官方代码仓库的公开展示图，并在下方用文字流程图说明架构。</em></p>\n<pre><code class=\"language-text\">真实 Atari 交互\n      │\n      ▼\n离散自编码器 tokenizer: o_t -&gt; tokens x_t\n      │\n      ▼\nTransformer world model: p(x_{t+1}, r_t, d_t | x_{\\le t}, a_{\\le t})\n      │\n      ▼\n想象 rollout: (tokens, actions, rewards)\n      │\n      ▼\nActor-Critic / PPO-style policy update\n</code></pre>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># IRIS high-level training loop\ninitialize tokenizer E, D\ninitialize transformer_world_model W\ninitialize actor_critic pi, V\ndataset = collect_random_atari_steps()\n\nwhile real_step_budget_not_exhausted:\n    # 1. 用真实帧训练离散 autoencoder\n    tokens = E(dataset.frames)\n    recon = D(tokens)\n    update_tokenizer(reconstruction_loss(recon, dataset.frames))\n\n    # 2. 训练动作条件 Transformer 世界模型\n    seq = build_token_action_reward_sequences(dataset, E)\n    update(W, next_token_loss + reward_loss + done_loss)\n\n    # 3. 在世界模型中想象轨迹并训练策略\n    for imagination_batch in range(num_batches):\n        start_tokens = sample_context(dataset, E)\n        imagined = W.rollout(policy=pi, start=start_tokens, horizon=H)\n        update_actor_critic(pi, V, imagined)\n\n    # 4. 回到真实 Atari 用新策略采样\n    dataset += collect_real_steps(pi)\n</code></pre>\n<h5>动机与背景</h5>\n<p>SimPLe 证明了 Atari 中视频预测模型可以提升样本效率，但卷积/随机 latent 视频模型在长程一致性和细节表达上仍然困难。IRIS 的动机来自语言建模：如果图像能被转成离散 token，那么环境动力学就可以被建模为条件序列生成问题。Transformer 擅长长上下文和离散序列，因此可以替代传统的卷积递归视频预测模型。</p>\n<p>IRIS 的名字来自 “Imagination with auto-Regression over an Inner Speech”。这里的 inner speech 指视觉 token 序列：agent 不直接在连续像素空间想象，而是在离散视觉语言空间中想象下一步会发生什么。</p>\n<h5>离散 tokenizer：把帧变成视觉词表</h5>\n<p>给定 Atari 帧 <span class=\"kb-math kb-math-inline\">o_t</span>，离散自编码器将其编码为 token 网格：</p>\n<div class=\"kb-math kb-math-display\">x_t = E(o_t), \\quad \\hat{o}_t = D(x_t)</div>\n<p>每个 token 来自有限 codebook。这样，一帧图像不再是连续像素矩阵，而是类似句子的离散符号序列。tokenizer 的好处有三点：压缩观测、降低预测维度、让 Transformer 使用标准 next-token objective。</p>\n<h5>Transformer 世界模型</h5>\n<p>世界模型学习如下分布：</p>\n<div class=\"kb-math kb-math-display\">p_\\theta(x_{t+1}, r_t, d_t \\mid x_{\\le t}, a_{\\le t})</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">x_{t+1}</span> 是下一帧 token，<span class=\"kb-math kb-math-inline\">r_t</span> 是奖励，<span class=\"kb-math kb-math-inline\">d_t</span> 表示 episode 是否继续。训练目标是 token 交叉熵、reward 分类/回归损失与 continuation 损失的组合：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{WM}\n= -\\log p_\\theta(x_{t+1}|x_{\\le t},a_{\\le t})\n+ \\mathcal{L}_r(\\hat{r}_t,r_t)\n+ \\mathcal{L}_d(\\hat{d}_t,d_t)</div>\n<p>与 MuZero 不同，IRIS 的模型确实生成未来观测 token；与 SimPLe 不同，它把未来帧预测转成离散 Transformer 语言建模，而不是直接在像素空间卷积预测。</p>\n<h5>想象中的策略学习</h5>\n<p>训练策略时，IRIS 从真实数据中采样上下文 token，之后交给世界模型自回归展开。策略 <span class=\"kb-math kb-math-inline\">\\pi_\\psi(a_t|x_t)</span> 在 imagined trajectory 中选择动作，世界模型返回下一个 token、奖励和终止信号。actor-critic 用这些想象轨迹更新：</p>\n<div class=\"kb-math kb-math-display\">A_t = \\sum_{k=0}^{H-t-1}\\gamma^k \\hat{r}_{t+k} + \\gamma^{H-t} V(\\hat{x}_H) - V(\\hat{x}_t)</div>\n<p>这种方式的风险是模型偏差，但 Atari 100k 的收益很明显：真实样本少，想象样本便宜；Transformer 世界模型比早期视频模型更能维持短中期一致性。</p>\n<h5>与 MuZero 和 Dreamer 的区别</h5>\n<p>MuZero 学 latent model 并用 MCTS 规划，不生成未来画面；Dreamer 学连续或随机 latent model，并在 latent imagination 中训练 actor；IRIS 则显式生成离散视觉 token，并把世界模型训练变成自回归序列建模。IRIS 不依赖 lookahead search，因此结果更直接体现 Transformer world model 的样本效率。</p>\n<div class=\"key-point\">💡 关键：IRIS 的核心不是“更复杂的策略优化器”，而是把世界模型从像素回归改造成视觉 token 的语言建模问题。</div>",
      "quiz": {
        "q": "IRIS 中 'inner speech' 最准确指什么？",
        "options": [
          "策略网络生成的自然语言推理文本",
          "离散自编码器把 Atari 图像转换成的视觉 token 序列",
          "MCTS 搜索树中的访问次数分布",
          "奖励函数的人工解释"
        ],
        "answer": 1,
        "explain": "IRIS 将图像离散化为 token，Transformer 在这些 token 上做动作条件自回归预测，因此称为 inner speech。"
      }
    },
    {
      "id": "tdmpc2",
      "num": 35,
      "name": "TD-MPC2",
      "fullName": "时序差分模型预测控制2 (TD-MPC2)",
      "year": "2024.05",
      "org": "UC San Diego",
      "parent": "tdmpc",
      "paperUrl": "https://proceedings.iclr.cc/paper_files/paper/2024/hash/cf73d57b6dcda32b293df7c2d5341f49-Abstract-Conference.html",
      "projectUrl": "",
      "category": "planning",
      "motivation": "可扩展鲁棒的连续控制世界模型",
      "summary": "TD-MPC2 在 TD-MPC 的任务导向潜在模型和 MPC 框架上加入 SimNorm、离散回归、Q ensemble、最大熵策略先验和多任务 task embedding，使同一套超参数能扩展到 104 个连续控制任务，并训练 317M 参数的多任务世界模型。",
      "keyPoints": [
        "<strong>可扩展隐式世界模型</strong>：继续采用无 decoder 的 latent dynamics，只预测动作、奖励和价值",
        "<strong>SimNorm latent normalization</strong>：把 latent 投影到多个 simplex，增强稀疏性并缓解梯度爆炸",
        "<strong>离散 reward/value 回归</strong>：在 <span class=\"kb-math kb-math-inline\">h</span>-transform 空间用 soft cross-entropy 建模奖励和值，提升跨任务稳定性",
        "<strong>Q ensemble</strong>：训练多个 Q 函数，并用随机子采样的最小值计算 TD target，降低过估计偏差",
        "<strong>最大熵 policy prior</strong>：替代 TD-MPC 的确定性 policy prior，使任务无关超参数更稳定",
        "<strong>多任务世界模型</strong>：使用可学习 task embedding、zero padding 和 action mask 适配多 observation/action 空间",
        "<strong>大规模验证</strong>：覆盖 DMControl、Meta-World、ManiSkill2、MyoSuite 等 104 个在线 RL 任务"
      ],
      "detail": "<h5>架构图</h5>\n<p><img alt=\"TD-MPC2 架构\" src=\"https://arxiv.org/html/2310.16828v2/x3.png\" />\n<em>图：TD-MPC2 将观测编码为归一化 latent，递归预测动作、奖励和终端价值，不解码未来观测。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># TD-MPC2 online training\ninitialize world_model = {encoder h, dynamics d, reward R, Q ensemble, policy prior pi}\ninitialize task_embeddings e_task\nreplay = ReplayBuffer()\n\nwhile training:\n    # 1. 用 MPC 与环境交互\n    z = h(obs, e_task)\n    action = MPPI_plan(z, d, R, Q_ensemble, pi, action_mask)\n    next_obs, reward, done = env.step(action)\n    replay.add(obs, action, reward, next_obs, done, task_id)\n\n    # 2. 采样多步轨迹训练隐式世界模型\n    batch = replay.sample_uniform()\n    z0 = SimNorm(h(batch.obs0, e_task))\n    loss = 0\n    z = z0\n    for k in range(H):\n        r_logits = R(z, batch.action[k], e_task)\n        q_logits = Q_ensemble(z, batch.action[k], e_task)\n        z_next = SimNorm(d(z, batch.action[k], e_task))\n\n        loss += soft_ce(r_logits, h_transform(batch.reward[k]))\n        loss += soft_ce(q_logits, td_target_min_two_Q(batch, k))\n        loss += latent_consistency(z_next, stopgrad(target_encoder(batch.obs[k+1])))\n        z = z_next\n\n    # 3. 最大熵策略先验\n    loss += alpha * entropy_loss(pi) - Q_value(pi(z))\n    optimizer.step(loss)\n</code></pre>\n<h5>动机与背景</h5>\n<p>TD-MPC 已证明“潜在短程模型 + TD 价值 + MPC”在连续控制中有效，但原始版本仍偏向中小规模单任务设置。不同任务的奖励尺度、观测维度、动作空间和动力学复杂度差异很大，导致同一套超参数不够稳；简单扩大模型容量也可能带来梯度不稳定。TD-MPC2 的目标是把 TD-MPC 变成可扩展、鲁棒、适合多任务的世界模型算法。</p>\n<p>论文的重点不是推翻 TD-MPC，而是系统性修补其工程和算法脆弱点：latent 需要归一化，reward/value 需要尺度鲁棒，Q target 需要抑制过估计，policy prior 需要跨任务稳定，多任务输入输出需要统一接口。</p>\n<h5>隐式世界模型与训练目标</h5>\n<p>TD-MPC2 的基本建模仍是：</p>\n<div class=\"kb-math kb-math-display\">z_t = h_\\theta(s_t, e), \\quad z_{t+1}=d_\\theta(z_t,a_t,e)</div>\n<div class=\"kb-math kb-math-display\">\\hat{r}_t = R_\\theta(z_t,a_t,e), \\quad \\hat{q}_t = Q_\\theta(z_t,a_t,e), \\quad \\hat{a}_t \\sim \\pi_\\theta(z_t,e)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">e</span> 是 task embedding。模型目标结合 joint-embedding prediction、reward prediction 和 TD learning：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L} =\n\\sum_{k=0}^{H}\\lambda^k\n\\left[\n\\mathcal{L}_{\\text{repr}}(z_{t+k}, \\bar{z}_{t+k})\n+ \\mathcal{L}_{r}(\\hat{r}_{t+k}, r_{t+k})\n+ \\mathcal{L}_{q}(\\hat{q}_{t+k}, y_{t+k})\n\\right]</div>\n<p>关键是 <span class=\"kb-math kb-math-inline\">\\mathcal{L}_r</span> 和 <span class=\"kb-math kb-math-inline\">\\mathcal{L}_q</span> 不再是普通 MSE，而是在 <span class=\"kb-math kb-math-inline\">h</span>-transform 后做离散回归。这类似把一个连续标量投到分桶分布上，用 soft target 交叉熵训练。这样 reward/value 的数值尺度变化不会直接导致梯度爆炸或任务间 loss 不平衡。</p>\n<h5>SimNorm：让 latent 稳定可扩展</h5>\n<p>TD-MPC2 使用 SimNorm 将 latent 分组投影到 simplex：</p>\n<div class=\"kb-math kb-math-display\">\\mathrm{SimNorm}(x) =\n\\mathrm{concat}\\left(\\mathrm{softmax}(x_1/\\tau), \\ldots, \\mathrm{softmax}(x_G/\\tau)\\right)</div>\n<p>每组 latent 的元素和为 1。这带来两个效果：一是 latent 范数被约束，降低 recurrent rollout 中的梯度爆炸；二是 softmax 使表示天然稀疏，类似软离散化但仍可微。论文把 SimNorm 视为 TD-MPC2 稳定放大模型容量的关键。</p>\n<h5>规划：MPPI + policy prior + terminal value</h5>\n<p>推理仍采用 TD-MPC 的 MPC 形式：</p>\n<div class=\"kb-math kb-math-display\">J(a_{0:H-1}) =\n\\sum_{t=0}^{H-1}\\gamma^t R_\\theta(z_t,a_t,e)\n+ \\gamma^H Q_\\theta(z_H,\\pi_\\theta(z_H,e),e)</div>\n<p>MPPI 对动作序列采样、打分、重拟合分布，并执行第一个动作。与 TD-MPC 相比，TD-MPC2 的 policy prior 用最大熵目标训练，因而在不同任务上保持更稳定的探索；规划时还通过 action mask 处理多任务中不同动作维度的合法性。</p>\n<h5>多任务与大模型</h5>\n<p>TD-MPC2 的多任务版本把 task embedding 注入 encoder、dynamics、reward、Q 和 policy prior。不同任务的 observation/action 维度通过 padding 统一形状，动作维度通过 mask 避免无效动作参与损失和熵计算。这样，一个 317M 参数模型可以在多个 domain、embodiment 和 action space 上共享世界模型能力。</p>\n<div class=\"key-point\">💡 关键：TD-MPC2 的贡献在于把 TD-MPC 从“强单任务算法”推进到“可扩展世界模型系统”：稳定归一化、尺度鲁棒损失、ensemble target、多任务接口缺一不可。</div>",
      "quiz": {
        "q": "TD-MPC2 中 SimNorm 的主要作用是什么？",
        "options": [
          "把连续动作离散化为固定动作集合",
          "将 latent 表示约束在 simplex 结构中，提高训练稳定性并缓解梯度爆炸",
          "把奖励函数改为人工规则",
          "替代 MPC，使模型直接输出最终动作序列"
        ],
        "answer": 1,
        "explain": "SimNorm 对 latent 分组做 softmax simplex 投影，约束表示尺度并引入稀疏性，是 TD-MPC2 稳定扩展模型容量的重要组件。"
      }
    },
    {
      "id": "jumpy_wm",
      "num": 36,
      "name": "Jumpy WM",
      "fullName": "跳跃式世界模型 (Compositional Planning with Jumpy WM)",
      "year": "2026.02",
      "org": "DeepMind",
      "parent": "tdmpc2",
      "paperUrl": "https://icml.cc/Conferences/2026",
      "projectUrl": "",
      "category": "planning",
      "motivation": "跳跃式动力学解决长程规划误差累积",
      "summary": "Jumpy WM 提出学习跨多个时间尺度的“跳跃式”多步动力学模型，用它在测试时组合预训练策略而不是逐步规划原始动作，从而缓解长程规划中一步模型误差累积和任务特定层级训练成本的问题。",
      "keyPoints": [
        "<strong>资料限制</strong>：清单 <code>paper_url</code> 是 ICML 2026 会议首页，正文基于可访问 arXiv 论文 <code>Compositional Planning with Jumpy World Models</code>",
        "<strong>策略级规划</strong>：把预训练策略作为 temporally extended actions，在测试时规划策略序列",
        "<strong>Jumpy world model / GHM</strong>：学习 policy-conditioned、horizon-conditioned 的未来状态分布",
        "<strong>多时间尺度预测</strong>：用几何折扣 horizon 表达短期到长期 successor occupancy",
        "<strong>Horizon consistency</strong>：提出 Temporal Difference Horizon Consistency，使不同时间尺度预测彼此一致",
        "<strong>CompPlan</strong>：用 learned GHM 估计任意策略序列的价值，并通过随机 shooting 选择组合",
        "<strong>OGBench 验证</strong>：在 antmaze 和 cube manipulation 长程任务上，组合规划显著优于 zero-shot 策略和 action-level planning"
      ],
      "detail": "<h5>论文图与框架说明</h5>\n<p><img alt=\"Jumpy WM 结果图\" src=\"https://arxiv.org/html/2602.19634v1/x1.png\" />\n<em>图：论文 Figure 1 展示 ActionPlan、GPI 和 CompPlan 在长程任务上的成功率变化。arXiv HTML 暴露的主图偏结果对比，方法框架见下方流程图。</em></p>\n<pre><code class=\"language-text\">离线数据 + 一组预训练策略 π_i\n      │\n      ▼\n训练 policy-conditioned GHM:\n    p_\\theta(s' | s, policy_id / policy_embedding, horizon γ)\n      │\n      ├── td-flow: 学习多步 successor distribution\n      └── td-hc: 对齐不同 horizon 的预测\n      ▼\n测试时 CompPlan:\n    采样候选策略序列和切换时间尺度\n      │\n      ▼\n用 GHM 估计执行该策略序列后的 future occupancy 和 return\n      │\n      ▼\n执行第一段策略，随后 receding-horizon replanning\n</code></pre>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># Jumpy WM / CompPlan simplified pseudocode\npretrained_policies = [pi_1, pi_2, ..., pi_n]\nGHM = train_geometric_horizon_model(\n    offline_dataset,\n    condition_on=[&quot;state&quot;, &quot;policy_embedding&quot;, &quot;discount_horizon&quot;],\n    losses=[&quot;td_flow&quot;, &quot;temporal_difference_horizon_consistency&quot;]\n)\n\ndef compplan(state, goal_or_reward):\n    candidates = []\n    for _ in range(num_random_shooting_samples):\n        # 候选是策略序列，而不是原始动作序列\n        policy_seq = sample_policy_sequence(pretrained_policies)\n        switch_probs = sample_or_fix_switching_probabilities()\n\n        value = evaluate_policy_sequence_with_GHM(\n            GHM, state, policy_seq, switch_probs, reward=goal_or_reward\n        )\n        candidates.append((value, policy_seq, switch_probs))\n\n    best = max(candidates, key=lambda x: x[0])\n    return best.policy_seq[0]  # 执行第一段策略，之后重新规划\n</code></pre>\n<h5>动机与背景</h5>\n<p>长程任务中，一步世界模型会遇到典型误差累积问题。即使每一步预测误差很小，规划 horizon 一长，模型 rollout 也会逐渐偏离真实可达状态。层级强化学习试图用 options 或 high-level policies 缩短规划长度，但通常需要为目标任务训练层级结构，泛化到新任务时不够灵活。</p>\n<p>Jumpy WM 采取不同路线：给定一组已经训练好的 base policies，不再学习新的高层策略，而是在测试时直接规划“执行哪个策略、执行多久”。这把动作空间从 primitive actions 提升到 behavior level。世界模型也从一步转移：</p>\n<div class=\"kb-math kb-math-display\">p(s_{t+1}|s_t,a_t)</div>\n<p>变成策略和时间尺度条件的多步 occupancy 预测：</p>\n<div class=\"kb-math kb-math-display\">p_\\theta(s&#x27;|s, \\pi, \\gamma)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\gamma</span> 可理解为几何分布的时间尺度或折扣 horizon。</p>\n<h5>Jumpy world model：预测 successor occupancy</h5>\n<p>论文把模型称为 Geometric Horizon Model (GHM)。它不是预测固定 <span class=\"kb-math kb-math-inline\">k</span> 步后的单一状态，而是预测某个策略在几何时间尺度下诱导的状态分布。直观上，如果从状态 <span class=\"kb-math kb-math-inline\">s</span> 开始执行策略 <span class=\"kb-math kb-math-inline\">\\pi</span>，GHM 预测“若在未来某个随机时间截断，可能落到哪里”。</p>\n<p>这种表示比一步模型更适合行为组合：当 base policy 自身已经能完成局部导航或局部操控时，规划器不必逐动作模拟每个细节，只需要知道执行该策略一段时间后状态分布如何变化。</p>\n<h5>Horizon consistency：跨时间尺度对齐</h5>\n<p>多 horizon 模型的风险是各时间尺度彼此不一致：短 horizon 预测说能到 A，长 horizon 预测却像是从另一套动力学产生。Jumpy WM 基于 Temporal Difference Flows 加入 horizon consistency，让长时间尺度预测可由短时间尺度预测 bootstrap：</p>\n<div class=\"kb-math kb-math-display\">\\text{long-horizon occupancy}\n\\approx \\text{short-horizon step}\n\\circ \\text{remaining-horizon occupancy}</div>\n<p>对应损失可概括为：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{td-hc}}\n= \\mathcal{L}_{\\text{td-flow}}\n+ \\beta \\cdot D\\left(\np_\\theta(\\cdot|s,\\pi,\\gamma_{\\text{long}}),\n\\tilde{p}_\\theta(\\cdot|s,\\pi,\\gamma_{\\text{short}},\\gamma_{\\text{long}})\n\\right)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">D</span> 是分布匹配项，<span class=\"kb-math kb-math-inline\">\\tilde{p}</span> 表示由短 horizon 预测递推组合出的目标。实践中只对部分 mini-batch 使用 consistency 项，以免模型早期错误自举造成偏差。</p>\n<h5>CompPlan：把策略当动作组合</h5>\n<p>给定奖励函数或目标，CompPlan 要找一段策略序列：</p>\n<div class=\"kb-math kb-math-display\">\\pi_{i_1}, \\pi_{i_2}, \\ldots, \\pi_{i_m}</div>\n<p>每段策略有自己的 switching probability，控制执行时间尺度。GHM 负责估计执行该序列后的状态分布和期望回报。优化上，论文使用 random shooting：采样候选策略序列和中间 subgoals，用 GHM 快速评分，选择最高值方案，并只执行第一段，之后重新规划。</p>\n<p>这个框架包含多个已有方法作为特例：若每一步都切换，就退化成 action-level MPC；若只选择一个策略并执行到结束，就接近 GPI；若固定几何切换时间，则对应 GGPI。CompPlan 的优势在于允许不同策略和不同时间尺度灵活组合。</p>\n<h5>与 TD-MPC2 的关系</h5>\n<p>TD-MPC2 仍是在 action space 中做短 horizon latent MPC；Jumpy WM 把规划粒度提升到 policy space。前者依赖 learned latent dynamics 对短期动作序列排序，后者依赖 GHM 对“执行一个已有策略一段时间后会到哪里”建模。对长程稀疏任务，policy-level jump 可以显著缩短有效规划深度。</p>\n<div class=\"key-point\">💡 关键：Jumpy WM 的“jump”不是跳过建模，而是把模型预测对象从一步动作转移提升到多步策略诱导状态分布，从而让组合规划避开长链一步误差。</div>",
      "quiz": {
        "q": "Jumpy WM 中 CompPlan 规划的基本单元是什么？",
        "options": [
          "单个 primitive action",
          "像素级未来帧",
          "预训练策略及其执行时间尺度",
          "人工标注的任务子目标文本"
        ],
        "answer": 2,
        "explain": "CompPlan 把预训练策略视作 temporally extended actions，并用 jumpy world model 估计策略序列的未来 occupancy 和价值。"
      }
    },
    {
      "id": "rlvr_world",
      "num": 37,
      "name": "RLVR-World",
      "fullName": "RL微调世界模型 (Training World Models with RL)",
      "year": "2026.01",
      "org": "Tsinghua University",
      "parent": "iris",
      "paperUrl": "https://proceedings.neurips.cc/paper_files/paper/2025/hash/4ec03ed08a3fcb59e1c815b5598beff1-Abstract-Datasets_and_Benchmarks_Track.html",
      "projectUrl": "",
      "category": "planning",
      "motivation": "利用RL微调提升多步预测因果连贯性",
      "summary": "RLVR-World 提出把语言和视频世界模型统一为自回归序列模型，并用可验证预测指标作为奖励进行 RLVR/GRPO 微调，解决最大似然训练目标与实际世界转移评估指标不一致的问题。",
      "keyPoints": [
        "<strong>资料说明</strong>：清单给的是 NeurIPS 2025 proceedings 链接，方法细节和图源来自同题 arXiv 与项目页公开资料",
        "<strong>统一序列建模</strong>：语言状态、视觉状态、动作和连续控制量都转成 token 序列",
        "<strong>RLVR 后训练</strong>：用 verifiable rewards 直接优化预测准确率、F1、MSE、LPIPS、SSIM 等任务指标",
        "<strong>GRPO 优化</strong>：采样一组候选未来状态，用组内归一化奖励估计优势，无需单独 value function",
        "<strong>语言世界模型</strong>：覆盖 text game state prediction 与 web page state prediction",
        "<strong>视频世界模型</strong>：对机器人操作视频未来帧进行视觉 tokenizer/decoder 建模",
        "<strong>下游收益</strong>：提升 WebArena web agent MPC 成功率，并改善机器人视频预测质量与重复伪影"
      ],
      "detail": "<h5>方法框架</h5>\n<p><img alt=\"RLVR-World 方法图\" src=\"https://thuml.github.io/RLVR-World/static/images/method.png\" />\n<em>图：RLVR-World 将语言和视频世界模型统一成序列模型，对采样输出解码后用可验证指标计算奖励，并通过 GRPO 更新模型。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># RLVR-World: post-training a pretrained world model\npretrained_WM = load_mle_world_model()\n\nfor batch in world_transition_dataset:\n    q = tokenize_state_action(batch.state, batch.action)\n    gt_next = batch.next_state\n\n    # 1. group sampling\n    samples = [pretrained_WM.generate(q) for _ in range(group_size)]\n\n    # 2. modality-specific detokenization / extraction\n    decoded = [decode_or_extract(sample) for sample in samples]\n\n    # 3. verifiable reward from task metric\n    rewards = [metric(pred, gt_next) for pred in decoded]\n    advantages = normalize_within_group(rewards)\n\n    # 4. GRPO update with KL regularization\n    loss = 0\n    for sample, adv in zip(samples, advantages):\n        ratio = prob_theta(sample, q) / prob_old(sample, q)\n        loss += -min(ratio * adv, clip(ratio, 1-eps, 1+eps) * adv)\n        loss += beta * KL(policy_theta, reference_model)\n    optimizer.step(loss)\n</code></pre>\n<h5>动机与背景</h5>\n<p>世界模型通常用最大似然训练：</p>\n<div class=\"kb-math kb-math-display\">\\max_\\theta \\log p_\\theta(s_{t+1}|s_t,a_t)</div>\n<p>但 MLE 优化的是 token 级似然，不一定等价于下游关心的“状态转移是否正确”。在文本游戏中，一个对象属性错了就会导致状态预测失败；在网页环境中，DOM 元素或字段 F1 才是关键；在视频世界模型中，像素 token 似然高也可能产生重复、模糊或因果不连贯的未来帧。RLVR-World 的核心动机就是把训练目标改为直接优化这些可验证指标。</p>\n<h5>世界模型作为序列模型</h5>\n<p>RLVR-World 把不同模态统一成 prompt-response：</p>\n<div class=\"kb-math kb-math-display\">q = \\mathrm{Template}(s_t,a_t), \\quad y = \\mathrm{Tokens}(s_{t+1})</div>\n<p>语言状态用文本 tokenizer；图像/视频用视觉 tokenizer；低维连续控制量可量化成离散 bins。这样，语言世界模型和视频世界模型都可以用 decoder-only Transformer 形式表示：</p>\n<div class=\"kb-math kb-math-display\">p_\\theta(y|q)=\\prod_i p_\\theta(y_i|q,y_{&lt;i})</div>\n<p>这与 IRIS 的思想一致：把世界转移预测看成 token 序列生成。但 RLVR-World 进一步关注后训练目标，不满足于 token likelihood。</p>\n<h5>可验证奖励：从 token loss 到 decoded metric</h5>\n<p>给定模型生成的一组候选输出 <span class=\"kb-math kb-math-inline\">\\{y^{(i)}\\}_{i=1}^G</span>，RLVR-World 先把它们解码成预测状态：</p>\n<div class=\"kb-math kb-math-display\">\\hat{s}_{t+1}^{(i)} = \\mathrm{Decode}(y^{(i)})</div>\n<p>再用任务指标与 ground truth 比较：</p>\n<div class=\"kb-math kb-math-display\">r^{(i)} = R(\\hat{s}_{t+1}^{(i)}, s_{t+1})</div>\n<p>语言任务中，<span class=\"kb-math kb-math-inline\">R</span> 可以是 exact match、accuracy 或 F1；视频任务中，<span class=\"kb-math kb-math-inline\">R</span> 可以是 MSE、LPIPS、SSIM 等视觉质量指标。关键是奖励不来自 learned reward model，而来自可验证的外部评估函数，因此比 RLHF 更少受到偏好模型漂移影响。</p>\n<h5>GRPO 更新与组内相对优势</h5>\n<p>RLVR-World 采用 GRPO。对同一个输入采样多条输出，用组内奖励均值和标准差归一化得到 advantage：</p>\n<div class=\"kb-math kb-math-display\">A^{(i)} = \\frac{r^{(i)}-\\mathrm{mean}(\\{r^{(j)}\\})}{\\mathrm{std}(\\{r^{(j)}\\})+\\epsilon}</div>\n<p>优化目标类似 PPO 裁剪目标，并加入参考模型 KL 约束：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{GRPO}}\n= -\\mathbb{E}_i\n\\left[\n\\min(\\rho_i A^{(i)}, \\mathrm{clip}(\\rho_i,1-\\epsilon,1+\\epsilon)A^{(i)})\n- \\beta D_{\\mathrm{KL}}(\\pi_\\theta \\| \\pi_{\\text{ref}})\n\\right]</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\rho_i</span> 是新旧模型生成该响应的概率比。因为 advantage 来自同输入的样本组，GRPO 不需要训练 value function，适合生成模型后训练。</p>\n<h5>语言与视频实验的意义</h5>\n<p>在语言世界模型中，RLVR-World 用 text game 和 WebArena 风格网页状态转移评估，直接提升状态字段预测准确率/F1；更重要的是，改进后的网页世界模型可用于 MPC 式 web agent，在候选动作前模拟网页状态，从而提升下游成功率。</p>\n<p>在视频世界模型中，RLVR-World 对机器人操作轨迹预测进行 RL 微调。模型先用视觉 tokenizer 编码视频帧和动作，再生成未来视觉 token，最后解码成帧并用视觉指标打分。相对纯 MLE，RLVR 能直接惩罚重复和视觉失真，使未来帧更符合真实操作因果。</p>\n<div class=\"key-point\">💡 关键：RLVR-World 把“世界模型训练”从 token 级拟合推进到 metric-level 后训练，让模型直接对下游可验证预测质量负责。</div>",
      "quiz": {
        "q": "RLVR-World 相比最大似然训练的核心变化是什么？",
        "options": [
          "完全取消自回归建模，只使用物理引擎",
          "用 decoded prediction 的可验证任务指标作为奖励进行 RL 微调",
          "只训练奖励模型，不训练世界模型",
          "把所有视频帧改成人工文本标签"
        ],
        "answer": 1,
        "explain": "RLVR-World 仍可基于自回归世界模型，但后训练阶段用 accuracy/F1/LPIPS 等可验证指标直接优化生成预测。"
      }
    },
    {
      "id": "unidrive_wm",
      "num": 38,
      "name": "UniDrive-WM",
      "fullName": "统一驾驶世界模型 (Unified Driving World Model)",
      "year": "2026.01",
      "org": "UC Berkeley",
      "parent": "gaia3",
      "paperUrl": "https://arxiv.org/abs/2601.04453",
      "projectUrl": "",
      "category": "embodied",
      "motivation": "统一理解规划生成支持多摄像头一致性",
      "summary": "UniDrive-WM 提出一个统一 VLM 驾驶世界模型，在同一架构中联合完成多视角场景理解、轨迹规划和轨迹条件未来图像生成，解决自动驾驶中感知、预测、规划和生成模块割裂导致的信息瓶颈与误差累积问题。",
      "keyPoints": [
        "<strong>统一 VLM 框架</strong>：将 scene understanding、trajectory planning、future image generation 集成到同一多模态模型",
        "<strong>QT-Former 编码器</strong>：融合多摄像头视觉输入、历史记忆、感知查询和场景查询",
        "<strong>连续轨迹规划头</strong>：输出未来 ego trajectory，将语言/视觉推理空间连接到动作空间",
        "<strong>轨迹条件未来图像生成</strong>：用预测轨迹作为条件生成未来前视图像，形成可视化世界模型",
        "<strong>两种生成路径</strong>：比较离散 AR visual token 生成和连续 AR+diffusion/flow-matching 生成",
        "<strong>联合训练流程</strong>：先联合规划与图像生成，再加入 VQA/场景理解任务",
        "<strong>Bench2Drive 评估</strong>：在规划 L2 error、collision rate 和生成质量上优于此前方法"
      ],
      "detail": "<h5>Pipeline 图</h5>\n<p><img alt=\"UniDrive-WM pipeline\" src=\"https://unidrive-wm.github.io/UniDrive-WM/static/png/pipeline2.png\" />\n<em>图：UniDrive-WM 将多视角图像、历史和查询输入 QT-Former，再送入 LLM/LoRA，统一输出轨迹规划、未来图像生成和 VQA/场景理解结果。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># UniDrive-WM training and inference pipeline\ndef unidrive_forward(multiview_images, history, instruction):\n    # 1. 多视角视觉与历史编码\n    image_features = vision_encoder(multiview_images)\n    query_features = QTFormer(\n        image_features,\n        perception_queries=True,\n        scene_queries=True,\n        history_queries=history\n    )\n\n    # 2. VLM reasoning space\n    text_tokens = text_tokenizer(instruction)\n    vlm_tokens = fuse_text_vision(text_tokens, query_features)\n    hidden = LLM_with_LoRA(vlm_tokens)\n\n    # 3. 多任务输出\n    trajectory = trajectory_head(hidden)             # future ego waypoints\n    future_image = image_generator(hidden, trajectory)\n    vqa_answer = language_head(hidden)\n    return trajectory, future_image, vqa_answer\n\n# training objective\nloss = planning_loss(trajectory, gt_waypoints)\nloss += future_image_loss(future_image, gt_future_frame)\nloss += vqa_loss(vqa_answer, gt_text_answer)\n</code></pre>\n<h5>动机与背景</h5>\n<p>自动驾驶世界模型通常要同时回答三个问题：当前场景是什么、未来会怎样、车辆应该怎么走。现有系统常把它们拆成独立模块：感知网络检测物体，规划器预测轨迹，生成模型渲染未来帧，VLM 再做文本推理。这种流水线会产生信息瓶颈。例如，丰富的几何和运动线索被压缩成文本描述后再用于规划，会丢失细节；生成模型可以合成逼真画面，却未必与规划轨迹一致。</p>\n<p>UniDrive-WM 的动机是把理解、规划和生成统一在一个 VLM-centric world model 中，使动作空间、视觉未来和语言推理空间互相约束。论文在 arXiv 上已有 v3 更新；清单中的通用 abs 链接保持有效，正文按当前可访问版本总结。</p>\n<h5>统一任务形式</h5>\n<p>论文把驾驶世界建模写成联合预测：</p>\n<div class=\"kb-math kb-math-display\">p_\\theta(s_{t+1}, \\tau_{t:t+H} \\mid s_{\\le t}, I)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">s_{\\le t}</span> 包含多视角图像、历史上下文和感知特征，<span class=\"kb-math kb-math-inline\">I</span> 是语言/高层指令，<span class=\"kb-math kb-math-inline\">\\tau</span> 是未来 ego trajectory，<span class=\"kb-math kb-math-inline\">s_{t+1}</span> 的一部分由未来图像表示。更具体地：</p>\n<div class=\"kb-math kb-math-display\">\\hat{\\tau}, \\hat{x}_{t+1}, \\hat{y}_{\\text{VQA}}\n= f_\\theta(\\text{multi-view images}, \\text{history}, \\text{instruction})</div>\n<p>这种联合输出让规划不再只是数值轨迹，未来图像也不再只是无条件生成，而是轨迹条件的可视化预测。</p>\n<h5>QT-Former：多视角和历史融合</h5>\n<p>UniDrive-WM 建立在 Orion 风格的 VLM 驾驶规划模型上，使用 QT-Former 处理视觉特征。多摄像头图像先经 vision encoder 得到 image features，再通过 learnable queries 与图像特征做 cross-attention。查询分成几类：perception queries 用于对象、车道、交通状态等感知辅助头；scene queries 用于场景语义；history queries 通过 memory bank 保留历史帧信息。</p>\n<p>这种结构的价值在于把多视角几何、时间历史和场景语义压成可送入 LLM 的 vision embeddings。LLM 不直接处理原始多摄像头像素，而是在查询抽取后的紧凑表示上进行推理和输出。</p>\n<h5>轨迹规划与未来图像生成的耦合</h5>\n<p>UniDrive-WM 的 trajectory planner 输出连续未来 waypoint。这个轨迹不仅是最终规划结果，还作为 future image generation 的条件。生成分两条路线：</p>\n<ul>\n<li><strong>离散 AR 路线</strong>：把未来图像离散为 visual tokens，让 LLM/AR decoder 预测 token，再用 MoVQGAN 等 detokenizer 还原图像</li>\n<li><strong>AR+Diffusion 路线</strong>：先自回归预测连续 latent，再用 diffusion/flow-matching 风格 decoder 生成更高保真图像</li>\n</ul>\n<p>两者体现了世界模型中的经典权衡：离散 AR 更统一、更像语言建模；连续扩散路径生成质量更强，但系统复杂度和计算成本更高。</p>\n<h5>联合损失与训练流程</h5>\n<p>训练目标可以概括为：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}\n= \\lambda_{\\text{plan}}\\mathcal{L}_{\\text{traj}}(\\hat{\\tau},\\tau)\n+ \\lambda_{\\text{img}}\\mathcal{L}_{\\text{img}}(\\hat{x}_{t+1},x_{t+1})\n+ \\lambda_{\\text{vqa}}\\mathcal{L}_{\\text{text}}(\\hat{y},y)</div>\n<p>规划损失约束未来 waypoint，图像损失约束轨迹条件未来帧，VQA/文本损失增强场景理解和动作推理。论文训练流程先联合规划与图像生成，使模型学会把动作和视觉未来对齐；随后加入 VQA 等理解任务，提高 VLM 对驾驶场景的语义解释能力。</p>\n<h5>与传统自动驾驶世界模型的区别</h5>\n<p>GAIA、DriveDreamer 等驾驶世界模型侧重视觉未来生成；VLM planning 方法侧重语言/视觉推理到轨迹；UniDrive-WM 的重点是统一三者。未来图像为规划提供额外监督，规划轨迹为图像生成提供可控条件，VQA 任务又迫使共享表示保留语义和因果信息。</p>\n<div class=\"key-point\">💡 关键：UniDrive-WM 的世界模型不是单纯“生成未来街景”，而是把未来街景生成变成轨迹规划的可视化一致性约束。</div>",
      "quiz": {
        "q": "UniDrive-WM 中未来图像生成为什么要以规划轨迹为条件？",
        "options": [
          "为了让生成的未来场景与 ego 车辆计划动作保持一致",
          "为了取消多视角视觉编码器",
          "为了只输出文本，不再输出轨迹",
          "为了避免训练时使用任何真实未来帧"
        ],
        "answer": 0,
        "explain": "轨迹条件生成把动作空间和视觉未来连接起来，使模型预测的未来画面能反映计划中的车辆运动。"
      }
    },
    {
      "id": "resim",
      "num": 39,
      "name": "ReSim",
      "fullName": "可靠仿真 (Reliable World Simulation)",
      "year": "2026.02",
      "org": "University of Tübingen",
      "parent": "gaia3",
      "paperUrl": "https://proceedings.neurips.cc/paper/2026/resim",
      "projectUrl": "",
      "category": "embodied",
      "motivation": "丰富驾驶日志生成高保真闭环仿真环境",
      "summary": "ReSim 提出可靠驾驶世界仿真范式，用动作条件视频世界模型生成未来自车视角，并用 Video2Reward 从视频中估计轨迹奖励，解决驾驶评测中开环日志无法暴露误差累积和非专家行为的问题。清单中的 NeurIPS 2026 链接疑似占位符；本精读依据可访问论文 arXiv:2506.09981v2、NVIDIA/OpenDriveLab 项目页整理。",
      "keyPoints": [
        "基于真实驾驶日志和仿真数据训练动作可控的未来视频世界模型，支持专家动作、非专家动作和无动作条件预测。",
        "生成 4 秒、10Hz 的未来自车视角视频，条件包括历史视觉帧、高层导航指令和 4 秒、2Hz waypoint 序列。",
        "引入 Video2Reward (V2R)：用 CARLA infraction score 监督冻结 DINOv2 特征上的轻量奖励头，从预测视频估计轨迹质量。",
        "提供三类应用：视频预测式策略、奖励引导的多策略选择、闭环视觉仿真。",
        "相比 Vista 等驾驶世界模型，论文报告 ReSim 在 Waymo 零样本动作条件预测中显著降低轨迹误差，并在非专家动作上获得更好的真实感和轨迹跟随。",
        "关键思想是把“驾驶动作是否可靠”转化为“给定动作后未来视频是否真实、是否跟随轨迹、是否可由奖励模型判定安全”。"
      ],
      "detail": "<p><img alt=\"ReSim 总体框架\" src=\"https://arxiv.org/html/2506.09981v2/x1.png\" />\n<em>图：ReSim 将驾驶日志、动作条件视频预测、Video2Reward 和闭环评测连接成可靠世界仿真流程。</em></p>\n<pre><code class=\"language-python\"># ReSim 训练与闭环使用伪代码\ndef train_resim(real_logs, carla_rollouts):\n    video_data = mix(real_logs, carla_rollouts)\n    resim = finetune_video_world_model(\n        video_data,\n        condition=[&quot;history_frames&quot;, &quot;route_command&quot;, &quot;future_waypoints&quot;],\n        target=&quot;future_ego_view_video&quot;\n    )\n\n    # CARLA 提供安全/危险行为及 infraction score，V2R 学会从视频估计奖励\n    v2r = train_reward_head(\n        frozen_backbone=&quot;DINOv2&quot;,\n        videos=carla_rollouts.videos,\n        labels=carla_rollouts.infraction_scores\n    )\n    return resim, v2r\n\ndef closed_loop_eval(agent, resim, v2r, obs):\n    for t in range(T):\n        candidates = agent.propose_trajectories(obs)\n        scores = []\n        for traj in candidates:\n            future_video = resim.predict(obs.history, obs.command, traj)\n            scores.append(v2r(future_video))\n        action = candidates[argmax(scores)]\n        obs = resim.step(obs, action)  # 预测视频帧回灌给 agent\n</code></pre>\n<p>ReSim 的动机是自动驾驶评测长期依赖开环日志：模型只在固定历史场景上预测轨迹，无法观察“模型自己执行动作后世界会怎样变化”。这会掩盖两个关键风险：第一，策略在前几步产生偏差后会进入日志中没有覆盖的状态；第二，非专家或危险动作下，传统世界模型往往只会生成模糊或不跟随动作的视频，无法作为可靠仿真器。</p>\n<p>ReSim 把世界模型写成条件生成问题：</p>\n<div class=\"kb-math kb-math-display\">p_\\theta(x_{t+1:t+H}\\mid x_{t-K:t}, c_t, a_{t:t+H}),</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">x</span> 是自车视角视频，<span class=\"kb-math kb-math-inline\">c_t</span> 是高层指令，<span class=\"kb-math kb-math-inline\">a_{t:t+H}</span> 是未来 waypoint/轨迹条件。核心难点不只是视频清晰，而是要在动作偏离专家分布时仍保持可控；否则闭环评测会把世界模型错误误认为策略错误。论文因此使用仿真数据补充真实日志中的动作覆盖，尤其覆盖急转、碰撞、低速等非专家行为。</p>\n<p>V2R 是 ReSim 区别于普通视频世界模型的第二个关键模块。它不手写复杂 3D 规则，而是利用 CARLA 的 infraction score 作为监督信号，学习：</p>\n<div class=\"kb-math kb-math-display\">\\hat r = g_\\phi(\\mathrm{DINOv2}(x_{t+1:t+H})),\n\\qquad\n\\mathcal{L}_{\\text{V2R}} = \\|\\hat r-r_{\\text{CARLA}}\\|_2^2 .</div>\n<p>直觉上，ReSim 负责“想象如果这么开会看到什么”，V2R 负责“从想象视频判断这个未来有多安全”。因为接口是视频，V2R 可以迁移到真实驾驶视频预测，而不依赖 CARLA 的内部状态或手工 3D 语义。</p>\n<p>在推理阶段，ReSim 可作为策略本身：先无动作条件生成未来视频计划，再由 inverse dynamics model (IDM) 把视频转成自车轨迹。也可以作为策略选择器：多个 planner 输出候选轨迹，ReSim 分别渲染未来视频，V2R 打分后选择最高奖励轨迹。进一步地，它还能作为闭环视觉仿真器，把 agent 的动作执行成下一帧观测，再让 agent 基于新观测继续决策。</p>\n<p>与 GAIA-1、DriveDreamer、Vista 等传统驾驶世界模型相比，ReSim 的重点不是只做高保真视频生成，而是补齐“动作可控性 + 奖励估计 + 闭环回灌”。这使它能评估非专家动作、长时滚动误差和策略选择效果，更接近真实部署中 agent 会连续改变世界状态的情况。</p>\n<div class=\"warn-box\">⚠️ 注意：清单 <code>paper_url</code> 指向的 NeurIPS 2026 页面当前不可作为论文来源；可访问公开版本显示该工作为 ReSim: Reliable World Simulation for Autonomous Driving，论文与项目页由 OpenDriveLab/NVIDIA/University of Tübingen 等团队发布。</div>",
      "quiz": {
        "q": "ReSim 中 Video2Reward 的主要作用是什么？",
        "options": [
          "把 RGB 视频压缩成低维 token 以减少显存",
          "从预测未来视频中估计候选轨迹的安全/任务奖励",
          "替代世界模型直接输出车辆控制指令",
          "把 CARLA 场景转换成真实驾驶日志"
        ],
        "answer": 1,
        "explain": "V2R 用 CARLA infraction score 监督，从视频特征估计轨迹奖励；推理时它给 ReSim 生成的候选未来打分，支持策略选择和闭环评测。"
      }
    },
    {
      "id": "navthinker",
      "num": 40,
      "name": "NavThinker",
      "fullName": "导航思考者 (Social Navigation via World Models)",
      "year": "2026.03",
      "org": "Zhejiang University",
      "parent": "vjepa21",
      "paperUrl": "https://arxiv.org/abs/2603.15359",
      "projectUrl": "",
      "category": "embodied",
      "motivation": "深度特征空间前瞻思考降低碰撞率",
      "summary": "NavThinker 提出面向社交导航的动作条件世界模型，在 Depth Anything V2 patch 特征空间中预测未来场景几何和行人轨迹，并把想象结果注入 DD-PPO 策略，解决机器人在人群中只看当前观测、缺乏前瞻交互推理的问题。",
      "keyPoints": [
        "将社交导航建模为部分可观测 POMDP，显式处理机器人动作与行人运动相互耦合的问题。",
        "世界模型运行在冻结 Depth Anything V2 的 patch feature 空间，用 causal Transformer 做动作条件自回归预测。",
        "多头解码器从未来 latent 中预测深度图、行人未来轨迹和奖励，使 latent imagination 与可通行几何和交互风险对齐。",
        "策略端使用 ResNet+GRU 编码当前深度观测，并为所有候选离散动作查询世界模型，获得 look-ahead future features。",
        "训练采用 DD-PPO，同时使用两种前瞻信号：动作条件未来特征融合、基于预测行人轨迹的 social reward shaping。",
        "在 Social-HM3D 单机器人、多机器人设置中超过 A*/ORCA/Habitat/Falcon，并零样本迁移到 Social-MP3D；还在 Unitree Go2 上做真实部署。"
      ],
      "detail": "<p><img alt=\"NavThinker 架构图\" src=\"https://arxiv.org/html/2603.15359v2/x2.png\" />\n<em>图：NavThinker 由动作条件场景-交互世界模型和 imagination-augmented planner policy 两部分组成。</em></p>\n<pre><code class=\"language-python\"># NavThinker 世界模型与策略训练伪代码\ndef train_world_model(batch):\n    z = depth_anything_v2(batch.depth_frames)       # frozen DA-V2 patch tokens\n    action_tokens = embed(batch.actions)\n    z_pred = causal_transformer(z.history, action_tokens)\n    depth_pred = depth_decoder(z_pred)\n    traj_pred = human_traj_decoder(z_pred)\n    reward_pred = reward_decoder(z_pred)\n    loss = latent_loss(z_pred, z.target) \\\n         + depth_loss(depth_pred, batch.future_depth) \\\n         + traj_loss(traj_pred, batch.future_humans) \\\n         + reward_loss(reward_pred, batch.reward)\n    update(world_model, loss)\n\ndef act_with_imagination(obs, goal):\n    h = gru(resnet(obs.depth), obs.prev_action)\n    imagined = []\n    for a in discrete_actions:\n        z_next = world_model.transition(obs.depth_latent, action=a)\n        imagined.append(z_next)\n    policy_input = fuse(h, concat(imagined), goal)\n    return actor_critic(policy_input)  # DD-PPO update\n</code></pre>\n<p>社交导航的难点是“预测”和“规划”不能拆开做。若把行人预测看成固定输入，机器人自己的动作对行人的影响就被忽略；若只用 RL 从经验中隐式学习，又很难在遮挡、盲角和密集交互中提前规避冲突。NavThinker 的核心假设是：策略在执行前应该比较不同动作导致的未来场景，从而把未来交互风险纳入当前决策。</p>\n<p>论文将机器人状态、静态场景和行人状态拆成潜在状态 <span class=\"kb-math kb-math-inline\">s_t=(p_t, m_t, h_t^1,\\dots,h_t^N)</span>，但机器人只能看到局部深度图 <span class=\"kb-math kb-math-inline\">d_t</span>、目标 <span class=\"kb-math kb-math-inline\">g_t</span> 和自身位姿。世界模型用冻结 DA-V2 编码深度：</p>\n<div class=\"kb-math kb-math-display\">z_t = E_{\\text{DA-V2}}(d_t),\n\\qquad\n\\hat z_{t+1}^{(a)} = F_\\theta(z_{t-C:t}, a_t),</div>\n<p>其中动作 token 被追加到 patch 序列中，causal sliding-window mask 保证模型按时间自回归地想象未来。冻结深度基础模型的好处是 latent 自带几何结构，比从 RGB/深度端到端学动态更稳，也更容易迁移到新场景。</p>\n<p>为了让 latent 不只“像特征”，还对导航有用，NavThinker 给预测 latent 接了三个任务头：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}\n= \\mathcal{L}_{\\text{latent}}\n+ \\lambda_d \\mathcal{L}_{\\text{depth}}\n+ \\lambda_h \\mathcal{L}_{\\text{traj}}\n+ \\lambda_r \\mathcal{L}_{\\text{reward}} .</div>\n<p>深度重建让模型关注可通行几何，行人轨迹预测让模型关注动态交互，奖励头把未来与任务收益关联起来。论文消融显示，加入深度和轨迹解码器能提升 latent cosine similarity、降低 depth RMSE 和行人轨迹误差。</p>\n<p>策略学习阶段，NavThinker 不让策略完全依赖生成的 latent，而是保持当前真实观测编码 <span class=\"kb-math kb-math-inline\">h_t</span>，再融合每个候选动作的 imagined future：</p>\n<div class=\"kb-math kb-math-display\">\\pi(a_t\\mid o_{\\le t}, g_t)\n= \\pi_\\psi\\left(h_t, \\mathrm{Fuse}\\left(\\{\\hat z_{t+1}^{(a)}\\}_{a\\in\\mathcal{A}}\\right), g_t\\right).</div>\n<p>同时，奖励中加入预测行人轨迹带来的 social cost，使策略在训练时为“未来可能碰撞/侵犯个人空间”的动作付出代价。这样设计的直觉很直接：look-ahead feature 负责让 actor 看到不同动作的后果，trajectory reward shaping 负责让 critic/return 把社会合规性量化进优化目标。</p>\n<p>与 ORCA/A* 等规则规划相比，NavThinker 不需要手工规定所有人群交互；与 Falcon 这类未来感知 RL 相比，它的未来来自动作条件世界模型，而不是与动作弱耦合的静态预测。论文结果显示，单机器人 Social-HM3D 上 NavThinker SR/SPL 为 59.46/55.00，并把 human collision 降到 39.09；多机器人设置也在团队成功率和碰撞上取得更好表现。</p>",
      "quiz": {
        "q": "NavThinker 为什么选择在 Depth Anything V2 patch feature 空间训练世界模型？",
        "options": [
          "为了完全避免使用深度图输入",
          "为了获得与几何结构对齐、可迁移的空间表征，再预测动作条件未来",
          "为了把离散动作变成连续电机扭矩",
          "为了让策略不再需要强化学习训练"
        ],
        "answer": 1,
        "explain": "冻结 DA-V2 patch 特征保留丰富几何信息，世界模型在该空间做动作条件自回归预测，再用深度/轨迹/奖励头对齐导航风险。"
      }
    },
    {
      "id": "gen1",
      "num": 41,
      "name": "GEN-1",
      "fullName": "通用具身模型1 (Scaling Embodied Foundation Models)",
      "year": "2026.04",
      "org": "Generalist AI",
      "parent": "vjepa21",
      "paperUrl": "https://generalistai.com/blog/apr-02-2026-gen-1-scaling-embodied-foundation-models-to-mastery/",
      "projectUrl": "",
      "category": "embodied",
      "motivation": "原生交互基础模型任务成功率达99%",
      "summary": "GEN-1 通过在 50 万小时真实世界交互数据上大规模预训练（不含机器人数据），结合后训练、强化学习与推理时技术（Harmonic Reasoning），使具身基础模型首次在多项灵巧操作任务上达到 99% 成功率、约 3 倍于 SOTA 的完成速度，并展现出训练分布外的即兴恢复能力，仅需约 1 小时机器人数据即可适配新任务。",
      "keyPoints": [
        "<strong>Scaling Law 延续</strong>：延续 GEN-0 发现的机器人学习 Scaling Law，通过进一步扩大数据（50 万+ 小时）和计算规模，将性能从\"演示级\"推至\"商用级\"",
        "<strong>精通三要素定义</strong>：提出 Mastery = Reliability（可靠性 99%+）+ Speed（~3× SOTA）+ Improvisation（即兴恢复智能），作为具身模型评估框架",
        "<strong>无机器人数据预训练</strong>：基础模型完全使用低成本可穿戴设备采集的人类活动数据预训练，无需遥操作或仿真数据",
        "<strong>极致数据效率</strong>：每个任务仅需约 1 小时机器人数据微调；相比 GEN-0 可用 10× 更少的任务数据达到同等性能",
        "<strong>系统级创新</strong>：涵盖预训练效率提升、后训练技术、经验学习（RL）、多模态人类引导、推理时 Harmonic Reasoning 等多项技术",
        "<strong>6 项任务验证</strong>：汽车零件分拣、T 恤折叠、扫地机器人维修、积木打包、纸箱折叠、手机包装，均达到 99%+ 成功率",
        "<strong>速度突破</strong>：纸箱折叠 12.1 秒（SOTA 34 秒，2.8× 提速）；手机包装 15.5 秒（2.8× 提速）",
        "<strong>即兴恢复行为</strong>：模型展现训练分布外的创造性恢复策略（重新抓取、利用外部灵巧性、双手协作等）",
        "<strong>对齐问题前瞻</strong>：指出具身模型的涌现行为既是优势也是风险，需要发展具身 AI 对齐方法"
      ],
      "detail": "<h5>核心框架示意</h5>\n<div class=\"warn-box\">⚠️ 注意：GEN-1 以技术博客形式发布，未提供传统论文中的模型架构图。以下基于文中描述整理其系统框架。</div>\n<pre><code>┌─────────────────────────────────────────────────────────┐\n│                    GEN-1 系统架构                         │\n├─────────────────────────────────────────────────────────┤\n│                                                         │\n│  ┌──────────────┐    ┌──────────────┐                   │\n│  │ 预训练数据引擎 │    │  任务适配数据  │                   │\n│  │ 50万+小时     │    │  ~1小时/任务   │                   │\n│  │ 可穿戴设备    │    │  机器人数据    │                   │\n│  │ (无机器人数据) │    │              │                   │\n│  └──────┬───────┘    └──────┬───────┘                   │\n│         │                   │                           │\n│         ▼                   ▼                           │\n│  ┌──────────────────────────────────┐                   │\n│  │     大规模多模态基础模型           │                   │\n│  │  (预训练 → 后训练 → RL微调)       │                   │\n│  └──────────────┬───────────────────┘                   │\n│                 │                                       │\n│                 ▼                                       │\n│  ┌──────────────────────────────────┐                   │\n│  │     推理时系统 (Harmonic Reasoning)│                   │\n│  │  + 多模态人类引导                  │                   │\n│  │  + 实时动作输出                    │                   │\n│  └──────────────┬───────────────────┘                   │\n│                 │                                       │\n│                 ▼                                       │\n│         实时机器人控制                                    │\n│   (可靠性 99% | 速度 3× | 即兴恢复)                      │\n└─────────────────────────────────────────────────────────┘\n</code></pre>\n<h5>性能对比伪代码</h5>\n<pre><code class=\"language-python\"># GEN-1 训练与部署流程概览\n# Phase 1: 预训练（无机器人数据）\npretrain_data = collect_wearable_data(hours=500_000)  # 可穿戴设备采集人类活动\nfoundation_model = pretrain(\n    data=pretrain_data,\n    modality=&quot;multimodal&quot;,  # 视觉 + 本体感觉 + 语言\n    robot_data=None  # 关键：预训练不使用任何机器人数据\n)\n\n# Phase 2: 后训练 + RL\nmodel = post_train(foundation_model, techniques=[\n    &quot;compute_efficiency_optimization&quot;,  # 预训练计算效率曲线偏移\n    &quot;reinforcement_learning&quot;,           # 从经验中学习\n    &quot;multimodal_human_guidance&quot;,        # 多模态人类引导\n])\n\n# Phase 3: 任务适配（仅需 ~1 小时机器人数据）\nfor task in [&quot;box_folding&quot;, &quot;phone_packing&quot;, &quot;tshirt_folding&quot;, ...]:\n    task_data = collect_robot_data(task, hours=1)  # 极少量任务数据\n    task_model = finetune(model, task_data)\n    # GEN-1: 10x less data than GEN-0 for comparable performance\n\n# Phase 4: 推理时增强\ndeployed_model = apply_inference_techniques(\n    task_model,\n    harmonic_reasoning=True,  # 新型推理时技术\n    real_time=True            # 实时动作输出\n)\n\n# 结果对比\n# Task          | No Pretrain | GEN-0 | GEN-1\n# Vacuum Repair |     2%      |  50%  |  99%\n# Box Folding   |    13%      |  81%  |  99%\n# Phone Packing |    42%      |  62%  |  99%\n# Average       |    19%      |  64%  |  99%\n</code></pre>\n<h5>动机与背景</h5>\n<p>GEN-1 的核心动机源于具身基础模型从\"可演示\"到\"可商用\"的跨越需求。此前的 GEN-0 首次证明了机器人学习中 Scaling Law 的存在——随着预训练数据和计算量的增加，所有零样本任务的性能同步提升。然而，GEN-0 的平均成功率仅为 64%，远未达到商业部署的门槛。</p>\n<p>这一进程与大语言模型（LLM）的发展轨迹高度平行：GPT-2 展示了多任务学习的可扩展路径但难以商用，GPT-3 通过规模扩展使 Scaling Law 延续并在特定任务（如广告文案）上实现经济价值。类似地，GEN-1 通过进一步扩展 GEN-0 的基础，使简单物理任务首次跨越商用性能阈值。</p>\n<div class=\"key-point\">💡 关键洞察：GEN-1 的预训练数据完全来自人类佩戴低成本可穿戴设备进行日常活动的记录，而非昂贵的遥操作数据或仿真数据。这提供了一个存在性证明——无需大规模遥操作或仿真数据集，仅通过人类活动预训练即可达到高水平的任务精通。</div>\n<h5>核心机制：精通（Mastery）三要素</h5>\n<p>GEN-1 将\"精通\"定义为三个维度的综合：</p>\n<p><strong>1. 可靠性（Reliability）</strong></p>\n<p>传统工业机器人通过精确控制和严格约束环境实现可靠性，但这种方式无法泛化。端到端机器人学习模型长期以来难以达到高可靠性。GEN-1 在 6 项任务上实现了 99%+ 的成功率：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>任务</th>\n<th>无预训练</th>\n<th>GEN-0</th>\n<th>GEN-1</th>\n<th>连续成功次数</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>汽车零件分拣</td>\n<td>—</td>\n<td>—</td>\n<td>99%+</td>\n<td>50+ (1小时)</td>\n</tr>\n<tr>\n<td>T恤折叠</td>\n<td>—</td>\n<td>—</td>\n<td>99%+</td>\n<td>86次连续</td>\n</tr>\n<tr>\n<td>扫地机维修</td>\n<td>2%</td>\n<td>50%</td>\n<td>99%</td>\n<td>200+次连续</td>\n</tr>\n<tr>\n<td>积木打包</td>\n<td>—</td>\n<td>—</td>\n<td>99%+</td>\n<td>1800+次连续</td>\n</tr>\n<tr>\n<td>纸箱折叠</td>\n<td>13%</td>\n<td>81%</td>\n<td>99%</td>\n<td>200+次连续</td>\n</tr>\n<tr>\n<td>手机包装</td>\n<td>42%</td>\n<td>62%</td>\n<td>99%</td>\n<td>100+次连续</td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>2. 速度（Speed）</strong></p>\n<p>速度提升并非简单加快电机转速。随着速度增加，世界不再是准静态的：速度项增大、摩擦动力学变化、运动模糊加剧，对精度、反应性和推理提出更高要求。GEN-1 的速度突破来自多个因素：</p>\n<ul>\n<li><strong>经验学习（RL）</strong>：模型通过强化学习自主发现更快的完成策略</li>\n<li><strong>Harmonic Reasoning</strong>：新型推理时技术，优化实时决策</li>\n<li><strong>预训练数据优势</strong>：可穿戴设备采集的数据包含人类以自然速度完成各种任务的记录，相比遥操作数据更流畅、更快速（遥操作受限于力反馈缺失、延迟和视野问题）</li>\n</ul>\n<p>具体速度对比：\n- 纸箱折叠：GEN-1 12.1 秒 vs SOTA 34 秒（GEN-0 和 π₀ 在相同纸箱上均约 34 秒），<strong>2.8× 提速</strong>\n- 手机包装：GEN-1 15.5 秒 vs GEN-0，<strong>2.8× 提速</strong></p>\n<div class=\"key-point\">💡 关键：GEN-1 的任务完成速度可以超过演示数据中的速度，说明模型通过 RL 学会了比人类示范更高效的策略。</div>\n<p><strong>3. 即兴恢复智能（Improvisational Intelligence）</strong></p>\n<p>这是 GEN-1 最具突破性的能力维度。在非结构化环境中，机器人必须能够创造性地即兴解决意外情况。GEN-1 展现的训练分布外恢复行为包括：</p>\n<ul>\n<li>垫圈被碰落后：可选择放下重新抓取、部分插入缝隙利用外部灵巧性重新抓取、或使用另一只手进行双手协作重新抓取</li>\n<li>大型可变形物体出现异常构型时：模型自主找到恢复路径</li>\n<li>这些行为直接贡献于从意外长尾事件中恢复</li>\n</ul>\n<p>正如 William James（现代心理学奠基人）所述：<strong>智能是通过不同手段达到相同目标的能力</strong>。即兴恢复智能不仅使机器人能在非结构化环境中工作，还反过来提升了通用模型的可靠性和速度。</p>\n<h5>数据引擎与预训练范式</h5>\n<p>GEN-1 的数据策略是其核心竞争优势之一：</p>\n<pre><code>传统方法:  遥操作数据(昂贵/难扩展) → 任务特定模型 → 窄泛化\nGEN-1方法: 可穿戴设备数据(低成本/可扩展) → 通用基础模型 → 少量机器人数据微调\n</code></pre>\n<ul>\n<li><strong>预训练数据</strong>：50 万+ 小时高保真物理交互数据，来自人类佩戴可穿戴设备进行数百万种活动</li>\n<li><strong>预训练中无机器人数据</strong>：模型在适配新任务时，同时首次适配该机器人形态和该任务</li>\n<li><strong>任务适配</strong>：仅需约 1 小时机器人数据</li>\n<li><strong>数据效率提升</strong>：GEN-1 可用 GEN-0 的 1/10 任务数据达到同等性能</li>\n</ul>\n<div class=\"warn-box\">⚠️ 注意：此前超过 90% 成功率的通用机器人模型依赖大规模遥操作数据集，成本高且难以扩展。GEN-1 证明了基于可穿戴设备的预训练路线可以达到更高性能，这对整个领域的数据采集范式具有重要启示。</div>\n<h5>系统级设计</h5>\n<p>GEN-1 不仅是一个模型，更准确地说是一个<strong>系统</strong>。类似于前沿 LLM 聊天机器人和 API，系统级组件在推理和模型调用层面显著提升了性能：</p>\n<ol>\n<li><strong>预训练效率</strong>：通过计算效率曲线偏移（shifting the curve），在相同计算量下获得更高的预训练智能</li>\n<li><strong>后训练技术</strong>：包括理论 RL 基础和多模态人类引导</li>\n<li><strong>推理时技术</strong>：Harmonic Reasoning——一种新型分页注意力机制，支持实时推理</li>\n<li><strong>分布式训练基础设施</strong>：重新设计以支持 PB 级物理交互数据作为一等公民</li>\n<li><strong>硬件协同</strong>：设计新硬件，在新地理区域部署数千个机器人手以获取多样化物理活动数据</li>\n</ol>\n<h5>与相关工作的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th>传统工业机器人</th>\n<th>PaLM-E / RT-2 (VLA)</th>\n<th>π₀</th>\n<th>GEN-0</th>\n<th><strong>GEN-1</strong></th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>泛化能力</td>\n<td>极低（硬编码）</td>\n<td>中等</td>\n<td>中等</td>\n<td>高</td>\n<td><strong>高</strong></td>\n</tr>\n<tr>\n<td>可靠性</td>\n<td>高（受限环境）</td>\n<td>低-中</td>\n<td>中</td>\n<td>64%</td>\n<td><strong>99%</strong></td>\n</tr>\n<tr>\n<td>速度</td>\n<td>高（受限任务）</td>\n<td>慢</td>\n<td>~34s(折箱)</td>\n<td>~34s(折箱)</td>\n<td><strong>~12s(折箱)</strong></td>\n</tr>\n<tr>\n<td>即兴能力</td>\n<td>无</td>\n<td>有限</td>\n<td>有限</td>\n<td>有限</td>\n<td><strong>显著</strong></td>\n</tr>\n<tr>\n<td>数据需求</td>\n<td>编程</td>\n<td>大量遥操作</td>\n<td>大量遥操作</td>\n<td>~10h/任务</td>\n<td><strong>~1h/任务</strong></td>\n</tr>\n<tr>\n<td>预训练数据</td>\n<td>无</td>\n<td>互联网数据</td>\n<td>遥操作</td>\n<td>可穿戴设备</td>\n<td><strong>可穿戴设备(50万h)</strong></td>\n</tr>\n</tbody>\n</table></div>\n<h5>局限性与展望</h5>\n<p>GEN-1 并非没有局限：\n- 并非所有尝试的任务都能达到 99%+ 成功率\n- 某些任务在实际部署中可能需要更高的成功率或速度\n- 当前主要验证的是\"简单物理任务\"的精通</p>\n<p>但 Scaling Law 的延续意味着：每一代新模型都将解锁更多更复杂任务的精通能力。此外，GEN-1 提出了具身 AI 对齐的前瞻性思考——随着模型能力增强，涌现行为（如未经训练的恢复动作）既是优势也可能是风险，需要发展精确引导模型行为的对齐方法。</p>",
      "quiz": {
        "q": "GEN-1 的预训练数据主要来源是什么？",
        "options": [
          "大规模机器人遥操作数据",
          "物理仿真环境生成的合成数据",
          "人类佩戴低成本可穿戴设备采集的活动数据",
          "互联网视频和图像数据"
        ],
        "answer": 2,
        "explain": "GEN-1 的预训练数据完全来自人类佩戴可穿戴设备进行日常活动的记录（50万+小时），不包含任何机器人数据。这是其核心创新之一，证明了无需昂贵的遥操作数据即可达到高水平任务精通。"
      }
    },
    {
      "id": "xwam",
      "num": 42,
      "name": "X-WAM",
      "fullName": "统一4D世界动作建模 (Unified 4D World Action Modeling)",
      "year": "2026.04",
      "org": "Stanford/NVIDIA",
      "parent": "worldreel",
      "paperUrl": "https://arxiv.org/abs/2604.26694v2",
      "projectUrl": "",
      "category": "embodied",
      "motivation": "统一4D合成与动作执行异步噪声采样",
      "summary": "X-WAM 提出统一 4D World Action Model，把多视角 RGB-D 未来生成、3D 重建和机器人动作解码放进同一个视频扩散框架，并用轻量深度分支和异步噪声采样解决“视频要慢慢去噪、动作要实时输出”的冲突。",
      "keyPoints": [
        "从预训练视频扩散模型出发，联合预测未来多视角 RGB-D 视频、机器人状态和动作。",
        "通过复制 DiT 最后若干层构造 dedicated depth branch，避免把深度拼成额外 token 导致注意力成本翻倍，也避免通道拼接破坏视频先验。",
        "提出 Asynchronous Noise Sampling (ANS)：推理时少步快速解码动作，后续继续用完整步数生成高保真视频。",
        "训练时不独立采样视频/动作噪声，而是按与异步推理一致的 joint timestep distribution 采样，减少 train-test mismatch。",
        "统一状态/动作接口支持单臂和双臂机器人：状态是末端位姿+夹爪，动作是相对末端运动+夹爪变化。",
        "在约 1,492,026 episodes、5,873.9 小时机器人数据上预训练，并在 RoboCasa、RoboTwin 2.0、真实双臂耳机打包任务中验证。",
        "RoboCasa 平均成功率 79.2%，RoboTwin 2.0 Clean/Randomized 为 89.8%/90.7%，同时获得更好的 RGB、深度和点云重建指标。"
      ],
      "detail": "<p><img alt=\"X-WAM 总览图\" src=\"https://arxiv.org/html/2604.26694v2/x1.png\" />\n<em>图：X-WAM 同时面向策略执行、视频生成和 4D 几何重建，并用 ANS 平衡动作时延与视频质量。</em></p>\n<pre><code class=\"language-python\"># X-WAM 单步去噪与 ANS 推理伪代码\ndef denoise_xwam(video_latent, state_noisy, action_noisy, t_video, t_action, cond):\n    tokens = encode_rgb_state_action(video_latent, state_noisy, action_noisy, cond)\n    tokens = add_view_embeddings(tokens)\n    shared = dit_shared_trunk(tokens)\n\n    main = shared\n    depth = shared\n    for block_main, block_depth in interleaved_tail_blocks:\n        depth = block_depth(depth, cross_attend_to=main)\n        main = block_main(main)\n\n    rgb_velocity, state_velocity, action_velocity = regress_main(main)\n    inverse_depth = regress_depth(depth)\n    return rgb_velocity, state_velocity, action_velocity, inverse_depth\n\ndef asynchronous_inference(cond, video_steps=Nv, action_steps=Na):\n    video, state, action = init_noise()\n    for i in range(Nv):\n        if i &lt; Na:\n            # joint denoising: action becomes usable after only Na steps\n            v_pred, s_pred, a_pred, depth = denoise_xwam(video, state, action, t_v[i], t_a[i], cond)\n            state, action = action_scheduler.step(s_pred, a_pred)\n        else:\n            # video-only continuation conditioned on already decoded action\n            v_pred, _, _, depth = denoise_xwam(video, state, action, t_v[i], t_a=0, cond=cond)\n        video = video_scheduler.step(v_pred)\n    return action, video, depth\n</code></pre>\n<p>X-WAM 面对的核心矛盾来自统一世界模型本身。视频生成需要较多扩散步数才能得到清晰、多视角一致的未来；低维动作却必须尽快输出，否则机器人闭环控制时延过大。若把视频和动作完全同步去噪，动作会被视频拖慢；若完全分离训练，推理时“动作已经干净而视频仍很 noisy”的状态又没有在训练中见过。</p>\n<p>第一项设计是轻量 4D 空间适配。常见做法是把 RGB 和 depth 都作为 token 输入，但 token 数翻倍会带来二次注意力开销；把 depth 拼到通道维则改变预训练视频模型的输入分布。X-WAM 保持主视频 DiT 基本不变，只复制最后若干 block 作为深度分支：</p>\n<div class=\"kb-math kb-math-display\">h = \\mathrm{DiT}_{\\text{trunk}}(x_t, s_t, a_t, c),\n\\qquad\n(\\hat v_x,\\hat v_s,\\hat v_a)=\\mathrm{Head}_{\\text{main}}(h),\n\\qquad\n\\hat d=\\mathrm{Head}_{\\text{depth}}(\\mathrm{DiT}_{\\text{depth}}(h)).</div>\n<p>这样主分支继续利用视频先验，深度分支从共享 latent 中抽取 3D 结构。论文结果显示，显式深度监督不仅改善点云重建，也提升策略成功率，说明空间感知对动作解码本身有帮助。</p>\n<p>第二项设计是 ANS。设视频 timestep 为 <span class=\"kb-math kb-math-inline\">\\tau_v</span>，动作 timestep 为 <span class=\"kb-math kb-math-inline\">\\tau_a</span>。推理中前 <span class=\"kb-math kb-math-inline\">N_a</span> 步同时去噪视频和动作，得到可执行动作后，后 <span class=\"kb-math kb-math-inline\">N_v-N_a</span> 步继续优化视频：</p>\n<div class=\"kb-math kb-math-display\">\\tau_a =\n\\begin{cases}\n\\mathrm{schedule}_a(i), &amp; i &lt; N_a, \\\\\n0, &amp; i \\ge N_a .\n\\end{cases}</div>\n<p>训练时，ANS 从 <span class=\"kb-math kb-math-inline\">(\\tau_v,\\tau_a)</span> 的联合分布中采样，使模型经常看到“视频仍 noisy、动作已接近 clean”的状态。这个细节很重要：如果训练时视频和动作噪声独立随机，模型并不会适配推理时的异步轨迹，动作质量和视频质量都会受损。</p>\n<p>X-WAM 的数据工程也服务于统一建模。论文把单臂/双臂机器人统一到末端执行器接口：状态为 16 维绝对向量 <span class=\"kb-math kb-math-inline\">(position_3 + quaternion_4 + gripper_1)\\times2</span>，动作为 14 维相对向量 <span class=\"kb-math kb-math-inline\">(position_3 + axisangle_3 + gripper_1)\\times2</span>。单臂数据只监督左臂维度，使大规模异构机器人数据能进入同一个模型。</p>\n<p>与 UWM、Motus、Cosmos Policy 等 2D world-action 模型相比，X-WAM 的区别在于它把“未来世界长什么样”“未来 3D 空间结构是什么”“机器人下一步怎么动”绑定在同一扩散轨迹中。它不是在视频模型后面接一个动作头，也不是视频生成后再用 Depth Anything 做后处理，而是在训练目标中同时优化 RGB、depth、point cloud consistency 和动作成功率。</p>",
      "quiz": {
        "q": "X-WAM 的 Asynchronous Noise Sampling 主要解决什么问题？",
        "options": [
          "让视频和动作永远使用完全相同的去噪步数",
          "在动作少步实时解码和视频多步高质量生成之间对齐训练与推理分布",
          "把深度图从训练数据中全部删除",
          "用规则控制器替代扩散动作模型"
        ],
        "answer": 1,
        "explain": "ANS 推理时先快速解码动作，再继续生成视频；训练时从匹配该异步流程的联合噪声分布采样，避免 train-test mismatch。"
      }
    },
    {
      "id": "vagen",
      "num": 43,
      "name": "Vagen",
      "fullName": "视觉智能体生成 (Reinforcing World Model Reasoning)",
      "year": "2026.03",
      "org": "Peking University",
      "parent": "vjepa21",
      "paperUrl": "https://proceedings.neurips.cc/paper_files/paper/2025/hash/fc6688d75adde86b9df910769c1d02e3-Abstract-Conference.html",
      "projectUrl": "",
      "category": "embodied",
      "motivation": "显式视觉状态推理强化VLM世界建模",
      "summary": "VAGEN 提出将 VLM 智能体训练为显式的世界模型（World Model），通过状态估计（State Estimation）和转移预测（Transition Modeling）两种推理策略增强多轮视觉决策能力，并设计了 WorldModeling Reward 与 Bi-Level GAE 机制实现细粒度的奖励塑形与信用分配，在 Qwen2.5-VL-3B 上超越 GPT-5 等大规模闭源模型。",
      "keyPoints": [
        "<strong>POMDP 建模</strong>：将多轮视觉智能体任务形式化为部分可观测马尔可夫决策过程，每轮接收图像观测并输出动作",
        "<strong>5 种推理策略</strong>：NoThink、FreeThink、StateEstimation、TransitionModeling、WorldModeling（前两者组合），通过结构化 <code>&lt;think&gt;</code> 标签控制推理内容",
        "<strong>VAGEN-Base 训练框架</strong>：基于 PPO 的多轮 RL 训练，关键创新为 Observation Token Masking——将图像 token 排除在策略梯度之外",
        "<strong>WorldModeling Reward</strong>：利用 LLM-as-a-Judge 评估智能体的状态估计与转移预测质量，提供密集的推理质量奖励信号",
        "<strong>Bi-Level GAE</strong>：两层优势估计机制——先在 turn 级别用 <span class=\"kb-math kb-math-inline\">\\gamma_{\\text{turn}}</span> 计算每轮优势，再在 token 级别用 <span class=\"kb-math kb-math-inline\">\\gamma_{\\text{token}}</span> 向回传播，解决稀疏奖励下的信用分配问题",
        "<strong>视觉状态表征研究</strong>：对比自然语言、符号化、结构化三种表征格式，发现最优格式依赖于任务特性",
        "<strong>6 个评测环境</strong>：Sokoban、FrozenLake、PrimitiveSkill（4 子任务）、Navigation（2 子任务）、SVG Reconstruction，覆盖规划、操控、导航、推理",
        "<strong>VAGEN-Full（3B）得分 0.82</strong>，超越 GPT-5（0.75）、Claude 4.5 Sonnet（0.64）等闭源模型"
      ],
      "detail": "<h5>框架总览</h5>\n<p><img alt=\"VAGEN 框架总览与五种推理策略\" src=\"https://ar5iv.labs.arxiv.org/html/2510.16907/assets/x1.png\" />\n<em>图 1：VAGEN 框架。左侧展示多轮交互流程（观测→推理→动作→环境反馈），右侧展示五种推理策略的结构化输出格式。WorldModeling 策略同时包含 <code>&lt;observation&gt;</code>（状态估计）和 <code>&lt;prediction&gt;</code>（转移预测）字段。</em></p>\n<p><img alt=\"VAGEN-Base 多轮 RL 训练流程\" src=\"https://ar5iv.labs.arxiv.org/html/2510.16907/assets/x2.png\" />\n<em>图 2：VAGEN-Base 训练流程。智能体在环境中执行多轮交互生成轨迹，通过 PPO 优化策略，其中 Observation Token Masking 确保只对动作 token 计算策略梯度。</em></p>\n<p><img alt=\"Bi-Level GAE 与 Token-Level GAE 对比\" src=\"https://ar5iv.labs.arxiv.org/html/2510.16907/assets/x3.png\" />\n<em>图 3：标准 Token-Level GAE（左）将稀疏的终端奖励逐 token 回传；Bi-Level GAE（右）先在 turn 级别分配奖励（紫色箭头），再在 token 级别传播（橙色箭头），实现层次化信用分配。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># VAGEN-Full 多轮 RL 训练框架伪代码\ndef vagen_full_training(env, policy_vlm, critic, llm_judge):\n    for iteration in range(N_iterations):\n        # === Rollout 阶段 ===\n        trajectories = []\n        for episode in range(batch_size):\n            obs = env.reset()  # 初始图像观测\n            trajectory = []\n            for turn in range(max_turns):\n                # 智能体生成结构化输出：&lt;think&gt;&lt;observation&gt;...&lt;/observation&gt;&lt;prediction&gt;...&lt;/prediction&gt;...&lt;/think&gt;&lt;answer&gt;action&lt;/answer&gt;\n                response = policy_vlm.generate(obs, strategy=&quot;WorldModeling&quot;)\n                action = parse_action(response)\n                obs_belief = parse_observation(response)   # 状态估计 ŝ_t\n                pred_belief = parse_prediction(response)   # 转移预测 ŝ_{t+1}\n\n                next_obs, task_reward, done = env.step(action)\n\n                # WorldModeling Reward: LLM-as-Judge 评估推理质量\n                gt_state = env.get_ground_truth_state()\n                gt_next_state = env.get_ground_truth_state()\n                r_reason = β_s * judge_match(obs_belief, gt_state) \\\n                         + β_w * judge_match(pred_belief, gt_next_state)\n\n                r_turn = r_reason + r_format + task_reward\n                trajectory.append((obs, response, action, r_turn, next_obs))\n                obs = next_obs\n                if done: break\n            trajectories.append(trajectory)\n\n        # === Bi-Level GAE 优势估计 ===\n        for traj in trajectories:\n            # 第一层：Turn-Level GAE\n            turn_advantages = compute_turn_gae(\n                rewards=[t.r_turn for t in traj],\n                values=critic.evaluate(traj),\n                gamma=gamma_turn, lambda_=lambda_turn\n            )\n            # 第二层：Token-Level GAE（以 turn advantage 初始化末尾 token）\n            token_advantages = []\n            for t, turn_adv in enumerate(turn_advantages):\n                token_advs = compute_token_gae(\n                    kl_penalties=compute_kl(traj[t].response),\n                    values=critic.token_values(traj[t]),\n                    gamma=gamma_token, lambda_=lambda_token,\n                    terminal_advantage=turn_adv  # 关键：用 turn 级优势初始化\n                )\n                token_advantages.extend(token_advs)\n\n        # === PPO 优化（带 Observation Token Masking）===\n        for epoch in range(K_epochs):\n            # 仅对 action tokens 计算策略梯度，mask 掉 observation tokens\n            ratio = policy_vlm.prob(actions) / old_policy.prob(actions)\n            clipped = clip(ratio, 1-ε, 1+ε)\n            loss = -min(ratio * token_advantages, clipped * token_advantages)\n            loss = loss * action_token_mask  # Observation Token Masking\n            policy_vlm.update(loss)\n</code></pre>\n<h5>方法详解</h5>\n<p><strong>1. 动机与问题定义：多轮视觉智能体的推理瓶颈</strong></p>\n<p>当前 VLM（视觉语言模型）在单轮视觉问答任务上表现出色，但在需要多轮交互的智能体任务中（如推箱子、机器人操控、迷宫导航）表现显著下降。论文将这一问题归因于两个核心缺陷：（1）VLM 缺乏对视觉状态的显式推理能力——它们不会主动\"描述当前看到了什么\"以及\"执行动作后世界会变成什么样\"；（2）现有 RL 训练方法（如 GRPO、标准 PPO）无法有效处理多轮交互中的信用分配问题——稀疏的终端奖励难以指导中间每一步的决策质量。</p>\n<p>VAGEN 的核心洞察是：<strong>让 VLM 像世界模型一样思考</strong>。具体来说，在每轮决策前，智能体需要显式地完成两项推理任务：<strong>状态估计</strong>（State Estimation，用自然语言描述当前观测到的环境状态 <span class=\"kb-math kb-math-inline\">\\hat{s}_t</span>）和<strong>转移预测</strong>（Transition Modeling，预测执行动作后环境将变成什么状态 <span class=\"kb-math kb-math-inline\">\\hat{s}_{t+1}</span>）。这种设计受到认知科学中\"内部世界模型\"概念的启发——人类在行动前会在脑中模拟动作的后果。</p>\n<p><strong>2. 核心机制：结构化推理策略与 VAGEN-Base</strong></p>\n<p>论文设计了 5 种推理策略来系统性地研究不同推理深度的影响。所有策略都通过结构化的 XML 标签控制输出格式：</p>\n<ul>\n<li><strong>NoThink</strong>：直接输出动作，不进行任何推理（<code>&lt;answer&gt;action&lt;/answer&gt;</code>）</li>\n<li><strong>FreeThink</strong>：在 <code>&lt;think&gt;</code> 标签中自由推理，类似 Chain-of-Thought</li>\n<li><strong>StateEstimation</strong>：在 <code>&lt;think&gt;</code> 中必须包含 <code>&lt;observation&gt;</code> 字段，描述当前视觉状态</li>\n<li><strong>TransitionModeling</strong>：在 <code>&lt;think&gt;</code> 中必须包含 <code>&lt;prediction&gt;</code> 字段，预测下一状态</li>\n<li><strong>WorldModeling</strong>：同时包含 <code>&lt;observation&gt;</code> 和 <code>&lt;prediction&gt;</code>，完整的世界建模</li>\n</ul>\n<div class=\"key-point\">💡 <strong>关键发现</strong>：StateEstimation 在导航任务中表现最佳（理解当前位置是关键），TransitionModeling 在操控任务中表现最佳（预测物体运动是关键），而 WorldModeling 在所有任务上都表现稳定且最优。</div>\n<p>VAGEN-Base 的训练框架基于 PPO，但引入了一个关键创新——<strong>Observation Token Masking</strong>。在多轮交互中，轨迹由交替出现的观测 token（图像编码）和动作 token（模型生成）组成。由于观测 token 不是由智能体策略生成的，对其计算策略梯度在理论上是错误的，且冗长的观测序列会主导梯度权重分布。因此，VAGEN 在计算 PPO 损失时将所有观测 token 的 mask 设为 0，仅对动作 token 进行优化。</p>\n<p><strong>3. WorldModeling Reward：基于 LLM 裁判的推理质量奖励</strong></p>\n<p>为了监督智能体的世界建模推理质量，VAGEN 引入了 WorldModeling Reward。其核心思路是：从环境中获取真实状态信息（如 Sokoban 中玩家/箱子/目标的 2D 坐标），然后评估智能体在 <code>&lt;observation&gt;</code> 和 <code>&lt;prediction&gt;</code> 中的描述与真实状态的匹配程度。</p>\n<p>论文最初尝试使用 CLIP 计算图文相似度作为奖励，但发现 CLIP 对细粒度的空间和几何细节不够敏感。最终采用 <strong>LLM-as-a-Judge</strong> 方案：将智能体的推理文本和真实状态文本一起输入 LLM，由 LLM 直接判断匹配程度（二元判断或提取结构化信息后进行 F1 评分）。每轮的推理奖励定义为：</p>\n<div class=\"kb-math kb-math-display\">r^{\\text{reason}}_t = \\beta_s \\cdot \\mathcal{I}_{\\text{SE}}(\\hat{s}_t, s_t) + \\beta_w \\cdot \\mathcal{I}_{\\text{TM}}(\\hat{s}_{t+1}, s_{t+1})</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\mathcal{I}</span> 为匹配得分函数，<span class=\"kb-math kb-math-inline\">\\beta_s, \\beta_w</span> 为奖励系数（默认均为 0.5）。</p>\n<p><strong>4. Bi-Level GAE：层次化信用分配</strong></p>\n<p>标准 GAE 在多轮交互中面临严重的信用分配问题：稀疏的终端奖励需要跨越数十个 turn、数百个 token 进行回传，信号极度衰减。VAGEN 提出 <strong>Bi-Level GAE</strong>，将优势估计分解为两个层次：</p>\n<p><strong>Turn 级别</strong>（外层）：将每轮的复合奖励 <span class=\"kb-math kb-math-inline\">r_t = r^{\\text{reason}}_t + r^{\\text{format}}_t + R(s_t, a_t)</span> 作为该轮的即时奖励，使用 critic 在每轮动作末尾的价值估计计算 TD 误差：</p>\n<div class=\"kb-math kb-math-display\">\\delta^{\\text{turn}}_t = r_t + \\gamma_{\\text{turn}} V_\\phi(\\bar{\\tau}_{\\leq a_{t+1}}) - V_\\phi(\\bar{\\tau}_{\\leq a_t})</div>\n<p>然后通过标准 GAE 递推计算 turn 级优势：<span class=\"kb-math kb-math-inline\">A^{\\text{turn}}_t = \\delta^{\\text{turn}}_t + \\gamma_{\\text{turn}} \\lambda_{\\text{turn}} A^{\\text{turn}}_{t+1}</span>。</p>\n<p><strong>Token 级别</strong>（内层）：在每个 turn 内部，以 KL 惩罚作为 token 级奖励，计算 token 级 TD 误差和优势。<strong>关键连接</strong>：每个 turn 最后一个 token 的优势被初始化为该 turn 的 turn 级优势 <span class=\"kb-math kb-math-inline\">A^{\\text{turn}}_t</span>，从而将 turn 级别的反馈注入 token 级别并向前传播。</p>\n<div class=\"warn-box\">⚠️ <strong>与传统方法的区别</strong>：Vanilla PPO 不做 observation masking 导致训练失败；GRPO 因场景变化导致轨迹多样性过高，需要不可承受的样本量；Turn-level PPO 对同一 turn 内所有 token 使用均匀优势估计，无法区分各 token 的贡献。Bi-Level GAE 同时解决了这三个问题。</div>\n<p><strong>5. 消融实验与关键发现</strong></p>\n<p>消融实验揭示了两个组件的互补性：Bi-Level GAE 单独使用时提升显著但不稳定（对奖励稀疏性和准确性敏感）；WorldModeling Reward 单独使用时一致性提升但受限于粗粒度的轨迹级信用分配。两者结合的 VAGEN-Full 在所有任务上都是最稳定且表现最优的方法。特别值得注意的是，在 PrimitiveSkill 任务上，VAGEN-Base 和 VAGEN-Full 的训练准确率相近，但 VAGEN-Full 的测试准确率显著更高，表明世界建模推理增强了泛化能力。</p>",
      "quiz": {
        "q": "VAGEN 中 Bi-Level GAE 的 token 级优势估计是如何与 turn 级优势关联的？",
        "options": [
          "将所有 turn 级优势求平均后作为每个 token 的优势",
          "每个 turn 最后一个 token 的优势被初始化为该 turn 的 turn 级优势，然后向前传播",
          "token 级优势独立计算，与 turn 级优势相加得到最终优势",
          "使用 turn 级优势对 token 级优势进行归一化"
        ],
        "answer": 1,
        "explain": "Bi-Level GAE 的关键连接机制是将每个 turn 最后一个 action token 的优势初始化为预先计算好的 turn 级优势 A^turn_t，然后通过 token 级 GAE 的反向递推将该信号传播到 turn 内所有 token，实现层次化的信用分配。"
      }
    },
    {
      "id": "mindjourney",
      "num": 44,
      "name": "MindJourney",
      "fullName": "心智旅程 (Test-time Scaling with World Models)",
      "year": "2026.03",
      "org": "Shanghai Jiao Tong University",
      "parent": "vjepa21",
      "paperUrl": "https://proceedings.neurips.cc/paper/2026/mindjourney",
      "projectUrl": "",
      "category": "embodied",
      "motivation": "推理阶段利用世界模型增强空间推理",
      "summary": "MindJourney 提出测试时世界模型扩展框架，让 VLM 在回答空间推理问题前主动规划相机轨迹、调用可控视频世界模型生成新视角，并基于多视角证据作答，解决单图 VLM 缺乏 3D 内部动态模型的问题。清单中的 NeurIPS 2026 链接疑似占位符；本精读依据可访问论文 arXiv:2507.12508v2 与项目页整理。",
      "keyPoints": [
        "不微调 VLM，只在测试时把 VLM 与可控视频扩散 world model 组合，实现 plug-and-play 的 spatial reasoning 增强。",
        "将空间推理转化为“3D imagination space”中的主动搜索：VLM 选择短相机轨迹，世界模型渲染对应新视角。",
        "提出 Spatial Beam Search：用探索分数更新 beam，用有用性分数把关键视角缓存到 evidence buffer。",
        "支持不同世界模型，包括 Stable Virtual Camera (SVC) 和作者训练的 Search World Model (SWM)。",
        "SWM 基于 Wan2.2-TI2V-5B/ReCamMaster 思路，使用 Habitat 合成几何控制数据，并混合 RealEstate-10K、DL3DV-10K 缩小外观域差距。",
        "在 SAT 空间推理基准上无需微调带来约 7.7%/8% 平均提升，并能增强 GPT-4o、GPT-4.1、InternVL3、o1 等不同 VLM。"
      ],
      "detail": "<p><img alt=\"MindJourney 流程图\" src=\"https://arxiv.org/html/2507.12508v2/figure/pipeline.png\" />\n<em>图：MindJourney 让 VLM 在测试时控制世界模型扩展视角，并把有用观测汇总为最终回答证据。</em></p>\n<pre><code class=\"language-python\"># MindJourney Spatial Beam Search 伪代码\ndef mindjourney_answer(image, question, vlm, world_model, actions, depth, beam_width):\n    beam = [(empty_trajectory(), image)]\n    evidence = []\n\n    for step in range(depth):\n        candidates = []\n        for traj, obs in beam:\n            for action_seq in expand(actions):\n                new_traj = traj + action_seq\n                frames = world_model.render(image, camera_trajectory=new_traj)\n                candidates.append((new_traj, frames))\n\n        # VLM 同时评估：是否值得继续探索、是否值得保存为证据\n        scored = vlm.score_candidates(question, candidates)\n        beam = topk(scored, key=&quot;exploration_score&quot;, k=beam_width)\n        evidence.extend(topk(scored, key=&quot;helpfulness_score&quot;, k=K_help))\n\n        if len(beam) == 0:\n            break\n\n    return vlm.answer(question, evidence)\n</code></pre>\n<p>MindJourney 的出发点是：很多空间题并非语言推理不够，而是单张图像缺少必要视角。例如“从当前位置向右转后能否看到某物”“哪个物体在目标背后”“沿某方向移动后目标相对位置如何变化”，人类会在脑中模拟视角变换，而普通 VLM 只能基于当前 2D 投影猜测。</p>\n<p>因此 MindJourney 把测试时计算从“生成更多文字 token”扩展为“生成更多视觉证据”。给定初始图像 <span class=\"kb-math kb-math-inline\">I_0</span>、问题 <span class=\"kb-math kb-math-inline\">q</span>、动作集合 <span class=\"kb-math kb-math-inline\">\\mathcal{A}</span> 和世界模型 <span class=\"kb-math kb-math-inline\">W</span>，候选轨迹 <span class=\"kb-math kb-math-inline\">\\tau=(a_1,\\dots,a_H)</span> 生成新视角：</p>\n<div class=\"kb-math kb-math-display\">\\hat I_{1:H} = W(I_0, \\tau).</div>\n<p>VLM 不直接回答，而是先对 <span class=\"kb-math kb-math-inline\">(\\tau,\\hat I)</span> 评分：一个分数衡量是否继续沿该轨迹探索，另一个分数衡量该视角是否应该进入证据缓存。搜索更新可以写成：</p>\n<div class=\"kb-math kb-math-display\">B_{t+1}=\\mathrm{TopK}_{\\text{explore}}\\{(\\tau,\\hat I)\\},\n\\qquad\nE \\leftarrow E \\cup \\mathrm{TopK}_{\\text{help}}\\{(\\tau,\\hat I)\\}.</div>\n<p>最后，VLM 接收原问题、轨迹自然语言描述和 evidence buffer 中的多视角图像，输出答案。这个流程让 VLM 的高层语义判断负责“往哪里看”和“哪些视角有用”，而世界模型负责低层几何想象。</p>\n<p>SWM 的训练体现了任务约束带来的简化：MindJourney 不需要生成任意动作视频，只需要执行有限的 egocentric primitive actions，如前进、后退、左右转。作者用 Habitat 2.0 合成大量几何精确的室内导航 clips，再混合 RealEstate-10K 和 DL3DV-10K 这类真实多视角视频数据，让模型既学到相机控制，也保留真实外观多样性。</p>\n<p>与传统视觉提示或 CoT prompting 相比，MindJourney 的核心区别是它引入了外部可控世界模型作为“可查询环境”。与训练一个新 VLM 相比，它完全发生在测试时，可以叠加到强闭源模型或开源模型上。论文在 SAT-Real 表中报告 GPT-4o 从 60.3 提升到 70.6（搭配 SWM），说明多视角想象对真实图像空间题有直接收益。</p>\n<p>局限也很明确：世界模型若生成错误几何或幻觉视角，VLM 可能把错误证据当真；搜索也会增加推理成本。MindJourney 的贡献不是证明世界模型已完美，而是展示一种通用接口：让 VLM 通过动作条件视觉想象扩展测试时计算。</p>",
      "quiz": {
        "q": "MindJourney 的 Spatial Beam Search 中 evidence buffer 的作用是什么？",
        "options": [
          "保存训练梯度，供后续微调 VLM",
          "缓存被 VLM 判断为有助于回答问题的新视角证据",
          "记录所有被剪枝的错误答案",
          "替代世界模型生成相机轨迹"
        ],
        "answer": 1,
        "explain": "搜索过程中 VLM 会给候选新视角打 helpfulness 分数，高分视角进入 evidence buffer，最终回答时作为多视角证据输入。"
      }
    },
    {
      "id": "chatvla2",
      "num": 45,
      "name": "ChatVLA-2",
      "fullName": "对话视觉语言动作2 (Open-world Reasoning VLA)",
      "year": "2026.03",
      "org": "Fudan University",
      "parent": "vjepa21",
      "paperUrl": "https://proceedings.neurips.cc/paper/2026/chatvla2",
      "projectUrl": "",
      "category": "embodied",
      "motivation": "保留VLM能力扩展开放世界具身推理",
      "summary": "ChatVLA-2 提出带动态 Mixture-of-Experts 和两阶段训练的 VLA，使机器人在微调后仍能保留 VLM 的 OCR、数学和空间推理能力，并把内部推理可靠转化为动作。清单中的 NeurIPS 2026 链接疑似占位符；本精读依据可访问论文 arXiv:2505.21906v2 整理。",
      "keyPoints": [
        "以 DexVLA/Qwen2-VL 风格架构为基础，视觉观测和语言 token 进入 VLM，输出 reasoning tokens 与 action tokens。",
        "使用动态 MoE 解耦多模态理解与机器人控制的冲突参数空间；实践中共 8 个 experts，推理时动态选择 2 个。",
        "Action tokens 经两层线性层和 LayerNorm 投影后送入预训练 1B ScaleDP action expert。",
        "提出 reasoning-following enhancement module：用 reasoning tokens 调制动作专家后半层的 scale/shift，使动作跟随模型内部推理。",
        "两阶段训练：Stage 1 混合图文数据和机器人数据保留开放世界推理；Stage 2 冻结 VLM、只训练 action expert，加强推理到动作的连接。",
        "图文数据包含 COCO、TextVQA、GQA 及机器人场景图文；机器人数据包含 600 条 math-matching 和 300 条 toy-placement 轨迹。",
        "开放世界 math matching 中 ChatVLA-2 达到 43/52 成功，toy placement 中达到 127/156，显著优于 OpenVLA、DexVLA、ChatVLA、π0 等基线。"
      ],
      "detail": "<p><img alt=\"ChatVLA-2 模型架构\" src=\"https://arxiv.org/html/2505.21906v2/x1.png\" />\n<em>图：ChatVLA-2 在 VLM backbone 中加入动态 MoE，并在动作专家中加入 reasoning-following 增强模块。</em></p>\n<pre><code class=\"language-python\"># ChatVLA-2 训练与推理伪代码\ndef stage1_cotrain(batch):\n    image_tokens = vision_encoder(batch.multi_view_images)\n    text_tokens = tokenizer(batch.instruction)\n    hidden = qwen2_vl_dynamic_moe(image_tokens, text_tokens, top_k_experts=2)\n    reasoning_tokens, action_tokens = split_outputs(hidden)\n    actions = scaledp_action_expert(project(action_tokens), batch.robot_state)\n    loss = vlm_loss(reasoning_tokens, batch.text_targets) + action_loss(actions, batch.actions)\n    update(vlm_and_action_expert, loss)\n\ndef stage2_reasoning_following(robot_batch):\n    freeze(qwen2_vl_dynamic_moe)\n    hidden = qwen2_vl_dynamic_moe(robot_batch.images, robot_batch.instruction)\n    reasoning_tokens, action_tokens = split_outputs(hidden)\n    scale_shift = reasoning_to_modulation(reasoning_tokens)\n    actions = scaledp_action_expert(project(action_tokens), modulation=scale_shift)\n    loss = action_loss(actions, robot_batch.actions)\n    update(action_expert_only, loss)\n\ndef infer(obs, instruction):\n    reasoning, action_tokens = qwen2_vl_dynamic_moe(obs.images, instruction)\n    return scaledp_action_expert(project(action_tokens), reasoning_condition=reasoning)\n</code></pre>\n<p>ChatVLA-2 关注的问题不是“VLA 能否学会某个机器人任务”，而是“VLA 微调后是否还记得 VLM 原本会的东西”。普通端到端 VLA 在机器人数据上微调后，往往牺牲 OCR、数学、常识和空间关系能力；但开放世界机器人任务恰恰需要这些能力，例如读白板公式、识别未见过玩具、理解“放到杯子右侧/架子上方”。</p>\n<p>动态 MoE 是为了解决参数空间冲突。给定 hidden state <span class=\"kb-math kb-math-inline\">h</span>，router 选择 top-k experts：</p>\n<div class=\"kb-math kb-math-display\">y = \\sum_{e\\in \\mathrm{TopK}(G(h))} G_e(h)\\,E_e(h).</div>\n<p>某些 experts 可专注机器人动作，某些保留多模态理解，还有一些承载空间推理等共享能力。论文特别强调不用 static/shared expert 粗暴改结构，因为 Qwen2-VL 的 LLM 部分本来不是 MoE，过度改动会破坏预训练知识；动态 MoE 尽量保持原架构，同时让输入自适应选择专家。</p>\n<p>Reasoning-following enhancement module 解决另一个问题：模型“想对了”不代表“动对了”。ChatVLA-2 不只把语言指令送给动作头，而是把上层 reasoning tokens 投影成调制信号，作用于动作专家后半层：</p>\n<div class=\"kb-math kb-math-display\">(\\gamma,\\beta)=\\mathrm{MLP}(r_{\\text{reason}}),\n\\qquad\nh&#x27;=\\gamma\\odot h+\\beta .</div>\n<p>只注入后半层是一个工程取舍：深层更接近语义和动作决策，改变它们对低层控制稳定性的破坏较小。这样模型可以在遇到训练外推理类型时，把 OCR/数学/空间判断显式传递给动作生成。</p>\n<p>两阶段训练也服务于“先保留知识，再学会执行”。Stage 1 用 COCO、TextVQA、GQA、机器人场景图文和机器人轨迹混训，让模型同时见到图文问答和动作模仿；论文保持图文数据:机器人数据约 1:3，并用 reasoning phrase 标注机器人数据。Stage 2 冻结 VLM，只训练 action expert，使动作专家学习跟随已经形成的 reasoning，而不继续侵蚀 VLM 知识。</p>\n<p>实验设计很直接。Math matching 要机器人读白板手写公式、识别数字卡片并选择答案；toy placement 要机器人识别未见过的物体并执行相对空间放置。开放世界设置中，公式、物体或方向组合不在训练集内。ChatVLA-2 在 math matching 开放世界中 OCR 3.58/4、数学 1.73/2、执行 43/52；toy placement 开放世界中 object recognition 0.94、spatial affordance 0.88、执行 127/156。</p>\n<p>与 OpenVLA、DexVLA、π0 等模型相比，ChatVLA-2 的优势不主要来自更强低层控制，而是来自“保留并调用预训练知识”。论文消融显示，去掉动态 MoE 或只用 dense 7B 模型并不能解决开放世界失败；去掉 Stage 2 则会让推理产生但动作不跟随，说明架构和训练流程必须同时存在。</p>",
      "quiz": {
        "q": "ChatVLA-2 的第二阶段训练为什么冻结 VLM、只训练 action expert？",
        "options": [
          "为了删除 VLM 的开放世界知识",
          "为了让动作专家学习跟随 VLM 产生的推理，同时避免继续破坏预训练能力",
          "为了把所有机器人动作转换成文本答案",
          "为了让 MoE router 固定选择同一个专家"
        ],
        "answer": 1,
        "explain": "Stage 2 保持 VLM 推理能力不被机器人数据继续侵蚀，只优化动作专家，使动作更可靠地执行 reasoning tokens 表达的结果。"
      }
    }
  ],
  "categories": {
    "ssm": {
      "label": "状态空间世界模型",
      "color": "#22a06b"
    },
    "predictive": {
      "label": "预测表征学习",
      "color": "#1f77b4"
    },
    "generative": {
      "label": "生成式世界模型",
      "color": "#ff7f0e"
    },
    "physics": {
      "label": "物理世界建模",
      "color": "#9467bd"
    },
    "planning": {
      "label": "基于模型的规划",
      "color": "#d62728"
    },
    "embodied": {
      "label": "具身智能应用",
      "color": "#17becf"
    }
  },
  "projectUrls": {}
};
