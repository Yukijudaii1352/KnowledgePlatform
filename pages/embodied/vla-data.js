/**
 * vla-data.js — 由 pipeline/build.py 于 2026-05-18 18:51:04 自动生成。
 * 源文件：content/embodied/vla.md
 * ⚠️  请勿手动修改；如需更新，修改源文档后重新编译。
 */
window.PAGE_CONFIG = {
  "meta": {
    "domain": "embodied",
    "topic_id": "vla",
    "topic_name": "视觉-语言-动作基础模型",
    "page_title": "视觉-语言-动作 (VLA) 基础模型算法总结",
    "page_subtitle": "2026-05-18 版",
    "page_desc": "从模仿学习到原生多模态端到端控制，梳理VLA模型在具身智能领域的技术演进与前沿突破",
    "page_icon": "🦾",
    "hero_pills": [
      "具身智能 · 多模态大模型 · 机器人控制 · 流匹配策略"
    ],
    "count_pill": "{count} 个算法",
    "image_base": ""
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
      "title": "一、VLA 的最新焦点正在转向世界模型",
      "body_html": "<p>最新这篇综述关注的不是“如何再做一个更大的 VLA 主干”，而是更具体的问题：<strong>VLA 如何获得对物理世界的前瞻能力</strong>。纯粹依赖视觉-语言-动作映射的模型，虽然能继承大模型的语义理解与开放词汇泛化，但在真实部署中经常暴露出三类短板：</p>\n<ul>\n<li><strong>物理动态建模不足</strong>：模型能“理解指令”，但未必能可靠预测接触、碰撞、遮挡与连续运动的后果。</li>\n<li><strong>长程规划缺少可执行验证</strong>：LLM 或 VLM 可以给出高层计划，却无法直接验证这些计划在物理世界里是否真的可行。</li>\n<li><strong>高质量机器人数据稀缺</strong>：真实世界采集成本高、风险高，限制了大规模在线试错和覆盖长尾场景。</li>\n</ul>\n<p>正因为如此，世界模型开始被视为 VLA 迈向通用具身智能的重要增量模块：它不只是“生成未来画面”，更是在为策略提供<strong>物理一致的前瞻与验证机制</strong>。</p>\n<blockquote>\n<p>参考综述：<a href=\"https://zhuanlan.zhihu.com/p/2029851015126689488\"><em>迈向通用具身人工智能：VLA智体的世界模型综述</em></a></p>\n</blockquote>"
    },
    {
      "title": "二、四类世界模型范式正在分化成清晰技术谱系",
      "body_html": "<p>这篇综述把面向 VLA 的世界模型划分为四种典型范式，它们对应了四种不同的“把未来引入决策”的方式：</p>\n<ul>\n<li><strong>世界规划器（World Planner）</strong>：先显式或隐式预测未来状态，再把这些未来表征作为规划条件输入策略。</li>\n<li><strong>世界动作模型（World Action Model）</strong>：联合建模未来观测与动作分布，让“看见未来”和“生成动作”在同一模型里耦合。</li>\n<li><strong>世界合成器（World Synthesizer）</strong>：把世界模型当作数据引擎，批量合成交错的观测-动作轨迹，缓解机器人数据稀缺。</li>\n<li><strong>世界模拟器（World Simulator）</strong>：把世界模型直接当作虚拟环境，用于评估、强化学习和测试时规划。</li>\n</ul>\n<p>这四条路线并不是互斥关系。它们共同指向的趋势是：VLA 不再满足于“看到当前场景就立即出动作”，而是逐步获得<strong>预测、验证、合成、模拟</strong>四种更主动的能力。</p>"
    },
    {
      "title": "三、基础模型与评测体系也在发生迁移",
      "body_html": "<p>从底层架构看，世界模型已经不局限于单一视频生成器，而是在三类基础能力之间组合：</p>\n<ul>\n<li><strong>图像 / 视频生成模型</strong>：擅长高保真未来合成，适合做显式想象与可视化规划。</li>\n<li><strong>统一理解-生成模型</strong>：把感知和生成放进同一框架，更适合做多模态条件下的端到端推演。</li>\n<li><strong>表征模型</strong>：不追求像素级重建，而是在潜空间中保持对几何、时间与因果结构的压缩表达，更适合高效规划与控制。</li>\n</ul>\n<p>与此同时，评测也在迁移。综述明确指出，像 <code>CALVIN</code>、<code>LIBERO</code> 这类仿真基准上的性能已经越来越接近饱和，说明仅靠封闭仿真环境很难继续区分新方法的真实价值。下一阶段更重要的是：</p>\n<ul>\n<li>世界模型是否真的提高了<strong>真实世界物理一致性</strong>；</li>\n<li>是否能支持<strong>更长时程、更开放场景</strong>的任务；</li>\n<li>是否能在保证安全的前提下，替代部分昂贵的真实机器人试错。</li>\n</ul>"
    },
    {
      "title": "四、下一阶段最难的问题不是更大模型，而是更可靠的未来建模",
      "body_html": "<p>综述最后点出的挑战非常集中，基本定义了 VLA 下一阶段的研究重点：</p>\n<ul>\n<li><strong>物理一致性</strong>：如何减少“看起来合理、实际上不可执行”的物理幻觉。</li>\n<li><strong>4D 时空感知</strong>：如何把三维几何结构和时间演化同时纳入表征，而不是停留在二维图像层面。</li>\n<li><strong>安全与可靠性</strong>：如何让世界模型在执行前预测风险、约束危险动作，而不是只做离线生成。</li>\n<li><strong>长程前瞻</strong>：如何在多阶段任务里持续保持目标、约束和空间关系的一致理解。</li>\n<li><strong>失败感知动力学</strong>：不仅学习成功演示，还要显式建模失败、偏差与纠错过程。</li>\n</ul>\n<p>对 VLA 来说，这些问题意味着研究重心正在从“统一多模态输入输出”迈向“让模型真正具备可验证、可模拟、可前瞻的世界理解能力”。这也是为什么世界模型会成为当前 VLA 领域最值得单独追踪的一条最新进展主线。</p>"
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
        "x": 2025.09,
        "y": 1,
        "category": "transformer_policy"
      },
      {
        "id": "groot_n2",
        "x": 2026.03,
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
        "x": 2026.03,
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
        "x": 2026.05,
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
        "label": "自适应推理"
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
      "summary": "BC-Z 提出了一个大规模多任务行为克隆框架，通过在 100 个操作任务上联合训练（含语言和视频条件），结合 HG-DAgger 人在回路干预机制，实现了对 29 个留出任务的零样本任务泛化（32% 成功率），证明了大规模多任务模仿学习可以产生语义层面的任务泛化能力。",
      "keyPoints": [
        "双组件架构：ResNet18 视觉 Encoder + FiLM 条件化控制层（MDN 输出动作分布）",
        "任务条件机制：冻结的 Universal Sentence Encoder (USE) 语言嵌入作为主条件，可选视频 demonstration 作为辅助条件",
        "大规模多任务训练：100 个操作任务（抓取、放置、开门、推动等），约 40k episodes 的专家演示数据",
        "HG-DAgger (Human-in-the-loop Guided DAgger)：训练过程中人类操作员可实时干预机器人动作，干预数据作为额外训练信号",
        "零样本泛化验证：在 29 个完全留出的任务上评估，语言条件 52% vs one-hot 45% vs 视频 42%",
        "干预数据 + 专家演示联合训练：53% 成功率 vs 仅专家演示 27%，证明 HG-DAgger 对泛化有显著增益",
        "任务表征空间分析：语言嵌入在语义空间中形成合理聚类，语义相似的任务在嵌入空间中距离更近"
      ],
      "detail": "<h5>核心框架图</h5>\n<p><img alt=\"BC-Z 框架总览\" src=\"https://ar5iv.labs.arxiv.org/html/2202.02005/assets/figures/overview_v3.png\" />\n<em>图：BC-Z 框架总览。左侧为多任务训练数据（含人类演示和干预数据），中间为 ResNet18 编码器 + FiLM 控制层，右侧为零样本泛化到留出任务</em></p>\n<h5>模型架构</h5>\n<p><img alt=\"BC-Z 架构图\" src=\"https://ar5iv.labs.arxiv.org/html/2202.02005/assets/figures/singletask_architecture_base.png\" />\n<em>图：BC-Z 的端到端架构。视觉编码器（ResNet18）处理图像输入，FiLM 层以语言/视频嵌入为条件调节特征，MDN 输出动作分布</em></p>\n<h5>方法细节</h5>\n<p><strong>1. 动机与背景</strong></p>\n<p>传统机器人模仿学习通常针对单一任务训练，缺乏对未见过任务的泛化能力。BC-Z 的核心假设是：<strong>如果在大规模、多样化任务上联合训练，模型可以学习到任务之间的语义关系，从而实现对全新任务的零样本泛化</strong>。这一思路受到 NLP 和 CV 领域大规模预训练成功经验的启发。</p>\n<p><strong>2. 核心机制：FiLM 条件化 + MDN</strong></p>\n<p>BC-Z 的策略网络 \\(\\pi_\\theta(a|s, z)\\) 接受状态 \\(s\\)（RGB 图像）和任务嵌入 \\(z\\) 作为输入。任务嵌入 \\(z\\) 有三种变体：</p>\n<ul>\n<li><strong>语言条件</strong>：通过冻结的 USE 编码自然语言任务描述（如 \"pick up the can\"）获取 512 维嵌入</li>\n<li><strong>One-hot 条件</strong>：每个任务分配一个离散的 one-hot 向量</li>\n<li><strong>视频条件</strong>：将人类演示视频（3 帧）通过共享的 ResNet18 编码为嵌入</li>\n</ul>\n<p>FiLM (Feature-wise Linear Modulation) 层以任务嵌入 \\(z\\) 为输入，生成缩放因子 \\(\\gamma(z)\\) 和偏移量 \\(\\beta(z)\\)，对视觉编码器的中间特征图进行线性调制：\n\\[\n\\text{FiLM}(F) = \\gamma(z) \\odot F + \\beta(z)\n\\]\n这使得同一视觉特征可以根据不同任务被不同地\"解读\"——例如，同一场景中，不同任务可能关注不同物体。</p>\n<p>控制层使用<strong>混合密度网络（Mixture Density Network, MDN）</strong>输出动作分布。MDN 将动作空间建模为 \\(K\\) 个高斯分布的混合：\n\\[\np(a|s, z) = \\sum_{k=1}^{K} \\alpha_k(s, z) \\cdot \\mathcal{N}(a | \\mu_k(s, z), \\sigma_k^2(s, z))\n\\]\n其中 \\(\\alpha_k\\) 为混合权重，\\(\\mu_k\\) 和 \\(\\sigma_k\\) 为各高斯分量的均值和方差。MDN 比简单的确定性回归或单峰高斯更适合多模态的动作分布（例如，抓取物体可以从左边或右边绕过去）。</p>\n<p><strong>3. HG-DAgger：人在回路的干预机制</strong></p>\n<p>HG-DAgger 是 BC-Z 的关键数据增强策略。在训练过程中：\n- 机器人执行当前策略预测的动作\n- 人类操作员观察机器人行为，如果发现即将失败或不安全，可以实时<strong>接管控制</strong>\n- 接管期间的<strong>人类动作 + 当前状态 + 任务条件</strong>被记录为新的训练数据\n- 这些干预数据与原始专家演示数据<strong>混合训练</strong></p>\n<p>HG-DAgger 的核心优势：\n- 干预数据自然地聚焦于<strong>策略表现差的状态空间区域</strong>，提供针对性纠正\n- 不需要额外的专家演示收集，而是在训练过程中<strong>在线生成</strong>有价值的训练数据\n- 干预数据包含<strong>恢复行为</strong>（从接近失败的状态恢复到正常），教会模型处理边缘情况</p>\n<p>论文实验表明，加入 HG-DAgger 干预数据将留出任务成功率从 27% 提升至 53%。</p>\n<p><strong>4. 训练流程</strong></p>\n<p>训练目标为最大化动作对数似然（MDN 下的标准 BC 损失）：\n\\[\n\\mathcal{L} = -\\mathbb{E}_{(s, a, z) \\sim \\mathcal{D}} \\left[ \\log \\sum_{k=1}^{K} \\alpha_k \\cdot \\mathcal{N}(a | \\mu_k, \\sigma_k^2) \\right]\n\\]</p>\n<p>训练数据包含：\n- ~40k episodes 的专家远程操作演示（100 个训练任务）\n- 训练过程中产生的 HG-DAgger 干预数据\n- 两种数据混合，intervention data 有专门的权重</p>\n<p>训练细节：\n- 输入图像：472×472 RGB，随机裁剪到 224×224 并做数据增强（颜色抖动、随机遮挡等）\n- 动作空间：6-DoF 末端执行器位姿（x, y, z, roll, pitch, yaw）+ 夹爪开合\n- 控制频率：3 Hz\n- 优化器：Adam，学习率 1e-4\n- Batch size：256，episode 级别采样</p>\n<p><strong>5. 与传统方法的对比</strong></p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th>传统单任务 BC</th>\n<th>多任务 BC（one-hot）</th>\n<th>BC-Z（语言条件）</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>任务表征</td>\n<td>无（固定策略）</td>\n<td>离散 ID，无语义</td>\n<td>连续语言嵌入，有语义</td>\n</tr>\n<tr>\n<td>泛化能力</td>\n<td>零（需重新训练）</td>\n<td>需 fine-tuning</td>\n<td>零样本泛化到语义相关任务</td>\n</tr>\n<tr>\n<td>数据效率</td>\n<td>每任务独立</td>\n<td>共享参数</td>\n<td>共享参数 + 干预数据</td>\n</tr>\n<tr>\n<td>动作分布</td>\n<td>单峰高斯</td>\n<td>单峰高斯</td>\n<td>MDN 多模态高斯混合</td>\n</tr>\n<tr>\n<td>人在回路</td>\n<td>无</td>\n<td>无</td>\n<td>HG-DAgger 实时干预</td>\n</tr>\n</tbody>\n</table></div>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># BC-Z 训练循环（含 HG-DAgger）\ndef train_bc_z():\n    # 初始化\n    encoder = ResNet18(pretrained=False)        # 视觉编码器\n    film_layers = FiLM(condition_dim=512)        # FiLM 条件层\n    mdn_head = MDN(n_components=5, action_dim=7) # MDN 控制头\n\n    # 多任务数据加载\n    dataset = MultiTaskDataset(100_tasks, expert_demos + intervention_data)\n\n    for epoch in range(total_epochs):\n        for batch in dataloader:\n            images, actions, task_embeddings = batch\n\n            # 视觉编码\n            features = encoder(images)\n\n            # FiLM 条件调制\n            for layer in film_layers:\n                features = layer(features, task_embeddings)\n\n            # MDN 输出分布参数\n            alphas, mus, sigmas = mdn_head(features)\n\n            # 计算负对数似然损失\n            loss = -mdn_log_likelihood(actions, alphas, mus, sigmas)\n            loss.backward()\n            optimizer.step()\n\n        # HG-DAgger：收集干预数据\n        if epoch % intervention_interval == 0:\n            for task in training_tasks:\n                episode = rollout(policy, task)\n                if human_intervened(episode):\n                    dataset.add(episode.intervention_data)\n\n    # 零样本评估\n    for heldout_task in 29_heldout_tasks:\n        success_rate = evaluate_zero_shot(policy, heldout_task)\n</code></pre>\n<p><strong>6. 实验结果关键发现</strong></p>\n<ul>\n<li><strong>语言条件的优势</strong>：语言条件（52%）&gt; one-hot（45%）&gt; 视频（42%），说明语义理解对零样本泛化至关重要。语言嵌入在训练任务间学到了可迁移的语义表示。</li>\n<li><strong>HG-DAgger 的显著增益</strong>：干预数据 + 专家演示（53%）vs 仅专家演示（27%），几乎翻倍。干预数据特别有助于改善模型在<strong>分布外状态</strong>下的表现。</li>\n<li><strong>任务复杂度影响</strong>：简单操作任务（如抓取、放置）泛化较好，复杂多步任务（如开门、堆叠）泛化较差。</li>\n<li><strong>未见指令的泛化</strong>：即使对训练任务使用未见过的语言描述（同义改写），模型也能保持较高成功率，证明语言嵌入的语义鲁棒性。</li>\n</ul>\n<h5>任务可视化</h5>\n<p><img alt=\"任务总览表\" src=\"https://ar5iv.labs.arxiv.org/html/2202.02005/assets/figures/tasks-tableau.png\" />\n<em>图：100 个训练任务和 29 个留出任务的总览</em></p>\n<p><img alt=\"留出任务序列\" src=\"https://ar5iv.labs.arxiv.org/html/2202.02005/assets/figures/holdout_sequence.png\" />\n<em>图：留出任务的执行序列示例，展示零样本泛化的行为</em></p>\n<p><img alt=\"干预与成功率关系\" src=\"https://ar5iv.labs.arxiv.org/html/2202.02005/assets/figures/interventions_vs_success.png\" />\n<em>图：干预次数与成功率的关系，展示 HG-DAgger 的效果</em></p>",
      "quiz": {
        "q": "BC-Z 中 HG-DAgger 干预数据的主要价值是什么？",
        "options": [
          "提供更多样化的初始状态分布",
          "针对策略表现差的状态区域提供纠正性数据",
          "替代所有专家演示数据以降低成本",
          "增加训练数据的时序长度"
        ],
        "answer": 1,
        "explain": "HG-DAgger 在策略执行过程中记录人类干预，这些干预自然发生在策略表现差或即将失败的状态区域，提供了针对性的纠正信号，使成功率从 27% 提升至 53%。"
      }
    },
    {
      "id": "cliport",
      "num": 2,
      "name": "CLIPort",
      "fullName": "视觉语言操作路径 (CLIPort)",
      "year": "2022",
      "org": "Google/UW",
      "parent": "—",
      "paperUrl": "https://proceedings.mlr.press/v164/shridhar22a.html",
      "projectUrl": "",
      "category": "spatial_3d",
      "motivation": "融合CLIP语义与Transporter几何精度",
      "summary": "CLIPort 提出了一种 “What + Where” 双流架构，将预训练 CLIP 的开放词汇语义能力与 Transporter Network 的像素级几何精度结合起来，实现了以自然语言指令为条件的桌面 pick-and-place 操作，并在少样本、多任务和真机设置下都表现出很强的泛化能力。",
      "keyPoints": [
        "<strong>双流设计（What + Where）</strong>：语义流负责识别“操作什么物体”，空间流负责确定“在哪里操作”，两路通过 lateral connections 在多尺度上融合",
        "<strong>语言条件化</strong>：使用 CLIP 文本编码器将自然语言指令映射到语义空间，再通过逐元素乘法调制视觉特征",
        "<strong>Transporter 动作表示</strong>：将操作分解为 pick 和 place 两个像素级预测问题，place 端通过 query-key 互相关和离散旋转搜索得到放置位姿",
        "<strong>样本效率高</strong>：冻结 CLIP 视觉编码器，仅训练空间流和解码器，在 1 到 100 条演示范围内就能达到较强性能",
        "<strong>多任务共享有效</strong>：单一多任务模型在大量任务上超过对应的单任务专家模型，说明跨任务知识共享是有效的",
        "<strong>真机可落地</strong>：在真实 UR5e 平台上仅用 179 条演示就训练出一个可执行多种语言条件化任务的统一模型"
      ],
      "detail": "<h5>整体架构</h5>\n<p><img alt=\"CLIPort Architecture\" src=\"https://ar5iv.labs.arxiv.org/html/2109.12098/assets/x2.png\" /></p>\n<p>CLIPort 的核心思想来自神经科学中的 “What” 与 “Where” 两条通路：\n- <strong>语义流（What）</strong>：基于冻结的 CLIP ResNet-50 视觉编码器，负责提取语言对齐的开放词汇语义特征\n- <strong>空间流（Where）</strong>：基于从零训练的 ResNet 编码器-解码器处理 RGB-D 输入，保留像素级几何精度</p>\n<p>两条通路在解码阶段通过 <code>concat + 1x1 conv</code> 的 lateral connections 融合，最终输出像素级动作预测。</p>\n<h5>动作建模：从桌面操作到像素级 pick-and-place</h5>\n<p>CLIPort 继承了 Transporter Network 的动作表示，将操作分解为 pick 与 place 两个步骤。</p>\n<p><strong>Pick</strong>：对观测图像生成像素级抓取热力图：</p>\n<p>$$Q_{\\text{pick}}(o_t) = f_{\\text{pick}}(\\gamma_t), \\qquad a_{\\text{pick}} = \\arg\\max_{(u,v)} Q_{\\text{pick}}$$</p>\n<p>其中 \\(\\gamma_t\\) 是正交投影后的 RGB-D 图像。</p>\n<p><strong>Place</strong>：以 pick 点为中心裁剪 query patch，并与全图 key 特征做互相关，同时搜索离散旋转：</p>\n<p>$$Q_{\\text{place}}(o_t \\mid a_{\\text{pick}}) = \\left[ \\Phi_{\\text{query}}(\\gamma_t[T_{\\text{pick}}]) * \\Phi_{\\text{key}}(\\gamma_t) \\right]_{\\Delta\\tau}$$</p>\n<p>这使模型能显式建模“抓哪里”和“放哪里”，比直接回归连续位姿更稳定，也更符合桌面操作任务的几何结构。</p>\n<h5>为什么 CLIPort 有效</h5>\n<p>CLIP 自带开放词汇语义知识，但像素级定位能力不足；Transporter 对局部几何关系建模很强，但缺少开放世界语义理解。CLIPort 的关键不在于简单拼接两个模型，而在于把两者的优势精确对齐：</p>\n<ul>\n<li>语义流告诉模型“红色杯子”“蓝色方块”“左边的盘子”分别是什么</li>\n<li>空间流告诉模型这些目标在桌面上具体处于什么像素位置，以及抓取/放置的几何关系</li>\n</ul>\n<p>因此它既能理解复杂语言描述，又能保持操作精度，在多任务和真机实验中都优于从零训练的纯几何策略。</p>"
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
      "summary": "SayCan 的核心目标是：LLM规划结合底层技能可行性评估。",
      "keyPoints": [
        "核心动机：LLM规划结合底层技能可行性评估",
        "代表机构：Google"
      ],
      "detail": "<p>LLM规划结合底层技能可行性评估</p>"
    },
    {
      "id": "gato",
      "num": 4,
      "name": "Gato",
      "fullName": "通用智能体 (Gato)",
      "year": "2022.05",
      "org": "DeepMind",
      "parent": "—",
      "paperUrl": "https://deepmind.google/research/publications/a-generalist-agent/",
      "projectUrl": "",
      "category": "transformer_policy",
      "motivation": "单一Transformer处理600+多形态任务",
      "summary": "Gato 提出了一个真正意义上的通才智能体雏形：把文本、图像、离散动作和连续控制全部序列化为统一 token 序列，用同一个 1.2B 参数的 decoder-only Transformer 同时处理 600 多种任务，证明了单一序列模型可以跨模态、跨环境、跨机器人本体地执行感知与控制。",
      "keyPoints": [
        "<strong>统一 token 化范式</strong>：文本、图像 patch、按钮动作、关节力矩、本体感觉等都被映射到同一 token 序列中",
        "<strong>单模型多任务</strong>：一套参数同时处理 Atari、对话、图像描述、Meta-World、真实机械臂堆叠等 600+ 任务",
        "<strong>连续动作离散化</strong>：连续控制量先经 \\(\\mu\\)-law 压缩再离散成 1024 个 bins，转化为语言模型可生成的 token",
        "<strong>Prompt 条件化任务</strong>：不用手工 task id，而是用成功示范 episode 作为 prompt 条件，引导模型推断当前应该做什么",
        "<strong>选择性监督</strong>：训练时只对文本 token 和动作 token 计算损失，观察 token 不参与损失",
        "<strong>VLA 先驱意义</strong>：统一序列化、多模态上下文和动作 token 化的设计直接影响了 RT-1、RT-2、PaLM-E 等后续 VLA 工作"
      ],
      "detail": "<h5>统一序列化：把一切都变成 token</h5>\n<p>Gato 最核心的设计不是某种特殊控制头，而是一个非常激进的前提：<strong>所有模态都统一为 token 序列</strong>。</p>\n<ul>\n<li><strong>文本</strong>：SentencePiece 子词</li>\n<li><strong>图像</strong>：\\(16 \\times 16\\) patch</li>\n<li><strong>离散值</strong>：直接作为整数 token</li>\n<li><strong>连续值</strong>：先做 \\(\\mu\\)-law 压缩，再离散为 1024 个 bins</li>\n</ul>\n<p>这种统一表示让机器人控制第一次被严格地纳入大语言模型式的 next-token prediction 范式中。</p>\n<h5>模型架构与训练目标</h5>\n<p>Gato 使用 1.2B 参数的 decoder-only Transformer：\n- 24 层\n- hidden size 2048\n- FFN hidden size 8196</p>\n<p>训练目标是标准自回归交叉熵，但只在<strong>文本 token 与动作 token</strong>上计算损失：</p>\n<p>$$\n\\mathcal{L}(\\theta, B) = -\\sum_b \\sum_l m(b,l)\\log p_\\theta(s_l^{(b)} \\mid s_1^{(b)}, \\dots, s_{l-1}^{(b)})\n$$</p>\n<p>其中 \\(m(b,l)=1\\) 仅当该 token 属于文本或动作，否则为 0。<br />\n这意味着图像与观察本身只是上下文，不被直接监督，模型被要求学习“如何基于这些上下文生成正确动作”。</p>\n<h5>对具身智能的启示</h5>\n<p>Gato 在机器人上的控制能力并不是最强的，但它证明了一件更重要的事：<strong>单一序列模型可以同时承载视觉、语言与动作三种能力</strong>。这为后来的 VLA 提供了三个关键模板：</p>\n<ul>\n<li>动作 token 化</li>\n<li>多模态统一上下文建模</li>\n<li>用大模型缩放规律来思考机器人策略学习</li>\n</ul>\n<p>从这个意义上说，Gato 不是今天最强的 VLA，但它是通往 VLA 路线最关键的原型之一。</p>"
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
      "summary": "Code as Policies 的核心目标是：LLM生成Python代码控制机器人。",
      "keyPoints": [
        "核心动机：LLM生成Python代码控制机器人",
        "演化来源：继承或改进自 saycan",
        "代表机构：Google"
      ],
      "detail": "<p>LLM生成Python代码控制机器人</p>"
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
      "summary": "RT-1 提出 Robotics Transformer，将大规模多任务模仿学习与 Transformer 架构结合，通过 TokenLearner 将高维视觉特征压缩为 8 个紧凑 token，在 13 台机器人、744 个任务、130k 条真实世界演示上训练，实现了 3Hz 实时闭环控制，对未见任务/环境/物体展现出强泛化能力（unseen 76%）。",
      "keyPoints": [
        "<strong>Robotics Transformer 架构</strong>：将机器人控制转化为序列预测问题——输入 6 帧历史图像+自然语言指令，输出 7 维离散化动作（x, y, z, 旋转, 夹爪开合, 基座运动, 终止信号）",
        "<strong>TokenLearner 视觉压缩</strong>：在 EfficientNet-B3 提取的 9×9×512 特征图上学习 8 个空间注意力 token，将 81 个 patch 压缩为仅 8 个 token，大幅降低 Transformer 计算量，实现 3Hz 推理",
        "<strong>FiLM 条件注入</strong>：将自然语言指令通过 Universal Sentence Encoder 编码后，经 FiLM 层注入 EfficientNet 的多个 block，实现视觉-语言的早期融合",
        "<strong>动作离散化</strong>：每个动作维度离散化为 256 个 bin，使用交叉熵损失训练，比连续回归更稳定、更易捕捉多模态动作分布",
        "<strong>大规模真实世界数据集</strong>：17 个月、13 台 Everyday Robots 机械臂、130k 条演示、744 个任务，覆盖 kitchen manipulation 多样化场景",
        "<strong>四类泛化实验</strong>：seen tasks (97%)、unseen tasks (76%)、干扰物鲁棒性 (83%)、长时程任务 (67%)，全面验证模型泛化能力",
        "<strong>行为克隆框架</strong>：基于标准 BC-Z 框架，使用 Categorical Cross-Entropy 损失对离散化动作进行监督学习",
        "<strong>高效推理</strong>：48ms/step（3Hz），640×480 全分辨率图像，可部署在真实机器人上进行实时闭环控制"
      ],
      "detail": "<h5>核心架构图</h5>\n<p><img alt=\"RT-1 整体框架图\" src=\"https://ar5iv.labs.arxiv.org/html/2212.06817/assets/figures/rt1_teaser_tasks.png\" />\n<em>图 1：RT-1 高层概览——架构、数据集与评估</em></p>\n<p><img alt=\"机器人设置\" src=\"https://ar5iv.labs.arxiv.org/html/2212.06817/assets/figures/RT-1_Robot_Setup.png\" />\n<em>图 2：RT-1 所使用的 Everyday Robots 机械臂平台与相机配置</em></p>\n<h5>算法流程</h5>\n<pre><code>For each timestep t:\n    1. 取最近 6 帧 RGB 图像 (I_{t-5} ~ I_t)，每帧 640×480×3\n    2. 自然语言指令 s 通过 Universal Sentence Encoder 编码\n    3. 每帧图像通过 FiLM EfficientNet-B3 提取特征图 (9×9×512)\n    4. 6 帧特征图串联 → (6, 9, 9, 512)\n    5. TokenLearner 学习 8 个空间注意力 token: (8, 512)\n       - 对每个位置计算注意力权重（softmax over 9×9×6 positions）\n       - 加权求和得到紧凑 token\n    6. Transformer Decoder (8 层, 自注意力, 19.5M params):\n       - 输入: 8 个视觉 token + 1 个 action token + 1 个 stop token，共 10 个 token\n       - Causal attention（第 i 个 token 只能 attend 前 i-1 个）\n    7. Action head: 对 7 个动作维度分别预测 256-bin categorical 分布\n    8. 取 argmax 得到离散动作 → 映射回连续值 → 执行\n</code></pre>\n<h5>动机与背景</h5>\n<p>传统机器人学习面临两大核心瓶颈：<strong>数据稀缺</strong>与<strong>泛化困难</strong>。单个任务的小规模训练无法应对真实世界的无穷变化——光照、背景、物体外观、初始状态的任何细微改变都可能导致策略失效。同时，现有方法多采用连续动作回归（MSE 损失），难以捕获专家演示中天然存在的多模态动作分布（同一状态下可能有多种合理动作）。</p>\n<p>RT-1 的核心洞见是将大语言模型范式的<strong>三个关键要素</strong>迁移到机器人领域：\n1. <strong>统一 I/O 接口</strong>：所有感知（图像+语言）编码为 token，所有动作也离散化为 token\n2. <strong>大规模多样化数据</strong>：130k 条演示覆盖 744 个任务，让模型见过足够多的变异\n3. <strong>Transformer 序列建模</strong>：利用自注意力捕捉时序依赖和跨模态交互</p>\n<h5>核心机制详解</h5>\n<p><strong>1. TokenLearner：视觉压缩的关键</strong></p>\n<p>EfficientNet-B3 输出的特征图尺寸为 9×9=81 个空间位置，6 帧则为 486 个 patch。若直接将所有 patch 送入 Transformer，O(n²) 的注意力复杂度将使得实时推理不可行。</p>\n<p>TokenLearner 的核心操作：\n- 输入：X ∈ ℝ^{T×H×W×C}（T=6, H=W=9, C=512）\n- 学习 S=8 个空间注意力图 α_s ∈ ℝ^{T×H×W}\n- 第 s 个 token：z_s = Σ_{t,h,w} α_s[t,h,w] · X[t,h,w,:]\n- 输出：8 个 512 维 token</p>\n<div class=\"key-point\">💡 关键：8 个 token 仅为原始 486 个 patch 的 1.6%，但在最大注意力权重位置保留了最关键的语义信息（物体、夹爪、目标位置等）。这是 RT-1 能以 3Hz 实时运行的架构核心。</div>\n<p><strong>2. FiLM 条件注入</strong></p>\n<p>传统做法将语言指令编码为单一向量拼接到视觉特征后，信息交互有限。RT-1 采用 FiLM（Feature-wise Linear Modulation）在 EfficientNet 的多个 block 层级进行调制：</p>\n<p>$$\n\\text{FiLM}(x; \\gamma, \\beta) = \\gamma \\odot x + \\beta\n$$</p>\n<p>其中 γ 和 β 由语言嵌入（通过 USE 编码为 512 维）经 MLP 生成。这种<strong>层级化条件注入</strong>使得语言信号可以在不同抽象层次影响视觉特征提取——低级特征关注纹理/颜色，高级特征关注语义/物体类别。</p>\n<p><strong>3. 动作离散化与多模态分布</strong></p>\n<p>7 个动作维度（x, y, z, yaw, gripper, base, stop），每个离散化为 256 个均匀 bin。训练时用 Categorical Cross-Entropy：</p>\n<p>$$\n\\mathcal{L} = -\\sum_{d=1}^{7} \\sum_{b=1}^{256} y_{d,b} \\log \\hat{y}_{d,b}\n$$</p>\n<p>相比于 MSE 回归，离散化的优势：\n- <strong>捕获多模态</strong>：同一状态下\"从左侧绕过\"和\"从右侧绕过\"都是合理动作，categorical 分布可以保留两个模式，而 MSE 会取平均（产生危险的中值动作）\n- <strong>训练稳定</strong>：避免了连续值的回归数值不稳定性\n- <strong>与语言模型统一</strong>：动作成为\"动作词汇表\"中的 token，与自然语言 token 统一处理</p>\n<p><strong>4. 训练策略：从基础到泛化</strong></p>\n<p>论文提出了\"训练数据金字塔\"的概念（Appendix C）：\n- <strong>Bridging</strong>：先在少量高质量数据上训练解决基本问题\n- <strong>Sawyer</strong>：加入更多任务的数据扩展技能\n- <strong>Diverse multi-task</strong>：最终在全部 744 个任务的混合数据上训练</p>\n<p>这种渐进式训练与直接混合训练相比，在罕见任务上提升显著。</p>\n<h5>与传统方法的区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th>传统方法（如 BC-Z, Gato）</th>\n<th>RT-1</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>动作空间</td>\n<td>连续回归（MSE）</td>\n<td>每维 256-bin categorical</td>\n</tr>\n<tr>\n<td>视觉编码</td>\n<td>冻结视觉编码器 / 小 network</td>\n<td>FiLM EfficientNet-B3，语言早期融合</td>\n</tr>\n<tr>\n<td>特征压缩</td>\n<td>无压缩或简单 pooling</td>\n<td>TokenLearner 学习型压缩</td>\n</tr>\n<tr>\n<td>序列建模</td>\n<td>LSTM / CNN</td>\n<td>Transformer Decoder (8 层)</td>\n</tr>\n<tr>\n<td>推理速度</td>\n<td>未知/离线</td>\n<td>3Hz 实时闭环</td>\n</tr>\n<tr>\n<td>数据规模</td>\n<td>单任务 ~1k demos</td>\n<td>744 任务 130k demos</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"warn-box\">⚠️ 注意：RT-1 本质仍是<strong>行为克隆</strong>（Behavior Cloning），仅使用监督学习模仿专家，没有价值函数或在线探索。其泛化能力的提升完全来自<strong>模型容量 + 数据多样性 + 架构设计</strong>。</div>\n<h5>实验结果速览</h5>\n<ul>\n<li><strong>Seen tasks</strong>: RT-1 达到 97% 成功率，与 BC-Z（95%）持平，显著超过 Gato（50%）</li>\n<li><strong>Unseen tasks</strong>: RT-1 达到 76%，比 BC-Z（55%）高 21 个百分点</li>\n<li><strong>Distractor robustness</strong>: 添加 9 种未见物体和 2 种背景干扰后，RT-1 保持 83%，BC-Z 降至 46%</li>\n<li><strong>Long-horizon</strong>: 3+ 步任务中 RT-1 达到 67%（BC-Z 仅 30%）</li>\n<li><strong>消融关键结论</strong>：</li>\n<li>去掉 ImageNet 预训练 → unseen 掉约 20%</li>\n<li>离散化改为连续 → 大幅下降</li>\n<li>TokenLearner 换成 average pooling → 性能下降，推理变慢</li>\n<li>数据量翻倍（130k→260k）未见显著提升，说明当前模型容量可能已饱和</li>\n</ul>",
      "quiz": {
        "q": "RT-1 中 TokenLearner 的主要作用是什么？",
        "options": [
          "将自然语言指令编码为 token 向量",
          "将 Transformer 输出解码为连续动作",
          "将高维视觉特征图压缩为少量紧凑 token，降低 Transformer 计算量",
          "对 7 个动作维度进行离散化编码"
        ],
        "answer": 2,
        "explain": "TokenLearner 通过学习空间注意力图，将 6 帧 EfficientNet 特征图（486 个 patch）压缩为仅 8 个 512 维 token，大幅减少 Transformer 的序列长度，是实现 3Hz 实时推理的关键设计。"
      }
    },
    {
      "id": "palm_e",
      "num": 7,
      "name": "PaLM-E",
      "fullName": "具身多模态语言模型 (PaLM-E)",
      "year": "2023.03",
      "org": "Google/TU Berlin",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2303.03378",
      "projectUrl": "",
      "category": "vlm_finetune",
      "motivation": "562B参数多模态观察注入LLM嵌入空间",
      "summary": "PaLM-E 的核心目标是：562B参数多模态观察注入LLM嵌入空间。",
      "keyPoints": [
        "核心动机：562B参数多模态观察注入LLM嵌入空间",
        "代表机构：Google/TU Berlin"
      ],
      "detail": "<p>562B参数多模态观察注入LLM嵌入空间</p>"
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
      "summary": "MOO（Masked Object Objectives）将冻结的视觉语言模型作为对象级先验，通过在第一帧提取目标对象掩码并将其拼接到策略输入中，使机器人策略无需深度相机或额外重标定，就能对未见过的物体、背景和场景进行零样本泛化。",
      "keyPoints": [
        "<strong>对象级先验注入</strong>：利用冻结的 OWL-ViT 从第一帧检测目标对象，只把掩码或中心点作为额外通道输入策略",
        "<strong>RT-1 风格策略骨干</strong>：图像经 EfficientNet + FiLM + TokenLearner + Transformer 生成 7-DoF 动作 token",
        "<strong>训练时冻结 VLM</strong>：策略暴露在真实检测误差下学习鲁棒性，而不是对真值掩码过拟合",
        "<strong>数据效率很高</strong>：仅在 <code>pick</code> 技能上扩展对象多样性，就能把对象泛化能力迁移到其他操作技能",
        "<strong>多模态上游兼容</strong>：掩码既可来自文本描述，也可来自人手指向、视觉查询图或 GUI 标注",
        "<strong>开放世界扩展性</strong>：与 CoW 等开放词汇导航模块结合后，可以实现“先找到新物体，再操作新物体”的完整系统"
      ],
      "detail": "<h5>系统架构与信息流</h5>\n<p><img alt=\"MOO Architecture\" src=\"https://ar5iv.labs.arxiv.org/html/2303.00905/assets/x2.png\" /></p>\n<p>MOO 的信息流可以概括为三步：</p>\n<ol>\n<li><strong>对象定位</strong>：从语言指令中解析对象描述，用冻结 OWL-ViT 在第一帧中检测目标对象</li>\n<li><strong>掩码生成</strong>：把对象中心点或掩码渲染为单通道图，与 RGB 图像拼接</li>\n<li><strong>策略推理</strong>：只保留动词语义作为语言条件，图像+掩码经 RT-1 风格策略骨干输出动作</li>\n</ol>\n<p>作者刻意把 VLM 的参与限制在第一帧，避免实时推理时重复调用大型检测模型。</p>\n<h5>为什么“单像素掩码”就足够</h5>\n<p>MOO 很有意思的一点是：它不一定需要完整边界框或精细分割。论文发现，仅用<strong>目标中心点</strong>这种极简表示，也能带来接近完整掩码的效果。</p>\n<p>原因在于：\n- 对象“是什么”由 VLM 提供\n- 对象“大概在哪”由单像素或稀疏掩码提供\n- 剩余局部几何与抓取细节则由下游策略从原始图像中补全</p>\n<p>这让系统既保留了开放词汇的可扩展性，又避免了过度依赖高质量分割。</p>\n<h5>关键结论：对象泛化与技能泛化可以解耦</h5>\n<p>MOO 的最重要发现之一是：即便只在 <code>pick</code> 任务里扩展对象多样性，模型也能把“识别和泛化到新物体”的能力迁移到 <code>move near</code>、<code>knock</code>、<code>place upright</code>、<code>place into</code> 等其他技能上。</p>\n<p>这说明策略内部学到的是两件相对独立的能力：\n- 动词条件告诉模型“做什么动作”\n- 掩码告诉模型“对哪个对象做”</p>\n<p>这种显式的对象条件化，为后续 VLA 的开放世界操作提供了一个非常实用的中间路线。</p>"
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
      "summary": "RT-2 的核心目标是：动作Token化实现互联网知识迁移。",
      "keyPoints": [
        "核心动机：动作Token化实现互联网知识迁移",
        "演化来源：继承或改进自 rt1",
        "代表机构：Google DeepMind"
      ],
      "detail": "<p>动作Token化实现互联网知识迁移</p>"
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
      "summary": "VoxPoser 通过让 LLM 在 3D 体素空间中生成可供性图与约束图，把语言指令转换为可执行的 3D 值图，再由 MPC 在该值图上规划末端轨迹，实现了对开放集物体和开放式指令的零样本真实机器人操纵。",
      "keyPoints": [
        "<strong>三阶段系统</strong>：感知模块负责检测与 3D 重建，LLM 负责生成值图代码，MPC 负责在值图上规划动作",
        "<strong>3D 值图表示</strong>：把“应该去哪”表示为可供性图，把“不能去哪”表示为约束图，最终合成为任务值图",
        "<strong>开放词汇感知</strong>：结合 OWL-ViT、SAM、XMem 等模块在开放世界中识别、分割和跟踪物体",
        "<strong>闭环重规划</strong>：系统以约 5Hz 频率持续重建场景与重算值图，适应物体移动和遮挡变化",
        "<strong>扰动体素机制</strong>：在约束边界注入噪声，使规划器主动远离危险区域，从而获得更强避碰能力",
        "<strong>与端到端 VLA 不同</strong>：VoxPoser 不是直接输出动作，而是把高层语义显式投影为 3D 中间表示，增强了可解释性和可组合性"
      ],
      "detail": "<h5>系统流程：从语言到轨迹</h5>\n<p>VoxPoser 的核心流程是：</p>\n<ol>\n<li><strong>感知</strong>：利用 OWL-ViT + SAM + XMem 检测、分割并跟踪场景物体，构建 \\(100 \\times 100 \\times 100\\) 左右的 3D 体素空间</li>\n<li><strong>值图合成</strong>：让 GPT-4 生成 Python 代码，在 3D 体素网格上定义可供性图与约束图</li>\n<li><strong>运动规划</strong>：用 MPC + random shooting 在值图上搜索末端执行器轨迹，并持续闭环重规划</li>\n</ol>\n<p>值图的一个直观目标写法是：</p>\n<p>$$F_{\\text{task}}(\\mathbf{p}_j^e) = -\\sum_j V(\\mathbf{p}_j^e)$$</p>\n<p>其中高价值区域代表“应该到达”的空间位置，低价值区域代表障碍或约束。</p>\n<h5>3D 体素值图的合成机制</h5>\n<p>核心洞察是将 LLM 视作\"零样本代码生成器\"。给定场景的 3D 体素网格和物体标签，LLM 输出 Python 代码调用两类原子操作：</p>\n<ul>\n<li><code>affordance_map</code>: 定义\"应该去哪\"——如\"抓住杯子\"生成杯子顶部以上 5cm 区域的高值。</li>\n<li><code>constraint_map</code>: 定义\"不能去哪\"——如\"避免碰撞桌面\"生成桌面区域的负值。</li>\n</ul>\n<p>两类图通过 <strong>加权求和</strong> 融合：$F_{\\text{task}} = w_a F_{\\text{affordance}} + w_c F_{\\text{constraint}}$。LLM 代码还自动计算物体间的空间关系（如\"杯子在桌上\"→杯子的可供性区域 z 坐标高于桌面）。<strong>扰动体素</strong> 在约束边界注入高斯噪声，迫使 MPC 采样器主动远离危险区域。</p>\n<h5>闭环在线重规划</h5>\n<p>系统以 $5\\text{Hz}$ 频率执行以下循环：① 摄像机更新场景点云 → ② 重新计算 $F_{\\text{task}}$ → ③ MPC 随机射击 1000 条候选轨迹，选 $F_{\\text{task}}$ 最高者 → ④ 执行第一步动作。这种设计使得系统可以<strong>在线适应物体移动和遮挡变化</strong>，无需显式状态估计。每次重规划约 $50\\text{ms}$，满足实时性要求。</p>\n<h5>方法价值与局限</h5>\n<p>VoxPoser 的价值在于它把 LLM 的语义推理结果变成了可解释的空间中间表示，因此非常容易与不同下游规划器组合，也比“直接输出动作”的黑盒 VLA 更容易调试。</p>\n<p>但它也有明显局限：\n- 依赖外部感知模块，不是端到端方案\n- 更偏末端轨迹级规划，对精细接触动力学支持有限\n- 主要规划末端路径，未完整覆盖全臂避碰和复杂装配</p>\n<p>因此它更像是 “LLM + 3D planning” 路线的重要代表，而不是直接替代端到端 VLA。</p>\n<p>Code-as-Policies（Liang et al., 2023）同样用 LLM 生成代码控制机器人，但它是 2D 平面导航 + 刚性动作原语。VoxPoser 的创新在于将 LLM 代码输出<strong>投影到 3D 体素值图</strong>这一通用表示中，使得任何下游规划器（MPC、轨迹优化）都能消费，极大提升了灵活性和避碰能力。</p>"
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
      "summary": "RoboAgent 的核心目标是：扩散模型扩充演示实现多任务泛化。",
      "keyPoints": [
        "核心动机：扩散模型扩充演示实现多任务泛化",
        "代表机构：CMU/Meta"
      ],
      "detail": "<p>扩散模型扩充演示实现多任务泛化</p>"
    },
    {
      "id": "rt_x",
      "num": 12,
      "name": "RT-X",
      "fullName": "跨形态机器人Transformer (RT-X)",
      "year": "2023.10",
      "org": "Google/OXE",
      "parent": "rt2",
      "paperUrl": "https://arxiv.org/abs/2310.08864",
      "projectUrl": "",
      "category": "transformer_policy",
      "motivation": "跨形态学习验证不同机器人互助",
      "summary": "RT-X 的核心目标是：跨形态学习验证不同机器人互助。",
      "keyPoints": [
        "核心动机：跨形态学习验证不同机器人互助",
        "演化来源：继承或改进自 rt2",
        "代表机构：Google/OXE"
      ],
      "detail": "<p>跨形态学习验证不同机器人互助</p>"
    },
    {
      "id": "roboflamingo",
      "num": 13,
      "name": "RoboFlamingo",
      "fullName": "机器人火烈鸟 (RoboFlamingo)",
      "year": "2023.11",
      "org": "ByteDance/清华",
      "parent": "palm_e",
      "paperUrl": "https://arxiv.org/abs/2311.01378",
      "projectUrl": "",
      "category": "vlm_finetune",
      "motivation": "解耦VLM与显式策略头的高效方案",
      "summary": "RoboFlamingo 的核心目标是：解耦VLM与显式策略头的高效方案。",
      "keyPoints": [
        "核心动机：解耦VLM与显式策略头的高效方案",
        "演化来源：继承或改进自 palm_e",
        "代表机构：ByteDance/清华"
      ],
      "detail": "<p>解耦VLM与显式策略头的高效方案</p>"
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
      "detail": "<h5>4.1 核心示意图</h5>\n<p><img alt=\"HPT 架构图\" src=\"https://liruiw.github.io/hpt/media/figures/framework.png\" />\n<em>图：HPT 的 Stem-Trunk-Head 模块化架构，不同机器人本体通过共享 Trunk 实现表征统一</em></p>\n<p><img alt=\"HPT 概念图\" src=\"https://liruiw.github.io/hpt/media/figures/concept.png\" />\n<em>图：HPT 核心思想——不同本体（embodiment）的感知和动作通过可学习的投影和反投影模块对齐到共享空间</em></p>\n<h5>4.2 算法伪代码</h5>\n<pre><code class=\"language-python\"># HPT 前向传播核心流程\ndef hpt_forward(obs, embodiment_id):\n    # 1. Stem: 本体特定编码，将异构观测投影为统一token序列\n    # obs 可以是任意数量/模态的传感器数据\n    tokens = stem[embodiment_id](obs)  # stem: 可学习的线性投影或浅层MLP\n\n    # 2. Trunk: 共享Transformer处理统一token序列\n    # trunk在所有本体间共享权重\n    unified_repr = trunk(tokens)  # Multi-head Self-Attention + FFN\n\n    # 3. Head: 本体特定解码，输出对应动作格式\n    action = head[embodiment_id](unified_repr)\n    return action\n\n# 预训练阶段：在所有数据集上联合训练\nfor batch in mixed_embodiment_dataloader:\n    action_pred = hpt_forward(batch.obs, batch.embodiment_id)\n    loss = behavior_cloning_loss(action_pred, batch.action)\n    loss.backward()\n    optimizer.step()\n\n# 迁移阶段：冻结trunk，仅微调stem和head\ntrunk.requires_grad = False\nfor batch in new_robot_dataloader:\n    action_pred = hpt_forward(batch.obs, new_embodiment_id)\n    loss = behavior_cloning_loss(action_pred, batch.action)\n    (stem_loss + head_loss).backward()  # 仅更新新本体的stem和head\n    optimizer.step()\n</code></pre>\n<h5>4.3 方法细节</h5>\n<p><strong>动机与背景</strong>：机器人学习领域长期面临数据稀缺问题——传统方法针对特定机器人本体从头训练策略，无法利用其他本体的大量数据。不同机器人的传感器配置（相机数量、是否有力传感器）、动作空间（关节角度 vs 末端位姿、连续 vs 离散）千差万别，直接拼接训练会导致表征空间混乱。HPT 的核心动机是将\"本体\"（embodiment）视为一个可建模的变量，通过显式的模块化设计实现异构数据的统一预训练。</p>\n<p><strong>核心机制——Stem-Trunk-Head 拆解</strong>：Stem 模块负责\"消化\"本体特异性。每个本体拥有独立的 Stem，将原始观测 \\(o_i\\)（可能是一张 RGB 图、一组关节角度、一段力传感器读数，或它们的任意组合）映射为固定数量（如 64 个）的统一维度 token 序列。映射方式灵活——对于图像用轻量 CNN/ViT patch embedding，对于低维向量用 MLP 投影 + 可学习位置编码区分不同传感器通道。Trunk 是核心的共享 Transformer，采用标准的 Multi-head Self-Attention 堆叠，在所有本体间共享权重，这正是实现知识迁移的关键。Head 模块是 Stem 的逆过程——将 Trunk 输出的统一表征解码为特定本体的动作格式，可以是末端位姿的 6D 向量、关节角度序列，甚至离散的动作 token。</p>\n<div class=\"key-point\">💡 关键：Stem 和 Head 的设计保证了 Trunk 内部始终处理<strong>相同形状</strong>的 token 序列，无论上游有多少摄像头、下游控制几个关节。这让 Trunk 成为一个真正的\"通用策略大脑\"。</div>\n<p><strong>训练与迁移流程</strong>：预训练阶段采用行为克隆（Behavior Cloning）目标，在全部 52 个数据集的混合批次上联合优化：\\(\\mathcal{L} = \\mathbb{E}_{(o, a) \\sim \\mathcal{D}} \\| \\text{Head}(\\text{Trunk}(\\text{Stem}(o))) - a \\|^2\\)（连续动作）或交叉熵（离散动作）。关键技巧是<strong>按本体平衡采样</strong>，防止大数据集本体主导梯度更新。迁移到新机器人时，冻结 Trunk 权重，仅需用少量（如 50-100 条）新本体轨迹微调新的 Stem 和 Head。这种\"即插即用\"方式大幅降低了新机器人的数据需求，同时保留了预训练学到的通用视觉-运动关联。</p>\n<p><strong>与相关工作的对比</strong>：不同于 RT-X（在固定动作空间的同构机器人间共享数据，本质是数据混合而非架构统一），HPT 首次实现了真正异构本体间的架构级统一。相比 Octo 等基于单一本体设计的通用策略模型，HPT 的模块化设计允许动态扩展新本体类型而无需修改 Trunk 结构。与传统域自适应方法（如 finetuning 全网络）相比，冻结 Trunk 的策略防止了小样本场景下的灾难性遗忘。</p>\n<h5>4.4 关键公式</h5>\n<p><strong>统一观测编码</strong>：设本体 \\(e\\) 有 \\(K_e\\) 个传感器，第 \\(k\\) 个传感器观测为 \\(\\mathbf{s}_k \\in \\mathbb{R}^{d_k}\\)。Stem 将每个传感器独立编码后拼接为统一 token 序列：</p>\n<p>$$\\mathbf{z}_k = \\text{MLP}_k^{(e)}(\\mathbf{s}_k) \\in \\mathbb{R}^{D} \\quad \\Rightarrow \\quad \\mathbf{Z}^{(e)} = [\\mathbf{z}_1; \\mathbf{z}_2; \\dots; \\mathbf{z}_{K_e}] \\in \\mathbb{R}^{K_e \\times D}$$</p>\n<p>对于图像传感器，MLP 替换为轻量 CNN 或 patch embedding 投影。所有本体投影后的 token 维度 \\(D\\) 统一（如 \\(D=512\\)），但 token 数量 \\(K_e\\) 可不同。</p>\n<p><strong>共享 Transformer 处理</strong>：</p>\n<p>$$\\mathbf{H}^{(l+1)} = \\text{LN}\\big(\\mathbf{H}^{(l)} + \\text{MHA}(\\mathbf{H}^{(l)})\\big), \\quad \\mathbf{H}^{(l+2)} = \\text{LN}\\big(\\mathbf{H}^{(l+1)} + \\text{FFN}(\\mathbf{H}^{(l+1)})\\big)$$</p>\n<p>其中 \\(\\mathbf{H}^{(0)} = \\mathbf{Z}^{(e)} + \\mathbf{P}^{(e)}\\)（\\(\\mathbf{P}^{(e)}\\) 为本体特定的可学习位置编码），MHA 为多头自注意力，FFN 为两层 MLP。</p>\n<p><strong>预训练损失（多本体联合 BC）</strong>：</p>\n<p>$$\\mathcal{L}_{\\text{pretrain}} = \\sum_{e \\in \\mathcal{E}} \\frac{1}{|\\mathcal{D}_e|} \\sum_{(o,a) \\in \\mathcal{D}_e} \\ell\\big(\\text{Head}_e(\\text{Trunk}(\\text{Stem}_e(o))), a\\big)$$</p>\n<p>其中 \\(\\ell\\) 为 MSE（连续动作）或交叉熵（离散动作），\\(\\mathcal{E}\\) 为所有训练本体集合。</p>\n<div class=\"warn-box\">⚠️ 注意：Stem 输出的 token 数量因本体传感器数量而异，但 Trunk 中的自注意力机制天然支持变长序列，因此无需 padding 到统一长度，这避免了不必要的计算浪费。</div>",
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
      "org": "UC Berkeley等",
      "parent": "roboagent",
      "paperUrl": "https://arxiv.org/abs/2405.12213",
      "projectUrl": "",
      "category": "diffusion_flow",
      "motivation": "开源通用策略支持扩散动作头",
      "summary": "Octo 的核心目标是：开源通用策略支持扩散动作头。",
      "keyPoints": [
        "核心动机：开源通用策略支持扩散动作头",
        "演化来源：继承或改进自 roboagent",
        "代表机构：UC Berkeley等"
      ],
      "detail": "<p>开源通用策略支持扩散动作头</p>"
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
      "summary": "OpenVLA 提出将预训练的 Prismatic-7B 视觉语言模型（DINOv2+SigLIP 视觉编码器 + Llama 2 7B）微调为通用机器人操控策略，通过动作离散化和端到端训练，在 970k Open X-Embodiment 机器人演示数据上训练出仅 7B 参数即超越 55B RT-2-X 的开源 VLA 模型。",
      "keyPoints": [
        "<strong>三组件架构</strong>：DINOv2+SigLIP 双视觉编码器（~600M）→ 2层MLP投影器 → Llama 2 7B LLM 主干",
        "<strong>动作标记化</strong>：7维连续动作各离散为256 bins，映射到 Llama tokenizer 中最低频的256个token，保留高频token用于文本指令",
        "<strong>大规模机器人预训练</strong>：在 Open X-Embodiment 数据集 970k 条演示上微调 27 epochs，224×224图像分辨率，学习率 2e-5，batch size 2048",
        "<strong>训练资源</strong>：64张 A100 GPU，训练耗时约14天",
        "<strong>关键发现1</strong>：冻结视觉编码器严重损害性能（47.0% vs 69.7% full fine-tune），必须全部解冻微调",
        "<strong>关键发现2</strong>：DINOv2+SigLIP 双编码器显著优于单一 SigLIP 或 CLIP 编码器，空间推理能力更强",
        "<strong>超越 RT-2-X</strong>：在 29 个跨机器人形态任务上平均成功率高出 16.5%（绝对值），参数量仅为其 1/7",
        "<strong>高效微调</strong>：LoRA (rank=32) 仅训练1.4%参数即匹配全参数微调性能（68.2% vs 69.7%），VRAM仅需59.7GB",
        "<strong>量化推理</strong>：支持 int4 量化，在消费级 RTX 4090 GPU 上以 ~6Hz 运行，不损失下游任务成功率",
        "<strong>完全开源</strong>：提供模型权重、PyTorch 代码库、微调 notebook 和 VLA 推理服务端"
      ],
      "detail": "<h5>1. 模型架构</h5>\n<p><img alt=\"OpenVLA 架构示意图\" src=\"https://ar5iv.labs.arxiv.org/html/2406.09246/x1.png\" />\n<em>图：OpenVLA 模型架构。给定观测图像和语言指令，模型预测7维机器人控制动作。三部分：DINOv2+SigLIP 视觉编码器 → MLP投影器 → Llama 2 7B LLM。</em></p>\n<p>OpenVLA 的架构继承自现代 VLM 的标准设计范式，核心基于 <strong>Prismatic-7B</strong> 视觉语言模型，由三个组件组成：</p>\n<p><strong>(1) 视觉编码器（~600M 参数）</strong>：采用<strong>双编码器融合</strong>设计——DINOv2 和 SigLIP 各处理输入图像（224×224），输出特征向量在通道维度拼接。与仅使用 CLIP 或 SigLIP 的常见方案不同，DINOv2 的加入显著提升了空间推理能力，这对机器人操控任务尤为关键。视觉编码器共输出约 256 个图像 patch embedding。</p>\n<p><strong>(2) 投影器</strong>：一个轻量的 2 层 MLP，将拼接后的视觉特征映射到 LLM 的 token 嵌入空间（4096 维）。</p>\n<p><strong>(3) LLM 主干</strong>：Llama 2 7B，标准 Transformer decoder-only 架构，将视觉 token 与文本指令 token 拼接后自回归生成动作 token 序列。</p>\n<div class=\"warn-box\">⚠️ 关键设计决策：视觉编码器必须解冻训练。实验表明冻结视觉编码器导致成功率从 69.7% 骤降至 47.0%，原因在于互联网预训练的视觉特征缺乏机器人操作所需的细粒度空间和物理属性表征。</div>\n<h5>2. 动作离散化与 Token 映射</h5>\n<p>OpenVLA 将连续动作预测转化为语言模型的标准 next-token prediction 任务，核心机制如下：</p>\n<p><strong>动作空间</strong>：7 维绝对笛卡尔动作向量，包括：\n- 末端执行器位置增量 (Δx, Δy, Δz)\n- 旋转增量 (Δroll, Δpitch, Δyaw)\n- 夹爪开合度 (gripper)</p>\n<p><strong>离散化</strong>：每个动作维度独立离散为 256 个均匀 bins，bin 边界设为训练数据该维度第 1 和第 99 百分位数之间。</p>\n<p><strong>Token 分配</strong>：7 个动作维度 × 256 bins = 1792 个 action tokens，覆盖 Llama 2 tokenizer 中<strong>最低频的 256 个字节级 token</strong>。低频 token 在自然语言中几乎不被使用，因此重映射它们为 action token 不会干扰文本理解能力，同时保留所有高频 token 用于处理语言指令。</p>\n<p><strong>训练时</strong>：模型接收图像 token + 指令 token，自回归生成 7 个 action token，loss 仅计算在 action token 上（标准交叉熵）。</p>\n<h5>3. 训练流程</h5>\n<pre><code class=\"language-python\"># OpenVLA 训练框架伪代码\nmodel = PrismaticVLM(\n    vision_encoder=DinoV2_SigLIP(),   # 双视觉编码器 (~600M params)\n    projector=MLP(n_layers=2),\n    llm_backbone=Llama2()             # 7B params\n)\nmodel.vision_encoder.requires_grad = True  # 关键：必须解冻\ndataset = OpenX_Embodiment(num_demos=970_000)\noptimizer = AdamW(lr=2e-5, weight_decay=0.1)\ntrain_loader = DataLoader(dataset, batch_size=2048)\n\nfor epoch in range(27):\n    for img, instruction, action_7d in train_loader:\n        # 动作离散化：7维 × 256 bins\n        action_tokens = discretize(action_7d, bins=256)\n        # 拼接视觉 + 指令 + 动作token，仅计算action token loss\n        loss = model(img, instruction, labels=action_tokens)\n        loss.backward()\n        optimizer.step()\n# 硬件：64×A100 80GB，训练14天\n</code></pre>\n<p><strong>数据混合</strong>：使用 Open X-Embodiment (OXE) 数据集的全部 970k 条机器人演示，覆盖 22 种机器人形态和数百种任务。与 Octo 和 RT-2-X 使用的更小子集不同，OpenVLA 的全数据混合是其性能优势的关键来源之一。</p>\n<p><strong>预处理</strong>：图像 resize 到 224×224，使用 pixel-level 归一化（与 Prismatic 一致）。文本指令以自然语言形式直接拼接到输入序列中。</p>\n<h5>4. 高效微调：LoRA 与量化</h5>\n<p>OpenVLA 的一个核心贡献是证明了<strong>参数高效微调（PEFT）和量化技术可无缝应用于 VLAs</strong>，使其能在消费级 GPU 上适配新任务而不损失性能。</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>微调策略</th>\n<th>成功率</th>\n<th>训练参数量 (M)</th>\n<th>VRAM (batch=16)</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Full Fine-Tuning</td>\n<td>69.7%</td>\n<td>7,188.1</td>\n<td>163.3 GB*</td>\n</tr>\n<tr>\n<td>Last Layer Only</td>\n<td>30.3%</td>\n<td>465.1</td>\n<td>51.4 GB</td>\n</tr>\n<tr>\n<td>Frozen Vision</td>\n<td>47.0%</td>\n<td>6,760.4</td>\n<td>156.2 GB*</td>\n</tr>\n<tr>\n<td>Sandwich FT</td>\n<td>62.1%</td>\n<td>914.2</td>\n<td>64.0 GB</td>\n</tr>\n<tr>\n<td><strong>LoRA, rank=32</strong></td>\n<td><strong>68.2%</strong></td>\n<td><strong>97.6</strong></td>\n<td><strong>59.7 GB</strong></td>\n</tr>\n<tr>\n<td>LoRA, rank=64</td>\n<td>68.2%</td>\n<td>195.2</td>\n<td>60.5 GB</td>\n</tr>\n</tbody>\n</table></div>\n<p><em>注：带 * 策略需 2×GPU 分片（FSDP）</em></p>\n<p><strong>核心发现</strong>：\n- <strong>LoRA rank=32</strong> 达到 68.2%，与 full fine-tuning 的 69.7% 无显著差异，但仅训练 <strong>1.4%</strong> 参数，VRAM 降低 63%\n- Sandwich fine-tuning（解冻视觉编码器 + token embedding + 最后一层）达到 62.1%，是 LoRA 之前的轻量替代\n- Last layer only（30.3%）表明仅微调输出层远不足以适配新任务\n- rank=64 相比 rank=32 无额外收益，表明低秩适配已足够</p>\n<p><strong>量化推理</strong>：OpenVLA 支持 int4 量化部署。在 RTX 4090 消费级 GPU 上，bfloat16 精度推理速度约 <strong>6Hz</strong>，int4 量化进一步降低显存且不损害成功率。模型还提供远程推理服务端，支持实时流式动作预测。</p>\n<h5>5. 实验结果亮点</h5>\n<ul>\n<li><strong>跨平台评测</strong>：在 WidowX (BridgeData V2) 和 Google Robot 两个机器人平台上进行\"开箱即用\"评测，覆盖 29 个任务，含视觉、运动、物理和语义泛化四个维度</li>\n<li><strong>vs RT-2-X (55B)</strong>：除语义泛化外所有类别均超越，平均绝对成功率高出 <strong>16.5%</strong>，参数量仅 1/7</li>\n<li><strong>语言条件能力</strong>：在需要理解复杂语言指令的任务中表现突出，如\"将苹果放入蓝色碗中\" vs \"将苹果放入红色碗中\"</li>\n<li><strong>Fine-tuning 泛化</strong>：在 Franka 机器人上微调后，OpenVLA 展现出强大的多任务泛化能力，尤其在多物体、强语言指令场景下</li>\n</ul>\n<div class=\"key-point\">💡 关键启示：OpenVLA 证明了 (1) 互联网 VLM 预训练 + 大规模机器人数据微调是构建通用机器人策略的有效路径；(2) 开源 7B 模型可超越闭源 55B 模型，关键在于数据混合和视觉编码器选择；(3) LoRA 和量化为 VLA 走进实验室和消费级硬件铺平了道路。</div>",
      "quiz": {
        "q": "OpenVLA 为什么选择冻结 Llama 2 tokenizer 中最低频的 256 个 token 重映射为 action token？",
        "options": [
          "低频 token 在文本生成中损失函数权重更小，便于优化",
          "保留高频 token 用于理解语言指令，同时利用低频 token 的空间容纳动作离散化为 7×256 bins",
          "低频 token 的 embedding 向量维度更小，节省显存",
          "因为 Llama 2 的 tokenizer 恰好有且仅有 256 个低频 token"
        ],
        "answer": 1,
        "explain": "OpenVLA 将 7 维动作各离散化为 256 bins 共需 1792 个 action token。重映射最低频的字节级 token 既能避免占用高频 token 影响语言理解能力，又能利用低信息密度的 token 槽位承载控制信号。"
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
      "summary": "Fourier GR 系列是世界首款量产人形机器人平台，通过 53 个自由度全身关节、自研 FSA 2.0 执行器与基于 Transformer 的端到端全身控制策略，实现了从上层指令到底层关节力矩的直接映射，打破了传统“感知-规划-控制”管道架构，为人形机器人大规模部署提供了完整的硬件-算法闭环方案。",
      "keyPoints": [
        "<strong>端到端全身控制范式</strong>：GR 系列采用 Transformer 策略网络，将多模态感知（RGB 相机、深度、触觉、关节状态）直接映射为 53 自由度全身关节目标位置/力矩，去除模块化分解，实现从视觉到动作的单一前向推理",
        "<strong>自主研发 FSA 2.0 执行器</strong>：7 种定制化旋转执行器，峰值扭矩 &gt;380 N·m，集成双编码器（电机端 + 输出端）实现高精度位置与力矩闭环控制，串行关节结构使腿部负载能力大幅提升",
        "<strong>12-DOF 灵巧手</strong>：每只手 6 个主动自由度，集成 6 阵列触觉传感器，可感知接触力与滑动，形成视觉-触觉-本体的完整感知闭环",
        "<strong>多模态遥操作与数据采集</strong>：支持 VR 遥操作、示教编程和直接指令控制三种模式，可高效采集专家演示数据用于端到端策略训练",
        "<strong>模块化硬件设计</strong>：可拆卸电池支持续航翻倍，集成布线减少线缆外露，串行关节排布最大化有效工作空间",
        "<strong>开源工具链</strong>：原生支持 NVIDIA Isaac Lab 与 MuJoCo 物理仿真，提供 ROS SDK 和 Python API，降低端到端策略开发与迁移成本",
        "<strong>世界首款量产人形机器人</strong>：GR-1 已完成批量交付，GR-2 全面升级，奠定了人形机器人从实验室到产业应用的关键里程碑"
      ],
      "detail": "<h5>核心架构图</h5>\n<p><img alt=\"GR-2 全身结构与执行器排布\" src=\"https://www.fftai.com/_next/image?url=%2Fimages%2Fgr2%2Fgr2-hero.jpg&amp;w=1200\" />\n<em>图 1：GR-2 人形机器人全身硬件结构——175cm / 63kg / 53DOF，采用串行关节排布与集成布线设计</em></p>\n<p><img alt=\"FSA 2.0 执行器\" src=\"https://www.fftai.com/_next/image?url=%2Fimages%2Fgr2%2Ffsa-actuator.jpg&amp;w=800\" />\n<em>图 2：FSA 2.0 系列执行器——7 种定制型号，峰值扭矩 &gt;380 N·m，双编码器闭环控制</em></p>\n<h5>算法流程</h5>\n<pre><code>端到端全身控制流程（GR 系列 VLA 视角）：\n\n对于每个控制周期（目标 20-50Hz）：\n    1. 传感器输入：\n       - Head RGB-D 相机（640×480 或更高分辨率）\n       - 12-DOF 灵巧手指尖触觉阵列（6 传感器/手，三轴力+滑动检测）\n       - 53 个关节编码器（位置、速度、力矩）\n       - 惯性测量单元（IMU）提供基座姿态\n       - 可选的语音/文本指令（自然语言任务描述）\n    2. 感知编码：\n       - 视觉 Transformer 将多帧 RGB-D 图像编码为空间-时序特征\n       - 触觉信号经 MLP 编码为紧凑触觉 token\n       - 关节状态通过浅层 MLP 编码为 proprioceptive token\n       - 指令（文本/语音）经轻量语言编码器（如 USE/CLIP）编码\n    3. 多模态融合与动作生成：\n       - 所有 token 拼接后送入因果 Transformer Decoder（8-12 层）\n       - 输出 53 个关节的目标位置 setpoint（或增量位置/力矩）\n       - 输出 12 个手指关节的目标角度\n       - 离散化动作分布（256 bins/DIM）或连续回归\n    4. 底层闭环：\n       - 目标位置经 FSA 2.0 双编码器 PID/阻抗控制器转化为电流指令\n       - 执行器以 &gt;1kHz 本地闭环频率执行力矩控制\n       - 触觉反馈可用于在线调整抓取力（柔顺控制）\n</code></pre>\n<h5>动机与背景</h5>\n<p>传统人形机器人控制沿袭了\"感知 → 状态估计 → 任务规划 → 轨迹优化 → 全身控制（WBC）→ 关节伺服\"的串行管道。这种模块化设计虽然可解释性强，但存在<strong>误差累积、优化实时性差、环境泛化困难</strong>三大瓶颈。</p>\n<p>Fourier 推出 GR 系列的核心理念是：<strong>硬件与算法联合设计</strong>。一方面，自研 FSA 2.0 执行器提供高带宽（&gt;1kHz 电流环）、高反驱透明度（back-drivability），使基于学习的端到端策略能够直接控制底层关节而无需传统 WBC 的 QP 优化层；另一方面，GR-1 的量产实践证明了端到端 Transformer 策略能够在真实世界搬运、装配、巡检等任务中稳定运行。</p>\n<p>相比于 RT-1/RT-2 的桌面级机械臂，GR 系列的挑战呈指数级增长：53 个自由度（RT-1 仅 7 维动作）、浮动基座的平衡约束、手-臂-躯干-腿的全身协调、以及高负载下的安全交互。因此，GR 的控制策略需要同时解决<strong>运动控制</strong>（行走、平衡）和<strong>操作控制</strong>（抓取、搬运）——这正是\"全身控制\"（Whole-Body Control）的核心内涵。</p>\n<h5>核心技术解析</h5>\n<p><strong>1. FSA 2.0 执行器：学习控制的关键使能器</strong></p>\n<p>端到端策略训练的输出通常是关节位置或力矩命令，这要求执行器具有：\n- <strong>高带宽通信</strong>：&gt;1kHz CAN/EtherCAT总线，保证神经网络推理结果能快速传递到关节\n- <strong>精确的出力控制</strong>：双编码器（电机端 19-bit + 输出端 17-bit）消除传动间隙误差，使策略网络不必建模减速器非线性\n- <strong>柔顺与反驱</strong>：低传动比设计（1:9 ~ 1:16）使得机械臂在断电或故障时可手动拖动，也利于基于力矩的阻抗控制\n- <strong>高扭矩密度</strong>：峰值 &gt;380 N·m，使得单臂负载 3kg 的同时仍可高速运动</p>\n<div class=\"key-point\">💡 关键：FSA 2.0 的本地闭环能力（位置/速度/力矩三种模式可动态切换）为端到端策略提供了\"命令接口\"——策略网络只需输出高层动作意图（如\"膝关节目标角度\"），执行器自行完成底层伺服。这种\"策略-伺服\"的分层架构平衡了端到端的灵活性与工业级稳定性。</div>\n<p><strong>2. 触觉闭环与灵巧操作</strong></p>\n<p>GR-2 的 12-DOF 灵巧手（每手 6 主动自由度）集成了 6 阵列触觉传感器，可感知：\n- 法向接触力（量程 0-15N，分辨率 0.01N）\n- 切向滑动（通过微振动检测）\n- 接触区域热力图</p>\n<p>这些触觉信号通过两种路径影响控制：\n- <strong>快速反射回路</strong>：当检测到意外滑动时，执行器本地自动增加抓取力，延迟 &lt;5ms，无需经 Transformer 推理\n- <strong>慢速策略回路</strong>：触觉 token 作为 Transformer 的输入序列之一，使策略网络学会\"根据物体表面特性调整抓取策略\"（如：光滑物体用指尖捏取，粗糙物体用手掌包裹）</p>\n<p>这种<strong>分层触觉架构</strong>——本地快速反射 + 策略层语义理解——与人类神经系统的脊髓反射 + 大脑皮层控制类似，是 GR 系列实现灵巧操作的关键设计。</p>\n<p><strong>3. 端到端策略的部署与训练框架</strong></p>\n<p>Fourier 官方并未公开具体模型架构，但结合其技术栈（NVIDIA Isaac Lab、MuJoCo、ROS 2）和行业趋势，可推断其端到端策略采用以下技术路线：</p>\n<ul>\n<li><strong>仿真预训练</strong>：在 Isaac Lab 中构建 GR 的数字孪生（数字躯干），利用并行 GPU 仿真生成海量全身控制数据（行走、抓取、搬运），训练基础运动控制先验</li>\n<li><strong>Sim-to-Real 迁移</strong>：采用域随机化（动力学参数、视觉纹理、接触参数）+ 执行器输入-输出测量做系统辨识，缩小 Sim-to-Real Gap</li>\n<li><strong>真实数据微调</strong>：通过 VR 遥操作 + 示教模式采集任务专属演示（如工厂搬运），用行为克隆（BC）或 DPO 微调策略</li>\n<li><strong>混合控制</strong>：对于行走等安全要求高的子任务，可切换至传统模型预测控制（MPC）+ 全身控制（WBC），操作任务则由端到端策略主导，形成混合架构</li>\n</ul>\n<h5>与传统方法对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th>传统人形机器人（Atlas, Asimo）</th>\n<th>GR 系列（VLA 视角）</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>控制架构</td>\n<td>感知→规划→WBC→伺服（多层优化）</td>\n<td>端到端 Transformer 直接输出关节指令</td>\n</tr>\n<tr>\n<td>动作生成</td>\n<td>离线轨迹优化 + 在线 MPC</td>\n<td>单次神经网络前向推理（20-50Hz）</td>\n</tr>\n<tr>\n<td>执行器</td>\n<td>液压/高传动比减速器</td>\n<td>FSA 2.0 低传动比力矩电机，原生反驱</td>\n</tr>\n<tr>\n<td>触觉</td>\n<td>极少或无</td>\n<td>12 指端 6 阵列触觉传感器 + 快速反射</td>\n</tr>\n<tr>\n<td>数据依赖</td>\n<td>精确模型 + 状态估计</td>\n<td>仿真 + 遥操作演示 + 微调</td>\n</tr>\n<tr>\n<td>量产状态</td>\n<td>实验室原型</td>\n<td>世界首款量产人形机器人（GR-1 已交付）</td>\n</tr>\n<tr>\n<td>开源生态</td>\n<td>封闭</td>\n<td>ROS SDK + Isaac Lab + MuJoCo 支持</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"warn-box\">⚠️ 注意：GR 系列本质上是一个<strong>硬件-算法联合平台</strong>，而非单一学术论文中的方法。其控制策略可根据应用需求在传统 WBC 与端到端策略之间灵活切换，代表了\"从学术 VLA 到工业落地\"的中间态——保留传统方法的安全保障，逐步引入端到端泛化能力。</div>\n<h5>关键硬件参数速览</h5>\n<p><strong>GR-1（初代量产款）</strong>\n- 身高：165 cm\n- 体重：55 kg\n- 自由度：40 DOF\n- 单臂负载：2 kg\n- 灵巧手：6 DOF × 2（可选）\n- 行走速度：1.2 m/s\n- 电池：可拆卸，续航 2 小时</p>\n<p><strong>GR-2（升级款）</strong>\n- 身高：175 cm\n- 体重：63 kg\n- 自由度：53 DOF（含 12-DOF 灵巧手）\n- 单臂负载：3 kg\n- 执行器：FSA 2.0，7 种定制型号，峰值扭矩 &gt;380 N·m\n- 灵巧手：12 DOF，6 阵列触觉传感器\n- 结构：串行关节排布，集成布线\n- 电池：可拆卸，续航翻倍（4 小时）\n- 仿真支持：NVIDIA Isaac Lab + MuJoCo + ROS 2 SDK</p>",
      "quiz": {
        "q": "Fourier GR-2 中 FSA 2.0 执行器的双编码器设计的主要作用是什么？",
        "options": [
          "提高电机的最大转速",
          "消除传动间隙误差，使端到端策略不必建模减速器非线性",
          "降低执行器功耗",
          "增加通信带宽"
        ],
        "answer": 1,
        "explain": "FSA 2.0 的电机端编码器（19-bit）和输出端编码器（17-bit）共同工作，可以在执行器本地闭环控制中实时补偿谐波减速器的传动误差、摩擦和回差，使得上层端到端策略只需要关心运动意图（如目标位置/力矩），而不必处理底层传动链的非线性。这是端到端策略能够直接控制 53 自由度全身关节的关键硬件基础。"
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
      "paperUrl": "https://www.pi.website/blog/pi0",
      "projectUrl": "",
      "category": "diffusion_flow",
      "motivation": "流匹配动作专家支持50Hz高频控制",
      "summary": "π0 的核心目标是：流匹配动作专家支持50Hz高频控制。",
      "keyPoints": [
        "核心动机：流匹配动作专家支持50Hz高频控制",
        "演化来源：继承或改进自 octo",
        "代表机构：Physical Intelligence"
      ],
      "detail": "<p>流匹配动作专家支持50Hz高频控制</p>"
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
      "year": "2025.09",
      "org": "CoRL 2025",
      "parent": "openvla",
      "paperUrl": "https://proceedings.mlr.press/v305/",
      "projectUrl": "",
      "category": "transformer_policy",
      "motivation": "相位感知输入掩码解决长程任务",
      "summary": "Long-VLA 提出了一种相位感知的输入掩码策略，将长程操作任务拆成“移动阶段”和“交互阶段”，并据此动态调节不同视觉输入的注意力范围，使统一 VLA 模型能在不改变整体架构的情况下更稳定地完成多步骤长程任务。",
      "keyPoints": [
        "<strong>相位感知输入掩码</strong>：根据当前处于移动还是交互阶段，动态屏蔽或放大某些视觉 token 的注意力",
        "<strong>数据分解策略</strong>：把整条机器人轨迹按切割点自动拆成移动段和交互段，并显式加入 phase id",
        "<strong>统一端到端架构</strong>：仍然使用单一多模态 Transformer 编码器 + 条件扩散动作解码器",
        "<strong>L-CALVIN 基准</strong>：把 CALVIN 的任务链从 5 步扩展到 10 步，系统评估长程操作能力",
        "<strong>架构无关</strong>：该掩码机制不要求替换模型骨干，本质上是一个可插拔的输入级模块",
        "<strong>检测增强与目标建模</strong>：结合 Grounding DINO 和 CLIP 目标编码，提高长程导航和交互阶段的目标定位能力"
      ],
      "detail": "<h5>核心思想：为什么长程任务难</h5>\n<p>长程机器人任务不是简单把短任务串起来。移动阶段与交互阶段对视觉信息的需求不同：\n- <strong>移动阶段</strong> 更依赖静态相机和全局目标位置\n- <strong>交互阶段</strong> 更依赖夹爪相机和局部细节</p>\n<p>如果把所有视觉 token 一视同仁，模型往往会在长程序列中被无关视觉信息干扰，导致注意力分散。</p>\n<h5>相位感知掩码</h5>\n<p>Long-VLA 的解决方法是在输入层引入 phase-aware mask。<br />\n当阶段为移动时，屏蔽夹爪相机等局部 token；当阶段为交互时，再激活所有 token。</p>\n<p>其直观形式可以写成：</p>\n<p>$$M_{ij} = m_i \\cdot m_j$$</p>\n<p>只有当对应 token 在当前阶段被激活时，它们之间的注意力连接才被保留。</p>\n<h5>为什么这个方法有效</h5>\n<p>这个设计的优点在于：\n- 不需要重新设计骨干网络\n- 不改变动作解码器形式\n- 只是通过阶段信息去调度“模型应该关注什么”</p>\n<p>因此它特别适合作为现有 VLA 的增强模块。论文在 L-CALVIN 上表明，这种输入级的结构偏置足以显著提升长程连续任务的完成率，说明很多长程失败并非来自控制器本身，而是来自注意力资源分配错误。</p>"
    },
    {
      "id": "groot_n2",
      "num": 21,
      "name": "GR00T N2",
      "fullName": "英伟达人形基础模型 (GR00T N2)",
      "year": "2026.03",
      "org": "NVIDIA",
      "parent": "helix",
      "paperUrl": "https://nvidianews.nvidia.com/news/nvidia-partners-with-global-robotics-ecosystem-to-power-production-scale-physical-ai",
      "projectUrl": "",
      "category": "diffusion_flow",
      "motivation": "世界动作模型预测物理状态演变",
      "summary": "GR00T N2 的核心目标是：世界动作模型预测物理状态演变。",
      "keyPoints": [
        "核心动机：世界动作模型预测物理状态演变",
        "演化来源：继承或改进自 helix",
        "代表机构：NVIDIA"
      ],
      "detail": "<p>世界动作模型预测物理状态演变</p>"
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
      "summary": "DFM-VLA 将离散流匹配（Discrete Flow Matching）引入视觉-语言-动作模型的动作解码阶段，通过在离散 token 空间中进行迭代细化，克服了自回归解码\"不可逆承诺\"和离散扩散收敛慢的问题，在 CALVIN（Avg. Len. 4.44）和 LIBERO（95.7%）基准上取得 SOTA 性能。",
      "keyPoints": [
        "<strong>核心问题</strong>：AR 解码存在\"不可逆承诺\"（irreversible commitment），早期 token 错误无法修正并向后传播；离散扩散（DD）虽可迭代但收敛慢、需大量去噪步",
        "<strong>离散流匹配动作解码</strong>：在 VLA 的动作 token 解码阶段引入离散流匹配，通过连续时间马尔可夫链（CTMC）在离散 token 空间中构建确定性概率路径，实现高效迭代细化",
        "<strong>两种速度场构造</strong>：Velocity Head（额外 MLP 头预测转移速率）和 Embedding-Guided（利用 LLM 词嵌入相似度隐式构建速度场），后者收敛更快、性能更优",
        "<strong>两阶段推理策略</strong>：前 \\(T_{\\text{fine}}\\) 步使用 CTMC 随机采样进行迭代细化，后 \\(T_{\\text{val}}\\) 步切换为贪心确定性解码进行验证锁定（默认 14+2）",
        "<strong>Adaptive Cache 加速</strong>：检测未变化的 token 跳过重复计算，推理速度达 121 Hz，兼顾质量与效率",
        "<strong>基于 UniVLA 架构</strong>：采用 FAST+BPE 动作编码将连续动作离散化为 token 序列，复用预训练 VLM 的 token 空间",
        "<strong>CALVIN ABCD→D</strong>：Avg. Len. 4.44（+Embed 变体），5-step 完成率 78.0%，超越 UniVLA（4.18）、ReconVLA（4.25）等基线",
        "<strong>LIBERO</strong>：四个子套件平均成功率 95.7%，在 Spatial/Object/Goal/Long 上全面领先",
        "<strong>低数据优势</strong>：10% 数据下 DFM 达 3.21 vs AR 1.71 / DD 2.84，数据效率显著更高"
      ],
      "detail": "<h5>整体架构</h5>\n<p><img alt=\"DFM-VLA 整体架构对比\" src=\"https://ar5iv.labs.arxiv.org/html/2603.26320/assets/x1.png\" />\n<em>图 1：三种离散动作解码范式对比。(a) 自回归（AR）逐 token 生成，错误不可逆传播；(b) 离散扩散（DD）从全噪声出发逐步去噪；(c) DFM 通过离散流匹配构建确定性概率路径，实现高效迭代细化。</em></p>\n<p><img alt=\"DFM-VLA 模型架构\" src=\"https://ar5iv.labs.arxiv.org/html/2603.26320/assets/x2.png\" />\n<em>图 2：DFM-VLA 模型架构。左侧为 VLM 骨干（视觉编码器 + 语言模型），右侧展示两种速度场构造方式（Velocity Head 和 Embedding-Guided）以及两阶段推理流程。</em></p>\n<p><img alt=\"两阶段推理策略\" src=\"https://ar5iv.labs.arxiv.org/html/2603.26320/assets/x3.png\" />\n<em>图 3：两阶段推理策略示意。Stage 1（Iterative Refinement）使用 CTMC 随机采样逐步细化动作 token；Stage 2（Deterministic Validation）切换为贪心解码锁定最终动作。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># DFM-VLA: 离散流匹配动作解码核心流程\n\n# === 训练阶段 ===\ndef train_step(x1, observation, instruction):\n    &quot;&quot;&quot;x1: 目标动作token序列 (FAST+BPE编码)&quot;&quot;&quot;\n    # 1. 采样时间步 t ~ Uniform(0, 1)\n    t = uniform(0, 1)\n\n    # 2. 构造插值分布 p_t(x|x1)\n    #    p_t(x=x1) = t,  p_t(x=mask) = 1-t\n    #    即以概率 t 保持真实token，以概率 1-t 替换为 [MASK]\n    mask = bernoulli(1 - t, shape=x1.shape)\n    x_t = where(mask, MASK_TOKEN, x1)\n\n    # 3. VLM前向传播，获取条件概率 p_theta(·|x_t, obs, inst)\n    logits = vlm_forward(x_t, observation, instruction, t)\n\n    # 4. 计算交叉熵损失（仅在被mask的位置）\n    loss = cross_entropy(logits[mask], x1[mask])\n    return loss\n\n# === 推理阶段：两阶段解码 ===\ndef inference(observation, instruction, T_fine=14, T_val=2):\n    T = T_fine + T_val\n    dt = 1.0 / T\n\n    # 初始化：全部为 [MASK] token\n    x = full(action_length, MASK_TOKEN)\n\n    # Stage 1: CTMC 随机迭代细化\n    for step in range(T_fine):\n        t = step * dt\n        logits = vlm_forward(x, observation, instruction, t)\n\n        # 计算速度场（两种方式之一）\n        # 方式A - Velocity Head:\n        #   v = velocity_head(hidden_states)  # 额外MLP\n        # 方式B - Embedding-Guided (默认):\n        #   p_theta = softmax(logits)\n        #   v(y|x_t) = p_theta(y) / (1-t)  对 y ≠ x_t\n\n        # CTMC 转移：以概率 v(y|x_t)*dt 跳转到新token y\n        probs = compute_transition_probs(logits, x, t, dt)\n        x = categorical_sample(probs)  # 随机采样\n\n    # Stage 2: 贪心确定性验证\n    for step in range(T_fine, T):\n        t = step * dt\n        logits = vlm_forward(x, observation, instruction, t)\n        x = argmax(logits, dim=-1)  # 贪心解码\n\n    return x  # 最终动作token序列 → FAST解码为连续动作\n</code></pre>\n<h5>动机与背景</h5>\n<p>当前主流 VLA 模型的动作解码主要有三种范式：</p>\n<ol>\n<li>\n<p><strong>自回归（AR）解码</strong>：逐 token 从左到右生成，每个 token 一旦生成即\"锁定\"，无法回溯修正。这种\"不可逆承诺\"（irreversible commitment）意味着早期的微小错误会通过条件依赖链向后传播，在长序列中导致严重的误差累积。</p>\n</li>\n<li>\n<p><strong>连续扩散（Continuous Diffusion）</strong>：在连续动作空间中通过去噪过程迭代细化，但需要额外的扩散头，无法复用 VLM 的离散 token 空间，且与语言建模的统一性较差。</p>\n</li>\n<li>\n<p><strong>离散扩散（DD）</strong>：在离散 token 空间中进行去噪，但其从均匀噪声出发的随机过程收敛较慢，需要大量去噪步才能达到良好性能。</p>\n</li>\n</ol>\n<p>DFM-VLA 的核心洞察是：<strong>离散流匹配（Discrete Flow Matching）可以在离散 token 空间中构建更高效的确定性概率路径</strong>，相比离散扩散的随机游走，流匹配的插值路径更直接、收敛更快。</p>\n<h5>核心机制：离散流匹配</h5>\n<p><strong>概率路径构造</strong>。DFM-VLA 在源分布 \\(p_0\\)（噪声/mask 分布）和目标分布 \\(p_1\\)（真实动作 token 分布）之间构建条件概率路径。对于每个目标 token \\(x_1\\)，条件分布为：</p>\n<p>$$p_t(x \\mid x_1) = t \\cdot \\mathbf{1}_{x = x_1} + (1 - t) \\cdot \\mathbf{1}_{x = m}$$</p>\n<p>其中 \\(m\\) 是 mask token，\\(t \\in [0, 1]\\)。直觉上，随着 \\(t\\) 从 0 增大到 1，token 从全 mask 状态逐渐\"显现\"为真实动作 token。</p>\n<p><strong>速度场与 CTMC</strong>。该概率路径对应的连续时间马尔可夫链（CTMC）的速率矩阵为：</p>\n<p>$$u_t(y \\mid x, x_1) = \\frac{p_t(y \\mid x_1)}{(1 - t) \\cdot p_t(x \\mid x_1)} \\cdot \\mathbf{1}_{y \\neq x}$$</p>\n<div class=\"key-point\">💡 <strong>关键直觉</strong>：速率矩阵描述了在时刻 \\(t\\)，当前状态为 \\(x\\) 时跳转到状态 \\(y\\) 的\"速度\"。分子是目标状态的概率质量，分母是当前状态的\"剩余时间\"——越接近 \\(t=1\\)，剩余时间越少，跳转速率越高，迫使 token 快速收敛到目标。</div>\n<p><strong>边际化速度场</strong>。训练时我们无法访问 \\(x_1\\)，因此需要对其边际化：</p>\n<p>$$u_t(y \\mid x) = \\mathbb{E}_{p_{1|t}(x_1 \\mid x)} \\left[ u_t(y \\mid x, x_1) \\right] = \\frac{p_{1|t}(y \\mid x)}{1 - t} \\cdot \\mathbf{1}_{y \\neq x}$$</p>\n<p>其中 \\(p_{1|t}(y \\mid x)\\) 是给定当前噪声状态 \\(x\\) 对目标 token 的后验预测。这正是 VLM 输出的 softmax 概率！</p>\n<h5>两种速度场构造</h5>\n<p><strong>Velocity Head（+Head）</strong>：在 VLM 最后一层隐藏状态之上添加一个独立的 MLP 头，直接预测每个位置的转移速率向量 \\(v_\\theta(x_t, t) \\in \\mathbb{R}^{|\\mathcal{V}|}\\)。优点是解耦了语言建模和速度场预测；缺点是引入额外参数且无法利用预训练词嵌入的语义信息。</p>\n<p><strong>Embedding-Guided（+Embed）</strong>：利用 VLM 的 LM head 输出 logits，通过 softmax 得到 \\(p_\\theta(y \\mid x_t)\\)，然后按上述公式隐式构造速度场：</p>\n<p>$$v_\\theta(y \\mid x_t, t) = \\frac{p_\\theta(y \\mid x_t)}{1 - t} \\cdot \\mathbf{1}_{y \\neq x_t}$$</p>\n<div class=\"key-point\">💡 <strong>关键优势</strong>：Embedding-Guided 方式直接复用了预训练 LLM 的词嵌入空间，token 之间的语义相似度自然编码在嵌入中，提供了更平滑的优化信号。实验表明该变体收敛更快、最终性能更优。</div>\n<h5>两阶段推理策略</h5>\n<p>推理分为两个阶段，总步数固定为 \\(T = T_{\\text{fine}} + T_{\\text{val}}\\)（默认 16 = 14 + 2）：</p>\n<ol>\n<li>\n<p><strong>Stage 1 — 迭代细化</strong>（\\(T_{\\text{fine}}\\) 步）：使用 CTMC 的随机采样规则，每步根据速度场计算转移概率并采样新 token。随机性允许模型探索多种可能的 token 组合，避免过早锁定。</p>\n</li>\n<li>\n<p><strong>Stage 2 — 确定性验证</strong>（\\(T_{\\text{val}}\\) 步）：切换为贪心 argmax 解码，确定性地锁定最终 token。这一阶段消除了随机性带来的噪声，确保输出动作的稳定性。</p>\n</li>\n</ol>\n<div class=\"warn-box\">⚠️ <strong>设计权衡</strong>：消融实验表明 \\(T_{\\text{val}} = 0\\)（纯随机）和 \\(T_{\\text{val}}\\) 过大（过早贪心）都会损害性能。最优配置 \\(T_{\\text{fine}} = 14, T_{\\text{val}} = 2\\) 在探索与稳定之间取得最佳平衡。</div>\n<h5>训练细节</h5>\n<ul>\n<li><strong>动作编码</strong>：采用 FAST（Frequency-Adaptive Serialization of Trajectories）+ BPE 将连续动作序列离散化为 token，复用 VLM 的词表空间</li>\n<li><strong>调度参数</strong>：\\(c = 3\\)（logit-linear 调度控制噪声分布），\\(\\alpha = 1\\)（采样温度）</li>\n<li><strong>训练损失</strong>：标准交叉熵，仅在被 mask 的位置计算，与语言建模目标形式一致</li>\n<li><strong>基础模型</strong>：基于 UniVLA 预训练检点初始化，学习率 \\(1 \\times 10^{-4}\\)，batch size 8，8×H100 GPU</li>\n<li><strong>训练步数</strong>：仿真 20k–32k 步，真实世界 5k 步</li>\n</ul>\n<h5>实验结果与分析</h5>\n<p><strong>CALVIN ABCD→D</strong>（1000 rollouts，每个含 5 个连续子任务）：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>1-step</th>\n<th>2-step</th>\n<th>3-step</th>\n<th>4-step</th>\n<th>5-step</th>\n<th>Avg. Len.</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>UniVLA* (AR)</td>\n<td>0.960</td>\n<td>0.920</td>\n<td>0.862</td>\n<td>0.790</td>\n<td>0.690</td>\n<td>4.18</td>\n</tr>\n<tr>\n<td>ReconVLA</td>\n<td>0.966</td>\n<td>0.924</td>\n<td>0.870</td>\n<td>0.800</td>\n<td>0.690</td>\n<td>4.25</td>\n</tr>\n<tr>\n<td>DFM-VLA+Head</td>\n<td>0.972</td>\n<td>0.938</td>\n<td>0.886</td>\n<td>0.824</td>\n<td>0.760</td>\n<td>4.38</td>\n</tr>\n<tr>\n<td><strong>DFM-VLA+Embed</strong></td>\n<td><strong>0.978</strong></td>\n<td><strong>0.948</strong></td>\n<td><strong>0.892</strong></td>\n<td><strong>0.840</strong></td>\n<td><strong>0.780</strong></td>\n<td><strong>4.44</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>LIBERO</strong>（4 个子套件，每套件 10 任务 × 50 rollouts）：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>Spatial</th>\n<th>Object</th>\n<th>Goal</th>\n<th>Long</th>\n<th>Avg.</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>UniVLA*</td>\n<td>91.4</td>\n<td>95.8</td>\n<td>90.6</td>\n<td>88.2</td>\n<td>91.5</td>\n</tr>\n<tr>\n<td><strong>DFM-VLA+Embed</strong></td>\n<td><strong>96.8</strong></td>\n<td><strong>98.0</strong></td>\n<td><strong>95.2</strong></td>\n<td><strong>92.8</strong></td>\n<td><strong>95.7</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>推理效率</strong>（CALVIN）：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>Avg. Len.</th>\n<th>Speed (Hz)</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>AR</td>\n<td>4.18</td>\n<td>50.2</td>\n</tr>\n<tr>\n<td>DFM</td>\n<td>4.42</td>\n<td>60.2</td>\n</tr>\n<tr>\n<td>DFM + Adaptive Cache</td>\n<td>4.40</td>\n<td><strong>121.0</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>数据效率</strong>（CALVIN，不同数据比例）：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>数据比例</th>\n<th>AR</th>\n<th>DD</th>\n<th>DFM</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>10%</td>\n<td>1.71</td>\n<td>2.84</td>\n<td><strong>3.21</strong></td>\n</tr>\n<tr>\n<td>50%</td>\n<td>3.01</td>\n<td>3.88</td>\n<td><strong>4.03</strong></td>\n</tr>\n<tr>\n<td>100%</td>\n<td>4.18</td>\n<td>4.32</td>\n<td><strong>4.44</strong></td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 <strong>关键发现</strong>：DFM 在 10% 数据下相比 AR 提升 +1.50，相比 DD 提升 +0.37，表明离散流匹配在低数据场景下具有显著的数据效率优势。</div>",
      "quiz": {
        "q": "DFM-VLA 相比传统自回归（AR）动作解码的核心优势是什么？",
        "options": [
          "使用更大的模型参数量提升表达能力",
          "通过离散流匹配实现动作token的迭代细化，避免不可逆承诺导致的误差累积",
          "采用连续扩散过程在连续动作空间中去噪",
          "通过增加训练数据量来提升泛化性能"
        ],
        "answer": 1,
        "explain": "DFM-VLA的核心创新在于用离散流匹配替代AR的逐token生成，允许所有动作token在多步迭代中同时被细化和修正，从而避免了AR中早期token错误不可逆传播的问题。"
      }
    },
    {
      "id": "pangu_embodied",
      "num": 23,
      "name": "盘古具身智能",
      "fullName": "盘古具身智能大模型 (Pangu-Embodied)",
      "year": "2026.03",
      "org": "华为",
      "parent": "code_as_policies",
      "paperUrl": "https://www.huawei.com/cn/news/2026/3/huawei-full-stack-tech-2026",
      "projectUrl": "",
      "category": "llm_planning",
      "motivation": "10步+长程规划星闪纳秒级同步",
      "summary": "盘古具身智能 的核心目标是：10步+长程规划星闪纳秒级同步。",
      "keyPoints": [
        "核心动机：10步+长程规划星闪纳秒级同步",
        "演化来源：继承或改进自 code_as_policies",
        "代表机构：华为"
      ],
      "detail": "<p>10步+长程规划星闪纳秒级同步</p>"
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
      "summary": "Gemini Robotics-ER 的核心目标是：具身推理与Agentic Vision工业安全。",
      "keyPoints": [
        "核心动机：具身推理与Agentic Vision工业安全",
        "演化来源：继承或改进自 rt2",
        "代表机构：Google DeepMind"
      ],
      "detail": "<p>具身推理与Agentic Vision工业安全</p>"
    },
    {
      "id": "univla",
      "num": 25,
      "name": "UniVLA",
      "fullName": "统一视觉语言动作 (UniVLA)",
      "year": "2026.04",
      "org": "ICLR 2026",
      "parent": "openvla",
      "paperUrl": "https://openreview.net/forum?id=UniVLA_Paper_ID",
      "projectUrl": "",
      "category": "vlm_finetune",
      "motivation": "原生多模态统一Token化达95.5%",
      "summary": "UniVLA 的核心目标是：原生多模态统一Token化达95.5%。",
      "keyPoints": [
        "核心动机：原生多模态统一Token化达95.5%",
        "演化来源：继承或改进自 openvla",
        "代表机构：ICLR 2026"
      ],
      "detail": "<p>原生多模态统一Token化达95.5%</p>"
    },
    {
      "id": "hy_embodied",
      "num": 26,
      "name": "HY-Embodied",
      "fullName": "腾讯混元具身 (HY-Embodied-0.5)",
      "year": "2026.04",
      "org": "腾讯",
      "parent": "univla",
      "paperUrl": "https://arxiv.org/abs/2604.07430v1",
      "projectUrl": "",
      "category": "vlm_finetune",
      "motivation": "MoT架构解耦视觉语言22项领先",
      "summary": "HY-Embodied 的核心目标是：MoT架构解耦视觉语言22项领先。",
      "keyPoints": [
        "核心动机：MoT架构解耦视觉语言22项领先",
        "演化来源：继承或改进自 univla",
        "代表机构：腾讯"
      ],
      "detail": "<p>MoT架构解耦视觉语言22项领先</p>"
    },
    {
      "id": "neurovla",
      "num": 27,
      "name": "NeuroVLA",
      "fullName": "类脑VLA (NeuroVLA)",
      "year": "2026.04",
      "org": "智平方",
      "parent": "hpt",
      "paperUrl": "https://www.leiphone.com/category/ai/VLA-NeuroVLA-GuoYandong.html",
      "projectUrl": "",
      "category": "transformer_policy",
      "motivation": "类脑架构0.4W功耗20ms生存本能",
      "summary": "NeuroVLA 将皮层、小脑、脊髓三层生物运动控制分工映射到 VLA 体系中：高层 VLM 负责语义意图，小脑样模块负责状态调制与阻尼补偿，脊髓样脉冲网络负责高速执行与反射控制，从而在极低功耗下实现更平滑、更安全的具身控制。",
      "keyPoints": [
        "<strong>三层类脑架构</strong>：Cortical 负责语义规划，Cerebellar 负责状态调制与误差补偿，Spinal 负责脉冲式高频执行",
        "<strong>小脑样 FiLM 调制</strong>：利用 GRU 编码本体感觉历史，生成增益与偏移参数，对高层语义 latent 做动态仿射调制",
        "<strong>迭代精炼机制</strong>：通过类似 efference copy 的内部循环，在执行前先进行物理状态预测和动作补偿",
        "<strong>脉冲神经网络执行层</strong>：采用 LIF 神经元和 Spiking ResNet，在神经形态芯片上实现低功耗、高频率执行",
        "<strong>安全反射能力</strong>：碰撞触发下可在 20ms 量级内走反射回路，不必等待高层 VLM 完成完整推理",
        "<strong>节能与平滑性</strong>：在低功耗条件下抑制高频抖动，呈现出更接近生物运动系统的平滑轨迹与稀疏激活特性"
      ],
      "detail": "<h5>三层控制分解</h5>\n<p>NeuroVLA 把具身控制形式化为三层组合映射：</p>\n<p>$$\na_t = \\Phi_{\\text{spine}}\\big(\\Phi_{\\text{cerebellum}}(\\Phi_{\\text{cortex}}(I_t, L), h_t)\\big)\n$$</p>\n<p>其中：\n- <strong>Cortex</strong>：从视觉与语言中提取语义意图\n- <strong>Cerebellum</strong>：根据本体感觉历史 \\(h_t\\) 做状态调制和误差补偿\n- <strong>Spine</strong>：以脉冲网络形式执行高频动作并负责快速反射</p>\n<p>这种分层设计的关键不是“更复杂”，而是把不同时间尺度的计算分开处理。</p>\n<h5>Cerebellar 模块：把语义计划变成可执行动作</h5>\n<p>论文中最有价值的创新是小脑样模块。它先用 GRU 编码关节位置、速度、力矩和力觉等历史状态，再通过门控 FiLM 生成调制参数，对高层语义 latent 做仿射调制：</p>\n<p>$$\nz_{\\text{mod}} = (1 + \\gamma_t)\\cdot(z_{\\text{sem}}\\cdot g_t) + \\beta_t\n$$</p>\n<p>这个过程相当于让系统在执行前先根据当前身体状态修正“计划中的动作”，例如在接触、摩擦、重力扰动存在时自动增加阻尼或重写局部运动趋势。</p>\n<h5>脉冲网络与反射控制</h5>\n<p>执行层采用 stateful LIF 神经元，膜电位在时间上持续积累与衰减，因此即便不显式引入 LSTM，也会自然携带短时记忆。<br />\n在此基础上，Spiking ResNet 保留了深层网络的表达能力，同时维持脉冲激活的稀疏性。</p>\n<p>这使 NeuroVLA 在两个方向上与传统 VLA 拉开差异：\n- <strong>能耗更低</strong>：神经形态芯片层只需极低功耗\n- <strong>反射更快</strong>：危险接触可直接走脊髓样反射回路，而不是等待完整大模型推理</p>\n<p>从 VLA 发展脉络看，NeuroVLA 代表的是一种“不是继续堆更大模型，而是重构控制体系本身”的路线。</p>"
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
      "summary": "π0.7 通过**多模态提示扩展（Diverse Prompting）**——在训练时向 VLA 模型注入子任务语言、子目标图像和 episode 元数据——使单一 5B 参数的 flow-matching 策略在无需微调的情况下实现组合泛化、跨机器人本体零样本迁移和灵活的语言指令跟随，性能匹配甚至超越针对单任务微调的 RL 专家策略。",
      "keyPoints": [
        "<strong>架构</strong>：5B 参数 = 4B VLM 骨干（Gemma 3 4B + 400M SigLIP 视觉编码器）+ 860M flow-matching 动作专家，采用 block-causal 注意力掩码和知识隔离（Knowledge Insulation）训练",
        "<strong>多模态上下文 \\(C_t\\)</strong>：包含任务语言 \\(\\ell_t\\)、子任务语言 \\(\\hat{\\ell}_t\\)、最多 3 张子目标图像 \\(g_t\\)、episode 元数据（质量 1-5、速度、错误标记、控制模式）",
        "<strong>MEM 视频历史编码器</strong>：4 个相机 × 6 帧历史观测，压缩为固定长度 token 序列，支持长时记忆任务",
        "<strong>子目标图像生成</strong>：集成 BAGEL 世界模型生成视觉子目标，为跨本体迁移提供视觉类比",
        "<strong>训练策略</strong>：flow-matching 目标 + 知识隔离（VLM 用 FAST token 交叉熵训练，动作专家梯度不回传 VLM）+ 系统性 dropout（子目标 25%、子任务 30%、元数据 15%）",
        "<strong>混合数据学习</strong>：融合人类演示、RL 自主评估数据、人类视频和 web 数据，通过元数据消歧不同质量的数据",
        "<strong>涌现能力</strong>：组合泛化（新任务×新场景×新物体）、跨本体零样本迁移（自动发现适配目标形态的操作策略）、语言 coaching 学习新任务、速度/质量可控"
      ],
      "detail": "<h5>核心架构示意图</h5>\n<p><img alt=\"π0.7 架构总览\" src=\"https://ar5iv.labs.arxiv.org/html/2604.15483v2/assets/x3.png\" />\n<em>图：π0.7 模型架构。左侧为 VLM 骨干处理多模态上下文（语言、视觉历史、子目标图像、元数据），右侧为 flow-matching 动作专家通过 block-causal 注意力读取 VLM 表征并生成连续动作轨迹。知识隔离确保动作专家梯度不回传至 VLM。</em></p>\n<p><img alt=\"多模态提示组成\" src=\"https://ar5iv.labs.arxiv.org/html/2604.15483v2/assets/x5.png\" />\n<em>图：π0.7 的多模态上下文 \\(C_t\\) 组成，包括任务/子任务语言指令、子目标图像和 episode 元数据，训练时通过系统性 dropout 确保推理时各组件可选。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># π0.7 训练流程伪代码\n# 架构: VLM (4B Gemma3) + ActionExpert (860M flow-matching)\n\nfor batch in dataset:\n    # === 1. 构建多模态上下文 C_t ===\n    obs_history = MEM_encode(cameras[0:4], frames[t-5:t+1])  # 4cam × 6frames → fixed tokens\n    task_lang = tokenize(task_instruction)                      # 任务语言 ℓ_t\n\n    # 系统性 dropout\n    if random() &lt; 0.75:\n        subtask_lang = tokenize(subtask_instruction)            # 子任务语言 ℓ̂_t\n    if random() &lt; 0.75:\n        subgoal_imgs = encode_images(goal_images[:3])           # 最多3张子目标图像\n        if subgoal_present and random() &lt; 0.30:\n            subtask_lang = None                                 # 子目标存在时额外 drop 子任务\n    if random() &lt; 0.85:\n        metadata = encode_metadata(quality, speed, mistake, ctrl_mode)\n\n    C_t = concat(task_lang, subtask_lang, subgoal_imgs, metadata, obs_history)\n\n    # === 2. VLM 前向 (知识隔离) ===\n    vlm_tokens = VLM.forward(C_t)                              # Gemma3 处理多模态输入\n    fast_loss = cross_entropy(vlm_tokens, FAST_action_tokens)  # VLM 用 FAST token 训练\n\n    # === 3. 动作专家前向 (flow-matching) ===\n    t_flow = uniform(0, 1)                                     # 采样 flow 时间步\n    noise = randn_like(action_chunk)                           # a_{t:t+H}\n    x_t = (1 - t_flow) * noise + t_flow * action_chunk        # 线性插值\n\n    with stop_gradient(vlm_tokens):                            # 知识隔离: 梯度不回传 VLM\n        v_pred = ActionExpert(x_t, t_flow, vlm_tokens)        # 预测速度场\n        # ActionExpert 使用 adaptive RMSNorm 注入 t_flow\n        # Block-causal attention: expert tokens attend to VLM tokens\n\n    flow_loss = MSE(v_pred, action_chunk - noise)              # flow-matching 损失\n\n    # === 4. 联合优化 ===\n    total_loss = fast_loss + flow_loss\n    optimizer.step(total_loss)\n\n# === 推理 (RTC: Rotation-Then-Chunking) ===\ndef inference(obs, context, num_denoise_steps=10):\n    C_t = build_context(obs, context, metadata={&quot;quality&quot;: 5, &quot;speed&quot;: &quot;fast&quot;})\n    vlm_tokens = VLM.forward(C_t)\n    x_0 = randn(action_dim * horizon)                         # 50 action tokens\n    for k in range(num_denoise_steps):\n        t_k = k / num_denoise_steps\n        v = ActionExpert(x_0, t_k, vlm_tokens)\n        x_0 = x_0 + v * (1 / num_denoise_steps)              # Euler 积分\n    # RTC: 旋转拼接多次预测实现平滑轨迹\n    return x_0\n</code></pre>\n<h5>方法细节</h5>\n<p><strong>1. 动机与背景</strong></p>\n<p>先前的机器人基础模型（如 π0、RT-2、Octo）面临一个根本矛盾：要在大量任务上表现良好，需要海量高质量数据；但收集每个新任务的专用数据成本极高。这些模型通常只能在训练分布内的任务上工作，缺乏<strong>组合泛化</strong>能力——即将已学会的技能重新组合以解决从未见过的任务。</p>\n<p>传统方法的核心缺陷在于：(1) 训练数据中的行为质量参差不齐，但模型无法区分高质量和低质量演示；(2) 模型缺乏足够的上下文信息来理解当前应该执行什么子任务；(3) 不同机器人本体之间的形态差异使得跨本体迁移极为困难。</p>\n<p>π0.7 的核心洞察是：通过在训练时提供<strong>丰富的多模态上下文</strong>（语言子任务、视觉子目标、质量元数据），模型可以学会根据上下文调节行为模式，从而在推理时通过组合不同的上下文实现泛化。</p>\n<p><strong>2. 核心机制：多模态提示扩展（Diverse Prompting）</strong></p>\n<p>π0.7 的训练目标为最大化条件对数似然：</p>\n<p>$$\\max_\\theta \\; \\mathbb{E}_{\\mathcal{D}} \\left[ \\log \\pi_\\theta \\left( a_{t:t+H} \\mid o_{t-T:t}, C_t \\right) \\right]$$</p>\n<p>其中 \\(a_{t:t+H}\\) 是未来 \\(H\\) 步的动作块，\\(o_{t-T:t}\\) 是过去 \\(T\\) 帧的观测历史，\\(C_t\\) 是多模态上下文。关键创新在于 \\(C_t\\) 的设计：</p>\n<p>$$C_t = \\left( \\ell_t, \\; \\hat{\\ell}_t, \\; g_t, \\; m_t \\right)$$</p>\n<ul>\n<li><strong>任务语言 \\(\\ell_t\\)</strong>：高层任务描述（如\"折叠T恤\"）</li>\n<li><strong>子任务语言 \\(\\hat{\\ell}_t\\)</strong>：当前步骤的细粒度指令（如\"用左手抓住衣领\"），来源于人类标注或高层策略</li>\n<li><strong>子目标图像 \\(g_t\\)</strong>：最多 3 张未来状态的视觉预期，来源于：25% 为片段末帧 + 75% 为均匀采样未来 0-4 秒的帧 + 世界模型（BAGEL）生成</li>\n<li><strong>元数据 \\(m_t\\)</strong>：episode 级别的质量评分（1-5）、执行速度、是否包含错误、控制模式（关节/末端执行器）</li>\n</ul>\n<div class=\"key-point\">💡 <strong>关键</strong>：训练时通过系统性 dropout（子目标 25% 的 batch 丢弃、子任务在子目标存在时额外 30% 丢弃、元数据 15% 丢弃）确保模型在推理时可以灵活使用任意子集的上下文。这使得同一个模型既可以在无额外提示时自主执行，也可以在有详细 coaching 时精确跟随指令。</div>\n<p><strong>3. 架构设计：VLM + Flow-Matching Action Expert</strong></p>\n<p>π0.7 采用双塔架构，总计约 5B 参数：</p>\n<ul>\n<li><strong>VLM 骨干（~4B）</strong>：基于 Gemma 3 4B 语言模型 + 400M SigLIP 视觉编码器。处理所有多模态输入（语言、图像、元数据），输出统一的 token 表征。</li>\n<li><strong>Flow-Matching 动作专家（~860M）</strong>：专门的 Transformer 模块，通过 block-causal 注意力读取 VLM 的输出表征，生成 50 个连续动作 token。使用 <strong>adaptive RMSNorm</strong> 注入 flow 时间步 \\(\\sigma\\)，避免额外的时间步嵌入层。</li>\n</ul>\n<p><strong>知识隔离（Knowledge Insulation, KI）</strong>是关键训练技巧：</p>\n<p>$$\\mathcal{L}_{\\text{total}} = \\mathcal{L}_{\\text{FAST}}^{\\text{VLM}} + \\mathcal{L}_{\\text{flow}}^{\\text{expert}}$$</p>\n<p>其中 VLM 使用 FAST token 的交叉熵损失训练，动作专家使用 flow-matching 损失训练，但<strong>动作专家的梯度通过 stop-gradient 不回传至 VLM</strong>。这防止了连续动作回归的梯度破坏 VLM 预训练的语言/视觉理解能力。</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：知识隔离是 π0.7 能够保持强大语言理解能力的关键。没有它，flow-matching 的连续回归梯度会\"污染\"VLM 的离散 token 表征空间，导致语言跟随能力退化。</div>\n<p><strong>MEM 视频历史编码器</strong>将 4 个相机 × 6 帧历史（共 24 张图像）压缩为固定长度的 token 序列，使模型能够高效处理视频历史而不会因 token 数量爆炸导致计算瓶颈。</p>\n<p><strong>4. Flow-Matching 动作生成</strong></p>\n<p>动作专家使用 flow-matching 框架生成连续动作轨迹。给定噪声样本 \\(x_0 \\sim \\mathcal{N}(0, I)\\) 和目标动作 \\(x_1 = a_{t:t+H}\\)，训练时构造线性插值：</p>\n<p>$$x_\\sigma = (1 - \\sigma) x_0 + \\sigma x_1, \\quad \\sigma \\sim \\mathcal{U}(0, 1)$$</p>\n<p>模型学习预测速度场 \\(v_\\theta(x_\\sigma, \\sigma, z)\\)（其中 \\(z\\) 是 VLM 输出的表征），训练损失为：</p>\n<p>$$\\mathcal{L}_{\\text{flow}} = \\mathbb{E}_{\\sigma, x_0, x_1} \\left\\| v_\\theta(x_\\sigma, \\sigma, z) - (x_1 - x_0) \\right\\|^2$$</p>\n<p>推理时通过 Euler 积分从噪声逐步去噪得到动作轨迹。<strong>RTC（Rotation-Then-Chunking）</strong>机制通过旋转拼接多次预测的动作块，实现平滑的轨迹过渡。</p>\n<p><strong>5. 跨本体迁移与涌现策略</strong></p>\n<p>π0.7 展现出令人惊讶的跨本体迁移能力。在折叠任务中，训练数据全部来自小型双臂机器人，但模型能够零样本迁移到形态差异显著的 UR5e 双臂平台：</p>\n<ul>\n<li>在源机器人上，操作员倾斜末端执行器将织物压在桌面上再抬起</li>\n<li>在目标 UR5e 上，π0.7 <strong>自动发现</strong>了垂直抓取策略，更适合大型机械臂的运动学特性</li>\n</ul>\n<p>这种涌现的策略适配不是简单的动作复制，而是模型理解了任务语义后根据目标本体的物理约束重新规划操作方式。世界模型生成的子目标图像进一步增强了这种迁移，因为它能为目标本体构造合理的视觉类比。</p>\n<p><strong>6. 数据可扩展性与元数据消歧</strong></p>\n<p>在洗衣折叠任务的消融实验中，将数据按质量和速度分为 4 个桶（top 30%、50%、80%、100%）：</p>\n<ul>\n<li><strong>无元数据</strong>的模型在加入低质量数据后性能反而下降</li>\n<li><strong>有元数据</strong>的模型随数据量增加持续提升，即使新增数据质量更低</li>\n</ul>\n<p>$$\\text{Performance}(\\text{w/ metadata}) \\uparrow \\quad \\text{as} \\quad |\\mathcal{D}| \\uparrow, \\quad \\text{even if avg quality} \\downarrow$$</p>\n<p>这证明元数据有效消歧了不同质量的行为模式，使模型能够从混合质量数据中学习，在推理时通过设置 <code>quality=5</code> 选择最优行为模式。</p>\n<p><strong>7. 与先前方法的对比</strong></p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>π0</th>\n<th>π0.5/π0.6</th>\n<th>π0.7</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>语言跟随</td>\n<td>弱</td>\n<td>中等</td>\n<td>强（开放词汇）</td>\n</tr>\n<tr>\n<td>跨本体迁移</td>\n<td>无</td>\n<td>有限</td>\n<td>零样本 + 策略适配</td>\n</tr>\n<tr>\n<td>数据质量处理</td>\n<td>需过滤</td>\n<td>需过滤</td>\n<td>元数据消歧，混合质量可用</td>\n</tr>\n<tr>\n<td>子目标条件</td>\n<td>无</td>\n<td>无</td>\n<td>世界模型生成</td>\n</tr>\n<tr>\n<td>组合泛化</td>\n<td>无</td>\n<td>有限</td>\n<td>新任务×新场景×新物体</td>\n</tr>\n<tr>\n<td>新任务学习</td>\n<td>需数据收集</td>\n<td>需微调</td>\n<td>语言 coaching → 自主策略</td>\n</tr>\n</tbody>\n</table></div>",
      "quiz": {
        "q": "π0.7 中知识隔离（Knowledge Insulation）的核心作用是什么？",
        "options": [
          "加速 flow-matching 动作专家的收敛速度",
          "防止 flow-matching 连续回归梯度破坏 VLM 预训练的语言/视觉理解能力",
          "减少 VLM 骨干的参数量以提高推理效率",
          "使动作专家能够独立于 VLM 进行预训练"
        ],
        "answer": 1,
        "explain": "知识隔离通过 stop-gradient 阻止动作专家的 flow-matching 损失梯度回传至 VLM，防止连续回归信号破坏 VLM 在大规模预训练中获得的离散 token 表征能力，从而保持强大的语言理解和指令跟随能力。"
      }
    },
    {
      "id": "openvla2",
      "num": 29,
      "name": "OpenVLA 2",
      "fullName": "开源VLA第二代 (OpenVLA 2)",
      "year": "2026.05",
      "org": "OpenVLA Consortium",
      "parent": "openvla",
      "paperUrl": "https://robotwale.com/openvla-2-released-with-improved-generalisation/",
      "projectUrl": "",
      "category": "vlm_finetune",
      "motivation": "自适应推理模块多机协作泛化提升30%",
      "summary": "OpenVLA 2 的核心目标是：自适应推理模块多机协作泛化提升30%。",
      "keyPoints": [
        "核心动机：自适应推理模块多机协作泛化提升30%",
        "演化来源：继承或改进自 openvla",
        "代表机构：OpenVLA Consortium"
      ],
      "detail": "<p>自适应推理模块多机协作泛化提升30%</p>"
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
      "detail": "<h5>动机与背景</h5>\n<p>传统 VLA 模型面临\"死记硬背\"困境：模型直接映射感知到动作，缺乏内在推理过程。虽然 Chain-of-Thought（CoT）在 LLM 中取得了巨大成功，但将其应用于机器人存在两大障碍：</p>\n<ol>\n<li><strong>语言 CoT 的时延瓶颈</strong>：显式文本推理增加 2-5 秒延迟，对实时控制不可接受</li>\n<li><strong>RL 优化断裂</strong>：文本推理与动作执行无法通过 RL 进行端到端联合优化</li>\n</ol>\n<p>LaST-R1 的核心洞察：<strong>推理不一定需要显式语言，可以在压缩的隐式空间中进行</strong>——这既保留了推理深度，又解决了延迟和优化问题。</p>\n<h5>Last0* 架构</h5>\n<p><img alt=\"LaST-R1 架构总览图\" src=\"https://ar5iv.labs.arxiv.org/html/2604.28192/assets/x1.png\" />\n<em>图：LaST-R1 整体架构——视觉输入经 DINOv3 提取 top-k latent tokens，与 visual/text tokens 拼接后输入 LLM 进行 latent reasoning，最后 action decoder 输出动作块</em></p>\n<p>模型基于 Qwen3-VL-4B 构建，核心架构如下：</p>\n<p><strong>输入处理</strong>：\n- 视觉输入经 vision encoder 提取 N_v 个 visual tokens\n- 额外使用预训练 DINOv3 模型提取 top-k 隐式视觉总结 token（离线计算，无额外训练成本）\n- 文本指令 token 化后与 visual tokens、latent summary tokens 拼接</p>\n<p><strong>消融实验验证</strong>（Table 1）：\n- DINOv3 top-k 方法在 LIBERO-Spatial 上达 97.2%，显著优于 Global Pooling（93.5%）、Convolutional Downsampling（94.8%）、Q-Former（95.1%）\n- 隐式 token 长度从 1→8，性能单调提升至 97.2%（长度 1 时仅 93.8%）</p>\n<p><strong>Hybrid Attention Mask 设计</strong>（Figure 6）：\n- Vision + Text + Latent tokens：使用 causal lower-triangular mask（自回归生成）\n- <code>&lt;latent_end&gt;</code> 后 action tokens：使用 bidirectional mask，允许 chunk 内所有 action token 互相 attend\n- 该设计实现了\"推理串行、执行并行\"的效率平衡</p>\n<h5>Latent-Action Policy Optimization (LAPO)</h5>\n<p>LAPO 是首个将隐式推理空间纳入 RL 优化的框架，其总损失函数为：</p>\n<p>$$\\mathcal{L}_{LAPO}(\\theta) = \\mathcal{L}_{action}(\\theta) + \\lambda_1 \\mathcal{L}_{latent}(\\theta) + \\lambda_2 \\mathcal{L}_{value}(\\theta)$$</p>\n<p><strong>1. Action Loss（动作损失）</strong>：\n基于 PPO-clip 目标，对 action tokens 计算 standard policy gradient：</p>\n<p>$$\\mathcal{L}_{action} = -\\min(r_t(\\theta) \\hat{A}_t, \\text{clip}(r_t(\\theta), 1-\\epsilon_{\\min}, 1+\\epsilon_{\\max}) \\hat{A}_t)$$</p>\n<p>其中 ratio \\(r_t(\\theta)\\) 按序列级别计算，\\(\\epsilon_{\\min}=0.2, \\epsilon_{\\max}=0.28\\) 为非对称裁剪。</p>\n<p><strong>2. Latent Loss（隐式损失）</strong>：\n对 latent reasoning tokens 采用特殊处理：</p>\n<ul>\n<li><strong>Importance Sampling</strong>：由于隐式 token 不可直接监督，利用 SFT warm-up 期间计算的 offline DINOv3 GT latent 作为锚点</li>\n<li><strong>序列级 ratio</strong>：与 action loss 共享同一序列级 ratio（\\(r_t(\\theta)\\)），保持优化一致性</li>\n<li><strong>Token 级 mask</strong>：仅对 latent token 位置施加损失</li>\n</ul>\n<p>$$\\mathcal{L}_{latent} = -r_t(\\theta) \\hat{A}_t \\cdot \\mathbf{1}_{\\text{latent\\_position}} \\cdot \\cos\\_\\text{sim}(z_{pred}, z_{gt})$$</p>\n<p><strong>3. Value Loss（价值损失）</strong>：\n标准 MSE 损失，用于 GAE 优势估计（\\(\\gamma=0.99, \\lambda=0.95\\)）。</p>\n<p><strong>超参数消融</strong>（Figure 7）：\n- \\(\\lambda_1=0.1\\) 最佳（99.8%），\\(\\lambda_1=0\\) 降至 97.2%，\\(\\lambda_1=1\\) 降至 99.0%\n- \\(\\lambda_2=1\\) 最佳（99.8%），\\(\\lambda_2=0.1\\) 降至 97.8%\n- \\(\\lambda_3=0.1\\)（transition penalty）最佳，增至 2 降至 98.6%</p>\n<h5>Adaptive Latent CoT</h5>\n<p>传统方法固定插值长度，无法适配不同任务复杂度。LaST-R1 提出了自适应推理长度机制：</p>\n<ul>\n<li>设置最大长度 \\(L_{max}=8\\)，候选终止位置数 \\(M=4\\)</li>\n<li>在每个候选位置以概率 \\(p(m) \\propto \\exp(-\\beta \\cdot m)\\) 采样 <code>&lt;latent_end&gt;</code> token</li>\n<li>温度 \\(\\beta\\) 控制探索：\\(\\beta\\) 大 → 偏向短推理（exploitation），\\(\\beta\\) 小 → 偏向长推理（exploration）</li>\n</ul>\n<p><strong>优化目标</strong>包含 transition loss \\(\\mathcal{L}_{end}\\)：</p>\n<p>$$\\mathcal{L}_{total} = \\mathcal{L}_{action} + \\lambda_1 \\mathcal{L}_{latent} + \\lambda_2 \\mathcal{L}_{value} + \\lambda_3 \\mathcal{L}_{end}$$</p>\n<p>实验结果（Figure 8）：RL 后模型自动学习到早期退出策略——简单任务用 2-4 步推理，复杂任务保留更长推理。</p>\n<h5>训练流程</h5>\n<p><strong>第一阶段：SFT Warm-up</strong>\n- 预训练数据：400K 轨迹（28M 帧），含 Open-X-Embodiment、DROID、ManiSkill 等\n- 使用 Qwen3-VL-4B 预训练权重初始化\n- 扩展 tokenizer 词表：新增 256 个 action tokens（<code>&lt;action_i&gt;</code>，\\(i \\in [0,255]\\)）+ <code>&lt;latent_end&gt;</code> token\n- 联合优化：cosine similarity loss（latent 对齐）+ CE loss（<code>&lt;latent_end&gt;</code> + action tokens），权重比 1:0.1:1\n- LIBERO：每任务仅 1 条专家轨迹，训练 10K iterations\n- 真实世界：每任务 20 条轨迹，训练 1K iterations</p>\n<p><strong>第二阶段：LAPO RL 在线训练</strong>\n- LIBERO：8×H20 GPU，verl+FSDP，每次 rollout 512 条轨迹，4 PPO epochs，学习率 \\(3\\times10^{-5}\\)（actor）/ \\(3\\times10^{-4}\\)（value head）\n- 真实世界：Franka Research 3 机器人 + 2×RTX 4090，连续异步 actor-learner 架构，仅更新 LoRA（r=32），冻结基座模型\n- 真实世界奖励：任务成功 +10，步惩罚 -0.05</p>\n<h5>关键实验发现</h5>\n<ol>\n<li><strong>LIBERO SOTA</strong>（Table 1）：LaST-R1 四套件平均 99.8%，超过所有对比方法</li>\n<li><strong>消融 M=4</strong> 最佳，M=1（固定长度）降至 97.5%</li>\n<li><strong>执行效率</strong>（Figure 9）：RL 后模型执行步数甚至优于 expert demonstrations</li>\n<li><strong>OOD 泛化</strong>（Figure 10）：Action-Only PPO overfitting 严重（20-30%），LaST-R1 持续提升至 54-100%</li>\n</ol>",
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
