/**
 * vla-data.js — 由 pipeline/build.py 于 2026-05-13 14:56:44 自动生成。
 * 源文件：content/embodied/vla.md
 * ⚠️  请勿手动修改；如需更新，修改源文档后重新编译。
 */
window.PAGE_CONFIG = {
  "meta": {
    "domain": "embodied",
    "topic_id": "vla",
    "topic_name": "视觉-语言-动作基础模型",
    "page_title": "视觉-语言-动作 (VLA) 基础模型算法总结",
    "page_subtitle": "2026-05-13 版",
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
      "summary": "BC-Z 提出了一种大规模多任务行为克隆系统，通过在 100 个操作任务（25,877 条演示）上训练语言/视频条件化策略，实现了对 29 个从未见过的任务的零样本泛化（语言条件下 24 个任务成功率非零，平均 44%），证明了简单的模仿学习方法在足够规模下可以获得任务级别的泛化能力。",
      "keyPoints": [
        "<strong>大规模多任务数据集</strong>：100 个操作任务、25,877 条真机演示，使用 HG-DAgger（共享自主）高效采集数据",
        "<strong>双模态任务条件化</strong>：支持自然语言指令和人类视频两种任务指定方式，统一映射到 512 维任务嵌入空间",
        "<strong>语言编码器</strong>：冻结的预训练 Universal Sentence Encoder (USE)，无需额外训练即可提供语义丰富的任务表征",
        "<strong>视频编码器</strong>：ResNet18 处理人类演示视频，通过语言回归辅助损失（cosine loss）对齐到语言嵌入空间",
        "<strong>FiLM 条件化架构</strong>：任务嵌入通过 FiLM 层注入 ResNet18 视觉编码器的每个残差块，实现任务感知的视觉特征提取",
        "<strong>自适应状态差分动作</strong>：将动作定义为到未来 \\(N>1\\) 步目标姿态的状态差分，避免 10Hz 控制下的微小动作和抖动问题",
        "<strong>开环轨迹辅助预测</strong>：策略额外预测未来 10 步开环轨迹作为辅助训练目标，推理时仅执行第一步（闭环）",
        "<strong>零样本泛化</strong>：语言条件下对 29 个未见任务中 24 个实现非零成功率，平均 44%；视频条件下泛化更困难（9 个任务非零，平均 4%）"
      ],
      "detail": "<h5>系统架构</h5>\n<p><img alt=\"BC-Z 网络架构\" src=\"https://ar5iv.labs.arxiv.org/html/2202.02005v1/assets/x3.png\" />\n<em>图：BC-Z 网络架构。单目 RGB 图像经 ResNet18 编码，通过 FiLM 层接收任务嵌入 \\(z\\) 的条件化，最后经多头 MLP 预测各动作分量（delta XYZ、delta 轴角、夹爪角度）。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># BC-Z 训练流程伪代码\n# 1. 数据采集（HG-DAgger 共享自主）\nfor round in range(num_rounds):\n    deploy policy π with human supervisor\n    human takes over when robot deviates  # 干预数据\n    collect (s, a, task_id) into dataset D\n\n# 2. 任务嵌入编码\nz_lang = USE(language_command)           # 冻结，512-dim\nz_video = ResNet18_video(human_video)    # 可训练，512-dim\n\n# 3. 策略训练\nfor batch in dataloader(D):\n    s, a, task_id = batch\n    z = sample_task_embedding(task_id)   # 随机选语言或视频嵌入\n\n    # FiLM 条件化视觉编码\n    features = ResNet18_policy(image=s, film_conditioning=z)\n\n    # 多头动作预测\n    pred_xyz = MLP_xyz(features)         # delta XYZ\n    pred_rot = MLP_rot(features)         # delta axis-angle\n    pred_grip = MLP_grip(features)       # gripper angle\n\n    # 行为克隆损失\n    L_bc = HuberLoss(pred_xyz, a_xyz) + HuberLoss(pred_rot, a_rot) \\\n         + LogLoss(pred_grip, a_grip)\n\n    # 语言回归辅助损失（对齐视频嵌入到语言空间）\n    L_lang = CosineLoss(z_video, z_lang)\n\n    # 总损失\n    loss = L_bc + L_lang\n    loss.backward()\n    optimizer.step()\n</code></pre>\n<h5>动机与背景</h5>\n<p>传统的模仿学习方法通常针对单一任务训练，每个新任务都需要从头采集大量演示数据。这种范式在面对开放世界的多样化任务需求时，数据效率极低。BC-Z 的核心问题是：<strong>能否通过在大量任务上训练一个统一的策略，使其具备对从未见过的任务的零样本泛化能力？</strong></p>\n<p>此前的工作主要集中在少样本（few-shot）设置下，通过元学习等方法从少量演示中快速适应新任务。但这些方法仍需要新任务的机器人演示数据。BC-Z 探索了一个更激进的设定：<strong>完全不需要新任务的任何机器人数据</strong>，仅通过自然语言描述或人类视频即可执行新任务。</p>\n<h5>数据采集：HG-DAgger 共享自主</h5>\n<p>BC-Z 采用 HG-DAgger（Human-Gated DAgger）方法高效采集数据。与传统的纯遥操作演示不同，HG-DAgger 让策略自主执行任务，人类操作员仅在策略偏离时接管控制：</p>\n<p>$$\\mathcal{D} = \\mathcal{D}_{\\text{expert}} \\cup \\mathcal{D}_{\\text{DAgger}}$$</p>\n<div class=\"key-point\">💡 <strong>关键优势</strong>：HG-DAgger 相比纯人工演示，在相同数据量下将任务成功率从 27% 提升至 53%（Table 4），因为干预数据天然覆盖了策略容易犯错的状态分布。</div>\n<p>具体流程：7 台 Everyday Robots 机器人并行采集，每台配备头部单目 RGB 摄像头，操作员通过 6-DoF 手柄遥操作 7-DoF 机械臂（控制频率 10Hz）。总计采集 25,877 条演示，覆盖 100 个操作任务。</p>\n<h5>任务嵌入：双模态条件化</h5>\n<p>BC-Z 的任务指定支持两种模态：</p>\n<p><strong>语言条件化</strong>：使用冻结的 Universal Sentence Encoder (USE) 将自然语言指令映射为 512 维嵌入向量。USE 的预训练语义空间天然具备泛化能力——语义相近的指令（如 \"pick up the apple\" 与 \"grasp the fruit\"）在嵌入空间中距离较近。</p>\n<p><strong>视频条件化</strong>：使用可训练的 ResNet18 编码器处理人类演示视频，输出 512 维嵌入。为解决视频嵌入容易过拟合的问题，引入<strong>语言回归辅助损失</strong>：</p>\n<p>$$\\mathcal{L}_{\\text{lang}} = D_{\\cos}(z_h^i, z_\\ell^i)$$</p>\n<p>其中 \\(z_h^i = q(\\cdot | w_h)\\) 是视频嵌入，\\(z_\\ell^i = q(\\cdot | w_\\ell^i)\\) 是对应的语言嵌入。这个辅助损失迫使视频编码器学习与语言空间对齐的语义表征，而非仅记忆视觉细节。</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：实验表明（Table 3），语言条件化远优于视频条件化（held-out 任务：32% vs 4%），说明从视频推断任务意图比从语言推断困难得多。</div>\n<h5>策略网络：FiLM 条件化 + 多头动作预测</h5>\n<p>策略网络的核心设计是通过 <strong>FiLM (Feature-wise Linear Modulation)</strong> 层将任务嵌入注入视觉处理流程：</p>\n<p>$$\\text{FiLM}(x_c) = \\gamma_c(z) \\cdot x_c + \\beta_c(z)$$</p>\n<p>其中 \\(x_c\\) 是 ResNet18 第 \\(c\\) 个通道的特征图，\\(\\gamma_c(z)\\) 和 \\(\\beta_c(z)\\) 是从任务嵌入 \\(z\\) 线性投影得到的通道级缩放和偏移参数。FiLM 层应用于 ResNet18 的全部 4 个残差块，使视觉特征提取过程从底层就受到任务语义的调制。</p>\n<p>ResNet18 的最后一层均值池化后，分支为三个独立的 MLP 动作头（各含 2 个 256 维隐藏层 + ReLU）：\n- <strong>Delta XYZ</strong>：末端执行器的位置增量\n- <strong>Delta 轴角</strong>：末端执行器的姿态增量\n- <strong>夹爪角度</strong>：归一化的夹爪开合度</p>\n<h5>自适应状态差分动作</h5>\n<p>在 10Hz 控制频率下，相邻帧之间的动作差异极小，直接克隆会导致策略学到近乎零的动作并产生抖动。BC-Z 将动作重新定义为<strong>到未来第 \\(N\\) 步目标姿态的状态差分</strong>：</p>\n<p>$$a_t = s_{t+N} - s_t$$</p>\n<p>其中 \\(N > 1\\) 通过自适应算法根据手臂和夹爪的运动幅度动态选择。消融实验表明（Table 4），不使用自适应状态差分（\\(N=1\\)）时成功率从 45% 骤降至 3%。</p>\n<h5>完整训练目标</h5>\n<p>综合行为克隆损失和语言回归辅助损失，BC-Z 的完整训练目标为：</p>\n<p>$$\\min \\sum_{\\text{task } i} \\sum_{(s,a) \\sim \\mathcal{D}_e^i,\\; w_h \\sim \\mathcal{D}_h^i \\cup \\mathcal{D}_e^i} \\underbrace{-\\log \\pi(a|s, z^i)}_{\\text{behavior cloning}} + \\underbrace{D_{\\cos}(z_h^i, z_\\ell^i)}_{\\text{language regression}}$$</p>\n<p>其中行为克隆损失对 XYZ 和轴角使用 Huber loss，对夹爪角度使用 log loss。</p>\n<h5>实验核心发现</h5>\n<p><strong>单任务验证</strong>：在 bin-emptying 任务上达到 3.4 picks/min（人类 6.3），door opening 任务 87% 成功率（holdout 场景 94%）。</p>\n<p><strong>零样本泛化</strong>（Table 2）：\n- 语言条件（1 个干扰物）：38% 平均成功率\n- 语言条件（4-5 个干扰物）：32% 平均成功率\n- 视频条件（4-5 个干扰物）：4% 平均成功率</p>\n<p><strong>瓶颈分析</strong>（Table 3）：训练任务上 one-hot（42%）≈ 语言（40%）&gt;&gt; 视频（24%），说明语言嵌入空间已足够好，性能瓶颈主要在控制层而非编码器。</p>\n<p><strong>关键消融</strong>（Table 4）：\n- 多任务 vs 单任务：52% vs 5%（跨任务数据共享至关重要）\n- HG-DAgger vs 纯演示：53% vs 27%（干预数据显著提升性能）\n- 自适应状态差分 vs 原始动作：45% vs 3%（防止动作抖动）</p>\n<h5>与传统方法的区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th>传统少样本模仿学习</th>\n<th>BC-Z</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>新任务数据需求</td>\n<td>需要少量机器人演示</td>\n<td><strong>零机器人数据</strong></td>\n</tr>\n<tr>\n<td>任务指定方式</td>\n<td>机器人演示视频</td>\n<td>自然语言或人类视频</td>\n</tr>\n<tr>\n<td>泛化机制</td>\n<td>元学习快速适应</td>\n<td>大规模多任务预训练 + 语义嵌入</td>\n</tr>\n<tr>\n<td>训练规模</td>\n<td>通常 &lt; 10 任务</td>\n<td><strong>100 任务，25,877 演示</strong></td>\n</tr>\n<tr>\n<td>核心洞察</td>\n<td>学习如何学习</td>\n<td>足够多样的任务数据 + 好的任务表征 = 泛化</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 <strong>核心启示</strong>：BC-Z 证明了\"简单的模仿学习 + 大规模数据 + 预训练语言嵌入\"这一朴素组合就能实现任务级泛化，无需复杂的元学习或强化学习算法。这一发现为后续的 RT-1、RT-2 等大规模机器人基础模型奠定了重要基础。</div>",
      "quiz": {
        "q": "BC-Z 中语言回归辅助损失的主要作用是什么？",
        "options": [
          "提升语言编码器 USE 的表征质量",
          "将视频编码器的嵌入空间与预训练语言嵌入空间对齐，改善视频条件化的语义泛化",
          "加速行为克隆损失的收敛",
          "使策略网络学习更精确的动作预测"
        ],
        "answer": 1,
        "explain": "语言回归损失通过 cosine distance 约束视频嵌入向语言嵌入对齐，防止视频编码器过拟合到视觉细节，从而学习更具语义组织性的任务表征空间。USE 语言编码器本身是冻结的，不受此损失影响。"
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
      "summary": "CLIPort 的核心目标是：融合CLIP语义与Transporter几何精度。",
      "keyPoints": [
        "核心动机：融合CLIP语义与Transporter几何精度",
        "代表机构：Google/UW"
      ],
      "detail": "<p>融合CLIP语义与Transporter几何精度</p>"
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
      "summary": "Gato 的核心目标是：单一Transformer处理600+多形态任务。",
      "keyPoints": [
        "核心动机：单一Transformer处理600+多形态任务",
        "代表机构：DeepMind"
      ],
      "detail": "<p>单一Transformer处理600+多形态任务</p>"
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
      "summary": "RT-1 的核心目标是：TokenLearner压缩视觉实现3Hz控制。",
      "keyPoints": [
        "核心动机：TokenLearner压缩视觉实现3Hz控制",
        "演化来源：继承或改进自 bc_z",
        "代表机构：Google DeepMind"
      ],
      "detail": "<p>TokenLearner压缩视觉实现3Hz控制</p>"
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
      "summary": "MOO 的核心目标是：VLM提取对象掩码增强开放世界操作。",
      "keyPoints": [
        "核心动机：VLM提取对象掩码增强开放世界操作",
        "演化来源：继承或改进自 palm_e",
        "代表机构：Google"
      ],
      "detail": "<p>VLM提取对象掩码增强开放世界操作</p>"
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
      "summary": "VoxPoser 的核心目标是：LLM生成3D体素价值图零样本操纵。",
      "keyPoints": [
        "核心动机：LLM生成3D体素价值图零样本操纵",
        "演化来源：继承或改进自 cliport",
        "代表机构：Stanford"
      ],
      "detail": "<p>LLM生成3D体素价值图零样本操纵</p>"
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
      "summary": "HPT 的核心目标是：处理不同机器人本体感知差异。",
      "keyPoints": [
        "核心动机：处理不同机器人本体感知差异",
        "演化来源：继承或改进自 rt_x",
        "代表机构：清华/Meta"
      ],
      "detail": "<p>处理不同机器人本体感知差异</p>"
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
      "summary": "OpenVLA 的核心目标是：双视觉特征7B超越55B RT-2-X。",
      "keyPoints": [
        "核心动机：双视觉特征7B超越55B RT-2-X",
        "演化来源：继承或改进自 rt2",
        "代表机构：Stanford/UCB"
      ],
      "detail": "<p>双视觉特征7B超越55B RT-2-X</p>"
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
      "summary": "GR-1/GR-2 的核心目标是：人形机器人端到端全身控制。",
      "keyPoints": [
        "核心动机：人形机器人端到端全身控制",
        "演化来源：继承或改进自 rt_x",
        "代表机构：Fourier"
      ],
      "detail": "<p>人形机器人端到端全身控制</p>"
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
      "summary": "Helix-02 的核心目标是：双系统架构支持200Hz全身控制。",
      "keyPoints": [
        "核心动机：双系统架构支持200Hz全身控制",
        "演化来源：继承或改进自 pi0",
        "代表机构：Figure AI"
      ],
      "detail": "<p>双系统架构支持200Hz全身控制</p>"
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
      "summary": "Long-VLA 的核心目标是：相位感知输入掩码解决长程任务。",
      "keyPoints": [
        "核心动机：相位感知输入掩码解决长程任务",
        "演化来源：继承或改进自 openvla",
        "代表机构：CoRL 2025"
      ],
      "detail": "<p>相位感知输入掩码解决长程任务</p>"
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
      "summary": "NeuroVLA 的核心目标是：类脑架构0.4W功耗20ms生存本能。",
      "keyPoints": [
        "核心动机：类脑架构0.4W功耗20ms生存本能",
        "演化来源：继承或改进自 hpt",
        "代表机构：智平方"
      ],
      "detail": "<p>类脑架构0.4W功耗20ms生存本能</p>"
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
      "summary": "LaST-R1 的核心目标是：潜在空间物理推理达99.9%。",
      "keyPoints": [
        "核心动机：潜在空间物理推理达99.9%",
        "演化来源：继承或改进自 pi0_7",
        "代表机构：Simplexity/北大"
      ],
      "detail": "<p>潜在空间物理推理达99.9%</p>"
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
