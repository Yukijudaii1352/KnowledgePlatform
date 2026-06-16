/**
 * ml_platform-data.js — 由 pipeline/build.py 于 2026-06-16 17:00:15 自动生成。
 * 源文件：content/infra/ml_platform.md
 * ⚠️  请勿手动修改；如需更新，修改源文档后重新编译。
 */
window.PAGE_CONFIG = {
  "meta": {
    "domain": "infra",
    "topic_id": "ml_platform",
    "topic_name": "机器学习平台",
    "page_title": "机器学习平台技术演进",
    "page_subtitle": "2026-06-16 版",
    "page_desc": "回顾从Parameter Server到万卡训练、从TFX到智能MLOps的技术演进，系统梳理机器学习平台从分布式训练到全生命周期治理的发展历程。",
    "page_icon": "⚙️",
    "hero_pills": [
      "🏷️ 训练平台 · 实验管理 · MLOps · 推理优化"
    ],
    "count_pill": "{count} 个系统",
    "image_base": "",
    "overview_from_doc": true,
    "latest_overview_from_doc": true
  },
  "overview": [
    {
      "title": "",
      "body_html": "<h1>Efficient Training of Large Language Models on Distributed Infrastructures: A Survey(AI Infra 综述)</h1>\n<ul>\n<li>来源平台: <strong>zhihu</strong>（知乎专栏文章）</li>\n<li>原文链接: <a href=\"https://zhuanlan.zhihu.com/p/1978979978625439559\">https://zhuanlan.zhihu.com/p/1978979978625439559</a></li>\n<li>作者: Orzjh</li>\n</ul>\n<hr />\n<p>Efficient Training of Large Language Models on Distributed Infrastructures: A Survey(AI Infra 综述)</p>\n<h1>Efficient Training of Large Language Models on Distributed Infrastructures: A Survey(AI Infra 综述)</h1>\n<p>作者: Orzjh, 赞: 2</p>\n<p><strong>AI Infra 综述</strong></p>\n<p>Efficient Training of Large Language Models on Distributed Infrastructures: A Survey</p>\n<p><strong>参考资料</strong></p>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2407.20018\">HTTPS://arxiv.org/abs/2407.20018</a></p>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//github.com/Relaxed-System-Lab/HKUST-COMP6211J-2025fall\">HTTPS://GitHub.com/Relaxed-System-Lab/HKUST-COMP6211J-2025fall</a></p>\n<p><strong>1 LLM 训练的问题</strong></p>\n<p>主要优化这三个问题：<strong>可扩展性 Scalablity、效率 Efficiency 和可靠性 Reliability</strong></p>\n<p><img alt=\"\" src=\"https://pica.zhimg.com/v2-5c1ba09e76c6743f59c37af7a9630b74_1440w.jpg\" /></p>\n<p><strong>点击图片可查看完整电子表格</strong></p>\n<p><strong>2 综述架构</strong></p>\n<p><img alt=\"\" src=\"https://pic2.zhimg.com/v2-05cf1845125fef8536b370818e76fc37_1440w.jpg\" /></p>\n<p><strong>3 大型语言模型训练基础设施 INFRASTRUCTURE FOR LLM TRAINING</strong></p>\n<p><img alt=\"\" src=\"https://pic4.zhimg.com/v2-f05749f7a6fcb50dfc953ff1f1d7bc93_1440w.jpg\" /></p>\n<p>调度系统 (Scheduling System) 将训练任务分配到各计算节点 (Compute Node)，计算节点 (Compute Node) 通过前端网络 (Frontend Network) 从训练数据集存储 (Training Dataset Storage) 读取数据并执行前向/反向计算与梯度生成，训练阶段的梯度与参数同步等集体通信经由后端网络 (Backend Network) 完成，同时模型状态定期写入检查点存储 (Checkpoint Storage) 以便容错机制 (Fault Tolerance) 的异常检测 (Anomaly Detection) 与故障恢复 (Failure Recover) 在发生故障时用最新检查点快速重启并继续训练。</p>\n<ul>\n<li><strong>计算节点 (Compute Node):</strong></li>\n<li><strong>作用:</strong> 这是执行模型训练计算的核心单元。每个节点通常包含多个高性能 AI 加速器（如 GPU），负责处理分配到的数据批次，执行模型的前向传播和反向传播，并计算梯度。</li>\n<li><strong>后端网络 (Backend Network):</strong></li>\n<li><strong>作用:</strong> 这是一个专用的、高带宽、低延迟的网络，仅用于连接各个计算节点。它主要承载训练过程中产生的高频、密集的<strong>训练流量</strong>，如在数据并行或张量并行中同步模型梯度和参数的 AllReduce 等集体通信操作。</li>\n<li><strong>前端网络 (Frontend Network):</strong></li>\n<li>\n<p><strong>作用:</strong> 这是一个通用的网络，负责处理除高频训练流量之外的所有其他通信。它主要承载两类流量：</p>\n</li>\n<li>\n<p><strong>管理流量 (Management Traffic):</strong> 用于作业调度、系统监控、节点管理等控制信令。</p>\n</li>\n<li>\n<p><strong>存储流量 (Storage Traffic):</strong> 用于计算节点从存储系统读取训练数据，以及将模型检查点写入存储系统。</p>\n</li>\n<li>\n<p><strong>训练数据集存储 (Training Dataset Storage):</strong></p>\n</li>\n<li><strong>作用:</strong> 负责存放用于模型预训练的、通常规模高达 TB 甚至 PB 级的海量数据集。在训练过程中，计算节点通过前端网络从这里分批读取数据。</li>\n<li><strong>检查点存储 (Checkpoint Storage):</strong></li>\n<li><strong>作用:</strong> 用于在训练过程中定期保存模型的完整状态（包括模型参数、优化器状态等）。这是容错的关键，一旦训练因故中断，可以从最新的检查点恢复，避免从头开始，从而节省大量的计算资源和时间。</li>\n<li><strong>调度系统 (Scheduling System):</strong></li>\n<li><strong>作用:</strong> 作为整个集群的“大脑”，负责管理和分配计算资源。它接收用户的训练任务，决定将任务分配给哪些计算节点，并优化整个集群的资源利用率和任务执行效率。</li>\n<li><strong>容错机制 (Fault Tolerance):</strong></li>\n<li><strong>作用:</strong> 由于大模型训练周期极长（数周甚至数月），硬件或软件故障几乎不可避免。该机制旨在确保训练过程的稳定性和可靠性。</li>\n<li><strong>异常检测 (Anomaly Detection):</strong> 持续监控系统中的硬件（GPU、网络）、软件和训练指标，以及时发现任何可能导致训练中断或效率下降的异常情况。</li>\n<li><strong>故障恢复 (Failure Recover):</strong> 在检测到故障后，采取措施恢复训练。最常见的方式是利用“检查点存储”中保存的最新检查点，在修复或替换故障节点后重新启动训练任务。</li>\n</ul>\n<p><strong>3.1 AI 加速器</strong></p>\n<p>训练大型语言模型（LLM）的性能，很大程度上依赖于 GPU 等 AI 加速器的发展。</p>\n<ol>\n<li><strong>NVIDIA GPU（英伟达图形处理器）</strong></li>\n</ol>\n<p>NVIDIA GPU 是当前训练大模型最核心的硬件，其关键优势在于强大的<strong>并行计算</strong>能力。</p>\n<ul>\n<li><strong>核心设计</strong>：GPU 内部集成成千上万个高效的小核心，能同时处理海量任务，这种结构天然适合大模型训练中密集的<strong>矩阵运算</strong>。</li>\n<li><strong>关键技术特性</strong>：</li>\n<li><strong>多种数值精度</strong>：支持 FP16、FP8 等不同精度的格式，允许开发者在训练<strong>速度与精度</strong>之间做权衡，提升效率。</li>\n<li><strong>CUDA 编程环境</strong>：让开发者可以方便地调用和管理 GPU 的并行算力。</li>\n<li><strong>高带宽内存（HBM）</strong>：配备速度极快的专用内存，为 GPU 核心高速输送数据，避免计算单元“挨饿”。</li>\n<li>\n<p><strong>专用计算单元</strong>：最新的 GPU 架构（如 Hopper）内置了 <strong>Tensor Core（张量核心）</strong>，特别是其 <strong>Transformer 引擎</strong>，可以通过混合使用 FP8 和 FP16 等低精度格式，专门加速 Transformer 架构模型的训练。</p>\n</li>\n<li>\n<p><strong>其他 AI 加速器</strong></p>\n</li>\n</ul>\n<p>除了 NVIDIA，<strong>AMD GPU</strong> 等其他 AI 加速器也逐渐成为分布式训练的可行选择，并已在一些世界顶级的超级计算机上部署使用。</p>\n<p><strong>3.2 数据通信</strong></p>\n<p>在大型语言模型（LLM）训练中，<strong>通信开销</strong>是一个巨大的瓶颈，有时甚至超过 90% 的时间都花在数据传输上。因此，优化网络至关重要。</p>\n<p>这部分可以从四个层面来理解：</p>\n<ol>\n<li><strong>服务器内部通信 (Chip-to-Chip)</strong></li>\n</ol>\n<p>这指的是<strong>一台服务器内部，各个 GPU 芯片之间</strong>如何通信。</p>\n<ul>\n<li><strong>传统方式 (PCIe)</strong>：类似电脑主板上的通用接口，虽然不断升级，但其带宽和延迟已无法满足多 GPU 间海量数据交换的需求。</li>\n<li><strong>专用高速互联 (如 NVLink)</strong>：由 NVIDIA 等厂商推出的专用技术，为 GPU 之间提供极高带宽、极低延迟的“高速公路”。</li>\n<li>NVIDIA 使用 <strong>NVSwitch</strong> 芯片，可以实现所有 GPU 之间的“全连接”，带宽高。</li>\n<li>\n<p>Google 的 TPU 则采用 <strong>Torus (环网)</strong>拓扑，将芯片连接成一个环状网格，通信效率也很高。</p>\n</li>\n<li>\n<p><strong>服务器之间通信 (Node-to-Node)</strong></p>\n</li>\n</ul>\n<p>这指的是<strong>不同服务器（节点）之间</strong>如何通信。</p>\n<ul>\n<li><strong>核心技术 (RDMA)</strong>：全称是“远程直接内存访问”。它允许一个节点的 GPU 直接读写另一个节点 GPU 的内存，无需经过 CPU 和操作系统，极大降低了延迟。<strong>GPUDirect-RDMA</strong> 是其在 GPU 上的专属应用。</li>\n<li><strong>两种主流方案</strong>：</li>\n<li><strong>InfiniBand (IB)</strong>：一种专为高性能计算设计的网络技术，速度极快，但需要专用的交换机和网卡，成本高。</li>\n<li>\n<p><strong>RoCE</strong>：在普通以太网上传输 RDMA 数据，成本更低，部署更灵活，是目前大型数据中心的主流选择之一。</p>\n</li>\n<li>\n<p><strong>网络拓扑结构 (Network Topology)</strong></p>\n</li>\n</ul>\n<p>这指的是<strong>整个计算集群中，所有服务器是如何连接</strong>的物理“蓝图”。</p>\n<ul>\n<li><strong>传统通用结构 (Fat-Tree/Clos)</strong>：一种像“胖树”一样的分层结构，确保集群中任意两点之间都有充足的带宽，是目前最广泛使用的拓扑。</li>\n<li><strong>训练优化结构 (Rail-Optimized)</strong>：专门为 AI 训练的通信模式设计的拓扑。它将具有特定通信模式的 GPU 组连接到一起，减少了不必要的网络拥塞，提升了集体通信的效率。</li>\n<li>\n<p><strong>可重构拓扑 (Reconfigurable Topology)</strong>：一种更先进的动态网络。它利用<strong>光交换机 (OCS)</strong> 等技术，可以根据训练任务的需要，实时改变网络的连接方式，实现最优的数据流路径。</p>\n</li>\n<li>\n<p><strong>负载均衡与拥塞控制</strong></p>\n</li>\n</ul>\n<p>这指的是如何<strong>管理网络流量，避免“堵车”</strong>。</p>\n<ul>\n<li><strong>负载均衡</strong>：LLM 训练的流量特点是存在少数“大象流”（持续的大流量）。传统的负载均衡方法（ECMP）容易将多个“大象流”分到同一条路径上造成拥堵。新的策略通过将一个大流拆分成多个小流，或更智能地规划路径来解决此问题。</li>\n<li><strong>拥塞控制</strong>：当网络拥堵发生时，需要有机制来缓解。传统方法（PFC）虽然能保证不丢包，但容易造成“队头阻塞”。新的拥塞控制算法能更智能地感知拥堵并动态调整数据发送速率，有的甚至能<strong>识别出训练中更重要的数据（如模型后几层的梯度），在拥堵时优先传输它们</strong>。</li>\n</ul>\n<p><strong>3.3 存储</strong></p>\n<p>存储系统是大型语言模型（LLM）训练的基石，主要应对两大挑战：<strong>保存模型断点</strong>和<strong>读取训练数据</strong>。</p>\n<ol>\n<li>\n<p><strong>模型检查点（Checkpoint）的存储</strong></p>\n</li>\n<li>\n<p><strong>挑战</strong>：大模型的检查点文件非常巨大（例如，一个 70B 模型的检查点大小接近 1TB）。在训练过程中频繁保存检查点，对存储系统的<strong>写入带宽</strong>要求极高。</p>\n</li>\n<li><strong>解决方案</strong>：</li>\n<li><strong>分布式文件系统</strong>：如 Meta 的 Tectonic 或常用的 HDFS。它们能让成千上万个 GPU 同时读写检查点。一种常见的优化是：让一个节点先从主存储读取检查点，然后在计算集群内部广播给其他节点，以减轻主存储的压力。</li>\n<li>\n<p><strong>分布式对象存储</strong>：如 Ceph。由于其架构更简单，没有复杂的目录结构，因此<strong>扩展性更好</strong>，也成为存储检查点的流行选择。</p>\n</li>\n<li>\n<p><strong>训练数据的存储</strong></p>\n</li>\n<li>\n<p><strong>挑战</strong>：训练数据量更加庞大，原始数据在经过清洗、去重等预处理后，总量可达 <strong>PB 级别</strong>（1 PB = 1024 TB）。训练时，必须确保数据能被高速读取，以免 GPU 算力闲置等待。</p>\n</li>\n<li><strong>解决方案（分层存储架构）</strong>：</li>\n<li><strong>底层持久化存储</strong>：通常使用专为高性能计算设计的<strong>并行文件系统</strong>（如 Lustre、GPFS）。它们负责海量数据的可靠存放，并提供高吞吐量的读写能力。</li>\n<li><strong>上层缓存加速</strong>：在训练节点和底层存储之间，增加一个高速缓存层（如使用 Alluxio、JuiceFS 等系统）。它的作用是<strong>预先读取（Prefetch）训练将要用到的数据，并存放在高速缓存中。这样，GPU 在训练时可以直接从缓存层极速获取数据，有效避免 I/O 瓶颈</strong>。</li>\n</ol>\n<p><strong>3.4 调度安排</strong></p>\n<p>在大型 GPU 集群或云平台这种多用户共享的环境中，<strong>调度系统</strong>扮演着“交通指挥官”的角色，其核心目标是高效地分配和管理计算资源，确保各个训练任务顺利运行。</p>\n<p>调度系统可以分为两大类：</p>\n<ol>\n<li><strong>工作负载调度 (Workload Scheduling)</strong></li>\n</ol>\n<p>主要负责<strong>决定哪个 AI 训练任务（工作负载）在何时、分配到哪些 GPU 上运行</strong>。</p>\n<ul>\n<li>\n<p><strong>传统 AI 调度器</strong>：已有一些通用的 AI 任务调度器，它们具备一些高级功能，比如：</p>\n</li>\n<li>\n<p>能识别并优化利用不同型号的 GPU。</p>\n</li>\n<li>允许在单个 GPU 上运行多个小任务以提高利用率。</li>\n<li>\n<p>能动态调整任务使用的 GPU 数量。</p>\n</li>\n<li>\n<p><strong>专门针对 LLM 的调度器</strong>：由于 LLM 训练的独特性，通用调度器效果不佳。因此出现了专门的 LLM 调度器，它们更加“智能”，例如：</p>\n</li>\n<li><strong>理解 LLM 并行策略</strong>：能根据集群状态，动态调整一个任务是该用数据并行、张量并行还是流水线并行，以达到最高效率（如 Crius）。</li>\n<li>\n<p><strong>优化整个开发流程</strong>：不仅调度训练任务，还能高效安排超参数搜索、模型评估、故障诊断等一系列相关工作。一个巧妙的技巧是利用流水线并行中的“<strong>流水线气泡</strong>”（即 GPU 空闲时间）来穿插运行这些辅助任务（如 Hydro, Acme）。</p>\n</li>\n<li>\n<p><strong>资源调度 (Resource Scheduling)</strong></p>\n</li>\n</ul>\n<p>除了调度 GPU，还需协同调度<strong>与训练相关的其他资源</strong>，如网络、存储、CPU 等。</p>\n<ul>\n<li><strong>网络调度</strong>：通过错开不同训练任务的通信高峰期，来避免网络拥堵。</li>\n<li><strong>存储调度</strong>：将数据缓存也视为一种可调度资源，与计算任务协同分配，以提升数据读取效率。</li>\n<li><strong>CPU 和内存调度</strong>：更精细化地为训练任务分配 CPU 核心，而不是简单地按 GPU 数量分配。</li>\n<li><strong>能耗调度</strong>：关注能源效率，比如利用“流水线气泡”时间适当降低 GPU 运行频率来省电，或者自动寻找最节能的训练批次大小（batch size）和 GPU 功率上限。</li>\n</ul>\n<p><strong>4 并行方案 PARALLELISM SCHEMES FOR LLM TRAINING</strong></p>\n<p><img alt=\"\" src=\"https://pic1.zhimg.com/v2-54a38b7757fb820cee5277380ecfeda8_1440w.jpg\" /></p>\n<p>大语言模型（LLM）的规模越来越大，单台计算机的算力和内存已经无法满足训练需求。因此，必须使用大规模的计算机集群进行<strong>分布式训练 (Distributed Training)</strong>。本章节的核心就是探讨如何高效地组织这些计算机协同工作，即研究各种不同的<strong>并行化方案</strong>。</p>\n<p>文章将这些方案分为了三大类：</p>\n<ul>\n<li><strong>混合并行 (Hybrid Parallelism):</strong></li>\n<li><strong>是什么：</strong> 这是“<strong>手动挡</strong>”模式。由领域专家根据经验，将多种成熟的并行策略（如数据并行、张量并行、流水线并行等）像搭积木一样组合在一起，以期达到最佳的训练效果。</li>\n<li><strong>自动并行 (Auto Parallelism):</strong></li>\n<li><strong>是什么：</strong> 这是“<strong>自动挡</strong>”模式。系统会自动分析模型结构和硬件配置，从海量的可能性中找出最优的并行方案，大大降低了人工配置的复杂性。</li>\n<li><strong>异构并行 (Heterogeneous Parallelism):</strong></li>\n<li><strong>是什么：</strong> 这种方案专门处理“<strong>不统一</strong>”的场景。主要包括两种情况：</li>\n<li><strong>硬件异构：</strong> 训练集群里混合了不同型号的 AI 加速器（如新旧两代 GPU）。</li>\n<li><strong>模型异构：</strong> 训练任务本身就需要多个不同的模型协同工作，例如在 RLHF（基于人类反馈的强化学习）训练中。</li>\n</ul>\n<p>此外，文章还简要提及了实现这些并行方案的两种底层编程模型：<strong>SPMD (单程序多数据)</strong>，即所有处理器运行相同代码处理不同数据（更常见）；以及 <strong>MPMD (多程序多数据)</strong>，即不同处理器可以运行不同代码（如流水线并行）。</p>\n<p><strong>4.1 混合并行 Hybrid Parallelism</strong></p>\n<p><img alt=\"\" src=\"https://pic1.zhimg.com/v2-54a38b7757fb820cee5277380ecfeda8_1440w.jpg\" /></p>\n<p>混合并行（Hybrid Parallelism）指的是把多种人工设计的并行手段叠加使用，让模型在不同维度上同时切分：</p>\n<ul>\n<li><strong>数据并行（Data Parallel）</strong>按批次把样本分给不同 GPU；</li>\n<li><strong>张量并行（Tensor Parallel）</strong>在层内部把大矩阵拆成多块分给多卡计算；</li>\n<li><strong>流水并行（Pipeline Parallel）</strong>把模型按层切成若干 stage，像产线一样推送微批次；</li>\n<li><strong>序列并行（Sequence Parallel）</strong>针对超长上下文，再把序列维度切片给多卡；</li>\n<li><strong>专家并行（Expert Parallel）</strong>针对混合专家（MoE）模型，将不同的专家网络分布到不同设备上，通过 All-to-All 通信将输入数据路由到指定专家进行计算。</li>\n</ul>\n<p>其中<strong>“数据+张量+流水”</strong>三者组合常被称为 <strong>3D 并行</strong>，可同时利用这三条维度的并行度，最大化集群算力和显存利用率。</p>\n<p><img alt=\"\" src=\"https://picx.zhimg.com/v2-43a6f3f139b7eb8225f9c1afa14bc465_1440w.jpg\" /></p>\n<p><strong>4.1.1 数据并行</strong></p>\n<p>数据并行是分布式训练中最基础、最常用的一种方法。它的核心思想可以通俗地理解为：<strong>“人手一份完整的模型，分头处理不同的数据”</strong>。因为实现简单、效果好，所以非常流行。</p>\n<p><strong>核心工作流程</strong></p>\n<ol>\n<li><strong>复制模型：</strong> 每个参与训练的 GPU 都拥有一份<strong>完整且相同</strong>的模型副本。</li>\n<li><strong>分发数据：</strong> 将一大批训练数据切分成多份，每个 GPU 拿到一小份。</li>\n<li><strong>各自计算：</strong> 每个 GPU 用自己的数据独立计算出模型参数的梯度（更新方向）。</li>\n<li><strong>同步梯度：</strong> 所有 GPU 通过网络通信，将各自计算的梯度进行<strong>聚合</strong>（通常是求平均值），得到一个统一的全局梯度。</li>\n<li><strong>统一更新：</strong> 所有 GPU 都使用这个全局梯度来更新自己的模型副本，确保大家在下一次计算开始前模型是完全一致的。</li>\n</ol>\n<p><strong>关键挑战与技术演进：如何节省内存？</strong></p>\n<p>数据并行的最大问题在于<strong>内存开销</strong>。因为每个 GPU 都要存一份完整的模型，当模型参数达到百亿甚至千亿时，GPU 的显存很快就爆了。</p>\n<p>为了解决这个问题，数据并行发展出了不同的<strong>分片 (Sharding)</strong> 策略，其本质是在 <strong>内存占用</strong> 和 <strong>通信开销</strong> 之间做出权衡。主要有以下三种：</p>\n<ol>\n<li>\n<p><strong>完全复制 (Full Replication / 普通数据并行)</strong></p>\n</li>\n<li>\n<p><strong>做法：</strong> 每个 GPU 都保存一份完整的模型参数、梯度和优化器状态。</p>\n</li>\n<li><strong>优点：</strong> 逻辑最简单。</li>\n<li><strong>缺点：内存开销最大</strong>，是“内存大户”，不适合训练超大模型。</li>\n<li>\n<p><strong>代表：</strong> PyTorch DDP、Horovod。</p>\n</li>\n<li>\n<p><strong>完全分片 (Full Sharding)</strong></p>\n</li>\n<li>\n<p><strong>做法：</strong> 将模型参数、梯度、优化器状态<strong>全部“切碎”</strong>，每个 GPU 只负责保存和更新其中的一小部分。计算时，动态地从其他 GPU 那里<strong>临时获取</strong>所需的参数，用完后<strong>立刻丢弃</strong>以释放内存。</p>\n</li>\n<li><strong>优点：内存占用最低</strong>，是“极致省钱”模式，能用有限的硬件训练超大模型。</li>\n<li><strong>缺点：</strong> 需要频繁地通过网络通信来获取参数，<strong>通信开销最大</strong>。</li>\n<li>\n<p><strong>代表：ZeRO-3</strong> (DeepSpeed 的核心技术)、<strong>FSDP</strong> (PyTorch 的官方实现)。</p>\n</li>\n<li>\n<p><strong>混合分片 (Hybrid Sharding)</strong></p>\n</li>\n<li>\n<p><strong>做法：</strong> 前两者的<strong>折中方案</strong>。将 GPU 分成若干小组，在<strong>小组内部</strong>进行参数分片，而在<strong>小组之间</strong>进行模型复制。</p>\n</li>\n<li><strong>优点：非常灵活</strong>，可以根据硬件和模型特点，调整分片和复制的粒度，在内存和通信之间找到最佳平衡点。</li>\n<li><strong>缺点：</strong> 配置相对复杂。</li>\n</ol>\n<p><strong>4.1.2 张量并行</strong></p>\n<p>张量并行是一种<strong>模型并行</strong>技术，它的核心思想是：<strong>当模型的某一层太大，单张 GPU 都放不下时，就把这一层内部的大矩阵（即“张量”）给切开，分给多张 GPU 协同计算。</strong></p>\n<p>可以把它理解为“<strong>众人拾柴火焰高</strong>”，大家一起合作完成一个原本单个人搬不动的大任务。</p>\n<p><strong>核心工作原理</strong></p>\n<ul>\n<li><strong>切分对象：</strong> 不是切数据，也不是切模型层，而是切<strong>层内部的参数矩阵</strong>。例如，一个全连接层（Linear Layer）的核心就是一个大的权重矩阵，张量并行会把这个矩阵“横着”或“竖着”切成几块。</li>\n<li><strong>协同计算：</strong> 每个 GPU 只持有矩阵的一小块，它们各自完成自己那部分的计算后，需要通过网络通信来合并中间结果，才能得到最终的正确输出。</li>\n<li><strong>通信内容：</strong> 通信的是计算过程中的<strong>中间激活值 (intermediate activation tensors)</strong>。在大部分情况下，这些激活值比数据并行中需要同步的梯度要小得多。</li>\n</ul>\n<p><strong>特点与应用场景</strong></p>\n<ul>\n<li><strong>优点：</strong> 能够解决单个 GPU 无法容纳超大模型层的问题，是训练巨型模型的关键技术之一。</li>\n<li>\n<p><strong>缺点：</strong></p>\n</li>\n<li>\n<p><strong>通信频繁：</strong> 在每一层的计算过程中都需要通信，对通信要求极高。</p>\n</li>\n<li>\n<p><strong>难以重叠：</strong> 它的通信和计算是紧密耦合的，很难像数据并行那样将通信延迟隐藏在计算背后。</p>\n</li>\n<li>\n<p><strong>应用场景：</strong> 正因为对通信带宽要求苛刻，张量并行<strong>几乎只在单台服务器内部</strong>使用，因为服务器内的 GPU 之间有像 <strong>NVLink</strong> 这样的超高速、低延迟的专用通道。</p>\n</li>\n</ul>\n<p><strong>技术演进</strong></p>\n<p>随着研究的深入，矩阵的“切法”也越来越复杂和高效，主要目的是为了进一步降低通信量和内存占用：</p>\n<ul>\n<li><strong>1D 并行 (Megatron-LM):</strong> 最早、最经典的方法，只在一个维度上切分矩阵（例如，一个按列切，一个按行切）。</li>\n<li><strong>2D/2.5D/3D 并行：</strong> 受到并行矩阵乘法算法的启发，后续工作提出了更复杂的切分方式，在多个维度上同时对参数矩阵和输入数据进行切分，以在更大规模的 GPU 集群中获得更好的通信效率和负载均衡。</li>\n</ul>\n<p><strong>4.1.3 流水线并行</strong></p>\n<p>流水线并行是一种关键的模型并行技术，它的核心思想是：<strong>当模型太深、层数太多，以至于单张 GPU 都装不下时，就将模型按层“纵向”切开，像工厂的流水线一样，让不同的 GPU 负责不同的“工序”（即模型的不同阶段）。</strong></p>\n<p><strong>核心工作原理与应用场景</strong></p>\n<ul>\n<li><strong>如何切分：</strong> 将模型的连续多层打包成一个<strong>阶段 (Stage)</strong>，并将每个 Stage 分配给一个（或一组）GPU。</li>\n<li><strong>如何工作：</strong> GPU 1 完成它的 Stage 后，将计算结果（<strong>中间激活值</strong>）传递给 GPU 2，GPU 2 再接着计算，以此类推。在反向传播时，梯度则沿着相反的方向传回来。</li>\n<li><strong>通信特点：</strong> 与张量并行不同，流水线并行的通信<strong>不那么频繁</strong>，只发生在各个 Stage 的“接缝”处。</li>\n<li><strong>应用场景：</strong> 因为对网络带宽的要求相对较低，它非常适合用于<strong>跨多台服务器</strong>进行大规模训练，甚至可以用于地理上分散的 GPU 资源。</li>\n</ul>\n<p><strong>两大核心挑战与解决方案</strong></p>\n<p>为了让所有 GPU 能同时工作起来，而不是一个接一个地串行计算，流水线并行通常会将一个大的数据批次（Batch）切分成多个更小的<strong>微批次 (Micro-batches)</strong>，让它们像水流一样依次通过整条流水线。但这样做会带来两个主要问题：</p>\n<ol>\n<li>\n<p><strong>流水线气泡 (Pipeline Bubble)</strong></p>\n</li>\n<li>\n<p><strong>问题是什么：</strong> 在流水线的“启动”和“结束”阶段，很多 GPU 会处于<strong>空闲等待</strong>状态，就像流水线上的空隙，这大大降低了硬件的利用率。</p>\n</li>\n<li><strong>如何解决：通过精巧的调度算法</strong></li>\n<li><strong>GPipe（填充-排空）调度：</strong> 一种朴素的方法。先让所有微批次都完成前向计算，然后再统一开始反向计算。这种方法简单，但开头和结尾的“气泡”很大。</li>\n</ol>\n<p><img alt=\"\" src=\"https://pic2.zhimg.com/v2-4a624ed629570f62969f5beeca8ff0c1_1440w.jpg\" /></p>\n<ul>\n<li><strong>1F1B（1 个前向，1 个后向）调度 (PipeDream)：</strong> 一种更高效的方法。一旦某个微批次完成了前向计算，就<strong>立即开始它的反向计算</strong>，而不必等待其他微批次。通过让前向和后向计算交错进行，可以极大地压缩“气泡”，提升效率。</li>\n</ul>\n<p><img alt=\"\" src=\"https://pic1.zhimg.com/v2-aa1f7df99e4f65c96a01f9ae9bcc25b0_1440w.jpg\" /></p>\n<ul>\n<li>\n<p><strong>其他高级方法：</strong> 还包括双向流水线（Chimera）、波浪式流水线（Hanayo）、零气泡（Zero bubble）等，都是为了用更复杂的方式填满 GPU 的空闲时间。</p>\n</li>\n<li>\n<p><strong>内存不均衡 (Memory Imbalance)</strong></p>\n</li>\n<li>\n<p><strong>问题是什么：</strong> 处于流水线<strong>前端的 GPU</strong> 需要缓存更多的中间激活值（为后续的反向计算做准备），因此比<strong>后端的 GPU</strong> 消耗更多的内存。</p>\n</li>\n<li><strong>如何解决：</strong></li>\n<li><strong>动态传输：</strong> 在运行时，将前端高负载 GPU 上的激活值，临时传输到后端空闲的 GPU 上暂存（BPipe）。</li>\n<li><strong>对称分区：</strong> 巧妙地设计模型分区，让每张 GPU 同时持有一个前端 Stage 和一个后端 Stage（例如，GPU 0 负责第 1 和第 8 段，GPU 1 负责第 2 和第 7 段），从而自然地平衡内存负载（V-Shape, Hanayo）。</li>\n<li><strong>自适应重计算 (AdaPipe)：</strong> 结合激活重计算技术（一种用计算换内存的方法），为不同内存压力的 Stage 定制不同的重计算策略，以最低的计算开销来平衡内存。</li>\n</ul>\n<p><strong>总结：</strong> 流水线并行是训练超大模型的有效武器，但它本质上是一个复杂的<strong>权衡与优化</strong>问题。开发者需要通过精细的<strong>调度</strong>来减少“流水线气泡”，提高 GPU 利用率；同时也要通过巧妙的<strong>分区和内存管理</strong>策略来解决“内存不均衡”的问题。</p>\n<p><strong>4.1.4 序列并行</strong></p>\n<p>序列并行是一种专门为了<strong>训练和处理超长文本（长上下文）</strong>而设计的并行策略。它的核心思想是：<strong>当输入的句子太长，导致 Attention 计算的内存和计算量爆炸时，就把这个长句子切成几段，分给不同的 GPU 来协同处理。</strong></p>\n<p><strong>为什么需要序列并行？—— 问题的根源</strong></p>\n<p>随着 LLM 能够处理的文本越来越长（从几千个 token 到上百万个 token），一个巨大的瓶颈出现了：</p>\n<ol>\n<li><strong>内存爆炸：</strong> Attention 机制中，需要存储的中间结果（激活值）与序列长度的<strong>平方</strong>成正比。序列一长，显存立刻就不够用了。</li>\n<li><strong>计算量爆炸：</strong> Attention 的计算复杂度也是序列长度的<strong>平方</strong>。</li>\n</ol>\n<p>虽然“激活重计算”能缓解内存问题，但会增加计算时间。而“张量并行”虽然能分担计算，但通信开销又会变大。因此，需要一种新的并行维度——序列并行。</p>\n<p><strong>核心工作原理</strong></p>\n<ul>\n<li><strong>如何切分：</strong> 将一个输入的长序列（比如 10000 个 token）沿着<strong>序列维度</strong>切成 N 段（例如，切成 4 段，每段 2500 个 token），然后将每一段分配给一个 GPU。</li>\n<li><strong>如何组合：</strong> 序列并行通常不单独使用，而是和<strong>张量并行、流水线并行</strong>结合，形成更强大的混合并行策略。它在已有的并行维度上，又增加了一个新的切分维度。</li>\n</ul>\n<p><strong>挑战与解决方案：如何高效地做分布式 Attention？</strong></p>\n<p>序列并行的最大挑战在于，Attention 的计算是全局的，即每个 token 都要和序列中的所有其他 token 进行计算。当你把序列切开后，如何让不同 GPU 上的 token 段落高效地交互，就成了核心问题。</p>\n<p>主要有两大流派的解决方案：</p>\n<ol>\n<li>\n<p><strong>基于环形通信 (Ring-based) 的方法</strong></p>\n</li>\n<li>\n<p><strong>核心思想：</strong> 像“<strong>击鼓传花</strong>”一样。GPU 们组成一个逻辑环，它们将自己负责的那段序列的 Key 和 Value 张量，在环上依次传递。</p>\n</li>\n<li>\n<p><strong>工作流程 (以 Ring Self-Attention 为例):</strong></p>\n</li>\n<li>\n<p>GPU 0 把自己的 K/V 块传给 GPU 1。</p>\n</li>\n<li>GPU 1 收到后，用自己的 Q 和 GPU 0 的 K/V 计算一部分 Attention，然后把 GPU 0 的 K/V 块再传给 GPU 2。</li>\n<li>\n<p>这个过程在环上持续进行，直到每个 GPU 都“看”过了所有其他 GPU 的 K/V 块，从而完成了全局 Attention 的计算。</p>\n</li>\n<li>\n<p><strong>挑战与优化：</strong></p>\n</li>\n<li><strong>IO 瓶颈：</strong> 这种方法需要高效的 Attention 算子（如 <strong>FlashAttention</strong>）来配合，以减少对 GPU 内存的读写次数。</li>\n<li><strong>负载不均衡：</strong> 在因果 Attention 中（decoder-only 模型），靠前的 token 计算量远小于靠后的 token，导致负责前段序列的 GPU 很空闲。</li>\n<li>\n<p><strong>优化方法：</strong> 通过<strong>交换数据块 (Context Parallel)</strong>、**非连续地分配 token (Striped Attention)**等方式来平衡各个 GPU 的计算负载。</p>\n</li>\n<li>\n<p><strong>基于 All-to-All 的方法 (DeepSpeed-Ulysses)</strong></p>\n</li>\n<li>\n<p><strong>核心思想：</strong> “<strong>先分组，再交换</strong>”。这是一种更巧妙的思路，它不直接在序列维度上做复杂的环形通信。</p>\n</li>\n<li>\n<p><strong>工作流程：</strong></p>\n</li>\n<li>\n<p>它利用一次 <strong>All-to-All</strong> 全局通信，非常高效地将数据的分区方式<strong>从“按序列切分”转换成了“按注意力头(Head)切分”</strong>。</p>\n</li>\n<li>转换完成后，每个 GPU 上都有了完整序列的一部分注意力头。这时，每个 GPU 就可以<strong>独立地、并行地</strong>使用像 FlashAttention 这样的高效算子来完成自己那部分头的计算，计算过程中<strong>无需再和其他 GPU 通信</strong>。</li>\n<li>\n<p>最后再通过一次 All-to-All 通信把结果转换回来。</p>\n</li>\n<li>\n<p><strong>优点：</strong></p>\n</li>\n<li><strong>负载天然均衡</strong>，因为每个头的计算量是一样的。</li>\n<li>可以无缝集成现有的高效 Attention 实现。</li>\n<li><strong>缺点：</strong></li>\n<li>并行度受限于模型的<strong>注意力头数量</strong>。对于使用了 MQA/GQA（这两种技术会减少 Key/Value 头的数量）的模型，并行效果会打折扣。</li>\n</ol>\n<p><strong>混合方案 (LoongTrain, USP)</strong></p>\n<p>最新的研究开始融合上述两种方法的优点，将 GPU 组织成一个二维网格，同时进行 Ring-style 和 Ulysses-style 的通信，以达到更优的性能。</p>\n<p><strong>4.1.5 专家并行</strong></p>\n<p>专家并行是一种专门为<strong>混合专家模型 (Mixture-of-Experts, MoE)</strong> 设计的并行策略。MoE 模型的核心思想是：<strong>“人多不一定力量大，对症下药才高效。”</strong></p>\n<p>它不像普通模型那样让所有参数在每次计算时都参与，而是构建一个由<strong>多个“专家”（即小型神经网络）和一个“门控网络 (Gate Network)”</strong>组成的系统。门控网络会像一个聪明的调度员，根据输入的数据（token），智能地选择激活一到两个最相关的专家来处理，其他专家则“休息”。</p>\n<p>这种“<strong>稀疏激活 (Sparse Activation)</strong>”的方式，使得 MoE 模型可以在<strong>总参数量巨大（例如万亿级别）的情况下，保持相对较低的实际计算成本</strong>，因为每次计算只动用了其中一小部分参数。像 Mixtral 8x7B 这样的热门模型就采用了这种架构。</p>\n<p><strong>专家并行：如何训练分布式的 MoE 模型？</strong></p>\n<p>随着专家数量的增多，单张 GPU 已经无法容纳所有的专家。因此，必须将它们分散到整个 GPU 集群中，这就引出了<strong>专家并行</strong>。</p>\n<ul>\n<li>\n<p><strong>核心做法 (如图 9 所示):</strong></p>\n</li>\n<li>\n<p><strong>分散专家：</strong> 将不同的专家网络部署到不同的 GPU 上。例如，8 个专家分布在 8 张 GPU 上，每张卡负责一个。</p>\n</li>\n<li><strong>路由数据：</strong> 当 GPU 0 上的一个 token 需要由 GPU 5 上的专家来处理时，它必须通过网络将这个 token 的数据发送给 GPU 5。</li>\n<li>\n<p><strong>关键通信：</strong> 这个跨 GPU 路由数据的过程，是通过一次高效的 <strong>All-to-All</strong> 集体通信操作来完成的。All-to-All 意味着每个 GPU 都会同时向所有其他 GPU 发送数据，并从所有其他 GPU 接收数据。</p>\n</li>\n<li>\n<p><strong>与 3D 并行的结合：</strong> 专家并行可以被视为一个独立的并行维度，能与数据并行、张量并行、流水线并行无缝集成，形成更复杂的混合并行策略。</p>\n</li>\n</ul>\n<p><img alt=\"\" src=\"https://pic4.zhimg.com/v2-e7a13b3ea257fdce558a48cb9809b39d_1440w.jpg\" /></p>\n<p><strong>三大核心挑战与解决方案</strong></p>\n<ol>\n<li>\n<p><strong>通信瓶颈 (Communication Optimization)</strong></p>\n</li>\n<li>\n<p><strong>问题是什么：</strong>All-to-All 通信非常消耗网络带宽，尤其是在网络环境较差的集群中，很容易成为整个训练的瓶颈。</p>\n</li>\n<li><strong>如何解决：</strong></li>\n<li><strong>计算与通信重叠：</strong> 将大的 All-to-All 操作拆分成多个小块，然后让这些小块的通信过程与专家的计算过程交错进行，像流水线一样，从而隐藏通信延迟（如 Tutel, FasterMoE）。</li>\n<li><strong>优化通信调度：</strong> 在混合并行中，当 All-to-All（专家并行）和 All-Reduce（数据并行）冲突时，优先保证 All-to-All 的带宽，减少其阻塞时间（如 Lina）。</li>\n<li>\n<p><strong>数据本地化：</strong> 提出新的范式，固定数据不动，而是根据需要，通过网络异步地将远端的专家模型“拉取”到本地进行计算（如 Janus）。</p>\n</li>\n<li>\n<p><strong>负载不均衡 (Load Balance)</strong></p>\n</li>\n<li>\n<p><strong>问题是什么：</strong> 由于门控网络的路由策略或者数据本身的特性，某些“热门”专家可能会被分配到远超其他专家的计算任务，导致这些 GPU 成为“劳模”，而其他 GPU 则很空闲，造成“木桶效应”。</p>\n</li>\n<li><strong>如何解决：</strong></li>\n<li><strong>动态复制热门专家：</strong> 实时监测每个专家的负载。如果发现某个专家过于繁忙，就动态地将它的副本复制到一些空闲的 GPU 上，让大家一起分担它的工作（如 FasterMoE, FlexMoE）。</li>\n<li><strong>智能放置与切换：</strong> 通过性能模型预测，提前规划好专家的放置方案。在训练过程中，如果检测到负载不均，就动态切换到更优的并行或放置策略（如 SmartMoE, Prophet）。</li>\n<li>\n<p><strong>拓扑感知的路由：</strong> 从模型和系统协同设计的角度出发，在路由算法中加入一项“辅助损失”，引导模型学会将数据发送给网络拓扑上更近、更优的专家，从而在不牺牲模型精度的前提下，使数据流更适应物理网络结构（如 TA-MoE）。</p>\n</li>\n<li>\n<p><strong>计算浪费 (Token Dropping &amp; Padding)</strong></p>\n</li>\n<li>\n<p><strong>问题是什么：</strong> 为了使用高效的矩阵乘法（GeMM）算子，系统通常要求送入每个专家的数据批次大小都是一致的。如果某个专家收到的 token 数量不足，就需要用空数据（padding）补齐；如果太多，就需要丢弃一部分（dropping），这都造成了计算资源的浪费。</p>\n</li>\n<li><strong>如何解决：</strong></li>\n<li><strong>专用算子：</strong> 开发新的、更灵活的稀疏矩阵乘法算子，使其能够支持为不同专家处理不同大小的批次，从而避免不必要的填充和丢弃（如 Megablocks）。</li>\n</ol>\n<p><strong>总结：</strong> 专家并行是训练万亿参数级别稀疏大模型的关键，但它也引入了复杂的系统挑战。优化的核心在于：<strong>如何高效地组织 All-to-All 通信</strong>、<strong>如何动态地平衡各个专家的计算负载</strong>，以及<strong>如何减少因计算粒度不均导致的资源浪费</strong>。</p>\n<p><strong>4.2 自动并行 Auto Parallelism</strong></p>\n<p><img alt=\"\" src=\"https://pic1.zhimg.com/v2-54a38b7757fb820cee5277380ecfeda8_1440w.jpg\" /></p>\n<p>前面提到的混合并行（数据、张量、流水线并行等）就像是“<strong>手动挡</strong>”，需要专家根据丰富的经验，手动设计一套复杂的并行方案。这个过程<strong>非常耗时、费力、且技术门槛极高</strong>。</p>\n<p><strong>自动并行 (Auto Parallelism)</strong> 就是为了解决这个痛点而生的“<strong>自动挡</strong>”系统。它的目标是：<strong>你只需要把模型和 GPU 集群信息告诉它，它就能自动分析并找出最高效的并行策略组合。</strong></p>\n<p><strong>为什么需要自动并行？—— “手动挡”的痛点</strong></p>\n<ol>\n<li><strong>组合爆炸：</strong> 对于一个大模型，有多少种切分方式（数据切几路？模型怎么切？流水线切几段？），可能性多到人脑无法计算。</li>\n<li><strong>知识密集：</strong> 找到最优方案需要深入理解模型、硬件和各种并行策略的复杂权衡。</li>\n<li><strong>费时费力：</strong> 手动尝试和调优不同的并行方案，本身就是一项巨大的工程。</li>\n</ol>\n<p>自动并行系统通过算法来代替专家进行分析决策，极大地<strong>降低了分布式训练的门槛，并提升了训练效率</strong>。</p>\n<p><strong>自动并行是如何工作的？—— 核心三步走</strong></p>\n<p>一个典型的自动并行框架，通常像一个智能规划师，遵循以下三个步骤：</p>\n<ol>\n<li>\n<p><strong>定义搜索空间 (列出所有可能性):</strong></p>\n</li>\n<li>\n<p>系统首先要搞清楚“有哪些选项？”。这包括：一个模型层可以从哪些维度切分？流水线可以在哪里切断？数据并行可以用多少张卡？等等。</p>\n</li>\n<li>\n<p><strong>建立性能模型 (做出评估):</strong></p>\n</li>\n<li>\n<p>为了评价每个选项的好坏，系统需要一个“评估器”。这个性能模型能<strong>预测</strong>出，在当前硬件上，采用某种并行策略后，训练<strong>速度有多快、内存会用多少</strong>。</p>\n</li>\n<li>\n<p><strong>设计搜索算法 (寻找最佳方案):</strong></p>\n</li>\n<li>\n<p>有了“所有选项”和“评估器”，最后一步就是如何<strong>高效地找到最佳选项</strong>。因为可能性太多，不可能暴力穷举。系统会使用<strong>动态规划</strong>、<strong>强化学习</strong>等智能搜索算法，快速在海量方案中定位到那个性能最好的一个。</p>\n</li>\n</ol>\n<p><strong>自动并行的两大流派</strong></p>\n<ol>\n<li>\n<p><strong>通用框架 (General Framework):</strong></p>\n</li>\n<li>\n<p><strong>目标：</strong> 能够自动并行<strong>任何类型</strong>的深度学习模型，不局限于 Transformer。</p>\n</li>\n<li><strong>特点：</strong> 搜索空间更广、更复杂。底层需要强大的系统支持（如 GSPMD、OneFlow SBP），用简单的标注就能实现复杂的并行。</li>\n<li>\n<p><strong>代表：</strong> Alpa, FlexFlow, Piper。</p>\n</li>\n<li>\n<p><strong>Transformer 专用框架 (Transformer-Specific Framework):</strong></p>\n</li>\n<li>\n<p><strong>目标：</strong> 专门为 LLM（其核心是 Transformer 架构）进行深度优化。</p>\n</li>\n<li><strong>特点：</strong> 由于模型架构固定，搜索空间可以被简化，优化目标更明确，效果也往往更好。</li>\n<li><strong>代表：</strong> Galvatron, Colossal-Auto。</li>\n</ol>\n<p><strong>总结：</strong> 自动并行将复杂的并行策略选择问题，转化成了一个<strong>自动化搜索问题</strong>，让开发者可以从繁琐的性能调优中解放出来，更专注于模型本身的研究。</p>\n<p><strong>4.3 异构并行 Heterogeneous Parallelism</strong></p>\n<p><img alt=\"\" src=\"https://pic1.zhimg.com/v2-54a38b7757fb820cee5277380ecfeda8_1440w.jpg\" /></p>\n<p>“异构”就是指“<strong>不统一</strong>”或“<strong>混搭</strong>”。异构并行专门解决在<strong>不统一的环境</strong>下进行高效训练的问题。这种“不统一”主要体现在两个方面：<strong>硬件</strong>和<strong>模型</strong>。</p>\n<p><strong>4.3.1 异构硬件并行 (Heterogeneous Hardware)</strong></p>\n<ul>\n<li>\n<p><strong>问题是什么？</strong><br />\n  现实中的 GPU 集群往往不是完美统一的。可能的情况有：</p>\n</li>\n<li>\n<p><strong>设备混搭：</strong> 集群里同时有新的 A100 和老的 V100，它们的算力、显存各不相同。</p>\n</li>\n<li><strong>网络混搭：</strong> 服务器内部的 GPU 用高速 NVLink 连接，但服务器之间的连接用的是普通以太网，带宽差异巨大。</li>\n<li><strong>地理分散：</strong> 由于电力或成本原因，GPU 分布在不同的数据中心，跨地域网络延迟高、带宽低。</li>\n</ul>\n<p>如果在这种“混搭”集群上用标准并行策略，就会出现“<strong>木桶效应</strong>”：所有快设备都必须等待最慢的那个设备，导致整体效率低下。</p>\n<ul>\n<li><strong>如何解决？—— 核心思想：“因材施教，能者多劳”</strong> 系统需要足够智能，能够识别出不同硬件的差异，并分配不等的任务，目标是让大家<strong>差不多同时完成</strong>。</li>\n<li><strong>对于算力强的 GPU：</strong> 分配更多的计算任务（例如，在流水线并行中负责更多层）。</li>\n<li><strong>对于算力弱的 GPU：</strong> 分配更少的计算任务。</li>\n<li><strong>对于网络差的环境：</strong> 优先在内部完成高通信量的任务，并采用压缩、异步等策略减少跨网络的数据传输。</li>\n</ul>\n<p><strong>4.3.2 异构模型并行 (Heterogeneous Model)</strong></p>\n<ul>\n<li><strong>问题是什么？</strong> 有时候，训练任务本身就是由一个“<strong>混搭模型团队</strong>”来完成的，而不仅仅是训练一个模型。最典型的例子就是 <strong>RLHF (基于人类反馈的强化学习)</strong>，它是让大模型学会说“人话”的关键步骤。</li>\n</ul>\n<p>在 RLHF 的 PPO 阶段，需要 <strong>4 个不同角色、不同大小的模型</strong> 协同工作（如图 10）：</p>\n<ol>\n<li><strong>Actor 模型：</strong> 负责生成文本。</li>\n<li><strong>Critic 模型：</strong> 负责给 Actor 的表现打分。</li>\n<li><strong>Reward 模型：</strong> 另一个打分模型。</li>\n<li><strong>Reference 模型：</strong> 一个固定的参考模型。</li>\n</ol>\n<p><img alt=\"\" src=\"https://pic2.zhimg.com/v2-1e6815ab9e8c207c4b48e25ffb93190f_1440w.jpg\" /></p>\n<p>这 4 个模型的工作负载和内存需求各不相同。简单地把它们全部打包放在同一组 GPU 上，会非常低效，并导致内存瓶颈。</p>\n<ul>\n<li><strong>如何解决？—— 核心思想：“专业分工，优化协同”</strong></li>\n<li><strong>物理隔离与分工 (Separation Strategy):</strong></li>\n<li>别把所有人都塞在一个小办公室里。<strong>把负责生成文本（推理密集型）的模型团队放在一组 GPU 上，把负责更新权重（训练密集型）的团队放在另一组 GPU 上。</strong>这样它们可以并行工作，互相不干扰，还能重叠计算和通信。</li>\n<li><strong>动态切换策略 (Hybrid Engine):</strong></li>\n<li>同一个模型（如 Actor）在不同阶段扮演的角色也不同。<strong>在生成文本时，它需要高吞吐，适合用张量并行；在更新权重时，它需要省内存，适合用 ZeRO/FSDP。</strong>系统可以为它动态切换最合适的并行策略。</li>\n<li><strong>精细化任务调度 (Fine-grained Scheduling):</strong></li>\n<li>像一个超级项目经理一样，重新安排 RLHF 内部各个子任务的执行顺序，让关联性强的任务能更好地重叠执行，进一步提升效率。</li>\n</ul>\n<p><strong>5 计算优化 COMPUTATION OPTIMIZATIONS</strong></p>\n<p><img alt=\"\" src=\"https://pic2.zhimg.com/v2-0dac7c767322572bf66265d4cb9cf8d7_1440w.jpg\" /></p>\n<p><strong>核心思想：</strong> 现代 AI 芯片（如 GPU）的算力非常强大，但要充分利用这些算力，就需要精巧的优化技术。本节主要介绍两大类方法：</p>\n<ol>\n<li>\n<p><strong>算子优化 (Operator Optimization)</strong></p>\n</li>\n<li>\n<p><strong>核心算子优化：</strong> 针对模型里最耗费计算的核心模块（如注意力机制）进行专门的手动优化，以大幅提升性能。</p>\n</li>\n<li>\n<p><strong>编译器自动优化：</strong> 利用编译器自动分析计算过程，通过利用硬件的大规模并行计算和高效内存访问能力，自动生成更快的代码。</p>\n</li>\n<li>\n<p><strong>混合精度训练 (Mixed-Precision Training)</strong></p>\n</li>\n<li>\n<p><strong>核心原理：</strong> 使用较低精度的数据（比如从 32 位浮点数降到 16 位）进行计算。这就像用“简笔画”代替“高清照片”，虽然精度略有损失，但计算速度会快很多。</p>\n</li>\n<li><strong>现状与趋势：</strong> 目前，16 位混合精度训练已成为大模型训练的<strong>事实标准</strong>。为了追求更高的效率，学术界和工业界还在探索更低的精度，比如 8 位甚至 1 位。</li>\n</ol>\n<p><strong>5.1 算子优化</strong></p>\n<p>算子优化分为<strong>手动优化</strong>和<strong>自动优化</strong>两种。手动优化主要集中在最耗费资源的注意力算子上，而自动优化则应用更广泛。</p>\n<p><strong>5.1.1 手动优化的注意力算子</strong></p>\n<p><strong>问题：</strong> 注意力机制（Attention）是 Transformer 模型的核心，但它的计算量和内存占用会随序列长度的增长呈<strong>平方级增加</strong>，这严重限制了模型的训练性能和能处理的文本长度。</p>\n<p><strong>解决方案：</strong> 手动编写高度优化的注意力算子。其中最著名的就是 <strong>FlashAttention</strong> 系列：</p>\n<ul>\n<li><strong>核心思想：</strong> 大幅减少对慢速显存（HBM）的读写次数。</li>\n<li><strong>实现方式：</strong> 它通过一种叫“Tiling”（分块）的技术，将计算拆分成小块，并在 GPU 高速的片上缓存（SRAM）中一次性完成“矩阵乘法 -&gt; Softmax -&gt; 矩阵乘法”等一系列操作。这避免了中间结果在慢速显存中的反复存取，从而大幅提升速度和内存效率。</li>\n<li><strong>其他优化：</strong> 还有针对<strong>特定硬件</strong>或<strong>可变长度序列</strong>的专门优化，以避免因填充（Padding）而产生的计算浪费。</li>\n</ul>\n<p><strong>5.1.2 编译器的自动优化</strong></p>\n<p>通过深度学习编译器自动完成优化，主要分为两个层面：</p>\n<ol>\n<li><strong>算子核生成 (Kernel Generation):</strong> 自动为单个计算任务（如矩阵乘法）生成高效的底层代码。编译器（如 TVM, Triton）能分析硬件特性，自动地、更好地利用并行计算和数据局部性，生成媲美甚至超越专家手写性能的代码。</li>\n<li><strong>计算图优化 (Graph-level Optimization):</strong> 核心技术是<strong>算子融合 (Operator Fusion)</strong>。由于 GPU 的计算速度远快于访问显存的速度，频繁读写显存是主要瓶颈。编译器（如 PyTorch 2.0 的 TorchDynamo）会分析整个计算流程，将多个连续的小算子合并成一个大算子。这样，中间结果可以直接留在高速缓存中参与下一步计算，极大减少了对慢速显存的访问，提升了整体性能。</li>\n</ol>\n<p><strong>5.2 混合精度训练 (Mixed-precision Training)</strong></p>\n<p><strong>核心思想：</strong> 用更低精度的数据进行计算，以节省计算、存储和通信成本。</p>\n<p><strong>一个简单的比喻：</strong></p>\n<ul>\n<li><strong>FP32 (32 位全精度)</strong> 就像一张<strong>超高清原图</strong>，细节丰富但文件巨大。</li>\n<li><strong>FP16 (16 位半精度)</strong> 就像一张<strong>高清压缩图</strong>，肉眼看起来差不多，但文件小了一半。</li>\n</ul>\n<p>在训练模型时，大部分计算并不需要那么高的精度。“混合精度训练”就是，在大部分计算中用“压缩图”（低精度）来加速，但在一些关键步骤（比如最后汇总结果时）换回“原图”（高精度），以保证最终结果的准确性。</p>\n<p>为了防止在低精度下，一些非常小的有效数字被直接当成 0（信息丢失），通常会使用一种叫 <strong>“损失缩放” (Loss Scaling)</strong> 的技术。它会先把所有数字都乘以一个很大的数，计算完后再除回去，从而保住这些微小的细节。</p>\n<p><strong>5.2.1 16 位浮点数 (16-Bit Floating Point)</strong></p>\n<p>这是目前大模型训练的<strong>主流和事实标准</strong>。主要有两种格式：</p>\n<ul>\n<li><strong>FP16 (半精度浮点数):</strong></li>\n<li><strong>优点:</strong> 精度相对较高。</li>\n<li><strong>缺点:</strong> 能表示的数值范围小，在处理非常大或非常小的数时容易“溢出”（overflow/underflow），导致训练不稳定。</li>\n<li><strong>BF16 (bfloat16):</strong></li>\n<li><strong>优点:</strong> 能表示的数值范围和 FP32 一样大，训练过程<strong>更稳定</strong>，不易溢出。</li>\n<li><strong>缺点:</strong> 精度比 FP16 略低，且需要较新的硬件支持（如 NVIDIA Ampere 架构及之后的 GPU，或 Google 的 TPU）。</li>\n</ul>\n<p><strong>5.2.2 8 位及以下的浮点数 (Sub-8-Bit Floating Point)</strong></p>\n<p>这是更前沿的探索，旨在将精度进一步降低到 <strong>FP8</strong>，以获得极致的性能。</p>\n<ul>\n<li><strong>驱动力:</strong> 新一代 AI 芯片（如 NVIDIA H100）提供了对 FP8 的硬件支持。</li>\n<li><strong>挑战:</strong> 数值范围更小，溢出问题更严重。</li>\n<li><strong>解决方案:</strong> 设计新的 FP8 数据格式，并结合自动缩放等技术来动态调整数值范围，以确保训练的稳定性。</li>\n</ul>\n<p><strong>5.2.3 低位定点数 (Low-Bit Fixed Point)</strong></p>\n<p>这是最极致的方案，不仅降低了位数，还从浮点数变成了<strong>定点数（整数）</strong>，计算和存储效率更高。</p>\n<ul>\n<li><strong>INT8 / INT4:</strong> 使用 8 位或 4 位整数进行训练。</li>\n<li><strong>1-Bit (例如 BitNet):</strong></li>\n<li><strong>做法:</strong> 模型权重只用 <strong>1-bit</strong> 来表示，即只有 <strong>+1 和 -1</strong> 两种值（或-1, 0, +1）。</li>\n<li><strong>如何工作:</strong> 这并不意味着整个训练都在 1 位下进行。实际上，在训练时，系统内部仍然会保留一个高精度的“影子权重”用于梯度更新，保证了训练的稳定性和准确性。这可以看作是混合精度思想的极致应用。</li>\n</ul>\n<p><strong>6 内存优化 MEMORY OPTIMIZATIONS</strong></p>\n<p>大语言模型（LLM）训练时的内存开销主要源于四个方面：</p>\n<ol>\n<li><strong>模型状态</strong>：包括参数、梯度和优化器状态。在主流的混合精度训练中，这部分大约占用 模型参数量的 16 倍 内存空间。</li>\n<li><strong>激活值</strong>：前向计算时产生的中间结果，用于反向传播计算梯度。序列越长，这部分内存越大。</li>\n<li><strong>临时缓冲区</strong>：用于存储计算或通信过程中的临时数据。</li>\n<li><strong>内存碎片</strong>：频繁的内存申请和释放导致可用内存不连续，无法分配出所需的大块内存。</li>\n</ol>\n<p>为解决这些内存瓶颈，主要有四类优化方法：</p>\n<ol>\n<li><strong>激活重计算</strong>：以算力换空间。不保存所有激活值，在需要时重新计算它们。</li>\n<li><strong>冗余减少</strong>：通过数据分片等技术，减少在多张 GPU 上重复存储的数据。</li>\n<li><strong>碎片整理</strong>：优化内存管理机制，提高内存利用率。</li>\n<li><strong>交换与卸载</strong>：将 GPU 中暂时不用的数据转移到 CPU 内存或 SSD 硬盘上，需要时再加载回来。</li>\n</ol>\n<p><strong>6.1 激活重计算</strong></p>\n<p>在模型训练中，反向传播（backward pass）计算梯度时，需要依赖前向传播（forward pass）产生的<strong>激活值（Activations）</strong>。对于大语言模型（LLM），存储所有激活值会消耗巨大的 GPU 显存，成为训练的瓶颈。</p>\n<p><strong>激活重计算</strong>（也常被称为<strong>梯度检查点 Gradient Checkpointing</strong>）是一种“以计算换空间”的核心技术。其基本原理是：</p>\n<ul>\n<li><strong>前向传播时</strong>：不再保存所有的激活值，只选择性地保存其中几个关键节点（称为“检查点”），然后将中间的激活值丢弃以释放显存。</li>\n<li><strong>反向传播时</strong>：当需要用到某个被丢弃的激活值时，系统会从最近的一个“检查点”开始，重新执行一小段前向计算，以实时生成所需的激活值。</li>\n</ul>\n<p><strong>核心权衡</strong>：这种方法显著降低了峰值显存占用，但代价是增加了额外的计算量。优化的关键在于找到内存节省和计算开销之间的最佳平衡点。</p>\n<p>激活重计算主要分为两大类：</p>\n<ul>\n<li><strong>静态策略 (Static Evicting)</strong>：预先制定好固定的丢弃和重计算计划。</li>\n<li><strong>动态策略 (Dynamic Evicting)</strong>：在训练过程中根据实时状态动态决定丢弃哪些激活值。</li>\n</ul>\n<p>由于 LLM 的架构（如 Transformer 层）高度重复且结构固定，<strong>静态策略</strong>非常有效，是目前的主流方法。</p>\n<p><strong>6.1.1 静态策略 (Static Evicting) - 预定义计划</strong></p>\n<p>静态策略根据模型结构，提前设计好检查点的位置。</p>\n<ul>\n<li><strong>基本方法 (Selective-checkpointing)</strong>：这是一种常见的实践，通常在计算开销和内存占用较大的模块边界设置检查点，如<strong>注意力模块（Attention Module）</strong>。系统只保存这些模块的输入或输出，模块内部的中间激活值则在反向传播时重算。</li>\n<li><strong>内核级优化 (FlashAttention, DistFlashAttn)</strong>：这些技术将重计算策略应用得更加精细。例如，它们不仅仅在整个注意力模块外设置检查点，而是优化模块内部的计算流程，只保存最关键的部分（如 Attention 的最终输出），从而避免了在反向传播时对整个模块进行重计算，极大地降低了长序列训练的计算开销。</li>\n<li><strong>白名单机制 (LoongTrain)</strong>：通过将注意力模块等关键部分加入“白名单”，在前向传播时强制保存其输出，反向传播时直接复用，避免了对这些计算密集型模块的重计算。</li>\n<li><strong>全局最优搜索 (Yuan et al.)</strong>：这是一种更系统化的方法，它会分析模型中每个张量的重计算成本和内存成本，通过算法（如寻找帕累托前沿）来自动寻找一个理论上在计算与内存之间达到最佳平衡的全局检查点方案。</li>\n</ul>\n<p><strong>6.1.2 动态策略 (Dynamic Evicting) - 实时决策</strong></p>\n<p>动态策略在训练时实时监控内存使用情况，并动态决策。</p>\n<ul>\n<li><strong>原理</strong>：当检测到内存压力较大时，系统会根据某种启发式规则（如张量的访问模式、大小等）选择性地丢弃一些当前未使用的激活值。</li>\n<li><strong>优点</strong>：灵活性高，不依赖于特定的模型结构。</li>\n<li><strong>现状</strong>：尽管灵活，但由于实时决策会引入额外的管理开销，并且静态策略对结构规整的 LLM 效果已经很好，因此动态策略在 LLM 训练中应用较少。相关研究（如 Coop）还会考虑在丢弃时避免产生内存碎片。</li>\n</ul>\n<p><strong>6.2 冗余减少</strong></p>\n<p>在标准的<strong>数据并行 (Data Parallelism)</strong> 训练中，为了让每张 GPU 都能独立计算，系统会在<strong>每张 GPU</strong> 上都存储一份完整的<strong>模型状态</strong>。模型状态主要包括三个部分：</p>\n<ol>\n<li><strong>模型参数 (Parameters)</strong>：模型的权重。</li>\n<li><strong>梯度 (Gradients)</strong>：用于更新参数的计算结果。</li>\n<li><strong>优化器状态 (Optimizer States)</strong>：例如 Adam 优化器中的动量（momentum）和方差（variance），内存占用通常是模型参数的数倍。</li>\n</ol>\n<p>这种完全复制的策略导致了极大的<strong>内存冗余</strong>，限制了可训练模型的规模。<strong>冗余减少 (Redundancy Reduction)</strong> 技术的核心目标就是通过分片（Sharding）来消除这些冗余副本。</p>\n<p><strong>6.2.1 完全分片 (Fully Sharding)：ZeRO 技术</strong></p>\n<p><strong>ZeRO (Zero Redundancy Optimizer)</strong> 是一种通过逐步分片模型状态来消除冗余的系统性方法，分为三个递进的阶段：</p>\n<ul>\n<li><strong>ZeRO-1: 分片优化器状态</strong></li>\n<li>将占用内存最大的<strong>优化器状态</strong>进行分片，均匀地存储在所有 GPU 上。</li>\n<li>每张 GPU 只持有一部分优化器状态，但仍然保留完整的模型参数和梯度。</li>\n<li><strong>效果</strong>：显著降低内存占用，是性价比最高的优化阶段。</li>\n<li><strong>ZeRO-2: 分片优化器状态和梯度</strong></li>\n<li>在 ZeRO-1 的基础上，进一步对<strong>梯度</strong>进行分片。</li>\n<li>每张 GPU 在反向传播后，只保留与其负责的那部分参数相对应的梯度。</li>\n<li><strong>效果</strong>：内存占用进一步降低，但通信开销略有增加。</li>\n<li><strong>ZeRO-3: 分片优化器状态、梯度和模型参数</strong></li>\n<li>最彻底的分片阶段，将<strong>模型参数</strong>本身也进行分片。</li>\n<li>每张 GPU 在任何时候都只持有一小部分模型参数。</li>\n<li><strong>工作机制</strong>：在前向或反向计算需要特定参数时，通过 AllGather 通信操作从其他 GPU <strong>动态获取</strong>，计算完成后立即释放这部分内存。</li>\n<li><strong>效果</strong>：内存效率最高，使训练超大规模模型成为可能。</li>\n<li><strong>代价</strong>：引入了大量的即时通信，对网络带宽和延迟要求极高。</li>\n</ul>\n<p><strong>6.2.2 部分分片 (Partially Sharding)：通信与内存的权衡</strong></p>\n<p>ZeRO-3 的全局通信在大规模集群中可能成为性能瓶颈。<strong>部分分片</strong>是对其的一种优化，旨在平衡内存效率和通信成本。</p>\n<ul>\n<li><strong>核心思想</strong>：将分片操作限制在一个<strong>通信效率更高</strong>的范围内（如单台服务器内的 GPU），而不是在整个集群的所有 GPU 上进行全局分片。</li>\n<li>\n<p><strong>工作机制</strong>：</p>\n</li>\n<li>\n<p>将所有 GPU 划分为若干个<strong>子组 (subgroup)</strong>。</p>\n</li>\n<li>在<strong>子组内部</strong>，执行类似 ZeRO-3 的完全分片，所有模型状态（参数、梯度、优化器状态）都被分片存储。组内通信通常通过高速互联（如 NVLink）完成，开销很小。</li>\n<li>\n<p>在<strong>子组之间</strong>，每个子组可以看作一个独立的单元，共同构成一个数据并行的整体。</p>\n</li>\n<li>\n<p><strong>权衡</strong>：</p>\n</li>\n<li><strong>通信优化</strong>：大部分通信被限制在高速的子组内部，跨节点的全局通信频率和数据量显著减少。</li>\n<li><strong>内存代价</strong>：由于每个子组都需要能够独立工作，因此在子组的粒度上存在状态冗余，内存节省效果不如全局的 ZeRO-3。</li>\n</ul>\n<p><strong>PyTorch FSDP (Fully Sharded Data Parallel)</strong> 就是这种部分分片思想的一个典型实现，它允许用户灵活地定义分片组，以适应不同的硬件拓扑，在通信和内存之间找到最佳平衡。</p>\n<p><strong>6.3 碎片整理</strong></p>\n<p>在 LLM 训练过程中，GPU 显存会被频繁地申请（分配）和释放。<strong>内存碎片（MemoryFragmentation）</strong>指的是，在多次分配和释放后，<strong>总的可用显存虽然很多，但它们被分割成了许多不连续的小块</strong>。</p>\n<p>当系统需要申请一块较大的连续内存时（例如，存储一个大的激活值张量），尽管总的空闲内存足够，但由于找不到任何一块足够大的<strong>连续</strong>空闲空间，导致分配失败，从而引发<strong>内存不足 (Out-of-Memory, OOM)</strong> 错误。</p>\n<p><strong>产生原因</strong>：</p>\n<ul>\n<li><strong>张量生命周期不同</strong>：不同的张量（tensors）在内存中存在的时间长短不一。</li>\n<li><strong>频繁的内存操作</strong>：像激活重计算、数据卸载等内存优化技术，会引入更频繁和不规则的内存分配与释放请求，加剧了碎片问题。</li>\n</ul>\n<p><strong>碎片整理 (Defragmentation)</strong> 的目标就是通过优化内存管理来解决这个问题。</p>\n<p><strong>6.3.1 基于张量的碎片整理 (Tensor-based Defragmentation)</strong></p>\n<p>这类方法从深度学习框架的<strong>内存分配器 (caching allocator)</strong> 入手，通过优化张量的分配和释放策略来减少碎片。</p>\n<ul>\n<li><strong>核心思想</strong>：通过分析整个计算图，预测所有张量的生命周期（何时创建、何时销毁）和大小，然后提前规划一个最优的内存布局方案。</li>\n<li><strong>具体方法</strong>：</li>\n<li><strong>优化计算顺序和内存分配 (ROAM)</strong>：通过算法调整算子（operators）的执行顺序，并优化张量的分配位置，使得生命周期相似的张量尽可能地分配在一起，从而最大限度地复用内存空间。</li>\n<li><strong>2D 装箱问题建模 (Imanishi et al.)</strong>：将内存分配问题看作一个二维的“装箱”问题（时间轴和内存地址轴），通过启发式算法找到一个能让“箱子”（内存块）排列得最紧凑的方案。</li>\n<li><strong>与重计算结合 (MegTaiChi, Coop)</strong>：在执行激活重计算时，不仅考虑节省内存，还考虑丢弃哪些张量能更好地维持内存的连续性。</li>\n</ul>\n<p><strong>局限性</strong>：这些方法通常需要对计算图进行复杂的离线分析，对于 LLM 这种极其庞大的模型，分析和搜索最优解的成本非常高，扩展性可能受限。</p>\n<p><strong>6.3.2 基于虚拟内存管理的碎片整理 (VMM-based Defragmentation)</strong></p>\n<p>这类方法不去改变上层的张量分配逻辑，而是利用底层 CUDA 驱动提供的<strong>虚拟内存管理 (Virtual Memory Management, VMM)</strong> 功能来解决碎片问题。</p>\n<ul>\n<li><strong>核心思想</strong>：将物理上不连续的多个小内存块，通过虚拟地址映射，“拼接”成一个逻辑上连续的大内存块。</li>\n<li><strong>具体方法</strong>：</li>\n<li><strong>虚拟内存拼接 (GMLake)</strong>：当需要一块大内存时，系统可以找到多个分散的小空闲块，然后在虚拟地址空间中将它们映射成一段连续的地址。上层应用（如 PyTorch）看到的是一个完整的大内存块，而无需关心它在物理上是分散的。这种方法几乎没有数据拷贝开销。</li>\n<li><strong>可扩展内存段 (PyTorch expandable segments)</strong>：允许一个已经分配的内存块在使用过程中“原地”扩大。如果旁边的内存块恰好被释放了，系统就可以直接将当前内存块的边界扩展过去，合并两个空间，而不需要重新分配和拷贝数据。</li>\n</ul>\n<p><strong>优势</strong>：</p>\n<ul>\n<li><strong>透明性</strong>：对上层应用完全透明，无需修改模型代码。</li>\n<li><strong>通用性</strong>：可以和各种内存优化技术（如重计算、卸载）无缝集成。</li>\n<li><strong>高效性</strong>：利用了硬件和驱动层面的功能，开销小，扩展性好。目前已被主流框架（如 PyTorch 2.1）集成。</li>\n</ul>\n<p><strong>6.4 卸载</strong></p>\n<p>当 GPU 显存不足以容纳整个模型及其训练状态时，<strong>卸载 (Offloading)</strong> 技术提供了一种解决方案。其核心思想是：</p>\n<p><strong>将 GPU 中当前不需要的数据（如模型参数、优化器状态、激活值等）临时转移到容量更大但速度更慢的外部存储资源上，如 CPU 内存或 NVMe SSD。当 GPU 需要这些数据时，再将其加载回来。</strong></p>\n<p>这种技术利用了外部资源巨大的存储容量，使得在有限的 GPU 上训练超大规模模型成为可能。关键挑战在于<strong>隐藏或最小化数据传输带来的延迟</strong>，避免 GPU 因等待数据而空闲。</p>\n<p><strong>6.4.1 卸载到 CPU (CPU Offloading)</strong></p>\n<p>这是最常见的卸载方式，利用比 GPU 显存大得多的 CPU 内存。</p>\n<p><strong>静态卸载 (Static Offloading)</strong></p>\n<p>在训练开始前就制定好固定的卸载计划，决定哪些数据常驻 GPU，哪些常驻 CPU。</p>\n<ul>\n<li><strong>代表技术：ZeRO-Offload</strong></li>\n<li><strong>策略</strong>：将<strong>最消耗内存的优化器状态和梯度</strong>放在 CPU 内存中，而将<strong>计算密集型的模型参数</strong>保留在 GPU 上。</li>\n<li><strong>优势</strong>：简单有效，能显著扩展可训练模型的规模。</li>\n<li><strong>局限</strong>：卸载策略固定，可能无法充分利用所有 GPU 显存，且 CPU 计算（如参数更新）速度慢，可能成为瓶颈。</li>\n<li><strong>优化方向</strong>：通过更精细的分析（如 Elixir）来决定哪些数据块卸载到 CPU，以更高效地利用 GPU 显存；或者通过流水线（Pipelining）和预取（Prefetching）来重叠计算和数据传输，隐藏延迟。</li>\n</ul>\n<p><strong>动态卸载 (Dynamic Offloading)</strong></p>\n<p>在训练过程中根据实时内存使用情况，动态地决定何时、卸载哪些数据。</p>\n<ul>\n<li><strong>核心思想</strong>：更加灵活，按需分配。当 GPU 显存紧张时，自动将最近最少使用的数据转移到 CPU；当需要时，再加载回来。</li>\n<li><strong>实现方式</strong>：</li>\n<li><strong>细粒度管理 (PatrickStar, TSPLIT)</strong>：将大张量（Tensor）切分为更小的<strong>内存块 (chunks)</strong> 或<strong>微张量 (micro-tensors)</strong> 进行管理。这样可以更灵活、更精确地进行数据移动，只传输必要的部分，从而优化数据传输带宽和延迟。</li>\n<li><strong>与流水线结合 (MPipeMoE)</strong>：在流水线并行中，动态决定是<strong>重新计算</strong>一个激活值划算，还是从 CPU <strong>加载</strong>一个卸载的激活值划算。</li>\n</ul>\n<p><strong>6.4.2 卸载到 SSD (SSD Offloading)</strong></p>\n<p>对于万亿（Trillion）参数级别的巨型模型，即使是 CPU 内存也可能不够用。这时，就需要将数据进一步卸载到容量更大的 NVMe SSD 上。</p>\n<ul>\n<li><strong>代表技术：ZeRO-Infinity</strong></li>\n<li><strong>策略</strong>：构建了一个 <strong>GPU -&gt; CPU -&gt; SSD</strong> 的三级存储体系。</li>\n<li><strong>模型状态</strong>（参数、梯度、优化器状态）可以被卸载到 CPU 内存或 NVMe SSD。</li>\n<li><strong>激活值</strong>因为访问频繁，通常只卸载到 CPU 内存。</li>\n<li><strong>优势</strong>：极大地扩展了模型规模的上限，理论上可以训练数十万亿参数的模型。</li>\n<li><strong>挑战</strong>：SSD 的读写速度远慢于内存，数据传输延迟更高，对系统调度和预取技术的要求也更高。</li>\n<li><strong>优化方向</strong>：</li>\n<li><strong>卸载激活值到 SSD (Fuyou)</strong>：在 CPU 内存也极其有限的单卡或消费级服务器上，将激活值也卸载到 SSD。</li>\n<li><strong>近存储计算 (Smart-Infinity)</strong>：利用 SSD 附近的计算单元（如智能网卡 DPU）直接在存储端执行一部分计算（如参数更新），减少需要传回 GPU 的数据量。</li>\n<li><strong>混合存储与预取 (MoESys)</strong>：针对 MoE（混合专家）模型，将不同类型的参数（稀疏/密集）存放在不同层级的存储设备上，并设计高效的预取调度策略来重叠计算和数据加载。</li>\n</ul>\n<p><strong>7 通信优化 COMMUNICATION OPTIMIZATIONS</strong></p>\n<p><img alt=\"\" src=\"https://pic2.zhimg.com/v2-7d412ad633a2f4ff7bd4d1d4877884c5_1440w.jpg\" /></p>\n<p>在分布式 LLM 训练中，不同的<strong>并行策略</strong>会产生不同模式的网络通信流量：</p>\n<ul>\n<li><strong>张量并行 (Tensor Parallelism)</strong>：需要在层内计算中进行 AllReduce 通信，对<strong>带宽要求极高</strong>。</li>\n<li><strong>数据并行 (Data Parallelism)</strong>：需要在每次迭代结束时同步梯度，同样需要 AllReduce 通信。</li>\n<li><strong>流水线并行 (Pipeline Parallelism)</strong>：需要在不同阶段（stage）之间传递激活值，通常是点对点（Send/Recv）通信。</li>\n</ul>\n<p>通常的部署策略是：</p>\n<ul>\n<li><strong>高带宽需求</strong>的并行（如张量并行）被限制在<strong>高带宽域</strong>内，例如同一台服务器内的多张 GPU（通过 NVLink 高速互联）。</li>\n<li><strong>较低带宽需求</strong>的并行（如数据并行、流水线并行）则可以跨<strong>高带宽域</strong>进行，例如跨服务器（通过 InfiniBand 或以太网）。</li>\n</ul>\n<p>这种部署策略导致 LLM 训练的通信流量呈现出<strong>清晰的模式和层次性</strong>：绝大部分通信发生在小范围的 GPU 组内，只有一小部分流量需要跨越整个集群。这一洞察启发了新的网络拓扑设计，如<strong>轨道优化拓扑 (rail-optimized topology)</strong>，通过减少不必要的昂贵核心交换机来降低成本。</p>\n<p>本章将介绍用于优化分布式 LLM 训练中<strong>集体通信 (collective communication)</strong> 性能的系统和技术。主要分为三个方面：</p>\n<ol>\n<li>\n<p><strong>集体通信库 (Collective Communication Libraries)</strong>：</p>\n</li>\n<li>\n<p>讨论实现 AllReduce、AllGather 等核心通信操作的底层库。</p>\n</li>\n<li>\n<p>这些库使用的算法可以是<strong>预定义的 (pre-defined)</strong>，如经典的 Ring 和 Tree 算法，也可以是根据硬件拓扑<strong>自动合成的 (synthesized)</strong> 更优算法。</p>\n</li>\n<li>\n<p><strong>通信调度 (Communication Scheduling)</strong>：</p>\n</li>\n<li>\n<p>探讨如何重新组织通信操作的执行顺序，使其与计算操作<strong>重叠 (overlap)</strong>。</p>\n</li>\n<li>\n<p>目标是让 GPU 在等待网络通信时也能进行计算，从而隐藏通信延迟，提升训练效率。</p>\n</li>\n<li>\n<p><strong>网络内聚合 (In-Network Aggregation, INA)</strong>：</p>\n</li>\n<li>\n<p>介绍一种前沿技术，它利用网络设备（如交换机）自身的计算能力来执行一部分聚合操作（如梯度求和）。</p>\n</li>\n<li>通过在数据传输路径上完成计算，可以显著减少需要传输到 GPU 的数据量，从而降低网络负载和延迟。</li>\n</ol>\n<p><strong>注意</strong>：本章不讨论通过<strong>有损压缩 (lossy compression)</strong> 或<strong>量化 (quantization)</strong> 等方法来减少通信量的技术，因为这些属于数据压缩范畴，而非通信系统优化。</p>\n<p><strong>7.1 集体通信</strong></p>\n<p>在分布式训练中，多张 GPU 需要协同工作，例如同步梯度、分发参数等。<strong>集体通信 (Collective Communication)</strong> 就是指一组 GPU 共同参与完成的通信操作。</p>\n<ul>\n<li><strong>关键操作</strong>：包括 AllReduce (所有 GPU 的数据<strong>聚合计算</strong>后分发给所有人)、AllGather (所有 GPU 的数据<strong>拼接</strong>后分发给所有人)、ReduceScatter (<strong>聚合计算</strong>后将结果<strong>分块</strong>发给不同人) 等。</li>\n<li><strong>常用库</strong>：虽然有通用的 MPI 库，但在 LLM 训练中，大家更偏爱针对 AI 加速器（如 NVIDIA GPU）高度优化的专用库，其中最著名的是 <strong>NVIDIA 的 NCCL</strong>。</li>\n</ul>\n<p><strong>7.1.1 预定义算法 (Pre-Defined Algorithm)</strong></p>\n<p>NCCL 等库内置了一套经过优化的标准通信算法，并会根据网络拓扑和数据大小等条件自动选择最合适的一种。</p>\n<ul>\n<li><strong>环形算法 (Ring Algorithm)</strong></li>\n<li><strong>工作方式</strong>：将数据切分成小块 (chunks)，然后在 GPU 之间形成一个环路，像流水线一样依次传递和计算。</li>\n<li><strong>优点</strong>：可以有效利用网络带宽，避免因等待大数据块而造成的网络空闲。非常适合处理大批量数据。</li>\n<li><strong>缺点</strong>：随着 GPU 数量增多，环路变长，通信延迟会增加。</li>\n<li><strong>树形算法 (Tree Algorithm)</strong></li>\n<li><strong>工作方式</strong>：将 GPU 组织成一个或多个树状结构进行数据聚合和分发。</li>\n<li><strong>优点</strong>：对于大量 GPU 的场景，其通信延迟通常低于环形算法。</li>\n<li><strong>关注点</strong>：更侧重于降低<strong>延迟 (latency)</strong>。</li>\n<li><strong>混合算法 (Hybrid Algorithm)</strong></li>\n<li><strong>背景</strong>：训练集群的网络通常是异构的，即<strong>服务器内部</strong>的 GPU 间通信（如 NVLink）速度极快，而<strong>服务器之间</strong>的通信（如以太网）相对较慢。</li>\n<li><strong>工作方式</strong>：采用分层策略。例如，先在每台服务器内部用高速连接完成第一轮数据聚合（Reduce），然后再由每台服务器的代表 GPU 在服务器之间完成聚合，最后再将结果广播回服务器内部的各张 GPU。</li>\n<li><strong>优点</strong>：充分利用硬件拓扑的局部性，最大限度地减少跨节点慢速网络的通信量。</li>\n</ul>\n<p><strong>7.1.2 自动合成算法 (Synthesized Algorithm)</strong></p>\n<p>这是一种更高级的方法，它不依赖于固定的预定义算法，而是根据<strong>当前的硬件拓扑结构</strong>，<strong>自动生成一个定制化的、最优的通信算法</strong>。</p>\n<ul>\n<li><strong>核心思想</strong>：与其使用“通用”方案，不如为“特定”的 GPU 连接方式量身打造最高效的通信路径和调度计划。</li>\n<li><strong>实现方式</strong>：</li>\n<li>将通信算法的生成问题，建模为一个<strong>数学优化问题</strong>（如使用 SMT、MILP 等求解器）。</li>\n<li>或者提供一种<strong>领域特定语言 (DSL)</strong>，让系统可以编译生成针对特定硬件的优化代码。</li>\n<li>或者在运行时<strong>探测网络</strong>，动态构建通信计划。</li>\n<li><strong>优点</strong>：在许多情况下，生成的定制化算法性能可以超越通用的预定义算法。</li>\n</ul>\n<p><strong>7.2 通信调度</strong></p>\n<p>在分布式训练中，GPU 的工作状态通常是 <strong>计算 -&gt; 通信 -&gt; 计算 -&gt; 通信 ...</strong> 的循环。如果严格按顺序执行，那么在通信时，GPU 计算单元就会<strong>空闲等待</strong>，造成资源浪费。</p>\n<p><strong>通信调度</strong>的核心目标就是打破这种严格的顺序，通过<strong>重新安排</strong>任务的执行顺序，使得<strong>通信操作</strong>可以和<strong>计算操作</strong>同时进行。理想情况下，当 GPU 在进行网络通信时，它的计算核心也没闲着，仍在处理其他计算任务。</p>\n<p>这种“重叠”技术可以有效<strong>隐藏</strong>通信带来的延迟，从而提升 GPU 的利用率和整体训练吞吐量。</p>\n<p><strong>7.2.1 先进先出调度 (FIFO-based Scheduling)</strong></p>\n<p>这是最基础的调度策略，也被称为“无等待反向传播 (wait-free backpropagation)”。</p>\n<ul>\n<li><strong>工作方式</strong>：在反向传播过程中，梯度是从模型的最后一层逐层向前计算出来的。一旦某一层的梯度计算完成，系统就<strong>立即</strong>将其放入一个先进先出 (FIFO) 队列，开始进行网络通信（如 AllReduce），而<strong>不必等待</strong>所有层的梯度都计算完毕。</li>\n<li><strong>优化</strong>：为了提高网络效率（大块数据传输效率更高），系统通常会等待一小段时间，将几层的梯度<strong>打包 (fuse)</strong> 成一个更大的数据块再进行通信。PyTorch 的 DDP 就采用了这种策略。</li>\n<li><strong>优点</strong>：实现简单，能实现基本的计算与通信重叠。</li>\n</ul>\n<p><strong>7.2.2 基于优先级的调度 (Priority-based Scheduling)</strong></p>\n<p>FIFO 策略并不总是最优的。因为反向传播计算梯度的顺序（从后到前）和下一轮前向传播使用参数的顺序（从前到后）是<strong>相反的</strong>。这可能导致关键的通信任务被延后，阻塞后续计算。</p>\n<ul>\n<li><strong>工作方式</strong>：不再遵循“先算完先通信”的原则，而是为不同的通信任务设置<strong>优先级</strong>。</li>\n<li><strong>一个简单的优先级策略</strong>：越是<strong>靠前</strong>的层（在下一轮前向传播中越早被使用），其梯度通信的优先级就<strong>越高</strong>，从而让这部分参数能尽快更新完毕。</li>\n<li><strong>更高级的策略 (PACE)</strong>：引入<strong>抢占 (preemption)</strong> 机制。当一个高优先级的（通常是小的）通信任务到来时，可以暂停当前正在进行的大通信任务，让高优先级任务“插队”先走，以避免关键路径被阻塞（即“队头阻塞”，Head-of-Line Blocking）。</li>\n<li><strong>特定场景优化 (Lina for MoE)</strong>：在混合专家（MoE）模型中，All-to-All 通信是关键瓶颈。因此，调度器会优先保证 All-to-All 的带宽，让 AllReduce 等其他通信在空闲时“见缝插针”地执行。</li>\n</ul>\n<p><strong>7.2.3 基于分解的调度 (Decomposition-based Scheduling)</strong></p>\n<p>这是最灵活、最前沿的调度思想。它将原本粗粒度的计算和通信任务，<strong>分解</strong>成许多更小的<strong>微任务 (fine-grained tasks)</strong>，从而创造出更多的重叠机会。</p>\n<ul>\n<li><strong>核心思想</strong>：把“大石头”敲成“小石子”，可以更灵活地填充计算和通信之间的“缝隙”。</li>\n<li>\n<p><strong>分解的维度</strong>：</p>\n</li>\n<li>\n<p><strong>通信分解 (Communication Decomposition)</strong>：将一个大的 AllReduce 或 AllGather 操作，分解成一系列底层的点对点 Send/Recv 操作。这样，系统就可以将这些小的 Send/Recv 操作穿插在计算的间隙中。</p>\n</li>\n<li>\n<p><strong>计算分解 (Computation Decomposition)</strong>：</p>\n</li>\n<li>\n<p><strong>与通信重叠</strong>：将一个大的矩阵乘法计算也切分成小块。每算完一小块结果，就立刻开始对这一小块进行通信，而不是等整个大矩阵算完。</p>\n</li>\n<li><strong>梯度计算解耦 (Out-of-order backprop)</strong>：反向传播会产生两种梯度：用于更新本层权重的<strong>权重梯度 (weight gradient)</strong> 和用于计算上一层梯度的<strong>输出梯度 (output gradient)</strong>。传统方法是同时计算两者。分解调度则将它们解耦，可以灵活地先计算其中一个，从而更自由地安排权重梯度的通信时机，以实现更好的重叠效果。</li>\n</ul>\n<p>通过这种细粒度的分解和重排，系统可以实现接近完美的计算与通信重叠，最大限度地提升硬件利用率。</p>\n<p><strong>7.3 网络聚合</strong></p>\n<p><strong>核心思想：让网络设备帮忙计算</strong></p>\n<p>在标准的 AllReduce 中，所有 GPU 将各自的梯度数据发送到一个（或多个）GPU 上，由 GPU 完成求和计算，然后再将结果分发回去。这个过程会产生大量的数据流量，并占用 GPU 的计算资源。</p>\n<p><strong>网络内聚合 (INA)</strong> 的核心思想是：<strong>不再让 GPU 承担全部的聚合计算任务，而是利用网络设备（如交换机）自身的计算能力，在数据传输的“途中”就完成一部分或全部的聚合操作（如求和）。</strong></p>\n<p><strong>效果</strong>：</p>\n<ul>\n<li><strong>减少网络流量</strong>：交换机向上级网络或目标 GPU 发送的是聚合后的结果，而不是原始的多份数据，从而显著减少了网络主干链路的负载。</li>\n<li><strong>降低 GPU 负担</strong>：GPU 从繁重的聚合计算中解放出来，可以更专注于模型本身的计算。</li>\n<li><strong>降低延迟</strong>：数据在网络路径上就被处理，减少了来回传输的延迟。</li>\n</ul>\n<p><strong>7.3.1 基于以太网的聚合 (Ethernet-based Aggregation)</strong></p>\n<p>这类方法主要依赖于<strong>可编程交换机 (Programmable Switches)</strong>，通过在交换机上运行特定的程序来实现聚合功能。</p>\n<ul>\n<li><strong>代表技术：SwitchML</strong></li>\n<li><strong>工作方式</strong>：在交换机上实现 AllReduce 逻辑。由于交换机的内存很小，无法存储整个梯度，它采用<strong>流式聚合 (streaming aggregation)</strong> 的方式，一次只处理一小部分数据，处理完就向上发送，从而在有限的硬件上完成对大张量的聚合。</li>\n<li><strong>局限性</strong>：早期的实现（如 SwitchML）通常不支持直接进行浮点数运算，需要先将浮点数转换成特殊的整数格式，处理起来比较麻烦且可能损失精度。同时，与主流训练框架的集成也比较困难。</li>\n<li><strong>后续发展</strong>：</li>\n<li><strong>支持浮点数 (FPISA)</strong>：通过在可编程交换机上直接实现浮点数计算逻辑，解决了数据类型转换的问题。</li>\n<li><strong>FPGA 辅助实现 (NetReduce)</strong>：使用 FPGA（现场可编程门阵列）作为交换机的“外挂”，在 FPGA 上实现聚合逻辑，灵活性更高。</li>\n<li><strong>面向多租户环境 (PANAMA, ATP)</strong>：研究如何在共享的集群环境中，为多个同时运行的训练任务公平且高效地分配网络内聚合资源。</li>\n</ul>\n<p><strong>7.3.2 基于 InfiniBand 的聚合 (Infiniband-based Aggregation)</strong></p>\n<p>这是目前在大型 LLM 训练集群中<strong>最成熟、最常用</strong>的方案。</p>\n<ul>\n<li><strong>代表技术：NVIDIA SHARP (Scalable Hierarchical Aggregation Protocol)</strong></li>\n<li><strong>性质</strong>：这是 NVIDIA 提供的一项<strong>专有技术</strong>，内置于其 Mellanox InfiniBand 交换机和部分 NVIDIA GPU/NVSwitch 中。</li>\n<li>\n<p><strong>工作方式</strong>：</p>\n</li>\n<li>\n<p>交换机内部集成了专用的计算单元（如 FPU，浮点运算单元）。</p>\n</li>\n<li>当 GPU 们发起一个 AllReduce 操作时，它们的数据包会被交换机识别。</li>\n<li>交换机使用其内置的计算单元，直接对流经它的数据包进行聚合计算（如求和）。</li>\n<li>\n<p>然后，交换机只将聚合后的结果发送出去。</p>\n</li>\n<li>\n<p><strong>优势</strong>：</p>\n</li>\n<li><strong>硬件原生支持</strong>：直接在硬件层面实现，性能极高，可以达到线速（line rate）处理。</li>\n<li><strong>功能完善</strong>：支持多种集体通信操作（AllReduce, Reduce 等），支持多种数据类型（16/32/64 位整数和浮点数）。</li>\n<li><strong>易于使用</strong>：与 NVIDIA 的通信库 <strong>NCCL</strong> 无缝集成。开发者在使用 NCCL 时，只需开启相应选项，系统就会自动利用 SHARP 功能，无需修改代码。</li>\n<li><strong>生产就绪</strong>：已经在最新的 InfiniBand（如 NDR）和 NVSwitch 中广泛部署，是许多大型 LLM 训练集群的标准配置。</li>\n</ul>\n<p><strong>8 容错能力 FAULT TOLERANCE</strong></p>\n<p><img alt=\"\" src=\"https://pica.zhimg.com/v2-e6ba0692e7b8f2dc0daf422f17625f48_1440w.jpg\" /></p>\n<p>大语言模型（LLM）的训练具有两大特点：</p>\n<ul>\n<li><strong>时间长</strong>：通常需要持续数周甚至数月。</li>\n<li><strong>规模大</strong>：使用数千甚至上万张 GPU 组成的庞大集群。</li>\n</ul>\n<p>训练系统包含从底层硬件到上层软件的众多复杂组件。</p>\n<p>LLM 训练普遍采用<strong>同步训练 (synchronous training)</strong> 模式，这意味着所有 GPU 必须步调一致。这种模式的致命弱点在于：</p>\n<p><strong>任何一个组件（a single point of failure）发生故障，都会导致整个训练任务暂停。</strong></p>\n<p>因此，为如此漫长且庞大的训练过程提供强大的<strong>容错机制 (fault tolerance mechanisms)</strong>，确保其可靠性，是至关重要的。</p>\n<p><strong>8.1 大语言模型故障分析</strong></p>\n<p>来自工业界的真实数据显示，LLM 训练中的故障极其频繁：</p>\n<ul>\n<li><strong>Meta OPT (175B)</strong>：在 992 张 A100 上训练，两周内中断<strong>超过 40 次</strong>。</li>\n<li><strong>ByteDance (MegaScale)</strong>：在 12,288 张 GPU 上训练，几周内发生<strong>上百次</strong>故障。</li>\n<li><strong>Meta LLaMA3</strong>：在 16,384 张 H100 上训练，54 天内中断 <strong>466 次</strong>。</li>\n</ul>\n<p>这个现象的核心原因是<strong>规模效应</strong>：即使单个节点的故障率很低（如 1.5%），当集群规模扩大到上千个节点时，整个集群每天发生故障的概率会激增到 <strong>80% 以上</strong>。</p>\n<p>故障来源多样，但主要可以归为几类：</p>\n<ol>\n<li>\n<p><strong>硬件故障 (主要元凶，占比约 80%)</strong>：</p>\n</li>\n<li>\n<p><strong>GPU 问题</strong>：最常见，如 CUDA 错误、ECC 内存错误。新一代 GPU（A100/H100）由于技术新、功耗高，初期故障率更高。</p>\n</li>\n<li><strong>网络/互联问题</strong>：如 NVLink 错误、NCCL 超时错误。用户最常看到的“NCCL error”通常根源于硬件问题。</li>\n<li>\n<p><strong>环境问题</strong>：如机房过热导致 GPU 故障。</p>\n</li>\n<li>\n<p><strong>软件问题</strong>：</p>\n</li>\n<li>\n<p>训练框架的 Bug、数据处理流程出错、库依赖冲突等。</p>\n</li>\n<li>\n<p><strong>模型自身的不稳定性</strong>：</p>\n</li>\n<li>\n<p>训练过程中出现<strong>损失尖峰 (Loss Spikes)</strong>、梯度爆炸、数值溢出等问题。</p>\n</li>\n<li>\n<p><strong>外部因素</strong>：</p>\n</li>\n<li>\n<p>数据中心断电、冷却系统故障等。</p>\n</li>\n</ol>\n<p>故障会导致大量的 GPU 资源浪费，主要体现在两个方面：</p>\n<ol>\n<li>\n<p><strong>故障恢复时间 (Failure Recovery)</strong>：</p>\n</li>\n<li>\n<p>传统恢复方式是<strong>回滚到上一个检查点 (Checkpoint)</strong> 并重启。</p>\n</li>\n<li>\n<p>但在重启前，运维人员需要花费大量时间去<strong>定位、诊断和修复</strong>故障硬件，这个过程可能长达数小时甚至数天，导致训练长时间停滞。</p>\n</li>\n<li>\n<p><strong>性能下降 (Performance Degradation)</strong>：</p>\n</li>\n<li>\n<p><strong>掉队者 (Stragglers)</strong>：集群中某些节点因为硬件或网络异常，计算速度变慢。由于同步训练需要等待最慢的那个节点，这会严重拖慢整个集群的训练速度。</p>\n</li>\n</ol>\n<p><strong>一个惊人的案例</strong>：Meta 训练 175B 的 OPT 模型，理论上只需要 25 天，但实际花费了<strong>约 57 天</strong>。这意味着<strong>超过一半 (56%) 的时间都被用于处理各种故障</strong>，凸显了容错问题对资源利用率和训练效率的巨大影响。</p>\n<p><strong>8.2 异常检测</strong></p>\n<p><strong>快速检测和诊断 LLM 训练中的故障</strong>是维持训练稳定和高效的关键。这个过程被称为<strong>异常检测</strong>。</p>\n<p><strong>8.2.1 统计监控 (Statistical Monitoring)</strong></p>\n<p>这是一种<strong>被动式、持续性</strong>的检测方法，通过在训练过程中实时收集和分析各种指标来发现异常。</p>\n<ul>\n<li>\n<p><strong>工作模式</strong>：</p>\n</li>\n<li>\n<p><strong>数据收集</strong>：在每台 GPU 节点上部署一个<strong>监控进程</strong>，负责收集硬件状态、运行时统计数据等信息。</p>\n</li>\n<li><strong>心跳机制</strong>：监控进程定期将收集到的数据作为<strong>心跳消息</strong>发送到一个<strong>中央监控节点</strong>。</li>\n<li>\n<p><strong>分析与告警</strong>：中央节点分析收到的数据。如果某个节点长时间没发心跳，就认为它已宕机；如果某些指标出现异常（如 GPU 利用率突然下降），则触发告警。</p>\n</li>\n<li>\n<p><strong>监控哪些关键指标？</strong></p>\n</li>\n<li><strong>GPU 相关指标 (通过 NVIDIA DCGM 工具收集)</strong>：</li>\n<li><strong>计算利用率</strong>：SM（流多处理器）的利用率、占用率等，反映 GPU 是否在全力工作。</li>\n<li><strong>内存健康</strong>：如 row-remapping 计数，可以指示 GPU 显存是否存在物理缺陷。</li>\n<li><strong>互联带宽</strong>：PCIe 和 NVLink 的流量速率，反映节点内数据传输是否正常。</li>\n<li><strong>网络相关指标</strong>：</li>\n<li><strong>RDMA 流量</strong>：监控 InfiniBand 网络的流量指标。</li>\n<li><strong>连接状态</strong>：如 RDMA 连接的 IP、QP 号，TCP 超时等。</li>\n<li><strong>集体通信活动</strong>：PyTorch 内置的 NCCL flight recorder 和 NCCLX 可以记录 AllReduce 等通信操作的内部状态和耗时，帮助诊断 NCCL 超时等网络问题。</li>\n<li><strong>网络带宽健康检查</strong>：定期在节点对之间测试网络带宽，以发现性能下降的网卡或链路。</li>\n<li><strong>训练日志 (Training Logs)</strong>：分析训练过程中打印的错误日志。</li>\n<li><strong>机器学习辅助</strong>：利用机器学习算法分析历史监控数据，自动检测异常模式。</li>\n</ul>\n<p>Google 的 TPU 超级计算机也采用类似的机制，通过一个名为 healthd 的守护进程实时监控芯片间互联、PCIe 等链路的健康状况。</p>\n<p><strong>8.2.2 主动验证 (Proactive Validation)</strong></p>\n<p>这是一种<strong>主动式、预防性</strong>的检测方法，旨在<strong>训练任务开始前或训练间隙</strong>对系统进行“体检”，以提前发现潜在问题。</p>\n<ul>\n<li><strong>核心思想</strong>：与其等故障发生后再去诊断，不如提前运行一系列测试来验证系统各组件是否健康。</li>\n<li><strong>工作模式与挑战</strong>：</li>\n<li><strong>权衡</strong>：需要在<strong>验证的全面性</strong>和<strong>占用的时间</strong>之间做出权衡。过于全面的测试会占用宝贵的训练时间。</li>\n<li><strong>轻量级测试 (MegaScale)</strong>：开发一套轻量级的测试工具，如节点内网络和 NCCL 测试，快速诊断常见问题。</li>\n<li><strong>分层策略 (Vela)</strong>：采用两级策略。在所有节点上定期运行<strong>轻量级测试</strong>；只有当节点空闲时，才运行更深入、更耗时的<strong>侵入式测试</strong>。</li>\n<li><strong>飞前检查 (Google TPU)</strong>：在用户任务开始前，强制执行一次“飞前检查”，包括端到端的功能测试和硬件健康扫描。</li>\n<li><strong>基准测试套件 (SuperBench)</strong>：提供一个全面的基准测试工具集，可以对单个硬件组件进行评估，并允许用户根据需求选择测试项，以平衡验证时间和潜在风险。</li>\n</ul>\n<p><strong>8.3 基于检查点的恢复 (Checkpoint-Based Recovery)</strong></p>\n<p><strong>检查点 (Checkpointing)</strong> 是 LLM 训练中最基础的容错方法：<strong>定期将模型状态（参数、优化器状态等）保存下来</strong>。一旦发生故障，可以从最近的一个检查点恢复训练，而不是从头开始。</p>\n<p>但这带来一个两难的<strong>困境</strong>：</p>\n<ul>\n<li><strong>频繁保存</strong>：会产生巨大的 I/O 开销，拖慢训练速度。</li>\n<li><strong>不频繁保存</strong>：一旦故障，会丢失大量已完成的训练进度，浪费计算资源。</li>\n</ul>\n<p>本节探讨的各种方法，都是为了解决这个困境，目标是实现<strong>既快又频繁</strong>的检查点保存。</p>\n<p><strong>8.3.1 持久化检查点 (Persistent Checkpointing)</strong></p>\n<p>这类方法将检查点保存在<strong>非易失性存储</strong>上，如 SSD 或云存储，确保数据在系统彻底崩溃后依然存在。保存过程通常分两步：</p>\n<ol>\n<li><strong>快照 (Snapshot)</strong>：将模型状态从 GPU 显存拷贝到 CPU 内存。</li>\n<li><strong>持久化 (Persist)</strong>：将 CPU 内存中的快照写入磁盘或云存储。</li>\n<li>\n<p><strong>同步检查点 (Synchronous Checkpointing)</strong></p>\n</li>\n<li>\n<p><strong>工作方式</strong>：<strong>暂停整个训练过程</strong>，专心执行快照和持久化。</p>\n</li>\n<li><strong>缺点</strong>：在保存期间，所有 GPU 都处于空闲状态，造成严重的资源浪费。这是最简单但最低效的方式。</li>\n</ol>\n<p><strong>b) 快照时暂停的检查点 (Snapshot-Stall Checkpointing)</strong></p>\n<p>这是对同步方式的重大改进，也是目前<strong>主流框架（如 DeepSpeed, Megatron-LM）采用的方案</strong>。</p>\n<ul>\n<li>\n<p><strong>工作方式</strong>：</p>\n</li>\n<li>\n<p><strong>短暂暂停训练</strong>，只为了完成<strong>快照</strong>步骤（将数据从 GPU 拷贝到 CPU）。这个过程通常很快，只需几秒钟。</p>\n</li>\n<li><strong>立即恢复训练</strong>。</li>\n<li>\n<p>在后台<strong>异步地</strong>、<strong>并行地</strong>执行耗时最长的<strong>持久化</strong>步骤（将 CPU 内存的数据写入磁盘），这个过程与后续的训练同时进行，互不干扰。</p>\n</li>\n<li>\n<p><strong>优化</strong>：</p>\n</li>\n<li><strong>分块与多线程 (TorchSnapshot)</strong>：将快照切成小块，用多个 CPU 线程并行写入磁盘，进一步加快持久化速度。</li>\n<li><strong>优化恢复过程 (MegaScale)</strong>：恢复时，只让一个 GPU 从磁盘读取完整的检查点，然后通过高速的内部网络广播给其他 GPU，避免所有 GPU 都去抢占磁盘 I/O。</li>\n</ul>\n<p><strong>C) 异步检查点 (Asynchronous Checkpointing)</strong></p>\n<p>这是最理想但实现也最复杂的方式，目标是<strong>几乎不暂停训练</strong>。</p>\n<ul>\n<li><strong>工作方式</strong>：通过精密的<strong>流水线 (Pipelining)</strong> 设计，将<strong>快照</strong>和<strong>持久化</strong>两个步骤都与训练过程<strong>重叠</strong>起来。</li>\n<li><strong>挑战</strong>：需要非常小心地处理数据依赖和一致性问题，确保在保存参数时，它不被下一轮的梯度更新所“污染”。</li>\n<li><strong>实现</strong>：通常采用<strong>分层流水线 (layer-wise pipelining)</strong> 的方式，在模型计算到某一层时，异步地保存另一层的状态。</li>\n</ul>\n<p><strong>8.3.2 内存中检查点 (In-Memory Checkpointing)</strong></p>\n<p>这类方法认识到，将检查点写入远程磁盘是速度的<strong>主要瓶颈</strong>。</p>\n<ul>\n<li><strong>核心思想</strong>：不把检查点写入慢速的磁盘，而是将其保存在<strong>其他计算节点的 CPU 内存中</strong>，或者专门的<strong>内存存储系统 (如 Redis)</strong> 中。</li>\n<li><strong>优点</strong>：</li>\n<li><strong>速度极快</strong>：内存到内存的传输速度远高于内存到磁盘，I/O 开销大大降低。</li>\n<li><strong>频率极高</strong>：可以实现非常高频率的检查点保存（例如每分钟一次），即使发生故障，也几乎不损失训练进度。</li>\n<li><strong>容错增强 (REFT)</strong>：借鉴 RAID 磁盘阵列的思想，采用<strong>纠删码 (erasure coding)</strong> 技术。即使保存检查点的某个内存节点也宕机了，仍然可以从其他节点的数据中恢复出完整的检查点。</li>\n<li><strong>局限性</strong>：无法应对整个集群断电等灾难性故障。因此，最佳实践是采用<strong>混合策略</strong>：</li>\n<li><strong>高频率</strong>地保存到<strong>内存</strong>，用于应对常规的单点故障。</li>\n<li><strong>低频率</strong>地保存到<strong>持久化存储</strong>，用于应对灾难性故障。</li>\n</ul>\n<p><strong>8.4 无需检查点的恢复 (Checkpoint-Free Recovery)</strong></p>\n<p>传统的容错方法是“停止-回滚-重启”，即训练暂停，从上一个检查点恢复，这个过程非常耗时。</p>\n<p><strong>无需检查点的恢复 (Checkpoint-Free Recovery)</strong> 是一种更高级的容错策略，其核心思想是：<strong>当故障发生时，不暂停和回滚训练，而是动态地修复问题，让训练以极小的中断甚至无中断地继续下去</strong>。</p>\n<p>这依赖于强大的<strong>自动故障检测机制</strong>来及时发现问题。</p>\n<p><strong>8.4.1 实时迁移 (Live Migration)</strong></p>\n<ul>\n<li><strong>利用的资源</strong>：数据并行训练中天然存在的<strong>模型冗余</strong>。在数据并行下，我们本来就有多份完全相同的模型副本在不同的 GPU 组上运行。</li>\n<li>\n<p><strong>工作流程</strong>：</p>\n</li>\n<li>\n<p>当某个节点（GPU）发生故障时，系统自动检测到故障。</p>\n</li>\n<li>系统动态地<strong>重构集群</strong>，例如将故障节点踢出，并从资源池中拉取一个健康的备用节点。</li>\n<li>从一个<strong>健康的、正在运行的</strong>模型副本那里，将<strong>最新的、实时的</strong>模型状态拷贝到这个新加入的备用节点上。</li>\n<li>\n<p>训练在新配置的集群上继续进行。</p>\n</li>\n<li>\n<p><strong>关键点</strong>：这种方法避免了从慢速的磁盘加载陈旧的检查点，而是直接从<strong>内存中的“活”数据</strong>进行恢复，因此速度快得多，中断时间极短。</p>\n</li>\n</ul>\n<p><strong>8.4.2 模块冗余 (Module Redundancy)</strong></p>\n<ul>\n<li><strong>核心思想</strong>：这是一种“热备份”策略。它不是在故障后才去恢复状态，而是在正常训练时就准备好了备胎。</li>\n<li>\n<p><strong>工作流程</strong>：</p>\n</li>\n<li>\n<p>在正常训练时，系统会利用一些<strong>空闲的计算资源</strong>（例如流水线并行中的“气泡”时间），去<strong>冗余地</strong>执行一部分计算。这个“冗余模块”就像一个影子，实时跟随着“主模块”的状态。</p>\n</li>\n<li>当主计算模块发生故障时，系统检测到问题。</li>\n<li>\n<p>系统<strong>立即将原本要发往故障模块的计算任务，重定向（route）到这个已经准备就绪的冗模块</strong>。</p>\n</li>\n<li>\n<p><strong>关键点</strong>：恢复动作不是<strong>迁移状态 (migrating state)</strong>，而是<strong>重定向计算 (rerouting computation)</strong>。因为冗余模块一直在同步运行，所以切换几乎是<strong>瞬时</strong>的，可以实现真正的“无中断”恢复。这是比实时迁移更极致的容错方案。</p>\n</li>\n</ul>"
    }
  ],
  "latest_overview": [
    {
      "title": "",
      "body_html": "<h1>从“能用”到“能打”：一场43天的推理性能突围战，正在改写2026年的AI算力版图</h1>\n<ul>\n<li>来源平台: <strong>zhihu</strong>（知乎专栏文章）</li>\n<li>原文链接: <a href=\"https://zhuanlan.zhihu.com/p/2048365804610237691\">https://zhuanlan.zhihu.com/p/2048365804610237691</a></li>\n<li>作者: 韩流</li>\n</ul>\n<hr />\n<p>从“能用”到“能打”：一场43天的推理性能突围战，正在改写2026年的AI算力版图</p>\n<h1>从“能用”到“能打”：一场43天的推理性能突围战，正在改写2026年的AI算力版图</h1>\n<p>作者: 韩流, 赞: 1</p>\n<p>在工程领域，过程中积累的经验往往与最终结果同样重要。仅仅关注发布当天的性能快照，是在为一棵树而放弃整片森林。</p>\n<p>2026年4月25日，DeepSeek V4正式发布。那一天，开源社区沸腾了——1.6T参数，全新的压缩稀疏注意力机制，100万上下文窗口。但真正让我坐在屏幕前连续追踪了43天的，不是这些华丽的参数，而是随后三周里发生的事情。</p>\n<p>一个模型发布时的性能，和它三周后的性能，可以是天壤之别。</p>\n<p>SemiAnalysis旗下的开源工程团队InferenceX做了一件在我看来极具“价值投资精神”的事：他们从Day 0开始，用完全开源的镜像和配置，在不同的硬件SKU上持续记录了DeepSeek V4 Pro推理性能的每一次跃迁。今天，我想把这份跨越43天的数据地图，摊开来和各位读者一起仔细看看。</p>\n<p>核心情报：一句话看懂海外博主到底爆了什么猛料？</p>\n<p>DeepSeek V4发布43天内，不同硬件平台的推理性能呈现出“冰火两重天”的迭代图景。</p>\n<p>最戏剧性的对比来自AMD MI355X——从发布当天几乎不可用的“残废”状态，到第26天性能飙升100倍以上；</p>\n<p>而华为昇腾950DT意外地成为唯一一个在Day 0就提供了一流原生支持的“非英伟达”平台，标志着中国AI基础设施栈的成熟度实现了质的飞跃。</p>\n<p>与此同时，英伟达自家的TensorRT-LLM反而因一个低级Bug在发布后九天里无法正常运行DeepSeek V4 Pro——CUDA护城河的光环上，第一次出现了可以丈量的裂痕。</p>\n<p><img alt=\"\" src=\"https://picx.zhimg.com/v2-c3394a072c73503eb448e672d1e4e93b_1440w.jpg\" />  </p>\n<p>这不仅仅是几块芯片的跑分对比。这背后折射的是三个深刻的变化：开源模型正在重构硬件适配的游戏规则；算力“主权化”正在以比大多数人预期更快的速度演进；推理性能的代际跃迁已经不再是芯片发布时的静态指标，而是一个动态的软件工程马拉松。</p>\n<p>背景补完：这个观点背后的技术或金融大盘究竟是什么？</p>\n<p>要理解这份43天追踪报告的份量，我们得先拉远镜头，看看2026年年中整个AI算力大盘的四个底座：</p>\n<p>首先，是“推理为王”时代的全面到来。 如果说2024-2025年大家还在为训练集群的千卡万卡规模疯狂，那么进入2026年，产业重心已经不可逆转地转向了推理。DeepSeek V4这种1.6T参数的MoE（混合专家）模型，其单次推理的KV缓存占用、专家路由调度、通信拓扑复杂度，对底层硬件和软件栈提出了地狱级的挑战。一个模型“跑起来”和“跑得省钱”之间，隔着可能是一整个商业模式的生死线。</p>\n<p>其次，是开源模型与闭源引擎生态的深度绑定。 DeepSeek V4发布后，vLLM和SGLang这两个开源推理引擎在第一天就原生支持了CUDA平台。这本身就说明了问题——当全球的开发者都基于vLLM和SGLang构建服务时，一个硬件厂商如果不在Day 0就融入这个生态，就等于在AI服务商选型的第一轮就被淘汰了。这也是为什么Inferact（vLLM背后的商业实体）和RadixArk（SGLang背后的商业实体）能各自融到数亿美元——他们已经是事实上的行业基础设施。</p>\n<p>再次，是“后CUDA时代”的多极竞争。 美国对华芯片出口管制的持续加码，客观上将中国市场逼成了一条独立的算力演进路线。华为昇腾的量产规模在2026年已达到一个临界点——SemiAnalysis的加速器模型显示，华为每季度的Ascend 950系列出货量正在快速追赶AMD的MI系列。当华为成为DeepSeek V4发布时仅有的两个Day 0就绪的软件栈之一（另一个是CUDA），这已经不是简单的“替代”，而是“并行”。更令人玩味的是，CANN（华为的神经网络计算架构）在2025年8月宣布开源，这个时间点的战略意图已经昭然若揭。</p>\n<p><img alt=\"\" src=\"https://pic1.zhimg.com/v2-47d02f582f0be3ffb98bd452dac6529e_1440w.jpg\" />  </p>\n<p>最后，必须正视一个“房间里的大象”：英伟达的TensorRT-LLM翻车了。 一个硬编码的隐藏尺寸常量（4096），在新模型隐藏尺寸变为7168时触发了保护错误。Nvidia工程师的“修复”方式居然是直接移除保护机制，导致内核在长达一周的时间里用4096的配置去跑7168的张量——不会立即崩溃，但会静默地破坏隐藏状态，生成无效结果。这个问题从发现到修复，前后花了超过9天时间。这不应该被看作一个偶然的Bug，而是一个信号：当模型架构快速迭代时，依赖特定工程师团队“手动优化”的闭源引擎，其响应速度和鲁棒性正在被开源社区的全域协作模式甩开。</p>\n<p>逻辑拆解：这条情报为什么会直接影响未来的商业走向与股价走势？</p>\n<p>这43天的性能追踪，本质上揭示了三条正在重塑AI芯片估值逻辑的暗线：</p>\n<p>暗线一：CUDA的护城河从“不可逾越”退化为“先发窗口期”</p>\n<p>曾几何时，CUDA的“Day 0支持”被视为英伟达的核心壁垒——新模型一出，只有N卡能第一时间跑起来。但DeepSeek V4的发布打破了这一叙事。华为昇腾在Day 0就提供了可生产部署的推理支持，而AMD虽然在Day 0“翻车”，但通过26天内100倍的性能提升，展示了一个关键事实：只要有足够强的工程领导力和上游社区协作，软件劣势是可以被追赶的。</p>\n<p>更值得深思的是TensorRT-LLM的翻车。原生vLLM和SGLang因为在DeepSeek V3时代就已经适配了类似架构，所以在V4发布时几乎“开箱即用”。而TensorRT-LLM这个英伟达自己维护的“王牌引擎”，反而因为其代码库相对封闭、依赖特定团队维护，在一个并不算复杂的适配问题上卡了9天。当开源社区成为模型适配的“默认主力”时，硬件厂商自研引擎的战略价值正在被重新评估——除非你能证明自己在特定场景下能拉开指数级的性能差距，否则客户为何要放弃开源的灵活性，去绑定一个可能延迟9天的闭源方案？</p>\n<p>暗线二：性能的“时间价值”正在被重新定价</p>\n<p>如果只看Day 0的性能数据，你可能会得出“AMD MI355X是废物”的结论——单个用户每秒只能处理1-2个Token，远低于人类阅读速度，根本无法商用。但到第26天，MI355X在某些低交互级别下的DeepSeek V4 Pro推理性能甚至超越了H200。这100倍的提升几乎全部来自软件层：将PyTorch的回退路径替换为真正的AITER、Triton、TileLang内核；引入AITER mHC内核、FP4权重MoE、融合哈希拓扑等。</p>\n<p>这告诉我们什么？硬件采购决策如果仅基于发布当天的Benchmark，就像只看一家公司的最新季报而不看其连续三年的ROIC趋势——你会在低点卖出，在高点追涨。对于云厂商和企业采购者来说，正确的策略不再是“买当下最快的硬件”，而是“买软件栈迭代速度最快的生态”。GB300 NVL72之所以遥遥领先（在50 tok/s/用户的交互条件下，每百万输出Token成本仅0.156美元），不仅仅是因为硬件规格高，而是因为它通过NVL72的机架级NVLink域，让Wide Expert Parallelism（宽专家并行）可以在不经过慢速横向扩展网络的情况下完成所有MoE调度——这是一个软硬件协同设计的系统级胜利。</p>\n<p>暗线三：每兆瓦Token产出率正在成为核心KPI</p>\n<p>InferenceX团队提出了一个我深以为然的分析维度：用“每兆瓦公用电力对应的Token吞吐量”来衡量推理集群的投资回报率。这不是一个技术指标，而是一个资本配置指标。</p>\n<p>B200在Day 0时，每兆瓦产出约30万Token/秒（在50 tok/s/用户的交互条件下）。到6月5日，这个数字提升到接近50万——约1.7倍的提升，全部来自软件优化（MegaMoE分组FP4 GEMM、更宽的EP、调度器调整），而硬件功耗完全没变。这意味着，同样的电力预算、同样的机房空间、同样的散热系统，仅仅因为软件迭代，你的计费Token产出增加了70%。对于任何一家正在规划推理集群的厂商来说，忽视软件迭代的“爬坡效应”，就意味着可能多花了70%的资本开支。</p>\n<p>价值投资视角下的深度洞察：普通人在这场博弈中应该避开哪些“叙事陷阱”？</p>\n<p>作为一个在半导体周期里摸爬滚打了二十年的人，每次看到这种级别的情报时，我脑子里第一个浮出的问题永远是：“市场会因为什么故事而错误定价？”</p>\n<p>以下是当前市场上正在膨胀的若干叙事陷阱：</p>\n<p>陷阱一：“硬件决定论”——只看峰值算力，不看软件迭代斜率 很多分析报告还在用“TFLOPS/美元”这种静态指标来对比B300、MI355X和Ascend 950DT。但DeepSeek V4这43天的数据已经打脸了：最终性能 = 硬件上限 ✖️ 软件成熟度曲线。MI355X的硬件上限不低，但Day 0的成熟度近乎为零，所以实际性能惨不忍睹。26天后，当成熟度曲线攀セン，它的竞争力才开始显现。对于投资者来说，正确的问法不是“哪块芯片最强”，而是“在未来6-12个月内，哪家公司的软件栈会以最快速度收敛到其硬件的理论极限”。从这个角度看，AMD虽然Day 0落后，但其在SGLang上的追赶速度反而可能是最被低估的故事——如果他们能在2026年下半年按计划将ATOM引擎投入生产，并在原生vLLM上补课，那么MI355X的全生命周期投资回报可能远高于当前市场预期。</p>\n<p>陷阱二：“开源模型会让英伟达失去议价权”——这是一个伪命题 没错，华为昇腾在Day 0就支持了DeepSeek V4，这是里程碑事件。但注意一点：当前阶段，最高吞吐量和最低单位成本仍然属于GB300 NVL72——一款极昂贵、极复杂、也极强大的机架级系统。开源模型降低的是软件栈的迁移成本，但它并没有改变这样一个事实：在绝对性能的顶端，系统级设计（NVLink域、MegaMoE的调度粒度、通信计算融合的深度）的领先是难以用软件来弥补的。英伟达的护城河正在从“CUDA的软件锁定”转向“机架级系统的工程复杂度锁定”，后者可能更难被跨越。</p>\n<p>陷阱三：“中国芯片已经在AI推理上追平了”——言之过早 华为Ascend 950DT在Day 0提供生产级推理支持，这是事实。DeepSeek的部分官方API从发布第一天就运行在华为平台上，这也是事实。但需要看到的是，这种“Day 0就绪”目前主要还是在中国国内市场闭环中实现的——华为CANN栈的战略重心是服务好中国AI生态，而非与英伟达在拉美或欧洲的云数据中心正面交锋。换句话说，这是一种“城墙内的并行宇宙”：在特定管制环境、特定模型、特定优化目标的组合下，华为已经构建了可商业化部署的能力；但如果将其放到全球公有云的通用推理服务场景中，它在多租户、混合模型、动态调度、长期运维稳定性等方面仍有一段路要走。</p>\n<p>终局推演与思考</p>\n<p>查理·芒格说过，理解一个生意的最好方式，是问“什么东西会在五年后不变”。在AI推理这个瞬息万变的竞技场里，我认为有几样东西是相对不变的：</p>\n<p>第一，拥有开源社区“默认支持”地位的推理引擎会越来越值钱。 vLLM和SGLang已经成为事实上的行业标准。任何试图用闭源引擎来“锁客”的硬件厂商，都会发现自己是在逆水行舟。Inferact和RadixArk这类公司的长期价值，可能比很多硬件制造商更值得关注。</p>\n<p>第二，能效比（Token/焦耳）会比峰值性能更重要。 随着推理工作负载大规模膨胀，电力和散热正在成为真正的物理约束。GB300 NVL72的单位成本优势，本质上来自它在同一个NVLink域内完成了专家调度，避免了跨节点通信的能耗浪费。未来的推理芯片设计，决胜点将不再是单纯的矩阵乘法速度，而是“每焦耳完成多少次完整的MoE解码步骤”。</p>\n<p>第三，Day 0支持能力正在从“加分项”变成“入场券”。 如果一个硬件平台不能在主流开源模型发布的第一时间提供可用的推理性能，它连被评估的资格都没有。这对正在追赶的芯片厂商意味着：软件团队必须从“跟随补丁”模式转向“预研共建”模式——在模型还在训练阶段时就开始适配。华为之所以能在DeepSeek V4上实现Day 0支持，很可能是早在前期就已经与DeepSeek团队有了深度的技术协同。这种“协同设计”的紧密程度，将是未来芯片竞争的一个核心变量。</p>\n<p>最后，我想用InferenceX团队在报告末尾放的那句意味深长的话来收尾：</p>\n<p>“赋予Ascend 950内部代号的那个圣经故事，最终以巨人歌利亚面朝下倒地而告终。但故事里的歌利亚只是静静地站着；而英伟达这个‘歌利亚’，却在不断移动——每年推出新架构，并持续改进旧架构。华为已经证明了它能在发布之初用弹弓击中目标；至于能否击倒一个移动的巨人，还有待观察。”</p>\n<p>这或许是对2026年AI算力战争最精准的注脚——战争没有终局，只有不断移动的目标。而在这个过程中，持续追踪软件栈的迭代斜率，将比崇拜任何一块芯片的出厂参数，更接近商业的本质。</p>\n<p>资本市场永远不缺宏大的叙事，缺的是穿透迷雾的常识。</p>\n<p>这里的每一篇文章，都是对全球最前沿科技情报的一次深度脱水与逻辑复盘。如果你也厌倦了国内信息流的二手搬运，如果你也相信‘不熟不做’的商业本质，欢迎点击上方名片关注。</p>\n<p>欲阅读 SemiAnalysis 关于 DeepSeekV4 1.6T 从第 0 天到第 43 天的性能变化 的英文深度原作，请点击文章左下角阅读原文。</p>"
    }
  ],
  "graph": {
    "nodes": [
      {
        "id": "ps",
        "x": 50,
        "y": 80,
        "category": "training_platform"
      },
      {
        "id": "tensorflow",
        "x": 150,
        "y": 80,
        "category": "training_platform"
      },
      {
        "id": "horovod",
        "x": 250,
        "y": 60,
        "category": "training_platform"
      },
      {
        "id": "ray",
        "x": 250,
        "y": 120,
        "category": "training_platform"
      },
      {
        "id": "pytorch",
        "x": 280,
        "y": 90,
        "category": "training_platform"
      },
      {
        "id": "gpipe",
        "x": 280,
        "y": 50,
        "category": "training_platform"
      },
      {
        "id": "megatron_lm",
        "x": 350,
        "y": 90,
        "category": "training_platform"
      },
      {
        "id": "pipedream",
        "x": 350,
        "y": 50,
        "category": "training_platform"
      },
      {
        "id": "deepspeed",
        "x": 450,
        "y": 90,
        "category": "training_platform"
      },
      {
        "id": "alpa",
        "x": 420,
        "y": 130,
        "category": "training_platform"
      },
      {
        "id": "colossal_ai",
        "x": 520,
        "y": 130,
        "category": "training_platform"
      },
      {
        "id": "megascale",
        "x": 550,
        "y": 90,
        "category": "training_platform"
      },
      {
        "id": "nnscaler",
        "x": 550,
        "y": 130,
        "category": "training_platform"
      },
      {
        "id": "axlearn",
        "x": 650,
        "y": 100,
        "category": "training_platform"
      },
      {
        "id": "protrain",
        "x": 650,
        "y": 80,
        "category": "training_platform"
      },
      {
        "id": "boost",
        "x": 650,
        "y": 60,
        "category": "training_platform"
      },
      {
        "id": "tessera",
        "x": 700,
        "y": 90,
        "category": "training_platform"
      },
      {
        "id": "mlflow",
        "x": 250,
        "y": 220,
        "category": "experiment_mgmt"
      },
      {
        "id": "optuna",
        "x": 350,
        "y": 210,
        "category": "experiment_mgmt"
      },
      {
        "id": "dvc",
        "x": 450,
        "y": 210,
        "category": "experiment_mgmt"
      },
      {
        "id": "wandb",
        "x": 450,
        "y": 230,
        "category": "experiment_mgmt"
      },
      {
        "id": "flashinfer_bench",
        "x": 650,
        "y": 210,
        "category": "experiment_mgmt"
      },
      {
        "id": "sagemaker_agent",
        "x": 650,
        "y": 230,
        "category": "experiment_mgmt"
      },
      {
        "id": "tfx",
        "x": 120,
        "y": 310,
        "category": "mlops_lifecycle"
      },
      {
        "id": "kubeflow",
        "x": 250,
        "y": 310,
        "category": "mlops_lifecycle"
      },
      {
        "id": "feast",
        "x": 350,
        "y": 310,
        "category": "mlops_lifecycle"
      },
      {
        "id": "tf_serving",
        "x": 120,
        "y": 400,
        "category": "inference_system"
      },
      {
        "id": "kserve",
        "x": 380,
        "y": 400,
        "category": "inference_system"
      },
      {
        "id": "vllm",
        "x": 520,
        "y": 400,
        "category": "inference_system"
      },
      {
        "id": "raidserve",
        "x": 650,
        "y": 380,
        "category": "inference_system"
      },
      {
        "id": "superinfer",
        "x": 650,
        "y": 400,
        "category": "inference_system"
      },
      {
        "id": "opentela",
        "x": 650,
        "y": 420,
        "category": "inference_system"
      },
      {
        "id": "djinn",
        "x": 700,
        "y": 400,
        "category": "inference_system"
      }
    ],
    "edges": [
      {
        "from": "ps",
        "to": "tensorflow",
        "label": "数据流图抽象"
      },
      {
        "from": "tensorflow",
        "to": "horovod",
        "label": "Ring AllReduce"
      },
      {
        "from": "tensorflow",
        "to": "ray",
        "label": "通用计算引擎"
      },
      {
        "from": "tensorflow",
        "to": "gpipe",
        "label": "流水线并行"
      },
      {
        "from": "pytorch",
        "to": "megatron_lm",
        "label": "张量并行"
      },
      {
        "from": "gpipe",
        "to": "pipedream",
        "label": "异步流水线"
      },
      {
        "from": "megatron_lm",
        "to": "deepspeed",
        "label": "显存优化"
      },
      {
        "from": "ray",
        "to": "alpa",
        "label": "自动并行"
      },
      {
        "from": "alpa",
        "to": "colossal_ai",
        "label": "统一系统"
      },
      {
        "from": "alpa",
        "to": "nnscaler",
        "label": "约束引导"
      },
      {
        "from": "deepspeed",
        "to": "megascale",
        "label": "万卡扩展"
      },
      {
        "from": "deepspeed",
        "to": "protrain",
        "label": "内存管理"
      },
      {
        "from": "pytorch",
        "to": "axlearn",
        "label": "硬件无关"
      },
      {
        "from": "megatron_lm",
        "to": "boost",
        "label": "低秩优化"
      },
      {
        "from": "megascale",
        "to": "tessera",
        "label": "MoE优化"
      },
      {
        "from": "mlflow",
        "to": "optuna",
        "label": "超参搜索"
      },
      {
        "from": "mlflow",
        "to": "dvc",
        "label": "数据版本"
      },
      {
        "from": "mlflow",
        "to": "wandb",
        "label": "云端协作"
      },
      {
        "from": "mlflow",
        "to": "flashinfer_bench",
        "label": "LLM基准"
      },
      {
        "from": "wandb",
        "to": "sagemaker_agent",
        "label": "智能代理"
      },
      {
        "from": "tfx",
        "to": "kubeflow",
        "label": "云原生"
      },
      {
        "from": "kubeflow",
        "to": "feast",
        "label": "特征存储"
      },
      {
        "from": "tf_serving",
        "to": "kserve",
        "label": "Serverless"
      },
      {
        "from": "kserve",
        "to": "vllm",
        "label": "PagedAttention"
      },
      {
        "from": "vllm",
        "to": "raidserve",
        "label": "高可用"
      },
      {
        "from": "vllm",
        "to": "superinfer",
        "label": "SLO感知"
      },
      {
        "from": "vllm",
        "to": "opentela",
        "label": "去中心化"
      },
      {
        "from": "kserve",
        "to": "djinn",
        "label": "GPU解耦"
      }
    ],
    "milestones": [
      "ps",
      "deepspeed",
      "vllm"
    ]
  },
  "algos": [
    {
      "id": "ps",
      "num": 1,
      "name": "Parameter Server",
      "fullName": "参数服务器 (Parameter Server)",
      "year": "2014",
      "org": "CMU/Baidu",
      "parent": "—",
      "paperUrl": "https://proceedings.neurips.cc/paper/2014/hash/d5cfead94f5350c12c322b5b664544c1-Abstract.html",
      "projectUrl": "",
      "category": "training_platform",
      "motivation": "提出异步分布式参数更新框架，奠定分布式ML基础",
      "summary": "Parameter Server 把全局模型参数抽象成分片的分布式 key-value 向量/矩阵，并让 worker 通过异步 `push`/`pull` 交换局部梯度，解决超大规模稀疏机器学习中参数太大、网络太贵、同步太慢的问题。论文进一步用可配置一致性和通信过滤器，把系统吞吐与优化收敛之间的折中显式暴露给算法设计者。",
      "keyPoints": [
        "共享参数表示为有序 <code>(key, value)</code> 对，可被视为稀疏向量或矩阵，并按 key range 分片到多个 server",
        "worker 只保存训练数据分片和当前 mini-batch 需要的 working set，通过 range <code>pull</code> 获取参数、通过 <code>push</code> 上传梯度或统计量",
        "task dependency graph 支持 sequential、eventual、bounded delay 等一致性模型，允许用最大延迟 <span class=\"kb-math kb-math-inline\">\\tau</span> 控制 stale update",
        "user-defined filters 在通信前过滤或压缩数据，包括 significantly modified、random skip、KKT、key caching 和 compression",
        "Delayed Block Proximal Gradient Method 按参数块异步更新非凸非光滑目标，并给出有界延迟下的收敛条件",
        "论文在 <span class=\"kb-math kb-math-inline\">636\\text{TB}</span> 点击预估数据、<span class=\"kb-math kb-math-inline\">170</span> billion 样本、<span class=\"kb-math kb-math-inline\">65</span> billion 特征和 <span class=\"kb-math kb-math-inline\">1000</span> 台机器上展示稀疏 LR 的可扩展性"
      ],
      "detail": "<p><img alt=\"Parameter Server 多服务器分片示意\" src=\"https://d2l.ai/_images/ps-multips.svg\" />\n<em>图：多 Parameter Server 按参数分片提供聚合带宽；来源为 Dive into Deep Learning 的 Parameter Servers 章节，用于补充说明论文中的 worker/server 分片抽象。</em></p>\n<pre><code class=\"language-python\"># Delayed Block Proximal Gradient on a Parameter Server\nfor t in range(1, T + 1):\n    block = scheduler.pick_parameter_block()\n    scheduler.issue_task(block, dependency=f&quot;all iterations &lt;= {t - tau} done&quot;)\n\n    # Worker r: data is local, parameters are remote and sharded.\n    for worker in workers.parallel():\n        worker.wait_until_finished(before=t - tau)\n        keys = active_keys(worker.data, block)\n        w_local = ps.pull(keys, filters=[&quot;significantly_modified&quot;])\n        grad, scale = worker.compute_gradient_and_coordinate_lr(w_local, block)\n        ps.push(keys, grad, scale, filters=[&quot;KKT&quot;, &quot;key_cache&quot;, &quot;compress&quot;])\n\n    # Servers aggregate sparse updates and apply the block proximal step.\n    for server in parameter_servers.parallel():\n        g_t, u_t = server.aggregate(block)\n        U = diag(u_t)\n        w[block] = generalized_prox(w[block] - gamma_t * inv(U) @ g_t, U, gamma_t)\n</code></pre>\n<p>论文的基本优化问题写成</p>\n<div class=\"kb-math kb-math-display\">\\min_w F(w), \\quad F(w)=f(w)+h(w), \\quad w\\in\\mathbb{R}^p</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">f</span> 是可微但不一定凸的损失，<span class=\"kb-math kb-math-inline\">h</span> 是可能非光滑、但按 block 可分的正则项。Parameter Server 的系统抽象不是“把 SGD 搬到多台机器上”这么简单，而是承认真实工业数据会同时遇到三个约束：数据可达 TB/PB，参数规模可达 <span class=\"kb-math kb-math-inline\">10^9</span> 到 <span class=\"kb-math kb-math-inline\">10^{12}</span>，而 datacenter 网络带宽远小于内存带宽。把参数放在 server group 中分片保存后，worker 不再复制完整模型，只根据本地样本涉及的 key 拉取 working set，这对广告、文本、推荐这类极稀疏特征尤其关键。</p>\n<p><code>push</code>/<code>pull</code> 接口的设计重点是“范围化”和“线性代数化”。普通 key-value store 如果逐 key 发送 float，会被 RPC 元数据和网络包开销淹没；论文把连续 key range 当作稀疏向量段传输，server 端直接做梯度求和、近端更新或用户定义函数。对一个 worker <span class=\"kb-math kb-math-inline\">r</span>，标准分布式次梯度循环可抽象为先拉取 <span class=\"kb-math kb-math-inline\">w_r^{(t)}</span>，计算本地梯度 <span class=\"kb-math kb-math-inline\">g_r^{(t)}</span>，再把 <span class=\"kb-math kb-math-inline\">\\sum_r g_r^{(t)}</span> 交给 server 聚合更新：</p>\n<div class=\"kb-math kb-math-display\">w^{(t+1)} = w^{(t)} - \\eta_t\\left(\\sum_{r=1}^{m} g_r^{(t)} + \\partial h(w^{(t)})\\right)</div>\n<p>一致性是 Parameter Server 最有工程价值的旋钮。Sequential consistency 等价于 BSP，每个任务必须等前一个任务完成，语义最干净但慢 worker 会制造 barrier；eventual consistency 允许任务尽快并发，吞吐高但 stale gradient 可能拖慢收敛；bounded delay 用 <span class=\"kb-math kb-math-inline\">\\tau</span> 限制最大落后步数，只有所有 <span class=\"kb-math kb-math-inline\">t-\\tau</span> 之前的任务完成后才启动新任务。论文的核心判断是：机器学习优化通常能容忍有限误差，所以系统不必用数据库式强一致牺牲吞吐。</p>\n<p>通信过滤器进一步把“哪些值值得同步”交给算法。KKT filter 针对 <span class=\"kb-math kb-math-inline\">\\ell_1</span>-regularized logistic regression：若某坐标当前 <span class=\"kb-math kb-math-inline\">w_k=0</span>，且梯度近似满足 <span class=\"kb-math kb-math-inline\">|\\hat g_k|\\le \\lambda-\\delta</span>，软阈值近端算子仍会把它压回 0，于是该坐标梯度没有必要传输。Key caching filter 则利用 range 内 key 经常不变这一事实，双方缓存 key 列表后只传 value 和签名；compression filter 再对零值、小整数或低精度 float 做压缩。论文报告这些过滤器叠加后显著降低 server/worker 的网络流量，这也是它能在稀疏 LR 上逼近“通信几乎不是瓶颈”的原因。</p>\n<p>Delayed Block Proximal Gradient Method 把上面的系统能力写成一个优化算法：scheduler 每轮选择参数块 <span class=\"kb-math kb-math-inline\">b_t</span>，worker 在有界 stale 模型上计算 block gradient 和坐标级学习率，server 聚合后解广义近端算子</p>\n<div class=\"kb-math kb-math-display\">\\operatorname{Prox}^{U}_{\\gamma}(x)\n= \\arg\\min_y \\left\\{h(y)+\\frac{1}{2\\gamma}\\|y-x\\|^2_U\\right\\}</div>\n<p>并在 block Lipschitz 条件下给出学习率限制</p>\n<div class=\"kb-math kb-math-display\">\\gamma_t \\le \\frac{M_t}{L_{\\mathrm{var}}+\\tau L_{\\mathrm{cov}}+\\epsilon}</div>\n<p>这里 <span class=\"kb-math kb-math-inline\">\\tau</span> 越大，stale update 带来的 cross-block 误差越大，因此理论上需要更保守的学习率；但如果 block 划分能让特征相关性较低，<span class=\"kb-math kb-math-inline\">L_{\\mathrm{cov}}</span> 会变小，系统就能用更大的并发换取吞吐。</p>\n<p>与 MapReduce/Spark 式迭代批处理相比，Parameter Server 的模型状态是在线、可变、可分片的，不需要每一轮重新物化完整模型；与纯 Hogwild 式共享内存异步更新相比，它明确处理跨机器网络、分片、延迟、过滤、容错和弹性扩容。后续 TensorFlow、MXNet、Angel、PS-Lite 以及多种推荐系统训练平台，都继承了“worker 负责数据并行计算、server/kv-store 负责共享参数状态”的基本思路。</p>\n<div class=\"key-point\">💡 关键：Parameter Server 的贡献不只是一个通信拓扑，而是把大规模 ML 的优化容忍度转化成系统接口：一致性可放松、通信可过滤、参数可分片、状态可恢复。</div>",
      "quiz": {
        "q": "Parameter Server 中 bounded delay 一致性模型的主要作用是什么？",
        "options": [
          "要求所有 worker 每一步严格同步，完全消除 stale gradient",
          "允许任务并发执行，但限制参数版本最多落后 τ 步",
          "把所有参数复制到每个 worker，减少 server 负载",
          "只对 GPU kernel 做自动融合，不影响分布式语义"
        ],
        "answer": 1,
        "explain": "bounded delay 用 τ 控制 stale update 的最大延迟，在吞吐和收敛稳定性之间折中；τ=0 接近同步，τ=∞ 接近 eventual consistency。"
      }
    },
    {
      "id": "tensorflow",
      "num": 2,
      "name": "TensorFlow",
      "fullName": "TensorFlow",
      "year": "2016",
      "org": "Google Brain",
      "parent": "ps",
      "paperUrl": "https://www.usenix.org/conference/osdi16/technical-sessions/presentation/abadi",
      "projectUrl": "",
      "category": "training_platform",
      "motivation": "基于数据流图的异构分布式系统，继承DistBelief",
      "summary": "TensorFlow 提出一个有状态 dataflow graph 运行时，用同一张图表达张量计算、变量状态、输入流水线、自动微分和跨设备通信，解决 DistBelief 难以同时支持研究灵活性、异构设备和大规模分布式执行的问题。它把参数服务器的可变状态能力上升为通用图编程模型，让训练、推理和部署共享一套执行语义。",
      "keyPoints": [
        "以 directed dataflow graph 表达整个 ML 程序：节点是 <code>Operation</code>，边传递 <code>Tensor</code>，特殊边表示 control dependency",
        "<code>Variable</code>、<code>Queue</code>、<code>Save</code>、<code>Restore</code> 等有状态节点让图既能表达纯计算，也能表达参数更新、输入队列和 checkpoint",
        "运行时根据隐式/显式约束做 device placement，并把跨设备边改写为 <code>Send</code>/<code>Recv</code> 节点",
        "Session <code>Run</code> 根据 feed/fetch 裁剪出需要执行的子图，支持同一图上的 partial execution 和 concurrent steps",
        "自动微分在前向图上追加反向图，支持普通算子、条件分支和循环控制流的梯度计算",
        "大模型训练通过 sharded variables、<code>Part</code>/<code>Gather</code>/<code>Stitch</code> 和稀疏更新，把 parameter server 能力嵌入通用图中"
      ],
      "detail": "<p><img alt=\"TensorFlow 官方文档中的计算图示意\" src=\"https://www.tensorflow.org/guide/images/intro_to_graphs/two-layer-network.png\" />\n<em>图：TensorFlow 官方文档中用 TensorBoard 可视化的两层网络计算图；OSDI 论文的核心图是数据流训练流水线，本文用官方图补充展示 op/tensor 图结构。</em></p>\n<pre><code class=\"language-python\"># TensorFlow 1.x/OSDI 论文中的核心执行路径伪代码\ngraph = Graph()\nx = graph.placeholder(shape=[batch, features])\ny = graph.placeholder(shape=[batch, labels])\nW = graph.variable(initializer=random_uniform())\nloss = softmax_cross_entropy(matmul(relu(matmul(x, W1) + b1), W2) + b2, y)\ngrads = add_symbolic_gradients(loss, variables=graph.variables)\ntrain_op = optimizer_update(graph.variables, grads)\n\nrun_request = SessionRun(feeds={x: batch_x, y: batch_y}, fetches=[train_op, loss])\nsubgraph = prune_to_transitive_closure(graph, run_request.feeds, run_request.fetches)\nplacement = place_ops(subgraph, devices=[&quot;CPU&quot;, &quot;GPU&quot;, &quot;PS&quot;, &quot;worker&quot;], constraints=subgraph.constraints)\npartitions = partition_by_device(subgraph, placement)\npartitions = insert_send_recv_for_cross_device_edges(partitions)\n\nfor step in training_steps:\n    distributed_executor.run_cached(partitions, feeds=next_batch())\n</code></pre>\n<p>TensorFlow 的出发点是 DistBelief 的三类限制：新 layer 往往要写 C++，新 optimizer 要修改 parameter server 逻辑，新训练算法必须服从固定的“读参数、前向、反向、写梯度”模式。TensorFlow 把这些系统内置逻辑拆成图上的基本算子，用户可以用 Python/C++ 前端组合 <code>MatMul</code>、<code>Conv2D</code>、<code>AssignAdd</code>、<code>Queue</code>、<code>Switch</code>、<code>Merge</code> 等 primitive op，而运行时只负责优化和执行图。</p>\n<p>图模型的形式可以概括为 <span class=\"kb-math kb-math-inline\">G=(V,E)</span>。每个节点 <span class=\"kb-math kb-math-inline\">v\\in V</span> 是一个 op，输入边携带张量，输出边产生新张量；某些 op 拥有可变状态，例如 <code>Variable</code> 维护 <code>State[r]</code>，<code>AssignAdd(r, x)</code> 的语义可写成</p>\n<div class=\"kb-math kb-math-display\">\\mathrm{State}&#x27;[r] \\leftarrow \\mathrm{State}[r] + x</div>\n<p>这使 TensorFlow 不同于传统 batch dataflow：它既保留了图可优化、可分区、可移植的优点，又允许训练中最关键的模型参数原地更新。参数服务器在这里不再是独立接口，而是图中一组承载变量和更新 op 的设备。</p>\n<p>Deferred execution 是早期 TensorFlow 性能设计的关键。前端先构造完整符号图，<code>Session.run()</code> 再根据 feed/fetch 找到实际需要执行的 transitive closure；这样运行时可以提前做公共子表达式消除、内存调度、设备放置和子图缓存。其代价是用户调试时看到的是“构图”和“执行”两阶段，Python 控制流不能天然等同于图控制流，所以论文把条件和循环也设计为 <code>Switch</code>、<code>Merge</code>、<code>Enter</code>、<code>Exit</code>、<code>NextIteration</code> 等图算子。</p>\n<p>分布式执行靠 graph partitioning，而不是让用户手写 RPC。placement 先为每个 op 选择设备，既要满足 kernel 可用性、colocation、用户 device hint，也要考虑计算、内存和网络成本。随后每个设备拿到自己的 subgraph；如果一条边跨设备，运行时把它替换成源设备上的 <code>Send</code> 和目标设备上的 <code>Recv</code>。这等价于把通信本身也纳入图：</p>\n<div class=\"kb-math kb-math-display\">e=(u\\rightarrow v),\\ d(u)\\ne d(v)\n\\quad\\Rightarrow\\quad\nu\\rightarrow \\mathrm{Send}_{d(u),d(v)} \\leadsto \\mathrm{Recv}_{d(u),d(v)}\\rightarrow v</div>\n<p>因此同一份程序可以在单机多 GPU、多 worker 多 PS、TPU serving 或移动端推理之间复用。</p>\n<p>自动微分也发生在图层面。给定 loss <span class=\"kb-math kb-math-inline\">L</span> 和参数集合 <span class=\"kb-math kb-math-inline\">\\theta</span>，TensorFlow 从目标节点反向搜索所有路径，对每个 op 追加 gradient function，并把多条路径贡献的偏导相加：</p>\n<div class=\"kb-math kb-math-display\">\\frac{\\partial L}{\\partial x}\n= \\sum_{y\\in \\mathrm{users}(x)}\n\\frac{\\partial L}{\\partial y}\\frac{\\partial y}{\\partial x}</div>\n<p>这种做法让优化器不再是系统内核的一部分。SGD 可以写成 <span class=\"kb-math kb-math-inline\">W&#x27; = W-\\alpha\\frac{\\partial L}{\\partial W}</span>，Momentum、AdaGrad、RMSProp、Adam、L-BFGS 等则通过额外变量和普通数学 op 组合出来，用户无需修改底层参数服务器。</p>\n<p>论文中大模型训练的 embedding case study 展示了 TensorFlow 如何继承 Parameter Server 又超越它：一个 <span class=\"kb-math kb-math-inline\">n\\times d</span> embedding matrix 被切成多个 shard，<code>Part</code> 根据 id 把稀疏索引分发到对应 shard，<code>Gather</code> 在变量所在设备上取行，<code>Stitch</code> 再把结果拼回 batch 顺序。反向传播时只有被 gather 的行产生稀疏更新，既避免把 GB/TB 级参数复制到 worker，也能把 softmax 或 sampled softmax 的计算 colocate 到参数 shard 所在设备。</p>\n<p>容错方面，TensorFlow 没有为每个 op 做昂贵的强一致日志，而是用图中的 <code>Save</code>/<code>Restore</code> 周期性 checkpoint 变量。论文还比较了 asynchronous replication、synchronous replication 和 backup worker 等并行 SGD 同步方案；这说明 TensorFlow 的平台目标不是绑定某一种分布式训练策略，而是让同步、异步、备份 worker、参数分片等策略都能在同一图语义里表达。</p>\n<div class=\"key-point\">💡 关键：TensorFlow 的系统贡献是“有状态数据流图”。它把 PS 的共享参数、Theano 式符号图、自动微分、设备放置和分布式通信合并到一个可优化的中间表示中。</div>",
      "quiz": {
        "q": "早期 TensorFlow 为什么要在图中插入 Send/Recv 节点？",
        "options": [
          "把跨设备张量传输显式纳入数据流图，从而统一调度和分布式执行",
          "让用户手动管理 TCP socket，提高网络可控性",
          "只用于把 TensorBoard 日志发送到浏览器",
          "替代自动微分中的梯度节点"
        ],
        "answer": 0,
        "explain": "placement 后跨设备边会被 Send/Recv 替换，通信因此成为图的一部分，可被分区、缓存和调度。"
      }
    },
    {
      "id": "horovod",
      "num": 3,
      "name": "Horovod",
      "fullName": "Horovod",
      "year": "2018",
      "org": "Uber",
      "parent": "tensorflow",
      "paperUrl": "https://arxiv.org/abs/1802.05799",
      "projectUrl": "",
      "category": "training_platform",
      "motivation": "引入Ring All-Reduce提升带宽利用率",
      "summary": "Horovod 把 MPI/NCCL 的 Ring All-Reduce 集体通信封装成深度学习框架的分布式 optimizer，让 TensorFlow 用户用少量代码把单机同步 SGD 扩展到多节点多 GPU，并绕开参数服务器的中心化通信瓶颈。它的关键价值是同时提升带宽利用率和易用性，而不是发明新的模型优化目标。",
      "keyPoints": [
        "用去中心化 all-reduce 平均梯度，替代 TensorFlow 参数服务器中 worker-to-server 的梯度聚合路径",
        "Ring All-Reduce 将梯度 buffer 切成 <span class=\"kb-math kb-math-inline\">N</span> 个 chunk，通过 reduce-scatter 和 all-gather 两阶段完成求和与分发",
        "每个 worker 只与环上左右邻居通信，单节点通信量约为 <span class=\"kb-math kb-math-inline\">2G(N-1)/N</span>，没有单点 server 热点",
        "<code>hvd.DistributedOptimizer</code> 包装原 optimizer，自动在应用梯度前执行 all-reduce；<code>broadcast</code> 保证所有 rank 初始参数一致",
        "使用 MPI 启动作业和建立进程拓扑，使用 NCCL 2 等后端优化 GPU/跨机 collective communication",
        "Tensor Fusion 将大量小梯度张量合并到默认 64 MB fusion buffer，减少 tiny all-reduce 的 latency 开销"
      ],
      "detail": "<p><img alt=\"Horovod Ring All-Reduce 论文 Figure 4\" src=\"https://ar5iv.labs.arxiv.org/html/1802.05799/assets/image4-2.png\" />\n<em>图：Horovod 论文 Figure 4，展示 3 个 worker 沿环传递 chunk，先规约再分发，最终每个 worker 获得完整平均梯度。</em></p>\n<pre><code class=\"language-python\"># Horovod synchronous data-parallel training\nimport horovod.tensorflow as hvd\n\nhvd.init()\npin_gpu(local_rank=hvd.local_rank())\n\nmodel = build_model()\nbase_opt = tf.train.AdagradOptimizer(learning_rate=0.01 * hvd.size())\nopt = hvd.DistributedOptimizer(base_opt)\nhooks = [hvd.BroadcastGlobalVariablesHook(root_rank=0)]\n\nfor batch in shard(dataset, rank=hvd.rank(), world_size=hvd.size()):\n    loss = model.forward(batch)\n    # DistributedOptimizer computes local gradients, all-reduces them,\n    # then applies the same averaged update on every replica.\n    train_op = opt.minimize(loss)\n    session.run(train_op, hooks=hooks)\n</code></pre>\n<pre><code class=\"language-python\"># Ring All-Reduce over one gradient tensor g_i on each rank i\nchunks = split(local_gradient, world_size)\n\n# Phase 1: reduce-scatter, each rank accumulates one final reduced chunk.\nfor step in range(world_size - 1):\n    send_chunk = chunk_index(rank - step)\n    recv_chunk = chunk_index(rank - step - 1)\n    send(chunks[send_chunk], to=right_neighbor)\n    incoming = recv(from_=left_neighbor)\n    chunks[recv_chunk] += incoming\n\n# Phase 2: all-gather, each rank circulates reduced chunks to all peers.\nfor step in range(world_size - 1):\n    send_chunk = chunk_index(rank - step + 1)\n    recv_chunk = chunk_index(rank - step)\n    send(chunks[send_chunk], to=right_neighbor)\n    chunks[recv_chunk] = recv(from_=left_neighbor)\n\naveraged_gradient = concat(chunks) / world_size\n</code></pre>\n<p>Horovod 的背景是 Uber 在标准 distributed TensorFlow 上遇到两个问题：一是 128 GPU 训练时大量资源被通信开销吃掉；二是参数服务器模式需要用户配置 worker/PS 比例、<code>ClusterSpec</code>、device placement 和多 GPU tower，工程复杂度高。论文把问题重新表述为同步数据并行的梯度平均：每个 rank 都有完整模型副本，只处理数据分片，局部梯度 <span class=\"kb-math kb-math-inline\">g_i</span> 计算完后需要得到</p>\n<div class=\"kb-math kb-math-display\">\\bar g = \\frac{1}{N}\\sum_{i=0}^{N-1} g_i</div>\n<p>然后所有副本应用同一个 update，因此它天然适合集体通信而不是中心化状态服务。</p>\n<p>Ring All-Reduce 的关键在于把大小为 <span class=\"kb-math kb-math-inline\">G</span> 的梯度 buffer 切成 <span class=\"kb-math kb-math-inline\">N</span> 份，并让所有链路同时工作。第一阶段 reduce-scatter 运行 <span class=\"kb-math kb-math-inline\">N-1</span> 步：每个 rank 向右邻居发送一个 chunk、从左邻居接收另一个 chunk，并把收到的数据累加到本地对应 chunk。结束时，每个 rank 持有一个已经对所有 worker 求和的 chunk。第二阶段 all-gather 再运行 <span class=\"kb-math kb-math-inline\">N-1</span> 步：这些求和后的 chunk 沿环传播，直到每个 rank 拥有完整 reduced buffer。</p>\n<p>通信量可以直观看出。每个阶段每个 rank 发送 <span class=\"kb-math kb-math-inline\">N-1</span> 个 chunk，每个 chunk 大小是 <span class=\"kb-math kb-math-inline\">G/N</span>，两阶段合计</p>\n<div class=\"kb-math kb-math-display\">2(N-1)\\frac{G}{N} = \\frac{2G(N-1)}{N}</div>\n<p>当 <span class=\"kb-math kb-math-inline\">N</span> 增大时它趋近 <span class=\"kb-math kb-math-inline\">2G</span>，不会像单参数服务器那样让 server 需要承受来自所有 worker 的汇聚流量。更重要的是，每一步所有 rank 都能同时使用网络链路；只要 tensor 足够大，环形通信能接近带宽最优。</p>\n<p>Horovod 在系统层的封装让这个通信模式对用户几乎不可见。<code>hvd.init()</code> 初始化通信世界，<code>hvd.local_rank()</code> 用来把进程绑定到本机 GPU，<code>hvd.DistributedOptimizer(opt)</code> 拦截 optimizer 的 gradient application，在 <code>step</code> 前自动对 dense gradients 做 all-reduce；<code>BroadcastGlobalVariablesHook(0)</code> 或对应框架 API 从 rank 0 广播初始变量，避免不同进程随机初始化不一致。训练脚本再由 <code>mpirun</code>/<code>horovodrun</code> 启动多份副本，每份只根据 <code>rank</code> 读自己的数据 shard。</p>\n<p>Tensor Fusion 解决的是另一个常见性能坑：现代 CNN/RNN 有很多层，反向传播会产生成百上千个小 tensor。Ring all-reduce 对大 buffer 带宽利用率高，但对小 tensor 会被 per-call latency 主导。Horovod 在一个 cycle 中挑选已经 ready、dtype 相同、能放进 fusion buffer 的梯度，把它们拷贝到默认 64 MB buffer 中执行一次 all-reduce，再把结果拆回原 tensor；论文报告在未优化 TCP 网络上，对小 tensor 多的模型可带来明显提升。</p>\n<p>与 TensorFlow Parameter Server 相比，Horovod 的训练语义更窄但更清晰：它主打同步数据并行，每个 worker 都持有完整模型，梯度平均后模型副本保持一致。它不适合天然需要参数分片、异步一致性或超大 embedding table 的所有场景；但当模型能放进单个 worker/GPU 组、瓶颈是每步梯度同步时，去中心化 all-reduce 往往比 worker-to-PS 的 all-to-all 更简单也更高效。</p>\n<div class=\"key-point\">💡 关键：Horovod 把“分布式训练系统问题”降维成“在正确时间做高效 collective communication”。这正是它能从 TensorFlow 扩展到 Keras、PyTorch、MXNet 的原因。</div>",
      "quiz": {
        "q": "Horovod 中 Tensor Fusion 的主要目的是什么？",
        "options": [
          "把模型参数永久合并成一个大矩阵，减少模型容量",
          "把多个小梯度张量打包后再 all-reduce，降低启动开销并提高带宽利用率",
          "用参数服务器替代 Ring All-Reduce",
          "让每个 worker 只训练不同层，执行模型并行"
        ],
        "answer": 1,
        "explain": "Ring All-Reduce 对大 buffer 更高效；Tensor Fusion 把许多 ready 的小 tensor 合并进 fusion buffer，减少 tiny collective 的 latency 成本。"
      }
    },
    {
      "id": "ray",
      "num": 4,
      "name": "Ray",
      "fullName": "Ray分布式框架 (Ray)",
      "year": "2018",
      "org": "UC Berkeley",
      "parent": "—",
      "paperUrl": "https://www.usenix.org/conference/osdi18/presentation/moritz",
      "projectUrl": "",
      "category": "training_platform",
      "motivation": "统一的分布式执行引擎，支持动态任务调度",
      "summary": "Ray 提出一个面向新型 AI 应用的统一分布式执行引擎，用 task、actor、分布式对象存储和去中心化调度同时支撑训练、强化学习、超参搜索与在线服务。它解决的是传统批处理数据流系统和专用训练框架难以表达动态、细粒度、有状态工作负载的问题。",
      "keyPoints": [
        "统一两类编程抽象：无状态 remote function/task 与有状态 actor/method invocation",
        "使用动态任务图表达执行过程，包含 data edge、control edge 和 actor stateful edge",
        "以 ObjectRef/future 作为一等对象，任务异步提交，依赖满足后自动触发执行",
        "采用两级 bottom-up scheduler：任务先进入本地调度器，必要时才转交全局调度器",
        "使用 Global Control Store 保存 task table、object table、function table 和 event log 等控制状态",
        "使用分布式 immutable object store 共享大对象，调度器只处理控制面，数据面按对象位置拉取",
        "用 lineage 记录对象生成过程，节点失败后可重放 task 恢复对象；actor 状态则依赖显式 checkpoint",
        "针对 RL/AutoML 等负载支持 <code>ray.wait</code>、嵌套任务、资源标签和异构 CPU/GPU 调度"
      ],
      "detail": "<p><img alt=\"Ray 系统架构图\" src=\"https://ar5iv.labs.arxiv.org/html/1712.05889/assets/x4.png\" />\n<em>图：Ray 论文 Figure 5 的 ar5iv 镜像。上层是 driver、worker、actor 与 object store/local scheduler，下层是 Global Control Store、global scheduler 与调试/诊断工具；这张图体现了 Ray 将应用 API、调度控制面和对象数据面分开的设计。</em></p>\n<pre><code class=\"language-python\"># Ray 动态任务图与调度机制伪代码\n@ray.remote(num_cpus=1)\ndef rollout(policy_ref, env_seed):\n    policy = ray.get(policy_ref)\n    return simulate_episode(policy, env_seed)\n\n@ray.remote(num_gpus=1)\ndef train_policy(samples_ref, old_policy_ref):\n    samples = ray.get(samples_ref)\n    old_policy = ray.get(old_policy_ref)\n    return update(old_policy, samples)\n\npolicy_ref = ray.put(initial_policy())\npending = [rollout.remote(policy_ref, seed) for seed in range(1024)]\n\nwhile budget_not_exhausted():\n    ready, pending = ray.wait(pending, num_returns=64)\n    batch_ref = aggregate.remote(ready)\n    policy_ref = train_policy.remote(batch_ref, policy_ref)\n    pending += [rollout.remote(policy_ref, next_seed()) for _ in ready]\n</code></pre>\n<p>Ray 的问题背景不是“怎样让一个固定神经网络训练更快”，而是“怎样把 AI 应用中动态变化的多阶段计算统一放到一个集群运行时里”。强化学习是论文里的典型例子：环境模拟任务耗时不均，策略训练需要 GPU，在线推理服务可能是长期有状态组件，采样和训练还会根据中间结果不断产生新任务。Spark/RDD 这类批数据流系统适合静态、批量、粗粒度 DAG；MPI 和参数服务器适合同步训练内核；但它们都不擅长把模拟、训练、服务、评估和调参混在一个动态执行图里。</p>\n<p>Ray 的最小 API 抽象是 remote function 与 actor。remote function 调用立刻返回 <code>ObjectRef</code>，调用方可以把这个引用传给后续任务而不阻塞；Ray 运行时会在引用指向的对象可用时触发依赖任务。actor 则是状态化 worker，方法调用同样返回 <code>ObjectRef</code>，但同一 actor 的方法按提交顺序串行执行，因此可以包住环境模拟器、参数服务器、模型服务副本或 GPU resident 状态。抽象层面可以把运行中系统写成动态任务图：</p>\n<div class=\"kb-math kb-math-display\">G_t=(O_t\\cup T_t,\\ E_{\\text{data}}\\cup E_{\\text{control}}\\cup E_{\\text{state}})</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">O_t</span> 是对象节点，<span class=\"kb-math kb-math-inline\">T_t</span> 是 task/actor method 节点；data edge 描述对象输入输出，control edge 描述嵌套任务的创建关系，state edge 描述同一 actor 上相邻方法调用的状态依赖。这个建模很关键：Ray 没有把 actor 作为任务图之外的特殊黑盒，而是把 actor 方法也纳入 lineage，使有状态计算能与无状态 task 共用调度、依赖追踪和部分恢复机制。</p>\n<p>系统架构上，Ray 把控制状态抽到 Global Control Store。GCS 维护对象位置、任务元数据、函数定义和事件日志，使 local scheduler、global scheduler、object store 等组件尽量无状态。这样做有两个直接收益：第一，调度器不必同时承担对象传输和 lineage 存储，避免中心节点成为每次对象读写的瓶颈；第二，某个调度组件失败后可以重启并从 GCS 读取控制状态，而不是要求用户应用重建整个执行上下文。论文强调的是控制面可扩展性，而不是单个 master 上保存所有元数据。</p>\n<p>Ray 的 bottom-up scheduling 是对细粒度任务延迟的专门优化。任务由 driver 或 worker 创建后先交给本地调度器；若本地资源足够、输入对象在本地或可快速拉取，就直接在本地执行；只有在本地队列过长、缺少 GPU/自定义资源或数据局部性明显不合适时，任务才上送全局调度器。调度可以理解为在资源约束下最小化排队与远程输入传输成本：</p>\n<div class=\"kb-math kb-math-display\">\\operatorname{cost}(n,\\tau)=q_n\\cdot\\bar{t}_{exec}\n+\\sum_{o\\in D(\\tau),\\operatorname{loc}(o)\\ne n}\n\\frac{\\operatorname{size}(o)}{\\bar{b}}</div>\n<p>这里 <span class=\"kb-math kb-math-inline\">q_n</span> 是节点 <span class=\"kb-math kb-math-inline\">n</span> 的本地队列长度，<span class=\"kb-math kb-math-inline\">\\bar{t}_{exec}</span> 是平均任务运行时间，<span class=\"kb-math kb-math-inline\">D(\\tau)</span> 是任务依赖对象集合，<span class=\"kb-math kb-math-inline\">\\bar{b}</span> 是估计带宽；同时还要满足 <span class=\"kb-math kb-math-inline\">R(\\tau)\\le A_n</span>，即任务声明的 CPU/GPU/内存等资源向量不能超过节点可用资源。这个公式化视角解释了 Ray 为什么既能追求数据局部性，又不会把所有短任务都压到全局调度器。</p>\n<p>对象存储是 Ray 数据面的核心。任务返回值会进入 immutable object store，调用方只拿到引用；当另一个节点上的任务需要该对象时，运行时按 GCS 中的对象位置拉取数据。immutable 约束让对象可以安全共享、缓存和重建，也让 task 失败恢复更简单：如果对象 <span class=\"kb-math kb-math-inline\">o</span> 是由 <span class=\"kb-math kb-math-inline\">o=f(a_1,\\dots,a_k)</span> 生成的，且输入 <span class=\"kb-math kb-math-inline\">a_i</span> 或其 lineage 仍可获得，那么对象丢失时可以重放生成它的 task，而不需要每个应用都手写中间状态持久化。</p>\n<p>Ray 与 TensorFlow、Horovod 或参数服务器的定位不同。后者主要优化单一训练拓扑中的张量通信，而 Ray 优先提供“动态控制流 + 有状态服务 + 细粒度调度”的集群运行时。上层训练库、RLlib、Tune、Serve 等可以各自实现领域逻辑，但共享同一套任务、actor、对象和调度机制。代价是 Ray 不替代高性能 collective kernel；当工作负载进入纯同步数据并行训练内核时，仍需要调用 NCCL、all-reduce 或专用训练框架。</p>\n<div class=\"key-point\">💡 关键：Ray 的贡献在于把 AI 应用的动态任务图、有状态 actor、对象引用、资源感知调度和 lineage 容错组合成一个统一系统，而不是提出某个单一训练算法。</div>",
      "quiz": {
        "q": "Ray 为什么要同时提供 task 和 actor 两种抽象？",
        "options": [
          "task 负责无状态细粒度并行，actor 负责有状态长期计算，两者共同覆盖动态 AI 工作负载",
          "task 只能在 CPU 上运行，actor 只能在 GPU 上运行",
          "task 用于训练神经网络，actor 只用于日志收集",
          "task 和 actor 完全等价，只是 API 名称不同"
        ],
        "answer": 0,
        "explain": "Ray 用 task 表达可重试、可调度的无状态远程函数，用 actor 表达保留内部状态的远程对象；RL、服务和训练流水线通常同时需要这两类计算。"
      }
    },
    {
      "id": "pytorch",
      "num": 5,
      "name": "PyTorch",
      "fullName": "PyTorch",
      "year": "2019",
      "org": "Meta FAIR",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/1912.01703",
      "projectUrl": "",
      "category": "training_platform",
      "motivation": "命令式编程与动态图，提升科研灵活性",
      "summary": "PyTorch 提出一种 Python-first、命令式、动态图的深度学习框架，把模型、数据加载、优化器和调试过程都保留为普通 Python 程序，同时通过 C++/CUDA 运行时、自动微分和异步 GPU 执行维持高性能。它解决了早期静态图框架在研究迭代、动态控制流和调试体验上的高摩擦问题。",
      "keyPoints": [
        "采用 imperative/eager execution：Tensor 运算立即执行，模型就是普通 Python 控制流",
        "使用 define-by-run 动态计算图，每次前向按实际执行路径构建 autograd graph",
        "实现 reverse-mode automatic differentiation，用 operator overloading 记录梯度函数与依赖",
        "将控制流留在 Python/C++ host 侧，将张量计算下沉到 libtorch、cuDNN、cuBLAS 和 CUDA kernel",
        "通过 CUDA stream 异步排队，使 CPU 调度与 GPU kernel 执行重叠，提高设备利用率",
        "使用 caching allocator 与引用计数降低 GPU 内存分配、释放和垃圾回收带来的同步开销",
        "保持与 NumPy、DLPack、Python debugger、multiprocessing 和生态工具的互操作性",
        "通过 <code>nn.Module</code>、<code>Optimizer</code>、<code>DataLoader</code>、TorchScript、C++ frontend 和分布式工具补齐工程化路径"
      ],
      "detail": "<p><img alt=\"PyTorch 异步执行 trace\" src=\"https://ar5iv.labs.arxiv.org/html/1912.01703/assets/x1.png\" />\n<em>图：PyTorch 论文 Figure 3 的 ar5iv 镜像。论文没有传统框架总览图，这张 trace 展示了 PyTorch 的关键运行时机制：CPU 侧快速排队算子，GPU 侧异步执行卷积、BatchNorm 等 kernel，从而让命令式 Python 代码仍能保持较高设备利用率。</em></p>\n<pre><code class=\"language-python\"># PyTorch 动态图自动微分训练伪代码\nclass RouterBlock(torch.nn.Module):\n    def __init__(self, small, large, head):\n        super().__init__()\n        self.small = small\n        self.large = large\n        self.head = head\n\n    def forward(self, x):\n        # Python 控制流决定本次真实计算图；下一次 forward 可以走不同路径\n        h = self.large(x) if x.shape[-1] &gt; 512 else self.small(x)\n        return self.head(torch.relu(h))\n\nmodel = RouterBlock(small_net, large_net, classifier).cuda()\noptimizer = torch.optim.Adam(model.parameters(), lr=3e-4)\n\nfor x, y in loader:\n    optimizer.zero_grad(set_to_none=True)\n    logits = model(x.cuda(non_blocking=True))   # eager 前向，同时记录 autograd 节点\n    loss = torch.nn.functional.cross_entropy(logits, y.cuda(non_blocking=True))\n    loss.backward()                             # reverse-mode AD 反向遍历本次图\n    optimizer.step()                            # 参数更新仍是普通 Python 调用\n</code></pre>\n<p>PyTorch 的核心立场是“深度学习模型首先是程序”。静态图框架要求用户先声明完整 dataflow graph，再交给运行时反复执行；这种方式利于全图优化，但会把 Python 调试器、条件分支、循环、递归、动态 shape 和复杂训练逻辑隔离在图构建之外。PyTorch 选择 eager execution：<code>forward</code> 调用时立即执行，用户可以在任意中间值上打断点、打印、画图或调用普通 Python 库。论文的关键论证是：通过谨慎的运行时实现，动态图的可用性不必以大幅性能损失为代价。</p>\n<p>自动微分是 PyTorch 让“普通程序”可训练的桥梁。每个需要梯度的 Tensor 在运算时会生成或连接到一个 <code>grad_fn</code>，运行时记录本次实际执行过的算子、输入输出关系和反向所需的 saved tensors。若前向可写成 <span class=\"kb-math kb-math-inline\">y=f_\\theta(x)</span>、损失为 <span class=\"kb-math kb-math-inline\">L(y)</span>，反向传播本质上是在动态图上做向量-Jacobian 积累：</p>\n<div class=\"kb-math kb-math-display\">\\bar{x}_i=\\sum_j \\bar{y}_j\\frac{\\partial y_j}{\\partial x_i},\n\\quad \\bar{\\theta}=\\frac{\\partial L}{\\partial \\theta}</div>\n<p>这里 <span class=\"kb-math kb-math-inline\">\\bar{y}_j=\\partial L/\\partial y_j</span>。PyTorch 使用 reverse-mode AD，是因为训练中通常是一个标量 loss 对大量参数求梯度；每个算子只需要实现本地 vector-Jacobian product，autograd engine 就能从 loss 节点反向调度整个图。由于图是在前向时临时构建的，下一次 batch 可以走不同分支或不同循环次数，这正是 define-by-run 的灵活性来源。</p>\n<p>命令式接口之所以没有把性能拖垮，是因为 PyTorch 明确分离 control flow 和 data flow。Python 负责决定执行哪些算子，数值密集计算由 C++ core/libtorch 调用底层 CPU/GPU kernel。GPU 上的算子通过 CUDA stream 排队，CPU 发起 kernel 后通常不等待其完成，而是继续提交后续工作；只在读取 GPU 结果、跨 stream 依赖或显式同步时才阻塞。可以把一次训练 step 的执行理解为：</p>\n<div class=\"kb-math kb-math-display\">\\text{Python control} \\rightarrow\n\\text{C++ dispatcher} \\rightarrow\n\\text{CUDA enqueue} \\rightarrow\n\\text{GPU kernel execution}</div>\n<p>论文的 trace 图说明，CPU 侧排队速度可以快于 GPU 侧实际计算时间，于是解释器开销被隐藏在异步执行之后。这也是 PyTorch 能在保持 Pythonic 使用体验的同时接近静态图框架吞吐的关键。</p>\n<p>内存管理是另一个容易被低估的系统点。GPU 内存分配通常会触发昂贵同步，如果每个临时 Tensor 都直接 <code>cudaMalloc/cudaFree</code>，eager 模式会频繁卡住。PyTorch 使用 caching allocator 复用已释放的块，并结合 CPython 引用计数尽早释放不再使用的 Tensor。对用户来说，这保持了“对象离开作用域就可回收”的直觉；对运行时来说，缓存池避免了分配器同步和碎片化带来的性能悬崖。</p>\n<p>PyTorch 的设计也刻意降低生态边界。Tensor 可以与 NumPy 或 DLPack 做零拷贝互转，<code>Dataset</code>/<code>DataLoader</code> 把 Python 数据处理和 pinned memory 传输组织成训练输入管线，<code>torch.multiprocessing</code> 能把 Tensor 存储移到共享内存以减少进程间复制。<code>nn.Module</code> 并不是强制图语言，而是参数注册、层组合和状态管理约定；Optimizer 也只是操作参数集合的 Python 对象，因此 GAN、元学习、多损失交替优化等非标准训练循环可以直接表达。</p>\n<p>与 TensorFlow 1.x/Theano 这类静态图相比，PyTorch 牺牲了一部分提前全图优化空间，换来模型定义、调试和研究迭代的直接性；与纯 NumPy 相比，它补上了自动微分、GPU kernel、模块系统、数据管线和分布式训练。后续 TorchScript、C++ frontend 与编译路径可以看作在同一哲学下补足部署需求：先让研究代码自然运行，再在需要时把一部分动态程序捕获、编译或迁移到非 Python 环境。</p>\n<div class=\"key-point\">💡 关键：PyTorch 论文的贡献不是某个新损失函数，而是证明“命令式 Python 程序 + 动态 autograd + C++/CUDA 高性能运行时”可以同时满足研究灵活性和主流深度学习性能。</div>",
      "quiz": {
        "q": "PyTorch define-by-run 动态图最核心的含义是什么？",
        "options": [
          "每次前向执行都会按真实 Python 控制流记录本次计算图，反向传播只沿本次图求梯度",
          "训练开始前必须把所有算子编译成固定静态图",
          "用户需要为每个 Tensor 手写梯度公式",
          "动态图意味着所有运算只能在 CPU 上同步执行"
        ],
        "answer": 0,
        "explain": "PyTorch 在 eager 前向中用 operator overloading 记录实际发生的运算；loss.backward() 根据这次记录的图做 reverse-mode 自动微分。"
      }
    },
    {
      "id": "gpipe",
      "num": 6,
      "name": "GPipe",
      "fullName": "流水线并行 (GPipe)",
      "year": "2019",
      "org": "Google Brain",
      "parent": "tensorflow",
      "paperUrl": "https://arxiv.org/abs/1811.06965",
      "projectUrl": "",
      "category": "training_platform",
      "motivation": "通过微批次实现流水线并行，开创性工作",
      "summary": "GPipe 提出一种通用的 micro-batch pipeline parallelism：把顺序神经网络按层切成多个 stage 放到不同加速器上，再把一个 mini-batch 拆成多个 micro-batch 填充流水线。它在保持同步梯度更新语义的同时提高多设备利用率，并用 activation rematerialization 缓解巨型模型训练的显存压力。",
      "keyPoints": [
        "将网络视为层序列，把连续层合并成 cell/stage，并把每个 stage 放到一个加速器上",
        "使用 batch splitting：一个 mini-batch 被拆成多个 micro-batch，前向和反向跨 stage 流水执行",
        "对一个 mini-batch 内所有 micro-batch 累积梯度，最后只做一次同步参数更新",
        "避免 PipeDream 式异步流水线的 weight staleness，不需要维护多版本权重来校正梯度",
        "通过 rematerialization/checkpointing 只保存分区边界激活，反向时重算 stage 内部激活以节省显存",
        "分区目标是让各 stage 计算成本尽量均衡，减少流水线慢 stage 和 bubble overhead",
        "跨设备通信只发生在 stage 边界传递激活/梯度，相比 SPMD 张量切分减少 all-reduce 类通信",
        "论文验证了 557M 参数 AmoebaNet 和 6B 参数、128 层 multilingual Transformer 的可训练性与扩展性"
      ],
      "detail": "<p><img alt=\"GPipe 流水线并行示意图\" src=\"https://ar5iv.labs.arxiv.org/html/1811.06965/assets/PipelineParallelism.png\" />\n<em>图：GPipe 论文 Figure 2(c) 的 ar5iv 镜像。横轴是时间，纵向是不同设备；不同 micro-batch 的前向 <span class=\"kb-math kb-math-inline\">F_{i,j}</span> 与反向 <span class=\"kb-math kb-math-inline\">B_{i,j}</span> 在多个 stage 上交错执行，右侧统一做同步 Update，中间的空白区域就是 bubble。</em></p>\n<pre><code class=\"language-python\"># GPipe micro-batch 流水线训练伪代码\nstages = partition_sequential_layers(model.layers, num_stages=K)\noptimizers = [make_optimizer(stage.parameters()) for stage in stages]\n\nfor minibatch in loader:\n    micros = split(minibatch, chunks=M)\n    saved_outputs = []\n\n    # 1. 前向流水：不同 stage 同时处理不同 micro-batch\n    for micro_id, micro in enumerate(micros):\n        x = micro\n        for stage_id, stage in enumerate(stages):\n            x = stage.forward(x, checkpoint_boundary=True)\n            send_to_next_stage(stage_id, x)\n        saved_outputs.append(x)\n\n    # 2. 反向流水：反向传播时可重算 stage 内激活，减少前向缓存\n    for micro_id in reversed(range(M)):\n        grad = loss_grad(saved_outputs[micro_id])\n        for stage_id in reversed(range(K)):\n            grad = stages[stage_id].backward_with_rematerialization(grad)\n            accumulate_gradients(stages[stage_id])\n\n    # 3. 所有 micro-batch 梯度累积完成后，同步更新一次\n    for opt in optimizers:\n        opt.step()\n        opt.zero_grad()\n</code></pre>\n<p>GPipe 针对的是“模型太大而单设备放不下，同时朴素模型并行又利用率很差”的问题。如果只把一个网络按层切到 4 个设备上，一个 batch 必须从 stage 0 依次经过 stage 3，任一时刻大多只有一个设备在工作；如果为了填满设备而让不同 stage 使用不同时间点的权重异步更新，又会产生 weight staleness。GPipe 的关键折中是：用 micro-batch 填满流水线，但更新仍按完整 mini-batch 同步发生。</p>\n<p>形式化地，设模型是层序列 <span class=\"kb-math kb-math-inline\">L_1,\\dots,L_N</span>，GPipe 将其划分为 <span class=\"kb-math kb-math-inline\">K</span> 个连续 cell：</p>\n<div class=\"kb-math kb-math-display\">C_k = L_{a_k}\\circ L_{a_k+1}\\circ \\cdots \\circ L_{b_k},\\quad k=1,\\dots,K</div>\n<p>分区器的目标不是简单让层数相等，而是让每个 cell 的估计计算成本接近，即尽量减小 <span class=\"kb-math kb-math-inline\">\\operatorname{Var}(\\operatorname{cost}(C_1),\\dots,\\operatorname{cost}(C_K))</span>。原因很直接：流水线吞吐由最慢 stage 决定，某个 stage 过重会让其他设备等待，即使 micro-batch 数量足够也无法线性加速。</p>\n<p>batch splitting 是 GPipe 的核心算法。令 mini-batch <span class=\"kb-math kb-math-inline\">B</span> 被拆成 <span class=\"kb-math kb-math-inline\">M</span> 个 micro-batch <span class=\"kb-math kb-math-inline\">B_1,\\dots,B_M</span>。第一个 micro-batch 进入 stage 1 后，stage 0 可以立刻处理第二个 micro-batch；当流水线填满时，多个设备同时处理不同 micro-batch 的不同 stage。一次 pipeline sweep 的直觉利用率可近似看作：</p>\n<div class=\"kb-math kb-math-display\">U \\approx \\frac{M}{M+K-1}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">K-1</span> 对应填充和排空流水线带来的 bubble。这个式子不是 GPipe 的优化目标本身，但很好地解释了论文观察：当 micro-batch 数 <span class=\"kb-math kb-math-inline\">M</span> 相对 stage 数 <span class=\"kb-math kb-math-inline\">K</span> 足够大时，bubble overhead 被摊薄；当 <span class=\"kb-math kb-math-inline\">M=1</span> 时就退化为朴素顺序模型并行，几乎没有流水线并发。</p>\n<p>同步梯度更新保证了 GPipe 的训练语义接近普通 mini-batch SGD。对参数 <span class=\"kb-math kb-math-inline\">\\theta</span>，每个 micro-batch 产生梯度 <span class=\"kb-math kb-math-inline\">g_j=\\nabla_\\theta \\ell(f_\\theta(B_j))</span>，GPipe 累积后再更新：</p>\n<div class=\"kb-math kb-math-display\">g=\\frac{1}{M}\\sum_{j=1}^{M} g_j,\\quad\n\\theta \\leftarrow \\theta-\\eta g</div>\n<p>关键是所有 <span class=\"kb-math kb-math-inline\">g_j</span> 都基于同一版 <span class=\"kb-math kb-math-inline\">\\theta</span> 的前向/反向计算。这样 GPipe 避免了异步流水线中常见的权重版本错位，也不需要像一些异步 pipeline 系统一样在每个设备上保存多份历史权重。代价是一次 mini-batch 的 update 要等所有 micro-batch 完成，吞吐来自流水线并发而不是异步参数更新。</p>\n<p>显存方面，GPipe 结合 rematerialization。普通反向传播需要保存每层前向激活；当模型很深且 batch 很大时，激活内存会迅速超过设备限制。GPipe 只在 stage 边界保存必要激活，在反向时重算 stage 内部前向，从计算换内存。直觉上，若每个 stage 有 <span class=\"kb-math kb-math-inline\">N/K</span> 层、micro-batch 大小是 <span class=\"kb-math kb-math-inline\">B/M</span>，则每个设备需要常驻的中间激活随 micro-batch 缩小而下降；这就是为什么 batch splitting 与 rematerialization 必须一起看，而不是只把 batch 切小。</p>\n<p>与 SPMD/tensor model parallelism 相比，GPipe 不把单个矩阵乘或卷积的张量维度切到多设备上，因此跨设备通信主要是 stage 边界的 activation 和 gradient，而不是每层大量 all-reduce 或 halo exchange。这让 GPipe 在没有高速互连时也能工作得相对稳健。与 PipeDream 类异步 pipeline 相比，GPipe 的优点是优化更稳定、权重一致性简单；缺点是只适合能表达为主要顺序层序列的网络，并且要求单层本身能放进一个加速器，BatchNorm 这类跨 batch 统计也需要额外处理 micro-batch 与 mini-batch 统计之间的差异。</p>\n<p>论文实验展示的是“通用基础设施”的价值，而不是某个架构专用 trick。GPipe 让 AmoebaNet 在 ImageNet 上扩到 557M 参数并达到强结果，也让 128 层、6B 参数 multilingual Transformer 在 100 多种语言任务上训练成为可能。更重要的启发是：当模型深度天然形成层序列时，流水线并行可以与数据并行叠加，成为后来大模型训练系统中 pipeline parallelism、activation checkpointing 和 micro-batch scheduling 的基础组成。</p>\n<div class=\"key-point\">💡 关键：GPipe 的本质是用 micro-batch 并发隐藏按层模型并行的设备空闲时间，同时用同步梯度更新保持训练语义稳定。</div>",
      "quiz": {
        "q": "GPipe 为什么选择在所有 micro-batch 完成后再统一更新参数？",
        "options": [
          "为了让每个 micro-batch 的梯度基于同一版权重，避免流水线异步更新带来的 weight staleness",
          "为了完全取消反向传播，只运行前向推理",
          "为了让每个 stage 持有模型的完整副本",
          "为了把跨设备通信变成每层 all-reduce"
        ],
        "answer": 0,
        "explain": "GPipe 通过累积一个 mini-batch 内所有 micro-batch 的梯度并同步更新，保持与普通 mini-batch SGD 接近的语义。"
      }
    },
    {
      "id": "megatron_lm",
      "num": 7,
      "name": "Megatron-LM",
      "fullName": "Megatron-LM",
      "year": "2019",
      "org": "NVIDIA",
      "parent": "pytorch",
      "paperUrl": "https://arxiv.org/abs/1909.08053",
      "projectUrl": "",
      "category": "training_platform",
      "motivation": "高效张量并行支持千亿参数训练",
      "summary": "Megatron-LM 提出了一套专门面向 Transformer 的层内张量并行方案，把 MLP 大矩阵和 multi-head attention 按张量维度切分，在原生 PyTorch 中只插入少量 collective 通信即可训练十亿级到百亿级语言模型。",
      "keyPoints": [
        "提出 intra-layer model parallelism：不按层切模型，而是在单个 Transformer block 内切分矩阵乘和 attention heads",
        "MLP 并行策略：第一层权重按列切分、第二层权重按行切分，将非线性 GeLU 保持在每个 GPU 的局部分片上",
        "Attention 并行策略：Q/K/V 与 attention heads 按 head 维度切分，每张 GPU 独立计算一组 heads 后再合并输出投影",
        "通信设计极简：用互为伴随的 <code>f</code>/<code>g</code> autograd 算子把一次 Transformer 层的前向和反向通信限制为 4 次 all-reduce",
        "系统实现保持 PyTorch 友好：无需新编译器或自定义框架，配合 mixed precision、activation checkpointing、数据并行和高带宽节点内互联",
        "实验训练 GPT-2/BERT 风格模型到 8.3B/3.9B 参数规模，并展示 512 GPU 上约 15.1 PFLOPS 的端到端吞吐"
      ],
      "detail": "<p><img alt=\"Megatron-LM MLP 张量并行示意图\" src=\"https://ar5iv.labs.arxiv.org/html/1909.08053/assets/mlp_mp_2.png\" />\n<em>图：来自 Megatron-LM 论文 Figure 3(a)，展示 MLP 中 <code>A</code> 按列切分、<code>B</code> 按行切分，以及 <code>f</code>/<code>g</code> 通信算子的放置。</em></p>\n<p><img alt=\"Megatron-LM Attention 张量并行示意图\" src=\"https://ar5iv.labs.arxiv.org/html/1909.08053/assets/attention_mp_2.png\" />\n<em>图：来自 Megatron-LM 论文 Figure 3(b)，展示 self-attention 按 heads 切分，输出投影再通过 row-parallel 方式汇合。</em></p>\n<pre><code class=\"language-python\"># Megatron-LM tensor parallel training step, simplified to one Transformer MLP + attention block.\n# tp_rank owns one shard of every tensor-parallel weight.\ndef transformer_block_tp(x, tp_rank, tp_group):\n    # MLP: H = GeLU(XA), Y = HB\n    A_i = shard_columns(A, rank=tp_rank)        # A = [A_1, ..., A_p]\n    H_i = gelu(x @ A_i)                         # no communication before GeLU\n\n    B_i = shard_rows(B, rank=tp_rank)           # B = [B_1; ...; B_p]\n    y_partial = H_i @ B_i\n    y = all_reduce_sum(y_partial, group=tp_group)\n\n    # Attention: each rank owns a subset of heads.\n    Q_i, K_i, V_i = qkv_projection_for_local_heads(x, tp_rank)\n    ctx_i = softmax(Q_i @ K_i.T / sqrt(head_dim)) @ V_i\n    out_partial = ctx_i @ shard_rows(attention_out_proj, tp_rank)\n    attn_out = all_reduce_sum(out_partial, group=tp_group)\n\n    return residual_layer_norm(x + y + attn_out)\n</code></pre>\n<p>训练超大 Transformer 的直接瓶颈不是“数据量不够分”，而是单层矩阵、激活和优化器状态已经超过单卡内存。纯数据并行会在每张 GPU 上复制完整模型，只能扩大 batch；纯 pipeline 并行可以把不同层放到不同设备，但每一层内部的大矩阵仍然完整落在某张 GPU 上。Megatron-LM 的关键选择是把 Transformer block 内部最重的算子切开，使模型宽度可以随 GPU 数增长。</p>\n<p>MLP 的数学形式可以写成：</p>\n<div class=\"kb-math kb-math-display\">Y = \\operatorname{GeLU}(XA), \\quad Z = YB</div>\n<p>若使用 <span class=\"kb-math kb-math-inline\">p</span> 个 tensor-parallel rank，将第一层权重按列切分为 <span class=\"kb-math kb-math-inline\">A=[A_1,\\ldots,A_p]</span>，每张 GPU 只计算 <span class=\"kb-math kb-math-inline\">Y_i=\\operatorname{GeLU}(XA_i)</span>。由于 GeLU 是逐元素非线性，切分后的 <span class=\"kb-math kb-math-inline\">Y_i</span> 可以在本地直接完成非线性。第二层权重按行切分为 <span class=\"kb-math kb-math-inline\">B=[B_1;\\ldots;B_p]</span>，每张 GPU 计算局部结果 <span class=\"kb-math kb-math-inline\">Z_i=Y_iB_i</span>，最终只需：</p>\n<div class=\"kb-math kb-math-display\">Z = \\sum_{i=1}^{p} Z_i = \\operatorname{AllReduceSum}(Z_i)</div>\n<p>这解释了为什么 Megatron-LM 选择“列切第一层、行切第二层”：它把中间扩展维度留在本地，避免在 GeLU 前后反复 gather 大激活，只在 block 的必要边界做一次求和同步。</p>\n<p>Attention 的切分利用了 multi-head attention 的天然可分解结构。对第 <span class=\"kb-math kb-math-inline\">i</span> 个 rank，它只持有部分 heads 的投影矩阵 <span class=\"kb-math kb-math-inline\">Q_i,K_i,V_i</span>，局部计算：</p>\n<div class=\"kb-math kb-math-display\">\\operatorname{head}_i(X)=\\operatorname{softmax}\\left(\\frac{XQ_i(XK_i)^T}{\\sqrt{d_h}}\\right)XV_i</div>\n<p>不同 heads 在 softmax 之前没有数据依赖，因此可以并行独立计算；跨 GPU 通信主要发生在输出投影和残差连接需要重新合成完整 hidden state 的位置。论文中的 <code>f</code> 和 <code>g</code> 是两个简单但重要的 autograd 辅助算子：<code>f</code> 前向是 identity、反向做 all-reduce；<code>g</code> 前向做 all-reduce、反向是 identity。二者配合后，一个 model-parallel Transformer 层在前向加反向中只需要 4 次 collective，而不是在每个子算子后都同步。</p>\n<p>从系统角度看，Megatron-LM 的贡献是把算法结构、通信点和 PyTorch autograd 对齐。它没有要求用户重写模型到新 DSL，也没有依赖全图编译器；实现者只需替换 linear、embedding、cross entropy 等少数模块为 parallel 版本，并让 tensor parallel group 内的 rank 共享切分规则。embedding 和输出词表层也可做 vocabulary parallel：每个 rank 持有一段词表 logits，交叉熵通过跨 rank 的 max/sum 规约得到全词表归一化，从而避免完整 logits 常驻单卡。</p>\n<p>与 GPipe/PipeDream 这类 pipeline 并行相比，Megatron-LM 主要解决“层内太宽”的问题；与 ZeRO 这类优化器/参数状态分片相比，它直接改变矩阵乘的计算分布。实践中它常与数据并行、pipeline 并行共同组成 3D 并行：tensor parallel 放在节点内 NVLink 等高带宽域中，pipeline parallel 跨层切分模型深度，data parallel 复制整个并行模型副本来扩大吞吐。这个分工也解释了为什么 Megatron-LM 的层内通信必须非常克制，否则 tensor parallel 的收益会被 all-reduce 开销吞掉。</p>\n<div class=\"key-point\">💡 关键：Megatron-LM 的核心不是新的 Transformer 公式，而是找到 Transformer 中可以局部计算的维度，把通信压缩到残差/投影等少数必要汇合点。</div>",
      "quiz": {
        "q": "Megatron-LM 为什么在 MLP 中对第一层权重按列切分、第二层权重按行切分？",
        "options": [
          "为了让每个 GPU 都保存完整中间激活，便于调试",
          "为了让 GeLU 在本地分片上执行，并只在第二层输出处做 all-reduce 求和",
          "为了减少训练数据读取次数，与模型并行无关",
          "为了把 attention heads 全部集中到同一个 GPU"
        ],
        "answer": 1,
        "explain": "列切第一层后 GeLU 可局部执行；行切第二层后每个 rank 产生 partial output，最后 all-reduce 相加得到完整输出。"
      }
    },
    {
      "id": "pipedream",
      "num": 8,
      "name": "PipeDream",
      "fullName": "PipeDream",
      "year": "2019",
      "org": "Microsoft/CMU",
      "parent": "gpipe",
      "paperUrl": "https://dl.acm.org/doi/10.1145/3341301.3359646",
      "projectUrl": "",
      "category": "training_platform",
      "motivation": "异步流水线减少bubble开销",
      "summary": "PipeDream 提出 generalized pipeline parallelism，把层切分、阶段复制、1F1B 调度和 weight stashing 组合起来，在保持训练正确性近似可控的同时减少 GPipe 式流水线 flush 与 bubble。",
      "keyPoints": [
        "将 DNN 层划分为多个 pipeline stages，并允许某些 stage 用数据并行副本复制来消除负载不均衡",
        "通过短 profile 收集每层前向/反向时间、激活大小、参数大小和平台通信带宽，再自动搜索 stage 切分与复制因子",
        "使用 1F1B 调度：稳态中每个 worker 严格交替执行一个 backward 和一个 forward，减少启动/排空之外的空闲时间",
        "扩展为 1F1B-RR：在被复制的 stage 内 round-robin 路由 microbatch，并保证反向梯度回到执行过对应前向的副本",
        "使用 weight stashing 保存每个 microbatch 前向时的权重版本，使该 microbatch 的反向在同一 stage 内使用一致参数",
        "用 vertical sync 等版本控制手段缓解跨 stage 权重版本偏移，在吞吐、内存占用和统计效率之间取舍"
      ],
      "detail": "<p><img alt=\"PipeDream pipeline-parallel assignment 与 1F1B 时序图\" src=\"https://www.microsoft.com/en-us/research/wp-content/uploads/2019/10/pipedream_figure2.png\" />\n<em>图：来自 Microsoft Research PipeDream 官方博客 Figure 2，左侧展示 8 GPU 被切成 4 个 stage 且部分 stage 有副本，右侧展示启动后进入 steady state 的 1F1B forward/backward 交替。</em></p>\n<p><img alt=\"PipeDream workflow 图\" src=\"https://www.microsoft.com/en-us/research/wp-content/uploads/2019/10/Figure3_pipedream.png\" />\n<em>图：来自 Microsoft Research PipeDream 官方博客 Figure 3，展示 profiler、optimizer、constraints 与 runtime 如何形成 pipeline-parallel execution。</em></p>\n<pre><code class=\"language-python\"># PipeDream core loop, simplified.\n# Each worker owns one stage replica and repeats a static 1F1B-RR schedule.\nwhile training:\n    if has_ready_backward(stage):\n        mb_id, grad_out = recv_from_next_stage()\n        version = forward_weight_version[mb_id]\n        weights = load_stashed_weights(version)\n        grad_in, grad_w = backward(stage, mb_id, grad_out, weights)\n        apply_stage_local_update(stage, grad_w)\n        send_to_prev_stage(mb_id, grad_in, route=forward_route[mb_id])\n\n    if has_ready_forward(stage):\n        mb_id, activation = recv_from_prev_stage_or_loader()\n        version = current_weight_version(stage)\n        stash_weights(mb_id, version)\n        forward_route[mb_id] = this_stage_replica()\n        activation_out = forward(stage, activation, weights_at(version))\n        send_to_next_stage(mb_id, activation_out)\n</code></pre>\n<p>PipeDream 的出发点是传统 intra-batch 并行的两个极端都不理想。数据并行每个 worker 持有完整模型，扩展到多机后需要频繁同步大梯度，通信量随参数量增长；朴素模型并行只让一个 minibatch 穿过分布式层序列，任一时刻只有少数 worker 忙，硬件利用率低。Pipeline parallelism 的思路是把模型层序列切成 stage，同时把训练 batch 分成连续 microbatch，使多个 microbatch 像流水线指令一样同时处于不同 stage。</p>\n<p>如果 stage <span class=\"kb-math kb-math-inline\">s</span> 的一次 microbatch 前向加反向服务时间为 <span class=\"kb-math kb-math-inline\">t_s</span>，稳态吞吐受最慢 stage 限制：</p>\n<div class=\"kb-math kb-math-display\">T_{\\text{step}} \\approx T_{\\text{fill/drain}} + (M-1)\\max_s t_s</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">M</span> 是流入流水线的 microbatch 数。这个公式说明了 PipeDream 为什么必须自动 partition：只要某个 stage 显著更慢，所有其他 stage 都会等待它。PipeDream 先 profile 每层的 compute time、activation/gradient 边界大小和参数大小，再结合硬件拓扑估计 stage 内计算与 stage 间通信；优化目标是选择连续层段、stage 数、stage 副本数和 microbatch 数，使 <span class=\"kb-math kb-math-inline\">\\max_s t_s</span> 尽量小，同时满足 GPU 显存和网络带宽约束。</p>\n<p>调度层面，PipeDream 使用 1F1B 而不是 GPipe 的“先做完所有 forward，再做所有 backward，再 flush 更新”。在 pipeline 填满后，每个 worker 优先执行一个 ready backward，然后执行一个 ready forward，因此 backward 产生的 activation 可以尽早释放，worker 也不必为了全局同步频繁排空流水线。对包含副本的 stage，1F1B-RR 会把 forward 按 round-robin 分配给副本，并记录 microbatch 的 route；反向时梯度必须回到执行过对应 forward 的同一副本，因为该副本保留了对应 activation 和权重版本。</p>\n<p>异步流水线的核心风险是权重版本不一致。若 microbatch <span class=\"kb-math kb-math-inline\">m</span> 在 stage <span class=\"kb-math kb-math-inline\">s</span> 的前向使用权重 <span class=\"kb-math kb-math-inline\">W_s^{v(m,s)}</span>，但它的反向到达时该 stage 已经完成多次本地更新，直接用最新 <span class=\"kb-math kb-math-inline\">W_s</span> 会让梯度不再对应前向计算图。PipeDream 的 weight stashing 明确保存这个版本：</p>\n<div class=\"kb-math kb-math-display\">g_s(m)=\\nabla_{W_s} L_m\\left(W_s^{v(m,s)}\\right)</div>\n<p>也就是说，反向计算使用前向时的同一 stage-local 权重版本，保证单个 stage 内的梯度数值是自洽的。它不能完全消除跨 stage 的 staleness，因为同一个 microbatch 经过不同 stage 时可能看到不同版本；PipeDream 通过版本管理和可选 vertical sync 限制这种偏移，使统计效率接近数据并行，同时保留高硬件利用率。</p>\n<p>与 GPipe 相比，PipeDream 的主要取舍是“少 flush、少 bubble，但要保存多个权重版本并处理 stale gradient”。GPipe 更接近同步 SGD 语义，理解和收敛分析更直接，但周期性排空会损失吞吐；PipeDream 让各 stage 本地更快更新，稳态几乎所有 worker 都有活干，适合通信受限或模型层计算不均的环境。它也不是纯 pipeline：stage replication 本质上把数据并行嵌入 pipeline stage 内，用复制因子吸收层耗时差异，这是 generalized pipeline parallelism 中“generalized”的重要含义。</p>\n<div class=\"warn-box\">⚠️ 注意：PipeDream 的正确性边界依赖 weight stashing 和路由记录；如果 backward 没有回到执行对应 forward 的 stage 副本，保存的 activation/weight version 就对不上。</div>",
      "quiz": {
        "q": "PipeDream 中 weight stashing 主要解决什么问题？",
        "options": [
          "减少输入数据集的磁盘占用",
          "确保某个 microbatch 的反向在同一 stage 内使用它前向时的权重版本",
          "把所有 stage 的权重强制变成同一个全局版本",
          "让 GPU 不再需要保存 activation"
        ],
        "answer": 1,
        "explain": "异步流水线中 stage 会持续更新权重；stashing 记录 microbatch 前向用过的版本，反向时加载同一版本以得到数值自洽的梯度。"
      }
    },
    {
      "id": "deepspeed",
      "num": 9,
      "name": "DeepSpeed ZeRO",
      "fullName": "DeepSpeed ZeRO",
      "year": "2020",
      "org": "Microsoft",
      "parent": "megatron_lm",
      "paperUrl": "https://arxiv.org/abs/1910.02054",
      "projectUrl": "",
      "category": "training_platform",
      "motivation": "消除冗余状态突破显存限制",
      "summary": "ZeRO（Zero Redundancy Optimizer）通过将优化器状态、梯度和参数在数据并行进程间分区而非复制，消除了数据并行训练中的内存冗余，在不牺牲通信效率的前提下实现了与设备数量成线性比例的显存节省，使得在 1024 块 GPU 上训练万亿参数模型成为可能。",
      "keyPoints": [
        "<strong>三阶段渐进式内存优化（ZeRO-DP）</strong>：Stage 1 分区优化器状态（4× 节省）、Stage 2 叠加分区梯度（8× 节省）、Stage 3 叠加分区参数（线性于 <span class=\"kb-math kb-math-inline\">N_d</span> 倍节省）",
        "<strong>通信量几乎不增加</strong>：Stage 1+2 通信量与标准数据并行相同（<span class=\"kb-math kb-math-inline\">2\\Psi</span>）；Stage 3 仅增加 50%（<span class=\"kb-math kb-math-inline\">3\\Psi</span>）",
        "<strong>混合精度训练内存分析</strong>：系统量化了 Adam + fp16 训练中优化器状态（fp32 参数副本 + 动量 + 方差 = <span class=\"kb-math kb-math-inline\">12\\Psi</span> 字节）占主导的内存消耗",
        "<strong>ZeRO-R 优化残余内存</strong>：包括激活值分区（<span class=\"kb-math kb-math-inline\">P_a</span>）、固定大小临时缓冲区（<span class=\"kb-math kb-math-inline\">C_B</span>）和主动内存碎片整理（<span class=\"kb-math kb-math-inline\">M_D</span>）",
        "<strong>超线性加速</strong>：100B 参数模型在 400 GPU 上实现超线性加速，达到 15 PFlops 吞吐",
        "<strong>无需模型并行即可训练 13B 参数模型</strong>，降低了大模型训练的工程门槛",
        "<strong>Turing-NLG 17B</strong>：利用 ZeRO 训练了当时最大的语言模型，刷新准确率记录"
      ],
      "detail": "<p><img alt=\"ZeRO-DP 三阶段内存对比\" src=\"https://ar5iv.labs.arxiv.org/html/1910.02054/assets/x1.png\" />\n<em>图：以 7.5B 参数模型、64 路数据并行为例，展示基线 DP 与 ZeRO 三个阶段（<span class=\"kb-math kb-math-inline\">P_{os}</span>、<span class=\"kb-math kb-math-inline\">P_{os+g}</span>、<span class=\"kb-math kb-math-inline\">P_{os+g+p}</span>）的显存消耗对比。基线需要 120GB/GPU，ZeRO Stage 3 仅需 1.9GB/GPU。</em></p>\n<pre><code class=\"language-python\"># ZeRO-DP 三阶段训练伪代码\n# 假设 Nd 个数据并行进程，模型参数 Ψ，每个进程负责第 rank 个分区\n\n# ===== Stage 1: 优化器状态分区 (P_os) =====\n# 每个进程仅持有 1/Nd 的优化器状态（fp32 参数副本 + momentum + variance）\nfor step in training_steps:\n    loss = forward(model, micro_batch)        # 前向：所有进程持有完整参数\n    loss.backward()                           # 反向：计算完整梯度\n    all_reduce(gradients)                     # 全规约梯度（与标准 DP 相同）\n    # 每个进程仅更新自己负责的 1/Nd 参数分区\n    optimizer.step(params[rank_start:rank_end])\n    all_gather(params)                        # 收集更新后的完整参数\n\n# ===== Stage 2: + 梯度分区 (P_os+g) =====\nfor step in training_steps:\n    loss = forward(model, micro_batch)\n    # 反向传播中，每层梯度就绪后立即 reduce-scatter（而非 all-reduce）\n    for layer in reversed(model.layers):\n        grad = layer.backward()\n        reduce_scatter(grad)                  # 每个进程仅保留自己分区的已规约梯度\n        # 非本分区的梯度内存立即释放\n    optimizer.step(params[rank_start:rank_end])\n    all_gather(params)\n\n# ===== Stage 3: + 参数分区 (P_os+g+p) =====\nfor step in training_steps:\n    # 前向：按需广播参数\n    for layer in model.layers:\n        all_gather(layer.params)              # 从各进程收集该层完整参数\n        output = layer.forward(input)\n        # 非本分区的参数用完即释放\n    # 反向：同样按需广播参数\n    for layer in reversed(model.layers):\n        all_gather(layer.params)              # 再次收集完整参数用于梯度计算\n        grad = layer.backward()\n        reduce_scatter(grad)\n    optimizer.step(params[rank_start:rank_end])\n    # 无需最终 all_gather——参数始终按需获取\n</code></pre>\n<h5>动机与背景：数据并行的内存瓶颈</h5>\n<p>训练超大模型的核心挑战在于<strong>单设备显存不足</strong>。现有解决方案主要有两类：</p>\n<ol>\n<li><strong>模型并行（MP）</strong>：将模型按层或按张量切分到多个设备。虽然能减少单卡显存，但带来大量跨设备通信，且实现复杂、通用性差。Megatron-LM 的张量并行在超过单节点（通常 8 GPU）后效率急剧下降。</li>\n<li><strong>数据并行（DP）</strong>：每个设备持有完整模型副本，仅切分数据。通信效率高，但<strong>每张卡都冗余存储了完整的模型状态</strong>。</li>\n</ol>\n<p>论文首先对混合精度训练（fp16 参数 + fp32 Adam 优化器）的内存消耗进行了精确量化。对于参数量为 <span class=\"kb-math kb-math-inline\">\\Psi</span> 的模型：</p>\n<div class=\"kb-math kb-math-display\">\\text{总内存} = \\underbrace{2\\Psi}_{\\text{fp16 参数}} + \\underbrace{2\\Psi}_{\\text{fp16 梯度}} + \\underbrace{4\\Psi + 4\\Psi + 4\\Psi}_{K\\Psi = 12\\Psi \\text{ (fp32 参数副本 + 动量 + 方差)}} = 16\\Psi \\text{ 字节}</div>\n<div class=\"key-point\">💡 <strong>关键洞察</strong>：优化器状态占据了 75% 的显存（<span class=\"kb-math kb-math-inline\">12\\Psi / 16\\Psi</span>），而在标准数据并行中这些状态在每个 GPU 上完全冗余复制。这正是 ZeRO 的突破口。</div>\n<p>以 GPT-2（1.5B 参数）为例，仅模型状态就需要 24GB，已超出当时主流 GPU（16–32GB）的容量。而 1.4B 参数是标准 DP 在 32GB GPU 上的极限。</p>\n<h5>核心机制：ZeRO-DP 三阶段分区</h5>\n<p>ZeRO-DP 的核心思想极为简洁：<strong>既然数据并行中每个进程最终只需要更新 <span class=\"kb-math kb-math-inline\">1/N_d</span> 的参数，那么每个进程也只需要存储对应的 <span class=\"kb-math kb-math-inline\">1/N_d</span> 优化器状态和梯度</strong>。</p>\n<p><strong>Stage 1 — 优化器状态分区（<span class=\"kb-math kb-math-inline\">P_{os}</span>）</strong>：将 Adam 的 fp32 参数副本、一阶动量和二阶方差均匀分成 <span class=\"kb-math kb-math-inline\">N_d</span> 份，第 <span class=\"kb-math kb-math-inline\">i</span> 个进程仅存储和更新第 <span class=\"kb-math kb-math-inline\">i</span> 份。前向和反向仍使用完整参数和梯度（通过标准 all-reduce 同步梯度），更新后通过 all-gather 收集完整参数。内存从 <span class=\"kb-math kb-math-inline\">4\\Psi + 12\\Psi = 16\\Psi</span> 降至 <span class=\"kb-math kb-math-inline\">4\\Psi + 12\\Psi/N_d</span>，当 <span class=\"kb-math kb-math-inline\">N_d</span> 较大时约为 <span class=\"kb-math kb-math-inline\">4\\Psi</span>，实现 <strong>4× 节省</strong>。通信量不变，仍为 <span class=\"kb-math kb-math-inline\">2\\Psi</span>（all-reduce = reduce-scatter + all-gather）。</p>\n<p><strong>Stage 2 — 梯度分区（<span class=\"kb-math kb-math-inline\">P_{os+g}</span>）</strong>：既然每个进程只更新 <span class=\"kb-math kb-math-inline\">1/N_d</span> 的参数，那么它只需要对应分区的规约后梯度。因此将 all-reduce 替换为 <strong>reduce-scatter</strong>：反向传播中每层梯度就绪后，立即通过 reduce-scatter 将不同分区的梯度规约到对应进程，非本分区的梯度内存随即释放。内存进一步降至 <span class=\"kb-math kb-math-inline\">2\\Psi/N_d + 12\\Psi/N_d</span>（加上 <span class=\"kb-math kb-math-inline\">2\\Psi</span> 的 fp16 参数），实现 <strong>8× 节省</strong>。通信量仍为 <span class=\"kb-math kb-math-inline\">2\\Psi</span>（reduce-scatter <span class=\"kb-math kb-math-inline\">\\Psi</span> + all-gather <span class=\"kb-math kb-math-inline\">\\Psi</span>），与标准 DP 完全相同。</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：实现中使用固定大小的桶（bucket）来批量执行 reduce-scatter，在梯度就绪后先写入桶缓冲区，桶满后一次性通信，以提高带宽利用率。</div>\n<p><strong>Stage 3 — 参数分区（<span class=\"kb-math kb-math-inline\">P_{os+g+p}</span>）</strong>：每个进程仅存储 <span class=\"kb-math kb-math-inline\">1/N_d</span> 的 fp16 参数。前向和反向传播中，当需要某一层的完整参数时，通过 all-gather 从各进程临时收集，计算完成后立即丢弃非本分区的参数。总内存降至 <span class=\"kb-math kb-math-inline\">16\\Psi/N_d</span>，<strong>与 <span class=\"kb-math kb-math-inline\">N_d</span> 成线性比例</strong>。通信量增加到 <span class=\"kb-math kb-math-inline\">3\\Psi</span>（前向 all-gather <span class=\"kb-math kb-math-inline\">\\Psi</span> + 反向 all-gather <span class=\"kb-math kb-math-inline\">\\Psi</span> + 反向 reduce-scatter <span class=\"kb-math kb-math-inline\">\\Psi</span>），相比基线的 <span class=\"kb-math kb-math-inline\">2\\Psi</span> 仅增加 <strong>50%</strong>。</p>\n<div class=\"kb-math kb-math-display\">\\text{Stage 3 通信量} = \\underbrace{\\Psi}_{\\text{前向 all-gather}} + \\underbrace{\\Psi}_{\\text{反向 all-gather}} + \\underbrace{\\Psi}_{\\text{反向 reduce-scatter}} = 3\\Psi = 1.5 \\times 2\\Psi</div>\n<h5>ZeRO-R：残余内存优化</h5>\n<p>在 ZeRO-DP 大幅削减模型状态内存后，激活值、临时缓冲区和内存碎片成为次要瓶颈。ZeRO-R 提供三项互补优化：</p>\n<ol>\n<li><strong>激活值分区（<span class=\"kb-math kb-math-inline\">P_a</span>）</strong>：结合激活检查点（activation checkpointing）技术，将检查点激活值在数据并行组间分区存储，需要时通过 all-gather 恢复。对于超大模型，还可将激活值卸载到 CPU 内存。</li>\n<li><strong>固定大小缓冲区（<span class=\"kb-math kb-math-inline\">C_B</span>）</strong>：标准实现中 all-reduce 等操作会将所有梯度融合为一个巨大的扁平缓冲区（如 1.5B 参数模型的 fp32 缓冲区需 6GB）。ZeRO-R 使用固定大小的缓冲区，在保证通信效率的同时避免内存爆炸。</li>\n<li><strong>内存碎片整理（<span class=\"kb-math kb-math-inline\">M_D</span>）</strong>：训练过程中频繁的内存分配/释放导致碎片化，即使总空闲内存充足也可能因缺乏连续空间而 OOM（观察到 30% 以上可用内存无法使用的极端情况）。ZeRO-R 通过预分配连续内存块并主动管理张量生命周期来缓解碎片问题。</li>\n</ol>\n<h5>与传统方法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th>标准数据并行</th>\n<th>模型并行 (Megatron)</th>\n<th>ZeRO-DP</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>单卡内存</td>\n<td><span class=\"kb-math kb-math-inline\">16\\Psi</span>（完全冗余）</td>\n<td><span class=\"kb-math kb-math-inline\">\\sim 16\\Psi/N_m</span></td>\n<td><span class=\"kb-math kb-math-inline\">16\\Psi/N_d</span>（Stage 3）</td>\n</tr>\n<tr>\n<td>通信量</td>\n<td><span class=\"kb-math kb-math-inline\">2\\Psi</span></td>\n<td><span class=\"kb-math kb-math-inline\">\\mathcal{O}(\\Psi \\cdot \\text{layers})</span></td>\n<td><span class=\"kb-math kb-math-inline\">2\\Psi</span> ~ <span class=\"kb-math kb-math-inline\">3\\Psi</span></td>\n</tr>\n<tr>\n<td>可扩展性</td>\n<td>受单卡内存限制</td>\n<td>受节点内带宽限制</td>\n<td>线性扩展至千卡</td>\n</tr>\n<tr>\n<td>实现复杂度</td>\n<td>低</td>\n<td>高（需改模型代码）</td>\n<td>低（优化器层面）</td>\n</tr>\n<tr>\n<td>最大模型</td>\n<td>~1.4B (32GB GPU)</td>\n<td>~20B (跨节点效率低)</td>\n<td>万亿级</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 <strong>关键优势</strong>：ZeRO 与模型并行正交，可以组合使用。实验中 ZeRO + Megatron 张量并行在 400 GPU 上训练 100B 参数模型达到 15 PFlops，实现超线性加速（因为更大的分区使每卡 batch 更适配 GPU 计算特性）。</div>",
      "quiz": {
        "q": "ZeRO-DP Stage 2 (P_os+g) 将标准数据并行的 all-reduce 操作替换为了什么？",
        "options": [
          "all-gather + broadcast",
          "reduce-scatter + all-gather",
          "仅 reduce-scatter",
          "ring all-reduce + reduce"
        ],
        "answer": 1,
        "explain": "Stage 2 在反向传播中用 reduce-scatter 替代 all-reduce 的前半部分，使每个进程仅保留自己分区的规约梯度；更新后再通过 all-gather 收集完整参数。总通信量 = reduce-scatter(Ψ) + all-gather(Ψ) = 2Ψ，与标准 all-reduce 相同。"
      }
    },
    {
      "id": "alpa",
      "num": 10,
      "name": "Alpa",
      "fullName": "Alpa自动并行 (Alpa)",
      "year": "2022",
      "org": "UC Berkeley",
      "parent": "ray",
      "paperUrl": "https://arxiv.org/abs/2201.12023",
      "projectUrl": "",
      "category": "training_platform",
      "motivation": "自动生成算子间与算子内并行策略",
      "summary": "Alpa 提出分层自动并行编译系统，把大模型训练计划分解为算子间 pipeline 并行和算子内 SPMD 张量并行两级搜索，自动为 JAX 程序生成跨设备执行方案。",
      "keyPoints": [
        "重新组织并行搜索空间：用 inter-operator parallelism 表示 stage/pipeline 切分，用 intra-operator parallelism 表示算子内部张量切分",
        "将物理集群抽象为多个 device meshes，使高带宽 mesh 内执行 collective-heavy 的算子内并行，mesh 间执行 point-to-point pipeline 通信",
        "Intra-op pass 用 sharding spec 描述张量布局，为每个 HLO/JAX 算子选择 SPMD 并行算法并插入 resharding collective",
        "Inter-op pass 用动态规划搜索 layer/stage 切分、mesh 切分和 stage-mesh assignment，目标是在显存约束下最小化 pipeline latency",
        "Runtime orchestration pass 为每个 mesh 生成静态执行指令，协调同步 1F1B pipeline schedule 与跨 mesh activation/gradient 传输",
        "以 JAX/XLA 为编译基础、Ray 为分布式运行支撑，让用户通过 <code>@parallelize</code> 标注训练函数而不是手写 Megatron/GPipe/ZeRO 组合策略"
      ],
      "detail": "<p><img alt=\"Alpa 分层并行搜索空间示意图\" src=\"https://ar5iv.labs.arxiv.org/html/2201.12023/assets/x1.png\" />\n<em>图：来自 Alpa 论文 Figure 1，对比手工 plan、仅 intra-op、仅 inter-op 和 Alpa 的 hierarchical space。虚线框表示 pipeline stage，颜色表示不同设备。</em></p>\n<p><img alt=\"Alpa compiler passes 与 runtime 架构图\" src=\"https://ar5iv.labs.arxiv.org/html/2201.12023/assets/x3.png\" />\n<em>图：来自 Alpa 论文 Figure 3，展示 inter-op pass、intra-op pass、runtime orchestration 如何把计算图和设备集群变成多个 mesh executable。</em></p>\n<pre><code class=\"language-python\"># Alpa hierarchical auto-parallel compilation, simplified.\ndef alpa_compile(train_step, cluster):\n    ir = trace_jax_to_hlo(train_step)\n    layers = cluster_hlo_ops_into_layers(ir)\n    candidate_meshes = enumerate_device_mesh_partitions(cluster)\n\n    # Inter-op DP asks the intra-op solver for each candidate stage/mesh cost.\n    cost_cache = {}\n    for layer_interval in all_contiguous_intervals(layers):\n        for mesh in candidate_meshes:\n            stage_hlo = slice_layers(ir, layer_interval)\n            plan, cost, memory = solve_intra_op_ilp(stage_hlo, mesh)\n            if memory &lt;= mesh.memory_budget:\n                cost_cache[layer_interval, mesh] = (plan, cost)\n\n    best = dynamic_programming_over_stage_mesh_pairs(\n        layers=layers,\n        meshes=candidate_meshes,\n        stage_costs=cost_cache,\n        objective=&quot;min_pipeline_latency_with_memory_constraints&quot;,\n    )\n\n    executables = [xla_compile(stage.plan) for stage in best.stages]\n    return build_runtime_schedule(executables, schedule=&quot;sync_1f1b&quot;)\n</code></pre>\n<p>Alpa 要解决的问题是大模型并行策略空间爆炸。对一个 Transformer 或 MoE 模型，用户可能同时需要数据并行、张量并行、ZeRO 式状态分片和 pipeline 并行；每层怎么切、哪些层放一个 stage、哪些 GPU 组成 tensor-parallel group、跨节点怎么流水，彼此强耦合。手工系统如 Megatron-LM 对规则 Transformer 很有效，但模型结构、集群拓扑或 batch 配置变化后，专家需要重新调参。Alpa 的核心观察是：不同并行方式可以按“是否切分单个算子”分成两层，先把联合搜索拆成可求解的子问题。</p>\n<p>Intra-operator parallelism 关注一个 stage 内部的每个算子如何切张量。Alpa 用 sharding spec 描述张量布局，例如矩阵的 batch 维、行维或列维映射到 2D device mesh 的某个轴；如果相邻算子的输入输出布局不一致，就插入 resharding 通信，如 all-gather、all-reduce 或 all-to-all。对一个 stage，intra-op pass 可以抽象成：</p>\n<div class=\"kb-math kb-math-display\">\\min_{\\pi} \\sum_{v \\in V} c_v(\\pi_v) + \\sum_{(u,v)\\in E} r_{u,v}(\\pi_u,\\pi_v)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\pi_v</span> 是算子 <span class=\"kb-math kb-math-inline\">v</span> 的并行算法和输出布局，<span class=\"kb-math kb-math-inline\">c_v</span> 是本地计算/collective 成本，<span class=\"kb-math kb-math-inline\">r_{u,v}</span> 是从上游布局转换到下游布局的 resharding 成本。论文将该问题形式化为 ILP，使同一个 pass 可以表达数据并行、operator parallelism、ZeRO update sharding 及其组合，而不是为每种模型写一套手工规则。</p>\n<p>Inter-operator parallelism 关注 stage 级别的图切分和设备分配。给定一段连续 layers 和一个 mesh，inter-op pass 会调用 intra-op pass 得到该 stage 在该 mesh 上的最优局部成本，然后用动态规划搜索全局 stage-mesh 序列。若同步 1F1B pipeline 有 <span class=\"kb-math kb-math-inline\">K</span> 个 stage、<span class=\"kb-math kb-math-inline\">M</span> 个 microbatch，粗略 latency 可理解为：</p>\n<div class=\"kb-math kb-math-display\">L \\approx \\sum_{s=1}^{K} t_s + (M-1)\\max_s t_s + \\sum_{s=1}^{K-1} \\operatorname{comm}(s,s+1)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">t_s</span> 来自 intra-op solver 的 stage 执行成本，<span class=\"kb-math kb-math-inline\">\\operatorname{comm}</span> 是相邻 mesh 之间传 activation/gradient 的点对点成本。这个公式体现了分层设计的意义：intra-op 尽量在高带宽 mesh 内做 collective 密集的张量切分，inter-op 则把跨 mesh 通信限制在 stage 边界。</p>\n<p>Alpa 的 device mesh 抽象也很关键。现代集群的带宽不是均匀的：同机 GPU 之间可能有 NVLink/PCIe，高速但范围小；跨机网络带宽低且延迟高。Alpa 让 inter-op pass 决定如何把物理设备切成多个 logical mesh，并倾向把通信密集的 intra-op sharding 放在 mesh 内，把只传边界 activation/gradient 的 pipeline 放到 mesh 间。这比“所有 GPU 组成一个大 collective group”更符合实际硬件层次。</p>\n<p>从用户体验看，Alpa 更像一个并行策略编译器。用户写普通 JAX 训练步骤并加 <code>@parallelize</code>，Alpa trace 出 IR 后自动运行 inter-op/intra-op/runtime 三类 pass，最终生成多个 mesh executable 和静态通信计划。它不改变损失函数，也不发明新的优化器；它把 Megatron 的张量并行、GPipe/PipeDream 的流水线并行、ZeRO 的分片思想放入统一搜索框架，降低了大模型训练从单机程序迁移到分布式集群的工程门槛。</p>\n<div class=\"key-point\">💡 关键：Alpa 的创新点是“搜索空间分层”，不是单个新的 collective。它牺牲全局穷举最优性，换来可以在真实大模型和真实集群上编译出接近手工调优的并行计划。</div>",
      "quiz": {
        "q": "Alpa 为什么把自动并行分成 intra-operator 和 inter-operator 两层？",
        "options": [
          "因为这两层分别对应模型训练和模型推理",
          "因为它们的粒度、通信模式和适合的硬件层级不同，分层后搜索空间更可控",
          "因为 JAX 只能表达 pipeline，不能表达 tensor sharding",
          "因为所有算子必须放在同一张 GPU 上运行"
        ],
        "answer": 1,
        "explain": "intra-op 在算子内部切张量，通常需要 mesh 内 collective；inter-op 切 stage，主要做 stage 边界通信。分层优化可以降低组合爆炸。"
      }
    },
    {
      "id": "colossal_ai",
      "num": 11,
      "name": "Colossal-AI",
      "fullName": "Colossal-AI",
      "year": "2023",
      "org": "HPC-AI Tech",
      "parent": "alpa",
      "paperUrl": "https://arxiv.org/abs/2110.14883",
      "projectUrl": "",
      "category": "training_platform",
      "motivation": "统一的大规模并行训练系统",
      "summary": "Colossal-AI 提出一个统一的大规模并行训练系统，把数据并行、流水线并行、多维张量并行、序列并行、ZeRO/异构内存管理和混合精度等能力组织成可组合的训练运行时，解决超大模型训练中“能并行但难组合、能省显存但难写代码”的工程问题。",
      "keyPoints": [
        "统一系统抽象：用 parallel context、execution engine、trainer/hooks 管理复杂混合并行环境",
        "多种并行原语：支持 data parallel、pipeline parallel、1D/2D/2.5D/3D tensor parallel、sequence parallel",
        "增强 sharding/offloading：重设计 sharded tensor 接口，结合 PatrickStar 风格 chunk 管理提升带宽利用率并降低碎片",
        "动态异构内存：Hybrid Adam 根据 GPU 可用空间动态决定 FP32 参数和梯度在 GPU/CPU 间的放置，而不是固定全部 offload",
        "用户友好接口：通过配置和初始化接口把并行策略注入普通 PyTorch 训练循环，后续工程版本演化为 Booster/Plugin 风格",
        "经验结论：多维张量并行在跨节点或非全互联 GPU 拓扑上比 1D tensor parallel 更容易降低通信组规模和显存压力"
      ],
      "detail": "<p><img alt=\"Colossal-AI 系统架构\" src=\"https://ar5iv.labs.arxiv.org/html/2110.14883/assets/x1.png\" />\n<em>图：Colossal-AI 论文 Figure 1，来源于 ar5iv 对 arXiv:2110.14883 的 HTML 渲染。</em></p>\n<pre><code class=\"language-python\"># Colossal-AI 论文 Listing 1 风格的训练流程伪代码\nimport colossalai\n\nconfig = dict(\n    parallel=dict(\n        tensor=dict(size=4, mode=&quot;1d&quot;),\n        pipeline=dict(size=2),\n        sequence=dict(enabled=True),\n    ),\n    fp16=dict(mode=&quot;amp&quot;),\n    zero=dict(stage=3, offload=True),\n)\n\ncolossalai.launch_from_torch(config=config)\n\nengine, trainloader, _ = colossalai.initialize(\n    model=model,\n    optimizer=optimizer,\n    criterion=criterion,\n    train_dataloader=trainloader,\n)\n\nfor data, label in trainloader:\n    engine.zero_grad()\n    output = engine(data)\n    loss = engine.criterion(output, label)\n    engine.backward(loss)\n    engine.step()\n</code></pre>\n<p>Colossal-AI 的出发点不是提出一种单点并行算法，而是把训练大模型时常见的多类手段放进同一个系统边界内。单纯数据并行会复制参数、梯度和优化器状态；单纯张量并行受限于高速互联范围；流水线并行需要切层和调度；ZeRO/offload 又会引入额外通信和 CPU-GPU 数据移动。Colossal-AI 的架构图把这些能力放到 parallel context、model builder、schedule、engine、trainer、hooks 等模块中，核心目标是让用户仍然按普通深度学习训练习惯写模型和训练循环，而并行语义由系统注入。</p>\n<p>在张量并行部分，论文用 Transformer MLP 的矩阵乘说明 1D tensor parallel 的基本形态：</p>\n<div class=\"kb-math kb-math-display\">Y = W_2 W_1 X</div>\n<p>如果在 <span class=\"kb-math kb-math-inline\">N</span> 个设备上切分 <span class=\"kb-math kb-math-inline\">W_1</span> 和 <span class=\"kb-math kb-math-inline\">W_2</span>，每个设备只保存约 <span class=\"kb-math kb-math-inline\">1/N</span> 的权重分片，但需要用 collective 通信聚合局部结果。1D 方案通常让一次 collective 覆盖全部参与设备，因此在单机 NVLink 全互联时很高效，但跨节点或部分互联拓扑上容易被低带宽链路拖慢。Colossal-AI 把 2D、2.5D、3D tensor parallel 也纳入同一系统：这些方案把计算设备组织成网格或立方体，通信只发生在行、列或子组内，用更多维度的切分换取更小的通信组和更低的单卡显存占用。系统层面的判断不是“某一种并行永远最好”，而是最小化每个 rank 的计算、通信与内存移动瓶颈：</p>\n<div class=\"kb-math kb-math-display\">T_{\\text{step}} \\approx \\max_r \\left(T^{\\text{compute}}_r + T^{\\text{comm}}_r + T^{\\text{memory}}_r\\right)</div>\n<p>内存管理是 Colossal-AI 区别于只做模型切分系统的关键。以混合精度 Adam 为例，模型状态通常包含 FP16 参数、FP16 梯度、FP32 master weight、两个 FP32 动量项，显存近似随参数量 <span class=\"kb-math kb-math-inline\">P</span> 线性膨胀：</p>\n<div class=\"kb-math kb-math-display\">M_{\\text{Adam states}} \\approx 2P + 2P + 4P + 8P = 16P\\ \\text{bytes}</div>\n<p>ZeRO 类方法把这些状态沿数据并行组分片，理想情况下单卡模型状态可降到约 <span class=\"kb-math kb-math-inline\">1/D</span>，其中 <span class=\"kb-math kb-math-inline\">D</span> 是数据并行规模：</p>\n<div class=\"kb-math kb-math-display\">M_{\\text{per GPU}} \\approx \\frac{M_{\\text{params}} + M_{\\text{grads}} + M_{\\text{optimizer}}}{D} + M_{\\text{activation}}</div>\n<p>论文进一步指出，普通按 tensor 粒度搬运状态会产生碎片和大量小通信，带宽利用率低。Colossal-AI 因此引入 chunk 思路，把初始化顺序相近的一组参数放入连续内存块，以 chunk 为单位进行通信、offload 和生命周期管理。这让许多小 tensor 的移动变成少量大块移动，减少 kernel launch 与内存碎片，同时更适合 PCIe、NVLink、RDMA 等链路的带宽特性。</p>\n<p>增强 sharding/offloading 还体现在生命周期复用上。前向阶段需要 FP16 参数，反向阶段参数使用结束后会产生 FP16 梯度；Colossal-AI 允许在合适位置复用 FP16 参数存储来放置 FP16 梯度，从而降低峰值显存。Hybrid Adam 则避免 DeepSpeed ZeRO-Offload 中“FP32 master weight 全部放 CPU”的静态策略：如果 GPU 仍有空闲内存，系统会把一部分 FP32 参数和梯度保留在 GPU 上更新，只把必要部分移到 CPU。这个机制的直觉是：offload 节省显存但增加数据移动，静态 offload 可能浪费 GPU 空间；动态 placement 能在显存余量和通信成本之间取更好的折中。</p>\n<p>与 Alpa 的自动搜索路线相比，Colossal-AI 更偏“统一训练平台 + 手动/配置化组合并行能力”。Alpa 试图在编译图上自动搜索 pipeline/tensor 计划，Colossal-AI 则强调可插拔模块、常用并行策略覆盖和 PyTorch 生态可用性。对工程用户来说，这种设计的价值在于降低采用门槛：同一个模型可以根据硬件拓扑选择 1D/2D/2.5D/3D 张量并行，根据模型深度选择流水线并行，根据显存压力启用 ZeRO、chunk、offload、activation checkpointing 和 AMP，而不是重写一套训练框架。</p>\n<div class=\"key-point\">💡 关键：Colossal-AI 的核心贡献是把“并行策略选择”“模型状态生命周期”“通信组管理”“用户训练接口”放进同一个运行时，使大模型训练从手写分布式程序变成可配置、可组合的系统工程问题。</div>",
      "quiz": {
        "q": "Colossal-AI 为什么要在 ZeRO/offload 之外引入 chunk-based memory management？",
        "options": [
          "把多个小 tensor 组织成连续大块，降低碎片并提升通信/搬运带宽利用率",
          "把模型参数全部复制到每张 GPU 上，减少通信",
          "只为了改变模型的损失函数",
          "让训练完全不需要数据并行"
        ],
        "answer": 0,
        "explain": "chunk 以连续内存块为通信和生命周期管理单位，能减少小 tensor 通信和内存碎片；它与 ZeRO/offload 是互补关系。"
      }
    },
    {
      "id": "megascale",
      "num": 12,
      "name": "MegaScale",
      "fullName": "MegaScale万卡训练 (MegaScale)",
      "year": "2024",
      "org": "ByteDance",
      "parent": "deepspeed",
      "paperUrl": "https://arxiv.org/abs/2402.15627",
      "projectUrl": "",
      "category": "training_platform",
      "motivation": "万卡规模训练的容错与通信优化",
      "summary": "MegaScale 是字节跳动面向超过 10,000 张 GPU 的生产级 LLM 训练系统，通过算法-系统协同、3D 并行通信重叠、网络调优、深度可观测性和快速故障恢复，解决万卡同步训练的效率与稳定性问题。",
      "keyPoints": [
        "生产目标：在 12,288 张 GPU 上训练 175B Transformer，报告 55.2% MFU，相比 Megatron-LM 提升 1.34 倍",
        "算法优化：采用 parallel transformer block、sliding window attention、LAMB optimizer 降低计算和流水线 bubble",
        "通信重叠：分别针对 data parallel、pipeline parallel、tensor/sequence parallel 设计 all-gather、reduce-scatter、send/receive 与 GEMM 的重叠",
        "算子与数据链路：使用 FlashAttention-2、LayerNorm/GeLU kernel fusion、异步数据预处理和单机共享 dataloader",
        "大规模初始化与网络：用 Redis 替换 TCPStore、减少全局 barrier，把通信组初始化复杂度从 <span class=\"kb-math kb-math-inline\">O(n^2)</span> 降到 <span class=\"kb-math kb-math-inline\">O(n)</span>，并调优 ECMP、拥塞控制和 NCCL 重传",
        "容错闭环：driver、executor、heartbeat、诊断测试、坏节点隔离、两阶段 checkpoint 和恢复读放大优化共同提高长期 goodput"
      ],
      "detail": "<p><img alt=\"MegaScale 张量/序列并行通信重叠\" src=\"https://arxiv.org/html/2402.15627v1/x3.png\" />\n<em>图：MegaScale 论文 Figure 3，展示 parallel transformer block 中 TP/SP 通信与 FFN/GEMM 的融合和重叠，来源于 arXiv HTML。</em></p>\n<pre><code class=\"language-python\"># MegaScale 风格的生产训练控制循环伪代码\ndriver.submit(job)\n\nwhile not job.finished:\n    pods = kubernetes.allocate_or_replace_nodes(job.world_size)\n    executors = launch_training_processes(pods, parallel_plan_3d)\n    robust_daemons = start_heartbeat_daemons(executors)\n\n    while job.running:\n        metrics = collect(\n            cuda_events=True,\n            rdma_traffic=True,\n            nccl_errors=True,\n            heartbeat=True,\n            step_latency=True,\n        )\n        if detect_fault_or_straggler(metrics):\n            driver.suspend_all_executors()\n            bad_nodes = run_lightweight_diagnostics(executors)\n            kubernetes.evict_and_replenish(bad_nodes)\n            ckpt = locate_latest_checkpoint()\n            executors = relaunch_from_checkpoint(ckpt)\n            break\n\n        overlap_dp_pp_tp_sp_communications()\n        if should_checkpoint():\n            dump_gpu_state_to_host_pinned_memory()\n            async_flush_host_state_to_hdfs()\n</code></pre>\n<p>MegaScale 的核心观察是：万卡训练下，“单步最快”不等于“长期训练最快”。同步 LLM 训练中，一个慢节点会拖住整组 collective；一个 GPU、RNIC、链路或文件系统异常都会让作业暂停；训练持续数周时，小概率故障会变成常态。因此论文把效率定义为长期稳定的有效训练吞吐，常用指标包括 MFU 和 goodput：</p>\n<div class=\"kb-math kb-math-display\">\\text{MFU}=\\frac{\\text{observed model FLOPs per second}}{\\text{hardware peak FLOPs per second}}</div>\n<div class=\"kb-math kb-math-display\">\\text{goodput} \\approx \\frac{\\text{useful training steps or tokens}}{\\text{wall-clock time including failure and recovery}}</div>\n<p>算法层面，MegaScale 先减少每步计算和流水线浪费。Parallel transformer block 把传统串行结构：</p>\n<div class=\"kb-math kb-math-display\">y = x + \\text{MLP}(\\text{LN}(x + \\text{Attention}(\\text{LN}(x))))</div>\n<p>改写为：</p>\n<div class=\"kb-math kb-math-display\">y = x + \\text{MLP}(\\text{LN}(x)) + \\text{Attention}(\\text{LN}(x))</div>\n<p>这样 Attention 和 MLP 两条分支可以并行执行，更适合与 TP/SP 通信重叠。Sliding window attention 把长度为 <span class=\"kb-math kb-math-inline\">s</span> 的全量注意力从 <span class=\"kb-math kb-math-inline\">O(s^2)</span> 降到 <span class=\"kb-math kb-math-inline\">O(s \\cdot w)</span>，其中 <span class=\"kb-math kb-math-inline\">w</span> 是窗口大小；多层堆叠后仍可形成较大感受野。LAMB optimizer 则允许在不损害收敛的情况下放大全局 batch。论文给出 interleaved pipeline 的 bubble 对比：连续 4 个 1x batch step 的 bubble 约为</p>\n<div class=\"kb-math kb-math-display\">\\frac{4}{v}\\frac{p-1}{m}</div>\n<p>而使用 4x batch 做 1 个 step 的 bubble 约为</p>\n<div class=\"kb-math kb-math-display\">\\frac{1}{v}\\frac{p-1}{4m}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">p</span> 是 pipeline stage 数、<span class=\"kb-math kb-math-inline\">m</span> 是 micro-batch 数、<span class=\"kb-math kb-math-inline\">v</span> 是 virtual pipeline size，因此 bubble 理论上降低 87.5%。</p>\n<p>系统层面，MegaScale 对 3D 并行中的不同通信路径分别处理。数据并行使用 ZeRO2 时，前向需要 all-gather 参数，反向需要 reduce-scatter 梯度；MegaScale 按 model chunk 触发通信，并把第一次 all-gather 预取到 iteration 开始，与数据加载重叠。流水线并行使用 interleaved 1F1B，但不把 send/receive 绑定成阻塞对：warm-up、steady 和 cool-down 阶段中，只要当前计算不依赖某个通信结果，就把 send 或 receive 异步发起。张量/序列并行更棘手，因为 LayerNorm/Dropout 沿 sequence 维切分会引入 all-gather 和 reduce-scatter；MegaScale 将这些通信融合到 FFN 的 parallel Linear 路径，并把 GEMM 切成小块，使通信可以在大 GEMM 执行期间被隐藏。</p>\n<p>在万卡规模，初始化和网络调优也会变成训练系统的一部分。默认 <code>torch.distributed</code> 在大量 NCCL group 初始化时依赖 TCPStore 和全局 barrier，论文测得 Megatron-LM 在 2,048 张 Ampere GPU 上初始化约 1047 秒。MegaScale 用非阻塞异步的 Redis 替换 TCPStore，并重新设计通信组初始化顺序，减少不必要全局 barrier，把 barrier 复杂度从 <span class=\"kb-math kb-math-inline\">O(n^2)</span> 降到 <span class=\"kb-math kb-math-inline\">O(n)</span>，使 2,048 GPU 初始化低于 5 秒，超过 10,000 GPU 时低于 30 秒。网络上，MegaScale 还针对 CLOS-like 三层交换网络、ToR 下多 rail、ECMP hash conflict、PFC/HoL blocking、DCQCN/Swift 风格拥塞控制和 NCCL retransmit timeout 做专门调优。</p>\n<p>容错部分体现了 MegaScale 与普通训练框架的边界差异。每个 executor 管理一个节点并启动 GPU 训练进程，同时有 robust daemon 周期性向 driver 发送 heartbeat，包含进程状态、日志、硬件信息和 RDMA 指标。driver 发现异常或 heartbeat 超时后会暂停全局训练，触发轻量诊断：单机内 RNIC loopback、RNIC-to-RNIC、单机 GPU all-to-all、同 ToR 邻近机器 all-reduce 等，用来定位坏卡、坏链路或异常节点。坏节点被 Kubernetes 驱逐并补齐，作业从最近 checkpoint 恢复。checkpoint 采用两阶段：GPU worker 先把状态写入 host pinned memory 后立刻继续训练，后台进程异步刷到 HDFS；恢复时由同一数据并行组中的一个 worker 读取共享 state partition，再广播给组内其他 worker，降低 HDFS 读放大。</p>\n<div class=\"key-point\">💡 关键：MegaScale 的贡献不只是“用了更多 GPU”，而是把模型结构、并行调度、通信库、网络、数据加载、监控、诊断和 checkpoint 都纳入同一个闭环，目标是在故障频繁发生的万卡环境里维持长期有效吞吐。</div>",
      "quiz": {
        "q": "MegaScale 为什么特别强调 goodput 而不仅是单步吞吐？",
        "options": [
          "万卡训练中故障、straggler、checkpoint 和恢复时间会显著影响长期有效训练速度",
          "goodput 只衡量单卡峰值算力",
          "goodput 与通信和容错无关",
          "只要使用 FlashAttention-2，goodput 一定等于 MFU"
        ],
        "answer": 0,
        "explain": "万卡同步训练下，小概率故障会频繁出现；长期有效吞吐必须把暂停、诊断、重启和恢复成本计入。"
      }
    },
    {
      "id": "nnscaler",
      "num": 13,
      "name": "nnScaler",
      "fullName": "nnScaler",
      "year": "2024",
      "org": "Microsoft",
      "parent": "alpa",
      "paperUrl": "https://arxiv.org/abs/2312.05009",
      "projectUrl": "",
      "category": "training_platform",
      "motivation": "约束引导的并行策略生成",
      "summary": "nnScaler 提出 constraint-guided parallelization plan generation，用 `op-trans`、`op-assign`、`op-order` 三个并行原语和用户约束构造可搜索的并行计划空间，解决固定 3D 并行或手写策略无法覆盖新模型高效训练计划的问题。",
      "keyPoints": [
        "三个并行原语：<code>op-trans(op, algo, n)</code> 描述算子/张量变换，<code>op-assign(op, d)</code> 描述设备放置，<code>op-order(op1, op2)</code> 描述同设备无依赖算子的执行顺序",
        "约束引导搜索：用专家约束把巨大搜索空间收缩到可搜索子空间，同时仍能表达 DP/TP/PP、Alpa 风格 staged SPMD 和新策略",
        "新计划空间：为 SwinTransformer 的 co-shard、T5 大 embedding 跨全设备切分、AlphaFold2 的 3F1B 调度构造传统系统难表达的并行计划",
        "搜索策略组合：先抽取 staged_spmd 子空间并复用 Alpa 搜索，再用 ILP 优化 partition/placement，最后用 Tessel/Z3 搜索 temporal order",
        "编译正确性：vTensor-pTensor 用 mask 跟踪切分前后的数据 lineage，检测依赖、发现可能死锁的 cycle，并自动插入 split/chunk、send/recv、allgather、allreduce、alltoall",
        "PyTorch 落地：把单卡 PyTorch 模型转换为 Graph IR，应用计划后生成每个设备的 PyTorch 子图并用 <code>torchrun</code> 分布式执行"
      ],
      "detail": "<p><img alt=\"nnScaler 并行原语的时空调度抽象\" src=\"https://www.microsoft.com/en-us/research/wp-content/uploads/2024/09/nnscaler-1-1024x483.jpg\" />\n<em>图：Microsoft Research 官方文章 Figure 1，展示 DNN 数据流图、算子切分和 spatial-temporal schedule。</em></p>\n<p><img alt=\"nnScaler 文档中的并行化流程\" src=\"https://nnscaler.readthedocs.io/en/latest/_images/nnScaler_flow.png\" />\n<em>图：nnScaler 官方文档流程图，展示从单卡 DNN model program 到多设备 parallel execution 的编译路径。</em></p>\n<pre><code class=\"language-python\"># nnScaler 论文 Algorithm 1 风格的计划搜索与编译伪代码\ndef generate_parallel_plan(model, devices, user_constraints):\n    G = trace_to_graph_ir(model)  # PyTorch -&gt; Graph IR\n\n    C_trans, C_assign, C_order = build_space_with_primitives(\n        G,\n        primitives=[\n            &quot;op-trans(op, algo, n)&quot;,\n            &quot;op-assign(op, device)&quot;,\n            &quot;op-order(op1, op2)&quot;,\n        ],\n        constraints=user_constraints,\n    )\n\n    # 1. 在能复用现有搜索器的子空间内先搜索\n    G_sub, C_sub_trans, C_sub_assign = GetSubSpace(G, C_trans, C_assign)\n    C_new_trans, C_new_assign = Alpa(G_sub, C_sub_trans, C_sub_assign)\n\n    # 2. 收缩剩余空间，并用 ILP 找到全图 partition/placement\n    C_trans, C_assign = ShrinkSpace(C_trans, C_new_trans, C_assign, C_new_assign)\n    final_trans, final_assign = ILP(\n        G,\n        C_trans,\n        C_assign,\n        objective=&quot;minimize max_d(Comp_d + Comm_d)&quot;,\n    )\n\n    # 3. 搜索同设备上无依赖算子的 temporal order\n    final_order = Tessel(G, final_trans, final_assign, C_order)\n\n    # 4. 编译计划：应用原语、检查依赖、插入通信、生成每卡 PyTorch 代码\n    dist_ir = apply_primitives(G, final_trans, final_assign, final_order)\n    dist_ir = materialize_dependencies_with_vtensor_ptensor(dist_ir)\n    dist_ir = insert_collectives_and_send_recv(dist_ir)\n    return lower_to_pytorch_per_device(dist_ir)\n</code></pre>\n<p>nnScaler 的问题设定是：大模型训练的并行计划不仅要决定“张量怎么切”，还要决定“切完的算子放在哪些 GPU 上”和“同一 GPU 上多个可交换算子按什么顺序跑”。Megatron-LM、DeepSpeed 这类系统把高效但有限的 3D 并行模式工程化；Alpa 扩大了自动搜索空间，但仍依赖预定义的层级空间。nnScaler 的观点是，固定搜索空间会排除很多对新模型很关键的计划，例如某些大 activation 算子可以让多个分片共享同一 GPU 顺序执行来减少通信，或者 T5 这类模型的大 embedding 表占显存多但计算少，应该跨全设备切分而不是独占某个 pipeline stage。</p>\n<p>三类原语是整个系统的最小表达单元：</p>\n<div class=\"kb-math kb-math-display\">\\text{op-trans}(op, algo, n): op \\rightarrow \\{op_1,\\dots,op_n\\}</div>\n<div class=\"kb-math kb-math-display\">\\text{op-assign}(op_i, d): op_i \\mapsto d,\\quad d \\in D</div>\n<div class=\"kb-math kb-math-display\">\\text{op-order}(op_i, op_j): op_i \\prec op_j</div>\n<p>其中 <code>op-trans</code> 负责把一个算子按 batch、hidden、head、sequence 等维度切成子算子，也可以扩展为 recompute 或 swap 等变换；<code>op-assign</code> 负责把子算子映射到设备；<code>op-order</code> 则只约束没有数据依赖但共享设备的算子顺序。约束把这些原语的参数固定或限制到一个集合。例如 data/tensor parallel 可表达为“均匀切成 <span class=\"kb-math kb-math-inline\">|D|</span> 份，且每个 sub-op 放在不同设备上”；1F1B pipeline 可表达为对 forward/backward micro-batch 的一组 <code>op-order</code> 约束；AlphaFold2 的 3F1B 则用新的 <code>op-order</code> 约束交错三个 forward pass 和一个 backward pass。</p>\n<p>搜索目标并不是穷举全部计划，而是逐步缩小空间。论文的 partition/placement 目标可写成：</p>\n<div class=\"kb-math kb-math-display\">\\min \\max_{d \\in D}\\left\\{\\text{Comp}_d + \\text{Comm}_d\\right\\}</div>\n<p>这里 <span class=\"kb-math kb-math-inline\">\\text{Comp}_d</span> 是设备 <span class=\"kb-math kb-math-inline\">d</span> 上被分配算子的计算时间，<span class=\"kb-math kb-math-inline\">\\text{Comm}_d</span> 是由分片和跨设备数据依赖引入的通信时间。这个问题可归约为整数线性规划，天然难解；nnScaler 的关键是让专家约束先把空间切小，再复用已有搜索器。对 staged SPMD 子空间，它可以调用 Alpa 类搜索；对剩余约束，它用 ILP 求 final transformation/assignment；对 temporal order，它调用 Tessel，把每个 sub-graph 分配到整数 time slot，并用 Z3 枚举不违反依赖的顺序。也就是说，nnScaler 的贡献不是单独发明一个新搜索器，而是让不同搜索策略能在统一原语/约束接口下组合。</p>\n<p>编译正确性由 vTensor-pTensor 负责。pTensor 表示原始逻辑模型中的张量，vTensor 表示应用并行原语后某个算子实际访问的张量片段；每个 vTensor 记录自己对应 pTensor 的 mask。两个 vTensor 是否存在数据依赖，可以通过它们是否来自同一 pTensor 且 mask 是否相交判断：</p>\n<div class=\"kb-math kb-math-display\">\\text{dep}(v_i, v_j) \\Longleftrightarrow p(v_i)=p(v_j)\\ \\land\\ \\text{mask}(v_i)\\cap\\text{mask}(v_j)\\neq\\emptyset</div>\n<p>这种 lineage 追踪让 nnScaler 可以在切分和重排后重新构造数据流图，发现可能导致 deadlock 的 cycle，并在 materialization 阶段插入具体数据操作。如果 producer 和 consumer 在同设备，可能只需要 <code>torch.split</code> 或 <code>torch.chunk</code>；如果跨设备，先插入 send/recv；如果多个 vTensor 的访问模式构成常见 collective，系统会用 allgather、allreduce 或 alltoall 替换点对点通信，以获得更好的通信效率。</p>\n<p>从工程角度看，nnScaler 把“模型代码”和“并行计划代码”解耦。模型开发者可以继续写单 GPU PyTorch，系统专家用约束描述计划空间；Graph IR 生成后，nnScaler 应用计划、插入通信、把每个设备的子图降回 PyTorch 代码文件，再由 <code>torchrun</code> 并行执行。论文报告其在 SwinTransformer、T5、AlphaFold2 等模型上发现传统 DeepSpeed、Megatron-LM、Alpa 搜索空间之外的计划，最高获得 3.5 倍训练加速；官方文档也强调它的定位是把单卡 DNN 程序编译为可在多 GPU 上并行运行的程序。</p>\n<div class=\"warn-box\">⚠️ 注意：给定元信息中的 arXiv URL <code>2312.05009</code> 与 nnScaler 论文不匹配；本文细节依据官方 USENIX OSDI 2024 论文、Microsoft Research 官方文章和 nnScaler 官方文档完成。</div>",
      "quiz": {
        "q": "nnScaler 中 vTensor-pTensor 抽象的主要作用是什么？",
        "options": [
          "跟踪算子切分后的张量 lineage 和 mask，用于依赖检查、死锁避免与通信插入",
          "把所有张量永久复制到每张 GPU 上",
          "替代 PyTorch 的自动求导数学规则",
          "只用于记录实验日志"
        ],
        "answer": 0,
        "explain": "pTensor 表示原始逻辑张量，vTensor 表示切分后的访问片段；mask 相交关系让系统能重建数据依赖并选择 send/recv 或 collective 通信。"
      }
    },
    {
      "id": "axlearn",
      "num": 14,
      "name": "AXLearn",
      "fullName": "AXLearn",
      "year": "2026",
      "org": "Apple",
      "parent": "pytorch",
      "paperUrl": "https://mlsys.org/Conferences/2026/Schedule?type=Poster",
      "projectUrl": "",
      "category": "training_platform",
      "motivation": "模块化、硬件无关训练平台",
      "summary": "AXLearn 提出模块化、硬件无关的大模型训练平台，用严格封装的层级配置、JAX/XLA/GSPMD 编译栈和云无关运行时，解决大模型团队在模型变体、硬件后端和生产训练运维之间反复改代码的问题。",
      "keyPoints": [
        "以严格封装的 <code>Module + Config</code> 体系替代继承式扩展，让 MoE、RoPE、FlashAttention、量化等功能可以作为可组合模块注入",
        "提出 LoC-complexity 度量，用“新增功能随模块数增长需要改多少现有代码”衡量训练框架可扩展性",
        "AXLearn Composer 将 Python 层级配置物化为 JAX 程序，并注入 mesh、sharding、attention kernel、rematerialization 和编译选项",
        "AXLearn Runtime 负责分布式作业编排、checkpoint、监控、故障恢复、SDC/hang 检测以及多云环境下的弹性运行",
        "通过 mesh rules 为 GPU、TPU、AWS Trainium/Trainium2 等不同后端选择不同并行、精度、内存和 kernel 策略",
        "支持 AOT 编译分析，在大规模运行前本地检查 OOM、FLOPs、sharding 和编译错误",
        "官方论文/项目资料显示 AXLearn 可训练数百亿到数千亿参数模型，并在 TPU/GPU/Trainium 后端保持接近主流训练系统的性能"
      ],
      "detail": "<p><img alt=\"AXLearn 系统架构图\" src=\"https://arxiv.org/html/2507.05411v1/x2.png\" />\n<em>图：来自 AXLearn 论文 Figure 2，蓝色部分为 AXLearn；用户配置经 Composer 转换为 JAX/XLA 程序，再由 Runtime 在 Kubernetes/云硬件上编排执行。</em></p>\n<p><img alt=\"AXLearn invocation context\" src=\"https://arxiv.org/html/2507.05411v1/extracted/6594419/figures/context.png\" />\n<em>图：来自 AXLearn 论文的 invocation context 示例，展示模块调用过程中如何集中管理随机数、状态和输出集合，避免子模块私自穿透封装。</em></p>\n<pre><code class=\"language-python\"># AXLearn 配置组合、硬件适配与训练执行伪代码\ndef build_axlearn_job(target_hardware: str):\n    cfg = Trainer.default_config()\n    cfg.model = DecoderOnlyTransformer.default_config()\n    cfg.input = TextInput.default_config()\n    cfg.learner = AdamW.default_config()\n\n    # 功能通过 config tree 注入，而不是修改 Transformer/Trainer 的现有接口。\n    cfg = replace_submodules(cfg, old=FeedForwardLayer, new=MoELayer.default_config())\n    cfg = attach_rope(cfg, target=AttentionLayer, rope=RoPE.default_config())\n\n    # mesh rule 根据硬件后端选择不同的并行、重算、低精度和 kernel。\n    if target_hardware == &quot;tpu-v5e&quot;:\n        cfg = apply_mesh_rule(cfg, fsdp_within_slice=True, dp_across_slices=True)\n        cfg = enable_int8_training(cfg)\n        cfg = offload_dot_activations_to_host(cfg)\n    elif target_hardware == &quot;h100&quot;:\n        cfg = apply_mesh_rule(cfg, tensor_parallel=8, fsdp_across_nodes=True)\n        cfg = enable_fp8_training(cfg, delayed_scaling=True)\n        cfg = save_remat_points(cfg, tags=[&quot;q&quot;, &quot;k&quot;, &quot;v&quot;, &quot;o&quot;])\n    elif target_hardware == &quot;trainium2&quot;:\n        cfg = select_attention_kernel(cfg, backend=&quot;neuron_nki&quot;)\n\n    jax_program, xla_options = AXLearnComposer.materialize(cfg)\n    AXLearnComposer.aot_check(jax_program, xla_options)\n    executable = XLA.compile(jax_program, xla_options)\n    AXLearnRuntime.run(executable, checkpoint=True, monitor=True, fault_tolerant=True)\n</code></pre>\n<p>AXLearn 的核心问题不是单个 Transformer 算子的速度，而是生产环境中模型工程复杂度会随模型、功能和硬件后端成倍增长。传统继承式系统常把 RoPE、MoE、attention kernel、KV cache 或量化参数沿着多层构造函数向下传递；一旦新增一个功能，父模块、子模块、trainer、loss、checkpoint 逻辑都可能要改。AXLearn 把每个组件视为配置树中的节点：节点只暴露自己的 config、输入输出和状态集合，父节点通过组合选择子节点实现。这样新增 MoE 时可以把 FFN 子树替换成 MoE 子树，而不要求所有 Transformer 变体都新增 MoE 参数。</p>\n<p>论文用 LoC-complexity 把这种工程差异形式化。设 <span class=\"kb-math kb-math-inline\">n</span> 为系统中的模块数量，<span class=\"kb-math kb-math-inline\">k</span> 为某类新功能的变体数，若新增功能需要修改每个祖先模块或每种 attention/model 组合，复杂度会近似增长为：</p>\n<div class=\"kb-math kb-math-display\">C_{\\text{subtyping}}(F) = \\Omega(n) \\quad \\text{or} \\quad \\Omega(nk)</div>\n<p>AXLearn 的目标是把功能封装在独立模块和 config modifier 中，使新增功能对现有模块接口的修改保持常数级：</p>\n<div class=\"kb-math kb-math-display\">C_{\\text{AXLearn}}(F) = O(1)</div>\n<p>这不是简单少写几行配置，而是让“功能扩展”不再污染已有模型的公共 API。论文以 RoPE/MoE 为例说明，AXLearn 可用约 10 行配置在大量实验中启用这些功能；相同功能在扁平 config 或继承式系统中往往需要修改 attention、MLP、model wrapper、loss 或 trainer 的签名。</p>\n<p>Composer 是从“模块化配置”到“可高效执行程序”的桥梁。用户仍然写 Python config，但 Composer 会完成更接近编译器的工作：选择 accelerator mesh shape，为参数和激活添加 sharding annotation，按后端挑选 attention kernel，设置 XLA 编译选项，并根据模块树里的 tag 选择 rematerialization 策略。一个 Linear 层可以用类似 <code>(\"fsdp\", \"model\")</code> 的 partition spec 表达“参数同时沿 FSDP 和 tensor parallel 轴切分”；XLA/GSPMD 再把全局程序 lowers 成每个设备的 SPMD 程序。关键是模型定义不需要硬编码“这是 GPU 版”或“这是 TPU 版”。</p>\n<p>硬件无关性体现在 mesh rules。TPU v5e 的片内 ICI 和片间 DCN 拓扑适合“片内 FSDP、片间 DP、INT8、host offload”；H100 节点内 NVLink 强，常见选择是 8-way tensor parallel 叠加跨节点 FSDP，并使用 FP8 delayed scaling；Trainium 则可能需要 Neuron/NKI kernel。AXLearn 把这些策略写成 target-dependent config modifiers：同一份模型结构在不同硬件上切换并行轴、保存/重算点、低精度格式和 kernel，不改模型代码。</p>\n<p>Runtime 处理的是论文中容易被忽略但生产训练必须面对的部分：分布式作业提交、checkpoint、日志指标、故障恢复、hang recovery、silent data corruption 检测和云厂商差异。训练数百亿到数千亿参数模型时，系统错误不是异常事件，而是常态；因此 AXLearn 把容错和可观测性放进平台层，而不是留给每个实验脚本。AOT 编译也服务于这个目标：先在单机上检查 sharding、OOM 和 FLOPs，再把作业发到大集群，减少昂贵的失败启动。</p>\n<p>与 Megatron-LM/DeepSpeed 这类以张量并行或状态分片为核心的系统相比，AXLearn 的贡献更偏“训练平台抽象”。它并不否定 TP/FSDP/remat/FlashAttention，而是把这些策略放进可组合、可测试、可迁移的配置系统中。真正的收益来自长期迭代：当模型、后端和 kernel 不断变化时，研究代码仍能保持局部替换，而不是把每个新功能扩散成一次全仓库接口迁移。</p>\n<div class=\"key-point\">💡 关键：AXLearn 把大模型训练系统拆成“可组合模型模块 + 后端感知 Composer + 生产 Runtime”三层，使研究者主要表达模型意图，平台层再根据硬件和规模选择执行策略。</div>",
      "quiz": {
        "q": "AXLearn 为什么要提出 LoC-complexity，而不是只统计当前实现的代码行数？",
        "options": [
          "因为它想衡量新增功能随模块和变体数量扩展时需要修改多少现有接口代码",
          "因为 JAX 代码无法统计行数",
          "因为 LoC-complexity 直接等价于训练吞吐",
          "因为它用于替代 checkpoint 机制"
        ],
        "answer": 0,
        "explain": "LoC-complexity 关注功能扩展时修改面是否随模块数增长；AXLearn 通过严格封装和组合式配置把这种修改面压到常数级。"
      }
    },
    {
      "id": "protrain",
      "num": 15,
      "name": "ProTrain",
      "fullName": "ProTrain",
      "year": "2026",
      "org": "MLSys Community",
      "parent": "deepspeed",
      "paperUrl": "https://mlsys.org/Conferences/2026/Schedule?type=Poster",
      "projectUrl": "",
      "category": "training_platform",
      "motivation": "自动内存管理机制，动态张量生命周期分析",
      "summary": "ProTrain 提出了一套自适应内存管理系统，通过 Chunk 级模型状态管理、Block 级激活管理和内存感知运行时 Profiler 三大组件的协同，自动搜索最优的 offloading/checkpointing/swapping 配置，无需用户手动调参即可在有限 GPU 内存下实现 1.43×–2.71× 的训练吞吐量提升。",
      "keyPoints": [
        "<strong>Chunk-Based Model State Management</strong>：将模型状态（参数、梯度、优化器状态）组织为统一大小的 Chunk，支持 5 种关键操作（all-gather、reduce-scatter、upload、offload、prefetch），并引入 persistent chunk（常驻 GPU）和 chunk buffer 减少动态内存分配",
        "<strong>Block-Wise Activation Management</strong>：以 Transformer Block 为粒度管理激活，每个 Block 独立选择 swapping / checkpointing / 不处理三种策略，采用交错式 swapping+checkpointing 布局隐藏通信开销",
        "<strong>Memory-Aware Runtime Profiler</strong>：采用 drop-and-regenerate 方法在有限内存下完成全模型 profiling，通过 hook 机制推断不可 hook 算子的内存和时间开销",
        "<strong>Adaptive Memory Management</strong>：包含 Chunk-Aware Runtime Estimator、Peak Memory Usage Estimator 和 Optimal Configuration Search 三个子模块，自动搜索最优配置",
        "<strong>核心公式</strong>：<span class=\"kb-math kb-math-inline\">T_{\\text{Iteration}} = T_{\\text{FWD}} + \\max\\{T_{\\text{BWD}} + T_{\\text{GPU\\_OPTIM}},\\; T_{\\text{CPU\\_OPTIM}}\\}</span>",
        "<strong>实验结果</strong>：在 RTX 3090 上训练模型规模可达 DeepSpeed 的 2×，吞吐量平均提升 1.77×–2.71×；在 A100 上模型规模可达 FSDP 的 7×，吞吐量提升 1.43×–2.25×"
      ],
      "detail": "<h5>系统架构总览</h5>\n<p><img alt=\"ProTrain Chunk-Based Model State Management\" src=\"https://arxiv.org/html/2406.08334v2/x1.png\" />\n<em>图 1：Chunk-Based Model State Management 的五种关键操作示意。每个 Chunk 在分布式训练中被均匀分片到各 GPU，通过 all-gather 聚合、reduce-scatter 归约、upload/offload 在 CPU-GPU 间迁移。</em></p>\n<p><img alt=\"ProTrain Block-Wise Activation Management\" src=\"https://arxiv.org/html/2406.08334v2/x2.png\" />\n<em>图 2：Block-Wise Activation Management 布局及内存使用趋势。展示了 swapping block、checkpointing block 和普通 block 的交错排布策略。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># ProTrain 自适应内存管理搜索伪代码\ndef protrain_adaptive_search(model, hardware_info):\n    # Step 1: Memory-Aware Runtime Profiling\n    profiler = MemoryAwareProfiler(model)\n    profiler.drop_and_regenerate_profile()  # 逐层 profile，丢弃非当前层数据\n    op_times, op_memory, peak_memory = profiler.collect()\n\n    # Step 2: 枚举配置空间\n    best_config, best_time = None, float('inf')\n    for n_persistent in range(0, max_persistent + 1):       # persistent chunk 数量\n        for n_chunk_buf in range(1, max_buf + 1):            # chunk buffer 数量\n            for swap_interval in candidate_intervals:         # activation swap 间隔\n                # Step 3: Chunk-Aware Runtime Estimation\n                T_fwd = estimate_forward(op_times, n_persistent, n_chunk_buf)\n                T_bwd = estimate_backward(op_times, n_persistent, swap_interval)\n                T_gpu_optim = estimate_gpu_optim(n_persistent)\n                T_cpu_optim = estimate_cpu_optim(n_persistent, n_chunk_buf)\n                T_iter = T_fwd + max(T_bwd + T_gpu_optim, T_cpu_optim)\n\n                # Step 4: Peak Memory Usage Estimation\n                peak_mem = estimate_peak_memory(\n                    n_persistent, n_chunk_buf, swap_interval,\n                    op_memory, peak_memory\n                )\n\n                # Step 5: 选择满足内存约束的最快配置\n                if peak_mem &lt;= hardware_info.gpu_memory and T_iter &lt; best_time:\n                    best_config = (n_persistent, n_chunk_buf, swap_interval)\n                    best_time = T_iter\n\n    return best_config\n\n# ProTrain 单次迭代训练流程\ndef protrain_train_step(model, data, config):\n    n_persistent, n_chunk_buf, swap_interval = config\n\n    # Forward: 逐 chunk prefetch + 计算，activation 按策略处理\n    for block_id, chunk in enumerate(model.chunks):\n        prefetch_next_chunk(block_id + 1)           # ❶ 异步预取下一个 chunk\n        all_gather(chunk)                            # ❷ 聚合完整参数\n        activations[block_id] = forward(chunk, data)\n        if is_swap_block(block_id, swap_interval):\n            async_offload_activation(activations[block_id])  # swap out\n        elif is_ckpt_block(block_id, swap_interval):\n            save_input_only(activations[block_id])           # checkpoint\n\n    # Backward: 逆序处理，recompute/swap-in 激活\n    for block_id in reversed(range(len(model.chunks))):\n        chunk = model.chunks[block_id]\n        all_gather(chunk)                            # ❷ 重新聚合参数\n        if is_swap_block(block_id, swap_interval):\n            async_prefetch_activation(block_id)      # swap in\n        elif is_ckpt_block(block_id, swap_interval):\n            recompute_activation(block_id)           # 重计算\n        grads = backward(chunk, activations[block_id])\n        reduce_scatter(chunk)                        # ❸ 梯度归约\n        async_offload_gradients(chunk)               # ❹ 梯度异步下传 CPU\n\n    # Optimizer: GPU 更新 persistent chunks，CPU 更新其余\n    gpu_optim_step(persistent_chunks)                # ❺ GPU 上更新\n    cpu_optim_step(non_persistent_chunks)            # CPU 并行更新（与 BWD 重叠）\n</code></pre>\n<h5>方法细节深入解析</h5>\n<p><strong>1. 动机与背景：为什么需要自适应内存管理？</strong></p>\n<p>LLM 训练的内存消耗主要来自两部分：<strong>模型状态</strong>（参数 + 梯度 + 优化器状态，每个参数约需 16× 内存）和<strong>激活</strong>（随 batch size 和模型深度线性增长）。现有框架如 DeepSpeed、FSDP 提供的内存管理存在两个关键缺陷：</p>\n<ol>\n<li><strong>粒度过粗</strong>：只支持 ZeRO-2/ZeRO-3 的二选一、offloading 的全开/全关、gradient checkpointing 的全部/不用，无法针对不同 block 做差异化处理</li>\n<li><strong>依赖手动配置</strong>：用户需要手动选择 ZeRO stage、offloading 目标（CPU/NVMe）、各种阈值参数，配置不当会导致 OOM 或性能低下</li>\n</ol>\n<div class=\"key-point\">💡 <strong>关键洞察</strong>：不同的 Transformer block 在内存压力和计算特性上是相似的，但整体的内存-计算-IO 平衡点取决于模型规模、硬件配置和 batch size 的组合。ProTrain 的核心思想是将这个多维搜索问题自动化。</div>\n<p><strong>2. Chunk-Based Model State Management：统一粒度的模型状态管理</strong></p>\n<p>ProTrain 将所有模型状态组织为<strong>统一大小的 Chunk</strong>，每个 Chunk 通常对应一个 Transformer Block 的全部参数。这种设计带来三个优势：</p>\n<ul>\n<li><strong>带宽效率</strong>：大块连续内存的传输比零散小张量更高效，充分利用 PCIe/NVLink 带宽</li>\n<li><strong>内存可预测性</strong>：统一大小使得内存占用可精确计算，为自适应搜索提供基础</li>\n<li><strong>减少碎片</strong>：通过 chunk buffer 机制复用内存，避免频繁的 malloc/free</li>\n</ul>\n<p>ProTrain 引入两个关键概念：</p>\n<ul>\n<li><strong>Persistent Chunk</strong>：常驻 GPU 内存的 chunk，无需 offload/upload，适用于内存充裕时保留高频访问的参数</li>\n<li><strong>Chunk Buffer</strong>：GPU 上的临时缓冲区，用于存放从 CPU 上传的 chunk 数据，数量决定了 prefetch 的并行度</li>\n</ul>\n<p>Chunk 按<strong>运行时执行顺序</strong>（而非初始化顺序）排列，减少因内存不足导致的反复加载卸载。</p>\n<p><strong>3. Block-Wise Activation Management：交错式激活管理</strong></p>\n<p>ProTrain 对每个 Transformer Block 的激活独立选择三种策略之一：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>策略</th>\n<th>内存开销</th>\n<th>计算开销</th>\n<th>IO 开销</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><strong>Neither</strong>（保留）</td>\n<td>高（全部激活驻留 GPU）</td>\n<td>无</td>\n<td>无</td>\n</tr>\n<tr>\n<td><strong>Checkpointing</strong>（重计算）</td>\n<td>低（仅保存 block 输入）</td>\n<td>高（backward 时重算 forward）</td>\n<td>无</td>\n</tr>\n<tr>\n<td><strong>Swapping</strong>（换出）</td>\n<td>低（激活移至 CPU）</td>\n<td>无</td>\n<td>高（需要 swap-out/swap-in）</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：单纯使用 swapping 会因 PCIe 带宽瓶颈导致性能下降。ProTrain 的关键创新是<strong>交错式布局</strong>：典型配置为 1 个 swap block 后跟若干个 checkpoint block，swap 间隔精心选择使得 swap-out 的 IO 时间恰好被后续 checkpoint block 的计算时间覆盖。</div>\n<p>具体来说，swapping interval <span class=\"kb-math kb-math-inline\">I</span> 的选择满足：</p>\n<div class=\"kb-math kb-math-display\">T_{\\text{swap-out}}(1\\text{ block}) \\leq I \\times T_{\\text{compute}}(1\\text{ block})</div>\n<p>这确保了 swap 操作完全被计算隐藏，不引入额外延迟。在 backward 阶段，先处理 neither block（释放内存），再处理 checkpoint 和 swap block，形成内存使用的\"先降后升\"曲线，避免峰值溢出。</p>\n<p><strong>4. Memory-Aware Runtime Profiler：精确的运行时感知</strong></p>\n<p>传统 profiling 方法存在两个问题：\n- <strong>静态分析</strong>低估实际内存需求（忽略临时缓冲区）\n- <strong>逐层 profiling</strong>无法捕获不可 hook 算子的开销</p>\n<p>ProTrain 的 <strong>drop-and-regenerate</strong> 方法解决了大模型 profiling 的内存限制：在 profiling 每一层时，丢弃其他层的数据（参数、梯度、激活），仅保留当前层所需数据。通过在每个可 hook 算子前后注册 hook，监控内存变化和峰值，推断不可 hook 算子的内存和时间开销。</p>\n<p>Profiler 还收集硬件指标：内存传输带宽、集合通信延迟（在隔离和重叠场景下分别测量），为 Runtime Estimator 提供准确的硬件参数。</p>\n<p><strong>5. Adaptive Memory Management：自动配置搜索</strong></p>\n<p>搜索空间由三个维度定义：\n- <span class=\"kb-math kb-math-inline\">n_p</span>：persistent chunk 数量（0 到总 chunk 数）\n- <span class=\"kb-math kb-math-inline\">n_b</span>：chunk buffer 数量（决定 prefetch 并行度）\n- <span class=\"kb-math kb-math-inline\">I</span>：activation swapping interval</p>\n<p>对于每个候选配置，ProTrain 通过以下公式估算单次迭代时间：</p>\n<div class=\"kb-math kb-math-display\">T_{\\text{Iteration}} = T_{\\text{FWD}} + \\max\\{T_{\\text{BWD}} + T_{\\text{GPU\\_OPTIM}},\\; T_{\\text{CPU\\_OPTIM}}\\}</div>\n<p>其中：\n- <span class=\"kb-math kb-math-inline\">T_{\\text{FWD}}</span> 和 <span class=\"kb-math kb-math-inline\">T_{\\text{BWD}}</span> 通过逐 chunk 聚合算子时间 + 通信时间（取 compute-bound 和 communication-bound 中的较大值）得到\n- <span class=\"kb-math kb-math-inline\">T_{\\text{GPU\\_OPTIM}}</span> 为 persistent chunk 使用 FusedAdam 的更新时间\n- <span class=\"kb-math kb-math-inline\">T_{\\text{CPU\\_OPTIM}}</span> 为非 persistent chunk 在 CPU 上的更新时间，与 backward 计算并行</p>\n<p>Peak Memory Estimator 结合 profiler 数据和 chunk 配置，精确预测峰值内存。最终选择满足内存约束且迭代时间最短的配置。</p>\n<p><strong>6. 与现有方法的对比</strong></p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>DeepSpeed</th>\n<th>FSDP</th>\n<th>Colossal-AI</th>\n<th><strong>ProTrain</strong></th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>内存管理粒度</td>\n<td>全局（ZeRO stage）</td>\n<td>全局</td>\n<td>Chunk 级</td>\n<td><strong>Chunk + Block 级</strong></td>\n</tr>\n<tr>\n<td>Offloading 控制</td>\n<td>全开/全关</td>\n<td>全开/全关</td>\n<td>用户指定比例</td>\n<td><strong>自动决定</strong></td>\n</tr>\n<tr>\n<td>Checkpointing</td>\n<td>全部/不用</td>\n<td>全部/不用</td>\n<td>全部/不用</td>\n<td><strong>逐 Block 选择</strong></td>\n</tr>\n<tr>\n<td>Activation Swapping</td>\n<td>不支持</td>\n<td>不支持</td>\n<td>不支持</td>\n<td><strong>交错式 Swapping</strong></td>\n</tr>\n<tr>\n<td>用户配置需求</td>\n<td>高（多参数）</td>\n<td>中</td>\n<td>中（需指定比例）</td>\n<td><strong>零配置</strong></td>\n</tr>\n<tr>\n<td>最大模型规模（4×RTX3090）</td>\n<td>15B</td>\n<td>15B</td>\n<td>25B</td>\n<td><strong>30B</strong></td>\n</tr>\n</tbody>\n</table></div>",
      "quiz": {
        "q": "ProTrain 的 Block-Wise Activation Management 中，交错式 swapping+checkpointing 策略的核心设计目的是什么？",
        "options": [
          "通过增加 checkpointing block 数量来最大化内存节省",
          "让 swap-out 的 IO 时间被后续 checkpoint block 的重计算时间覆盖，从而隐藏通信开销",
          "减少 backward 阶段的重计算量以加速训练",
          "确保所有 block 的激活都被换出到 CPU 以释放 GPU 内存"
        ],
        "answer": 1,
        "explain": "交错式布局的关键在于 swap interval 的选择使得 swap-out 的 IO 时间恰好被后续若干个 checkpoint block 的计算时间覆盖，实现通信与计算的重叠，在节省内存的同时不引入额外延迟。"
      }
    },
    {
      "id": "boost",
      "num": 16,
      "name": "BOOST",
      "fullName": "BOOST",
      "year": "2026",
      "org": "MLSys Community",
      "parent": "megatron_lm",
      "paperUrl": "https://mlsys.org/Conferences/2026/Schedule?type=Poster",
      "projectUrl": "",
      "category": "training_platform",
      "motivation": "针对低秩大模型训练的瓶颈优化框架",
      "summary": "BOOST 提出面向低秩瓶颈 LLM 预训练的分布式训练框架，通过 Bottleneck-aware Tensor Parallelism 将通信边界移动到低维 bottleneck，并结合 Online RMSNorm、线性层分组和低秩激活检查点，解决低秩模型在标准 Megatron 式 3D 并行下通信过多、GPU 利用率低的问题。",
      "keyPoints": [
        "面向低秩/瓶颈 Transformer 预训练，而不是 LoRA 微调；目标是在 backbone 本身低秩化后仍能高效扩展",
        "分析 vanilla low-rank TP 的双重低效：每个瓶颈线性层都引入 collective，且沿低秩维度切分会让 GEMM arithmetic intensity 下降",
        "提出 Bottleneck-aware Tensor Parallelism (BTP)：把 TP chunk 边界平移一个 bottleneck layer，让 collective 发生在 <span class=\"kb-math kb-math-inline\">r \\ll d</span> 的低维激活上",
        "BTP 同时减少通信量和改善 GEMM 形状：沿 hidden dimension 切分，而不是进一步切碎已经很窄的 rank dimension",
        "Online RMSNorm 将局部 RMSNorm 统计与后续 row-split GEMM 的 all-reduce 融合，避免独立的小 payload 同步",
        "Linear layer grouping 用拼接/批量 GEMM 合并多个低秩线性层，降低 kernel launch 和 collective 次数",
        "Comm-free low-rank activation checkpointing 只保存低秩激活，反向重算时避免额外通信",
        "论文报告在多种低秩结构上相对 full-rank baseline 有 1.46-1.91x 加速，相对 naive low-rank 3D parallelism 有 1.87-2.27x 加速"
      ],
      "detail": "<p><img alt=\"BOOST framework overview\" src=\"https://arxiv.org/html/2512.12131v2/mlsys2026/figure/Framework_Overview.png\" />\n<em>图：来自 BOOST 论文 Figure 1，展示低秩瓶颈结构、vanilla TP 的 runtime breakdown，以及 BOOST 框架由 BTP、Online RMSNorm、linear grouping 和 activation checkpointing 组成。</em></p>\n<p><img alt=\"BOOST Bottleneck-aware Tensor Parallelism\" src=\"https://arxiv.org/html/2512.12131v2/mlsys2026/figure/btp_main_edited.png\" />\n<em>图：来自 BOOST 论文 Figure 3。上方 vanilla TP 为每个低秩线性块放置独立 <code>f/g</code> 通信边界；下方 BTP 将边界平移到 bottleneck，使同一个低维边界服务相邻的 up/down projection。</em></p>\n<pre><code class=\"language-python\"># BOOST: Bottleneck-aware Tensor Parallelism + Online RMSNorm, simplified.\n# x: [tokens, d], low-rank dimension r &lt;&lt; d, tp_size = p\ndef btp_block(x, tp_rank, tp_group):\n    # Current chunk starts at an up projection and ends after the next down projection.\n    # W_up is column-split along hidden dimension d, so each rank produces y_i.\n    z = low_rank_activation_from_previous_chunk(x)        # [tokens, r], already at bottleneck\n    y_i = z @ shard_columns(W_up, tp_rank)                # [tokens, d / p]\n    y_i = activation(y_i)\n\n    # RMSNorm is sharded-unsafe, so BOOST uses online recovery.\n    local_ss = sum(y_i * y_i, axis=-1, keepdim=True)\n    local_rms = sqrt(local_ss / (d / p) + eps)\n    yhat_i = (y_i / local_rms) * shard_gamma(gamma, tp_rank)\n\n    # Next down projection is row-split; fuse output and norm statistic in one collective.\n    z_partial = yhat_i @ shard_rows(W_down_next, tp_rank) # [tokens, r]\n    z_sum, global_ss = all_reduce_sum((z_partial, local_ss), group=tp_group)\n\n    # Recover exact global RMSNorm effect after the fused collective.\n    global_rms = sqrt(global_ss / d + eps)\n    correction = local_rms / global_rms\n    z_next = recover_scaled_output(z_sum, correction)\n    return z_next                                         # [tokens, r]\n</code></pre>\n<p>低秩瓶颈层通常把一个 <span class=\"kb-math kb-math-inline\">d \\times d</span> 投影替换成两个小矩阵：</p>\n<div class=\"kb-math kb-math-display\">Y = \\phi(X W_{\\text{down}}), \\quad Z = Y W_{\\text{up}}, \\quad\nW_{\\text{down}} \\in \\mathbb{R}^{d \\times r},\\; W_{\\text{up}} \\in \\mathbb{R}^{r \\times d},\\; r \\ll d</div>\n<p>单卡上这会显著减少 FLOPs 和参数量，但分布式训练并不会自动变快。Megatron-LM 式 TP 原本假设每个 Transformer block 里有少数几个大矩阵，通信点可以放在 MLP/attention 的自然边界。低秩化后，一个大矩阵变成更深的 down/up 链路；如果仍把每对 low-rank 层当作独立 TP chunk，就会为更多线性层插入 <code>f/g</code> collective，导致通信启动次数和激活同步量上升。</p>\n<p>vanilla low-rank TP 的计算问题同样严重。低秩结构已经把有效维度从 <span class=\"kb-math kb-math-inline\">d</span> 降到 <span class=\"kb-math kb-math-inline\">r</span>，如果 TP 再沿 <span class=\"kb-math kb-math-inline\">r</span> 维切分，每张 GPU 的 GEMM reduction dimension 变成 <span class=\"kb-math kb-math-inline\">r/p</span>。这类小 GEMM 数据搬运多、计算少，容易落入 memory-bound 区域。BOOST 的观察是：低秩模型的并行策略必须理解 bottleneck，而不能把每个 low-rank linear 当成普通 dense linear。</p>\n<p>BTP 的关键动作是把 TP chunk 边界平移一个 bottleneck layer：chunk 从上投影 <span class=\"kb-math kb-math-inline\">W_{\\text{up}}</span> 开始，到下一层下投影 <span class=\"kb-math kb-math-inline\">W_{\\text{down}}</span> 结束。这样 collective 发生在低维激活 <span class=\"kb-math kb-math-inline\">r</span> 上，而 shard 仍沿较大的 hidden dimension <span class=\"kb-math kb-math-inline\">d</span> 组织。若一次 hidden activation collective 的 payload 近似为：</p>\n<div class=\"kb-math kb-math-display\">B_d = \\text{bytes} \\cdot \\text{tokens} \\cdot d</div>\n<p>则 bottleneck 处的 collective 近似为：</p>\n<div class=\"kb-math kb-math-display\">B_r = \\text{bytes} \\cdot \\text{tokens} \\cdot r,\\quad\n\\frac{B_d}{B_r} = \\frac{d}{r}</div>\n<p>当 <span class=\"kb-math kb-math-inline\">r \\ll d</span> 时，把同步点移到 bottleneck 直接降低通信量；同时 GEMM 沿 <span class=\"kb-math kb-math-inline\">d</span> 维切分，保留更健康的矩阵形状。论文报告 BTP 在通信量和 hardware FLOPs utilization 两端都优于 naive low-rank TP。</p>\n<p>Online RMSNorm 解决的是 BTP 引入的新约束。RMSNorm 的标准形式为：</p>\n<div class=\"kb-math kb-math-display\">\\operatorname{RMSNorm}(x)=\\gamma \\odot \\frac{x}{\\sqrt{\\frac{1}{d}\\sum_{j=1}^{d}x_j^2+\\epsilon}}</div>\n<p>但 BTP chunk 内的激活按 hidden dimension 分片，每个 rank 只能看到 <span class=\"kb-math kb-math-inline\">d/p</span> 个元素；若直接计算 RMSNorm，就缺少全局平方和。朴素做法是单独 all-reduce 一个很小的统计量，但这种小 payload collective 被 launch latency 支配。BOOST 改为先计算局部平方和 <span class=\"kb-math kb-math-inline\">s_i</span> 和局部 RMS，把统计量与后续 row-split GEMM 的 all-reduce 一起发送，再用全局 <span class=\"kb-math kb-math-inline\">s=\\sum_i s_i</span> 恢复标准 RMSNorm 等价结果。直觉上，它把“必须同步归一化统计”的时刻推迟到本来就要同步的 GEMM 边界。</p>\n<p>Linear layer grouping 和低秩激活检查点是为了把 BTP 的理论收益落到端到端训练上。低秩模型的小矩阵更多，kernel launch 和 collective 数量更容易成为瓶颈；BOOST 对共享输入的 down projections 用权重拼接，对输入不同的 up projections 用 batched GEMM，把多个小操作合并成更大的操作。激活检查点方面，低秩结构天然有小激活 <span class=\"kb-math kb-math-inline\">r</span>，保存这些低秩边界并在反向局部重算，可以减少 HBM 压力，同时避免为了重算而重新触发跨 rank 通信。</p>\n<p>与 Megatron-LM 的通用 TP 相比，BOOST 更像“结构感知 TP”。Megatron-LM 通过列切/行切把 dense Transformer 的通信压到少数边界；BOOST 则在低秩 Transformer 里重新寻找这些边界。它的结论可以概括为：模型结构变成 bottleneck 后，系统并行边界也必须随之移动，否则参数/FLOPs 减少会被通信、kernel launch 和低 arithmetic intensity 抵消。</p>\n<div class=\"key-point\">💡 关键：BOOST 不只是把低秩模型接到 Megatron-LM 上，而是重新定义“哪里同步、沿什么维度切、哪些小操作合并”，让低秩带来的算法节省不会在分布式系统层被吃掉。</div>",
      "quiz": {
        "q": "BOOST 的 Bottleneck-aware Tensor Parallelism 为什么能同时降低通信并提高 GPU 利用率？",
        "options": [
          "它把 collective 移到低维 bottleneck，同时沿较大的 hidden dimension 组织切分以改善 GEMM 形状",
          "它取消了所有 tensor parallel collective",
          "它把低秩模型还原成 full-rank 模型",
          "它只依赖更大的 batch size，不改变并行边界"
        ],
        "answer": 0,
        "explain": "BTP 利用 r << d 的瓶颈激活降低同步 payload，并避免继续切碎低秩维度，从而减少通信且提升 arithmetic intensity。"
      }
    },
    {
      "id": "tessera",
      "num": 17,
      "name": "Tessera",
      "fullName": "Tessera",
      "year": "2026",
      "org": "OSDI Community",
      "parent": "megascale",
      "paperUrl": "https://www.usenix.org/conference/osdi26/technical-sessions",
      "projectUrl": "",
      "category": "training_platform",
      "motivation": "整体流水线并行框架，解决万亿参数MoE训练",
      "summary": "Tessera 面向万亿参数异构 MoE 训练提出整体流水线并行框架，将 pipeline partition、expert/data parallel placement、microbatch overlap 和 backward 调度放在同一优化空间中，缓解 MoE 训练里 stage 不均衡、专家路由倾斜和 all-to-all 通信相互放大的问题。",
      "keyPoints": [
        "官方 OSDI 2026 条目将 Tessera 放在 “LLM Training at Scale” track，题名明确指向 trillion-parameter heterogeneous MoE training",
        "核心对象是异构 MoE：dense attention/shared layer、routed experts、shared experts、router 和不同专家规模共同造成非均匀 stage cost",
        "整体优化 pipeline parallelism：不是先静态切层再局部调专家，而是联合决定 stage boundary、expert placement、microbatch schedule 和通信重叠",
        "需要处理 MoE 的 token routing skew：每个 microbatch 激活的专家和 token 数不同，导致 expert compute 与 all-to-all 时间随批次变化",
        "通过动态 backward scheduling 消化异构 stage 的 readiness 差异，减少固定 1F1B 在慢专家或慢 stage 上形成的 pipeline bubble",
        "与 Megascale/Megatron 类生产训练栈互补：后者提供 3D/4D 并行基础，Tessera 关注 MoE pipeline 层面的全局排布和调度",
        "公开页面暂未释放 Tessera PDF/论文图；以下机制解读基于官方题名、USENIX 会议信息及公开 MoE/PP/EP 系统资料，涉及推断处已明确说明"
      ],
      "detail": "<p><img alt=\"PP + EP + DP 组合参考图\" src=\"https://arxiv.org/html/2606.11169v1/x1.png\" />\n<em>图：公开参考图来自 Piper 论文 Figure 1，展示 MoE Transformer 中 PP across layers、expert parallelism 和 data parallelism 的组合。该图不是 Tessera 原图；由于 OSDI 页面当前未公开 Tessera 论文图，这里用它说明 Tessera 所面对的 PP/EP/DP 组合训练形态。</em></p>\n<pre><code class=\"language-python\"># Tessera-style holistic MoE pipeline scheduling, reconstructed from public title/context.\ndef tessera_plan(model, cluster, routing_trace):\n    # 1. Profile heterogeneous costs instead of assuming every Transformer layer is equal.\n    layer_cost = profile_dense_attention_and_shared_layers(model, cluster)\n    expert_cost = profile_experts(model.experts, cluster)\n    comm_cost = measure_links(cluster, ops=[&quot;pp_send_recv&quot;, &quot;ep_all_to_all&quot;, &quot;dp_all_reduce&quot;])\n\n    # 2. Estimate per-stage time under candidate partition + placement.\n    candidates = enumerate_stage_boundaries(model.layers)\n    candidates = attach_expert_placements(candidates, model.experts, cluster)\n    best = None\n    for plan in candidates:\n        for mb in routing_trace:\n            token_hist = estimate_tokens_per_expert(mb, model.router)\n            stage_time = simulate_pipeline(\n                plan=plan,\n                token_hist=token_hist,\n                layer_cost=layer_cost,\n                expert_cost=expert_cost,\n                comm_cost=comm_cost,\n                overlap=True,\n            )\n        best = argmin_objective(best, plan, objective=&quot;iteration_time + memory_penalty&quot;)\n\n    # 3. Runtime scheduling: issue ready microbatches/backward tasks to hide all-to-all.\n    ready = initialize_microbatch_queue(best)\n    while ready:\n        task = pick_ready_task(ready, policy=&quot;minimize_bubble_and_a2a_wait&quot;)\n        overlap(task.compute, task.pp_send_recv, task.ep_all_to_all)\n        update_ready_queue(task)\n    return best\n</code></pre>\n<p>MoE 训练和 dense Transformer 的根本差异在于“每层代价不是固定的”。Dense 层的计算量主要由 batch、sequence、hidden size 决定；MoE 层还要经过 router，把 token 分配给 top-<span class=\"kb-math kb-math-inline\">k</span> 专家。对第 <span class=\"kb-math kb-math-inline\">s</span> 个 pipeline stage 和第 <span class=\"kb-math kb-math-inline\">m</span> 个 microbatch，可以把 stage 时间粗略写成：</p>\n<div class=\"kb-math kb-math-display\">T_s(m)=T^{\\text{dense}}_s(m)+T^{\\text{route}}_s(m)+T^{\\text{a2a}}_s(m)+\\max_{e \\in E_s}T^{\\text{expert}}_{s,e}(n_{m,e})+T^{\\text{pp}}_s(m)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">n_{m,e}</span> 是 microbatch <span class=\"kb-math kb-math-inline\">m</span> 路由到专家 <span class=\"kb-math kb-math-inline\">e</span> 的 token 数。这个式子解释了为什么 Tessera 需要“holistic”：即使层数平均，热门专家也会让某个 stage 变慢；即使专家放置均衡，all-to-all 也可能和 pipeline send/recv、data-parallel all-reduce 争抢网络；即使单个 stage 最优，固定 1F1B 顺序也可能在 backward 阶段等待慢 stage。</p>\n<p>普通 pipeline parallelism 常用 bubble 近似分析：</p>\n<div class=\"kb-math kb-math-display\">\\text{bubble} \\approx \\frac{P-1}{M+P-1}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">P</span> 是 pipeline stage 数，<span class=\"kb-math kb-math-inline\">M</span> 是 microbatch 数。这个公式隐含每个 stage 时间相近；异构 MoE 下更现实的迭代时间接近：</p>\n<div class=\"kb-math kb-math-display\">T_{\\text{iter}} \\approx T_{\\text{warmup}} + M \\cdot \\max_s \\mathbb{E}_m[T_s(m)] + T_{\\text{drain}} + T_{\\text{contention}}</div>\n<p>Tessera 要优化的不是单纯增加 <span class=\"kb-math kb-math-inline\">M</span>，而是降低 <span class=\"kb-math kb-math-inline\">\\max_s T_s</span> 和 <span class=\"kb-math kb-math-inline\">T_{\\text{contention}}</span>。这意味着 stage boundary 不能只按层数切，expert placement 不能只按专家个数均分，microbatch order 也不能只套固定表格。</p>\n<p>从题名和相关公开系统材料看，Tessera 的关键机制应是把 PP partitioning 与 microbatch overlap schedule 联合搜索或联合求解。对 heterogeneous MoE，分区器需要知道哪些 dense 层重、哪些 expert 层重、哪些专家经常被一起激活，以及设备拓扑里哪些 GPU/节点之间 all-to-all 代价低。然后调度器在 runtime 让 forward、backward、expert all-to-all 和 pipeline p2p 尽量错峰：当某个 backward 已经 ready 且能填补慢 stage 的空档时，优先发射它，而不是严格按静态 1F1B 队列等待。</p>\n<p>动态 backward scheduling 的直觉是“ready 不等于立即执行，未 ready 也不应阻塞全局”。MoE backward 同样包含 expert gradient、router gradient、dense gradient 和跨设备通信；如果把所有 backward 绑定到固定 microbatch 顺序，热门专家造成的单点延迟会沿 pipeline 传播。Tessera 这类 holistic 框架更可能把训练 step 表示为带依赖的 DAG：节点是 dense compute、expert compute、all-to-all、send/recv、all-reduce；边表示 activation/gradient 依赖；调度目标是在显存预算内最小化 makespan。</p>\n<p>与 Megascale/Megatron 的关系可以理解为“基础并行能力”和“MoE pipeline 全局调度”的分层。Megascale/Megatron 提供 TP、PP、DP、EP、ZeRO/FSDP、checkpoint 等执行原语；Tessera 关注如何在万亿参数异构 MoE 中组合这些原语。对于 dense 模型，PP stage balance 主要看层 FLOPs 和 activation size；对于 Tessera 的目标场景，还必须把 token histogram、expert hotness、all-to-all 拓扑、shared expert 和 backward readiness 一起考虑。</p>\n<p>公开信息的限制也需要明确：截至本次写入，USENIX 页面公开了标题、作者、track 和 Operational Systems Paper 类别，但没有稳定 PDF、abstract 或原始 figure URL。因此，上述伪代码和公式是基于标题所指问题、OSDI 条目以及公开 MoE pipeline 系统论文的机制化重构，不应当等同于 Tessera 论文中的正式算法块。后续若 USENIX 放出 PDF，应优先用原论文 Figure/Algorithm 替换参考图和推断性描述。</p>\n<div class=\"key-point\">💡 关键：Tessera 的价值不在“又一种 pipeline schedule 名字”，而在把 MoE 的路由不均、专家放置、stage 切分、forward/backward 顺序和通信争用作为一个整体系统问题处理。</div>",
      "quiz": {
        "q": "Tessera 面向异构 MoE 训练时，为什么不能只按 Transformer 层数平均切 pipeline stage？",
        "options": [
          "因为 MoE 的专家路由、all-to-all 通信和专家计算会让不同 microbatch/stage 的实际耗时高度不均",
          "因为 pipeline parallelism 只能用于 CNN，不能用于 Transformer",
          "因为平均切层会自动消除所有通信",
          "因为 MoE 不需要 backward pass"
        ],
        "answer": 0,
        "explain": "异构 MoE 的 stage 时间取决于 dense 层、专家放置、token 路由倾斜和通信争用；按层数平均不能保证吞吐瓶颈被均衡。"
      }
    },
    {
      "id": "mlflow",
      "num": 18,
      "name": "MLflow",
      "fullName": "MLflow",
      "year": "2018",
      "org": "Databricks",
      "parent": "—",
      "paperUrl": "https://www.mlflow.org/",
      "projectUrl": "",
      "category": "experiment_mgmt",
      "motivation": "定义实验追踪、项目打包与模型注册标准接口",
      "summary": "MLflow 提出了一个由 Tracking、Projects 和 Models 三大组件构成的开放平台，通过统一的 API 和格式规范解决机器学习生命周期中实验追踪困难、工作流不可复现、模型部署碎片化三大核心痛点，成为业界最广泛采用的 ML 平台标准接口。",
      "keyPoints": [
        "<strong>三大组件架构</strong>：MLflow Tracking（实验记录）、MLflow Projects（可复现打包）、MLflow Models（多环境部署），各组件可独立使用也可组合",
        "<strong>MLflow Tracking</strong>：提供 API 和 UI，自动记录实验的参数（parameters）、指标（metrics）、代码版本、数据文件和产出物（artifacts），支持任意 ML 库",
        "<strong>MLflow Projects</strong>：基于约定的目录结构 + <code>MLproject</code> 描述文件 + Conda 环境，实现代码打包与可复现执行，支持本地/远程/云端多种运行后端",
        "<strong>MLflow Models</strong>：引入 <strong>flavor</strong> 概念，同一模型可以同时导出为多种格式（如 <code>python_function</code>、<code>tensorflow</code>、<code>sklearn</code>），部署工具只需理解对应 flavor 即可",
        "<strong>开放设计理念</strong>：不绑定特定 ML 库、语言或基础设施，通过 REST API 和文件格式约定实现跨平台互操作",
        "<strong>四大 ML 生命周期挑战</strong>：多种工具难追踪、结果难复现、模型难部署、缺乏中心化管理",
        "<strong>实际应用验证</strong>：发布 4 个月内被超过 200 家公司采用，GitHub 获得 2800+ stars"
      ],
      "detail": "<p><img alt=\"MLflow 平台架构概览\" src=\"https://mlflow.org/img/hero.png\" />\n<em>图：MLflow 平台整体架构，涵盖实验追踪、项目管理和模型部署三大核心模块</em></p>\n<h5>核心 API 使用示例</h5>\n<pre><code class=\"language-python\"># MLflow Tracking API 示例\nimport mlflow\n\n# 开始一次实验运行\nwith mlflow.start_run():\n    # 记录超参数\n    mlflow.log_param(&quot;learning_rate&quot;, 0.01)\n    mlflow.log_param(&quot;num_layers&quot;, 3)\n\n    # 训练过程中记录指标\n    for epoch in range(100):\n        loss = train_one_epoch(model, data)\n        mlflow.log_metric(&quot;loss&quot;, loss, step=epoch)\n\n    # 保存模型产出物\n    mlflow.sklearn.log_model(model, &quot;model&quot;)\n    mlflow.log_artifact(&quot;output/feature_importance.png&quot;)\n</code></pre>\n<pre><code class=\"language-yaml\"># MLproject 文件示例 —— 定义可复现的项目入口\nname: My ML Project\nconda_env: conda.yaml\n\nentry_points:\n  main:\n    parameters:\n      learning_rate: {type: float, default: 0.01}\n      batch_size: {type: int, default: 64}\n    command: &quot;python train.py --lr {learning_rate} --batch {batch_size}&quot;\n\n  validate:\n    parameters:\n      model_path: path\n    command: &quot;python validate.py --model {model_path}&quot;\n</code></pre>\n<pre><code class=\"language-python\"># MLflow Models —— 多 flavor 模型保存与加载\nimport mlflow.pyfunc\nimport mlflow.tensorflow\n\n# 保存时同时注册多种 flavor\nmlflow.tensorflow.log_model(tf_model, &quot;model&quot;)\n# 自动生成 MLmodel 描述文件，包含:\n# flavors:\n#   python_function:\n#     loader_module: mlflow.tensorflow\n#   tensorflow:\n#     saved_model_dir: ...\n\n# 部署时按需选择 flavor\nmodel = mlflow.pyfunc.load_model(&quot;runs:/abc123/model&quot;)  # 通用 Python 接口\nprediction = model.predict(input_df)\n</code></pre>\n<h5>动机与背景</h5>\n<p>机器学习的生命周期远比传统软件开发复杂。论文作者 Matei Zaharia 等人（Databricks 团队）在与数百家企业的合作中识别出四大核心挑战：</p>\n<ol>\n<li>\n<p><strong>工具繁多，实验难以追踪</strong>：数据科学家需要在众多 ML 库（TensorFlow、PyTorch、scikit-learn 等）、数据处理框架和特征工程工具之间切换，每种工具有不同的接口和配置方式，导致实验参数、结果和中间产物散落各处，难以系统化管理和对比。</p>\n</li>\n<li>\n<p><strong>结果不可复现</strong>：即使拿到同事的代码，由于缺乏对运行环境（库版本、系统依赖、数据版本）的完整记录，往往无法复现其实验结果。这在团队协作和模型审计中造成严重障碍。</p>\n</li>\n<li>\n<p><strong>模型部署路径碎片化</strong>：从研究到生产的\"最后一公里\"极为困难——每个 ML 库输出的模型格式不同，部署目标（REST API、批处理、边缘设备、Spark）各异，导致大量重复的集成工作。</p>\n</li>\n<li>\n<p><strong>缺乏中心化生命周期管理</strong>：没有统一的平台来管理数据准备、模型训练、部署和监控的完整流程，各阶段之间的衔接依赖临时脚本和手工操作。</p>\n</li>\n</ol>\n<div class=\"key-point\">💡 关键：MLflow 的设计哲学是 <strong>\"开放接口优先\"</strong>——不试图替代任何现有 ML 工具，而是通过轻量级的 API 和格式约定，在已有工具之上建立统一的管理层。</div>\n<h5>核心机制：三大组件详解</h5>\n<p><strong>1. MLflow Tracking —— 实验记录与对比</strong></p>\n<p>MLflow Tracking 是整个平台的基础组件，解决\"实验追踪\"问题。其核心概念是 <strong>Run</strong>（一次运行），每个 Run 记录：</p>\n<ul>\n<li><strong>Parameters</strong>：输入的超参数（如学习率、批大小），类型为字符串键值对</li>\n<li><strong>Metrics</strong>：输出的评估指标（如准确率、损失），支持随时间步记录变化曲线</li>\n<li><strong>Artifacts</strong>：任意输出文件（模型文件、可视化图表、数据样本等）</li>\n<li><strong>Source</strong>：运行的代码来源（Git commit hash 或项目入口）</li>\n<li><strong>Tags &amp; Notes</strong>：用户自定义的标签和备注</li>\n</ul>\n<p>多个 Run 可以组织为 <strong>Experiment</strong>（实验），Tracking UI 提供可视化对比界面，支持按指标排序、筛选和图表展示。</p>\n<p>存储后端支持两种模式：\n- <strong>本地文件系统</strong>：适合个人使用，零配置\n- <strong>远程 Tracking Server</strong>：通过 REST API 提供团队共享的中心化存储，支持 SQL 数据库 + 对象存储（S3/Azure Blob/GCS）</p>\n<div class=\"warn-box\">⚠️ 注意：Tracking API 的设计刻意保持极简——仅需 <code>log_param()</code>、<code>log_metric()</code>、<code>log_artifact()</code> 三类调用，即可与任何 ML 框架集成，无需修改训练逻辑。</div>\n<p><strong>2. MLflow Projects —— 可复现的代码打包</strong></p>\n<p>MLflow Projects 通过约定优于配置（Convention over Configuration）的方式解决可复现性问题。一个 Project 就是一个包含 <code>MLproject</code> 文件的目录（或 Git 仓库），其中定义：</p>\n<ul>\n<li><strong>环境描述</strong>：通过 Conda 环境文件（<code>conda.yaml</code>）精确锁定所有依赖版本，也支持 Docker 容器</li>\n<li><strong>入口点（Entry Points）</strong>：定义可执行的命令及其参数（含类型和默认值）</li>\n<li><strong>参数类型系统</strong>：支持 <code>float</code>、<code>int</code>、<code>string</code>、<code>path</code> 四种类型，其中 <code>path</code> 类型会自动处理本地/远程文件的下载</li>\n</ul>\n<p>执行方式灵活：</p>\n<div class=\"kb-math kb-math-display\">\\text{mlflow run} \\xrightarrow{\\text{解析 MLproject}} \\text{创建 Conda 环境} \\xrightarrow{\\text{注入参数}} \\text{执行 entry point} \\xrightarrow{\\text{自动记录}} \\text{Tracking Run}</div>\n<p>Projects 可以嵌套调用——一个 Project 的步骤可以通过 <code>mlflow.run()</code> API 调用另一个 Project，形成多步骤工作流（multi-step workflow）。这使得复杂的 ML 流水线（数据预处理 → 特征工程 → 训练 → 评估）可以模块化组织。</p>\n<p><strong>3. MLflow Models —— 多格式模型部署</strong></p>\n<p>MLflow Models 引入了 <strong>flavor（风味）</strong> 这一关键抽象来解决模型部署的碎片化问题。</p>\n<p>核心思想：每个模型可以同时以多种 flavor 导出，每种 flavor 对应一种使用方式。例如一个 TensorFlow 模型可以同时具有：\n- <code>tensorflow</code> flavor：保留完整的 TF SavedModel，供 TensorFlow Serving 使用\n- <code>python_function</code> flavor：封装为通用 Python 函数，接受 pandas DataFrame 输入，适用于任何 Python 环境</p>\n<p>模型以目录形式存储，包含一个 <code>MLmodel</code> 元数据文件（YAML 格式）描述可用的 flavor 及其加载方式：</p>\n<pre><code class=\"language-yaml\"># MLmodel 文件示例\nartifact_path: model\nflavors:\n  python_function:\n    loader_module: mlflow.sklearn\n    python_version: 3.8.10\n  sklearn:\n    pickled_model: model.pkl\n    sklearn_version: 0.24.2\n</code></pre>\n<p>部署工具只需理解它支持的 flavor 即可。MLflow 内置了多种部署目标：\n- <strong>本地 REST Server</strong>：<code>mlflow models serve</code>\n- <strong>Docker 容器</strong>：<code>mlflow models build-docker</code>\n- <strong>Apache Spark UDF</strong>：将模型注册为 Spark SQL 用户自定义函数，实现大规模批处理\n- <strong>云平台</strong>：Azure ML、Amazon SageMaker 等</p>\n<div class=\"key-point\">💡 关键：flavor 机制的精妙之处在于它实现了 <strong>模型生产者与消费者的解耦</strong>——训练代码只需按框架原生方式保存模型，部署工具只需按自己支持的 flavor 加载，中间通过 MLmodel 元数据文件桥接。</div>\n<h5>与传统方法的区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th>传统 ML 工具链</th>\n<th>MLflow</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>实验管理</td>\n<td>手工记录（Excel/笔记）或各框架自带日志</td>\n<td>统一 Tracking API + 可视化 UI</td>\n</tr>\n<tr>\n<td>可复现性</td>\n<td>依赖文档说明，环境配置靠人工</td>\n<td>MLproject + Conda/Docker 自动化环境</td>\n</tr>\n<tr>\n<td>模型格式</td>\n<td>每个框架独立格式（.pb/.pt/.pkl）</td>\n<td>多 flavor 统一封装 + MLmodel 元数据</td>\n</tr>\n<tr>\n<td>部署方式</td>\n<td>针对每种框架×每种目标单独开发</td>\n<td>flavor 抽象解耦，一次保存多处部署</td>\n</tr>\n<tr>\n<td>平台锁定</td>\n<td>通常绑定特定云/框架生态</td>\n<td>开放 API，不绑定任何特定工具</td>\n</tr>\n<tr>\n<td>工作流编排</td>\n<td>需要额外的调度系统（Airflow 等）</td>\n<td>Projects 多步骤嵌套 + Tracking 自动关联</td>\n</tr>\n</tbody>\n</table></div>\n<p>与同期的其他 ML 平台相比（如 Google TFX、Facebook FBLearner、Uber Michelangelo），MLflow 的核心差异在于：\n- <strong>开源开放</strong>：不绑定特定公司的基础设施\n- <strong>增量采用</strong>：可以只使用一个组件，无需全盘迁移\n- <strong>库无关</strong>：支持任意 ML 框架，而非仅限于自家框架</p>\n<h5>设计原则总结</h5>\n<p>论文明确提出了 MLflow 的四大设计原则：</p>\n<ol>\n<li><strong>API-first（API 优先）</strong>：所有功能通过编程 API 暴露，而非 GUI 操作，便于自动化集成</li>\n<li><strong>Modular（模块化）</strong>：三个组件独立使用，降低采用门槛</li>\n<li><strong>Library-agnostic（库无关）</strong>：通过 REST API 和通用格式（而非框架插件）实现集成</li>\n<li><strong>Open（开放）</strong>：开源实现，开放格式，避免供应商锁定</li>\n</ol>",
      "quiz": {
        "q": "MLflow Models 中 flavor 机制的核心作用是什么？",
        "options": [
          "将模型压缩为更小的文件格式以节省存储空间",
          "让同一模型以多种格式导出，实现模型生产者与部署消费者的解耦",
          "自动选择最优的模型架构进行超参数调优",
          "将不同框架的模型统一转换为 ONNX 格式"
        ],
        "answer": 1,
        "explain": "flavor 机制允许一个模型同时以多种格式（如 python_function、tensorflow、sklearn）导出，部署工具只需理解它支持的 flavor 即可加载模型，从而解耦了模型训练框架与部署环境之间的依赖关系。"
      }
    },
    {
      "id": "optuna",
      "num": 19,
      "name": "Optuna",
      "fullName": "Optuna",
      "year": "2019",
      "org": "Preferred Networks",
      "parent": "mlflow",
      "paperUrl": "https://arxiv.org/abs/1907.10902",
      "projectUrl": "",
      "category": "experiment_mgmt",
      "motivation": "Define-by-run接口，支持高效剪枝与超参搜索",
      "summary": "Optuna 提出了面向超参数优化的 define-by-run 框架，让搜索空间在 Python 训练代码执行时动态生成，并用可插拔 sampler、pruner 与共享 storage 把单机调参扩展到异步分布式搜索。",
      "keyPoints": [
        "define-by-run API：在 <code>objective(trial)</code> 的控制流中调用 <code>suggest_*</code>，自然表达条件搜索空间",
        "Study/Trial 抽象：Study 管理优化方向和历史，Trial 记录参数、中间指标、最终值和状态",
        "可插拔 sampler：支持 TPE、随机、CMA-ES 等策略，并允许用户定制采样逻辑",
        "可插拔 pruner：通过 <code>report()</code> 与 <code>should_prune()</code> 利用学习曲线中间值提前终止低潜力 trial",
        "共享 storage 架构：内存、SQLite、RDB 等后端让多个 worker 以异步方式协同优化同一个 study",
        "与训练框架解耦：Optuna 不接管模型训练，只要求 objective 返回可最小化或最大化的目标值"
      ],
      "detail": "<p><img alt=\"Optuna 系统设计图\" src=\"https://ar5iv.labs.arxiv.org/html/1907.10902/assets/fig/system_return.png\" />\n<em>图：Optuna 论文 Figure 4 的系统设计图；来源为 arXiv HTML 版本。每个 worker 独立执行 objective function，<code>suggest()</code>、<code>report()</code>、<code>should_prune()</code> 和最终 <code>return()</code> 都通过共享 storage 读写 study 历史。</em></p>\n<pre><code class=\"language-python\"># Optuna define-by-run 与剪枝流程伪代码\nimport optuna\n\ndef objective(trial):\n    model_type = trial.suggest_categorical(&quot;model&quot;, [&quot;mlp&quot;, &quot;cnn&quot;])\n    lr = trial.suggest_float(&quot;lr&quot;, 1e-5, 1e-1, log=True)\n\n    if model_type == &quot;mlp&quot;:\n        n_layers = trial.suggest_int(&quot;n_layers&quot;, 1, 4)\n        hidden = [trial.suggest_int(f&quot;hidden_{i}&quot;, 32, 512) for i in range(n_layers)]\n        model = build_mlp(hidden, lr)\n    else:\n        channels = trial.suggest_int(&quot;channels&quot;, 16, 128)\n        kernel = trial.suggest_int(&quot;kernel&quot;, 3, 7)\n        model = build_cnn(channels, kernel, lr)\n\n    for epoch in range(max_epochs):\n        train_one_epoch(model)\n        valid_loss = evaluate(model)\n        trial.report(valid_loss, step=epoch)\n        if trial.should_prune():\n            raise optuna.TrialPruned()\n\n    return evaluate(model)\n\nstudy = optuna.create_study(\n    direction=&quot;minimize&quot;,\n    sampler=optuna.samplers.TPESampler(),\n    pruner=optuna.pruners.SuccessiveHalvingPruner(),\n    storage=&quot;sqlite:///study.db&quot;,\n)\nstudy.optimize(objective, n_trials=200, n_jobs=8)\n</code></pre>\n<p>Optuna 要解决的第一类问题是静态搜索空间难以表达真实模型配置。以多层 MLP 为例，层数本身是一个超参数，只有确定了 <code>n_layers</code> 后，才知道需要采样多少个 <code>hidden_i</code>；如果改成 CNN，又会出现 kernel、channels 等完全不同的分支。传统 define-and-run HPO 工具通常要求用户先写出完整的树状空间，复杂模型会变成嵌套很深的配置对象。Optuna 把搜索空间绑定到 <code>objective(trial)</code> 的运行过程：执行到哪个分支，就注册和采样哪个超参数，因此搜索空间是由普通 Python 控制流“运行出来”的。</p>\n<p>Sampler 的职责是根据历史 trial 选择下一组参数，而不是简单枚举。以 TPE 为例，Optuna 会把历史观测按目标值分成好样本集合与坏样本集合，分别估计条件密度 <span class=\"kb-math kb-math-inline\">l(x)=p(x \\mid y &lt; y^*)</span> 和 <span class=\"kb-math kb-math-inline\">g(x)=p(x \\mid y \\ge y^*)</span>，然后倾向选择使下式更大的候选：</p>\n<div class=\"kb-math kb-math-display\">x^* = \\arg\\max_x \\frac{l(x)}{g(x)}</div>\n<p>直觉上，<span class=\"kb-math kb-math-inline\">l(x)</span> 高说明这个参数区域常出现在好 trial 中，<span class=\"kb-math kb-math-inline\">g(x)</span> 低说明它不常出现在差 trial 中；二者比值高，就代表候选参数更可能带来改进。Optuna 的贡献不是发明 TPE 本身，而是把 TPE、随机采样、CMA-ES 等策略放进统一 sampler 接口，使用户能在相同 Trial API 下替换优化算法。</p>\n<p>Pruner 解决的是资源浪费问题。很多训练任务在早期 epoch 就能看出趋势，如果某个 trial 的验证损失在相同 step 上明显落后，就不必训练到完整预算。Optuna 的 <code>trial.report(value, step)</code> 把学习曲线中间值写入 storage，<code>trial.should_prune()</code> 再由 pruner 读取同一 study 的历史中间值做决策。Successive Halving/ASHA 类机制可以理解为按资源 <span class=\"kb-math kb-math-inline\">r, \\eta r, \\eta^2 r, ...</span> 设置多个 rung：trial 只有在当前 rung 的表现排在前 <span class=\"kb-math kb-math-inline\">1/\\eta</span> 左右时才晋级到下一档资源。</p>\n<p>分布式架构的关键是把 trial 状态外置到 storage，而不是让某个中心进程长期持有所有状态。多个 worker 只要连接到同一个 storage URL，就能异步领取 trial、查询历史、写入中间值和提交结果。由于剪枝和采样都通过 storage 获得可见的 study 历史，worker 之间不需要同步 barrier；慢 trial 不会阻塞快 trial，这也是论文强调异步剪枝适合分布式环境的原因。</p>\n<p>与 MLflow/W&amp;B 这类 run-centric 追踪系统相比，Optuna 更主动：它不仅记录“发生了什么”，还决定“下一次该尝试什么”。在真实平台中常见的组合是 Optuna 负责 HPO 决策，训练脚本把 Optuna trial id、参数、指标和模型产物同步写入 MLflow 或 W&amp;B，从而同时获得自动搜索和团队级实验审计。</p>\n<div class=\"key-point\">💡 关键：Optuna 的核心抽象是把超参数优化压缩成 <code>objective(trial) -&gt; value</code>，再把搜索空间构造、采样、剪枝和分布式状态管理都挂在 Trial/Study 这两个对象上。</div>",
      "quiz": {
        "q": "Optuna 的 define-by-run API 相比静态搜索空间声明，最核心的优势是什么？",
        "options": [
          "搜索空间可以随 objective 的 Python 控制流动态生成，适合条件超参数",
          "不需要验证集即可优化模型",
          "所有 trial 都会使用完全相同的参数",
          "只能在单进程内执行，避免数据库开销"
        ],
        "answer": 0,
        "explain": "define-by-run 让参数声明发生在 objective 执行期间，因此模型分支、层数变化等条件结构能直接用 Python 表达。"
      }
    },
    {
      "id": "dvc",
      "num": 20,
      "name": "DVC",
      "fullName": "DVC数据版本控制 (DVC)",
      "year": "2020",
      "org": "Iterative.ai",
      "parent": "mlflow",
      "paperUrl": "https://dvc.org/",
      "projectUrl": "",
      "category": "experiment_mgmt",
      "motivation": "将Git版本控制引入数据集与模型文件管理",
      "summary": "DVC 将 Git 的版本历史扩展到大规模数据集、模型权重和流水线产物：Git 只保存轻量元数据，DVC 用内容哈希、缓存和 remote 存储管理真实文件，从而让代码、数据、参数和模型可以一起回溯与复现。",
      "keyPoints": [
        "<code>.dvc</code> 文件与 <code>dvc.lock</code> 保存数据/模型对象的哈希、路径、大小和依赖关系，Git 负责版本化这些小文件",
        "DVC cache 以内容寻址方式保存大文件，避免同一内容在不同实验版本中重复存储",
        "Remote storage 支持 S3、GCS、Azure Blob、SSH/SFTP、HDFS、本地目录等后端，用 <code>dvc push/pull</code> 同步真实数据",
        "<code>dvc.yaml</code> 将数据处理、训练、评估声明为 stage，<code>deps</code>、<code>params</code>、<code>outs</code> 构成可复现 DAG",
        "<code>dvc repro</code> 通过比较依赖哈希和参数值，只重跑受影响的 stage 及其下游节点",
        "与 Git branch/tag 组合后，一个 commit 同时锁定代码版本、数据版本、模型版本和流水线状态"
      ],
      "detail": "<p><img alt=\"DVC Git、CI/CD 与远程存储工作流\" src=\"https://storage.ghost.io/c/5f/2f/5f2f4d20-2abf-4534-8d40-7aa233aedd43/content/images/2026/03/dvc02.png\" />\n<em>图：DevOpsCube DVC 教程中的工作流图；它展示 GitHub/CI/CD 读取仓库元文件后执行 <code>dvc pull</code> 获取 S3 数据、处理后再 <code>dvc push</code> 上传版本化数据。DVC 官方文档同样强调 Git 保存 <code>.dvc</code>/<code>dvc.yaml</code>/<code>dvc.lock</code>，remote storage 保存真实数据与模型对象。</em></p>\n<pre><code class=\"language-bash\"># DVC 数据版本控制与流水线复现伪代码\ngit init\ndvc init\n\n# 1. 追踪大数据，但只把指针文件提交给 Git\ndvc add data/raw\ngit add data/raw.dvc data/.gitignore\ngit commit -m &quot;track raw data with DVC&quot;\n\n# 2. 配置并上传真实对象\ndvc remote add -d storage s3://ml-bucket/project-cache\ndvc push\ngit push\n\n# 3. 声明可复现训练流水线\ncat &gt; dvc.yaml &lt;&lt;'YAML'\nstages:\n  featurize:\n    cmd: python src/featurize.py --in data/raw --out data/features\n    deps:\n      - src/featurize.py\n      - data/raw\n    outs:\n      - data/features\n  train:\n    cmd: python src/train.py --features data/features --params params.yaml\n    deps:\n      - src/train.py\n      - data/features\n    params:\n      - train.lr\n      - train.epochs\n    outs:\n      - models/model.pkl\n    metrics:\n      - metrics.json\nYAML\n\ndvc repro     # 只重跑 hash 或 params 变化影响到的 stage\ndvc metrics diff\n</code></pre>\n<p>DVC 的核心问题来自 Git 与机器学习产物之间的尺度错配。Git 很适合文本代码和小配置文件，却不适合频繁提交 GB/TB 级数据、特征表、checkpoint 或模型包。只保存代码又会丢失关键上下文：同一个 <code>train.py</code> 在不同数据快照和不同 <code>params.yaml</code> 下会得到完全不同的模型。DVC 的做法是把“可版本化的引用”放进 Git，把“昂贵的大对象”放进 DVC cache/remote，从而避免 Git 仓库膨胀，同时保留版本历史。</p>\n<p>内容寻址是 DVC 数据层的关键机制。对一个文件或目录，DVC 计算内容哈希并把对象放到 cache 中，元文件只记录对象 ID 与工作区路径。可以把它抽象为：</p>\n<div class=\"kb-math kb-math-display\">oid = H(\\mathrm{bytes}(path)), \\qquad metadata = \\{path, oid, size, nfiles\\}</div>\n<p>当用户切换 Git commit 后，<code>.dvc</code> 文件或 <code>dvc.lock</code> 中的 <code>oid</code> 也随之改变；<code>dvc checkout</code> 根据当前 Git 版本里的元数据，把 cache 中对应内容链接或复制回 workspace；如果本地 cache 没有，<code>dvc pull</code> 会先从 remote 下载。这样，Git commit 不直接包含大文件，却能精确指向某一版大文件。</p>\n<p>Pipeline 层把 DVC 从“数据指针工具”提升为“可复现实验构建系统”。<code>dvc.yaml</code> 中每个 stage 都是一个节点，<code>deps</code> 和 <code>outs</code> 形成有向无环图。DVC 不依赖文件时间戳，而是比较依赖内容和参数记录；一个 stage 是否需要重跑，可简化为：</p>\n<div class=\"kb-math kb-math-display\">dirty(s) =\n\\exists d \\in deps(s): H(d) \\ne lock_s(d)\n\\;\\lor\\;\n\\exists p \\in params(s): value(p) \\ne lock_s(p)\n\\;\\lor\\;\nmissing(outs(s))</div>\n<p>如果 <code>dirty(featurize)=true</code>，那么使用 <code>data/features</code> 的 <code>train</code> 也会被标记为下游受影响节点；如果只改了 <code>train.lr</code>，上游特征工程不会重跑。相比 <code>make</code> 这类通用构建工具，DVC 的差异在于它内建大文件 hash、参数粒度依赖、metrics/plots 对比和 remote cache 同步，直接服务于 ML 工作流。</p>\n<p>Remote storage 承担团队协作和 CI/CD 的数据面。一个开发者执行 <code>dvc push</code> 后，真实数据对象进入 S3/GCS/SSH 等后端；另一个开发者或训练节点先 <code>git clone</code> 获取代码与元文件，再 <code>dvc pull</code> 拉取匹配当前 commit 的数据。此时 <code>git checkout experiment-a &amp;&amp; dvc checkout</code> 与 <code>git checkout experiment-b &amp;&amp; dvc checkout</code> 会得到不同的数据/模型工作区，但仓库路径可以保持稳定，例如始终是 <code>data/raw</code> 和 <code>models/model.pkl</code>。</p>\n<p>与 MLflow 的 run 记录相比，DVC 更偏 repository-centric：它将实验可复现性绑定到 Git 历史，而不是只在外部服务中保存一次 run 的日志。与 W&amp;B Artifacts 相比，DVC 更强调本地优先、命令行和 GitOps 工作流；与对象存储裸用相比，DVC 增加了哈希校验、去重、依赖图和版本指针。实际工程中经常把 DVC 用作数据/模型版本基座，再用 MLflow 或 W&amp;B 做指标看板和团队报告。</p>\n<div class=\"key-point\">💡 关键：DVC 不试图替代 Git，而是把 Git commit 变成“代码 + 数据指针 + 流水线锁文件”的统一索引，真实大对象由 DVC cache 和 remote 存储承载。</div>",
      "quiz": {
        "q": "DVC 为什么通常只把 `.dvc`、`dvc.yaml` 和 `dvc.lock` 提交到 Git，而不把大数据文件直接提交到 Git？",
        "options": [
          "这些元文件记录大对象哈希和依赖，真实数据放在 DVC cache/remote 中，能避免 Git 仓库膨胀并保持可复现",
          "DVC 不能处理二进制文件",
          "Git 不能管理任何文本文件",
          "DVC 只用于可视化实验曲线，不负责数据版本"
        ],
        "answer": 0,
        "explain": "DVC 让 Git 管理轻量指针和锁文件，大文件由内容寻址 cache 与 remote 存储管理，因此既节省仓库空间，又能通过哈希恢复精确版本。"
      }
    },
    {
      "id": "wandb",
      "num": 21,
      "name": "W&B",
      "fullName": "Weights & Biases",
      "year": "2020",
      "org": "W&B Inc.",
      "parent": "mlflow",
      "paperUrl": "https://wandb.ai/",
      "projectUrl": "",
      "category": "experiment_mgmt",
      "motivation": "云端协作式实验看板，强化团队开发效率",
      "summary": "Weights & Biases 将训练脚本中的配置、指标、媒体、系统资源和模型/数据产物统一记录为云端可协作的 run 与 artifact 图谱，解决团队难以比较实验、复现模型来源和共享分析结论的问题。",
      "keyPoints": [
        "Run 是最小实验单元，记录 config、metric history、summary、stdout、代码状态、系统资源和产物引用",
        "Dashboard/Workspace 支持跨 run 对比曲线、筛选超参数、分组实验和协作查看训练状态",
        "Artifacts 对数据集、模型、评估结果等文件资产做版本化，并通过 <code>use_artifact()</code>/<code>log_artifact()</code> 建立 lineage DAG",
        "Tables/Media 支持图像、音频、文本、分割 mask、预测样本等多模态结果的样本级分析",
        "Sweeps 通过 agent 调度随机、网格或贝叶斯超参搜索，并把每次试验自动记录为普通 run",
        "Reports/Registry/Automations 将实验看板扩展为团队复盘、模型发布和下游流程触发机制"
      ],
      "detail": "<p><img alt=\"W&amp;B 实验 dashboard\" src=\"https://mintcdn.com/wb-21fd5541/88iR80mZ8tuFCZUU/images/experiments/experiments_landing_page.png?fit=max&amp;auto=format&amp;n=88iR80mZ8tuFCZUU&amp;q=85&amp;s=3250a01d7dd14400455474aee6818e30\" />\n<em>图：W&amp;B 官方 Experiments 文档中的 dashboard 示例。训练代码通过 SDK 上报 run 数据，云端 workspace 将多个 run 的指标、配置和产物集中展示，供团队比较与协作分析。</em></p>\n<pre><code class=\"language-python\"># W&amp;B 实验追踪、artifact lineage 与 sweep agent 的核心伪代码\nimport wandb\n\ndef train():\n    with wandb.init(project=&quot;vision-models&quot;, job_type=&quot;train&quot;) as run:\n        cfg = run.config\n        dataset = run.use_artifact(&quot;tiles-dataset:latest&quot;)\n        data_dir = dataset.download()\n\n        model = build_model(lr=cfg.lr, depth=cfg.depth)\n        for step, batch in enumerate(loader(data_dir)):\n            loss, acc, samples = train_step(model, batch)\n            run.log({\n                &quot;loss&quot;: loss,\n                &quot;accuracy&quot;: acc,\n                &quot;examples&quot;: wandb.Table(data=samples, columns=[&quot;image&quot;, &quot;pred&quot;, &quot;label&quot;]),\n            }, step=step)\n\n        model_artifact = wandb.Artifact(&quot;classifier&quot;, type=&quot;model&quot;)\n        model_artifact.add_file(&quot;checkpoints/best.pt&quot;)\n        run.log_artifact(model_artifact, aliases=[&quot;latest&quot;, f&quot;acc-{acc:.3f}&quot;])\n\nsweep_config = {\n    &quot;method&quot;: &quot;bayes&quot;,\n    &quot;metric&quot;: {&quot;name&quot;: &quot;accuracy&quot;, &quot;goal&quot;: &quot;maximize&quot;},\n    &quot;parameters&quot;: {\n        &quot;lr&quot;: {&quot;min&quot;: 1e-5, &quot;max&quot;: 1e-2},\n        &quot;depth&quot;: {&quot;values&quot;: [18, 34, 50]},\n    },\n}\nsweep_id = wandb.sweep(sweep_config, project=&quot;vision-models&quot;)\nwandb.agent(sweep_id, function=train, count=50)\n</code></pre>\n<p>W&amp;B 的设计动机是把实验从本地日志文件提升为团队共享的结构化数据库。一次 run 可以抽象为：</p>\n<div class=\"kb-math kb-math-display\">R = (config, history, summary, files, artifacts, media, system, code)</div>\n<p>其中 <code>history</code> 是按 step 追加的指标序列，<code>summary</code> 是最终或聚合后的关键值，<code>config</code> 保存超参数和运行配置，<code>system</code> 记录 GPU/CPU/内存等资源曲线。Dashboard 的曲线对比、平行坐标图和筛选器，本质上都是在这些结构化字段上做查询和聚合，而不是事后解析散落在机器上的日志文本。</p>\n<p>Artifact 机制补上了“指标好看但模型从哪来”的缺口。一个训练 run 可以声明自己使用了 <code>dataset:v3</code>，并输出 <code>classifier:v7</code>；评估 run 再使用 <code>classifier:v7</code> 和 <code>test-set:v2</code> 生成 <code>eval-report:v1</code>。W&amp;B 将这些关系表示为有向无环图：</p>\n<div class=\"kb-math kb-math-display\">G = (V_{run} \\cup V_{artifact}, E_{use} \\cup E_{log})</div>\n<p>边 <span class=\"kb-math kb-math-inline\">E_{use}</span> 表示 run 消费某个 artifact，边 <span class=\"kb-math kb-math-inline\">E_{log}</span> 表示 run 产出某个 artifact。这个图让团队能够沿 lineage 反查模型的训练数据、代码运行、评估文件和下游消费者；alias 如 <code>latest</code>、<code>best</code> 则提供人类可读的版本入口，但底层版本仍是不可混淆的 artifact revision。</p>\n<p>Tables/Media 让实验追踪不止停留在标量曲线。对于计算机视觉，用户可以把输入图像、预测 mask、置信度、真实标签放在同一行；对于 NLP，可以记录 prompt、completion、评分和错误类别。这样，团队不仅能看到 <code>accuracy</code> 从 0.82 到 0.86，还能查询“哪些类别仍被误判”“某次模型是否在低光照样本上退化”。这类样本级分析是纯 TensorBoard 曲线或 CSV 指标很难覆盖的。</p>\n<p>Sweeps 把超参搜索调度和实验追踪合在一起。用户声明搜索空间、优化指标和方法后，agent 从 W&amp;B 后端领取下一组参数并启动普通训练函数；每一次候选配置仍然是完整 run，所以 dashboard、artifacts、tables 和 reports 都能复用。若使用贝叶斯搜索，系统会根据已完成 run 的目标指标更新候选分布；若使用 grid/random，则重点是并行调度与结果聚合。</p>\n<p>与 MLflow 相比，W&amp;B 更偏在线协作和交互式可视化，尤其强化 workspace、reports、tables 和 artifact lineage；与 DVC 相比，W&amp;B 的 artifact 更贴近云端 run 图谱，而不是 Git commit 驱动的本地版本控制；与 Optuna 相比，W&amp;B Sweeps 可以做 HPO，但它的核心价值仍是把大量训练运行组织成可查询、可讨论、可复用的团队知识库。</p>\n<div class=\"key-point\">💡 关键：W&amp;B 的工程贡献在于把训练过程标准化为 run 事件流，并把文件资产标准化为 artifact DAG；这两个结构让实验比较、模型溯源和团队协作可以发生在同一个系统里。</div>",
      "quiz": {
        "q": "W&B Artifacts 的 lineage 图主要回答哪类问题？",
        "options": [
          "某个模型版本由哪些数据、代码运行和上游产物生成，又被哪些下游 run 使用",
          "如何替代 GPU 驱动并提升显存容量",
          "如何把所有训练脚本自动改写成 C++",
          "如何让每个 run 使用完全相同的随机种子"
        ],
        "answer": 0,
        "explain": "Artifacts 通过 use/log 关系把 run 与数据、模型、评估文件连接成 DAG，便于复现、审计和团队协作。"
      }
    },
    {
      "id": "flashinfer_bench",
      "num": 22,
      "name": "FlashInfer-Bench",
      "fullName": "FlashInfer-Bench",
      "year": "2026",
      "org": "MLSys Community",
      "parent": "mlflow",
      "paperUrl": "https://mlsys.org/Conferences/2026/Schedule?type=Poster",
      "projectUrl": "",
      "category": "experiment_mgmt",
      "motivation": "AI驱动的LLM系统基准测试平台",
      "summary": "FlashInfer-Bench 提出了面向 LLM 推理 GPU kernel 的闭环基准与生产替换流程，用 FlashInfer Trace 把任务定义、真实 workload、候选实现和评测结果统一成可复现记录，解决 AI 生成 kernel 难以进入真实推理系统的问题。",
      "keyPoints": [
        "闭环架构：把 LLM agent/human expert 生成 kernel、基准评测、排行榜反馈和生产替换组织成同一循环",
        "FlashInfer Trace：用 Definition、Workload、Solution、Evaluation 四段 schema 描述 kernel 合约、输入分布、实现和不可变评测记录",
        "真实 workload 数据集：从 SGLang 运行 DeepSeek-V3、Llama-3.1-8B、Qwen3-30B-A3B 等模型的 serving traces 中采集代表性 kernel 输入",
        "鲁棒评测：同时处理确定性 kernel、低精度 FP8 kernel 和采样类随机 kernel，并用隔离执行抑制 reward hacking",
        "连续排行榜：用 <code>fast_p</code> 曲线同时衡量正确性和相对 FlashInfer/PyTorch baseline 的加速比例",
        "生产路径：<code>flashinfer_bench.apply()</code> 通过 AOT 索引和运行时 dispatcher，把最快的已验证 Solution 动态注入 SGLang/vLLM 等推理引擎"
      ],
      "detail": "<p><img alt=\"FlashInfer-Bench architecture\" src=\"https://arxiv.org/html/2601.00227v1/x1.png\" />\n<em>图：FlashInfer-Bench 论文 Figure 1，来源为 arXiv HTML；图中展示 FlashInfer Trace、FlashInfer-Bench Dataset、Leaderboard、LLM Engine 和 <code>flashinfer_bench.apply()</code> 组成的闭环。</em></p>\n<pre><code class=\"language-python\"># FlashInfer-Bench 反馈式 agent 评测流程伪代码，整理自论文 Algorithm 1\ndef feedback_loop_agent(definition, language, hardware, max_rounds):\n    accepted = []\n    agent = CodeAgent.initialize(definition, language, hardware)\n    solution = agent.generate()\n\n    for i in range(max_rounds):\n        trace = flashinfer_bench.benchmark(definition, solution)\n        if trace.status == &quot;PASSED&quot;:\n            accepted.append((solution, trace))\n\n        # 把编译错误、数值误差、latency、speedup 等反馈给 agent 继续改写 kernel\n        solution = agent.optimize(trace)\n\n    return max(accepted, key=lambda item: item[1].speedup).solution\n</code></pre>\n<p>FlashInfer-Bench 的核心问题不是“模型能否写出 CUDA/Triton 代码”，而是“候选 kernel 是否能在真实 LLM 服务流量中正确、稳定且可无缝部署”。传统 kernel benchmark 往往用手工挑选的 shape 和公开 reference 做单点测试，容易高估泛化能力；真实服务里会出现 ragged sequence、paged KV cache、FP8/BF16 混合精度、MoE routing、sampling 随机性和不同 batch/concurrency 组合。FlashInfer-Bench 因此把 workload 从生产 trace 中抽象出来，并把每个输入绑定到 Definition，让 agent 面对的是实际推理系统会触发的算子分布。</p>\n<p>FlashInfer Trace 是这个平台的通信协议。<code>Definition</code> 给出 I/O tensor、dtype、axis 的 const/var 角色和 PyTorch reference semantics；<code>Workload</code> 给出具体 shape 与输入材料化方式；<code>Solution</code> 保存候选 kernel 源码、入口函数和兼容硬件/软件元数据；<code>Evaluation</code> 则把某个 <code>Definition × Solution × Workload</code> 的正确性、性能和运行环境快照固化为不可变记录。这样设计的好处是，agent、人类工程师、benchmark service 和 leaderboard 都围绕同一个 trace object 交换信息，不需要在自然语言说明、临时脚本和线下报告之间反复转换。</p>\n<p>评测层首先把正确性放在性能之前。确定性 kernel 需要所有输出元素满足误差界，并拒绝 NaN/Inf；低精度 kernel 用 matched-ratio 规则，允许少量 FP8 等低精度算术造成的 outlier；随机采样 kernel 则不能逐元素对比，需要比较经验分布与目标分布的总变差距离：</p>\n<div class=\"kb-math kb-math-display\">\\mathrm{TVD}(\\hat{\\mathbf{f}}, \\mathbf{q}) = \\frac{1}{2}\\sum_i |\\hat{f}_i - q_i| \\le \\tau_{\\mathrm{TVD}}</div>\n<p>这里 <span class=\"kb-math kb-math-inline\">\\mathbf{q}</span> 是由输入概率与 top-k/top-p 等 mask 归一化得到的目标分布，<span class=\"kb-math kb-math-inline\">\\hat{\\mathbf{f}}</span> 是重复运行 kernel 后的经验分布。TVD 的直觉是直接约束任意事件上的最大概率误差；如果采样结果落在 mask 禁止的 token 上，即使总体分布看似接近也会被判失败。</p>\n<p>性能指标采用 KernelBench 风格的 <code>fast_p</code>，把正确性和相对加速合成一个曲线：</p>\n<div class=\"kb-math kb-math-display\">\\mathrm{fast}_{p}=\\frac{1}{N}\\sum_{i=1}^{N}\\mathbf{1}(\\mathrm{correct}_{i}\\land \\{\\mathrm{speedup}_{i}&gt;p\\})</div>\n<p>当 <span class=\"kb-math kb-math-inline\">p=0</span> 时它退化为通过率；当 <span class=\"kb-math kb-math-inline\">p</span> 增大时，它衡量在多少 workload 上既正确又超过指定倍数的 baseline。相比单个平均 latency，这个曲线更适合 agent kernel：一个候选实现可能只在部分 shape 上很快，或在少数长序列上失败；<code>fast_p</code> 会把这些局部失败直接反映到曲线面积中。</p>\n<p><code>flashinfer_bench.apply()</code> 解决最后一公里部署问题。离线阶段，系统按误差阈值过滤 trace，从 workload 中提取 shape/key，给每个 key 选择最快 Solution，并把最常被选中的实现 AOT 编译成执行文件；在线阶段，dispatcher 只需用当前 kernel 参数构造 key，做 <span class=\"kb-math kb-math-inline\">O(1)</span> 索引查找，必要时 JIT 编译剩余候选。这个机制使 serving engine 可以通过环境变量或装饰器启用替换，禁用时透明回退到原始 FlashInfer 实现，避免为了每个 agent kernel 手写集成代码。</p>\n<p>与 MLflow/W&amp;B 这类实验管理平台相比，FlashInfer-Bench 更接近“系统优化实验的执行层”。MLflow 主要记录模型训练参数、指标和 artifact；FlashInfer-Bench 则定义了 kernel 级任务、评测沙箱、硬件相关性能度量和 runtime dispatch。它的 MLOps 价值在于让 AI 生成的底层系统优化也具备可复现 lineage、可比较排行榜和可回滚部署路径。</p>\n<div class=\"key-point\">💡 关键：FlashInfer-Bench 的贡献不是单个 kernel 优化技巧，而是把 kernel 生成、验证、评测、选择和生产替换变成同一套可自动迭代的协议。</div>",
      "quiz": {
        "q": "FlashInfer-Bench 的 `fast_p` 指标为什么比只报告平均 latency 更适合评测 AI 生成 kernel？",
        "options": [
          "它只统计编译时间，因此能避免 GPU 噪声",
          "它同时要求 kernel 正确，并统计超过指定 baseline 加速阈值的 workload 比例",
          "它会自动忽略失败 workload，从而突出最快样本",
          "它只适用于训练 loss，而不适用于推理 kernel"
        ],
        "answer": 1,
        "explain": "`fast_p` 对每个 workload 同时检查 correctness 和 speedup>p，能暴露局部错误或只在少数 shape 上变快的候选实现。"
      }
    },
    {
      "id": "sagemaker_agent",
      "num": 23,
      "name": "SageMaker AI Agent",
      "fullName": "SageMaker AI Agent",
      "year": "2026",
      "org": "AWS",
      "parent": "wandb",
      "paperUrl": "https://aws.amazon.com/sagemaker/",
      "projectUrl": "",
      "category": "experiment_mgmt",
      "motivation": "智能代理自动完成数据准备到微调策略选择",
      "summary": "SageMaker AI Agent 把模型定制中的需求澄清、数据转换、微调策略选择、训练、评估和部署封装为 agent-guided workflow，解决企业从自然语言需求到可运行 SageMaker 训练/部署代码之间依赖人工专家编排的问题。",
      "keyPoints": [
        "Agent-guided workflow：用户用自然语言描述场景，Kiro、Claude Code、Cursor 等 coding agent 在 SageMaker AI Skills 指导下生成可编辑 notebook/代码",
        "九类模型定制 Skills：覆盖 use case specification、planning、fine-tuning setup、dataset evaluation/transformation、fine-tuning、model evaluation、deployment 等生命周期阶段",
        "训练策略推荐：根据任务和数据在 SFT、DPO、RLVR 等定制技术之间选择，并生成 SageMaker AI serverless fine-tuning 作业",
        "数据到评估闭环：自动检查数据 schema/格式，转换到目标模型所需格式，并用 LLM-as-a-Judge 或任务指标比较 base model 与 fine-tuned model",
        "IDE 与协议集成：SageMaker Studio JupyterLab 内置 Kiro，并支持 Agent Communication Protocol 兼容 agent；Skills 也可通过 AWSLabs agent plugin 在本地 IDE/CLI 使用",
        "AWS API 编排：agent 生成的代码负责调用 SageMaker AI、S3、MLflow Apps、MCP tools、SageMaker endpoint 或 Bedrock Custom Model Import"
      ],
      "detail": "<p><img alt=\"SageMaker AI agent-guided model customization\" src=\"https://d2908q01vomqb2.cloudfront.net/f1f836cb4ea6efb2a0b1b99f41ad8b103eff4b59/2026/05/04/ml-20721.png\" />\n<em>图：AWS Machine Learning Blog 的 SageMaker AI agent-guided model customization 配图，来源为 AWS 官方 CloudFront 图片。</em></p>\n<pre><code class=\"language-python\"># SageMaker AI Agent-guided model customization 伪代码\ndef customize_model_with_agent(user_prompt, data_uri, target_env):\n    context = {\n        &quot;request&quot;: user_prompt,\n        &quot;data&quot;: data_uri,\n        &quot;deployment_target&quot;: target_env,\n    }\n\n    plan = skills[&quot;planning&quot;].run(context)\n    use_case = skills[&quot;use_case_specification&quot;].run(context, plan)\n    data_report = skills[&quot;dataset_evaluation&quot;].run(data_uri, use_case)\n    transformed = skills[&quot;dataset_transformation&quot;].run(data_uri, data_report)\n\n    train_cfg = skills[&quot;fine_tuning_setup&quot;].select(\n        use_case=use_case,\n        dataset=transformed,\n        candidates=[&quot;SFT&quot;, &quot;DPO&quot;, &quot;RLVR&quot;],\n    )\n    training_job = sagemaker_ai.start_serverless_fine_tuning(train_cfg)\n\n    eval_report = skills[&quot;model_evaluation&quot;].compare(\n        base_model=train_cfg.base_model,\n        tuned_model=training_job.model_artifact,\n        metrics=use_case.success_criteria,\n    )\n    if eval_report.passes_gate:\n        return skills[&quot;deployment&quot;].deploy(training_job.model_artifact, target_env)\n    return {&quot;status&quot;: &quot;blocked&quot;, &quot;reason&quot;: eval_report.failure_summary}\n</code></pre>\n<p>SageMaker AI Agent 不是一个单独的训练算法，而是把模型定制流程拆成可被 coding agent 调用的专家技能集合。AWS 官方文档把这些 Skills 定义为面向 IDE 或命令行 coding assistant 的指令/工作流模块，用来编排 use case specification、planning、dataset transformation、customization technique selection、fine-tuning、model evaluation 和 deployment。用户输入的自然语言并不直接变成一个黑盒作业，而是先被 agent 转换为可审阅计划，再生成 notebook 与 SageMaker API 调用代码。</p>\n<p>核心机制可以理解为“技能选择 + 可执行代码生成”。给定用户请求 <span class=\"kb-math kb-math-inline\">x</span>、数据摘要 <span class=\"kb-math kb-math-inline\">d</span>、目标约束 <span class=\"kb-math kb-math-inline\">c</span>，agent 需要选择一组技能序列 <span class=\"kb-math kb-math-inline\">\\pi</span> 并输出可运行 artifact：</p>\n<div class=\"kb-math kb-math-display\">\\pi^* = \\arg\\max_{\\pi} \\; U(\\mathrm{quality}, \\mathrm{cost}, \\mathrm{latency}, \\mathrm{governance} \\mid x,d,c)</div>\n<p>这个公式不是 AWS 文档中的显式目标函数，而是对 workflow 的机制化抽象：agent 在任务质量、训练成本、上线延迟和治理要求之间做规划。与通用聊天助手不同，SageMaker AI Skills 把 AWS API、数据格式、权限、S3、MLflow Apps、SageMaker endpoint 和 Bedrock 导入路径等领域知识放进 agent 上下文，降低了“回答看似正确但无法运行”的概率。</p>\n<p>微调策略选择是最关键的决策点。SFT 适合有高质量示范答案的数据；DPO 适合偏好对比数据；RLVR 则适合答案可以由规则、程序或 verifier 自动给出奖励的任务。agent 的价值在于先检查数据是否支持这些方法，例如是否有 prompt/response、chosen/rejected pair、verifiable reward function 或评估集，再生成相应 serverless training job。对用户来说，差异不是“点一个训练按钮”，而是把数据准备、训练脚本、指标记录和错误处理都写成可复用代码。</p>\n<p>训练与评估阶段形成实验管理闭环。AWS 博客示例中，agent 会生成使用 SageMaker AI serverless training job 的 notebook，并把训练/验证指标分发到 SageMaker AI MLflow Apps。评估 Skill 会按 use case 推荐指标，比较 base model 与 fine-tuned model，只有通过阈值或人工审阅条件才进入 deployment Skill。这与 W&amp;B/MLflow 的关系更像互补：W&amp;B/MLflow 侧重记录和可视化，SageMaker AI Agent 侧重生成并执行 AWS 上的工作流，同时把指标和 artifact 接入实验追踪。</p>\n<p>部署阶段体现“agent 生成代码而非替用户隐藏代码”的设计。agent 可以根据延迟、扩缩容和集成要求，在 SageMaker AI endpoint 与 Bedrock Custom Model Import 等路径之间选择，并生成 endpoint provisioning、sample inference 和清理资源的代码。由于 notebook 可编辑，团队可以加入自己的 IAM、VPC、模型注册、审批和成本限制，从而把一次性的对话操作固化为组织内可复用流程。</p>\n<div class=\"key-point\">💡 关键：SageMaker AI Agent 的贡献在于把模型定制的专家决策转化为可审阅、可执行、可追踪的 AWS 工作流，而不是只提供一个新的 UI 或单点微调 API。</div>",
      "quiz": {
        "q": "SageMaker AI Agent-guided workflow 与普通实验追踪工具的主要区别是什么？",
        "options": [
          "它只记录 loss 曲线，不负责生成训练代码",
          "它通过 Skills 指导 coding agent 生成并编排数据、训练、评估和部署代码",
          "它只能运行本地 CPU 训练，不能调用云端服务",
          "它要求用户手写所有 SageMaker API 调用"
        ],
        "answer": 1,
        "explain": "SageMaker AI Agent 的核心是用领域 Skills 让 coding agent 生成可执行 SageMaker 工作流；实验追踪只是闭环中的一部分。"
      }
    },
    {
      "id": "tfx",
      "num": 24,
      "name": "TFX",
      "fullName": "TensorFlow Extended (TFX)",
      "year": "2017",
      "org": "Google",
      "parent": "—",
      "paperUrl": "https://www.tensorflow.org/tfx",
      "projectUrl": "",
      "category": "mlops_lifecycle",
      "motivation": "端到端生产级ML平台，涵盖数据校验到模型评估",
      "summary": "TFX 提出了面向生产 ML 的端到端 pipeline 平台，把数据摄取、统计、校验、转换、训练、评估、模型验证和推送拆成强类型组件，解决研究脚本难以稳定进入持续训练与生产部署的问题。",
      "keyPoints": [
        "标准组件链：ExampleGen、StatisticsGen、SchemaGen、ExampleValidator、Transform、Trainer、Tuner、Evaluator、InfraValidator、Pusher、BulkInferrer",
        "Artifact DAG：每个组件消费和产出强类型 artifacts，orchestrator 根据 artifact 依赖推导执行顺序",
        "ML Metadata：记录 artifacts、executions、contexts 和 lineage，使每次训练与模型产物可追溯",
        "TensorFlow Data Validation：通过数据统计与 schema 检查缺失值、类型错误、取值越界、training-serving skew 和 drift",
        "TensorFlow Transform：把全量统计特征工程导出为 transform graph，保证训练和服务使用同一预处理逻辑",
        "Evaluator/TFMA：在部署前按指标和数据切片比较候选模型与 baseline，只有 blessed model 才能进入 Pusher",
        "多编排后端：TFX workflow 可运行在 Apache Airflow、Apache Beam、Kubeflow Pipelines、Vertex Pipelines 等环境"
      ],
      "detail": "<p><img alt=\"TFX component flow\" src=\"https://raw.githubusercontent.com/tensorflow/tfx/master/docs/guide/images/prog_fin.png\" />\n<em>图：TFX 官方文档的 Component Flow，来源为 TensorFlow/tfx GitHub 文档源码；图中展示从 ExampleGen 到 Pusher 的标准组件数据流。</em></p>\n<pre><code class=\"language-python\"># TFX 标准 pipeline 伪代码\nexample_gen = CsvExampleGen(input_base=data_path)\nstatistics = StatisticsGen(examples=example_gen.outputs[&quot;examples&quot;])\nschema = SchemaGen(statistics=statistics.outputs[&quot;statistics&quot;])\nvalidator = ExampleValidator(\n    statistics=statistics.outputs[&quot;statistics&quot;],\n    schema=schema.outputs[&quot;schema&quot;],\n)\ntransform = Transform(\n    examples=example_gen.outputs[&quot;examples&quot;],\n    schema=schema.outputs[&quot;schema&quot;],\n    module_file=&quot;preprocessing.py&quot;,\n)\ntrainer = Trainer(\n    examples=transform.outputs[&quot;transformed_examples&quot;],\n    transform_graph=transform.outputs[&quot;transform_graph&quot;],\n    schema=schema.outputs[&quot;schema&quot;],\n    module_file=&quot;model.py&quot;,\n)\nevaluator = Evaluator(\n    examples=example_gen.outputs[&quot;examples&quot;],\n    model=trainer.outputs[&quot;model&quot;],\n    baseline_model=latest_blessed_model,\n    eval_config=eval_config,\n)\npusher = Pusher(\n    model=trainer.outputs[&quot;model&quot;],\n    model_blessing=evaluator.outputs[&quot;blessing&quot;],\n    push_destination=serving_dir,\n)\n</code></pre>\n<p>TFX 的出发点是生产 ML 与普通软件发布不同：输入数据本身会变化，特征工程可能依赖全量统计，训练脚本和服务预处理容易不一致，模型上线前还要和当前线上版本做切片级比较。KDD 2017 的 TFX 论文把这些问题抽象成生产级 ML 平台需求；开源 TFX 则把这些需求落成组件化 pipeline，使一次模型训练不再只是执行 Python 脚本，而是生成一组有 lineage 的 artifacts。</p>\n<p>Pipeline 的基本结构是 artifact dependency DAG。组件 <span class=\"kb-math kb-math-inline\">C_i</span> 声明输入 artifacts、输出 artifacts 和执行参数，TFX 根据依赖关系构造有向无环图：</p>\n<div class=\"kb-math kb-math-display\">C_j \\rightarrow C_i \\quad \\Longleftrightarrow \\quad \\mathrm{outputs}(C_j) \\cap \\mathrm{inputs}(C_i) \\ne \\varnothing</div>\n<p>例如 SchemaGen 依赖 StatisticsGen 的 statistics，ExampleValidator 同时依赖 statistics 和 schema，Transform 依赖 examples 与 schema。这样 orchestrator 可以安全地并行运行没有相互依赖的节点，例如 ExampleValidator 和 Transform 在满足共同上游后可并行；同时 ML Metadata 会记录每个 execution 使用了哪些输入、产生了哪些输出，便于定位某个线上模型到底来自哪批数据、哪个 schema 和哪段训练代码。</p>\n<p>数据质量控制由 TFDV 负责。StatisticsGen 先计算训练/评估数据的 summary statistics，SchemaGen 从统计中推断初始 schema，ExampleValidator 再用 schema 检查异常。schema 可以表达 dtype、required/optional、取值域、稀疏特征 valency、训练/服务环境差异等约束。一个简化的异常判定可以写成：</p>\n<div class=\"kb-math kb-math-display\">\\mathrm{anomaly}(f)=\n\\mathbf{1}[\\mathrm{type}(f)\\notin S_f]\n\\lor \\mathbf{1}[\\mathrm{missing\\_rate}(f)&gt;\\tau_m]\n\\lor \\mathbf{1}[\\mathrm{drift}(P_t(f),P_{t+1}(f))&gt;\\tau_d]</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">S_f</span> 是 schema 对特征 <span class=\"kb-math kb-math-inline\">f</span> 的约束，<span class=\"kb-math kb-math-inline\">\\tau_m</span> 是缺失率阈值，<span class=\"kb-math kb-math-inline\">\\tau_d</span> 是 drift 阈值。TFDV 官方文档中，categorical drift 可用 L-infinity distance，numeric drift 可用近似 Jensen-Shannon divergence；这让数据问题在训练前暴露，而不是等模型指标下降后再排查。</p>\n<p>Transform 组件解决 training-serving skew。许多特征工程需要全量 pass，例如归一化、分桶、词表构建；如果训练时用 pandas/Beam 计算，服务时用另一套 Java/C++/Python 逻辑复写，很容易出现边界处理不一致。TFT 要求用户定义 <code>preprocessing_fn</code>，离线阶段基于训练数据分析出常量、词表和变换图，随后把同一个 <code>transform_graph</code> 同时喂给 Trainer 与 serving signature。机制上，它把训练和服务预处理约束为同一个函数：</p>\n<div class=\"kb-math kb-math-display\">x&#x27;_{\\mathrm{train}} = g_\\theta(x), \\quad x&#x27;_{\\mathrm{serve}} = g_\\theta(x)</div>\n<p>这里 <span class=\"kb-math kb-math-inline\">\\theta</span> 是从训练数据分析得到的均值、方差、vocabulary 等 transform 状态。只要服务加载的是同一份 <code>transform_graph</code>，线上和离线就不会因为手写预处理差异产生系统性偏差。</p>\n<p>Evaluator/TFMA 是部署门控。它会在评估集和指定 slices 上计算候选模型指标，并可与最新 blessed baseline 比较：如果候选模型在 AUC、loss、accuracy 等指标上满足绝对阈值和相对变化阈值，Evaluator 产生 blessing；否则 Pusher 不会把模型推到服务目录。这个机制把“模型是否足够好”从人工看几张图变成 pipeline 的显式条件，也使持续训练可以自动运行但不自动发布坏模型。</p>\n<p>与 Kubeflow Pipelines、Airflow 的区别在于抽象层级。Airflow/KFP 更偏通用工作流编排；TFX 定义的是 ML 生命周期里的标准组件、artifact 类型和元数据语义。TFX pipeline 可以交给这些 orchestrator 执行，但仍保留 ExampleGen、Transform、Evaluator、Pusher 等 ML 专用契约。对 ML 平台而言，这种契约比单纯 DAG 更重要，因为它规定了数据校验、特征一致性、模型祝福和 lineage 的边界。</p>\n<div class=\"key-point\">💡 关键：TFX 的核心贡献是把生产 ML 的隐性工程约束组件化、类型化和可追踪化，让持续训练与部署从手工流程变成可审计 pipeline。</div>",
      "quiz": {
        "q": "TFX Transform 组件主要解决的生产问题是什么？",
        "options": [
          "让训练和服务加载同一份 transform graph，减少 training-serving skew",
          "替代所有模型训练算法",
          "只负责把 CSV 文件压缩成 zip",
          "绕过模型评估直接发布模型"
        ],
        "answer": 0,
        "explain": "TFT 会把从训练数据分析得到的预处理逻辑导出为 transform graph，并同时用于训练与服务。"
      }
    },
    {
      "id": "kubeflow",
      "num": 25,
      "name": "Kubeflow",
      "fullName": "Kubeflow",
      "year": "2018",
      "org": "Google/Cisco",
      "parent": "tfx",
      "paperUrl": "https://www.kubeflow.org/",
      "projectUrl": "",
      "category": "mlops_lifecycle",
      "motivation": "基于Kubernetes的云原生ML工作流编排平台",
      "summary": "Kubeflow 将机器学习开发、训练、调参、流水线和服务部署统一到 Kubernetes 资源模型上，解决了 ML 系统在多团队、多框架、多集群环境中的可复现编排和生产化运维问题。",
      "keyPoints": [
        "以 Kubernetes 为底座，用 CRD、controller、namespace、RBAC、PVC、Service 等原生机制表达 ML 工作负载",
        "Kubeflow Pipelines 将端到端 ML 流程编译为由容器化组件组成的 DAG，并追踪 run、artifact、metadata 与参数",
        "Kubeflow Trainer/Training Operator 将分布式训练封装为 TrainJob、PyTorchJob、TFJob、MPIJob 等声明式 API",
        "Notebooks、Profiles、Central Dashboard 提供多租户交互开发入口，并把用户隔离映射到 Kubernetes 命名空间和权限",
        "Katib 负责超参数搜索和 AutoML，KServe 负责模型推理服务、自动扩缩容、健康检查、流量治理和灰度发布",
        "与 TFX 的差异在于 Kubeflow 更偏云原生平台层：它不绑定单一 ML 框架，而是把框架、数据处理、训练和服务都托管到 K8s 生态"
      ],
      "detail": "<p><img alt=\"Kubeflow 官方架构图\" src=\"https://www.kubeflow.org/docs/started/images/kubeflow-architecture.drawio.svg\" />\n<em>图：Kubeflow Architecture 官方文档中的 Overview Diagram，展示 Kubeflow subprojects 如何覆盖 AI lifecycle 并运行在 Kubernetes 之上；图片来源：Kubeflow 官方文档。</em></p>\n<p>Kubeflow 的核心思想不是发明新的集群调度器，而是把机器学习任务“翻译”为 Kubernetes 能理解的声明式资源。一个训练任务、一次流水线运行或一个推理服务都可以看成期望状态 <span class=\"kb-math kb-math-inline\">S_{desired}</span>，controller 持续观察实际状态 <span class=\"kb-math kb-math-inline\">S_{actual}</span>，并通过创建 Pod、Service、PVC、Job、InferenceService 等资源让二者收敛：</p>\n<div class=\"kb-math kb-math-display\">\\text{reconcile}(S)=\\arg\\min_{a \\in A} d(S_{desired}, a(S_{actual}))</div>\n<p>这个机制使 Kubeflow 可以继承 Kubernetes 的资源调度、故障恢复、服务发现、密钥管理、配额和审计能力。对 ML 平台团队而言，关键收益是边界清晰：数据科学家提交的是 pipeline 或 training spec，平台侧负责把它落到 GPU、存储、网络、权限和日志系统中。</p>\n<pre><code class=\"language-python\"># Kubeflow 端到端训练与部署流程伪代码\nfrom kfp import dsl\n\n@dsl.component\ndef preprocess(raw_uri: str) -&gt; str:\n    dataset_uri = run_spark_or_container_job(raw_uri)\n    return dataset_uri\n\n@dsl.component\ndef train(dataset_uri: str, epochs: int) -&gt; str:\n    # 实际实现可创建 PyTorchJob/TFJob/TrainJob，由 Kubernetes controller 编排 worker pod。\n    model_uri = submit_distributed_training(\n        image=&quot;registry.example.com/trainer:latest&quot;,\n        inputs={&quot;dataset&quot;: dataset_uri, &quot;epochs&quot;: epochs},\n        resources={&quot;gpu&quot;: 8, &quot;cpu&quot;: 64},\n    )\n    return model_uri\n\n@dsl.component\ndef evaluate(model_uri: str, holdout_uri: str) -&gt; float:\n    metrics = run_batch_inference(model_uri, holdout_uri)\n    return metrics[&quot;auc&quot;]\n\n@dsl.component\ndef deploy(model_uri: str):\n    apply_kserve_inferenceservice(\n        name=&quot;fraud-model&quot;,\n        predictor={&quot;tensorflow&quot;: {&quot;storageUri&quot;: model_uri}},\n        autoscaling={&quot;minReplicas&quot;: 1, &quot;maxReplicas&quot;: 20},\n    )\n\n@dsl.pipeline(name=&quot;train-evaluate-deploy&quot;)\ndef pipeline(raw_uri: str, holdout_uri: str, epochs: int = 5):\n    ds = preprocess(raw_uri=raw_uri)\n    model = train(dataset_uri=ds.output, epochs=epochs)\n    auc = evaluate(model_uri=model.output, holdout_uri=holdout_uri)\n    with dsl.If(auc.output &gt; 0.80):\n        deploy(model_uri=model.output)\n</code></pre>\n<p>Kubeflow Pipelines 将工作流建模为有向无环图 <span class=\"kb-math kb-math-inline\">G=(V,E)</span>。每个节点 <span class=\"kb-math kb-math-inline\">v \\in V</span> 是一个容器化组件，边 <span class=\"kb-math kb-math-inline\">e=(u,v)</span> 表示数据依赖或执行顺序，因此调度约束可以写成：</p>\n<div class=\"kb-math kb-math-display\">e=(u,v) \\in E \\Rightarrow start(v) \\ge finish(u)</div>\n<p>组件之间传递的是参数和 artifact，而不是隐式共享的本地文件。这样做牺牲了一点开发便利性，但换来可复现性：每次 run 的输入、镜像、参数、产物位置和指标都能被记录，失败节点可以单独重试，缓存也可以基于组件输入输出进行判断。相比把整个 ML 脚本塞进一个单体 Job，DAG 把“数据准备、训练、评估、注册、部署”拆成可审计的边界。</p>\n<p>分布式训练层体现了 Kubeflow 的第二个系统抽象：将框架特定的启动协议写入 CRD 和 controller。例如 PyTorch 分布式训练需要 rank、world size、master 地址、worker 副本、重启策略和资源请求；TFJob 又有 chief、worker、parameter server 等角色。Kubeflow 把这些内容声明为训练资源，controller 负责创建 Pod、注入环境变量、观察状态和汇总 job condition。资源可行性由 Kubernetes 调度器处理：</p>\n<div class=\"kb-math kb-math-display\">\\sum_{p \\in node} cpu_p \\le C_{node},\\quad\n\\sum_{p \\in node} mem_p \\le M_{node},\\quad\n\\sum_{p \\in node} gpu_p \\le G_{node}</div>\n<p>模型服务层通常通过 KServe 接入。Kubeflow 不把“服务模型”简化为启动一个 Flask 进程，而是把模型 URI、runtime、protocol、autoscaling、canary traffic 和 health check 组织为 InferenceService。训练产物从 pipeline artifact 或模型仓库流入服务层，线上请求再通过网关路由到 predictor。这使部署过程能被 GitOps、审计和回滚管理，而不是依赖人工复制模型文件。</p>\n<p>Kubeflow 的平台价值还在多租户。Profiles 和 namespace 将不同团队的 notebook、pipeline run、secret、PVC 和服务隔离开；RBAC 决定谁能提交训练、读取产物或发布服务。这个设计非常贴合企业 ML 平台：数据科学家使用 Notebook 和 SDK，平台工程师维护 cluster policy，安全团队审计 Kubernetes 对象和访问控制。</p>\n<div class=\"key-point\">💡 关键：Kubeflow 的“算法”不是某个损失函数，而是一套云原生控制面抽象。它把 ML 生命周期中的状态、依赖、资源和权限都变成声明式对象，再用 Kubernetes reconciliation loop 保持系统收敛。</div>",
      "quiz": {
        "q": "Kubeflow Pipelines 为什么适合表达端到端机器学习流程？",
        "options": [
          "它把每个步骤表示为容器化组件 DAG，并记录参数、产物和运行元数据",
          "它要求所有模型必须用 TensorFlow 编写",
          "它通过单机 shell 脚本顺序执行所有任务",
          "它只负责展示 notebook，不参与训练或部署"
        ],
        "answer": 0,
        "explain": "KFP 的核心是组件 DAG 和元数据追踪；这让数据准备、训练、评估和部署可以被复现、重试、缓存和审计。"
      }
    },
    {
      "id": "feast",
      "num": 26,
      "name": "Feast",
      "fullName": "Feast特征存储 (Feast)",
      "year": "2019",
      "org": "Gojek/Google",
      "parent": "kubeflow",
      "paperUrl": "https://feast.dev/",
      "projectUrl": "",
      "category": "mlops_lifecycle",
      "motivation": "首个开源特征存储，解决训练与推理数据一致性",
      "summary": "Feast 提出开源特征存储抽象，用统一的特征定义、离线/在线存储和时间正确的读取 API，解决生产 ML 中训练-推理特征不一致、未来信息泄漏和在线低延迟取数问题。",
      "keyPoints": [
        "用 Entity、FeatureView、DataSource、FeatureService 描述特征语义、主键、schema、事件时间、TTL 和服务分组",
        "Registry 保存特征对象元数据，使特征定义可以版本化、复用、审计并被训练和推理共享",
        "Offline Store 面向历史训练集和 batch scoring，Online Store 面向毫秒级在线推理查询",
        "<code>get_historical_features</code> 执行 point-in-time join，确保训练样本只使用预测时间点之前可见的特征",
        "materialization 或 push 写入将特征从 batch/stream/request sources 同步到在线存储，降低线上计算复杂度",
        "Feature Server 和 SDK 使模型服务按 entity row 获取在线特征，避免每个模型服务重复实现特征读取逻辑"
      ],
      "detail": "<p><img alt=\"Feast 官方架构图\" src=\"https://raw.githubusercontent.com/feast-dev/feast/master/docs/assets/feast_marchitecture.png\" />\n<em>图：Feast 官方架构图，展示 request/stream/batch sources 经 Transform 进入 Feast 的 Store、Serve、Register 三类能力，并输出 online/offline features；图片来源：Feast 官方文档仓库。</em></p>\n<p>Feast 解决的是生产 ML 数据路径问题，而不是模型结构问题。推荐、广告、风控等系统通常有两套特征逻辑：训练时用 Spark/SQL 从历史表中拼出训练集，线上推理时用服务代码、缓存或 KV store 取最近特征。只要两套逻辑在窗口、过滤条件、缺失值或时间戳处理上不一致，就会出现 training-serving skew；如果训练集 join 时拿到了样本时间之后才产生的值，还会出现未来信息泄漏。</p>\n<p>Feast 的对象模型把这些隐含约定显式化。Entity 定义 join key，DataSource 指向表、流或请求输入，FeatureView 定义一组共享实体、时间戳、TTL 和 schema 的特征，Registry 则保存这些定义。训练和服务读取都引用同一份 Registry，因此“哪个特征叫什么、从哪里来、实体键是什么、保鲜期多长”不再散落在训练脚本和线上服务中。</p>\n<pre><code class=\"language-python\"># Feast 特征定义、训练读取、在线读取的核心流程伪代码\nfrom datetime import timedelta\nfrom feast import Entity, FeatureStore, FeatureView, Field\nfrom feast.types import Float32, Int64\n\ndriver = Entity(name=&quot;driver&quot;, join_keys=[&quot;driver_id&quot;])\n\ndriver_stats = FeatureView(\n    name=&quot;driver_hourly_stats&quot;,\n    entities=[driver],\n    ttl=timedelta(days=2),\n    schema=[\n        Field(name=&quot;conv_rate&quot;, dtype=Float32),\n        Field(name=&quot;avg_daily_trips&quot;, dtype=Int64),\n    ],\n    source=driver_stats_batch_source,  # 包含 event_timestamp 字段的离线/流式数据源\n)\n\nstore = FeatureStore(repo_path=&quot;feature_repo/&quot;)\nstore.apply([driver, driver_stats])      # 将定义写入 registry\nstore.materialize(start_date, end_date)  # 将最新可服务特征写入 online store\n\ntraining = store.get_historical_features(\n    entity_df=label_rows_with_event_timestamp,\n    features=[\n        &quot;driver_hourly_stats:conv_rate&quot;,\n        &quot;driver_hourly_stats:avg_daily_trips&quot;,\n    ],\n)\n\nonline = store.get_online_features(\n    features=[&quot;driver_hourly_stats:conv_rate&quot;],\n    entity_rows=[{&quot;driver_id&quot;: 1001}, {&quot;driver_id&quot;: 1002}],\n)\n</code></pre>\n<p>Point-in-time join 是 Feast 最关键的机制。对训练样本 <span class=\"kb-math kb-math-inline\">(e,t)</span>，其中 <span class=\"kb-math kb-math-inline\">e</span> 是实体键、<span class=\"kb-math kb-math-inline\">t</span> 是样本预测时间，Feast 不能简单取该实体的最新特征，而要取在 <span class=\"kb-math kb-math-inline\">t</span> 之前已经产生且没有超过 TTL 的最新值：</p>\n<div class=\"kb-math kb-math-display\">r^*(e,t)=\\operatorname*{arg\\,max}_{r \\in F(e)}\nr.event\\_timestamp\n\\quad \\text{s.t.}\\quad\nr.event\\_timestamp \\le t,\\quad\nt-r.event\\_timestamp \\le TTL</div>\n<p>这个公式的直觉很简单：训练时模拟线上预测在当时能看到的信息状态。若样本发生在 10:00，就不能把 10:05 才计算出的点击率 join 进来；否则离线 AUC 会虚高，上线后模型拿不到这些“未来特征”。当数据源有 <code>created_timestamp</code> 时，还可以进一步处理迟到数据，避免在某个事件时间已经存在但实际晚到的数据污染训练视图。</p>\n<p>在线服务路径则追求低延迟。Feast 推荐把预计算特征 materialize 到 Redis、DynamoDB、Bigtable、PostgreSQL 等 Online Store，让推理服务把特征读取简化为带 TTL 语义的 KV 查询：</p>\n<div class=\"kb-math kb-math-display\">\\hat{y}=model\\big(x_{request},\\; f_{online}(entity\\_id)\\big)</div>\n<p>这里 <span class=\"kb-math kb-math-inline\">x_{request}</span> 是请求时才有的上下文特征，<span class=\"kb-math kb-math-inline\">f_{online}</span> 是 Feast 从在线存储返回的预计算特征。把重计算从请求链路中移出后，模型服务不需要连接数据仓库或重跑复杂 SQL，只需通过 SDK 或 Feature Server 拉取统一定义的在线特征。</p>\n<p>Feast 的 Transform/Store/Serve/Register 分层也解释了它为什么适合嵌入现有数据平台。Transform 可以发生在请求时、流式链路或离线计算引擎中；Store 不强制替换企业已有的 Snowflake、BigQuery、Spark、Redis 或 DynamoDB；Serve 提供训练和推理两类读取 API；Register 则让元数据成为协作接口。它更像“特征控制面”和“一致读取层”，而不是一个必须托管全部数据的数据库。</p>\n<p>与 Kubeflow 的关系可以理解为上下游协同：Kubeflow Pipelines 可以编排特征生成、训练和部署；Feast 则负责让训练步骤和线上 InferenceService 获取同一组特征定义。二者结合后，ML 平台不只会调度容器，还能保证模型输入的数据语义一致。</p>\n<div class=\"key-point\">💡 关键：Feast 的核心不是把特征集中存到一个地方，而是把特征定义、时间正确性和离线/在线读取路径集中管理；这正是生产 ML 数据系统最容易出错的部分。</div>",
      "quiz": {
        "q": "Feast 的 point-in-time join 主要防止哪类问题？",
        "options": [
          "训练样本 join 到预测时间之后才可见的未来特征",
          "GPU 显存被模型权重占满",
          "Kubernetes 调度器无法创建 Pod",
          "模型服务只能使用 REST，不能使用 gRPC"
        ],
        "answer": 0,
        "explain": "Point-in-time join 会为每个样本选择其事件时间之前的最新有效特征，避免离线训练看到线上推理时不可用的信息。"
      }
    },
    {
      "id": "tf_serving",
      "num": 27,
      "name": "TF Serving",
      "fullName": "TensorFlow Serving",
      "year": "2017",
      "org": "Google",
      "parent": "—",
      "paperUrl": "https://www.tensorflow.org/tfx/guide/serving",
      "projectUrl": "",
      "category": "inference_system",
      "motivation": "高性能模型推理系统，支持模型版本热切换",
      "summary": "TensorFlow Serving 提出面向生产推理的高性能模型服务器，用 Servable 生命周期管理、版本策略、SavedModel 集成和请求 batching 解决模型热更新、低延迟访问和多模型服务化问题。",
      "keyPoints": [
        "Servable 是核心抽象，可表示 SavedModel、查找表、词表或组合模型，而生命周期由 Serving Core 管理",
        "Source 发现模型版本，Loader 封装加载/卸载逻辑，Manager 根据 aspired versions 和 version policy 控制上线状态",
        "版本化模型目录支持在不中断服务的情况下加载新版本，并允许客户端请求 latest 或指定版本",
        "TensorFlow ModelServer 提供 gRPC/REST Predict API，并能通过 model config 同时托管多个模型",
        "Batching 将多个小请求合并为一次推理，在 GPU/CPU 加速器上用可控排队延迟换取更高吞吐",
        "Availability Preserving Policy 偏可用性，Resource Preserving Policy 偏资源节省，二者对应不同热切换成本"
      ],
      "detail": "<p><img alt=\"TensorFlow Serving 官方架构图\" src=\"https://raw.githubusercontent.com/tensorflow/serving/master/tensorflow_serving/g3doc/images/serving_architecture.svg\" />\n<em>图：TensorFlow Serving 官方架构图，展示 Source、Loader、Manager 与 Servable 的生命周期关系；图片来源：TensorFlow Serving 官方文档仓库。</em></p>\n<p>TensorFlow Serving 面对的核心问题是“模型是动态对象，但服务 API 必须稳定”。训练系统会持续产出新模型版本，线上服务却不能在加载权重时停止接收请求，也不能让请求访问到半加载的模型。Serving 的设计把模型文件、加载过程、版本选择和请求路径拆开，使服务端 API 保持稳定，同时后台异步更新可服务对象。</p>\n<p>官方论文和文档中最重要的抽象是 Servable。Servable 是客户端真正使用的对象，可以是一个 TensorFlow SavedModelBundle，也可以是 embedding lookup table、词表或其他推理依赖。它本身不管理生命周期；Source 负责发现某个 servable stream 的新版本，Loader 知道如何把该版本装入内存，Manager 决定何时加载、暴露和卸载。</p>\n<pre><code class=\"language-python\"># TensorFlow Serving 生命周期与推理路径伪代码\nclass FileSystemSource:\n    def poll(self, base_path):\n        # /models/ranker/1, /models/ranker/2, ... 目录号即模型版本\n        versions = sorted(list_numeric_subdirs(base_path))\n        loaders = [SavedModelLoader(path=f&quot;{base_path}/{v}&quot;, version=v) for v in versions]\n        manager.update_aspired_versions(&quot;ranker&quot;, loaders)\n\nclass Manager:\n    def update_aspired_versions(self, model_name, loaders):\n        plan = version_policy.plan(current=self.loaded[model_name], aspired=loaders)\n        for action in plan:\n            if action.kind == &quot;load&quot; and resource_ok(action.loader):\n                servable = action.loader.load()\n                self.publish(model_name, action.version, servable)\n            if action.kind == &quot;unload&quot; and policy_allows_unload(action.version):\n                self.unpublish_and_free(model_name, action.version)\n\ndef predict(request):\n    model_name = request.model_spec.name\n    version = request.model_spec.version or manager.latest_ready_version(model_name)\n    with manager.get_servable_handle(model_name, version) as servable:\n        batch = batch_scheduler.enqueue_or_form_batch(request)\n        return servable.session.run(\n            fetches=request.output_tensor_names,\n            feed_dict=batch.to_feed_dict(),\n        )\n</code></pre>\n<p>版本控制可以写成一个 aspired set 问题。Source 在时刻 <span class=\"kb-math kb-math-inline\">t</span> 观测到希望服务的版本集合 <span class=\"kb-math kb-math-inline\">A_t=\\{v_1,\\dots,v_k\\}</span>，Manager 已加载集合为 <span class=\"kb-math kb-math-inline\">L_t</span>。Version policy 负责生成加载/卸载动作，使最终状态接近 <span class=\"kb-math kb-math-inline\">A_t</span>，并满足可用性或资源约束：</p>\n<div class=\"kb-math kb-math-display\">L_{t+1} = policy(L_t, A_t, R)</div>\n<p>Availability Preserving Policy 的约束是尽量保证任意时刻至少有一个可用版本，因此常见顺序是先加载新版本再卸载旧版本；Resource Preserving Policy 则避免新旧模型同时占用内存，可能先卸载旧版本再加载新版本。前者适合强可用服务，后者适合模型很大或显存紧张的场景。</p>\n<pre><code class=\"language-text\">/models/fraud_detector/\n  1678900000/\n    saved_model.pb\n    variables/\n  1679000000/\n    saved_model.pb\n    variables/\n\nmodel_config_list {\n  config {\n    name: &quot;fraud_detector&quot;\n    base_path: &quot;/models/fraud_detector&quot;\n    model_platform: &quot;tensorflow&quot;\n    model_version_policy { latest { num_versions: 2 } }\n  }\n}\n</code></pre>\n<p>这个目录约定让部署系统非常简单：训练完成后导出 SavedModel 到一个新的数字版本目录，Serving 通过 Source 轮询或外部通知发现新目录，再由 Loader 构建 servable。客户端可以继续请求 <code>fraud_detector</code> 的 latest，也可以在灰度、回滚或 A/B test 中指定版本号。相比把模型权重直接嵌入业务服务，版本目录和 Manager 把“发布模型”变成了一个受控生命周期事件。</p>\n<p>Batching 是 TensorFlow Serving 的性能机制。单个在线请求的 batch size 往往很小，矩阵乘法和 GPU kernel 启动成本无法被摊薄。Serving 在请求到达后等待一个很短窗口，把满足形状兼容条件的请求组成批：</p>\n<div class=\"kb-math kb-math-display\">B=\\{r_i \\mid 0 \\le arrival(r_i)-arrival(r_0) \\le \\Delta,\\ |B|\\le B_{max}\\}</div>\n<p>平均计算成本可以近似理解为：</p>\n<div class=\"kb-math kb-math-display\">cost_{per\\_request}(B) \\approx \\frac{T_{infer}(|B|)+T_{queue}}{|B|}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\Delta</span> 或 <code>batch_timeout_micros</code> 决定额外排队延迟，<code>max_batch_size</code> 决定吞吐上限和显存风险。调参的本质是寻找延迟 SLO 和硬件利用率之间的平衡：低流量服务可能不值得等待，高并发 GPU 推理则通常能从 batching 中获得显著吞吐收益。</p>\n<p>TensorFlow Serving 与 KServe 的层次不同。TensorFlow Serving 是模型服务器和 Serving Core，关注模型加载、版本、推理 API 和 batching；KServe 是 Kubernetes 上的推理控制面，关注 InferenceService CRD、自动扩缩容、网关路由、canary 和多框架 runtime。生产系统中经常由 KServe 管理 TensorFlow Serving runtime，从而把单机模型服务器能力接入集群级发布和弹性能力。</p>\n<div class=\"key-point\">💡 关键：TF Serving 的创新点在于把模型服务拆为稳定 API、动态 servable 生命周期和可调性能路径。热切换不是“覆盖文件”，而是 Source、Loader、Manager、Version Policy 共同完成的状态迁移。</div>",
      "quiz": {
        "q": "TensorFlow Serving 中 Manager 的核心职责是什么？",
        "options": [
          "根据 Source 提供的 aspired versions 管理 Servable 的加载、暴露和卸载",
          "训练神经网络并更新反向传播梯度",
          "替代客户端生成所有输入特征",
          "把 Kubernetes 集群节点扩容到更多机器"
        ],
        "answer": 0,
        "explain": "Manager 监听 Source/Loader 产生的版本信息，并按 version policy 管理 servable 生命周期，保证客户端拿到可用版本。"
      }
    },
    {
      "id": "kserve",
      "num": 28,
      "name": "KServe",
      "fullName": "KServe",
      "year": "2021",
      "org": "KubeFlow Community",
      "parent": "tf_serving",
      "paperUrl": "https://kserve.github.io/website/",
      "projectUrl": "",
      "category": "inference_system",
      "motivation": "基于Serverless架构的标准化模型推理协议",
      "summary": "KServe 提出以 Kubernetes CRD 为核心的云原生模型服务抽象，把模型运行时选择、模型加载、推理协议、弹性伸缩、流量治理和预处理/后处理/可解释组件统一封装到 `InferenceService` 生命周期中。",
      "keyPoints": [
        "以 <code>InferenceService</code> 为核心 API，将 <code>predictor</code>、<code>transformer</code>、<code>explainer</code>、模型存储 URI、资源需求和流量策略声明为 Kubernetes 原生资源。",
        "通过 <code>ServingRuntime</code>/<code>ClusterServingRuntime</code> 解耦模型格式与模型服务器，支持 TensorFlow、PyTorch、scikit-learn、XGBoost、ONNX、Triton、Hugging Face、vLLM 等运行时。",
        "控制面采用 Kubernetes controller reconcile 模式，把高层模型服务声明翻译为 Deployment/Knative Service、Service、Gateway/Ingress、HPA/KEDA 和状态条件。",
        "数据面提供预测模型的 V1/V2 Open Inference Protocol，以及生成式模型的 OpenAI-compatible API、SSE 流式返回和 LLM 路由能力。",
        "支持 canary、A/B testing、InferenceGraph、pre/post-processing、explainability、model cache、storage container 和多租户资源隔离。",
        "与 TF Serving 这类单模型服务器不同，KServe 的贡献在于平台级标准化：模型服务器只是一个可插拔 runtime，生命周期、网络、弹性和协议由控制面统一治理。"
      ],
      "detail": "<p><img alt=\"KServe 官方分层架构\" src=\"https://kserve.github.io/website/img/kserve-layer.png\" />\n<em>图：KServe 官方架构图，来源为 KServe website；图中展示 KServe 位于 Kubernetes 编排层之上，并向上统一 predictive/generative runtime、GenAI integration、autoscaling、networking 和硬件加速能力。</em></p>\n<pre><code class=\"language-python\"># KServe controller 的核心 reconcile 逻辑（简化伪代码）\ndef reconcile_inference_service(isvc):\n    spec = isvc.spec\n    runtime = select_serving_runtime(\n        model_format=spec.predictor.model.modelFormat,\n        explicit_runtime=spec.predictor.model.runtime,\n    )\n    model_volume = resolve_storage_uri(spec.predictor.model.storageUri)\n\n    workload = build_predictor_workload(\n        runtime=runtime,\n        model_volume=model_volume,\n        resources=spec.predictor.resources,\n        mode=isvc.annotations.get(&quot;deploymentMode&quot;, &quot;standard&quot;),\n    )\n    if spec.transformer:\n        workload = attach_transformer(workload, spec.transformer)\n    if spec.explainer:\n        workload = attach_explainer(workload, spec.explainer)\n\n    route = configure_gateway_or_knative_route(isvc, traffic=spec.predictor.canaryTrafficPercent)\n    scaler = configure_autoscaler(isvc, min_replicas=spec.predictor.minReplicas)\n    status = observe_readiness(workload, route, scaler)\n    patch_status(isvc, status)\n</code></pre>\n<p>KServe 的基本设计动机是把“运行一个模型服务器容器”提升为“声明一个生产推理服务”。在直接使用 TF Serving、TorchServe 或自定义容器时，团队通常还要重复实现模型下载、runtime 参数、健康检查、灰度、伸缩、网关、协议适配和可观测性。KServe 将这些重复模式收敛到 <code>InferenceService</code>、<code>ServingRuntime</code>、<code>InferenceGraph</code>、<code>LocalModelCache</code> 等 CRD 中，使推理服务可以像其他 Kubernetes 工作负载一样被声明、审计、滚动更新和回滚。</p>\n<p>从机制上看，<code>InferenceService</code> 是一个高层 desired state，控制面持续执行：</p>\n<div class=\"kb-math kb-math-display\">\\text{InferenceServiceSpec}\n\\xrightarrow{\\text{reconcile}}\n\\{\\text{Runtime Pod},\\text{Model Storage},\\text{Service},\\text{Gateway Route},\\text{Autoscaler},\\text{Status}\\}</div>\n<p>这个映射的关键是分离“模型语义”和“平台实现”。<code>modelFormat</code> 与 <code>storageUri</code> 描述用户真正关心的模型，<code>ServingRuntime</code> 描述该模型应由哪个 server image 运行，controller 再根据部署模式选择标准 Kubernetes Deployment、Knative Service、Gateway API/Ingress 与 HPA/KEDA。这样，平台管理员可以统一维护 runtime 模板、资源默认值、镜像安全策略和网络策略，而模型开发者只需要提交服务声明。</p>\n<p>KServe 的数据面则把请求路径标准化。预测式模型通常走 V1 或 V2 inference protocol：V1 延续 TensorFlow Serving 风格的 <code>:predict</code>/<code>:explain</code>，V2 使用 <code>/infer</code>、metadata、readiness/liveness 和 REST/gRPC 接口，便于 Triton 等 server 互通。生成式模型增加 OpenAI-compatible endpoints，例如 <code>/v1/chat/completions</code>、<code>/v1/completions</code>、<code>/v1/embeddings</code>，并支持流式 token 返回。其抽象可以写成：</p>\n<div class=\"kb-math kb-math-display\">y = R_{\\theta}(\\tau_{\\text{pre}}(x;\\phi),\\; m,\\; p), \\qquad\n\\hat{y} = \\tau_{\\text{post}}(y;\\psi)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">R_{\\theta}</span> 是被 <code>ServingRuntime</code> 封装的模型服务器，<span class=\"kb-math kb-math-inline\">m</span> 是模型文件或 Hugging Face/对象存储 URI，<span class=\"kb-math kb-math-inline\">p</span> 是协议参数，<span class=\"kb-math kb-math-inline\">\\tau_{\\text{pre}}</span> 与 <span class=\"kb-math kb-math-inline\">\\tau_{\\text{post}}</span> 分别对应可选 <code>transformer</code> 中的预处理和后处理。KServe 把这些组件放在一个 endpoint 的流量链路中，调用方看到的是稳定 API，平台内部可以独立升级 runtime、替换 storage backend 或扩缩容副本。</p>\n<p>控制面和数据面分离是 KServe 相比传统模型服务器的核心差别。TF Serving 主要关注单进程内的模型版本加载、batching 和 RPC；KServe 关注跨模型、跨框架、跨租户的运维边界。它把灰度发布表述为 Gateway/Knative 的流量比例，把 scale-to-zero 或按指标伸缩交给 Knative/HPA/KEDA，把复杂模型组合交给 <code>InferenceGraph</code>。因此它的“算法”更像系统编排算法：通过 CRD、controller 和 runtime contract 将模型服务变成可组合的 Kubernetes 原生资源。</p>\n<div class=\"key-point\">💡 关键：KServe 的创新不是新的神经网络公式，而是把推理服务的控制面状态、数据面协议和 runtime 插拔点统一成声明式接口，降低多框架生产部署的运维复杂度。</div>",
      "quiz": {
        "q": "KServe 相比直接部署 TF Serving 容器，最核心的系统抽象是什么？",
        "options": [
          "用 InferenceService CRD 声明模型服务，并由控制面统一生成 runtime、网络、伸缩和状态资源",
          "把所有模型强制转换成 TensorFlow SavedModel",
          "只提供一个固定 REST endpoint，不管理底层 Kubernetes 资源",
          "用单个 GPU kernel 同时执行所有模型"
        ],
        "answer": 0,
        "explain": "KServe 的核心贡献是平台级 CRD 与 reconcile 控制面；模型服务器是可插拔 runtime，而不是唯一抽象。"
      }
    },
    {
      "id": "vllm",
      "num": 29,
      "name": "vLLM",
      "fullName": "vLLM",
      "year": "2023",
      "org": "UC Berkeley",
      "parent": "kserve",
      "paperUrl": "https://arxiv.org/abs/2309.06180",
      "projectUrl": "",
      "category": "inference_system",
      "motivation": "提出PagedAttention，极大提升LLM推理吞吐量",
      "summary": "vLLM 提出 PagedAttention，把操作系统分页思想引入 LLM KV cache 管理，让连续逻辑 token 的 KV 可以映射到非连续物理 block，从而减少显存浪费、支持 cache 共享，并显著提升高并发推理吞吐。",
      "keyPoints": [
        "PagedAttention 将每个序列的 KV cache 划分为固定大小 KV block，通过 block table 完成逻辑块到物理块的映射。",
        "KV cache manager 按需分配和释放 GPU/CPU block，避免按最大输出长度预分配连续 tensor 带来的 reserved waste、内部碎片和外部碎片。",
        "PagedAttention kernel 根据 block table 读取非连续 KV block，在 attention 计算中保持逻辑连续视图。",
        "通过 reference count 与 copy-on-write 支持 parallel sampling、beam search 和 shared prefix 场景下的 KV cache 共享。",
        "中央 scheduler 与 block manager 协同进行 continuous batching、抢占、recompute/swap 和分布式 GPU worker 执行。",
        "论文在 ShareGPT/Alpaca 等 workload 上显示，在相同延迟水平下，vLLM 相比 FasterTransformer/Orca 可获得约 2-4 倍吞吐提升，长上下文和复杂 decoding 更受益。"
      ],
      "detail": "<p><img alt=\"vLLM block table 翻译示意图\" src=\"https://ar5iv.labs.arxiv.org/html/2309.06180/assets/x7.png\" />\n<em>图：vLLM 论文 Figure 6，来源为 ar5iv/arXiv HTML；逻辑 KV block 通过 block table 映射到 GPU DRAM 中非连续的物理 KV block。</em></p>\n<pre><code class=\"language-python\"># vLLM decoding loop with PagedAttention（简化伪代码）\nwhile scheduler.has_unfinished_requests():\n    batch = scheduler.select_requests(policy=&quot;FCFS&quot;, memory_budget=kv_allocator.free_blocks)\n\n    for seq in batch:\n        # prefill 阶段可能一次写入多个 token；decode 阶段通常每步追加一个 token\n        needed = seq.required_new_kv_blocks()\n        for _ in range(needed):\n            physical_block = kv_allocator.allocate_gpu_block()\n            seq.block_table.append(physical_block)\n\n    input_tokens = scheduler.pack_current_step_tokens(batch)\n    block_tables = [seq.block_table for seq in batch]\n\n    # kernel 按 block table 读取非连续 KV，并把新 KV 写入当前 block\n    logits, new_kv = model.forward_with_paged_attention(input_tokens, block_tables)\n    next_tokens = sampler.sample(logits, batch.sampling_params)\n\n    for seq, token in zip(batch, next_tokens):\n        seq.append(token)\n        if seq.finished():\n            kv_allocator.free(seq.block_table)\n        elif kv_allocator.needs_preemption():\n            scheduler.preempt_latest(seq, mode=&quot;swap_or_recompute&quot;)\n</code></pre>\n<p>LLM serving 的主要瓶颈往往不是单步矩阵乘本身，而是能否在 GPU 显存中容纳足够多并发请求。每个 token 在每一层都产生 key/value 向量，KV cache 会随 prompt 和生成长度增长；输出长度在请求开始时未知，因此传统系统若为每个请求按最大长度预留连续 tensor，会把大量显存锁在未来可能用不到的位置上。论文将浪费分为保留未用位置、内部碎片和外部碎片，这些浪费会直接压低 batch size，导致 GPU 算力利用率不足。</p>\n<p>PagedAttention 的核心是把 KV cache 的地址空间虚拟化。对一个序列而言，逻辑 token 仍然是连续的；对 GPU allocator 而言，存储被切成固定大小 block，序列的第 <span class=\"kb-math kb-math-inline\">j</span> 个逻辑 block 可以映射到任意空闲物理 block。设 block size 为 <span class=\"kb-math kb-math-inline\">B</span>，第 <span class=\"kb-math kb-math-inline\">j</span> 个 key/value block 为：</p>\n<div class=\"kb-math kb-math-display\">K_j=(k_{(j-1)B+1},\\ldots,k_{jB}), \\qquad\nV_j=(v_{(j-1)B+1},\\ldots,v_{jB})</div>\n<p>对第 <span class=\"kb-math kb-math-inline\">i</span> 个 query token，attention 不再假设所有 <span class=\"kb-math kb-math-inline\">K,V</span> 在一段连续地址中，而是按 block table 逐块读取：</p>\n<div class=\"kb-math kb-math-display\">A_{ij}=\\operatorname{softmax}_j\\left(\\frac{q_i^\\top K_j}{\\sqrt d}\\right), \\qquad\no_i=\\sum_{j=1}^{\\lceil i/B\\rceil} A_{ij}V_j</div>\n<p>公式的直觉是：数学上的 attention 仍然覆盖所有历史 token，只是 kernel 获取历史 KV 的方式从“连续数组下标”变成“查表后访问物理块”。只要 block table 维护正确，模型语义不变，显存分配却可以动态增长。由于每个请求只可能在最后一个 block 留有空位，浪费上界被限制在一个 block 内；block 越小，碎片越低，但 kernel 管理和调度开销越高，因此实现需要在 block size、访存合并和调度复杂度之间折中。</p>\n<p>PagedAttention 还把复杂 decoding 的 cache 共享变成自然结果。parallel sampling 中，同一个 prompt 会分叉成多个输出；beam search 中，多个 beam 在早期共享前缀，后续逐步分叉。传统系统常需要复制大量 KV tensor，而 vLLM 让多个逻辑 block 指向同一个物理 block，并维护 reference count。当某个分支要写入共享 block 时，系统只复制一个 block 并更新映射，这就是 block 粒度的 copy-on-write。共享关系由 block table 隐藏，模型执行只看到每个序列的物理 block 列表。</p>\n<p>系统层面，vLLM 将 scheduler、KV cache manager 和 GPU worker 共同设计。scheduler 负责选择当前 batch、执行抢占策略并发送每个请求的 token 与 block table；KV cache manager 负责 GPU block、CPU block、swap 或 recompute；GPU worker 只需按调度器给出的 block table 执行模型分片，并通过 NCCL 等 collective 同步张量并行结果。相比 KServe 这种平台控制面，vLLM 的位置更靠近推理引擎内核：它把显存管理、attention kernel 和 batching 策略绑定起来优化吞吐。</p>\n<div class=\"key-point\">💡 关键：PagedAttention 的价值不只是“省显存”，而是把可变长、可共享、可抢占的 KV cache 变成一个分页对象，使调度器可以用更多并发请求填满 GPU。</div>",
      "quiz": {
        "q": "PagedAttention 中 block table 的主要作用是什么？",
        "options": [
          "记录逻辑 KV block 到非连续物理 KV block 的映射，让 attention kernel 按表访问历史 KV",
          "保存模型权重的梯度，供反向传播使用",
          "把所有请求强制填充到相同最大长度",
          "替代 tokenizer，把文本直接转换成 logits"
        ],
        "answer": 0,
        "explain": "vLLM 保持逻辑序列连续，但物理 KV block 可以非连续分配；block table 是二者之间的地址翻译层。"
      }
    },
    {
      "id": "raidserve",
      "num": 30,
      "name": "RaidServe",
      "fullName": "RaidServe",
      "year": "2026",
      "org": "MLSys Community",
      "parent": "vllm",
      "paperUrl": "https://mlsys.org/Conferences/2026/Schedule?type=Poster",
      "projectUrl": "",
      "category": "inference_system",
      "motivation": "高可靠弹性推理平台，冗余计算与快速恢复",
      "summary": "RaidServe 面向张量并行 LLM serving 的 GPU 故障与不规则可用性问题，提出 KVCache/计算均衡与 Lightning Recovery 机制，在 GPU 失效后避免整组停摆、昂贵重算和长期负载倾斜。",
      "keyPoints": [
        "针对 tensor parallelism 的紧耦合脆弱性：任一 GPU 失效都会丢失本 rank 的 KVCache，阻塞 collective，并迫使请求重算或模型重分片。",
        "Cyclic KVCache Placement 将 attention head 及其 KVCache 按层循环分布，缓解非均匀 TP 配置下的显存倾斜。",
        "Hybrid Attention 同时使用 TP attention 与 DP-style replicated attention，让余数 attention head 的计算分散到不同 GPU，减少 straggler 和同步等待。",
        "Fine-Grained Load-Aware Routing 将新请求路由到剩余 DP workload 最小的 GPU，并用自适应 chunked prefill 形成更均衡的 prefill batch。",
        "Lightning Recovery 包含 proactive KVCache backup 与 on-demand weight recovery：后台异步备份新 KV page，故障后只恢复缺失 KV 和缺失权重块。",
        "Stanford MAST/MLSys 条目报告其在 8xH100 DGX 上实现最高约 2 倍吞吐提升和数量级级别的恢复延迟下降，并能在多 GPU 故障下维持较高利用率。"
      ],
      "detail": "<p><img alt=\"RaidServe Lightning Recovery 机制\" src=\"https://ar5iv.labs.arxiv.org/html/2511.14116v1/assets/images/lightning_recovery.drawio.png\" />\n<em>图：RaidServe/Failsafe 论文 Figure 4 的 On-demand Recovery 机制图，来源为 DOI 10.48550/arXiv.2511.14116 的 arXiv HTML 资产；正式 MLSys/Stanford MAST 条目使用 RaidServe 题名，OpenReview PDF 也以 RaidServe 发布。</em></p>\n<pre><code class=\"language-python\"># RaidServe: DP-aware adaptive chunked prefill + failure recovery（简化伪代码）\ndef build_prefill_batch(token_budget, ranks, schedulable_tokens, workloads):\n    load = {r: 0 for r in ranks}\n    batch, candidates = [], []\n    while len(batch) &lt; token_budget and any(schedulable_tokens[r] for r in ranks):\n        r = argmin([r for r in ranks if schedulable_tokens[r]], key=lambda x: load[x])\n        token = schedulable_tokens[r].pop(0)\n        batch.append(token)\n        load[r] += estimate_prefill_cost(token, workloads[r])\n        candidates.append(list(batch))\n    return choose_best_balanced_batch(candidates, load)\n\ndef recover_after_gpu_failure(failed_rank, surviving_ranks):\n    mark_unavailable(failed_rank)\n    new_layout = cyclic_relayout_attention_and_kv(surviving_ranks)\n    for rank in surviving_ranks:\n        rank.keep_resident_weights_and_kv()\n        rank.load_missing_kv_pages_from_host(disjoint_subset=True)\n        rank.load_only_missing_weight_shards()\n    nvlink_shuffle_for_locality(new_layout)\n    resume_serving_with_hybrid_attention(new_layout)\n</code></pre>\n<p>RaidServe 的问题背景来自 TP serving 的故障边界。vLLM 解决了单个引擎内部 KV cache 的内存管理，但大模型常需要多 GPU 张量并行：每层的 attention/FFN 被切分到多个 rank，并在层内通过 collective 合并中间结果。这个设计在正常情况下吞吐高、延迟低，但容错性很差：一个 GPU 掉线不仅使该 rank 的权重 shard 不可用，还会丢失它持有的 KVCache 分片；如果直接重启或重分片，所有 inflight 长上下文请求可能要重新 prefill，尾延迟和队列积压会急剧放大。</p>\n<p>第一组机制是“故障后继续高效运行”的平衡器。假设某层有 <span class=\"kb-math kb-math-inline\">H</span> 个 KV heads，故障后可用 GPU 数为 <span class=\"kb-math kb-math-inline\">R</span>，若 <span class=\"kb-math kb-math-inline\">H</span> 不能被 <span class=\"kb-math kb-math-inline\">R</span> 整除，朴素 non-uniform TP 会让一部分 GPU 拿到 <span class=\"kb-math kb-math-inline\">\\lceil H/R\\rceil</span> 个 heads，另一部分拿到 <span class=\"kb-math kb-math-inline\">\\lfloor H/R\\rfloor</span> 个 heads。因为 TP 层通常要同步等待最慢 rank，attention 的有效时间近似受最大负载支配：</p>\n<div class=\"kb-math kb-math-display\">T_{\\text{attn}} \\approx \\max_{r \\in R} T_r, \\qquad\nT_r \\propto h_r \\cdot L</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">h_r</span> 是 rank <span class=\"kb-math kb-math-inline\">r</span> 负责的 head 数，<span class=\"kb-math kb-math-inline\">L</span> 是当前上下文长度。Cyclic KVCache Placement 通过跨层轮转 head/KVCache 的归属，让长期显存占用不集中在固定 GPU；Hybrid Attention 则把“除不尽”的 head 用 DP-style 复制/路由处理，使不同请求的余数计算分散到多个 GPU，降低单层 straggler。</p>\n<p>第二组机制解决请求流量和 prefill batch 的倾斜。长上下文 prefill 的代价不是线性的；当一个 chunk 长度为 <span class=\"kb-math kb-math-inline\">N</span>，此前已处理上下文长度为 <span class=\"kb-math kb-math-inline\">L</span> 时，论文给出的注意力代价可概括为：</p>\n<div class=\"kb-math kb-math-display\">\\operatorname{cost}_{\\text{prefill}}(N,L)=O(N^2 + NL + N)</div>\n<p>如果调度器只按 FIFO 把一个长请求的 chunk 塞满 token budget，可能出现一个 GPU 忙于 DP attention、其他 GPU 空转的情况。RaidServe 的 load-aware router 将新请求分配给 pending DP token workload 最小的 rank；adaptive chunked prefill 再从最轻载 rank 迭代取 token/chunk，直到达到全局 budget。这样做不是追求单个请求最快完成，而是追求每个 batch 内各 rank 的工作量接近，从而提高整体吞吐和 SLO 稳定性。</p>\n<p>Lightning Recovery 关注“故障瞬间如何恢复状态”。KVCache backup 不是在故障发生后才复制，而是在正常执行期间把新生成 KV page 异步增量复制到 host memory；请求完成后丢弃对应备份。故障后，幸存 GPU 直接复用本地 KVCache，只从 host 恢复缺失 rank 的那部分 KV，并借助 cyclic placement 将 host-to-device 传输分摊到多个 GPU。恢复时间因此近似由最忙恢复 rank 的缺失数据量决定：</p>\n<div class=\"kb-math kb-math-display\">T_{\\text{recover}} \\approx\n\\max_{r \\in R&#x27;} \\frac{|KV^{\\text{miss}}_r| + |W^{\\text{miss}}_r|}{BW^{\\text{PCIe}}_r}\n + T_{\\text{NVLink-shuffle}}</div>\n<p>这里 <span class=\"kb-math kb-math-inline\">R&#x27;</span> 是幸存 rank 集合。RaidServe 的目标是让每个 rank 的 <span class=\"kb-math kb-math-inline\">|KV^{\\text{miss}}_r|</span> 与 <span class=\"kb-math kb-math-inline\">|W^{\\text{miss}}_r|</span> 尽量均衡，并用 NVLink 在 GPU 间交换局部状态，避免所有缺失数据都由单个 GPU 经 PCIe 重载。</p>\n<p>On-demand weight recovery 则避免重分片时重载已经在显存中的有效权重。以 FFN 中间维度为例，权重可按与 TP world size 无关的固定 shard 切分；故障后如果朴素地把 TP4 改成 TP3，幸存 GPU 可能被迫加载新的连续 shard，造成大量重复 PCIe 传输。RaidServe 保留幸存 rank 上已有 shard，只把失效 rank 的缺失 shard 循环分派给幸存 rank。对 attention 权重和 KVCache，也采用“每个 rank 加载不相交子集，再通过高速 GPU 互联交换”的策略。与单纯全量复制模型副本相比，这种设计更接近 RAID 的思想：增加足够的恢复状态和重布局规则，而不是为每个 TP group 保留完整热备副本。</p>\n<div class=\"key-point\">💡 关键：RaidServe 与 vLLM 是互补关系。vLLM 把 KV cache 管成分页对象以提高正常路径吞吐；RaidServe 进一步处理多 GPU TP group 在失效、降级和恢复期间的状态保存、计算均衡与快速重布局。</div>",
      "quiz": {
        "q": "RaidServe 的 Lightning Recovery 为什么能降低 GPU 故障后的恢复延迟？",
        "options": [
          "正常执行时异步备份 KVCache，故障后只恢复缺失 KV page 和缺失权重 shard，并复用幸存 GPU 上已有状态",
          "把所有请求立即丢弃，从空队列重新开始服务",
          "要求每个 GPU 始终保存完整模型和完整 KVCache 副本",
          "关闭 tensor parallelism，改用单 GPU 执行所有模型"
        ],
        "answer": 0,
        "explain": "Lightning Recovery 的关键是增量备份与按需恢复，避免长上下文 re-prefill 和重复权重传输。"
      }
    },
    {
      "id": "superinfer",
      "num": 31,
      "name": "SuperInfer",
      "fullName": "SuperInfer",
      "year": "2026",
      "org": "MLSys Community",
      "parent": "vllm",
      "paperUrl": "https://mlsys.org/Conferences/2026/Schedule?type=Poster",
      "projectUrl": "",
      "category": "inference_system",
      "motivation": "针对超级芯片的SLO感知调度系统",
      "summary": "SuperInfer 面向 NVIDIA GH200 这类 GPU-CPU Superchip，提出 RotaSched 与 DuplexKV，把 SLO 感知调度和 KV cache 分层内存管理联合起来，解决高并发 LLM 推理中 GPU HBM 不足导致的 TTFT/TBT 尾延迟问题。",
      "keyPoints": [
        "硬件假设从传统 PCIe GPU 扩展到 GH200 的 Hopper HBM + Grace DRAM + NVLink-C2C 分层内存",
        "RotaSched 引入 running、waiting、rotary 三类请求状态，用主动轮转替代仅在 OOM 前触发的被动抢占",
        "Virtual Lag Time (VLT) 同时表达 TTFT 和 TBT 的 SLO 滞后程度，Largest-VLT-First (LVF) 优先恢复最可能违约的请求",
        "DuplexKV 用 eager block rotation 消除 swap-in/swap-out 数据竞争，使 H2D 与 D2H 可以全双工重叠",
        "KV cache 从 layer-first 改为 block-first 布局，并用 batched transfer 合并小段传输，避免 PagedAttention 细粒度块拖垮 C2C 带宽",
        "跨迭代流水线把调度、KV 迁移和 decode 计算重叠，目标是在不牺牲吞吐的前提下提升 SLO attainment"
      ],
      "detail": "<p><img alt=\"SuperInfer 总体架构\" src=\"https://arxiv.org/html/2601.20309v2/x7.png\" />\n<em>图源：SuperInfer arXiv HTML 版 Figure 6。图中 RotaSched 维护请求状态并按 VLT/LVF 调度，DuplexKV 用 block table 管理 Hopper HBM 与 Grace DRAM 中的 KV cache 驻留和迁移。</em></p>\n<p><img alt=\"DuplexKV block-first KV cache 布局\" src=\"https://arxiv.org/html/2601.20309v2/x15.png\" />\n<em>图源：SuperInfer arXiv HTML 版 Figure 14。block-first 布局把同一 KV block 的多层小 segment 合并成更大的连续传输单元，并通过 <code>cudaMemcpyBatchAsync</code> 降低 launch 开销。</em></p>\n<pre><code class=\"language-python\"># SuperInfer: LVF scheduling + DuplexKV rotation sketch\ndef vlt(req, now, alpha, beta_ttft, beta_tbt, slo_ttft, slo_tbt):\n    if req.state == &quot;rotary&quot;:\n        return alpha * max(0, now - req.last_token_time - beta_tbt * slo_tbt)\n    if req.state == &quot;waiting&quot;:\n        return max(0, now - req.arrival_time - beta_ttft * slo_ttft)\n    if req.state == &quot;running&quot;:\n        return -(now - req.running_since)\n\nfor iteration in decode_loop:\n    requests = running + waiting + rotary\n    if hbm_can_hold_all(requests):\n        batch = fcfs_batch(requests)\n    else:\n        ranked = sorted(requests, key=lambda r: vlt(r, now(), alpha, beta_F, beta_B, S_F, S_B), reverse=True)\n        prioritized = pick_from_head(ranked, free_hbm_blocks + transfer_budget)\n        preempted = pick_running_from_tail(ranked, blocks_needed(prioritized) - free_hbm_blocks)\n\n        DuplexKV.eager_offload_synced_blocks(running)\n        DuplexKV.swap_out_dirty_blocks(preempted)      # HBM -&gt; DRAM\n        DuplexKV.swap_in_required_blocks(prioritized) # DRAM -&gt; HBM\n        batch = form_decode_batch(prioritized)\n\n    run_decode_step(batch)\n    DuplexKV.update_block_table(batch)\n</code></pre>\n<p>SuperInfer 的出发点是：LLM serving 的瓶颈并不只是“算得慢”，而是每个请求在自回归生成中不断增长的 KV cache 会迅速吃满 HBM。一旦高 RPS 下 HBM 无法容纳所有活跃请求，FCFS、SJF 或只在内存不足时触发的被动 swap 都会出现队头阻塞。论文把用户体验拆成两个 SLO：TTFT 约束首 token 等待时间，TBT 约束相邻 token 间隔。Waiting-First 会照顾新请求 TTFT 却让已生成中的请求长期停顿，Swapped-First 又会保护 TBT 但让新请求排队，二者都不是统一的 SLO 策略。</p>\n<p>RotaSched 的关键抽象是 rotary state：请求可以暂时离开 GPU 执行队列，KV cache 放在 Grace DRAM，稍后再被轮转回 Hopper HBM。调度优先级由 VLT 给出：</p>\n<div class=\"kb-math kb-math-display\">VLT =\n\\begin{cases}\n\\alpha \\cdot \\mathrm{ReLU}(t_{\\text{now}} - t_{\\text{last}} - \\beta_B S_B), &amp; \\text{rotary} \\\\\n\\mathrm{ReLU}(t_{\\text{now}} - t_{\\text{arr}} - \\beta_F S_F), &amp; \\text{waiting} \\\\\n-(t_{\\text{now}} - t_{\\text{run}}), &amp; \\text{running}\n\\end{cases}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">S_B</span> 和 <span class=\"kb-math kb-math-inline\">S_F</span> 分别对应 TBT 与 TTFT SLO，<span class=\"kb-math kb-math-inline\">\\alpha</span> 调整 TBT 相对 TTFT 的敏感度，<span class=\"kb-math kb-math-inline\">\\beta_B,\\beta_F</span> 是容忍系数。直觉上，waiting/rotary 请求一旦超过容忍窗口，VLT 变正并随等待时间增大，表示“落后”；running 请求 VLT 为负且越跑越小，表示“已经占用了较多 GPU 时间”。LVF 每轮把 VLT 最大的 waiting/rotary 请求放回 HBM，把 VLT 最小的 running 请求换出，从而把有限 HBM 当成 OS scheduler 中的时间片资源来管理。</p>\n<p>DuplexKV 解决的是“即使有 GH200，也不能天真地 memcpy”。vLLM/PagedAttention 的 layer-first 布局让每层每块形成很小的 segment，例如一个 block 的完整 KV 可能有数 MB，但每次连续内存段只有数十 KB，导致大量 <code>cudaMemcpyAsync</code> launch，实际 C2C 带宽远低于硬件上限。SuperInfer 把布局改成 block-first，使一个请求 block 跨层连续，近似有：</p>\n<div class=\"kb-math kb-math-display\">S_{\\text{block}} = N_L \\cdot S_{\\text{seg}}</div>\n<p>当 <span class=\"kb-math kb-math-inline\">N_L</span> 层的 segment 被合并后，传输粒度进入 NVLink-C2C 的高效区间；再用 batch copy 把同方向多个 block 描述符合并提交，就减少了 kernel launch 的固定成本。</p>\n<p>全双工迁移还有一个正确性问题：swap-in 的目标 HBM block 可能正是 swap-out 的源 block，直接开两个 CUDA stream 会产生数据竞争。DuplexKV 的 eager block rotation 利用 KV cache 只追加写入的性质，把已填满且不会再修改的 synced block 提前后台复制到 DRAM；真正抢占时，只需要处理最后一个 dirty block，已同步 block 可以从 HBM 丢弃。这让 H2D 和 D2H 在多数情况下不再互相等待，并能和 decode 计算跨迭代重叠。</p>\n<p>与 vLLM 的关系可以理解为“保留分页抽象，扩大调度边界”。PagedAttention 解决的是 GPU 内部 KV cache 碎片与复用问题，SuperInfer 进一步把 CPU DRAM 纳入 serving 的热/冷层级，并让请求调度显式感知 SLO、传输预算与 KV 驻留位置。它不是替代连续 batching，而是在 HBM 成为约束时决定哪些请求应该继续运行、哪些应该进入 rotary、哪些应该被立即恢复。</p>\n<div class=\"key-point\">💡 关键：SuperInfer 的核心不是单个更快的 kernel，而是把请求调度、KV cache 布局、双向数据搬运和 GH200 硬件层级共同建模，避免“有高速互联但软件仍按 PCIe 时代方式搬数据”。</div>",
      "quiz": {
        "q": "SuperInfer 中 VLT 的主要作用是什么？",
        "options": [
          "把所有请求固定为 FCFS 顺序",
          "估计请求相对 TTFT/TBT SLO 的滞后程度，用于决定恢复和抢占",
          "压缩模型权重以减少参数量",
          "选择 HTTP 网关的负载均衡策略"
        ],
        "answer": 1,
        "explain": "VLT 把 waiting、rotary、running 请求统一到同一优先级尺度；LVF 优先执行 VLT 高的滞后请求，并抢占 VLT 很低的长期 running 请求。"
      }
    },
    {
      "id": "opentela",
      "num": 32,
      "name": "OpenTela",
      "fullName": "OpenTela",
      "year": "2026",
      "org": "OSDI Community",
      "parent": "vllm",
      "paperUrl": "https://www.usenix.org/conference/osdi26/technical-sessions",
      "projectUrl": "",
      "category": "inference_system",
      "motivation": "统一去中心化HPC集群的异构LLM推理系统",
      "summary": "OpenTela 提出面向去中心化 HPC/云混合集群的 LLM serving overlay，用 P2P、CRDT 状态复制、身份组路由和用户态 Slurm/Kubernetes 适配，把分散异构 GPU 节点组织成一个可共享的推理资源池。",
      "keyPoints": [
        "采用 decentralized compute fabric，而不是依赖单一 Kubernetes 控制面或中心调度器",
        "通过 libp2p gossip + CRDT registry 复制 distributed node table，承载 peer、service、identity group、health、relay 等状态",
        "路由入口为 <code>/v1/service/:service/*path</code>，按服务名和请求体中的 identity group 选择能服务指定模型的 worker",
        "支持 exact、wildcard、catch-all 三层匹配，利用 <code>X-Otela-Fallback</code> 控制是否退化到更宽松的候选集合",
        "提供 direct routing 与 relay-hop routing，适配 HPC 计算节点位于防火墙/NAT 后的常见部署",
        "请求级调度内置 random、round-robin、shortest-queue，并把 fleet-level orchestration 留给外部控制环或 Fleet Manager",
        "在 SwissAI 场景中连接 Alps 的 Slurm 子集群和 Kubernetes 子集群，支撑多模型、多租户、跨硬件的共享推理服务"
      ],
      "detail": "<p><img alt=\"SwissAI OpenTela 架构图\" src=\"https://raw.githubusercontent.com/eth-easl/OpenTela/main/docs/content/docs/assets/swissai-arch.png\" />\n<em>图源：OpenTela 官方仓库文档中的 SwissAI 架构图。该图展示 API frontend、OpenTela overlay、Slurm/Kubernetes 子集群和 vLLM/SGLang 后端如何组成统一 serving 平台。</em></p>\n<pre><code class=\"language-python\"># OpenTela request routing and decentralized state sketch\ndef route_request(head, service, body, fallback_level, min_trust=0):\n    table = head.crdt_node_table.snapshot()\n    providers = [p for p in table.peers if p.provides(service)]\n\n    exact = [p for p in providers if p.identity_matches(body, mode=&quot;exact&quot;)]\n    wildcard = [p for p in providers if p.identity_matches(body, mode=&quot;wildcard&quot;)]\n    catch_all = [p for p in providers if p.identity_matches(body, mode=&quot;all&quot;)]\n\n    tiers = [exact]\n    if fallback_level &gt;= 1:\n        tiers.append(wildcard)\n    if fallback_level &gt;= 2:\n        tiers.append(catch_all)\n\n    candidates = first_non_empty([trust_filter(t, min_trust) for t in tiers])\n    worker = load_balancer.pick(candidates)  # random, round-robin, shortest-queue, or weighted\n\n    if head.has_direct_libp2p_connection(worker):\n        return p2p_forward(worker, f&quot;/v1/_service/{service}&quot;, body)\n    relay = worker.relay_peer\n    return p2p_forward(relay, f&quot;/v1/p2p/{worker.peer_id}/v1/_service/{service}&quot;, body)\n\ndef on_crdt_head_received(peer, cid):\n    block = bitswap_fetch(peer, cid, timeout=&quot;5m&quot;)\n    if block:\n        local_node_table.merge(block.delta)\n</code></pre>\n<p>OpenTela 的问题设定很具体：很多科研和国家级 AI 基础设施不是云厂商式的单一弹性集群，而是由 Slurm HPC 队列、若干子集群、少量 Kubernetes 长跑服务和多种 GPU 架构组成。传统做法要求研究者自己准备环境、提交作业、等待排队、暴露服务并管理生命周期；同一个模型可能被多人重复启动，GPU 利用率和服务可达性都不好。OpenTela 的目标是在不要求 root 权限、不改内核、不把整套 HPC 纳入 Kubernetes 的前提下，给这些节点加一层“云式”的服务发现、路由、健康检查和共享访问。</p>\n<p>系统核心状态是 distributed node table。每个 peer 在表中发布自己提供的 service、监听地址、identity group、trust/health、relay_peer 等元数据；CRDT 后端通过 Merkle-DAG head 与 PubSub/gossip 传播更新。可以把收敛过程抽象为：</p>\n<div class=\"kb-math kb-math-display\">T_i^{(k+1)} = T_i^{(k)} \\sqcup \\Delta_j</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">T_i</span> 是节点 <span class=\"kb-math kb-math-inline\">i</span> 当前看到的 node table，<span class=\"kb-math kb-math-inline\">\\Delta_j</span> 是其他 peer 广播的新 delta，<span class=\"kb-math kb-math-inline\">\\sqcup</span> 是 CRDT merge/join。即使某次 DAG block 因 peer 离线、NAT 或超时未取到，后续 gossip 仍能继续收敛；这比单中心 registry 更适合高 churn、预emptible、排队式 HPC 节点。</p>\n<p>请求路由分两层完成。第一层是语义筛选：用户访问 head node 的 <code>/v1/service/llm/v1/chat/completions</code>，head 从 JSON body 读取 <code>model</code> 等字段，和 worker 注册的 <code>identity_group</code> 对比。候选集合可写成：</p>\n<div class=\"kb-math kb-math-display\">C =\n\\begin{cases}\nC_{\\text{exact}}, &amp; C_{\\text{exact}}\\neq\\varnothing \\\\\nC_{\\text{wildcard}}, &amp; L\\ge 1 \\land C_{\\text{wildcard}}\\neq\\varnothing \\\\\nC_{\\text{all}}, &amp; L\\ge 2 \\land C_{\\text{all}}\\neq\\varnothing \\\\\n\\varnothing, &amp; \\text{otherwise}\n\\end{cases}</div>\n<p>这里 <span class=\"kb-math kb-math-inline\">L</span> 来自 <code>X-Otela-Fallback</code>。默认只接受 exact match，例如 <code>model=Qwen/Qwen3-8B</code>；开启 fallback 后才会退到 <code>model=*</code> 或 <code>all</code>。这种设计避免把不兼容模型的请求随机打到错误 worker，同时允许平台配置兜底模型或通用后端。</p>\n<p>第二层是负载均衡与连通性处理。OpenTela 内置 random、round-robin 和 shortest-queue；<code>shortest-queue</code> 使用每个 peer 的 in-flight 请求数，等价于选择</p>\n<div class=\"kb-math kb-math-display\">p^* = \\arg\\min_{p\\in C} q_p</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">q_p</span> 是该 peer 当前未完成请求数。若启用 weighted routing，还可以把候选分数 <span class=\"kb-math kb-math-inline\">w_p</span> 转成 <span class=\"kb-math kb-math-inline\">P(p)=w_p/\\sum_{c\\in C}w_c</span> 的随机选择。选中 worker 后，如果 head 与 worker 有直接 libp2p 连接，请求走 direct routing；如果 worker 在 HPC 防火墙后，则经 worker 注册的 relay peer 中转。对用户来说 endpoint 不变，这正是 overlay 的价值。</p>\n<p>OpenTela 明确区分 request-level scheduling 和 fleet-level orchestration。前者在 head node 热路径内决定“这个请求给哪个 worker”；后者是外部 observe-decide-act 控制环，轮询 <code>/v1/dnt/table</code>、<code>/metrics</code>、<code>/v1/health</code> 等接口，再通过 Slurm 作业、云 VM、systemd 或 Fleet Manager 启停节点。这个边界让 OpenTela 不强行替代 HPC scheduler，而是把 Slurm 负责的资源分配和在线服务层需要的路由/发现/故障转移连接起来。</p>\n<p>与 vLLM 的关系也很清楚：vLLM/SGLang 是单个模型实例内的推理引擎，负责 batching、KV cache 和 kernel；OpenTela 是跨节点、跨站点、跨 scheduler 的服务网络，负责把请求送到正确实例并让多个实例形成共享池。与 KServe 相比，OpenTela 不把 Kubernetes 作为唯一底座，反而把用户态 overlay 放在 Slurm 与 Kubernetes 之上，因此更适合不能长期独占节点、不能安装集群级组件的 HPC 环境。</p>\n<div class=\"key-point\">💡 关键：OpenTela 的“算法”不是一个模型内调度公式，而是把分散节点状态建模成可收敛 CRDT，把模型可服务性建模成 identity group，把不可达 HPC 节点建模成 relay-hop，从而把批处理环境变成可交互推理平台。</div>",
      "quiz": {
        "q": "OpenTela 中 identity group 路由的主要目的是什么？",
        "options": [
          "按请求中的模型等语义字段筛选能处理该服务的 worker",
          "压缩 KV cache",
          "替代 vLLM 的 attention kernel",
          "强制所有节点迁移到 Kubernetes"
        ],
        "answer": 0,
        "explain": "identity group 让 worker 声明自己能服务的模型或服务类型；head node 根据请求体和 fallback 级别选择 exact、wildcard 或 catch-all 候选。"
      }
    },
    {
      "id": "djinn",
      "num": 33,
      "name": "Djinn",
      "fullName": "Djinn",
      "year": "2026",
      "org": "OSDI Community",
      "parent": "kserve",
      "paperUrl": "https://www.usenix.org/conference/osdi26/technical-sessions",
      "projectUrl": "",
      "category": "inference_system",
      "motivation": "语义感知的透明GPU解耦系统",
      "summary": "Djinn 面向透明 GPU disaggregation，核心思想是在保持应用近似本地 GPU 编程体验的同时，让运行时理解模型阶段、tensor 驻留、依赖和关键路径语义，从而把远端 GPU 的放置、缓存和数据迁移从字节级转发提升为语义感知调度。",
      "keyPoints": [
        "USENIX OSDI '26 页面目前公开了题名与作者，论文正文/图尚未公开；以下结合官方页面和同一作者方向的公开 HotNets'25 论文进行同等深度解读",
        "目标是 transparent GPU disaggregation：应用无需显式改写成远程调用，GPU 可以来自网络连接的资源池",
        "semantic awareness 关注 phase、dependency、residency、criticality、tensor metadata，而不是只看 CUDA call、DMA 或 PCIe transaction",
        "通过框架/运行时层捕获计算意图，避免低层 driver replay 丢失语义，也避免应用专用系统需要大量手工重构",
        "调度器可根据语义决定远端 GPU 放置、KV cache/权重驻留、激活迁移、预取和重算",
        "后端数据路径适合结合 RDMA/GPUDirect 等 zero-copy 机制，减少 CPU bounce buffer 和重复传输",
        "与 KServe 这类服务编排不同，Djinn 更靠近设备虚拟化与 ML framework runtime 层"
      ],
      "detail": "<p><img alt=\"GPU-NIC 直接数据路径示意\" src=\"https://developer-blogs.nvidia.com/wp-content/uploads/2022/04/Inline-Packet-Fig-2.png\" />\n<em>图源：NVIDIA Technical Blog 的 GPUDirect RDMA 示意图。Djinn OSDI 页面目前未公开论文图；这里用 NVIDIA 官方图说明语义感知 GPU 解耦底层可能依赖的网络到 GPU 直接数据路径，而 Djinn 的关键新增部分在其上层的语义运行时和调度器。</em></p>\n<pre><code class=\"language-python\"># Djinn-style semantic GPU disaggregation sketch\ndef execute_with_remote_gpu(op, tensors, runtime_state):\n    sem = infer_semantics(\n        op=op,\n        phase=runtime_state.phase,              # e.g. llm_prefill, llm_decode\n        tensor_roles=[role(t) for t in tensors],# weight, activation, kv_cache, temp\n        dependencies=runtime_state.graph_edges,\n        criticality=runtime_state.critical_path\n    )\n\n    graph_node = SRGNode(op=op, semantics=sem, cost=profile_or_estimate(op, tensors))\n    target = scheduler.place(graph_node, gpu_pool=runtime_state.remote_gpus)\n\n    for t in tensors:\n        if not residency_ok(t, target):\n            if sem.allows_recompute(t):\n                mark_for_recompute(t, target)\n            else:\n                prefetch_or_migrate(t, target, priority=sem.criticality)\n\n    handle = backend.launch(target, graph_node, zero_copy=True)\n    runtime_state.update_residency(outputs(handle), target)\n    return materialize_if_needed(handle)\n</code></pre>\n<p>公开资料的边界需要先说明：USENIX OSDI '26 的 Djinn 条目截至当前只给出题名“Transparent GPU Disaggregation with Semantic Awareness”和作者；同一作者组在 HotNets'25 的 <em>Lost in Translation: The Search for Meaning in Network-Attached AI Accelerator Disaggregation</em> 中系统阐述了“语义翻译缺口”、Semantically Rich Graph (SRG)、framework-layer runtime 和 zero-copy backend。因此下面的机制解读以 Djinn 题名为目标，用这篇公开论文的设计语言解释 Djinn 很可能要解决的系统问题；具体实现细节应以 OSDI 正文发布后为准。</p>\n<p>传统 GPU 解耦有两个极端。低层方案在 PCIe、driver 或 CUDA API 级别转发调用，透明性好，但看到的只是内存拷贝、kernel launch 和同步点，无法判断某个 buffer 是持久权重、一次性 activation、KV cache，还是关键路径上的 logits。高层方案则可以利用模型知识，但往往变成 DistServe/Prism 这类面向特定工作负载的系统，通用性和透明性下降。Djinn 的“semantic awareness”正是在这两者之间找窄腰：运行时需要足够高，能看见 ML framework 的计算语义；同时又要足够通用，不要求每个应用手写远程执行计划。</p>\n<p>可以把语义运行时抽象为一张带注解的图：</p>\n<div class=\"kb-math kb-math-display\">SRG = (V, E, A_V, A_E)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">V</span> 是 op 或 fused subgraph，<span class=\"kb-math kb-math-inline\">E</span> 是 tensor 依赖，<span class=\"kb-math kb-math-inline\">A_V</span> 包含 phase、residency、modality、FLOPs/bytes 等节点注解，<span class=\"kb-math kb-math-inline\">A_E</span> 包含 tensor shape、precision、producer-consumer rate 和 criticality。对 LLM 推理而言，prefill 是更偏 compute-bound 的批量阶段，decode 是更偏 memory-bound 且强依赖 KV cache 的串行阶段；如果运行时能识别这一点，就不会把每一步 decode 的 KV cache 当成普通字节流反复搬运。</p>\n<p>调度器可使用类似下面的代价模型选择远端 GPU：</p>\n<div class=\"kb-math kb-math-display\">\\mathrm{cost}(v,g)=C_{\\mathrm{compute}}(v,g)+\n\\sum_{(u,v)\\in E}\\frac{\\mathrm{bytes}(u,v)\\cdot \\mathbf{1}[\\mathrm{loc}(u)\\ne g]}{\\mathrm{bw}(\\mathrm{loc}(u),g)}\n\\lambda\\cdot \\mathrm{criticality}(u,v)</div>\n<p>这个公式表达的不是 Djinn 论文中的最终形式，而是语义解耦系统必须优化的核心机制：计算放置不能只看 GPU 空闲度，还要看前驱 tensor 是否已驻留、网络带宽是否足够、依赖是否在关键路径上、迁移能否被隐藏。语义信息越丰富，调度器越能把持久权重固定在远端 GPU，把 decode 与 KV cache 共置，把短生命周期 activation 延后或重算，把非关键路径迁移放到后台。</p>\n<p>透明性意味着应用看到的接口尽量不变，复杂性落到 runtime/backend。前端可以通过框架 hook、lazy tensor、graph capture 或 CUDA/框架调用拦截捕获 intent；中间层生成语义图并交给调度器；后端再用 RDMA、GPUDirect、GPU memory handle 或用户态 RPC 执行远端计划。NVIDIA GPUDirect RDMA 图展示的是底层目标：NIC 可以直接把数据送入 GPU memory，减少 CPU 参与和 host memory bounce；Djinn 类系统的新增价值，是知道“哪些数据值得走这条快路径、哪些数据根本不该搬”。</p>\n<p>与 KServe 的区别在层级。KServe 管理的是容器化模型服务：模型副本、HTTP/gRPC endpoint、autoscaling 和流量入口；Djinn 管理的是一个模型进程内部或框架运行时看到的 GPU 资源：某个 op 在哪块本地/远端 GPU 执行，某个 tensor 的真实副本在哪里，某次同步是否必须阻塞。两者可以上下叠加：KServe 仍可负责 service lifecycle，而 Djinn 在单个 pod 或 worker 内把 GPU 从本地独占设备扩展为可池化远端资源。</p>\n<div class=\"warn-box\">⚠️ 注意：由于 Djinn OSDI 正文尚未公开，本文件没有声称其最终实现一定采用 SRG 或某个具体代价函数；这些内容是基于公开题名、作者页和同作者公开论文中“semantic accelerator disaggregation”路线的机制化解读。</div>",
      "quiz": {
        "q": "语义感知 GPU 解耦相对于低层 CUDA/PCIe 转发的关键优势是什么？",
        "options": [
          "能区分权重、激活、KV cache、执行阶段和关键路径，从而减少不必要的数据迁移",
          "完全不需要网络",
          "只适用于单机本地 GPU",
          "把模型参数随机切分到所有节点"
        ],
        "answer": 0,
        "explain": "低层转发通常只看到字节和调用，无法判断数据语义；语义运行时能据此做放置、缓存、预取和重算决策。"
      }
    }
  ],
  "categories": {
    "training_platform": {
      "label": "训练平台",
      "color": "#22a06b"
    },
    "experiment_mgmt": {
      "label": "实验管理",
      "color": "#5b63d3"
    },
    "mlops_lifecycle": {
      "label": "MLOps治理",
      "color": "#e8820c"
    },
    "inference_system": {
      "label": "推理系统",
      "color": "#9c5ec6"
    }
  },
  "projectUrls": {}
};
