/**
 * sci_base-data.js — 由 pipeline/build.py 于 2026-06-15 09:55:49 自动生成。
 * 源文件：content/ai4sci/sci_base.md
 * ⚠️  请勿手动修改；如需更新，修改源文档后重新编译。
 */
window.PAGE_CONFIG = {
  "meta": {
    "domain": "ai4sci",
    "topic_id": "sci_base",
    "topic_name": "科学基础模型",
    "page_title": "科学基础模型算法总结",
    "page_subtitle": "2026-06-15 版",
    "page_desc": "涵盖蛋白质结构预测、材料发现、气象预报、分子建模、科学大模型等领域，展示从单任务专用模型到跨学科统一架构的技术演进",
    "page_icon": "🔬",
    "hero_pills": [
      "🏷️ AI4Sci · Foundation Models · Cross-disciplinary"
    ],
    "count_pill": "{count} 个算法",
    "image_base": "",
    "overview_from_doc": true,
    "latest_overview_from_doc": true
  },
  "overview": [
    {
      "title": "",
      "body_html": "<h1>科研AI的进化论！系统梳理600+数据集与模型，上海AI Lab等发布科学大语言模型全景式综述</h1>\n<ul>\n<li>来源平台: <strong>zhihu</strong>（知乎专栏文章）</li>\n<li>原文链接: <a href=\"https://zhuanlan.zhihu.com/p/1946948824380712770\">https://zhuanlan.zhihu.com/p/1946948824380712770</a></li>\n<li>作者: 机器之心</li>\n</ul>\n<hr />\n<p>科研AI的进化论！系统梳理600+数据集与模型，上海AI Lab等发布科学大语言模型全景式综述</p>\n<h1>科研AI的进化论！系统梳理600+数据集与模型，上海AI Lab等发布科学大语言模型全景式综述</h1>\n<p>作者: 机器之心, 赞: 14</p>\n<p><img alt=\"\" src=\"https://picx.zhimg.com/v2-26465849f9b0d80ad135ee692fd3a013_1440w.jpg\" /></p>\n<p>作者 | 论文团队</p>\n<p><strong>编辑 | ScienceAI</strong></p>\n<p>过去几年，大语言模型（LLM）的浪潮席卷学术界与产业界。在科研场景中，它们正从 “工具” 演变为 “合作者”，科学大语言模型（Sci-LLMs）的进展尤为瞩目。</p>\n<p>然而，科学数据的多模态、跨尺度、强领域语义与不确定性，以及科学知识本身的层次化结构，对 Sci-LLMs 提出了远超通用领域的新要求。当前的研究仍处于碎片化状态，缺乏对全学科领域的科学数据与模型演进路径的系统性梳理。一个系统性的梳理与前瞻性设计已成为整个领域的迫切需求。</p>\n<p>为填补这一空白，上海人工智能实验室联合全球 20 余家顶尖高校与研究机构，<strong>全面调研了 1000 + 文献，系统梳理了 600 + 重要数据集与 SOTA 模型，</strong>重磅发布了对 Sci-LLMs 的全面综述 《<em>A Survey of Scientific Large Language Models: From Data Foundations to Agent Frontiers</em>》，系统梳理了 Sci-LLMs 的<strong>发展历程、数据基础、模型演进、模型评测体系与智能体前沿</strong>，并提出了<strong>未来智能体助力科学发现生态的路线图</strong>。</p>\n<p><img alt=\"\" src=\"https://pica.zhimg.com/v2-073da8cfdebb367d3dca8b7c51219a74_1440w.jpg\" /></p>\n<ul>\n<li>论文标题：<em>A Survey of Scientific Large Language Models: From Data Foundations to Agent Frontiers</em></li>\n<li>论文链接：<em><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2508.21148\">https://arxiv.org/abs/2508.21148</a></em></li>\n<li>GitHub 链接：<em><a href=\"https://link.zhihu.com/?target=https%3A//github.com/open-sciencelab/Awesome-Scientific-Datasets-and-LLMs\">https://github.com/open-sciencelab/Awesome-Scientific-Datasets-and-LLMs</a></em></li>\n</ul>\n<p><strong>一、科研界的 “爆炸时刻”：论文数量曲线说明了一切</strong></p>\n<p>近年来，人工智能在科学探索（AI for Science）领域的应用呈现爆发式增长，科学大语言模型正以前所未有的深度和广度变革着知识的表示、整合与应用方式，在物理、化学、材料、生命科学、天文、地球科学等多个自然科学领域展现出惊人的潜力，重新定义着科学研究的方式。如下图，综述简要展示了在主要预印本平台上，涉及 “language model” 及其与科学领域结合（联合检索学科关键词）的论文发表趋势。左图显示 arXiv 与 PubMed 上的快速增长，右图则呈现 bioRxiv、medRxiv 和 ChemRxiv 的加速态势，体现出跨学科兴趣的不断升温。</p>\n<p><img alt=\"\" src=\"https://pic3.zhimg.com/v2-e7887a41dd4c25cfaf18a91fa47adf30_1440w.jpg\" /></p>\n<p>图 1：科学大模型相关论文数量快速增长（2018–2025）。</p>\n<p><strong>二、四次范式转移：解码 Sci-LLMs 进化路径</strong></p>\n<p>综述首先指出，2018–2025 年，数据驱动的 Sci-LLMs 已经历四次关键范式转移，其能力边界得到不断拓展，逐步迈向更高阶的科研应用阶段。</p>\n<p><strong>1. 迁移学习阶段（2018–2020）</strong></p>\n<ul>\n<li>代表：SciBERT、BioBERT、PubMedBERT 等</li>\n<li>特点：通过在特定领域的科学语料上继续预训练，显著提升模型的领域理解能力。但这些模型仅能提供 “静态知识”，大多面向领域内既定的下游任务，难以直接应用到更复杂也更高级的科研探索任务中。</li>\n</ul>\n<p><strong>2. 规模化阶段（2020–2022）</strong></p>\n<ul>\n<li>代表：GPT-3、Galactica、MedPaLM-2 等</li>\n<li>特点：通过急剧扩大的参数和数据规模，模型展现出跨学科知识整合与专业推理能力。例如，MedPaLM-2 在美国医师执照考试（USMLE）问题上达到了与持证医师相当的专家级水平。然而，这一阶段也展示出科学领域的独特挑战：高质量科学文本语料远小于通用语料，限制了 Sci-LLMs 的大规模扩展。</li>\n</ul>\n<p><strong>3. 指令对齐阶段（2022–2024）</strong></p>\n<ul>\n<li>代表：ChatGPT、Meditron、NatureLM 等</li>\n<li>特点：通过精心设计的指令数据微调，模型能够更精确地执行复杂的科学任务 。这一阶段，开源架构的多样性与指令数据规模的空前扩展形成了 “双轮驱动”，催生了大量里程碑式的 Sci-LLMs ，它们在生物序列理解、跨学科知识整合等任务上取得了显著突破。</li>\n</ul>\n<p><strong>4. 科学智能体阶段（2023–至今）</strong></p>\n<ul>\n<li>代表：Coscientist、Biomni、InternAgent 等</li>\n<li>特点：除了进一步规模化来提供更加强大的科学基座（如 Intern-S1），由 Sci-LLMs 构成的系统开始具备科学智能体（Agent）的雏形。AI 不再仅仅 “理解科学”，而是能自主规划实验、撰写论文、迭代科研流程。这也对新型科学数据以及科学发现性能评估提出了新的要求。</li>\n</ul>\n<p><img alt=\"\" src=\"https://pica.zhimg.com/v2-830d1a20eb26997652d51b33fd77b460_1440w.jpg\" /></p>\n<p>图 2：Sci-LLMs 的范式演化（2018–2025）。</p>\n<p><strong>三、科学领域总览：贯通六大科学领域</strong></p>\n<p>这篇综述不仅覆盖了六大科学领域（物理、化学、材料科学、生命科学、天文学、地球科学），还揭示了它们在 数据尺度上的层层递进。</p>\n<ul>\n<li>物理、化学、材料科学 —— 从微观粒子、分子到材料结构，奠定了理解物质世界的基石；</li>\n<li>生命科学 —— 跨越分子、细胞、多组学和系统，体现复杂性的中观尺度；</li>\n<li>天文学与地球科学 —— 从地球、行星到星系，直达宏观层面的观测与模拟。</li>\n</ul>\n<p>这种从微观到宏观的尺度演进，正是 Sci-LLMs 预训练数据设计的逻辑：模型需要同时理解分子动力学的精细结构，也要能把握天体演化和气候变化的宏大趋势。</p>\n<p><img alt=\"\" src=\"https://pic3.zhimg.com/v2-2799898cfc89ae6fce76c66a777b8556_1440w.jpg\" /></p>\n<p>图 3：综述所涵盖的六大科学领域（物理、化学、材料科学、生命科学、地球科学、天文学）及各领域中的代表性子方向。</p>\n<p><strong>四、科学模型荟萃：通才 vs 专才、文本 vs 多模态</strong></p>\n<p><strong>1. 通才 vs 专才 vs “通专融合”</strong></p>\n<p>通才型 Sci-LLMs 致力于构建跨学科的知识底座，典型代表是 Intern-S1。它通过在海量、跨学科的科学语料（涵盖论文、教科书、百科、习题等）上进行大规模预训练，具备广博而系统的科学知识储备。与此相对，专才型 Sci-LLMs 则更像是针对单一学科定制的 “手术刀”，依靠在特定领域（如高能物理、化学、生命科学等）的专业数据集上进行深度训练，成为该学科的专家，例如专注高能物理的 Xiwu，以及面向化学的 ChemLLM。</p>\n<p>与两者相比，Intern-S1 的独特优势在于通专融合：它既继承了通才模型的跨学科广度，能够在复杂问题中调用多领域知识；又通过针对重点学科的优化实现了专才模型的深度，具备解决专业领域难题的能力。凭借这一双重特性，Intern-S1 不仅能作为科学研究的通用助手，还能够在特定学科场景下展现接近专家级的推理与回答水平。</p>\n<p><img alt=\"\" src=\"https://pic4.zhimg.com/v2-e8e7e28654373069bb513aa909eb9a39_1440w.jpg\" /></p>\n<p>图 4：按六大科学领域分类的代表性 Sci-LLMs 时间概览（2019 年至 2025 年中）。</p>\n<p><strong>2. 文本 vs 多模态</strong></p>\n<p>综述的统计分析指出：当前约四分之三的科学大语言模型是纯文本 LLM ，而多模态 LLM 仅占四分之一。这一方面反映了科学知识的主要载体 —— 学术论文和教科书等 —— 仍以文本为主；另一方面也暴露了高质量、细粒度的多模态监督数据的稀缺性。这种对文本的过度依赖造成了一个核心困境：模型学习到的更多是对科学的 “描述”，而非从第一性原理和实验证据中习得的科学研究本身。为了弥合这一鸿沟，未来的趋势必然是向多模态生态系统演进，尤其是在天文学、气候科学等高度依赖异构信号融合的领域，能够综合处理图像、光谱、时间序列和文本等多模态数据将是 Sci-LLMs 发展的关键 。</p>\n<p><img alt=\"\" src=\"https://pica.zhimg.com/v2-e26af79161d58c2cfc7e0bb000df50a4_1440w.jpg\" /></p>\n<p>图 5: Sci-LLMs 和 Sci-MLLMs 分布统计：(a) Sci-LLMs 与 Sci-MLLMs 的数量对比；(b) 基础模型家族分布和 (c) 参数规模分布。</p>\n<p><strong>五、深入数据生态：270+ 训练集 &amp; 210+ 评测集的全景地图</strong></p>\n<p><strong>1. 统一视角：从数据分类到知识层级</strong></p>\n<p>综述指出，构建强大的 Sci-LLMs 必须首先理解科学数据与知识的内在结构。为此，论文提出了两大数据分级框架：</p>\n<ul>\n<li>统一的科学数据分类法，将纷繁复杂的科学数据（如 SMILES 化学式、基因序列、天文图像、医学扫描等）归纳为文本、视觉、符号、结构化、时序与多组学融合等六大类别，并且系统梳理了各科学领域的数据表达。</li>\n</ul>\n<p><img alt=\"\" src=\"https://pic1.zhimg.com/v2-acc8861eee7834424b7dc6e4c1a6feb2_1440w.jpg\" /></p>\n<p>图 6：科学领域数据可视化。</p>\n<ul>\n<li>科学知识的层次化模型，该模型认为科学知识并非扁平的信息集合，而是一个由五个层次构成的复杂系统，从底层的事实层（Factual Level）、理论层（Theoretical Level），到方法技术层（Methodological &amp; Technological Level）、建模仿真层（Modeling &amp; Simulation Level），最终达到顶端的洞见层（Insight Level）。只有让 AI 模型理解并能在这五个层级之间穿梭，才能实现从具体到抽象、从现象到本质的科学推理，而不仅仅是事实的复述。</li>\n</ul>\n<p><img alt=\"\" src=\"https://pica.zhimg.com/v2-92c503414da3330a019b45314a1caa68_1440w.jpg\" /></p>\n<p>图 7：科学数据的层级划分和动态交互。</p>\n<p><strong>2. 数据质量 “四要素”、现状分析与结构性痛点</strong></p>\n<p>综述强调，高质量的数据是 Sci-LLMs 成功的关键，并提出了评估科学数据 “AI-ready” 质量的四要素，与当前数据生态存在的不足，以及其背后的系统性痛点。</p>\n<p>a）质量四要素：</p>\n<ul>\n<li>准确性 (Accuracy)：数据是否真实反映客观世界；</li>\n<li>完整性 (Completeness)：数据是否全面覆盖了所有相关元素；</li>\n<li>时效性 (Timeliness)：数据更新是否及时，能否反映最新科研进展；</li>\n<li>可追溯性 (Traceability)：数据的来源、处理流程是否清晰可查，以保证可复现性。</li>\n</ul>\n<p>b）当前数据生态的不足：</p>\n<ul>\n<li>实验数据稀缺：受限于实验的现实性质，数据获取成本高、周期长，且共享存在障碍；</li>\n<li>过度依赖文本：图表、三维结构、时间序列等非文本数据未被充分利用；</li>\n<li>表示鸿沟：现有数据集多为静态知识快照，无法体现科研的动态演进过程；</li>\n<li>多层偏差：存在发表偏差（倾向于正面结果）、领域偏差和语言偏差等问题。</li>\n</ul>\n<p>c）系统性问题：</p>\n<ul>\n<li>可追溯性危机：大量科学数据集缺乏对其来源、版本和预处理流程的完整记录，导致 AI 模型的结论难以复现和验证，也削弱了 AI 生成假设的可信度；</li>\n<li>科学数据延迟：从一项科研成果诞生到其数据被纳入模型训练语料库，存在数月甚至数年的滞后。这使得模型知识迅速过时，尤其在生物医学等快速发展的领域，模型可能无法回答关于最新发现的问题；</li>\n<li>AI-readiness 不足：绝大多数科学数据并非为 AI “开箱即用” 。不规范的数据格式、缺失的元数据和异构的结构，使得研究者需花费大量精力进行数据清洗和预处理，这直接限制了 Sci-LLMs 开发的效率和规模以及高级科学智能的上限。</li>\n</ul>\n<p><strong>3. 预训练数据：按学科拆解 “AI-ready” 数据侧重点</strong></p>\n<p>预训练数据是科学大语言模型（Sci-LLMs）的核心基础，它决定了模型能否在复杂科学场景中具备理解、推理和生成的能力。本章首先回顾了当前模型在预训练数据上的总体分布：例如 Yi 模型结合了网页、代码、论文和问答等多源数据，而 LLaMA 的预训练语料约 1.4TB，涵盖 CommonCrawl、GitHub、Wikipedia 与学术资源（见图 8a）。</p>\n<p>相比之下，Intern-S1 在总语料中专门划分出约 2.5 万亿 tokens（占比 45.8%）用于科学领域，覆盖物理、化学、材料科学、生命科学、天文学和地球科学六大板块，为后续的领域拆解奠定了基础。作者强调，科学语料的广度与真实性直接影响模型能否在科学场景中进行理解、推理与生成。</p>\n<p><img alt=\"\" src=\"https://pic3.zhimg.com/v2-2f6f579ff3dda12a6139bcc40c0557c0_1440w.jpg\" /></p>\n<p>图 8：LLaMA, Yi, GPT-3 和 Intern-S1 的预训练数据集分布。</p>\n<p>在回顾整体的语料构成之后，综述进一步从学科尺度深入分析了科学大语言模型预训练数据的特点与挑战。</p>\n<p>物理学的数据多来自理想化仿真与理论推导，如偏微分方程与动力学模拟，但与真实观测之间存在显著差距，因此亟需解决 simulation-to-observation gap，使模型既能学习物理定律，又能适应实验噪声和仪器特性。</p>\n<p>化学预训练以分子结构和性质数据为核心，包括 SMILES 表示、量子化学计算结果与反应数据库等，虽然结构化程度高，但实验标注成本昂贵，限制了语料规模，因此提升分子表征的多样性与覆盖度是关键。</p>\n<p>材料科学主要依赖大型材料数据库（如 Materials Project、NOMAD、OQMD），涵盖晶体结构、能带、力学与热学性质，但由于元数据与计算条件不一致，跨数据库融合存在障碍，未来需要标准化与跨模态的统一表示。</p>\n<p>生命科学覆盖基因、蛋白质序列、多组学数据、医学影像与电子病历等，数据量庞大却因隐私与伦理问题常常不完整或滞后，现有方法多通过去标识化、合成数据与多模态整合来缓解。</p>\n<p>天文学的科学数据包括光谱、射电观测、星系影像与宇宙学模拟，然而不同仪器在分辨率、带宽与校准上的差异，使得跨模态和跨设备对齐成为挑战。</p>\n<p>地球科学的数据则最为稀缺，主要依赖论文与教材 PDF 的解析，以及有限的遥感影像和气候变量场，但其高度异质性导致文本解析和图像对齐的代价很高，未来的发展趋势是通过多源融合与自动标注来扩展规模。</p>\n<p><img alt=\"\" src=\"https://pic3.zhimg.com/v2-e3e5f7245dd6acb751ad6b9af98a1666_1440w.jpg\" /></p>\n<p>图 9：预训练数据集的词云图。图中展示了模态（左）和类型（右）的相对分布，词语大小与出现频率成正比。</p>\n<p><strong>4. 后训练数据：面向科研任务的能力对齐</strong></p>\n<p>在完成大规模预训练后，科学大语言模型还需要进一步 后训练（post-training），以便从 “具备科学常识” 走向 “能够真正解决科学问题”。与预训练强调 广覆盖与大规模 不同，后训练更关注 高质量、任务导向与学科特色 的数据。本章从多个科学领域系统介绍了后训练数据的构建现状与难点，并指出当前后训练数据呈现四大趋势：</p>\n<ul>\n<li>指令化语料占主导：将结构化知识库、教科书习题等转化为指令 - 回复对。</li>\n<li>多模态数据集日益重要：在医学、遥感等领域，视觉问答（VQA）数据集已成为主流。</li>\n<li>向显式推理监督演进：带有思维链（CoT）的推理过程数据开始出现，以提升模型的可解释性。</li>\n<li>数据合成的自动化趋势：以强大的 LLM（如 GPT-4）为数据处理工具，从文献和数据库中自动生成海量指令数据，以弥补人工标注的不足。</li>\n</ul>\n<p><img alt=\"\" src=\"https://picx.zhimg.com/v2-f4a4dade4d8f80d0def147ada29066fb_1440w.jpg\" /></p>\n<p>图 10：现有 Sci-LLMs/Sci-MLLMs 后训练语料的来源分布。</p>\n<p><img alt=\"\" src=\"https://pic2.zhimg.com/v2-d8179e9909ca48871e69fb618108e519_1440w.jpg\" /></p>\n<p>图 11：后训练数据集的词云图。图中展示了模态（左）和类型（右）的相对分布，词语大小与出现频率成正比。</p>\n<p><strong>六、评测升级：从 “考试” 到 “科研流程” 的方法论跃迁</strong></p>\n<p>测评数据是连接 预训练 / 后训练 与 真实科研应用 的关键环节。与通用 LLM 测评（如 MMLU、MMMU）不同，Sci-LLMs 的测评更强调：</p>\n<ul>\n<li>学科覆盖：是否掌握从微观到宏观的多领域科学知识；</li>\n<li>推理能力：能否进行公式推导、多步计算、实验结果解释；</li>\n<li>应用导向：是否能在医学诊断、分子设计、气候预测等任务中给出可用答案。</li>\n</ul>\n<p><strong>1. 测评数据现状分析</strong></p>\n<p>(1) 物理学</p>\n<ul>\n<li>主要依赖 教育 / 竞赛题库，如 PhysicsArena、SciBench，测试模型在推导、数值估算、单位换算等方面的能力。</li>\n<li>挑战：评测数据多来源于教材，距离真实物理实验数据、尤其是多模态物理实验数据有不小的差距。</li>\n</ul>\n<p>(2) 化学</p>\n<ul>\n<li>测评多集中于 分子性质预测、反应预测 与 药物发现任务。</li>\n<li>数据集包括 QM9（小分子性质）、USPTO（反应数据）、药物性质评估数据。</li>\n<li>重点考察模型能否在分子层面做出正确预测或生成。</li>\n</ul>\n<p>(3) 材料科学</p>\n<ul>\n<li>测评常基于材料数据库中的下游任务，如能带预测、晶格能估算、力学 / 热学性质预测。</li>\n<li>测评挑战：数据库之间格式不统一，影响跨任务评估。</li>\n</ul>\n<p>(4) 生命科学</p>\n<ul>\n<li>医学领域：使用 临床问答、病例诊断 数据集，如 MedQA、MedMCQA、PubMedQA。</li>\n<li>生物学领域：蛋白质功能预测、基因组序列分析。</li>\n<li>难点：缺少标准化的 “真实病历” 测评集，多依赖学术题库或合成数据。</li>\n</ul>\n<p>(5) 天文学</p>\n<ul>\n<li>测评任务包括 天文问答、天体分类、光谱分析、宇宙学参数拟合。</li>\n<li>数据特点：多为文本（如文献、星表、注释），科学图像。</li>\n<li>挑战：缺乏权威社区和统一 benchmark、跨望远镜与观测条件的域间存在差异。</li>\n</ul>\n<p>(6) 地球科学</p>\n<ul>\n<li>测评多集中于 气候问答、遥感图像感知等。</li>\n<li>示例：ClimaQA 等基于教材构建的评测集，OmniEarth-Bench 基于遥感图像构建 VQA 任务。</li>\n<li>难点：数据覆盖度有限，难以反映复杂的气候与地球过程。</li>\n</ul>\n<p><img alt=\"\" src=\"https://pic4.zhimg.com/v2-d4b19de6a84e9a321588c6e8d173fde9_1440w.jpg\" /></p>\n<p>图 12：现有 Sci-LLMs/Sci-MLLMs 评测语料的来源分布。</p>\n<p><img alt=\"\" src=\"https://pic3.zhimg.com/v2-22051f97955db782a31d6998944b2394_1440w.jpg\" /></p>\n<p>图 13：评测数据集的词云图。图中展示了模态（左）和类型（右）的相对分布，词语大小与出现频率成正比。</p>\n<p><strong>2. 测评体系变迁</strong></p>\n<p>综述指出，Sci-LLMs 的评测正经历从 “静态考试型测试” 到 “动态、过程导向型测评” 的转变。早期评测多采用 MMLU 、ScienceQA 等 “考试” 型基准，但最新研究发现，顶尖模型在这些基准上取得高分，但在真正考验前沿、跨领域科学推理的测试（如 HLE、SFE）上表现会急剧下降。这催生了评测范式的三大升级：</p>\n<ul>\n<li>从通用指标到领域定制：除了准确率，评测开始引入化学有效性、物理学公式匹配度等专业指标；</li>\n<li>从静态问答到动态流程：新一代评测基准如 ScienceAgentBench ，要求模型完成文献检索、实验设计、代码执行等完整的科研工作流，评估其过程的正确性；</li>\n<li>从人工评判到智能体评判：引入 “Agent-as-a-Judge” 范式，利用一个或多个 AI 智能体来评估目标模型的开放式回答、假设新颖性等难以量化的能力，实现更高效、可解释的评估。</li>\n</ul>\n<p><img alt=\"\" src=\"https://pic3.zhimg.com/v2-f14c980d552e24a2490a0c6f4db262ee_1440w.jpg\" /></p>\n<p>图 14：Sci-LLMs 评测方式的演变过程。</p>\n<p><strong>3. 测评数据的挑战和发展趋势</strong></p>\n<p>尽管近年来已经出现了面向不同学科的评测基准，但整体来看，科学测评数据依然存在明显不足。这些不足不仅体现在学科覆盖的不均衡上，也体现在模态、真实性与动态性等维度的缺失，使得现有评估体系难以全面衡量模型在真实科研场景中的表现。</p>\n<ul>\n<li>覆盖不均衡：化学、生命科学已有较多测评数据，而地球科学、天文学仍然缺乏；</li>\n<li>模态局限：多数评测仍是文本 QA，未能涵盖科学研究中的图表、实验图像、谱线、公式；</li>\n<li>真实性不足：很多测评数据源于教材或竞赛，和科研真实场景有差距；</li>\n<li>动态性不足：缺少能评估模型随时间更新的能力，例如应对新药发现、新观测结果。</li>\n</ul>\n<p>针对上述问题，研究者们也提出了新的发展方向，尝试让测评体系更接近科学实践的真实需求。趋势既包括评测范式的转变，也涵盖多模态与跨学科的拓展，最终目标是建立起动态而全面的科学智能评估框架。</p>\n<ul>\n<li>过程导向测评：从 “对 / 错” 答案转向检验模型的推理链、实验解释、科学方法论；</li>\n<li>多模态测评：未来会更多结合图像、表格、符号，测试模型跨模态理解能力；</li>\n<li>跨学科评测：推动建立涵盖物理、化学、材料、生命、天文、地球科学等多学科的统一基准；</li>\n<li>闭环评测：发展 “自动化科学代理人” 评估框架，让模型在实验仿真、假设检验、数据分析中被动态测试。</li>\n</ul>\n<p><strong>七、从 “模型” 到 “智能体”：闭环科研工作流</strong></p>\n<p><img alt=\"\" src=\"https://pic4.zhimg.com/v2-8db70c4ba6e520122b00171122f13011_1440w.jpg\" /></p>\n<p>图 15：从数据基础设施到智能体辅助的科学发现：科学 AI 的三阶段演进。</p>\n<p>综述最后展望了 Sci-LLMs 的下一代形态 —— 科学智能体（Scientific Agent）。不同于被动回答问题的模型，科学智能体是能够被赋予高级目标（如 “为某疾病寻找候选药物”）后，自主进行任务分解、规划、工具调用、虚拟实验和结果分析的自治系统。</p>\n<p>综述指出，实现这一目标的核心在于构建一个闭环的 “智能体 - 数据” 生态系统。在这个系统中，智能体通过与外部工具（数据库、模拟器、甚至自动化实验室）交互来主动获取和生成新的实验数据；这些 “AI-ready” 的数据再反哺数据生态，用于迭代和优化智能体自身，形成一个能够自我进化的良性循环。综述详细探讨了实现这一闭环所需的关键技术，包括多智能体协作、工具使用和自进化机制。</p>\n<p><strong>八、总结</strong></p>\n<p>这篇综述为我们描绘了一幅壮阔的科学 AI 演进蓝图，其核心贡献在于：</p>\n<ul>\n<li>建立了统一的科学大模型数据理论框架，为分析科学数据和知识的复杂性提供了全新视角。</li>\n<li>提供了最全面的数据、模型和测评体系分析全景图，系统性梳理了超过 600 个数据集与模型，揭示了各学科的现状与挑战。</li>\n<li>指出了数据生态的结构性瓶颈，并为构建高质量、可信的 AI-ready 科学数据提出了前瞻性议程。</li>\n<li>描绘了迈向自主科学发现的路线图，倡导构建智能体与数据生态之间的闭环反馈系统。</li>\n</ul>\n<p>正如文中所指出的，Sci-LLMs 正从单纯的 “知识模型” 向 “推理引擎” 和 “科研伙伴” 演进，解决好其在数据基础和智能体层面的核心挑战，将是未来研究的重中之重。</p>"
    }
  ],
  "latest_overview": [
    {
      "title": "",
      "body_html": "<h1>中国科学院“磐石100”模型体系发布：AI引擎驱动科学创新</h1>\n<ul>\n<li>来源平台: <strong>zhihu</strong>（知乎专栏文章）</li>\n<li>原文链接: <a href=\"https://zhuanlan.zhihu.com/p/2032831294531432806\">https://zhuanlan.zhihu.com/p/2032831294531432806</a></li>\n<li>作者: 磐石ScienceOne</li>\n</ul>\n<hr />\n<p>中国科学院“磐石100”模型体系发布：AI引擎驱动科学创新</p>\n<h1>中国科学院“磐石100”模型体系发布：AI引擎驱动科学创新</h1>\n<p>作者: 磐石ScienceOne, 赞: 1</p>\n<p><img alt=\"\" src=\"https://pic4.zhimg.com/v2-9ffdc5701ffa9d075c415a1a9ed378ab_1440w.jpg\" /></p>\n<p>新一轮科技革命正在加速演进。“人工智能赋能科学研究”（AI for Science）催生的科研范式变革，正在定义新时代的创新格局、科研效率和发展质量。4月28日，<strong>中国科学院在北京正式发布“磐石100”模型体系</strong>，标志着人工智能驱动的科学研究从分散封闭的单点探索迈向协同高效的平台化创新新阶段。</p>\n<h2><strong>体系化布局：打造“人工智能+科学技术”创新矩阵</strong></h2>\n<p>中国科学院始终坚守“充分体现国家意志、有效满足国家需求、代表国家最高水平”的使命担当，统筹全院力量，发挥多学科交叉、体系化布局、建制化攻关优势，<strong>推动AI for Science研发从“分散封闭的作坊模式”，向“协同开放的平台模式”跨越</strong>，全力夯实人工智能赋能重大战略的科学与技术根基。</p>\n<p><strong>此次发布的“磐石100”模型体系以“磐石·科学基础大模型”为根基，学科领域大模型集群为骨干，细分科研场景应用模型和智能体为枝叶，构建了全域覆盖、高效联动的数智化科研创新平台。</strong>这一体系集中展现了中国科学院在科学基础模型、学科领域模型、应用场景协同建设的深厚积累，更彰显了中国科学院紧扣国家需求、以人工智能驱动科研创新的坚定决心与扎实行动。</p>\n<p><img alt=\"\" src=\"https://pica.zhimg.com/v2-9be067b796bf97c9eae9ce6ee825fb24_1440w.jpg\" /></p>\n<p>磐石模型体系总体架构</p>\n<h2>核心智能底座：磐石·科学基础大模型</h2>\n<p><strong>“磐石·科学基础大模型”</strong>由中国科学院自动化研究所牵头，联合计算机网络信息中心、文献情报中心、十余家领域研究所以及自动化所中科闻歌、中科紫东太初两个产业化平台聚力攻关，是采用专业科学语料和数据进行训练、服务于科学任务的智能底座，具备科学文献萃取融合、科学知识表征推理和科学工具编排规划等核心能力，目标是为各领域科技创新提供“坚如磐石”的智能支撑。</p>\n<p>自2025年陆续发布“磐石・科学基础大模型”1.0版、1.5版以来，研发团队持续攻坚基础模型能力、科研任务支撑能力与平台化服务能力。此次升级后的1.5pro版本搭载波基座、谱基座、场基座三大科学模态模型，基于自主构建的650万条高质量科学推理数据，实现科学知识推理能力、多模态理解生成能力与模型可靠性的跨越式提升，在科学知识问答和智能体长程推理能力榜单中均达到旗舰模型水平，在多项科学图像理解与操作相关权威测评中均取得当前最优水平。</p>\n<p>针对“波”数据理解，磐石面向电磁波、地震波、振动波、引力波等时序与振荡类信号，构建了支持跨场景迁移的亿级参数波基座模型，助力从复杂波形中识别潜在结构与规律，推动天文事件观测由“滞后分析”向“实时预警”跨越式演进。针对“谱”数据分析，磐石能够从X射线衍射谱、红外光谱、拉曼光谱等6类谱信号中精准反演组分构成、物质结构及物性信息，已在化学材料、生物医药等多个应用场景取得显著成效。针对“场”数据理解，磐石面向速度场、压力场等物理场的空间计算与时序模拟，构建了服务工业分析的场基座模型，将推动工业流体仿真进入“分钟级”快速响应阶段，开启“边设计、边仿真、边决策”的高通量研发模式。</p>\n<p>作为基座，<strong>磐石提供文献罗盘、创新评价、智能体工厂三大核心功能，全方位赋能科研创新全流程。</strong>磐石·文献罗盘以辅助文献精读与自主综述写作为核心，跟踪前沿突破、提取科研方案、梳理技术脉络、整合研究结果，全面提升工作效率。1.5pro版将深度研究调研周期压缩至原来的一半以下，论文、PPT、报告等制作效率提升5至10倍。磐石·创新评价能感知科研和产业前沿动态、提取核心技术指标、研判创新与应用价值，助力科研人员高效地识别关键科学问题与潜在创新方向，辅助科研管理部门进行深度客观的科研创新评价与技术方案评估。磐石·智能体工厂提供“工具+智能体”一站式服务，初步实现智能体工具链自主闭环与智能化辅助生成，已沉淀超2000个科研工具，支持10余个细分科研领域。</p>\n<p><img alt=\"\" src=\"https://pica.zhimg.com/v2-92580a8a73915eaf318126a357aac5d6_1440w.jpg\" /></p>\n<p>磐石·科学基础大模型技术栈</p>\n<h2>8大学科领域赋能：引领科学前沿突破</h2>\n<p>磐石模型体系坚持由科学基础大模型聚焦共性科研需求、促进跨学科突破；学科领域大模型专注解决领域基础性问题。二者协同，形成支撑全领域科研场景攻关的数智能力。</p>\n<p>中国科学院以科学基础大模型为智能底座，汇聚AI-Ready数据资源，凝练AI-Ready科学问题，面向数学、物理、材料、天文、空天、地学、生物等学科重点方向，打造学科领域大模型能力集群，形成体系化创新生态。</p>\n<p><img alt=\"\" src=\"https://pic4.zhimg.com/v2-11572b7715708f6f92e9c0cf685b4801_1440w.jpg\" /></p>\n<p>学科领域大模型能力集群</p>\n<p>在数学领域，<strong>“磐石·大衍智证”</strong>大模型突破数学推理与计算能力的瓶颈，实现定理证明与PDE求解能力的量级提升，支撑解决大规模、高精度复杂流体计算仿真等“卡脖子”问题。</p>\n<p>在物理领域，<strong>“磐石·赛博士”</strong>大模型提升粒子物理分析各环节的研究能力并通过自动化提升科研效率，有望改变粒子物理探索的方式，已应用于北京谱仪实验等大科学装置。</p>\n<p>在材料领域，<strong>“磐石·祝融”</strong>大模型实现“按需设计、精准制备”， 显著提升新材料设计研发效率，形成包含新知识发现和新材料设计的材料研发新模式。</p>\n<p>在天文领域，<strong>“磐石·金乌”</strong>大模型以自主可控、高质量、AI-Ready的数据基础，实现面向自主仪器数据的自动化太阳耀斑智能化预测与自动化研究，推动太阳活动预测和研究的范式变革。</p>\n<p>在环境科学领域，<strong>“磐石·禹衡”</strong>是全球首个覆盖生产端、消费端及自然源的全景式碳排放核算系统，精准服务国家应对气候变化战略需求。基于禹衡已初步实现国别级高精度碳全息图谱。</p>\n<p>在空天科学领域，<strong>“磐石·临空”</strong>大模型具备对临近空间技术体系的完整认知能力，并可全领域、全流程赋能临空应用、环境、热性能、气动、飞行控制等科研与工程实践，辅助科研人员定方向、理思路，是国内外首个具备领域深度认知与复杂问题推理能力的临空学科领域大模型。</p>\n<p>在地理领域，<strong>“磐石·坤元”</strong>目标成为面向真实需求开展任务理解、工具调度、流程组织和模型联动的地理智能体系。基于该模型，科研人员揭示了高原主要地貌类型及其空间分异格局和全球土壤无机碳分布格局及动态，研制形成首个地貌分类编码国家标准。</p>\n<p>在生命科学领域，<strong>“磐石·数字细胞”</strong>大模型在30天内即发现了三个过去未知的药物靶点且全部得到湿实验的验证。此外，模型针对肿瘤患者免疫治疗开展疗效预测，有望实现个性化精准诊疗。</p>\n<h2>百余个场景落地：赋能科研一线创新实践</h2>\n<p><strong>磐石模型体系已在中国科学院50余家单位推广应用，覆盖百余个科研场景，</strong>在高铁流场重建、光谱识别、材料发现、佐剂设计、天文观测、青藏科考、海洋预报、生态研究等典型场景中展现出巨大潜力。</p>\n<h2>全面开放共享：共筑人工智能赋能科研新生态</h2>\n<p>依托完备的自然科学学科布局、全栈式人工智能创新链、重大科技基础设施，磐石模型体系将步履不停，聚力深耕AI for Science研究，以“磐石”之力，筑创新之基，加速全域学科创新突破，共同探索人工智能赋能科研的无限可能。</p>\n<h2>开源社区（ScienceOne-AI）：</h2>\n<p>磐石·科学基础大模型”全面开源开放，可在下述开源社区获取技术代码、模型权重和相关工具，欢迎使用！</p>\n<p><img alt=\"\" src=\"https://pic3.zhimg.com/v2-28314e556291b823963552404e74e8a8_1440w.jpg\" /><img alt=\"\" src=\"https://pic3.zhimg.com/v2-fd23c3b4ed1df829863982a84f5eb1ea_1440w.jpg\" /></p>\n<p>本文内容转载自中科院自动化研究所公众号</p>"
    }
  ],
  "graph": {
    "nodes": [
      {
        "id": "transformer",
        "x": 2017,
        "y": 0,
        "category": "neural_operator"
      },
      {
        "id": "schnet",
        "x": 2018,
        "y": 0,
        "category": "neural_operator"
      },
      {
        "id": "fno",
        "x": 2020,
        "y": 0,
        "category": "neural_operator"
      },
      {
        "id": "dimenet",
        "x": 2020.5,
        "y": 0,
        "category": "neural_operator"
      },
      {
        "id": "deeponet",
        "x": 2021,
        "y": 0,
        "category": "neural_operator"
      },
      {
        "id": "egnn",
        "x": 2021.5,
        "y": 0,
        "category": "neural_operator"
      },
      {
        "id": "alphafold2",
        "x": 2021,
        "y": 1,
        "category": "protein_structure"
      },
      {
        "id": "rosettafold",
        "x": 2021.5,
        "y": 1,
        "category": "protein_structure"
      },
      {
        "id": "esm2",
        "x": 2022,
        "y": 1,
        "category": "protein_structure"
      },
      {
        "id": "rfdiffusion",
        "x": 2023,
        "y": 1,
        "category": "protein_structure"
      },
      {
        "id": "alphafold3",
        "x": 2024,
        "y": 1,
        "category": "protein_structure"
      },
      {
        "id": "esm3",
        "x": 2024.5,
        "y": 1,
        "category": "protein_structure"
      },
      {
        "id": "fourcastnet",
        "x": 2022,
        "y": 2,
        "category": "materials_weather"
      },
      {
        "id": "m3gnet",
        "x": 2022.5,
        "y": 2,
        "category": "materials_weather"
      },
      {
        "id": "gnome",
        "x": 2023,
        "y": 2,
        "category": "materials_weather"
      },
      {
        "id": "panguweather",
        "x": 2023.3,
        "y": 2,
        "category": "materials_weather"
      },
      {
        "id": "graphcast",
        "x": 2023.6,
        "y": 2,
        "category": "materials_weather"
      },
      {
        "id": "mattergen",
        "x": 2025,
        "y": 2,
        "category": "materials_weather"
      },
      {
        "id": "mpnn",
        "x": 2017.5,
        "y": 3,
        "category": "molecular"
      },
      {
        "id": "jtvae",
        "x": 2018,
        "y": 3,
        "category": "molecular"
      },
      {
        "id": "chemberta",
        "x": 2020,
        "y": 3,
        "category": "molecular"
      },
      {
        "id": "unimap",
        "x": 2024,
        "y": 3,
        "category": "molecular"
      },
      {
        "id": "galactica",
        "x": 2022,
        "y": 4,
        "category": "science_llm"
      },
      {
        "id": "sciglm",
        "x": 2024,
        "y": 4,
        "category": "science_llm"
      },
      {
        "id": "scidfm",
        "x": 2024.5,
        "y": 4,
        "category": "science_llm"
      },
      {
        "id": "aion1",
        "x": 2025,
        "y": 5,
        "category": "unified_foundation"
      },
      {
        "id": "walrus",
        "x": 2025.3,
        "y": 5,
        "category": "unified_foundation"
      },
      {
        "id": "auroragpt",
        "x": 2026,
        "y": 5,
        "category": "unified_foundation"
      },
      {
        "id": "scienceone100",
        "x": 2026.3,
        "y": 5,
        "category": "unified_foundation"
      },
      {
        "id": "prithvi",
        "x": 2026.6,
        "y": 5,
        "category": "unified_foundation"
      },
      {
        "id": "darwin7b",
        "x": 2026.9,
        "y": 5,
        "category": "unified_foundation"
      }
    ],
    "edges": [
      {
        "from": "schnet",
        "to": "dimenet",
        "label": "融入键角"
      },
      {
        "from": "alphafold2",
        "to": "alphafold3",
        "label": "引入扩散"
      },
      {
        "from": "rosettafold",
        "to": "rfdiffusion",
        "label": "扩散设计"
      },
      {
        "from": "esm2",
        "to": "esm3",
        "label": "协同生成"
      },
      {
        "from": "transformer",
        "to": "alphafold2",
        "label": "注意力机制"
      },
      {
        "from": "transformer",
        "to": "panguweather",
        "label": "3D架构"
      },
      {
        "from": "transformer",
        "to": "galactica",
        "label": "语言建模"
      },
      {
        "from": "fno",
        "to": "fourcastnet",
        "label": "傅里叶算子"
      },
      {
        "from": "mpnn",
        "to": "gnome",
        "label": "GNN材料"
      },
      {
        "from": "mpnn",
        "to": "graphcast",
        "label": "GNN气象"
      },
      {
        "from": "schnet",
        "to": "esm2",
        "label": "几何建模"
      },
      {
        "from": "galactica",
        "to": "sciglm",
        "label": "科学推理"
      },
      {
        "from": "alphafold3",
        "to": "auroragpt",
        "label": "多模态融合"
      },
      {
        "from": "gnome",
        "to": "mattergen",
        "label": "生成式设计"
      },
      {
        "from": "esm3",
        "to": "darwin7b",
        "label": "生物组学"
      },
      {
        "from": "graphcast",
        "to": "prithvi",
        "label": "地学应用"
      }
    ],
    "milestones": [
      "alphafold2",
      "gnome",
      "alphafold3"
    ]
  },
  "algos": [
    {
      "id": "transformer",
      "num": 1,
      "name": "Transformer",
      "fullName": "Transformer (Transformer)",
      "year": "2017",
      "org": "Google",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/1706.03762",
      "projectUrl": "",
      "category": "neural_operator",
      "motivation": "自注意力机制奠定科学大模型基础",
      "summary": "Transformer 提出了完全基于自注意力机制的 Encoder-Decoder 架构，彻底摒弃了循环和卷积结构，在机器翻译任务上取得了 SOTA 结果，同时大幅提升了训练并行性，成为后续所有大语言模型和科学基础模型的核心架构基石。",
      "keyPoints": [
        "<strong>纯注意力架构</strong>：首次证明仅靠注意力机制（无 RNN/CNN）即可在序列转录任务中达到最优性能",
        "<strong>Scaled Dot-Product Attention</strong>：通过 <span class=\"kb-math kb-math-inline\">\\sqrt{d_k}</span> 缩放因子解决高维点积导致的梯度消失问题",
        "<strong>Multi-Head Attention</strong>：将注意力拆分为 <span class=\"kb-math kb-math-inline\">h</span> 个并行头，让模型同时关注不同子空间的信息",
        "<strong>三种注意力用法</strong>：Encoder 自注意力、Decoder 掩码自注意力、Encoder-Decoder 交叉注意力",
        "<strong>位置编码</strong>：使用正弦/余弦函数注入序列位置信息，替代 RNN 的隐式位置建模",
        "<strong>残差连接 + 层归一化</strong>：每个子层采用 <span class=\"kb-math kb-math-inline\">\\text{LayerNorm}(x + \\text{Sublayer}(x))</span> 稳定深层训练",
        "<strong>Position-wise FFN</strong>：两层全连接网络（含 ReLU）为每个位置独立提供非线性变换能力",
        "<strong>WMT 2014 翻译 SOTA</strong>：EN-DE 达到 28.4 BLEU，EN-FR 达到 41.0 BLEU，训练成本仅为此前最优模型的一小部分"
      ],
      "detail": "<h5>架构总览</h5>\n<p><img alt=\"Transformer 模型架构\" src=\"https://ar5iv.labs.arxiv.org/html/1706.03762/assets/Figures/ModalNet-21.png\" />\n<em>图：Transformer 模型架构。左侧为 Encoder，右侧为 Decoder。</em></p>\n<p>Transformer 采用经典的 Encoder-Decoder 结构，但内部完全由注意力层和前馈网络构成：</p>\n<ul>\n<li><strong>Encoder</strong>：由 <span class=\"kb-math kb-math-inline\">N=6</span> 个相同层堆叠而成，每层包含两个子层——Multi-Head Self-Attention 和 Position-wise FFN，每个子层外包裹残差连接和层归一化。</li>\n<li><strong>Decoder</strong>：同样 <span class=\"kb-math kb-math-inline\">N=6</span> 层，每层在 Encoder 的两个子层基础上增加了一个 Encoder-Decoder Cross-Attention 子层。Decoder 的自注意力层使用掩码（mask）防止位置 <span class=\"kb-math kb-math-inline\">i</span> 关注到未来位置 <span class=\"kb-math kb-math-inline\">i+1, i+2, \\ldots</span>，确保自回归生成的合法性。</li>\n</ul>\n<div class=\"key-point\">💡 <strong>关键设计</strong>：所有子层的输出维度统一为 <span class=\"kb-math kb-math-inline\">d_{\\text{model}} = 512</span>，这使得残差连接可以直接相加，无需额外投影。</div>\n<h5>核心机制：Scaled Dot-Product Attention</h5>\n<p><img alt=\"注意力机制示意图\" src=\"https://ar5iv.labs.arxiv.org/html/1706.03762/assets/Figures/ModalNet-19.png\" />\n<em>图：Scaled Dot-Product Attention 计算流程</em></p>\n<p>注意力函数将 Query、Key、Value 三组向量映射为输出：</p>\n<div class=\"kb-math kb-math-display\">\\text{Attention}(Q, K, V) = \\text{softmax}\\!\\left(\\frac{QK^T}{\\sqrt{d_k}}\\right) V</div>\n<p><strong>为什么需要缩放？</strong> 当 <span class=\"kb-math kb-math-inline\">d_k</span> 较大时，点积 <span class=\"kb-math kb-math-inline\">QK^T</span> 的方差为 <span class=\"kb-math kb-math-inline\">d_k</span>，导致 softmax 进入梯度极小的饱和区。除以 <span class=\"kb-math kb-math-inline\">\\sqrt{d_k}</span> 将方差归一化为 1，保持梯度流通畅。这是论文相比加性注意力（Additive Attention）选择点积注意力的关键改进。</p>\n<pre><code class=\"language-python\"># Scaled Dot-Product Attention 伪代码\ndef scaled_dot_product_attention(Q, K, V, mask=None):\n    d_k = Q.shape[-1]\n    scores = Q @ K.transpose(-2, -1) / math.sqrt(d_k)  # (batch, seq_q, seq_k)\n    if mask is not None:\n        scores = scores.masked_fill(mask == 0, -1e9)\n    attn_weights = softmax(scores, dim=-1)\n    attn_weights = dropout(attn_weights)\n    return attn_weights @ V  # (batch, seq_q, d_v)\n</code></pre>\n<h5>Multi-Head Attention</h5>\n<p><img alt=\"Multi-Head Attention\" src=\"https://ar5iv.labs.arxiv.org/html/1706.03762/assets/Figures/ModalNet-20.png\" />\n<em>图：Multi-Head Attention 将 Q、K、V 分别线性投影到多个子空间后并行计算注意力</em></p>\n<p>单个注意力头只能学习一种关注模式。Multi-Head Attention 将 <span class=\"kb-math kb-math-inline\">d_{\\text{model}}</span> 维的 Q、K、V 分别通过 <span class=\"kb-math kb-math-inline\">h</span> 组不同的线性投影映射到 <span class=\"kb-math kb-math-inline\">d_k = d_v = d_{\\text{model}}/h = 64</span> 维子空间，并行计算注意力后拼接：</p>\n<div class=\"kb-math kb-math-display\">\\text{MultiHead}(Q, K, V) = \\text{Concat}(\\text{head}_1, \\ldots, \\text{head}_h) W^O</div>\n<div class=\"kb-math kb-math-display\">\\text{where } \\text{head}_i = \\text{Attention}(QW_i^Q, KW_i^K, VW_i^V)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">W_i^Q \\in \\mathbb{R}^{d_{\\text{model}} \\times d_k}</span>，<span class=\"kb-math kb-math-inline\">W_i^K \\in \\mathbb{R}^{d_{\\text{model}} \\times d_k}</span>，<span class=\"kb-math kb-math-inline\">W_i^V \\in \\mathbb{R}^{d_{\\text{model}} \\times d_v}</span>，<span class=\"kb-math kb-math-inline\">W^O \\in \\mathbb{R}^{hd_v \\times d_{\\text{model}}}</span>。</p>\n<p>论文使用 <span class=\"kb-math kb-math-inline\">h=8</span> 个头，每个头的维度 <span class=\"kb-math kb-math-inline\">d_k = d_v = 64</span>，总计算量与单头全维度注意力相当，但表达能力更强。</p>\n<div class=\"key-point\">💡 <strong>直觉理解</strong>：不同的注意力头可以分别学习语法依赖、语义相似性、位置关系等不同类型的关联模式，类似于 CNN 中多个卷积核捕捉不同特征。</div>\n<pre><code class=\"language-python\"># Multi-Head Attention 伪代码\ndef multi_head_attention(Q, K, V, h=8):\n    d_model = Q.shape[-1]\n    d_k = d_model // h\n    heads = []\n    for i in range(h):\n        Q_i = Q @ W_Q[i]  # (batch, seq, d_k)\n        K_i = K @ W_K[i]\n        V_i = V @ W_V[i]\n        head_i = scaled_dot_product_attention(Q_i, K_i, V_i)\n        heads.append(head_i)\n    concat = torch.cat(heads, dim=-1)  # (batch, seq, d_model)\n    return concat @ W_O\n</code></pre>\n<h5>三种注意力的应用场景</h5>\n<p>Transformer 中注意力机制被用于三个不同位置，Q、K、V 的来源各不相同：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>位置</th>\n<th>Q 来源</th>\n<th>K、V 来源</th>\n<th>作用</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Encoder Self-Attention</td>\n<td>Encoder 当前层输入</td>\n<td>Encoder 当前层输入</td>\n<td>每个位置关注输入序列所有位置</td>\n</tr>\n<tr>\n<td>Decoder Masked Self-Attention</td>\n<td>Decoder 当前层输入</td>\n<td>Decoder 当前层输入（带掩码）</td>\n<td>每个位置仅关注已生成的位置</td>\n</tr>\n<tr>\n<td>Encoder-Decoder Cross-Attention</td>\n<td>Decoder 当前层输入</td>\n<td>Encoder 最终输出</td>\n<td>Decoder 关注输入序列信息</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：Decoder 自注意力中的掩码（mask）将未来位置的注意力权重设为 <span class=\"kb-math kb-math-inline\">-\\infty</span>（softmax 后为 0），这是保证自回归生成因果性的关键。</div>\n<h5>Position-wise Feed-Forward Network</h5>\n<p>每个注意力子层之后紧跟一个两层全连接前馈网络，对每个位置独立且相同地应用：</p>\n<div class=\"kb-math kb-math-display\">\\text{FFN}(x) = \\max(0,\\; xW_1 + b_1)\\, W_2 + b_2</div>\n<p>内层维度 <span class=\"kb-math kb-math-inline\">d_{ff} = 2048</span>，外层维度 <span class=\"kb-math kb-math-inline\">d_{\\text{model}} = 512</span>。这等价于两个 kernel size 为 1 的卷积。FFN 为模型提供了逐位置的非线性变换能力，弥补了注意力层本身线性加权求和的不足。</p>\n<h5>位置编码（Positional Encoding）</h5>\n<p>由于 Transformer 不含循环或卷积结构，无法隐式感知序列顺序。论文使用正弦/余弦函数生成位置编码，直接加到输入嵌入上：</p>\n<div class=\"kb-math kb-math-display\">PE_{(pos, 2i)} = \\sin\\!\\left(\\frac{pos}{10000^{2i/d_{\\text{model}}}}\\right)</div>\n<div class=\"kb-math kb-math-display\">PE_{(pos, 2i+1)} = \\cos\\!\\left(\\frac{pos}{10000^{2i/d_{\\text{model}}}}\\right)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">pos</span> 为位置索引，<span class=\"kb-math kb-math-inline\">i</span> 为维度索引。选择正弦函数的原因是：对于任意固定偏移 <span class=\"kb-math kb-math-inline\">k</span>，<span class=\"kb-math kb-math-inline\">PE_{pos+k}</span> 可以表示为 <span class=\"kb-math kb-math-inline\">PE_{pos}</span> 的线性函数，使模型能够轻松学习相对位置关系。实验表明，学习式位置编码与正弦编码效果几乎相同，但正弦编码可以外推到训练时未见过的更长序列。</p>\n<h5>自注意力 vs RNN vs CNN 的复杂度对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>层类型</th>\n<th>每层复杂度</th>\n<th>顺序操作数</th>\n<th>最大路径长度</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Self-Attention</td>\n<td><span class=\"kb-math kb-math-inline\">O(n^2 \\cdot d)</span></td>\n<td><span class=\"kb-math kb-math-inline\">O(1)</span></td>\n<td><span class=\"kb-math kb-math-inline\">O(1)</span></td>\n</tr>\n<tr>\n<td>Recurrent</td>\n<td><span class=\"kb-math kb-math-inline\">O(n \\cdot d^2)</span></td>\n<td><span class=\"kb-math kb-math-inline\">O(n)</span></td>\n<td><span class=\"kb-math kb-math-inline\">O(n)</span></td>\n</tr>\n<tr>\n<td>Convolution</td>\n<td><span class=\"kb-math kb-math-inline\">O(k \\cdot n \\cdot d^2)</span></td>\n<td><span class=\"kb-math kb-math-inline\">O(1)</span></td>\n<td><span class=\"kb-math kb-math-inline\">O(\\log_k(n))</span></td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 <strong>关键优势</strong>：自注意力的最大路径长度为 <span class=\"kb-math kb-math-inline\">O(1)</span>（任意两个位置直接连接），远优于 RNN 的 <span class=\"kb-math kb-math-inline\">O(n)</span>，这使得长距离依赖的学习更加容易。同时，自注意力的所有位置可并行计算（顺序操作 <span class=\"kb-math kb-math-inline\">O(1)</span>），而 RNN 必须逐步展开。当序列长度 <span class=\"kb-math kb-math-inline\">n &lt; d</span> 时（实际中常见），自注意力的计算量也更小。</div>\n<h5>训练配置</h5>\n<ul>\n<li><strong>数据集</strong>：WMT 2014 EN-DE（450 万句对）和 EN-FR（3600 万句对）</li>\n<li><strong>优化器</strong>：Adam（<span class=\"kb-math kb-math-inline\">\\beta_1=0.9, \\beta_2=0.98, \\epsilon=10^{-9}</span>）</li>\n<li><strong>学习率调度</strong>：Warmup + 逆平方根衰减</li>\n</ul>\n<div class=\"kb-math kb-math-display\">lr = d_{\\text{model}}^{-0.5} \\cdot \\min(step^{-0.5},\\; step \\cdot warmup\\_steps^{-1.5})</div>\n<p>前 4000 步线性预热，之后按步数的逆平方根衰减。</p>\n<ul>\n<li><strong>正则化</strong>：Residual Dropout（<span class=\"kb-math kb-math-inline\">P_{drop}=0.1</span>）应用于每个子层输出和嵌入+位置编码之和；Label Smoothing（<span class=\"kb-math kb-math-inline\">\\epsilon_{ls}=0.1</span>）牺牲困惑度但提升 BLEU 和准确率</li>\n<li><strong>硬件</strong>：8 块 NVIDIA P100 GPU，base 模型训练 12 小时（10 万步），big 模型训练 3.5 天（30 万步）</li>\n</ul>",
      "quiz": {
        "q": "Transformer 中 Scaled Dot-Product Attention 除以 √d_k 的主要原因是什么？",
        "options": [
          "减少模型参数量，降低计算复杂度",
          "防止点积值过大导致 softmax 梯度消失",
          "使注意力权重之和严格等于 1",
          "对齐 Query 和 Key 的维度"
        ],
        "answer": 1,
        "explain": "当 d_k 较大时，点积的方差为 d_k，导致 softmax 输入值过大进入饱和区，梯度趋近于零。除以 √d_k 将方差归一化为 1，保持梯度有效流动。"
      }
    },
    {
      "id": "mpnn",
      "num": 2,
      "name": "MPNN",
      "fullName": "消息传递神经网络 (Message Passing Neural Network)",
      "year": "2017",
      "org": "Google",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/1704.01212",
      "projectUrl": "",
      "category": "molecular",
      "motivation": "统一框架处理图结构分子表征学习",
      "summary": "MPNN 的核心目标是：统一框架处理图结构分子表征学习。",
      "keyPoints": [
        "核心动机：统一框架处理图结构分子表征学习",
        "代表机构：Google"
      ],
      "detail": "<p>统一框架处理图结构分子表征学习</p>"
    },
    {
      "id": "schnet",
      "num": 3,
      "name": "SchNet",
      "fullName": "SchNet (SchNet)",
      "year": "2018",
      "org": "TU Berlin",
      "parent": "—",
      "paperUrl": "https://aip.scitation.org/doi/10.1063/1.5019779",
      "projectUrl": "",
      "category": "neural_operator",
      "motivation": "连续卷积滤波器实现分子3D建模",
      "summary": "SchNet 的核心目标是：连续卷积滤波器实现分子3D建模。",
      "keyPoints": [
        "核心动机：连续卷积滤波器实现分子3D建模",
        "代表机构：TU Berlin"
      ],
      "detail": "<p>连续卷积滤波器实现分子3D建模</p>"
    },
    {
      "id": "jtvae",
      "num": 4,
      "name": "JT-VAE",
      "fullName": "联结树变分自编码器 (Junction Tree VAE)",
      "year": "2018",
      "org": "MIT",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/1802.04364",
      "projectUrl": "",
      "category": "molecular",
      "motivation": "基于分子子结构的可解释生成模型",
      "summary": "JT-VAE 的核心目标是：基于分子子结构的可解释生成模型。",
      "keyPoints": [
        "核心动机：基于分子子结构的可解释生成模型",
        "代表机构：MIT"
      ],
      "detail": "<p>基于分子子结构的可解释生成模型</p>"
    },
    {
      "id": "fno",
      "num": 5,
      "name": "FNO",
      "fullName": "傅里叶神经算子 (Fourier Neural Operator)",
      "year": "2020",
      "org": "Caltech/NVIDIA",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2010.08895",
      "projectUrl": "",
      "category": "neural_operator",
      "motivation": "傅里叶空间学习PDE算子映射",
      "summary": "FNO 的核心目标是：傅里叶空间学习PDE算子映射。",
      "keyPoints": [
        "核心动机：傅里叶空间学习PDE算子映射",
        "代表机构：Caltech/NVIDIA"
      ],
      "detail": "<p>傅里叶空间学习PDE算子映射</p>"
    },
    {
      "id": "dimenet",
      "num": 6,
      "name": "DimeNet",
      "fullName": "定向消息传递网络 (Directional Message Passing NN)",
      "year": "2020",
      "org": "TU Munich",
      "parent": "schnet",
      "paperUrl": "https://arxiv.org/abs/2003.03123",
      "projectUrl": "",
      "category": "neural_operator",
      "motivation": "定向消息传递融入键角信息",
      "summary": "DimeNet 的核心目标是：定向消息传递融入键角信息。",
      "keyPoints": [
        "核心动机：定向消息传递融入键角信息",
        "演化来源：继承或改进自 schnet",
        "代表机构：TU Munich"
      ],
      "detail": "<p>定向消息传递融入键角信息</p>"
    },
    {
      "id": "chemberta",
      "num": 7,
      "name": "ChemBERTa",
      "fullName": "ChemBERTa (ChemBERTa)",
      "year": "2020",
      "org": "DeepChem",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2010.09885",
      "projectUrl": "",
      "category": "molecular",
      "motivation": "BERT架构化学分子SMILES预训练",
      "summary": "ChemBERTa 的核心目标是：BERT架构化学分子SMILES预训练。",
      "keyPoints": [
        "核心动机：BERT架构化学分子SMILES预训练",
        "代表机构：DeepChem"
      ],
      "detail": "<p>BERT架构化学分子SMILES预训练</p>"
    },
    {
      "id": "alphafold2",
      "num": 8,
      "name": "AlphaFold 2",
      "fullName": "AlphaFold 2 (AlphaFold 2)",
      "year": "2021",
      "org": "DeepMind",
      "parent": "—",
      "paperUrl": "https://www.nature.com/articles/s41586-021-03819-2",
      "projectUrl": "",
      "category": "protein_structure",
      "motivation": "Evoformer架构基本解决蛋白质折叠",
      "summary": "AlphaFold 2 的核心目标是：Evoformer架构基本解决蛋白质折叠。",
      "keyPoints": [
        "核心动机：Evoformer架构基本解决蛋白质折叠",
        "代表机构：DeepMind"
      ],
      "detail": "<p>Evoformer架构基本解决蛋白质折叠</p>"
    },
    {
      "id": "rosettafold",
      "num": 9,
      "name": "RoseTTAFold",
      "fullName": "RoseTTAFold (RoseTTAFold)",
      "year": "2021",
      "org": "Baker Lab/UW",
      "parent": "—",
      "paperUrl": "https://www.science.org/doi/10.1126/science.abj8754",
      "projectUrl": "",
      "category": "protein_structure",
      "motivation": "三轨网络同时处理序列距离坐标",
      "summary": "RoseTTAFold 的核心目标是：三轨网络同时处理序列距离坐标。",
      "keyPoints": [
        "核心动机：三轨网络同时处理序列距离坐标",
        "代表机构：Baker Lab/UW"
      ],
      "detail": "<p>三轨网络同时处理序列距离坐标</p>"
    },
    {
      "id": "deeponet",
      "num": 10,
      "name": "DeepONet",
      "fullName": "深度算子网络 (Deep Operator Network)",
      "year": "2021",
      "org": "Brown University",
      "parent": "—",
      "paperUrl": "https://www.nature.com/articles/s42256-021-00302-5",
      "projectUrl": "",
      "category": "neural_operator",
      "motivation": "Branch-Trunk双网络通用算子学习",
      "summary": "DeepONet 的核心目标是：Branch-Trunk双网络通用算子学习。",
      "keyPoints": [
        "核心动机：Branch-Trunk双网络通用算子学习",
        "代表机构：Brown University"
      ],
      "detail": "<p>Branch-Trunk双网络通用算子学习</p>"
    },
    {
      "id": "egnn",
      "num": 11,
      "name": "EGNN",
      "fullName": "E(n)等变图神经网络 (E(n) Equivariant GNN)",
      "year": "2021",
      "org": "UvA",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2102.09844",
      "projectUrl": "",
      "category": "neural_operator",
      "motivation": "E(n)等变性保证旋转平移不变",
      "summary": "EGNN 的核心目标是：E(n)等变性保证旋转平移不变。",
      "keyPoints": [
        "核心动机：E(n)等变性保证旋转平移不变",
        "代表机构：UvA"
      ],
      "detail": "<p>E(n)等变性保证旋转平移不变</p>"
    },
    {
      "id": "esm2",
      "num": 12,
      "name": "ESM-2",
      "fullName": "进化尺度建模2 (Evolutionary Scale Modeling 2)",
      "year": "2022",
      "org": "Meta AI",
      "parent": "—",
      "paperUrl": "https://www.science.org/doi/10.1126/science.ade2574",
      "projectUrl": "",
      "category": "protein_structure",
      "motivation": "150亿参数蛋白质语言模型无需MSA",
      "summary": "ESM-2 的核心目标是：150亿参数蛋白质语言模型无需MSA。",
      "keyPoints": [
        "核心动机：150亿参数蛋白质语言模型无需MSA",
        "代表机构：Meta AI"
      ],
      "detail": "<p>150亿参数蛋白质语言模型无需MSA</p>"
    },
    {
      "id": "fourcastnet",
      "num": 13,
      "name": "FourCastNet",
      "fullName": "傅里叶预报网络 (Fourier ForeCasting Neural Network)",
      "year": "2022",
      "org": "NVIDIA",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2202.11214",
      "projectUrl": "",
      "category": "materials_weather",
      "motivation": "傅里叶神经算子+ViT实现快速气象预报",
      "summary": "FourCastNet 的核心目标是：傅里叶神经算子+ViT实现快速气象预报。",
      "keyPoints": [
        "核心动机：傅里叶神经算子+ViT实现快速气象预报",
        "代表机构：NVIDIA"
      ],
      "detail": "<p>傅里叶神经算子+ViT实现快速气象预报</p>"
    },
    {
      "id": "m3gnet",
      "num": 14,
      "name": "M3GNet",
      "fullName": "材料三体图网络 (Materials 3-body Graph Network)",
      "year": "2022",
      "org": "UC San Diego",
      "parent": "—",
      "paperUrl": "https://www.nature.com/articles/s43588-022-00349-3",
      "projectUrl": "",
      "category": "materials_weather",
      "motivation": "三体相互作用GNN材料建模",
      "summary": "M3GNet 的核心目标是：三体相互作用GNN材料建模。",
      "keyPoints": [
        "核心动机：三体相互作用GNN材料建模",
        "代表机构：UC San Diego"
      ],
      "detail": "<p>三体相互作用GNN材料建模</p>"
    },
    {
      "id": "galactica",
      "num": 15,
      "name": "Galactica",
      "fullName": "Galactica (Galactica)",
      "year": "2022",
      "org": "Meta AI",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2211.09085",
      "projectUrl": "",
      "category": "science_llm",
      "motivation": "120B参数科学专用分词LaTeX/SMILES",
      "summary": "Galactica 的核心目标是：120B参数科学专用分词LaTeX/SMILES。",
      "keyPoints": [
        "核心动机：120B参数科学专用分词LaTeX/SMILES",
        "代表机构：Meta AI"
      ],
      "detail": "<p>120B参数科学专用分词LaTeX/SMILES</p>"
    },
    {
      "id": "gnome",
      "num": 16,
      "name": "GNoME",
      "fullName": "材料探索图网络 (Graph Networks for Materials Exploration)",
      "year": "2023",
      "org": "DeepMind",
      "parent": "—",
      "paperUrl": "https://www.nature.com/articles/s41586-023-06735-9",
      "projectUrl": "",
      "category": "materials_weather",
      "motivation": "GNN预测220万新晶体等效800年知识",
      "summary": "GNoME 的核心目标是：GNN预测220万新晶体等效800年知识。",
      "keyPoints": [
        "核心动机：GNN预测220万新晶体等效800年知识",
        "代表机构：DeepMind"
      ],
      "detail": "<p>GNN预测220万新晶体等效800年知识</p>"
    },
    {
      "id": "panguweather",
      "num": 17,
      "name": "Pangu-Weather",
      "fullName": "盘古气象 (Pangu-Weather)",
      "year": "2023",
      "org": "Huawei Cloud",
      "parent": "—",
      "paperUrl": "https://www.nature.com/articles/s41586-023-06185-3",
      "projectUrl": "",
      "category": "materials_weather",
      "motivation": "3D Transformer首超传统数值预报精度",
      "summary": "Pangu-Weather 的核心目标是：3D Transformer首超传统数值预报精度。",
      "keyPoints": [
        "核心动机：3D Transformer首超传统数值预报精度",
        "代表机构：Huawei Cloud"
      ],
      "detail": "<p>3D Transformer首超传统数值预报精度</p>"
    },
    {
      "id": "graphcast",
      "num": 18,
      "name": "GraphCast",
      "fullName": "GraphCast (GraphCast)",
      "year": "2023",
      "org": "DeepMind",
      "parent": "—",
      "paperUrl": "https://www.science.org/doi/10.1126/science.adi2336",
      "projectUrl": "",
      "category": "materials_weather",
      "motivation": "GNN球形网格建模大气动力学",
      "summary": "GraphCast 的核心目标是：GNN球形网格建模大气动力学。",
      "keyPoints": [
        "核心动机：GNN球形网格建模大气动力学",
        "代表机构：DeepMind"
      ],
      "detail": "<p>GNN球形网格建模大气动力学</p>"
    },
    {
      "id": "rfdiffusion",
      "num": 19,
      "name": "RFdiffusion",
      "fullName": "RoseTTAFold扩散 (RoseTTAFold Diffusion)",
      "year": "2023",
      "org": "Baker Lab/UW",
      "parent": "rosettafold",
      "paperUrl": "https://www.nature.com/articles/s41586-023-06415-8",
      "projectUrl": "",
      "category": "protein_structure",
      "motivation": "扩散模型从噪声生成全新蛋白质",
      "summary": "RFdiffusion 的核心目标是：扩散模型从噪声生成全新蛋白质。",
      "keyPoints": [
        "核心动机：扩散模型从噪声生成全新蛋白质",
        "演化来源：继承或改进自 rosettafold",
        "代表机构：Baker Lab/UW"
      ],
      "detail": "<p>扩散模型从噪声生成全新蛋白质</p>"
    },
    {
      "id": "alphafold3",
      "num": 20,
      "name": "AlphaFold 3",
      "fullName": "AlphaFold 3 (AlphaFold 3)",
      "year": "2024",
      "org": "DeepMind/Isomorphic",
      "parent": "alphafold2",
      "paperUrl": "https://www.nature.com/articles/s41586-024-07487-w",
      "projectUrl": "",
      "category": "protein_structure",
      "motivation": "扩散模块预测全生物分子相互作用",
      "summary": "AlphaFold 3 的核心目标是：扩散模块预测全生物分子相互作用。",
      "keyPoints": [
        "核心动机：扩散模块预测全生物分子相互作用",
        "演化来源：继承或改进自 alphafold2",
        "代表机构：DeepMind/Isomorphic"
      ],
      "detail": "<p>扩散模块预测全生物分子相互作用</p>"
    },
    {
      "id": "esm3",
      "num": 21,
      "name": "ESM3",
      "fullName": "进化尺度建模3 (Evolutionary Scale Modeling 3)",
      "year": "2024",
      "org": "EvolutionaryScale",
      "parent": "esm2",
      "paperUrl": "https://www.evolutionaryscale.ai/blog/esm3-release",
      "projectUrl": "",
      "category": "protein_structure",
      "motivation": "98B参数序列-结构-功能协同生成",
      "summary": "ESM3 的核心目标是：98B参数序列-结构-功能协同生成。",
      "keyPoints": [
        "核心动机：98B参数序列-结构-功能协同生成",
        "演化来源：继承或改进自 esm2",
        "代表机构：EvolutionaryScale"
      ],
      "detail": "<p>98B参数序列-结构-功能协同生成</p>"
    },
    {
      "id": "sciglm",
      "num": 22,
      "name": "SciGLM",
      "fullName": "科学GLM (Scientific GLM)",
      "year": "2024",
      "org": "清华大学/智谱AI",
      "parent": "—",
      "paperUrl": "https://proceedings.neurips.cc/paper_files/paper/2024/hash/02ee6b7295f720407b56c457b34c54d5-Abstract-Datasets_and_Benchmarks_Track.html",
      "projectUrl": "",
      "category": "science_llm",
      "motivation": "自反思指令标注大学水平科学推理",
      "summary": "SciGLM 的核心目标是：自反思指令标注大学水平科学推理。",
      "keyPoints": [
        "核心动机：自反思指令标注大学水平科学推理",
        "代表机构：清华大学/智谱AI"
      ],
      "detail": "<p>自反思指令标注大学水平科学推理</p>"
    },
    {
      "id": "scidfm",
      "num": 23,
      "name": "SciDFM",
      "fullName": "科学领域基础模型 (Scientific Domain Foundation Model)",
      "year": "2024",
      "org": "复旦大学",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2401.12356",
      "projectUrl": "",
      "category": "science_llm",
      "motivation": "MoE架构科学大模型多领域专家",
      "summary": "SciDFM 的核心目标是：MoE架构科学大模型多领域专家。",
      "keyPoints": [
        "核心动机：MoE架构科学大模型多领域专家",
        "代表机构：复旦大学"
      ],
      "detail": "<p>MoE架构科学大模型多领域专家</p>"
    },
    {
      "id": "unimap",
      "num": 24,
      "name": "UniMAP",
      "fullName": "统一分子预训练 (Unified Molecular Pre-training)",
      "year": "2024",
      "org": "Tsinghua University",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2402.13163",
      "projectUrl": "",
      "category": "molecular",
      "motivation": "多模态融合SMILES序列与分子图",
      "summary": "UniMAP 的核心目标是：多模态融合SMILES序列与分子图。",
      "keyPoints": [
        "核心动机：多模态融合SMILES序列与分子图",
        "代表机构：Tsinghua University"
      ],
      "detail": "<p>多模态融合SMILES序列与分子图</p>"
    },
    {
      "id": "aion1",
      "num": 25,
      "name": "AION-1",
      "fullName": "AION-1 (AION-1)",
      "year": "2025",
      "org": "Polymathic AI",
      "parent": "—",
      "paperUrl": "https://polymathic-ai.org/news/aion-1",
      "projectUrl": "",
      "category": "unified_foundation",
      "motivation": "十亿参数多模态天文学基础模型",
      "summary": "AION-1 的核心目标是：十亿参数多模态天文学基础模型。",
      "keyPoints": [
        "核心动机：十亿参数多模态天文学基础模型",
        "代表机构：Polymathic AI"
      ],
      "detail": "<p>十亿参数多模态天文学基础模型</p>"
    },
    {
      "id": "walrus",
      "num": 26,
      "name": "Walrus",
      "fullName": "Walrus (Walrus)",
      "year": "2025",
      "org": "Polymathic AI",
      "parent": "—",
      "paperUrl": "https://polymathic-ai.org/news/walrus",
      "projectUrl": "",
      "category": "unified_foundation",
      "motivation": "连续介质动力学跨领域物理迁移",
      "summary": "Walrus 的核心目标是：连续介质动力学跨领域物理迁移。",
      "keyPoints": [
        "核心动机：连续介质动力学跨领域物理迁移",
        "代表机构：Polymathic AI"
      ],
      "detail": "<p>连续介质动力学跨领域物理迁移</p>"
    },
    {
      "id": "mattergen",
      "num": 27,
      "name": "MatterGen",
      "fullName": "MatterGen (MatterGen)",
      "year": "2025",
      "org": "Microsoft Research",
      "parent": "—",
      "paperUrl": "https://www.microsoft.com/en-us/research/blog/mattergen-a-generative-model-for-inorganic-materials-design/",
      "projectUrl": "",
      "category": "materials_weather",
      "motivation": "扩散生成满足属性约束的晶体",
      "summary": "MatterGen 的核心目标是：扩散生成满足属性约束的晶体。",
      "keyPoints": [
        "核心动机：扩散生成满足属性约束的晶体",
        "代表机构：Microsoft Research"
      ],
      "detail": "<p>扩散生成满足属性约束的晶体</p>"
    },
    {
      "id": "auroragpt",
      "num": 28,
      "name": "AuroraGPT",
      "fullName": "AuroraGPT (AuroraGPT)",
      "year": "2026",
      "org": "Argonne National Lab",
      "parent": "—",
      "paperUrl": "https://www.anl.gov/aurora-gpt",
      "projectUrl": "",
      "category": "unified_foundation",
      "motivation": "2T参数整合20T+科学Token多模态",
      "summary": "AuroraGPT 的核心目标是：2T参数整合20T+科学Token多模态。",
      "keyPoints": [
        "核心动机：2T参数整合20T+科学Token多模态",
        "代表机构：Argonne National Lab"
      ],
      "detail": "<p>2T参数整合20T+科学Token多模态</p>"
    },
    {
      "id": "scienceone100",
      "num": 29,
      "name": "ScienceOne 100",
      "fullName": "科学一号 (ScienceOne 100)",
      "year": "2026",
      "org": "中国科学院",
      "parent": "—",
      "paperUrl": "https://dig.watch/resources/scienceone-100",
      "projectUrl": "",
      "category": "unified_foundation",
      "motivation": "跨数学物理生物统一模型100+场景",
      "summary": "ScienceOne（磐石）是中国科学院构建的\"AI+科学\"操作系统级平台，通过异构混合专家（MoE）基座模型、多模态科学推理模型和深度研究智能体三大核心组件，覆盖数学、物理、化学、天文、地球科学、生物六大基础学科的100+科学场景，实现了从科学数据理解、知识推理到工具编排的全链路科研智能化。",
      "keyPoints": [
        "<strong>平台级架构</strong>：ScienceOne 不是单一模型，而是包含 S1-Base（科学基座）、S1-VL（多模态推理）、S1-Omni（全模态）、S1-DeepResearch（深度研究智能体）四大模型族的统一科学操作系统",
        "<strong>异构 MoE 路由</strong>：S1-Base 采用异构混合专家架构，可自动将用户查询路由至通用大语言模型或领域专用模型（波谱、场、蛋白质、生物序列等）",
        "<strong>六学科覆盖</strong>：系统性学习数学、物理、化学、天文学、地球科学、生物学的核心理论与专业知识",
        "<strong>1.7 亿篇科学论文训练</strong>：S1-Base 基于 1.7 亿篇科学论文预训练，并通过百万级高质量科学推理数据进行指令微调",
        "<strong>课程式强化学习</strong>：采用高中→本科→研究生分阶段课程学习策略，逐步提升学科能力",
        "<strong>四阶段渐进式后训练</strong>（S1-VL）：科学推理 SFT → 图像思维冷启动 SFT → 科学推理 RL（SAPO）→ 图像思维 RL（SAPO）",
        "<strong>Thinking-with-Images 范式</strong>：S1-VL 在推理过程中主动调用 Python 代码执行图像操作（裁剪、缩放、增强、标注），实现多轮迭代视觉推理",
        "<strong>六维质量过滤框架</strong>：对推理轨迹进行多维度质量评估与过滤，配合自适应数据路由策略",
        "<strong>深度研究智能体</strong>：S1-DeepResearch 支持 128K 上下文窗口、150+ 轮连续工具调用、9 种内置工具",
        "<strong>多尺度参数</strong>：S1-Base 提供 8B / 32B / 671B 三种规模；S1-VL 为 32B；S1-DeepResearch 为 8B / 32B",
        "<strong>13 个基准评测 SOTA</strong>：S1-VL-32B 在 HRBench-4K/8K、MME-RealWorld 等 5 个图像操作推理基准上全部第一，科学推理基准上超越同等及更大规模模型"
      ],
      "detail": "<h5>平台总体架构</h5>\n<p>ScienceOne（磐石）是中国科学院依托科学基础大模型研发的\"人工智能+科学\"操作系统。与单一模型不同，ScienceOne 采用<strong>模块化平台架构</strong>，面向跨领域前沿科学发现与技术创新的共性需求，提供四大核心能力：</p>\n<ol>\n<li><strong>多模态科学数据专业理解</strong>：处理科学图表、显微图像、遥感影像、天文观测数据等</li>\n<li><strong>科学文献萃取融合</strong>：从海量论文中提取、整合知识</li>\n<li><strong>科学知识表征推理</strong>：基于学科知识体系进行逻辑推理</li>\n<li><strong>科学工具编排规划</strong>：自动调用计算工具完成复杂科研任务</li>\n</ol>\n<p>平台包含以下核心模型族：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>模型族</th>\n<th>功能定位</th>\n<th>参数规模</th>\n<th>基座模型</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>S1-Base</td>\n<td>科学基座语言模型</td>\n<td>8B / 32B / 671B</td>\n<td>Qwen3-8B / Qwen3-32B / DeepSeek-V3</td>\n</tr>\n<tr>\n<td>S1-VL</td>\n<td>科学多模态推理</td>\n<td>32B</td>\n<td>Qwen3-VL-32B-Thinking</td>\n</tr>\n<tr>\n<td>S1-Omni</td>\n<td>全模态科学模型</td>\n<td>29B</td>\n<td>—</td>\n</tr>\n<tr>\n<td>S1-DeepResearch</td>\n<td>深度研究智能体</td>\n<td>8B / 32B</td>\n<td>Qwen3-32B</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 <strong>关键</strong>：ScienceOne 的\"100\"指覆盖 100+ 科学应用场景，而非单一模型参数量，体现了其作为科学操作系统的广度定位。</div>\n<h5>S1-Base：异构 MoE 科学基座模型</h5>\n<p>S1-Base 是整个平台的基础层，其核心创新在于<strong>异构混合专家（Heterogeneous MoE）架构</strong>：</p>\n<pre><code>用户查询 → 路由器（Router）\n              ├─→ 通用科学 LLM（数学/物理/化学推理）\n              ├─→ 波谱模型（光谱、波形分析）\n              ├─→ 场模型（电磁场、引力场模拟）\n              ├─→ 蛋白质模型（结构预测、功能注释）\n              └─→ 生物序列模型（基因组、转录组分析）\n</code></pre>\n<p><strong>训练流程</strong>分为三个层次：</p>\n<ol>\n<li>\n<p><strong>大规模科学预训练</strong>：基于 1.7 亿篇科学论文进行继续预训练，使模型系统性地学习六大基础学科（数学、物理、化学、天文学、地球科学、生物学）的核心理论、定律和专业知识</p>\n</li>\n<li>\n<p><strong>科学指令微调</strong>：使用百万级高质量科学推理数据进行指令微调，提升模型在科学问答、推导、分析等任务上的表现</p>\n</li>\n<li>\n<p><strong>多学科复合强化学习 + 课程学习</strong>：</p>\n</li>\n<li>采用<strong>课程学习策略</strong>，按高中→本科→研究生难度梯度逐步提升</li>\n<li>通过多学科复合奖励函数进行强化学习，确保各学科能力均衡发展</li>\n</ol>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：S1-Base-671B 基于 DeepSeek-V3 架构，本身即为 MoE 模型（激活参数远小于总参数），这使得 671B 规模在推理时具有较高的计算效率。</div>\n<h5>S1-VL：科学多模态推理模型（Thinking-with-Images）</h5>\n<p>S1-VL 是 ScienceOne 平台的多模态核心，其技术报告已发表于 arXiv（2604.21409）。该模型原生支持两种互补的推理范式：</p>\n<p><strong>范式一：Scientific Reasoning（科学推理）</strong></p>\n<p>基于结构化思维链（Chain-of-Thought）的多模态科学推理，适用于复杂多步骤问题的分析与求解。</p>\n<p><strong>范式二：Thinking-with-Images（图像思维）</strong></p>\n<p>这是 S1-VL 最具创新性的设计。模型在推理过程中可以<strong>主动生成并执行 Python 代码</strong>来操作图像：</p>\n<pre><code class=\"language-python\"># S1-VL Thinking-with-Images 推理流程伪代码\ndef thinking_with_images(query, image):\n    context = [image]\n    reasoning = &quot;&quot;\n\n    for turn in range(max_turns):\n        # 模型生成推理文本 + 可选的代码操作\n        response = model.generate(query, context, reasoning)\n\n        if response.has_code():\n            # 在沙箱环境中执行图像操作代码\n            code = response.extract_code()\n            # 支持操作：裁剪、缩放、增强、边界框标注、关键点标记\n            result_image = sandbox.execute(code, context[-1])\n            context.append(result_image)  # 中间视觉结果加入上下文\n\n        reasoning += response.text\n\n        if response.is_final():\n            return reasoning\n</code></pre>\n<div class=\"key-point\">💡 <strong>关键</strong>：Thinking-with-Images 特别适用于高分辨率科学图表解读、显微图像理解、遥感影像分析和几何辅助推理等场景——这些场景中，模型需要\"放大\"或\"标注\"图像的特定区域才能准确推理。</div>\n<p><strong>四阶段渐进式后训练流程</strong>：</p>\n<div class=\"kb-math kb-math-display\">\\text{Stage 1: SFT}_{\\text{sci}} \\rightarrow \\text{Stage 2: SFT}_{\\text{TwI}} \\rightarrow \\text{Stage 3: RL}_{\\text{sci}} \\rightarrow \\text{Stage 4: RL}_{\\text{TwI}}</div>\n<ul>\n<li><strong>Stage 1 — 科学推理 SFT</strong>：使用跨学科（数学、物理、化学、天文、地球科学、生物）大规模多模态指令数据进行混合训练，增强科学视觉理解与逻辑推理能力</li>\n<li><strong>Stage 2 — 图像思维冷启动 SFT</strong>：引入 Thinking-with-Images 范式，联合高质量科学推理课程学习数据与图像思维数据进行训练，使模型获得通过代码执行图像操作的能力</li>\n<li><strong>Stage 3 — 科学推理 RL</strong>：基于 <strong>SAPO 算法</strong>（Self-Aligned Policy Optimization）和多任务科学奖励函数，对高难度科学多模态推理样本进行强化学习，突破 SFT 阶段的性能天花板</li>\n<li><strong>Stage 4 — 图像思维 RL</strong>：基于 SAPO 算法和<strong>四维复合奖励函数</strong>，进一步优化模型的图像操作调用时机与质量，实现稳定高效的多轮视觉推理</li>\n</ul>\n<p><strong>六维质量过滤框架与自适应数据路由</strong>：</p>\n<p>为解决现有数据集中冗余、无效和错误视觉操作的问题，S1-VL 提出：</p>\n<ol>\n<li><strong>六维质量过滤框架</strong>：对推理轨迹从六个维度进行质量评估与过滤</li>\n<li><strong>多阶段过滤管线</strong>：逐步筛选高质量训练样本</li>\n<li><strong>自适应数据路由策略</strong>：将视觉信息增益低的样本转换为纯推理模式数据，使模型学会判断\"何时真正需要图像操作\"</li>\n</ol>\n<h5>S1-DeepResearch：长程深度研究智能体</h5>\n<p>S1-DeepResearch 是面向科研场景的端到端智能体模型，具备五大核心能力：</p>\n<ol>\n<li><strong>长链复杂推理</strong>：支持跨文档检索、证据聚合、状态记忆和策略迭代</li>\n<li><strong>深度研究指令遵循</strong>：解析多约束指令，构建\"任务定义→机制→工具执行→结果呈现\"的全链路理解</li>\n<li><strong>深度研究报告撰写</strong>：生成可论证、可引用的报告式输出</li>\n<li><strong>文件理解与生成</strong>：覆盖 PDF、表格、网页等多模态输入输出</li>\n<li><strong>技能调用</strong>：将文献检索、数据分析、实验设计、计算建模等组织为可调用模块</li>\n</ol>\n<p>技术特性：\n- <strong>128K 上下文窗口</strong>：单次会话可容纳超长证据链\n- <strong>150+ 轮连续工具调用</strong>：支持多阶段任务的持续规划、执行和自我修正\n- <strong>9 种原生内置工具</strong>：搜索、网页浏览、代码执行等</p>\n<p>在 20 个智能体能力基准上，S1-DeepResearch-32B 全面超越基座模型 Qwen3-32B，整体性能接近 GPT 5.2、Claude 4.6、GLM-5 等闭源旗舰模型。</p>\n<h5>数据集与基准</h5>\n<p>ScienceOne 团队同步开源了多个高质量数据集：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>数据集</th>\n<th>规模</th>\n<th>用途</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>S1-MMAlign</td>\n<td>2110 万样本</td>\n<td>多模态对齐训练</td>\n</tr>\n<tr>\n<td>S1-DeepResearch-15k</td>\n<td>1.5 万条</td>\n<td>智能体训练轨迹</td>\n</tr>\n<tr>\n<td>PhysLogic</td>\n<td>—</td>\n<td>物理逻辑推理评测</td>\n</tr>\n<tr>\n<td>HiSciBench</td>\n<td>—</td>\n<td>高阶科学能力基准</td>\n</tr>\n</tbody>\n</table></div>\n<h5>与传统方法的区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th>传统科学 AI 模型</th>\n<th>ScienceOne</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>覆盖范围</td>\n<td>单一学科/任务</td>\n<td>六大学科 100+ 场景</td>\n</tr>\n<tr>\n<td>架构设计</td>\n<td>单一模型</td>\n<td>异构 MoE + 模型族平台</td>\n</tr>\n<tr>\n<td>推理方式</td>\n<td>纯文本 CoT</td>\n<td>CoT + Thinking-with-Images</td>\n</tr>\n<tr>\n<td>图像理解</td>\n<td>被动接收</td>\n<td>主动操作（裁剪/缩放/标注）</td>\n</tr>\n<tr>\n<td>研究能力</td>\n<td>单步问答</td>\n<td>150+ 轮长程深度研究</td>\n</tr>\n<tr>\n<td>训练数据</td>\n<td>通用语料</td>\n<td>1.7 亿篇科学论文 + 课程学习</td>\n</tr>\n</tbody>\n</table></div>",
      "quiz": {
        "q": "S1-VL 模型的 Thinking-with-Images 范式的核心创新是什么？",
        "options": [
          "使用更大的视觉编码器提升图像分辨率",
          "在推理过程中主动生成并执行代码来操作图像，获取中间视觉结果后继续推理",
          "将图像转换为文本描述后进行纯文本推理",
          "使用多个视觉编码器分别处理不同类型的科学图像"
        ],
        "answer": 1,
        "explain": "Thinking-with-Images 的核心在于模型在推理过程中可以主动调用 Python 代码执行图像操作（裁剪、缩放、增强、标注等），在沙箱环境中获取中间视觉结果，然后以多轮迭代方式继续推理，而非被动地一次性处理输入图像。"
      }
    },
    {
      "id": "prithvi",
      "num": 30,
      "name": "Prithvi",
      "fullName": "Prithvi地学基础模型 (Prithvi Geospatial FM)",
      "year": "2026",
      "org": "NASA/IBM",
      "parent": "—",
      "paperUrl": "https://www.nasa.gov/news-release/nasa-ibm-geospatial-ai-foundation-model-deployed-in-orbit/",
      "projectUrl": "",
      "category": "unified_foundation",
      "motivation": "首个在轨部署地学基础模型ISS实时",
      "summary": "Prithvi 的核心目标是：首个在轨部署地学基础模型ISS实时。",
      "keyPoints": [
        "核心动机：首个在轨部署地学基础模型ISS实时",
        "代表机构：NASA/IBM"
      ],
      "detail": "<p>首个在轨部署地学基础模型ISS实时</p>"
    },
    {
      "id": "darwin7b",
      "num": 31,
      "name": "Darwin-7B",
      "fullName": "Darwin-7B (Darwin-7B)",
      "year": "2026",
      "org": "ICLR 2026",
      "parent": "—",
      "paperUrl": "https://fm-science.github.io/",
      "projectUrl": "",
      "category": "unified_foundation",
      "motivation": "肠道微生物组多组学基础模型",
      "summary": "Darwin-7B 的核心目标是：肠道微生物组多组学基础模型。",
      "keyPoints": [
        "核心动机：肠道微生物组多组学基础模型",
        "代表机构：ICLR 2026"
      ],
      "detail": "<p>肠道微生物组多组学基础模型</p>"
    }
  ],
  "categories": {
    "neural_operator": {
      "label": "神经算子与基础架构",
      "color": "#607D8B"
    },
    "protein_structure": {
      "label": "蛋白质结构预测",
      "color": "#4CAF50"
    },
    "materials_weather": {
      "label": "材料科学与气象预测",
      "color": "#2196F3"
    },
    "molecular": {
      "label": "分子建模与药物发现",
      "color": "#9C27B0"
    },
    "science_llm": {
      "label": "科学大语言模型",
      "color": "#FF9800"
    },
    "unified_foundation": {
      "label": "统一科学基础模型",
      "color": "#E91E63"
    }
  },
  "projectUrls": {}
};
