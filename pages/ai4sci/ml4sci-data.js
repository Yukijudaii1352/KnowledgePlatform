/**
 * ml4sci-data.js — 由 pipeline/build.py 于 2026-06-15 18:08:19 自动生成。
 * 源文件：content/ai4sci/ml4sci.md
 * ⚠️  请勿手动修改；如需更新，修改源文档后重新编译。
 */
window.PAGE_CONFIG = {
  "meta": {
    "domain": "ai4sci",
    "topic_id": "ml4sci",
    "topic_name": "科学机器学习技术演进",
    "page_title": "科学机器学习技术演进",
    "page_subtitle": "2026-06-15 版",
    "page_desc": "从物理信息神经网络（PINN）到神经算子、可微分仿真与科学计算加速的技术发展脉络",
    "page_icon": "⚛️",
    "hero_pills": [
      "🏷️ PINN · Neural Operators · Differentiable Physics · AI4Science"
    ],
    "count_pill": "{count} 个算法",
    "image_base": "",
    "overview_from_doc": true,
    "latest_overview_from_doc": true
  },
  "overview": [
    {
      "title": "",
      "body_html": "<h1>ML如何做科学发现？牛津大学268页博士论文详述科学机器学习内涵</h1>\n<ul>\n<li>来源平台: <strong>zhihu</strong>（知乎专栏文章）</li>\n<li>原文链接: <a href=\"https://zhuanlan.zhihu.com/p/571820376\">https://zhuanlan.zhihu.com/p/571820376</a></li>\n<li>作者: 新智元</li>\n</ul>\n<hr />\n<p>ML如何做科学发现？牛津大学268页博士论文详述科学机器学习内涵</p>\n<h1>ML如何做科学发现？牛津大学268页博士论文详述科学机器学习内涵</h1>\n<p>作者: 新智元, 赞: 71</p>\n<p>作者：专知 编辑：桃子</p>\n<h3><strong>【新智元导读】</strong>现在，AI4Science是个热门的话题。如何把机器学习方法用在科学领域是个比较实际的问题。科学机器学习(SciML)的领域。SciML的中心目标是将现有的科学理解与ML更紧密地结合起来，生成强大的ML算法，这些算法由我们的先验知识提供信息。非常值得关注！</h3>\n<p>机器学习(ML)已经使我们实践科学的方式发生了根本性的转变，许多人现在把从数据中学习作为他们研究的重点。随着我们想要研究的科学问题的复杂性的增加，以及当今科学实验产生的数据量的增加，ML正在帮助自动化、加速和增强传统的工作流程。站在这场革命前沿的是一个被称为科学机器学习(SciML)的领域。SciML的中心目标是将现有的科学理解与ML更紧密地结合起来，生成强大的ML算法，这些算法由我们的先验知识提供信息。</p>\n<p><img alt=\"\" src=\"https://pic4.zhimg.com/v2-f70bace944e898f041d559937f25e3d7_1440w.jpg\" /></p>\n<p>论文地址：<a href=\"https://link.zhihu.com/?target=https%3A//ora.ox.ac.uk/objects/uuid%3Ab790477c-771f-4926-99c6-d2f9d248cb23\">https://ora.ox.ac.uk/objects/uuid:b790477c-771f-4926-99c6-d2f9d248cb23</a></p>\n<p>目前存在大量将科学原理纳入ML的方法，人们对SciML解决科学中一些最大挑战的期望越来越高。然而，该领域正在蓬勃发展，许多问题仍在出现。一个主要的问题是SciML方法是否可以扩展到更复杂的现实问题。许多SciML研究正处于概念验证阶段，在这个阶段，技术将在简化的、简单的问题上进行验证。然而，了解它们在更复杂的问题上的可扩展性对于它们的广泛应用至关重要。这个问题是本文的中心问题。</p>\n<p>首先，针对月球科学和地球物理领域的三个复杂的、真实的、特定领域的案例研究设计了多种不同的物理知识机器学习方法，并评估了它们的性能和可扩展性。其次，评估和改进了物理信息神经网络(一种流行的通用SciML方法)求解具有大区域和高频解的微分方程的可扩展性。讨论了这些研究的共同观察结果，并确定了显著的优势和潜在的限制，突出了设计可扩展的SciML技术的重要性。</p>\n<p><strong>导论</strong></p>\n<p>机器学习(ML)在科学领域引起了一场革命。传统上，科学研究围绕着理论和实验：一个人提出一个手工制作的和定义良好的理论，然后使用实验数据不断完善它，并分析它以做出新的预测。但今天，许多人都把从数据中学习作为他们研究的重点。在这里，世界的模型是通过ML算法从数据中学习的，现有的理论是不需要的。这种转变的发生有多种原因。</p>\n<p>首先，ML领域在过去十年中经历了指数级增长，这一激增背后的主要驱动因素通常被归因于深度学习的突破[Goodfellow et al.，2016]。一些重要的发现，如使用更深层次的网络设计和更好的训练算法，以及更强大的计算架构的可用性，已经导致深度学习技术在广泛问题上的性能迅速提高[Dally et al.，2021年]。现代ML算法现在能够学习和解决难以置信的复杂任务，从自动驾驶汽车[Schwarting et al.，2018年]到击败世界级围棋选手[Silver et al.，2018年]。</p>\n<p>伴随着这些进步，今天的科学实验产生了越来越多的数据，研究越来越复杂的现象[Baker et al.， 2019, Hey et al.， 2020]。人类和我们的传统工作流程对所有这些数据进行分析和理论化正在迅速变得不可能，不久之后，科学实验很可能会受到他们从已有数据中提取见解的能力的限制，而不是他们可以收集什么数据[Baker et al.， 2019]。鉴于ML可以提供强大的工具，许多研究人员正在转向ML来帮助自动化、加速和增强传统的工作流程。在过去十年中，新的ML算法和数据可用性的结合导致了一些重大的科学进步。例如，ML已经被用于比以往任何时候都更准确地预测蛋白质结构[Jumper et al.， 2021]，从神经活动合成语音[anummanchipalli et al.， 2019]，以及改进量子多体系统的模拟[Carleo和Troyer, 2017]。事实上，现代的ML算法现在已经被应用到科学的几乎每一个方面，这个时代的一个决定性研究问题已经变成：「解决问题X，并将ML应用到它上面」，随之而来的是有趣且常常令人兴奋的结果。</p>\n<p>然而，尽管有这些进步，但ML，特别是深度学习算法的各种缺点在ML领域已经具体化。例如，尽管它们能够学习高度复杂的现象，但深度神经网络通常被视为「黑箱」，人们缺乏对它们如何表示和推理世界的理解。这种不可解释性是一个关键问题，特别是对于需要对网络预测进行论证的安全关键应用[Gilpin et al.，2019,Castelvecchi, 2016]。此外，关于如何设计适合特定任务的深度学习算法，几乎没有理论指导。深度神经网络架构的选择主要是根据经验进行的，尽管元学习和神经架构搜索领域开始提供更多自动化的方法[Elsken et al.，2019年，Hospedales et al.，2021年]。最后，尽管深度神经网络表达能力很强，但它们受到训练数据的限制，在训练分布之外通常表现不佳。学习在新任务中表现良好的世界可泛化模型是更通用人工智能(AI)系统的一个关键特征，也是ML领域的一个关键突出挑战[Bengio et al.，2021]。</p>\n<p>当在科学问题中使用ML时，研究人员开始遇到这些限制[Ourmazd, 2020, Forde和Paganini, 2019]。鉴于深度神经网络的泛化能力较差，一个关键问题是它们是否真正「学习」了科学原理。一个好的科学理论被期望能在实验数据之外做出新颖而准确的预测，然而深度神经网络在训练数据之外很难做出准确的预测。即使一个网络可以做出可靠的预测，考虑到它们的不可解释性，从它们中提取任何有意义的科学见解可能是具有挑战性的。</p>\n<p>另一个主要问题是，许多当前的机器学习工作流完全用学习的模型取代了传统的科学模型。虽然这可能很有用，但这些纯数据驱动的方法「抛弃」了我们大量的先验科学知识。</p>\n<p>重要的一点是，对于许多问题，有一个现有的理论可以建立，而不是从头开始。在一个传统上基于明确的理论和实验之间紧密相互作用的领域，一些人认为上述限制使当前的ML方法不可接受。这些担忧促使形成了一个快速发展的新领域，称为科学机器学习(SciML) [Baker et al., 2019, Karniadakis et al., 2021, Willard et al., 2020, Cuomo et al., 2022, Arridge et al., 2019, Karpatne et al., 2017a]。SciML的目标是将现有的科学知识和ML融合在一起，生成更细微的ML算法，这些算法由我们的先验知识提供信息，如图1.1所示。这一领域的关键论点是，通过这样做，我们将最终获得更强大的科学研究方法。传统方法和ML方法各有优缺点，两者的结合可能比其中一种更有效。例如，在进行数据同化时(例如在气候模型中)，可以使用传统物理模型提供先验知识，而ML可用于解释数据依赖性和其他未知物理。</p>\n<p><img alt=\"\" src=\"https://pic2.zhimg.com/v2-3aeb27dbcca81d4aabaf49d870709c0d_1440w.jpg\" /></p>\n<p>图1.1：科学机器学习(SciML)概述。SciML旨在将ML与科学知识紧密结合，以便为科学研究生成更强大、鲁棒和可解释的ML方法。</p>\n<p>人们对这一领域的期望正在迅速增长，目前正在提出和研究大量的方法和许多创新策略，以将科学知识融入ML。这些方法的范围从预期的科学任务(例如模拟、反演和控制方程发现)，到不同的方法来合并科学原理(例如通过深度神经网络的架构、其损失函数和混合模型的使用)，以及科学原理被强加的程度(例如通过硬约束或软约束)。我们将在第2章中详细回顾这些方法。许多方法使用来自物理学的思想来通知其在SciML的子领域称为物理信息机器学习(PIML)的ML算法[Karniadakis等人，2021]。</p>\n<p>到目前为止，SciML 取得了一些初步的成功。它帮助我们进行了强大的模拟[Raissi al.，2019]，发现了复杂物理系统的控制方程[Kutz和Brunton, 2022]，在反演问题中精确地反演基础参数[Arridge等人，2019]，并在广泛的领域中无缝地将传统工作流与学习过的组件[Rackauckas等人，2020,Thuerey等人，2021]。尽管有早期的希望，但SciML领域仍处于起步阶段，出现了许多重要的问题，例如;我们应该如何实施科学原则?我们应该如何平衡数据驱动模型的可解释性的缺乏和现有理论的清晰性?是否存在可以跨科学学科应用的总括的SciML技术?SciML能否为ML领域提供新的视角和思路?对于复杂的现实世界问题，SciML技术的扩展性有多好?本文主要研究最后一个问题，具体讨论如下。</p>\n<p>在本文中，我们主要采用两种方法来研究上述子问题。首先，针对前3个子问题，使用复杂的、真实的、特定领域的案例研究来考察多种不同的PIML方法的性能和可扩展性。对于每个子问题，我们提出了一个案例研究，提出了一种PIML技术(或各种PIML技术)来解决它，并评估该技术如何扩展到这种设置。其次，针对最后一个子问题，我们专注于单一的通用PIML技术，并评估和改进其可扩展性。前三个子问题分别在本论文的单独一章(分别为第3 ~ 5章)中进行研究，其案例研究均来自月球科学和地球物理学领域。最后一个子问题将在第6章进行研究。最后，我们在第七章中讨论和总结了每一章对我们主要研究问题的影响。</p>\n<p>SciML方法谱系。这张图显示了本章中介绍的不同类型的SciML方法对科学知识的「强」程度。注意，科学约束的强度是一个相当模糊的概念;在这个图中，我们将其定义为SciML方法与传统工作流的接近程度。中间的方法同样将ML与传统工作流的某些方面结合起来，例如在循环方法中，将传统迭代求解器与ML模型交织在一起。此外，我们的作业有些主观，所以这个数字只是为了表达总体趋势。</p>\n<p><img alt=\"\" src=\"https://pica.zhimg.com/v2-7add7e5fe802c148642b2f32a3872c52_1440w.jpg\" /><img alt=\"\" src=\"https://pica.zhimg.com/v2-e3dfbc20e93eeb954ca0f425aab222fa_1440w.jpg\" /><img alt=\"\" src=\"https://pic3.zhimg.com/v2-8fa22bf3a7ba2ba2e2f11bc9faf5a398_1440w.jpg\" /></p>"
    }
  ],
  "latest_overview": [
    {
      "title": "",
      "body_html": "<h1>从底层生态到可微分大涡模拟：近几年可微分 CFD 求解器的 AI4Science 学术探索</h1>\n<ul>\n<li>来源平台: <strong>zhihu</strong>（知乎专栏文章）</li>\n<li>原文链接: <a href=\"https://zhuanlan.zhihu.com/p/2041931453626373782\">https://zhuanlan.zhihu.com/p/2041931453626373782</a></li>\n<li>作者: 李剑斌</li>\n</ul>\n<hr />\n<p>从底层生态到可微分大涡模拟：近几年可微分 CFD 求解器的 AI4Science 学术探索</p>\n<h1>从底层生态到可微分大涡模拟：近几年可微分 CFD 求解器的 AI4Science 学术探索</h1>\n<p>作者: 李剑斌, 赞: 30</p>\n<p>近年来，<strong>可微分物理（Differentiable Physics）</strong>与<strong>自动微分（Automatic Differentiation, AD）</strong>的结合，已成为科学机器学习（SciML / AI4Science）领域最受关注的前沿方向之一。传统的 CFD 求解器正在从纯粹的“数值计算工具”向“端到端可导的物理底座”演进，为湍流模型的构建和流场反演带来了全新的范式。</p>\n<p>系统梳理近几年的学术工作，我们可以清晰地看到一条学术界在“物理-数据驱动融合”和“全可微流体生态”上的探索脉络。</p>\n<hr />\n<h2>1️⃣ 物理与数据驱动的早期探索：从流场加速到动力学超分辨率</h2>\n<p>在可微分流体求解器发展的初期，学术界的核心关切在于：<strong>如何在保持基本物理守恒的前提下，用可微框架解决神经网络的泛化性与数值稳定性问题？</strong></p>\n<ul>\n<li>\n<p><strong>物理驱动的高效加速（粗网格修正范式）</strong>：</p>\n</li>\n<li>\n<p>Kochkov 等人 (2021) 在 <em>Machine learning–accelerated CFD</em> 中奠定了这一方向的基础。他们的核心思路很直接：<strong>与其用纯黑箱模型替代整个物理模拟，不如保留传统数值框架，只把其中对网格最敏感的部分（比如对流项）换成可学习的模块</strong>。整个代码基于 <strong>JAX</strong> 实现，支持端到端的自动微分，从而在训练中同时优化神经网络和数值求解器的交互。最终，模型在 <strong>10 倍更粗</strong>的网格上实现了与高分辨率求解器相当的精度，并获得 <strong>40–80 倍</strong>的加速。值得注意的是，这种放在更粗网格上计算的方式本质上等同于用神经网络构建了 LES 计算的亚格子模型。更重要的是，这种方法对未见过的外力、更大计算域甚至更高雷诺数都有良好的泛化能力，远优于纯黑箱的 ResNet、图网络等方法。这篇工作清晰地展示了“<strong>神经网络预测 + 可微物理约束</strong>”的混合范式，也成为后续 AI4Science 中可微分求解器研究的重要起点。</p>\n</li>\n</ul>\n<p><img alt=\"\" src=\"https://pic2.zhimg.com/v2-864decb284350ec19e1af4d06340e6dd_1440w.jpg\" /></p>\n<p>A图展示了在同等精度下，学习插值法（橙线）相对直接模拟（蓝线）实现约 86倍加速。B图证明模型能泛化到“更大计算域、衰减湍流”等未见场景。C图揭示了核心架构：仅用CNN替换最敏感的对流项插值，保留散度、压力投影等物理约束，实现端到端可微训练。</p>\n<ul>\n<li>\n<p><strong>后验端到端湍流建模（克服数值发散）</strong>：</p>\n</li>\n<li>\n<p>List 等人 (2022) 在 <em>Learned turbulence modelling with differentiable fluid solvers</em> 中深入解决了“先验训练（a priori）模型在在线仿真中容易发散”的痛点。他们构建了一个<strong>完全可微的 PISO 求解器</strong>（基于 TensorFlow + 自定义 CUDA 算子），并把 CNN 修正项直接嵌入到每个时间步的预测步中，实现了真正的<strong>后验（a posteriori）端到端训练</strong>。</p>\n</li>\n<li>关键发现是：训练时<strong>展开（unroll）的时间步数至少要覆盖一个积分时间尺度</strong>，模型的长时稳定性和精度才会显著提升。他们最长展开了 60 步，并为此设计了<strong>梯度分块回传</strong>技巧，避免了长序列训练中的梯度爆炸/消失。</li>\n<li>此外，他们引入了基于物理的复合损失函数（包含动能谱、应变率张量等项），比纯 L2 损失更能保持湍流的统计特性。最终在三个二维流动测试（各向同性衰减湍流、时间/空间发展的混合层）上，该方法能以 8 倍粗网格获得接近 DNS 的后验统计，<strong>推理速度相比达到同等精度的传统求解器提升最高约 14 倍</strong>，且模型在不同扰动条件下表现出良好的泛化能力。</li>\n</ul>\n<p><img alt=\"\" src=\"https://picx.zhimg.com/v2-e29f693ca411fb83749af9a08234577f_1440w.jpg\" /></p>\n<p>List 等 (2022) 混合架构：可微 PISO 求解器内嵌 CNN。训练时展开 m 步（最长 60 步），CNN 根据低分辨率流场输出修正力，支持端到端梯度回传。此方法突破了先验模型在线仿真易发散的瓶颈。</p>\n<ul>\n<li>\n<p><strong>损失函数中的动力学约束（流场超分辨率的物理重构）</strong>：</p>\n</li>\n<li>\n<p>Page (2025) 的最新工作 <em>Super-resolution of turbulence with dynamics in the loss</em> 将可微分求解器的应用推向了一个新场景：<strong>湍流超分辨率的无监督/自监督训练</strong>。传统超分辨率方法需要大量高分辨率图像作为标签，而该工作仅利用粗网格观测数据，在损失函数中引入<strong>时间展开（unroll）</strong>——即让网络预测出的高分辨率流场通过可微分求解器（JAX-CFD）向前演化若干步，然后将演化后的粗网格结果与真实粗网格轨迹对齐。这样一来，网络不需要看到任何高分辨率真值，就能学会生成符合 Navier-Stokes 演化规律的物理场。实验表明，该方法在 Re=1000 的二维 Kolmogorov 流上，重建误差与依赖高分辨率标签的标准方法相当，甚至在时间展开后误差更低。与传统的变分数据同化（4DVar）相比，该网络在初始时刻的状态估计精度更高，且对噪声（σ=0.05）和小数据集都有较好的鲁棒性。这项工作展示了“可微物理 + 轨迹匹配”在实验数据稀缺场景下的巨大潜力。</p>\n</li>\n</ul>\n<p><img alt=\"\" src=\"https://pic1.zhimg.com/v2-60c3cb57106b75a3c21658bedb09c9c6_1440w.jpg\" /></p>\n<p>Page (2025) 架构：输入粗网格速度场，经上采样、残差块和 Leray 投影，输出满足无散度的高分辨率场。核心是“时间展开”：输出通过可微分求解器向前演化，仅对齐演化后的粗网格轨迹来计算损失，无需高分辨率标签即可实现物理一致的湍流超分辨率。</p>\n<hr />\n<h2>2️⃣ 全可微高性能求解器底座：以 JAX-Fluids 为核心的学术生态</h2>\n<p>随着方法论的推进，研究重心逐渐延伸到了<strong>全可微高性能流体求解器底座的构建</strong>上。自动微分在流体中往往面临显存爆炸和多卡并行效率低的瓶颈，学术界通过构建全可微生态，成功将自动微分应用到了更复杂的流动场景中。</p>\n<ul>\n<li>\n<p><strong>JAX-Fluids 生态的演进与 HPC 探索</strong>：</p>\n</li>\n<li>\n<p>JAX-Fluids 系列是“可微分求解器”从学术原型走向工程应用的典型代表。<strong>1.0 版本</strong>（Bezgin et al., 2023）构建了一个基于 JAX 的<strong>高阶有限体积框架</strong>，支持可压缩单相/两相流（level-set 水平集），并将 WENO 重构、HLLC Riemann 求解器等复杂数值算子全部封装为可微分的模块。通过端到端优化，作者成功学习了一个低耗散的 Rusanov 型数值通量，证明了“在可微分求解器中训练物理算子”的可行性。<strong>2.0 版本</strong>（Bezgin et al., 2025）则聚焦于<strong>高性能计算</strong>，利用 JAX 原生的 <code>pmap</code> 和 <code>ppermute</code> 实现了同构区域分解，在 512 张 NVIDIA A100 和 1024 个 TPU v3 核心上取得了 &gt;0.95 的弱扩展效率。更重要的是，分布式环境下的自动微分（AD）梯度依然稳定——这为大规模反问题、数据同化和湍流模型在线训练扫清了关键障碍。新增的扩散界面模型（五方程）、正保持限制器和拉伸网格进一步拓展了其物理建模能力。两篇文献共同勾勒出一条从“可微核心”到“可微大规模并行”的清晰技术路径。</p>\n</li>\n</ul>\n<p><img alt=\"\" src=\"https://pica.zhimg.com/v2-1158f09d6000e549f8dbb6fcf09f4726_1440w.jpg\" /></p>\n<p>Bezgin 等利用 JAX-Fluids 可微分求解器，在粗网格上端到端优化 Rusanov 数值通量。对比显示：优化后的 Rusanov-NN（第三行）相比传统 Rusanov（第四行）大幅降低数值耗散，准确捕捉了流动细节，逼近细网格真值（Exact/CG）。这验证了在可微 CFD 中训练物理算子的可行性。</p>\n<p><img alt=\"\" src=\"https://pica.zhimg.com/v2-0951aca98d7aaa339959acb0d4c92a4c_1440w.jpg\" /></p>\n<p>JAX-Fluids 2.0 的两相流模型验证：通过与实验纹影对比，证明新增的扩散界面模型（DIM）与水平集模型（LSM）均能精确捕捉激波与氦气泡相互作用的变形及射流，展示了可微求解器在复杂两相流中的可靠性。</p>\n<ul>\n<li>\n<p><strong>基于 JAX-Fluids 生态的下游学术应用</strong>：</p>\n</li>\n<li>\n<p><strong>主动流动控制（Active Flow Control）的逆向优化</strong>：<strong>自动微分驱动的端到端控制律学习</strong></p>\n</li>\n<li>\n<p>Wang &amp; Chu (2025) 基于 JAX‑Fluids 的可微框架，首次实现了<strong>完全可微分的边界条件</strong>，并利用自动微分（AD）对可压缩湍流槽道流的主动控制律进行端到端优化。在 receding‑horizon 框架下，每个优化 episode 包含约 <img alt=\"4\\times 10^{4}\" src=\"https://www.zhihu.com/equation?tex=4%5Ctimes+10%5E%7B4%7D\" /> 个控制变量和 <img alt=\"3\\times10^9\" src=\"https://www.zhihu.com/equation?tex=3%5Ctimes10%5E9\" /> 个状态变量，AD 只需一次反向传播即可获得精确梯度，避免了传统伴随方法复杂的方程推导和有限差分的步长敏感问题。</p>\n</li>\n<li>研究发现：直接以<strong>壁面摩擦</strong>为优化目标虽然短期内有效，但会导致湍流结构向外区迁移，长期失稳；而以<strong>湍动能（TKE）</strong>为目标则能全局抑制湍流，实现稳定约 20% 的减阻。对于可调渗透壁面，AD 优化发现了一种“通量诱导”机制，通过局部渗透率分布注入近壁动量，同样获得了最高约 15% 的减阻。</li>\n<li>这项工作充分展示了 AD 在复杂非定常流动控制中的潜力——梯度精确、实现简便，且能结合物理直觉设计损失函数，为数据驱动与物理融合的控制优化开辟了新路径。</li>\n</ul>\n<p><img alt=\"\" src=\"https://pic2.zhimg.com/v2-5ddf3ab240b8cd6327fa9a3ed265cd1f_1440w.jpg\" /></p>\n<p>展示基于JAX-Fluids的可微优化框架：将边界条件参数 γγ 纳入计算图。AD仅需一次反向传播即可在 3×1093×10 9 状态变量中获得精确梯度。关键发现：直接以壁面摩擦为目标会导致湍流外移及失稳；而以湍动能（TKE）为目标可实现稳定约 20% 减阻。</p>\n<ul>\n<li>\n<p><strong>数据驱动的形状反演</strong>：<strong>ODIL 框架下的超音速流场与几何联合重构</strong></p>\n</li>\n<li>\n<p>Buhendwa 等人 (2025) 基于 JAX‑Fluids 的可微框架，将<strong>优化离散损失（ODIL）</strong>方法拓展至三维稳态超音速流（Euler 方程）的逆向问题。与 PINN 不同，ODIL 直接在离散网格上优化流场与 Level‑set 形状参数，并利用 JAX‑Fluids 的高阶激波捕捉格式（如 MUSCL‑LLF）和锐利界面浸没边界法计算 PDE 残差，通过自动微分获得精确梯度。</p>\n</li>\n<li>在参数化形状（圆柱/球/椭圆）反演中，ODIL 与 PINN 均能准确识别几何参数，但 ODIL 在无测量区域的激波捕捉上明显更锐利、误差低一个数量级。在更具挑战的<strong>自由形状反演</strong>中（直接优化每个网格点的 Level‑set 值），ODIL 仍能仅凭稀疏的原始变量与纹影测量，联合重构出合理的流场与物形——尽管下游形状存在一定非唯一性，但上游激波位置与驻点区重构准确。该方法为超音速气动外形辨识提供了新范式。</li>\n</ul>\n<p><img alt=\"\" src=\"https://pica.zhimg.com/v2-3f73a32b6441bfde8b596fe103439f6a_1440w.jpg\" /></p>\n<p>参数化形状反演中流场重建对比图。左三列为密度场 ρ，右三列为速度场 u。三行分别为圆柱、椭圆和球体。ODIL 在无测量区域对激波捕捉更为锐利，而 PINN 在激波和尾流区域出现明显模糊和平滑，这与文中“ODIL 误差低一个数量级”的定量结论一致。</p>\n<hr />\n<h2>3️⃣ 最新学术前沿突破：复杂拓扑网格下的可微分 Wall-modeled LES</h2>\n<p>传统可微流体方法大多局限在低雷诺数、规则直角网格或层流问题中，而高雷诺数壁面束缚湍流带来的巨大计算量，使得全分辨率（wall‑resolving）网格的自动微分几乎不可行。Zhang 等人（2026）在 <em>Journal of Computational Physics</em> 上发表的工作，首次将可微分求解器与<strong>壁面模化大涡模拟（wall‑modeled LES）</strong>结合，成功突破了这一瓶颈。</p>\n<p>该方法的核心创新包括：① 基于 Julia 和 ForwardDiff 实现的前向自动微分，直接对 LES 求解器进行端到端求导；② 将简化的湍流边界层方程（TBLE）嵌入可微框架，并用神经网络系数对残余应力项进行物理‑启发式参数化。这使得模型能够在仅依赖少量稀疏观测（如摩擦速度或速度剖面）的情况下，在运行中自适应地学习近壁动力学。更重要的是，该方法天然支持<strong>曲线网格（curvilinear grids）</strong>上的度规变换与边界导数回传，在测试中成功泛化至雷诺数高达 <img alt=\"10^{10}\" src=\"https://www.zhihu.com/equation?tex=10%5E%7B10%7D\" /> 的槽道流，以及周期山、高斯凸包、壁面凸起和光滑斜坡等多种复杂几何，且无需重新训练。尽管目前仍以结构化曲线网格为主，但这项工作在学术上首次打通了高雷诺数非定常壁湍流的端到端可微仿真路径，为数据驱动的大涡模拟壁模型开辟了新方向。</p>\n<p><img alt=\"\" src=\"https://pica.zhimg.com/v2-1a5dc97f426224b48ebb503ea5b7ff7e_1440w.jpg\" /></p>\n<p>Zhang 等 (2026) 的可微分 WMLES 示意图。基于 Julia 和 ForwardDiff 实现前向 AD，将神经网络壁模型直接嵌入 LES 边界条件（右）。关键突破是支持复杂拓扑的曲线网格（左），打破了可微流体局限于规则网格的瓶颈。</p>\n<hr />\n<h3>总结</h3>\n<p>纵观近几年的文献脉络，Differentiable CFD 作为一个新兴的 AI4Science 分支，在学术方法论上取得了长足的进步。但必须清醒地看到，<strong>该方向离真正的工业级落地仍有相当长的距离</strong>。</p>\n<p>当前面临的主要瓶颈与未来值得探索的方向包括：</p>\n<ol>\n<li><strong>复杂几何拓扑的限制</strong>：目前绝大多数前沿工作（包括最新的 WMLES）仍局限于单块结构网格或理想几何，如何扩展到工业界常用的<strong>多块结构网格（Multi-block structured grids）或非结构网格</strong>，在底层算法上仍需重要突破。</li>\n<li><strong>高阶数值格式带来的梯度不稳定性</strong>：在可压缩流动中，为捕捉激波而采用的高阶非线性重构（如 WENO/TENO）及近似 Riemann 求解器（如 HLLC），其非光滑的数值行为在自动微分中易引发梯度震荡或爆炸。曲线网格下的度规变换和边界处理会进一步放大这一问题，对梯度稳定性构成严峻挑战。</li>\n<li><strong>长时间历程下的混沌效应</strong>：流体非线性系统在长时间积分（Long-time horizon）下具有强烈的混沌特性（Chaos），会导致伴随梯度爆炸或消失（Gradient Explosion/Vanishing），这需要更高级的影子伴随（Shadowing）或时间分段优化算法来解决。</li>\n</ol>\n<p>将传统 CFD 的高阶数值格式、物理机理模型与现代自动微分框架（如 JAX）进行系统融合，是一项需要长期积累的严谨工作。保持客观、理性和扎实的工程思维，才是推动 AI4Science 持续前行的基础。</p>\n<ol>\n<li>Kochkov D, Smith J A, Alieva A, et al. Machine learning–accelerated computational fluid dynamics[J]. Proceedings of the National Academy of Sciences, 2021, 118(21): e2101784118.</li>\n<li>List B, Chen L W, Thuerey N. Learned turbulence modelling with differentiable fluid solvers: physics-based loss functions and optimisation horizons[J]. Journal of Fluid Mechanics, 2022, 949: A25.</li>\n<li>Page J. Super-resolution of turbulence with dynamics in the loss[J]. Journal of Fluid Mechanics, 2025, 1002: R3.</li>\n<li>Bezgin D A, Buhendwa A B, Adams N A. JAX-Fluids: A fully-differentiable high-order computational fluid dynamics solver for compressible two-phase flows[J]. Computer Physics Communications, 2023, 282: 108527.</li>\n<li>Bezgin D A, Buhendwa A B, Adams N A. JAX-Fluids 2.0: Towards HPC for differentiable CFD of compressible two-phase flows[J]. Computer Physics Communications, 2025, 308: 109433.</li>\n<li>Wang W, Chu X. Optimised flow control based on automatic differentiation in compressible turbulent channel flows[J]. Journal of Fluid Mechanics, 2025, 1011: A1.</li>\n<li>Buhendwa A B, Bezgin D A, Karnakov P, et al. Data-driven shape inference in three-dimensional steady-state supersonic flows: Optimizing a discrete loss with JAX-Fluids[J]. Physical Review Fluids, 2025, 10(8): 084902.</li>\n<li>Zhang F, Yang X, He G. A differentiable wall-modeled large-eddy simulation method for high-Reynolds-number wall-bounded turbulent flows[J]. Journal of Computational Physics, 2026: 114835.</li>\n</ol>\n<h1>CFD #机器学习 #JAX #流体力学 #AIforScience #自动微分 #大涡模拟 #流动控制</h1>"
    }
  ],
  "graph": {
    "nodes": [
      {
        "id": "pinn",
        "x": 100,
        "y": 150,
        "category": "pinn_family"
      },
      {
        "id": "hp_vpinns",
        "x": 250,
        "y": 120,
        "category": "pinn_family"
      },
      {
        "id": "cpinn",
        "x": 200,
        "y": 150,
        "category": "pinn_family"
      },
      {
        "id": "xpinns",
        "x": 300,
        "y": 150,
        "category": "pinn_family"
      },
      {
        "id": "gpinn",
        "x": 350,
        "y": 120,
        "category": "pinn_family"
      },
      {
        "id": "sa_pinn",
        "x": 200,
        "y": 180,
        "category": "pinn_family"
      },
      {
        "id": "lb_pinn",
        "x": 300,
        "y": 180,
        "category": "pinn_family"
      },
      {
        "id": "relobralo",
        "x": 400,
        "y": 180,
        "category": "pinn_family"
      },
      {
        "id": "frozen_pinn",
        "x": 500,
        "y": 120,
        "category": "pinn_family"
      },
      {
        "id": "pikans",
        "x": 500,
        "y": 150,
        "category": "pinn_family"
      },
      {
        "id": "scale_pinn",
        "x": 500,
        "y": 180,
        "category": "pinn_family"
      },
      {
        "id": "asr_pinn",
        "x": 550,
        "y": 120,
        "category": "pinn_family"
      },
      {
        "id": "ms_pinn",
        "x": 550,
        "y": 150,
        "category": "pinn_family"
      },
      {
        "id": "dc_pinns",
        "x": 550,
        "y": 180,
        "category": "pinn_family"
      },
      {
        "id": "simple_pinn",
        "x": 600,
        "y": 150,
        "category": "pinn_family"
      },
      {
        "id": "deeponet",
        "x": 100,
        "y": 350,
        "category": "operators"
      },
      {
        "id": "fno",
        "x": 100,
        "y": 300,
        "category": "operators"
      },
      {
        "id": "gno",
        "x": 80,
        "y": 380,
        "category": "operators"
      },
      {
        "id": "geo_fno",
        "x": 250,
        "y": 280,
        "category": "operators"
      },
      {
        "id": "f_fno",
        "x": 250,
        "y": 310,
        "category": "operators"
      },
      {
        "id": "u_fno",
        "x": 250,
        "y": 340,
        "category": "operators"
      },
      {
        "id": "pino",
        "x": 200,
        "y": 300,
        "category": "operators"
      },
      {
        "id": "lno",
        "x": 300,
        "y": 310,
        "category": "operators"
      },
      {
        "id": "gino",
        "x": 350,
        "y": 280,
        "category": "operators"
      },
      {
        "id": "moe_pot",
        "x": 450,
        "y": 310,
        "category": "operators"
      },
      {
        "id": "poseidon",
        "x": 500,
        "y": 300,
        "category": "operators"
      },
      {
        "id": "gaot",
        "x": 500,
        "y": 280,
        "category": "operators"
      },
      {
        "id": "ginot",
        "x": 550,
        "y": 280,
        "category": "operators"
      },
      {
        "id": "s_not",
        "x": 550,
        "y": 310,
        "category": "operators"
      },
      {
        "id": "fedonet",
        "x": 500,
        "y": 350,
        "category": "operators"
      },
      {
        "id": "pi_latent_no",
        "x": 400,
        "y": 300,
        "category": "operators"
      },
      {
        "id": "difftaichi",
        "x": 100,
        "y": 550,
        "category": "diff_sim"
      },
      {
        "id": "jax_md",
        "x": 100,
        "y": 500,
        "category": "diff_sim"
      },
      {
        "id": "nvidia_warp",
        "x": 250,
        "y": 550,
        "category": "diff_sim"
      },
      {
        "id": "pac_nerf",
        "x": 300,
        "y": 550,
        "category": "diff_sim"
      },
      {
        "id": "pie_nerf",
        "x": 400,
        "y": 550,
        "category": "diff_sim"
      },
      {
        "id": "jax_mpm",
        "x": 500,
        "y": 500,
        "category": "diff_sim"
      },
      {
        "id": "moto",
        "x": 600,
        "y": 480,
        "category": "diff_sim"
      },
      {
        "id": "as_diffmpm",
        "x": 600,
        "y": 520,
        "category": "diff_sim"
      },
      {
        "id": "pod_dl_rom",
        "x": 100,
        "y": 750,
        "category": "acceleration"
      },
      {
        "id": "deepxde",
        "x": 100,
        "y": 700,
        "category": "acceleration"
      },
      {
        "id": "neuralpde_jl",
        "x": 250,
        "y": 700,
        "category": "acceleration"
      },
      {
        "id": "modulus",
        "x": 100,
        "y": 800,
        "category": "acceleration"
      },
      {
        "id": "physicsnemo_v2",
        "x": 500,
        "y": 800,
        "category": "acceleration"
      },
      {
        "id": "pde_fm",
        "x": 500,
        "y": 750,
        "category": "acceleration"
      },
      {
        "id": "scasml",
        "x": 500,
        "y": 700,
        "category": "acceleration"
      },
      {
        "id": "mollifier_layers",
        "x": 550,
        "y": 700,
        "category": "acceleration"
      }
    ],
    "edges": [
      {
        "from": "pinn",
        "to": "hp_vpinns",
        "label": "变分法"
      },
      {
        "from": "pinn",
        "to": "cpinn",
        "label": "域分解"
      },
      {
        "from": "cpinn",
        "to": "xpinns",
        "label": "广义域分解"
      },
      {
        "from": "pinn",
        "to": "gpinn",
        "label": "梯度增强"
      },
      {
        "from": "pinn",
        "to": "sa_pinn",
        "label": "自适应权重"
      },
      {
        "from": "sa_pinn",
        "to": "lb_pinn",
        "label": "似然平衡"
      },
      {
        "from": "lb_pinn",
        "to": "relobralo",
        "label": "动态平衡"
      },
      {
        "from": "pinn",
        "to": "frozen_pinn",
        "label": "无梯度训练"
      },
      {
        "from": "pinn",
        "to": "pikans",
        "label": "KAN架构"
      },
      {
        "from": "pinn",
        "to": "dc_pinns",
        "label": "硬约束"
      },
      {
        "from": "fno",
        "to": "geo_fno",
        "label": "几何感知"
      },
      {
        "from": "fno",
        "to": "f_fno",
        "label": "维度分解"
      },
      {
        "from": "fno",
        "to": "u_fno",
        "label": "多尺度"
      },
      {
        "from": "fno",
        "to": "pino",
        "label": "物理约束"
      },
      {
        "from": "fno",
        "to": "lno",
        "label": "拉普拉斯"
      },
      {
        "from": "geo_fno",
        "to": "gino",
        "label": "GNN融合"
      },
      {
        "from": "gino",
        "to": "gaot",
        "label": "Transformer"
      },
      {
        "from": "gino",
        "to": "ginot",
        "label": "Transformer"
      },
      {
        "from": "fno",
        "to": "moe_pot",
        "label": "MoE扩展"
      },
      {
        "from": "fno",
        "to": "poseidon",
        "label": "基础模型"
      },
      {
        "from": "fno",
        "to": "s_not",
        "label": "时序建模"
      },
      {
        "from": "deeponet",
        "to": "fedonet",
        "label": "傅里叶嵌入"
      },
      {
        "from": "pino",
        "to": "pi_latent_no",
        "label": "潜空间"
      },
      {
        "from": "difftaichi",
        "to": "nvidia_warp",
        "label": "CUDA加速"
      },
      {
        "from": "difftaichi",
        "to": "pac_nerf",
        "label": "NeRF融合"
      },
      {
        "from": "pac_nerf",
        "to": "pie_nerf",
        "label": "弹性动力学"
      },
      {
        "from": "jax_md",
        "to": "jax_mpm",
        "label": "MPM扩展"
      },
      {
        "from": "jax_mpm",
        "to": "moto",
        "label": "拓扑优化"
      },
      {
        "from": "jax_mpm",
        "to": "as_diffmpm",
        "label": "碰撞处理"
      },
      {
        "from": "deepxde",
        "to": "neuralpde_jl",
        "label": "Julia重构"
      },
      {
        "from": "modulus",
        "to": "physicsnemo_v2",
        "label": "模块化"
      },
      {
        "from": "fno",
        "to": "pde_fm",
        "label": "Mamba骨干"
      },
      {
        "from": "pinn",
        "to": "scasml",
        "label": "误差修正"
      },
      {
        "from": "pinn",
        "to": "mollifier_layers",
        "label": "噪声处理"
      }
    ],
    "milestones": [
      {
        "id": "pinn",
        "label": "开创物理信息学习范式"
      },
      {
        "id": "fno",
        "label": "神经算子学习里程碑"
      },
      {
        "id": "poseidon",
        "label": "PDE基础模型标杆"
      }
    ]
  },
  "algos": [
    {
      "id": "pinn",
      "num": 1,
      "name": "PINN",
      "fullName": "物理信息神经网络 (Physics-Informed Neural Networks)",
      "year": "2019",
      "org": "布朗大学",
      "parent": "—",
      "paperUrl": "https://doi.org/10.1016/j.jcp.2018.10.045",
      "projectUrl": "",
      "category": "pinn_family",
      "motivation": "利用自动微分将PDE残差嵌入损失函数",
      "summary": "PINN 提出将偏微分方程（PDE）残差通过自动微分嵌入神经网络损失函数，使网络在仅有少量标注数据的情况下即可求解正问题与反问题，开创了物理信息深度学习范式。",
      "keyPoints": [
        "<strong>通用 PDE 框架</strong>：将 PDE 统一表示为 <span class=\"kb-math kb-math-inline\">u_t + \\mathcal{N}[u] = 0</span>，适用于任意非线性偏微分方程",
        "<strong>物理残差损失</strong>：定义 <span class=\"kb-math kb-math-inline\">f := u_t + \\mathcal{N}[u]</span>，通过自动微分精确计算，将 PDE 残差作为损失项 <span class=\"kb-math kb-math-inline\">\\text{MSE}_f</span> 约束网络",
        "<strong>两种时间处理方案</strong>：连续时间模型（直接以 <span class=\"kb-math kb-math-inline\">(t,x)</span> 为输入）与离散时间模型（将隐式 Runge-Kutta 嵌入网络结构）",
        "<strong>数据高效</strong>：Burgers 方程仅需 100 个标注点 + 10000 个配点即可达到 <span class=\"kb-math kb-math-inline\">6.7 \\times 10^{-4}</span> 的 <span class=\"kb-math kb-math-inline\">\\mathcal{L}_2</span> 相对误差",
        "<strong>离散时间大步推进</strong>：利用 500 阶隐式 Runge-Kutta 方案，理论时间误差 <span class=\"kb-math kb-math-inline\">\\mathcal{O}(\\Delta t^{1000}) \\approx 10^{-97}</span>，单步即可跨越整个时间域",
        "<strong>正/反问题统一</strong>：同一框架可用于求解 PDE（正问题）和识别未知参数（反问题）",
        "<strong>四个基准验证</strong>：Burgers 方程、Schrödinger 方程、Allen-Cahn 方程、KdV 方程"
      ],
      "detail": "<h5>核心架构示意</h5>\n<p><img alt=\"PINN 连续时间模型示意图\" src=\"https://ar5iv.labs.arxiv.org/html/1711.10561/assets/x1.png\" />\n<em>图：连续时间 PINN 架构。左侧神经网络以 <span class=\"kb-math kb-math-inline\">(t, x)</span> 为输入，输出 <span class=\"kb-math kb-math-inline\">u(t,x)</span>；右侧通过自动微分构造物理残差 <span class=\"kb-math kb-math-inline\">f = u_t + \\mathcal{N}[u]</span>，两者共享参数。</em></p>\n<p><img alt=\"PINN 离散时间模型示意图\" src=\"https://ar5iv.labs.arxiv.org/html/1711.10561/assets/x4.png\" />\n<em>图：离散时间 PINN 架构。多输出神经网络预测 Runge-Kutta 各阶段的解 <span class=\"kb-math kb-math-inline\">[u^{n+c_1}, \\ldots, u^{n+c_q}, u^{n+1}]</span>，通过 RK 公式构造物理约束。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># PINN 连续时间模型训练伪代码\n# 输入: 标注数据 {t_u, x_u, u}, 配点 {t_f, x_f}, PDE算子 N\n# 输出: 训练好的网络 u_θ(t, x)\n\ndef physics_informed_nn(t, x, theta):\n    u = neural_network(t, x, theta)          # 前向传播\n    u_t = auto_diff(u, t)                     # 自动微分求 ∂u/∂t\n    u_x = auto_diff(u, x)                     # 自动微分求 ∂u/∂x\n    u_xx = auto_diff(u_x, x)                  # 自动微分求 ∂²u/∂x²\n    f = u_t + N(u, u_x, u_xx)                 # PDE 残差\n    return u, f\n\n# 损失函数\nMSE_u = mean(|u_pred - u_data|²)              # 数据拟合项\nMSE_f = mean(|f_pred|²)                        # 物理残差项 (配点处)\nloss = MSE_u + MSE_f\n\n# 优化: L-BFGS (拟牛顿法, 全批量)\noptimizer = L_BFGS(theta)\nfor iteration in range(max_iter):\n    u_pred, f_pred = physics_informed_nn(t, x, theta)\n    loss = MSE_u + MSE_f\n    optimizer.step(loss)\n</code></pre>\n<h5>动机与背景</h5>\n<p>传统 PDE 数值方法（有限元、有限差分、谱方法）依赖精细的网格剖分，在高维问题中面临\"维度灾难\"，且对复杂几何和多物理场耦合的适应性有限。另一方面，纯数据驱动的深度学习方法虽然灵活，但需要海量标注数据，且无法保证物理一致性。PINN 的核心思想是：<strong>将已知的物理定律（PDE）作为正则化项嵌入神经网络的训练过程</strong>，从而在数据稀疏的情况下仍能获得物理上合理的解。</p>\n<h5>核心机制：连续时间模型</h5>\n<p>PINN 的出发点是一般形式的参数化非线性 PDE：</p>\n<div class=\"kb-math kb-math-display\">u_t + \\mathcal{N}[u; \\lambda] = 0, \\quad x \\in \\Omega, \\quad t \\in [0, T]</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">u(t, x)</span> 是待求解的隐变量，<span class=\"kb-math kb-math-inline\">\\mathcal{N}[\\cdot; \\lambda]</span> 是由参数 <span class=\"kb-math kb-math-inline\">\\lambda</span> 参数化的非线性微分算子。</p>\n<p><strong>关键设计</strong>：定义物理残差函数</p>\n<div class=\"kb-math kb-math-display\">f := u_t + \\mathcal{N}[u; \\lambda]</div>\n<p>用一个深度神经网络 <span class=\"kb-math kb-math-inline\">u_\\theta(t, x)</span> 近似解 <span class=\"kb-math kb-math-inline\">u(t, x)</span>，然后通过<strong>自动微分</strong>（而非数值差分）精确计算 <span class=\"kb-math kb-math-inline\">f_\\theta(t, x)</span>。由于自动微分利用计算图的链式法则，其精度达到机器精度级别，且不引入离散化误差。</p>\n<div class=\"key-point\">💡 <strong>关键</strong>：<span class=\"kb-math kb-math-inline\">f</span> 和 <span class=\"kb-math kb-math-inline\">u</span> 共享同一组网络参数 <span class=\"kb-math kb-math-inline\">\\theta</span>，因此 <span class=\"kb-math kb-math-inline\">f</span> 本身也是一个\"神经网络\"——只不过它的结构由 PDE 的形式决定，而非人工设计。</div>\n<p>损失函数由两部分组成：</p>\n<div class=\"kb-math kb-math-display\">\\text{MSE} = \\text{MSE}_u + \\text{MSE}_f</div>\n<div class=\"kb-math kb-math-display\">\\text{MSE}_u = \\frac{1}{N_u} \\sum_{i=1}^{N_u} |u(t_u^i, x_u^i) - u^i|^2</div>\n<div class=\"kb-math kb-math-display\">\\text{MSE}_f = \\frac{1}{N_f} \\sum_{i=1}^{N_f} |f(t_f^i, x_f^i)|^2</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\{t_u^i, x_u^i, u^i\\}_{i=1}^{N_u}</span> 是初始/边界条件的标注数据，<span class=\"kb-math kb-math-inline\">\\{t_f^i, x_f^i\\}_{i=1}^{N_f}</span> 是时空域内的配点（collocation points），<strong>不需要标签</strong>——只要求 PDE 残差为零。</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：配点 <span class=\"kb-math kb-math-inline\">N_f</span> 的选取无需网格化，可以用拉丁超立方采样等准随机方法在整个时空域中撒点，这使得 PINN 天然适用于不规则几何和高维问题。</div>\n<h5>核心机制：离散时间模型</h5>\n<p>对于刚性方程或需要大时间步长的问题，论文提出将 <strong><span class=\"kb-math kb-math-inline\">q</span> 阶隐式 Runge-Kutta（IRK）方案</strong>嵌入网络结构：</p>\n<div class=\"kb-math kb-math-display\">u^{n+c_i} = u^n - \\Delta t \\sum_{j=1}^{q} a_{ij} \\mathcal{N}[u^{n+c_j}], \\quad i = 1, \\ldots, q</div>\n<div class=\"kb-math kb-math-display\">u^{n+1} = u^n - \\Delta t \\sum_{j=1}^{q} b_j \\mathcal{N}[u^{n+c_j}]</div>\n<p>网络以空间坐标 <span class=\"kb-math kb-math-inline\">x</span> 为输入，输出 <span class=\"kb-math kb-math-inline\">q+1</span> 个分量 <span class=\"kb-math kb-math-inline\">[u^{n+c_1}(x), \\ldots, u^{n+c_q}(x), u^{n+1}(x)]</span>，对应 RK 各阶段的解。通过 RK 公式构造 <span class=\"kb-math kb-math-inline\">q+1</span> 个约束 <span class=\"kb-math kb-math-inline\">u_i^n(x)</span>，要求它们均等于已知的 <span class=\"kb-math kb-math-inline\">u^n(x)</span>。</p>\n<div class=\"key-point\">💡 <strong>关键优势</strong>：经典数值方法中，隐式 RK 的阶数受限于计算复杂度（每步需求解大型非线性方程组）。而在 PINN 中，增加 RK 阶数仅增加网络最后一层的输出维度，<strong>计算成本几乎不变</strong>。论文使用了 500 阶 IRK（理论时间误差 <span class=\"kb-math kb-math-inline\">\\Delta t^{1000} = 0.8^{1000} \\approx 10^{-97}</span>），这在传统数值方法中是不可想象的。</div>\n<h5>训练与优化细节</h5>\n<ul>\n<li><strong>网络架构</strong>：全连接网络，tanh 激活函数。Burgers 方程使用 9 层 × 20 神经元；Schrödinger 方程使用 5 层 × 100 神经元</li>\n<li><strong>优化器</strong>：L-BFGS（拟牛顿法），全批量训练。L-BFGS 利用二阶曲率信息，在 PINN 这类光滑损失景观中收敛速度远快于 Adam</li>\n<li><strong>Xavier 初始化</strong>：权重使用 Xavier 初始化方案，确保各层梯度方差一致</li>\n<li><strong>训练时间</strong>：Burgers 方程连续时间模型约 60 秒（单 NVIDIA Titan X GPU）</li>\n</ul>\n<h5>实验结果与对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方程</th>\n<th>模型类型</th>\n<th>数据量</th>\n<th>配点数</th>\n<th><span class=\"kb-math kb-math-inline\">\\mathcal{L}_2</span> 误差</th>\n<th>特殊说明</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Burgers</td>\n<td>连续时间</td>\n<td><span class=\"kb-math kb-math-inline\">N_u=100</span></td>\n<td><span class=\"kb-math kb-math-inline\">N_f=10000</span></td>\n<td><span class=\"kb-math kb-math-inline\">6.7 \\times 10^{-4}</span></td>\n<td>9层×20, 60秒训练</td>\n</tr>\n<tr>\n<td>Burgers</td>\n<td>离散时间</td>\n<td><span class=\"kb-math kb-math-inline\">N_n=250</span></td>\n<td>—</td>\n<td><span class=\"kb-math kb-math-inline\">8.2 \\times 10^{-4}</span></td>\n<td>500阶IRK, 单步 t=0.1→0.9</td>\n</tr>\n<tr>\n<td>Schrödinger</td>\n<td>连续时间</td>\n<td><span class=\"kb-math kb-math-inline\">N_0=50, N_b=50</span></td>\n<td><span class=\"kb-math kb-math-inline\">N_f=20000</span></td>\n<td><span class=\"kb-math kb-math-inline\">1.97 \\times 10^{-3}</span></td>\n<td>复值分解为实部+虚部</td>\n</tr>\n<tr>\n<td>Allen-Cahn</td>\n<td>离散时间</td>\n<td><span class=\"kb-math kb-math-inline\">N_n=200</span></td>\n<td>—</td>\n<td>—</td>\n<td>500阶IRK处理尖锐界面</td>\n</tr>\n<tr>\n<td>KdV</td>\n<td>离散时间</td>\n<td><span class=\"kb-math kb-math-inline\">N_n=199</span></td>\n<td>—</td>\n<td>—</td>\n<td>三阶导数, 多步推进</td>\n</tr>\n</tbody>\n</table></div>\n<h5>与传统方法的核心区别</h5>\n<ol>\n<li><strong>无网格化</strong>：传统方法需要空间网格剖分，PINN 通过随机配点避免网格生成</li>\n<li><strong>物理即正则化</strong>：PDE 残差项 <span class=\"kb-math kb-math-inline\">\\text{MSE}_f</span> 本质上是一种正则化，使网络在数据稀疏区域也能给出物理合理的预测</li>\n<li><strong>正反问题统一</strong>：传统方法求解正问题和反问题需要完全不同的算法，PINN 只需调整损失函数中的已知/未知量</li>\n<li><strong>自动微分 vs 数值微分</strong>：传统方法的离散化引入截断误差，自动微分精确到机器精度</li>\n<li><strong>隐式时间积分无额外成本</strong>：传统隐式方法每步需求解非线性方程组，PINN 中增加 RK 阶数仅增加输出维度</li>\n</ol>",
      "quiz": {
        "q": "PINN 损失函数中 MSE_f 项的物理含义是什么？",
        "options": [
          "衡量神经网络预测值与训练数据之间的拟合误差",
          "衡量神经网络输出在配点处满足 PDE 方程的程度",
          "衡量神经网络在边界条件上的违反程度",
          "衡量神经网络参数的 L2 正则化惩罚"
        ],
        "answer": 1,
        "explain": "MSE_f = (1/N_f) Σ|f(t_f, x_f)|² 其中 f = u_t + N[u]，即 PDE 残差。该项要求网络输出在配点处精确满足 PDE，是 PINN 区别于纯数据驱动方法的核心设计。"
      }
    },
    {
      "id": "hp_vpinns",
      "num": 2,
      "name": "hp-VPINNs",
      "fullName": "hp变分物理信息神经网络 (hp-Variational PINNs)",
      "year": "2021",
      "org": "布朗大学",
      "parent": "pinn",
      "paperUrl": "https://arxiv.org/abs/2003.05385",
      "projectUrl": "",
      "category": "pinn_family",
      "motivation": "结合变分法与hp细化处理奇异性",
      "summary": "hp-VPINNs 的核心目标是：结合变分法与hp细化处理奇异性。",
      "keyPoints": [
        "核心动机：结合变分法与hp细化处理奇异性",
        "演化来源：继承或改进自 pinn",
        "代表机构：布朗大学"
      ],
      "detail": "<p>结合变分法与hp细化处理奇异性</p>"
    },
    {
      "id": "cpinn",
      "num": 3,
      "name": "cPINN",
      "fullName": "守恒物理信息神经网络 (Conservative PINNs)",
      "year": "2020",
      "org": "布朗大学",
      "parent": "pinn",
      "paperUrl": "https://arxiv.org/abs/2001.08245",
      "projectUrl": "",
      "category": "pinn_family",
      "motivation": "基于域分解强制执行物理守恒律",
      "summary": "cPINN 的核心目标是：基于域分解强制执行物理守恒律。",
      "keyPoints": [
        "核心动机：基于域分解强制执行物理守恒律",
        "演化来源：继承或改进自 pinn",
        "代表机构：布朗大学"
      ],
      "detail": "<p>基于域分解强制执行物理守恒律</p>"
    },
    {
      "id": "xpinns",
      "num": 4,
      "name": "XPINNs",
      "fullName": "扩展物理信息神经网络 (Extended PINNs)",
      "year": "2020",
      "org": "布朗大学",
      "parent": "cpinn",
      "paperUrl": "https://arxiv.org/abs/2005.05653",
      "projectUrl": "",
      "category": "pinn_family",
      "motivation": "广义域分解支持任意几何形状",
      "summary": "XPINNs 的核心目标是：广义域分解支持任意几何形状。",
      "keyPoints": [
        "核心动机：广义域分解支持任意几何形状",
        "演化来源：继承或改进自 cpinn",
        "代表机构：布朗大学"
      ],
      "detail": "<p>广义域分解支持任意几何形状</p>"
    },
    {
      "id": "gpinn",
      "num": 5,
      "name": "gPINN",
      "fullName": "梯度增强物理信息神经网络 (Gradient-enhanced PINNs)",
      "year": "2022",
      "org": "宾夕法尼亚大学",
      "parent": "pinn",
      "paperUrl": "https://arxiv.org/abs/2111.02801",
      "projectUrl": "",
      "category": "pinn_family",
      "motivation": "加入PDE残差梯度提升稀疏数据精度",
      "summary": "gPINN 的核心目标是：加入PDE残差梯度提升稀疏数据精度。",
      "keyPoints": [
        "核心动机：加入PDE残差梯度提升稀疏数据精度",
        "演化来源：继承或改进自 pinn",
        "代表机构：宾夕法尼亚大学"
      ],
      "detail": "<p>加入PDE残差梯度提升稀疏数据精度</p>"
    },
    {
      "id": "sa_pinn",
      "num": 6,
      "name": "SA-PINN",
      "fullName": "自适应物理信息神经网络 (Self-Adaptive PINN)",
      "year": "2020",
      "org": "布朗大学",
      "parent": "pinn",
      "paperUrl": "https://arxiv.org/abs/2009.04544",
      "projectUrl": "",
      "category": "pinn_family",
      "motivation": "引入软注意力自动调整损失权重",
      "summary": "SA-PINN 的核心目标是：引入软注意力自动调整损失权重。",
      "keyPoints": [
        "核心动机：引入软注意力自动调整损失权重",
        "演化来源：继承或改进自 pinn",
        "代表机构：布朗大学"
      ],
      "detail": "<p>引入软注意力自动调整损失权重</p>"
    },
    {
      "id": "lb_pinn",
      "num": 7,
      "name": "lbPINN",
      "fullName": "损失平衡物理信息神经网络 (Loss-Balanced PINN)",
      "year": "2021",
      "org": "ETH Zurich",
      "parent": "sa_pinn",
      "paperUrl": "https://arxiv.org/abs/2104.06120",
      "projectUrl": "",
      "category": "pinn_family",
      "motivation": "通过似然估计平衡多目标损失",
      "summary": "lbPINN 的核心目标是：通过似然估计平衡多目标损失。",
      "keyPoints": [
        "核心动机：通过似然估计平衡多目标损失",
        "演化来源：继承或改进自 sa_pinn",
        "代表机构：ETH Zurich"
      ],
      "detail": "<p>通过似然估计平衡多目标损失</p>"
    },
    {
      "id": "relobralo",
      "num": 8,
      "name": "ReLoBRaLo",
      "fullName": "相对损失平衡随机回溯 (Relative Loss Balancing with Random Lookback)",
      "year": "2021",
      "org": "ETH Zurich",
      "parent": "lb_pinn",
      "paperUrl": "https://arxiv.org/abs/2110.09813",
      "projectUrl": "",
      "category": "pinn_family",
      "motivation": "基于损失变化率动态平衡权重",
      "summary": "ReLoBRaLo 的核心目标是：基于损失变化率动态平衡权重。",
      "keyPoints": [
        "核心动机：基于损失变化率动态平衡权重",
        "演化来源：继承或改进自 lb_pinn",
        "代表机构：ETH Zurich"
      ],
      "detail": "<p>基于损失变化率动态平衡权重</p>"
    },
    {
      "id": "frozen_pinn",
      "num": 9,
      "name": "Frozen-PINN",
      "fullName": "无梯度训练物理信息神经网络 (Fast training without gradient descent)",
      "year": "2026",
      "org": "TUM",
      "parent": "pinn",
      "paperUrl": "https://arxiv.org/abs/2405.20836",
      "projectUrl": "",
      "category": "pinn_family",
      "motivation": "无梯度训练加速46-2945倍",
      "summary": "Frozen-PINN 的核心目标是：无梯度训练加速46-2945倍。",
      "keyPoints": [
        "核心动机：无梯度训练加速46-2945倍",
        "演化来源：继承或改进自 pinn",
        "代表机构：TUM"
      ],
      "detail": "<p>无梯度训练加速46-2945倍</p>"
    },
    {
      "id": "pikans",
      "num": 10,
      "name": "PIKANs",
      "fullName": "物理信息KAN网络 (Physics-Informed Kolmogorov-Arnold Networks)",
      "year": "2026",
      "org": "PNNL",
      "parent": "pinn",
      "paperUrl": "https://www.pnnl.gov/publications/from-pinns-to-pikans",
      "projectUrl": "",
      "category": "pinn_family",
      "motivation": "KAN可学习激活函数提升高维精度",
      "summary": "PIKANs 的核心目标是：KAN可学习激活函数提升高维精度。",
      "keyPoints": [
        "核心动机：KAN可学习激活函数提升高维精度",
        "演化来源：继承或改进自 pinn",
        "代表机构：PNNL"
      ],
      "detail": "<p>KAN可学习激活函数提升高维精度</p>"
    },
    {
      "id": "scale_pinn",
      "num": 11,
      "name": "Scale-PINN",
      "fullName": "序列修正物理信息神经网络 (Sequential Correction PINN)",
      "year": "2026",
      "org": "A*STAR",
      "parent": "pinn",
      "paperUrl": "https://arxiv.org/abs/2601.scale",
      "projectUrl": "",
      "category": "pinn_family",
      "motivation": "序列修正机制处理多尺度PDE",
      "summary": "Scale-PINN 的核心目标是：序列修正机制处理多尺度PDE。",
      "keyPoints": [
        "核心动机：序列修正机制处理多尺度PDE",
        "演化来源：继承或改进自 pinn",
        "代表机构：A*STAR"
      ],
      "detail": "<p>序列修正机制处理多尺度PDE</p>"
    },
    {
      "id": "asr_pinn",
      "num": 12,
      "name": "ASR-PINN",
      "fullName": "自适应步长RK物理信息神经网络 (Adaptive step-size Runge-Kutta PINN)",
      "year": "2026",
      "org": "河海大学",
      "parent": "pinn",
      "paperUrl": "https://www.sciencedirect.com/science/article/pii/S0022169426002246",
      "projectUrl": "",
      "category": "pinn_family",
      "motivation": "自适应步长处理反应输运问题",
      "summary": "ASR-PINN 的核心目标是：自适应步长处理反应输运问题。",
      "keyPoints": [
        "核心动机：自适应步长处理反应输运问题",
        "演化来源：继承或改进自 pinn",
        "代表机构：河海大学"
      ],
      "detail": "<p>自适应步长处理反应输运问题</p>"
    },
    {
      "id": "ms_pinn",
      "num": 13,
      "name": "MS-PINN",
      "fullName": "多场耦合物理信息神经网络 (Multi-field coupled PINN)",
      "year": "2026",
      "org": "大连理工大学",
      "parent": "pinn",
      "paperUrl": "https://arxiv.org/abs/2601.mspinn",
      "projectUrl": "",
      "category": "pinn_family",
      "motivation": "金属凝固多场耦合演化建模",
      "summary": "MS-PINN 的核心目标是：金属凝固多场耦合演化建模。",
      "keyPoints": [
        "核心动机：金属凝固多场耦合演化建模",
        "演化来源：继承或改进自 pinn",
        "代表机构：大连理工大学"
      ],
      "detail": "<p>金属凝固多场耦合演化建模</p>"
    },
    {
      "id": "dc_pinns",
      "num": 14,
      "name": "DC-PINNs",
      "fullName": "导数约束物理信息神经网络 (Derivative-Constrained PINNs)",
      "year": "2026",
      "org": "arXiv",
      "parent": "pinn",
      "paperUrl": "https://journals.aps.org/pre/abstract/10.1103/PhysRevE.111.015303",
      "projectUrl": "",
      "category": "pinn_family",
      "motivation": "显式编码导数约束确保物理一致性",
      "summary": "DC-PINNs 的核心目标是：显式编码导数约束确保物理一致性。",
      "keyPoints": [
        "核心动机：显式编码导数约束确保物理一致性",
        "演化来源：继承或改进自 pinn",
        "代表机构：arXiv"
      ],
      "detail": "<p>显式编码导数约束确保物理一致性</p>"
    },
    {
      "id": "simple_pinn",
      "num": 15,
      "name": "SIMPLE-PINN",
      "fullName": "SIMPLE算法物理信息神经网络 (SIMPLE algorithm based PINN)",
      "year": "2026",
      "org": "ResearchGate",
      "parent": "pinn",
      "paperUrl": "https://www.researchgate.net/publication/385794553",
      "projectUrl": "",
      "category": "pinn_family",
      "motivation": "引入CFD压力修正逻辑",
      "summary": "SIMPLE-PINN 的核心目标是：引入CFD压力修正逻辑。",
      "keyPoints": [
        "核心动机：引入CFD压力修正逻辑",
        "演化来源：继承或改进自 pinn",
        "代表机构：ResearchGate"
      ],
      "detail": "<p>引入CFD压力修正逻辑</p>"
    },
    {
      "id": "deeponet",
      "num": 16,
      "name": "DeepONet",
      "fullName": "深度算子网络 (Deep Operator Network)",
      "year": "2021",
      "org": "布朗大学",
      "parent": "—",
      "paperUrl": "https://www.nature.com/articles/s42256-021-00302-5",
      "projectUrl": "",
      "category": "operators",
      "motivation": "Branch-Trunk网络解耦输入与坐标",
      "summary": "DeepONet 基于算子万能逼近定理，提出由 Branch Net（编码输入函数）和 Trunk Net（编码输出坐标）组成的双子网络架构，首次在实践中高效学习非线性算子（函数到函数的映射），在 ODE/PDE 问题上实现了远优于全连接网络的泛化精度，并观测到关于训练数据量的指数级误差收敛。",
      "keyPoints": [
        "<strong>理论基础</strong>：基于 Chen &amp; Chen (1995) 的算子万能逼近定理（Theorem 1），证明单隐层网络可逼近任意非线性连续算子",
        "<strong>双子网络架构</strong>：Branch Net 编码输入函数 <span class=\"kb-math kb-math-inline\">u</span> 在 <span class=\"kb-math kb-math-inline\">m</span> 个固定 sensor 处的离散值 <span class=\"kb-math kb-math-inline\">[u(x_1), \\dots, u(x_m)]</span>；Trunk Net 编码输出函数的求值位置 <span class=\"kb-math kb-math-inline\">y</span>",
        "<strong>两种变体</strong>：Stacked DeepONet（<span class=\"kb-math kb-math-inline\">p</span> 个独立 branch 网络）和 Unstacked DeepONet（单个 branch 网络输出 <span class=\"kb-math kb-math-inline\">p</span> 维向量），后者参数更少、泛化更好",
        "<strong>输出融合</strong>：通过内积 <span class=\"kb-math kb-math-inline\">G(u)(y) \\approx \\sum_{k=1}^{p} b_k \\cdot t_k + b_0</span> 合并两个子网络输出，添加 bias 项可显著降低误差",
        "<strong>泛化优势</strong>：相比 FNN 基线，DeepONet 的泛化误差大幅减小；在反导数算子、非线性 ODE、扩散-反应 PDE 和 advection PDE 等 4 类问题上均表现优异",
        "<strong>收敛速率</strong>：观测到关于训练数据量的多项式（半阶到四阶）乃至指数级误差收敛，为深度学习领域首次报告指数收敛",
        "<strong>灵活的数据约束</strong>：仅要求输入函数在相同 sensor 位置采样，对输出位置 <span class=\"kb-math kb-math-inline\">y</span> 无任何网格或数量限制"
      ],
      "detail": "<p><img alt=\"DeepONet 架构示意图\" src=\"https://ar5iv.labs.arxiv.org/html/1910.03193/assets/x1.png\" />\n<em>图：(A) DeepONet 整体架构——Branch Net 接收输入函数在 sensors 处的值，Trunk Net 接收输出位置 y，二者输出通过内积合并得到 G(u)(y)。(B) 训练数据结构：所有输入函数共享相同 sensor 位置，但输出位置可任意。(C) Stacked DeepONet：p 个独立 branch 网络。(D) Unstacked DeepONet：单个 branch 网络输出 p 维向量。</em></p>\n<pre><code class=\"language-python\"># DeepONet 前向传播伪代码（Unstacked 版本）\ndef deeponet_forward(u_sensors, y, branch_net, trunk_net):\n    &quot;&quot;&quot;\n    u_sensors: [batch, m]   — 输入函数在 m 个 sensor 处的值\n    y:         [batch, d_y] — 输出函数的求值坐标\n    &quot;&quot;&quot;\n    # Branch Net: 编码输入函数 → p 维特征\n    b = branch_net(u_sensors)          # [batch, p]\n\n    # Trunk Net: 编码输出位置 → p 维基函数\n    t = trunk_net(y)                   # [batch, p]\n\n    # 内积融合 + bias\n    output = torch.sum(b * t, dim=-1)  # [batch]\n    output = output + bias             # 可学习标量 bias\n    return output                      # ≈ G(u)(y)\n\n# 训练循环\nfor epoch in range(num_epochs):\n    for (u_batch, y_batch, Gu_y_batch) in dataloader:\n        pred = deeponet_forward(u_batch, y_batch, branch_net, trunk_net)\n        loss = MSE(pred, Gu_y_batch)\n        loss.backward()\n        optimizer.step()\n</code></pre>\n<h5>动机与背景</h5>\n<p>传统神经网络学习的是<strong>函数</strong>（向量到向量的映射），而科学计算中大量问题本质上是<strong>算子</strong>学习——给定一个输入函数 <span class=\"kb-math kb-math-inline\">u</span>（如初始条件、外力场、边界条件），求解对应的输出函数 <span class=\"kb-math kb-math-inline\">G(u)</span>（如 PDE 的解）。Chen &amp; Chen (1995) 的万能逼近定理证明了神经网络具备逼近任意非线性连续算子的能力，但该定理仅保证了足够大网络的逼近误差，未考虑实际训练中同样关键的<strong>优化误差</strong>和<strong>泛化误差</strong>。</p>\n<div class=\"key-point\">💡 关键：总误差 = 逼近误差 + 优化误差 + 泛化误差。万能逼近定理只控制第一项，DeepONet 通过架构设计同时压低后两项。</div>\n<h5>核心机制</h5>\n<p><strong>1. 算子万能逼近定理（Theorem 1）</strong></p>\n<p>对于任意非线性连续算子 <span class=\"kb-math kb-math-inline\">G: V \\to C(\\mathbb{R}^d)</span>，存在 <span class=\"kb-math kb-math-inline\">m</span> 个 sensor 点 <span class=\"kb-math kb-math-inline\">x_1, \\dots, x_m</span> 和网络参数，使得：</p>\n<div class=\"kb-math kb-math-display\">G(u)(y) \\approx \\sum_{k=1}^{p} \\underbrace{\\sigma\\!\\left(\\sum_{j=1}^{m} \\xi_k^j \\, u(x_j) + \\theta_k\\right)}_{\\text{Branch Net 第 } k \\text{ 个输出 } b_k} \\cdot \\underbrace{\\sigma\\!\\left(\\boldsymbol{w}_k \\cdot y + \\zeta_k\\right)}_{\\text{Trunk Net 第 } k \\text{ 个输出 } t_k}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\sigma</span> 为激活函数。这一公式自然地将网络分解为两个子网络：\n- <strong>Branch Net</strong>：以 <span class=\"kb-math kb-math-inline\">[u(x_1), \\dots, u(x_m)]</span> 为输入，输出 <span class=\"kb-math kb-math-inline\">[b_1, \\dots, b_p]</span>，编码输入函数的\"特征\"\n- <strong>Trunk Net</strong>：以 <span class=\"kb-math kb-math-inline\">y</span> 为输入，输出 <span class=\"kb-math kb-math-inline\">[t_1, \\dots, t_p]</span>，可理解为一组在 <span class=\"kb-math kb-math-inline\">y</span> 处求值的<strong>可学习基函数</strong></p>\n<p><strong>2. Stacked vs. Unstacked 架构</strong></p>\n<ul>\n<li><strong>Stacked DeepONet</strong>：严格遵循定理结构，使用 <span class=\"kb-math kb-math-inline\">p</span> 个独立的 branch 网络，每个输出一个标量 <span class=\"kb-math kb-math-inline\">b_k</span>。参数量为 <span class=\"kb-math kb-math-inline\">O(p \\times m \\times w)</span>，其中 <span class=\"kb-math kb-math-inline\">w</span> 为隐层宽度。</li>\n<li><strong>Unstacked DeepONet</strong>：使用单个 branch 网络，最后一层输出 <span class=\"kb-math kb-math-inline\">p</span> 维向量。参数量约为 <span class=\"kb-math kb-math-inline\">O(m \\times w + w \\times p)</span>，远少于 stacked 版本。实验表明 unstacked 版本虽然训练误差略大，但<strong>泛化误差更小</strong>，总体测试误差更优。</li>\n</ul>\n<p><strong>3. Bias 的重要性</strong></p>\n<p>在输出公式中添加可学习 bias <span class=\"kb-math kb-math-inline\">b_0</span>：</p>\n<div class=\"kb-math kb-math-display\">G(u)(y) \\approx \\sum_{k=1}^{p} b_k \\, t_k + b_0</div>\n<p>实验证明添加 bias 可同时降低训练误差和测试误差，且使训练更稳定（方差更小）。</p>\n<div class=\"warn-box\">⚠️ 注意：这里的 bias 不是普通神经网络层的 bias，而是在 branch-trunk 内积之后额外添加的全局偏置项。</div>\n<h5>训练与数据流</h5>\n<p><strong>数据格式</strong>：训练集由三元组 <span class=\"kb-math kb-math-inline\">\\{(u^{(i)}, y^{(i,j)}, G(u^{(i)})(y^{(i,j)}))\\}</span> 组成。关键约束是所有输入函数 <span class=\"kb-math kb-math-inline\">u^{(i)}</span> 必须在<strong>相同的 <span class=\"kb-math kb-math-inline\">m</span> 个 sensor 位置</strong>采样，但输出位置 <span class=\"kb-math kb-math-inline\">y^{(i,j)}</span> 可以任意分布、数量不同。</p>\n<p><strong>损失函数</strong>：标准均方误差（MSE）：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L} = \\frac{1}{N} \\sum_{i,j} \\left| G_\\theta(u^{(i)})(y^{(i,j)}) - G(u^{(i)})(y^{(i,j)}) \\right|^2</div>\n<p><strong>数据生成</strong>：输入函数从高斯随机场（GRF）或切比雪夫多项式空间中采样，输出通过数值求解器（如 Runge-Kutta、有限差分）获得真值。</p>\n<h5>与传统方法的区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方面</th>\n<th>FNN 直接学习</th>\n<th>CNN 图像映射</th>\n<th>DeepONet</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>输入表示</td>\n<td>拼接 <span class=\"kb-math kb-math-inline\">[u(x_1),\\dots,u(x_m), y]</span></td>\n<td>网格化图像</td>\n<td>Branch + Trunk 分离</td>\n</tr>\n<tr>\n<td>网格要求</td>\n<td>无</td>\n<td>等距网格</td>\n<td>sensor 固定即可，<span class=\"kb-math kb-math-inline\">y</span> 任意</td>\n</tr>\n<tr>\n<td>泛化能力</td>\n<td>差（大泛化误差）</td>\n<td>中等</td>\n<td>优（归纳偏置压低泛化误差）</td>\n</tr>\n<tr>\n<td>理论保证</td>\n<td>函数逼近定理</td>\n<td>无</td>\n<td>算子逼近定理</td>\n</tr>\n<tr>\n<td>输出分辨率</td>\n<td>固定</td>\n<td>固定网格</td>\n<td>连续（任意 <span class=\"kb-math kb-math-inline\">y</span> 可查询）</td>\n</tr>\n</tbody>\n</table></div>\n<p>DeepONet 的核心优势在于其<strong>归纳偏置</strong>：将输入函数编码与输出坐标编码解耦，使网络天然适配算子学习的结构，从而大幅降低泛化误差。</p>",
      "quiz": {
        "q": "DeepONet 中 Trunk Net 的输入和作用是什么？",
        "options": [
          "输入为函数 u 的离散值，作用是编码输入函数特征",
          "输入为输出位置 y，作用是生成一组可学习基函数",
          "输入为 PDE 的参数，作用是编码物理约束",
          "输入为训练标签，作用是计算损失函数"
        ],
        "answer": 1,
        "explain": "Trunk Net 以输出位置 y 为输入，输出 p 维向量 [t_1,...,t_p]，可理解为在 y 处求值的可学习基函数，与 Branch Net 输出通过内积融合得到最终预测。"
      }
    },
    {
      "id": "fno",
      "num": 17,
      "name": "FNO",
      "fullName": "傅里叶神经算子 (Fourier Neural Operator)",
      "year": "2021",
      "org": "Caltech",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2010.08895",
      "projectUrl": "",
      "category": "operators",
      "motivation": "傅里叶空间参数化积分核实现高效全局卷积",
      "summary": "FNO 的核心目标是：傅里叶空间参数化积分核实现高效全局卷积。",
      "keyPoints": [
        "核心动机：傅里叶空间参数化积分核实现高效全局卷积",
        "代表机构：Caltech"
      ],
      "detail": "<p>傅里叶空间参数化积分核实现高效全局卷积</p>"
    },
    {
      "id": "gno",
      "num": 18,
      "name": "GNO",
      "fullName": "图神经算子 (Graph Neural Operator)",
      "year": "2020",
      "org": "Caltech",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2003.03485",
      "projectUrl": "",
      "category": "operators",
      "motivation": "基于GNN处理非结构化网格",
      "summary": "GNO 的核心目标是：基于GNN处理非结构化网格。",
      "keyPoints": [
        "核心动机：基于GNN处理非结构化网格",
        "代表机构：Caltech"
      ],
      "detail": "<p>基于GNN处理非结构化网格</p>"
    },
    {
      "id": "geo_fno",
      "num": 19,
      "name": "Geo-FNO",
      "fullName": "几何感知傅里叶神经算子 (Geometry-aware FNO)",
      "year": "2023",
      "org": "Caltech",
      "parent": "fno",
      "paperUrl": "https://arxiv.org/abs/2207.05209",
      "projectUrl": "",
      "category": "operators",
      "motivation": "变形映射处理不规则物理域",
      "summary": "Geo-FNO 的核心目标是：变形映射处理不规则物理域。",
      "keyPoints": [
        "核心动机：变形映射处理不规则物理域",
        "演化来源：继承或改进自 fno",
        "代表机构：Caltech"
      ],
      "detail": "<p>变形映射处理不规则物理域</p>"
    },
    {
      "id": "f_fno",
      "num": 20,
      "name": "F-FNO",
      "fullName": "分解傅里叶神经算子 (Factorized FNO)",
      "year": "2022",
      "org": "Caltech",
      "parent": "fno",
      "paperUrl": "https://arxiv.org/abs/2111.13587",
      "projectUrl": "",
      "category": "operators",
      "motivation": "维度分解减少参数量",
      "summary": "F-FNO 的核心目标是：维度分解减少参数量。",
      "keyPoints": [
        "核心动机：维度分解减少参数量",
        "演化来源：继承或改进自 fno",
        "代表机构：Caltech"
      ],
      "detail": "<p>维度分解减少参数量</p>"
    },
    {
      "id": "u_fno",
      "num": 21,
      "name": "U-FNO",
      "fullName": "U型傅里叶神经算子 (U-shaped FNO)",
      "year": "2022",
      "org": "Stanford",
      "parent": "fno",
      "paperUrl": "https://doi.org/10.1016/j.advwatres.2022.104185",
      "projectUrl": "",
      "category": "operators",
      "motivation": "结合U-Net多尺度结构",
      "summary": "U-FNO 的核心目标是：结合U-Net多尺度结构。",
      "keyPoints": [
        "核心动机：结合U-Net多尺度结构",
        "演化来源：继承或改进自 fno",
        "代表机构：Stanford"
      ],
      "detail": "<p>结合U-Net多尺度结构</p>"
    },
    {
      "id": "pino",
      "num": 22,
      "name": "PINO",
      "fullName": "物理信息神经算子 (Physics-Informed Neural Operator)",
      "year": "2021",
      "org": "Caltech",
      "parent": "fno",
      "paperUrl": "https://arxiv.org/abs/2111.03794",
      "projectUrl": "",
      "category": "operators",
      "motivation": "算子学习中加入物理约束损失",
      "summary": "PINO 的核心目标是：算子学习中加入物理约束损失。",
      "keyPoints": [
        "核心动机：算子学习中加入物理约束损失",
        "演化来源：继承或改进自 fno",
        "代表机构：Caltech"
      ],
      "detail": "<p>算子学习中加入物理约束损失</p>"
    },
    {
      "id": "lno",
      "num": 23,
      "name": "LNO",
      "fullName": "拉普拉斯神经算子 (Laplace Neural Operator)",
      "year": "2023",
      "org": "DeepMind",
      "parent": "fno",
      "paperUrl": "https://arxiv.org/abs/2303.10528",
      "projectUrl": "",
      "category": "operators",
      "motivation": "拉普拉斯变换处理非周期信号",
      "summary": "LNO 的核心目标是：拉普拉斯变换处理非周期信号。",
      "keyPoints": [
        "核心动机：拉普拉斯变换处理非周期信号",
        "演化来源：继承或改进自 fno",
        "代表机构：DeepMind"
      ],
      "detail": "<p>拉普拉斯变换处理非周期信号</p>"
    },
    {
      "id": "gino",
      "num": 24,
      "name": "GINO",
      "fullName": "几何信息神经算子 (Geometry-Informed Neural Operator)",
      "year": "2023",
      "org": "Caltech",
      "parent": "geo_fno",
      "paperUrl": "https://arxiv.org/abs/2309.03019",
      "projectUrl": "",
      "category": "operators",
      "motivation": "结合GNN与FNO优化3D几何模拟",
      "summary": "GINO 的核心目标是：结合GNN与FNO优化3D几何模拟。",
      "keyPoints": [
        "核心动机：结合GNN与FNO优化3D几何模拟",
        "演化来源：继承或改进自 geo_fno",
        "代表机构：Caltech"
      ],
      "detail": "<p>结合GNN与FNO优化3D几何模拟</p>"
    },
    {
      "id": "moe_pot",
      "num": 25,
      "name": "MoE-POT",
      "fullName": "混合专家算子Transformer (Mixture-of-Experts Operator Transformer)",
      "year": "2026",
      "org": "清华大学",
      "parent": "fno",
      "paperUrl": "https://arxiv.org/abs/2510.moe",
      "projectUrl": "",
      "category": "operators",
      "motivation": "混合专家系统扩展至亿级参数",
      "summary": "MoE-POT 的核心目标是：混合专家系统扩展至亿级参数。",
      "keyPoints": [
        "核心动机：混合专家系统扩展至亿级参数",
        "演化来源：继承或改进自 fno",
        "代表机构：清华大学"
      ],
      "detail": "<p>混合专家系统扩展至亿级参数</p>"
    },
    {
      "id": "poseidon",
      "num": 26,
      "name": "Poseidon",
      "fullName": "PDE高效基础模型 (Efficient Foundation Models for PDEs)",
      "year": "2026",
      "org": "ETH Zurich",
      "parent": "fno",
      "paperUrl": "https://arxiv.org/abs/2602.15004",
      "projectUrl": "",
      "category": "operators",
      "motivation": "PDE基础模型20样本达FNO千样本精度",
      "summary": "Poseidon 的核心目标是：PDE基础模型20样本达FNO千样本精度。",
      "keyPoints": [
        "核心动机：PDE基础模型20样本达FNO千样本精度",
        "演化来源：继承或改进自 fno",
        "代表机构：ETH Zurich"
      ],
      "detail": "<p>PDE基础模型20样本达FNO千样本精度</p>"
    },
    {
      "id": "gaot",
      "num": 27,
      "name": "GAOT",
      "fullName": "几何感知算子Transformer (Geometry Aware Operator Transformer)",
      "year": "2026",
      "org": "UIUC",
      "parent": "gino",
      "paperUrl": "https://proceedings.neurips.cc/paper_files/paper/2025/hash/e45a448dfa778f6d62729a7bc8633c06",
      "projectUrl": "",
      "category": "operators",
      "motivation": "几何感知编码任意复杂域映射",
      "summary": "GAOT 的核心目标是：几何感知编码任意复杂域映射。",
      "keyPoints": [
        "核心动机：几何感知编码任意复杂域映射",
        "演化来源：继承或改进自 gino",
        "代表机构：UIUC"
      ],
      "detail": "<p>几何感知编码任意复杂域映射</p>"
    },
    {
      "id": "ginot",
      "num": 28,
      "name": "GINOT",
      "fullName": "几何信息神经算子Transformer (Geometry-Informed Neural Operator Transformer)",
      "year": "2026",
      "org": "UIUC",
      "parent": "gino",
      "paperUrl": "https://arxiv.org/abs/2601.ginot",
      "projectUrl": "",
      "category": "operators",
      "motivation": "Transformer与神经算子集成",
      "summary": "GINOT 的核心目标是：Transformer与神经算子集成。",
      "keyPoints": [
        "核心动机：Transformer与神经算子集成",
        "演化来源：继承或改进自 gino",
        "代表机构：UIUC"
      ],
      "detail": "<p>Transformer与神经算子集成</p>"
    },
    {
      "id": "s_not",
      "num": 29,
      "name": "S-NOT",
      "fullName": "序列神经算子Transformer (Sequential Neural Operator Transformer)",
      "year": "2026",
      "org": "UIUC",
      "parent": "fno",
      "paperUrl": "https://arxiv.org/abs/2601.snot",
      "projectUrl": "",
      "category": "operators",
      "motivation": "时间相关非线性PDE代理模型",
      "summary": "S-NOT 的核心目标是：时间相关非线性PDE代理模型。",
      "keyPoints": [
        "核心动机：时间相关非线性PDE代理模型",
        "演化来源：继承或改进自 fno",
        "代表机构：UIUC"
      ],
      "detail": "<p>时间相关非线性PDE代理模型</p>"
    },
    {
      "id": "fedonet",
      "num": 30,
      "name": "FEDONet",
      "fullName": "傅里叶嵌入深度算子网络 (Fourier-Embedded DeepONet)",
      "year": "2026",
      "org": "arXiv",
      "parent": "deeponet",
      "paperUrl": "https://arxiv.org/abs/2511.09",
      "projectUrl": "",
      "category": "operators",
      "motivation": "傅里叶嵌入增强高频特征捕捉",
      "summary": "FEDONet 的核心目标是：傅里叶嵌入增强高频特征捕捉。",
      "keyPoints": [
        "核心动机：傅里叶嵌入增强高频特征捕捉",
        "演化来源：继承或改进自 deeponet",
        "代表机构：arXiv"
      ],
      "detail": "<p>傅里叶嵌入增强高频特征捕捉</p>"
    },
    {
      "id": "pi_latent_no",
      "num": 31,
      "name": "PI-Latent-NO",
      "fullName": "物理信息潜空间神经算子 (Physics-Informed Latent Neural Operator)",
      "year": "2026",
      "org": "arXiv",
      "parent": "pino",
      "paperUrl": "https://arxiv.org/abs/2601.pilno",
      "projectUrl": "",
      "category": "operators",
      "motivation": "潜空间算子学习线性计算缩放",
      "summary": "PI-Latent-NO 的核心目标是：潜空间算子学习线性计算缩放。",
      "keyPoints": [
        "核心动机：潜空间算子学习线性计算缩放",
        "演化来源：继承或改进自 pino",
        "代表机构：arXiv"
      ],
      "detail": "<p>潜空间算子学习线性计算缩放</p>"
    },
    {
      "id": "difftaichi",
      "num": 32,
      "name": "DiffTaichi",
      "fullName": "可微分Taichi (Differentiable Taichi)",
      "year": "2020",
      "org": "MIT",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/1910.03035",
      "projectUrl": "",
      "category": "diff_sim",
      "motivation": "基于Taichi的自动微分比传统快188倍",
      "summary": "DiffTaichi 的核心目标是：基于Taichi的自动微分比传统快188倍。",
      "keyPoints": [
        "核心动机：基于Taichi的自动微分比传统快188倍",
        "代表机构：MIT"
      ],
      "detail": "<p>基于Taichi的自动微分比传统快188倍</p>"
    },
    {
      "id": "jax_md",
      "num": 33,
      "name": "JAX-MD",
      "fullName": "JAX分子动力学 (JAX Molecular Dynamics)",
      "year": "2020",
      "org": "DeepMind",
      "parent": "—",
      "paperUrl": "https://github.com/google/jax-md",
      "projectUrl": "",
      "category": "diff_sim",
      "motivation": "端到端可微分分子动力学框架",
      "summary": "JAX-MD 的核心目标是：端到端可微分分子动力学框架。",
      "keyPoints": [
        "核心动机：端到端可微分分子动力学框架",
        "代表机构：DeepMind"
      ],
      "detail": "<p>端到端可微分分子动力学框架</p>"
    },
    {
      "id": "nvidia_warp",
      "num": 34,
      "name": "NVIDIA-Warp",
      "fullName": "NVIDIA Warp",
      "year": "2022",
      "org": "NVIDIA",
      "parent": "difftaichi",
      "paperUrl": "https://github.com/NVIDIA/warp",
      "projectUrl": "",
      "category": "diff_sim",
      "motivation": "Python编译为CUDA支持大规模微分模拟",
      "summary": "NVIDIA-Warp 的核心目标是：Python编译为CUDA支持大规模微分模拟。",
      "keyPoints": [
        "核心动机：Python编译为CUDA支持大规模微分模拟",
        "演化来源：继承或改进自 difftaichi",
        "代表机构：NVIDIA"
      ],
      "detail": "<p>Python编译为CUDA支持大规模微分模拟</p>"
    },
    {
      "id": "pac_nerf",
      "num": 35,
      "name": "PAC-NeRF",
      "fullName": "物理增强连续NeRF (Physics Augmented Continuum NeRF)",
      "year": "2023",
      "org": "CMU",
      "parent": "difftaichi",
      "paperUrl": "https://xuan-li.github.io/PAC-NeRF/",
      "projectUrl": "",
      "category": "diff_sim",
      "motivation": "从视频推断流体物理参数",
      "summary": "PAC-NeRF 的核心目标是：从视频推断流体物理参数。",
      "keyPoints": [
        "核心动机：从视频推断流体物理参数",
        "演化来源：继承或改进自 difftaichi",
        "代表机构：CMU"
      ],
      "detail": "<p>从视频推断流体物理参数</p>"
    },
    {
      "id": "pie_nerf",
      "num": 36,
      "name": "PIE-NeRF",
      "fullName": "物理集成弹性动力学NeRF (Physics-Integrated Elastodynamics NeRF)",
      "year": "2024",
      "org": "PKU",
      "parent": "pac_nerf",
      "paperUrl": "https://github.com/FYTalon/pienerf",
      "projectUrl": "",
      "category": "diff_sim",
      "motivation": "隐式NeRF无网格离散化形变模拟",
      "summary": "PIE-NeRF 的核心目标是：隐式NeRF无网格离散化形变模拟。",
      "keyPoints": [
        "核心动机：隐式NeRF无网格离散化形变模拟",
        "演化来源：继承或改进自 pac_nerf",
        "代表机构：PKU"
      ],
      "detail": "<p>隐式NeRF无网格离散化形变模拟</p>"
    },
    {
      "id": "jax_mpm",
      "num": 37,
      "name": "JAX-MPM",
      "fullName": "JAX物质点法 (JAX Material Point Method)",
      "year": "2026",
      "org": "清华大学",
      "parent": "jax_md",
      "paperUrl": "https://link.springer.com/article/10.1007/s00366-026-02320-6",
      "projectUrl": "",
      "category": "diff_sim",
      "motivation": "统一拉格朗日-欧拉数据同化GPU框架",
      "summary": "JAX-MPM 的核心目标是：统一拉格朗日-欧拉数据同化GPU框架。",
      "keyPoints": [
        "核心动机：统一拉格朗日-欧拉数据同化GPU框架",
        "演化来源：继承或改进自 jax_md",
        "代表机构：清华大学"
      ],
      "detail": "<p>统一拉格朗日-欧拉数据同化GPU框架</p>"
    },
    {
      "id": "moto",
      "num": 38,
      "name": "MOTO",
      "fullName": "隐式MPM拓扑优化 (Topology Optimization via Implicit MPM)",
      "year": "2026",
      "org": "Wisconsin",
      "parent": "jax_mpm",
      "paperUrl": "https://arxiv.org/abs/2603.14596",
      "projectUrl": "",
      "category": "diff_sim",
      "motivation": "端到端可微分隐式MPM拓扑优化",
      "summary": "MOTO 的核心目标是：端到端可微分隐式MPM拓扑优化。",
      "keyPoints": [
        "核心动机：端到端可微分隐式MPM拓扑优化",
        "演化来源：继承或改进自 jax_mpm",
        "代表机构：Wisconsin"
      ],
      "detail": "<p>端到端可微分隐式MPM拓扑优化</p>"
    },
    {
      "id": "as_diffmpm",
      "num": 39,
      "name": "AS-DiffMPM",
      "fullName": "高斯增强物理仿真 (Gaussian-Augmented Physics Simulation)",
      "year": "2026",
      "org": "IIT",
      "parent": "jax_mpm",
      "paperUrl": "https://proceedings.neurips.cc/paper_files/paper/2025/hash/91ed94fc04f9da4a2e3e5382c56c93aa",
      "projectUrl": "",
      "category": "diff_sim",
      "motivation": "可微分碰撞处理复杂系统辨识",
      "summary": "AS-DiffMPM 的核心目标是：可微分碰撞处理复杂系统辨识。",
      "keyPoints": [
        "核心动机：可微分碰撞处理复杂系统辨识",
        "演化来源：继承或改进自 jax_mpm",
        "代表机构：IIT"
      ],
      "detail": "<p>可微分碰撞处理复杂系统辨识</p>"
    },
    {
      "id": "pod_dl_rom",
      "num": 40,
      "name": "POD-DL-ROM",
      "fullName": "POD深度学习降阶模型 (POD Deep Learning ROM)",
      "year": "2021",
      "org": "Politecnico Milano",
      "parent": "—",
      "paperUrl": "https://www.researchgate.net/publication/355414331",
      "projectUrl": "",
      "category": "acceleration",
      "motivation": "POD+Autoencoder加速140-3800倍",
      "summary": "POD-DL-ROM 的核心目标是：POD+Autoencoder加速140-3800倍。",
      "keyPoints": [
        "核心动机：POD+Autoencoder加速140-3800倍",
        "代表机构：Politecnico Milano"
      ],
      "detail": "<p>POD+Autoencoder加速140-3800倍</p>"
    },
    {
      "id": "deepxde",
      "num": 41,
      "name": "DeepXDE",
      "fullName": "深度扩展微分方程 (Deep eXtension Differential Equations)",
      "year": "2021",
      "org": "布朗大学",
      "parent": "—",
      "paperUrl": "https://github.com/lululxvi/deepxde",
      "projectUrl": "",
      "category": "acceleration",
      "motivation": "多后端支持学术研究框架",
      "summary": "DeepXDE 的核心目标是：多后端支持学术研究框架。",
      "keyPoints": [
        "核心动机：多后端支持学术研究框架",
        "代表机构：布朗大学"
      ],
      "detail": "<p>多后端支持学术研究框架</p>"
    },
    {
      "id": "neuralpde_jl",
      "num": 42,
      "name": "NeuralPDE-jl",
      "fullName": "NeuralPDE.jl",
      "year": "2022",
      "org": "MIT/NASA",
      "parent": "deepxde",
      "paperUrl": "https://github.com/SciML/NeuralPDE.jl",
      "projectUrl": "",
      "category": "acceleration",
      "motivation": "Julia高性能符号微分框架",
      "summary": "NeuralPDE-jl 的核心目标是：Julia高性能符号微分框架。",
      "keyPoints": [
        "核心动机：Julia高性能符号微分框架",
        "演化来源：继承或改进自 deepxde",
        "代表机构：MIT/NASA"
      ],
      "detail": "<p>Julia高性能符号微分框架</p>"
    },
    {
      "id": "modulus",
      "num": 43,
      "name": "Modulus",
      "fullName": "NVIDIA Modulus",
      "year": "2022",
      "org": "NVIDIA",
      "parent": "—",
      "paperUrl": "https://developer.nvidia.com/modulus",
      "projectUrl": "",
      "category": "acceleration",
      "motivation": "工业级数字孪生GPU深度优化",
      "summary": "Modulus 的核心目标是：工业级数字孪生GPU深度优化。",
      "keyPoints": [
        "核心动机：工业级数字孪生GPU深度优化",
        "代表机构：NVIDIA"
      ],
      "detail": "<p>工业级数字孪生GPU深度优化</p>"
    },
    {
      "id": "physicsnemo_v2",
      "num": 44,
      "name": "PhysicsNeMo-v2",
      "fullName": "NVIDIA PhysicsNeMo v2.0",
      "year": "2026",
      "org": "NVIDIA",
      "parent": "modulus",
      "paperUrl": "https://github.com/NVIDIA/physicsnemo/releases",
      "projectUrl": "",
      "category": "acceleration",
      "motivation": "PyTorch原生架构GNN速度提升2倍",
      "summary": "PhysicsNeMo-v2 的核心目标是：PyTorch原生架构GNN速度提升2倍。",
      "keyPoints": [
        "核心动机：PyTorch原生架构GNN速度提升2倍",
        "演化来源：继承或改进自 modulus",
        "代表机构：NVIDIA"
      ],
      "detail": "<p>PyTorch原生架构GNN速度提升2倍</p>"
    },
    {
      "id": "pde_fm",
      "num": 45,
      "name": "PDE-FM",
      "fullName": "PDE基础模型 (Foundation Model for PDEs)",
      "year": "2026",
      "org": "IBM Research",
      "parent": "fno",
      "paperUrl": "https://www.ibm.com/research/publications/towards-a-foundation-model-for-pdes",
      "projectUrl": "",
      "category": "acceleration",
      "motivation": "Mamba骨干网络误差降低46%",
      "summary": "PDE-FM 提出了一种融合**空间-频谱双 Tokenization**、**Mamba 状态空间骨干**和 **FNO 频谱解码器**的跨物理域 PDE 基础模型，通过在 The Well 基准的 12 个异构数据集上联合预训练，在湍流、天体物理和辐射流等非线性域实现了平均 VRMSE 降低 46% 的 SOTA 性能。",
      "keyPoints": [
        "<strong>空间-频谱双 Tokenization</strong>：PatchConv 提取局部空间特征 + 截断 FFT 捕获全局频谱模式，两路 Token 经 Cross-Attention 融合",
        "<strong>FiLM 物理条件注入</strong>：将数据集元信息（边界条件、物理系数等）通过 Feature-wise Linear Modulation 调制空间 Token，实现跨域泛化",
        "<strong>Mamba SSM 骨干</strong>：以 <span class=\"kb-math kb-math-inline\">O(Nd)</span> 线性复杂度替代 <span class=\"kb-math kb-math-inline\">O(N^2)</span> 的 Transformer 自注意力，在保持表达能力的同时大幅降低计算开销",
        "<strong>FNO 频谱解码器</strong>：在傅里叶域通过可学习权重矩阵进行频谱乘法，天然保持周期性和频谱连续性",
        "<strong>双重损失函数</strong>：VRMSE 物理空间损失 + 频谱 <span class=\"kb-math kb-math-inline\">L_2</span> 损失，可选守恒正则和 PDE 残差惩罚",
        "<strong>多数据集预训练策略</strong>：温度缩放采样 <span class=\"kb-math kb-math-inline\">p(i) \\propto |\\mathcal{D}_i|^{\\tau}</span>（<span class=\"kb-math kb-math-inline\">\\tau=0.5</span>）+ EMA 难度加权 + 数据集特定 1×1 适配器",
        "<strong>12 个 The Well 数据集</strong>覆盖活性物质、湍流辐射层、粘弹性不稳定性、剪切流、Gray-Scott 反应扩散、Rayleigh-Bénard 对流、中子星并合后、超新星爆炸、引力冷却湍流、红超巨星对流包层、Helmholtz 阶梯、声学散射",
        "<strong>SOTA 结果</strong>：6/12 数据集最优，均值 VRMSE 0.165（次优 CNextU-net 为 0.304），在 Rayleigh-Bénard 和剪切流上超越基线一个数量级"
      ],
      "detail": "<p><img alt=\"PDE-FM 架构总览图\" src=\"https://ar5iv.labs.arxiv.org/html/2511.21861/assets/figures/architecture_fm4pde.png\" />\n<em>图：PDE-FM 的五阶段流水线架构——空间-频谱双 Tokenization → FiLM 物理条件注入 → Cross-Attention 融合 → Mamba SSM 骨干 → FNO 频谱解码器</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># PDE-FM 前向传播伪代码\ndef forward(u_t, metadata_c):\n    # Stage 1: 空间-频谱双 Tokenization\n    z_spatial = PatchConv(u_t)                    # [B, N_p, d]\n    z_spectral = TruncFFT(u_t, k_max)            # [B, C, k_max, k_max] → Linear → [B, M, d]\n\n    # Stage 2: FiLM 物理条件注入\n    gamma, beta = FiLM_MLP(metadata_c)            # 从元信息生成调制参数\n    z_spatial = gamma * z_spatial + beta           # 逐特征仿射变换\n\n    # Stage 3: Cross-Attention 融合\n    z_fused = CrossAttn(Q=z_spatial, K=z_spectral, V=z_spectral) + z_spatial\n\n    # Stage 4: Mamba SSM 骨干 (L 层)\n    for l in range(L):\n        z_fused = z_fused + Mamba_Block(LayerNorm(z_fused))  # O(Nd) 线性复杂度\n\n    # Stage 5: FNO 频谱解码器\n    z_proj = Conv1x1(z_fused).reshape(B, C_out, H, W)\n    u_hat = z_proj + sum(iFFT(R_k * FFT(z_proj)) for k in range(K_modes))\n\n    return u_hat  # 预测 u_{t+1}\n</code></pre>\n<h5>动机与背景</h5>\n<p>传统 PDE 求解器（有限元/有限差分）在高分辨率三维场景下计算成本极高，单次模拟可能需要数千 GPU 小时。<strong>神经算子</strong>（如 FNO、DeepONet）虽然能以数据驱动方式加速求解，但存在两个核心瓶颈：</p>\n<ol>\n<li><strong>单域训练</strong>：每个 PDE 族需要独立训练一个模型，无法利用不同物理域之间的共享结构（如不可压缩性、涡度守恒等）</li>\n<li><strong>频谱退化</strong>：纯空间域方法在长时间推演中高频分量迅速衰减，导致预测模糊化</li>\n</ol>\n<p>PDE-FM 的核心洞察是：<strong>不同 PDE 族共享底层的频谱-空间对偶结构</strong>，通过联合预训练可以学习到可迁移的归纳偏置。</p>\n<h5>核心机制详解</h5>\n<p><strong>（1）空间-频谱双 Tokenization</strong></p>\n<p>空间分支使用 PatchConv（步幅卷积）将输入场 <span class=\"kb-math kb-math-inline\">u_t \\in \\mathbb{R}^{C \\times H \\times W}</span> 分割为 <span class=\"kb-math kb-math-inline\">N_p</span> 个 Patch Token：</p>\n<div class=\"kb-math kb-math-display\">z_{\\text{spatial}} = \\text{PatchConv}(u_t) \\in \\mathbb{R}^{N_p \\times d}</div>\n<p>频谱分支对输入做 2D FFT 并截断到前 <span class=\"kb-math kb-math-inline\">k_{\\max}</span> 个模态，再通过线性投影对齐维度：</p>\n<div class=\"kb-math kb-math-display\">z_{\\text{spectral}} = \\text{Linear}\\left(\\text{TruncFFT}(u_t, k_{\\max})\\right) \\in \\mathbb{R}^{M \\times d}</div>\n<div class=\"key-point\">💡 <strong>关键</strong>：空间 Token 捕获局部梯度和边界信息，频谱 Token 捕获全局周期结构和能量级联——两者互补，缺一不可。</div>\n<p><strong>（2）FiLM 物理条件注入</strong></p>\n<p>为实现跨域泛化，PDE-FM 将数据集元信息（PDE 类型、边界条件、物理系数等）编码为条件向量 <span class=\"kb-math kb-math-inline\">c</span>，通过 Feature-wise Linear Modulation 调制空间 Token：</p>\n<div class=\"kb-math kb-math-display\">z_{\\text{cond}} = \\gamma(c) \\odot z_{\\text{spatial}} + \\beta(c)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\gamma(c), \\beta(c) \\in \\mathbb{R}^d</span> 由两层 MLP 从 <span class=\"kb-math kb-math-inline\">c</span> 生成。这种设计让同一骨干网络能根据物理上下文动态调整特征表示，无需为每个 PDE 族维护独立参数。</p>\n<p><strong>（3）Cross-Attention 融合</strong></p>\n<p>空间和频谱两路 Token 通过标准交叉注意力机制融合：</p>\n<div class=\"kb-math kb-math-display\">z_{\\text{fused}} = \\text{softmax}\\!\\left(\\frac{Q_{\\text{spatial}} \\cdot K_{\\text{spectral}}^T}{\\sqrt{d}}\\right) V_{\\text{spectral}} + z_{\\text{spatial}}</div>\n<p>空间 Token 作为 Query，频谱 Token 作为 Key/Value，使每个空间位置都能\"查询\"全局频谱信息。残差连接确保局部空间特征不被稀释。</p>\n<p><strong>（4）Mamba SSM 骨干</strong></p>\n<p>融合后的 Token 序列送入 <span class=\"kb-math kb-math-inline\">L</span> 层 Mamba 残差块。Mamba 是一种选择性状态空间模型（Selective SSM），其核心递推为：</p>\n<div class=\"kb-math kb-math-display\">h_n = \\bar{A} h_{n-1} + \\bar{B} x_n, \\quad y_n = C h_n</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\bar{A}, \\bar{B}</span> 通过零阶保持（ZOH）离散化得到，且 <span class=\"kb-math kb-math-inline\">B, C, \\Delta</span> 均为输入依赖的（input-dependent），赋予模型选择性记忆能力。</p>\n<div class=\"key-point\">💡 <strong>关键</strong>：Mamba 的计算复杂度为 <span class=\"kb-math kb-math-inline\">O(Nd)</span>（<span class=\"kb-math kb-math-inline\">N</span> 为序列长度，<span class=\"kb-math kb-math-inline\">d</span> 为隐藏维度），相比 Transformer 的 <span class=\"kb-math kb-math-inline\">O(N^2)</span> 在高分辨率 PDE 场景下优势显著。消融实验显示 Mamba+FNO（VRMSE 0.2581）略优于 Transformer+FNO（0.2779）。</div>\n<p><strong>（5）FNO 频谱解码器</strong></p>\n<p>骨干输出经 1×1 卷积投影回物理空间维度后，通过 FNO 头进行频谱精修：</p>\n<div class=\"kb-math kb-math-display\">\\hat{u}_{t+1} = z_{\\text{proj}} + \\sum_{k=1}^{K} \\mathcal{F}^{-1}\\!\\left(R_k \\cdot \\mathcal{F}(z_{\\text{proj}})\\right)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">R_k \\in \\mathbb{C}^{d_{\\text{out}} \\times d_{\\text{out}}}</span> 是可学习的频谱权重矩阵，<span class=\"kb-math kb-math-inline\">\\mathcal{F}</span> 和 <span class=\"kb-math kb-math-inline\">\\mathcal{F}^{-1}</span> 分别为 FFT 和逆 FFT。这种设计天然保持频谱连续性，避免了纯卷积解码器的高频衰减问题。</p>\n<p><strong>（6）损失函数</strong></p>\n<p>训练使用双重损失：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L} = \\mathcal{L}_{\\text{VRMSE}} + \\lambda \\cdot \\mathcal{L}_{\\text{spectral}}</div>\n<p>其中 VRMSE 按空间方差归一化，确保不同物理量级的场（密度、压力、速度）具有可比性：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{VRMSE}} = \\frac{\\|u - \\hat{u}\\|_2}{\\sqrt{\\text{Var}_{\\text{spatial}}(u)}}</div>\n<p>频谱损失在傅里叶域计算 <span class=\"kb-math kb-math-inline\">L_2</span> 距离，惩罚高频分量的偏差。可选的守恒损失和 PDE 残差损失进一步增强物理一致性。</p>\n<h5>多数据集预训练策略</h5>\n<p>PDE-FM 在 The Well 基准的 12 个数据集上联合预训练，涵盖从 <span class=\"kb-math kb-math-inline\">128^2</span> 到 <span class=\"kb-math kb-math-inline\">256^3</span> 的 2D/3D 系统。关键设计包括：</p>\n<ul>\n<li><strong>温度缩放采样</strong>：<span class=\"kb-math kb-math-inline\">p(i) \\propto |\\mathcal{D}_i|^{\\tau}</span>，<span class=\"kb-math kb-math-inline\">\\tau=0.5</span> 平衡数据集多样性与收敛稳定性</li>\n<li><strong>数据集特定适配器</strong>：1×1 卷积进行通道归一化和空间插值，将异构输入映射到标准化网格</li>\n<li><strong>EMA 难度加权</strong>：用指数移动平均跟踪每个数据集的损失，动态提升困难数据集的采样权重，缓解负迁移</li>\n</ul>\n<h5>与现有方法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>骨干</th>\n<th>复杂度</th>\n<th>跨域能力</th>\n<th>均值 VRMSE</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>FNO</td>\n<td>频谱卷积</td>\n<td><span class=\"kb-math kb-math-inline\">O(N \\log N)</span></td>\n<td>❌ 单域</td>\n<td>0.441</td>\n</tr>\n<tr>\n<td>TFNO</td>\n<td>Transformer+频谱</td>\n<td><span class=\"kb-math kb-math-inline\">O(N^2)</span></td>\n<td>❌ 单域</td>\n<td>0.469</td>\n</tr>\n<tr>\n<td>U-net</td>\n<td>编码器-解码器</td>\n<td><span class=\"kb-math kb-math-inline\">O(N)</span></td>\n<td>❌ 单域</td>\n<td>0.588</td>\n</tr>\n<tr>\n<td>CNextU-net</td>\n<td>ConvNeXt+U-net</td>\n<td><span class=\"kb-math kb-math-inline\">O(N)</span></td>\n<td>❌ 单域</td>\n<td>0.304</td>\n</tr>\n<tr>\n<td>PhysiX</td>\n<td>自回归 Transformer (4.5B)</td>\n<td><span class=\"kb-math kb-math-inline\">O(N^2)</span></td>\n<td>✅ 多域</td>\n<td>仅 2D</td>\n</tr>\n<tr>\n<td><strong>PDE-FM</strong></td>\n<td><strong>Mamba+FNO</strong></td>\n<td><strong><span class=\"kb-math kb-math-inline\">O(Nd)</span></strong></td>\n<td><strong>✅ 多域</strong></td>\n<td><strong>0.165</strong></td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"warn-box\">⚠️ <strong>局限性</strong>：PDE-FM 在粘弹性不稳定性（VRMSE 0.52 vs CNextU-net 0.25）和线性声学散射等局部刚性/准稳态系统上仍落后于卷积架构，表明长期应力-应变耦合需要显式的物理先验或时序记忆机制。</div>\n<h5>消融实验关键发现</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>配置</th>\n<th>均值 VRMSE</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Mamba + FiLM + FNO + SpecTok + XAttn + LayerNorm</td>\n<td><strong>0.2581</strong></td>\n</tr>\n<tr>\n<td>Transformer + FNO + SpecTok + XAttn + LayerNorm</td>\n<td>0.2779</td>\n</tr>\n<tr>\n<td>Transformer + Conv + SpecTok + LayerNorm</td>\n<td>0.3045</td>\n</tr>\n<tr>\n<td>Transformer + FNO（无 LayerNorm）</td>\n<td>0.3134</td>\n</tr>\n<tr>\n<td>Transformer + Conv（无 SpecTok/XAttn/Norm）</td>\n<td>0.3297</td>\n</tr>\n</tbody>\n</table></div>\n<p>三个关键结论：(1) FNO 解码器一致优于卷积解码器；(2) Mamba 骨干略优于 Transformer 且计算成本更低；(3) 频谱 Tokenizer 和 Cross-Attention 贡献了最大的性能增益。</p>",
      "quiz": {
        "q": "PDE-FM 中 Cross-Attention 融合模块的 Query 和 Key/Value 分别来自哪里？",
        "options": [
          "Query 来自频谱 Token，Key/Value 来自空间 Token",
          "Query 来自空间 Token，Key/Value 来自频谱 Token",
          "Query、Key、Value 均来自空间 Token（自注意力）",
          "Query、Key、Value 均来自频谱 Token（自注意力）"
        ],
        "answer": 1,
        "explain": "空间 Token 作为 Query 查询频谱 Token（Key/Value），使每个空间位置能获取全局频率信息，实现局部-全局特征融合。"
      }
    },
    {
      "id": "scasml",
      "num": 46,
      "name": "SCaSML",
      "fullName": "仿真校准科学机器学习 (Simulation-Calibrated Scientific ML)",
      "year": "2026",
      "org": "ICLR 2026",
      "parent": "pinn",
      "paperUrl": "https://openreview.net/forum?id=scasml2026",
      "projectUrl": "",
      "category": "acceleration",
      "motivation": "推理阶段缺陷定律误差修正",
      "summary": "SCaSML 的核心目标是：推理阶段缺陷定律误差修正。",
      "keyPoints": [
        "核心动机：推理阶段缺陷定律误差修正",
        "演化来源：继承或改进自 pinn",
        "代表机构：ICLR 2026"
      ],
      "detail": "<p>推理阶段缺陷定律误差修正</p>"
    },
    {
      "id": "mollifier_layers",
      "num": 47,
      "name": "Mollifier-Layers",
      "fullName": "逆向PDE平滑层 (Mollifier Layers for Inverse PDEs)",
      "year": "2026",
      "org": "宾夕法尼亚大学",
      "parent": "pinn",
      "paperUrl": "https://arxiv.org/abs/2601.mollifier",
      "projectUrl": "",
      "category": "acceleration",
      "motivation": "平滑层处理噪声逆向PDE求解",
      "summary": "Mollifier-Layers 的核心目标是：平滑层处理噪声逆向PDE求解。",
      "keyPoints": [
        "核心动机：平滑层处理噪声逆向PDE求解",
        "演化来源：继承或改进自 pinn",
        "代表机构：宾夕法尼亚大学"
      ],
      "detail": "<p>平滑层处理噪声逆向PDE求解</p>"
    }
  ],
  "categories": {
    "pinn_family": {
      "label": "物理信息神经网络",
      "color": "#22a06b"
    },
    "operators": {
      "label": "神经算子",
      "color": "#5b63d3"
    },
    "diff_sim": {
      "label": "可微分仿真",
      "color": "#e8820c"
    },
    "acceleration": {
      "label": "科学计算加速",
      "color": "#d32f2f"
    }
  },
  "projectUrls": {}
};
