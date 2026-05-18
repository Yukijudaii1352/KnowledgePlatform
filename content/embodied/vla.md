---
domain: embodied
topic_id: vla
topic_name: 视觉-语言-动作基础模型
page_icon: "\U0001F9BE"
page_title: 视觉-语言-动作 (VLA) 基础模型算法总结
page_subtitle: '{build_date} 版'
page_desc: 从模仿学习到原生多模态端到端控制，梳理VLA模型在具身智能领域的技术演进与前沿突破
hero_pills:
- 具身智能 · 多模态大模型 · 机器人控制 · 流匹配策略
count_pill: '{count} 个算法'
categories:
  transformer_policy:
    label: Transformer策略
    color: '#3B82F6'
  vlm_finetune:
    label: VLM微调策略
    color: '#10B981'
  diffusion_flow:
    label: 扩散/流匹配策略
    color: '#F59E0B'
  llm_planning:
    label: LLM规划与代码生成
    color: '#8B5CF6'
  spatial_3d:
    label: 3D空间表征
    color: '#EC4899'
---

## 领域综述

### 【综述】具身智能中的 VLA 模型

中科院自动化所的这篇综述系统性地梳理了VLA模型从概念萌芽到快速发展的脉络。论文本身就是中文，比较易读，本文仅做一个简化导读。

- 从具身智能的三要素（环境、本体、进化）出发，构建了一个包含模型架构、训练数据、预训练、后训练和模型评估五大维度的分析框架。
- 通过这个框架，论文剖析了当前VLA模型的技术现状，指出了其在泛化能力、精细操作和实时性等方面的核心挑战，并为未来的研究提供了方向指引。

> 论文：[[2508.15201] Survey of Vision-Language-Action Models for Embodied Manipulation](https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2508.15201)

---

### 一、背景知识：VLA与具身智能

具身智能的核心理念是，智能体通过其「身体」与环境进行持续的交互、感知和行动，从而在实践中学习和进化。机器人作为具身智能的典型载体，其在开放环境下的通用操作能力是衡量该领域进展的关键指标。

传统的机器人控制系统通常采用模块化设计，将感知、决策、规划、控制等环节解耦。这种架构虽然清晰可解释，但在面对现实世界中无穷无尽的多样化任务和动态变化的环境时，显得力不从心。随着以Transformer为核心的大型语言模型（LLM）和视觉语言模型（VLM）展现出强大的泛化能力，为机器人技术带来了新的可能性。

视觉-语言-动作（Vision-Language-Action, VLA）模型试图构建一个**通用的**机器人控制策略，将视觉感知、语言理解和动作生成统一在单个可扩展的框架内。通过接收自然语言指令和多模态传感器数据，VLA模型直接输出物理动作，实现了从高级语义理解到低级物理执行的端到端映射。

### 二、VLA模型的演进历程

VLA模型的发展与大模型技术的演进紧密相连。其发展历程大致可划分为三个阶段，每个阶段都反映了研究界对**连接感知与行动**这一核心问题的不同理解和解决方案。

