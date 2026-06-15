/**
 * world_model-data.js — 由 pipeline/build.py 于 2026-06-15 09:55:55 自动生成。
 * 源文件：content/embodied/world_model.md
 * ⚠️  请勿手动修改；如需更新，修改源文档后重新编译。
 */
window.PAGE_CONFIG = {
  "meta": {
    "domain": "embodied",
    "topic_id": "world_model",
    "topic_name": "世界模型",
    "page_title": "世界模型 算法总结",
    "page_subtitle": "2026-06-15 版",
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
      "summary": "World Models 的核心目标是：首次展示智能体可在自身生成的梦境中学习策略。",
      "keyPoints": [
        "核心动机：首次展示智能体可在自身生成的梦境中学习策略",
        "代表机构：Google Brain"
      ],
      "detail": "<p>首次展示智能体可在自身生成的梦境中学习策略</p>"
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
      "summary": "PlaNet 的核心目标是：引入RSSM循环状态空间模型实现像素级规划。",
      "keyPoints": [
        "核心动机：引入RSSM循环状态空间模型实现像素级规划",
        "演化来源：继承或改进自 world_models",
        "代表机构：Google DeepMind"
      ],
      "detail": "<p>引入RSSM循环状态空间模型实现像素级规划</p>"
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
      "summary": "DreamerV1 的核心目标是：通过潜在想象进行行为学习的Actor-Critic框架。",
      "keyPoints": [
        "核心动机：通过潜在想象进行行为学习的Actor-Critic框架",
        "演化来源：继承或改进自 planet",
        "代表机构：Google DeepMind"
      ],
      "detail": "<p>通过潜在想象进行行为学习的Actor-Critic框架</p>"
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
      "summary": "DreamerV2 的核心目标是：引入离散潜在变量首次在Atari达到人类水平。",
      "keyPoints": [
        "核心动机：引入离散潜在变量首次在Atari达到人类水平",
        "演化来源：继承或改进自 dreamerv1",
        "代表机构：Google DeepMind"
      ],
      "detail": "<p>引入离散潜在变量首次在Atari达到人类水平</p>"
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
      "summary": "DreamerV3 的核心目标是：固定超参数实现跨领域通用性首次在MC收集钻石。",
      "keyPoints": [
        "核心动机：固定超参数实现跨领域通用性首次在MC收集钻石",
        "演化来源：继承或改进自 dreamerv2",
        "代表机构：Google DeepMind"
      ],
      "detail": "<p>固定超参数实现跨领域通用性首次在MC收集钻石</p>"
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
      "summary": "Dreamer 4 的核心目标是：扩展模型规模增强长时程记忆与复杂任务想象。",
      "keyPoints": [
        "核心动机：扩展模型规模增强长时程记忆与复杂任务想象",
        "演化来源：继承或改进自 dreamerv3",
        "代表机构：Google DeepMind"
      ],
      "detail": "<p>扩展模型规模增强长时程记忆与复杂任务想象</p>"
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
      "summary": "JEPA 的核心目标是：预测潜在表征而非像素避免建模噪声。",
      "keyPoints": [
        "核心动机：预测潜在表征而非像素避免建模噪声",
        "代表机构：Meta AI"
      ],
      "detail": "<p>预测潜在表征而非像素避免建模噪声</p>"
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
      "summary": "I-JEPA 的核心目标是：通过掩码块预测学习强语义特征训练效率高。",
      "keyPoints": [
        "核心动机：通过掩码块预测学习强语义特征训练效率高",
        "演化来源：继承或改进自 jepa",
        "代表机构：Meta AI"
      ],
      "detail": "<p>通过掩码块预测学习强语义特征训练效率高</p>"
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
      "summary": "V-JEPA 的核心目标是：扩展至视频域学习时空特征理解物理运动。",
      "keyPoints": [
        "核心动机：扩展至视频域学习时空特征理解物理运动",
        "演化来源：继承或改进自 ijepa",
        "代表机构：Meta AI"
      ],
      "detail": "<p>扩展至视频域学习时空特征理解物理运动</p>"
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
      "summary": "V-JEPA 2 的核心目标是：增强时空推理应用于机器人规划任务。",
      "keyPoints": [
        "核心动机：增强时空推理应用于机器人规划任务",
        "演化来源：继承或改进自 vjepa",
        "代表机构：Meta AI"
      ],
      "detail": "<p>增强时空推理应用于机器人规划任务</p>"
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
      "summary": "V-JEPA 2.1 的核心目标是：扩展至20亿参数实现80%零样本抓取成功率。",
      "keyPoints": [
        "核心动机：扩展至20亿参数实现80%零样本抓取成功率",
        "演化来源：继承或改进自 vjepa2",
        "代表机构：Meta AI"
      ],
      "detail": "<p>扩展至20亿参数实现80%零样本抓取成功率</p>"
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
      "summary": "VideoGPT 的核心目标是：利用VQ-VAE和Transformer自回归生成视频。",
      "keyPoints": [
        "核心动机：利用VQ-VAE和Transformer自回归生成视频",
        "代表机构：UC Berkeley"
      ],
      "detail": "<p>利用VQ-VAE和Transformer自回归生成视频</p>"
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
      "summary": "TECO 的核心目标是：弱瓶颈潜在表示解决长视频时空一致性。",
      "keyPoints": [
        "核心动机：弱瓶颈潜在表示解决长视频时空一致性",
        "演化来源：继承或改进自 videogpt",
        "代表机构：Google Research"
      ],
      "detail": "<p>弱瓶颈潜在表示解决长视频时空一致性</p>"
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
      "summary": "GAIA-1 的核心目标是：9B参数模型预测驾驶场景理解交通规则。",
      "keyPoints": [
        "核心动机：9B参数模型预测驾驶场景理解交通规则",
        "演化来源：继承或改进自 videogpt",
        "代表机构：Wayve"
      ],
      "detail": "<p>9B参数模型预测驾驶场景理解交通规则</p>"
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
      "summary": "Genie 的核心目标是：从无标注视频学习生成式交互环境。",
      "keyPoints": [
        "核心动机：从无标注视频学习生成式交互环境",
        "演化来源：继承或改进自 videogpt",
        "代表机构：Google DeepMind"
      ],
      "detail": "<p>从无标注视频学习生成式交互环境</p>"
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
      "summary": "Sora 的核心目标是：展现对重力碰撞等物理规律的直觉理解。",
      "keyPoints": [
        "核心动机：展现对重力碰撞等物理规律的直觉理解",
        "演化来源：继承或改进自 videogpt",
        "代表机构：OpenAI"
      ],
      "detail": "<p>展现对重力碰撞等物理规律的直觉理解</p>"
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
      "summary": "Genie 2 的核心目标是：11B参数支持实时3D环境生成与交互。",
      "keyPoints": [
        "核心动机：11B参数支持实时3D环境生成与交互",
        "演化来源：继承或改进自 genie",
        "代表机构：Google DeepMind"
      ],
      "detail": "<p>11B参数支持实时3D环境生成与交互</p>"
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
      "summary": "GAIA-3 的核心目标是：生成极端长尾场景助力伦敦L4级测试。",
      "keyPoints": [
        "核心动机：生成极端长尾场景助力伦敦L4级测试",
        "演化来源：继承或改进自 gaia1",
        "代表机构：Wayve"
      ],
      "detail": "<p>生成极端长尾场景助力伦敦L4级测试</p>"
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
      "summary": "DeltaWorld 的核心目标是：仅编码帧间差异计算量降低2000倍。",
      "keyPoints": [
        "核心动机：仅编码帧间差异计算量降低2000倍",
        "演化来源：继承或改进自 genie2",
        "代表机构：ETH Zurich"
      ],
      "detail": "<p>仅编码帧间差异计算量降低2000倍</p>"
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
      "summary": "WorldReel 的核心目标是：几何一致性建模解决视频生成幻觉问题。",
      "keyPoints": [
        "核心动机：几何一致性建模解决视频生成幻觉问题",
        "演化来源：继承或改进自 sora",
        "代表机构：SenseTime"
      ],
      "detail": "<p>几何一致性建模解决视频生成幻觉问题</p>"
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
      "summary": "OccSora 的核心目标是：利用4D占据栅格提供几何稳定环境。",
      "keyPoints": [
        "核心动机：利用4D占据栅格提供几何稳定环境",
        "演化来源：继承或改进自 sora",
        "代表机构：Tsinghua University"
      ],
      "detail": "<p>利用4D占据栅格提供几何稳定环境</p>"
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
      "summary": "Astra 的核心目标是：自回归流与扩散去噪确保长时序物理连贯。",
      "keyPoints": [
        "核心动机：自回归流与扩散去噪确保长时序物理连贯",
        "演化来源：继承或改进自 sora",
        "代表机构：Tsinghua/Kuaishou"
      ],
      "detail": "<p>自回归流与扩散去噪确保长时序物理连贯</p>"
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
      "summary": "IN 的核心目标是：通过对象关系图建模实现物理系统推理。",
      "keyPoints": [
        "核心动机：通过对象关系图建模实现物理系统推理",
        "代表机构：DeepMind"
      ],
      "detail": "<p>通过对象关系图建模实现物理系统推理</p>"
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
      "summary": "VIN 的核心目标是：从原始视频中学习物理模拟器。",
      "keyPoints": [
        "核心动机：从原始视频中学习物理模拟器",
        "演化来源：继承或改进自 interaction_networks",
        "代表机构：DeepMind"
      ],
      "detail": "<p>从原始视频中学习物理模拟器</p>"
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
      "summary": "HNN 的核心目标是：引入哈密顿力学确保能量守恒。",
      "keyPoints": [
        "核心动机：引入哈密顿力学确保能量守恒",
        "演化来源：继承或改进自 interaction_networks",
        "代表机构：Google Brain"
      ],
      "detail": "<p>引入哈密顿力学确保能量守恒</p>"
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
      "summary": "GNS 的核心目标是：利用GNN模拟流体刚体可变形材料。",
      "keyPoints": [
        "核心动机：利用GNN模拟流体刚体可变形材料",
        "演化来源：继承或改进自 vin",
        "代表机构：DeepMind"
      ],
      "detail": "<p>利用GNN模拟流体刚体可变形材料</p>"
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
      "summary": "Roboscape 的核心目标是：引入物理先验提升机器人场景预测准确性。",
      "keyPoints": [
        "核心动机：引入物理先验提升机器人场景预测准确性",
        "演化来源：继承或改进自 gns",
        "代表机构：Tsinghua University"
      ],
      "detail": "<p>引入物理先验提升机器人场景预测准确性</p>"
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
      "summary": "Newton 1.0 的核心目标是：开源物理引擎实现精确刚体流体动力学。",
      "keyPoints": [
        "核心动机：开源物理引擎实现精确刚体流体动力学",
        "演化来源：继承或改进自 gns",
        "代表机构：NVIDIA"
      ],
      "detail": "<p>开源物理引擎实现精确刚体流体动力学</p>"
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
      "summary": "SimPLe 的核心目标是：在Atari 100k展示极高样本效率。",
      "keyPoints": [
        "核心动机：在Atari 100k展示极高样本效率",
        "演化来源：继承或改进自 mbpo",
        "代表机构：Google Research"
      ],
      "detail": "<p>在Atari 100k展示极高样本效率</p>"
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
      "summary": "MuZero 的核心目标是：学习对价值奖励策略有用的潜在动力学。",
      "keyPoints": [
        "核心动机：学习对价值奖励策略有用的潜在动力学",
        "演化来源：继承或改进自 mbpo",
        "代表机构：DeepMind"
      ],
      "detail": "<p>学习对价值奖励策略有用的潜在动力学</p>"
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
      "summary": "TD-MPC 的核心目标是：结合TD学习与MPC无需显式重建损失。",
      "keyPoints": [
        "核心动机：结合TD学习与MPC无需显式重建损失",
        "演化来源：继承或改进自 muzero",
        "代表机构：UC San Diego"
      ],
      "detail": "<p>结合TD学习与MPC无需显式重建损失</p>"
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
      "summary": "IRIS 的核心目标是：Transformer作为世界模型2小时达人类水平。",
      "keyPoints": [
        "核心动机：Transformer作为世界模型2小时达人类水平",
        "演化来源：继承或改进自 muzero",
        "代表机构：Google DeepMind"
      ],
      "detail": "<p>Transformer作为世界模型2小时达人类水平</p>"
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
      "summary": "TD-MPC2 的核心目标是：可扩展鲁棒的连续控制世界模型。",
      "keyPoints": [
        "核心动机：可扩展鲁棒的连续控制世界模型",
        "演化来源：继承或改进自 tdmpc",
        "代表机构：UC San Diego"
      ],
      "detail": "<p>可扩展鲁棒的连续控制世界模型</p>"
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
      "summary": "Jumpy WM 的核心目标是：跳跃式动力学解决长程规划误差累积。",
      "keyPoints": [
        "核心动机：跳跃式动力学解决长程规划误差累积",
        "演化来源：继承或改进自 tdmpc2",
        "代表机构：DeepMind"
      ],
      "detail": "<p>跳跃式动力学解决长程规划误差累积</p>"
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
      "summary": "RLVR-World 的核心目标是：利用RL微调提升多步预测因果连贯性。",
      "keyPoints": [
        "核心动机：利用RL微调提升多步预测因果连贯性",
        "演化来源：继承或改进自 iris",
        "代表机构：Tsinghua University"
      ],
      "detail": "<p>利用RL微调提升多步预测因果连贯性</p>"
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
      "summary": "UniDrive-WM 的核心目标是：统一理解规划生成支持多摄像头一致性。",
      "keyPoints": [
        "核心动机：统一理解规划生成支持多摄像头一致性",
        "演化来源：继承或改进自 gaia3",
        "代表机构：UC Berkeley"
      ],
      "detail": "<p>统一理解规划生成支持多摄像头一致性</p>"
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
      "summary": "ReSim 的核心目标是：丰富驾驶日志生成高保真闭环仿真环境。",
      "keyPoints": [
        "核心动机：丰富驾驶日志生成高保真闭环仿真环境",
        "演化来源：继承或改进自 gaia3",
        "代表机构：University of Tübingen"
      ],
      "detail": "<p>丰富驾驶日志生成高保真闭环仿真环境</p>"
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
      "summary": "NavThinker 的核心目标是：深度特征空间前瞻思考降低碰撞率。",
      "keyPoints": [
        "核心动机：深度特征空间前瞻思考降低碰撞率",
        "演化来源：继承或改进自 vjepa21",
        "代表机构：Zhejiang University"
      ],
      "detail": "<p>深度特征空间前瞻思考降低碰撞率</p>"
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
      "summary": "X-WAM 的核心目标是：统一4D合成与动作执行异步噪声采样。",
      "keyPoints": [
        "核心动机：统一4D合成与动作执行异步噪声采样",
        "演化来源：继承或改进自 worldreel",
        "代表机构：Stanford/NVIDIA"
      ],
      "detail": "<p>统一4D合成与动作执行异步噪声采样</p>"
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
      "summary": "MindJourney 的核心目标是：推理阶段利用世界模型增强空间推理。",
      "keyPoints": [
        "核心动机：推理阶段利用世界模型增强空间推理",
        "演化来源：继承或改进自 vjepa21",
        "代表机构：Shanghai Jiao Tong University"
      ],
      "detail": "<p>推理阶段利用世界模型增强空间推理</p>"
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
      "summary": "ChatVLA-2 的核心目标是：保留VLM能力扩展开放世界具身推理。",
      "keyPoints": [
        "核心动机：保留VLM能力扩展开放世界具身推理",
        "演化来源：继承或改进自 vjepa21",
        "代表机构：Fudan University"
      ],
      "detail": "<p>保留VLM能力扩展开放世界具身推理</p>"
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
