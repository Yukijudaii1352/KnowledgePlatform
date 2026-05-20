---
domain: embodied
topic_id: vla
topic_name: 视觉-语言-动作基础模型
page_icon: 🦾
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

!INCLUDE_RAW ../../pipeline/researcher/output/VLA_survey_new/zhihu__知乎专栏_1951985172259004422__2849017c/article.md

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
BC-Z 提出了一个大规模多任务模仿学习框架，将 100+ 机器人操作任务共享一个控制策略，并通过任务嵌入空间（Task Embedding）实现零样本泛化——训练时仅见过 72 个任务，测试时能执行 28 个全新任务，成功率可达 32%（语言指令）和 4%（视频演示）。

#### 🎯 核心要点
- 构建了一个包含 100+ 机器人操作任务、25,877 条演示的大规模多任务数据集
- 提出基于任务嵌入条件的多任务模仿学习：策略 \\(\pi(a|s, z)\\) 以任务嵌入 \\(z\\) 为条件，而非任务 ID
- 任务嵌入通过编码器 \\(q(z|w)\\) 从语言指令或人类视频中提取，实现跨模态任务指定
- 采用 Hindsight Relabeling（后见重标定）和 HG-DAgger（人工引导 DAgger）高效收集高质量演示数据
- 提出 Adaptive State-Diff 方案：根据动作幅度自适应选择未来状态计算专家动作，避免拟合噪声
- 支持三种任务指定方式：one-hot 任务 ID、自然语言指令、人类操作视频

#### 🔬 深入细节
##### 核心框架图