![](https://pica.zhimg.com/v2-c1b8b03ae0974b27916938352aec992e_1440w.jpg)

#### 2.1 萌芽阶段（~2023年初）

在VLA概念正式形成之前，研究者已开始探索将语言指令融入机器人模仿学习。早期工作尝试使用卷积神经网络（CNN）或循环神经网络（RNN）处理视觉和语言输入，但受限于模型容量，难以扩展到大规模任务。

这一阶段的核心议题是如何将机器人控制问题范式化为大模型擅长的序列到序列（Seq2Seq）任务。代表性工作如`RT-1`将图像和语言编码为Token，并对连续的机器人动作进行离散化分词，使其能被Transformer架构处理。`GATO`则提出了一个更为通用的「通才智能体」（Generalist Agent）概念，用一套模型参数处理机器人控制、游戏、对话等多种任务。

同时，为了解决离散化动作带来的精度损失和运动抖动问题，研究者开始探索生成式模型。`ACT`引入了动作分块（Action Chunking）和条件变分自编码器（CVAE）来建模动作的多模态性。`Diffusion Policy`则利用扩散模型强大的分布建模能力，有效捕捉了复杂演示数据中的多模态行为，为后续工作提供了重要思路。

#### 2.2 探索阶段（2023年中~2024年初）

2023年，`RT-2`模型的发布正式提出了VLA的概念，并展示了通过继承大规模VLM（如PaLM-E）权重，模型可以将在互联网数据中学到的视觉和语义知识迁移到机器人控制任务中，表现出显著的零样本泛化能力。

这一阶段，研究路线出现了明显的分化：

- **继承预训练权重**：以`RT-2`、`RoboFlamingo`（继承Flamingo）、`OpenVLA`（继承LLaMA）为代表。该路线的核心思想是「站在巨人的肩膀上」，直接利用LLM/VLM强大的先验知识来理解开放世界的概念和指令，然后用相对较少的机器人数据进行微调，以对齐动作空间。
- **从零构建专用模型**：以`Octo`为代表。该路线认为机器人数据与互联网数据存在领域差异，直接继承可能并非最优。`Octo`设计了一个轻量级的、可扩展的Transformer架构，在专门整合的大规模机器人数据集`Open X-Embodiment (OXE)`上进行预训练。它证明了即使参数量较小，一个在多样化机器人数据上训练的专用模型也能达到与大型VLA相当的性能。

此外，如何处理不同机器人（异构体）的数据成为关键。`HPT`等工作通过设计独立的编码器将不同机器人的本体信息和视觉特征映射到统一的表示空间，实现了主干网络的共享。

#### 2.3 快速发展阶段（2024年中至今）

进入2024年，研究的焦点转向解决VLA模型在泛化性、长时序任务处理和推理效率方面的深层问题。

- **分层架构** ：单层VLA模型难以同时兼顾高级别长时序规划和低级别高频控制。因此，分层架构成为主流。这种架构通常包含：

- **System 2（规划层）**：一个大型VLM，负责理解复杂指令、进行场景推理和任务分解，输出子任务目标。
- **System 1（执行层）**：一个轻量级、快速的VLA模型，负责接收子任务指令并生成高频、精确的动作。 这种「思考」与「行动」分离的设计，既发挥了大模型的规划能力，又保证了机器人控制的实时性。

- **联合训练与思维链**：为了解决VLM权重在机器人数据上微调时发生的「灾难性遗忘」问题，研究者开始采用**跨域联合训练**，即将互联网图文数据与机器人轨迹数据混合训练，以保持模型的通用知识。同时，通过构建**思维链（CoT）** 数据，让模型在输出动作前先生成推理步骤（如任务分解、目标识别），可以显著增强其对任务的理解和泛化能力。
- **多模态融合与效率优化**：研究开始探索融合更多维度的传感器信息，如3D点云、触觉和力反馈，以增强模型对物理世界的感知，尤其是在精细操作任务中。同时，为了解决VLA模型在端侧部署的实时性问题，模型量化（`BitVLA`）、高效推理架构（`RoboMamba`）和推理时优化（`FAST ECoT`）等方向也获得了广泛关注。

### 三、VLA模型架构剖析

当前主流的VLA模型在结构上可以统一为三个核心部分：观测编码、特征推理和动作解码。此外，分层系统作为一种新兴的宏观架构，也值得单独讨论。

![](https://pic2.zhimg.com/v2-dd68f5c0ce39614fb8b5fc4a57b9542b_1440w.jpg)

#### 3.1 观测编码（Observation Encoder）

观测编码器的作用是将来自不同传感器的原始数据和自然语言指令转换为模型可以处理的统一特征表示（Tokens）。

![](https://pica.zhimg.com/v2-7d6992e084d622d9959176e8acf7e37c_1440w.jpg)

- **视觉编码**：

- **2D图像**：这是VLA模型最主要的视觉输入。编码器经历了从**CNN**（如ResNet, EfficientNet）到**Vision Transformer (ViT)** 的转变。ViT因其更好的可扩展性和对全局信息的捕捉能力而成为主流。目前，使用在海量图文数据上预训练的ViT（如DINOv2, SigLIP）或直接采用VLM的视觉编码器（如PaliGemma）已成为标准做法，这能为模型注入强大的视觉先验知识。
- **3D空间信息**：2D图像缺乏深度信息，限制了机器人在精细操作中的空间感知能力。为了弥补这一点，研究者探索了多种路径：

- **直接编码3D数据**：如`PointVLA`直接处理点云数据，但面临高质量3D数据稀缺和与2D/语言模态对齐困难的问题。
- **2D辅助3D理解**：如`SpatialVLA`通过引入3D位置编码与2D特征融合；`OG-VLA`则将3D点云投影为多视角2D图像，再利用成熟的2D编码器进行处理。这种间接方式在当前数据条件下似乎更具可行性。

- **其他模态编码**：

- **语言**：通常使用预训练的语言编码器（如T5 Encoder）或字节对编码器（BPE）进行处理。
- **本体感受（Proprioception）**：机器人的关节角度、速度等自身状态信息，通常通过简单的线性层或多层感知机（MLP）编码。
- **触觉与力觉**：在接触丰富的任务中至关重要。`ForceVLA`使用线性层编码六维力/力矩信号；`VTLA`则利用预训练的视觉编码器处理视触觉传感器产生的图像数据。这些模T态的引入显著提升了精细操作能力，但其标准化和数据采集仍是巨大挑战。

#### 3.2 特征推理（Feature Reasoning Backbone）

推理主干网络负责融合来自不同模态和不同时间步的特征，并进行时序推理，以生成用于决策的上下文表示。

![](https://picx.zhimg.com/v2-c0418976c1fc8198bb87de4e13abea0f_1440w.jpg)

- **Transformer**：凭借其强大的序列建模能力和可扩展性，标准Transformer是VLA模型最常用的主干。
- **Diffusion Transformer (DiT)** ：标准Transformer在建模确定性映射时，容易对多模态的动作数据（即同一场景下有多种可行操作）产生「平均效应」，生成不可行的动作。DiT结合了扩散模型的生成能力和Transformer的序列处理能力，能更好地建模复杂的动作分布，在`RDT`等双臂操作任务中取得了良好效果。
- **混合专家模型（Mixture of Experts, MoE）**：当使用图文数据和机器人数据进行联合训练时，不同任务间会产生参数竞争。MoE通过为不同任务或样本动态分配不同的「专家」网络（通常是FFN层），可以在扩大模型容量的同时，有效减少任务间的干扰，缓解「灾难性遗忘」。`ChatVLA`系列工作是该方向的代表。
- **状态空间模型（State Space Models, SSMs）**：以`Mamba`为代表的SSM架构，其推理复杂度和内存消耗随序列长度呈线性增长，远优于Transformer的平方级增长。`RoboMamba`将其引入VLA，在保持强大上下文建模能力的同时，大幅提升了推理速度，为实时控制提供了新的可能。

#### 3.3 动作解码（Action Decoder）

动作解码器将推理主干输出的特征转换为机器人可以执行的动作指令。动作的表示方式和解码机制是决定控制精度和流畅性的关键。

![](https://pic3.zhimg.com/v2-b23041de9454cf22ee9e00f39327ce4a_1440w.jpg)

- **动作空间**：

- **末端执行器空间（End-Effector Space）**：预测机械臂末端相对于当前位置的位姿变化。该空间与机器人具体形态解耦，有利于跨机器人平台的数据共享和模型泛化。
- **关节空间（Joint Space）**：直接预测每个关节的目标角度。该方式更直接，无需逆运动学求解，但与机器人形态强相关，泛化性较差。

- **动作分布建模**：

- **离散动作**：将连续的动作空间离散化为有限个「动作词汇」。

- **优点**：与LLM的自回归生成范式天然契合，训练速度快。
- **缺点**：存在量化误差，影响控制精度。
- **方法**：从简单的均匀分箱，到基于数据分布的自适应网格（`SpatialVLA`）、k-means聚类（`BeT`）、矢量量化（`VQ-BeT`），再到利用时频变换进行信息压缩的`FAST`，离散化技术正变得越来越精细。

- **连续动作**：直接预测连续的动作值。

- **优点**：控制精度高，动作平滑。
- **缺点**：训练较慢，且在面对多模态数据时，简单的确定性回归（如用MLP直接预测）会失效。
- **方法**：为了建模多模态性，`ACT`使用CVAE，而`Diffusion Policy`、`RDT`和`π-0`等工作则广泛采用扩散模型或流匹配（Flow Matching）模型，通过生成式方法来预测动作分布。

目前，结合离散和连续动作优点的混合方法（`HybridVLA`），以及在训练时使用离散动作加速收敛、在推理时使用连续动作保证精度的联合训练机制，也成为新的研究趋势。

#### 3.4 分层系统（Hierarchical System）

如前所述，分层系统将VLA任务分解为高级规划和低级控制，是处理长时序、复杂任务的有效宏观架构。

![](https://pic4.zhimg.com/v2-03177e5eba947e14be1666b895e6ef25_1440w.jpg)

其核心在于**层间通信原语（Communication Primitives）**的设计：

- **文本语言**：上层VLM生成自然语言形式的子任务指令（如「拿起红色的苹果」），传递给下层VLA。这种方式可解释性强，但可能丢失连续信息。
- **动作轨迹**：上层模型生成一个稀疏、长时域的末端轨迹，下层模型负责生成密集、高频的动作来精细地跟随该轨迹。
- **隐特征向量（Latent Features）**：上层模型的输出是一个或多个特征向量，作为条件输入到下层模型。这种方式可以传递更丰富的信息，并允许端到端的梯度传播。

### 四、训练数据与预训练方法

数据是驱动VLA模型能力提升的核心燃料。与LLM/VLM依赖海量互联网数据不同，VLA的训练数据生态更为复杂和分层。

#### 4.1 VLA训练数据金字塔

英伟达的研究人员提出了一个形象的「数据金字塔」概念，清晰地展示了VLA模型所需的数据类型。

![](https://pic4.zhimg.com/v2-78aab46627d2d7e5a2a71f80e08ed435_1440w.jpg)

- **金字塔底层：互联网图文数据**（规模：10B+）

- **来源**：COCO, LAION, WebLI等。
- **作用**：为VLA提供通用的世界知识、物体识别和场景理解能力。这是模型视觉泛化能力的基础。

- **金字塔中层：人类活动视频数据**（规模：1M+ 小时）

- **来源**：Ego-4D, EPIC-KITCHENS等。
- **作用**：提供关于物理世界动态、物体交互方式和任务执行流程的先验知识。虽然没有机器人动作标签，但可以通过自监督学习潜在动作（`LAPA`, `GO-1`）或视频预测辅助任务（`GR-1`）来利用。

- **金字塔上层：仿真机器人数据**（规模：1M+ 轨迹）

- **来源**：RoboCasa, SynGrasp-1B等仿真环境。
- **作用**：以低成本、大规模地生成带有精确动作标签的机器人轨迹数据，用于训练模型的基本操作能力和应对多样化的场景。

- **金字塔顶尖：真实机器人数据**（规模：100K+ 轨迹）

- **来源**：OXE, DROID, RT-1等真实机器人采集数据集。
- **作用**：这是质量最高、也最宝贵的数据。它用于弥合仿真与现实的差距（Sim-to-Real），并使模型适应真实世界的物理动力学和视觉特性。

#### 4.2 VLA预训练方法

如何有效利用这些多层次的数据，是VLA预训练方法研究的核心。

- **单一领域数据训练**：仅使用机器人轨迹数据（主要是仿真和真实数据）进行训练。这种方法简单直接，但由于数据规模和多样性的限制，模型的泛化能力通常较差。
- **跨域分阶段训练**：这是目前非常主流的方法吗，`RT-2`、`OpenVLA`和`GR-1`等都遵循此范式。

- **第一阶段**：在金字塔底层或中层数据（图文/视频）上进行大规模预训练，或者直接继承一个预训练好的LLM/VLM权重。
- **第二阶段**：在金字塔上层和顶层数据（机器人轨迹）上进行微调，将通用知识对齐到机器人操作任务上。

- **跨域数据联合训练**：为了缓解分阶段训练中可能出现的「灾难性遗忘」问题，该方法将不同来源的数据（如VQA、目标检测、机器人轨迹）混合在一起，进行联合训练。这迫使模型在不同任务间共享知识，有助于保持和提升泛化能力。近期如`π-0.5`等工作表明，精心设计的数据混合策略能显著提升模型性能。
- **思维链（CoT）增强**：该方法不仅仅是使用数据，更是创造和利用「高质量」的数据。通过为机器人轨迹数据标注中间的推理步骤（如`首先，我需要找到杯子。杯子在桌子中间。然后，我需要规划一个抓取姿态…`），并让模型在训练时同时学习预测这些推理过程和最终的动作。`ECoT`、`DiVLA`等工作证明，这种方式可以激发模型的规划和推理能力，减少「肌肉记忆」式的行为，从而提升对新任务的泛化能力。

### 五、后训练与评估

一个预训练好的VLA模型只是拥有了「基础智能」。要使其在特定场景下表现出色，并能持续进化，后训练和评估是必不可少的环节。

#### 5.1 后训练方法

后训练的目标是使通用模型快速适应特定的下游任务或机器人平台。

- **监督微调（SFT）** ：这是最直接和常用的方法。通过人工遥操作采集少量针对特定任务的专家演示数据，然后在预训练模型的基础上进行微调。SFT简单高效，但其性能上限受限于演示数据的质量和一致性，并且存在模仿学习固有的复合误差问题。
- **强化微调（RFT）** ：强化学习允许模型通过与环境的直接交互和试错来超越演示数据，学习到更优的策略。

- **潜力**：可以突破模仿学习的性能瓶颈，提升策略的鲁棒性和成功率。
- **挑战**：在真实世界中应用RL面临样本效率低、奖励函数设计困难、安全性问题等巨大挑战。尽管挑战重重，但`VLA-RL`、`GRAPE`等工作已开始探索如何将RL（尤其是在线RL和偏好学习）有效地用于VLA后训练，并展现出巨大潜力。

- **推理时扩展**：这类方法在不改变模型权重的情况下，在推理（测试）阶段提升性能。例如，`V-GPS`在推理时采样多个候选动作序列，然后使用一个预训练的值函数来评估并选择最优的动作执行。这种方法灵活且模型无关，但其效果依赖于预训练模型的初始能力和评估模块的准确性。

#### 5.2 模型评估体系

如何科学、全面地评估一个VLA模型的性能，是指导领域发展方向的关键。

- **真实环境评估**：这是评估的「黄金标准」，最能反映模型的实际应用能力。评估指标通常是任务成功率，并区分**分布内（In-Distribution）** 任务（与训练数据相似）和**分布外（Out-of-Distribution）** 任务（新物体、新场景）以测试泛化能力。标准化基准如`FMB`和自动化评估系统`AutoEval`的出现，正在努力解决真实评测成本高、可复现性差的问题。
- **仿真器评估**：仿真器提供了可控、可复现、低成本的大规模评估环境。

- **早期基准**：如RLBench, Meta-World，主要关注控制能力。
- **现代基准**：如`CALVIN`、`LIBERO`，引入了语言指令和长时序任务，更适合评估VLA模型。`SimplerEnv`则致力于缩小仿真与现实的差距（Sim-to-Real Gap）。许多论文都会在这些公开基准上报告性能，以便进行横向对比（如下表所示）。

![](https://pic3.zhimg.com/v2-abd1acf18388ce57b4a33701badfc54e_1440w.jpg)

- **世界模型评估**：这是一个前沿方向。通过训练一个生成式模型（通常是视频生成模型）来模拟物理世界的动态，即构建一个「世界模型」（World Model）。然后，可以在这个数据驱动的世界模型中评估VLA策略，其渲染和物理动态可能比传统仿真器更逼真。`WorldEval`等工作已证明，基于世界模型的评估结果与真实环境评测结果具有较强的相关性，但该技术本身仍处于早期发展阶段。

## 最新进展综述

### 一、VLA 的最新焦点正在转向世界模型

最新这篇综述关注的不是“如何再做一个更大的 VLA 主干”，而是更具体的问题：**VLA 如何获得对物理世界的前瞻能力**。纯粹依赖视觉-语言-动作映射的模型，虽然能继承大模型的语义理解与开放词汇泛化，但在真实部署中经常暴露出三类短板：

- **物理动态建模不足**：模型能“理解指令”，但未必能可靠预测接触、碰撞、遮挡与连续运动的后果。
- **长程规划缺少可执行验证**：LLM 或 VLM 可以给出高层计划，却无法直接验证这些计划在物理世界里是否真的可行。
- **高质量机器人数据稀缺**：真实世界采集成本高、风险高，限制了大规模在线试错和覆盖长尾场景。

正因为如此，世界模型开始被视为 VLA 迈向通用具身智能的重要增量模块：它不只是“生成未来画面”，更是在为策略提供**物理一致的前瞻与验证机制**。

> 参考综述：[*迈向通用具身人工智能：VLA智体的世界模型综述*](https://zhuanlan.zhihu.com/p/2029851015126689488)

### 二、四类世界模型范式正在分化成清晰技术谱系

这篇综述把面向 VLA 的世界模型划分为四种典型范式，它们对应了四种不同的“把未来引入决策”的方式：

- **世界规划器（World Planner）**：先显式或隐式预测未来状态，再把这些未来表征作为规划条件输入策略。
- **世界动作模型（World Action Model）**：联合建模未来观测与动作分布，让“看见未来”和“生成动作”在同一模型里耦合。
- **世界合成器（World Synthesizer）**：把世界模型当作数据引擎，批量合成交错的观测-动作轨迹，缓解机器人数据稀缺。
- **世界模拟器（World Simulator）**：把世界模型直接当作虚拟环境，用于评估、强化学习和测试时规划。

这四条路线并不是互斥关系。它们共同指向的趋势是：VLA 不再满足于“看到当前场景就立即出动作”，而是逐步获得**预测、验证、合成、模拟**四种更主动的能力。

### 三、基础模型与评测体系也在发生迁移

从底层架构看，世界模型已经不局限于单一视频生成器，而是在三类基础能力之间组合：

- **图像 / 视频生成模型**：擅长高保真未来合成，适合做显式想象与可视化规划。
- **统一理解-生成模型**：把感知和生成放进同一框架，更适合做多模态条件下的端到端推演。
- **表征模型**：不追求像素级重建，而是在潜空间中保持对几何、时间与因果结构的压缩表达，更适合高效规划与控制。

与此同时，评测也在迁移。综述明确指出，像 `CALVIN`、`LIBERO` 这类仿真基准上的性能已经越来越接近饱和，说明仅靠封闭仿真环境很难继续区分新方法的真实价值。下一阶段更重要的是：

- 世界模型是否真的提高了**真实世界物理一致性**；
- 是否能支持**更长时程、更开放场景**的任务；
- 是否能在保证安全的前提下，替代部分昂贵的真实机器人试错。

### 四、下一阶段最难的问题不是更大模型，而是更可靠的未来建模

综述最后点出的挑战非常集中，基本定义了 VLA 下一阶段的研究重点：

- **物理一致性**：如何减少“看起来合理、实际上不可执行”的物理幻觉。
- **4D 时空感知**：如何把三维几何结构和时间演化同时纳入表征，而不是停留在二维图像层面。
- **安全与可靠性**：如何让世界模型在执行前预测风险、约束危险动作，而不是只做离线生成。
- **长程前瞻**：如何在多阶段任务里持续保持目标、约束和空间关系的一致理解。
- **失败感知动力学**：不仅学习成功演示，还要显式建模失败、偏差与纠错过程。

对 VLA 来说，这些问题意味着研究重心正在从“统一多模态输入输出”迈向“让模型真正具备可验证、可模拟、可前瞻的世界理解能力”。这也是为什么世界模型会成为当前 VLA 领域最值得单独追踪的一条最新进展主线。

## 算法演化关系

```yaml
nodes:
- id: bc_z
  x: 2021.11
  y: 1
  category: transformer_policy
- id: cliport
  x: 2022
  y: 5
  category: spatial_3d
- id: saycan
  x: 2022.04
  y: 4
  category: llm_planning
- id: gato
  x: 2022.05
  y: 1
  category: transformer_policy
- id: code_as_policies
  x: 2022.11
  y: 4
  category: llm_planning
- id: rt1
  x: 2022.12
  y: 1
  category: transformer_policy
- id: palm_e
  x: 2023.03
  y: 2
  category: vlm_finetune
- id: moo
  x: 2023.03
  y: 2.3
  category: vlm_finetune
- id: rt2
  x: 2023.07
  y: 2
  category: vlm_finetune
- id: voxposer
  x: 2023.07
  y: 5
  category: spatial_3d
- id: roboagent
  x: 2023.09
  y: 3
  category: diffusion_flow
- id: rt_x
  x: 2023.1
  y: 1
  category: transformer_policy
- id: roboflamingo
  x: 2023.11
  y: 2.3
  category: vlm_finetune
- id: hpt
  x: 2024
  y: 1
  category: transformer_policy
- id: octo
  x: 2024.05
  y: 3
  category: diffusion_flow
- id: openvla
  x: 2024.06
  y: 2
  category: vlm_finetune
- id: gr1
  x: 2024.09
  y: 1
  category: transformer_policy
- id: pi0
  x: 2024.1
  y: 3
  category: diffusion_flow
- id: helix
  x: 2025.02
  y: 3
  category: diffusion_flow
- id: long_vla
  x: 2025.09
  y: 1
  category: transformer_policy
- id: groot_n2
  x: 2026.03
  y: 3
  category: diffusion_flow
- id: dfm_vla
  x: 2026.03
  y: 3.3
  category: diffusion_flow
- id: pangu_embodied
  x: 2026.03
  y: 4
  category: llm_planning
- id: gemini_robotics_er
  x: 2026.04
  y: 2
  category: vlm_finetune
- id: univla
  x: 2026.04
  y: 2.2
  category: vlm_finetune
- id: hy_embodied
  x: 2026.04
  y: 2.4
  category: vlm_finetune
- id: neurovla
  x: 2026.04
  y: 1
  category: transformer_policy
- id: pi0_7
  x: 2026.04
  y: 3.2
  category: diffusion_flow
- id: openvla2
  x: 2026.05
  y: 2
  category: vlm_finetune
- id: last_r1
  x: 2026.05
  y: 3
  category: diffusion_flow
edges:
- from: bc_z
  to: rt1
  label: 架构优化
- from: saycan
  to: code_as_policies
  label: 代码生成
- from: rt1
  to: rt2
  label: VLM迁移
- from: palm_e
  to: moo
  label: 开放世界
- from: cliport
  to: voxposer
  label: 3D价值图
- from: rt2
  to: rt_x
  label: 跨形态
- from: palm_e
  to: roboflamingo
  label: 解耦设计
- from: roboagent
  to: octo
  label: 开源通用
- from: rt2
  to: openvla
  label: 双视觉
- from: rt_x
  to: hpt
  label: 异构预训练
- from: rt_x
  to: gr1
  label: 人形控制
- from: octo
  to: pi0
  label: 流匹配
- from: pi0
  to: helix
  label: 双系统
- from: openvla
  to: long_vla
  label: 长程规划
- from: helix
  to: groot_n2
  label: 世界模型
- from: pi0
  to: dfm_vla
  label: 离散流
- from: code_as_policies
  to: pangu_embodied
  label: 长程规划
- from: rt2
  to: gemini_robotics_er
  label: 具身推理
- from: openvla
  to: univla
  label: 原生多模态
- from: univla
  to: hy_embodied
  label: MoT架构
- from: hpt
  to: neurovla
  label: 类脑架构
- from: pi0
  to: pi0_7
  label: 组合泛化
- from: openvla
  to: openvla2
  label: 自适应推理
- from: pi0_7
  to: last_r1
  label: 潜在推理
- from: rt2
  to: rt_x
  label: 跨形态
milestones:
- rt2
- pi0
- last_r1
```

## 核心算法

### BC-Z

```yaml
id: bc_z
num: 1
name: BC-Z
full_name: 零样本任务泛化模仿学习 (BC-Z)
year: '2021.11'
org: Google/Stanford
parent: —
paper_url: https://arxiv.org/abs/2202.02005
project_url: ''
category: transformer_policy
motivation: 大规模模仿学习实现100+任务零样本泛化
```

#### 📝 一句话总结
BC-Z 提出了一个大规模多任务行为克隆框架，通过在 100 个操作任务上联合训练（含语言和视频条件），结合 HG-DAgger 人在回路干预机制，实现了对 29 个留出任务的零样本任务泛化（32% 成功率），证明了大规模多任务模仿学习可以产生语义层面的任务泛化能力。

#### 🎯 核心要点
- 双组件架构：ResNet18 视觉 Encoder + FiLM 条件化控制层（MDN 输出动作分布）
- 任务条件机制：冻结的 Universal Sentence Encoder (USE) 语言嵌入作为主条件，可选视频 demonstration 作为辅助条件
- 大规模多任务训练：100 个操作任务（抓取、放置、开门、推动等），约 40k episodes 的专家演示数据
- HG-DAgger (Human-in-the-loop Guided DAgger)：训练过程中人类操作员可实时干预机器人动作，干预数据作为额外训练信号
- 零样本泛化验证：在 29 个完全留出的任务上评估，语言条件 52% vs one-hot 45% vs 视频 42%
- 干预数据 + 专家演示联合训练：53% 成功率 vs 仅专家演示 27%，证明 HG-DAgger 对泛化有显著增益
- 任务表征空间分析：语言嵌入在语义空间中形成合理聚类，语义相似的任务在嵌入空间中距离更近

#### 🔬 深入细节
##### 核心框架图

![BC-Z 框架总览](https://ar5iv.labs.arxiv.org/html/2202.02005/assets/figures/overview_v3.png)
*图：BC-Z 框架总览。左侧为多任务训练数据（含人类演示和干预数据），中间为 ResNet18 编码器 + FiLM 控制层，右侧为零样本泛化到留出任务*

##### 模型架构

![BC-Z 架构图](https://ar5iv.labs.arxiv.org/html/2202.02005/assets/figures/singletask_architecture_base.png)
*图：BC-Z 的端到端架构。视觉编码器（ResNet18）处理图像输入，FiLM 层以语言/视频嵌入为条件调节特征，MDN 输出动作分布*

##### 方法细节

**1. 动机与背景**

传统机器人模仿学习通常针对单一任务训练，缺乏对未见过任务的泛化能力。BC-Z 的核心假设是：**如果在大规模、多样化任务上联合训练，模型可以学习到任务之间的语义关系，从而实现对全新任务的零样本泛化**。这一思路受到 NLP 和 CV 领域大规模预训练成功经验的启发。

**2. 核心机制：FiLM 条件化 + MDN**

BC-Z 的策略网络 \(\pi_\theta(a|s, z)\) 接受状态 \(s\)（RGB 图像）和任务嵌入 \(z\) 作为输入。任务嵌入 \(z\) 有三种变体：

- **语言条件**：通过冻结的 USE 编码自然语言任务描述（如 "pick up the can"）获取 512 维嵌入
- **One-hot 条件**：每个任务分配一个离散的 one-hot 向量
- **视频条件**：将人类演示视频（3 帧）通过共享的 ResNet18 编码为嵌入

FiLM (Feature-wise Linear Modulation) 层以任务嵌入 \(z\) 为输入，生成缩放因子 \(\gamma(z)\) 和偏移量 \(\beta(z)\)，对视觉编码器的中间特征图进行线性调制：
\[
\text{FiLM}(F) = \gamma(z) \odot F + \beta(z)
\]
这使得同一视觉特征可以根据不同任务被不同地"解读"——例如，同一场景中，不同任务可能关注不同物体。

控制层使用**混合密度网络（Mixture Density Network, MDN）**输出动作分布。MDN 将动作空间建模为 \(K\) 个高斯分布的混合：
\[
p(a|s, z) = \sum_{k=1}^{K} \alpha_k(s, z) \cdot \mathcal{N}(a | \mu_k(s, z), \sigma_k^2(s, z))
\]
其中 \(\alpha_k\) 为混合权重，\(\mu_k\) 和 \(\sigma_k\) 为各高斯分量的均值和方差。MDN 比简单的确定性回归或单峰高斯更适合多模态的动作分布（例如，抓取物体可以从左边或右边绕过去）。

**3. HG-DAgger：人在回路的干预机制**

HG-DAgger 是 BC-Z 的关键数据增强策略。在训练过程中：
- 机器人执行当前策略预测的动作
- 人类操作员观察机器人行为，如果发现即将失败或不安全，可以实时**接管控制**
- 接管期间的**人类动作 + 当前状态 + 任务条件**被记录为新的训练数据
- 这些干预数据与原始专家演示数据**混合训练**

HG-DAgger 的核心优势：
- 干预数据自然地聚焦于**策略表现差的状态空间区域**，提供针对性纠正
- 不需要额外的专家演示收集，而是在训练过程中**在线生成**有价值的训练数据
- 干预数据包含**恢复行为**（从接近失败的状态恢复到正常），教会模型处理边缘情况

论文实验表明，加入 HG-DAgger 干预数据将留出任务成功率从 27% 提升至 53%。

**4. 训练流程**

训练目标为最大化动作对数似然（MDN 下的标准 BC 损失）：
\[
\mathcal{L} = -\mathbb{E}_{(s, a, z) \sim \mathcal{D}} \left[ \log \sum_{k=1}^{K} \alpha_k \cdot \mathcal{N}(a | \mu_k, \sigma_k^2) \right]
\]

训练数据包含：
- ~40k episodes 的专家远程操作演示（100 个训练任务）
- 训练过程中产生的 HG-DAgger 干预数据
- 两种数据混合，intervention data 有专门的权重

训练细节：
- 输入图像：472×472 RGB，随机裁剪到 224×224 并做数据增强（颜色抖动、随机遮挡等）
- 动作空间：6-DoF 末端执行器位姿（x, y, z, roll, pitch, yaw）+ 夹爪开合
- 控制频率：3 Hz
- 优化器：Adam，学习率 1e-4
- Batch size：256，episode 级别采样

**5. 与传统方法的对比**

| 维度 | 传统单任务 BC | 多任务 BC（one-hot） | BC-Z（语言条件） |
|------|-------------|-----------------|---------------|
| 任务表征 | 无（固定策略） | 离散 ID，无语义 | 连续语言嵌入，有语义 |
| 泛化能力 | 零（需重新训练） | 需 fine-tuning | 零样本泛化到语义相关任务 |
| 数据效率 | 每任务独立 | 共享参数 | 共享参数 + 干预数据 |
| 动作分布 | 单峰高斯 | 单峰高斯 | MDN 多模态高斯混合 |
| 人在回路 | 无 | 无 | HG-DAgger 实时干预 |

##### 算法伪代码

```python
# BC-Z 训练循环（含 HG-DAgger）
def train_bc_z():
    # 初始化
    encoder = ResNet18(pretrained=False)        # 视觉编码器
    film_layers = FiLM(condition_dim=512)        # FiLM 条件层
    mdn_head = MDN(n_components=5, action_dim=7) # MDN 控制头
    
    # 多任务数据加载
    dataset = MultiTaskDataset(100_tasks, expert_demos + intervention_data)
    
    for epoch in range(total_epochs):
        for batch in dataloader:
            images, actions, task_embeddings = batch
            
            # 视觉编码
            features = encoder(images)
            
            # FiLM 条件调制
            for layer in film_layers:
                features = layer(features, task_embeddings)
            
            # MDN 输出分布参数
            alphas, mus, sigmas = mdn_head(features)
            
            # 计算负对数似然损失
            loss = -mdn_log_likelihood(actions, alphas, mus, sigmas)
            loss.backward()
            optimizer.step()
        
        # HG-DAgger：收集干预数据
        if epoch % intervention_interval == 0:
            for task in training_tasks:
                episode = rollout(policy, task)
                if human_intervened(episode):
                    dataset.add(episode.intervention_data)
    
    # 零样本评估
    for heldout_task in 29_heldout_tasks:
        success_rate = evaluate_zero_shot(policy, heldout_task)
```

**6. 实验结果关键发现**

- **语言条件的优势**：语言条件（52%）> one-hot（45%）> 视频（42%），说明语义理解对零样本泛化至关重要。语言嵌入在训练任务间学到了可迁移的语义表示。
- **HG-DAgger 的显著增益**：干预数据 + 专家演示（53%）vs 仅专家演示（27%），几乎翻倍。干预数据特别有助于改善模型在**分布外状态**下的表现。
- **任务复杂度影响**：简单操作任务（如抓取、放置）泛化较好，复杂多步任务（如开门、堆叠）泛化较差。
- **未见指令的泛化**：即使对训练任务使用未见过的语言描述（同义改写），模型也能保持较高成功率，证明语言嵌入的语义鲁棒性。

##### 任务可视化

![任务总览表](https://ar5iv.labs.arxiv.org/html/2202.02005/assets/figures/tasks-tableau.png)
*图：100 个训练任务和 29 个留出任务的总览*

![留出任务序列](https://ar5iv.labs.arxiv.org/html/2202.02005/assets/figures/holdout_sequence.png)
*图：留出任务的执行序列示例，展示零样本泛化的行为*

![干预与成功率关系](https://ar5iv.labs.arxiv.org/html/2202.02005/assets/figures/interventions_vs_success.png)
*图：干预次数与成功率的关系，展示 HG-DAgger 的效果*

#### 🧪 练习题
```yaml
question: "BC-Z 中 HG-DAgger 干预数据的主要价值是什么？"
options:
  - "提供更多样化的初始状态分布"
  - "针对策略表现差的状态区域提供纠正性数据"
  - "替代所有专家演示数据以降低成本"
  - "增加训练数据的时序长度"
answer: 1
explain: "HG-DAgger 在策略执行过程中记录人类干预，这些干预自然发生在策略表现差或即将失败的状态区域，提供了针对性的纠正信号，使成功率从 27% 提升至 53%。"
```

### CLIPort

```yaml
id: cliport
num: 2
name: CLIPort
full_name: 视觉语言操作路径 (CLIPort)
year: '2022'
org: Google/UW
parent: —
paper_url: https://proceedings.mlr.press/v164/shridhar22a.html
project_url: ''
category: spatial_3d
motivation: 融合CLIP语义与Transporter几何精度
```

#### 📝 一句话总结
CLIPort 提出了一种 “What + Where” 双流架构，将预训练 CLIP 的开放词汇语义能力与 Transporter Network 的像素级几何精度结合起来，实现了以自然语言指令为条件的桌面 pick-and-place 操作，并在少样本、多任务和真机设置下都表现出很强的泛化能力。

#### 🎯 核心要点
- **双流设计（What + Where）**：语义流负责识别“操作什么物体”，空间流负责确定“在哪里操作”，两路通过 lateral connections 在多尺度上融合
- **语言条件化**：使用 CLIP 文本编码器将自然语言指令映射到语义空间，再通过逐元素乘法调制视觉特征
- **Transporter 动作表示**：将操作分解为 pick 和 place 两个像素级预测问题，place 端通过 query-key 互相关和离散旋转搜索得到放置位姿
- **样本效率高**：冻结 CLIP 视觉编码器，仅训练空间流和解码器，在 1 到 100 条演示范围内就能达到较强性能
- **多任务共享有效**：单一多任务模型在大量任务上超过对应的单任务专家模型，说明跨任务知识共享是有效的
- **真机可落地**：在真实 UR5e 平台上仅用 179 条演示就训练出一个可执行多种语言条件化任务的统一模型

#### 🔬 深入细节
##### 整体架构

![CLIPort Architecture](https://ar5iv.labs.arxiv.org/html/2109.12098/assets/x2.png)

CLIPort 的核心思想来自神经科学中的 “What” 与 “Where” 两条通路：
- **语义流（What）**：基于冻结的 CLIP ResNet-50 视觉编码器，负责提取语言对齐的开放词汇语义特征
- **空间流（Where）**：基于从零训练的 ResNet 编码器-解码器处理 RGB-D 输入，保留像素级几何精度

两条通路在解码阶段通过 `concat + 1x1 conv` 的 lateral connections 融合，最终输出像素级动作预测。

##### 动作建模：从桌面操作到像素级 pick-and-place

CLIPort 继承了 Transporter Network 的动作表示，将操作分解为 pick 与 place 两个步骤。

**Pick**：对观测图像生成像素级抓取热力图：

$$Q_{\text{pick}}(o_t) = f_{\text{pick}}(\gamma_t), \qquad a_{\text{pick}} = \arg\max_{(u,v)} Q_{\text{pick}}$$

其中 \(\gamma_t\) 是正交投影后的 RGB-D 图像。

**Place**：以 pick 点为中心裁剪 query patch，并与全图 key 特征做互相关，同时搜索离散旋转：

$$Q_{\text{place}}(o_t \mid a_{\text{pick}}) = \left[ \Phi_{\text{query}}(\gamma_t[T_{\text{pick}}]) * \Phi_{\text{key}}(\gamma_t) \right]_{\Delta\tau}$$

这使模型能显式建模“抓哪里”和“放哪里”，比直接回归连续位姿更稳定，也更符合桌面操作任务的几何结构。

##### 为什么 CLIPort 有效

CLIP 自带开放词汇语义知识，但像素级定位能力不足；Transporter 对局部几何关系建模很强，但缺少开放世界语义理解。CLIPort 的关键不在于简单拼接两个模型，而在于把两者的优势精确对齐：

- 语义流告诉模型“红色杯子”“蓝色方块”“左边的盘子”分别是什么
- 空间流告诉模型这些目标在桌面上具体处于什么像素位置，以及抓取/放置的几何关系

因此它既能理解复杂语言描述，又能保持操作精度，在多任务和真机实验中都优于从零训练的纯几何策略。


### SayCan

```yaml
id: saycan
num: 3
name: SayCan
full_name: 语言可行性规划 (SayCan)
year: '2022.04'
org: Google
parent: —
paper_url: https://arxiv.org/abs/2204.01691
project_url: ''
category: llm_planning
motivation: LLM规划结合底层技能可行性评估
```

#### 📝 一句话总结
SayCan 的核心目标是：LLM规划结合底层技能可行性评估。

#### 🎯 核心要点
- 核心动机：LLM规划结合底层技能可行性评估
- 代表机构：Google

#### 🔬 深入细节
LLM规划结合底层技能可行性评估


### Gato

```yaml
id: gato
num: 4
name: Gato
full_name: 通用智能体 (Gato)
year: '2022.05'
org: DeepMind
parent: —
paper_url: https://deepmind.google/research/publications/a-generalist-agent/
project_url: ''
category: transformer_policy
motivation: 单一Transformer处理600+多形态任务
```

#### 📝 一句话总结
Gato 提出了一个真正意义上的通才智能体雏形：把文本、图像、离散动作和连续控制全部序列化为统一 token 序列，用同一个 1.2B 参数的 decoder-only Transformer 同时处理 600 多种任务，证明了单一序列模型可以跨模态、跨环境、跨机器人本体地执行感知与控制。

#### 🎯 核心要点
- **统一 token 化范式**：文本、图像 patch、按钮动作、关节力矩、本体感觉等都被映射到同一 token 序列中
- **单模型多任务**：一套参数同时处理 Atari、对话、图像描述、Meta-World、真实机械臂堆叠等 600+ 任务
- **连续动作离散化**：连续控制量先经 \(\mu\)-law 压缩再离散成 1024 个 bins，转化为语言模型可生成的 token
- **Prompt 条件化任务**：不用手工 task id，而是用成功示范 episode 作为 prompt 条件，引导模型推断当前应该做什么
- **选择性监督**：训练时只对文本 token 和动作 token 计算损失，观察 token 不参与损失
- **VLA 先驱意义**：统一序列化、多模态上下文和动作 token 化的设计直接影响了 RT-1、RT-2、PaLM-E 等后续 VLA 工作

#### 🔬 深入细节
##### 统一序列化：把一切都变成 token

Gato 最核心的设计不是某种特殊控制头，而是一个非常激进的前提：**所有模态都统一为 token 序列**。

- **文本**：SentencePiece 子词
- **图像**：\(16 \times 16\) patch
- **离散值**：直接作为整数 token
- **连续值**：先做 \(\mu\)-law 压缩，再离散为 1024 个 bins

这种统一表示让机器人控制第一次被严格地纳入大语言模型式的 next-token prediction 范式中。

##### 模型架构与训练目标

Gato 使用 1.2B 参数的 decoder-only Transformer：
- 24 层
- hidden size 2048
- FFN hidden size 8196

训练目标是标准自回归交叉熵，但只在**文本 token 与动作 token**上计算损失：

$$
\mathcal{L}(\theta, B) = -\sum_b \sum_l m(b,l)\log p_\theta(s_l^{(b)} \mid s_1^{(b)}, \dots, s_{l-1}^{(b)})
$$

其中 \(m(b,l)=1\) 仅当该 token 属于文本或动作，否则为 0。  
这意味着图像与观察本身只是上下文，不被直接监督，模型被要求学习“如何基于这些上下文生成正确动作”。

##### 对具身智能的启示

Gato 在机器人上的控制能力并不是最强的，但它证明了一件更重要的事：**单一序列模型可以同时承载视觉、语言与动作三种能力**。这为后来的 VLA 提供了三个关键模板：

- 动作 token 化
- 多模态统一上下文建模
- 用大模型缩放规律来思考机器人策略学习

从这个意义上说，Gato 不是今天最强的 VLA，但它是通往 VLA 路线最关键的原型之一。


### Code as Policies

```yaml
id: code_as_policies
num: 5
name: Code as Policies
full_name: 代码即策略 (Code as Policies)
year: '2022.11'
org: Google
parent: saycan
paper_url: https://ai.googleblog.com/2022/11/robots-that-write-their-own-code.html
project_url: ''
category: llm_planning
motivation: LLM生成Python代码控制机器人
```

#### 📝 一句话总结
Code as Policies 的核心目标是：LLM生成Python代码控制机器人。

#### 🎯 核心要点
- 核心动机：LLM生成Python代码控制机器人
- 演化来源：继承或改进自 saycan
- 代表机构：Google

#### 🔬 深入细节
LLM生成Python代码控制机器人


### RT-1

```yaml
id: rt1
num: 6
name: RT-1
full_name: 机器人Transformer第一代 (RT-1)
year: '2022.12'
org: Google DeepMind
parent: bc_z
paper_url: https://arxiv.org/abs/2212.06817
project_url: ''
category: transformer_policy
motivation: TokenLearner压缩视觉实现3Hz控制
```

#### 📝 一句话总结
RT-1 提出 Robotics Transformer，将大规模多任务模仿学习与 Transformer 架构结合，通过 TokenLearner 将高维视觉特征压缩为 8 个紧凑 token，在 13 台机器人、744 个任务、130k 条真实世界演示上训练，实现了 3Hz 实时闭环控制，对未见任务/环境/物体展现出强泛化能力（unseen 76%）。

#### 🎯 核心要点
- **Robotics Transformer 架构**：将机器人控制转化为序列预测问题——输入 6 帧历史图像+自然语言指令，输出 7 维离散化动作（x, y, z, 旋转, 夹爪开合, 基座运动, 终止信号）
- **TokenLearner 视觉压缩**：在 EfficientNet-B3 提取的 9×9×512 特征图上学习 8 个空间注意力 token，将 81 个 patch 压缩为仅 8 个 token，大幅降低 Transformer 计算量，实现 3Hz 推理
- **FiLM 条件注入**：将自然语言指令通过 Universal Sentence Encoder 编码后，经 FiLM 层注入 EfficientNet 的多个 block，实现视觉-语言的早期融合
- **动作离散化**：每个动作维度离散化为 256 个 bin，使用交叉熵损失训练，比连续回归更稳定、更易捕捉多模态动作分布
- **大规模真实世界数据集**：17 个月、13 台 Everyday Robots 机械臂、130k 条演示、744 个任务，覆盖 kitchen manipulation 多样化场景
- **四类泛化实验**：seen tasks (97%)、unseen tasks (76%)、干扰物鲁棒性 (83%)、长时程任务 (67%)，全面验证模型泛化能力
- **行为克隆框架**：基于标准 BC-Z 框架，使用 Categorical Cross-Entropy 损失对离散化动作进行监督学习
- **高效推理**：48ms/step（3Hz），640×480 全分辨率图像，可部署在真实机器人上进行实时闭环控制

#### 🔬 深入细节
##### 核心架构图

![RT-1 整体框架图](https://ar5iv.labs.arxiv.org/html/2212.06817/assets/figures/rt1_teaser_tasks.png)
*图 1：RT-1 高层概览——架构、数据集与评估*

![机器人设置](https://ar5iv.labs.arxiv.org/html/2212.06817/assets/figures/RT-1_Robot_Setup.png)
*图 2：RT-1 所使用的 Everyday Robots 机械臂平台与相机配置*

##### 算法流程

```
For each timestep t:
    1. 取最近 6 帧 RGB 图像 (I_{t-5} ~ I_t)，每帧 640×480×3
    2. 自然语言指令 s 通过 Universal Sentence Encoder 编码
    3. 每帧图像通过 FiLM EfficientNet-B3 提取特征图 (9×9×512)
    4. 6 帧特征图串联 → (6, 9, 9, 512)
    5. TokenLearner 学习 8 个空间注意力 token: (8, 512)
       - 对每个位置计算注意力权重（softmax over 9×9×6 positions）
       - 加权求和得到紧凑 token
    6. Transformer Decoder (8 层, 自注意力, 19.5M params):
       - 输入: 8 个视觉 token + 1 个 action token + 1 个 stop token，共 10 个 token
       - Causal attention（第 i 个 token 只能 attend 前 i-1 个）
    7. Action head: 对 7 个动作维度分别预测 256-bin categorical 分布
    8. 取 argmax 得到离散动作 → 映射回连续值 → 执行
```

##### 动机与背景

传统机器人学习面临两大核心瓶颈：**数据稀缺**与**泛化困难**。单个任务的小规模训练无法应对真实世界的无穷变化——光照、背景、物体外观、初始状态的任何细微改变都可能导致策略失效。同时，现有方法多采用连续动作回归（MSE 损失），难以捕获专家演示中天然存在的多模态动作分布（同一状态下可能有多种合理动作）。

RT-1 的核心洞见是将大语言模型范式的**三个关键要素**迁移到机器人领域：
1. **统一 I/O 接口**：所有感知（图像+语言）编码为 token，所有动作也离散化为 token
2. **大规模多样化数据**：130k 条演示覆盖 744 个任务，让模型见过足够多的变异
3. **Transformer 序列建模**：利用自注意力捕捉时序依赖和跨模态交互

##### 核心机制详解

**1. TokenLearner：视觉压缩的关键**

EfficientNet-B3 输出的特征图尺寸为 9×9=81 个空间位置，6 帧则为 486 个 patch。若直接将所有 patch 送入 Transformer，O(n²) 的注意力复杂度将使得实时推理不可行。

TokenLearner 的核心操作：
- 输入：X ∈ ℝ^{T×H×W×C}（T=6, H=W=9, C=512）
- 学习 S=8 个空间注意力图 α_s ∈ ℝ^{T×H×W}
- 第 s 个 token：z_s = Σ_{t,h,w} α_s[t,h,w] · X[t,h,w,:]
- 输出：8 个 512 维 token

> 💡 关键：8 个 token 仅为原始 486 个 patch 的 1.6%，但在最大注意力权重位置保留了最关键的语义信息（物体、夹爪、目标位置等）。这是 RT-1 能以 3Hz 实时运行的架构核心。

**2. FiLM 条件注入**

传统做法将语言指令编码为单一向量拼接到视觉特征后，信息交互有限。RT-1 采用 FiLM（Feature-wise Linear Modulation）在 EfficientNet 的多个 block 层级进行调制：

$$
\text{FiLM}(x; \gamma, \beta) = \gamma \odot x + \beta
$$

其中 γ 和 β 由语言嵌入（通过 USE 编码为 512 维）经 MLP 生成。这种**层级化条件注入**使得语言信号可以在不同抽象层次影响视觉特征提取——低级特征关注纹理/颜色，高级特征关注语义/物体类别。

**3. 动作离散化与多模态分布**

7 个动作维度（x, y, z, yaw, gripper, base, stop），每个离散化为 256 个均匀 bin。训练时用 Categorical Cross-Entropy：

$$
\mathcal{L} = -\sum_{d=1}^{7} \sum_{b=1}^{256} y_{d,b} \log \hat{y}_{d,b}
$$

相比于 MSE 回归，离散化的优势：
- **捕获多模态**：同一状态下"从左侧绕过"和"从右侧绕过"都是合理动作，categorical 分布可以保留两个模式，而 MSE 会取平均（产生危险的中值动作）
- **训练稳定**：避免了连续值的回归数值不稳定性
- **与语言模型统一**：动作成为"动作词汇表"中的 token，与自然语言 token 统一处理

**4. 训练策略：从基础到泛化**

论文提出了"训练数据金字塔"的概念（Appendix C）：
- **Bridging**：先在少量高质量数据上训练解决基本问题
- **Sawyer**：加入更多任务的数据扩展技能
- **Diverse multi-task**：最终在全部 744 个任务的混合数据上训练

这种渐进式训练与直接混合训练相比，在罕见任务上提升显著。

##### 与传统方法的区别

| 维度 | 传统方法（如 BC-Z, Gato） | RT-1 |
|------|--------------------------|------|
| 动作空间 | 连续回归（MSE） | 每维 256-bin categorical |
| 视觉编码 | 冻结视觉编码器 / 小 network | FiLM EfficientNet-B3，语言早期融合 |
| 特征压缩 | 无压缩或简单 pooling | TokenLearner 学习型压缩 |
| 序列建模 | LSTM / CNN | Transformer Decoder (8 层) |
| 推理速度 | 未知/离线 | 3Hz 实时闭环 |
| 数据规模 | 单任务 ~1k demos | 744 任务 130k demos |

> ⚠️ 注意：RT-1 本质仍是**行为克隆**（Behavior Cloning），仅使用监督学习模仿专家，没有价值函数或在线探索。其泛化能力的提升完全来自**模型容量 + 数据多样性 + 架构设计**。

##### 实验结果速览

- **Seen tasks**: RT-1 达到 97% 成功率，与 BC-Z（95%）持平，显著超过 Gato（50%）
- **Unseen tasks**: RT-1 达到 76%，比 BC-Z（55%）高 21 个百分点
- **Distractor robustness**: 添加 9 种未见物体和 2 种背景干扰后，RT-1 保持 83%，BC-Z 降至 46%
- **Long-horizon**: 3+ 步任务中 RT-1 达到 67%（BC-Z 仅 30%）
- **消融关键结论**：
  - 去掉 ImageNet 预训练 → unseen 掉约 20%
  - 离散化改为连续 → 大幅下降
  - TokenLearner 换成 average pooling → 性能下降，推理变慢
  - 数据量翻倍（130k→260k）未见显著提升，说明当前模型容量可能已饱和

#### 🧪 练习题
```yaml
question: "RT-1 中 TokenLearner 的主要作用是什么？"
options:
  - "将自然语言指令编码为 token 向量"
  - "将 Transformer 输出解码为连续动作"
  - "将高维视觉特征图压缩为少量紧凑 token，降低 Transformer 计算量"
  - "对 7 个动作维度进行离散化编码"
answer: 2
explain: "TokenLearner 通过学习空间注意力图，将 6 帧 EfficientNet 特征图（486 个 patch）压缩为仅 8 个 512 维 token，大幅减少 Transformer 的序列长度，是实现 3Hz 实时推理的关键设计。"
```

### PaLM-E

```yaml
id: palm_e
num: 7
name: PaLM-E
full_name: 具身多模态语言模型 (PaLM-E)
year: '2023.03'
org: Google/TU Berlin
parent: —
paper_url: https://arxiv.org/abs/2303.03378
project_url: ''
category: vlm_finetune
motivation: 562B参数多模态观察注入LLM嵌入空间
```

#### 📝 一句话总结
PaLM-E 的核心目标是：562B参数多模态观察注入LLM嵌入空间。

#### 🎯 核心要点
- 核心动机：562B参数多模态观察注入LLM嵌入空间
- 代表机构：Google/TU Berlin

#### 🔬 深入细节
562B参数多模态观察注入LLM嵌入空间


### MOO

```yaml
id: moo
num: 8
name: MOO
full_name: 开放世界物体操作 (MOO)
year: '2023.03'
org: Google
parent: palm_e
paper_url: https://arxiv.org/abs/2303.00905
project_url: ''
category: vlm_finetune
motivation: VLM提取对象掩码增强开放世界操作
```

#### 📝 一句话总结
MOO（Masked Object Objectives）将冻结的视觉语言模型作为对象级先验，通过在第一帧提取目标对象掩码并将其拼接到策略输入中，使机器人策略无需深度相机或额外重标定，就能对未见过的物体、背景和场景进行零样本泛化。

#### 🎯 核心要点
- **对象级先验注入**：利用冻结的 OWL-ViT 从第一帧检测目标对象，只把掩码或中心点作为额外通道输入策略
- **RT-1 风格策略骨干**：图像经 EfficientNet + FiLM + TokenLearner + Transformer 生成 7-DoF 动作 token
- **训练时冻结 VLM**：策略暴露在真实检测误差下学习鲁棒性，而不是对真值掩码过拟合
- **数据效率很高**：仅在 `pick` 技能上扩展对象多样性，就能把对象泛化能力迁移到其他操作技能
- **多模态上游兼容**：掩码既可来自文本描述，也可来自人手指向、视觉查询图或 GUI 标注
- **开放世界扩展性**：与 CoW 等开放词汇导航模块结合后，可以实现“先找到新物体，再操作新物体”的完整系统

#### 🔬 深入细节
##### 系统架构与信息流

![MOO Architecture](https://ar5iv.labs.arxiv.org/html/2303.00905/assets/x2.png)

MOO 的信息流可以概括为三步：

1. **对象定位**：从语言指令中解析对象描述，用冻结 OWL-ViT 在第一帧中检测目标对象
2. **掩码生成**：把对象中心点或掩码渲染为单通道图，与 RGB 图像拼接
3. **策略推理**：只保留动词语义作为语言条件，图像+掩码经 RT-1 风格策略骨干输出动作

作者刻意把 VLM 的参与限制在第一帧，避免实时推理时重复调用大型检测模型。

##### 为什么“单像素掩码”就足够

MOO 很有意思的一点是：它不一定需要完整边界框或精细分割。论文发现，仅用**目标中心点**这种极简表示，也能带来接近完整掩码的效果。

原因在于：
- 对象“是什么”由 VLM 提供
- 对象“大概在哪”由单像素或稀疏掩码提供
- 剩余局部几何与抓取细节则由下游策略从原始图像中补全

这让系统既保留了开放词汇的可扩展性，又避免了过度依赖高质量分割。

##### 关键结论：对象泛化与技能泛化可以解耦

MOO 的最重要发现之一是：即便只在 `pick` 任务里扩展对象多样性，模型也能把“识别和泛化到新物体”的能力迁移到 `move near`、`knock`、`place upright`、`place into` 等其他技能上。

这说明策略内部学到的是两件相对独立的能力：
- 动词条件告诉模型“做什么动作”
- 掩码告诉模型“对哪个对象做”

这种显式的对象条件化，为后续 VLA 的开放世界操作提供了一个非常实用的中间路线。


### RT-2

```yaml
id: rt2
num: 9
name: RT-2
full_name: 机器人Transformer第二代 (RT-2)
year: '2023.07'
org: Google DeepMind
parent: rt1
paper_url: https://arxiv.org/abs/2307.15818
project_url: ''
category: vlm_finetune
motivation: 动作Token化实现互联网知识迁移
```

#### 📝 一句话总结
RT-2 的核心目标是：动作Token化实现互联网知识迁移。

#### 🎯 核心要点
- 核心动机：动作Token化实现互联网知识迁移
- 演化来源：继承或改进自 rt1
- 代表机构：Google DeepMind

#### 🔬 深入细节
动作Token化实现互联网知识迁移


### VoxPoser

```yaml
id: voxposer
num: 10
name: VoxPoser
full_name: 体素价值图组合器 (VoxPoser)
year: '2023.07'
org: Stanford
parent: cliport
paper_url: https://arxiv.org/abs/2307.05973
project_url: ''
category: spatial_3d
motivation: LLM生成3D体素价值图零样本操纵
```

#### 📝 一句话总结
VoxPoser 通过让 LLM 在 3D 体素空间中生成可供性图与约束图，把语言指令转换为可执行的 3D 值图，再由 MPC 在该值图上规划末端轨迹，实现了对开放集物体和开放式指令的零样本真实机器人操纵。

#### 🎯 核心要点
- **三阶段系统**：感知模块负责检测与 3D 重建，LLM 负责生成值图代码，MPC 负责在值图上规划动作
- **3D 值图表示**：把“应该去哪”表示为可供性图，把“不能去哪”表示为约束图，最终合成为任务值图
- **开放词汇感知**：结合 OWL-ViT、SAM、XMem 等模块在开放世界中识别、分割和跟踪物体
- **闭环重规划**：系统以约 5Hz 频率持续重建场景与重算值图，适应物体移动和遮挡变化
- **扰动体素机制**：在约束边界注入噪声，使规划器主动远离危险区域，从而获得更强避碰能力
- **与端到端 VLA 不同**：VoxPoser 不是直接输出动作，而是把高层语义显式投影为 3D 中间表示，增强了可解释性和可组合性

#### 🔬 深入细节
##### 系统流程：从语言到轨迹

VoxPoser 的核心流程是：

1. **感知**：利用 OWL-ViT + SAM + XMem 检测、分割并跟踪场景物体，构建 \(100 \times 100 \times 100\) 左右的 3D 体素空间
2. **值图合成**：让 GPT-4 生成 Python 代码，在 3D 体素网格上定义可供性图与约束图
3. **运动规划**：用 MPC + random shooting 在值图上搜索末端执行器轨迹，并持续闭环重规划

值图的一个直观目标写法是：

$$F_{\text{task}}(\mathbf{p}_j^e) = -\sum_j V(\mathbf{p}_j^e)$$

其中高价值区域代表“应该到达”的空间位置，低价值区域代表障碍或约束。

##### 3D 体素值图的合成机制

核心洞察是将 LLM 视作"零样本代码生成器"。给定场景的 3D 体素网格和物体标签，LLM 输出 Python 代码调用两类原子操作：

- `affordance_map`: 定义"应该去哪"——如"抓住杯子"生成杯子顶部以上 5cm 区域的高值。
- `constraint_map`: 定义"不能去哪"——如"避免碰撞桌面"生成桌面区域的负值。

两类图通过 **加权求和** 融合：$F_{\text{task}} = w_a F_{\text{affordance}} + w_c F_{\text{constraint}}$。LLM 代码还自动计算物体间的空间关系（如"杯子在桌上"→杯子的可供性区域 z 坐标高于桌面）。**扰动体素** 在约束边界注入高斯噪声，迫使 MPC 采样器主动远离危险区域。

##### 闭环在线重规划

系统以 $5\text{Hz}$ 频率执行以下循环：① 摄像机更新场景点云 → ② 重新计算 $F_{\text{task}}$ → ③ MPC 随机射击 1000 条候选轨迹，选 $F_{\text{task}}$ 最高者 → ④ 执行第一步动作。这种设计使得系统可以**在线适应物体移动和遮挡变化**，无需显式状态估计。每次重规划约 $50\text{ms}$，满足实时性要求。

##### 方法价值与局限

VoxPoser 的价值在于它把 LLM 的语义推理结果变成了可解释的空间中间表示，因此非常容易与不同下游规划器组合，也比“直接输出动作”的黑盒 VLA 更容易调试。

但它也有明显局限：
- 依赖外部感知模块，不是端到端方案
- 更偏末端轨迹级规划，对精细接触动力学支持有限
- 主要规划末端路径，未完整覆盖全臂避碰和复杂装配

因此它更像是 “LLM + 3D planning” 路线的重要代表，而不是直接替代端到端 VLA。

Code-as-Policies（Liang et al., 2023）同样用 LLM 生成代码控制机器人，但它是 2D 平面导航 + 刚性动作原语。VoxPoser 的创新在于将 LLM 代码输出**投影到 3D 体素值图**这一通用表示中，使得任何下游规划器（MPC、轨迹优化）都能消费，极大提升了灵活性和避碰能力。

### RoboAgent

```yaml
id: roboagent
num: 11
name: RoboAgent
full_name: 机器人通用智能体 (RoboAgent)
year: '2023.09'
org: CMU/Meta
parent: —
paper_url: https://arxiv.org/abs/2309.01918
project_url: ''
category: diffusion_flow
motivation: 扩散模型扩充演示实现多任务泛化
```

#### 📝 一句话总结
RoboAgent 的核心目标是：扩散模型扩充演示实现多任务泛化。

#### 🎯 核心要点
- 核心动机：扩散模型扩充演示实现多任务泛化
- 代表机构：CMU/Meta

#### 🔬 深入细节
扩散模型扩充演示实现多任务泛化


### RT-X

```yaml
id: rt_x
num: 12
name: RT-X
full_name: 跨形态机器人Transformer (RT-X)
year: '2023.10'
org: Google/OXE
parent: rt2
paper_url: https://arxiv.org/abs/2310.08864
project_url: ''
category: transformer_policy
motivation: 跨形态学习验证不同机器人互助
```

#### 📝 一句话总结
RT-X 的核心目标是：跨形态学习验证不同机器人互助。

#### 🎯 核心要点
- 核心动机：跨形态学习验证不同机器人互助
- 演化来源：继承或改进自 rt2
- 代表机构：Google/OXE

#### 🔬 深入细节
跨形态学习验证不同机器人互助


### RoboFlamingo

```yaml
id: roboflamingo
num: 13
name: RoboFlamingo
full_name: 机器人火烈鸟 (RoboFlamingo)
year: '2023.11'
org: ByteDance/清华
parent: palm_e
paper_url: https://arxiv.org/abs/2311.01378
project_url: ''
category: vlm_finetune
motivation: 解耦VLM与显式策略头的高效方案
```

#### 📝 一句话总结
RoboFlamingo 的核心目标是：解耦VLM与显式策略头的高效方案。

#### 🎯 核心要点
- 核心动机：解耦VLM与显式策略头的高效方案
- 演化来源：继承或改进自 palm_e
- 代表机构：ByteDance/清华

#### 🔬 深入细节
解耦VLM与显式策略头的高效方案


### HPT

```yaml
id: hpt
num: 14
name: HPT
full_name: 异构预训练Transformer (HPT)
year: '2024'
org: 清华/Meta
parent: rt_x
paper_url: https://proceedings.neurips.cc/paper_files/paper/2024/hash/e0f393e7980a24fd12fa6f15adfa25fb-Abstract-Conference.html
project_url: ''
category: transformer_policy
motivation: 处理不同机器人本体感知差异
```

#### 📝 一句话总结
HPT 提出异构预训练Transformer架构，通过模块化的 Stem-Trunk-Head 设计将不同机器人本体（embodiment）的异构传感器和动作空间统一映射到共享表征空间，支持大规模跨本体数据联合预训练后快速迁移到新机器人任务。

#### 🎯 核心要点
- **Stem-Trunk-Head 模块化架构**：感知 Stem（本体特定编码器）将异构传感器数据映射为统一 token，共享 Trunk（Transformer）在统一表征空间学习，动作 Head（本体特定解码器）将表征映射回具体动作
- **跨本体大规模预训练**：在 52 个数据集、多种机器人本体（单臂、双臂、四足、无人机等）上联合训练，总数据量超 20 万条轨迹
- **异构感知对齐**：通过可学习的 Stem 投影器将不同模态（RGB、深度、关节状态、IMU 等）和不同数量的传感器统一为固定长度的 token 序列
- **动作空间解耦**：Head 模块针对不同本体（位置控制、速度控制、关节力矩等）输出相应格式的动作，支持离散和连续动作
- **迁移学习高效**：新机器人仅需少量数据微调 Stem 和 Head，冻结 Trunk 权重保持通用表征能力
- **缩放定律验证**：预训练数据量和模型参数量与下游任务性能呈正相关，验证了机器人基础模型的缩放潜力

#### 🔬 深入细节
##### 4.1 核心示意图

![HPT 架构图](https://liruiw.github.io/hpt/media/figures/framework.png)
*图：HPT 的 Stem-Trunk-Head 模块化架构，不同机器人本体通过共享 Trunk 实现表征统一*

![HPT 概念图](https://liruiw.github.io/hpt/media/figures/concept.png)
*图：HPT 核心思想——不同本体（embodiment）的感知和动作通过可学习的投影和反投影模块对齐到共享空间*

##### 4.2 算法伪代码

```python
# HPT 前向传播核心流程
def hpt_forward(obs, embodiment_id):
    # 1. Stem: 本体特定编码，将异构观测投影为统一token序列
    # obs 可以是任意数量/模态的传感器数据
    tokens = stem[embodiment_id](obs)  # stem: 可学习的线性投影或浅层MLP
    
    # 2. Trunk: 共享Transformer处理统一token序列
    # trunk在所有本体间共享权重
    unified_repr = trunk(tokens)  # Multi-head Self-Attention + FFN
    
    # 3. Head: 本体特定解码，输出对应动作格式
    action = head[embodiment_id](unified_repr)
    return action

# 预训练阶段：在所有数据集上联合训练
for batch in mixed_embodiment_dataloader:
    action_pred = hpt_forward(batch.obs, batch.embodiment_id)
    loss = behavior_cloning_loss(action_pred, batch.action)
    loss.backward()
    optimizer.step()

# 迁移阶段：冻结trunk，仅微调stem和head
trunk.requires_grad = False
for batch in new_robot_dataloader:
    action_pred = hpt_forward(batch.obs, new_embodiment_id)
    loss = behavior_cloning_loss(action_pred, batch.action)
    (stem_loss + head_loss).backward()  # 仅更新新本体的stem和head
    optimizer.step()
```

##### 4.3 方法细节

**动机与背景**：机器人学习领域长期面临数据稀缺问题——传统方法针对特定机器人本体从头训练策略，无法利用其他本体的大量数据。不同机器人的传感器配置（相机数量、是否有力传感器）、动作空间（关节角度 vs 末端位姿、连续 vs 离散）千差万别，直接拼接训练会导致表征空间混乱。HPT 的核心动机是将"本体"（embodiment）视为一个可建模的变量，通过显式的模块化设计实现异构数据的统一预训练。

**核心机制——Stem-Trunk-Head 拆解**：Stem 模块负责"消化"本体特异性。每个本体拥有独立的 Stem，将原始观测 \(o_i\)（可能是一张 RGB 图、一组关节角度、一段力传感器读数，或它们的任意组合）映射为固定数量（如 64 个）的统一维度 token 序列。映射方式灵活——对于图像用轻量 CNN/ViT patch embedding，对于低维向量用 MLP 投影 + 可学习位置编码区分不同传感器通道。Trunk 是核心的共享 Transformer，采用标准的 Multi-head Self-Attention 堆叠，在所有本体间共享权重，这正是实现知识迁移的关键。Head 模块是 Stem 的逆过程——将 Trunk 输出的统一表征解码为特定本体的动作格式，可以是末端位姿的 6D 向量、关节角度序列，甚至离散的动作 token。

> 💡 关键：Stem 和 Head 的设计保证了 Trunk 内部始终处理**相同形状**的 token 序列，无论上游有多少摄像头、下游控制几个关节。这让 Trunk 成为一个真正的"通用策略大脑"。

**训练与迁移流程**：预训练阶段采用行为克隆（Behavior Cloning）目标，在全部 52 个数据集的混合批次上联合优化：\(\mathcal{L} = \mathbb{E}_{(o, a) \sim \mathcal{D}} \| \text{Head}(\text{Trunk}(\text{Stem}(o))) - a \|^2\)（连续动作）或交叉熵（离散动作）。关键技巧是**按本体平衡采样**，防止大数据集本体主导梯度更新。迁移到新机器人时，冻结 Trunk 权重，仅需用少量（如 50-100 条）新本体轨迹微调新的 Stem 和 Head。这种"即插即用"方式大幅降低了新机器人的数据需求，同时保留了预训练学到的通用视觉-运动关联。

**与相关工作的对比**：不同于 RT-X（在固定动作空间的同构机器人间共享数据，本质是数据混合而非架构统一），HPT 首次实现了真正异构本体间的架构级统一。相比 Octo 等基于单一本体设计的通用策略模型，HPT 的模块化设计允许动态扩展新本体类型而无需修改 Trunk 结构。与传统域自适应方法（如 finetuning 全网络）相比，冻结 Trunk 的策略防止了小样本场景下的灾难性遗忘。

##### 4.4 关键公式

**统一观测编码**：设本体 \(e\) 有 \(K_e\) 个传感器，第 \(k\) 个传感器观测为 \(\mathbf{s}_k \in \mathbb{R}^{d_k}\)。Stem 将每个传感器独立编码后拼接为统一 token 序列：

$$\mathbf{z}_k = \text{MLP}_k^{(e)}(\mathbf{s}_k) \in \mathbb{R}^{D} \quad \Rightarrow \quad \mathbf{Z}^{(e)} = [\mathbf{z}_1; \mathbf{z}_2; \dots; \mathbf{z}_{K_e}] \in \mathbb{R}^{K_e \times D}$$

对于图像传感器，MLP 替换为轻量 CNN 或 patch embedding 投影。所有本体投影后的 token 维度 \(D\) 统一（如 \(D=512\)），但 token 数量 \(K_e\) 可不同。

**共享 Transformer 处理**：

$$\mathbf{H}^{(l+1)} = \text{LN}\big(\mathbf{H}^{(l)} + \text{MHA}(\mathbf{H}^{(l)})\big), \quad \mathbf{H}^{(l+2)} = \text{LN}\big(\mathbf{H}^{(l+1)} + \text{FFN}(\mathbf{H}^{(l+1)})\big)$$

其中 \(\mathbf{H}^{(0)} = \mathbf{Z}^{(e)} + \mathbf{P}^{(e)}\)（\(\mathbf{P}^{(e)}\) 为本体特定的可学习位置编码），MHA 为多头自注意力，FFN 为两层 MLP。

**预训练损失（多本体联合 BC）**：

$$\mathcal{L}_{\text{pretrain}} = \sum_{e \in \mathcal{E}} \frac{1}{|\mathcal{D}_e|} \sum_{(o,a) \in \mathcal{D}_e} \ell\big(\text{Head}_e(\text{Trunk}(\text{Stem}_e(o))), a\big)$$

其中 \(\ell\) 为 MSE（连续动作）或交叉熵（离散动作），\(\mathcal{E}\) 为所有训练本体集合。

> ⚠️ 注意：Stem 输出的 token 数量因本体传感器数量而异，但 Trunk 中的自注意力机制天然支持变长序列，因此无需 padding 到统一长度，这避免了不必要的计算浪费。

#### 🧪 练习题
```yaml
question: "HPT 进行新机器人迁移训练时，以下哪个模块的权重通常被冻结？"
options:
  - "Stem（本体特定编码器）"
  - "Trunk（共享 Transformer）"
  - "Head（本体特定解码器）"
  - "所有模块均参与训练"
answer: 1
explain: "迁移时冻结 Trunk 以保留预训练的通用视觉-运动表征，仅微调新本体的 Stem 和 Head，从而在小样本场景下避免过拟合和灾难性遗忘。"
```

### Octo

```yaml
id: octo
num: 15
name: Octo
full_name: 开源通用机器人策略 (Octo)
year: '2024.05'
org: UC Berkeley等
parent: roboagent
paper_url: https://arxiv.org/abs/2405.12213
project_url: ''
category: diffusion_flow
motivation: 开源通用策略支持扩散动作头
```

#### 📝 一句话总结
Octo 的核心目标是：开源通用策略支持扩散动作头。

#### 🎯 核心要点
- 核心动机：开源通用策略支持扩散动作头
- 演化来源：继承或改进自 roboagent
- 代表机构：UC Berkeley等

#### 🔬 深入细节
开源通用策略支持扩散动作头


### OpenVLA

```yaml
id: openvla
num: 16
name: OpenVLA
full_name: 开源视觉语言动作模型 (OpenVLA)
year: '2024.06'
org: Stanford/UCB
parent: rt2
paper_url: https://arxiv.org/abs/2406.09246
project_url: ''
category: vlm_finetune
motivation: 双视觉特征7B超越55B RT-2-X
```

#### 📝 一句话总结
OpenVLA 提出将预训练的 Prismatic-7B 视觉语言模型（DINOv2+SigLIP 视觉编码器 + Llama 2 7B）微调为通用机器人操控策略，通过动作离散化和端到端训练，在 970k Open X-Embodiment 机器人演示数据上训练出仅 7B 参数即超越 55B RT-2-X 的开源 VLA 模型。

#### 🎯 核心要点
- **三组件架构**：DINOv2+SigLIP 双视觉编码器（~600M）→ 2层MLP投影器 → Llama 2 7B LLM 主干
- **动作标记化**：7维连续动作各离散为256 bins，映射到 Llama tokenizer 中最低频的256个token，保留高频token用于文本指令
- **大规模机器人预训练**：在 Open X-Embodiment 数据集 970k 条演示上微调 27 epochs，224×224图像分辨率，学习率 2e-5，batch size 2048
- **训练资源**：64张 A100 GPU，训练耗时约14天
- **关键发现1**：冻结视觉编码器严重损害性能（47.0% vs 69.7% full fine-tune），必须全部解冻微调
- **关键发现2**：DINOv2+SigLIP 双编码器显著优于单一 SigLIP 或 CLIP 编码器，空间推理能力更强
- **超越 RT-2-X**：在 29 个跨机器人形态任务上平均成功率高出 16.5%（绝对值），参数量仅为其 1/7
- **高效微调**：LoRA (rank=32) 仅训练1.4%参数即匹配全参数微调性能（68.2% vs 69.7%），VRAM仅需59.7GB
- **量化推理**：支持 int4 量化，在消费级 RTX 4090 GPU 上以 ~6Hz 运行，不损失下游任务成功率
- **完全开源**：提供模型权重、PyTorch 代码库、微调 notebook 和 VLA 推理服务端

#### 🔬 深入细节
##### 1. 模型架构

![OpenVLA 架构示意图](https://ar5iv.labs.arxiv.org/html/2406.09246/x1.png)
*图：OpenVLA 模型架构。给定观测图像和语言指令，模型预测7维机器人控制动作。三部分：DINOv2+SigLIP 视觉编码器 → MLP投影器 → Llama 2 7B LLM。*

OpenVLA 的架构继承自现代 VLM 的标准设计范式，核心基于 **Prismatic-7B** 视觉语言模型，由三个组件组成：

**(1) 视觉编码器（~600M 参数）**：采用**双编码器融合**设计——DINOv2 和 SigLIP 各处理输入图像（224×224），输出特征向量在通道维度拼接。与仅使用 CLIP 或 SigLIP 的常见方案不同，DINOv2 的加入显著提升了空间推理能力，这对机器人操控任务尤为关键。视觉编码器共输出约 256 个图像 patch embedding。

**(2) 投影器**：一个轻量的 2 层 MLP，将拼接后的视觉特征映射到 LLM 的 token 嵌入空间（4096 维）。

**(3) LLM 主干**：Llama 2 7B，标准 Transformer decoder-only 架构，将视觉 token 与文本指令 token 拼接后自回归生成动作 token 序列。

> ⚠️ 关键设计决策：视觉编码器必须解冻训练。实验表明冻结视觉编码器导致成功率从 69.7% 骤降至 47.0%，原因在于互联网预训练的视觉特征缺乏机器人操作所需的细粒度空间和物理属性表征。

##### 2. 动作离散化与 Token 映射

OpenVLA 将连续动作预测转化为语言模型的标准 next-token prediction 任务，核心机制如下：

**动作空间**：7 维绝对笛卡尔动作向量，包括：
- 末端执行器位置增量 (Δx, Δy, Δz)
- 旋转增量 (Δroll, Δpitch, Δyaw)
- 夹爪开合度 (gripper)

**离散化**：每个动作维度独立离散为 256 个均匀 bins，bin 边界设为训练数据该维度第 1 和第 99 百分位数之间。

**Token 分配**：7 个动作维度 × 256 bins = 1792 个 action tokens，覆盖 Llama 2 tokenizer 中**最低频的 256 个字节级 token**。低频 token 在自然语言中几乎不被使用，因此重映射它们为 action token 不会干扰文本理解能力，同时保留所有高频 token 用于处理语言指令。

**训练时**：模型接收图像 token + 指令 token，自回归生成 7 个 action token，loss 仅计算在 action token 上（标准交叉熵）。

##### 3. 训练流程

```python
# OpenVLA 训练框架伪代码
model = PrismaticVLM(
    vision_encoder=DinoV2_SigLIP(),   # 双视觉编码器 (~600M params)
    projector=MLP(n_layers=2),
    llm_backbone=Llama2()             # 7B params
)
model.vision_encoder.requires_grad = True  # 关键：必须解冻
dataset = OpenX_Embodiment(num_demos=970_000)
optimizer = AdamW(lr=2e-5, weight_decay=0.1)
train_loader = DataLoader(dataset, batch_size=2048)

for epoch in range(27):
    for img, instruction, action_7d in train_loader:
        # 动作离散化：7维 × 256 bins
        action_tokens = discretize(action_7d, bins=256)
        # 拼接视觉 + 指令 + 动作token，仅计算action token loss
        loss = model(img, instruction, labels=action_tokens)
        loss.backward()
        optimizer.step()
# 硬件：64×A100 80GB，训练14天
```

**数据混合**：使用 Open X-Embodiment (OXE) 数据集的全部 970k 条机器人演示，覆盖 22 种机器人形态和数百种任务。与 Octo 和 RT-2-X 使用的更小子集不同，OpenVLA 的全数据混合是其性能优势的关键来源之一。

**预处理**：图像 resize 到 224×224，使用 pixel-level 归一化（与 Prismatic 一致）。文本指令以自然语言形式直接拼接到输入序列中。

##### 4. 高效微调：LoRA 与量化

OpenVLA 的一个核心贡献是证明了**参数高效微调（PEFT）和量化技术可无缝应用于 VLAs**，使其能在消费级 GPU 上适配新任务而不损失性能。

| 微调策略 | 成功率 | 训练参数量 (M) | VRAM (batch=16) |
|---------|--------|----------------|-----------------|
| Full Fine-Tuning | 69.7% | 7,188.1 | 163.3 GB* |
| Last Layer Only | 30.3% | 465.1 | 51.4 GB |
| Frozen Vision | 47.0% | 6,760.4 | 156.2 GB* |
| Sandwich FT | 62.1% | 914.2 | 64.0 GB |
| **LoRA, rank=32** | **68.2%** | **97.6** | **59.7 GB** |
| LoRA, rank=64 | 68.2% | 195.2 | 60.5 GB |

*注：带 * 策略需 2×GPU 分片（FSDP）*

**核心发现**：
- **LoRA rank=32** 达到 68.2%，与 full fine-tuning 的 69.7% 无显著差异，但仅训练 **1.4%** 参数，VRAM 降低 63%
- Sandwich fine-tuning（解冻视觉编码器 + token embedding + 最后一层）达到 62.1%，是 LoRA 之前的轻量替代
- Last layer only（30.3%）表明仅微调输出层远不足以适配新任务
- rank=64 相比 rank=32 无额外收益，表明低秩适配已足够

**量化推理**：OpenVLA 支持 int4 量化部署。在 RTX 4090 消费级 GPU 上，bfloat16 精度推理速度约 **6Hz**，int4 量化进一步降低显存且不损害成功率。模型还提供远程推理服务端，支持实时流式动作预测。

##### 5. 实验结果亮点

- **跨平台评测**：在 WidowX (BridgeData V2) 和 Google Robot 两个机器人平台上进行"开箱即用"评测，覆盖 29 个任务，含视觉、运动、物理和语义泛化四个维度
- **vs RT-2-X (55B)**：除语义泛化外所有类别均超越，平均绝对成功率高出 **16.5%**，参数量仅 1/7
- **语言条件能力**：在需要理解复杂语言指令的任务中表现突出，如"将苹果放入蓝色碗中" vs "将苹果放入红色碗中"
- **Fine-tuning 泛化**：在 Franka 机器人上微调后，OpenVLA 展现出强大的多任务泛化能力，尤其在多物体、强语言指令场景下

> 💡 关键启示：OpenVLA 证明了 (1) 互联网 VLM 预训练 + 大规模机器人数据微调是构建通用机器人策略的有效路径；(2) 开源 7B 模型可超越闭源 55B 模型，关键在于数据混合和视觉编码器选择；(3) LoRA 和量化为 VLA 走进实验室和消费级硬件铺平了道路。

#### 🧪 练习题
```yaml
question: "OpenVLA 为什么选择冻结 Llama 2 tokenizer 中最低频的 256 个 token 重映射为 action token？"
options:
  - "低频 token 在文本生成中损失函数权重更小，便于优化"
  - "保留高频 token 用于理解语言指令，同时利用低频 token 的空间容纳动作离散化为 7×256 bins"
  - "低频 token 的 embedding 向量维度更小，节省显存"
  - "因为 Llama 2 的 tokenizer 恰好有且仅有 256 个低频 token"
answer: 1
explain: "OpenVLA 将 7 维动作各离散化为 256 bins 共需 1792 个 action token。重映射最低频的字节级 token 既能避免占用高频 token 影响语言理解能力，又能利用低信息密度的 token 槽位承载控制信号。"
```

### GR-1/GR-2

```yaml
id: gr1
num: 17
name: GR-1/GR-2
full_name: 傅里叶人形机器人 (GR-1/GR-2)
year: '2024.09'
org: Fourier
parent: rt_x
paper_url: https://www.fftai.com/newsroom-newintech/14
project_url: ''
category: transformer_policy
motivation: 人形机器人端到端全身控制
```

#### 📝 一句话总结
Fourier GR 系列是世界首款量产人形机器人平台，通过 53 个自由度全身关节、自研 FSA 2.0 执行器与基于 Transformer 的端到端全身控制策略，实现了从上层指令到底层关节力矩的直接映射，打破了传统“感知-规划-控制”管道架构，为人形机器人大规模部署提供了完整的硬件-算法闭环方案。

#### 🎯 核心要点
- **端到端全身控制范式**：GR 系列采用 Transformer 策略网络，将多模态感知（RGB 相机、深度、触觉、关节状态）直接映射为 53 自由度全身关节目标位置/力矩，去除模块化分解，实现从视觉到动作的单一前向推理
- **自主研发 FSA 2.0 执行器**：7 种定制化旋转执行器，峰值扭矩 >380 N·m，集成双编码器（电机端 + 输出端）实现高精度位置与力矩闭环控制，串行关节结构使腿部负载能力大幅提升
- **12-DOF 灵巧手**：每只手 6 个主动自由度，集成 6 阵列触觉传感器，可感知接触力与滑动，形成视觉-触觉-本体的完整感知闭环
- **多模态遥操作与数据采集**：支持 VR 遥操作、示教编程和直接指令控制三种模式，可高效采集专家演示数据用于端到端策略训练
- **模块化硬件设计**：可拆卸电池支持续航翻倍，集成布线减少线缆外露，串行关节排布最大化有效工作空间
- **开源工具链**：原生支持 NVIDIA Isaac Lab 与 MuJoCo 物理仿真，提供 ROS SDK 和 Python API，降低端到端策略开发与迁移成本
- **世界首款量产人形机器人**：GR-1 已完成批量交付，GR-2 全面升级，奠定了人形机器人从实验室到产业应用的关键里程碑

#### 🔬 深入细节
##### 核心架构图

![GR-2 全身结构与执行器排布](https://www.fftai.com/_next/image?url=%2Fimages%2Fgr2%2Fgr2-hero.jpg&w=1200)
*图 1：GR-2 人形机器人全身硬件结构——175cm / 63kg / 53DOF，采用串行关节排布与集成布线设计*

![FSA 2.0 执行器](https://www.fftai.com/_next/image?url=%2Fimages%2Fgr2%2Ffsa-actuator.jpg&w=800)
*图 2：FSA 2.0 系列执行器——7 种定制型号，峰值扭矩 >380 N·m，双编码器闭环控制*

##### 算法流程

```
端到端全身控制流程（GR 系列 VLA 视角）：

对于每个控制周期（目标 20-50Hz）：
    1. 传感器输入：
       - Head RGB-D 相机（640×480 或更高分辨率）
       - 12-DOF 灵巧手指尖触觉阵列（6 传感器/手，三轴力+滑动检测）
       - 53 个关节编码器（位置、速度、力矩）
       - 惯性测量单元（IMU）提供基座姿态
       - 可选的语音/文本指令（自然语言任务描述）
    2. 感知编码：
       - 视觉 Transformer 将多帧 RGB-D 图像编码为空间-时序特征
       - 触觉信号经 MLP 编码为紧凑触觉 token
       - 关节状态通过浅层 MLP 编码为 proprioceptive token
       - 指令（文本/语音）经轻量语言编码器（如 USE/CLIP）编码
    3. 多模态融合与动作生成：
       - 所有 token 拼接后送入因果 Transformer Decoder（8-12 层）
       - 输出 53 个关节的目标位置 setpoint（或增量位置/力矩）
       - 输出 12 个手指关节的目标角度
       - 离散化动作分布（256 bins/DIM）或连续回归
    4. 底层闭环：
       - 目标位置经 FSA 2.0 双编码器 PID/阻抗控制器转化为电流指令
       - 执行器以 >1kHz 本地闭环频率执行力矩控制
       - 触觉反馈可用于在线调整抓取力（柔顺控制）
```

##### 动机与背景

传统人形机器人控制沿袭了"感知 → 状态估计 → 任务规划 → 轨迹优化 → 全身控制（WBC）→ 关节伺服"的串行管道。这种模块化设计虽然可解释性强，但存在**误差累积、优化实时性差、环境泛化困难**三大瓶颈。

Fourier 推出 GR 系列的核心理念是：**硬件与算法联合设计**。一方面，自研 FSA 2.0 执行器提供高带宽（>1kHz 电流环）、高反驱透明度（back-drivability），使基于学习的端到端策略能够直接控制底层关节而无需传统 WBC 的 QP 优化层；另一方面，GR-1 的量产实践证明了端到端 Transformer 策略能够在真实世界搬运、装配、巡检等任务中稳定运行。

相比于 RT-1/RT-2 的桌面级机械臂，GR 系列的挑战呈指数级增长：53 个自由度（RT-1 仅 7 维动作）、浮动基座的平衡约束、手-臂-躯干-腿的全身协调、以及高负载下的安全交互。因此，GR 的控制策略需要同时解决**运动控制**（行走、平衡）和**操作控制**（抓取、搬运）——这正是"全身控制"（Whole-Body Control）的核心内涵。

##### 核心技术解析

**1. FSA 2.0 执行器：学习控制的关键使能器**

端到端策略训练的输出通常是关节位置或力矩命令，这要求执行器具有：
- **高带宽通信**：>1kHz CAN/EtherCAT总线，保证神经网络推理结果能快速传递到关节
- **精确的出力控制**：双编码器（电机端 19-bit + 输出端 17-bit）消除传动间隙误差，使策略网络不必建模减速器非线性
- **柔顺与反驱**：低传动比设计（1:9 ~ 1:16）使得机械臂在断电或故障时可手动拖动，也利于基于力矩的阻抗控制
- **高扭矩密度**：峰值 >380 N·m，使得单臂负载 3kg 的同时仍可高速运动

> 💡 关键：FSA 2.0 的本地闭环能力（位置/速度/力矩三种模式可动态切换）为端到端策略提供了"命令接口"——策略网络只需输出高层动作意图（如"膝关节目标角度"），执行器自行完成底层伺服。这种"策略-伺服"的分层架构平衡了端到端的灵活性与工业级稳定性。

**2. 触觉闭环与灵巧操作**

GR-2 的 12-DOF 灵巧手（每手 6 主动自由度）集成了 6 阵列触觉传感器，可感知：
- 法向接触力（量程 0-15N，分辨率 0.01N）
- 切向滑动（通过微振动检测）
- 接触区域热力图

这些触觉信号通过两种路径影响控制：
- **快速反射回路**：当检测到意外滑动时，执行器本地自动增加抓取力，延迟 <5ms，无需经 Transformer 推理
- **慢速策略回路**：触觉 token 作为 Transformer 的输入序列之一，使策略网络学会"根据物体表面特性调整抓取策略"（如：光滑物体用指尖捏取，粗糙物体用手掌包裹）

这种**分层触觉架构**——本地快速反射 + 策略层语义理解——与人类神经系统的脊髓反射 + 大脑皮层控制类似，是 GR 系列实现灵巧操作的关键设计。

**3. 端到端策略的部署与训练框架**

Fourier 官方并未公开具体模型架构，但结合其技术栈（NVIDIA Isaac Lab、MuJoCo、ROS 2）和行业趋势，可推断其端到端策略采用以下技术路线：

- **仿真预训练**：在 Isaac Lab 中构建 GR 的数字孪生（数字躯干），利用并行 GPU 仿真生成海量全身控制数据（行走、抓取、搬运），训练基础运动控制先验
- **Sim-to-Real 迁移**：采用域随机化（动力学参数、视觉纹理、接触参数）+ 执行器输入-输出测量做系统辨识，缩小 Sim-to-Real Gap
- **真实数据微调**：通过 VR 遥操作 + 示教模式采集任务专属演示（如工厂搬运），用行为克隆（BC）或 DPO 微调策略
- **混合控制**：对于行走等安全要求高的子任务，可切换至传统模型预测控制（MPC）+ 全身控制（WBC），操作任务则由端到端策略主导，形成混合架构

##### 与传统方法对比

| 维度 | 传统人形机器人（Atlas, Asimo） | GR 系列（VLA 视角） |
|------|------------------------------|----------------------|
| 控制架构 | 感知→规划→WBC→伺服（多层优化） | 端到端 Transformer 直接输出关节指令 |
| 动作生成 | 离线轨迹优化 + 在线 MPC | 单次神经网络前向推理（20-50Hz） |
| 执行器 | 液压/高传动比减速器 | FSA 2.0 低传动比力矩电机，原生反驱 |
| 触觉 | 极少或无 | 12 指端 6 阵列触觉传感器 + 快速反射 |
| 数据依赖 | 精确模型 + 状态估计 | 仿真 + 遥操作演示 + 微调 |
| 量产状态 | 实验室原型 | 世界首款量产人形机器人（GR-1 已交付） |
| 开源生态 | 封闭 | ROS SDK + Isaac Lab + MuJoCo 支持 |

> ⚠️ 注意：GR 系列本质上是一个**硬件-算法联合平台**，而非单一学术论文中的方法。其控制策略可根据应用需求在传统 WBC 与端到端策略之间灵活切换，代表了"从学术 VLA 到工业落地"的中间态——保留传统方法的安全保障，逐步引入端到端泛化能力。

##### 关键硬件参数速览

**GR-1（初代量产款）**
- 身高：165 cm
- 体重：55 kg
- 自由度：40 DOF
- 单臂负载：2 kg
- 灵巧手：6 DOF × 2（可选）
- 行走速度：1.2 m/s
- 电池：可拆卸，续航 2 小时

**GR-2（升级款）**
- 身高：175 cm
- 体重：63 kg
- 自由度：53 DOF（含 12-DOF 灵巧手）
- 单臂负载：3 kg
- 执行器：FSA 2.0，7 种定制型号，峰值扭矩 >380 N·m
- 灵巧手：12 DOF，6 阵列触觉传感器
- 结构：串行关节排布，集成布线
- 电池：可拆卸，续航翻倍（4 小时）
- 仿真支持：NVIDIA Isaac Lab + MuJoCo + ROS 2 SDK

#### 🧪 练习题
```yaml
question: "Fourier GR-2 中 FSA 2.0 执行器的双编码器设计的主要作用是什么？"
options:
  - "提高电机的最大转速"
  - "消除传动间隙误差，使端到端策略不必建模减速器非线性"
  - "降低执行器功耗"
  - "增加通信带宽"
answer: 1
explain: "FSA 2.0 的电机端编码器（19-bit）和输出端编码器（17-bit）共同工作，可以在执行器本地闭环控制中实时补偿谐波减速器的传动误差、摩擦和回差，使得上层端到端策略只需要关心运动意图（如目标位置/力矩），而不必处理底层传动链的非线性。这是端到端策略能够直接控制 53 自由度全身关节的关键硬件基础。"
```

```yaml
question: "GR 系列与 RT-1 相比，在端到端控制维度上最大的不同是什么？"
options:
  - "GR 使用更大规模的 Transformer"
  - "GR 需要同时解决行走平衡与操作抓取的全身协调问题"
  - "GR 不使用离散化动作空间"
  - "GR 使用强化学习而 RT-1 使用行为克隆"
answer: 1
explain: "RT-1 面向固定基座的机械臂（7 维动作），而 GR 系列是人形机器人（53 维动作），需要在浮动基座下同时处理行走平衡、躯干姿态、手臂操作和手指抓取——即'全身控制'。这要求策略网络不仅要有任务理解能力，还要隐式建模全身动力学约束，是端到端控制从操作型向操作+运动型跨越的关键挑战。"
```

```yaml
question: "GR-2 灵巧手的触觉传感器采用了什么架构来实现快速抓取调整？"
options:
  - "所有触觉信号先经过 Transformer 推理再做反应"
  - "触觉信号直接反馈给执行器本地回路做快速反射，同时作为策略网络的输入 token 做语义级别决策"
  - "触觉传感器仅用于数据记录，不参与控制"
  - "触觉信号通过云端服务器处理后返回控制指令"
answer: 1
explain: "GR-2 采用分层触觉架构：本地快速反射回路在检测到滑动时直接增加抓取力（<5ms 延迟），同时触觉 token 作为 Transformer 输入参与策略推理，使策略学会根据物体特性调整抓取策略。这种设计模仿了人类神经系统的脊髓反射（快速）+ 大脑皮层控制（慢速语义）的双层架构。"
```

### π0

```yaml
id: pi0
num: 18
name: π0
full_name: 物理智能零号 (π0)
year: '2024.10'
org: Physical Intelligence
parent: octo
paper_url: https://www.pi.website/blog/pi0
project_url: ''
category: diffusion_flow
motivation: 流匹配动作专家支持50Hz高频控制
```

#### 📝 一句话总结
π0 的核心目标是：流匹配动作专家支持50Hz高频控制。

#### 🎯 核心要点
- 核心动机：流匹配动作专家支持50Hz高频控制
- 演化来源：继承或改进自 octo
- 代表机构：Physical Intelligence

#### 🔬 深入细节
流匹配动作专家支持50Hz高频控制


### Helix-02

```yaml
id: helix
num: 19
name: Helix-02
full_name: 螺旋双系统架构 (Helix-02)
year: '2025.02'
org: Figure AI
parent: pi0
paper_url: https://www.figure.ai/news/helix
project_url: ''
category: diffusion_flow
motivation: 双系统架构支持200Hz全身控制
```

#### 📝 一句话总结
Helix 提出了一种“System 2, System 1”双系统 VLA 架构，以 7B 参数 VLM 进行 7–9 Hz 的场景与语言理解，引导 80M 参数的 visuomotor Transformer 在 200 Hz 下输出全身连续控制，从而在一个统一模型内实现从语言到全身动作的零样本泛化，解决传统 VLA 模型无法同时兼顾高层语义推理与高频灵巧控制的瓶颈。

#### 🎯 核心要点
- 双系统架构：System 2（7B VLM，7–9 Hz）负责场景理解与语言解释，System 1（80M Transformer，200 Hz）负责实时 visuomotor 控制
- 端到端联合训练：梯度通过 S2→S1 的 latent communication vector 反向传播，两系统共用一组权重
- 全上身控制输出：手腕位姿、手指屈伸/外展、躯干朝向、头部目标，200 Hz 连续动作空间
- 多机器人协同：单一权重同时驱动物理两机器人完成长程操作任务，无需针对任务微调
- 零样本物体泛化：在混乱环境中拾取数千种训练中未见过的家居物品，仅需自然语言指令
- 纯机载低功耗 GPU 推理：全部推理在嵌入式 GPU 上完成，即用型商业部署
- 自动终止条件预测：动作空间附加“任务完成百分比”合成量，便于多技能序列编排
- 训练数据仅约 500 小时遥操作数据，不到先前 VLA 数据集的 5%

#### 🔬 深入细节
![Helix 技能缩放曲线](https://images.ctfassets.net/qx5k8y1u9drj/3iC6I99o9zVebi4YAct58Z/c0f52b7200aee4c9638fe9fb1d9a5788/NEW_SCALING_LAWS.png?fm=webp)
*图: Helix vs 传统方法的技能获取缩放曲线——传统启发式操控依赖 PhD 人工编程，模仿学习依赖海量遥操作数据，而 Helix 通过自然语言即可即时获得新技能。*

##### 动机与背景
传统机器人系统的技能扩展面临严重的瓶颈：每新增一种行为都需要 PhD 级手工编程或数千次遥操作示范。这一范式在工业结构化环境中尚可维持，但在家庭等非结构化场景——涉及成千上万形状、颜色、材质各异的物体——完全不可扩展。

同时，已有 VLA（Vision-Language-Action）模型面临根本性折衷：VLM 骨干具有极强的语义泛化能力，但推理速度太慢（通常只到个位数 Hz）；而 visuomotor 策略能跑 200 Hz，却缺乏泛化。Helix 的核心思路是将两者分离为异步协同的两个系统，打通 VLM 的常识知识到高速动作控制的链路。

##### System 2（S2）—— 慢思考，语义推理
S2 是承载所有语义与场景理解的核心。其设计要点：
- **骨干**: 7B 参数的开源开放权重 VLM，经互联网规模预训练，在推理时微调部署于机载 GPU。
- **输入**: 单目机器人图像 + 机器人状态（手腕位姿、手指位置），通过视觉-语言嵌入空间投影后输入 VLM；外加自然语言指令。
- **输出**: 单个连续 latent vector，将所有语义级任务信息（目标物体类型、容器位置、协作意图等）压缩其中，传递给 S1 进行条件控制。
- **频率**: 7–9 Hz，作为异步后台进程运行，持续更新共享内存中的 latent vector。

> 💡 关键：S2 不做任何动作 token 化。它不输出离散动作码本，而是将高层次意图编码为连续 latent，避免离散化带来的信息损失和复杂的 tokenization 方案，这是 Helix 相对现有 VLA（如 RT-2 等）的重大区别。

##### System 1（S1）—— 快思考，实时执行
S1 是一个 80M 参数的 cross-attention encoder-decoder Transformer，专门为高速闭环控制设计：
- **视觉骨干**: 全卷积多尺度视觉网络，使用纯仿真数据预训练初始化权重，以获取稳健的视觉表征。
- **输入**: 与 S2 相同的图像和状态输入，但在更高频率（200 Hz）下处理，实现即时响应。
- **条件注入**: S2 的 latent vector 被投影到 S1 的 token 空间，沿序列维度与 S1 视觉特征拼接，构成任务条件。
- **输出空间**: 200 Hz 全上身控制，包括手腕目标位姿、手指屈伸控制、手指外展控制、躯干朝向目标、头部朝向目标，以及一个合成的“任务完成百分比”信号。

> ⚠️ 注意: S2 和 S1 并非简单的串行 pipeline，而是异步并行。S2 在后台慢速迭代，S1 读取最新的共享 latent vector 运行实时闭环控制。这样 S1 不会因等待 S2 推理而丢帧。

##### 端到端训练
Helix 从原始像素和文本指令直接映射到连续动作，使用标准回归损失进行端到端训练。梯度从 S1 经 latent communication vector 反向传播到 S2，实现两个系统的联合优化。

训练时引入时序偏移（temporal offset）：在 S1 和 S2 输入之间加入人工延迟，该延迟被校准为部署时 S1/S2 推理延迟的差值。这一步确保训练条件与实际部署的实时控制需求精确对齐，避免训练-部署分布漂移。

<!-- 训练伪代码 -->

```python
# Helix 端到端训练伪代码
for batch in dataloader:
    # S2: 慢速语义推理（7-9 Hz）
    img_s2 = batch.image_s2
    state_s2 = batch.state_s2
    cmd = batch.text_command
    latent = S2(img_s2, state_s2, cmd)  # 输出连续 latent vector

    # S1: 高速控制（200 Hz），用 latent 条件控制
    # 训练中加入 temporal offset 模拟部署延迟
    img_s1 = batch.image_s2[offset:]  # offset 模拟 S2 推理延迟
    state_s1 = batch.state_s2[offset:]
    action_pred = S1(img_s1, state_s1, latent)

    # 回归损失
    loss = MSE(action_pred, batch.ground_truth_action)
    # 梯度经 latent 向量反向传播至 S2
    loss.backward()  # 同时更新 S1 和 S2 参数
```

##### 训练数据
约 500 小时的高质量多机器人、多操作员遥操作数据。为生成自然语言条件训练对，使用自动标注 VLM 对机载摄像头视频片段进行事后指令生成（"What instruction would you have given the robot to get the action seen in this video?"）。所有训练期间接触的物品均被排除在评测之外，确保零样本泛化测试的严格性。

##### 推理部署
推理管线分别在两个机载低功耗嵌入式 GPU 上运行：一个专门跑 S2（异步后台，持续消费最新观察），一个专门跑 S1（实时 200 Hz 控制循环）。S2 持续更新共享内存中的 latent vector，S1 取最新值执行闭环控制。

##### 与传统方法的区别
| 维度 | 传统 VLA（如 RT-2） | 传统 visuomotor 策略 | Helix |
|------|---------------------|----------------------|-------|
| 泛化能力 | 强（VLM 骨干） | 弱（单任务） | 强（S2 驱动泛化） |
| 控制频率 | 低（~1–5 Hz） | 高（50–200 Hz） | 高（200 Hz S1） |
| 动作空间 | 离散 token | 连续 | 连续，全上身 |
| 动作 token 化 | 需要 | 不需要 | 不需要（latent 传递） |
| 多任务 | 需单独头/微调 | 单任务 | 统一权重 |
| 部署 | 需云端 | 可机载 | 纯机载 GPU |

> 💡 关键创新：通过 latent vector 桥接自然语言语义与连续控制信号，Helix 从根本上避免了动作 tokenization 灾难。离散 token 在高维连续空间（如 23 自由度的全上身）中几乎不可扩展，而 latent 传递是唯一可泛化的方案。

#### 🧪 练习题
```yaml
question: "Helix 的双系统架构中，System 2 与 System 1 之间的通信机制是什么？"
options:
  - "将 S2 的语言输出转换为离散动作码本，通过查找表传给 S1"
  - "S2 输出连续 latent vector，通过共享内存异步传递给 S1 作为条件输入"
  - "S2 直接输出关节力矩，S1 负责平滑滤波"
  - "S2 和 S1 共享同一个视觉 backbone，通过注意力矩阵交互"
answer: 1
explain: "Helix 的核心设计是将 S2 的高层语义压缩到单个连续 latent vector，通过共享内存传递给 S1 做条件控制，避免离散 tokenization 方案的信息损失和扩展性问题。"
```

### Long-VLA

```yaml
id: long_vla
num: 20
name: Long-VLA
full_name: 长程视觉语言动作 (Long-VLA)
year: '2025.09'
org: CoRL 2025
parent: openvla
paper_url: https://proceedings.mlr.press/v305/
project_url: ''
category: transformer_policy
motivation: 相位感知输入掩码解决长程任务
```

#### 📝 一句话总结
Long-VLA 提出了一种相位感知的输入掩码策略，将长程操作任务拆成“移动阶段”和“交互阶段”，并据此动态调节不同视觉输入的注意力范围，使统一 VLA 模型能在不改变整体架构的情况下更稳定地完成多步骤长程任务。

#### 🎯 核心要点
- **相位感知输入掩码**：根据当前处于移动还是交互阶段，动态屏蔽或放大某些视觉 token 的注意力
- **数据分解策略**：把整条机器人轨迹按切割点自动拆成移动段和交互段，并显式加入 phase id
- **统一端到端架构**：仍然使用单一多模态 Transformer 编码器 + 条件扩散动作解码器
- **L-CALVIN 基准**：把 CALVIN 的任务链从 5 步扩展到 10 步，系统评估长程操作能力
- **架构无关**：该掩码机制不要求替换模型骨干，本质上是一个可插拔的输入级模块
- **检测增强与目标建模**：结合 Grounding DINO 和 CLIP 目标编码，提高长程导航和交互阶段的目标定位能力

#### 🔬 深入细节
##### 核心思想：为什么长程任务难

长程机器人任务不是简单把短任务串起来。移动阶段与交互阶段对视觉信息的需求不同：
- **移动阶段** 更依赖静态相机和全局目标位置
- **交互阶段** 更依赖夹爪相机和局部细节

如果把所有视觉 token 一视同仁，模型往往会在长程序列中被无关视觉信息干扰，导致注意力分散。

##### 相位感知掩码

Long-VLA 的解决方法是在输入层引入 phase-aware mask。  
当阶段为移动时，屏蔽夹爪相机等局部 token；当阶段为交互时，再激活所有 token。

其直观形式可以写成：

$$M_{ij} = m_i \cdot m_j$$

只有当对应 token 在当前阶段被激活时，它们之间的注意力连接才被保留。

##### 为什么这个方法有效

这个设计的优点在于：
- 不需要重新设计骨干网络
- 不改变动作解码器形式
- 只是通过阶段信息去调度“模型应该关注什么”

因此它特别适合作为现有 VLA 的增强模块。论文在 L-CALVIN 上表明，这种输入级的结构偏置足以显著提升长程连续任务的完成率，说明很多长程失败并非来自控制器本身，而是来自注意力资源分配错误。


### GR00T N2

```yaml
id: groot_n2
num: 21
name: GR00T N2
full_name: 英伟达人形基础模型 (GR00T N2)
year: '2026.03'
org: NVIDIA
parent: helix
paper_url: https://nvidianews.nvidia.com/news/nvidia-partners-with-global-robotics-ecosystem-to-power-production-scale-physical-ai
project_url: ''
category: diffusion_flow
motivation: 世界动作模型预测物理状态演变
```

#### 📝 一句话总结
GR00T N2 的核心目标是：世界动作模型预测物理状态演变。

#### 🎯 核心要点
- 核心动机：世界动作模型预测物理状态演变
- 演化来源：继承或改进自 helix
- 代表机构：NVIDIA

#### 🔬 深入细节
世界动作模型预测物理状态演变


### DFM-VLA

```yaml
id: dfm_vla
num: 22
name: DFM-VLA
full_name: 离散流匹配VLA (DFM-VLA)
year: '2026.03'
org: arXiv
parent: pi0
paper_url: https://arxiv.org/abs/2603.26320
project_url: ''
category: diffusion_flow
motivation: 迭代细化动作Token解决轨迹不稳定
```

#### 📝 一句话总结
DFM-VLA 将离散流匹配（Discrete Flow Matching）引入视觉-语言-动作模型的动作解码阶段，通过在离散 token 空间中进行迭代细化，克服了自回归解码"不可逆承诺"和离散扩散收敛慢的问题，在 CALVIN（Avg. Len. 4.44）和 LIBERO（95.7%）基准上取得 SOTA 性能。

#### 🎯 核心要点
- **核心问题**：AR 解码存在"不可逆承诺"（irreversible commitment），早期 token 错误无法修正并向后传播；离散扩散（DD）虽可迭代但收敛慢、需大量去噪步
- **离散流匹配动作解码**：在 VLA 的动作 token 解码阶段引入离散流匹配，通过连续时间马尔可夫链（CTMC）在离散 token 空间中构建确定性概率路径，实现高效迭代细化
- **两种速度场构造**：Velocity Head（额外 MLP 头预测转移速率）和 Embedding-Guided（利用 LLM 词嵌入相似度隐式构建速度场），后者收敛更快、性能更优
- **两阶段推理策略**：前 \(T_{\text{fine}}\) 步使用 CTMC 随机采样进行迭代细化，后 \(T_{\text{val}}\) 步切换为贪心确定性解码进行验证锁定（默认 14+2）
- **Adaptive Cache 加速**：检测未变化的 token 跳过重复计算，推理速度达 121 Hz，兼顾质量与效率
- **基于 UniVLA 架构**：采用 FAST+BPE 动作编码将连续动作离散化为 token 序列，复用预训练 VLM 的 token 空间
- **CALVIN ABCD→D**：Avg. Len. 4.44（+Embed 变体），5-step 完成率 78.0%，超越 UniVLA（4.18）、ReconVLA（4.25）等基线
- **LIBERO**：四个子套件平均成功率 95.7%，在 Spatial/Object/Goal/Long 上全面领先
- **低数据优势**：10% 数据下 DFM 达 3.21 vs AR 1.71 / DD 2.84，数据效率显著更高

#### 🔬 深入细节
##### 整体架构

![DFM-VLA 整体架构对比](https://ar5iv.labs.arxiv.org/html/2603.26320/assets/x1.png)
*图 1：三种离散动作解码范式对比。(a) 自回归（AR）逐 token 生成，错误不可逆传播；(b) 离散扩散（DD）从全噪声出发逐步去噪；(c) DFM 通过离散流匹配构建确定性概率路径，实现高效迭代细化。*

![DFM-VLA 模型架构](https://ar5iv.labs.arxiv.org/html/2603.26320/assets/x2.png)
*图 2：DFM-VLA 模型架构。左侧为 VLM 骨干（视觉编码器 + 语言模型），右侧展示两种速度场构造方式（Velocity Head 和 Embedding-Guided）以及两阶段推理流程。*

![两阶段推理策略](https://ar5iv.labs.arxiv.org/html/2603.26320/assets/x3.png)
*图 3：两阶段推理策略示意。Stage 1（Iterative Refinement）使用 CTMC 随机采样逐步细化动作 token；Stage 2（Deterministic Validation）切换为贪心解码锁定最终动作。*

##### 算法伪代码

```python
# DFM-VLA: 离散流匹配动作解码核心流程

# === 训练阶段 ===
def train_step(x1, observation, instruction):
    """x1: 目标动作token序列 (FAST+BPE编码)"""
    # 1. 采样时间步 t ~ Uniform(0, 1)
    t = uniform(0, 1)
    
    # 2. 构造插值分布 p_t(x|x1)
    #    p_t(x=x1) = t,  p_t(x=mask) = 1-t
    #    即以概率 t 保持真实token，以概率 1-t 替换为 [MASK]
    mask = bernoulli(1 - t, shape=x1.shape)
    x_t = where(mask, MASK_TOKEN, x1)
    
    # 3. VLM前向传播，获取条件概率 p_theta(·|x_t, obs, inst)
    logits = vlm_forward(x_t, observation, instruction, t)
    
    # 4. 计算交叉熵损失（仅在被mask的位置）
    loss = cross_entropy(logits[mask], x1[mask])
    return loss

# === 推理阶段：两阶段解码 ===
def inference(observation, instruction, T_fine=14, T_val=2):
    T = T_fine + T_val
    dt = 1.0 / T
    
    # 初始化：全部为 [MASK] token
    x = full(action_length, MASK_TOKEN)
    
    # Stage 1: CTMC 随机迭代细化
    for step in range(T_fine):
        t = step * dt
        logits = vlm_forward(x, observation, instruction, t)
        
        # 计算速度场（两种方式之一）
        # 方式A - Velocity Head:
        #   v = velocity_head(hidden_states)  # 额外MLP
        # 方式B - Embedding-Guided (默认):
        #   p_theta = softmax(logits)
        #   v(y|x_t) = p_theta(y) / (1-t)  对 y ≠ x_t
        
        # CTMC 转移：以概率 v(y|x_t)*dt 跳转到新token y
        probs = compute_transition_probs(logits, x, t, dt)
        x = categorical_sample(probs)  # 随机采样
    
    # Stage 2: 贪心确定性验证
    for step in range(T_fine, T):
        t = step * dt
        logits = vlm_forward(x, observation, instruction, t)
        x = argmax(logits, dim=-1)  # 贪心解码
    
    return x  # 最终动作token序列 → FAST解码为连续动作
```

##### 动机与背景

当前主流 VLA 模型的动作解码主要有三种范式：

1. **自回归（AR）解码**：逐 token 从左到右生成，每个 token 一旦生成即"锁定"，无法回溯修正。这种"不可逆承诺"（irreversible commitment）意味着早期的微小错误会通过条件依赖链向后传播，在长序列中导致严重的误差累积。

2. **连续扩散（Continuous Diffusion）**：在连续动作空间中通过去噪过程迭代细化，但需要额外的扩散头，无法复用 VLM 的离散 token 空间，且与语言建模的统一性较差。

3. **离散扩散（DD）**：在离散 token 空间中进行去噪，但其从均匀噪声出发的随机过程收敛较慢，需要大量去噪步才能达到良好性能。

DFM-VLA 的核心洞察是：**离散流匹配（Discrete Flow Matching）可以在离散 token 空间中构建更高效的确定性概率路径**，相比离散扩散的随机游走，流匹配的插值路径更直接、收敛更快。

##### 核心机制：离散流匹配

**概率路径构造**。DFM-VLA 在源分布 \(p_0\)（噪声/mask 分布）和目标分布 \(p_1\)（真实动作 token 分布）之间构建条件概率路径。对于每个目标 token \(x_1\)，条件分布为：

$$p_t(x \mid x_1) = t \cdot \mathbf{1}_{x = x_1} + (1 - t) \cdot \mathbf{1}_{x = m}$$

其中 \(m\) 是 mask token，\(t \in [0, 1]\)。直觉上，随着 \(t\) 从 0 增大到 1，token 从全 mask 状态逐渐"显现"为真实动作 token。

**速度场与 CTMC**。该概率路径对应的连续时间马尔可夫链（CTMC）的速率矩阵为：

$$u_t(y \mid x, x_1) = \frac{p_t(y \mid x_1)}{(1 - t) \cdot p_t(x \mid x_1)} \cdot \mathbf{1}_{y \neq x}$$

> 💡 **关键直觉**：速率矩阵描述了在时刻 \(t\)，当前状态为 \(x\) 时跳转到状态 \(y\) 的"速度"。分子是目标状态的概率质量，分母是当前状态的"剩余时间"——越接近 \(t=1\)，剩余时间越少，跳转速率越高，迫使 token 快速收敛到目标。

**边际化速度场**。训练时我们无法访问 \(x_1\)，因此需要对其边际化：

$$u_t(y \mid x) = \mathbb{E}_{p_{1|t}(x_1 \mid x)} \left[ u_t(y \mid x, x_1) \right] = \frac{p_{1|t}(y \mid x)}{1 - t} \cdot \mathbf{1}_{y \neq x}$$

其中 \(p_{1|t}(y \mid x)\) 是给定当前噪声状态 \(x\) 对目标 token 的后验预测。这正是 VLM 输出的 softmax 概率！

##### 两种速度场构造

**Velocity Head（+Head）**：在 VLM 最后一层隐藏状态之上添加一个独立的 MLP 头，直接预测每个位置的转移速率向量 \(v_\theta(x_t, t) \in \mathbb{R}^{|\mathcal{V}|}\)。优点是解耦了语言建模和速度场预测；缺点是引入额外参数且无法利用预训练词嵌入的语义信息。

**Embedding-Guided（+Embed）**：利用 VLM 的 LM head 输出 logits，通过 softmax 得到 \(p_\theta(y \mid x_t)\)，然后按上述公式隐式构造速度场：

$$v_\theta(y \mid x_t, t) = \frac{p_\theta(y \mid x_t)}{1 - t} \cdot \mathbf{1}_{y \neq x_t}$$

> 💡 **关键优势**：Embedding-Guided 方式直接复用了预训练 LLM 的词嵌入空间，token 之间的语义相似度自然编码在嵌入中，提供了更平滑的优化信号。实验表明该变体收敛更快、最终性能更优。

##### 两阶段推理策略

推理分为两个阶段，总步数固定为 \(T = T_{\text{fine}} + T_{\text{val}}\)（默认 16 = 14 + 2）：

1. **Stage 1 — 迭代细化**（\(T_{\text{fine}}\) 步）：使用 CTMC 的随机采样规则，每步根据速度场计算转移概率并采样新 token。随机性允许模型探索多种可能的 token 组合，避免过早锁定。

2. **Stage 2 — 确定性验证**（\(T_{\text{val}}\) 步）：切换为贪心 argmax 解码，确定性地锁定最终 token。这一阶段消除了随机性带来的噪声，确保输出动作的稳定性。

> ⚠️ **设计权衡**：消融实验表明 \(T_{\text{val}} = 0\)（纯随机）和 \(T_{\text{val}}\) 过大（过早贪心）都会损害性能。最优配置 \(T_{\text{fine}} = 14, T_{\text{val}} = 2\) 在探索与稳定之间取得最佳平衡。

##### 训练细节

- **动作编码**：采用 FAST（Frequency-Adaptive Serialization of Trajectories）+ BPE 将连续动作序列离散化为 token，复用 VLM 的词表空间
- **调度参数**：\(c = 3\)（logit-linear 调度控制噪声分布），\(\alpha = 1\)（采样温度）
- **训练损失**：标准交叉熵，仅在被 mask 的位置计算，与语言建模目标形式一致
- **基础模型**：基于 UniVLA 预训练检点初始化，学习率 \(1 \times 10^{-4}\)，batch size 8，8×H100 GPU
- **训练步数**：仿真 20k–32k 步，真实世界 5k 步

##### 实验结果与分析

**CALVIN ABCD→D**（1000 rollouts，每个含 5 个连续子任务）：

| 方法 | 1-step | 2-step | 3-step | 4-step | 5-step | Avg. Len. |
|------|--------|--------|--------|--------|--------|-----------|
| UniVLA* (AR) | 0.960 | 0.920 | 0.862 | 0.790 | 0.690 | 4.18 |
| ReconVLA | 0.966 | 0.924 | 0.870 | 0.800 | 0.690 | 4.25 |
| DFM-VLA+Head | 0.972 | 0.938 | 0.886 | 0.824 | 0.760 | 4.38 |
| **DFM-VLA+Embed** | **0.978** | **0.948** | **0.892** | **0.840** | **0.780** | **4.44** |

**LIBERO**（4 个子套件，每套件 10 任务 × 50 rollouts）：

| 方法 | Spatial | Object | Goal | Long | Avg. |
|------|---------|--------|------|------|------|
| UniVLA* | 91.4 | 95.8 | 90.6 | 88.2 | 91.5 |
| **DFM-VLA+Embed** | **96.8** | **98.0** | **95.2** | **92.8** | **95.7** |

**推理效率**（CALVIN）：

| 方法 | Avg. Len. | Speed (Hz) |
|------|-----------|------------|
| AR | 4.18 | 50.2 |
| DFM | 4.42 | 60.2 |
| DFM + Adaptive Cache | 4.40 | **121.0** |

**数据效率**（CALVIN，不同数据比例）：

| 数据比例 | AR | DD | DFM |
|----------|-----|-----|------|
| 10% | 1.71 | 2.84 | **3.21** |
| 50% | 3.01 | 3.88 | **4.03** |
| 100% | 4.18 | 4.32 | **4.44** |

> 💡 **关键发现**：DFM 在 10% 数据下相比 AR 提升 +1.50，相比 DD 提升 +0.37，表明离散流匹配在低数据场景下具有显著的数据效率优势。

#### 🧪 练习题
```yaml
question: "DFM-VLA 相比传统自回归（AR）动作解码的核心优势是什么？"
options:
  - "使用更大的模型参数量提升表达能力"
  - "通过离散流匹配实现动作token的迭代细化，避免不可逆承诺导致的误差累积"
  - "采用连续扩散过程在连续动作空间中去噪"
  - "通过增加训练数据量来提升泛化性能"
answer: 1
explain: "DFM-VLA的核心创新在于用离散流匹配替代AR的逐token生成，允许所有动作token在多步迭代中同时被细化和修正，从而避免了AR中早期token错误不可逆传播的问题。"
```

### 盘古具身智能

```yaml
id: pangu_embodied
num: 23
name: 盘古具身智能
full_name: 盘古具身智能大模型 (Pangu-Embodied)
year: '2026.03'
org: 华为
parent: code_as_policies
paper_url: https://www.huawei.com/cn/news/2026/3/huawei-full-stack-tech-2026
project_url: ''
category: llm_planning
motivation: 10步+长程规划星闪纳秒级同步
```

#### 📝 一句话总结
盘古具身智能 的核心目标是：10步+长程规划星闪纳秒级同步。

#### 🎯 核心要点
- 核心动机：10步+长程规划星闪纳秒级同步
- 演化来源：继承或改进自 code_as_policies
- 代表机构：华为

#### 🔬 深入细节
10步+长程规划星闪纳秒级同步


### Gemini Robotics-ER

```yaml
id: gemini_robotics_er
num: 24
name: Gemini Robotics-ER
full_name: Gemini具身推理 (Gemini Robotics-ER)
year: '2026.04'
org: Google DeepMind
parent: rt2
paper_url: https://deepmind.google/discover/blog/gemini-robotics-er-1-6-powering-real-world-robotics-tasks/
project_url: ''
category: vlm_finetune
motivation: 具身推理与Agentic Vision工业安全
```

#### 📝 一句话总结
Gemini Robotics-ER 的核心目标是：具身推理与Agentic Vision工业安全。

#### 🎯 核心要点
- 核心动机：具身推理与Agentic Vision工业安全
- 演化来源：继承或改进自 rt2
- 代表机构：Google DeepMind

#### 🔬 深入细节
具身推理与Agentic Vision工业安全


### UniVLA

```yaml
id: univla
num: 25
name: UniVLA
full_name: 统一视觉语言动作 (UniVLA)
year: '2026.04'
org: ICLR 2026
parent: openvla
paper_url: https://openreview.net/forum?id=UniVLA_Paper_ID
project_url: ''
category: vlm_finetune
motivation: 原生多模态统一Token化达95.5%
```

#### 📝 一句话总结
UniVLA 的核心目标是：原生多模态统一Token化达95.5%。

#### 🎯 核心要点
- 核心动机：原生多模态统一Token化达95.5%
- 演化来源：继承或改进自 openvla
- 代表机构：ICLR 2026

#### 🔬 深入细节
原生多模态统一Token化达95.5%


### HY-Embodied

```yaml
id: hy_embodied
num: 26
name: HY-Embodied
full_name: 腾讯混元具身 (HY-Embodied-0.5)
year: '2026.04'
org: 腾讯
parent: univla
paper_url: https://arxiv.org/abs/2604.07430v1
project_url: ''
category: vlm_finetune
motivation: MoT架构解耦视觉语言22项领先
```

#### 📝 一句话总结
HY-Embodied 的核心目标是：MoT架构解耦视觉语言22项领先。

#### 🎯 核心要点
- 核心动机：MoT架构解耦视觉语言22项领先
- 演化来源：继承或改进自 univla
- 代表机构：腾讯

#### 🔬 深入细节
MoT架构解耦视觉语言22项领先


### NeuroVLA

```yaml
id: neurovla
num: 27
name: NeuroVLA
full_name: 类脑VLA (NeuroVLA)
year: '2026.04'
org: 智平方
parent: hpt
paper_url: https://www.leiphone.com/category/ai/VLA-NeuroVLA-GuoYandong.html
project_url: ''
category: transformer_policy
motivation: 类脑架构0.4W功耗20ms生存本能
```

#### 📝 一句话总结
NeuroVLA 将皮层、小脑、脊髓三层生物运动控制分工映射到 VLA 体系中：高层 VLM 负责语义意图，小脑样模块负责状态调制与阻尼补偿，脊髓样脉冲网络负责高速执行与反射控制，从而在极低功耗下实现更平滑、更安全的具身控制。

#### 🎯 核心要点
- **三层类脑架构**：Cortical 负责语义规划，Cerebellar 负责状态调制与误差补偿，Spinal 负责脉冲式高频执行
- **小脑样 FiLM 调制**：利用 GRU 编码本体感觉历史，生成增益与偏移参数，对高层语义 latent 做动态仿射调制
- **迭代精炼机制**：通过类似 efference copy 的内部循环，在执行前先进行物理状态预测和动作补偿
- **脉冲神经网络执行层**：采用 LIF 神经元和 Spiking ResNet，在神经形态芯片上实现低功耗、高频率执行
- **安全反射能力**：碰撞触发下可在 20ms 量级内走反射回路，不必等待高层 VLM 完成完整推理
- **节能与平滑性**：在低功耗条件下抑制高频抖动，呈现出更接近生物运动系统的平滑轨迹与稀疏激活特性

#### 🔬 深入细节
##### 三层控制分解

NeuroVLA 把具身控制形式化为三层组合映射：

$$
a_t = \Phi_{\text{spine}}\big(\Phi_{\text{cerebellum}}(\Phi_{\text{cortex}}(I_t, L), h_t)\big)
$$

其中：
- **Cortex**：从视觉与语言中提取语义意图
- **Cerebellum**：根据本体感觉历史 \(h_t\) 做状态调制和误差补偿
- **Spine**：以脉冲网络形式执行高频动作并负责快速反射

这种分层设计的关键不是“更复杂”，而是把不同时间尺度的计算分开处理。

##### Cerebellar 模块：把语义计划变成可执行动作

论文中最有价值的创新是小脑样模块。它先用 GRU 编码关节位置、速度、力矩和力觉等历史状态，再通过门控 FiLM 生成调制参数，对高层语义 latent 做仿射调制：

$$
z_{\text{mod}} = (1 + \gamma_t)\cdot(z_{\text{sem}}\cdot g_t) + \beta_t
$$

这个过程相当于让系统在执行前先根据当前身体状态修正“计划中的动作”，例如在接触、摩擦、重力扰动存在时自动增加阻尼或重写局部运动趋势。

##### 脉冲网络与反射控制

执行层采用 stateful LIF 神经元，膜电位在时间上持续积累与衰减，因此即便不显式引入 LSTM，也会自然携带短时记忆。  
在此基础上，Spiking ResNet 保留了深层网络的表达能力，同时维持脉冲激活的稀疏性。

这使 NeuroVLA 在两个方向上与传统 VLA 拉开差异：
- **能耗更低**：神经形态芯片层只需极低功耗
- **反射更快**：危险接触可直接走脊髓样反射回路，而不是等待完整大模型推理

从 VLA 发展脉络看，NeuroVLA 代表的是一种“不是继续堆更大模型，而是重构控制体系本身”的路线。


### π0.7

```yaml
id: pi0_7
num: 28
name: π0.7
full_name: 物理智能零点七 (π0.7)
year: '2026.04'
org: Physical Intelligence
parent: pi0
paper_url: https://www.pi.website/blog/pi0-7-a-steerable-model-with-emergent-capabilities
project_url: ''
category: diffusion_flow
motivation: 组合泛化支持跨多种机器人本体
```

#### 📝 一句话总结
π0.7 通过**多模态提示扩展（Diverse Prompting）**——在训练时向 VLA 模型注入子任务语言、子目标图像和 episode 元数据——使单一 5B 参数的 flow-matching 策略在无需微调的情况下实现组合泛化、跨机器人本体零样本迁移和灵活的语言指令跟随，性能匹配甚至超越针对单任务微调的 RL 专家策略。

#### 🎯 核心要点
- **架构**：5B 参数 = 4B VLM 骨干（Gemma 3 4B + 400M SigLIP 视觉编码器）+ 860M flow-matching 动作专家，采用 block-causal 注意力掩码和知识隔离（Knowledge Insulation）训练
- **多模态上下文 \(C_t\)**：包含任务语言 \(\ell_t\)、子任务语言 \(\hat{\ell}_t\)、最多 3 张子目标图像 \(g_t\)、episode 元数据（质量 1-5、速度、错误标记、控制模式）
- **MEM 视频历史编码器**：4 个相机 × 6 帧历史观测，压缩为固定长度 token 序列，支持长时记忆任务
- **子目标图像生成**：集成 BAGEL 世界模型生成视觉子目标，为跨本体迁移提供视觉类比
- **训练策略**：flow-matching 目标 + 知识隔离（VLM 用 FAST token 交叉熵训练，动作专家梯度不回传 VLM）+ 系统性 dropout（子目标 25%、子任务 30%、元数据 15%）
- **混合数据学习**：融合人类演示、RL 自主评估数据、人类视频和 web 数据，通过元数据消歧不同质量的数据
- **涌现能力**：组合泛化（新任务×新场景×新物体）、跨本体零样本迁移（自动发现适配目标形态的操作策略）、语言 coaching 学习新任务、速度/质量可控

#### 🔬 深入细节
##### 核心架构示意图

![π0.7 架构总览](https://ar5iv.labs.arxiv.org/html/2604.15483v2/assets/x3.png)
*图：π0.7 模型架构。左侧为 VLM 骨干处理多模态上下文（语言、视觉历史、子目标图像、元数据），右侧为 flow-matching 动作专家通过 block-causal 注意力读取 VLM 表征并生成连续动作轨迹。知识隔离确保动作专家梯度不回传至 VLM。*

![多模态提示组成](https://ar5iv.labs.arxiv.org/html/2604.15483v2/assets/x5.png)
*图：π0.7 的多模态上下文 \(C_t\) 组成，包括任务/子任务语言指令、子目标图像和 episode 元数据，训练时通过系统性 dropout 确保推理时各组件可选。*

##### 算法伪代码

```python
# π0.7 训练流程伪代码
# 架构: VLM (4B Gemma3) + ActionExpert (860M flow-matching)

for batch in dataset:
    # === 1. 构建多模态上下文 C_t ===
    obs_history = MEM_encode(cameras[0:4], frames[t-5:t+1])  # 4cam × 6frames → fixed tokens
    task_lang = tokenize(task_instruction)                      # 任务语言 ℓ_t
    
    # 系统性 dropout
    if random() < 0.75:
        subtask_lang = tokenize(subtask_instruction)            # 子任务语言 ℓ̂_t
    if random() < 0.75:
        subgoal_imgs = encode_images(goal_images[:3])           # 最多3张子目标图像
        if subgoal_present and random() < 0.30:
            subtask_lang = None                                 # 子目标存在时额外 drop 子任务
    if random() < 0.85:
        metadata = encode_metadata(quality, speed, mistake, ctrl_mode)
    
    C_t = concat(task_lang, subtask_lang, subgoal_imgs, metadata, obs_history)
    
    # === 2. VLM 前向 (知识隔离) ===
    vlm_tokens = VLM.forward(C_t)                              # Gemma3 处理多模态输入
    fast_loss = cross_entropy(vlm_tokens, FAST_action_tokens)  # VLM 用 FAST token 训练
    
    # === 3. 动作专家前向 (flow-matching) ===
    t_flow = uniform(0, 1)                                     # 采样 flow 时间步
    noise = randn_like(action_chunk)                           # a_{t:t+H}
    x_t = (1 - t_flow) * noise + t_flow * action_chunk        # 线性插值
    
    with stop_gradient(vlm_tokens):                            # 知识隔离: 梯度不回传 VLM
        v_pred = ActionExpert(x_t, t_flow, vlm_tokens)        # 预测速度场
        # ActionExpert 使用 adaptive RMSNorm 注入 t_flow
        # Block-causal attention: expert tokens attend to VLM tokens
    
    flow_loss = MSE(v_pred, action_chunk - noise)              # flow-matching 损失
    
    # === 4. 联合优化 ===
    total_loss = fast_loss + flow_loss
    optimizer.step(total_loss)

# === 推理 (RTC: Rotation-Then-Chunking) ===
def inference(obs, context, num_denoise_steps=10):
    C_t = build_context(obs, context, metadata={"quality": 5, "speed": "fast"})
    vlm_tokens = VLM.forward(C_t)
    x_0 = randn(action_dim * horizon)                         # 50 action tokens
    for k in range(num_denoise_steps):
        t_k = k / num_denoise_steps
        v = ActionExpert(x_0, t_k, vlm_tokens)
        x_0 = x_0 + v * (1 / num_denoise_steps)              # Euler 积分
    # RTC: 旋转拼接多次预测实现平滑轨迹
    return x_0
```

##### 方法细节

**1. 动机与背景**

先前的机器人基础模型（如 π0、RT-2、Octo）面临一个根本矛盾：要在大量任务上表现良好，需要海量高质量数据；但收集每个新任务的专用数据成本极高。这些模型通常只能在训练分布内的任务上工作，缺乏**组合泛化**能力——即将已学会的技能重新组合以解决从未见过的任务。

传统方法的核心缺陷在于：(1) 训练数据中的行为质量参差不齐，但模型无法区分高质量和低质量演示；(2) 模型缺乏足够的上下文信息来理解当前应该执行什么子任务；(3) 不同机器人本体之间的形态差异使得跨本体迁移极为困难。

π0.7 的核心洞察是：通过在训练时提供**丰富的多模态上下文**（语言子任务、视觉子目标、质量元数据），模型可以学会根据上下文调节行为模式，从而在推理时通过组合不同的上下文实现泛化。

**2. 核心机制：多模态提示扩展（Diverse Prompting）**

π0.7 的训练目标为最大化条件对数似然：

$$\max_\theta \; \mathbb{E}_{\mathcal{D}} \left[ \log \pi_\theta \left( a_{t:t+H} \mid o_{t-T:t}, C_t \right) \right]$$

其中 \(a_{t:t+H}\) 是未来 \(H\) 步的动作块，\(o_{t-T:t}\) 是过去 \(T\) 帧的观测历史，\(C_t\) 是多模态上下文。关键创新在于 \(C_t\) 的设计：

$$C_t = \left( \ell_t, \; \hat{\ell}_t, \; g_t, \; m_t \right)$$

- **任务语言 \(\ell_t\)**：高层任务描述（如"折叠T恤"）
- **子任务语言 \(\hat{\ell}_t\)**：当前步骤的细粒度指令（如"用左手抓住衣领"），来源于人类标注或高层策略
- **子目标图像 \(g_t\)**：最多 3 张未来状态的视觉预期，来源于：25% 为片段末帧 + 75% 为均匀采样未来 0-4 秒的帧 + 世界模型（BAGEL）生成
- **元数据 \(m_t\)**：episode 级别的质量评分（1-5）、执行速度、是否包含错误、控制模式（关节/末端执行器）

> 💡 **关键**：训练时通过系统性 dropout（子目标 25% 的 batch 丢弃、子任务在子目标存在时额外 30% 丢弃、元数据 15% 丢弃）确保模型在推理时可以灵活使用任意子集的上下文。这使得同一个模型既可以在无额外提示时自主执行，也可以在有详细 coaching 时精确跟随指令。

**3. 架构设计：VLM + Flow-Matching Action Expert**

π0.7 采用双塔架构，总计约 5B 参数：

- **VLM 骨干（~4B）**：基于 Gemma 3 4B 语言模型 + 400M SigLIP 视觉编码器。处理所有多模态输入（语言、图像、元数据），输出统一的 token 表征。
- **Flow-Matching 动作专家（~860M）**：专门的 Transformer 模块，通过 block-causal 注意力读取 VLM 的输出表征，生成 50 个连续动作 token。使用 **adaptive RMSNorm** 注入 flow 时间步 \(\sigma\)，避免额外的时间步嵌入层。

**知识隔离（Knowledge Insulation, KI）**是关键训练技巧：

$$\mathcal{L}_{\text{total}} = \mathcal{L}_{\text{FAST}}^{\text{VLM}} + \mathcal{L}_{\text{flow}}^{\text{expert}}$$

其中 VLM 使用 FAST token 的交叉熵损失训练，动作专家使用 flow-matching 损失训练，但**动作专家的梯度通过 stop-gradient 不回传至 VLM**。这防止了连续动作回归的梯度破坏 VLM 预训练的语言/视觉理解能力。

> ⚠️ **注意**：知识隔离是 π0.7 能够保持强大语言理解能力的关键。没有它，flow-matching 的连续回归梯度会"污染"VLM 的离散 token 表征空间，导致语言跟随能力退化。

**MEM 视频历史编码器**将 4 个相机 × 6 帧历史（共 24 张图像）压缩为固定长度的 token 序列，使模型能够高效处理视频历史而不会因 token 数量爆炸导致计算瓶颈。

**4. Flow-Matching 动作生成**

动作专家使用 flow-matching 框架生成连续动作轨迹。给定噪声样本 \(x_0 \sim \mathcal{N}(0, I)\) 和目标动作 \(x_1 = a_{t:t+H}\)，训练时构造线性插值：

$$x_\sigma = (1 - \sigma) x_0 + \sigma x_1, \quad \sigma \sim \mathcal{U}(0, 1)$$

模型学习预测速度场 \(v_\theta(x_\sigma, \sigma, z)\)（其中 \(z\) 是 VLM 输出的表征），训练损失为：

$$\mathcal{L}_{\text{flow}} = \mathbb{E}_{\sigma, x_0, x_1} \left\| v_\theta(x_\sigma, \sigma, z) - (x_1 - x_0) \right\|^2$$

推理时通过 Euler 积分从噪声逐步去噪得到动作轨迹。**RTC（Rotation-Then-Chunking）**机制通过旋转拼接多次预测的动作块，实现平滑的轨迹过渡。

**5. 跨本体迁移与涌现策略**

π0.7 展现出令人惊讶的跨本体迁移能力。在折叠任务中，训练数据全部来自小型双臂机器人，但模型能够零样本迁移到形态差异显著的 UR5e 双臂平台：

- 在源机器人上，操作员倾斜末端执行器将织物压在桌面上再抬起
- 在目标 UR5e 上，π0.7 **自动发现**了垂直抓取策略，更适合大型机械臂的运动学特性

这种涌现的策略适配不是简单的动作复制，而是模型理解了任务语义后根据目标本体的物理约束重新规划操作方式。世界模型生成的子目标图像进一步增强了这种迁移，因为它能为目标本体构造合理的视觉类比。

**6. 数据可扩展性与元数据消歧**

在洗衣折叠任务的消融实验中，将数据按质量和速度分为 4 个桶（top 30%、50%、80%、100%）：

- **无元数据**的模型在加入低质量数据后性能反而下降
- **有元数据**的模型随数据量增加持续提升，即使新增数据质量更低

$$\text{Performance}(\text{w/ metadata}) \uparrow \quad \text{as} \quad |\mathcal{D}| \uparrow, \quad \text{even if avg quality} \downarrow$$

这证明元数据有效消歧了不同质量的行为模式，使模型能够从混合质量数据中学习，在推理时通过设置 `quality=5` 选择最优行为模式。

**7. 与先前方法的对比**

| 特性 | π0 | π0.5/π0.6 | π0.7 |
|------|-----|-----------|------|
| 语言跟随 | 弱 | 中等 | 强（开放词汇） |
| 跨本体迁移 | 无 | 有限 | 零样本 + 策略适配 |
| 数据质量处理 | 需过滤 | 需过滤 | 元数据消歧，混合质量可用 |
| 子目标条件 | 无 | 无 | 世界模型生成 |
| 组合泛化 | 无 | 有限 | 新任务×新场景×新物体 |
| 新任务学习 | 需数据收集 | 需微调 | 语言 coaching → 自主策略 |

#### 🧪 练习题
```yaml
question: "π0.7 中知识隔离（Knowledge Insulation）的核心作用是什么？"
options:
  - "加速 flow-matching 动作专家的收敛速度"
  - "防止 flow-matching 连续回归梯度破坏 VLM 预训练的语言/视觉理解能力"
  - "减少 VLM 骨干的参数量以提高推理效率"
  - "使动作专家能够独立于 VLM 进行预训练"
answer: 1
explain: "知识隔离通过 stop-gradient 阻止动作专家的 flow-matching 损失梯度回传至 VLM，防止连续回归信号破坏 VLM 在大规模预训练中获得的离散 token 表征能力，从而保持强大的语言理解和指令跟随能力。"
```

### OpenVLA 2

```yaml
id: openvla2
num: 29
name: OpenVLA 2
full_name: 开源VLA第二代 (OpenVLA 2)
year: '2026.05'
org: OpenVLA Consortium
parent: openvla
paper_url: https://robotwale.com/openvla-2-released-with-improved-generalisation/
project_url: ''
category: vlm_finetune
motivation: 自适应推理模块多机协作泛化提升30%
```

#### 📝 一句话总结
OpenVLA 2 的核心目标是：自适应推理模块多机协作泛化提升30%。

#### 🎯 核心要点
- 核心动机：自适应推理模块多机协作泛化提升30%
- 演化来源：继承或改进自 openvla
- 代表机构：OpenVLA Consortium

#### 🔬 深入细节
自适应推理模块多机协作泛化提升30%


### LaST-R1

```yaml
id: last_r1
num: 30
name: LaST-R1
full_name: 潜在空间推理R1 (LaST-R1)
year: '2026.05'
org: Simplexity/北大
parent: pi0_7
paper_url: https://pandaily.com/simplexity-robotics-pku-and-cuhk-propose-last-r1-achieving-99-9-success-on-libero-benchmark/
project_url: ''
category: diffusion_flow
motivation: 潜在空间物理推理达99.9%
```

#### 📝 一句话总结
LaST-R1 首次将隐式链式推理（Latent Chain-of-Thought）与在线强化学习结合，使视觉-语言-动作模型（VLA）能够在压缩的隐式 token 空间中进行内在思考，并通过 Latent-Action Policy Optimization（LAPO）实现推理与执行的联合优化。

#### 🎯 核心要点
- 提出 **Last0\*** 架构：用 DINOv3 的 top-k 稀疏 token 替代传统 visual summary，将视觉信息压缩为语义丰富的隐式推理锚点
- **latent reasoning tokens**：在 visual/text tokens 与 action tokens 之间插入可学习的隐式 token，模型在其中进行自主推理后再输出动作
- **Latent-Action Policy Optimization (LAPO)**：首次将隐式推理空间纳入 RL 优化目标，含三部分损失（action loss + latent similarity loss + value loss），对 latent token 采用 importance sampling + 序列级 ratio + token 级 mask
- **Adaptive Latent CoT**：通过 M 个候选位置采样 `<latent_end>` 终止 token，温度 β 控制探索，实现推理长度的自适应学习
- **Hybrid Attention Mask**：latent tokens 使用 causal mask 进行自回归推理，action tokens 使用 bidirectional mask 实现并行解码，兼顾推理深度与执行效率
- 在 LIBERO 四套件上达到 **99.8% SOTA**，超 π_RL（98.3%）和 OpenVLA-OFT（97.1%）
- 真实世界 4 任务 RL 后成功率从 52.5% 提升至 **93.75%**
- OOD 泛化显著优于 Action-Only PPO，验证了隐式推理空间对泛化能力的关键作用

#### 🔬 深入细节
##### 动机与背景

传统 VLA 模型面临"死记硬背"困境：模型直接映射感知到动作，缺乏内在推理过程。虽然 Chain-of-Thought（CoT）在 LLM 中取得了巨大成功，但将其应用于机器人存在两大障碍：

1. **语言 CoT 的时延瓶颈**：显式文本推理增加 2-5 秒延迟，对实时控制不可接受
2. **RL 优化断裂**：文本推理与动作执行无法通过 RL 进行端到端联合优化

LaST-R1 的核心洞察：**推理不一定需要显式语言，可以在压缩的隐式空间中进行**——这既保留了推理深度，又解决了延迟和优化问题。

##### Last0\* 架构

![LaST-R1 架构总览图](https://ar5iv.labs.arxiv.org/html/2604.28192/assets/x1.png)
*图：LaST-R1 整体架构——视觉输入经 DINOv3 提取 top-k latent tokens，与 visual/text tokens 拼接后输入 LLM 进行 latent reasoning，最后 action decoder 输出动作块*

模型基于 Qwen3-VL-4B 构建，核心架构如下：

**输入处理**：
- 视觉输入经 vision encoder 提取 N_v 个 visual tokens
- 额外使用预训练 DINOv3 模型提取 top-k 隐式视觉总结 token（离线计算，无额外训练成本）
- 文本指令 token 化后与 visual tokens、latent summary tokens 拼接

**消融实验验证**（Table 1）：
- DINOv3 top-k 方法在 LIBERO-Spatial 上达 97.2%，显著优于 Global Pooling（93.5%）、Convolutional Downsampling（94.8%）、Q-Former（95.1%）
- 隐式 token 长度从 1→8，性能单调提升至 97.2%（长度 1 时仅 93.8%）

**Hybrid Attention Mask 设计**（Figure 6）：
- Vision + Text + Latent tokens：使用 causal lower-triangular mask（自回归生成）
- `<latent_end>` 后 action tokens：使用 bidirectional mask，允许 chunk 内所有 action token 互相 attend
- 该设计实现了"推理串行、执行并行"的效率平衡

##### Latent-Action Policy Optimization (LAPO)

LAPO 是首个将隐式推理空间纳入 RL 优化的框架，其总损失函数为：

$$\mathcal{L}_{LAPO}(\theta) = \mathcal{L}_{action}(\theta) + \lambda_1 \mathcal{L}_{latent}(\theta) + \lambda_2 \mathcal{L}_{value}(\theta)$$

**1. Action Loss（动作损失）**：
基于 PPO-clip 目标，对 action tokens 计算 standard policy gradient：

$$\mathcal{L}_{action} = -\min(r_t(\theta) \hat{A}_t, \text{clip}(r_t(\theta), 1-\epsilon_{\min}, 1+\epsilon_{\max}) \hat{A}_t)$$

其中 ratio \(r_t(\theta)\) 按序列级别计算，\(\epsilon_{\min}=0.2, \epsilon_{\max}=0.28\) 为非对称裁剪。

**2. Latent Loss（隐式损失）**：
对 latent reasoning tokens 采用特殊处理：

- **Importance Sampling**：由于隐式 token 不可直接监督，利用 SFT warm-up 期间计算的 offline DINOv3 GT latent 作为锚点
- **序列级 ratio**：与 action loss 共享同一序列级 ratio（\(r_t(\theta)\)），保持优化一致性
- **Token 级 mask**：仅对 latent token 位置施加损失

$$\mathcal{L}_{latent} = -r_t(\theta) \hat{A}_t \cdot \mathbf{1}_{\text{latent\_position}} \cdot \cos\_\text{sim}(z_{pred}, z_{gt})$$

**3. Value Loss（价值损失）**：
标准 MSE 损失，用于 GAE 优势估计（\(\gamma=0.99, \lambda=0.95\)）。

**超参数消融**（Figure 7）：
- \(\lambda_1=0.1\) 最佳（99.8%），\(\lambda_1=0\) 降至 97.2%，\(\lambda_1=1\) 降至 99.0%
- \(\lambda_2=1\) 最佳（99.8%），\(\lambda_2=0.1\) 降至 97.8%
- \(\lambda_3=0.1\)（transition penalty）最佳，增至 2 降至 98.6%

##### Adaptive Latent CoT

传统方法固定插值长度，无法适配不同任务复杂度。LaST-R1 提出了自适应推理长度机制：

- 设置最大长度 \(L_{max}=8\)，候选终止位置数 \(M=4\)
- 在每个候选位置以概率 \(p(m) \propto \exp(-\beta \cdot m)\) 采样 `<latent_end>` token
- 温度 \(\beta\) 控制探索：\(\beta\) 大 → 偏向短推理（exploitation），\(\beta\) 小 → 偏向长推理（exploration）

**优化目标**包含 transition loss \(\mathcal{L}_{end}\)：

$$\mathcal{L}_{total} = \mathcal{L}_{action} + \lambda_1 \mathcal{L}_{latent} + \lambda_2 \mathcal{L}_{value} + \lambda_3 \mathcal{L}_{end}$$

实验结果（Figure 8）：RL 后模型自动学习到早期退出策略——简单任务用 2-4 步推理，复杂任务保留更长推理。

##### 训练流程

**第一阶段：SFT Warm-up**
- 预训练数据：400K 轨迹（28M 帧），含 Open-X-Embodiment、DROID、ManiSkill 等
- 使用 Qwen3-VL-4B 预训练权重初始化
- 扩展 tokenizer 词表：新增 256 个 action tokens（`<action_i>`，\(i \in [0,255]\)）+ `<latent_end>` token
- 联合优化：cosine similarity loss（latent 对齐）+ CE loss（`<latent_end>` + action tokens），权重比 1:0.1:1
- LIBERO：每任务仅 1 条专家轨迹，训练 10K iterations
- 真实世界：每任务 20 条轨迹，训练 1K iterations

**第二阶段：LAPO RL 在线训练**
- LIBERO：8×H20 GPU，verl+FSDP，每次 rollout 512 条轨迹，4 PPO epochs，学习率 \(3\times10^{-5}\)（actor）/ \(3\times10^{-4}\)（value head）
- 真实世界：Franka Research 3 机器人 + 2×RTX 4090，连续异步 actor-learner 架构，仅更新 LoRA（r=32），冻结基座模型
- 真实世界奖励：任务成功 +10，步惩罚 -0.05

##### 关键实验发现

1. **LIBERO SOTA**（Table 1）：LaST-R1 四套件平均 99.8%，超过所有对比方法
2. **消融 M=4** 最佳，M=1（固定长度）降至 97.5%
3. **执行效率**（Figure 9）：RL 后模型执行步数甚至优于 expert demonstrations
4. **OOD 泛化**（Figure 10）：Action-Only PPO overfitting 严重（20-30%），LaST-R1 持续提升至 54-100%

#### 🧪 练习题
```yaml
question: "LaST-R1 中 LAPO 对隐式推理 token 采用的优化策略是什么？"
options:
  - "直接使用 PPO-clip 进行优化，与 action token 无区别"
  - "采用 importance sampling + 序列级 ratio + token 级 mask，仅对 latent token 位置施加损失"
  - "冻结隐式 token 权重，仅优化 action decoder"
  - "使用 DPO 进行偏好对齐，不涉及 ratio 计算"
answer: 1
explain: "隐式 token 不可直接监督，LAPO 利用 SFT 阶段的 offline DINOv3 GT latent 作为锚点进行 importance sampling，共享序列级 ratio 保持优化一致性，并通过 token 级 mask 仅在 latent 位置施加损失。"
```
