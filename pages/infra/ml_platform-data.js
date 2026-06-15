/**
 * ml_platform-data.js — 由 pipeline/build.py 于 2026-06-15 09:55:57 自动生成。
 * 源文件：content/infra/ml_platform.md
 * ⚠️  请勿手动修改；如需更新，修改源文档后重新编译。
 */
window.PAGE_CONFIG = {
  "meta": {
    "domain": "infra",
    "topic_id": "ml_platform",
    "topic_name": "机器学习平台",
    "page_title": "机器学习平台技术演进",
    "page_subtitle": "2026-06-15 版",
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
      "summary": "Parameter Server 的核心目标是：提出异步分布式参数更新框架，奠定分布式ML基础。",
      "keyPoints": [
        "核心动机：提出异步分布式参数更新框架，奠定分布式ML基础",
        "代表机构：CMU/Baidu"
      ],
      "detail": "<p>提出异步分布式参数更新框架，奠定分布式ML基础</p>"
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
      "summary": "TensorFlow 的核心目标是：基于数据流图的异构分布式系统，继承DistBelief。",
      "keyPoints": [
        "核心动机：基于数据流图的异构分布式系统，继承DistBelief",
        "演化来源：继承或改进自 ps",
        "代表机构：Google Brain"
      ],
      "detail": "<p>基于数据流图的异构分布式系统，继承DistBelief</p>"
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
      "summary": "Horovod 的核心目标是：引入Ring All-Reduce提升带宽利用率。",
      "keyPoints": [
        "核心动机：引入Ring All-Reduce提升带宽利用率",
        "演化来源：继承或改进自 tensorflow",
        "代表机构：Uber"
      ],
      "detail": "<p>引入Ring All-Reduce提升带宽利用率</p>"
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
      "summary": "Ray 的核心目标是：统一的分布式执行引擎，支持动态任务调度。",
      "keyPoints": [
        "核心动机：统一的分布式执行引擎，支持动态任务调度",
        "代表机构：UC Berkeley"
      ],
      "detail": "<p>统一的分布式执行引擎，支持动态任务调度</p>"
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
      "summary": "PyTorch 的核心目标是：命令式编程与动态图，提升科研灵活性。",
      "keyPoints": [
        "核心动机：命令式编程与动态图，提升科研灵活性",
        "代表机构：Meta FAIR"
      ],
      "detail": "<p>命令式编程与动态图，提升科研灵活性</p>"
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
      "summary": "GPipe 的核心目标是：通过微批次实现流水线并行，开创性工作。",
      "keyPoints": [
        "核心动机：通过微批次实现流水线并行，开创性工作",
        "演化来源：继承或改进自 tensorflow",
        "代表机构：Google Brain"
      ],
      "detail": "<p>通过微批次实现流水线并行，开创性工作</p>"
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
      "summary": "Megatron-LM 的核心目标是：高效张量并行支持千亿参数训练。",
      "keyPoints": [
        "核心动机：高效张量并行支持千亿参数训练",
        "演化来源：继承或改进自 pytorch",
        "代表机构：NVIDIA"
      ],
      "detail": "<p>高效张量并行支持千亿参数训练</p>"
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
      "summary": "PipeDream 的核心目标是：异步流水线减少bubble开销。",
      "keyPoints": [
        "核心动机：异步流水线减少bubble开销",
        "演化来源：继承或改进自 gpipe",
        "代表机构：Microsoft/CMU"
      ],
      "detail": "<p>异步流水线减少bubble开销</p>"
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
      "summary": "Alpa 的核心目标是：自动生成算子间与算子内并行策略。",
      "keyPoints": [
        "核心动机：自动生成算子间与算子内并行策略",
        "演化来源：继承或改进自 ray",
        "代表机构：UC Berkeley"
      ],
      "detail": "<p>自动生成算子间与算子内并行策略</p>"
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
      "summary": "Colossal-AI 的核心目标是：统一的大规模并行训练系统。",
      "keyPoints": [
        "核心动机：统一的大规模并行训练系统",
        "演化来源：继承或改进自 alpa",
        "代表机构：HPC-AI Tech"
      ],
      "detail": "<p>统一的大规模并行训练系统</p>"
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
      "summary": "MegaScale 的核心目标是：万卡规模训练的容错与通信优化。",
      "keyPoints": [
        "核心动机：万卡规模训练的容错与通信优化",
        "演化来源：继承或改进自 deepspeed",
        "代表机构：ByteDance"
      ],
      "detail": "<p>万卡规模训练的容错与通信优化</p>"
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
      "summary": "nnScaler 的核心目标是：约束引导的并行策略生成。",
      "keyPoints": [
        "核心动机：约束引导的并行策略生成",
        "演化来源：继承或改进自 alpa",
        "代表机构：Microsoft"
      ],
      "detail": "<p>约束引导的并行策略生成</p>"
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
      "summary": "AXLearn 的核心目标是：模块化、硬件无关训练平台。",
      "keyPoints": [
        "核心动机：模块化、硬件无关训练平台",
        "演化来源：继承或改进自 pytorch",
        "代表机构：Apple"
      ],
      "detail": "<p>模块化、硬件无关训练平台</p>"
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
      "summary": "BOOST 的核心目标是：针对低秩大模型训练的瓶颈优化框架。",
      "keyPoints": [
        "核心动机：针对低秩大模型训练的瓶颈优化框架",
        "演化来源：继承或改进自 megatron_lm",
        "代表机构：MLSys Community"
      ],
      "detail": "<p>针对低秩大模型训练的瓶颈优化框架</p>"
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
      "summary": "Tessera 的核心目标是：整体流水线并行框架，解决万亿参数MoE训练。",
      "keyPoints": [
        "核心动机：整体流水线并行框架，解决万亿参数MoE训练",
        "演化来源：继承或改进自 megascale",
        "代表机构：OSDI Community"
      ],
      "detail": "<p>整体流水线并行框架，解决万亿参数MoE训练</p>"
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
      "summary": "Optuna 的核心目标是：Define-by-run接口，支持高效剪枝与超参搜索。",
      "keyPoints": [
        "核心动机：Define-by-run接口，支持高效剪枝与超参搜索",
        "演化来源：继承或改进自 mlflow",
        "代表机构：Preferred Networks"
      ],
      "detail": "<p>Define-by-run接口，支持高效剪枝与超参搜索</p>"
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
      "summary": "DVC 的核心目标是：将Git版本控制引入数据集与模型文件管理。",
      "keyPoints": [
        "核心动机：将Git版本控制引入数据集与模型文件管理",
        "演化来源：继承或改进自 mlflow",
        "代表机构：Iterative.ai"
      ],
      "detail": "<p>将Git版本控制引入数据集与模型文件管理</p>"
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
      "summary": "W&B 的核心目标是：云端协作式实验看板，强化团队开发效率。",
      "keyPoints": [
        "核心动机：云端协作式实验看板，强化团队开发效率",
        "演化来源：继承或改进自 mlflow",
        "代表机构：W&amp;B Inc."
      ],
      "detail": "<p>云端协作式实验看板，强化团队开发效率</p>"
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
      "summary": "FlashInfer-Bench 的核心目标是：AI驱动的LLM系统基准测试平台。",
      "keyPoints": [
        "核心动机：AI驱动的LLM系统基准测试平台",
        "演化来源：继承或改进自 mlflow",
        "代表机构：MLSys Community"
      ],
      "detail": "<p>AI驱动的LLM系统基准测试平台</p>"
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
      "summary": "Amazon SageMaker AI 推出 Agent 引导的模型定制工作流，用户通过自然语言描述需求即可由 AI Agent 自动完成数据准备、训练策略选择和无服务器强化学习微调，将大模型定制周期从数周压缩至数天，覆盖 Amazon Nova、Llama、Qwen、DeepSeek 等主流模型。",
      "keyPoints": [
        "<strong>AI Agent 引导工作流</strong>：用户以自然语言描述定制目标，Agent 自动编排数据预处理、超参选择、训练策略推荐的全流程",
        "<strong>无服务器强化学习（Serverless RL）</strong>：无需预置 GPU 集群，按需启动 GRPO/PPO 等 RL 训练任务，按实际使用量计费",
        "<strong>多模型支持</strong>：通过 SageMaker JumpStart 接入 1000+ 预训练模型（Amazon Nova、Llama、Qwen、DeepSeek、GPT-OSS 等）",
        "<strong>多技术路线</strong>：支持监督微调（SFT）、强化学习（RL/GRPO）、LoRA/QLoRA 等参数高效微调方法",
        "<strong>HyperPod 分布式训练</strong>：跨数千 AI 加速器的自动化集群管理，训练时间减少最高 40%，支持无检查点连续训练和弹性伸缩",
        "<strong>推理优化</strong>：覆盖 80+ 实例类型，提供实时、无服务器、异步和批量推理四种部署模式",
        "<strong>MLflow 集成</strong>：全托管 MLflow 实验追踪，无需自建基础设施即可管理模型版本与指标对比",
        "<strong>SageMaker Unified Studio</strong>：统一 IDE 整合数据处理、模型开发、部署监控全链路"
      ],
      "detail": "<pre><code>┌──────────────────────────────────────────────────────────────────┐\n│                    SageMaker AI Agent 工作流                      │\n│                                                                  │\n│  ┌──────────┐    ┌──────────────┐    ┌───────────────────────┐  │\n│  │  用户输入  │───▶│  AI Agent    │───▶│  自动化编排引擎        │  │\n│  │ (自然语言) │    │ (意图理解 +  │    │                       │  │\n│  └──────────┘    │  策略推荐)   │    │  ┌─────────────────┐  │  │\n│                  └──────────────┘    │  │ 1. 数据验证&amp;预处理│  │  │\n│                                      │  │ 2. 模型选择       │  │  │\n│  ┌──────────────────────────────┐   │  │ 3. 训练策略推荐   │  │  │\n│  │     SageMaker JumpStart      │   │  │ 4. 超参配置       │  │  │\n│  │  1000+ 预训练模型            │◀──│  │ 5. 启动训练       │  │  │\n│  │  Nova/Llama/Qwen/DeepSeek   │   │  └─────────────────┘  │  │\n│  └──────────────────────────────┘   └───────────────────────┘  │\n│                  │                              │                │\n│                  ▼                              ▼                │\n│  ┌──────────────────────────────────────────────────────────┐  │\n│  │              训练基础设施层                                │  │\n│  │  ┌────────────────┐  ┌─────────────────────────────────┐│  │\n│  │  │ Serverless RL   │  │  HyperPod 分布式集群             ││  │\n│  │  │ (GRPO/PPO/SFT) │  │  • 自动故障恢复                  ││  │\n│  │  │ • 按需计费      │  │  • 弹性伸缩                      ││  │\n│  │  │ • 零运维        │  │  • 无检查点连续训练               ││  │\n│  │  └────────────────┘  └─────────────────────────────────┘│  │\n│  └──────────────────────────────────────────────────────────┘  │\n│                              │                                  │\n│                              ▼                                  │\n│  ┌──────────────────────────────────────────────────────────┐  │\n│  │              部署 &amp; 监控层                                 │  │\n│  │  推理优化 (80+ 实例) │ MLflow 实验追踪 │ Unified Studio   │  │\n│  └──────────────────────────────────────────────────────────┘  │\n└──────────────────────────────────────────────────────────────────┘\n</code></pre>\n<p><em>图：SageMaker AI Agent 端到端模型定制工作流架构示意</em></p>\n<pre><code class=\"language-python\"># SageMaker AI Agent 引导的模型定制伪代码\nimport sagemaker\nfrom sagemaker.jumpstart import JumpStartModel\nfrom sagemaker.customization import AgentWorkflow\n\n# 1. 用户通过自然语言描述定制需求\nuser_request = &quot;&quot;&quot;\n我需要一个中文客服对话模型，基于 Qwen-72B，\n使用我们的客服日志数据进行微调，\n要求回答准确且语气友好。\n&quot;&quot;&quot;\n\n# 2. AI Agent 解析意图并生成定制方案\nagent = AgentWorkflow(region=&quot;us-west-2&quot;)\nplan = agent.analyze(\n    request=user_request,\n    available_models=JumpStartModel.list(),  # 1000+ 模型\n)\n# plan 包含: base_model, technique, hyperparams, data_config\n\nprint(plan)\n# → {base_model: &quot;Qwen-72B&quot;, technique: &quot;GRPO&quot;,\n#    data_format: &quot;conversation&quot;, epochs: 3,\n#    lora_rank: 16, learning_rate: 2e-5}\n\n# 3. Agent 自动执行数据预处理\nprocessed_data = agent.prepare_data(\n    source_s3=&quot;s3://my-bucket/customer-service-logs/&quot;,\n    target_format=plan.data_format,\n    validation_split=0.1,\n)\n\n# 4. 无服务器强化学习训练（无需预置集群）\ntraining_job = agent.launch_training(\n    plan=plan,\n    training_data=processed_data,\n    serverless=True,           # 无服务器模式\n    technique=&quot;GRPO&quot;,          # Group Relative Policy Optimization\n    reward_model=&quot;auto&quot;,       # Agent 自动选择/构建奖励模型\n)\n\n# 5. 自动评估与部署\neval_results = agent.evaluate(training_job)\nif eval_results.meets_criteria():\n    endpoint = agent.deploy(\n        model=training_job.best_model,\n        instance_type=&quot;ml.g6e.xlarge&quot;,  # Agent 推荐的最优实例\n        optimization=&quot;auto&quot;,            # 自动量化/编译优化\n    )\n</code></pre>\n<p><strong>动机与背景：从手动微调到 Agent 自动化编排</strong></p>\n<p>在大模型时代，企业对模型定制的需求急剧增长，但传统的微调流程面临三大痛点：（1）基础设施复杂——需要手动配置 GPU 集群、管理分布式训练框架、处理节点故障；（2）技术门槛高——选择 SFT 还是 RL、确定 LoRA rank、设置学习率等超参数需要深厚的 ML 经验；（3）周期长——从数据准备到模型上线通常需要数周甚至数月。SageMaker AI Agent 的核心设计理念是将这些专家知识封装进 AI Agent，让用户只需描述业务目标，Agent 即可自动完成从数据到部署的全链路编排。这一思路与 AutoML 的理念一脉相承，但将自动化范围从超参搜索扩展到了包含 RL 训练策略、数据格式转换、奖励模型选择在内的完整工作流。</p>\n<p><strong>核心机制：Agent 引导 + 无服务器 RL 的双轮驱动</strong></p>\n<p>SageMaker AI Agent 的技术架构可分为两个核心层。第一层是 <strong>Agent 引导层</strong>：Agent 接收用户的自然语言描述后，通过意图理解模块解析出目标模型类型、数据特征和性能要求，然后从 JumpStart 的 1000+ 模型库中匹配最合适的基座模型，并根据任务特征推荐最优训练策略（如对话任务推荐 GRPO，分类任务推荐 SFT + LoRA）。Agent 还会自动验证数据格式、检测数据质量问题并提出修复建议。第二层是 <strong>无服务器训练层</strong>：与传统需要预先申请 GPU 实例的方式不同，Serverless RL 采用按需分配计算资源的模式。用户无需关心底层集群管理，系统根据模型规模和数据量自动选择合适的实例类型和数量。特别值得注意的是对 GRPO（Group Relative Policy Optimization）的原生支持——这是 DeepSeek 提出的一种无需独立 Value Model 的 RL 算法，通过组内相对排序计算优势函数，显著降低了 RL 微调的资源开销。训练过程中，Agent 持续监控损失曲线和评估指标，在检测到过拟合或训练不稳定时自动调整学习率或提前终止。</p>\n<p><strong>HyperPod 与推理优化：从训练到部署的全链路加速</strong></p>\n<p>对于需要大规模训练的场景，SageMaker HyperPod 提供了跨数千 AI 加速器的分布式训练能力。其三大创新特性包括：（1）<strong>无检查点连续训练（Checkpointless Training）</strong>——传统分布式训练在节点故障时需要从最近的检查点重启，而 HyperPod 通过内存级状态复制实现故障透明恢复，消除了检查点 I/O 开销和恢复期间的空闲计算成本；（2）<strong>弹性训练（Elastic Training）</strong>——根据计算资源可用性自动扩缩训练作业规模，无需人工重新配置；（3）<strong>自动集群管理</strong>——自动处理节点健康检查、网络拓扑优化和数据并行/模型并行策略选择。在推理侧，SageMaker 提供覆盖 80+ 实例类型的四种部署模式（实时、无服务器、异步、批量），并内置自动量化（INT8/FP8）、模型编译（Neuron Compiler）和推测解码等优化技术，将部署周期从数月缩短至数小时。</p>\n<p><strong>与传统 ML 平台的差异化定位</strong></p>\n<p>与 Weights &amp; Biases（W&amp;B）等实验管理平台相比，SageMaker AI Agent 的差异化在于其 <strong>全托管 + Agent 驱动</strong> 的定位。W&amp;B 侧重于实验追踪和可视化，是一个\"记录工具\"；而 SageMaker AI Agent 是一个\"执行引擎\"，不仅记录实验过程，还主动驱动实验执行。通过集成 MLflow 的实验追踪能力，SageMaker AI 实现了\"Agent 执行 + MLflow 记录\"的协同模式。此外，SageMaker Unified Studio 将数据湖（Lakehouse）、ETL 管道、模型开发、部署监控整合在统一 IDE 中，消除了传统 ML 工作流中工具碎片化的问题。这种从\"工具集合\"到\"智能平台\"的演进，代表了 MLOps 领域从被动记录向主动编排的范式转变。</p>\n<div class=\"key-point\">💡 <strong>关键</strong>：SageMaker AI Agent 的核心价值不在于单一技术突破，而在于将 AutoML、Serverless Computing、RL Training、Agent Orchestration 四大能力整合为统一的自然语言驱动工作流，大幅降低了企业级模型定制的技术门槛和时间成本。</div>",
      "quiz": {
        "q": "SageMaker AI Agent 引导工作流中，无服务器强化学习（Serverless RL）的核心优势是什么？",
        "options": [
          "支持更大的模型参数量训练",
          "无需预置 GPU 集群，按需分配资源并自动管理训练基础设施",
          "仅支持 PPO 算法以确保训练稳定性",
          "要求用户手动指定所有超参数以获得最优结果"
        ],
        "answer": 1,
        "explain": "Serverless RL 的核心优势在于用户无需预先申请和管理 GPU 集群，系统根据任务需求自动分配计算资源并按实际使用量计费，同时 Agent 自动推荐超参数配置，大幅降低了 RL 微调的运维和技术门槛。"
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
      "summary": "TFX 的核心目标是：端到端生产级ML平台，涵盖数据校验到模型评估。",
      "keyPoints": [
        "核心动机：端到端生产级ML平台，涵盖数据校验到模型评估",
        "代表机构：Google"
      ],
      "detail": "<p>端到端生产级ML平台，涵盖数据校验到模型评估</p>"
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
      "summary": "Kubeflow 的核心目标是：基于Kubernetes的云原生ML工作流编排平台。",
      "keyPoints": [
        "核心动机：基于Kubernetes的云原生ML工作流编排平台",
        "演化来源：继承或改进自 tfx",
        "代表机构：Google/Cisco"
      ],
      "detail": "<p>基于Kubernetes的云原生ML工作流编排平台</p>"
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
      "summary": "Feast 的核心目标是：首个开源特征存储，解决训练与推理数据一致性。",
      "keyPoints": [
        "核心动机：首个开源特征存储，解决训练与推理数据一致性",
        "演化来源：继承或改进自 kubeflow",
        "代表机构：Gojek/Google"
      ],
      "detail": "<p>首个开源特征存储，解决训练与推理数据一致性</p>"
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
      "summary": "TF Serving 的核心目标是：高性能模型推理系统，支持模型版本热切换。",
      "keyPoints": [
        "核心动机：高性能模型推理系统，支持模型版本热切换",
        "代表机构：Google"
      ],
      "detail": "<p>高性能模型推理系统，支持模型版本热切换</p>"
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
      "summary": "KServe 的核心目标是：基于Serverless架构的标准化模型推理协议。",
      "keyPoints": [
        "核心动机：基于Serverless架构的标准化模型推理协议",
        "演化来源：继承或改进自 tf_serving",
        "代表机构：KubeFlow Community"
      ],
      "detail": "<p>基于Serverless架构的标准化模型推理协议</p>"
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
      "summary": "vLLM 的核心目标是：提出PagedAttention，极大提升LLM推理吞吐量。",
      "keyPoints": [
        "核心动机：提出PagedAttention，极大提升LLM推理吞吐量",
        "演化来源：继承或改进自 kserve",
        "代表机构：UC Berkeley"
      ],
      "detail": "<p>提出PagedAttention，极大提升LLM推理吞吐量</p>"
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
      "summary": "RaidServe 的核心目标是：高可靠弹性推理平台，冗余计算与快速恢复。",
      "keyPoints": [
        "核心动机：高可靠弹性推理平台，冗余计算与快速恢复",
        "演化来源：继承或改进自 vllm",
        "代表机构：MLSys Community"
      ],
      "detail": "<p>高可靠弹性推理平台，冗余计算与快速恢复</p>"
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
      "summary": "SuperInfer 的核心目标是：针对超级芯片的SLO感知调度系统。",
      "keyPoints": [
        "核心动机：针对超级芯片的SLO感知调度系统",
        "演化来源：继承或改进自 vllm",
        "代表机构：MLSys Community"
      ],
      "detail": "<p>针对超级芯片的SLO感知调度系统</p>"
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
      "summary": "OpenTela 的核心目标是：统一去中心化HPC集群的异构LLM推理系统。",
      "keyPoints": [
        "核心动机：统一去中心化HPC集群的异构LLM推理系统",
        "演化来源：继承或改进自 vllm",
        "代表机构：OSDI Community"
      ],
      "detail": "<p>统一去中心化HPC集群的异构LLM推理系统</p>"
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
      "summary": "Djinn 的核心目标是：语义感知的透明GPU解耦系统。",
      "keyPoints": [
        "核心动机：语义感知的透明GPU解耦系统",
        "演化来源：继承或改进自 kserve",
        "代表机构：OSDI Community"
      ],
      "detail": "<p>语义感知的透明GPU解耦系统</p>"
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