![BC-Z 系统概览](https://ar5iv.labs.arxiv.org/html/2202.02005/assets/fig1.png)
*图 1：BC-Z 系统概览。左：数据集组成（100+ 任务、25,877 demos、8 名操作员）。右：策略架构——任务嵌入 \\(z\\) 从语言或视频中提取，与状态拼接后输入策略网络 \\(\pi(a|s, z)\\)。*

##### 动机与背景

传统机器人模仿学习面临的关键瓶颈是**数据和泛化**：
- 单任务策略：每个任务需要独立收集大量演示数据，成本高昂且无法泛化
- 多任务策略：虽然可以共享数据，但传统方法（如 one-hot 条件）无法将知识迁移到全新任务
- 任务指定：如何让机器人理解"未见过的任务描述"是一个开放问题

BC-Z 的核心洞察是：**如果任务之间共享底层操作技能（如抓取、放置、推动），那么通过一个共享的嵌入空间，模型就能从已学任务的组合中推断出新任务的执行方式。**

##### 核心机制详解

**1. 任务嵌入条件策略 (Task-Conditioned Policy)**

传统多任务模仿学习使用 one-hot 任务 ID 作为条件：
$$\pi(a|s, \text{task_id})$$

BC-Z 改用任务嵌入作为条件：
$$\pi_\theta(a|s, z), \quad z \sim q_\phi(z|w)$$

其中：
- \\(w\\) 是任务指定信息（语言句子或人类操作视频）
- \\(q_\phi\\) 是任务编码器（Sentence-BERT 用于语言，ResNet-18 用于视频帧）
- \\(z \in \mathbb{R}^{64}\\) 是共享的任务嵌入向量

> 💡 关键：同一个策略网络 \\(\pi_\theta\\) 处理所有任务，任务之间的知识共享通过梯度反向传播自动进行。训练时见过的任务组合方式，使模型能在嵌入空间中"插值"出未见任务的行为。

**2. Adaptive State-Diff 专家动作**

模仿学习需要从演示数据中提取专家动作。传统方法是对相邻帧做差分（state diff）：
$$a_t^{\text{naive}} = s_{t+1} - s_t$$

问题：噪声大、动作不平滑，尤其在演示动作幅度较小时，差分信号接近噪声。

BC-Z 提出 **Adaptive State-Diff**：根据动作幅度自适应选择未来时间步：
$$a_t^{\text{adaptive}} = s_{t+N} - s_t$$

其中 \\(N = \max\\{k \mid \|s_{t+k} - s_t\|_2 < \epsilon\\}\\)，即选择第一个超出阈值 \\(\epsilon\\) 的未来状态。这样确保在慢速动作时扩大差分步长，在快速动作时缩小步长，有效抑制噪声。

> ⚠️ 注意：Ablation 实验表明，去掉 Adaptive State-Diff 直接使用 naive diff（N=1）会导致策略拟合噪声、动作过慢，最终成功率从 52% 降至 3%。

**3. HG-DAgger 数据收集**

HG-DAgger（Human-Guided DAgger）是对经典 DAgger 算法的扩展，允许人工操作员在策略执行过程中进行干预和纠正：

- 策略执行时，操作员观察并通过遥操作设备进行实时干预
- 被干预的轨迹自动标记为"需要纠正"并加入训练集
- 干预次数与最终成功率呈负相关（见图 5），可用作实时性能代理指标

实验表明，用 50% 专家演示 + 50% HG-DAgger 干预数据训练的模型，性能**显著优于**100% 专家演示训练的模型，说明有针对性的干预数据比均匀采样的专家数据更有价值。

**4. Hindsight Relabeling**

为提升数据效率，BC-Z 使用后见重标定技术：
- 在执行轨迹中，即使最终目标未达成，中间步骤也可能完成了其他子任务
- 例如：执行"把瓶子放进碗里"时，过程中可能恰好完成了"抓起瓶子"
- 将这些中间步骤重标定为相应子任务的正面样本，大幅提升数据利用率

##### 训练流程

```python
# BC-Z 训练伪代码
# 多任务演示数据集 D = {(trajectory_i, task_desc_i)}

# 1. 任务编码器 q_phi (使用预训练模型，可冻结)
#   language: Sentence-BERT (all-mpnet-base-v2) -> MLP -> z in R^64
#   video: ResNet-18 (ImageNet pretrained) -> MLP -> z in R^64

# 2. 多任务 BC 训练循环
for batch in dataloader:
    s_t, future_states, task_desc = batch

    # 2.1 提取任务嵌入
    z = task_encoder(task_desc)  # shape: [B, 64]

    # 2.2 Adaptive State-Diff 计算目标动作
    for t in range(T):
        k = 1
        while norm(future_states[t+k] - s_t[t]) < epsilon:
            k += 1
        a_target[t] = future_states[t+k] - s_t[t]  # 自适应差分到第k帧

    # 2.3 策略预测
    a_pred = policy_network(concat(s_t, z))  # MLP: [S+64] -> [A]

    # 2.4 MSE 损失
    loss = mean((a_pred - a_target) ** 2)
    optimizer.step(loss)
```

##### 与传统方法的区别

| 维度 | 传统多任务 BC | 单任务 BC | BC-Z |
|------|-------------|----------|------|
| 任务指定 | one-hot ID | N/A | 语言/视频嵌入 |
| 数据共享 | 部分共享 | 独立 | 全部共享 |
| 零样本泛化 | ❌ | ❌ | ✅ (语言32%, 视频4%) |
| 数据效率 | 中 | 低 | 高 (HG-DAgger + Hindsight) |
| 动作提取 | naive diff | naive diff | Adaptive State-Diff |

##### 实验结果亮点

- **训练任务 21 项平均**：one-hot 42%，语言 40%，视频 24%
- **零样本泛化（28 项未见任务）**：语言 32%，视频 4%
- **Multi-task vs Single-task**：多任务 52% vs 单任务 5%（同一任务）
- **HG-DAgger 提升**：50% 干预数据优于 100% 专家数据（53% vs 27%）

#### 🧪 练习题
```yaml
question: "BC-Z 中 Adaptive State-Diff 的核心作用是什么？"
options:
  - "加速策略网络的推理速度"
  - "根据动作幅度自适应选择差分步长，抑制噪声并提高动作平滑性"
  - "在不同任务之间自适应分配网络容量"
  - "自动调整学习率以适应多任务训练"
answer: 1
explain: "Adaptive State-Diff 根据当前动作幅度动态选择 N（首个超出阈值的未来状态），避免 naive 差分在缓慢动作时拟合噪声，是模型成功的关键设计（去除后成功率从 52% 降至 3%）。"
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
CLIPort 的核心目标是：融合CLIP语义与Transporter几何精度。

#### 🎯 核心要点
- 核心动机：融合CLIP语义与Transporter几何精度
- 代表机构：Google/UW

#### 🔬 深入细节
融合CLIP语义与Transporter几何精度


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
Gato 的核心目标是：单一Transformer处理600+多形态任务。

#### 🎯 核心要点
- 核心动机：单一Transformer处理600+多形态任务
- 代表机构：DeepMind

#### 🔬 深入细节
单一Transformer处理600+多形态任务


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
让大语言模型直接为机器人编写**可执行Python代码**（而非自然语言指令序列），通过**递归组合语言模型程序（LMPs）**形成分层策略，并利用代码的函数调用、变量状态、循环/条件结构、API参数化等编程语言原语，实现复杂长时任务的推理与闭环纠错，显著提升机器人策略的空间泛化力、行为多样性和交互灵活性。

---

#### 🎯 核心要点
- **核心理念：代码即策略（Code as Policies）** — 用LLM生成的Python代码直接作为机器人控制策略，而不仅是生成高层行动计划或子目标序列。代码天然支持状态变量、循环、条件分支、函数递归等，比纯自然语言更具表现力和可组合性。
- **语言模型程序（LMP）** — 将LLM输出的代码视为一种"程序单元"，既可调用现有感知基元和控制API，也可定义新函数供其他LMP调用，形成**递归分层结构**。上层LMP可调用下层LMP来逐步具象化模糊指令。
- **分层代码生成** — 复杂任务被分解为多个LMP的层次调用链：高层LMP将自然语言需求转为带参数的函数调用；中间层LMP定义任务特化的辅助函数（如空间推理、顺序约束处理）；底层LMP直接调用机器人控制API（如 `pick_and_place`）。
- **代码作为"Chain-of-Thought"的强化版** — 精心命名的变量和函数名、中间计算步骤、日志输出等，天然构思维链，且代码能被编译器和运行时检验语法错误，部分逻辑错误也可在仿真中发现。
- **零样本跨实体迁移** — 因为LMP生成的是高层控制逻辑，底层API可被替换为不同机器人的控制原语（如移动基座速度控制、物体操作用夹爪API），实现**同一高层策略在不同实体间的复用**。
- **人机交互新范式** — 用户可以用自然语言给机器人新指令，LLM当场生成新代码片段；也可进行"代码审阅"式的纠错；机器人遇到错误时LLM能生成排查/恢复代码。
- **安全与限制** — 论文展示了仿真和真实机器人上的多样化实验，但生成的代码存在安全风险（语法/语义错误、不安全动作），实际部署需人工监督或沙箱测试。

#### 🔬 深入细节
##### 1. 问题形式化

给定：
- 用户自然语言指令 $\ell$（如："把所有红块放到篮子里，然后在桌上画一个L形"）
- 一组预定义的**控制基元** $\mathcal{A}$（如 `pick(obj)`, `place(pos)`, `draw_shape(coords)`）
- 感知模块 $\mathcal{P}$（返回物体名称/位姿/颜色等结构化信息）

目标是生成一个**可执行的Python代码片段** $c$，使得在机器人上运行 $c$ 能完成指令 $\ell$ 所述任务。CaP 用 LLM 作为转换器：$c \sim \text{LLM}(\text{prompt}(\ell, \mathcal{A}, \mathcal{P}, \text{examples}))$。

![图1: CaP系统概览](https://code-as-policies.github.io/static/images/overview.png)

**图1说明**：用户说"把水壶里的水倒进杯子里"。CaP 生成的LMP代码通过：①调用视觉模块定位物体；②分析物体间空间关系（相对位置、沿轴方向）；③生成机器人轨迹/动作原语序列；④输出执行代码。这一切都在**同一个Python执行环境**中，中间变量、日志等天然可见。

##### 2. 语言模型程序（LMP）的层级结构

CaP 的核心贡献在于提出了**LMP 的分层组合机制**。论文定义了三种层次：

| 层级 | 功能 | 示例LMP |
|------|------|--------|
| **L0**: 控制基元 | 直接驱动机器人的动作原语 | `pick(obj)`, `push(obj, dir)`, `move_to(pos)` |
| **L1**: 感知/空间推理 | 将感知数据结构化，进行空间逻辑推理 | `get_obj_by_relation(base, relation)`, `filter_by_color(objs, color)` |
| **L2**: 任务规划 | 将自然语言分解为L1/L0调用序列 | 主LMP函数体，含循环、条件和分层调用 |

这种分层的关键优势：**上层LMP无需知道底层API细节**。换一个机器人时，只需替换L0基元，L1和L2代码无需修改。

![图2: 分层代码生成示意](https://code-as-policies.github.io/static/images/hierarchy.png)

**图2说明**：示例指令"stack blocks in the empty bowl"。LLM 生成的高层代码调用 `parse_obj` 获取物体名，再调用 `stack_objs_in_order`。该函数由另一个LMP定义（右上方），内部循环调用 `put_first_on_second` 这一L0基元，实现块块堆叠。此即**函数式递归组合**：每个LMP既可被LLM生成，也可被其他LMP调用。

##### 3. 提示词工程：分层提示 + Few-Shot

CaP 使用**分阶段提示**来生成不同层次的LMP：

```
阶段1: 定义L1辅助函数 → 阶段2: 定义任务特化的组合函数 → 阶段3: 生成主执行代码
```

每个阶段的提示包含：
- **角色描述**：如 "You are a helpful robot assistant that writes code to control a robot."
- **可用API清单**：带签名的函数列表及简短说明
- **Few-Shot示例**：2-4个代码生成示例，展示如何将自然语言转换为正确的API调用
- **当前感知状态**（可选）：当前场景中物体的名称、位置、属性等结构化数据，作为代码中的初始变量

```python
# CaP 提示结构示例（简化版）
system_prompt = """
# Robot Control Code Generation
Available functions:
- pick(obj_name: str): pick up the named object
- place(x: float, y: float): place held object at position
- get_pos(obj_name: str) -> (float, float): get object position
Write Python code that uses these functions to achieve the user's instruction.
"""
```

##### 4. 算法伪代码

论文的Algorithm 1描述了CaP的核心流程：

```
Algorithm 1: Hierarchical Code-as-Policies Generation
─────────────────────────────────────────────────────
Input: Natural language instruction l,
       Base API primitives A = {f1, f2, ..., fn},
       Perception module P,
       Pre-trained LLM (e.g., Codex, PaLM)
Output: Executable Python policy code C

1:  state ← P()                              ▷ 获取当前场景感知状态
2:  prompt ← BUILD_BASE_PROMPT(A, state)     ▷ 构建含API清单+状态的基础提示
3:  H ← {l}                                  ▷ 初始化LMP层级栈，顶层为用户指令
4:  C ← ""
5:  while H is not empty do
6:      h ← H.pop()                          ▷ 取当前待处理的指令/函数签名
7:      if h IS_USER_INSTRUCTION then
8:          prompt_h ← prompt + INSTRUCTION_PROMPT(h, examples)
9:          c_h ← LLM(prompt_h)              ▷ 生成主执行代码
10:         C ← c_h
11:     else if h IS_UNDEFINED_FUNCTION then
12:         prompt_h ← prompt + FUNCTION_DEF_PROMPT(h, examples)
13:         c_h ← LLM(prompt_h)              ▷ 生成函数定义
14:         C ← INSERT_FUNCTION_DEF(C, c_h)
15:     end if
16:     H ← H ∪ EXTRACT_UNDEFINED_CALLS(c_h) ▷ 提取未定义函数，推入栈
17: end while
18: return C
```

该算法的核心创新在于**递归展开未定义函数**：当LLM生成的代码中调用了尚未定义的函数时（如 `stack_in_order()`），算法自动将该函数签名推入待处理栈，再调用LLM生成其函数体。最终得到一棵完整的函数调用树。

##### 5. 关键实验与发现

**空间推理的代码表达**：传统VLA模型难以表达复杂的空间关系（如"离门最近的杯子"、"沿墙排成L形"）。CaP通过代码中的数学运算（距离计算、排序、几何变换）优雅地解决：

```python
# 示例：把离门最近的杯子放到桌子上
door_pos = get_pos('door')
cups = [o for o in get_objects() if 'cup' in o]
nearest_cup = min(cups, key=lambda c: dist(get_pos(c), door_pos))
pick(nearest_cup)
place(table_pos)
```

**多模态交互与纠错**：CaP支持"代码反馈循环"——机器人执行代码后若失败，LLM可根据错误信息生成修正代码。论文展示了一个场景：机器人抓取失败后，LLM生成代码"后退、重新定位、再尝试"（即重试逻辑）。

**跨实体泛化**：在移动机器人（基于语言指令的导航+操作）和固定臂（桌面物体重排）两种场景间，CaP只需替换L0控制基元，高层L1/L2代码可完全复用，验证了代码层面的抽象能力。

##### 6. 局限性分析

- **语法/语义错误风险**：LLM生成的代码可能包含运行时错误（如空列表索引、类型不匹配），论文报告约30-40%的生成代码需事后再生成或人工修正；
- **计算开销**：复杂任务需要多轮LLM调用（为每个未定义函数递归生成），延迟较高；
- **安全边界**：代码可直接控制物理机器人，恶意或错误代码可能造成损害；论文仅在实验室环境中测试，未涉及安全沙箱；
- **感知耦合度**：代码中硬编码了感知函数名（如 `get_color`），若新环境中的感知API不同，需手动适配。

---

#### 🧪 练习题
```yaml
**Q1（最简单）**：CaP提出的"语言模型程序（LMP）"与传统的"LLM直接生成动作序列"有何本质区别？这种区别为何能提升泛化能力？

**Q2（中等）**：论文Algorithm 1中的递归展开未定义函数机制（步骤16），与标准的Chain-of-Thought有何异同？请从"可验证性"和"模块化复用"两个角度分析。

**Q3（挑战）**：假设你想将CaP部署到一台全新的农业机器人上（如采摘苹果）。请列出需要替换/适配的模块，并说明哪些LMP层级可以复用、哪些需要重新获取Few-Shot示例。

**Q4（开放）**：论文提到约30-40%的生成代码需要二次修正。若要求你设计一个"验证+自动修正"模块来降低出错率，你会如何利用CaP的多轮生成能力和机器人的仿真/现实环境反馈？请勾勒大致流程。

---

> *本文基于Google Research Blog文章 [Code as Policies: Language Model Programs for Embodied Control](https://ai.googleblog.com/2022/11/code-as-policies-language-model.html) 及原始论文 [arXiv:2209.07753](https://arxiv.org/abs/2209.07753) 精读撰写。*
```

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
RT-1 提出 Robotics Transformer 架构，将图像-语言输入编码为离散动作 token，在 130k 真实机器人演示数据上训练，实现 700+ 指令的 97% 成功率和比最佳基线高 25% 的新任务泛化能力。

#### 🎯 核心要点
- 端到端 Transformer 架构：FiLM-EfficientNet（图像编码）+ TokenLearner（压缩）+ Transformer（序列决策）
- 大规模真实世界数据：130k demos，13 个机器人，17 个月收集，覆盖 700+ 指令、8 类技能
- 离散化动作空间：将动作（arm position + base movement + gripper）离散化为 256 个 bin，使用 CCE loss 训练
- 3Hz 闭环推理：通过 TokenLearner 压缩视觉 token（从 81 到 8），移除自回归动作生成，实现实时推理
- 异构数据融合：仿真数据 + 不同机器人数据合训，提升长程任务泛化
- 新任务零样本泛化：76% 未见指令成功率，背景鲁棒性比基线高 18%

#### 🔬 深入细节
##### 动机与背景

机器人学习面临三大挑战：
1. **数据稀缺**：机器人数据远少于视觉/语言领域
2. **任务多样性**：传统方法每任务单独建模，无法泛化
3. **实时推理**：Transformer 推理速度难以满足机器人闭环控制

RT-1 借鉴 CV/NLP 的大规模预训练范式，首次在真实机器人数据集上训练统一 Transformer 模型，同时处理 visual、language、action 多模态信号。

##### 核心架构

![RT-1 架构总览](https://ar5iv.labs.arxiv.org/html/2212.06817/assets/figures/fig1.png)
*图：RT-1 架构总览。图像经 FiLM-EfficientNet 编码后与指令文本融合，通过 TokenLearner 压缩为 8 个 token 输入 Transformer，输出离散化动作。*

**输入阶段：FiLM-conditioned EfficientNet**

- 6 帧历史图像（300×300×3）→ ImageNet 预训练 EfficientNet-B3 提取特征
- 文本指令通过 Universal Sentence Encoder 编码为 512 维嵌入
- FiLM 层将语言特征作为条件注入视觉编码器（仿射变换：γ·x + β），实现早期多模态融合
- 输出：9×9×512 = 81 个视觉 token

**TokenLearner 压缩**

- 将 81 个视觉 token 学习加权压缩为 8 个 token
- 每个输出 token 是 81 个输入的空间注意力加权和
- 大幅降低 Transformer 计算量（81² → 8²），保证 3Hz 推理

**Transformer 序列建模**

- 仅 8 层 decoder-only Transformer（35M 参数，比原 Gato 1.2B 小 34 倍）
- 输入：TokenLearner 输出的 8 个视觉 token + 历史 6 步动作 token
- 输出：下一时刻动作 token

**离散化动作空间**

所有动作维度统一离散化到 256 个 bin：

- Base displacement (x, y, yaw)：11 个类别（7 种平移 + 3 种旋转 + stop）
- Arm position (x, y, z, roll, pitch, gripper open)：每维 256 bin
- 动作 head 使用 **Categorical Cross Entropy loss**（而非连续回归）
- 每个时间步独立吞吐，无自回归（保证 3Hz：~330ms/step）

##### 训练数据

| 技能 | 数量 | 示例指令 |
|------|------|----------|
| Pick Object | 130 | pick iced tea can |
| Move Object Near | 337 | move pepsi can near rxbar |
| Place Upright | 8 | place water bottle upright |
| Knock Over | 8 | knock redbull can over |
| Open/Close Drawer | 6 | open the top drawer |
| Place into Receptacle | 84 | place chip bag into bowl |
| Pick from Receptacle | 162 | pick jalapeno chip bag from bowl |
| Long-horizon | 9 | open jar of pistachios, grab scooper |

总计 744 条指令，130k demonstrations，13 台机器人 17 个月收集。

##### 实验结果

| 指标 | Gato | BC-Z | BC-Z XL | **RT-1** |
|------|------|------|---------|----------|
| Seen Tasks | 65% | 72% | — | **97%** |
| Unseen Tasks | 52% | — | — | **76%** |
| Distractors | 43% | — | — | **83%** |
| Backgrounds | 35% | 41% | — | **59%** |
| Long-horizon L1/L2/L3 | 63/25/0 | 38/50/50 | 63/75/38 | **88/75/50** |

RT-1 在各项指标上全面超越基线，尤其在 seen tasks 超 Gato 32%，unseen tasks 超 24%，long-horizon 综合 70% vs Gato 30%。

##### 关键消融发现

- **TokenLearner 至关重要**：移除后 Transformer 输入从 8 → 81，推理延迟翻倍，无法达到 3Hz
- **FiLM 条件优于 late fusion**：早期视觉-语言融合比 Transformer 中拼接文本更强
- **离散化动作 + CCE loss** 优于连续回归 MSE loss
- **数据多样性 > 数据量**：增加技能种类比增加同类数据更有效
- 异构数据合训（仿真 + 不同机器人）将长程任务 L3 泛化从 0 → 50%

> 💡 关键：RT-1 的核心创新不在 Transformer 架构本身，而在于 (1) 大规模真实数据收集 + (2) TokenLearner 视觉压缩 + (3) 离散化动作空间，三者的工程耦合使得 Transformer 首次能够在真实机器人上达到实用级性能。

> ⚠️ 注意：RT-1 未使用自回归动作生成——每个时间步的动作直接 one-shot 输出，这牺牲了一定的动作连续性但换取了 3Hz 的关键延迟优势。

#### 🧪 练习题
```yaml
question: "RT-1 中 TokenLearner 的主要作用是什么？"
options:
  - "增强文本指令的语义理解能力"
  - "将 81 个视觉 token 压缩为 8 个，降低 Transformer 计算量以实现实时推理"
  - "生成更高质量的动作离散化 bin"
  - "替代 ImageNet 预训练的 EfficientNet 编码器"
answer: 1
explain: "TokenLearner 通过空间注意力将 81 个视觉 token 压缩到 8 个，使 Transformer 计算量从 O(81²) 降至 O(8²)，是实现 3Hz 实时推理的关键设计。"
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
MOO 利用预训练的视觉语言模型（OWL-ViT）从自然语言指令中提取物体掩码，将"开放世界物体"的视觉概念注入视觉-语言-行动（VLA）策略 RT-1，使机器人能够零样本操作训练中从未见过的物体。

#### 🎯 核心要点
- 提出 MOO 框架：将预训练 VLM 的开放世界理解能力与机器人 VLA 策略结合，无需对 VLA 策略本身做任何参数修改
- 使用 OWL-ViT（开放世界定位视觉Transformer）作为 VLM，根据自然语言指令中的物体描述生成包围框和单像素掩码
- 设计"单像素掩码"（Single-Pixel Mask）策略：在物体中心保留1个像素作为未知物体的"概念锚点"，既不暴露物体精确形状（防止过拟合），又提供方向性空间引导
- 提出 CoW-MOO（Chain of Well-MOO）：将 MOO 与链式提示结合，支持复合物体操作任务（"先拿起X，再放进Y"），扩展至导航-操作联合任务
- 在真实机器人上完成 1472 次评估，pick 任务成功率提升 50%+，且对训练未见过的物体类别保持鲁棒
- 多模态输入：RGB图像 + 自然语言指令 → VLM提取掩码 → 注入RT-1策略作为辅助输入通道
- 关键发现：简单的一像素标注比全分割掩码效果更好——验证了"最小有效信息"设计原则

#### 🔬 深入细节
##### 1. 核心架构

![MOO 框架架构图](https://ar5iv.labs.arxiv.org/html/2303.00905/assets/fig1.png)
*图：MOO 框架概览。OWL-ViT 从 RGB 图像和自然语言指令中提取物体边界框，生成单像素掩码后作为额外通道输入 RT-1 策略网络。*

MOO 的核心架构包含三个组件：

**(a) 视觉语言模型（VLM）：OWL-ViT**

OWL-ViT（Open-World Localization ViT）是 Google 在 2022 年提出的开放世界目标检测模型。它结合了 Vision Transformer（ViT）作为图像编码器和一个文本编码器，通过对比学习在大量图像-文本对上预训练，具备强大的开放世界语义理解能力。MOO 使用 OWL-ViT 来完成两项任务：
1. 从 RGB 图像中检测与自然语言描述匹配的物体
2. 输出该物体的包围框（bounding box）和置信度得分

与传统物体检测器不同，OWL-ViT 无需针对特定类别训练——它可以直接理解任意文本描述（如"the blue cup"或"a small green toy"），并定位对应物体。

**(b) 单像素掩码生成器**

这是 MOO 最具创新性的设计。给定 OWL-ViT 检测到的包围框，系统只保留包围框几何中心位置的 **1个像素** 作为掩码。具体操作：
- 计算包围框中心坐标 \( (x_c, y_c) = (
rac{x_1+x_2}{2}, 
rac{y_1+y_2}{2}) \)
- 生成一个与输入图像同尺寸的二进制掩码 \( M \)，其中只有 \( M[x_c, y_c] = 1 \)，其余为 0
- 该单像素掩码作为第4个通道（RGB+Mask）与原始RGB图像拼接，输入RT-1策略网络

**为什么是单像素？** 论文通过实验证明，全分割掩码（full segmentation mask）反而会降低性能。原因：
- 掩码过大会遮盖物体的外观细节（颜色、纹理），而这些信息对操作至关重要
- 过曝的掩码会鼓励策略网络依赖掩码而忽略RGB信息，导致泛化能力下降
- 一像素标注提供了一个简洁的*注意力引导*（attention cue），告诉策略"关注这个方向"，同时又迫使策略必须参考RGB图像中的实际外观来理解物体

**(c) RT-1 策略网络**

RT-1（Robotics Transformer 1）是 Google 在 2022 年提出的视觉-语言-行动（VLA）模型。它是一个基于 Transformer 框架的端到端策略，输入为 RGB 图像序列 + 自然语言指令，输出为机械臂末端执行器的 6-DoF 动作（位置、旋转、夹爪开合）。MOO 将单像素掩码作为额外输入通道与 RGB 图像叠接，**不修改 RT-1 的任何参数**——这意味着所有开放世界泛化能力完全来自 VLM 提供的掩码信息。

##### 2. 推理流程

```
Step 1: 接收自然语言指令（如 "pick up the red apple"）
Step 2: 从指令中提取物体描述短语 "red apple"
Step 3: OWL-ViT 在 RGB 图像上定位 "red apple"，输出包围框
Step 4: 计算包围框中心，生成单像素掩码
Step 5: [RGB, Mask] 4通道输入 RT-1 策略
Step 6: RT-1 输出动作序列，控制机械臂执行
```

##### 3. 核心公式

给定指令描述 \( t \)，RGB 观测 \( I \in \mathbb{R}^{H 	imes W 	imes 3} \)，OWL-ViT 输出包围框：

222615
B = 	ext{OWL-ViT}(I, t) = (x_1, y_1, x_2, y_2)
222615

单像素掩码生成：

222615
M[x, y] = egin{cases}
1 & 	ext{if } x = 
rac{x_1+x_2}{2}, \; y = 
rac{y_1+y_2}{2} \
0 & 	ext{otherwise}
\end{cases}
222615

策略推理：

222615
a = \pi_{	ext{RT-1}}([I, M], t)
222615

其中 \( [I, M] \) 表示通道维度的拼接（3+1=4通道），\( \pi_{	ext{RT-1}} \) 为冻结的 RT-1 策略，**无任何额外训练**。

##### 4. 设计动机与哲学

> 💡 **关键洞见**：机器人操作不需要精确的语义分割。操作任务需要的不是"物体是什么形状"，而是"物体在哪里"和"它长什么样"。单像素提供了位置线索，RGB图像提供了外观信息，两者结合已足够。

**传统方法的局限**：
- 分类器只能处理预定义类别集，无法泛化到未见过的物体
- 实例分割需要像素级标注和特定类别训练
- 端到端训练需要大量配对新物体的演示数据

**MOO 的优势**：通过 VLM 桥接自然语言和视觉感知，实现零样本泛化，无需任何额外训练数据或参数更新。

##### 5. CoW-MOO 扩展

CoW-MOO（Chain of Well-MOO）将 MOO 扩展到复合指令：

- 将复杂指令（"pick up the apple and place it in the bowl"）分解为原子子任务（pick apple → place in bowl）
- 每个原子子任务独立调用 MOO 获取物体掩码
- 通过链式提示（Chain-of-Thought prompting）串联执行
- 扩展支持导航+操作联合任务（先导航到目标区域，再执行操作）

##### 6. 关键实验发现

- **Pick 任务**：MOO 相比无掩码的基线 RT-1，成功率提升约 50%（从 ~30% 到 ~80%），尤其在"未见过的物体"子集上优势显著
- **单像素 vs 全掩码**：单像素显著优于完整包围框掩码，验证了"少即是多"的设计原则
- **多模态消融**：仅用文本或仅用掩码均不如文本+掩码组合，说明两种模态互补
- **泛化能力**：对训练集中从未出现的物体类别（如特定玩具、蔬菜），MOO 仍能保持竞争力

#### 🧪 练习题
```yaml
question: "MOO 使用单像素掩码而非全分割掩码的核心原因是什么？"
options:
  - "单像素掩码计算速度更快，适合实时控制"
  - "单像素提供位置注意力引导，同时保留RGB外观细节，防止策略过拟合于掩码形状"
  - "OWL-ViT 只能输出包围框中心，无法生成完整掩码"
  - "单像素掩码可以减少RT-1策略的输入维度"
answer: 1
explain: "全分割掩码会遮盖物体外观信息并鼓励策略过度依赖掩码形状，损害泛化能力。单像素提供方向性空间引导，迫使策略必须结合RGB外观理解物体，从而实现更好的开放世界泛化。"
```

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
RT-2 将视觉语言模型（PaLI-X / PaLM-E）通过将动作离散化为文本 token 的方式进行 co-fine-tuning，使 VLM 直接输出机器人动作，无需专门的动作头，从而借助大规模网络数据预训练知识在未见过的任务、物体和场景中展现出 emergent 泛化能力。

#### 🎯 核心要点
- 提出了 VLA（Vision-Language-Action）范式：将机器人动作表示为文本 token，使 VLM 在保留网络知识的同时输出动作
- 动作 tokenization：将连续动作（6-DoF 末端执行器位移）离散化为 256 个 bin，映射到模型词汇表中保留的低频 token（PaLI-X 用 8 个独立整数 token 表示，PaLM-E 覆盖 256 个保留 token）
- 基于两个 VLM 骨干：PaLI-X（55B，视觉语言模型）和 PaLM-E（12B，具身语言模型），在机器人数据与原网络数据上 co-fine-tuning
- Co-fine-tuning 策略：混合机器人演示数据与原始 VLM 训练数据（如 PaLI-X 的图像描述/问答数据），防止灾难性遗忘
- 输出约束（output constraint）：推理时强制模型只从合法动作 token 中采样，确保输出有效动作
- 三分类 emergent 能力：符号理解（Symbol Understanding）、推理（Reasoning）、人类识别（Human Recognition），均超越仅用机器人数据训练的基线
- Chain-of-Thought（CoT）变体：将 CoT 推理步骤作为额外文本 token 介入，使模型先推理再输出动作，在涉及推理的任务上大幅提升
- 55B 模型通过云端 TPU 推理，频率 1-3Hz，离线批量执行方式

#### 🔬 深入细节
![RT-2 架构概览](https://arxiv.org/html/2307.15818v2/assets/rt2_overview.png)
*图：RT-2 框架图。左侧：预训练 VLM（PaLI-X 或 PaLM-E）在图像和文本输入上训练；右侧：将机器人数据转换为文本-动作 token 序列，与原始 VLM 数据混合进行 co-fine-tuning。推理时，输入图像和任务指令，模型直接输出动作 token 序列。*

##### 方法动机

传统机器人学习方法通常从头训练或仅在机器人数据上微调，缺乏利用互联网规模数据中蕴含的语义知识与视觉理解的能力。RT-1（Brohan et al., 2022）虽然展示了 Transformer 在机器人控制中的有效性，但其动作输出仍依赖专门的动作头（action head），无法直接利用大规模预训练模型的知识。RT-2 的核心洞察是：**动作可以像文本一样被 tokenize**——将连续动作空间离散化为有限 token，使 VLM 无需架构修改即可同时处理视觉、语言和动作。这桥接了互联网预训练知识与物理世界的操作需求。

##### 动作 Tokenization

对于 6 自由度末端执行器动作（位置变化 Δx, Δy, Δz, 旋转变化 Δroll, Δpitch, Δyaw, 夹爪开度 g），RT-2 采用均匀离散化：

- 每个动作维度被离散化为 \\(N = 256\\) 个 bin，将连续值映射到最近的 bin 索引 \\(a_i \\in \\{0, ..., 255\\}\\)
- **PaLI-X 方案**：对每个动作维度使用独立的离散 token（共 8 个整数 token，分别是 Δpos, Δrot, gripper），这些 token 在 PaLI-X 词汇表中有自然对应的数值 token；例如动作值"125"被分解为独立的数字 token "1", "2", "5"，模型通过已有词汇表中的数字 token 来表示动作
- **PaLM-E 方案**：PaLM-E 的词汇表相对紧凑，RT-2 保留 256 个原本最不常用的 token，将其"重映射"为动作 token——即用 1 个 token 直接覆盖一个动作 bin，总共 256 个动作 token 被叠加到词汇表中存在但极少使用的 token 上

> 💡 关键：PaLI-X 的方案利用了视觉语言模型中已有的数字 token 语义（"125"对模型有数值含义），而 PaLM-E 的方案更具灵活性但依赖覆盖低频 token。前者受益于模型对数字的已有理解，后者在 token 效率上更优。

##### Co-fine-tuning 策略

直接将 VLM 在机器人数据上微调会导致**灾难性遗忘**——模型失去原有的视觉理解和语言能力。RT-2 采用 co-fine-tuning：

1. **混合批次**：每个训练批次中按比例混合机器人演示数据和原始 VLM 训练数据（如 PaLI-X 的图像描述、VQA 数据）
2. **统一格式**：两种数据都被转换为文本 token 序列。机器人数据的格式为 `[image] Q: what action should the robot take? A: Δx=128 Δy=150 ...`，原 VLM 数据保持其问答格式
3. **联合优化**：使用标准的下一个 token 预测损失（next-token prediction loss）同时优化两种数据，无需额外的辅助损失
4. **数据比例**：论文通过实验确定机器人数据与原始数据的比例，平衡技能习得与知识保留

这类似于 InstructGPT/ChatGPT 的指令微调混合策略——通过在微调中保留原始分布防止模型退化。

##### 输出约束（Output Constraint）与推理

RT-2 在推理时面临一个关键问题：模型可能生成不代表有效动作的 token 序列。解决方法：

1. **格式约束**：预定义动作输出的合法格式（如 8 个数字 token + EOS），模型在生成时被限制只能采样符合该格式的 token
2. **范围约束**：每个动作维度的 token 必须在 [0, 255] 范围内；若模型尝试生成越界 token，其概率被置零，按约束重采样
3. **推理效率**：55B 模型以 1-3Hz 频率通过云端 TPU 推理，控制周期约 300-1000ms——这意味着 RT-2 倾向于离线批处理式执行，而非高频实时控制

##### CoT（Chain-of-Thought）变体

为进一步提升模型在涉及多步推理、语义理解的任务上的表现，RT-2 引入了 CoT 变体：

```
[image] Q: Should I move the coke can to the person with glasses?
A: Plan: 1. Identify the coke can.
   2. Identify the person with glasses.
   3. Move the coke can to that person.
Action: Δx=100 Δy=50 ... Gripper=1
```

模型首先输出自然语言推理步骤（Plan），再输出动作。Plan token 与 Action token 在同一个自回归序列中生成。CoT 微调需要带有 Plan 标注的演示数据——这些 Plan 可以通过 LLM 自动标注或人工标注获取。在涉及符号推理、场景理解的任务中，CoT 变体比标准 RT-2 提升 25% 以上。

##### Emergent 能力三分类

RT-2 的核心贡献在于证明了 VLA 模型展现出**仅靠机器人数据训练无法获得的 emergent 能力**，论文将其分为三类：

1. **符号理解（Symbol Understanding）**：模型理解符号与物理对象的关联——如将箭头指向的物体拿给用户，或将印有特定标志的物体放入对应垃圾桶。这要求模型将视觉符号语义映射到操作行为
2. **推理（Reasoning）**：涉及多步骤逻辑——如"把不在盘子里的水果放进盘子"，需模型首先理解场景中有哪些水果、哪些在盘子外，然后执行操作。这类能力直接受益于 VLM 预训练中习得的常识推理
3. **人类识别（Human Recognition）**：基于视觉特征识别人——如"将可乐递给戴眼镜的人"，要求模型识别人脸特征（眼镜、帽子等）并匹配到动作目标。此类能力源自 VLM 在大规模图像-文本数据中学习的人物属性理解

> ⚠️ 注意：这些 emergent 能力在仅用机器人数据训练的 RT-1 或从头训练的 VLA 中几乎不存在（接近随机水平），证明了大规模视觉语言预训练知识向机器人操作泛化的可行性。

##### 算法伪代码

```python
# RT-2 Co-fine-tuning 伪代码
def rt2_co_fine_tuning(vlm, robot_data, web_data, ratio=0.5):
    """混合机器人数据和网络数据联合训练"""
    for batch in training_loader:
        # 按比例采样
        if random() < ratio:
            # 机器人数据: image -> text_instruction -> action_tokens
            img, instruction, action = sample(robot_data)
            action_tokens = discretize_actions(action, bins=256)
            input_seq = f"[IMG] Q: {instruction} A: "
            target_seq = action_tokens  # e.g., "128 150 100 50 20 10 1"
        else:
            # 原 VLM 数据: image captioning, VQA 等
            img, input_seq, target_seq = sample(web_data)
        
        # 拼接并预测下一个 token
        full_seq = concat(img_tokens, input_seq, target_seq)
        loss = cross_entropy(vlm(full_seq[:-1]), full_seq[1:])
        loss.backward()
        optimizer.step()

def inference_rt2(vlm, img, instruction):
    """推理时输出约束"""
    prompt = f"[IMG] Q: {instruction} A:"
    tokens = []
    for _ in range(8):  # 8 个动作维度
        logits = vlm(prompt + tokens)
        # 输出约束：只允许合法动作 token
        logits = apply_output_constraint(logits, token_idx=len(tokens))
        next_token = sample(logits)
        tokens.append(next_token)
    actions = decode_actions(tokens)
    return actions

def chain_of_thought_inference(vlm, img, instruction):
    """CoT 推理变体"""
    prompt = f"[IMG] Q: {instruction} A: Plan:"
    plan_tokens = vlm.generate(prompt, stop="Action:")
    prompt += plan_tokens + " Action:"
    action_tokens = constrained_sample(vlm, prompt, num_tokens=8)
    return decode_actions(action_tokens)
```

##### 与相关工作的区别

| 方法 | 动作输出方式 | 预训练数据利用 | Emergent 能力 |
|------|-------------|---------------|--------------|
| RT-1 | Transformer + 专用动作头 | 无 | 无 |
| GATO (Reed et al., 2022) | 多任务 token 统一，但动作离散化有限 | 多模态预训练 | 有限 |
| PaLM-E (Driess et al., 2023) | 视觉语言模型 + 动作规划输出文本，需下游执行 | 大规模 VLM + 具身数据 | 文本规划层 |
| **RT-2** | **VLM 直接输出动作 token** | **VLM 预训练 + co-fine-tuning** | **三分类 emergent** |

RT-2 的关键创新在于：不需要单独的动作规划层或动作头——VLM 的文本输出头直接成为动作输出通道，这使得网络预训练知识的迁移路径最短。

##### 局限性

1. **无法学习新运动技能**：RT-2 只能输出已有的离散化动作（如末端位移），无法学习复杂灵巧操作或动态运动技能（如跑跳、工具精细化使用）
2. **推理频率限制**：55B 模型的云端推理仅达 1-3Hz，不适用于需要高频闭环控制的任务
3. **依赖于演示数据的动作空间**：动作空间的粒度（256 bin）和类型（绝对/相对位移）由训练数据决定，灵活性受限

#### 🧪 练习题
```yaml
question: "RT-2 的 co-fine-tuning 策略中，混合原始 VLM 训练数据的主要目的是什么？"
options:
  - "增加训练数据量以提高模型准确率"
  - "防止模型在机器人数据上微调时发生灾难性遗忘"
  - "提升推理速度"
  - "减少动作 token 的数量"
answer: 1
explain: "Co-fine-tuning 中混合原始 VLM 数据（如图像描述、VQA）是为了保留模型在大规模预训练中习得的视觉理解和常识推理能力，防止仅在机器人数据上微调导致的灾难性遗忘，这正是 RT-2 emergent 能力的来源。"
```

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
VoxPoser 的核心目标是：LLM生成3D体素价值图零样本操纵。

#### 🎯 核心要点
- 核心动机：LLM生成3D体素价值图零样本操纵
- 演化来源：继承或改进自 cliport
- 代表机构：Stanford

#### 🔬 深入细节
**1. 3D 体素值图的合成机制（§3.1–3.2）**

核心洞察是将 LLM 视作"零样本代码生成器"。给定场景的 3D 体素网格和物体标签，LLM 输出 Python 代码调用两类原子操作：

- `affordance_map`: 定义"应该去哪"——如"抓住杯子"生成杯子顶部以上 5cm 区域的高值。
- `constraint_map`: 定义"不能去哪"——如"避免碰撞桌面"生成桌面区域的负值。

两类图通过 **加权求和** 融合：$F_{\text{task}} = w_a F_{\text{affordance}} + w_c F_{\text{constraint}}$。LLM 代码还自动计算物体间的空间关系（如"杯子在桌上"→杯子的可供性区域 z 坐标高于桌面）。**扰动体素** 在约束边界注入高斯噪声，迫使 MPC 采样器主动远离危险区域。

**2. 闭环在线重规划（§3.3, Fig. 2 右侧）**

系统以 $5\text{Hz}$ 频率执行以下循环：① 摄像机更新场景点云 → ② 重新计算 $F_{\text{task}}$ → ③ MPC 随机射击 1000 条候选轨迹，选 $F_{\text{task}}$ 最高者 → ④ 执行第一步动作。这种设计使得系统可以**在线适应物体移动和遮挡变化**，无需显式状态估计。每次重规划约 $50\text{ms}$，满足实时性要求。

**3. 动力学学习（§3.4, 可选扩展）**

虽然主打零样本，VoxPoser 也展示了将 3D 值图用于**高效动力学学习**：用执行成功的轨迹离线训练一个旋钮动力学残差模型（Gaussian Process），在旋钮开门任务中将成功率从 60% 提升至 90%，训练仅需 10 条演示。

**4. 与 Code-as-Policies 的关键区别**

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
RoboAgent 提出了 Semantic Augmentation（语义增强）+ MT-ACT（多任务动作分块Transformer）框架，在仅 7,500 条真实操作轨迹的数据预算下，通过图像修复技术将数据扩展至 10 万条以上语义多样化轨迹，并结合 CVAE+Action Chunking 架构实现跨 12 种技能的泛化操控，解决了真实机器人数据采集成本高昂与泛化需求之间的矛盾。

#### 🎯 核心要点
- 提出 **Semantic Augmentation**（语义增强）：利用 Stable Diffusion Inpainting 对场景背景、物体外观、纹理等进行语义级变换，在保留机器人行为轨迹的前提下实现数据乘法（7,500 → 100,000+），零额外操作成本
- 设计 **MT-ACT**（Multi-Task Action Chunking Transformer）：从单任务 ACT 扩展至语言条件化的多任务策略，结合 CVAE 编码器与 Action Chunk 解码器
- 三类互补的语义增强：**场景增强**（背景/桌面纹理/光照）、**物体增强**（交互物体外观/颜色/纹理）、**任务增强**（场景×物体的笛卡尔积组合）
- CVAE 框架建模动作分布：编码器 \(q_\phi(z|a,o,l)\) → 先验 \(p_\theta(z|o,l)\) → 解码器 \(p_\theta(a|o,l,z)\)，KL 正则化隐空间
- Action Chunking 预测 K=100 步动作序列，推理采用时间集成（Temporal Ensemble）指数加权平均策略
- 在 12 种技能（拾取放置、推拉、开门、擦拭、倾倒、堆叠等）上验证泛化：未见场景成功率从 22% 提升至 52%

#### 🔬 深入细节
##### 核心示意图

![RoboAgent 整体框架](https://ar5iv.labs.arxiv.org/html/2309.01918/assets/x1.png)
*图1：RoboAgent 整体框架概览——左侧为 Semantic Augmentation 数据流水线（场景增强 + 物体增强），右侧为 MT-ACT 策略架构（视觉编码器 + 语言编码器 → CVAE → Action Chunking 解码器）*

![语义增强示意](https://ar5iv.labs.arxiv.org/html/2309.01918/assets/x4.png)
*图2：语义增强示意图。(a) 场景增强：更换背景和桌面纹理；(b) 物体增强：更换交互物体外观而保留周围场景*

![MT-ACT 架构图](https://ar5iv.labs.arxiv.org/html/2309.01918/assets/x2.png)
*图3：MT-ACT 详细架构——ResNet 视觉编码器 + CLIP 文本编码器 → 特征融合 → CVAE 编码器/先验网络 → Transformer Action Chunk 解码器*

##### 算法伪代码

```python
# MT-ACT 训练与推理伪代码
# ============================
# 阶段一：Semantic Augmentation（离线）
for each trajectory in D_raw (7500条):
    for each frame in trajectory:
        # 场景增强：inpaint非交互区域
        mask_scene = generate_scene_mask(frame)  # 背景/桌面区域
        frame_scene_aug = StableDiffusionInpaint(frame, mask_scene, prompt="大理石桌面，现代厨房")
        
        # 物体增强：inpaint交互物体区域
        mask_obj = generate_object_mask(frame)   # 交互物体区域
        frame_obj_aug = StableDiffusionInpaint(frame, mask_obj, prompt="蓝色方块")
    # 添加到增强数据集
    D_aug.append(scene_aug_traj, obj_aug_traj, combined_aug_traj)
# 最终 D_aug > 100,000 条轨迹

# ============================
# 阶段二：MT-ACT 训练
for epoch in range(num_epochs):
    for batch in D_aug:
        # 1. 编码观测和语言
        f_v = ResNet(o_t)              # 视觉特征
        f_l = CLIP(l)                  # 语言特征
        f = concat(f_v, f_l)           # 特征融合
        
        # 2. CVAE 编码器：编码未来动作到潜变量
        mu_q, logvar_q = encoder(a_{t:t+K}, f)
        z = reparameterize(mu_q, logvar_q)
        
        # 3. CVAE 先验：仅从观测预测潜变量
        mu_p, logvar_p = prior(f)
        
        # 4. 解码器：从潜变量重建动作序列
        a_hat = decoder(f, z)          # shape: [K, 7]
        
        # 5. 计算损失
        loss_recon = MSE(a_{t:t+K}, a_hat)
        loss_kl = KL(N(mu_q, σ_q²) || N(mu_p, σ_p²))
        loss = loss_recon + β * loss_kl
        
        optimizer.step(loss)

# ============================
# MT-ACT 推理
for t in range(T):
    f_v = ResNet(o_t)
    f_l = CLIP(l)
    f = concat(f_v, f_l)
    
    z = sample(prior(f))               # 从先验采样
    a_hat_{t:t+K} = decoder(f, z)      # 预测未来K步动作
    
    # 时间集成：对重叠预测窗口加权平均
    for k in range(K):
        ensemble_a[t+k] += exp(-λ * age) * a_hat[t+k]
    
    execute(a_t)                        # 执行第一步动作
    # 每10步或高不确定性时重规划
```

##### 动机与背景

传统机器人操控策略面临三重困境：**数据采集成本极高**（单条轨迹需要人工遥操作或脚本编程）、**场景多样性受限**（物理实验室环境固定）、**跨任务泛化困难**（单任务策略无法迁移）。RT-1 等大规模方法需要 13 万+条轨迹才达到良好泛化，但大多数实验室无法承担如此规模的数据采集。RoboAgent 的核心洞察是：**泛化瓶颈在于语义多样性而非绝对数据量**——如果能无成本地将 7,500 条轨迹的语义内容丰富化（更换场景背景、物体外观），就能在小数据预算下实现泛化。

##### 核心机制详解

**1. Semantic Augmentation：语义增强的三层设计**

语义增强的本质是**保持动作轨迹不变，仅修改视觉观测的语义内容**。这通过 Stable Diffusion Inpainting 实现：

- **场景增强**：mask 覆盖桌面、背景墙壁、光照区域，prompt 控制生成新场景（如"木质桌面→大理石桌面"）。关键约束是被 mask 区域与未 mask 区域（机器人本体、交互物体边缘）的融合自然度。

- **物体增强**：mask 覆盖被操作物体，prompt 控制物体外观变换（如"红色方块→蓝色条纹方块"）。核心技术难点在于物体 mask 的精确提取（使用 SAM 等分割模型）和生成后物体的 3D 一致性保持（虽然仅操作 2D 图像，但由于机器人策略本身以 2D 观测为输入，这种近似的分布外泛化仍然有效）。

- **任务增强**：场景增强 × 物体增强的笛卡尔积组合。例如 50 种场景 × 10 种物体 = 500 种语义变体，确保每个技能在丰富的语义上下文中被训练。

**2. MT-ACT 架构：CVAE + Action Chunking 的融合**

MT-ACT 从单任务 ACT 扩展为语言条件化的多任务策略，核心改动：

- **语言条件化**：CLIP 文本编码器提取自然语言指令特征（"pick up the red cube"），与 ResNet 视觉特征融合后输入 CVAE。这使得同一个策略网络能处理 12 种不同技能。

- **CVAE 隐变量建模**：不同于确定性策略直接输出动作，CVAE 通过学习动作分布的隐变量 \(z\) 来捕捉多模态行为（同一观测下可能存在多种合理动作）。训练时编码器利用未来动作信息 \(a_{t:t+K}\) 学习 \(z\) 的后验，推理时从先验 \(p(z|o,l)\) 采样。

- **Action Chunking**：预测 K=100 步动作序列（每个动作 7 维：\(\Delta x, \Delta y, \Delta z, \Delta roll, \Delta pitch, \Delta yaw, gripper\)）。长预测窗口使策略能够学习时间上连贯的行为，减少高频重规划带来的抖动。

**3. 损失函数与训练策略**

总损失为动作重建损失与 KL 散度的加权和。动作重建损失驱动解码器输出准确的动作序列；KL 散度正则项约束编码器输出的后验分布接近先验，确保推理时从先验采样也能生成合理动作。\(\beta\) 超参数控制两部分平衡，论文通过实验确定 \(\beta=1.0\)。

##### 与传统方法的区别

| 方法 | 数据需求 | 多任务 | 泛化策略 |
|------|---------|--------|---------|
| BC (行为克隆) | 数千条/任务 | 独立训练 | 无 |
| ACT | 数百条/任务 | 单任务 | 隐式(Chunking) |
| RT-1 | 13万+条 | 多任务 | 大数据驱动 |
| **RoboAgent** | **7,500条(全任务)** | **多任务(语言条件化)** | **语义增强+泛化架构** |

关键区别在于 RoboAgent 是**数据高效多任务**范式：通过语义增强实现"数据质量 > 数据数量"，通过 MT-ACT 统一多任务策略架构，两者协同作用才实现小数据预算下的泛化。

#### 🧪 练习题
```yaml
question: "RoboAgent 的 Semantic Augmentation 在进行场景增强时，必须满足的核心约束是什么？"
options:
  - "增强后的图像必须具有更高的分辨率"
  - "机器人本体的像素区域和动作轨迹必须保持不变"
  - "增强必须使用 GPT-4 生成 prompt"
  - "每张图像只能增强一次"
answer: 1
explain: "语义增强通过 Stable Diffusion Inpainting 修改图像中场景背景/物体的语义内容（如桌面纹理、物体颜色），但机器人本体和其运动轨迹必须完全保留，否则会导致观测-动作对应关系被破坏。"
```

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
RoboFlamingo 提出将预训练的通用视觉-语言模型（OpenFlamingo）适配到机器人操控领域，通过简单的 LSTM 策略头与时序观测编码，使单一 VLM 同时完成语言指令理解和视觉闭环控制，在 CALVIN 基准上取得最佳性能。

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
OpenVLA 提出了一种基于 7B 参数 Prismatic VLM、融合 SigLIP 与 DINOv2 双视觉编码器的开源视觉语言动作模型，将连续动作离散化为 256 个 bin，在 970k 机器人轨迹上微调后，以不到 RT-2-X 八分之一的参数量实现跨多种机器人形态的显著更高或持平的性能表现。

#### 🎯 核心要点
- 提出 **OpenVLA**：首个完全开源的 7B 级视觉语言动作大模型，在 Open X-Embodiment 数据集上训练
- 采用 **Prismatic-7B** 作为基座 VLM，其视觉塔融合 **SigLIP**（语义特征）与 **DINOv2**（空间特征）双视觉编码器，LLM 骨干为 Llama 2 7B
- 动作预测采用 **256-bin 离散化策略**：将机器人末端执行器的连续位置增量（Δx, Δy, Δz, Δyaw, Δpitch, Δroll 及夹爪开合）按分位数映射为离散 token，复用 VLM 自身的 token 预测能力
- 训练数据整合自 Open X-Embodiment 数据集的 **970k 条机器人轨迹**（经严格清洗，如滤除全零动作），横跨多种机器人形态
- 在 **BridgeData V2**（WidowX 机器人）评测中，7B OpenVLA 的泛化成功率**显著超越** 55B RT-2-X；在 **Google Robot** 评测中性能持平
- 支持 **LoRA 参数高效微调**（仅微调 1.4% 参数即匹配全参数微调性能），可在单张 A100 上 10-15 小时内适配新机器人
- 支持 **4-bit 量化推理**，显存占用仅 7GB，成功率与 bfloat16 推理持平

#### 🔬 深入细节
##### 核心架构图

![OpenVLA 架构总览](https://ar5iv.labs.arxiv.org/html/2406.09246/assets/x1.png)
*图 1：OpenVLA 模型架构。左侧为 Prismatic-7B VLM 基座（SigLIP+DINOv2 双视觉编码器 + Llama 2 7B LLM），右侧展示动作离散化与预测流程——连续动作经分位数 bin 映射为 256 类离散 token，由 LLM 输出 logits 解码为机器人动作。*

##### 动作离散化伪代码

```python
# OpenVLA 动作离散化与反离散化
# 连续动作空间：7维（Δx, Δy, Δz, Δyaw, Δpitch, Δroll, gripper）

# 1. 离散化（训练时）
for dim in range(7):
    # 按全局分位数将各维动作值映射到 {0, 1, ..., 255}
    bin = quantize(action[dim], bins[dim])  # bins[dim]: 256个分位数界限
    action_token = dim * 256 + bin           # 共7×256=1792个独立token

# 2. 反离散化（推理时）
for dim in range(7):
    # 从 softmax 分布中取最大值索引
    bin_logits = model_output[:, dim*256 : (dim+1)*256]
    bin = argmax(bin_logits)
    action[dim] = dequantize(bin, bins[dim])  # 还原为连续值
```

##### 方法深入解读

**动机与背景：为什么需要 OpenVLA？**

在 OpenVLA 之前，以 Google DeepMind RT-2 为代表的视觉语言动作模型虽展示了将互联网预训练的 VLM 用于机器人控制的巨大潜力，但其 55B 参数模型完全闭源，研究社区无法自由获取、微调和改进。同时，已有开源策略模型（如 Octo，93M 参数）未利用大规模互联网视觉语言预训练，泛化能力有限。OpenVLA 的核心动机即填补这一空白——**构建一个性能顶尖、完全开源、且可在普通 GPU 上微调和推理的 VLA 模型**。

**双视觉编码器的精妙设计：SigLIP + DINOv2 的协同互补**

OpenVLA 的视觉塔是架构中的关键创新。基座 VLM（Prismatic-7B）在训练时发现融合 **SigLIP** 和 **DINOv2** 两种视觉特征可获得最佳下游效果。这一设计在机器人控制场景中恰好意义深远：

- **SigLIP**（出自 Google DeepMind，ICCV 2023）采用 sigmoid loss 进行大规模图像-文本对比预训练，擅长提取**语义层面**的视觉特征（"这是什么物体？"），有助于语言指令的视觉接地（visual grounding）。
- **DINOv2**（出自 Meta AI，自监督训练）擅长捕获**空间结构**信息（"物体在什么位置？什么姿态？"），对机器人精确操作的方位导向至关重要。

两者特征经 MLP 投影到 LLM 嵌入空间后拼接，形成**既"识物"又"知位"**的视觉表征。论文通过消融实验直接验证：仅使用 SigLIP 的简化版 OpenVLA 仍能保持较强性能，佐证了语义特征的主导作用；但融合空间特征对于需要精细空间推理的任务尤为重要。

> 💡 关键：这一设计与 CLIPort 等先前工作中的"What Where"双通路（two-stream）思想本质一脉相承，但 OpenVLA 将其内生于 VLM 框架，避免了额外的外挂模块。

**离散化动作预测：让 LLM 原语预测机器人动作**

如何让为文本 token 设计的 LLM 输出连续机器人动作？OpenVLA 采用了一个简洁高效的方案：**将每个动作维度的连续值域划分为 256 个等频率 bin（分位数离散化）**，7 个动作维度共产生 7×256=1792 个独立 token。在推理时，模型在每个维度对应的 256 个 logit 上取 argmax 选择 bin 索引，再通过反量化还原为连续动作值。

这一策略的优势：
1. **复用 LLM 的完整训练栈**：无需在 LLM 之上额外添加复杂的回归头，最大化利用 VLM 的表达能力；
2. **训练稳定性**：分类任务比直接回归连续值更容易优化，尤其在大范围数据混合的场景中；
3. **与 RT-2 的 token 化方案一致**：在语义上与 RT-2 的做法对齐，但 OpenVLA 将其扩展为真正开源的实现。

> ⚠️ 注意：256-bin 离散化带来一定的精度损失（每个维度 256 个分辨率），但在大范围机器人操作任务中，这种精度对成功率影响有限，而训练稳定性的收益远大于精度的微小损失。

**训练与推理：从 64 卡大规模预训练到单卡 LoRA 微调**

OpenVLA 的训练分为两个阶段。第一阶段是 VLM 基座（Prismatic-7B）的预训练——在 LLaVA-1.5 数据混合（含 590k 条视觉问答数据）上训练，建立视觉-语言对齐。第二阶段是在 970k 条机器人轨迹上进行动作预测微调：使用 64 张 A100 GPU，跨 14 天，batch size 2048，学习率 1e-4 配合 cosine 衰减。微调时仅预测动作 token 的交叉熵损失，视觉和语言部分保持冻结或仅轻微调整。

在适配新机器人场景时，OpenVLA 展示了出色的数据效率：仅需 10-150 条专家示教，通过 LoRA（rank=32）作用于所有线性层，可在单张 A100 上 10-15 小时完成适配，训练参数仅 97.6M（不到总参数的 1.4%），性能即与全参数微调持平。推理端，4-bit 量化可将模型压缩至 7GB 显存，在消费级 GPU（如 RTX 4090）上达到 3Hz 以上的控制频率。

**与 RT-2 的对比：小模型如何超越大模型？**

OpenVLA 以 7B 参数量在 BridgeData V2 评测上显著优于 55B RT-2-X，这一反直觉结果源于三个要素：
1. **数据集质量**：OpenVLA 的 970k 轨迹经过了更严格的清洗（如滤除 Bridge 数据集中的全零动作、修正标注错误），而 RT-2-X 使用的 350k 轨迹未经同等程度的清理；
2. **视觉特征的融合**：RT-2-X 依赖 PaLI 系列的单一视觉编码器，而 OpenVLA 显式融合语义（SigLIP）和空间（DINOv2）特征，对操作类任务的视觉理解更全面；
3. **全参数机器人微调**：OpenVLA 在机器人数据上全参数微调了 LLM 骨干，而 RT-2-X 的微调策略在论文中未公开细节，可能涉及额外的约束（如保留互联网知识的正则化）。

#### 🧪 练习题
```yaml
question: "OpenVLA 的动作离散化策略中，每个动作维度被划分为多少个 bin？"
options:
  - "128 个 bin，以匹配 7 维动作空间"
  - "256 个 bin，通过分位数映射保证均匀分布"
  - "512 个 bin，以提高动作精度"
  - "1000 个 bin，每个 bin 对应一个独立的动作 token"
answer: 1
explain: "OpenVLA 将每个动作维度（如 Δx、Δy、Δz 等）均匀划分为 256 个 bin，采用分位数离散化保证各 bin 在训练数据中的样本量均衡，7 个维度共产生 7×256=1792 个独立动作 token。"
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
GR-1 / GR-2 是傅里叶智能推出的全尺寸人形机器人平台，基于纯视觉鸟瞰图（BEV）感知与 Transformer 运动策略实现端到端全身运动控制，通过自研 FSA 系列高扭矩密度关节模组（GR-1 峰值 230 N·m，GR-2 峰值 380 N·m）、12-DoF 五指灵巧手以及 NVIDIA Isaac Lab 仿真训练管线，构建了从底层驱动到上层智能的完整技术栈，代表了 2024 年具身智能从“单一任务机器人”向“通用人形操作体”跨越的关键系统工程实践。

#### 🎯 核心要点
- **双代际产品线**：GR-1（2023 发布，44 自由度 / 1.65 m / 55 kg）与 GR-2（2024 年 9 月发布，53 自由度 / 1.75 m / 63 kg）形成高低搭配，GR-2 全面升级。
- **自研关节模组 FSA**：GR-1 搭载 FSA 1.0（峰值扭矩 230 N·m），GR-2 升级为 FSA 2.0（峰值扭矩 380 N·m），采用双编码器全闭环控制，提供高回驱透明度。
- **纯视觉 BEV 感知**：仅依靠机载 RGB 摄像头构建鸟瞰图（Bird's-Eye-View）表征，融合 Occupancy Network（OccNet）进行三维场景理解，不依赖外部激光雷达。
- **Transformer 运动策略**：将视觉 token 与本体感知（关节角、力矩、足底力）融合，经 Transformer 解码器自回归生成全身关节位置/扭矩指令，属于 transformer_policy 体系下与 RT-2 同源的控制范式。
- **灵巧操作手**：GR-2 配备 12 自由度五指灵巧手，集成触觉传感器，支持精细物体抓取与工具使用，使具身智能从移动导航扩展到灵巧操作。
- **Isaac Lab 仿真管线**：基于 NVIDIA Isaac Lab 与 MuJoCo 搭建高保真仿真环境，支持域随机化与并行训练，并通过 sim2real 迁移部署到物理硬件。
- **开放生态**：提供 ROS 2 SDK、数字孪生模型与 API 接口，支持研究者在平台上进行具身智能算法验证。

#### 🔬 深入细节
##### 1. 系统架构：感知–决策–控制的端到端闭环

![GR-2 全身运动控制示意图](https://www.fftai.com/uploads/upload/images/20240926/453ccb3f784b5a1755ae86869bfb7316.jpg)

*图 1：GR-2 在操作任务中展示全身协调运动能力，视觉模块实时感知环境，Transformer 策略输出全身 53 个关节的目标位置。*

GR 系列的系统架构遵循“感知 → 决策 → 执行”三层闭环，形成了一个完全端到端的控制流水线：

```
┌─────────────────────────────────────────────────────┐
│  感知层 (Perception)                                  │
│  RGB 图像输入 → BEV 特征提取 → OccNet 3D 占用预测      │
│  + 本体感知（关节角 θ, 力矩 τ, 足底力 f）               │
└───────────────────────┬─────────────────────────────┘
                        ▼
┌─────────────────────────────────────────────────────┐
│  决策层 (Decision / Policy)                          │
│  Multi-Modal Transformer Encoder                     │
│  视觉 token + 本体 token → 跨注意力融合                │
│  → Action Decoder 自回归输出 7/53 维目标动作            │
└───────────────────────┬─────────────────────────────┘
                        ▼
┌─────────────────────────────────────────────────────┐
│  执行层 (Actuation)                                  │
│  目标动作 → 关节级 PD/阻抗控制器 → FSA 关节模组          │
│  双编码器反馈 @ 1 kHz 闭环                              │
└─────────────────────────────────────────────────────┘
```

**核心设计思想**：感知与决策共享 Transformer 骨干，避免模块间信息瓶颈；执行层采用全自研关节模组，保证高带宽力控，使得上层策略输出的扭矩指令能够被高保真地执行。

##### 2. 纯视觉 BEV + OccNet 感知管线

GR 系列不使用激光雷达，仅依靠机载 RGB 摄像头。感知管线分为两个阶段：

1. **BEV 特征提取**：多视角图像经共享卷积编码器提取特征，通过“视锥 → 体素”的 Lift-Splat-Shoot（LSS）式投影将 2D 特征提升到 3D BEV 空间。BEV 网格以机器人为中心的俯视图表示周围可通行区域与障碍物分布。
2. **Occupancy Network 3D 场景理解**：在 BEV 特征基础上，轻量级 OccNet 将体素空间离散化为占用概率场 \\(p_{\text{occ}}(x,y,z)=\sigma(f_{\text{MLP}}(\mathbf{h}_{\text{BEV}}(x,y), z))\\)，实现对任意形状障碍物的精确建模。

> 💡 **为什么不使用激光雷达？** BEV + OccNet 的纯视觉方案（1）成本大幅降低，（2）可无缝利用大规模图像预训练模型的知识迁移，（3）视觉特征天然与语言、语义任务兼容，便于扩展到 VLA（Vision-Language-Action）架构。

##### 3. 端到端运动策略：Transformer 驱动的全身控制

运动策略将视觉感知与本体感知融合，输出全身关节指令。其核心为一个多模态 Transformer 模型：

**输入序列构造**：

\\[
X = [\text{VIS}_1, \ldots, \text{VIS}_N, \text{BOD}_1, \ldots, \text{BOD}_M, \text{CMD}]
\\]

- **视觉 token** \\(\text{VIS}_i\\)：BEV 特征图经 Flatten + MLP 投影得到。
- **本体感知 token** \\(\text{BOD}_j\\)：包含关节角 \\(\theta\\)、角速度 \\(\dot{\theta}\\)、力矩 \\(\tau\\)、足底力 \\(F_{\text{foot}}\\) 等，分别投影到统一维度。
- **指令 token** \\(\text{CMD}\\)：来自高层规划的目标速度、朝向或自然语言任务描述（VLA 模式下）。

**Transformer 编解码器**：

```
Input: [VIS_1, ..., VIS_N | BOD_1, ..., BOD_M | CMD]
       │
       ▼
  Multi-Head Self-Attention (所有 token 可见)
       │
       ▼
  Cross-Attention (视觉 token → 本体 token 的条件化)
       │
       ▼
  FFN + LayerNorm × L blocks
       │
       ▼
  Action Head: MLP → [目标关节角 / 力矩]_{1:J}
```

**伪代码：端到端推理循环**

```python
# GR 端到端运动策略推理（简化版）
# 输入: rgb_images (N_views, H, W, 3), proprio (J, 4), cmd (D_cmd)

def gr_policy_forward(rgb_images, proprio, cmd):
    # 1. BEV 感知：多视角 → 鸟瞰图特征
    image_features = CNN_backbone(rgb_images)          # (N, C, h, w)
    bev_tokens = lift_splat_shoot(image_features)      # (H_bev × W_bev, E)

    # 2. 本体感知编码
    proprio_input = concat([joint_pos, joint_vel, torque, foot_force])
    body_tokens = MLP_proprio(proprio_input)           # (J, E)

    # 3. 指令编码
    cmd_token = MLP_cmd(cmd)                           # (1, E)

    # 4. 拼接并送入 Transformer
    x = concat([bev_tokens, body_tokens, cmd_token])  # (T_total, E)
    for block in transformer_blocks:
        x = block.self_attention(x)                   # 所有模态自由交互
        x = block.cross_attention(x)                  # 视觉引导本体
        x = block.ffn(x)

    # 5. 提取本体 token 对应输出，解码为动作
    body_output = x[-J-1:-1]                           # 取最后的 body 部分
    action = action_head(body_output)                  # (J,) → 目标关节角/力矩

    return action

# 闭环执行：策略输出 → 底层阻抗控制器 → FSA 关节模组
def control_loop():
    while True:
        rgb = camera_capture()
        proprio = read_joint_state()
        cmd = high_level_planner()

        target = gr_policy_forward(rgb, proprio, cmd)
        impedance_control(target, Kp=200, Kd=5)       # 1 kHz 内环
        sleep(0.01)
```

> ⚠️ **关键设计选择**：(1) 视觉 token 与本体 token 在 Transformer 内部自由自注意，使模型能自主学习“看到台阶 → 抬高脚踝”之类的跨模态关联，无需手动特征工程；(2) 策略输出作为阻抗控制器的目标位姿而非直接输出扭矩，利用关节级 FSA 控制器的高带宽（1 kHz）补偿 sim2real 的动力学 gap。

##### 4. FSA 关节模组与 12-DoF 灵巧手：硬件–算法协同设计

**FSA 2.0 关节模组**是 GR-2 的核心驱动力单元，决定了力控策略的物理上限：

| 指标 | FSA 1.0 (GR-1) | FSA 2.0 (GR-2) |
|------|----------------|----------------|
| 峰值扭矩 | 230 N·m | 380 N·m |
| 控制方式 | 单编码器半闭环 | 双编码器全闭环 |
| 回驱透明度 | 中等 | 高（适合阻抗/导纳控制） |
| 通信总线 | CAN | EtherCAT（1 kHz 同步） |

**GR-2 灵巧手**（12 个主动自由度，集成触觉传感器）实现了从“足式移动”到“精细操作”的能力跃升：

- **12-DoF 分布**：拇指 3 自由度、食/中/无名/小指各 2 自由度、手掌内收 1 自由度
- **触觉感知**：每指尖集成 MEMS 压力传感器阵列，实时反馈接触力 \\(F_{\text{tactile}} \in \mathbb{R}^{5 \times 3}\\)
- **微型 FSA 驱动**：指尖关节采用微型化 FSA 模组，保持与大型关节一致的控制接口与力控带宽

![GR-2 灵巧手细节](https://www.fftai.com/uploads/upload/images/20240926/c054022c288c4e58de81ff610d6f4c0b.jpg)

*图 2：GR-2 的 12-DoF 五指灵巧手，集成微型 FSA 关节模组与指尖触觉传感器。*

> 💡 **软硬协同设计**：FSA 的高回驱透明度意味着上层策略可以直接输出关节扭矩，利用阻抗控制实现柔顺交互——这对人形机器人在与人或物体接触时的安全性至关重要。Transformer 策略负责“预测该做什么”，FSA 模组负责“高保真地做到”。

##### 5. Isaac Lab 仿真与 Sim2Real 迁移

训练管线基于 **NVIDIA Isaac Lab**（Isaac Sim 的 RL 训练框架）与 **MuJoCo** 物理引擎双轨并行：

- **域随机化**：在仿真中对质量、摩擦系数、关节阻尼、视觉纹理、光照等施加随机扰动，使策略学习鲁棒特征
- **并行训练**：同时运行数千个仿真环境实例，利用 GPU 加速数据采样与策略更新
- **Sim2Real 部署**：训练完成的策略直接部署到物理硬件，无需微调——核心依赖 (1) 域随机化带来的分布偏移鲁棒性，(2) 底层 FSA 阻抗控制器吸收剩余动力学误差

![GR-2 仿真与实物对比](https://www.fftai.com/uploads/upload/images/20240926/19112c6cce070994ee20ee854ffbad1f.jpg)

*图 3：GR-2 在 Isaac Lab 仿真环境中与实物对照，sim2real 迁移实现了视觉运动策略的零样本部署。*

##### 6. 与 RT-2 / Octo 等主流 VLA 路线的关系

GR 系列的控制架构属于 **transformer_policy** 类，与 RT-2、Octo 等共享“多模态输入 → Transformer → 动作输出”的基本骨架。关键差异：

| 维度 | RT-2 / Octo | GR-1 / GR-2 |
|------|------------|-------------|
| 感知模态 | 图像 + 语言 | 图像 + 本体感知 + BEV |
| 策略输出 | 末端执行器位移 / 离散动作 token | 全身 53 个关节位置 / 扭矩 |
| 执行对象 | 桌面级机械臂（通常 ≤ 7 DoF） | 全尺寸人形机器人（44 / 53 DoF） |
| 训练数据 | 大规模开源机器人数据集（OXE） | 自建仿真轨迹 + 遥操作演示 |
| 力控方式 | 通常仅位置控制 | 位置 / 扭矩 / 阻抗三模可选 |

**GR 系列的最大工程突破**在于：将 Transformer 策略从低自由度桌面操作成功扩展到高自由度人形全身控制，并通过自研 FSA 模组与灵巧手将复杂策略“落地”到物理世界。这是具身智能从“实验室演示”迈向“产业级平台”的关键一步。

![GR-1 双足步行](https://www.fftai.com/uploads/upload/images/20240925/95b9a5c173d5dfe3e1bd488cfef79b87.png)

*图 4：GR-1 在室内环境中展示稳定的双足步行能力，纯视觉 BEV 感知支撑其在障碍物间自主导航。*

#### 🧪 练习题
```yaml
question: "GR-2 的端到端运动策略中，视觉 token 与本体感知 token 在 Transformer 内部采用何种交互方式？"
options:
  - "视觉 token 先独立编码，再通过一个固定映射矩阵投影到关节空间"
  - "两类 token 在自注意力层中自由交互，使模型自主学习跨模态关联"
  - "视觉先独立推理出目标轨迹，本体控制器再跟踪该轨迹"
  - "仅使用本体感知 token，视觉仅用于障碍物检测而不参与运动生成"
answer: 1
explain: "GR-2 将所有模态 token 拼接后送入 Transformer 的 self-attention 层，视觉与本体 token 在每一层都能自由交互，从而使策略能够学习例如“看到台阶高度→调整踝关节角度”这样的细粒度跨模态匹配，这是端到端全身控制与分层方法的核心区别。"
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
Long-VLA 的核心目标是：相位感知输入掩码解决长程任务。

#### 🎯 核心要点
- 核心动机：相位感知输入掩码解决长程任务
- 演化来源：继承或改进自 openvla
- 代表机构：CoRL 2025

#### 🔬 深入细节
相位感知输入掩码解决长程任务


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
DFM-VLA 的核心目标是：迭代细化动作Token解决轨迹不稳定。

#### 🎯 核心要点
- **Token级速度场建模**：将离散流匹配（DFM）引入VLA的动作生成，不是一次性生成动作token，而是从纯噪声开始，通过预测token间的"速度场"（velocity field）迭代细化完整动作序列，从根本上解决自回归解码的"不可逆承诺"（irreversible commitment）问题。
- **两种速度场构建方案**：CE损失方案通过交叉熵训练→测速场转换；额外Head方案直接预测替换速度，保留 EditFlow 的 replacement 操作，两种方案均可收敛且精度媲美。
- **两阶段解码策略**：前期用连续时间Markov链（CTMC）的Euler步进行速度场引导的精炼，后期切换为argmax模式快速收敛到确定性的高置信度动作token，兼顾质量与速度。
- **自适应KV缓存加速**：利用DFM迭代去噪过程中多token仅有微小KV状态变化的特性，自适应复用视觉/指令侧的KV cache，动作侧按余弦相似度动态更新，相比自回归解码获得2.4倍延迟加速。
- **低数据场景显著优势**：在CALVIN上仅用10%训练数据即达到Avg. Len 3.21，大幅超越自回归（1.71）和离散扩散（2.84），证明迭代细化缓解了小数据下的过拟合和错误累积。
- **真实机器人验证**：在bimanual AgileX平台上三项任务均取得最高成功率（70.8%），显著超越π0-FAST（AR）、Dream-VLA（扩散）和RDT（连续扩散）等主流VLA方案。

#### 🔬 深入细节
##### 整体架构

![DFM-VLA Overall Architecture](https://ar5iv.labs.arxiv.org/html/2603.26320/assets/x3.png)

*Figure 3：DFM-VLA整体架构。在语言-视觉上下文+噪声动作token \(x_t\) 条件下，模型预测干净动作 \(x_1\)，并通过 \(\mathcal{L}_{\text{ce}}\) 或 \(\mathcal{L}_{\text{head}}\) 学习速度场。*

##### 核心算法伪代码

```
**Algorithm 1: Two-Stage Decoding of DFM-VLA**

Input: predictor p_θ, context l, steps T_fine, T_val, action vocabulary V

1: Sample x_0 ~ Uniform(V); set T = T_fine + T_val
2: for k = 1 to T do
3:     t = (k-1)/T, h = 1/T
4:     x̂_1 ~ p_θ(· | x_t, l)
5:     if k ≤ T_fine then
6:         Compute velocity u_t from x̂_1 (Eq. 7 or Eq. 3)
7:         Update x_{t+h} by a CTMC Euler step
8:     else
9:         Update x_{t+h} ← arg max p_θ(· | x_t, l)
10:    end if
11: end for
Output: action sequence x_1
```

```
**Algorithm 2: Action-Modality DFM Training**

Input: Predictor p_θ, learning rate η

1: repeat
2:     Sample (l, x_1) ~ p_data
3:     Sample t ~ U(0, 1)
4:     Sample x_t ~ p_t(· | x_1)
5:     Choose L_train ∈ {L_ce, L_head}
6:     Compute L_train from (x_t, l) and x_1
7:     θ ← θ - η ∇_θ L_train
8: until converged
Output: trained predictor p_θ
```

##### 方法深度解析

DFM-VLA将机器人动作生成重新定义为一种离散流匹配过程，核心思想源于离散流匹配（Discrete Flow Matching, DFM）理论。在该框架下，一个已知的源分布（如均匀噪声）被逐步变换为动作序列的真实分布，中间的过程由一个概率路径（probability path）\(\{p_t(x)\}_{t\in[0,1]}\) 描述，而驱动这一变换的正是**速度场**（velocity field）\(u_t(x' \mid x)\) ——它定义了离散状态之间跳转的速率。

> 💡 **关键洞察**：自回归VLA逐个生成动作token，已生成的错误token如同覆水难收；而DFM-VLA在每个去噪步骤同时审视并修正整条动作序列，通过速度场精炼每一步的token，实现对"不可逆承诺"问题的根本性规避。

训练过程中，DFM-VLA学习预测干净动作 \(x_1\) 并据此推导速度场。论文提出了两种损失函数：

**方案一：CE损失 + 测速场（Denoising-Conditional Velocity）**

直接从预测分布 \(p_\theta(x_1 \mid x_t, l)\) 构造条件速度场：

\[
u_t^\theta(x \mid x_t) = \sum_{x_1} u_t(x \mid x_t, x_1) \, p_\theta(x_1 \mid x_t, l)
\]

其中条件速度 \(u_t(x \mid x_t, x_1)\) 具有闭式解，由概率路径 \(p_{t\mid 1}(x_t \mid x_1)\) 决定。训练时最小化预测 \(x_1\) 与真实 \(x_1^*\) 的交叉熵：

\[
\mathcal{L}_{\text{ce}} = -\mathbb{E}_{t, x_1, x_t} \left[ \sum_{i=1}^N \log p_\theta(x_1^i \mid x_t^i, l) \right]
\]

**方案二：额外Head直接预测速度（Velocity Head Loss）**

受EditFlow启发，在backbone之上附加轻量速度头，直接从隐状态映射到替换速度：

\[
h_t = f_\theta(x_t, l), \quad u_t^{\text{head}}(x \mid x_t) = \text{softmax}(W \, h_t)
\]

损失函数显式回归速度场：

\[
\mathcal{L}_{\text{head}} = \mathbb{E}_{t,x_1,x_t}\left[ \sum_{x \neq x_t} u_t^\theta(x \mid x_t) - \sum_{i=1}^N \mathbf{1}_{[x_t^i \neq x_1^i]} \log u_t^\theta(x^i \mid x_t^i) \, p_{1\mid t}(x_1^i \mid x_t^i, l) \right]
\]

> ⚠️ **注意**：两种方案在实验中均有效，且性能差异不大。CE方案实现简单，适合快速实验；Head方案解耦了预测与速度推导，推理时开销更低。

**两阶段解码策略**是DFM-VLA的另一个核心贡献。在\([0, T_{\text{fine}}]\)的精炼阶段，使用CTMC Euler步进行小步长迭代，速度场驱动token逐步靠近高概率区域；在\((T_{\text{fine}}, T]\)的验证阶段，直接用argmax策略将每个token锁定到预测分布的最高概率值，避免无限精度追逐。这种设计在"探索-收敛"之间找到了优雅的平衡。

**自适应KV缓存**（Adaptive KV Caching）进一步加速推理：视觉和指令token在整个去噪过程中产生的KV状态变化极小，可以仅计算一次并固定复用；动作token侧则基于当前cache与新值特征的余弦相似度决定是否更新。这一策略实现了2.4倍延迟加速，同时基本无损任务性能。

##### 实验表现

DFM-VLA在多个机器人操纵基准上验证了其有效性：

| Benchmark | Metric | DFM-VLA | 对比顶级方法 |
|-----------|--------|---------|--------------|
| CALVIN ABCD→D | Avg. Len | **4.44** | UniVLA* (4.11) |
| LIBERO-100 | Success Rate | **95.7%** | RDT (89.1%) |
| Real-World (3 tasks) | Avg. Success | **70.8%** | RDT (60.0%) |

特别是低数据场景下（10%训练数据），DFM-VLA的CALVIN Avg. Len达到3.21，远超自回归模型的1.71和离散扩散的2.84，充分验证了迭代细化在缓解小数据误差累积中的优势。

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
Gemini Robotics-ER 是 Google DeepMind 的**具身推理模型**，基于 Gemini 多模态基础模型构建，专门为机器人提供精确的3D空间理解、物体功能推理（affordance）和任务规划能力——它不做动作控制，而是作为 VLA 模型的"空间大脑"，在工业安全等场景中实现 Agentic Vision 式的主动危险检测与干预。

#### 🎯 核心要点
- 核心动机：具身推理与Agentic Vision工业安全
- 演化来源：继承或改进自 rt2
- 代表机构：Google DeepMind

#### 🔬 深入细节
##### 架构设计：ER 与 VLA 的分工协作

```
┌──────────────────────────────────────────────────┐
│                  Robotics System                   │
│                                                    │
│  ┌─────────────────┐    ┌──────────────────────┐  │
│  │  Gemini ER Model │    │  Gemini VLA Model    │  │
│  │  (Embodied       │    │  (Vision-Language-   │  │
│  │   Reasoning)     │    │   Action)            │  │
│  │                  │    │                      │  │
│  │ • 场景理解        │───▶│ • 动作推理            │  │
│  │ • 3D空间锚定      │    │ • Motion Transfer    │  │
│  │ • 任务分解        │    │ • 轨迹生成            │  │
│  │ • 安全评估        │    │                      │  │
│  └─────────────────┘    └──────────────────────┘  │
│           ↑                         ↓              │
│       Camera/RGB-D              Robot Arm          │
└──────────────────────────────────────────────────┘
```

ER 模型不直接接触机器人动力学。它的输出是**结构化的具身推理结果**——包含物体类别、6D位姿估计、可操作区域（affordance map）、语义关系图和子任务序列。这些被 VLA 或传统运动规划器消费，转化为可执行的关节级指令。这种解耦设计的优势：(1) ER 可在没有机器人硬件的环境中独立训练和评估；(2) 同一个 ER 模型可服务于不同形态的机器人（单臂、双臂、人形）；(3) 推理能力的升级不要求重新训练底层的控制策略。

##### 多层级推理链 (Multi-Level Reasoning Chain)

Gemini Robotics-ER 的核心创新在于将机器人操作过程中的每个子问题都转化为了显式的推理步骤。传统 VLA 模型的典型做法是端到端地映射"像素→动作"，而 ER 在像素与动作之间插入了**3层级推理**：

1. **场景级推理 (Scene-Level)**：分析整体环境布局、识别所有相关物体及其空间关系。例如在桌面操作场景中，模型会先输出"桌面上有三个物体：红色杯子位于坐标(0.3, 0.5, 0.2)，蓝色盘子位于(0.5, 0.3, 0.15)，银色刀叉位于(0.4, 0.6, 0.18)"。
2. **任务级推理 (Task-Level)**：将自然语言指令分解为有序子任务。如"准备早餐"被分解为：① 取杯子→② 倒水→③ 取盘子→④ 放置食物。每一步都有前置条件和成功标准。
3. **动作原语级推理 (Primitive-Level)**：针对每个子任务输出精确的空间目标（grasp point, approach direction, placement location），并附带推理依据。例如："抓取杯子把手，因为把手提供了稳定的抓取点，当前把手朝向为45°，建议从135°方向进近以避免与其他物体碰撞。"

##### Agentic Vision：从被动观察到主动审视

1.6 版本的标志性升级是 Agentic Vision。传统视觉系统是被动的——给定一帧图像，输出理解。Agentic Vision 赋予 ER 模型**主动审视**的能力：

- **动态注意力分配**：模型自主决定在场景的哪个区域分配更多计算资源（反复"注视"潜在危险区域）。
- **多视角推理**：如有多个摄像头（或可请求改变机器人视角），模型会主动综合多角度信息来确认潜在危险（如遮挡后的工人位置）。
- **时序异常检测**：连续监测工人运动轨迹与机器人工作空间的重叠程度，当预测到即将发生交集时提前预警。
- **基于安全标准的法规推理**：模型内化了 ISO 10218-1 和 ISO/TS 15066 的安全距离计算逻辑——不是简单的"近就是危险"，而是根据机器人末端速度、有效载荷和操作模式动态评估风险等级。

安全评估的核心公式为协作空间的最小安全距离：

$$d_{safe} = v_{robot} \times (t_{react} + t_{stop}) + d_{penetration}$$

其中 \(v_{robot}\) 为机器人末端最大线速度，\(t_{react}\) 为感知系统反应时间，\(t_{stop}\) 为机器人急停时间，\(d_{penetration}\) 为 ISO/TS 15066 规定的允许侵入距离（与人体部位和接触力有关）。

##### 空间锚定：点坐标与 bounding box 的统一表征

ER 模型使用统一的 tokenized 空间表示来处理不同粒度的空间指代：

- **Point Tokens**：`[POINT x y z]` 特殊 token 表示 3D 世界坐标系中的精确位置，训练时通过回归损失 \(\mathcal{L}_{coord} = \| \hat{p} - p \|_2\) 进行监督。
- **Box Tokens**：`[BOX x1 y1 x2 y2 z1 z2]` 表示 3D 包围盒，用于物体检测和6D位姿描述。
- **Semantic Regions**：`[REGION "可操作区域" polygons…]` 用于描述 affordance——物体上哪些部分可以被抓取、按压或旋转。

这些空间 token 嵌入到与文本 token 相同的序列中，由 Transformer 统一处理。训练时，空间 token 的损失权重被设为文本 token 的 \(5\times\)，以确保模型优先学好精确的空间推理。

##### 训练策略：先通才后专精 (Specialize-then-Rehearse)

ER 模型的训练分为三阶段：

1. **基座预训练（Foundation Pre-training）**：在 Web-scale 多模态数据上训练，获得通用视觉-语言理解能力。基础 VLM 参数量达到 Gemini 2.5 级别（数百 B 参数）。
2. **空间特化（Spatial Specialization）**：在约 3.3M 样本的具身数据集上微调，数据来源包括 Open X-Embodiment、内部遥操作数据和合成渲染场景。此阶段重点学习 3D 坐标预测、affordance 估计和空间关系推理。
3. **排练保持（Rehearsal）**：在特化完成后，用原始通用数据的一部分进行"复习"，防止灾难性遗忘——确保模型不会因为专注机器人数据而丧失通用 VLM 能力。

#### 🧪 练习题
```yaml
1. **架构设计**：ER 模型输出空间推理但不输出动作轨迹。请分析这种"脑-身分离"设计的优缺点。在哪些场景下这种做法优于端到端 VLA？在哪些场景下可能引入信息瓶颈？

2. **安全推理**：根据 ISO/TS 15066 安全距离公式 \(d_{safe} = v \cdot (t_{react} + t_{stop}) + d_{pen}\)，若机器人最大末端速度 \(v = 2\text{ m/s}\)，系统总延迟 \(t_{react} + t_{stop} = 0.3\text{ s}\)，允许侵入距离 \(d_{pen} = 0.1\text{ m}\)，计算最小安全距离。如果 ER 模型将 \(t_{react}\) 降低了 40%，新的安全距离是多少？

3. **多层级推理链**：设计一个"收拾餐桌"任务的三层级推理链示例。场景级应该识别哪些物体和关系？任务级如何分解？动作原语级如何为每个子任务定义精确的空间目标？

4. **Agentic Vision 扩展**：除工业安全外，Agentic Vision 还能应用于哪些场景？思考医疗手术机器人、无人机巡检、老人看护等领域的具体实现方式，并讨论隐私与伦理挑战。
```

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
NeuroVLA 的核心目标是：类脑架构0.4W功耗20ms生存本能。

#### 🎯 核心要点
- 核心动机：类脑架构0.4W功耗20ms生存本能
- 演化来源：继承或改进自 hpt
- 代表机构：智平方

#### 🔬 深入细节
类脑架构0.4W功耗20ms生存本能


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
π0.7 是 Physical Intelligence 推出的可操控通用视觉-语言-动作（VLA）模型，通过多模态提示（语言指令、元数据、控制模态、视觉子目标）训练，首次展示了机器人基础模型的**涌现组合泛化**能力——无需微调即可将已学技能重组用于新任务、新物体和新机器人本体，且开箱性能匹敌此前需 RL 微调的专家模型。

#### 🎯 核心要点
- 单一统一模型：π0.7 是一个通用 VLA 模型，能操控多种不同类型的机器人执行广泛任务，无需针对具体任务/本体进行微调
- 可操控（Steerable）架构：训练时注入多样化多模态提示——语言指令（what to do）、元数据/策略元数据（how to do: 质量、速度）、控制模态切换、视觉子目标图像
- 涌现组合泛化（Compositional Generalization）：首次展现机器人基础模型像 LLM 一样重组已学技能解决全新任务（如操作未见过的厨房电器、折叠衣物在新机器人本体上）
- 语言指导（Language Coaching）：可通过逐步口头指令"教"机器人新任务，并将指导经验蒸馏为高层策略实现完全自主执行
- Recap 蒸馏：将 RL（Recap 算法）训练中产生的自主数据蒸馏到 π0.7 模型中，单模型在折叠衣物、制作浓缩咖啡、折叠纸箱等任务上达到或超越 RL 专家策略的性能和吞吐量
- 跨本体迁移（Cross-Embodiment Transfer）：从固定双臂数据采集机器人到 UR5e 双臂系统的折叠衣物零样本迁移，成功率匹配经验丰富的人类遥操作员的零样本表现
- 广泛数据混合：融合多种机器人数据、人类演示数据和自主策略 rollout 数据，通过策略元数据标签（如质量/速度级别）实现有效的数据混合利用

#### 🔬 深入细节
##### 核心架构与推理流程

![π0.7 训练与推理流程示意图](https://www.pi.website/_next/image?url=%2Fimages%2Fpi07%2Fsubgoal_1.png&w=3840&q=75)
*图：π0.7 训练时接收语言指令、子目标图像、Episode 元数据（Quality/Speed）；推理时由高层策略生成任务指令 → 子任务指令，世界模型生成子目标图像，VLA 政策执行动作*

π0.7 的架构核心是一种**可操控（Steerable）的 VLA 模型**，其关键创新在于训练时向模型注入的不只是"做什么（what）"，还包括"怎么做（how）"的信息。训练时的多模态提示流包括：

1. **语言指令**：描述任务的自然语言（如 "pick up the oven mitt" → "open the drawer" → "grab the spatula"...），构成任务执行的层次化语义指导
2. **视觉子目标（Subgoal Images）**：世界模型生成的期望未来观察图像，为策略提供视觉锚定的中间目标状态
3. **Episode 元数据（Metadata）**：标量标签（如 Quality 和 Speed 等级），使同一模型可以根据部署需求调整行为风格——高质量模式更稳健，高速度模式更快

推理时的高层流程：

```
高层策略（High-Level Policy）
  ├── 任务指令（TASK INSTRUCTION）
  └── 子任务指令序列（SUBTASK INSTRUCTIONS）
       └── 世界模型（World Model）
            └── 子目标图像（SUBGOAL）+ 期望元数据（Quality/Speed）
                 └── π0.7 VLA Policy → 动作序列
```

```python
# π0.7 推理流程伪代码
def pi07_inference(observation_history, task_instruction, metadata):
    """
    推理时 π0.7 接收多模态提示并自回归生成动作序列
    
    Args:
        observation_history: 历史观测（图像）序列
        task_instruction:  高层/子任务语言指令
        metadata:          dict with "quality" 和 "speed" 键控制行为风格
    """
    # 1. 高层策略将任务分解为子任务语言指令
    subtask_instructions = high_level_policy.generate(task_instruction)
    
    for subtask_text in subtask_instructions:
        # 2. 世界模型根据当前观测+子任务文本生成视觉子目标
        subgoal_image = world_model(
            observation_history,
            subtask_text,
            desired_metadata=metadata
        )
        
        # 3. VLA 策略融合所有模态生成动作
        #    输入: 观测记忆 + 子任务文本 + 子目标图像 + 元数据
        action = pi07_vla_policy(
            obs_memory=observation_history,
            language_prompt=subtask_text,
            visual_subgoal=subgoal_image,
            quality_flag=metadata["quality"],
            speed_flag=metadata["speed"]
        )
        
        # 4. 执行动作并更新观测历史
        observation_history = execute_and_update(action)
```

##### 组合泛化的实现机制

π0.7 的组合泛化能力来源于三个层面的设计：

**① 多样化多模态提示的解耦训练（Disentangled Prompt Training）**

传统 VLA 模型训练时仅使用单一的语言指令或目标图像，π0.7 在训练过程中**同时或交替使用多种提示模态**——语言、元数据、控制模态标志和视觉子目标。这迫使模型学会将技能的不同维度（语义理解、行为质量、执行速度、视觉推理）解耦编码，从而在推理时可以实现自由重组。

例如，训练数据中：
- 样本 A：语言 = "fold the towel"，质量 = high，速度 = low
- 样本 B：语言 = "wipe the counter"，质量 = medium，速度 = high
- 样本 C：仅提供视觉子目标，无语言

通过交错训练，模型学会了"折叠毛巾"的语义技能和"高质量"的执行风格是两个可独立的因子，推理时即可将"折叠衣物"（已学语义）+"高质量"+"UR5e 本体观测"组合。

**② 语言指导（Language Coaching）的动态技能获取**

这是 π0.7 实现新任务泛化的关键管道。对于训练数据中未出现的新任务（如操作空气炸锅），人类通过逐步口头指令引导机器人：

1. **零样本尝试**：给定高层指令 "load a sweet potato into the air fryer"，π0.7 做出合理但不完整的尝试（打开空气炸锅、尝试放入红薯，但未能完成）
2. **逐步语言指导**：人类提供细致步骤指令（"open the air fryer basket" → "place the sweet potato inside" → "close the basket" → "press start"），π0.7 在执行过程中将语言指令与视觉观察和动作进行对齐
3. **高层策略蒸馏**：多次指导后，将成功的语言指令序列用于微调高层策略，使其能自主生成子任务指令序列，实现完全自主执行

这一流程本质上是一种**基于语言的上下文化强化学习**：模型利用预训练的语义理解和物理操控能力，通过语言提示"锚定"新任务的执行轨迹。

**③ Recap RL 经验的数据蒸馏**

π0.7 在训练数据上集成了 Recap 算法产生的自主 rollout 轨迹。Recap 是 RL 微调流程，用于同时优化任务成功率和执行速度。关键发现是：

- 直接将 RL rollout 数据与其他数据源（人类演示、不同机器人数据）混合训练**并不能**带来好的效果
- 解决方案是给每条数据打上策略元数据标签（quality level, speed level），让模型在学习过程中条件化于这些元数据
- 最终单一 π0.7 模型能在折叠衣物、浓缩咖啡制作、折叠纸箱等任务上达到或超越任务专属 RL 专家策略（Recap specialist）的表现

这验证了一个重要假设：**如果给予正确的条件化信号，通用模型可以从多样化质量的数据中有效学习，而不会被低质量数据污染**。

##### 与传统方法的区别

| 维度 | 传统 VLA 模型 | π0.7 |
|------|:------------:|:----:|
| 任务泛化 | 需对每个任务微调（fine-tuning）才能获得好性能 | 开箱即用，多任务直出 |
| 技能重组 | 未见组合泛化能力报道 | 涌现组合泛化，操作新电器、新本体折叠衣物 |
| 行为风格 | 固定策略，无法调节质量/速度 | 通过元数据标签实时调控行为风格 |
| 新技能获取 | 需收集新演示数据 | 语言指导 + 高层策略蒸馏，无新遥操作数据 |
| 数据利用 | 谨慎过滤数据，避免低质量数据拖累 | 策略元数据条件化，可有效利用混合质量数据 |

> 💡 关键洞察：π0.7 的核心贡献不是架构创新，而是**训练策略和数据混合方式的创新**——它证明了正确的多模态条件化可以让 VLA 模型涌现出此前仅在 LLM 中观察到的组合泛化能力。

> ⚠️ 注意：π0.7 的组合泛化仍处于"早期迹象"阶段——在空气炸锅任务的重试后仍需语言指导才能成功。Physical Intelligence 明确将其描述为"first signs of compositional generalization"，而非完全解决。

##### 训练与推理代价

从博客披露的信息推断，π0.7 的训练融合了：
- 多机器人平台（双臂固定式、UR5e 双臂、Franka 等）的操作数据
- 开源 DROID 数据集（Franka 臂）
- 人类遥操作演示数据
- Recap RL 自主 rollout 数据

策略元数据标签（Quality/Speed）使模型可以条件化地利用不同质量水平的数据——低质量数据在低质量标签下仍可提供有价值的探索信息，而不会在高标签条件下误导模型。这是数据高效利用的关键工程设计。

#### 🧪 练习题
```yaml
question: "π0.7 实现组合泛化的关键训练机制是什么？"
options:
  - "使用更大的 Transformer 模型参数量"
  - "通过多模态提示（语言、元数据、子目标图像）解耦技能维度，并在推理时重组"
  - "在测试时用 RL 对每个新任务进行快速微调"
  - "仅使用人类专家演示数据，确保数据质量一致性"
answer: 1
explain: "π0.7 训练时同时/交替接收语言指令、策略元数据（质量/速度）、视觉子目标等多样化提示，促使模型将技能语义与执行风格解耦编码；推理时可通过自由重组这些因子实现对未见任务/本体的泛化。"
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
