/**
 * storage-data.js — 由 pipeline/build.py 于 2026-06-15 18:08:25 自动生成。
 * 源文件：content/infra/storage.md
 * ⚠️  请勿手动修改；如需更新，修改源文档后重新编译。
 */
window.PAGE_CONFIG = {
  "meta": {
    "domain": "infra",
    "topic_id": "storage",
    "topic_name": "AI存储系统",
    "page_title": "AI存储系统技术演进",
    "page_subtitle": "2026-06-15版",
    "page_desc": "从GFS奠基到大模型时代的存储优化——涵盖大规模训练数据存储、高速缓存、Checkpoint优化与分布式文件系统的技术演进",
    "page_icon": "💾",
    "hero_pills": [
      "🏷️ AI Storage",
      "Checkpoint",
      "Distributed FS",
      "Data Loading"
    ],
    "count_pill": "{count}个算法",
    "image_base": "",
    "overview_from_doc": true,
    "latest_overview_from_doc": true
  },
  "overview": [
    {
      "title": "",
      "body_html": "<h1>FAST 2002–2026：AI 时代来了，存储系统的问题变了吗？</h1>\n<ul>\n<li>来源平台: <strong>zhihu</strong>（知乎专栏文章）</li>\n<li>原文链接: <a href=\"https://zhuanlan.zhihu.com/p/2027130965617643713\">https://zhuanlan.zhihu.com/p/2027130965617643713</a></li>\n<li>作者: 团子云技术</li>\n</ul>\n<hr />\n<p>FAST 2002–2026：AI 时代来了，存储系统的问题变了吗？</p>\n<h1>FAST 2002–2026：AI 时代来了，存储系统的问题变了吗？</h1>\n<p>作者: 团子云技术, 赞: 75</p>\n<p>基于 FAST 2002–2026 论文集，本文梳理了存储系统研究从文件系统、Flash/SSD 到 KV cache、checkpoint 与 model loading 的迁移轨迹，重点讨论 AI 时代哪些老问题被重新推回了舞台中央。</p>\n<blockquote>\n<p>本文共 14002 字，阅读预计 31 分钟。</p>\n</blockquote>\n<p><strong>Table of Contents</strong></p>\n<ul>\n<li>\n<ol>\n<li>前言</li>\n</ol>\n</li>\n<li>\n<ol>\n<li>我们是怎么分析这 609 篇论文的</li>\n</ol>\n</li>\n<li>\n<ol>\n<li>四个阶段：FAST 的问题意识是怎么迁移的</li>\n</ol>\n</li>\n<li>\n<p>2.1. 2002–2009：基础存储系统问题占主导</p>\n</li>\n<li>2.2. 2010–2016：Flash/SSD 把设计空间重写了一遍</li>\n<li>2.3. 2017–2020：从通用底座转向 workload-aware 与 service-aware</li>\n<li>\n<p>2.4. 2021–2026：AI 没有长成一个孤立新桶，它在重写缓存、恢复与数据路径</p>\n</li>\n<li>\n<ol>\n<li>“主题热度” 之外的洞察</li>\n</ol>\n</li>\n<li>\n<p>3.1. 文件系统并没有退场，它只是不断换了问题</p>\n</li>\n<li>3.2. “存储硬件与 I/O path” 是另一条从未消失的底层主线</li>\n<li>3.3. 比 “AI 形成新桶” 更值得注意，它正在改写多个旧桶</li>\n<li>3.4. 云与对象存储经历了两轮抬头，不是一条线性上升曲线</li>\n<li>\n<p>3.5. 可靠性与安全仍然重要，但从舞台中央退到长期底线</p>\n</li>\n<li>\n<ol>\n<li>2026：FAST 最新一届给了我们什么信号？</li>\n</ol>\n</li>\n<li>\n<p>4.1. 这可能预示着 FAST 接下来</p>\n</li>\n<li>\n<ol>\n<li>放到更大的系统语境里看：FAST 与 OSDI / SOSP / EuroSys</li>\n</ol>\n</li>\n<li>\n<p>5.1. AI 在主系统会场里出现得更早，也更偏向端到端服务系统</p>\n</li>\n<li>5.2. 内存分层、远端内存、CXL、资源池化，是 AI 之外另一条更底层的主线</li>\n<li>5.3. checkpoint /snapshot/recovery 正在从后台机制变成在线控制机制</li>\n<li>5.4. serverless 和云控制面，正在把存储问题继续上推</li>\n<li>\n<p>5.5. 放在一起看，这几个会场的共同变化</p>\n</li>\n<li>\n<ol>\n<li>FAST 这 24 届到底讲了什么故事？</li>\n</ol>\n</li>\n<li>\n<ol>\n<li>小结</li>\n</ol>\n</li>\n<li>\n<p>相关</p>\n</li>\n</ul>\n<h2>0. 前言</h2>\n<p>过去二十多年里，存储系统几乎经历了计算机系统里最完整的一轮 “问题迁移”：从磁盘、RAID、文件系统、缓存，到 Flash、SSD、纠删码、云块存储，再到今天的 PMem、RDMA、CXL、LLM serving、向量检索与超大规模对象存储。整个论文集像一条压缩后的时间轴，社区每一阶段在关心什么，基本都写在了论文题目和摘要里。</p>\n<p>这篇文章不做关键词词云，也不想把各种名词按年份罗列一遍。我们想回答三个问题：</p>\n<ul>\n<li>FAST 的主问题在 24 届会议里如何迁移？</li>\n<li>哪些主题是 “持续主线”，哪些只是阶段性爆发？</li>\n<li>2026 的 FAST 呈现出的新信号，哪些是延续，哪些像拐点？</li>\n</ul>\n<p>为了避免 “先有观点、再找材料”，这篇文章的判断都尽量从论文集本身出发。我们先拉取并整理了本地可用的 <code>FAST 2002–2005</code>、<code>2007–2026</code> 论文集，去掉每年固定的 <code>Proceedings/Editorship</code> 条目，只保留正式论文；再基于标题、摘要和少量人工校对，把论文归到若干稳定的主题簇里，并补一层更细的语义标签，用来标记它主要改动的是哪一层存储机制、面向什么介质、什么场景。最后统一按年度占比而不是绝对篇数做趋势统计。</p>\n<p>TL;DR 的一图流，笔者会保留下面这一张。它把这 <code>24</code> 届论文里最主要的问题迁移压到了一起：文件系统和 I/O path 始终都在，真正变化的是每个阶段把不同问题推到了舞台中央。</p>\n<p><img alt=\"\" src=\"https://pic1.zhimg.com/v2-f42c575f434de1ba1dffaa360d715840_1440w.jpg\" /></p>\n<h2>1. 我们是怎么分析这 609 篇论文的</h2>\n<p>为了让趋势图可读，我们没有直接做关键词词频，先把论文按 “主要在改什么存储问题” 归到若干大类里。当前使用的一级主题包括：</p>\n<ul>\n<li>文件系统与命名空间（<code>File Systems/Namespace</code>）</li>\n<li>存储硬件与 I/O 路径（<code>Storage Hardware/I-O Path</code>）</li>\n<li>缓存、分层、放置与迁移（<code>Caching/Tiering/Placement</code>）</li>\n<li>数据缩减、编码、备份与归档（<code>Data Reduction/Coding/Backup</code>）</li>\n<li>分布式、云与对象存储（<code>Distributed/Cloud/Object Storage</code>）</li>\n<li>可靠性、恢复、一致性与正确性（<code>Reliability/Recovery/Consistency/Correctness</code>）</li>\n<li>安全、隐私与信任（<code>Security/Privacy/Trust</code>）</li>\n<li>测量、诊断、benchmarking 与运维（<code>Measurement/Diagnosis/Operations</code>）</li>\n<li>面向特定负载的存储系统（<code>Workload-Specific Storage</code>）</li>\n<li>经验、回顾与反思（<code>Experience/Retrospective/Reflection</code>）</li>\n</ul>\n<p>除此之外，我们还给每篇论文补了一层更细的语义标签，用来描述它涉及的介质、系统层次和应用场景。这样做是因为 FAST 的很多变化，往往不是某个主题突然没了，更常见的是同一个主题里的问题换了。比如同样是缓存或 I/O path，早期讨论的可能是 RAID、磁盘阵列和块层路径；到了最近几年，讨论对象已经变成了 <code>KV cache</code>、<code>checkpoint</code>、<code>model loading</code>、<code>RDMA</code>、<code>CXL</code>、<code>vector search</code> 和面向 AI 数据路径的分层存储。这样看到的，不只是 “AI 论文变多了”，也能看到 “AI 在改写哪些老问题”。</p>\n<p>从全体 <code>609</code> 篇论文的一级类分布看，最稳定的三大类是：</p>\n<ul>\n<li><code>File Systems/Namespace</code>：<code>118</code> 篇</li>\n<li><code>Storage Hardware/I-O Path</code>：<code>110</code> 篇</li>\n<li><code>Data Reduction/Coding/Backup</code>：<code>73</code> 篇</li>\n</ul>\n<p>紧随其后的，是：</p>\n<ul>\n<li><code>Measurement/Diagnosis/Operations</code>：<code>64</code> 篇</li>\n<li><code>Caching/Tiering/Placement</code>：<code>60</code> 篇</li>\n<li><code>Workload-Specific Storage</code>：<code>59</code> 篇</li>\n</ul>\n<p>这个总体分布标明：<strong>FAST 不只是 “设备会议” 或者 “文件系统会议”。它覆盖抽象层、底层介质、工程实践和新型工作负载。</strong> 最近几年冒出来的 AI 信号，也没有把 “AI 存储” 抬成一个压倒性的独立大类；它们更多是散在缓存、恢复、文件系统和 I/O path 这些老类别里。这样看，比一句 “AI 论文变多了” 更接近 FAST 自己的结构。</p>\n<p><img alt=\"\" src=\"https://pic4.zhimg.com/v2-ddeda3f45c69f648add52e89e55ea32d_1440w.jpg\" /><img alt=\"\" src=\"https://pic4.zhimg.com/v2-eb1e5ab7c71aca068484107d0cda9779_1440w.jpg\" /></p>\n<h2>2. 四个阶段：FAST 的问题意识是怎么迁移的</h2>\n<h3>2.1. 2002–2009：基础存储系统问题占主导</h3>\n<p>在这 <code>151</code> 篇论文里，占比最高的几个主题是：</p>\n<ul>\n<li><code>Storage Hardware/I-O Path</code>：<code>30</code> 篇，占 <code>19.9%</code></li>\n<li><code>File Systems/Namespace</code>：<code>24</code> 篇，占 <code>15.9%</code></li>\n<li><code>Data Reduction/Coding/Backup</code>：<code>18</code> 篇，占 <code>11.9%</code></li>\n<li><code>Measurement/Diagnosis/Operations</code>：<code>17</code> 篇，占 <code>11.3%</code></li>\n<li><code>Distributed/Cloud/Object Storage</code>：<code>16</code> 篇，占 <code>10.6%</code></li>\n</ul>\n<p>这一阶段的 FAST 更像是在处理 “存储基础设施本体” 问题。社区关心的是 RAID、磁盘阵列、SAN fabric、文件系统、缓存、版本管理、benchmarking、安全共享、trace、故障与管理。</p>\n<p>代表性的早期经典包括：</p>\n<ul>\n<li><code>GPFS: A Shared-Disk File System for Large Computing Clusters.</code></li>\n<li><code>Venti: A New Approach to Archival Storage.</code></li>\n<li><code>ARC: A Self-Tuning, Low Overhead Replacement Cache.</code></li>\n<li><code>Plutus: Scalable Secure File Sharing on Untrusted Storage.</code></li>\n<li><code>Failure Trends in a Large Disk Drive Population.</code></li>\n<li><code>Write Off-Loading: Practical Power Management for Enterprise Storage.</code></li>\n</ul>\n<p>今天回头看，这一时期有两个特征。</p>\n<p>第一，<strong>文件系统从未是一个 “已经解决了” 的问题</strong>。无论是 <code>The Direct Access File System</code>，还是后来的目录扩展、metadata、日志、共享磁盘文件系统，FAST 从一开始就没有把文件系统当成成熟基础件。它一直被当成与硬件和应用共同演化的层。</p>\n<p>第二，<strong>测量和运维很早就是 FAST 的显性主题</strong>。像 <code>Hippodrome</code>、<code>Buttress</code>、<code>NFS trace</code>、<code>customer troubleshooting</code> 这一类论文说明，存储研究并不是后来才变得 “工业化” 的；它从一开始就很强调 trace、部署、管理、问题定位，只是早期对象还不是今天意义上的云服务。</p>\n<h3>2.2. 2010–2016：Flash/SSD 把设计空间重写了一遍</h3>\n<p>这是整份语料里最容易被看成一个独立阶段的时期。在这 <code>170</code> 篇论文里，前三类分别是：</p>\n<ul>\n<li><code>File Systems/Namespace</code>：<code>37</code> 篇，占 <code>21.8%</code></li>\n<li><code>Storage Hardware/I-O Path</code>：<code>34</code> 篇，占 <code>20.0%</code></li>\n<li><code>Data Reduction/Coding/Backup</code>：<code>29</code> 篇，占 <code>17.1%</code></li>\n</ul>\n<p>如果只看 secondary tags，<code>flash_ssd</code> 的年度占比在 <code>2016</code> 年达到峰值：<code>11/27</code>，约 <code>41%</code>。这几乎可以直接把 2010–2016 看成 FAST 的 <strong>Flash/SSD redesign era</strong>。</p>\n<p><img alt=\"\" src=\"https://pic3.zhimg.com/v2-24d745e64fab257604b11dccd9a5dd22_1440w.jpg\" /></p>\n<p>这一阶段的重点不在于 “SSD 论文变多了”，而在于 <strong>SSD/Flash 迫使系统研究者重写了一批原本建立在磁盘假设上的设计原则</strong>。这体现在几个层面：</p>\n<ul>\n<li>设备层：写放大、wear、GC、FTL、retention、lifetime management 成为显性问题</li>\n<li>文件系统层：<code>NOVA</code>、<code>F2FS</code> 一类工作开始把介质属性直接写进文件系统设计</li>\n<li>编码与容错层：云文件系统上的 erasure code 恢复代价被重新审视</li>\n<li>运维与实证层：越来越多论文开始研究真实部署中的尾部行为、寿命、工作负载与故障模式</li>\n</ul>\n<p>这一阶段值得单独点名的代表作包括：</p>\n<ul>\n<li><code>The bleak future of NAND flash memory.</code></li>\n<li><code>CAFTL: A Content-Aware Flash Translation Layer Enhancing the Lifespan of Flash Memory based Solid State Drives.</code></li>\n<li><code>Avoiding the Disk Bottleneck in the Data Domain Deduplication File System.</code></li>\n<li><code>Rethinking erasure codes for cloud file systems: minimizing I/O for recovery and degraded reads.</code></li>\n<li><code>NOVA: A Log-structured File System for Hybrid Volatile/Non-volatile Main Memories.</code></li>\n<li><code>F2FS: A New File System for Flash Storage.</code></li>\n<li><code>The Tail at Store: A Revelation from Millions of Hours of Disk and SSD Deployments.</code></li>\n</ul>\n<p>2002–2009 的 FAST 像一本 “基础存储问题百科全书”；到了 2010–2016，讨论明显收束到一个问题上：<strong>介质彻底变化以后，原有软件栈哪些地方必须重写？</strong></p>\n<h3>2.3. 2017–2020：从通用底座转向 workload-aware 与 service-aware</h3>\n<p>这 <code>100</code> 篇论文的主题分布开始出现明显变化：</p>\n<ul>\n<li><code>File Systems/Namespace</code>：<code>22</code> 篇，占 <code>22.0%</code></li>\n<li><code>Workload-Specific Storage</code>：<code>18</code> 篇，占 <code>18.0%</code></li>\n<li><code>Storage Hardware/I-O Path</code>：<code>17</code> 篇，占 <code>17.0%</code></li>\n<li><code>Data Reduction/Coding/Backup</code>：<code>12</code> 篇，占 <code>12.0%</code></li>\n</ul>\n<p>这个阶段最显眼的变化，是 <strong>面向特定负载的存储设计第一次成为 FAST 的前排主题</strong>。<br />\n例如：</p>\n<ul>\n<li><code>BTrDB: Optimizing Storage System Design for Timeseries Processing.</code></li>\n<li><code>Characterizing, Modeling, and Benchmarking RocksDB Key-Value Workloads at Facebook.</code></li>\n<li><code>POLARDB Meets Computational Storage: Efficiently Support Analytical Workloads in Cloud-Native Relational Database.</code></li>\n<li><code>Quiver: An Informed Storage Cache for Deep Learning.</code></li>\n</ul>\n<p>FAST 的重心也开始往前挪了一步。社区不再只问 “一个通用存储结构怎样更快”，而开始更频繁地问：</p>\n<ul>\n<li>面向某类 workload 的最佳数据路径是什么？</li>\n<li>在云原生、分布式、多租户与计算存储环境里，存储应该如何协同上层系统？</li>\n<li>性能之外，热点、隔离、公平性与调优复杂度要怎么处理？</li>\n</ul>\n<p>同样在这段时期，<code>pmem_nvm</code> 在 secondary tags 里第一次明显出现，最早出现在 <code>2015</code>，并在 <code>2021/2022</code> 达到阶段高点。persistent memory 不是 2020 年后才突然进入 FAST，它在 2010 年代后半段就已经开始为新的系统抽象铺路。像 <code>Consistent and Durable Data Structures for Non-Volatile Byte-Addressable Memory.</code> 这类工作也说明，PMem/NVM 进入 FAST 时带进来的不只是硬件信号，还有一致性语义、数据结构和恢复模型。</p>\n<h3>2.4. 2021–2026：AI 没有长成一个孤立新桶，它在重写缓存、恢复与数据路径</h3>\n<p>在最近的 <code>188</code> 篇论文里，主题结构已经和早期 FAST 有了非常明显的差异：</p>\n<ul>\n<li><code>File Systems/Namespace</code>：<code>35</code> 篇，占 <code>18.6%</code></li>\n<li><code>Storage Hardware/I-O Path</code>：<code>29</code> 篇，占 <code>15.4%</code></li>\n<li><code>Workload-Specific Storage</code>：<code>29</code> 篇，占 <code>15.4%</code></li>\n<li><code>Caching/Tiering/Placement</code>：<code>26</code> 篇，占 <code>13.8%</code></li>\n<li><code>Distributed/Cloud/Object Storage</code>：<code>18</code> 篇，占 <code>9.6%</code></li>\n</ul>\n<p>如果只看一级类，这一阶段当然已经比早期 FAST 更 “服务化” 和 “应用化”。但从更细的标签往下看，<strong>AI/LLM 并没有简单地形成一个全新的大桶，它更多是在把 cache/tiering、checkpoint/recovery、page cache、GPU-adjacent file access 和 disaggregated data path 这些老问题重新拉回舞台中央。</strong></p>\n<p>从 AI 相关 secondary tags 上看，这个趋势更清楚：</p>\n<ul>\n<li><code>llm_workload</code> 在 <code>2024</code> 还是 <code>0</code>，到 <code>2025</code> 变成 <code>2/36</code>，<code>2026</code> 进一步升到 <code>5/44</code></li>\n<li>泛化的 <code>kv_cache</code> 语义在更早年份就已经出现过，但如果只看 LLM-oriented 的这组论文，相关信号在 <code>2025</code> 开始明显成形，并在 <code>2026</code> 增长到 <code>2/44</code></li>\n<li><code>checkpoint_snapshot</code> 在 <code>2026</code> 达到 <code>2/44</code></li>\n<li><code>model loading / startup path</code> 在 <code>2025</code> 已经能看到相邻信号，到 <code>2026</code> 才出现更明确、直接的论文对象</li>\n<li><code>data_pipeline_preprocessing</code> 在 <code>2026</code> 首次出现</li>\n<li><code>vector_search</code> 从 <code>2025</code> 开始出现，并在 <code>2026</code> 延续</li>\n</ul>\n<p><img alt=\"\" src=\"https://pic4.zhimg.com/v2-cfe39b1b940fe91f0c5609c32c113ad3_1440w.jpg\" /></p>\n<p>如果把这些标签和具体论文对起来看，最近两年的 AI 线索大致可以拆成几条比较清楚的存储路径。</p>\n<p>先看 <strong>KV cache 这个新 “存储对象”</strong>。<br />\n<code>IMPRESS</code>、<code>Mooncake</code>、<code>Bidaw</code>、<code>CacheSlide</code>、<code>SolidAttention</code> 这些论文讨论得都很具体：prefix KV、historical KV、host memory + SSD 两级存储、disaggregated KVCache、spill-aware KV reuse，以及在 memory-constrained 环境下如何减少 KV loading 代价。LLM 推理也因此把 “缓存” 和 “分层” 重新推回了 FAST 的中心。</p>\n<p>按时间顺序看，这条线内部也已经开始分化。<code>2025</code> 的 <code>IMPRESS</code> 和 <code>Mooncake</code> 更偏向回答 prefix KV /global KVCache 怎么落盘、怎么分层、怎么服务化；到了 <code>2026</code>，<code>Bidaw</code>、<code>CacheSlide</code>、<code>SolidAttention</code> 已经进一步转向 interaction pattern、reuse policy、latency stability 和 memory-constrained deployment 这些更细粒度的问题。</p>\n<p>再看 <strong>model loading 和 serving startup</strong>。<br />\n<code>Accelerating Model Loading in LLM Inference by Programmable Page Cache</code> 这一类工作说明，TTFT、冷启动、模型权重加载、SSD 带宽利用、page cache policy，已经开始成为推理系统里的核心性能对象。过去这类问题常被看成实现细节，现在它们更接近产品级 SLO 的决定因素。这条线在 FAST 里也不是突然冒出来的；像 <code>FAST: Quick Application Launch on Solid-State Drives.</code> 这样的更早工作，已经把 “应用启动 / 数据就绪 / 介质速度” 这条脉络提前写出来了。</p>\n<p>训练侧的变化也很明显。<strong>“存储问题” 已经从数据读写扩展到状态管理。</strong><br />\n<code>AdaCheck</code> 和 <code>GPU Checkpoint/Restore Made Fast and Lightweight</code> 说明 checkpoint 已经不只是一个离线容灾动作，它在大规模训练里会直接影响可用性、恢复时间和资源利用率。与此同时，<code>Seneca</code> 这类工作又把训练数据预处理、cache partitioning、sampling 和 ingestion pipeline 拉成了新的性能瓶颈。</p>\n<p>还有一点也很重要：<strong>AI 没有让传统层次退场，反而让它们重新变得重要。</strong><br />\n最近几年同时还能看到 <code>RDMA</code>、<code>CXL</code>、<code>Zoned UFS</code>、disaggregated NVMe、GPU-aware file systems 这些方向继续增长。说白了，FAST 的主线并不是 “AI 取代了存储”。更贴切的说法是，AI 让存储系统把老问题用新规模、新层次和新对象再做一遍。</p>\n<p>归纳成一句话，<strong>FAST 最近几年的变化，不能只概括成 “开始研究 AI 了”。AI 把缓存、恢复、文件系统和 I/O 路径重新推回了端到端数据通路的问题里。</strong></p>\n<h2>3. “主题热度” 之外的洞察</h2>\n<p>下面这张图换了一个角度：不看每年的占比，而看各主题在不同阶段的大致排名。哪些主题一直在前排，哪些只在某个阶段突然抬头，会比折线图更直观。</p>\n<p><img alt=\"\" src=\"https://pic1.zhimg.com/v2-becb03a19593d72f7906a48cfe411e92_1440w.jpg\" /></p>\n<h3>3.1. 文件系统并没有退场，它只是不断换了问题</h3>\n<p>如果只盯着 buzzword，很容易以为 FAST 后来被 Flash、PMem、CXL、LLM 抢走了舞台。但从分类结果看，<code>File Systems/Namespace</code> 依然是全体语料里最多的一级类：<code>118</code> 篇。</p>\n<p>它还贯穿了所有阶段：</p>\n<ul>\n<li>在 2002–2009，它是基础存储抽象的核心战场</li>\n<li>在 2010–2016，它吸收了 Flash/PMem 带来的新约束</li>\n<li>在 2017–2020，它和分布式、工作负载、云环境的边界不断重画</li>\n<li>在 2021–2026，它依然是占比最高的一级类</li>\n</ul>\n<p>FAST 有一条很深的主线：<strong>文件系统一直在吸收介质变化与服务化需求，并把它们重新表达为抽象层问题。</strong></p>\n<h3>3.2. “存储硬件与 I/O path” 是另一条从未消失的底层主线</h3>\n<p>这类论文总数 <code>110</code> 篇，仅次于文件系统。它在早期主要意味着：</p>\n<ul>\n<li>RAID</li>\n<li>disk arrays</li>\n<li>SAN / Storage over IP</li>\n<li>firmware</li>\n<li>低层 I/O stack</li>\n</ul>\n<p>但到今天，这一类里面更多是：</p>\n<ul>\n<li>NVMe / io_uring</li>\n<li>PMem / hybrid memory</li>\n<li>RDMA / disaggregated access</li>\n<li>CXL</li>\n<li>Zoned UFS</li>\n<li>DPU / SmartSSD / offload path</li>\n</ul>\n<p>可以说，<strong>“底层路径” 始终是 FAST 的核心，只是研究对象已经从磁盘路径迁移到了异构数据通路。</strong></p>\n<h3>3.3. 比 “AI 形成新桶” 更值得注意，它正在改写多个旧桶</h3>\n<p>如果只看 2017–2020，<code>Workload-Specific Storage</code> 的确是一个非常强的新信号：它在这一阶段有 <code>18/100</code> 篇，占 <code>18%</code>，说明 FAST 开始明显地从 “通用底座优化” 转向 “为某类 workload 直接塑形”。</p>\n<p>但如果把最近两年的论文再往下细看，会发现一个更有意思的现象：到了 <code>2025–2026</code>，很多最受关注的 AI 论文没有继续堆进 <code>Workload-Specific Storage</code>，更多分散到了：</p>\n<ul>\n<li><code>Caching/Tiering/Placement</code></li>\n<li><code>Reliability/Recovery/Correctness</code></li>\n<li><code>File Systems/Namespace</code></li>\n<li><code>Storage Hardware/I-O Path</code></li>\n</ul>\n<p>把 <code>2020–2026</code> 的 AI 相关论文单独拎出来，再看它们最后落在哪些一级类里，这件事会更直观。</p>\n<p><img alt=\"\" src=\"https://pica.zhimg.com/v2-46bcfb42f8d6ef4d87d69dde5aa0db94_1440w.jpg\" /></p>\n<p>例如：</p>\n<ul>\n<li><code>IMPRESS</code>、<code>Bidaw</code>、<code>CacheSlide</code>、<code>SolidAttention</code> 更像 cache/tiering 论文</li>\n<li><code>AdaCheck</code> 和 <code>GPU Checkpoint/Restore Made Fast and Lightweight</code> 更像 recovery/checkpointing 论文</li>\n<li><code>Accelerating Model Loading in LLM Inference by Programmable Page Cache</code> 本质上是在把推理启动问题翻译成 page cache 和 I/O 模板问题</li>\n<li>还留在 <code>Workload-Specific Storage</code> 里的，更像 <code>OdinANN</code> 这种 workload data model 本身就决定存储结构的工作</li>\n</ul>\n<p>FAST 最近几年最值得重视的变化，不只是 “AI 论文越来越多”：<strong>AI 正在让缓存、分层、恢复、启动路径、文件系统接口这些经典存储问题长出新的语义。</strong></p>\n<h3>3.4. 云与对象存储经历了两轮抬头，不是一条线性上升曲线</h3>\n<p><code>Distributed/Cloud/Object Storage</code> 并不是一条平滑增长曲线。它在早期就已经存在，例如 wide-area file system、shared-disk cluster、SAN 和 secondary storage。然后在云时代，它再次获得新语义：从一般意义上的分布式存储，转向了对象存储、云块存储、超大规模服务化存储。</p>\n<p>在今天的 FAST 里，云存储已经不是一个 “外部背景” 了，它就是论文自身的主要对象。像：</p>\n<ul>\n<li><code>Pond: The OceanStore Prototype.</code></li>\n<li><code>What's the Story in EBS Glory: Evolutions and Lessons in Building Cloud Block Store.</code></li>\n<li><code>More Than Capacity: Performance-oriented Evolution of Pangu in Alibaba.</code></li>\n<li><code>ACOS: Apple's Geo-Distributed Object Store at Exabyte Scale.</code></li>\n</ul>\n<p>这些论文说明，FAST 讨论的已经不只是 “一个存储系统怎么设计”，也包括 “一个全球级服务怎么演化、权衡和运营”。</p>\n<h3>3.5. 可靠性与安全仍然重要，但从舞台中央退到长期底线</h3>\n<p>在 FAST 早期，安全与信任相关论文的存在感非常强，<code>Plutus</code>、block-level security、secure provenance 等都具有很强代表性。<br />\n但从分类结果看：</p>\n<ul>\n<li><code>Security/Privacy/Trust</code> 总计 <code>18</code> 篇</li>\n<li><code>Reliability/Recovery/Correctness</code> 总计 <code>39</code> 篇</li>\n</ul>\n<p>它们并没有消失，现在更像 FAST 的 “长期底线议题”：不会每年都成为主导浪潮，但每当新的介质、新的接口、新的服务形态出现，它们都会回来提醒社区哪些东西不能靠 “性能提升” 掩盖过去。</p>\n<h2>4. 2026：FAST 最新一届给了我们什么信号？</h2>\n<p>从 <a href=\"https://link.zhihu.com/?target=https%3A//static.zdfmc.net/imgs/2026/fast-trends/figures/2026-theme-snapshot.png\">2026 主题快照</a> 看，2026 年最突出的一级类是：</p>\n<ul>\n<li><code>Caching/Tiering/Placement</code>：<code>9</code> 篇</li>\n<li><code>Storage Hardware/I-O Path</code>：<code>8</code> 篇</li>\n<li><code>Distributed/Cloud/Object Storage</code>：<code>7</code> 篇</li>\n<li><code>Reliability/Recovery/Correctness</code>：<code>6</code> 篇</li>\n<li><code>File Systems/Namespace</code>：<code>4</code> 篇</li>\n<li><code>Measurement/Diagnosis/Operations</code>：<code>3</code> 篇</li>\n<li><code>Data Reduction/Coding/Backup</code>：<code>3</code> 篇</li>\n</ul>\n<p><img alt=\"\" src=\"https://picx.zhimg.com/v2-86ab2a32aee180b4ad9b09b121b3c353_1440w.jpg\" /></p>\n<p>如果只用一句话概括 2026，大概会是：</p>\n<p><strong>FAST 2026 看起来不像一届 “单独的 AI 存储专场”，而更像一届 “AI 正在把缓存、恢复和数据路径问题重新推到舞台中央” 的 FAST。</strong></p>\n<p>这个判断背后有几组非常具体的信号。</p>\n<p>第一，LLM 的热点正在落到很具体的存储对象上。当前 <code>2026</code> 语料里：</p>\n<ul>\n<li><code>llm_workload</code> 有 <code>5/44</code></li>\n<li><code>kv_cache</code> 有 <code>2/44</code></li>\n<li><code>checkpoint_snapshot</code> 有 <code>2/44</code></li>\n<li><code>model_loading</code> 有 <code>1/44</code></li>\n<li><code>data_pipeline_preprocessing</code> 有 <code>1/44</code></li>\n</ul>\n<p>读者今天关心的那些问题，已经能在 FAST 里对应到明确的研究对象，而不只是一个泛化的 “AI” 标签。</p>\n<p>第二，<strong>KV cache 已经成为 2026 值得重看的存储热点之一</strong>。<br />\n<code>Bidaw</code>、<code>CacheSlide</code>、<code>SolidAttention</code> 这几类工作都在讨论 host memory、SSD、spill、prefetch、reuse、latency/throughput tradeoff。过去 FAST 研究的是 ARC、flash cache、tiering；到了 2026，研究对象换成了 prefix KV、historical KV 和 interactive serving 的缓存路径，但问题语言仍然是典型的存储语言。</p>\n<p>第三，<strong>推理加速开始显式地包含 model loading 和 startup path</strong>。<br />\n<code>Accelerating Model Loading in LLM Inference by Programmable Page Cache</code> 很有代表性：它不改模型本身，改的是 page cache policy、I/O template、SSD 带宽利用和兼容性。TTFT、cold start、权重加载延迟，已经从系统边角问题走到了 FAST 可以正面讨论的存储问题上。</p>\n<p>第四，<strong>checkpoint /snapshot 正在从 “后台保险丝” 变成训练主路径的一部分</strong>。<br />\n<code>AdaCheck</code> 和 <code>GPU Checkpoint/Restore Made Fast and Lightweight</code> 都说明，训练时代的 checkpoint 不再只是离线保存一个副本，而是牵动在线恢复时间、冗余利用、资源占用和故障域的核心机制。也正因为如此，<code>Reliability/Recovery/Correctness</code> 在 2026 抬到了 <code>6/44</code>。</p>\n<p>第五，<strong>云服务化存储和硬件路径并没有被 AI 挤掉</strong>。<br />\n<code>ACOS</code> 代表超大规模对象存储仍然是 FAST 的主战场；而 <code>CXL</code>、<code>disaggregated NVMe</code>、<code>Zoned UFS</code>、更激进的 I/O completion /userspace-kernel 协同，又提醒我们：AI 负载真正能跑起来，底下仍然需要一整套硬件与路径工程来托住。</p>\n<h3>4.1. 这可能预示着 FAST 接下来</h3>\n<p>如果把 <code>2025–2026</code> 的信号继续外推，我觉得未来几年最可能继续强化的是下面几条线：</p>\n<ul>\n<li><code>KV cache / model state hierarchy</code> 会越来越像一个正式的存储层次问题，而不只是推理框架内部优化。</li>\n<li><code>checkpoint / snapshot</code> 会越来越在线化、选择性和 workload-aware，不会一直停留在统一的离线批处理动作上。</li>\n<li><code>model loading / startup latency / TTFT</code> 会继续进入存储论文的核心指标体系，因为它们已经直接影响可部署性和弹性扩缩容。</li>\n<li><code>AI</code> 不会让文件系统、对象存储和 I/O path 退场，反而会迫使这些基础层重新回答兼容性、隔离性、成本和多租户公平性的问题。</li>\n</ul>\n<p>这也是 FAST 的一个长期特点：<strong>新问题不会替代旧问题，它会把旧问题重新拉回到新的规模、新的介质和新的负载上。</strong></p>\n<h2>5. 放到更大的系统语境里看：FAST 与 OSDI / SOSP / EuroSys</h2>\n<p>如果只看 FAST，最近几年最强的变化来自 AI、异构硬件和服务化存储。把视野再放大一点，会发现这不是 FAST 单独发生的事。近几年的 OSDI、SOSP、EuroSys 也在朝相近的方向移动，只是切入问题的角度不一样。</p>\n<p>这里不做跨会场的全量主题统计。我们把近几年的官方论文列表和 technical sessions 当作参照，做一个简要对比。对照范围包括 <code>OSDI 2024–2025</code>、<code>SOSP 2023/2025</code>、<code>EuroSys 2024–2026</code>。</p>\n<h3>5.1. AI 在主系统会场里出现得更早，也更偏向端到端服务系统</h3>\n<p>如果从主系统会场回看这波 AI 浪潮，一个比较清楚的起点是 <code>SOSP 2023</code> 的 <code>PagedAttention / vLLM</code>。那篇论文已经把 <code>KV cache</code> 写成了一个带分页语义的系统问题。到了 <code>OSDI 2024</code>，讨论又往上走了一层，像 <code>Llumnix</code>、<code>DistServe</code>、<code>Parrot</code>、<code>ServerlessLLM</code>，关注点已经不止是某一层缓存怎么放，还包括 prefill /decode 拆分、request migration、应用级数据流和启动时调度。</p>\n<p>到了 <code>2025</code> 和 <code>2026</code>，这股信号就更直接了。<code>OSDI 2025</code> 的 <code>NanoFlow</code>，<code>SOSP 2025</code> 的 <code>Pie</code>、<code>DiffKV</code>、<code>Aegaeon</code>，以及 <code>EuroSys 2025–2026</code> 的 <code>HCache</code> 等工作，关心的已经是 speculative decoding、KV compaction、adaptive caching、cluster scheduling、memory overloading、multi-SLO serving 这些更接近在线服务的问题。</p>\n<p>这和 FAST 形成了互补。<strong>FAST 把 AI 写成了存储对象和数据路径问题，主系统会场则把它写成了运行时、调度器和集群控制面问题。</strong> 前者更关心 <code>KV cache</code>、checkpoint、model loading 到底落在哪层存储机制里，后者更关心怎样把这些状态对象放进一个能跑在生产环境里的服务系统。</p>\n<h3>5.2. 内存分层、远端内存、CXL、资源池化，是 AI 之外另一条更底层的主线</h3>\n<p>如果把 AI 论文暂时放在一边，近几年的主系统会场还有另一条很稳定的线索：memory hierarchy 正在被重新画一遍。<code>SOSP 2023</code> 的 <code>MEMTIS</code>、<code>CXL-SHM</code>、<code>Ditto</code>，<code>OSDI 2024</code> 的 <code>Atlas</code>，<code>OSDI 2025</code> 的 <code>FineMem</code>、<code>Tigon</code>、<code>EMT</code>，再到 <code>SOSP 2025</code> 的 <code>Demeter</code>、<code>Spirit</code>，都围绕着 tiered memory、far memory、disaggregated memory 和资源池化展开。</p>\n<p>主系统社区显然没有把 “内存分层” 看成一个已经定型的老题目。随着 <code>CXL</code>、far memory、disaggregated memory、device pooling 这些硬件和部署形态逐渐变成现实，<strong>内存、远端内存、存储之间的边界正在重新被系统软件定义。</strong></p>\n<p>这也解释了为什么 FAST 最近几年的 <code>KV cache spill</code>、model loading、checkpoint tiering 会突然显得这么关键。它们并不是凭空冒出来的 “AI 存储小题目”，正好落在了整个系统领域都在重画的那条边界线上。</p>\n<h3>5.3. checkpoint /snapshot/recovery 正在从后台机制变成在线控制机制</h3>\n<p>如果只看 FAST，我们已经看到 checkpoint /snapshot 开始从训练容灾动作走向在线主路径。放到更大的系统语境里，这股变化还要再往前一步。<code>OSDI 2024</code> 的 <code>Sabre</code> 和 <code>Beaver</code>，<code>EuroSys 2024</code> 的 <code>Pronghorn</code>、<code>SplitFT</code>、<code>Puddles</code>，以及 <code>SOSP 2025</code> 的 <code>PhoenixOS</code>，都说明 snapshot、恢复和持久状态管理正在直接进入启动、迁移、热启动和训练连续性这些在线路径。</p>\n<p>把这些和 FAST 里的 <code>AdaCheck</code>、<code>GPU Checkpoint/Restore Made Fast and Lightweight</code> 放在一起看，可以看得更清楚：<strong>checkpoint 不再只是 “故障后留个备份” 的后台机制，它正在启动、迁移、恢复、训练连续性和服务弹性之间来回流动，变成在线控制机制。</strong></p>\n<p>FAST 更擅长看到它在状态落盘、恢复路径和存储层次里的变化；OSDI、SOSP、EuroSys 更擅长看到它在服务连续性和系统编排里的变化。两边拼起来，才更接近这类问题今天的真实形态。</p>\n<h3>5.4. serverless 和云控制面，正在把存储问题继续上推</h3>\n<p>另一个值得注意的现象是，serverless 和云控制面正在变成 AI 与存储之间的重要连接层。<code>OSDI 2024</code> 的 <code>ServerlessLLM</code> 已经把低延迟 LLM inference 写成了 local checkpoint storage、multi-tier loading 和 startup-time scheduling 的联动问题，<code>OSDI 2025</code> 的 <code>AFaaS</code> 继续讨论 cold start 的端到端延迟来源。<code>EuroSys 2025–2026</code> 里也能看到 serverless cold start、resource pools 和 object storage replication 相关工作继续往前走。</p>\n<p>这条线和 FAST 的关联非常直接。<strong>FAST 里最近变热的 model loading /startup path，并不只是在讲 “权重怎么读更快”，它正在和云侧的弹性部署、serverless 启动、资源回收、多区域路由拼到一起。</strong> 在 FAST 里，model loading 还是一个数据路径问题；到了主系统会场，它已经越来越像控制面和服务编排问题的一部分。</p>\n<h3>5.5. 放在一起看，这几个会场的共同变化</h3>\n<p>把 FAST 和 OSDI / SOSP / EuroSys 放在一起看，最近几年的系统趋势不只是 “AI 论文变多了”。</p>\n<ul>\n<li><code>model state hierarchy</code> 正在成形。<code>KV cache</code>、checkpoint、model loading、retrieval cache、parameter/offloading state 正在变成明确的系统对象。</li>\n<li><code>memory / storage / network</code> 的边界正在变薄。<code>CXL</code>、far memory、disaggregation、GPU pooling、device pooling 让 “数据放在哪一层” 重新成为主问题。</li>\n<li>在线服务系统正在吞掉越来越多过去被看成后台机制的东西。恢复、启动、迁移、资源回收、SLO 管理，都开始直接决定 AI 系统的可用性和成本。</li>\n</ul>\n<p>从这个角度看，FAST 并没有偏离系统主会场的大趋势；它只是站在更靠近状态对象和数据路径的位置，把这些变化翻译成了存储系统语言。OSDI、SOSP、EuroSys 则站在更靠近 runtime、cluster 和 cloud control plane 的位置，把同一波变化翻译成了服务系统语言。两边放在一起看，会比单看任一会场更完整。</p>\n<h2>6. FAST 这 24 届到底讲了什么故事？</h2>\n<p>如果把这 24 届 FAST 压缩成一句总判断，我更倾向于：</p>\n<p><strong>FAST 的主线，不能只概括成 “存储越来越快”。更准确地说，存储研究的主语正在从设备与抽象层，逐步走向服务、数据路径和 workload-aware 的系统协同。</strong></p>\n<p>这条主线具体体现为：</p>\n<ul>\n<li>早期，FAST 更关注存储基础设施本体：磁盘、RAID、文件系统、缓存、管理、benchmarks</li>\n<li>中期，Flash/SSD 迫使社区重写一批设计原则</li>\n<li>再往后，云服务、分布式系统和 KV/analytics 让存储从 “机制优化” 转向 “部署与工作负载适配”</li>\n<li>最近几年，AI 负载、异构硬件与超大规模服务化存储，又把 cache、checkpoint、model loading、disaggregated path 这些老问题重新推回中心</li>\n</ul>\n<p><strong>文件系统和低层 I/O path 从未离开主舞台</strong>。新问题一层层叠上去，但社区没有真正放弃基础层。AI 在 FAST 里最重要的作用，也不是发明一门全新学科。它更像是在逼着社区重新回答 “缓存该怎么分层、checkpoint 该怎么做、page cache 该怎么配、数据路径该怎么铺” 这些老问题。</p>\n<h2>7. 小结</h2>\n<p>AI 时代确实带来了新对象，但 FAST 擅长的，仍然是把这些新对象翻译成存储系统熟悉的语言：布局、缓存、索引、隔离、一致性、恢复、成本与路径。<code>KV cache</code>、checkpoint、model loading、训练数据预处理，进入 FAST，它们会被表达成存储系统几十年来反复处理的问题形式。</p>\n<hr />\n<p><strong>欢迎关注！</strong>系列文章也同步整理为开源书籍，也欢迎前往 Github关注+star。</p>\n<p>大模型时代，代码的生成正在变得廉价，但系统级的洞见却愈发昂贵。当 AI 把我们从行级代码的泥沼中解放出来，是时候向深水区迈进了——在我的开源书籍《分布式存储漫游指南》中，我们将目光投向那些随时间沉淀的存储思想与技术脉络。</p>\n<p><img alt=\"\" src=\"https://pic3.zhimg.com/v2-74f675751aedbf1dc09d458ad9a6a01c_1440w.jpg\" /></p>\n<p>书籍封面</p>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//github.com/sptuan/dist-storage-memo\">分布式存储漫游指南 - GitHub Repo</a></p>"
    }
  ],
  "latest_overview": [
    {
      "title": "",
      "body_html": "<h1>《ASP-DAC 2026-Storage system and memory architecture专题》</h1>\n<ul>\n<li>来源平台: <strong>zhihu</strong>（知乎专栏文章）</li>\n<li>原文链接: <a href=\"https://zhuanlan.zhihu.com/p/2017203966207866784\">https://zhuanlan.zhihu.com/p/2017203966207866784</a></li>\n<li>作者: 存算一体开发者</li>\n</ul>\n<hr />\n<p>《ASP-DAC 2026-Storage system and memory architecture专题》</p>\n<h1>《ASP-DAC 2026-Storage system and memory architecture专题》</h1>\n<p>作者: 存算一体开发者, 赞: 4</p>\n<p>在人工智能与大数据处理需求激增的背景下，传统的冯·诺依曼架构面临严峻的“存储墙”与“能效墙”挑战。本届ASP-DAC 2026大会中“存储系统与存储架构”专题集中探讨了如何通过存内计算（CIM）、存内处理（PIM）以及异构存储设计来突破瓶颈。以下是四篇具有代表性的论文概括：</p>\n<p><strong>一、《DeepPiC: xPU-PIM Cluster Architecture with</strong> <strong>Adaptive Resource-Aware Task Orchestration for</strong> <strong>DeepSeek-Style MoE Inference》[1]</strong></p>\n<p>第一篇是来自复旦大学与中兴通讯团队《DeepPiC: xPU-PIM Cluster Architecture with Adaptive Resource-Aware Task Orchestration for DeepSeek-Style MoE Inference》。针对DeepSeek这类大参数量混合专家模型（MoE）在推理时面临的带宽受限问题，作者提出了DeepPiC集群架构。由于DeepSeek模型在解码阶段存在严重的带宽瓶颈，传统的xPU（如GPU/TPU）扩展效率低下。</p>\n<p><img alt=\"\" src=\"https://pic3.zhimg.com/v2-c72025e202c61f7861b56735273c1f46_1440w.jpg\" /></p>\n<p>图1 DeepPiC架构概览：(a)集群级系统设计。(b)一个8设备节点的示例。(c)设备级架构：异构xPU+HBM-PIM设备。(d) HBM-PIM模块的内部结构。</p>\n<p>如图所示，DeepPiC在设备层引入了xPU+HBM-PIM的异构设计，通过将计算逻辑嵌入HBM受限的DRAM模组中，显著提升了低算术强度操作的执行效率。该方案无需修改集群互连拓扑即可替换现有设备。为了释放硬件潜力，作者同步提出了自适应资源感知任务编排（ARTO）策略，将全局模型分区与局部任务分配解耦，动态协调跨设备并行性与设备内xPU/PIM的任务映射。实验表明，DeepPiC在小批量推理下相比H200集群可实现1.3倍的加速。</p>\n<p><strong>二、《BLADE: Boosting LLM Decoding’s</strong> <strong>Communication Efffciency in DRAM-based PIM》[2]</strong></p>\n<p>第二篇是来自上海交通大学、清华大学与复旦大学团队的《BLADE: Boosting LLM Decoding’s Communication Efficiency in DRAM-based PIM》。该研究聚焦于大语言模型（LLM）解码阶段的内存受限挑战。虽然PIM利用内部带宽优势适合加速解码，但受限于有限的外部带宽，存在显著的库间通信延迟以及KV Cache转置带来的额外开销。</p>\n<p><img alt=\"\" src=\"https://pic3.zhimg.com/v2-c0b9768e5dcf00cda99633f990fdcdd8_1440w.jpg\" /></p>\n<p>图2 BLADE总体架构与存内计算单元设计</p>\n<p>如图所示，BLADE架构引入了针对多头注意力（MHA）层的任务划分方案与动态PIM并行度缩放策略，能够根据解码过程中不断增加的序列长度优化计算与通信的平衡。核心创新在于“转置传输（Transpose-on-transfer）”方法，作者巧妙地利用了CPU与PIM单元在DRAM访问粒度上的差异，在数据传输过程中自动完成矩阵转置，消除了显式的转置操作成本。实验显示，BLADE相比GPU基准实现了105.7倍的加速，能效提升达41.6倍。</p>\n<p><strong>三、《CADC: Crossbar-Aware Dendritic Convolution for</strong> <strong>Efﬁcient In-memory Computing》[3]</strong></p>\n<p>第三篇是来自香港城市大学团队的《CADC: Crossbar-Aware Dendritic Convolution for Efficient In-memory Computing》。在CIM加速卷积神经网络（CNN）时，大型卷积层必须分割到多个交叉棒（Crossbar）上，产生的大量部分和（psums）导致了沉重的处理、传输与累加负担。作者受神经科学中树突计算原理的启发，提出了交叉棒感知树突卷积（CADC）。</p>\n<p><img alt=\"\" src=\"https://pic2.zhimg.com/v2-9cd3fe608035b957a529b84d3fc39625_1440w.jpg\" /></p>\n<p>图3 CADC与传统卷积（vConv）在硬件实现上的对比</p>\n<p>如图所示，CADC的核心思路是在交叉棒计算中直接嵌入非线性树突函数（如ReLU），将负的部分和直接归零。这种处理显著提升了部分和的稀疏度，使得硬件能够通过零压缩与零跳过（zero-skipping）技术大幅降低缓存读取和累加功耗。实验证明，CADC在ResNet-18等网络中消除了超过50%的部分和，在基本不损失精度的情况下，将SRAM存内计算宏的能效提升至40.8 TOPS/W，相比现有加速器实现11至18倍的加速。</p>\n<p><strong>四、《OAH-CIM: Outlier-Aware Hybrid RRAM-SRAM CIM Accelerator with Variation-Robust Sparsity 》[4]</strong></p>\n<p>第四篇是来自华中科技大学与香港科技大学团队的《OAH-CIM: Outlier-Aware Hybrid RRAM-SRAM CIM Accelerator with Variation-Robust Sparsity》。Transformer模型中激活值的异常值（Outliers）是阻碍存内计算效率提升的关键，它们会导致传统分块浮点（BFP）量化精度大幅下降，且稀疏化处理会导致RRAM器件由于电流波动产生噪声。</p>\n<p><img alt=\"\" src=\"https://pic4.zhimg.com/v2-ad99910d0f6b7ca2580ac651f0afd4f1_1440w.jpg\" /></p>\n<p>图4 OAH-CIM加速器架构图，包含共享DEA单元与混合计算引擎</p>\n<p>如图所示，OAH-CIM采用RRAM（处理静态权重）与SRAM（处理动态注意力）的混合架构。作者提出了异常值感知BFP量化（OABFP），通过双指数对齐（DEA）技术在保持硬件高效性的同时精确捕捉异常值，使5位量化精度接近FP32水平。同时，针对RRAM的非理想特性，设计了平衡位稀疏（BBS）调度方案，通过平衡计算循环中的激活负载，降低了模拟计算对器件波动的敏感性。在DeiT模型评估中，该设计达到了8.6 TOPS/W的能效，较尖端存内计算设备提升了2.3至39.1倍。</p>\n<p>综上所述，ASP-DAC 2026“存储系统与存储架构”专题的研究成果预示着大模型时代的存储范式正经历从“数据容器”向“计算核心”的深刻转变。从支持万亿级参数模型的高效集群调度，到针对解码瓶颈的精细化存内处理，再到通过生物启发与异常值感知构建的CIM架构，软硬件协同设计（Co-design）已成为突破“存储墙”与“能效墙”的核心利器。展望未来，随着CIM技术从单点突破走向系统级异构融合，存储架构将不再仅仅是性能的瓶颈，而是释放人工智能潜能、实现绿色高能效计算的动力源泉。这一趋势不仅将加速LLM模型在边缘侧与云端的普及，更将为构建更具鲁棒性、可扩展性的下一代通用人工智能基础设施奠定坚实的硬件基础。</p>\n<p><a href=\"https://www.zhihu.com/topic/2019773028871971690\">存算一体开发者社区</a></p>\n<p>参考文章</p>\n<p>[1] Zixu Li, Manni Li, Zijian Huang, et al, \"DeepPiC: xPU-PIM Cluster Architecture with Adaptive Resource-Aware Task Orchestration for DeepSeek-Style MoE Inference,\" ASP-DAC 2026.</p>\n<p>[2] Yilong Zhao, Fangxin Liu, Zongwu Wang, et al, \"BLADE: Boosting LLM Decoding’s Communication Efffciency in DRAM-based PIM,\" ASP-DAC 2026.</p>\n<p>[3] Shuai Dong, Junyi Yang, Ye Ke, et al, \"CADC: Crossbar-Aware Dendritic Convolution for Efﬁcient In-memory Computing,\" ASP-DAC 2026.</p>\n<p>[4] Zhiwei Zhou, Tong Hu, Han Bao, et al, \"OAH-CIM: Outlier-Aware Hybrid RRAM-SRAM CIM Accelerator with Variation-Robust Sparsity,\" ASP-DAC 2026.</p>"
    }
  ],
  "graph": {
    "nodes": [
      {
        "id": "gfs",
        "x": 0,
        "y": 10,
        "category": "foundation"
      },
      {
        "id": "hdfs",
        "x": 13,
        "y": 10,
        "category": "foundation"
      },
      {
        "id": "colossus",
        "x": 30,
        "y": 15,
        "category": "foundation"
      },
      {
        "id": "tectonic",
        "x": 78,
        "y": 10,
        "category": "foundation"
      },
      {
        "id": "lustre",
        "x": 0,
        "y": 30,
        "category": "distributed_fs"
      },
      {
        "id": "ceph",
        "x": 13,
        "y": 35,
        "category": "distributed_fs"
      },
      {
        "id": "glusterfs",
        "x": 13,
        "y": 25,
        "category": "distributed_fs"
      },
      {
        "id": "beegfs",
        "x": 48,
        "y": 30,
        "category": "distributed_fs"
      },
      {
        "id": "juicefs",
        "x": 78,
        "y": 35,
        "category": "distributed_fs"
      },
      {
        "id": "falconfs",
        "x": 96,
        "y": 30,
        "category": "distributed_fs"
      },
      {
        "id": "minio",
        "x": 48,
        "y": 50,
        "category": "object_storage"
      },
      {
        "id": "alluxio",
        "x": 48,
        "y": 55,
        "category": "object_storage"
      },
      {
        "id": "gds",
        "x": 74,
        "y": 50,
        "category": "object_storage"
      },
      {
        "id": "deepfreeze",
        "x": 74,
        "y": 75,
        "category": "checkpoint"
      },
      {
        "id": "checkfreq",
        "x": 78,
        "y": 70,
        "category": "checkpoint"
      },
      {
        "id": "checknrun",
        "x": 87,
        "y": 75,
        "category": "checkpoint"
      },
      {
        "id": "bytecheckpoint",
        "x": 96,
        "y": 70,
        "category": "checkpoint"
      },
      {
        "id": "universal_ckpt",
        "x": 96,
        "y": 65,
        "category": "checkpoint"
      },
      {
        "id": "dali",
        "x": 65,
        "y": 90,
        "category": "cache"
      },
      {
        "id": "aistore",
        "x": 70,
        "y": 85,
        "category": "cache"
      },
      {
        "id": "quiver",
        "x": 74,
        "y": 90,
        "category": "cache"
      },
      {
        "id": "baleen",
        "x": 91,
        "y": 90,
        "category": "cache"
      },
      {
        "id": "cedar",
        "x": 91,
        "y": 85,
        "category": "cache"
      },
      {
        "id": "modyn",
        "x": 96,
        "y": 85,
        "category": "cache"
      },
      {
        "id": "nvmeof",
        "x": 57,
        "y": 95,
        "category": "emerging"
      },
      {
        "id": "learned_index",
        "x": 65,
        "y": 95,
        "category": "emerging"
      },
      {
        "id": "cxl",
        "x": 70,
        "y": 95,
        "category": "emerging"
      },
      {
        "id": "arcneural",
        "x": 96,
        "y": 95,
        "category": "emerging"
      }
    ],
    "edges": [
      {
        "from": "gfs",
        "to": "hdfs",
        "label": "开源实现"
      },
      {
        "from": "gfs",
        "to": "colossus",
        "label": "去中心化"
      },
      {
        "from": "hdfs",
        "to": "tectonic",
        "label": "统一栈"
      },
      {
        "from": "lustre",
        "to": "beegfs",
        "label": "临时FS"
      },
      {
        "from": "lustre",
        "to": "falconfs",
        "label": "DL优化"
      },
      {
        "from": "hdfs",
        "to": "juicefs",
        "label": "云原生"
      },
      {
        "from": "hdfs",
        "to": "minio",
        "label": "S3兼容"
      },
      {
        "from": "hdfs",
        "to": "alluxio",
        "label": "数据编排"
      },
      {
        "from": "minio",
        "to": "gds",
        "label": "GPU直连"
      },
      {
        "from": "checkfreq",
        "to": "checknrun",
        "label": "差异化"
      },
      {
        "from": "checkfreq",
        "to": "bytecheckpoint",
        "label": "大模型"
      },
      {
        "from": "bytecheckpoint",
        "to": "universal_ckpt",
        "label": "原子化"
      },
      {
        "from": "quiver",
        "to": "baleen",
        "label": "ML驱动"
      },
      {
        "from": "dali",
        "to": "cedar",
        "label": "统一管道"
      },
      {
        "from": "cedar",
        "to": "modyn",
        "label": "动态数据"
      },
      {
        "from": "gfs",
        "to": "lustre",
        "label": "HPC并行"
      },
      {
        "from": "hdfs",
        "to": "checkfreq",
        "label": "检查点"
      },
      {
        "from": "alluxio",
        "to": "quiver",
        "label": "AI缓存"
      },
      {
        "from": "gds",
        "to": "dali",
        "label": "GPU加速"
      },
      {
        "from": "beegfs",
        "to": "gds",
        "label": "GPUDirect"
      },
      {
        "from": "tectonic",
        "to": "bytecheckpoint",
        "label": "大规模"
      },
      {
        "from": "juicefs",
        "to": "arcneural",
        "label": "多模态"
      },
      {
        "from": "learned_index",
        "to": "arcneural",
        "label": "ML索引"
      },
      {
        "from": "nvmeof",
        "to": "cxl",
        "label": "内存扩展"
      }
    ],
    "milestones": [
      "gfs",
      "quiver",
      "bytecheckpoint"
    ]
  },
  "algos": [
    {
      "id": "gfs",
      "num": 1,
      "name": "GFS",
      "fullName": "谷歌文件系统 (Google File System)",
      "year": "2003",
      "org": "Google",
      "parent": "—",
      "paperUrl": "https://research.google/pubs/pub51/",
      "projectUrl": "",
      "category": "foundation",
      "motivation": "大规模廉价硬件上的可靠存储",
      "summary": "GFS 的核心目标是：大规模廉价硬件上的可靠存储。",
      "keyPoints": [
        "核心动机：大规模廉价硬件上的可靠存储",
        "代表机构：Google"
      ],
      "detail": "<p><strong>核心示意图说明</strong>：官方 PDF 的 Figure 1 展示了 Application/GFS client、GFS master 与多个 GFS chunkserver 的控制流和数据流。该图没有稳定的独立图片直链，官方论文入口为 https://research.google/pubs/pub51/，下面用文本重构其核心结构。</p>\n<pre><code class=\"language-text\">Application -&gt; GFS client --metadata--&gt; GFS master\n                         &lt;--handle, replicas--\nGFS client  --chunk data read/write--&gt; Chunkserver replicas\nMaster      --heartbeat, lease, GC--&gt;  Chunkservers\n</code></pre>\n<p>```python</p>"
    },
    {
      "id": "hdfs",
      "num": 2,
      "name": "HDFS",
      "fullName": "Hadoop分布式文件系统 (Hadoop Distributed File System)",
      "year": "2006",
      "org": "Apache",
      "parent": "gfs",
      "paperUrl": "https://hadoop.apache.org/docs/stable/hadoop-project-dist/hadoop-hdfs/HdfsDesign.html",
      "projectUrl": "",
      "category": "foundation",
      "motivation": "GFS开源实现,批处理优化",
      "summary": "HDFS 的核心目标是：GFS开源实现,批处理优化。",
      "keyPoints": [
        "核心动机：GFS开源实现,批处理优化",
        "演化来源：继承或改进自 gfs",
        "代表机构：Apache"
      ],
      "detail": "<p>GFS开源实现,批处理优化</p>"
    },
    {
      "id": "colossus",
      "num": 3,
      "name": "Colossus",
      "fullName": "谷歌下一代文件系统 (Google Colossus)",
      "year": "2010",
      "org": "Google",
      "parent": "gfs",
      "paperUrl": "https://cloud.google.com/blog/products/storage-data-transfer/a-peek-behind-colossus-googles-file-system",
      "projectUrl": "",
      "category": "foundation",
      "motivation": "去中心化元数据,10EB+规模",
      "summary": "Colossus 的核心目标是：去中心化元数据,10EB+规模。",
      "keyPoints": [
        "核心动机：去中心化元数据,10EB+规模",
        "演化来源：继承或改进自 gfs",
        "代表机构：Google"
      ],
      "detail": "<p>去中心化元数据,10EB+规模</p>"
    },
    {
      "id": "tectonic",
      "num": 4,
      "name": "Tectonic",
      "fullName": "Meta统一文件系统 (Meta Tectonic)",
      "year": "2021",
      "org": "Meta",
      "parent": "hdfs",
      "paperUrl": "https://www.usenix.org/conference/fast21/presentation/pan",
      "projectUrl": "",
      "category": "foundation",
      "motivation": "分层哈希分片,统一存储栈",
      "summary": "Tectonic 的核心目标是：分层哈希分片,统一存储栈。",
      "keyPoints": [
        "核心动机：分层哈希分片,统一存储栈",
        "演化来源：继承或改进自 hdfs",
        "代表机构：Meta"
      ],
      "detail": "<p><strong>核心示意图说明</strong>：论文 Figure 2 展示 Tectonic 架构：Client Library 调用 Metadata Store 和 Chunk Store，Metadata Store 之下是 KV store 与 Name/File/Block 层，后台服务多为无状态组件。USENIX PDF 地址为 https://www.usenix.org/system/files/fast21-pan.pdf。</p>\n<pre><code class=\"language-text\">Client Library\n  |-- metadata RPC --&gt; Metadata Store -&gt; KV Store\n  |                    |-- Name layer\n  |                    |-- File layer\n  |                    `-- Block layer\n  |-- data RPC ------&gt; Chunk Store -&gt; storage nodes\n  `-- policies ------&gt; replication / RS encoding / traffic groups\nBackground services: repair, GC, rebalance, health, stat\n</code></pre>\n<p>```python</p>"
    },
    {
      "id": "lustre",
      "num": 5,
      "name": "Lustre",
      "fullName": "Lustre并行文件系统 (Lustre Parallel File System)",
      "year": "2003",
      "org": "社区",
      "parent": "—",
      "paperUrl": "https://dl.acm.org/doi/abs/10.1145/3736583",
      "projectUrl": "",
      "category": "distributed_fs",
      "motivation": "HPC场景高并发I/O首选",
      "summary": "Lustre 的核心目标是：HPC场景高并发I/O首选。",
      "keyPoints": [
        "核心动机：HPC场景高并发I/O首选",
        "代表机构：社区"
      ],
      "detail": "<p><strong>核心示意图说明</strong>：Lustre 官方 Wiki 将系统拆为 Client、MDS/MDT、OSS/OST 和 MGS 四类组件，并强调文件系统可随 OSS/OST building block 线性扩展。ACM 任务链接为综述/论文页，稳定方法说明可参考 https://wiki.lustre.org/Introduction_to_Lustre。</p>\n<pre><code class=\"language-text\">Application\n  -&gt; Lustre Client\n     |-- namespace RPC --&gt; MDS -&gt; MDT\n     `-- parallel I/O --&gt; OSS0 -&gt; OST0\n                       --&gt; OSS1 -&gt; OST1\n                       --&gt; OSSN -&gt; OSTN\nMGS: cluster configuration registry\n</code></pre>\n<p>```python</p>"
    },
    {
      "id": "ceph",
      "num": 6,
      "name": "Ceph",
      "fullName": "Ceph统一存储系统 (Ceph Unified Storage)",
      "year": "2006",
      "org": "UCSC",
      "parent": "—",
      "paperUrl": "https://ceph.io/en/news/blog/2006/ceph-a-scalable-high-performance-distributed-file-system/",
      "projectUrl": "",
      "category": "distributed_fs",
      "motivation": "统一块/文件/对象存储",
      "summary": "Ceph 的核心目标是：统一块/文件/对象存储。",
      "keyPoints": [
        "核心动机：统一块/文件/对象存储",
        "代表机构：UCSC"
      ],
      "detail": "<p><strong>核心示意图说明</strong>：OSDI 2006 论文 Figure 1 展示客户端、Metadata Cluster 和 Object Storage Cluster：客户端元数据请求访问 MDS，文件 I/O 直接访问 OSD。官方论文 PDF 可访问 https://ceph.io/assets/pdfs/weil-ceph-osdi06.pdf。</p>\n<pre><code class=\"language-text\">Ceph client\n  |-- metadata ops --&gt; MDS cluster (CephFS only)\n  |-- object I/O ----&gt; OSD cluster (RADOS)\n  |-- cluster map &lt;--- Monitors\nCRUSH(object, pool, map) -&gt; placement group -&gt; acting OSD set\n</code></pre>\n<p>```python</p>"
    },
    {
      "id": "glusterfs",
      "num": 7,
      "name": "GlusterFS",
      "fullName": "GlusterFS分布式文件系统 (GlusterFS)",
      "year": "2006",
      "org": "Red Hat",
      "parent": "—",
      "paperUrl": "https://www.gluster.org/",
      "projectUrl": "",
      "category": "distributed_fs",
      "motivation": "无元数据服务器,线性扩展",
      "summary": "GlusterFS 的核心目标是：无元数据服务器,线性扩展。",
      "keyPoints": [
        "核心动机：无元数据服务器,线性扩展",
        "代表机构：Red Hat"
      ],
      "detail": "<p>无元数据服务器,线性扩展</p>"
    },
    {
      "id": "beegfs",
      "num": 8,
      "name": "BeeGFS",
      "fullName": "BeeGFS并行文件系统 (BeeGFS Parallel File System)",
      "year": "2014",
      "org": "ThinkParQ",
      "parent": "lustre",
      "paperUrl": "https://www.beegfs.io/docs/",
      "projectUrl": "",
      "category": "distributed_fs",
      "motivation": "BeeOND临时FS,GPUDirect支持",
      "summary": "BeeGFS 的核心目标是：BeeOND临时FS,GPUDirect支持。",
      "keyPoints": [
        "核心动机：BeeOND临时FS,GPUDirect支持",
        "演化来源：继承或改进自 lustre",
        "代表机构：ThinkParQ"
      ],
      "detail": "<p><strong>核心示意图说明</strong>：BeeGFS 文档将系统拆为管理服务、元数据服务、存储服务和客户端；BeeOND 文档强调按作业创建临时 BeeGFS 实例，GDS 文档说明 BeeGFS client 和 storage service 可直接参与 GPU/RDMA 数据路径。稳定文档入口为 https://www.beegfs.io/docs/。</p>\n<pre><code class=\"language-text\">BeeGFS Client\n  |-- config/discovery --&gt; Management service\n  |-- namespace ops ----&gt; Metadata services\n  `-- striped I/O -----&gt; Storage services -&gt; targets\n\nBeeOND: job nodes' local SSD/RAM -&gt; temporary BeeGFS mount -&gt; destroyed after job\nGDS: NVMe/RDMA NIC -&gt; BeeGFS -&gt; GPU memory path\n</code></pre>\n<p>```python</p>"
    },
    {
      "id": "juicefs",
      "num": 9,
      "name": "JuiceFS",
      "fullName": "JuiceFS云原生文件系统 (JuiceFS Cloud-Native File System)",
      "year": "2021",
      "org": "Juicedata",
      "parent": "—",
      "paperUrl": "https://github.com/juicedata/juicefs",
      "projectUrl": "",
      "category": "distributed_fs",
      "motivation": "S3后端+Redis元数据,云原生",
      "summary": "JuiceFS 的核心目标是：S3后端+Redis元数据,云原生。",
      "keyPoints": [
        "核心动机：S3后端+Redis元数据,云原生",
        "代表机构：Juicedata"
      ],
      "detail": "<p>S3后端+Redis元数据,云原生</p>"
    },
    {
      "id": "falconfs",
      "num": 10,
      "name": "FalconFS",
      "fullName": "FalconFS深度学习文件系统 (FalconFS)",
      "year": "2025",
      "org": "学术研究",
      "parent": "lustre",
      "paperUrl": "https://arxiv.org/abs/2507.10367",
      "projectUrl": "",
      "category": "distributed_fs",
      "motivation": "元数据负载均衡,DL管道优化",
      "summary": "FalconFS 的核心目标是：元数据负载均衡,DL管道优化。",
      "keyPoints": [
        "核心动机：元数据负载均衡,DL管道优化",
        "演化来源：继承或改进自 lustre",
        "代表机构：学术研究"
      ],
      "detail": "<p><strong>核心示意图说明</strong>：arXiv 页面说明 FalconFS 的关键路径由客户端/VFS shortcut、服务端路径解析、混合元数据索引、懒命名空间复制和数据服务组成。论文 HTML/PDF 可从 https://arxiv.org/abs/2507.10367 访问；若图片直链不稳定，以下为核心结构重构。</p>\n<pre><code class=\"language-text\">DL dataloader / pipeline\n  -&gt; VFS shortcut / FalconFS client\n  -&gt; server-side path resolver\n     |-- hybrid metadata index\n     |-- lazy namespace replication\n     `-- concurrent request merging\n  -&gt; data read/write service\n</code></pre>\n<p>```python</p>"
    },
    {
      "id": "minio",
      "num": 11,
      "name": "MinIO",
      "fullName": "MinIO对象存储 (MinIO Object Storage)",
      "year": "2014",
      "org": "MinIO",
      "parent": "—",
      "paperUrl": "https://min.io/",
      "projectUrl": "",
      "category": "object_storage",
      "motivation": "S3兼容高性能对象存储",
      "summary": "MinIO 的核心目标是：S3兼容高性能对象存储。",
      "keyPoints": [
        "核心动机：S3兼容高性能对象存储",
        "代表机构：MinIO"
      ],
      "detail": "<p>S3兼容高性能对象存储</p>"
    },
    {
      "id": "alluxio",
      "num": 12,
      "name": "Alluxio",
      "fullName": "Alluxio数据编排层 (Alluxio Data Orchestration)",
      "year": "2014",
      "org": "UC Berkeley",
      "parent": "—",
      "paperUrl": "https://www.alluxio.io/",
      "projectUrl": "",
      "category": "object_storage",
      "motivation": "分布式缓存,存算分离桥梁",
      "summary": "Alluxio 的核心目标是：分布式缓存,存算分离桥梁。",
      "keyPoints": [
        "核心动机：分布式缓存,存算分离桥梁",
        "代表机构：UC Berkeley"
      ],
      "detail": "<p><strong>核心示意图说明</strong>：Alluxio 官方页面将其描述为位于 compute 与 cloud storage 之间的高吞吐低延迟 cache，包含 global namespace、distributed caching、S3 API、POSIX client 和 Python SDK。稳定入口为 https://www.alluxio.io/。</p>\n<pre><code class=\"language-text\">PyTorch / TensorFlow / Spark / Ray\n  -&gt; POSIX / S3 / Python client\n  -&gt; Alluxio namespace + masters\n  -&gt; Alluxio workers: memory / NVMe / SSD cache\n  -&gt; Under File Systems: S3, GCS, HDFS, NAS, object stores\n</code></pre>\n<p>```python</p>"
    },
    {
      "id": "gds",
      "num": 13,
      "name": "GPUDirect Storage",
      "fullName": "NVIDIA GPUDirect存储 (GPUDirect Storage)",
      "year": "2020",
      "org": "NVIDIA",
      "parent": "—",
      "paperUrl": "https://developer.nvidia.com/gpudirect-storage",
      "projectUrl": "",
      "category": "object_storage",
      "motivation": "绕过CPU直达GPU,降低50%延迟",
      "summary": "GPUDirect Storage (GDS) 通过在存储设备与 GPU 显存之间建立直接 DMA 数据通路，绕过 CPU 内存的 bounce buffer 中转，将 GPU IO 带宽提升至接近 PCIe 线速，同时降低约 50% 的端到端延迟并释放 CPU 资源，是 NVIDIA GPU 直接存储访问的核心基础设施。",
      "keyPoints": [
        "<strong>DMA 直通路径</strong>：数据从 NVMe/NIC/RAID 控制器经 PCIe 交换机直接 DMA 到 GPU BAR1 显存区域，完全绕过 CPU 系统内存的 bounce buffer",
        "<strong>cuFile API 体系</strong>：提供类 POSIX 的 <code>cuFileRead</code>/<code>cuFileWrite</code>（同步）、<code>cuFileBatchIOSubmit</code>（批处理异步）、<code>cuFileReadAsync</code>/<code>cuFileWriteAsync</code>（CUDA Stream 异步）三层 API",
        "<strong>软件栈四层架构</strong>：用户态 <code>libcufile.so</code> → 内核态 <code>nvidia-fs.ko</code> → Linux VFS → 存储驱动（NVMe/NFS/分布式文件系统）",
        "<strong>智能路径选择</strong>：libcufile 根据文件系统类型、硬件拓扑和 BAR1 大小，动态选择 GDS 直通模式或兼容模式（fallback 到 CPU bounce buffer）",
        "<strong>动态缓冲路由</strong>：按优先级选择 NVLink 对端 GPU 内存 → 本地 GPU 内存 → 系统内存 → PCIe P2P 作为 staging buffer",
        "<strong>GPU BAR1 透明分块</strong>：当传输大小超过 BAR1 aperture 时，自动分块传输并通过 GPU 内部 copy engine 搬运到目标 buffer，对应用透明",
        "<strong>广泛生态支持</strong>：兼容 ext4/XFS/NFS、VAST/WekaFS/DDN EXAScaler/NetApp 等 20+ 分布式文件系统，以及 NVMe-oF、InfiniBand RDMA 等远程存储协议"
      ],
      "detail": "<p><img alt=\"GDS 架构示意图：传统路径 vs GDS 直通路径\" src=\"https://docs.nvidia.com/gpudirect-storage/design-guide/graphics/design-guide-image-4-updated.png\" />\n<em>图：左侧为传统 CPU bounce buffer 路径（存储→CPU 内存→GPU），右侧为 GDS 直通路径（存储→GPU），数据绕过 CPU 内存直接到达 GPU 显存。来源：NVIDIA GPUDirect Storage Design Guide Figure 4.1</em></p>\n<p><img alt=\"GDS 软件栈与数据流\" src=\"https://docs.nvidia.com/gpudirect-storage/overview-guide/graphics/gds-image5-updated.png\" />\n<em>图：GDS 完整软件栈——应用通过 cuFile API 调用 libcufile.so，经 nvidia-fs.ko 内核驱动与 VFS 交互，最终由存储驱动的 DMA 引擎直接访问 GPU 内存。来源：NVIDIA GPUDirect Storage Overview Guide Figure 1.1</em></p>\n<pre><code class=\"language-python\"># GDS cuFile API 核心使用流程伪代码\nimport cufile  # libcufile.so 绑定\n\n# 1. 初始化 GDS 驱动\ncufile.driver_open()\n\n# 2. 打开文件并注册 cuFile 句柄\nfd = os.open(&quot;/mnt/nvme/data.bin&quot;, os.O_RDONLY | os.O_DIRECT)\ncf_handle = cufile.handle_register(fd)\n\n# 3. 分配 GPU 显存（必须使用 cudaMalloc，非 cudaMallocManaged）\ngpu_buf = cuda.mem_alloc(buffer_size)\n\n# 4. 注册 GPU buffer 用于 DMA（可选，提升性能）\ncufile.buf_register(gpu_buf, buffer_size)\n\n# 5a. 同步读取：存储 → GPU 显存（类似 pread + O_DIRECT）\nbytes_read = cufile.read(cf_handle, gpu_buf, buffer_size, file_offset=0, buf_offset=0)\n\n# 5b. 异步批处理读取（类似 Linux AIO）\nio_batch = cufile.batch_io_setup(num_entries=8)\nfor i in range(8):\n    cufile.batch_io_submit(io_batch, cf_handle, gpu_buf[i], size[i], offset[i], READ)\ncufile.batch_io_get_status(io_batch)  # 轮询完成状态\n\n# 5c. CUDA Stream 异步读取（CUDA 12.2+）\nstream = cuda.Stream()\ncufile.read_async(cf_handle, gpu_buf, buffer_size, file_offset, buf_offset, stream)\nstream.synchronize()\n\n# 6. 清理\ncufile.buf_deregister(gpu_buf)\ncufile.handle_deregister(cf_handle)\nos.close(fd)\ncufile.driver_close()\n</code></pre>\n<p><strong>动机与背景：CPU bounce buffer 的瓶颈</strong></p>\n<p>在传统 GPU 计算工作流中，数据从存储到 GPU 的路径必须经过 CPU 系统内存作为中转站（bounce buffer）。具体流程为：存储设备通过 DMA 将数据写入 CPU 内存的 page cache，然后 CPU 再通过 PCIe 将数据从系统内存复制到 GPU 显存。这一路径存在三重开销：（1）数据在 PCIe 总线上被传输两次（存储→CPU、CPU→GPU），带宽利用率减半；（2）CPU 必须参与数据搬运，消耗宝贵的计算资源；（3）page cache 管理、内存分配和上下文切换引入额外延迟。随着 AI 训练数据集规模从 TB 级增长到 PB 级，IO 成为 GPU 利用率的主要瓶颈——GPU 空闲等待数据的时间占比显著增加。</p>\n<div class=\"key-point\">💡 关键：GDS 的核心洞察是——既然 PCIe 协议本身支持任意两个端点之间的点对点通信，为什么不让存储控制器的 DMA 引擎直接将数据写入 GPU 的 BAR1 内存映射区域？</div>\n<p><strong>核心机制：DMA 直通与 nvidia-fs.ko 回调架构</strong></p>\n<p>GDS 的技术实现围绕两个关键组件展开。在用户态，<code>libcufile.so</code> 提供 cuFile API 并负责智能路径决策：它检查目标文件所在的文件系统是否支持 GDS、当前 GPU 的 BAR1 大小是否足够、PCIe 拓扑是否允许直通等条件，然后选择最优传输路径。在内核态，<code>nvidia-fs.ko</code> 驱动注册了一组 DMA 回调函数（<code>nvfs_is_gpu_page</code>、<code>nvfs_dma_map_sg</code>），这些回调被存储驱动在执行 DMA 时调用。</p>\n<p>工作流程如下：应用调用 <code>cuFileRead</code> → <code>libcufile.so</code> 将 GPU 虚拟地址转换为代理 CPU 系统内存地址 → 通过 IOCTL 传递给 <code>nvidia-fs.ko</code> → 内核驱动调用 VFS 发起 IO 请求 → 存储驱动（如 NVMe）在设置 DMA 时调用 <code>nvfs_is_gpu_page</code> 检测目标地址是否为 GPU 内存 → 若是，调用 <code>nvfs_dma_map_sg</code> 获取 GPU 物理地址（通过 BAR1 映射）→ DMA 引擎直接将数据写入 GPU 显存 → 完成回调通知 <code>nvidia-fs.ko</code> → 返回用户态。</p>\n<div class=\"kb-math kb-math-display\">\\text{传统延迟} = T_{\\text{storage→CPU}} + T_{\\text{CPU→GPU}} + T_{\\text{CPU overhead}}</div>\n<div class=\"kb-math kb-math-display\">\\text{GDS延迟} = T_{\\text{storage→GPU}} \\approx \\frac{T_{\\text{传统延迟}}}{2}</div>\n<p>当传输大小超过 GPU BAR1 aperture 时，GDS 自动将大传输分块（chunking），使用 GPU 内部的 staging buffer 和 copy engine 完成搬运，整个过程对应用完全透明。选择更大 BAR1 的 GPU（如数据中心级 A100/H100）可减少此类开销。</p>\n<p><strong>PCIe 拓扑优化与性能最大化</strong></p>\n<p>GDS 的性能收益高度依赖 PCIe 拓扑结构。在理想配置中，NIC/NVMe 与 GPU 连接在同一 PCIe 交换机下，数据无需经过 CPU root complex，可达到 PCIe 链路的理论带宽上限。例如，在 HGX 系统中，Gen4 CPU 的 PCIe 树带宽上限为 25 GB/s，但 A100 GPU 和 CX6 NIC 均支持 50 GB/s——通过 PCIe 交换机实现 GDS 直通可突破 CPU 瓶颈，将带宽翻倍至 50 GB/s。</p>\n<p>对于本地存储场景，至少需要 4 块 x4 PCIe NVMe 驱动器才能饱和一条 x16 PCIe 链路。GDS 还支持 NVMe-oF（NVMe over Fabrics）和 InfiniBand RDMA 远程存储，通过 <code>libcufile_rdma.so</code> 实现用户态 RDMA 直接到 GPU 的数据传输，适用于分布式训练场景。</p>\n<div class=\"warn-box\">⚠️ 注意：GDS 要求 GPU 内存通过 <code>cudaMalloc</code> 分配（pinned memory），不支持 <code>cudaMallocManaged</code>（统一内存）或 <code>malloc</code>（CPU 内存）。这是因为 DMA 引擎需要固定的物理地址映射，而 managed memory 的页面可能被操作系统迁移。</div>\n<p><strong>与传统方法的对比</strong></p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th>传统 CPU bounce buffer</th>\n<th>GPUDirect Storage</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>数据路径</td>\n<td>存储 → CPU 内存 → GPU</td>\n<td>存储 → GPU（直通）</td>\n</tr>\n<tr>\n<td>PCIe 带宽利用</td>\n<td>数据传输两次，带宽减半</td>\n<td>单次传输，接近线速</td>\n</tr>\n<tr>\n<td>CPU 开销</td>\n<td>高（参与数据搬运）</td>\n<td>低（仅控制面）</td>\n</tr>\n<tr>\n<td>延迟</td>\n<td>高（双跳 + page cache）</td>\n<td>低（约降低 50%）</td>\n</tr>\n<tr>\n<td>系统内存占用</td>\n<td>需要 bounce buffer</td>\n<td>不需要</td>\n</tr>\n<tr>\n<td>API</td>\n<td>POSIX read/write + cudaMemcpy</td>\n<td>cuFileRead/cuFileWrite（一步完成）</td>\n</tr>\n<tr>\n<td>异步支持</td>\n<td>需手动管理</td>\n<td>原生 Batch IO + CUDA Stream</td>\n</tr>\n</tbody>\n</table></div>",
      "quiz": {
        "q": "GPUDirect Storage 绕过 CPU bounce buffer 的关键内核机制是什么？",
        "options": [
          "修改 Linux 内核的 VFS 层，使其原生支持 GPU 地址空间",
          "nvidia-fs.ko 注册 DMA 回调函数，存储驱动在 DMA 时查询 GPU 物理地址并直接写入",
          "将 GPU 显存映射为 CPU 的 NUMA 节点，复用现有 page cache 机制",
          "在用户态通过 DPDK 绕过内核直接操作 NVMe 控制器"
        ],
        "answer": 1,
        "explain": "nvidia-fs.ko 通过注册 nvfs_is_gpu_page 和 nvfs_dma_map_sg 等回调函数，使存储驱动在执行 DMA 时能识别 GPU 地址并获取对应的 BAR1 物理地址，从而将数据直接 DMA 到 GPU 显存，无需修改 Linux 内核核心。"
      }
    },
    {
      "id": "deepfreeze",
      "num": 14,
      "name": "DeepFreeze",
      "fullName": "DeepFreeze异步检查点 (DeepFreeze)",
      "year": "2020",
      "org": "ANL",
      "parent": "—",
      "paperUrl": "https://ieeexplore.ieee.org/document/9139779",
      "projectUrl": "",
      "category": "checkpoint",
      "motivation": "VELOC多级持久化,HPC异步I/O",
      "summary": "DeepFreeze 将 HPC 领域成熟的多级异步检查点库 VELOC 引入深度学习训练，通过后台线程异步序列化与多级存储（本地 SSD → 共享 PFS）流水线化写入，在数百 GPU 规模下实现接近零开销的模型检查点，同时保证容错恢复能力。",
      "keyPoints": [
        "<strong>HPC 检查点技术迁移至 DL</strong>：将 VELOC（Very Low Overhead Checkpointing System）的多级异步检查点机制适配到 TensorFlow/PyTorch 等深度学习框架，填补 DL 训练中高效容错的空白",
        "<strong>异步流水线架构</strong>：检查点操作被分解为三个可重叠阶段——（1）内存快照（snapshot）、（2）本地持久化（local persist）、（3）远程刷写（remote flush），各阶段通过后台线程与训练计算并行执行",
        "<strong>多级存储层次</strong>：Level-0 为节点本地内存/SSD 的快速检查点，Level-1 为跨节点到共享并行文件系统（PFS）的持久检查点，两级频率可独立配置以平衡开销与恢复粒度",
        "<strong>透明框架集成</strong>：通过 TensorFlow 的 <code>SessionRunHook</code> 和 PyTorch 的回调机制，在每个 epoch/N 步后自动触发异步检查点，无需修改用户训练代码",
        "<strong>增量与差分检查点</strong>：利用 hash 比较检测模型参数变化量，仅序列化发生变化的张量分片，显著减少写入数据量（尤其在微调场景下）",
        "<strong>可扩展至数百节点</strong>：实验表明在 256 个 GPU（64 节点 × 4 GPU）上训练 ResNet-50/VGG-16 等模型时，检查点开销低于训练时间的 2%，接近理想的零开销目标"
      ],
      "detail": "<pre><code>┌─────────────────────────────────────────────────────────┐\n│                    Training Process                      │\n│  ┌──────────┐  ┌──────────┐  ┌──────────┐              │\n│  │ Forward  │→ │ Backward │→ │ Param    │  ← 训练主循环 │\n│  │ Pass     │  │ Pass     │  │ Update   │              │\n│  └──────────┘  └──────────┘  └────┬─────┘              │\n│                                    │ 每N步触发           │\n│                              ┌─────▼──────┐             │\n│                              │  Snapshot   │ ← 内存拷贝  │\n│                              │ (memcpy)    │   ~ms级     │\n│                              └─────┬───────┘             │\n│ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┼ ─ ─ ─ 异步边界 ─ ─ │\n│                              ┌─────▼───────┐             │\n│  Background                  │ Local SSD   │ ← Level-0  │\n│  Thread                      │ Persist     │   异步写入  │\n│                              └─────┬───────┘             │\n│                              ┌─────▼───────┐             │\n│  VELOC                       │ Remote PFS  │ ← Level-1  │\n│  Active Backend              │ Flush       │   后台刷写  │\n│                              └─────────────┘             │\n└─────────────────────────────────────────────────────────┘\n</code></pre>\n<p><em>图：DeepFreeze 异步检查点流水线。训练主循环仅承担内存快照的微小开销，本地持久化和远程刷写由后台线程/VELOC 守护进程异步完成。</em></p>\n<pre><code class=\"language-python\"># DeepFreeze 异步检查点核心流程伪代码\n\nclass DeepFreezeCheckpointer:\n    def __init__(self, veloc_config, ckpt_interval, local_path, pfs_path):\n        &quot;&quot;&quot;\n        veloc_config: VELOC 配置文件路径（指定 scratch/persistent 路径、线程数等）\n        ckpt_interval: 每隔多少步触发一次检查点\n        local_path: 本地 SSD 路径（Level-0）\n        pfs_path: 共享 PFS 路径（Level-1）\n        &quot;&quot;&quot;\n        self.veloc_client = VELOC.init(MPI_COMM_WORLD, veloc_config)\n        self.interval = ckpt_interval\n        self.snapshot_buffer = {}   # 双缓冲：训练用 + 快照用\n        self.prev_hashes = {}       # 上一次检查点的张量 hash（用于增量检测）\n\n    def on_step_end(self, step, model):\n        if step % self.interval != 0:\n            return  # 非检查点步，直接返回\n\n        # ===== 阶段1: 内存快照（同步，阻塞训练，但极快） =====\n        for name, param in model.named_parameters():\n            current_hash = fast_hash(param.data)\n            if current_hash != self.prev_hashes.get(name):\n                # 仅拷贝发生变化的参数（增量检查点）\n                self.snapshot_buffer[name] = param.data.cpu().clone()\n                self.prev_hashes[name] = current_hash\n\n        # ===== 阶段2+3: 异步持久化（非阻塞） =====\n        # VELOC 在后台完成: snapshot_buffer → 本地SSD → PFS\n        self.veloc_client.checkpoint_async(\n            name=f&quot;model_step_{step}&quot;,\n            data=self.snapshot_buffer\n        )\n        # 训练立即继续，不等待 I/O 完成\n\n    def restore(self, model, version=-1):\n        &quot;&quot;&quot;从最新可用检查点恢复&quot;&quot;&quot;\n        # VELOC 自动选择最新完整检查点（优先本地SSD，回退到PFS）\n        ckpt_data = self.veloc_client.restart(version)\n        for name, param in model.named_parameters():\n            if name in ckpt_data:\n                param.data.copy_(ckpt_data[name])\n\n\n# ===== TensorFlow 集成示例 =====\nclass DeepFreezeHook(tf.estimator.SessionRunHook):\n    &quot;&quot;&quot;通过 TF SessionRunHook 透明集成&quot;&quot;&quot;\n    def after_run(self, run_context, run_values):\n        self.global_step += 1\n        self.checkpointer.on_step_end(self.global_step, self.model)\n\n# ===== PyTorch 集成示例 =====\n# 在训练循环中：\nfor epoch in range(num_epochs):\n    for batch in dataloader:\n        loss = model(batch)\n        loss.backward()\n        optimizer.step()\n        deepfreeze_ckpt.on_step_end(global_step, model)  # 一行集成\n</code></pre>\n<p><strong>动机与背景：DL 训练容错的困境</strong></p>\n<p>大规模深度学习训练作业通常运行数天至数周，使用数百甚至数千个 GPU。在此规模下，硬件故障（GPU 显存错误、节点宕机、网络中断）几乎是必然事件。传统的 DL 检查点方案（如 TensorFlow 的 <code>tf.train.Saver</code>、PyTorch 的 <code>torch.save</code>）采用同步方式：训练暂停 → 所有进程将模型参数序列化到共享文件系统 → 训练恢复。这种方式存在三个严重问题：</p>\n<ol>\n<li><strong>I/O 风暴</strong>：数百个进程同时向共享 PFS 写入 GB 级检查点，造成严重的 I/O 竞争，PFS 带宽成为瓶颈</li>\n<li><strong>训练停顿</strong>：同步写入期间所有 GPU 空闲等待，检查点频率越高，训练吞吐量损失越大</li>\n<li><strong>恢复粒度粗糙</strong>：为降低开销而降低检查点频率，导致故障后需要重新计算大量已完成的训练步</li>\n</ol>\n<p>与此同时，HPC 社区在科学计算应用的容错方面已积累了数十年经验。VELOC 是 ANL 开发的多级检查点库，支持异步 I/O、本地/远程多级存储、增量检查点等高级特性，在 HPC 应用中已证明可实现接近零开销的检查点。DeepFreeze 的核心洞察是：<strong>DL 训练的检查点模式（周期性保存固定大小的参数张量）与 HPC 科学模拟的检查点模式高度相似，可以直接复用 VELOC 的成熟机制</strong>。</p>\n<div class=\"key-point\">💡 关键洞察：DL 检查点的本质是周期性地持久化一组固定结构的浮点数组（模型参数），这与 HPC 模拟中保存物理场数据的模式完全一致——VELOC 的异步多级机制可以无缝迁移。</div>\n<p><strong>核心机制：VELOC 多级异步检查点</strong></p>\n<p>DeepFreeze 的技术核心是 VELOC 的两级检查点架构：</p>\n<p><strong>Level-0（本地快速检查点）</strong>：每个计算节点将检查点数据写入节点本地的 NVMe SSD 或 RAM disk。由于是本地 I/O，不存在网络竞争，写入带宽可达数 GB/s。本地检查点可以高频执行（如每 100 步），提供细粒度的恢复点。但本地检查点在节点故障时会丢失，因此仅能应对进程级故障（如 OOM、软件 bug）。</p>\n<p><strong>Level-1（远程持久检查点）</strong>：VELOC 的 Active Backend 守护进程在后台将本地检查点异步刷写到共享 PFS（如 Lustre、GPFS）。远程检查点频率较低（如每 1000 步或每个 epoch），但提供跨节点的持久容错能力。关键在于，刷写过程完全在后台进行，不阻塞训练。</p>\n<div class=\"kb-math kb-math-display\">T_{\\text{overhead}} = T_{\\text{snapshot}} = O(\\text{model\\_size} / \\text{memcpy\\_bandwidth})</div>\n<div class=\"kb-math kb-math-display\">T_{\\text{snapshot}} \\ll T_{\\text{training\\_step}} \\Rightarrow \\text{overhead} \\approx 0</div>\n<p>对于典型的 ResNet-50 模型（~100 MB 参数），内存快照仅需约 10 ms（假设 10 GB/s memcpy 带宽），而单步训练时间通常为 200-500 ms，因此快照开销不到训练时间的 5%。对于更大的模型，DeepFreeze 采用增量快照策略，通过 hash 比较仅拷贝变化的参数，进一步降低开销。</p>\n<p><strong>VELOC Active Backend 架构</strong></p>\n<p>VELOC 采用客户端-守护进程（client-daemon）分离架构：</p>\n<ul>\n<li><strong>Client Library</strong>（嵌入训练进程）：负责内存快照和本地 SSD 写入，提供 <code>checkpoint_begin/mem_protect/checkpoint_end</code> 等 API</li>\n<li><strong>Active Backend Daemon</strong>（独立进程，每节点一个）：监听本地检查点完成事件，异步执行远程刷写、数据压缩、EC 编码（Erasure Coding）等后台任务</li>\n<li><strong>通信机制</strong>：Client 和 Daemon 通过 UNIX domain socket + 共享内存通信，零拷贝传递检查点数据引用</li>\n</ul>\n<pre><code>Node 0                          Node 1\n┌──────────────────┐            ┌──────────────────┐\n│ Training Process │            │ Training Process │\n│ ┌──────────────┐ │            │ ┌──────────────┐ │\n│ │ VELOC Client │ │            │ │ VELOC Client │ │\n│ └──────┬───────┘ │            │ └──────┬───────┘ │\n│        │ unix    │            │        │ unix    │\n│        │ socket  │            │        │ socket  │\n│ ┌──────▼───────┐ │            │ ┌──────▼───────┐ │\n│ │ VELOC Active │ │            │ │ VELOC Active │ │\n│ │ Backend      │ │            │ │ Backend      │ │\n│ └──────┬───────┘ │            │ └──────┬───────┘ │\n│        │         │            │        │         │\n│  ┌─────▼─────┐   │            │  ┌─────▼─────┐   │\n│  │ Local SSD │   │            │  │ Local SSD │   │\n│  └───────────┘   │            │  └───────────┘   │\n└────────┼─────────┘            └────────┼─────────┘\n         │          Async Flush          │\n         └──────────┐  ┌────────────────┘\n                    ▼  ▼\n            ┌───────────────┐\n            │  Shared PFS   │\n            │ (Lustre/GPFS) │\n            └───────────────┘\n</code></pre>\n<p><em>图：VELOC 多级架构。每个节点上的 Active Backend 守护进程独立地将本地 SSD 检查点异步刷写到共享 PFS，避免 I/O 风暴。</em></p>\n<p><strong>增量检查点与差分压缩</strong></p>\n<p>DeepFreeze 利用 DL 训练的特殊性质进行优化：在训练后期，模型参数的变化量逐渐减小（梯度趋近于零）。通过对每个参数张量计算轻量级 hash（如 xxHash），DeepFreeze 可以快速检测哪些张量自上次检查点以来发生了变化，仅序列化和写入变化的部分。在微调（fine-tuning）场景下，通常只有少量层的参数发生显著变化，增量检查点可将写入量减少 50-90%。</p>\n<p>此外，VELOC 支持可选的 LZ4 压缩，对浮点参数数据通常可获得 1.5-2x 的压缩比，进一步减少 I/O 量。</p>\n<p><strong>实验评估关键结果</strong></p>\n<p>论文在 ANL 的 Theta 超级计算机（Intel KNL 节点）和配备 NVIDIA GPU 的集群上进行了评估：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>配置</th>\n<th>模型</th>\n<th>检查点大小</th>\n<th>同步开销</th>\n<th>DeepFreeze 开销</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>64 节点</td>\n<td>ResNet-50</td>\n<td>~100 MB</td>\n<td>15-30s/ckpt</td>\n<td>&lt; 0.5s（快照）</td>\n</tr>\n<tr>\n<td>128 节点</td>\n<td>VGG-16</td>\n<td>~550 MB</td>\n<td>45-90s/ckpt</td>\n<td>&lt; 2s（快照）</td>\n</tr>\n<tr>\n<td>256 GPU</td>\n<td>ResNet-152</td>\n<td>~240 MB</td>\n<td>30-60s/ckpt</td>\n<td>&lt; 1s（快照）</td>\n</tr>\n</tbody>\n</table></div>\n<ul>\n<li>在 256 GPU 规模下，同步检查点（直接写 PFS）的开销占训练时间的 10-25%，而 DeepFreeze 的开销低于 2%</li>\n<li>随着节点数增加，同步方案的 I/O 竞争加剧导致开销超线性增长，而 DeepFreeze 的开销几乎不随规模变化（因为本地 SSD 写入无竞争）</li>\n<li>增量检查点在微调场景下将写入量减少了 60-80%</li>\n<li>恢复时间：从本地 SSD 恢复（Level-0）仅需数秒，从 PFS 恢复（Level-1）需要 10-30 秒</li>\n</ul>\n<p><strong>与传统方法的对比</strong></p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th>同步检查点 (tf.train.Saver)</th>\n<th>DeepFreeze (VELOC)</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>I/O 模式</td>\n<td>同步阻塞，所有进程同时写 PFS</td>\n<td>异步流水线，本地 SSD + 后台刷写</td>\n</tr>\n<tr>\n<td>训练停顿</td>\n<td>每次检查点停顿数十秒</td>\n<td>仅内存快照 ~ms 级停顿</td>\n</tr>\n<tr>\n<td>I/O 竞争</td>\n<td>严重（N 个进程争抢 PFS 带宽）</td>\n<td>无（本地 SSD 写入）</td>\n</tr>\n<tr>\n<td>可扩展性</td>\n<td>差（开销随节点数超线性增长）</td>\n<td>好（开销几乎不随规模变化）</td>\n</tr>\n<tr>\n<td>检查点频率</td>\n<td>低（开销大，不敢频繁做）</td>\n<td>高（开销小，可每 100 步做一次）</td>\n</tr>\n<tr>\n<td>容错级别</td>\n<td>仅 PFS 持久化</td>\n<td>双级：本地 SSD（快）+ PFS（持久）</td>\n</tr>\n<tr>\n<td>增量支持</td>\n<td>无（每次全量写入）</td>\n<td>有（hash 检测 + 差分写入）</td>\n</tr>\n<tr>\n<td>框架集成</td>\n<td>原生但低效</td>\n<td>Hook/回调透明集成</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"warn-box\">⚠️ 局限性：DeepFreeze 依赖节点本地 SSD 作为 Level-0 存储，在无本地存储的云环境中需要退化为纯 PFS 模式。此外，VELOC 的 Active Backend 守护进程需要额外的系统资源（CPU 核心、内存），在资源紧张的环境中可能与训练进程竞争。</div>",
      "quiz": {
        "q": "DeepFreeze 实现接近零检查点开销的关键设计是什么？",
        "options": [
          "使用 GPU Direct RDMA 将模型参数直接从 GPU 显存写入远程存储",
          "将检查点分解为同步内存快照和异步本地/远程持久化两个阶段，训练仅等待快照完成",
          "通过模型并行将检查点数据分散到多个节点，每个节点只写自身分片",
          "利用 NVMe over Fabrics 协议绕过文件系统直接写入存储设备"
        ],
        "answer": 1,
        "explain": "DeepFreeze 的核心设计是将检查点操作分解为三个流水线阶段：（1）同步内存快照（memcpy，~ms级）、（2）异步本地 SSD 持久化、（3）异步远程 PFS 刷写。训练进程仅需等待极快的内存快照完成，后续 I/O 由 VELOC 后台线程/守护进程异步执行，因此检查点开销接近于内存拷贝时间，远小于训练步时间。"
      }
    },
    {
      "id": "checkfreq",
      "num": 15,
      "name": "CheckFreq",
      "fullName": "CheckFreq动态检查点 (CheckFreq)",
      "year": "2021",
      "org": "MSR",
      "parent": "—",
      "paperUrl": "https://www.usenix.org/conference/fast21/presentation/mohan",
      "projectUrl": "",
      "category": "checkpoint",
      "motivation": "两阶段机制,3.5%开销秒级恢复",
      "summary": "CheckFreq 的核心目标是：两阶段机制,3.5%开销秒级恢复。",
      "keyPoints": [
        "核心动机：两阶段机制,3.5%开销秒级恢复",
        "代表机构：MSR"
      ],
      "detail": "<p>两阶段机制,3.5%开销秒级恢复</p>"
    },
    {
      "id": "checknrun",
      "num": 16,
      "name": "Check-N-Run",
      "fullName": "Check-N-Run差异检查点 (Check-N-Run)",
      "year": "2022",
      "org": "Meta",
      "parent": "checkfreq",
      "paperUrl": "https://www.usenix.org/conference/nsdi22/presentation/eisenman",
      "projectUrl": "",
      "category": "checkpoint",
      "motivation": "差异化+量化,4-13倍压缩",
      "summary": "Check-N-Run 利用嵌入表的稀疏更新特性，结合差异检查点（仅存储修改过的嵌入向量）和自适应非对称量化（FP32→2-8bit），将 Facebook 生产环境中 TB 级推荐模型的检查点写入带宽降低 6-17×、存储容量降低 2.5-8×，且精度损失低于 0.01%。",
      "keyPoints": [
        "<strong>问题背景</strong>：Facebook 推荐模型 embedding table 占模型 &gt;99%，单模型达 TB 级，标准压缩（Zstandard）仅 ~7% 压缩率",
        "<strong>核心洞察</strong>：30 分钟训练间隔内仅 ~26% 嵌入向量被修改；即使训练 110 亿样本后也仅 52% 被访问过",
        "<strong>差异检查点</strong>：三种策略——One-shot、Consecutive incremental、Intermittent differential（默认），仅存储修改过的向量",
        "<strong>量化压缩</strong>：对称/非对称/K-means/自适应非对称四种方案，最终采用自适应非对称量化（≤4bit）+ 朴素非对称（8bit）",
        "<strong>动态 bit-width 选择</strong>：根据预期故障恢复次数自动选择量化位宽（1次→2bit，≤3次→3bit，≤20次→4bit，&gt;20次→8bit）",
        "<strong>解耦架构</strong>：GPU→CPU 快照仅需 ~7s（&lt;0.4% 训练开销），量化+存储在 CPU 后台流水线执行",
        "<strong>修改追踪</strong>：per-GPU bit-vector 在前向传播中与 AlltoAll 通信重叠更新，&lt;1% 开销，&lt;0.05% 内存",
        "<strong>总体效果</strong>：写入带宽降低 6-17×，存储容量降低 2.5-8×，精度损失 &lt;0.01%"
      ],
      "detail": "<p><strong>系统架构总览：</strong></p>\n<pre><code>┌─────────────────────────────────────────────────────────┐\n│                   Check-N-Run 架构                       │\n│                                                          │\n│  ┌──────────────┐    Snapshot     ┌──────────────────┐  │\n│  │  GPU Training │───(~7s stall)──▶│  CPU Background   │  │\n│  │  (continues)  │                │  Processing       │  │\n│  └──────────────┘                │                    │  │\n│                                   │  ┌──────────────┐ │  │\n│  ┌──────────────┐                │  │ Diff Engine   │ │  │\n│  │  Bit-Vector   │──tracking───▶ │  │ (bit-vector   │ │  │\n│  │  Tracker      │               │  │  comparison)  │ │  │\n│  └──────────────┘                │  └──────┬───────┘ │  │\n│                                   │         ▼         │  │\n│  ┌──────────────┐                │  ┌──────────────┐ │  │\n│  │  Controller   │──sync batch──▶│  │ Quantizer    │ │  │\n│  │  (reader-     │   count       │  │ (adaptive    │ │  │\n│  │   trainer)    │               │  │  asymmetric) │ │  │\n│  └──────────────┘                │  └──────┬───────┘ │  │\n│                                   │         ▼         │  │\n│                                   │  ┌──────────────┐ │  │\n│                                   │  │ Pipelined    │ │  │\n│                                   │  │ Storage Write│ │  │\n│                                   │  └──────────────┘ │  │\n│                                   └──────────────────┘  │\n└─────────────────────────────────────────────────────────┘\n</code></pre>\n<p><em>图：Check-N-Run 系统架构。训练仅在 GPU→CPU 快照时短暂停顿（~7s），差异计算、量化和存储写入均在 CPU 后台流水线执行。</em></p>\n<p><strong>差异检查点伪代码：</strong></p>\n<pre><code class=\"language-python\"># Check-N-Run 差异检查点 + 量化 核心流程\n\n# === 1. 修改追踪（每个训练 iteration，与 AlltoAll 重叠） ===\ndef track_modifications(embedding_lookup_indices, bit_vector):\n    &quot;&quot;&quot;在前向传播中标记被访问/修改的嵌入向量&quot;&quot;&quot;\n    for idx in embedding_lookup_indices:\n        bit_vector[idx] = 1  # O(1) per access, overlapped with AlltoAll comm\n\n# === 2. Intermittent Differential 策略（默认） ===\ndef should_take_full_baseline(interval_i, cumulative_sizes, incremental_size):\n    &quot;&quot;&quot;判断是否需要重置基线：当累积差异 ≥ 增量检查点总和时&quot;&quot;&quot;\n    full_cost = 1 + sum(cumulative_sizes[:interval_i])  # 全量 + 历史增量\n    incremental_cost = (interval_i + 1) * incremental_size  # 继续增量的成本\n    return full_cost &lt;= incremental_cost\n\n# === 3. 检查点创建主流程 ===\ndef create_checkpoint(model, bit_vector, baseline, interval_i):\n    # Step 1: GPU → CPU snapshot (training stalls ~7s)\n    snapshot = copy_gpu_to_pinned_cpu(model.state_dict())\n    # Training resumes immediately after snapshot\n\n    # Step 2: Background - compute differential\n    if should_take_full_baseline(interval_i, ...):\n        checkpoint_data = snapshot  # Full baseline\n        bit_vector.reset()\n    else:\n        modified_indices = bit_vector.get_set_bits()\n        checkpoint_data = {idx: snapshot[idx] for idx in modified_indices}\n\n    # Step 3: Background - quantize (chunk-by-chunk, pipelined with storage write)\n    bit_width = select_bit_width(expected_failures)  # 动态选择: 2/3/4/8 bit\n    for chunk in split_into_chunks(checkpoint_data):\n        if bit_width &lt;= 4:\n            quantized = adaptive_asymmetric_quantize(chunk, bit_width)\n        else:\n            quantized = asymmetric_quantize(chunk, bit_width)\n        write_to_remote_storage(quantized)  # Pipelined with next chunk quantization\n\n# === 4. 自适应非对称量化 ===\ndef adaptive_asymmetric_quantize(vector, n_bits, num_bins=25, ratio=0.6):\n    &quot;&quot;&quot;贪心搜索最优 xmin, xmax 以最小化 L2 误差&quot;&quot;&quot;\n    xmin, xmax = vector.min(), vector.max()\n    original_range = xmax - xmin\n    step_size = original_range / num_bins\n    best_error, best_xmin, best_xmax = float('inf'), xmin, xmax\n\n    while (xmax - xmin) &gt; ratio * original_range:\n        # 尝试两个方向的收缩\n        error_shrink_min = l2_error(quantize(vector, xmin + step_size, xmax, n_bits), vector)\n        error_shrink_max = l2_error(quantize(vector, xmin, xmax - step_size, n_bits), vector)\n\n        if error_shrink_min &lt; error_shrink_max:\n            xmin += step_size\n            if error_shrink_min &lt; best_error:\n                best_error, best_xmin, best_xmax = error_shrink_min, xmin, xmax\n        else:\n            xmax -= step_size\n            if error_shrink_max &lt; best_error:\n                best_error, best_xmin, best_xmax = error_shrink_max, xmin, xmax\n\n    return uniform_quantize(vector, best_xmin, best_xmax, n_bits)\n</code></pre>\n<p><strong>方法深入解读：</strong></p>\n<p><strong>1. 动机与问题分析——为什么传统压缩对推荐模型无效？</strong></p>\n<p>Facebook 的推荐模型（如 DLRM）核心由巨大的嵌入表（embedding table）构成，单个模型可达数 TB。这些嵌入表将稀疏的类别特征（如用户 ID、商品 ID）映射为稠密向量。在分布式训练中，嵌入表按行分片到不同 GPU（模型并行），而 MLP 层则数据并行。每 30 分钟需要做一次检查点以防故障，但 TB 级数据的写入对存储带宽和容量造成巨大压力。</p>\n<p>传统通用压缩（如 Zstandard）对嵌入表几乎无效——因为嵌入向量是经过训练的浮点数，本质上是高熵数据，不存在通用压缩可利用的重复模式。实测仅获得 ~7% 的压缩率。然而，Check-N-Run 发现了一个关键特性：<strong>嵌入表的更新是极度稀疏的</strong>。在 30 分钟的训练间隔内，仅约 26% 的嵌入向量被修改（因为大部分用户/商品在短时间内不会出现在训练数据中）。即使训练了 110 亿个样本，也仅有 52% 的嵌入向量被访问过。这一洞察为差异检查点提供了理论基础。</p>\n<div class=\"key-point\">💡 <strong>关键洞察</strong>：嵌入表的稀疏访问模式意味着大部分检查点数据与上一次完全相同——只需存储\"变化的部分\"即可大幅减少数据量。</div>\n<p><strong>2. 差异检查点——三种策略的权衡与 Intermittent Differential 的设计智慧</strong></p>\n<p>Check-N-Run 提出三种差异检查点策略，核心权衡是<strong>写入带宽 vs 存储容量 vs 恢复复杂度</strong>：</p>\n<ul>\n<li><strong>One-shot Differential</strong>：保存一个完整基线 + 自基线以来所有修改的向量。优点是恢复简单（基线 + 最新差异），但差异会随时间单调增长，最终趋近全量。</li>\n<li><strong>Consecutive Incremental</strong>：每次仅保存上一个间隔内修改的向量。写入带宽最优且稳定（每次 ~26%），但恢复需要读取所有历史检查点，且存储容量线性增长（11 个间隔后达 4× 模型大小）。适合在线学习（online training）场景，因为在线学习不需要回溯到很早的检查点。</li>\n<li><strong>Intermittent Differential（默认）</strong>：结合前两者优点。使用历史预测器动态决定何时重置基线。判断条件为：当创建新全量基线的总成本 <span class=\"kb-math kb-math-inline\">F_c = 1 + S_1 + ... + S_i</span> 不超过继续增量的成本 <span class=\"kb-math kb-math-inline\">I_c = (i+1) \\cdot S_i</span> 时，触发全量基线重置。实验中，该策略在第 8 个间隔自动触发重置，将存储容量控制在合理范围内。</li>\n</ul>\n<p>修改追踪的实现非常精巧：每个 GPU 维护一个 bit-vector，在前向传播的嵌入查找阶段标记被访问的索引。由于嵌入查找与 AlltoAll 通信天然重叠（GPU 在等待远程嵌入返回时有空闲周期），追踪操作几乎不产生额外开销（&lt;1% 训练吞吐量下降，&lt;0.05% 内存开销）。</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：差异检查点本身不引入任何精度损失——所有被修改的数据都被完整保留。精度损失仅来自量化步骤。</div>\n<p><strong>3. 自适应非对称量化——为什么比朴素方法好，又如何避免 K-means 的计算爆炸？</strong></p>\n<p>量化是 Check-N-Run 的第二个压缩维度。核心思想是将 FP32 嵌入向量量化为低位整数。朴素的对称量化（以 0 为中心）效果不佳，因为嵌入向量的值分布通常不关于 0 对称。非对称量化（使用实际的 <span class=\"kb-math kb-math-inline\">x_{min}</span> 和 <span class=\"kb-math kb-math-inline\">x_{max}</span>）更好，但仍有问题：如果向量中存在少数极端值（outlier），它们会拉大量化范围，导致大部分正常值的量化精度下降。</p>\n<p>K-means 非均匀量化理论上最优（为每个聚类中心分配一个量化值），但对 TB 级检查点需要 48 小时——完全不可行。Check-N-Run 的自适应非对称量化通过贪心搜索找到最优的 <span class=\"kb-math kb-math-inline\">x_{min}</span> 和 <span class=\"kb-math kb-math-inline\">x_{max}</span>：将原始范围分成 <code>num_bins</code> 个步长，每步尝试从两端收缩范围，选择 ℓ2 误差更小的方向。<code>ratio</code> 参数控制搜索范围（如 0.6 表示只搜索原始范围的 60%）。实验表明，25 bins + ratio=0.6 即可达到接近 K-means 的精度，而延迟仅为 K-means 的千分之一。</p>\n<p>量化参数的自动选择也很巧妙：Check-N-Run 仅对检查点的 0.001% 进行采样量化，即可准确估计最优的 <code>num_bins</code> 和 <code>ratio</code> 参数，避免了全量搜索的开销。</p>\n<div class=\"kb-math kb-math-display\">F_Q(x, x_{min}, x_{max}, n) = \\text{round}\\left(\\frac{x - x_{min}}{x_{max} - x_{min}} \\cdot (2^n - 1)\\right) \\cdot \\frac{x_{max} - x_{min}}{2^n - 1} + x_{min}</div>\n<p><strong>4. 动态 bit-width 选择与端到端流水线</strong></p>\n<p>量化误差在多次从检查点恢复时会累积。Check-N-Run 根据集群故障概率 <span class=\"kb-math kb-math-inline\">p</span>（从故障日志计算）估计训练期间的预期恢复次数，动态选择量化位宽：2-bit 允许 1 次恢复，3-bit 允许 3 次，4-bit 允许 20 次，8-bit 允许 100+ 次。如果实际故障超过预期，系统自动回退到 8-bit。</p>\n<p>端到端流水线设计确保量化不阻塞训练：GPU→CPU 快照（~7s）是唯一的训练停顿点。之后，CPU 进程将检查点分块（chunk），每个 chunk 独立量化后立即写入远程存储，同时下一个 chunk 开始量化。由于远程存储写入通常是瓶颈，量化延迟被完全隐藏。</p>\n<p>Reader-Trainer 同步机制解决了一个微妙问题：数据读取器（reader）需要知道每个检查点间隔内精确处理了多少个 batch，以便恢复时从正确位置继续。Check-N-Run 通过控制器在每个间隔结束时记录精确的 batch 计数，消除了\"in-flight\"数据的歧义。</p>",
      "quiz": {
        "q": "Check-N-Run 默认采用 Intermittent Differential 而非 Consecutive Incremental 策略的主要原因是什么？",
        "options": [
          "Consecutive Incremental 的写入带宽更高",
          "Consecutive Incremental 需要保留所有历史检查点，存储容量线性增长",
          "Consecutive Incremental 无法追踪嵌入向量的修改",
          "Consecutive Incremental 会引入量化精度损失"
        ],
        "answer": 1,
        "explain": "Consecutive Incremental 虽然每次写入量最小且稳定，但恢复需要读取所有历史检查点，导致存储容量快速增长（11个间隔后达4×模型大小），而 Intermittent Differential 通过动态重置基线将存储控制在合理范围。"
      }
    },
    {
      "id": "bytecheckpoint",
      "num": 17,
      "name": "ByteCheckpoint",
      "fullName": "字节检查点系统 (ByteCheckpoint)",
      "year": "2025",
      "org": "ByteDance",
      "parent": "checkfreq",
      "paperUrl": "https://www.usenix.org/conference/nsdi25/presentation/wan-borui",
      "projectUrl": "",
      "category": "checkpoint",
      "motivation": "10TB/s带宽,统一大模型检查点",
      "summary": "ByteCheckpoint 的核心目标是：10TB/s带宽,统一大模型检查点。",
      "keyPoints": [
        "核心动机：10TB/s带宽,统一大模型检查点",
        "演化来源：继承或改进自 checkfreq",
        "代表机构：ByteDance"
      ],
      "detail": "<p>10TB/s带宽,统一大模型检查点</p>"
    },
    {
      "id": "universal_ckpt",
      "num": 18,
      "name": "Universal Checkpointing",
      "fullName": "原子检查点系统 (Universal Checkpointing)",
      "year": "2025",
      "org": "学术研究",
      "parent": "bytecheckpoint",
      "paperUrl": "https://www.usenix.org/conference/atc25/presentation/lian",
      "projectUrl": "",
      "category": "checkpoint",
      "motivation": "原子结构,动态并行策略",
      "summary": "Universal Checkpointing 的核心目标是：原子结构,动态并行策略。",
      "keyPoints": [
        "核心动机：原子结构,动态并行策略",
        "演化来源：继承或改进自 bytecheckpoint",
        "代表机构：学术研究"
      ],
      "detail": "<p>原子结构,动态并行策略</p>"
    },
    {
      "id": "dali",
      "num": 19,
      "name": "DALI",
      "fullName": "NVIDIA数据加载库 (NVIDIA DALI)",
      "year": "2018",
      "org": "NVIDIA",
      "parent": "—",
      "paperUrl": "https://developer.nvidia.com/dali",
      "projectUrl": "",
      "category": "cache",
      "motivation": "GPU预处理,消除CPU瓶颈",
      "summary": "DALI 的核心目标是：GPU预处理,消除CPU瓶颈。",
      "keyPoints": [
        "核心动机：GPU预处理,消除CPU瓶颈",
        "代表机构：NVIDIA"
      ],
      "detail": "<p>GPU预处理,消除CPU瓶颈</p>"
    },
    {
      "id": "aistore",
      "num": 20,
      "name": "AIStore",
      "fullName": "NVIDIA AIStore (AIStore)",
      "year": "2019",
      "org": "NVIDIA",
      "parent": "—",
      "paperUrl": "https://aiatscale.org/",
      "projectUrl": "",
      "category": "cache",
      "motivation": "集成ETL,存储节点直接数据增强",
      "summary": "AIStore 的核心目标是：集成ETL,存储节点直接数据增强。",
      "keyPoints": [
        "核心动机：集成ETL,存储节点直接数据增强",
        "代表机构：NVIDIA"
      ],
      "detail": "<p>集成ETL,存储节点直接数据增强</p>"
    },
    {
      "id": "quiver",
      "num": 21,
      "name": "Quiver",
      "fullName": "Quiver知情缓存 (Quiver)",
      "year": "2020",
      "org": "Microsoft",
      "parent": "—",
      "paperUrl": "https://www.usenix.org/conference/fast20/presentation/kumar",
      "projectUrl": "",
      "category": "cache",
      "motivation": "内容哈希+可替代命中,跨作业重用",
      "summary": "Quiver 的核心目标是：内容哈希+可替代命中,跨作业重用。",
      "keyPoints": [
        "核心动机：内容哈希+可替代命中,跨作业重用",
        "代表机构：Microsoft"
      ],
      "detail": "<p>内容哈希+可替代命中,跨作业重用</p>"
    },
    {
      "id": "baleen",
      "num": 22,
      "name": "Baleen",
      "fullName": "Baleen ML缓存 (Baleen)",
      "year": "2024",
      "org": "CMU",
      "parent": "quiver",
      "paperUrl": "https://www.usenix.org/conference/fast24/presentation/wong",
      "projectUrl": "",
      "category": "cache",
      "motivation": "ML驱动准入与预取决策",
      "summary": "Baleen 的核心目标是：ML驱动准入与预取决策。",
      "keyPoints": [
        "核心动机：ML驱动准入与预取决策",
        "演化来源：继承或改进自 quiver",
        "代表机构：CMU"
      ],
      "detail": "<p>ML驱动准入与预取决策</p>"
    },
    {
      "id": "cedar",
      "num": 23,
      "name": "cedar",
      "fullName": "cedar统一数据管道 (cedar)",
      "year": "2024",
      "org": "学术研究",
      "parent": "dali",
      "paperUrl": "https://arxiv.org/abs/2401.08895",
      "projectUrl": "",
      "category": "cache",
      "motivation": "统一ML输入管道优化框架",
      "summary": "cedar 的核心目标是：统一ML输入管道优化框架。",
      "keyPoints": [
        "核心动机：统一ML输入管道优化框架",
        "演化来源：继承或改进自 dali",
        "代表机构：学术研究"
      ],
      "detail": "<p>统一ML输入管道优化框架</p>"
    },
    {
      "id": "modyn",
      "num": 24,
      "name": "Modyn",
      "fullName": "Modyn数据流水线平台 (Modyn)",
      "year": "2025",
      "org": "学术研究",
      "parent": "cedar",
      "paperUrl": "https://arxiv.org/abs/2312.06254",
      "projectUrl": "",
      "category": "cache",
      "motivation": "动态数据集,端到端训练优化",
      "summary": "Modyn 的核心目标是：动态数据集,端到端训练优化。",
      "keyPoints": [
        "核心动机：动态数据集,端到端训练优化",
        "演化来源：继承或改进自 cedar",
        "代表机构：学术研究"
      ],
      "detail": "<p>动态数据集,端到端训练优化</p>"
    },
    {
      "id": "learned_index",
      "num": 25,
      "name": "Learned Index",
      "fullName": "学习索引 (Learned Index)",
      "year": "2018",
      "org": "Google",
      "parent": "—",
      "paperUrl": "https://dl.acm.org/doi/10.1145/3183713.3196909",
      "projectUrl": "",
      "category": "emerging",
      "motivation": "ML替代B+树,查询加速",
      "summary": "Learned Index 的核心目标是：ML替代B+树,查询加速。",
      "keyPoints": [
        "核心动机：ML替代B+树,查询加速",
        "代表机构：Google"
      ],
      "detail": "<p>ML替代B+树,查询加速</p>"
    },
    {
      "id": "nvmeof",
      "num": 26,
      "name": "NVMe-oF",
      "fullName": "NVMe over Fabrics (NVMe-oF)",
      "year": "2016",
      "org": "NVM Express",
      "parent": "—",
      "paperUrl": "https://nvmexpress.org/developers/nvme-of-specification/",
      "projectUrl": "",
      "category": "emerging",
      "motivation": "RDMA/TCP远程NVMe,DPU卸载",
      "summary": "NVMe-oF 的核心目标是：RDMA/TCP远程NVMe,DPU卸载。",
      "keyPoints": [
        "核心动机：RDMA/TCP远程NVMe,DPU卸载",
        "代表机构：NVM Express"
      ],
      "detail": "<p>RDMA/TCP远程NVMe,DPU卸载</p>"
    },
    {
      "id": "cxl",
      "num": 27,
      "name": "CXL Memory",
      "fullName": "CXL内存扩展 (Compute Express Link)",
      "year": "2019",
      "org": "Intel联盟",
      "parent": "—",
      "paperUrl": "https://www.computeexpresslink.org/",
      "projectUrl": "",
      "category": "emerging",
      "motivation": "内存池化,利用率50%→85%",
      "summary": "CXL（Compute Express Link）是基于 PCIe 物理层的开放互连标准，通过定义 CXL.io/CXL.cache/CXL.mem 三种子协议实现 CPU 与外部设备间的缓存一致性内存访问，核心目标是实现**内存解耦与池化**，将数据中心内存利用率从约 50% 提升至 85% 以上。",
      "keyPoints": [
        "<strong>三种子协议</strong>：CXL.io（I/O 语义，兼容 PCIe）、CXL.cache（设备缓存主机内存，保持一致性）、CXL.mem（主机访问设备端内存）",
        "<strong>三类设备模型</strong>：Type 1（加速器，无设备内存）、Type 2（带内存的加速器，如 GPU/FPGA）、Type 3（纯内存扩展器，池化核心）",
        "<strong>内存池化（Memory Pooling）</strong>：CXL 2.0 引入交换机与多主机共享内存池，动态分配内存容量",
        "<strong>动态容量设备（DCD）</strong>：CXL 3.0 引入，允许内存设备向主机动态暴露/回收内存区域",
        "<strong>缓存一致性</strong>：硬件级别保证 CPU 缓存与 CXL 设备内存之间的数据一致性，无需软件干预",
        "<strong>多版本演进</strong>：CXL 1.0/1.1（2019）→ CXL 2.0（2020，交换/池化）→ CXL 3.0（2022，Fabric/多级交换）→ CXL 3.1（2023，增强安全与 DCD）",
        "<strong>性能特征</strong>：CXL 内存延迟约为本地 DDR 的 2-3 倍（额外 ~100-200ns），带宽可达本地 DDR 的 45-83%（取决于实现）"
      ],
      "detail": "<h5>架构总览</h5>\n<p><img alt=\"CXL Type 3 内存扩展架构\" src=\"https://ar5iv.labs.arxiv.org/html/2411.02282/assets/x1.png\" />\n<em>图：通过 CXL Type 3 设备实现内存扩展——CPU 经由 CXL 链路访问外部 DRAM，扩展系统内存容量（来源：CXL-DMSim, arXiv:2411.02282）</em></p>\n<p><img alt=\"CXL 内存访问延迟分解\" src=\"https://ar5iv.labs.arxiv.org/html/2411.02282/assets/x5.png\" />\n<em>图：CXL 内存访问请求从 CPU 到 CXL 设备的端到端延迟分解（来源：CXL-DMSim, arXiv:2411.02282）</em></p>\n<p>CXL 构建于 PCIe 的物理层和电气层之上，复用了 PCIe 的链路训练、信号编码（如 PCIe 5.0 的 32 GT/s、PCIe 6.0 的 64 GT/s PAM4）等基础设施。在此之上，CXL 定义了三种协议，通过 <strong>Flex Bus</strong> 机制在同一物理链路上动态复用：</p>\n<pre><code>┌─────────────────────────────────────────────┐\n│              CXL Transaction Layer           │\n│  ┌───────────┬──────────────┬─────────────┐  │\n│  │  CXL.io   │  CXL.cache   │  CXL.mem    │  │\n│  │ (PCIe TLP)│ (D2H Req/Rsp)│(M2S/S2M Msg)│  │\n│  └───────────┴──────────────┴─────────────┘  │\n├─────────────────────────────────────────────┤\n│           CXL Link Layer (ARB/MUX)          │\n├─────────────────────────────────────────────┤\n│         PCIe Physical Layer (PHY)            │\n│        (PCIe 5.0 / 6.0 Electrical)          │\n└─────────────────────────────────────────────┘\n</code></pre>\n<h5>三种子协议详解</h5>\n<p><strong>CXL.io</strong> 是对标准 PCIe 协议的兼容层，提供设备发现、配置、中断、DMA 等传统 I/O 功能。所有 CXL 设备都必须支持 CXL.io，它是设备初始化和管理的基础通道。</p>\n<p><strong>CXL.cache</strong> 允许 CXL 设备缓存主机内存中的数据，并通过硬件一致性协议保证缓存与主机内存的一致性。其消息流分为：\n- <strong>D2H Request</strong>（Device-to-Host）：设备向主机发起读/写请求\n- <strong>H2D Response</strong>（Host-to-Device）：主机返回数据或确认\n- <strong>H2D Snoop</strong>：主机对设备缓存发起窥探，确保一致性</p>\n<div class=\"key-point\">💡 关键：CXL.cache 使得加速器（如 SmartNIC、FPGA）可以直接缓存主机内存数据，避免了传统 PCIe DMA 的高延迟拷贝开销。</div>\n<p><strong>CXL.mem</strong> 是内存扩展的核心协议，允许主机 CPU 以 load/store 语义直接访问 CXL 设备上的内存（HDM, Host-managed Device Memory）。其消息流分为：\n- <strong>M2S Request/Data</strong>（Master-to-Subordinate）：主机向设备发起内存读写\n- <strong>S2M Response/Data</strong>（Subordinate-to-Master）：设备返回数据</p>\n<p>内存访问的地址映射通过 <strong>HDM Decoder</strong> 完成，主机 BIOS/固件在启动时将 CXL 设备内存映射到系统物理地址空间，操作系统可将其作为 NUMA 节点管理。</p>\n<h5>三类设备模型</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>设备类型</th>\n<th>支持协议</th>\n<th>典型应用</th>\n<th>示例</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Type 1</td>\n<td>CXL.io + CXL.cache</td>\n<td>无本地内存的加速器</td>\n<td>SmartNIC、加密引擎</td>\n</tr>\n<tr>\n<td>Type 2</td>\n<td>CXL.io + CXL.cache + CXL.mem</td>\n<td>带内存的加速器</td>\n<td>GPU、FPGA、AI 加速器</td>\n</tr>\n<tr>\n<td>Type 3</td>\n<td>CXL.io + CXL.mem</td>\n<td>纯内存扩展</td>\n<td>内存扩展器、持久内存</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"warn-box\">⚠️ 注意：Type 3 设备是内存池化的核心载体。它不具备计算能力，仅提供大容量内存，通过 CXL.mem 协议供主机访问。</div>\n<h5>内存池化机制（CXL 2.0+）</h5>\n<p>内存池化是 CXL 最具变革性的特性。传统服务器中，每台主机的内存是独占的——即使某些主机内存利用率仅 30%，其他主机也无法借用，导致数据中心整体内存利用率通常仅约 <strong>50%</strong>。</p>\n<p>CXL 2.0 引入了 <strong>CXL Switch</strong>，允许多台主机通过交换机连接到共享的 Type 3 内存设备池：</p>\n<pre><code>   ┌──────┐  ┌──────┐  ┌──────┐\n   │Host 0│  │Host 1│  │Host 2│\n   └──┬───┘  └──┬───┘  └──┬───┘\n      │         │         │\n   ┌──┴─────────┴─────────┴──┐\n   │       CXL Switch         │\n   └──┬─────────┬─────────┬──┘\n      │         │         │\n   ┌──┴───┐ ┌──┴───┐ ┌──┴───┐\n   │Mem   │ │Mem   │ │Mem   │\n   │Dev 0 │ │Dev 1 │ │Dev 2 │\n   └──────┘ └──────┘ └──────┘\n   ← CXL Memory Pool →\n</code></pre>\n<p>池化的核心工作流程：</p>\n<ol>\n<li><strong>FM（Fabric Manager）</strong> 是池化系统的控制平面，负责管理内存分配策略</li>\n<li>主机通过 FM 请求内存容量，FM 在内存池中分配相应区域</li>\n<li>FM 配置 CXL Switch 的 HDM Decoder，将分配的内存区域映射到请求主机的物理地址空间</li>\n<li>主机通过 CXL.mem 协议直接以 load/store 访问分配到的远端内存</li>\n<li>当主机释放内存时，FM 回收并可重新分配给其他主机</li>\n</ol>\n<div class=\"key-point\">💡 关键：通过动态分配，内存池化可将数据中心内存利用率从 ~50% 提升至 <strong>~85%</strong>，显著降低 TCO（总拥有成本）。</div>\n<h5>动态容量设备（DCD, CXL 3.0）</h5>\n<p>CXL 3.0 进一步引入了 <strong>Dynamic Capacity Device (DCD)</strong>，允许内存设备主动向主机通知容量变化：</p>\n<div class=\"kb-math kb-math-display\">\\text{Capacity}_{effective}(t) = \\sum_{r \\in \\text{Regions}} \\text{Extent}_{allocated}(r, t)</div>\n<p>DCD 通过 <strong>Dynamic Capacity Event</strong> 机制工作：\n- 设备可以向主机发送 <strong>Add Capacity</strong> 事件，动态扩展可用内存\n- 设备也可以发送 <strong>Release Capacity</strong> 请求，回收之前分配的内存区域\n- 主机通过 <strong>Mailbox Command</strong> 响应这些事件</p>\n<p>这使得内存管理更加灵活，支持超额分配（oversubscription）等高级策略。</p>\n<h5>性能模型与延迟分析</h5>\n<p>CXL 内存访问的端到端延迟可分解为：</p>\n<div class=\"kb-math kb-math-display\">T_{CXL} = T_{CPU\\_uncore} + T_{CXL\\_controller} + T_{link} + T_{switch} + T_{device\\_controller} + T_{media}</div>\n<p>其中各组成部分的典型值（基于实测数据）：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>组件</th>\n<th>延迟贡献</th>\n<th>说明</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><span class=\"kb-math kb-math-inline\">T_{CPU\\_uncore}</span></td>\n<td>~20-40ns</td>\n<td>CPU 内部 CXL 根端口处理</td>\n</tr>\n<tr>\n<td><span class=\"kb-math kb-math-inline\">T_{CXL\\_controller}</span></td>\n<td>~10-20ns</td>\n<td>CXL 协议编解码</td>\n</tr>\n<tr>\n<td><span class=\"kb-math kb-math-inline\">T_{link}</span></td>\n<td>~5-10ns</td>\n<td>PCIe 物理链路传输</td>\n</tr>\n<tr>\n<td><span class=\"kb-math kb-math-inline\">T_{switch}</span></td>\n<td>~30-50ns</td>\n<td>CXL 交换机转发（若有）</td>\n</tr>\n<tr>\n<td><span class=\"kb-math kb-math-inline\">T_{device\\_controller}</span></td>\n<td>~20-40ns</td>\n<td>设备端 CXL 控制器</td>\n</tr>\n<tr>\n<td><span class=\"kb-math kb-math-inline\">T_{media}</span></td>\n<td>~50-80ns</td>\n<td>DRAM 介质访问</td>\n</tr>\n</tbody>\n</table></div>\n<p>实测结果表明：\n- <strong>无交换机直连</strong>：CXL 内存延迟约为本地 DDR 的 <strong>~2.18x</strong>（ASIC 实现）至 <strong>~2.88x</strong>（FPGA 实现）\n- <strong>带宽</strong>：CXL-ASIC 可达本地 DDR 带宽的 <strong>82-83%</strong>，CXL-FPGA 约为 <strong>45-69%</strong>\n- 对于内存密集型应用（如 KV 数据库），在本地内存受限时，CXL 扩展内存可带来最高 <strong>23x</strong> 的性能提升</p>\n<h5>与传统内存扩展方案对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>本地 DDR</th>\n<th>NUMA 远端</th>\n<th>RDMA</th>\n<th>CXL Memory</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>访问语义</td>\n<td>load/store</td>\n<td>load/store</td>\n<td>verb-based</td>\n<td>load/store</td>\n</tr>\n<tr>\n<td>缓存一致性</td>\n<td>硬件保证</td>\n<td>硬件保证</td>\n<td>软件管理</td>\n<td>硬件保证</td>\n</tr>\n<tr>\n<td>额外延迟</td>\n<td>基准</td>\n<td>~50-100ns</td>\n<td>~1-2μs</td>\n<td>~100-200ns</td>\n</tr>\n<tr>\n<td>池化支持</td>\n<td>❌</td>\n<td>❌</td>\n<td>✅（复杂）</td>\n<td>✅（原生）</td>\n</tr>\n<tr>\n<td>软件修改</td>\n<td>无</td>\n<td>最小</td>\n<td>大量</td>\n<td>最小（NUMA 兼容）</td>\n</tr>\n<tr>\n<td>容量扩展</td>\n<td>受限于 DIMM 槽位</td>\n<td>受限于节点数</td>\n<td>灵活</td>\n<td>灵活</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 关键：CXL 的核心优势在于<strong>保持 load/store 语义和硬件缓存一致性的同时实现内存池化</strong>，这是 RDMA 等方案无法做到的。应用程序几乎无需修改即可使用 CXL 扩展内存。</div>\n<h5>版本演进路线</h5>\n<ul>\n<li><strong>CXL 1.0/1.1（2019）</strong>：奠定三协议基础，支持单主机-单设备直连，基于 PCIe 5.0</li>\n<li><strong>CXL 2.0（2020）</strong>：引入 CXL Switch 和内存池化，支持多主机共享内存，单级交换</li>\n<li><strong>CXL 3.0（2022）</strong>：支持多级交换（Fabric）、增强一致性（Back-Invalidate Snoop）、DCD、PCIe 6.0（64 GT/s）、Global Fabric Attached Memory (GFAM)</li>\n<li><strong>CXL 3.1（2023）</strong>：增强安全性（TSP, Trust Security Protocol）、端口隧道、改进的 DCD 管理</li>\n</ul>\n<h5>生态与产业现状</h5>\n<p>CXL 联盟成员超过 190 家，包括 Intel、AMD、ARM、Samsung、SK Hynix、Micron、Meta、Google、Microsoft 等。已有多款商用产品：\n- <strong>Samsung CXL Memory Expander</strong>（CMM-D/CMM-H）：基于 DDR5 的 Type 3 设备\n- <strong>SK Hynix CXL DRAM</strong>：支持 CXL 2.0 的内存模块\n- <strong>Micron CZ120</strong>：CXL 2.0 内存扩展器\n- <strong>Astera Labs Leo</strong>：CXL 智能内存控制器\n- <strong>Montage Technology</strong>：CXL 交换芯片</p>",
      "quiz": {
        "q": "CXL 内存池化的核心优势相比 RDMA 远程内存方案是什么？",
        "options": [
          "CXL 的网络带宽更高",
          "CXL 保持 load/store 语义和硬件缓存一致性，应用几乎无需修改",
          "CXL 的延迟比 RDMA 低一个数量级",
          "CXL 支持更多的编程语言"
        ],
        "answer": 1,
        "explain": "CXL 通过硬件级缓存一致性协议（CXL.mem）让主机以标准 load/store 指令访问远端内存，操作系统将其视为 NUMA 节点，应用程序几乎无需修改；而 RDMA 需要使用专用 verb API，需大量改造应用。"
      }
    },
    {
      "id": "arcneural",
      "num": 28,
      "name": "ArcNeural",
      "fullName": "ArcNeural多模态数据库 (ArcNeural)",
      "year": "2025",
      "org": "学术研究",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2506.09467",
      "projectUrl": "",
      "category": "emerging",
      "motivation": "向量+图+文档统一存储",
      "summary": "ArcNeural 的核心目标是：向量+图+文档统一存储。",
      "keyPoints": [
        "核心动机：向量+图+文档统一存储",
        "代表机构：学术研究"
      ],
      "detail": "<p>向量+图+文档统一存储</p>"
    }
  ],
  "categories": {
    "foundation": {
      "label": "奠基系统",
      "color": "#4A90D9"
    },
    "distributed_fs": {
      "label": "分布式文件系统",
      "color": "#50C878"
    },
    "object_storage": {
      "label": "对象与云原生存储",
      "color": "#9B59B6"
    },
    "checkpoint": {
      "label": "检查点优化",
      "color": "#E74C3C"
    },
    "cache": {
      "label": "高速缓存与数据加载",
      "color": "#F39C12"
    },
    "emerging": {
      "label": "2026前沿技术",
      "color": "#1ABC9C"
    }
  },
  "projectUrls": {}
};
