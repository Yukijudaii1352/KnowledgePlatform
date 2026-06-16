/**
 * ml4sci-data.js — 由 pipeline/build.py 于 2026-06-16 17:00:08 自动生成。
 * 源文件：content/ai4sci/ml4sci.md
 * ⚠️  请勿手动修改；如需更新，修改源文档后重新编译。
 */
window.PAGE_CONFIG = {
  "meta": {
    "domain": "ai4sci",
    "topic_id": "ml4sci",
    "topic_name": "科学机器学习技术演进",
    "page_title": "科学机器学习技术演进",
    "page_subtitle": "2026-06-16 版",
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
      "summary": "hp-VPINNs 将 PINN 的点残差约束改成局部变分残差：用一个全局神经网络表示 trial solution，同时在非重叠子域上用高阶多项式测试函数投影 PDE 残差，从而通过 \\(h\\)-域分解和 \\(p\\)-阶数提升处理局部奇异性、陡峭梯度和非均匀误差。",
      "keyPoints": [
        "<strong>全局 trial space</strong>：解函数仍由一个全局神经网络 <span class=\"kb-math kb-math-inline\">u_{NN}(x,t;\\theta)</span> 表示，保持 PINN 的连续函数近似能力",
        "<strong>局部 test space</strong>：测试函数定义在每个非重叠子域上，常用 Legendre 多项式等高阶局部基",
        "<strong>hp-refinement</strong>：<span class=\"kb-math kb-math-inline\">h</span> 表示增加/重排子域元素，<span class=\"kb-math kb-math-inline\">p</span> 表示提升局部测试多项式阶数或数量",
        "<strong>变分残差损失</strong>：最小化 <span class=\"kb-math kb-math-inline\">(\\mathcal{L}u_{NN}-f, v_k^{(e)})_{\\Omega_e}</span>，而不是只在 collocation points 上令强残差为零",
        "<strong>局部学习机制</strong>：网络参数是全局共享的，但 loss 按元素组织，可以把训练压力集中到误差大、非光滑或奇异的局部区域",
        "<strong>数值积分实现</strong>：深层网络的变分积分通常不能解析求出，论文使用 Gauss quadrature 近似；也可通过分部积分降低网络导数阶数",
        "<strong>相对 VPINN 的改进</strong>：VPINN 使用全局测试函数，hp-VPINNs 使用局部分片测试函数，更接近 subdomain Petrov-Galerkin",
        "<strong>实验对象</strong>：函数逼近、1D/2D Poisson 方程、L-shape corner singularity、advection-diffusion inverse problem 等"
      ],
      "detail": "<h5>核心示意图与来源</h5>\n<p>论文 arXiv 页面为 https://arxiv.org/abs/2003.05385，CMAME 版本 DOI 为 https://doi.org/10.1016/j.cma.2020.113547。论文没有单一神经网络架构图，最能体现方法的图是局部测试函数与子域误差示例；下图来自 ar5iv 对论文 Figure 1 的渲染。</p>\n<p><img alt=\"hp-VPINNs 局部测试函数与子域学习示意\" src=\"https://ar5iv.labs.arxiv.org/html/2003.05385/assets/x1.png\" />\n<em>图：全局测试函数与局部 elemental test functions 的对比；局部测试函数把残差投影限制到指定子域，是 hp-VPINNs 域分解和局部学习的核心。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># hp-VPINNs 训练伪代码\n\ndef u_nn(x, t, theta):\n    return mlp(concat(x, t), theta)\n\ndef strong_residual(x, t, theta):\n    u = u_nn(x, t, theta)\n    # 例如 L u = f，所需导数由自动微分计算\n    return L(u, x, t) - f(x, t)\n\ndef element_variational_residual(element, test_fn, theta):\n    residual_sum = 0.0\n    for z, w in gauss_quadrature_points(element):\n        x, t = z\n        r = strong_residual(x, t, theta)\n        residual_sum += w * r * test_fn(x, t)\n    return residual_sum\n\nfor epoch in range(num_epochs):\n    loss_v = 0.0\n    for element in mesh_partition:\n        local_terms = []\n        for v_k in element.local_polynomial_tests:\n            R_ek = element_variational_residual(element, v_k, theta)\n            local_terms.append(R_ek ** 2)\n        loss_v += mean(local_terms)\n\n    loss_b = mean((u_nn(x_b, t_b, theta) - boundary_value(x_b, t_b)) ** 2)\n    loss_0 = mean((u_nn(x_0, 0, theta) - initial_value(x_0)) ** 2)\n    loss = loss_v + tau_b * loss_b + tau_0 * loss_0\n\n    optimizer.zero_grad()\n    loss.backward()\n    optimizer.step()\n</code></pre>\n<h5>从强形式 PINN 到变分形式</h5>\n<p>论文考虑一般 PDE：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}^{\\mathbf{q}}u(\\mathbf{x},t)=f(\\mathbf{x},t),\n\\qquad\n(\\mathbf{x},t)\\in\\Omega\\times(0,T],</div>\n<p>配合边界与初始条件：</p>\n<div class=\"kb-math kb-math-display\">u(\\mathbf{x},t)=h(\\mathbf{x},t),\n\\qquad\nu(\\mathbf{x},0)=g(\\mathbf{x}).</div>\n<p>用神经网络 <span class=\"kb-math kb-math-inline\">u_{NN}(\\mathbf{x},t;\\theta)</span> 近似解后，强形式残差为：</p>\n<div class=\"kb-math kb-math-display\">r(u_{NN})=\\mathcal{L}^{\\mathbf{q}}u_{NN}-f.</div>\n<p>标准 PINN 直接在 collocation points 上最小化 <span class=\"kb-math kb-math-inline\">|r|^2</span>，即把测试函数隐式看成一组 Dirac delta。hp-VPINNs 则把残差投影到测试函数上：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{R}_j(u_{NN})\n=\n\\int_{\\Omega\\times(0,T]}\nr(u_{NN})v_j\\,d\\mathbf{x}\\,dt.</div>\n<p>这种弱/变分约束的直觉是：不要求每个采样点的强残差都精确为零，而是要求残差对一组测试函数的矩为零。对噪声、采样点布局和局部奇异结构而言，这往往比纯点约束更稳健。</p>\n<h5>hp-VPINNs 的局部元素残差</h5>\n<p>hp-VPINNs 的关键是测试函数局部化。把计算域划分为非重叠元素 <span class=\"kb-math kb-math-inline\">\\Omega_e</span>，在第 <span class=\"kb-math kb-math-inline\">e</span> 个元素上定义局部测试函数 <span class=\"kb-math kb-math-inline\">v_k^{(e)}</span>，其支撑只在该元素内非零：</p>\n<div class=\"kb-math kb-math-display\">v_k^{(e)}(\\mathbf{x},t)=\n\\begin{cases}\n\\bar{v}_k^{(e)}(\\mathbf{x},t), &amp; (\\mathbf{x},t)\\in\\Omega_e,\\\\\n0, &amp; \\text{otherwise}.\n\\end{cases}</div>\n<p>元素级变分残差为：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{R}^{(e)}_k\n=\n\\left(\\mathcal{L}^{\\mathbf{q}}u_{NN}-f,\\;v_k^{(e)}\\right)_{\\Omega_e}.</div>\n<p>总损失可以写成：</p>\n<div class=\"kb-math kb-math-display\">L^{\\mathfrak{v}}\n=\n\\sum_{e=1}^{N_{el}}\n\\frac{1}{K^{(e)}}\\sum_{k=1}^{K^{(e)}}\n\\left|\\mathcal{R}^{(e)}_k\\right|^2\n+\\tau_b\\frac{1}{N_b}\\sum_{i=1}^{N_b}|r_b(\\mathbf{x}^i_b,t^i_b)|^2\n+\\tau_0\\frac{1}{N_0}\\sum_{i=1}^{N_0}|r_0(\\mathbf{x}^i_0)|^2.</div>\n<p>这里 <span class=\"kb-math kb-math-inline\">K^{(e)}</span> 是第 <span class=\"kb-math kb-math-inline\">e</span> 个元素内的测试函数数量。<span class=\"kb-math kb-math-inline\">h</span>-refinement 对应把困难区域划得更细；<span class=\"kb-math kb-math-inline\">p</span>-refinement 对应在困难元素中使用更高阶或更多测试函数。</p>\n<h5>数值积分与分部积分</h5>\n<p>由于 <span class=\"kb-math kb-math-inline\">u_{NN}</span> 是深层非线性函数，<span class=\"kb-math kb-math-inline\">\\mathcal{R}^{(e)}_k</span> 通常无法解析积分，论文使用 Gauss quadrature：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{R}^{(e)}_k\n\\approx\n\\sum_{m=1}^{Q}\nw_m\\,\n\\left(\\mathcal{L}^{\\mathbf{q}}u_{NN}(z_m)-f(z_m)\\right)\nv_k^{(e)}(z_m).</div>\n<p>当 PDE 含高阶导数时，可以对弱形式做分部积分，把部分导数从 <span class=\"kb-math kb-math-inline\">u_{NN}</span> 转移到测试函数上。这样能降低自动微分需要计算的网络导数阶数，在高阶 PDE 或 stiff 问题中尤其重要。</p>\n<h5>为什么局部变分约束能处理奇异性</h5>\n<p>标准 PINN 的误差控制强依赖 collocation 点分布和损失权重。如果解在 L-shape 角点、边界层、冲击附近或局部高频区域变化剧烈，均匀采样容易把训练预算浪费在平滑区域。hp-VPINNs 把残差损失拆成元素级贡献，允许针对困难区域增加元素数或测试阶数，使优化信号更局部、更可控。</p>\n<div class=\"key-point\">💡 关键：hp-VPINNs 不是在每个子域训练独立网络；论文的主设定仍是一个全局神经网络，只是 residual projection 和损失组织在局部元素上完成。</div>\n<h5>与 PINN、VPINN 和有限元的区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>Trial function</th>\n<th>Test / residual</th>\n<th>细化方式</th>\n<th>主要特点</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>PINN</td>\n<td>全局 DNN</td>\n<td>点残差 / collocation</td>\n<td>增加采样点</td>\n<td>简单通用，但对采样和权重敏感</td>\n</tr>\n<tr>\n<td>VPINN</td>\n<td>全局 DNN</td>\n<td>全局多项式测试函数</td>\n<td>增加全局测试阶数</td>\n<td>引入变分残差，但局部控制较弱</td>\n</tr>\n<tr>\n<td>hp-VPINNs</td>\n<td>全局 DNN</td>\n<td>子域局部高阶测试函数</td>\n<td><span class=\"kb-math kb-math-inline\">h</span> 域分解 + <span class=\"kb-math kb-math-inline\">p</span> 阶数提升</td>\n<td>局部化优化信号，适合非光滑或局部复杂解</td>\n</tr>\n<tr>\n<td>有限元</td>\n<td>分片多项式</td>\n<td>局部弱形式</td>\n<td>标准 <span class=\"kb-math kb-math-inline\">h/p</span> 网格细化</td>\n<td>数值理论成熟，但 trial space 表达受网格基限制</td>\n</tr>\n</tbody>\n</table></div>\n<p>hp-VPINNs 的定位可以理解为：保留 PINN 的神经网络 trial space，同时把有限元/Petrov-Galerkin 的局部测试空间和 hp-refinement 引入损失设计。它不是传统数值方法的直接替代，而是把“如何约束神经网络满足 PDE”从点约束升级为局部积分约束。</p>\n<h5>实用限制</h5>\n<p>hp-VPINNs 的额外精度来自更复杂的 loss。每个元素、每个测试函数、每个 quadrature point 都需要计算 residual 和自动微分，训练成本通常高于标准 PINN。测试阶数、元素划分、quadrature 点数、边界项权重都会显著影响结果。对于高维问题，普通张量积 quadrature 会遇到维数灾难，需要 sparse grid、quasi-Monte Carlo 或其他积分近似来控制成本。</p>",
      "quiz": {
        "q": "hp-VPINNs 中 h-refinement 和 p-refinement 分别对应什么？",
        "options": [
          "h 是学习率调度，p 是优化器动量",
          "h 是增加网络隐藏层，p 是增加神经元数量",
          "h 是域分解/元素细化，p 是提高局部测试多项式阶数或数量",
          "h 是边界损失权重，p 是初始条件损失权重"
        ],
        "answer": 2,
        "explain": "hp-VPINNs 将测试函数定义在局部子域上；h-refinement 改变子域划分，p-refinement 改变元素内高阶多项式测试空间。"
      }
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
      "summary": "cPINN 将计算域划分为多个子域并为每个子域训练独立 PINN，在子域交界面显式惩罚通量连续和平均解一致性，从而把守恒律的跨界面约束嵌入神经网络求解器，提升非线性守恒律问题的局部表达能力与并行性。",
      "keyPoints": [
        "<strong>面向非线性守恒律</strong>：主要针对 Burgers、KdV、Euler、Navier-Stokes 等可写成守恒/通量形式的 PDE",
        "<strong>离散域分解</strong>：把时空或空间计算域拆成多个子域，每个子域使用独立 neural network <span class=\"kb-math kb-math-inline\">u_{\\theta_i}</span>",
        "<strong>强形式 PDE 残差</strong>：每个子域内部仍像 PINN 一样通过自动微分最小化 PDE residual",
        "<strong>界面通量连续</strong>：在相邻子域的公共界面上强制 <span class=\"kb-math kb-math-inline\">F(u_i,\\nabla u_i)=F(u_j,\\nabla u_j)</span>，这是 cPINN 的“conservative”核心",
        "<strong>平均解约束</strong>：除通量连续外，还约束两侧网络在界面上的预测接近平均解，以加速收敛并抑制界面振荡",
        "<strong>局部网络自由度</strong>：不同子域可使用不同深度、宽度、激活函数、优化器、残差点数量和训练超参数",
        "<strong>并行计算友好</strong>：子域内部损失可在不同设备/进程上并行优化，只需交换界面预测和通量信息",
        "<strong>来源限制说明</strong>：任务给出的 arXiv URL 当前解析为另一篇非 cPINN 论文；本文方法依据作者仓库 <code>https://github.com/AmeyaJagtap/Conservative_PINNs</code>、论文 DOI <code>https://doi.org/10.1016/j.cma.2020.113028</code> 和仓库 PDF <code>https://raw.githubusercontent.com/AmeyaJagtap/Conservative_PINNs/main/cPINN_Paper.pdf</code>"
      ],
      "detail": "<h5>核心示意图与来源</h5>\n<p><img alt=\"cPINN 域分解与界面守恒约束示意\" src=\"https://quickchart.io/graphviz?graph=digraph%20G%20%7Brankdir%3DLR%3Bnode%5Bshape%3Dbox%2Cstyle%3Drounded%5D%3Bsd1%5Blabel%3D%22Subdomain%201%5CnPINN%201%22%5D%3Bsd2%5Blabel%3D%22Subdomain%202%5CnPINN%202%22%5D%3Bsd3%5Blabel%3D%22Subdomain%203%5CnPINN%203%22%5D%3Bsd1-%3Esd2%5Blabel%3D%22flux%20%2B%20state%20continuity%22%2Cdir%3Dboth%5D%3Bsd2-%3Esd3%5Blabel%3D%22flux%20%2B%20state%20continuity%22%2Cdir%3Dboth%5D%3B%7D\" />\n<em>图：cPINN 的核心是多个子域 PINN 通过界面条件耦合；原论文 Figure 1 的可访问来源见作者仓库 PDF：<code>https://raw.githubusercontent.com/AmeyaJagtap/Conservative_PINNs/main/cPINN_Paper.pdf</code>。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># cPINN 训练伪代码\n\nsubdomains = split_domain(Omega, interfaces)\nmodels = {i: PINN_i(width=local_width[i], depth=local_depth[i])\n          for i in subdomains}\n\nfor epoch in range(num_epochs):\n    total_loss = 0.0\n\n    # 1. 每个子域内部的 PINN 损失\n    for i, Omega_i in subdomains.items():\n        u_i = models[i](x_u[i], t_u[i])\n        f_i = pde_residual(models[i], x_f[i], t_f[i])  # auto-diff\n        loss_data_i = mse(u_i, u_data[i])\n        loss_res_i = mse(f_i, 0.0)\n        total_loss += lambda_u * loss_data_i + lambda_f * loss_res_i\n\n    # 2. 相邻子域界面上的守恒耦合\n    for (i, j, Gamma_ij) in neighboring_interfaces:\n        u_i = models[i](Gamma_ij.x, Gamma_ij.t)\n        u_j = models[j](Gamma_ij.x, Gamma_ij.t)\n        flux_i = physical_flux(models[i], Gamma_ij)\n        flux_j = physical_flux(models[j], Gamma_ij)\n        u_avg = 0.5 * (u_i + u_j)\n\n        loss_flux = mse(flux_i - flux_j, 0.0)\n        loss_state = mse(u_i - u_avg, 0.0) + mse(u_j - u_avg, 0.0)\n        total_loss += lambda_flux * loss_flux + lambda_state * loss_state\n\n    update_all_or_local_optimizers(models, total_loss)\n</code></pre>\n<h5>从 PINN 到 cPINN：为什么需要界面守恒</h5>\n<p>标准 PINN 在整个域上训练一个网络 <span class=\"kb-math kb-math-inline\">u_\\theta(x,t)</span>，用数据项、边界/初始条件项和 PDE 残差项组成损失。对于一般守恒律：</p>\n<div class=\"kb-math kb-math-display\">\\frac{\\partial u}{\\partial t} + \\nabla\\cdot \\mathbf{F}(u,\\nabla u;\\lambda)=0,</div>\n<p>标准 PINN 的强形式残差可写为：</p>\n<div class=\"kb-math kb-math-display\">r_\\theta(x,t)=\n\\frac{\\partial u_\\theta}{\\partial t}\n+ \\nabla\\cdot \\mathbf{F}(u_\\theta,\\nabla u_\\theta;\\lambda).</div>\n<p>当解含冲击、边界层、多尺度结构或局部复杂流动时，一个全局网络往往需要很大容量才能同时拟合所有区域。更严重的是，守恒律的数值解通常要求跨单元通量守恒；如果只把域拆开训练多个 PINN，而没有界面通量约束，各子域预测可能在界面处产生非物理的质量、动量或能量泄漏。</p>\n<p>cPINN 的基本想法是：在每个子域 <span class=\"kb-math kb-math-inline\">\\Omega_i</span> 中训练独立网络 <span class=\"kb-math kb-math-inline\">u_{\\theta_i}</span>，同时在相邻子域界面 <span class=\"kb-math kb-math-inline\">\\Gamma_{ij}</span> 上加入守恒约束。子域内部损失为：</p>\n<div class=\"kb-math kb-math-display\">L_i^{\\mathrm{PINN}}\n=\n\\frac{1}{N_{u,i}}\\sum_{n=1}^{N_{u,i}}\n\\left|u_{\\theta_i}(x_n,t_n)-u_n\\right|^2\n+\n\\frac{1}{N_{f,i}}\\sum_{n=1}^{N_{f,i}}\n\\left|r_{\\theta_i}(x_n,t_n)\\right|^2.</div>\n<h5>界面通量连续与平均解约束</h5>\n<p>对公共界面 <span class=\"kb-math kb-math-inline\">\\Gamma_{ij}</span>，cPINN 要求两侧通量一致：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{F}\\!\\left(u_{\\theta_i},\\nabla u_{\\theta_i}\\right)\\cdot \\mathbf{n}_{ij}\n=\n\\mathbf{F}\\!\\left(u_{\\theta_j},\\nabla u_{\\theta_j}\\right)\\cdot \\mathbf{n}_{ij}.</div>\n<p>对于一维粘性 Burgers 方程：</p>\n<div class=\"kb-math kb-math-display\">u_t + u u_x - \\nu u_{xx}=0,</div>\n<p>它可写成通量形式 <span class=\"kb-math kb-math-inline\">u_t + \\partial_x F = 0</span>，其中：</p>\n<div class=\"kb-math kb-math-display\">F(u,u_x)=\\frac{u^2}{2}-\\nu u_x.</div>\n<p>因此在界面 <span class=\"kb-math kb-math-inline\">x=x_\\Gamma</span> 上的通量损失可写成：</p>\n<div class=\"kb-math kb-math-display\">L_{\\Gamma}^{\\mathrm{flux}}\n=\n\\frac{1}{N_\\Gamma}\\sum_{n=1}^{N_\\Gamma}\n\\left|\n\\left(\\frac{u_{\\theta_i}^2}{2}-\\nu \\partial_x u_{\\theta_i}\\right)(x_\\Gamma,t_n)\n-\n\\left(\\frac{u_{\\theta_j}^2}{2}-\\nu \\partial_x u_{\\theta_j}\\right)(x_\\Gamma,t_n)\n\\right|^2.</div>\n<p>论文/代码还加入平均解约束。令：</p>\n<div class=\"kb-math kb-math-display\">\\bar{u}_{ij}=\\frac{u_{\\theta_i}+u_{\\theta_j}}{2},</div>\n<p>则界面状态损失为：</p>\n<div class=\"kb-math kb-math-display\">L_{\\Gamma}^{\\mathrm{avg}}\n=\n\\frac{1}{N_\\Gamma}\\sum_{n=1}^{N_\\Gamma}\n\\left(\n\\left|u_{\\theta_i}(x_\\Gamma,t_n)-\\bar{u}_{ij}(x_\\Gamma,t_n)\\right|^2\n+\n\\left|u_{\\theta_j}(x_\\Gamma,t_n)-\\bar{u}_{ij}(x_\\Gamma,t_n)\\right|^2\n\\right).</div>\n<p>总目标可概括为：</p>\n<div class=\"kb-math kb-math-display\">L_{\\mathrm{cPINN}}\n=\n\\sum_i L_i^{\\mathrm{PINN}}\n+\n\\lambda_{\\Gamma}\n\\sum_{(i,j)}\n\\left(\nL_{\\Gamma_{ij}}^{\\mathrm{flux}}\n+\nL_{\\Gamma_{ij}}^{\\mathrm{avg}}\n\\right).</div>\n<div class=\"key-point\">💡 关键：cPINN 的守恒性不是靠训练后拼接结果得到的，而是在训练损失中直接约束相邻子域的物理通量。</div>\n<h5>机制拆解：局部容量、界面通信和并行优化</h5>\n<p>域分解给 cPINN 带来三个实际优势。第一，局部容量可调：在解存在冲击或复杂结构的子域使用更深/更宽网络，在平滑区域使用浅网络，减少全局网络被最困难区域拖累的问题。第二，残差点分配可调：可在界面、激波附近或高误差子域放置更多 collocation points。第三，训练可并行：每个子域内部的 PDE 残差和数据项互不依赖，只在界面损失上交换 <span class=\"kb-math kb-math-inline\">u</span>、<span class=\"kb-math kb-math-inline\">\\nabla u</span> 和通量。</p>\n<p>作者仓库中的 Burgers 四子域示例体现了这种结构：不同子域有独立网络，损失中同时包含子域数据项、PDE residual、界面 flux residual，以及两侧解接近平均值的项。代码中还使用 locally adaptive activation functions，让每个子域网络可以通过可学习斜率调节激活函数形状，加速局部收敛。</p>\n<h5>与 PINN、XPINN 的区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>域划分</th>\n<th>界面约束</th>\n<th>适用重点</th>\n<th>主要优势</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>PINN</td>\n<td>无，全局单网络</td>\n<td>无显式界面</td>\n<td>一般 PDE 正/反问题</td>\n<td>实现简单</td>\n</tr>\n<tr>\n<td>cPINN</td>\n<td>通常空间域分解</td>\n<td>通量连续 + 平均解约束</td>\n<td>非线性守恒律</td>\n<td>强化守恒、局部容量可调、并行友好</td>\n</tr>\n<tr>\n<td>XPINN</td>\n<td>空间-时间广义域分解</td>\n<td>解连续、残差等广义界面约束</td>\n<td>更一般 PDE 和复杂时空域</td>\n<td>分解更灵活</td>\n</tr>\n</tbody>\n</table></div>\n<p>cPINN 比 PINN 更像传统 finite-volume / domain-decomposition 思想和 PINN 的结合：每个子域内部用神经网络近似连续解，界面上用守恒通量把局部解耦合起来。相对 XPINN，cPINN 的约束更聚焦于守恒律通量，因此在双曲/粘性守恒律问题中更自然。</p>\n<h5>反问题中的用法</h5>\n<p>对于含未知参数 <span class=\"kb-math kb-math-inline\">\\lambda</span> 的守恒律：</p>\n<div class=\"kb-math kb-math-display\">u_t + \\nabla\\cdot \\mathbf{F}(u,\\nabla u;\\lambda)=0,</div>\n<p>cPINN 可把 <span class=\"kb-math kb-math-inline\">\\lambda</span> 作为可学习变量，与所有子域网络参数一起优化。界面通量项会同时约束 <span class=\"kb-math kb-math-inline\">\\lambda</span> 在不同子域上的一致性，降低局部网络只靠拟合数据而产生非物理参数的风险。实际使用时，若不同子域观测稀疏程度差异很大，仍需要调节数据项、残差项和界面项权重。</p>\n<h5>实用限制</h5>\n<p>cPINN 的效果依赖子域划分。如果界面正好穿过强不连续、冲击或观测稀疏区域，通量约束可能变得难优化；如果划分太细，界面项数量会增加，通信和权重调节成本也会上升。另一个限制是它主要为守恒律设计，通量形式不清晰的 PDE 需要重新设计界面条件。最后，多个局部网络提升了表达能力，但也增加了超参数搜索空间；实际训练中需要监控各子域损失和界面损失，避免某个子域或界面成为误差瓶颈。</p>",
      "quiz": {
        "q": "cPINN 中界面通量连续项的主要作用是什么？",
        "options": [
          "减少网络参数量，使所有子域共享同一组权重",
          "保证相邻子域在公共界面上的物理通量一致，避免非物理守恒量泄漏",
          "把 PDE 残差从强形式改写为弱形式积分",
          "只用于可视化子域边界，不参与训练"
        ],
        "answer": 1,
        "explain": "cPINN 的 conservative 特性来自界面通量约束；它让相邻子域的局部 PINN 解在守恒律意义下耦合，而不是训练后简单拼接。"
      }
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
      "summary": "XPINNs 把 PINN 从单一全域网络扩展为通用的空间-时间域分解框架：每个子域训练一个独立的物理信息子网络，再用接口上的解连续和 PDE 残差连续项把局部解拼接成全局解。它解决了 cPINN 主要面向守恒律、空间切分和较规则接口的问题，使任意复杂几何、时间切分、多尺度区域和并行训练都能纳入 PINN 家族。",
      "keyPoints": [
        "<strong>任意空间-时间域分解</strong>：可在空间、时间或空间-时间联合维度把计算域切成规则或不规则子域，不要求网格状切块。",
        "<strong>每个子域一套 PINN</strong>：子域 <span class=\"kb-math kb-math-inline\">\\Omega_q</span> 使用独立网络 <span class=\"kb-math kb-math-inline\">u_{\\theta_q}</span>，可按局部解复杂度配置不同层数、宽度、激活函数、采样密度和优化器。",
        "<strong>接口损失负责拼接</strong>：相邻子域接口 <span class=\"kb-math kb-math-inline\">\\Gamma_{q,q^+}</span> 上加入平均解连续 <span class=\"kb-math kb-math-inline\">MSE_{uavg}</span> 与残差连续 <span class=\"kb-math kb-math-inline\">MSE_R</span>，让信息跨子域传播。",
        "<strong>比 cPINN 更通用</strong>：cPINN 依赖守恒律的通量连续；XPINNs 的核心接口项只依赖 PDE 残差和自动微分，因此可用于非守恒律、稳态/非稳态、正问题/反问题。",
        "<strong>支持复杂几何与移动接口</strong>：接口条件不需要显式法向量，降低了高维复杂边界、非凸域和动态接口问题的实现复杂度。",
        "<strong>天然并行与局部自适应</strong>：子域内部残差计算可并行，只有接口点需要交换网络输出和残差；困难区域可部署更深网络或更多残差点。"
      ],
      "detail": "<h5>来源与核心图示</h5>\n<p>论文 arXiv 页面为 <code>https://arxiv.org/abs/2005.05653</code>，会议版 PDF 可通过 CEUR-WS 访问：<code>https://ceur-ws.org/Vol-2964/article_60.pdf</code>。下图来自 Semantic Scholar 对论文 Figure 1 的公开图像索引，展示 XPINN 子网和不规则 X-shaped 域分解。</p>\n<p><img alt=\"XPINNs 子域网络与接口示意图\" src=\"https://figures.semanticscholar.org/78f0649ee879d97e73d492eaf76d3f5dfc554ba0/8-Figure1-1.png\" />\n<em>图：上半部分是在单个子域内的 PINN 子网与物理残差计算；下半部分展示不规则子域，每个子域部署一个 Sub-Net，并通过接口条件连接。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># XPINNs 训练流程伪代码\n# 输入: PDE 算子 F, 分解后的子域 {Omega_q}, 边界/初值/观测点, 接口点\nsubdomains = decompose_space_time_domain(Omega, mode=&quot;arbitrary&quot;)\nmodels = {q: PINN(config_for_subdomain(q)) for q in subdomains}\n\nfor step in range(num_steps):\n    total_loss = 0.0\n\n    for q, model_q in models.items():\n        x_u, y_u = sample_data_or_bc_ic(q)\n        x_f = sample_residual_points(q)\n\n        u_q = model_q(x_u)\n        mse_u = mean((u_q - y_u) ** 2)\n\n        r_q = pde_residual(model_q, x_f)       # F[u_theta_q](x_f), via AD\n        mse_f = mean(r_q ** 2)\n\n        loss_q = W_u[q] * mse_u + W_f[q] * mse_f\n\n        for p in neighbors(q):\n            x_i = sample_interface_points(q, p)\n\n            u_left = models[q](x_i)\n            u_right = models[p](x_i)\n            u_avg = 0.5 * (u_left + u_right)\n\n            r_left = pde_residual(models[q], x_i)\n            r_right = pde_residual(models[p], x_i)\n\n            mse_uavg = mean((u_left - u_avg) ** 2)\n            mse_residual = mean((r_left - r_right) ** 2)\n\n            # 可按 PDE 类型额外加入通量连续或 C^k 导数连续\n            loss_q += W_i[q] * mse_uavg + W_if[q] * mse_residual\n\n        total_loss += loss_q\n\n    optimizer.zero_grad()\n    total_loss.backward()\n    optimizer.step()\n</code></pre>\n<h5>方法机制解释</h5>\n<p>标准 PINN 用一个全局神经网络 <span class=\"kb-math kb-math-inline\">u_\\theta(\\mathbf{x})</span> 近似全域解，并最小化数据/边界项与 PDE 残差项：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{PINN}\n= W_u MSE_u + W_F MSE_F,\\qquad\nMSE_F=\\frac{1}{N_F}\\sum_{i=1}^{N_F}\n\\left|\\mathcal{F}[u_\\theta](\\mathbf{x}^{(i)}_F)\\right|^2.</div>\n<p>这种全局单网络在简单光滑问题上有效，但在复杂几何、多尺度解、局部陡峭区域或不同物理区域并存时会变得难训：同一个网络既要拟合平滑区域，又要表达局部高频/间断结构，残差点也很难一次性分配合理。cPINN 已经把域分解引入 PINN，但其接口设计主要服务于守恒律中的通量连续。XPINNs 的关键扩展是把域分解抽象为通用机制：只要能在每个子域上用自动微分计算 PDE 残差，就可以用接口约束把子网络连接起来。</p>\n<p>令全域被分解成 <span class=\"kb-math kb-math-inline\">N_{sd}</span> 个非重叠子域 <span class=\"kb-math kb-math-inline\">\\Omega_q</span>，第 <span class=\"kb-math kb-math-inline\">q</span> 个子域的网络为：</p>\n<div class=\"kb-math kb-math-display\">u_{\\theta_q}(\\mathbf{z}) = N_L(\\mathbf{z};\\theta_q),\\qquad\n\\mathbf{z}\\in\\Omega_q,\\quad q=1,\\ldots,N_{sd}.</div>\n<p>全局解可理解为局部解的拼接：</p>\n<div class=\"kb-math kb-math-display\">u_{\\theta}(\\mathbf{z})\n=\\sum_{q=1}^{N_{sd}} u_{\\theta_q}(\\mathbf{z})\\,\\mathbf{1}_{\\Omega_q}(\\mathbf{z}),</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\mathbf{1}_{\\Omega_q}</span> 在子域内部取 1，在外部取 0；在公共接口上可按相交子域数量归一化。这个表示让每个子域拥有自己的表达能力和训练点分布，避免一个网络承担所有局部复杂性。</p>\n<p>对第 <span class=\"kb-math kb-math-inline\">q</span> 个子域，XPINNs 的前向问题损失写作：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{J}(\\theta_q)=\nW_{u_q}MSE_{u_q}\n+W_{F_q}MSE_{F_q}\n+W_{I_q}MSE_{uavg}\n+W_{IF_q}MSE_R\n+\\text{optional interface terms}.</div>\n<p>前两项与普通 PINN 相同：</p>\n<div class=\"kb-math kb-math-display\">MSE_{u_q}\n=\\frac{1}{N_{u_q}}\\sum_i\n\\left|u^{(i)}-u_{\\theta_q}(\\mathbf{x}^{(i)}_{u_q})\\right|^2,</div>\n<div class=\"kb-math kb-math-display\">MSE_{F_q}\n=\\frac{1}{N_{F_q}}\\sum_i\n\\left|\\mathcal{F}[u_{\\theta_q}](\\mathbf{x}^{(i)}_{F_q})\\right|^2.</div>\n<p>真正的新增部分是接口条件。对相邻子域 <span class=\"kb-math kb-math-inline\">q</span> 和 <span class=\"kb-math kb-math-inline\">q^+</span>，接口平均解为：</p>\n<div class=\"kb-math kb-math-display\">u_{avg}(\\mathbf{x})\n=\\frac{u_{\\theta_q}(\\mathbf{x})+u_{\\theta_{q^+}}(\\mathbf{x})}{2},\n\\qquad \\mathbf{x}\\in\\Gamma_{q,q^+}.</div>\n<p>XPINNs 让每一侧的解贴近该平均值，并让两侧 PDE 残差一致：</p>\n<div class=\"kb-math kb-math-display\">MSE_{uavg}\n=\\sum_{q^+}\\frac{1}{N_{I_q}}\\sum_i\n\\left|u_{\\theta_q}(\\mathbf{x}^{(i)}_{I_q})-u_{avg}(\\mathbf{x}^{(i)}_{I_q})\\right|^2,</div>\n<div class=\"kb-math kb-math-display\">MSE_R\n=\\sum_{q^+}\\frac{1}{N_{I_q}}\\sum_i\n\\left|\n\\mathcal{F}[u_{\\theta_q}](\\mathbf{x}^{(i)}_{I_q})\n-\\mathcal{F}[u_{\\theta_{q^+}}](\\mathbf{x}^{(i)}_{I_q})\n\\right|^2.</div>\n<div class=\"key-point\">💡 关键：<span class=\"kb-math kb-math-inline\">MSE_{uavg}</span> 主要保证 <span class=\"kb-math kb-math-inline\">C^0</span> 意义下的解连续；<span class=\"kb-math kb-math-inline\">MSE_R</span> 让相邻子域在接口处满足同一个 PDE 残差结构。两者合起来既传递数值信息，又传递物理约束。</div>\n<p>这种设计带来的优势不是简单“把网络拆小”。第一，每个子网络只学习局部函数，困难区域可以用更深/更宽网络、更多残差点或不同激活函数，平滑区域可保持轻量。第二，子域内部训练几乎独立，适合多 GPU/多进程并行；接口通信只发生在 <span class=\"kb-math kb-math-inline\">\\Gamma_{q,q^+}</span> 上。第三，接口残差项不需要法向通量，因此比 cPINN 更容易用于非守恒 PDE、复杂曲面接口或动态接口。</p>\n<p>反问题也能自然处理。如果 PDE 中含未知参数 <span class=\"kb-math kb-math-inline\">\\lambda</span>，只需把 <span class=\"kb-math kb-math-inline\">\\lambda</span> 放入优化变量集合，残差变为 <span class=\"kb-math kb-math-inline\">\\mathcal{F}[u_{\\theta_q};\\lambda]</span>，接口和子域损失的结构保持不变。因此 XPINNs 的本质不是更换 PINN 的自动微分物理监督，而是把一个全局物理优化问题改写成多个局部优化问题加接口协调条件。</p>",
      "quiz": {
        "q": "XPINNs 相比 cPINN 和普通 PINN 的关键扩展是什么？",
        "options": [
          "只把全域残差点数量增加到原来的数倍",
          "用多个子域 PINN 和接口上的平均解连续、残差连续项拼接任意空间-时间域",
          "把所有 PDE 改写成守恒律并强制法向通量连续",
          "取消 PDE 残差项，只使用边界数据监督"
        ],
        "answer": 1,
        "explain": "XPINNs 的核心是通用域分解：每个子域有独立 PINN，接口用解连续和 PDE 残差连续连接；这使其不局限于守恒律或规则空间切分。"
      }
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
      "summary": "gPINN 在标准 PINN 的 PDE 残差损失之外，额外惩罚残差对输入坐标的梯度，使网络不仅在配点处满足方程，也让残差场在局部邻域内更平滑地接近零。它主要解决标准 PINN 在训练点稀疏、解存在陡峭梯度或反问题参数敏感时精度不足的问题。",
      "keyPoints": [
        "<strong>残差梯度增强</strong>：对 PDE residual <span class=\"kb-math kb-math-inline\">f(\\mathbf{x})</span> 加入 <span class=\"kb-math kb-math-inline\">\\partial f/\\partial x_i</span> 的平方损失，使 <span class=\"kb-math kb-math-inline\">\\nabla f(\\mathbf{x})</span> 也趋近于零。",
        "<strong>不需要额外标签</strong>：梯度项完全由 PDE residual 和自动微分产生，不要求观测解的梯度数据。",
        "<strong>正反问题统一</strong>：未知 PDE 参数 <span class=\"kb-math kb-math-inline\">\\lambda</span> 可与网络参数 <span class=\"kb-math kb-math-inline\">\\theta</span> 一起优化，残差梯度同样参与参数辨识。",
        "<strong>训练点更“密集”</strong>：每个 collocation point 同时约束 residual 值和 residual 局部变化率，相当于提升物理约束的信息密度。",
        "<strong>可与 RAR 结合</strong>：论文把 gPINN 与 residual-based adaptive refinement 组合，在残差最大的候选区域不断加入配点，适合 shock-like 或过渡层问题。",
        "<strong>代价是高阶自动微分</strong>：若 PDE 已包含高阶导数，<span class=\"kb-math kb-math-inline\">\\partial f/\\partial x_i</span> 会引入更高阶导数，训练时间和显存开销上升。"
      ],
      "detail": "<h5>来源与核心图示</h5>\n<p>论文公开版本为 <code>https://arxiv.org/abs/2111.02801</code>，ar5iv 渲染页面提供了可访问图像。原文没有单独的架构总览图，下面用论文实验图展示 gPINN 的核心效果：残差梯度项能同时改善解、导数和 residual 的误差；与 RAR 结合时能把训练点集中到陡峭区域。</p>\n<p><img alt=\"gPINN 在 Poisson 方程中的精度对比\" src=\"https://ar5iv.labs.arxiv.org/html/2111.02801/assets/figs/Fig3.2.1.png\" />\n<em>图：一维 Poisson 方程中，gPINN 在标准 residual 之外加入 residual gradient 约束，比较不同权重下 <span class=\"kb-math kb-math-inline\">u</span>、<span class=\"kb-math kb-math-inline\">u&#x27;</span> 和 residual 的误差。</em></p>\n<p><img alt=\"gPINN with RAR 的自适应加点\" src=\"https://ar5iv.labs.arxiv.org/html/2111.02801/assets/figs/Fig3.4.1.2.png\" />\n<em>图：gPINN 与 RAR 结合，在 Burgers 方程陡峭区域附近持续加入高残差点。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># gPINN + RAR 训练伪代码\n# 输入: PDE residual f[u_theta](x), 边界/初值/观测点, 初始 residual points\nu_theta = NeuralSurrogate()\nTf = initial_collocation_points()\nTb = boundary_or_initial_points()\nTi = observation_points_if_inverse_problem()\n\nfor rar_round in range(max_rar_rounds):\n    for step in range(train_steps):\n        f = pde_residual(u_theta, Tf)          # f(x; u, du, d2u, ..., lambda)\n        loss_f = mean(abs(f) ** 2)\n        loss_b = boundary_loss(u_theta, Tb)\n        loss_i = data_loss(u_theta, Ti)        # 反问题或有观测数据时使用\n\n        loss_g = 0.0\n        for coord in coordinates:              # x, y, t, ...\n            df_dcoord = auto_diff(f, coord)\n            loss_g += w_g[coord] * mean(abs(df_dcoord) ** 2)\n\n        loss = w_f * loss_f + w_b * loss_b + w_i * loss_i + loss_g\n        theta, lambda_ = optimizer_step(loss, theta, lambda_)\n\n    candidates = sample_many_points(domain)\n    candidate_residual = abs(pde_residual(u_theta, candidates))\n    Tf.add(top_m_points(candidates, candidate_residual))\n    if mean(candidate_residual) &lt; tolerance:\n        break\n</code></pre>\n<h5>方法机制解释</h5>\n<p>标准 PINN 从一个一般 PDE residual 出发：</p>\n<div class=\"kb-math kb-math-display\">f\\left(\\mathbf{x};\n\\frac{\\partial u}{\\partial x_1},\\ldots,\n\\frac{\\partial^2 u}{\\partial x_i\\partial x_j},\\ldots;\n\\boldsymbol{\\lambda}\\right)=0,\\qquad \\mathbf{x}\\in\\Omega.</div>\n<p>用神经网络 <span class=\"kb-math kb-math-inline\">\\hat{u}(\\mathbf{x};\\theta)</span> 近似解，并用自动微分计算 <span class=\"kb-math kb-math-inline\">f</span>。基础 PINN 损失通常写为：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{PINN}\n=w_f\\mathcal{L}_f+w_b\\mathcal{L}_b+w_i\\mathcal{L}_i,</div>\n<p>其中</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_f(\\theta;\\mathcal{T}_f)\n=\\frac{1}{|\\mathcal{T}_f|}\n\\sum_{\\mathbf{x}\\in\\mathcal{T}_f}\n\\left|\nf\\left(\\mathbf{x};\\hat{u},\\partial\\hat{u},\\ldots;\\boldsymbol{\\lambda}\\right)\n\\right|^2.</div>\n<p><span class=\"kb-math kb-math-inline\">\\mathcal{L}_b</span> 约束边界/初值条件，<span class=\"kb-math kb-math-inline\">\\mathcal{L}_i</span> 用于反问题中的观测数据。标准 PINN 的弱点在于：它只在有限配点上压低 <span class=\"kb-math kb-math-inline\">f</span>，两个配点之间的 residual 可能剧烈变化，特别是在解存在陡峭梯度、边界层或 shock-like 结构时，均匀采样很容易漏掉困难区域。</p>\n<p>gPINN 的核心观察很直接：如果 PDE residual 在整个区域内应为零，那么它对任意输入方向的导数也应为零：</p>\n<div class=\"kb-math kb-math-display\">\\nabla f(\\mathbf{x})\n=\\left(\n\\frac{\\partial f}{\\partial x_1},\n\\frac{\\partial f}{\\partial x_2},\n\\ldots,\n\\frac{\\partial f}{\\partial x_d}\n\\right)=\\mathbf{0}.</div>\n<p>因此总损失扩展为：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{gPINN}\n=w_f\\mathcal{L}_f+w_b\\mathcal{L}_b+w_i\\mathcal{L}_i\n+\\sum_{j=1}^{d}w_{g_j}\\mathcal{L}_{g_j},</div>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{g_j}(\\theta;\\mathcal{T}_{g_j})\n=\\frac{1}{|\\mathcal{T}_{g_j}|}\n\\sum_{\\mathbf{x}\\in\\mathcal{T}_{g_j}}\n\\left|\\frac{\\partial f}{\\partial x_j}(\\mathbf{x})\\right|^2.</div>\n<p>这个设计的直觉是：普通 PINN 让 residual 的“高度”在采样点接近 0，而 gPINN 还让 residual 的“斜率”接近 0。于是一个配点不再只是一个孤立约束，而是对其局部邻域也产生平滑约束，从而在稀疏数据条件下减少 residual 场的隐藏振荡。</p>\n<p>以一维 Poisson 方程为例，如果 residual 为</p>\n<div class=\"kb-math kb-math-display\">f(x)=\\frac{d^2\\hat{u}}{dx^2}-s(x),</div>\n<p>那么 gPINN 额外约束</p>\n<div class=\"kb-math kb-math-display\">\\frac{df}{dx}\n=\\frac{d^3\\hat{u}}{dx^3}-\\frac{ds}{dx},\n\\qquad\n\\mathcal{L}_{g}\n=w_g\\frac{1}{|\\mathcal{T}_g|}\n\\sum_{x\\in\\mathcal{T}_g}\\left|\n\\frac{d^3\\hat{u}}{dx^3}-\\frac{ds}{dx}\n\\right|^2.</div>\n<p>这说明 gPINN 的精度提升并非免费：若 PDE residual 已经包含二阶导数，梯度增强会要求三阶自动微分；二维或三维问题还要对每个坐标方向分别求导，计算图更深、显存压力更大。</p>\n<div class=\"warn-box\">⚠️ 注意：gPINN 的“梯度增强”通常监督的是 PDE residual 的梯度，不是直接监督真实解的梯度。除非问题本身有梯度观测数据，否则它不额外引入人工标签。</div>\n<p>论文还强调 gPINN 与 RAR 的互补性。RAR 先在当前配点上训练模型，再在大量候选点上评估 residual，把 residual 最大的点加入训练集；gPINN 则让每个点的物理约束更强。两者结合时，RAR 负责把点放到困难区域，gPINN 负责在这些点周围压低 residual 变化率，因此对 Burgers、Allen-Cahn 等有陡峭过渡的 PDE 更有效。</p>\n<p>权重 <span class=\"kb-math kb-math-inline\">w_{g_j}</span> 是新增超参数。若权重太小，梯度项贡献有限；若过大，优化器可能过度追求 residual 平滑而牺牲边界/数据项或基础 residual 项。实际使用中通常从与 <span class=\"kb-math kb-math-inline\">w_f</span> 同量级或更小的权重开始，并结合验证误差、边界误差和 residual 分布调参。</p>",
      "quiz": {
        "q": "gPINN 相比标准 PINN 的核心新增损失是什么？",
        "options": [
          "只增加更多边界条件采样点",
          "加入 PDE residual 对输入坐标的梯度损失，使 \\(\\partial f/\\partial x_j\\) 也趋近于零",
          "把 PDE residual 替换为纯数据监督误差",
          "用卷积层代替自动微分"
        ],
        "answer": 1,
        "explain": "gPINN 的主要贡献是把 residual gradient 嵌入损失函数；如果 residual 在整个区域为零，它的空间/时间梯度也应为零。"
      }
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
      "summary": "SA-PINN 把每个初值点、边界点和 PDE 残差点的损失权重变成可训练变量，并通过“网络参数最小化、注意力权重最大化”的鞍点优化，让模型自动关注难拟合区域。它解决了标准 PINN 在 stiff PDE、尖锐时空过渡和损失项不平衡时容易忽视局部高误差点的问题。",
      "keyPoints": [
        "<strong>逐点软注意力权重</strong>：不是给整个 residual loss 一个标量权重，而是给每个训练点分配单独的非负 self-adaptive weight。",
        "<strong>最小-最大训练目标</strong>：网络参数 <span class=\"kb-math kb-math-inline\">\\theta</span> 通过梯度下降减小误差，权重 <span class=\"kb-math kb-math-inline\">\\lambda</span> 通过梯度上升增大高误差点的惩罚，形成 saddle-point 优化。",
        "<strong>单调 mask 函数</strong>：用非负、可微、严格递增的 <span class=\"kb-math kb-math-inline\">m(\\lambda)</span> 作为软注意力 mask，保证误差越大的点越容易获得更高权重。",
        "<strong>无需手工指定困难区域</strong>：模型通过反向传播自行发现初值、边界或残差中的 stubborn spots，替代硬编码的区域加权。",
        "<strong>可扩展到 SGD</strong>：论文提出用 Gaussian Process regression 拟合连续自适应权重图，使 mini-batch 训练时也能给新采样点分配注意力权重。",
        "<strong>NTK 解释</strong>：自适应权重会改变 SA-PINN 的 empirical NTK，直观上可缓解不同损失项/训练点特征值尺度不均衡导致的训练失衡。"
      ],
      "detail": "<h5>来源与核心图示</h5>\n<p>论文公开版本为 <code>https://arxiv.org/abs/2009.04544</code>，arXiv HTML 页面提供可访问图像：<code>https://arxiv.org/html/2009.04544v5</code>。下图展示 self-adaptive mask 的形状；这些 mask 是非负、单调递增函数，用于把 trainable weight <span class=\"kb-math kb-math-inline\">\\lambda_i</span> 转换为训练点损失的乘法注意力。</p>\n<p><img alt=\"SA-PINN 软注意力 mask 函数示意\" src=\"https://ar5iv.labs.arxiv.org/html/2009.04544/assets/figs/mask_function-0.png\" />\n<em>图：SA-PINN 使用单调递增 mask <span class=\"kb-math kb-math-inline\">m(\\lambda)</span> 把可训练权重映射到每个训练点的损失系数。</em></p>\n<p><img alt=\"SA-PINN 在 Allen-Cahn 方程中学到的权重分布\" src=\"https://ar5iv.labs.arxiv.org/html/2009.04544/assets/figs/weight_plots.png\" />\n<em>图：较亮/较大的点表示更高自适应权重，模型会把注意力集中到解的尖锐过渡和高误差区域。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># SA-PINN 训练伪代码\n# 输入: 初值点 T0, 边界点 Tb, 残差点 Tr, PDE residual f_theta\ntheta = initialize_network()\nlambda_0 = initialize_positive_weights(T0)\nlambda_b = initialize_positive_weights(Tb)\nlambda_r = initialize_positive_weights(Tr)\n\nfor step in range(num_steps):\n    u0_error = u_theta(T0.x, T0.t, theta) - T0.u\n    ub_error = boundary_error(u_theta, Tb, theta)\n    r_error = pde_residual(u_theta, Tr, theta)\n\n    loss_0 = mean(mask(lambda_0) * abs(u0_error) ** 2)\n    loss_b = mean(mask(lambda_b) * abs(ub_error) ** 2)\n    loss_r = mean(mask(lambda_r) * abs(r_error) ** 2)\n    loss = loss_0 + loss_b + loss_r\n\n    # 网络参数: 梯度下降，降低带权误差\n    theta = theta - eta_theta * grad(loss, theta)\n\n    # 自适应权重: 梯度上升，提高高误差点的惩罚\n    lambda_0 = lambda_0 + eta_0 * grad(loss, lambda_0)\n    lambda_b = lambda_b + eta_b * grad(loss, lambda_b)\n    lambda_r = lambda_r + eta_r * grad(loss, lambda_r)\n\n    lambda_0, lambda_b, lambda_r = project_or_parameterize_nonnegative(\n        lambda_0, lambda_b, lambda_r\n    )\n</code></pre>\n<h5>方法机制解释</h5>\n<p>标准连续时间 PINN 通常把 PDE、初值和边界条件写成联合损失：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{PINN}(\\theta)\n=\\mathcal{L}_r(\\theta)+\\mathcal{L}_b(\\theta)+\\mathcal{L}_0(\\theta),</div>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_r\n=\\frac{1}{N_r}\\sum_{i=1}^{N_r}\n\\left|f_\\theta(\\mathbf{x}_r^{(i)},t_r^{(i)})\\right|^2,\\quad\n\\mathcal{L}_0\n=\\frac{1}{N_0}\\sum_{i=1}^{N_0}\n\\left|u_\\theta(\\mathbf{x}_0^{(i)},0)-u_0^{(i)}\\right|^2.</div>\n<p>这种写法假设同一损失项内的所有点同等重要，也常常只用少量全局超参数平衡 residual、boundary、initial 三类损失。对 Allen-Cahn、wave、advection 等含尖锐时空变化的问题，高误差点可能只占训练集的一小部分；平均损失会把这些 stubborn spots 淹没，导致网络优先拟合大面积平滑区域。</p>\n<p>SA-PINN 的改动是把每个训练点的损失系数变成可训练变量。令 <span class=\"kb-math kb-math-inline\">\\lambda_r,\\lambda_b,\\lambda_0</span> 分别表示残差点、边界点和初值点的自适应权重，并用单调递增 mask <span class=\"kb-math kb-math-inline\">m(\\lambda)</span> 保证权重非负，则损失可写作：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}(\\theta,\\lambda_r,\\lambda_b,\\lambda_0)\n=\\mathcal{L}_r^{SA}+\\mathcal{L}_b^{SA}+\\mathcal{L}_0^{SA},</div>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_r^{SA}\n=\\frac{1}{N_r}\\sum_{i=1}^{N_r}\nm(\\lambda_r^{(i)})\n\\left|f_\\theta(\\mathbf{x}_r^{(i)},t_r^{(i)})\\right|^2,</div>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_b^{SA}\n=\\frac{1}{N_b}\\sum_{i=1}^{N_b}\nm(\\lambda_b^{(i)})\n\\left|\\mathcal{B}[u_\\theta](\\mathbf{x}_b^{(i)},t_b^{(i)})-g_b^{(i)}\\right|^2,</div>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_0^{SA}\n=\\frac{1}{N_0}\\sum_{i=1}^{N_0}\nm(\\lambda_0^{(i)})\n\\left|u_\\theta(\\mathbf{x}_0^{(i)},0)-u_0^{(i)}\\right|^2.</div>\n<p>训练目标不是同时最小化所有变量，而是寻找鞍点：</p>\n<div class=\"kb-math kb-math-display\">\\min_{\\theta}\\max_{\\lambda_r,\\lambda_b,\\lambda_0}\n\\mathcal{L}(\\theta,\\lambda_r,\\lambda_b,\\lambda_0).</div>\n<p>对应更新为：</p>\n<div class=\"kb-math kb-math-display\">\\theta^{k+1}=\\theta^k-\\eta_\\theta\\nabla_\\theta \\mathcal{L},</div>\n<div class=\"kb-math kb-math-display\">\\lambda_r^{k+1}=\\lambda_r^k+\\eta_r\\nabla_{\\lambda_r}\\mathcal{L},\\qquad\n\\lambda_b^{k+1}=\\lambda_b^k+\\eta_b\\nabla_{\\lambda_b}\\mathcal{L},\\qquad\n\\lambda_0^{k+1}=\\lambda_0^k+\\eta_0\\nabla_{\\lambda_0}\\mathcal{L}.</div>\n<p>为什么梯度上升会自动关注困难点？以 residual 点为例：</p>\n<div class=\"kb-math kb-math-display\">\\frac{\\partial \\mathcal{L}_r^{SA}}{\\partial \\lambda_r^{(i)}}\n=\\frac{1}{N_r}m&#x27;(\\lambda_r^{(i)})\n\\left|f_\\theta(\\mathbf{x}_r^{(i)},t_r^{(i)})\\right|^2.</div>\n<p>由于 <span class=\"kb-math kb-math-inline\">m&#x27;(\\lambda)\\ge 0</span>，误差越大的点给 <span class=\"kb-math kb-math-inline\">\\lambda_i</span> 的上升梯度越大；而 <span class=\"kb-math kb-math-inline\">\\lambda_i</span> 上升后，下一轮该点的损失权重 <span class=\"kb-math kb-math-inline\">m(\\lambda_i)</span> 更大，迫使网络参数更新时更重视该点。这就是“软注意力”的含义：它不是离散选择一个区域，而是连续地放大难点的惩罚。</p>\n<div class=\"key-point\">💡 关键：SA-PINN 的自适应发生在训练点粒度，而不是损失项粒度。传统加权可能只把 <span class=\"kb-math kb-math-inline\">\\mathcal{L}_r</span> 整体乘以一个标量；SA-PINN 可以在同一个 residual loss 内区分平滑区域和尖锐过渡区域。</div>\n<p>论文还把这种训练解释为带可训练 penalty coefficient 的 PDE-constrained optimization。若某个点违反初值、边界或 PDE 约束，它的 penalty 会单调增大；当网络把该点误差压低后，权重继续增大带来的梯度会减弱，因为误差平方项已经变小。这样形成一个动态过程：权重不断寻找当前最难满足的约束，网络不断补偿这些约束。</p>\n<p>为了使用 mini-batch SGD，SA-PINN 还提出连续自适应权重图。离散训练点上的 <span class=\"kb-math kb-math-inline\">\\lambda_i</span> 可通过 Gaussian Process regression 插值到整个时空域，得到 <span class=\"kb-math kb-math-inline\">\\lambda(\\mathbf{x},t)</span>。当下一批采样点变化时，模型可以从 GP 权重图预测这些新点的 self-adaptive weight，而不必为每个可能采样点维护固定参数。这对大规模 PDE 或需要随机采样的训练尤其重要。</p>\n<p>NTK 分析提供了另一种直觉。标准 PINN 的不同损失项可能对应尺度差异很大的 NTK 特征值，导致某些约束训练很慢；逐点 self-adaptive weights 会非线性改变 empirical NTK 中各点的贡献，论文观察到其能使不同损失项的特征值尺度更匹配。实际理解时，可以把 SA-PINN 看作一种由误差驱动的、细粒度的动态损失预条件器。</p>",
      "quiz": {
        "q": "SA-PINN 中自适应权重为什么要对 \\(\\lambda\\) 做梯度上升？",
        "options": [
          "为了减少网络参数数量",
          "为了让高误差训练点的权重增大，迫使网络优先修正难点",
          "为了取消边界条件损失",
          "为了把自动微分替换成有限差分"
        ],
        "answer": 1,
        "explain": "SA-PINN 对网络参数做梯度下降、对逐点权重做梯度上升。由于权重梯度与该点误差平方成正比，高误差点会获得更大惩罚，形成软注意力。"
      }
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
      "summary": "lbPINN 将 PINN 的 PDE、边界、初值和观测数据损失解释为带噪声的高斯似然项，通过联合学习每个损失项的噪声尺度 \\(\\varepsilon_i\\) 自动决定权重，解决手工调参难以平衡多目标物理损失的问题。",
      "keyPoints": [
        "<strong>来源修正</strong>：任务 YAML 中的 <code>2104.06120</code> 指向无关量子代数论文；本文方法级解读基于可访问的 lbPINN 论文 <code>arXiv:2104.06217</code> 及 ar5iv HTML",
        "<strong>概率化损失权重</strong>：为每个损失项建立高斯观测模型，噪声尺度 <span class=\"kb-math kb-math-inline\">\\varepsilon_i</span> 同时承担不确定性估计和损失权重的角色",
        "<strong>最大似然推导</strong>：负对数似然给出 <span class=\"kb-math kb-math-inline\">\\frac{1}{2\\varepsilon_i^2}\\mathcal{L}_i+\\log\\varepsilon_i</span>，避免权重无限变小或变大",
        "<strong>联合优化</strong>：网络参数 <span class=\"kb-math kb-math-inline\">\\theta</span> 和噪声集合 <span class=\"kb-math kb-math-inline\">\\varepsilon=\\{\\varepsilon_f,\\varepsilon_b,\\varepsilon_i,\\varepsilon_d\\}</span> 在训练中同步更新",
        "<strong>面向不可压 Navier-Stokes</strong>：实验覆盖二维稳态 Kovasznay 流、二维非定常圆柱绕流、三维非定常 Beltrami 流",
        "<strong>鲁棒性检验</strong>：论文比较不同初始噪声配置，发现最终噪声和权重会收敛到相近范围，说明方法对初始化不敏感",
        "<strong>与固定权重 PINN 的区别</strong>：固定权重需要人工搜索，lbPINN 把权重选择变成可学习的统计参数估计问题"
      ],
      "detail": "<h5>核心架构示意</h5>\n<p><img alt=\"lbPINN 自适应损失平衡示意图\" src=\"https://ar5iv.labs.arxiv.org/html/2104.06217/assets/figure/lbPINN.jpg\" />\n<em>图：lbPINN 在普通 PINN 的 PDE/边界/初值/数据损失之上引入噪声参数 <span class=\"kb-math kb-math-inline\">\\varepsilon_i</span>，用似然目标自适应调节各项权重。</em></p>\n<blockquote>\n<p>来源说明：任务提供的 <code>https://arxiv.org/abs/2104.06120</code> 与 lbPINN 不匹配；可访问论文来源为 <code>https://arxiv.org/abs/2104.06217</code>，图示来自其 ar5iv HTML 页面。</p>\n</blockquote>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># lbPINN 自适应似然损失训练伪代码\n# 输入: PDE/边界/初值/数据采样点, PINN 网络 u_theta, 初始噪声 eps_i &gt; 0\n# 输出: 网络参数 theta 与每个损失项的自适应权重\n\ntheta = initialize_network()\nlog_eps = initialize_log_noise([&quot;pde&quot;, &quot;bc&quot;, &quot;ic&quot;, &quot;data&quot;])\n\nfor step in range(num_steps):\n    # 1. 标准 PINN 多目标损失\n    L_pde = mean_square(pde_residual(u_theta, collocation_points))\n    L_bc = mean_square(boundary_residual(u_theta, boundary_points))\n    L_ic = mean_square(initial_residual(u_theta, initial_points))\n    L_data = mean_square(u_theta(data_points) - observations)\n\n    # 2. 高斯负对数似然形式\n    eps = exp(log_eps)                         # 保证 eps_i &gt; 0\n    losses = [L_pde, L_bc, L_ic, L_data]\n    total = 0.0\n    for i, Li in enumerate(losses):\n        total += Li / (2 * eps[i] ** 2) + log_eps[i]\n\n    # 3. 同步更新网络与噪声参数\n    total.backward()\n    adam.step([theta, log_eps])\n\n    # 4. 可解释权重: 噪声越小, 惩罚越强\n    weights = [1 / (2 * e ** 2) for e in eps]\n</code></pre>\n<h5>动机与背景</h5>\n<p>普通 PINN 的训练目标通常是多个损失项的加权和：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}(\\theta)=\n\\omega_f\\mathcal{L}_f+\n\\omega_b\\mathcal{L}_b+\n\\omega_i\\mathcal{L}_i+\n\\omega_d\\mathcal{L}_d</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\mathcal{L}_f</span> 是 PDE 残差，<span class=\"kb-math kb-math-inline\">\\mathcal{L}_b</span> 是边界条件，<span class=\"kb-math kb-math-inline\">\\mathcal{L}_i</span> 是初值条件，<span class=\"kb-math kb-math-inline\">\\mathcal{L}_d</span> 是观测数据误差。问题在于这些损失项的量纲、数值范围和收敛速度不同，固定权重会让训练偏向某一类约束；例如 PDE 残差过大时可能牺牲边界条件，边界权重过大时又会降低域内物理解的准确性。</p>\n<p>lbPINN 的关键变化是把“权重调参”改写成“噪声估计”。假设某个约束项对应的观测满足高斯分布：</p>\n<div class=\"kb-math kb-math-display\">p(y\\mid \\hat{u}(x,t;\\theta))=\n\\mathcal{N}(\\hat{u}(x,t;\\theta),\\varepsilon^2)</div>\n<p>对该似然取负对数并忽略常数项，可得到：</p>\n<div class=\"kb-math kb-math-display\">-\\log p(y\\mid \\hat{u}) \\propto\n\\frac{1}{2\\varepsilon^2}\\left\\|y-\\hat{u}(x,t;\\theta)\\right\\|^2+\\log\\varepsilon</div>\n<p>推广到 PINN 的多个损失项：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{lb}(\\theta,\\varepsilon)=\n\\sum_{k}\n\\left(\n\\frac{1}{2\\varepsilon_k^2}\\mathcal{L}_k(\\theta)+\\log\\varepsilon_k\n\\right)</div>\n<p>这条公式同时完成两件事：<span class=\"kb-math kb-math-inline\">\\frac{1}{2\\varepsilon_k^2}</span> 是第 <span class=\"kb-math kb-math-inline\">k</span> 个损失的有效权重；<span class=\"kb-math kb-math-inline\">\\log\\varepsilon_k</span> 是正则项，防止模型通过把 <span class=\"kb-math kb-math-inline\">\\varepsilon_k</span> 任意放大来忽略该约束。</p>\n<h5>方法机制</h5>\n<p>如果某个损失项当前很难优化，模型可以通过增大 <span class=\"kb-math kb-math-inline\">\\varepsilon_k</span> 暂时降低它对总梯度的支配性；如果某个约束更可靠或需要更强约束，<span class=\"kb-math kb-math-inline\">\\varepsilon_k</span> 会变小，对应权重增大。论文用这种机制解释为同方差不确定性建模：不同物理目标的噪声尺度不同，训练过程应该让模型自己学习这些尺度。</p>\n<p>在 Navier-Stokes 场景中，网络输出速度和压力，自动微分构造连续性方程与动量方程残差。以简化符号表示，不可压缩约束可写为：</p>\n<div class=\"kb-math kb-math-display\">\\nabla\\cdot \\mathbf{u}=0,\\qquad\n\\partial_t\\mathbf{u}+(\\mathbf{u}\\cdot\\nabla)\\mathbf{u}\n+\\nabla p-\\frac{1}{Re}\\Delta\\mathbf{u}=0</div>\n<p>对应的 PDE 残差、边界约束、初值约束、数据拟合项分别进入 <span class=\"kb-math kb-math-inline\">\\mathcal{L}_{lb}</span>。训练时并不需要预先设定 <span class=\"kb-math kb-math-inline\">\\omega_f,\\omega_b,\\omega_i,\\omega_d</span>，而是学习 <span class=\"kb-math kb-math-inline\">\\varepsilon_f,\\varepsilon_b,\\varepsilon_i,\\varepsilon_d</span>。</p>\n<div class=\"key-point\">💡 关键：lbPINN 并不是改变 PINN 的网络结构，而是改变多目标损失的统计解释；任何已有 PINN 只要有多个损失项，都可以替换为这种似然平衡形式。</div>\n<h5>与传统 PINN 的区别</h5>\n<p>固定权重 PINN 的难点是权重搜索成本高，且最优权重随问题、采样点、训练阶段变化。lbPINN 把权重设为动态变量，且用 <span class=\"kb-math kb-math-inline\">\\log\\varepsilon_k</span> 形成内置约束，因此比简单的可训练权重更稳定。与 SA-PINN 的点级注意力不同，lbPINN 更偏向“损失项级别”的全局平衡，适合处理 PDE 残差、边界、初值、数据之间的竞争。</p>\n<p>实验中，论文报告了 Kovasznay 流、圆柱绕流和 Beltrami 流上的相对误差与收敛曲线，并展示不同初始噪声配置最终会收敛到相似权重范围。方法的局限也很清楚：噪声参数仍依赖梯度优化，理论上不能保证找到全局最优；当损失景观极端病态时，仍需要采样、网络结构或优化器配合。</p>",
      "quiz": {
        "q": "lbPINN 中噪声参数 ε_i 变小时，对应损失项会发生什么？",
        "options": [
          "该损失项权重降低，训练会忽略它",
          "该损失项权重提高，约束惩罚变强",
          "网络结构会增加一层隐藏层",
          "该损失项会从总损失中删除"
        ],
        "answer": 1,
        "explain": "lbPINN 的有效权重为 1/(2ε_i²)，因此 ε_i 越小，该项在总损失中的惩罚越强；log ε_i 项用于防止噪声尺度退化。"
      }
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
      "summary": "ReLoBRaLo 用各损失项的相对下降速度而不是绝对值或梯度范数来分配 PINN 权重，并通过指数平滑与随机回溯机制让训练周期性关注长期落后的物理约束。",
      "keyPoints": [
        "<strong>目标场景</strong>：解决 PINN 中 PDE、边界、初值、数据损失量纲不同、竞争关系强、固定权重难调的问题",
        "<strong>相对损失标准</strong>：根据 <span class=\"kb-math kb-math-inline\">\\mathcal{L}_i(t)/\\mathcal{L}_i(t&#x27;)</span> 衡量第 <span class=\"kb-math kb-math-inline\">i</span> 项从历史时刻到当前的进展，而不是直接比较损失绝对大小",
        "<strong>SoftAdapt 式归一化</strong>：用带温度 <span class=\"kb-math kb-math-inline\">\\mathcal{T}</span> 的 softmax 把每项相对进展转成有界权重，并乘以损失项数量 <span class=\"kb-math kb-math-inline\">m</span>",
        "<strong>随机回溯</strong>：引入 Bernoulli 变量 <span class=\"kb-math kb-math-inline\">\\rho</span>，有时回看初始损失 <span class=\"kb-math kb-math-inline\">\\mathcal{L}_i(0)</span>，避免模型只记住短期变化",
        "<strong>指数平滑</strong>：用 <span class=\"kb-math kb-math-inline\">\\alpha</span> 平滑权重变化，减少每一步损失空间剧烈扭曲",
        "<strong>无需梯度统计</strong>：相比 GradNorm 和 Learning Rate Annealing，不需要每个损失项单独反向传播，计算开销更低",
        "<strong>基准任务</strong>：在 Burgers 方程、Kirchhoff 板弯曲方程、Helmholtz 方程的正问题和反问题上验证"
      ],
      "detail": "<h5>核心图示与来源</h5>\n<p><img alt=\"PINN 多损失结构示意\" src=\"https://raw.githubusercontent.com/rbischof/relative_balancing/main/images/PINNS_Loss.png\" />\n<em>图：作者开源仓库中的 PINN 多损失结构图。ReLoBRaLo 作用于这些 PDE/边界/初值/数据损失项的权重分配。</em></p>\n<blockquote>\n<p>来源说明：论文 arXiv 页面可访问，TeX 源码中包含完整公式与实验图；作者仓库 <code>https://github.com/rbischof/relative_balancing</code> 提供可访问的图像与训练代码。</p>\n</blockquote>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># ReLoBRaLo 权重更新伪代码\n# 输入: m 个 PINN 损失 L_i, 温度 T, 指数平滑 alpha, 回溯概率 p=E[rho]\n# 输出: 动态权重 lambda_i\n\nlambda_prev = ones(m)\nL0 = evaluate_losses()\nL_prev = L0\n\nfor step in range(1, num_steps + 1):\n    L = evaluate_losses()  # [L_1(t), ..., L_m(t)]\n\n    def balanced_weights(reference_losses):\n        # 相对进展越差, softmax 权重越大\n        scores = [L[i] / (T * reference_losses[i] + eps) for i in range(m)]\n        return m * softmax(scores)\n\n    lambda_short = balanced_weights(L_prev)     # 看上一步\n    lambda_start = balanced_weights(L0)         # 看训练起点\n\n    rho = bernoulli(p)                          # rho=1 保留历史, rho=0 随机回溯\n    lambda_hist = rho * lambda_prev + (1 - rho) * lambda_start\n    lambda_t = alpha * lambda_hist + (1 - alpha) * lambda_short\n    lambda_t = stop_gradient(lambda_t)\n\n    total_loss = sum(lambda_t[i] * L[i] for i in range(m))\n    optimizer.step(total_loss)\n\n    lambda_prev = lambda_t\n    L_prev = L\n</code></pre>\n<h5>核心公式</h5>\n<p>ReLoBRaLo 从线性标量化的多目标 PINN 损失出发：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}(\\theta)=\\sum_{i=1}^{m}\\lambda_i\\mathcal{L}_i(\\theta)</div>\n<p>关键是如何更新 <span class=\"kb-math kb-math-inline\">\\lambda_i</span>。首先基于当前损失与某个历史时刻 <span class=\"kb-math kb-math-inline\">t&#x27;</span> 的相对比例计算候选权重：</p>\n<div class=\"kb-math kb-math-display\">\\lambda_i^{bal}(t,t&#x27;)=\nm\\cdot\n\\frac{\n\\exp\\left(\\frac{\\mathcal{L}_i(t)}\n{\\mathcal{T}\\mathcal{L}_i(t&#x27;)}\\right)\n}{\n\\sum_{j=1}^{m}\n\\exp\\left(\\frac{\\mathcal{L}_j(t)}\n{\\mathcal{T}\\mathcal{L}_j(t&#x27;)}\\right)\n}</div>\n<p>如果某一项相对下降慢，比例 <span class=\"kb-math kb-math-inline\">\\mathcal{L}_i(t)/\\mathcal{L}_i(t&#x27;)</span> 更大，softmax 会给它更高权重。温度 <span class=\"kb-math kb-math-inline\">\\mathcal{T}</span> 控制激进程度：<span class=\"kb-math kb-math-inline\">\\mathcal{T}</span> 越小，权重越接近“只关注最落后项”；<span class=\"kb-math kb-math-inline\">\\mathcal{T}</span> 越大，权重越接近均匀分配。</p>\n<p>然后用随机回溯混合历史权重与从初始损失计算出的权重：</p>\n<div class=\"kb-math kb-math-display\">\\lambda_i^{hist}(t)=\n\\rho\\lambda_i(t-1)+(1-\\rho)\\lambda_i^{bal}(t,0),\n\\qquad \\rho\\sim \\mathrm{Bernoulli}(\\mathbb{E}[\\rho])</div>\n<p>最后用指数衰减得到当前训练步的实际权重：</p>\n<div class=\"kb-math kb-math-display\">\\lambda_i(t)=\n\\alpha\\lambda_i^{hist}(t)+(1-\\alpha)\\lambda_i^{bal}(t,t-1)</div>\n<div class=\"key-point\">💡 关键：ReLoBRaLo 不是奖励“损失值大”的项，而是奖励“相对进展慢”的项，因此能在量纲不同的 PDE、边界、初值损失之间做更公平的比较。</div>\n<h5>方法机制</h5>\n<p>Learning Rate Annealing 依赖梯度统计，GradNorm 还需要额外优化权重；这两类方法在损失项数量很多时会引入明显计算开销。ReLoBRaLo 只读取损失值序列，避免为每个损失单独做反向传播，因此适合 Kirchhoff 这类含多条边界条件和高阶导数的 PINN。</p>\n<p>随机回溯是它区别于普通 SoftAdapt 的核心。只看 <span class=\"kb-math kb-math-inline\">t-1</span> 会导致模型容易忘记某些长期被牺牲的约束；只看初始点又可能太僵硬，阻碍局部适应。Bernoulli 回溯在二者之间折中：大多数时间跟随短期变化，偶尔根据训练初始状态重新审视谁真正落后。</p>\n<p>在 Burgers 方程中，损失通常包含 PDE 残差、左右边界和初值：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}=\n\\lambda_0\\mathcal{L}_\\Omega+\n\\lambda_1\\mathcal{L}_{\\Gamma_1}+\n\\lambda_2\\mathcal{L}_{\\Gamma_2}+\n\\lambda_3\\mathcal{L}_{\\Upsilon}</div>\n<p>其中</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_\\Omega=\n\\frac{1}{|\\hat{\\Omega}|}\\sum_{(x,t)\\in\\hat{\\Omega}}\n\\left\\|\n\\frac{\\partial U}{\\partial t}\n+U\\frac{\\partial U}{\\partial x}\n-\\nu\\frac{\\partial^2 U}{\\partial x^2}\n\\right\\|_2^2</div>\n<p>如果训练早期边界项下降很快、PDE 残差下降慢，ReLoBRaLo 会提高 PDE 项权重；如果后期边界项开始恶化，随机回溯能重新抬高边界项，而不是让网络只优化最显眼的 PDE 残差。</p>\n<h5>实验与局限</h5>\n<p>论文比较了 ReLoBRaLo、SoftAdapt、GradNorm、Learning Rate Annealing 和手工权重基线。ReLoBRaLo 在多个正/反问题上通常取得更好的精度，并且由于不依赖梯度统计，计算开销接近 SoftAdapt，明显低于 GradNorm 和 LR Annealing。论文也指出超参数仍然重要：<span class=\"kb-math kb-math-inline\">\\alpha</span> 决定记忆长度，<span class=\"kb-math kb-math-inline\">\\mathcal{T}</span> 决定权重分布尖锐度，<span class=\"kb-math kb-math-inline\">\\mathbb{E}[\\rho]</span> 决定随机回溯频率。Helmholtz 这类边界项容易被忽视的问题，需要更激进的温度和更频繁的回溯。</p>",
      "quiz": {
        "q": "ReLoBRaLo 中随机回溯参数 ρ 的主要作用是什么？",
        "options": [
          "随机删除一部分训练样本以减少过拟合",
          "偶尔用初始损失作为参照，提醒模型关注长期进展慢的损失项",
          "随机冻结网络层以降低计算量",
          "把所有损失权重固定为相同数值"
        ],
        "answer": 1,
        "explain": "ρ 是 Bernoulli 随机变量；当发生回溯时，权重根据 L_i(t)/L_i(0) 计算，可避免训练只关注短期损失变化。"
      }
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
      "summary": "Frozen-PINN 将时间依赖 PDE 的解表示为空间随机基函数与时间系数的组合，冻结隐藏层空间参数后用最小二乘和自适应 ODE 求解器推进输出层系数，从根源上绕开传统 PINN 的高维非凸梯度下降训练。",
      "keyPoints": [
        "<strong>空间-时间分离</strong>：用冻结的空间基 <span class=\"kb-math kb-math-inline\">\\phi_i(x)</span> 和随时间变化的输出系数 <span class=\"kb-math kb-math-inline\">c_i(t)</span> 表示解",
        "<strong>无梯度训练</strong>：隐藏层参数由 ELM 或 SWIM 采样得到，不通过反向传播优化",
        "<strong>时间因果性内置</strong>：把 PDE 代入 ansatz 后得到关于 <span class=\"kb-math kb-math-inline\">C(t)</span> 的 ODE，用 RK45/LSODA 等求解器顺序推进",
        "<strong>损失解耦</strong>：初值用最小二乘求 <span class=\"kb-math kb-math-inline\">C(0)</span>，边界条件通过边界兼容层或增强 ODE 处理，PDE 残差由 ODE 推进吸收",
        "<strong>SVD 压缩层</strong>：对基函数矩阵截断 SVD，降低 ODE 维度与刚性，论文报告最高可减少 20 倍维度、最高 75 倍加速",
        "<strong>采样策略两类</strong>：ELM 随机采样、SWIM 基于数据点对采样，后者能把陡峭基函数放到冲击或高梯度区域附近",
        "<strong>广泛基准</strong>：覆盖线性对流、Euler-Bernoulli、Wave、Burgers、非线性扩散、反应扩散、Kuramoto-Sivashinsky 和高维扩散等九类 PDE"
      ],
      "detail": "<h5>核心架构示意</h5>\n<p><img alt=\"Frozen-PINN 核心思想\" src=\"https://arxiv.org/html/2405.20836v3/x1.png\" />\n<em>图：Frozen-PINN 的两条核心思路：冻结空间基函数并演化输出层时间系数；将 PDE、边界和初值损失尽量分开处理。</em></p>\n<p><img alt=\"Frozen-PINN 完整训练架构\" src=\"https://arxiv.org/html/2405.20836v3/x4.png\" />\n<em>图：Frozen-PINN 无梯度训练流水线，包括随机/数据依赖基函数采样、边界兼容层、SVD 层、最小二乘初值和 ODE 求解。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># Frozen-PINN 训练伪代码\n# 输入: PDE 算子 L/N, 初值 u0, 边界条件, collocation points X\n# 输出: 测试网格上的 PDE 解 u_hat(x, t)\n\nX = sample_collocation_points(domain)\n\n# 1. 构造并冻结空间基函数\nif sampler == &quot;ELM&quot;:\n    W, b = sample_random_features()\nelse:  # SWIM\n    W, b = sample_features_from_point_pairs(X)\nPhi = activation(W @ X.T + b)                 # [M, Nc]\n\n# 2. 处理边界条件\nA = build_boundary_compliant_layer(Phi, boundary_condition)\nPhi_A = concat(A @ Phi, ones_row)\n\n# 3. SVD 压缩，降低 ODE 系统维度\nV_r, S_r, U_r = truncated_svd(A @ Phi, threshold=eps_svd)\nA_r = V_r.T @ A\nPhi_r = concat(A_r @ Phi, ones_row)\n\n# 4. 初值最小二乘，不做梯度下降\nC0 = u0(X).T @ pinv(Phi_r)\n\n# 5. 将 PDE 转成关于 C(t) 的 ODE 并推进\ndef rhs(t, C):\n    R = -C @ L(Phi_r) - gamma * N(C @ Phi_r) + f(X).T\n    return R @ pinv(Phi_r)\n\nC_t = ode_solve(rhs, C0, t_span, method=&quot;RK45_or_LSODA&quot;)\n\n# 6. 查询任意时刻的解\nu_hat = lambda x, t: C_t(t) @ Phi_r(x)\n</code></pre>\n<h5>核心公式</h5>\n<p>Frozen-PINN 先用单隐层随机特征表示时间依赖解：</p>\n<div class=\"kb-math kb-math-display\">\\hat{u}(x,t)=\\sum_{i=1}^{M}c_i(t)\\sigma(w_i\\cdot x+b_i)+c_0(t)\n=C(t)[\\Phi(x),\\mathbbm{1}]</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">w_i,b_i</span> 是空间相关参数，采样后冻结；真正随时间变化的是输出层系数 <span class=\"kb-math kb-math-inline\">C(t)</span>。这与传统 PINN 把 <span class=\"kb-math kb-math-inline\">(x,t)</span> 一起输入神经网络并对所有参数做梯度下降完全不同。</p>\n<p>把 ansatz 代入一般时间依赖 PDE，可得到关于 <span class=\"kb-math kb-math-inline\">C(t)</span> 的 ODE。论文给出的核心形式是：</p>\n<div class=\"kb-math kb-math-display\">C_t(t)=R(X,C(t))[\\Phi(X),\\mathbbm{1}]^{+}</div>\n<div class=\"kb-math kb-math-display\">R(X,C(t))=\n-C(t)\\mathcal{L}[\\Phi(X),\\mathbbm{1}]\n-\\gamma\\mathcal{N}(C(t)[\\Phi(X),\\mathbbm{1}])\n+[f(X)]^\\top</div>\n<p>这里 <span class=\"kb-math kb-math-inline\">(\\cdot)^+</span> 是伪逆，<span class=\"kb-math kb-math-inline\">\\mathcal{L}</span> 是线性空间微分算子，<span class=\"kb-math kb-math-inline\">\\mathcal{N}</span> 是非线性项，<span class=\"kb-math kb-math-inline\">f</span> 是外力或源项。初值通过最小二乘直接给出：</p>\n<div class=\"kb-math kb-math-display\">C(0)=u(X,0)^\\top[\\Phi(X),\\mathbbm{1}]^+</div>\n<div class=\"key-point\">💡 关键：传统 PINN 在整个时空域上最小化残差；Frozen-PINN 把时间方向变成 ODE 初值问题，因此天然按时间推进，避免非因果的全局时空拟合。</div>\n<h5>边界条件与 SVD 层</h5>\n<p>Frozen-PINN 提供两种边界处理方式。第一种是边界兼容层：构造线性映射 <span class=\"kb-math kb-math-inline\">A</span>，令</p>\n<div class=\"kb-math kb-math-display\">\\Phi_A=[A\\Phi,\\mathbbm{1}]</div>\n<p>从而把边界条件编码进基函数空间。此时 ODE 改写为：</p>\n<div class=\"kb-math kb-math-display\">C_t(t)=R(X,C(t))\\Phi_A(X)^+</div>\n<p>第二种是增强 ODE：当无法方便构造边界兼容层时，在 ODE 右端加入边界纠偏项，让边界点 <span class=\"kb-math kb-math-inline\">X_b</span> 上的预测以速率 <span class=\"kb-math kb-math-inline\">\\kappa(\\hat{u}-g)</span> 被拉回给定边界值 <span class=\"kb-math kb-math-inline\">g</span>。论文默认 <span class=\"kb-math kb-math-inline\">\\kappa=10^5</span>，并讨论它对边界误差和求解时间的影响。</p>\n<p>SVD 层用于降低数值刚性。对 <span class=\"kb-math kb-math-inline\">A\\Phi(X)</span> 做截断分解：</p>\n<div class=\"kb-math kb-math-display\">V_r\\Sigma_rU_r^\\top=A\\Phi(X)+O(\\Sigma_{r+1}),\\qquad\nA_r=V_r^\\top A</div>\n<p>然后用 <span class=\"kb-math kb-math-inline\">A_r\\Phi(X)</span> 替换原始基函数矩阵。这样得到的数据基近似正交，伪逆更稳定，ODE 系统维度也更小。</p>\n<h5>ELM 与 SWIM 采样</h5>\n<p>ELM 是数据无关的随机特征方法，直接从高斯/均匀分布采样 <span class=\"kb-math kb-math-inline\">w_i,b_i</span>。它实现简单，但不能主动把基函数放到解变化剧烈的区域。</p>\n<p>SWIM 是数据依赖采样策略：用两个 collocation 点构造一对权重和偏置，使激活函数的变化方向与点对方向对齐。对于 Burgers 冲击、强对流或局部高梯度问题，SWIM 能在关键区域放置更陡峭的基函数，减少无效随机特征。</p>\n<h5>与传统 PINN 的区别</h5>\n<p>传统 PINN 的困难来自三个方面：参数维度高、PDE/边界/初值多目标竞争、时间被当作普通输入导致非因果拟合。Frozen-PINN 分别对应处理：冻结隐藏层减少可训练参数；最小二乘、边界层和 ODE 推进拆开损失项；按 <span class=\"kb-math kb-math-inline\">C(t)</span> 的初值问题顺序演化时间。</p>\n<p>论文在 2026 年 ICLR 版本中报告 Frozen-PINN 在九个 PDE 基准上通常比 SOTA PINN 快数个数量级，并在低维问题上接近高效网格方法精度，在高维扩散等场景中避免传统网格法的维度灾难。局限是它依赖随机/数据依赖基函数质量，复杂边界和强非线性问题仍需要合适的边界处理、重采样和 ODE 求解器设置。</p>",
      "quiz": {
        "q": "Frozen-PINN 为什么能避免传统 PINN 的大规模梯度下降训练？",
        "options": [
          "它删除了 PDE 残差项，只拟合数据",
          "它冻结空间基函数，并把输出层时间系数转化为 ODE 进行求解",
          "它把所有边界条件都忽略，因此训练更快",
          "它使用更深的 Transformer 代替全连接网络"
        ],
        "answer": 1,
        "explain": "Frozen-PINN 采样并冻结隐藏层空间参数，用最小二乘确定初值，再通过 ODE 求解器推进 C(t)，因此不需要对全网络做反向传播式训练。"
      }
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
      "summary": "PIKANs 将 PINN 中的 MLP 表示模型替换为 Kolmogorov-Arnold Network，使边上的一元函数成为可学习激活函数，在 PDE 残差约束不变的前提下提升表达能力、参数效率和可解释性。",
      "keyPoints": [
        "<strong>表示模型替换</strong>：从 <span class=\"kb-math kb-math-inline\">u_\\theta(x,t)=\\mathrm{MLP}_\\theta(x,t)</span> 改为 <span class=\"kb-math kb-math-inline\">u_\\theta(x,t)=\\mathrm{KAN}_\\theta(x,t)</span>，物理残差、边界损失和数据损失沿用 PINN 框架",
        "<strong>边函数可学习</strong>：KAN 将固定激活函数改为边上的一元函数 <span class=\"kb-math kb-math-inline\">\\phi_{j,i}</span>，常见实现包括 B-spline、Chebyshev 多项式、RBF、Wavelet 等",
        "<strong>物理信息训练</strong>：通过自动微分计算 KAN 输出对时空坐标的导数，最小化 PDE 残差 <span class=\"kb-math kb-math-inline\">r_f=\\mathcal{N}[u_\\theta]-s</span> 与初始/边界条件误差",
        "<strong>多种 PDE 形式</strong>：可用于强形式 PINN、能量形式 DEM、边界积分/逆形式 BINN；KINN 工作展示了 KAN 版本的强形式、能量形式和逆形式求解",
        "<strong>精度优势场景</strong>：在多尺度、奇异性、应力集中、非线性超弹性、异质材料和部分反问题中，KAN 表示比 MLP 更容易逼近局部陡变与高低频混合解",
        "<strong>参数与可解释性</strong>：可学习一元边函数比全连接 MLP 的黑箱权重更容易可视化，且在若干 PDE 案例中可用更少参数达到更低误差",
        "<strong>主要限制</strong>：KAN 的网格大小、样条阶数和边函数类型是敏感超参数；高维配点数量仍会膨胀，原始 PIKAN 在高维问题上训练可能变慢"
      ],
      "detail": "<h5>核心架构示意</h5>\n<p><img alt=\"PIML 表示模型增强示意图\" src=\"https://arxiv.org/html/2410.13228v2/extracted/5944408/Images/schematic.png\" />\n<em>图：From PINNs to PIKANs 综述中的 PIML 框架图。PINN/PIKAN 的共同结构是“表示模型 → PDE/边界残差 → 多目标损失 → 优化器”，区别在于表示模型从 MLP 层替换为 KAN 层。</em></p>\n<p><img alt=\"KINN/PIKAN 方法概览\" src=\"https://arxiv.org/html/2406.11045/x1.png\" />\n<em>图：Kolmogorov-Arnold-Informed Neural Network 的图形摘要，展示了将 KAN 嵌入强形式、能量形式和逆形式 PDE 求解的思路。</em></p>\n<blockquote>\n<p>来源限制：任务给出的 PNNL 链接对应的是 “From PINNs to PIKANs” 综述入口；可访问正文主要来自 arXiv:2410.13228 及其引用的 KINN/PIKAN 实证论文（如 arXiv:2406.11045）。因此这里按“PIKANs 作为一类方法”解读，而不是声称存在单一同名算法论文。</p>\n</blockquote>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># PIKAN/KINN 训练伪代码\n# 输入: PDE 算子 N, 源项 s, 初始/边界数据, 配点 Z_f\n# 输出: 满足物理约束的 KAN 表示 u_theta\n\ntheta = init_kan(edge_function=&quot;bspline_or_chebyshev&quot;)\n\nfor step in range(max_steps):\n    z_f = sample_collocation_points()          # z = (x, t) 或高维时空坐标\n    z_b, u_b = sample_boundary_points()\n    z_0, u_0 = sample_initial_points()\n\n    u_f = KAN(theta, z_f)\n    grads = auto_diff(u_f, z_f)                # 自动微分求 u_t, u_x, u_xx, ...\n    r_f = PDE_operator_N(u_f, grads) - source(z_f)\n\n    u_bc = KAN(theta, z_b)\n    u_ic = KAN(theta, z_0)\n\n    loss_pde = mean_square(r_f)\n    loss_bc = mean_square(u_bc - u_b)\n    loss_ic = mean_square(u_ic - u_0)\n    loss = loss_pde + lambda_bc * loss_bc + lambda_ic * loss_ic\n\n    theta = optimizer_step(theta, loss)\n</code></pre>\n<h5>动机与背景</h5>\n<p>标准 PINN 使用 MLP 作为 <span class=\"kb-math kb-math-inline\">u_\\theta(x,t)</span> 的函数逼近器。它的优势是简单、可微、无网格；问题是 MLP 对高频、多尺度和局部奇异结构常有谱偏置，PDE 残差又需要高阶导数，训练时容易出现梯度不平衡、边界项压不过 PDE 项、或在复杂局部结构处误差集中。</p>\n<p>KAN 的切入点是 Kolmogorov-Arnold 表示定理：多元连续函数可以由一元函数的复合与加和表示。现代 KAN 不再使用固定的 <span class=\"kb-math kb-math-inline\">\\tanh</span>、ReLU 或 SiLU，而是在网络边上放置可学习的一元函数。一个 KAN 层可抽象写为：</p>\n<div class=\"kb-math kb-math-display\">z_j^{(\\ell+1)}=\\sum_{i=1}^{n_\\ell}\\phi_{j,i}^{(\\ell)}\\!\\left(z_i^{(\\ell)}\\right)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\phi_{j,i}^{(\\ell)}</span> 是第 <span class=\"kb-math kb-math-inline\">\\ell</span> 层从输入节点 <span class=\"kb-math kb-math-inline\">i</span> 到输出节点 <span class=\"kb-math kb-math-inline\">j</span> 的可学习边函数。原始 KAN 常使用 B-spline 展开：</p>\n<div class=\"kb-math kb-math-display\">\\phi(x)=w_b b(x)+w_s\\sum_{k} c_k B_{k,p}(x)</div>\n<p>这里 <span class=\"kb-math kb-math-inline\">B_{k,p}</span> 是 <span class=\"kb-math kb-math-inline\">p</span> 阶 B-spline 基函数，<span class=\"kb-math kb-math-inline\">c_k</span> 是可学习系数。cPIKAN/KINN 变体也常使用 Chebyshev 多项式：</p>\n<div class=\"kb-math kb-math-display\">\\phi(x)=\\sum_{k=0}^{K} a_k T_k(x), \\quad T_{k+1}(x)=2xT_k(x)-T_{k-1}(x)</div>\n<div class=\"key-point\">💡 关键：PIKAN 的创新不在于改变 PDE 残差形式，而在于把“表示解的神经网络”换成更接近数值基函数展开的 KAN。</div>\n<h5>物理信息损失</h5>\n<p>对一般 PDE：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{N}[u](z)=s(z), \\quad z=(x,t)\\in \\Omega\\times[0,T]</div>\n<p>PIKAN 用 KAN 表示：</p>\n<div class=\"kb-math kb-math-display\">u_\\theta(z)=\\mathrm{KAN}_\\theta(z)</div>\n<p>并通过自动微分构造残差：</p>\n<div class=\"kb-math kb-math-display\">r_f(z;\\theta)=\\mathcal{N}[u_\\theta](z)-s(z)</div>\n<p>典型损失函数为：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}(\\theta)=\n\\lambda_f\\frac{1}{N_f}\\sum_{i=1}^{N_f}|r_f(z_f^i;\\theta)|^2+\n\\lambda_b\\frac{1}{N_b}\\sum_{i=1}^{N_b}|\\mathcal{B}[u_\\theta](z_b^i)-g_b^i|^2+\n\\lambda_d\\frac{1}{N_d}\\sum_{i=1}^{N_d}|u_\\theta(z_d^i)-u_d^i|^2</div>\n<p>这里 <span class=\"kb-math kb-math-inline\">\\mathcal{B}</span> 是边界/初始条件算子，<span class=\"kb-math kb-math-inline\">\\lambda_f,\\lambda_b,\\lambda_d</span> 是损失权重。对反问题，未知物理参数 <span class=\"kb-math kb-math-inline\">\\lambda</span> 也可以与 KAN 参数 <span class=\"kb-math kb-math-inline\">\\theta</span> 一起优化。</p>\n<h5>为什么 KAN 对 PDE 有吸引力</h5>\n<p>KAN 的 B-spline 或 Chebyshev 边函数类似局部/谱基函数，能在有限区间内构造更灵活的一元响应。对于多尺度解，MLP 需要通过层叠固定激活来合成高频结构；KAN 可以直接调整边函数形状，在局部陡变、奇异梯度和应力集中区域更快拟合目标。</p>\n<p>另一个优势是可解释性。MLP 的知识分散在矩阵权重中，而 KAN 的每条边对应一条可视化的一元函数。对科学计算任务而言，这有助于检查模型是否学到单调性、局部峰值、周期性或材料异质性等物理相关结构。</p>\n<h5>与 PINN 的区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方面</th>\n<th>PINN</th>\n<th>PIKANs</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>表示模型</td>\n<td>MLP + 固定激活函数</td>\n<td>KAN + 可学习边函数</td>\n</tr>\n<tr>\n<td>非线性来源</td>\n<td>节点激活 <span class=\"kb-math kb-math-inline\">\\sigma(Wx+b)</span></td>\n<td>边函数 <span class=\"kb-math kb-math-inline\">\\phi_{j,i}(x_i)</span></td>\n</tr>\n<tr>\n<td>物理约束</td>\n<td>PDE/IC/BC 残差</td>\n<td>同 PINN</td>\n</tr>\n<tr>\n<td>导数计算</td>\n<td>自动微分 MLP 输出</td>\n<td>自动微分 KAN 输出</td>\n</tr>\n<tr>\n<td>优势场景</td>\n<td>中低维、较平滑解</td>\n<td>多尺度、局部奇异、参数效率敏感问题</td>\n</tr>\n<tr>\n<td>主要风险</td>\n<td>谱偏置、损失不平衡</td>\n<td>KAN 超参数敏感、训练开销可能更高</td>\n</tr>\n</tbody>\n</table></div>\n<h5>实践注意点</h5>\n<ol>\n<li>输入通常需要归一化到 <span class=\"kb-math kb-math-inline\">[-1,1]</span>，尤其是 Chebyshev 或样条边函数，否则多项式/样条基容易数值不稳定。</li>\n<li>网格大小不是越大越好。KINN 实验显示，KAN grid size 过大可能导致过拟合和边函数不光滑。</li>\n<li>对复杂几何，PIKAN 不会自动解决采样与边界表示问题；仍需距离函数、RBF、NURBS、三角积分或几何映射等辅助技术。</li>\n<li>高维 PDE 中配点数量仍然是瓶颈，后续 SPIKANs 通过变量分离让每个维度由单独 KAN 处理，正是为缓解这一问题。</li>\n</ol>",
      "quiz": {
        "q": "PIKANs 相比传统 PINN 的核心变化是什么？",
        "options": [
          "将 PDE 残差从强形式改成有限差分格式",
          "用 KAN 的可学习一元边函数替换 MLP 的固定激活表示模型",
          "取消边界条件损失，只保留数据拟合项",
          "用强化学习选择配点"
        ],
        "answer": 1,
        "explain": "PIKANs 的主体仍是 PINN 的物理残差训练框架，关键变化是把表示解的 MLP 换成 KAN，让边上的一元函数可学习。"
      }
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
      "summary": "Scale-PINN 将数值迭代法中的残差修正思想直接写入 PINN 的 PDE 损失，在训练相邻迭代之间加入 Helmholtz 型残差平滑与一致性修正，使 PINN 在流体、多尺度和刚性 PDE 上更快、更稳定收敛。",
      "keyPoints": [
        "<strong>真实论文追溯</strong>：任务 YAML 中的 <code>https://arxiv.org/abs/2601.scale</code> 是占位式 URL；可访问论文为 arXiv:2602.19475，代码仓库为 <code>github.com/chiuph/SCALE-PINN</code>",
        "<strong>损失函数创新</strong>：不是换网络骨干，而是在标准 PDE residual loss 中加入 sequential correction auxiliary sequence",
        "<strong>数值法启发</strong>：借鉴迭代残差修正与隐式残差平滑，将前一轮网络解 <span class=\"kb-math kb-math-inline\">u_{\\theta^{k-1}}</span> 与当前解 <span class=\"kb-math kb-math-inline\">u_{\\theta^k}</span> 的差值用于稳定当前 PDE 残差",
        "<strong>两个辅助项</strong>：引入 stabilization term（残差平滑）和 consistency term（补偿修正项），既抑制训练振荡，又保证最终收敛到原始 PDE",
        "<strong>标准 PINN 极限</strong>：当修正超参数取零时，Scale-PINN 退化为普通 PINN 损失",
        "<strong>低额外开销</strong>：只需保存上一轮权重、额外前向一次并对当前 mini-batch 计算修正项，可嵌入 Adam/SGD 等一阶优化器",
        "<strong>验证范围广</strong>：覆盖 lid-driven cavity Navier-Stokes、NACA0012 翼型、方柱绕流、Rayleigh-Bénard 对流、Kuramoto-Sivashinsky、Gray-Scott、KdV 和 Allen-Cahn 方程",
        "<strong>训练策略</strong>：JAX 实现，MLP/多分支 MLP 骨干，首层 sine 高频初始化与 frequency annealing，Adam + warm-up cosine learning rate"
      ],
      "detail": "<h5>核心架构示意</h5>\n<p><img alt=\"Scale-PINN 框架示意图\" src=\"https://arxiv.org/html/2602.19475/x1.png\" />\n<em>图：Scale-PINN 的整体示意。核心是把残差平滑算子作用于训练迭代中解的变化量，并将该序列修正项并入 PDE 损失。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># Scale-PINN 训练伪代码\n# 输入: PDE residual R(u), IC/BC 数据, smoothing 参数 alpha, 修正权重 beta/gamma\n# 输出: 训练后的 u_theta\n\ntheta = init_network()\ntheta_prev = copy(theta)\n\nfor k in range(num_iterations):\n    z_f = sample_collocation_batch()\n    z_b, y_b = sample_boundary_batch()\n\n    # 当前解与上一迭代解\n    u = net(theta, z_f)\n    u_prev = stop_gradient(net(theta_prev, z_f))\n    delta_u = u - u_prev\n\n    # 标准 PDE 残差\n    residual = PDE_residual(u, z_f, theta)\n\n    # 序列修正：Helmholtz/残差平滑 + 一致性补偿\n    smooth_delta = helmholtz_smoothing(delta_u, alpha)\n    consistency = consistency_counter_term(delta_u, alpha)\n    corrected_residual = residual + beta * smooth_delta - gamma * consistency\n\n    loss_pde = mean_square(corrected_residual)\n    loss_bc = mean_square(net(theta, z_b) - y_b)\n    loss = loss_pde + lambda_bc * loss_bc\n\n    theta_prev = copy(theta)\n    theta = adam_step(theta, loss)\n</code></pre>\n<h5>动机与背景</h5>\n<p>普通 PINN 的目标函数通常写作：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\mathrm{PINN}}=\n\\lambda_f\\frac{1}{N_f}\\sum_i|\\mathcal{R}(u_\\theta)(z_i)|^2+\n\\lambda_b\\mathcal{L}_{bc}+\n\\lambda_0\\mathcal{L}_{ic}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\mathcal{R}(u_\\theta)</span> 是 PDE 残差。问题在于复杂 PDE 的残差景观会非常崎岖：Navier-Stokes 的非线性对流项、反应扩散系统的多尺度结构、KdV/KS 的高阶导数都会让一阶优化器在局部震荡或早熟收敛。</p>\n<p>Scale-PINN 的观察是：传统科学计算不只是离散化 PDE，还依赖迭代求解器中的残差修正来保证稳定收敛。PINN 训练本身也是一个迭代过程，因此可以把“相邻迭代之间解的变化”视为可利用的数值信息，而不是只在每步孤立地最小化当前 residual。</p>\n<h5>序列修正损失</h5>\n<p>设第 <span class=\"kb-math kb-math-inline\">k</span> 次迭代的网络解为 <span class=\"kb-math kb-math-inline\">u_{\\theta^k}</span>，上一迭代为 <span class=\"kb-math kb-math-inline\">u_{\\theta^{k-1}}</span>，定义：</p>\n<div class=\"kb-math kb-math-display\">\\Delta u^k(z)=u_{\\theta^k}(z)-u_{\\theta^{k-1}}(z)</div>\n<p>Scale-PINN 在 PDE residual 中加入与 <span class=\"kb-math kb-math-inline\">\\Delta u^k</span> 相关的平滑修正。一个实现层面的抽象写法是：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{f}^{k}=\n\\frac{1}{N_f}\\sum_{i=1}^{N_f}\n\\left|\n\\mathcal{R}(u_{\\theta^k})(z_i)\n+\\beta\\,\\mathcal{S}_{\\alpha}[\\Delta u^k](z_i)\n-\\gamma\\,\\mathcal{C}_{\\alpha}[\\Delta u^k](z_i)\n\\right|^2</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\mathcal{S}_{\\alpha}</span> 是稳定化残差平滑项，<span class=\"kb-math kb-math-inline\">\\mathcal{C}_{\\alpha}</span> 是一致性补偿项，<span class=\"kb-math kb-math-inline\">\\beta,\\gamma,\\alpha</span> 为可调超参数。论文将 <span class=\"kb-math kb-math-inline\">\\mathcal{S}_{\\alpha}</span> 与 Helmholtz 型 residual smoothing 联系起来，可理解为：</p>\n<div class=\"kb-math kb-math-display\">\\left(I-\\alpha^2\\nabla^2\\right)\\tilde{r}=r</div>\n<p>或等价地将高频振荡残差过滤后再参与更新。</p>\n<div class=\"key-point\">💡 关键：Scale-PINN 不直接改变目标 PDE，而是在优化路径上加入数值稳定机制；一致性项的作用是避免平滑项把最终解偏离原始方程。</div>\n<h5>Navier-Stokes 示例</h5>\n<p>以稳态不可压 Navier-Stokes 为例，标准残差包括连续性方程与动量方程：</p>\n<div class=\"kb-math kb-math-display\">\\nabla\\cdot \\mathbf{u}=0</div>\n<div class=\"kb-math kb-math-display\">\\mathbf{u}\\cdot\\nabla \\mathbf{u}+\\nabla p-\\frac{1}{Re}\\nabla^2\\mathbf{u}=0</div>\n<p>普通 PINN 会直接惩罚这两组残差。Scale-PINN 对动量方程残差加入序列修正项，并在连续性约束中引入压力与不可压约束之间的关系，帮助压力-速度耦合更稳定地形成。论文在 lid-driven cavity <span class=\"kb-math kb-math-inline\">Re=400</span> 到 <span class=\"kb-math kb-math-inline\">Re=3200</span> 范围展示了明显加速：在若干高 Reynolds 案例中，Scale-PINN 可在分钟级训练时间内达到普通 PINN 或二阶优化方法需要数小时才能接近的精度。</p>\n<h5>网络与训练机制</h5>\n<p>Scale-PINN 的骨干仍是 MLP。对流体问题，论文使用共享隐藏层后接 <span class=\"kb-math kb-math-inline\">u,v,p</span> 等变量分支的多分支网络；对标量 PDE，则使用带拼接 skip connections 的网络。为了缓解高频特征难学的问题，首层用 sine 激活和频率因子初始化：</p>\n<div class=\"kb-math kb-math-display\">h_1=\\sin(\\omega_0 W_1 z+b_1)</div>\n<p>训练中这些高频分量逐渐调整到合适范围，论文称为 frequency annealing。后续层常用 SiLU 或 softplus。优化器采用 Adam 与 warm-up cosine 学习率调度，在单张 RTX 3090 上运行 JAX 实现。</p>\n<h5>与普通 PINN 的区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方面</th>\n<th>普通 PINN</th>\n<th>Scale-PINN</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>主要改动</td>\n<td>直接最小化 PDE 残差</td>\n<td>在 PDE 残差中加入序列修正项</td>\n</tr>\n<tr>\n<td>使用历史迭代</td>\n<td>不使用</td>\n<td>使用 <span class=\"kb-math kb-math-inline\">u_{\\theta^k}-u_{\\theta^{k-1}}</span></td>\n</tr>\n<tr>\n<td>稳定性来源</td>\n<td>损失权重、采样、优化器</td>\n<td>残差平滑 + 一致性补偿</td>\n</tr>\n<tr>\n<td>额外成本</td>\n<td>无</td>\n<td>额外保存上一轮权重并做一次前向</td>\n</tr>\n<tr>\n<td>适用场景</td>\n<td>平滑/中等难度 PDE</td>\n<td>刚性、多尺度、复杂流动 PDE</td>\n</tr>\n</tbody>\n</table></div>\n<h5>为什么能加速</h5>\n<p>Scale-PINN 的修正项相当于给优化器提供“当前解相对上一解的物理变化方向”。在 mini-batch 采样变化较大时，普通 PINN 的 residual gradient 容易被局部配点扰动牵引；序列修正项会抑制高频振荡，使优化路径更像稳定的隐式迭代法。它因此可以使用更小 batch、更大学习率和更少训练迭代，而不容易掉入错误流场或反应扩散图案。</p>",
      "quiz": {
        "q": "Scale-PINN 的序列修正项主要利用了什么信息？",
        "options": [
          "训练集中标签数据的类别分布",
          "当前网络解与上一迭代网络解之间的变化量",
          "Transformer 注意力矩阵的稀疏模式",
          "有限元网格单元的拓扑连接"
        ],
        "answer": 1,
        "explain": "Scale-PINN 将 u_{theta^k}-u_{theta^{k-1}} 经过残差平滑和一致性补偿后并入 PDE 损失，从而稳定训练迭代。"
      }
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
      "summary": "ASR-PINN 面向多组分反应性溶质输运，将自适应步长 Runge-Kutta 时间推进嵌入 PINN 训练，用局部截断误差控制时间步长，从而在反应刚性、浓度前沿和多物种耦合条件下提高稳定性与精度。",
      "keyPoints": [
        "<strong>来源状态</strong>：公开可访问题录显示论文发表于 Journal of Hydrology 669:135127，DOI 为 <code>10.1016/j.jhydrol.2026.135127</code>；ScienceDirect 正文和作者分享链接当前不可访问，ResearchGate 也标注无全文",
        "<strong>问题对象</strong>：多组分反应性溶质输运，未知量是多个浓度场 <span class=\"kb-math kb-math-inline\">C_1,\\dots,C_m</span>，同时受对流、弥散/扩散和反应网络控制",
        "<strong>离散时间 PINN</strong>：不是只在连续时空中随机采样残差，而是在相邻时间层之间加入 Runge-Kutta 阶段约束",
        "<strong>自适应步长</strong>：根据 RK 嵌入对或 step-doubling 的局部误差估计调整 <span class=\"kb-math kb-math-inline\">\\Delta t</span>，反应剧烈或浓度前沿陡峭时缩小步长，平滑阶段放大步长",
        "<strong>多物种耦合</strong>：网络输出向量 <span class=\"kb-math kb-math-inline\">\\mathbf{C}_\\theta=(C_{1,\\theta},\\dots,C_{m,\\theta})</span>，反应项 <span class=\"kb-math kb-math-inline\">R_i(\\mathbf{C};k)</span> 在各物种残差之间共享，避免逐物种独立拟合破坏质量转化关系",
        "<strong>损失构成</strong>：初始/边界条件损失、观测数据损失、PDE 残差损失、RK 时间推进一致性损失共同训练",
        "<strong>适用场景</strong>：地下水污染物迁移、串联/分支反应链、变量参数输运、高 Péclet 数下易出现数值振荡或前沿误差的问题",
        "<strong>局限说明</strong>：由于全文不可访问，以下公式和流程是基于题名、题录参考文献、PINN 离散时间模型和自适应 RK 数值方法的机制级重构；具体网络结构与实验数值需以正式论文为准"
      ],
      "detail": "<h5>可访问来源与方法流程图</h5>\n<p>论文图当前无法公开访问；可核验来源包括 DOI 题录与 ResearchGate 题录：</p>\n<p><img alt=\"ASR-PINN DOI 题录入口\" src=\"https://api.crossref.org/works/10.1016/j.jhydrol.2026.135127/agency\" />\n<em>图：ASR-PINN 的 DOI/Crossref 题录入口用于核验论文身份；由于论文图像当前不可公开直连，下方文字流程图复现其自适应 Runge-Kutta PINN 训练机制。</em></p>\n<ul>\n<li>DOI: https://doi.org/10.1016/j.jhydrol.2026.135127</li>\n<li>ResearchGate: https://www.researchgate.net/publication/400792461_ASR-PINN_Adaptive_step-size_runge-kutta_physics-informed_neural_network_for_multi-component_reactive_solute_transport</li>\n</ul>\n<pre><code class=\"language-text\">多组分浓度 C(t_n, x)\n        │\n        ▼\nRK 阶段预测 C^(s) = C^n + h Σ a_sq F(C^(q))\n        │\n        ├── 高阶更新 C_high^(n+1)\n        ├── 低阶更新 C_low^(n+1)\n        ▼\n局部误差 e = ||C_high - C_low||\n        │\n        ├── e &lt;= tol: 接受步长，加入 RK/PDE 损失，推进 t_{n+1}\n        └── e &gt;  tol: 拒绝步长，缩小 h 重新计算\n</code></pre>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># ASR-PINN 机制级伪代码\n# 输入: 多物种反应输运算子 F(C), 初始/边界/观测数据, 容差 tol\n# 输出: 浓度场网络 C_theta(t, x)\n\ntheta = init_multi_output_network(num_species=m)\nt = t0\nh = h_init\n\nwhile t &lt; T:\n    x_batch = sample_spatial_points()\n\n    # 当前时间层网络预测\n    Cn = C_theta(theta, t, x_batch)\n\n    # 嵌入式 RK 阶段，b_high/b_low 构成两个不同阶数的更新\n    stages = []\n    for s in range(num_stages):\n        Cs = Cn + h * sum(a[s][q] * F(stages[q], t + c[q] * h, x_batch)\n                          for q in range(s))\n        stages.append(Cs)\n\n    C_high = Cn + h * sum(b_high[q] * F(stages[q], t + c[q] * h, x_batch)\n                          for q in range(num_stages))\n    C_low = Cn + h * sum(b_low[q] * F(stages[q], t + c[q] * h, x_batch)\n                         for q in range(num_stages))\n\n    error = normalized_norm(C_high - C_low, atol, rtol)\n\n    if error &lt;= 1.0:\n        C_next_net = C_theta(theta, t + h, x_batch)\n        loss_rk = mean_square(C_next_net - C_high)\n        loss_pde = mean_square(transport_reaction_residual(theta, t, x_batch))\n        loss_bc_ic = boundary_initial_loss(theta)\n        loss_obs = observation_loss(theta)\n        theta = optimizer_step(theta, loss_rk + loss_pde + loss_bc_ic + loss_obs)\n        t = t + h\n\n    h = safety * h * error ** (-1.0 / (order + 1))\n</code></pre>\n<h5>反应输运方程</h5>\n<p>多组分反应性溶质输运常可写成向量 PDE：</p>\n<div class=\"kb-math kb-math-display\">\\frac{\\partial C_i}{\\partial t}\n+ \\nabla\\cdot(\\mathbf{v} C_i)\n- \\nabla\\cdot(\\mathbf{D}_i\\nabla C_i)\n- R_i(\\mathbf{C};\\mathbf{k})=0,\\quad i=1,\\dots,m</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">C_i</span> 是第 <span class=\"kb-math kb-math-inline\">i</span> 个组分浓度，<span class=\"kb-math kb-math-inline\">\\mathbf{v}</span> 是地下水流速，<span class=\"kb-math kb-math-inline\">\\mathbf{D}_i</span> 是弥散/扩散张量，<span class=\"kb-math kb-math-inline\">R_i</span> 是由反应网络给出的生成/消耗项。对于串联降解链，<span class=\"kb-math kb-math-inline\">R_i</span> 会同时依赖上游物种的衰减和本物种的消耗；对于分支反应，多个 <span class=\"kb-math kb-math-inline\">R_i</span> 还会共享同一前驱物种。</p>\n<p>PINN 用多输出网络逼近：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{C}_\\theta(t,x)=\n\\left[C_{1,\\theta}(t,x),\\dots,C_{m,\\theta}(t,x)\\right]</div>\n<p>并构造每个物种的残差：</p>\n<div class=\"kb-math kb-math-display\">r_i(t,x;\\theta)=\n\\frac{\\partial C_{i,\\theta}}{\\partial t}\n+ \\nabla\\cdot(\\mathbf{v} C_{i,\\theta})\n- \\nabla\\cdot(\\mathbf{D}_i\\nabla C_{i,\\theta})\n- R_i(\\mathbf{C}_\\theta;\\mathbf{k})</div>\n<p>总的连续物理残差为：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{pde}=\n\\frac{1}{mN_f}\\sum_{i=1}^{m}\\sum_{j=1}^{N_f}\n|r_i(t_j,x_j;\\theta)|^2</div>\n<h5>自适应 RK 约束</h5>\n<p>ASR-PINN 的关键是把时间推进写成 RK 一致性约束。设 <span class=\"kb-math kb-math-inline\">\\mathbf{F}(\\mathbf{C},t,x)</span> 表示反应输运方程右端，<span class=\"kb-math kb-math-inline\">s</span> 阶 RK 阶段满足：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{C}^{(q)}=\\mathbf{C}^{n}\n+h_n\\sum_{j=1}^{s}a_{qj}\\mathbf{F}(\\mathbf{C}^{(j)},t_n+c_jh_n,x)</div>\n<p>高阶和低阶嵌入更新为：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{C}_{high}^{n+1}=\\mathbf{C}^{n}\n+h_n\\sum_{q=1}^{s}b_q\\mathbf{F}(\\mathbf{C}^{(q)},t_n+c_qh_n,x)</div>\n<div class=\"kb-math kb-math-display\">\\mathbf{C}_{low}^{n+1}=\\mathbf{C}^{n}\n+h_n\\sum_{q=1}^{s}\\hat{b}_q\\mathbf{F}(\\mathbf{C}^{(q)},t_n+c_qh_n,x)</div>\n<p>局部误差估计：</p>\n<div class=\"kb-math kb-math-display\">e_n=\n\\left\\|\n\\frac{\\mathbf{C}_{high}^{n+1}-\\mathbf{C}_{low}^{n+1}}\n{\\mathrm{atol}+\\mathrm{rtol}\\max(|\\mathbf{C}^{n}|,|\\mathbf{C}_{high}^{n+1}|)}\n\\right\\|</div>\n<p>步长更新：</p>\n<div class=\"kb-math kb-math-display\">h_{n+1}=\\eta h_n e_n^{-1/(p+1)}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\eta\\in(0,1)</span> 是安全因子，<span class=\"kb-math kb-math-inline\">p</span> 是低阶方法阶数。若 <span class=\"kb-math kb-math-inline\">e_n&gt;1</span>，当前步长被拒绝并缩小；若 <span class=\"kb-math kb-math-inline\">e_n\\le 1</span>，接受该步长并把 RK 一致性加入训练损失：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{rk}=\n\\frac{1}{N_x}\\sum_{j=1}^{N_x}\n\\left\\|\n\\mathbf{C}_\\theta(t_n+h_n,x_j)-\\mathbf{C}_{high}^{n+1}(x_j)\n\\right\\|^2</div>\n<h5>总损失与训练直觉</h5>\n<p>一个合理的 ASR-PINN 总损失可写为：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}=\n\\lambda_{pde}\\mathcal{L}_{pde}\n+\\lambda_{rk}\\mathcal{L}_{rk}\n+\\lambda_{ic}\\mathcal{L}_{ic}\n+\\lambda_{bc}\\mathcal{L}_{bc}\n+\\lambda_{obs}\\mathcal{L}_{obs}</div>\n<p>其中：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{ic}=\\frac{1}{N_0}\\sum_j\\|\\mathbf{C}_\\theta(0,x_j)-\\mathbf{C}_0(x_j)\\|^2</div>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{bc}=\\frac{1}{N_b}\\sum_j\\|\\mathcal{B}[\\mathbf{C}_\\theta](t_j,x_j)-g_b(t_j,x_j)\\|^2</div>\n<p>自适应 RK 的直觉是：反应输运问题的困难往往集中在少数时间段，例如污染物前沿刚进入观测截面、快速反应消耗、或分支反应导致浓度突变。固定步长 PINN 必须在所有时间段使用同样的时间分辨率；连续时间 PINN 虽然无显式步长，但会把全时域残差混在一起，容易在刚性局部欠拟合。ASR-PINN 用误差控制把训练重点自动放到难时间段。</p>\n<h5>与标准 PINN 的区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方面</th>\n<th>标准连续时间 PINN</th>\n<th>固定步长 RK-PINN</th>\n<th>ASR-PINN</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>时间处理</td>\n<td>随机采样 <span class=\"kb-math kb-math-inline\">(t,x)</span> 残差</td>\n<td>固定 <span class=\"kb-math kb-math-inline\">\\Delta t</span> 的 RK 阶段</td>\n<td>按误差自适应 <span class=\"kb-math kb-math-inline\">\\Delta t_n</span></td>\n</tr>\n<tr>\n<td>难点处理</td>\n<td>依赖采样密度和损失权重</td>\n<td>依赖人工选步长</td>\n<td>误差大时自动缩步</td>\n</tr>\n<tr>\n<td>反应刚性</td>\n<td>容易平均化误差</td>\n<td>小步稳定但成本高</td>\n<td>局部小步，全局省步</td>\n</tr>\n<tr>\n<td>多物种耦合</td>\n<td>PDE 残差耦合</td>\n<td>RK 阶段耦合</td>\n<td>RK 阶段 + 误差控制耦合</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"warn-box\">⚠️ 注意：由于正式全文不可访问，以上是对 ASR-PINN 题名所指“adaptive step-size Runge-Kutta + PINN”机制的保守重构；具体采用 Dormand-Prince、Bogacki-Shampine、Cash-Karp 还是 step-doubling，需要以论文正文为准。</div>",
      "quiz": {
        "q": "ASR-PINN 中自适应步长机制的主要作用是什么？",
        "options": [
          "减少网络输出的物种数量",
          "根据局部时间推进误差动态调整步长，以稳定反应输运训练",
          "用卷积层替代全连接层",
          "删除 PDE 残差，只拟合观测浓度"
        ],
        "answer": 1,
        "explain": "自适应 RK 通过比较高低阶更新或等价误差估计决定接受、拒绝和调整步长，使反应剧烈或前沿陡峭的时间段获得更细分辨率。"
      }
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
      "summary": "MS-PINN 将金属凝固中的速度场、温度场和压力场放入同一个 PINN 框架，用 Fourier 特征编码、自动微分物理残差、自适应损失和残差自适应采样共同约束多场耦合演化，解决传统 PINN 在凝固过程高频梯度、强耦合和局部误差区域上的训练困难。",
      "keyPoints": [
        "<strong>多场联合预测</strong>：网络以 <span class=\"kb-math kb-math-inline\">(x,y,t)</span> 为输入，联合输出 <span class=\"kb-math kb-math-inline\">(u,v,T,p)</span>，同时约束动量方程、连续性方程和能量方程",
        "<strong>金属凝固物理残差</strong>：显式使用密度 <span class=\"kb-math kb-math-inline\">\\rho</span>、黏度 <span class=\"kb-math kb-math-inline\">\\mu</span>、比热 <span class=\"kb-math kb-math-inline\">C_p</span>、导热系数 <span class=\"kb-math kb-math-inline\">k</span>，构造 Navier-Stokes 残差与热传导-对流残差",
        "<strong>Fourier Feature Encoding (FFE)</strong>：对空间和时间分别使用多尺度正弦/余弦映射，增强网络表达高频温度梯度与局部流动结构的能力",
        "<strong>Self-Adaptive Loss (SAL)</strong>：将 PDE 残差和边界/观测误差放入可学习不确定性权重中，减少手工调 loss 权重的依赖",
        "<strong>Residual Adaptive Refinement (RAR/RAD)</strong>：周期性在全域采样候选点，根据物理残差补充配点，使训练更关注误差集中的局部区域",
        "<strong>NeuroPDE 软件化实现</strong>：作者公开仓库将 PINN 训练、回调、可视化、checkpoint、RAR 与自适应损失模块化，便于扩展到 Burgers、扩散、Navier-Stokes 等 PDE",
        "<strong>来源限制</strong>：任务给出的 arXiv 链接 <code>https://arxiv.org/abs/2601.mspinn</code> 不可访问；可追溯到的正式条目为 Computers &amp; Mathematics with Applications 207:60-78, DOI <code>10.1016/j.camwa.2026.01.015</code>，方法细节主要来自作者公开 GitHub 仓库"
      ],
      "detail": "<h5>图示与可访问来源</h5>\n<p><img alt=\"MS-PINN 总体架构\" src=\"https://raw.githubusercontent.com/baichen99/PINN-Software/main/images/pinn.png\" />\n<em>图：作者公开仓库中的 MS-PINN 架构。输入空间位置和时间，经过 FFE 与神经网络得到物理状态，自动微分生成 PDE、边界和初始条件损失，并通过 SAL/RAR 提升关键区域精度。</em></p>\n<p><img alt=\"NeuroPDE 软件架构\" src=\"https://raw.githubusercontent.com/baichen99/PINN-Software/main/images/softarc.png\" />\n<em>图：NeuroPDE 的插件式训练框架，RAR、自适应损失、checkpoint 与可视化均通过训练回调插入。</em></p>\n<p>可访问来源说明：论文元信息可在 ResearchGate 条目 <code>https://www.researchgate.net/publication/403350092_MS-PINN_A_physics-informed_neural_network_for_multi-field_coupled_evolution_modeling_in_metal_solidification</code> 和 Mindat 索引 <code>https://www.mindat.org/reference.php?id=19598472</code> 查到；方法图、训练入口和模块代码来自作者仓库 <code>https://github.com/baichen99/PINN-Software</code>。由于论文全文未开放抓取，下述公式级解读以公开代码和 README 为主。</p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># MS-PINN 训练逻辑简化版\ndef pde_residual(u, v, T, p, x, y, t):\n    Cp, k = 448.0, 401.0\n    rho, mu = 8920.0, 0.0032\n\n    h = Cp * T\n    r_energy = rho * (d(h, t) + u * d(h, x) + v * d(h, y)) \\\n               - k * (d2(T, x) + d2(T, y))\n\n    r_u = d(u, t) + u * d(u, x) + v * d(u, y) \\\n          - mu / rho * (d2(u, x) + d2(u, y)) + d(p, x) / rho\n    r_v = d(v, t) + u * d(v, x) + v * d(v, y) \\\n          - mu / rho * (d2(v, x) + d2(v, y)) + d(p, y) / rho\n    r_c = d(u, x) + d(v, y)\n    return [r_u, r_v, r_c, r_energy]\n\nmodel = MLPWithFFE(\n    input=(x, y, t),\n    spatial_sigmas=[10, 1, 0.1, 0.01, 0.001, 0.0001],\n    temporal_sigmas=[1, 0.1, 0.01],\n    hidden_layers=[50] * 5,\n    outputs=[u, v, T, p],\n)\n\nfor epoch in range(25000):\n    state = model(collocation_points)\n    residual = pde_residual(*state, x, y, t)\n    loss_pde = mean_square(residual, weights=[10, 10, 1, 1])\n    loss_bc = mean_square(model(boundary_points)[:, supervised_dims] - bc_values,\n                          weights=[1000, 1000])\n    loss = self_adaptive_loss(loss_pde, loss_bc)\n    update_network_with_adam(loss)\n\n    if epoch % 1000 == 0:\n        candidates = uniform_sample(domain, 5000)\n        new_points = select_residual_refinement_points(candidates, top_k=50)\n        collocation_points.add(new_points)\n</code></pre>\n<h5>多场耦合残差如何构造</h5>\n<p>MS-PINN 的核心不是单独预测温度或速度，而是把金属凝固中的热-流耦合关系写成同一个神经网络的物理残差。网络输出可记为</p>\n<div class=\"kb-math kb-math-display\">\\hat{\\mathbf{s}}_\\theta(x,y,t)=\\big(u_\\theta(x,y,t), v_\\theta(x,y,t), T_\\theta(x,y,t), p_\\theta(x,y,t)\\big).</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">u,v</span> 是二维速度分量，<span class=\"kb-math kb-math-inline\">T</span> 是温度，<span class=\"kb-math kb-math-inline\">p</span> 是压力。公开训练脚本中采用的动量残差为</p>\n<div class=\"kb-math kb-math-display\">r_u =\nu_t + u u_x + v u_y\n- \\frac{\\mu}{\\rho}(u_{xx}+u_{yy})\n+ \\frac{1}{\\rho}p_x,</div>\n<div class=\"kb-math kb-math-display\">r_v =\nv_t + u v_x + v v_y\n- \\frac{\\mu}{\\rho}(v_{xx}+v_{yy})\n+ \\frac{1}{\\rho}p_y,</div>\n<p>连续性残差为</p>\n<div class=\"kb-math kb-math-display\">r_c = u_x + v_y.</div>\n<p>能量方程将焓近似写成 <span class=\"kb-math kb-math-inline\">h=C_pT</span>，残差为</p>\n<div class=\"kb-math kb-math-display\">r_T =\n\\rho\\left(h_t + u h_x + v h_y\\right)\n- k\\left(T_{xx}+T_{yy}\\right).</div>\n<div class=\"key-point\">💡 关键：所有导数都由自动微分从同一个网络输出得到，所以速度、压力和温度不会被分别拟合后再拼接，而是在反向传播中共享一组参数和互相牵制的物理约束。</div>\n<h5>Fourier 特征与空间-时间分解</h5>\n<p>金属凝固常见局部高温梯度、液固界面附近快速变化和局部流动结构，普通 MLP 的低频偏置容易把这些变化抹平。MS-PINN 的公开实现使用 <code>MLPWithFFE</code>，对空间 <span class=\"kb-math kb-math-inline\">\\mathbf{x}=(x,y)</span> 和时间 <span class=\"kb-math kb-math-inline\">t</span> 分别构造多尺度 Fourier 特征：</p>\n<div class=\"kb-math kb-math-display\">\\gamma_{\\sigma_x}(\\mathbf{x}) =\n\\left[\\sin(\\mathbf{x}W_{\\sigma_x}),\\ \\cos(\\mathbf{x}W_{\\sigma_x})\\right],\n\\quad\n\\gamma_{\\sigma_t}(t) =\n\\left[\\sin(tW_{\\sigma_t}),\\ \\cos(tW_{\\sigma_t})\\right].</div>\n<p>实现中会对多个 <span class=\"kb-math kb-math-inline\">\\sigma</span> 的特征逐元素相乘，形成空间特征 <span class=\"kb-math kb-math-inline\">H_x</span> 与时间特征 <span class=\"kb-math kb-math-inline\">H_t</span>，再经共享 MLP 编码并相乘融合：</p>\n<div class=\"kb-math kb-math-display\">H = \\operatorname{MLP}_x(H_x)\\odot \\operatorname{MLP}_t(H_t),\n\\quad\n\\hat{\\mathbf{s}}_\\theta = \\operatorname{Linear}(H).</div>\n<p>这种做法的直觉是：空间高频与时间高频先分别展开，再通过乘性融合表达“某个局部区域在某个时间阶段发生快速变化”的耦合模式，比简单拼接 <span class=\"kb-math kb-math-inline\">(x,y,t)</span> 更适合相变和流动共同演化的场景。</p>\n<h5>损失函数与自适应权重</h5>\n<p>基础损失可以写成</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{pde}\n=\n\\sum_{q\\in\\{u,v,c,T\\}} \\omega_q\n\\frac{1}{N_f}\\sum_{i=1}^{N_f}\n\\left|r_q(x_i,y_i,t_i)\\right|^2,</div>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{bc}\n=\n\\sum_j \\beta_j\n\\frac{1}{N_b}\\sum_{i=1}^{N_b}\n\\left|\\hat{s}_{\\theta,j}(x_i,y_i,t_i)-s_{j,i}^{bc}\\right|^2.</div>\n<p>公开代码还启用了 self-adaptive loss，将 PDE 与边界误差放入可学习尺度参数中：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}\n=\n\\frac{1}{2\\exp(2s_1)}\\mathcal{L}_{pde}\n+\n\\frac{1}{2\\exp(2s_2)}\\mathcal{L}_{bc}\n+ s_1+s_2.</div>\n<p>当某一类损失数值大且难优化时，可学习尺度会动态调整其影响，避免固定权重下“边界项压过 PDE”或“PDE 项压过数据”的问题。对金属凝固这类多场问题，这一点很重要，因为动量、连续性、能量方程的量纲和数值范围差异明显。</p>\n<h5>RAR/RAD 如何补点</h5>\n<p>PINN 的配点如果均匀撒在全域，局部界面、边界层或高梯度区域可能采样不足。MS-PINN 启用残差自适应补点：每隔固定 epoch 在 <span class=\"kb-math kb-math-inline\">[0,0.05]\\times[0,0.05]\\times[0,5]</span> 的时空域重新采样候选点，计算这些点的 PDE 残差，并把选中的候选点追加到配点集合。</p>\n<p>这一机制的物理意义是把训练预算从“已经满足方程的平滑区域”转移到“方程违反更明显的区域”。在凝固建模里，这通常对应温度快速变化、流动剪切更强或压力-速度耦合更难满足的位置。</p>\n<h5>与普通 PINN 的区别</h5>\n<p>普通 PINN 通常写成一个标量场或少量变量的残差最小化问题，而 MS-PINN 的重点是多场耦合和工程过程建模。它不仅要求每个场分别拟合边界/观测数据，还要求速度、压力和温度在相同配点上共同满足动量守恒、质量守恒和能量守恒。</p>\n<p>与“先用 CFD 生成数据、再训练代理模型”的流程相比，MS-PINN 的物理残差让无标签配点也参与训练，理论上可以减少对高密度 CFD 标签的依赖。与传统 CFD 相比，它牺牲了严格网格离散求解的确定性，换取可微、可快速推理、可与稀疏观测融合的神经场表达。</p>\n<div class=\"warn-box\">⚠️ 注意：由于可访问来源主要是公开仓库而不是论文全文，实验误差、消融表格和正式论文中的全部设定无法在此核验；本文只对公开可验证的方法机制作解读。</div>",
      "quiz": {
        "q": "MS-PINN 中 Fourier Feature Encoding 的主要作用是什么？",
        "options": [
          "把 PDE 残差替换成纯数据监督损失",
          "增强网络表示空间和时间高频变化的能力",
          "直接生成 CFD 网格并求解线性方程组",
          "把温度场从模型输出中移除"
        ],
        "answer": 1,
        "explain": "公开实现对空间和时间分别使用多尺度 sin/cos 映射，再经 MLP 融合，用于缓解普通 MLP 的低频偏置，更好表达凝固过程中的局部高梯度和瞬态变化。"
      }
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
      "summary": "DC-PINNs 将单纯最小化 PDE 残差的 PINN 扩展为“PDE + 边界/初值 + 导数不等式约束”的多目标优化框架，用自动微分显式约束单调性、凸性、上下界和不可压缩等导数关系，从而减少物理不可行解。",
      "keyPoints": [
        "<strong>导数约束统一形式</strong>：把约束写为 <span class=\"kb-math kb-math-inline\">h(\\mathbf{x},\\mathcal{D}_h u_\\theta)\\le 0</span>，支持梯度、Hessian、方向导数、散度等条件",
        "<strong>一侧惩罚机制</strong>：对不等式只惩罚违反部分 <span class=\"kb-math kb-math-inline\">[h]_+=\\max(h,0)</span>，不干扰已经满足物理约束的区域",
        "<strong>四类损失分组</strong>：监督/初值 <span class=\"kb-math kb-math-inline\">\\mathcal{L}_0</span>、边界 <span class=\"kb-math kb-math-inline\">\\mathcal{L}_b</span>、PDE 残差 <span class=\"kb-math kb-math-inline\">\\mathcal{L}_f</span>、导数约束 <span class=\"kb-math kb-math-inline\">\\mathcal{L}_h</span>",
        "<strong>样本级自适应权重</strong>：对每类 loss 内部的单个约束点使用 <span class=\"kb-math kb-math-inline\">m_\\chi^{(j)}</span> 调整影响，使严重违反约束的点更容易被优化器看到",
        "<strong>类别级自适应权重</strong>：用各类损失对网络参数的平均绝对梯度更新 <span class=\"kb-math kb-math-inline\">\\lambda_\\chi</span>，缓解 PDE、边界、导数约束量级不一致的问题",
        "<strong>基准覆盖三类物理场景</strong>：带上下界的热扩散、无套利约束下的局部波动率曲面、含涡脱落的 Navier-Stokes 流动",
        "<strong>与硬约束方法对比</strong>：论文对比 PINNs+固定不等式惩罚、hPINN、penalty、augmented Lagrangian 等，强调 DC-PINNs 在减少约束违反和稳定性指标上的优势"
      ],
      "detail": "<h5>图示与可访问来源</h5>\n<p><img alt=\"DC-PINNs 指标改进图\" src=\"https://arxiv.org/html/2604.13723v1/DC-PINNs_metrics_bar.png\" />\n<em>图：论文 Figure 7，展示 DC-PINNs 相对普通 PINNs 在多项指标上的百分比改进。</em></p>\n<p><img alt=\"DC-PINNs 热方程预测示例\" src=\"https://arxiv.org/html/2604.13723v1/DC-PINNs_1DHeat2.png\" />\n<em>图：论文 Figure 1，一维热方程预测与误差。该例用于说明仅有 PDE 残差较小时，显式导数/范围约束仍能改善物理可行性。</em></p>\n<p>可访问来源说明：任务给出的 APS URL 与 arXiv 记录的 Related DOI 不完全一致；可访问全文为 <code>https://arxiv.org/abs/2604.13723</code> 和 HTML <code>https://arxiv.org/html/2604.13723v1</code>。arXiv 记录显示论文题为 <em>Physics-Informed Neural Networks for Solving Derivative-Constrained PDEs</em>，已被 Phys. Rev. E 接收，Related DOI 为 <code>10.1103/5bbf-p6zk</code>。</p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># DC-PINNs with balancing processes\ninitialize theta\ninitialize category weights lambda_chi = 1 for chi in {0, b, f, h}\ninitialize sample weights m_chi = ones_like(points_chi)\n\nfor k in range(max_steps):\n    # 1. 前向预测与自动微分\n    u0 = net_theta(x0)\n    ub = net_theta(xb)\n    uf = net_theta(xf)\n    uh = net_theta(xh)\n    derivatives_f = autodiff(uf, xf)\n    derivatives_h = autodiff(uh, xh)\n\n    # 2. 分组损失\n    L0 = mse(u0, y0)\n    Lb = mse(boundary_operator(ub), boundary_value)\n    Lf = mean_square(pde_residual(xf, derivatives_f))\n    Lh = mean_square(relu(h_constraint(xh, derivatives_h)))\n\n    # 3. 样本级与类别级加权\n    L_hat = {\n        0: weighted_mean(m_0, L0),\n        b: weighted_mean(m_b, Lb),\n        f: weighted_mean(m_f, Lf),\n        h: weighted_mean(m_h, Lh),\n    }\n    loss = sum(lambda_chi[chi] * L_hat[chi] for chi in {0, b, f, h})\n\n    # 4. 定期增强违反严重的样本权重\n    if k % p_m == 0:\n        m_chi += eta_m * grad(L_hat_chi, m_chi)\n\n    # 5. 定期按梯度量级平衡类别权重\n    if k % p_lambda == 0:\n        alpha_chi = mean_abs(grad(L_hat_chi, theta))\n        lambda_chi += sum(alpha_all) / alpha_chi\n\n    # 6. 更新网络\n    theta -= eta * grad(loss, theta)\n</code></pre>\n<h5>问题形式：把物理解读为可行域</h5>\n<p>标准 PINN 主要要求神经网络输出 <span class=\"kb-math kb-math-inline\">u_\\theta</span> 满足 PDE 和边界条件：</p>\n<div class=\"kb-math kb-math-display\">f(\\mathbf{x},\\mathcal{D}u_\\theta)=0,\\quad\nb(\\mathbf{x},\\mathcal{D}u_\\theta)=0.</div>\n<p>但很多物理问题还要求导数满足额外条件。例如金融期权曲面不能违反无套利单调/凸性条件，流体速度场要满足不可压缩约束，温度或浓度场可能存在梯度方向和上下界要求。DC-PINNs 将这类问题写为</p>\n<div class=\"kb-math kb-math-display\">\\hat{\\theta}\n=\n\\arg\\min_{\\theta}\\mathcal{L}(\\mathbf{x},\\mathcal{D}u_\\theta)\n\\quad \\text{s.t.}\\quad\n\\begin{cases}\nf(\\mathbf{x},\\mathcal{D}u_\\theta)=0, &amp; \\mathbf{x}\\in\\Omega,\\\\\nb(\\mathbf{x},\\mathcal{D}u_\\theta)=0, &amp; \\mathbf{x}\\in\\partial\\Omega,\\\\\nh(\\mathbf{x},\\mathcal{D}_h u_\\theta)\\le 0, &amp; \\mathbf{x}\\in\\Omega.\n\\end{cases}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\mathcal{D}_h</span> 是参与约束的导数集合。典型例子包括单调性 <span class=\"kb-math kb-math-inline\">\\nabla u\\ge 0</span>、方向凸性 <span class=\"kb-math kb-math-inline\">\\operatorname{diag}(\\nabla^2u)\\ge 0</span>、斜率上界 <span class=\"kb-math kb-math-inline\">\\|\\nabla u\\|\\le L</span> 和散度约束 <span class=\"kb-math kb-math-inline\">\\nabla\\cdot \\mathbf{u}=0</span>。</p>\n<h5>一侧导数惩罚</h5>\n<p>不等式约束的关键是不能把“满足约束的点”也继续推离原解。因此 DC-PINNs 使用一侧惩罚：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_h\n=\n\\frac{1}{N_h}\\sum_{i=1}^{N_h}\n\\left[\\max\\left(h(\\mathbf{x}_i,\\mathcal{D}_h u_\\theta),0\\right)\\right]^2.</div>\n<p>如果 <span class=\"kb-math kb-math-inline\">h\\le 0</span>，该点没有惩罚；只有 <span class=\"kb-math kb-math-inline\">h&gt;0</span> 的物理违规区域会产生梯度。这比把导数值强行拟合到某个固定目标更稳健，因为很多物理规律只给出可行域，而不指定唯一导数值。</p>\n<h5>多目标损失与自适应平衡</h5>\n<p>论文将训练损失分成四类：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}\n=\n\\sum_{\\chi\\in\\{0,b,f,h\\}}\n\\lambda_\\chi\\,\n\\hat{\\mathcal{L}}_\\chi(m_\\chi,x_\\chi).</div>\n<p><span class=\"kb-math kb-math-inline\">\\chi=0</span> 表示监督/初值数据，<span class=\"kb-math kb-math-inline\">b</span> 表示边界，<span class=\"kb-math kb-math-inline\">f</span> 表示 PDE，<span class=\"kb-math kb-math-inline\">h</span> 表示导数约束。每一类内部有样本级权重 <span class=\"kb-math kb-math-inline\">m_\\chi</span>，类别之间有动态乘子 <span class=\"kb-math kb-math-inline\">\\lambda_\\chi</span>。</p>\n<p>样本级更新为</p>\n<div class=\"kb-math kb-math-display\">m_\\chi^{(j)}(k+1)\n=\nm_\\chi^{(j)}(k)\n+\\eta_m\\nabla_{m_\\chi^{(j)}}\\hat{\\mathcal{L}}_\\chi(k),</div>\n<p>直觉是让大违反点获得更高关注度。类别级权重则用梯度尺度调节：</p>\n<div class=\"kb-math kb-math-display\">\\lambda_\\chi(k+1)=\n\\begin{cases}\n1, &amp; \\alpha_\\chi=0,\\\\\n\\lambda_\\chi(k)+\n\\dfrac{\\sum_{\\chi&#x27;}\\alpha_{\\chi&#x27;}}{\\alpha_\\chi}, &amp; \\text{otherwise},\n\\end{cases}\n\\quad\n\\alpha_\\chi=\n\\overline{\\left|\\nabla_\\theta \\hat{\\mathcal{L}}_\\chi(k)\\right|}.</div>\n<div class=\"key-point\">💡 关键：导数不等式的梯度通常很稀疏，因为大多数点可能已经满足约束。用平均绝对梯度而不是平方梯度，有助于保留少数严重违规点对训练方向的影响。</div>\n<h5>为什么普通 PINN 不够</h5>\n<p>普通 PINN 可以把 PDE 残差压低，但 PDE 残差小并不必然代表解在工程上可用。以局部波动率为例，价格曲面即便满足 Black-Scholes 型 PDE，也可能出现负局部方差、非单调或非凸结构；以不可压缩流为例，压力梯度和速度场导数关系的微小不一致会累积成错误涡结构。</p>\n<p>DC-PINNs 的设计把这些“PDE 外但物理上必须成立”的条件直接写进训练目标。它不是替代 PINN 的 PDE 残差，而是在同一网络、同一自动微分图上增加可行域约束，使优化目标从“方程残差最小”变成“方程残差小且位于物理可行域”。</p>\n<h5>与硬约束和固定惩罚的区别</h5>\n<p>硬约束方法在存在解析输出变换时很强，例如把输出限制在 <span class=\"kb-math kb-math-inline\">[u_{\\min},u_{\\max}]</span>：</p>\n<div class=\"kb-math kb-math-display\">\\psi_\\theta^{hard}\n=\nu_{\\min}+(u_{\\max}-u_{\\min})\\psi(\\mathbf{x}).</div>\n<p>但很多导数约束没有简单的解析变换，例如 <span class=\"kb-math kb-math-inline\">u_x\\le U</span> 或 Hessian 半正定。固定惩罚和 augmented Lagrangian 可以处理这些约束，但容易引入额外超参数、外循环和优化刚性。DC-PINNs 的优势在于保留软惩罚的通用性，同时用 <span class=\"kb-math kb-math-inline\">m_\\chi</span> 和 <span class=\"kb-math kb-math-inline\">\\lambda_\\chi</span> 动态调节训练难度。</p>",
      "quiz": {
        "q": "DC-PINNs 中对不等式导数约束 h(x, D_h u) <= 0 使用 [h]_+ 的主要原因是什么？",
        "options": [
          "让所有导数都被强制拟合为 0",
          "只惩罚违反约束的点，不干扰已经物理可行的点",
          "避免使用自动微分计算导数",
          "把边界条件从损失函数中删除"
        ],
        "answer": 1,
        "explain": "[h]_+ = max(h, 0) 是一侧惩罚；当约束已经满足时惩罚为 0，只有 h>0 的违规区域参与优化。"
      }
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
      "summary": "SIMPLE-PINN 将 CFD 中 SIMPLE 算法的压力-速度修正思想转化为 PINN 的额外残差修正损失，使网络在训练时持续强化不可压缩 Navier-Stokes 方程中的速度-压力耦合，从而改善高 Reynolds 数、长时间涡脱落和复杂几何流动中的收敛稳定性。",
      "keyPoints": [
        "<strong>压力-速度修正损失</strong>：从 SIMPLE 的压力修正、速度修正关系推导 <span class=\"kb-math kb-math-inline\">RC_p, RC_u, RC_v</span>，加入 PINN 总损失",
        "<strong>不可压缩 N-S 主任务</strong>：网络预测 <span class=\"kb-math kb-math-inline\">[u_\\theta(x,y,t),v_\\theta(x,y,t),p_\\theta(x,y,t)]</span>，同时约束质量守恒和动量守恒",
        "<strong>简化 FVM 残差</strong>：在规则流体内部点使用有限体积模板计算 PDE 残差，提高对局部通量平衡的表达",
        "<strong>AD + FVM 混合策略</strong>：靠近不规则边界时改用自动微分残差，避免 FVM 邻点落入固体区域造成 stencil 失效",
        "<strong>二阶外推避免未来值不可用</strong>：训练中用 <span class=\"kb-math kb-math-inline\">q^{n+1}\\approx 2q^n-q^{n-1}</span> 估计修正损失所需的下一步量",
        "<strong>频率退火映射与分支 MLP</strong>：输入 <span class=\"kb-math kb-math-inline\">(t,x,y)</span> 先映射到高维频率特征，再进入共享层与变量专属输出层",
        "<strong>强非线性基准</strong>：论文报告了高 Re lid-driven cavity、wavy channel、NACA0012 翼型、多方柱、圆柱绕流和 Rayleigh-Taylor 多物理问题",
        "<strong>来源限制</strong>：任务给出的 ResearchGate 链接实际解析到一篇制裁法文章；可访问论文为 arXiv:2603.24013"
      ],
      "detail": "<h5>图示与可访问来源</h5>\n<p><img alt=\"SIMPLE-PINN 框架图\" src=\"https://arxiv.org/html/2603.24013v1/pictures/fig1.png\" />\n<em>图：论文 Figure 1，展示 SIMPLE-PINN 框架、高 Reynolds 数方腔流、圆柱绕流长时间预测和多物理耦合示例。</em></p>\n<p><img alt=\"复杂几何中的 FVM 与 AD 混合策略\" src=\"https://arxiv.org/html/2603.24013v1/pictures/FVM_AD.png\" />\n<em>图：论文 Figure 3。内部规则点使用简化 FVM 残差，靠近任意形状固体边界的点使用 AD 残差，边界点单独施加软约束。</em></p>\n<p>可访问来源说明：真实论文条目为 <code>https://arxiv.org/abs/2603.24013</code>，HTML 全文为 <code>https://arxiv.org/html/2603.24013v1</code>，题名为 <em>Bridging Computational Fluid Dynamics Algorithm and Physics-Informed Learning: SIMPLE-PINN for Incompressible Navier-Stokes Equations</em>。任务中的 ResearchGate URL <code>385794553</code> 与该论文不匹配，因此本文按可访问 arXiv 论文解读。</p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># SIMPLE-PINN 训练逻辑简化版\ninitialize network u_theta, v_theta, p_theta\ncache previous predictions q_prev = None\n\nfor step in range(max_steps):\n    # 1. 采样内部点、边界点和复杂几何附近点\n    points_fvm, points_ad, points_bc = sample_domain()\n\n    # 2. 规则内部点：用简化 FVM 模板计算连续性和动量残差\n    Res_c, Res_u, Res_v = finite_volume_residual(\n        network, points_fvm, neighbors=[&quot;E&quot;, &quot;W&quot;, &quot;N&quot;, &quot;S&quot;]\n    )\n\n    # 3. 不规则边界邻域：改用自动微分 PDE 残差\n    Res_ad = autodiff_navier_stokes_residual(network, points_ad)\n\n    # 4. SIMPLE 启发的压力/速度修正\n    q_now = network(points_fvm)\n    q_next = 2 * q_now - q_prev if q_prev is not None else q_now\n    R_p, R_u, R_v = simple_correction_terms(network, points_fvm)\n    RC_p = mean_abs(q_next.p - q_now.p - alpha_p * R_p)\n    RC_u = mean_abs(q_next.u - q_now.u - alpha_u * R_u)\n    RC_v = mean_abs(q_next.v - q_now.v - alpha_v * R_v)\n\n    # 5. 总损失\n    loss = W_pde * (Res_c + Res_u + Res_v + Res_ad) \\\n           + W_bc * boundary_loss(network, points_bc) \\\n           + W_rc * (RC_p + RC_u + RC_v)\n    update_network_with_adam(loss)\n    q_prev = stop_gradient(q_now)\n</code></pre>\n<h5>标准 PINN 在流体问题中的痛点</h5>\n<p>二维不可压缩 Navier-Stokes 方程写作</p>\n<div class=\"kb-math kb-math-display\">\\frac{\\partial u}{\\partial x}+\\frac{\\partial v}{\\partial y}=0,</div>\n<div class=\"kb-math kb-math-display\">\\frac{\\partial u}{\\partial t}\n+\\frac{\\partial(uu)}{\\partial x}\n+\\frac{\\partial(vu)}{\\partial y}\n=\n\\frac{1}{Re}\\left(\n\\frac{\\partial^2u}{\\partial x^2}\n+\\frac{\\partial^2u}{\\partial y^2}\n\\right)\n-\\frac{\\partial p}{\\partial x},</div>\n<div class=\"kb-math kb-math-display\">\\frac{\\partial v}{\\partial t}\n+\\frac{\\partial(uv)}{\\partial x}\n+\\frac{\\partial(vv)}{\\partial y}\n=\n\\frac{1}{Re}\\left(\n\\frac{\\partial^2v}{\\partial x^2}\n+\\frac{\\partial^2v}{\\partial y^2}\n\\right)\n-\\frac{\\partial p}{\\partial y}.</div>\n<p>普通 PINN 会把连续性残差、动量残差、边界条件和初值条件加权求和：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}\n=\nW_{\\mathrm{PDE}}\\mathcal{L}_{\\mathrm{PDE}}\n+W_{\\mathrm{IC}}\\mathcal{L}_{\\mathrm{IC}}\n+W_{\\mathrm{BC}}\\mathcal{L}_{\\mathrm{BC}}.</div>\n<p>问题在于速度和压力之间没有像 CFD 压力修正算法那样的显式迭代耦合。高 <span class=\"kb-math kb-math-inline\">Re</span> 或长时间非定常流中，网络可能把动量残差和连续性残差分别压低一点，但速度场仍然存在局部散度误差，压力场也不能稳定地驱动速度修正。</p>\n<h5>SIMPLE 思想如何变成 PINN loss</h5>\n<p>经典 SIMPLE 算法通过压力修正 <span class=\"kb-math kb-math-inline\">p&#x27;</span> 迭代修正速度，使离散连续性方程逐步满足。SIMPLE-PINN 不直接运行 CFD 线性求解器，而是把这种修正关系改写成可微的损失项。论文将修正写成松弛形式：</p>\n<div class=\"kb-math kb-math-display\">p_P^{n+1}=p_P^n+\\alpha_p R_p,\n\\quad\nu_P^{n+1}=u_P^n+\\alpha_u R_u,\n\\quad\nv_P^{n+1}=v_P^n+\\alpha_v R_v.</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">R_p,R_u,R_v</span> 来自离散动量残差、连续性残差和相邻控制体压力/速度项；<span class=\"kb-math kb-math-inline\">\\alpha_p,\\alpha_u,\\alpha_v</span> 是松弛因子，用来避免修正过大导致训练震荡。</p>\n<p>对应的残差修正损失为</p>\n<div class=\"kb-math kb-math-display\">L_{rc,p}\n=\n\\frac{1}{N_{rc}}\n\\left\\|\np_P^{n+1}-p_P^n-\\alpha_pR_p\n\\right\\|_{L^1(\\Omega\\times(0,T])},</div>\n<div class=\"kb-math kb-math-display\">L_{rc,u}\n=\n\\frac{1}{N_{rc}}\n\\left\\|\nu_P^{n+1}-u_P^n-\\alpha_uR_u\n\\right\\|_{L^1(\\Omega\\times(0,T])},</div>\n<div class=\"kb-math kb-math-display\">L_{rc,v}\n=\n\\frac{1}{N_{rc}}\n\\left\\|\nv_P^{n+1}-v_P^n-\\alpha_vR_v\n\\right\\|_{L^1(\\Omega\\times(0,T])}.</div>\n<p>训练时 <span class=\"kb-math kb-math-inline\">n+1</span> 的值不能直接访问，论文用二阶外推估计：</p>\n<div class=\"kb-math kb-math-display\">p_P^{n+1}\\approx 2p_P^n-p_P^{n-1},\n\\quad\nu^{n+1}\\approx 2u^n-u^{n-1},\n\\quad\nv^{n+1}\\approx 2v^n-v^{n-1}.</div>\n<p>所以最终加入训练的修正项等价于要求“本轮预测相对上一轮预测的变化”接近 SIMPLE 推导出的物理修正方向。</p>\n<div class=\"key-point\">💡 关键：这不是把 SIMPLE 算法外接在 PINN 后处理，而是把 SIMPLE 的压力-速度耦合方向变成反向传播中的损失梯度。</div>\n<h5>简化 FVM 与 AD 混合残差</h5>\n<p>SIMPLE-PINN 的 PDE 残差不是只靠自动微分。对规则内部点，它使用控制体周围 E/W/N/S 邻点构造简化有限体积残差，例如连续性残差可理解为控制体表面的通量不平衡：</p>\n<div class=\"kb-math kb-math-display\">Res_c\n=\n\\frac{1}{N_{\\mathrm{PDE}}}\n\\left\\|\nu_e-u_w+v_n-v_s\n\\right\\|_{L^2}.</div>\n<p>动量残差则包含中心点、邻点和边界/压力项：</p>\n<div class=\"kb-math kb-math-display\">Res_u\n=\n\\frac{1}{N_{\\mathrm{PDE}}}\n\\left\\|\n\\left(\\frac{\\Delta x\\Delta y}{\\delta t}+a_P\\right)u_P^n\n+\\sum a_{NB}u_{NB}^n\n+\\sum a_{nb}^n u_{nb}^n\n+b_{P,u}^n\n\\right\\|_{L^2},</div>\n<p><span class=\"kb-math kb-math-inline\">Res_v</span> 对 <span class=\"kb-math kb-math-inline\">v</span> 同理。</p>\n<p>在复杂几何附近，如果某个内部点的四邻点落入固体区域，FVM stencil 就失效。论文因此把点分为三类：普通流体内部点用简化 FVM，靠近固体边界的红色点用 AD 残差，边界点施加边界损失。这种混合策略保留了 FVM 的局部守恒结构，又避免了复杂几何下生成高质量网格的负担。</p>\n<h5>总损失结构</h5>\n<p>SIMPLE-PINN 的训练目标可以概括为</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\mathrm{SIMPLE}}\n=\n\\mathcal{L}_{\\mathrm{BC}}\n+\\mathcal{L}_{\\mathrm{IC}}\n+W_{\\mathrm{PDE}}\n\\left(Res_c+Res_u+Res_v+Res_{\\mathrm{AD}}\\right)\n+W_{\\mathrm{RC}}\n\\left(RC_p+RC_u+RC_v\\right).</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">RC_p,RC_u,RC_v</span> 是 SIMPLE 压力-速度修正项，<span class=\"kb-math kb-math-inline\">Res_{\\mathrm{AD}}</span> 只在复杂几何附近补充。与只堆 PDE residual 的 PINN 相比，这个 loss 同时约束“方程是否成立”和“速度压力应该如何一起被修正”。</p>\n<h5>网络结构与训练设置</h5>\n<p>论文使用 MLP 作为主干。输入层先用 frequency annealing mapping 将 <span class=\"kb-math kb-math-inline\">(t,x,y)</span> 投影到高维频率空间，以提高对边界层、涡结构和高频扰动的表达能力。随后是共享隐藏层，再接变量专属分支输出 <span class=\"kb-math kb-math-inline\">u,v,p</span>；Rayleigh-Taylor 问题额外输出温度 <span class=\"kb-math kb-math-inline\">T</span>。训练使用 Adam 和 warmup cosine decay 学习率策略。</p>\n<p>论文报告的代表性结果包括：在无数据监督条件下求解 <span class=\"kb-math kb-math-inline\">Re=20000</span> 的 lid-driven cavity flow，用 448 秒得到结果；圆柱绕流可预测 <span class=\"kb-math kb-math-inline\">t=0</span> 到 <span class=\"kb-math kb-math-inline\">100</span> 的涡脱落长期演化。这里的重点不是替代所有 CFD 求解器，而是把 CFD 的数值算法知识嵌入神经网络训练，使 PINN 在强非线性流动上更像一个带数值先验的神经求解器。</p>",
      "quiz": {
        "q": "SIMPLE-PINN 相比普通 PINN 增加 RC_p、RC_u、RC_v 的主要目的是什么？",
        "options": [
          "减少网络输出变量，只保留压力",
          "把 SIMPLE 的压力-速度修正关系转化为训练损失，强化不可压缩流中的耦合约束",
          "完全取消 Navier-Stokes 方程残差",
          "只用于可视化，不参与反向传播"
        ],
        "answer": 1,
        "explain": "RC_p、RC_u、RC_v 来自 SIMPLE 修正关系，作为额外 loss 引导速度和压力按满足连续性的方向共同更新，从而改善训练稳定性和收敛速度。"
      }
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
      "summary": "FNO 将神经算子中的积分核直接参数化到傅里叶空间，用少量低频模态的可学习复权重实现高效全局卷积，解决了传统 CNN/PDE surrogate 绑定固定网格、难以跨分辨率泛化的问题。",
      "keyPoints": [
        "<strong>函数空间到函数空间映射</strong>：直接学习 PDE 参数函数到解函数的算子 <span class=\"kb-math kb-math-inline\">\\mathcal{G}: a \\mapsto u</span>，而不是为每个 PDE 实例单独训练网络",
        "<strong>Fourier layer</strong>：每层由局部线性变换 <span class=\"kb-math kb-math-inline\">Wv(x)</span>、傅里叶域低模态线性变换 <span class=\"kb-math kb-math-inline\">R\\cdot \\mathcal{F}(v)</span>、逆变换和非线性激活组成",
        "<strong>低模态截断</strong>：只保留前 <span class=\"kb-math kb-math-inline\">k_{\\max}</span> 个傅里叶模态，高频被截断，从而以少量参数表达全局相互作用",
        "<strong>离散化不变性</strong>：参数定义在频率模态上，同一组权重可在不同网格分辨率上评估，支持 zero-shot super-resolution",
        "<strong>准线性复杂度</strong>：均匀网格上通过 FFT 实现，主计算复杂度约为 <span class=\"kb-math kb-math-inline\">O(n \\log n)</span>，显著快于直接积分核或完整图消息传递",
        "<strong>标准结构</strong>：输入先经 <span class=\"kb-math kb-math-inline\">P</span> lift 到高维通道，堆叠 4 个 Fourier layers，再经 <span class=\"kb-math kb-math-inline\">Q</span> project 回目标物理量",
        "<strong>验证任务</strong>：在 Burgers 方程、Darcy Flow、Navier-Stokes 湍流上优于 FCN、PCANN、GNO、MGNO、U-Net 等基线，并能在 Navier-Stokes 上做零样本超分辨率"
      ],
      "detail": "<h5>核心架构示意</h5>\n<p><img alt=\"FNO 架构与 Fourier layer 示意图\" src=\"https://ar5iv.labs.arxiv.org/html/2010.08895/assets/figs/fourier_full_arch5.png\" />\n<em>图：FNO 的整体架构与 Fourier layer。输入函数先被 lift 到高维通道，随后每层在傅里叶域对低频模态做可学习线性变换，同时保留空间域局部线性支路，最后 project 到目标解函数。来源为 ar5iv 对 arXiv:2010.08895 的 HTML 渲染图。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># Fourier Neural Operator 前向传播伪代码\ndef spectral_conv(v, R, modes):\n    # v: [batch, channels_in, *grid]\n    v_hat = fftn(v)                                  # 进入频域\n    out_hat = zeros_like_target_modes(v_hat, R)\n\n    # 只在低频模态上学习复数线性变换\n    for k in low_frequency_indices(modes):\n        out_hat[:, :, k] = R[k] @ v_hat[:, :, k]     # channel mixing in Fourier space\n\n    return ifftn(out_hat).real                       # 回到物理空间\n\ndef fno_forward(a, coords):\n    # a: PDE 参数/初值/系数字段；coords: 网格坐标，用于保留位置信息\n    v = P(concat(a, coords))                         # lift: R^{d_a+d_x} -&gt; R^c\n\n    for layer in range(L):\n        global_term = spectral_conv(v, R[layer], modes)\n        local_term = pointwise_linear[layer](v)       # W v(x)\n        v = activation(global_term + local_term)\n\n    u_pred = Q(v)                                    # project: R^c -&gt; R^{d_u}\n    return u_pred\n\nfor a_batch, u_batch in dataloader:\n    pred = fno_forward(a_batch, coords)\n    loss = relative_l2(pred, u_batch)\n    loss.backward()\n    optimizer.step()\n</code></pre>\n<h5>动机与背景</h5>\n<p>传统有限差分、有限元或谱方法需要对每个新的 PDE 参数实例重新求解；纯 CNN surrogate 虽然推理快，但本质上学习的是固定维度向量到固定维度向量的映射，网络结构和误差都强绑定训练分辨率。神经算子的目标是学习连续函数空间上的映射：给定参数函数 <span class=\"kb-math kb-math-inline\">a(x)</span>、初始场或边界条件，直接输出解函数 <span class=\"kb-math kb-math-inline\">u(x)</span>。这样训练一次后，新参数实例只需一次前向传播。</p>\n<p>一般神经算子可写成迭代更新：</p>\n<div class=\"kb-math kb-math-display\">v_{t+1}(x)=\\sigma\\left(Wv_t(x)+(\\mathcal{K}_{\\phi}v_t)(x)\\right),</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">Wv_t(x)</span> 是点态局部变换，<span class=\"kb-math kb-math-inline\">\\mathcal{K}_{\\phi}</span> 是非局部积分算子：</p>\n<div class=\"kb-math kb-math-display\">(\\mathcal{K}_{\\phi}v)(x)=\\int_D \\kappa_{\\phi}(x,y)v(y)\\,dy.</div>\n<p>GNO 用图消息传递近似这个积分，但在密集网格上成本较高。FNO 的关键假设是把积分核限制为平移不变卷积核 <span class=\"kb-math kb-math-inline\">\\kappa(x-y)</span>，再利用卷积定理把积分计算变成傅里叶域乘法。</p>\n<h5>核心机制：傅里叶域参数化积分核</h5>\n<p>FNO 的 Fourier layer 定义为：</p>\n<div class=\"kb-math kb-math-display\">v_{t+1}(x)=\\sigma\\left(Wv_t(x)+\\mathcal{F}^{-1}\\left(R_{\\phi}\\cdot \\mathcal{F}(v_t)\\right)(x)\\right).</div>\n<p>这里 <span class=\"kb-math kb-math-inline\">\\mathcal{F}</span> 和 <span class=\"kb-math kb-math-inline\">\\mathcal{F}^{-1}</span> 分别是 Fourier transform 与 inverse Fourier transform，<span class=\"kb-math kb-math-inline\">R_{\\phi}</span> 是可学习的复数权重张量。对第 <span class=\"kb-math kb-math-inline\">k</span> 个频率模态，频域线性变换可写为：</p>\n<div class=\"kb-math kb-math-display\">\\widehat{u}_{k,i}=\\sum_{j=1}^{c_{\\text{in}}} R_{k,i,j}\\,\\widehat{v}_{k,j},\n\\qquad |k|\\le k_{\\max}.</div>\n<p>当 <span class=\"kb-math kb-math-inline\">|k|&gt;k_{\\max}</span> 时，高频模态直接置零或不更新。这个设计有两个效果：第一，低频模态捕获 PDE 解中长程、全局、主导能量结构；第二，参数量与保留模态数相关，而不是与网格点数直接相关，因此同一组 <span class=\"kb-math kb-math-inline\">R_k</span> 可以在 <span class=\"kb-math kb-math-inline\">64^2</span>、<span class=\"kb-math kb-math-inline\">128^2</span>、<span class=\"kb-math kb-math-inline\">256^2</span> 等不同分辨率上复用。</p>\n<div class=\"key-point\">💡 关键：FNO 不是把 FFT 当作预处理特征，而是把 Fourier transform 放进每一层，作为神经算子积分核的可学习计算方式。</div>\n<h5>训练与数据流</h5>\n<p>完整 FNO 由三部分组成：</p>\n<ol>\n<li><span class=\"kb-math kb-math-inline\">P</span>：将输入 <span class=\"kb-math kb-math-inline\">(a(x), x)</span> 从低维物理通道 lift 到宽通道表示 <span class=\"kb-math kb-math-inline\">v_0(x)</span></li>\n<li>多个 Fourier layers：交替执行全局谱卷积、点态线性变换和非线性激活</li>\n<li><span class=\"kb-math kb-math-inline\">Q</span>：将最终隐藏场 <span class=\"kb-math kb-math-inline\">v_T(x)</span> project 为目标解 <span class=\"kb-math kb-math-inline\">u(x)</span></li>\n</ol>\n<p>训练通常最小化相对 <span class=\"kb-math kb-math-inline\">L_2</span> 误差：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}(\\theta)=\\frac{1}{N}\\sum_{j=1}^{N}\n\\frac{\\|\\mathcal{G}_{\\theta}(a_j)-u_j\\|_2}{\\|u_j\\|_2}.</div>\n<p>论文实验中，模型学习 Burgers 方程的初值到终态映射、Darcy Flow 的扩散系数到压力场映射，以及 Navier-Stokes 的历史涡量场到未来涡量场映射。对时间依赖问题，FNO 可以用 2D 空间卷积自回归推进，也可以把空间-时间一起作为 3D 张量做 FNO-3d。</p>\n<h5>与传统方法和 GNO 的区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>非局部交互</th>\n<th>网格依赖</th>\n<th>计算特征</th>\n<th>主要限制</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>CNN/FCN</td>\n<td>依靠局部卷积堆叠扩大感受野</td>\n<td>强依赖固定分辨率</td>\n<td><span class=\"kb-math kb-math-inline\">O(n)</span> 局部卷积</td>\n<td>跨分辨率泛化弱</td>\n</tr>\n<tr>\n<td>GNO</td>\n<td>图上消息传递近似积分核</td>\n<td>可处理不规则点</td>\n<td>边数相关，可能接近 <span class=\"kb-math kb-math-inline\">O(n^2)</span></td>\n<td>大网格成本高</td>\n</tr>\n<tr>\n<td>FNO</td>\n<td>FFT 实现全局卷积</td>\n<td>频域参数可跨分辨率</td>\n<td><span class=\"kb-math kb-math-inline\">O(n\\log n)</span></td>\n<td>标准形式偏好规则网格/周期边界</td>\n</tr>\n</tbody>\n</table></div>\n<p>FNO 的优势来自“全局线性算子 + 局部非线性激活”的组合：谱卷积让每个位置一层内看到全域信息，非线性激活使多层组合能够表达非线性 PDE 解算子。它也有清晰限制：FFT 要求规则网格，复杂几何和非均匀网格需要后续 Geo-FNO、GNO 或插值/变形策略处理。</p>",
      "quiz": {
        "q": "FNO 中 Fourier layer 只学习低频模态权重的主要原因是什么？",
        "options": [
          "低频模态与 PDE 解的全局结构强相关，同时可减少参数量并支持跨分辨率评估",
          "低频模态可以完全恢复任意非周期边界条件，因此不需要空间域分支",
          "高频模态无法通过 FFT 计算，只能通过有限元方法获得",
          "低频模态使网络退化为普通全连接网络，便于反向传播"
        ],
        "answer": 0,
        "explain": "FNO 在频域对少量低频模态学习复数线性变换，既捕获主导全局结构，又让参数量与网格分辨率解耦；空间域的 W 分支和非线性激活补充局部与非线性表达。"
      }
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
      "summary": "GNO 首次把神经算子具体实现为图核网络：在物理域采样点上构图，用消息传递近似连续积分核，从而学习 PDE 参数函数到解函数的离散化不变映射。",
      "keyPoints": [
        "<strong>神经算子概念实例化</strong>：学习 Banach 函数空间之间的算子 <span class=\"kb-math kb-math-inline\">\\mathcal{F}: \\mathcal{A}\\to\\mathcal{U}</span>，而不是固定维度数组映射",
        "<strong>Green's function 直觉</strong>：把 PDE 解算子看作积分核 <span class=\"kb-math kb-math-inline\">u(x)=\\int_D G_a(x,y)f(y)\\,dy</span>，用神经网络核 <span class=\"kb-math kb-math-inline\">\\kappa_{\\phi}</span> 学习非局部影响",
        "<strong>图消息传递积分</strong>：将空间点作为节点，边特征为 <span class=\"kb-math kb-math-inline\">(x,y,a(x),a(y))</span>，用邻域聚合近似积分算子",
        "<strong>连续半径构图</strong>：节点连接由物理空间球 <span class=\"kb-math kb-math-inline\">B(x,r)</span> 决定，而不是固定 kNN，因此网格细化时邻域随物理半径自然扩展",
        "<strong>Nyström 近似</strong>：训练时重复采样 <span class=\"kb-math kb-math-inline\">m\\ll K</span> 个节点形成子图，将大图核积分近似为随机子图上的 Monte Carlo/Nyström 估计",
        "<strong>支持非结构化网格</strong>：点云、有限元网格、随机采样点都可作为图节点，查询新位置时可把新点加入图并连边",
        "<strong>实验场景</strong>：重点验证二阶椭圆 PDE/Darcy 型问题的跨分辨率泛化、半监督采样和与 FCN、PCA+NN、RBM 等方法的比较"
      ],
      "detail": "<h5>核心图示与来源说明</h5>\n<p><img alt=\"GNO 低分辨率训练到高分辨率评估示意图\" src=\"https://ar5iv.labs.arxiv.org/html/2003.03485/assets/Figs/uai_16to241.png\" />\n<em>图：Graph Kernel Network 在 <span class=\"kb-math kb-math-inline\">16\\times16</span> 网格训练，并在 <span class=\"kb-math kb-math-inline\">241\\times241</span> 网格上评估椭圆 PDE 解。该图来自 ar5iv 对 arXiv:2003.03485 源文件 <code>Figs/uai_16to241.png</code> 的公开渲染。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># Graph Neural Operator / Graph Kernel Network 伪代码\ndef build_graph(points, a_values, radius):\n    edges = []\n    for i, x in enumerate(points):\n        for j, y in enumerate(points):\n            if distance(x, y) &lt;= radius:\n                edge_feature = concat(x, y, a_values[i], a_values[j])\n                edges.append((i, j, edge_feature))\n    return edges\n\ndef gno_forward(points, a_values, a_smooth, grad_a_smooth, edges):\n    # 初始特征包含坐标、系数、平滑系数及其梯度\n    v = P(concat(points, a_values, a_smooth, grad_a_smooth)) + p\n\n    for t in range(T):\n        messages = zeros_like(v)\n        degree = zeros(num_nodes)\n\n        for i, j, e_ij in edges:\n            K_ij = kernel_mlp_phi(e_ij)              # R^{2(d+1)} -&gt; R^{n x n}\n            messages[i] += K_ij @ v[j]\n            degree[i] += 1\n\n        messages = messages / clamp(degree, min=1)\n        v = relu(W @ v + messages)\n\n    u_pred = Q(v) + q                                # 投影回标量/向量解\n    return u_pred\n\nfor a, u in training_pairs:\n    for repeat in range(l):                          # Nyström 重采样\n        sub_points = sample_nodes(points, m)\n        sub_graph = build_graph(sub_points, a[sub_points], radius=r)\n        pred = gno_forward(sub_points, a[sub_points], ..., sub_graph)\n        loss = mse(normalize(pred), normalize(u[sub_points]))\n        loss.backward()\n        optimizer.step()\n</code></pre>\n<h5>动机与背景</h5>\n<p>标准 CNN surrogate 需要固定网格，输入和输出维度随分辨率改变而改变；PINN/Neural-FEM 虽然网格无关，但通常为每个新的 PDE 参数实例重新优化一个网络。GNO 试图在两者之间取一个函数空间视角：模型参数 <span class=\"kb-math kb-math-inline\">\\theta</span> 定义在连续域上的积分核中，离散网格只是数值近似这个积分核的采样方式。</p>\n<p>论文以参数化椭圆 PDE 为典型问题：</p>\n<div class=\"kb-math kb-math-display\">-\\nabla\\cdot(a(x)\\nabla u(x))=f(x),\\quad x\\in D,\\qquad u(x)=0,\\quad x\\in\\partial D.</div>\n<p>对固定 <span class=\"kb-math kb-math-inline\">a</span>，如果存在 Green's function <span class=\"kb-math kb-math-inline\">G_a(x,y)</span>，解可写作：</p>\n<div class=\"kb-math kb-math-display\">u(x)=\\int_D G_a(x,y)f(y)\\,dy.</div>\n<p>GNO 的核心思想是用可学习核 <span class=\"kb-math kb-math-inline\">\\kappa_{\\phi}(x,y,a(x),a(y))</span> 替代未知的 Green's function/积分核，并通过图上的消息传递来近似积分。</p>\n<h5>核心机制：从积分核到消息传递</h5>\n<p>连续形式的图核网络更新为：</p>\n<div class=\"kb-math kb-math-display\">v_{t+1}(x)=\\sigma\\left(Wv_t(x)+\n\\int_{B(x,r)}\\kappa_{\\phi}(x,y,a(x),a(y))v_t(y)\\,dy\\right).</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">v_t(x)\\in\\mathbb{R}^n</span> 是第 <span class=\"kb-math kb-math-inline\">t</span> 层隐藏函数，<span class=\"kb-math kb-math-inline\">W</span> 是点态线性变换，<span class=\"kb-math kb-math-inline\">\\kappa_{\\phi}</span> 是一个 MLP 输出的 <span class=\"kb-math kb-math-inline\">n\\times n</span> 矩阵。积分域限制在 <span class=\"kb-math kb-math-inline\">B(x,r)</span> 有两个目的：降低计算量，并利用椭圆算子 Green's function 的影响随距离衰减这一先验。</p>\n<p>离散到图 <span class=\"kb-math kb-math-inline\">G=(V,E)</span> 后，上式成为平均聚合消息传递：</p>\n<div class=\"kb-math kb-math-display\">v_{t+1}(x_i)=\\sigma\\left(\nWv_t(x_i)+\\frac{1}{|N(x_i)|}\\sum_{x_j\\in N(x_i)}\n\\kappa_{\\phi}(e_{ij})v_t(x_j)\n\\right),</div>\n<div class=\"kb-math kb-math-display\">e_{ij}=(x_i,x_j,a(x_i),a(x_j)).</div>\n<div class=\"key-point\">💡 关键：边是按连续物理半径 <span class=\"kb-math kb-math-inline\">r</span> 定义的。网格越细，球 <span class=\"kb-math kb-math-inline\">B(x,r)</span> 内节点越多，但半径本身不变，因此模型学习的是物理域上的核，而不是某个固定像素邻域。</div>\n<h5>初始化、训练与 Nyström 采样</h5>\n<p>实际模型先把输入节点特征 lift 到隐藏通道：</p>\n<div class=\"kb-math kb-math-display\">v_0(x)=P(x,a(x),a_{\\epsilon}(x),\\nabla a_{\\epsilon}(x))+p,</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">a_{\\epsilon}</span> 是高斯平滑后的系数，<span class=\"kb-math kb-math-inline\">\\nabla a_{\\epsilon}</span> 帮助网络捕获材料界面、系数跳变等局部结构。经过 <span class=\"kb-math kb-math-inline\">T</span> 次消息传递后，输出层为：</p>\n<div class=\"kb-math kb-math-display\">u_{\\theta}(x)=Qv_T(x)+q.</div>\n<p>直接在 <span class=\"kb-math kb-math-inline\">K</span> 个节点上使用半径图仍可能产生接近 <span class=\"kb-math kb-math-inline\">O(K^2)</span> 的边数。论文因此使用随机 Nyström 近似：每个训练样本重复 <span class=\"kb-math kb-math-inline\">l</span> 次，每次采样 <span class=\"kb-math kb-math-inline\">m</span> 个节点形成子图，用这些子图近似完整核积分。训练复杂度变为约 <span class=\"kb-math kb-math-inline\">O(lm^2)</span>，论文报告 <span class=\"kb-math kb-math-inline\">l=4, m=200</span> 在 <span class=\"kb-math kb-math-inline\">421^2</span> 级别网格上已可工作。测试时若需要整张网格，可将目标网格分块成子图并分别评估。</p>\n<h5>与 FNO、CNN 和传统降阶方法的区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>表示对象</th>\n<th>网格适应性</th>\n<th>非局部建模</th>\n<th>主要代价</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>FCN/CNN</td>\n<td>固定数组映射</td>\n<td>弱，常需固定分辨率</td>\n<td>依赖多层局部卷积</td>\n<td>跨网格泛化弱</td>\n</tr>\n<tr>\n<td>RBM/PCA+NN</td>\n<td>低维基/潜空间</td>\n<td>对同一离散网格效果好</td>\n<td>基函数全局</td>\n<td>通常需要固定训练网格或 PDE 知识</td>\n</tr>\n<tr>\n<td>GNO</td>\n<td>连续积分核的图近似</td>\n<td>强，可用非结构化节点</td>\n<td>消息传递近似核积分</td>\n<td>边数和采样策略敏感</td>\n</tr>\n<tr>\n<td>FNO</td>\n<td>傅里叶域卷积核</td>\n<td>规则网格上强</td>\n<td>FFT 全局卷积</td>\n<td>标准 FFT 不适合任意网格</td>\n</tr>\n</tbody>\n</table></div>\n<p>GNO 是 FNO 的重要前身：它证明了“同一组参数在不同离散化之间共享”的神经算子路线可行，并自然支持非结构化网格；但它的全局/半全局核需要图边来承载，计算和存储随边数增长较快。FNO 后续用 FFT 替代图消息传递，在规则网格上显著提高效率；Geo-FNO 又把 FNO 通过几何变形扩展到一般几何。</p>",
      "quiz": {
        "q": "GNO 中按物理半径 B(x,r) 构图，而不是固定每个节点的 k 个最近邻，主要是为了什么？",
        "options": [
          "让邻域定义与连续物理域一致，从而在网格细化时保持同一个积分核解释",
          "保证每个节点的度完全相同，便于使用批归一化",
          "避免使用节点坐标，只依赖 PDE 系数 a(x)",
          "把图消息传递退化成标准 3x3 卷积"
        ],
        "answer": 0,
        "explain": "GNO 要近似连续积分算子，半径 r 定义在物理空间中，网格变细时邻域节点数自然增加但物理支持域不变，因此有利于跨分辨率泛化。"
      }
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
      "summary": "Geo-FNO 在 FNO 前后加入可给定或可学习的几何变形，把不规则物理域映射到带均匀网格的计算域，在保留 FFT 高效性的同时让 FNO 适用于点云、非均匀网格和复杂工程几何。",
      "keyPoints": [
        "<strong>解决 FNO 几何限制</strong>：标准 FNO 依赖均匀矩形/周期网格上的 FFT，Geo-FNO 通过物理域到计算域的变形扩展到任意几何",
        "<strong>计算域统一</strong>：把物理域 <span class=\"kb-math kb-math-inline\">D_a</span> 映射到统一计算域 <span class=\"kb-math kb-math-inline\">D^c</span>（常取 unit torus），在 <span class=\"kb-math kb-math-inline\">D^c</span> 上使用标准 Fourier basis 和 FFT",
        "<strong>几何 Fourier transform</strong>：用 <span class=\"kb-math kb-math-inline\">\\phi_a^{-1}(x)</span> 将物理坐标拉回计算坐标，在变形后的基函数上做谱变换",
        "<strong>可学习 deformation network</strong>：当几何映射未知时，用神经网络参数化 <span class=\"kb-math kb-math-inline\">\\phi_a^{-1}</span>，与 FNO 解算子端到端联合训练",
        "<strong>输入格式灵活</strong>：支持结构化/非结构化网格、点云、几何设计参数；结构化网格可由索引诱导坐标映射",
        "<strong>工程基准广泛</strong>：覆盖 hyper-elastic、plasticity、球面 advection、airfoil Euler、pipe Navier-Stokes，并包含 inverse design",
        "<strong>保留 FNO 效率</strong>：主体仍在潜在均匀网格上执行 FFT，比传统数值求解器可达数量级加速，并比直接插值到规则网格的 FNO 更准确"
      ],
      "detail": "<h5>核心架构示意</h5>\n<p><img alt=\"Geo-FNO 几何变形与潜在空间 FFT 示意图\" src=\"https://arxiv.org/html/2207.05209/extracted/5573661/figures/geo-FNO5.png\" />\n<em>图：Geo-FNO 将不规则物理域中的输入函数变形到均匀潜在/计算空间，在该空间应用标准 FNO，再把预测解变形回物理域。下方展示 deformation 如何诱导自适应网格和变形 Fourier basis。来源为 arXiv:2207.05209 HTML 图 1。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># Geo-FNO 前向传播伪代码\ndef geo_fno_forward(x_phys, input_field, geometry_code):\n    # 1. 估计或读取物理域 -&gt; 计算域的坐标映射\n    if has_given_map:\n        xi = given_inverse_map(x_phys, geometry_code)          # xi = phi_a^{-1}(x)\n    else:\n        xi = deformation_net(x_phys, geometry_code)            # learned inverse deformation\n\n    # 2. 将物理点上的函数拉回到均匀计算网格\n    v0 = lift_P(concat(input_field, x_phys, xi))\n    v_latent = pullback_to_uniform_grid(v0, xi)                 # irregular -&gt; regular latent grid\n\n    # 3. 在计算域上执行标准 FNO blocks\n    v = v_latent\n    for layer in range(L):\n        v_hat = fftn(v)\n        low_modes = complex_weight[layer] * truncate(v_hat)\n        spectral = ifftn(pad_modes(low_modes)).real\n        v = activation(spectral + pointwise_linear[layer](v))\n\n    # 4. 将潜在解采样/推回物理点，并投影成目标物理量\n    latent_solution = sample_from_uniform_grid(v, xi)\n    u_pred = project_Q(latent_solution)\n    return u_pred\n\nfor geometry, input_field, target_solution in dataloader:\n    pred = geo_fno_forward(geometry.points, input_field, geometry.code)\n    loss = relative_l2_on_physical_domain(pred, target_solution, geometry.weights)\n    loss.backward()                                             # 同时更新 deformation_net 与 FNO\n    optimizer.step()\n</code></pre>\n<h5>动机与背景</h5>\n<p>FNO 的高效性来自 FFT，但 FFT 的直接使用通常要求规则网格和简单拓扑。工程 PDE 恰恰常发生在复杂几何中：机翼周围的 Euler 方程、管道内 Navier-Stokes、材料结构的弹塑性问题都存在曲线边界、非均匀网格或点云表示。如果强行把这些数据插值到矩形网格，边界附近会损失精度，也会浪费大量空白区域计算。</p>\n<p>Geo-FNO 的核心思路是借鉴自适应移动网格：不改变 FNO 主体，而是在 FNO 所需的规则计算域和真实物理域之间学习一个几何坐标变换。论文把物理域记为 <span class=\"kb-math kb-math-inline\">D_a</span>，计算域记为 <span class=\"kb-math kb-math-inline\">D^c</span>，希望存在一个近似可逆、平滑的映射：</p>\n<div class=\"kb-math kb-math-display\">\\phi_a: D^c\\to D_a,\\qquad \\phi_a^{-1}:D_a\\to D^c.</div>\n<p>计算域 <span class=\"kb-math kb-math-inline\">D^c</span> 上有均匀网格和标准 Fourier basis；通过 <span class=\"kb-math kb-math-inline\">\\phi_a</span> 推到物理域后，就得到随几何变化的自适应网格和变形 Fourier basis。</p>\n<h5>核心机制：几何 Fourier transform</h5>\n<p>对物理域函数 <span class=\"kb-math kb-math-inline\">v(x)</span>，Geo-FNO 不直接在 <span class=\"kb-math kb-math-inline\">x</span> 上做标准 Fourier transform，而是用反变换 <span class=\"kb-math kb-math-inline\">\\phi_a^{-1}(x)</span> 把点拉回计算坐标 <span class=\"kb-math kb-math-inline\">\\xi</span>。其前向几何谱变换可写成近似形式：</p>\n<div class=\"kb-math kb-math-display\">(\\mathcal{F}_{\\phi_a}v)_k\n\\approx\n\\sum_{x_j\\in D_a}\nv(x_j)\\exp\\left(-2\\pi i\\langle \\phi_a^{-1}(x_j),k\\rangle\\right)w_j,</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">w_j</span> 是采样/积分权重。对应的逆变换为：</p>\n<div class=\"kb-math kb-math-display\">(\\mathcal{F}^{-1}_{\\phi_a}\\hat{v})(x)\n=\n\\sum_{k\\in Z_K^d}\\hat{v}_k\n\\exp\\left(2\\pi i\\langle \\phi_a^{-1}(x),k\\rangle\\right).</div>\n<p>因此 Geo-FNO layer 可看作把 FNO 的普通 <span class=\"kb-math kb-math-inline\">\\mathcal{F}^{-1}R\\mathcal{F}</span> 替换为变形后的版本：</p>\n<div class=\"kb-math kb-math-display\">v_{t+1}(x)=\\sigma\\left(\nWv_t(x)+\n\\mathcal{F}^{-1}_{\\phi_a}\n\\left(R_{\\theta}\\cdot\\mathcal{F}_{\\phi_a}(v_t)\\right)(x)\n\\right).</div>\n<div class=\"key-point\">💡 关键：Geo-FNO 不是在变形后的 Fourier 空间里手写求解 PDE，而是数据驱动地学习解算子；因此即使传统谱方法在非正交变形网格上会失去严格等价性，Geo-FNO 仍可把变形作为可学习表征。</div>\n<h5>变形网络与训练目标</h5>\n<p>当网格是结构化的，例如 airfoil 常见的 C-grid/O-grid，数组索引本身就诱导了一个从计算域到物理域的坐标映射，此时 Geo-FNO 可近似退化为在索引坐标上执行标准 FNO。当映射未知或输入是点云/设计参数时，论文用一个 deformation neural network 参数化 <span class=\"kb-math kb-math-inline\">\\phi_a^{-1}</span>，输入包括物理坐标和几何参数，并使用 sinusoidal features 增强坐标表达能力。变形网络与 FNO 主体共享同一个监督损失端到端优化。</p>\n<p>数据监督目标使用物理域上的相对 <span class=\"kb-math kb-math-inline\">L_2</span> 误差：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{J}_{\\text{data}}(\\mathcal{G}_{\\theta})\n\\approx\n\\frac{1}{N}\\sum_{j=1}^{N}\n\\sqrt{\n\\frac{\\int_{D_{a_j}}\\left|u_j(x)-\\mathcal{G}_{\\theta}(a_j)(x)\\right|^2\\,dx}\n{\\int_{D_{a_j}}u_j(x)^2\\,dx}\n}.</div>\n<p>如果扩展到 physics-informed neural operator，<span class=\"kb-math kb-math-inline\">\\phi_a^{-1}</span> 是神经网络，因此可用自动微分和链式法则计算变形基函数的导数，从而添加 PDE residual；论文把这一点作为后续方向。</p>\n<h5>Fourier continuation、拓扑与局限</h5>\n<p>标准 Fourier basis 天然适合周期边界。对非周期边界，Geo-FNO 引入 Fourier continuation 的思想：把物理函数扩展到更大的周期计算域中，再在扩展域上做 FFT。对 Chebyshev 方法，论文指出可把 cosine deformation 看作一种特殊几何变形，使边界附近网格更密。</p>\n<p>对球面等非欧氏域，可以选择单位球面作为计算空间并用球谐基；对不同拓扑或非同胚域，单个全局变形不一定存在，需要 domain decomposition，将复杂域拆成若干可规则化子域并训练耦合的算子模型。这也是 Geo-FNO 相比 GNO 的一个边界：它很高效，但仍需要可用的几何参数化或可学习变形；若拓扑变化太大，图神经算子或分块方法更直接。</p>\n<h5>与 FNO 和插值式方法的区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>处理复杂几何的方式</th>\n<th>FFT 是否保留</th>\n<th>误差来源</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>标准 FNO</td>\n<td>通常要求规则矩形网格</td>\n<td>是</td>\n<td>几何不匹配、边界插值误差</td>\n</tr>\n<tr>\n<td>插值 + FNO</td>\n<td>先把不规则数据插值到规则网格</td>\n<td>是</td>\n<td>插值模糊边界和高梯度区域</td>\n</tr>\n<tr>\n<td>GNO</td>\n<td>直接在物理点云/网格上消息传递</td>\n<td>否</td>\n<td>边数、采样和长程依赖成本</td>\n</tr>\n<tr>\n<td>Geo-FNO</td>\n<td>学习物理域到计算域的变形</td>\n<td>是</td>\n<td>变形质量和拓扑可参数化性</td>\n</tr>\n</tbody>\n</table></div>\n<p>Geo-FNO 的工程价值在于把 FNO 的快速谱卷积搬到“几何归一化”后的潜在域中：网络在同一个均匀计算空间学习共享规律，但输出仍定义在每个样本自己的真实物理几何上。</p>",
      "quiz": {
        "q": "Geo-FNO 中学习或给定坐标变换 phi_a^{-1} 的主要作用是什么？",
        "options": [
          "把不规则物理域中的点映射到统一计算域，使模型能在潜在均匀网格上使用 FFT",
          "把所有 PDE 强制改写成线性方程，从而无需训练数据",
          "删除 FNO 的低频模态截断，使模型只学习高频噪声",
          "将图消息传递替换为 kNN 分类器"
        ],
        "answer": 0,
        "explain": "Geo-FNO 的核心是通过几何变形把复杂物理域拉回规则计算域，在那里运行标准 FNO/FFT，再把解推回物理域。"
      }
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
      "summary": "F-FNO 将 FNO 的多维傅里叶卷积拆成按空间维度独立处理的可分离频谱层，并配合后置残差连接、Markov 训练、噪声增强和余弦学习率，使神经算子能用更少参数堆到更深层，在规则网格、点云和结构网格 PDE 上显著优于 FNO/geo-FNO。",
      "keyPoints": [
        "<strong>来源说明</strong>：任务元信息中的 <code>https://arxiv.org/abs/2111.13587</code> 实际指向 AFNO；F-FNO 对应官方论文为 <code>https://arxiv.org/abs/2111.13802</code>，ICLR 2023 版本见 <code>https://openreview.net/forum?id=tmIiMPl4IPa</code>，代码和图示见 <code>https://github.com/alasdairtran/fourierflow</code>",
        "<strong>可分离频谱层</strong>：把原 FNO 的 <span class=\"kb-math kb-math-inline\">D</span> 维 FFT 权重 <span class=\"kb-math kb-math-inline\">R^{(\\ell)}</span> 改为每个维度的 <span class=\"kb-math kb-math-inline\">R_d^{(\\ell)}</span>，复杂度从 <span class=\"kb-math kb-math-inline\">O(LH^2M^D)</span> 降到 <span class=\"kb-math kb-math-inline\">O(LH^2MD)</span>",
        "<strong>后置残差连接</strong>：在非线性和两层前馈块之后再加 <span class=\"kb-math kb-math-inline\">z^{(\\ell)}</span>，保留输入表示，缓解深层 FNO/geo-FNO 随层数增加不收敛的问题",
        "<strong>深层可扩展</strong>：论文实验中 FNO/geo-FNO 在 24 层附近性能恶化或不收敛，F-FNO 可扩展到 24 层并继续受益",
        "<strong>训练策略组合</strong>：teacher forcing、一阶 Markov 假设、输入高斯噪声、AdamW/权重衰减、梯度裁剪、warmup + cosine decay 是效果的重要组成",
        "<strong>几何泛化</strong>：保留 geo-FNO 的坐标形变 <span class=\"kb-math kb-math-inline\">\\phi</span>，可处理规则网格、点云、结构网格和 3D 时空输出",
        "<strong>输入上下文灵活</strong>：Navier-Stokes 任务可把涡量、速度、坐标、黏度 <span class=\"kb-math kb-math-inline\">\\nu</span>、外力 <span class=\"kb-math kb-math-inline\">f_t</span> 作为不同通道输入",
        "<strong>经验结果</strong>：在 Navier-Stokes 上相对 FNO 降低约 83% 误差；在弹性、翼型、塑性锻造任务上相对 geo-FNO 分别降低约 31%、57%、60% 误差"
      ],
      "detail": "<h5>核心架构示意</h5>\n<p><img alt=\"F-FNO 架构海报与算子层示意\" src=\"https://github.com/alasdairtran/fourierflow/blob/main/figures/poster.png?raw=true\" />\n<em>图：作者仓库公开海报中的 F-FNO 架构。右上展示从输入函数经形变、lifting、多个算子层、projection 到输出函数的流程；中间的算子层把 2D 问题中的 <span class=\"kb-math kb-math-inline\">x</span>、<span class=\"kb-math kb-math-inline\">y</span> 方向分别做 FFT、频谱权重乘法和 IFFT，再在物理空间合并。论文 Figure 2 的 PDF 图可从 arXiv 源码 <code>figures/diagram.pdf</code> 获得。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># F-FNO 前向传播伪代码（2D 版本，省略 batch/channel 维细节）\ndef ffno_forward(a, coords=None, context=None):\n    # 可选：geo-FNO 风格坐标形变，把点云/结构网格映射到规则计算域\n    x = deform_to_uniform(a, coords) if coords is not None else a\n\n    # 输入表示可拼接涡量、坐标、黏度、外力等上下文\n    x = concatenate_channels(x, context)\n    z = lifting_P(x)\n\n    for layer in range(L):\n        # 按空间维度分解傅里叶算子，而不是一次性学习 D 维频谱权重\n        spectral = 0\n        for dim in spatial_dims:\n            z_hat = fft(z, dim=dim)\n            z_hat = keep_low_modes(z_hat, M)\n            z_hat = complex_mul(R[layer][dim], z_hat)\n            spectral = spectral + ifft(z_hat, dim=dim)\n\n        # 两层前馈 + 后置残差\n        h = relu(W1[layer](spectral) + b1[layer])\n        h = relu(W2[layer](h) + b2[layer])\n        z = z + h\n\n    u = projection_Q(z)\n    return deform_back(u, coords) if coords is not None else u\n\n# 训练要点\nfor step in range(num_steps):\n    omega_t, omega_next, context = sample_batch()\n    omega_t = omega_t + gaussian_noise_like(omega_t)\n    pred = ffno_forward(omega_t, context=context)  # 一阶 Markov: 只预测下一步\n    loss = normalized_mse(pred, omega_next)\n    loss.backward()\n    clip_grad_value_(model.parameters(), 0.1)\n    adamw.step()\n    cosine_scheduler.step()\n</code></pre>\n<h5>动机与背景</h5>\n<p>FNO 的核心优势是把神经算子的积分核写成傅里叶卷积，从而用 FFT 高效捕获全局相互作用。但原始 FNO 的频谱权重是 <span class=\"kb-math kb-math-inline\">D</span> 维联合张量，若隐藏维度为 <span class=\"kb-math kb-math-inline\">H</span>、保留频率模态数为 <span class=\"kb-math kb-math-inline\">M</span>、层数为 <span class=\"kb-math kb-math-inline\">L</span>、问题维度为 <span class=\"kb-math kb-math-inline\">D</span>，参数量主要来自：</p>\n<div class=\"kb-math kb-math-display\">O(LH^2M^D)</div>\n<p>这在高维问题中增长很快。更关键的是，论文作者观察到原始 FNO 和 geo-FNO 随网络层数加深会退化，甚至在 24 层附近不收敛；即使 4 层模型，在 Kolmogorov flow 这类湍流预测上仍与数值求解器有明显误差。F-FNO 的目标不是重新发明神经算子，而是在 FNO/geo-FNO 框架内把频谱表示和深层稳定性做得更可扩展。</p>\n<h5>从 FNO 到 F-FNO 的关键计算</h5>\n<p>原始 FNO/geo-FNO 的整体算子可写为：</p>\n<div class=\"kb-math kb-math-display\">u = \\mathcal{G}(a) =\n(\\phi \\circ \\mathcal{Q} \\circ \\mathcal{L}^{(L)} \\circ \\cdots \\circ \\mathcal{L}^{(1)} \\circ \\mathcal{P} \\circ \\phi^{-1})(a)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\mathcal{P}</span> 是 lifting，<span class=\"kb-math kb-math-inline\">\\mathcal{Q}</span> 是 projection，<span class=\"kb-math kb-math-inline\">\\phi</span> 是处理不规则几何时使用的可学习坐标形变。原始 FNO 的每层通常是：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}^{(\\ell)}(z^{(\\ell)}) =\n\\sigma\\left(W^{(\\ell)}z^{(\\ell)} + b^{(\\ell)} + \\mathcal{K}^{(\\ell)}(z^{(\\ell)})\\right)</div>\n<p>频谱核积分算子为：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{K}^{(\\ell)}(z^{(\\ell)}) =\n\\operatorname{IFFT}\\left(R^{(\\ell)} \\cdot \\operatorname{FFT}(z^{(\\ell)})\\right)</div>\n<p>F-FNO 改成先做维度分解，再将各维贡献相加：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{K}^{(\\ell)}(z^{(\\ell)}) =\n\\sum_{d \\in D}\n\\operatorname{IFFT}\\left(\nR_d^{(\\ell)} \\cdot \\operatorname{FFT}_d(z^{(\\ell)})\n\\right)</div>\n<p>直觉上，原始 FNO 学的是一个完整 <span class=\"kb-math kb-math-inline\">D</span> 维频谱卷积核；F-FNO 学的是沿每个坐标轴的可分离全局混合。它牺牲了一部分全维频率耦合的直接表达，换来参数量和内存的大幅降低，也让 3D 或时空问题更容易训练。论文还指出可以跨层共享 <span class=\"kb-math kb-math-inline\">R_d</span>，进一步把复杂度降到 <span class=\"kb-math kb-math-inline\">O(H^2MD)</span>。</p>\n<h5>后置残差为什么重要</h5>\n<p>F-FNO 的层更新写成：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}^{(\\ell)}(z^{(\\ell)}) =\nz^{(\\ell)} + \\sigma\\left[\nW_2^{(\\ell)} \\sigma\\left(\nW_1^{(\\ell)} \\mathcal{K}^{(\\ell)}(z^{(\\ell)}) + b_1^{(\\ell)}\n\\right) + b_2^{(\\ell)}\n\\right]</div>\n<p>与原 FNO 把 <span class=\"kb-math kb-math-inline\">Wz + b + \\mathcal{K}(z)</span> 放进同一个激活不同，F-FNO 在非线性变换之后再把输入 <span class=\"kb-math kb-math-inline\">z^{(\\ell)}</span> 加回来。这更接近 ResNet/Transformer 前馈块的思想：每层只学习对当前函数表示的增量修正，而不是每层都重新改写完整表示。对于长时间 PDE rollout，这种设计能降低深层堆叠时的信息损失。</p>\n<h5>训练与推理流程</h5>\n<p>在 Navier-Stokes/Kolmogorov flow 任务中，F-FNO 使用一阶 Markov 形式学习 <span class=\"kb-math kb-math-inline\">\\omega_t \\mapsto \\omega_{t+1}</span>，而不是把多步历史全部作为输入。训练时使用 teacher forcing，即当前步输入来自真实轨迹而非模型上一步预测，避免早期误差滚雪球污染训练信号。推理时则自回归 rollout，把预测的 <span class=\"kb-math kb-math-inline\">\\hat{\\omega}_{t+1}</span> 送回模型继续预测。</p>\n<p>评价损失使用归一化均方误差：</p>\n<div class=\"kb-math kb-math-display\">\\text{N-MSE} =\n\\frac{1}{B}\\sum_{i=1}^{B}\n\\frac{\\|\\hat{\\omega}_i - \\omega_i\\|_2}{\\|\\omega_i\\|_2}</div>\n<p>论文还用涡量相关系数衡量长时间仿真的稳定性：</p>\n<div class=\"kb-math kb-math-display\">\\rho(\\omega,\\hat{\\omega}) =\n\\sum_i\\sum_j\n\\frac{\\omega_{ij}}{\\|\\omega\\|_2}\n\\frac{\\hat{\\omega}_{ij}}{\\|\\hat{\\omega}\\|_2}</div>\n<p>这比单步误差更接近真实仿真需求：如果相关性很快跌破阈值，即使单步 loss 好看，模型也无法替代长期数值模拟。</p>\n<h5>与 FNO/geo-FNO 的区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方面</th>\n<th>FNO</th>\n<th>geo-FNO</th>\n<th>F-FNO</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>频谱层</td>\n<td>联合多维 FFT 权重 <span class=\"kb-math kb-math-inline\">R</span></td>\n<td>结合几何形变的 FNO</td>\n<td>按维度分解 <span class=\"kb-math kb-math-inline\">R_d</span>，各维频谱贡献求和</td>\n</tr>\n<tr>\n<td>参数复杂度</td>\n<td><span class=\"kb-math kb-math-inline\">O(LH^2M^D)</span></td>\n<td>仍受频谱权重规模影响</td>\n<td><span class=\"kb-math kb-math-inline\">O(LH^2MD)</span>，可共享到 <span class=\"kb-math kb-math-inline\">O(H^2MD)</span></td>\n</tr>\n<tr>\n<td>几何</td>\n<td>规则网格</td>\n<td>点云/结构网格</td>\n<td>保留 geo-FNO 形变，可处理多几何</td>\n</tr>\n<tr>\n<td>深层训练</td>\n<td>层数增加易退化</td>\n<td>复杂几何下也会退化</td>\n<td>后置残差 + 分解层支持 24 层</td>\n</tr>\n<tr>\n<td>输入上下文</td>\n<td>通常固定输入变量</td>\n<td>可结合几何坐标</td>\n<td>显式支持黏度、外力、坐标等通道</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 关键：F-FNO 的“分解”不是把 PDE 拆成多个子问题，而是把傅里叶域的全局混合按空间维度分解；这样保留 FFT 的长程建模能力，同时把参数增长从指数型的 <span class=\"kb-math kb-math-inline\">M^D</span> 拉回线性型的 <span class=\"kb-math kb-math-inline\">MD</span>。</div>",
      "quiz": {
        "q": "F-FNO 将原始 FNO 的频谱核从 R 改为按维度的 R_d，最直接解决的问题是什么？",
        "options": [
          "让模型完全不需要训练数据",
          "把频谱层参数复杂度从 O(LH^2M^D) 降到 O(LH^2MD)",
          "把所有 PDE 强制转化为一维常微分方程",
          "消除傅里叶变换对周期边界的任何假设"
        ],
        "answer": 1,
        "explain": "F-FNO 的核心是维度分解的傅里叶表示，每个空间维度独立做 FFT 和频谱权重乘法，因此参数量随维度线性增长，而不是随 M^D 指数式增长。"
      }
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
      "summary": "U-FNO 在 FNO 的傅里叶层中并联一个小型 U-Net 局部卷积分支，弥补截断傅里叶模态对高频尖锐前沿的表达不足，在 CO2-水多相流代理模拟中同时提升精度、数据效率和前沿预测能力。",
      "keyPoints": [
        "<strong>来源说明</strong>：任务中的 DOI 尾号 <code>104185</code> 与公开记录不一致；CaltechAUTHORS、arXiv 与作者 GitHub 均对应论文 <code>U-FNO--An enhanced Fourier neural operator-based deep-learning model for multiphase flow</code>，Advances in Water Resources 163:104180，arXiv <code>2109.03697</code>",
        "<strong>U-Fourier 层</strong>：在原 Fourier layer 的 <span class=\"kb-math kb-math-inline\">\\mathcal{K}v + Wv</span> 之外加入 <span class=\"kb-math kb-math-inline\">\\mathcal{U}v</span>，其中 <span class=\"kb-math kb-math-inline\">\\mathcal{U}</span> 是两步 U-Net CNN 操作",
        "<strong>全局 + 局部互补</strong>：FFT 分支负责全局长程依赖和网格级算子学习，U-Net 分支负责局部高频、尖锐 plume front 和井附近压力梯度",
        "<strong>三阶段架构</strong>：输入 <span class=\"kb-math kb-math-inline\">a(x)</span> 经 fully connected lifting <span class=\"kb-math kb-math-inline\">P</span>，再经过若干 Fourier layers 和 U-Fourier layers，最后由 projection <span class=\"kb-math kb-math-inline\">Q</span> 输出 <span class=\"kb-math kb-math-inline\">z(x)</span>",
        "<strong>任务场景明确</strong>：面向 2D 径向 CO2 地质封存，输入包括渗透率、孔隙度、射孔、注入量、压力、温度、不可动水饱和度、毛管压力参数和时空网格",
        "<strong>输出形式</strong>：直接预测 30 年注入过程中的 24 个时间快照，输出 3D 体数据 <span class=\"kb-math kb-math-inline\">96 \\times 200 \\times 24</span> 的气相饱和度 <span class=\"kb-math kb-math-inline\">SG</span> 和压力增量 <span class=\"kb-math kb-math-inline\">dP</span>",
        "<strong>损失函数增强</strong>：使用相对 <span class=\"kb-math kb-math-inline\">L_p</span> 损失，同时惩罚输出本身和径向一阶导数 <span class=\"kb-math kb-math-inline\">\\mathrm{d}y/\\mathrm{d}r</span>，并用 active cell mask 处理不同储层厚度",
        "<strong>数据效率</strong>：论文报告 U-FNO 达到与 CNN 相当精度时，气相饱和度任务最多少用约 3.4 倍训练数据，压力任务少用约 2.4 倍训练数据",
        "<strong>前沿预测优势</strong>：相对 CNN，气相 plume front 误差约从 9.2% 降到 3.4%，压力 front 误差约从 21.2% 降到 12.0%"
      ],
      "detail": "<h5>核心架构示意</h5>\n<p><img alt=\"U-FNO 模型架构图\" src=\"https://ar5iv.labs.arxiv.org/html/2109.03697/assets/model.jpg\" />\n<em>图：论文 Figure 2。A 展示 U-FNO 总体流程；B 是原 Fourier layer；C 是 U-Fourier layer，在傅里叶积分核和线性项之外加入 U-Net 分支。作者 GitHub 也提供同一架构图：<code>https://user-images.githubusercontent.com/34537648/160530063-255b53c6-f4db-4ceb-82ba-d6f7c2297ef3.jpg</code>。</em></p>\n<p><img alt=\"U-FNO 输入输出样例\" src=\"https://ar5iv.labs.arxiv.org/html/2109.03697/assets/figure1.jpg\" />\n<em>图：论文 Figure 1。左侧是场变量和标量变量输入，右侧分别是气相饱和度与压力增量随时间演化的输出。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># U-FNO 前向传播伪代码\ndef u_fno_forward(a):\n    # a: field/scalar/grid/time channels, shape roughly [B, H, R, T, C_in]\n    v = P(a)  # lifting 到更高通道维度\n\n    # 前半段：普通 Fourier layers\n    for _ in range(num_fourier_layers):\n        kv = fourier_kernel(v)          # IFFT(R * FFT(v))\n        wv = pointwise_linear(v)\n        v = activation(kv + wv)\n\n    # 后半段：U-Fourier layers\n    for _ in range(num_u_fourier_layers):\n        kv = fourier_kernel(v)          # 全局频谱分支\n        uv = mini_unet(v)               # 局部多尺度 CNN 分支\n        wv = pointwise_linear(v)        # 逐点线性项\n        v = activation(kv + uv + wv)\n\n    z_hat = Q(v)  # projection 回气相饱和度或压力增量\n    return z_hat\n\n# 训练损失\nfor a, y, active_mask in dataloader:\n    pred = u_fno_forward(a)\n    dy_dr = radial_derivative(y)\n    dpred_dr = radial_derivative(pred)\n    loss = relative_lp(pred, y, mask=active_mask)\n    loss += beta * relative_lp(dpred_dr, dy_dr, mask=active_mask)\n    loss.backward()\n    optimizer.step()\n</code></pre>\n<h5>动机与背景</h5>\n<p>多相流数值模拟需要同时处理非线性相渗、毛管压力、重力、溶解和强非均质地质属性。传统 ECLIPSE 这类全物理模拟器精度高，但做不确定性量化、反演或工程优化时需要大量前向模拟，成本很高。CNN 代理模型可以加速，但通常绑定固定网格，容易过拟合，并且需要大量模拟数据。</p>\n<p>FNO 的优势是直接学习函数到函数的算子映射，并在傅里叶空间用 FFT 近似全局积分核，因此对单相流等任务有较好泛化。但 U-FNO 论文指出，在 CO2-水多相流中，原 FNO 的有限截断傅里叶基有强正则化效果：测试泛化很好，但训练误差可能偏高，尤其难以还原气相饱和度 plume 前沿和井附近压力尖峰这类高频局部结构。</p>\n<h5>Fourier layer 的基础计算</h5>\n<p>U-FNO 继承 FNO 的积分核思想。给定中间函数 <span class=\"kb-math kb-math-inline\">v_l</span>，核积分算子为：</p>\n<div class=\"kb-math kb-math-display\">\\left(\\mathcal{K}(v_l)\\right)(x)\n= \\int_D \\kappa(x,y)v_l(y)\\,\\mathrm{d}y</div>\n<p>若令 <span class=\"kb-math kb-math-inline\">\\kappa(x,y)=\\kappa(x-y)</span>，由卷积定理可得：</p>\n<div class=\"kb-math kb-math-display\">\\left(\\mathcal{K}(v_l)\\right)(x)\n= \\mathcal{F}^{-1}\\left(\\mathcal{F}(\\kappa)\\cdot \\mathcal{F}(v_l)\\right)(x)</div>\n<p>FNO 将 <span class=\"kb-math kb-math-inline\">\\mathcal{F}(\\kappa)</span> 直接参数化为截断后的复值权重张量 <span class=\"kb-math kb-math-inline\">R</span>：</p>\n<div class=\"kb-math kb-math-display\">\\left(\\mathcal{K}(v_l)\\right)(x)\n= \\mathcal{F}^{-1}\\left(R\\cdot \\mathcal{F}(v_l)\\right)(x)</div>\n<p>其中只保留前 <span class=\"kb-math kb-math-inline\">k_{\\max}</span> 个 Fourier modes。对第 <span class=\"kb-math kb-math-inline\">k</span> 个模态和输出通道 <span class=\"kb-math kb-math-inline\">i</span>，频谱乘法为：</p>\n<div class=\"kb-math kb-math-display\">\\left(R\\cdot \\mathcal{F}(v_l)\\right)_{k,i}\n= \\sum_{j=1}^{c} R_{k,i,j}\\left(\\mathcal{F}(v_l)\\right)_{k,j}</div>\n<h5>U-Fourier layer 的机制</h5>\n<p>原 Fourier layer 大致是：</p>\n<div class=\"kb-math kb-math-display\">v_{l+1}(x)=\\sigma\\left((\\mathcal{K}v_l)(x)+W(v_l(x))\\right)</div>\n<p>U-FNO 的核心改动是在后半段层里加入 U-Net 分支：</p>\n<div class=\"kb-math kb-math-display\">v_{m_{k+1}}(x):=\n\\sigma\\left(\n(\\mathcal{K}v_{m_k})(x)\n+(\\mathcal{U}v_{m_k})(x)\n+W(v_{m_k}(x))\n\\right)</div>\n<p>这里 <span class=\"kb-math kb-math-inline\">\\mathcal{U}</span> 是一个小型 U-Net CNN operator。它通过下采样/上采样路径聚合局部多尺度卷积特征，增强高频和边缘结构表达。傅里叶分支擅长捕获全局流动耦合和长距离压力传播；U-Net 分支擅长恢复 plume front、薄层异质性和井附近陡峭梯度。两者在同一层相加后再过非线性，形成全局谱算子与局部卷积归纳偏置的混合层。</p>\n<div class=\"warn-box\">⚠️ 注意：加入 U-Net 分支会削弱原 FNO 天然的分辨率无关性，因为卷积分支与具体网格更绑定。论文在该任务中接受这个取舍，是因为 CO2-水多相流对数值弥散和数值扩散非常敏感，而这些误差本身就与固定网格分辨率相关。</div>\n<h5>数据流与输入输出配置</h5>\n<p>论文的数据由 ECLIPSE e300 生成，模拟 30 年超临界 CO2 注入。每个样本包含场变量和标量变量。场变量包括水平/垂向渗透率 <span class=\"kb-math kb-math-inline\">k_x,k_y</span>、孔隙度 <span class=\"kb-math kb-math-inline\">\\phi</span>、射孔图 <span class=\"kb-math kb-math-inline\">perf</span>；标量包括注入率 <span class=\"kb-math kb-math-inline\">Q</span>、初始压力 <span class=\"kb-math kb-math-inline\">P_{\\text{init}}</span>、温度 <span class=\"kb-math kb-math-inline\">T</span>、不可动水饱和度 <span class=\"kb-math kb-math-inline\">S_{wi}</span>、van Genuchten 参数 <span class=\"kb-math kb-math-inline\">\\lambda</span>。这些标量会 broadcast 成与场变量相同大小的通道。</p>\n<p>由于原始径向网格逐渐变粗，训练时先对径向做 logarithm conversion，使场变量可表示为 <span class=\"kb-math kb-math-inline\">96 \\times 200</span> 矩阵；不同储层厚度用 zero padding 和 active cell mask 处理。时间信息作为额外维度输入，模型直接输出 24 个时间快照构成的空间-时间体。</p>\n<h5>损失函数设计</h5>\n<p>U-FNO 使用相对 <span class=\"kb-math kb-math-inline\">L_p</span> 损失，并额外约束径向导数：</p>\n<div class=\"kb-math kb-math-display\">L(y,\\hat{y}) =\n\\frac{\\|y-\\hat{y}\\|_p}{\\|y\\|_p}\n+\\beta\n\\frac{\n\\left\\|\\frac{\\mathrm{d}y}{\\mathrm{d}r}\n- \\frac{\\mathrm{d}\\hat{y}}{\\mathrm{d}r}\\right\\|_p\n}{\n\\left\\|\\frac{\\mathrm{d}y}{\\mathrm{d}r}\\right\\|_p\n}</div>\n<p>第一项要求整体场准确，第二项直接惩罚前沿和梯度形状。对于气相饱和度，导数项能改善 plume leading edge；对于压力增量，导数项能改善井附近尖锐压力变化。训练时只在 active cells 内计算 loss，避免 padding 区域产生无意义梯度。</p>\n<h5>与 FNO 和 CNN 的区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方面</th>\n<th>CNN surrogate</th>\n<th>FNO</th>\n<th>U-FNO</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>核心归纳偏置</td>\n<td>局部卷积</td>\n<td>全局傅里叶积分核</td>\n<td>傅里叶全局 + U-Net 局部多尺度</td>\n</tr>\n<tr>\n<td>泛化</td>\n<td>易过拟合，需大量数据</td>\n<td>泛化强但高频表达受截断模态限制</td>\n<td>保留 FNO 泛化，同时提升训练精度和前沿还原</td>\n</tr>\n<tr>\n<td>网格依赖</td>\n<td>强</td>\n<td>弱，较分辨率无关</td>\n<td>介于两者之间，U-Net 分支引入网格依赖</td>\n</tr>\n<tr>\n<td>适合结构</td>\n<td>局部纹理和边缘</td>\n<td>长程相互作用、平滑场</td>\n<td>多相流 plume front 与压力传播并存</td>\n</tr>\n<tr>\n<td>训练目标</td>\n<td>常规 MSE/relative loss</td>\n<td>relative loss</td>\n<td>relative loss + 径向导数 loss + active mask</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 关键：U-FNO 不是简单把 U-Net 接在 FNO 后面，而是在 Fourier layer 内部并联 U-Net 路径，使每一层都同时做全局谱混合和局部多尺度修正。</div>",
      "quiz": {
        "q": "U-FNO 在 U-Fourier layer 中加入 U-Net 分支的主要目的是什么？",
        "options": [
          "完全替代傅里叶变换，避免使用 FFT",
          "增强局部高频结构表达，改善 plume front 和压力尖峰预测",
          "让模型只能在无监督物理损失下训练",
          "把所有标量输入压缩成一个常数"
        ],
        "answer": 1,
        "explain": "FNO 的截断傅里叶模态擅长全局耦合但可能平滑高频前沿；U-Net 分支提供局部多尺度卷积特征，因此能改善气相饱和度前沿和井附近压力梯度。"
      }
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
      "summary": "PINO 将 FNO/神经算子的函数空间学习与 PINN 的 PDE 残差约束结合起来，用数据损失学习一族 PDE 的解算子，再用高分辨率物理损失和实例级微调提高保真度，解决纯数据 FNO 依赖高质量数据、纯 PINN 优化困难的问题。",
      "keyPoints": [
        "<strong>混合监督目标</strong>：训练神经算子 <span class=\"kb-math kb-math-inline\">\\mathcal{G}_\\theta</span> 时同时使用数据损失 <span class=\"kb-math kb-math-inline\">\\mathcal{J}_{\\text{data}}</span> 和 PDE 损失 <span class=\"kb-math kb-math-inline\">\\mathcal{J}_{\\text{pde}}</span>",
        "<strong>跨分辨率训练</strong>：可用低分辨率数据监督算子输出，同时在更高分辨率网格上施加 PDE 残差，改善 zero-shot super-resolution",
        "<strong>两阶段流程</strong>：先做 physics-informed operator learning，再对单个 PDE 实例做 instance-wise fine-tuning",
        "<strong>算子级 ansatz</strong>：微调时使用 <span class=\"kb-math kb-math-inline\">\\mathcal{G}_\\theta(a)</span> 作为解函数 ansatz，而不是像 PINN 那样从随机初始化的点值网络开始",
        "<strong>anchor loss</strong>：微调时可加入 <span class=\"kb-math kb-math-inline\">\\mathcal{L}_{\\text{anchor}}</span>，约束当前算子不要偏离预训练算子，缓解高分辨率 PDE loss 的不稳定",
        "<strong>导数计算方法</strong>：讨论有限差分/Fourier 数值微分、query function + autograd、function-wise Fourier differentiation 三种方式",
        "<strong>FNO 作为主干</strong>：利用 FNO 的通用算子逼近能力、离散化收敛性和快速推理，在 PDE loss 中显式计算输出函数导数",
        "<strong>数据稀缺适用</strong>：可在只有少量粗分辨率数据甚至无标注数据时训练，并可通过采样虚拟初值/系数生成无限 PDE 实例",
        "<strong>任务覆盖</strong>：论文验证 Darcy flow、Burgers、Navier-Stokes/Kolmogorov flow、Reynolds 数迁移和 Darcy 反问题"
      ],
      "detail": "<h5>核心架构示意</h5>\n<p><img alt=\"PINO 架构图\" src=\"https://ar5iv.labs.arxiv.org/html/2111.03794/assets/fig/pino-arch7.png\" />\n<em>图：论文 Figure 2。输入函数 <span class=\"kb-math kb-math-inline\">a</span> 经 lifting、多个线性积分算子和非线性、projection 得到输出 <span class=\"kb-math kb-math-inline\">u</span>；右侧同时计算 data loss 和 equation loss，导数 <span class=\"kb-math kb-math-inline\">Du</span> 可通过算子层在函数空间中显式求出。</em></p>\n<p><img alt=\"PINO 频谱外推示意\" src=\"https://ar5iv.labs.arxiv.org/html/2111.03794/assets/fig/pino_spectrum_reduced_font.png\" />\n<em>图：论文 Figure 1。PINO 利用 data + PDE loss 在 Kolmogorov flow 中更好外推到训练频率之外，纯插值网络在高频段明显失真。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># PINO 阶段 1：物理信息算子学习\ndef train_pino_operator(G_theta, data_loader, pde_sampler):\n    for step in range(num_steps):\n        # 可用数据：粗分辨率 input-output pair\n        a_data, u_data = next(data_loader)\n        pred_data = G_theta(a_data)\n        J_data = norm_u(pred_data - u_data) ** 2\n\n        # 可额外采样虚拟 PDE 实例，不一定有标签\n        a_phys = pde_sampler.sample_initial_or_coefficients()\n        pred_high = G_theta(a_phys, resolution=&quot;high&quot;)\n        residual = pde_residual(a_phys, pred_high)  # 需要 Du, D2u, ...\n        J_pde = mean_square(residual) + boundary_initial_terms(pred_high, a_phys)\n\n        loss = lambda_data * J_data + lambda_pde * J_pde\n        loss.backward()\n        optimizer.step()\n\n# PINO 阶段 2：实例级微调\ndef fine_tune_instance(G_theta, a_star, theta0):\n    for step in range(finetune_steps):\n        u_pred = G_theta(a_star, resolution=current_resolution)\n        L_pde = mean_square(pde_residual(a_star, u_pred))\n        L_anchor = norm_u(G_theta(a_star) - G_theta(theta0, a_star)) ** 2\n        loss = L_pde + alpha * L_anchor\n        loss.backward()\n        optimizer.step()\n</code></pre>\n<h5>问题设定</h5>\n<p>PINO 统一考虑两类 PDE。静态问题写作：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{P}(u,a)=0,\\quad x\\in D,\\qquad u=g,\\quad x\\in\\partial D</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">a</span> 是 PDE 系数或参数，<span class=\"kb-math kb-math-inline\">u</span> 是未知解。它诱导出解算子：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{G}^{\\dagger}: \\mathcal{A}\\to\\mathcal{U},\\qquad a\\mapsto u</div>\n<p>动态问题写作：</p>\n<div class=\"kb-math kb-math-display\">\\frac{\\mathrm{d}u}{\\mathrm{d}t}=\\mathcal{R}(u),\\quad\nu|_{\\partial D}=g,\\quad u|_{t=0}=a</div>\n<p>这时解算子把初值 <span class=\"kb-math kb-math-inline\">a</span> 映射到整段时间上的解函数 <span class=\"kb-math kb-math-inline\">u(t)</span>。PINO 的目标不是只求某一个 <span class=\"kb-math kb-math-inline\">a</span> 的解，而是学习整个 <span class=\"kb-math kb-math-inline\">\\mathcal{A}\\to\\mathcal{U}</span> 的算子；这正是它区别于 PINN 的核心。</p>\n<h5>数据损失与 PDE 损失</h5>\n<p>如果有训练数据 <span class=\"kb-math kb-math-inline\">\\{(a_j,u_j)\\}_{j=1}^{N}</span>，神经算子可用数据损失训练：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{data}}(u,\\mathcal{G}_\\theta(a))\n= \\|u-\\mathcal{G}_\\theta(a)\\|_{\\mathcal{U}}^2\n= \\int_D |u(x)-\\mathcal{G}_\\theta(a)(x)|^2\\,\\mathrm{d}x</div>\n<p>算子级平均数据损失为：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{J}_{\\text{data}}(\\mathcal{G}_\\theta)\n= \\mathbb{E}_{a\\sim\\mu}\n\\left[\\mathcal{L}_{\\text{data}}(a,\\theta)\\right]\n\\approx\n\\frac{1}{N}\\sum_{j=1}^{N}\n\\int_D |u_j(x)-\\mathcal{G}_\\theta(a_j)(x)|^2\\,\\mathrm{d}x</div>\n<p>PDE 损失则把模型输出代回方程：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{J}_{\\text{pde}}(\\mathcal{G}_\\theta)\n= \\mathbb{E}_{a\\sim\\mu}\n\\left[\\mathcal{L}_{\\text{pde}}(a,\\mathcal{G}_\\theta(a))\\right]</div>\n<p>以静态问题为例，PINN/PINO 形式的 PDE 残差损失可写成：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{pde}}(a,u_\\theta)\n=\n\\int_D |\\mathcal{P}(u_\\theta(x),a(x))|^2\\,\\mathrm{d}x\n+\\alpha\\int_{\\partial D}|u_\\theta(x)-g(x)|^2\\,\\mathrm{d}x</div>\n<p>动态问题则加入时间残差、边界条件和初值条件：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{pde}}(a,u_\\theta)\n=\n\\int_0^T\\int_D\n\\left|\\frac{\\mathrm{d}u_\\theta}{\\mathrm{d}t}(t,x)-\\mathcal{R}(u_\\theta)(t,x)\\right|^2\n\\,\\mathrm{d}x\\,\\mathrm{d}t\n+\\alpha\\int_0^T\\int_{\\partial D}|u_\\theta(t,x)-g(t,x)|^2\\,\\mathrm{d}x\\,\\mathrm{d}t\n+\\beta\\int_D |u_\\theta(0,x)-a(x)|^2\\,\\mathrm{d}x</div>\n<div class=\"key-point\">💡 关键：数据损失提供强监督，让优化更容易；PDE 损失提供物理约束，能利用无标签的虚拟 PDE 实例，并可在高于数据分辨率的网格上计算。</div>\n<h5>神经算子主干与 FNO 导数</h5>\n<p>PINO 使用的神经算子可抽象为：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{G}_{\\theta}\n=\n\\mathcal{Q}\\circ(\\mathcal{W}_L+\\mathcal{K}_L)\n\\circ\\cdots\\circ\n\\sigma(\\mathcal{W}_1+\\mathcal{K}_1)\\circ\\mathcal{P}</div>\n<p><span class=\"kb-math kb-math-inline\">\\mathcal{P}</span> 将输入函数 lift 到高维通道，<span class=\"kb-math kb-math-inline\">\\mathcal{Q}</span> 将最后的隐函数 project 到输出函数，<span class=\"kb-math kb-math-inline\">\\mathcal{K}_l</span> 是积分核算子。FNO 中常用 Fourier convolution：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{K}v(x)=\n\\mathcal{F}^{-1}\\left(R\\cdot \\mathcal{F}(v)\\right)(x)</div>\n<p>PDE loss 需要 <span class=\"kb-math kb-math-inline\">\\partial_x u</span>、<span class=\"kb-math kb-math-inline\">\\partial_{xx}u</span>、<span class=\"kb-math kb-math-inline\">\\partial_tu</span> 等导数。PINO 讨论三种路径：</p>\n<ul>\n<li><strong>数值微分</strong>：有限差分 <span class=\"kb-math kb-math-inline\">O(n)</span> 或 Fourier differentiation <span class=\"kb-math kb-math-inline\">O(n\\log n)</span>，速度快但受网格、光滑性和截断误差影响</li>\n<li><strong>query function + autograd</strong>：把神经算子输出写成可查询的 <span class=\"kb-math kb-math-inline\">u(x)</span>，对查询点用自动微分，通用但慢且耗显存</li>\n<li><strong>function-wise differentiation</strong>：对 FNO 的 Fourier 表示显式求导，在频域中乘以频率因子，再 IFFT 回物理空间</li>\n</ul>\n<p>对一维 Fourier 展开，若最后的输出可写为：</p>\n<div class=\"kb-math kb-math-display\">u(x)=Q\\left(\n\\frac{1}{k_{\\max}}\\sum_{k=0}^{k_{\\max}}\n\\left(R_k(\\mathcal{F}v)_k\\right)\n\\exp\\left(\\frac{i2\\pi k}{D}x\\right)\n\\right)</div>\n<p>则导数只需对指数项求导：</p>\n<div class=\"kb-math kb-math-display\">\\frac{\\mathrm{d}}{\\mathrm{d}x}\n\\exp\\left(\\frac{i2\\pi k}{D}x\\right)\n=\n\\frac{i2\\pi k}{D}\n\\exp\\left(\\frac{i2\\pi k}{D}x\\right)</div>\n<p>因此在规则网格上可以通过 FFT 高效得到整场导数。这是 PINO 相比朴素 PINN 的重要工程优势：它不是对每个采样点独立反传求导，而是利用算子结构批量计算函数级导数。</p>\n<h5>两阶段训练机制</h5>\n<p>第一阶段是 physics-informed operator learning。PINO 训练 <span class=\"kb-math kb-math-inline\">\\mathcal{G}_\\theta</span> 去近似真实解算子 <span class=\"kb-math kb-math-inline\">\\mathcal{G}^{\\dagger}</span>，可使用：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{J}(\\theta)\n=\n\\lambda_{\\text{data}}\\mathcal{J}_{\\text{data}}(\\mathcal{G}_\\theta)\n+\\lambda_{\\text{pde}}\\mathcal{J}_{\\text{pde}}(\\mathcal{G}_\\theta)</div>\n<p>当数据只在低分辨率可得时，<span class=\"kb-math kb-math-inline\">\\mathcal{J}_{\\text{data}}</span> 在粗网格上计算，<span class=\"kb-math kb-math-inline\">\\mathcal{J}_{\\text{pde}}</span> 可以在细网格上计算。这使模型不仅拟合观测/求解器数据，还被物理方程约束到更高频、更高分辨率的解空间。</p>\n<p>第二阶段是 instance-wise fine-tuning。给定一个具体实例 <span class=\"kb-math kb-math-inline\">a^\\star</span>，用预训练算子输出 <span class=\"kb-math kb-math-inline\">\\mathcal{G}_\\theta(a^\\star)</span> 作为 ansatz，再最小化该实例上的 PDE residual。为了避免微调在高分辨率 PDE loss 下偏离太远，论文加入 anchor loss：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{anchor}}\n\\left(\\mathcal{G}_{\\theta_i}(a),\\mathcal{G}_{\\theta_0}(a)\\right)\n:=\n\\|\\mathcal{G}_{\\theta_i}(a)-\\mathcal{G}_{\\theta_0}(a)\\|_{\\mathcal{U}}^2</div>\n<p>微调目标为：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{fine-tune}}\n=\n\\mathcal{L}_{\\text{pde}}\n+\\alpha\\mathcal{L}_{\\text{anchor}}</div>\n<p>直觉上，预训练算子给出“已经接近解流形”的初值，PDE loss 只需做物理一致性修正；而 PINN 通常从随机网络开始直接拟合一个复杂函数，优化景观更差，尤其在多尺度动态系统中容易失败。</p>\n<h5>与 PINN 和纯 FNO 的区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方面</th>\n<th>PINN</th>\n<th>FNO</th>\n<th>PINO</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>学习对象</td>\n<td>单个 PDE 实例的解函数</td>\n<td>一族 PDE 的解算子</td>\n<td>一族 PDE 的物理约束解算子</td>\n</tr>\n<tr>\n<td>监督来源</td>\n<td>PDE/边界/初值残差</td>\n<td>求解器或观测数据</td>\n<td>数据损失 + PDE 损失</td>\n</tr>\n<tr>\n<td>数据需求</td>\n<td>可无标注数据</td>\n<td>依赖大量 input-output pair</td>\n<td>可用少量粗数据，也可采样无标签 PDE 实例</td>\n</tr>\n<tr>\n<td>优化难度</td>\n<td>多尺度动态系统困难</td>\n<td>监督学习较稳定</td>\n<td>预训练算子 + PDE 微调，优化更好</td>\n</tr>\n<tr>\n<td>分辨率</td>\n<td>配点灵活但逐点优化</td>\n<td>可 zero-shot super-resolution，但高频可能失真</td>\n<td>在高分辨率施加 PDE loss，改善高频外推</td>\n</tr>\n<tr>\n<td>推理</td>\n<td>每个实例需优化</td>\n<td>一次前向很快</td>\n<td>可直接前向，也可实例级微调换精度</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"warn-box\">⚠️ 注意：PINO 的 PDE loss 仍需正确的微分和边界处理。对于非周期或不光滑问题，直接 Fourier differentiation 会出现误差；论文因此讨论 Fourier continuation，把非周期问题扩展到更大的周期空间。</div>",
      "quiz": {
        "q": "PINO 相比纯 FNO 的核心改进是什么？",
        "options": [
          "完全取消数据损失，只保留随机初始化的 PINN 优化",
          "在神经算子训练中加入 PDE 残差，并可在高分辨率上施加物理约束",
          "把 Fourier layer 替换成普通全连接网络",
          "只学习单个 PDE 样本，不能泛化到一族方程"
        ],
        "answer": 1,
        "explain": "PINO 保留 FNO 的算子学习能力，但额外使用 PDE loss 约束输出函数，尤其能用粗分辨率数据配合高分辨率物理残差提高泛化和超分辨率保真度。"
      }
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
      "summary": "LNO 将 FNO 的傅里叶域卷积核替换为拉普拉斯域的极点-留数参数化，显式同时建模瞬态响应和稳态响应，解决 FNO 在非周期、无阻尼和强瞬态 ODE/PDE 问题上泛化不足的问题。",
      "keyPoints": [
        "<strong>拉普拉斯域算子层</strong>：用 <span class=\"kb-math kb-math-inline\">U(s)=K_\\phi(s)V(s)</span> 表示卷积算子，将核函数直接放在拉普拉斯域学习",
        "<strong>极点-留数参数化</strong>：令 <span class=\"kb-math kb-math-inline\">K_\\phi(s)=\\sum_{n=1}^{N}\\frac{\\beta_n}{s-\\mu_n}</span>，把系统极点 <span class=\"kb-math kb-math-inline\">\\mu_n</span> 和留数 <span class=\"kb-math kb-math-inline\">\\beta_n</span> 作为可训练参数",
        "<strong>瞬态/稳态分解</strong>：输出由系统极点产生的瞬态项 <span class=\"kb-math kb-math-inline\">\\sum_n\\gamma_n e^{\\mu_n t}</span> 和输入频率产生的稳态项 <span class=\"kb-math kb-math-inline\">\\sum_\\ell\\lambda_\\ell e^{i\\omega_\\ell t}</span> 组成",
        "<strong>相对 FNO 的关键差异</strong>：FNO 只在 <span class=\"kb-math kb-math-inline\">i\\omega</span> 频率轴上学习稳态响应，LNO 通过 <span class=\"kb-math kb-math-inline\">s=\\sigma+i\\omega</span> 引入指数收敛/衰减因子，适合非周期与不稳定信号",
        "<strong>单层替代多层频谱模块</strong>：论文用一个 Laplace layer 对比四个 Fourier module，在 Duffing 振子、受迫摆、Lorenz 系统、Euler-Bernoulli 梁、扩散方程和反应-扩散系统上验证",
        "<strong>可解释性更强</strong>：学习到的 <span class=\"kb-math kb-math-inline\">\\mu_n,\\beta_n</span> 可对应动力系统的模态、阻尼/增长和响应强度，而不仅是黑箱频率权重",
        "<strong>主要局限</strong>：当输入代表初始条件而非外力/源项时，卷积积分的物理含义减弱，极点-留数形式不一定显著优于 FNO"
      ],
      "detail": "<p><img alt=\"LNO 架构示意图\" src=\"https://media.springernature.com/m312/springer-static/image/art%3A10.1038%2Fs42256-024-00844-4/MediaObjects/42256_2024_844_Fig1_HTML.png\" />\n<em>图：LNO 的整体架构与 Laplace layer。arXiv 预印本的对应图为 Figure 1，源文件为 <code>figure/LNO4.pdf</code>；Nature Machine Intelligence 版本提供了公开图片直链。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># LNO Laplace layer 的核心计算（简化版）\ndef lno_forward(f_t):\n    # 1. Lift: 输入函数 f(t) 升维为 latent 表示 v(t)\n    v_t = P(f_t)\n\n    # 2. 将 v(t) 分解为输入频率极点 i*omega_l 与留数 alpha_l\n    alpha, omega = fft_coefficients(v_t)\n\n    # 3. 可训练的系统极点与留数\n    mu = trainable_system_poles          # [N]\n    beta = trainable_system_residues     # [N]\n\n    # 4. 系统极点处的瞬态留数 gamma_n = beta_n * V(mu_n)\n    V_mu = sum_over_l(alpha_l / (mu_n - 1j * omega_l))\n    gamma = beta * V_mu\n    transient = sum_over_n(gamma_n * exp(mu_n * t_grid))\n\n    # 5. 输入频率处的稳态留数 lambda_l = alpha_l * K_phi(i omega_l)\n    K_iw = sum_over_n(beta_n / (1j * omega_l - mu_n))\n    lam = alpha * K_iw\n    steady = ifft_from_coefficients(lam, omega)\n\n    # 6. 局部线性变换 + 非线性 + projection\n    u_t = activation(transient + steady + W(v_t))\n    return Q(u_t)\n\nfor f_batch, u_batch in dataloader:\n    pred = lno_forward(f_batch)\n    loss = relative_l2(pred, u_batch)\n    loss.backward()\n    optimizer.step()\n</code></pre>\n<h5>动机与背景</h5>\n<p>FNO 的核心假设是把卷积核放到傅里叶域中学习，即沿纯虚频率轴 <span class=\"kb-math kb-math-inline\">i\\omega</span> 做频谱乘法。这个设计在周期边界、稳态振荡或规则网格上很有效，但对两类动力学会吃亏：一类是非周期或不绝对可积的信号，另一类是无阻尼系统中的长瞬态响应。傅里叶变换没有显式的指数衰减/增长因子，也不自然包含初始值影响，因此容易把瞬态部分当成需要多层网络“补出来”的误差。</p>\n<p>LNO 的核心变化是从傅里叶变量 <span class=\"kb-math kb-math-inline\">i\\omega</span> 扩展到拉普拉斯变量 <span class=\"kb-math kb-math-inline\">s=\\sigma+i\\omega</span>。这里 <span class=\"kb-math kb-math-inline\">\\sigma</span> 提供指数收敛因子，使模型可以表示衰减、增长和短时瞬态。直觉上，FNO 学的是“频率响应”，而 LNO 学的是“系统模态响应”：每个极点 <span class=\"kb-math kb-math-inline\">\\mu_n</span> 对应一个模态，每个留数 <span class=\"kb-math kb-math-inline\">\\beta_n</span> 控制这个模态对输入的响应强度。</p>\n<h5>核心机制</h5>\n<p>LNO 仍然遵循神经算子的 lift-operator-project 框架。输入函数 <span class=\"kb-math kb-math-inline\">\\mathbf f(t)</span> 先经浅层网络 <span class=\"kb-math kb-math-inline\">\\mathcal{P}</span> 升维为 <span class=\"kb-math kb-math-inline\">v(t)</span>，再经过 Laplace layer 与局部线性变换 <span class=\"kb-math kb-math-inline\">W</span>，最后由 <span class=\"kb-math kb-math-inline\">\\mathcal{Q}</span> 投影回目标维度：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf u(t)=\\sigma\\left((\\kappa(\\mathbf f;\\phi)*v)(t)+\\mathbf W v(t)\\right)</div>\n<p>其中卷积核积分为：</p>\n<div class=\"kb-math kb-math-display\">(\\kappa(\\mathbf f;\\phi)*v)(t)=\\int_D\\kappa_{\\phi}(t-\\tau)v(\\tau)\\,d\\tau</div>\n<p>对卷积项做拉普拉斯变换，得到：</p>\n<div class=\"kb-math kb-math-display\">U(s)=K_\\phi(s)V(s)</div>\n<p>LNO 不像 FNO 那样直接学习一组离散频点的 <span class=\"kb-math kb-math-inline\">K_\\phi(i\\omega)</span>，而是把 <span class=\"kb-math kb-math-inline\">K_\\phi(s)</span> 写成极点-留数形式：</p>\n<div class=\"kb-math kb-math-display\">K_\\phi(s)=\\sum_{n=1}^{N}\\frac{\\beta_n}{s-\\mu_n}</div>\n<p>这里 <span class=\"kb-math kb-math-inline\">\\mu_n</span> 和 <span class=\"kb-math kb-math-inline\">\\beta_n</span> 是网络训练参数。若输入 latent 信号写成傅里叶级数：</p>\n<div class=\"kb-math kb-math-display\">v(t)=\\sum_{\\ell=-\\infty}^{\\infty}\\alpha_\\ell e^{i\\omega_\\ell t}</div>\n<p>则其拉普拉斯变换为：</p>\n<div class=\"kb-math kb-math-display\">V(s)=\\sum_{\\ell=-\\infty}^{\\infty}\\frac{\\alpha_\\ell}{s-i\\omega_\\ell}</div>\n<p>二者相乘后，输出 <span class=\"kb-math kb-math-inline\">U(s)</span> 同时具有系统极点 <span class=\"kb-math kb-math-inline\">\\mu_n</span> 和输入激励极点 <span class=\"kb-math kb-math-inline\">i\\omega_\\ell</span>。通过留数定理可得：</p>\n<div class=\"kb-math kb-math-display\">\\gamma_n=\\beta_n V(\\mu_n), \\qquad\n\\lambda_\\ell=\\alpha_\\ell K_\\phi(i\\omega_\\ell)</div>\n<p>逆拉普拉斯变换给出时间域输出：</p>\n<div class=\"kb-math kb-math-display\">u_1(t)=\\sum_{n=1}^{N}\\gamma_n e^{\\mu_n t}\n+\\sum_{\\ell=-\\infty}^{\\infty}\\lambda_\\ell e^{i\\omega_\\ell t}</div>\n<div class=\"key-point\">💡 关键：第一项是由系统极点决定的瞬态响应，第二项是由输入频率决定的稳态响应。FNO 主要覆盖第二项，LNO 显式加入第一项。</div>\n<h5>训练与数据流</h5>\n<p>训练数据仍是算子学习常见的输入-输出函数对 <span class=\"kb-math kb-math-inline\">\\{(\\mathbf f_j,\\mathbf u_j)\\}_{j=1}^{N}</span>。论文中的主要任务是学习外力/源项到响应函数的映射，例如 <span class=\"kb-math kb-math-inline\">f(t)\\rightarrow x(t)</span> 或 <span class=\"kb-math kb-math-inline\">f(x,t)\\rightarrow y(x,t)</span>。损失通常采用相对 <span class=\"kb-math kb-math-inline\">\\mathcal{L}_2</span> 误差：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{rel}=\n\\frac{\\|\\mathcal{G}_\\theta(\\mathbf f)-\\mathbf u\\|_2}{\\|\\mathbf u\\|_2}</div>\n<p>训练过程中，FFT 仍用于获得输入的 <span class=\"kb-math kb-math-inline\">\\alpha_\\ell,\\omega_\\ell</span>，但核函数不再只是一组傅里叶权重，而是由 <span class=\"kb-math kb-math-inline\">\\mu_n,\\beta_n</span> 计算出来。这样做把“如何响应某个输入频率”和“系统自身有哪些衰减/增长模态”拆开了。</p>\n<h5>与 FNO 的区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方面</th>\n<th>FNO</th>\n<th>LNO</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>核参数</td>\n<td><span class=\"kb-math kb-math-inline\">K_\\phi(i\\omega_\\ell)</span></td>\n<td><span class=\"kb-math kb-math-inline\">(\\mu_n,\\beta_n)</span></td>\n</tr>\n<tr>\n<td>域</td>\n<td>傅里叶频域</td>\n<td>拉普拉斯复平面</td>\n</tr>\n<tr>\n<td>主要响应</td>\n<td>稳态/周期响应</td>\n<td>瞬态 + 稳态响应</td>\n</tr>\n<tr>\n<td>对非周期信号</td>\n<td>需要网络间接拟合</td>\n<td>由 <span class=\"kb-math kb-math-inline\">\\sigma+i\\omega</span> 更自然表示</td>\n</tr>\n<tr>\n<td>可解释性</td>\n<td>频谱权重</td>\n<td>极点、留数、模态贡献</td>\n</tr>\n</tbody>\n</table></div>\n<p>论文结果显示，在无阻尼 Duffing 振子、无阻尼受迫摆等强瞬态场景，LNO 相比 FNO 的优势最明显；在 Euler-Bernoulli 梁和扩散方程这类线性算子上，极点-留数结构几乎直接对应解析响应，因此误差可比 FNO 低一个到两个数量级。反应-扩散系统是非线性的，LNO 仍然通过可训练极点/留数获得更小误差，但优势来自有用的归纳偏置，而不是严格解析等价。</p>",
      "quiz": {
        "q": "LNO 相比 FNO 的核心改动是什么？",
        "options": [
          "把所有卷积层替换为普通全连接层",
          "在拉普拉斯域用可训练极点和留数参数化核函数，同时表示瞬态与稳态响应",
          "只使用更多 Fourier modes 来提升高频分辨率",
          "用图神经网络处理不规则网格"
        ],
        "answer": 1,
        "explain": "LNO 的关键是将核函数写为 K_phi(s)=sum beta_n/(s-mu_n)，系统极点产生瞬态项，输入频率产生稳态项，从而补足 FNO 对瞬态/非周期信号的短板。"
      }
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
      "summary": "GINO 将 GNO 的局部不规则网格积分与 FNO 的规则潜空间全局频谱积分组合起来，用 SDF 与点云编码复杂几何，解决 FNO 难以直接处理大规模 3D 非结构几何、GNN/GNO 又难以高效捕获全局相互作用的问题。",
      "keyPoints": [
        "<strong>来源校正</strong>：任务给定的 <code>https://arxiv.org/abs/2309.03019</code> 实际是语音验证论文；GINO 对应论文为 NeurIPS 2023 <code>Geometry-Informed Neural Operator for Large-Scale 3D PDEs</code>，arXiv: <code>https://arxiv.org/abs/2309.00583</code>",
        "<strong>三段式架构</strong>：GNO encoder 将不规则表面点云映射到规则 latent grid，FNO block 在规则网格上做全局频谱积分，GNO decoder 将 latent 表示查询回任意输出点",
        "<strong>几何输入表示</strong>：同时使用表面点云和 signed distance function (SDF)，其中 SDF 在规则网格上表达几何边界与域信息",
        "<strong>局部图积分</strong>：GNO 在物理空间半径球 <span class=\"kb-math kb-math-inline\">B_r(x)</span> 内构图，用 Riemann 权重近似连续核积分，避免普通 kNN GNN 在网格细化时退化为点算子",
        "<strong>全局频谱处理</strong>：FNO 只在 GNO 产生的规则潜空间中运行，因此可使用 FFT 的准线性复杂度捕获长程依赖",
        "<strong>可扩展图构造</strong>：使用 hash grid / voxel 邻域搜索替代全点对距离，避免 <span class=\"kb-math kb-math-inline\">O(N^2)</span> 内存与计算",
        "<strong>CFD 验证</strong>：在 ShapeNet car 和大规模 Ahmed body 3D 气动数据上预测表面压力，论文报告 drag coefficient 计算相对 GPU OpenFOAM 约 <span class=\"kb-math kb-math-inline\">26{,}000\\times</span> 加速",
        "<strong>离散收敛性</strong>：训练后的模型可作用于任意分辨率/网格采样，随着离散加密收敛到连续算子，而不是绑定到固定 mesh"
      ],
      "detail": "<p><img alt=\"GINO 架构图（Figure 1 位于论文 PDF 第 2 页）\" src=\"https://proceedings.neurips.cc/paper_files/paper/2023/file/70518ea42831f02afc3a2828993935ad-Paper-Conference.pdf\" />\n<em>图源说明：NeurIPS 论文 PDF 的 Figure 1 展示 GINO 架构；arXiv source 包 <code>https://arxiv.org/e-print/2309.00583</code> 中对应图文件为 <code>Figs/main_fig.pdf</code>。公开页面未提供单独图片直链，因此这里给出可访问论文 PDF 与源包位置。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># GINO 前向传播伪代码\ndef gino_forward(surface_points, sdf_grid, query_points, inlet_velocity=None):\n    # surface_points: 不规则几何表面点云 S_T\n    # sdf_grid:       在规则背景网格 D 上采样的 signed distance function\n    # query_points:   需要预测压力/速度的任意输出点\n\n    # 1. GNO encoder: 从不规则点云到规则 latent grid\n    graph_in = radius_graph(source=surface_points, target=latent_grid, radius=r_in)\n    geom_latent = gno_integral(\n        target_points=latent_grid,\n        source_points=surface_points,\n        source_features=surface_features(surface_points),\n        graph=graph_in,\n        riemann_weights=surface_area_weights,\n    )\n\n    # 2. 拼接 SDF，形成规则网格上的几何表示\n    z = concat(geom_latent, sdf_grid)\n\n    # 3. FNO block: 规则潜空间中进行全局 Fourier kernel integration\n    if inlet_velocity is not None:\n        z = adaptive_instance_norm(z, embed_fourier(inlet_velocity))\n    for block in fno_blocks:\n        z = block(z)  # FFT -&gt; spectral multiplication -&gt; IFFT + pointwise transform\n\n    # 4. GNO decoder: 从 latent grid 查询到任意输出点\n    graph_out = radius_graph(source=latent_grid, target=query_points, radius=r_out)\n    pred = gno_integral(\n        target_points=query_points,\n        source_points=latent_grid,\n        source_features=z,\n        graph=graph_out,\n        riemann_weights=uniform_grid_weights,\n    )\n\n    return projection(pred)  # e.g. surface pressure\n\nfor batch in dataloader:\n    pred = gino_forward(batch.surface, batch.sdf, batch.output_points, batch.velocity)\n    loss = relative_l2(pred, batch.pressure)\n    loss.backward()\n    optimizer.step()\n</code></pre>\n<h5>问题设定</h5>\n<p>GINO 学习的是几何参数化 PDE 的解算子。论文将几何写成距离函数 <span class=\"kb-math kb-math-inline\">T</span>，其零水平集 <span class=\"kb-math kb-math-inline\">S_T=\\{x\\in D:T(x)=0\\}</span> 定义物体表面；流体域为 <span class=\"kb-math kb-math-inline\">\\Omega_T=D\\setminus\\bar{Q}_T</span>。抽象 PDE 写作：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}(u)=f,\\quad x\\in\\Omega_T,\n\\qquad\nu=g,\\quad x\\in\\partial\\Omega_T</div>\n<p>模型要学习的映射是：</p>\n<div class=\"kb-math kb-math-display\">\\Psi:\\mathcal{T}\\times\\mathcal{F}\\times\\mathcal{B}\\rightarrow\\mathcal{U},\n\\qquad\n(T,f,g)\\mapsto E_T(u)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">E_T</span> 是把几何相关域 <span class=\"kb-math kb-math-inline\">\\Omega_T</span> 上的解扩展到统一背景域 <span class=\"kb-math kb-math-inline\">D</span> 的算子。对汽车气动问题，<span class=\"kb-math kb-math-inline\">\\mathcal{L}</span> 可对应稳态 Navier-Stokes 方程，输出通常是表面压力场或速度/压力组合。</p>\n<h5>GNO Encoder/Decoder</h5>\n<p>GINO 的局部模块来自 Graph Neural Operator，而不是普通 GNN。它从连续核积分出发：</p>\n<div class=\"kb-math kb-math-display\">v_l(x)=\\int_D \\kappa_l(x,y)v_{l-1}(y)\\,dy</div>\n<p>为了可扩展，实际只在物理空间半径球内做局部积分：</p>\n<div class=\"kb-math kb-math-display\">v_l(x)=\\int_{B_r(x)}\\kappa(x,y)v_{l-1}(y)\\,dy</div>\n<p>离散后用 Riemann 和近似：</p>\n<div class=\"kb-math kb-math-display\">v_l(x)\\approx\\sum_{i=1}^{M}\\kappa(x,y_i)v_{l-1}(y_i)\\mu(y_i),\n\\qquad y_i\\in B_r(x)</div>\n<p>这里 <span class=\"kb-math kb-math-inline\">\\mu(y_i)</span> 是与点采样密度相关的积分权重。关键不是“连最近邻”，而是“在物理空间球内近似积分”。这样当点云分辨率变化时，离散和会逼近同一个连续积分算子，模型具备离散收敛性。</p>\n<p>Encoder 用表面点云 <span class=\"kb-math kb-math-inline\">\\{x_i^{in}\\}\\subset S_T</span> 作为源点，在规则 latent grid <span class=\"kb-math kb-math-inline\">\\{x_j^{grid}\\}\\subset D</span> 上查询几何表示。Decoder 反过来把规则 latent grid 上的函数值映射到任意输出点 <span class=\"kb-math kb-math-inline\">\\{x_k^{out}\\}\\subset\\Omega_T</span> 或表面点。</p>\n<h5>FNO 潜空间处理</h5>\n<p>GNO 适合处理不规则几何，但局部半径构图很难高效捕获全局流动依赖。GINO 将几何编码到规则 latent grid 后，再用 FNO 做全局频谱积分：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{C}(v)=\\mathcal{F}^{-1}\\left(\\mathcal{F}(\\kappa)\\cdot\\mathcal{F}(v)\\right)</div>\n<p>完整 FNO block 可写成：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{K}(v)(x)=\\sigma\\left(Wv(x)+\\mathcal{C}(v)(x)\\right)</div>\n<p>由于该步骤发生在规则网格上，<span class=\"kb-math kb-math-inline\">\\mathcal{F}</span> 可以用 FFT 高效实现。GINO 因此得到两边的好处：输入/输出端可处理复杂非结构点云，中间全局传播仍保持 FNO 的频谱效率。</p>\n<h5>大规模实现细节</h5>\n<p>半径图构造若直接算全点对距离，需要 <span class=\"kb-math kb-math-inline\">O(N^2)</span> 内存和计算，在 <span class=\"kb-math kb-math-inline\">10^5\\sim10^7</span> 点 CFD 网格上不可行。GINO 使用 hash grid：先按体素把点放入哈希表，只检查当前体素及邻近体素，再做 <span class=\"kb-math kb-math-inline\">\\ell^2</span> 距离过滤。论文给出的复杂度形式约为 <span class=\"kb-math kb-math-inline\">O(Ndr^3)</span>，其中 <span class=\"kb-math kb-math-inline\">d</span> 是单位密度、<span class=\"kb-math kb-math-inline\">r</span> 是搜索半径。</p>\n<p>对边界条件中的标量入口速度，GINO 使用 Fourier feature embedding 加 learnable adaptive instance normalization：速度先嵌入为向量，再由 MLP 生成归一化层的 scale/shift。这样同一网络可根据 inlet velocity 调整流场幅值，而不需要为每个速度训练独立模型。</p>\n<h5>与相关方法的区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>几何输入</th>\n<th>全局依赖</th>\n<th>网格/分辨率泛化</th>\n<th>主要瓶颈</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>标准 FNO</td>\n<td>规则网格</td>\n<td>强，FFT 高效</td>\n<td>依赖规则网格</td>\n<td>难处理复杂几何</td>\n</tr>\n<tr>\n<td>Geo-FNO</td>\n<td>学坐标变形</td>\n<td>强</td>\n<td>对复杂 3D 成本高</td>\n<td>不规则 DFT/变形困难</td>\n</tr>\n<tr>\n<td>普通 GNN</td>\n<td>任意图</td>\n<td>局部 message passing</td>\n<td>细化时易退化</td>\n<td>不保证连续算子极限</td>\n</tr>\n<tr>\n<td>GNO</td>\n<td>任意点云</td>\n<td>局部积分</td>\n<td>离散收敛</td>\n<td>长程依赖成本高</td>\n</tr>\n<tr>\n<td><strong>GINO</strong></td>\n<td>SDF + 点云</td>\n<td>GNO 局部 + FNO 全局</td>\n<td>离散收敛</td>\n<td>需要构造 latent grid 与半径图</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 关键：GINO 不是简单把 GNN 和 FNO 串起来，而是用 GNO 作为连续积分意义下的 encoder/decoder，把 FNO 限定在规则潜空间中运行，从而同时满足几何灵活性、全局效率和离散收敛。</div>",
      "quiz": {
        "q": "GINO 为什么要使用 GNO encoder + FNO latent block + GNO decoder 的三段式结构？",
        "options": [
          "为了完全避免使用傅里叶变换",
          "为了把不规则几何映射到规则潜空间，让 FNO 高效捕获全局依赖，再查询回任意输出点",
          "为了把所有点云强制插值成固定数量的节点",
          "为了只预测 drag coefficient 而不预测压力场"
        ],
        "answer": 1,
        "explain": "GNO 负责不规则输入/输出上的局部连续积分，FNO 在规则 latent grid 上用 FFT 捕获全局相互作用，这是 GINO 兼顾复杂几何和计算效率的核心。"
      }
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
      "summary": "MoE-POT 将稀疏激活的 Mixture-of-Experts 引入 PDE operator transformer 预训练，在每层用路由网络从 16 个 routed experts 中选择 4 个并叠加 2 个 shared experts，从而在控制推理成本的同时扩展参数规模并缓解多 PDE 数据集混训的负迁移。",
      "keyPoints": [
        "<strong>来源限制说明</strong>：任务给定 <code>https://arxiv.org/abs/2510.moe</code> 不是有效 arXiv URL；可追溯论文为 <code>Mixture-of-Experts Operator Transformer for Large-Scale PDE Pre-Training</code>，arXiv: <code>https://arxiv.org/abs/2510.25803</code>，OpenReview: <code>https://openreview.net/forum?id=PNgG4H3q9D</code>",
        "<strong>预训练目标</strong>：沿用自回归去噪 operator pre-training，从历史 PDE 帧 <span class=\"kb-math kb-math-inline\">\\bm{u}^{&lt;t}+\\epsilon</span> 预测下一帧 <span class=\"kb-math kb-math-inline\">\\bm{u}^t</span>",
        "<strong>输入编码</strong>：用 patchification layer 加时空位置编码将每个时间步的场变为 patch tokens，再通过 Fourier temporal aggregation 汇聚时间动态",
        "<strong>主干 block</strong>：每个 block 包含 Fourier layer 与 MoE layer，Fourier layer 负责核积分/全局传播，MoE layer 负责按 PDE 类型选择专家",
        "<strong>稀疏 MoE 结构</strong>：每层含 16 个 routed experts 和 2 个 shared experts；推理时 Top-4 routed experts + 2 shared experts 被激活",
        "<strong>共享与专用分工</strong>：shared experts 捕获守恒律、对称性等跨 PDE 共性，routed experts 学习不同方程族的专有模式",
        "<strong>负载均衡损失</strong>：用 expert importance 的 coefficient of variation 惩罚路由塌缩，鼓励专家使用更均衡",
        "<strong>多数据集预训练</strong>：在 6 个公开 PDE 数据集上训练 30M 到 0.5B 参数模型，覆盖 FNO、PDEBench 和 CFDBench 来源",
        "<strong>效果与解释性</strong>：论文报告 90M activated params 模型相对 120M activated params 现有模型零样本误差最高降低约 40%，路由决策可用来以约 98% 准确率识别数据集类型"
      ],
      "detail": "<p><img alt=\"MoE-POT 架构示意图\" src=\"https://arxiv.org/html/2510.25803v1/x4.png\" />\n<em>图：MoE-POT 的模型架构。轨迹来自混合 PDE 数据集，模型用历史帧预测下一帧；MoE layer 由 shared experts、routed experts 和 router-gating network 组成。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># MoE-POT 训练伪代码\ndef moe_pot_forward(u_history):\n    # u_history: [B, H, W, T, C]\n\n    # 1. patchification + spatiotemporal positional encoding\n    z_time = []\n    for t in range(T):\n        z_t = PatchConv(u_history[:, :, :, t] + pos_embed(x, y, t))\n        z_time.append(z_t)\n\n    # 2. temporal aggregation with Fourier feature\n    z = sum(W_t(z_time[t]) * exp(-1j * gamma * t) for t in range(T))\n\n    # 3. repeated Fourier + MoE blocks\n    balance_loss = 0.0\n    for block in blocks:\n        z = block.fourier_layer(z)  # F^{-1}(R_phi * F[z])\n\n        logits = block.router(z)        # CNN router, shape [B, N_r]\n        weights = softmax(logits)\n        topk_idx, topk_w = topk(weights, k=4)\n\n        shared_out = mean(expert(z) for expert in block.shared_experts)  # 2 experts\n        routed_out = sum(topk_w[k] * block.routed_experts[topk_idx[k]](z)\n                         for k in range(4))\n        z = shared_out + routed_out\n\n        balance_loss += cv_importance_loss(weights)\n\n    return decode_next_frame(z), balance_loss\n\nfor u_history, u_next in mixed_pde_loader:\n    noisy_history = u_history + epsilon_noise()\n    pred, lb = moe_pot_forward(noisy_history)\n    loss = mse(pred, u_next) + lb\n    loss.backward()\n    optimizer.step()\n</code></pre>\n<h5>为什么需要 MoE</h5>\n<p>PDE 预训练面临两个冲突目标。第一，模型需要把不同方程族、边界条件和时空分辨率的数据混在一起学，才能成为更通用的 PDE foundation model；第二，直接把所有异构数据压进一个 dense backbone 往往产生负迁移。论文的 preliminary experiment 显示，同一方程族内不同参数混训只会带来相对温和的误差上升，而完全不同方程类型混训时误差可能急剧恶化。</p>\n<p>MoE-POT 的设计目标是把“容量扩展”和“每次推理成本”解耦。dense 模型增大宽度/深度时，所有参数都会在推理中激活；MoE 则把参数拆成专家集合，只激活与当前输入最相关的一小部分。对 PDE 来说，路由网络还具有物理含义：不同数据集/方程族会触发不同专家组合，shared experts 则保留跨任务共性。</p>\n<h5>输入编码与时间聚合</h5>\n<p>输入是时变 PDE 场：</p>\n<div class=\"kb-math kb-math-display\">\\bm{u}^{&lt;T}\\in\\mathbb{R}^{H\\times W\\times T\\times C}</div>\n<p>每个时间步先加可学习时空位置编码，再经 patchification layer：</p>\n<div class=\"kb-math kb-math-display\">Z_p^t=\\mathcal{P}(\\bm{u}^t+\\bm{p}^t),\\quad t=1,\\ldots,T</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\mathcal{P}</span> 是卷积层，位置编码可写为：</p>\n<div class=\"kb-math kb-math-display\">p_{i,j}^t=W_p(x_i,y_j,t)</div>\n<p>随后用 Fourier feature 形式的时间聚合把多个历史帧汇成局部动态表示：</p>\n<div class=\"kb-math kb-math-display\">\\bm{z}_{\\operatorname{agg}}\n=\\sum_t W_t\\cdot\\bm{z}_p^t e^{-i\\bm{\\gamma}t}</div>\n<p>直觉上，这一步让模型仅从观测轨迹中隐式推断 PDE 类型和动力学参数，而不依赖显式方程系数输入。</p>\n<h5>Fourier Layer</h5>\n<p>每个主干 block 先通过 Fourier layer 近似核积分。连续形式为：</p>\n<div class=\"kb-math kb-math-display\">(\\mathcal{K}_{\\phi}z^l)(x)\n=\\int_{\\Omega}\\kappa(x,y;\\phi)z^l(y)\\,dy</div>\n<p>为了降低复杂度，令核具有平移不变性：</p>\n<div class=\"kb-math kb-math-display\">\\kappa(x,y;\\phi)=\\kappa(x-y;\\phi)</div>\n<p>于是可在傅里叶域高效实现：</p>\n<div class=\"kb-math kb-math-display\">(\\mathcal{K}_{\\phi}z^l)(x)\n=\\mathcal{F}^{-1}\\left[R_{\\phi}\\cdot\\mathcal{F}[z^l]\\right]</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">R_\\phi(k)</span> 是频率相关的可学习变换。论文还使用 multi-head/grouping，把通道分成多个子空间分别进行频谱变换，以兼顾表达力和显存效率。</p>\n<h5>MoE Layer</h5>\n<p>MoE layer 接收 Fourier layer 输出的特征 <span class=\"kb-math kb-math-inline\">z_0^l(x)</span>。router-gating network <span class=\"kb-math kb-math-inline\">s^l</span> 产生 routed experts 的 logits：</p>\n<div class=\"kb-math kb-math-display\">s^l(z_0^l(x))\\in\\mathbb{R}^{N_r},\\qquad N_r=16</div>\n<p>softmax 后得到路由权重：</p>\n<div class=\"kb-math kb-math-display\">w^l(z_0^l(x))=\\operatorname{Softmax}(s^l(z_0^l(x)))\\in\\mathbb{R}^{N_r}</div>\n<p>为保持稀疏性，只保留 Top-<span class=\"kb-math kb-math-inline\">K</span> 项，论文默认 <span class=\"kb-math kb-math-inline\">K=4</span>：</p>\n<div class=\"kb-math kb-math-display\">\\operatorname{TopK}(w^l(z_0^l(x)))\n=\\{(i_k,w_k^l(z_0^l(x)))\\}_{k=1}^{K}</div>\n<p>shared experts 始终激活，routed experts 动态选择。MoE 输出为：</p>\n<div class=\"kb-math kb-math-display\">z^{l+1}(x)\n=\\frac{1}{N_s}\\sum_{i=1}^{N_s}E_i^{l(s)}(z_0^l(x))\n+\\sum_{k=1}^{K}w_k^l(z_0^l(x))\\cdot E_{i_k}^{l(r)}(z_0^l(x))</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">N_s=2</span>，<span class=\"kb-math kb-math-inline\">N_r=16</span>，<span class=\"kb-math kb-math-inline\">K=4</span>。论文将 expert 和 router 都实现为 CNN，以保留 PDE 场的局部空间结构。</p>\n<div class=\"key-point\">💡 关键：shared experts 提供所有 PDE 都能用的“公共物理子程序”，routed experts 则按输入动态选择，降低不同方程族之间的参数冲突。</div>\n<h5>负载均衡与训练损失</h5>\n<p>MoE 的常见风险是 routing collapse：少数专家被频繁选择，其余专家长期闲置。MoE-POT 对每层每个 expert 定义 batch importance：</p>\n<div class=\"kb-math kb-math-display\">\\operatorname{Importance}_i^l=\\sum_{b=1}^{B}w_{i,b}^l(x)</div>\n<p>再用 routed experts importance 的变异系数作为均衡惩罚：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{balance}^l\n=w_{bal}\\cdot\n\\operatorname{CV}\\left(\\{\\operatorname{Importance}_i^l\\}_{i=1}^{N_r}\\right)^2</div>\n<p>主任务是自回归去噪预测下一帧：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}\n=\\sum_{1\\leq t\\leq T}\n\\left\\|\\mathcal{G}_w(\\bm{u}^{&lt;t}+\\bm{\\varepsilon})-\\bm{u}^t\\right\\|_2^2\n+\\sum_{l=1}^{N}\\mathcal{L}_{balance}^l</div>\n<p>噪声 <span class=\"kb-math kb-math-inline\">\\bm{\\varepsilon}</span> 缓解训练和多步推理之间的分布偏移；balance loss 则保证扩大总参数量后，专家不会退化成只用少数几个。</p>\n<h5>与 dense operator transformer 的区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方面</th>\n<th>Dense POT/DPOT 类模型</th>\n<th>MoE-POT</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>容量扩展</td>\n<td>增宽/加深，所有参数激活</td>\n<td>增加专家，总参数变大但稀疏激活</td>\n</tr>\n<tr>\n<td>多 PDE 混训</td>\n<td>单一参数空间承载全部方程</td>\n<td>路由专家隔离方程族特征</td>\n</tr>\n<tr>\n<td>推理成本</td>\n<td>近似随总参数线性增长</td>\n<td>随 activated experts 增长</td>\n</tr>\n<tr>\n<td>可解释性</td>\n<td>难判断方程类型影响</td>\n<td>routing pattern 可反映数据集/PDE 类型</td>\n</tr>\n<tr>\n<td>风险</td>\n<td>负迁移、过高推理成本</td>\n<td>routing collapse，需要 balance loss</td>\n</tr>\n</tbody>\n</table></div>\n<p>论文的解释性分析显示，训练后的 router-gating pattern 可用于推断数据集类型，说明 MoE 不只是增加参数量，而是在不同 PDE 动力学之间形成了可观察的专家分工。</p>",
      "quiz": {
        "q": "MoE-POT 中 shared experts 与 routed experts 的分工是什么？",
        "options": [
          "shared experts 只用于训练，routed experts 只用于推理",
          "shared experts 始终激活以学习跨 PDE 共性，routed experts 由 router 动态选择以学习方程特异模式",
          "shared experts 用于处理图结构，routed experts 用于处理文本 token",
          "shared experts 负责损失函数，routed experts 负责数据增强"
        ],
        "answer": 1,
        "explain": "MoE-POT 每层固定激活 2 个 shared experts，同时从 16 个 routed experts 中选择 Top-4；这种设计兼顾公共物理规律与不同 PDE 类型的专门化。"
      }
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
      "summary": "Poseidon 提出以 scalable Operator Transformer (scOT) 为骨干的 PDE 基础模型，用 lead-time 条件化和 all2all 训练把少量 PDE 轨迹扩展成大规模算子学习样本，从而在下游 PDE 上用极少标注样本达到甚至超过专用 FNO 的精度。",
      "keyPoints": [
        "<strong>scOT 多尺度算子 Transformer</strong>：用 patch embedding、SwinV2 shifted-window attention、patch merging/expansion 和 U-Net 式跳连构成多尺度神经算子。",
        "<strong>连续时间条件化</strong>：在 LayerNorm 中注入 lead time <span class=\"kb-math kb-math-inline\">t</span>，使同一个模型可以直接查询任意目标时刻的解，而不只做固定步长预测。",
        "<strong>all2all 训练策略</strong>：利用时间相关 PDE 解算子的半群性质，把一条长度 <span class=\"kb-math kb-math-inline\">K</span> 的轨迹从 <span class=\"kb-math kb-math-inline\">O(K)</span> 个相邻样本扩展为 <span class=\"kb-math kb-math-inline\">O(K^2)</span> 个任意起止时间对。",
        "<strong>PDEgym 预训练语料</strong>：在 compressible Euler 和 incompressible Navier-Stokes 的多种数据分布上预训练，再迁移到 15 个未见下游任务。",
        "<strong>跨 PDE 迁移方式</strong>：通过通道补零、任务特定 embedding/recovery 层和主干参数迁移，把不同物理变量数目的 PDE 映射到统一 scOT 骨干。",
        "<strong>样本效率突出</strong>：论文报告 Poseidon 在 14/15 个下游任务上表现最优，并且达到同等误差所需样本数相对 FNO 的中位节省约 50 倍；任务元信息中的“20 样本达 FNO 千样本精度”对应这种少样本迁移现象。",
        "<strong>开源生态</strong>：Poseidon 模型、PDEgym 数据集和训练代码均公开，便于复现实验和作为 PDE foundation model 基线。"
      ],
      "detail": "<h5>来源与核心图示</h5>\n<p>任务给出的 <code>paper_url</code> 指向 <code>2602.15004</code>，该链接实际是 2026 年将 Poseidon 用作火星大气 weather emulator 的应用论文；Poseidon 方法本体的可访问论文是 <code>https://arxiv.org/abs/2405.19101</code>，官方代码为 <code>https://github.com/camlab-ethz/poseidon</code>。下面的方法解读以 Poseidon 本体论文为主，并把任务给出的 URL 视作相关应用来源。</p>\n<p><img alt=\"Poseidon / scOT 架构与 all2all 训练\" src=\"https://arxiv.org/html/2405.19101v2/x2.png\" />\n<em>图：scOT 主干、SwinV2 block、shifted-window attention 和 all2all 训练示意；Poseidon 用该骨干学习从初始条件到整条 PDE 轨迹的解算子。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># Poseidon 预训练与少样本微调伪代码\nmodel = scOT(\n    patch_embed=True,\n    swin_v2_stages=True,\n    time_conditioned_layernorm=True,\n    unet_multiscale=True,\n)\n\n# 预训练：每条 PDE 轨迹 u_i(t_0), ..., u_i(t_K) 生成 all2all 时间对\nfor trajectory in pretraining_pdegym:\n    for k in range(K + 1):\n        for l in range(k, K + 1):\n            x0 = trajectory.u[k]                 # 作为新的“初值”\n            tau = trajectory.t[l] - trajectory.t[k]\n            target = trajectory.u[l]\n\n            pred = model(x0, lead_time=tau)\n            loss = relative_l2(pred, target)\n            optimizer.step(loss)\n\n# 下游任务：迁移主干，重置或高学习率训练任务特定 embedding/recovery\nmodel.load_pretrained_backbone()\nmodel.reset_task_specific_io_if_needed()\nfor batch in few_shot_downstream_data:\n    pred = model(batch.initial_or_input_field, lead_time=batch.tau)\n    loss = relative_l2(pred, batch.solution)\n    optimizer.step(loss)\n</code></pre>\n<h5>问题形式与解算子目标</h5>\n<p>Poseidon 学的不是单个时间步映射，而是 PDE 的解算子。对时间相关 PDE，令初值或输入函数为 <span class=\"kb-math kb-math-inline\">a</span>，解为 <span class=\"kb-math kb-math-inline\">u(t)</span>，解算子写成：</p>\n<div class=\"kb-math kb-math-display\">u(t)=\\mathcal{S}(t,a),\\qquad \\mathcal{S}:[0,T]\\times \\mathcal{X}\\to \\mathcal{X}.</div>\n<p>因此训练目标是得到 <span class=\"kb-math kb-math-inline\">\\mathcal{S}^{*}_{\\theta}(t,a)\\approx \\mathcal{S}(t,a)</span>，给定初值后可以直接生成任意时刻的解，而不是像普通自回归模型那样只能一步一步向前滚动。这个目标对 foundation model 很关键：预训练得到的表示要能迁移到不同 PDE、不同初值分布、不同时间尺度和不同输出变量数。</p>\n<h5>scOT 主干：把视觉 Transformer 改造成神经算子</h5>\n<p>scOT 先把输入场 <span class=\"kb-math kb-math-inline\">a\\in C(D;\\mathbb{R}^n)</span> 切成非重叠 patch，并用共享线性层嵌入为 <span class=\"kb-math kb-math-inline\">C</span> 维 token：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{v}=\\widehat{\\mathbf{E}}(a)\\in C(D;\\mathbb{R}^{C}).</div>\n<p>随后 token 进入分层 SwinV2 Transformer。每个 block 只在窗口内做多头自注意力，下一层窗口平移半个窗口宽度，让信息跨窗口交换。相比全局 ViT 注意力，这把高分辨率 PDE 场上的注意力成本限制在局部窗口内；相比纯卷积，又保留了跨区域组合特征的能力。编码器通过 patch merging 降低空间分辨率并提高通道数，解码器通过 patch expansion 恢复分辨率，U-Net 式跳连用 ConvNeXt block 把同尺度编码特征传给解码端。</p>\n<div class=\"key-point\">💡 关键：Poseidon 的“基础模型能力”不只来自 Transformer 容量，而来自多尺度算子结构。patch/窗口机制提供可扩展性，U-Net 层级提供局部到全局的 PDE 表达，任务特定输入输出层提供跨 PDE 变量数适配。</div>\n<h5>lead-time 条件化：连续时间查询</h5>\n<p>标准 LayerNorm 对所有时间使用同一归一化参数，难以区分短时间外推和长时间演化。Poseidon 在归一化后加入 lead-time 调制：</p>\n<div class=\"kb-math kb-math-display\">\\mathrm{LN}_{t}(z)=\\alpha(t)\\odot \\frac{z-\\mu(z)}{\\sqrt{\\sigma^2(z)+\\epsilon}}+\\beta(t),</div>\n<div class=\"kb-math kb-math-display\">\\alpha(t)=\\alpha_1 t+\\alpha_0,\\qquad \\beta(t)=\\beta_1 t+\\beta_0.</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\alpha_1,\\alpha_0,\\beta_1,\\beta_0</span> 是可学习参数。直觉上，lead time 是“要求模型演化多远”的条件变量：小 <span class=\"kb-math kb-math-inline\">t</span> 更像局部时间推进，大 <span class=\"kb-math kb-math-inline\">t</span> 需要更强的全局稳定性和耗散/传播模式。把 <span class=\"kb-math kb-math-inline\">t</span> 注入每层归一化，比只把时间拼到输入通道更深地影响特征流。</p>\n<h5>all2all 训练：用半群性质放大数据</h5>\n<p>时间相关 PDE 解算子满足半群关系：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{S}(t_{\\ell}-t_k,\\mathcal{S}(t_k,a))=\\mathcal{S}(t_{\\ell},a),\\qquad 0\\le k\\le \\ell\\le K.</div>\n<p>普通训练通常只用相邻时间对 <span class=\"kb-math kb-math-inline\">(u(t_k),u(t_{k+1}))</span>，而 Poseidon 把任意早晚时刻都作为训练对：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{all2all}(\\theta)=\n\\frac{1}{M\\widehat{K}}\n\\sum_{i=1}^{M}\\sum_{0\\le k\\le \\ell\\le K}\n\\frac{\n\\left\\|\\mathcal{S}^{*}_{\\theta}(t_{\\ell}-t_k,u_i(t_k))-u_i(t_{\\ell})\\right\\|_2^2\n}{\n\\left\\|u_i(t_{\\ell})\\right\\|_2^2+\\epsilon\n},</div>\n<div class=\"kb-math kb-math-display\">\\widehat{K}=\\frac{(K+1)(K+2)}{2}.</div>\n<p>这相当于把同一条数值轨迹切成大量“从任意状态出发、到任意未来时刻”的监督样本。它同时训练短期、长期和跨尺度时间映射，因此比只学一步预测更接近真正的解算子学习任务。</p>\n<h5>预训练、微调与 FNO 的区别</h5>\n<p>FNO 的强项是频域卷积，适合在固定 PDE/固定网格分布上学习算子；但每个任务通常需要重新训练，且面对未见 PDE 时样本效率有限。Poseidon 选择先在 PDEgym 的 Euler/Navier-Stokes 族上学习通用流体动力学表示，再微调到波方程、Poisson/Helmholtz、airfoil、变系数对流等未见任务。微调时，若下游 PDE 的输入/输出通道与预训练不同，就重置或快速学习 embedding/recovery 层；大量 scOT 主干参数从预训练继承。</p>\n<p>这解释了为什么 Poseidon 能在少样本下达到 FNO 大样本效果：FNO 从目标任务的样本里同时学习“物理表示”和“任务读写层”，Poseidon 则把前者主要放在预训练阶段完成。下游 20 个样本并不是凭空替代 1000 个样本，而是用来把已有 PDE 表示对齐到新任务。</p>\n<h5>局限与使用注意</h5>\n<p>Poseidon 本体主要在规则 Cartesian 网格和有限 PDE 族上验证。论文也指出，若要覆盖更广泛的非笛卡尔几何、强边界条件变化或椭圆型稳态问题，需要更丰富的预训练数据和更强的几何适配机制。因此在复杂 CAD/非结构网格问题上，GAOT、GINO、RIGNO 等几何算子模型可能更合适；在规则网格且目标是跨 PDE 少样本迁移时，Poseidon 的 foundation model 路线更有优势。</p>",
      "quiz": {
        "q": "Poseidon 的 all2all 训练主要利用了时间相关 PDE 解算子的什么性质？",
        "options": [
          "傅里叶变换的平移不变性",
          "解算子的半群性质，可从轨迹中构造任意起止时间对",
          "边界条件的周期性",
          "SwinV2 窗口注意力的局部性"
        ],
        "answer": 1,
        "explain": "all2all 使用 \\(\\mathcal{S}(t_l-t_k, u(t_k))=u(t_l)\\)，把一条轨迹扩展为 \\(O(K^2)\\) 个监督样本。"
      }
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
      "summary": "GAOT 提出一种面向任意域 PDE 的 encode-process-decode 神经算子：用多尺度注意力图神经算子和几何嵌入把非结构点云编码成 latent tokens，再由 Transformer 做全局交互并用对称的 MAGNO 解码器在任意查询点输出解场。",
      "keyPoints": [
        "<strong>MAGNO 编解码器</strong>：把单尺度 GNO 扩展为 Multiscale Attentional Graph Neural Operator，在多个邻域半径上聚合 PDE 输入和局部几何信息。",
        "<strong>几何嵌入显式建模域形状</strong>：在每个尺度上用局部统计量或点集嵌入描述邻域点分布，弥补单纯坐标输入难以表达边界/空洞/局部密度的缺陷。",
        "<strong>latent token grid 三种选择</strong>：支持规则 stencil grid、原始点云下采样、投影低维网格；主实验中规则 latent grid 兼顾效率和精度。",
        "<strong>Transformer 全局处理器</strong>：MAGNO encoder 先把物理点云压到 latent tokens，ViT/RoPE/RMSNorm 处理器再做全局信息交换，避免每层都在百万级物理点上做消息传递。",
        "<strong>MAGNO decoder 任意点查询</strong>：对任意物理查询点 <span class=\"kb-math kb-math-inline\">x</span>，从附近 latent tokens 多尺度聚合并恢复目标解，天然支持变分辨率输入输出。",
        "<strong>时间相关 PDE 支持</strong>：把当前时间 <span class=\"kb-math kb-math-inline\">t</span>、lead time <span class=\"kb-math kb-math-inline\">\\tau</span> 和当前状态 <span class=\"kb-math kb-math-inline\">u(t)</span> 作为输入，并可用 direct、residual 或 time-derivative 三种 time-stepping 形式；训练时可配合 all2all。",
        "<strong>工程可扩展性</strong>：图构建离线预计算/缓存、encoder/decoder 顺序处理、Transformer 批处理、必要时 edge dropping，使 GAOT 能处理 DrivAerNet++、DrivAerML、NASA-CRM 等大规模 3D CFD 数据。"
      ],
      "detail": "<h5>来源与核心图示</h5>\n<p>任务给出的 NeurIPS 页面可访问摘要和 PDF；更便于抽取方法细节的版本是 arXiv <code>https://arxiv.org/abs/2505.18781</code>，项目页为 <code>https://camlab-ethz.github.io/GAOT/</code>，代码页为 <code>https://github.com/shizheng-wen/GAOT</code>。</p>\n<p><img alt=\"GAOT 架构示意图\" src=\"https://arxiv.org/html/2505.18781v4/x2.png\" />\n<em>图：GAOT 使用 MAGNO encoder 将物理点云与输入函数聚合为几何感知 latent tokens，经 ViT 处理器全局交换信息，再用 MAGNO decoder 在任意查询点恢复 PDE 解。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># GAOT 前向传播伪代码\ndef gaot_forward(points_x, input_a, query_x, geometry_info, time=None, tau=None):\n    # 1. 选择 latent point cloud / token grid\n    latent_y = build_latent_grid(points_x, strategy=&quot;structured_stencil&quot;)\n\n    # 2. MAGNO encoder: physical -&gt; latent\n    latent_tokens = []\n    for y in latent_y:\n        scale_features = []\n        for r_m in multiscale_radii:\n            neighbors = cached_neighbors(center=y, points=points_x, radius=r_m)\n            agno = attentional_gno(y, neighbors, input_a, radius=r_m)\n            geom = geometry_embedding(y, neighbors, geometry_info)\n            scale_features.append(MLP(concat(agno, geom)))\n        latent_tokens.append(attentional_scale_fusion(scale_features))\n\n    # 3. Transformer processor on latent tokens\n    z = patchify(latent_tokens)\n    for block in vit_blocks:\n        z = z + flash_grouped_attention(RMSNorm(z), rope=True)\n        z = z + feed_forward(RMSNorm(z))\n    processed_tokens = unpatchify(z)\n\n    # 4. MAGNO decoder: latent -&gt; arbitrary physical query points\n    outputs = []\n    for x in query_x:\n        scale_features = []\n        for r_m in decoder_radii:\n            neighbors = cached_neighbors(center=x, points=latent_y, radius=r_m)\n            agno = attentional_gno(x, neighbors, processed_tokens, radius=r_m)\n            geom = geometry_embedding(x, neighbors, geometry_info)\n            scale_features.append(MLP(concat(agno, geom)))\n        outputs.append(readout(attentional_scale_fusion(scale_features)))\n\n    return stack(outputs)\n</code></pre>\n<h5>从 GNO 到 AGNO：局部积分不再只看单一尺度</h5>\n<p>传统 GNO/GINO 的 encoder 可理解为在 latent 点 <span class=\"kb-math kb-math-inline\">y</span> 周围做核积分：</p>\n<div class=\"kb-math kb-math-display\">w_e(y)=\\sum_{x_k\\in N(y)}\n\\alpha_k\\,K_{\\theta}(y,x_k,a(x_k))\\,\\varphi_{\\theta}(a(x_k)),</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">N(y)</span> 是半径 <span class=\"kb-math kb-math-inline\">r</span> 内的物理邻域。GAOT 认为单一半径很难同时处理边界层、小涡结构和大尺度几何轮廓，因此定义多组半径：</p>\n<div class=\"kb-math kb-math-display\">r_m=s_m r_0,\\qquad m=1,\\ldots,\\bar{m}.</div>\n<p>在每个尺度上，GAOT 用注意力替代固定 quadrature 权重：</p>\n<div class=\"kb-math kb-math-display\">\\alpha_{k}^{m}(y)=\n\\mathrm{softmax}_{x_k\\in N_m(y)}\n\\left(\n\\frac{q_m(y)^\\top k_m(x_k)}{\\sqrt{d}}\n\\right),</div>\n<div class=\"kb-math kb-math-display\">\\widetilde{w}^{m}_{e}(y)=\n\\sum_{x_k\\in N_m(y)}\n\\alpha_{k}^{m}(y)\\,\nK_{\\theta}^{m}(y,x_k,a(x_k))\\,\\varphi_{\\theta}^{m}(a(x_k)).</div>\n<p>直觉上，半径小的邻域负责边界和局部梯度，半径大的邻域负责整体形状和远场条件；注意力权重让模型根据每个 <span class=\"kb-math kb-math-inline\">y</span> 的局部状态自动决定哪些邻居更重要。</p>\n<h5>几何嵌入与多尺度融合</h5>\n<p>仅把坐标 <span class=\"kb-math kb-math-inline\">(x,y,z)</span> 输入 GNO 并不足以表达“这个点附近是边界、孔洞、尖角、稀疏采样还是密集采样”。GAOT 在每个尺度 <span class=\"kb-math kb-math-inline\">m</span> 上为 latent 点计算几何嵌入 <span class=\"kb-math kb-math-inline\">g^m(y)</span>，例如邻居数量、局部点分布统计量、相对坐标形状描述等。随后将 PDE 聚合特征和几何嵌入拼接：</p>\n<div class=\"kb-math kb-math-display\">\\widehat{w}^{m}(y)=\\mathrm{MLP}_{m}\\left([\\widetilde{w}^{m}_{e}(y), g^m(y)]\\right).</div>\n<p>不同尺度不是简单相加，而是再经过一个尺度注意力：</p>\n<div class=\"kb-math kb-math-display\">\\beta_m(y)=\n\\mathrm{softmax}_{m}\\left(\\psi_m(\\widehat{w}^{m}(y))\\right),\n\\qquad\nw_e(y)=\\sum_{m=1}^{\\bar{m}}\\beta_m(y)\\widehat{w}^{m}(y).</div>\n<p>这就是 MAGNO encoder。MAGNO decoder 做相反方向：以物理查询点 <span class=\"kb-math kb-math-inline\">x</span> 为中心，在 latent tokens 上构造多尺度邻域，聚合 processed tokens 与几何嵌入，输出 <span class=\"kb-math kb-math-inline\">u(x)</span>。这种对称设计使 GAOT 不依赖固定网格输出，任意点都可查询。</p>\n<h5>Transformer 处理器为什么放在 latent 空间</h5>\n<p>若直接在物理点云上堆 Transformer，百万级 CFD 表面点会让注意力和显存成本不可承受；若只用局部 GNN，则长程依赖传播慢。GAOT 把重计算放到 latent tokens 上：encoder 只做一次 physical <span class=\"kb-math kb-math-inline\">\\to</span> latent，decoder 只做一次 latent <span class=\"kb-math kb-math-inline\">\\to</span> physical，中间多层全局 self-attention 都在较小 token grid 上运行。</p>\n<p>处理器使用 RoPE 注入相对位置，RMSNorm 稳定训练，并在实现中使用 Grouped Query / Flash Attention。对规则 latent grid，tokens 可以按 patch 输入 ViT block；对非规则 latent 点，也可以使用相应的坐标位置编码。</p>\n<h5>时间相关 PDE 与训练损失</h5>\n<p>对稳态 PDE，GAOT 直接学习：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{S}_{\\theta}(a)(x_j)\\approx u_{\\mathrm{true}}(x_j).</div>\n<p>训练损失是点级 MSE：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{MSE}=\n\\frac{1}{N_s N_p}\n\\sum_{i=1}^{N_s}\\sum_{j=1}^{N_p}\n\\left\\|\n\\mathcal{S}_{\\theta}(\\cdot)_i(x_j)-\\mathbf{u}_{\\mathrm{true},i}(x_j)\n\\right\\|_2^2.</div>\n<p>对时间相关 PDE，输入扩展为 <span class=\"kb-math kb-math-inline\">a(t)=(c,u(t))</span>，模型输出：</p>\n<div class=\"kb-math kb-math-display\">\\widehat{\\mathcal{S}}_{\\theta}(x,t,\\tau,a(t)).</div>\n<p>最终时间推进可以写成：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{S}_{\\theta}(t,\\tau,a(t))(x)\n=\\gamma u(t,x)+\\delta\\widehat{\\mathcal{S}}_{\\theta}(x,t,\\tau,a(t)).</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">(\\gamma,\\delta)=(0,1)</span> 是直接预测 <span class=\"kb-math kb-math-inline\">u(t+\\tau)</span>，<span class=\"kb-math kb-math-inline\">(1,1)</span> 是残差预测，<span class=\"kb-math kb-math-inline\">(1,\\tau)</span> 近似预测时间导数。论文消融显示 time-derivative marching 常更优，因为它把小步演化写成对当前状态的平滑修正。</p>\n<h5>与 GINO / RIGNO / Transolver 的区别</h5>\n<p>GINO 的典型路线是 GNO encoder + 规则 latent grid + FNO/神经算子处理器 + GNO decoder，适合任意几何但单尺度局部聚合较弱。RIGNO 强在图神经算子和不规则点云，但全局处理效率受图规模影响。Transolver 通过物理注意力 token 化降低点云成本，但每层都涉及 slice/deslice 到物理点，超大网格下开销仍高。</p>\n<p>GAOT 的关键折中是：encoder/decoder 只在两端碰物理点云，中间层都在 latent token 域；同时 MAGNO 让物理到 latent 的映射具备多尺度几何感知能力。这也是它能在 DrivAerML 约 900 万表面点这种数据上保持可训练性的原因。</p>\n<h5>工程注意点</h5>\n<p>GAOT 的效果依赖图构建和 latent grid 选择。论文默认把坐标缩放到 <span class=\"kb-math kb-math-inline\">[-1,1]^d</span>，多尺度半径示例为 <span class=\"kb-math kb-math-inline\">\\{0.022,0.033,0.044\\}</span>；工业 3D 数据常用单尺度半径和 KNN 补边保证每个物理点至少连接到 latent tokens。图构建通常离线缓存，训练时避免反复搜索邻域。若直接在线构图，encoder/decoder 的邻域搜索会成为瓶颈，掩盖 Transformer 处理器的效率优势。</p>",
      "quiz": {
        "q": "GAOT 相比 GINO 的核心结构增强是什么？",
        "options": [
          "只把 FNO 的傅里叶模态数加倍",
          "用 MAGNO 在多个邻域尺度上注意力聚合，并显式加入局部几何嵌入",
          "完全移除 latent tokens，直接在物理点云上做全局 Transformer",
          "只使用固定规则网格，放弃任意查询点输出"
        ],
        "answer": 1,
        "explain": "GAOT 的主要创新是多尺度注意力图神经算子和几何嵌入，并通过 latent token 处理器保持全局建模效率。"
      }
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
      "summary": "GINOT 用边界点云作为几何表示，通过采样-分组几何编码器生成 cross-attention 的 Key/Value，再让任意查询点作为 Query 解码 PDE 解场，从而在无需 SDF 或固定参数化几何的情况下处理复杂 2D/3D 任意域。",
      "keyPoints": [
        "<strong>边界点云几何表示</strong>：以 surface/boundary point cloud 表示几何，不依赖 signed distance function、规则网格或固定维度几何参数。",
        "<strong>采样与分组编码局部几何</strong>：使用 iterative farthest point sampling 选取 <span class=\"kb-math kb-math-inline\">N_s</span> 个中心，再在半径 <span class=\"kb-math kb-math-inline\">r</span> 的球邻域内分组 <span class=\"kb-math kb-math-inline\">N_p</span> 个点以提取局部形状特征。",
        "<strong>局部-全局 cross-attention</strong>：局部分组特征作为 Query，NeRF positional encoding 得到的全局点云特征作为 Key/Value，通过注意力融合局部与全局几何。",
        "<strong>点序与 padding 鲁棒性</strong>：采样/分组保证对点顺序不敏感；padding 点在采样、分组和注意力矩阵中被 mask，避免影响几何编码。",
        "<strong>解码器任意点查询</strong>：query points 经 positional encoding 与 MLP 生成 Query，注意力读取几何编码器输出的 Key/Value，最后用 MLP 输出该点解场。",
        "<strong>额外物理输入扩展</strong>：载荷、材料参数、边界条件等非几何输入可由额外 encoder 处理，再与几何编码拼接并聚合成 decoder 的 Key/Value。",
        "<strong>训练损失带 mask</strong>：对变长 query points 做 padding 后，用 masked MSE 排除无效点；实验同时报告 <span class=\"kb-math kb-math-inline\">L_2</span> relative error 和 NRMSE。"
      ],
      "detail": "<h5>来源与核心图示</h5>\n<p>任务给出的 <code>https://arxiv.org/abs/2601.ginot</code> 不是有效 arXiv 页面。可追溯的 GINOT 论文为 <code>https://arxiv.org/abs/2504.19452</code>，UIUC/Illinois 专家页和官方 GitHub <code>https://github.com/QibangLiu/GINOT</code> 也提供了相同方法摘要。因此本文保留任务 YAML 中的 URL，但方法解读基于可访问的 <code>2504.19452v2</code> 版本。</p>\n<p><img alt=\"GINOT 架构总览图\" src=\"https://arxiv.org/html/2504.19452v2/x2.png\" />\n<em>图：GINOT 的 geometry encoder 先把边界点云编码为 Key/Value；solution decoder 将查询点编码为 Query，通过 cross-attention 读取几何信息并输出解场。</em></p>\n<p><img alt=\"GINOT 额外输入扩展\" src=\"https://arxiv.org/html/2504.19452v2/x3.png\" />\n<em>图：当问题还包含载荷、材料、边界条件等非几何输入时，额外 encoder 的输出与几何编码拼接，再聚合为 solution decoder 的 Key/Value。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># GINOT 前向传播伪代码\ndef ginot_forward(boundary_points, query_points, extra_inputs=None, masks=None):\n    # 1. Geometry encoder: sampling + grouping\n    centers = farthest_point_sampling(boundary_points, Ns, mask=masks.boundary)\n    groups = ball_grouping(boundary_points, centers, radius=r, max_points=Np)\n\n    # 2. Local geometry features from grouped neighborhoods\n    grouped_pos = nerf_positional_encoding(groups)\n    local = conv2d_mlp(concat(groups, grouped_pos))  # [Ns, C]\n\n    # 3. Cross-attention inside geometry encoder\n    global_feat = linear(nerf_positional_encoding(boundary_points))\n    local = cross_attention(\n        Q=local,\n        K=global_feat,\n        V=global_feat,\n        mask=masks.boundary,\n    )\n    geom_tokens = self_attention_stack(local)\n    geom_k, geom_v = linear_to_key_value(geom_tokens)\n\n    # 4. Optional extra inputs such as load/material/BC\n    if extra_inputs is not None:\n        extra_tokens = extra_encoder(extra_inputs)\n        geom_k, geom_v = aggregate_with_mlp(concat(geom_k, geom_v, extra_tokens))\n\n    # 5. Solution decoder at arbitrary query points\n    q = mlp(nerf_positional_encoding(query_points))\n    h = cross_attention(Q=q, K=geom_k, V=geom_v)\n    pred = solution_mlp(h)\n\n    return pred\n</code></pre>\n<h5>几何编码器：为什么采样-分组是核心</h5>\n<p>任意几何的边界点云有三个麻烦：点的顺序没有物理意义、不同区域点密度不一致、不同样本点数不同。GINOT 的 geometry encoder 首先用 iterative farthest point sampling 选择 <span class=\"kb-math kb-math-inline\">N_s</span> 个代表中心。该过程从一个点开始，每次选择离已选集合最远的点，直到得到较均匀覆盖的中心集合。</p>\n<p>每个中心再用球邻域分组：半径 <span class=\"kb-math kb-math-inline\">r</span> 内的点组成一组；如果不足 <span class=\"kb-math kb-math-inline\">N_p</span> 个，用最近点补齐；如果超过 <span class=\"kb-math kb-math-inline\">N_p</span> 个，只保留最近的 <span class=\"kb-math kb-math-inline\">N_p</span> 个。于是 grouped tensor 形状为：</p>\n<div class=\"kb-math kb-math-display\">G\\in \\mathbb{R}^{N_s\\times N_p\\times d}.</div>\n<p>这些局部分组与 NeRF positional encoding 后的点特征拼接，经 2D convolution 和 MLP 压缩为 <span class=\"kb-math kb-math-inline\">N_s\\times C</span> 的局部几何 token。采样-分组的作用类似 PointNet++：把无序点云转成一组局部 patch 表示，同时对输入点排列保持不敏感。</p>\n<h5>注意力机制：局部 Query 读取全局几何</h5>\n<p>GINOT 在 geometry encoder 内部使用 cross-attention。局部分组特征作为 <span class=\"kb-math kb-math-inline\">Q</span>，全局点云 positional encoding 生成 <span class=\"kb-math kb-math-inline\">K,V</span>：</p>\n<div class=\"kb-math kb-math-display\">\\mathrm{Attn}(Q,K,V)=\n\\mathrm{softmax}\\left(\\frac{QK^\\top}{\\sqrt{d_e}}\\right)V.</div>\n<p>这样每个局部 patch 可以从整个边界点云中选择与自己相关的全局几何信息，例如对称结构、远处孔洞或整体外形。后续 self-attention 层继续在局部 tokens 之间交换信息，最终线性层把几何 tokens 转成 solution decoder 所需的 Key/Value。</p>\n<h5>padding mask：变长点云不污染注意力</h5>\n<p>批训练时，不同几何的边界点数和 query 点数不同，通常需要 padding 到 batch 内最大长度。GINOT 对 padding 做两层处理：一是在采样/分组阶段禁止 padding 点被选中；二是在注意力分数中把 padding 位置设为 <span class=\"kb-math kb-math-inline\">-\\infty</span>：</p>\n<div class=\"kb-math kb-math-display\">\\mathrm{Attn}(Q,K,V;M)=\n\\mathrm{softmax}\\left(\\frac{QK^\\top+M}{\\sqrt{d_e}}\\right)V,</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">M_{ij}=0</span> 表示有效点，<span class=\"kb-math kb-math-inline\">M_{ij}=-\\infty</span> 表示 padding 点。softmax 后 padding 权重为 0，因此不会进入几何表示。这个设计让模型对点顺序和 padding 都鲁棒。</p>\n<h5>解码器：查询点是 Query，几何是 Key/Value</h5>\n<p>solution decoder 的目标是在任意 query point <span class=\"kb-math kb-math-inline\">x_q</span> 输出解 <span class=\"kb-math kb-math-inline\">u(x_q)</span>。查询点先经过 NeRF positional encoding 和 MLP 得到 Query：</p>\n<div class=\"kb-math kb-math-display\">Q_q=\\mathrm{MLP}(\\gamma_{\\mathrm{NeRF}}(x_q)).</div>\n<p>然后用 cross-attention 从 geometry encoder 的 Key/Value 中读取几何上下文：</p>\n<div class=\"kb-math kb-math-display\">h_q=\\mathrm{Attn}(Q_q,K_{\\mathrm{geom}},V_{\\mathrm{geom}}),\n\\qquad\n\\hat{u}(x_q)=\\mathrm{MLP}_{out}(h_q).</div>\n<p>这种结构把“几何是什么样”与“要在哪里求解”分离开来：边界点云只需要编码一次，任意数量和分布的 query points 都可以共享同一个几何表示。这与 DeepONet 的 branch/trunk 解耦有相似直觉，但 GINOT 用 attention 将查询点和几何 token 细粒度耦合。</p>\n<h5>额外输入与训练损失</h5>\n<p>许多工程问题不仅有几何变化，还包含载荷、材料、边界条件或历史状态变化。GINOT 的扩展版给这些输入增加额外 encoders，并把输出与几何 encoder 的 tokens 拼接，再用 MLP 聚合成 decoder 的 <span class=\"kb-math kb-math-inline\">K,V</span>。例如 bracket lug 数据集中，压力载荷被 MLP 编码后与几何 token 融合，使 decoder 同时感知“形状”和“载荷”。</p>\n<p>训练使用 masked MSE。若 batch 内 query points padding 后共有 <span class=\"kb-math kb-math-inline\">N</span> 个位置，mask <span class=\"kb-math kb-math-inline\">m_i=1</span> 表示有效点，<span class=\"kb-math kb-math-inline\">m_i=0</span> 表示 padding，则：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{MSE}=\n\\frac{\n\\sum_{i=1}^{N}m_i\\left\\|\\hat{y}_i-y_i\\right\\|_2^2\n}{\n\\sum_{i=1}^{N}m_i+1\n}.</div>\n<p>论文实验使用六类数据：elasticity、structured/unstructured Poisson、bracket lugs、micro-periodic unit cell、Jet Engine Bracket 等，覆盖 2D/3D、参数化几何、完全任意几何和变长 query 点。结果显示 GINOT 在不依赖 SDF 的情况下能保持较好精度，但对 Jet Engine Bracket 这类样本少且几何极复杂的任务仍有过拟合风险。</p>\n<h5>与 GAOT / GINO 的关系</h5>\n<p>GINOT 更像“点云几何 encoder + attention decoder”的连续查询模型，重点解决任意几何表示和变长点云输入。GAOT 更像大规模 neural operator 框架，用 MAGNO encoder/decoder + latent Transformer 处理器把精度、吞吐和工业 CFD 尺度结合起来。GINO 则主要通过 GNO 在物理域和 latent grid 之间映射，再由 FNO 处理 latent 表示。若任务规模中等、几何边界点云是主要输入，GINOT 的结构直接且易解释；若目标是百万级点云和高吞吐训练，GAOT 的 latent-token 工程设计更强。</p>",
      "quiz": {
        "q": "GINOT 中 solution decoder 的 Query、Key、Value 分别来自哪里？",
        "options": [
          "Query 来自查询点编码，Key/Value 来自几何编码器输出",
          "Query 来自边界点云，Key/Value 来自查询点编码",
          "Query、Key、Value 都来自同一个固定规则网格",
          "Query 来自损失函数，Key/Value 来自优化器状态"
        ],
        "answer": 0,
        "explain": "GINOT 先把边界点云编码为几何 Key/Value，再把任意 query points 编码为 Query，通过 cross-attention 输出对应位置的解场。"
      }
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
      "summary": "S-NOT 将 GRU 的序列载荷编码与 Transformer 的自注意力/交叉注意力结合起来，解决 S-DeepONet 在时间依赖、路径依赖非线性 PDE 中只能用固定点积融合 branch/trunk 表征的问题，使每个空间查询点都能按需读取完整载荷历史。",
      "keyPoints": [
        "<strong>可访问来源说明</strong>：任务给定的 <code>https://arxiv.org/abs/2601.snot</code> 是占位式链接；可访问论文为 arXiv:2507.03272《Sequential Neural Operator Transformer for High-Fidelity Surrogates of Time-Dependent Non-linear Partial Differential Equations》",
        "<strong>两段式架构</strong>：Sequential loading encoder 处理时间序列输入，solution decoder 在目标查询点生成全场解",
        "<strong>GRU 保留因果历史</strong>：沿用 S-DON 的 GRU 编码器处理载荷、边界条件或多物理输入序列，避免普通 FNN branch 丢失顺序信息",
        "<strong>Self-attention 强化序列表示</strong>：GRU 输出叠加正弦位置编码后进入多层自注意力块，进一步选择关键时间片和输入通道",
        "<strong>Cross-attention 替代点积融合</strong>：decoder 将 NeRF 风格位置编码后的查询点作为 <span class=\"kb-math kb-math-inline\">Q</span>，将序列编码作为 <span class=\"kb-math kb-math-inline\">K,V</span>，让每个查询位置动态聚合载荷历史",
        "<strong>面向强非线性材料响应</strong>：在钢连铸热-力耦合、3D lug、dog-bone 等塑性/热黏塑性路径依赖任务上对比 S-DON",
        "<strong>精度提升且推理仍快</strong>：论文报告 S-NOT 在三个数据集上均降低 stress/PEEQ/temperature 误差，GPU 单样本推理时间与 S-DON 同量级"
      ],
      "detail": "<h5>核心架构示意</h5>\n<p><img alt=\"S-NOT 架构示意图\" src=\"https://arxiv.org/html/2507.03272v1/x1.png\" />\n<em>图：S-NOT 由序列载荷编码器和解码器组成；编码器用 GRU 与 self-attention 得到载荷历史表示，解码器用查询点 embedding 与 cross-attention 输出目标物理场。来源为 arXiv:2507.03272v1 HTML 的 Figure 2。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># S-NOT 前向传播与训练伪代码\ndef snot_forward(load_sequence, query_points):\n    # load_sequence: [batch, T, input_channels]\n    # query_points: [batch, Nq, coord_dim]\n\n    h_seq = GRU_encoder(load_sequence)                 # 保留时间/路径依赖\n    h_seq = h_seq + sinusoidal_time_encoding(T=h_seq.shape[1])\n\n    z = h_seq\n    for block in encoder_self_attention_blocks:\n        z = layer_norm(z + self_attention(Q=z, K=z, V=z))\n        z = layer_norm(z + feed_forward(z))\n\n    q = nerf_positional_encoding(query_points)\n    q = query_mlp(q)                                   # [batch, Nq, de]\n\n    y = q\n    for block in decoder_cross_attention_blocks:\n        y = layer_norm(y + cross_attention(Q=y, K=z, V=z))\n        y = layer_norm(y + feed_forward(y))\n\n    field_pred = output_mlp(y)                         # [batch, Nq, n_fields]\n    return field_pred\n\nfor load_sequence, query_points, field_true in dataloader:\n    field_pred = snot_forward(load_sequence, query_points)\n    loss = mse(field_pred, field_true)                 # 或全场相对 L2 / MAE 指标\n    loss.backward()\n    optimizer.step()\n</code></pre>\n<h5>动机与背景</h5>\n<p>DeepONet 通过 branch net 编码输入函数、trunk net 编码查询坐标，再用内积输出 <span class=\"kb-math kb-math-inline\">G(u)(y)</span>。这个结构适合许多静态或弱路径依赖算子，但在真实工程模拟里，边界载荷、热流、位移和压力常常是时间序列；塑性、黏塑性或相变材料的当前状态不仅取决于当前输入，也取决于完整历史。</p>\n<p>Sequential DeepONet (S-DON) 已经用 GRU 替换普通 branch network 来编码序列输入，但它仍然用固定点积合并 branch 与 trunk：</p>\n<div class=\"kb-math kb-math-display\">\\hat{u}(q)=\\sum_{\\ell=1}^{d_e} b_\\ell(s_{1:T})\\,t_\\ell(q)+b_0.</div>\n<p>这个融合方式对所有查询点使用同一组 branch 表征，查询点无法显式选择“哪些时间片、哪些载荷特征对当前位置最重要”。S-NOT 的核心改动是把这个点积替换为注意力机制。</p>\n<h5>核心机制：从固定内积到查询相关聚合</h5>\n<p>论文使用标准 scaled dot-product attention：</p>\n<div class=\"kb-math kb-math-display\">\\operatorname{Attention}(Q,K,V)\n=\\operatorname{softmax}\\left(\\frac{QK^{T}}{\\sqrt{d_e}}\\right)V.</div>\n<p>在 encoder 中，GRU 输出 <span class=\"kb-math kb-math-inline\">h_{1:T}</span> 叠加时间位置编码后被线性投影为 <span class=\"kb-math kb-math-inline\">Q,K,V</span>，经过 self-attention 得到序列表示 <span class=\"kb-math kb-math-inline\">z_{1:T}</span>。这一步让不同时间片之间可以直接交互，例如某个后期塑性响应可回看早期加载峰值。</p>\n<p>在 decoder 中，每个查询点 <span class=\"kb-math kb-math-inline\">q_i=(x_i,y_i,z_i,t_i)</span> 先通过 NeRF-style positional encoding 和 MLP 形成查询向量 <span class=\"kb-math kb-math-inline\">Q_i</span>。然后 <span class=\"kb-math kb-math-inline\">Q_i</span> 与 encoder 输出的 <span class=\"kb-math kb-math-inline\">K,V</span> 做 cross-attention：</p>\n<div class=\"kb-math kb-math-display\">c_i=\\operatorname{Attention}(Q_i, K_{\\text{seq}}, V_{\\text{seq}}),\\qquad\n\\hat{u}(q_i)=\\operatorname{MLP}_{\\text{out}}(c_i).</div>\n<p>因此，同一个载荷历史会被不同空间位置以不同权重读取。靠近约束、载荷接触面或高应力集中区域的查询点，可以关注与该位置响应更相关的时间片；远离关键区域的位置则可聚合更平滑的历史特征。</p>\n<h5>训练与评估流程</h5>\n<p>训练数据由数值模拟生成：输入是时变载荷或边界条件序列，输出是目标时间或终态的全场物理量。S-NOT 可在任意查询节点上评估，因此训练时可把有限元节点、空间坐标和目标字段组成监督样本。典型监督损失可写为：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}(\\theta)=\\frac{1}{B N_q}\\sum_{b=1}^{B}\\sum_{i=1}^{N_q}\n\\left\\|\\hat{u}_{\\theta}^{(b)}(q_i)-u^{(b)}(q_i)\\right\\|_2^2.</div>\n<p>论文结果主要用 stress 的相对误差和 PEEQ 的 MAE 衡量。S-NOT 在 steel solidification 中将 stress mean error 从 S-DON 的 18.1% 降到 4.3%，在 3D lug 中从 11.6% 降到 5.31%，在 dog-bone 中从 2.01% 降到 1.13%。这些提升尤其体现在高误差长尾样本上，说明 cross-attention 对异常路径和局部强非线性更稳健。</p>\n<h5>与 S-DON、FNO 类方法的区别</h5>\n<p>S-NOT 不是 FNO 那类在规则网格上用频域卷积参数化积分核的模型，而是更接近 DeepONet/Transformer 组合：输入函数由序列网络编码，输出坐标作为 query 逐点解码。它继承 DeepONet 适合任意查询点的优点，也继承 GRU 对时间历史的归纳偏置。</p>\n<p>与 S-DON 的关键差别在 fusion：S-DON 的 branch/trunk 点积相当于固定双线性读出；S-NOT 的 cross-attention 是查询相关读出。这个变化增加了模型对空间位置、载荷时间片和输出物理量之间复杂依赖的表达能力，但仍保持与 S-DON 接近的推理开销。</p>\n<div class=\"key-point\">💡 关键：S-NOT 的创新不只是“把 Transformer 加进来”，而是把算子学习中最关键的 branch-trunk 融合从静态内积改成了可学习的注意力检索。</div>",
      "quiz": {
        "q": "S-NOT 相比 S-DeepONet 的核心机制变化是什么？",
        "options": [
          "用 cross-attention 让每个查询点从序列载荷表示中动态聚合信息",
          "用 FFT 替代所有空间坐标编码，从而只在频域预测解",
          "完全取消 GRU，只保留普通全连接 branch network",
          "把监督损失替换为强化学习奖励函数"
        ],
        "answer": 0,
        "explain": "S-DON 用固定点积合并 branch 和 trunk；S-NOT 将查询点表示作为 Q、序列编码作为 K,V，通过 cross-attention 做查询相关的信息读取。"
      }
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
      "summary": "FEDONet 在 DeepONet 的 trunk 输入端加入固定随机 Fourier feature embedding，解决普通 MLP trunk 对高频、尖锐梯度和多尺度 PDE 解存在低频偏置的问题，同时保留 Branch-Trunk 算子学习框架的连续坐标查询能力。",
      "keyPoints": [
        "<strong>可访问来源说明</strong>：任务给定的 <code>https://arxiv.org/abs/2511.09</code> 不指向有效论文；可访问预印本为 arXiv:2509.12344《FEDONet: Fourier-Embedded DeepONet for Spectrally Accurate Operator Learning》",
        "<strong>即插即用改造</strong>：不改 branch network，只把 trunk 的原始坐标 <span class=\"kb-math kb-math-inline\">\\zeta</span> 替换为 Fourier embedding <span class=\"kb-math kb-math-inline\">\\phi(\\zeta)</span>",
        "<strong>随机 Fourier 特征</strong>：使用固定高斯频率矩阵 <span class=\"kb-math kb-math-inline\">B</span>，构造 <span class=\"kb-math kb-math-inline\">[\\sin(2\\pi B\\zeta),\\cos(2\\pi B\\zeta)]</span> 作为坐标特征",
        "<strong>缓解谱偏置</strong>：把高频模式显式暴露给 trunk MLP，提升对振荡、间断、尖锐界面和混沌时空结构的表达",
        "<strong>核近似视角</strong>：<span class=\"kb-math kb-math-inline\">\\phi(\\zeta)^\\top\\phi(\\zeta&#x27;)</span> 近似 shift-invariant kernel，相当于对 trunk 做谱预条件",
        "<strong>训练目标保持简单</strong>：仍采用监督式 operator learning 和 MSE/relative <span class=\"kb-math kb-math-inline\">L_2</span> 误差，不需要额外 PDE 残差项",
        "<strong>验证范围广</strong>：论文覆盖 2D Poisson、Burgers、Lorenz-63、Eikonal、Lorenz-96、Allen-Cahn、Kuramoto-Sivashinsky 等 PDE/动力系统基准"
      ],
      "detail": "<h5>核心架构示意</h5>\n<p><img alt=\"FEDONet 架构示意图\" src=\"https://arxiv.org/html/2509.12344v1/Fourier_Embedded_DeepONet_Diagram.png\" />\n<em>图：FEDONet 保持 DeepONet 的 branch-trunk 内积结构，但在 trunk 前插入 Fourier embedding，使坐标输入先被映射到随机正弦/余弦谱特征。来源为 arXiv:2509.12344v1 HTML 的 Figure 1。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># FEDONet 前向传播伪代码\nclass FourierEmbedding:\n    def __init__(self, coord_dim, num_frequencies, sigma):\n        self.B = normal(mean=0.0, std=sigma, shape=(num_frequencies, coord_dim))\n        self.B.requires_grad_(False)                  # 论文默认固定，不训练\n\n    def __call__(self, zeta):\n        phase = 2.0 * pi * zeta @ self.B.T\n        return concat([sin(phase), cos(phase)], dim=-1)\n\ndef fedonet_forward(u_sensors, zeta):\n    # u_sensors: 输入函数在 sensors 上的值\n    # zeta: 输出查询坐标，可为空间坐标或空间-时间坐标\n    branch_coeff = branch_net(u_sensors)              # [batch, p]\n    trunk_feat = fourier_embedding(zeta)              # [batch, 2M]\n    trunk_basis = trunk_net(trunk_feat)                # [batch, p]\n    pred = sum(branch_coeff * trunk_basis, dim=-1)\n    return pred\n\nfor u_batch, zeta_batch, target_batch in dataloader:\n    pred = fedonet_forward(u_batch, zeta_batch)\n    loss = mean_squared_error(pred, target_batch)\n    loss.backward()\n    optimizer.step()\n</code></pre>\n<h5>动机与背景</h5>\n<p>标准 DeepONet 的预测形式为：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{G}_{\\theta}(u)(\\zeta)=B_{\\theta}(u)\\cdot T_{\\theta}(\\zeta).</div>\n<p>其中 branch 输出由输入函数决定，trunk 输出由查询位置决定。这个分解让 DeepONet 可以在任意坐标上求值，但 trunk 通常是以原始坐标为输入的 MLP。普通 MLP 存在 spectral bias：训练早期倾向先拟合低频分量，高频和局部尖锐结构收敛慢、误差大。对 Poisson 源项、Burgers 激波、Allen-Cahn 相界面或 KS 混沌轨迹，这种偏置会表现为过平滑和能谱衰减。</p>\n<p>FEDONet 的改动很小：给定 <span class=\"kb-math kb-math-inline\">\\zeta\\in\\mathbb{R}^{d}</span>，先做随机 Fourier 特征映射：</p>\n<div class=\"kb-math kb-math-display\">\\phi(\\zeta)=\\left[\\sin(2\\pi B\\zeta),\\cos(2\\pi B\\zeta)\\right],\n\\qquad B_{ij}\\sim\\mathcal{N}(0,\\sigma^2).</div>\n<p>然后把 <span class=\"kb-math kb-math-inline\">\\phi(\\zeta)</span> 而不是 <span class=\"kb-math kb-math-inline\">\\zeta</span> 输入 trunk：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{G}_{\\theta}(u)(\\zeta)\n=B_{\\theta}(u)\\cdot T_{\\theta}(\\phi(\\zeta))\n=\\sum_{k=1}^{p}b_k(u)\\,t_k(\\phi(\\zeta)).</div>\n<h5>核心机制：谱预条件的 trunk</h5>\n<p>Fourier embedding 的第一层作用可以理解为把低维坐标提升到一组固定正弦/余弦基上。若 <span class=\"kb-math kb-math-inline\">B</span> 中包含足够多尺度的频率，trunk MLP 不必从原始坐标里慢慢学习出高频振荡，而是可以直接组合已有谱特征。</p>\n<p>从 kernel 视角看，随机特征满足近似关系：</p>\n<div class=\"kb-math kb-math-display\">k(\\zeta,\\zeta&#x27;)\\approx \\phi(\\zeta)^{\\top}\\phi(\\zeta&#x27;).</div>\n<p>这意味着 trunk 不再只是在欧氏坐标上学习，而是在一个近似平移不变核的特征空间中学习。论文还讨论了近似 whitening：</p>\n<div class=\"kb-math kb-math-display\">\\mathbb{E}_{\\zeta}\\left[\\phi(\\zeta)\\phi(\\zeta)^{\\top}\\right]\\approx I,</div>\n<p>它降低特征相关性，使优化问题更接近各向同性，对梯度下降和 NTK 条件数都有帮助。</p>\n<h5>训练流程与损失函数</h5>\n<p>FEDONet 采用监督式数据集：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{D}=\n\\left\\{\\left(u^{(i)}, \\{\\zeta_j^{(i)},s_j^{(i)}\\}_{j=1}^{Q}\\right)\\right\\}_{i=1}^{N},\n\\qquad s_j^{(i)}=G(u^{(i)})(\\zeta_j^{(i)}).</div>\n<p>训练目标是经验 MSE：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}(\\theta)=\n\\frac{1}{N}\\sum_{i=1}^{N}\\frac{1}{Q}\\sum_{j=1}^{Q}\n\\left\\|G_{\\theta}(u^{(i)})(\\zeta_j^{(i)})-s_j^{(i)}\\right\\|^2.</div>\n<p>因为 Fourier embedding 固定不训练，新增开销主要是一次矩阵乘法和三角函数计算；branch-trunk 内积、任意查询坐标、连续输出等 DeepONet 优点都保留。频率尺度 <span class=\"kb-math kb-math-inline\">\\sigma</span> 和频率数 <span class=\"kb-math kb-math-inline\">M</span> 是关键超参数：太小无法覆盖高频，太大可能引入过高频噪声或使训练更难。</p>\n<h5>与 DeepONet 和 FNO 的区别</h5>\n<p>FEDONet 与 FNO 都利用频域思想，但层级完全不同。FNO 在每一层通过 FFT 参数化全局积分核，适合规则网格上的全场张量输入输出；FEDONet 只在 trunk 坐标端做 Fourier lifting，仍是 DeepONet 式的点查询结构，更容易处理连续坐标查询、非固定输出位置和已有 DeepONet 代码。</p>\n<p>与普通 DeepONet 相比，FEDONet 的 branch 部分不变，主要改变 trunk 的函数类：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{H}_{\\phi}\\supset \\mathcal{H}_{\\text{vanilla}}.</div>\n<p>直觉上，原始 trunk 必须用 MLP 权重自己“合成”高频基；FEDONet 先把多尺度正弦/余弦交给 trunk，再由 MLP 学习组合系数。因此它对细尺度、振荡和能谱尾部更友好。论文在多个基准上报告 FEDONet 相比 vanilla DeepONet 有约 2-3 倍平均相对 <span class=\"kb-math kb-math-inline\">L_2</span> 改善，在 Kuramoto-Sivashinsky 等高频混沌问题上提升尤其明显。</p>\n<div class=\"key-point\">💡 关键：FEDONet 的创新点不是把 DeepONet 改成 Fourier operator，而是用固定 Fourier 特征修正 trunk 的坐标表示，让 DeepONet 更像一个可学习的谱/Galerkin 合成器。</div>",
      "quiz": {
        "q": "FEDONet 中 Fourier embedding 放在 DeepONet 的哪个位置，主要解决什么问题？",
        "options": [
          "放在 trunk 输入端，用谱特征缓解 MLP 对高频结构的低频偏置",
          "放在 branch 输出端，用随机噪声增强输入函数采样",
          "放在损失函数之后，用 FFT 直接替代反向传播",
          "放在优化器内部，用频率裁剪减少学习率"
        ],
        "answer": 0,
        "explain": "FEDONet 将查询坐标映射为随机正弦/余弦特征后送入 trunk，使 trunk 更容易表示振荡、多尺度和尖锐结构，同时保留 DeepONet 的 branch-trunk 结构。"
      }
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
      "summary": "PI-Latent-NO 用两个端到端耦合的 DeepONet 在低维潜空间中学习 PDE 解算子，并通过自动微分把 PDE 残差、边界和初值约束直接加入训练，解决全空间 physics-informed neural operator 在高时空分辨率下计算和显存开销过大的问题。",
      "keyPoints": [
        "<strong>可访问来源说明</strong>：任务给定的 <code>https://arxiv.org/abs/2601.pilno</code> 是占位式链接；可访问论文为 arXiv:2501.08428《Physics-Informed Latent Neural Operator for Real-time Predictions of time-dependent parametric PDEs》",
        "<strong>两级 DeepONet</strong>：Latent-DeepONet 将随机输入场/参数映射到时间相关低维潜变量，Reconstruction-DeepONet 将潜变量解码回原始空间解场",
        "<strong>端到端物理信息训练</strong>：两个网络单次联合训练，通过 <span class=\"kb-math kb-math-inline\">\\hat{u}</span> 的时空导数计算 PDE residual，不依赖大量配对标签",
        "<strong>可选数据/潜变量监督</strong>：若有少量高保真轨迹，可用 PCA/POD/autoencoder 得到 latent trajectory，并加入 <span class=\"kb-math kb-math-inline\">\\mathcal{L}_u</span>、<span class=\"kb-math kb-math-inline\">\\mathcal{L}_z</span> 约束",
        "<strong>时空可分离计算</strong>：PI-Vanilla-NO 需要对 <span class=\"kb-math kb-math-inline\">n_t n_x</span> 个时空点评估 trunk；PI-Latent-NO 可近似拆成时间潜变量评估和空间重构评估，降低到接近 <span class=\"kb-math kb-math-inline\">n_t+n_x</span>",
        "<strong>面向高维参数 PDE</strong>：验证包括 1D diffusion-reaction、1D Burgers、2D stove-burner transient diffusion、2D Burgers 等",
        "<strong>计算缩放优势</strong>：论文报告随空间/时间 collocation 增加，PI-Latent-NO 的 runtime 和 memory 近似稳定，PI-Vanilla-NO 更容易出现显存瓶颈"
      ],
      "detail": "<h5>核心架构示意</h5>\n<p><img alt=\"PI-Latent-NO 架构示意图\" src=\"https://arxiv.org/html/2501.08428v3/x2.png\" />\n<em>图：PI-Latent-NO 的 proposed architecture panel。Latent-DeepONet 先学习低维 latent representation，Reconstruction-DeepONet 再从 latent 表示重构物理空间解；训练时用自动微分计算 PDE 约束。来源为 arXiv:2501.08428v3 HTML 的 Figure 1(b)。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># PI-Latent-NO 训练伪代码\ndef latent_deeponet(xi, t):\n    # xi: 随机输入场、参数或初值的离散表示\n    # t: 时间坐标\n    return G_latent(xi, t)                            # z(t; xi) in R^{n_z}\n\ndef reconstruction_deeponet(z, x):\n    # z: latent state at time t\n    # x: 空间坐标\n    return G_recon(z, x)                              # u_hat(t, x; xi)\n\nfor iteration in range(num_iterations):\n    xi_batch = sample_input_functions(batch_size)\n    t_r, x_r = sample_residual_collocation_points()\n    t_bc, x_bc = sample_boundary_points()\n    x_ic = sample_initial_points()\n\n    z_r = latent_deeponet(xi_batch, t_r)\n    u_r = reconstruction_deeponet(z_r, x_r)\n\n    residual = d_dt(u_r) + PDE_operator(\n        u_r, d_dt(u_r), d_dx(u_r), d2_dx2(u_r), t_r, x_r, xi_batch\n    )\n\n    loss_r = mse(residual, 0.0)\n    loss_bc = mse(boundary_operator(u_hat_at(t_bc, x_bc)), 0.0)\n    loss_ic = mse(u_hat_at(0.0, x_ic), initial_condition(xi_batch, x_ic))\n\n    loss_data = optional_mse(u_hat_on_labeled_points, true_u)\n    loss_latent = optional_mse(z_on_labeled_times, latent_targets)\n\n    loss = (lambda_r * loss_r\n            + lambda_bc * loss_bc\n            + lambda_ic * loss_ic\n            + lambda_u * loss_data\n            + lambda_z * loss_latent)\n    loss.backward()\n    optimizer.step()\n</code></pre>\n<h5>动机与背景</h5>\n<p>物理信息神经算子希望学习从随机输入配置 <span class=\"kb-math kb-math-inline\">\\boldsymbol{\\xi}</span> 到 PDE 解场 <span class=\"kb-math kb-math-inline\">u(t,\\boldsymbol{x})</span> 的映射，同时满足控制方程：</p>\n<div class=\"kb-math kb-math-display\">\\begin{cases}\n\\frac{\\partial u}{\\partial t}\n+\\mathcal{N}\\left(u,\\frac{\\partial u}{\\partial t},\n\\frac{\\partial u}{\\partial\\boldsymbol{x}},\n\\frac{\\partial^2 u}{\\partial\\boldsymbol{x}^2},\n\\ldots,t,\\boldsymbol{x},\\gamma(t,\\boldsymbol{x})\\right)=0,\n\\quad \\text{in }\\Omega\\times(0,T],\\\\\nu(0,\\boldsymbol{x})=g(\\boldsymbol{x}),\\quad \\boldsymbol{x}\\in\\Omega,\\\\\n\\mathcal{B}\\left(u,\\frac{\\partial u}{\\partial\\boldsymbol{x}},\nt,\\boldsymbol{x},\\gamma\\right)=0,\n\\quad \\text{on }\\partial\\Omega\\times(0,T].\n\\end{cases}</div>\n<p>直接在全时空域上训练 PI-Vanilla-NO 时，模型必须对大量 <span class=\"kb-math kb-math-inline\">(t,\\boldsymbol{x})</span> collocation 点评估解并反传导数。若时间点数为 <span class=\"kb-math kb-math-inline\">n_t</span>、空间点数为 <span class=\"kb-math kb-math-inline\">n_x</span>，全空间 trunk 评估数量接近 <span class=\"kb-math kb-math-inline\">O(n_t n_x)</span>，显存和自动微分成本会迅速放大。</p>\n<p>PI-Latent-NO 的核心假设是：很多 PDE 解轨迹虽然在原始网格上维度很高，但时空动力学可由较低维潜变量描述。于是模型先学习</p>\n<div class=\"kb-math kb-math-display\">\\boldsymbol{z}(t;\\boldsymbol{\\xi})\n=\\mathcal{G}_{\\text{latent}}(\\boldsymbol{\\xi})(t)\\in\\mathbb{R}^{n_z},</div>\n<p>再用重构算子输出物理空间解：</p>\n<div class=\"kb-math kb-math-display\">\\hat{u}(t,\\boldsymbol{x};\\boldsymbol{\\xi})\n=\\mathcal{G}_{\\text{recon}}\\left(\\boldsymbol{z}(t;\\boldsymbol{\\xi})\\right)(\\boldsymbol{x}).</div>\n<h5>物理信息损失与端到端训练</h5>\n<p>对预测解 <span class=\"kb-math kb-math-inline\">\\hat{u}</span> 用自动微分计算时空导数，构造 residual：</p>\n<div class=\"kb-math kb-math-display\">r_{\\theta}(t,\\boldsymbol{x};\\boldsymbol{\\xi})\n=\\frac{\\partial \\hat{u}}{\\partial t}\n+\\mathcal{N}\\left(\\hat{u},\\frac{\\partial \\hat{u}}{\\partial t},\n\\frac{\\partial \\hat{u}}{\\partial\\boldsymbol{x}},\n\\frac{\\partial^2 \\hat{u}}{\\partial\\boldsymbol{x}^2},\n\\ldots,t,\\boldsymbol{x},\\gamma\\right).</div>\n<p>总损失可概括为：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}\n=\\lambda_r\\mathcal{L}_r\n+\\lambda_{bc}\\mathcal{L}_{bc}\n+\\lambda_{ic}\\mathcal{L}_{ic}\n+\\lambda_u\\mathcal{L}_u\n+\\lambda_z\\mathcal{L}_z.</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\mathcal{L}_r</span> 是 PDE residual MSE，<span class=\"kb-math kb-math-inline\">\\mathcal{L}_{bc}</span> 与 <span class=\"kb-math kb-math-inline\">\\mathcal{L}_{ic}</span> 分别约束边界和初值；<span class=\"kb-math kb-math-inline\">\\mathcal{L}_u</span> 是可选的少量解场监督，<span class=\"kb-math kb-math-inline\">\\mathcal{L}_z</span> 是可选的 latent trajectory 监督。若无标签数据，可令 <span class=\"kb-math kb-math-inline\">\\lambda_u=\\lambda_z=0</span>，进行纯 physics-informed 训练。</p>\n<p>如果有少量高保真轨迹，论文建议先用 PCA/POD/autoencoder 获得潜变量轨迹：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{T}_{z,i}\n=\\left[\\boldsymbol{z}_{0}^{(i)},\\boldsymbol{z}_{\\Delta t}^{(i)},\n\\ldots,\\boldsymbol{z}_{n_t\\Delta t}^{(i)}\\right],\n\\qquad \\boldsymbol{z}_a\\in\\mathbb{R}^{n_z}.</div>\n<p>这些潜变量不是必须项，而是作为数据稀缺场景下的额外约束，帮助 Latent-DeepONet 更快对齐有物理意义的低维流形。</p>\n<h5>为什么能降低复杂度</h5>\n<p>PI-Vanilla-NO 通常把 <span class=\"kb-math kb-math-inline\">(t,\\boldsymbol{x})</span> 联合坐标送入 trunk，因此每个输入样本需要处理 <span class=\"kb-math kb-math-inline\">n_t n_x</span> 个时空查询。PI-Latent-NO 把“时间演化”和“空间重构”拆开：Latent-DeepONet 主要沿时间产生 <span class=\"kb-math kb-math-inline\">n_z</span> 维潜状态，Reconstruction-DeepONet 再把潜状态投影到空间坐标。</p>\n<p>这种结构带来内在 separability。论文用一个示意例子说明：若有 5 个时间点和 10 个空间点，PI-Vanilla-NO 需要 50 个 trunk evaluations；PI-Latent-NO 可降为约 15 个，即 <span class=\"kb-math kb-math-inline\">5+10</span>。在大网格下，这种差异会转化为显存和自动微分成本的明显优势。</p>\n<div class=\"key-point\">💡 关键：潜空间不是单独预训练后冻结的 ROM，而是与物理解码器一起端到端训练；PDE residual 仍然作用在重构后的 <span class=\"kb-math kb-math-inline\">\\hat{u}</span> 上，因此潜变量必须服务于物理一致的原空间解。</div>\n<h5>与 PINO/PI-Vanilla-NO 的区别</h5>\n<p>PINO 常在 FNO 等全场算子上加入物理残差，优势是能把数据监督与 PDE 约束结合；但若残差需要高阶导数或密集 collocation，计算仍可能随全时空网格增长。PI-Latent-NO 更强调低维 latent bottleneck 和可分离解码，用结构性压缩降低残差训练成本。</p>\n<p>与两阶段 Latent DeepONet 相比，PI-Latent-NO 不依赖先训练好的降维模型再做算子学习，而是把 Latent-DeepONet 与 Reconstruction-DeepONet 联合优化。这样 PDE 约束、少量数据监督和潜变量形状可以共同决定最终表示，避免潜空间只为重构误差服务而忽略物理残差。</p>",
      "quiz": {
        "q": "PI-Latent-NO 相比 PI-Vanilla-NO 获得计算缩放优势的主要原因是什么？",
        "options": [
          "将时间相关潜变量学习与空间重构分离，避免对所有时空点做完整 trunk 评估",
          "完全删除 PDE residual，只依赖监督数据训练",
          "把所有输入场转换为固定 Fourier 模态并丢弃边界条件",
          "只预测一个标量误差指标，不再输出物理场"
        ],
        "answer": 0,
        "explain": "PI-Latent-NO 用 Latent-DeepONet 生成低维时间潜状态，再由 Reconstruction-DeepONet 解码到空间，使计算更接近 n_t+n_x，而不是 PI-Vanilla-NO 的 n_t*n_x。"
      }
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
      "summary": "DiffTaichi 提出面向物理仿真的可微分编程系统，把 Taichi 的高性能 imperative kernel 与自动微分结合起来，解决传统深度学习框架难以高效表达粒子-网格、碰撞、稀疏索引和长时间步仿真的问题。",
      "keyPoints": [
        "<strong>来源修正</strong>：任务给定 <code>paper_url</code> 指向的 arXiv 编号实际不是 DiffTaichi；本文精读使用可访问论文 <code>https://arxiv.org/abs/1910.00935</code>",
        "<strong>两尺度自动微分</strong>：kernel 内使用 source-code transformation 生成 adjoint kernel，kernel 间使用轻量 tape 记录调用并反向重放",
        "<strong>保留 megakernel 性能</strong>：允许把物理仿真的多阶段计算融合进单个 kernel，避免 TensorFlow/PyTorch 式小算子图带来的低算术强度",
        "<strong>面向命令式并行程序</strong>：支持 parallel-for、分支、显式数组读写和灵活索引，更贴近 CUDA/C++/Fortran 风格仿真代码",
        "<strong>全局张量作为检查点</strong>：反向传播时依赖每一步写入的全局状态，必要时用 checkpointing 缓解长轨迹显存压力",
        "<strong>覆盖 10 类模拟器</strong>：包括弹性体 MPM、不可压流体、刚体、布料、海浪、烟雾等，可用于控制、逆设计和参数优化",
        "<strong>控制器端到端优化</strong>：神经网络控制器和可微分仿真模块组成一个可反传程序，可用梯度下降替代高样本量强化学习",
        "<strong>性能与生产力并重</strong>：论文报告弹性体模拟器代码比手写 CUDA 短 4.2 倍、速度相近，且比 TensorFlow 实现快 188 倍"
      ],
      "detail": "<h5>核心架构示意</h5>\n<p><img alt=\"DiffTaichi 神经控制器与仿真耦合示意\" src=\"https://ar5iv.labs.arxiv.org/html/1910.00935/assets/figures/net.png\" />\n<em>图：论文 Figure 1 左侧。神经网络控制器输出动作，DiffTaichi 物理仿真推进状态，最终损失对控制器参数或初始条件反向传播。</em></p>\n<p><img alt=\"DiffTaichi 系统与轻量 tape\" src=\"https://ar5iv.labs.arxiv.org/html/1910.00935/assets/figures/pipeline.png\" />\n<em>图：论文 Figure 2 左侧。DiffTaichi 复用 Taichi 前端、IR 和后端编译器，在 IR 层加入可微分编程扩展。</em></p>\n<p><img alt=\"DiffTaichi tape 反向重放机制\" src=\"https://ar5iv.labs.arxiv.org/html/1910.00935/assets/figures/tape.png\" />\n<em>图：论文 Figure 2 右侧。tape 只记录 kernel launch 结构，反向阶段按相反顺序调用自动生成的 gradient kernel。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># DiffTaichi 的两尺度 AD：kernel 内做源代码变换，kernel 间用 tape 反向重放\ndef optimize_controller(theta, initial_state, target):\n    tape = []\n\n    # forward simulation\n    state = initial_state\n    for t in range(T):\n        action = neural_controller(theta, state)\n        tape.append((&quot;controller&quot;, theta, state, action))\n\n        # each kernel is a Taichi megakernel with explicit indexing / branches\n        launch_kernel(clear_grid, state.grid)\n        tape.append((clear_grid, state.grid))\n        launch_kernel(p2g, state.particles, state.grid, action)\n        tape.append((p2g, state.particles, state.grid, action))\n        launch_kernel(grid_op, state.grid)\n        tape.append((grid_op, state.grid))\n        launch_kernel(g2p, state.grid, state.particles)\n        tape.append((g2p, state.grid, state.particles))\n\n    loss = task_loss(state, target)\n    seed_adjoint(loss, 1.0)\n\n    # reverse pass: replay generated adjoint kernels in reverse launch order\n    for item in reversed(tape):\n        if item[0] == &quot;controller&quot;:\n            backprop_neural_controller(item)\n        else:\n            primal_kernel = item[0]\n            adjoint_kernel = source_transform(primal_kernel)\n            launch_kernel(adjoint_kernel, *item[1:])\n\n    theta -= lr * theta.grad\n</code></pre>\n<h5>问题设定：为什么普通深度学习框架不够用</h5>\n<p>可微分物理仿真的目标是把一个时间推进程序看成可求导映射：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{s}_{t+1}=F_t(\\mathbf{s}_t,\\mathbf{a}_t,\\phi),\\qquad\n\\mathbf{a}_t=\\pi_\\theta(\\mathbf{s}_t),\\qquad\n\\mathcal{L}=\\ell(\\mathbf{s}_{T},\\mathbf{s}^{\\star})</div>\n<p>这里 <span class=\"kb-math kb-math-inline\">\\mathbf{s}_t</span> 是粒子、网格、速度、密度、形变梯度等物理状态，<span class=\"kb-math kb-math-inline\">\\phi</span> 是材料、边界或初始条件参数，<span class=\"kb-math kb-math-inline\">\\pi_\\theta</span> 可以是神经网络控制器。训练需要计算：</p>\n<div class=\"kb-math kb-math-display\">\\frac{\\partial \\mathcal{L}}{\\partial \\theta}\n=\n\\sum_{t=0}^{T-1}\n\\frac{\\partial \\mathcal{L}}{\\partial \\mathbf{s}_{t+1}}\n\\frac{\\partial F_t}{\\partial \\mathbf{a}_t}\n\\frac{\\partial \\pi_\\theta(\\mathbf{s}_t)}{\\partial \\theta}</div>\n<p>核心难点不是公式本身，而是 <span class=\"kb-math kb-math-inline\">F_t</span> 往往由大量命令式并行代码组成：粒子到网格散射、网格边界条件、碰撞分支、邻域 stencil、非连续接触和稀疏结构。把这些逻辑拆成深度学习框架里的小张量算子，会产生大量 gather/scatter、临时数组和 Python/graph 调度开销，算术强度低，且代码不接近传统仿真器写法。</p>\n<h5>两尺度自动微分机制</h5>\n<p>DiffTaichi 的关键设计是把自动微分分成两个尺度。第一个尺度是 <strong>kernel 内部</strong>：对单个 Taichi kernel 的 IR 做 source-code transformation，生成对应的 adjoint kernel。例如一个标量赋值：</p>\n<div class=\"kb-math kb-math-display\">y = f(x_1,x_2)</div>\n<p>反向传播维护 adjoint 变量 <span class=\"kb-math kb-math-inline\">\\bar{x}=\\partial \\mathcal{L}/\\partial x</span>，按链式法则更新：</p>\n<div class=\"kb-math kb-math-display\">\\bar{x}_1 \\mathrel{+}= \\bar{y}\\frac{\\partial f}{\\partial x_1},\\qquad\n\\bar{x}_2 \\mathrel{+}= \\bar{y}\\frac{\\partial f}{\\partial x_2}</div>\n<p>对于并行循环和显式索引，adjoint kernel 仍然是一个高性能并行 kernel；散射累加对应 adjoint 的聚合，必要时使用原子加法或编译器生成的安全累加逻辑。这比 tracing 每一个标量操作更适合 megakernel，因为 forward kernel 的局部性和融合结构在 backward 中得以保留。</p>\n<p>第二个尺度是 <strong>kernel 之间</strong>：一个仿真步通常调用多个 kernel，长轨迹会调用几百到几千次。DiffTaichi 不把整个长程序展开成一个巨大静态计算图，而是用轻量 tape 记录 “调用了哪个 kernel、参数是什么”。反向传播时，tape 按相反顺序重放每个 kernel 的 adjoint 版本：</p>\n<div class=\"kb-math kb-math-display\">\\bar{\\mathbf{s}}_t\n=\n\\left(\\frac{\\partial F_t}{\\partial \\mathbf{s}_t}\\right)^{\\top}\\bar{\\mathbf{s}}_{t+1},\\qquad\n\\bar{\\phi}\n\\mathrel{+}=\n\\left(\\frac{\\partial F_t}{\\partial \\phi}\\right)^{\\top}\\bar{\\mathbf{s}}_{t+1}</div>\n<div class=\"key-point\">💡 关键：DiffTaichi 不在“全程序 tracing”和“全程序源变换”之间二选一，而是 kernel 内源变换、kernel 间 tape。这样既保留灵活控制流，又避免为整段仿真生成庞大代码。</div>\n<h5>全局张量、覆盖规则与 checkpoint</h5>\n<p>传统物理仿真代码经常原地更新数组，但反向传播需要知道某一步使用的旧值。DiffTaichi 要求程序员按可微分程序的规则组织状态：对时间相关变量保留历史，或把全局张量视为反向求值所需的检查点。以显式时间积分为例：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{v}_{t+1}=\\mathbf{v}_{t}+\\Delta t\\,\\mathbf{a}(\\mathbf{x}_t,\\mathbf{v}_t),\\qquad\n\\mathbf{x}_{t+1}=\\mathbf{x}_{t}+\\Delta t\\,\\mathbf{v}_{t+1}</div>\n<p>若只保留最新 <span class=\"kb-math kb-math-inline\">\\mathbf{x},\\mathbf{v}</span>，反向阶段无法恢复 <span class=\"kb-math kb-math-inline\">\\mathbf{a}(\\mathbf{x}_t,\\mathbf{v}_t)</span> 的输入。DiffTaichi 的实践是在数组维度中加入时间轴，或在内存受限时使用 checkpointing：保存部分时间点，反向到中间区间时重新计算 forward 状态。其本质是在内存 <span class=\"kb-math kb-math-inline\">O(T)</span> 和重算时间之间做权衡。</p>\n<h5>以 MPM 弹性体为例</h5>\n<p>论文中的 <code>diffmpm</code> 例子使用 moving least squares material point method，连续体满足动量与质量守恒：</p>\n<div class=\"kb-math kb-math-display\">\\rho\\frac{D\\mathbf{v}}{Dt}\n=\n\\nabla\\cdot\\boldsymbol{\\sigma}+\\rho\\mathbf{g},\\qquad\n\\frac{D\\rho}{Dt}+\\rho\\nabla\\cdot\\mathbf{v}=0</div>\n<p>MPM 的一个时间步通常包含 particle-to-grid、grid operation、grid-to-particle 三段。普通张量框架很难自然表达粒子向网格邻域散射、网格节点条件分支、材料模型和碰撞处理；DiffTaichi 允许直接写：</p>\n<pre><code class=\"language-python\">for p in particles:\n    base = floor(x[p] * inv_dx - 0.5)\n    for offset in neighborhood:\n        weight = bspline_weight(x[p], base + offset)\n        grid_v[base + offset] += weight * particle_momentum[p]\n        grid_m[base + offset] += weight * mass[p]\n</code></pre>\n<p>这种代码在语义上接近 CUDA kernel，但编译器可以为它生成反向 kernel。优化任务可以是控制软体机器人向前移动：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}(\\theta)\n=\n-x_{\\text{center}}(T)\n+\\lambda\\sum_{t=0}^{T-1}\\|\\mathbf{a}_t\\|_2^2</div>\n<p>梯度 <span class=\"kb-math kb-math-inline\">\\partial\\mathcal{L}/\\partial\\theta</span> 会穿过所有 MPM 步和控制器。相比 model-free RL，这种梯度直接告诉控制器“哪个早期动作导致最终位移改变”，样本效率通常更高。</p>\n<h5>与传统方法的区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方面</th>\n<th>普通深度学习框架</th>\n<th>手写 CUDA adjoint</th>\n<th>DiffTaichi</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>程序表达</td>\n<td>张量算子图，复杂索引笨重</td>\n<td>性能高但开发成本高</td>\n<td>命令式并行 kernel，接近仿真代码</td>\n</tr>\n<tr>\n<td>AD 粒度</td>\n<td>小算子 tracing/graph</td>\n<td>人工推导</td>\n<td>kernel 内源变换 + kernel 间 tape</td>\n</tr>\n<tr>\n<td>性能</td>\n<td>大量临时数组和散碎操作</td>\n<td>接近硬件上限</td>\n<td>保留 megakernel 算术强度</td>\n</tr>\n<tr>\n<td>灵活性</td>\n<td>分支、碰撞、scatter 不自然</td>\n<td>灵活但不可维护</td>\n<td>支持分支、显式索引、数据布局优化</td>\n</tr>\n<tr>\n<td>典型应用</td>\n<td>小规模可微分实验</td>\n<td>单个专用模拟器</td>\n<td>多类可微分物理模拟器和控制优化</td>\n</tr>\n</tbody>\n</table></div>\n<p>DiffTaichi 的局限也很清楚：它要求用户理解可微分程序的写入规则；碰撞和接触可能有不可导或梯度不稳定点；长时间仿真的梯度仍可能爆炸、消失或受数值误差影响。因此它不是“自动让所有仿真问题好优化”，而是把高性能物理程序放进可反传优化回路，使梯度获取从手写工程问题变成语言和编译器问题。</p>",
      "quiz": {
        "q": "DiffTaichi 的两尺度自动微分中，轻量 tape 主要记录什么？",
        "options": [
          "每个标量算术操作的完整计算图",
          "kernel launch 顺序与参数，并在反向阶段按相反顺序重放 adjoint kernel",
          "神经网络每一层的权重初始化",
          "所有粒子的最终位置快照，且不需要中间状态"
        ],
        "answer": 1,
        "explain": "DiffTaichi 在 kernel 内通过源代码变换生成梯度 kernel；tape 只负责跨 kernel 的调用记录和反向调度，从而兼顾灵活性与性能。"
      }
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
      "summary": "JAX-MD 把分子动力学写成 JAX 中的纯函数组合，使能量、力、积分器、邻居表和神经势能都可以端到端自动微分并经 XLA 加速，解决传统 MD 软件难以直接接入机器学习优化回路的问题。",
      "keyPoints": [
        "<strong>项目页追溯论文</strong>：任务给定 URL 是 GitHub 项目页；方法精读使用官方仓库、NeurIPS 2020 论文和 arXiv <code>1912.04232</code>",
        "<strong>函数式数据流</strong>：状态由数组/dataclass 表示，模拟由 <code>init_fn</code> 和 <code>update_fn</code> 组成，避免复杂类层次和隐式可变状态",
        "<strong>JAX transformation 原生组合</strong>：<code>grad</code> 计算力和轨迹梯度，<code>jit</code> 编译整段模拟，<code>vmap/pmap</code> 批量化或多设备并行",
        "<strong>空间抽象</strong>：用 <code>(displacement_fn, shift_fn)</code> 表达自由边界、周期边界和一般周期盒，统一距离计算和位置推进",
        "<strong>势能抽象</strong>：pair potential、many-body potential、Behler-Parrinello 网络、Graph Network 势能都可作为可微分能量函数",
        "<strong>力来自能量梯度</strong>：无需手写力场导数，核心关系是 <span class=\"kb-math kb-math-inline\">\\mathbf{F}_i=-\\nabla_{\\mathbf{R}_i}U(\\mathbf{R})</span>",
        "<strong>邻居表和 cell list</strong>：为有限截断势能提供空间分区，使大规模粒子模拟从全对全 <span class=\"kb-math kb-math-inline\">O(N^2)</span> 降到近似 <span class=\"kb-math kb-math-inline\">O(Nn_{\\text{nbr}})</span>",
        "<strong>支持多类动力学</strong>：NVE、NVT Nose-Hoover、NPT、Langevin、Brownian、FIRE 和梯度下降等",
        "<strong>研究用例明确</strong>：论文展示神经网络势能模拟、粒子 packing 的 meta-optimization、以及基于局部邻域的 flocking 模拟"
      ],
      "detail": "<h5>核心架构示意</h5>\n<p><img alt=\"JAX-MD 神经网络势能模拟示意\" src=\"https://ar5iv.labs.arxiv.org/html/1912.04232/assets/fig/silicon_system_large.png\" />\n<em>图：论文 Figure 2。JAX-MD 将图神经网络能量函数接入 NVT 模拟，展示由神经势能驱动的大规模硅原子系统快照。</em></p>\n<p><img alt=\"JAX-MD flocking 示例\" src=\"https://ar5iv.labs.arxiv.org/html/1912.04232/assets/fig/flocking.png\" />\n<em>图：论文 Figure 4。JAX-MD 的空间、邻居表和可微分能量抽象也可扩展到多智能体 flocking。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># JAX-MD 的典型工作流：定义空间 -&gt; 定义能量 -&gt; 自动求力 -&gt; 构建积分器 -&gt; 对轨迹求梯度\nfrom jax import grad, jit, vmap\nfrom jax_md import space, energy, simulate, quantity\n\ndef build_simulation(box_size, dt, temperature, theta):\n    displacement_fn, shift_fn = space.periodic(box_size)\n\n    # energy_fn 可以是经典势能，也可以是神经网络势能 U_theta(R)\n    pair_energy = energy.lennard_jones_pair(displacement_fn)\n    neural_correction = make_graph_network_energy(theta, displacement_fn)\n\n    def total_energy(R, neighbor=None):\n        return pair_energy(R, neighbor=neighbor) + neural_correction(R, neighbor)\n\n    force_fn = quantity.force(total_energy)  # force = -grad_R total_energy\n    init_fn, update_fn = simulate.nvt_nose_hoover(total_energy, shift_fn, dt, temperature)\n    return init_fn, update_fn, force_fn\n\n@jit\ndef rollout_loss(theta, key, R0, target_property):\n    init_fn, update_fn, _ = build_simulation(box_size=25.0, dt=1e-3, temperature=1.0, theta=theta)\n    state = init_fn(key, R0)\n    for _ in range(num_steps):\n        state = update_fn(state)\n    pred = observable(state.position)\n    return ((pred - target_property) ** 2).mean()\n\ngrad_theta = grad(rollout_loss)(theta, key, R0, target_property)\nbatched_loss = vmap(rollout_loss, in_axes=(None, 0, 0, 0))\n</code></pre>\n<h5>空间与状态：把边界条件变成函数</h5>\n<p>分子动力学的基础状态通常是粒子位置 <span class=\"kb-math kb-math-inline\">\\mathbf{R}\\in\\mathbb{R}^{N\\times d}</span>、速度 <span class=\"kb-math kb-math-inline\">\\mathbf{V}</span>、动量 <span class=\"kb-math kb-math-inline\">\\mathbf{P}</span> 和盒子参数。JAX-MD 不把“空间”写死在模拟器内部，而是用两个函数描述：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{d}_{ij}=d(\\mathbf{R}_i,\\mathbf{R}_j),\\qquad\n\\mathbf{R}_{i}^{\\prime}=\\mu(\\mathbf{R}_i,\\Delta\\mathbf{R}_i)</div>\n<p><span class=\"kb-math kb-math-inline\">d</span> 是 displacement function，负责处理自由边界、周期边界或一般周期盒下的最短位移；<span class=\"kb-math kb-math-inline\">\\mu</span> 是 shift function，负责按位移更新位置并施加边界规则。这样势能函数只依赖 <span class=\"kb-math kb-math-inline\">d</span>，积分器只依赖 <span class=\"kb-math kb-math-inline\">\\mu</span>，同一个 Lennard-Jones 或神经势能可在不同边界条件中复用。</p>\n<div class=\"key-point\">💡 关键：JAX-MD 的抽象粒度不是“某个完整 MD 引擎”，而是一组可组合纯函数。空间、能量、邻居表、积分器都能单独被 <code>jit</code>、<code>grad</code>、<code>vmap</code> 处理。</div>\n<h5>能量、力与自动微分</h5>\n<p>经典 MD 中，给定势能 <span class=\"kb-math kb-math-inline\">U(\\mathbf{R};\\theta)</span>，力由负梯度给出：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{F}_i(\\mathbf{R};\\theta)\n=\n-\\frac{\\partial U(\\mathbf{R};\\theta)}{\\partial \\mathbf{R}_i}</div>\n<p>对于 pair potential，JAX-MD 可把二体函数 <span class=\"kb-math kb-math-inline\">u(r_{ij};\\theta)</span> 提升到全系统能量：</p>\n<div class=\"kb-math kb-math-display\">U(\\mathbf{R};\\theta)\n=\n\\sum_{1\\le i&lt;j\\le N}\nu_{\\theta}\\left(\\left\\|d(\\mathbf{R}_i,\\mathbf{R}_j)\\right\\|\\right)</div>\n<p>若势能来自神经网络，例如图网络势能，可写作：</p>\n<div class=\"kb-math kb-math-display\">U_{\\theta}(\\mathbf{R})\n=\n\\sum_{i=1}^{N} \\epsilon_{\\theta}\n\\left(\n\\mathbf{R}_i,\\{\\mathbf{R}_j: j\\in\\mathcal{N}(i)\\}\n\\right)</div>\n<p>传统 MD 软件通常要为每种势能手写力和优化后的 kernel；JAX-MD 则让能量函数成为一等公民，力由 <code>grad</code> 自动生成。这对机器学习势能尤其重要：网络结构、参数和物理模拟在同一个 JAX 计算图中，轨迹损失可以直接对 <span class=\"kb-math kb-math-inline\">\\theta</span> 反传。</p>\n<h5>动力学更新与轨迹可微分</h5>\n<p>JAX-MD 的模拟器遵循 JAX optimizer 风格：构造函数返回 <code>init_fn</code> 和 <code>update_fn</code>。一个确定性积分器可抽象为：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{s}_{t+1}\n=\n\\Phi_{\\Delta t}(\\mathbf{s}_t;\\theta)</div>\n<p>例如速度 Verlet 的简化形式为：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{V}_{t+\\frac12}\n=\n\\mathbf{V}_{t}\n+\\frac{\\Delta t}{2m}\\mathbf{F}(\\mathbf{R}_{t};\\theta)</div>\n<div class=\"kb-math kb-math-display\">\\mathbf{R}_{t+1}\n=\n\\mu\\left(\\mathbf{R}_t,\\Delta t\\,\\mathbf{V}_{t+\\frac12}\\right)</div>\n<div class=\"kb-math kb-math-display\">\\mathbf{V}_{t+1}\n=\n\\mathbf{V}_{t+\\frac12}\n+\\frac{\\Delta t}{2m}\\mathbf{F}(\\mathbf{R}_{t+1};\\theta)</div>\n<p>如果最终任务是让某个观测量 <span class=\"kb-math kb-math-inline\">o(\\mathbf{s}_T)</span> 匹配目标 <span class=\"kb-math kb-math-inline\">y</span>，训练损失可写成：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}(\\theta)\n=\n\\left\\|o(\\mathbf{s}_T)-y\\right\\|_2^2,\\qquad\n\\mathbf{s}_T=\\Phi_{\\Delta t}^{T}(\\mathbf{s}_0;\\theta)</div>\n<p>JAX 的反向模式自动微分会穿过所有更新步，得到 <span class=\"kb-math kb-math-inline\">\\partial\\mathcal{L}/\\partial\\theta</span>。这就是论文所说的 meta-optimization：优化的对象不只是单步能量，也可以是经过完整物理轨迹后产生的宏观性质、packing 几何或 agent 行为。</p>\n<h5>邻居表：可微分模拟中的规模瓶颈</h5>\n<p>有限截断势能只需要计算距离小于 <span class=\"kb-math kb-math-inline\">r_c</span> 的粒子对：</p>\n<div class=\"kb-math kb-math-display\">U(\\mathbf{R})\n=\n\\sum_i\\sum_{j\\in\\mathcal{N}(i)}\nu(r_{ij}),\\qquad\n\\mathcal{N}(i)=\\{j:\\|d(\\mathbf{R}_i,\\mathbf{R}_j)\\|&lt;r_c\\}</div>\n<p>朴素全对全计算需要 <span class=\"kb-math kb-math-inline\">O(N^2)</span> 距离。JAX-MD 提供 cell list 和 neighbor list，把空间划分成网格 cell，只检查附近 cell 中的候选粒子，使每步复杂度近似为 <span class=\"kb-math kb-math-inline\">O(Nn_{\\text{nbr}})</span>。在 JAX/XLA 中这有一个工程限制：数组 shape 通常需要静态可知，因此 neighbor list 有容量上限；如果缓冲区溢出，需要重新 allocate，而普通 step 中只 update 位置对应的邻居信息。</p>\n<h5>与 DiffTaichi 和传统 MD 软件的区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方面</th>\n<th>LAMMPS/HOOMD-Blue 等传统 MD</th>\n<th>DiffTaichi</th>\n<th>JAX-MD</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>主要目标</td>\n<td>高性能生产模拟</td>\n<td>高性能可微分物理 DSL</td>\n<td>JAX 生态中的可微分 MD 研究框架</td>\n</tr>\n<tr>\n<td>编程风格</td>\n<td>C++/CUDA 插件与脚本接口</td>\n<td>命令式 Taichi kernel</td>\n<td>Python 函数式、数组变换</td>\n</tr>\n<tr>\n<td>力场导数</td>\n<td>多数需专门实现</td>\n<td>kernel 源变换</td>\n<td><code>grad(energy_fn)</code> 自动生成</td>\n</tr>\n<tr>\n<td>ML 集成</td>\n<td>通常需桥接代码</td>\n<td>可接控制器，但在 Taichi 体系内</td>\n<td>与 JAX/Flax/Haiku/Optax 等自然组合</td>\n</tr>\n<tr>\n<td>性能取向</td>\n<td>生产级优化</td>\n<td>保留 megakernel 性能</td>\n<td>研究迭代快，小 GPU 系统有竞争力</td>\n</tr>\n<tr>\n<td>适用场景</td>\n<td>长时间、大规模标准 MD</td>\n<td>复杂物理程序可微分化</td>\n<td>神经势能、meta-optimization、批量实验</td>\n</tr>\n</tbody>\n</table></div>\n<p>JAX-MD 的局限也来自它的优势：XLA 偏好静态 shape，而 MD 常有动态邻居、复杂数据结构和长轨迹内存压力；在超大生产规模上，它通常不如手写 CUDA/C++ 的成熟 MD 引擎。但对于“要把模拟嵌进学习系统”的研究问题，JAX-MD 的优势是同一份 Python/JAX 代码即可获得硬件加速、自动微分、批量化和神经网络集成。</p>",
      "quiz": {
        "q": "JAX-MD 中力的主要计算方式是什么？",
        "options": [
          "为每个势能手写 CUDA 力 kernel",
          "用自动微分对势能函数求负梯度，即 F_i = -∂U/∂R_i",
          "用强化学习直接预测所有粒子的下一步位置",
          "只从邻居表中读取预先存储的力，不重新计算"
        ],
        "answer": 1,
        "explain": "JAX-MD 的核心设计是把能量写成 JAX 可微分函数，再通过 grad 得到力；邻居表用于减少相互作用计算量。"
      }
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
      "summary": "NVIDIA Warp 是面向仿真、机器人和几何计算的 Python JIT kernel 框架，把类型标注的 Python 函数编译为 CPU/CUDA 代码并自动生成 adjoint kernel，使大规模 GPU 物理程序能接入 PyTorch、JAX 和 Paddle 等机器学习训练流程。",
      "keyPoints": [
        "<strong>项目页型来源</strong>：任务给定 URL 是官方 GitHub；本文基于官方 README、当前稳定版文档的 Runtime 与 Differentiability 章节解读",
        "<strong>Python 到 C++/CUDA/PTX</strong>：用户用 <code>@wp.kernel</code> 写类型化 Python 函数，首次 launch 时按模块 JIT 编译并缓存",
        "<strong>CUDA kernel 式并行模型</strong>：<code>wp.launch(kernel, dim=...)</code> 以一维到四维线程网格执行，kernel 内用 <code>wp.tid()</code> 取得线程索引",
        "<strong>默认生成 forward/backward kernel</strong>：Warp 为 kernel 定义生成前向和反向 adjoint 版本，支持反向模式自动微分",
        "<strong>显式 tape 机制</strong>：<code>wp.Tape()</code> 记录 kernel launch，<code>tape.backward(loss)</code> 或传入输出 adjoint 后反向重放计算梯度",
        "<strong>显式内存管理</strong>：数组需声明 dtype、device 和 <code>requires_grad=True</code>，反向后梯度在 <code>array.grad</code> 或 tape gradients 中读取",
        "<strong>物理计算原语丰富</strong>：内置向量、矩阵、四元数、变换、网格/几何、FEM、稀疏矩阵和多类仿真示例",
        "<strong>框架互操作</strong>：Warp kernel 可作为机器学习 pipeline 的自定义可微分计算模块，与 PyTorch、JAX、Paddle 数据互通",
        "<strong>相对 DiffTaichi 的定位</strong>：继承“高性能可微分 kernel + tape”的思想，但使用更贴近普通 Python 的前端和 NVIDIA GPU 生态"
      ],
      "detail": "<h5>核心架构示意</h5>\n<p><img alt=\"NVIDIA Warp 示例仿真集合\" src=\"https://github.com/NVIDIA/warp/raw/main/docs/img/header.jpg\" />\n<em>图：官方 README 展示的 Warp 物理仿真示例集合，覆盖粒子、流体、几何和优化类任务。</em></p>\n<p><img alt=\"Warp 编译流水线\" src=\"https://nvidia.github.io/warp/stable/_images/compiler_pipeline.svg\" />\n<em>图：官方文档的 compilation model。Warp 从 Python kernel 定义生成 C++/CUDA 中间代码，运行时编译成动态库和 PTX 并缓存。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># Warp 的基本模式：类型化 kernel -&gt; launch -&gt; tape 记录 -&gt; backward\nimport warp as wp\n\n@wp.kernel\ndef integrate(\n    pos: wp.array[wp.vec3],\n    vel: wp.array[wp.vec3],\n    mass: wp.array[float],\n    force: wp.array[wp.vec3],\n    dt: float,\n):\n    i = wp.tid()\n    acc = force[i] / mass[i]\n    vel[i] = vel[i] + dt * acc\n    pos[i] = pos[i] + dt * vel[i]\n\n@wp.kernel\ndef compute_loss(pos: wp.array[wp.vec3], target: wp.array[wp.vec3], loss: wp.array[float]):\n    i = wp.tid()\n    diff = pos[i] - target[i]\n    wp.atomic_add(loss, 0, wp.dot(diff, diff))\n\npos = wp.array(init_pos, dtype=wp.vec3, device=&quot;cuda&quot;, requires_grad=True)\nvel = wp.array(init_vel, dtype=wp.vec3, device=&quot;cuda&quot;, requires_grad=True)\nforce = wp.array(ctrl_force, dtype=wp.vec3, device=&quot;cuda&quot;, requires_grad=True)\nloss = wp.zeros(1, dtype=float, device=&quot;cuda&quot;, requires_grad=True)\n\nwith wp.Tape() as tape:\n    for _ in range(num_steps):\n        wp.launch(integrate, dim=n_particles, inputs=[pos, vel, mass, force, dt], device=&quot;cuda&quot;)\n    wp.launch(compute_loss, dim=n_particles, inputs=[pos, target, loss], device=&quot;cuda&quot;)\n\ntape.backward(loss)\nforce_grad = force.grad\n</code></pre>\n<h5>编程模型：Python 表达，CUDA 语义</h5>\n<p>Warp kernel 看起来是 Python 函数，但它并不是逐行由 CPython 执行。用户用 <code>@wp.kernel</code> 声明 kernel，并为每个参数提供静态类型，例如 <code>wp.array[wp.vec3]</code>、<code>float</code>、<code>wp.mat33</code>。首次调用时，Warp 会把模块内注册的 kernel 编译成原生代码：</p>\n<div class=\"kb-math kb-math-display\">\\text{Python AST / type hints}\n\\longrightarrow\n\\text{Warp IR}\n\\longrightarrow\n\\text{C++/CUDA}\n\\longrightarrow\n\\text{dynamic library + PTX}</div>\n<p>kernel launch 的并行语义接近 CUDA。若执行：</p>\n<pre><code class=\"language-python\">wp.launch(add_kernel, dim=1024, inputs=[a, b], outputs=[c], device=&quot;cuda&quot;)\n</code></pre>\n<p>则 kernel body 会被 1024 个 logical threads 执行，线程 <span class=\"kb-math kb-math-inline\">i</span> 通过 <code>wp.tid()</code> 访问自己的数组元素。二维或三维问题可以用 <code>dim=(nx, ny)</code> 或 <code>dim=(nx, ny, nz)</code>，此时 <code>wp.tid()</code> 返回坐标索引。这种模型比 NumPy 式整体数组表达更适合写碰撞、稀疏邻接、粒子系统、网格 stencil 和几何查询。</p>\n<h5>自动微分：adjoint kernel 与 tape</h5>\n<p>Warp 默认为 kernel 生成 forward 和 backward/adjoin 版本。设若干 kernel 组合成映射：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{y}=F_K\\circ F_{K-1}\\circ\\cdots\\circ F_1(\\mathbf{x})</div>\n<p>目标损失为：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}(\\mathbf{x})=\\ell(\\mathbf{y})</div>\n<p>反向模式需要计算：</p>\n<div class=\"kb-math kb-math-display\">\\bar{\\mathbf{x}}\n=\n\\left(\\frac{\\partial F}{\\partial \\mathbf{x}}\\right)^{\\top}\n\\bar{\\mathbf{y}},\\qquad\n\\bar{\\mathbf{y}}=\\frac{\\partial \\ell}{\\partial \\mathbf{y}}</div>\n<p>Warp 的 <code>wp.Tape</code> 记录 forward pass 中的 kernel launch，然后从后往前调用对应 adjoint kernel。数组若要参与梯度链路，需要在创建时设置：</p>\n<pre><code class=\"language-python\">x = wp.zeros(1024, dtype=wp.vec3, device=&quot;cuda&quot;, requires_grad=True)\n</code></pre>\n<p>反向结束后，梯度可从 <code>x.grad</code> 读取。对非标量输出，<code>tape.backward(grads={output: seed})</code> 可显式提供输出 adjoint，相当于计算向量-Jacobian product：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{v}^{\\top}J\n=\n\\mathbf{v}^{\\top}\\frac{\\partial \\mathbf{y}}{\\partial \\mathbf{x}}</div>\n<h5>一个最小公式例子</h5>\n<p>考虑 kernel 中每个线程计算：</p>\n<div class=\"kb-math kb-math-display\">y_i=x_i^2+3x_i+1</div>\n<p>若损失为：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}=\\sum_i y_i</div>\n<p>则反向 kernel 对每个线程执行的核心逻辑就是：</p>\n<div class=\"kb-math kb-math-display\">\\frac{\\partial \\mathcal{L}}{\\partial x_i}\n=\n\\frac{\\partial \\mathcal{L}}{\\partial y_i}\n\\frac{\\partial y_i}{\\partial x_i}\n=\n1\\cdot(2x_i+3)</div>\n<p>在真实仿真中，<span class=\"kb-math kb-math-inline\">y_i</span> 可能是下一步粒子位置、接触力、FEM 残差或渲染结果；Warp 的价值在于让这些计算保持 GPU kernel 形态，同时生成对应反向程序，而不是退回 Python 循环或小算子图。</p>\n<h5>原地写入与梯度正确性</h5>\n<p>Warp 与 PyTorch/JAX 的重要区别是显式内存管理。深度学习框架通常每个操作产生新 tensor，因此中间值自然保留；Warp kernel 常写入用户提供的数组，甚至多次覆盖同一 buffer。自动微分时，如果某个数组元素被覆盖，旧值是否仍需用于反向传播就变成用户和框架共同管理的问题。</p>\n<p>官方文档的规则是：输出梯度在 backward 中默认会被消费并清零，从而让多次写入时只通过最后一次写入传播梯度；如果用户设置 <code>retain_grad=True</code> 保留中间梯度，就必须确保每个元素最多写一次，否则可能重复计数。对 <code>wp.atomic_add()</code> 等累加式操作，Warp 的图会专门处理 adjoint accumulation。</p>\n<div class=\"warn-box\">⚠️ 注意：Warp 不是“任意 Python 程序自动可微”。kernel scope 支持的是可编译到 CPU/CUDA 的类型化子集；Python list、动态对象、任意全局状态和不可静态分析的控制流都不属于常规 kernel 语义。</div>\n<h5>面向大规模微分模拟的机制</h5>\n<p>物理仿真常见更新可以写成：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{s}_{t+1}\n=\n\\Phi_{\\Delta t}(\\mathbf{s}_t,\\mathbf{u}_t,\\phi)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\mathbf{u}_t</span> 是控制输入，<span class=\"kb-math kb-math-inline\">\\phi</span> 是质量、刚度、摩擦、几何等参数。Warp kernel 可以把每步分解为力计算、约束求解、积分、碰撞、loss reduction：</p>\n<pre><code class=\"language-python\">with wp.Tape() as tape:\n    for t in range(T):\n        wp.launch(compute_forces, dim=n, inputs=[state, params, forces])\n        wp.launch(solve_contacts, dim=num_contacts, inputs=[state, contacts, impulses])\n        wp.launch(integrate, dim=n, inputs=[state, forces, impulses, dt])\n    wp.launch(task_loss, dim=n, inputs=[state, target, loss])\ntape.backward(loss)\n</code></pre>\n<p>如果优化目标是反推控制力或材料参数：</p>\n<div class=\"kb-math kb-math-display\">\\min_{\\mathbf{u}_{0:T-1},\\phi}\n\\left\\|\\mathbf{o}(\\mathbf{s}_T)-\\mathbf{o}^{\\star}\\right\\|_2^2\n+\\lambda\\sum_{t=0}^{T-1}\\|\\mathbf{u}_t\\|_2^2</div>\n<p>Warp 的反向传播会给出 <span class=\"kb-math kb-math-inline\">\\partial\\mathcal{L}/\\partial \\mathbf{u}_t</span> 和 <span class=\"kb-math kb-math-inline\">\\partial\\mathcal{L}/\\partial\\phi</span>，这些梯度可直接交给 PyTorch/JAX 优化器。相比黑盒仿真加 finite difference，反向模式对高维参数更有效；相比完全手写 CUDA adjoint，开发成本显著降低。</p>\n<h5>与 DiffTaichi 的关系和差异</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方面</th>\n<th>DiffTaichi</th>\n<th>NVIDIA Warp</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>前端</td>\n<td>Taichi DSL/Python 前端</td>\n<td>类型化 Python 函数与装饰器</td>\n</tr>\n<tr>\n<td>编译目标</td>\n<td>Taichi IR 到 CPU/GPU 后端</td>\n<td>Python 到 C++/CUDA/PTX，模块缓存</td>\n</tr>\n<tr>\n<td>AD 组织</td>\n<td>kernel 内源变换 + kernel 间 tape</td>\n<td>forward/backward kernel + <code>wp.Tape</code></td>\n</tr>\n<tr>\n<td>生态重点</td>\n<td>论文级可微分物理语言与示例</td>\n<td>NVIDIA GPU、仿真、机器人、几何、ML 互操作</td>\n</tr>\n<tr>\n<td>内存模型</td>\n<td>Taichi field/global tensor</td>\n<td>显式 <code>wp.array</code>、device、grad buffer</td>\n</tr>\n<tr>\n<td>典型用户</td>\n<td>研究者实现可微分物理模拟器</td>\n<td>需要 Python 生产力与 CUDA 性能的仿真/ML 开发者</td>\n</tr>\n</tbody>\n</table></div>\n<p>可以把 Warp 看作 DiffTaichi 思路在更通用 Python/NVIDIA 生态中的工程化延展：保留“高性能 kernel 级编译 + 反向 adjoint + tape”的核心，同时提供更丰富的几何、FEM、稀疏、框架互操作和示例库。</p>",
      "quiz": {
        "q": "在 NVIDIA Warp 中，`wp.Tape()` 的主要作用是什么？",
        "options": [
          "把 Python 源文件保存成普通日志，供调试打印使用",
          "记录 forward pass 的 kernel launch，并在 backward 中反向重放 adjoint kernel",
          "自动把所有 Python 对象转换为 PyTorch tensor",
          "为每个 GPU 线程动态分配 Python list"
        ],
        "answer": 1,
        "explain": "Warp 的可微分流程依赖 tape 记录 kernel 调用图；反向阶段根据 loss 或输出 adjoint 触发对应 backward kernel 计算输入梯度。"
      }
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
      "summary": "PAC-NeRF 将动态 NeRF、MPM 可微分连续介质仿真和多视角视频重建放进同一个优化图，解决了“未知几何 + 未知物理参数”场景下仅凭视频做系统辨识的问题。",
      "keyPoints": [
        "<strong>几何无关系统辨识</strong>：不要求预先给定网格、点云或物体拓扑，而是从多视角 RGB 视频同时恢复初始几何、运动状态和物理参数",
        "<strong>连续介质约束 NeRF</strong>：让密度场、颜色场随满足连续介质守恒律的速度场演化，避免普通动态 NeRF 学到不守物理的形变",
        "<strong>Eulerian-Lagrangian 混合表示</strong>：NeRF 密度/颜色保存在 Eulerian voxel grid，物质运动由 Lagrangian particles 通过 MPM 推进",
        "<strong>P2G/G2P 互转层</strong>：用三线性 shape function 在粒子和网格之间转换辐射场属性，使仿真输出能重新回到 NeRF 渲染空间",
        "<strong>纯图像损失反传到物理参数</strong>：通过可微渲染 + DiffTaichi MPM，把多帧重建误差反传到粘度、杨氏模量、屈服应力、摩擦角等参数",
        "<strong>三阶段优化流程</strong>：视频抠图预处理、首帧几何 seeding、冻结几何后用后续帧进行物理参数与初速度优化",
        "<strong>材料覆盖面广</strong>：论文在弹性体、塑性材料、沙粒、牛顿流体和非牛顿流体上验证，真实多相机视频中也能重建掉落小球"
      ],
      "detail": "<h5>核心架构示意</h5>\n<p><img alt=\"PAC-NeRF 混合 Eulerian-Lagrangian 框架\" src=\"https://ar5iv.labs.arxiv.org/html/2303.05512/assets/x1.png\" />\n<em>图：PAC-NeRF 的 Figure 1。左侧从首帧 voxel NeRF 初始化，经过 G2P 得到 Lagrangian particles；MPM 根据物理参数推进粒子，再 P2G 回到 Eulerian radiance grid，用多视角渲染损失反向优化参数。来源为 ar5iv 对 arXiv:2303.05512 的 HTML 渲染图。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># PAC-NeRF 几何无关系统辨识伪代码\ndef pac_nerf_identification(multiview_video, cameras, theta_phys):\n    masks = video_matting(multiview_video)\n\n    # 1) 首帧几何 seeding：训练静态 voxel NeRF\n    radiance_grid = initialize_voxel_nerf()\n    for step in geometry_steps:\n        rgb0 = render_voxel_nerf(radiance_grid, cameras, frame=0)\n        loss_geo = photometric_loss(rgb0, multiview_video[0], masks[0])\n        loss_geo += lambda_surf * surface_regularizer(radiance_grid.density)\n        update(radiance_grid, loss_geo)\n\n    # 2) 从 Eulerian 网格绑定到 Lagrangian 粒子\n    particles = sample_particles_in_voxels(radiance_grid, particles_per_voxel=8)\n    particles.features = G2P(radiance_grid.features, particles.x)\n\n    # 3) 用可微 MPM 推进并从图像误差优化物理参数\n    theta_vel = estimate_initial_velocity(particles, first_2_or_3_frames)\n    for step in system_id_steps:\n        sim_particles = particles\n        total_loss = 0.0\n        for t in range(1, T):\n            sim_particles = differentiable_mpm_step(sim_particles, theta_phys, theta_vel)\n            grid_t = P2G(sim_particles.features, sim_particles.x)\n            pred_images = volume_render(grid_t, cameras)\n            total_loss += photometric_loss(pred_images, multiview_video[t], masks[t])\n        update([theta_phys, theta_vel], total_loss)\n\n    return radiance_grid, theta_phys\n</code></pre>\n<h5>方法机制与关键公式</h5>\n<p>PAC-NeRF 的出发点是：传统从视频估计物理参数的方法通常假设物体几何已知，或者需要先重建成可仿真的网格；普通动态 NeRF 则可以拟合外观运动，但它的形变场不一定满足质量、动量和接触约束。PAC-NeRF 把两者合并：用 NeRF 处理视觉几何与渲染，用 MPM 处理连续介质动力学，再让图像误差穿过整个管线。</p>\n<p>体渲染部分仍然使用 NeRF 的沿光线积分。对相机光线 <span class=\"kb-math kb-math-inline\">r(s)=o+s d</span>，像素颜色可写成：</p>\n<div class=\"kb-math kb-math-display\">\\hat{C}(r,t)=\\int_{s_n}^{s_f} T(s,t)\\,\\sigma(r(s),t)\\,c(r(s),d,t)\\,ds,\n\\qquad\nT(s,t)=\\exp\\left(-\\int_{s_n}^{s}\\sigma(r(u),t)\\,du\\right).</div>\n<p>多视角视频监督直接落在图像空间：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{rgb}}=\n\\sum_{t=1}^{T}\\sum_{v=1}^{V}\\sum_{r\\in\\mathcal{R}_{v,t}}\n\\left\\|\\hat{C}_{v,t}(r;\\theta,\\phi)-C_{v,t}(r)\\right\\|_2^2,</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\theta</span> 表示辐射场参数，<span class=\"kb-math kb-math-inline\">\\phi</span> 表示材料参数、初速度或接触相关参数。关键点是 <span class=\"kb-math kb-math-inline\">\\hat{C}</span> 不是由任意时间 MLP 直接生成，而是由 MPM 推进后的物质状态重新映射到 Eulerian grid 后渲染。</p>\n<p>物理约束来自连续介质守恒律。任意随物质运动的场 <span class=\"kb-math kb-math-inline\">q(x,t)</span> 需要满足材料导数关系：</p>\n<div class=\"kb-math kb-math-display\">\\frac{Dq}{Dt}=\\frac{\\partial q}{\\partial t}+v\\cdot\\nabla q,</div>\n<p>速度场 <span class=\"kb-math kb-math-inline\">v</span> 又由动量守恒控制：</p>\n<div class=\"kb-math kb-math-display\">\\rho\\frac{Dv}{Dt}=\\nabla\\cdot\\sigma+\\rho g.</div>\n<p>论文用可微 Material Point Method 解这个动力学系统。粒子适合承载质量、速度、材料形变和颜色/密度特征；网格适合求解力、碰撞和渲染重采样。因此 PAC-NeRF 使用 P2G/G2P 作为连接层。对粒子 <span class=\"kb-math kb-math-inline\">p</span> 和网格节点 <span class=\"kb-math kb-math-inline\">i</span>，三线性权重 <span class=\"kb-math kb-math-inline\">w_{ip}=N_i(x_p)</span> 给出：</p>\n<div class=\"kb-math kb-math-display\">q_i=\\frac{\\sum_p w_{ip} m_p q_p}{\\sum_p w_{ip}m_p},\n\\qquad\nq_p=\\sum_i w_{ip}q_i.</div>\n<p>这组互转有两个作用：第一，首帧 voxel NeRF 的密度/颜色能绑定到粒子上，形成随物质运动的 Lagrangian radiance field；第二，仿真后的粒子能投回 voxel grid，继续执行高效体渲染和碰撞处理。</p>\n<h5>训练流程与设计取舍</h5>\n<p>实际优化被拆成三阶段。第一步先用视频 matting 去掉静态背景，只渲染前景物体，减少无关像素对梯度的干扰。第二步只用首帧训练静态 voxel NeRF，并加入 surface regularizer 让密度边界更紧致；这一阶段的目标是获得足够稳定的初始几何。第三步冻结初始辐射场，用前 2-3 帧估计初速度，然后把后续帧图像误差反传到物理参数。</p>\n<p>这种两段式设计不是端到端美学上的妥协，而是为了可观测性和数值稳定性：如果几何、初速度和材料参数同时自由变化，优化器很容易用错误几何解释运动；先锁定首帧几何后，后续帧误差主要由动力学参数承担。代价是几何 seeding 的质量会影响系统辨识，后续工作也针对这一点提出过 Lagrangian particle optimization。</p>\n<p>与 D-NeRF 一类方法相比，PAC-NeRF 不学习任意时间变形场，而是学习一个可被 MPM 推进的初始物质状态；与“NeRF + 已知网格仿真”相比，它不要求 watertight mesh 或 tetrahedral mesh。核心收益是物体拓扑和几何可以很复杂，但输出轨迹仍然被连续介质方程限制。</p>\n<div class=\"key-point\">💡 关键：PAC-NeRF 的“物理增强”不只是给 NeRF 加一个正则项，而是把 NeRF 状态变成 MPM 粒子携带的物质属性，渲染误差必须穿过粒子-网格仿真链路才能更新参数。</div>",
      "quiz": {
        "q": "PAC-NeRF 为什么要在 Eulerian voxel grid 和 Lagrangian particles 之间来回转换？",
        "options": [
          "因为渲染和碰撞/网格计算更适合 Eulerian 表示，而物质输运和 MPM 动力学更适合 Lagrangian 粒子表示",
          "因为 NeRF 只能在粒子坐标中执行体渲染，不能在规则网格上采样",
          "因为 P2G/G2P 会自动消除所有图像噪声，所以不需要多视角损失",
          "因为 MPM 不支持材料参数优化，只能优化颜色特征"
        ],
        "answer": 0,
        "explain": "PAC-NeRF 用粒子承载随物质运动的状态，用网格执行渲染、碰撞和力更新；P2G/G2P 让图像损失可以穿过可微 MPM 反传到物理参数。"
      }
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
      "summary": "PIE-NeRF 用自适应采样、Q-GMLS 无网格降阶弹性动力学和二次 warping，把静态 NeRF 变成可交互、可指定材料参数的物理形变对象，解决了隐式 NeRF 依赖网格/笼形变且难以实时模拟弹性动力学的问题。",
      "keyPoints": [
        "<strong>NeRF 上的无网格弹性仿真</strong>：不需要 tetrahedral mesh、显式表面网格或 voxel simulation grid，而是从 NeRF 密度场采样点云代理",
        "<strong>密度梯度驱动采样</strong>：augmented Poisson disk sampling 根据 NeRF 密度梯度在边界和薄结构处放置更多粒子",
        "<strong>Voronoi + Q-GMLS 降阶</strong>：把采样粒子分组为少量 Q-GMLS kernels，用二次位移场表达大形变和弯曲/扭转",
        "<strong>Integrator points 能量积分</strong>：不对所有采样粒子做完整积分，而用 IPs 近似动能、势能和超弹性材料能量",
        "<strong>隐式时间积分与 Newton 求解</strong>：从 Lagrangian 方程组装非线性弹性动力学系统，支持外力、位置约束和交互操控",
        "<strong>二次反向 warping 渲染</strong>：对变形后射线采样点求近似 rest-pose 坐标，再查询原始 NGP-NeRF 的密度和颜色",
        "<strong>交互式速度</strong>：几十到上百个 Q-GMLS kernels 通常足以驱动复杂 NeRF 场景，适合实时拖拽植物、椅子、船等对象"
      ],
      "detail": "<h5>核心架构示意</h5>\n<p><img alt=\"PIE-NeRF pipeline\" src=\"https://fytalon.github.io/pienerf/static/image/pipeline.png\" />\n<em>图：PIE-NeRF 官方项目页 pipeline。输入多视角图像训练 NGP-NeRF，随后进行 Poisson disk sampling、Q-GMLS kernels 与 integrator points 离散化、时间积分、二次 warping，并渲染物理一致的新姿态。来源为 https://fytalon.github.io/pienerf/。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># PIE-NeRF 交互式弹性动力学伪代码\ndef build_pie_nerf(images, cameras):\n    nerf = train_instant_ngp(images, cameras)\n\n    # 1) 用密度与密度梯度自适应采样隐式几何\n    particles = augmented_poisson_disk_sampling(\n        density=lambda x: nerf.sigma(x),\n        grad_density=lambda x: autodiff_grad_sigma(nerf, x),\n        reject_if_sigma_below=tau,\n    )\n\n    # 2) 降阶离散化：Voronoi kernels + integrator points\n    kernels = voronoi_partition(particles)\n    ips = select_integrator_points(particles, kernels)\n    precompute_q_gmls_shape_functions(kernels, ips)\n\n    return nerf, kernels, ips\n\ndef simulate_and_render(nerf, kernels, ips, user_forces):\n    q, qdot = initialize_generalized_coordinates(kernels)\n    for frame in interactive_session:\n        f_ext = project_external_forces(user_forces[frame], kernels)\n\n        # 隐式 Euler：Newton 求解广义坐标 q_{n+1}\n        for newton_iter in range(max_iter):\n            T, U = integrate_energy_with_ips(q, qdot, ips)\n            residual = mass_matrix(q) @ acceleration(q) + grad(U, q) - f_ext\n            tangent = hessian(U, q) + inertia_term\n            q += solve_linear_system(tangent, -residual)\n\n        # 对每个变形后射线采样点，用二次 warping 回 rest pose 查询 NeRF\n        image = volume_render_with_quadratic_warping(nerf, q, ips)\n        display(image)\n</code></pre>\n<h5>方法机制与关键公式</h5>\n<p>PIE-NeRF 关注的问题不同于 PAC-NeRF 的系统辨识：它假设已经有一个静态 NeRF，希望用户能像抓取真实弹性体一样施加力、拖拽、压缩并得到物理可信的新姿态。难点是 NeRF 是隐式辐射场，没有天然的网格单元、顶点连接和有限元自由度；如果先转成 mesh，再做 FEM，会增加网格生成、薄结构处理和重拓扑成本。</p>\n<p>论文从 NeRF 密度场 <span class=\"kb-math kb-math-inline\">\\sigma(x)</span> 中构造无网格代理。自适应 Poisson disk sampling 的直觉是：几何边界和薄结构附近 <span class=\"kb-math kb-math-inline\">\\|\\nabla\\sigma(x)\\|</span> 大，采样半径应变小，以便放置更多粒子。可概括为：</p>\n<div class=\"kb-math kb-math-display\">r(x)=\\frac{r_0}{1+\\alpha\\|\\nabla\\sigma(x)\\|+\\epsilon},</div>\n<p>并丢弃 <span class=\"kb-math kb-math-inline\">\\sigma(x)&lt;\\tau</span> 的低密度点。这样得到的 particles 只作为几何与积分代理，不要求形成三角网格或四面体网格。</p>\n<p>为了交互速度，PIE-NeRF 不把每个采样粒子都作为动力学自由度，而是用 Voronoi partition 形成 <span class=\"kb-math kb-math-inline\">n</span> 个 Q-GMLS kernels。第 <span class=\"kb-math kb-math-inline\">i</span> 个 kernel 的广义坐标包括中心位移、局部仿射项和二次项；对 rest-pose 位置 <span class=\"kb-math kb-math-inline\">X</span>，位移可写成二次近似：</p>\n<div class=\"kb-math kb-math-display\">u(X)\\approx\n\\sum_{i=1}^{n} w_i(X)\n\\left[\nu_i + A_i(X-X_i) + (X-X_i)^\\top B_i (X-X_i)\n\\right],</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">w_i(X)</span> 是 GMLS 权重，<span class=\"kb-math kb-math-inline\">u_i,A_i,B_i</span> 构成 reduced generalized coordinates。相较 affine MLS，二次项能更好表达弯曲、扭转和大形变，尤其对树叶、薄片、船帆等 codimensional 结构更不容易产生 locking artifacts。</p>\n<p>动力学来自 Lagrangian mechanics。用广义坐标 <span class=\"kb-math kb-math-inline\">q</span> 表示 kernel 自由度，系统满足：</p>\n<div class=\"kb-math kb-math-display\">\\frac{d}{dt}\\frac{\\partial \\mathcal{L}}{\\partial \\dot{q}}\n-\\frac{\\partial \\mathcal{L}}{\\partial q}=Q_{\\text{ext}},\n\\qquad\n\\mathcal{L}(q,\\dot{q})=T(q,\\dot{q})-U(q).</div>\n<p>实际计算中，动能和势能不在所有 PDS 粒子上积分，而在一组 integrator points 上近似：</p>\n<div class=\"kb-math kb-math-display\">T \\approx \\sum_{a\\in \\mathcal{I}}\\frac{1}{2}\\rho V_a\n\\left\\|\\dot{u}(X_a)\\right\\|^2,\n\\qquad\nU \\approx \\sum_{a\\in \\mathcal{I}} V_a\\,\\Psi(F_a),</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\Psi(F)</span> 可选 ARAP、Neo-Hookean 等超弹性材料能量，<span class=\"kb-math kb-math-inline\">F_a=I+\\nabla u(X_a)</span> 是 IP 处的形变梯度。Neo-Hookean 形式可概括为：</p>\n<div class=\"kb-math kb-math-display\">\\Psi(F)=\\frac{\\mu}{2}\\left(\\mathrm{tr}(F^\\top F)-3\\right)\n-\\mu\\log J+\\frac{\\lambda}{2}(\\log J)^2,\\qquad J=\\det F.</div>\n<p>这个公式里的 <span class=\"kb-math kb-math-inline\">\\lambda,\\mu</span> 对应材料 Lamé 参数，可由杨氏模量 <span class=\"kb-math kb-math-inline\">E</span> 和泊松比 <span class=\"kb-math kb-math-inline\">\\nu</span> 转换而来，因此用户可以指定不同软硬程度和体积保持性。</p>\n<h5>渲染与传统方法差异</h5>\n<p>仿真求得的是变形后的空间位置，但 NGP-NeRF 是在 rest pose 上训练的。PIE-NeRF 采用 inverse warping：对变形后光线上的查询点 <span class=\"kb-math kb-math-inline\">x&#x27;</span>，估计其 rest-pose 坐标 <span class=\"kb-math kb-math-inline\">X</span>，再查询 <span class=\"kb-math kb-math-inline\">\\sigma(X)</span> 与颜色 <span class=\"kb-math kb-math-inline\">c(X,d)</span>。若只用一阶 Taylor 展开，在大形变下颜色和纹理会滑动；PIE-NeRF 利用 Q-GMLS 的二次位移先验，在附近 IP 上做二次 warping：</p>\n<div class=\"kb-math kb-math-display\">x&#x27; \\approx X + u(X),\\qquad\nu(X)\\approx u(X_a)+J_a(X-X_a)+\\frac{1}{2}(X-X_a)^\\top H_a(X-X_a).</div>\n<p>对 <span class=\"kb-math kb-math-inline\">X</span> 的求解可用 Newton 迭代，每次只需解小规模 <span class=\"kb-math kb-math-inline\">3\\times3</span> 系统。若查询点离单个 IP 不够近，则用多个近邻 IP 的反解按距离加权平均。这样渲染仍然利用原始高质量 NeRF，但姿态由物理仿真决定。</p>\n<p>与 cage-based 或编辑式 NeRF 形变相比，PIE-NeRF 的变形不是纯几何启发式能量，而是来自可指定材料模型的动力学系统；与 FEM 相比，它避免了 tetrahedralization，并且 reduced Q-GMLS kernels 远少于 FEM 顶点/单元数量。限制也很明确：它的目标是静态 NeRF 的交互式弹性运动合成，不是从视频反推未知材料参数；材料参数通常由用户设定或调节。</p>\n<div class=\"key-point\">💡 关键：PIE-NeRF 的核心不是“把 NeRF 转 mesh 再仿真”，而是用 NeRF 密度场直接生成无网格代理，并用 Q-GMLS 在少量广义坐标中求解弹性动力学。</div>",
      "quiz": {
        "q": "PIE-NeRF 使用 Q-GMLS 而不是普通 affine MLS 的主要原因是什么？",
        "options": [
          "二次位移场能更好表达大形变、弯曲和薄结构运动，并改进变形后 NeRF 的反向 warping",
          "Q-GMLS 可以完全跳过时间积分，因此不需要求解动力学方程",
          "Q-GMLS 只用于压缩图片纹理，与弹性仿真无关",
          "Q-GMLS 的目的只是把 NeRF 转换成四面体网格"
        ],
        "answer": 0,
        "explain": "PIE-NeRF 用 Q-GMLS 在无网格粒子上构造降阶二次位移场，既减少自由度，又避免 affine 近似在薄结构和大形变下的 locking 与渲染 warping 误差。"
      }
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
      "summary": "JAX-MPM 用 JAX/XLA 实现可微 Material Point Method，把大变形、摩擦接触和非弹性材料仿真变成可反向传播的 GPU 求解器，解决了地质灾害与固体力学中高保真前向仿真和稀疏观测反演难以统一的问题。",
      "keyPoints": [
        "<strong>JAX 原生可微 MPM</strong>：P2G、网格更新、G2P、材料本构和观测层均以 JAX 函数组合实现，可用 <code>jax.grad</code> 反传整段时间轨迹",
        "<strong>Hybrid Eulerian-Lagrangian 公式</strong>：粒子携带质量、体积、速度、应力、密度和形变信息，背景网格负责动量方程、接触和力更新",
        "<strong>统一数据同化层</strong>：同时支持 Lagrangian particle observations 和 Eulerian region observations，将稀疏监测数据映射到可微损失",
        "<strong>PDE 约束优化</strong>：把初速度、空间变化摩擦系数、材料参数或神经场参数作为优化变量，通过仿真-观测误差反推",
        "<strong>JIT/vmap/scan/remat 工程化</strong>：利用 JIT 编译、向量化、<code>jax.scan</code> 循环和 <code>jax.checkpoint</code> 降低 Python 开销与反向传播内存占用",
        "<strong>材料与场景覆盖</strong>：支持弱可压 Newtonian fluid、Drucker-Prager elastoplastic granular material、摩擦接触和 2D/3D dam-break/granular collapse",
        "<strong>大规模 GPU 性能</strong>：论文报告 270 万粒子 3D granular cylinder collapse 的 1000 步单卡耗时约 22 秒（单精度）和 98 秒（双精度）"
      ],
      "detail": "<h5>核心架构示意</h5>\n<p><img alt=\"JAX-MPM 反演框架示意\" src=\"https://arxiv.org/html/2507.04192v2/figures/show.png\" />\n<em>图：JAX-MPM 的 inverse modeling framework。神经网络或参数场给出未知空间参数，JAX-MPM 生成状态轨迹，观测算子抽取 Lagrangian/Eulerian 观测并计算损失，梯度通过整条仿真链路反传。来源为 arXiv:2507.04192v2 HTML。正式 DOI 页面为 https://link.springer.com/article/10.1007/s00366-026-02320-6，方法细节与图源可从 arXiv 预印本和项目仓库访问。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># JAX-MPM 可微时间步与反演伪代码\n@jax.checkpoint\ndef mpm_substep(state, params):\n    x_p, v_p, rho_p, stress_p, F_p = state\n\n    base, fx, w, dw = precompute_bspline_weights(x_p)\n\n    # P2G: 粒子质量、动量、内力投到背景网格\n    grid_m, grid_v, grid_f = particle_to_grid(\n        x_p, v_p, rho_p, stress_p, base, w, dw, params\n    )\n\n    # Grid update: 显式动量推进、边界条件、摩擦接触\n    grid_v = grid_v + dt * grid_f / grid_m\n    grid_v = apply_boundary_and_contact(grid_v, params.friction)\n\n    # G2P: 网格速度/速度梯度插回粒子，更新位置、本构状态\n    v_p_new, grad_v_p = grid_to_particle(grid_v, x_p, base, w, dw)\n    x_p_new = x_p + dt * v_p_new\n    F_p_new, stress_p_new, rho_p_new = constitutive_update(\n        F_p, grad_v_p, rho_p, params.material\n    )\n\n    return (x_p_new, v_p_new, rho_p_new, stress_p_new, F_p_new)\n\ndef rollout(state0, params, num_steps):\n    return jax.lax.scan(lambda s, _: (mpm_substep(s, params), s),\n                        state0, None, length=num_steps)\n\ndef inverse_loss(theta, observations):\n    params = decode_unknowns(theta)  # 初速度、摩擦系数场、神经本构等\n    final_state, trajectory = rollout(state0(params), params, T)\n    pred_obs = observation_layer(trajectory, observations.indices)\n    return mse(pred_obs, observations.values)\n\ntheta = optimizer.minimize(jax.grad(inverse_loss), theta0)\n</code></pre>\n<h5>方法机制与关键公式</h5>\n<p>MPM 的优势是同时拥有 Lagrangian 和 Eulerian 两种视角：粒子随物质运动，适合大变形和历史变量；背景网格每步重置，适合求解动量方程并处理接触。JAX-MPM 的贡献不是重新发明 MPM，而是把这条求解链路实现成 JAX 可微函数，使科学计算、自动微分和神经网络训练在同一框架内运行。</p>\n<p>连续动量方程可写为：</p>\n<div class=\"kb-math kb-math-display\">\\rho \\frac{D v}{D t}=\\nabla\\cdot\\sigma+\\rho b,</div>\n<p>其弱式经粒子离散与网格 shape function <span class=\"kb-math kb-math-inline\">N_i(x_p)</span> 后得到节点力与质量：</p>\n<div class=\"kb-math kb-math-display\">m_i=\\sum_p m_p N_i(x_p),\n\\qquad\nf_i^{\\text{int}}=-\\sum_p V_p\\,\\sigma_p\\nabla N_i(x_p),\n\\qquad\nf_i^{\\text{ext}}=\\sum_p m_p b_p N_i(x_p).</div>\n<p>显式时间积分下，节点速度更新为：</p>\n<div class=\"kb-math kb-math-display\">v_i^{n+1}=v_i^n+\\Delta t\n\\frac{f_i^{\\text{int}}+f_i^{\\text{ext}}}{m_i}.</div>\n<p>随后 G2P 将网格信息插回粒子：</p>\n<div class=\"kb-math kb-math-display\">v_p^{n+1}=\\sum_i N_i(x_p)v_i^{n+1},\n\\qquad\nx_p^{n+1}=x_p^n+\\Delta t\\,v_p^{n+1},\n\\qquad\n\\nabla v_p^{n+1}=\\sum_i v_i^{n+1}\\otimes\\nabla N_i(x_p).</div>\n<p>JAX-MPM 支持不同 transfer scheme。PIC 直接插值节点速度，数值耗散更强；FLIP 插值速度增量，保留粒子动量但可能更噪；APIC/TPIC 用仿射或张量动量项改善角动量和稳定性。论文的 2D/3D benchmark 使用这些 transfer scheme 验证 dam-break 与 granular collapse 的表现。</p>\n<h5>数据同化与反向传播</h5>\n<p>JAX-MPM 把一次时间步表示为可微映射：</p>\n<div class=\"kb-math kb-math-display\">S_{t+1}=\\Phi(S_t;\\theta)\n=\\mathrm{G2P}\\circ\\mathrm{GridUpdate}\\circ\\mathrm{P2G}(S_t;\\theta),</div>\n<p>整段轨迹是：</p>\n<div class=\"kb-math kb-math-display\">S_{1:T}=\\Phi^T(S_0;\\theta).</div>\n<p>给定观测 <span class=\"kb-math kb-math-inline\">y_{l,t}</span>，论文引入统一观测算子 <span class=\"kb-math kb-math-inline\">\\mathcal{O}_{l,t}</span>。若观测追踪具体粒子，就是 Lagrangian supervision：</p>\n<div class=\"kb-math kb-math-display\">\\hat{y}_{l,t}=\\mathcal{O}_{l,t}^{L}(S_t)=s_{p_l,t}.</div>\n<p>若观测来自固定空间区域，例如监测窗口内平均速度，就是 Eulerian supervision：</p>\n<div class=\"kb-math kb-math-display\">\\hat{y}_{l,t}=\\mathcal{O}_{l,t}^{E}(S_t)\n=\\frac{1}{|\\mathcal{P}_{l,t}|}\\sum_{p\\in\\mathcal{P}_{l,t}} s_{p,t},\n\\qquad\n\\mathcal{P}_{l,t}=\\{p:x_{p,t}\\in\\Omega_l\\}.</div>\n<p>反演目标因此统一为：</p>\n<div class=\"kb-math kb-math-display\">\\min_{\\theta}\\ \\mathcal{L}(\\theta)\n=\\sum_{(l,t)\\in\\mathcal{D}}\n\\left\\|\\mathcal{O}_{l,t}(S_t(\\theta))-y_{l,t}^{\\text{obs}}\\right\\|_2^2\n+\\lambda\\mathcal{R}(\\theta),\n\\quad\n\\text{s.t. } S_{t+1}=\\Phi(S_t;\\theta).</div>\n<p>这里 <span class=\"kb-math kb-math-inline\">\\theta</span> 可以是初速度常数、初速度场、分段摩擦系数，也可以是神经网络 <span class=\"kb-math kb-math-inline\">\\mathcal{N}_{\\theta}(x)</span> 输出的空间参数场。由于 <span class=\"kb-math kb-math-inline\">\\Phi</span> 是 JAX 函数组合，反向传播由 reverse-mode autodiff 处理，无需手写传统 adjoint。</p>\n<h5>工程实现与传统方法差异</h5>\n<p>JAX-MPM 的工程重点在于让可微仿真可扩展。P2G/G2P 会产生大量临时网格 buffer，如果反向传播保存所有中间值，长时间轨迹会迅速耗尽显存。论文用 <code>jax.checkpoint</code>/<code>jax.remat</code> 在反向时重算网格操作，只保留粒子级状态；再用 <code>jax.scan</code> 分段执行时间循环，使峰值内存从随总步数线性增长，降低到与 segment length 相关。</p>\n<p>与 DiffTaichi 这类可微仿真框架相比，JAX-MPM 的优势是完全处在 JAX 生态中：JIT 编译减少 Python 循环开销，<code>vmap</code> 方便批量仿真，<code>pmap</code> 具备多设备扩展路径，Flax/Haiku/Equinox 等神经网络模块可以直接耦合。限制是 JAX 的纯函数式写法要求更严格的数据结构设计，粒子-网格 scatter/gather 也需要小心处理静态 shape、padding 和编译开销。</p>\n<div class=\"key-point\">💡 关键：JAX-MPM 的“学习增强”不是用网络替代物理求解器，而是让 MPM 求解器本身成为可微层，神经网络和未知物理参数通过同一个 PDE 约束优化目标被训练。</div>",
      "quiz": {
        "q": "JAX-MPM 中统一 Lagrangian 和 Eulerian 观测层的主要作用是什么？",
        "options": [
          "把粒子追踪数据和固定空间区域监测数据都映射为可微损失，便于通过 MPM 轨迹反推未知参数",
          "把所有粒子永久固定在 Eulerian 网格节点上，避免 G2P 操作",
          "只用于加速前向渲染，与反演问题无关",
          "替代本构模型，使应力不再需要计算"
        ],
        "answer": 0,
        "explain": "JAX-MPM 的观测算子既能读取粒子状态，也能对固定区域内粒子求平均，从而让稀疏、多模态观测统一进入 PDE 约束优化并反传到初值、摩擦或材料参数。"
      }
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
      "summary": "MOTO 提出了一套端到端可微的隐式 GIMP-MPM 拓扑优化框架，用固定背景网格求解大变形超弹性结构响应，并把材料分布随拉格朗日粒子携带，从而绕开 FEM 拓扑优化在大旋转、网格畸变和单元翻转下的收敛问题。",
      "keyPoints": [
        "<strong>MPM 替代 FEM 分析器</strong>：结构由材料点携带质量、体积、应力、形变梯度和设计变量，背景欧拉网格只用于组装并求解准静态力平衡",
        "<strong>隐式大变形求解</strong>：每个载荷步用 Newton-Raphson 解非线性残差 <span class=\"kb-math kb-math-inline\">\\mathbf{R}(\\mathbf{u})=\\mathbf{0}</span>，切线刚度由 JAX 自动微分获得",
        "<strong>单材料 TO</strong>：每个材料点有伪密度 <span class=\"kb-math kb-math-inline\">\\gamma_p\\in[0,1]</span>，通过 SIMP 将伪密度映射到 Hencky 超弹性模型的 Lamé 参数",
        "<strong>多材料 TO</strong>：用坐标 MLP 表示体积分数场 <span class=\"kb-math kb-math-inline\">\\mathbf{v}(\\mathbf{x};\\mathbf{w})</span>，Fourier projection 缓解谱偏置，Softmax 保证各材料体积分数非负且和为 1",
        "<strong>端到端敏感度</strong>：目标函数、约束、隐式 MPM 求解器和神经材料场都在 JAX 中可微，Newton 求解的梯度通过隐函数定理避免反向展开全部迭代",
        "<strong>内存控制</strong>：增量载荷的大变形历史用 checkpointing 处理，反向传播时按需重算中间状态",
        "<strong>目标覆盖</strong>：既支持最小柔顺度的承载结构设计，也支持软体夹爪等 compliant mechanism 的运动传递目标"
      ],
      "detail": "<h5>核心示意图</h5>\n<p><img alt=\"MOTO 的 GIMP-MPM 粒子-网格耦合流程\" src=\"https://arxiv.org/html/2603.14596v1/x4.png\" />\n<em>图：GIMP-MPM 的初始化、粒子影响域、P2G、网格求解、G2P 和材料点更新流程。来源为 arXiv:2603.14596 的 HTML 渲染图。论文源码还提供 <code>network.pdf</code>，展示多材料坐标网络结构。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># MOTO: differentiable implicit MPM topology optimization\ninitialize_grid(Omega)\ninitialize_material_points(Omega_D)\n\nif single_material:\n    design = particle_density_gamma          # gamma_p in [0, 1]\nelse:\n    design = coordinate_network_weights_w    # v(x; w) via Fourier features + MLP + softmax\n\nfor opt_iter in range(max_iter):\n    # 1. design -&gt; material\n    for particle p:\n        if single_material:\n            lambda_p = gamma_p**q * lambda_0\n            mu_p = gamma_p**q * mu_0\n            rho_p = gamma_p * rho_0\n        else:\n            v_p = neural_volume_fraction(x_p, w)\n            lambda_p = sum((v_p[s]**q) * lambda_s[s] for s in materials)\n            mu_p = sum((v_p[s]**q) * mu_s[s] for s in materials)\n            rho_p = sum(v_p[s] * rho_s[s] for s in materials)\n\n    # 2. incremental implicit MPM forward solve\n    for load_step in load_schedule:\n        reset_grid_quantities()\n        p2g_assemble_internal_external_forces()\n        u = newton_solve(lambda u: residual_R(u, particles, grid))\n        g2p_transfer_displacement(u)\n        update_particle_state(F, stress, volume, position)\n\n    # 3. objective, constraints, gradients\n    J = compliance(u, f_ext) or compliant_mechanism_ratio(u, v)\n    g = volume_constraint(gamma) or mass_constraint(v_p)\n    grad = autodiff_with_implicit_function_theorem(J, g, design)\n\n    # 4. optimizer update and continuation\n    design = MMA_or_OC_update(gamma, grad) if single_material else adam_update(w, grad)\n    q = increase_simp_penalty(q)\n</code></pre>\n<h5>方法机制</h5>\n<p>MOTO 处理的问题是“拓扑优化 + 大变形 + 非线性材料”。传统 FEM-TO 把设计变量绑在会随材料一起变形的单元上；一旦结构发生大转角或局部折叠，网格可能畸变、缠结甚至翻转，导致前向求解器不收敛，后向敏感度也失效。MPM 的关键替换是：物理状态跟随材料点移动，力平衡在固定背景网格上解，因此网格不会被永久拉坏；每个时间/载荷步结束后网格量重置，材料点保留应力、形变梯度、体积和位置。</p>\n<p>前向力平衡采用准静态残差：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{R}(\\mathbf{u})=\\mathbf{f}^{\\mathrm{int}}(\\mathbf{u})-\\mathbf{f}^{\\mathrm{ext}}=\\mathbf{0}.</div>\n<p>材料点到网格的内力贡献由应力和 GIMP 形函数梯度组装：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{f}^{\\mathrm{int}}_{v,p}=V_p(\\nabla_x S^{vp})^\\top\\boldsymbol{\\sigma}_p,</div>\n<p>外力则用同一套形函数从粒子映射到网格：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{f}^{\\mathrm{ext}}_{v,p}=S^{vp}m_p\\mathbf{b}_p+S^{vp}\\mathbf{f}^{\\mathrm{ext}}_p.</div>\n<p>由于大变形超弹性使残差高度非线性，MOTO 在每个载荷步使用 Newton-Raphson：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{K}^{(k)}\\delta\\mathbf{u}^{(k)}=-\\mathbf{R}(\\mathbf{u}^{(k)}),\n\\qquad\n\\mathbf{K}^{(k)}=\\left.\\frac{\\partial\\mathbf{R}}{\\partial\\mathbf{u}}\\right|_{\\mathbf{u}^{(k)}}.</div>\n<p>论文没有手推复杂的有限应变 GIMP 切线刚度，而是在 JAX 中通过自动微分构造 <span class=\"kb-math kb-math-inline\">\\mathbf{K}</span>。这也是“端到端可微”的基础：同一条计算图覆盖材料设计、MPM 求解和目标函数。</p>\n<p>单材料版本把设计变量直接放到材料点上。SIMP 插值为：</p>\n<div class=\"kb-math kb-math-display\">\\lambda_p=\\gamma_p^q\\lambda_0,\\qquad\n\\mu_p=\\gamma_p^q\\mu_0,\\qquad\n\\rho_p=\\gamma_p\\rho_0.</div>\n<p>多材料版本改用坐标网络 <span class=\"kb-math kb-math-inline\">\\mathbf{v}(\\mathbf{x};\\mathbf{w})=[v_1,\\ldots,v_S]</span>，Softmax 保证 <span class=\"kb-math kb-math-inline\">\\sum_s v_s=1</span>，材料属性为：</p>\n<div class=\"kb-math kb-math-display\">\\lambda_p=\\sum_{s=1}^{S}v_{s,p}^{q}\\lambda_s,\\qquad\n\\mu_p=\\sum_{s=1}^{S}v_{s,p}^{q}\\mu_s,\\qquad\n\\rho_p=\\sum_{s=1}^{S}v_{s,p}\\rho_s.</div>\n<p>这种设计把“设计分辨率”和“MPM 网格/粒子分辨率”解耦：优化的是神经场权重，最终可以在更高分辨率坐标上查询出更清晰的材料分布。</p>\n<p>目标函数包括承载结构柔顺度：</p>\n<div class=\"kb-math kb-math-display\">J_c=\\mathbf{f}^{\\mathrm{ext}\\top}\\mathbf{u}^*,</div>\n<p>以及 compliant mechanism 中的运动传递目标：</p>\n<div class=\"kb-math kb-math-display\">J_m=-\\frac{\\mathrm{MSE}}{\\mathrm{SE}_{in}+\\mathrm{SE}_{out}}\n=-\\frac{\\mathbf{f}^{\\mathrm{ext}\\top}_{in}\\mathbf{v}^*}\n{\\mathbf{f}^{\\mathrm{ext}\\top}_{in}\\mathbf{u}^*+\\mathbf{f}^{\\mathrm{ext}\\top}_{out}\\mathbf{v}^*}.</div>\n<p>反向传播的难点在于 Newton 迭代和增量载荷历史。若直接展开 <span class=\"kb-math kb-math-inline\">K</span> 次 Newton 迭代，梯度链会很长：</p>\n<div class=\"kb-math kb-math-display\">\\frac{d\\mathbf{u}^{(K)}}{d\\boldsymbol{\\gamma}}\n=\n\\frac{\\partial\\mathbf{u}^{(K)}}{\\partial\\mathbf{u}^{(K-1)}}\\cdots\n\\frac{\\partial\\mathbf{u}^{(1)}}{\\partial\\mathbf{u}^{(0)}}\n\\frac{\\partial\\mathbf{u}^{(0)}}{\\partial\\boldsymbol{\\gamma}}.</div>\n<p>MOTO 用隐函数定理在收敛点求导：</p>\n<div class=\"kb-math kb-math-display\">\\frac{d\\mathbf{u}^{(K)}}{d\\boldsymbol{\\gamma}}\n=-\\mathbf{K}^{-1}\\frac{\\partial\\mathbf{R}}{\\partial\\boldsymbol{\\gamma}},</div>\n<p>这样只依赖最终收敛状态和切线刚度。对于 Hencky 超弹性，矩阵对数的导数还需要 Fréchet derivative；论文用 Loewner matrix，并在特征值接近时用极限 <span class=\"kb-math kb-math-inline\">1/\\Lambda_i</span> 正则化，避免大旋转小拉伸下的数值奇异。</p>\n<div class=\"key-point\">💡 关键：MOTO 的创新不只是“用 MPM 做 TO”，而是把隐式大变形 MPM、材料点设计变量/神经材料场、自动微分切线刚度、隐函数定理敏感度和拓扑优化器接成同一条可微流水线。</div>",
      "quiz": {
        "q": "MOTO 为什么要用隐函数定理处理 Newton-Raphson 求解器的梯度？",
        "options": [
          "为了避免反向传播展开全部 Newton 迭代历史，直接从收敛残差和切线刚度计算设计敏感度",
          "为了把所有材料点固定在初始位置，避免 G2P 更新",
          "为了让 SIMP 惩罚指数 q 始终等于 1",
          "为了把多材料 Softmax 约束改写成无约束线性回归"
        ],
        "answer": 0,
        "explain": "隐函数定理利用收敛条件 R(gamma,u*)=0，给出 du*/dgamma=-K^{-1} partial R/partial gamma，避免存储和反传全部 Newton 迭代。"
      }
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
      "summary": "AS-DiffMPM 提出 Any-Shape Differentiable MPM，把 CPIC 风格的粒子级碰撞处理扩展到任意形状刚体碰撞器，并与 2D Gaussian Splatting、DVGO、MDyn-3DGS 等渲染模型连接，使复杂碰撞场景中的物理参数可以从粒子轨迹或多视角视频端到端辨识。",
      "keyPoints": [
        "<strong>任意形状碰撞器</strong>：不再局限于地面平面或简单 SDF 边界，支持 Box、Bunny、Armadillo 等复杂刚体形状",
        "<strong>Collision Grid</strong>：在与 MPM 欧拉网格同分辨率的碰撞网格上存储 affinity <span class=\"kb-math kb-math-inline\">A_g</span>、距离 <span class=\"kb-math kb-math-inline\">d_g</span>、侧别 tag <span class=\"kb-math kb-math-inline\">T_g</span> 和法向 <span class=\"kb-math kb-math-inline\">\\mathbf{n}_g</span>",
        "<strong>粒子级 CPIC 碰撞</strong>：P2G 只向兼容网格节点传输，G2P 对不兼容节点使用粒子当前速度或投影速度，避免同一网格单元内粒子共享单一碰撞速度",
        "<strong>Mesh/2DGS 统一接口</strong>：碰撞器被表示为带法向的 primitive，既可以是三角网格面，也可以是 2D Gaussian 的平面圆盘",
        "<strong>穿透修正</strong>：材料粒子从 Collision Grid 插值得到 <span class=\"kb-math kb-math-inline\">d_p,T_p,\\mathbf{n}_p</span>，出现穿透时用 <span class=\"kb-math kb-math-inline\">\\mathbf{f}_p=-k_h d_p\\mathbf{n}_p</span> 施加 penalty force",
        "<strong>系统辨识链路</strong>：粒子轨迹监督使用 MSE；视觉监督通过 differentiable rendering 将图像误差反传到渲染 primitive、材料粒子轨迹和物理参数",
        "<strong>基准设置</strong>：论文在 Newtonian、Non-Newtonian、Granular 三类材料和三种复杂碰撞器上评估参数估计，并比较 RP-DiffMPM、GOP-DiffMPM 等碰撞处理基线"
      ],
      "detail": "<h5>核心架构示意</h5>\n<p><img alt=\"AS-DiffMPM 仿真-渲染系统辨识流程\" src=\"https://as-diffmpm.github.io/assets/figures/method_overview.png\" />\n<em>图：多视角图像分别重建连续体对象和刚体碰撞器，AS-DiffMPM 推进粒子轨迹，再把更新后粒子位置映射回渲染 primitive。来源为 AS-DiffMPM 官方项目页。论文 arXiv HTML 也提供 Figure 2：<code>https://arxiv.org/html/2511.06846v1/x2.png</code>。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># AS-DiffMPM collision-aware differentiable rollout\ndef build_collision_grid(collider_primitives):\n    for primitive xi in collider_primitives:          # mesh face or 2D Gaussian disk\n        for x_rp in sample_rigid_particles(xi):\n            for g in neighbor_grid_nodes(x_rp, size=3):\n                x_proj = project_to_primitive_plane(x_g[g], xi)\n                if projection_inside_primitive(x_proj, xi):\n                    A_g[g] = 1\n                    candidates[g].append((xi, point_plane_distance(x_g[g], xi)))\n\n    for g in grid_nodes:\n        xi_star = argmin_abs_distance(candidates[g])\n        d_g[g] = abs(distance(x_g[g], xi_star))\n        T_g[g] = sign(distance(x_g[g], xi_star))\n        n_g[g] = normal(xi_star)\n    return A_g, d_g, T_g, n_g\n\ndef transfer_collision_to_particles(particles, collision_grid):\n    for p in particles:\n        nbrs = neighbor_grid_nodes(x_p[p], size=3)\n        A_p[p] = any(A_g[g] == 1 for g in nbrs)\n        if A_p[p]:\n            d_p[p] = sum(w(g, p) * A_g[g] * T_g[g] * d_g[g] for g in nbrs)\n            n_p[p] = sum(w(g, p) * A_g[g] * n_g[g] for g in nbrs)\n            T_p[p] = persistent_side_tag(p, sign(d_p[p]))\n            if penetration_detected(d_p[p], T_p[p]):\n                f_p[p] += -k_h * d_p[p] * n_p[p]\n\ndef as_diffmpm_step(particles, collider):\n    collision_grid = build_collision_grid(collider)\n    transfer_collision_to_particles(particles, collision_grid)\n\n    # P2G: incompatible particle-node pairs do not receive particle velocity\n    for p in particles:\n        for g in neighbor_grid_nodes(x_p[p]):\n            if compatible(T_p[p], T_g[g]):\n                grid[g].mass += m_p[p] * w(g, p)\n                grid[g].momentum += m_p[p] * v_p[p] * w(g, p)\n\n    grid_operations_without_global_sticky_sdf()\n\n    # G2P: incompatible nodes trigger particle-wise projected velocity\n    for p in particles:\n        v_new = 0\n        for g in neighbor_grid_nodes(x_p[p]):\n            if compatible(T_p[p], T_g[g]):\n                v_new += w(g, p) * v_g[g]\n            else:\n                v_new += w(g, p) * project_to_surface(v_p[p], n_p[p])\n        x_p[p], v_p[p] = advect(x_p[p], v_new)\n</code></pre>\n<h5>方法机制</h5>\n<p>标准可微 MPM 的三步是 P2G、Grid Operations、G2P。基础质量和速度传输可写为：</p>\n<div class=\"kb-math kb-math-display\">m_g=\\sum_p m_p w_g(\\mathbf{x}_g-\\mathbf{x}_p),\\qquad\n\\mathbf{v}_g=\\frac{1}{m_g}\\sum_p m_p\\mathbf{v}_p w_g(\\mathbf{x}_g-\\mathbf{x}_p).</div>\n<p>以往系统辨识工作通常在 G-OP 阶段处理简单边界：例如用平面或 SDF 判断网格节点是否在碰撞器内，然后把 sticky surface 内的节点速度置零。这种方法对平面地面有效，但复杂几何会出现两个问题：一是尖角、开曲面和薄结构很难通过单一网格节点速度精确表达；二是同一网格单元内的不同材料粒子可能在刚体两侧，却被迫共享同一个碰撞响应。</p>\n<p>AS-DiffMPM 的核心是把刚体先投影到 Collision Grid，再把碰撞信息插值给材料粒子。每个网格节点存：</p>\n<div class=\"kb-math kb-math-display\">(A_g,d_g,T_g,\\mathbf{n}_g),</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">A_g</span> 表示是否靠近碰撞边界，<span class=\"kb-math kb-math-inline\">d_g</span> 是到 primitive 的无符号距离，<span class=\"kb-math kb-math-inline\">T_g</span> 表示边界哪一侧，<span class=\"kb-math kb-math-inline\">\\mathbf{n}_g</span> 是对应法向。对一个材料粒子 <span class=\"kb-math kb-math-inline\">p</span>，若其 <span class=\"kb-math kb-math-inline\">3\\times3\\times3</span> 邻域内存在 affinity 节点，就插值得到：</p>\n<div class=\"kb-math kb-math-display\">d_p=\\sum_{g\\in\\mathcal{N}(\\mathbf{x}_p)}\nw_g(\\mathbf{x}_g-\\mathbf{x}_p)A_gT_gd_g,\n\\qquad\n\\mathbf{n}_p=\\sum_{g\\in\\mathcal{N}(\\mathbf{x}_p)}\nw_g(\\mathbf{x}_g-\\mathbf{x}_p)A_g\\mathbf{n}_g.</div>\n<p>粒子的 tag <span class=\"kb-math kb-math-inline\">T_p=\\mathrm{sign}(d_p)</span> 会在靠近边界期间保持首次获得的侧别。这个细节很关键：如果数值误差导致粒子穿透边界，单纯从当前插值距离重新取符号可能会把穿透后的错误侧别当成真实状态；保留 tag 可以识别并修正穿透。</p>\n<p>碰撞修正用 penalty force：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{f}_p=-k_h d_p\\mathbf{n}_p.</div>\n<p>在 CPIC 风格的 P2G/G2P 里，粒子与网格节点是否兼容由 <span class=\"kb-math kb-math-inline\">T_p</span> 和 <span class=\"kb-math kb-math-inline\">T_g</span> 决定。若二者位于边界两侧，则认为不兼容。P2G 阶段只向兼容节点传输质量和动量；G2P 阶段遇到不兼容节点时，AS-DiffMPM 不读取该节点的全局速度，而是把粒子速度投影到碰撞表面。例如 slippery surface 下：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{v}_p^{proj}=\\mathbf{v}_p-(\\mathbf{v}_p\\cdot\\mathbf{n}_p)\\mathbf{n}_p.</div>\n<div class=\"key-point\">💡 关键：GOP-DiffMPM 是“网格节点级”碰撞，AS-DiffMPM 是“粒子-节点兼容性级”碰撞；后者能区分同一网格单元内不同粒子相对复杂边界的几何关系。</div>\n<p>系统辨识分两种监督。若有真实粒子轨迹，训练损失就是模拟轨迹与参考轨迹之间的 particle-wise MSE：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{traj}(\\theta)=\n\\frac{1}{TP}\\sum_{t=1}^{T}\\sum_{p=1}^{P}\n\\left\\|\\mathbf{x}_{p,t}^{sim}(\\theta)-\\mathbf{x}_{p,t}^{ref}\\right\\|_2^2.</div>\n<p>若只有多视角视频，渲染模型负责把粒子或 Gaussian primitive 渲染成图像，图像损失反传到物理参数。论文给出的 point-based 梯度链可以写成：</p>\n<div class=\"kb-math kb-math-display\">\\frac{\\partial \\mathcal{L}}{\\partial\\theta}\n=\n\\sum_r\\sum_p\n\\underbrace{\\left(\\frac{\\partial\\mathcal{L}}{\\partial I}\n\\frac{\\partial I}{\\partial\\mathbf{x}_r}\\right)}_{\\text{Rendering}}\n\\underbrace{\\frac{\\partial\\mathbf{x}_r}{\\partial\\mathbf{x}_p^r}}_{\\text{Mapping}}\n\\underbrace{\\frac{\\partial\\mathbf{x}_p^r}{\\partial\\theta}}_{\\text{MPM}}.</div>\n<p>当每个粒子直接绑定一个 point primitive 时，可简化为：</p>\n<div class=\"kb-math kb-math-display\">\\frac{\\partial \\mathcal{L}}{\\partial\\theta}\n=\n\\sum_p\n\\left(\\frac{\\partial\\mathcal{L}}{\\partial I}\n\\frac{\\partial I}{\\partial\\mathbf{x}_p}\\right)\n\\frac{\\partial\\mathbf{x}_p}{\\partial\\theta}.</div>\n<p>这条链路让 AS-DiffMPM 可以和 DVGO、2DGS、MDyn-3DGS 等不同表示组合：渲染侧负责把视觉误差转成几何/粒子梯度，MPM 侧负责把粒子轨迹梯度转成粘度、体积模量、屈服应力、塑性粘度或摩擦角等物理参数梯度。</p>",
      "quiz": {
        "q": "AS-DiffMPM 相比 GOP-DiffMPM 处理复杂碰撞器的关键改进是什么？",
        "options": [
          "在 P2G/G2P 中按粒子-网格节点兼容性进行碰撞处理，而不是只在 G-OP 阶段统一修改网格速度",
          "完全删除 MPM 的 P2G 阶段，只用神经渲染预测粒子运动",
          "把所有碰撞器都近似为无限平面，降低系统辨识难度",
          "只优化初始速度，不反传物理参数"
        ],
        "answer": 0,
        "explain": "AS-DiffMPM 借鉴 CPIC，利用 Collision Grid 的 tag 和法向区分粒子与邻近节点是否跨越边界，从而在复杂几何处实现粒子级碰撞响应。"
      }
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
      "summary": "POD-DL-ROM 用 randomized POD 先把高维 FOM 快照压缩到 POD 系数空间，再用 autoencoder 与前馈网络学习 \\((t,\\boldsymbol{\\mu})\\rightarrow\\) 低维非线性坐标 \\(\\rightarrow\\) POD 系数的映射，显著降低 DL-ROM 的离线训练成本，同时保留非侵入式、无需 Galerkin 投影和在线快速查询的优势。",
      "keyPoints": [
        "<strong>两级降维</strong>：第一层 rPOD 将 <span class=\"kb-math kb-math-inline\">\\mathbb{R}^{N_h}</span> 的 FOM 快照投影到 <span class=\"kb-math kb-math-inline\">N</span>-维 POD 系数，第二层 autoencoder 将 POD 系数进一步压到 <span class=\"kb-math kb-math-inline\">n\\approx n_\\mu+1</span> 的非线性潜变量",
        "<strong>非侵入式 ROM</strong>：训练只需要 FOM snapshot，不需要访问 PDE 残差、Jacobian 或组装投影方程",
        "<strong>DFNN 学动态坐标</strong>：前馈网络 <span class=\"kb-math kb-math-inline\">\\boldsymbol{\\phi}^{DF}_n(t,\\boldsymbol{\\mu})</span> 直接从时间和参数预测低维潜变量，在线阶段可任意查询时间点",
        "<strong>Decoder 重构 POD 系数</strong>：autoencoder decoder <span class=\"kb-math kb-math-inline\">\\mathbf{f}^D_N</span> 从低维潜变量输出 <span class=\"kb-math kb-math-inline\">\\tilde{\\mathbf{u}}_N</span>，再通过 <span class=\"kb-math kb-math-inline\">\\mathbf{V}_N\\tilde{\\mathbf{u}}_N</span> 回到高维物理场",
        "<strong>联合损失函数</strong>：同时约束 POD 系数重构误差和 encoder/DFNN 潜变量一致性",
        "<strong>rSVD 加速 POD</strong>：用随机化 range finder 和小矩阵 SVD 计算 rPOD 基，避免对大 snapshot 矩阵做昂贵精确 SVD",
        "<strong>多保真预训练</strong>：可用粗网格、简化物理或较小参数域训练得到的权重初始化复杂模型，显著缩短训练",
        "<strong>验证范围广</strong>：论文测试线性 ADR、非线性心电 Monodomain、非线性超弹性梁和 Navier-Stokes，覆盖标量/向量、线性/非线性、时间依赖参数化 PDE"
      ],
      "detail": "<h5>核心架构示意</h5>\n<p><img alt=\"POD-DL-ROM 架构图\" src=\"https://ar5iv.labs.arxiv.org/html/2101.11845/assets/x1.png\" />\n<em>图：POD-DL-ROM 的训练结构。FOM 解先通过 rPOD 基得到 <span class=\"kb-math kb-math-inline\">\\mathbf{V}_N^\\top\\mathbf{u}_h</span>，DFNN 从 <span class=\"kb-math kb-math-inline\">(t,\\boldsymbol{\\mu})</span> 预测低维坐标，decoder 重构 POD 系数，最后用 rPOD 基恢复高维场。来源为 ar5iv 对 arXiv:2101.11845 的 HTML 渲染图；Politecnico Milano MOX report 72/2021 也提供同一论文 PDF。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># POD-DL-ROM training\nS = collect_fom_snapshots(mu_train, time_grid)       # [N_h, N_train * N_t]\nM = collect_parameter_time_pairs(mu_train, time_grid) # [n_mu + 1, N_s]\n\n# randomized POD\nOmega = gaussian_random_matrix(num_snapshots=S.cols, cols=m)\nY = (S @ S.T)**q @ S @ Omega\nQ, _ = qr(Y)\nB = Q.T @ S\nV_tilde, Sigma, Z = svd(B)\nV_N = Q @ V_tilde[:, :N]\n\n# POD coefficient data\nS_N = V_N.T @ S\nS_N = normalize_and_reshape_as_channels(S_N)\n\ninitialize encoder f_E, decoder f_D, dynamics_net phi_DF\nfor epoch in range(max_epochs):\n    for M_batch, S_N_batch in minibatches(M, S_N):\n        z_enc = f_E(S_N_batch)              # encoder: POD coeffs -&gt; latent\n        z_dyn = phi_DF(M_batch)             # DFNN: (t, mu) -&gt; latent\n        S_N_pred = f_D(z_dyn)               # decoder: latent -&gt; POD coeffs\n        loss = omega/2 * mse(S_N_batch, S_N_pred) \\\n             + (1 - omega)/2 * mse(z_enc, z_dyn)\n        update_with_adam(loss)\n    if validation_loss_has_not_improved():\n        break\n\n# POD-DL-ROM online query\ndef predict(t, mu):\n    z = phi_DF(concat(t, mu))\n    u_N_pred = f_D(z)\n    u_h_pred = V_N @ denormalize(u_N_pred)\n    return u_h_pred\n</code></pre>\n<h5>方法机制</h5>\n<p>论文从一般参数化时间依赖 PDE 的 FOM 写起。离散后的高保真模型可抽象为：</p>\n<div class=\"kb-math kb-math-display\">\\begin{cases}\n\\mathbf{M}(\\boldsymbol{\\mu})\\dot{\\mathbf{u}}_h(t;\\boldsymbol{\\mu})\n=\n\\mathbf{f}(t,\\mathbf{u}_h(t;\\boldsymbol{\\mu});\\boldsymbol{\\mu}),\n\\quad t\\in(0,T),\\\\\n\\mathbf{u}_h(0;\\boldsymbol{\\mu})=\\mathbf{u}_0(\\boldsymbol{\\mu}),\n\\end{cases}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\mathbf{u}_h\\in\\mathbb{R}^{N_h}</span>，<span class=\"kb-math kb-math-inline\">N_h</span> 往往很大。传统 POD-Galerkin ROM 用低维线性子空间：</p>\n<div class=\"kb-math kb-math-display\">\\tilde{\\mathbf{u}}_h(t;\\boldsymbol{\\mu})=\\mathbf{V}_n\\mathbf{u}_n(t;\\boldsymbol{\\mu}),</div>\n<p>再把 FOM 残差投影到该子空间。对非线性时间依赖问题，这会遇到两个瓶颈：POD 线性空间可能需要很多 mode 才能覆盖移动前沿/波动结构；非线性项还需要 hyper-reduction，否则在线仍依赖高维数组。</p>\n<p>DL-ROM 的思想是直接学习非线性 trial manifold 和 reduced dynamics：</p>\n<div class=\"kb-math kb-math-display\">\\tilde{\\mathbf{u}}_h(t;\\boldsymbol{\\mu})\n=\n\\mathbf{f}_h^D\\left(\n\\boldsymbol{\\phi}^{DF}_n(t;\\boldsymbol{\\mu};\\boldsymbol{\\theta}_{DF});\n\\boldsymbol{\\theta}_D\n\\right).</div>\n<p>但原始 DL-ROM 的 decoder 输出维度是 <span class=\"kb-math kb-math-inline\">N_h</span>，当 FOM 网格增大时，卷积 autoencoder 的输入输出张量和参数训练成本都会变重。POD-DL-ROM 的关键改动是先用 rPOD 做“数据压缩”，让深度网络只面对 POD 系数：</p>\n<div class=\"kb-math kb-math-display\">\\tilde{\\mathbf{u}}_h(t;\\boldsymbol{\\mu})\n=\n\\mathbf{V}_N\\tilde{\\mathbf{u}}_N(t;\\boldsymbol{\\mu}),\n\\qquad\n\\tilde{\\mathbf{u}}_N\n=\n\\mathbf{f}_N^D\\left(\n\\boldsymbol{\\phi}^{DF}_n(t;\\boldsymbol{\\mu});\\boldsymbol{\\theta}_D\n\\right).</div>\n<p>这里 <span class=\"kb-math kb-math-inline\">N\\ll N_h</span>，但 <span class=\"kb-math kb-math-inline\">N</span> 可以比最终潜变量维度 <span class=\"kb-math kb-math-inline\">n</span> 大得多；POD 只负责把高维快照压到可训练的数据尺度，不再承担最终物理 ROM 的线性表达能力限制。真正的非线性结构由 autoencoder decoder 学习。</p>\n<p>rSVD 的步骤是：采样高斯矩阵 <span class=\"kb-math kb-math-inline\">\\mathbf{\\Omega}</span>，构造 range finder：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{Y}=(\\mathbf{S}\\mathbf{S}^{T})^q\\mathbf{S}\\mathbf{\\Omega},</div>\n<p>QR 分解得 <span class=\"kb-math kb-math-inline\">\\mathbf{Y}=\\mathbf{Q}\\mathbf{R}</span>，再对小矩阵</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{B}=\\mathbf{Q}^{T}\\mathbf{S}\n=\\tilde{\\mathbf{V}}\\tilde{\\mathbf{\\Sigma}}\\tilde{\\mathbf{Z}}</div>\n<p>做 SVD，最终 rPOD 基为：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{V}_N=\\mathbf{Q}\\tilde{\\mathbf{V}}.</div>\n<p>训练损失由两项组成。第一项让 decoder 重构 POD 系数，第二项让 encoder 从真实 POD 系数得到的潜变量与 DFNN 从 <span class=\"kb-math kb-math-inline\">(t,\\boldsymbol{\\mu})</span> 预测的潜变量一致：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}(t^k,\\boldsymbol{\\mu}_i;\\boldsymbol{\\theta})\n=\n\\frac{\\omega_h}{2}\n\\left\\|\n\\mathbf{V}_N^T\\mathbf{u}_h(t^k;\\boldsymbol{\\mu}_i)\n-\n\\tilde{\\mathbf{u}}_N(t^k;\\boldsymbol{\\mu}_i)\n\\right\\|^2\n+\n\\frac{1-\\omega_h}{2}\n\\left\\|\n\\tilde{\\mathbf{u}}_n(t^k;\\boldsymbol{\\mu}_i)\n-\n\\mathbf{u}_n(t^k;\\boldsymbol{\\mu}_i)\n\\right\\|^2.</div>\n<p>在线阶段 encoder 被丢弃，只保留 DFNN 和 decoder，因此一次查询只需要：</p>\n<div class=\"kb-math kb-math-display\">(t,\\boldsymbol{\\mu})\\xrightarrow{\\boldsymbol{\\phi}^{DF}_n}\\mathbf{u}_n\n\\xrightarrow{\\mathbf{f}_N^D}\\tilde{\\mathbf{u}}_N\n\\xrightarrow{\\mathbf{V}_N}\\tilde{\\mathbf{u}}_h.</div>\n<p>这解释了为什么 POD-DL-ROM 可以“在线极快”：它不求解 reduced ODE，不做 Galerkin 残差投影，也不需要从初始时刻积分到目标时间。</p>\n<p>多保真预训练进一步降低离线成本。由于网络结构只依赖 rPOD 维度 <span class=\"kb-math kb-math-inline\">N</span> 而不直接依赖 <span class=\"kb-math kb-math-inline\">N_h</span>，可以先在粗网格、低保真材料模型或较小参数域上训练，然后把权重迁移到高分辨率/更复杂物理上继续优化。论文在心电 Monodomain 测试中报告了从 scratch 到 pretrained 的训练时间显著下降；在 Navier-Stokes 测试中，高维速度场 <span class=\"kb-math kb-math-inline\">N_h=64892</span> 的 POD-DL-ROM 训练约 50 分钟、测试约 0.1 秒，并在更细网格 <span class=\"kb-math kb-math-inline\">N_h=257528</span> 上通过预训练达到相同误差水平。</p>\n<div class=\"key-point\">💡 关键：POD-DL-ROM 不是退回普通 POD-NN。它先用 POD 解决“高维快照太大”的训练瓶颈，再用 autoencoder 的非线性流形解决“POD 线性叠加表达不足”的问题。</div>",
      "quiz": {
        "q": "POD-DL-ROM 中 rPOD 的主要作用是什么？",
        "options": [
          "先把 FOM 快照压缩到 POD 系数空间，降低深度网络训练维度，而最终非线性流形仍由 autoencoder 学习",
          "替代所有神经网络，使模型变成传统 POD-Galerkin ROM",
          "在在线阶段求解高维 FOM 残差，提高物理一致性",
          "只用于绘图可视化，对训练和推理没有影响"
        ],
        "answer": 0,
        "explain": "rPOD 是 POD-DL-ROM 的第一层数据压缩；网络训练对象从 N_h 维场变为 N 维 POD 系数，之后 autoencoder/DFNN 再学习低维非线性坐标和系数重构。"
      }
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
      "summary": "DeepXDE 将 PINN 求解微分方程的核心流程封装成可扩展 Python 框架，用几何、PDE、边界条件、网络和训练器等模块把“写物理残差”变成接近数学表达式的程序接口，并通过残差自适应加密（RAR）、复杂几何和正/反问题统一建模提升研究效率。",
      "keyPoints": [
        "<strong>PINN 框架化实现</strong>：用自动微分计算 PDE 残差，把方程、边界/初始条件和观测数据统一写成损失项",
        "<strong>正问题/反问题统一</strong>：未知物理参数 <span class=\"kb-math kb-math-inline\">\\lambda</span> 可以与网络权重 <span class=\"kb-math kb-math-inline\">\\theta</span> 一起优化，只需增加测量数据损失",
        "<strong>残差自适应加密 RAR</strong>：在 PDE 残差大的区域追加训练点，缓解随机配点对尖峰、激波或边界层不敏感的问题",
        "<strong>几何与边界条件抽象</strong>：支持 interval、rectangle、disk、cuboid、sphere 等基本几何，并用 CSG 的 union/difference/intersection 组合复杂区域",
        "<strong>紧凑工作流</strong>：<code>geometry -&gt; PDE -&gt; BC/IC -&gt; data.PDE/TimePDE -&gt; network -&gt; Model.compile -&gt; Model.train -&gt; Model.predict</code>",
        "<strong>多类型方程覆盖</strong>：论文讨论 ODE/PDE、integro-differential equation、fractional differential equation、stochastic differential equation 等 PINN 变体",
        "<strong>多后端研究框架</strong>：项目层面支持 TensorFlow、PyTorch、JAX、PaddlePaddle 等后端，便于算法比较和复现实验"
      ],
      "detail": "<h5>核心架构示意</h5>\n<p><img alt=\"DeepXDE PINN 残差构造示意\" src=\"https://ar5iv.labs.arxiv.org/html/1907.04502/assets/x1.png\" />\n<em>图：DeepXDE 论文中的 PINN 示意。网络输出 <span class=\"kb-math kb-math-inline\">\\hat{u}(x,t)</span>，自动微分产生时间/空间导数，并把 PDE、Dirichlet/Robin/Neumann 边界条件和初始条件共同放入损失。</em></p>\n<p><img alt=\"DeepXDE 使用流程\" src=\"https://ar5iv.labs.arxiv.org/html/1907.04502/assets/x4.png\" />\n<em>图：DeepXDE 对应 Procedure 3 的工作流。用户先定义 PDE 问题与网络，再由 <code>Model.compile</code>、<code>Model.train</code>、<code>Model.predict</code> 完成优化和推理。</em></p>\n<p>来源说明：任务给出的 <code>paper_url</code> 是项目仓库；方法解读主要追溯到论文 <a href=\"https://arxiv.org/abs/1907.04502\">DeepXDE: A deep learning library for solving differential equations</a> 与官方项目/文档。</p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># DeepXDE 风格 PINN + RAR 训练伪代码\n# 输入: 几何域 Ω, 边界 Γ, PDE 算子 F, 边界算子 B, 初始残差点 T_f, 边界点 T_b\n\ngeom = Geometry(Ω)                              # 例如 Rectangle、Disk 或 CSG 组合几何\nbc = BoundaryCondition(geom, B(u, x) == 0)      # Dirichlet / Neumann / Robin / Periodic\n\ndef pde_residual(x, u_theta):\n    du = autodiff(u_theta, x)                   # 一阶/高阶导数由后端 AD 产生\n    return F(x, u_theta, du)                    # 强形式 PDE 残差\n\ndata = PDEData(geom, pde_residual, bc,\n               num_domain=len(T_f),\n               num_boundary=len(T_b))\nnet = FNN(input_dim=dim_x, hidden=[width] * depth, output_dim=dim_u)\nmodel = Model(data, net)\nmodel.compile(optimizer=&quot;adam&quot;, loss_weights=[w_f, w_b])\n\nwhile True:\n    model.train(iterations=K)\n    candidates = sample_uniform(Ω, M)\n    residual = abs(pde_residual(candidates, model.predict(candidates)))\n    mean_residual = mean(residual)\n    if mean_residual &lt; tolerance:\n        break\n    T_new = top_k(candidates, residual, k=m)    # RAR: 选残差最大的点\n    data.add_anchors(T_new)\n\nsolution = model.predict(query_points)\n</code></pre>\n<h5>方法机制</h5>\n<p>DeepXDE 的底层对象仍是 PINN：用神经网络 <span class=\"kb-math kb-math-inline\">u_\\theta(x)</span> 近似微分方程解，而不是先生成网格再离散代数方程。对于一般 PDE，</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{F}\\left(x; u, \\frac{\\partial u}{\\partial x_1}, \\ldots,\n\\frac{\\partial^2 u}{\\partial x_i \\partial x_j}, \\ldots; \\lambda\\right)=0,\n\\quad x \\in \\Omega</div>\n<p>以及边界/初始条件</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{B}(u, x)=0,\\quad x \\in \\partial\\Omega,</div>\n<p>DeepXDE 令网络输出 <span class=\"kb-math kb-math-inline\">u_\\theta(x)</span>，再通过自动微分得到 <span class=\"kb-math kb-math-inline\">\\partial u_\\theta / \\partial x_i</span>、<span class=\"kb-math kb-math-inline\">\\partial^2 u_\\theta / \\partial x_i\\partial x_j</span> 等导数。它不对空间做有限差分 stencil，也不组装 FEM 刚度矩阵；PDE 是否成立直接以残差范数体现。</p>\n<p>核心训练目标可以写为：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}(\\theta)=\nw_f \\frac{1}{|T_f|}\\sum_{x_i\\in T_f}\\left\\|\n\\mathcal{F}(x_i;u_\\theta,\\nabla u_\\theta,\\nabla^2u_\\theta;\\lambda)\n\\right\\|^2\n+ w_b \\frac{1}{|T_b|}\\sum_{x_i\\in T_b}\n\\left\\|\\mathcal{B}(u_\\theta,x_i)\\right\\|^2 .</div>\n<p>如果是反问题，未知参数 <span class=\"kb-math kb-math-inline\">\\lambda</span> 直接变成可训练变量，并增加观测数据项：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{data}=\n\\frac{1}{N_u}\\sum_{i=1}^{N_u}\\left\\|u_\\theta(x_i)-u_i^{obs}\\right\\|^2,\n\\quad\n(\\theta^\\*,\\lambda^\\*)=\\arg\\min_{\\theta,\\lambda}\n(\\mathcal{L}+\\mathcal{L}_{data}).</div>\n<div class=\"key-point\">💡 关键：DeepXDE 的贡献不只是“又写了一个 PINN”，而是把 PINN 的可变部分拆成稳定 API：几何采样、边界条件、PDE 残差、网络、优化器、回调与预测接口。这样研究者可以替换网络或采样策略，而不必重写训练框架。</div>\n<p>RAR 是 DeepXDE 论文中最有辨识度的算法增强。普通 PINN 常把配点均匀或随机撒在整个域内，但尖锐梯度通常只出现在小区域，随机采样会浪费大量点。RAR 的做法是先训练一个粗解，再在候选点集合 <span class=\"kb-math kb-math-inline\">S</span> 上评估残差：</p>\n<div class=\"kb-math kb-math-display\">r_\\theta(x)=\\left\\|\\mathcal{F}(x;u_\\theta,\\nabla u_\\theta,\\ldots)\\right\\|,\n\\quad\n\\bar{r}\\approx\\frac{1}{|S|}\\sum_{x_i\\in S}r_\\theta(x_i).</div>\n<p>若 <span class=\"kb-math kb-math-inline\">\\bar{r}</span> 超过阈值，就把残差最大的若干点加入训练集 <span class=\"kb-math kb-math-inline\">T_f</span>，继续训练。它与 FEM 自适应网格细化的精神相似：不是盲目增加全域采样密度，而是把计算预算投向模型最违反物理约束的位置。</p>\n<p>DeepXDE 的 CSG 几何模块也很关键。复杂区域可由基本图元通过布尔运算组合，例如 <span class=\"kb-math kb-math-inline\">\\Omega=(A\\cup B)\\setminus C</span>。PINN 本身不需要网格，但仍需要知道“点是否在域内”“点是否在边界上”“边界法向是什么”；几何抽象把这些操作封装起来，使 Neumann/Robin 条件中的法向导数能够通过统一接口获得。</p>\n<p>与传统有限元/有限差分相比，DeepXDE 的主要差别在于优化对象和误差来源。FEM/FDM 把 PDE 转换成离散代数系统，误差主要来自网格、基函数阶数和数值积分；DeepXDE/PINN 把 PDE 转成非凸优化问题，误差来自网络逼近能力、配点泛化、优化器收敛和损失权重。前者通常更可靠地求单个正问题，后者在高维、反问题、参数化问题和数据稀缺情形中更方便。</p>\n<h5>训练与实现细节</h5>\n<p>DeepXDE 论文强调代码应“接近数学表述”。例如用户只需写 PDE 残差函数、边界判定函数和网络结构，其余的随机/网格采样、batch、优化器、保存、回调都由框架处理。回调机制可用于监控频谱、残差或早停；<code>loss_weights</code> 可用于平衡 PDE 残差、边界条件和数据项。</p>\n<p>库层面的多后端设计进一步服务于研究复现：同一个数学问题可以切换 TensorFlow、PyTorch、JAX 或 PaddlePaddle 后端，从而比较自动微分、高阶导数、GPU 性能和优化器行为。对于 AI4Science 研究，这比单个示例脚本更重要，因为大量工作需要快速替换 PINN 变体、采样策略或网络结构。</p>",
      "quiz": {
        "q": "DeepXDE 中 RAR（Residual-based Adaptive Refinement）的主要作用是什么？",
        "options": [
          "把所有残差点固定在规则网格上，减少随机性",
          "在 PDE 残差大的位置追加训练点，提高尖锐区域的物理约束精度",
          "把边界条件从软约束改成硬约束，完全消除边界误差",
          "用有限元网格替代神经网络，避免非凸优化"
        ],
        "answer": 1,
        "explain": "RAR 先评估候选点处的 PDE 残差，再把残差最大的点加入训练集，使训练点集中到当前解最不满足方程的位置。"
      }
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
      "summary": "NeuralPDE.jl 将 PINN 从“手写残差函数”推进到 Julia/SciML 的符号-数值工作流：用户用 `ModelingToolkit.jl` 描述 PDE 系统，框架自动生成物理损失、训练点/积分策略和 `OptimizationProblem`，从而把 PINN 与 SciML 的求解器、自动微分、GPU 和参数估计生态连接起来。",
      "keyPoints": [
        "<strong>符号 PDE 输入</strong>：通过 <code>PDESystem(eq, bcs, domains, params, vars)</code> 表达 PDE、边界条件、定义域和未知量",
        "<strong>自动损失生成</strong>：<code>PhysicsInformedNN</code> 把符号系统离散化为 PINN 的 PDE loss、BC loss、full loss 和可优化问题",
        "<strong>积分视角训练</strong>：<code>QuadratureTraining</code> 将残差损失视为定义域上的积分，并用 <code>Integrals.jl</code> 按 <code>reltol/abstol</code> 做自适应数值积分",
        "<strong>多采样策略</strong>：支持 <code>GridTraining</code>、<code>StochasticTraining</code>、<code>QuasiRandomTraining</code>、<code>QuadratureTraining</code>、<code>WeightedIntervalTraining</code>",
        "<strong>自适应损失权重</strong>：支持非自适应、梯度尺度自适应、MiniMax 自适应等方式平衡 PDE 与边界损失",
        "<strong>反问题与数据融合</strong>：<code>param_estim</code> 和 <code>additional_loss</code> 允许同时学习微分方程参数、拟合观测数据或做算子发现",
        "<strong>SciML 生态集成</strong>：兼容 Lux/Flux 神经网络、Optimization.jl、ModelingToolkit、NeuralOperators.jl，并支持 ODE/SDE/RODE/PDE、积分微分方程与 GPU 层"
      ],
      "detail": "<h5>核心架构示意</h5>\n<p><img alt=\"NeuralPDE 通用 PDE 形式\" src=\"https://user-images.githubusercontent.com/12683885/86625781-5648c800-bfce-11ea-9d99-fbcb5c37fe0c.png\" />\n<em>图：NeuralPDE 官方文档中的通用非线性 PDE 形式。用户在符号层描述 <span class=\"kb-math kb-math-inline\">u</span>、导数、定义域和边界条件，框架再生成 PINN 优化问题。</em></p>\n<p><img alt=\"NeuralPDE 2D Poisson 示例结果\" src=\"https://user-images.githubusercontent.com/12683885/90962648-2db35980-e4ba-11ea-8e58-f4f07c77bcb9.png\" />\n<em>图：NeuralPDE.jl README 的 2D Poisson 示例，展示解析解、PINN 预测和误差图。</em></p>\n<p>来源说明：任务给出的 <code>paper_url</code> 是 GitHub 项目页。可追溯论文为 <a href=\"https://arxiv.org/abs/2107.09443\">NeuralPDE: Automating Physics-Informed Neural Networks (PINNs) with Error Approximations</a>；本文图示采用官方文档/README 中可访问图片，因为该论文的 arXiv HTML 图页不可稳定访问。</p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-julia\"># NeuralPDE.jl 符号 PINN 工作流伪代码\nusing NeuralPDE, Lux, ModelingToolkit, Optimization, OptimizationOptimisers\nimport DomainSets: Interval\n\n@parameters x y\n@variables u(..)\nDxx = Differential(x)^2\nDyy = Differential(y)^2\n\n# 1. 用符号表达式定义 PDE 与边界条件\neq = Dxx(u(x, y)) + Dyy(u(x, y)) ~ -sin(pi * x) * sin(pi * y)\nbcs = [\n    u(0, y) ~ 0.0,\n    u(1, y) ~ 0.0,\n    u(x, 0) ~ 0.0,\n    u(x, 1) ~ 0.0,\n]\ndomains = [x ∈ Interval(0.0, 1.0), y ∈ Interval(0.0, 1.0)]\n\n# 2. 定义神经网络近似解 phi_theta(x, y)\nchain = Lux.Chain(Dense(2, 16, tanh), Dense(16, 16, tanh), Dense(16, 1))\n\n# 3. 选择训练策略；QuadratureTraining 将 loss 视为积分\nstrategy = QuadratureTraining(reltol = 1e-6, abstol = 1e-3, batch = 100)\ndiscretization = PhysicsInformedNN(chain, strategy)\n\n# 4. 符号 PDE 系统 -&gt; PINN 表示 -&gt; OptimizationProblem\n@named pde_system = PDESystem(eq, bcs, domains, [x, y], [u(x, y)])\nprob = discretize(pde_system, discretization)\n\n# 可选：检查自动生成的 PDE/BC loss\npinn_rep = symbolic_discretize(pde_system, discretization)\nloss_fns = pinn_rep.loss_functions\n\n# 5. 使用 Optimization.jl 训练\nres = Optimization.solve(prob, ADAM(0.01), maxiters = 6000)\nphi = discretization.phi\nu_pred = phi([0.5, 0.5], res.minimizer)\n</code></pre>\n<h5>方法机制</h5>\n<p>NeuralPDE.jl 的核心思想是把 PINN 看成一种 <strong>PDE 系统的离散化器</strong>。在 DeepXDE 这类 Python 框架中，用户通常直接写一个 residual 函数；NeuralPDE.jl 则先让用户在 <code>ModelingToolkit.jl</code> 的符号层定义方程、边界条件和定义域，再通过 <code>PhysicsInformedNN</code> 把这个符号对象转成优化问题。官方文档明确说明：<code>discretize(pde_system, discretization)</code> 会把 <code>PDESystem</code> 转换为 <code>Optimization.jl</code> 的 <code>OptimizationProblem</code>。</p>\n<p>给定一般 PDE：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{F}\\left(x; u, \\frac{\\partial u}{\\partial x_1},\\ldots,\n\\frac{\\partial^2 u}{\\partial x_1\\partial x_d},\\ldots;\\lambda\\right)=0,\n\\quad x\\in\\Omega,</div>\n<p>以及边界条件 <span class=\"kb-math kb-math-inline\">\\mathcal{B}_j(u,x)=0,\\ x\\in\\Gamma_j</span>，NeuralPDE.jl 用神经网络试探函数 <span class=\"kb-math kb-math-inline\">\\phi_\\theta(x)</span> 代替 <span class=\"kb-math kb-math-inline\">u(x)</span>，生成如下形式的目标：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}(\\theta)=\n\\sum_i w_i^{pde}\\int_{\\Omega_i}\n\\left\\|\\mathcal{F}_i(x;\\phi_\\theta,\\partial\\phi_\\theta,\\partial^2\\phi_\\theta,\\ldots)\\right\\|^2 dx\n+\n\\sum_j w_j^{bc}\\int_{\\Gamma_j}\n\\left\\|\\mathcal{B}_j(\\phi_\\theta,x)\\right\\|^2 dS\n+ w_{add}\\mathcal{L}_{add}.</div>\n<p>这里的 <span class=\"kb-math kb-math-inline\">\\mathcal{L}_{add}</span> 对应 <code>additional_loss(phi, θ, p_)</code>，可用来混合真实观测数据、参数正则项或领域特定约束。若 <code>param_estim = true</code>，微分方程参数会被拼接进优化变量，和网络权重一起由优化器估计。</p>\n<div class=\"key-point\">💡 关键：NeuralPDE.jl 的“自动化”不是自动发现 PDE，而是自动把用户给出的符号 PDE 编译成可训练损失、导数计算函数、采样/积分过程和优化问题。</div>\n<p>论文标题中的 “Error Approximations” 主要体现在积分化损失和训练策略上。<code>QuadratureTraining</code> 不把残差点仅仅看成 minibatch 样本，而是把损失写成积分：</p>\n<div class=\"kb-math kb-math-display\">\\int_\\Omega g_\\theta(x)\\,dx,\n\\quad\ng_\\theta(x)=\\left\\|\\mathcal{F}(x;\\phi_\\theta,\\partial\\phi_\\theta,\\ldots)\\right\\|^2.</div>\n<p>数值上再用求积近似：</p>\n<div class=\"kb-math kb-math-display\">\\int_\\Omega g_\\theta(x)\\,dx \\approx \\sum_{k=1}^{N_q}\\omega_k g_\\theta(x_k).</div>\n<p>当选择自适应求积算法时，<code>reltol</code> 和 <code>abstol</code> 给出积分误差控制目标；这比固定随机配点更贴近传统数值分析，也解释了 NeuralPDE.jl 为什么强调 quadrature training。对于高维或 GPU 训练，文档建议常用 <code>QuasiRandomTraining</code>，因为低差异序列在高维空间通常比纯随机采样更稳定且可 GPU 化。</p>\n<p><code>symbolic_discretize</code> 是 NeuralPDE.jl 区别于脚本式 PINN 的另一个关键接口。它返回 <code>PINNRepresentation</code>，其中包含 <code>eqs</code>、<code>bcs</code>、<code>domains</code>、<code>depvars</code>、<code>indvars</code>、<code>phi</code>、<code>derivative</code>、<code>strategy</code>、<code>symbolic_pde_loss_functions</code>、<code>symbolic_bc_loss_functions</code> 和 <code>loss_functions</code> 等字段。研究者可以在不改动高层模型的情况下检查自动生成的 loss，定位某个边界项或 PDE 项是否主导训练。</p>\n<p>训练稳定性方面，NeuralPDE.jl 将损失权重变成显式策略。<code>GradientScaleAdaptiveLoss</code> 根据 PDE loss 与 BC loss 的梯度尺度比例动态调权，目标是避免某一类约束梯度过大而压制其他约束；<code>MiniMaxAdaptiveLoss</code> 则用内部优化器增大尚未满足的 loss 权重。这些方法并不改变 PINN 的物理建模假设，但改变多目标优化的数值行为。</p>\n<h5>与 DeepXDE 的关系</h5>\n<p>NeuralPDE.jl 可以看作 DeepXDE 思路在 SciML 生态中的符号化、高性能版本。DeepXDE 的优势是 Python 简洁 API 与多后端普及度；NeuralPDE.jl 的优势是 Julia 多重派发、符号建模和 DifferentialEquations/Optimization/Sensitivity 等库的组合能力。对于需要把 PINN 放进更大的科学计算管线、做参数估计或和传统求解器互操作的任务，NeuralPDE.jl 的 <code>PDESystem -&gt; OptimizationProblem</code> 路径更自然。</p>",
      "quiz": {
        "q": "NeuralPDE.jl 中 PhysicsInformedNN 的核心职责是什么？",
        "options": [
          "自动从数据中发现未知 PDE 的符号形式",
          "把 ModelingToolkit 的 PDESystem 转换成 PINN 损失与 OptimizationProblem",
          "只负责绘制 PDE 解的等高线图",
          "用有限元网格替代神经网络试探函数"
        ],
        "answer": 1,
        "explain": "PhysicsInformedNN 是 NeuralPDE.jl 的 PINN 离散化器，它根据符号 PDE、边界条件和训练策略生成可优化的物理损失。"
      }
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
      "summary": "NVIDIA Modulus 将 PINN、数据驱动建模和神经算子组织成面向工业仿真的 GPU 框架，用 Geometry/Data、Node、Constraint、Domain、Solver、Hydra 等组件把多物理场仿真、参数化设计、反问题和数字孪生统一为可扩展的优化图。",
      "keyPoints": [
        "<strong>工程化 PINN 框架</strong>：把 PDE、边界条件、观测数据和网络输出都表示为 <code>Node</code> 与 <code>Constraint</code> 组成的计算图",
        "<strong>约束驱动训练</strong>：<code>Constraint</code> 持有损失函数和执行节点，<code>Solver</code> 在每轮迭代汇总全局损失并优化可训练模型",
        "<strong>积分化损失</strong>：官方文档把残差损失视为区域积分，并用 Monte Carlo / quasi-Monte Carlo 近似，使 loss 与几何面积/体积尺度一致",
        "<strong>参数化几何与设计空间探索</strong>：网络可把几何参数作为输入，一次训练覆盖多个设计配置，推理阶段快速评估新配置",
        "<strong>复杂几何支持</strong>：SimNet/Modulus 系列支持 CSG、STL/OBJ tessellated geometry、点云采样和边界法向/距离计算",
        "<strong>SDF 空间加权</strong>：用 signed distance function 调整 PDE residual loss 权重，缓解尖角、间隙、壁面附近强梯度导致的训练困难",
        "<strong>工业 GPU 优化</strong>：支持 Fourier feature、modified Fourier、SiReN 等架构，并强调多 GPU/多节点、FP32/FP64/TF32 和 TensorBoard/ParaView 可视化链路"
      ],
      "detail": "<h5>核心架构示意</h5>\n<p><img alt=\"SimNet/Modulus 框架结构\" src=\"https://ar5iv.labs.arxiv.org/html/2012.07938/assets/x4.png\" />\n<em>图：NVIDIA SimNet 论文中的系统结构。SimNet 是 Modulus 的前身/同源方法脉络，展示几何、PDE、网络、优化器、数据集、求解器、GPU 与可视化输出如何组成端到端仿真框架。</em></p>\n<p><img alt=\"Modulus 参数化微分方程示例\" src=\"https://docscontent.nvidia.com/dims4/default/3838a28/2147483647/strip/true/crop/960x721%2B0%2B0/resize/960x721%21/quality/90/?url=https%3A%2F%2Fk3-prod-nvidia-docs.s3.us-west-2.amazonaws.com%2Fbrightspot%2Fsphinx%2F00000187-bf1b-d3c6-a7f7-ff7f4e8b0000%2Fdeeplearning%2Fmodulus%2Fmodulus-v2209%2F_images%2Fevery_parabola.png\" />\n<em>图：NVIDIA Modulus v22.09 文档中的参数化 ODE/PDE 示例。网络输入包含参数 <span class=\"kb-math kb-math-inline\">l</span>，一次训练得到不同边界位置下的解族。</em></p>\n<p>来源说明：任务给出的 <code>paper_url</code> 是 NVIDIA 产品页；方法解读主要基于 NVIDIA Modulus v22.09 官方文档与论文 <a href=\"https://arxiv.org/abs/2012.07938\">NVIDIA SimNet: an AI-accelerated multi-physics simulation framework</a>。Modulus 后续品牌演进到 PhysicsNeMo，但本条目按 2022 年 Modulus/SimNet 方法脉络解读。</p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># NVIDIA Modulus 风格物理约束训练伪代码\n# 输入: 几何 Ω, PDE 节点, 边界/内部约束, 网络结构, Hydra 配置\n\n@modulus_main(config_path=&quot;conf&quot;, config_name=&quot;config&quot;)\ndef run(cfg):\n    # 1. 几何与参数化设计空间\n    x, y, z = Symbol(&quot;x&quot;), Symbol(&quot;y&quot;), Symbol(&quot;z&quot;)\n    l = Symbol(&quot;l&quot;)                         # 设计变量/几何参数\n    geometry = build_csg_or_import_stl(l)\n\n    # 2. PDE/网络都转成 Nodes，框架据此构建执行图\n    pde_nodes = NavierStokes(nu=nu, rho=rho).make_nodes()\n    net = FullyConnectedArch(\n        input_keys=[&quot;x&quot;, &quot;y&quot;, &quot;z&quot;, &quot;l&quot;],\n        output_keys=[&quot;u&quot;, &quot;v&quot;, &quot;w&quot;, &quot;p&quot;],\n        frequencies=&quot;fourier&quot;\n    )\n    nodes = pde_nodes + [net.make_node(name=&quot;flow_network&quot;)]\n\n    # 3. 多个 Constraints 共同定义问题\n    domain = Domain()\n    domain.add_constraint(\n        PointwiseBoundaryConstraint(nodes, geometry.inlet,\n                                    outvar={&quot;u&quot;: inlet_u, &quot;v&quot;: 0, &quot;w&quot;: 0}),\n        name=&quot;inlet_bc&quot;\n    )\n    domain.add_constraint(\n        PointwiseInteriorConstraint(nodes, geometry,\n                                    outvar={&quot;continuity&quot;: 0, &quot;momentum_x&quot;: 0,\n                                            &quot;momentum_y&quot;: 0, &quot;momentum_z&quot;: 0},\n                                    lambda_weighting={&quot;momentum_x&quot;: sdf_weight(geometry)}),\n        name=&quot;pde_residual&quot;\n    )\n    domain.add_inferencer(PointwiseInferencer(nodes, query_points), name=&quot;vtk_export&quot;)\n\n    # 4. Solver 汇总所有 constraint loss 并优化\n    solver = Solver(cfg, domain)\n    solver.solve()\n</code></pre>\n<h5>方法机制</h5>\n<p>Modulus 的基本 PINN 机制和普通 physics-informed learning 一致：用神经网络 <span class=\"kb-math kb-math-inline\">u_{net}(x)</span> 近似未知解，并把 PDE 与边界条件变成损失。例如官方文档用如下一维问题说明：</p>\n<div class=\"kb-math kb-math-display\">\\frac{d^2u}{dx^2}(x)=f(x),\\quad u(0)=u(1)=0.</div>\n<p>边界损失为：</p>\n<div class=\"kb-math kb-math-display\">L_{BC}=u_{net}(0)^2+u_{net}(1)^2,</div>\n<p>残差损失为：</p>\n<div class=\"kb-math kb-math-display\">L_{residual}=\\frac{1}{N}\\sum_{i=0}^{N}\n\\left(\\frac{d^2u_{net}}{dx^2}(x_i)-f(x_i)\\right)^2.</div>\n<p>Modulus 文档进一步把这个求和解释为积分的 Monte Carlo 近似：</p>\n<div class=\"kb-math kb-math-display\">L_{residual}\n=\\int_0^1\n\\left(\\frac{d^2u_{net}}{dx^2}(x)-f(x)\\right)^2 dx\n\\approx\n\\left(\\int_0^1 dx\\right)\\frac{1}{N}\\sum_{i=0}^{N}\n\\left(\\frac{d^2u_{net}}{dx^2}(x_i)-f(x_i)\\right)^2.</div>\n<div class=\"key-point\">💡 关键：把 loss 写成积分不是形式主义。对于复杂 2D/3D 几何，不同区域面积/体积不同，积分视角能让约束强度随物理区域尺度变化，并自然接入 Monte Carlo、quasi-Monte Carlo 和区域重采样。</div>\n<p>Modulus 的工程抽象围绕 <code>Node</code>、<code>Constraint</code>、<code>Domain</code> 和 <code>Solver</code> 展开。<code>Node</code> 可以是 PyTorch 网络、用户函数、PDE 方程或特征变换；它声明输入/输出变量，框架据此推断执行图，并自动补齐计算 PDE 残差所需的导数。<code>Constraint</code> 是训练目标，包含采样器、目标变量、损失函数和节点集合。<code>Domain</code> 汇总所有约束、验证器、监控器和推理器；<code>Solver</code> 执行优化循环，在每次迭代中调用约束、计算全局 loss、反向传播并更新模型。</p>\n<p>参数化几何是 Modulus/SimNet 面向工业设计的核心能力。若边界位置或几何尺寸由参数 <span class=\"kb-math kb-math-inline\">l\\in[1,2]</span> 控制，网络可写为 <span class=\"kb-math kb-math-inline\">u_{net}(x,l)</span>，残差积分变成：</p>\n<div class=\"kb-math kb-math-display\">L_{residual}=\n\\int_1^2\\int_0^l\n\\left(\\frac{d^2u_{net}}{dx^2}(x,l)-f(x)\\right)^2 dx\\,dl.</div>\n<p>这意味着一次训练得到的是一族解，而不是单一几何上的一个解。传统 CFD/FEM 通常要对每个设计点重新网格化和求解；Modulus 在训练成本付出后，可以在推理阶段快速扫描设计参数，用于设计空间探索、优化和数字孪生。</p>\n<p>SimNet 论文指出，真实工业几何中的尖角、薄间隙和不连续边界会让 PINN 训练变得困难。SDF loss weighting 是为此设计的机制：令 <span class=\"kb-math kb-math-inline\">d(x,\\partial\\Omega)</span> 表示点到边界的 signed distance，可定义空间相关权重 <span class=\"kb-math kb-math-inline\">\\lambda(x)</span>，将损失写成</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{pde}=\n\\int_{\\Omega}\n\\lambda(x)\\left\\|\\mathcal{R}_\\theta(x)\\right\\|^2 dx,\n\\quad\n\\lambda(x)=\\psi(d(x,\\partial\\Omega)).</div>\n<p>在尖角或强梯度区域调低/调节 residual 权重，可以避免局部奇异性支配整个优化过程。论文还提到对 tessellated mesh 的 SDF 计算使用 NVIDIA OptiX 做 inside/outside 测试和距离计算，这体现了 Modulus 与通用研究框架的差异：它不仅关注算法公式，也关注几何预处理和 GPU 工程吞吐。</p>\n<p>对于不可压流，Modulus/SimNet 还加入 exact continuity 与 integral continuity 约束。连续性方程</p>\n<div class=\"kb-math kb-math-display\">\\frac{\\partial u}{\\partial x}+\n\\frac{\\partial v}{\\partial y}+\n\\frac{\\partial w}{\\partial z}=0</div>\n<p>既可以用速度势/向量势构造严格散度为零的速度场，也可以对截面 <span class=\"kb-math kb-math-inline\">S</span> 添加积分流量约束：</p>\n<div class=\"kb-math kb-math-display\">L_{IC}=\n\\left(\\iint_S(n_xu+n_yv+n_zw)\\,dS\\right)^2\n\\approx\n\\left(|S|\\frac{1}{N}\\sum_{i=1}^{N}\n(n_x^iu_i+n_y^iv_i+n_z^iw_i)\\right)^2.</div>\n<p>这种约束比只在点上惩罚 divergence 更贴近工程上关心的整体质量守恒，尤其有助于长通道、出口截面和复杂 3D 流动的收敛。</p>\n<h5>与普通 PINN 框架的区别</h5>\n<p>DeepXDE、NeuralPDE.jl 更偏研究者友好的算法试验平台；Modulus 的目标更偏工业仿真生产线。它内置 Hydra 配置、TensorBoard/ParaView 输出、Validator/Monitor、STL/OBJ 导入、GPU 训练优化和多种网络架构，适合把 PINN 或神经算子放入数字孪生与设计优化流程。代价是框架更重，用户需要理解 Modulus 的节点图、约束系统和配置体系。</p>",
      "quiz": {
        "q": "NVIDIA Modulus 将 PDE residual loss 写成区域积分并用 Monte Carlo 近似的主要好处是什么？",
        "options": [
          "让所有训练点必须固定在规则网格上",
          "使损失自然随几何面积/体积缩放，并支持复杂区域上的随机/准随机采样",
          "完全避免自动微分计算导数",
          "把 PINN 训练转换成无需优化器的线性方程组"
        ],
        "answer": 1,
        "explain": "积分视角把残差约束定义在物理区域上，Monte Carlo 近似适合复杂几何采样，也能让不同区域的 loss 与其尺度一致。"
      }
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
      "summary": "PhysicsNeMo v2.0 不是单篇论文算法，而是 NVIDIA 将 Modulus/PhysicsNeMo 演进为 PyTorch 原生、模块化、可扩展 SciML 工具栈的一次核心重构；它通过标准化模型、数据管线、网格库、分布式与 GNN 后端，把 MeshGraphNet/GraphCast 等物理代理模型训练流程更紧密地接入 PyTorch 生态。",
      "keyPoints": [
        "<strong>框架级重构</strong>：v2.0 将 <code>physicsnemo.models.Module</code>、<code>Meta</code> 迁入 <code>physicsnemo.core</code>，将层级组件集中到 <code>physicsnemo.nn</code>，减少循环导入并提升可组合性",
        "<strong>PyTorch 原生体验</strong>：新增 PyTorch-like 的 <code>physicsnemo.nn</code>、<code>physicsnemo.nn.functional</code>、<code>physicsnemo.datapipes</code>、<code>physicsnemo.mesh</code> 等包，降低与外部 PyTorch 代码混用的成本",
        "<strong>GPU 数据与网格栈</strong>：<code>physicsnemo.datapipes</code> 面向高分辨率 SciML 数据加载，<code>physicsnemo.mesh</code> 提供 GPU 加速的 simplex mesh、点云、图和场数据处理",
        "<strong>GNN 物理代理模型</strong>：官方文档覆盖 MeshGraphNet、GraphCast、X-MeshGraphNet、Hybrid MeshGraphNet 等，重点服务不规则网格、瞬态动力学和大规模分布式图",
        "<strong>PyG 迁移路线</strong>：后续文档将 PyTorch Geometric 作为推荐 GNN 后端；官方 release notes 报告 MeshGraphNet 在大网格、fp16/bf16 下有 1.5-2x 性能优化",
        "<strong>分布式与大规模图</strong>：通过图分区、halo regions、Domain Parallelism、ShardTensor、FSDP 等机制扩展到超大网格和多 GPU/多节点训练",
        "<strong>来源限制</strong>：该条目的 <code>paper_url</code> 是发布页而非论文；以下解读基于 NVIDIA GitHub release、v2.0 migration guide、官方文档和 GNN 示例，而不是 peer-reviewed paper"
      ],
      "detail": "<h5>核心架构示意</h5>\n<p><img alt=\"PhysicsNeMo 大规模图分区与 halo region\" src=\"https://docs.nvidia.com/physicsnemo/latest/_images/mesh_with_halo_regions.png\" />\n<em>图：PhysicsNeMo 文档中的大规模图分区和 halo region 示意。它体现了 PhysicsNeMo 面向大网格 GNN 时的核心工程问题：把不规则 mesh 切分到多个设备，同时保留跨分区消息传递所需的邻域。</em></p>\n<p><img alt=\"MeshGraphNet 瞬态涡街预测示例\" src=\"https://docs.nvidia.com/physicsnemo/latest/_images/vortex_shedding.gif\" />\n<em>图：PhysicsNeMo 的 MeshGraphNet 涡街示例，展示模型在不规则二维三角网格上进行自回归瞬态预测。</em></p>\n<p>可访问来源说明：NVIDIA 的 v2.0 发布页位于 https://github.com/NVIDIA/physicsnemo/releases/tag/v2.0.0 ，迁移指南位于 https://github.com/NVIDIA/physicsnemo/blob/main/v2.0-MIGRATION-GUIDE.md ，GNN/PyG 相关文档见 https://docs.nvidia.com/physicsnemo/latest/resources/dgl_to_pyg_migration.html 和 https://docs.nvidia.com/physicsnemo/latest/user-guide/model_architectures.html 。性能描述中的 1.5-2x MeshGraphNet 优化来自官方 release notes: https://docs.nvidia.com/physicsnemo/latest/release-notes/index.html 。</p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># PhysicsNeMo v2 风格的 MeshGraphNet/PyG 训练流程伪代码\n# 输入: 不规则 mesh 时间序列、节点类型、边几何特征、目标物理场\n# 输出: 可自回归 rollout 的物理代理模型\n\nmodel = MeshGraphNet(\n    node_in_dim=velocity_dim + node_type_dim,\n    edge_in_dim=relative_position_dim + distance_dim,\n    hidden_dim=128,\n    num_message_passing_layers=15,\n)\n\nfor batch in physicsnemo_datapipe:\n    graph = build_pyg_graph(\n        x=batch.node_features,          # u_t, v_t, node type\n        edge_index=batch.edge_index,    # bidirectional mesh connectivity\n        edge_attr=batch.edge_features,  # dx, dy, ||d||\n    )\n\n    pred_next = model(graph)            # predict u_{t+1}, v_{t+1}, p_{t+1}\n    data_loss = mean_squared_error(pred_next, batch.target_next)\n\n    if physics_guided:\n        residual = physics_informer(pred_next, batch.geometry)\n        loss = data_loss + lambda_phys * mean(residual**2)\n    else:\n        loss = data_loss\n\n    loss.backward()\n    optimizer.step()\n    optimizer.zero_grad()\n\ndef rollout(initial_state, graph, steps):\n    state = initial_state\n    for _ in range(steps):\n        state = model(graph.with_node_state(state))\n    return state\n</code></pre>\n<h5>GNN 核心计算</h5>\n<p>PhysicsNeMo 中最典型的 GNN 物理代理模型是 MeshGraphNet。它把数值仿真的 mesh 看成图 <span class=\"kb-math kb-math-inline\">G=(V,E)</span>：节点 <span class=\"kb-math kb-math-inline\">v\\in V</span> 存储速度、压力、节点类型等物理量，边 <span class=\"kb-math kb-math-inline\">(u,v)\\in E</span> 存储相对坐标和距离等几何关系。一次消息传递可写为：</p>\n<div class=\"kb-math kb-math-display\">h_v^{0}=\\phi_v(x_v),\\qquad h_{uv}^{0}=\\phi_e(e_{uv})</div>\n<div class=\"kb-math kb-math-display\">m_{uv}^{k}=\\psi_e^k\\left(h_u^k,h_v^k,h_{uv}^k\\right),\\qquad\n\\bar{m}_v^k=\\sum_{u:(u,v)\\in E}m_{uv}^k</div>\n<div class=\"kb-math kb-math-display\">h_v^{k+1}=\\psi_v^k\\left(h_v^k,\\bar{m}_v^k\\right),\\qquad\n\\hat{y}_{t+1,v}=\\psi_{\\mathrm{dec}}(h_v^K)</div>\n<p>训练目标通常是下一步物理场的监督损失：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\mathrm{data}}\n=\\frac{1}{|V|}\\sum_{v\\in V}\n\\left\\|\\hat{y}_{t+1,v}-y_{t+1,v}\\right\\|_2^2</div>\n<p>若结合 PhysicsNeMo Sym/PhysicsInformer，也可以把 PDE 残差作为物理项加入：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}\n=\\mathcal{L}_{\\mathrm{data}}\n\\lambda_{\\mathrm{phys}}\n\\frac{1}{N_f}\\sum_{i=1}^{N_f}\n\\left\\|\\mathcal{R}\\left(\\hat{u}_\\theta;x_i,t_i\\right)\\right\\|_2^2</div>\n<p>这里的关键并不是发明新的 GNN 公式，而是把 GNN、数据加载、mesh 表示、分布式并行、checkpoint、物理残差和 mixed precision 训练放进同一个 PyTorch 组合式框架中。</p>\n<h5>v2.0 为什么重要</h5>\n<p>PhysicsNeMo v2.0 的核心变化是工程抽象的重新划分。旧版 Modulus/PhysicsNeMo 中，模型、layers、utils、launch、checkpoint、domain parallel 等能力分布较散，迁移指南明确把公共模型基类迁到 <code>physicsnemo.core</code>，把可复用层迁到 <code>physicsnemo.nn</code>，把模型专用工具放回对应模型目录。这会减少用户在定制模型时碰到的隐式依赖和循环导入问题。</p>\n<p>第二个变化是把科学计算中的输入表示统一到 PyTorch 张量生态。<code>physicsnemo.mesh</code> 用 <code>Mesh(points, cells, point_data, cell_data, global_data)</code> 表示二维/三维 simplex mesh、点云和图，所有几何与场数据可随 <code>.to(\"cuda\")</code> 一起移动。对 GNN 来说，这意味着 mesh 到 graph、graph 到 batch、batch 到分布式训练的路径更短。</p>\n<p>第三个变化是 GNN 后端从 DGL 逐步转向 PyTorch Geometric。官方 PyG 迁移文档说明：当输入图是 <code>torch_geometric.data.Data</code> 时使用 PyG backend；当输入仍是 <code>dgl.DGLGraph</code> 时保持兼容。这样既避免一次性破坏旧 checkpoint 和 dataset，又为后续 PyG 的 kernel、loader、ClusterData、k-hop subgraph 等生态优化留出空间。</p>\n<h5>与传统 Modulus/单模型脚本的区别</h5>\n<p>传统单模型脚本通常把数据读取、mesh 预处理、模型定义、训练循环和分布式逻辑写在一起。PhysicsNeMo v2.0 把这些拆成稳定模块：DataPipes 负责数据，Mesh 负责几何和场，<code>physicsnemo.models</code>/<code>physicsnemo.nn</code> 负责模型和层，<code>physicsnemo.utils.checkpoint</code> 负责 checkpoint，Domain Parallelism 和 ShardTensor 负责超大图或超大张量切分。</p>\n<p>这种拆分对 AI4Science 的价值在于可替换性。用户可以保留 MeshGraphNet 的 message passing 主体，替换 PyG graph 构造；也可以保留训练 recipe，替换模型为 Transolver、FNO 或 DoMINO；还可以把纯数据监督损失换成带 PDE residual 的 physics-guided loss。</p>\n<h5>性能机制</h5>\n<p>任务元信息中的“GNN 速度提升 2 倍”对应官方 release notes 中 MeshGraphNet/GNN 的性能优化描述：在大于 200k nodes 的 mesh 上，fp16/bf16 场景报告 1.5-2x speedup。方法层面可以拆成三类来源：</p>\n<ul>\n<li><strong>后端切换</strong>：PyG 图对象、loader 和稀疏操作更贴近 PyTorch 生态，可减少 DGL/PyTorch 之间的数据与 API 摩擦</li>\n<li><strong>精度与 kernel 优化</strong>：fp16/bf16 mixed precision 让 message passing 中的 MLP 和 aggregation 更好利用 Tensor Core</li>\n<li><strong>大图并行</strong>：graph partitioning 与 halo regions 在保持邻域消息的同时降低单卡显存压力，适配多 GPU 训练</li>\n</ul>\n<div class=\"key-point\">💡 关键：PhysicsNeMo v2.0 的算法价值主要体现在“可组合的 SciML 基础设施”。它不是替代 MeshGraphNet、FNO 或 PINN 的单一算法，而是把这些模型变成更容易在真实工程网格、大规模数据和 PyTorch 训练栈中复用的模块。</div>",
      "quiz": {
        "q": "PhysicsNeMo v2.0 对 GNN 物理代理模型最直接的工程价值是什么？",
        "options": [
          "把所有 PDE 都改写成解析解",
          "通过 PyTorch 原生模块、PyG 后端、DataPipes 和 Mesh 工具降低大规模 GNN 训练与部署成本",
          "删除 MeshGraphNet 的 message passing 层，只保留 MLP",
          "只支持规则网格上的 CNN 模型"
        ],
        "answer": 1,
        "explain": "PhysicsNeMo v2.0 是框架级重构，重点在 PyTorch 原生组合、GNN/PyG 迁移、GPU 数据管线和 mesh/分布式工具，而不是改变 PDE 的数学形式。"
      }
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
      "summary": "SCaSML 提出在推理阶段对预训练 PDE surrogate 做 defect correction：先推导控制误差 \\(\\breve{u}=u-\\hat{u}\\) 的结构保持缺陷定律，再用 Monte Carlo/Multilevel Picard 仿真估计该误差并校正 \\(\\hat{u}\\)，从而无需重训练即可提升高维 PDE 解的可靠性。",
      "keyPoints": [
        "<strong>推理时缩放</strong>：把额外计算预算放在 inference-time simulation，而不是继续训练或微调 surrogate",
        "<strong>两阶段流程</strong>：先训练 PINN、Gaussian Process 或 Tensor Network 等 SciML surrogate <span class=\"kb-math kb-math-inline\">\\hat{u}</span>，再在目标查询点求 defect <span class=\"kb-math kb-math-inline\">\\breve{u}</span>",
        "<strong>结构保持缺陷定律</strong>：把误差 <span class=\"kb-math kb-math-inline\">u-\\hat{u}</span> 写成一个新的 semi-linear parabolic PDE，且保持原 PDE 可由随机仿真求解的结构",
        "<strong>随机仿真校正</strong>：使用 Feynman-Kac、Bismut-Elworthy-Li 表示和 Multilevel Picard (MLP) 迭代估计 defect",
        "<strong>两类 MLP 实现</strong>：Quadrature MLP 用 Gauss-Legendre quadrature 处理时间积分；Full-history MLP 用 Monte Carlo 采样时间",
        "<strong>乘积型误差界</strong>：最终误差由 MLP 仿真误差与 surrogate 误差的乘积控制，surrogate 越好，缺陷 PDE 越容易模拟",
        "<strong>高维基准</strong>：论文在最高 160 维 PDE 上报告对 PINN/GP surrogate 的 20-80% 误差降低",
        "<strong>来源追溯</strong>：任务给定 OpenReview id 未能直接定位论文；可访问论文为 OpenReview <code>d2pUyiXwcm</code> 与 arXiv <code>2504.16172</code>"
      ],
      "detail": "<h5>核心架构示意</h5>\n<p><img alt=\"SCaSML framework pipeline\" src=\"https://arxiv.org/html/2504.16172v3/x1.png\" />\n<em>图：SCaSML 的整体 pipeline。先训练 surrogate <span class=\"kb-math kb-math-inline\">\\hat{u}</span>，再在推理时通过随机仿真估计 defect <span class=\"kb-math kb-math-inline\">\\breve{u}=u-\\hat{u}</span>。</em></p>\n<p><img alt=\"SCaSML defect law derivation\" src=\"https://arxiv.org/html/2504.16172v3/x2.png\" />\n<em>图：结构保持缺陷定律的推导示意。核心是把原 PDE 与 surrogate 诱导的残差相减，得到误差自身满足的新 PDE。</em></p>\n<p>可访问来源说明：论文 HTML/PDF 位于 https://arxiv.org/abs/2504.16172 ，ICLR 2026 OpenReview 页面位于 https://openreview.net/forum?id=d2pUyiXwcm ，代码仓库为 https://github.com/Francis-Fan-create/SCaSML 。正文保留 YAML 中的原始 <code>paper_url</code>，但方法解读基于上述可访问来源。</p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># SCaSML 推理阶段 defect correction 伪代码\n# 输入: PDE, 预训练 surrogate u_hat, 查询点 (s, x), MLP level n, sample base M\n# 输出: 校正后的 PDE 解 u_scasml(s, x)\n\ndef scasml_inference(pde, u_hat, s, x, n, M, mode=&quot;full_history&quot;):\n    # 1. 用 surrogate 构造残差和终端 defect\n    epsilon = residual_of_surrogate(pde, u_hat)          # ∂t u_hat + L u_hat + F(...)\n    g_breve = lambda y: pde.terminal(y) - u_hat(pde.T, y)\n\n    # 2. 定义结构保持 defect PDE 的非线性项\n    def F_breve(z, grad_z, t, y):\n        return (\n            F(u_hat(t, y) + z, grad(u_hat, t, y) + grad_z)\n            - F(u_hat(t, y), grad(u_hat, t, y))\n            + epsilon(t, y)\n        )\n\n    # 3. 用 Multilevel Picard 递归估计 defect\n    def mlp_defect(t, y, level):\n        if level == 0:\n            return 0.0\n\n        terminal = average_over_paths(\n            g_breve(X_T) for X_T in sample_sde_paths(t, y, pde.T, M**level)\n        )\n\n        correction = 0.0\n        for l in range(level):\n            for path in sample_sde_paths(t, y, random_time=True, count=M**(level-l)):\n                z_l = mlp_defect(path.time, path.state, l)\n                z_prev = mlp_defect(path.time, path.state, l - 1) if l &gt; 0 else 0.0\n                correction += path.weight * (F_breve(z_l) - F_breve(z_prev))\n\n        return terminal + correction\n\n    defect = mlp_defect(s, x, n)\n    return u_hat(s, x) + defect\n</code></pre>\n<h5>原始 PDE 与 surrogate 残差</h5>\n<p>论文关注 semi-linear parabolic PDE：</p>\n<div class=\"kb-math kb-math-display\">\\begin{cases}\n\\partial_r u(r,\\mathbf{y})+\\mathcal{L}u(r,\\mathbf{y})\n+F\\left(u(r,\\mathbf{y}),\\sigma^\\top\\nabla_{\\mathbf{y}}u(r,\\mathbf{y})\\right)=0,\\\\\nu(T,\\mathbf{y})=g(\\mathbf{y}),\n\\end{cases}</div>\n<p>其中</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}u\n=\\langle\\mu,\\nabla u\\rangle\n+\\frac{1}{2}\\mathrm{Tr}\\left(\\sigma^\\top \\mathrm{Hess}(u)\\sigma\\right)</div>\n<p>是二阶线性微分算子。普通 PINN 或 GP surrogate 给出近似解 <span class=\"kb-math kb-math-inline\">\\hat{u}</span>，但直接使用 <span class=\"kb-math kb-math-inline\">\\hat{u}</span> 会继承训练误差和模型偏差。SCaSML 不重训模型，而是计算 surrogate 代入 PDE 后的残差：</p>\n<div class=\"kb-math kb-math-display\">\\epsilon(r,\\mathbf{y})\n:=\\partial_r\\hat{u}\n+\\mathcal{L}\\hat{u}\n+F\\left(\\hat{u},\\sigma^\\top\\nabla_{\\mathbf{y}}\\hat{u}\\right)</div>\n<p>以及终端条件上的缺陷：</p>\n<div class=\"kb-math kb-math-display\">\\breve{g}(\\mathbf{y})=g(\\mathbf{y})-\\hat{u}(T,\\mathbf{y})</div>\n<h5>结构保持缺陷定律</h5>\n<p>定义真实误差：</p>\n<div class=\"kb-math kb-math-display\">\\breve{u}(r,\\mathbf{y}) := u(r,\\mathbf{y})-\\hat{u}(r,\\mathbf{y})</div>\n<p>将原 PDE 与 surrogate 残差相减，可以得到 defect 自身满足的 PDE：</p>\n<div class=\"kb-math kb-math-display\">\\begin{cases}\n\\partial_r \\breve{u}+\\mathcal{L}\\breve{u}\n+\\breve{F}\\left(\\breve{u},\\sigma^\\top\\nabla_{\\mathbf{y}}\\breve{u}\\right)=0,\\\\\n\\breve{u}(T,\\mathbf{y})=\\breve{g}(\\mathbf{y}),\n\\end{cases}</div>\n<p>其中</p>\n<div class=\"kb-math kb-math-display\">\\breve{F}\\left(\\breve{u},\\sigma^\\top\\nabla\\breve{u}\\right)\n=F\\left(\\hat{u}+\\breve{u},\n\\sigma^\\top(\\nabla\\hat{u}+\\nabla\\breve{u})\\right)\n-F\\left(\\hat{u},\\sigma^\\top\\nabla\\hat{u}\\right)\n+\\epsilon</div>\n<p>这就是论文所谓的 <code>Structural-preserving Law of Defect</code>。它的关键在于：缺陷方程仍是 semi-linear parabolic PDE，因此可继续使用高维随机 PDE 求解器，而不是退化成必须网格化全空间的有限元/有限差分校正。</p>\n<h5>为什么用 Monte Carlo/MLP</h5>\n<p>对于线性情形，defect 可由 Feynman-Kac 表示：</p>\n<div class=\"kb-math kb-math-display\">\\breve{u}(s,x)\n=\\mathbb{E}\\left[\n\\breve{g}(X_T^{s,x})\n+\\int_s^T \\epsilon(t,X_t^{s,x})\\,dt\n\\right]</div>\n<p>半线性情形中还需要处理非线性项 <span class=\"kb-math kb-math-inline\">\\breve{F}</span> 及梯度项，论文采用 Feynman-Kac 与 Bismut-Elworthy-Li 表示，把 <span class=\"kb-math kb-math-inline\">(\\breve{u},\\sigma^\\top\\nabla\\breve{u})</span> 看成一个固定点：</p>\n<div class=\"kb-math kb-math-display\">\\breve{\\mathbf{u}}^\\infty\n=\\Phi\\left(\\breve{\\mathbf{u}}^\\infty\\right)</div>\n<p>标准 Picard 迭代是 <span class=\"kb-math kb-math-inline\">\\breve{\\mathbf{u}}_{k+1}=\\Phi(\\breve{\\mathbf{u}}_k)</span>。MLP 的改进是使用 multilevel Monte Carlo 的 telescoping 结构：</p>\n<div class=\"kb-math kb-math-display\">\\mathbb{E}[\\breve{\\mathbf{u}}_n]\n=\\mathbb{E}[\\Phi(\\breve{\\mathbf{u}}_0)]\n+\\sum_{l=1}^{n-1}\n\\mathbb{E}\\left[\n\\Phi(\\breve{\\mathbf{u}}_l)-\\Phi(\\breve{\\mathbf{u}}_{l-1})\n\\right]</div>\n<p>这样低层级用更多样本、细层级用较少样本，降低方差和计算量。Full-history MLP 通过随机采样时间处理积分；Quadrature MLP 用 Gauss-Legendre 节点和权重处理时间积分。</p>\n<h5>误差界与直觉</h5>\n<p>SCaSML 的理论亮点是乘积型误差界。论文给出的全局 <span class=\"kb-math kb-math-inline\">L^2</span> bound 可概括为：</p>\n<div class=\"kb-math kb-math-display\">\\sup_{(t,\\mathbf{x})}\n\\left\\|\n\\breve{\\mathbf{U}}_{N,M}(t,\\mathbf{x})\n-\\breve{\\mathbf{u}}(t,\\mathbf{x})\n\\right\\|_{L^2}\n\\le\nE(M,N)\\cdot C_F e(\\hat{u})</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">E(M,N)</span> 是底层 MLP solver 的误差项，<span class=\"kb-math kb-math-inline\">e(\\hat{u})</span> 是 surrogate 误差。直觉是：surrogate 越准，残差 <span class=\"kb-math kb-math-inline\">\\epsilon</span>、终端 defect <span class=\"kb-math kb-math-inline\">\\breve{g}</span> 和 <span class=\"kb-math kb-math-inline\">\\breve{F}</span> 的尺度越小，Monte Carlo 估计 defect 的方差也越小。</p>\n<p>如果 surrogate 用 <span class=\"kb-math kb-math-inline\">m</span> 个训练点达到 <span class=\"kb-math kb-math-inline\">e(\\hat{u})\\sim m^{-\\gamma}</span>，则 residual 量级也随之下降；再在推理时平均 <span class=\"kb-math kb-math-inline\">m</span> 条 Monte Carlo 路径，统计误差可写为：</p>\n<div class=\"kb-math kb-math-display\">\\sqrt{\\frac{m^{-2\\gamma}}{m}}\n=m^{-\\gamma-\\frac{1}{2}}</div>\n<p>这比单独 surrogate 的 <span class=\"kb-math kb-math-inline\">m^{-\\gamma}</span> 和普通 Monte Carlo 的 <span class=\"kb-math kb-math-inline\">m^{-1/2}</span> 都更快。注意这不是“免费提升”：SCaSML 用额外 inference compute 换取目标查询点精度，而不是提升整个函数域上的 surrogate。</p>\n<h5>与 PINN 的关系</h5>\n<p>PINN 通常在训练阶段通过 PDE residual loss 让 <span class=\"kb-math kb-math-inline\">\\hat{u}</span> 尽量满足方程：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\mathrm{PINN}}\n=\\mathcal{L}_{\\mathrm{data}}\n+\\lambda_f\n\\frac{1}{N_f}\\sum_{i=1}^{N_f}\n\\left\\|\n\\partial_t\\hat{u}(t_i,x_i)\n+\\mathcal{N}[\\hat{u}](t_i,x_i)\n\\right\\|^2</div>\n<p>SCaSML 并不替代 PINN，而是把 PINN 当作第一阶段 surrogate。PINN 给出低成本、全域可查询的近似；SCaSML 在用户真正需要高精度的点上运行 defect simulation，把剩余偏差作为一个物理方程再求一次。</p>\n<div class=\"key-point\">💡 关键：SCaSML 的“推理阶段缺陷定律误差修正”本质上是把黑盒 surrogate 的误差重新物理化，使它变成可仿真的 PDE 对象。</div>",
      "quiz": {
        "q": "SCaSML 的结构保持缺陷定律主要用于什么？",
        "options": [
          "在训练前随机初始化 PINN 参数",
          "把 surrogate 的误差 u - u_hat 表示为一个仍可用随机仿真求解的 PDE",
          "把所有高维 PDE 降维成一维 ODE",
          "用更深的网络替代 Monte Carlo 求解器"
        ],
        "answer": 1,
        "explain": "SCaSML 的核心是推导 defect PDE，并用 MLP/Feynman-Kac 类随机仿真估计该误差，再将其加回 surrogate 输出。"
      }
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
      "summary": "Mollifier Layers 提出在网络输出端加入解析 mollifier 卷积层，用平滑积分和解析核导数替代递归自动微分来计算高阶 PDE 导数，从而提升噪声逆问题中的导数稳定性、参数反演精度和训练/显存效率。",
      "keyPoints": [
        "<strong>替代递归 autodiff</strong>：高阶导数不再通过多次反向传播链式求导，而是由网络输出与解析 mollifier 导数核卷积得到",
        "<strong>架构无关插件</strong>：Mollifier Layer 接在输出层之后，可用于 PINN、PirateNet 等 PhiML 架构，不要求重写主干网络",
        "<strong>弱形式直觉</strong>：借鉴有限元弱形式，用光滑测试函数积分推断导数，避免在噪声点上做不稳定的点态高阶微分",
        "<strong>核心表示</strong>：基础网络预测 <span class=\"kb-math kb-math-inline\">\\hat{g}</span>，mollifier 层给出 <span class=\"kb-math kb-math-inline\">\\hat{u}=\\hat{g}*\\eta</span> 和 <span class=\"kb-math kb-math-inline\">\\partial_j^k\\hat{u}=\\hat{g}*\\partial_j^k\\eta</span>",
        "<strong>三类收益</strong>：计算效率、导数与网络深度解耦、局部平滑带来的噪声鲁棒性",
        "<strong>逆问题覆盖</strong>：在 1D Langevin、2D heat、2D reaction-diffusion 等一阶、二阶、四阶 PDE 上验证参数恢复",
        "<strong>生物物理应用</strong>：用于从 STORM 超分辨率染色质图像中反演空间变化的 epigenetic reaction rates",
        "<strong>来源追溯</strong>：任务给定 arXiv <code>2601.mollifier</code> 未能对应可访问论文；实际论文为 arXiv <code>2505.11682</code>，OpenReview <code>6mFVZSzyev</code> 显示 TMLR 2026 接收"
      ],
      "detail": "<h5>核心架构示意</h5>\n<p><img alt=\"Mollifier Layers architecture\" src=\"https://arxiv.org/html/2505.11682v1/extracted/6447334/figures/Fig1_new.png\" />\n<em>图：Mollifier Layers 的动机和架构。图中对比了 autodiff 在高阶导数、训练时间和噪声参数恢复中的局限，并展示了用 mollifier convolution 替代 autodiff derivative 的 PhiML+Mollifier 结构。</em></p>\n<p>可访问来源说明：论文 arXiv 页面为 https://arxiv.org/abs/2505.11682 ，OpenReview 页面为 https://openreview.net/forum?id=6mFVZSzyev ，宾夕法尼亚大学新闻稿为 https://www.seas.upenn.edu/stories/ai-method-tackles-one-of-sciences-hardest-math-problems/ 。正文保留 YAML 中的原始 <code>paper_url</code>，但方法解读基于上述可访问来源。</p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># Mollifier Layers 训练伪代码\n# 输入: 观测 u_data, PDE 算子 D, 未知参数 λ(t, x), mollifier kernel η\n# 输出: 反演参数 λ_hat 和满足 PDE 的平滑解 u_hat\n\nkernel = build_compact_mollifier(support=U, order=&quot;C_infinity&quot;)\nderivative_kernels = {\n    &quot;t&quot;: analytic_derivative(kernel, axis=&quot;t&quot;, order=1),\n    &quot;x&quot;: analytic_derivative(kernel, axis=&quot;x&quot;, order=1),\n    &quot;xx&quot;: analytic_derivative(kernel, axis=&quot;x&quot;, order=2),\n    &quot;xxxx&quot;: analytic_derivative(kernel, axis=&quot;x&quot;, order=4),\n}\n\nfor batch in collocation_grid:\n    # 1. 主干网络不直接输出 u，而输出待平滑的 g\n    g_hat, lambda_hat = backbone(batch.t, batch.x)\n\n    # 2. Mollifier Layer 在输出端执行局部积分/卷积\n    u_hat = conv(g_hat, kernel)\n    u_t = conv(g_hat, derivative_kernels[&quot;t&quot;])\n    u_xx = conv(g_hat, derivative_kernels[&quot;xx&quot;])\n\n    # 3. 用卷积导数构造 PDE residual，而不是 recursive autodiff\n    f_hat = u_t + D(u_hat, u_xx, lambda_hat)\n\n    data_loss = mean((u_hat[observed] - u_data) ** 2)\n    pde_loss = mean(f_hat ** 2)\n    loss = data_loss + pde_loss\n\n    loss.backward()      # 只对网络参数和可学习参数反传；导数核固定解析\n    optimizer.step()\n</code></pre>\n<h5>标准 PhiML 参数反演</h5>\n<p>论文先用一般 PDE 表示逆问题：</p>\n<div class=\"kb-math kb-math-display\">u_t+D[u,\\lambda]=0,\\qquad x\\in\\Omega,\\quad t\\in T</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">u(t,x)</span> 是观测或待拟合的解，<span class=\"kb-math kb-math-inline\">\\lambda(t,x)</span> 是要反演的时空变化参数，<span class=\"kb-math kb-math-inline\">D[\\cdot;\\lambda]</span> 是线性或非线性 PDE 算子。传统 PhiML/PINN 用网络 <span class=\"kb-math kb-math-inline\">\\hat{u}_\\theta(t,x)</span> 和 <span class=\"kb-math kb-math-inline\">\\hat{\\lambda}_\\theta(t,x)</span> 表示解与参数，并通过 autodiff 计算 PDE residual：</p>\n<div class=\"kb-math kb-math-display\">\\hat{f}\n=\\hat{u}_t+D[\\hat{u},\\hat{\\lambda}]</div>\n<p>总损失为：</p>\n<div class=\"kb-math kb-math-display\">\\mathrm{MSE}_{\\mathrm{total}}\n=\\mathrm{MSE}_u+\\mathrm{MSE}_f</div>\n<div class=\"kb-math kb-math-display\">\\mathrm{MSE}_u\n=\\frac{1}{N_u}\\sum_{i=1}^{N_u}\n\\left|\\hat{u}(t^i,x^i)-u(t^i,x^i)\\right|^2</div>\n<div class=\"kb-math kb-math-display\">\\mathrm{MSE}_f\n=\\frac{1}{N_f}\\sum_{j=1}^{N_f}\n\\left|\\hat{f}(t^j,x^j,\\lambda^j)\\right|^2</div>\n<p>问题在于，高阶 PDE 需要递归计算 <span class=\"kb-math kb-math-inline\">\\partial_x^2\\hat{u}</span>、<span class=\"kb-math kb-math-inline\">\\partial_x^4\\hat{u}</span> 等导数；每多一阶导数都要保留更多计算图和中间梯度，导致显存、时间和数值噪声问题。</p>\n<h5>Mollifier Layer 的核心公式</h5>\n<p>Mollifier Layers 不让主干网络直接输出 <span class=\"kb-math kb-math-inline\">\\hat{u}</span>，而是输出 <span class=\"kb-math kb-math-inline\">\\hat{g}</span>。输出端用 mollifying function <span class=\"kb-math kb-math-inline\">\\eta</span> 做卷积：</p>\n<div class=\"kb-math kb-math-display\">\\hat{u}(n)\n=\\hat{g}*\\eta(n)\n=\\int_{m\\in U}\\hat{g}(m)\\eta(n-m)\\,dm</div>\n<p>对任意变量 <span class=\"kb-math kb-math-inline\">j</span> 的导数，由解析核导数给出：</p>\n<div class=\"kb-math kb-math-display\">\\hat{u}_{j}(n)\n=\\hat{g}*\\eta_j(n)\n=\\int_{m\\in U}\\hat{g}(m)\\eta_j(n-m)\\,dm</div>\n<div class=\"kb-math kb-math-display\">\\hat{u}_{jj}(n)\n=\\hat{g}*\\eta_{jj}(n),\\qquad\n\\hat{u}_{jjjj}(n)\n=\\hat{g}*\\eta_{jjjj}(n)</div>\n<p>这相当于把“对神经网络递归求导”改成“对固定解析核求导，再与网络输出卷积”。因此高阶导数的计算成本不随网络深度成倍增加，而主要由卷积核支持域和网格分辨率决定。</p>\n<h5>为什么 mollifier 能抗噪</h5>\n<p>论文要求 mollifier <span class=\"kb-math kb-math-inline\">\\eta</span> 具备三类性质：</p>\n<ul>\n<li><strong>无限可微</strong>：<span class=\"kb-math kb-math-inline\">\\eta\\in C^\\infty</span>，可以解析生成任意阶导数核</li>\n<li><strong>紧支撑</strong>：<span class=\"kb-math kb-math-inline\">\\eta(m)=0</span> for <span class=\"kb-math kb-math-inline\">m\\notin U</span>，卷积只在局部窗口内发生</li>\n<li><strong>非负性</strong>：作为局部平均核，减少振荡核带来的抵消误差</li>\n</ul>\n<p>一致性界给出更直接的直觉。设真实场 <span class=\"kb-math kb-math-inline\">u\\in C^1([0,1])</span> 是 <span class=\"kb-math kb-math-inline\">L</span>-Lipschitz，有噪声网格样本 <span class=\"kb-math kb-math-inline\">g_j=u(x_j)+n_j</span>，且 <span class=\"kb-math kb-math-inline\">|n_j|\\le\\varepsilon</span>。令 <span class=\"kb-math kb-math-inline\">\\eta_\\delta(r)=\\delta^{-1}\\eta(r/\\delta)</span>，<span class=\"kb-math kb-math-inline\">J_\\delta g=\\eta_\\delta*g</span>，则论文给出：</p>\n<div class=\"kb-math kb-math-display\">\\left\\|D_0(J_\\delta g)-u&#x27;\\right\\|_\\infty\n\\le\nC_1\\delta+C_2(h+\\varepsilon)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">D_0g_j=(g_{j+1}-g_{j-1})/(2h)</span>。这说明误差由平滑偏差、离散化误差和噪声共同决定。支撑半径 <span class=\"kb-math kb-math-inline\">\\delta</span> 过大会过度平滑，过小会放大噪声，因此 kernel shape 与 support 是关键超参数。</p>\n<h5>逆参数估计机制</h5>\n<p>对于形式为</p>\n<div class=\"kb-math kb-math-display\">u_t-\\lambda D[u]=0</div>\n<p>的可分离参数问题，论文还使用一种直接参数恢复策略：</p>\n<div class=\"kb-math kb-math-display\">\\hat{\\lambda}_{\\mathrm{final}}\n=\\frac{\\hat{u}_t}{D[\\hat{u}]}</div>\n<p>这里 <span class=\"kb-math kb-math-inline\">\\hat{u}_t</span> 和 <span class=\"kb-math kb-math-inline\">D[\\hat{u}]</span> 都可由 mollifier convolution 计算。这样做的动机是：<span class=\"kb-math kb-math-inline\">\\hat{u}</span> 通过数据项 <span class=\"kb-math kb-math-inline\">\\mathrm{MSE}_u</span> 捕获观测变化，mollifier 再稳定地恢复导数，因此比让网络直接输出高频 <span class=\"kb-math kb-math-inline\">\\lambda(t,x)</span> 更容易处理时空变化和噪声。</p>\n<h5>三个 PDE 基准</h5>\n<p>论文用从低阶到高阶的任务检验该层是否真正提升逆问题：</p>\n<ul>\n<li><strong>1D Langevin</strong>：简化为 <span class=\"kb-math kb-math-inline\">u_t=u+\\lambda(t)</span>，考察时间变化或带噪 forcing term 的恢复</li>\n<li><strong>2D Heat</strong>：<span class=\"kb-math kb-math-inline\">0=\\lambda(x,y)\\nabla^2u+m(x,y)</span>，从稀疏温度场和已知 source 恢复空间变化热扩散率</li>\n<li><strong>2D Reaction-Diffusion</strong>：染色质相场模型中 <span class=\"kb-math kb-math-inline\">\\partial_t\\phi_d=\\nabla^2\\mu_d+2(\\lambda\\phi_e-\\phi_h)</span>，由于 <span class=\"kb-math kb-math-inline\">\\mu_d\\propto\\nabla^2\\phi_d</span>，整体形成四阶 PDE</li>\n</ul>\n<p>这些任务共同测试了高阶导数、噪声、空间异质性和真实图像数据。论文讨论部分报告：通过把递归高阶 autodiff 压缩为单个解析卷积，Mollifier Layers 在实验中将显存和训练时间降低约 6-10x，同时保持更稳定的高阶导数估计。</p>\n<h5>与 PINN/gPINN 的区别</h5>\n<p>PINN 的核心是把 PDE residual 加入损失；gPINN 进一步加入 residual 的梯度约束。但它们仍然依赖 autodiff 产生导数。Mollifier Layers 改变的是“导数生成器”：PDE residual 仍然存在，训练目标仍是 <span class=\"kb-math kb-math-inline\">\\mathrm{MSE}_u+\\mathrm{MSE}_f</span>，只是 <span class=\"kb-math kb-math-inline\">\\hat{f}</span> 中的 <span class=\"kb-math kb-math-inline\">\\hat{u}_t,\\nabla^2\\hat{u},\\nabla^4\\hat{u}</span> 来自输出卷积而不是递归求导。</p>\n<div class=\"warn-box\">⚠️ 注意：mollifier 并不是万能滤波器。它会引入平滑偏差，边界和各向异性网格也需要特殊处理。论文把自适应/可学习 kernel、boundary-aware formulation 和 adaptive mesh validation 列为后续方向。</div>",
      "quiz": {
        "q": "Mollifier Layers 相比传统 PINN 自动微分的核心变化是什么？",
        "options": [
          "删除 PDE residual，只训练数据拟合项",
          "让网络输出经过紧支撑平滑核卷积，并用解析核导数计算高阶导数",
          "把所有 PDE 都转换成 Transformer 语言模型任务",
          "只在二维规则网格上使用有限差分"
        ],
        "answer": 1,
        "explain": "Mollifier Layers 保留 PhiML/PINN 的残差训练框架，但把导数计算从 recursive autodiff 换成输出端解析 mollifier convolution，因此更省显存且对噪声更稳定。"
      }
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
