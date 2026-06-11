/**
 * vla-data.js — 由 pipeline/build.py 于 2026-06-11 14:19:40 自动生成。
 * 源文件：content/embodied/vla.md
 * ⚠️  请勿手动修改；如需更新，修改源文档后重新编译。
 */
window.PAGE_CONFIG = {
  "meta": {
    "domain": "embodied",
    "topic_id": "vla",
    "topic_name": "视觉-语言-动作基础模型",
    "page_title": "视觉-语言-动作 (VLA) 基础模型算法总结",
    "page_subtitle": "2026-06-11 版",
    "page_desc": "从模仿学习到原生多模态端到端控制，梳理VLA模型在具身智能领域的技术演进与前沿突破",
    "page_icon": "🦾",
    "hero_pills": [
      "具身智能 · 多模态大模型 · 机器人控制 · 流匹配策略"
    ],
    "count_pill": "{count} 个算法",
    "image_base": "",
    "overview_from_doc": true,
    "latest_overview_from_doc": true
  },
  "overview": [
    {
      "title": "【综述】具身智能中的 VLA 模型",
      "body_html": "<p>中科院自动化所的这篇综述系统性地梳理了VLA模型从概念萌芽到快速发展的脉络。论文本身就是中文，比较易读，本文仅做一个简化导读。</p>\n<ul>\n<li>从具身智能的三要素（环境、本体、进化）出发，构建了一个包含模型架构、训练数据、预训练、后训练和模型评估五大维度的分析框架。</li>\n<li>通过这个框架，论文剖析了当前VLA模型的技术现状，指出了其在泛化能力、精细操作和实时性等方面的核心挑战，并为未来的研究提供了方向指引。</li>\n</ul>\n<blockquote>\n<p>论文：<a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2508.15201\">[2508.15201] Survey of Vision-Language-Action Models for Embodied Manipulation</a></p>\n</blockquote>\n<hr />"
    },
    {
      "title": "一、背景知识：VLA与具身智能",
      "body_html": "<p>具身智能的核心理念是，智能体通过其「身体」与环境进行持续的交互、感知和行动，从而在实践中学习和进化。机器人作为具身智能的典型载体，其在开放环境下的通用操作能力是衡量该领域进展的关键指标。</p>\n<p>传统的机器人控制系统通常采用模块化设计，将感知、决策、规划、控制等环节解耦。这种架构虽然清晰可解释，但在面对现实世界中无穷无尽的多样化任务和动态变化的环境时，显得力不从心。随着以Transformer为核心的大型语言模型（LLM）和视觉语言模型（VLM）展现出强大的泛化能力，为机器人技术带来了新的可能性。</p>\n<p>视觉-语言-动作（Vision-Language-Action, VLA）模型试图构建一个<strong>通用的</strong>机器人控制策略，将视觉感知、语言理解和动作生成统一在单个可扩展的框架内。通过接收自然语言指令和多模态传感器数据，VLA模型直接输出物理动作，实现了从高级语义理解到低级物理执行的端到端映射。</p>"
    },
    {
      "title": "二、VLA模型的演进历程",
      "body_html": "<p>VLA模型的发展与大模型技术的演进紧密相连。其发展历程大致可划分为三个阶段，每个阶段都反映了研究界对<strong>连接感知与行动</strong>这一核心问题的不同理解和解决方案。</p>\n<p><img alt=\"\" src=\"https://pica.zhimg.com/v2-c1b8b03ae0974b27916938352aec992e_1440w.jpg\" /></p>\n<h4>2.1 萌芽阶段（~2023年初）</h4>\n<p>在VLA概念正式形成之前，研究者已开始探索将语言指令融入机器人模仿学习。早期工作尝试使用卷积神经网络（CNN）或循环神经网络（RNN）处理视觉和语言输入，但受限于模型容量，难以扩展到大规模任务。</p>\n<p>这一阶段的核心议题是如何将机器人控制问题范式化为大模型擅长的序列到序列（Seq2Seq）任务。代表性工作如<code>RT-1</code>将图像和语言编码为Token，并对连续的机器人动作进行离散化分词，使其能被Transformer架构处理。<code>GATO</code>则提出了一个更为通用的「通才智能体」（Generalist Agent）概念，用一套模型参数处理机器人控制、游戏、对话等多种任务。</p>\n<p>同时，为了解决离散化动作带来的精度损失和运动抖动问题，研究者开始探索生成式模型。<code>ACT</code>引入了动作分块（Action Chunking）和条件变分自编码器（CVAE）来建模动作的多模态性。<code>Diffusion Policy</code>则利用扩散模型强大的分布建模能力，有效捕捉了复杂演示数据中的多模态行为，为后续工作提供了重要思路。</p>\n<h4>2.2 探索阶段（2023年中~2024年初）</h4>\n<p>2023年，<code>RT-2</code>模型的发布正式提出了VLA的概念，并展示了通过继承大规模VLM（如PaLM-E）权重，模型可以将在互联网数据中学到的视觉和语义知识迁移到机器人控制任务中，表现出显著的零样本泛化能力。</p>\n<p>这一阶段，研究路线出现了明显的分化：</p>\n<ul>\n<li><strong>继承预训练权重</strong>：以<code>RT-2</code>、<code>RoboFlamingo</code>（继承Flamingo）、<code>OpenVLA</code>（继承LLaMA）为代表。该路线的核心思想是「站在巨人的肩膀上」，直接利用LLM/VLM强大的先验知识来理解开放世界的概念和指令，然后用相对较少的机器人数据进行微调，以对齐动作空间。</li>\n<li><strong>从零构建专用模型</strong>：以<code>Octo</code>为代表。该路线认为机器人数据与互联网数据存在领域差异，直接继承可能并非最优。<code>Octo</code>设计了一个轻量级的、可扩展的Transformer架构，在专门整合的大规模机器人数据集<code>Open X-Embodiment (OXE)</code>上进行预训练。它证明了即使参数量较小，一个在多样化机器人数据上训练的专用模型也能达到与大型VLA相当的性能。</li>\n</ul>\n<p>此外，如何处理不同机器人（异构体）的数据成为关键。<code>HPT</code>等工作通过设计独立的编码器将不同机器人的本体信息和视觉特征映射到统一的表示空间，实现了主干网络的共享。</p>\n<h4>2.3 快速发展阶段（2024年中至今）</h4>\n<p>进入2024年，研究的焦点转向解决VLA模型在泛化性、长时序任务处理和推理效率方面的深层问题。</p>\n<ul>\n<li>\n<p><strong>分层架构</strong> ：单层VLA模型难以同时兼顾高级别长时序规划和低级别高频控制。因此，分层架构成为主流。这种架构通常包含：</p>\n</li>\n<li>\n<p><strong>System 2（规划层）</strong>：一个大型VLM，负责理解复杂指令、进行场景推理和任务分解，输出子任务目标。</p>\n</li>\n<li>\n<p><strong>System 1（执行层）</strong>：一个轻量级、快速的VLA模型，负责接收子任务指令并生成高频、精确的动作。 这种「思考」与「行动」分离的设计，既发挥了大模型的规划能力，又保证了机器人控制的实时性。</p>\n</li>\n<li>\n<p><strong>联合训练与思维链</strong>：为了解决VLM权重在机器人数据上微调时发生的「灾难性遗忘」问题，研究者开始采用<strong>跨域联合训练</strong>，即将互联网图文数据与机器人轨迹数据混合训练，以保持模型的通用知识。同时，通过构建<strong>思维链（CoT）</strong> 数据，让模型在输出动作前先生成推理步骤（如任务分解、目标识别），可以显著增强其对任务的理解和泛化能力。</p>\n</li>\n<li><strong>多模态融合与效率优化</strong>：研究开始探索融合更多维度的传感器信息，如3D点云、触觉和力反馈，以增强模型对物理世界的感知，尤其是在精细操作任务中。同时，为了解决VLA模型在端侧部署的实时性问题，模型量化（<code>BitVLA</code>）、高效推理架构（<code>RoboMamba</code>）和推理时优化（<code>FAST ECoT</code>）等方向也获得了广泛关注。</li>\n</ul>"
    },
    {
      "title": "三、VLA模型架构剖析",
      "body_html": "<p>当前主流的VLA模型在结构上可以统一为三个核心部分：观测编码、特征推理和动作解码。此外，分层系统作为一种新兴的宏观架构，也值得单独讨论。</p>\n<p><img alt=\"\" src=\"https://pic2.zhimg.com/v2-dd68f5c0ce39614fb8b5fc4a57b9542b_1440w.jpg\" /></p>\n<h4>3.1 观测编码（Observation Encoder）</h4>\n<p>观测编码器的作用是将来自不同传感器的原始数据和自然语言指令转换为模型可以处理的统一特征表示（Tokens）。</p>\n<p><img alt=\"\" src=\"https://pica.zhimg.com/v2-7d6992e084d622d9959176e8acf7e37c_1440w.jpg\" /></p>\n<ul>\n<li>\n<p><strong>视觉编码</strong>：</p>\n</li>\n<li>\n<p><strong>2D图像</strong>：这是VLA模型最主要的视觉输入。编码器经历了从<strong>CNN</strong>（如ResNet, EfficientNet）到<strong>Vision Transformer (ViT)</strong> 的转变。ViT因其更好的可扩展性和对全局信息的捕捉能力而成为主流。目前，使用在海量图文数据上预训练的ViT（如DINOv2, SigLIP）或直接采用VLM的视觉编码器（如PaliGemma）已成为标准做法，这能为模型注入强大的视觉先验知识。</p>\n</li>\n<li>\n<p><strong>3D空间信息</strong>：2D图像缺乏深度信息，限制了机器人在精细操作中的空间感知能力。为了弥补这一点，研究者探索了多种路径：</p>\n</li>\n<li>\n<p><strong>直接编码3D数据</strong>：如<code>PointVLA</code>直接处理点云数据，但面临高质量3D数据稀缺和与2D/语言模态对齐困难的问题。</p>\n</li>\n<li>\n<p><strong>2D辅助3D理解</strong>：如<code>SpatialVLA</code>通过引入3D位置编码与2D特征融合；<code>OG-VLA</code>则将3D点云投影为多视角2D图像，再利用成熟的2D编码器进行处理。这种间接方式在当前数据条件下似乎更具可行性。</p>\n</li>\n<li>\n<p><strong>其他模态编码</strong>：</p>\n</li>\n<li>\n<p><strong>语言</strong>：通常使用预训练的语言编码器（如T5 Encoder）或字节对编码器（BPE）进行处理。</p>\n</li>\n<li><strong>本体感受（Proprioception）</strong>：机器人的关节角度、速度等自身状态信息，通常通过简单的线性层或多层感知机（MLP）编码。</li>\n<li><strong>触觉与力觉</strong>：在接触丰富的任务中至关重要。<code>ForceVLA</code>使用线性层编码六维力/力矩信号；<code>VTLA</code>则利用预训练的视觉编码器处理视触觉传感器产生的图像数据。这些模T态的引入显著提升了精细操作能力，但其标准化和数据采集仍是巨大挑战。</li>\n</ul>\n<h4>3.2 特征推理（Feature Reasoning Backbone）</h4>\n<p>推理主干网络负责融合来自不同模态和不同时间步的特征，并进行时序推理，以生成用于决策的上下文表示。</p>\n<p><img alt=\"\" src=\"https://picx.zhimg.com/v2-c0418976c1fc8198bb87de4e13abea0f_1440w.jpg\" /></p>\n<ul>\n<li><strong>Transformer</strong>：凭借其强大的序列建模能力和可扩展性，标准Transformer是VLA模型最常用的主干。</li>\n<li><strong>Diffusion Transformer (DiT)</strong> ：标准Transformer在建模确定性映射时，容易对多模态的动作数据（即同一场景下有多种可行操作）产生「平均效应」，生成不可行的动作。DiT结合了扩散模型的生成能力和Transformer的序列处理能力，能更好地建模复杂的动作分布，在<code>RDT</code>等双臂操作任务中取得了良好效果。</li>\n<li><strong>混合专家模型（Mixture of Experts, MoE）</strong>：当使用图文数据和机器人数据进行联合训练时，不同任务间会产生参数竞争。MoE通过为不同任务或样本动态分配不同的「专家」网络（通常是FFN层），可以在扩大模型容量的同时，有效减少任务间的干扰，缓解「灾难性遗忘」。<code>ChatVLA</code>系列工作是该方向的代表。</li>\n<li><strong>状态空间模型（State Space Models, SSMs）</strong>：以<code>Mamba</code>为代表的SSM架构，其推理复杂度和内存消耗随序列长度呈线性增长，远优于Transformer的平方级增长。<code>RoboMamba</code>将其引入VLA，在保持强大上下文建模能力的同时，大幅提升了推理速度，为实时控制提供了新的可能。</li>\n</ul>\n<h4>3.3 动作解码（Action Decoder）</h4>\n<p>动作解码器将推理主干输出的特征转换为机器人可以执行的动作指令。动作的表示方式和解码机制是决定控制精度和流畅性的关键。</p>\n<p><img alt=\"\" src=\"https://pic3.zhimg.com/v2-b23041de9454cf22ee9e00f39327ce4a_1440w.jpg\" /></p>\n<ul>\n<li>\n<p><strong>动作空间</strong>：</p>\n</li>\n<li>\n<p><strong>末端执行器空间（End-Effector Space）</strong>：预测机械臂末端相对于当前位置的位姿变化。该空间与机器人具体形态解耦，有利于跨机器人平台的数据共享和模型泛化。</p>\n</li>\n<li>\n<p><strong>关节空间（Joint Space）</strong>：直接预测每个关节的目标角度。该方式更直接，无需逆运动学求解，但与机器人形态强相关，泛化性较差。</p>\n</li>\n<li>\n<p><strong>动作分布建模</strong>：</p>\n</li>\n<li>\n<p><strong>离散动作</strong>：将连续的动作空间离散化为有限个「动作词汇」。</p>\n</li>\n<li>\n<p><strong>优点</strong>：与LLM的自回归生成范式天然契合，训练速度快。</p>\n</li>\n<li><strong>缺点</strong>：存在量化误差，影响控制精度。</li>\n<li>\n<p><strong>方法</strong>：从简单的均匀分箱，到基于数据分布的自适应网格（<code>SpatialVLA</code>）、k-means聚类（<code>BeT</code>）、矢量量化（<code>VQ-BeT</code>），再到利用时频变换进行信息压缩的<code>FAST</code>，离散化技术正变得越来越精细。</p>\n</li>\n<li>\n<p><strong>连续动作</strong>：直接预测连续的动作值。</p>\n</li>\n<li>\n<p><strong>优点</strong>：控制精度高，动作平滑。</p>\n</li>\n<li><strong>缺点</strong>：训练较慢，且在面对多模态数据时，简单的确定性回归（如用MLP直接预测）会失效。</li>\n<li><strong>方法</strong>：为了建模多模态性，<code>ACT</code>使用CVAE，而<code>Diffusion Policy</code>、<code>RDT</code>和<code>π-0</code>等工作则广泛采用扩散模型或流匹配（Flow Matching）模型，通过生成式方法来预测动作分布。</li>\n</ul>\n<p>目前，结合离散和连续动作优点的混合方法（<code>HybridVLA</code>），以及在训练时使用离散动作加速收敛、在推理时使用连续动作保证精度的联合训练机制，也成为新的研究趋势。</p>\n<h4>3.4 分层系统（Hierarchical System）</h4>\n<p>如前所述，分层系统将VLA任务分解为高级规划和低级控制，是处理长时序、复杂任务的有效宏观架构。</p>\n<p><img alt=\"\" src=\"https://pic4.zhimg.com/v2-03177e5eba947e14be1666b895e6ef25_1440w.jpg\" /></p>\n<p>其核心在于<strong>层间通信原语（Communication Primitives）</strong>的设计：</p>\n<ul>\n<li><strong>文本语言</strong>：上层VLM生成自然语言形式的子任务指令（如「拿起红色的苹果」），传递给下层VLA。这种方式可解释性强，但可能丢失连续信息。</li>\n<li><strong>动作轨迹</strong>：上层模型生成一个稀疏、长时域的末端轨迹，下层模型负责生成密集、高频的动作来精细地跟随该轨迹。</li>\n<li><strong>隐特征向量（Latent Features）</strong>：上层模型的输出是一个或多个特征向量，作为条件输入到下层模型。这种方式可以传递更丰富的信息，并允许端到端的梯度传播。</li>\n</ul>"
    },
    {
      "title": "四、训练数据与预训练方法",
      "body_html": "<p>数据是驱动VLA模型能力提升的核心燃料。与LLM/VLM依赖海量互联网数据不同，VLA的训练数据生态更为复杂和分层。</p>\n<h4>4.1 VLA训练数据金字塔</h4>\n<p>英伟达的研究人员提出了一个形象的「数据金字塔」概念，清晰地展示了VLA模型所需的数据类型。</p>\n<p><img alt=\"\" src=\"https://pic4.zhimg.com/v2-78aab46627d2d7e5a2a71f80e08ed435_1440w.jpg\" /></p>\n<ul>\n<li>\n<p><strong>金字塔底层：互联网图文数据</strong>（规模：10B+）</p>\n</li>\n<li>\n<p><strong>来源</strong>：COCO, LAION, WebLI等。</p>\n</li>\n<li>\n<p><strong>作用</strong>：为VLA提供通用的世界知识、物体识别和场景理解能力。这是模型视觉泛化能力的基础。</p>\n</li>\n<li>\n<p><strong>金字塔中层：人类活动视频数据</strong>（规模：1M+ 小时）</p>\n</li>\n<li>\n<p><strong>来源</strong>：Ego-4D, EPIC-KITCHENS等。</p>\n</li>\n<li>\n<p><strong>作用</strong>：提供关于物理世界动态、物体交互方式和任务执行流程的先验知识。虽然没有机器人动作标签，但可以通过自监督学习潜在动作（<code>LAPA</code>, <code>GO-1</code>）或视频预测辅助任务（<code>GR-1</code>）来利用。</p>\n</li>\n<li>\n<p><strong>金字塔上层：仿真机器人数据</strong>（规模：1M+ 轨迹）</p>\n</li>\n<li>\n<p><strong>来源</strong>：RoboCasa, SynGrasp-1B等仿真环境。</p>\n</li>\n<li>\n<p><strong>作用</strong>：以低成本、大规模地生成带有精确动作标签的机器人轨迹数据，用于训练模型的基本操作能力和应对多样化的场景。</p>\n</li>\n<li>\n<p><strong>金字塔顶尖：真实机器人数据</strong>（规模：100K+ 轨迹）</p>\n</li>\n<li>\n<p><strong>来源</strong>：OXE, DROID, RT-1等真实机器人采集数据集。</p>\n</li>\n<li><strong>作用</strong>：这是质量最高、也最宝贵的数据。它用于弥合仿真与现实的差距（Sim-to-Real），并使模型适应真实世界的物理动力学和视觉特性。</li>\n</ul>\n<h4>4.2 VLA预训练方法</h4>\n<p>如何有效利用这些多层次的数据，是VLA预训练方法研究的核心。</p>\n<ul>\n<li><strong>单一领域数据训练</strong>：仅使用机器人轨迹数据（主要是仿真和真实数据）进行训练。这种方法简单直接，但由于数据规模和多样性的限制，模型的泛化能力通常较差。</li>\n<li>\n<p><strong>跨域分阶段训练</strong>：这是目前非常主流的方法吗，<code>RT-2</code>、<code>OpenVLA</code>和<code>GR-1</code>等都遵循此范式。</p>\n</li>\n<li>\n<p><strong>第一阶段</strong>：在金字塔底层或中层数据（图文/视频）上进行大规模预训练，或者直接继承一个预训练好的LLM/VLM权重。</p>\n</li>\n<li>\n<p><strong>第二阶段</strong>：在金字塔上层和顶层数据（机器人轨迹）上进行微调，将通用知识对齐到机器人操作任务上。</p>\n</li>\n<li>\n<p><strong>跨域数据联合训练</strong>：为了缓解分阶段训练中可能出现的「灾难性遗忘」问题，该方法将不同来源的数据（如VQA、目标检测、机器人轨迹）混合在一起，进行联合训练。这迫使模型在不同任务间共享知识，有助于保持和提升泛化能力。近期如<code>π-0.5</code>等工作表明，精心设计的数据混合策略能显著提升模型性能。</p>\n</li>\n<li><strong>思维链（CoT）增强</strong>：该方法不仅仅是使用数据，更是创造和利用「高质量」的数据。通过为机器人轨迹数据标注中间的推理步骤（如<code>首先，我需要找到杯子。杯子在桌子中间。然后，我需要规划一个抓取姿态…</code>），并让模型在训练时同时学习预测这些推理过程和最终的动作。<code>ECoT</code>、<code>DiVLA</code>等工作证明，这种方式可以激发模型的规划和推理能力，减少「肌肉记忆」式的行为，从而提升对新任务的泛化能力。</li>\n</ul>"
    },
    {
      "title": "五、后训练与评估",
      "body_html": "<p>一个预训练好的VLA模型只是拥有了「基础智能」。要使其在特定场景下表现出色，并能持续进化，后训练和评估是必不可少的环节。</p>\n<h4>5.1 后训练方法</h4>\n<p>后训练的目标是使通用模型快速适应特定的下游任务或机器人平台。</p>\n<ul>\n<li><strong>监督微调（SFT）</strong> ：这是最直接和常用的方法。通过人工遥操作采集少量针对特定任务的专家演示数据，然后在预训练模型的基础上进行微调。SFT简单高效，但其性能上限受限于演示数据的质量和一致性，并且存在模仿学习固有的复合误差问题。</li>\n<li>\n<p><strong>强化微调（RFT）</strong> ：强化学习允许模型通过与环境的直接交互和试错来超越演示数据，学习到更优的策略。</p>\n</li>\n<li>\n<p><strong>潜力</strong>：可以突破模仿学习的性能瓶颈，提升策略的鲁棒性和成功率。</p>\n</li>\n<li>\n<p><strong>挑战</strong>：在真实世界中应用RL面临样本效率低、奖励函数设计困难、安全性问题等巨大挑战。尽管挑战重重，但<code>VLA-RL</code>、<code>GRAPE</code>等工作已开始探索如何将RL（尤其是在线RL和偏好学习）有效地用于VLA后训练，并展现出巨大潜力。</p>\n</li>\n<li>\n<p><strong>推理时扩展</strong>：这类方法在不改变模型权重的情况下，在推理（测试）阶段提升性能。例如，<code>V-GPS</code>在推理时采样多个候选动作序列，然后使用一个预训练的值函数来评估并选择最优的动作执行。这种方法灵活且模型无关，但其效果依赖于预训练模型的初始能力和评估模块的准确性。</p>\n</li>\n</ul>\n<h4>5.2 模型评估体系</h4>\n<p>如何科学、全面地评估一个VLA模型的性能，是指导领域发展方向的关键。</p>\n<ul>\n<li><strong>真实环境评估</strong>：这是评估的「黄金标准」，最能反映模型的实际应用能力。评估指标通常是任务成功率，并区分<strong>分布内（In-Distribution）</strong> 任务（与训练数据相似）和<strong>分布外（Out-of-Distribution）</strong> 任务（新物体、新场景）以测试泛化能力。标准化基准如<code>FMB</code>和自动化评估系统<code>AutoEval</code>的出现，正在努力解决真实评测成本高、可复现性差的问题。</li>\n<li>\n<p><strong>仿真器评估</strong>：仿真器提供了可控、可复现、低成本的大规模评估环境。</p>\n</li>\n<li>\n<p><strong>早期基准</strong>：如RLBench, Meta-World，主要关注控制能力。</p>\n</li>\n<li><strong>现代基准</strong>：如<code>CALVIN</code>、<code>LIBERO</code>，引入了语言指令和长时序任务，更适合评估VLA模型。<code>SimplerEnv</code>则致力于缩小仿真与现实的差距（Sim-to-Real Gap）。许多论文都会在这些公开基准上报告性能，以便进行横向对比（如下表所示）。</li>\n</ul>\n<p><img alt=\"\" src=\"https://pic3.zhimg.com/v2-abd1acf18388ce57b4a33701badfc54e_1440w.jpg\" /></p>\n<ul>\n<li><strong>世界模型评估</strong>：这是一个前沿方向。通过训练一个生成式模型（通常是视频生成模型）来模拟物理世界的动态，即构建一个「世界模型」（World Model）。然后，可以在这个数据驱动的世界模型中评估VLA策略，其渲染和物理动态可能比传统仿真器更逼真。<code>WorldEval</code>等工作已证明，基于世界模型的评估结果与真实环境评测结果具有较强的相关性，但该技术本身仍处于早期发展阶段。</li>\n</ul>"
    }
  ],
  "latest_overview": [
    {
      "title": "",
      "body_html": "<h1>迈向通用具身人工智能：VLA智体的世界模型综述</h1>\n<ul>\n<li>来源平台: <strong>zhihu</strong>（知乎专栏文章）</li>\n<li>原文链接: <a href=\"https://zhuanlan.zhihu.com/p/2029851015126689488\">https://zhuanlan.zhihu.com/p/2029851015126689488</a></li>\n<li>作者: -</li>\n<li>发表日期: -</li>\n</ul>\n<hr />\n<p>迈向通用具身人工智能：VLA智体的世界模型综述</p>\n<h1>迈向通用具身人工智能：VLA智体的世界模型综述</h1>\n<p>作者: 黄浴, 赞: 9</p>\n<p>26年1月来自同济大学和电子科技大学（成都）的论文“Towards Generalist Embodied AI: A Survey on World Models for VLA Agents”。</p>\n<p>视觉-语言-动作（VLA）模型是迈向通用具身人工智能的关键里程碑。然而，它们通常难以精确捕捉物理动态、验证计划的可执行性以及克服数据稀缺性。为了解决这些局限性，世界模型被引入作为未来预测器，它融合了丰富的物理先验信息，能够有效地引导VLA智体生成基于物理原理的动作。尽管这一范式正逐渐成为一个重要的研究方向，但目前该领域缺乏系统的综述。因此，本文专门针对VLA智体的世界模型进行综述。其提出一个统一的分类体系，将现有方法归纳为四种范式：世界规划器、世界动作模型、世界合成器和世界模拟器，并回顾它们各自的发展轨迹。此外，还总结基础模型、基准测试和评估指标的生态系统，以支持未来的研究。最后，重点介绍促进通用 VLA 智体世界模型发展的关键挑战和有前景的方向。</p>\n<hr />\n<p>近年来，通用具身智体的发展方向已转向视觉-语言-动作（VLA）架构[Ma et al., 2024]，这是迈向通用人工智能（AGI）的关键里程碑。与局限于特定任务和场景的传统视觉策略不同，VLA智体集成大语言模型（LLM）[Touvron et al., 2023]及其多模态变体，以利用互联网规模的知识，并将高层语义指令与底层控制策略相结合。这种语义基础使得机器人能够遵循开放式指令并在开放世界环境中进行泛化。</p>\n<p>虽然LLM作为离散世界模型赋予VLA智体以文本为中心的推理能力，但由于离散文本生成的限制，它们难以捕捉连续的物理动态。为了克服这一局限性，具身世界模型[Liu et al., 2024]通过预测连续的未来状态来模拟复杂环境的时空演化。因此，这些模型可作为高效的预测合成模拟器[Liao et al., 2025; Guo et al., 2025b]和可执行行动规划的基础模型[Wu et al., 2024; Cen et al., 2025b]。</p>\n<p><strong>定义：面向VLA的世界模型</strong>。该方向旨在将世界模型视为通用的未来预测器，以促进通用型VLA智体的发展[Zitkovich et al., 2023]。该定义将其与传统范式区分开来：面向政策的世界模型[Hafner et al., 2025]通过预测性环境模拟建立一个通用的决策框架，而面向机器人操作的世界模型[Zhang et al., 2025c]则将该范式专门用于处理接触密集型操作任务。不同之处在于，该主题将研究重点转移到大规模基础模型，以可扩展的世界动态和VLA智体为中心，旨在建立一个超越孤立技能的具身智能通用框架。</p>\n<p>如图1所示VLA智体的世界模型概览：该集成赋予VLA智体高保真度模拟、长期预测和可扩展数据生成的能力。</p>\n<p><img alt=\"\" src=\"https://pic2.zhimg.com/v2-96e34d875fb0b9f034c44722c3632155_1440w.jpg\" /></p>\n<p>为何需要面向VLA的世界模型？尽管VLA模型在任务泛化方面表现出色，但它们在实际部署中面临着显著的不足。首先，它们存在“物理幻觉”问题，即生成的动作缺乏物理基础。其次，尽管LLM能够提供长远规划，但它们本身无法验证抽象策略的物理可执行性。最后，高质量机器人数据的稀缺以及现实世界强化学习中固有的安全风险严重限制了泛化能力。世界模型可以通过模拟物理后果来验证规划的可行性，并实现可扩展训练的安全模拟，从而缓解这些问题。</p>\n<p>VLA智体的世界模型分为四种范式：世界规划器、世界动作模型、世界合成器和世界模拟器。早期发展主要集中在规划器和动作模型上，以增强推理和控制能力。近年来，随着视频生成模型的兴起，研究方向转向合成器和模拟器。这些新兴范式利用高保真视频合成技术生成可扩展的模仿学习数据，并为强化学习提供安全的环境，从而有效缓解数据稀缺和安全限制。</p>\n<p>如图 2 所示VLA智体的世界模型分类。时间线展现从2023年的初步探索到2025年的爆发式增长的演变过程。这种快速增长，尤其体现在世界模拟器和世界合成器领域，得益于生成模型的快速发展。</p>\n<p><img alt=\"\" src=\"https://pic1.zhimg.com/v2-f548bb25b970c4329a8b50c331072210_1440w.jpg\" /></p>\n<hr />\n<p>采用一种统一的分类法来组织VLA智体的世界模型，将现有方法分为四种范式（如图3 所示）：世界行动模型、世界规划器、世界合成器和世界模拟器。为了简洁起见，省略历史和文本指令的显式符号，假设世界模型W_φ和VLA模型π_θ隐式地依赖于它们。</p>\n<p><img alt=\"\" src=\"https://pic1.zhimg.com/v2-60495ef346444b2afcd8c382ff838fa0_1440w.jpg\" /></p>\n<h2>世界规划器</h2>\n<p><strong>定义</strong>。该范式采用世界模型W_φ作为前向动力学模型，以显式未来观测或潜特征的形式合成未来指导，从而为策略π_θ提供语义条件。</p>\n<p><strong>演化</strong>。与缺乏物理预测能力的标准多模态大语言模型（MLLM）不同，世界模型作为规划器，确保动作基于预测的物理动力学，而不仅仅是语义关联（如表1 所示）。一些研究将规划视为高保真视频生成任务。例如，UniPi [Du et al., 2023]、SuSIE [Black et al., 2023]、GR-MG [Li et al., 2025b]、Vidar [Feng et al., 2025]、3D-VLA [Zhen et al., 2024] 和 FLIP [Gao et al., 2025] 利用图像/视频扩散模型合成像素级的未来状态，然后由逆动力学模型 π_θ (a_t+1 | z_t, z_t+1) 处理这些状态以生成动作。为了减轻像素级合成中与动态无关的视觉细节（例如光照和纹理）的干扰，后续研究，例如 V-JEPA 2 [Assran，2025] 和 PIVOT-R [Zhang，2024]，转向无需重建图像的隐规划。这些方法利用表征模型直接在潜空间中预测未来状态，从而促进动作的推导。</p>\n<p><img alt=\"\" src=\"https://pic4.zhimg.com/v2-292cdf18c3dfa059748b16442218b37d_1440w.jpg\" /></p>\n<p>尽管隐式建模已成为一种趋势，但视频扩散模型（VDM）凭借其捕捉复杂世界动态的卓越能力，仍然是主流的骨干模型，能够提供丰富的潜在信号用于策略规划。与早期依赖显式图像重建来导出动作的方法不同，当前的方法将像素级合成视为一项智体任务，旨在从去噪过程中提取世界动态信息，并利用潜特征来指导策略。具体而言，VPP [Hu et al., 2025]、MinD [Chi et al., 2025]、TriVLA [Liu et al., 2025] 和 Genie Envisioner [Liao et al., 2025] 都利用这种潜嵌入来约束基于扩散的策略。GO-1 [Team, 2025a] 的离散潜表示进一步增强这种范式的可扩展性。这种演进催生诸如 MoWM [Shang et al., 2025] 之类的混合基础架构，它结合不同的动态先验来简化动作推导过程。总体而言，这一趋势标志着从基于 MLLM 的离散规划向世界模型的转变，后者利用学习的动态信息作为主动规划器来处理复杂任务。</p>\n<h2>世界动作模型</h2>\n<p><strong>定义</strong>。该范式采用生成式建模来近似未来观测和动作的联合分布，并基于给定的上下文预测视觉和控制的耦合动态。</p>\n<p><strong>演化</strong>。世界动作模型将图像预测和动作生成整合到一个统一的框架中，并纳入环境动态信息，为策略提供物理基础（如表2 所示）。通过构建未来观测和动作的联合分布模型，该模型确保动作在语义上保持一致且在物理上受到约束，从而在长期任务中保持时空一致性。</p>\n<p><img alt=\"\" src=\"https://pic2.zhimg.com/v2-6958413611bb144855401c6c57bcafb7_1440w.jpg\" /></p>\n<p>得益于多模态大语言模型（MLLM）的可扩展性，自回归范式最初是世界动作建模的基础方法。GR-1 [Wu et al., 2024]、HMA [Wang et al., 2025b]、UniVLA [Wang et al., 2025c] 和 GR-2 [Cheang et al., 2024] 等开创性工作利用大规模视频预训练来对物理动态进行时间建模。 WorldVLA [Cen et al., 2025b]、RynnVLA-002 [Cen et al., 2025a] 和 UP-VLA [Zhang et al., 2025b] 将动作和观测结果整合到一个统一的token流中，通过端到端的序列建模确保具身一致性。为了强化物理基础，Seer [Tian et al., 2025]、F1 [Lv et al., 2025]、GR-MG [Li et al., 2025b] 和 PAR [Song et al., 2025] 直接利用预测性前瞻来指导基于预想未来状态的动作执行。此外，诸如FlowVLA [Zhong et al., 2025] 和CoT-VLA [Zhao et al., 2025] 等推理增强方法采用多模态思维链来构建决策过程。DreamVLA [Zhang et al., 2025d] 利用包括深度和语义在内的多模态世界知识预测来增强物理推理能力。</p>\n<p>虽然自回归多模态建模有效，但它们本质上受到量化损失和多步复合误差的限制，这促使研究重点转向基于扩散的世界动作模型。离散扩散框架，例如 UD-VLA [Chen et al., 2025] 和 dVLA [Wen et al., 2025]，集成迭代细化以提高token生成质量；而实-值方法，例如 DUST [Won et al., 2025] 和 FLARE [Zheng et al., 2025]，则利用联合扩散机制实现高精度控制，有效缓解动作离散化带来的信息损失。总体而言，这种演进方向是联合环境-动作建模，利用学习的动力学来增强动作生成的物理基础。</p>\n<h2>世界合成器</h2>\n<p><strong>定义</strong>：该范式通过联合生成器 G_θ,φ 合成交错的观测-动作轨迹 τˆ，构建可扩展的数据引擎，以支持模仿学习。</p>\n<p>G_θ,φ 根据条件依赖结构进行分解：（i）动作条件：G_θ,φ = W_φ (oˆ_t+1 | oˆ_t , a_t) π_θ (a_t+1 | oˆ_t+1)，根据展开策略 π_θ 中的动作预测观测值；（ii）无动作：G_θ,φ = W_φ (oˆ_t+1 | oˆ_t) I_ψ (a_t+1 | oˆ_t, oˆ_t+1)，其中逆动力学 I_ψ 从 W_φ 生成的视觉轨迹推断动作。</p>\n<p><strong>演化</strong>。世界模型正在演化为可扩展的策略学习数据引擎（如表 3）。例如，Wrist-World [Qian et al., 2025] 专注于使用手腕视图增强现有视图，以实现以自我为中心的预测。其他框架旨在合成交错的观测-行动轨迹，以克服数据稀缺性并扩展VLA（超大规模阵列）的能力。具体而言，Genie Envisioner [Liao et al., 2025] 和 Ctrl-World [Guo et al., 2025b] 采用基于特定行动序列的行动条件世界模型来展开未来观测。相比之下，DreamGen [Jang et al., 2025] 和 GigaWorld-0 [Team, 2025b] 首先合成视觉轨迹，然后通过逆动力学推断潜在的行动。</p>\n<p><img alt=\"\" src=\"https://pic3.zhimg.com/v2-004cf38ca5a894da33a2879ffaf7bc62_1440w.jpg\" /></p>\n<h2>世界模拟器</h2>\n<p><strong>定义</strong>。该范式使用行动条件世界模型 W_φ 作为虚拟模拟器来生成合成的未来状态。通过与外部奖励评估器集成，它可以通过优化对预期结果的预期奖励来改进策略。</p>\n<p><strong>演进</strong>。世界模型越来越多地作为交互式虚拟环境运行，以支持闭环策略改进和验证，从而克服现实世界中的限制，例如强化学习中的数据稀缺和运行风险（如表 4 所示）。一种研究方向是将世界模型仅用作评估器，以评估 VLA 模型。例如，WorldGym [Quevedo，2025] 和 Genie Envisioner [Liao，2025] 采用动作条件视频生成技术来自动评估任务成功率。</p>\n<p><img alt=\"\" src=\"https://pic1.zhimg.com/v2-e36d880ca6bdf11fb26fa6b18b93a04a_1440w.jpg\" /></p>\n<p>除了静态评估之外，世界模型还可以作为训练模拟器，为策略改进提供合成反馈。反馈机制已经从 World4RL [Jiang et al., 2025] 的稀疏结果监督发展到 World-Env [Xiao et al., 2025] 和 SRPO [Fei et al., 2025] 中更密集的指导，它们利用逐步奖励或潜距离优化。此外，NORA-1.5 [Hung et al., 2025] 通过在 DPO [Rafailov et al., 2023] 框架内整合 V-JEPA 2 [Assran et al., 2025] 特征，进一步增强了对齐效果。为了解决物理合理性问题，包括WMPO [Zhu et al., 2025]、VLA-RFT [Li et al., 2025a] 和 RoboScape-R [Tang et al., 2025] 在内的多种方法都采用了GRPO [Shao et al., 2024] 来确保轨迹一致性。在此基础上，Prophet [Zhang et al., 2025a] 引入流-动作-GRPO 来优化奖励分配。最后，世界模型支持测试-时自适应，例如VLA-Reasoner [Guo et al., 2025a] 中的MCTS规划或AdaPower [Huang et al., 2025] 中的测试-时训练，从而使模型能够通过动态更新来优化决策。总之，世界模型为自主改进提供了一条安全且可扩展的途径，是未来具身智体发展的重要基础。</p>\n<hr />\n<p>将VLA智体世界模型的基础架构分为三种范式：图像/视频生成模型、统一理解与生成模型以及表征模型（如表5 所示）。</p>\n<p><img alt=\"\" src=\"https://picx.zhimg.com/v2-25784dbe6ab975bdc4f53e0be58f3a97_1440w.jpg\" /></p>\n<p><strong>图像/视频生成模型</strong>（例如，WAN2.1 [Wang et al., 2025a]、稳定视频扩散模型 [Blattmann et al., 2023]）作为想象引擎，能够模拟文本、图像或动作条件下的未来视频演化。这些模型涵盖从轻量级（0.6B）到标准规模（2B）的各种类型，能够捕捉复杂的物理动态以生成可控的视频。</p>\n<p><strong>统一理解与生成模型</strong>（例如，Emu3 [Wang et al., 2024]）将感知和生成集成在一个框架内。与仅限于文本输出的标准多模态大语言模型不同，它们原生支持图像生成，从而能够进行指令推理和多模态任务的视觉生成规划。</p>\n<p><strong>表征模型</strong>将感觉输入编码成紧凑、可迁移的状态表征，而不是生成像素。通过提取必要的结构和时间特征，诸如 V-JEPA 2 [Assran，2025] 等方法显著提高样本效率和鲁棒性。</p>\n<hr />\n<p>将用于VLA智体世界模型的评估指标分为四类：视频生成质量、光流精度、机器人任务和基准指标（如表8所示）。</p>\n<p><img alt=\"\" src=\"https://pica.zhimg.com/v2-0a15597dd3bae3fa6b94008a1dd5c272_1440w.jpg\" /></p>\n<p>视频生成质量指标通过结合低级重建保真度（例如，PSNR、SSIM）和高级感知真实性（例如，LPIPS、FVD）来评估生成的视频。这些指标量化了从像素级误差到深度特征距离的性能，作为模型合成合理且连贯的未来状态能力的基本验证。</p>\n<p>光流精度指标通过结合时间运动一致性和空间轨迹精度（例如，ADE、EPE）来衡量生成的动态。这些指标通过量化从瞬时光流误差到累积轨迹偏差的性能，确保动态场景所需的物理一致性。</p>\n<p>机器人任务指标通过结合二元目标达成情况（例如，成功率）和持续执行进度（例如，平均任务进度）来评估 VLA 的性能。这些指标衡量策略的执行结果，以验证世界模型对机器人成功执行动作的贡献程度。</p>\n<p>基准指标通过结合整体生成质量和控制精度来关注模型的整体能力。这些框架整合了从基本物理一致性到复杂语义对齐等一系列评估，从而建立了一个统一的标准来评估模型在各种场景下的泛化能力。</p>\n<hr />\n<p>为了系统地评估VLA智体中的世界模型，将现有基准测试分为仿真环境和真实世界数据集（如表9 所示）。</p>\n<p><img alt=\"\" src=\"https://pic1.zhimg.com/v2-3260e688f49c985a46203d46497c3636_1440w.jpg\" /></p>\n<p>仿真与真实世界。这些环境之间的区别决定了世界模型评估的范围。仿真提供了一个可控且可扩展的环境，适合评估世界规划器和世界行动模型的决策能力。然而，对于世界合成器或模拟器而言，仿真并不足够。由于这些生成式范式致力于缓解真实世界数据的匮乏以及机器人探索的安全风险，因此它们的验证需要真实世界的视觉真实性和动态性，以确保能够模拟高保真、物理上一致的未来场景。</p>\n<p>时间跨度。任务持续时间决定了世界模型所需的预测稳定性。像Meta-World这样的基准测试侧重于原子性的、短时间跨度的任务，足以学习即时的物理规律。相比之下，LIBERO和Droid则针对涉及多阶段操作的长时间跨度场景。这些挑战要求世界模型在较长的时间范围内保持时间一致性和因果推理能力。</p>\n<p>环境泛化能力。空间复杂性以及场景、物体和任务的多样性是评估世界模型鲁棒性的主要指标。基准测试涵盖了从结构化的桌面环境到杂乱的室内环境。为了弥合现实差距，最新的数据集优先考虑多样化的资源库和任务分布，而非原始轨迹体，这要求世界模型能够在分布范围之外的场景中进行泛化。</p>\n<p>仿真基准测试的性能。如表 6 和表 7 所示，当前用于 VLA 智体的世界模型在 LIBERO 和 CALVIN ABC → D 基准测试中已接近饱和。值得注意的是，性能最佳的方法，例如 SRPO（在线）和 DreamVLA，分别实现 99.2% 的成功率和 4.44 的平均任务长度。这种高水平的熟练程度表明，这些模拟环境已不再具有足够的挑战性，无法验证现实世界物理环境中具身智能的真正复杂性。</p>\n<p><img alt=\"\" src=\"https://pica.zhimg.com/v2-234eda5396295f2f8e9d233f46a90c58_1440w.jpg\" /><img alt=\"\" src=\"https://pic2.zhimg.com/v2-dd2370255b33714ba98f8e97ec1852df_1440w.jpg\" /></p>\n<hr />\n<p>尽管近期取得一些进展，但要实现可推广且基于物理原理的世界模型，仍有几个关键挑战需要解决。</p>\n<p>物理一致性整合明确的物理约束和长时程因果推理，以抑制幻觉和累积误差。有效的缓解策略包括可微分的物理先验、因果学习和反事实推理。</p>\n<p>时空（4D）感知旨在通过将控制信号与底层三维环境演化交织在一起，超越以二维为中心的感知范式。为了捕捉长时程内的精细几何变换，研究应侧重于动态高斯溅射（GS）、持续点跟踪和神经占用场等技术。</p>\n<p>安全性和可靠性要求世界模型能够作为高保真模拟器，在物理操作发生之前预测潜在危险，同时考虑几何约束、不确定性量化和可解释性。</p>\n<p>长远预见性是指模型在扩展推理过程中始终保持对目标属性、空间关系和任务目标的正确理解的能力。潜在方法包括层级时间抽象、子目标分解和记忆增强机制。</p>\n<p>故障感知动力学旨在纠正仅依赖成功演示数据而导致的过度乐观偏差，它考虑负样本对比学习、从次优数据中离线学习以及误差诱导轨迹合成。</p>"
    }
  ],
  "graph": {
    "nodes": [
      {
        "id": "bc_z",
        "x": 2021.11,
        "y": 1,
        "category": "transformer_policy"
      },
      {
        "id": "cliport",
        "x": 2022,
        "y": 5,
        "category": "spatial_3d"
      },
      {
        "id": "saycan",
        "x": 2022.04,
        "y": 4,
        "category": "llm_planning"
      },
      {
        "id": "gato",
        "x": 2022.05,
        "y": 1,
        "category": "transformer_policy"
      },
      {
        "id": "code_as_policies",
        "x": 2022.11,
        "y": 4,
        "category": "llm_planning"
      },
      {
        "id": "rt1",
        "x": 2022.12,
        "y": 1,
        "category": "transformer_policy"
      },
      {
        "id": "palm_e",
        "x": 2023.03,
        "y": 2,
        "category": "vlm_finetune"
      },
      {
        "id": "moo",
        "x": 2023.03,
        "y": 2.3,
        "category": "vlm_finetune"
      },
      {
        "id": "rt2",
        "x": 2023.07,
        "y": 2,
        "category": "vlm_finetune"
      },
      {
        "id": "voxposer",
        "x": 2023.07,
        "y": 5,
        "category": "spatial_3d"
      },
      {
        "id": "roboagent",
        "x": 2023.09,
        "y": 3,
        "category": "diffusion_flow"
      },
      {
        "id": "rt_x",
        "x": 2023.1,
        "y": 1,
        "category": "transformer_policy"
      },
      {
        "id": "roboflamingo",
        "x": 2023.11,
        "y": 2.3,
        "category": "vlm_finetune"
      },
      {
        "id": "hpt",
        "x": 2024,
        "y": 1,
        "category": "transformer_policy"
      },
      {
        "id": "octo",
        "x": 2024.05,
        "y": 3,
        "category": "diffusion_flow"
      },
      {
        "id": "openvla",
        "x": 2024.06,
        "y": 2,
        "category": "vlm_finetune"
      },
      {
        "id": "gr1",
        "x": 2024.09,
        "y": 1,
        "category": "transformer_policy"
      },
      {
        "id": "pi0",
        "x": 2024.1,
        "y": 3,
        "category": "diffusion_flow"
      },
      {
        "id": "helix",
        "x": 2025.02,
        "y": 3,
        "category": "diffusion_flow"
      },
      {
        "id": "long_vla",
        "x": 2025.08,
        "y": 1,
        "category": "transformer_policy"
      },
      {
        "id": "groot_n2",
        "x": 2026.02,
        "y": 3,
        "category": "diffusion_flow"
      },
      {
        "id": "dfm_vla",
        "x": 2026.03,
        "y": 3.3,
        "category": "diffusion_flow"
      },
      {
        "id": "pangu_embodied",
        "x": 2025.06,
        "y": 4,
        "category": "llm_planning"
      },
      {
        "id": "gemini_robotics_er",
        "x": 2026.04,
        "y": 2,
        "category": "vlm_finetune"
      },
      {
        "id": "univla",
        "x": 2026.04,
        "y": 2.2,
        "category": "vlm_finetune"
      },
      {
        "id": "hy_embodied",
        "x": 2026.04,
        "y": 2.4,
        "category": "vlm_finetune"
      },
      {
        "id": "neurovla",
        "x": 2026.04,
        "y": 1,
        "category": "transformer_policy"
      },
      {
        "id": "pi0_7",
        "x": 2026.04,
        "y": 3.2,
        "category": "diffusion_flow"
      },
      {
        "id": "openvla2",
        "x": 2025.02,
        "y": 2,
        "category": "vlm_finetune"
      },
      {
        "id": "last_r1",
        "x": 2026.05,
        "y": 3,
        "category": "diffusion_flow"
      }
    ],
    "edges": [
      {
        "from": "bc_z",
        "to": "rt1",
        "label": "架构优化"
      },
      {
        "from": "saycan",
        "to": "code_as_policies",
        "label": "代码生成"
      },
      {
        "from": "rt1",
        "to": "rt2",
        "label": "VLM迁移"
      },
      {
        "from": "palm_e",
        "to": "moo",
        "label": "开放世界"
      },
      {
        "from": "cliport",
        "to": "voxposer",
        "label": "3D价值图"
      },
      {
        "from": "rt2",
        "to": "rt_x",
        "label": "跨形态"
      },
      {
        "from": "palm_e",
        "to": "roboflamingo",
        "label": "解耦设计"
      },
      {
        "from": "roboagent",
        "to": "octo",
        "label": "开源通用"
      },
      {
        "from": "rt2",
        "to": "openvla",
        "label": "双视觉"
      },
      {
        "from": "rt_x",
        "to": "hpt",
        "label": "异构预训练"
      },
      {
        "from": "rt_x",
        "to": "gr1",
        "label": "人形控制"
      },
      {
        "from": "octo",
        "to": "pi0",
        "label": "流匹配"
      },
      {
        "from": "pi0",
        "to": "helix",
        "label": "双系统"
      },
      {
        "from": "openvla",
        "to": "long_vla",
        "label": "长程规划"
      },
      {
        "from": "helix",
        "to": "groot_n2",
        "label": "世界模型"
      },
      {
        "from": "pi0",
        "to": "dfm_vla",
        "label": "离散流"
      },
      {
        "from": "code_as_policies",
        "to": "pangu_embodied",
        "label": "长程规划"
      },
      {
        "from": "rt2",
        "to": "gemini_robotics_er",
        "label": "具身推理"
      },
      {
        "from": "openvla",
        "to": "univla",
        "label": "原生多模态"
      },
      {
        "from": "univla",
        "to": "hy_embodied",
        "label": "MoT架构"
      },
      {
        "from": "hpt",
        "to": "neurovla",
        "label": "类脑架构"
      },
      {
        "from": "pi0",
        "to": "pi0_7",
        "label": "组合泛化"
      },
      {
        "from": "openvla",
        "to": "openvla2",
        "label": "优化微调"
      },
      {
        "from": "pi0_7",
        "to": "last_r1",
        "label": "潜在推理"
      },
      {
        "from": "rt2",
        "to": "rt_x",
        "label": "跨形态"
      }
    ],
    "milestones": [
      "rt2",
      "pi0",
      "last_r1"
    ]
  },
  "algos": [
    {
      "id": "bc_z",
      "num": 1,
      "name": "BC-Z",
      "fullName": "零样本任务泛化模仿学习 (BC-Z)",
      "year": "2021.11",
      "org": "Google/Stanford",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2202.02005",
      "projectUrl": "",
      "category": "transformer_policy",
      "motivation": "大规模模仿学习实现100+任务零样本泛化",
      "summary": "BC-Z 提出了一个大规模多任务模仿学习框架，将 100+ 机器人操作任务共享一个控制策略，并通过任务嵌入空间（Task Embedding）实现零样本泛化——训练时仅见过 72 个任务，测试时能执行 28 个全新任务，成功率可达 32%（语言指令）和 4%（视频演示）。",
      "keyPoints": [
        "构建了一个包含 100+ 机器人操作任务、25,877 条演示的大规模多任务数据集",
        "提出基于任务嵌入条件的多任务模仿学习：策略 \\<span class=\"kb-math kb-math-inline\">\\pi(a|s, z)\\</span> 以任务嵌入 \\<span class=\"kb-math kb-math-inline\">z\\</span> 为条件，而非任务 ID",
        "任务嵌入通过编码器 \\<span class=\"kb-math kb-math-inline\">q(z|w)\\</span> 从语言指令或人类视频中提取，实现跨模态任务指定",
        "采用 Hindsight Relabeling（后见重标定）和 HG-DAgger（人工引导 DAgger）高效收集高质量演示数据",
        "提出 Adaptive State-Diff 方案：根据动作幅度自适应选择未来状态计算专家动作，避免拟合噪声",
        "支持三种任务指定方式：one-hot 任务 ID、自然语言指令、人类操作视频"
      ],
      "detail": "<h5>核心框架图</h5>\n<p><img alt=\"BC-Z 系统概览\" src=\"https://ar5iv.labs.arxiv.org/html/2202.02005/assets/fig1.png\" />\n<em>图 1：BC-Z 系统概览。左：数据集组成（100+ 任务、25,877 demos、8 名操作员）。右：策略架构——任务嵌入 \\<span class=\"kb-math kb-math-inline\">z\\</span> 从语言或视频中提取，与状态拼接后输入策略网络 \\<span class=\"kb-math kb-math-inline\">\\pi(a|s, z)\\</span>。</em></p>\n<h5>动机与背景</h5>\n<p>传统机器人模仿学习面临的关键瓶颈是<strong>数据和泛化</strong>：\n- 单任务策略：每个任务需要独立收集大量演示数据，成本高昂且无法泛化\n- 多任务策略：虽然可以共享数据，但传统方法（如 one-hot 条件）无法将知识迁移到全新任务\n- 任务指定：如何让机器人理解\"未见过的任务描述\"是一个开放问题</p>\n<p>BC-Z 的核心洞察是：<strong>如果任务之间共享底层操作技能（如抓取、放置、推动），那么通过一个共享的嵌入空间，模型就能从已学任务的组合中推断出新任务的执行方式。</strong></p>\n<h5>核心机制详解</h5>\n<p><strong>1. 任务嵌入条件策略 (Task-Conditioned Policy)</strong></p>\n<p>传统多任务模仿学习使用 one-hot 任务 ID 作为条件：\n<div class=\"kb-math kb-math-display\">\\pi(a|s, \\text{task_id})</div></p>\n<p>BC-Z 改用任务嵌入作为条件：\n<div class=\"kb-math kb-math-display\">\\pi_\\theta(a|s, z), \\quad z \\sim q_\\phi(z|w)</div></p>\n<p>其中：\n- \\<span class=\"kb-math kb-math-inline\">w\\</span> 是任务指定信息（语言句子或人类操作视频）\n- \\<span class=\"kb-math kb-math-inline\">q_\\phi\\</span> 是任务编码器（Sentence-BERT 用于语言，ResNet-18 用于视频帧）\n- \\<span class=\"kb-math kb-math-inline\">z \\in \\mathbb{R}^{64}\\</span> 是共享的任务嵌入向量</p>\n<div class=\"key-point\">💡 关键：同一个策略网络 \\<span class=\"kb-math kb-math-inline\">\\pi_\\theta\\</span> 处理所有任务，任务之间的知识共享通过梯度反向传播自动进行。训练时见过的任务组合方式，使模型能在嵌入空间中\"插值\"出未见任务的行为。</div>\n<p><strong>2. Adaptive State-Diff 专家动作</strong></p>\n<p>模仿学习需要从演示数据中提取专家动作。传统方法是对相邻帧做差分（state diff）：\n<div class=\"kb-math kb-math-display\">a_t^{\\text{naive}} = s_{t+1} - s_t</div></p>\n<p>问题：噪声大、动作不平滑，尤其在演示动作幅度较小时，差分信号接近噪声。</p>\n<p>BC-Z 提出 <strong>Adaptive State-Diff</strong>：根据动作幅度自适应选择未来时间步：\n<div class=\"kb-math kb-math-display\">a_t^{\\text{adaptive}} = s_{t+N} - s_t</div></p>\n<p>其中 \\<span class=\"kb-math kb-math-inline\">N = \\max\\\\{k \\mid \\|s_{t+k} - s_t\\|_2 &lt; \\epsilon\\\\}\\</span>，即选择第一个超出阈值 \\<span class=\"kb-math kb-math-inline\">\\epsilon\\</span> 的未来状态。这样确保在慢速动作时扩大差分步长，在快速动作时缩小步长，有效抑制噪声。</p>\n<div class=\"warn-box\">⚠️ 注意：Ablation 实验表明，去掉 Adaptive State-Diff 直接使用 naive diff（N=1）会导致策略拟合噪声、动作过慢，最终成功率从 52% 降至 3%。</div>\n<p><strong>3. HG-DAgger 数据收集</strong></p>\n<p>HG-DAgger（Human-Guided DAgger）是对经典 DAgger 算法的扩展，允许人工操作员在策略执行过程中进行干预和纠正：</p>\n<ul>\n<li>策略执行时，操作员观察并通过遥操作设备进行实时干预</li>\n<li>被干预的轨迹自动标记为\"需要纠正\"并加入训练集</li>\n<li>干预次数与最终成功率呈负相关（见图 5），可用作实时性能代理指标</li>\n</ul>\n<p>实验表明，用 50% 专家演示 + 50% HG-DAgger 干预数据训练的模型，性能<strong>显著优于</strong>100% 专家演示训练的模型，说明有针对性的干预数据比均匀采样的专家数据更有价值。</p>\n<p><strong>4. Hindsight Relabeling</strong></p>\n<p>为提升数据效率，BC-Z 使用后见重标定技术：\n- 在执行轨迹中，即使最终目标未达成，中间步骤也可能完成了其他子任务\n- 例如：执行\"把瓶子放进碗里\"时，过程中可能恰好完成了\"抓起瓶子\"\n- 将这些中间步骤重标定为相应子任务的正面样本，大幅提升数据利用率</p>\n<h5>训练流程</h5>\n<pre><code class=\"language-python\"># BC-Z 训练伪代码\n# 多任务演示数据集 D = {(trajectory_i, task_desc_i)}\n\n# 1. 任务编码器 q_phi (使用预训练模型，可冻结)\n#   language: Sentence-BERT (all-mpnet-base-v2) -&gt; MLP -&gt; z in R^64\n#   video: ResNet-18 (ImageNet pretrained) -&gt; MLP -&gt; z in R^64\n\n# 2. 多任务 BC 训练循环\nfor batch in dataloader:\n    s_t, future_states, task_desc = batch\n\n    # 2.1 提取任务嵌入\n    z = task_encoder(task_desc)  # shape: [B, 64]\n\n    # 2.2 Adaptive State-Diff 计算目标动作\n    for t in range(T):\n        k = 1\n        while norm(future_states[t+k] - s_t[t]) &lt; epsilon:\n            k += 1\n        a_target[t] = future_states[t+k] - s_t[t]  # 自适应差分到第k帧\n\n    # 2.3 策略预测\n    a_pred = policy_network(concat(s_t, z))  # MLP: [S+64] -&gt; [A]\n\n    # 2.4 MSE 损失\n    loss = mean((a_pred - a_target) ** 2)\n    optimizer.step(loss)\n</code></pre>\n<h5>与传统方法的区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th>传统多任务 BC</th>\n<th>单任务 BC</th>\n<th>BC-Z</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>任务指定</td>\n<td>one-hot ID</td>\n<td>N/A</td>\n<td>语言/视频嵌入</td>\n</tr>\n<tr>\n<td>数据共享</td>\n<td>部分共享</td>\n<td>独立</td>\n<td>全部共享</td>\n</tr>\n<tr>\n<td>零样本泛化</td>\n<td>❌</td>\n<td>❌</td>\n<td>✅ (语言32%, 视频4%)</td>\n</tr>\n<tr>\n<td>数据效率</td>\n<td>中</td>\n<td>低</td>\n<td>高 (HG-DAgger + Hindsight)</td>\n</tr>\n<tr>\n<td>动作提取</td>\n<td>naive diff</td>\n<td>naive diff</td>\n<td>Adaptive State-Diff</td>\n</tr>\n</tbody>\n</table></div>\n<h5>实验结果亮点</h5>\n<ul>\n<li><strong>训练任务 21 项平均</strong>：one-hot 42%，语言 40%，视频 24%</li>\n<li><strong>零样本泛化（28 项未见任务）</strong>：语言 32%，视频 4%</li>\n<li><strong>Multi-task vs Single-task</strong>：多任务 52% vs 单任务 5%（同一任务）</li>\n<li><strong>HG-DAgger 提升</strong>：50% 干预数据优于 100% 专家数据（53% vs 27%）</li>\n</ul>",
      "quiz": {
        "q": "BC-Z 中 Adaptive State-Diff 的核心作用是什么？",
        "options": [
          "加速策略网络的推理速度",
          "根据动作幅度自适应选择差分步长，抑制噪声并提高动作平滑性",
          "在不同任务之间自适应分配网络容量",
          "自动调整学习率以适应多任务训练"
        ],
        "answer": 1,
        "explain": "Adaptive State-Diff 根据当前动作幅度动态选择 N（首个超出阈值的未来状态），避免 naive 差分在缓慢动作时拟合噪声，是模型成功的关键设计（去除后成功率从 52% 降至 3%）。"
      }
    },
    {
      "id": "cliport",
      "num": 2,
      "name": "CLIPort",
      "fullName": "视觉语言操作路径 (CLIPort)",
      "year": "2022",
      "org": "University of Washington / Google Research",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2109.12098",
      "projectUrl": "",
      "category": "spatial_3d",
      "motivation": "融合CLIP语义与Transporter几何精度",
      "summary": "CLIPort 提出了一种把 CLIP 语义理解和 Transporter Network 像素级几何定位拼接起来的双流操作框架，在语言条件化桌面抓放任务上同时拿到了开放词汇泛化和高精度空间操作能力。",
      "keyPoints": [
        "提出 <strong>What + Where</strong> 双流架构：语义流负责“抓什么”，空间流负责“去哪里抓/放”",
        "语义流复用冻结的 <strong>CLIP ResNet-50</strong> 视觉编码器和 CLIP 文本编码器，保留开放词汇语义能力",
        "空间流使用从零训练的 <strong>RGB-D ResNet-FPN</strong>，保留像素级几何细节",
        "通过 <strong>lateral connections</strong> 在多尺度上融合两路特征，兼顾语义与空间精度",
        "延续 <strong>Transporter</strong> 的 pick-and-place 分解：先预测抓取像素，再通过互相关搜索放置位置与旋转",
        "在 Ravens 仿真和真实 UR5e 平台上展示出很强的样本效率，多任务模型还能超过部分单任务专家"
      ],
      "detail": "<h5>核心架构图</h5>\n<p><img alt=\"CLIPort 双流架构图\" src=\"https://cliport.github.io/media/images/two_stream_architecture.png\" />\n<em>图：CLIPort 的双流结构。上路的语义流回答“what”，下路的空间流回答“where”，最后通过多尺度 lateral fusion 输出像素级 pick/place 热力图。</em></p>\n<h5>核心伪代码</h5>\n<pre><code class=\"language-python\"># CLIPort: CLIP semantic stream + spatial stream + Transporter action head\n\ndef cliport_step(rgbd, instruction):\n    text_feat = clip_text_encoder(instruction)\n\n    # semantic stream\n    sem_feat = frozen_clip_visual(rgbd[:, :, :3])\n    sem_feat = semantic_decoder(sem_feat)\n    sem_feat = sem_feat * tile(text_feat, sem_feat.shape[:2])\n\n    # spatial stream\n    spa_feat = spatial_decoder(spatial_encoder(rgbd))\n\n    fused = lateral_fuse(spa_feat, sem_feat)\n\n    q_pick = pick_head(fused)\n    pick_uv = argmax2d(q_pick)\n\n    query = crop_query(fused, center=pick_uv)\n    q_place = []\n    for theta in discrete_rotations(36):\n        q_place.append(cross_correlate(rotate(query, theta), place_key(fused)))\n\n    place_uv, place_theta = argmax_pose(stack(q_place))\n    return pick_uv, place_uv, place_theta\n</code></pre>\n<h5>动机：为什么 CLIP 和 Transporter 必须组合</h5>\n<p>CLIPort 面对的核心矛盾是：纯视觉语言模型知道“红色积木”“绿色碗”是什么意思，但很难在机器人控制所需的像素精度上输出可执行位姿；纯操作网络又能在桌面上高精度抓放，却不擅长理解开放词汇指令。论文的解法不是让一个网络同时把两件事都做极致，而是显式拆成两条通路。</p>\n<p>语义流直接继承 CLIP 的预训练表示。CLIP 在互联网图文对上已经学会了丰富的对象类别、颜色和关系概念，所以只要给出自然语言指令，它就能快速把注意力拉到“要操作的东西”上。问题在于 CLIP 的空间精度并不够高，尤其是在需要像素级抓放点时会变得模糊。</p>\n<p>空间流因此被单独设计成一个 RGB-D encoder-decoder，专门保留深度几何、边缘和精确位置。CLIPort 的关键不是简单特征拼接，而是把语义和几何分别做强，再在解码阶段多尺度融合。这种架构与人类视觉皮层中的 ventral “what” 和 dorsal “where” 通路形成了直接类比。</p>\n<h5>核心机制一：语言条件化语义流</h5>\n<p>CLIP 文本编码器先把语言指令 <span class=\"kb-math kb-math-inline\">l</span> 编成向量 <span class=\"kb-math kb-math-inline\">e_l</span>。视觉编码器提取图像语义特征 <span class=\"kb-math kb-math-inline\">f_{\\text{vis}}</span> 后，模型把 <span class=\"kb-math kb-math-inline\">e_l</span> 平铺到空间维度，并与视觉特征逐元素相乘：</p>\n<div class=\"kb-math kb-math-display\">f_{\\text{sem}} = f_{\\text{vis}} \\odot \\mathrm{tile}(e_l)</div>\n<p>这个操作的直觉很直接：不是让网络重新“学会语言”，而是直接用 CLIP 的文本向量去调制图像通道响应。于是，当指令从 “put the red block in the green bowl” 换成 “pack the yellow ring into the brown box” 时，语义流能以极低样本复杂度重定位目标对象。</p>\n<div class=\"key-point\">💡 关键：CLIPort 不是把 CLIP 当分类器用，而是把它当作一个已经学好开放词汇语义的像素特征生成器来用。</div>\n<h5>核心机制二：Transporter 式 pick-place 分解</h5>\n<p>CLIPort 沿用了 Transporter Networks 的动作表示，把操作拆成抓取和放置两步。给定正交投影的观测 <span class=\"kb-math kb-math-inline\">\\gamma_t</span>，抓取头输出每个像素的价值图：</p>\n<div class=\"kb-math kb-math-display\">Q_{\\text{pick}}(\\gamma_t) = f_{\\text{pick}}(\\gamma_t), \\qquad\na_{\\text{pick}} = \\arg\\max_{(u,v)} Q_{\\text{pick}}(u,v)</div>\n<p>放置头则围绕抓取点裁出一个局部 query patch，并与全图 key feature 做互相关，在离散旋转集合 <span class=\"kb-math kb-math-inline\">\\Delta \\tau</span> 上搜索：</p>\n<div class=\"kb-math kb-math-display\">Q_{\\text{place}}(\\gamma_t \\mid a_{\\text{pick}})\n= \\left[\\Phi_q(\\gamma_t[T_{\\text{pick}}]) * \\Phi_k(\\gamma_t)\\right]_{\\Delta \\tau}</div>\n<div class=\"kb-math kb-math-display\">a_{\\text{place}} = \\arg\\max_{(u,v,\\theta)} Q_{\\text{place}}(u,v,\\theta)</div>\n<p>这里的优势在于，模型完全不需要直接回归 6-DoF 姿态，而是把大部分几何问题变成了卷积和旋转搜索。对桌面 pick-and-place 这类任务来说，这种表示比直接回归更稳定，也更容易从少量演示中学出来。</p>\n<h5>核心机制三：为什么冻结 CLIP 反而更好</h5>\n<p>论文一个很重要的实验结论是：小数据机器人任务里，<strong>冻结 CLIP 编码器</strong> 往往比端到端微调更稳。原因并不神秘。机器人演示量和互联网图文数据量差了几个数量级，如果在几十到几百条演示上解冻 CLIP，很容易把原本学到的开放词汇语义毁掉。CLIPort 只训练语义流的解码器、空间流和动作头，从而既保留了语义先验，又避免了小样本过拟合。</p>\n<p>这也解释了它的样本效率来源。论文在 1 到 100 条演示区间内看到，CLIPort 相比不带 CLIP 的 Transporter 基线明显更快进入高成功率区域。这不是因为机器人控制更简单了，而是因为“认物体”的那部分能力已经由 CLIP 预先学好。</p>\n<h5>结果怎么看：它是早期 VLA 里非常干净的一条路线</h5>\n<p>CLIPort 并不是通用大模型路线，而是一条非常工程化、非常有效的语言条件化操控路线。它在 10 个 Ravens 仿真任务和 9 个真实机器人任务上都展示出稳定收益，多任务模型在超过一半任务上还超过了单任务专家。它的启发主要有两点：第一，开放词汇语义和高精度操控确实可以解耦；第二，机器人策略预训练不一定非得走超大端到端模型，合理组合现成基础模型和操作网络也能带来很强的泛化。</p>",
      "quiz": {
        "q": "CLIPort 中语义流和空间流分工的核心目的是什么？",
        "options": [
          "让同一个 CLIP 编码器同时负责语言理解和深度重建",
          "用语义流负责开放词汇对象理解，用空间流负责像素级几何定位",
          "把抓取和放置分别交给两个完全独立的数据集训练",
          "将动作空间从连续控制改写成纯文本生成任务"
        ],
        "answer": 1,
        "explain": "CLIPort 的核心就是显式拆开 what 和 where。CLIP 语义流负责理解指令中的目标对象，RGB-D 空间流负责精确抓放位置，两者融合后输出动作热力图。"
      }
    },
    {
      "id": "saycan",
      "num": 3,
      "name": "SayCan",
      "fullName": "语言可行性规划 (SayCan)",
      "year": "2022.04",
      "org": "Google",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2204.01691",
      "projectUrl": "",
      "category": "llm_planning",
      "motivation": "LLM规划结合底层技能可行性评估",
      "summary": "SayCan 把大语言模型对“下一步该做什么”的语义常识和机器人当前状态下“这一步能不能做成”的技能价值函数相乘，用语言级规划加可行性过滤实现开放指令下的长程机器人执行。",
      "keyPoints": [
        "提出 <strong>SayCan</strong>：让语言模型负责高层技能选择，让机器人技能价值函数负责低层可行性评估",
        "把机器人能力表示成一组可调用的 <strong>skill library</strong>，每个技能都配有自然语言描述",
        "用语言模型估计技能对用户目标的 <strong>usefulness</strong>，用 value function 估计当前状态下的 <strong>affordance</strong>",
        "通过乘法打分在每一步重规划，而不是一次性生成整条固定计划",
        "在真实移动操作机器人上验证了开放指令长程执行，项目页报告 <strong>84% 正确技能选择率</strong> 和 <strong>74% 任务完成率</strong>",
        "展示了语言模型规模增大、链式思维提示和多语言指令都能继续改善高层规划表现"
      ],
      "detail": "<h5>核心总览图</h5>\n<p><img alt=\"SayCan 总览图\" src=\"https://ar5iv.labs.arxiv.org/html/2204.01691/assets/figures/intro.png\" />\n<em>图：SayCan 论文 Figure 1。语言模型根据指令挑选下一步技能，价值函数根据当前观测过滤不可执行技能，两者联合决定机器人下一步调用哪个底层技能。</em></p>\n<h5>核心伪代码</h5>\n<pre><code class=\"language-python\"># SayCan: language-model usefulness x skill-value affordance\n\ndef choose_skill(instruction, history, state, skills):\n    scores = []\n    for skill in skills:\n        p_useful = language_model_prob(skill.description, instruction, history)\n        p_can = value_function(skill, state)\n        scores.append((skill, p_useful * p_can))\n    return argmax(scores)\n\nhistory = []\nwhile not task_finished():\n    skill = choose_skill(user_instruction, history, robot_state(), skill_library)\n    outcome = execute(skill)\n    history.append((skill.name, outcome))\n</code></pre>\n<h5>动机：为什么单靠 LLM 规划还不够</h5>\n<p>SayCan 要解决的问题是开放指令长程执行。像 “I spilled my drink, can you bring me something to clean it up?” 这类命令，机器人需要先定位脏污，再决定去哪里拿海绵、怎样避开障碍、拿完后返回并执行清洁。纯 LLM 往往能写出语义上很合理的计划，但它不知道当前机器人是不是正好离海绵太远、是不是手里已经抓着别的东西、某个抽屉是不是根本打不开。</p>\n<p>因此，论文把“合理”与“可做”显式拆开。语言模型负责判断某个技能对任务目标是否有帮助，也就是 usefulness；机器人已有的技能价值函数负责判断该技能在当前状态下成功概率高不高，也就是 affordance。真正执行时只选择两者都高的技能。</p>\n<p>这相当于给 LLM 加了一个 grounded reality check。它保留了大模型的常识和组合规划能力，但避免让模型直接负责它根本没有感知到的物理可行性。</p>\n<h5>核心机制一：skill description 上的语言规划</h5>\n<p>SayCan 首先把机器人底层能力抽象成离散 skill set，例如 <code>find a sponge</code>、<code>pick up sponge</code>、<code>go to table</code>、<code>wipe table</code>。每个技能都带有一段自然语言描述，语言模型根据当前任务描述和已经执行的步骤历史，为候选技能分配先验概率：</p>\n<div class=\"kb-math kb-math-display\">P_{\\text{LM}}(s_i \\mid \\text{instruction}, \\text{history})</div>\n<p>它不直接生成连续动作，也不直接生成代码，而是在已有技能库上做语义级下一步选择。这让高层规划问题变得稳定很多，因为搜索空间被压缩到了“选哪个技能”。</p>\n<h5>核心机制二：value function 过滤技能可行性</h5>\n<p>对每个候选技能 <span class=\"kb-math kb-math-inline\">s_i</span>，系统还会查询一个由机器人数据训练得到的成功价值估计：</p>\n<div class=\"kb-math kb-math-display\">V(s_i, x_t) \\approx P(\\text{success} \\mid s_i, x_t)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">x_t</span> 是当前机器人状态。这个 value function 可以来自离线技能成功预测器、本体/视觉条件策略的 critic，或者其它成功概率估计模块。它的任务不是决定“这一步是不是目标相关”，而是回答“现在执行它成功概率大不大”。</p>\n<p>论文的核心打分就是把两者相乘：</p>\n<div class=\"kb-math kb-math-display\">\\mathrm{score}(s_i)\n= P_{\\text{LM}}(s_i \\mid \\text{instruction}, \\text{history}) \\cdot V(s_i, x_t)</div>\n<p>只有语义合理且物理可行的技能才会被推到前面。比如“拿海绵擦桌子”在语义上显然好于“去充电”，但如果机器人当前根本够不到海绵，value function 会把这个技能压下去，优先执行“移动到柜子附近”这类可行前置步骤。</p>\n<div class=\"key-point\">💡 关键：SayCan 的创新不是让 LLM 学会机器人控制，而是承认 LLM 不懂控制，然后用显式价值函数把它校正到现实世界。</div>\n<h5>核心机制三：逐步重规划而不是一次性生成整条计划</h5>\n<p>SayCan 不是一开始就生成完整计划然后盲执行，而是在每个技能执行后更新历史和状态，再重新打分下一个技能。这一点非常重要，因为真实环境中执行结果会不断改变后续最优动作。例如机器人拿到海绵之后，“go to cabinet” 这类技能的价值会立即下降，而 “return to table and wipe” 会升高。</p>\n<p>从算法结构看，它更像一个高层 receding-horizon planner：</p>\n<ol>\n<li>读取用户指令和当前状态</li>\n<li>用 LLM 给所有技能打 usefulness 分</li>\n<li>用 value function 给所有技能打 affordance 分</li>\n<li>相乘后选最高分技能执行</li>\n<li>根据新状态继续循环</li>\n</ol>\n<p>这就是它能处理长程开放任务的根本原因。它不要求规划器一开始就完全正确，而是允许在每一步都重新贴近真实世界。</p>\n<h5>结果怎么看：它开创了 LLM 规划与机器人控制解耦的主线</h5>\n<p>SayCan 的方法本身非常朴素，但影响极大。后续大量具身系统都在沿用这条分工思路：LLM 负责计划、代码、技能选择或子目标；底层策略、世界模型或价值函数负责可行性、执行和闭环纠错。即使后来的系统换成了 VLA、world model 或 diffusion policy，它们也常常仍保留这种“高层语义推理 + 低层 grounded execution”的结构。</p>",
      "quiz": {
        "q": "SayCan 选择下一步技能时的核心打分原则是什么？",
        "options": [
          "只选语言模型概率最高的技能",
          "只选 value function 最高的技能",
          "把语言模型的 usefulness 和技能价值函数的 affordance 组合起来评分",
          "先随机采样技能，再让机器人试错"
        ],
        "answer": 2,
        "explain": "SayCan 的关键就是同时考虑任务语义相关性和当前状态下的可执行性。它把语言模型概率与技能成功价值结合，避免计划看起来合理但现实中做不到。"
      }
    },
    {
      "id": "gato",
      "num": 4,
      "name": "Gato",
      "fullName": "通用智能体 (Gato)",
      "year": "2022.05",
      "org": "DeepMind",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2205.06175",
      "projectUrl": "",
      "category": "transformer_policy",
      "motivation": "单一Transformer处理600+多形态任务",
      "summary": "Gato 把文本、图像、本体感觉和动作全部序列化成同一种 token 序列，用单个 1.2B decoder-only Transformer 在 600+ 任务上联合训练，证明“单一权重通吃多模态、多任务控制”是可行的。",
      "keyPoints": [
        "提出 <strong>Gato</strong>：一个统一处理文本、视觉和控制的通用序列模型",
        "使用 <strong>1.2B 参数 decoder-only Transformer</strong>，而不是为不同任务定制不同网络",
        "把文本、图像 patch、离散动作和连续动作都映射成统一 token 序列",
        "训练覆盖 <strong>600+ 任务 / 604 个 benchmark 实例</strong>，包括对话、图像描述、Atari、DMControl 和真实机器人抓取",
        "采用 <strong>prompted policy</strong> 形式，用成功示范作为上下文条件化当前任务",
        "损失只监督 <strong>文本 token 和动作 token</strong>，观测 token 只作为条件输入"
      ],
      "detail": "<h5>核心总览图</h5>\n<p><img alt=\"Gato 总览图\" src=\"https://ar5iv.labs.arxiv.org/html/2205.06175/assets/x1.png\" />\n<em>图：Gato 论文 Figure 1。单一 Transformer 接收不同模态和任务的 token 序列，输出文本或动作 token，展示了从聊天到 Atari 再到真实机械臂控制的统一接口。</em></p>\n<h5>核心伪代码</h5>\n<pre><code class=\"language-python\"># Gato: flatten everything into one autoregressive token stream\n\ndef tokenize_step(observation, action=None):\n    obs_tokens = tokenize_text_image_state(observation)\n    if action is None:\n        return obs_tokens\n    act_tokens = tokenize_action(action)\n    return obs_tokens + [SEP] + act_tokens\n\ncontext = tokenize_success_demo(demo)[:1024]\n\nfor t in rollout:\n    context += tokenize_step(current_observation)\n    action_tokens = autoregressive_decode(transformer, context, n_tokens=action_token_count)\n    action = detokenize_action(action_tokens)\n    execute(action)\n    context += action_tokens\n</code></pre>\n<h5>动机：为什么要把所有任务都改写成语言模型问题</h5>\n<p>Gato 的出发点与同时期大多数机器人论文不同。它并不先问“怎么为 Atari 设计一个网络，怎么为机械臂再设计一个网络”，而是先问：如果大模型真正学到的是序列建模能力，那么文本、图像、动作乃至机器人本体感觉，能不能都被改写成一个统一的 next-token prediction 问题？</p>\n<p>这个问题的重要性在于，一旦答案是肯定的，通用智能体就不再依赖任务专用结构。模型不需要知道当前是在玩游戏、写文字还是控制机械臂，它只需要根据前缀上下文继续生成最可能的下一个 token。这样，多任务学习的核心就从“多头结构设计”变成了“如何把异构数据稳定地序列化”。</p>\n<p>Gato 因而更像一个“序列接口标准”而不是单纯的控制模型。它为后来的 VLA/通用策略路线留下了一个很直接的启示：只要 token 化和训练目标设计得足够统一，跨模态共享一个骨干网络是可能的。</p>\n<h5>核心机制一：统一 token 化</h5>\n<p>论文对不同模态采用了统一但并不完全相同的 token 化策略。文本走 SentencePiece；图像被切成 <span class=\"kb-math kb-math-inline\">16 \\times 16</span> patch 并映射为连续 embedding；离散动作本身就是离散 token；连续值和连续动作则先做 <span class=\"kb-math kb-math-inline\">\\mu</span>-law 压缩，再量化成 1024 个 bins。</p>\n<p>如果记原始连续值为 <span class=\"kb-math kb-math-inline\">x\\in[-1,1]</span>，其 <span class=\"kb-math kb-math-inline\">\\mu</span>-law 压缩形式可写成：</p>\n<div class=\"kb-math kb-math-display\">\\mathrm{muLaw}(x)=\\operatorname{sign}(x)\\frac{\\ln(1+\\mu |x|)}{\\ln(1+\\mu)}</div>\n<p>压缩后的值再被量化成离散桶，统一进入 Transformer。这样做的关键收益是：网络不需要为连续控制额外配一个回归头，而是继续做它最熟悉的离散 token 预测。</p>\n<h5>核心机制二：只监督动作和文本输出</h5>\n<p>Gato 的训练目标不是对所有 token 都算损失。图像 patch、本体感觉等观测 token 只作为条件输入，不是要预测的目标；真正被监督的是文本 token 和动作 token。论文中的掩码交叉熵可以写成：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}(\\theta)\n= - \\sum_b \\sum_l m(b,l)\\log p_\\theta\\!\\left(s_l^{(b)} \\mid s_{&lt;l}^{(b)}\\right)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">m(b,l)=1</span> 只在第 <span class=\"kb-math kb-math-inline\">l</span> 个 token 属于文本或动作时成立。直觉上，这让模型把容量集中在“该说什么”和“该做什么”上，而不是浪费在重建高维观测上。</p>\n<div class=\"key-point\">💡 关键：Gato 不是多模态自编码器，它的本质依然是一个条件生成器，只不过条件前缀被扩展成了多模态轨迹。</div>\n<h5>核心机制三：示范式 prompt conditioning</h5>\n<p>Gato 不是用固定 task id 条件化，而是直接把成功示范作为 prompt。模型先读入一段成功 episode 的 token，再在当前任务上下文里继续生成动作。这样带来两个效果：第一，不同任务天然可以通过上下文切换；第二，少样本适应可以被表述成“给更多合适前缀示范”。</p>\n<p>这件事与后来很多 in-context robot policy 的思路高度一致。它说明即便在没有显式任务头的情况下，Transformer 也可以把“当前正在做什么”编码进前缀上下文。</p>\n<h5>结果怎么看：Gato 解决的是“统一接口”问题</h5>\n<p>Gato 不是当时每个单项 benchmark 上最强的专家，但它完成了一件更重要的事：用单个 1.2B 模型覆盖了 600+ 个不同任务域，并且还能实时控制真实机器人。它最深的影响不在某个具体成功率，而在于它证明了“文本、视觉、动作可以进入同一个自回归骨干”这一点。这条路后来被 RT-1、RT-2、PaLM-E 以及更系统的 VLA 工作不断放大。</p>",
      "quiz": {
        "q": "Gato 训练时为什么只对文本 token 和动作 token 计算损失？",
        "options": [
          "因为图像 token 不能输入 Transformer",
          "因为观测 token 主要作为条件前缀，模型重点学习输出什么文本和动作",
          "因为连续动作已经通过回归头单独优化，不需要 token 损失",
          "因为这样可以完全避免上下文长度限制"
        ],
        "answer": 1,
        "explain": "Gato 把图像和状态 token 当作条件输入，真正要学习预测的是文本和动作输出。这样能把模型容量集中到决策和生成上，而不是重建观测。"
      }
    },
    {
      "id": "code_as_policies",
      "num": 5,
      "name": "Code as Policies",
      "fullName": "代码即策略 (Code as Policies)",
      "year": "2022.11",
      "org": "Google",
      "parent": "saycan",
      "paperUrl": "https://ai.googleblog.com/2022/11/robots-that-write-their-own-code.html",
      "projectUrl": "",
      "category": "llm_planning",
      "motivation": "LLM生成Python代码控制机器人",
      "summary": "让大语言模型直接为机器人编写**可执行Python代码**（而非自然语言指令序列），通过**递归组合语言模型程序（LMPs）**形成分层策略，并利用代码的函数调用、变量状态、循环/条件结构、API参数化等编程语言原语，实现复杂长时任务的推理与闭环纠错，显著提升机器人策略的空间泛化力、行为多样性和交互灵活性。\n\n---",
      "keyPoints": [
        "<strong>核心理念：代码即策略（Code as Policies）</strong> — 用LLM生成的Python代码直接作为机器人控制策略，而不仅是生成高层行动计划或子目标序列。代码天然支持状态变量、循环、条件分支、函数递归等，比纯自然语言更具表现力和可组合性。",
        "<strong>语言模型程序（LMP）</strong> — 将LLM输出的代码视为一种\"程序单元\"，既可调用现有感知基元和控制API，也可定义新函数供其他LMP调用，形成<strong>递归分层结构</strong>。上层LMP可调用下层LMP来逐步具象化模糊指令。",
        "<strong>分层代码生成</strong> — 复杂任务被分解为多个LMP的层次调用链：高层LMP将自然语言需求转为带参数的函数调用；中间层LMP定义任务特化的辅助函数（如空间推理、顺序约束处理）；底层LMP直接调用机器人控制API（如 <code>pick_and_place</code>）。",
        "<strong>代码作为\"Chain-of-Thought\"的强化版</strong> — 精心命名的变量和函数名、中间计算步骤、日志输出等，天然构思维链，且代码能被编译器和运行时检验语法错误，部分逻辑错误也可在仿真中发现。",
        "<strong>零样本跨实体迁移</strong> — 因为LMP生成的是高层控制逻辑，底层API可被替换为不同机器人的控制原语（如移动基座速度控制、物体操作用夹爪API），实现<strong>同一高层策略在不同实体间的复用</strong>。",
        "<strong>人机交互新范式</strong> — 用户可以用自然语言给机器人新指令，LLM当场生成新代码片段；也可进行\"代码审阅\"式的纠错；机器人遇到错误时LLM能生成排查/恢复代码。",
        "<strong>安全与限制</strong> — 论文展示了仿真和真实机器人上的多样化实验，但生成的代码存在安全风险（语法/语义错误、不安全动作），实际部署需人工监督或沙箱测试。"
      ],
      "detail": "<h5>1. 问题形式化</h5>\n<p>给定：\n- 用户自然语言指令 $\\ell$（如：\"把所有红块放到篮子里，然后在桌上画一个L形\"）\n- 一组预定义的<strong>控制基元</strong> $\\mathcal{A}$（如 <code>pick(obj)</code>, <code>place(pos)</code>, <code>draw_shape(coords)</code>）\n- 感知模块 $\\mathcal{P}$（返回物体名称/位姿/颜色等结构化信息）</p>\n<p>目标是生成一个<strong>可执行的Python代码片段</strong> $c$，使得在机器人上运行 $c$ 能完成指令 $\\ell$ 所述任务。CaP 用 LLM 作为转换器：$c \\sim \\text{LLM}(\\text{prompt}(\\ell, \\mathcal{A}, \\mathcal{P}, \\text{examples}))$。</p>\n<p><img alt=\"图1: CaP系统概览\" src=\"https://code-as-policies.github.io/static/images/overview.png\" /></p>\n<p><strong>图1说明</strong>：用户说\"把水壶里的水倒进杯子里\"。CaP 生成的LMP代码通过：①调用视觉模块定位物体；②分析物体间空间关系（相对位置、沿轴方向）；③生成机器人轨迹/动作原语序列；④输出执行代码。这一切都在<strong>同一个Python执行环境</strong>中，中间变量、日志等天然可见。</p>\n<h5>2. 语言模型程序（LMP）的层级结构</h5>\n<p>CaP 的核心贡献在于提出了<strong>LMP 的分层组合机制</strong>。论文定义了三种层次：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>层级</th>\n<th>功能</th>\n<th>示例LMP</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><strong>L0</strong>: 控制基元</td>\n<td>直接驱动机器人的动作原语</td>\n<td><code>pick(obj)</code>, <code>push(obj, dir)</code>, <code>move_to(pos)</code></td>\n</tr>\n<tr>\n<td><strong>L1</strong>: 感知/空间推理</td>\n<td>将感知数据结构化，进行空间逻辑推理</td>\n<td><code>get_obj_by_relation(base, relation)</code>, <code>filter_by_color(objs, color)</code></td>\n</tr>\n<tr>\n<td><strong>L2</strong>: 任务规划</td>\n<td>将自然语言分解为L1/L0调用序列</td>\n<td>主LMP函数体，含循环、条件和分层调用</td>\n</tr>\n</tbody>\n</table></div>\n<p>这种分层的关键优势：<strong>上层LMP无需知道底层API细节</strong>。换一个机器人时，只需替换L0基元，L1和L2代码无需修改。</p>\n<p><img alt=\"图2: 分层代码生成示意\" src=\"https://code-as-policies.github.io/static/images/hierarchy.png\" /></p>\n<p><strong>图2说明</strong>：示例指令\"stack blocks in the empty bowl\"。LLM 生成的高层代码调用 <code>parse_obj</code> 获取物体名，再调用 <code>stack_objs_in_order</code>。该函数由另一个LMP定义（右上方），内部循环调用 <code>put_first_on_second</code> 这一L0基元，实现块块堆叠。此即<strong>函数式递归组合</strong>：每个LMP既可被LLM生成，也可被其他LMP调用。</p>\n<h5>3. 提示词工程：分层提示 + Few-Shot</h5>\n<p>CaP 使用<strong>分阶段提示</strong>来生成不同层次的LMP：</p>\n<pre><code>阶段1: 定义L1辅助函数 → 阶段2: 定义任务特化的组合函数 → 阶段3: 生成主执行代码\n</code></pre>\n<p>每个阶段的提示包含：\n- <strong>角色描述</strong>：如 \"You are a helpful robot assistant that writes code to control a robot.\"\n- <strong>可用API清单</strong>：带签名的函数列表及简短说明\n- <strong>Few-Shot示例</strong>：2-4个代码生成示例，展示如何将自然语言转换为正确的API调用\n- <strong>当前感知状态</strong>（可选）：当前场景中物体的名称、位置、属性等结构化数据，作为代码中的初始变量</p>\n<pre><code class=\"language-python\"># CaP 提示结构示例（简化版）\nsystem_prompt = &quot;&quot;&quot;\n# Robot Control Code Generation\nAvailable functions:\n- pick(obj_name: str): pick up the named object\n- place(x: float, y: float): place held object at position\n- get_pos(obj_name: str) -&gt; (float, float): get object position\nWrite Python code that uses these functions to achieve the user's instruction.\n&quot;&quot;&quot;\n</code></pre>\n<h5>4. 算法伪代码</h5>\n<p>论文的Algorithm 1描述了CaP的核心流程：</p>\n<pre><code>Algorithm 1: Hierarchical Code-as-Policies Generation\n─────────────────────────────────────────────────────\nInput: Natural language instruction l,\n       Base API primitives A = {f1, f2, ..., fn},\n       Perception module P,\n       Pre-trained LLM (e.g., Codex, PaLM)\nOutput: Executable Python policy code C\n\n1:  state ← P()                              ▷ 获取当前场景感知状态\n2:  prompt ← BUILD_BASE_PROMPT(A, state)     ▷ 构建含API清单+状态的基础提示\n3:  H ← {l}                                  ▷ 初始化LMP层级栈，顶层为用户指令\n4:  C ← &quot;&quot;\n5:  while H is not empty do\n6:      h ← H.pop()                          ▷ 取当前待处理的指令/函数签名\n7:      if h IS_USER_INSTRUCTION then\n8:          prompt_h ← prompt + INSTRUCTION_PROMPT(h, examples)\n9:          c_h ← LLM(prompt_h)              ▷ 生成主执行代码\n10:         C ← c_h\n11:     else if h IS_UNDEFINED_FUNCTION then\n12:         prompt_h ← prompt + FUNCTION_DEF_PROMPT(h, examples)\n13:         c_h ← LLM(prompt_h)              ▷ 生成函数定义\n14:         C ← INSERT_FUNCTION_DEF(C, c_h)\n15:     end if\n16:     H ← H ∪ EXTRACT_UNDEFINED_CALLS(c_h) ▷ 提取未定义函数，推入栈\n17: end while\n18: return C\n</code></pre>\n<p>该算法的核心创新在于<strong>递归展开未定义函数</strong>：当LLM生成的代码中调用了尚未定义的函数时（如 <code>stack_in_order()</code>），算法自动将该函数签名推入待处理栈，再调用LLM生成其函数体。最终得到一棵完整的函数调用树。</p>\n<h5>5. 关键实验与发现</h5>\n<p><strong>空间推理的代码表达</strong>：传统VLA模型难以表达复杂的空间关系（如\"离门最近的杯子\"、\"沿墙排成L形\"）。CaP通过代码中的数学运算（距离计算、排序、几何变换）优雅地解决：</p>\n<pre><code class=\"language-python\"># 示例：把离门最近的杯子放到桌子上\ndoor_pos = get_pos('door')\ncups = [o for o in get_objects() if 'cup' in o]\nnearest_cup = min(cups, key=lambda c: dist(get_pos(c), door_pos))\npick(nearest_cup)\nplace(table_pos)\n</code></pre>\n<p><strong>多模态交互与纠错</strong>：CaP支持\"代码反馈循环\"——机器人执行代码后若失败，LLM可根据错误信息生成修正代码。论文展示了一个场景：机器人抓取失败后，LLM生成代码\"后退、重新定位、再尝试\"（即重试逻辑）。</p>\n<p><strong>跨实体泛化</strong>：在移动机器人（基于语言指令的导航+操作）和固定臂（桌面物体重排）两种场景间，CaP只需替换L0控制基元，高层L1/L2代码可完全复用，验证了代码层面的抽象能力。</p>\n<h5>6. 局限性分析</h5>\n<ul>\n<li><strong>语法/语义错误风险</strong>：LLM生成的代码可能包含运行时错误（如空列表索引、类型不匹配），论文报告约30-40%的生成代码需事后再生成或人工修正；</li>\n<li><strong>计算开销</strong>：复杂任务需要多轮LLM调用（为每个未定义函数递归生成），延迟较高；</li>\n<li><strong>安全边界</strong>：代码可直接控制物理机器人，恶意或错误代码可能造成损害；论文仅在实验室环境中测试，未涉及安全沙箱；</li>\n<li><strong>感知耦合度</strong>：代码中硬编码了感知函数名（如 <code>get_color</code>），若新环境中的感知API不同，需手动适配。</li>\n</ul>\n<hr />",
      "quiz": {
        "q": "",
        "options": [],
        "answer": 0,
        "explain": ""
      }
    },
    {
      "id": "rt1",
      "num": 6,
      "name": "RT-1",
      "fullName": "机器人Transformer第一代 (RT-1)",
      "year": "2022.12",
      "org": "Google DeepMind",
      "parent": "bc_z",
      "paperUrl": "https://arxiv.org/abs/2212.06817",
      "projectUrl": "",
      "category": "transformer_policy",
      "motivation": "TokenLearner压缩视觉实现3Hz控制",
      "summary": "RT-1 提出 Robotics Transformer 架构，将图像-语言输入编码为离散动作 token，在 130k 真实机器人演示数据上训练，实现 700+ 指令的 97% 成功率和比最佳基线高 25% 的新任务泛化能力。",
      "keyPoints": [
        "端到端 Transformer 架构：FiLM-EfficientNet（图像编码）+ TokenLearner（压缩）+ Transformer（序列决策）",
        "大规模真实世界数据：130k demos，13 个机器人，17 个月收集，覆盖 700+ 指令、8 类技能",
        "离散化动作空间：将动作（arm position + base movement + gripper）离散化为 256 个 bin，使用 CCE loss 训练",
        "3Hz 闭环推理：通过 TokenLearner 压缩视觉 token（从 81 到 8），移除自回归动作生成，实现实时推理",
        "异构数据融合：仿真数据 + 不同机器人数据合训，提升长程任务泛化",
        "新任务零样本泛化：76% 未见指令成功率，背景鲁棒性比基线高 18%"
      ],
      "detail": "<h5>动机与背景</h5>\n<p>机器人学习面临三大挑战：\n1. <strong>数据稀缺</strong>：机器人数据远少于视觉/语言领域\n2. <strong>任务多样性</strong>：传统方法每任务单独建模，无法泛化\n3. <strong>实时推理</strong>：Transformer 推理速度难以满足机器人闭环控制</p>\n<p>RT-1 借鉴 CV/NLP 的大规模预训练范式，首次在真实机器人数据集上训练统一 Transformer 模型，同时处理 visual、language、action 多模态信号。</p>\n<h5>核心架构</h5>\n<p><img alt=\"RT-1 架构总览\" src=\"https://ar5iv.labs.arxiv.org/html/2212.06817/assets/figures/fig1.png\" />\n<em>图：RT-1 架构总览。图像经 FiLM-EfficientNet 编码后与指令文本融合，通过 TokenLearner 压缩为 8 个 token 输入 Transformer，输出离散化动作。</em></p>\n<p><strong>输入阶段：FiLM-conditioned EfficientNet</strong></p>\n<ul>\n<li>6 帧历史图像（300×300×3）→ ImageNet 预训练 EfficientNet-B3 提取特征</li>\n<li>文本指令通过 Universal Sentence Encoder 编码为 512 维嵌入</li>\n<li>FiLM 层将语言特征作为条件注入视觉编码器（仿射变换：γ·x + β），实现早期多模态融合</li>\n<li>输出：9×9×512 = 81 个视觉 token</li>\n</ul>\n<p><strong>TokenLearner 压缩</strong></p>\n<ul>\n<li>将 81 个视觉 token 学习加权压缩为 8 个 token</li>\n<li>每个输出 token 是 81 个输入的空间注意力加权和</li>\n<li>大幅降低 Transformer 计算量（81² → 8²），保证 3Hz 推理</li>\n</ul>\n<p><strong>Transformer 序列建模</strong></p>\n<ul>\n<li>仅 8 层 decoder-only Transformer（35M 参数，比原 Gato 1.2B 小 34 倍）</li>\n<li>输入：TokenLearner 输出的 8 个视觉 token + 历史 6 步动作 token</li>\n<li>输出：下一时刻动作 token</li>\n</ul>\n<p><strong>离散化动作空间</strong></p>\n<p>所有动作维度统一离散化到 256 个 bin：</p>\n<ul>\n<li>Base displacement (x, y, yaw)：11 个类别（7 种平移 + 3 种旋转 + stop）</li>\n<li>Arm position (x, y, z, roll, pitch, gripper open)：每维 256 bin</li>\n<li>动作 head 使用 <strong>Categorical Cross Entropy loss</strong>（而非连续回归）</li>\n<li>每个时间步独立吞吐，无自回归（保证 3Hz：~330ms/step）</li>\n</ul>\n<h5>训练数据</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>技能</th>\n<th>数量</th>\n<th>示例指令</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Pick Object</td>\n<td>130</td>\n<td>pick iced tea can</td>\n</tr>\n<tr>\n<td>Move Object Near</td>\n<td>337</td>\n<td>move pepsi can near rxbar</td>\n</tr>\n<tr>\n<td>Place Upright</td>\n<td>8</td>\n<td>place water bottle upright</td>\n</tr>\n<tr>\n<td>Knock Over</td>\n<td>8</td>\n<td>knock redbull can over</td>\n</tr>\n<tr>\n<td>Open/Close Drawer</td>\n<td>6</td>\n<td>open the top drawer</td>\n</tr>\n<tr>\n<td>Place into Receptacle</td>\n<td>84</td>\n<td>place chip bag into bowl</td>\n</tr>\n<tr>\n<td>Pick from Receptacle</td>\n<td>162</td>\n<td>pick jalapeno chip bag from bowl</td>\n</tr>\n<tr>\n<td>Long-horizon</td>\n<td>9</td>\n<td>open jar of pistachios, grab scooper</td>\n</tr>\n</tbody>\n</table></div>\n<p>总计 744 条指令，130k demonstrations，13 台机器人 17 个月收集。</p>\n<h5>实验结果</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>指标</th>\n<th>Gato</th>\n<th>BC-Z</th>\n<th>BC-Z XL</th>\n<th><strong>RT-1</strong></th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Seen Tasks</td>\n<td>65%</td>\n<td>72%</td>\n<td>—</td>\n<td><strong>97%</strong></td>\n</tr>\n<tr>\n<td>Unseen Tasks</td>\n<td>52%</td>\n<td>—</td>\n<td>—</td>\n<td><strong>76%</strong></td>\n</tr>\n<tr>\n<td>Distractors</td>\n<td>43%</td>\n<td>—</td>\n<td>—</td>\n<td><strong>83%</strong></td>\n</tr>\n<tr>\n<td>Backgrounds</td>\n<td>35%</td>\n<td>41%</td>\n<td>—</td>\n<td><strong>59%</strong></td>\n</tr>\n<tr>\n<td>Long-horizon L1/L2/L3</td>\n<td>63/25/0</td>\n<td>38/50/50</td>\n<td>63/75/38</td>\n<td><strong>88/75/50</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p>RT-1 在各项指标上全面超越基线，尤其在 seen tasks 超 Gato 32%，unseen tasks 超 24%，long-horizon 综合 70% vs Gato 30%。</p>\n<h5>关键消融发现</h5>\n<ul>\n<li><strong>TokenLearner 至关重要</strong>：移除后 Transformer 输入从 8 → 81，推理延迟翻倍，无法达到 3Hz</li>\n<li><strong>FiLM 条件优于 late fusion</strong>：早期视觉-语言融合比 Transformer 中拼接文本更强</li>\n<li><strong>离散化动作 + CCE loss</strong> 优于连续回归 MSE loss</li>\n<li><strong>数据多样性 &gt; 数据量</strong>：增加技能种类比增加同类数据更有效</li>\n<li>异构数据合训（仿真 + 不同机器人）将长程任务 L3 泛化从 0 → 50%</li>\n</ul>\n<div class=\"key-point\">💡 关键：RT-1 的核心创新不在 Transformer 架构本身，而在于 (1) 大规模真实数据收集 + (2) TokenLearner 视觉压缩 + (3) 离散化动作空间，三者的工程耦合使得 Transformer 首次能够在真实机器人上达到实用级性能。</p>\n<p>⚠️ 注意：RT-1 未使用自回归动作生成——每个时间步的动作直接 one-shot 输出，这牺牲了一定的动作连续性但换取了 3Hz 的关键延迟优势。</div>",
      "quiz": {
        "q": "RT-1 中 TokenLearner 的主要作用是什么？",
        "options": [
          "增强文本指令的语义理解能力",
          "将 81 个视觉 token 压缩为 8 个，降低 Transformer 计算量以实现实时推理",
          "生成更高质量的动作离散化 bin",
          "替代 ImageNet 预训练的 EfficientNet 编码器"
        ],
        "answer": 1,
        "explain": "TokenLearner 通过空间注意力将 81 个视觉 token 压缩到 8 个，使 Transformer 计算量从 O(81²) 降至 O(8²)，是实现 3Hz 实时推理的关键设计。"
      }
    },
    {
      "id": "palm_e",
      "num": 7,
      "name": "PaLM-E",
      "fullName": "具身多模态语言模型 (PaLM-E)",
      "year": "2023.03",
      "org": "Google Research / TU Berlin",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2303.03378",
      "projectUrl": "",
      "category": "vlm_finetune",
      "motivation": "562B参数多模态观察注入LLM嵌入空间",
      "summary": "PaLM-E 把连续视觉观测和机器人状态编码成一串可插入语言模型上下文的“具身 token”，让超大语言模型直接在同一个自回归序列里同时吸收互联网语义知识和机器人实时感知，从而兼顾 VQA、规划和具身控制。",
      "keyPoints": [
        "提出 <strong>PaLM-E</strong>：把图像、状态和文本统一写进同一个 decoder-only language model 上下文",
        "核心表示是 <strong>embodied multimodal sentences</strong>，即把连续观测编码成与词向量同空间的 token 序列",
        "通过投影网络把 <strong>视觉 encoder / state encoder</strong> 的输出注入到 PaLM 嵌入空间",
        "模型既在机器人数据上训练，也在互联网视觉语言任务上训练，出现明显 <strong>positive transfer</strong>",
        "最大模型达到 <strong>562B</strong> 规模，展示了“LLM 直接吸收实时具身感知”的可扩展性",
        "在移动操作、桌面操作、视觉问答等任务上验证了同一模型的跨域能力"
      ],
      "detail": "<h5>核心总览图</h5>\n<p><img alt=\"PaLM-E 方法图\" src=\"https://palm-e.github.io/img/approach.png\" />\n<em>图：PaLM-E 的整体方法。连续视觉和状态输入先被各自 encoder 编成 embedding token，再与文本 token 一起拼成 embodied multimodal sentence，送入同一个 PaLM 自回归骨干。</em></p>\n<h5>核心伪代码</h5>\n<pre><code class=\"language-python\"># PaLM-E: inject continuous observations into a language-model token stream\n\ndef build_embodied_sentence(image, state, text_prompt):\n    image_tokens = vision_projector(vision_encoder(image))\n    state_tokens = state_projector(state_encoder(state))\n    text_tokens = text_tokenizer(text_prompt)\n    return concat(image_tokens, state_tokens, text_tokens)\n\nsequence = build_embodied_sentence(obs.image, obs.state, instruction)\noutput_tokens = palm_decoder(sequence)\n\nif target_is_text:\n    return decode_text(output_tokens)\nif target_is_action:\n    return action_head(output_tokens[-1])\n</code></pre>\n<h5>动机：为什么 LLM 需要“看见”而不是只接收文字描述</h5>\n<p>在 PaLM-E 之前，大语言模型与机器人结合的常见做法是：先由感知系统把视觉和状态压成文本描述，再把这些文字喂给语言模型做推理或规划。这种路线的问题是信息瓶颈太重。很多几何关系、视觉细节和机器人状态，一旦被文本化，就会丢失大量可用于控制的细粒度信息。</p>\n<p>PaLM-E 的关键判断是：既然 Transformer 本质上处理的是 token 序列，那么 token 不一定非得来自离散词表，也可以来自连续传感器编码。只要这些连续 embedding 被投影到语言模型可消费的嵌入空间，它们就能像“词”一样进入上下文。</p>\n<p>于是，PaLM-E 不再让外部感知模块先写一段描述再转交给 LLM，而是让图像 patch、机器人状态和自然语言一起构成一个真正的具身上下文。这一步把 LLM 从“读文本的推理器”推进到了“读传感器的具身推理器”。</p>\n<h5>核心机制一：embodied multimodal sentences</h5>\n<p>设语言 token 为 <span class=\"kb-math kb-math-inline\">t_1,\\dots,t_n</span>，视觉 encoder 和状态 encoder 产生的连续表示分别为 <span class=\"kb-math kb-math-inline\">x^{\\text{img}}_1,\\dots,x^{\\text{img}}_m</span> 与 <span class=\"kb-math kb-math-inline\">x^{\\text{state}}_1,\\dots,x^{\\text{state}}_k</span>。PaLM-E 用投影器把这些连续向量映射到与词向量同维的嵌入空间：</p>\n<div class=\"kb-math kb-math-display\">e_i^{\\text{img}} = W_{\\text{img}} x_i^{\\text{img}}, \\qquad\ne_j^{\\text{state}} = W_{\\text{state}} x_j^{\\text{state}}</div>\n<p>然后直接把它们与文本 token embedding 串接成一个序列：</p>\n<div class=\"kb-math kb-math-display\">[e_1^{\\text{img}}, \\dots, e_m^{\\text{img}},\n e_1^{\\text{state}}, \\dots, e_k^{\\text{state}},\n e(t_1), \\dots, e(t_n)]</div>\n<p>论文把这种输入称为 <strong>embodied multimodal sentences</strong>。它的重要性在于，语言模型看到的不再只是“场景描述文本”，而是场景本身的连续表示。这使模型在同一个上下文窗口里同时拥有几何、视觉、语义和任务信息。</p>\n<h5>核心机制二：单个骨干同时做互联网任务和机器人任务</h5>\n<p>PaLM-E 的另一个重要设计是联合训练。模型并不是只在机器人轨迹上训练，而是同时保留大规模视觉语言任务，如 VQA 和 captioning。这样做不是简单为了“多任务更大”，而是为了利用互联网数据维持语言和视觉常识，同时用机器人数据把这些常识拉回到行动相关的 grounded 表示上。</p>\n<p>从训练角度看，本质仍然是一个自回归语言模型目标：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}\n= -\\sum_{t} \\log p_\\theta(y_t \\mid y_{&lt;t}, x_{\\text{img}}, x_{\\text{state}}, \\text{text})</div>\n<p>区别在于条件前缀已经包含连续感知 token。论文观察到，这种训练不仅没有破坏原有视觉语言能力，反而出现明显正迁移。例如加入机器人数据后，模型在 OK-VQA 等任务上还能继续收益；反过来，保留 web-scale 视觉语言训练也能改善具身推理与规划。</p>\n<div class=\"key-point\">💡 关键：PaLM-E 不是把机器人问题专门化，而是把机器人观测“语言模型化”，从而让互联网知识和具身数据在同一个骨干里发生迁移。</div>\n<h5>核心机制三：为什么它会影响后来的 VLA</h5>\n<p>PaLM-E 不一定是第一个把多模态放进 LLM 的模型，但它是最早明确把 <strong>机器人状态</strong> 也当成一等公民 token 注入超大语言模型的工作之一。这直接影响了后续很多 VLA 的设计方向：一部分方法继续沿用“先投影成 token 再自回归”这条路；另一部分方法虽然换成扩散或 flow action head，但仍保留“共享大骨干吸收视觉、语言和动作上下文”的思路。</p>\n<p>它和 Gato 的差别也很清楚。Gato 更强调“所有东西都离散化成统一 token 序列”；PaLM-E 则强调“连续感知 embedding 可以原生注入大语言模型”。这让后者更适合承接大规模语言模型的语义能力和互联网知识。</p>\n<h5>结果怎么看：它把 LLM 真正推到了机器人感知回路里</h5>\n<p>PaLM-E 最有价值的地方不是某一个 benchmark 分数，而是它把“语言模型读连续传感器”这件事做成了一个可扩展范式。最大 562B 的结果说明，随着模型变大、训练域变广，具身任务并不会天然与语言任务冲突，反而可能持续互补。这就是为什么后续很多 VLA 都可以被看作是在更高效、更强控制约束下对 PaLM-E 思路的再工程化。</p>",
      "quiz": {
        "q": "PaLM-E 中 embodied multimodal sentences 的关键作用是什么？",
        "options": [
          "把连续视觉和状态编码投影成可直接插入语言模型上下文的 token",
          "强制把所有机器人观测先转成自然语言描述再送入模型",
          "让动作生成完全脱离语言模型骨干独立训练",
          "只保留机器人数据，去掉互联网视觉语言训练"
        ],
        "answer": 0,
        "explain": "PaLM-E 的核心就在于把连续感知编码成与词向量同空间的 token 序列，直接拼进语言模型上下文，让同一个骨干同时使用语言和实时感知。"
      }
    },
    {
      "id": "moo",
      "num": 8,
      "name": "MOO",
      "fullName": "开放世界物体操作 (MOO)",
      "year": "2023.03",
      "org": "Google",
      "parent": "palm_e",
      "paperUrl": "https://arxiv.org/abs/2303.00905",
      "projectUrl": "",
      "category": "vlm_finetune",
      "motivation": "VLM提取对象掩码增强开放世界操作",
      "summary": "MOO 利用预训练的视觉语言模型（OWL-ViT）从自然语言指令中提取物体掩码，将\"开放世界物体\"的视觉概念注入视觉-语言-行动（VLA）策略 RT-1，使机器人能够零样本操作训练中从未见过的物体。",
      "keyPoints": [
        "提出 MOO 框架：将预训练 VLM 的开放世界理解能力与机器人 VLA 策略结合，无需对 VLA 策略本身做任何参数修改",
        "使用 OWL-ViT（开放世界定位视觉Transformer）作为 VLM，根据自然语言指令中的物体描述生成包围框和单像素掩码",
        "设计\"单像素掩码\"（Single-Pixel Mask）策略：在物体中心保留1个像素作为未知物体的\"概念锚点\"，既不暴露物体精确形状（防止过拟合），又提供方向性空间引导",
        "提出 CoW-MOO（Chain of Well-MOO）：将 MOO 与链式提示结合，支持复合物体操作任务（\"先拿起X，再放进Y\"），扩展至导航-操作联合任务",
        "在真实机器人上完成 1472 次评估，pick 任务成功率提升 50%+，且对训练未见过的物体类别保持鲁棒",
        "多模态输入：RGB图像 + 自然语言指令 → VLM提取掩码 → 注入RT-1策略作为辅助输入通道",
        "关键发现：简单的一像素标注比全分割掩码效果更好——验证了\"最小有效信息\"设计原则"
      ],
      "detail": "<h5>1. 核心架构</h5>\n<p><img alt=\"MOO 框架架构图\" src=\"https://ar5iv.labs.arxiv.org/html/2303.00905/assets/fig1.png\" />\n<em>图：MOO 框架概览。OWL-ViT 从 RGB 图像和自然语言指令中提取物体边界框，生成单像素掩码后作为额外通道输入 RT-1 策略网络。</em></p>\n<p>MOO 的核心架构包含三个组件：</p>\n<p><strong>(a) 视觉语言模型（VLM）：OWL-ViT</strong></p>\n<p>OWL-ViT（Open-World Localization ViT）是 Google 在 2022 年提出的开放世界目标检测模型。它结合了 Vision Transformer（ViT）作为图像编码器和一个文本编码器，通过对比学习在大量图像-文本对上预训练，具备强大的开放世界语义理解能力。MOO 使用 OWL-ViT 来完成两项任务：\n1. 从 RGB 图像中检测与自然语言描述匹配的物体\n2. 输出该物体的包围框（bounding box）和置信度得分</p>\n<p>与传统物体检测器不同，OWL-ViT 无需针对特定类别训练——它可以直接理解任意文本描述（如\"the blue cup\"或\"a small green toy\"），并定位对应物体。</p>\n<p><strong>(b) 单像素掩码生成器</strong></p>\n<p>这是 MOO 最具创新性的设计。给定 OWL-ViT 检测到的包围框，系统只保留包围框几何中心位置的 <strong>1个像素</strong> 作为掩码。具体操作：\n- 计算包围框中心坐标 <span class=\"kb-math kb-math-inline\">(x_c, y_c) = (\nrac{x_1+x_2}{2}, \nrac{y_1+y_2}{2})</span>\n- 生成一个与输入图像同尺寸的二进制掩码 <span class=\"kb-math kb-math-inline\">M</span>，其中只有 <span class=\"kb-math kb-math-inline\">M[x_c, y_c] = 1</span>，其余为 0\n- 该单像素掩码作为第4个通道（RGB+Mask）与原始RGB图像拼接，输入RT-1策略网络</p>\n<p><strong>为什么是单像素？</strong> 论文通过实验证明，全分割掩码（full segmentation mask）反而会降低性能。原因：\n- 掩码过大会遮盖物体的外观细节（颜色、纹理），而这些信息对操作至关重要\n- 过曝的掩码会鼓励策略网络依赖掩码而忽略RGB信息，导致泛化能力下降\n- 一像素标注提供了一个简洁的<em>注意力引导</em>（attention cue），告诉策略\"关注这个方向\"，同时又迫使策略必须参考RGB图像中的实际外观来理解物体</p>\n<p><strong>(c) RT-1 策略网络</strong></p>\n<p>RT-1（Robotics Transformer 1）是 Google 在 2022 年提出的视觉-语言-行动（VLA）模型。它是一个基于 Transformer 框架的端到端策略，输入为 RGB 图像序列 + 自然语言指令，输出为机械臂末端执行器的 6-DoF 动作（位置、旋转、夹爪开合）。MOO 将单像素掩码作为额外输入通道与 RGB 图像叠接，<strong>不修改 RT-1 的任何参数</strong>——这意味着所有开放世界泛化能力完全来自 VLM 提供的掩码信息。</p>\n<h5>2. 推理流程</h5>\n<pre><code>Step 1: 接收自然语言指令（如 &quot;pick up the red apple&quot;）\nStep 2: 从指令中提取物体描述短语 &quot;red apple&quot;\nStep 3: OWL-ViT 在 RGB 图像上定位 &quot;red apple&quot;，输出包围框\nStep 4: 计算包围框中心，生成单像素掩码\nStep 5: [RGB, Mask] 4通道输入 RT-1 策略\nStep 6: RT-1 输出动作序列，控制机械臂执行\n</code></pre>\n<h5>3. 核心公式</h5>\n<p>给定指令描述 <span class=\"kb-math kb-math-inline\">t</span>，RGB 观测 <span class=\"kb-math kb-math-inline\">I \\in \\mathbb{R}^{H \times W \times 3}</span>，OWL-ViT 输出包围框：</p>\n<p>222615\nB =     ext{OWL-ViT}(I, t) = (x_1, y_1, x_2, y_2)\n222615</p>\n<p>单像素掩码生成：</p>\n<p>222615\nM[x, y] = \begin{cases}\n1 &amp;     ext{if } x = \nrac{x_1+x_2}{2}, \\; y = \nrac{y_1+y_2}{2} \\\n0 &amp;     ext{otherwise}\n\\end{cases}\n222615</p>\n<p>策略推理：</p>\n<p>222615\na = \\pi_{   ext{RT-1}}([I, M], t)\n222615</p>\n<p>其中 <span class=\"kb-math kb-math-inline\">[I, M]</span> 表示通道维度的拼接（3+1=4通道），<span class=\"kb-math kb-math-inline\">\\pi_{\text{RT-1}}</span> 为冻结的 RT-1 策略，<strong>无任何额外训练</strong>。</p>\n<h5>4. 设计动机与哲学</h5>\n<div class=\"key-point\">💡 <strong>关键洞见</strong>：机器人操作不需要精确的语义分割。操作任务需要的不是\"物体是什么形状\"，而是\"物体在哪里\"和\"它长什么样\"。单像素提供了位置线索，RGB图像提供了外观信息，两者结合已足够。</div>\n<p><strong>传统方法的局限</strong>：\n- 分类器只能处理预定义类别集，无法泛化到未见过的物体\n- 实例分割需要像素级标注和特定类别训练\n- 端到端训练需要大量配对新物体的演示数据</p>\n<p><strong>MOO 的优势</strong>：通过 VLM 桥接自然语言和视觉感知，实现零样本泛化，无需任何额外训练数据或参数更新。</p>\n<h5>5. CoW-MOO 扩展</h5>\n<p>CoW-MOO（Chain of Well-MOO）将 MOO 扩展到复合指令：</p>\n<ul>\n<li>将复杂指令（\"pick up the apple and place it in the bowl\"）分解为原子子任务（pick apple → place in bowl）</li>\n<li>每个原子子任务独立调用 MOO 获取物体掩码</li>\n<li>通过链式提示（Chain-of-Thought prompting）串联执行</li>\n<li>扩展支持导航+操作联合任务（先导航到目标区域，再执行操作）</li>\n</ul>\n<h5>6. 关键实验发现</h5>\n<ul>\n<li><strong>Pick 任务</strong>：MOO 相比无掩码的基线 RT-1，成功率提升约 50%（从 ~30% 到 ~80%），尤其在\"未见过的物体\"子集上优势显著</li>\n<li><strong>单像素 vs 全掩码</strong>：单像素显著优于完整包围框掩码，验证了\"少即是多\"的设计原则</li>\n<li><strong>多模态消融</strong>：仅用文本或仅用掩码均不如文本+掩码组合，说明两种模态互补</li>\n<li><strong>泛化能力</strong>：对训练集中从未出现的物体类别（如特定玩具、蔬菜），MOO 仍能保持竞争力</li>\n</ul>",
      "quiz": {
        "q": "MOO 使用单像素掩码而非全分割掩码的核心原因是什么？",
        "options": [
          "单像素掩码计算速度更快，适合实时控制",
          "单像素提供位置注意力引导，同时保留RGB外观细节，防止策略过拟合于掩码形状",
          "OWL-ViT 只能输出包围框中心，无法生成完整掩码",
          "单像素掩码可以减少RT-1策略的输入维度"
        ],
        "answer": 1,
        "explain": "全分割掩码会遮盖物体外观信息并鼓励策略过度依赖掩码形状，损害泛化能力。单像素提供方向性空间引导，迫使策略必须结合RGB外观理解物体，从而实现更好的开放世界泛化。"
      }
    },
    {
      "id": "rt2",
      "num": 9,
      "name": "RT-2",
      "fullName": "机器人Transformer第二代 (RT-2)",
      "year": "2023.07",
      "org": "Google DeepMind",
      "parent": "rt1",
      "paperUrl": "https://arxiv.org/abs/2307.15818",
      "projectUrl": "",
      "category": "vlm_finetune",
      "motivation": "动作Token化实现互联网知识迁移",
      "summary": "RT-2 将视觉语言模型（PaLI-X / PaLM-E）通过将动作离散化为文本 token 的方式进行 co-fine-tuning，使 VLM 直接输出机器人动作，无需专门的动作头，从而借助大规模网络数据预训练知识在未见过的任务、物体和场景中展现出 emergent 泛化能力。",
      "keyPoints": [
        "提出了 VLA（Vision-Language-Action）范式：将机器人动作表示为文本 token，使 VLM 在保留网络知识的同时输出动作",
        "动作 tokenization：将连续动作（6-DoF 末端执行器位移）离散化为 256 个 bin，映射到模型词汇表中保留的低频 token（PaLI-X 用 8 个独立整数 token 表示，PaLM-E 覆盖 256 个保留 token）",
        "基于两个 VLM 骨干：PaLI-X（55B，视觉语言模型）和 PaLM-E（12B，具身语言模型），在机器人数据与原网络数据上 co-fine-tuning",
        "Co-fine-tuning 策略：混合机器人演示数据与原始 VLM 训练数据（如 PaLI-X 的图像描述/问答数据），防止灾难性遗忘",
        "输出约束（output constraint）：推理时强制模型只从合法动作 token 中采样，确保输出有效动作",
        "三分类 emergent 能力：符号理解（Symbol Understanding）、推理（Reasoning）、人类识别（Human Recognition），均超越仅用机器人数据训练的基线",
        "Chain-of-Thought（CoT）变体：将 CoT 推理步骤作为额外文本 token 介入，使模型先推理再输出动作，在涉及推理的任务上大幅提升",
        "55B 模型通过云端 TPU 推理，频率 1-3Hz，离线批量执行方式"
      ],
      "detail": "<p><img alt=\"RT-2 架构概览\" src=\"https://arxiv.org/html/2307.15818v2/assets/rt2_overview.png\" />\n<em>图：RT-2 框架图。左侧：预训练 VLM（PaLI-X 或 PaLM-E）在图像和文本输入上训练；右侧：将机器人数据转换为文本-动作 token 序列，与原始 VLM 数据混合进行 co-fine-tuning。推理时，输入图像和任务指令，模型直接输出动作 token 序列。</em></p>\n<h5>方法动机</h5>\n<p>传统机器人学习方法通常从头训练或仅在机器人数据上微调，缺乏利用互联网规模数据中蕴含的语义知识与视觉理解的能力。RT-1（Brohan et al., 2022）虽然展示了 Transformer 在机器人控制中的有效性，但其动作输出仍依赖专门的动作头（action head），无法直接利用大规模预训练模型的知识。RT-2 的核心洞察是：<strong>动作可以像文本一样被 tokenize</strong>——将连续动作空间离散化为有限 token，使 VLM 无需架构修改即可同时处理视觉、语言和动作。这桥接了互联网预训练知识与物理世界的操作需求。</p>\n<h5>动作 Tokenization</h5>\n<p>对于 6 自由度末端执行器动作（位置变化 Δx, Δy, Δz, 旋转变化 Δroll, Δpitch, Δyaw, 夹爪开度 g），RT-2 采用均匀离散化：</p>\n<ul>\n<li>每个动作维度被离散化为 \\<span class=\"kb-math kb-math-inline\">N = 256\\</span> 个 bin，将连续值映射到最近的 bin 索引 \\<span class=\"kb-math kb-math-inline\">a_i \\\\in \\\\{0, ..., 255\\\\}\\</span></li>\n<li><strong>PaLI-X 方案</strong>：对每个动作维度使用独立的离散 token（共 8 个整数 token，分别是 Δpos, Δrot, gripper），这些 token 在 PaLI-X 词汇表中有自然对应的数值 token；例如动作值\"125\"被分解为独立的数字 token \"1\", \"2\", \"5\"，模型通过已有词汇表中的数字 token 来表示动作</li>\n<li><strong>PaLM-E 方案</strong>：PaLM-E 的词汇表相对紧凑，RT-2 保留 256 个原本最不常用的 token，将其\"重映射\"为动作 token——即用 1 个 token 直接覆盖一个动作 bin，总共 256 个动作 token 被叠加到词汇表中存在但极少使用的 token 上</li>\n</ul>\n<div class=\"key-point\">💡 关键：PaLI-X 的方案利用了视觉语言模型中已有的数字 token 语义（\"125\"对模型有数值含义），而 PaLM-E 的方案更具灵活性但依赖覆盖低频 token。前者受益于模型对数字的已有理解，后者在 token 效率上更优。</div>\n<h5>Co-fine-tuning 策略</h5>\n<p>直接将 VLM 在机器人数据上微调会导致<strong>灾难性遗忘</strong>——模型失去原有的视觉理解和语言能力。RT-2 采用 co-fine-tuning：</p>\n<ol>\n<li><strong>混合批次</strong>：每个训练批次中按比例混合机器人演示数据和原始 VLM 训练数据（如 PaLI-X 的图像描述、VQA 数据）</li>\n<li><strong>统一格式</strong>：两种数据都被转换为文本 token 序列。机器人数据的格式为 <code>[image] Q: what action should the robot take? A: Δx=128 Δy=150 ...</code>，原 VLM 数据保持其问答格式</li>\n<li><strong>联合优化</strong>：使用标准的下一个 token 预测损失（next-token prediction loss）同时优化两种数据，无需额外的辅助损失</li>\n<li><strong>数据比例</strong>：论文通过实验确定机器人数据与原始数据的比例，平衡技能习得与知识保留</li>\n</ol>\n<p>这类似于 InstructGPT/ChatGPT 的指令微调混合策略——通过在微调中保留原始分布防止模型退化。</p>\n<h5>输出约束（Output Constraint）与推理</h5>\n<p>RT-2 在推理时面临一个关键问题：模型可能生成不代表有效动作的 token 序列。解决方法：</p>\n<ol>\n<li><strong>格式约束</strong>：预定义动作输出的合法格式（如 8 个数字 token + EOS），模型在生成时被限制只能采样符合该格式的 token</li>\n<li><strong>范围约束</strong>：每个动作维度的 token 必须在 [0, 255] 范围内；若模型尝试生成越界 token，其概率被置零，按约束重采样</li>\n<li><strong>推理效率</strong>：55B 模型以 1-3Hz 频率通过云端 TPU 推理，控制周期约 300-1000ms——这意味着 RT-2 倾向于离线批处理式执行，而非高频实时控制</li>\n</ol>\n<h5>CoT（Chain-of-Thought）变体</h5>\n<p>为进一步提升模型在涉及多步推理、语义理解的任务上的表现，RT-2 引入了 CoT 变体：</p>\n<pre><code>[image] Q: Should I move the coke can to the person with glasses?\nA: Plan: 1. Identify the coke can.\n   2. Identify the person with glasses.\n   3. Move the coke can to that person.\nAction: Δx=100 Δy=50 ... Gripper=1\n</code></pre>\n<p>模型首先输出自然语言推理步骤（Plan），再输出动作。Plan token 与 Action token 在同一个自回归序列中生成。CoT 微调需要带有 Plan 标注的演示数据——这些 Plan 可以通过 LLM 自动标注或人工标注获取。在涉及符号推理、场景理解的任务中，CoT 变体比标准 RT-2 提升 25% 以上。</p>\n<h5>Emergent 能力三分类</h5>\n<p>RT-2 的核心贡献在于证明了 VLA 模型展现出<strong>仅靠机器人数据训练无法获得的 emergent 能力</strong>，论文将其分为三类：</p>\n<ol>\n<li><strong>符号理解（Symbol Understanding）</strong>：模型理解符号与物理对象的关联——如将箭头指向的物体拿给用户，或将印有特定标志的物体放入对应垃圾桶。这要求模型将视觉符号语义映射到操作行为</li>\n<li><strong>推理（Reasoning）</strong>：涉及多步骤逻辑——如\"把不在盘子里的水果放进盘子\"，需模型首先理解场景中有哪些水果、哪些在盘子外，然后执行操作。这类能力直接受益于 VLM 预训练中习得的常识推理</li>\n<li><strong>人类识别（Human Recognition）</strong>：基于视觉特征识别人——如\"将可乐递给戴眼镜的人\"，要求模型识别人脸特征（眼镜、帽子等）并匹配到动作目标。此类能力源自 VLM 在大规模图像-文本数据中学习的人物属性理解</li>\n</ol>\n<div class=\"warn-box\">⚠️ 注意：这些 emergent 能力在仅用机器人数据训练的 RT-1 或从头训练的 VLA 中几乎不存在（接近随机水平），证明了大规模视觉语言预训练知识向机器人操作泛化的可行性。</div>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># RT-2 Co-fine-tuning 伪代码\ndef rt2_co_fine_tuning(vlm, robot_data, web_data, ratio=0.5):\n    &quot;&quot;&quot;混合机器人数据和网络数据联合训练&quot;&quot;&quot;\n    for batch in training_loader:\n        # 按比例采样\n        if random() &lt; ratio:\n            # 机器人数据: image -&gt; text_instruction -&gt; action_tokens\n            img, instruction, action = sample(robot_data)\n            action_tokens = discretize_actions(action, bins=256)\n            input_seq = f&quot;[IMG] Q: {instruction} A: &quot;\n            target_seq = action_tokens  # e.g., &quot;128 150 100 50 20 10 1&quot;\n        else:\n            # 原 VLM 数据: image captioning, VQA 等\n            img, input_seq, target_seq = sample(web_data)\n\n        # 拼接并预测下一个 token\n        full_seq = concat(img_tokens, input_seq, target_seq)\n        loss = cross_entropy(vlm(full_seq[:-1]), full_seq[1:])\n        loss.backward()\n        optimizer.step()\n\ndef inference_rt2(vlm, img, instruction):\n    &quot;&quot;&quot;推理时输出约束&quot;&quot;&quot;\n    prompt = f&quot;[IMG] Q: {instruction} A:&quot;\n    tokens = []\n    for _ in range(8):  # 8 个动作维度\n        logits = vlm(prompt + tokens)\n        # 输出约束：只允许合法动作 token\n        logits = apply_output_constraint(logits, token_idx=len(tokens))\n        next_token = sample(logits)\n        tokens.append(next_token)\n    actions = decode_actions(tokens)\n    return actions\n\ndef chain_of_thought_inference(vlm, img, instruction):\n    &quot;&quot;&quot;CoT 推理变体&quot;&quot;&quot;\n    prompt = f&quot;[IMG] Q: {instruction} A: Plan:&quot;\n    plan_tokens = vlm.generate(prompt, stop=&quot;Action:&quot;)\n    prompt += plan_tokens + &quot; Action:&quot;\n    action_tokens = constrained_sample(vlm, prompt, num_tokens=8)\n    return decode_actions(action_tokens)\n</code></pre>\n<h5>与相关工作的区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>动作输出方式</th>\n<th>预训练数据利用</th>\n<th>Emergent 能力</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>RT-1</td>\n<td>Transformer + 专用动作头</td>\n<td>无</td>\n<td>无</td>\n</tr>\n<tr>\n<td>GATO (Reed et al., 2022)</td>\n<td>多任务 token 统一，但动作离散化有限</td>\n<td>多模态预训练</td>\n<td>有限</td>\n</tr>\n<tr>\n<td>PaLM-E (Driess et al., 2023)</td>\n<td>视觉语言模型 + 动作规划输出文本，需下游执行</td>\n<td>大规模 VLM + 具身数据</td>\n<td>文本规划层</td>\n</tr>\n<tr>\n<td><strong>RT-2</strong></td>\n<td><strong>VLM 直接输出动作 token</strong></td>\n<td><strong>VLM 预训练 + co-fine-tuning</strong></td>\n<td><strong>三分类 emergent</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p>RT-2 的关键创新在于：不需要单独的动作规划层或动作头——VLM 的文本输出头直接成为动作输出通道，这使得网络预训练知识的迁移路径最短。</p>\n<h5>局限性</h5>\n<ol>\n<li><strong>无法学习新运动技能</strong>：RT-2 只能输出已有的离散化动作（如末端位移），无法学习复杂灵巧操作或动态运动技能（如跑跳、工具精细化使用）</li>\n<li><strong>推理频率限制</strong>：55B 模型的云端推理仅达 1-3Hz，不适用于需要高频闭环控制的任务</li>\n<li><strong>依赖于演示数据的动作空间</strong>：动作空间的粒度（256 bin）和类型（绝对/相对位移）由训练数据决定，灵活性受限</li>\n</ol>",
      "quiz": {
        "q": "RT-2 的 co-fine-tuning 策略中，混合原始 VLM 训练数据的主要目的是什么？",
        "options": [
          "增加训练数据量以提高模型准确率",
          "防止模型在机器人数据上微调时发生灾难性遗忘",
          "提升推理速度",
          "减少动作 token 的数量"
        ],
        "answer": 1,
        "explain": "Co-fine-tuning 中混合原始 VLM 数据（如图像描述、VQA）是为了保留模型在大规模预训练中习得的视觉理解和常识推理能力，防止仅在机器人数据上微调导致的灾难性遗忘，这正是 RT-2 emergent 能力的来源。"
      }
    },
    {
      "id": "voxposer",
      "num": 10,
      "name": "VoxPoser",
      "fullName": "体素价值图组合器 (VoxPoser)",
      "year": "2023.07",
      "org": "Stanford",
      "parent": "cliport",
      "paperUrl": "https://arxiv.org/abs/2307.05973",
      "projectUrl": "",
      "category": "spatial_3d",
      "motivation": "LLM生成3D体素价值图零样本操纵",
      "summary": "VoxPoser 把开放指令理解转化成在 3D 体素空间里合成价值图的问题，由 LLM 生成代码调用视觉 API 构造可供性图和约束图，再用 MPC 在这些值图上做闭环规划，实现真实机器人零样本操纵。",
      "keyPoints": [
        "提出 <strong>VoxPoser</strong>：用 3D voxel value map 作为语言、视觉和运动规划之间的统一中间表示",
        "感知层使用 <strong>OWL-ViT + SAM + XMem + RGB-D 重建</strong>，得到开放词汇 3D 场景表征",
        "LLM 不直接输出动作，而是输出操作 API 的代码来合成 <strong>affordance map</strong> 和 <strong>constraint map</strong>",
        "最终任务值图由多张局部值图组合而成，供 <strong>MPC / random shooting</strong> 规划器优化",
        "通过 <strong>perturbation voxels</strong> 在障碍物边界附近注入惩罚，提升避碰稳定性",
        "在真实机器人上展示了未见物体、未见指令和不同场景配置下的零样本泛化"
      ],
      "detail": "<h5>核心方法图</h5>\n<p><img alt=\"VoxPoser 方法图\" src=\"https://voxposer.github.io/media/figures/method.jpg\" />\n<em>图：VoxPoser 的三阶段流程。先把真实场景重建成 3D 体素网格，再由 LLM 生成程序组合体素值图，最后用 MPC 在值图上搜索末端执行器轨迹。</em></p>\n<h5>核心伪代码</h5>\n<pre><code class=\"language-python\"># VoxPoser: language -&gt; code -&gt; voxel value maps -&gt; MPC\n\nscene = build_voxel_scene(rgbd_frames, detector=&quot;OWL-ViT&quot;, segmenter=&quot;SAM&quot;)\nobjects = track_masks(scene, tracker=&quot;XMem&quot;)\n\nprogram = llm_generate_code(instruction, api_docs=voxel_api_reference)\n\naffordance_map = zeros(scene.shape)\nconstraint_map = zeros(scene.shape)\nexec(program, {\n    &quot;scene&quot;: scene,\n    &quot;objects&quot;: objects,\n    &quot;affordance_map&quot;: affordance_map,\n    &quot;constraint_map&quot;: constraint_map,\n})\n\ntask_map = combine_maps(affordance_map, constraint_map, perturbation_voxels=True)\ntrajectory = mpc_random_shooting(task_map, horizon=H, replanning_hz=5)\nexecute_ee_trajectory(trajectory)\n</code></pre>\n<h5>动机：为什么 LLM 不应该直接输出机器人动作</h5>\n<p>VoxPoser 面对的是开放世界零样本操纵。用户给出的指令可能是 “put the apple on the plate”, “open the drawer and place the sponge inside”, 也可能是涉及接近、避障、支撑和相对方位的组合命令。LLM 对这些语言关系有很强的先验，但它本身并不适合直接产出连续机械臂轨迹。</p>\n<p>论文因此插入了一个非常巧妙的中间层：<strong>3D 体素价值图</strong>。LLM 的任务不再是“给出动作”，而是“写程序描述哪里值得去、哪里必须避开”。这样，语言推理和机器人控制被自然解耦。LLM 负责语义组合和空间关系抽象，传统规划器负责连续轨迹搜索和闭环执行。</p>\n<p>这使系统既保留了大模型的开放词汇泛化，又没有把低层控制外包给一个并不擅长动力学约束的语言模型。</p>\n<h5>核心机制一：affordance map 和 constraint map</h5>\n<p>VoxPoser 使用一组预定义 API 让 LLM 在 3D 体素网格上“编程”。对某个任务，LLM 生成的代码通常会产出两类图：</p>\n<ul>\n<li><strong>affordance map</strong>：哪些空间区域值得末端执行器去</li>\n<li><strong>constraint map</strong>：哪些区域危险、不可达或违反任务约束</li>\n</ul>\n<p>最终任务值图可以理解为它们的加权组合：</p>\n<div class=\"kb-math kb-math-display\">F_{\\text{task}} = w_a F_{\\text{affordance}} + w_c F_{\\text{constraint}}</div>\n<p>比如执行 “从上方抓住杯子” 时，affordance map 会把杯口上方一小片空间设成高值；执行 “不要碰到桌面” 时，constraint map 会对桌面附近体素赋予负值。LLM 的优势在于它能根据语言组合这些规则，而不需要每种指令都单独训练一个策略。</p>\n<h5>核心机制二：闭环 MPC 在值图上优化轨迹</h5>\n<p>任务值图一旦构造出来，后续控制就回到了经典规划问题。给定未来 <span class=\"kb-math kb-math-inline\">H</span> 步的末端轨迹 <span class=\"kb-math kb-math-inline\">\\{\\mathbf{p}_j^e\\}_{j=1}^{H}</span>，系统希望最大化轨迹经过高值区域、避开低值区域，可写成：</p>\n<div class=\"kb-math kb-math-display\">\\max_{\\mathbf{p}_1^e,\\dots,\\mathbf{p}_H^e}\n\\sum_{j=1}^{H} F_{\\text{task}}(\\mathbf{p}_j^e)</div>\n<p>实现上，论文采用 random shooting MPC：采样多条候选轨迹，计算它们在体素值图上的累积得分，执行当前最优轨迹的首步，然后重新观测并重规划。系统以约 <span class=\"kb-math kb-math-inline\">5\\text{Hz}</span> 做闭环更新，因此即便目标物发生轻微移动、遮挡变化或局部识别误差，规划仍能在线纠正。</p>\n<h5>核心机制三：perturbation voxels 为什么有效</h5>\n<p>如果只用硬边界约束，MPC 很容易在障碍物边缘“擦边飞行”，导致真实执行时因为噪声而碰撞。VoxPoser 的做法是在约束边界附近额外布置 <strong>perturbation voxels</strong>，等价于人为扩厚危险区域，给规划器一个更平滑也更保守的代价地形。</p>\n<p>这看上去是个工程细节，但它直接决定了零样本系统能不能在真机上稳定工作。因为在没有专门为某台机器人学过碰撞恢复策略的前提下，更稳的代价景观往往比更激进的最优路径重要得多。</p>\n<div class=\"key-point\">💡 关键：VoxPoser 真正统一的不是控制网络，而是“任务价值表示”。LLM、VLM 和 MPC 都围绕这张值图协作。</div>\n<h5>结果怎么看：它证明了代码生成和几何规划可以自然结合</h5>\n<p>VoxPoser 与很多端到端 VLA 的不同点在于，它没有试图把所有能力都压进一个神经网络，而是把语言推理、场景理解和轨迹优化用一个几何中间表示连接起来。对开放世界零样本操作来说，这条路线非常强，因为它允许系统直接继承成熟的视觉工具、成熟的规划器和成熟的语言模型，各自发挥所长。</p>",
      "quiz": {
        "q": "VoxPoser 中 LLM 的直接输出为什么不是机器人动作，而是体素图操作程序？",
        "options": [
          "因为真实机器人不能执行连续控制",
          "因为程序化生成 3D affordance/constraint maps 更适合把语言关系交给规划器落到几何空间",
          "因为 LLM 无法处理任何自然语言指令",
          "因为 MPC 只能接受文本输入"
        ],
        "answer": 1,
        "explain": "VoxPoser 让 LLM 负责语义和空间关系组合，把结果写成体素值图，再由 MPC 处理连续轨迹优化。这比让 LLM 直接输出低层控制更稳，也更容易零样本泛化。"
      }
    },
    {
      "id": "roboagent",
      "num": 11,
      "name": "RoboAgent",
      "fullName": "机器人通用智能体 (RoboAgent)",
      "year": "2023.09",
      "org": "CMU/Meta",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2309.01918",
      "projectUrl": "",
      "category": "diffusion_flow",
      "motivation": "扩散模型扩充演示实现多任务泛化",
      "summary": "RoboAgent 提出了 Semantic Augmentation（语义增强）+ MT-ACT（多任务动作分块Transformer）框架，在仅 7,500 条真实操作轨迹的数据预算下，通过图像修复技术将数据扩展至 10 万条以上语义多样化轨迹，并结合 CVAE+Action Chunking 架构实现跨 12 种技能的泛化操控，解决了真实机器人数据采集成本高昂与泛化需求之间的矛盾。",
      "keyPoints": [
        "提出 <strong>Semantic Augmentation</strong>（语义增强）：利用 Stable Diffusion Inpainting 对场景背景、物体外观、纹理等进行语义级变换，在保留机器人行为轨迹的前提下实现数据乘法（7,500 → 100,000+），零额外操作成本",
        "设计 <strong>MT-ACT</strong>（Multi-Task Action Chunking Transformer）：从单任务 ACT 扩展至语言条件化的多任务策略，结合 CVAE 编码器与 Action Chunk 解码器",
        "三类互补的语义增强：<strong>场景增强</strong>（背景/桌面纹理/光照）、<strong>物体增强</strong>（交互物体外观/颜色/纹理）、<strong>任务增强</strong>（场景×物体的笛卡尔积组合）",
        "CVAE 框架建模动作分布：编码器 <span class=\"kb-math kb-math-inline\">q_\\phi(z|a,o,l)</span> → 先验 <span class=\"kb-math kb-math-inline\">p_\\theta(z|o,l)</span> → 解码器 <span class=\"kb-math kb-math-inline\">p_\\theta(a|o,l,z)</span>，KL 正则化隐空间",
        "Action Chunking 预测 K=100 步动作序列，推理采用时间集成（Temporal Ensemble）指数加权平均策略",
        "在 12 种技能（拾取放置、推拉、开门、擦拭、倾倒、堆叠等）上验证泛化：未见场景成功率从 22% 提升至 52%"
      ],
      "detail": "<h5>核心示意图</h5>\n<p><img alt=\"RoboAgent 整体框架\" src=\"https://ar5iv.labs.arxiv.org/html/2309.01918/assets/x1.png\" />\n<em>图1：RoboAgent 整体框架概览——左侧为 Semantic Augmentation 数据流水线（场景增强 + 物体增强），右侧为 MT-ACT 策略架构（视觉编码器 + 语言编码器 → CVAE → Action Chunking 解码器）</em></p>\n<p><img alt=\"语义增强示意\" src=\"https://ar5iv.labs.arxiv.org/html/2309.01918/assets/x4.png\" />\n<em>图2：语义增强示意图。(a) 场景增强：更换背景和桌面纹理；(b) 物体增强：更换交互物体外观而保留周围场景</em></p>\n<p><img alt=\"MT-ACT 架构图\" src=\"https://ar5iv.labs.arxiv.org/html/2309.01918/assets/x2.png\" />\n<em>图3：MT-ACT 详细架构——ResNet 视觉编码器 + CLIP 文本编码器 → 特征融合 → CVAE 编码器/先验网络 → Transformer Action Chunk 解码器</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># MT-ACT 训练与推理伪代码\n# ============================\n# 阶段一：Semantic Augmentation（离线）\nfor each trajectory in D_raw (7500条):\n    for each frame in trajectory:\n        # 场景增强：inpaint非交互区域\n        mask_scene = generate_scene_mask(frame)  # 背景/桌面区域\n        frame_scene_aug = StableDiffusionInpaint(frame, mask_scene, prompt=&quot;大理石桌面，现代厨房&quot;)\n\n        # 物体增强：inpaint交互物体区域\n        mask_obj = generate_object_mask(frame)   # 交互物体区域\n        frame_obj_aug = StableDiffusionInpaint(frame, mask_obj, prompt=&quot;蓝色方块&quot;)\n    # 添加到增强数据集\n    D_aug.append(scene_aug_traj, obj_aug_traj, combined_aug_traj)\n# 最终 D_aug &gt; 100,000 条轨迹\n\n# ============================\n# 阶段二：MT-ACT 训练\nfor epoch in range(num_epochs):\n    for batch in D_aug:\n        # 1. 编码观测和语言\n        f_v = ResNet(o_t)              # 视觉特征\n        f_l = CLIP(l)                  # 语言特征\n        f = concat(f_v, f_l)           # 特征融合\n\n        # 2. CVAE 编码器：编码未来动作到潜变量\n        mu_q, logvar_q = encoder(a_{t:t+K}, f)\n        z = reparameterize(mu_q, logvar_q)\n\n        # 3. CVAE 先验：仅从观测预测潜变量\n        mu_p, logvar_p = prior(f)\n\n        # 4. 解码器：从潜变量重建动作序列\n        a_hat = decoder(f, z)          # shape: [K, 7]\n\n        # 5. 计算损失\n        loss_recon = MSE(a_{t:t+K}, a_hat)\n        loss_kl = KL(N(mu_q, σ_q²) || N(mu_p, σ_p²))\n        loss = loss_recon + β * loss_kl\n\n        optimizer.step(loss)\n\n# ============================\n# MT-ACT 推理\nfor t in range(T):\n    f_v = ResNet(o_t)\n    f_l = CLIP(l)\n    f = concat(f_v, f_l)\n\n    z = sample(prior(f))               # 从先验采样\n    a_hat_{t:t+K} = decoder(f, z)      # 预测未来K步动作\n\n    # 时间集成：对重叠预测窗口加权平均\n    for k in range(K):\n        ensemble_a[t+k] += exp(-λ * age) * a_hat[t+k]\n\n    execute(a_t)                        # 执行第一步动作\n    # 每10步或高不确定性时重规划\n</code></pre>\n<h5>动机与背景</h5>\n<p>传统机器人操控策略面临三重困境：<strong>数据采集成本极高</strong>（单条轨迹需要人工遥操作或脚本编程）、<strong>场景多样性受限</strong>（物理实验室环境固定）、<strong>跨任务泛化困难</strong>（单任务策略无法迁移）。RT-1 等大规模方法需要 13 万+条轨迹才达到良好泛化，但大多数实验室无法承担如此规模的数据采集。RoboAgent 的核心洞察是：<strong>泛化瓶颈在于语义多样性而非绝对数据量</strong>——如果能无成本地将 7,500 条轨迹的语义内容丰富化（更换场景背景、物体外观），就能在小数据预算下实现泛化。</p>\n<h5>核心机制详解</h5>\n<p><strong>1. Semantic Augmentation：语义增强的三层设计</strong></p>\n<p>语义增强的本质是<strong>保持动作轨迹不变，仅修改视觉观测的语义内容</strong>。这通过 Stable Diffusion Inpainting 实现：</p>\n<ul>\n<li>\n<p><strong>场景增强</strong>：mask 覆盖桌面、背景墙壁、光照区域，prompt 控制生成新场景（如\"木质桌面→大理石桌面\"）。关键约束是被 mask 区域与未 mask 区域（机器人本体、交互物体边缘）的融合自然度。</p>\n</li>\n<li>\n<p><strong>物体增强</strong>：mask 覆盖被操作物体，prompt 控制物体外观变换（如\"红色方块→蓝色条纹方块\"）。核心技术难点在于物体 mask 的精确提取（使用 SAM 等分割模型）和生成后物体的 3D 一致性保持（虽然仅操作 2D 图像，但由于机器人策略本身以 2D 观测为输入，这种近似的分布外泛化仍然有效）。</p>\n</li>\n<li>\n<p><strong>任务增强</strong>：场景增强 × 物体增强的笛卡尔积组合。例如 50 种场景 × 10 种物体 = 500 种语义变体，确保每个技能在丰富的语义上下文中被训练。</p>\n</li>\n</ul>\n<p><strong>2. MT-ACT 架构：CVAE + Action Chunking 的融合</strong></p>\n<p>MT-ACT 从单任务 ACT 扩展为语言条件化的多任务策略，核心改动：</p>\n<ul>\n<li>\n<p><strong>语言条件化</strong>：CLIP 文本编码器提取自然语言指令特征（\"pick up the red cube\"），与 ResNet 视觉特征融合后输入 CVAE。这使得同一个策略网络能处理 12 种不同技能。</p>\n</li>\n<li>\n<p><strong>CVAE 隐变量建模</strong>：不同于确定性策略直接输出动作，CVAE 通过学习动作分布的隐变量 <span class=\"kb-math kb-math-inline\">z</span> 来捕捉多模态行为（同一观测下可能存在多种合理动作）。训练时编码器利用未来动作信息 <span class=\"kb-math kb-math-inline\">a_{t:t+K}</span> 学习 <span class=\"kb-math kb-math-inline\">z</span> 的后验，推理时从先验 <span class=\"kb-math kb-math-inline\">p(z|o,l)</span> 采样。</p>\n</li>\n<li>\n<p><strong>Action Chunking</strong>：预测 K=100 步动作序列（每个动作 7 维：<span class=\"kb-math kb-math-inline\">\\Delta x, \\Delta y, \\Delta z, \\Delta roll, \\Delta pitch, \\Delta yaw, gripper</span>）。长预测窗口使策略能够学习时间上连贯的行为，减少高频重规划带来的抖动。</p>\n</li>\n</ul>\n<p><strong>3. 损失函数与训练策略</strong></p>\n<p>总损失为动作重建损失与 KL 散度的加权和。动作重建损失驱动解码器输出准确的动作序列；KL 散度正则项约束编码器输出的后验分布接近先验，确保推理时从先验采样也能生成合理动作。<span class=\"kb-math kb-math-inline\">\\beta</span> 超参数控制两部分平衡，论文通过实验确定 <span class=\"kb-math kb-math-inline\">\\beta=1.0</span>。</p>\n<h5>与传统方法的区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>数据需求</th>\n<th>多任务</th>\n<th>泛化策略</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>BC (行为克隆)</td>\n<td>数千条/任务</td>\n<td>独立训练</td>\n<td>无</td>\n</tr>\n<tr>\n<td>ACT</td>\n<td>数百条/任务</td>\n<td>单任务</td>\n<td>隐式(Chunking)</td>\n</tr>\n<tr>\n<td>RT-1</td>\n<td>13万+条</td>\n<td>多任务</td>\n<td>大数据驱动</td>\n</tr>\n<tr>\n<td><strong>RoboAgent</strong></td>\n<td><strong>7,500条(全任务)</strong></td>\n<td><strong>多任务(语言条件化)</strong></td>\n<td><strong>语义增强+泛化架构</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p>关键区别在于 RoboAgent 是<strong>数据高效多任务</strong>范式：通过语义增强实现\"数据质量 &gt; 数据数量\"，通过 MT-ACT 统一多任务策略架构，两者协同作用才实现小数据预算下的泛化。</p>",
      "quiz": {
        "q": "RoboAgent 的 Semantic Augmentation 在进行场景增强时，必须满足的核心约束是什么？",
        "options": [
          "增强后的图像必须具有更高的分辨率",
          "机器人本体的像素区域和动作轨迹必须保持不变",
          "增强必须使用 GPT-4 生成 prompt",
          "每张图像只能增强一次"
        ],
        "answer": 1,
        "explain": "语义增强通过 Stable Diffusion Inpainting 修改图像中场景背景/物体的语义内容（如桌面纹理、物体颜色），但机器人本体和其运动轨迹必须完全保留，否则会导致观测-动作对应关系被破坏。"
      }
    },
    {
      "id": "rt_x",
      "num": 12,
      "name": "RT-X",
      "fullName": "跨形态机器人Transformer (RT-X)",
      "year": "2023.10",
      "org": "Google DeepMind / Open X-Embodiment Collaboration",
      "parent": "rt2",
      "paperUrl": "https://arxiv.org/abs/2310.08864",
      "projectUrl": "",
      "category": "transformer_policy",
      "motivation": "跨形态学习验证不同机器人互助",
      "summary": "RT-X 通过 Open X-Embodiment 的大规模跨机器人数据把 Transformer 策略从“单机器人学习器”推向“跨形态通用策略”，证明不同本体之间确实存在显著正迁移，尤其在未见技能泛化上收益很大。",
      "keyPoints": [
        "提出 <strong>Open X-Embodiment (OXE)</strong> 数据协作框架，整合 <strong>22 种机器人形态、527 项技能</strong>",
        "基于该数据训练两类策略：轻量 <strong>RT-1-X</strong> 和大模型 <strong>RT-2-X</strong>",
        "统一观测和动作接口，把不同平台映射到语言条件化末端执行器动作预测问题",
        "论文的核心结论是 <strong>positive transfer</strong>：加入其它机器人数据后，单机器人在自身未见技能上显著变强",
        "项目页报告 RT-2-X 在 emergent skills 上相对仅用本机数据训练的 RT-2 基线有约 <strong>3x</strong> 提升",
        "关键增益来自多样化数据、短时图像历史、web-scale 视觉语言预训练和更大模型容量"
      ],
      "detail": "<h5>核心总览图</h5>\n<p><img alt=\"RT-X 总览图\" src=\"https://robotics-transformer-x.github.io/img/overview.png\" />\n<em>图：RT-X 项目页总览。左侧是不同机构和机器人形态组成的 OXE，右侧是统一输入输出接口上的 RT-1-X / RT-2-X，目标是验证跨形态数据是否能为单机器人带来泛化收益。</em></p>\n<h5>核心伪代码</h5>\n<pre><code class=\"language-python\"># RT-X: joint behavior cloning over many embodiments\n\nfor batch in sample_mixed_oxe_batches():\n    obs = batch[&quot;images_history&quot;]\n    lang = batch[&quot;instruction&quot;]\n    act = batch[&quot;eef_action&quot;]   # normalized across embodiments\n\n    if model_name == &quot;rt1_x&quot;:\n        pred = rt1_x(obs, lang)\n    else:\n        pred = rt2_x(obs, lang)\n\n    loss = behavior_cloning_loss(pred, discretize(act))\n    optimizer.step(loss)\n</code></pre>\n<h5>动机：为什么机器人学习需要跨形态数据</h5>\n<p>传统机器人学习最大的问题之一是数据孤岛。每个实验室都有自己的机械臂、相机布局、动作接口和任务集合，导致策略通常只能在一个平台上学到很窄的能力。RT-X 的核心问题是：这些不同机器人之间到底有没有像自然语言任务那样的共享结构，足以支撑联合训练？</p>\n<p>论文给出的答案是肯定的。尽管不同平台的自由度、夹爪形式和场景布置差别很大，但它们仍共享大量“语言到操作”的统计规律，例如“把物体移到容器里”“把门打开”“把桌面上的东西擦干净”。如果这些规律能被统一编码，那么别的机器人收集到的数据就可能帮当前机器人学会自己数据里没有覆盖到的技能。</p>\n<p>因此 RT-X 的真正贡献不是又做了一个更大的单机 policy，而是第一次系统地证明了 <strong>跨形态协同训练</strong> 这件事在机器人领域是成立的。</p>\n<h5>核心机制一：Open X-Embodiment 的统一化</h5>\n<p>RT-X 的第一步不是模型，而是数据协议。不同机构的数据要能联合训练，至少要在任务描述、观测格式和动作语义上建立近似统一。论文将各机器人动作映射到一个标准化末端执行器控制空间，例如位姿增量和夹爪开合，并保留自然语言任务描述作为统一任务接口。</p>\n<p>从学习目标看，模型做的仍然是条件行为克隆：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}\n= -\\sum_t \\log p_\\theta(a_t \\mid o_{\\le t}, l)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">o_{\\le t}</span> 是图像历史，<span class=\"kb-math kb-math-inline\">l</span> 是语言指令。真正困难的地方不在损失函数，而在于如何让来自不同机器人、不同采样频率和不同任务分布的数据都能进入这个统一形式。OXE 正是为此建立的协作层。</p>\n<h5>核心机制二：RT-1-X 与 RT-2-X</h5>\n<p>RT-1-X 继承了 RT-1 的思路：用视觉编码器提特征、用 TokenLearner 压缩 token，再交给 Transformer 预测离散动作。它的意义在于验证一个相对轻量、工程上可部署的模型是否也能从跨形态数据受益。</p>\n<p>RT-2-X 则把跨形态学习推进到更大尺度的视觉语言骨干上。它复用 RT-2 的“把动作写成 token 序列”的思路，在更大参数量和更强 web pretraining 基础上吸收 OXE 数据。项目页与论文都强调，RT-2-X 在 emergent skills 上的收益尤其明显，这说明大模型不仅更会“看图说话”，也更会把其它机器人学到的操作概念迁移到当前机器人上。</p>\n<h5>核心机制三：为什么 positive transfer 会出现</h5>\n<p>RT-X 的实验最重要的发现是，正迁移并不是偶然噪声，而是稳定现象。其原因可以从三个层面理解。</p>\n<p>第一，语言指令提供了跨机器人共享的语义坐标系。不同本体虽然执行方式不同，但“pick up the sponge”和“open the drawer”在语义上是可对齐的。第二，视觉观测中大量对象与场景统计规律也是共享的，尤其是在桌面操作场景。第三，更大规模的 web-scale 视觉语言预训练让模型先学到更强的对象、关系和动作语义，再用机器人数据把这些知识接地到控制空间。</p>\n<p>论文的消融也支持这个解释。移除关键外部数据源、去掉短图像历史或缩小模型规模后，未见技能上的收益都会显著下滑。这说明 RT-X 的成功不是单一技巧造成的，而是数据多样性、时序建模和大模型先验共同作用的结果。</p>\n<div class=\"key-point\">💡 关键：RT-X 证明的不是“所有机器人都能共享同一个动作头”，而是“不同机器人能共享一个有迁移价值的表征与策略骨干”。</div>\n<h5>结果怎么看：它把多机器人学习从假设变成了证据</h5>\n<p>在 RT-X 之前，跨机器人联合训练常常停留在直觉层面；在 RT-X 之后，这件事第一次有了大规模定量证据。它不仅影响了后续开源底座如 Octo、OpenVLA，也改变了社区看待机器人数据的方式：别人的数据不只是参考，可能直接是你的泛化来源。</p>",
      "quiz": {
        "q": "RT-X 最核心的结论是什么？",
        "options": [
          "每种机器人都必须训练一个完全独立的策略",
          "跨机器人、跨形态的联合训练能够为单机器人带来显著正迁移",
          "只要扩大模型参数量，就不再需要语言指令",
          "机器人数据无法与 web-scale 视觉语言预训练共存"
        ],
        "answer": 1,
        "explain": "RT-X 的中心发现就是 positive transfer。不同机器人收集的数据在统一接口下可以共同训练，并显著提升单机器人对未见技能和新场景的泛化。"
      }
    },
    {
      "id": "roboflamingo",
      "num": 13,
      "name": "RoboFlamingo",
      "fullName": "机器人火烈鸟 (RoboFlamingo)",
      "year": "2023.11",
      "org": "ByteDance Research / Tsinghua University",
      "parent": "palm_e",
      "paperUrl": "https://arxiv.org/abs/2311.01378",
      "projectUrl": "",
      "category": "vlm_finetune",
      "motivation": "解耦VLM与显式策略头的高效方案",
      "summary": "RoboFlamingo 把通用视觉语言模型的单步语义理解能力和显式时序策略头解耦开来，用 OpenFlamingo 负责每一步的视觉语言表征、用轻量 LSTM 负责动作时序建模，在 CALVIN 长程操作上以更低训练成本取得了很强效果。",
      "keyPoints": [
        "提出 <strong>RoboFlamingo</strong>：针对机器人模仿学习改造视觉语言基础模型",
        "以 <strong>OpenFlamingo</strong> 为视觉语言主干，继承其跨图文预训练语义表征",
        "不把整段历史直接塞进 VLM，而是让 VLM 做 <strong>single-step perception + instruction grounding</strong>",
        "在 VLM 之后增加显式 <strong>LSTM policy head</strong>，负责累积时间历史并输出连续动作",
        "与直接把时序都压进 VLM 的 <strong>BC-Flamingo</strong> 相比，训练更高效、推理更稳定",
        "在 <strong>CALVIN</strong> 长程语言条件操作基准上取得强结果，并支持较弱算力平台上的开环部署"
      ],
      "detail": "<h5>核心框架图</h5>\n<p><img alt=\"RoboFlamingo 框架图\" src=\"https://roboflamingo.github.io/assets/images/framework.png\" />\n<em>图：RoboFlamingo 的主框架。每个时间步的图像和语言先进入 OpenFlamingo 得到高层多模态表示，再由显式时序策略头整合历史并输出动作。</em></p>\n<h5>核心伪代码</h5>\n<pre><code class=\"language-python\"># RoboFlamingo: VLM for per-step multimodal encoding + LSTM for temporal policy\n\nhidden = None\nfor t in rollout:\n    z_t = open_flamingo(image_t, instruction)   # single-step multimodal latent\n    hidden = lstm_policy(z_t, hidden)\n    action_t = action_head(hidden)\n    execute(action_t)\n\nloss = mse(action_pred, action_gt)\n</code></pre>\n<h5>动机：为什么 VLM 不适合直接承担整段控制历史</h5>\n<p>RoboFlamingo 的出发点很现实。通用视觉语言模型确实擅长理解图像和语言，但如果把整段机器人观测历史、所有动作决策和闭环控制都直接压给一个大 VLM，它会遇到两个问题：一是时序建模成本高，二是训练数据规模远小于互联网图文数据，端到端大幅微调很容易不稳。</p>\n<p>论文因此提出一个更克制的分工。VLM 只负责它最擅长的部分，也就是单步感知、对象关系理解和语言 grounding；显式策略头负责它最需要的部分，也就是短时记忆、状态累积和动作输出。这相当于把“看懂当前这一步”和“根据历史决定怎么动”拆开。</p>\n<p>这个思路与 PaLM-E 那种“把一切都注入大模型”不同，更像是在尽量保留基础模型优势的同时，把真正的控制负担交给更轻量、更稳定的策略模块。</p>\n<h5>核心机制一：single-step VLM encoding</h5>\n<p>给定当前图像 <span class=\"kb-math kb-math-inline\">o_t</span> 和语言指令 <span class=\"kb-math kb-math-inline\">l</span>，OpenFlamingo 产生单步多模态表示：</p>\n<div class=\"kb-math kb-math-display\">z_t = f_{\\text{VLM}}(o_t, l)</div>\n<p>这里的关键不是让 VLM 生成动作 token，而是把它作为一个强语义 encoder 来用。由于 OpenFlamingo 已经在大规模图文对上预训练过，<span class=\"kb-math kb-math-inline\">z_t</span> 自带丰富的对象、颜色、关系和语义条件理解能力。机器人模仿学习只需要学会如何把这个表示转成合适动作，而不必从头学图像语义。</p>\n<h5>核心机制二：显式时序策略头</h5>\n<p>单步表示 <span class=\"kb-math kb-math-inline\">z_t</span> 会被送入显式 LSTM 策略头更新隐藏状态：</p>\n<div class=\"kb-math kb-math-display\">h_t = \\mathrm{LSTM}(z_t, h_{t-1}), \\qquad\na_t = \\pi(h_t)</div>\n<p>这种结构的直觉非常直接。长程操作真正需要的是“记住前面已经做过什么、当前子任务进行到哪一步”，而不是让一个庞大视觉语言主干在每次前向里都重新解释整段历史。LSTM 把时序状态压缩成一个显式隐藏变量，既降低计算，又更适合小规模机器人数据的 imitation learning。</p>\n<p>相比之下，直接把历史 token 全塞进 VLM 的做法会让模型在有限数据上同时学习语义理解和时序控制，优化负担更重。RoboFlamingo 的实验表明，把这两者解耦后效果更稳。</p>\n<h5>核心机制三：为什么它比直接 VLM 行为克隆更高效</h5>\n<p>论文的经验结论是，机器人控制里的很多困难根本不在“识别杯子或抽屉”，而在于“跨时间保持子任务状态”。VLM 预训练已经帮模型解决了前一半问题，所以真正应该用机器人演示去学的是后一半。RoboFlamingo 恰好把训练信号集中到了显式策略头和少量适配层上。</p>\n<p>这也解释了它为何适合较低算力部署。每一步大模型前向只负责当前观测的理解，而不是把整个历史重算一遍；时序记忆被封装在一个轻量 RNN 状态里，推理和工程部署都更直接。</p>\n<div class=\"key-point\">💡 关键：RoboFlamingo 的创新不是更大的 VLM，而是把 VLM 从“控制器”退回到“高质量多模态感知器”，再用显式策略头补上时序控制。</div>\n<h5>结果怎么看：它代表了一条“基础模型 + 显式策略头”的稳健路线</h5>\n<p>RoboFlamingo 在 VLA 演化链路里很有代表性，因为它没有盲目追求把所有控制都端到端写进大模型，而是展示了一个更节制、更有效的工程答案。对于机器人数据仍然相对稀缺、但希望利用通用 VLM 语义能力的场景，这条路线直到今天都很有现实意义。</p>",
      "quiz": {
        "q": "RoboFlamingo 为什么在 VLM 后面额外加入 LSTM policy head？",
        "options": [
          "为了把图像先转换成更高分辨率的 patch",
          "为了显式建模控制历史和时序状态，避免把全部时序负担压给 VLM",
          "为了让 OpenFlamingo 只处理文本而不处理图像",
          "为了把连续动作离散成自然语言输出"
        ],
        "answer": 1,
        "explain": "RoboFlamingo 认为 VLM 更擅长单步语义理解，时序记忆与控制决策更适合由显式策略头承担。LSTM 的作用正是累积历史并输出动作。"
      }
    },
    {
      "id": "hpt",
      "num": 14,
      "name": "HPT",
      "fullName": "异构预训练Transformer (HPT)",
      "year": "2024",
      "org": "清华/Meta",
      "parent": "rt_x",
      "paperUrl": "https://proceedings.neurips.cc/paper_files/paper/2024/hash/e0f393e7980a24fd12fa6f15adfa25fb-Abstract-Conference.html",
      "projectUrl": "",
      "category": "transformer_policy",
      "motivation": "处理不同机器人本体感知差异",
      "summary": "HPT 提出异构预训练Transformer架构，通过模块化的 Stem-Trunk-Head 设计将不同机器人本体（embodiment）的异构传感器和动作空间统一映射到共享表征空间，支持大规模跨本体数据联合预训练后快速迁移到新机器人任务。",
      "keyPoints": [
        "<strong>Stem-Trunk-Head 模块化架构</strong>：感知 Stem（本体特定编码器）将异构传感器数据映射为统一 token，共享 Trunk（Transformer）在统一表征空间学习，动作 Head（本体特定解码器）将表征映射回具体动作",
        "<strong>跨本体大规模预训练</strong>：在 52 个数据集、多种机器人本体（单臂、双臂、四足、无人机等）上联合训练，总数据量超 20 万条轨迹",
        "<strong>异构感知对齐</strong>：通过可学习的 Stem 投影器将不同模态（RGB、深度、关节状态、IMU 等）和不同数量的传感器统一为固定长度的 token 序列",
        "<strong>动作空间解耦</strong>：Head 模块针对不同本体（位置控制、速度控制、关节力矩等）输出相应格式的动作，支持离散和连续动作",
        "<strong>迁移学习高效</strong>：新机器人仅需少量数据微调 Stem 和 Head，冻结 Trunk 权重保持通用表征能力",
        "<strong>缩放定律验证</strong>：预训练数据量和模型参数量与下游任务性能呈正相关，验证了机器人基础模型的缩放潜力"
      ],
      "detail": "<h5>4.1 核心示意图</h5>\n<p><img alt=\"HPT 架构图\" src=\"https://liruiw.github.io/hpt/media/figures/framework.png\" />\n<em>图：HPT 的 Stem-Trunk-Head 模块化架构，不同机器人本体通过共享 Trunk 实现表征统一</em></p>\n<p><img alt=\"HPT 概念图\" src=\"https://liruiw.github.io/hpt/media/figures/concept.png\" />\n<em>图：HPT 核心思想——不同本体（embodiment）的感知和动作通过可学习的投影和反投影模块对齐到共享空间</em></p>\n<h5>4.2 算法伪代码</h5>\n<pre><code class=\"language-python\"># HPT 前向传播核心流程\ndef hpt_forward(obs, embodiment_id):\n    # 1. Stem: 本体特定编码，将异构观测投影为统一token序列\n    # obs 可以是任意数量/模态的传感器数据\n    tokens = stem[embodiment_id](obs)  # stem: 可学习的线性投影或浅层MLP\n\n    # 2. Trunk: 共享Transformer处理统一token序列\n    # trunk在所有本体间共享权重\n    unified_repr = trunk(tokens)  # Multi-head Self-Attention + FFN\n\n    # 3. Head: 本体特定解码，输出对应动作格式\n    action = head[embodiment_id](unified_repr)\n    return action\n\n# 预训练阶段：在所有数据集上联合训练\nfor batch in mixed_embodiment_dataloader:\n    action_pred = hpt_forward(batch.obs, batch.embodiment_id)\n    loss = behavior_cloning_loss(action_pred, batch.action)\n    loss.backward()\n    optimizer.step()\n\n# 迁移阶段：冻结trunk，仅微调stem和head\ntrunk.requires_grad = False\nfor batch in new_robot_dataloader:\n    action_pred = hpt_forward(batch.obs, new_embodiment_id)\n    loss = behavior_cloning_loss(action_pred, batch.action)\n    (stem_loss + head_loss).backward()  # 仅更新新本体的stem和head\n    optimizer.step()\n</code></pre>\n<h5>4.3 方法细节</h5>\n<p><strong>动机与背景</strong>：机器人学习领域长期面临数据稀缺问题——传统方法针对特定机器人本体从头训练策略，无法利用其他本体的大量数据。不同机器人的传感器配置（相机数量、是否有力传感器）、动作空间（关节角度 vs 末端位姿、连续 vs 离散）千差万别，直接拼接训练会导致表征空间混乱。HPT 的核心动机是将\"本体\"（embodiment）视为一个可建模的变量，通过显式的模块化设计实现异构数据的统一预训练。</p>\n<p><strong>核心机制——Stem-Trunk-Head 拆解</strong>：Stem 模块负责\"消化\"本体特异性。每个本体拥有独立的 Stem，将原始观测 <span class=\"kb-math kb-math-inline\">o_i</span>（可能是一张 RGB 图、一组关节角度、一段力传感器读数，或它们的任意组合）映射为固定数量（如 64 个）的统一维度 token 序列。映射方式灵活——对于图像用轻量 CNN/ViT patch embedding，对于低维向量用 MLP 投影 + 可学习位置编码区分不同传感器通道。Trunk 是核心的共享 Transformer，采用标准的 Multi-head Self-Attention 堆叠，在所有本体间共享权重，这正是实现知识迁移的关键。Head 模块是 Stem 的逆过程——将 Trunk 输出的统一表征解码为特定本体的动作格式，可以是末端位姿的 6D 向量、关节角度序列，甚至离散的动作 token。</p>\n<div class=\"key-point\">💡 关键：Stem 和 Head 的设计保证了 Trunk 内部始终处理<strong>相同形状</strong>的 token 序列，无论上游有多少摄像头、下游控制几个关节。这让 Trunk 成为一个真正的\"通用策略大脑\"。</div>\n<p><strong>训练与迁移流程</strong>：预训练阶段采用行为克隆（Behavior Cloning）目标，在全部 52 个数据集的混合批次上联合优化：<span class=\"kb-math kb-math-inline\">\\mathcal{L} = \\mathbb{E}_{(o, a) \\sim \\mathcal{D}} \\| \\text{Head}(\\text{Trunk}(\\text{Stem}(o))) - a \\|^2</span>（连续动作）或交叉熵（离散动作）。关键技巧是<strong>按本体平衡采样</strong>，防止大数据集本体主导梯度更新。迁移到新机器人时，冻结 Trunk 权重，仅需用少量（如 50-100 条）新本体轨迹微调新的 Stem 和 Head。这种\"即插即用\"方式大幅降低了新机器人的数据需求，同时保留了预训练学到的通用视觉-运动关联。</p>\n<p><strong>与相关工作的对比</strong>：不同于 RT-X（在固定动作空间的同构机器人间共享数据，本质是数据混合而非架构统一），HPT 首次实现了真正异构本体间的架构级统一。相比 Octo 等基于单一本体设计的通用策略模型，HPT 的模块化设计允许动态扩展新本体类型而无需修改 Trunk 结构。与传统域自适应方法（如 finetuning 全网络）相比，冻结 Trunk 的策略防止了小样本场景下的灾难性遗忘。</p>\n<h5>4.4 关键公式</h5>\n<p><strong>统一观测编码</strong>：设本体 <span class=\"kb-math kb-math-inline\">e</span> 有 <span class=\"kb-math kb-math-inline\">K_e</span> 个传感器，第 <span class=\"kb-math kb-math-inline\">k</span> 个传感器观测为 <span class=\"kb-math kb-math-inline\">\\mathbf{s}_k \\in \\mathbb{R}^{d_k}</span>。Stem 将每个传感器独立编码后拼接为统一 token 序列：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{z}_k = \\text{MLP}_k^{(e)}(\\mathbf{s}_k) \\in \\mathbb{R}^{D} \\quad \\Rightarrow \\quad \\mathbf{Z}^{(e)} = [\\mathbf{z}_1; \\mathbf{z}_2; \\dots; \\mathbf{z}_{K_e}] \\in \\mathbb{R}^{K_e \\times D}</div>\n<p>对于图像传感器，MLP 替换为轻量 CNN 或 patch embedding 投影。所有本体投影后的 token 维度 <span class=\"kb-math kb-math-inline\">D</span> 统一（如 <span class=\"kb-math kb-math-inline\">D=512</span>），但 token 数量 <span class=\"kb-math kb-math-inline\">K_e</span> 可不同。</p>\n<p><strong>共享 Transformer 处理</strong>：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{H}^{(l+1)} = \\text{LN}\\big(\\mathbf{H}^{(l)} + \\text{MHA}(\\mathbf{H}^{(l)})\\big), \\quad \\mathbf{H}^{(l+2)} = \\text{LN}\\big(\\mathbf{H}^{(l+1)} + \\text{FFN}(\\mathbf{H}^{(l+1)})\\big)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\mathbf{H}^{(0)} = \\mathbf{Z}^{(e)} + \\mathbf{P}^{(e)}</span>（<span class=\"kb-math kb-math-inline\">\\mathbf{P}^{(e)}</span> 为本体特定的可学习位置编码），MHA 为多头自注意力，FFN 为两层 MLP。</p>\n<p><strong>预训练损失（多本体联合 BC）</strong>：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{pretrain}} = \\sum_{e \\in \\mathcal{E}} \\frac{1}{|\\mathcal{D}_e|} \\sum_{(o,a) \\in \\mathcal{D}_e} \\ell\\big(\\text{Head}_e(\\text{Trunk}(\\text{Stem}_e(o))), a\\big)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\ell</span> 为 MSE（连续动作）或交叉熵（离散动作），<span class=\"kb-math kb-math-inline\">\\mathcal{E}</span> 为所有训练本体集合。</p>\n<div class=\"warn-box\">⚠️ 注意：Stem 输出的 token 数量因本体传感器数量而异，但 Trunk 中的自注意力机制天然支持变长序列，因此无需 padding 到统一长度，这避免了不必要的计算浪费。</div>",
      "quiz": {
        "q": "HPT 进行新机器人迁移训练时，以下哪个模块的权重通常被冻结？",
        "options": [
          "Stem（本体特定编码器）",
          "Trunk（共享 Transformer）",
          "Head（本体特定解码器）",
          "所有模块均参与训练"
        ],
        "answer": 1,
        "explain": "迁移时冻结 Trunk 以保留预训练的通用视觉-运动表征，仅微调新本体的 Stem 和 Head，从而在小样本场景下避免过拟合和灾难性遗忘。"
      }
    },
    {
      "id": "octo",
      "num": 15,
      "name": "Octo",
      "fullName": "开源通用机器人策略 (Octo)",
      "year": "2024.05",
      "org": "UC Berkeley / Stanford / CMU / Google DeepMind",
      "parent": "roboagent",
      "paperUrl": "https://arxiv.org/abs/2405.12213",
      "projectUrl": "",
      "category": "diffusion_flow",
      "motivation": "开源通用策略支持扩散动作头",
      "summary": "Octo 提出了一种面向多机器人、多传感器和多动作空间的开源通用机器人策略，通过模块化 token 化输入、block-wise masked Transformer 和单次主干前向配合扩散动作头，实现可扩展预训练与高效下游微调。",
      "keyPoints": [
        "提出 <strong>Octo</strong>：一个专门为开放式通用机器人策略设计的 <strong>transformer-based diffusion policy</strong>",
        "预训练数据来自 <strong>Open X-Embodiment</strong> 中筛选出的 <strong>25 个数据集、800k 条机器人轨迹</strong>",
        "模型由 <strong>输入 tokenizer + Transformer backbone + readout/action head</strong> 三段组成",
        "支持 <strong>language instruction</strong> 和 <strong>goal image</strong> 两种任务定义方式，并支持观测历史输入",
        "使用 <strong>block-wise masked attention</strong>，让任务 token 与观测 token 在变模态、变传感器场景下仍可稳定拼接",
        "引入 <strong>readout token</strong>，只读不写地从主干抽取动作条件表征，避免影响输入 token 的内部表示",
        "动作头采用 <strong>conditional diffusion decoding</strong>，只需 <strong>一次 Transformer 前向</strong>，后续多步去噪全部在小扩散头内完成",
        "强调 <strong>efficient finetuning</strong>：可在微调时新增观测模态、改动作空间、换机器人形态，而保留大部分预训练主干",
        "提供两版模型：<strong>Octo-Small 27M</strong> 与 <strong>Octo-Base 93M</strong>"
      ],
      "detail": "<h5>核心总览图</h5>\n<p><img alt=\"Octo 官方总览图\" src=\"https://arxiv.org/html/2405.12213v2/x1.png\" />\n<em>图：Octo 论文 Figure 1。模型目标不是只做单一机器人策略，而是作为可复用的通用策略初始化，在多机器人、多任务、多动作空间场景中开箱可用并可快速微调。</em></p>\n<h5>核心架构图</h5>\n<p><img alt=\"Octo 架构图\" src=\"https://arxiv.org/html/2405.12213v2/x2.png\" />\n<em>图：Octo 论文 Figure 2。左侧是任务和观测 token 化，中间是 block-wise Transformer，右侧是 readout token 与扩散动作头；底部展示了微调时新增观测和动作头的方式。</em></p>\n<h5>核心伪代码</h5>\n<pre><code class=\"language-python\"># Octo: tokenization -&gt; block-wise transformer -&gt; readout -&gt; diffusion action head\n\nT_task = tokenize_task(language=instruction, goal_image=goal_image)   # T5 + image patches\nT_obs = tokenize_observation(obs_history)                             # shallow CNN patch tokens\n\ntokens = concat(T_task, T_obs, readout_tokens())\nmask = build_blockwise_mask(tokens)                                   # task global, obs causal\n\nemb = transformer(tokens, attention_mask=mask)                        # single backbone pass\ne = emb.readout_suffix                                                # passive readout tokens\n\n# diffusion action decoding\nx_k = gaussian_noise(shape=action_chunk_shape)\nfor k in reversed(range(K)):\n    eps = diffusion_head(x_k, e, k)\n    x_k = alpha[k] * (x_k - gamma[k] * eps + sigma[k] * randn_like(x_k))\n\naction_chunk = x_k\nexecute(action_chunk)\n</code></pre>\n<h5>动机：为什么通用机器人策略不能只固定一种输入和动作格式</h5>\n<p>Octo 要解决的问题很具体。已有通用机器人策略虽然已经展示出一定跨任务和跨环境能力，但它们通常把下游用户锁死在预训练时见过的输入模态和动作空间里。比如一个模型如果只在固定第三视角 RGB、固定末端位姿控制上训练，那么遇到新的腕部相机、力传感器或关节控制动作空间时，往往就得重做大部分模型设计。对一个真正可复用的通用策略来说，这种刚性是不够的。</p>\n<p>因此 Octo 不是单纯追求更大的机器人策略，而是把“可适配性”作为第一目标来设计。论文一开始就明确要求模型必须支持不同机器人、不同传感器组合、不同任务定义方式，以及可在消费级 GPU 上快速微调。换句话说，Octo 的重点不是“零样本直接统治一切”，而是提供一个广泛可复用的策略底座，让下游机器人项目不必从头训练。</p>\n<div class=\"key-point\">💡 关键：Octo 的设计中心不是极限 zero-shot，而是“统一预训练 + 低成本适配”。这也是它和很多更封闭、更固定规格 VLA 的根本差别。</div>\n<h5>核心机制一：统一 token 化与 block-wise masked Transformer</h5>\n<p>Octo 的输入分成任务定义和观测两类。语言指令先经过分词，再送入 <strong>T5-base (111M)</strong> 得到语言 embedding tokens；图像观测和目标图像先经过浅层卷积栈，再切成 patch token。论文没有采用“重视觉编码器 + 小 Transformer”的常见路线，而是刻意使用 <strong>shallow CNN + transformer-first</strong> 设计，把大部分参数和 FLOPs 放在主干 Transformer 中统一处理。</p>\n<p>如果记任务 token 为 <span class=\"kb-math kb-math-inline\">T_T</span>，观测 token 为 <span class=\"kb-math kb-math-inline\">T_{o,t}</span>，那么主干输入可以写成按时间顺序拼接的序列：</p>\n<div class=\"kb-math kb-math-display\">[T_T,\\; T_{o,1},\\; T_{o,2},\\; \\dots]</div>\n<p>关键不只是 token 化，而是 <strong>block-wise masked attention</strong>。观测 token 只能因果地关注同一时刻或更早时刻的观测，以及所有任务 token；而不存在的观测模态则被完全 mask 掉。这使模型在训练和微调时可以自然处理“有的机器人有腕部相机、有的没有”“有的数据带语言标注、有的没有”这种真实异构数据问题。</p>\n<p>这种掩码设计的价值在于它让主干 Transformer 的输入语法保持稳定，但又允许模态组合变化。相比固定输入顺序、固定模态数量的策略架构，Octo 的 backbone 更接近一个可扩展的多模态操作系统。</p>\n<h5>核心机制二：readout token 与被动读取动作条件</h5>\n<p>Octo 一个很有辨识度的设计是 <strong>readout token</strong>。在任务和观测 token 之外，模型额外插入可学习的 <span class=\"kb-math kb-math-inline\">T_{R,t}</span>。它们的注意力规则是不对称的：readout token 可以看前面的任务和观测 token，但任务和观测 token 不会反过来看它们。论文明确强调，这意味着 readout token 只能 <strong>passively read</strong> 内部表示，而不会污染输入 token 的处理过程。</p>\n<p>这件事看似细节，实际上很重要。因为如果动作 token 或输出 token 参与双向耦合，它们可能会改变主干中任务与观测的联合表示，使微调到新动作头时更容易破坏预训练结构。现在 readout token 只负责从现有表示里“抽取”一个适合动作解码的压缩向量 <span class=\"kb-math kb-math-inline\">e</span>，再交给输出头：</p>\n<div class=\"kb-math kb-math-display\">e = T(T_l, T_g, T_o), \\qquad a = R(e)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">T(\\cdot)</span> 表示主干 Transformer，<span class=\"kb-math kb-math-inline\">R(\\cdot)</span> 表示动作 readout head。直觉上，这等于把“理解输入”和“产生动作”做了一个轻量解耦。输入主干尽量保持通用，而动作输出则通过 readout suffix 单独适配。</p>\n<div class=\"warn-box\">⚠️ 注意：readout token 不是普通的 <code>[CLS]</code> 复刻。它的重点不是做分类聚合，而是给后续动作头提供一个不干扰主干 token 交互的输出接口。</div>\n<h5>核心机制三：单次主干前向 + 条件扩散动作头</h5>\n<p>Octo 在动作建模上没有走简单的 MSE 回归，也没有走纯离散动作 token，而是用了 <strong>conditional diffusion decoding head</strong>。论文强调，一个动作预测只需要 <strong>一次 Transformer backbone 前向</strong>；得到 readout embedding <span class=\"kb-math kb-math-inline\">e</span> 之后，多步去噪都在小型扩散头里完成，不再重复调用昂贵的主干。</p>\n<p>如果从高斯噪声 <span class=\"kb-math kb-math-inline\">x_K \\sim \\mathcal{N}(0, I)</span> 开始，那么其动作去噪过程写成：</p>\n<div class=\"kb-math kb-math-display\">x_{k-1} = \\alpha \\bigl(x_k - \\gamma \\,\\epsilon_\\theta(x_k, e, k) + \\mathcal{N}(0, \\sigma^2 I)\\bigr)</div>\n<p>这里 <span class=\"kb-math kb-math-inline\">\\epsilon_\\theta(x_k, e, k)</span> 是由扩散头预测的噪声，条件是当前噪声动作、步数索引 <span class=\"kb-math kb-math-inline\">k</span> 和 readout embedding <span class=\"kb-math kb-math-inline\">e</span>。论文使用标准 cosine noise schedule，并用标准 DDPM 目标训练扩散头，即对真实动作加高斯噪声，再训练去噪网络恢复原始动作。</p>\n<p>这条路线的直觉是：机器人动作往往是连续、多峰而且存在策略多样性的。单一 MSE 容易学成“平均动作”，离散化又容易牺牲连续控制精度。扩散头在保持连续动作质量的同时，也能表达多模态动作分布。论文实验中，扩散动作头同时优于 MSE 头和离散动作预测头。</p>\n<h5>核心机制四：训练数据配方与高效微调</h5>\n<p>Octo 的预训练并不是把整个 Open X-Embodiment 生吞进去，而是筛选出 <strong>25 个</strong>带图像观测、末端增量动作且行为足够多样的子数据集，总计 <strong>800k</strong> 轨迹。数据混合时，作者会去掉过于重复、分辨率过低或任务过窄的数据集，并对更丰富的数据集加权，同时对过大的单一数据集降权。对于缺失相机通道的样本，模型使用 zero-padding；对于不同数据集的夹爪动作，则统一到“<code>+1 = open, 0 = closed</code>”的约定。</p>\n<p>更重要的是，Octo 的微调机制和架构是匹配的。论文明确说明：当下游需要加入新任务、新观测或新损失时，可以保留预训练 Transformer，只新增位置编码、轻量 encoder 或新的输出 head。实际微调时，作者发现 <strong>全模型更新</strong> 比只训动作头效果更好，但由于主干结构稳定、输入输出接口模块化，整个过程仍然很高效。论文给出的标准配方是：约 <strong>100 条 in-domain 轨迹</strong>、<strong>50k steps</strong>、统一超参数、单张 <strong>NVIDIA A5000 24GB</strong> 约 <strong>5 小时</strong>。这正是 Octo 被称为“广泛适用”的关键原因。</p>\n<h5>结果怎么看：它解决的是“可复用初始化”问题</h5>\n<p>在论文正文中，Octo 的主实验覆盖 <strong>3 个机构的 6 个真实机器人 setup</strong>，同时测试 zero-shot 和 data-efficient finetuning。项目页则把这些实验与额外展示合并成 <strong>4 个机构的 9 个真实机器人 setup</strong> 总览。对方法本身来说，更重要的是结果形态：zero-shot 时，Octo 对开放可得的 RT-1-X 具备明显优势，并在部分任务上接近 55B 的 RT-2-X；微调时，在 6 个 evaluation setups 上，Octo 平均比次优基线高 <strong>52%</strong>，而且还能适配新观测输入和新动作空间。</p>\n<p>因此，对 Octo 的最好理解不是“它是最强 zero-shot VLA”，而是“它第一次把通用机器人策略做成了一个真正能被社区拿来继续训练和迁移的开源底座”。从后续 <code>OpenVLA</code>、<code>π0</code> 到更多开源 VLA 的发展看，Octo 最大的价值正在于这条路径被验证为可行。</p>",
      "quiz": {
        "q": "Octo 中 readout token 的核心作用是什么？",
        "options": [
          "让动作 token 反向影响观测 token，从而增强控制闭环",
          "作为只读接口从任务和观测表示中提取动作条件，并交给动作头解码",
          "把连续动作离散成文本 token，便于使用交叉熵训练",
          "替代任务 token，使模型不再需要语言或目标图像输入"
        ],
        "answer": 1,
        "explain": "Octo 的 readout token 能读取前面的任务和观测 token，但不会被它们反向关注。它的作用是从主干中抽取动作条件表示，供扩散动作头解码，而不是改变输入 token 的内部计算。"
      }
    },
    {
      "id": "openvla",
      "num": 16,
      "name": "OpenVLA",
      "fullName": "开源视觉语言动作模型 (OpenVLA)",
      "year": "2024.06",
      "org": "Stanford/UCB",
      "parent": "rt2",
      "paperUrl": "https://arxiv.org/abs/2406.09246",
      "projectUrl": "",
      "category": "vlm_finetune",
      "motivation": "双视觉特征7B超越55B RT-2-X",
      "summary": "OpenVLA 提出了一种基于 7B 参数 Prismatic VLM、融合 SigLIP 与 DINOv2 双视觉编码器的开源视觉语言动作模型，将连续动作离散化为 256 个 bin，在 970k 机器人轨迹上微调后，以不到 RT-2-X 八分之一的参数量实现跨多种机器人形态的显著更高或持平的性能表现。",
      "keyPoints": [
        "提出 <strong>OpenVLA</strong>：首个完全开源的 7B 级视觉语言动作大模型，在 Open X-Embodiment 数据集上训练",
        "采用 <strong>Prismatic-7B</strong> 作为基座 VLM，其视觉塔融合 <strong>SigLIP</strong>（语义特征）与 <strong>DINOv2</strong>（空间特征）双视觉编码器，LLM 骨干为 Llama 2 7B",
        "动作预测采用 <strong>256-bin 离散化策略</strong>：将机器人末端执行器的连续位置增量（Δx, Δy, Δz, Δyaw, Δpitch, Δroll 及夹爪开合）按分位数映射为离散 token，复用 VLM 自身的 token 预测能力",
        "训练数据整合自 Open X-Embodiment 数据集的 <strong>970k 条机器人轨迹</strong>（经严格清洗，如滤除全零动作），横跨多种机器人形态",
        "在 <strong>BridgeData V2</strong>（WidowX 机器人）评测中，7B OpenVLA 的泛化成功率<strong>显著超越</strong> 55B RT-2-X；在 <strong>Google Robot</strong> 评测中性能持平",
        "支持 <strong>LoRA 参数高效微调</strong>（仅微调 1.4% 参数即匹配全参数微调性能），可在单张 A100 上 10-15 小时内适配新机器人",
        "支持 <strong>4-bit 量化推理</strong>，显存占用仅 7GB，成功率与 bfloat16 推理持平"
      ],
      "detail": "<h5>核心架构图</h5>\n<p><img alt=\"OpenVLA 架构总览\" src=\"https://ar5iv.labs.arxiv.org/html/2406.09246/assets/x1.png\" />\n<em>图 1：OpenVLA 模型架构。左侧为 Prismatic-7B VLM 基座（SigLIP+DINOv2 双视觉编码器 + Llama 2 7B LLM），右侧展示动作离散化与预测流程——连续动作经分位数 bin 映射为 256 类离散 token，由 LLM 输出 logits 解码为机器人动作。</em></p>\n<h5>动作离散化伪代码</h5>\n<pre><code class=\"language-python\"># OpenVLA 动作离散化与反离散化\n# 连续动作空间：7维（Δx, Δy, Δz, Δyaw, Δpitch, Δroll, gripper）\n\n# 1. 离散化（训练时）\nfor dim in range(7):\n    # 按全局分位数将各维动作值映射到 {0, 1, ..., 255}\n    bin = quantize(action[dim], bins[dim])  # bins[dim]: 256个分位数界限\n    action_token = dim * 256 + bin           # 共7×256=1792个独立token\n\n# 2. 反离散化（推理时）\nfor dim in range(7):\n    # 从 softmax 分布中取最大值索引\n    bin_logits = model_output[:, dim*256 : (dim+1)*256]\n    bin = argmax(bin_logits)\n    action[dim] = dequantize(bin, bins[dim])  # 还原为连续值\n</code></pre>\n<h5>方法深入解读</h5>\n<p><strong>动机与背景：为什么需要 OpenVLA？</strong></p>\n<p>在 OpenVLA 之前，以 Google DeepMind RT-2 为代表的视觉语言动作模型虽展示了将互联网预训练的 VLM 用于机器人控制的巨大潜力，但其 55B 参数模型完全闭源，研究社区无法自由获取、微调和改进。同时，已有开源策略模型（如 Octo，93M 参数）未利用大规模互联网视觉语言预训练，泛化能力有限。OpenVLA 的核心动机即填补这一空白——<strong>构建一个性能顶尖、完全开源、且可在普通 GPU 上微调和推理的 VLA 模型</strong>。</p>\n<p><strong>双视觉编码器的精妙设计：SigLIP + DINOv2 的协同互补</strong></p>\n<p>OpenVLA 的视觉塔是架构中的关键创新。基座 VLM（Prismatic-7B）在训练时发现融合 <strong>SigLIP</strong> 和 <strong>DINOv2</strong> 两种视觉特征可获得最佳下游效果。这一设计在机器人控制场景中恰好意义深远：</p>\n<ul>\n<li><strong>SigLIP</strong>（出自 Google DeepMind，ICCV 2023）采用 sigmoid loss 进行大规模图像-文本对比预训练，擅长提取<strong>语义层面</strong>的视觉特征（\"这是什么物体？\"），有助于语言指令的视觉接地（visual grounding）。</li>\n<li><strong>DINOv2</strong>（出自 Meta AI，自监督训练）擅长捕获<strong>空间结构</strong>信息（\"物体在什么位置？什么姿态？\"），对机器人精确操作的方位导向至关重要。</li>\n</ul>\n<p>两者特征经 MLP 投影到 LLM 嵌入空间后拼接，形成<strong>既\"识物\"又\"知位\"</strong>的视觉表征。论文通过消融实验直接验证：仅使用 SigLIP 的简化版 OpenVLA 仍能保持较强性能，佐证了语义特征的主导作用；但融合空间特征对于需要精细空间推理的任务尤为重要。</p>\n<div class=\"key-point\">💡 关键：这一设计与 CLIPort 等先前工作中的\"What Where\"双通路（two-stream）思想本质一脉相承，但 OpenVLA 将其内生于 VLM 框架，避免了额外的外挂模块。</div>\n<p><strong>离散化动作预测：让 LLM 原语预测机器人动作</strong></p>\n<p>如何让为文本 token 设计的 LLM 输出连续机器人动作？OpenVLA 采用了一个简洁高效的方案：<strong>将每个动作维度的连续值域划分为 256 个等频率 bin（分位数离散化）</strong>，7 个动作维度共产生 7×256=1792 个独立 token。在推理时，模型在每个维度对应的 256 个 logit 上取 argmax 选择 bin 索引，再通过反量化还原为连续动作值。</p>\n<p>这一策略的优势：\n1. <strong>复用 LLM 的完整训练栈</strong>：无需在 LLM 之上额外添加复杂的回归头，最大化利用 VLM 的表达能力；\n2. <strong>训练稳定性</strong>：分类任务比直接回归连续值更容易优化，尤其在大范围数据混合的场景中；\n3. <strong>与 RT-2 的 token 化方案一致</strong>：在语义上与 RT-2 的做法对齐，但 OpenVLA 将其扩展为真正开源的实现。</p>\n<div class=\"warn-box\">⚠️ 注意：256-bin 离散化带来一定的精度损失（每个维度 256 个分辨率），但在大范围机器人操作任务中，这种精度对成功率影响有限，而训练稳定性的收益远大于精度的微小损失。</div>\n<p><strong>训练与推理：从 64 卡大规模预训练到单卡 LoRA 微调</strong></p>\n<p>OpenVLA 的训练分为两个阶段。第一阶段是 VLM 基座（Prismatic-7B）的预训练——在 LLaVA-1.5 数据混合（含 590k 条视觉问答数据）上训练，建立视觉-语言对齐。第二阶段是在 970k 条机器人轨迹上进行动作预测微调：使用 64 张 A100 GPU，跨 14 天，batch size 2048，学习率 1e-4 配合 cosine 衰减。微调时仅预测动作 token 的交叉熵损失，视觉和语言部分保持冻结或仅轻微调整。</p>\n<p>在适配新机器人场景时，OpenVLA 展示了出色的数据效率：仅需 10-150 条专家示教，通过 LoRA（rank=32）作用于所有线性层，可在单张 A100 上 10-15 小时完成适配，训练参数仅 97.6M（不到总参数的 1.4%），性能即与全参数微调持平。推理端，4-bit 量化可将模型压缩至 7GB 显存，在消费级 GPU（如 RTX 4090）上达到 3Hz 以上的控制频率。</p>\n<p><strong>与 RT-2 的对比：小模型如何超越大模型？</strong></p>\n<p>OpenVLA 以 7B 参数量在 BridgeData V2 评测上显著优于 55B RT-2-X，这一反直觉结果源于三个要素：\n1. <strong>数据集质量</strong>：OpenVLA 的 970k 轨迹经过了更严格的清洗（如滤除 Bridge 数据集中的全零动作、修正标注错误），而 RT-2-X 使用的 350k 轨迹未经同等程度的清理；\n2. <strong>视觉特征的融合</strong>：RT-2-X 依赖 PaLI 系列的单一视觉编码器，而 OpenVLA 显式融合语义（SigLIP）和空间（DINOv2）特征，对操作类任务的视觉理解更全面；\n3. <strong>全参数机器人微调</strong>：OpenVLA 在机器人数据上全参数微调了 LLM 骨干，而 RT-2-X 的微调策略在论文中未公开细节，可能涉及额外的约束（如保留互联网知识的正则化）。</p>",
      "quiz": {
        "q": "OpenVLA 的动作离散化策略中，每个动作维度被划分为多少个 bin？",
        "options": [
          "128 个 bin，以匹配 7 维动作空间",
          "256 个 bin，通过分位数映射保证均匀分布",
          "512 个 bin，以提高动作精度",
          "1000 个 bin，每个 bin 对应一个独立的动作 token"
        ],
        "answer": 1,
        "explain": "OpenVLA 将每个动作维度（如 Δx、Δy、Δz 等）均匀划分为 256 个 bin，采用分位数离散化保证各 bin 在训练数据中的样本量均衡，7 个维度共产生 7×256=1792 个独立动作 token。"
      }
    },
    {
      "id": "gr1",
      "num": 17,
      "name": "GR-1/GR-2",
      "fullName": "傅里叶人形机器人 (GR-1/GR-2)",
      "year": "2024.09",
      "org": "Fourier",
      "parent": "rt_x",
      "paperUrl": "https://www.fftai.com/newsroom-newintech/14",
      "projectUrl": "",
      "category": "transformer_policy",
      "motivation": "人形机器人端到端全身控制",
      "summary": "GR-1 / GR-2 是傅里叶智能推出的全尺寸人形机器人平台，基于纯视觉鸟瞰图（BEV）感知与 Transformer 运动策略实现端到端全身运动控制，通过自研 FSA 系列高扭矩密度关节模组（GR-1 峰值 230 N·m，GR-2 峰值 380 N·m）、12-DoF 五指灵巧手以及 NVIDIA Isaac Lab 仿真训练管线，构建了从底层驱动到上层智能的完整技术栈，代表了 2024 年具身智能从“单一任务机器人”向“通用人形操作体”跨越的关键系统工程实践。",
      "keyPoints": [
        "<strong>双代际产品线</strong>：GR-1（2023 发布，44 自由度 / 1.65 m / 55 kg）与 GR-2（2024 年 9 月发布，53 自由度 / 1.75 m / 63 kg）形成高低搭配，GR-2 全面升级。",
        "<strong>自研关节模组 FSA</strong>：GR-1 搭载 FSA 1.0（峰值扭矩 230 N·m），GR-2 升级为 FSA 2.0（峰值扭矩 380 N·m），采用双编码器全闭环控制，提供高回驱透明度。",
        "<strong>纯视觉 BEV 感知</strong>：仅依靠机载 RGB 摄像头构建鸟瞰图（Bird's-Eye-View）表征，融合 Occupancy Network（OccNet）进行三维场景理解，不依赖外部激光雷达。",
        "<strong>Transformer 运动策略</strong>：将视觉 token 与本体感知（关节角、力矩、足底力）融合，经 Transformer 解码器自回归生成全身关节位置/扭矩指令，属于 transformer_policy 体系下与 RT-2 同源的控制范式。",
        "<strong>灵巧操作手</strong>：GR-2 配备 12 自由度五指灵巧手，集成触觉传感器，支持精细物体抓取与工具使用，使具身智能从移动导航扩展到灵巧操作。",
        "<strong>Isaac Lab 仿真管线</strong>：基于 NVIDIA Isaac Lab 与 MuJoCo 搭建高保真仿真环境，支持域随机化与并行训练，并通过 sim2real 迁移部署到物理硬件。",
        "<strong>开放生态</strong>：提供 ROS 2 SDK、数字孪生模型与 API 接口，支持研究者在平台上进行具身智能算法验证。"
      ],
      "detail": "<h5>1. 系统架构：感知–决策–控制的端到端闭环</h5>\n<p><img alt=\"GR-2 全身运动控制示意图\" src=\"https://www.fftai.com/uploads/upload/images/20240926/453ccb3f784b5a1755ae86869bfb7316.jpg\" /></p>\n<p><em>图 1：GR-2 在操作任务中展示全身协调运动能力，视觉模块实时感知环境，Transformer 策略输出全身 53 个关节的目标位置。</em></p>\n<p>GR 系列的系统架构遵循“感知 → 决策 → 执行”三层闭环，形成了一个完全端到端的控制流水线：</p>\n<pre><code>┌─────────────────────────────────────────────────────┐\n│  感知层 (Perception)                                  │\n│  RGB 图像输入 → BEV 特征提取 → OccNet 3D 占用预测      │\n│  + 本体感知（关节角 θ, 力矩 τ, 足底力 f）               │\n└───────────────────────┬─────────────────────────────┘\n                        ▼\n┌─────────────────────────────────────────────────────┐\n│  决策层 (Decision / Policy)                          │\n│  Multi-Modal Transformer Encoder                     │\n│  视觉 token + 本体 token → 跨注意力融合                │\n│  → Action Decoder 自回归输出 7/53 维目标动作            │\n└───────────────────────┬─────────────────────────────┘\n                        ▼\n┌─────────────────────────────────────────────────────┐\n│  执行层 (Actuation)                                  │\n│  目标动作 → 关节级 PD/阻抗控制器 → FSA 关节模组          │\n│  双编码器反馈 @ 1 kHz 闭环                              │\n└─────────────────────────────────────────────────────┘\n</code></pre>\n<p><strong>核心设计思想</strong>：感知与决策共享 Transformer 骨干，避免模块间信息瓶颈；执行层采用全自研关节模组，保证高带宽力控，使得上层策略输出的扭矩指令能够被高保真地执行。</p>\n<h5>2. 纯视觉 BEV + OccNet 感知管线</h5>\n<p>GR 系列不使用激光雷达，仅依靠机载 RGB 摄像头。感知管线分为两个阶段：</p>\n<ol>\n<li><strong>BEV 特征提取</strong>：多视角图像经共享卷积编码器提取特征，通过“视锥 → 体素”的 Lift-Splat-Shoot（LSS）式投影将 2D 特征提升到 3D BEV 空间。BEV 网格以机器人为中心的俯视图表示周围可通行区域与障碍物分布。</li>\n<li><strong>Occupancy Network 3D 场景理解</strong>：在 BEV 特征基础上，轻量级 OccNet 将体素空间离散化为占用概率场 \\<span class=\"kb-math kb-math-inline\">p_{\\text{occ}}(x,y,z)=\\sigma(f_{\\text{MLP}}(\\mathbf{h}_{\\text{BEV}}(x,y), z))\\</span>，实现对任意形状障碍物的精确建模。</li>\n</ol>\n<div class=\"key-point\">💡 <strong>为什么不使用激光雷达？</strong> BEV + OccNet 的纯视觉方案（1）成本大幅降低，（2）可无缝利用大规模图像预训练模型的知识迁移，（3）视觉特征天然与语言、语义任务兼容，便于扩展到 VLA（Vision-Language-Action）架构。</div>\n<h5>3. 端到端运动策略：Transformer 驱动的全身控制</h5>\n<p>运动策略将视觉感知与本体感知融合，输出全身关节指令。其核心为一个多模态 Transformer 模型：</p>\n<p><strong>输入序列构造</strong>：</p>\n<p>\\<div class=\"kb-math kb-math-display\">X = [\\text{VIS}_1, \\ldots, \\text{VIS}_N, \\text{BOD}_1, \\ldots, \\text{BOD}_M, \\text{CMD}]\n\\</div></p>\n<ul>\n<li><strong>视觉 token</strong> \\<span class=\"kb-math kb-math-inline\">\\text{VIS}_i\\</span>：BEV 特征图经 Flatten + MLP 投影得到。</li>\n<li><strong>本体感知 token</strong> \\<span class=\"kb-math kb-math-inline\">\\text{BOD}_j\\</span>：包含关节角 \\<span class=\"kb-math kb-math-inline\">\\theta\\</span>、角速度 \\<span class=\"kb-math kb-math-inline\">\\dot{\\theta}\\</span>、力矩 \\<span class=\"kb-math kb-math-inline\">\\tau\\</span>、足底力 \\<span class=\"kb-math kb-math-inline\">F_{\\text{foot}}\\</span> 等，分别投影到统一维度。</li>\n<li><strong>指令 token</strong> \\<span class=\"kb-math kb-math-inline\">\\text{CMD}\\</span>：来自高层规划的目标速度、朝向或自然语言任务描述（VLA 模式下）。</li>\n</ul>\n<p><strong>Transformer 编解码器</strong>：</p>\n<pre><code>Input: [VIS_1, ..., VIS_N | BOD_1, ..., BOD_M | CMD]\n       │\n       ▼\n  Multi-Head Self-Attention (所有 token 可见)\n       │\n       ▼\n  Cross-Attention (视觉 token → 本体 token 的条件化)\n       │\n       ▼\n  FFN + LayerNorm × L blocks\n       │\n       ▼\n  Action Head: MLP → [目标关节角 / 力矩]_{1:J}\n</code></pre>\n<p><strong>伪代码：端到端推理循环</strong></p>\n<pre><code class=\"language-python\"># GR 端到端运动策略推理（简化版）\n# 输入: rgb_images (N_views, H, W, 3), proprio (J, 4), cmd (D_cmd)\n\ndef gr_policy_forward(rgb_images, proprio, cmd):\n    # 1. BEV 感知：多视角 → 鸟瞰图特征\n    image_features = CNN_backbone(rgb_images)          # (N, C, h, w)\n    bev_tokens = lift_splat_shoot(image_features)      # (H_bev × W_bev, E)\n\n    # 2. 本体感知编码\n    proprio_input = concat([joint_pos, joint_vel, torque, foot_force])\n    body_tokens = MLP_proprio(proprio_input)           # (J, E)\n\n    # 3. 指令编码\n    cmd_token = MLP_cmd(cmd)                           # (1, E)\n\n    # 4. 拼接并送入 Transformer\n    x = concat([bev_tokens, body_tokens, cmd_token])  # (T_total, E)\n    for block in transformer_blocks:\n        x = block.self_attention(x)                   # 所有模态自由交互\n        x = block.cross_attention(x)                  # 视觉引导本体\n        x = block.ffn(x)\n\n    # 5. 提取本体 token 对应输出，解码为动作\n    body_output = x[-J-1:-1]                           # 取最后的 body 部分\n    action = action_head(body_output)                  # (J,) → 目标关节角/力矩\n\n    return action\n\n# 闭环执行：策略输出 → 底层阻抗控制器 → FSA 关节模组\ndef control_loop():\n    while True:\n        rgb = camera_capture()\n        proprio = read_joint_state()\n        cmd = high_level_planner()\n\n        target = gr_policy_forward(rgb, proprio, cmd)\n        impedance_control(target, Kp=200, Kd=5)       # 1 kHz 内环\n        sleep(0.01)\n</code></pre>\n<div class=\"warn-box\">⚠️ <strong>关键设计选择</strong>：(1) 视觉 token 与本体 token 在 Transformer 内部自由自注意，使模型能自主学习“看到台阶 → 抬高脚踝”之类的跨模态关联，无需手动特征工程；(2) 策略输出作为阻抗控制器的目标位姿而非直接输出扭矩，利用关节级 FSA 控制器的高带宽（1 kHz）补偿 sim2real 的动力学 gap。</div>\n<h5>4. FSA 关节模组与 12-DoF 灵巧手：硬件–算法协同设计</h5>\n<p><strong>FSA 2.0 关节模组</strong>是 GR-2 的核心驱动力单元，决定了力控策略的物理上限：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>指标</th>\n<th>FSA 1.0 (GR-1)</th>\n<th>FSA 2.0 (GR-2)</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>峰值扭矩</td>\n<td>230 N·m</td>\n<td>380 N·m</td>\n</tr>\n<tr>\n<td>控制方式</td>\n<td>单编码器半闭环</td>\n<td>双编码器全闭环</td>\n</tr>\n<tr>\n<td>回驱透明度</td>\n<td>中等</td>\n<td>高（适合阻抗/导纳控制）</td>\n</tr>\n<tr>\n<td>通信总线</td>\n<td>CAN</td>\n<td>EtherCAT（1 kHz 同步）</td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>GR-2 灵巧手</strong>（12 个主动自由度，集成触觉传感器）实现了从“足式移动”到“精细操作”的能力跃升：</p>\n<ul>\n<li><strong>12-DoF 分布</strong>：拇指 3 自由度、食/中/无名/小指各 2 自由度、手掌内收 1 自由度</li>\n<li><strong>触觉感知</strong>：每指尖集成 MEMS 压力传感器阵列，实时反馈接触力 \\<span class=\"kb-math kb-math-inline\">F_{\\text{tactile}} \\in \\mathbb{R}^{5 \\times 3}\\</span></li>\n<li><strong>微型 FSA 驱动</strong>：指尖关节采用微型化 FSA 模组，保持与大型关节一致的控制接口与力控带宽</li>\n</ul>\n<p><img alt=\"GR-2 灵巧手细节\" src=\"https://www.fftai.com/uploads/upload/images/20240926/c054022c288c4e58de81ff610d6f4c0b.jpg\" /></p>\n<p><em>图 2：GR-2 的 12-DoF 五指灵巧手，集成微型 FSA 关节模组与指尖触觉传感器。</em></p>\n<div class=\"key-point\">💡 <strong>软硬协同设计</strong>：FSA 的高回驱透明度意味着上层策略可以直接输出关节扭矩，利用阻抗控制实现柔顺交互——这对人形机器人在与人或物体接触时的安全性至关重要。Transformer 策略负责“预测该做什么”，FSA 模组负责“高保真地做到”。</div>\n<h5>5. Isaac Lab 仿真与 Sim2Real 迁移</h5>\n<p>训练管线基于 <strong>NVIDIA Isaac Lab</strong>（Isaac Sim 的 RL 训练框架）与 <strong>MuJoCo</strong> 物理引擎双轨并行：</p>\n<ul>\n<li><strong>域随机化</strong>：在仿真中对质量、摩擦系数、关节阻尼、视觉纹理、光照等施加随机扰动，使策略学习鲁棒特征</li>\n<li><strong>并行训练</strong>：同时运行数千个仿真环境实例，利用 GPU 加速数据采样与策略更新</li>\n<li><strong>Sim2Real 部署</strong>：训练完成的策略直接部署到物理硬件，无需微调——核心依赖 (1) 域随机化带来的分布偏移鲁棒性，(2) 底层 FSA 阻抗控制器吸收剩余动力学误差</li>\n</ul>\n<p><img alt=\"GR-2 仿真与实物对比\" src=\"https://www.fftai.com/uploads/upload/images/20240926/19112c6cce070994ee20ee854ffbad1f.jpg\" /></p>\n<p><em>图 3：GR-2 在 Isaac Lab 仿真环境中与实物对照，sim2real 迁移实现了视觉运动策略的零样本部署。</em></p>\n<h5>6. 与 RT-2 / Octo 等主流 VLA 路线的关系</h5>\n<p>GR 系列的控制架构属于 <strong>transformer_policy</strong> 类，与 RT-2、Octo 等共享“多模态输入 → Transformer → 动作输出”的基本骨架。关键差异：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th>RT-2 / Octo</th>\n<th>GR-1 / GR-2</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>感知模态</td>\n<td>图像 + 语言</td>\n<td>图像 + 本体感知 + BEV</td>\n</tr>\n<tr>\n<td>策略输出</td>\n<td>末端执行器位移 / 离散动作 token</td>\n<td>全身 53 个关节位置 / 扭矩</td>\n</tr>\n<tr>\n<td>执行对象</td>\n<td>桌面级机械臂（通常 ≤ 7 DoF）</td>\n<td>全尺寸人形机器人（44 / 53 DoF）</td>\n</tr>\n<tr>\n<td>训练数据</td>\n<td>大规模开源机器人数据集（OXE）</td>\n<td>自建仿真轨迹 + 遥操作演示</td>\n</tr>\n<tr>\n<td>力控方式</td>\n<td>通常仅位置控制</td>\n<td>位置 / 扭矩 / 阻抗三模可选</td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>GR 系列的最大工程突破</strong>在于：将 Transformer 策略从低自由度桌面操作成功扩展到高自由度人形全身控制，并通过自研 FSA 模组与灵巧手将复杂策略“落地”到物理世界。这是具身智能从“实验室演示”迈向“产业级平台”的关键一步。</p>\n<p><img alt=\"GR-1 双足步行\" src=\"https://www.fftai.com/uploads/upload/images/20240925/95b9a5c173d5dfe3e1bd488cfef79b87.png\" /></p>\n<p><em>图 4：GR-1 在室内环境中展示稳定的双足步行能力，纯视觉 BEV 感知支撑其在障碍物间自主导航。</em></p>",
      "quiz": {
        "q": "GR-2 的端到端运动策略中，视觉 token 与本体感知 token 在 Transformer 内部采用何种交互方式？",
        "options": [
          "视觉 token 先独立编码，再通过一个固定映射矩阵投影到关节空间",
          "两类 token 在自注意力层中自由交互，使模型自主学习跨模态关联",
          "视觉先独立推理出目标轨迹，本体控制器再跟踪该轨迹",
          "仅使用本体感知 token，视觉仅用于障碍物检测而不参与运动生成"
        ],
        "answer": 1,
        "explain": "GR-2 将所有模态 token 拼接后送入 Transformer 的 self-attention 层，视觉与本体 token 在每一层都能自由交互，从而使策略能够学习例如“看到台阶高度→调整踝关节角度”这样的细粒度跨模态匹配，这是端到端全身控制与分层方法的核心区别。"
      }
    },
    {
      "id": "pi0",
      "num": 18,
      "name": "π0",
      "fullName": "物理智能零号 (π0)",
      "year": "2024.10",
      "org": "Physical Intelligence",
      "parent": "octo",
      "paperUrl": "https://www.pi.website/download/pi0.pdf",
      "projectUrl": "",
      "category": "diffusion_flow",
      "motivation": "流匹配动作专家支持50Hz高频控制",
      "summary": "π0 提出了一种建立在预训练 VLM 之上的流匹配 VLA 架构，通过单独的动作专家生成连续动作块，在保留互联网级语义知识的同时实现最高 50Hz 的高频灵巧控制。",
      "keyPoints": [
        "提出 <strong>π0</strong>：首个将 <strong>预训练 VLM backbone + flow matching 动作专家</strong> 系统结合的大规模通用机器人策略",
        "主干基于 <strong>PaliGemma 3B</strong>，再增加约 <strong>300M</strong> 参数的 action expert，总参数约 <strong>3.3B</strong>",
        "使用 <strong>continuous action chunk</strong> 而不是离散动作 token，单次预测动作视野为 <strong>H = 50</strong>",
        "训练目标是 <strong>conditional flow matching</strong>，直接建模 <span class=\"kb-math kb-math-inline\">p(A_t \\mid o_t)</span> 的连续动作分布",
        "采用 <strong>双专家 Transformer</strong>：图像和语言走大 VLM 权重，机器人状态和动作走更小的 action expert 权重",
        "使用 <strong>三段 blockwise causal attention mask</strong>，兼顾 VLM 预训练分布保持与流匹配采样缓存",
        "预训练数据来自 <strong>7 种机器人配置、68 个任务、超过 10,000 小时机器人数据</strong>，并混合 OXE/Bridgev2/DROID",
        "训练 recipe 明确区分 <strong>pre-training</strong> 与 <strong>post-training</strong>：前者学广泛能力，后者学高质量任务执行策略",
        "支持 <strong>cross-embodiment</strong>：单臂、双臂、移动机械臂在同一模型中联合训练"
      ],
      "detail": "<h5>核心总览图</h5>\n<p><img alt=\"π0 官方总览图\" src=\"https://physicalintelligence.company/images/pi0-og.png\" />\n<em>图：Physical Intelligence 官方总览图。π0 的定位是一个建立在大规模多任务、多机器人数据上的通用机器人基础策略。</em></p>\n<h5>任务示意图</h5>\n<p><img alt=\"π0 洗衣折叠任务示意图\" src=\"https://www.pi.website/images/p0-hero-video-poster.jpg\" />\n<em>图：官方博客中的任务示意图。论文重点展示了洗衣折叠、桌面清理、装箱等长程灵巧操作场景。</em></p>\n<h5>核心伪代码</h5>\n<pre><code class=\"language-python\"># π0: VLM prefix + action expert + flow matching sampling\n\nobs = encode_images_and_text(images, language_prompt)     # PaliGemma VLM prefix\nstate = encode_robot_state(q_t)                           # proprioception token\n\nfor training_step in dataset:\n    A_t = future_action_chunk(horizon=50)\n    tau = sample_shifted_beta_timestep()\n    eps = randn_like(A_t)\n    A_tau = tau * A_t + (1 - tau) * eps\n\n    tokens = concat(obs, state, action_tokens(A_tau, tau))\n    v = transformer_with_action_expert(tokens)\n\n    target = A_t - eps\n    loss = mse(v.action_suffix, target)\n    update(loss)\n\n# inference\nA_tau = randn(action_shape)\nfor _ in range(10):\n    v = transformer_with_action_expert(concat(obs, state, action_tokens(A_tau, tau)))\n    A_tau = A_tau + 0.1 * v.action_suffix\nexecute(A_tau[:control_steps])\n</code></pre>\n<h5>动机：为什么 π0 不走标准 VLA 的离散动作 token 路线</h5>\n<p>π0 的问题意识很明确。已有 VLA 很擅长把图像和语言映射到动作，但主流方案通常沿用语言模型的自回归离散 token 形式来表达动作。这种做法对低频、相对粗粒度的操作还可以，但一旦任务需要更高控制频率、更多动作自由度和更连续的轨迹细节，离散动作 token 会迅速变得低效而粗糙。</p>\n<p>Physical Intelligence 的做法是反过来保留语言模型的语义骨干，但把动作建模这件事改成交给流匹配。论文把要预测的对象定义为未来动作块 <span class=\"kb-math kb-math-inline\">A_t = [a_t, a_{t+1}, \\dots, a_{t+H-1}]</span>，其中动作视野 <span class=\"kb-math kb-math-inline\">H=50</span>。这意味着模型不是每步只吐出一个短动作，而是一次性生成一段连续动作块，因此既能维持高频控制，又能在更长的局部时间窗口内保持动作连贯性。</p>\n<div class=\"key-point\">💡 关键：π0 的核心创新不是“把 VLM 用到机器人上”，而是“让 VLM 管语义，让 flow matching 管连续动作”，从而同时保住泛化能力和控制精度。</div>\n<h5>核心机制一：VLM backbone + action expert 的双专家结构</h5>\n<p>π0 的主干是一个 late-fusion VLM。图像观测会先被编码到与语言 token 相同的嵌入空间，再和语言提示一起送入 Transformer。与普通 VLM 不同的是，π0 额外引入了机器人本体状态 <span class=\"kb-math kb-math-inline\">q_t</span> 和动作块 <span class=\"kb-math kb-math-inline\">A_t^\\tau</span> 这两类机器人特有 token。</p>\n<p>论文没有把所有 token 都塞进同一组权重里硬学，而是采用了类似 <strong>mixture-of-experts</strong> 的双专家设计。图像和文本 token 走较大的 VLM backbone，直接继承 PaliGemma 的预训练语义能力；机器人状态和动作 token 则走单独的 <strong>action expert</strong>。这两个专家通过共享的 self-attention 层交互，但各自的 MLP 权重分离。这样做的直觉是：互联网预训练学到的视觉和语言知识很宝贵，不应被机器人连续控制信号大幅污染；而动作和状态又确实需要一套更贴近控制分布的参数。</p>\n<p>在实现上，PaliGemma 主干大约是 <strong>3B</strong> 量级，action expert 额外增加约 <strong>300M</strong> 参数。作者还刻意把动作专家做得更小，用更低宽度和更小 MLP 规模换取更快的多步流匹配采样速度，因为推理时动作部分需要多次迭代前向。</p>\n<h5>核心机制二：conditional flow matching 生成连续动作块</h5>\n<p>给定观测</p>\n<div class=\"kb-math kb-math-display\">o_t = [I_t^1, \\dots, I_t^n, \\ell_t, q_t]</div>\n<p>π0 要建模的是条件动作分布 <span class=\"kb-math kb-math-inline\">p(A_t \\mid o_t)</span>。这里 <span class=\"kb-math kb-math-inline\">I_t^i</span> 是多路 RGB 图像，<span class=\"kb-math kb-math-inline\">\\ell_t</span> 是语言指令，<span class=\"kb-math kb-math-inline\">q_t</span> 是本体状态。与离散 VLA 不同，动作块 <span class=\"kb-math kb-math-inline\">A_t</span> 是连续向量序列。训练时每个动作位置都对应一个 action token，但监督信号不是交叉熵，而是 conditional flow matching：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}^{\\tau}(\\theta)\n=\n\\mathbb{E}_{p(A_t \\mid o_t),\\, q(A_t^\\tau \\mid A_t)}\n\\left\\|\nv_\\theta(A_t^\\tau, o_t) - u(A_t^\\tau \\mid A_t)\n\\right\\|_2^2</div>\n<p>论文采用线性高斯概率路径：</p>\n<div class=\"kb-math kb-math-display\">q(A_t^\\tau \\mid A_t) = \\mathcal{N}(\\tau A_t, (1-\\tau) I)</div>\n<p>实际训练时，先采样高斯噪声 <span class=\"kb-math kb-math-inline\">\\epsilon \\sim \\mathcal{N}(0, I)</span>，构造 noisy action：</p>\n<div class=\"kb-math kb-math-display\">A_t^\\tau = \\tau A_t + (1-\\tau)\\epsilon</div>\n<p>然后让网络输出的向量场去逼近去噪目标：</p>\n<div class=\"kb-math kb-math-display\">u(A_t^\\tau \\mid A_t) = A_t - \\epsilon</div>\n<p>这个设计的好处是，模型直接在连续动作空间里学“如何把噪声流向真实动作块”，因此比离散化动作 token 更适合高频、平滑且多峰的机器人控制分布。</p>\n<h5>核心机制三：采样、注意力掩码与实时控制</h5>\n<p>推理时，π0 从随机噪声动作块 <span class=\"kb-math kb-math-inline\">A_t^0 \\sim \\mathcal{N}(0, I)</span> 出发，用前向 Euler 积分逐步逼近有效动作：</p>\n<div class=\"kb-math kb-math-display\">A_t^{\\tau + \\delta} = A_t^\\tau + \\delta \\, v_\\theta(A_t^\\tau, o_t)</div>\n<p>论文中使用 <strong>10 个积分步</strong>，即 <span class=\"kb-math kb-math-inline\">\\delta = 0.1</span>。这使 π0 在高频灵巧任务上能达到最高 <strong>50Hz</strong> 控制。为了让这类多次前向采样仍然足够快，模型使用了三段 blockwise causal attention mask：</p>\n<div class=\"kb-math kb-math-display\">[I_t^1, \\dots, I_t^n, \\ell_t], [q_t], [A_t^\\tau]</div>\n<p>每个 block 内部允许双向注意力，但不能看未来 block。这样做有两层作用。第一，它尽量维持图像和文本部分接近 VLM 预训练时的分布，减少新输入打乱 backbone；第二，状态 block 不会随着每次流匹配迭代变化，因此它的 key/value 可以缓存，真正每轮重算的主要是动作 suffix。这就是 π0 能把大 VLM 和多步连续采样拼起来还维持实时性的关键工程设计。</p>\n<div class=\"warn-box\">⚠️ 注意：π0 不是单纯把 diffusion 接在 VLM 后面。它专门为“VLM prefix 基本不变、动作 suffix 需要反复迭代”设计了注意力分块和更小的动作专家，这一点对实时部署非常关键。</div>\n<h5>核心机制四：cross-embodiment 预训练与 post-training 配方</h5>\n<p>论文另一半的重要贡献不在架构，而在训练 recipe。π0 的预训练混合了 <strong>7 种机器人配置、68 个任务、超过 10,000 小时机器人数据</strong>，再加上 OXE、Bridgev2、DROID 等开源数据。作者把不同机器人统一到最大维度的状态与动作空间中：低维机器人用 zero-padding 补齐，少相机平台则 mask 掉缺失图像槽位。这样单臂、双臂和移动机械臂可以进入同一个模型联合学习。</p>\n<p>但作者强调，光有大杂烩预训练还不够。预训练的目标是获得“见过很多情况”的恢复能力和广泛能力，而真正流畅、稳定、像专家一样的下游行为，需要额外的 <strong>post-training</strong>。所以 π0 把训练过程分成两段：pre-training 学广度，post-training 用更高质量、更一致的任务数据学执行风格。论文把这套配方用于洗衣折叠、桌面 bussing、微波炉放盘、装箱、杂货装袋等复杂任务，说明通用基础策略和任务特化并不是对立关系，而是前后两段训练分别承担不同职责。</p>\n<p>对 π0 最准确的理解是：它不是单篇论文里一个局部 trick，而是一套完整的 VLA 方案。它把大模型语义先验、连续动作生成、跨本体预训练和后训练配方放进同一框架，定义了后续 <code>π0.5 / π0.7 / FAST / openpi</code> 这一整条 Physical Intelligence 路线的起点。</p>",
      "quiz": {
        "q": "π0 相比早期自回归离散动作 VLA，最核心的结构变化是什么？",
        "options": [
          "保留预训练 VLM 语义主干，并增加 flow matching action expert 来生成连续动作块",
          "完全放弃语言和视觉输入，只用本体状态做 50Hz 控制",
          "把所有机器人平台拆成独立模型分别训练，避免动作空间不一致",
          "把动作离散成更长 token 序列，通过更深的解码器提升控制频率"
        ],
        "answer": 0,
        "explain": "π0 的关键不是更深的自回归动作解码，而是把连续动作生成交给 flow matching action expert，同时保留预训练 VLM 作为语义 backbone。这样它才能兼顾泛化能力和高频灵巧控制。"
      }
    },
    {
      "id": "helix",
      "num": 19,
      "name": "Helix-02",
      "fullName": "螺旋双系统架构 (Helix-02)",
      "year": "2025.02",
      "org": "Figure AI",
      "parent": "pi0",
      "paperUrl": "https://www.figure.ai/news/helix",
      "projectUrl": "",
      "category": "diffusion_flow",
      "motivation": "双系统架构支持200Hz全身控制",
      "summary": "Helix 提出了一种“System 2, System 1”双系统 VLA 架构，以 7B 参数 VLM 进行 7–9 Hz 的场景与语言理解，引导 80M 参数的 visuomotor Transformer 在 200 Hz 下输出全身连续控制，从而在一个统一模型内实现从语言到全身动作的零样本泛化，解决传统 VLA 模型无法同时兼顾高层语义推理与高频灵巧控制的瓶颈。",
      "keyPoints": [
        "双系统架构：System 2（7B VLM，7–9 Hz）负责场景理解与语言解释，System 1（80M Transformer，200 Hz）负责实时 visuomotor 控制",
        "端到端联合训练：梯度通过 S2→S1 的 latent communication vector 反向传播，两系统共用一组权重",
        "全上身控制输出：手腕位姿、手指屈伸/外展、躯干朝向、头部目标，200 Hz 连续动作空间",
        "多机器人协同：单一权重同时驱动物理两机器人完成长程操作任务，无需针对任务微调",
        "零样本物体泛化：在混乱环境中拾取数千种训练中未见过的家居物品，仅需自然语言指令",
        "纯机载低功耗 GPU 推理：全部推理在嵌入式 GPU 上完成，即用型商业部署",
        "自动终止条件预测：动作空间附加“任务完成百分比”合成量，便于多技能序列编排",
        "训练数据仅约 500 小时遥操作数据，不到先前 VLA 数据集的 5%"
      ],
      "detail": "<p><img alt=\"Helix 技能缩放曲线\" src=\"https://images.ctfassets.net/qx5k8y1u9drj/3iC6I99o9zVebi4YAct58Z/c0f52b7200aee4c9638fe9fb1d9a5788/NEW_SCALING_LAWS.png?fm=webp\" />\n<em>图: Helix vs 传统方法的技能获取缩放曲线——传统启发式操控依赖 PhD 人工编程，模仿学习依赖海量遥操作数据，而 Helix 通过自然语言即可即时获得新技能。</em></p>\n<h5>动机与背景</h5>\n<p>传统机器人系统的技能扩展面临严重的瓶颈：每新增一种行为都需要 PhD 级手工编程或数千次遥操作示范。这一范式在工业结构化环境中尚可维持，但在家庭等非结构化场景——涉及成千上万形状、颜色、材质各异的物体——完全不可扩展。</p>\n<p>同时，已有 VLA（Vision-Language-Action）模型面临根本性折衷：VLM 骨干具有极强的语义泛化能力，但推理速度太慢（通常只到个位数 Hz）；而 visuomotor 策略能跑 200 Hz，却缺乏泛化。Helix 的核心思路是将两者分离为异步协同的两个系统，打通 VLM 的常识知识到高速动作控制的链路。</p>\n<h5>System 2（S2）—— 慢思考，语义推理</h5>\n<p>S2 是承载所有语义与场景理解的核心。其设计要点：\n- <strong>骨干</strong>: 7B 参数的开源开放权重 VLM，经互联网规模预训练，在推理时微调部署于机载 GPU。\n- <strong>输入</strong>: 单目机器人图像 + 机器人状态（手腕位姿、手指位置），通过视觉-语言嵌入空间投影后输入 VLM；外加自然语言指令。\n- <strong>输出</strong>: 单个连续 latent vector，将所有语义级任务信息（目标物体类型、容器位置、协作意图等）压缩其中，传递给 S1 进行条件控制。\n- <strong>频率</strong>: 7–9 Hz，作为异步后台进程运行，持续更新共享内存中的 latent vector。</p>\n<div class=\"key-point\">💡 关键：S2 不做任何动作 token 化。它不输出离散动作码本，而是将高层次意图编码为连续 latent，避免离散化带来的信息损失和复杂的 tokenization 方案，这是 Helix 相对现有 VLA（如 RT-2 等）的重大区别。</div>\n<h5>System 1（S1）—— 快思考，实时执行</h5>\n<p>S1 是一个 80M 参数的 cross-attention encoder-decoder Transformer，专门为高速闭环控制设计：\n- <strong>视觉骨干</strong>: 全卷积多尺度视觉网络，使用纯仿真数据预训练初始化权重，以获取稳健的视觉表征。\n- <strong>输入</strong>: 与 S2 相同的图像和状态输入，但在更高频率（200 Hz）下处理，实现即时响应。\n- <strong>条件注入</strong>: S2 的 latent vector 被投影到 S1 的 token 空间，沿序列维度与 S1 视觉特征拼接，构成任务条件。\n- <strong>输出空间</strong>: 200 Hz 全上身控制，包括手腕目标位姿、手指屈伸控制、手指外展控制、躯干朝向目标、头部朝向目标，以及一个合成的“任务完成百分比”信号。</p>\n<div class=\"warn-box\">⚠️ 注意: S2 和 S1 并非简单的串行 pipeline，而是异步并行。S2 在后台慢速迭代，S1 读取最新的共享 latent vector 运行实时闭环控制。这样 S1 不会因等待 S2 推理而丢帧。</div>\n<h5>端到端训练</h5>\n<p>Helix 从原始像素和文本指令直接映射到连续动作，使用标准回归损失进行端到端训练。梯度从 S1 经 latent communication vector 反向传播到 S2，实现两个系统的联合优化。</p>\n<p>训练时引入时序偏移（temporal offset）：在 S1 和 S2 输入之间加入人工延迟，该延迟被校准为部署时 S1/S2 推理延迟的差值。这一步确保训练条件与实际部署的实时控制需求精确对齐，避免训练-部署分布漂移。</p>\n<!-- 训练伪代码 -->\n\n<pre><code class=\"language-python\"># Helix 端到端训练伪代码\nfor batch in dataloader:\n    # S2: 慢速语义推理（7-9 Hz）\n    img_s2 = batch.image_s2\n    state_s2 = batch.state_s2\n    cmd = batch.text_command\n    latent = S2(img_s2, state_s2, cmd)  # 输出连续 latent vector\n\n    # S1: 高速控制（200 Hz），用 latent 条件控制\n    # 训练中加入 temporal offset 模拟部署延迟\n    img_s1 = batch.image_s2[offset:]  # offset 模拟 S2 推理延迟\n    state_s1 = batch.state_s2[offset:]\n    action_pred = S1(img_s1, state_s1, latent)\n\n    # 回归损失\n    loss = MSE(action_pred, batch.ground_truth_action)\n    # 梯度经 latent 向量反向传播至 S2\n    loss.backward()  # 同时更新 S1 和 S2 参数\n</code></pre>\n<h5>训练数据</h5>\n<p>约 500 小时的高质量多机器人、多操作员遥操作数据。为生成自然语言条件训练对，使用自动标注 VLM 对机载摄像头视频片段进行事后指令生成（\"What instruction would you have given the robot to get the action seen in this video?\"）。所有训练期间接触的物品均被排除在评测之外，确保零样本泛化测试的严格性。</p>\n<h5>推理部署</h5>\n<p>推理管线分别在两个机载低功耗嵌入式 GPU 上运行：一个专门跑 S2（异步后台，持续消费最新观察），一个专门跑 S1（实时 200 Hz 控制循环）。S2 持续更新共享内存中的 latent vector，S1 取最新值执行闭环控制。</p>\n<h5>与传统方法的区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th>传统 VLA（如 RT-2）</th>\n<th>传统 visuomotor 策略</th>\n<th>Helix</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>泛化能力</td>\n<td>强（VLM 骨干）</td>\n<td>弱（单任务）</td>\n<td>强（S2 驱动泛化）</td>\n</tr>\n<tr>\n<td>控制频率</td>\n<td>低（~1–5 Hz）</td>\n<td>高（50–200 Hz）</td>\n<td>高（200 Hz S1）</td>\n</tr>\n<tr>\n<td>动作空间</td>\n<td>离散 token</td>\n<td>连续</td>\n<td>连续，全上身</td>\n</tr>\n<tr>\n<td>动作 token 化</td>\n<td>需要</td>\n<td>不需要</td>\n<td>不需要（latent 传递）</td>\n</tr>\n<tr>\n<td>多任务</td>\n<td>需单独头/微调</td>\n<td>单任务</td>\n<td>统一权重</td>\n</tr>\n<tr>\n<td>部署</td>\n<td>需云端</td>\n<td>可机载</td>\n<td>纯机载 GPU</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 关键创新：通过 latent vector 桥接自然语言语义与连续控制信号，Helix 从根本上避免了动作 tokenization 灾难。离散 token 在高维连续空间（如 23 自由度的全上身）中几乎不可扩展，而 latent 传递是唯一可泛化的方案。</div>",
      "quiz": {
        "q": "Helix 的双系统架构中，System 2 与 System 1 之间的通信机制是什么？",
        "options": [
          "将 S2 的语言输出转换为离散动作码本，通过查找表传给 S1",
          "S2 输出连续 latent vector，通过共享内存异步传递给 S1 作为条件输入",
          "S2 直接输出关节力矩，S1 负责平滑滤波",
          "S2 和 S1 共享同一个视觉 backbone，通过注意力矩阵交互"
        ],
        "answer": 1,
        "explain": "Helix 的核心设计是将 S2 的高层语义压缩到单个连续 latent vector，通过共享内存传递给 S1 做条件控制，避免离散 tokenization 方案的信息损失和扩展性问题。"
      }
    },
    {
      "id": "long_vla",
      "num": 20,
      "name": "Long-VLA",
      "fullName": "长程视觉语言动作 (Long-VLA)",
      "year": "2025.08",
      "org": "Westlake University / Zhejiang University / Xi'an Jiaotong University / UESTC / BUAA",
      "parent": "openvla",
      "paperUrl": "https://arxiv.org/abs/2508.19958",
      "projectUrl": "",
      "category": "transformer_policy",
      "motivation": "相位感知输入掩码解决长程任务",
      "summary": "Long-VLA 提出了首个专门面向长时程机器人操作的端到端 VLA，通过把每个子任务拆成移动阶段与交互阶段，并在注意力层引入相位感知输入掩码，缓解长链任务中的技能串联失败和视觉关注错位问题。",
      "keyPoints": [
        "提出 <strong>Long-VLA</strong>：首个明确针对 long-horizon manipulation 设计的端到端 VLA",
        "把每个子任务分解为 <strong>Moving Phase</strong> 和 <strong>Interaction Phase</strong>，并在统一模型里联合学习",
        "在原始 7 维动作上增加相位标识 <span class=\"kb-math kb-math-inline\">s_p</span>，形成 8 维动作表示",
        "提出 <strong>Phase-Aware Masking</strong>：不改输入 token 结构，只在自注意力里按阶段屏蔽不相关视觉 token",
        "使用 <strong>Grounding DINO + LoRA + FiLM</strong> 把检测框信息注入静态视角特征，增强目标定位",
        "使用 <strong>GPT-2 风格多模态 Transformer + 条件扩散动作解码器</strong> 生成动作",
        "训练目标由 <strong>扩散损失</strong> 与 <strong>语言-视觉目标对齐损失</strong> 组成",
        "构建 <strong>L-CALVIN</strong> 基准，把 CALVIN 的任务链长度从 5 步扩展到 10 步",
        "在 L-CALVIN 上，10 步任务成功率从基线 <strong>0.11</strong> 提升到 <strong>0.20</strong>，在 ABCD-&gt;D 设置下从 <strong>0.45</strong> 提升到 <strong>0.56</strong>"
      ],
      "detail": "<h5>核心总览图</h5>\n<p><img alt=\"Long-VLA 总览图\" src=\"https://long-vla.github.io/long-vla/teaser_01.png\" />\n<em>图：Long-VLA 项目页总览图。左侧对比了统一短程 VLA、两阶段模型和带输入自适应的长程模型；右侧给出了 Long-VLA 在长链任务上的总体收益。</em></p>\n<h5>真实世界平台</h5>\n<p><img alt=\"Long-VLA 真实世界设置\" src=\"https://long-vla.github.io/long-vla/real_setup.png\" />\n<em>图：真实机器人实验平台。论文用排序与清洁两类多步任务验证 Long-VLA 在未见光照和视觉干扰下的鲁棒性。</em></p>\n<h5>核心伪代码</h5>\n<pre><code class=\"language-python\"># Long-VLA: decomposition + phase-aware masking + diffusion policy\n\nfor trajectory in dataset:\n    segments = decompose_into_moving_and_interaction(trajectory)\n\n    for step in segments:\n        if step.phase == &quot;moving&quot;:\n            sp = -1\n            mask = keep(static_camera_tokens) &amp; drop(gripper_camera_tokens)\n        else:\n            sp = 1\n            mask = keep(gripper_camera_tokens) &amp; sparsify(static_camera_tokens)\n\n        action = concat(step.ee_pose, step.gripper_state, sp)\n        obs_feat = resnet18_static(step.static_image)\n        grip_feat = resnet18_gripper(step.gripper_image)\n        goal_feat = clip_goal_encoder(step.goal)\n        det_feat = film(grounding_dino(step.language_query), obs_feat)\n\n        fused = transformer([obs_feat, grip_feat, goal_feat, det_feat], attn_mask=mask)\n        loss_diff = diffusion_loss(fused, action)\n        loss_goal = info_nce(goal_feat, fused)\n        update(loss_diff + 0.1 * loss_goal)\n</code></pre>\n<h5>动机：为什么短程 VLA 到了长链任务会明显掉点</h5>\n<p>Long-VLA 的切入点很直接。现有 VLA 在单步或短序列操作上已经有效，但一旦任务从“抓一次、放一次”变成连续多步技能链，策略误差会沿时间累积，而且每个子任务之间还有明显的依赖关系。论文把这种问题概括为 <strong>skill chaining</strong>：前一阶段稍微偏一点，后续阶段就会建立在错误状态上继续执行，最终导致整条任务链崩掉。</p>\n<p>作者先做了一个很关键的预实验。他们把 CALVIN 子任务显式拆成单独的移动策略和交互策略后，5 步任务完成率从 MDT 的 <code>51.1%</code> 提升到 <code>54.2%</code>，而 2 步、3 步任务的提升更明显，分别从 <code>82.4%</code> 到 <code>91.7%</code>、从 <code>71.9%</code> 到 <code>87.5%</code>。这说明问题并不只是“模型容量不够”，而是长链任务内部本来就存在两类视觉和控制模式，硬塞进统一无差别表征会让模型学得很别扭。</p>\n<div class=\"key-point\">💡 关键：Long-VLA 的核心判断不是“长任务需要更大模型”，而是“长任务里不同阶段依赖不同视觉线索，需要显式引导模型把注意力放到对的地方”。</div>\n<h5>核心机制一：阶段分解 + 相位动作标识</h5>\n<p>Long-VLA 先把每个子任务切成两个阶段。<strong>Moving Phase</strong> 负责把机械臂移动到目标附近，主要依赖静态第三人称相机；<strong>Interaction Phase</strong> 负责按按钮、抓取、放置等精细交互，更依赖末端执行器视角。作者把切分点放在物体状态发生变化前的 <code>10</code> 到 <code>15</code> 帧，使视觉和动作边界尽量和真实操作过程对齐。</p>\n<p>为了让统一模型知道当前处于哪种阶段，论文把原本 7 维动作扩展为 8 维：</p>\n<div class=\"kb-math kb-math-display\">a_t = [x, y, z, eu_x, eu_y, eu_z, s_g, s_p]</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">(x, y, z)</span> 是末端执行器平移，<span class=\"kb-math kb-math-inline\">(eu_x, eu_y, eu_z)</span> 是欧拉角姿态，<span class=\"kb-math kb-math-inline\">s_g</span> 是夹爪状态，新增的 <span class=\"kb-math kb-math-inline\">s_p</span> 是相位标识。在移动阶段 <span class=\"kb-math kb-math-inline\">s_p=-1</span>，在交互阶段 <span class=\"kb-math kb-math-inline\">s_p=1</span>，推理开始时默认初始化为 <span class=\"kb-math kb-math-inline\">-1</span>。这个改动看起来很小，但它把“阶段信息”直接并入动作空间，使扩散解码器在预测动作时同时预测“我现在应该以哪种模式控制”。</p>\n<h5>核心机制二：Phase-Aware Masking</h5>\n<p>Long-VLA 最有辨识度的创新是相位感知输入掩码。它没有像部分分层方法那样切成两个完全独立的策略，也没有粗暴删除某一类视觉输入，而是在 self-attention 里构造二值掩码向量 <span class=\"kb-math kb-math-inline\">m</span>，再得到注意力掩码矩阵：</p>\n<div class=\"kb-math kb-math-display\">M_{ij} = m_i m_j</div>\n<p>如果当前在移动阶段，就把末端相机 token 设为无效，让模型主要依赖静态视角做导航；如果已经进入交互阶段，就保留末端相机 token，同时对静态相机中的冗余 token 做选择性屏蔽，把更多注意力让给近景精细观测。对缩放点积注意力 <span class=\"kb-math kb-math-inline\">P = QK^\\top / \\sqrt{C}</span>，论文采用掩码后的归一化形式：</p>\n<div class=\"kb-math kb-math-display\">A_{ij} = \\frac{\\exp(P_{ij}) M_{ij}}{\\sum_k \\exp(P_{ik}) M_{ik}}</div>\n<p>这里最关键的点是：<strong>输入结构没变，变的是信息流</strong>。也就是说 Long-VLA 保留了统一模型的可扩展性，但又用很轻量的方式把不同阶段的视觉关注模式硬性编码进注意力计算。相比完全分成两个网络，这种做法更容易保持数据效率和参数共享。</p>\n<h5>核心机制三：检测增强、多模态融合与扩散动作解码</h5>\n<p>Long-VLA 的整体骨架建立在 MDT 风格 VLA 上。观察编码器对静态视角 <span class=\"kb-math kb-math-inline\">s_b^t</span> 和夹爪视角 <span class=\"kb-math kb-math-inline\">s_g^t</span> 分别使用可训练的 <strong>ResNet-18</strong> 得到特征 <span class=\"kb-math kb-math-inline\">e_b</span> 和 <span class=\"kb-math kb-math-inline\">e_g</span>。目标编码器沿用冻结 <strong>CLIP</strong>，既能接语言目标，也能接未来观测图像。为了让模型在移动阶段更可靠地找到目标物体，作者还在 CALVIN 子集上用 <strong>LoRA</strong> 微调了 <strong>Grounding DINO</strong>，把检测框经位置编码后通过 <strong>FiLM</strong> 注入静态相机特征，形成检测增强表示 <span class=\"kb-math kb-math-inline\">\\hat e_b</span>。</p>\n<p>融合阶段使用 <strong>GPT-2 风格 Transformer</strong>，把多模态表示拼成</p>\n<div class=\"kb-math kb-math-display\">e_{\\text{pre}} = [\\hat e_b; e_g; e_{\\text{goal}}; e_d]</div>\n<p>再输出后续动作解码所需的上下文表示 <span class=\"kb-math kb-math-inline\">e_{\\text{post}}</span>。动作头不是离散 token，而是条件扩散模型。训练时对噪声动作做去噪回归，核心损失写成：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{Diff}} =\n\\mathbb{E}_{a \\sim p_{\\text{data}}}\n\\mathbb{E}_{n \\sim \\mathcal{N}(0, \\sigma^2 I)}\n\\left\\|\nD_\\theta(\\tilde a_t, e_{\\text{post}}, \\sigma_t) - a_t\n\\right\\|_2^2</div>\n<p>此外，论文还加入语言目标和视觉目标之间的对比对齐损失 <span class=\"kb-math kb-math-inline\">\\mathcal{L}_{\\text{Goal}}</span>，最终总损失为：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L} = \\mathcal{L}_{\\text{Diff}} + \\alpha \\mathcal{L}_{\\text{Goal}}, \\quad \\alpha = 0.1</div>\n<p>直觉上，这个额外项是为了防止模型只学会“生成看起来平滑的动作”，却忽略语言目标和视觉目标是否真的语义一致。</p>\n<h5>结果怎么看：它到底解决了什么</h5>\n<p>论文最重要的实验资产不是某个单独的成功率，而是 <strong>L-CALVIN</strong>。作者把 CALVIN 原本最长 5 步的长链评测扩到 10 步，使 skill chaining 失败在 benchmark 上能被更清楚地放大。在最难的 D-&gt;D 设置中，基线 MDT 在 10 步任务上的成功率只有 <code>0.11</code>，Long-VLA 提升到 <code>0.20</code>，相对提升约 <code>81%</code>；在 ABCD-&gt;D 泛化设置里，10 步任务从 <code>0.45</code> 提升到 <code>0.56</code>，相对提升约 <code>25%</code>。</p>\n<p>这类增益说明 Long-VLA 不是简单把短期精度做高，而是真正在更长时间尺度上减缓了误差积累。真实机器人实验也支持这个结论。论文设计了 <strong>Sorting</strong> 和 <strong>Cleaning</strong> 两个多步任务，并报告在未见光照和视觉干扰条件下仍能保持更稳的表现。对这篇工作最准确的理解是：它没有重新发明一种完全不同的 VLA 架构，而是在现有 VLA 主干上加入阶段感知机制，把“长程任务中的注意力错位”变成一个可以显式建模和优化的问题。</p>",
      "quiz": {
        "q": "Long-VLA 中 phase-aware masking 的主要作用是什么？",
        "options": [
          "在不同阶段只改变注意力可见的视觉 token，使模型把关注点切换到更相关的相机视角",
          "把所有视觉 token 压缩成更短序列，以彻底消除注意力的二次复杂度",
          "用两个独立策略网络分别预测移动动作和交互动作，避免共享参数",
          "把连续动作离散成 token，统一为语言模型式自回归生成"
        ],
        "answer": 0,
        "explain": "Long-VLA 的关键不是拆成两个独立网络，而是在统一模型里通过掩码改变注意力流向。移动阶段偏向静态相机，交互阶段偏向末端相机，从而缓解长程任务中的视觉关注错位。"
      }
    },
    {
      "id": "groot_n2",
      "num": 21,
      "name": "GR00T N2",
      "fullName": "世界动作模型 (DreamZero / GR00T N2)",
      "year": "2026.02",
      "org": "NVIDIA Research",
      "parent": "helix",
      "paperUrl": "https://arxiv.org/abs/2602.15922",
      "projectUrl": "",
      "category": "diffusion_flow",
      "motivation": "联合预测视频与动作，零样本泛化与跨本体迁移显著提升",
      "summary": "GR00T N2 的学术核心对应 NVIDIA 的 DreamZero：它不再把机器人策略只当作“看图吐动作”的 VLA，而是把未来视频和动作一起建模成 **World Action Model (WAM)**，通过联合预测物理世界演化与动作序列，把零样本泛化、跨本体迁移和真实闭环控制显著推高。",
      "keyPoints": [
        "<code>GR00T N2</code> 的论文主来源不是新闻稿本身，而是其底层研究 <strong>DreamZero / World Action Models are Zero-shot Policies</strong>",
        "提出 <strong>WAM (World Action Model)</strong>：联合预测未来视频和动作，而不是只预测动作 token 或连续动作",
        "基于 <strong>pretrained video diffusion backbone</strong>，把世界状态演化作为动作学习的稠密监督",
        "使用 <strong>14B autoregressive diffusion transformer</strong>，通过 <strong>teacher-forcing chunk-wise video denoising objective</strong> 训练",
        "模型输入包含 <strong>视觉上下文、语言指令、本体状态</strong>，并分别用 VAE / text encoder / state encoder 编码",
        "采用 <strong>autoregressive DiT + flow matching</strong>，并通过独立视频/动作解码头联合生成未来帧与动作",
        "推出 <strong>DreamZero-Flash</strong>：通过视频/动作解耦噪声日程，把实时控制从约 350ms 降到约 150ms，每个动作块可达 <strong>7Hz</strong> 闭环控制",
        "在真实机器人上，对新任务和新环境的泛化能力相对 SOTA VLA 提升 <strong>2x+</strong>，并展示 <strong>42%+</strong> 的视频级跨本体迁移收益与 <strong>30 分钟</strong> 新本体快速适配"
      ],
      "detail": "<h5>核心总览图</h5>\n<p><img alt=\"DreamZero 方法总览\" src=\"https://dreamzero0.github.io/images/project_overview.png\" />\n<em>图：DreamZero 总览。WAM 通过联合预测视频与动作，把世界物理演化直接变成策略学习目标，因此天然更适合零样本泛化、跨环境迁移和跨本体学习。</em></p>\n<h5>核心架构图</h5>\n<p><img alt=\"DreamZero 模型架构\" src=\"https://arxiv.org/html/2602.15922v1/x4.png\" />\n<em>图：DreamZero 架构。视觉上下文先经 VAE 编码，语言指令经文本编码器，本体状态经状态编码器，三者共同输入自回归 DiT 主干；主干再通过视频头和动作头联合生成未来帧与动作。</em></p>\n<h5>核心伪代码</h5>\n<pre><code class=\"language-python\"># DreamZero / GR00T N2 simplified training loop\n\nz_ctx = VAE.encode(context_frames)              # clean visual context\nz_tgt = VAE.encode(target_future_frames)        # future video latents\ne_txt = text_encoder(instruction)               # language condition\ne_state = state_encoder(proprio_history)        # robot state condition\n\nt_v, t_a = sample_noise_schedule()              # coupled in DreamZero, decoupled in Flash\nz_tgt_noisy = add_noise(z_tgt, t_v)\na_noisy = add_noise(action_chunk, t_a)\n\nh = autoregressive_DiT(\n    visual_context=z_ctx,\n    video_latents=z_tgt_noisy,\n    action_latents=a_noisy,\n    text=e_txt,\n    state=e_state,\n)\n\npred_video_velocity = video_head(h)\npred_action_velocity = action_head(h)\n\nloss = flow_matching(pred_video_velocity, z_tgt) \\\n     + flow_matching(pred_action_velocity, action_chunk)\nupdate(loss)\n</code></pre>\n<h5>动机与背景</h5>\n<p>DreamZero 这篇工作想解决的是 VLA 路线里一个越来越明显的问题。传统 VLA 很擅长语义泛化，例如理解“把苹果放进碗里”这类语言命令，但它们往往依赖动作监督直接学从观测到动作的映射，因此更容易学到“任务语义”，却不一定真的学到“物理演化”。这会导致模型一旦碰到没见过的新动作、新环境布局，或者没反复演示过的复杂接触过程时，就容易退化成几种熟悉的默认动作模式。</p>\n<p>DreamZero 的核心判断是：如果机器人真的要泛化，它就不能只学“下一步怎么动”，而要学“这个世界接下来会怎么变，同时我该怎么动”。于是它把视频和动作放进同一个生成任务里，让策略学习依赖于未来世界状态预测。论文把这种模型叫做 <strong>World Action Model</strong>。它和普通 world model 的区别在于，不是先学一个世界模型再外挂一个策略，而是直接在一个统一模型里 jointly predict video and action。</p>\n<p>这也是为什么 NVIDIA 在发布 GR00T N2 时，明确说它是基于 <strong>DreamZero research</strong> 的 <strong>world action model architecture</strong>。对页面里的这条算法来说，真正该精读的不是新闻稿，而是 DreamZero 论文本身。新闻稿只给出了产品定位和 benchmark 宣传，而论文才解释了它为什么能把真实机器人零样本泛化做到比领先 VLA 高出两倍以上。</p>\n<div class=\"key-point\">💡 关键：DreamZero 把“策略是否正确”转化为“未来视频是否合理、动作是否与视频一致”的联合建模问题，因此世界建模质量直接决定了动作策略质量。</div>\n<h5>核心机制一：联合视频与动作预测的 WAM</h5>\n<p>DreamZero 的第一条核心机制是联合建模未来视频和动作，而不是把视频仅当作输入、把动作仅当作输出。设视觉上下文为 <span class=\"kb-math kb-math-inline\">x_{\\le t}</span>，未来视频 latent 为 <span class=\"kb-math kb-math-inline\">z_{t+1:t+H}</span>，未来动作 chunk 为 <span class=\"kb-math kb-math-inline\">a_{t:t+H-1}</span>，那么模型学习的是它们的联合条件分布：</p>\n<div class=\"kb-math kb-math-display\">p(z_{t+1:t+H}, a_{t:t+H-1} \\mid x_{\\le t}, l, s_{\\le t})</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">l</span> 是语言指令，<span class=\"kb-math kb-math-inline\">s_{\\le t}</span> 是本体状态历史。直觉上，这个目标比单独预测动作更强，因为它迫使模型回答两个问题：动作是什么，以及这个动作会把世界带到什么状态。只要视频预测和动作预测之间不一致，训练就会给出明显惩罚。</p>\n<p>论文强调视频是关于世界演化的“稠密表示”。相比只从 sparse action labels 学习，视频里包含了接触、遮挡、物体相对运动、人体或机械臂姿态变化等大量物理信息。所以一旦把视频预测纳入训练目标，模型不再只是在记忆成功动作，而是在学习 underlying dynamics。也因此，DreamZero 能从更加多样、甚至不重复的 heterogeneous robot data 中有效学习，而不依赖传统机器人数据里常见的“一个任务反复示范很多次”。</p>\n<h5>核心机制二：自回归 DiT 与 teacher-forcing chunk-wise denoising</h5>\n<p>DreamZero 的模型主体是一个 <strong>14B autoregressive diffusion transformer</strong>。论文明确比较了 bidirectional 与 autoregressive 两类 WAM，最后选择自回归结构，因为它在视频-动作对齐、动作平滑性和真实控制闭环里更稳定。训练时模型并不是逐帧像普通视频生成那样从头采样整段未来，而是采用 <strong>teacher-forcing chunk-wise video denoising objective</strong>：给定干净的上下文视频块，去噪当前 chunk 的未来视频 latent 和动作 latent。</p>\n<p>如果写成简化形式，可以把其目标看成两个 flow matching 子目标的和：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L} = \\mathcal{L}_{\\text{video}} + \\lambda \\mathcal{L}_{\\text{action}}</div>\n<p>其中</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{video}} = \\left\\| v_\\theta^{(z)} - v^\\*(z_t) \\right\\|^2,\n\\qquad\n\\mathcal{L}_{\\text{action}} = \\left\\| v_\\theta^{(a)} - v^\\*(a_t) \\right\\|^2</div>\n<p>这里 <span class=\"kb-math kb-math-inline\">v_\\theta</span> 表示模型预测的 velocity field。论文采用 flow matching 而不是经典扩散 loss 的表述，本质上是在学习如何把 noisy video/action latents 推回干净目标。重要的不是公式外观，而是训练方式让视频和动作共享同一个时序主干，保证“看见的未来”和“执行的动作”来自同一内部物理想象。</p>\n<p>Figure 4 还揭示了另一个关键细节：推理时模型使用 <strong>asynchronous execution</strong>，并把真实观测回灌到 KV cache 中，抑制纯开放式 rollout 带来的误差积累。也就是说，虽然 DreamZero 会生成未来视频，但它不是盲目地长期 hallucinate；每个动作 chunk 执行后，真实世界观测又会重新校正上下文。</p>\n<div class=\"warn-box\">⚠️ 注意：DreamZero 不是“先生成整段视频再离线规划”，而是 chunk-wise、autoregressive、closed-loop 地一边想象未来、一边接收真实反馈。</div>\n<h5>核心机制三：DreamZero-Flash 与实时闭环控制</h5>\n<p>视频扩散模型真正落到机器人上时，最大问题不是生成质量，而是速度。论文提到原始 DreamZero 单 GPU 推理一个 action chunk 约需 <strong>5.7 秒</strong>，这对机器人闭环控制是不可接受的。为此，作者从三层做优化：异步执行、编译/量化/内核优化，以及最关键的 <strong>DreamZero-Flash</strong>。</p>\n<p>DreamZero-Flash 的核心思想是：动作和视频在少步推理时面对的噪声条件并不对称。动作最好尽快收敛到接近干净的输出，而视频在当前 chunk 内可以容忍更高噪声，只要它还能提供有用的未来上下文。因此论文把标准 DreamZero 中“视频和动作共享同一噪声时间步”的策略改成了解耦噪声日程。Figure 5 对这一点解释得很清楚：视频噪声偏向高噪声区，而动作噪声仍保持更直接的去噪目标。</p>\n<p>可以把这种差异化训练写成：</p>\n<div class=\"kb-math kb-math-display\">t_v \\sim \\text{Beta}(\\alpha,\\beta), \\qquad t_a \\sim \\mathcal{U}(0,1)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">t_v</span> 和 <span class=\"kb-math kb-math-inline\">t_a</span> 分别是视频与动作的噪声时间步。这样训练出来的模型，在少步甚至单步推理时，也能学会“在视频条件还不完全干净时，先把动作预测准”。配合 action chunk smoothing 和 async inference，DreamZero 最终把推理降到 <strong>约 150ms per action chunk</strong>，实现 <strong>7Hz closed-loop control</strong>。</p>\n<p>这一步对 GR00T N2 尤其关键，因为产品级机器人 foundation model 不只是要“泛化更强”，还必须“能跑得起来”。NVIDIA 新闻稿把 GR00T N2 定义为比领先 VLA 在新任务/新环境成功率高 <strong>2x+</strong> 的基础模型，但真正让这件事可部署的，是 DreamZero 论文里这些围绕实时控制展开的系统级设计。</p>\n<h5>与 Helix / VLA 路线的区别</h5>\n<p>如果说 Helix 代表的是“双系统 VLA”路线，即把高层语义理解和低层运动控制拆分协同，那么 DreamZero/GR00T N2 代表的是另一条更偏世界模型的路线。它不再把动作策略当作唯一核心，而是把“视频未来会如何变化”作为机器人理解物理世界的中间表示。这使它对新动作、新环境和新本体的迁移更强，因为迁移的是世界动力学先验，而不只是动作模板。</p>\n<p>从实验上看，这一点体现在几个数字上都很强：对领先 VLA 的新任务/新环境泛化 <strong>2x+</strong>；视频级跨本体或人到机器人迁移带来 <strong>42%+</strong> 的 unseen task 提升；只用 <strong>30 分钟</strong> 新机器人的 play data 就能适配新 embodiment；最终还把 14B 视频扩散模型压到 <strong>7Hz</strong> 实时闭环。这组结果说明 DreamZero 的核心优势不是单一 benchmark 分数，而是它让“视频世界模型直接做机器人零样本策略”这件事第一次在真实机器人上站住了。</p>",
      "quiz": {
        "q": "DreamZero 相比传统 VLA 最核心的建模差异是什么？",
        "options": [
          "它只把语言换成了更大的语言模型，其余保持不变",
          "它只预测动作，不再使用视觉输入以减少延迟",
          "它联合预测未来视频与动作，把世界状态演化作为动作学习的监督信号",
          "它把连续动作全部改成离散 token，因此不再需要世界模型"
        ],
        "answer": 2,
        "explain": "DreamZero 的核心就是 WAM：未来视频和动作一起预测。视频不是额外展示结果，而是动作学习的重要监督来源，用来显式建模物理世界如何随动作演化。"
      }
    },
    {
      "id": "dfm_vla",
      "num": 22,
      "name": "DFM-VLA",
      "fullName": "离散流匹配VLA (DFM-VLA)",
      "year": "2026.03",
      "org": "arXiv",
      "parent": "pi0",
      "paperUrl": "https://arxiv.org/abs/2603.26320",
      "projectUrl": "",
      "category": "diffusion_flow",
      "motivation": "迭代细化动作Token解决轨迹不稳定",
      "summary": "DFM-VLA 的核心目标是：迭代细化动作Token解决轨迹不稳定。",
      "keyPoints": [
        "<strong>Token级速度场建模</strong>：将离散流匹配（DFM）引入VLA的动作生成，不是一次性生成动作token，而是从纯噪声开始，通过预测token间的\"速度场\"（velocity field）迭代细化完整动作序列，从根本上解决自回归解码的\"不可逆承诺\"（irreversible commitment）问题。",
        "<strong>两种速度场构建方案</strong>：CE损失方案通过交叉熵训练→测速场转换；额外Head方案直接预测替换速度，保留 EditFlow 的 replacement 操作，两种方案均可收敛且精度媲美。",
        "<strong>两阶段解码策略</strong>：前期用连续时间Markov链（CTMC）的Euler步进行速度场引导的精炼，后期切换为argmax模式快速收敛到确定性的高置信度动作token，兼顾质量与速度。",
        "<strong>自适应KV缓存加速</strong>：利用DFM迭代去噪过程中多token仅有微小KV状态变化的特性，自适应复用视觉/指令侧的KV cache，动作侧按余弦相似度动态更新，相比自回归解码获得2.4倍延迟加速。",
        "<strong>低数据场景显著优势</strong>：在CALVIN上仅用10%训练数据即达到Avg. Len 3.21，大幅超越自回归（1.71）和离散扩散（2.84），证明迭代细化缓解了小数据下的过拟合和错误累积。",
        "<strong>真实机器人验证</strong>：在bimanual AgileX平台上三项任务均取得最高成功率（70.8%），显著超越π0-FAST（AR）、Dream-VLA（扩散）和RDT（连续扩散）等主流VLA方案。"
      ],
      "detail": "<h5>整体架构</h5>\n<p><img alt=\"DFM-VLA Overall Architecture\" src=\"https://ar5iv.labs.arxiv.org/html/2603.26320/assets/x3.png\" /></p>\n<p><em>Figure 3：DFM-VLA整体架构。在语言-视觉上下文+噪声动作token <span class=\"kb-math kb-math-inline\">x_t</span> 条件下，模型预测干净动作 <span class=\"kb-math kb-math-inline\">x_1</span>，并通过 <span class=\"kb-math kb-math-inline\">\\mathcal{L}_{\\text{ce}}</span> 或 <span class=\"kb-math kb-math-inline\">\\mathcal{L}_{\\text{head}}</span> 学习速度场。</em></p>\n<h5>核心算法伪代码</h5>\n<pre><code>**Algorithm 1: Two-Stage Decoding of DFM-VLA**\n\nInput: predictor p_θ, context l, steps T_fine, T_val, action vocabulary V\n\n1: Sample x_0 ~ Uniform(V); set T = T_fine + T_val\n2: for k = 1 to T do\n3:     t = (k-1)/T, h = 1/T\n4:     x̂_1 ~ p_θ(· | x_t, l)\n5:     if k ≤ T_fine then\n6:         Compute velocity u_t from x̂_1 (Eq. 7 or Eq. 3)\n7:         Update x_{t+h} by a CTMC Euler step\n8:     else\n9:         Update x_{t+h} ← arg max p_θ(· | x_t, l)\n10:    end if\n11: end for\nOutput: action sequence x_1\n</code></pre>\n<pre><code>**Algorithm 2: Action-Modality DFM Training**\n\nInput: Predictor p_θ, learning rate η\n\n1: repeat\n2:     Sample (l, x_1) ~ p_data\n3:     Sample t ~ U(0, 1)\n4:     Sample x_t ~ p_t(· | x_1)\n5:     Choose L_train ∈ {L_ce, L_head}\n6:     Compute L_train from (x_t, l) and x_1\n7:     θ ← θ - η ∇_θ L_train\n8: until converged\nOutput: trained predictor p_θ\n</code></pre>\n<h5>方法深度解析</h5>\n<p>DFM-VLA将机器人动作生成重新定义为一种离散流匹配过程，核心思想源于离散流匹配（Discrete Flow Matching, DFM）理论。在该框架下，一个已知的源分布（如均匀噪声）被逐步变换为动作序列的真实分布，中间的过程由一个概率路径（probability path）<span class=\"kb-math kb-math-inline\">\\{p_t(x)\\}_{t\\in[0,1]}</span> 描述，而驱动这一变换的正是<strong>速度场</strong>（velocity field）<span class=\"kb-math kb-math-inline\">u_t(x&#x27; \\mid x)</span> ——它定义了离散状态之间跳转的速率。</p>\n<div class=\"key-point\">💡 <strong>关键洞察</strong>：自回归VLA逐个生成动作token，已生成的错误token如同覆水难收；而DFM-VLA在每个去噪步骤同时审视并修正整条动作序列，通过速度场精炼每一步的token，实现对\"不可逆承诺\"问题的根本性规避。</div>\n<p>训练过程中，DFM-VLA学习预测干净动作 <span class=\"kb-math kb-math-inline\">x_1</span> 并据此推导速度场。论文提出了两种损失函数：</p>\n<p><strong>方案一：CE损失 + 测速场（Denoising-Conditional Velocity）</strong></p>\n<p>直接从预测分布 <span class=\"kb-math kb-math-inline\">p_\\theta(x_1 \\mid x_t, l)</span> 构造条件速度场：</p>\n<div class=\"kb-math kb-math-display\">u_t^\\theta(x \\mid x_t) = \\sum_{x_1} u_t(x \\mid x_t, x_1) \\, p_\\theta(x_1 \\mid x_t, l)</div>\n<p>其中条件速度 <span class=\"kb-math kb-math-inline\">u_t(x \\mid x_t, x_1)</span> 具有闭式解，由概率路径 <span class=\"kb-math kb-math-inline\">p_{t\\mid 1}(x_t \\mid x_1)</span> 决定。训练时最小化预测 <span class=\"kb-math kb-math-inline\">x_1</span> 与真实 <span class=\"kb-math kb-math-inline\">x_1^*</span> 的交叉熵：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{ce}} = -\\mathbb{E}_{t, x_1, x_t} \\left[ \\sum_{i=1}^N \\log p_\\theta(x_1^i \\mid x_t^i, l) \\right]</div>\n<p><strong>方案二：额外Head直接预测速度（Velocity Head Loss）</strong></p>\n<p>受EditFlow启发，在backbone之上附加轻量速度头，直接从隐状态映射到替换速度：</p>\n<div class=\"kb-math kb-math-display\">h_t = f_\\theta(x_t, l), \\quad u_t^{\\text{head}}(x \\mid x_t) = \\text{softmax}(W \\, h_t)</div>\n<p>损失函数显式回归速度场：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{head}} = \\mathbb{E}_{t,x_1,x_t}\\left[ \\sum_{x \\neq x_t} u_t^\\theta(x \\mid x_t) - \\sum_{i=1}^N \\mathbf{1}_{[x_t^i \\neq x_1^i]} \\log u_t^\\theta(x^i \\mid x_t^i) \\, p_{1\\mid t}(x_1^i \\mid x_t^i, l) \\right]</div>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：两种方案在实验中均有效，且性能差异不大。CE方案实现简单，适合快速实验；Head方案解耦了预测与速度推导，推理时开销更低。</div>\n<p><strong>两阶段解码策略</strong>是DFM-VLA的另一个核心贡献。在<span class=\"kb-math kb-math-inline\">[0, T_{\\text{fine}}]</span>的精炼阶段，使用CTMC Euler步进行小步长迭代，速度场驱动token逐步靠近高概率区域；在<span class=\"kb-math kb-math-inline\">(T_{\\text{fine}}, T]</span>的验证阶段，直接用argmax策略将每个token锁定到预测分布的最高概率值，避免无限精度追逐。这种设计在\"探索-收敛\"之间找到了优雅的平衡。</p>\n<p><strong>自适应KV缓存</strong>（Adaptive KV Caching）进一步加速推理：视觉和指令token在整个去噪过程中产生的KV状态变化极小，可以仅计算一次并固定复用；动作token侧则基于当前cache与新值特征的余弦相似度决定是否更新。这一策略实现了2.4倍延迟加速，同时基本无损任务性能。</p>\n<h5>实验表现</h5>\n<p>DFM-VLA在多个机器人操纵基准上验证了其有效性：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>Benchmark</th>\n<th>Metric</th>\n<th>DFM-VLA</th>\n<th>对比顶级方法</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>CALVIN ABCD→D</td>\n<td>Avg. Len</td>\n<td><strong>4.44</strong></td>\n<td>UniVLA* (4.11)</td>\n</tr>\n<tr>\n<td>LIBERO-100</td>\n<td>Success Rate</td>\n<td><strong>95.7%</strong></td>\n<td>RDT (89.1%)</td>\n</tr>\n<tr>\n<td>Real-World (3 tasks)</td>\n<td>Avg. Success</td>\n<td><strong>70.8%</strong></td>\n<td>RDT (60.0%)</td>\n</tr>\n</tbody>\n</table></div>\n<p>特别是低数据场景下（10%训练数据），DFM-VLA的CALVIN Avg. Len达到3.21，远超自回归模型的1.71和离散扩散的2.84，充分验证了迭代细化在缓解小数据误差累积中的优势。</p>"
    },
    {
      "id": "pangu_embodied",
      "num": 23,
      "name": "盘古具身智能",
      "fullName": "CloudRobo具身规划模型 (Pangu Robo Embodied Planning Model)",
      "year": "2025.06",
      "org": "Huawei Cloud",
      "parent": "code_as_policies",
      "paperUrl": "https://www.huaweicloud.com/intl/zh-cn/news/20250620101057482.html",
      "projectUrl": "",
      "category": "llm_planning",
      "motivation": "世界模型与规划执行三模型协同，面向跨本体具身任务规划",
      "summary": "盘古具身智能这一条更准确地说是华为云 **CloudRobo 具身智能平台中的具身规划模型**：它依托盘古多模态/思维能力、盘古世界模型和云边协同基础设施，把环境生成、任务规划、执行验证串成闭环，面向跨机器人本体的长程具身任务规划与部署。",
      "keyPoints": [
        "这不是公开论文模型，而是 <strong>Huawei Cloud 在 2025 年 6 月发布的 CloudRobo 具身智能平台中的规划子模型</strong>",
        "平台官方定义了三类核心模型：<strong>具身多模态生成大模型、具身规划大模型、具身执行大模型</strong>",
        "规划模型位于“生成/世界建模”和“执行控制”之间，负责把任务目标转成可验证、可落地的具身行动序列",
        "平台提供 <strong>数据合成、数据标注、模型开发、仿真验证、云边协同部署、安全监管</strong> 的端到端能力",
        "盘古多模态大模型衍生出的 <strong>盘古世界模型</strong> 负责生成可交互、可漫游的数字物理空间，为具身训练和规划提供环境底座",
        "华为云提出 <strong>R2C (Robot to Cloud)</strong> 协议，试图统一不同机器人本体、传感器和接口协议带来的碎片化问题",
        "从方法论上看，它更接近 <strong>Code as Policies / 云端规划器</strong> 路线，而不是端到端 VLA 直接吐动作",
        "官方公开材料强调的是系统闭环和工程能力，并 <strong>没有公开具体网络结构、损失函数和训练配方</strong>"
      ],
      "detail": "<h5>官方发布总览图</h5>\n<p><img alt=\"盘古大模型5.5与CloudRobo发布图\" src=\"https://res-static.hc-cdn.cn/cloudbu-site/china/zh-cn/unclassification/20256/panggu5.5%E5%8F%91%E5%B8%8320250620.jpg\" />\n<em>图：华为云在 HDC 2025 发布盘古大模型 5.5 与 CloudRobo 具身智能平台。盘古具身智能在官方语境里并不是单篇论文方法，而是围绕具身生成、规划、执行构建的平台化能力。</em></p>\n<h5>世界模型环境底座图</h5>\n<p><img alt=\"盘古世界模型官方示意图\" src=\"https://res-static.hc-cdn.cn/cloudbu-site/china/zh-cn/MLLM/02.png\" />\n<em>图：盘古世界模型官方页面示意。公开资料把世界模型定位为“动态生成可交互、可漫游的数字空间”，它是规划模型能够在云端完成验证与迭代的重要前提。</em></p>\n<h5>核心伪代码</h5>\n<pre><code class=\"language-python\"># CloudRobo-style embodied planning loop\n# This pseudocode is a system-level abstraction from Huawei's official release.\n\ngoal = parse_instruction(user_task)\nobs = collect_robot_observation(cameras, proprioception, logs)\n\n# 1) Use the world model / multimodal generation model to build a digital scene\nworld = pangu_world_model(obs, scene_priors, robot_profile)\n\n# 2) Planning model produces a long-horizon action plan in the cloud\nplan = embodied_planner(\n    goal=goal,\n    world=world,\n    robot_capability=robot_profile,\n    safety_rules=safety_constraints,\n)\n\n# 3) Validate in simulation before real deployment\nverified_plan = simulate_and_revise(plan, world)\n\n# 4) Execution model grounds subgoals into robot-specific controls\nfor subgoal in verified_plan:\n    action = embodied_executor(subgoal, obs)\n    send_via_r2c(action)\n    obs = collect_robot_observation(cameras, proprioception, logs)\n</code></pre>\n<h5>动机与背景</h5>\n<p>这一条当前页面里原先最大的问题，不是“缺一篇精读”，而是它被误写成了一篇像学术论文那样的算法节点。根据华为云 2025 年 6 月 20 日的官方发布，<strong>盘古具身智能</strong>更准确的落点是：华为云基于盘古大模型发布了 <strong>CloudRobo 具身智能平台</strong>，其中包含“具身多模态生成大模型、具身规划大模型、具身执行大模型”三类核心模型。也就是说，这里真正对应 VLA 图谱中 <code>llm_planning</code> 这条分支的，不是一个独立论文式算法，而是平台中的 <strong>具身规划模型</strong>。</p>\n<p>官方材料反复强调具身智能的现实困难并不只是“模型还不够强”，而是工程碎片化极重：机器人品类多、传感器类型多、接口协议多，导致模型能力很难从云端稳定迁移到不同本体。因此它采取的是明显的平台路线，而不是单点模型路线。盘古世界模型负责构造数字物理空间，规划模型在这个空间里承担任务拆解与路线选择，执行模型再把子目标落到具体机器人控制上，最后用仿真和云边协同把闭环跑起来。</p>\n<p>这和很多论文式 VLA 很不一样。学术工作通常集中在一个明确的网络结构、损失函数或训练策略上，例如 action token 化、flow matching、diffusion policy 或统一多模态自回归。而 CloudRobo 的公开描述更偏系统工程：先把数据合成、仿真验证、模型开发和部署链路打通，再在其中安放规划模型。因此理解它时，不能把它当作一个“单模型论文”，更适合把它看成 <strong>云端具身规划栈</strong> 的一个中枢组件。</p>\n<div class=\"key-point\">💡 关键：这条的核心创新不是公开了某个新 Transformer 结构，而是把“世界建模 - 长程规划 - 执行控制 - 云边部署”整成一个平台闭环。</div>\n<h5>核心机制一：规划模型在三模型闭环中的位置</h5>\n<p>从官方定义看，CloudRobo 至少包含三层能力：生成、规划、执行。生成模型负责场景/世界表征，执行模型负责把目标变成机器人动作，而规划模型则承担中间那层最关键的“从任务到步骤”的变换。它面对的不再是单个时刻动作回归，而是跨多个子目标、多个约束条件的长程任务分解问题。</p>\n<p>如果用一个抽象形式来写，规划模型要解决的其实是：</p>\n<div class=\"kb-math kb-math-display\">\\pi_{\\text{plan}}^\\* = \\arg\\max_{\\tau} \\; p(\\tau \\mid g, o_{1:t}, \\hat{W}, c)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">g</span> 是任务目标，<span class=\"kb-math kb-math-inline\">o_{1:t}</span> 是观测历史，<span class=\"kb-math kb-math-inline\">\\hat{W}</span> 是由世界模型构造或更新的数字环境，<span class=\"kb-math kb-math-inline\">c</span> 是机器人能力、工具和安全约束，<span class=\"kb-math kb-math-inline\">\\tau</span> 是长程子任务序列。这个式子不是华为公开论文里的原始公式，而是对其系统角色的准确抽象。它说明规划模型关注的是“选什么子目标序列”，而不是直接回归最终电机命令。</p>\n<p>这也是为什么把它放在 <code>code_as_policies</code> 之后是合理的。两者都属于“高层语言/程序/计划驱动”的路线，而不是端到端动作生成路线。差异在于，CloudRobo 的规划器不是在孤立文本环境里工作，而是建立在世界模型和云边执行闭环之上。</p>\n<h5>核心机制二：盘古世界模型为规划提供可验证环境</h5>\n<p>官方资料明确把 <strong>盘古世界模型</strong> 描述为“动态生成可交互、可漫游的数字空间，构建智能驾驶和具身智能机器人训练所需环境”。这句话对理解规划模型很关键。没有世界模型，规划器更像纯文本 agent，只能基于描述推理；有了世界模型，规划器才有机会在接近真实物理约束的数字空间里做候选方案验证、失败回放和环境重建。</p>\n<p>从系统流程看，可以把它理解成先由世界模型生成或补全环境，再由规划模型在环境里生成可执行方案：</p>\n<div class=\"kb-math kb-math-display\">\\hat{W} = G_{\\text{world}}(o_{1:t}, m), \\qquad\n\\tau = \\pi_{\\text{plan}}(g, \\hat{W}, c)</div>\n<p>这里 <span class=\"kb-math kb-math-inline\">G_{\\text{world}}</span> 表示世界模型，<span class=\"kb-math kb-math-inline\">m</span> 表示外部场景先验或数字地图。直觉上，这一步把“靠语言猜环境”变成了“先显式构图，再规划”。在长程具身任务里，这一点尤其重要，因为很多失败并不是来自目标理解错误，而是来自空间约束、遮挡关系、可达性和多步骤依赖没有被提前模拟出来。</p>\n<p>官方材料没有公开 planner 如何调用世界模型，也没有公开是否做树搜索、MPC、行为克隆还是大模型 CoT 规划。但从公开的三模型切分和仿真验证流程看，<strong>世界模型 + 规划模型</strong> 的耦合关系就是这条路线最重要的方法学信息。</p>\n<div class=\"warn-box\">⚠️ 注意：公开资料没有披露具体训练细节，所以这里能严谨确认的是系统分工，而不是底层神经网络实现。</div>\n<h5>核心机制三：R2C 与云边协同让规划跨本体落地</h5>\n<p>华为云在官方发布里专门提出了 <strong>R2C（Robot to Cloud）协议</strong>。这表明它把问题看得很工程化：具身规划不是只要模型会“想”就够了，更大的难点在于不同机器人本体的传感器、接口和执行控制差异太大。规划模型如果只在单一机器人上工作，它的价值就很有限；只有通过统一的云到机器人连接协议，规划器才能成为跨本体复用的中枢。</p>\n<p>因此，盘古具身智能这一条的真正含义不是“某个学术模型把 benchmark 做高了多少”，而是：华为云试图把上层具身规划能力固定在云端，用统一协议和云边协同把它下发给不同执行本体。可以把执行过程抽象为：</p>\n<div class=\"kb-math kb-math-display\">u_t = \\pi_{\\text{exec}}(s_t, \\tau_k), \\qquad\n\\tau_{k+1} = \\text{replan}(o_{1:t+1}, \\hat{W}_{t+1})</div>\n<p>其中执行模型根据当前状态 <span class=\"kb-math kb-math-inline\">s_t</span> 和当前子目标 <span class=\"kb-math kb-math-inline\">\\tau_k</span> 产生控制命令 <span class=\"kb-math kb-math-inline\">u_t</span>，而规划模型在接收到新观测后又可以继续重规划。这种“规划在云、执行在边、状态持续回传”的结构，比单次离线计划更适合真实机器人场景。</p>\n<p>所以，如果把它放回 Embodied/VLA 页面中，它最恰当的位置不是一个纯学术 VLA，而是 <strong>平台化云端规划器</strong>。它代表的是具身智能从单模型研究，向数据、仿真、规划、执行、部署一体化系统演进的方向。</p>",
      "quiz": {
        "q": "根据华为云公开资料，盘古具身智能这一条在 CloudRobo 中最准确对应什么角色？",
        "options": [
          "一个端到端直接输出关节力矩的执行策略网络",
          "平台中的具身规划模型，位于世界建模与执行控制之间",
          "只做图像理解的视觉编码器",
          "与机器人无关的通用客服问答模型"
        ],
        "answer": 1,
        "explain": "官方发布明确提到 CloudRobo 提供生成、规划、执行三类核心模型。当前图谱中的盘古具身智能更准确对应其中的具身规划模型，而不是独立论文式的端到端控制器。"
      }
    },
    {
      "id": "gemini_robotics_er",
      "num": 24,
      "name": "Gemini Robotics-ER",
      "fullName": "Gemini具身推理 (Gemini Robotics-ER)",
      "year": "2026.04",
      "org": "Google DeepMind",
      "parent": "rt2",
      "paperUrl": "https://deepmind.google/discover/blog/gemini-robotics-er-1-6-powering-real-world-robotics-tasks/",
      "projectUrl": "",
      "category": "vlm_finetune",
      "motivation": "具身推理与Agentic Vision工业安全",
      "summary": "Gemini Robotics-ER 是 Google DeepMind 的**具身推理模型**，基于 Gemini 多模态基础模型构建，专门为机器人提供精确的3D空间理解、物体功能推理（affordance）和任务规划能力——它不做动作控制，而是作为 VLA 模型的\"空间大脑\"，在工业安全等场景中实现 Agentic Vision 式的主动危险检测与干预。",
      "keyPoints": [
        "核心动机：具身推理与Agentic Vision工业安全",
        "演化来源：继承或改进自 rt2",
        "代表机构：Google DeepMind"
      ],
      "detail": "<h5>架构设计：ER 与 VLA 的分工协作</h5>\n<pre><code>┌──────────────────────────────────────────────────┐\n│                  Robotics System                   │\n│                                                    │\n│  ┌─────────────────┐    ┌──────────────────────┐  │\n│  │  Gemini ER Model │    │  Gemini VLA Model    │  │\n│  │  (Embodied       │    │  (Vision-Language-   │  │\n│  │   Reasoning)     │    │   Action)            │  │\n│  │                  │    │                      │  │\n│  │ • 场景理解        │───▶│ • 动作推理            │  │\n│  │ • 3D空间锚定      │    │ • Motion Transfer    │  │\n│  │ • 任务分解        │    │ • 轨迹生成            │  │\n│  │ • 安全评估        │    │                      │  │\n│  └─────────────────┘    └──────────────────────┘  │\n│           ↑                         ↓              │\n│       Camera/RGB-D              Robot Arm          │\n└──────────────────────────────────────────────────┘\n</code></pre>\n<p>ER 模型不直接接触机器人动力学。它的输出是<strong>结构化的具身推理结果</strong>——包含物体类别、6D位姿估计、可操作区域（affordance map）、语义关系图和子任务序列。这些被 VLA 或传统运动规划器消费，转化为可执行的关节级指令。这种解耦设计的优势：(1) ER 可在没有机器人硬件的环境中独立训练和评估；(2) 同一个 ER 模型可服务于不同形态的机器人（单臂、双臂、人形）；(3) 推理能力的升级不要求重新训练底层的控制策略。</p>\n<h5>多层级推理链 (Multi-Level Reasoning Chain)</h5>\n<p>Gemini Robotics-ER 的核心创新在于将机器人操作过程中的每个子问题都转化为了显式的推理步骤。传统 VLA 模型的典型做法是端到端地映射\"像素→动作\"，而 ER 在像素与动作之间插入了<strong>3层级推理</strong>：</p>\n<ol>\n<li><strong>场景级推理 (Scene-Level)</strong>：分析整体环境布局、识别所有相关物体及其空间关系。例如在桌面操作场景中，模型会先输出\"桌面上有三个物体：红色杯子位于坐标(0.3, 0.5, 0.2)，蓝色盘子位于(0.5, 0.3, 0.15)，银色刀叉位于(0.4, 0.6, 0.18)\"。</li>\n<li><strong>任务级推理 (Task-Level)</strong>：将自然语言指令分解为有序子任务。如\"准备早餐\"被分解为：① 取杯子→② 倒水→③ 取盘子→④ 放置食物。每一步都有前置条件和成功标准。</li>\n<li><strong>动作原语级推理 (Primitive-Level)</strong>：针对每个子任务输出精确的空间目标（grasp point, approach direction, placement location），并附带推理依据。例如：\"抓取杯子把手，因为把手提供了稳定的抓取点，当前把手朝向为45°，建议从135°方向进近以避免与其他物体碰撞。\"</li>\n</ol>\n<h5>Agentic Vision：从被动观察到主动审视</h5>\n<p>1.6 版本的标志性升级是 Agentic Vision。传统视觉系统是被动的——给定一帧图像，输出理解。Agentic Vision 赋予 ER 模型<strong>主动审视</strong>的能力：</p>\n<ul>\n<li><strong>动态注意力分配</strong>：模型自主决定在场景的哪个区域分配更多计算资源（反复\"注视\"潜在危险区域）。</li>\n<li><strong>多视角推理</strong>：如有多个摄像头（或可请求改变机器人视角），模型会主动综合多角度信息来确认潜在危险（如遮挡后的工人位置）。</li>\n<li><strong>时序异常检测</strong>：连续监测工人运动轨迹与机器人工作空间的重叠程度，当预测到即将发生交集时提前预警。</li>\n<li><strong>基于安全标准的法规推理</strong>：模型内化了 ISO 10218-1 和 ISO/TS 15066 的安全距离计算逻辑——不是简单的\"近就是危险\"，而是根据机器人末端速度、有效载荷和操作模式动态评估风险等级。</li>\n</ul>\n<p>安全评估的核心公式为协作空间的最小安全距离：</p>\n<div class=\"kb-math kb-math-display\">d_{safe} = v_{robot} \\times (t_{react} + t_{stop}) + d_{penetration}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">v_{robot}</span> 为机器人末端最大线速度，<span class=\"kb-math kb-math-inline\">t_{react}</span> 为感知系统反应时间，<span class=\"kb-math kb-math-inline\">t_{stop}</span> 为机器人急停时间，<span class=\"kb-math kb-math-inline\">d_{penetration}</span> 为 ISO/TS 15066 规定的允许侵入距离（与人体部位和接触力有关）。</p>\n<h5>空间锚定：点坐标与 bounding box 的统一表征</h5>\n<p>ER 模型使用统一的 tokenized 空间表示来处理不同粒度的空间指代：</p>\n<ul>\n<li><strong>Point Tokens</strong>：<code>[POINT x y z]</code> 特殊 token 表示 3D 世界坐标系中的精确位置，训练时通过回归损失 <span class=\"kb-math kb-math-inline\">\\mathcal{L}_{coord} = \\| \\hat{p} - p \\|_2</span> 进行监督。</li>\n<li><strong>Box Tokens</strong>：<code>[BOX x1 y1 x2 y2 z1 z2]</code> 表示 3D 包围盒，用于物体检测和6D位姿描述。</li>\n<li><strong>Semantic Regions</strong>：<code>[REGION \"可操作区域\" polygons…]</code> 用于描述 affordance——物体上哪些部分可以被抓取、按压或旋转。</li>\n</ul>\n<p>这些空间 token 嵌入到与文本 token 相同的序列中，由 Transformer 统一处理。训练时，空间 token 的损失权重被设为文本 token 的 <span class=\"kb-math kb-math-inline\">5\\times</span>，以确保模型优先学好精确的空间推理。</p>\n<h5>训练策略：先通才后专精 (Specialize-then-Rehearse)</h5>\n<p>ER 模型的训练分为三阶段：</p>\n<ol>\n<li><strong>基座预训练（Foundation Pre-training）</strong>：在 Web-scale 多模态数据上训练，获得通用视觉-语言理解能力。基础 VLM 参数量达到 Gemini 2.5 级别（数百 B 参数）。</li>\n<li><strong>空间特化（Spatial Specialization）</strong>：在约 3.3M 样本的具身数据集上微调，数据来源包括 Open X-Embodiment、内部遥操作数据和合成渲染场景。此阶段重点学习 3D 坐标预测、affordance 估计和空间关系推理。</li>\n<li><strong>排练保持（Rehearsal）</strong>：在特化完成后，用原始通用数据的一部分进行\"复习\"，防止灾难性遗忘——确保模型不会因为专注机器人数据而丧失通用 VLM 能力。</li>\n</ol>",
      "quiz": {
        "q": "",
        "options": [],
        "answer": 0,
        "explain": ""
      }
    },
    {
      "id": "univla",
      "num": 25,
      "name": "UniVLA",
      "fullName": "统一视觉语言动作 (UniVLA)",
      "year": "2025.06",
      "org": "CASIA / BAAI / THU / HKISI",
      "parent": "openvla",
      "paperUrl": "https://arxiv.org/abs/2506.19850",
      "projectUrl": "",
      "category": "vlm_finetune",
      "motivation": "统一视觉语言动作Token化，并用world model后训练增强长程策略学习",
      "summary": "UniVLA 提出了一种原生统一的视觉-语言-动作建模范式，把图像、指令和动作全部离散成共享词表里的 token 序列，并通过 world model 后训练先学视频动态、再学动作策略，从而显著提升长程任务和跨任务泛化能力。",
      "keyPoints": [
        "提出 <strong>UniVLA</strong>：把视觉、语言、动作统一表示为共享词表中的离散 token，并用单个自回归 Transformer 建模",
        "采用 <strong>统一多模态序列</strong>：指令、图像、动作按时间交错排列，显式保留 MDP 中的因果与时序结构",
        "图像使用 <strong>VQ tokenizer</strong> 离散化，动作使用 <strong>FAST</strong> 的 <strong>DCT 频域离散化</strong>",
        "使用 <code>boi/eoi/boa/eoa</code> 特殊 token 显式标记图像与动作边界",
        "提出 <strong>两阶段训练</strong>：先做仅监督视觉 token 的 <strong>world model post-training</strong>，再做仅监督动作 token 的 <strong>policy fine-tuning</strong>",
        "统一框架同时支持 <strong>动作预测、未来视觉预测、空间 grounding</strong> 等多模态输出任务",
        "在 <strong>CALVIN、LIBERO、SimplerEnv-Bridge</strong> 上取得 SOTA，其中 <strong>LIBERO 平均成功率 95.5%</strong>",
        "进一步展示了在 <strong>ALOHA 真实机器人</strong> 和 <strong>自动驾驶 NAVSIM</strong> 上的迁移潜力"
      ],
      "detail": "<h5>核心总览图</h5>\n<p><img alt=\"UniVLA 总览图\" src=\"https://robertwyq.github.io/univla.github.io/static/images/teaser_univla.png\" />\n<em>图：项目页中的总览图。UniVLA 把感知、语言和控制统一到同一个 token 自回归框架里，并同时覆盖动作预测、视觉预测和空间 grounding。</em></p>\n<h5>核心架构图</h5>\n<p><img alt=\"UniVLA 架构图\" src=\"https://robertwyq.github.io/univla.github.io/static/images/univla.png\" />\n<em>图：UniVLA 的统一架构。图像通过 VQ tokenizer 离散化，动作通过 FAST 的 DCT 编码离散化，之后与语言 token 一起组成交错多模态序列，由同一个自回归 Transformer 建模。</em></p>\n<h5>核心伪代码</h5>\n<pre><code class=\"language-python\"># UniVLA: unified tokenization + world-model post-training + policy fine-tuning\n\nL_t = tokenize_text(instruction)\nL_v = [vq_tokenize(image_t) for image_t in image_history]\nL_a = [fast_dct_tokenize(action_t) for action_t in action_chunks]\n\nS_v = [L_t[0], L_v[0], L_v[1], ..., L_v[t]]                   # world model sequence\nS_a = [L_t[0], L_v[0], L_a[0], L_v[1], L_a[1], ..., L_v[t]]  # policy sequence\n\n# stage 1: world model post-training\nloss_world = cross_entropy(next_token(S_v), target='vision_tokens_only')\nupdate(loss_world)\n\n# stage 2: downstream policy fine-tuning\nloss_policy = cross_entropy(next_token(S_a), target='action_tokens_only')\nupdate(loss_policy)\n\n# inference\nnext_action_tokens = autoregressive_decode(S_a_prefix)\naction_chunk = fast_dct_decode(next_action_tokens)\n</code></pre>\n<h5>动机与背景</h5>\n<p>传统 VLA 大多沿用“语言中心”的建模路线：先用视觉编码器把图像压到语义空间，再让大语言模型基于这些视觉特征输出动作。这类设计对语义理解和指令跟随很有效，但它天然把视觉、语言和动作分成了不完全对称的三层结构。结果是，模型更像“看图后说一个动作”，而不是在统一时序里真正理解观察、动作和环境变化之间的因果关系。</p>\n<p>UniVLA 的出发点正是反过来做这件事。论文认为，机器人交互本质上是一个 Markov 决策过程：观察会影响动作，动作又会改变下一时刻观察。如果还把视觉和动作拆成两个弱耦合阶段，那么模型就很难充分利用视频里蕴含的动态信息，也难以自然支持未来预测、空间 grounding 这类具身相关能力。因此 UniVLA 选择把视觉、语言和动作全部改写成离散 token，让它们在同一个序列空间里交错出现，由同一个 Transformer 学习。</p>\n<p>这一步看起来只是“统一 token 化”，但真正关键的是它把 VLA 从“多模块拼装”转成了“原生多模态序列建模”。一旦三种模态共享同一建模接口，world model、policy learning、visual prediction 这些原本分散的任务就都能被写成统一的 next-token prediction 问题。后面的 world model 后训练之所以有效，根本原因也在这里。</p>\n<div class=\"key-point\">💡 关键：UniVLA 不是在传统 VLA 前面多加一个视频模块，而是把整条感知到动作链条重写成统一的因果 token 序列。</div>\n<h5>核心机制一：统一离散 token 化与交错序列</h5>\n<p>UniVLA 的第一步是把三种异构模态都变成离散序列。语言 token 直接沿用 VLM 体系；视觉 token 采用与 Emu3 一致的 VQ tokenizer，把图像离散成码本索引；动作 token 则沿用 FAST，把连续动作块先映射到频域，再离散成 token。论文特别强调动作不是逐时刻实值回归，而是先做 <strong>Discrete Cosine Transform (DCT)</strong> 编码，再表示成可变长度的离散 token 序列。</p>\n<p>如果用 <span class=\"kb-math kb-math-inline\">L_t</span>、<span class=\"kb-math kb-math-inline\">L_v</span>、<span class=\"kb-math kb-math-inline\">L_a</span> 分别表示语言、视觉、动作 token 序列，那么 UniVLA 的核心对象不是单独某一种模态，而是统一多模态序列 <span class=\"kb-math kb-math-inline\">L</span>。在策略学习场景中，序列按时间交错为：</p>\n<div class=\"kb-math kb-math-display\">S_a = \\{L_t^1, L_v^1, L_a^1, L_v^2, L_a^2, \\dots, L_v^t, L_a^t\\}</div>\n<p>而在 world model 阶段，动作位置被“未来视觉”替代，写成：</p>\n<div class=\"kb-math kb-math-display\">S_v = \\{L_t^1, L_v^1, L_v^2, \\dots, L_v^t\\}</div>\n<p>这里的设计很重要，因为它不是简单把多种 token 拼起来，而是通过交错顺序保留了任务执行中的因果结构。当前图像之后接什么，决定了模型究竟在学习“下一步动作”还是“下一帧世界状态”。配合 <code>boi/eoi/boa/eoa</code> 等特殊边界 token，模型就能在统一语法下识别不同模态片段。</p>\n<h5>核心机制二：把 world model 后训练接到 VLA 之前</h5>\n<p>UniVLA 最有辨识度的点，不是统一 token 化本身，而是它把 <strong>world model post-training</strong> 作为策略学习前的关键阶段。作者观察到，很多 VLA 只在有动作标注的机器人数据上学策略，但这会严重限制模型对时序动态和因果结构的理解，也无法充分利用大规模无动作视频。于是 UniVLA 先用 world model 目标，让模型在只有文本与视频的情况下学习“看到当前状态和任务后，未来会发生什么”。</p>\n<p>这一步训练时，损失只计算在视觉 token 上，本质上是在做条件未来视觉预测。可以把训练目标理解为标准自回归交叉熵：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{world}} = - \\sum_{i \\in \\mathcal{V}} \\log p(x_i \\mid x_{&lt;i})</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\mathcal{V}</span> 表示视觉 token 位置集合。这样做的直觉是：模型必须先学会环境如何随任务和上下文演化，之后再学“应该输出什么动作”就会更容易。论文的消融结果也支持这一点。world model 后训练相比 action-only 或单纯 text-to-image、video-only 训练，对长程任务和泛化都有更明显提升。</p>\n<p>更关键的是，这种 world model 训练并不依赖动作标签，因此可以利用更大规模的视频数据。对 VLA 来说，这是一条很实用的扩展路径，因为互联网和机器人视频远多于高质量动作标注数据。UniVLA 的统一 token 框架恰好让这种“先学世界、再学控制”的训练顺序非常自然。</p>\n<div class=\"warn-box\">⚠️ 注意：论文并不是说“视觉预测本身就等于控制”，而是说明先学动态世界模型能给后续策略学习提供更强的时序和因果先验。</div>\n<h5>核心机制三：统一 next-token 训练带来的多任务输出能力</h5>\n<p>当图像、语言、动作都被转成离散 token 后，UniVLA 的训练目标就被极大简化了。无论是 world model 还是 policy learning，底层都是同一个自回归 next-token prediction，只是选择不同位置计算损失。对于策略学习，损失只落在动作 token 上：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{policy}} = - \\sum_{i \\in \\mathcal{A}} \\log p(x_i \\mid x_{&lt;i})</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\mathcal{A}</span> 表示动作 token 位置集合。也就是说，UniVLA 并不需要为视觉预测、动作生成、空间 grounding 各写一套完全不同的模型结构，它们只是“同一序列上监督位置不同”的不同任务实例。</p>\n<p>这种设计带来的一个直接好处是，模型不再只会输出动作。论文 Figure 3 展示了 UniVLA 还能输出未来视觉预测和空间 grounding 结果，说明它在内部确实学到了一些跨模态时空结构，而不只是“从图像回归动作”的黑箱映射。对长程具身任务来说，这种能力尤其重要，因为完成长链任务往往依赖对未来状态的隐式模拟。</p>\n<p>从结果看，这种统一范式在几个典型 benchmark 上都吃到了红利。UniVLA 在 LIBERO 上把平均成功率做到了 <strong>95.5%</strong>，其中 long-horizon 套件从上一阶段 SOTA 的 <strong>69.0%</strong> 提升到 <strong>94.0%</strong>；在 SimplerEnv-Bridge 上把平均成功率从 <strong>42.7%</strong> 拉到 <strong>69.8%</strong>；在 CALVIN 上也达到了更高的长程任务完成长度。对这篇工作的理解应该是：它不是简单证明“统一 token 也能做 VLA”，而是证明这种统一建模方式能更系统地把视频动态学习迁移到控制任务上。</p>",
      "quiz": {
        "q": "UniVLA 中 world model post-training 阶段最核心的训练信号是什么？",
        "options": [
          "仅对动作 token 计算损失，提前学习控制策略",
          "仅对视觉 token 计算损失，学习由当前观察和指令条件化的未来视觉动态",
          "同时对所有 token 等权计算损失，以避免模态偏置",
          "只对语言 token 计算损失，提升指令理解能力"
        ],
        "answer": 1,
        "explain": "UniVLA 的 world model 阶段本质是条件未来视觉预测。论文明确说明这一阶段的监督主要落在视觉 token 上，用来学习环境动态和因果结构，而不是直接学习动作。"
      }
    },
    {
      "id": "hy_embodied",
      "num": 26,
      "name": "HY-Embodied",
      "fullName": "混元具身基础模型 (HY-Embodied-0.5)",
      "year": "2026.04",
      "org": "Tencent Robotics X / HY Vision",
      "parent": "univla",
      "paperUrl": "https://arxiv.org/abs/2604.07430",
      "projectUrl": "",
      "category": "vlm_finetune",
      "motivation": "MoT与视觉潜在Token增强空间感知，并蒸馏2B边缘具身模型",
      "summary": "HY-Embodied-0.5 提出了一套面向真实世界具身智能体的基础模型体系，通过 Mixture-of-Transformers、视觉潜在 Token、迭代式具身后训练和大到小 on-policy 蒸馏，同时提升空间感知、具身推理和边缘部署能力，并把强 VLM 能力有效迁移到真实机器人控制。",
      "keyPoints": [
        "提出 <strong>HY-Embodied-0.5</strong> 系列：包含面向边缘部署的 <strong>MoT-2B</strong> 和面向复杂推理的 <strong>MoE-A32B</strong>",
        "采用 <strong>Mixture-of-Transformers (MoT)</strong>，用模态专属的 QKV、FFN 和注意力机制解耦视觉与文本计算",
        "引入 <strong>visual latent tokens</strong>，增强细粒度视觉表征，并强化视觉与语言之间的桥接",
        "使用 <strong>HY-ViT 2.0</strong> 原生分辨率视觉编码器，支撑空间与具身任务所需的精细视觉感知",
        "训练配方分为 <strong>大规模 pre-training / mid-training / embodied post-training / on-policy distillation</strong> 多阶段",
        "具身后训练采用 <strong>iterative self-evolution + reinforcement learning</strong>，重点提升长链具身推理与规划",
        "通过 <strong>large-to-small on-policy distillation</strong> 把 32B 大模型的推理与感知能力迁移给 2B 小模型",
        "在 <strong>22 个 benchmark</strong> 上评估视觉感知、空间推理和具身理解，并进一步训练 VLA 在真实机器人任务上取得竞争力结果"
      ],
      "detail": "<h5>核心架构图</h5>\n<p><img alt=\"HY-Embodied-0.5 MoT 架构总览\" src=\"https://arxiv.org/html/2604.07430v1/x2.png\" />\n<em>图：HY-Embodied-0.5 的 Mixture-of-Transformers 架构。论文把视觉与语言 Token 的主干计算显式解耦，同时通过视觉潜在 Token 和混合优化目标重新把多模态语义绑定起来。</em></p>\n<h5>训练流程图</h5>\n<p><img alt=\"HY-Embodied-0.5 训练流程\" src=\"https://arxiv.org/html/2604.07430v1/x5.png\" />\n<em>图：训练管线示意。模型先通过大规模预训练建立多模态与空间感知基础，再通过具身后训练强化推理，最后做大模型到边缘模型的 on-policy 蒸馏。</em></p>\n<h5>核心伪代码</h5>\n<pre><code class=\"language-python\"># HY-Embodied-0.5 simplified training recipe\n# x_v: visual tokens, x_t: text tokens\n\nz_v = HYViT2(x_v)                               # native-resolution visual encoder\nz_v = append_visual_latents(z_v)                # add visual latent tokens\n\nh_v = visual_blocks(z_v)                        # modality-specific visual path\nh_t = text_blocks(x_t)                          # modality-specific language path\nh = cross_modal_fuse(h_v, h_t)                  # mixed optimization aligns modalities\n\n# stage 1/2: pre-training + mid-training\nloss_mm = loss_next_token(h) + loss_visual_aux(h_v)\nupdate(loss_mm)\n\n# stage 3: embodied post-training\nfor iteration in range(K):\n    reasoning_traces = self_evolve(h)\n    loss_post = sft_loss(reasoning_traces) + rl_loss(reasoning_traces)\n    update(loss_post)\n\n# stage 4: large-to-small distillation\nteacher_action = large_model.rollout(obs, instruction)\nstudent_action = small_model.rollout(obs, instruction)\nloss_distill = on_policy_distill(student_action, teacher_action)\nupdate(loss_distill)\n</code></pre>\n<h5>动机与背景</h5>\n<p>很多通用 VLM 已经具备强视觉语义理解能力，但把它们直接拿来做具身智能仍然会遇到两个短板。第一，具身任务比网页问答或图文理解更依赖精细的空间关系、时序变化和交互可供性，普通多模态预训练并不会天然学到这些能力。第二，真实机器人部署要求同时兼顾强推理和低延迟，这意味着单一的大模型路线很难既做复杂具身推理，又稳定落到边缘控制系统。</p>\n<p>HY-Embodied-0.5 的做法是把问题拆开处理。论文先承认“具身感知”和“语言推理”虽然相关，但在计算模式上并不完全相同，因此不再强行让所有 Token 走一套完全共享的 Transformer，而是给视觉和文本保留不同的主干计算路径。然后再通过专门设计的 latent token 和训练目标，把这些被解耦的表征重新拉回同一个具身语义空间。这是它相对普通统一式 VLM 的第一个关键转向。</p>\n<p>第二个转向体现在训练流程上。论文并不满足于预训练阶段得到一个“会看会说”的模型，而是额外设计了具身后训练阶段，让模型学会更长链条的空间推断、预测、交互与规划。最后，再通过 on-policy 蒸馏把这些高阶能力压缩给小模型，使 2B 级别模型能进入真实部署场景。这说明 HY-Embodied-0.5 从一开始就不是单篇论文里常见的“只做模型结构创新”，而是一套面向真实 agent 的完整基础模型配方。</p>\n<div class=\"key-point\">💡 关键：HY-Embodied-0.5 的核心不是单点技巧，而是“模态解耦的感知主干 + 具身导向的后训练 + 大到小蒸馏”三段式协同设计。</div>\n<h5>核心机制一：Mixture-of-Transformers 与视觉潜在 Token</h5>\n<p>论文提出的 MoT 可以理解为“在同一个序列里保留多模态协同，但不要求视觉和文本完全共享内部算子”。传统统一式 Transformer 往往对所有 Token 采用同一组 QKV 投影、同一类 FFN 和同一注意力模式；HY-Embodied 则针对视觉分支保留更适合强感知建模的专属路径。直觉上，这样做可以减轻一个常见冲突：大量视觉训练虽然能提高感知精度，却可能拖累语言能力，而完全共享参数又会让两种模态彼此牵制。</p>\n<p>如果把视觉 Token 记为 <span class=\"kb-math kb-math-inline\">x_v</span>，文本 Token 记为 <span class=\"kb-math kb-math-inline\">x_t</span>，那么模型的核心思想可以抽象成：</p>\n<div class=\"kb-math kb-math-display\">h_v = f_v(x_v; \\theta_v), \\qquad h_t = f_t(x_t; \\theta_t)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">f_v</span> 和 <span class=\"kb-math kb-math-inline\">f_t</span> 对应模态自适应的 Transformer 路径。随后模型再通过跨模态融合层把两者对齐：</p>\n<div class=\"kb-math kb-math-display\">h = g(h_v, h_t)</div>\n<p>这里的重点不是公式本身，而是参数不再完全共享。视觉和语言仍然处于同一总体模型里，但中间计算过程被显式“专业化”了。</p>\n<p>在这个框架上，论文又加入了 <strong>visual latent tokens</strong>。这些 Token 不是原始图像 patch，也不是自然语言词元，而是一组附加在视觉序列尾部的潜在表征，用来吸收高阶空间信息并加强视觉到语言的迁移。可以把它理解为一组专门为“具身理解”服务的视觉寄存器。它们通过额外监督学习哪些局部目标、接触关系和空间区域最值得被语言侧读取，从而改善细粒度感知。</p>\n<div class=\"warn-box\">⚠️ 注意：MoT 的重点不是简单扩大容量，而是避免“为了视觉训练牺牲语言”或“为了统一建模牺牲细粒度感知”这类多模态基础模型中的结构性矛盾。</div>\n<h5>核心机制二：具身后训练与迭代式自演化推理</h5>\n<p>HY-Embodied-0.5 的另一条主线是后训练阶段。论文认为，仅靠大规模多模态预训练，模型虽然能识别图像内容，但不一定能在复杂场景里完成“观察环境 -&gt; 推断可操作性 -&gt; 规划交互步骤 -&gt; 预测动作后果”这一整条推理链。因此作者单独设计了 embodied post-training，用迭代式自演化和强化学习进一步塑造推理能力。</p>\n<p>这一步的直觉是：先让模型生成具身推理轨迹，再用后续轮次的训练去不断修正这些轨迹。论文把这种过程称为 <strong>iterative self-evolution</strong>。从训练视角看，它不是一次性监督模型输出答案，而是反复优化中间思考、空间分析和行动决策，使模型逐步形成更稳健的长链推理能力。其目标可以粗略写成：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{post}} = \\mathcal{L}_{\\text{SFT}} + \\lambda \\mathcal{L}_{\\text{RL}}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\mathcal{L}_{\\text{SFT}}</span> 负责把高质量具身轨迹教给模型，<span class=\"kb-math kb-math-inline\">\\mathcal{L}_{\\text{RL}}</span> 则进一步按照奖励信号偏置那些更符合空间、交互与任务完成要求的推理路径。</p>\n<p>和传统“多模态模型加一点机器人数据微调”相比，这里的差异在于后训练目标更明确地面向 <strong>具身 reasoning</strong>。论文给出的例子强调模型会显式分析空间关系、物体状态、操作顺序与可供性，而不是仅靠语言先验猜测答案。也因此，它在空间和具身 benchmark 上的提升，不是单纯来自更多数据，而是来自更接近 agent 工作方式的训练范式。</p>\n<h5>核心机制三：Large-to-Small On-Policy Distillation 与真实机器人控制</h5>\n<p>如果只有 32B 级别大模型表现好，这个体系仍然很难真正部署。HY-Embodied-0.5 的第三个关键设计是 <strong>large-to-small on-policy distillation</strong>。做法不是离线地把大模型 logits 蒸给小模型，而是让教师模型在真实 rollout 或近似真实策略分布下给出行为，再让学生模型在同一策略环境里学习这些行为。这样蒸馏出的不是孤立 token 分布，而是与交互过程一致的具身策略偏好。</p>\n<p>从形式上，可以把它理解为最小化大小模型在同一状态分布上的策略差异：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{distill}} = \\mathbb{E}_{(o, a^T) \\sim \\pi_T}\\left[\\ell\\big(\\pi_S(o), a^T\\big)\\right]</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\pi_T</span> 是教师策略，<span class=\"kb-math kb-math-inline\">\\pi_S</span> 是学生策略，<span class=\"kb-math kb-math-inline\">o</span> 是观测，<span class=\"kb-math kb-math-inline\">a^T</span> 是教师在 on-policy rollout 中产生的动作或决策。关键在于数据分布随教师策略而动，而不是只在静态离线语料上拟合。</p>\n<p>论文最终把这种 VLM 基础能力迁移到 VLA 训练里，并在真实双臂机器人任务上评估了插接包装、餐具堆叠和杯子悬挂等任务。Figure 13 展示了真实世界 setup 与成功率统计，说明作者并不是停留在 benchmark 分数层面，而是验证了模型能否支撑真实控制链路。对 VLA 页面而言，这一点尤其重要，因为 HY-Embodied-0.5 更像“给机器人控制提供高质量认知底座”的上游 foundation model，而不是只做网页式多模态问答的通用 VLM。</p>\n<h5>机器人结果图</h5>\n<p><img alt=\"HY-Embodied-0.5 真实机器人评测\" src=\"https://arxiv.org/html/2604.07430v1/x13.png\" />\n<em>图：真实双臂平台上的任务设置与成功率结果。论文用同一批真实演示数据微调 VLA，并与 <span class=\"kb-math kb-math-inline\">\\pi_0</span>、<span class=\"kb-math kb-math-inline\">\\pi_{0.5}</span> 等基线比较。</em></p>",
      "quiz": {
        "q": "HY-Embodied-0.5 中 Mixture-of-Transformers 的主要作用是什么？",
        "options": [
          "把所有视觉和语言 Token 强制共享同一套 QKV 与 FFN，以减少参数量",
          "将视觉和文本 Token 分别交给模态专属计算路径处理，再通过跨模态机制重新对齐",
          "仅用于把 32B 模型压缩成 2B 模型，与感知能力无关",
          "把 VLA 的连续动作离散化成文本 Token，方便自回归解码"
        ],
        "answer": 1,
        "explain": "MoT 的核心是模态自适应计算。它不是单纯做压缩，而是通过视觉和语言的专属 Transformer 路径减轻共享参数冲突，再借助潜在 Token 和融合训练保持多模态对齐。"
      }
    },
    {
      "id": "neurovla",
      "num": 27,
      "name": "NeuroVLA",
      "fullName": "神经形态视觉-语言-动作 (NeuroVLA)",
      "year": "2026.01",
      "org": "AI2 Robotics / HKUST(GZ)",
      "parent": "hpt",
      "paperUrl": "https://arxiv.org/abs/2601.14628",
      "projectUrl": "",
      "category": "transformer_policy",
      "motivation": "模拟皮层-小脑-脊髓分层控制，实现低功耗快速反射",
      "summary": "NeuroVLA 提出了一种模仿皮层、小脑和脊髓分工的神经形态 VLA 架构，把高层语义规划、基于本体感觉的运动稳定化和脉冲式快速执行拆成三级控制回路，在真实机器人上同时实现了更平滑的动作、更低的能耗以及小于 20ms 的安全反射。",
      "keyPoints": [
        "提出 <strong>Neuromorphic Vision-Language-Action (NeuroVLA)</strong>：首个部署到真实机器人的神经形态 VLA",
        "三层类脑架构：<strong>Cortical</strong> 负责语义规划，<strong>Cerebellar</strong> 负责高频传感反馈下的稳定化调制，<strong>Spinal</strong> 负责超低时延动作生成",
        "Cerebellar 模块使用 <strong>GRU + gated FiLM + iterative refinement</strong>，把本体感觉历史转成对高层意图的动态增益调制",
        "Spinal 模块采用 <strong>LIF 脉冲神经网络</strong> 与脉冲残差结构，利用神经形态处理器执行动作解码",
        "在无额外指导信号的情况下，涌现出抖动抑制、时序记忆、能量稀疏和快速反射等“生物运动特性”",
        "论文强调 <strong>0.4W 神经形态功耗</strong> 与 <strong>&lt;20ms 安全反射</strong>，对实时具身控制尤其关键",
        "通过少量下游样本微调即可超过纯预训练基线，体现出生物启发分层结构带来的样本效率"
      ],
      "detail": "<h5>核心架构图</h5>\n<p><img alt=\"NeuroVLA 架构总览\" src=\"https://ar5iv.labs.arxiv.org/html/2601.14628/assets/x1.png\" />\n<em>图：论文总览图。NeuroVLA 将控制链条拆为皮层规划、小脑调制和脊髓执行三层，分别对应低频语义决策、中频状态稳定化和高频脉冲式动作生成。</em></p>\n<h5>结果图：能效与快速反射</h5>\n<p><img alt=\"NeuroVLA 的神经形态能效与反射能力\" src=\"https://ar5iv.labs.arxiv.org/html/2601.14628/assets/x6.png\" />\n<em>图：论文结果图之一，展示神经形态执行层在低功耗和快速反射上的优势。</em></p>\n<h5>核心伪代码</h5>\n<pre><code class=\"language-python\"># NeuroVLA: cortex -&gt; cerebellum -&gt; spinal cord\n# I_t: image observation, L: language instruction\n# s_hist: proprioceptive history (joint / velocity / force)\n\nz_sem = cortex_vlm(I_t, L)                 # high-level goal / semantic intent\nh_t = GRU(s_hist)                          # compact dynamic state\ng_t = sigmoid(W_g @ proj(h_t))             # gating from proprioception\ngamma_t, beta_t = film_params(h_t)         # modulation parameters\n\nz_mod = (1.0 + gamma_t) * (z_sem * g_t) + beta_t\n\nfor _ in range(K):                         # iterative refinement loop\n    z_mod = refine_with_forward_model(z_mod, s_hist)\n\nspikes = spinal_snn(z_mod)                 # LIF spiking rollout on neuromorphic chip\naction = decode_action(spikes)\n</code></pre>\n<h5>动机与背景</h5>\n<p>传统 VLA 模型的强项在于把视觉和语言语义对齐后直接映射到动作，但它们通常仍像“大一统前馈策略”一样工作：高层理解、运动稳定、快速反射都被塞在同一条控制通路里。这会带来两个典型问题。第一，策略容易抖动，因为模型缺少类似生物小脑那样针对动态误差做高频阻尼和修正的结构。第二，安全反射不够快，因为所有信息都要经过高层语义回路，无法像脊髓反射那样本地快速闭环。</p>\n<p>NeuroVLA 的思路不是单纯增大 VLA 规模，而是重新设计控制分工。论文把生物神经系统里的皮层、小脑、脊髓映射到具身模型里：皮层负责“做什么”，小脑负责“怎么更稳”，脊髓负责“怎么更快”。这让系统从一开始就具有多时标、多路径的控制结构，而不是让单一模型同时兼顾所有控制目标。</p>\n<div class=\"key-point\">💡 关键：NeuroVLA 的创新点不只是“把 SNN 接到 VLA 后面”，而是把具身控制问题显式分解为语义规划、动态稳定和快速执行三种不同时间尺度的子问题，再用不同计算底层分别实现。</div>\n<h5>核心机制一：皮层语义计划 + 小脑状态调制</h5>\n<p>论文将控制过程抽象为一个层级组合：</p>\n<div class=\"kb-math kb-math-display\">a_t = \\Phi_{\\text{spine}}\\big(\\Phi_{\\text{cerebellum}}(\\Phi_{\\text{cortex}}(I_t, L), h_t)\\big)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">I_t</span> 是视觉输入，<span class=\"kb-math kb-math-inline\">L</span> 是语言指令，<span class=\"kb-math kb-math-inline\">h_t</span> 是由本体感觉历史提取出的动态上下文。高层的 Cortical 模块先从图像和语言得到语义意图 <span class=\"kb-math kb-math-inline\">z_{\\text{sem}}</span>，而不是直接出最终动作。之后，小脑模块再用来自关节位置、速度、力/力矩等本体感觉历史的信息，去重新塑形这个语义意图。</p>\n<p>具体地，Cerebellar 模块使用一个 GRU 对状态历史编码，并通过 gated FiLM 风格的调制把动态身体状态写回语义 latent：</p>\n<div class=\"kb-math kb-math-display\">z_{\\text{mod}} = (1+\\gamma_t)\\,(z_{\\text{sem}}\\cdot g_t) + \\beta_t</div>\n<p>这里 <span class=\"kb-math kb-math-inline\">g_t</span> 是门控因子，<span class=\"kb-math kb-math-inline\">\\gamma_t</span> 和 <span class=\"kb-math kb-math-inline\">\\beta_t</span> 是由本体感觉上下文生成的调制参数。直觉上，这一步相当于“让身体状态去修正意图”。例如，当机器人检测到接触扰动或运动抖动时，小脑模块不必重新调用重型 VLM 做语义重推理，而是直接基于动态反馈对高层意图做增益抑制、偏置补偿和阻尼修正。</p>\n<h5>核心机制二：迭代精炼与数字化传出副本</h5>\n<p>论文进一步加入了 iterative refinement loop，用来模拟生物系统中的 efference copy。也就是说，系统并不是只调制一次高层意图就结束，而是把“当前动作计划会引起怎样的状态变化”纳入一个短回路里反复精炼。这个机制的意义在于：在动作真正交给执行层之前，模型已经提前在内部做了一次或多次快速动力学修正。</p>\n<p>这类设计与普通 Transformer 的多层前馈不同，它不是单纯加深网络，而是在结构上显式引入“动作意图 - 预测状态 - 再修正意图”的闭环。对于机器人控制，这一步尤其重要，因为真实误差很多并不来自视觉理解，而来自摩擦、关节迟滞、重力补偿不准和瞬时接触扰动。论文报告的抖动下降和更平滑的轨迹，本质上就是这种中频稳定化回路在起作用。</p>\n<div class=\"warn-box\">⚠️ 注意：NeuroVLA 的目标不是让皮层模块更强，而是让高层规划不要承担本该由低层控制系统处理的快速稳定任务。这样既减少高层负担，也使高频控制不再被大模型推理延迟拖慢。</div>\n<h5>核心机制三：脊髓式脉冲执行与快速反射</h5>\n<p>NeuroVLA 最具“神经形态”特征的部分在于 Spinal 层。这里论文使用 LIF（Leaky Integrate-and-Fire）神经元构建脉冲网络，并部署到神经形态处理器上做动作执行。典型的膜电位更新形式可以写成：</p>\n<div class=\"kb-math kb-math-display\">u_i^{(l)}[\\tau] = \\beta u_i^{(l)}[\\tau-1] + \\sum_j w_{ij}s_j^{(l-1)}[\\tau] - s_i^{(l)}[\\tau-1]\\theta</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">u</span> 是膜电位，<span class=\"kb-math kb-math-inline\">\\beta</span> 是衰减系数，<span class=\"kb-math kb-math-inline\">s</span> 是离散脉冲发放，<span class=\"kb-math kb-math-inline\">\\theta</span> 是发放阈值。与常规 ANN 不同，这种状态会在时间上自然积累和泄漏，因此不需要显式 RNN，也能保留一部分短时动态记忆。论文把这种性质与 temporal memory、temporal sparsity 以及快速 reflex 联系起来。</p>\n<p>更重要的是，这个脊髓层不必经过完整的高层语义通路就能响应高风险输入。于是碰撞或异常力反馈出现时，可以直接触发本地快速反射，论文给出的量级是 <strong>小于 20ms</strong>。这和依赖高层 VLM 重新规划的路径相比，时延差距是决定性的。与此同时，神经形态执行层的功耗只有 <strong>0.4W</strong>，说明它不仅快，而且便宜，适合长时间运行的实体机器人。</p>\n<h5>与传统 VLA 的区别</h5>\n<p>如果把 OpenVLA、RT-2 这类方法看作“强语义、大一统”的 VLA，那么 NeuroVLA 更像“多层闭环控制系统”。它没有放弃 VLA 的语义能力，而是承认机器人控制里存在不同的时间尺度和不同的计算需求：高层需要强语义，中层需要状态估计和阻尼，低层需要快速局部反射。传统方法通常把这些问题都压到单一大模型里统一求解，而 NeuroVLA 则通过结构分工把它们拆开。</p>\n<p>这也是为什么论文强调的不只是成功率，而是一些更偏控制系统属性的指标：<strong>抖动降低、时序记忆、反射延迟、能耗</strong>。这些指标共同说明，NeuroVLA 不仅在“会不会做任务”上发力，也在“动作是否更像一个真实生物控制系统”上发力。对于 VLA 进入高速、接触丰富、人机共处的真实场景，这种转向是有意义的。</p>",
      "quiz": {
        "q": "NeuroVLA 中负责利用高频本体感觉反馈对高层语义意图进行稳定化调制的模块是哪个？",
        "options": [
          "Cortical 模块，因为它负责理解语言和视觉",
          "Cerebellar 模块，因为它负责基于状态历史进行动态增益调制",
          "Spinal 模块，因为它直接在神经形态芯片上输出动作",
          "训练数据清洗模块，因为它降低了动作噪声"
        ],
        "answer": 1,
        "explain": "NeuroVLA 的 Cerebellar 模块对应生物小脑，核心职责就是读取本体感觉历史并通过 gated FiLM 和迭代精炼去修正高层意图，从而抑制抖动并提升运动稳定性。"
      }
    },
    {
      "id": "pi0_7",
      "num": 28,
      "name": "π0.7",
      "fullName": "物理智能零点七 (π0.7)",
      "year": "2026.04",
      "org": "Physical Intelligence",
      "parent": "pi0",
      "paperUrl": "https://www.pi.website/blog/pi0-7-a-steerable-model-with-emergent-capabilities",
      "projectUrl": "",
      "category": "diffusion_flow",
      "motivation": "组合泛化支持跨多种机器人本体",
      "summary": "π0.7 是 Physical Intelligence 推出的可操控通用视觉-语言-动作（VLA）模型，通过多模态提示（语言指令、元数据、控制模态、视觉子目标）训练，首次展示了机器人基础模型的**涌现组合泛化**能力——无需微调即可将已学技能重组用于新任务、新物体和新机器人本体，且开箱性能匹敌此前需 RL 微调的专家模型。",
      "keyPoints": [
        "单一统一模型：π0.7 是一个通用 VLA 模型，能操控多种不同类型的机器人执行广泛任务，无需针对具体任务/本体进行微调",
        "可操控（Steerable）架构：训练时注入多样化多模态提示——语言指令（what to do）、元数据/策略元数据（how to do: 质量、速度）、控制模态切换、视觉子目标图像",
        "涌现组合泛化（Compositional Generalization）：首次展现机器人基础模型像 LLM 一样重组已学技能解决全新任务（如操作未见过的厨房电器、折叠衣物在新机器人本体上）",
        "语言指导（Language Coaching）：可通过逐步口头指令\"教\"机器人新任务，并将指导经验蒸馏为高层策略实现完全自主执行",
        "Recap 蒸馏：将 RL（Recap 算法）训练中产生的自主数据蒸馏到 π0.7 模型中，单模型在折叠衣物、制作浓缩咖啡、折叠纸箱等任务上达到或超越 RL 专家策略的性能和吞吐量",
        "跨本体迁移（Cross-Embodiment Transfer）：从固定双臂数据采集机器人到 UR5e 双臂系统的折叠衣物零样本迁移，成功率匹配经验丰富的人类遥操作员的零样本表现",
        "广泛数据混合：融合多种机器人数据、人类演示数据和自主策略 rollout 数据，通过策略元数据标签（如质量/速度级别）实现有效的数据混合利用"
      ],
      "detail": "<h5>核心架构与推理流程</h5>\n<p><img alt=\"π0.7 训练与推理流程示意图\" src=\"https://www.pi.website/_next/image?url=%2Fimages%2Fpi07%2Fsubgoal_1.png&amp;w=3840&amp;q=75\" />\n<em>图：π0.7 训练时接收语言指令、子目标图像、Episode 元数据（Quality/Speed）；推理时由高层策略生成任务指令 → 子任务指令，世界模型生成子目标图像，VLA 政策执行动作</em></p>\n<p>π0.7 的架构核心是一种<strong>可操控（Steerable）的 VLA 模型</strong>，其关键创新在于训练时向模型注入的不只是\"做什么（what）\"，还包括\"怎么做（how）\"的信息。训练时的多模态提示流包括：</p>\n<ol>\n<li><strong>语言指令</strong>：描述任务的自然语言（如 \"pick up the oven mitt\" → \"open the drawer\" → \"grab the spatula\"...），构成任务执行的层次化语义指导</li>\n<li><strong>视觉子目标（Subgoal Images）</strong>：世界模型生成的期望未来观察图像，为策略提供视觉锚定的中间目标状态</li>\n<li><strong>Episode 元数据（Metadata）</strong>：标量标签（如 Quality 和 Speed 等级），使同一模型可以根据部署需求调整行为风格——高质量模式更稳健，高速度模式更快</li>\n</ol>\n<p>推理时的高层流程：</p>\n<pre><code>高层策略（High-Level Policy）\n  ├── 任务指令（TASK INSTRUCTION）\n  └── 子任务指令序列（SUBTASK INSTRUCTIONS）\n       └── 世界模型（World Model）\n            └── 子目标图像（SUBGOAL）+ 期望元数据（Quality/Speed）\n                 └── π0.7 VLA Policy → 动作序列\n</code></pre>\n<pre><code class=\"language-python\"># π0.7 推理流程伪代码\ndef pi07_inference(observation_history, task_instruction, metadata):\n    &quot;&quot;&quot;\n    推理时 π0.7 接收多模态提示并自回归生成动作序列\n\n    Args:\n        observation_history: 历史观测（图像）序列\n        task_instruction:  高层/子任务语言指令\n        metadata:          dict with &quot;quality&quot; 和 &quot;speed&quot; 键控制行为风格\n    &quot;&quot;&quot;\n    # 1. 高层策略将任务分解为子任务语言指令\n    subtask_instructions = high_level_policy.generate(task_instruction)\n\n    for subtask_text in subtask_instructions:\n        # 2. 世界模型根据当前观测+子任务文本生成视觉子目标\n        subgoal_image = world_model(\n            observation_history,\n            subtask_text,\n            desired_metadata=metadata\n        )\n\n        # 3. VLA 策略融合所有模态生成动作\n        #    输入: 观测记忆 + 子任务文本 + 子目标图像 + 元数据\n        action = pi07_vla_policy(\n            obs_memory=observation_history,\n            language_prompt=subtask_text,\n            visual_subgoal=subgoal_image,\n            quality_flag=metadata[&quot;quality&quot;],\n            speed_flag=metadata[&quot;speed&quot;]\n        )\n\n        # 4. 执行动作并更新观测历史\n        observation_history = execute_and_update(action)\n</code></pre>\n<h5>组合泛化的实现机制</h5>\n<p>π0.7 的组合泛化能力来源于三个层面的设计：</p>\n<p><strong>① 多样化多模态提示的解耦训练（Disentangled Prompt Training）</strong></p>\n<p>传统 VLA 模型训练时仅使用单一的语言指令或目标图像，π0.7 在训练过程中<strong>同时或交替使用多种提示模态</strong>——语言、元数据、控制模态标志和视觉子目标。这迫使模型学会将技能的不同维度（语义理解、行为质量、执行速度、视觉推理）解耦编码，从而在推理时可以实现自由重组。</p>\n<p>例如，训练数据中：\n- 样本 A：语言 = \"fold the towel\"，质量 = high，速度 = low\n- 样本 B：语言 = \"wipe the counter\"，质量 = medium，速度 = high\n- 样本 C：仅提供视觉子目标，无语言</p>\n<p>通过交错训练，模型学会了\"折叠毛巾\"的语义技能和\"高质量\"的执行风格是两个可独立的因子，推理时即可将\"折叠衣物\"（已学语义）+\"高质量\"+\"UR5e 本体观测\"组合。</p>\n<p><strong>② 语言指导（Language Coaching）的动态技能获取</strong></p>\n<p>这是 π0.7 实现新任务泛化的关键管道。对于训练数据中未出现的新任务（如操作空气炸锅），人类通过逐步口头指令引导机器人：</p>\n<ol>\n<li><strong>零样本尝试</strong>：给定高层指令 \"load a sweet potato into the air fryer\"，π0.7 做出合理但不完整的尝试（打开空气炸锅、尝试放入红薯，但未能完成）</li>\n<li><strong>逐步语言指导</strong>：人类提供细致步骤指令（\"open the air fryer basket\" → \"place the sweet potato inside\" → \"close the basket\" → \"press start\"），π0.7 在执行过程中将语言指令与视觉观察和动作进行对齐</li>\n<li><strong>高层策略蒸馏</strong>：多次指导后，将成功的语言指令序列用于微调高层策略，使其能自主生成子任务指令序列，实现完全自主执行</li>\n</ol>\n<p>这一流程本质上是一种<strong>基于语言的上下文化强化学习</strong>：模型利用预训练的语义理解和物理操控能力，通过语言提示\"锚定\"新任务的执行轨迹。</p>\n<p><strong>③ Recap RL 经验的数据蒸馏</strong></p>\n<p>π0.7 在训练数据上集成了 Recap 算法产生的自主 rollout 轨迹。Recap 是 RL 微调流程，用于同时优化任务成功率和执行速度。关键发现是：</p>\n<ul>\n<li>直接将 RL rollout 数据与其他数据源（人类演示、不同机器人数据）混合训练<strong>并不能</strong>带来好的效果</li>\n<li>解决方案是给每条数据打上策略元数据标签（quality level, speed level），让模型在学习过程中条件化于这些元数据</li>\n<li>最终单一 π0.7 模型能在折叠衣物、浓缩咖啡制作、折叠纸箱等任务上达到或超越任务专属 RL 专家策略（Recap specialist）的表现</li>\n</ul>\n<p>这验证了一个重要假设：<strong>如果给予正确的条件化信号，通用模型可以从多样化质量的数据中有效学习，而不会被低质量数据污染</strong>。</p>\n<h5>与传统方法的区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th style=\"text-align: center;\">传统 VLA 模型</th>\n<th style=\"text-align: center;\">π0.7</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>任务泛化</td>\n<td style=\"text-align: center;\">需对每个任务微调（fine-tuning）才能获得好性能</td>\n<td style=\"text-align: center;\">开箱即用，多任务直出</td>\n</tr>\n<tr>\n<td>技能重组</td>\n<td style=\"text-align: center;\">未见组合泛化能力报道</td>\n<td style=\"text-align: center;\">涌现组合泛化，操作新电器、新本体折叠衣物</td>\n</tr>\n<tr>\n<td>行为风格</td>\n<td style=\"text-align: center;\">固定策略，无法调节质量/速度</td>\n<td style=\"text-align: center;\">通过元数据标签实时调控行为风格</td>\n</tr>\n<tr>\n<td>新技能获取</td>\n<td style=\"text-align: center;\">需收集新演示数据</td>\n<td style=\"text-align: center;\">语言指导 + 高层策略蒸馏，无新遥操作数据</td>\n</tr>\n<tr>\n<td>数据利用</td>\n<td style=\"text-align: center;\">谨慎过滤数据，避免低质量数据拖累</td>\n<td style=\"text-align: center;\">策略元数据条件化，可有效利用混合质量数据</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 关键洞察：π0.7 的核心贡献不是架构创新，而是<strong>训练策略和数据混合方式的创新</strong>——它证明了正确的多模态条件化可以让 VLA 模型涌现出此前仅在 LLM 中观察到的组合泛化能力。</p>\n<p>⚠️ 注意：π0.7 的组合泛化仍处于\"早期迹象\"阶段——在空气炸锅任务的重试后仍需语言指导才能成功。Physical Intelligence 明确将其描述为\"first signs of compositional generalization\"，而非完全解决。</div>\n<h5>训练与推理代价</h5>\n<p>从博客披露的信息推断，π0.7 的训练融合了：\n- 多机器人平台（双臂固定式、UR5e 双臂、Franka 等）的操作数据\n- 开源 DROID 数据集（Franka 臂）\n- 人类遥操作演示数据\n- Recap RL 自主 rollout 数据</p>\n<p>策略元数据标签（Quality/Speed）使模型可以条件化地利用不同质量水平的数据——低质量数据在低质量标签下仍可提供有价值的探索信息，而不会在高标签条件下误导模型。这是数据高效利用的关键工程设计。</p>",
      "quiz": {
        "q": "π0.7 实现组合泛化的关键训练机制是什么？",
        "options": [
          "使用更大的 Transformer 模型参数量",
          "通过多模态提示（语言、元数据、子目标图像）解耦技能维度，并在推理时重组",
          "在测试时用 RL 对每个新任务进行快速微调",
          "仅使用人类专家演示数据，确保数据质量一致性"
        ],
        "answer": 1,
        "explain": "π0.7 训练时同时/交替接收语言指令、策略元数据（质量/速度）、视觉子目标等多样化提示，促使模型将技能语义与执行风格解耦编码；推理时可通过自由重组这些因子实现对未见任务/本体的泛化。"
      }
    },
    {
      "id": "openvla2",
      "num": 29,
      "name": "OpenVLA-OFT",
      "fullName": "开源VLA优化微调 (OpenVLA-OFT)",
      "year": "2025.02",
      "org": "Stanford",
      "parent": "openvla",
      "paperUrl": "https://arxiv.org/abs/2502.19645",
      "projectUrl": "",
      "category": "vlm_finetune",
      "motivation": "并行解码与连续动作兼顾速度、质量和高频控制",
      "summary": "OpenVLA-OFT 系统研究了 OpenVLA 的微调设计空间，提出结合并行解码、动作分块、连续动作表示和 L1 回归目标的 OFT 配方，在保留 OpenVLA 语义泛化能力的同时，将 LIBERO 平均成功率从 76.5% 提升到 97.1%，并把动作生成吞吐提升到原始 OpenVLA 的 26 倍。",
      "keyPoints": [
        "以 <strong>OpenVLA</strong> 为基础 VLA，研究微调阶段的关键设计选择，而不是重新训练一个全新骨干",
        "提出 <strong>OFT (Optimized Fine-Tuning)</strong> 配方：并行解码、动作分块、连续动作表示、L1 回归目标",
        "提出 <strong>OpenVLA-OFT</strong>：在 LIBERO 四套任务上达到 <strong>97.1%</strong> 平均成功率，显著高于原始 OpenVLA 的 <strong>76.5%</strong>",
        "推理侧通过 <strong>parallel decoding + action chunking</strong> 将动作生成吞吐提升 <strong>26x</strong>，同时降低控制延迟",
        "支持更灵活的输入输出规格：多相机输入、可选本体状态、单臂/双臂控制、高频动作块输出",
        "在真实世界 <strong>双臂 ALOHA</strong> 平台上，OFT 配方支持高频语言驱动控制，并可通过 <strong>FiLM</strong> 增强语言接地能力形成 <strong>OpenVLA-OFT+</strong>",
        "在真实机器人评测中，超过按默认配方微调的 <strong>π0</strong> 和 <strong>RDT-1B</strong>，以及从零训练的 <strong>ACT</strong> 和 <strong>Diffusion Policy</strong>，平均成功率最高可领先 <strong>15%</strong>",
        "保持 OpenVLA 的参数高效微调范式，可结合 <strong>LoRA</strong> 训练，不需要重新做全参数预训练"
      ],
      "detail": "<h5>核心架构图</h5>\n<p><img alt=\"OpenVLA-OFT 在双臂 ALOHA 上的总体框架\" src=\"https://openvla-oft.github.io/static/images/openvla_oft_figure_1.jpeg\" />\n<em>图：OpenVLA-OFT / OpenVLA-OFT+ 的整体思路。方法仍以 OpenVLA 为骨干，但把原始逐 token、自回归、离散动作解码改成更适合控制的并行连续动作块输出，并在真实双臂 ALOHA 场景中验证高频控制与语言跟随能力。</em></p>\n<h5>推理效率结果图</h5>\n<p><img alt=\"OpenVLA-OFT 在 LIBERO 上的推理效率结果\" src=\"https://openvla-oft.github.io/static/images/libero_inference_efficiency_results.png\" />\n<em>图：论文项目页给出的 LIBERO 推理效率对比。OpenVLA-OFT 通过并行解码和动作分块显著降低延迟，并将动作生成吞吐提升到原始 OpenVLA 的约 26 倍。</em></p>\n<h5>核心伪代码</h5>\n<pre><code class=\"language-python\"># OpenVLA-OFT: continuous chunk prediction with parallel decoding\n# o: image observations, l: language instruction, p: proprio state (optional)\n# H: action chunk length\n\ntokens = tokenize_images_and_text(o, l, p)\nhidden = openvla_backbone(tokens)\n\n# Reserve H output positions and decode all action steps in parallel\nchunk_states = hidden[-H:]\npred_actions = action_head(chunk_states)      # shape: [H, action_dim]\n\nloss = 0.0\nfor t in range(H):\n    loss += l1(pred_actions[t], gt_actions[t])\nloss = loss / H\n\nloss.backward()\noptimizer.step()\n</code></pre>\n<h5>动机与背景</h5>\n<p>原始 OpenVLA 的核心优势在于把大规模视觉语言预训练迁移到机器人控制中，但它仍继承了典型的 VLM 风格动作输出方式: 先把连续动作离散成 token，再逐 token 自回归生成。这种设计在语义对齐上很自然，却会直接带来两个控制层面的代价。第一，<strong>推理太慢</strong>。每次控制都要顺序解出整段动作 token，控制频率很容易被卡住。第二，<strong>动作表示和控制需求不匹配</strong>。真实机器人要的是连续、平滑、成块的动作轨迹，而不是语言模型式的离散词表采样。</p>\n<p>OFT 这篇论文的切入点不是“再造一个更大的 VLA”，而是更务实的问题：如果我们已经有了 OpenVLA 这样的强骨干，怎样微调才能同时提高成功率、速度和部署灵活性？作者把设计空间拆成几个最关键的维度来系统比较：是自回归还是并行解码，是离散动作还是连续动作，是单步还是动作分块，以及损失函数该用交叉熵、MSE 还是 L1。最后他们给出的答案不是某一个单点技巧，而是一整套组合配方 OFT。</p>\n<div class=\"key-point\">💡 关键：OFT 的贡献本质上是把 “面向语言建模的输出方式” 改造成 “面向机器人控制的输出方式”。它没有推翻 OpenVLA 的视觉语言骨干，而是把最影响控制效率和动作质量的输出层与训练目标重新设计了一遍。</div>\n<h5>核心机制一：从自回归离散 token 到并行连续动作块</h5>\n<p>原始 OpenVLA 的动作预测可以概括为一个标准自回归形式：</p>\n<div class=\"kb-math kb-math-display\">p(a_{1:T}\\mid o, l)=\\prod_{t=1}^{T} p(a_t \\mid a_{&lt;t}, o, l)</div>\n<p>这里的 <span class=\"kb-math kb-math-inline\">a_t</span> 不是直接的连续控制量，而是离散化后的动作 token。这样做的优点是完全复用语言模型的 next-token 预测机制，但问题是每个 token 都要顺序生成，延迟会随着输出长度线性累积。对于机器人控制，尤其是双臂、高频、长动作序列场景，这种方式非常吃亏。</p>\n<p>OFT 改成预测一个长度为 <span class=\"kb-math kb-math-inline\">H</span> 的连续动作块：</p>\n<div class=\"kb-math kb-math-display\">\\hat{\\mathbf A}_{1:H} = f_\\theta(o, l, p)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">p</span> 是可选的本体状态输入，<span class=\"kb-math kb-math-inline\">\\hat{\\mathbf A}_{1:H}</span> 表示接下来 <span class=\"kb-math kb-math-inline\">H</span> 步的连续动作向量。也就是说，模型一次前向就给出整段动作块，而不是一个 token 一个 token 地吐。这样设计有两个直接后果。其一，<strong>parallel decoding</strong> 让延迟显著下降；其二，<strong>action chunking</strong> 让模型天然学习短时间范围内的轨迹连贯性，而不是孤立地预测每一个原子动作。</p>\n<h5>核心机制二：为什么连续动作和 L1 目标反而更适合微调</h5>\n<p>论文的一个重要结论是，在 OpenVLA 微调这个问题上，更复杂的动作生成目标未必更好。作者比较了离散动作、连续动作、不同解码方式和不同损失目标后，发现一个简洁但非常有效的组合：<strong>连续动作表示 + L1 回归</strong>。训练目标可以写成：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{OFT}} = \\frac{1}{H}\\sum_{t=1}^{H}\\lVert \\mathbf a_t - \\hat{\\mathbf a}_t \\rVert_1</div>\n<p>这个设计有很强的工程直觉。离散动作虽然兼容语言模型，但会引入量化误差；而 MSE 会更重地惩罚离群值，在示教数据稍有噪声时容易把策略往“平均动作”上拉。L1 则更稳健，特别是在真实机器人演示含有轻微抖动、深浅不一致、末端偏移等噪声时，L1 往往会学到更保守但更可靠的中位型控制策略。论文项目页还专门展示了一个现象：扩散策略会精确复现演示里的坏习惯，而 L1 策略反而会把这些噪声“滤掉”。</p>\n<div class=\"warn-box\">⚠️ 注意：作者并没有声称 L1 在所有 imitation learning 问题上都优于 diffusion。论文更准确的结论是，在 OpenVLA 微调和当前真实机器人示教噪声条件下，L1 配合高容量 VLA 骨干是一种更稳、更快、更容易部署的折中。</div>\n<h5>核心机制三：多输入与高频双臂控制</h5>\n<p>OFT 还解决了原始 OpenVLA 在输入输出规格上的不灵活问题。原版 OpenVLA 更偏向单图像、单臂、低频动作接口，而真实机器人通常需要多视角相机、可选本体状态，以及更高的控制频率。OFT 把这些都纳入统一微调配方：LIBERO 设置里可以使用第三视角和腕部相机；ALOHA 设置里可以同时输入第三视角和双腕相机，再配合 14 维双臂动作输出与更长的 action chunk，形成能直接驱动双臂操作的高频控制策略。</p>\n<p>在语言跟随上，作者进一步提出 <strong>OpenVLA-OFT+</strong>，在视觉特征中注入 <strong>FiLM</strong> 调制，让语言信息不只出现在输入 prompt 中，而是更深地影响视觉表征。这个调制形式可写成：</p>\n<div class=\"kb-math kb-math-display\">\\mathrm{FiLM}(v; l)=\\gamma(l)\\odot v + \\beta(l)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">v</span> 是视觉特征，<span class=\"kb-math kb-math-inline\">\\gamma(l)</span> 和 <span class=\"kb-math kb-math-inline\">\\beta(l)</span> 由语言条件生成。这样做的作用，是把“这次到底要 scoop pretzels 还是 scoop raisins”这类语言差异更强地灌进每一层视觉处理过程里，从而提升细粒度语言接地和多任务切换能力。</p>\n<h5>与 OpenVLA 和扩散式 VLA 的区别</h5>\n<p>和原始 OpenVLA 相比，OpenVLA-OFT 的核心不是更大，而是<strong>更像一个控制策略</strong>。OpenVLA 侧重把 VLM 接到动作 token 上，证明开源 VLA 可行；OFT 则进一步证明，真正把 VLA 用到实际微调和部署时，输出头、动作表示和损失目标比单纯增大骨干更关键。相比扩散式 VLA 如 <span class=\"kb-math kb-math-inline\">\\pi_0</span> 或 RDT-1B，OFT 牺牲了部分生成分布表达能力，但换来更低延迟、更高吞吐，以及在噪声示教条件下更强的执行稳定性。</p>\n<p>这也是为什么它在论文里能同时出现两类提升：一类是 <strong>LIBERO 上从 76.5% 到 97.1% 的成功率提升</strong>，另一类是 <strong>26x 的动作生成吞吐提升</strong>。前者说明这不是“只快不准”的工程优化，后者说明它又不是“只准不实用”的离线模型。对 VLA 真正走向真实机器人部署而言，这种同时优化成功率和控制频率的配方，比单纯再做一个更大的 foundation model 更有落地意义。</p>",
      "quiz": {
        "q": "下列哪一组设计最准确地构成了 OpenVLA-OFT 的核心 OFT 配方？",
        "options": [
          "自回归解码 + 离散动作 bin + 交叉熵损失 + 单步输出",
          "并行解码 + 动作分块 + 连续动作表示 + L1 回归目标",
          "扩散采样 + 连续动作表示 + 奖励模型重排序 + PPO 优化",
          "多智能体协作 + 检索增强推理 + 3D 点云世界模型"
        ],
        "answer": 1,
        "explain": "OFT 的核心贡献不是换骨干，而是给 OpenVLA 设计了一套更适合控制的微调配方：并行解码、动作分块、连续动作表示和 L1 回归，这四者共同带来了速度和成功率提升。"
      }
    },
    {
      "id": "last_r1",
      "num": 30,
      "name": "LaST-R1",
      "fullName": "潜在空间推理R1 (LaST-R1)",
      "year": "2026.05",
      "org": "Simplexity/北大",
      "parent": "pi0_7",
      "paperUrl": "https://pandaily.com/simplexity-robotics-pku-and-cuhk-propose-last-r1-achieving-99-9-success-on-libero-benchmark/",
      "projectUrl": "",
      "category": "diffusion_flow",
      "motivation": "潜在空间物理推理达99.9%",
      "summary": "LaST-R1 首次将隐式链式推理（Latent Chain-of-Thought）与在线强化学习结合，使视觉-语言-动作模型（VLA）能够在压缩的隐式 token 空间中进行内在思考，并通过 Latent-Action Policy Optimization（LAPO）实现推理与执行的联合优化。",
      "keyPoints": [
        "提出 <strong>Last0*</strong> 架构：用 DINOv3 的 top-k 稀疏 token 替代传统 visual summary，将视觉信息压缩为语义丰富的隐式推理锚点",
        "<strong>latent reasoning tokens</strong>：在 visual/text tokens 与 action tokens 之间插入可学习的隐式 token，模型在其中进行自主推理后再输出动作",
        "<strong>Latent-Action Policy Optimization (LAPO)</strong>：首次将隐式推理空间纳入 RL 优化目标，含三部分损失（action loss + latent similarity loss + value loss），对 latent token 采用 importance sampling + 序列级 ratio + token 级 mask",
        "<strong>Adaptive Latent CoT</strong>：通过 M 个候选位置采样 <code>&lt;latent_end&gt;</code> 终止 token，温度 β 控制探索，实现推理长度的自适应学习",
        "<strong>Hybrid Attention Mask</strong>：latent tokens 使用 causal mask 进行自回归推理，action tokens 使用 bidirectional mask 实现并行解码，兼顾推理深度与执行效率",
        "在 LIBERO 四套件上达到 <strong>99.8% SOTA</strong>，超 π_RL（98.3%）和 OpenVLA-OFT（97.1%）",
        "真实世界 4 任务 RL 后成功率从 52.5% 提升至 <strong>93.75%</strong>",
        "OOD 泛化显著优于 Action-Only PPO，验证了隐式推理空间对泛化能力的关键作用"
      ],
      "detail": "<h5>动机与背景</h5>\n<p>传统 VLA 模型面临\"死记硬背\"困境：模型直接映射感知到动作，缺乏内在推理过程。虽然 Chain-of-Thought（CoT）在 LLM 中取得了巨大成功，但将其应用于机器人存在两大障碍：</p>\n<ol>\n<li><strong>语言 CoT 的时延瓶颈</strong>：显式文本推理增加 2-5 秒延迟，对实时控制不可接受</li>\n<li><strong>RL 优化断裂</strong>：文本推理与动作执行无法通过 RL 进行端到端联合优化</li>\n</ol>\n<p>LaST-R1 的核心洞察：<strong>推理不一定需要显式语言，可以在压缩的隐式空间中进行</strong>——这既保留了推理深度，又解决了延迟和优化问题。</p>\n<h5>Last0* 架构</h5>\n<p><img alt=\"LaST-R1 架构总览图\" src=\"https://ar5iv.labs.arxiv.org/html/2604.28192/assets/x1.png\" />\n<em>图：LaST-R1 整体架构——视觉输入经 DINOv3 提取 top-k latent tokens，与 visual/text tokens 拼接后输入 LLM 进行 latent reasoning，最后 action decoder 输出动作块</em></p>\n<p>模型基于 Qwen3-VL-4B 构建，核心架构如下：</p>\n<p><strong>输入处理</strong>：\n- 视觉输入经 vision encoder 提取 N_v 个 visual tokens\n- 额外使用预训练 DINOv3 模型提取 top-k 隐式视觉总结 token（离线计算，无额外训练成本）\n- 文本指令 token 化后与 visual tokens、latent summary tokens 拼接</p>\n<p><strong>消融实验验证</strong>（Table 1）：\n- DINOv3 top-k 方法在 LIBERO-Spatial 上达 97.2%，显著优于 Global Pooling（93.5%）、Convolutional Downsampling（94.8%）、Q-Former（95.1%）\n- 隐式 token 长度从 1→8，性能单调提升至 97.2%（长度 1 时仅 93.8%）</p>\n<p><strong>Hybrid Attention Mask 设计</strong>（Figure 6）：\n- Vision + Text + Latent tokens：使用 causal lower-triangular mask（自回归生成）\n- <code>&lt;latent_end&gt;</code> 后 action tokens：使用 bidirectional mask，允许 chunk 内所有 action token 互相 attend\n- 该设计实现了\"推理串行、执行并行\"的效率平衡</p>\n<h5>Latent-Action Policy Optimization (LAPO)</h5>\n<p>LAPO 是首个将隐式推理空间纳入 RL 优化的框架，其总损失函数为：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{LAPO}(\\theta) = \\mathcal{L}_{action}(\\theta) + \\lambda_1 \\mathcal{L}_{latent}(\\theta) + \\lambda_2 \\mathcal{L}_{value}(\\theta)</div>\n<p><strong>1. Action Loss（动作损失）</strong>：\n基于 PPO-clip 目标，对 action tokens 计算 standard policy gradient：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{action} = -\\min(r_t(\\theta) \\hat{A}_t, \\text{clip}(r_t(\\theta), 1-\\epsilon_{\\min}, 1+\\epsilon_{\\max}) \\hat{A}_t)</div>\n<p>其中 ratio <span class=\"kb-math kb-math-inline\">r_t(\\theta)</span> 按序列级别计算，<span class=\"kb-math kb-math-inline\">\\epsilon_{\\min}=0.2, \\epsilon_{\\max}=0.28</span> 为非对称裁剪。</p>\n<p><strong>2. Latent Loss（隐式损失）</strong>：\n对 latent reasoning tokens 采用特殊处理：</p>\n<ul>\n<li><strong>Importance Sampling</strong>：由于隐式 token 不可直接监督，利用 SFT warm-up 期间计算的 offline DINOv3 GT latent 作为锚点</li>\n<li><strong>序列级 ratio</strong>：与 action loss 共享同一序列级 ratio（<span class=\"kb-math kb-math-inline\">r_t(\\theta)</span>），保持优化一致性</li>\n<li><strong>Token 级 mask</strong>：仅对 latent token 位置施加损失</li>\n</ul>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{latent} = -r_t(\\theta) \\hat{A}_t \\cdot \\mathbf{1}_{\\text{latent\\_position}} \\cdot \\cos\\_\\text{sim}(z_{pred}, z_{gt})</div>\n<p><strong>3. Value Loss（价值损失）</strong>：\n标准 MSE 损失，用于 GAE 优势估计（<span class=\"kb-math kb-math-inline\">\\gamma=0.99, \\lambda=0.95</span>）。</p>\n<p><strong>超参数消融</strong>（Figure 7）：\n- <span class=\"kb-math kb-math-inline\">\\lambda_1=0.1</span> 最佳（99.8%），<span class=\"kb-math kb-math-inline\">\\lambda_1=0</span> 降至 97.2%，<span class=\"kb-math kb-math-inline\">\\lambda_1=1</span> 降至 99.0%\n- <span class=\"kb-math kb-math-inline\">\\lambda_2=1</span> 最佳（99.8%），<span class=\"kb-math kb-math-inline\">\\lambda_2=0.1</span> 降至 97.8%\n- <span class=\"kb-math kb-math-inline\">\\lambda_3=0.1</span>（transition penalty）最佳，增至 2 降至 98.6%</p>\n<h5>Adaptive Latent CoT</h5>\n<p>传统方法固定插值长度，无法适配不同任务复杂度。LaST-R1 提出了自适应推理长度机制：</p>\n<ul>\n<li>设置最大长度 <span class=\"kb-math kb-math-inline\">L_{max}=8</span>，候选终止位置数 <span class=\"kb-math kb-math-inline\">M=4</span></li>\n<li>在每个候选位置以概率 <span class=\"kb-math kb-math-inline\">p(m) \\propto \\exp(-\\beta \\cdot m)</span> 采样 <code>&lt;latent_end&gt;</code> token</li>\n<li>温度 <span class=\"kb-math kb-math-inline\">\\beta</span> 控制探索：<span class=\"kb-math kb-math-inline\">\\beta</span> 大 → 偏向短推理（exploitation），<span class=\"kb-math kb-math-inline\">\\beta</span> 小 → 偏向长推理（exploration）</li>\n</ul>\n<p><strong>优化目标</strong>包含 transition loss <span class=\"kb-math kb-math-inline\">\\mathcal{L}_{end}</span>：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{total} = \\mathcal{L}_{action} + \\lambda_1 \\mathcal{L}_{latent} + \\lambda_2 \\mathcal{L}_{value} + \\lambda_3 \\mathcal{L}_{end}</div>\n<p>实验结果（Figure 8）：RL 后模型自动学习到早期退出策略——简单任务用 2-4 步推理，复杂任务保留更长推理。</p>\n<h5>训练流程</h5>\n<p><strong>第一阶段：SFT Warm-up</strong>\n- 预训练数据：400K 轨迹（28M 帧），含 Open-X-Embodiment、DROID、ManiSkill 等\n- 使用 Qwen3-VL-4B 预训练权重初始化\n- 扩展 tokenizer 词表：新增 256 个 action tokens（<code>&lt;action_i&gt;</code>，<span class=\"kb-math kb-math-inline\">i \\in [0,255]</span>）+ <code>&lt;latent_end&gt;</code> token\n- 联合优化：cosine similarity loss（latent 对齐）+ CE loss（<code>&lt;latent_end&gt;</code> + action tokens），权重比 1:0.1:1\n- LIBERO：每任务仅 1 条专家轨迹，训练 10K iterations\n- 真实世界：每任务 20 条轨迹，训练 1K iterations</p>\n<p><strong>第二阶段：LAPO RL 在线训练</strong>\n- LIBERO：8×H20 GPU，verl+FSDP，每次 rollout 512 条轨迹，4 PPO epochs，学习率 <span class=\"kb-math kb-math-inline\">3\\times10^{-5}</span>（actor）/ <span class=\"kb-math kb-math-inline\">3\\times10^{-4}</span>（value head）\n- 真实世界：Franka Research 3 机器人 + 2×RTX 4090，连续异步 actor-learner 架构，仅更新 LoRA（r=32），冻结基座模型\n- 真实世界奖励：任务成功 +10，步惩罚 -0.05</p>\n<h5>关键实验发现</h5>\n<ol>\n<li><strong>LIBERO SOTA</strong>（Table 1）：LaST-R1 四套件平均 99.8%，超过所有对比方法</li>\n<li><strong>消融 M=4</strong> 最佳，M=1（固定长度）降至 97.5%</li>\n<li><strong>执行效率</strong>（Figure 9）：RL 后模型执行步数甚至优于 expert demonstrations</li>\n<li><strong>OOD 泛化</strong>（Figure 10）：Action-Only PPO overfitting 严重（20-30%），LaST-R1 持续提升至 54-100%</li>\n</ol>",
      "quiz": {
        "q": "LaST-R1 中 LAPO 对隐式推理 token 采用的优化策略是什么？",
        "options": [
          "直接使用 PPO-clip 进行优化，与 action token 无区别",
          "采用 importance sampling + 序列级 ratio + token 级 mask，仅对 latent token 位置施加损失",
          "冻结隐式 token 权重，仅优化 action decoder",
          "使用 DPO 进行偏好对齐，不涉及 ratio 计算"
        ],
        "answer": 1,
        "explain": "隐式 token 不可直接监督，LAPO 利用 SFT 阶段的 offline DINOv3 GT latent 作为锚点进行 importance sampling，共享序列级 ratio 保持优化一致性，并通过 token 级 mask 仅在 latent 位置施加损失。"
      }
    }
  ],
  "categories": {
    "transformer_policy": {
      "label": "Transformer策略",
      "color": "#3B82F6"
    },
    "vlm_finetune": {
      "label": "VLM微调策略",
      "color": "#10B981"
    },
    "diffusion_flow": {
      "label": "扩散/流匹配策略",
      "color": "#F59E0B"
    },
    "llm_planning": {
      "label": "LLM规划与代码生成",
      "color": "#8B5CF6"
    },
    "spatial_3d": {
      "label": "3D空间表征",
      "color": "#EC4899"
    }
  },
  "projectUrls": {}
};
