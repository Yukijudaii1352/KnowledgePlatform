/**
 * device-data.js — 由 pipeline/build.py 于 2026-06-16 17:00:14 自动生成。
 * 源文件：content/infra/device.md
 * ⚠️  请勿手动修改；如需更新，修改源文档后重新编译。
 */
window.PAGE_CONFIG = {
  "meta": {
    "domain": "infra",
    "topic_id": "device",
    "topic_name": "AI硬件",
    "page_title": "AI硬件技术演进图谱",
    "page_subtitle": "2026-06-16 版",
    "page_desc": "梳理从通用GPU到专用AI加速器（TPU/NPU）及存算一体、光计算等前沿硬件的发展历程。",
    "page_icon": "⚙️",
    "hero_pills": [
      "🏷️ AI Accelerators · GPU/NPU/TPU · Architecture"
    ],
    "count_pill": "{count} 个算法",
    "image_base": "../../content/infra/device/assets/",
    "overview_from_doc": true,
    "latest_overview_from_doc": true
  },
  "overview": [
    {
      "title": "",
      "body_html": "<h1>AI硬件是什么，普通人怎么理解这个风口—— AI硬件科普系列 · 总纲篇</h1>\n<ul>\n<li>来源平台: <strong>zhihu</strong>（知乎专栏文章）</li>\n<li>原文链接: <a href=\"https://zhuanlan.zhihu.com/p/2045920862000374683\">https://zhuanlan.zhihu.com/p/2045920862000374683</a></li>\n<li>作者: 梅雪争春</li>\n</ul>\n<hr />\n<p>AI硬件是什么，普通人怎么理解这个风口—— AI硬件科普系列 · 总纲篇</p>\n<h1>AI硬件是什么，普通人怎么理解这个风口—— AI硬件科普系列 · 总纲篇</h1>\n<p>作者: 梅雪争春, 赞: 2</p>\n<p>最近两年，身边不少人在聊AI硬件。</p>\n<p>有人说买半导体芯片的股票发了财，有人说CPO是下一个风口，有人说HBM供不应求……</p>\n<p>但大多数人听完还是一头雾水：</p>\n<p>AI硬件到底是什么？它为什么值钱？谁在赚钱？</p>\n<p>这篇文章，我用最简单的方式，把这件事讲清楚。</p>\n<p>一、先说AI在干什么</p>\n<p>你跟AI说一句话，AI给你回答。</p>\n<p>这个过程，AI做的事情是：把你的问题变成数字 → 在海量数据里找规律 → 把结果再变回语言输出给你。</p>\n<p>这里面有一个关键词：海量的数字运算。</p>\n<p>不是一点点——是同时处理几十亿个参数的运算，而且要在几秒内完成。</p>\n<p>普通电脑做不到。</p>\n<p>所以AI需要专门的硬件来支撑这些计算。这就是「AI硬件」的由来。</p>\n<p>二、AI硬件是一条完整的产业链，不只是芯片</p>\n<p>很多人以为AI硬件就是「英伟达的GPU芯片」。</p>\n<p>这只是冰山一角。</p>\n<p>你可以把AI数据中心想象成一座城市。要让这座城市运转，你需要：</p>\n<p>🧠 大脑（计算芯片） GPU、AI加速芯片——负责做运算，是最核心的部分。英伟达、AMD、华为昇腾都在做这块。</p>\n<p>🩸 血液（存储芯片/HBM） 计算芯片再强，也需要随时从内存里读取数据。普通内存太慢，AI用的是高带宽内存HBM，贵，但快。韩国的SK海力士、三星是主要供应商。</p>\n<p>🔗 神经（光模块/CPO） 数据中心里有几万块芯片，它们之间需要高速传输数据。用铜线太慢，现在用光来传——这就是光模块。中国有不少公司在做，比如新易盛、天孚通信。</p>\n<p>🦴 骨架（先进封装） 芯片越做越复杂，单靠制造工艺提升已经不够，现在要把多个芯片封装在一起协同工作——这是先进封装技术，台积电在这方面领先，A股的长电科技也在跟进。</p>\n<p>⚡ 电网（PCB/电源） 所有芯片和模块都需要电路板承载、电源供电。PCB（印刷电路板）是AI硬件里最「低调」但需求量最大的一环。</p>\n<p>🩺 毛细血管（MLCC等被动元器件） 每一块电路板上都密密麻麻布满了MLCC（多层陶瓷电容），小到肉眼几乎看不见，但量大到以百亿计。</p>\n<p>三、为什么现在是风口？</p>\n<p>这轮AI硬件的爆发，根本原因只有一个：</p>\n<p>大模型出来了，算力需求爆了。</p>\n<p>2022年底ChatGPT发布，全球科技公司意识到：要做出更强的AI，必须用更多的芯片、更快的内存、更大的数据中心。</p>\n<p>于是开始疯狂采购。</p>\n<p>英伟达H100一片难求，光模块厂商订单排到明年，HBM产能全部提前锁定——整条产业链都供不应求。</p>\n<p>这是真实的需求，不是炒概念。</p>\n<p>四、谁在这条链上赚钱？</p>\n<p>从最上游到最下游，每个环节都有人赚：</p>\n<p>芯片制造（英伟达/华为）</p>\n<p>↓</p>\n<p>先进封装（台积电/长电科技）</p>\n<p>↓</p>\n<p>高带宽内存（SK海力士/三星）</p>\n<p>↓</p>\n<p>光模块（新易盛/天孚/中际旭创）</p>\n<p>↓</p>\n<p>PCB（生益科技/沪电股份）</p>\n<p>↓</p>\n<p>MLCC（村田/国巨/风华高科）</p>\n<p>↓</p>\n<p>服务器整机（浪潮/华为/戴尔）</p>\n<p>↓</p>\n<p>数据中心运营（阿里云/腾讯云/AWS）</p>\n<p>越靠近「计算芯片」这个核心，技术门槛越高，利润率越高，但竞争者也越少。</p>\n<p>越靠近下游，竞争更充分，但市场体量更大。</p>\n<p>五、一句话总结</p>\n<p>AI硬件 = 支撑AI运转的全套基础设施。</p>\n<p>这轮需求爆发不是概念，是真实订单。整条产业链从芯片到电容，每个环节都在受益。</p>\n<p>接下来这个系列，我会一个环节一个环节讲清楚：它是什么、难在哪、谁在做、现在到什么阶段了。</p>\n<p><strong>下一篇：存储芯片——AI为什么需要特殊的内存？HBM到底有多贵、有多难造？</strong></p>"
    }
  ],
  "latest_overview": [
    {
      "title": "",
      "body_html": "<h1>GTC Taipei 2026：AI算力基建进入超级周期</h1>\n<ul>\n<li>来源平台: <strong>zhihu</strong>（知乎专栏文章）</li>\n<li>原文链接: <a href=\"https://zhuanlan.zhihu.com/p/2046725167833953840\">https://zhuanlan.zhihu.com/p/2046725167833953840</a></li>\n<li>作者: 电源大能</li>\n</ul>\n<hr />\n<p>GTC Taipei 2026：AI算力基建进入超级周期</p>\n<h1>GTC Taipei 2026：AI算力基建进入超级周期</h1>\n<p>作者: 电源大能, 赞: 1</p>\n<p>2026年6月的台北，COMPUTEX和GTC Taipei同时举办。黄仁勋在台上宣布Vera Rubin量产、RTX Spark进入PC市场、55GW AI服务器功率首次超过通用服务器。这场展会释放的信号密度极高——从芯片到电网，从算力到散热，每一个维度都在经历范式转移。以下是从算力、电力、连接、端侧四个维度的梳理。</p>\n<p><strong>算力：Vera Rubin量产，5x性能跃升背后是供电链路的非线性升级</strong></p>\n<p>Vera Rubin NVL72在COMPUTEX上宣布量产，秋季出货。单机架性能达到Blackwell的5倍——这不是渐进式升级，是架构级跃升。摩根士丹利拆解数据显示，单机架BOM成本高达7,803,148美元，其中GPU占26.9%、HBM4占25.7%、PSU和液冷各占约10%。</p>\n<p>但更值得关注的是功耗曲线。黄仁勋在Keynote中给出了完整的路线图：GB200单机架120kW → Rubin Ultra 600kW+ → 下一代Feynman 1.5MW。不到三年时间，单柜功率翻了超过十倍。这种增速已经不能用\"线性增长\"来描述，而是在逼近供电链路的物理极限。</p>\n<p><img alt=\"\" src=\"https://pic3.zhimg.com/v2-b591a5c1d95cb06fefa0b99465ddcc52_1440w.jpg\" /></p>\n<p>图: GPU机架功耗演进曲线：GB200 120kW➡️ Rubin Ultra 600kW+ ➡️ Feynman 1.5MW</p>\n<p>有趣的是，Rubin的量产其实经历了一波三折。产业链调研显示，英伟达在2025年下半年临时将HBM4的引脚传输速率要求提升到11.7Gbps，导致三星、SK海力士和美光全部重新设计验证。SK海力士是首批通过验证的主要供应商，三星仍在良率爬坡阶段，美光已出局。英伟达不得不考虑Dual Bin策略——11.7Gbps高速版配旗舰产品，10Gbps标速版配主流产品，以维持供应基础。</p>\n<p>ConnectX-8到ConnectX-9的升级同样不是简单迭代，而是架构跨越。CX9的200G PAM4 SerDes信号完整性要求M8/M9级别的高多层PCB，碳氢树脂价格正在上行。信号密度翻倍后，传统风冷已无法处理CX9的热输出，必须配合液冷系统整体调校。</p>\n<p>这些延宕带来的影响已经传导到供应链：800G光模块生命周期延长6到12个月，1.6T的大规模部署推迟到2027年上半年。对电源架构的影响更为关键——Blackwell/GB300的生命周期被拉长，意味着48V和54V供电架构的生命周期同样被拉长，给产业界争取了更多准备时间。</p>\n<p><strong>电力：55GW里程碑，800V HVDC全面确立，但路线之争才刚刚开始</strong></p>\n<p>TrendForce在展会期间发布的数据震动了整个行业：AI服务器功率容量达到55GW，历史上首次超过通用服务器。55GW相当于50座百万千瓦级核电站的总装机容量。当AI服务器的功耗超过通用服务器，数据中心的供电架构必须从底层重构。</p>\n<p>这就是800V HVDC成为本届展会最热话题的根本原因。展会上最让我兴奋的是800V HVDC从\"概念\"走向\"路线图\"的全面确立。纳微半导体展示了全球首个800V到6V GaN DC-DC电源分配板，16颗GaNFast芯片，功率密度2100W每立方英寸。消息公布当天，纳微股价暴涨19.26%。</p>\n<p>但800V HVDC的落地并非只有一条路线。这场展会揭示了一个更深层次的博弈——不同玩家正在押注不同的路线，时间窗口和利益结构决定了他们的选择。</p>\n<p>德州仪器是器件供应商，卖的是GaN驱动芯片和SiC栅极驱动IC。在800V HVDC架构中，800V到48V到6V到1V的每一级转换都需要它的控制芯片。因此TI天然倾向保留多级电力电子转换的Sidecar渐进路线，而不是跳过中间环节的SST路线——SST一旦将中压直接降至末端电压，TI在前段的器件出货量反而会被压缩。</p>\n<p>施耐德、伊顿、维谛等电力基础设施商的立场更加鲜明。它们的核心产品是UPS、配电柜和母排，护城河是已入驻园区电源侧的工频变压器和低压开关设备，装机量价值数十亿美元。SST中压直挂路线一旦普及，这套资产会整体被绕过。它们的策略是推Sidecar配合800V HVDC，在现有基础上打补丁，延缓旧有资产贬值周期。施耐德高管甚至公开预测，到2030年可能只有约10%的新AI节点需要800V DC。与此同时，伊顿已与世纪互联合作发布10kV中压能源路由器，效率约98.3%。</p>\n<p>台达电子的立场完全不同。作为全栈电力电子集成商，SST方案吃掉过去需要三个供应商提供的环节，台达的收入密度反而提升——同样一个项目，从卖一件PSU变成卖一个完整1680kW系统级方案，ASP提升5到8倍。台达目前已在北美微网及国内园区落地模块化SST机柜，将10到33kV中压直降至240V、400V或800V DC，最高效率98.5%，1MW功率柜占地仅一平方米。</p>\n<p>最近英伟达发布了800V HVDC白皮书，梳理了四代演进路线：Gen1传统AC/UPS系统，端到端效率84.5%到87%；Gen2引入HVDC侧边柜；Gen3移除UPS，采用燃气轮机加电池直接供应800V DC；Gen4通过固态变压器或中压整流器直连电网，端到端效率跃升到98%到98.5%。</p>\n<p><img alt=\"\" src=\"https://pic1.zhimg.com/v2-6951193fa5ad5c457c236b550a6bc9a0_1440w.jpg\" /></p>\n<p>图: 传统AC架构(84-87%) vs 800V HVDC架构(97-98.5%)效率对比</p>\n<p>两条路线并行且不互斥。渐进路线是存量玩家的防守策略，全链路SST是增量玩家的进攻策略。两者在2026到2027年将并行共存，真正的分叉点在2028年——当Feynman单GPU功耗达到4400W、单柜功耗突破1MW时，传统工频变压器配合Sidecar的方案在占地、散热和铜耗上都已物理不可持续，SST成为唯一可行路径。</p>\n<p>55GW里程碑的另一个容易被忽视的面向是旧机房改造。TI计划在2026年下半年推出800V到12V的备选方案，专门为传统12V生态提供平滑过渡路径。对很多数据中心运营商来说，推倒重建的成本远高于就地改造，这意味着800V HVDC的渗透率提升会比很多人预期得更快。</p>\n<p>在储能侧，AIDC的多时间尺度储能配置正在形成行业共识。全钒液流电池因其25年寿命和本征安全特性，被定位为园区级长时储能的优选方案。星辰新能在2026年4月发布了专为AIDC设计的STAR 1500系统——1.5MW、6MWh，电流密度300毫安每平方厘米，采用液锂协同混储架构。中国移动在淮南部署了首个数据中心全钒液流项目（7MW、42MWh），新疆吉木萨尔200MW/1GWh的全球最大全钒液流电站已经全容量投产。</p>\n<p>数据中心的训练任务本身也是一种\"虚拟储能\"——训练任务可延迟4到8小时，100MW集群中50%的训练负载可延迟4小时，等效200MWh的虚拟储能能力。这个维度上的算力与电力协同，正在改写传统储能配置的经济模型。</p>\n<p><strong>连接：CPO是唯一出路，液冷路线最终确立</strong></p>\n<p>算力密度继续提升，功耗继续膨胀，物理定律开始显形。当机架功耗突破600kW，传统可插拔光模块的功耗已经不可接受。黄仁勋在Keynote中明确强调，CPO是降低I/O功耗的唯一路径——这种措辞在英伟达的历史上极为罕见，因为它意味着技术路线已经没有备选方案。</p>\n<p>光模块的演进路径其实已经清楚。1.6T是基于PAM4调制的可插拔架构的物理天花板——200G PAM4在PCB走线上需要承受30到45dB的综合插损，DSP补偿功耗达到6到14瓦每模块，OSFP224的热密度超过5瓦每平方厘米，而风冷散热极限只有4瓦每平方厘米。这意味着1.6T规模化部署的前置条件是液冷普及，这不是可选项，是必选项。</p>\n<p>CPO的进展比预期更快。英伟达Quantum-X交换机已实现115.2Tb/s吞吐，采用4颗ASIC和18个1.6T硅光引擎，通过TSMC COUPE 3D键合工艺集成。Broadcom的Bailly CPO方案实测功耗约10.8W每1.6T端口，相比可插拔方案的20W以上功耗大幅降低。2027到2029年CPO将进入规模验证，到2028年之后，200T代际交换架构中CPO端口的出货量预计将超过可插拔。</p>\n<p>LPO作为过渡方案仍然有市场，在2026到2027年的短距场景中预计占据20%到30%的份额。LPO去掉模块内DSP，将信号均衡转移到主机侧的Retimer，800G模块功耗从约17瓦降至约8.5瓦。但它的局限也很明显——依赖主机侧Retimer、互操作性受限、传输距离不足两公里。这是一种续命方案，而不是终极方案。</p>\n<p>液冷方案在GTC期间正式确立。之前行业内部一直在争论微通道冷却与铲齿散热方案的选择，这次展会上方向已经明确：微通道方案因可靠性和成本问题在兆瓦级机架下无法保证而被否决，主流方案锁定在铲齿散热加液态金属TIM。这个技术路线的确立，直接利好从冷板到CDU的整个液冷供应链。</p>\n<p>在先进封装方面，台积电展示了CoWoS深沟槽电容的集成技术，这是把原本分立的大电容通过硅基深沟槽工艺直接集成到封装基板上。对传统电容行业的短期影响不大，但长期来看，高端MLCC和大容量电容器的技术参数要求会越来越高。</p>\n<p><strong>端侧：RTX Spark进入PC市场，40年来首次架构重塑</strong></p>\n<p>GTC Taipei还有一个容易被忽略的重要信号：NVIDIA正式进入消费级PC市场。</p>\n<p>RTX Spark N1X SoC采用20核Grace CPU加Blackwell GPU架构，配置6144个CUDA核心和128GB统一内存。这是自IBM PC确立Wintel架构以来，PC体系结构的首次实质性改变。联发科深度参与了N1X的设计，这是联发科第一次进入NVIDIA的核心计算平台。</p>\n<p>2026年AI PC出货量预计达到1.43亿台，渗透率55%。五大阵营——NVIDIA的RTX Spark、Qualcomm的Snapdragon X2、Intel的Panther Lake、AMD的Strix Halo和Apple的M5——正在形成五方争霸的格局。但RTX Spark的特殊之处在于它拥有一块128GB的统一内存，意味着大模型可以在本地运行，无需全部上云。</p>\n<p>这改变了整套AI基础设施的投资逻辑——不是所有算力都需要在超大规模数据中心里燃烧电力。一部分推理任务会从云端下移到端侧，但每一次端侧推理产生的训练需求又会反馈到云端。算力的总需求在两端同时增长，供需闭环更加完整。</p>\n<p><strong>四个维度的交叉点</strong></p>\n<p>Vera Rubin的5x性能跃升带来了功耗的非线性增长，倒逼800V HVDC成为标配。800V架构需要GaN和SiC器件支撑，拉动了功率半导体全产业链。CPO和液冷解决了连接和散热的物理约束，先进封装在芯片层面集成功率完整性方案。RTX Spark把AI推理从云端延伸到端侧，进一步扩大了算力需求的总量。</p>\n<p>这不是某个公司的突破，是整个产业链的范式转移。从电网到GPU，从芯片到机柜，每一个环节都在经历前所未有的升级。55GW只是起点，当AI从训练走向推理、从云端走向端侧，算力需求的增长曲线才刚刚拐头。</p>\n<p>对于电力电子行业，这是过去二十年最好的产业机会。供电架构的每一次跃迁都伴随着价值量的指数级提升，而这场跃迁才刚刚开始。</p>"
    }
  ],
  "graph": {
    "nodes": [
      {
        "id": "cuda",
        "x": 200,
        "y": 80,
        "category": "gpu_architecture"
      },
      {
        "id": "volta_tensor_core",
        "x": 450,
        "y": 80,
        "category": "gpu_architecture"
      },
      {
        "id": "ampere_sparse",
        "x": 600,
        "y": 80,
        "category": "gpu_architecture"
      },
      {
        "id": "hopper_fp8",
        "x": 700,
        "y": 80,
        "category": "gpu_architecture"
      },
      {
        "id": "blackwell_fp4",
        "x": 850,
        "y": 80,
        "category": "gpu_architecture"
      },
      {
        "id": "rubin_gpu",
        "x": 950,
        "y": 80,
        "category": "gpu_architecture"
      },
      {
        "id": "amd_mi400",
        "x": 950,
        "y": 120,
        "category": "gpu_architecture"
      },
      {
        "id": "tpu_v1",
        "x": 450,
        "y": 180,
        "category": "tpu"
      },
      {
        "id": "tpu_v2v3",
        "x": 600,
        "y": 180,
        "category": "tpu"
      },
      {
        "id": "tpu_v4",
        "x": 750,
        "y": 180,
        "category": "tpu"
      },
      {
        "id": "tpu_v7",
        "x": 950,
        "y": 180,
        "category": "tpu"
      },
      {
        "id": "diannao",
        "x": 300,
        "y": 280,
        "category": "npu_asic"
      },
      {
        "id": "dadiannao",
        "x": 300,
        "y": 320,
        "category": "npu_asic"
      },
      {
        "id": "cambricon_isa",
        "x": 380,
        "y": 280,
        "category": "npu_asic"
      },
      {
        "id": "ascend_davinci",
        "x": 650,
        "y": 280,
        "category": "npu_asic"
      },
      {
        "id": "habana_gaudi",
        "x": 600,
        "y": 280,
        "category": "npu_asic"
      },
      {
        "id": "cerebras_wse",
        "x": 800,
        "y": 380,
        "category": "emerging_chips"
      },
      {
        "id": "graphcore_ipu",
        "x": 530,
        "y": 380,
        "category": "emerging_chips"
      },
      {
        "id": "groq_tsp",
        "x": 600,
        "y": 380,
        "category": "emerging_chips"
      },
      {
        "id": "sambanova_rdu",
        "x": 700,
        "y": 380,
        "category": "emerging_chips"
      },
      {
        "id": "prime",
        "x": 380,
        "y": 480,
        "category": "pim_cim"
      },
      {
        "id": "isaac",
        "x": 380,
        "y": 520,
        "category": "pim_cim"
      },
      {
        "id": "rram_cim_survey",
        "x": 650,
        "y": 480,
        "category": "pim_cim"
      },
      {
        "id": "intel_18a_cim",
        "x": 950,
        "y": 480,
        "category": "pim_cim"
      },
      {
        "id": "reram_mlc_cim",
        "x": 950,
        "y": 520,
        "category": "pim_cim"
      },
      {
        "id": "mpu_pim",
        "x": 950,
        "y": 560,
        "category": "pim_cim"
      },
      {
        "id": "systolic_array",
        "x": 100,
        "y": 580,
        "category": "dataflow"
      },
      {
        "id": "eyeriss",
        "x": 380,
        "y": 580,
        "category": "dataflow"
      },
      {
        "id": "eyeriss_v2",
        "x": 530,
        "y": 580,
        "category": "dataflow"
      },
      {
        "id": "sze_dnn_survey",
        "x": 450,
        "y": 580,
        "category": "dataflow"
      },
      {
        "id": "nvlink",
        "x": 380,
        "y": 680,
        "category": "interconnect"
      },
      {
        "id": "cxl",
        "x": 800,
        "y": 680,
        "category": "interconnect"
      },
      {
        "id": "tvm",
        "x": 480,
        "y": 760,
        "category": "hw_sw_codesign"
      },
      {
        "id": "mlir",
        "x": 650,
        "y": 760,
        "category": "hw_sw_codesign"
      },
      {
        "id": "mnasnet",
        "x": 530,
        "y": 760,
        "category": "hw_sw_codesign"
      },
      {
        "id": "hw_nas_bench",
        "x": 650,
        "y": 800,
        "category": "hw_sw_codesign"
      },
      {
        "id": "fuseflow",
        "x": 950,
        "y": 760,
        "category": "hw_sw_codesign"
      },
      {
        "id": "tisa",
        "x": 950,
        "y": 800,
        "category": "hw_sw_codesign"
      },
      {
        "id": "fpga_cnn_survey",
        "x": 450,
        "y": 850,
        "category": "fpga"
      },
      {
        "id": "fpga_svd",
        "x": 380,
        "y": 850,
        "category": "fpga"
      },
      {
        "id": "deep_compression",
        "x": 320,
        "y": 940,
        "category": "efficiency"
      },
      {
        "id": "eie",
        "x": 380,
        "y": 940,
        "category": "efficiency"
      },
      {
        "id": "bnn",
        "x": 380,
        "y": 980,
        "category": "efficiency"
      },
      {
        "id": "ampere_24_sparsity",
        "x": 600,
        "y": 940,
        "category": "efficiency"
      },
      {
        "id": "sageattention3",
        "x": 950,
        "y": 940,
        "category": "efficiency"
      },
      {
        "id": "atropos",
        "x": 950,
        "y": 980,
        "category": "efficiency"
      },
      {
        "id": "fp4_training",
        "x": 950,
        "y": 1020,
        "category": "efficiency"
      },
      {
        "id": "nanophotonic_nn",
        "x": 950,
        "y": 1040,
        "category": "photonic"
      },
      {
        "id": "astra_photonic",
        "x": 950,
        "y": 1080,
        "category": "photonic"
      },
      {
        "id": "lightmatter_passage",
        "x": 950,
        "y": 1120,
        "category": "photonic"
      },
      {
        "id": "rebellions_chiplet",
        "x": 950,
        "y": 1130,
        "category": "chiplet"
      },
      {
        "id": "flare_chiplet",
        "x": 950,
        "y": 1170,
        "category": "chiplet"
      },
      {
        "id": "deepstack_3d",
        "x": 950,
        "y": 1210,
        "category": "chiplet"
      },
      {
        "id": "moentwine",
        "x": 950,
        "y": 1220,
        "category": "llm_inference"
      },
      {
        "id": "diamond_moe",
        "x": 950,
        "y": 1260,
        "category": "llm_inference"
      },
      {
        "id": "bitdecoding",
        "x": 950,
        "y": 1300,
        "category": "llm_inference"
      },
      {
        "id": "nvidia_ising",
        "x": 950,
        "y": 1310,
        "category": "quantum_hybrid"
      }
    ],
    "edges": [
      {
        "from": "cuda",
        "to": "volta_tensor_core",
        "label": "张量核心引入"
      },
      {
        "from": "volta_tensor_core",
        "to": "ampere_sparse",
        "label": "结构化稀疏"
      },
      {
        "from": "ampere_sparse",
        "to": "hopper_fp8",
        "label": "FP8精度适配"
      },
      {
        "from": "hopper_fp8",
        "to": "blackwell_fp4",
        "label": "FP4万亿参数"
      },
      {
        "from": "systolic_array",
        "to": "tpu_v1",
        "label": "商用脉动阵列"
      },
      {
        "from": "systolic_array",
        "to": "eyeriss",
        "label": "RS数据流"
      },
      {
        "from": "tpu_v1",
        "to": "tpu_v2v3",
        "label": "训练架构升级"
      },
      {
        "from": "tpu_v2v3",
        "to": "tpu_v4",
        "label": "光互联扩展"
      },
      {
        "from": "eyeriss",
        "to": "eyeriss_v2",
        "label": "灵活互联"
      },
      {
        "from": "diannao",
        "to": "dadiannao",
        "label": "多核扩展"
      },
      {
        "from": "dadiannao",
        "to": "cambricon_isa",
        "label": "指令集标准化"
      },
      {
        "from": "prime",
        "to": "isaac",
        "label": "流水线架构"
      },
      {
        "from": "isaac",
        "to": "rram_cim_survey",
        "label": "技术综述"
      },
      {
        "from": "deep_compression",
        "to": "eie",
        "label": "压缩专用硬件"
      },
      {
        "from": "tvm",
        "to": "mlir",
        "label": "多层级IR统一"
      },
      {
        "from": "mnasnet",
        "to": "hw_nas_bench",
        "label": "标准化基准"
      },
      {
        "from": "ampere_sparse",
        "to": "ampere_24_sparsity",
        "label": "硬件稀疏原生"
      },
      {
        "from": "blackwell_fp4",
        "to": "rubin_gpu",
        "label": "NVFP4演进"
      },
      {
        "from": "tpu_v4",
        "to": "tpu_v7",
        "label": "双芯粒扩展"
      },
      {
        "from": "rram_cim_survey",
        "to": "intel_18a_cim",
        "label": "数字CIM工业化"
      },
      {
        "from": "rram_cim_survey",
        "to": "reram_mlc_cim",
        "label": "MLC多级存算"
      },
      {
        "from": "isaac",
        "to": "mpu_pim",
        "label": "通用PIM接口"
      },
      {
        "from": "cerebras_wse",
        "to": "moentwine",
        "label": "晶圆级MoE"
      },
      {
        "from": "ampere_24_sparsity",
        "to": "atropos",
        "label": "稀疏处理器"
      },
      {
        "from": "bnn",
        "to": "fp4_training",
        "label": "极低精度训练"
      },
      {
        "from": "tvm",
        "to": "fuseflow",
        "label": "稀疏融合编译"
      },
      {
        "from": "hopper_fp8",
        "to": "sageattention3",
        "label": "FP4注意力"
      },
      {
        "from": "rubin_gpu",
        "to": "nvidia_ising",
        "label": "量子混合加速"
      },
      {
        "from": "intel_18a_cim",
        "to": "flare_chiplet",
        "label": "CIM芯粒融合"
      },
      {
        "from": "rebellions_chiplet",
        "to": "flare_chiplet",
        "label": "异构芯粒"
      },
      {
        "from": "flare_chiplet",
        "to": "deepstack_3d",
        "label": "3D堆叠扩展"
      },
      {
        "from": "moentwine",
        "to": "diamond_moe",
        "label": "边缘MoE下沉"
      },
      {
        "from": "fp4_training",
        "to": "sageattention3",
        "label": "FP4生态互补"
      },
      {
        "from": "lightmatter_passage",
        "to": "tpu_v7",
        "label": "光互连赋能"
      }
    ],
    "milestones": [
      "systolic_array",
      "tpu_v1",
      "volta_tensor_core"
    ]
  },
  "algos": [
    {
      "id": "cuda",
      "num": 1,
      "name": "CUDA",
      "fullName": "统一计算设备架构 (Compute Unified Device Architecture)",
      "year": "2008",
      "org": "NVIDIA",
      "parent": "—",
      "paperUrl": "—",
      "projectUrl": "",
      "category": "gpu_architecture",
      "motivation": "将GPU转变为通用并行计算平台",
      "summary": "CUDA 提出了面向 NVIDIA GPU 的通用并行编程与执行模型，把图形处理器从固定图形流水线扩展为可编程的大规模数据并行计算平台。它通过线程层次、SIMT 执行、显式内存层次和运行时 API，解决了早期 GPGPU 必须伪装成图形渲染任务、编程门槛高且性能不可控的问题。",
      "keyPoints": [
        "线程层次：Thread → Block/CTA → Grid，Block 内线程可同步并共享片上 shared memory",
        "SIMT 执行模型：一个 warp 内多线程共享指令流，按线程谓词处理分支分歧",
        "显式内存层次：register、shared memory、global memory、constant/texture memory 分工明确",
        "软件栈：CUDA C/C++、运行时 API、驱动 API、PTX 虚拟 ISA 和设备二进制共同构成可移植编程接口",
        "性能核心：通过合并访存、占用率、线程块调度和 shared memory tiling 暴露 GPU 并行能力",
        "生态意义：为后续 cuBLAS、cuDNN、Tensor Core、NCCL 以及深度学习框架 GPU 后端奠定基础"
      ],
      "detail": "<h5>核心示意图</h5>\n<p><img alt=\"CUDA SIMT 执行与内存层次示意\" src=\"https://placehold.co/900x420/png?text=CUDA+Grid+Block+Thread+SIMT+Memory\" />\n<em>图：基于 NVIDIA CUDA Programming Guide 整理的 CUDA 线程层次和内存层次示意；官方资料以线程块、网格和 shared/global memory 作为核心抽象。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-cuda\">// CUDA tiled GEMM 伪代码：用 shared memory 降低全局内存访问\n__global__ void matmul(float* A, float* B, float* C, int N) {\n    __shared__ float As[T][T], Bs[T][T];\n    int row = blockIdx.y * T + threadIdx.y;\n    int col = blockIdx.x * T + threadIdx.x;\n    float acc = 0.0f;\n\n    for (int tile = 0; tile &lt; N; tile += T) {\n        As[threadIdx.y][threadIdx.x] = A[row * N + tile + threadIdx.x];\n        Bs[threadIdx.y][threadIdx.x] = B[(tile + threadIdx.y) * N + col];\n        __syncthreads();\n        for (int k = 0; k &lt; T; k++) acc += As[threadIdx.y][k] * Bs[k][threadIdx.x];\n        __syncthreads();\n    }\n    C[row * N + col] = acc;\n}\n</code></pre>\n<p>CUDA 的关键动机是把 GPU 上大量算术单元暴露给通用程序。早期 GPGPU 需要把矩阵或数组编码成纹理，再通过 shader 完成计算，开发者必须绕过图形 API 的限制。CUDA 将核心抽象改成 kernel、thread、block 和 grid，使程序员直接表达数据并行任务，硬件调度器则把 block 映射到 SM 上执行。</p>\n<p>SIMT 是 CUDA 与传统 SIMD 的重要区别。程序员写的是标量线程代码，但硬件按 warp 成组发射指令；当 warp 内线程走不同分支时，硬件通过 active mask 分阶段执行不同路径。因此高性能 CUDA 程序要尽量减少 warp divergence，并让相邻线程访问连续地址以形成 coalesced memory transaction。</p>\n<p>CUDA 也把内存层次变成性能优化对象。global memory 容量大但延迟高，shared memory 容量小但可由 block 内线程协作复用，register 保存线程私有状态。矩阵乘法、卷积和 stencil 等算法通常先把数据 tile 到 shared memory，再在片上复用多次，从而把带宽瓶颈转化为更高算术强度。</p>\n<p>与 CPU 线程模型相比，CUDA 不追求少量复杂线程的低延迟，而是依靠海量轻量线程隐藏访存延迟。当某个 warp 等待内存时，SM 可切换到其他 ready warp。这个设计让 GPU 成为深度学习训练和推理的主平台，也解释了后续 Tensor Core、NCCL 和 CUDA Graph 等能力都围绕 CUDA 执行模型演进。</p>",
      "quiz": {
        "q": "CUDA 中 shared memory 的主要作用是什么？",
        "options": [
          "在 block 内缓存并复用数据，减少 global memory 访问",
          "替代所有寄存器保存线程私有变量",
          "自动完成跨 GPU 的 RDMA 通信",
          "让 CPU 直接执行 GPU kernel"
        ],
        "answer": 0,
        "explain": "shared memory 是 SM 上的片上存储，可被同一 block 的线程共享，常用于 tiling 和数据复用。"
      }
    },
    {
      "id": "volta_tensor_core",
      "num": 2,
      "name": "Volta Tensor Core",
      "fullName": "Volta张量核心架构 (Volta Tensor Core Architecture)",
      "year": "2017",
      "org": "NVIDIA",
      "parent": "cuda",
      "paperUrl": "https://arxiv.org/abs/1803.04432",
      "projectUrl": "",
      "category": "gpu_architecture",
      "motivation": "引入Tensor Core实现硬件级矩阵运算",
      "summary": "Volta Tensor Core 把深度学习中的小块矩阵乘加提升为 GPU SM 内的专用硬件原语，用 FP16 乘法、FP32/FP16 累加的 MMA 数据通路解决传统 CUDA core 执行 GEMM/卷积时吞吐和能效不足的问题。它是 NVIDIA 后续 TF32、BF16、FP8 等低精度 AI 计算路线的起点。",
      "keyPoints": [
        "每个 Volta SM 集成 8 个 Tensor Core；Tesla V100 全芯片 640 个 Tensor Core，面向矩阵乘加而非标量 FMA 优化",
        "硬件执行 <span class=\"kb-math kb-math-inline\">D=A\\times B+C</span> 的小矩阵 MMA 操作，典型输入为 FP16，乘积累加可进入 FP32 累加器",
        "CUDA 暴露 WMMA API 和 <code>mma</code> 指令族，开发者以 warp 级 matrix fragment 组织 <code>load_matrix_sync</code>、<code>mma_sync</code>、<code>store_matrix_sync</code>",
        "混合精度训练保留 FP32 master weights，使用 loss scaling 缓解 FP16 梯度下溢，同时把 GEMM/Conv 主算子交给 Tensor Core",
        "cuBLAS/cuDNN 把卷积和矩阵乘自动映射为 Tensor Core tile，但需要满足尺寸、对齐、数据布局和数学模式约束",
        "与 Pascal/传统 CUDA core 相比，Volta 的创新是把 AI 主算子做成专用矩阵 datapath，而不是单纯堆叠更多通用浮点单元"
      ],
      "detail": "<h5>核心示意图</h5>\n<p><img alt=\"Volta 混合精度训练中的 FP16 梯度范围\" src=\"https://developer-blogs.nvidia.com/wp-content/uploads/2017/10/ssd_ag_log_histo_coarse.png\" />\n<em>图：NVIDIA Mixed Precision Training Guide 中的梯度分布示意，展示部分 FP32 梯度直接转 FP16 会落到可表示范围之外，因此需要 loss scaling 与 FP32 master weights 配合 Tensor Core 使用。</em></p>\n<p>Volta 之前的 GPU 虽然已经能高效执行 FP32/FP64 标量或向量 FMA，但深度学习训练中的热点并不是孤立的标量运算，而是 GEMM、卷积和后来的 attention 投影矩阵。若仍把这些算子拆成大量独立 CUDA core FMA，硬件需要在寄存器、调度器和指令发射上重复付出开销。Tensor Core 的设计把一个矩阵 tile 作为单条硬件级操作，让乘法阵列和加法树在 Tensor Core 内部完成，从而提高单位面积和单位功耗的有效矩阵吞吐。</p>\n<p>Volta Tensor Core 的基本语义可以写成：</p>\n<div class=\"kb-math kb-math-display\">D_{m,n}=C_{m,n}+\\sum_{k=0}^{K-1}A_{m,k}B_{k,n}</div>\n<p>在 Volta 的典型深度学习路径中，<span class=\"kb-math kb-math-inline\">A</span> 与 <span class=\"kb-math kb-math-inline\">B</span> 以 FP16 输入进入 Tensor Core，乘法结果以更高精度累加，最后写回 FP16 或 FP32。直觉上，FP16 负责降低读写带宽和提高乘法密度，FP32 累加负责保护长点积中的有效位；如果把整个训练过程都压成 FP16，梯度下溢和权重更新舍入会迅速破坏收敛。</p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># Volta Tensor Core / WMMA 风格 GEMM tile 伪代码\n# C[M, N] += A[M, K] @ B[K, N]\nfor block_m, block_n in cta_tiles(M, N):\n    acc = zeros(fragment_shape=(16, 16), dtype=fp32)\n\n    for block_k in range(0, K, 16):\n        a_frag = wmma_load_matrix_sync(\n            A[block_m:block_m+16, block_k:block_k+16],\n            dtype=fp16,\n            layout=&quot;row_major&quot;,\n        )\n        b_frag = wmma_load_matrix_sync(\n            B[block_k:block_k+16, block_n:block_n+16],\n            dtype=fp16,\n            layout=&quot;col_major&quot;,\n        )\n        acc = wmma_mma_sync(a_frag, b_frag, acc)  # Tensor Core MMA\n\n    wmma_store_matrix_sync(C[block_m:block_m+16, block_n:block_n+16], acc)\n</code></pre>\n<p>真正的性能来自分层 tiling，而不是仅把数据类型改成 FP16。CTA 先把全局内存中的矩阵块搬到 shared memory，再由每个 warp 把 tile 载入寄存器 fragment，最后发射 <code>mma_sync</code> 到 Tensor Core。这个流程要求矩阵维度、leading dimension、内存对齐和 layout 能匹配库或 kernel 的 tile 形状；若矩阵太小、维度不对齐、访存无法 coalesce，Tensor Core 的峰值吞吐会被访存和调度开销吞掉。</p>\n<p>混合精度训练还需要一套数值保护机制。NVIDIA 的典型 recipe 是：前向和反向中的 GEMM/Conv 使用 FP16 Tensor Core，权重主副本保留 FP32，梯度在反向传播前乘以 loss scale，优化器更新前再反缩放。其核心过程可表示为：</p>\n<div class=\"kb-math kb-math-display\">\\tilde{L}=S\\cdot L,\\quad\n\\tilde{g}=\\frac{\\partial \\tilde{L}}{\\partial w}=S\\cdot g,\\quad\ng=\\tilde{g}/S</div>\n<p>这里 <span class=\"kb-math kb-math-inline\">S</span> 是 loss scale。它不改变数学上的梯度方向，只是把小梯度移入 FP16 可表示范围，避免反向传播早期被 flush-to-zero。若检测到溢出，动态 loss scaling 会降低 <span class=\"kb-math kb-math-inline\">S</span>；若连续若干 step 稳定，则逐步增大 <span class=\"kb-math kb-math-inline\">S</span>，在吞吐和稳定性之间找平衡。</p>\n<p>与传统 CUDA core 的差异可以概括为 ISA 抽象层级的变化。CUDA core 暴露的是标量/向量 FMA，编译器和库要在软件层重构矩阵乘；Tensor Core 暴露的是矩阵块 FMA，硬件天然知道一次操作内部的 <span class=\"kb-math kb-math-inline\">m\\times n\\times k</span> 结构。后续 Ampere 的 TF32/BF16/稀疏 Tensor Core、Hopper 的 FP8 Transformer Engine 都是在这个“矩阵块作为硬件原语”的基础上继续扩展输入格式、压缩方式和自动精度控制。</p>\n<div class=\"key-point\">💡 关键：Volta Tensor Core 的价值不是“FP16 更快”这么简单，而是把低精度乘法、高精度累加、warp 级 tile 编程和库级 kernel 调度结合成一条完整 AI 数据路径。</div>",
      "quiz": {
        "q": "Volta Tensor Core 混合精度训练为什么通常保留 FP32 master weights？",
        "options": [
          "因为 Tensor Core 只能读取 FP32 权重",
          "因为优化器长期累积的小更新对舍入误差敏感，FP32 主权重能保持训练稳定",
          "因为 FP16 只能用于推理，不能用于训练前向传播",
          "因为 loss scaling 会把所有梯度永久变成整数"
        ],
        "answer": 1,
        "explain": "Tensor Core 可用 FP16 提高 GEMM/Conv 吞吐，但权重更新和优化器状态需要更高精度来避免小更新被舍入吞掉。"
      }
    },
    {
      "id": "ampere_sparse",
      "num": 3,
      "name": "Ampere 2:4 Sparsity",
      "fullName": "安培结构化稀疏架构 (Ampere Structured Sparsity)",
      "year": "2020",
      "org": "NVIDIA",
      "parent": "volta_tensor_core",
      "paperUrl": "https://www.nvidia.com/content/dam/en-zz/Solutions/Data-Center/nvidia-ampere-architecture-whitepaper.pdf",
      "projectUrl": "",
      "category": "gpu_architecture",
      "motivation": "硬件级2:4结构化稀疏与TF32格式",
      "summary": "Ampere 在第三代 Tensor Core 中同时引入 TF32 和 2:4 结构化稀疏：前者让 FP32 训练无需大改代码即可走 Tensor Core，后者用“每 4 个权重保留 2 个”的规则稀疏换取可被硬件稳定解码的近 2 倍矩阵乘吞吐。它解决了非结构化剪枝虽稀疏但难以高效映射到 SIMD/SIMT 硬件的问题。",
      "keyPoints": [
        "TF32 使用与 FP32 相同的 8-bit exponent、较短的 10-bit mantissa，Tensor Core 内部乘法按 TF32 执行、累加保持 FP32",
        "2:4 结构化稀疏要求权重在固定连续 4 元组内最多 2 个非零值，稀疏值和元数据一起送入 Sparse Tensor Core",
        "Sparse Tensor Core 跳过被剪掉的权重乘法，在满足数据类型、布局和对齐条件时，理论矩阵乘吞吐相对稠密 Tensor Core 接近翻倍",
        "典型工作流是 dense pretrain 或加载预训练权重 → magnitude pruning 生成 2:4 mask → 带 mask 微调恢复精度 → 压缩编码推理",
        "2:4 约束通常施加在 GEMM/Conv 权重矩阵的 reduction 维，必须和 cuSPARSELt/cuBLASLt 等库的布局约定一致",
        "相比任意非结构化稀疏，2:4 牺牲一部分模式自由度，换来固定元数据宽度、规则访存和可预测的硬件调度"
      ],
      "detail": "<h5>核心示意图</h5>\n<p><img alt=\"Ampere 2:4 结构化稀疏模式\" src=\"https://developer-blogs.nvidia.com/wp-content/uploads/2023/06/2-4-structured-sparsity-pattern.png\" />\n<em>图：NVIDIA Developer Blog 展示的 2:4 结构化稀疏模式；每个连续 4 元组中只有 2 个非零权重参与 Tensor Core 乘法，剩余位置由元数据编码。</em></p>\n<p>Ampere 的稀疏 Tensor Core 是一次典型的软硬件协同折中。非结构化剪枝可以在全矩阵中任意保留权重，算法自由度最高，但硬件必须处理变长索引、随机访存和线程间负载不均；块稀疏更规则，却可能因为粒度太粗而明显损失模型精度。2:4 模式把自由度限制在局部 4 元组内，使每个小组的非零数量固定，硬件只需读取两个数值和少量位置元数据，就能在 Tensor Core datapath 中跳过一半乘法。</p>\n<p>2:4 约束可写成：</p>\n<div class=\"kb-math kb-math-display\">\\forall i,\\quad\ng_i=(w_{4i},w_{4i+1},w_{4i+2},w_{4i+3}),\\quad\n\\|g_i\\|_0\\le 2</div>\n<p>推理时，压缩权重不再保存完整四元组，而是保存两个非零值 <span class=\"kb-math kb-math-inline\">v_0,v_1</span> 以及它们在四元组中的位置元数据 <span class=\"kb-math kb-math-inline\">m_i</span>。Sparse Tensor Core 根据 <span class=\"kb-math kb-math-inline\">m_i</span> 选择输入激活中对应的两项相乘并累加。因为每组都恰好对应固定数量的乘法，warp 内工作量可预测，调度器不需要处理任意稀疏矩阵中常见的行长不均问题。</p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># Ampere 2:4 pruning + sparse Tensor Core inference 伪代码\ndef prune_2_4(weight):\n    mask = zeros_like(weight)\n    for row in range(weight.rows):\n        for col in range(0, weight.cols, 4):\n            group = weight[row, col:col+4]\n            keep = topk(abs(group), k=2).indices\n            mask[row, col + keep] = 1\n    return weight * mask, mask\n\nweight_sparse, mask = prune_2_4(weight_dense)\nfor step in finetune_steps:\n    loss = model.forward(batch, weight=weight_sparse)\n    loss.backward()\n    weight_dense = optimizer.step(weight_dense)\n    weight_sparse = weight_dense * mask  # 固定 2:4 结构恢复精度\n\nvalues, metadata = encode_sparse_2_4(weight_sparse)\noutput = sparse_tensor_core_gemm(activation, values, metadata)\n</code></pre>\n<p>TF32 是 Ampere 另一条关键路径，它解决的是“用户不想重写 FP32 训练代码，但又想利用 Tensor Core”的迁移问题。TF32 保留 FP32 的指数范围，因此对溢出/下溢的行为更接近 FP32；同时缩短尾数，把乘法输入压到 Tensor Core 更适合的低精度格式。简化表示为：</p>\n<div class=\"kb-math kb-math-display\">\\mathrm{TF32}(x)=\\mathrm{round}_{10\\text{-bit mantissa}}(x),\\quad\nC \\leftarrow C + \\mathrm{TF32}(A)\\times \\mathrm{TF32}(B)</div>\n<p>这意味着 FP32 GEMM/Conv 在默认数学模式下可获得 Tensor Core 加速，但并不等价于完整 FP32 乘法。对数值特别敏感的迭代求解、科学计算或验证场景，开发者仍需要显式选择更严格的数学模式；而对大多数深度学习训练，FP32 累加和随机优化的容错性使 TF32 成为低成本加速选项。</p>\n<p>2:4 稀疏的训练/部署收益并非无条件成立。首先，模型必须能承受固定模式剪枝：常见做法是按绝对值保留每个四元组中最大的两个权重，再进行若干 epoch 微调。其次，矩阵形状必须足够大且布局满足库约束，否则压缩、元数据读取和重排开销会抵消理论收益。最后，并不是所有算子都适合稀疏化，LayerNorm、Softmax、小 batch 小矩阵以及通信密集阶段通常不是 Sparse Tensor Core 的主要受益者。</p>\n<p>从 Volta 到 Ampere 的变化，可以看作 Tensor Core 从“低精度矩阵乘硬件”扩展为“模型表示约束的执行硬件”。Volta 关心 FP16 输入和 FP32 累加；Ampere 进一步把 TF32 的用户透明性和 2:4 的压缩结构纳入 ISA/库路径。算法侧必须接受局部稀疏约束，硬件侧才能用固定元数据和规则 datapath 给出稳定吞吐。</p>\n<div class=\"warn-box\">⚠️ 注意：2:4 的“2 倍”主要指满足条件的矩阵乘吞吐上限；端到端模型速度还受非稀疏算子、内存带宽、batch size、kernel fusion 和数据布局转换影响。</div>",
      "quiz": {
        "q": "Ampere 2:4 结构化稀疏比任意非结构化稀疏更容易硬件加速的根本原因是什么？",
        "options": [
          "它完全不需要保存权重值",
          "它让每个固定 4 元组的非零数量已知，硬件可用固定元数据和规则调度跳过乘法",
          "它只适用于 CPU 上的标量矩阵乘",
          "它会自动让所有模型精度高于稠密模型"
        ],
        "answer": 1,
        "explain": "2:4 把非零位置限制在局部固定窗口内，Sparse Tensor Core 可以用少量元数据选择两项有效乘法，避免任意稀疏带来的不规则访存和负载不均。"
      }
    },
    {
      "id": "hopper_fp8",
      "num": 4,
      "name": "Hopper FP8",
      "fullName": "Hopper FP8变换引擎 (Hopper Transformer Engine)",
      "year": "2022",
      "org": "NVIDIA",
      "parent": "ampere_sparse",
      "paperUrl": "https://www.nvidia.com/en-us/data-center/hopper-architecture/",
      "projectUrl": "",
      "category": "gpu_architecture",
      "motivation": "Transformer Engine支持FP8动态精度",
      "summary": "Hopper Transformer Engine 把 FP8 作为 Tensor Core 训练/推理格式引入 Transformer 主路径，并用 E4M3/E5M2 双格式与动态 scaling 管理不同张量的数值范围。它解决了大模型 GEMM 占比高、显存带宽紧张、但纯低精度训练容易失稳的问题。",
      "keyPoints": [
        "第四代 Tensor Core 支持 FP8、FP16、BF16、TF32、FP64 等格式，FP8 路径重点服务 Transformer 中的 QKV、MLP 和投影 GEMM",
        "FP8 包含 E4M3 与 E5M2 两种编码：E4M3 精度更高、动态范围较小，E5M2 动态范围更大、尾数更少",
        "Transformer Engine 在层级跟踪 activation/weight/gradient 的 amax 历史，并据此维护 scale，把真实张量映射到 FP8 可表示区间",
        "FP8 通常用于 GEMM 输入和部分缓存，累加、归一化、softmax、优化器状态等数值敏感环节保留 BF16/FP16/FP32",
        "NVIDIA Transformer Engine 软件栈通过 recipe、amax history、delayed scaling、cuBLASLt kernel 和框架集成隐藏大部分量化细节",
        "相比 Ampere 的 TF32/2:4，Hopper FP8 更依赖运行时统计和自动精度策略，是硬件 Tensor Core 与训练框架协同控制的低精度方案"
      ],
      "detail": "<h5>核心示意图</h5>\n<p><img alt=\"NVIDIA Hopper FP8 格式与 Tensor Core 数据通路\" src=\"https://developer-blogs.nvidia.com/wp-content/uploads/2022/03/New-Hopper-FP8-Precisions-625x340.jpg\" />\n<em>图：NVIDIA Developer Blog 中的 Hopper FP8 格式和 Tensor Core 数据通路示意；E4M3/E5M2 输入可在 Tensor Core 中乘加并累加到 FP32 或 FP16。</em></p>\n<p>FP8 的挑战不是“把 FP16 缩短一半”这么简单。Transformer 中权重、激活、注意力 logits、MLP 中间值和反向梯度的分布差异很大，而且训练过程中还会随 step 漂移。若使用固定全局量化尺度，某些层会溢出，另一些层又会把大量小值舍入为零。Hopper 的 Transformer Engine 因此把 FP8 做成动态系统：硬件提供 FP8 Tensor Core，软件持续统计 amax，框架按 recipe 决定哪些张量降到 FP8、哪些保持高精度。</p>\n<p>E4M3 与 E5M2 对应两种数值取舍。E4M3 用 4 位 exponent、3 位 mantissa，表示精度相对更好，适合前向传播中的权重和激活；E5M2 用 5 位 exponent、2 位 mantissa，动态范围更宽，适合反向传播中分布跨度更大的梯度。可用直觉公式表示：</p>\n<div class=\"kb-math kb-math-display\">\\text{E4M3}: 1\\text{ sign}+4\\text{ exponent}+3\\text{ mantissa},\\quad\n\\text{E5M2}: 1\\text{ sign}+5\\text{ exponent}+2\\text{ mantissa}</div>\n<p>Transformer Engine 的 scaling 机制通常围绕 amax history 工作。设某个张量最近窗口内的最大绝对值为 <span class=\"kb-math kb-math-inline\">\\operatorname{amax}</span>，FP8 格式的最大可表示有限值为 <span class=\"kb-math kb-math-inline\">F_{\\max}</span>，则缩放因子可以抽象为：</p>\n<div class=\"kb-math kb-math-display\">s=\\frac{F_{\\max}}{\\operatorname{amax}\\cdot 2^{m}},\\quad\nq=Q_{\\mathrm{FP8}}(x\\cdot s),\\quad\n\\hat{x}=q/s</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">m</span> 是 margin，<span class=\"kb-math kb-math-inline\">Q_{\\mathrm{FP8}}</span> 是舍入到 E4M3 或 E5M2 的量化算子。这个公式表达了核心直觉：先把当前张量按 scale 放进 FP8 可表示范围，再在 GEMM 前以 FP8 参与 Tensor Core 计算，必要时在输出或后续算子处反量化/转换回更高精度。</p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># Hopper Transformer Engine FP8 delayed scaling 伪代码\nfor layer in transformer.layers:\n    # 1. 根据历史 amax 更新下一次使用的 scale\n    x_amax = max_abs(layer.input)\n    w_amax = max_abs(layer.weight)\n    layer.x_history.push(x_amax)\n    layer.w_history.push(w_amax)\n    x_scale = fp8_max(&quot;E4M3&quot;) / (max(layer.x_history) * 2**margin)\n    w_scale = fp8_max(&quot;E4M3&quot;) / (max(layer.w_history) * 2**margin)\n\n    # 2. 前向 GEMM：权重和激活多用 E4M3，累加保持高精度\n    x_fp8 = quantize(layer.input * x_scale, format=&quot;E4M3&quot;)\n    w_fp8 = quantize(layer.weight * w_scale, format=&quot;E4M3&quot;)\n    y = tensor_core_gemm(x_fp8, w_fp8, accumulate=&quot;FP16/BF16&quot;)\n\n    # 3. 反向 GEMM：梯度常用动态范围更大的 E5M2\n    if training:\n        dy_amax = max_abs(layer.grad_output)\n        dy_scale = fp8_max(&quot;E5M2&quot;) / (dy_amax * 2**margin)\n        dy_fp8 = quantize(layer.grad_output * dy_scale, format=&quot;E5M2&quot;)\n        dx, dw = tensor_core_backward_gemm(dy_fp8, x_fp8, w_fp8)\n</code></pre>\n<p>实际训练并不会把整张计算图都改成 FP8。矩阵乘是 Transformer 的算力和带宽大头，所以最值得压低精度；LayerNorm、Softmax、残差加法、优化器状态和部分归约对数值误差更敏感，通常保留 BF16/FP16/FP32。这样的混合策略让 FP8 主要承担“高吞吐可容错”的部分，把“误差会被放大”的部分留给更高精度。</p>\n<p>Hopper 的 FP8 路径与 Ampere 的 TF32 有本质区别。TF32 主要是对 FP32 GEMM 的输入舍入，使用体验接近透明；FP8 则需要明确的量化尺度、格式选择和 amax 统计，否则 8 bit 表示范围很容易失控。也因此，Transformer Engine 不只是硬件单元名称，更是一套跨 Tensor Core、cuBLASLt、框架模块和训练 recipe 的自动精度控制机制。</p>\n<p>在推理中，FP8 的价值还包括显存容量和带宽。大语言模型的权重和 KV/中间激活占用巨大，FP8 能减少读写量并提高批处理吞吐；但推理也要决定哪些层可 FP8、输出 logits 是否保留更高精度、是否需要校准集确定 scale。对训练而言，FP8 通常与 BF16 optimizer state、梯度缩放、分布式通信压缩等系统技巧一起出现，端到端收益取决于 GEMM 占比、序列长度、并行策略和 kernel fusion。</p>\n<div class=\"key-point\">💡 关键：Hopper FP8 的核心不是单个 8-bit 格式，而是“按张量统计范围、按阶段选择格式、按算子保留高精度”的动态混合精度闭环。</div>",
      "quiz": {
        "q": "Hopper Transformer Engine 为什么需要动态 scale，而不是固定一个全局 FP8 缩放因子？",
        "options": [
          "因为不同层、不同张量和不同训练阶段的数值范围差异很大，固定 scale 容易溢出或下溢",
          "因为 FP8 Tensor Core 只能执行整数加法",
          "因为 E4M3 和 E5M2 都没有 exponent 位",
          "因为动态 scale 会删除所有 LayerNorm 计算"
        ],
        "answer": 0,
        "explain": "FP8 表示范围有限，Transformer Engine 通过 amax history 和 scale 把每个张量映射到合适区间，从而在吞吐和训练稳定性之间折中。"
      }
    },
    {
      "id": "blackwell_fp4",
      "num": 5,
      "name": "Blackwell FP4",
      "fullName": "Blackwell FP4架构 (Blackwell FP4 Architecture)",
      "year": "2025",
      "org": "NVIDIA",
      "parent": "hopper_fp8",
      "paperUrl": "https://arxiv.org/abs/2507.10789",
      "projectUrl": "",
      "category": "gpu_architecture",
      "motivation": "FP4精度与专用解压引擎优化万亿参数模型",
      "summary": "Blackwell FP4 的核心贡献是把 Tensor Core 的低精度路径从 Hopper 的 FP8 扩展到 FP4/FP6，并用微块缩放、专用矩阵指令与软件栈协同降低大模型推理和训练的显存/带宽压力。它解决的不是“简单把数值截成 4 bit”，而是在 4 bit 表示能力极弱的条件下，让缩放、反量化、矩阵乘和高精度累加在硬件路径中形成可用闭环。",
      "keyPoints": [
        "arXiv 论文《Dissecting the NVIDIA Blackwell Architecture with Microbenchmarks》用 RTX 5080 的 GB203 与 Hopper H100 PCIe 的 GH100 做微架构对比，覆盖 SM 执行单元、缓存、Tensor Core、功耗和 Transformer 推理案例",
        "Blackwell 第五代 Tensor Core 新增 FP4、FP6、FP8 等低精度 MMA 数据路径；论文观测到 CUDA/PTX 低精度矩阵指令会落到 QMMA/OMMA 等 SASS 指令",
        "FP4 的常用 E2M1 只有符号位、2 位指数和 1 位尾数，必须配合 micro-block scaling 才能覆盖 Transformer 权重和激活的局部动态范围",
        "NVFP4 相比 MXFP4 使用更细粒度的 16 元素块和 FP8 E4M3 scale，并可叠加 per-tensor FP32 scale，核心重构关系为 <span class=\"kb-math kb-math-inline\">x \\approx q_{E2M1}\\times s_{block}\\times s_{tensor}</span>",
        "论文实测显示 Blackwell 在低精度 Tensor Core 路径上更偏向高 ILP、少 warp 也能保持较好调度效率，而 Hopper 依赖更深的并发和缓冲来填满执行单元",
        "NVIDIA 官方 Blackwell 文档中的 Decompression Engine 主要服务 LZ4/Snappy/Deflate 等数据分析压缩格式；FP4 权重的解包/缩放更准确地理解为 Tensor Core/Transformer Engine 低精度数据路径的一部分",
        "对万亿参数模型，FP4 的实际收益来自“容量、带宽、算力密度”三者同时下降成本：权重和部分中间张量更小，HBM 读写更少，Tensor Core 每周期可完成更多低精度乘加"
      ],
      "detail": "<h5>核心示意图</h5>\n<p><img alt=\"Blackwell 与 Hopper 低精度 Tensor Core 吞吐对比\" src=\"https://arxiv.org/html/2507.10789v2/extracted/6641483/Content/images/blackwellXhopper_throughput_avg.png\" />\n<em>图：arXiv 2507.10789v2 Figure 4，展示 GB203 与 GH100 在不同低精度格式和 warp 数下的 Tensor Core 吞吐。来源为 arXiv HTML 图片直链。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># NVFP4 / Blackwell Tensor Core 推理路径的简化逻辑\ndef quantize_nvfp4(tensor, block_size=16):\n    q_blocks, scales = [], []\n    s_tensor = choose_global_fp32_scale(tensor)\n    normalized = tensor / s_tensor\n\n    for block in split_consecutive(normalized, block_size):\n        # FP8 E4M3 scale 比 MXFP4 的 E8M0 scale 更能贴合局部分布\n        s_block = choose_fp8_e4m3_scale(block)\n        q = round_to_e2m1_fp4(block / s_block, stochastic=False)\n        q_blocks.append(pack_4bit(q))\n        scales.append(s_block)\n\n    return q_blocks, scales, s_tensor\n\ndef blackwell_fp4_matmul(a_fp4, b_fp4, sa, sb, sga, sgb):\n    acc = zeros(dtype=&quot;fp32&quot;)\n    for k_block in reduction_blocks(a_fp4, b_fp4):\n        # 解包、局部 scale 应用和 MMA 贴近 Tensor Core 输入路径完成\n        a = unpack_e2m1(a_fp4[k_block]) * sa[k_block] * sga\n        b = unpack_e2m1(b_fp4[k_block]) * sb[k_block] * sgb\n        acc += tensor_core_mma(a, b, accumulate=&quot;fp32&quot;)\n    return cast_for_next_layer(acc, dtype=&quot;bf16/fp8&quot;)\n</code></pre>\n<p>FP4 的难点首先是数值格式本身。以 E2M1 为例，4 bit 需要同时编码符号、指数和尾数，可表达的离散值很少，直接把 FP16/BF16 权重量化为 FP4 会让离群通道被截断，注意力层和 MLP 层的误差会快速累积。因此 Blackwell FP4 不是单一格式，而是“低比特值 + 缩放元数据 + 高精度累加”的组合；其基本重构可写成：</p>\n<div class=\"kb-math kb-math-display\">x \\approx q_{E2M1}\\cdot s_{block}\\cdot s_{tensor},\\qquad q_{E2M1}\\in[-6,6]</div>\n<p>NVFP4 的关键是把缩放粒度做小。MXFP4 通常为 32 个值共享一个粗粒度 scale，而 NVFP4 使用 16 个值共享一个 FP8 E4M3 scale，使每个微块都能贴合局部最大值和分布形状。块越小，量化误差越低，但 scale 元数据、加载对齐和反量化逻辑越复杂；Blackwell 的价值就在于让这些操作由 Tensor Core 相关数据路径吸收，而不是把开销外溢到普通 CUDA core。</p>\n<p>从矩阵乘角度看，低精度收益只有在 reduction 维度连续、scale 加载可复用、MMA tile 与 packed FP4 布局匹配时才能兑现。论文在 PTX 层用 <code>mma.sync.aligned.kind::f8f6f4</code> 这类指令族测试 E2M1、E3M2、E2M3、E4M3、E5M2 等格式，并观察生成的 SASS 指令。这个结果说明 Blackwell 的 FP4 支持不是库层面的模拟，而是已经进入第五代 Tensor Core 指令映射，只是软件栈在不同格式和 block scaling 组合上仍有演进空间。</p>\n<p>论文的吞吐/延迟图还揭示了调度层面的差异：GB203 在低精度 Tensor Core 测试中可用更高的指令级并行度弥补较少 warp 的并发，表现为吞吐随 ILP 提升更平滑；GH100 则更依赖大量活跃 warp 和更深的缓冲来隐藏延迟。这对 kernel 作者很重要：Blackwell FP4 kernel 不应只照搬 Hopper FP8 的 tile 和流水配置，而要同时调优 packed 数据布局、shared memory staging、scale 预取和独立 MMA 指令数量。</p>\n<p>对 LLM 推理来说，FP4 主要缓解 decode 阶段的内存墙。一个近似性能模型是：</p>\n<div class=\"kb-math kb-math-display\">T_{token}\\approx \\max\\left(\\frac{F_{layer}}{P_{TC,FP4}},\\frac{B_{weights}+B_{kv}+B_{scale}}{BW_{HBM}}\\right)</div>\n<p>当 batch 较小、每 token 需要读取大量权重时，第二项通常主导；FP4 把权重字节数降到 FP16 的四分之一、FP8 的二分之一，但会额外引入 scale 元数据和解包路径。Blackwell 的微缩放 Tensor Core、Transformer Engine、TensorRT-LLM/NeMo 支持，目标就是让减少的 HBM 流量大于新增的 scale 与转换成本，从而提升吞吐和能效。</p>\n<div class=\"key-point\">💡 关键：<code>motivation</code> 中的“专用解压引擎”需要区分两类含义。Blackwell 官方 Decompression Engine 是面向数据库/数据分析压缩格式的硬件模块；FP4 模型权重的“解压”更准确是 packed FP4 解包、scale 应用和 Tensor Core MMA 输入转换。二者都在减少数据移动成本，但服务对象和数据路径不同。</div>\n<p>资料来源：arXiv 论文 https://arxiv.org/abs/2507.10789；NVIDIA Blackwell 架构页面 https://www.nvidia.com/en-us/data-center/technologies/blackwell-architecture/；NVIDIA NVFP4 技术博客 https://developer.nvidia.com/blog/introducing-nvfp4-for-efficient-and-accurate-low-precision-inference/；Transformer Engine 文档 https://docs.nvidia.com/deeplearning/transformer-engine/user-guide/examples/fp8_primer.html。</p>",
      "quiz": {
        "q": "Blackwell FP4/NVFP4 中 micro-block scale 的主要目的是什么？",
        "options": [
          "让少量 FP4 编码值匹配局部张量动态范围，降低量化误差",
          "把所有 Tensor Core 运算改成 CPU 解压缩",
          "完全取消 FP32/BF16 累加",
          "只用于提升 PCIe 主机到设备拷贝速度"
        ],
        "answer": 0,
        "explain": "FP4 可表达值很少，16 元素等细粒度 block scale 能把局部数值范围映射到 E2M1 网格；没有这个缩放机制，4 bit 量化误差会显著破坏模型质量。"
      }
    },
    {
      "id": "rubin_gpu",
      "num": 6,
      "name": "Rubin GPU",
      "fullName": "NVIDIA Rubin GPU架构 (NVIDIA Rubin GPU Architecture)",
      "year": "2026",
      "org": "NVIDIA",
      "parent": "blackwell_fp4",
      "paperUrl": "https://www.nvidia.com/en-us/about-nvidia/press-releases/2026/nvidia-vera-rubin-platform-agentic-ai/",
      "projectUrl": "",
      "category": "gpu_architecture",
      "motivation": "NVFP4精度50PFLOPS与HBM4推理能效跃升",
      "summary": "Rubin GPU 是 Blackwell 之后面向 agentic AI 的 NVIDIA 数据中心 GPU 架构，用 HBM4、第三代 Transformer Engine、NVFP4 和 NVLink 6 把单卡与整柜推理效率推到新的系统级平衡点。它解决的是长上下文、多轮推理、MoE 路由和小 batch 低延迟场景下“算力足够但内存/互连/调度跟不上”的问题。",
      "keyPoints": [
        "原始 <code>paper_url</code> 当前指向 NVIDIA 404；本文件以 NVIDIA Newsroom、NVIDIA Vera Rubin NVL72 产品页、NVIDIA Rubin 技术博客和 Rubin 技术页面等官方资料为等价解读来源",
        "Rubin GPU 官方规格为单 GPU 最高 50 PFLOPS NVFP4 inference、35 PFLOPS NVFP4 training、17.5 PFLOPS FP8/FP6 training、288 GB HBM4 和 22 TB/s HBM4 带宽",
        "Vera Rubin Superchip 由 2 颗 Rubin GPU 和 1 颗 Vera CPU 组成，合计 100 PFLOPS NVFP4 inference、576 GB HBM4、44 TB/s HBM4 带宽和 1.8 TB/s NVLink-C2C",
        "Vera Rubin NVL72 整柜包含 72 颗 Rubin GPU 与 36 颗 Vera CPU，官方列出 3,600 PFLOPS NVFP4 inference、20.7 TB HBM4、1,580 TB/s 聚合 HBM4 带宽",
        "NVLink 6 每 GPU 提供 3.6 TB/s all-to-all scale-up 带宽，整柜 NVLink Switch 带宽为 260 TB/s，并结合 SHARP 降低 collective 拥塞",
        "第三代 Transformer Engine 引入硬件加速 adaptive compression，以提高 NVFP4 吞吐同时保持精度，并兼容 Blackwell 已优化代码路径",
        "Vera CPU 使用 88 个 NVIDIA Olympus Arm-compatible cores，最高 1.5 TB LPDDR5X、1.2 TB/s CPU 内存带宽，并通过 1.8 TB/s NVLink-C2C 与 GPU 形成一致性内存池"
      ],
      "detail": "<h5>核心示意图</h5>\n<p><img alt=\"Vera Rubin NVL72 compute tray\" src=\"https://developer-blogs.nvidia.com/wp-content/uploads/2026/01/Figure-3-new-png.webp\" />\n<em>图：NVIDIA Technical Blog Figure 3，展示 Vera Rubin NVL72 compute tray，包含 Vera Rubin Superchip、NVLink 6 spine connector、BlueField-4 DPU、ConnectX-9 SuperNIC 和液冷机箱。来源为 NVIDIA 官方技术博客图片直链。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># Rubin NVFP4 长上下文 / MoE 推理的系统级数据流\ndef rubin_agentic_decode(requests, model, kv_pool):\n    batches = scheduler.group_by_latency_target(requests)\n\n    for step in autoregressive_steps(batches):\n        # Vera CPU 负责数据搬运、调度、网络协议和可选 KV cache offload\n        tokens, kv_pages = vera_cpu.prepare_step(batches, kv_pool)\n\n        # NVLink 6 保持 72-GPU 域内的低延迟 all-to-all / all-reduce\n        routed = nvlink6.route_moe_tokens(tokens, experts=model.experts)\n\n        # 第三代 Transformer Engine 执行 NVFP4/FP8 低精度矩阵路径\n        hidden = transformer_engine_nvfp4(\n            routed,\n            weights=model.weights_nvfp4,\n            scales=model.fp8_block_scales,\n            hbm=&quot;HBM4&quot;,\n            accumulate=&quot;FP32/BF16&quot;,\n        )\n\n        logits = nvlink6.collect_and_reduce(hidden)\n        batches.emit(sample_next_token(logits))\n</code></pre>\n<p>Rubin 的设计重心不是“单芯片峰值 FLOPS”本身，而是把算力、HBM4 带宽、GPU 间互连和 CPU 数据引擎一起调成 agentic workload 需要的形状。多轮 agent 请求会产生非确定性的工具调用、长会话历史、不断增长的 KV cache 和小 batch decode；这些特征会让传统大 batch 吞吐优化失效。Rubin 把 50 PFLOPS NVFP4 与 22 TB/s HBM4 绑定在一起，就是为了让权重读取、KV 读写和 Tensor Core 输入供给更接近同一数量级。</p>\n<p>推理 token 延迟可粗略写成：</p>\n<div class=\"kb-math kb-math-display\">T_{step}\\approx \\max\\left(\n\\frac{F_{attn}+F_{mlp}}{P_{NVFP4}},\n\\frac{B_{weights}+B_{kv}}{BW_{HBM4}},\n\\frac{B_{collective}}{BW_{NVLink6}}\n\\right)+T_{schedule}</div>\n<p>Blackwell 时代很多模型已经从“纯算力瓶颈”转向“内存和通信瓶颈”。Rubin 的 288 GB HBM4 容量让更大的 dense model、更多 MoE expert 或更长 KV cache 留在单 GPU/少数 GPU 域内；22 TB/s 单卡 HBM4 带宽降低权重流式读取成本；3.6 TB/s NVLink 6 则压低 tensor parallel、expert parallel 和 pipeline 边界处的 collective 时间。</p>\n<p>第三代 Transformer Engine 的作用是把 NVFP4 做成可部署的数值路径，而不是让用户手工管理每个矩阵的低比特误差。其核心机制可以抽象为：</p>\n<div class=\"kb-math kb-math-display\">Y = \\operatorname{MMA}_{TC}\\left(Q_{NVFP4}(X), Q_{NVFP4}(W), S_X, S_W\\right),\\qquad\nY_{acc}\\in\\mathrm{FP32/BF16}</div>\n<p>这里 <span class=\"kb-math kb-math-inline\">Q_{NVFP4}</span> 表示 4-bit 编码，<span class=\"kb-math kb-math-inline\">S_X,S_W</span> 是硬件/软件协同维护的缩放元数据。adaptive compression 的目标是对不同层、不同 tensor 或不同 token 阶段选择更合适的低精度表示，尽量把误差限制在模型可承受范围内，同时让 HBM4 和 Tensor Core 都保持高利用率。</p>\n<p>Vera CPU 是 Rubin 平台里容易被忽视但很关键的一环。官方技术博客把 Vera 定位为 AI factory 的 data engine：它用 88 个 Olympus cores、LPDDR5X 和 1.8 TB/s NVLink-C2C 处理数据 staging、调度、编排和控制密集路径。对长上下文推理，CPU-GPU 一致性内存可以把部分 KV cache、工具上下文或多模型数据结构放在更大的 LPDDR5X 池中，GPU 则把热路径留在 HBM4 内。</p>\n<p>NVLink 6 则把 Rubin 从“强单卡”扩展到“强机柜”。NVL72 内 72 颗 GPU 共享 scale-up 域，官方列出 260 TB/s NVLink 6 switch bandwidth；再结合 SHARP collective，可以把 all-reduce/all-to-all 这种通信从普通网络拥塞中拉出来。对 MoE，瓶颈常是 token-to-expert 路由和专家输出聚合，NVLink 6 的意义是让专家并行不再过早吞掉 NVFP4 带来的算力收益。</p>\n<div class=\"warn-box\">⚠️ 注意：NVIDIA 产品页明确标注 Vera Rubin NVL72 规格为 preliminary information，数值是 “up to” 且可能随上市配置变化。精读时应把 50 PFLOPS、288 GB、22 TB/s、3.6 TB/s 理解为官方当前公开的目标规格，而不是已独立复现实测。</div>\n<p>资料来源：NVIDIA Newsroom https://nvidianews.nvidia.com/news/rubin-platform-ai-supercomputer；NVIDIA Vera Rubin NVL72 https://www.nvidia.com/en-us/data-center/vera-rubin-nvl72/；NVIDIA Vera Rubin Platform https://www.nvidia.com/en-us/data-center/technologies/rubin/；NVIDIA 技术博客 https://developer.nvidia.com/blog/inside-the-nvidia-rubin-platform-six-new-chips-one-ai-supercomputer/。</p>",
      "quiz": {
        "q": "Rubin GPU 用 HBM4、NVFP4 和 NVLink 6 组合优化的主要场景是什么？",
        "options": [
          "长上下文、多轮 agentic 推理和大 MoE 模型的低延迟高吞吐运行",
          "只提升传统图形光栅化帧率",
          "把 GPU 间通信全部移回 PCIe",
          "让所有模型必须以 FP64 推理"
        ],
        "answer": 0,
        "explain": "Rubin 的核心是用 NVFP4 提升算力密度、用 HBM4 提升容量/带宽、用 NVLink 6 降低多 GPU 通信成本，正对应 agentic AI 和 MoE 推理的系统瓶颈。"
      }
    },
    {
      "id": "amd_mi400",
      "num": 7,
      "name": "AMD MI400",
      "fullName": "AMD Instinct MI400加速器 (AMD Instinct MI400 Accelerator)",
      "year": "2026",
      "org": "AMD",
      "parent": "—",
      "paperUrl": "https://www.tomshardware.com/pc-components/gpus/amd-data-center-roadmap-2026-2027-mi400-mi500-zen-6-zen-7",
      "projectUrl": "",
      "category": "gpu_architecture",
      "motivation": "CDNA5架构2nm工艺432GB HBM4",
      "summary": "AMD MI400 是 AMD 在 2026 年面向 GenAI 训练与分布式推理规划的下一代 Instinct 加速器，公开资料把它定位为 432 GB HBM4、19.6 TB/s 显存带宽、40 PF FP4 和 Helios rack-scale AI 系统的核心 GPU。它解决的是 MI300/MI350 时代单卡容量、显存带宽和机柜级互连不足以经济承载大模型训练与 MoE 推理的问题。",
      "keyPoints": [
        "AMD 官方 2024 Computex 新闻稿确认 MI400 系列预计 2026 年推出，基于 AMD CDNA “Next” 架构；2025 Advancing AI PDF 进一步给出 MI400 的工程投影规格",
        "AMD Advancing AI 2025 deck 第 94 页列出 MI400：40 PF FP4、20 PF FP8、432 GB HBM4、19.6 TB/s memory bandwidth、300 GB/s scale-out bandwidth per GPU，均为 engineering projections",
        "Helios AI Rack 以 72 个 GPU domain 为目标，官方 deck 第 92 页给出 2.9 EF FP4、1.4 EF FP8、31 TB HBM4、1.4 PB/s HBM4 带宽、43 TB/s scale-out bandwidth",
        "AMD EPYC “Venice” 作为 2026 CPU 配套路线，官方 deck 标注 256 cores、2nm、Zen 6、1.6 TB/s memory bandwidth，并强调 CPU-to-GPU bandwidth 代际提升",
        "AMD Pensando “Vulcano” NIC 面向 AI 集群，官方 deck 标注 3nm、800G network throughput、UAL PCIe host interface、8x scale-out bandwidth per GPU",
        "与 NVIDIA 的闭合 NVLink 域不同，AMD 强调 UALink / Ultra Ethernet 等开放互连路线，目标是 “any CPU, any accelerator, any switch” 的机柜级扩展",
        "<code>paper_url</code> 是行业报道而非论文；深入解读以 AMD 官方 PDF/新闻稿为主，Tom’s Hardware/Future CDN 图片作为远程公开配图来源"
      ],
      "detail": "<h5>核心示意图</h5>\n<p><img alt=\"AMD 数据中心路线图公开报道配图\" src=\"https://cdn.mos.cms.futurecdn.net/N435TKXwPMnd3GuxfhvTPZ-970-80.jpg.webp\" />\n<em>图：Tom’s Hardware/Future CDN 对 AMD 2026-2027 数据中心路线图报道的远程图片；MI400 具体规格以 AMD Advancing AI 2025 distribution deck 第 92-94 页的官方工程投影为准。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># MI400 / Helios 上大模型训练或推理的系统级调度伪代码\ndef helios_step(batch, model, fabric):\n    # EPYC Venice 负责数据准备、控制面和集群调度\n    shards = partition_for_tensor_and_expert_parallel(batch, gpus=72)\n\n    for layer in model.layers:\n        # 本地 HBM4 提供大容量权重、KV cache 和激活 staging\n        x = load_from_hbm4(shards, bandwidth=&quot;19.6 TB/s per GPU&quot;)\n\n        # FP4/FP8 矩阵核心路径，实际由 ROCm / hipBLASLt / CK / Triton kernel 承接\n        h = matrix_engine_gemm(\n            x,\n            layer.weights,\n            dtype=&quot;fp4/fp8&quot;,\n            accumulate=&quot;fp32/bf16&quot;,\n        )\n\n        if layer.uses_moe:\n            # UALink / Ultra Ethernet / Pensando NIC 承担 expert all-to-all\n            h = fabric.all_to_all(h, bandwidth=&quot;scale-up + scale-out&quot;)\n\n        shards = residual_norm_and_reduce_scatter(h)\n\n    return gather_logits_or_gradients(shards)\n</code></pre>\n<p>MI400 的公开信息不是完整架构白皮书，而是路线图、发布会 deck 和行业报道的组合。因此精读时要把“确定事实”和“工程投影”分开：AMD 已公开 MI400 面向 2026、属于 CDNA Next 路线，并在 2025 deck 中给出 40 PF FP4、20 PF FP8、432 GB HBM4、19.6 TB/s 等目标；但具体芯粒数量、CU 数、缓存层次、制程实现和最终 SKU 仍需等正式产品白皮书确认。<code>motivation</code> 中的 “CDNA5/2nm” 与业内常见称呼一致，但 AMD 早期官方新闻稿使用的是 CDNA “Next”。</p>\n<p>MI400 的第一层价值来自显存容量和带宽。432 GB HBM4 相比 MI350/MI355X 的 288 GB HBM3E 提升 50%，19.6 TB/s 相比 8.0 TB/s 提升约 2.45 倍。对 dense LLM，权重驻留容量决定 tensor parallel 切分深度；对 MoE，expert 和 KV cache 的驻留容量决定路由是否频繁跨卡；对训练，激活、梯度、优化器状态和重计算策略共同受 HBM 容量影响。其近似瓶颈可写成：</p>\n<div class=\"kb-math kb-math-display\">T_{layer}\\approx \\max\\left(\\frac{F_{matmul}}{P_{FP4/FP8}},\\frac{B_{weights}+B_{act}+B_{kv}}{BW_{HBM4}},\\frac{B_{comm}}{BW_{fabric}}\\right)</div>\n<p>AMD 把 MI400 放进 Helios AI Rack，而不是只发布单卡规格，说明竞争点已经上移到 rack scale。官方 deck 对 Helios 给出 72 GPU domain、260 TB/s scale-up bandwidth、2.9 EF FP4、1.4 EF FP8、31 TB HBM4 和 1.4 PB/s memory bandwidth。对训练，这意味着 tensor parallel 的 all-reduce、pipeline stage 间传输、ZeRO/FSDP 的 reduce-scatter 都要在 rack 内高效完成；对推理，则重点是 MoE expert all-to-all、长上下文 KV cache 迁移和多租户请求调度。</p>\n<p>低精度机制方面，MI400 的 FP4/FP8 不能只理解为峰值 FLOPS。一个实用的低精度 GEMM 通常需要 <code>q_value + scale + accumulate</code> 三段式：</p>\n<div class=\"kb-math kb-math-display\">C_{ij}=\\sum_k \\left(q^A_{ik}\\cdot s^A_{g(k)}\\right)\\left(q^B_{kj}\\cdot s^B_{g(k)}\\right),\\qquad C_{ij}\\in\\mathrm{FP32/BF16}</div>\n<p>这里 <span class=\"kb-math kb-math-inline\">g(k)</span> 是缩放分组函数。分组越小，误差越低，但 scale 元数据和内核访存越复杂；分组越大，吞吐更容易做满但容易损失模型精度。AMD 若要把 40 PF FP4 转化为真实 tokens/s，ROCm、hipBLASLt、Composable Kernel、Triton 后端和 vLLM/SGLang 等框架必须能自动选择合适的 block scaling、tile shape、通信 overlap 和 KV cache 布局。</p>\n<p>互连是 MI400 与 Helios 的另一个关键。AMD 官方 deck 强调 UALink 与开放标准，把最大可扩展性、任意 CPU/加速器/交换芯片和开放管理软件作为差异化卖点。Vulcano NIC 的 800G 与 per-GPU scale-out 带宽目标，服务的是跨机柜扩展；Helios 的 260 TB/s scale-up 带宽，则服务单 rack 内低延迟集合通信。换句话说，MI400 的胜负不只在 GPU die，而在 GPU、EPYC Venice、Pensando NIC、ROCm/RCCL 和机柜拓扑是否能作为整体交付。</p>\n<div class=\"warn-box\">⚠️ 注意：AMD PDF 多处标注 “engineering projections” 和 “results subject to change”。因此本文把 432 GB、19.6 TB/s、40 PF FP4、Helios 2.9 EF FP4 等作为官方公开目标规格解读，而不是已经上市产品的独立实测结论。</div>\n<p>资料来源：AMD Advancing AI 2025 distribution deck https://www.amd.com/content/dam/amd/en/documents/corporate/events/advancing-ai-2025-distribution-deck.pdf；AMD 2024 Instinct roadmap 新闻稿 https://ir.amd.com/news-events/press-releases/detail/1201/amd-accelerates-pace-of-data-center-ai-innovation-and-leadership-with-expanded-amd-instinct-gpu-roadmap；Tom’s Hardware 报道 https://www.tomshardware.com/pc-components/gpus/amd-data-center-roadmap-2026-2027-mi400-mi500-zen-6-zen-7。</p>",
      "quiz": {
        "q": "评估 AMD MI400/Helios 时，为什么不能只看单 GPU 的 FP4 峰值算力？",
        "options": [
          "因为大模型训练和推理还受 HBM4 容量/带宽、scale 元数据、通信 fabric、ROCm kernel 和调度 overlap 共同限制",
          "因为 FP4 峰值与矩阵乘完全无关",
          "因为 HBM4 会让通信变得不需要任何互连",
          "因为 ROCm 只能运行 CPU 程序"
        ],
        "answer": 0,
        "explain": "MI400 的 40 PF FP4 只有在 HBM4、scale/反量化路径、UALink/Ultra Ethernet 通信和 ROCm 内核都能持续供给数据时才会转化为真实吞吐。"
      }
    },
    {
      "id": "tpu_v1",
      "num": 8,
      "name": "TPU v1",
      "fullName": "张量处理单元v1 (Tensor Processing Unit v1)",
      "year": "2017",
      "org": "Google",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/1704.04760",
      "projectUrl": "",
      "category": "tpu",
      "motivation": "8位整数脉动阵列实现推理能效比提升15-30倍",
      "summary": "TPU v1 提出了面向数据中心神经网络推理的专用 ASIC，用 8-bit 整数 256×256 脉动阵列、大容量片上 Unified Buffer 和确定性执行模型解决 CPU/GPU 在在线推理中吞吐、延迟与能效不足的问题。它把数据中心生产 DNN 中最重的矩阵乘压到固定数据通路上，论文报告相对同期 CPU/GPU 获得约 15-30 倍性能优势和更高性能/瓦特。",
      "keyPoints": [
        "采用 65,536 个 8-bit MAC 组成的 256×256 Matrix Multiply Unit，峰值约 92 TOPS",
        "使用 28 MiB 软件管理 Unified Buffer 和 4 MiB Accumulator，减少外部 DRAM 访问",
        "以 PCIe 加速卡接入服务器，主机 CPU 负责应用逻辑、批处理和 TPU 指令发射",
        "面向推理而非训练，重点优化 99 分位延迟、吞吐和数据中心能效",
        "使用脉动阵列固定数据流复用权重与激活，降低通用 CPU/GPU 的控制和缓存开销",
        "支持 TensorFlow 编译出的 CISC 风格 TPU 指令，包括矩阵乘、激活、归一化和数据搬运",
        "在 Google 生产 MLP、CNN、LSTM 推理负载上验证，覆盖当时大部分数据中心 NN 推理需求"
      ],
      "detail": "<h5>核心示意图</h5>\n<p><img alt=\"TPU v1 芯片框图\" src=\"https://ar5iv.labs.arxiv.org/html/1704.04760/assets/x1.png\" />\n<em>图：TPU v1 论文 Figure 1 的公开 ar5iv 镜像。图中 Matrix Multiply Unit、Unified Buffer、Accumulator、Weight FIFO 和 PCIe Host Interface 构成推理数据通路。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># TPU v1 上一次量化推理的核心数据流\nprogram = tensorflow_graph_to_tpu_instructions(model_graph)\n\nfor request_batch in online_service:\n    host_cpu.enqueue(program, request_batch)\n\n    for op in program:\n        if op.kind == &quot;load_activations&quot;:\n            unified_buffer.write(op.dst, host_or_dram_read(op.src))\n\n        elif op.kind == &quot;matrix_multiply&quot;:\n            # 权重流式进入 Weight FIFO，激活来自 Unified Buffer。\n            acc = zeros_tile(dtype=&quot;int32&quot;)\n            for k_tile in op.k_tiles:\n                a_int8 = unified_buffer.read(op.activation_tile(k_tile))\n                w_int8 = weight_fifo.stream(op.weight_tile(k_tile))\n                acc += systolic_256x256_mac(a_int8, w_int8)\n            accumulator.write(op.dst, acc)\n\n        elif op.kind == &quot;activate_and_quantize&quot;:\n            y = activation(accumulator.read(op.src), op.activation)\n            y_int8 = clamp(round(y * op.output_scale), -128, 127)\n            unified_buffer.write(op.dst, y_int8)\n\n    host_cpu.return_response(unified_buffer.read(program.output))\n</code></pre>\n<h5>方法机制解读</h5>\n<p>TPU v1 的出发点不是“让所有程序都更快”，而是服务 Google 数据中心中形态高度集中的神经网络推理。论文观察到生产模型主要由矩阵乘、卷积展开后的矩阵乘、逐元素激活和少量归一化组成，且推理通常可以通过校准和量化使用 8-bit 整数。这样，芯片不必保留乱序执行、复杂缓存层次、多线程调度等通用处理器机制，而可以把面积和功耗集中给矩阵乘阵列、片上 SRAM 和简单可预测的控制流。</p>\n<p>核心算子仍然是矩阵乘。给定量化激活 <span class=\"kb-math kb-math-inline\">X_q</span> 和量化权重 <span class=\"kb-math kb-math-inline\">W_q</span>，TPU v1 在阵列中计算 32-bit 部分和：</p>\n<div class=\"kb-math kb-math-display\">Y_{i,j}^{int32}=\\sum_k X_{q,i,k}W_{q,k,j}</div>\n<p>随后再通过缩放、激活函数和饱和裁剪把结果写回 8-bit 或中间精度缓冲。量化带来的收益有两层：第一，8-bit 乘法器面积和能耗远低于 FP32 乘法器，因此相同面积内能放下 65,536 个 MAC；第二，激活和权重带宽下降，Unified Buffer 能容纳更多中间数据，减少外部内存往返。</p>\n<p>脉动阵列的关键是数据复用。权重从一侧或上方按节拍流入，激活从另一个方向流入，每个处理单元只做乘加并把数据传给邻居。大矩阵会被分块到 256×256 tile，阵列填满之后以稳定流水方式输出部分和。相比 GPU 的 SIMT 执行，TPU v1 的单个处理单元功能简单、控制开销低、数据搬运路径固定；代价是灵活性较弱，只有当模型能被编译成规则张量算子时才能充分利用硬件。</p>\n<p>Unified Buffer 是 v1 能效的另一个核心。外部 DRAM 访问比片上 SRAM 访问昂贵得多，如果每层都把激活写回主存再读出，矩阵阵列会被内存带宽限制。TPU v1 因此使用软件管理的 28 MiB 片上缓冲保存输入激活和中间结果，编译器显式安排数据何时搬入、何时复用、何时写回。这个设计类似 scratchpad，不追求透明缓存命中率，而追求可预测延迟和可控数据流。</p>\n<p>从系统形态看，TPU v1 是 PCIe 协处理器。CPU 仍处理 RPC、模型选择、特征处理、业务逻辑和批处理，TPU 只执行神经网络图中的重算子。这样的边界让 TPU 可以快速部署到现有数据中心服务器中，也解释了它为什么强调 99 分位延迟：在线服务关注尾延迟，确定性硬件流水比依赖缓存和动态调度的通用处理器更容易给出稳定响应时间。</p>\n<p>与 CPU/GPU 的区别可以概括为公式中的性能/瓦特分母也被优化了：</p>\n<div class=\"kb-math kb-math-display\">\\operatorname{efficiency}=\\frac{\\operatorname{useful\\ neural\\ network\\ ops}}{\\operatorname{power}\\times \\operatorname{time}}</div>\n<p>CPU 擅长复杂控制和低延迟单线程，GPU 擅长更通用的数据并行，而 TPU v1 把“有用操作”限定到推理主路径中的 INT8 张量算子，并减少指令调度、寄存器文件、缓存一致性和图形管线等非目标开销。因此它在推理上能获得数量级能效提升，但不适合训练所需的反向传播、动态范围更宽的梯度累加和大规模芯片间同步，这也直接推动了后续 TPU v2/v3 训练版引入 bfloat16、HBM 和 Pod 互连。</p>\n<div class=\"key-point\">💡 关键：TPU v1 的创新不只是“有一个大矩阵乘单元”，而是把数值格式、片上存储、编译器调度、协处理器接口和在线服务延迟目标一起收窄到推理场景。</div>",
      "quiz": {
        "q": "TPU v1 使用 8-bit 脉动阵列和软件管理 Unified Buffer 的主要目的是什么？",
        "options": [
          "把推理中的矩阵乘固定到高复用、低控制开销的数据通路上，并减少外部内存访问",
          "提高通用操作系统内核和分支密集型代码的执行速度",
          "让训练梯度必须使用 FP64 精度累加",
          "用透明缓存替代编译器的数据搬运规划"
        ],
        "answer": 0,
        "explain": "TPU v1 面向数据中心推理，INT8 脉动阵列提升矩阵乘吞吐和能效，Unified Buffer 通过显式管理中间激活降低 DRAM 流量。"
      }
    },
    {
      "id": "tpu_v2v3",
      "num": 9,
      "name": "TPU v2/v3",
      "fullName": "张量处理单元v2/v3训练版 (TPU v2/v3 for Training)",
      "year": "2020",
      "org": "Google",
      "parent": "tpu_v1",
      "paperUrl": "https://dl.acm.org/doi/10.1145/3360307",
      "projectUrl": "",
      "category": "tpu",
      "motivation": "引入bfloat16格式支持大规模集群训练",
      "summary": "TPU v2/v3 把 TPU v1 的推理专用思想扩展为训练超级计算机：用 bfloat16 乘法、FP32 累加、HBM 和 ICI 2D torus 互连支撑大规模同步训练。它解决了训练阶段对动态范围、反向传播内存、梯度同步和 Pod 级扩展的需求，使 TPU 从单机推理加速器变成可训练 ResNet、Transformer 等模型的领域专用集群。",
      "keyPoints": [
        "引入 bfloat16：保留 FP32 的 8 位指数，缩短尾数，兼顾训练动态范围与 16-bit 计算/存储效率",
        "使用 TensorCore 和 MXU 执行 BF16 矩阵乘并用 FP32 累加，适配前向、反向和权重梯度计算",
        "每颗芯片配备 HBM，TPU v2 约 16 GiB/600 GB/s，TPU v3 约 32 GiB/900 GB/s",
        "TPU v3 官方规格为每芯片 123 TFLOPS BF16、1024 芯片 Pod、2D torus、126 PFLOPS Pod 峰值",
        "ICI 专用互连支持高带宽 AllReduce，降低数据并行训练中的梯度同步瓶颈",
        "XLA 将 TensorFlow/JAX 图编译为 TPU 程序，负责算子融合、布局、tile 化、内存规划和通信插入",
        "相比 TPU v1，v2/v3 支持训练；相比 CPU/GPU 集群，它用端到端软硬件协同提升性能/瓦特和可扩展性"
      ],
      "detail": "<h5>核心示意图</h5>\n<p><img alt=\"TPU v3 芯片架构图\" src=\"https://docs.cloud.google.com/static/tpu/docs/images/tpu-v3-layout.png\" />\n<em>图：Google Cloud 官方 TPU v3 芯片图。该图展示了芯片内两个 TensorCore、MXU、向量/标量单元、HBM 以及 ICI 链路。TPU v2/v3 论文讨论同一训练 TPU 家族，本文用官方 v3 图作为远程架构图来源。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># TPU v2/v3 上的同步数据并行训练简化流程\ncompiled = xla_compile(\n    model,\n    target=&quot;tpu_v2_or_v3&quot;,\n    passes=[&quot;fusion&quot;, &quot;layout_assignment&quot;, &quot;tiling&quot;, &quot;memory_planning&quot;, &quot;collectives&quot;]\n)\n\nreplicas = make_tpu_replicas(pod_slice)\nmaster_weights_fp32 = init_weights(dtype=&quot;fp32&quot;)\n\nfor step, global_batch in enumerate(input_pipeline):\n    # 每个 TensorCore 处理不同数据分片，模型参数逻辑上保持同步。\n    local_batch = shard(global_batch, replicas, by=replica_id)\n    weights_bf16 = cast(master_weights_fp32, &quot;bf16&quot;)\n\n    activations = local_batch\n    for layer in compiled.forward_layers:\n        if layer.is_dense_matmul_or_conv:\n            # BF16 输入/权重进入 MXU，累加器保持 FP32。\n            activations = mxu_matmul_bf16_accumulate_fp32(\n                cast(activations, &quot;bf16&quot;),\n                layer.weights_bf16\n            )\n        else:\n            activations = vector_or_scalar_unit(layer, activations)\n\n    loss = compute_loss(activations, local_batch.labels)\n    local_grads = xla_backprop(loss, compiled.backward_layers)\n\n    # ICI 2D torus 上做梯度 AllReduce，得到所有副本一致的平均梯度。\n    summed_grads = ici_allreduce(local_grads, topology=&quot;2d_torus&quot;)\n    mean_grads = summed_grads / len(replicas)\n\n    # 权重更新通常保留 FP32 master copy，下一步再投影为 BF16 参与矩阵乘。\n    master_weights_fp32 = optimizer_update(master_weights_fp32, mean_grads)\n</code></pre>\n<h5>方法机制解读</h5>\n<p>TPU v2/v3 的根本变化是从“只跑前向推理”转向“端到端训练”。训练不仅要计算前向矩阵乘，还要计算激活梯度、权重梯度和优化器更新，内存中还必须保存或重算中间激活。更重要的是，同步数据并行会在每个 step 后交换梯度；当芯片数扩大到数百或上千时，互连带宽和 AllReduce 延迟会和矩阵乘本身一样关键。因此 v2/v3 同时升级数值格式、片上/片外存储、芯片间网络和编译器。</p>\n<p>bfloat16 是训练版 TPU 的核心数值选择。它的位宽仍是 16 bit，但指数位与 FP32 相同，尾数更短：</p>\n<div class=\"kb-math kb-math-display\">\\operatorname{bf16}=1\\ \\text{sign bit}+8\\ \\text{exponent bits}+7\\ \\text{mantissa bits}</div>\n<p>这种设计承认了深度学习训练的两个事实：梯度和激活需要接近 FP32 的动态范围，否则容易溢出或下溢；但随机梯度本身带噪声，许多矩阵乘输入不需要 FP32 的完整尾数精度。于是 TPU 让矩阵乘输入和权重以 BF16 存储/传输，同时让累加保持 FP32：</p>\n<div class=\"kb-math kb-math-display\">C_{fp32} \\leftarrow C_{fp32}+A_{bf16}B_{bf16}</div>\n<p>这比纯 FP16 更少依赖 loss scaling，也比纯 FP32 节省带宽和乘法器面积。</p>\n<p>TensorCore 仍以 MXU 为中心，但它服务的是训练图而不是单向推理图。矩阵乘、卷积、注意力投影和 MLP 层主要落到 MXU；激活函数、归一化、softmax、优化器中的逐元素更新落到向量或标量单元。XLA 的任务是把高层计算图转换成能填满 MXU tile 的低层程序，例如融合 <code>MatMul + Bias + Activation</code>，选择 HBM 与片上缓冲之间的数据布局，并尽量让转置、重排和通信与计算重叠。</p>\n<p>分布式训练的通信可以用一个简化 AllReduce 成本模型理解。设梯度大小为 <span class=\"kb-math kb-math-inline\">S</span>，参与副本数为 <span class=\"kb-math kb-math-inline\">P</span>，有效链路带宽为 <span class=\"kb-math kb-math-inline\">B</span>，则环形或分块 AllReduce 的带宽项近似为：</p>\n<div class=\"kb-math kb-math-display\">T_{\\text{allreduce}}\\approx 2\\frac{P-1}{P}\\frac{S}{B}+T_{\\text{routing}}</div>\n<p>当 <span class=\"kb-math kb-math-inline\">P</span> 很大时，第一项接近 <span class=\"kb-math kb-math-inline\">2S/B</span>，但 <span class=\"kb-math kb-math-inline\">T_{\\text{routing}}</span> 会受拓扑直径、拥塞和调度影响。TPU v2/v3 的 ICI 2D torus 通过专用芯片间链路直接服务集合通信，比走通用数据中心网络更可预测，也能让梯度同步成为编译器可见的图节点。</p>\n<p>与 TPU v1 相比，v2/v3 最大的设计权衡是“少一点单芯片推理极致专用，多一点训练所需通用性”。训练需要更高精度、更大 HBM、更复杂的数据重排和跨芯片同步，因此芯片不能只围绕 INT8 前向路径设计。与同期 GPU 集群相比，TPU v2/v3 则选择更封闭但更整体化的路线：硬件、互连、XLA 和框架一起设计，用户少直接写 kernel，系统用全图编译和 Pod 拓扑换取稳定的训练吞吐。</p>\n<p>从模型训练流程看，v2/v3 支持数据并行、模型并行和混合并行。数据并行时，每个副本持有完整参数，处理不同 batch shard，再通过 ICI 平均梯度；模型并行时，矩阵或层被切到不同 TensorCore，通信发生在激活、注意力或专家路由边界。2D torus 对规则划分很友好，但它的等分带宽随规模大致按 <span class=\"kb-math kb-math-inline\">O(\\sqrt{P})</span> 增长，这也是 TPU v4 后续转向 3D 网络和可重构光互连的重要原因。</p>\n<div class=\"key-point\">💡 关键：TPU v2/v3 的贡献不是单独发明 BF16，而是证明 BF16 数值格式、MXU、HBM、ICI torus 和 XLA 全图编译可以作为一个训练系统共同扩展。</div>",
      "quiz": {
        "q": "TPU v2/v3 为什么选择 bfloat16 作为训练主格式？",
        "options": [
          "它保留 FP32 的指数动态范围，同时用 16-bit 存储和乘法降低带宽与计算成本",
          "它比 FP32 拥有更多尾数位，因此数值精度更高",
          "它只能用于推理，不能用于反向传播",
          "它取消了芯片间 AllReduce 的需求"
        ],
        "answer": 0,
        "explain": "BF16 的 8 位指数接近 FP32 动态范围，7 位尾数降低硬件和带宽成本；TPU 在矩阵乘中使用 BF16 输入并保留 FP32 累加以维持训练稳定性。"
      }
    },
    {
      "id": "tpu_v4",
      "num": 10,
      "name": "TPU v4",
      "fullName": "张量处理单元v4光互联版 (TPU v4 with Optical Interconnect)",
      "year": "2023",
      "org": "Google",
      "parent": "tpu_v2v3",
      "paperUrl": "https://arxiv.org/abs/2304.01433",
      "projectUrl": "",
      "category": "tpu",
      "motivation": "光路交换机实现3D Torus拓扑动态重构",
      "summary": "TPU v4 提出了带光路交换机的可重构 ML 超级计算机，用 4096 芯片规模、3D mesh/torus 拓扑、twisted torus 变体和 SparseCore 嵌入加速解决 TPU v3 在大模型训练中遇到的互连、可用性和推荐模型瓶颈。它把 TPU 从固定 2D Pod 推进到可按作业重构拓扑的光互联系统，并在芯片级、网络级和模型协同优化上同时提升性能/瓦特。",
      "keyPoints": [
        "每颗 TPU v4 芯片包含 2 个 TensorCore，每个 TensorCore 有 4 个 MXU、向量单元和标量单元",
        "官方规格为每芯片 275 TFLOPS BF16/INT8、32 GiB HBM、1200 GB/s HBM 带宽、典型均值约 170 W",
        "Pod 规模扩大到 4096 芯片，峰值约 1.1 EFLOPS，AllReduce 带宽约 1.1 PB/s，等分带宽约 24 TB/s",
        "使用 6 条 ICI 链路形成 3D mesh，并在满足形状条件的切片上配置为 3D torus 或 twisted torus",
        "通过 OCS 光路交换机重构芯片间环绕连接，提升调度灵活性、故障绕行能力和拓扑匹配能力",
        "引入第三代 SparseCore，加速 DLRM 等推荐模型的嵌入表 gather、dedup、all-to-all 和 reduce/update",
        "相比 TPU v3，论文和官方博客报告单芯片平均约 2.1 倍性能、约 2.7 倍性能/瓦特提升"
      ],
      "detail": "<h5>核心示意图</h5>\n<p><img alt=\"TPU v4 芯片架构图\" src=\"https://docs.cloud.google.com/static/tpu/docs/images/tpu-v4-layout.png\" />\n<em>图 1：Google Cloud 官方 TPU v4 芯片图，展示 TensorCore、MXU、SparseCore、HBM 和 ICI 链路。</em></p>\n<p><img alt=\"TPU v4 OCS 光路交换示意\" src=\"https://storage.googleapis.com/gweb-cloudblog-publish/images/2_Cloud_TPU_v4.max-1400x1400.jpg\" />\n<em>图 2：Google Cloud 官方博客中的 OCS 工作示意。OCS 用 MEMS 光路切换连接关系，避免把高速光信号转换成电包交换流量。</em></p>\n<p><img alt=\"TPU v4 twisted torus 拓扑\" src=\"https://docs.cloud.google.com/static/tpu/docs/images/twisted-tori.png\" />\n<em>图 3：Google Cloud 官方 twisted torus 图。wrap-around 边被偏移连接，从而把不对称 torus 变成更均衡的通信拓扑。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># TPU v4 切片分配、OCS 拓扑选择与训练运行的简化伪代码\ndef choose_topology(chip_count, parallelism):\n    candidates = enumerate_3d_shapes(chip_count)  # e.g. 4x4x8, 4x8x8, 8x8x8\n    best = None\n    for shape in candidates:\n        variants = [&quot;mesh&quot;, &quot;torus&quot;]\n        if supports_twisted(shape):\n            variants.append(&quot;twisted_torus&quot;)\n\n        for variant in variants:\n            score = estimate_step_time(\n                shape=shape,\n                variant=variant,\n                data_parallel=parallelism.data,\n                model_parallel=parallelism.model,\n                embedding_all_to_all=parallelism.embedding\n            )\n            best = min_by_step_time(best, (shape, variant, score))\n    return best.shape, best.variant\n\n\ndef run_tpu_v4_job(model, batch, chip_count, parallelism):\n    shape, variant = choose_topology(chip_count, parallelism)\n\n    # OCS 在作业启动或重配置点建立所需光路，形成 3D torus/twisted torus。\n    ocs_program = compile_optical_circuits(shape, variant)\n    configure_ocs(ocs_program)\n\n    compiled = xla_compile(model, target=&quot;tpu_v4&quot;, topology=(shape, variant))\n\n    for step in training_steps:\n        dense_out = tensorcores_forward_backward(\n            compiled.dense_layers,\n            batch.shard(step),\n            dtype=&quot;bf16&quot;,\n            accumulate=&quot;fp32&quot;\n        )\n\n        # SparseCore 处理推荐模型中的嵌入表访问和跨芯片 all-to-all。\n        sparse_out = sparsecores_embedding_pipeline(\n            ids=batch.sparse_ids,\n            stages=[&quot;fetch&quot;, &quot;dedup&quot;, &quot;distribute&quot;, &quot;scvpu&quot;, &quot;sort_reduce&quot;, &quot;flush&quot;]\n        )\n\n        grads = merge_dense_and_sparse_gradients(dense_out, sparse_out)\n        synced = ici_allreduce(grads, topology=variant)\n        optimizer_update(synced)\n</code></pre>\n<h5>方法机制解读</h5>\n<p>TPU v4 的背景是训练负载在 TPU v2/v3 之后继续变化：大语言模型需要更大的模型并行和更长时间的稳定运行，推荐系统中的嵌入表带来大量稀疏访存和 all-to-all 通信，单个 Pod 中的故障、碎片和拓扑选择也会直接影响有效算力。固定 2D torus 对许多卷积和普通数据并行任务足够好，但当芯片数扩大到 4096、通信模式变得更复杂时，二维网络的等分带宽和最长路径会成为系统级瓶颈。</p>\n<p>TPU v4 首先在芯片级增加密度。官方文档给出的 v4 芯片结构是 2 个 TensorCore，每个 TensorCore 4 个 MXU，单芯片 275 TFLOPS BF16/INT8；同时有 32 GiB HBM 和更高 HBM 带宽。矩阵乘仍是主路径，但 v4 还加入更大的片上 common memory、更多转置/置换带宽、更快权重加载和 8-bit 模式，使同一芯片既能服务训练，也能覆盖更低 batch 的推理场景。公式上，Dense 层的主算子仍是：</p>\n<div class=\"kb-math kb-math-display\">Y = XW,\\quad C_{fp32}\\leftarrow C_{fp32}+X_{bf16}W_{bf16}</div>\n<p>但系统瓶颈已经从单个 <span class=\"kb-math kb-math-inline\">Y=XW</span> 扩展到多维并行下的通信、调度和稀疏更新。</p>\n<p>3D 网络的收益可以从等分带宽直观看出。若 <span class=\"kb-math kb-math-inline\">N=k^d</span> 个节点组成 <span class=\"kb-math kb-math-inline\">d</span> 维近似立方 torus，每个方向链路带宽为 <span class=\"kb-math kb-math-inline\">b</span>，切开系统中部时跨切面链路数量与 <span class=\"kb-math kb-math-inline\">k^{d-1}</span> 成正比：</p>\n<div class=\"kb-math kb-math-display\">B_{\\text{bisection}}(d)\\propto b\\cdot k^{d-1}=b\\cdot N^{(d-1)/d}</div>\n<p>因此 2D torus 的等分带宽随规模约为 <span class=\"kb-math kb-math-inline\">O(N^{1/2})</span>，3D torus 则约为 <span class=\"kb-math kb-math-inline\">O(N^{2/3})</span>。芯片数越大，3D 的相对优势越明显。TPU v4 每芯片 6 条 ICI 链路正好对应三维邻居连接，减少网络直径并给 all-to-all、AllReduce 和模型并行激活交换更多路径。</p>\n<p>OCS 的作用是把“物理布线”变成“可编程资源”。TPU v4 可以把 4×4×4 立方体作为构建块，通过光路交换把块之间的环绕链路按作业需要接成不同 3D 拓扑。OCS 不理解包，也不做逐包路由；它像可重接线的光纤配线架，在作业启动时把输入光纤反射到目标输出光纤。这样做的优势是功耗和延迟低、带宽随光链路自然扩展，并且可绕过故障块或把非连续资源拼成逻辑连续切片。</p>\n<p>Twisted torus 是 OCS 可重构性的具体用法。对于 4×4×8、4×8×8、8×8×16 等某个维度为最小维度一倍或两倍的切片，普通 torus 的 wrap-around 边会造成不均衡路径；twisted torus 把环绕边连接到偏移坐标，例如二维示意中从同一 <span class=\"kb-math kb-math-inline\">x</span> 坐标改为 <span class=\"kb-math kb-math-inline\">x+\\Delta \\pmod n</span>。这不会改变芯片数量，却能让拓扑更对称、路径更短、负载更均衡。Google Cloud 文档也明确说明 twisted 拓扑能提升等分带宽，尤其有利于全局通信和大嵌入工作负载。</p>\n<p>SparseCore 解决的是 Dense TensorCore 不擅长的推荐模型问题。嵌入层的计算不是大矩阵乘，而是根据 ID 对巨大的 embedding table 做随机 gather、去重、跨芯片分发、梯度合并和写回。若这些操作放在 CPU 或普通向量单元上，会被 PCIe、内存随机访问和 all-to-all 通信拖慢。TPU v4 的 SparseCore 以数据流方式执行 <code>fetch -&gt; dedup -&gt; distribute -&gt; scVPU -&gt; sort/reduce -&gt; flush</code>，并直接接入 HBM 和 ICI，使稀疏部分不再成为整步训练的 Amdahl 瓶颈。</p>\n<p>从软件角度看，TPU v4 把模型并行策略和物理拓扑绑定得更紧。一个 512 芯片作业可以选择 4×4×32、4×8×16 或 8×8×8；如果模型有 4 路模型并行和大量数据并行，把模型并行维度映射到物理长度为 4 的维度通常比随意映射更好。XLA、调度器和拓扑选择器需要共同决定：dense 计算如何 tile 到 MXU，稀疏嵌入如何 shard 到 SparseCore，AllReduce 或 all-to-all 应该走 regular torus 还是 twisted torus。</p>\n<div class=\"key-point\">💡 关键：TPU v4 的“光互联”不是为了让每个包动态改路，而是为了在作业粒度把超级计算机重接成更适合模型通信图的拓扑。</div>",
      "quiz": {
        "q": "TPU v4 为什么引入 OCS 和 twisted torus，而不是继续只扩大 TPU v3 的 2D torus？",
        "options": [
          "因为 3D/可重构拓扑能提升大规模切片的等分带宽、缩短路径，并按作业通信模式重接环绕链路",
          "因为 OCS 可以替代 TensorCore 做 BF16 矩阵乘",
          "因为 twisted torus 会减少 HBM 容量，从而降低模型大小",
          "因为 2D torus 无法执行任何 AllReduce"
        ],
        "answer": 0,
        "explain": "v4 的核心瓶颈从单芯片算力扩展到 Pod 级通信和可用性；OCS 允许作业粒度重构 3D torus/twisted torus，提高等分带宽、负载均衡和故障绕行能力。"
      }
    },
    {
      "id": "tpu_v7",
      "num": 11,
      "name": "TPU v7 Ironwood",
      "fullName": "张量处理单元v7铁杉版 (TPU v7 Ironwood)",
      "year": "2026",
      "org": "Google",
      "parent": "tpu_v4",
      "paperUrl": "https://cloud.google.com/tpu/docs/release-notes",
      "projectUrl": "",
      "category": "tpu",
      "motivation": "3nm双芯粒架构42.5 Exaflops集群算力",
      "summary": "TPU v7 Ironwood 是 Google 面向生成式 AI 推理与训练的双芯粒 Cloud TPU 系统，通过更大的 HBM、片间 ICI、OCS 可重构互联和 XLA/SPMD 编译栈，把单芯片矩阵算力扩展到 9216 芯片、约 42.5 Exaflops 的 Pod 级平台。",
      "keyPoints": [
        "双芯粒封装：一个 Ironwood chip 向软件暴露为两个 TPU device，每个 device 具有独立 HBM、一个 TensorCore、一个 SparseCore、ICI 和 PCIe 资源",
        "单芯片规格：官方 TPU7x 文档给出 4614 TFLOPS 峰值算力、192 GiB HBM、7.2 TB/s HBM 带宽、1.2 TB/s ICI 互联带宽",
        "Pod 级规模：最大 9216 个 chip 组成单个 TPU7x Pod，官方发布说明标称 42.5 Exaflops、约 1.77 PB HBM 和 9.6 PB/s bisection bandwidth",
        "互联设计：继承 TPU v4 的 3D torus/光路交换机路线，Ironwood 在芯片内用 die-to-die ICI 连接双芯粒，在芯片间用 6 条 1D ICI 链路扩展",
        "编程模型：JAX 看到的是 4D 拓扑，末维包含同一 chip 内的两个 device；跨芯片通信比芯片内通信更贵，需要显式考虑 mesh 和 sharding",
        "软件栈：XLA、JAX、Pallas、TensorFlow/PyTorch/XLA 把 Transformer 计算图映射到 MXU、VPU、SparseCore、HBM 和 collective 通信"
      ],
      "detail": "<h5>核心示意图</h5>\n<p><img alt=\"TPU v7 Ironwood chip 架构图\" src=\"https://docs.cloud.google.com/static/tpu/docs/images/ironwood-architecture.png\" />\n<em>图：Google Cloud TPU7x 官方文档中的 Ironwood 架构图，展示双芯粒、HBM、die-to-die ICI、chip-to-chip ICI、TensorCore、SparseCore 和 PCIe；来源：https://cloud.google.com/tpu/docs/tpu7x。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># TPU v7 Ironwood 上的 Transformer block SPMD 分片伪代码\nmesh = Mesh(\n    devices=tpu7x_devices,\n    axes=(&quot;data&quot;, &quot;fsdp&quot;, &quot;tensor&quot;, &quot;chiplet&quot;),\n)\n\ndef transformer_block(x, weights):\n    # batch/sequence 沿 data 维分片，权重沿 tensor 维分片；\n    # chiplet 维优先放同一 Ironwood chip 内的两个 TPU device。\n    x = shard(x, mesh=(&quot;data&quot;, &quot;fsdp&quot;, None, &quot;chiplet&quot;))\n    w_qkv = shard(weights.qkv, mesh=(None, &quot;tensor&quot;))\n\n    qkv = mxu_dot(x, w_qkv)                   # TensorCore/MXU 执行大 GEMM\n    qkv = all_gather(qkv, axis=&quot;tensor&quot;)      # 需要完整 attention head 时通信\n    attn = fused_attention(qkv, layout=&quot;block&quot;)\n\n    y = mxu_dot(attn, shard(weights.out, mesh=(&quot;tensor&quot;, None)))\n    y = reduce_scatter(y, axis=&quot;tensor&quot;)      # 把输出重新切回 tensor mesh\n    y = all_reduce(y, axis=&quot;data&quot;)            # 数据并行梯度/激活规约\n    return y\n</code></pre>\n<p>TPU v7 的公开材料不是传统论文，而是 Google Cloud TPU7x 文档、release notes 和官方产品博客，因此精读重点应放在“系统机制”而不是单个算法公式上。Ironwood 的关键变化是双芯粒：一个物理 chip 由两个 die 组成，软件侧会看到两个 device。官方文档明确说明每个 device 有自己的 HBM、TensorCore、SparseCore、ICI 和 PCIe，而 die-to-die ICI 让同一 chip 内两个 device 的通信比跨 chip 更近。这意味着模型分片时不能只看设备数量，还要把物理邻近性纳入 mesh 规划。</p>\n<p>Pod 级算力来自单芯片吞吐和规模扩展的乘积。官方 TPU7x 文档给出单 chip 约 4614 TFLOPS，最大 Pod 为 9216 chips，因此：</p>\n<div class=\"kb-math kb-math-display\">P_{\\text{pod}} = 9216 \\times 4614\\ \\text{TFLOP/s}\n\\approx 42.5\\ \\text{EFLOP/s}</div>\n<p>这个公式解释了“42.5 Exaflops”不是单芯片突破，而是单芯片 MXU 吞吐、HBM 带宽、ICI 链路和 OCS 网络共同放大后的系统指标。对大模型而言，真正瓶颈通常是如下 roofline 式上界：</p>\n<div class=\"kb-math kb-math-display\">T_{\\text{layer}} \\approx\n\\max \\left(\n\\frac{F_{\\text{GEMM}}}{P_{\\text{MXU}}},\n\\frac{B_{\\text{HBM}}}{BW_{\\text{HBM}}},\n\\frac{B_{\\text{collective}}}{BW_{\\text{ICI/OCS}}}\n\\right)</div>\n<p>第一项是矩阵乘法时间，第二项是 HBM 读写时间，第三项是模型并行或数据并行 collective 的通信时间。Ironwood 把 HBM 提升到 192 GiB/chip 和 7.2 TB/s/chip，目的是让更大的参数、KV cache、activation shard 留在高带宽本地存储里；但如果 attention head、MoE expert 或 FSDP shard 布局不匹配，AllGather/AllReduce 仍会压低有效利用率。</p>\n<p>互联层是 TPU v4 到 TPU v7 的连续主线。TPU v4 论文已经证明了 3D torus 与光路交换机可以让 4096 芯片系统按作业动态组成 topology；Ironwood 文档进一步强调 6 条 1D ICI chip-to-chip 链路和 OCS 对 9216 chip Pod 的扩展价值。对一个跨 <span class=\"kb-math kb-math-inline\">p</span> 个设备的数据并行 AllReduce，通信量近似为：</p>\n<div class=\"kb-math kb-math-display\">T_{\\text{allreduce}} \\approx\n2 \\cdot \\frac{p-1}{p} \\cdot \\frac{S}{BW_{\\text{effective}}}\n + O(\\text{latency} \\cdot \\log p)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">S</span> 是待规约张量大小。TPU v7 的优化目标就是提高 <span class=\"kb-math kb-math-inline\">BW_{\\text{effective}}</span>，并让编译器把高频通信放在更近的 chiplet/chip/torus 维度上。</p>\n<p>软件栈决定这些硬件资源能否被用满。JAX 在 TPU7x 上看到 4D topology，最后一维的两个 device 属于同一个 chip；Pallas kernel 还能使用逻辑 VMEM、SMEM 和管线化 DMA，手动把片上 SRAM 当作显式缓存使用。换言之，TPU v7 并不是“自动变快的 GPU 替代品”，而是需要 XLA/SPMD 根据张量形状、mesh 轴和 collective 模式生成分布式执行计划。</p>\n<p>与 TPU v4 相比，Ironwood 公开资料更少披露微架构细节，但方向清楚：v4 论文强调 OCS、SparseCore、3D torus 和高能效训练，v7 则把同一系统思想推进到双芯粒封装、更高 HBM 容量、更大 Pod 和生成式 AI 服务。对于 LLM 推理，HBM 容量直接决定可驻留权重与 KV cache；对于训练，ICI/OCS 决定张量并行、pipeline 并行和数据并行能否在 9216 芯片规模下保持高利用率。</p>\n<div class=\"key-point\">💡 关键：Ironwood 的“算法”不是新的神经网络训练算法，而是硬件-编译器协同算法：把大模型矩阵计算留在 MXU，把大容量状态留在 HBM，把频繁通信映射到尽量近的 ICI/OCS 维度。</div>",
      "quiz": {
        "q": "为什么 TPU v7 Ironwood 的软件侧要把同一 chip 内的两个 device 当作特殊拓扑维度处理？",
        "options": [
          "因为两个 device 共享同一条更近的 die-to-die ICI，通信代价低于普通跨 chip 通信",
          "因为 TPU v7 不能执行矩阵乘法，只能执行通信",
          "因为 HBM 只存在于其中一个 device 上",
          "因为 JAX 不支持跨设备分片"
        ],
        "answer": 0,
        "explain": "Ironwood 是双芯粒设计，两个 die 各自有 HBM 和计算单元，并通过 die-to-die ICI 连接；合理的 mesh 映射会优先利用这种近距离通信。"
      }
    },
    {
      "id": "diannao",
      "num": 12,
      "name": "DianNao",
      "fullName": "电脑深度学习加速器 (DianNao Accelerator)",
      "year": "2014",
      "org": "ICT-CAS/Inria",
      "parent": "—",
      "paperUrl": "—",
      "projectUrl": "",
      "category": "npu_asic",
      "motivation": "首个DL专用加速器解决片上访存瓶颈",
      "summary": "DianNao 提出了面向神经网络基本层的专用小面积加速器，用片上输入/输出/权重缓冲和 16×16 神经功能单元替代通用 SIMD 的缓存层级，解决早期深度学习推理中外部访存远重于计算的问题。",
      "keyPoints": [
        "ASPLOS 2014 论文《DianNao: A Small-Footprint High-Throughput Accelerator for Ubiquitous Machine-Learning》提出第一代 DianNao 架构",
        "核心计算单元 NFU 包含乘法树、加法树和非线性函数近似三段流水，可在每周期计算 16 个输出神经元对 16 个输入的贡献",
        "片上存储分成 NBin、NBout 和 SB：分别缓存输入神经元、输出/部分和、突触权重，减少对外部 DRAM 的往返访问",
        "采用 16-bit 定点数据路径，论文报告精度损失很小，但面积、功耗和 SRAM 带宽压力显著低于 32-bit 浮点方案",
        "编程模型围绕 layer-by-layer 执行：DMA 预取权重和输入块，NFU 计算局部 partial sum，NBout 累加后写回",
        "论文在 65nm 下报告约 3.02 mm²、485 mW，并相对 SIMD-like 基线取得数量级性能和能效提升"
      ],
      "detail": "<h5>核心示意图</h5>\n<p><img alt=\"DianNao 加速器结构图\" src=\"https://zhifeiding.github.io/assets/images/cambricon/2.png\" />\n<em>图：DianNao 架构示意，展示 NBin、NBout、SB、DMA 和 NFU 的连接关系；图片为公开论文学习笔记对原论文图的转载，原始设计来自 ASPLOS 2014 论文，PDF 可见：https://users.cs.duke.edu/~lkw34/papers/diannao-asplos2014.pdf。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># DianNao 对一个全连接/卷积展开后的神经网络层执行 16x16 分块\nTn = 16   # 每次计算 16 个输出神经元\nTi = 16   # 每次读取 16 个输入神经元\n\nfor out_block in range(0, num_outputs, Tn):\n    NBout.clear(out_block)                         # 输出部分和缓冲\n    for in_block in range(0, num_inputs, Ti):\n        NBin.load(input_neurons[in_block:in_block + Ti])\n        SB.load(weights[out_block:out_block + Tn,\n                        in_block:in_block + Ti])\n\n        # NFU-1: 16x16 乘法；NFU-2: 按输出累加；NFU-3: 非线性近似\n        partial = matvec_16x16(SB, NBin)\n        NBout.accumulate(out_block, partial)\n\n    output[out_block:out_block + Tn] = activation(NBout.read(out_block))\n</code></pre>\n<p>DianNao 的目标是把神经网络层中最规则的运算抽象出来：对一组输入神经元 <span class=\"kb-math kb-math-inline\">x_i</span> 和突触权重 <span class=\"kb-math kb-math-inline\">w_{n,i}</span>，计算输出神经元：</p>\n<div class=\"kb-math kb-math-display\">y_n = f\\left(\\sum_i w_{n,i}x_i\\right)</div>\n<p>传统 CPU/GPU 通过通用 cache 体系搬运这些数据，但早期 CNN/MLP 的权重和中间激活远大于寄存器文件，DRAM 能耗和带宽成为主瓶颈。DianNao 直接把输入神经元、权重、输出部分和拆成三个片上 buffer，使访问模式从“靠 cache 猜测复用”变成“由硬件控制器按神经网络块显式搬运”。</p>\n<p>NFU 是论文的核心。它每周期接收 16 个输入神经元和一组 16×16 权重，先产生 256 个乘积，再按 16 个输出通道分别做规约，最后用分段线性插值近似 sigmoid 等非线性函数。若把一次乘法和一次加法都计为操作，则每周期理论操作数近似为：</p>\n<div class=\"kb-math kb-math-display\">Ops_{\\text{cycle}} = 16 \\times 16\\ \\text{mul}\n + 16 \\times (16-1)\\ \\text{add} = 496</div>\n<p>论文中约 0.98 GHz 的频率对应数百 GOP/s 级峰值，这解释了为什么一个很小的 ASIC 能超过通用 SIMD 基线：它不是用更多控制逻辑取胜，而是把数据路径固定为神经网络最常见的 16×16 矩阵-向量块。</p>\n<p>片上 buffer 的分工也很关键。NBin 保存输入神经元，SB 保存当前块权重，NBout 保存输出 partial sum。对全连接层，一个输入块会被 16 个输出神经元复用；对卷积层，同一窗口数据会在多个 filter 上复用。DianNao 的控制器利用这种复用顺序安排 DMA，把外部访存压缩到“每个块加载一次、计算多次”的节奏。</p>\n<p>非线性函数没有用昂贵的通用函数单元。NFU-3 采用分段线性插值：</p>\n<div class=\"kb-math kb-math-display\">f(x) \\approx a_j x + b_j,\\quad x \\in [l_j, r_j)</div>\n<p>其中区间 <span class=\"kb-math kb-math-inline\">j</span> 由输入范围决定，<span class=\"kb-math kb-math-inline\">a_j,b_j</span> 存在小表里。这种设计牺牲了极少数值精度，但把 sigmoid/tanh 等激活变成一次乘加和查表，更符合小面积、低功耗的目标。</p>\n<p>与后来的 DaDianNao、TPU、NVDLA 相比，DianNao 的局限也明显：它仍假设权重和激活可以分块流入一个单核加速器，外部内存仍是全局资源；当模型参数继续增大时，SB 不可能容纳足够多权重，DRAM 带宽会再次成为瓶颈。这正是 DaDianNao 后续选择把大量 eDRAM 放到计算节点附近的原因。</p>\n<div class=\"key-point\">💡 关键：DianNao 的贡献不是某个新的神经网络算子，而是把神经网络层的计算公式硬化成“显式片上缓冲 + 固定 16×16 数据路径 + 低成本非线性”的 NPU 原型。</div>",
      "quiz": {
        "q": "DianNao 为什么把片上存储拆成 NBin、NBout 和 SB？",
        "options": [
          "为了让输入、输出部分和、权重分别按不同复用模式缓存，减少外部 DRAM 访问",
          "为了模拟 CPU 的多级 cache 替换策略",
          "为了把所有训练数据永久保存在片上",
          "为了让每个输出神经元只能使用一个输入神经元"
        ],
        "answer": 0,
        "explain": "神经网络层中输入、权重和输出部分和的生命周期不同，分离缓冲可以显式调度 DMA 和复用，避免通用 cache 无法稳定捕捉的访问模式。"
      }
    },
    {
      "id": "dadiannao",
      "num": 13,
      "name": "DaDianNao",
      "fullName": "大电脑多核架构 (DaDianNao Multi-chip Architecture)",
      "year": "2014",
      "org": "ICT-CAS/Inria",
      "parent": "diannao",
      "paperUrl": "—",
      "projectUrl": "",
      "category": "npu_asic",
      "motivation": "eDRAM片上存储消除外部DRAM访问压力",
      "summary": "DaDianNao 在 DianNao 的单核 NPU 基础上提出多芯片机器学习超级计算机，把大量 eDRAM 直接放到计算节点内保存突触权重，用近存计算和节点间广播/归约缓解大模型的外部 DRAM 带宽瓶颈。",
      "keyPoints": [
        "MICRO 2014 论文《DaDianNao: A Machine-Learning Supercomputer》把 DianNao 扩展为多节点系统，目标是让大规模神经网络权重常驻片上 eDRAM",
        "每个 node 包含 16 个 tile、一个中央 eDRAM 模块和片上 fat-tree；每个 tile 由 NFU、NBin/NBout 和多个 eDRAM bank 组成",
        "论文给出的典型 node 容量为 16 个 tile × 2 MB eDRAM 加中央 4 MB eDRAM，约 36 MB，用来分布式保存 synapses",
        "计算模式从“权重流入计算核”变为“神经元流过保存权重的计算节点”，显著降低外部 DRAM 访问",
        "节点间通过高速链路组成 2D mesh，采用 computing-and-forwarding，让输出神经元/部分和在节点间边传输边累加",
        "支持推理和训练路径，NFU 数据路径可配置为分类层、卷积层、归一化层和反向传播中的向量/矩阵运算"
      ],
      "detail": "<h5>核心示意图</h5>\n<p><img alt=\"DaDianNao node 与 tile 架构图\" src=\"https://zhifeiding.github.io/assets/images/cambricon/7.png\" />\n<em>图：DaDianNao 节点和 tile 的组织结构，展示 NFU、NBin/NBout、eDRAM bank、central eDRAM 和片上互联；图片为公开论文学习笔记对原论文图的转载，原始设计来自 MICRO 2014 论文，PDF 可见：https://www.eecg.utoronto.ca/~moshovos/000/lib/exe/fetch.php?media=wiki%3Aaca2017%3Adadiannao.pdf。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># DaDianNao: 权重常驻各节点 eDRAM，输入神经元在节点间广播，输出部分和逐步累加\nfor layer in network.layers:\n    partition_synapses_across_nodes(layer.weights, nodes)\n    broadcast(layer.input_neurons, to=nodes)\n\n    for node in nodes_in_mesh_order:\n        for tile in node.tiles:\n            x = tile.NBin.load(layer.input_neurons)\n            w = tile.eDRAM.read_synapse_partition()\n            partial = tile.NFU.compute(w, x)       # 局部矩阵-向量/卷积块\n            tile.NBout.accumulate(partial)\n\n        node_sum = node.fat_tree_reduce(tile.NBout)\n        forward_to_next_node(node_sum)             # computing-and-forwarding\n\n    layer.output_neurons = apply_activation(global_reduce(nodes))\n</code></pre>\n<p>DaDianNao 解决的是 DianNao 放大后的核心矛盾：单核 NFU 已经能高速消耗权重，但如果每个周期都从外部 DRAM 喂入 16×16 个 16-bit synapse，带宽需求会极高。论文指出高吞吐 NFU 对突触带宽的需求达到数百 GB/s 量级，通用内存系统难以低功耗满足。因此 DaDianNao 反过来让权重尽量不移动，把 synapses 分散放入每个 tile 附近的 eDRAM。</p>\n<p>对一个全连接层，DianNao 式计算仍是：</p>\n<div class=\"kb-math kb-math-display\">y_n = f\\left(\\sum_i w_{n,i}x_i\\right)</div>\n<p>DaDianNao 把权重按节点和 tile 切分后，输出变成分布式部分和：</p>\n<div class=\"kb-math kb-math-display\">y_n =\nf\\left(\n\\sum_{m=0}^{M-1}\n\\sum_{i \\in \\mathcal{P}_m}\nw_{n,i}^{(m)}x_i\n\\right)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\mathcal{P}_m</span> 是第 <span class=\"kb-math kb-math-inline\">m</span> 个节点保存的输入/权重分片。这样移动的是 <span class=\"kb-math kb-math-inline\">x_i</span> 和 partial sum，而不是庞大的 <span class=\"kb-math kb-math-inline\">w_{n,i}</span>。当权重可复用多次时，这个转置的数据流显著降低了主存压力。</p>\n<p>eDRAM 是架构权衡的中心。它比 SRAM 密度高，适合在芯片上放几十 MB 的突触，但读写延迟、刷新和破坏性读出比 SRAM 更复杂。DaDianNao 因此把 eDRAM 分散成多个 bank，并靠 tile 本地 NFU 消耗相邻权重，减少长距离片上走线。一个典型 node 的存储容量可表示为：</p>\n<div class=\"kb-math kb-math-display\">C_{\\text{node}} = 16 \\times 2\\ \\text{MB} + 4\\ \\text{MB}\n = 36\\ \\text{MB}</div>\n<p>多节点互联承担的是神经元和 partial sum 的移动。论文中的 machine 由多个 node 通过二维 mesh 连接，node 内部用 fat-tree 汇聚 tile 结果。computing-and-forwarding 的直觉是：一个节点收到输入神经元后立即计算本地权重贡献，并把结果继续传给下一个节点，而不是等待所有节点同步完成后再集中规约。这减少了全局 barrier，也让通信和计算重叠。</p>\n<p>与 GPU 或 CPU 集群相比，DaDianNao 的优势来自“内存位置”而不是单纯增加乘法器。通用处理器通常让权重驻留在 DRAM/HBM，再通过 cache hierarchy 进入算术单元；DaDianNao 把权重放到每个 tile 旁边，让高复用 synapses 的访问能耗接近片上存储访问。代价是灵活性下降：模型必须被映射到固定 tile/eDRAM 容量和 mesh 传输模式上，稀疏、不规则或超出片上容量的网络会削弱优势。</p>\n<p>训练支持体现了它不是只做前向推理。反向传播中的梯度计算本质上仍是矩阵-向量/矩阵-矩阵式累加，只是数据流方向和写回对象不同；DaDianNao 通过 NFU 可配置流水和 eDRAM 写回支持权重更新。但从现代视角看，DaDianNao 更像“近存 NPU 集群”的早期原型：它预见了后来 HBM、片上 SRAM、wafer-scale engine 和 AI ASIC 都在追求的同一原则，即让权重和计算尽量物理靠近。</p>\n<div class=\"key-point\">💡 关键：DaDianNao 的核心不是把 DianNao 简单复制 16 份，而是改变数据流方向，让权重静止、神经元移动，从系统层面压低最昂贵的外部访存。</div>",
      "quiz": {
        "q": "DaDianNao 相比 DianNao 最核心的架构变化是什么？",
        "options": [
          "把大量突触权重保存在节点内 eDRAM，让神经元和部分和在节点间流动",
          "完全取消片上存储，所有权重每周期从 DRAM 读取",
          "把神经网络计算改成 CPU 标量指令",
          "只支持非线性激活函数，不支持矩阵乘法"
        ],
        "answer": 0,
        "explain": "DaDianNao 的主要创新是权重常驻近计算 eDRAM，减少外部 DRAM 带宽和能耗；节点间主要移动输入神经元和输出部分和。"
      }
    },
    {
      "id": "cambricon_isa",
      "num": 14,
      "name": "Cambricon ISA",
      "fullName": "寒武纪神经网络指令集 (Cambricon Instruction Set Architecture)",
      "year": "2016",
      "org": "ICT-CAS",
      "parent": "dadiannao",
      "paperUrl": "https://dl.acm.org/doi/abs/10.1145/3007787.3001179",
      "projectUrl": "",
      "category": "npu_asic",
      "motivation": "首个神经网络指令集架构标准化AI芯片编程",
      "summary": "Cambricon ISA 提出了面向神经网络的专用指令集，把矩阵、向量、非线性函数和显式数据搬运提升为硬件可见的一等操作。它解决了固定功能神经网络加速器可编程性弱、通用 CPU/GPU 指令又过细的问题，为后续 NPU 形成“专用数据路径 + 可编程 ISA”的设计范式。",
      "keyPoints": [
        "定义面向神经网络的 load-store ISA，包含控制、数据传输、算术和逻辑四类指令",
        "以标量、向量、矩阵三类操作数覆盖全连接、卷积、池化、归一化、激活和循环网络等常见算子",
        "使用片上 scratchpad 显式承载向量/矩阵数据，避免把大张量塞进传统通用寄存器文件",
        "引入 MMV、VMM、MADD、VMUL、VEXP、VDIV、VGTM 等高层张量指令，提高代码密度",
        "基于 DaDianNao 风格 NPU 数据路径实现原型，在有限硬件开销下支持更多神经网络类型",
        "与 x86、MIPS、GPGPU 和固定功能加速器相比，重点优化神经网络程序的表达效率和能效"
      ],
      "detail": "<h5>核心示意图</h5>\n<p><img alt=\"Cambricon 指令类型概览\" src=\"https://raw.githubusercontent.com/BirenResearch/AIChip_Paper_List/master/notes/ISCA/media/d4faf39bcbf649cb328087e03f3cbd4a.png\" />\n<em>图：Cambricon 论文中指令类别的公开摘录图，来源为 BirenResearch/AIChip_Paper_List 对 ISCA 2016 论文的公开笔记镜像。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-asm\"># Cambricon 风格的神经网络层执行伪代码\nLOAD.V   v_x,  [input_addr]       # 从主存搬运激活向量到片上向量缓冲\nLOAD.M   m_w,  [weight_addr]      # 从主存搬运权重矩阵到片上矩阵缓冲\nMMV      v_y,  m_w, v_x           # v_y = W x\nVADD     v_y,  v_y, v_bias        # v_y = v_y + b\nVEXP     v_t,  -v_y               # sigmoid/tanh/softmax 等非线性可拆为向量函数\nVADD.S   v_t,  v_t, 1.0\nVDIV     v_y,  1.0, v_t\nSTORE.V  [output_addr], v_y\n</code></pre>\n<p>Cambricon 的出发点不是重新发明神经网络算法，而是重新定义“机器指令应该暴露到什么粒度”。传统 RISC/CPU 指令以标量加减乘除和内存访问为中心，表达一个全连接层或卷积层时需要大量循环、地址计算和微小算术指令；固定功能加速器如早期 DaDianNao 又把数据路径固化在少数网络形态上，遇到新层类型或新模型拓扑时扩展困难。Cambricon 把神经网络中的核心张量模式直接抽象成 ISA 指令，使编译器可以把层级计算映射到稳定的硬件原语上。</p>\n<p>论文的核心机制是“通用控制 + 专用张量操作数”。Cambricon 仍采用 load-store 风格：只有数据传输指令访问主存，计算指令只操作片上寄存器或 scratchpad 中的标量、向量、矩阵对象。全连接层可写成：</p>\n<div class=\"kb-math kb-math-display\">y=f(Wx+b)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">W</span> 是矩阵，<span class=\"kb-math kb-math-inline\">x</span>、<span class=\"kb-math kb-math-inline\">b</span>、<span class=\"kb-math kb-math-inline\">y</span> 是向量。Cambricon 用一次矩阵-向量指令完成主计算，再用向量加法和向量非线性函数完成后处理；这比把每个乘加拆成标量指令有更高代码密度，也让硬件调度器能清楚看到数据复用机会。</p>\n<p>片上存储是 Cambricon 与传统向量机的重要区别。神经网络参数和激活往往远大于通用寄存器文件，因此 Cambricon 不把所有向量/矩阵都设计成固定数量的硬寄存器，而是用显式 scratchpad 和地址化对象承载大块张量。这样做牺牲了一部分缓存透明性，但让编译器可以精确安排搬运、复用和覆盖写入，符合 NPU 上“访存能耗远高于乘加”的约束。</p>\n<p>逻辑指令用于表达神经网络里常被忽视但非常重要的非线性和选择操作。例如池化或 ReLU 类操作本质上是逐元素比较：</p>\n<div class=\"kb-math kb-math-display\">z_i=\\max(x_i, y_i)</div>\n<p>在普通 ISA 上，这通常需要比较、分支或掩码组合；Cambricon 用向量比较/选择类指令直接表示，减少控制流开销，也更适合 SIMD/Tensor datapath 执行。反向传播里的外积更新也能自然映射到矩阵操作：</p>\n<div class=\"kb-math kb-math-display\">\\Delta W=\\eta \\cdot \\delta x^\\top,\\qquad W \\leftarrow W-\\Delta W</div>\n<p>因此它不只服务推理，还为训练中的梯度传播和权重更新留下了指令表达空间。</p>\n<p>与 DaDianNao 这样的固定数据路径相比，Cambricon 的优势在于把“神经网络共同结构”抽象为 ISA，而不是把某个网络结构写死在电路里。硬件仍可以保留矩阵乘阵列、向量函数单元、DMA 和片上缓冲等 NPU 组件，但软件通过指令序列组合它们。这个折中正是后续 AI 芯片常见路线：底层数据路径高度专用，上层通过图编译器或算子编译器生成设备 ISA。</p>",
      "quiz": {
        "q": "Cambricon ISA 相比传统通用 ISA 的核心优势是什么？",
        "options": [
          "把神经网络常见的矩阵、向量和非线性操作提升为硬件可见指令",
          "完全取消片上存储，所有张量都直接放在主存中计算",
          "只支持单一固定神经网络，换模型必须重新设计芯片",
          "用更多标量分支指令替代矩阵乘指令"
        ],
        "answer": 0,
        "explain": "Cambricon 的关键是用神经网络专用指令提高表达密度和硬件可调度性，同时保留比固定功能加速器更好的可编程性。"
      }
    },
    {
      "id": "ascend_davinci",
      "num": 15,
      "name": "Ascend Da Vinci",
      "fullName": "昇腾达芬奇架构 (Ascend Da Vinci Architecture)",
      "year": "2021",
      "org": "Huawei",
      "parent": "—",
      "paperUrl": "—",
      "projectUrl": "",
      "category": "npu_asic",
      "motivation": "3D Cube计算单元实现端云统一架构覆盖",
      "summary": "Ascend Da Vinci 是华为昇腾 NPU 的核心计算架构，用 Cube、Vector、Scalar 和显式存储搬运单元组成 AI Core。它通过 3D Cube 矩阵计算和可扩展 AI Core 集群覆盖训练、推理、边缘和端侧场景，解决了统一架构下兼顾矩阵吞吐、算子灵活性和能效的问题。",
      "keyPoints": [
        "AI Core 由 Cube、Vector、Scalar、MTE 和片上多级存储组成，分别负责矩阵、向量、控制和数据搬运",
        "Cube 单元面向矩阵乘/卷积主算子，把神经网络中的 GEMM 映射到高吞吐 3D 计算结构",
        "Vector 单元处理激活、归一化、逐元素算子、数据类型转换和后处理，补足 Cube 的固定矩阵能力",
        "Scalar 单元负责控制流、地址生成、循环调度和指令协同，使 AI Core 不是纯固定功能阵列",
        "显式内存层次包含 Global Memory、L1、L0A/L0B/L0C、Unified Buffer 等，由编译器/算子代码安排搬运",
        "CANN、TBE/TIK、Ascend C 等软件栈把深度学习图编译成 AI Core 可执行的分块、搬运和计算流水线",
        "同一 Da Vinci 架构思想被扩展到 Ascend 310、Ascend 910 等芯片，覆盖边缘推理到数据中心训练"
      ],
      "detail": "<h5>核心示意图</h5>\n<p><img alt=\"Da Vinci Architecture\" src=\"https://media.springernature.com/full/springer-static/image/chp%3A10.1007%2F978-981-19-2879-6_6/MediaObjects/513316_1_En_6_Fig2_HTML.png\" />\n<em>图：Da Vinci Architecture 的公开架构示意，展示 Cube、Vector、Scalar、Memory Migration Unit、Instruction Queue 与事件同步模块；来源为 Springer Nature Open Access 章节《Huawei Atlas AI Computing Solution》。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># Ascend Da Vinci AI Core 上的分块 GEMM/卷积数据流伪代码\nfor core in ai_cores:\n    for m_tile, n_tile, k_tile in schedule(problem_shape):\n        mte2_copy_gm_to_l1(A[m_tile, k_tile], B[k_tile, n_tile])\n        mte1_copy_l1_to_l0(l0a=A_tile, l0b=B_tile)\n        c_tile = cube_mmad(l0a, l0b, accumulate=True)\n        ub_tile = move_l0c_to_ub(c_tile)\n        ub_tile = vector_postprocess(ub_tile, bias, activation, cast)\n        mte3_copy_ub_to_gm(C[m_tile, n_tile], ub_tile)\n</code></pre>\n<p>Da Vinci 架构的基本判断是：神经网络工作负载中，绝大多数 FLOPs 来自矩阵乘、卷积和 attention 里的 batched GEMM，但一个完整模型并不只包含矩阵乘。激活函数、LayerNorm/BatchNorm、reshape、padding、数据格式转换和 loss 计算都需要更灵活的向量与标量能力。Da Vinci 因此没有把 AI Core 设计成单一脉动阵列，而是把高吞吐 Cube 与可编程 Vector/Scalar 组合在一起。</p>\n<p>Cube 单元对应主计算公式：</p>\n<div class=\"kb-math kb-math-display\">C_{m,n}=\\sum_{k=0}^{K-1}A_{m,k}B_{k,n}</div>\n<p>3D Cube 的直觉是把矩阵块的 <span class=\"kb-math kb-math-inline\">M</span>、<span class=\"kb-math kb-math-inline\">N</span>、<span class=\"kb-math kb-math-inline\">K</span> 三个维度同时展开：<span class=\"kb-math kb-math-inline\">M</span> 和 <span class=\"kb-math kb-math-inline\">N</span> 方向产生输出块，<span class=\"kb-math kb-math-inline\">K</span> 方向做乘累加规约。这样一个 Cube 指令可以消耗 L0A/L0B 中的输入块并把累加结果写入 L0C。与把 GEMM 拆成大量通用 SIMD 指令相比，Cube 暴露了更粗粒度的数据复用机会，也能让硬件在固定数据路径内提升吞吐/瓦特。</p>\n<p>Da Vinci 的另一个关键是显式存储层次。Global Memory 保存模型权重、激活和梯度，L1/Unified Buffer 承接较大的片上块，L0A/L0B/L0C 分别服务 Cube 输入和累加输出。数据搬运由 MTE 管线完成，计算由 Cube/Vector 管线完成，性能好坏很大程度取决于能否让搬运与计算重叠：</p>\n<div class=\"kb-math kb-math-display\">T_{\\text{tile}}\\approx \\max(T_{\\text{copy}},T_{\\text{cube}},T_{\\text{vector}})+T_{\\text{sync}}</div>\n<p>这也是 Ascend 算子开发强调 tiling、double buffer 和 pipeline 的原因。算子不是只写数学公式，还要决定每个 tile 的形状、在片上哪个缓冲区驻留、什么时候预取下一块、什么时候把结果写回。</p>\n<p>Vector 与 Scalar 使架构具备可编程性。Vector 管线执行逐元素运算、类型转换、比较选择和归一化中的局部规约；Scalar 管线负责循环、分支、地址计算和指令控制。一个典型算子会让 Scalar 维护 tile 循环，MTE 预取下一块数据，Cube 计算当前矩阵块，Vector 对上一块结果做 bias、activation 或 cast，从而形成多管线并行。</p>\n<p>与 GPU 的 SIMT/warp 模型相比，Da Vinci 更接近“显式编排的张量数据流机器”。GPU 程序通常依赖缓存层次和线程调度器隐藏复杂性；Ascend AI Core 则要求编译器或算子模板明确表达数据搬运和片上存储占用。代价是开发和编译复杂度更高，收益是对深度学习主算子的能效、确定性和端云统一部署更友好。</p>",
      "quiz": {
        "q": "Ascend Da Vinci AI Core 中 Cube 单元主要解决什么问题？",
        "options": [
          "高吞吐执行矩阵乘和卷积等神经网络主算子",
          "替代所有片上存储，直接从主存逐元素计算",
          "只负责 Python 控制流解释执行",
          "专门处理以太网 RDMA 通信"
        ],
        "answer": 0,
        "explain": "Cube 是 Da Vinci AI Core 的矩阵计算核心，配合 L0/L1/UB 和 MTE 数据搬运实现高效 GEMM/卷积数据流。"
      }
    },
    {
      "id": "habana_gaudi",
      "num": 16,
      "name": "Habana Gaudi",
      "fullName": "Habana高迪处理器 (Habana Gaudi Processor)",
      "year": "2020",
      "org": "Intel/Habana",
      "parent": "—",
      "paperUrl": "https://ieeexplore.ieee.org/abstract/document/9018203/",
      "projectUrl": "",
      "category": "npu_asic",
      "motivation": "集成10×100GbE以太网支持RDMA横向扩展",
      "summary": "Habana Gaudi 是面向深度学习训练的专用处理器，用 MME 矩阵引擎、可编程 TPC 张量核心和片上 10×100GbE RoCE 网络接口组合成计算/通信一体化架构。它解决了多加速器训练中计算芯片与外部网络解耦导致的扩展成本和通信瓶颈问题。",
      "keyPoints": [
        "采用异构计算架构，MME 负责 GEMM/卷积主计算，TPC 负责非矩阵张量算子和自定义内核",
        "每颗芯片集成 10 个 100GbE RoCE v2 端口，可直接进行 RDMA 通信",
        "HLS-1 训练服务器使用 8 颗 Gaudi，服务器内通过 Gaudi 端口组成全互联拓扑",
        "支持 BF16/FP32 等训练数据类型，面向数据中心训练而非单纯推理",
        "片上 SRAM、DMA 和 HBM2 组成显式数据路径，服务 MME/TPC 之间的计算流水",
        "SynapseAI 软件栈负责图编译、算子映射、运行时调度和 PyTorch/TensorFlow 集成",
        "核心差异化不只是矩阵吞吐，而是用标准以太网实现低成本横向扩展"
      ],
      "detail": "<h5>核心示意图</h5>\n<p><img alt=\"Habana HLS-1 Gaudi 训练系统\" src=\"https://mma.prnewswire.com/media/903247/HLS_1_Open_Overhead_View_smaller.jpg?p=publish\" />\n<em>图：Habana 发布的 HLS-1 Gaudi 训练系统公开图片，展示 8 卡服务器形态；来源为 Habana Labs/PRNewswire 官方发布材料。</em></p>\n<p><img alt=\"Intel Gaudi 系列高层架构图\" src=\"https://docs.habana.ai/en/latest/_images/Gaudi2_Processor_High_Level_Architecture.png\" />\n<em>图：Intel Gaudi 官方文档中的 Gaudi 系列高层架构图；第一代 Gaudi 与后续 Gaudi2/3 共享 MME、TPC、片上网络和存储协同的架构思想，但端口数量与单元规模不同。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># Gaudi 数据并行训练中的计算-通信重叠伪代码\nfor step, batch in enumerate(loader):\n    activations = mme_tpc_forward(model, batch)\n    gradients = mme_tpc_backward(model, activations)\n\n    for chunk in shard(gradients):\n        rdma_reduce_scatter_async(chunk, ports=&quot;10x100GbE RoCE&quot;)\n        mme_tpc_compute_next_chunk_if_ready()\n\n    averaged = rdma_allgather_async(gradients)\n    optimizer_update(model, averaged)\n</code></pre>\n<p>Gaudi 的设计动机来自训练系统而不是单芯片 benchmark。深度学习训练的 step time 通常由两部分构成：本地前向/反向计算，以及跨设备梯度同步。数据并行训练中的梯度平均可以写成：</p>\n<div class=\"kb-math kb-math-display\">g=\\frac{1}{P}\\sum_{p=1}^{P}g_p</div>\n<p>当 <span class=\"kb-math kb-math-inline\">P</span> 增大时，通信成本会快速侵蚀计算加速收益。传统 GPU 集群通常依赖外部 NIC、PCIe、InfiniBand 交换机或专有互联来做 AllReduce；Gaudi 则把 100GbE RoCE 网络接口直接集成进训练处理器，让芯片本身成为计算节点和网络节点。</p>\n<p>计算侧由 MME 和 TPC 分工。MME 面向矩阵乘、卷积和 attention 中的 GEMM，是高吞吐主引擎；TPC 是可编程 VLIW/SIMD 张量处理核心，负责激活、归一化、shape 处理、数据类型转换和难以落入固定矩阵阵列的自定义算子。一个训练 layer 往往会先由 MME 产生矩阵结果，再由 TPC 做后处理，二者通过片上 SRAM、DMA 和 HBM2 交换数据。</p>\n<p>通信侧的关键是 10×100GbE RoCE v2。第一代 Gaudi 的 HLS-1 服务器中，8 颗 Gaudi 可使用部分端口构成服务器内全互联，其余端口连接外部以太网交换机做跨服务器扩展。这样做的工程意义很直接：服务器内 AllReduce 可以走直连链路，跨服务器通信仍复用标准以太网生态，避免把系统扩展完全绑定到昂贵的专有网络。</p>\n<p>计算-通信重叠是 Gaudi 架构能否发挥价值的核心机制。理想情况下，一个训练 step 的时间近似为：</p>\n<div class=\"kb-math kb-math-display\">T_{\\text{step}}\\approx \\max(T_{\\text{compute}},T_{\\text{communication}})+T_{\\text{serial}}</div>\n<p>如果 RDMA 梯度同步能与后续反向计算或优化器准备并行，通信就不会线性叠加到 step time 上。Gaudi 把网络端口、DMA 和计算引擎放在同一芯片内，正是为了缩短数据从 HBM/SRAM 到网络的路径，并给运行时更多机会安排异步传输。</p>\n<p>软件栈上，SynapseAI 负责把 PyTorch/TensorFlow 图转换成 Gaudi 可执行图，图编译器决定哪些算子落到 MME、哪些落到 TPC，以及内存和 DMA 如何排布。与 CUDA GPU 相比，Gaudi 的生态成熟度较弱，但架构方向非常鲜明：它把训练系统的瓶颈从“单卡算力”扩展到“算力、片上存储、网络和编译器共同调度”。</p>",
      "quiz": {
        "q": "Habana Gaudi 第一代处理器最突出的系统级创新是什么？",
        "options": [
          "在训练处理器上集成 10×100GbE RoCE RDMA 网络端口",
          "只保留标量 CPU 核心，不提供矩阵乘硬件",
          "把所有通信都强制经过主机内存和外部 NIC",
          "取消软件编译器，所有算子都人工写二进制"
        ],
        "answer": 0,
        "explain": "Gaudi 的差异化在于计算芯片直接集成高速以太网 RDMA，用标准以太网降低多卡/多节点训练扩展成本并支持计算-通信重叠。"
      }
    },
    {
      "id": "cerebras_wse",
      "num": 17,
      "name": "Cerebras WSE",
      "fullName": "Cerebras晶圆级引擎 (Cerebras Wafer-Scale Engine)",
      "year": "2024",
      "org": "Cerebras",
      "parent": "—",
      "paperUrl": "—",
      "projectUrl": "",
      "category": "emerging_chips",
      "motivation": "整片晶圆单颗芯片85万核消除芯片间通信",
      "summary": "Cerebras WSE 把通常会被切割成许多小芯片的 300 mm 晶圆做成单颗 AI 处理器，用数十万独立核心、分布式 SRAM 和全晶圆 2D fabric 解决 GPU 集群中芯片间通信、内存带宽和模型并行复杂度过高的问题。2024 年的 WSE-3 延续这一思路，而条目中的 85 万核指标对应 WSE-2 一代的典型公开规格。",
      "keyPoints": [
        "晶圆级集成：WSE-2 约 46,000 mm²、2.6T 晶体管、850,000 个 AI 核心；WSE-3 在 2024 年公布为 5nm、约 4T 晶体管、900,000 个 AI 优化核心",
        "每个核心附近放置本地 SRAM，WSE-2 总片上 SRAM 约 40 GB，避免把激活和中间状态频繁搬到外部 DRAM",
        "全晶圆核心通过 2D mesh fabric 相连，每个核心路由器面向东西南北和本地核心，使用静态路由和虚拟通道颜色传输细粒度 wavelet",
        "核心采用数据流调度，非零数据到达会触发相应任务，可天然跳过稀疏权重中的零元素",
        "Weight Streaming 把权重保存在外部 MemoryX，按层和按权重流入 WSE，计算完成后丢弃权重，反向传播时梯度流回外部更新",
        "SwarmX/多系统扩展主要做数据并行广播和梯度归约，减少传统 GPU 训练中复杂的 tensor/pipeline/model parallel 组合",
        "主要优势来自“把通信留在晶圆上”：片内短线替代封装、板级和网络互联，降低延迟、功耗和分布式编程成本"
      ],
      "detail": "<h5>核心示意图</h5>\n<p><img alt=\"Cerebras WSE-3 官方芯片图\" src=\"https://cdn.sanity.io/images/e4qjo92p/production/f552d23b565912e206698908c746f5454f9516e8-1070x877.png\" />\n<em>图：Cerebras WSE-3 官方产品页使用的远程图片。公开论文图较少，架构机制依据 Cerebras 官方 Architecture Deep Dive、Hot Chips 2022/2024 资料和 SDK 文档整理。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># Cerebras WSE: 权重流式进入晶圆，激活常驻/分布在 PE 网格上的稀疏 GEMM 数据流\nmesh = place_activations_on_2d_wafer(batch, sequence, hidden)\n\nfor layer in transformer_layers:\n    route_plan = compiler_static_routes(layer, mesh)\n\n    for out_feature in layer.output_features:\n        clear_partial_sums(mesh, out_feature)\n\n        for in_feature, weight in MemoryX.stream_nonzero_weights(layer, out_feature):\n            color = route_plan.weight_broadcast_color(in_feature)\n            broadcast_wavelet(color, payload=(in_feature, weight, &quot;FMAC&quot;))\n\n            parallel_for pe in mesh.receivers(color):\n                x = pe.local_sram.read_activation(in_feature)\n                pe.acc[out_feature] += weight * x\n\n        broadcast_wavelet(route_plan.reduce_color(out_feature), payload=(&quot;PSUM&quot;, out_feature))\n        reduce_partial_sums_across_rows_and_columns(mesh, out_feature)\n\n    stream_gradients_back_to_MemoryX_if_training(layer)\n</code></pre>\n<h5>方法机制解读</h5>\n<p>Cerebras WSE 的核心动机是把大模型训练中最昂贵的通信路径从“跨芯片、跨板卡、跨交换机”改成“同一片硅上的短距离传输”。传统 GPU 集群需要把一个模型拆成数据并行、张量并行、流水并行甚至专家并行的组合，瓶颈往往不只是 FLOPS，而是参数、激活、梯度和 KV/中间张量在设备之间移动的成本。WSE 用整片晶圆保留 die 之间的金属互联，让 84 个左右的 reticle 区域在逻辑上形成一颗芯片，尽量把通信限制在片内 fabric。</p>\n<p>每个 WSE 核心都带本地 SRAM、程序控制和 fabric router，因此它更接近超大规模分布式 dataflow 机器，而不是一个带共享缓存的大 GPU。对矩阵乘：</p>\n<div class=\"kb-math kb-math-display\">Y_{b,s,j}=\\sum_i X_{b,s,i}W_{i,j}</div>\n<p>WSE 会把 <span class=\"kb-math kb-math-inline\">(b,s,h)</span> 等激活维度映射到二维核心网格上，让隐藏维、batch/sequence 维沿不同方向分布。权重按行或按块从 MemoryX 流入，匹配某个输入特征的核心列收到权重 wavelet 后执行 FMAC，本地累加部分和，随后通过 fabric 规约得到输出特征。若权重稀疏，实际计算可写成：</p>\n<div class=\"kb-math kb-math-display\">Y_{b,s,j}=\\sum_{i:W_{i,j}\\ne 0} X_{b,s,i}W_{i,j}</div>\n<p>这说明零权重不需要触发计算和通信，稀疏性直接变成少发 wavelet、少做 FMAC。</p>\n<p>数据流调度是 WSE 区别于 SIMD/SIMT GPU 的关键。GPU 通常让许多线程执行同一 kernel，并依赖寄存器、shared memory、cache 和调度器隐藏访存延迟；WSE 的核心则在收到带控制信息的 wavelet 时激活对应任务，任务运行到完成后硬件选择下一个可运行任务。Cerebras 文档把这些 wavelet 组织到不同颜色的虚拟通道中，静态路由让编译器提前知道数据会沿哪些链路流动，因此片内通信更可预测，也更容易把广播、规约和计算重叠起来。</p>\n<p>片上 SRAM 容量可以用 WSE-2 的公开指标理解：</p>\n<div class=\"kb-math kb-math-display\">C_{\\text{SRAM}}\\approx 850000 \\times 48\\text{KB}\\approx 40\\text{GB}</div>\n<p>这不是普通 GPU 那种小而快的片上缓存，而是分散在核心旁的工作存储。激活、中间状态和程序代码被放在使用它们的 PE 附近，避免把每层结果反复写回 HBM/DRAM。代价是编译器必须显式规划布局、路由和同步；收益是在数据复用和通信形态符合映射时，核心可以用很低的控制开销持续消耗本地数据。</p>\n<p>Weight Streaming 解决了“模型参数大于片上 SRAM”的问题。WSE 不要求所有权重同时驻留在晶圆上，而是把权重保存在外部 MemoryX，按计算顺序流过晶圆；每个权重触发它负责的 AXPY/FMAC 风格操作，算完即可丢弃。训练时，反向传播产生的梯度再反向流回 MemoryX 更新。这样片上内存主要服务激活和部分和，模型规模由外部权重存储扩展；与 GPU 模型并行相比，它把许多分布式切分问题推给一个静态可分析的数据流计划。</p>\n<p>WSE-3 的意义在于把这种架构继续推到 2024 年代际：更多晶体管、更多核心、更大片上 SRAM 和更高 AI 峰值吞吐。但精读时不应把“2024 WSE-3 的 900k 核”和条目 motivation 的“85 万核”混为同一代，后者是 WSE-2/CS-2 公开架构深度资料中的代表性数字。两代共同的本质创新不是某个单点规格，而是整片晶圆作为单个 dataflow fabric，尽可能取消传统多芯片 AI 系统的通信边界。</p>\n<div class=\"key-point\">💡 关键：Cerebras WSE 的“消除芯片间通信”不是完全没有外部 I/O，而是把最频繁、最细粒度的神经网络通信放到晶圆内部，让外部系统主要承担权重流、host I/O 和数据并行归约。</div>",
      "quiz": {
        "q": "Cerebras WSE 用整片晶圆做一颗 AI 芯片的主要架构收益是什么？",
        "options": [
          "把大量核心、本地 SRAM 和 2D fabric 放在同一片硅上，降低细粒度模型通信的延迟和能耗",
          "让所有权重必须永久存放在片上 SRAM 中，禁止外部权重存储",
          "通过透明缓存自动解决所有数据布局问题，编译器不需要参与映射",
          "把训练任务改成只在单个 CPU 核心上串行执行"
        ],
        "answer": 0,
        "explain": "WSE 的核心优势是晶圆级片内通信和分布式本地存储；MemoryX 仍可外部保存并流式提供权重，编译器也必须规划布局与路由。"
      }
    },
    {
      "id": "graphcore_ipu",
      "num": 18,
      "name": "Graphcore IPU",
      "fullName": "Graphcore智能处理单元 (Graphcore Intelligence Processing Unit)",
      "year": "2019",
      "org": "Graphcore",
      "parent": "—",
      "paperUrl": "—",
      "projectUrl": "",
      "category": "emerging_chips",
      "motivation": "MIMD架构片上300MB SRAM适合稀疏图计算",
      "summary": "Graphcore IPU 提出面向机器智能的 many-tile MIMD 加速器，把计算核心、程序和本地 SRAM 绑定成大量独立 tile，并用显式 exchange fabric 连接，从而解决 GPU/SIMT 在不规则图计算、稀疏访问和细粒度模型并行上控制与数据移动不够灵活的问题。",
      "keyPoints": [
        "2019 年公开 microbenchmark 论文主要分析 MK1 IPU：1,216 个 tile，每个 tile 有独立处理器、本地 SRAM 和独立指令流",
        "MK1 约 300 MB 级片上 SRAM 可由 <span class=\"kb-math kb-math-inline\">1216 \\times 256\\text{KiB}</span> 估算得到，符合条目 motivation 中的“片上300MB SRAM”",
        "后续 Colossus MK2 GC200 扩展到 1,472 个 tile、每 tile 624 KB SRAM，总 In-Processor-Memory 接近 900 MB",
        "IPU 是分布式本地内存架构：tile 只能直接 load/store 自己的 SRAM，跨 tile 数据移动通过 IPU Exchange 显式完成",
        "执行模型采用 Bulk Synchronous Parallel (BSP)：本地计算、全局同步、数据交换三阶段重复推进",
        "Poplar 编译器把计算图拆成 vertex/compute set，负责把变量、代码和通信边映射到 tile 和 exchange fabric",
        "与 GPU 的 SIMD/SIMT 不同，IPU 的 MIMD tile 可以执行不同控制流，更适合稀疏图、动态图、短向量和非规则访问模式"
      ],
      "detail": "<h5>核心示意图</h5>\n<p><img alt=\"Graphcore IPU internal architecture\" src=\"https://docs.graphcore.ai/projects/ipu-programmers-guide/en/latest/_images/ipu.png\" />\n<em>图：Graphcore 官方 IPU Programmer's Guide 的 IPU internal architecture。图中 tile 阵列、exchange fabric 和外部 Streaming Memory 共同构成 IPU 的执行与存储层次。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># Graphcore IPU/Poplar: BSP 风格的计算图执行\ngraph = poplar.Graph(target=&quot;IPU&quot;)\ntiles = graph.tiles()\n\nfor op in model_graph.topological_order():\n    place_variables(op.inputs, op.outputs, tiles)\n    compute_set = create_vertices(op, mapped_tiles=tiles)\n    exchange_plan = plan_cross_tile_copies(op, fabric=&quot;IPU-Exchange&quot;)\n    program.append((compute_set, exchange_plan))\n\nfor step in training_or_inference_steps:\n    for compute_set, exchange_plan in program:\n        parallel_for tile in tiles:\n            tile.run_local_vertices(compute_set[tile])  # 只访问本 tile SRAM\n\n        global_sync_all_tiles()\n        ipu_exchange.copy(exchange_plan)                # 显式跨 tile 搬运\n</code></pre>\n<h5>方法机制解读</h5>\n<p>Graphcore IPU 的设计出发点是：机器学习计算不只有大而密的 GEMM，也包含稀疏 embedding、图神经网络消息传递、动态控制流、短向量操作和大量小张量搬运。传统 GPU 为吞吐优化，强依赖 SIMT warp、层级缓存和大块连续数据；当任务变成许多互不相同的小计算和不规则通信时，线程发散、缓存失配和同步开销会明显上升。IPU 因此把芯片拆成大量独立 tile，每个 tile 有自己的程序、寄存器和 SRAM，形成硬件层面的 MIMD。</p>\n<p>从存储模型看，IPU 的“片上 SRAM 很大”不是一个共享大缓存，而是很多独立本地内存。MK1 代的典型容量可近似为：</p>\n<div class=\"kb-math kb-math-display\">C_{\\text{MK1}} = 1216 \\times 256\\text{KiB} \\approx 304\\text{MiB}</div>\n<p>这解释了条目中的 300 MB SRAM；而 GC200 代则为：</p>\n<div class=\"kb-math kb-math-display\">C_{\\text{GC200}} = 1472 \\times 624\\text{KiB} \\approx 897\\text{MiB}</div>\n<p>这种设计让模型权重、激活、代码和临时状态尽量留在计算发生的 tile 上，换取低延迟和高带宽。但它也要求编译器精确决定变量放在哪个 tile，以及什么时候跨 tile 搬运。</p>\n<p>IPU 的执行模型通常被描述为 BSP。每个 superstep 包含本地计算、同步和交换：</p>\n<div class=\"kb-math kb-math-display\">T_{\\text{program}}=\\sum_{s=1}^{S}\\left(\\max_i C_{s,i}+E_s+B_s\\right)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">C_{s,i}</span> 是第 <span class=\"kb-math kb-math-inline\">s</span> 个阶段中 tile <span class=\"kb-math kb-math-inline\">i</span> 的本地计算时间，<span class=\"kb-math kb-math-inline\">E_s</span> 是 exchange fabric 的数据移动时间，<span class=\"kb-math kb-math-inline\">B_s</span> 是同步屏障成本。这个公式说明 IPU 程序性能不是只看算术峰值，而取决于 tile 负载是否均衡、跨 tile 通信是否紧凑，以及 Poplar 是否能把数据布局规划到减少 <span class=\"kb-math kb-math-inline\">E_s</span> 和长尾 <span class=\"kb-math kb-math-inline\">C_{s,i}</span>。</p>\n<p>对图神经网络或稀疏图算法，IPU 的直觉优势很清晰。设图消息传递为：</p>\n<div class=\"kb-math kb-math-display\">h_v^{(t+1)}=\\phi\\left(h_v^{(t)},\\sum_{u\\in\\mathcal{N}(v)}\\psi(h_u^{(t)}, e_{u,v})\\right)</div>\n<p>GPU 往往把许多边或节点塞进同一个 kernel 中，由 warp 处理不等长邻接表；邻居数量不均会造成分支发散和访存不连续。IPU 可以把不同节点/边分区到不同 tile，tile 在本地 SRAM 中维护节点状态，并在 exchange 阶段发送消息。只要图分区让高频邻接通信局部化，MIMD tile 就能以更自然的方式执行不规则工作。</p>\n<p>Poplar 是这套硬件的关键一半。开发者看到的是计算图、vertex 和 tensor，编译器负责把它们变成 tile 上的代码、变量布局和 exchange 序列。与 GPU kernel 中大量运行时调度不同，IPU 尽量让通信在编译阶段显式化：每次变量从 tile A 到 tile B，都会变成 exchange 阶段的计划数据移动。这让性能更可预测，也让 profiling 能直接暴露哪个 superstep 的本地计算或跨 tile 拷贝成为瓶颈。</p>\n<p>IPU 的代价同样来自这个设计。分布式 SRAM 容量很大但不可像统一内存那样随意寻址；跨 tile 数据必须通过同步和 exchange，过度细碎或错误分区会让通信吞掉收益。它适合的是能被拆成许多 tile-local 子任务、通信边可被编译器规划的工作负载，而不是所有 GPU 友好的大批量密集 GEMM 都会自动更快。</p>\n<div class=\"key-point\">💡 关键：Graphcore IPU 的创新不只是“片上内存大”，而是把大内存拆到独立 MIMD tile 旁边，再用 BSP 和 Poplar 把计算图显式映射成本地计算与可预测交换。</div>",
      "quiz": {
        "q": "Graphcore IPU 为什么更适合某些稀疏图或不规则机器学习任务？",
        "options": [
          "大量 MIMD tile 可执行不同控制流，本地 SRAM 保存局部状态，跨 tile 通信由 exchange fabric 显式规划",
          "所有 tile 共享一个透明 L3 缓存，因此无需考虑数据布局",
          "它只支持一个全局 SIMD 指令流，所有核心必须执行完全相同的分支",
          "它完全取消同步阶段，使任意跨 tile 访问都像本地 SRAM 一样便宜"
        ],
        "answer": 0,
        "explain": "IPU 的 tile 拥有独立程序和本地内存，适合不规则子任务；但跨 tile 访问仍需要通过 BSP 的同步和 exchange 阶段显式完成。"
      }
    },
    {
      "id": "groq_tsp",
      "num": 19,
      "name": "Groq TSP",
      "fullName": "Groq张量流处理器 (Groq Tensor Streaming Processor)",
      "year": "2020",
      "org": "Groq",
      "parent": "—",
      "paperUrl": "https://ieeexplore.ieee.org/abstract/document/9138986/",
      "projectUrl": "",
      "category": "emerging_chips",
      "motivation": "确定性调度取消缓存实现极低延迟推理",
      "summary": "Groq TSP 提出了软件定义、确定性执行的张量流处理器，用 functionally-sliced 微架构、编译期静态调度和 producer-consumer stream 替代缓存、乱序和动态仲裁，解决 batch-1 推理中平均延迟和尾延迟不可预测的问题。",
      "keyPoints": [
        "ISCA 2020 论文《Think Fast: A Tensor Streaming Processor (TSP) for Accelerating Deep Learning Workloads》介绍首代 Groq TSP",
        "微架构按功能切片而非传统 many-core tile 复制：MEM、VXM、MXM、SXM、ICU、C2C 等 slice 沿数据流方向组织",
        "编译器提前分配资源、路由和每条指令的时间，使操作数与指令在确定时刻相遇",
        "硬件尽量移除 reactive element，例如缓存、动态仲裁和不可预测调度，换取可计算的延迟",
        "producer-consumer stream programming model 让张量以 stream register/lanes 的形式穿过功能切片，被需要的 slice 拦截处理",
        "首代公开实现为 25×29 mm、14nm、约 900 MHz 的 ASIC，官方介绍强调超过 1 TOPS/mm² 的计算密度",
        "适合低批量、低尾延迟推理；代价是编译器必须拥有足够强的静态分析、排程和 kernel 映射能力"
      ],
      "detail": "<h5>核心示意图</h5>\n<p><img alt=\"Groq TSP functional slice architecture\" src=\"https://patentimages.storage.googleapis.com/f1/a0/cb/d090535dbbd678/US11360934-20220614-D00000.png\" />\n<em>图：Google Patents 中 Groq 相关 Tensor Streaming Processor architecture 专利的功能切片示意图，展示传统 tiled processor 与 functional slice processor 的区别；论文机制依据 ISCA 2020 paper 和 Groq 官方页面整理。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># Groq TSP: 编译期生成确定性时间表，运行时按周期播放指令与张量流\nschedule = groq_compiler.compile(model_graph)\n# schedule 记录：每个 tensor 在哪个 MEM slice、哪个 stream id、哪个 cycle 到达哪个 functional slice\n\nfor cycle in range(schedule.total_cycles):\n    for instruction in schedule.instructions_at(cycle):\n        ICU.dispatch(instruction.slice_id, instruction.opcode, instruction.stream_id)\n\n    for mem_event in schedule.memory_events_at(cycle):\n        MEM[mem_event.slice].emit_stream(\n            stream_id=mem_event.stream_id,\n            direction=mem_event.direction,\n            vector=mem_event.vector,\n        )\n\n    for stream in active_streams():\n        next_slice = stream.advance_one_hop()\n        if schedule.slice_intercepts(next_slice, stream, cycle):\n            stream.vector = next_slice.execute(stream.vector)\n</code></pre>\n<h5>方法机制解读</h5>\n<p>Groq TSP 的目标不是做一个更复杂的 GPU，而是把神经网络推理变成可静态排程的数据流程序。传统 CPU/GPU 为通用性引入缓存、乱序执行、动态调度、仲裁器和运行时网络竞争，这些机制能提升平均吞吐，但会让某次请求到底走多少周期变得不完全可预测。低延迟推理，尤其是 batch-1 推理，关心的是一条请求的确定完成时间和尾延迟；TSP 因此把复杂度从硬件运行时转移到编译器。</p>\n<p>functionally-sliced 是它最容易混淆也最重要的结构。传统 many-core 芯片把一个完整的小处理器复制成很多 tile，每个 tile 都带算术、访存和控制能力；TSP 则把相同功能的单元排成 slice，例如 MEM 负责 SRAM/stream，VXM 负责向量运算，MXM 负责矩阵乘，ICU 负责指令控制。张量数据沿东西方向流动，指令沿另一个方向进入 slice，编译器保证二者在第 <span class=\"kb-math kb-math-inline\">t</span> 个周期相遇。</p>\n<p>对一个矩阵乘：</p>\n<div class=\"kb-math kb-math-display\">Y_{m,n}=\\sum_k X_{m,k}W_{k,n}</div>\n<p>Groq 不依赖运行时 cache miss 或 warp scheduler 去“碰运气”喂饱矩阵单元，而是在编译阶段决定 <span class=\"kb-math kb-math-inline\">X</span>、<span class=\"kb-math kb-math-inline\">W</span>、部分和分别从哪些 MEM slice 进入，以什么 stream id 穿过 VXM/MXM，以及每个周期应执行哪条指令。运行时看到的是已经排好的时间表：</p>\n<div class=\"kb-math kb-math-display\">T_{\\text{latency}}=\\frac{N_{\\text{scheduled cycles}}}{f_{\\text{clock}}}</div>\n<p>只要输入形状和程序不变，<span class=\"kb-math kb-math-inline\">N_{\\text{scheduled cycles}}</span> 就稳定，尾延迟也更容易被上层服务预算。</p>\n<p>专利和论文都强调 stream register/lanes。可以把 TSP 的向量宽度抽象为：</p>\n<div class=\"kb-math kb-math-display\">VL=N_{\\text{superlanes}}\\times M_{\\text{lanes per superlane}}</div>\n<p>每条 stream 携带一组向量元素和方向，在功能切片之间向东或向西流动。某个 slice 可以让 stream 直通，也可以按指令拦截它执行 add、multiply、matrix accumulate、shift/rotate 或 memory read/write。由于 stream 的身份和到达时间由编译器维护，数据本身不需要携带大量元数据来说明“我该被谁处理”，这减少了硬件控制路径。</p>\n<p>“取消缓存”不代表没有存储，而是取消不可预测的透明缓存层级。TSP 有高带宽片上 SRAM/MEM slice，但程序显式安排何时读、何时写、何时把数据作为 stream 送到计算 slice。这样做牺牲了一些动态适应能力：如果模型有很强的数据依赖、动态 shape 或分支，编译器要么生成多套 schedule，要么引入保守路径。但对于形状固定、延迟敏感的推理图，静态调度能避免 runtime jitter。</p>\n<p>与 GPU 对比，TSP 的优势来自确定性而不只是峰值 TOPS。GPU 在大 batch dense GEMM 上极强，但 batch-1 服务常受 kernel launch、缓存状态、调度竞争和内存访问抖动影响。TSP 把网络层编译成一条跨功能切片的数据流流水线，硬件按周期执行，适合追求固定响应时间的在线推理。它的风险也相应明确：性能上限高度依赖编译器能否把模型算子、量化格式、内存布局和多芯片 C2C 通信一起排好。</p>\n<div class=\"key-point\">💡 关键：Groq TSP 的“快”来自软件提前知道数据和指令何时何地相遇；硬件越少做动态猜测，延迟就越可预测。</div>",
      "quiz": {
        "q": "Groq TSP 取消传统缓存和动态仲裁的主要目的是什么？",
        "options": [
          "让编译器静态安排数据流和指令时刻，从而得到可预测的低延迟推理",
          "让所有模型都必须在 CPU 上完成矩阵乘",
          "提高缓存命中率并依赖运行时替换策略隐藏延迟",
          "把张量流改成不可控制的随机路由"
        ],
        "answer": 0,
        "explain": "TSP 通过软件定义 schedule，使数据和指令在确定周期相遇；移除缓存/仲裁器是为了减少运行时不可预测性和尾延迟。"
      }
    },
    {
      "id": "sambanova_rdu",
      "num": 20,
      "name": "SambaNova RDU",
      "fullName": "SambaNova可重构数据流单元 (SambaNova Reconfigurable Dataflow Unit)",
      "year": "2022",
      "org": "SambaNova",
      "parent": "—",
      "paperUrl": "—",
      "projectUrl": "",
      "category": "emerging_chips",
      "motivation": "三级存储架构应对万亿参数模型存储墙",
      "summary": "SambaNova RDU 提出了可重构数据流处理器，把模型图空间映射到 PCU、PMU、RDN 和 AGCU 组成的片上数据流 fabric 上，并用 SRAM/HBM/DDR 三级存储缓解大模型和多专家系统的存储墙。它的关键不是把 GPU kernel 写得更强，而是让算子、缓冲、地址生成和跨芯片通信在硬件中形成可编译的流水线。",
      "keyPoints": [
        "采用 Reconfigurable Dataflow Architecture，编译器将模型数据流图映射为片上 compute、memory 和 communication 网络",
        "RDU Tile 由 Pattern Compute Unit、Pattern Memory Unit、Reconfigurable Dataflow Network、Address Generation and Coalescing Unit 组成",
        "PCU 支持 systolic GEMM、SIMD 流式算子、归约、随机数、格式转换和尾部 element-wise 操作",
        "PMU 是软件管理的分布式 SRAM scratchpad，支持并发读写、复杂地址生成、predicate、bank 映射和数据重排",
        "RDN 提供 vector、scalar、control 三类片上网络，支持 multicast、many-to-one、sequence ID 重排和 credit-based flow control",
        "SN40L 公开论文描述的三级存储为 520 MiB 片上 PMU SRAM、64 GiB HBM、最高 1.5 TiB DDR DRAM",
        "HBM 作为高带宽权重/中间状态缓存，DDR 作为大容量模型仓库，使 Composition of Experts 等万亿参数系统可以在单节点快速切换专家",
        "SambaFlow 从 PyTorch/TensorFlow 图中抽取数据流图，做 fusion、placement、routing、memory allocation 和硬件/软件 kernel 调度"
      ],
      "detail": "<h5>核心示意图</h5>\n<p><img alt=\"SN40L RDU Tile 结构图\" src=\"https://arxiv.org/html/2405.07518v1/x7.png\" />\n<em>图：SambaNova SN40L 论文 Figure 6 的公开 arxiv HTML 图片，展示 RDU Tile 中 PMU、PCU、AGCU 与 RDN switch 的网格组织。</em></p>\n<p><img alt=\"Samba-CoE 在 SN40L 上的三级存储流程\" src=\"https://arxiv.org/html/2405.07518v1/x10.png\" />\n<em>图：SambaNova SN40L 论文 Figure 9，router 权重常驻 HBM，expert 权重常驻 DDR，并按需从 DDR 拷入 HBM 的 expert region。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># SambaNova RDU: 从模型图到可执行数据流流水线的简化流程\ngraph = sambaflow.import_graph(framework_model)\ndataflow = sambaflow.fuse_ops(graph, allow_arbitrary_access_patterns=True)\n\nfor tensor in dataflow.tensors:\n    if tensor.is_hot_stage_buffer():\n        tensor.place(memory=&quot;PMU_SRAM&quot;)\n    elif tensor.has_temporal_reuse():\n        tensor.place(memory=&quot;HBM&quot;)\n    else:\n        tensor.place(memory=&quot;DDR&quot;)\n\nfor op in dataflow.ops:\n    if op.kind in {&quot;gemm&quot;, &quot;conv&quot;}:\n        op.map_to(units=&quot;PCU&quot;, mode=&quot;systolic&quot;)\n    elif op.kind in {&quot;elementwise&quot;, &quot;reduction&quot;, &quot;format_convert&quot;}:\n        op.map_to(units=&quot;PCU&quot;, mode=&quot;SIMD_or_tail&quot;)\n    op.attach_stage_buffers(units=&quot;PMU&quot;)\n\nroutes = place_and_route(dataflow, fabric=&quot;RDN&quot;,\n                         patterns=[&quot;one_to_many&quot;, &quot;many_to_one&quot;, &quot;transpose&quot;, &quot;pipeline&quot;])\n\nfor request in inference_stream:\n    expert = router(request)\n    if expert.weights.location == &quot;DDR&quot;:\n        agcu_dma(src=&quot;DDR&quot;, dst=&quot;HBM&quot;, tensor=expert.weights)\n    launch_dataflow_kernel(routes, inputs=request, weights=expert.weights)\n</code></pre>\n<h5>方法机制解读</h5>\n<p>SambaNova RDU 的出发点是把深度学习图看成长期存在的数据流，而不是一串独立 kernel。传统 CPU/GPU 的执行模型通常是 kernel-by-kernel：每个算子从 HBM/DRAM 读输入，计算后把中间结果写回，再由下一个 kernel 重新读出。对小 batch、专家模型、FFT/transpose/element-wise 混合图等低 operational intensity 场景，这种模式会把大量时间和能耗花在中间张量 materialization 上。RDU 则把多个算子映射成空间流水线，让 tile 级输入沿着 PCU、PMU 和 RDN 流动。</p>\n<p>可以用 operational intensity 描述这个差异：</p>\n<div class=\"kb-math kb-math-display\">I=\\frac{\\text{useful operations}}{\\text{bytes moved from off-chip memory}}</div>\n<p>如果融合不足，中间张量频繁写回 HBM，分母会迅速变大，算子即使有足够 FLOPS 也会被带宽限制。SambaNova 的 streaming dataflow 将 stage buffer 放入 PMU，把 transpose、fan-out、fan-in、reduction 等访问模式编码成片上路由和地址生成，从而提升 <span class=\"kb-math kb-math-inline\">I</span>。SN40L 论文给出的 Monarch FFT 示例中，完全空间融合的 operational intensity 明显高于无融合和局部融合，这正是 RDU 面向低强度算子的优势来源。</p>\n<p>PCU 是计算核心，但它不是一个固定矩阵乘阵列。SN40L 的 PCU datapath 分为 header、body、tail：body 可配置为 output-stationary systolic array 来跑 GEMM，也可配置成多级 SIMD pipeline 来跑 element-wise、多维 tensor 操作和归约；tail 负责特殊函数、随机数、stochastic rounding 和格式转换。一个算子可跨多个 PCU 做 data parallel、tensor parallel 或 pipeline parallel，多个算子也能串成同一个数据流 kernel。</p>\n<p>PMU 解决的是“数据在哪里、以什么顺序进出”的问题。它不是透明缓存，而是程序员/编译器管理的 SRAM scratchpad，带有地址生成 ALU、predicate、bank 映射和 data alignment 单元。对转置类模式，PMU 可以把写入布局和读取布局分离；对一个逻辑 tensor 跨多个 PMU 的情况，PMU 通过地址范围、predicate 和 bank bits 做 interleaving。这样，复杂访问模式不必退回 HBM 中转，而是可以留在片上作为流水线 stage buffer。</p>\n<p>RDN 是使这些单元组合成图的片上网络。它有 vector、scalar、control 三类 fabric：vector 传输 tensor 数据，scalar 传输地址和元数据，control 传输 loop done 等控制 token。many-to-one 场景中，不同 PCU/PMU 输出可能乱序到达，SN40L 使用 sequence ID 将逻辑顺序编码到 packet 中，再由接收 PMU 计算写地址完成重排。其抽象可以写成：</p>\n<div class=\"kb-math kb-math-display\">\\text{PMU\\_addr} = f(\\text{sequence\\_id},\\ \\text{tile\\_index},\\ \\text{loop\\_counter})</div>\n<p>三级存储是 RDU 应对万亿参数模型的核心。片上 PMU SRAM 存放最热的 stage buffer 和局部中间结果；HBM 提供高带宽，适合当前执行专家或频繁复用权重；DDR 提供大容量，保存大量专家模型或长上下文数据。对 Composition of Experts，单个请求只激活少数专家，因此系统需要的是“快速切换当前专家”，而不是把所有专家都常驻 HBM。可抽象为：</p>\n<div class=\"kb-math kb-math-display\">T_{\\text{CoE}} = T_{\\text{route}} + T_{\\text{DDR}\\rightarrow\\text{HBM}}(\\text{expert}) + T_{\\text{dataflow\\_execute}}</div>\n<p>RDU 的 DDR-to-HBM 路径和软件管理内存分配目标，就是压低第二项；streaming dataflow 的目标则是压低第三项，并减少中间张量对 HBM 的反复读写。</p>\n<p>与 GPU 相比，RDU 的优势来自可编译的空间数据流和更大的本地模型容量；代价是编译、place-and-route、静态调度和硬件资源匹配更复杂。GPU 的 SIMT 模型在大 GEMM 和高度规则的 dense batch 上非常强，但跨 SM 的任意通信和复杂融合通常要通过 shared cache/HBM 或手写 kernel 完成。RDU 把通信本身也变成编译目标：算子不仅被安排到计算单元，边上的 tensor 流、重排、广播和背压也被安排到硬件 fabric。</p>\n<div class=\"key-point\">💡 关键：SambaNova RDU 的“三级存储”不是普通缓存层次，而是配合数据流编译器使用的模型承载策略：SRAM 保流水线、HBM 保热专家、DDR 保大模型集合。</div>",
      "quiz": {
        "q": "SambaNova RDU 用三级存储架构解决大模型存储墙时，各层最核心的分工是什么？",
        "options": [
          "PMU SRAM 保存片上 stage buffer，HBM 保存高带宽热数据，DDR 保存大容量模型/专家集合",
          "所有权重都必须常驻 PCU 寄存器，DDR 只用于操作系统日志",
          "HBM 只负责控制流，PMU SRAM 只负责网络通信，DDR 只负责矩阵乘",
          "三级存储完全由硬件透明缓存替换，编译器不参与数据放置"
        ],
        "answer": 0,
        "explain": "RDU 的内存层次是软件管理和编译器感知的：PMU SRAM 服务片上流水，HBM 提供当前工作集带宽，DDR 提供大模型容量。"
      }
    },
    {
      "id": "prime",
      "num": 21,
      "name": "PRIME",
      "fullName": "ReRAM存内计算架构 (Processing-in-ReRAM Architecture)",
      "year": "2016",
      "org": "UCSB",
      "parent": "—",
      "paperUrl": "https://dl.acm.org/doi/abs/10.1145/3007787.3001140",
      "projectUrl": "",
      "category": "pim_cim",
      "motivation": "ReRAM交叉阵列实现模拟矩阵乘法",
      "summary": "PRIME 提出了在 ReRAM 主存内部直接执行神经网络矩阵向量乘的 PIM 架构，把一部分 ReRAM subarray 设计成可在“普通存储”和“NN 计算”之间切换的 Full Function subarray。它通过复用存储外围电路作为 DAC/ADC、正负权重双阵列和输入/权重组合方案，在较低面积开销下减少 CPU 与主存之间的大规模权重搬运。",
      "keyPoints": [
        "将 ReRAM bank 划分为 Mem subarray、Buffer subarray 和 Full Function subarray 三类区域",
        "FF subarray 可在 memory mode 和 computation mode 间 morph，既能存储数据，也能执行 NN dot product",
        "用 ReRAM crossbar 的欧姆定律与基尔霍夫电流汇聚实现模拟矩阵向量乘",
        "修改 wordline driver、column multiplexer、sense amplifier 和 buffer connection，尽量复用原有存储外围电路",
        "正权重和负权重分别存入两组 crossbar，column multiplexer 中的模拟减法器合成有符号结果",
        "采用可重构 SA、ReLU 单元、sigmoid 单元和 4:1 max-pooling 单元支持 MLP/CNN 基本层",
        "通过两个 3-bit 输入组合 6-bit 输入、两个 4-bit ReRAM cell 组合 8-bit 权重，缓解 ReRAM 精度不足",
        "提供 Map_Topology、Program_Weight、Config_Datapath、Run、Post_Proc 等软件/硬件接口，并在编译期优化 NN 映射"
      ],
      "detail": "<h5>核心示意图</h5>\n<p><img alt=\"PRIME 架构总览\" src=\"https://mdpi-res.com/make/make-04-00004/article_deploy/html/images/make-04-00004-g019-550.jpg\" />\n<em>图：MDPI 综述中转载并标注的 PRIME 架构总览，来源说明为 adapted from PRIME ISCA 2016 论文；图中展示 Mem/FF/Buffer subarray、ReRAM crossbar、WDD、column mux、SA、connection 和 controller。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># PRIME: 将一个神经网络层映射到 ReRAM FF subarray 并执行\ndef run_prime_layer(layer, input_addr, output_addr):\n    mats = compiler.map_topology(layer.weights, target=&quot;FF_subarrays&quot;)\n    controller.issue(&quot;prog/comp/mem&quot;, mats, mode=&quot;program&quot;)\n    controller.program_weight(mats.positive, positive(layer.weights))\n    controller.program_weight(mats.negative, negative(layer.weights))\n\n    controller.issue(&quot;prog/comp/mem&quot;, mats, mode=&quot;compute&quot;)\n    controller.issue(&quot;input_source&quot;, mats, source=&quot;buffer&quot;)\n\n    for tile in stream_input_tiles(input_addr):\n        controller.issue(&quot;fetch&quot;, mem_addr=tile, buf_addr=&quot;buffer&quot;)\n        controller.issue(&quot;load&quot;, buf_addr=&quot;buffer&quot;, ff_addr=mats.inputs)\n\n        i_pos = reram_crossbar_mvm(voltage=tile, conductance=mats.positive)\n        i_neg = reram_crossbar_mvm(voltage=tile, conductance=mats.negative)\n        analog = sigmoid_or_bypass(i_pos - i_neg)\n        digital = sense_amplifier_convert(analog, precision_bits=layer.output_bits)\n\n        controller.issue(&quot;store&quot;, ff_addr=digital, buf_addr=&quot;buffer&quot;)\n        controller.issue(&quot;commit&quot;, buf_addr=&quot;buffer&quot;, mem_addr=output_addr)\n\n    controller.issue(&quot;prog/comp/mem&quot;, mats, mode=&quot;memory&quot;)\n</code></pre>\n<h5>方法机制解读</h5>\n<p>PRIME 要解决的是神经网络加速中的双重数据搬运问题：传统协处理器需要从主存读取输入和大量 synaptic weights，再把输出写回主存；即使专用 NPU 有本地 SRAM/eDRAM，主存到处理器的数据移动仍然很昂贵。PRIME 反过来让“主存阵列本身”承担计算。ReRAM crossbar 原本就是二维电阻阵列，给 wordline 施加输入电压后，每个 cell 的电导表示权重，bitline 端汇聚出的电流自然等于一列权重与输入向量的点积。</p>\n<p>其基本模拟计算可写成：</p>\n<div class=\"kb-math kb-math-display\">I_j = \\sum_i V_i G_{i,j}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">V_i</span> 是第 <span class=\"kb-math kb-math-inline\">i</span> 条 wordline 的输入电压，<span class=\"kb-math kb-math-inline\">G_{i,j}</span> 是 ReRAM cell 的电导，<span class=\"kb-math kb-math-inline\">I_j</span> 是第 <span class=\"kb-math kb-math-inline\">j</span> 条 bitline 的输出电流。若把输入 <span class=\"kb-math kb-math-inline\">a_i</span> 映射到电压、权重 <span class=\"kb-math kb-math-inline\">w_{i,j}</span> 映射到电导，ReRAM crossbar 就在一次阵列读操作中完成多个神经元的 matrix-vector multiplication。后续 sigmoid、ReLU、pooling 或 ADC 转换由外围电路完成。</p>\n<p>PRIME 的 bank 组织有三类 subarray。Mem subarray 与普通 ReRAM 主存类似，只负责存储；FF subarray 是可变形区域，memory mode 下像普通内存，computation mode 下执行 NN 计算；Buffer subarray 靠近 FF subarray，用来缓存输入/输出并通过私有端口与 FF 通信。切换到 computation mode 前，系统先把 FF 中原有数据迁移到 Mem 区，再把训练好的权重写入 FF；计算结束后，controller 重新配置外围电路让 FF 回到 memory mode。</p>\n<p>外围电路复用是 PRIME 降低面积开销的关键。传统模拟神经网络阵列需要 DAC 将数字输入转为电压、ADC 将 bitline 电流转为数字输出。PRIME 观察到 ReRAM 主存本来就有 wordline driver 和 sense amplifier，因此对它们做增强：wordline driver 提供多级电压源，column multiplexer 增加模拟减法与 sigmoid 路径，SA 变为可重构多精度转换器并加入 ReLU/max-pool 支持。这样 FF subarray 的计算能力来自局部电路修改，而不是在内存旁边放完整处理器。</p>\n<p>有符号权重通过正负阵列实现。由于单个 ReRAM conductance 只能提供非负电流，PRIME 将权重拆为：</p>\n<div class=\"kb-math kb-math-display\">W = W^+ - W^-, \\quad\nW^+_{i,j}=\\max(W_{i,j},0), \\quad\nW^-_{i,j}=\\max(-W_{i,j},0)</div>\n<p>两组 crossbar 分别产生 <span class=\"kb-math kb-math-inline\">I^+_j</span> 和 <span class=\"kb-math kb-math-inline\">I^-_j</span>，column multiplexer 中的 subtraction unit 输出 <span class=\"kb-math kb-math-inline\">I^+_j-I^-_j</span>。这使 PRIME 支持正负 synaptic weights，但代价是存储和部分外围电路需要成对配置。</p>\n<p>精度是 ReRAM 模拟计算最脆弱的部分。论文假设实用工艺下输入电压可提供 3-bit、ReRAM cell 可提供 4-bit 权重、输出目标约 6-bit。为得到更高等效精度，PRIME 把一个输入拆成 high/low 两个 3-bit 部分，把一个权重拆成 high/low 两个 4-bit cell。完整乘积被分成 HH、HL、LH、LL 四项：</p>\n<div class=\"kb-math kb-math-display\">R_{\\text{full}} =\n2^{(P_w+P_{in})/2} R_{HH}\n+2^{P_w/2} R_{HL}\n+2^{P_{in}/2} R_{LH}\n+R_{LL}</div>\n<p>随后通过可重构 SA 选择高位、在 precision control circuit 中移位累加。这个方案的直觉是：不要要求单个 ReRAM cell 或单次 ADC 转换覆盖全部动态范围，而是用多次低精度模拟 dot product 加数字移位累加逼近高精度结果。</p>\n<p>PRIME 的软件接口把这种硬件暴露为神经网络映射流程。小网络可复制到同一个 mat 的不同区域提高利用率；中等网络被 split-merge 到多个 mat；大网络跨 bank 映射，通过 bank-level parallelism 和 inter-bank communication 形成流水。它与后续 ISAAC 的区别在于：PRIME 保留“主存可变形”的目标，即没有 NN 任务时 FF subarray 可以释放为主存容量；ISAAC 则更像专用 CNN 推理加速器，crossbar 通常被静态分配给各层形成流水。</p>\n<div class=\"key-point\">💡 关键：PRIME 的创新不是单纯使用 ReRAM 做点积，而是把 ReRAM 主存的一部分变成可切换计算资源，并让外围电路、buffer、controller、编译器一起支撑 NN 层执行。</div>",
      "quiz": {
        "q": "PRIME 中 Full Function subarray 的核心作用是什么？",
        "options": [
          "在普通存储和神经网络计算之间切换，利用 ReRAM crossbar 执行矩阵向量乘",
          "只作为 CPU cache，不能参与计算",
          "只保存操作系统页表，避免所有模拟电路",
          "替代所有 Mem subarray，使整块主存永久处于计算模式"
        ],
        "answer": 0,
        "explain": "FF subarray 是 PRIME 的 morphable 区域；它在 memory mode 下存储数据，在 computation mode 下通过 ReRAM crossbar 和修改后的外围电路执行 NN 计算。"
      }
    },
    {
      "id": "isaac",
      "num": 22,
      "name": "ISAAC",
      "fullName": "原位模拟计算加速器 (In-Situ Analog Arithmetic in Crossbars)",
      "year": "2016",
      "org": "Utah/HP Labs",
      "parent": "prime",
      "paperUrl": "https://dl.acm.org/doi/abs/10.1145/3007787.3001139",
      "projectUrl": "",
      "category": "pim_cim",
      "motivation": "完整流水线架构平衡模拟计算与数字控制",
      "summary": "ISAAC 提出了面向 CNN/DNN 推理的完整 ReRAM crossbar 加速器，将每层权重静态驻留在专属 crossbar 中，用 tile/IMA/eDRAM 组成跨层流水线，解决模拟存内点积难以扩展成整芯片系统的问题。它的核心贡献是把 in-situ analog dot product、ADC/DAC 位布局、有符号算术、层间缓冲和片上调度整合成可评估的完整架构。",
      "keyPoints": [
        "采用 chip、tile、IMA、memristor crossbar 的层次结构，并用 c-mesh/总线连接 tile",
        "每个 IMA 包含多个 128×128 crossbar、Sample-and-Hold、ADC、DAC、Input Register、Output Register 和 shift-and-add",
        "crossbar 同时存储 synaptic weights 并执行 analog dot product，减少权重搬运",
        "CNN 层被静态映射到不同 tile/IMA，输出一旦满足卷积窗口需求即可触发下一层，形成跨层 pipeline",
        "用 eDRAM buffer 聚合相邻 pipeline stage 的输入/输出，降低完整层 materialization 的 buffer 需求",
        "采用 bit-serial 输入：16-bit 输入按 1-bit 电压序列输入，降低 DAC 复杂度",
        "采用 w-bit cell 分片、flipped weight encoding、unit column 和 bias 表示，降低 ADC 位宽并正确处理有符号权重",
        "通过设计空间探索平衡 crossbar 存储/计算、ADC 数量、eDRAM buffer 和 tile 面积功耗"
      ],
      "detail": "<h5>核心示意图</h5>\n<p><img alt=\"ISAAC 架构总览\" src=\"https://mdpi-res.com/make/make-04-00004/article_deploy/html/images/make-04-00004-g020-550.jpg\" />\n<em>图：MDPI 综述中转载并标注的 ISAAC 架构总览，来源说明为 adapted from ISAAC ISCA 2016 论文；图中展示 chip、tile、IMA、crossbar、DAC/ADC、S+H、OR/IR 等层次。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># ISAAC: 推理时的跨层流水与 IMA 内 bit-serial 模拟点积\ndef isaac_inference(network, image):\n    schedule = offline_map_layers_to_tiles(network)\n    load_weights_to_crossbars(schedule)        # 运行前编程 ReRAM 权重\n    load_control_vectors(schedule)             # FSM 静态调度路由和缓冲\n\n    tile_buffer[schedule.first_layer].write(image)\n\n    while not final_output_ready():\n        for stage in pipeline_stages(schedule):\n            if stage.input_buffer.has_required_window():\n                x16 = stage.input_buffer.read_window()\n                output_reg = 0\n\n                for bit in range(16):\n                    row_voltage = extract_bit(x16, bit)  # 1-bit DAC 即可\n                    currents = stage.crossbars.read(row_voltage)\n                    sampled = sample_and_hold(currents)\n                    partial = adc_convert(sampled)\n                    output_reg += shift(partial, bit)\n\n                output_reg = fix_signed_and_flipped_columns(output_reg)\n                y = sigmoid_or_relu(output_reg)\n                y = optional_max_pool(y)\n                next_stage_buffer(stage).write(y)\n\n    return io_interface.read_final_output()\n</code></pre>\n<h5>方法机制解读</h5>\n<p>ISAAC 与 PRIME 使用同一类物理基础：给 crossbar 行输入电压，列端汇聚电流完成点积。对一个 <span class=\"kb-math kb-math-inline\">R</span> 行 crossbar，第 <span class=\"kb-math kb-math-inline\">j</span> 列输出为：</p>\n<div class=\"kb-math kb-math-display\">I_j=\\sum_{i=0}^{R-1} V_i G_{i,j}</div>\n<p>这等价于一批神经元共享输入向量、各自使用不同权重列并行完成 matrix-vector multiplication。ISAAC 的问题意识比“能不能算点积”更系统：真正的 CNN 推理还需要层间数据传递、卷积窗口复用、pooling/activation、ADC/DAC、符号数、片上网络和跨层吞吐平衡。</p>\n<p>ISAAC 的 hierarchy 是 chip → tile → IMA → crossbar。tile 内有 eDRAM buffer、多个 IMA、shift-and-add、sigmoid、max-pool 和输出寄存器；IMA 内有 crossbar、input register、output register、S&amp;H、ADC/DAC 与局部 shift-and-add。权重在推理前写入 memristor cell，运行时不频繁重编程。这一点直接决定了 ISAAC 的数据流：一个 crossbar 一旦存了某层某组神经元的权重，就专门服务这层，而不是像 DaDianNao 的 NFU 那样每层轮流换权重。</p>\n<p>跨层 pipeline 是 ISAAC 的第一项核心架构创新。DaDianNao 一次集中处理一层，所有 NFU 为当前层服务，层结束后再切到下一层；ISAAC 则把不同层分配到不同 tile/IMA。对于卷积层，只要上一层产生了足够填满当前卷积窗口的输出，当前层就可以开始计算，不必等待上一层完整 feature map materialize。若输入 feature map 宽度为 <span class=\"kb-math kb-math-inline\">N_y</span>、卷积核宽度为 <span class=\"kb-math kb-math-inline\">K_y</span>，流水化可近似把层间 buffer 需求降低到原来的：</p>\n<div class=\"kb-math kb-math-display\">\\frac{K_y}{N_y}</div>\n<p>这让更多面积留给 crossbar compute，而不是大 eDRAM buffer。</p>\n<p>IMA 内部的流水解决 ADC/DAC 开销。朴素方案会要求 16-bit DAC、极高精度 ReRAM cell 和超过 16-bit 的 ADC，成本和噪声都不可接受。ISAAC 改为 bit-serial input：16-bit 输入 <span class=\"kb-math kb-math-inline\">a_i</span> 被拆为 16 个二进制 bit，在 16 个周期内依次输入，使用近似 1-bit DAC。第 <span class=\"kb-math kb-math-inline\">b</span> 个周期的 crossbar 只计算该 bit 与权重的部分和，再由数字 shift-and-add 累积：</p>\n<div class=\"kb-math kb-math-display\">\\sum_i a_i w_i =\n\\sum_{b=0}^{15} 2^b \\left(\\sum_i a_{i,b}w_i\\right)</div>\n<p>这样把高精度乘法拆成多次低精度模拟读和低成本数字累加，牺牲周期数换取更可实现的 DAC/ADC。</p>\n<p>权重也被分片存储。论文的设计探索中，16-bit fixed-point 权重由多个 <span class=\"kb-math kb-math-inline\">w</span>-bit memristor cell 表示，常用甜点是 <span class=\"kb-math kb-math-inline\">w=2</span>。如果 crossbar 有 <span class=\"kb-math kb-math-inline\">R</span> 行、输入一次提供 <span class=\"kb-math kb-math-inline\">v</span> bit、电导 cell 提供 <span class=\"kb-math kb-math-inline\">w</span> bit，ADC 理论位宽大致为：</p>\n<div class=\"kb-math kb-math-display\">A=\\log_2(R)+v+w</div>\n<p>当 <span class=\"kb-math kb-math-inline\">v=1</span> 或 <span class=\"kb-math kb-math-inline\">w=1</span> 时可少一位。由于 ADC 功耗/面积随位宽上升很快，ISAAC 又引入 flipped weight encoding：如果一列权重总量过大，就存储 <span class=\"kb-math kb-math-inline\">\\bar{W}=2^w-1-W</span>，保证最大输入下输出 MSB 为 0，从而降低 ADC 分辨率需求。转换回原值时使用额外 unit column 计算输入和：</p>\n<div class=\"kb-math kb-math-display\">\\sum_i a_i \\bar{W}_i =\n(2^w-1)\\sum_i a_i - \\sum_i a_i W_i</div>\n<p>符号算术同样需要额外设计。输入采用 two's complement，最高位周期执行 shift-and-subtract；权重则使用带 bias 的无符号表示，因为单个 memristor bitline 只能加电流，很难直接表达负贡献。若 16-bit 权重用偏置 <span class=\"kb-math kb-math-inline\">B=2^{15}</span> 表示，crossbar 先计算带偏置权重的点积，再用 unit column 得到输入中 1 的数量并减去相应 bias。这样 flipped encoding 的校正和 signed bias 的校正都能在数字后处理路径中合并。</p>\n<p>ISAAC 与 PRIME 的关系可以理解为“从可变形主存到专用流水推理机”。PRIME 强调 FF subarray 在内存/计算之间切换，适合把 ReRAM 主存扩展为 PIM；ISAAC 接受 crossbar 难以在线重编程的现实，把权重静态铺到多层 pipeline 中，用更多 crossbar 复制瓶颈层权重来平衡吞吐。其局限也来自这里：对 batch 太小、动态控制流、LRN/复杂归一化或需要频繁训练更新的场景，深流水和静态映射会产生气泡、重编程成本和功能覆盖问题。</p>\n<div class=\"key-point\">💡 关键：ISAAC 的贡献是完整系统化。它不只证明 ReRAM 能做模拟点积，还把 analog compute 与数字控制、缓冲、位串行精度、ADC 优化和跨层 pipeline 组合成可跑 CNN 推理的架构。</div>",
      "quiz": {
        "q": "ISAAC 为什么采用 16-bit 输入的 bit-serial 方式，而不是一次性用 16-bit DAC 输入？",
        "options": [
          "用多个低精度模拟读和数字 shift-and-add 替代高成本高噪声的 16-bit DAC/ADC 路径",
          "因为 ReRAM crossbar 只能执行布尔 AND，不能做点积",
          "为了让所有权重每个周期都重新写入 ReRAM",
          "为了取消所有 eDRAM buffer 和层间流水"
        ],
        "answer": 0,
        "explain": "bit-serial 输入把高精度乘法拆成 16 个低精度周期，显著降低 DAC/ADC 复杂度，并用数字移位累加恢复 16-bit fixed-point 结果。"
      }
    },
    {
      "id": "rram_cim_survey",
      "num": 23,
      "name": "RRAM-CIM Survey",
      "fullName": "RRAM存算一体综述 (RRAM-based CIM Survey)",
      "year": "2021",
      "org": "ASU",
      "parent": "isaac",
      "paperUrl": "—",
      "projectUrl": "",
      "category": "pim_cim",
      "motivation": "系统综述从器件到架构的CIM技术演进",
      "summary": "RRAM-CIM Survey 系统梳理了 RRAM 从非易失存储单元、交叉阵列向量-矩阵乘、外围 ADC/DAC、可靠性校正到推理/训练架构的完整技术链，解释了为什么 RRAM 适合把神经网络中最昂贵的数据搬移转化为阵列内欧姆定律和基尔霍夫电流求和。它的核心贡献不是提出单个宏单元，而是给出从器件非理想到系统架构取舍的设计坐标系。",
      "keyPoints": [
        "以 RRAM 交叉阵列为核心，利用单元电导 <span class=\"kb-math kb-math-inline\">G</span> 表示权重、输入电压 <span class=\"kb-math kb-math-inline\">V</span> 表示激活，直接产生电流和 <span class=\"kb-math kb-math-inline\">I=VG</span>",
        "覆盖推理、片上训练和在线学习三类场景，强调训练比推理更依赖写入耐久、写验证和误差补偿",
        "将 RRAM-CIM 的瓶颈归纳为 ADC/DAC 能耗、阵列 IR drop、器件变异、读噪声、写随机性、保持特性和有限多比特精度",
        "比较全模拟、模拟-数字混合、位串行数字外围和架构级调度等不同实现路线",
        "强调映射策略：权重切片、正负权重差分对、bit-slicing、tile 分块和跨阵列累加共同决定吞吐与精度",
        "指出系统级收益来自减少 DRAM 往返，但外围电路和数据重排可能吞掉阵列内计算的理论能效",
        "将 RRAM-CIM 放在 PIM/CIM 演进链条中，作为 ISAAC、PRIME、PipeLayer、NeuroSim 等架构工作的共同器件基础"
      ],
      "detail": "<h5>核心示意图</h5>\n<p><img alt=\"RRAM CIM 芯片层次示意\" src=\"https://ar5iv.labs.arxiv.org/html/2208.04992/assets/x1.png\" />\n<em>图：公开 ar5iv 镜像中的 NeuRRAM RRAM-CIM 芯片示意图，用作 RRAM-CIM Survey 的机制图补充。2021 综述原文图未提供稳定公开直链，这里采用同领域公开论文图展示 RRAM 交叉阵列、外围电路与系统任务的层次关系。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># RRAM-CIM 中一次量化矩阵乘的典型执行流程\ndef rram_cim_mvm(x_int, w_int, crossbar, adc_bits, slice_bits):\n    # w_int 被预先映射到多个 RRAM 电导阵列；正负权重通常拆到差分阵列。\n    partial_sums = []\n\n    for bit_group in bit_slice(x_int, width=slice_bits):\n        # DAC/字线驱动把数字激活切片转换为电压脉冲。\n        v_rows = dac_encode(bit_group)\n\n        # 阵列内欧姆定律和列电流求和完成模拟 MAC。\n        i_cols_pos = crossbar.G_pos @ v_rows\n        i_cols_neg = crossbar.G_neg @ v_rows\n        i_cols = i_cols_pos - i_cols_neg\n\n        # ADC 把列电流量化；随后数字域执行移位累加。\n        y_slice = adc_quantize(i_cols, bits=adc_bits)\n        partial_sums.append(shift_by_input_bit_position(y_slice, bit_group))\n\n    y = digital_accumulate(partial_sums)\n    return calibrate_with_scale_and_zero_point(y)\n</code></pre>\n<h5>方法机制解读</h5>\n<p>RRAM-CIM 的基本动机是绕开冯诺依曼架构中“权重反复从存储器搬到 MAC 单元”的能耗墙。对 DNN 层 <span class=\"kb-math kb-math-inline\">y = Wx</span> 来说，传统加速器把权重 <span class=\"kb-math kb-math-inline\">W</span> 从 SRAM/DRAM 读出，再在数字 MAC 阵列中乘加；RRAM-CIM 则把 <span class=\"kb-math kb-math-inline\">W</span> 固定为阵列电导 <span class=\"kb-math kb-math-inline\">G</span>，把输入 <span class=\"kb-math kb-math-inline\">x</span> 编码成字线电压 <span class=\"kb-math kb-math-inline\">V</span>，列线电流天然给出向量-矩阵乘：</p>\n<div class=\"kb-math kb-math-display\">I_j=\\sum_i V_iG_{i,j}</div>\n<p>这个公式揭示了 RRAM-CIM 的优势和代价。优势是乘法由器件导通完成、加法由列线电流叠加完成，阵列内部几乎没有显式数据搬移；代价是 <span class=\"kb-math kb-math-inline\">V</span>、<span class=\"kb-math kb-math-inline\">G</span>、<span class=\"kb-math kb-math-inline\">I</span> 都是模拟量，最终仍要通过 DAC/ADC 与数字系统交互。因此综述强调，不能只看交叉阵列的理想 TOPS/W，必须把输入编码、ADC 采样、移位累加、buffer 访问和片上网络一起纳入能效账本。</p>\n<p>权重映射通常需要多层切片。第一层是符号映射：由于 RRAM 电导非负，正负权重常被拆成 <span class=\"kb-math kb-math-inline\">G^+</span> 与 <span class=\"kb-math kb-math-inline\">G^-</span>，输出取电流差。第二层是多比特映射：单个 RRAM 单元可提供有限电导级，或者用多个 1-bit/2-bit cell 组合成高精度权重。第三层是阵列切分：大矩阵必须拆成多个 sub-array，避免长线 IR drop、寄生电容和 ADC 负载过大。数字端再按权重 bit 位和输入 bit 位做移位累加：</p>\n<div class=\"kb-math kb-math-display\">y_j \\approx \\sum_{b_x}\\sum_{b_w}2^{b_x+b_w}\\operatorname{ADC}\\left(\\sum_i V_i^{(b_x)}G_{i,j}^{(b_w)}\\right)</div>\n<p>可靠性是 RRAM-CIM 区别于 SRAM-CIM 的关键。RRAM 的电导不是一次写入后永久精确不变，而会受 cycle-to-cycle variation、device-to-device variation、retention drift、read disturb、温度和写入脉冲随机性影响。推理可以通过离线训练感知噪声、写验证、校准表和冗余映射来容忍误差；训练则更困难，因为反向传播需要频繁更新权重，写耐久和模拟更新线性度会直接影响收敛。因此综述把“从 inference 到 training”视为难度递进，而不是同一阵列简单复用。</p>\n<p>外围 ADC/DAC 决定了许多设计取舍。高分辨率 ADC 能提高输出精度，但能耗和面积随 bit 数快速增加；低分辨率 ADC 则需要更多 bit-serial 周期或算法侧量化补偿。架构设计因此常在并行度和精度之间折中：让阵列一次产生粗粒度部分和，再在数字域校正、重标定和累加。这也解释了为什么后续 RRAM-CIM 芯片常采用混合信号方案，而不是追求完全模拟神经网络。</p>\n<p>从系统角度看，RRAM-CIM 真正适合的是权重驻留、数据复用高、容错性强的边缘推理和部分在线学习任务。大型模型训练仍受写入能耗、耐久、精度和调度复杂度制约；但 RRAM 的非易失性、密度和多级电导让它在 instant-on 设备、稀疏模型、低功耗传感器侧 AI 和异构 PIM 系统中有独特价值。</p>\n<div class=\"key-point\">💡 关键：RRAM-CIM 的“计算”发生在器件物理层，但可用系统必须同时解决模拟误差、数字重构、模型量化和编译映射四个问题。</div>",
      "quiz": {
        "q": "RRAM-CIM 中 ADC/DAC 外围电路为什么经常成为系统瓶颈？",
        "options": [
          "因为 RRAM 阵列不能保存权重",
          "因为阵列内 MAC 很轻量，但模拟电压/电流必须与数字系统转换，转换精度越高能耗和面积越大",
          "因为所有 RRAM 单元只能表示 32-bit 浮点数",
          "因为列电流无法根据欧姆定律求和"
        ],
        "answer": 1,
        "explain": "RRAM 交叉阵列可高效产生模拟部分和，但输入电压生成和输出电流量化需要 DAC/ADC；这些外围电路常决定整体能效、面积和精度。"
      }
    },
    {
      "id": "intel_18a_cim",
      "num": 24,
      "name": "Intel 18A CIM",
      "fullName": "Intel 18A数字存内计算加速器 (Intel 18A Digital CIM Accelerator)",
      "year": "2026",
      "org": "Intel",
      "parent": "rram_cim_survey",
      "paperUrl": "https://ieeexplore.ieee.org/abstract/document/11409207/",
      "projectUrl": "",
      "category": "pim_cim",
      "motivation": "18A工艺147TOPS/W数字CIM加速器",
      "summary": "Intel 18A CIM 提出了一个在 Intel 18A 工艺上实现的全可综合数字存内计算加速器，支持 INT8×INT8 与 zero-point quantization，在 ISSCC 2026 公开指标中达到 147TOPS/W、250TOPS/mm²，并以标准数字设计流程降低 CIM 宏从研究原型走向先进节点集成的门槛。",
      "keyPoints": [
        "采用 fully synthesizable digital CIM 路线，避免模拟 CIM 对定制 bitcell、ADC 和工艺敏感校准的强依赖",
        "支持 INT8×INT8 点积，并显式支持 zero-point quantization，适配常见非对称量化模型",
        "ISSCC 2026 Advance Program/Press Kit 披露其在 Intel 18A 技术上实现 147TOPS/W 与 250TOPS/mm²",
        "公开材料给出的运行点包含 2.62GHz、25°C 条件，强调先进节点下的高频数字可实现性",
        "使用数字位线/近存逻辑完成局部乘加，把 SRAM/寄存器阵列附近的数据复用转化为低搬移能耗",
        "相比 RRAM/模拟 CIM，核心取舍是牺牲部分阵列级模拟密度，换取可验证、可综合、可迁移和量化友好的实现",
        "对 Transformer/CNN 常见 INT8 推理有直接意义，因为 zero-point 修正避免了非对称量化在硬件中退化为额外大规模乘法"
      ],
      "detail": "<h5>核心示意图</h5>\n<p><img alt=\"Intel 18A 芯片公开图\" src=\"https://newsroom.intel.com/wp-content/uploads/2026/05/18A-Full-Chip-22-Angle-Flat-1920x1080-1.jpg\" />\n<em>图：Intel Newsroom 公开的 18A 芯片静态图。IEEE 论文页面未提供可公开嵌入的架构图直链，因此这里使用 Intel 官方 18A 相关芯片图作为工艺背景；下文的 CIM 数据流根据 ISSCC 2026 题名、摘要条目和公开指标整理。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># INT8×INT8 zero-point digital CIM 点积的核心逻辑\ndef digital_cim_int8_dot(a_u8, w_u8, zp_a, zp_w, scale_a, scale_w, scale_y):\n    # a_u8 与 w_u8 是量化后的激活和权重，zp_* 是非对称量化零点。\n    # 数字 CIM 宏通常在存储阵列附近并行产生局部乘积/部分和。\n    raw_sum = 0\n    sum_a = 0\n    sum_w = 0\n\n    for tile in tiles(a_u8, w_u8):\n        pp = cim_local_multiply_accumulate(tile.a, tile.w)\n        raw_sum += pp                    # Σ a_q * w_q\n        sum_a += local_sum(tile.a)        # Σ a_q\n        sum_w += local_sum(tile.w)        # Σ w_q\n\n    n = len(a_u8)\n    corrected = raw_sum - zp_w * sum_a - zp_a * sum_w + n * zp_a * zp_w\n    y_float = corrected * scale_a * scale_w\n    return requantize(y_float, scale_y)\n</code></pre>\n<h5>方法机制解读</h5>\n<p>这个工作的关键词是“digital CIM”和“fully synthesizable”。传统 SRAM-CIM 往往修改 6T/8T bitcell 或使用模拟位线电荷共享，能效很高但对工艺、电压、版图和 sense margin 很敏感；Intel 18A CIM 则更接近标准数字宏：在存储阵列附近布置可综合乘加逻辑，让 EDA flow、时序收敛、DFT、形式验证和先进节点迁移尽量沿用数字 SoC 方法。对工业团队来说，这个工程属性和 TOPS/W 一样重要。</p>\n<p>INT8 非对称量化是该论文题名中最值得关注的算法接口。常见量化把实数表示为：</p>\n<div class=\"kb-math kb-math-display\">x \\approx s_x(q_x-z_x), \\quad w \\approx s_w(q_w-z_w)</div>\n<p>因此点积不是简单的 <span class=\"kb-math kb-math-inline\">\\sum q_xq_w</span>，而是：</p>\n<div class=\"kb-math kb-math-display\">\\sum_i x_iw_i \\approx s_xs_w\\left(\\sum_i q_{x,i}q_{w,i}-z_w\\sum_iq_{x,i}-z_x\\sum_iq_{w,i}+nz_xz_w\\right)</div>\n<p>如果硬件只支持对称量化，就需要模型侧牺牲精度或软件插入额外修正；Intel 18A CIM 把 zero-point 项纳入加速器数据通路，意味着局部 CIM 只需高吞吐产生 raw dot-product，同时配套行/列求和和常数修正即可得到非对称量化结果。</p>\n<p>全数字 CIM 的能效来自局部性，而不是模拟物理乘法。权重或激活在近存阵列中被重复使用，局部 MAC tree/bit-serial datapath 直接在阵列边缘累加，减少宽向量在 SRAM、寄存器文件和全局互连之间的往返。与普通 systolic array 相比，它把一部分乘加贴近存储，降低每次访问的线长和开关电容；与 RRAM-CIM 相比，它不需要把电导精确映射为权重，也不需要高分辨率 ADC。</p>\n<p>147TOPS/W 与 250TOPS/mm² 的公开指标说明 18A 节点给数字 CIM 带来了两个收益：更高晶体管密度提升面积效率，更高频率和低电压运行空间提升能效。ISSCC Press Kit 中还提到该类 18A digital-CIM 运行在 2.62GHz、25°C 条件下，这表明设计目标不是低速近阈值实验宏，而是可在先进 CMOS 中以高频闭合时序的推理加速单元。</p>\n<p>局限也很明确。数字 CIM 没有 RRAM 交叉阵列那种“一个电导就是一个乘法器”的密度优势，存储密度仍受 SRAM/触发器/局部逻辑约束；同时 INT8 支持并不自动覆盖 BF16、FP8 或稀疏动态数据流。因此它更适合作为先进节点 SoC 中可规模化复制的 INT8 推理 tile，而不是替代所有 AI 数值格式的通用阵列。</p>\n<div class=\"key-point\">💡 关键：Intel 18A CIM 的价值在于把 CIM 从“高能效但难量产验证的定制宏”推进到“可综合、可验证、可迁移的先进节点数字加速器”。</div>",
      "quiz": {
        "q": "Intel 18A 数字 CIM 支持 zero-point quantization 的主要硬件意义是什么？",
        "options": [
          "完全取消所有乘加运算",
          "让非对称 INT8 量化的零点修正可在 CIM 数据通路中完成，避免额外软件/外围修正成为瓶颈",
          "把 INT8 权重改写为模拟 RRAM 电导",
          "只支持二值神经网络"
        ],
        "answer": 1,
        "explain": "非对称量化点积包含 raw sum、输入和、权重和以及常数项；硬件支持 zero-point 后，INT8 模型可以更直接映射到 CIM 宏。"
      }
    },
    {
      "id": "reram_mlc_cim",
      "num": 25,
      "name": "ReRAM MLC CIM",
      "fullName": "多级ReRAM存内计算宏 (MLC ReRAM Compute-in-Memory Macro)",
      "year": "2026",
      "org": "ISSCC",
      "parent": "rram_cim_survey",
      "paperUrl": "https://ieeexplore.ieee.org/abstract/document/11409297/",
      "projectUrl": "",
      "category": "pim_cim",
      "motivation": "MLC ReRAM CIM支持多架构推理",
      "summary": "ReRAM MLC CIM 提出了一个 22nm、96Mb 的非线性多级 ReRAM CIM 宏，面向 Mamba、Transformer 和 CNN 等不同模型提供可重构计算模式，并在 ISSCC 2026 公开材料中报告 BF16 模式 50.6-90.2TFLOPS/W 与 10 年保持条件下更低精度损失。它的核心是把 MLC ReRAM 的高密度非易失存储、非线性电导级映射和数字/模拟协同累加结合起来，提升多架构边缘推理能效。",
      "keyPoints": [
        "采用 22nm、96Mb MLC ReRAM CIM 宏，容量远高于许多早期 kb/Mb 级 ReRAM-CIM 原型",
        "ISSCC 2026 Advance Program 将其列为 Paper 30.3，题名为 50.6-to-90.2TFLOPS/W Non-Linear MLC ReRAM CIM Macro",
        "公开 Press Kit 描述其支持 reconfigurable compute modes，目标覆盖 Mamba、Transformer 和 CNN",
        "使用非线性 MLC ReRAM 编码多级权重/数值，减少单权重需要的 cell 数量和跨阵列 bit-slicing 开销",
        "高保持能力是核心卖点，公开材料称 10 年保持条件下 accuracy loss 降低 79.17%",
        "报告 BF16 模式 50.6-90.2TFLOPS/W，说明其不只是 INT-only 宏，而面向更宽动态范围的 AI 推理格式",
        "设计重点从单一 CNN 卷积扩展到 attention、state-space/Mamba 与卷积混合负载，强调多数据流适配"
      ],
      "detail": "<h5>核心示意图</h5>\n<p><img alt=\"RRAM 混合精度 CIM 框架示意\" src=\"https://ar5iv.labs.arxiv.org/html/2601.21737/assets/x1.png\" />\n<em>图：公开 ar5iv 镜像中的 RRAM 混合精度训练/编译框架图，用于说明 RRAM-CIM 在有限 cell/input bit-width 下需要量化、切片和编译协同。ISSCC 2026 论文图未提供稳定公开直链，因此这里使用同年度公开 RRAM-CIM 机制图作为补充。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># 非线性 MLC ReRAM CIM 中一次 BF16/INT 混合精度矩阵乘的抽象流程\ndef mlc_reram_cim_layer(x, weights, mode):\n    # mode 可对应 CNN 卷积、Transformer GEMM/attention projection、Mamba selective scan projection 等。\n    fmt = select_compute_format(mode)       # e.g. INT, BF16-like block format\n    x_tiles = activation_quantize_and_slice(x, fmt)\n    mapped = nonlinear_mlc_weight_map(weights, fmt)\n\n    outputs = []\n    for tile in schedule_tiles(x_tiles, mapped, mode):\n        analog_psum = 0\n        for cell_plane in tile.mlc_planes:\n            # 非线性 MLC level 不是理想等间距，需要查表或校准系数补偿。\n            v_rows = encode_input_bits(tile.x_bits)\n            i_cols = reram_crossbar_read(cell_plane.G_level, v_rows)\n            analog_psum += adc_with_level_calibration(i_cols, cell_plane.level_lut)\n\n        y_tile = digital_shift_add(analog_psum, tile.exponent_or_bit_position)\n        outputs.append(apply_retention_compensation(y_tile, mapped.retention_model))\n\n    return assemble_tiles(outputs, mode.output_shape)\n</code></pre>\n<h5>方法机制解读</h5>\n<p>MLC ReRAM 的直接收益是密度。若每个 cell 只能表示 1 bit，8-bit 权重需要多个 cell plane 和多次读取；MLC cell 可以用多个稳定电导级表示更多信息，从而减少阵列面积、读周期和数字移位累加压力。理想情况下，一个 <span class=\"kb-math kb-math-inline\">L</span>-level cell 可表示 <span class=\"kb-math kb-math-inline\">\\log_2 L</span> bit，权重切片次数从 <span class=\"kb-math kb-math-inline\">B_w</span> 降到约 <span class=\"kb-math kb-math-inline\">B_w/\\log_2 L</span>：</p>\n<div class=\"kb-math kb-math-display\">N_{\\text{read}} \\propto \\left\\lceil \\frac{B_w}{\\log_2 L} \\right\\rceil \\cdot B_x</div>\n<p>但 MLC ReRAM 的难点是电导级常常非线性、非等距，并且会随时间漂移。题名中特意写出 Non-Linear MLC，说明设计不是假设 cell level 完美均匀，而是把非线性作为映射对象处理。权重 <span class=\"kb-math kb-math-inline\">w</span> 不一定直接映射到线性 level <span class=\"kb-math kb-math-inline\">k</span>，而是选择最接近目标权重贡献的电导组合：</p>\n<div class=\"kb-math kb-math-display\">k^*=\\arg\\min_k \\left|w-\\alpha(G_k-G_{\\text{ref}})\\right|</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">G_k</span> 是第 <span class=\"kb-math kb-math-inline\">k</span> 个 MLC 电导级，<span class=\"kb-math kb-math-inline\">\\alpha</span> 是阵列到数字输出的标定比例。通过 level-aware mapping、查表校准和数字残差补偿，可以把器件非线性转化为可管理的量化误差。</p>\n<p>“High-Retention”是这类宏能否实用的分水岭。边缘设备希望模型写入后长期保持，不希望频繁刷新或重新写验证；但 ReRAM 电导会受时间、温度和读扰动影响。若保持漂移 <span class=\"kb-math kb-math-inline\">\\Delta G(t)</span> 直接进入点积，输出误差近似为：</p>\n<div class=\"kb-math kb-math-display\">\\Delta y_j(t)=\\sum_i x_i \\Delta G_{i,j}(t)</div>\n<p>因此宏级设计需要同时做器件级稳定窗口、写入 verify、保守 level 间隔、漂移感知量化和推理时补偿。公开 Press Kit 中提到 10 年保持条件下 accuracy loss 降低 79.17%，说明该设计把长期保持作为架构指标，而不是只报告刚写入后的峰值能效。</p>\n<p>支持 Mamba、Transformer、CNN 的意义在于数据流可重构。CNN 主要需要局部卷积和权重复用；Transformer 需要大 GEMM、QKV 投影和 attention 前后线性层；Mamba/SSM 类模型则包含输入投影、状态更新和逐 token scan，其访存和矩阵形状与标准 CNN 不同。一个固定卷积数据流的 CIM 宏难以高效覆盖这些负载，因此该设计强调 reconfigurable compute modes，让阵列切分、输入广播、部分和归并和输出重排能按模型类型调整。</p>\n<p>BF16 能效指标也值得注意。BF16 的指数位保留了较宽动态范围，适合精度敏感层，但在 CIM 中实现通常需要指数对齐、尾数乘加或分块缩放。合理的做法不是在阵列里完整模拟浮点乘法，而是把 mantissa/块缩放映射为多次定点 CIM 读，把 exponent/scale 放到数字域处理。这解释了为什么输出单位是 TFLOPS/W，同时仍然离不开数字移位、scale 和校准逻辑。</p>\n<div class=\"warn-box\">⚠️ 注意：MLC ReRAM 的高密度不是免费收益；如果 level 漂移、非线性和 ADC 分辨率导致重读/重写/校准开销过高，系统级能效会明显低于阵列级估计。</div>",
      "quiz": {
        "q": "MLC ReRAM CIM 相比 SLC ReRAM CIM 的主要优势和额外挑战是什么？",
        "options": [
          "优势是每个 cell 可承载更多权重信息；挑战是多级电导非线性、漂移和保持误差更难校准",
          "优势是完全不需要 ADC；挑战是无法存储权重",
          "优势是只能运行 CNN；挑战是不能表示正权重",
          "优势是所有电导级天然等间距且永不漂移；挑战是面积变大"
        ],
        "answer": 0,
        "explain": "MLC 提高密度并减少 bit-slicing，但多级电导的非线性、随机写入和长期保持漂移会放大点积误差，需要映射、verify 和补偿机制。"
      }
    },
    {
      "id": "mpu_pim",
      "num": 26,
      "name": "MPU",
      "fullName": "存内处理通用接口 (Memory Processing Unit)",
      "year": "2026",
      "org": "HPCA",
      "parent": "isaac",
      "paperUrl": "https://ieeexplore.ieee.org/abstract/document/11408599/",
      "projectUrl": "",
      "category": "pim_cim",
      "motivation": "通用PIM接口实现端到端存内执行",
      "summary": "MPU 提出了一个面向通用 bitwise PUM 的微架构无关前端，用统一 ISA、ensemble 执行模型和控制路径解决既有存内计算接口难以扩展、难以跨后端复用、且频繁依赖 CPU 处理控制流的问题。它把 PUM 从“只加速少量规则 kernel”推进到可以执行复杂端到端应用的存内处理平台。",
      "keyPoints": [
        "面向 processing-using-memory, PUM，也就是利用存储单元交互直接执行逻辑运算的存内计算范式",
        "三个核心组件：MPU ISA、ensemble execution model、综合 MPU control path",
        "抽象出 VRF、RFH 和 ensemble：VRF 对应一个或多个存储阵列，RFH 封装热/互连等硬件约束，ensemble 表达程序员定义的并行任务集合",
        "支持 compute ensemble、transfer ensemble 和 inter-MPU message passing，用于计算、片内迁移和多 MPU 协同",
        "通过统一译码器把 MPU 指令翻译成 RACER、MIMDRAM、Duality Cache 等不同 PUM 后端的微操作",
        "用 mask register、SETMASK/JUMP_COND 和 evaluation fetching infrastructure 支持 per-lane predication、if-else、动态循环和子程序返回",
        "引入 RFH-aware 热/功耗感知调度，限制同一 RFH 中并发激活的 VRF 数量，避免存内并行度造成过高功率密度",
        "论文报告在 21 个数据密集 kernel 上相对既有 PUM 设计平均提升 1.79× 性能和 3.23× 能效，并显著降低对主机 CPU 的控制依赖"
      ],
      "detail": "<h5>核心示意图</h5>\n<p><img alt=\"MPU 控制路径和后端抽象\" src=\"https://image.thum.io/get/width/1200/noanimate/https://susansun1999.github.io/images/hardware.pdf\" />\n<em>图：MPU 作者 Yiqiu Sun 个人项目页公开的 MPU hardware 图，经远程图片服务渲染为 PNG；原始官方图源为 https://susansun1999.github.io/images/hardware.pdf。图中可以看到 front end、template filler、decoder、compute controller、data transfer controller、VRF/RFH 后端抽象和 inter-MPU controller。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># MPU 的 ensemble 执行与 RFH-aware 调度简化逻辑\nfor block in ezpim_program:\n    if block.kind == &quot;compute_ensemble&quot;:\n        ensemble = []\n        for rfh_id, vrf_id in block.header.COMPUTE:\n            ensemble.append((rfh_id, vrf_id))\n\n        while has_waiting_vrfs(ensemble):\n            # 每个 RFH 的可激活 VRF 数量由热/功耗约束给出\n            active = scheduler.pick_under_rfh_limits(\n                ensemble,\n                limit=lambda rfh: rfh.max_active_vrfs,\n            )\n\n            for inst in block.body:\n                if inst.op in {&quot;CMPEQ&quot;, &quot;CMPGT&quot;, &quot;CMPLT&quot;}:\n                    conditional_register = execute_compare(active, inst)\n                elif inst.op == &quot;SETMASK&quot;:\n                    mask_register = read_mask_source(inst, conditional_register)\n                elif inst.op == &quot;JUMP_COND&quot;:\n                    if any_lane_enabled(mask_register):\n                        program_counter = inst.target\n                else:\n                    micro_ops = decoder.lower_to_datapath_micro_ops(inst, active)\n                    issue_to_selected_vrfs(active, micro_ops, mask_register)\n\n            scheduler.retire(active)\n\n    elif block.kind == &quot;transfer_ensemble&quot;:\n        acquire_single_transfer_slot()  # 保证顺序一致性\n        routes = setup_move_pairs(block.header.MOVE)\n        for memcpy in block.body.MEMCPY:\n            move_vector_register(routes, memcpy.src, memcpy.dst)\n        release_transfer_slot()\n\n    elif block.kind == &quot;send_block&quot;:\n        order_by_mpu_id_to_avoid_deadlock(block.destination)\n        inter_mpu_controller.send(block.destination, block.payload)\n</code></pre>\n<h5>方法机制解读</h5>\n<p>MPU 的出发点是：PUM 后端本来可以在存储阵列内部以极高并行度执行位操作，但现实程序不是只有规则向量 kernel。图算法、数据库、基因组、边缘分析等数据密集应用通常穿插标量计算、条件分支、动态循环、数组间数据迁移和跨任务同步。既有 PUM 设计往往把这些“间隙代码”交给主机 CPU，导致每次控制转移都要跨芯片往返。论文的简单模型显示，即便每 80 条指令才需要一次 CPU 辅助，也会造成约 10.1× 的循环执行时间膨胀；普通程序的损失可到 30-40× 量级。因此 MPU 不是再提出一个新的 PUM 阵列，而是给不同 PUM 阵列补上可编程前端和控制路径。</p>\n<p>核心抽象有三层。VRF, vector register file，是程序可见的向量寄存器文件，设计者把它映射到一个或多个物理 memory arrays；RFH, RF holder，把共享物理限制的一组 VRF 归在一起，例如热激活上限、局部互连、pipeline/core 边界；ensemble 是程序员定义的一组 VRF，这些 VRF 执行同一段 kernel。用集合表示，一个 ensemble 可以写作：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{E}=\\{(h,v)\\mid h\\in RFH,\\ v\\in VRF(h)\\}</div>\n<p>但实际同周期可激活集合还必须满足每个 RFH 的硬件约束：</p>\n<div class=\"kb-math kb-math-display\">\\forall h,\\quad \\sum_{v\\in Active(h)} 1 \\le L_h</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">L_h</span> 是该 RFH 在当前指令类型和功耗条件下允许的最大并发 VRF 数。这个拆分很重要：程序可以按任务自然组织 ensemble，而不需要硬编码物理相邻性或热限制；MPU runtime 和 scheduler 再把 ensemble 分批投放到可安全执行的 VRF 上。</p>\n<p>MPU ISA 把 PUM 程序拆成 compute ensemble 和 transfer ensemble。compute ensemble 由 <code>COMPUTE</code> header、算术/逻辑 body、<code>COMPUTE_DONE</code> footer 组成，适合 <code>ADD</code>、<code>MUL</code>、<code>MAC</code>、<code>AND</code>、<code>NOR</code>、<code>POPC</code> 等向量计算。transfer ensemble 由 <code>MOVE</code>、<code>MEMCPY</code>、<code>MOVE_DONE</code> 表达 VRF 间拷贝，论文要求同一 MPU 一次只执行一个 transfer ensemble，以保证顺序一致性。跨 MPU 则使用 <code>SEND</code>、<code>RECV</code>、<code>SEND_DONE</code> 做显式 message passing，并用 MPU ID 顺序打破环形等待，避免 transfer 通信死锁。</p>\n<p>统一 ISA 的价值在于把“软件二进制”和“存储技术微操作”解耦。不同 PUM 后端的基本逻辑可能来自 DRAM triple-row activation、ReRAM NOR/IMPLY、SRAM bitline compute 或其他机制，延迟、阵列大小和可并行激活范围都不同。MPU control path 中的 decoder 和 recipe table 负责把一条通用 <code>ADD</code> 或 <code>CMPGT</code> 展开成具体后端的微操作序列。这样软件栈可以面向 MPU ISA、VRF/RFH 和 ensemble 编程，而不是为 RACER、MIMDRAM、Duality Cache 分别维护不可移植的汇编。</p>\n<p>控制流支持是 MPU 与早期 PUM 接口的关键差异。MPU 使用 mask register 实现按 lane predication：比较指令把结果写入 conditional register，<code>SETMASK</code> 把条件转换成 lane mask，后续指令只在启用 lane 上生效。一个简化表达是：</p>\n<div class=\"kb-math kb-math-display\">y_\\ell&#x27; = m_\\ell \\cdot f(x_\\ell) + (1-m_\\ell)\\cdot y_\\ell</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">m_\\ell\\in\\{0,1\\}</span> 决定第 <span class=\"kb-math kb-math-inline\">\\ell</span> 个 lane 是否执行当前操作。<code>JUMP_COND</code> 再通过 evaluation fetching infrastructure 把 mask 状态取回控制器，如果仍有 lane 需要继续迭代，就更新 PC 跳回循环体。这样 while-loop、if-else 和数据相关退出条件可以在 PUM 内部完成，不必每轮都回到 CPU 判断。</p>\n<p>热/功耗调度解决的是 PUM 的另一个现实问题：内存密度高，若无约束地同时激活大量阵列，功率密度可能超过安全散热范围。MPU scheduler 对每个 RFH 维护 active queue 和 waiting queue，先激活不超过上限的 VRF；当当前批次完成时，再从 waiting queue 中取下一批继续执行。这个机制牺牲部分瞬时并行度，但换来正确、可部署、对程序员透明的执行模型。</p>\n<p>与 CPU/GPU 相比，MPU 的目标不是替代通用计算，而是在数据已经位于存储阵列中时消除反复搬运和主机控制往返。与 ISAAC 一类神经网络 CIM/PIM 加速器相比，MPU 关注的是通用 bitwise PUM 的编程接口和系统能力：动态控制流、任务协调、数据迁移、跨后端可移植性。可以把它理解为 PUM 生态中的“前端 ISA 与 runtime 层”，为未来编译器、OpenMP/MapReduce 风格编程和端到端应用部署提供共同目标。</p>\n<div class=\"key-point\">💡 关键：MPU 的核心贡献不是把某个矩阵乘做得更快，而是把 PUM 从后端微架构论文中的专用 kernel 加速器，抽象成有 ISA、任务模型、调度器和控制流能力的可编程存内执行平台。</div>",
      "quiz": {
        "q": "MPU 引入 RFH 的主要目的是什么？",
        "options": [
          "封装一组 VRF 共享的热、互连或激活约束，让运行时安全调度并隐藏物理细节",
          "强制所有 VRF 必须在同一周期同时执行，模拟 GPU warp",
          "把所有存内计算统一转换成主机 CPU 标量指令",
          "只用于保存神经网络权重，与通用 PUM 控制无关"
        ],
        "answer": 0,
        "explain": "RFH 把具有共同物理限制的 VRF 分组，MPU scheduler 根据 RFH 上限分批激活 VRF，使程序不必暴露后端位置和功耗约束。"
      }
    },
    {
      "id": "systolic_array",
      "num": 27,
      "name": "Systolic Array",
      "fullName": "脉动阵列 (Systolic Array)",
      "year": "1982",
      "org": "CMU",
      "parent": "—",
      "paperUrl": "https://www.eecs.harvard.edu/~htk/publication/1982-kung-why-systolic-architecture.pdf",
      "projectUrl": "",
      "category": "dataflow",
      "motivation": "数据在处理单元间脉动流转解决I/O瓶颈",
      "summary": "Systolic Array 提出了让数据像心脏脉冲一样从存储器流经规则处理单元阵列的空间计算架构，通过本地通信和多次复用每个输入数据项解决专用 VLSI 系统中的 I/O 带宽瓶颈。它奠定了后来矩阵乘、卷积、信号处理和神经网络加速器中二维 PE 阵列数据流设计的基础。",
      "keyPoints": [
        "H. T. Kung 1982 年论文《Why Systolic Architectures?》系统化阐述脉动架构的设计动机和原则",
        "核心思想是用一组规则连接的 processing elements 替代单个处理器，让数据在相邻 PE 间按固定节拍流动",
        "目标是在专用计算中同时获得简单规则的 VLSI 版图、高并发度、以及计算和 I/O 带宽平衡",
        "每个数据项从外部存储器读入后，在阵列内部被多个 PE 消费，减少反复访问主存或全局总线",
        "支持一维、二维乃至更高维阵列，可映射卷积、相关、FIR 滤波、矩阵乘、排序、动态规划等规则依赖计算",
        "与普通流水线不同，阵列中的节点是可执行计算的 PE，连接可以是多方向和多维的，且 PE 可带本地寄存器或局部存储",
        "优势来自局部通信、规则控制、流水填充后的高吞吐；代价是对算法规则性、数据到达时序和编译/调度要求较高",
        "现代 TPU、许多 NPU 矩阵乘单元和边缘 CNN 加速器延续了这一思想，但会结合片上 SRAM、NoC、稀疏性和可重构控制"
      ],
      "detail": "<h5>核心示意图</h5>\n<p><img alt=\"脉动阵列数据流示意\" src=\"https://upload.wikimedia.org/wikipedia/commons/e/e2/Systolic_array.jpg\" />\n<em>图：Wikimedia Commons 的公开脉动阵列示意图，展示 input data streams 进入规则 DPU/PE 网格并从边界输出。原始论文 PDF 是扫描版，未提供可直接引用的单图 URL，因此这里使用可信公开示意图辅助说明 Kung 论文中的数据脉动思想。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># 输出驻留的二维脉动阵列计算 C = A @ B\n# A 的行从西向东流动，B 的列从北向南流动，每个 PE(i, j) 保留 C[i][j] 的部分和。\nn, k_dim, m = A.rows, A.cols, B.cols\nC = [[0 for j in range(m)] for i in range(n)]\n\nfor t in range(n + k_dim + m - 2):\n    for i in range(n):\n        for j in range(m):\n            a = west_input(i, j, t)   # 可能来自 A[i][t-j] 或左邻 PE\n            b = north_input(i, j, t)  # 可能来自 B[t-i][j] 或上邻 PE\n\n            if a is not None and b is not None:\n                C[i][j] += a * b\n\n            send_east(i, j, a)\n            send_south(i, j, b)\n\nreturn C\n</code></pre>\n<h5>方法机制解读</h5>\n<p>Kung 论文关注的核心矛盾是：VLSI 时代可以在芯片上放越来越多简单运算单元，但外部 I/O 和全局通信带宽增长远慢于可用计算资源。如果每个乘加都从外部存储器读取两个操作数并写回中间结果，阵列越大，越容易被 I/O 而不是计算限制。脉动架构的回答是让数据进入芯片后在内部沿局部连线传播，让一个数据项在离开阵列前参与多个计算。用一个粗略的算术强度表达：</p>\n<div class=\"kb-math kb-math-display\">AI=\\frac{\\text{operations}}{\\text{external words moved}}</div>\n<p>传统单 PE 或频繁回访主存的实现会让 <span class=\"kb-math kb-math-inline\">AI</span> 接近常数；设计良好的脉动数据流则让每次外部输入在阵列内被 <span class=\"kb-math kb-math-inline\">p</span> 个 PE 复用，使有效 <span class=\"kb-math kb-math-inline\">AI</span> 随阵列宽度或数据复用距离提升。这就是“数据在处理单元间脉动流转解决 I/O 瓶颈”的具体含义。</p>\n<p>所谓 systolic 来自心脏泵血的类比：存储器像心脏，PE 像细胞，数据以规则节拍从存储器送入阵列、经过多个 PE 处理、再回到存储器或输出边界。每个 PE 的行为通常很简单，例如接收来自西侧的 <span class=\"kb-math kb-math-inline\">a</span>、来自北侧的 <span class=\"kb-math kb-math-inline\">b</span>、本地累加 <span class=\"kb-math kb-math-inline\">c</span>，再把 <span class=\"kb-math kb-math-inline\">a</span> 和 <span class=\"kb-math kb-math-inline\">b</span> 转发给东侧和南侧邻居：</p>\n<div class=\"kb-math kb-math-display\">c_{i,j}^{(t+1)} = c_{i,j}^{(t)} + a_{i,j}^{(t)}b_{i,j}^{(t)}</div>\n<div class=\"kb-math kb-math-display\">a_{i,j+1}^{(t+1)} = a_{i,j}^{(t)},\\quad b_{i+1,j}^{(t+1)} = b_{i,j}^{(t)}</div>\n<p>对于矩阵乘 <span class=\"kb-math kb-math-inline\">C=A B</span>，每个 PE 负责一个 <span class=\"kb-math kb-math-inline\">C_{i,j}</span>，目标结果是：</p>\n<div class=\"kb-math kb-math-display\">C_{i,j}=\\sum_{k=0}^{K-1}A_{i,k}B_{k,j}</div>\n<p>调度器或编译器把 <span class=\"kb-math kb-math-inline\">A</span> 的行和 <span class=\"kb-math kb-math-inline\">B</span> 的列错开注入，使同一个 <span class=\"kb-math kb-math-inline\">k</span> 的 <span class=\"kb-math kb-math-inline\">A_{i,k}</span> 与 <span class=\"kb-math kb-math-inline\">B_{k,j}</span> 在同一拍到达 PE <span class=\"kb-math kb-math-inline\">(i,j)</span>。阵列填满后，每个周期几乎所有 PE 都在做有用乘加；输出在若干拍延迟后从本地 accumulator 或边界读出。这种 fill, steady state, drain 的节奏正是脉动阵列的高吞吐来源。</p>\n<p>脉动阵列和普通流水线有相似的时间重叠，但边界不同。流水线通常把一条指令或一个操作拆成多个阶段，每个阶段处理不同子功能；脉动阵列中的每个 PE 本身就是可重复执行完整局部 kernel 的计算节点。它也不同于传统 SIMD：SIMD 由一个控制流向多个 lane 广播同一指令，而脉动阵列更强调数据依赖图和物理邻接，把通信模式固化到 PE 间连线和注入时序中。</p>\n<p>VLSI 友好性是 1982 年论文的重要背景。规则 PE 网格意味着短距离连线、重复版图、模块化扩展和较容易测试。相比使用全局总线或交叉开关连接所有单元，局部邻居通信的面积和时序更可控。特别是在卷积、FIR 滤波和矩阵乘这类规则循环中，依赖关系本来就是局部且重复的，脉动阵列把算法结构直接投影到硬件布局。</p>\n<p>局限也来自同一来源：脉动阵列并不擅长不规则分支、随机内存访问、动态负载均衡和复杂控制。要获得高利用率，算法必须能被重排成规则依赖图，并且输入数据必须按正确节拍、正确方向到达。如果阵列大小、问题尺寸或数据稀疏性不匹配，就会产生 padding、空泡或 PE 闲置。后来的 TPU、Eyeriss、Gemmini 等设计都在这个基础上加入更丰富的片上缓冲、可配置数据流和编译器映射，用来缓解纯脉动结构过于专用的问题。</p>\n<div class=\"key-point\">💡 关键：脉动阵列的本质不是“很多 MAC 排成矩阵”，而是把外部存储访问变成边界数据流，把中间结果和操作数复用限制在局部邻居通信中，从而让计算吞吐与 I/O 带宽达到可设计的平衡。</div>",
      "quiz": {
        "q": "脉动阵列相比每次都访问主存的单处理器实现，最核心的能效来源是什么？",
        "options": [
          "输入数据在阵列内部沿相邻 PE 多次复用，减少外部 I/O 和全局通信",
          "每个 PE 都运行完整操作系统以提升灵活性",
          "所有中间结果必须立即写回 DRAM 以保持一致性",
          "用随机互连替代规则局部连线以减少调度难度"
        ],
        "answer": 0,
        "explain": "脉动架构通过规则本地数据流让一个数据项被多个 PE 消费，提升每次外部访问产生的计算量，这是缓解 I/O 瓶颈的关键。"
      }
    },
    {
      "id": "eyeriss",
      "num": 28,
      "name": "Eyeriss",
      "fullName": "Eyeriss能效加速器 (Eyeriss Energy-Efficient Accelerator)",
      "year": "2016",
      "org": "MIT",
      "parent": "systolic_array",
      "paperUrl": "https://ieeexplore.ieee.org/abstract/document/7738524/",
      "projectUrl": "",
      "category": "dataflow",
      "motivation": "Row-Stationary数据流最大化局部数据复用",
      "summary": "Eyeriss 提出了 Row-Stationary, RS 数据流和对应空间架构，把卷积拆成行级原语并在 PE 本地、PE 间和 global buffer 中同时复用 filter、ifmap 与 psum，解决 CNN 加速器中数据移动能耗远高于 MAC 计算的问题。它证明了能效优化应围绕完整存储层级和数据流映射，而不只是堆叠更多乘加单元。",
      "keyPoints": [
        "MIT Eyeriss 项目包含 ISSCC 2016 芯片论文、ISCA 2016 Row-Stationary 数据流论文和后续 JSSC 扩展论文",
        "采用 168 个 PE 的 12×14 空间阵列、108 KB global buffer、16-bit 定点 datapath 和四级数据层级：DRAM、GLB、inter-PE、PE scratchpad",
        "Row-Stationary 数据流把高维卷积拆成 1D convolution primitives，每个 PE 保持一行 filter、一行 ifmap 和一行 psum 的局部复用",
        "PE set 内横向复用 filter row、对角复用 ifmap row、纵向累加 psum row，同时优化三类数据移动",
        "映射参数随 CNN layer shape 变化，通过 strip mining、PE set segmentation 和 processing pass scheduling 适配 AlexNet 等不同层",
        "NoC 支持 multicast 和 point-to-point single-cycle delivery，分别服务 filter、ifmap、psum 的不同交付模式",
        "Run-Length Compression 和 PE data gating 利用 CNN 中零值激活，降低 DRAM 带宽和无效 MAC 切换功耗",
        "官方项目页报告 Eyeriss 在 AlexNet 卷积层上达到 35 fps、278 mW，ISCA 论文报告 RS 在 AlexNet 卷积层比既有数据流能效高 1.4× 到 2.5×"
      ],
      "detail": "<h5>核心示意图</h5>\n<p><img alt=\"Eyeriss 系统架构\" src=\"https://eyeriss.mit.edu/images/architecture.png\" />\n<em>图：Eyeriss 官方项目页提供的架构图。图中 108 KB Buffer SRAM、14×12 PE Array、Filter/Image/Psum 数据通路、RLC 压缩解压和 ReLU 构成 Eyeriss 的 CNN 加速系统。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># Row-Stationary 数据流对一个卷积层的简化调度\nfor pass_cfg in optimize_rs_mapping(layer_shape, pe_array, glb, spads):\n    # GLB 保存会跨 pass 复用的 ifmap，以及尚未归约完成的 psum。\n    glb.prefetch_ifmap_tiles(pass_cfg.ifmap_tiles)\n    glb.prefetch_filter_tiles(pass_cfg.filter_tiles)\n\n    for pe_set in map_pe_sets(pass_cfg, pe_array):\n        for pe in pe_set.parallel_pes:\n            filter_row = pe.filter_spad.load(pe.assigned_filter_row)\n            ifmap_row = pe.ifmap_spad.load(pe.assigned_ifmap_row)\n            psum_row = pe.psum_spad.read_or_zero(pe.assigned_output_row)\n\n            # 1D convolution primitive: 一行 filter 滑过一行 ifmap。\n            for out_x in pe.output_row_range:\n                window = ifmap_row[out_x:out_x + layer_shape.S]\n                psum_row[out_x] += dot(filter_row, window)\n\n            # PE set 内的 psum 纵向累加，最终结果或中间 psum 写回 GLB。\n            send_psum_to_neighbor_or_glb(pe, psum_row)\n\n    if pass_cfg.produces_final_ofmap:\n        ofmap = relu(glb.read_completed_psums())\n        dram.write(run_length_encode(ofmap))\n</code></pre>\n<h5>方法机制解读</h5>\n<p>Eyeriss 的基本判断是：CNN 的主要成本不只是乘加次数，而是数据在 DRAM、global buffer、PE 阵列和本地寄存器之间移动的次数。高维卷积可写成：</p>\n<div class=\"kb-math kb-math-display\">O[z][u][x][y] =\n\\operatorname{ReLU}\\left(\nB[u] + \\sum_{k=0}^{C-1}\\sum_{i=0}^{R-1}\\sum_{j=0}^{S-1}\nI[z][k][Ux+i][Uy+j]W[u][k][i][j]\n\\right)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">I</span> 是输入 feature map，<span class=\"kb-math kb-math-inline\">W</span> 是 filter，<span class=\"kb-math kb-math-inline\">O</span> 是输出 feature map，<span class=\"kb-math kb-math-inline\">U</span> 是 stride。这个公式里有三种复用：同一个 filter weight 在同一输入平面上滑动时被复用，同一个 ifmap pixel 被多个 filter 和多个窗口复用，同一个输出 psum 需要跨 <span class=\"kb-math kb-math-inline\">C\\times R\\times S</span> 次 MAC 累加。Weight-Stationary 主要优化 weight 复用，Output-Stationary 主要优化 psum 累加，No-Local-Reuse 依赖更大的 GLB；Eyeriss 的 RS 目标是同时降低三类数据的移动。</p>\n<p>RS 的第一步是把二维/高维卷积拆成 1D convolution primitive。每个 primitive 只处理“一行 filter”和“一行 ifmap”，生成“一行 psum”。把一个 primitive 放到一个 PE 中，filter row 和 ifmap row 可以停留在 PE scratchpad 中，通过滑动窗口复用，psum row 也可在本地累加。这个局部驻留就是 row-stationary 名字的来源：驻留的是行级计算上下文，而不是单个权重或单个输出像素。</p>\n<p>第二步是把多个 1D primitive 组织成 PE set 来完成 2D convolution。论文中的映射规则是：filter rows 在 PE set 中横向复用，ifmap rows 以对角线方式复用，psums 在垂直方向累加。对于一个 filter 高度为 <span class=\"kb-math kb-math-inline\">R</span>、输出行数为 <span class=\"kb-math kb-math-inline\">E</span> 的层，理想 PE set 尺寸与 <span class=\"kb-math kb-math-inline\">R</span> 和 <span class=\"kb-math kb-math-inline\">E</span> 有关；如果 PE set 比 168 个 PE 更大，就用 strip mining 每次只处理 <span class=\"kb-math kb-math-inline\">e\\le E</span> 行输出；如果太宽，则拆成多个 segment 分别映射到 12×14 物理阵列上。</p>\n<p>第三步是 processing pass scheduling。一次 pass 会处理若干 channel、filter 和 batch 组合。GLB 不只是中转站，而是用于跨 pass 保存 ifmap 和尚未最终归约的 psum。这样同一个 ifmap tile 可服务多个 filter group，psum 在没有完成所有 channel 累加前也不需要写回 DRAM。映射器选择 pass 参数时要考虑 GLB 容量、每个 PE 的 spad 容量、PE 数量和各层 shape，目标是最小化：</p>\n<div class=\"kb-math kb-math-display\">E_{\\text{data}}=\n\\sum_{\\ell\\in\\{\\text{DRAM, GLB, NoC, spad}\\}}\nN_\\ell \\cdot e_\\ell</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">N_\\ell</span> 是某层级的数据访问次数，<span class=\"kb-math kb-math-inline\">e_\\ell</span> 是每次访问能耗。因为 <span class=\"kb-math kb-math-inline\">e_{\\text{DRAM}}</span> 远大于片上访问，RS 即使增加一些本地或 inter-PE 通信，只要显著减少 DRAM/GLB 访问，整体能效就会提升。</p>\n<p>NoC 是 RS 能落地的关键硬件。Eyeriss 为 filter、ifmap、psum 配置不同数据传递模式，global input network 使用 row/column tag 做 multicast，未匹配的 bus 和 PE 被 gate 掉以省能。psum 还可通过本地网络直接传到垂直邻居，避免回到 GLB 再读出。JSSC 论文特别指出，Eyeriss 的 168 个 PE 有独立本地控制，不要求所有 PE 像经典 systolic array 一样 lock-step；它继承了空间阵列和局部数据流思想，但通过可配置 NoC 和 layer-level 配置适配更多 CNN shape。</p>\n<p>Eyeriss 还利用数据统计。ReLU 后的 feature map 包含大量零值，芯片使用 run-length compression 降低 DRAM 传输量；PE 内部使用 zero buffer 记录 ifmap spad 的零位置，如果当前 ifmap 为零，就关闭 filter spad 读取和 MAC datapath 切换。论文报告这种 data gating 相比无 gating 的 PE 设计可节省约 45% PE 功耗。这类优化说明 RS 不是孤立的数据流算法，而是与压缩、NoC、spad 组织和芯片级控制共同工作。</p>\n<p>从谱系看，Eyeriss 是脉动阵列思想在 CNN 能效问题上的一次重要分化。经典 systolic array 强调固定节拍和规则传播，Eyeriss 保留了 PE 阵列和局部通信，但把优化目标改为“在四级存储层级中最小化总数据移动能耗”。这也是它对后续 DNN accelerator 的启发：数据流选择、layer mapping 和片上存储分配与 MAC 数量同等重要。</p>\n<div class=\"key-point\">💡 关键：Row-Stationary 的创新不是让某一种数据永远停住，而是在 PE 内、PE 间和 GLB 之间同时安排 filter、ifmap、psum 的局部性，使每一层 CNN 都按其 shape 找到能耗较低的数据移动路径。</div>",
      "quiz": {
        "q": "Eyeriss 的 Row-Stationary 数据流为什么比只做 Weight-Stationary 或 Output-Stationary 更通用？",
        "options": [
          "它同时考虑 filter、ifmap 和 psum 的复用与存储层级能耗，并可随 CNN layer shape 重映射",
          "它完全取消片上 buffer，只依赖外部 DRAM 带宽",
          "它要求所有 PE 必须严格 lock-step，因此不需要 NoC 配置",
          "它只优化全连接层，不处理卷积层"
        ],
        "answer": 0,
        "explain": "RS 将卷积拆成行级原语，并用 PE set、processing pass 和 GLB 调度同时优化三类数据移动，所以能适配不同卷积层形状。"
      }
    },
    {
      "id": "eyeriss_v2",
      "num": 29,
      "name": "Eyeriss v2",
      "fullName": "Eyeriss v2灵活互联架构 (Eyeriss v2 Flexible Architecture)",
      "year": "2019",
      "org": "MIT",
      "parent": "eyeriss",
      "paperUrl": "—",
      "projectUrl": "",
      "category": "dataflow",
      "motivation": "层级化网格互联支持更广泛的网络拓扑",
      "summary": "Eyeriss v2 提出了层级化网格片上网络 HM-NoC 和压缩域稀疏 PE，解决紧凑 DNN、稀疏 DNN 中层形状变化大、数据复用不稳定、传统固定 NoC 利用率低的问题。它把 Eyeriss 的 row-stationary 思想扩展成可按层配置的通信结构，在 MobileNet 和 sparse MobileNet 这类移动端模型上显著提升吞吐和能效。",
      "keyPoints": [
        "采用 16 个 PE cluster 与 16 个 GLB cluster，按 8×2 阵列组织；每个 PE cluster 内含 12 个 PE，形成局部 all-to-all、全局 mesh 的两级结构",
        "引入 Hierarchical Mesh NoC，为 input activation、weight、partial sum 分别配置独立数据通路",
        "HM-NoC 支持 high bandwidth、high reuse、grouped multicast、interleaved multicast 等模式，按层的数据复用和带宽需求选择路由",
        "稀疏权重和稀疏激活使用 CSC 类压缩格式，尽量在压缩域完成读取、匹配、乘加和部分和更新",
        "PE 支持 SIMD width 2，一次用同一 activation 更新两个 weight 对应的 partial sum，提升吞吐并减少 activation SPad 读访问",
        "编译/映射阶段根据层形状、稀疏分布、片上存储和 NoC 模式决定 tile、cluster 分配与静态路由配置",
        "论文还提出 Eyexam 分析方法，用逐步加约束的方式解释模型特征和硬件约束如何限制实际吞吐"
      ],
      "detail": "<h5>核心示意图</h5>\n<p><img alt=\"Eyeriss v2 HM-NoC 模式\" src=\"https://ar5iv.labs.arxiv.org/html/1807.07928/assets/x13.png\" />\n<em>图 1：Eyeriss v2 论文 Figure 8 的 ar5iv 公开镜像。图中展示 HM-NoC 的两级结构，以及高带宽、高复用、分组多播、交错多播等路由模式。</em></p>\n<p><img alt=\"Eyeriss v2 CSC 压缩格式\" src=\"https://ar5iv.labs.arxiv.org/html/1807.07928/assets/x24.png\" />\n<em>图 2：Eyeriss v2 论文 Figure 16 的 ar5iv 公开镜像。图中展示权重矩阵如何转成 data vector、count vector 和 address vector。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># Eyeriss v2 的按层映射与压缩域执行伪代码\ndef compile_layer_for_eyeriss_v2(layer, hw):\n    reuse = analyze_reuse(layer)          # iact / weight / psum 的复用机会\n    bandwidth = estimate_bandwidth(layer) # 每类数据每周期需要多少供给\n\n    noc_mode = {}\n    for dtype in [&quot;iact&quot;, &quot;weight&quot;, &quot;psum&quot;]:\n        if bandwidth[dtype] &gt; reuse[dtype]:\n            noc_mode[dtype] = &quot;high_bandwidth&quot;\n        elif reuse[dtype] == &quot;global&quot;:\n            noc_mode[dtype] = &quot;high_reuse&quot;\n        elif reuse[dtype] == &quot;cluster_group&quot;:\n            noc_mode[dtype] = &quot;grouped_multicast&quot;\n        else:\n            noc_mode[dtype] = &quot;interleaved_multicast&quot;\n\n    tiles = tile_convolution(layer, pe_clusters=hw.pe_clusters, glb=hw.glb)\n    weight_csc = compress_weights_by_column(layer.weights)\n    return StaticSchedule(tiles=tiles, weights=weight_csc, noc_mode=noc_mode)\n\n\ndef run_tile(schedule, activation_stream):\n    for tile in schedule.tiles:\n        configure_hm_noc(schedule.noc_mode)\n        iact_csc = compress_activations(activation_stream[tile.input_window])\n\n        # PE 直接消费非零 weight / activation pair，避免先展开成稠密张量。\n        for cluster in tile.assigned_clusters:\n            for pe in cluster.pes:\n                w_col = schedule.weights.column(pe.weight_column)\n                for w0, w1 in pairwise_nonzero_weights(w_col):  # SIMD width 2\n                    a = iact_csc.lookup(w0.input_coordinate)\n                    if a != 0:\n                        pe.psum[w0.output_coordinate] += a * w0.value\n                        pe.psum[w1.output_coordinate] += a * w1.value\n        write_back_partial_sums(tile)\n</code></pre>\n<h5>方法机制解读</h5>\n<p>Eyeriss v2 的直接背景是模型从 AlexNet/VGG 这类大卷积网络转向 MobileNet、SqueezeNet、稀疏剪枝网络。传统 CNN 加速器通常假设卷积层有较大的通道数、滤波器数和空间尺寸，因此 weight、input activation、partial sum 都有稳定复用；但 depthwise convolution、pointwise convolution、小 batch 推理和稀疏权重会打破这些假设。若 NoC 只能高效支持某一种广播或多播模式，PE 很容易因为某类数据送不到、送太慢或复用不足而空转。</p>\n<p>HM-NoC 的设计把“灵活性”集中在片上通信而不是每个 PE 的复杂控制中。局部 cluster 内只连接 12 个 PE，可以承受 all-to-all 的多路选择成本；cluster 之间用 mesh 扩展到 8×2，全局成本随 cluster 数近似线性增长。直觉上，如果直接对全部 <span class=\"kb-math kb-math-inline\">P</span> 个 PE 做全互联，连接和选择成本接近：</p>\n<div class=\"kb-math kb-math-display\">C_{\\text{flat}}\\propto P^2</div>\n<p>而两级结构把成本拆成每个 cluster 内的 <span class=\"kb-math kb-math-inline\">k^2</span> 与 cluster 间 mesh 路由：</p>\n<div class=\"kb-math kb-math-display\">C_{\\text{hier}}\\propto N_{\\text{cluster}}\\cdot k^2 + C_{\\text{mesh}}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">P=N_{\\text{cluster}}\\cdot k</span>。这使 Eyeriss v2 能保留局部任意分发能力，又避免全局 all-to-all 在面积、线长、功耗上的快速膨胀。</p>\n<p>不同层会触发不同的 HM-NoC 模式。普通 CONV 同时有 weight reuse 与 activation reuse，可以让一类数据 grouped multicast，另一类数据 interleaved multicast，使所有 PE 都收到足够数据；depthwise CONV 的每个 filter 只作用于一个输入通道，跨 channel 复用少，更需要 high bandwidth 或更细粒度 multicast；FC 或 1×1 CONV 则更接近矩阵乘，数据分布可以按输出通道和输入通道 tile。Eyeriss v2 的关键不是某个固定 dataflow，而是让静态 mapper 为每层选择“哪类数据 stationary、哪类数据 multicast、哪类数据 unicast”。</p>\n<p>卷积本身仍可写为：</p>\n<div class=\"kb-math kb-math-display\">O[m,e,f]=\\sum_{c,r,s}W[m,c,r,s]\\cdot I[c,e+r,f+s]</div>\n<p>稀疏网络中，大量 <span class=\"kb-math kb-math-inline\">W</span> 或 <span class=\"kb-math kb-math-inline\">I</span> 为 0。如果先解压成稠密矩阵再乘加，硬件仍会为零值搬运和调度付出代价。Eyeriss v2 使用 CSC 类格式，把非零值、前导零计数和列起点地址分开保存；执行时 PE 根据 count/address 恢复非零元素位置，只对可能贡献输出的 pair 做 MAC。有效乘加量可以近似理解为：</p>\n<div class=\"kb-math kb-math-display\">N_{\\text{MAC}}^{\\text{eff}}=\\sum_{(m,c,r,s):W\\ne0}\\mathbf{1}\\left[I[c,e+r,f+s]\\ne0\\right]</div>\n<p>这同时减少计算开关活动和片上/片外数据移动。</p>\n<p>稀疏处理还带来负载均衡问题：如果按稠密坐标平均分给 PE，有些 PE 对应的 tile 非零多，有些几乎全零，整体吞吐会被最慢 PE 决定。Eyeriss v2 因此在映射权重到 PE 时考虑非零数量，并让每个 PE 的 SPad 存放压缩后的非零权重而不是固定稠密窗口。SIMD width 2 进一步利用同一个 activation 同时更新两个 weight 对应的 partial sum；若遇到填充的全零 pair，硬件可 gating 第二条 MAC datapath 和 SPad 端口，降低无效翻转。</p>\n<p>与原始 Eyeriss 相比，Eyeriss v2 的改进重点从“找到一个总能耗很低的 row-stationary dataflow”转向“在紧凑/稀疏模型上仍维持 PE 利用率”。论文报告 sparse MobileNet 在 65nm 实现、batch size 1 下达到 1470.6 inferences/s 和 2560.3 inferences/J，相比原始 Eyeriss 运行 MobileNet 有 12.6× 吞吐提升和 2.5× 能效提升。这个结果说明移动端加速器的瓶颈不只是 MAC 数，而是 layer shape、NoC 模式、稀疏编码和 mapper 共同决定的数据供应效率。</p>\n<div class=\"key-point\">💡 关键：Eyeriss v2 把“数据流”从固定映射扩展为可配置通信问题；HM-NoC 负责适配复用模式，压缩域 PE 负责让稀疏性真正减少搬运和乘加。</div>",
      "quiz": {
        "q": "Eyeriss v2 引入 HM-NoC 的核心目的是什么？",
        "options": [
          "在不同层的数据复用和带宽需求变化时，为 iact、weight、psum 选择合适的广播、多播或单播路径",
          "把所有 PE 做成完全独立的 CPU 核，运行通用操作系统线程",
          "只优化 DRAM 容量，而不改变片上通信方式",
          "强制所有卷积层都使用同一个固定 row-stationary 映射"
        ],
        "answer": 0,
        "explain": "紧凑和稀疏 DNN 的层形状差异很大，固定 NoC 容易造成 PE 空转；HM-NoC 用两级结构和多种路由模式适配每层的数据流。"
      }
    },
    {
      "id": "sze_dnn_survey",
      "num": 30,
      "name": "DNN硬件综述",
      "fullName": "深度学习硬件加速综述 (Efficient Processing of DNNs Survey)",
      "year": "2017",
      "org": "MIT",
      "parent": "eyeriss",
      "paperUrl": "—",
      "projectUrl": "",
      "category": "dataflow",
      "motivation": "定义数据流分类学权威综述DNN硬件加速",
      "summary": "《Efficient Processing of Deep Neural Networks》系统化提出了理解 DNN 硬件效率的框架，用计算模式、存储层次、数据流分类、硬件平台和算法硬件协同优化来解释为什么数据移动通常比 MAC 本身更关键。它把 weight stationary、output stationary、no local reuse、row stationary 等 dataflow 放入统一 taxonomy，成为后续 DNN 加速器论文对比数据复用与能耗的常用基准。",
      "keyPoints": [
        "将 DNN 计算拆解为 CONV、FC、activation、pooling、normalization 等基本层，并强调 CONV/FC 的 MAC 和数据移动主导成本",
        "区分 CPU/GPU 等 temporal architecture 与 ASIC/FPGA 常见 spatial architecture，说明 PE 阵列和本地 scratchpad 对能效的意义",
        "提出以存储层次为中心的数据流视角：DRAM、global buffer、NoC、PE RF 访问次数共同决定能耗",
        "归纳 weight stationary、output stationary、no local reuse、row stationary 四类典型 accelerator dataflow",
        "强调 row stationary 不是只固定某一类数据，而是同时优化 weight、activation、partial sum 在 RF/阵列内的复用",
        "将量化、剪枝、压缩、紧凑网络结构归入 algorithm-hardware co-design，并讨论它们如何减少 MAC 数和数据搬运",
        "给出硬件评估指标：吞吐、延迟、能耗、面积、成本、精度影响、batch size、外部内存流量和系统约束"
      ],
      "detail": "<h5>核心示意图</h5>\n<p><img alt=\"Row Stationary 二维卷积复用\" src=\"https://ar5iv.labs.arxiv.org/html/1703.09039/assets/x39.png\" />\n<em>图 1：综述论文 Figure 28 的 ar5iv 公开镜像，展示 Row Stationary dataflow 如何在二维 PE 阵列内复用 filter row、input row 和 partial sum。</em></p>\n<p><img alt=\"不同 dataflow 的能耗分解\" src=\"https://ar5iv.labs.arxiv.org/html/1703.09039/assets/x44.png\" />\n<em>图 2：综述论文 Figure 33(a) 的 ar5iv 公开镜像，对比 AlexNet CONV 层中不同 dataflow 在各级存储和 ALU 上的能耗分解。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># 综述中 dataflow/mapper 思想的简化形式：枚举映射，最小化各级数据移动能耗\ndef choose_energy_efficient_dataflow(layer, hardware):\n    candidates = []\n    for dataflow in [&quot;weight_stationary&quot;, &quot;output_stationary&quot;, &quot;no_local_reuse&quot;, &quot;row_stationary&quot;]:\n        for tile in enumerate_legal_tiles(layer, hardware):\n            for loop_order in enumerate_loop_orders(layer):\n                access = estimate_access_counts(\n                    layer=layer,\n                    tile=tile,\n                    loop_order=loop_order,\n                    dataflow=dataflow,\n                    memory_levels=[&quot;DRAM&quot;, &quot;global_buffer&quot;, &quot;NoC&quot;, &quot;RF&quot;]\n                )\n                energy = access[&quot;MAC&quot;] * hardware.energy[&quot;MAC&quot;]\n                for level in [&quot;DRAM&quot;, &quot;global_buffer&quot;, &quot;NoC&quot;, &quot;RF&quot;]:\n                    energy += access[level] * hardware.energy[level]\n                candidates.append((energy, dataflow, tile, loop_order))\n\n    return min(candidates, key=lambda item: item[0])\n</code></pre>\n<h5>方法机制解读</h5>\n<p>这篇综述的核心贡献不是提出单个新芯片，而是把 DNN 加速器的设计问题归纳成可比较的系统框架。DNN 的主算子通常可以写成卷积或矩阵乘：</p>\n<div class=\"kb-math kb-math-display\">O[n,m,e,f]=\\sum_{c,r,s}I[n,c,e+r,f+s]\\cdot W[m,c,r,s]</div>\n<p>从纯计算看，这只是大量规则 MAC；但硬件效率取决于每个 <span class=\"kb-math kb-math-inline\">I</span>、<span class=\"kb-math kb-math-inline\">W</span>、partial sum 被从哪个存储层读写多少次。论文强调一次 DRAM 访问的能耗可能比一次小位宽 MAC 高几个数量级，因此“减少数据移动”往往比“增加 MAC 峰值”更重要。</p>\n<p>综述将 DNN 硬件分为 temporal 与 spatial 两种思路。CPU/GPU 倾向用集中控制、cache、SIMD/SIMT 和大量线程隐藏延迟；ASIC/FPGA 加速器更常用 spatial PE 阵列，让数据在 PE 间直接流动，并用 RF 或 scratchpad 显式保存复用数据。二者不是简单优劣关系：GPU 灵活、生态强，适合训练和多模型部署；专用加速器则能把控制、取指、缓存一致性等通用开销换成更低能耗的数据通路。</p>\n<p>dataflow taxonomy 的重点是回答“什么数据停在哪里”。Weight stationary 让权重尽量留在 PE RF，适合权重复用高的场景，但 activation 和 partial sum 可能需要更多移动；output stationary 让 partial sum 留在本地直到归约完成，减少部分和读写；no local reuse 将更多面积给 global buffer，牺牲 PE RF 复用来降低 DRAM 流量；row stationary 尝试同时复用 filter row、input row 和 partial sum，把总体访问能耗降到最低。可用一个统一能耗模型表达：</p>\n<div class=\"kb-math kb-math-display\">E_{\\text{layer}}=N_{\\text{MAC}}E_{\\text{MAC}}+\\sum_{l\\in L}\\left(N_l^I+N_l^W+N_l^P\\right)E_l</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">L</span> 包括 DRAM、global buffer、NoC、RF，<span class=\"kb-math kb-math-inline\">N_l^I,N_l^W,N_l^P</span> 分别是 activation、weight、partial sum 在第 <span class=\"kb-math kb-math-inline\">l</span> 层存储/互联上的访问次数。</p>\n<p>Row stationary 的直觉是让一个 PE 负责一段一维卷积：filter row 留在 RF，滑动窗口中的 input activation 在相邻输出之间复用，partial sum 也在本地累加。然后二维 PE 阵列把多个 row、channel、filter 和 feature map 组合起来，扩展到完整 CONV。相比只优化某一类数据的 WS/OS，RS 牺牲一点局部最优，换取三类数据总能耗的平衡；图中的能耗分解也说明 RS 在 CONV 层总能耗上通常更低。</p>\n<p>综述还把算法侧优化纳入同一个能耗框架。低精度量化减少每次 MAC 和每次搬运的 bit 数；剪枝减少非零权重和有效 MAC；压缩减少存储和带宽，但会引入索引、解码和负载均衡开销；紧凑网络结构如 bottleneck、depthwise convolution 会减少名义 MAC，却也可能降低复用机会，让 NoC 和 mapper 更难保持 PE 利用率。后续 Eyeriss v2、SCNN、TPU、NVDLA 等工作都可以放回这个坐标系中分析。</p>\n<p>评估方法也是该综述的价值所在。只报告 GOPS 或 TOPS 不足以说明效率，因为 batch size、外部 DRAM 流量、片上 SRAM 大小、工艺节点、精度、稀疏度、准确率损失都会改变结论。更合理的比较要同时给出：</p>\n<div class=\"kb-math kb-math-display\">\\text{throughput},\\quad \\text{latency},\\quad \\frac{\\text{inferences}}{\\text{J}},\\quad \\frac{\\text{ops}}{\\text{W}},\\quad \\text{area efficiency}</div>\n<p>并说明这些指标是在什么模型、输入尺寸、batch、数值精度和内存系统下得到的。</p>\n<div class=\"key-point\">💡 关键：这篇综述定义的不是“哪个 dataflow 永远最好”，而是“用数据移动和存储层次解释为什么某个 dataflow 在某类模型和硬件约束下更好”。</div>",
      "quiz": {
        "q": "在 Sze 等人的 DNN 硬件综述中，为什么 dataflow 是评估加速器能效的核心？",
        "options": [
          "因为 dataflow 决定 weight、activation、partial sum 在各级存储和 NoC 中移动多少次",
          "因为 dataflow 只决定神经网络的训练准确率，不影响硬件能耗",
          "因为所有 dataflow 都会产生完全相同的 DRAM 访问次数",
          "因为只要峰值 TOPS 足够高，存储层次可以忽略"
        ],
        "answer": 0,
        "explain": "DNN 的能耗常由数据移动主导；dataflow 决定三类数据如何在 DRAM、global buffer、NoC 和 RF 间复用与搬运。"
      }
    },
    {
      "id": "nvlink",
      "num": 31,
      "name": "NVLink/NVSwitch",
      "fullName": "NVLink高速互联 (NVLink/NVSwitch Interconnect)",
      "year": "2016",
      "org": "NVIDIA",
      "parent": "—",
      "paperUrl": "—",
      "projectUrl": "",
      "category": "interconnect",
      "motivation": "私有高速协议支持数千GPU统一寻址",
      "summary": "NVLink 提出了面向 NVIDIA GPU 的高带宽低延迟 scale-up 互联，解决 PCIe 在多 GPU 训练、推理、统一地址访问和频繁 collective 通信中的带宽瓶颈。NVSwitch 进一步把点到点 NVLink 扩展成交换式、近似非阻塞的全互联 GPU fabric，使 8 卡服务器到机架级 GPU 域都能以更稳定的带宽执行 AllReduce、all-to-all 和模型并行通信。",
      "keyPoints": [
        "NVLink 最早随 Pascal P100 时代进入数据中心 GPU 系统，用专用高速链路替代或补充 PCIe GPU-to-GPU 通信",
        "链路语义面向 GPU load/store、peer memory access、CUDA UVA、NCCL collective 等软件栈，而不只是普通网卡报文",
        "点到点 NVLink 可构建 mesh、hybrid cube mesh 等拓扑，但多 GPU 同时通信时每个 peer 的可用带宽会受连接数量和拓扑限制",
        "NVSwitch 是 NVLink fabric 的交换芯片，把多条 NVLink 端口接入 crossbar/packet switch，实现服务器内或机架内 GPU 全互联",
        "NVIDIA 官方资料给出 Hopper/HGX H100/H200 级系统中每 GPU 第四代 NVLink 最高 900 GB/s，8 GPU 搭配 NVSwitch 时任意 GPU 间可同时按该级别通信",
        "后续 NVSwitch 加入 SHARP 类 in-network reduction/multicast 能力，减少 collective 操作在 GPU 端和链路上的重复数据移动",
        "对大模型训练和推理尤其关键：tensor parallel、pipeline parallel、expert parallel、KV cache/activation 交换都依赖高带宽低延迟 GPU fabric"
      ],
      "detail": "<h5>核心示意图</h5>\n<p><img alt=\"NVSwitch 与点到点互联带宽对比\" src=\"https://developer-blogs.nvidia.com/wp-content/uploads/2024/08/gpu-to-gpu-bandwidth-nvswitch-comparison-b.png\" />\n<em>图 1：NVIDIA Technical Blog 官方图，比较 8 GPU 点到点互联与通过 NVSwitch 形成全互联 fabric 的 GPU-to-GPU 带宽差异。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># NVLink/NVSwitch 上执行一次大张量 AllReduce 的抽象伪代码\ndef allreduce_tensor(tensor_shards, gpus, fabric):\n    if fabric.kind == &quot;nvswitch&quot;:\n        # 交换式 fabric：每个 GPU 把分片送入 NVSwitch，交换芯片按目标 GPU 或\n        # collective group 转发；支持 SHARP 的系统可在网络中做部分归约。\n        for phase in [&quot;reduce_scatter&quot;, &quot;all_gather&quot;]:\n            for gpu in gpus:\n                for chunk in tensor_shards[gpu].chunks:\n                    route = fabric.crossbar_route(src=gpu, dst=chunk.owner)\n                    if fabric.supports_sharp and phase == &quot;reduce_scatter&quot;:\n                        route.switch_reduce(op=&quot;sum&quot;, data=chunk)\n                    else:\n                        route.forward(data=chunk)\n            fabric.barrier()\n    else:\n        # 点到点 NVLink/PCIe 拓扑：通常由 NCCL 选择 ring/tree，\n        # 总带宽会受最慢边、hop 数和链路共享影响。\n        rings = build_topology_aware_rings(gpus, fabric.links)\n        for ring in rings:\n            ring_reduce_scatter(tensor_shards, ring)\n            ring_all_gather(tensor_shards, ring)\n</code></pre>\n<h5>方法机制解读</h5>\n<p>NVLink 的动机来自多 GPU 系统的通信密度。深度学习训练中的数据并行需要频繁 AllReduce 梯度，模型并行需要跨 GPU 传 activation、attention KV、专家路由或分片矩阵乘结果。若通信走 PCIe，GPU 计算吞吐增长后很容易出现“算得快、等数据”的情况。通信时间的下界可以粗略写成：</p>\n<div class=\"kb-math kb-math-display\">T_{\\text{comm}}\\ge \\frac{S}{B_{\\text{effective}}}+T_{\\text{latency}}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">S</span> 是传输字节数，<span class=\"kb-math kb-math-inline\">B_{\\text{effective}}</span> 是拓扑、链路共享、协议效率共同决定的有效带宽。NVLink 的第一目标就是显著提高 GPU-to-GPU 的 <span class=\"kb-math kb-math-inline\">B_{\\text{effective}}</span>，并降低主机 CPU/PCIe root complex 介入带来的路径开销。</p>\n<p>点到点 NVLink 已经比 PCIe 更适合 GPU peer access，但当 GPU 数量增加时，全互联点线连接会迅速变复杂。以每 GPU 总连接带宽 <span class=\"kb-math kb-math-inline\">B</span>、节点数 <span class=\"kb-math kb-math-inline\">N</span> 粗略估算，如果没有交换结构且要给 <span class=\"kb-math kb-math-inline\">N-1</span> 个 peer 分配专用连接，单 peer 带宽容易退化为：</p>\n<div class=\"kb-math kb-math-display\">B_{\\text{peer,p2p}}\\approx \\frac{B}{N-1}</div>\n<p>这也是 NVIDIA 官方博客在 8 GPU 示例中强调的问题：点到点设计下每个 peer 的带宽会被拆分，而 NVSwitch 设计可以让每个 GPU 与任意其他 GPU 以完整 NVLink 级带宽通信。NVSwitch 的价值不是“又多了一根线”，而是把链路组织成交换式 fabric，降低拓扑对通信模式的限制。</p>\n<p>从硬件看，NVSwitch 类似专为 NVLink 协议和 GPU 语义定制的高带宽交换芯片。GPU 的 NVLink 端口接入 switch，switch 内部 crossbar/路由逻辑把来自某个 GPU 的 flit 或 packet 转发到目标 GPU 端口。与普通以太网交换不同，NVSwitch 的设计目标是 scale-up：低延迟、短距离、高带宽、GPU 内存语义、NCCL collective 友好，而不是跨数据中心的长距离通用网络。</p>\n<p>对 collective 来说，NVSwitch 改变的是拥塞和 hop 结构。传统 ring AllReduce 的理想通信量约为：</p>\n<div class=\"kb-math kb-math-display\">T_{\\text{ring}}\\approx 2\\cdot\\frac{N-1}{N}\\cdot\\frac{S}{B_{\\text{link}}}</div>\n<p>但实际 <span class=\"kb-math kb-math-inline\">B_{\\text{link}}</span> 会被拓扑瓶颈、链路共享和并发流量拉低。NVSwitch 提供更均匀的 all-to-all 带宽后，NCCL 可以选择更高效的 ring/tree/channel 组合；在支持 SHARP 的后续 NVSwitch 中，部分 reduction 或 multicast 还能下沉到网络内部，减少 GPU 反复读写同一通信缓冲区。</p>\n<p>软件层面，NVLink/NVSwitch 的收益通过 CUDA peer access、Unified Virtual Addressing、NCCL、NVSHMEM、UCX 和深度学习框架体现。应用通常不直接操作 switch，而是声明张量分片、通信组或 collective；库根据拓扑发现结果选择路径。大模型中的 tensor parallel 矩阵乘常需要每层交换 partial result，MoE 的 expert parallel 会产生 all-to-all token dispatch，推理服务还会在 batch、KV cache 和 pipeline stage 之间移动大量状态；这些模式都比传统数据并行更依赖高质量 scale-up fabric。</p>\n<p>NVLink/NVSwitch 的演进也说明 GPU 系统瓶颈从单卡算力扩展到了机架内通信。官方资料中 Hopper 级第四代 NVLink 为每 GPU 900 GB/s，HGX H100/H200 使用 NVSwitch 形成 8 GPU 全互联；更新的 NVLink Switch 产品页继续把带宽和 GPU domain 扩展到 Blackwell、Rubin 级机架系统。虽然不同代际的链路数、带宽和 GPU 域规模不同，核心机制始终一致：用专用协议和交换结构把多 GPU 组织成一个高带宽、低延迟、通信模式更接近共享加速器的计算域。</p>\n<div class=\"key-point\">💡 关键：NVLink 解决“GPU 之间怎么高速直连”，NVSwitch 解决“很多 GPU 如何同时互相高速通信且不被点到点拓扑拖慢”。</div>",
      "quiz": {
        "q": "NVSwitch 相比纯点到点 NVLink 拓扑的主要优势是什么？",
        "options": [
          "通过交换式 fabric 提供更均匀的全互联带宽，减少多 GPU 同时通信时的链路拆分和拓扑瓶颈",
          "把 GPU 的矩阵乘单元替换成 CPU SIMD 单元",
          "让所有通信都必须绕过 CUDA 和 NCCL，由用户手写交换机路由表",
          "只提升单 GPU HBM 容量，不影响 GPU-to-GPU 通信"
        ],
        "answer": 0,
        "explain": "点到点拓扑在 GPU 数增加时容易出现 per-peer 带宽下降和路径受限；NVSwitch 用专用交换芯片把 NVLink 端口组织成更接近非阻塞的 all-to-all fabric。"
      }
    },
    {
      "id": "cxl",
      "num": 32,
      "name": "CXL",
      "fullName": "计算快速链接 (Compute Express Link)",
      "year": "2024",
      "org": "CXL Consortium",
      "parent": "—",
      "paperUrl": "https://dl.acm.org/doi/abs/10.1145/3669900",
      "projectUrl": "",
      "category": "interconnect",
      "motivation": "基于PCIe 5.0的缓存一致性开放互联标准",
      "summary": "CXL 提出了运行在 PCIe 物理层之上的开放一致性互联标准，用 CXL.io、CXL.cache 和 CXL.mem 三类协议把 CPU、加速器、SmartNIC、内存扩展器和持久化内存接入同一可缓存、可 load/store 的系统地址空间。它解决了传统 PCIe 设备需要 DMA 拷贝、软件维护一致性和内存资源孤岛化的问题，是数据中心内存扩展、内存池化和异构加速的重要基础。",
      "keyPoints": [
        "复用 PCIe 5.0 物理/电气层和链路训练生态，同时在其上动态复用 CXL.io、CXL.cache、CXL.mem",
        "CXL.io 提供设备发现、配置、寄存器访问、中断、DMA 和虚拟化等 PCIe 类语义",
        "CXL.cache 允许设备一致性地访问并缓存主机内存，适合 SmartNIC、PGAS NIC 和无本地主存的加速器",
        "CXL.mem 允许主机以 load/store 方式访问设备附加内存，适合内存扩展、内存层级和持久化内存",
        "三类设备模型：Type 1 使用 CXL.io + CXL.cache，Type 2 使用三种协议，Type 3 使用 CXL.io + CXL.mem",
        "CXL 2.0 引入交换、设备分区和内存池化，CXL 3.0/3.1 进一步扩展到 fabric、PBR 路由、共享内存和点到点访问",
        "CPU host 通常承担全局一致性管理，降低设备侧实现完整处理器一致性协议的复杂度"
      ],
      "detail": "<h5>核心示意图</h5>\n<p><img alt=\"CXL 动态复用协议与主机一致性逻辑\" src=\"https://static.wixstatic.com/media/0c1418_50aaa73344844a6780e3a5e238e20e03~mv2.png/v1/fill/w_740%2Ch_333%2Cal_c%2Cq_85%2Cusm_0.66_1.00_0.01%2Cenc_auto/0c1418_50aaa73344844a6780e3a5e238e20e03~mv2.png\" />\n<em>图：CXL Consortium 官方博客中的协议示意图。图中 CXL.io、Cache、Memory 在 PCIe/CXL 逻辑 PHY 上动态复用，主机侧的 coherence and memory logic 负责协调 CPU cache、host memory 与设备内存。</em></p>\n<h5>协议流程伪代码</h5>\n<pre><code class=\"language-python\"># CXL 设备枚举、HDM 映射与一致性访问的简化流程\ndef boot_cxl_system(root_ports):\n    for port in root_ports:\n        dev = cxl_io_enumerate(port)             # CXL.io: PCIe-like discovery/config\n        if dev.type in {&quot;type2&quot;, &quot;type3&quot;}:\n            hdm_range = program_hdm_decoder(dev) # Host-managed Device Memory\n            os_numa_add_memory(hdm_range, latency_class=&quot;cxl&quot;)\n        if dev.type in {&quot;type1&quot;, &quot;type2&quot;}:\n            enable_cxl_cache_coherence(dev)\n\n\ndef cpu_load(address):\n    if address in local_dram_range:\n        return host_memory_controller.read(address)\n\n    if address in cxl_hdm_decoder:\n        line = host_coherence_agent.lookup(address)\n        if line.is_dirty_in_cpu_cache():\n            line = writeback_or_forward(line)\n        # CXL.mem: 主机向设备内存发送 64B cache-line 粒度读请求\n        return cxl_mem_read(address, size=64)\n\n\ndef device_read_host_memory(device, address, mode):\n    req = &quot;RdShared&quot; if mode == &quot;read_only&quot; else &quot;RdOwn&quot;\n    send_cxl_cache_request(device, req, address)  # CXL.cache: 设备作为请求方\n    host_coherence_agent.snoop_cpu_caches(address)\n    go, data = host_return_go_and_data(address)\n    device.cache.fill(address, data, state=go.cache_state)\n</code></pre>\n<h5>方法机制解读</h5>\n<p>CXL 的核心动机来自两个同时出现的瓶颈：一方面，CPU 封装和主板走线限制了 DDR 通道数量，服务器核心数和模型规模继续增长时，本地 DRAM 容量/带宽难以线性扩展；另一方面，GPU、FPGA、SmartNIC 和存储设备各自带有本地内存，传统 PCIe 只能通过 DMA 或 MMIO 交换数据，数据在 host DRAM、device memory 和软件缓冲区之间反复拷贝。一旦 CPU cache 中还有旧副本，设备写入 host memory 还要依靠驱动、IOMMU、pin page、flush/invalidate 等软件路径维护一致性，延迟和复杂度都很高。</p>\n<p>CXL 的第一层设计是“借 PCIe 的物理生态，但替换关键语义”。CXL.io 基本保留 PCIe 的枚举、配置和 I/O 能力，保证设备能像 PCIe endpoint 一样被发现和管理；CXL.cache 和 CXL.mem 则走更低延迟的 cache-line 语义。可以把一次地址访问的路由抽象为：</p>\n<div class=\"kb-math kb-math-display\">\\operatorname{route}(a)=\n\\begin{cases}\n\\text{DDR/host memory controller}, &amp; a\\in A_{\\text{local}} \\\\\n\\text{CXL.mem endpoint}, &amp; a\\in A_{\\text{HDM}} \\\\\n\\text{CXL.cache request to host}, &amp; a\\in A_{\\text{host}}\\land requester=\\text{device}\n\\end{cases}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">A_{\\text{HDM}}</span> 是 host-managed device memory，由 HDM decoder 把 host physical address 的某些区间映射到 Type 2/Type 3 设备。对软件而言，这段空间可以被 NUMA、内存热插拔或 tiered memory 策略管理；对硬件而言，访问会被转换成 CXL.mem 事务并在设备内存控制器上完成。</p>\n<p>CXL.cache 解决的是设备访问 host memory 时的一致性问题。设备发起 <code>RdShared</code>、<code>RdOwn</code> 或写回类请求后，主机一致性代理负责 snoop CPU cache、处理脏行转移，并返回 <code>GO</code> 许可与数据。设备不需要实现完整 CPU-to-CPU coherence mesh，只需要遵守 CXL 定义的通道、credit 和状态转换。这种不对称一致性很关键：host 仍是 coherence home，设备得到受控的 cache 能力，因此 SmartNIC 可以直接读取主机队列，FPGA 可以直接消费主机缓冲区，避免传统 DMA 路径中的 staging copy。</p>\n<p>CXL.mem 则让主机把设备内存当成可寻址内存层级。一个 Type 3 内存扩展器没有设备 cache，只暴露 DDR、PMem 或其他介质；CPU 访问其地址时，host cache miss 会转成 CXL.mem read/write。访问成本可以粗略写成：</p>\n<div class=\"kb-math kb-math-display\">T_{\\text{CXL load}}\\approx T_{\\text{LLC miss}}+T_{\\text{serdes}}+T_{\\text{switch}}+T_{\\text{device controller}}+T_{\\text{media}}</div>\n<p>它通常高于本地 DRAM，但远低于 SSD/page fault 级路径；同时 CXL x8/x16 链路能提供接近内存通道量级的带宽。系统软件的关键任务因此不是“所有页面都放 CXL”，而是根据热度、带宽和容量需求把冷页、大模型权重、内存池或共享缓冲放到合适的 CXL tier。</p>\n<p>三类设备模型把协议组合和系统职责固定下来。Type 1 只有 CXL.cache，典型是无 host-visible 本地内存的 SmartNIC；Type 2 同时有 cache 和 memory，典型是带 HBM/DDR 的 GPU、FPGA 或专用加速器，主机可通过 CXL.mem 放置输入，设备可通过 CXL.cache 访问 host 缓冲；Type 3 只暴露内存，是内存扩展和池化的主力。CXL 2.0 的 switch、logical device 和 pooling 让多个 host 可以分区使用一组内存设备；CXL 3.0/3.1 的 fabric 和 PBR 则进一步把单机扩展推向 rack/pod 级共享内存。</p>\n<div class=\"key-point\">💡 关键：CXL 不是“更快的 PCIe DMA”，而是把外设内存和外设 cache 纳入主机一致性与地址管理体系，使数据移动从显式拷贝变成 cache-line 粒度的 load/store 与 coherence 事务。</div>",
      "quiz": {
        "q": "CXL.cache 和 CXL.mem 的核心区别是什么？",
        "options": [
          "CXL.cache 让设备一致性访问并缓存主机内存，CXL.mem 让主机访问设备附加内存",
          "CXL.cache 只负责设备枚举，CXL.mem 只负责中断投递",
          "CXL.cache 替代 PCIe 物理层，CXL.mem 替代 DDR 颗粒协议",
          "CXL.cache 只能用于 Type 3 内存扩展器，CXL.mem 只能用于 SmartNIC"
        ],
        "answer": 0,
        "explain": "CXL.cache 的请求方通常是设备，用于访问 host memory；CXL.mem 的请求方通常是 host，用于访问 host-managed device memory。"
      }
    },
    {
      "id": "tvm",
      "num": 33,
      "name": "TVM",
      "fullName": "张量虚拟机 (Tensor Virtual Machine)",
      "year": "2018",
      "org": "UW/AWS",
      "parent": "—",
      "paperUrl": "https://www.usenix.org/conference/osdi18/presentation/chen",
      "projectUrl": "",
      "category": "hw_sw_codesign",
      "motivation": "自动调优编译器高效部署模型到多种硬件",
      "summary": "TVM 提出了端到端深度学习优化编译栈，把计算图优化、张量表达式、硬件感知 schedule 原语和机器学习代价模型组合起来，解决模型部署到 CPU、GPU、移动端和定制加速器时需要反复手写高性能算子的难题。它将“如何生成最快 kernel”形式化为搜索问题，使同一模型能够针对不同硬件自动生成优化代码。",
      "keyPoints": [
        "支持从 TensorFlow、MXNet、Keras、PyTorch、ONNX/CoreML 等前端导入模型计算图",
        "图级 pass 覆盖算子融合、常量折叠、静态内存规划和数据布局重写",
        "Tensor Expression 用声明式索引公式描述计算语义，将“算什么”和“如何执行”解耦",
        "Schedule primitive 表达 tiling、reorder、vectorize、unroll、thread binding、cache read/write、tensorization 等硬件映射选择",
        "AutoTVM 使用机器学习代价模型与模拟退火搜索 schedule 空间，减少真实硬件测量次数",
        "RPC 设备池支持在目标硬件上编译、上传、运行和 profiling，闭环更新代价模型",
        "论文在 server GPU、embedded GPU、embedded CPU 和 FPGA-style accelerator 上展示性能可移植性"
      ],
      "detail": "<h5>核心示意图</h5>\n<p><img alt=\"TVM 端到端编译栈\" src=\"https://ar5iv.labs.arxiv.org/html/1802.04799/assets/x2.png\" />\n<em>图：TVM OSDI 2018 论文 Figure 2 的 ar5iv 镜像。模型先进入 computational graph，经 high-level graph rewriting，再进入 operator-level optimization/code generation，最后生成 LLVM IR、CUDA/OpenCL 或 accelerator backend 可部署模块。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># TVM 的图优化 + 自动调优编译流程\ndef tvm_compile(model, target, rpc_pool):\n    graph = import_from_frontend(model)\n    graph = infer_shape_and_type(graph)\n    graph = graph_rewrite(graph, passes=[\n        &quot;operator_fusion&quot;,\n        &quot;constant_folding&quot;,\n        &quot;layout_transform&quot;,\n        &quot;static_memory_planning&quot;,\n    ])\n\n    lowered_ops = {}\n    for fused_op in graph.fused_operators():\n        te = lower_to_tensor_expression(fused_op)\n        schedule_space = instantiate_schedule_template(te, target)\n        best_schedule = autotune(te, schedule_space, rpc_pool)\n        lowered_ops[fused_op] = codegen(te, best_schedule, target)\n\n    return link_runtime_module(graph, lowered_ops, target)\n\n\ndef autotune(te, schedule_space, rpc_pool):\n    measurements = []\n    cost_model = MLBasedCostModel()\n    states = random_initial_schedules(schedule_space)\n\n    for round_id in range(NUM_ROUNDS):\n        candidates = simulated_annealing(\n            states,\n            mutate=lambda s: tile_bind_cache_tensorize(s),\n            score=lambda s: cost_model.predict(lower_to_loop_ast(te, s)),\n        )\n        batch = select_top_diverse(candidates)\n        measurements += rpc_pool.measure(batch)  # 在真实设备上运行计时\n        cost_model.fit(measurements)\n\n    return min(measurements, key=lambda m: m.latency).schedule\n</code></pre>\n<h5>方法机制解读</h5>\n<p>TVM 的出发点是深度学习部署的“长尾硬件 + 长尾算子”问题。传统框架依赖 cuDNN、MKL、NNPACK 等厂商或社区手写库，一旦模型包含新算子、融合模式、低精度布局或新硬件后端，就需要重新写 kernel。TVM 选择把算子优化拆成两个层次：图层决定哪些节点应融合、布局如何传播、哪些中间张量可以省掉；算子层把融合后的计算表达为 Tensor Expression，再通过 schedule 搜索映射到具体硬件。</p>\n<p>Tensor Expression 描述的是数学计算，而不是循环实现。例如矩阵乘法可以写成：</p>\n<div class=\"kb-math kb-math-display\">C_{i,j}=\\sum_{k=0}^{K-1} A_{i,k}\\cdot B_{k,j}</div>\n<p>这个公式本身不规定 <span class=\"kb-math kb-math-inline\">i,j,k</span> 的循环顺序、tile 大小、GPU thread/block 绑定、shared memory 缓存或向量化方式。Schedule 才决定实现策略：可以把 <span class=\"kb-math kb-math-inline\">i,j</span> 切成 block tile，把 <span class=\"kb-math kb-math-inline\">k</span> 切成 reduction tile，把输入搬到 shared/local memory，把内层乘加 tensorize 到硬件矩阵指令。这样同一段 TE 可以生成 CPU 上的多线程 SIMD loop，也可以生成 CUDA/OpenCL kernel 或定制加速器指令流。</p>\n<p>图级优化的价值在于制造更好的算子边界。若 <code>conv2d -&gt; bias -&gt; relu -&gt; layout_transform</code> 分别执行，每个节点都要读写中间张量；融合后只需在寄存器或片上缓存中传递中间值。一个简化的内存流量收益可写成：</p>\n<div class=\"kb-math kb-math-display\">\\Delta \\text{bytes}\\approx\\sum_{t\\in \\text{fused intermediates}}2\\cdot \\operatorname{size}(t)</div>\n<p>这里的 2 分别对应 producer 写中间结果和 consumer 读中间结果。TVM 还会根据目标后端选择 NCHW、NHWC、blocked layout 等布局，并尽量让相邻算子使用同一内部布局，避免重复转换。</p>\n<p>自动调优是 TVM 最重要的机制。给定表达式 <span class=\"kb-math kb-math-inline\">e</span>、schedule 空间 <span class=\"kb-math kb-math-inline\">\\mathcal{S}_e</span>、代码生成器 <span class=\"kb-math kb-math-inline\">g(e,s)</span> 和真实硬件代价函数 <span class=\"kb-math kb-math-inline\">f</span>，目标是：</p>\n<div class=\"kb-math kb-math-display\">s^*=\\arg\\min_{s\\in\\mathcal{S}_e} f(g(e,s))</div>\n<p>难点在于 <span class=\"kb-math kb-math-inline\">\\mathcal{S}_e</span> 可以非常大：tile 因子、循环重排、unroll、vectorize、thread binding、cache scope、tensorization 组合后达到百万甚至十亿级候选。TVM 不做穷举，而是从 lowered loop AST 抽取结构特征，用 XGBoost/TreeRNN 类模型预测候选 schedule 的性能，再用模拟退火生成高分候选，最后只把少量候选发送到真实硬件测量。真实测量再反过来训练代价模型，形成“预测-采样-测量-更新”的闭环。</p>\n<p>与只做图优化的 XLA/Glow 相比，TVM 更强调算子级 schedule 搜索；与只依赖厂商库的部署栈相比，TVM 能覆盖库中不存在的新融合算子和新硬件。代价是它需要高质量 schedule template、测量预算和可靠 profiling 环境；如果没有调优，生成代码未必超过手写库。论文的长期影响在于把深度学习编译从“维护一堆特定算子实现”推进到“声明计算 + 搜索硬件映射”的范式，后续 Ansor、MetaSchedule、Relax 等系统都沿着这一方向演进。</p>\n<div class=\"key-point\">💡 关键：TVM 的核心不是某一个固定优化，而是把图优化、张量 IR、硬件 schedule 和实机测量连成可自动搜索的编译闭环。</div>",
      "quiz": {
        "q": "TVM 将算子实现拆分为 Tensor Expression 和 Schedule 的主要目的是什么？",
        "options": [
          "让计算语义与硬件执行策略解耦，从而为不同目标自动搜索优化实现",
          "强制所有深度学习模型只能在解释器中逐算子运行",
          "取消图级优化，只保留前端模型格式转换",
          "把所有卷积都替换为固定的 cuDNN 调用"
        ],
        "answer": 0,
        "explain": "Tensor Expression 描述数学计算，Schedule 决定循环、缓存、线程和硬件 intrinsic 映射；二者分离后才能在不同硬件上搜索高性能实现。"
      }
    },
    {
      "id": "mlir",
      "num": 34,
      "name": "MLIR",
      "fullName": "多层级中间表示 (Multi-Level Intermediate Representation)",
      "year": "2021",
      "org": "Google",
      "parent": "tvm",
      "paperUrl": "—",
      "projectUrl": "",
      "category": "hw_sw_codesign",
      "motivation": "统一多层级IR框架成为现代AI编译器基础",
      "summary": "MLIR 提出了可扩展的多层级 SSA 中间表示基础设施，用 Dialect、Operation、Region、Block、Type 和 Attribute 统一表达从高层图计算到低层 LLVM/SPIR-V 的不同抽象层。它解决了 AI 编译器和异构硬件编译栈中 IR 碎片化、pass 难复用和过早降级丢失语义的问题。",
      "keyPoints": [
        "以极小核心 IR + 可扩展 Dialect 机制组织领域专用操作、类型和属性",
        "Operation 是唯一通用语义单元，函数、模块、循环、张量算子和低层指令都可建模为 Op",
        "Region/Block 支持嵌套作用域、结构化控制流和函数式 SSA block argument，避免传统 PHI 节点复杂性",
        "Dialect 可在同一 module 中混合存在，支持 progressive lowering 和分阶段优化",
        "ODS 用 TableGen 声明 Op 结构、约束、trait、verifier 和文档，降低新 IR 建设成本",
        "DRR/Pattern Rewriter 用声明式或 C++ pattern 描述等价重写、规范化和 Dialect Conversion",
        "Linalg、Affine、SCF、Vector、MemRef、LLVM、SPIR-V 等方言构成面向 AI/异构硬件的降级路径",
        "统一复用 parser/printer、验证器、Pass Manager、诊断、源位置追踪和文本 IR 测试基础设施"
      ],
      "detail": "<h5>核心示意图</h5>\n<p><img alt=\"MLIR Linalg 分层代码生成流程\" src=\"https://user-images.githubusercontent.com/10148468/73613629-c5586580-45c5-11ea-94b7-074aeea94c7b.png\" />\n<em>图：MLIR 官方 Linalg 文档引用的 Codegen Flow。它展示 OpGraph、TSOWB、CGSel、HHO/Linalg、Affine/Stripe、Vector 和 LLVM 等层级如何逐步降低。</em></p>\n<h5>降级流程伪代码</h5>\n<pre><code class=\"language-python\"># MLIR progressive lowering 的简化编译流程\ndef compile_with_mlir(module, target):\n    module = import_frontend_as_dialects(module)  # tf / torch / mhlo / tosa / custom dialect\n    verify(module)\n\n    pipeline = [\n        &quot;canonicalize&quot;,\n        &quot;shape-inference&quot;,\n        &quot;convert-tensor-to-linalg&quot;,\n        &quot;tile-and-fuse-linalg&quot;,\n        &quot;bufferize&quot;,\n        &quot;lower-linalg-to-scf-or-affine&quot;,\n        &quot;vectorize&quot;,\n        &quot;convert-vector-to-llvm-or-spirv&quot;,\n        &quot;finalize-target-abi&quot;,\n    ]\n\n    for pass_name in pipeline:\n        module = run_pass(module, pass_name)\n        # 高层和低层 dialect 可以共存；每一轮只降低已合法匹配的部分。\n        verify(module)\n\n    assert target.is_legal(module)\n    return emit_binary_or_target_ir(module, target)\n</code></pre>\n<h5>方法机制解读</h5>\n<p>LLVM IR 已经很好地服务了传统语言后端，但它的抽象层级偏低，难以保留张量形状、layout、结构化循环、数据流图、异步执行、量化属性和硬件特定 tile 语义。AI 编译器如果过早降到 LLVM IR，就必须从低层指令和 pointer arithmetic 里重新恢复高层信息；如果每个项目都自定义图 IR，又会重复实现 parser、verifier、pass pipeline、诊断、测试和降级基础设施。MLIR 的判断是：真正需要统一的不是某一个固定 IR，而是“定义 IR、混合 IR、验证 IR、逐步降级 IR”的基础设施。</p>\n<p>MLIR 的核心对象可以抽象为：</p>\n<div class=\"kb-math kb-math-display\">\\operatorname{Op}=(name,\\ operands,\\ results,\\ attributes,\\ regions,\\ location)</div>\n<p><code>name</code> 通常带 Dialect 前缀，例如 <code>linalg.matmul</code>、<code>affine.for</code>、<code>vector.transfer_read</code>、<code>llvm.call</code>。Operands/results 是 SSA value，attributes 保存编译期常量元信息，regions 嵌套 block 列表，location 记录源位置或变换轨迹。函数、模块、循环和指令都只是不同 trait/interface 约束下的 Operation，因此 Pass Manager 可以在任意 Op 层级运行，而不是被固定在 module/function/loop 三个传统粒度上。</p>\n<p>Dialect 是 MLIR 的扩展单元。TensorFlow、TOSA、MHLO 可以保留框架语义；Linalg 表达结构化张量计算；Affine/SCF 表达循环与控制流；Vector 表达向量抽象；LLVM/SPIR-V/NVGPU 等方言接近目标后端。关键是这些方言可以在一个 module 中同时出现，例如一个函数里部分 op 已降到 <code>scf.for</code> 和 <code>vector.contract</code>，另一部分仍保持 <code>linalg.generic</code>。这使合法 IR 集合随 pass 逐步扩张：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{t+1}=\\mathcal{L}_t\\cup \\operatorname{Convert}(D_{\\text{high}}\\rightarrow D_{\\text{low}})</div>\n<p>只要当前 IR 满足 verifier，就不要求一次性从高层图 IR 降到低层指令。高层语义会在仍有优化价值时保留，只有当后续 pass 不再需要时才被物化为循环、buffer、vector 或目标 ABI。</p>\n<p>Region 和 block argument 是 MLIR 保留结构的另一项关键机制。传统 LLVM PHI 节点会把控制流合流值放在基本块开头，带来 dominance、异常边和多前驱块维护复杂度；MLIR 用 block argument 表示从前驱传入的 SSA 值。<code>scf.for</code> 的 induction variable、函数参数、region 内部闭包式捕获都可以以统一方式表达。配合 <code>isolated-from-above</code> trait，某些 op 能形成并行可处理的作用域边界，方便大模型图和多函数 module 的并行编译。</p>\n<p>工程层面，ODS 和 DRR 让“新增一个 IR 层”从手写大量 C++ 降低为声明式定义。ODS 描述操作数、结果、属性、类型约束和 trait，自动生成 parser/printer、builder、verifier 框架和文档；DRR/PatternRewriter 描述 <code>source op DAG -&gt; target op DAG</code> 的等价重写。这样，通用 pass 可以通过 trait/interface 查询性质，例如是否无副作用、是否有内存读写、是否支持 tiling 或 bufferization，而不需要认识每个具体 op 名称。</p>\n<p>与 TVM 的 Tensor Expression/Schedule 思路相比，MLIR 更像承载多套编译器的“元基础设施”：TVM 重点解决张量算子如何自动调度到硬件，MLIR 重点解决不同抽象层的 IR 如何共存、转换和复用 pass。现代 AI 编译器常把二者思想结合起来：上层保留图和张量语义，中层做 Linalg/Transform/Affine/Vector 变换，底层再降到 LLVM、SPIR-V、ROCDL、NVVM 或专用加速器指令。</p>\n<div class=\"key-point\">💡 关键：MLIR 的贡献不是又定义了一种单一中间语言，而是把多层 IR 的创建、混合、验证、重写和降级变成可复用的编译器工程平台。</div>",
      "quiz": {
        "q": "MLIR 的 Dialect 机制最主要解决什么问题？",
        "options": [
          "让不同抽象层和领域的 Op/Type/Attribute 能在统一基础设施中定义、混合并逐步降级",
          "把所有程序强制转换成一种固定低层指令格式后再优化",
          "替代所有硬件后端的寄存器分配和指令选择",
          "只为 TensorFlow Graph 提供不可扩展的专用文本格式"
        ],
        "answer": 0,
        "explain": "Dialect 是 MLIR 的扩展与命名空间机制，允许高层图 IR、中层结构化计算 IR 和低层目标 IR 共存，并通过 Dialect Conversion 渐进降级。"
      }
    },
    {
      "id": "mnasnet",
      "num": 35,
      "name": "MnasNet",
      "fullName": "移动端硬件感知NAS (Mobile Neural Architecture Search)",
      "year": "2019",
      "org": "Google",
      "parent": "—",
      "paperUrl": "http://openaccess.thecvf.com/content_CVPR_2019/html/Tan_MnasNet_Platform-Aware_Neural_Architecture_Search_for_Mobile_CVPR_2019_paper.html",
      "projectUrl": "",
      "category": "hw_sw_codesign",
      "motivation": "将硬件延迟纳入NAS搜索目标",
      "summary": "MnasNet 提出了面向移动端 CNN 的平台感知 NAS，把真实手机推理延迟直接放入搜索奖励，解决用 FLOPs 代理延迟容易选出硬件不友好结构的问题。它同时设计了 factorized hierarchical search space，让不同分辨率和通道阶段可以搜索不同层结构，在有限搜索成本下获得更好的精度-延迟 Pareto 前沿。",
      "keyPoints": [
        "使用多目标奖励同时优化验证精度与目标移动平台延迟，而不是只优化精度或 FLOPs",
        "通过在 Pixel 1 手机大核上实际执行候选模型来测量 batch size 1 推理延迟",
        "采用 RNN controller 采样架构 token，训练候选模型、测量延迟后用 PPO 更新 controller",
        "提出 factorized hierarchical search space：按分辨率和通道数划分 block，每个 block 单独搜索层结构和重复次数",
        "搜索选项包括卷积类型、3x3/5x5 kernel、SE ratio、skip op、输出通道倍率和每个 block 的层数",
        "相比单一 cell 反复堆叠的 NASNet 类方法，允许不同网络阶段有不同操作，提升层级多样性和硬件效率",
        "ImageNet 上 MnasNet-A1 达到 75.2% top-1、78ms Pixel 延迟，并迁移到 COCO SSDLite 检测任务"
      ],
      "detail": "<h5>核心示意图</h5>\n<p><img alt=\"MnasNet 平台感知搜索流程\" src=\"https://ar5iv.labs.arxiv.org/html/1807.11626/assets/x1.png\" />\n<em>图：MnasNet 论文 Figure 1 的 ar5iv 公开镜像，展示 RNN controller、候选模型训练、手机延迟测量和奖励更新构成的闭环。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># MnasNet: latency-aware mobile NAS\ncontroller = RNNController(search_space=factorized_blocks)\n\nfor step in range(max_search_steps):\n    batch = []\n    for _ in range(num_architectures):\n        arch_tokens = controller.sample_tokens()\n        model = build_mobile_cnn(arch_tokens)\n\n        acc = train_proxy_and_eval(model, dataset=&quot;ImageNet&quot;, epochs=5)\n        lat = measure_latency_on_pixel(model, batch_size=1, core=&quot;big_cpu&quot;)\n        reward = acc * (lat / target_latency) ** weight(lat, target_latency)\n        batch.append((arch_tokens, reward))\n\n    controller.update_with_ppo(batch)\n\npareto_models = select_top_models(controller.history, metric=(&quot;accuracy&quot;, &quot;latency&quot;))\nfull_train(pareto_models, dataset=&quot;ImageNet&quot;)\ntransfer_to_ssdlite(pareto_models, dataset=&quot;COCO&quot;)\n</code></pre>\n<h5>方法机制解读</h5>\n<p>MnasNet 的核心判断是：移动端部署瓶颈不能只用 FLOPs 描述。两个模型即使乘加数相近，也可能因为 depthwise conv、branch、memory layout、kernel implementation 和运行时调度差异，在手机 CPU 上出现明显不同的延迟。论文因此把架构搜索目标从单纯最大化 <span class=\"kb-math kb-math-inline\">ACC(m)</span> 改成在目标设备上直接测得 <span class=\"kb-math kb-math-inline\">LAT(m)</span> 后做多目标优化。硬约束形式可以写成：</p>\n<div class=\"kb-math kb-math-display\">\\max_m ACC(m) \\quad \\text{s.t.}\\quad LAT(m) \\le T</div>\n<p>但硬约束只能得到一个区域内的高精度模型，不方便一次搜索得到多个 Pareto 解。MnasNet 使用加权乘积奖励：</p>\n<div class=\"kb-math kb-math-display\">R(m)=ACC(m)\\left(\\frac{LAT(m)}{T}\\right)^w,\\quad\nw=\\begin{cases}\n\\alpha, &amp; LAT(m)\\le T \\\\\n\\beta, &amp; LAT(m)&gt;T\n\\end{cases}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">T</span> 是目标延迟。若取 <span class=\"kb-math kb-math-inline\">\\alpha=0,\\beta=-1</span>，延迟低于目标时奖励近似只看精度，超过目标后被强烈惩罚；若取 <span class=\"kb-math kb-math-inline\">\\alpha=\\beta=-0.07</span>，延迟作为软约束平滑影响奖励，controller 会探索更宽的延迟范围，从一次搜索中产出 A1/A2/A3 这类不同精度-延迟折中模型。</p>\n<p>搜索空间是另一个关键贡献。早期 NAS 常搜索一个 cell，然后把同一个 cell 在整网中重复堆叠；这降低搜索难度，却忽略了移动 CNN 中不同阶段的硬件代价差异。MnasNet 先把网络分成若干 block，每个 block 处理相近的输入分辨率和通道规模，再在 block 内搜索单层结构与重复次数。典型候选包括 regular conv、depthwise conv、MobileNetV2 inverted bottleneck、3x3/5x5 kernel、是否使用 SE、skip op、通道倍率和层数偏移。</p>\n<p>这个 factorization 保留了层级多样性，同时把搜索空间控制在可训练范围。若每个 block 的子空间大小为 <span class=\"kb-math kb-math-inline\">S</span>，block 数为 <span class=\"kb-math kb-math-inline\">B</span>，每个 block 平均重复 <span class=\"kb-math kb-math-inline\">N</span> 层，则分层搜索约为：</p>\n<div class=\"kb-math kb-math-display\">|\\mathcal{A}_{factorized}|=S^B,\\quad\n|\\mathcal{A}_{per-layer}|=S^{B\\cdot N}</div>\n<p>论文给出的典型配置 <span class=\"kb-math kb-math-inline\">S=432,B=5,N=3</span> 时，分层空间约 <span class=\"kb-math kb-math-inline\">10^{13}</span>，而逐层独立搜索会膨胀到约 <span class=\"kb-math kb-math-inline\">10^{39}</span>。这解释了为什么它能让不同 stage 使用 3x3/5x5、不同 expansion ratio 和不同重复次数，却仍可用 RL controller 搜索。</p>\n<p>训练流程上，controller 只需输出 token 序列即可描述一个候选网络；候选网络先在 ImageNet 上短训得到 proxy accuracy，再在 Pixel 手机上实际计时，最终用奖励 <span class=\"kb-math kb-math-inline\">R(m)</span> 做 PPO 更新。MnasNet 没有把延迟预测模型作为核心假设，而是把真实测量放进 loop，因此搜索出来的结构更贴近目标硬件和 runtime。代价是搜索成本高：论文直接在 ImageNet 上搜索，每次架构短训并测量，约采样 8K 个模型，再只把少数高分模型完整训练和迁移。</p>\n<p>与 MobileNetV2 这类人工设计模型相比，MnasNet 的优势不只是“更宽或更深”，而是能在早期高分辨率层倾向选择更省延迟的结构，在后期低分辨率层保留更强表达能力；与 NASNet 类 cell-based NAS 相比，它把移动端真实延迟和每阶段结构差异都纳入搜索。最终 A1 在 78ms Pixel 延迟下达到 75.2% top-1，说明硬件感知目标和搜索空间设计必须同时成立：只加延迟奖励会牺牲精度，只换搜索空间又可能选出不适合设备的模型。</p>\n<div class=\"key-point\">💡 关键：MnasNet 是“算法-硬件-运行时”共同闭环的 NAS。它优化的不是抽象计算量，而是在指定移动平台上能真实跑得快且准确的 CNN。</div>",
      "quiz": {
        "q": "MnasNet 为什么要直接测量手机端推理延迟，而不是只用 FLOPs 作为搜索目标？",
        "options": [
          "因为 FLOPs 无法反映移动硬件、算子实现和访存带来的真实延迟差异",
          "因为 FLOPs 只能用于循环神经网络，不能用于卷积网络",
          "因为真实延迟测量可以完全避免训练候选模型",
          "因为 PPO 只能优化以毫秒为单位的目标"
        ],
        "answer": 0,
        "explain": "MnasNet 的动机是 FLOPs 与真实移动端延迟相关性不足；直接在 Pixel 手机上测量延迟能让搜索奖励贴近部署表现。"
      }
    },
    {
      "id": "hw_nas_bench",
      "num": 36,
      "name": "HW-NAS-Bench",
      "fullName": "硬件感知NAS基准 (Hardware-Aware NAS Benchmark)",
      "year": "2021",
      "org": "—",
      "parent": "mnasnet",
      "paperUrl": "—",
      "projectUrl": "",
      "category": "hw_sw_codesign",
      "motivation": "首个硬件感知NAS基准推动标准化评测",
      "summary": "HW-NAS-Bench 构建了面向硬件感知 NAS 的公开可查询基准，把 NAS-Bench-201 和 FBNet 搜索空间中的架构映射到多种边缘设备、FPGA 与 ASIC 的延迟/能耗指标。它解决了 HW-NAS 研究需要重复搭建设备编译、测量和估计 pipeline，导致门槛高、评测不可复现的问题。",
      "keyPoints": [
        "覆盖两个代表性搜索空间：NAS-Bench-201 cell-based search space 和 FBNet layer-wise search space",
        "提供六类目标设备的硬件成本：Edge GPU、Raspberry Pi 4、Edge TPU、Pixel 3、ASIC-Eyeriss、FPGA",
        "指标包含真实测量或工具估计的 latency，并在 Edge GPU、ASIC-Eyeriss、FPGA 上包含 energy",
        "将设备编译流程纳入基准：TensorRT、TFLite、Edge TPU compiler、Accelergy+Timeloop、DNN-Chip Predictor、Vivado HLS",
        "提供 API，NAS 算法可按 architecture index 和 dataset 直接查询硬件指标，避免每次重新部署测量",
        "分析 FLOPs/#Params 与真实硬件成本、不同设备成本之间的 Kendall rank correlation，展示设备特异性",
        "用 ProxylessNAS 示例说明，面向某个设备搜索得到的最优架构迁移到其他设备时可能不是最优"
      ],
      "detail": "<h5>核心示意图</h5>\n<p><img alt=\"HW-NAS-Bench 框架示意\" src=\"https://ar5iv.labs.arxiv.org/html/2103.10584/assets/x1.png\" />\n<em>图：HW-NAS-Bench 论文 Figure 1 的 ar5iv 公开镜像，展示从 NAS 搜索空间到多设备硬件指标数据集，再到 HW-NAS 算法查询评测的基准闭环。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># HW-NAS-Bench: build once, query many times\ndatabase = {}\n\nfor space in [&quot;NAS-Bench-201&quot;, &quot;FBNet&quot;]:\n    for arch in enumerate_architectures(space):\n        for device in [&quot;edge_gpu&quot;, &quot;raspi4&quot;, &quot;edge_tpu&quot;, &quot;pixel3&quot;, &quot;eyeriss&quot;, &quot;fpga&quot;]:\n            deployable = compile_for_device(arch, device)\n\n            if device in [&quot;edge_gpu&quot;, &quot;raspi4&quot;, &quot;edge_tpu&quot;, &quot;pixel3&quot;]:\n                metrics = measure_on_real_device(deployable, repeats=50)\n            else:\n                metrics = estimate_with_hardware_toolflow(deployable, device)\n\n            database[(space, arch.index, device)] = metrics\n\ndef query_by_index(space, arch_idx, dataset):\n    acc = lookup_accuracy_if_available(space, arch_idx, dataset)\n    hw = {device: database[(space, arch_idx, device)] for device in all_devices}\n    return {&quot;accuracy&quot;: acc, &quot;hardware&quot;: hw}\n\ndef hw_nas_objective(arch_idx, target_device, budget):\n    record = query_by_index(&quot;NAS-Bench-201&quot;, arch_idx, dataset=&quot;cifar100&quot;)\n    return pareto_score(record[&quot;accuracy&quot;], record[&quot;hardware&quot;][target_device], budget)\n</code></pre>\n<h5>方法机制解读</h5>\n<p>HW-NAS-Bench 的直接背景是 MnasNet/ProxylessNAS 之后的硬件感知搜索变得有效，但每个研究组都要为目标设备自己搭 latency lookup table 或预测器。这个过程并不只是“跑一次模型”：需要把 PyTorch/TensorFlow 模型导出到设备支持的格式，调用对应 compiler/runtime，配置功耗或计时工具，再处理重复运行、warmup、batch size、CPU 核心绑定和模拟器参数。论文把这些硬件工程步骤前置成公共数据集，让 NAS 算法开发者用 API 查询。</p>\n<p>基准的数据模型可以抽象成一个三元映射：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{H}: (a, d, x)\\mapsto \\{LAT(a,d,x), ENERGY(a,d,x)\\}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">a</span> 是架构，<span class=\"kb-math kb-math-inline\">d</span> 是设备，<span class=\"kb-math kb-math-inline\">x</span> 是数据集或输入配置。NAS-Bench-201 提供 4 节点、6 条边、5 个候选操作的 cell 空间，共 <span class=\"kb-math kb-math-inline\">5^6=15{,}625</span> 个架构，并已有 CIFAR-10、CIFAR-100、ImageNet16-120 精度日志；HW-NAS-Bench 在此基础上补齐多设备硬件成本。FBNet 空间则有 22 个可搜索位置、9 个预定义 cell 候选，结构更接近硬件友好的移动网络；对这类巨大 layer-wise 空间，基准通过测量/估计块级成本并组合为架构成本，使查询成本远低于重新部署。</p>\n<p>六类设备体现了“同一网络在不同硬件上排序会变”的事实。Edge GPU 使用 Jetson TX2 和 TensorRT；Raspberry Pi 4、Pixel 3 走 TFLite；Edge TPU 还需要 Edge TPU compiler；ASIC-Eyeriss 通过 Accelergy+Timeloop 与 DNN-Chip Predictor 估计；FPGA 通过 Vivado HLS 面向 Xilinx ZC706/Zynq 平台获得成本。这里的关键不是所有指标都来自同一种测量方式，而是每种设备都采用其合理部署链路，因此比 FLOPs/#Params 更接近真实 HW-NAS 目标。</p>\n<p>论文用 Kendall rank correlation 说明理论指标和硬件指标可能不一致。对两个架构 <span class=\"kb-math kb-math-inline\">a_i,a_j</span>，若 FLOPs 排序和设备延迟排序方向相同则为 concordant，否则为 discordant；整体相关性可写成：</p>\n<div class=\"kb-math kb-math-display\">\\tau=\\frac{N_{concordant}-N_{discordant}}{\\binom{n}{2}}</div>\n<p>当 <span class=\"kb-math kb-math-inline\">\\tau</span> 低时，用 FLOPs 替代 latency 会把搜索引向错误架构。论文进一步比较不同设备之间的硬件成本相关性，发现同一批架构在 Edge GPU、Edge TPU、Eyeriss、FPGA 上的排序可能差异很大。这意味着“在设备 A 上快”的网络不一定在设备 B 上快，硬件感知 NAS 不能只拿一个通用 proxy 代表所有部署环境。</p>\n<p>从使用方式看，HW-NAS-Bench 把昂贵的硬件评价从搜索内循环中移出。一个 NAS 算法可以在评估候选架构时直接调用：</p>\n<div class=\"kb-math kb-math-display\">\\max_a ACC(a) - \\lambda\\log(LAT(a,d))\n\\quad\\text{或}\\quad\n\\max_a ACC(a)\\ \\text{s.t.}\\ LAT(a,d)\\le B</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">d</span> 可以切换为 Edge GPU、Raspi 4、FPGA 等目标设备。这样同一个搜索算法可以在统一数据集、统一硬件成本表和统一预算下与其他算法比较。论文的 ProxylessNAS 示例也显示，针对 Edge GPU、Raspi 4、FPGA 分别搜索会得到不同最优架构；把针对一个设备的架构拿到另一个设备上运行，常常失去延迟优势。</p>\n<p>HW-NAS-Bench 的局限也来自基准化本身：它固定搜索空间、设备和输入设置，因此不能覆盖任意新算子、新 runtime 或新芯片；部分大空间成本使用块级加和或模拟估计，也不等价于所有端到端真实测量。但它的价值在于把 HW-NAS 的公共比较基础先建立起来，让研究者可以在算法层面讨论搜索策略、约束处理和设备特异性，而不是反复重建硬件测量基础设施。</p>\n<div class=\"key-point\">💡 关键：HW-NAS-Bench 把“硬件成本评价”从每个 NAS 论文的私有工程流程变成可查询公共基准，使硬件感知搜索可以被复现、比较和系统分析。</div>",
      "quiz": {
        "q": "HW-NAS-Bench 相比只报告 FLOPs/#Params 的 NAS 基准，最核心的改进是什么？",
        "options": [
          "提供多种真实或估计硬件平台上的延迟/能耗指标，并允许 NAS 算法直接查询",
          "取消所有搜索空间，只保留一个人工设计网络",
          "只测量服务器 GPU 的吞吐量，不考虑边缘设备",
          "要求每个候选架构在搜索时都重新从零搭建硬件测量环境"
        ],
        "answer": 0,
        "explain": "HW-NAS-Bench 的贡献是把 NAS-Bench-201/FBNet 架构映射到多设备硬件成本数据，并通过 API 让 HW-NAS 可复现地使用这些指标。"
      }
    },
    {
      "id": "fuseflow",
      "num": 37,
      "name": "FuseFlow",
      "fullName": "融合中心稀疏编译框架 (FuseFlow Fusion-Centric Compilation)",
      "year": "2026",
      "org": "Stanford/SambaNova",
      "parent": "tvm",
      "paperUrl": "https://asplos-conference.org/asplos2026/program/",
      "projectUrl": "",
      "category": "hw_sw_codesign",
      "motivation": "以融合为中心的稀疏深度学习编译框架",
      "summary": "FuseFlow 提出了面向稀疏深度学习和 streaming dataflow 硬件的融合中心编译框架，将 PyTorch 稀疏模型转换为可融合的 sparse dataflow graphs。它解决了现有稀疏 dataflow 编译器通常只能处理单个 sparse tensor expression、难以跨表达式融合整个 ML pipeline 的问题。",
      "keyPoints": [
        "输入为 PyTorch 稀疏 ML 模型，经 MLIR Sparse/Linalg 方言降低为 SAMML/SAM 风格数据流表示",
        "支持 general cross-expression fusion，把多个生产者-消费者 sparse Einsum 表达式合成更大的 fused sparse dataflow graph",
        "用 partial order graph (POG) 同时表达局部 dataflow order、稀疏存储 mode order 和跨表达式依赖",
        "引入 fusion table 作为降低 IR，延迟物化 SAM 节点并记录流之间的连接关系，便于生成 dataflow graph",
        "支持 parallelization、dataflow ordering、sparsity blocking 和基于成本模型的 fusion heuristic",
        "目标是可重构 dataflow 架构与周期精确模拟器，也可通过 Vitis HLS/FPGA 路径做硬件验证",
        "评估覆盖 GCN、GraphSAGE、sparse autoencoder、GPT-3 BigBird block-sparse attention，显示 full fusion 并非总是最优"
      ],
      "detail": "<h5>核心示意图</h5>\n<p><img alt=\"FuseFlow 融合形式示意\" src=\"https://ar5iv.labs.arxiv.org/html/2511.04768/assets/x3.png\" />\n<em>图：FuseFlow 论文 Figure 3 的 ar5iv 公开镜像，展示 pattern-based operator fusion、intra-expression iteration fusion 与 cross-expression fusion 等不同融合层次。论文系统总览在 arXiv HTML 中为内联 SVG，因此这里使用公开 PNG 形式的融合机制图。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># FuseFlow: cross-expression sparse dataflow compilation\ndef compile_with_fuseflow(torch_model, schedule):\n    mlir = lower_pytorch_to_mlir_sparse_linalg(torch_model)\n    expr_dag = extract_sparse_einsum_expressions(mlir)\n    fusion_groups = choose_fusion_groups(expr_dag, schedule)\n    samml_graphs = []\n\n    for group in fusion_groups:\n        pog = PartialOrderGraph()\n        fused = FusedEinsum()\n\n        for expr in topological_order(group):\n            expr = rename_local_reduction_indices(expr)\n            pog.add_edges(expr.storage_mode_order_constraints())\n            pog.add_edges(expr.user_dataflow_order_constraints())\n            fused.connect_producers_to_consumers(expr)\n            pog.propagate_order_edges_from_new_connections(fused)\n\n        if pog.has_cycle():\n            fused.materialize_permuted_tensor_view()\n            pog = rebuild_partial_order_graph(fused)\n\n        for order in pog.valid_topological_orders():\n            table = build_fusion_table(fused, order)\n            graph = lower_table_to_samml_dataflow(table)\n            graph = apply_parallelization_and_sparsity_blocking(graph, schedule)\n            samml_graphs.append(graph)\n\n    return emit_comal_or_hls(samml_graphs)\n</code></pre>\n<h5>方法机制解读</h5>\n<p>FuseFlow 的出发点是稀疏 ML 的效率瓶颈不只在单个 sparse matrix multiplication。GCN、GraphSAGE、BigBird attention、sparse autoencoder 这类模型由多个 sparse/dense tensor expression、非线性、mask、reshape 和中间张量组成。若每个表达式单独编译执行，系统需要频繁物化中间稀疏张量并反复扫描 coordinate stream；若盲目 full fusion，又可能引入重复计算或破坏稀疏存储的有序遍历。因此 FuseFlow 把“融合粒度”提升为编译器的中心问题。</p>\n<p>它建立在 Sparse Abstract Machine (SAM) 之上。SAM 把稀疏张量表达为 coordinate、reference 和 value stream，并用 level scanner、intersect/union、repeater、ALU、reducer、level writer 等 primitive 组成数据流图。例如一个稀疏矩阵乘可写为：</p>\n<div class=\"kb-math kb-math-display\">T^0_{ij}=\\sum_k \\hat{A}_{ik}X_{kj}</div>\n<p>在 dataflow 图中，<span class=\"kb-math kb-math-inline\">\\hat{A}</span> 的 CSR/CSC 等存储格式会规定合法的 mode traversal order，计算表达式本身又规定 reduction 和 broadcast 的局部顺序。FuseFlow 的难点是：当多个表达式被融合后，同一个张量可能被不同消费者以不同索引顺序访问，简单做 index substitution 会产生与存储格式冲突的遍历。</p>\n<p>为此，FuseFlow 使用 partial order graph (POG) 作为跨表达式融合的约束核心。可以把它看成索引变量上的有向图：</p>\n<div class=\"kb-math kb-math-display\">G_{POG}=(V_I, E_{storage}\\cup E_{dataflow}\\cup E_{producer\\rightarrow consumer})</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">V_I</span> 是融合区域内的索引变量，<span class=\"kb-math kb-math-inline\">E_{storage}</span> 来自稀疏张量存储 mode order，<span class=\"kb-math kb-math-inline\">E_{dataflow}</span> 来自用户或局部表达式要求的遍历顺序，<span class=\"kb-math kb-math-inline\">E_{producer\\rightarrow consumer}</span> 来自产生者和消费者之间的索引替换关系。若 POG 无环，拓扑序就是合法的全局 fused dataflow order；若出现环，说明某些张量视图无法用同一个顺序 concordantly traverse，FuseFlow 会为某个 use 物化 permuted tensor view 来打破冲突。</p>\n<p>POG 解决“能否融合和以什么顺序融合”，fusion table 解决“如何降低到 dataflow graph”。传统 loop compiler 可以在语法树上移动循环，而 streaming dataflow compiler 需要决定每个 level scanner、repeater、joiner、reducer 和 writer 如何空间连接。Fusion table 用表格单元记录每个索引/操作对应的 stream component，可以引用尚未物化的节点，因此编译器在遍历 fused Einsum 时不必立即创建完整图。完成后，表格中的指针关系被展开为 SAMML graph，再交给 Comal simulator 或 HLS 路径。</p>\n<p>融合不是越多越好。Full fusion 能减少中间张量写回和重复读取，提升 operational intensity；但在图神经网络中，把多层 sparse matmul 融成一个大表达式可能把共享中间结果变成重复计算，导致 FLOPs 增加。论文因此同时支持 unfused、partially fused 和 fully fused 配置，并用 heuristic 估计计算量和内存访问量来提前剪掉明显劣的方案。抽象地说，编译器在比较：</p>\n<div class=\"kb-math kb-math-display\">Cost(F)=FLOPs(F)+\\lambda\\cdot Bytes(F)+\\mu\\cdot Reformat(F)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">F</span> 是某个 fusion group。对 GPT-3 BigBird block-sparse attention，full fusion 可带来显著加速；对 GCN/GraphSAGE，partial fusion 往往更合理，因为它保留层内融合带来的内存收益，同时避免跨层 full fusion 的重算。</p>\n<p>与 TVM、TACO、MLIR SparseTensor 或早期 SAM 编译器相比，FuseFlow 的独特性在于它不是只为单个 sparse kernel 生成高效代码，而是把一个稀疏 ML 模型中的多个表达式整体纳入 dataflow 编译。它面向的是可重构 dataflow 架构：程序输出不是普通 CPU/GPU loop nest，而是 streaming operators 之间的空间连接和调度。论文还用周期精确 simulator，并与 Xilinx VU9P/AWS F1 上的 post-synthesis RTL 仿真对齐，说明 SAMML/Comal 路径不仅是抽象图优化，也能反映硬件趋势。</p>\n<div class=\"warn-box\">⚠️ 注意：FuseFlow 的“融合中心”不是简单把所有算子合并成一个 kernel，而是受稀疏存储顺序、数据流顺序和重算成本共同约束的 fusion design-space exploration。</div>",
      "quiz": {
        "q": "FuseFlow 中 partial order graph (POG) 的主要作用是什么？",
        "options": [
          "记录稀疏张量存储顺序、局部 dataflow 顺序和跨表达式依赖，判断融合后是否存在合法全局遍历顺序",
          "把所有稀疏张量强制转换成 dense tensor，以便普通 GPU kernel 执行",
          "只用于统计模型参数量，不参与代码生成",
          "替代所有硬件模拟器，直接给出最终芯片面积"
        ],
        "answer": 0,
        "explain": "POG 是 FuseFlow 跨表达式融合的约束图；若图无环，拓扑序给出合法 fused dataflow order，若有冲突则需要物化额外张量视图或改变融合方案。"
      }
    },
    {
      "id": "tisa",
      "num": 38,
      "name": "TISA",
      "fullName": "三合一动态调度架构 (TISA Tri-in-One Dynamic Scheduling)",
      "year": "2026",
      "org": "ISCA",
      "parent": "—",
      "paperUrl": "https://www.eeworld.com.cn/mp/yixingzhineng/a114343.jspx",
      "projectUrl": "",
      "category": "hw_sw_codesign",
      "motivation": "硬件调度器实时优化算力三合一动态分配",
      "summary": "TISA 提出以 Tile 级虚拟指令语义、ACE 编译器和硬件 VISA 调度器组成的三位一体动态调度架构，解决 AI 加速器静态编译排程难以适配运行时带宽冲突、流水线空泡和异构单元负载波动的问题。",
      "keyPoints": [
        "Tile 级调度粒度：把大算子切成可独立依赖跟踪和资源分配的 Tile，而不是只在粗粒度算子或细粒度指令上调度",
        "VISA 语义接口：在指令中保留算子边界、依赖类型、资源意图、Tile 内存范围和冲突信息",
        "ACE 智能编译器：将上层模型/算子映射为带语义的 VISA 流，负责静态可确定部分的切分、依赖标注和初始优化",
        "硬件 VISA 调度器：在运行时监控张量、向量和 DMA 等单元状态，动态重排可执行 Tile 并平衡资源",
        "冲突感知执行：根据依赖 scoreboard、片上存储分区、DMA 压力和执行单元空闲度选择下一批 Tile",
        "面向跨代兼容：通过虚拟指令隔离上层软件和底层硬件细节，让同一语义流适配不同加速器实现",
        "公开报道评测：在 DeepSeek-R1、ResNet-50、BERT、GPT-J、LLaMA2、FlashAttention-3 等负载上相对基线达到 1.52-1.92x 加速，并优于强静态流水调度 1.14-1.63x"
      ],
      "detail": "<h5>公开图源与整体框架</h5>\n<p><img alt=\"TISA 论文公开截图\" src=\"https://www.gsi24.com/ueditor/php/upload/image/20260401/1775027433477604.png\" />\n<em>图：芯师爷公开报道中嵌入的《Dynamic Scheduling for AI Accelerators via TISA》论文首页截图。正式论文 PDF 尚未公开，图中摘要与公开报道共同给出 TISA 的语义保留编译、Tile 级指令集和运行时调度器三件套。</em></p>\n<p>TISA 的关键不是把所有调度都搬到硬件里，而是重新划分编译器与硬件的职责。传统静态编译会在编译期固定算子分块、DMA 顺序、Tensor/Vector 单元的重叠关系；一旦运行时出现带宽回压、cache/bank 冲突、热降频或模型分支差异，硬件只能按原计划等待。TISA 则让编译器输出“带语义的待调度任务”，硬件根据实时状态决定哪些 Tile 先执行、哪些 Tile 暂停、哪些 DMA 与计算可以重叠。</p>\n<h5>动态调度伪代码</h5>\n<pre><code class=\"language-python\"># TISA/VISA 风格的 Tile 级硬件调度器伪代码\nready_queue = []\nscoreboard = DependencyScoreboard()\nresource_state = ResourceMonitor([&quot;tensor&quot;, &quot;vector&quot;, &quot;dma&quot;, &quot;sram_bank&quot;])\n\nfor visa_inst in ace_compiler.lower(model_graph):\n    tile = decode_tile_semantics(visa_inst)\n    scoreboard.register(tile.id, tile.dependencies)\n    if scoreboard.is_ready(tile.id):\n        ready_queue.append(tile)\n\nwhile not scoreboard.all_done():\n    resource_state.sample_runtime_status()\n\n    candidates = [\n        tile for tile in ready_queue\n        if scoreboard.is_ready(tile.id)\n        and resource_state.can_reserve(tile.required_units, tile.memory_range)\n        and not resource_state.has_bank_conflict(tile.memory_range)\n    ]\n\n    selected = max(candidates, key=lambda t: schedule_score(t, resource_state))\n    resource_state.reserve(selected.required_units, selected.memory_range)\n    dispatch_to_hardware(selected)\n\n    finished = collect_completed_tiles()\n    for tile in finished:\n        resource_state.release(tile.required_units, tile.memory_range)\n        scoreboard.mark_done(tile.id)\n        ready_queue.extend(scoreboard.newly_ready_successors(tile.id))\n</code></pre>\n<h5>机制拆解</h5>\n<p>静态调度的主要假设是“编译时看到的执行时间和资源压力接近运行时真实情况”。这个假设在 AI 加速器上越来越弱：大模型算子被切成大量 Tile 后，DMA 传输、片上 SRAM 分区、Tensor Core/Vector Core 协同和同步屏障会互相影响。一个 Tile 的有效开始时间可以写成：</p>\n<div class=\"kb-math kb-math-display\">t_{\\mathrm{start}}(i)=\\max\\left(t_{\\mathrm{dep}}(i), t_{\\mathrm{unit}}(r_i), t_{\\mathrm{mem}}(m_i)\\right)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">t_{\\mathrm{dep}}</span> 来自前驱依赖，<span class=\"kb-math kb-math-inline\">t_{\\mathrm{unit}}</span> 是所需计算单元下一次可用时间，<span class=\"kb-math kb-math-inline\">t_{\\mathrm{mem}}</span> 是内存分区或 DMA 通路可用时间。静态方案在编译期估计这些值，TISA 的硬件调度器则在每个调度窗口内重新读取这些状态，因此能把本来等待的 Tile 换成另一个已满足依赖且资源不冲突的 Tile。</p>\n<p>Tile 级 VISA 是 TISA 能动态调度的前提。若编译器只输出底层指令流，硬件看到的是 load、mma、store 等低层动作，难以判断“这个动作属于哪个算子、依赖哪个 Tile、可否和另一个 DMA 重排”。VISA 在降级后仍保留语义字段，例如：</p>\n<div class=\"kb-math kb-math-display\">\\mathrm{VISA\\_tile}=\\langle op,\\ deps,\\ resource,\\ mem\\_range,\\ priority,\\ shape\\rangle</div>\n<p>这些字段相当于编译器和硬件之间的调度契约：编译器承诺依赖和边界是正确的，硬件承诺在不破坏依赖与内存一致性的前提下重排执行。这样既避免纯软件运行时调度的微秒级开销，也避免完全静态排程对运行时波动无能为力。</p>\n<p>硬件 VISA 调度器的核心是“就绪性 + 资源匹配 + 冲突规避”。一个 Tile 能被发射需要满足：</p>\n<div class=\"kb-math kb-math-display\">\\mathrm{ready}(i)=\n\\left(\\bigwedge_{j\\in Pred(i)} done(j)\\right)\n\\land available(r_i)\n\\land no\\_conflict(m_i)</div>\n<p>在多个 Tile 同时 ready 时，调度器可以使用近似启发式评分而不是复杂全局搜索：</p>\n<div class=\"kb-math kb-math-display\">\\mathrm{score}(i)=\n\\alpha\\cdot criticality(i)\n\\beta\\cdot wait(i)\n-\\gamma\\cdot conflict(i)\n-\\delta\\cdot dma\\_pressure(i)</div>\n<p>这里 <span class=\"kb-math kb-math-inline\">criticality</span> 表示关键路径权重，<span class=\"kb-math kb-math-inline\">wait</span> 表示等待时间，<span class=\"kb-math kb-math-inline\">conflict</span> 与 <span class=\"kb-math kb-math-inline\">dma\\_pressure</span> 分别惩罚片上存储冲突和搬运拥塞。硬件实现通常会把这些指标简化为计数器、位图和优先级比较器，使调度决策保持在纳秒级。</p>\n<p>与 GPU 的 warp 调度相比，TISA 的粒度更粗且语义更高。warp 调度擅长在 CUDA Core 内部隐藏指令延迟，但它通常不能跨 DMA、Tensor、Vector 等单元协调一个算子的整体流水；TISA 把 Tile 当作跨单元协同对象，目标是让搬运、矩阵计算、向量后处理和同步在更大的窗口里重叠。公开报道给出的 FlashAttention-3 场景尤其能体现这一点，因为注意力算子同时受矩阵乘吞吐、片上块缓存和 softmax/归一化后处理影响，单纯优化某一个内核片段并不能消除流水线空泡。</p>\n<div class=\"key-point\">💡 关键：TISA 的“动态”不是放弃编译器优化，而是让编译器保留足够语义，把静态可知的依赖交给硬件在运行时快速重排。</div>",
      "quiz": {
        "q": "TISA 选择 Tile 级 VISA 作为软硬件接口的主要原因是什么？",
        "options": [
          "让硬件完全忽略编译器生成的依赖关系",
          "在保留算子语义和依赖信息的同时，让硬件能按运行时资源状态重排 Tile",
          "把所有 CNN 卷积都改写成 FFT 卷积",
          "只优化 CPU 侧线程调度，不改变加速器内部执行"
        ],
        "answer": 1,
        "explain": "Tile 级 VISA 保留依赖、资源和内存范围等语义，使硬件调度器能在不破坏正确性的前提下根据实时状态动态发射 Tile。"
      }
    },
    {
      "id": "fpga_cnn_survey",
      "num": 39,
      "name": "FPGA-CNN综述",
      "fullName": "FPGA加速CNN综述 (FPGA-based CNN Acceleration Survey)",
      "year": "2017",
      "org": "NUDT",
      "parent": "—",
      "paperUrl": "—",
      "projectUrl": "",
      "category": "fpga",
      "motivation": "系统总结FPGA在CNN加速中的关键优化技术",
      "summary": "FPGA-CNN 综述系统总结了 CNN 推理在 FPGA 上的算法压缩、低精度量化、循环展开/流水、片上缓存和数据流调度方法，核心目标是在有限 DSP、BRAM 和外部带宽下获得高吞吐与高能效。",
      "keyPoints": [
        "CNN 计算热点：CONV 层主导乘累加计算量，FC 层和大模型参数主导存储与带宽压力",
        "FPGA 设计优势：可定制数据通路、低精度算术、片上 SRAM 显式管理和深流水结构",
        "性能模型：吞吐由峰值并行度、工作频率、资源利用率和存储供给共同决定",
        "模型压缩：定点量化、二值/三值网络、剪枝稀疏化和低秩分解降低计算与访存",
        "计算结构：PE 阵列、加法树、滑动窗口 line buffer、脉动/数据流架构用于提高数据复用",
        "存储优化：tiling、double buffering、BRAM 分区、权重/激活重排和长 burst 访问降低 DDR 瓶颈",
        "自动化工具流：从 Caffe/TensorFlow/中间表示到 HLS/RTL 的编译映射和设计空间搜索"
      ],
      "detail": "<h5>综述图与系统抽象</h5>\n<p><img alt=\"FPGA 神经网络加速器典型结构\" src=\"https://ar5iv.labs.arxiv.org/html/1712.08934/assets/x2.png\" />\n<em>图：公开 ar5iv 镜像中的 FPGA 神经网络加速器典型结构。给定条目没有论文 URL，因此这里采用同时期公开综述图作为框架图；NUDT 综述也从通用芯片、专用加速器、计算结构、存储结构和数据流角度总结神经网络硬件加速。</em></p>\n<p><img alt=\"CNN 加速中的运算与参数分布\" src=\"https://ar5iv.labs.arxiv.org/html/1712.08934/assets/x1.png\" />\n<em>图：CONV 与 FC 层在典型网络中的计算/参数占比。CONV 通常贡献绝大部分运算，FC 往往贡献大量权重，因此 FPGA-CNN 加速必须同时处理计算并行和存储带宽。</em></p>\n<h5>设计空间搜索伪代码</h5>\n<pre><code class=\"language-python\"># FPGA-CNN 加速器设计空间搜索伪代码\nbest = None\n\nfor bit_w in [16, 8, 4, 2, 1]:\n    model_q = quantize_model(model, weight_bits=bit_w, act_bits=bit_w)\n    if accuracy_drop(model_q, calib_set) &gt; max_drop:\n        continue\n\n    for tile in candidate_tiles(model_q):          # Tr, Tc, Ti, To\n        for parallel in candidate_parallelism():   # PE_num, SIMD, unroll factors\n            resource = estimate_resource(tile, parallel, bit_w)\n            if resource.DSP &gt; fpga.DSP or resource.BRAM &gt; fpga.BRAM:\n                continue\n\n            bw = estimate_ddr_bandwidth(tile, parallel, model_q)\n            if bw &gt; fpga.ddr_bandwidth:\n                continue\n\n            latency = estimate_latency(model_q, tile, parallel, bw)\n            energy = estimate_energy(model_q, tile, parallel, bw)\n            score = throughput(model_q, latency) / energy\n\n            if best is None or score &gt; best.score:\n                best = Design(bit_w, tile, parallel, latency, energy, score)\n\nemit_hls_or_rtl(best)\ngenerate_weight_layout(best)\ngenerate_runtime_instructions(best)\n</code></pre>\n<h5>方法机制解读</h5>\n<p>CNN 在 FPGA 上的基本矛盾是“可用并行度很高，但片上资源和外部带宽有限”。标准卷积层的乘加量可写为：</p>\n<div class=\"kb-math kb-math-display\">Ops_{\\mathrm{conv}}=H_o W_o C_o C_i K_h K_w</div>\n<p>如果直接逐元素从 DDR 读取输入、权重和输出，计算阵列会被访存拖住。因此 FPGA 设计通常把输入特征图、权重块和输出部分和切成 Tile，在 BRAM 中复用。常见分块参数为 <span class=\"kb-math kb-math-inline\">(T_r,T_c,T_i,T_o)</span>，分别对应输出空间、输入通道和输出通道的并行/缓存范围。合理的 tiling 会让一次读入的输入窗口服务多个输出通道，一次读入的权重服务多个输出像素。</p>\n<p>性能模型可以从峰值并行度与利用率理解。若 PE 数为 <span class=\"kb-math kb-math-inline\">N_{PE}</span>，每个 PE 每周期执行 <span class=\"kb-math kb-math-inline\">M</span> 个 MAC，频率为 <span class=\"kb-math kb-math-inline\">f</span>，平均利用率为 <span class=\"kb-math kb-math-inline\">U</span>，则运行时吞吐近似为：</p>\n<div class=\"kb-math kb-math-display\">P_{\\mathrm{run}}=2\\cdot f\\cdot N_{PE}\\cdot M\\cdot U</div>\n<p>其中系数 2 表示一次 MAC 计为一次乘法和一次加法。提高 <span class=\"kb-math kb-math-inline\">N_{PE}</span> 需要更多 DSP/LUT，提高 <span class=\"kb-math kb-math-inline\">M</span> 往往依赖低精度乘法或 bit-serial 结构，提高 <span class=\"kb-math kb-math-inline\">U</span> 则依赖调度与存储系统。很多设计峰值很高但 <span class=\"kb-math kb-math-inline\">U</span> 不足，是因为 DMA、BRAM bank 冲突或层间同步让 PE 阵列等待。</p>\n<p>量化是 FPGA-CNN 最直接的软硬协同手段。把 FP32 权重/激活改成 INT16、INT8、INT4 甚至二值，可以同时降低三类成本：乘法器面积、BRAM/DDR 带宽、片上互连宽度。线性定点量化通常表示为：</p>\n<div class=\"kb-math kb-math-display\">x_q=\\mathrm{clip}\\left(\\mathrm{round}\\left(\\frac{x}{s}\\right)+z,\\ q_{\\min},q_{\\max}\\right)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">s</span> 是 scale，<span class=\"kb-math kb-math-inline\">z</span> 是 zero point 或定点偏移。对于早期 FPGA 论文，常见做法是逐层选择 fractional length，让每层动态范围尽量覆盖激活分布；对精度敏感层保留更高 bit，对中间层压低 bit。二值网络进一步把乘法替换为 XNOR-popcount，但通常需要专门训练以补偿精度损失。</p>\n<p>存储系统通常比计算阵列更决定上限。NUDT 综述强调神经网络加速器需要从存储结构和数据流角度减少数据搬移；在 FPGA 上这具体表现为 line buffer、input/output buffer、weight buffer、double buffering 和外部数据布局重排。一次高效的卷积流水会让 DMA 读取下一块数据的同时，PE 阵列计算当前块，输出部分和保存在 BRAM 或 accumulator 中，避免每个中间值频繁写回 DDR。</p>\n<p>与 GPU 相比，FPGA 的频率较低、开发成本更高，但它能把数据类型、缓冲深度、并行因子和控制逻辑定制到目标网络；与 ASIC 相比，FPGA 能快速跟随 CNN 结构变化，但能效和面积效率仍受可重构逻辑开销限制。因此 FPGA-CNN 综述的核心结论不是“固定一种最佳架构”，而是把优化空间拆成模型压缩、算子映射、PE 数据流、存储布局和自动化编译五个层次，并用约束搜索找到某个网络和板卡上的平衡点。</p>\n<div class=\"key-point\">💡 关键：FPGA-CNN 加速的难点不只是“多放 PE”，而是让 PE、BRAM、DDR burst、量化精度和网络分块同时匹配。</div>",
      "quiz": {
        "q": "在 FPGA-CNN 加速器中，tiling 和片上缓存的主要作用是什么？",
        "options": [
          "增加模型参数量以提高准确率",
          "把卷积全部转换成 CPU 串行执行",
          "提高输入、权重和部分和的数据复用，降低 DDR 带宽压力",
          "强制所有层使用 FP64 浮点数"
        ],
        "answer": 2,
        "explain": "FPGA 的外部带宽有限，tiling 将特征图和权重分块放入 BRAM，使同一数据被多个 PE 或多个输出位置复用，从而提高吞吐和能效。"
      }
    },
    {
      "id": "fpga_svd",
      "num": 40,
      "name": "SVD-FPGA",
      "fullName": "SVD压缩FPGA加速 (SVD-based FPGA Acceleration)",
      "year": "2016",
      "org": "Tsinghua",
      "parent": "—",
      "paperUrl": "—",
      "projectUrl": "",
      "category": "fpga",
      "motivation": "基于SVD压缩的FPGA定制化量化推理",
      "summary": "SVD-FPGA 对应清华 FPGA 2016 的 VGG16-SVD 嵌入式 FPGA 加速思路：用 SVD 压缩全连接层权重、动态定点量化降低数据位宽，并设计统一卷积/全连接计算引擎解决大 CNN 在嵌入式 FPGA 上的计算和带宽瓶颈。",
      "keyPoints": [
        "面向完整 CNN 推理：不仅加速 CONV 层，也覆盖 FC、pooling、非线性和最终分类流程",
        "复杂度分析：CONV 层计算密集，FC 层参数和带宽密集，二者需要不同优化策略",
        "SVD 压缩 FC 层：将大权重矩阵低秩分解为两个较小矩阵，减少全连接层存储与 DDR 读取",
        "动态精度量化：为不同层/特征图选择定点小数位，降低位宽同时控制 VGG16/VGG16-SVD 精度损失",
        "统一 PE/Convolver：用同一卷积器结构支持 CONV 和 FC 的乘累加，减少额外硬件",
        "数据布局优化：为 CONV/FC 分别重排外部存储，增加 DMA burst 长度，提高 DDR 带宽利用率",
        "公开结果：VGG16-SVD 在 Xilinx Zynq ZC706 上端到端运行，报道结果为 4.45 fps、Top-5 86.66%，16-bit 量化下全网络约 137 GOP/s"
      ],
      "detail": "<h5>核心架构图</h5>\n<p><img alt=\"SVD-FPGA PE 结构\" src=\"https://i-blog.csdnimg.cn/blog_migrate/6d25fd82d8817b25c048663af2c289da.png\" />\n<em>图：公开论文笔记中转载的 FPGA 2016 论文 PE 结构图。PE 包含 Convolver Complex、Adder Tree、Non-Linearity、Pooling、Bias Shift 和 Data Shift，体现了用统一数据通路支持卷积、全连接和动态量化后处理的设计。</em></p>\n<p><img alt=\"VGG 系列层计算量与权重分布\" src=\"https://i-blog.csdnimg.cn/blog_migrate/4005aa045027cc1828e89e1112109716.png\" />\n<em>图：公开论文笔记中转载的复杂度分析图。上图显示卷积层主导 GOP，下图显示 FC6 等全连接层主导权重数量，这正是 SVD 压缩 FC 层的动机。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># SVD 压缩 + 动态定点量化 + FPGA 映射伪代码\nmodel = load_trained_vgg16()\n\n# 1. 对全连接层做低秩分解\nfor layer in model.fc_layers:\n    W = layer.weight_matrix                  # shape: [out_dim, in_dim]\n    U, S, Vt = svd(W)\n    r = choose_rank(U, S, Vt, accuracy_budget)\n    layer.replace_with_two_fc(\n        W1=diag(S[:r]) @ Vt[:r, :],          # in_dim -&gt; r\n        W2=U[:, :r],                         # r -&gt; out_dim\n    )\n\n# 2. 为每层搜索定点格式\nfor layer in model.layers:\n    candidates = []\n    for fl in possible_fractional_lengths(layer):\n        q_weight = fixed_point(layer.weight, word_bits=16, frac_bits=fl.weight)\n        q_act = simulate_activation_quant(layer, frac_bits=fl.activation)\n        candidates.append((fl, validation_error(q_weight, q_act)))\n    layer.quant_config = min(candidates, key=lambda x: x[1])[0]\n\n# 3. 生成 FPGA 数据布局与指令\nfor layer in model.layers:\n    tiles = tile_layer(layer, Tr, Tc, Ti, To)\n    arrange_ddr_for_long_burst(tiles, layer.type)\n    emit_instruction(layer, tiles, layer.quant_config)\n\nrun_on_fpga(pe_array, dma_engine, instruction_stream)\n</code></pre>\n<h5>方法机制解读</h5>\n<p>这项工作的起点是嵌入式 FPGA 无法直接容纳完整 VGG16。VGG16 的卷积层承担大部分计算，但全连接层拥有大量权重，外部 DDR 读取会成为端到端延迟和能耗瓶颈。对卷积层，最重要的是让 PE 阵列持续工作；对 FC 层，最重要的是减少权重矩阵大小并提高 burst 读取效率。因此论文把优化分成两条线：CONV 用并行卷积器和 tiling 提高计算吞吐，FC 用 SVD 与数据重排降低带宽压力。</p>\n<p>SVD 压缩基于低秩近似。给定全连接层：</p>\n<div class=\"kb-math kb-math-display\">y = W x + b,\\quad W\\in \\mathbb{R}^{m\\times n}</div>\n<p>对 <span class=\"kb-math kb-math-inline\">W</span> 做奇异值分解：</p>\n<div class=\"kb-math kb-math-display\">W = U\\Sigma V^T</div>\n<p>只保留前 <span class=\"kb-math kb-math-inline\">r</span> 个奇异值，可得到近似：</p>\n<div class=\"kb-math kb-math-display\">W \\approx U_r\\Sigma_r V_r^T</div>\n<p>原本一次 <span class=\"kb-math kb-math-inline\">m\\times n</span> 矩阵向量乘变成两次较小矩阵向量乘：</p>\n<div class=\"kb-math kb-math-display\">z = \\Sigma_r V_r^T x,\\quad y = U_r z + b</div>\n<p>参数量从 <span class=\"kb-math kb-math-inline\">mn</span> 降为 <span class=\"kb-math kb-math-inline\">r(m+n)</span>。当 <span class=\"kb-math kb-math-inline\">r \\ll \\min(m,n)</span> 时，FC 层权重读取和乘加量都会显著下降。公开解读中提到该方法可使 FC 权重内存占用大幅减少，从而让 VGG16-SVD 更适合嵌入式 FPGA 端到端部署。</p>\n<p>动态定点量化解决的是“低位宽但不明显掉精度”的问题。固定点数可写为：</p>\n<div class=\"kb-math kb-math-display\">\\hat{x}=\\mathrm{clip}\\left(\\mathrm{round}(x\\cdot 2^{FL}), -2^{WL-1}, 2^{WL-1}-1\\right)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">WL</span> 是总位宽，<span class=\"kb-math kb-math-inline\">FL</span> 是小数位。若 <span class=\"kb-math kb-math-inline\">FL</span> 太小，小数精度不足；若 <span class=\"kb-math kb-math-inline\">FL</span> 太大，整数范围不足，容易溢出。论文的动态精度流程会按层分析权重和激活范围，为不同层选择合适的 <span class=\"kb-math kb-math-inline\">FL</span>，并在 PE 中用 Bias Shift 与 Data Shift 对偏置和输出做对应移位。这样硬件仍使用规整的定点乘加，软件/编译阶段负责每层的缩放配置。</p>\n<p>PE 设计体现了“统一计算引擎”的取舍。Convolver Complex 通过 line buffer 和窗口选择器高效处理卷积；在 FC 层中，矩阵向量乘也能被映射到同一乘加阵列，只是输入/权重的数据供给和复用模式不同。这样做避免为 FC 单独放置大规模矩阵乘硬件，但 FC 的利用率会更受带宽限制，因此论文进一步为 FC 权重设计特殊外部存储布局，尽量把短小离散访问合并成长 burst。</p>\n<p>从端到端系统看，CPU/PS 负责准备图像、模型参数、DMA buffer descriptor 和控制指令，FPGA/PL 负责执行计算密集部分。DMA 将输入 Tile、权重 Tile 和指令送入片上 buffer，控制器解码指令后驱动 PE、池化、非线性和移位模块。该设计与只报告卷积层 GOP/s 的早期 FPGA-CNN 工作不同，它强调完整 VGG16-SVD 网络在真实板卡上的端到端吞吐，因此 FC 层压缩和数据布局优化与卷积 PE 同等重要。</p>\n<div class=\"key-point\">💡 关键：SVD-FPGA 的核心不是单独使用 SVD，而是把低秩压缩、逐层定点量化、统一 PE 和 DDR 数据布局一起做成可落地的端到端推理系统。</div>",
      "quiz": {
        "q": "SVD-FPGA 中对全连接层做 SVD 低秩分解的主要目的是什么？",
        "options": [
          "增加全连接层参数量以提升过拟合能力",
          "把一个大权重矩阵近似成两个小矩阵，降低 FC 层存储和带宽压力",
          "将所有卷积核替换为 FFT 频域卷积",
          "让 FPGA 只运行 Softmax，其他层交给 CPU"
        ],
        "answer": 1,
        "explain": "全连接层权重矩阵通常很大，SVD 保留主要奇异值后可用两个低秩矩阵近似原矩阵，使参数量从 mn 降到 r(m+n)，显著减少外部内存访问。"
      }
    },
    {
      "id": "deep_compression",
      "num": 41,
      "name": "Deep Compression",
      "fullName": "深度压缩 (Deep Compression)",
      "year": "2015",
      "org": "Stanford",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/1510.00149",
      "projectUrl": "",
      "category": "efficiency",
      "motivation": "剪枝量化Huffman编码实现模型50倍压缩",
      "summary": "Deep Compression 提出了一个三阶段压缩流水线——**剪枝、训练式量化与 Huffman 编码**——将深度神经网络存储需求压缩 35×–49×（如 AlexNet 从 240 MB 压至 6.9 MB），且不损失精度，使模型可完全放入片上 SRAM 而无需访问高能耗的 DRAM。",
      "keyPoints": [
        "<strong>三阶段压缩流水线</strong>：Pruning → Trained Quantization → Huffman Coding，三者正交互不干扰，可叠加获得极高压缩率",
        "<strong>网络剪枝</strong>：移除权重绝对值低于阈值的连接，AlexNet 参数量减少 9×，VGG-16 减少 13×；使用 CSR/CSC 稀疏格式存储，索引差分编码（conv 层 8 bit，fc 层 5 bit）",
        "<strong>训练式量化与权重共享</strong>：对每层权重做 k-means 聚类，同簇连接共享一个质心权重；CONV 层 256 簇（8 bit 索引），FC 层 32 簇（5 bit 索引）；训练时按簇聚合梯度更新质心",
        "<strong>质心初始化策略</strong>：比较了 Forgy（随机）、密度优先、线性三种初始化，线性初始化效果最优，因其对大权重覆盖更均匀",
        "<strong>Huffman 编码</strong>：利用量化权重和稀疏索引的非均匀分布，进一步节省 20%–30% 存储",
        "<strong>压缩效果</strong>：AlexNet 35×（240 MB → 6.9 MB），VGG-16 49×（552 MB → 11.3 MB），均无精度损失",
        "<strong>硬件友好</strong>：压缩后模型可放入片上 SRAM，避免 DRAM 访问；在 CPU/GPU/移动 GPU 上获得 3×–4× 加速和 3×–7× 能效提升"
      ],
      "detail": "<h5>核心框架图</h5>\n<p><img alt=\"Deep Compression 三阶段压缩流水线\" src=\"https://ar5iv.labs.arxiv.org/html/1510.00149/assets/x1.png\" />\n<em>图 1：Deep Compression 的三阶段压缩流水线：剪枝将连接数减少 10×，量化进一步压缩至 27×–31×，Huffman 编码最终达到 35×–49×。压缩率已包含稀疏表示的元数据开销。</em></p>\n<p><img alt=\"权重共享与质心微调示意\" src=\"https://ar5iv.labs.arxiv.org/html/1510.00149/assets/x3.png\" />\n<em>图 3：权重共享示意（上）与质心微调过程（下）。同色权重共享同一质心值，反向传播时按簇聚合梯度更新质心。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># Deep Compression 三阶段压缩流水线伪代码\n\n# ========== 阶段 1：剪枝 ==========\nmodel = train_network(data)                    # 正常训练至收敛\nfor layer in model.layers:\n    threshold = compute_threshold(layer.weights)  # 基于权重分布确定阈值\n    mask = abs(layer.weights) &gt; threshold          # 保留大权重\n    layer.weights *= mask                          # 置零小权重\nmodel = retrain_network(model, data, masks)    # 仅更新保留的连接\n# 用 CSR/CSC 格式存储稀疏权重，索引用差分编码\n\n# ========== 阶段 2：训练式量化 ==========\nfor layer in model.layers:\n    k = 256 if layer.is_conv else 32           # CONV 8-bit, FC 5-bit\n    centroids, indices = kmeans(layer.weights[mask], k)  # k-means 聚类\n    layer.codebook = centroids                 # 存储码本\n    layer.indices = indices                    # 存储索引\n# 微调：按簇聚合梯度更新质心\nfor epoch in range(finetune_epochs):\n    for batch in data:\n        grads = compute_gradients(model, batch)\n        for layer in model.layers:\n            for c_k in range(len(layer.codebook)):\n                # 聚合属于第 k 簇的所有梯度\n                grad_sum = sum(grads[i,j] for i,j if indices[i,j] == c_k)\n                layer.codebook[c_k] -= lr * grad_sum\n\n# ========== 阶段 3：Huffman 编码（离线，无需训练） ==========\nfor layer in model.layers:\n    layer.encoded_weights = huffman_encode(layer.codebook)\n    layer.encoded_indices = huffman_encode(layer.indices)\n</code></pre>\n<h5>动机与背景</h5>\n<p>深度神经网络虽然在计算机视觉等任务上取得了最先进的性能，但其巨大的参数量（AlexNet 约 240 MB，VGG-16 约 552 MB）严重阻碍了在移动端和嵌入式设备上的部署。核心瓶颈有两个：</p>\n<ol>\n<li><strong>存储限制</strong>：移动应用商店对包体大小敏感（如 iOS App Store 限制 100 MB 以上需 Wi-Fi 下载），数百 MB 的模型无法直接嵌入 App。</li>\n<li><strong>能耗瓶颈</strong>：在 45nm CMOS 工艺下，一次 32-bit DRAM 访问消耗 640 pJ，是 32-bit SRAM 访问（5 pJ）的 128 倍，是一次浮点加法（0.9 pJ）的 700 倍。大模型无法放入片上 SRAM，必须频繁访问 DRAM，导致能耗远超移动设备的功率预算。</li>\n</ol>\n<div class=\"key-point\">💡 <strong>关键洞察</strong>：如果能将模型压缩到足够小（几 MB），就可以完全放入片上 SRAM 缓存，从根本上消除 DRAM 访问的能耗瓶颈。</div>\n<h5>阶段 1：网络剪枝</h5>\n<p>剪枝的核心思想是<strong>移除冗余连接</strong>，只保留对网络输出贡献最大的权重。具体流程：</p>\n<ol>\n<li>正常训练网络至收敛</li>\n<li>将权重绝对值低于阈值的连接移除（置零）</li>\n<li>对剩余稀疏网络重新训练（retrain），微调保留连接的权重</li>\n</ol>\n<p>剪枝后，AlexNet 的连接数减少 9×，VGG-16 减少 13×。</p>\n<p><strong>稀疏存储格式</strong>：剪枝后的稀疏权重矩阵使用 CSR（Compressed Sparse Row）或 CSC（Compressed Sparse Column）格式存储，需要 <span class=\"kb-math kb-math-inline\">2a + n + 1</span> 个数（<span class=\"kb-math kb-math-inline\">a</span> 为非零元素数，<span class=\"kb-math kb-math-inline\">n</span> 为行/列数）。为进一步压缩索引，采用<strong>相对索引</strong>（存储索引差值而非绝对位置），conv 层用 8 bit、fc 层用 5 bit 编码。当差值超出编码范围时，插入填充零（filler zero）来处理溢出。</p>\n<p><img alt=\"稀疏索引的相对编码与填充零\" src=\"https://ar5iv.labs.arxiv.org/html/1510.00149/assets/x2.png\" />\n<em>图 2：用相对索引表示矩阵稀疏性，当索引差超出范围时填充零防止溢出。</em></p>\n<h5>阶段 2：训练式量化与权重共享</h5>\n<p>量化阶段的目标是<strong>减少表示每个权重所需的比特数</strong>。核心方法是让多个连接共享同一权重值：</p>\n<ol>\n<li><strong>k-means 聚类</strong>：对每层已剪枝的权重做一维 k-means 聚类，将 <span class=\"kb-math kb-math-inline\">n</span> 个原始权重 <span class=\"kb-math kb-math-inline\">W = \\{w_1, w_2, \\ldots, w_n\\}</span> 划分为 <span class=\"kb-math kb-math-inline\">k</span> 个簇 <span class=\"kb-math kb-math-inline\">C = \\{c_1, c_2, \\ldots, c_k\\}</span>，最小化簇内平方和：</li>\n</ol>\n<div class=\"kb-math kb-math-display\">\\underset{C}{\\arg\\min} \\sum_{i=1}^{k} \\sum_{w \\in c_i} |w - c_i|^2</div>\n<ol>\n<li><strong>存储方式</strong>：每个连接只需存储一个 <span class=\"kb-math kb-math-inline\">\\log_2(k)</span> bit 的索引指向码本中的共享权重。压缩率公式为：</li>\n</ol>\n<div class=\"kb-math kb-math-display\">r = \\frac{n \\cdot b}{n \\cdot \\log_2(k) + k \\cdot b}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">n</span> 为连接数，<span class=\"kb-math kb-math-inline\">b</span> 为原始比特数（32），<span class=\"kb-math kb-math-inline\">k</span> 为簇数。</p>\n<ol>\n<li><strong>质心微调</strong>：聚类后，通过反向传播微调质心。每个质心的梯度是所有属于该簇的权重梯度之和：</li>\n</ol>\n<div class=\"kb-math kb-math-display\">\\frac{\\partial \\mathcal{L}}{\\partial C_k} = \\sum_{i,j} \\frac{\\partial \\mathcal{L}}{\\partial W_{ij}} \\cdot \\mathbb{1}(I_{ij} = k)</div>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：权重共享不跨层进行——每层独立聚类，拥有自己的码本。</div>\n<p><strong>质心初始化的影响</strong>：</p>\n<p><img alt=\"质心初始化方法对比\" src=\"https://ar5iv.labs.arxiv.org/html/1510.00149/assets/x4.png\" />\n<em>图 4：三种质心初始化方法对比（左）及权重分布与码本微调前后的变化（右）。</em></p>\n<ul>\n<li><strong>Forgy（随机）初始化</strong>：从数据中随机选取 k 个观测值作为初始质心，倾向于集中在双峰分布的峰值附近</li>\n<li><strong>密度优先初始化</strong>：在权重 CDF 的 y 轴上等距采样，质心在峰值处更密集</li>\n<li><strong>线性初始化</strong>：在权重的 <span class=\"kb-math kb-math-inline\">[\\min, \\max]</span> 之间等距分布质心，对分布不敏感</li>\n</ul>\n<div class=\"key-point\">💡 <strong>关键发现</strong>：线性初始化效果最优。原因是大权重虽然数量少但对网络输出影响大，Forgy 和密度优先方法在大权重区域分配的质心过少，导致表示精度不足。</div>\n<p>实验中，CONV 层使用 8 bit（256 个共享权重），FC 层使用 5 bit（32 个共享权重），在不损失精度的前提下实现了高效量化。</p>\n<h5>阶段 3：Huffman 编码</h5>\n<p><img alt=\"量化权重和稀疏索引的分布\" src=\"https://ar5iv.labs.arxiv.org/html/1510.00149/assets/x6.png\" />\n<em>图 5：量化权重（左）和稀疏索引（右）的分布均呈现明显偏斜，适合 Huffman 编码。</em></p>\n<p>Huffman 编码是一种最优前缀码，用变长编码表示源符号——出现频率越高的符号用越短的编码。由于量化后的权重集中在双峰附近、稀疏索引差值集中在小值区域，分布高度非均匀，Huffman 编码可在量化基础上进一步节省 <strong>20%–30%</strong> 的存储。</p>\n<p>Huffman 编码是纯离线操作，不需要额外训练，在剪枝和量化微调全部完成后执行。</p>\n<h5>与传统方法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>核心思路</th>\n<th>AlexNet 压缩率</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>原始网络</td>\n<td>—</td>\n<td>1×</td>\n</tr>\n<tr>\n<td>HashedNets (Chen et al., 2015)</td>\n<td>哈希函数预定义权重共享</td>\n<td>—</td>\n</tr>\n<tr>\n<td>仅剪枝 (Han et al., 2015)</td>\n<td>移除小权重连接</td>\n<td>9×</td>\n</tr>\n<tr>\n<td>仅量化</td>\n<td>k-means 权重共享</td>\n<td>~8×</td>\n</tr>\n<tr>\n<td><strong>Deep Compression</strong></td>\n<td><strong>剪枝 + 量化 + Huffman</strong></td>\n<td><strong>35×</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p>Deep Compression 的核心优势在于三种技术<strong>正交互补</strong>：剪枝减少连接数量，量化减少每个连接的比特数，Huffman 编码利用统计冗余进一步压缩。论文实验证明，剪枝不仅不会损害量化效果，反而因为去除了接近零的权重，使得剩余权重的分布更有利于聚类。</p>\n<h5>压缩效果总结</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>网络</th>\n<th>原始大小</th>\n<th>压缩后大小</th>\n<th>压缩率</th>\n<th>精度变化</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>LeNet-300-100</td>\n<td>1070 KB</td>\n<td>27 KB</td>\n<td><strong>40×</strong></td>\n<td>Top-1: 1.64% → 1.58%（提升）</td>\n</tr>\n<tr>\n<td>LeNet-5</td>\n<td>1720 KB</td>\n<td>44 KB</td>\n<td><strong>39×</strong></td>\n<td>Top-1: 0.80% → 0.74%（提升）</td>\n</tr>\n<tr>\n<td>AlexNet</td>\n<td>240 MB</td>\n<td>6.9 MB</td>\n<td><strong>35×</strong></td>\n<td>Top-1/5: 42.78%/19.73% → 42.78%/19.70%</td>\n</tr>\n<tr>\n<td>VGG-16</td>\n<td>552 MB</td>\n<td>11.3 MB</td>\n<td><strong>49×</strong></td>\n<td>Top-1/5: 31.50%/11.32% → 31.17%/10.91%（提升）</td>\n</tr>\n</tbody>\n</table></div>\n<p>在硬件层面，压缩后的网络在 CPU 上获得 3× 加速，在 GPU 上获得 3.5× 加速，在移动 GPU 上获得 4× 加速；能效方面，CPU 上提升 7×，GPU 上提升 3.3×。</p>",
      "quiz": {
        "q": "Deep Compression 中，训练式量化阶段使用什么方法实现权重共享？",
        "options": [
          "对权重矩阵做 SVD 低秩分解",
          "使用哈希函数将权重映射到固定桶",
          "对每层权重做 k-means 聚类，同簇连接共享质心值",
          "将所有权重统一截断到最近的 2 的幂次"
        ],
        "answer": 2,
        "explain": "Deep Compression 对每层已剪枝的权重进行 k-means 聚类，同一簇内的所有连接共享该簇的质心作为权重值，存储时只需保存索引和码本，从而大幅减少比特数。"
      }
    },
    {
      "id": "eie",
      "num": 42,
      "name": "EIE",
      "fullName": "高效推理引擎 (Efficient Inference Engine)",
      "year": "2016",
      "org": "Stanford",
      "parent": "deep_compression",
      "paperUrl": "—",
      "projectUrl": "",
      "category": "efficiency",
      "motivation": "首个针对压缩稀疏模型的专用硬件加速器",
      "summary": "EIE 提出了直接在 Deep Compression 生成的稀疏、权重共享模型上执行推理的专用硬件，解决了通用 CPU/GPU 难以高效处理相对索引、码本查表和不规则稀疏访存的问题。它把模型放入片上 SRAM，并用 PE 阵列、非零激活广播和压缩 CSC 读出机制加速全连接层的稀疏矩阵向量乘。",
      "keyPoints": [
        "面向 Deep Compression 输出：剪枝后的稀疏权重、4-bit 权重共享索引、相对行索引共同构成硬件直接读取的压缩模型",
        "计算核心是 FC 层稀疏矩阵向量乘：只处理非零权重和 ReLU 后的非零输入激活，跳过零激活对应的整列",
        "PE 阵列并行化：每个 PE 保存矩阵的一组交错列/行切片，局部累加输出激活，降低跨 PE 通信",
        "Leading Non-zero Detection (LNZD) 树：从各 PE 的激活队列中选择下一个非零输入，并通过 H-tree 广播给所有 PE",
        "间接权重查表：稀疏矩阵条目只保存权重码本索引和相对行偏移，算术单元查表恢复 16-bit 定点权重后执行 MAC",
        "片上 SRAM 优先：压缩后 AlexNet、VGG 等 FC 权重可驻留片上，避免高能耗 DRAM 访问",
        "关键收益叠加：片上 SRAM、权重稀疏、权重共享和零激活跳过分别贡献能耗/吞吐提升"
      ],
      "detail": "<h5>核心示意图</h5>\n<p><img alt=\"EIE 面向压缩 DNN 的推理流程\" src=\"https://ar5iv.labs.arxiv.org/html/1602.01528/assets/x1.png\" />\n<em>图 1：EIE 论文公开 ar5iv 版本中的总体流程图，展示压缩深度网络模型进入专用推理引擎执行机器学习应用。论文公开版本见 https://arxiv.org/abs/1602.01528。</em></p>\n<p><img alt=\"EIE LNZD 节点与处理单元架构\" src=\"https://ar5iv.labs.arxiv.org/html/1602.01528/assets/x4.png\" />\n<em>图 2：EIE 论文 Figure 4，左侧是 Leading Non-zero Detection 节点，右侧是 Processing Element。图源为 ar5iv 对论文图的公开转换。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># EIE 稀疏 FC 层推理伪代码：y = f(Wx + b)\n# W 使用 interleaved CSC；每个条目保存 (relative_row, weight_code)\n\nfor pe in PE_array:\n    pe.output_acc[:] = bias_slice(pe)\n    pe.activation_queue = collect_nonzero_inputs(x_slice(pe))\n\nwhile any(pe.activation_queue.not_empty() for pe in PE_array):\n    # LNZD tree 选择全局下一个非零输入激活，并广播给所有 PE\n    col, x_col = leading_nonzero_detect_and_broadcast(PE_array)\n\n    for pe in PE_array:\n        start, end = pe.pointer_sram[col], pe.pointer_sram[col + 1]\n        row = 0\n        for ptr in range(start, end):\n            rel_row, weight_code = pe.sparse_sram[ptr]\n            row += rel_row\n\n            # 4-bit 码本索引恢复 16-bit 定点权重\n            w = pe.codebook[weight_code]\n            pe.output_acc[row] += w * x_col\n\nfor pe in PE_array:\n    y_slice = relu_or_layer_activation(pe.output_acc)\n    write_next_layer_activations(pe, y_slice)\n</code></pre>\n<h5>动机与背景</h5>\n<p>Deep Compression 已经把大规模 DNN 的全连接层压缩到可以放入片上 SRAM 的规模，但这并不自动等价于高效推理。压缩模型带来三类通用处理器不擅长的模式：矩阵变稀疏后访存不连续，行索引变成相对偏移后需要逐项累加，权重共享又把每个权重变成码本索引，需要额外查表。CPU/GPU 的 SIMD/SIMT 执行更喜欢规则、连续、批量的矩阵乘；当 batch size 为 1 的实时推理需要执行稀疏 GEMV 时，线程负载不均和索引开销会吞掉大量理论收益。</p>\n<p>EIE 的目标不是重新提出压缩算法，而是把压缩后的表示变成硬件原生数据格式。对一个全连接层，核心计算仍是：</p>\n<div class=\"kb-math kb-math-display\">y = f(Wx + b)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">W</span> 是剪枝后的稀疏矩阵，<span class=\"kb-math kb-math-inline\">x</span> 是上一层 ReLU 后的激活向量，<span class=\"kb-math kb-math-inline\">b</span> 是偏置。因为 ReLU 会产生大量零激活，若 <span class=\"kb-math kb-math-inline\">x_j = 0</span>，则整列 <span class=\"kb-math kb-math-inline\">W_{:,j}</span> 对输出没有贡献；EIE 通过非零激活检测只广播 <span class=\"kb-math kb-math-inline\">x_j \\ne 0</span> 的列索引，让所有 PE 跳过零激活列对应的稀疏权重读出。</p>\n<h5>压缩表示与 PE 数据流</h5>\n<p>EIE 使用适配硬件的交错 CSC 表示。普通 CSC 对每列保存非零值和行索引；EIE 将非零值替换为 4-bit 权重码本索引，并将行号改为相对偏移：</p>\n<div class=\"kb-math kb-math-display\">\\text{entry}_k = (\\Delta r_k,\\; c_k), \\qquad\nw_k = \\mathrm{codebook}[c_k]</div>\n<p>这里 <span class=\"kb-math kb-math-inline\">\\Delta r_k</span> 是相对上一个非零位置的行偏移，<span class=\"kb-math kb-math-inline\">c_k</span> 是共享权重码本索引。一个稀疏矩阵 SRAM 条目可由 4-bit 行偏移和 4-bit 权重索引组成，算术单元读取后先累加得到目标输出行，再查表恢复定点权重。若两个相邻非零之间距离超过偏移字段可表示范围，则插入 padding zero 来延续相对索引；这会带来少量冗余计算，但让硬件条目保持固定宽度。</p>\n<p>PE 阵列采用交错切分而不是简单块切分，目的是让每个 PE 看到的非零分布更均衡。每个 PE 保存自己负责的权重切片、指针数组、权重码本和本地输出累加器。广播到来的非零激活 <span class=\"kb-math kb-math-inline\">(j, x_j)</span> 会触发所有 PE 读取自己切片中第 <span class=\"kb-math kb-math-inline\">j</span> 列的非零条目，各 PE 独立完成 <span class=\"kb-math kb-math-inline\">w_{ij}x_j</span> 并累加到本地输出寄存器。这样，输入激活广播是全局通信，输出累加保持局部，避免每个乘加都跨 PE 汇总。</p>\n<h5>LNZD、队列与零激活跳过</h5>\n<p>EIE 的 Leading Non-zero Detection 树解决的是“谁来提供下一个非零激活”的调度问题。每个 PE 维护激活队列，局部记录自己持有的非零输入；树形 LNZD 节点从子节点候选中选出下一项，再由根节点通过 H-tree 广播给所有 PE。这个结构让非零激活发现和广播的线长随 PE 数量扩展得更平滑，也避免中央控制器逐一扫描完整激活向量。</p>\n<p>零激活跳过的收益可用稀疏矩阵向量乘的工作量表达。稠密 FC 层需要约 <span class=\"kb-math kb-math-inline\">mn</span> 次乘加；若权重非零率为 <span class=\"kb-math kb-math-inline\">\\rho_W</span>，激活非零率为 <span class=\"kb-math kb-math-inline\">\\rho_x</span>，理想有效乘加约为：</p>\n<div class=\"kb-math kb-math-display\">\\mathrm{MAC}_{\\mathrm{EIE}} \\approx \\rho_W \\rho_x mn</div>\n<p>这解释了为什么 EIE 特别适合 batch size 为 1 的延迟敏感推理：没有大 batch 来摊薄稀疏索引开销时，直接避免无效列和无效权重访问比把稀疏矩阵转回稠密计算更有效。论文报告中，片上 SRAM、稀疏性、权重共享和零激活跳过是相互叠加的能效来源。</p>\n<h5>与通用 CPU/GPU 和传统加速器的区别</h5>\n<p>CPU 上的稀疏 BLAS 通常要处理通用 CSR/CSC，格式灵活但每个非零都携带较高索引开销；GPU 的 cuSPARSE 更依赖大规模并行和规则行长度，面对 FC 层单样本 GEMV 时容易出现线程束内负载不均。EIE 把格式约束收紧到压缩 DNN 的固定场景：4-bit 码本、相对索引、列指针、本地输出寄存器和固定宽 SRAM 读出，使索引处理成为流水线的一部分。</p>\n<p>与只做稠密矩阵乘的早期 DNN 加速器相比，EIE 的核心创新是“不解压再计算”。如果先把压缩权重恢复成稠密矩阵，就会重新引入 DRAM/SRAM 容量和带宽压力；EIE 则在压缩域中读取码本索引和偏移，边解码边乘加。代价是硬件更专用，主要覆盖剪枝加权重共享后的 FC/GEMV 型工作负载；收益是在当时的实时推理场景中获得远高于通用处理器的能效。</p>\n<div class=\"key-point\">💡 关键：EIE 的价值来自算法表示和硬件数据通路共同设计。Deep Compression 负责让模型小而稀疏，EIE 负责让“小而稀疏”不再变成通用硬件上的不规则执行负担。</div>",
      "quiz": {
        "q": "EIE 为什么要用 Leading Non-zero Detection (LNZD) 树？",
        "options": [
          "在每个 PE 内训练新的权重码本",
          "从分布式激活队列中选择非零输入并广播，跳过 ReLU 产生的零激活列",
          "把 4-bit 权重索引恢复成 32-bit 浮点权重",
          "将全连接层转换成卷积层以复用 Winograd 算法"
        ],
        "answer": 1,
        "explain": "LNZD 树负责发现并广播下一个非零输入激活，使 PE 阵列只读取该列的稀疏权重；零激活对应的整列计算可以直接跳过。"
      }
    },
    {
      "id": "bnn",
      "num": 43,
      "name": "BNN",
      "fullName": "二值神经网络 (Binarized Neural Networks)",
      "year": "2016",
      "org": "MILA",
      "parent": "—",
      "paperUrl": "—",
      "projectUrl": "",
      "category": "efficiency",
      "motivation": "权重和激活限制为1位极大简化硬件乘法器",
      "summary": "BNN 提出在运行时将权重和激活都约束为 \\(\\{-1,+1\\}\\) 的训练方法，用 Sign 二值化和直通估计器解决离散化不可导问题。它把大部分乘加替换为 XNOR 与 popcount，使神经网络推理更适合位级并行硬件。",
      "keyPoints": [
        "同时二值化权重和激活：隐藏层推理主要使用 1-bit 值，显著减少模型存储和中间激活访问",
        "训练保留实值影子权重：前向/反向使用二值权重，参数更新在实值权重上完成，并裁剪到 <span class=\"kb-math kb-math-inline\">[-1,1]</span>",
        "使用 Sign 二值化：确定性二值化取符号，随机二值化按裁剪概率采样",
        "用 Straight-Through Estimator 反传：在 <span class=\"kb-math kb-math-inline\">|r| \\le 1</span> 的饱和区间内传递梯度，区间外截断梯度",
        "位运算替代乘法：二值向量点积可通过 XNOR 统计相同符号位，再用 popcount 得到结果",
        "引入 shift-based BatchNorm 与 shift-based AdaMax：用近似 2 的幂和位移减少训练时乘除法",
        "在 MNIST、CIFAR-10、SVHN 上接近当时非二值模型效果，并给出二值矩阵乘 GPU kernel 的加速验证"
      ],
      "detail": "<h5>核心示意图</h5>\n<p><img alt=\"BNN CIFAR-10 训练曲线\" src=\"https://ar5iv.labs.arxiv.org/html/1602.02830/assets/training_curves.png\" />\n<em>图 1：BNN 论文 Figure 1，比较 CIFAR-10 ConvNet 在不同二值化方法下的训练损失和验证错误率。图源为 ar5iv 对论文公开版本的转换；论文公开版本见 https://arxiv.org/abs/1602.02830。</em></p>\n<p><img alt=\"BNN 二值 GPU kernel 对比\" src=\"https://ar5iv.labs.arxiv.org/html/1602.02830/assets/kernels.png\" />\n<em>图 2：BNN 论文 Figure 3，展示普通矩阵乘 kernel 与二值矩阵乘 kernel 的运行时间对比。该图用于说明二值运算可以映射到位级并行执行。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># BNN 训练伪代码：保留实值权重 W_real，用二值权重/激活计算\nfor minibatch in data:\n    a = minibatch.inputs\n    binary_cache = []\n\n    # forward\n    for layer in layers:\n        Wb = sign(layer.W_real)               # {-1, +1}\n        ab = sign(a) if not layer.is_first else quantize_input_bits(a)\n        z = binary_matmul(Wb, ab)             # XNOR + popcount 或等价整数计算\n        a = batch_norm(z, layer.bn_params)\n        binary_cache.append((Wb, ab, z))\n\n    loss = criterion(a, minibatch.labels)\n\n    # backward with straight-through estimator\n    grad = dloss_da(loss)\n    for layer in reversed(layers):\n        grad = backprop_batch_norm(grad, layer.bn_params)\n        grad_Wb, grad_ab = binary_layer_backward(grad, binary_cache[layer])\n        grad_W_real = grad_Wb * indicator(abs(layer.W_real) &lt;= 1)\n        layer.W_real = optimizer_update(layer.W_real, grad_W_real)\n        layer.W_real = clip(layer.W_real, -1, 1)\n        grad = grad_ab\n</code></pre>\n<h5>二值化机制</h5>\n<p>BNN 的核心约束是把连续值 <span class=\"kb-math kb-math-inline\">r</span> 映射到 1-bit 符号值。确定性二值化最简单：</p>\n<div class=\"kb-math kb-math-display\">x^b = \\mathrm{Sign}(x) =\n\\begin{cases}\n+1, &amp; x \\ge 0 \\\\\n-1, &amp; x &lt; 0\n\\end{cases}</div>\n<p>论文也讨论随机二值化，即令 <span class=\"kb-math kb-math-inline\">x^b</span> 以与 <span class=\"kb-math kb-math-inline\">x</span> 相关的概率取 <span class=\"kb-math kb-math-inline\">+1</span>。常见写法是：</p>\n<div class=\"kb-math kb-math-display\">P(x^b = +1) = \\sigma(x) = \\mathrm{clip}\\left(\\frac{x+1}{2}, 0, 1\\right)</div>\n<p>随机版本能表达量化不确定性，但需要随机数生成，硬件和训练实现更贵；确定性 Sign 计算便宜，论文的 Theano 实验主要使用确定性激活二值化。无论哪种方式，运行时层间传递的是二值激活，权重也以二值形式参与前向计算。</p>\n<h5>梯度如何穿过 Sign</h5>\n<p>Sign 函数几乎处处导数为 0，直接反向传播会让梯度消失。BNN 采用 Straight-Through Estimator (STE)：前向仍执行离散 Sign，反向则近似认为 Sign 在未饱和区间内像 hard-tanh 一样可导，在过大或过小的输入处截断梯度：</p>\n<div class=\"kb-math kb-math-display\">\\frac{\\partial C}{\\partial r}\n\\approx\n\\frac{\\partial C}{\\partial q}\\mathbf{1}_{|r|\\le 1},\n\\qquad q=\\mathrm{Sign}(r)</div>\n<p>这个设计的直觉是：如果实值影子权重 <span class=\"kb-math kb-math-inline\">r</span> 已经远离 0，改变它的幅度不会改变二值权重的符号，继续传递大梯度只会让实值权重发散。因此 BNN 在更新后把实值权重裁剪到 <span class=\"kb-math kb-math-inline\">[-1,1]</span>，既配合 STE 的有效区间，也防止权重尺度无意义增大。</p>\n<h5>位级矩阵乘</h5>\n<p>当权重 <span class=\"kb-math kb-math-inline\">w_i</span> 和激活 <span class=\"kb-math kb-math-inline\">x_i</span> 都属于 <span class=\"kb-math kb-math-inline\">\\{-1,+1\\}</span> 时，乘法只有“符号相同得 +1、符号不同得 -1”两种结果。将 <span class=\"kb-math kb-math-inline\">-1/+1</span> 编码成 0/1 后，符号相同可由 XNOR 得到。长度为 <span class=\"kb-math kb-math-inline\">n</span> 的二值点积可写成：</p>\n<div class=\"kb-math kb-math-display\">\\sum_{i=1}^{n} w_i x_i\n= 2\\cdot \\mathrm{popcount}(\\mathrm{xnor}(w_{\\mathrm{bits}}, x_{\\mathrm{bits}})) - n</div>\n<p>这使得多个乘法可以打包进一个机器字或 SIMD lane 中同时处理。硬件上不再需要通用乘法器阵列，而是使用 XNOR 门、位计数器和少量整数加法器。对内存系统而言，1-bit 权重和激活还把带宽压力降低到 32-bit 浮点表示的约 <span class=\"kb-math kb-math-inline\">1/32</span>，这通常比单个算术操作的节省更关键。</p>\n<h5>训练/推理流程与边界</h5>\n<p>BNN 训练时并不是只保存二值权重。若直接在 <span class=\"kb-math kb-math-inline\">\\{-1,+1\\}</span> 上做小步梯度更新，参数几乎无法表达“接近翻转但尚未翻转”的状态；因此论文保留实值权重 <span class=\"kb-math kb-math-inline\">W</span>，每次前向临时生成 <span class=\"kb-math kb-math-inline\">W^b=\\mathrm{Sign}(W)</span>，反向用 STE 得到近似梯度，再更新并裁剪实值 <span class=\"kb-math kb-math-inline\">W</span>。推理时才可以丢弃实值影子权重，只保留二值权重、BatchNorm 参数和必要的第一层输入量化逻辑。</p>\n<p>第一层是 BNN 的一个特殊点：原始图像输入通常不是二值，而是 8-bit 或浮点像素。论文指出视觉模型第一层通道数较少，计算占比通常小于内部卷积层；也可以把 8-bit 输入拆成 bit-plane，与二值权重做多次位运算再按位权重求和。最后一层是否二值化也常按任务实现调整，因为分类 logits 有时需要更高精度表达。</p>\n<p>与 BinaryConnect 只二值化权重相比，BNN 同时二值化激活，因此硬件收益更大：中间特征图也能用 1-bit 存储和传输，层与层之间不必恢复成高精度表示。但这也让优化更难，对 BatchNorm、初始化、学习率和 STE 细节更敏感。BNN 的贡献在于给出一套可训练流程，证明极端 1-bit 约束并不只是推理后处理，而可以纳入端到端训练。</p>\n<div class=\"warn-box\">⚠️ 注意：BNN 的“乘法器消失”主要适用于二值化后的隐藏层矩阵乘/卷积；BatchNorm、第一层输入处理、输出层和训练时实值权重更新仍可能需要更高精度计算。</div>",
      "quiz": {
        "q": "BNN 使用 Straight-Through Estimator 的主要目的是什么？",
        "options": [
          "把二值权重压缩成 Huffman 码",
          "在反向传播中近似穿过不可导的 Sign 二值化函数",
          "让所有 BatchNorm 参数固定为 0",
          "把稀疏矩阵转换成 CSR 格式"
        ],
        "answer": 1,
        "explain": "Sign 函数几乎处处导数为 0，STE 在未饱和区间内近似传递梯度，使实值影子权重可以通过梯度下降学习。"
      }
    },
    {
      "id": "ampere_24_sparsity",
      "num": 44,
      "name": "Ampere 2:4 Sparsity HW",
      "fullName": "安培2:4稀疏硬件 (Ampere 2:4 Structured Sparsity)",
      "year": "2020",
      "org": "NVIDIA",
      "parent": "ampere_sparse",
      "paperUrl": "https://www.nvidia.com/content/dam/en-zz/Solutions/Data-Center/nvidia-ampere-architecture-whitepaper.pdf",
      "projectUrl": "",
      "category": "efficiency",
      "motivation": "Ampere架构原生2:4结构化稀疏硬件支持",
      "summary": "Ampere 2:4 Structured Sparsity 在第三代 Tensor Core 中加入 Sparse MMA 路径，要求每 4 个连续权重中至少 2 个为零，从而用少量元数据跳过一半乘法。它解决了任意非结构化稀疏难以在 GPU Tensor Core 上规则调度的问题，以局部结构约束换取接近 2 倍的矩阵乘吞吐上限。",
      "keyPoints": [
        "硬件约束是 2:4 结构化稀疏：每个连续 4 元组保留最多 2 个非零权重，形成固定 50% 稀疏率",
        "Sparse Tensor Core/Sparse MMA 跳过零权重对应乘法，只处理压缩后的非零值和位置元数据",
        "数据格式由 values + metadata 组成：values 保存两个非零权重，metadata 编码它们在 4 元组中的位置",
        "典型部署流程：稠密训练或加载预训练模型 → 按 2:4 规则剪枝 → 固定 mask 微调恢复精度 → 压缩权重 → TensorRT/cuSPARSELt 推理",
        "适合 GEMM 和卷积中的大矩阵乘路径，尤其是 FC、1x1 conv、Transformer FFN/投影层等权重主导算子",
        "相比非结构化稀疏牺牲模式自由度，但换来固定工作量、规则访存和 Tensor Core 原生指令支持",
        "端到端加速受非稀疏算子、矩阵尺寸、数据类型、布局转换、batch size 和内存带宽共同限制"
      ],
      "detail": "<h5>核心示意图</h5>\n<p><img alt=\"Ampere 2:4 结构化稀疏模式与压缩\" src=\"https://developer-blogs.nvidia.com/wp-content/uploads/2023/06/2-4-structured-sparsity-pattern.png\" />\n<em>图 1：NVIDIA 技术博客展示的 2:4 结构化稀疏模式；每 4 个连续值中至少 2 个为零，压缩后只保存非零值和索引元数据。白皮书中的 Sparse MMA 章节给出同一硬件机制。</em></p>\n<p><img alt=\"Ampere 结构化稀疏基础训练流程\" src=\"https://developer-blogs.nvidia.com/wp-content/uploads/2023/06/basic-training-recipe.png\" />\n<em>图 2：NVIDIA 技术博客给出的基础训练 recipe：先训练稠密模型，再剪成 2:4 稀疏模式，并在保持 mask 的情况下重训练/微调恢复精度。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># Ampere 2:4 pruning + Sparse MMA 推理伪代码\ndef make_2_4_sparse(weight, group_axis=-1):\n    sparse = zeros_like(weight)\n    metadata = []\n\n    for group in iterate_contiguous_groups(weight, size=4, axis=group_axis):\n        keep = topk(abs(group.values), k=2).indices\n        sparse[group.positions[keep]] = group.values[keep]\n        metadata.append(encode_positions_2_of_4(keep))\n\n    return sparse, metadata\n\n# 1. 稠密训练或加载预训练权重\nweight_dense = train_or_load_dense_model()\n\n# 2. 生成 2:4 mask，并在微调中保持该结构\nweight_sparse, meta = make_2_4_sparse(weight_dense)\nmask = weight_sparse != 0\nfor batch in finetune_data:\n    loss = model(batch, weights=weight_sparse)\n    loss.backward()\n    weight_dense = optimizer.step(weight_dense)\n    weight_sparse = weight_dense * mask\n\n# 3. 部署：压缩 values + metadata，调用 Sparse Tensor Core 路径\nvalues, metadata = compress_2_4(weight_sparse)\noutput = sparse_mma(activation_dense, values, metadata)\n</code></pre>\n<h5>2:4 约束为什么适合硬件</h5>\n<p>任意非结构化稀疏只规定“哪些权重为零”，不规定零的位置。算法上它最灵活，但硬件执行必须面对可变长度索引、随机访存和线程负载不均：有些行可能有很多非零，有些行几乎没有非零。Tensor Core 的强项是固定形状矩阵块上的高吞吐 MMA；如果每个小块的有效乘法数量不固定，调度和数据供给都会变复杂。</p>\n<p>Ampere 的 2:4 规则把稀疏自由度限制在很小的局部窗口中：</p>\n<div class=\"kb-math kb-math-display\">\\forall g_i=(w_{4i},w_{4i+1},w_{4i+2},w_{4i+3}),\\qquad\n\\|g_i\\|_0 \\le 2</div>\n<p>因此每个 4 元组最多只有两个权重参与乘法。硬件可以把权重压缩为两个 value 加一个固定宽度 metadata，Sparse MMA 根据 metadata 从 dense activation 中选择对应元素相乘。由于每个组的非零数量固定，warp 内工作量和数据读取节奏可预测，这正是它比通用稀疏格式更容易进入 Tensor Core 数据通路的原因。</p>\n<h5>Sparse MMA 的计算模型</h5>\n<p>白皮书描述的 Sparse MMA 可以看成把矩阵 <span class=\"kb-math kb-math-inline\">A</span> 的 2:4 稀疏权重块与稠密矩阵 <span class=\"kb-math kb-math-inline\">B</span> 相乘。稠密 MMA 会对完整 <span class=\"kb-math kb-math-inline\">16\\times 8\\times 16</span> 形状执行乘加；Sparse MMA 识别 <span class=\"kb-math kb-math-inline\">A</span> 中满足 50% 结构化稀疏的零值，只对非零权重和 <span class=\"kb-math kb-math-inline\">B</span> 的对应元素执行乘加，从而把有效乘法数量减半。</p>\n<p>对单个 4 元组，稠密点积片段为：</p>\n<div class=\"kb-math kb-math-display\">s = \\sum_{k=0}^{3} w_k x_k</div>\n<p>若 metadata 表示保留位置集合 <span class=\"kb-math kb-math-inline\">P \\subset \\{0,1,2,3\\}</span>，且 <span class=\"kb-math kb-math-inline\">|P|=2</span>，Sparse Tensor Core 实际执行：</p>\n<div class=\"kb-math kb-math-display\">s_{\\mathrm{sparse}} = \\sum_{k\\in P} w_k x_k</div>\n<p>这不是近似跳过任意小值，而是模型权重已经被剪枝并微调后，零权重被视为结构的一部分。硬件只保证对满足格式的矩阵乘更快；能否保持精度取决于剪枝和恢复训练。</p>\n<h5>训练、压缩与部署流程</h5>\n<p>基础 recipe 通常先训练稠密模型，再在目标层按每 4 个权重保留绝对值最大的 2 个生成 mask。随后微调时保持 mask 不变：被剪掉的位置持续为 0，保留位置继续学习以吸收精度损失。这个流程可写成：</p>\n<div class=\"kb-math kb-math-display\">W_{\\mathrm{sparse}} = W \\odot M,\\qquad\nM_g = \\mathrm{Top2Mask}(|W_g|)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">W_g</span> 是某个 4 元组，<span class=\"kb-math kb-math-inline\">M_g</span> 只在绝对值最大的两个位置取 1。对更敏感的模型，可以使用 progressive sparsity：先达到较低稀疏率并微调，再逐步推进到 2:4 的 50% 稀疏，让模型有更多机会重新分配信息。</p>\n<p>部署时，框架或库需要确认权重布局、数据类型和维度对齐满足 Sparse Tensor Core 要求。TensorRT 可以在构建 engine 时启用 sparse weights；cuSPARSELt 则提供结构化矩阵描述、剪枝检查、压缩和 matmul plan。实际加速通常出现在足够大的 GEMM/Conv 上；若矩阵太小，metadata 解码、压缩转换或 kernel launch 开销可能抵消 Sparse MMA 的理论 2 倍收益。</p>\n<h5>与传统稀疏和块稀疏的区别</h5>\n<p>非结构化稀疏在精度上通常更友好，因为它可以在全局任意位置保留重要权重；但在 GPU 上，非零分布不规则会破坏 coalesced memory access 和 Tensor Core 块级执行。块稀疏把矩阵切成大块，整块保留或删除，硬件更规则，但粒度太粗时容易剪掉有用连接。2:4 位于两者之间：局部窗口很小，精度损失比大块稀疏更容易恢复；每组非零数固定，硬件又比任意稀疏更容易解码。</p>\n<div class=\"key-point\">💡 关键：Ampere 2:4 稀疏不是“看到零就自动加速”的通用压缩，而是要求模型权重提前满足特定局部模式；只有 values、metadata、矩阵布局和 Sparse MMA 指令路径全部匹配时，硬件吞吐优势才会出现。</div>",
      "quiz": {
        "q": "Ampere 2:4 结构化稀疏能被 Sparse Tensor Core 高效执行的关键条件是什么？",
        "options": [
          "每个连续 4 个权重中至少 2 个为零，并保存非零值的位置元数据",
          "所有权重都必须变成 0",
          "矩阵必须使用 32-bit 浮点且不能压缩",
          "只要模型中任意位置存在零值就会自动获得 2 倍端到端加速"
        ],
        "answer": 0,
        "explain": "Sparse Tensor Core 依赖固定 2:4 模式和 metadata 来选择有效乘法；任意零值或不满足布局的数据无法直接走该硬件路径。"
      }
    },
    {
      "id": "sageattention3",
      "num": 45,
      "name": "SageAttention3",
      "fullName": "微缩放FP4注意力机制 (SageAttention3 Microscaling FP4 Attention)",
      "year": "2026",
      "org": "NeurIPS",
      "parent": "—",
      "paperUrl": "https://proceedings.neurips.cc/paper_files/paper/2025/hash/4db397e0f760cc573c681e81a01a3dba-Abstract-Conference.html",
      "projectUrl": "",
      "category": "efficiency",
      "motivation": "微缩放FP4注意力机制大幅提升推理能效",
      "summary": "SageAttention3 提出面向 Blackwell FP4 Tensor Core 的微缩放 FP4 注意力，把注意力中的 \\(QK^\\top\\) 与 \\(PV\\) 两个矩阵乘压到 NVFP4 路径，同时为训练探索 8-bit 前向/反向注意力，解决长序列注意力在推理和微调中的算力瓶颈。",
      "keyPoints": [
        "首个面向推理的 FP4 attention 实现，在 RTX5090 上达到 1038 TOPS，论文报告相对 RTX5090 上最快 FlashAttention 约 5 倍 kernel 加速",
        "使用 NVFP4 而非 MXFP4：E2M1 数据、1x16 微块量化、E4M3 FP8 scale，使 FP4 只有 15 个可表示值时仍能维持注意力精度",
        "对 <span class=\"kb-math kb-math-inline\">Q,K,V</span> 使用微缩放 FP4 量化，并复用 SageAttention2 的 Smooth-K / Smooth-Q 处理以抑制离群值",
        "对 attention map <span class=\"kb-math kb-math-inline\">P=\\mathrm{Softmax}(QK^\\top)</span> 引入两级量化：先逐 token 拉伸到更宽范围，再做 FP4 microscaling，缓解 E4M3 scale 动态范围利用不足",
        "在 kernel 侧结合 FP4MM、online softmax、列置换、shuffle 复用和 producer-warp epilogue，减少 FP4 量化额外开销",
        "额外提出 SageBwd 训练路径：前向和反向 attention 中 7 个矩阵乘的 6 个使用 INT8，最敏感的 <span class=\"kb-math kb-math-inline\">\\mathbf{dO}_i\\mathbf{V}_j^\\top</span> 保持 FP16",
        "实验覆盖 CogVideoX、HunyuanVideo、Mochi、Flux、Stable Diffusion 3.5、Qwen2.5、Llama3.2 等模型；推理质量基本无损，SageBwd 在指令微调中无损但预训练收敛较慢"
      ],
      "detail": "<h5>核心示意图</h5>\n<p><img alt=\"SageAttention3 微缩放 FP4 attention 工作流\" src=\"https://arxiv.org/html/2505.11594/x2.png\" />\n<em>图：SageAttention3 Figure 2，来源为 arXiv HTML 论文图。流程展示先平滑 <span class=\"kb-math kb-math-inline\">Q,K,V</span>，再对 <span class=\"kb-math kb-math-inline\">Q,K,V</span> 和 attention map <span class=\"kb-math kb-math-inline\">P</span> 做 FP4 microscaling，并用 FP4MM 完成两次注意力矩阵乘。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># SageAttention3 microscaling FP4 attention 的简化流程\ndef msquant_fp4(x, group_shape=(1, 16), scale_dtype=&quot;e4m3&quot;, value_dtype=&quot;e2m1&quot;):\n    q_blocks, scales = [], []\n    for block in split_into_blocks(x, group_shape):\n        # 每个 1x16 微块共享一个 FP8 scale，值本身量化为 FP4 E2M1\n        s = quantize_to_fp8_e4m3(max_abs(block) / fp4_e2m1_max())\n        q = round_to_fp4_e2m1(block / s)\n        q_blocks.append(pack_fp4(q))\n        scales.append(s)\n    return q_blocks, scales\n\ndef sageattention3_forward(Q, K, V, block_q, block_kv):\n    K = smooth_k(K)  # 继承 SageAttention 系列的离群值平滑\n    O = zeros_like_attention_output(Q, V)\n\n    Q_tiles = tile_rows(Q, block_q)\n    K_tiles = tile_rows(K, block_kv)\n    V_tiles = tile_rows(V, block_kv)\n\n    qQ_all, sQ_all = [], []\n    for Qi in Q_tiles:\n        Qi = smooth_q(Qi)\n        qQi, sQi = msquant_fp4(Qi, group_shape=(1, 16))\n        qQ_all.append(qQi)\n        sQ_all.append(sQi)\n\n    for i, (qQi, sQi) in enumerate(zip(qQ_all, sQ_all)):\n        running_softmax = OnlineSoftmaxState()\n        partial_O = 0\n\n        for Kj, Vj in zip(K_tiles, V_tiles):\n            qKj, sKj = msquant_fp4(permute_for_fp4mma(Kj), group_shape=(1, 16))\n            qVj, sVj = msquant_fp4(Vj, group_shape=(1, 16))\n\n            # 第一次 FP4MM: 近似 S_ij = Q_i K_j^T，并接 online softmax\n            Sij = fp4mma(qQi, qKj.T, sQi, sKj, accumulate=&quot;fp32&quot;)\n            Pij = running_softmax.update(Sij)\n\n            # 两级量化: 先逐 token 扩展 P 的范围，再做 FP4 microscaling\n            P_scaled, row_scale = per_token_quantize(Pij, target_range=(0, 448 * 6))\n            qPij, sPij = msquant_fp4(P_scaled, group_shape=(1, 16))\n\n            # 第二次 FP4MM: 近似 O_ij = P_ij V_j\n            partial_O += fp4mma(qPij, qVj, sPij * row_scale, sVj, accumulate=&quot;fp32&quot;)\n\n        O[i] = partial_O\n    return O\n</code></pre>\n<h5>FP4 attention 的基本机制</h5>\n<p>标准注意力由两次矩阵乘和一次 softmax 组成：</p>\n<div class=\"kb-math kb-math-display\">S = QK^\\top,\\qquad P=\\mathrm{Softmax}(S),\\qquad O=PV.</div>\n<p>FlashAttention 的关键是分块计算并用 online softmax 避免把完整 <span class=\"kb-math kb-math-inline\">S</span> 与 <span class=\"kb-math kb-math-inline\">P</span> 写回显存；SageAttention3 沿用这个分块数据流，但把两次矩阵乘都改成 Blackwell 支持的 FP4 microscaling matrix multiply。对任意块 <span class=\"kb-math kb-math-inline\">X</span>，其微缩放量化可以理解为</p>\n<div class=\"kb-math kb-math-display\">(\\widehat X, s_X)=\\mathrm{MSQuant}_{\\mathrm{FP4}}(X),\\qquad\nX\\approx s_X\\widehat X,</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\widehat X</span> 是 packed FP4 E2M1 值，<span class=\"kb-math kb-math-inline\">s_X</span> 是 FP8 E4M3 scale。于是两次注意力乘法变成</p>\n<div class=\"kb-math kb-math-display\">\\widetilde S_{ij}\n=\\mathrm{FP4MM}(\\widehat Q_i,\\widehat K_j^\\top,s_{Q_i},s_{K_j}),\\qquad\n\\widetilde O_{ij}\n=\\mathrm{FP4MM}(\\widehat P_{ij},\\widehat V_j,s_{P_{ij}},s_{V_j}).</div>\n<p>这个设计的主要难点不是调用 FP4 指令本身，而是如何让 FP4 的 15 个有效取值覆盖注意力张量的局部分布。论文选择 NVFP4，是因为它使用 1x16 的微块 scale；离群值只污染一个小块，不会像 per-tensor 或过粗粒度 block 那样把整行/整块压到很低分辨率。论文中 CogVideoX 真实 <span class=\"kb-math kb-math-inline\">Q,K,V</span> 的 ablation 显示，NVFP4 的相似度、L1 和 RMSE 明显优于 MXFP4。</p>\n<h5>为什么 <span class=\"kb-math kb-math-inline\">P</span> 需要两级量化</h5>\n<p>attention map <span class=\"kb-math kb-math-inline\">P</span> 的数值通常在 <span class=\"kb-math kb-math-inline\">[0,1]</span>，而且 softmax 后大量值非常小。如果直接对 <span class=\"kb-math kb-math-inline\">P</span> 做 FP4 microscaling，每个微块的 scale 大多落在很窄的范围内；硬件又要求 scale 用 FP8 E4M3 表示，E4M3 的可表示范围没有被充分利用，scale 自身的舍入误差会被放大。SageAttention3 因此先做逐 token 量化，把每行 <span class=\"kb-math kb-math-inline\">P</span> 映射到更宽的 <span class=\"kb-math kb-math-inline\">[0,448\\times 6]</span> 区间，再对这个中间表示做 FP4 微缩放：</p>\n<div class=\"kb-math kb-math-display\">P \\xrightarrow{\\text{per-token scale}} P^{(1)}\n\\xrightarrow{\\mathrm{MSQuant}_{\\mathrm{FP4}}}\n(\\widehat P, s_P).</div>\n<p>直觉上，第一层 scale 负责把 softmax 概率从“过小、过窄”的区间拉出来，第二层 microscaling 再把局部 1x16 块贴到 FP4 网格上。论文 Figure 3 的分布分析显示，两级量化能显著降低 <span class=\"kb-math kb-math-inline\">P</span> 的表示误差；Table 1 的 ablation 中，两级方案比直接量化有更高余弦相似度和更低 RMSE。</p>\n<h5>kernel 级优化为何必要</h5>\n<p>如果只把数据类型换成 FP4，attention kernel 不一定变快，因为量化、scale 加载、寄存器布局和线程间 shuffle 会吞掉 Tensor Core 收益。SageAttention3 的实现围绕 Blackwell FP4MM 做了三类工程优化。第一，FP4 MatMul 的 FP32 accumulator 布局与 operand A 寄存器布局不一致，论文选择置换 <span class=\"kb-math kb-math-inline\">K</span> 的列，使结果布局天然对齐，避免在主循环里做昂贵的 thread shuffle。</p>\n<p>第二，<span class=\"kb-math kb-math-inline\">\\widetilde P</span> 的 1x16 微块量化需要找连续 16 个元素的最大值，而这些元素跨多个线程。论文把这个 max reduction 与 online softmax 已经要做的行内最大值计算融合起来，复用部分 shuffle 和 max 操作，减少约一半冗余同步。第三，常规 warp-specialized kernel 常让 consumer warp 既做 MatMul 又做 store；SageAttention3 受寄存器压力限制，改成 producer warp 之间 ping-pong，一个加载下一块，一个把上一块结果写回，让 consumer warp 专注于把 MatMul 结果从寄存器搬到 shared memory。</p>\n<div class=\"key-point\">💡 关键：SageAttention3 的速度来自“FP4 Tensor Core + FlashAttention 数据流 + scale/布局工程”共同作用。只做离线 FP4 量化而没有在线 softmax、两级 <span class=\"kb-math kb-math-inline\">P</span> scale 和 FP4MM 布局优化，很难复现论文中的 1000+ TOPS。</div>\n<h5>SageBwd: 低比特注意力用于训练的边界</h5>\n<p>论文的第二部分探索训练 attention。前向 attention 可以用 INT8 per-block 量化 <span class=\"kb-math kb-math-inline\">Q,K,V</span>，并对 <span class=\"kb-math kb-math-inline\">P</span> 做 per-token 量化；反向 attention 有五个核心矩阵乘：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{dP}_{ij}=\\mathbf{dO}_i\\mathbf{V}_j^\\top,\\qquad\n\\mathbf{dQ}_i \\leftarrow \\mathbf{dQ}_i+\\mathbf{dS}_{ij}\\mathbf{K}_j,</div>\n<div class=\"kb-math kb-math-display\">\\mathbf{dK}_j \\leftarrow \\mathbf{dK}_j+\\mathbf{dS}_{ij}^\\top\\mathbf{Q}_i,\\qquad\n\\mathbf{dV}_j \\leftarrow \\mathbf{dV}_j+\\mathbf{P}_{ij}^\\top\\mathbf{dO}_i.</div>\n<p>SageBwd 的经验结论是：<span class=\"kb-math kb-math-inline\">\\mathbf{dO}_i\\mathbf{V}_j^\\top</span> 不能量化到 INT8，因为 <span class=\"kb-math kb-math-inline\">\\mathbf{dP}</span> 会继续进入 softmax backward 形成 <span class=\"kb-math kb-math-inline\">\\mathbf{dS}</span>，再沿序列长度递推影响 <span class=\"kb-math kb-math-inline\">\\mathbf{dQ}</span> 和 <span class=\"kb-math kb-math-inline\">\\mathbf{dK}</span>。这个位置的误差会累积，而其他矩阵乘的误差更局部。因此最终策略是在 7 个 attention 相关矩阵乘中加速 6 个，保留最敏感的 <span class=\"kb-math kb-math-inline\">\\mathbf{dO}_i\\mathbf{V}_j^\\top</span> 为 FP16。实验显示这种 8-bit attention 在指令微调上能对齐 BF16，但预训练收敛速度变慢，说明低比特 training attention 可行但还不是通用替代品。</p>\n<p>资料来源：NeurIPS 2025 论文页 https://proceedings.neurips.cc/paper_files/paper/2025/hash/4db397e0f760cc573c681e81a01a3dba-Abstract-Conference.html；arXiv HTML/PDF https://arxiv.org/abs/2505.11594；官方实现 https://github.com/thu-ml/SageAttention。</p>",
      "quiz": {
        "q": "SageAttention3 为什么要对 attention map P 使用两级量化，而不是直接做 FP4 microscaling？",
        "options": [
          "因为 P 的值集中在较小范围，直接量化会让 E4M3 scale 动态范围利用不足",
          "因为 P 必须存成 INT4 才能进入 softmax",
          "因为 Blackwell FP4 Tensor Core 不支持 V 矩阵输入",
          "因为两级量化可以完全取消 online softmax"
        ],
        "answer": 0,
        "explain": "P 来自 softmax，数值多在 [0,1] 且大量接近 0；先逐 token 扩展范围再做 microscaling，可以更好利用 FP8 E4M3 scale 并降低 FP4 表示误差。"
      }
    },
    {
      "id": "atropos",
      "num": 46,
      "name": "Atropos",
      "fullName": "稀疏Transformer处理器 (Atropos Sparse Transformer Processor)",
      "year": "2026",
      "org": "IEEE",
      "parent": "ampere_24_sparsity",
      "paperUrl": "https://ieeexplore.ieee.org/abstract/document/11435429/",
      "projectUrl": "",
      "category": "efficiency",
      "motivation": "12nm稀疏处理器达18.1TFLOPs/W能效比",
      "summary": "Atropos 是一颗 12 nm 稀疏 Transformer 推理处理器，用第一层输出熵统一驱动提前退出、FP4/FP8 混合精度和细粒度电压频率缩放，在 BERT/ALBERT 类边缘推理中把输入复杂度直接转化为延迟与能耗预算。",
      "keyPoints": [
        "12 nm FinFET Transformer processor，核心面积约 4.60 mm²，集成在含 RISC-V CPU、systolic array 与 scratchpad 的 64 mm² SoC 中",
        "以中间分类输出的 self-entropy <span class=\"kb-math kb-math-inline\">H(z^{(\\ell)})</span> 作为统一控制信号，判断是否提前退出、预测退出层、选择 FP4/FP8 精度并设置 V/F",
        "提前退出从逐层被动判断改成第一层后预测退出深度；SST-2 上平均推理深度约 3.9/12 层，论文报告 BERT 推理延迟最高降低 6.13 倍",
        "混合精度 MAC 支持 FP8 E4M3 与 FP4 E3M0；FP4 路径用 per-vector exponent bias 补偿动态范围，实现更高吞吐而避免 per-tensor FP4 精度崩溃",
        "电源管理使用 cell-based PMOS power header、free-running LDO 与 DCO，查表选择 16 组 V/F 点，在单 query/prompt 粒度缩放供电和频率",
        "稀疏执行还包括 attention head pruning、bit-mask encoder/decoder、256 KB data SRAM 与 32 KB mask SRAM，减少无效 attention head 与稀疏元素搬运",
        "论文报告峰值能效 18.1 TFLOPs/W、65 mJ/inference，并相对传统 BERT 推理达到 7.14 倍能量改善"
      ],
      "detail": "<h5>核心示意图</h5>\n<p><img alt=\"Atropos 熵计算与控制路径\" src=\"https://www.researchgate.net/publication/402463422/figure/download/fig1/AS%3A11431282005363128%401773723108473/mplementation-of-the-entropy-function-whose-value-on-the-1st-layer-Transformer-output-is.png\" />\n<em>图：Atropos 论文 Figure 5，展示片上熵函数实现及其输出如何驱动 V/F Scaling、Mixed-Precision Predication 和 Early Exit。来源为作者公开的 IEEE OJSSC 2026 论文图页，ResearchGate 标注 CC BY 4.0。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># Atropos Early Exit Inference 的简化版\ndef entropy_from_logits(x):\n    # z = softmax(x)，用 max trick 避免 exp 溢出\n    m = max(x)\n    exp_sum = sum(exp(x_i - m) for x_i in x)\n    weighted = sum(x_i * exp(x_i - m) for x_i in x)\n    return log(exp_sum) + m - weighted / exp_sum\n\ndef atropos_infer(sentence, target_latency_T, entropy_threshold):\n    # Phase 1: 第一层用高频执行，尽快获得复杂度信号\n    z1 = transformer_layer(sentence, layer=1, precision=&quot;fp8&quot;, vf=&quot;max&quot;)\n    H1 = entropy_from_logits(classifier(z1))\n\n    if H1 &lt; entropy_threshold:\n        return classify(z1)  # 简单输入直接退出\n\n    # Phase 2: 用第一层熵预测退出层和剩余计算预算\n    exit_layer = LUT_EE(H1, entropy_threshold)\n    remaining_cycles = estimate_cycles_until(exit_layer)\n    elapsed = read_timer()\n    f_prime = remaining_cycles / (target_latency_T - elapsed)\n    vdd_prime = LUT_DVFS(f_prime)\n\n    # 熵越低越倾向 FP4，熵高则保守使用 FP8\n    precision = LUT_PRECISION(H1)\n    set_local_voltage_and_clock(vdd_prime, f_prime)\n\n    # Phase 3: 按预测预算执行剩余层，同时仍允许更早退出\n    h = z1\n    for layer in range(2, exit_layer + 1):\n        h = transformer_layer(h, layer=layer, precision=precision, vf=(vdd_prime, f_prime))\n        Hl = entropy_from_logits(classifier(h))\n        if Hl &lt; entropy_threshold:\n            break\n\n    return classify(h)\n</code></pre>\n<h5>熵作为统一控制信号</h5>\n<p>Atropos 的核心观察是：对 BERT/ALBERT 这类 encoder-only 分类模型，简单输入在较浅层就会给出稳定分类分布，复杂输入则需要更多 Transformer 层。论文把每层 early-exit head 的 softmax 输出写成 <span class=\"kb-math kb-math-inline\">z^{(\\ell)}</span>，并用 self-entropy 衡量“不确定性”：</p>\n<div class=\"kb-math kb-math-display\">H(z^{(\\ell)})=-\\sum_{i=1}^{n}z_i^{(\\ell)}\\log z_i^{(\\ell)}.</div>\n<p>若 <span class=\"kb-math kb-math-inline\">H(z^{(\\ell)})&lt;E_T</span>，说明分类分布足够尖锐，可以提前退出。传统 early-exit 算法在每层都计算熵并决定是否退出，虽然省计算，但总延迟不稳定：一个 query 可能 2 层结束，另一个 query 可能跑满 12 层。Atropos 的改动是在第一层之后用 <span class=\"kb-math kb-math-inline\">H(z^{(1)})</span> 和阈值 <span class=\"kb-math kb-math-inline\">E_T</span> 查表预测最终退出层 <span class=\"kb-math kb-math-inline\">L</span>，把“不知道何时结束”的问题变成“知道大约还要跑多少周期”的调度问题。</p>\n<p>这个调度直接连接到电源管理。若剩余周期数为 <span class=\"kb-math kb-math-inline\">N</span>，目标响应时间为 <span class=\"kb-math kb-math-inline\">T</span>，当前已经消耗 <span class=\"kb-math kb-math-inline\">T_{\\mathrm{curr}}</span>，则所需频率近似为</p>\n<div class=\"kb-math kb-math-display\">f&#x27;=\\frac{N}{T-T_{\\mathrm{curr}}},\\qquad\nV&#x27;_{DD}=\\mathrm{LUT}_{\\mathrm{DVFS}}(f&#x27;).</div>\n<p>因此，低熵输入不仅可能更早退出，还能在后续层用更低电压/频率跑完；高熵输入则保留更多层数和更高精度。这个设计把 early exit、mixed precision 和 DVFS 三个原本分散的优化合并到一个控制闭环里。</p>\n<h5>混合精度 FP4/FP8 MAC 与 per-vector expbias</h5>\n<p>Atropos 的 MAC 路径支持 FP8 E4M3 和 FP4 E3M0。FP8 保留更多动态范围和尾数精度，适合高熵、分类仍不确定的输入；FP4 只有符号位和指数相关信息，吞吐更高但精度脆弱，适合低熵或对误差更不敏感的阶段。论文的关键不是简单切换数据类型，而是在 FP4 上使用 per-vector exponent bias：</p>\n<div class=\"kb-math kb-math-display\">x_{\\mathrm{fp4}}\\approx (-1)^{s}\\cdot 2^{e+\\mathrm{expbias}/\\gamma}.</div>\n<p>per-tensor expbias 让整个张量共享一个动态范围，遇到离群值时大量普通元素被压扁；per-vector expbias 则让每个向量有自己的指数偏置，显著减小局部量化误差。论文表格显示，SST-2 上 FP4 per-tensor expbias 只有约 69.0% 准确率，改成 FP4 per-vector 后到约 88.3%，再结合熵引导的 FP4/FP8 混合精度后达到约 91.0%，接近 FP32/Baseline 的 92.2%。</p>\n<div class=\"key-point\">💡 关键：Atropos 的 FP4 是“按输入复杂度使用”的硬件策略，不是把全部层无条件压到 4 bit。熵信号越低，系统越敢使用 FP4 和低 V/F；熵高时则回到 FP8 或更保守的时钟电压点。</div>\n<h5>电路与 SoC 数据流</h5>\n<p>图中的熵计算单元用 max trick 实现 softmax entropy，避免指数溢出。若 logits 为 <span class=\"kb-math kb-math-inline\">x</span>，令 <span class=\"kb-math kb-math-inline\">m=\\max_i x_i</span>，则</p>\n<div class=\"kb-math kb-math-display\">H(\\mathrm{softmax}(x))\n= \\log\\sum_i e^{x_i-m}+m\n-\\frac{\\sum_i x_i e^{x_i-m}}{\\sum_i e^{x_i-m}}.</div>\n<p>这正对应图中的 <code>max</code>、<code>exp</code>、累加、<code>ln</code>、除法等流水级。结果一方面送入 early-exit comparator，与 <span class=\"kb-math kb-math-inline\">H_{\\mathrm{Thresh}}</span> 比较；另一方面送到 V/F scaling 和 mixed-precision predication 控制逻辑。因为这个控制路径在片上完成，Atropos 可以做到 prompt/query 粒度的响应，而不是批处理或 workload 粒度的粗 DVFS。</p>\n<p>电源侧，Atropos 使用标准单元 PMOS header、本地 free-running LDO 和由本地电压驱动的 DCO。free-running LDO 不依赖传统反馈环稳定过程，而是用预表征电阻/LUT 选择输出点；DCO 随本地电压自然改变频率。论文描述 16 组离散 V/F 点，并把相关 LUT 与归一化常数、attention pruning 元数据放在 SFU 的 32 KB 辅助缓冲中。数据路径侧，稀疏矩阵由 bit-mask decoder/encoder 处理，非零 FP8 元素和索引分别使用 data SRAM 与 mask SRAM，attention head pruning 则跳过有效跨度不足的 head。</p>\n<h5>与传统 Transformer 加速器的区别</h5>\n<p>传统边缘 Transformer 加速器通常在固定层数、固定精度和固定电压频率下运行，然后用 worst-case latency 设计满足 QoS。Atropos 反过来把 QoS 当作实时约束：第一层先判断 query 难度，再决定跑到第几层、用 FP4 还是 FP8、用哪个 V/F 点。它牺牲了一部分控制逻辑复杂度，换来更细的能耗-延迟匹配。</p>\n<p>从系统指标看，Atropos 报告 18.1 TFLOPs/W 峰值能效和 65 mJ/inference；SST-2 上平均退出层约 3.9/12，能量相对传统 BERT 推理改善 7.14 倍。更重要的是，它展示了一种算法-架构-电路协同模板：用模型内部置信度信号直接驱动数据精度和供电策略，而不是把量化、稀疏和 DVFS 当成相互独立的优化开关。</p>\n<p>资料来源：IEEE Xplore 论文页 https://ieeexplore.ieee.org/abstract/document/11435429/；Tambe Lab publication list https://tambelab.stanford.edu/publications；作者公开全文/图页 https://www.researchgate.net/publication/402463422_A_181TFLOPsW_Transformer_Accelerator_with_Fine-Grained_Per-Query_Latency_and_Power_Management_in_12-nm_FinFET。</p>",
      "quiz": {
        "q": "Atropos 为什么要在第一层后预测退出层，而不是只在每层独立判断是否提前退出？",
        "options": [
          "为了在推理早期估计剩余周期并选择 V/F 点，使延迟目标可控",
          "因为后续层没有 logits，无法计算熵",
          "为了完全取消 softmax 计算",
          "因为 FP4 MAC 只能运行第一层"
        ],
        "answer": 0,
        "explain": "第一层熵可用于预测输入复杂度和退出层，Atropos 由此计算剩余周期、查表选择电压频率，并在满足 QoS 的同时降低能耗。"
      }
    },
    {
      "id": "fp4_training",
      "num": 47,
      "name": "FP4 Training",
      "fullName": "FP4全量化训练 (FP4 Fully Quantized LLM Training)",
      "year": "2026",
      "org": "NeurIPS",
      "parent": "bnn",
      "paperUrl": "https://proceedings.neurips.cc/paper_files/paper/2025/hash/8340b085045cf13f1f0b6c2c4cc0a89c-Abstract-Conference.html",
      "projectUrl": "",
      "category": "efficiency",
      "motivation": "首次实现FP4精度全量化LLM训练",
      "summary": "FP4 All the Way 首次展示权重、激活和梯度都以 FP4 为主的 LLM 全量化训练路径，通过 NVFP4、Split Rounding 和 QAF 收尾，使 7B 模型在大规模训练后达到与 BF16 基线相当的下游表现。",
      "keyPoints": [
        "目标是 Fully Quantized Training：训练中的 forward、backward、update 三类 GEMM 都能使用低精度输入，而不只量化权重或激活",
        "采用 NVFP4 格式：FP4 E2M1 数据、每 16 个值一个 E4M3 FP8 scale，相比 MXFP4 的 32 值块和 E8M0 scale 更稳定",
        "系统比较 block size、scale format 和 rounding mode，发现 E4M3/E3M4 scale 最优，block size 小于 16 的收益开始变小",
        "提出 Split Rounding：forward GEMM 的权重和激活使用 round-to-nearest，backward/update 中的梯度及 update 激活使用 stochastic rounding",
        "理论分析指出当每坐标梯度标准差接近 <span class=\"kb-math kb-math-inline\">\\sqrt{3}</span> 倍量化噪声标准差以下时，FP4 梯度更新效率明显下降",
        "提出 QAF 收尾：训练末期 forward 保持 FP4，backward 与 update 切回 BF16，提高信噪比并闭合与 BF16 的 loss gap",
        "在 Llama2 7B、256 块 Intel Gaudi2 上进行大规模实验，论文报告 FP4+QAF 的零样本下游表现与 BF16 基线相当"
      ],
      "detail": "<h5>核心示意图</h5>\n<p><img alt=\"FP4 Training 中不同 scale format 的训练稳定性对比\" src=\"https://arxiv.org/html/2505.19115v2/x1.png\" />\n<em>图：FP4 All the Way Figure 1，来源为 arXiv HTML 论文图。图中比较 350M Llama 风格模型在 E1M6 到 E8M0 不同 scale format 下的训练 loss，E4M3 是 NVFP4 使用的 scale 格式。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># FP4 All the Way: NVFP4 + Split Rounding + QAF 的简化训练循环\ndef quantize_nvfp4(x, block_size=16, rounding=&quot;rtn&quot;):\n    q_blocks, scales = [], []\n    for block in split_consecutive(x, block_size):\n        # NVFP4: E2M1 data + E4M3 scale\n        s = quantize_to_e4m3(max_abs(block) / fp4_e2m1_max())\n        y = block / s\n        if rounding == &quot;rtn&quot;:\n            q = round_to_nearest_e2m1(y)\n        else:\n            q = stochastic_round_e2m1(y)\n        q_blocks.append(pack_fp4(q))\n        scales.append(s)\n    return q_blocks, scales\n\ndef fp4_gemm(a, b, rounding_a, rounding_b):\n    qa, sa = quantize_nvfp4(a, rounding=rounding_a)\n    qb, sb = quantize_nvfp4(b, rounding=rounding_b)\n    return matmul_dequantized_fp4(qa, qb, sa, sb, accumulate=&quot;bf16/fp32&quot;)\n\ndef train_step(model, batch, phase):\n    # Forward GEMM: Q_rtn(W) @ Q_rtn(a)\n    activations = batch.x\n    for layer in model.layers:\n        activations = fp4_gemm(layer.weight, activations,\n                               rounding_a=&quot;rtn&quot;, rounding_b=&quot;rtn&quot;)\n\n    loss = cross_entropy(activations, batch.y)\n\n    if phase == &quot;fp4_fqt&quot;:\n        # Backward GEMM: Q_rtn(W^T) @ Q_sr(delta)\n        deltas = loss_gradient(loss)\n        for layer in reversed(model.layers):\n            deltas = fp4_gemm(layer.weight.T, deltas,\n                              rounding_a=&quot;rtn&quot;, rounding_b=&quot;sr&quot;)\n\n        # Update GEMM: Q_sr(delta) @ Q_sr(a^T)\n        for layer in model.layers:\n            grad_w = fp4_gemm(layer.delta, layer.input.T,\n                              rounding_a=&quot;sr&quot;, rounding_b=&quot;sr&quot;)\n            optimizer_update_bf16_master_weight(layer.weight, grad_w)\n\n    elif phase == &quot;qaf&quot;:\n        # 收尾阶段: forward 仍按 FP4 暴露量化误差，反向和更新回 BF16\n        bf16_backward_and_update(loss, model)\n\nfor step, batch in enumerate(dataloader):\n    phase = &quot;qaf&quot; if step &gt;= qaf_start_step else &quot;fp4_fqt&quot;\n    train_step(model, batch, phase)\n</code></pre>\n<h5>NVFP4 为什么优于 MXFP4</h5>\n<p>FP4 的基础表示极窄。以常用 E2M1 为例，4 bit 需要同时编码符号、2 位指数和 1 位尾数，直接表示 Transformer 权重、激活和梯度会产生很大量化误差。论文把问题拆成“低比特值”和“scale 元数据”：对每个 block <span class=\"kb-math kb-math-inline\">B</span>，选择一个 FP8 scale，把局部动态范围映射到 FP4 网格：</p>\n<div class=\"kb-math kb-math-display\">s_B=\\mathrm{Quant}_{\\mathrm{E4M3}}\\left(\\frac{\\max_{x\\in B}|x|}{q_{\\max}}\\right),\\qquad\n\\widehat{x}=\\mathrm{Round}_{\\mathrm{E2M1}}\\left(\\frac{x}{s_B}\\right),\\qquad\n\\widetilde{x}=s_B\\widehat{x}.</div>\n<p>MXFP4 和 NVFP4 的值格式都是 E2M1，但 MXFP4 用 32 个值共享一个 E8M0 scale，NVFP4 用 16 个值共享一个 E4M3 scale。E8M0 只有指数没有尾数，scale 只能落在 2 的幂附近；E4M3 有 3 位尾数，虽然动态范围较窄但能更精细地贴合局部最大值。论文的 scale-format sweep 显示，E4M3 和 E3M4 的训练 loss 最好，E1M6 甚至会发散；这从实证上支持 NVFP4 的硬件格式选择。</p>\n<h5>Split Rounding 的设计逻辑</h5>\n<p>训练中每个线性层至少涉及三类 GEMM：forward 用 <span class=\"kb-math kb-math-inline\">W a</span>，backward 用 <span class=\"kb-math kb-math-inline\">W^\\top \\delta</span>，update 用 <span class=\"kb-math kb-math-inline\">\\delta a^\\top</span>。FP4 全量化训练的关键不是所有位置统一舍入，而是按误差后果选择舍入方式：</p>\n<div class=\"kb-math kb-math-display\">\\mathrm{Forward}:\\quad Q_{\\mathrm{RtN}}(W)\\,Q_{\\mathrm{RtN}}(a)</div>\n<div class=\"kb-math kb-math-display\">\\mathrm{Backward}:\\quad Q_{\\mathrm{RtN}}(W^\\top)\\,Q_{\\mathrm{SR}}(\\delta)</div>\n<div class=\"kb-math kb-math-display\">\\mathrm{Update}:\\quad Q_{\\mathrm{SR}}(\\delta)\\,Q_{\\mathrm{SR}}(a^\\top).</div>\n<p>Round-to-nearest (RtN) 的均方误差小，适合 forward：前向激活噪声会层层传播，降低方差比保持无偏更重要。Stochastic rounding (SR) 的单次噪声更大，但期望无偏，适合梯度和权重更新：如果 update 的梯度长期带有确定性偏差，优化会收敛到错误位置或留下不可消除的残差损失。论文的 rounding ablation 说明，把 RtN 放到 update/backward 的神经梯度位置会提高训练 loss；而 forward 权重/激活用 RtN 反而更稳。</p>\n<h5>量化 SGD 的临界噪声</h5>\n<p>论文用带随机舍入噪声的 SGD 分析解释为什么 FP4 训练后期会变难。若量化梯度噪声方差为 <span class=\"kb-math kb-math-inline\">\\sigma_q^2</span>，二阶近似下单步期望 loss 变化可写成：</p>\n<div class=\"kb-math kb-math-display\">\\mathbb{E}[L(\\theta_{t+1})-L(\\theta_t)]\n\\approx\n-\\eta\\|\\nabla L(\\theta_t)\\|_2^2\n+\\frac{1}{2}\\eta^2\\nabla L(\\theta_t)^\\top H(\\theta_t)\\nabla L(\\theta_t)\n+\\frac{1}{2}\\eta^2\\sigma_q^2\\mathrm{tr}(H(\\theta_t)).</div>\n<p>前两项是正常梯度下降和曲率影响，最后一项是量化噪声带来的损失上升。推导最敏感点后，论文给出临界噪声近似：</p>\n<div class=\"kb-math kb-math-display\">\\sigma_{\\mathrm{critical}}\n=\\frac{\\|\\nabla L(\\theta_t)\\|_2}{\\sqrt{3d}}.</div>\n<p>直觉是：训练早期梯度大，FP4 噪声只是扰动；训练后期梯度小，量化噪声与真实梯度同量级，更新方向的信噪比下降。论文把这个阈值解释为切换到更高精度收尾的信号：当每坐标梯度幅度下降到约 <span class=\"kb-math kb-math-inline\">\\sqrt{3}</span> 倍量化噪声标准差附近，继续全 FP4 更新的边际收益变差。</p>\n<h5>QAF 收尾与全量化训练边界</h5>\n<p>QAF (Quantization-Aware Finetuning) 的做法很克制：forward 继续使用 FP4，让模型保持对低精度前向路径的适配；backward 和 update 切回 BF16，让最后阶段的梯度信号摆脱 FP4 噪声。这样既避免了训练后再做 PTQ 的分布错配，又能在 loss gap 出现后快速贴回 BF16 基线。</p>\n<p>论文在 7B 规模实验中使用 Llama2 架构和 256 块 Intel Gaudi2 训练。需要注意的是，Gaudi2 本身不提供原生 FP4 Tensor Core，因此实验中的 FP4 计算是模拟路径，论文主要证明数值可行性，而不是直接给出真实 FP4 硬件吞吐。作者基于 FP4 相对 FP8/BF16 GEMM 的吞吐关系估计，原生 FP4 硬件上会有明显 time-to-train 收益；但从工程落地看，收益仍依赖硬件是否高效支持 packed FP4、scale 加载、SR 和低精度累加。</p>\n<h5>与此前 FP4 训练工作的区别</h5>\n<p>此前工作通常只覆盖一部分训练矩阵乘：有的量化权重和激活但保留梯度高精度，有的只研究梯度压缩或 MXFP4 梯度更新。FP4 All the Way 的贡献在于把三类张量都纳入 FP4 训练闭环，并明确指出不同位置的舍入策略和后期精度切换边界。换句话说，它不是单个量化器，而是一套训练制度：NVFP4 决定数值网格，Split Rounding 决定噪声偏差，QAF 决定何时退出全 FP4 更新。</p>\n<p>资料来源：NeurIPS 2025 论文页 https://proceedings.neurips.cc/paper_files/paper/2025/hash/8340b085045cf13f1f0b6c2c4cc0a89c-Abstract-Conference.html；论文 PDF https://proceedings.neurips.cc/paper_files/paper/2025/file/8340b085045cf13f1f0b6c2c4cc0a89c-Paper-Conference.pdf；arXiv HTML https://arxiv.org/html/2505.19115v2；参考实现 https://github.com/Anonymous1252022/fp4-all-the-way。</p>",
      "quiz": {
        "q": "FP4 All the Way 中 Split Rounding 的核心原因是什么？",
        "options": [
          "前向传播更需要低方差，梯度更新更需要无偏噪声",
          "RtN 只能用于 Blackwell，SR 只能用于 Gaudi2",
          "所有 FP4 张量都必须随机舍入，否则无法打包",
          "QAF 阶段要求权重永久冻结"
        ],
        "answer": 0,
        "explain": "forward 噪声会逐层传播，RtN 的均方误差更低；backward 和 update 直接决定优化方向，SR 的无偏性更重要，可避免梯度偏差长期积累。"
      }
    },
    {
      "id": "nanophotonic_nn",
      "num": 48,
      "name": "Nanophotonic NN",
      "fullName": "逆向设计纳米光子神经网络 (Inverse-Designed Nanophotonic Neural Network)",
      "year": "2026",
      "org": "Nature Comms",
      "parent": "—",
      "paperUrl": "https://www.nature.com/articles/s41467-026-68648-1",
      "projectUrl": "",
      "category": "photonic",
      "motivation": "逆向设计实现超紧凑片上光学计算",
      "summary": "Nanophotonic NN 提出一种基于 3D-FDTD 与伴随变量法的逆向设计光子神经网络，把分类权重直接固化为 SOI 纳米散射结构，解决传统 MZI mesh / microring 光神经网络面积大、调谐功耗高、难以密集集成的问题。论文在 20 × 20 µm² 与 30 × 20 µm² 器件中分别实现 MNIST 与 MedNIST 片上分类，实验准确率达到 89% 与 90%。",
      "keyPoints": [
        "采用拓扑优化逆向设计：每个亚波长 voxel 都是可训练自由度，最终形成任务专用的纳米散射介质",
        "使用 3D-FDTD 捕获高折射率差 SOI 器件中的完整 Maxwell 波动传播，而不是用有效折射率近似",
        "利用 Maxwell 方程线性性，将大量训练样本的光场响应重构为少量独立 forward mode 的线性组合",
        "每个训练 epoch 只需约 <span class=\"kb-math kb-math-inline\">N + C</span> 次 FDTD 仿真，其中 <span class=\"kb-math kb-math-inline\">N</span> 是输入端口数、<span class=\"kb-math kb-math-inline\">C</span> 是类别输出数，显著降低逆向设计成本",
        "用 photodetector 输出功率形成类别证据分布，通过交叉熵损失和伴随梯度更新材料分布",
        "在 SOI 平台制备两块器件：MNIST PNN 为 20 × 20 µm²，MedNIST PNN 为 30 × 20 µm²",
        "计算密度约 400 million trainable parameters/mm²；MNIST 与 MedNIST 设计约含 <span class=\"kb-math kb-math-inline\">1.6 \\times 10^5</span>、<span class=\"kb-math kb-math-inline\">2.4 \\times 10^5</span> 个训练参数",
        "提出堆叠 PNN core + photodetector 非线性 + patch/weight sharing 的扩展路径，可向更深更宽的光子网络扩展",
        "支持 wavelength / polarization multiplexing；补充实验展示双波长单芯片同时分类 MNIST 与 MedNIST"
      ],
      "detail": "<h5>核心示意图</h5>\n<p><img alt=\"Nanophotonic NN 逆向设计流程\" src=\"https://media.springernature.com/lw685/springer-static/image/art%3A10.1038%2Fs41467-026-68648-1/MediaObjects/41467_2026_68648_Fig1_HTML.png\" />\n<em>图：Nature Communications 论文 Fig. 1，展示输入特征经相干光幅度编码后进入拓扑优化散射区，输出端口功率对应类别证据；下半部分是 latent topology、3D-FDTD forward/reverse mode、AVM 物理梯度和训练循环。</em></p>\n<h5>训练与推理伪代码</h5>\n<pre><code class=\"language-python\"># Nanophotonic NN: 基于 Maxwell 线性性的逆向设计训练流程\ndef train_inverse_designed_pnn(dataset, n_inputs, n_classes, epochs):\n    rho = initialize_latent_topology()          # 可训练材料分布参数\n\n    for epoch in range(epochs):\n        eps = parameterize_to_permittivity(rho) # rho -&gt; SOI/air permittivity map\n\n        # 1) 对每个输入端口做一次独立 3D-FDTD forward simulation\n        forward_modes = []\n        for i in range(n_inputs):\n            E_i = fdtd_forward(eps, source_port=i, wavelength=1550e-9)\n            forward_modes.append(E_i)\n\n        # 2) 用线性叠加重构每个样本的光场，不为每个样本重新跑 FDTD\n        losses = []\n        class_scores = []\n        for x, label in dataset:\n            E_sample = sum(x[i] * forward_modes[i] for i in range(n_inputs))\n            power = detect_output_power(E_sample, ports=n_classes)\n            prob = power / power.sum()\n            losses.append(cross_entropy(prob, label))\n            class_scores.append(prob)\n\n        # 3) 对每个输出类别做 reverse/adjoint simulation，得到物理梯度\n        adjoint_modes = []\n        dL_dpower = differentiate_loss(class_scores, dataset.labels)\n        for c in range(n_classes):\n            E_adj_c = fdtd_adjoint(eps, output_port=c, seed=dL_dpower[:, c])\n            adjoint_modes.append(E_adj_c)\n\n        grad_rho = avm_gradient(forward_modes, adjoint_modes, rho)\n        rho = optimizer_step(rho, grad_rho)\n\n    return fabricate_topology(rho)\n\n\ndef pnn_inference(fabricated_device, input_features):\n    optical_amplitudes = encode_features_as_coherent_inputs(input_features)\n    output_power = fabricated_device.propagate_and_detect(optical_amplitudes)\n    return argmax(output_power)\n</code></pre>\n<h5>光学计算模型</h5>\n<p>Nanophotonic NN 的核心不是在光路上摆放一组可调 MZI 或 microring 权重，而是把整个散射区当作一个可训练的线性算子。输入特征 <span class=\"kb-math kb-math-inline\">x_1,\\ldots,x_N</span> 被编码为同一波长下 <span class=\"kb-math kb-math-inline\">N</span> 个相干输入端口的复振幅；在优化后的散射介质中，光经历多次散射、干涉和模式混合，最终在 <span class=\"kb-math kb-math-inline\">C</span> 个输出端口形成类别相关的光功率。推理时不需要重新配置权重，器件本身就是训练后的物理权重矩阵。</p>\n<p>对第 <span class=\"kb-math kb-math-inline\">i</span> 个输入端口单独激励得到的电场记为 <span class=\"kb-math kb-math-inline\">{\\bf E}_i({\\bf r})</span>。由于 Maxwell 方程在固定材料分布和线性介质下满足叠加性，样本 <span class=\"kb-math kb-math-inline\">{\\bf x}</span> 的连续波场可以写成：</p>\n<div class=\"kb-math kb-math-display\">{\\bf E}_{\\bf x}({\\bf r}) = \\sum_{i=1}^{N} x_i {\\bf E}_i({\\bf r})</div>\n<p>这条线性叠加是论文降低训练成本的关键。朴素做法需要对每个训练样本都跑一次 3D-FDTD；该方法只需要对 <span class=\"kb-math kb-math-inline\">N</span> 个输入 basis 跑 forward simulation，再用矩阵乘法重构所有样本光场。输出端口 <span class=\"kb-math kb-math-inline\">c</span> 的类别证据来自探测功率：</p>\n<div class=\"kb-math kb-math-display\">P_c({\\bf x}) = \\int_{\\Omega_c} |{\\bf E}_{\\bf x}({\\bf r})|^2 d{\\bf r}, \\qquad\np_c = \\frac{P_c}{\\sum_{j=1}^{C} P_j}</div>\n<p>训练目标可写成标准交叉熵：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}({\\bf x}, y) = -\\log p_y</div>\n<h5>逆向设计与伴随梯度</h5>\n<p>设计变量 <span class=\"kb-math kb-math-inline\">\\rho</span> 表示离散化后的 latent topology，经过滤波、投影或 B-spline 平滑后映射为真实介电常数分布 <span class=\"kb-math kb-math-inline\">\\epsilon_r({\\bf r})</span>。在 SOI 平台中，优化器实际上是在决定每个亚波长 voxel 更接近硅还是空气，从而雕刻出高折射率差的复杂散射结构。高折射率差带来更强的光场约束、内部共振和干涉表达能力，但也使有效折射率近似不够可靠，所以论文选择全 3D-FDTD。</p>\n<p>梯度计算采用 adjoint variable method。直观地说，forward field 告诉我们当前输入光如何穿过器件，adjoint field 则从输出误差反向注入，表示“如果希望某个输出端口功率增减，哪些空间位置最该改变材料”。简化的拓扑梯度形式可以理解为 forward 与 adjoint 场的局部重叠：</p>\n<div class=\"kb-math kb-math-display\">\\frac{\\partial \\mathcal{L}}{\\partial \\epsilon({\\bf r})}\n\\propto\n-\\operatorname{Re}\\left\\{ {\\bf E}_{\\mathrm{fwd}}({\\bf r}) \\cdot {\\bf E}_{\\mathrm{adj}}({\\bf r}) \\right\\}</div>\n<p>在实际训练中，论文把 <span class=\"kb-math kb-math-inline\">L</span> 个样本的光场由 <span class=\"kb-math kb-math-inline\">N</span> 个 forward mode 重构，把 <span class=\"kb-math kb-math-inline\">T</span> 个反向误差信号由 <span class=\"kb-math kb-math-inline\">C</span> 个 reverse mode 聚合，因此每个 epoch 的 FDTD 主成本约为 <span class=\"kb-math kb-math-inline\">N+C</span>，而不是训练集大小。MNIST 与 MedNIST 设计在 RTX 5090 单节点上分别约需 29.7 小时与 56.3 小时；多 GPU 节点调度可继续降低总时间。</p>\n<h5>与传统光神经网络的区别</h5>\n<p>传统可编程 PNN 常用 MZI mesh、microring 或衰减器来实现矩阵乘法。这类架构的优点是权重可重配置，但代价是面积、热调谐功耗、校准复杂度和器件间串扰。Nanophotonic NN 选择更像 photonic ASIC 的路线：离线训练一次，制备后用于稳定推理，运行时没有大规模权重调谐。它牺牲了在线可编程性，换取超小面积、低静态功耗和更高空间计算密度。</p>\n<p>这种路线也解释了论文为什么强调“in-memory optical single-shot run-time operation”。权重不是从片外存储加载到计算单元，而是直接以材料边界和折射率分布的形式嵌入传播介质。光从输入端到输出端一次传播即完成线性分类层，主要延迟由光传播和探测决定，而不是电子矩阵乘法的数据搬移。</p>\n<h5>实验结果与扩展路径</h5>\n<p>论文制备并测试了两类 SOI 设备：MNIST 使用 10 输入、10 输出的 20 × 20 µm² PNN，实验片上准确率为 89%；MedNIST 使用 15 输入、6 输出的 30 × 20 µm² PNN，实验片上准确率为 90%。数值优化中，MedNIST 6 类任务在 150 个 epoch 附近达到 99.1% 峰值准确率；实验与仿真差异主要来自制程误差、相位扰动、耦合/测量误差等硬件因素。</p>\n<p><img alt=\"可扩展 PNN 堆叠架构\" src=\"https://media.springernature.com/lw685/springer-static/image/art%3A10.1038%2Fs41467-026-68648-1/MediaObjects/41467_2026_68648_Fig7_HTML.png\" />\n<em>图：Nature Communications 论文 Fig. 7，展示将图像切成 patch 后，使用多组 PNN core 与 photodetector nonlinearity 构成更深更宽网络的扩展方案。</em></p>\n<p>更大模型的扩展依赖三件事。第一，宽度上可对图像 patch 做 weight sharing，并行复用同一组 PNN core。第二，深度上可在 PNN core 之间插入 photodetector 非线性，将光功率转换为下一阶段输入特征。第三，吞吐上可使用 wavelength 或 polarization multiplexing，让同一芯片承载多个任务或多个并行通道。论文补充结果显示，双波长 30 × 20 µm² 单芯片可同时分类 MNIST 与 MedNIST，测试准确率分别为 95.1% 和 98.0%，说明多路复用不是纯概念，而是与这类逆向设计器件兼容。</p>\n<div class=\"key-point\">💡 关键：Nanophotonic NN 的“神经网络参数”不是电子权重表，而是纳米尺度材料分布。训练阶段昂贵但可离线并行；推理阶段极简，输入光场一次穿过器件即可得到类别输出。</div>",
      "quiz": {
        "q": "Nanophotonic NN 为什么每个训练 epoch 不需要对每个样本都运行一次 3D-FDTD？",
        "options": [
          "因为 Maxwell 方程在线性介质中满足叠加性，可用少量输入 basis 光场线性重构样本光场",
          "因为输出类别由电子 GPU 完全计算，光学器件只负责存储标签",
          "因为论文只训练最后一层电子分类器，光子结构不参与优化",
          "因为所有输入样本在光学上都被编码成同一个相位模式"
        ],
        "answer": 0,
        "explain": "论文利用线性叠加，把样本响应表示为输入端口 forward modes 的线性组合，因此 FDTD 主成本随输入/输出端口数增长，而不是随训练样本数增长。"
      }
    },
    {
      "id": "astra_photonic",
      "num": 49,
      "name": "ASTRA",
      "fullName": "硅光子随机Transformer加速器 (ASTRA Silicon Photonic Transformer Accelerator)",
      "year": "2026",
      "org": "ACM TECS",
      "parent": "—",
      "paperUrl": "https://dl.acm.org/doi/abs/10.1145/3769092",
      "projectUrl": "",
      "category": "photonic",
      "motivation": "硅光子随机计算降低注意力机制功耗",
      "summary": "ASTRA 提出首个面向 Transformer 的随机计算硅光子加速器，用光学随机有符号乘法器（OSSM）和 homodyne analog accumulation 替代传统多级模拟幅度编码，解决 photonic Transformer 加速中 DAC 功耗、异频串扰、动态 attention 数据流适配差的问题。论文在 Transformer-base、BERT-base、Albert-base、ViT-base、OPT-350 等模型上评估，报告相对先进 Transformer 加速器至少 7.6× 加速和 1.3× 能耗降低。",
      "keyPoints": [
        "引入 Optical Stochastic Signed Multiplier（OSSM），将乘法转化为随机 bitstream 的光学 AND 操作",
        "使用 binary-to-stochastic（B_to_S）转换、TCU 编码和 bit-position correlation，降低随机乘法误差",
        "每个 VDP core 由多个 wavelength-specific VDPE 组成，每个 VDPE 只在单一波长上独立工作，避免传统 WDM VDPE 的 heterodyne crosstalk",
        "OSSM 输出按正负符号分成两条 homodyne 光学通道，由 photodetector / photo-charge accumulator 完成模拟域累加",
        "避免随机加法链路，使用 temporal analog accumulation 聚合点积部分和，降低误差与数据搬移",
        "Transformer 中 QKV projection、attention score、attention-value、FFN GEMM 等静态/动态矩阵乘都映射到 VDP cores",
        "非线性函数如 ReLU、GELU、Softmax 在数字 LUT / control unit 中完成，避免额外光电/电光转换",
        "评估采用 8-bit 量化、128-bit stochastic stream 加 sign bit，精度相对 FP32 下降控制在约 1.2% 内",
        "器件级分析显示每个 wavelength 可支持约 1024 个 OAG/OSSM，OAG 速度可超过 30 Gbps，支持大规模并行点积"
      ],
      "detail": "<h5>核心示意图</h5>\n<p><img alt=\"ASTRA arXiv PDF 公开预览\" src=\"https://image.thum.io/get/width/1200/crop/1600/https://arxiv.org/pdf/2604.09759%23page=2\" />\n<em>图：作者 2026 arXiv 扩展摘要 “Sustainable Transformer Neural Network Acceleration with Stochastic Photonic Computing” 的公开 PDF 页面预览，摘要复用 ASTRA 的 OSSM、OAG、VDP/VDPE 与能耗评估图；ACM DOI 正文页面受访问限制，正文解读基于 ACM TECS DOI 元数据、作者上传全文 OCR 和该 arXiv 摘要。</em></p>\n<h5>ASTRA 推理伪代码</h5>\n<pre><code class=\"language-python\"># ASTRA: Transformer GEMM/attention 的随机硅光子执行流程\ndef astra_transformer_layer(x, weights, astra):\n    # 1) 线性层和注意力投影，动态/静态矩阵都转为 VDP core 任务\n    q = astra_gemm(x, weights.W_q, astra)\n    k = astra_gemm(x, weights.W_k, astra)\n    v = astra_gemm(x, weights.W_v, astra)\n\n    # 2) attention score: Q K^T / sqrt(d)\n    score = astra_gemm(q, transpose(k), astra) / sqrt(q.head_dim)\n    attn = digital_softmax_lut(score)\n    context = astra_gemm(attn, v, astra)\n\n    # 3) output projection + FFN\n    y = astra_gemm(context, weights.W_o, astra)\n    h = digital_gelu_lut(astra_gemm(y, weights.W_1, astra))\n    return astra_gemm(h, weights.W_2, astra)\n\n\ndef astra_gemm(X_binary, W_binary, astra):\n    # X/W 是量化后的二进制数；符号和幅值分开处理\n    X_stream = B_to_S_with_TCU_and_correlation(X_binary.magnitude)\n    W_stream = B_to_S_with_TCU(W_binary.magnitude)\n\n    outputs = []\n    for tile in map_matrix_to_vdp_cores(X_stream, W_stream, astra.vdp_cores):\n        pos_charge = 0\n        neg_charge = 0\n\n        for bit_time in range(stochastic_stream_length):\n            # OSSM/OAG 在光域完成 AND：1&amp;1 表示一次随机乘法命中\n            optical_hits = optical_and(tile.X_bits[bit_time], tile.W_bits[bit_time])\n            pos, neg = route_by_sign(optical_hits, X_binary.sign, W_binary.sign)\n\n            # 同波长 homodyne 聚合，PD/PCA 把光脉冲累加为模拟电荷\n            pos_charge += photodetect_and_accumulate(pos)\n            neg_charge += photodetect_and_accumulate(neg)\n\n        outputs.append(stochastic_to_binary(pos_charge - neg_charge))\n\n    return assemble_gemm_output(outputs)\n</code></pre>\n<h5>随机计算为什么适合光子乘法</h5>\n<p>传统光子矩阵乘通常用振幅或相位的多级模拟值表示权重和输入，再通过 microring 或 MZI 阵列调制光强。这条路线对 DAC、调制线性度、相位噪声和动态范围要求很高；在 Transformer 中，attention 的 operand 还会随 token 动态生成，weight-stationary 的光学数据流难以高效覆盖。ASTRA 的转向是把乘法从“高精度模拟幅度”改成“随机 bitstream 的时间密度”。</p>\n<p>随机计算的基本关系是：</p>\n<div class=\"kb-math kb-math-display\">P(X=1)=x,\\qquad P(W=1)=w,\\qquad P(X \\land W=1)=xw</div>\n<p>也就是说，只要两个 bitstream 满足合适的统计关系，一个 AND gate 的输出中 1 的比例就近似乘积。ASTRA 把这个 AND gate 做成 optical AND gate（OAG），再封装成 OSSM。相比多级 DAC，这只需要 ON/OFF 型调制和光学逻辑事件，光学动态范围更小，器件更容易复制到大量并行通道。</p>\n<h5>OSSM、符号和 analog accumulation</h5>\n<p>Transformer GEMM 需要全范围有符号乘法，而不是只处理 <span class=\"kb-math kb-math-inline\">[0,1]</span> 的无符号概率。ASTRA 因此把幅值和符号分开：幅值进入 B_to_S 单元生成随机 bitstream，符号决定 OSSM 输出进入正通道还是负通道。一个点积可写为：</p>\n<div class=\"kb-math kb-math-display\">y_j = \\sum_i s_i \\cdot |x_i| \\cdot |w_{ij}|,\\qquad\ns_i \\in \\{+1,-1\\}</div>\n<p>在硬件中，正贡献和负贡献分别通过同一波长上的 homodyne 光学叠加到不同 lane。photodetector 把多个 OSSM 的光脉冲转换为电荷，photo-charge accumulator 在时间上累加，最后做差得到有符号结果：</p>\n<div class=\"kb-math kb-math-display\">y_j \\approx Q_j^+ - Q_j^-</div>\n<p>这一步避免了随机计算里最容易引入误差的 stochastic addition。换言之，ASTRA 只把“乘法命中”放到随机/光学域，把加法转移到模拟电荷累加域，最后再转回二进制。这种混合路径是其精度与能耗之间的关键折中。</p>\n<h5>VDP core 和 Transformer 数据流</h5>\n<p>ASTRA 的 VDP core 由 laser comb、microring wavelength routing、多个 wavelength-specific VDPE、B_to_S 单元、serializer、OSSM、photodetector/PCA 和电子控制单元组成。与传统 WDM photonic tensor core 把多个波长混在同一 VDPE 中不同，ASTRA 把每个 VDPE 绑定到一个波长。这样牺牲了一点共享灵活性，但避免了异频拍频引发的 heterodyne crosstalk，也减少长级联 microring 的插入损耗。</p>\n<p>Transformer 层的主要开销来自矩阵乘：</p>\n<div class=\"kb-math kb-math-display\">\\mathrm{Attention}(Q,K,V)=\\mathrm{softmax}\\left(\\frac{QK^\\top}{\\sqrt{d_k}}\\right)V</div>\n<p>ASTRA 把 <span class=\"kb-math kb-math-inline\">Q,K,V</span> projection、<span class=\"kb-math kb-math-inline\">QK^\\top</span>、<span class=\"kb-math kb-math-inline\">\\mathrm{softmax}(\\cdot)V</span>、output projection 和 FFN 两个 GEMM 都映射为 output-stationary 的 VDP core 任务。动态 attention score 不再需要先写回主存再重新配置固定权重阵列，而是由 ECU 对矩阵 tile 做资源分配，B_to_S / serializer 将当前 operand 转成随机流后直接送入 OSSM 阵列。GELU、ReLU、Softmax 这类非线性则保留在数字 LUT 中，减少反复电-光转换。</p>\n<h5>精度、规模和性能直觉</h5>\n<p>随机计算的风险是 bitstream 太短会带来方差，bitstream 相关性不当会产生系统性误差。论文使用 deterministic B_to_S、B_to_TCU 和 bit-position correlation encoder 让两个随机向量满足低误差乘法条件；评估中采用 8-bit 量化、128-bit stochastic stream 与 sign bit，使五个 Transformer 模型相对 FP32 的准确率损失保持在约 1.2% 内。</p>\n<p>器件级模拟显示，低光功率 OAG 与 homodyne VDPE 可以把每个波长的 OAG/OSSM 数量推到约 1024，速度超过 30 Gbps。架构级评估覆盖 Transformer-base、BERT-base、Albert-base、ViT-base 和 OPT-350，并与 CPU、GPU、TPU、FPGA_ACC、TransPIM、Lightning-Transformer、TRON、SCONNA 等平台比较。报告结果中，ASTRA 至少达到 7.6× 加速和 1.3× 能耗降低；相对 CPU/GPU/TPU 的归一化能耗下降超过三个数量级，主要来自减少 DAC、减少数据搬移、避免 heterodyne crosstalk 以及大量 OSSM 并行。</p>\n<div class=\"key-point\">💡 关键：ASTRA 不是把数字 Transformer 原封不动搬到光域，而是把乘法改写成随机 bitstream 命中统计，把累加放到光电模拟电荷域，再把控制和非线性留给数字电路。</div>",
      "quiz": {
        "q": "ASTRA 为什么用 temporal analog accumulation，而不是继续用随机加法完成点积累加？",
        "options": [
          "随机加法会显著增加误差，PD/PCA 的电荷累加可以更稳定地聚合大量 OSSM 输出",
          "因为 Transformer 中没有矩阵乘法，只需要执行 Softmax",
          "因为光学 AND gate 只能处理负数，不能处理正数",
          "因为 VDP core 只能存储权重，无法处理动态 operand"
        ],
        "answer": 0,
        "explain": "ASTRA 将乘法保留在随机光学域，而把求和交给 homodyne photodetection 和 photo-charge accumulation，避免随机加法链式误差并减少中间数据搬移。"
      }
    },
    {
      "id": "lightmatter_passage",
      "num": 50,
      "name": "Lightmatter Passage",
      "fullName": "Lightmatter 3D光子互连 (Lightmatter Passage 3D Photonic Interconnect)",
      "year": "2026",
      "org": "Lightmatter",
      "parent": "—",
      "paperUrl": "https://lightmatter.co/blog/isscc-2026-scaling-ai-with-light/",
      "projectUrl": "",
      "category": "photonic",
      "motivation": "3D光子互连链路功耗从30W降至9W",
      "summary": "Lightmatter Passage 提出以 3D 光子 interposer / co-packaged optics 打破芯片边缘 I/O “shoreline” 限制，把电-光接口从封装边缘扩展到芯片面积维度，解决大规模 AI 训练中 scale-up 互连带宽密度、能耗和可扩展性瓶颈。官方资料显示，Passage M1000 参考平台提供 114 Tbps 聚合双向带宽，L200/L200X 面向 32/64 Tbps 光 I/O，L20 面向 12.8 Tbps 近封装/板上光互连。",
      "keyPoints": [
        "核心架构是 Edgeless I/O：不再只沿芯片边缘布置 I/O，而是在 3D 集成中把电-光接口扩展到 die 面积",
        "M-series 是 3D photonic interposer，把 XPU / switch die complex 叠放在主动光子中介层之上",
        "Passage M1000 EVK 是 4000 mm² 级参考平台，官方标称 114 Tbps 聚合双向带宽、256 optical fibers、1.5 kW+ power delivery 与内置 solid-state optical circuit switching",
        "L-series 覆盖 near-package optics、on-board optics 和 co-packaged optics；L200/L200X 提供 32/64 Tbps optical I/O",
        "L200 采用 3D chip-on-wafer（CoW）集成，官方规格包括 PAM4（56G/112G）、&lt;5 pJ/bit optical efficiency、detachable fiber、10 m 到 2 km direct-drive reach",
        "L20 是 BiDi near-packaged/on-board optical module，官方规格为 6.4 Tbps each direction、212.5 Gbps PAM4、32 data fibers、5 pJ/bit",
        "Passage 平台层面支持 56-448 Gbps per lane、1-16+ wavelengths、bidirectional fiber 与 built-in optical circuit switching",
        "Lightmatter 2026 官方博客称 M-series 可达到约 1 Tbps/mm² areal I/O density，M1000 参考平台在含激光功率下达到 2.3 pJ/bit",
        "Guide 外部激光源与 Passage 配套，在 16-wavelength DWDM grid 上提供 51.2 Tbps I/O，并强调波长稳定和自修复能力"
      ],
      "detail": "<h5>核心示意图</h5>\n<p><img alt=\"Lightmatter Passage M1000\" src=\"https://lightmatter.co/wp-content/uploads/2025/03/M1000_Module_2_000-1159x1400.webp\" />\n<em>图：Lightmatter 官方 M1000 产品图。M1000 是 Passage M-series 3D Photonic Superchip 参考平台，用主动光子 interposer 承载大 die complex 的高密度光 I/O。</em></p>\n<h5>互连调度伪代码</h5>\n<pre><code class=\"language-python\"># Passage: 在大规模 XPU 域中为 collective traffic 分配光互连资源的抽象流程\ndef passage_scaleup_collective(xpu_mesh, collective, passage_fabric):\n    traffic = build_collective_traffic_matrix(xpu_mesh, collective)\n\n    # 1) 根据通信距离和带宽需求选择 L-series 或 M-series 路径\n    for flow in traffic.flows:\n        if flow.inside_large_die_complex:\n            flow.path = passage_fabric.m_series_interposer.route(flow.src, flow.dst)\n        elif flow.near_package_or_board:\n            flow.path = passage_fabric.l_series_module.route(flow.src, flow.dst)\n        else:\n            flow.path = passage_fabric.fiber_link.route(flow.src, flow.dst)\n\n    # 2) DWDM/BiDi 资源分配：同一 fiber 上复用多个 wavelength，并利用双向链路提升 radix\n    for path in passage_fabric.paths:\n        demands = traffic.demands_on(path)\n        wavelengths = allocate_wavelengths(demands, grid=passage_fabric.dwdm_grid)\n        configure_bidirectional_links(path, wavelengths)\n\n    # 3) 若 fabric 支持 optical circuit switching，对大流/同步热点建立光路\n    for hotspot in detect_synchronization_hotspots(traffic):\n        passage_fabric.optical_circuit_switch.connect(hotspot.sources, hotspot.sinks)\n\n    # 4) 执行 all-reduce / all-gather / all-to-all 等 scale-up collective\n    latency = simulate_or_measure_collective(traffic, passage_fabric)\n    return latency\n</code></pre>\n<h5>Shoreline 瓶颈与 Edgeless I/O</h5>\n<p>传统电互连和常规光 I/O 都受芯片边缘长度限制：计算 die 的面积随 <span class=\"kb-math kb-math-inline\">r^2</span> 增长，但可放 I/O bump、SerDes、光引擎或连接器的周长只随 <span class=\"kb-math kb-math-inline\">r</span> 增长。带宽需求来自整个芯片面积，I/O 供给却被挤在边缘，这就是 Lightmatter 文档反复强调的 shoreline bottleneck。</p>\n<p>可以把传统边缘 I/O 的可扩展性写成：</p>\n<div class=\"kb-math kb-math-display\">B_{\\text{edge}} \\propto \\rho_{\\text{edge}} \\cdot 2\\pi r</div>\n<p>而 3D photonic interposer 或 area-array I/O 的目标是让带宽随面积扩展：</p>\n<div class=\"kb-math kb-math-display\">B_{\\text{area}} \\propto \\rho_{\\text{area}} \\cdot \\pi r^2</div>\n<p>Passage 的工程含义是把电-光接口垂直集成到封装内部：M-series 把 photonic interposer 放在 die complex 下方，在整个表面提供 I/O；L-series 则把相同思想落到 near-package、on-board、co-packaged optics 形态。这样，scale-up fabric 不再被封装边缘可逃逸信号数量卡死。</p>\n<h5>M1000：主动光子 interposer</h5>\n<p>M1000 是 Passage 最典型的“3D 光子互连”形态。官方产品页称其为 4000 mm² photonic interposer，可服务大规模 die complex，具备 256 根 optical fibers、1.5 kW+ power delivery 和内置 solid-state optical circuit switching。Lightmatter 2026 博客进一步说明，M-series 将 I/O 布置在完整 die area 上，达到约 1 Tbps/mm² 的面积 I/O 密度；M1000 参考平台已展示 114 Tbps 聚合双向带宽，并在包含激光功率时达到 2.3 pJ/bit。</p>\n<p>M1000 的关键不只是“把光纤插得更多”。它把光子 waveguide、调制/探测、电源/热路径和芯片间路由共同纳入 interposer。对于 all-reduce、all-gather、all-to-all 等同步通信，最慢链路会决定 step time；把光路带到 package 内部，可以缩短高损耗电路径，减少 retimer/DSP 依赖，并让高带宽 fiber 直接服务 XPU 域内的 collective traffic。</p>\n<h5>L200/L20：从 CPO 到 near-package/on-board</h5>\n<p><img alt=\"Lightmatter Passage L200\" src=\"https://lightmatter.co/wp-content/uploads/2026/03/l200-hero.webp\" />\n<em>图：Lightmatter 官方 L200 产品图。L200/L200X 是 Passage L-series 3D co-packaged optics 产品，面向下一代 XPU 和 switch 的 32/64 Tbps optical I/O。</em></p>\n<p>L200 是 L-series 中更靠近 co-packaged optics 的形态。官方页面写明，L200/L200X 分别提供 32/64 Tbps optical I/O，total I/O 超过 200 Tbps/chip，采用 3D chip-on-wafer 集成，支持 PAM4（56G/112G）、detachable fiber、&lt;5 pJ/bit optical efficiency，以及 10 m 到 2 km direct-drive reach。它面向 frontier-scale training，目标是在 XPU 或 switch 周边提供远高于传统 pluggable 的带宽密度。</p>\n<p>L20 则是更易部署的 near-package / on-board optics 方案。官方规格为 6.4 Tbps each direction，总计 12.8 Tbps aggregate bandwidth，采用 212.5 Gbps PAM4、32 data fibers、37.5 mm × 26.4 mm BGA 封装，能效 5 pJ/bit，并强调相对 OSFP 体积小 88%。它的定位不是替代 M1000，而是让没有能力立即改 package 的系统也能缩短 PCB 电路径，把高速光互连靠近 ASIC。</p>\n<h5>DWDM、BiDi 与外部激光</h5>\n<p>Passage 平台宣称支持 56-448 Gbps per lane、1-16+ wavelengths、bidirectional architecture 和 built-in optical circuit switching。多波长 DWDM 让单根 fiber 承载多个颜色通道，BiDi 让同一物理 fiber 同时支持两个方向的通信，提高有效 radix。对大规模 AI 集群而言，这直接影响 collective 通信的可用带宽和拓扑灵活性。</p>\n<p>Guide 是配套外部激光源。Lightmatter 2026 博客称单个 Guide 1 模块可在 1310 nm 附近的 16-wavelength DWDM grid 上提供 51.2 Tbps I/O，替代多个传统 ELSFP laser modules，并强调波长稳定、自修复和与 OCI MSA 的对齐。把激光源外置的好处是热管理和可维护性更好，光引擎侧只需要接收稳定的多波长光源。</p>\n<h5>30W 到 9W 的动机与 Passage 的定位</h5>\n<p>prompt 中的 motivation 写到“链路功耗从 30W 降至 9W”。公开资料中，30W/port 到 9W/port 常作为 CPO 相对传统 pluggable optics 的行业级对比，用于说明去掉长电链路、retimer/DSP 和前面板 pluggable 约束后的功耗收益。对 Passage 来说，更直接的官方量化指标是 L20 的 5 pJ/bit、L200 的 &lt;5 pJ/bit optical、M1000 的 2.3 pJ/bit（含激光）以及 M1000 的 114 Tbps 聚合带宽。</p>\n<p>因此，Passage 的技术贡献应理解为封装级光互连体系，而不是单个光模块指标。它把光 I/O 从“交换机前面板模块”前移到 near-package、co-packaged 或 interposer 位置，在物理上减少高速电信号走线距离，在架构上扩大 scale-up domain，在系统上为数千 XPU 的同步通信提供更低能耗的带宽来源。</p>\n<div class=\"key-point\">💡 关键：Passage 的价值不只是每 bit 更省电，而是把 I/O scaling law 从“沿边缘增长”改成“随面积增长”，这对 AI scale-up fabric 比单条链路速率更重要。</div>",
      "quiz": {
        "q": "Lightmatter Passage 的 Edgeless I/O 主要解决什么问题？",
        "options": [
          "传统芯片 I/O 受 die 边缘长度限制，而 3D 光子集成可让带宽密度随面积扩展",
          "把所有 GPU 计算替换为纯光学矩阵乘法",
          "取消外部激光源，使每个光链路完全无功耗",
          "只提升单个 CPU 核心的整数 ALU 吞吐"
        ],
        "answer": 0,
        "explain": "Passage 的核心是把电-光接口从封装边缘移向 3D interposer 或近封装区域，使 I/O 不再只受 shoreline 周长限制。"
      }
    },
    {
      "id": "rebellions_chiplet",
      "num": 51,
      "name": "Rebellions Quad-Chiplet",
      "fullName": "Rebellions四芯粒AI SoC (Rebellions Quad-Chiplet AI SoC)",
      "year": "2026",
      "org": "Rebellions",
      "parent": "—",
      "paperUrl": "https://isscc.org/2026-highlights/",
      "projectUrl": "",
      "category": "chiplet",
      "motivation": "四芯粒4nm NPU与HBM3E UCIe互连",
      "summary": "Rebellions Quad-Chiplet 把四个 4nm NPU chiplet、四组 HBM3E 和 UCIe-Advanced die-to-die 互连封装成一个近似单芯片的软件视图，解决大模型推理中单裸片面积、HBM 容量和跨芯粒同步难以同时扩展的问题。",
      "keyPoints": [
        "四个同构 NPU chiplet 组成单个 AI SoC，每个 chiplet 侧接 HBM3E，并通过 UCIe-Advanced 互连扩展成全芯片 mesh",
        "官方白皮书规格给出 2,048 TFLOPS FP8、1,024 TFLOPS FP16、144 GB HBM3E、4.8 TB/s HBM 带宽和最高 600 W 功耗",
        "UCIe-Advanced 链路工作在 16 Gbps，官方资料披露每通道 1 TB/s 双向吞吐和约 11 ns 全路径芯粒间延迟",
        "On-chip mesh 跨 UCIe 延伸，使 DMA、neural core、shared memory、HBM 和同步单元以 load-store 语义访问本地或远端资源",
        "统一混合精度计算核支持 FP8/FP16/FP32 的按操作数配置，减少为不同精度复制算术单元的面积浪费",
        "预测式、软件可配置 DMA 为长上下文 decode 的 KV cache 访问提供 QoS、多路径路由和本地/远端 HBM 交织",
        "层次化同步管理器用控制虚拟通道和硬件 peer-to-peer 通信协调跨芯粒执行，面向 prefill、decode、稀疏和 MoE 工作负载"
      ],
      "detail": "<h5>核心示意图</h5>\n<p><img alt=\"REBEL-Quad 四芯粒 SoC 架构图\" src=\"https://rebellions.ai/wp-content/uploads/2025/05/REBEL-Q_chiplet.png\" />\n<em>图：Rebellions 官方 REBEL-Quad 白皮书中的四同构 chiplet 方框图。图中每个 chiplet 包含 neural core、shared memory、task DMA、sync manager、UCIe-A 和 HBM3E 接口；来源：https://rebellions.ai/peta-scale-soc-for-massive-ai-serving-rebel-quad/</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># REBEL-Quad 推理时的跨芯粒数据调度抽象\ndef rebel_quad_infer(request_batch, model_shards, quad_chiplet):\n    mesh = quad_chiplet.full_chip_mesh_over_ucie()\n\n    for layer in model_shards.layers:\n        # Prefill 更偏 compute-bound，decode 更偏 KV-cache bandwidth-bound。\n        phase = classify_phase(request_batch)\n        plan = compiler_plan(layer, phase, mesh)\n\n        for chiplet in quad_chiplet.chiplets:\n            dma_cmds = []\n            for tile in plan.tiles_on(chiplet):\n                src = choose_hbm(tile, prefer_local=True, allow_remote=True)\n                path = mesh.route(src, tile.neural_core, qos=tile.priority)\n                dma_cmds.append(make_dma(src, tile.spmem, path))\n\n            chiplet.task_dma.issue(dma_cmds)\n            chiplet.neural_cores.run_mixed_precision(\n                op=layer.op,\n                precision=plan.precision,   # FP8/FP16/FP32 per operand\n                tiles=plan.tiles_on(chiplet),\n            )\n\n        if plan.has_cross_chiplet_dependency:\n            quad_chiplet.sync_manager.barrier_or_p2p(plan.dependency_graph)\n\n    return gather_logits_from_mesh(request_batch)\n</code></pre>\n<h5>方法机制解读</h5>\n<p>Rebellions 的设计动机不是简单把四颗小芯片放进同一个封装，而是让推理软件尽量看到一个“单体化”的大 NPU。LLM 推理的 prefill 阶段主要消耗矩阵乘算力，decode 阶段则被 KV cache 和权重读取限制；单裸片继续做大，会同时碰到 reticle 面积、良率、HBM 引脚和供电完整性问题。四芯粒方案把计算与 HBM 容量横向扩展，但如果 die-to-die 链路只像外部网络一样工作，远端 HBM、跨芯粒同步和专家路由会把收益吃掉。因此该 SoC 的关键在于 UCIe-Advanced 与 full-chip mesh 的组合：跨芯粒传输仍被纳入片上数据通路和同步语义，而不是退化成软件显式管理的多卡通信。</p>\n<p><img alt=\"统一混合精度计算核\" src=\"https://rebellions.ai/wp-content/uploads/2025/08/mixed-precision-arithmetic-core-1024x951.png\" />\n<em>图：统一 multi-/mixed-precision arithmetic core。官方说明其按操作数配置精度，减少 FP8/FP16/BF16 分离单元带来的面积和调度浪费；来源同上。</em></p>\n<p>统一混合精度计算核面向的是 LLM 推理中精度需求随算子变化的问题。Transformer 中大部分 GEMM 可使用 FP8/BF16/FP16 获得高吞吐，而归一化、累加、logits 或部分控制计算需要更高精度。如果每种精度都配置独立流水线，面积和寄存器/片上存储端口会被碎片化；如果统一走高精度流水线，decode 的吞吐和能效又会下降。REBEL-Quad 的思路是将乘法、对齐、加法、归一化和 tensor/vector/load-store 管线整合成可配置执行路径。对矩阵乘可以抽象为：</p>\n<div class=\"kb-math kb-math-display\">Y = \\operatorname{dequant}_{p_o}\\left(\n\\sum_i \\operatorname{quant}_{p_a}(X_i)\n\\operatorname{quant}_{p_w}(W_i)\n\\right)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">p_a</span>、<span class=\"kb-math kb-math-inline\">p_w</span>、<span class=\"kb-math kb-math-inline\">p_o</span> 可按输入、权重和输出选择不同精度。这样做的直觉是，把“精度选择”变成指令和数据流属性，而不是变成互相竞争的硬件单元，从而让 FP8 prefill 和较高精度的控制/归约共享同一套核心资源。</p>\n<p><img alt=\"Neural core 与 DMA 数据搬运图\" src=\"https://rebellions.ai/wp-content/uploads/2025/08/neural-cores-and-DMA-engines-1024x468.png\" />\n<em>图：Full-chip data transfer utilizing neural cores and DMA engines。图中展示 task-level DMA、mesh router、UCIe、HBM3E、shared memory 与 2.7 TB/s 级有效数据通路；来源同上。</em></p>\n<p>预测式 DMA 是 decode 性能的核心。decode 每生成一个 token 都要读取大量历史 KV cache，批量小、访问长尾明显，单纯提高峰值算力帮助有限。官方资料强调 DMA 可同时访问 local HBM、remote HBM 和 shared memory，并使用多路径路由和 QoS 降低延迟尖峰。一个粗略的 decode 层时延可以写成：</p>\n<div class=\"kb-math kb-math-display\">T_{\\text{decode}} \\approx\n\\max\\left(\n\\frac{F_{\\text{GEMM}}}{P_{\\text{NPU}}},\n\\frac{B_{\\text{local HBM}}}{BW_{\\text{HBM}}},\n\\frac{B_{\\text{remote}}}{BW_{\\text{UCIe}}}\n\\right) + T_{\\text{sync}}</div>\n<p>四芯粒架构要赢，必须让第三项和同步项足够小。UCIe-Advanced 的每通道 1 TB/s 双向吞吐和约 11 ns 全路径延迟，就是为了让远端 HBM 和跨芯粒 shared memory 访问不把每 token 的关键路径拉长。多路径 mesh 还可以把带宽压力分散到不同链路，避免某个 HBM 或某条 die-to-die 边成为 decode 热点。</p>\n<p>同步机制解决的是“看起来像单芯片”所需的控制面。跨芯粒执行并不只搬数据，还要处理 kernel 依赖、peer-to-peer 通知、MoE expert routing、prefill/decode 并发等细粒度事件。Rebellions 在每个 chiplet 放置 sync manager，并使用专用控制虚拟通道承载同步消息，使数据 DMA 与控制同步不互相阻塞。对四芯粒系统，可把执行图表示为有向无环图 <span class=\"kb-math kb-math-inline\">G=(V,E)</span>，其中节点是 tile/kernel，边是跨 core 或跨 chiplet 依赖。硬件同步的目标是让依赖满足时间：</p>\n<div class=\"kb-math kb-math-display\">\\forall (u,v)\\in E,\\quad start(v) \\ge finish(u)+latency(u,v)</div>\n<p>同时尽量把 <span class=\"kb-math kb-math-inline\">latency(u,v)</span> 隐藏在其他 core 的计算或 DMA 中。和传统多卡推理相比，这种做法减少了 host/runtime 参与的 barrier 与显式通信调度，让编译器和片上控制器直接管理细粒度依赖。</p>\n<p>与典型 GPU scale-up 的区别在于，Rebellions 选择了“封装内单 SoC 化”的路径。NVLink/NVSwitch 更像高性能设备间网络，软件仍然把多个 GPU 作为多个加速器管理；REBEL-Quad 则把四个同构 compute chiplet、HBM3E、UCIe 和 mesh 封装成一个面向大模型推理的单节点单元。收益是芯粒复用、良率和 HBM 容量扩展，代价是 die rotation、供电完整性、UCIe PHY、跨芯粒调试和软件栈必须共同设计。官方资料还提到 integrated silicon capacitor 和实时 debug 等可靠性机制，说明 4 TB/s 级封装内互连不只是逻辑架构问题，也强依赖封装、电源和信号完整性。</p>\n<div class=\"key-point\">💡 关键：Rebellions Quad-Chiplet 的核心不是“芯粒数量为四”，而是把 UCIe、mesh、DMA、HBM3E、混合精度核心和同步管理放在同一数据流模型下，使 LLM 推理的 compute-bound prefill 与 bandwidth-bound decode 都能跨芯粒扩展。</div>",
      "quiz": {
        "q": "Rebellions Quad-Chiplet 为什么需要把 UCIe-Advanced 接入 full-chip mesh，而不是只把四个 NPU 当作普通多卡互连？",
        "options": [
          "为了让跨芯粒 HBM、DMA、同步和 peer-to-peer 通信尽量保留片上 load-store 语义，降低 LLM 推理的远端访问和控制开销",
          "为了禁止每个 chiplet 使用本地 HBM3E",
          "为了把所有 FP8 计算改成 CPU 执行",
          "为了只提升训练数据加载速度，而不影响推理"
        ],
        "answer": 0,
        "explain": "四芯粒扩展的瓶颈在远端 HBM、跨芯粒依赖和同步开销。UCIe-Advanced 叠加 full-chip mesh 可把这些通信纳入片上数据通路，使封装更接近一个单体 NPU。"
      }
    },
    {
      "id": "flare_chiplet",
      "num": 52,
      "name": "FLARE",
      "fullName": "细粒度CIM异构多芯粒加速器 (FLARE Multi-Chiplet LLM Accelerator)",
      "year": "2026",
      "org": "IEEE JETCAS",
      "parent": "—",
      "paperUrl": "https://ieeexplore.ieee.org/abstract/document/11456071/",
      "projectUrl": "",
      "category": "chiplet",
      "motivation": "细粒度CIM异构多芯粒LLM加速器",
      "summary": "FLARE 提出面向大语言模型的细粒度 in-memory computing 异构多芯粒加速器和硬件/软件协同栈，把 LLM 分区、core 级映射、chiplet 级协调和硬件配置搜索联合起来，缓解传统 H100 类 GPU 在低能效数据搬运和跨芯粒通信上的瓶颈。",
      "keyPoints": [
        "目标工作负载是 multi-billion-parameter LLM，在推理中同时受低延迟通信、权重/激活数据搬运和能效约束",
        "架构方向是 heterogeneous in-memory computing multi-chiplet accelerator，将计算靠近存储，降低冯诺依曼式权重搬运",
        "软件栈包含 LLM partitioning、workload mapping 和 hardware configuration identification 三类定制算法",
        "方法采用 bottom-up 视角，从 CIM core 级执行开始建模，再上升到 chiplet 级协调，而不是先假设固定 chiplet 拓扑",
        "细粒度映射把 layer、micro-batch、算子类型和 core/chiplet 资源拆开处理，可表达更灵活的数据流和并行策略",
        "论文通过 cycle-accurate evaluation 报告最高 4× token throughput 和 30× energy efficiency，相比对象是同类 workload 上的 H100 GPU",
        "论文图和 PDF 在公开网页中不可直接访问；本文的示意图使用公开 PIM chiplet 架构图作为背景，并明确不是 FLARE 原图"
      ],
      "detail": "<h5>核心示意图</h5>\n<p><img alt=\"Chiplet-based PIM architecture background\" src=\"https://mdpi-res.com/micromachines/micromachines-13-01790/article_deploy/html/images/micromachines-13-01790-g003-550.jpg\" />\n<em>图：公开综述论文《Using Chiplet Encapsulation Technology to Achieve Processing-in-Memory Functions》中的 chiplet-based PIM 架构图，展示 interposer、NoP、memory/compute chiplet 与 Simba-style chiplet。FLARE 的 IEEE 论文图没有公开可直达 URL，因此这里用可信公开图片说明 FLARE 所属的 PIM chiplet 架构背景；来源：https://www.mdpi.com/2072-666X/13/10/1790</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># FLARE 风格的细粒度 LLM-to-CIM-chiplet 映射搜索抽象\ndef flare_mapping_search(llm_graph, hardware_space, workload_profile):\n    best = None\n\n    for hw in enumerate_hardware_configs(hardware_space):\n        # bottom-up: 先评估 core/CIM array 能执行哪些 tile，再组合到 chiplet。\n        core_cost = {}\n        for op in llm_graph.ops:\n            for tile in partition_op_to_tiles(op):\n                for core in hw.cim_cores + hw.digital_cores:\n                    core_cost[(tile, core)] = estimate_core_latency_energy(tile, core)\n\n        candidates = initialize_mappings(llm_graph, hw, core_cost)\n        for mapping in improve_with_search(candidates):\n            schedule = build_chiplet_schedule(mapping, hw.network_on_package)\n            latency = simulate_cycle_accurate(schedule, workload_profile)\n            energy = estimate_energy(schedule, hw)\n            score = objective(latency, energy, constraints=hw.area_power_limits)\n\n            if best is None or score &lt; best.score:\n                best = Result(hw=hw, mapping=mapping, schedule=schedule,\n                              latency=latency, energy=energy, score=score)\n\n    return best\n</code></pre>\n<h5>方法机制解读</h5>\n<p>FLARE 关注的是 LLM 在多芯粒 CIM 系统上“能算”和“算得满”之间的差距。CIM 的优势是把矩阵乘所需的权重留在存储阵列附近，通过阵列内或近阵列计算降低权重搬运能耗。对一层线性变换：</p>\n<div class=\"kb-math kb-math-display\">Y = XW</div>\n<p>传统 GPU 每次执行都要把 <span class=\"kb-math kb-math-inline\">W</span> 从 HBM 经过缓存层级搬到计算单元附近；CIM 则希望把 <span class=\"kb-math kb-math-inline\">W</span> 常驻在计算存储阵列中，只移动输入激活 <span class=\"kb-math kb-math-inline\">X</span> 和输出 <span class=\"kb-math kb-math-inline\">Y</span>。能耗可粗略写成：</p>\n<div class=\"kb-math kb-math-display\">E_{\\text{total}} =\nE_{\\text{compute}} +\nN_X e_X +\nN_Y e_Y +\nN_W e_W</div>\n<p>FLARE 这类架构的目标是显著降低权重搬运项 <span class=\"kb-math kb-math-inline\">N_W e_W</span>，尤其是 FFN/MLP 和投影矩阵在 decode 阶段被反复读取时的能耗。</p>\n<p><img alt=\"2.5D HBM/logic PIM packaging background\" src=\"https://mdpi-res.com/micromachines/micromachines-13-01790/article_deploy/html/images/micromachines-13-01790-g004-550.jpg\" />\n<em>图：同一公开综述中的 2.5D CoWoS/HBM/logic chiplet 背景图。用于说明 CIM chiplet 与高带宽封装互连的关系，不是 FLARE 原论文图。</em></p>\n<p>难点在于 LLM 并不是单一的大矩阵乘。Attention 包含 Q/K/V 投影、softmax、KV cache 读写、输出投影；FFN 包含 up/gate/down projection 和非线性；不同阶段还存在 prefill 的大 batch GEMM 与 decode 的小 batch GEMV 差异。如果只把所有线性层粗粒度切到若干 chiplet，CIM core 可能因 tile 太小、跨芯粒 all-to-all 太多或阵列容量不匹配而空转。FLARE 摘要强调 fine-grained hardware-software stack，说明它把分区粒度下沉到 core 级执行，把“某层放在哪个 chiplet”进一步细化为“哪个 tile、哪个 micro-batch、哪个算子片段由哪类核心执行”。</p>\n<p>这种 bottom-up 方法可以用一个映射目标函数概括：</p>\n<div class=\"kb-math kb-math-display\">\\min_{m \\in \\mathcal{M}}\n\\left[\n\\max_{c \\in C}\n\\left(\n\\frac{\\operatorname{ops}_c(m)}{\\operatorname{throughput}_c}\n+\n\\frac{\\operatorname{bytes}_c(m)}{\\operatorname{bw}_c}\n\\right)\n+\n\\sum_{(u,v)\\in E_m}\n\\frac{\\operatorname{traffic}_{u,v}}{\\operatorname{bw}_{u,v}}\n\\right]</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">m</span> 是候选映射，<span class=\"kb-math kb-math-inline\">c</span> 是 core/chiplet，<span class=\"kb-math kb-math-inline\">E_m</span> 是映射诱导出的跨 core 或跨 chiplet 通信。第一项捕捉每个资源上的计算和本地存储瓶颈，第二项捕捉 NoP/inter-chiplet 传输。FLARE 与只做 layer-level placement 的方法不同，关键在于 <span class=\"kb-math kb-math-inline\">\\mathcal{M}</span> 允许更细的 tile、数据流和硬件配置组合，因此可以在 CIM 阵列利用率与通信开销之间寻找更优折中。</p>\n<p>硬件异构性是 FLARE 的另一层重点。CIM core 适合权重驻留、矩阵/向量乘和高复用线性层；数字 core 或外围逻辑更适合 softmax、归一化、采样、控制流以及需要高精度累加的部分。异构多芯粒系统还会有不同容量、带宽、互连半径和功耗约束。FLARE 的 hardware configuration identification 就是从这些选择中找出适合特定 LLM 类别的组合，而不是假定单一固定 accelerator。对小模型或低 batch decode，片上容量和启动延迟更关键；对大模型或高并发 prefill，NoP 带宽和跨芯粒并行度更关键。</p>\n<p>从推理流程看，FLARE 的编译/运行时可分为三步。第一步，解析 Transformer 计算图和 workload profile，得到层形状、序列长度、batch、prefill/decode 比例和 KV cache 压力。第二步，把权重矩阵切成 CIM array 可容纳的 tile，并决定哪些激活在 chiplet 内复用、哪些需要跨 chiplet 广播或规约。第三步，生成 core 级 schedule，并用 cycle-accurate 模型评估延迟、能耗和硬件利用率。论文摘要中报告最高 4× token throughput 与 30× energy efficiency，直觉上来自两类叠加收益：权重移动减少带来的能耗下降，以及细粒度映射减少资源空转带来的吞吐提升。</p>\n<p>与 H100 类 GPU 的根本区别在内存层级角色。GPU 依赖 HBM 提供通用高带宽，计算核心高度可编程，适合广泛算子；CIM chiplet 把部分权重存储本身变成计算资源，牺牲一定通用性来降低数据搬运。FLARE 的价值不只是提出一种 CIM 宏，而是把多芯粒封装、核心级映射、LLM 分区和硬件配置搜索放到同一个设计循环中。这样才能避免单个 CIM core 很高效、系统级却被跨芯粒通信或负载不均衡抵消的常见问题。</p>\n<div class=\"warn-box\">⚠️ 注意：IEEE Xplore 页面、Crossref 元数据和 ResearchGate 摘要可验证 FLARE 的标题、作者、期刊、页码、核心贡献与 4×/30× 结果；本文未能取得公开可直达的 FLARE 原论文图片，因此涉及具体宏电路细节时仅解释公开摘要支持的系统机制，不臆造未公开图表。</div>",
      "quiz": {
        "q": "FLARE 为什么强调从 core 级到 chiplet 级的 bottom-up 细粒度映射，而不是只做 layer 级分配？",
        "options": [
          "因为 LLM 算子形态、CIM 阵列容量、NoP 通信和异构核心能力都可能在更细粒度上决定利用率",
          "因为 CIM 系统不需要考虑任何通信开销",
          "因为所有 Transformer 层都必须完整放在同一个 core 中",
          "因为 H100 GPU 没有 HBM"
        ],
        "answer": 0,
        "explain": "FLARE 的核心问题是多芯粒 CIM 系统中的分区和映射。细粒度建模可以同时约束 core 利用率、阵列容量和跨芯粒通信，避免粗粒度 layer placement 导致系统级瓶颈。"
      }
    },
    {
      "id": "deepstack_3d",
      "num": 53,
      "name": "DeepStack",
      "fullName": "分布式3D堆叠AI加速器 (DeepStack Distributed 3D-Stacked Accelerator)",
      "year": "2026",
      "org": "arXiv",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2604.04750",
      "projectUrl": "",
      "category": "chiplet",
      "motivation": "分布式3D堆叠架构优化LLM推理效率",
      "summary": "DeepStack 提出了面向 3D 堆叠 DRAM 加速器的端到端性能建模与设计空间探索（DSE）框架，通过事务感知的 3D DRAM 带宽建模、层次化片上网络（NoC）仿真、完整并行策略搜索（TP/EP/SP/CP/DP/PP）以及热-功耗协同约束，在 \\(\\sim 2.5 \\times 10^{14}\\) 的设计空间中高效搜索最优硬件-软件配置，相比基线实现最高 9.5× 的吞吐提升。",
      "keyPoints": [
        "<strong>五层层次化硬件建模</strong>：PE → Cluster（3D DRAM 堆叠）→ Die（L1 NoC）→ Chip（L2 UCIe）→ System（L3 Ethernet），覆盖从计算单元到多芯片集群的完整架构",
        "<strong>事务感知 3D DRAM 带宽模型</strong>：捕获四个关键效应——(i) 事务大小依赖带宽、(ii) Little's Law 缓冲约束、(iii) bank 并行度受限、(iv) bank 冲突，精确建模有效带宽与理论带宽的差距",
        "<strong>双阶段网络建模</strong>：Stage 1 构建逻辑流量矩阵（与拓扑无关），Stage 2 映射到物理拓扑并执行路由仿真，比 NS-3 快 <span class=\"kb-math kb-math-inline\">10^5</span>× 且误差仅 2.12%",
        "<strong>完整并行策略搜索</strong>：支持 TP × EP × SP × CP × DP × PP = N 的全维度搜索，允许不同模块（Attention/MoE/MLP）采用独立并行策略",
        "<strong>Tile 级 Compute-Communication Overlap</strong>：将算子拆分为 tile 粒度的流水线，通过 prologue-steady-epilogue 三阶段模型精确估计端到端延迟",
        "<strong>热-功耗协同约束</strong>：集成 1D 稳态热模型，将 DRAM 层数、功率密度与温度约束（85°C）纳入 DSE 循环",
        "<strong>多阶段剪枝 DSE</strong>：通过并行策略可行性检查、内存占用过滤、层次化 NoC 搜索等策略，将 <span class=\"kb-math kb-math-inline\">\\sim 2.5 \\times 10^{14}</span> 的搜索空间压缩至 512 核 CPU 上约 2 天可完成",
        "<strong>关键设计洞察</strong>：batch size 比 prefill/decode 区分更能决定最优架构；DRAM 堆叠层数存在倒 U 型曲线（&gt;9 层有效带宽反而下降）；不完整的并行策略搜索会永久扭曲架构设计"
      ],
      "detail": "<h5>框架总览</h5>\n<p><img alt=\"DeepStack 框架总览\" src=\"https://ar5iv.labs.arxiv.org/html/2604.04750/assets/x1.png\" />\n<em>图：DeepStack 框架总览。左侧为五层层次化硬件模型（PE→Cluster→Die→Chip→System），中间为系统级分布式推理建模（并行策略搜索 + 网络仿真 + overlap 建模），右侧为 DSE 引擎输出 Pareto 最优设计。</em></p>\n<p>DeepStack 的核心架构分为三个紧密耦合的子系统：</p>\n<ol>\n<li><strong>芯片级 3D DRAM 性能建模</strong>：在单个 Cluster（compute die + 3D DRAM 层）粒度上，精确建模计算吞吐、DRAM 有效带宽、面积分配和热约束。</li>\n<li><strong>系统级分布式推理建模</strong>：将多个 Cluster 组织为 Die → Chip → System 的层次化互连，建模完整的 LLM 推理流水线，包括并行策略、集合通信和 compute-comm overlap。</li>\n<li><strong>DSE 引擎</strong>：在硬件配置（SM 数量、DRAM 层数、NoC 拓扑/带宽）× 软件配置（并行策略）的联合空间中搜索 Pareto 最优解。</li>\n</ol>\n<h5>3D DRAM 有效带宽建模</h5>\n<p>这是 DeepStack 最核心的技术贡献之一。传统建模工具假设 DRAM 带宽为常数，但 3D 堆叠 DRAM 的有效带宽受多个因素制约：</p>\n<pre><code class=\"language-python\"># DeepStack 3D DRAM 有效带宽计算伪代码\ndef compute_effective_bandwidth(config, workload):\n    # Step 1: 事务大小依赖带宽\n    # 小事务无法填满 burst length，带宽利用率下降\n    txn_size = workload.transaction_size\n    burst_len = config.dram.burst_length\n    bw_txn = config.dram.peak_bw * min(txn_size / burst_len, 1.0)\n\n    # Step 2: Little's Law 缓冲约束\n    # 有效带宽 ≤ buffer_entries × txn_size / latency\n    # 需要足够的 outstanding requests 才能饱和带宽\n    max_outstanding = config.l1_buffer_entries\n    dram_latency = config.dram.access_latency  # ~ns级\n    bw_littles = max_outstanding * txn_size / dram_latency\n\n    # Step 3: Bank 并行度受限\n    # 有效带宽 ≤ num_banks × bank_bandwidth\n    bw_bank = config.dram.num_banks * config.dram.per_bank_bw\n\n    # Step 4: Bank 冲突建模\n    # 随机访问模式下，N个请求命中B个bank的冲突概率\n    N_req = max_outstanding\n    B_banks = config.dram.num_banks\n    # 期望独立bank数 = B * (1 - (1-1/B)^N)\n    effective_banks = B_banks * (1 - (1 - 1/B_banks)**N_req)\n    bw_conflict = effective_banks * config.dram.per_bank_bw\n\n    # 最终有效带宽 = 四个约束的最小值\n    effective_bw = min(bw_txn, bw_littles, bw_bank, bw_conflict)\n    return effective_bw\n</code></pre>\n<div class=\"key-point\">💡 <strong>关键洞察</strong>：理论带宽随 DRAM 层数线性增长，但有效带宽在约 9 层后出现倒 U 型下降。这是因为 Little's Law 约束了 outstanding requests 数量——当 DRAM 层数增加时，理论带宽增大，但 L1 缓冲区深度有限，无法产生足够的并发请求来饱和更高的带宽。</div>\n<p>四个约束的数学表达：</p>\n<div class=\"kb-math kb-math-display\">BW_{\\text{eff}} = \\min\\left( BW_{\\text{txn}}, \\; \\frac{N_{\\text{buf}} \\cdot S_{\\text{txn}}}{t_{\\text{lat}}}, \\; N_{\\text{banks}} \\cdot BW_{\\text{bank}}, \\; \\mathbb{E}[B_{\\text{active}}] \\cdot BW_{\\text{bank}} \\right)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\mathbb{E}[B_{\\text{active}}] = B \\cdot \\left(1 - \\left(1 - \\frac{1}{B}\\right)^N\\right)</span> 是 <span class=\"kb-math kb-math-inline\">N</span> 个请求在 <span class=\"kb-math kb-math-inline\">B</span> 个 bank 上的期望活跃 bank 数。</p>\n<h5>双阶段网络建模</h5>\n<p><img alt=\"网络建模双阶段\" src=\"https://ar5iv.labs.arxiv.org/html/2604.04750/assets/x3.png\" />\n<em>图：双阶段网络建模。Stage 1 从并行策略推导逻辑流量矩阵，Stage 2 将流量映射到物理拓扑执行路由仿真。</em></p>\n<p><strong>Stage 1: 逻辑流量矩阵构建</strong></p>\n<p>给定并行策略（如 TP=4, EP=8），DeepStack 自动推导每个集合通信操作（AllReduce、AllGather、All-to-All 等）的流量矩阵 <span class=\"kb-math kb-math-inline\">T \\in \\mathbb{R}^{N \\times N}</span>，其中 <span class=\"kb-math kb-math-inline\">T_{ij}</span> 表示节点 <span class=\"kb-math kb-math-inline\">i</span> 到节点 <span class=\"kb-math kb-math-inline\">j</span> 的数据传输量。</p>\n<p>关键创新在于<strong>并行策略到通信模式的自动映射</strong>：\n- <strong>TP (Tensor Parallelism)</strong>：在 Attention/MLP 层产生 AllReduce\n- <strong>EP (Expert Parallelism)</strong>：在 MoE 层产生 All-to-All\n- <strong>SP (Sequence Parallelism)</strong>：在 LayerNorm/Dropout 处产生 AllGather + ReduceScatter\n- <strong>CP (Context Parallelism)</strong>：长序列分片产生 P2P 通信\n- <strong>PP (Pipeline Parallelism)</strong>：跨 stage 的 P2P 传输 + pipeline bubble</p>\n<p>DeepStack 允许不同模块采用独立并行策略（如 Attention 用 TP，MoE 用 EP），并自动插入必要的重分布集合通信。</p>\n<p><strong>Stage 2: 物理拓扑映射与路由</strong></p>\n<pre><code class=\"language-python\"># Stage 2 网络仿真伪代码\ndef simulate_network(traffic_matrix, topology, routing_algo):\n    &quot;&quot;&quot;\n    将逻辑流量矩阵映射到物理拓扑，计算通信延迟\n    支持三层层次化拓扑: L1(Cluster内) / L2(Die内) / L3(Chip间)\n    &quot;&quot;&quot;\n    total_latency = 0\n    for src, dst, data_size in traffic_matrix.entries():\n        # 确定通信路径（跨越哪些层次）\n        path = routing_algo.find_path(src, dst, topology)\n\n        # 计算每一跳的延迟\n        hop_latency = sum(hop.latency for hop in path.hops)\n\n        # 计算传输延迟（考虑链路带宽和拥塞）\n        transfer_time = data_size / path.bottleneck_bandwidth\n\n        # 支持 ring / tree / direct 等集合通信算法\n        total_latency = max(total_latency, hop_latency + transfer_time)\n\n    return total_latency\n</code></pre>\n<p>该方法相比 NS-3 的离散事件仿真实现了 <span class=\"kb-math kb-math-inline\">\\sim 10^5 \\times</span> 加速（0.1s vs 3h），同时保持 2.12%（Switch）和 1.62%（Torus）的加权误差。</p>\n<h5>Tile 级 Compute-Communication Overlap</h5>\n<p>DeepStack 将每个算子（如 GEMM）拆分为多个 tile，实现计算与通信的流水线重叠：</p>\n<div class=\"kb-math kb-math-display\">T_{\\text{e2e}} = T_{\\text{prologue}} + (K-2) \\cdot \\max(T_{\\text{comp}}^{\\text{tile}}, T_{\\text{comm}}^{\\text{tile}}) + T_{\\text{epilogue}}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">K</span> 是 tile 数量，prologue 是第一个 tile 的通信时间（尚无计算可重叠），epilogue 是最后一个 tile 的计算时间（尚无通信可重叠），中间的 steady state 阶段取计算和通信的最大值。</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：overlap 的有效性取决于 tile 粒度的选择。tile 太大则流水线级数太少，overlap 不充分；tile 太小则启动开销占比增大。DeepStack 在 DSE 中搜索最优 tile 大小。</div>\n<h5>完整并行策略搜索</h5>\n<p>DeepStack 支持的并行策略空间为：</p>\n<div class=\"kb-math kb-math-display\">\\text{TP} \\times \\text{EP} \\times \\text{SP} \\times \\text{CP} \\times \\text{DP} \\times \\text{PP} = N</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">N</span> 为总设备数。关键设计决策包括：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>并行维度</th>\n<th>通信模式</th>\n<th>适用场景</th>\n<th>通信量</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>TP</td>\n<td>AllReduce</td>\n<td>小 batch，低延迟需求</td>\n<td><span class=\"kb-math kb-math-inline\">O(2 \\cdot \\frac{p-1}{p} \\cdot M)</span></td>\n</tr>\n<tr>\n<td>EP</td>\n<td>All-to-All</td>\n<td>MoE 模型，大 batch</td>\n<td><span class=\"kb-math kb-math-inline\">O(2 \\cdot \\frac{p-1}{p} \\cdot \\text{tokens} \\cdot d)</span></td>\n</tr>\n<tr>\n<td>SP</td>\n<td>AllGather + ReduceScatter</td>\n<td>长序列</td>\n<td><span class=\"kb-math kb-math-inline\">O(\\frac{p-1}{p} \\cdot M)</span></td>\n</tr>\n<tr>\n<td>CP</td>\n<td>P2P Ring</td>\n<td>超长上下文</td>\n<td><span class=\"kb-math kb-math-inline\">O(\\text{seq\\_len} \\cdot d / p)</span></td>\n</tr>\n<tr>\n<td>PP</td>\n<td>P2P + Bubble</td>\n<td>大模型分层</td>\n<td><span class=\"kb-math kb-math-inline\">O(\\text{hidden} \\cdot \\text{micro\\_bs})</span></td>\n</tr>\n<tr>\n<td>DP</td>\n<td>AllReduce (gradients)</td>\n<td>大 batch</td>\n<td><span class=\"kb-math kb-math-inline\">O(2 \\cdot \\frac{p-1}{p} \\cdot |\\theta|)</span></td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 <strong>关键发现</strong>：最优并行策略随 batch size 剧烈变化。小 batch 时 TP 主导（隐藏延迟），大 batch 时 PP 和 EP 更优（摊薄 bubble 和通信开销）。对于 MoE 模型，EP 在大 batch 下贡献最大增益（DeepSeek-V3 上 5.03× 提升）。</div>\n<h5>DSE 多阶段剪枝策略</h5>\n<pre><code class=\"language-python\"># DeepStack DSE 多阶段剪枝伪代码\ndef design_space_exploration(models, area_budget, thermal_limit):\n    &quot;&quot;&quot;\n    搜索空间 ~2.5×10^14，通过四阶段剪枝降至可行规模\n    &quot;&quot;&quot;\n    candidates = generate_all_configs()  # 硬件 × 并行策略\n\n    # Stage 1: 并行策略可行性 (剪枝 ~80%)\n    # 例: TP=1, DP=1 在给定batch下不可行\n    candidates = [c for c in candidates if is_parallel_feasible(c)]\n\n    # Stage 2: 内存占用检查 (剪枝 ~50%)\n    # 权重 + KV cache + 峰值激活 ≤ DRAM容量 × 0.9\n    candidates = [c for c in candidates \n                  if memory_footprint(c) &lt;= c.dram_capacity * 0.9]\n\n    # Stage 3: 层次化 NoC 搜索\n    # 先搜基础架构+堆叠配置，取 top 5%\n    top_arch = sorted(candidates, key=evaluate)[:len(candidates)*0.05]\n    # 再搜 NoC 延迟，取 top 5%\n    top_noc = sorted(top_arch, key=evaluate_noc)[:len(top_arch)*0.05]\n    # 最后逐层带宽微调\n    final = fine_tune_bandwidth(top_noc)\n\n    # Stage 4: 热约束过滤\n    final = [c for c in final if thermal_check(c) &lt;= thermal_limit]\n\n    return pareto_frontier(final)\n</code></pre>\n<h5>实验验证与关键结果</h5>\n<p><strong>建模精度</strong>：\n- 对比 Cadence Palladium 周期精确仿真：误差 &lt; 5%\n- 对比 8×H100 Triton-Distributed 内核：平均误差 3.97%（AllGather GEMM）\n- 对比 8×B200 vLLM 端到端推理：MAPE 12.18%\n- 对比 ASTRA-sim NS-3 后端：误差 2.12%（Switch）/ 1.62%（Torus），速度提升 <span class=\"kb-math kb-math-inline\">10^5</span>×</p>\n<p><strong>性能提升（消融实验，DeepSeek-V3 decode）</strong>：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>步骤</th>\n<th>技术</th>\n<th>STPS (BS=4)</th>\n<th>STPS (BS=1024)</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>1</td>\n<td>基线 (ASTRA-sim: DP/TP/PP)</td>\n<td>177.1</td>\n<td>5,729</td>\n</tr>\n<tr>\n<td>2</td>\n<td>+ 完整并行策略 (EP/SP/CP)</td>\n<td>256.4 (+45%)</td>\n<td>21,252 (+271%)</td>\n</tr>\n<tr>\n<td>3</td>\n<td>+ 模块级灵活并行</td>\n<td>256.4 (—)</td>\n<td>24,488 (+15%)</td>\n</tr>\n<tr>\n<td>4</td>\n<td>+ 芯片架构搜索</td>\n<td>314.2 (+23%)</td>\n<td>31,350 (+28%)</td>\n</tr>\n<tr>\n<td>5</td>\n<td>+ Compute-Comm Overlap</td>\n<td>340.5 (+8%)</td>\n<td>38,061 (+21%)</td>\n</tr>\n<tr>\n<td>6</td>\n<td>+ DRAM 层数 DSE</td>\n<td>493.3 (+45%)</td>\n<td>51,095 (+34%)</td>\n</tr>\n<tr>\n<td>7</td>\n<td>+ NoC DSE</td>\n<td>494.1 (+0.2%)</td>\n<td>54,280 (+6.2%)</td>\n</tr>\n<tr>\n<td>—</td>\n<td><strong>总加速比</strong></td>\n<td><strong>2.8×</strong></td>\n<td><strong>9.5×</strong></td>\n</tr>\n</tbody>\n</table></div>\n<h5>核心设计洞察</h5>\n<p><img alt=\"DRAM层数与有效带宽的倒U型关系\" src=\"https://ar5iv.labs.arxiv.org/html/2604.04750/assets/x5.png\" />\n<em>图：随 DRAM 堆叠层数增加，理论带宽线性增长，但有效带宽在约 9 层后下降（倒 U 型曲线），原因是 Little's Law 缓冲约束。</em></p>\n<p><strong>洞察 1：Batch size 比 prefill/decode 更能决定最优架构</strong></p>\n<p>传统 PD 解耦（prefill-decode disaggregation）将推理分为两个阶段分别优化。DeepStack 的 DSE 揭示了更本质的划分：\n- <strong>大 batch prefill</strong>：浅堆叠（2 层），最大化计算面积\n- <strong>小 batch prefill + 大 batch decode</strong>：中等堆叠（6-7 层），平衡计算与带宽\n- <strong>小 batch decode</strong>：深堆叠（~9 层），最大化带宽</p>\n<p>这意味着<strong>batch-size-aware 硬件解耦</strong>可能比 PD 解耦更有效。</p>\n<p><strong>洞察 2：不完整的并行策略搜索会永久扭曲硬件设计</strong></p>\n<p>消融实验表明，移除 EP 维度不仅降低吞吐，还导致 DSE 收敛到完全不同的芯片设计：\n- 有 EP：ep=32, tp=4, 7 层堆叠, 6 个 SM\n- 无 EP：tp=16, pp=8, 8 层堆叠, 5 个 SM（触及功耗墙）</p>\n<div class=\"warn-box\">⚠️ <strong>警告</strong>：这种硅片级的设计偏差无法通过后期软件调优弥补，强调了在流片前进行完整硬件-软件协同搜索的必要性。</div>\n<p><strong>洞察 3：能效最优与吞吐最优需要根本不同的架构</strong></p>\n<p>吞吐最优设计最大化连接层数以饱和带宽，而能效最优设计倾向于更多堆叠但更少连接（空闲）层，通过更大的片上缓冲和改进的数据复用来补偿带宽损失，功率密度降低 10-48%，tokens/J 提升 3-24%。</p>",
      "quiz": {
        "q": "DeepStack 发现 3D 堆叠 DRAM 的有效带宽在超过约 9 层后反而下降，主要原因是什么？",
        "options": [
          "DRAM 层数增加导致热阻过高，必须降频运行",
          "TSV 数量有限，物理连接带宽无法线性扩展",
          "Little's Law 约束下，有限的缓冲区深度无法产生足够的并发请求来饱和更高的理论带宽",
          "bank 冲突概率随层数增加而急剧上升"
        ],
        "answer": 2,
        "explain": "根据 Little's Law，有效带宽 ≤ buffer_entries × txn_size / latency。当 DRAM 层数增加使理论带宽超过此上限时，L1 缓冲区深度成为瓶颈，无法维持足够的 outstanding requests 来饱和带宽，导致有效带宽出现倒 U 型下降。"
      }
    },
    {
      "id": "moentwine",
      "num": 54,
      "name": "MoEntwine",
      "fullName": "晶圆级MoE专家并行推理 (MoEntwine Wafer-Scale Expert Parallel Inference)",
      "year": "2026",
      "org": "HPCA",
      "parent": "cerebras_wse",
      "paperUrl": "https://ieeexplore.ieee.org/abstract/document/11408594/",
      "projectUrl": "",
      "category": "llm_inference",
      "motivation": "释放晶圆级芯片超大规模MoE并行推理潜力",
      "summary": "MoEntwine 面向晶圆级芯片上的 MoE 专家并行推理，提出 Entwined Ring Mapping 和 Non-Invasive Balancer，用拓扑感知映射压缩 all-to-all 通信域，并利用 attention 与 MoE 阶段互补的冷热链路隐藏专家迁移开销。",
      "keyPoints": [
        "目标平台是 wafer-scale chip：大量 compute die 通过晶圆级 interposer 形成 2D mesh，带宽高、能耗低，但多跳路径会产生中心拥塞",
        "目标模型是 DeepSeek-V3/V2、Qwen3、DBRX、Mixtral 等 MoE LLM，专家并行通过减少每设备专家数缓解 decode 阶段权重访问压力",
        "核心瓶颈一是 MoE all-to-all：token dispatch/combine 在 mesh 上跨多跳传输，通信压力远高于 attention all-reduce",
        "核心瓶颈二是专家迁移：WSC 缺少片上磁盘，动态 load balancing 需要通过已经繁忙的 mesh 复制专家权重",
        "ER-Mapping 引入 Full Token Domain，把 TP 组交错编织，使 all-to-all 限制在紧凑且不相交的 FTD 内，代价是 all-reduce 走 entwined ring",
        "HER-Mapping 将多晶圆系统中的 all-reduce 拆成 intra-WSC reduce-scatter 和 inter-WSC all-gather，降低跨晶圆长路径开销",
        "NI-Balancer 将完整专家迁移拆成 Local Migration 和 Global Migration，分别塞进 all-reduce 与 all-to-all 阶段的冷链路窗口",
        "评估基于 ASTRA-sim 2.0 和 B200 等效 WSC die，ER-Mapping 最高降低 62% 通信延迟，NI-Balancer 最高降低 54% MoE 计算延迟，整体相比 NVL72 平均提升 39% 每设备 MoE 性能"
      ],
      "detail": "<h5>核心示意图</h5>\n<p><img alt=\"MoEntwine 系统动机与 WSC 架构\" src=\"https://arxiv.org/html/2510.25258v1/x1.png\" />\n<em>图 1：MoE 延迟拆解以及 DGX、NVL72、WSC 架构对比。图片来自 arXiv HTML 版本：https://arxiv.org/html/2510.25258v1。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># MoEntwine: ER-Mapping + NI-Balancer 的推理执行抽象\ndef moentwine_infer(requests, moe_model, wsc_mesh):\n    mapping = build_entwined_ring_mapping(\n        mesh=wsc_mesh,\n        tp=moe_model.attention_tp,\n        ep=moe_model.expert_parallelism,\n    )\n    ftds = mapping.full_token_domains\n    expert_replicas = initialize_shadow_slots(moe_model.experts, ftds)\n\n    for layer in moe_model.layers:\n        # Attention: all-reduce 使用 entwined ring，FTD 内链路相对空闲。\n        attn_out = run_attention(layer, requests, mapping.tp_groups)\n        schedule_local_migrations(expert_replicas, cold_links=&quot;intra_ftd&quot;)\n        attn_out = entwined_ring_all_reduce(attn_out, mapping.tp_groups)\n\n        # MoE: all-to-all 限制在不相交 FTD 内，FTD 间链路相对空闲。\n        token_plan = route_tokens_to_experts(attn_out, expert_replicas)\n        schedule_global_migrations(expert_replicas, cold_links=&quot;inter_ftd&quot;)\n        expert_out = ftd_local_all_to_all_and_compute(token_plan, ftds)\n\n        requests = combine_expert_outputs(expert_out)\n\n        if imbalance_accumulates(layer):\n            expert_replicas = topology_aware_rebalance(\n                historical_load=profile_expert_loads(),\n                replicas=expert_replicas,\n                mesh=wsc_mesh,\n            )\n\n    return requests\n</code></pre>\n<h5>方法机制解读</h5>\n<p>MoEntwine 的起点是 MoE 推理中的专家并行。MoE 层对每个 token 只激活 top-k 个专家，计算量降低，但专家权重体量巨大。专家并行把不同专家分布到不同设备上，使每个设备只存一部分专家；理想状态是专家数 <span class=\"kb-math kb-math-inline\">E</span> 和设备数 <span class=\"kb-math kb-math-inline\">D</span> 接近，<span class=\"kb-math kb-math-inline\">E/D \\approx 1</span>，这样 decode 时每设备权重访问压力最低。然而专家并行带来两次 all-to-all：dispatch 把 token 送到专家所在设备，combine 把专家输出送回原设备。论文把层时延抽象为：</p>\n<div class=\"kb-math kb-math-display\">T_{\\text{MoE}} \\approx\n\\max(T_{\\text{compute}}, T_{\\text{all-to-all}})</div>\n<p>在 DGX/NVL72 里，高速网络覆盖的设备数有限；在 WSC 里，晶圆级网络可覆盖更多设备，理论上更适合大规模 EP。但 WSC 常见 2D mesh 不是全互连，远距离 all-to-all 需要多跳转发，中心链路会被大量 token 流量挤占。</p>\n<p><img alt=\"Full Token Domain 与 ER-Mapping\" src=\"https://arxiv.org/html/2510.25258v1/x8.png\" />\n<em>图 8：Full Token Domain 定义、baseline mapping 与 ER-Mapping 的 FTD 分布，以及 entwined ring all-reduce。</em></p>\n<p>ER-Mapping 的关键概念是 Full Token Domain，即一个设备为了执行 MoE all-to-all 所需 token 的最小来源域。传统 TP 组映射把同一 TP 组放在 mesh 的连续区域或角落，导致不同 FTD 在中心区域相交，all-to-all 的路径既长又重叠。ER-Mapping 反过来把不同 TP 组交错放置，使每个 FTD 更紧凑且互不相交。通信代价可用 hop-weighted latency 表示：</p>\n<div class=\"kb-math kb-math-display\">T_{\\text{comm}} =\n\\sum_{(s,d)}\n\\operatorname{hops}(s,d)\n\\left(\n\\frac{\\operatorname{bytes}_{s,d}}{BW_{\\text{link}}}\n+ L_{\\text{link}}\n\\right)</div>\n<p>ER-Mapping 牺牲的是 attention all-reduce：逻辑 ring 上相邻设备在物理 mesh 中可能相隔多跳，因此 all-reduce 更慢。但 MoE all-to-all 的数据量和关键路径压力远大于 all-reduce，减少 FTD 面积和交叉通常更划算。论文还保留 all-gather，使 token 来源选择更多，后续 all-to-all 的路径更短。</p>\n<p><img alt=\"ER-Mapping 算法与 Hierarchical ER-Mapping\" src=\"https://arxiv.org/html/2510.25258v1/x10.png\" />\n<em>图 10：ER-Mapping 算法、多种映射示例和多 WSC 的 Hierarchical ER-Mapping。</em></p>\n<p>多晶圆时，单纯把 entwined ring 扩到所有 wafer 会让 all-reduce 经过过长路径。HER-Mapping 将其拆成两个层次：先在每个 WSC 内做 reduce-scatter，把 token 聚成局部 FTD；再跨 WSC 做 all-gather，使每片晶圆都拿到需要的 token 分片。这样后续 MoE all-to-all 仍可限制在单个 WSC 的 FTD 内。其直觉类似层次化 collective：</p>\n<div class=\"kb-math kb-math-display\">T_{\\text{HER}} \\approx T_{\\text{intra-WSC reduce-scatter}}\n+ T_{\\text{inter-WSC all-gather}}</div>\n<p>相比跨所有设备的一条长 ring，这个分解把高频通信留在更短的局部 mesh 内，把跨晶圆通信变成更少、更规则的聚合步骤。</p>\n<p><img alt=\"冷热链路互补与 NI-Balancer\" src=\"https://arxiv.org/html/2510.25258v1/x11.png\" />\n<em>图 11：attention all-reduce 与 MoE all-to-all 的 traffic heatmap、专家迁移拆分和独立 migration stream。</em></p>\n<p>NI-Balancer 解决动态负载均衡。MoE gating 在推理时仍会让热门专家收到更多 token，导致某些设备计算时间远高于平均值。训练时的 auxiliary balancing loss 不能保证在线请求分布稳定，因此系统需要复制热门专家到空闲 shadow slot。问题是 WSC 没有每设备本地磁盘，专家复制只能走 mesh，如果迁移暴露在关键路径上，会抵消负载均衡收益。MoEntwine 的观察是 ER-Mapping 后两类通信的冷链路互补：attention all-reduce 主要占用 FTD 连接区域，FTD 内部相对空闲；MoE all-to-all 被限制在 FTD 内部，FTD 之间相对空闲。于是完整迁移被拆成：</p>\n<div class=\"kb-math kb-math-display\">M(e, a \\rightarrow b) =\nM_{\\text{local}}(a \\rightarrow a&#x27;)\n+ M_{\\text{global}}(a&#x27; \\rightarrow b&#x27;)\n+ M_{\\text{local}}(b&#x27; \\rightarrow b)</div>\n<p>Local Migration 在 all-reduce 阶段使用 FTD 内冷链路，Global Migration 在 all-to-all 阶段使用 FTD 间冷链路。计算、通信、迁移分别放到独立 stream 中，只要迁移片段的时延不超过对应阶段的可隐藏窗口，就不会增加端到端时延。</p>\n<p><img alt=\"运行时专家负载轨迹\" src=\"https://arxiv.org/html/2510.25258v1/x15.png\" />\n<em>图 15：专家负载运行轨迹。无均衡时峰值负载约为平均的 2 倍；侵入式均衡会产生中断；非侵入式均衡消除中断。</em></p>\n<p>拓扑感知 balancing 的目标不是让所有专家 token 完全均匀，而是降低最大设备负载。设专家 <span class=\"kb-math kb-math-inline\">e</span> 的历史平均负载为 <span class=\"kb-math kb-math-inline\">l_e</span>，当前有 <span class=\"kb-math kb-math-inline\">r_e</span> 个副本，则每个副本承担的负载近似为 <span class=\"kb-math kb-math-inline\">l_e/r_e</span>。设备 <span class=\"kb-math kb-math-inline\">d</span> 的负载为：</p>\n<div class=\"kb-math kb-math-display\">H_d = \\sum_{e \\in \\operatorname{experts}(d)} \\frac{l_e}{r_e}</div>\n<p>算法每次选择负载最高设备上的最热门专家作为源，在不会超过当前最大负载且有 shadow slot 的设备中，选择拓扑距离最近的目标。这样既能降低 <span class=\"kb-math kb-math-inline\">\\max_d H_d</span>，又能减少迁移距离，给 NI-Balancer 更大机会把迁移塞进冷链路窗口。论文报告 topology-aware balancing 可将迁移开销平均降低 2.6×，而 non-invasive 版本进一步把迁移开销完全隐藏。</p>\n<p><img alt=\"ER-Mapping 通信评估\" src=\"https://arxiv.org/html/2510.25258v1/x13.png\" />\n<em>图 13：WSC 相对 DGX 的通信改进、ER-Mapping 在不同模型上的表现、规模/并行度影响和 HER-Mapping。</em></p>\n<p>评估显示，WSC 的统一高速网络天然比多节点 DGX 更适合大 EP，纯 WSC 已可平均降低通信延迟；ER-Mapping 进一步降低 all-to-all 路径和拥塞，收益随激活专家数增加而增强。DeepSeek-V3、Qwen3 这类激活专家更多的模型 all-to-all 占比高，因此收益更明显；Mixtral 只激活 2 个专家，all-to-all 相对小，naive ER-Mapping 可能不总是获益。HER-Mapping 对多 WSC 配置更稳定，最高可获得 62% 通信改进。</p>\n<p><img alt=\"端到端对比 NVL72\" src=\"https://arxiv.org/html/2510.25258v1/x17.png\" />\n<em>图 17：多 WSC cluster 与 NVL72 supernode 的端到端性能对比。</em></p>\n<p>端到端消融以 NVL72 为强基线。NVL72 的 72 设备 scale-up 网络已经显著优于传统多节点 DGX，但 <span class=\"kb-math kb-math-inline\">E/D</span> 仍较高，多个专家会共享一个设备，decode 时内存访问主导。WSC 可扩到 EP=256，理论上实现接近单专家每设备，但原始 mesh 的 all-to-all 和负载不均衡会破坏这个优势。MoEntwine 先用 ER/HER-Mapping 消除通信瓶颈，再用 NI-Balancer 消除迁移瓶颈，最终获得平均 39% 更高的每设备 MoE 性能。</p>\n<div class=\"key-point\">💡 关键：MoEntwine 不是单独优化 collective 或 load balancing，而是把 attention all-reduce、MoE all-to-all 和专家迁移放在同一个 mesh 时间/空间调度问题里处理。</div>",
      "quiz": {
        "q": "MoEntwine 的 ER-Mapping 为什么愿意让 attention all-reduce 走更长的 entwined ring？",
        "options": [
          "因为 all-reduce 在 MoE 推理中通常不是主要瓶颈，换取更紧凑且不相交的 FTD 可大幅降低 all-to-all 拥塞",
          "因为 WSC mesh 无法执行 all-reduce",
          "因为 ER-Mapping 会删除 MoE gating 网络",
          "因为专家迁移必须在 CPU 上完成"
        ],
        "answer": 0,
        "explain": "MoE 推理的关键瓶颈是 token dispatch/combine 的 all-to-all。ER-Mapping 用较小的 all-reduce 代价换取 all-to-all 通信域缩小和路径去拥塞，因此总时延下降。"
      }
    },
    {
      "id": "diamond_moe",
      "num": 55,
      "name": "DIAMoND",
      "fullName": "异构存内MoE推理架构 (DIAMoND Heterogeneous In-Memory MoE)",
      "year": "2026",
      "org": "ISCA",
      "parent": "—",
      "paperUrl": "https://mengli.me/news/2026-03-31-isca2026/",
      "projectUrl": "",
      "category": "llm_inference",
      "motivation": "异构NAND/DRAM实现边缘侧存内MoE推理",
      "summary": "DIAMoND 面向边缘侧 MoE 推理，提出将高容量 In-NAND Compute 与高带宽 Near-DRAM Compute 结合的异构存内架构，用动态推理调度在有限内存、带宽和能耗预算下执行稀疏专家模型。",
      "keyPoints": [
        "公开 ISCA 2026 日程确认论文题名为 “Dynamic Inference for Adaptive Edge MoE with Heterogeneous In-NAND and Near-DRAM Compute Architecture”，作者来自 Peking University 与 Xiaomi。",
        "目标场景是边缘 MoE：专家参数规模大、每 token 只激活少量专家，但边缘设备无法像服务器 GPU 一样把所有专家常驻高带宽显存。",
        "异构存储/计算划分把容量密集的专家权重放到 NAND 侧，把延迟敏感的 token 激活、门控结果、热专家或聚合计算放到 DRAM 近存侧。",
        "“Dynamic Inference” 的核心在于按 token 路由、专家热度和时延预算动态决定专家放置、预取、缓存和执行位置。",
        "In-NAND Compute 适合低复用、大容量、顺序/页粒度的专家权重计算；Near-DRAM Compute 适合高复用、低延迟、跨专家聚合和中间激活缓冲。",
        "论文 PDF/项目页截至本次检索未公开，以下深入机制基于 ISCA 官方题名、作者主页新闻以及 MoE/PIM/NAND/DRAM 公开背景进行架构性解读，不把未公开细节写成已验证实验结论。"
      ],
      "detail": "<p><img alt=\"NAND flash 单元结构示意\" src=\"https://upload.wikimedia.org/wikipedia/commons/f/f5/Nand_flash_structure.svg\" />\n<em>图：Wikimedia Commons 的 NAND flash 单元布线与结构示意，用于说明 DIAMoND 所依赖的 NAND 高容量、串行访问和低成本存储背景；该图不是 DIAMoND 论文原图。</em></p>\n<p><strong>为什么 MoE 特别适合“容量层 + 带宽层”的异构存内架构。</strong> MoE 的 FFN 专家占据模型参数的主要部分，但每个 token 只通过 gating 选择 Top-<span class=\"kb-math kb-math-inline\">k</span> 个专家。对边缘设备而言，瓶颈不是单个专家 MLP 的算力，而是“专家总容量远大于 DRAM/显存容量”与“每步路由访问不规则”同时存在。把所有专家压进 DRAM 会让容量和静态功耗失控；每次从 NAND 取专家到主处理器又会被数据搬移能耗和 I/O 延迟击穿。DIAMoND 题名中的 Heterogeneous In-NAND and Near-DRAM Compute 可以理解为把专家权重留在更靠近存储阵列的位置计算，同时让 DRAM 侧承担需要低延迟复用的工作。</p>\n<p><strong>一个合理的数据流是：门控先决定稀疏路径，再把不同专家分派到不同存内层级。</strong> 对第 <span class=\"kb-math kb-math-inline\">t</span> 个 token，门控网络输出专家概率 <span class=\"kb-math kb-math-inline\">p_{t,e}</span>，选择集合 <span class=\"kb-math kb-math-inline\">E_t=\\mathrm{TopK}(p_t,k)</span>。专家输出可以写成：</p>\n<div class=\"kb-math kb-math-display\">y_t = \\sum_{e \\in E_t} p_{t,e}\\,\\mathrm{FFN}_e(x_t)</div>\n<p>在异构存内系统中，<span class=\"kb-math kb-math-inline\">\\mathrm{FFN}_e</span> 不必都在同一种计算单元上执行：冷专家或大容量专家权重可留在 In-NAND 阵列侧执行低比特/分块矩阵向量乘；热专家、共享层、输出聚合和残差路径可放在 Near-DRAM 侧执行。调度器的目标不是让某一种存储最快，而是最小化端到端代价：</p>\n<div class=\"kb-math kb-math-display\">\\min \\sum_{e \\in E_t}\\left(T_{\\mathrm{compute}}(e, l_e)+T_{\\mathrm{move}}(x_t,y_{t,e}, l_e)+T_{\\mathrm{queue}}(l_e)\\right)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">l_e \\in \\{\\mathrm{NAND}, \\mathrm{DRAM}\\}</span> 表示专家执行层级。NAND 侧的容量成本低但访问粒度粗、写入慢；DRAM 侧延迟低但容量宝贵，所以调度需要随专家热度变化而动态调整。</p>\n<pre><code class=\"language-python\"># DIAMoND 风格异构 MoE 推理调度伪代码\ndef diamond_moe_decode(token_state, expert_table, dram_cache, nand_arrays, sla):\n    scores = gate(token_state)\n    selected = topk(scores, k=2)\n\n    partials = []\n    for expert_id, gate_weight in selected:\n        profile = expert_table[expert_id]  # hotness, size, quant_bits, location\n\n        if dram_cache.contains(expert_id) and profile.latency_critical:\n            out = near_dram_mlp(token_state, dram_cache[expert_id])\n        elif should_promote_to_dram(profile, sla):\n            async_prefetch(expert_id, src=nand_arrays, dst=dram_cache)\n            out = near_dram_mlp(token_state, dram_cache.wait(expert_id))\n        else:\n            # 权重保持在 NAND 侧，token 激活广播到对应 array/page group\n            out = in_nand_mvm(token_state, nand_arrays[expert_id])\n\n        partials.append(gate_weight * out)\n\n    return near_dram_reduce(partials)\n</code></pre>\n<p><strong>In-NAND Compute 的优势来自“权重不搬家”，但它天然不适合所有操作。</strong> NAND 的长处是密度和非易失性，适合存放海量专家权重；如果在阵列、页缓冲或存储控制器附近完成乘加，就可以避免把冷专家权重反复搬到主内存。它的短板也明显：页/块粒度、随机访问延迟、写入/擦除代价和模拟/近数据计算精度限制，会让频繁更新的激活缓存、softmax、归一化、跨专家 reduce 等操作不适合放在 NAND 侧。因此 DIAMoND 的“异构”很关键：NAND 不是替代 DRAM，而是承担专家权重驻留和局部 MVM；DRAM 近存计算承担激活缓冲、门控调度、热专家执行和输出合并。</p>\n<p><strong>Near-DRAM Compute 可以作为动态缓冲层，吸收 MoE 路由的非均匀性。</strong> MoE gating 通常呈现长尾分布：少数专家在某些输入域持续变热，另一些专家偶发激活。若所有选中专家都落在 NAND，会出现 token 队列等待和跨阵列带宽冲突；若把全部专家提升到 DRAM，则容量不可承受。一个实用机制是维护热度 <span class=\"kb-math kb-math-inline\">h_e</span>、最近访问时间和预计收益，当 <span class=\"kb-math kb-math-inline\">h_e</span> 超过阈值或某个请求的 SLA 紧张时，把专家块或低秩/量化副本提升到 DRAM 近存层：</p>\n<div class=\"kb-math kb-math-display\">h_e \\leftarrow \\alpha h_e + (1-\\alpha)\\,\\mathbf{1}[e \\in E_t]</div>\n<p>这个指数滑动热度让系统能在对话主题稳定时缓存热专家，也能在输入域切换时逐步降温，避免过度迁移。Near-DRAM 层还可以做不同 In-NAND 子结果的加权聚合，减少回到 CPU/GPU 的中间数据量。</p>\n<p><strong>动态推理还需要处理“专家选择正确性”和“硬件代价”的耦合。</strong> 纯算法 MoE 只关心 Top-<span class=\"kb-math kb-math-inline\">k</span> 专家概率；边缘硬件上还要考虑某个专家是否已经在 DRAM、某个 NAND die 是否拥塞、当前 token 是否处于低延迟交互路径。因而调度器可能采用硬件感知的打分：</p>\n<div class=\"kb-math kb-math-display\">\\mathrm{score}&#x27;_{t,e}=p_{t,e}-\\lambda_L \\hat{T}_{e}-\\lambda_E \\hat{E}_{e}+\\lambda_H h_e</div>\n<p>这里 <span class=\"kb-math kb-math-inline\">\\hat{T}_e</span> 和 <span class=\"kb-math kb-math-inline\">\\hat{E}_e</span> 是选择专家 <span class=\"kb-math kb-math-inline\">e</span> 的预计延迟与能耗，<span class=\"kb-math kb-math-inline\">h_e</span> 是热度。该式表达的不是论文已公开公式，而是解释 DIAMoND 标题中 “Adaptive Edge MoE” 的必要机制：边缘端不能只按模型概率路由，还要把硬件层级状态纳入推理决策。</p>\n<p><strong>与传统边缘 MoE offloading 的差别在于计算发生在存储层级内部。</strong> CPU/GPU offloading 系统通常把专家权重在 NAND/SSD、DRAM 和 GPU 之间搬移，主要优化预取和缓存命中率；DIAMoND 的题名则暗示把 NAND 与 DRAM 都变成计算参与者。这样一来，优化目标从“何时把权重搬到算力旁边”变成“何时把 token 激活送到权重旁边、何时把热专家复制到更快层级”。在专家权重远大于激活向量的 MoE 推理中，后者通常更符合数据移动最小化原则。</p>\n<div class=\"warn-box\">⚠️ 注意：截至本文件生成时，可公开访问资料未提供 DIAMoND 的论文 PDF、Figure 1、实验数据或具体微架构参数；这里使用公开题名和已知系统设计约束做深度解读。若论文正式版公开，应优先用论文图、算法块和实测结果替换本段中的推导性机制。</div>",
      "quiz": {
        "q": "DIAMoND 这类异构 In-NAND/Near-DRAM MoE 推理架构为什么需要动态调度专家位置？",
        "options": [
          "因为 MoE 每个 token 都会激活所有专家",
          "因为专家访问呈长尾且随输入变化，NAND 容量高但延迟/粒度不适合热路径，DRAM 低延迟但容量有限",
          "因为 NAND 写入速度高于 DRAM，适合保存所有中间激活",
          "因为门控网络不需要计算专家概率"
        ],
        "answer": 1,
        "explain": "边缘 MoE 的专家总容量大且访问稀疏不均。动态调度可以让冷专家留在 NAND 侧、热专家或延迟敏感路径进入 Near-DRAM，从而在容量、延迟和能耗之间折中。"
      }
    },
    {
      "id": "bitdecoding",
      "num": 56,
      "name": "BitDecoding",
      "fullName": "低比特KV Cache解码 (BitDecoding Low-Bit KV Cache Decoding)",
      "year": "2026",
      "org": "HPCA",
      "parent": "—",
      "paperUrl": "https://hpca-conf.org/2026/program/",
      "projectUrl": "",
      "category": "llm_inference",
      "motivation": "低比特KV Cache量化释放Tensor Core算力",
      "summary": "BitDecoding 提出面向低比特 KV Cache 的 GPU 解码系统，通过自动诱导 Tensor Core 友好的低比特布局、warp 级反量化并行和软件流水线，解决 KV Cache 量化后仍只能依赖 CUDA Core 的性能瓶颈。",
      "keyPoints": [
        "针对长上下文 LLM 解码阶段的 KV Cache 显存和带宽瓶颈，支持 4-bit、2-bit 等低比特 Key/Value 缓存。",
        "低比特 KV Cache 与低比特权重不同：权重可离线预打包，KV Cache 在自回归过程中逐 token 生成，必须在线量化、打包和反量化。",
        "核心方法是 Tensor Core-Centric BitFusion：在 residual KV 量化打包时利用 <code>ldmatrix</code>/MMA 片段布局，生成可被 Tensor Core 正确消费的低比特存储格式。",
        "通过多 warp 沿序列维并行执行反量化，减少 CUDA Core 上的反量化串行瓶颈，并用协作 softmax 维持 FlashAttention 式在线归一化。",
        "系统层提供 query transformation、tensor-wise/channel-wise 量化 kernel、反量化 kernel 和架构相关优化，覆盖 MHA、MQA、GQA 以及 Ampere/Hopper/Blackwell 等 GPU。",
        "HPCA 2026 摘要报告在 RTX 4090、A100、H100 上相对 FP16 FlashDecoding-v2 最高分别达到 7.5x、4.8x、8.9x 加速，并相对 QServe 最高 4.3x。"
      ],
      "detail": "<p><img alt=\"BitDecoding 低比特 KV Cache 系统对比\" src=\"https://arxiv.org/html/2503.18773v3/figs/compare.png\" />\n<em>图：arXiv HTML 版 Figure 2，展示 FP16 FlashAttention、分离式低比特 kernel、CUDA Core-only fused kernel 与 BitDecoding 的执行差异。</em></p>\n<p><strong>问题本质：量化节省了带宽，但不自动带来 Tensor Core 加速。</strong> 解码阶段注意力可写为：</p>\n<div class=\"kb-math kb-math-display\">\\mathrm{Out}=\\mathrm{softmax}\\left(Q\\,\\mathcal{D}(K&#x27;^{\\top})\\right)\\,\\mathcal{D}(V&#x27;)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">K&#x27;</span> 和 <span class=\"kb-math kb-math-inline\">V&#x27;</span> 是低比特 KV Cache，<span class=\"kb-math kb-math-inline\">\\mathcal{D}(\\cdot)</span> 是反量化。既有低比特 KV 系统通常把反量化和矩阵乘都放在 CUDA Core 上做 FMA，原因不是 Tensor Core 算力不足，而是 packed low-bit 数据在解包后不满足 Tensor Core fragment 的线程-寄存器交错布局。低比特权重可以在模型加载前做 pre-packing；KV Cache 则在每个新 token 生成后才出现，若每步都做昂贵重排，会抵消量化收益。</p>\n<p><img alt=\"BitDecoding 低比特布局诱导方案\" src=\"https://arxiv.org/html/2503.18773v3/figs/scheme.png\" />\n<em>图：arXiv HTML 版 Figure 5，BitDecoding 在 residual kernel 内把计算、量化和 packing 融合，借硬件片段布局自动诱导可反量化回 Tensor Core 布局的低比特格式。</em></p>\n<p><strong>BitFusion 的关键是“在正确布局中打包”，而不是“打包后再修复布局”。</strong> BitDecoding 保留一小段 FP16 residual KV Cache；当 residual 区达到硬件 tile 对齐的长度时，Residual Kernel 一边计算这段 token 的 attention，一边把新 KV 量化并打包到全局内存。由于这些 FP16 值已经经由 Tensor Core 数据移动指令进入寄存器，线程持有的值天然符合 MMA 片段的交错规则；每个线程就地量化和 packing 后，packed bits 仍隐式保存了这种映射。随后 Packing Kernel 读取低比特主 cache，解包和反量化后即可得到 Tensor Core 可用的 half-precision fragment，避免全局内存级 reshape。</p>\n<pre><code class=\"language-python\"># BitDecoding 解码流程伪代码\ndef bitdecoding_step(q, new_kv, kv_pack, kv_residual, n_residual):\n    kv_residual.append(new_kv)                 # FP16 residual buffer\n\n    if len(kv_residual) == n_residual:\n        # 在 Tensor Core fragment 布局中处理 residual attention\n        partial_res = residual_attention(q, kv_residual)\n\n        # 就地量化和 packing：packed layout 继承 ldmatrix/MMA 交错布局\n        packed = quantize_and_pack_in_fragment_layout(kv_residual)\n        kv_pack.append(packed)\n        kv_residual.clear()\n    else:\n        partial_res = residual_attention(q, kv_residual)\n\n    # 主体低比特 KV cache：加载 packed bits，反量化为 TC fragment，再执行 MMA\n    partial_pack = packing_kernel_attention(q, kv_pack)\n\n    # 类似 FlashDecoding，把不同 block 的 online-softmax 统计量归并\n    return combine_online_softmax(partial_pack, partial_res)\n</code></pre>\n<p><strong>残差块大小来自 Tensor Core tile 与位宽的共同约束。</strong> 论文中的设计直觉可以概括为：一次 residual flush 必须生成足够多的低比特元素，使后续 <code>ldmatrix</code>/MMA 加载时每个 warp 的 <span class=\"kb-math kb-math-inline\">N</span> 维 tile 完整对齐。若 <span class=\"kb-math kb-math-inline\">W_n</span> 表示沿序列 <span class=\"kb-math kb-math-inline\">N</span> 维参与的 warp 数，<code>num_bits</code> 是 KV 量化位宽，一个常用的对齐尺度可写为：</p>\n<div class=\"kb-math kb-math-display\">N_r = 8 \\times W_n \\times \\frac{16}{\\mathrm{num\\_bits}}</div>\n<p>位宽越低，一个 FP16 fragment 可容纳的低比特值越多，flush 的 residual token 数也越大。这个机制的好处是 residual FP16 只占长上下文 KV Cache 的极小比例；当 <span class=\"kb-math kb-math-inline\">seq\\_len \\gg N_r</span> 时，额外 FP16 存储和一次额外 kernel launch 的开销都会被主 KV Cache 的低比特收益摊薄。</p>\n<p><strong>warp 级并行解决反量化喂不饱 Tensor Core 的问题。</strong> 低比特解码不是纯 GEMM，真正的流水线包含 global memory load、scale/zero-point 读取、bit unpack、反量化、softmax、<span class=\"kb-math kb-math-inline\">QK^\\top</span> 和 <span class=\"kb-math kb-math-inline\">PV</span>。单 warp 沿序列维串行处理时，Tensor Core 经常等待 CUDA Core 完成解包和反量化。BitDecoding 把 <span class=\"kb-math kb-math-inline\">T_n</span> 序列 tile 切给多个 warp：每个 warp 独立执行 <code>ldmatrix -&gt; dequantize -&gt; MMA</code>，再通过共享内存归约 rowmax/rowsum，保持 online softmax 的数值稳定。</p>\n<pre><code class=\"language-python\"># 多 warp 协作 softmax 简化伪代码\nfor block_n in kv_tiles:\n    S_local = mma(q_fragment, dequantize(k_fragment).T)\n    m_new = warpgroup_rowmax(S_local, shared_tmp)\n    P_local = exp(S_local - m_new)\n\n    # P 需要重新按 Tensor Core 友好布局进入寄存器，才能高效执行 P @ V\n    shared_acc.store(P_local)\n    P_tc = ldmatrix(shared_acc)\n\n    O = mma(P_tc, dequantize(v_fragment)) + exp(m_old - m_new) * O\n    m_old = m_new\n</code></pre>\n<p><strong>软件流水线把“搬运、反量化、MMA”分成可重叠阶段。</strong> Packed KV 和量化元数据的加载粒度不同，scale/zero-point 往往会破坏简单的连续访存模式。BitDecoding 因此把 global-to-shared、shared-to-register、CUDA Core 反量化和 Tensor Core MMA 分层调度：第 <span class=\"kb-math kb-math-inline\">i</span> 个 slice 在 Tensor Core 上做矩阵乘时，第 <span class=\"kb-math kb-math-inline\">i+1</span> 个 slice 已经在 CUDA Core 上解包和反量化，同时下一段数据通过异步 copy 进入共享内存。Hopper 上可进一步借助 warp specialization/WGMMA，Blackwell 上则可利用原生低精度格式降低在线转换开销。</p>\n<p><strong>与传统低比特 KV Cache 的差别在于系统边界更靠近硬件指令。</strong> KIVI 类分离式 kernel 重复写回中间结果，QServe/Atom 类 CUDA Core-only fused kernel 避免了 launch 开销却放弃 Tensor Core。BitDecoding 把布局、warp 划分和流水线作为一个整体设计，使低比特缓存既减少 DRAM 读流量，又不把主计算留在 CUDA Core。它的局限也来自同一处：实现强依赖具体 GPU 的 Tensor Core 指令、fragment 布局和异步内存机制，迁移到新架构时需要重新确认 tile、位宽和元数据布局。</p>",
      "quiz": {
        "q": "BitDecoding 为什么不能简单套用低比特权重量化中的离线 pre-packing 方法？",
        "options": [
          "因为 KV Cache 的量化误差一定高于权重量化",
          "因为 KV Cache 在自回归解码中逐 token 动态生成，无法提前离线重排成 Tensor Core 片段布局",
          "因为 Tensor Core 只支持权重矩阵，不支持注意力计算",
          "因为低比特 KV Cache 不需要反量化"
        ],
        "answer": 1,
        "explain": "权重是静态的，可以在加载前预打包；KV Cache 是在线生成的，每步都新增 token。BitDecoding 的关键就是在 residual flush 时直接生成 Tensor Core 友好的 packed layout。"
      }
    },
    {
      "id": "nvidia_ising",
      "num": 57,
      "name": "NVIDIA Ising",
      "fullName": "NVIDIA Ising量子AI模型 (NVIDIA Ising Quantum AI Model)",
      "year": "2026",
      "org": "NVIDIA",
      "parent": "—",
      "paperUrl": "https://nvidianews.nvidia.com/news/nvidia-ising-open-source-quantum-ai-models",
      "projectUrl": "",
      "category": "quantum_hybrid",
      "motivation": "AI优化量子纠错实现微秒级混合控制",
      "summary": "NVIDIA Ising 提出面向量子计算的开放 AI 模型族和训练框架，用视觉语言模型自动化量子处理器校准，并用 3D CNN 预解码器降低表面码纠错的延迟和逻辑错误率。",
      "keyPoints": [
        "模型族覆盖两类关键任务：Ising Calibration 用于读取和解释量子实验/校准图，Ising Decoding 用于实时量子纠错预解码。",
        "Ising Calibration 1 是基于 Qwen3.5-35B-A3B 的开放权重 VLM，在 QCalEval 量子校准图基准上达到 74.7 零样本平均分。",
        "QCalEval 覆盖 243 个样本、87 类场景、22 个实验族，包含超导量子比特和中性原子平台，并评估 6 类校准理解问题。",
        "Ising Decoder SurfaceCode 1 提供 Fast 和 Accurate 两个 3D CNN 预解码模型，分别面向更低延迟和更低逻辑错误率。",
        "NVIDIA 官方说明中，Fast 模型在 <span class=\"kb-math kb-math-inline\">d=13, p=0.003</span> 条件下相对 PyMatching 延迟快 2.5x、准确率高 1.1x，Accurate 模型延迟快 2.3x、准确率高 1.5x。",
        "训练和部署栈包括 cuQuantum cuStabilizer、PyTorch、TensorRT、CUDA-Q QEC 和 NVQLink，用于从数据生成、模型训练到 GPU-QPU 实时闭环控制。"
      ],
      "detail": "<p><img alt=\"Ising Calibration 1 在 QCalEval 上的表现\" src=\"https://developer-blogs.nvidia.com/wp-content/uploads/2026/04/Ising-Benchmark.webp\" />\n<em>图：NVIDIA Technical Blog Figure 1，展示 Ising Calibration 1 与 Gemini、Claude、GPT 系列在 QCalEval 六类问题上的对比。</em></p>\n<p><strong>量子校准的瓶颈是“看懂实验图并决定下一步”。</strong> 量子处理器 bring-up 和 retune 过程中，实验人员需要反复查看谱线、Rabi/Ramsey 曲线、保真度拟合图、稳定性图等校准输出，再决定下一轮脉冲、频率或控制参数。NVIDIA Ising Calibration 把这个专家判读过程建模为 VLM 任务：输入校准图和问题，输出技术描述、实验结论、参数提取、拟合质量判断或下一步建议。QCalEval 的贡献在于把这件事标准化为可评测的 6 类语义任务，而 Ising Calibration 1 进一步证明领域监督微调能让开放 VLM 在专业量子校准图上超过通用模型。</p>\n<pre><code class=\"language-python\"># Ising Calibration 1 的两阶段监督微调抽象\nmodel = load_vlm(&quot;Qwen3.5-35B-A3B&quot;)\n\n# Phase 1: ICL 格式，让模型学习“示例校准图 + 问答 -&gt; 新图推理”\nfor batch in icl_formatted_calibration_data:\n    images, demonstrations, question, answer = batch\n    loss = model.loss(images=images, context=demonstrations, prompt=question, target=answer)\n    update(model, loss)\n\n# Phase 2: zero-shot 格式，让模型直接回答单张/多张校准图问题\nfor batch in zeroshot_calibration_data:\n    images, question, answer = batch\n    loss = model.loss(images=images, prompt=question, target=answer)\n    update(model, loss)\n</code></pre>\n<p><strong>纠错解码的瓶颈是“必须比错误扩散更快”。</strong> 表面码会在空间和时间上持续产生 syndrome，解码器必须在量子控制窗口内把 syndrome 解释为纠错操作。经典 MWPM/PyMatching 解码器可靠但全局图匹配开销较高；单纯神经网络又可能难以覆盖所有长距离错误。Ising Decoding 采用模块化预解码：先由 3D CNN 在局部时空窗口中消除大部分物理错误，再把残余 syndrome 交给 PyMatching 等全局解码器。这不是替代全局解码器，而是降低其输入密度和复杂度。</p>\n<p><img alt=\"Ising Decoding 预解码器性能区域\" src=\"https://developer-blogs.nvidia.com/wp-content/uploads/2026/04/Pre-decoder-1.webp\" />\n<em>图：NVIDIA Technical Blog 预解码器图，展示 Fast/Accurate pre-decoder 与 PyMatching 级联后在不同码距和物理错误率下的取舍。</em></p>\n<p><strong>3D CNN 的输入是综合征的时空体积。</strong> 可把表面码一段时间内的测量结果整理为 <span class=\"kb-math kb-math-inline\">X \\in \\{0,1\\}^{B \\times C \\times T \\times D \\times D}</span>，其中 <span class=\"kb-math kb-math-inline\">B</span> 是 batch，<span class=\"kb-math kb-math-inline\">C</span> 是 syndrome/边界/基类型通道，<span class=\"kb-math kb-math-inline\">T</span> 是纠错轮数，<span class=\"kb-math kb-math-inline\">D</span> 是码距。卷积核在 <span class=\"kb-math kb-math-inline\">(T, x, y)</span> 三个维度上滑动，使模型学习局部错误链在时间和空间中的模式。若每层使用 kernel size 3 且 stride 1，<span class=\"kb-math kb-math-inline\">L</span> 层 same-padding 卷积的感受野近似为：</p>\n<div class=\"kb-math kb-math-display\">R = 1 + \\sum_{i=1}^{L}(k_i-1) = 1 + 2L</div>\n<p>Fast 版本可用更浅层数换低延迟，Accurate 版本用更深网络扩大 <span class=\"kb-math kb-math-inline\">R</span> 来捕获更长错误链。same-padding 很重要：它保证输入和输出的时空坐标一一对应，预解码器可以对每个局部 syndrome 位置给出修正或残差信号，然后与后续全局解码器无缝衔接。</p>\n<pre><code class=\"language-python\"># Ising SurfaceCode pre-decoder + PyMatching 推理伪代码\ndef realtime_qec_decode(raw_syndrome_stream):\n    # 1. GPU 上把连续 syndrome 轮次组织为 3D 时空体积\n    volume = make_syndrome_volume(raw_syndrome_stream)  # [B, C, T, D, D]\n\n    # 2. TensorRT/3D CNN 低延迟预解码，输出局部修正概率或 logits\n    local_logits = predecoder_3d_cnn(volume)\n    local_correction = threshold_or_sample(local_logits)\n\n    # 3. 从原始 syndrome 中扣除局部修正解释掉的部分，降低残余图密度\n    residual_syndrome = apply_local_correction(volume, local_correction)\n\n    # 4. CPU 或异构流水线上的 PyMatching/MWPM 处理剩余长程关联\n    global_correction = pymatching_decode(residual_syndrome)\n\n    return compose(local_correction, global_correction)\n</code></pre>\n<p><strong>训练框架用模拟器解决数据规模和硬件差异问题。</strong> 官方 Ising Decoding 训练框架通过 cuQuantum/cuStabilizer 生成 syndrome 样本，并允许用户指定噪声参数；README 中还提到训练时可对稀疏噪声做 upscaling，使训练集 syndrome 更密，评估时仍保留原始噪声模型。这对应一个实用观点：预解码器要从大量局部错误模式中学习鲁棒特征，而真实 QPU 噪声可能稀疏、漂移且难以完整建模。框架还支持预计算 frame、恢复训练、导出 ONNX/TensorRT，用来服务实时闭环。</p>\n<p><strong>部署栈强调端到端延迟，而不是单模型吞吐。</strong> CUDA-QX 的实时 predecoder + PyMatching 示例使用 TensorRT 加速神经网络，在 GPU 上降低 syndrome density，再把残余 detector 输入 CPU 侧 PyMatching worker pool，并统计 latency、throughput、syndrome density 和 logical error rate。NVQLink 的意义在这里体现：QPU 测量数据必须快速进入 GPU/CPU 纠错流水线，纠错结果再回到控制系统；只优化 3D CNN 本身并不足够，数据注入、图匹配、回传控制都要落在微秒级预算内。</p>\n<p><strong>与传统方案相比，Ising 的创新是把 AI 放进量子控制回路的两个端点。</strong> 校准端从“人看图”变成“VLM agent 看图并提出下一步”，纠错端从“全局解码器直接吃原始 syndrome”变成“GPU 预解码降低残差复杂度，再由经典解码器兜底”。这种设计保留了领域工具链的可解释边界：Calibration 模型不直接替代物理实验，Decoder 也不完全替代 PyMatching；它们都插在高成本人工或高延迟算法之前，承担最适合深度模型的模式识别部分。</p>",
      "quiz": {
        "q": "Ising Decoder SurfaceCode 1 为什么采用“3D CNN 预解码器 + PyMatching”的级联，而不是只用一个神经网络完成全部纠错？",
        "options": [
          "因为 3D CNN 只能处理图像，不能处理 syndrome",
          "因为预解码器适合快速消除局部错误，PyMatching 适合处理残余全局关联，级联能同时兼顾低延迟和低逻辑错误率",
          "因为 PyMatching 只能在 GPU 上运行",
          "因为量子纠错不需要全局信息"
        ],
        "answer": 1,
        "explain": "3D CNN 利用局部时空模式快速降低 syndrome 密度，PyMatching 再处理剩余长程关联。这样既利用 AI 的并行速度，也保留经典全局解码器的可靠性。"
      }
    }
  ],
  "categories": {
    "gpu_architecture": {
      "label": "GPU架构演进",
      "color": "#4285F4"
    },
    "tpu": {
      "label": "Google TPU系列",
      "color": "#34A853"
    },
    "npu_asic": {
      "label": "NPU与专用AI芯片",
      "color": "#EA4335"
    },
    "emerging_chips": {
      "label": "新兴AI芯片架构",
      "color": "#FF6D01"
    },
    "pim_cim": {
      "label": "存算一体",
      "color": "#AB47BC"
    },
    "dataflow": {
      "label": "数据流与脉动阵列",
      "color": "#00ACC1"
    },
    "interconnect": {
      "label": "互联技术",
      "color": "#78909C"
    },
    "hw_sw_codesign": {
      "label": "硬件-软件协同",
      "color": "#FFB300"
    },
    "fpga": {
      "label": "FPGA加速器",
      "color": "#8D6E63"
    },
    "efficiency": {
      "label": "能效优化",
      "color": "#66BB6A"
    },
    "photonic": {
      "label": "光计算",
      "color": "#E91E63"
    },
    "chiplet": {
      "label": "Chiplet与封装",
      "color": "#795548"
    },
    "llm_inference": {
      "label": "大模型推理硬件",
      "color": "#F44336"
    },
    "quantum_hybrid": {
      "label": "量子-经典混合",
      "color": "#9C27B0"
    }
  },
  "projectUrls": {}
};
